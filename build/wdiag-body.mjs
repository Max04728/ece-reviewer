// wdiag-body.mjs -- write a widget's processed module body to a file and report the exact
// syntax-error line, using the same import-stripping and stub rules as check-widgets.mjs.
import { readFileSync, writeFileSync } from 'node:fs';

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.log('no module block'); process.exit(1); }

const STUB = [
  'const widget=()=>{};',
  "const fmt=()=>'';",
  "const si=()=>'';",
  'const d=()=>0;',
  'function simpson(){return 0}',
  'function trapezoid(){return 0}',
  'function solve2(){return null}',
  'const deg=()=>0;',
  'const rad=()=>0;',
  'const clamp=(a)=>a;',
  'const lerp=(a)=>a;',
  'const PALETTE={};',
  'class Plot{constructor(){}setRange(){}X(){return 0}Y(){return 0}clear(){return this}',
  'grid(){return this}axes(){return this}fn(){return this}segment(){return this}',
  'dot(){return this}band(){return this}text(){return this}label(){return this}}',
].join('\n');

const body = m[1]
  .replace(/^[ \t]*import\s+[^;\n]*?from\s+['"][^'"\n]+['"];[ \t]*$/gm, '')
  .replace(/^[ \t]*import\s+['"][^'"\n]+['"];[ \t]*$/gm, '');

const stubLines = STUB.split('\n').length;
writeFileSync('build/_diag_body.mjs', STUB + '\n' + body, 'utf8');

// Now check it with node and translate the reported line back to the widget body.
import { execFileSync } from 'node:child_process';
let out = '';
try {
  execFileSync(process.execPath, ['--check', 'build/_diag_body.mjs'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  console.log('body parses OK');
} catch (e) {
  out = (e.stderr || '') + (e.stdout || '');
}
if (out) {
  const lines = out.split('\n');
  const loc = lines.find((l) => l.includes('_diag_body.mjs:'));
  console.log('raw:', lines.slice(0, 6).join('\n'));
  if (loc) {
    const n = Number((loc.match(/:(\d+)/) || [])[1]);
    const bodyLine = n - stubLines;
    const src = body.split('\n');
    console.log(`\nreported at combined line ${n} -> widget body line ${bodyLine}`);
    for (let i = Math.max(0, bodyLine - 5); i < Math.min(src.length, bodyLine + 2); i++) {
      console.log(`${String(i + 1).padStart(4)}${i + 1 === bodyLine ? ' >> ' : '    '}${src[i]}`);
    }
  }
}
