// check-widgets.mjs -- static checks for every widget.
//
//   node build/check-widgets.mjs
//   import { checkWidgets } from './check-widgets.mjs'
//
// Verifies, per widget file:
//   1. the <script type="module"> body parses
//   2. ../../../Assets/snippets.css resolves
//   3. ../../../Assets/vault.js resolves, and is imported when the widget uses the runtime
//   4. the widget does not both import a name from vault.js and declare it locally
//      (in a browser that is "Identifier already declared" and the widget never runs)
//
// WHY THE STUB IS BUILT PER WIDGET: an earlier version declared a fixed helper list
// including `simpson`. Widgets that define their own `simpson` then collided with the
// stub and reported a phantom "Identifier 'simpson' has already been declared". The stub
// now provides exactly the names the widget actually imports.

import { readFileSync, readdirSync, statSync, existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { VAULT } from './vault.mjs';

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// One stand-in declaration per name that vault.js exports and widgets import.
const STUB_PROVIDERS = {
  widget: 'const widget=()=>{};',
  fmt: "const fmt=()=>'';",
  si: "const si=()=>'';",
  d: 'const d=()=>0;',
  simpson: 'function simpson(){return 0}',
  trapezoid: 'function trapezoid(){return 0}',
  solve2: 'function solve2(){return null}',
  deg: 'const deg=()=>0;',
  rad: 'const rad=()=>0;',
  clamp: 'const clamp=(a)=>a;',
  lerp: 'const lerp=(a)=>a;',
  PALETTE: 'const PALETTE={};',
};

const PLOT_STUB = [
  'class Plot{',
  'constructor(){this.xMin=0;this.xMax=1;this.yMin=0;this.yMax=1;this.pad=0;',
  'this.ctx={save(){},restore(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fill(){},',
  'fillRect(){},arc(){},setLineDash(){},fillText(){},closePath(){}};}',
  'setRange(){}X(){return 0}Y(){return 0}xInv(){return 0}clear(){return this}grid(){return this}',
  'axes(){return this}fn(){return this}segment(){return this}dot(){return this}',
  'band(){return this}text(){return this}label(){return this}}',
].join('\n');

function importedNames(body) {
  const m = body.match(/import\s*\{([^}]*)\}\s*from\s*['"][^'"]*vault\.js['"]/);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.trim().split(/\s+as\s+/).pop().trim())
    .filter(Boolean);
}

function stubFor(body) {
  const decls = importedNames(body).map((n) => STUB_PROVIDERS[n]).filter(Boolean);
  return decls.join('\n') + '\n' + PLOT_STUB + '\n';
}

/** Strip import statements, anchored so they cannot eat string content elsewhere. */
function stripImports(body) {
  return body
    .replace(/^[ \t]*import\s+[^;\n]*?from\s+['"][^'"\n]+['"];[ \t]*$/gm, '')
    .replace(/^[ \t]*import\s+['"][^'"\n]+['"];[ \t]*$/gm, '');
}

/** @returns {Promise<{files:number, problems:Array<{file:string,msgs:string[]}>}>} */
export async function checkWidgets() {
  const files = walk(VAULT).filter((f) => f.toLowerCase().endsWith('.html'));
  const tmp = mkdtempSync(join(tmpdir(), 'widgetcheck-'));
  const problems = [];

  // A file being written by another process right now will be read as a partial document
  // and report a syntax error that does not exist in the finished file. That happened
  // here: a widget showed "Unexpected token '+'" for many consecutive runs simply because
  // its author was still streaming it to disk. Detect instability and report it as
  // IN FLIGHT rather than as a defect.
  const statOf = (p) => { try { return statSync(p); } catch { return null; } };
  const stable = new Set();
  for (const f of files) {
    const a = statOf(f);
    if (!a) continue;
    const first = a.mtimeMs;
    // re-read metadata after a short synchronous pause
    const until = Date.now() + 40;
    while (Date.now() < until) { /* brief settle */ }
    const b = statOf(f);
    if (b && b.mtimeMs === first) stable.add(f);
  }

  for (const f of files) {
    const name = basename(f);
    const txt = readFileSync(f, 'utf8');
    const msgs = [];

    if (!stable.has(f)) {
      problems.push({ file: name, msgs: ['IN FLIGHT -- file is being written right now; re-run once its author stops'] });
      continue;
    }

    const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
    if (!m) {
      msgs.push('no <script type="module"> block found');
    } else {
      const body = stripImports(m[1]);

      // duplicate binding: imported from vault.js and also declared locally
      const dup = [];
      for (const n of importedNames(m[1])) {
        const re = new RegExp('(?:^|[\\s;{(])(?:const|let|var|function|class)\\s+' + n + '\\b');
        if (re.test(body)) dup.push(n);
      }
      if (dup.length) {
        msgs.push(`imports ${dup.join(', ')} from vault.js and declares it locally (browser: "Identifier already declared")`);
      }

      const tmpFile = join(tmp, name.replace(/[^\w.-]/g, '_') + '.mjs');
      writeFileSync(tmpFile, stubFor(m[1]) + body, 'utf8');
      try {
        await import(pathToFileURL(tmpFile).href);
      } catch (e) {
        if (e instanceof SyntaxError) msgs.push(`syntax error: ${e.message}`);
        // Non-syntax errors are expected: there is no real DOM in Node.
      }
    }

    for (const spec of [
      { label: 'snippets.css', re: /href="([^"]*Assets\/snippets\.css)"/ },
      { label: 'vault.js', re: /from '([^']*Assets\/vault\.js)'/ },
    ]) {
      const mm = txt.match(spec.re);
      if (!mm) {
        // vault.js is only required by widgets that use the runtime: a canvas or a
        // range slider. A pure-DOM widget has nothing to import, and a dead import
        // would be worse than the missing reference.
        const needsRuntime = /<canvas/i.test(txt) || /type="range"/.test(txt);
        if (spec.label === 'vault.js' && !needsRuntime) continue;
        msgs.push(`missing ${spec.label} reference`);
        continue;
      }
      if (!existsSync(join(dirname(f), mm[1]))) msgs.push(`asset not found: ${mm[1]}`);
    }

    if (/type="range"/.test(txt) && !/from '.*vault\.js'/.test(txt)) {
      msgs.push('has a range input but does not import the shared runtime');
    }

    if (msgs.length) problems.push({ file: name, msgs });
  }

  rmSync(tmp, { recursive: true, force: true });
  return { files: files.length, problems };
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build/check-widgets.mjs');
if (isMain) {
  const r = await checkWidgets();
  const inFlight = r.problems.filter((p) => p.msgs.some((s) => s.startsWith('IN FLIGHT')));
  const real = r.problems.filter((p) => !inFlight.includes(p));
  for (const p of real) {
    console.log(`x ${p.file}`);
    for (const s of p.msgs) console.log(`    ${s}`);
  }
  for (const p of inFlight) console.log(`~ ${p.file}  (IN FLIGHT - being written; not counted as a defect)`);
  console.log(`widgets checked: ${r.files} | defects: ${real.length} | in flight: ${inFlight.length}`);
  if (real.length) process.exitCode = 1;
}
