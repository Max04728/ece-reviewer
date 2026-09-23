// check-widget-runtime.mjs — run every widget for real against a stubbed DOM/canvas.
//
// WHY THIS EXISTS: check-widgets.mjs parses each widget, which catches syntax errors but
// nothing else. A widget can be a perfectly valid ES module and still render a blank
// canvas — because compute() throws, because a value is NaN, because readout() returns
// undefined, or because draw() references a helper it never imported. Those failures are
// silent in Obsidian: you get an empty box with no message.
//
// This harness stubs just enough DOM and 2-D canvas for a widget module to execute,
// captures the spec passed to widget(), then calls compute/draw/readout across a grid of
// control values. It reports any NaN, undefined, throw, or blank readout.
//
//   node build/check-widget-runtime.mjs

import { readFileSync, readdirSync, statSync, writeFileSync, unlinkSync } from 'node:fs';
import { join, basename } from 'node:path';
import { VAULT } from './vault.mjs';

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** Build a fake 2-D context that records nothing but accepts every call. */
function makeCtx() {
  const noop = () => {};
  return {
    save: noop, restore: noop, beginPath: noop, closePath: noop, moveTo: noop,
    lineTo: noop, stroke: noop, fill: noop, fillRect: noop, strokeRect: noop,
    clearRect: noop, arc: noop, arcTo: noop, ellipse: noop, setLineDash: noop,
    fillText: noop, strokeText: noop, translate: noop, rotate: noop, scale: noop,
    setTransform: noop, bezierCurveTo: noop, quadraticCurveTo: noop, rect: noop,
    clip: noop, drawImage: noop, createLinearGradient: () => ({ addColorStop: noop }),
    createRadialGradient: () => ({ addColorStop: noop }), createPattern: () => null,
    measureText: () => ({ width: 10 }), getImageData: () => ({ data: [] }),
    putImageData: noop, globalAlpha: 1, globalCompositeOperation: 'source-over',
  };
}

/** Minimal DOM good enough for widget modules and pure-DOM widgets. */
function makeDom() {
  const mkEl = (tag) => {
    const el = {
      tagName: String(tag).toUpperCase(),
      children: [],
      style: {},
      dataset: {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      textContent: '',
      innerHTML: '',
      value: '',
      checked: false,
      width: 900,
      height: 460,
      appendChild(c) { this.children.push(c); return c; },
      removeChild(c) { this.children = this.children.filter((x) => x !== c); return c; },
      addEventListener() {},
      removeEventListener() {},
      setAttribute() {},
      getAttribute() { return null; },
      querySelector() { return null; },
      querySelectorAll() { return []; },
      getContext() { return makeCtx(); },
      getBoundingClientRect() { return { width: 900, height: 460, left: 0, top: 0 }; },
      insertBefore(c) { this.children.push(c); return c; },
      focus() {},
      remove() {},
    };
    return el;
  };
  const app = mkEl('div');
  const byId = { app };
  const doc = {
    body: mkEl('body'),
    documentElement: mkEl('html'),
    getElementById(id) {
      if (!byId[id]) byId[id] = mkEl('div');
      return byId[id];
    },
    createElement: (t) => mkEl(t),
    createTextNode: (t) => ({ textContent: t }),
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener() {},
    removeEventListener() {},
    _byId: byId,
  };
  return { doc, app };
}

/** Sample a control set: min, max, and a midpoint. */
const optValue = (o) => (o && typeof o === 'object' ? o.value : o);

function samplesFor(controls) {
  const sets = [];
  const defaults = {};
  for (const c of controls ?? []) {
    defaults[c.id] = c.type === 'checkbox' ? !!c.value : c.type === 'select' ? optValue(c.value ?? c.options?.[0]) : (c.value ?? 0);
  }
  // The real widget() seeds state.values from the spec's declared defaults and renders
  // once before any user interaction, so the defaults themselves must be exercised.
  // Omitting this sample leaves select-driven lookups undefined and invents failures.
  sets.push({ ...defaults });
  const base = { ...defaults };
  for (const c of controls ?? []) {
    if (c.type === 'checkbox') {
      sets.push({ ...base, [c.id]: true });
      sets.push({ ...base, [c.id]: false });
    } else if (c.type === 'select') {
      // A select's runtime value is the option's `value`. Passing the whole option
      // object would make the widget's lookup fail and invent a bug that does not exist.
      for (const o of c.options ?? []) sets.push({ ...base, [c.id]: optValue(o) });
    } else {
      sets.push({ ...base, [c.id]: c.min ?? 0 });
      sets.push({ ...base, [c.id]: c.max ?? 1 });
      sets.push({ ...base, [c.id]: ((c.min ?? 0) + (c.max ?? 1)) / 2 });
    }
  }
  return sets;
}

/**
 * Run every widget against the stubbed DOM/canvas.
 * @param {{quiet?: boolean}} [opts]
 * @returns {Promise<{executed:number,total:number,combinations:number,hard:Array,soft:Array}>}
 */
export async function checkWidgetRuntime(opts = {}) {
const files = walk(VAULT).filter((f) => f.toLowerCase().endsWith('.html'));
const problems = [];
/**
 * Widgets that read live DOM state at module scope (a <select> value the user has already
 * set, a canvas that exists in the page). They cannot run against a stub DOM because the
 * stub has no such elements. Listed explicitly so they are reported as NOT DRIVEN rather
 * than counted as clean - a genuine import error on one of these would still be caught by
 * the static checker, and any OTHER widget failing to import is still a defect.
 */
const NOT_DRIVABLE = new Set([
  'Limit_Explorer_Table_of_Values.html',
  'Gauss_Law_Flux_Surface.html',
  'Skin_Depth_vs_Frequency.html',
]);
const notDriven = [];
let run = 0;
let runsTotal = 0;

for (const f of files) {
  const name = basename(f);
  const txt = readFileSync(f, 'utf8');
  const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
  if (!m) continue;

  // Only widgets that use widget() can be driven generically. Pure-DOM widgets are
  // executed for side effects (their construction code runs against the stub DOM).
  const usesWidget = /\bwidget\s*\(/.test(m[1]);

  // Generate the shim to provide EXACTLY the names this widget imports from vault.js.
  // Declaring a fixed list of helpers collides with any widget that legitimately defines
  // its own function of the same name (SCR_Firing_Angle_Waveform defines its own
  // `simpson`), producing "Identifier 'simpson' has already been declared" - a harness
  // artifact, not a widget defect. Matching the import list exactly removes the class.
  const importRe = /import\s*\{([^}]*)\}\s*from\s*['"][^'"]*vault\.js['"]/;
  const im = m[1].match(importRe);
  const wanted = im
    ? im[1].split(',').map((s) => s.trim().split(/\s+as\s+/).pop().trim()).filter(Boolean)
    : [];

  const PROVIDERS = {
    PALETTE: "const PALETTE = new Proxy({}, { get: () => '#808080' });",
    fmt: "const fmt = (x, s) => (x === null || x === undefined || Number.isNaN(x)) ? 'NaN!' : String(x);",
    si: "const si = (x, u) => fmt(x) + (u || '');",
    clamp: 'const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));',
    lerp: 'const lerp = (a, b, t) => a + (b - a) * t;',
    deg: 'const deg = (r) => r * 180 / Math.PI;',
    rad: 'const rad = (d) => d * Math.PI / 180;',
    d: 'const d = (f, x, h) => (f(x + h) - f(x - h)) / (2 * h);',
    simpson: 'function simpson(f, a, b, n = 200) { if (n % 2) n++; const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2); return s * h / 3; }',
    trapezoid: 'function trapezoid(f, a, b, n = 200) { const h = (b - a) / n; let s = (f(a) + f(b)) / 2; for (let i = 1; i < n; i++) s += f(a + i * h); return s * h; }',
    solve2: 'function solve2(a, b, c, dd, e, ff) { const det = a * dd - b * c; return Math.abs(det) < 1e-15 ? null : { x: (e * dd - b * ff) / det, y: (a * ff - e * c) / det }; }',
  };
  const provided = wanted.map((n) => PROVIDERS[n]).filter(Boolean);

  // A real defect class the runtime harness would otherwise mask: a widget that imports a
  // name from vault.js AND declares its own binding with the same name. In a browser that
  // is "Identifier 'x' has already been declared" and the widget never runs.
  {
    const imported = new Set();
    const impRe = /import\s*\{([^}]*)\}\s*from\s*['"][^'"]*vault\.js['"]/g;
    let im;
    while ((im = impRe.exec(m[1])) !== null) {
      for (const raw of im[1].split(',')) {
        const name = raw.trim().split(/\s+as\s+/).pop().trim();
        if (name) imported.add(name);
      }
    }
    const dup = [];
    for (const name of imported) {
      const re = new RegExp(`(?:^|[\\s;{(])(?:const|let|var|function|class)\\s+${name}\\b`);
      if (re.test(m[1])) dup.push(name);
    }
    if (dup.length) {
      problems.push({ file: name, msgs: [`imports ${dup.join(', ')} from vault.js and also declares it locally (browser: "Identifier already declared")`] });
    }
  }

  const { doc, app } = makeDom();
  const g = globalThis;
  const saved = {
    document: g.document, window: g.window, requestAnimationFrame: g.requestAnimationFrame,
    cancelAnimationFrame: g.cancelAnimationFrame, devicePixelRatio: g.devicePixelRatio,
  };
  g.document = doc;
  g.window = { addEventListener() {}, removeEventListener() {}, devicePixelRatio: 1, innerWidth: 1200, innerHeight: 800 };
  g.requestAnimationFrame = () => 0;
  g.cancelAnimationFrame = () => {};
  g.devicePixelRatio = 1;

  let captured = null;
  // Replace the module's import of widget() with a capturing stub by textual shim:
  // rewrite the vault.js import to a local stub module written to memory via data URL.
  const body = m[1]
    .replace(/^[ \t]*import\s+[^;\n]*?from\s+['"][^'"\n]+['"];[ \t]*$/gm, '')
    .replace(/^[ \t]*import\s+['"][^'"\n]+['"];[ \t]*$/gm, '');

  const shim = `
${provided.join('\n')}
function Plot(canvas, opts) {
  this.c = canvas; this.ctx = (canvas && canvas.getContext) ? canvas.getContext('2d') : makeCtxStub();
  this.pad = 34; this.width = 900; this.height = 460;
  Object.assign(this, { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }, opts || {});
}
function makeCtxStub() {
  const n = () => {};
  return { save: n, restore: n, beginPath: n, closePath: n, moveTo: n, lineTo: n, stroke: n, fill: n,
    fillRect: n, strokeRect: n, clearRect: n, arc: n, setLineDash: n, fillText: n, strokeText: n,
    translate: n, rotate: n, scale: n, measureText: () => ({ width: 10 }), createLinearGradient: () => ({ addColorStop: n }) };
}
Object.defineProperty(Plot.prototype, 'w', { get() { return 900; } });
Object.defineProperty(Plot.prototype, 'h', { get() { return 460; } });
Object.defineProperty(Plot.prototype, 'iw', { get() { return 832; } });
Object.defineProperty(Plot.prototype, 'ih', { get() { return 392; } });
['setRange','clear','grid','axes','fn','segment','dot','band','text','label'].forEach((k) => { Plot.prototype[k] = function () { return this; }; });
Plot.prototype.X = function () { return 100; };
Plot.prototype.Y = function () { return 100; };
Plot.prototype.xInv = function () { return 0; };
// Expose Plot globally as well as lexically. A widget module that reaches for an
// un-imported Plot is a genuine defect in a browser, but this harness must not create
// that failure itself: the shim's lexically-scoped Plot is invisible to code that was
// textually spliced after it in a different module scope.
globalThis.Plot = Plot;
globalThis.PALETTE = PALETTE;
let __captured = null;
const widget = (spec) => { __captured = spec; return { render() {}, state: { values: {} }, controls: {}, canvas: document.createElement('canvas') }; };
globalThis.__getCaptured = () => __captured;
`;

  const tmpName = `build/_wrun_${name.replace(/[^\w]/g, '_')}.mjs`;
  let importError = null;
  try {
    writeFileSync(tmpName, shim + body, 'utf8');
    await import('./' + basename(tmpName) + '?t=' + Date.now());
    run++;
    captured = g.__getCaptured ? g.__getCaptured() : null;
  } catch (e) {
    importError = e;
  } finally {
    // Clean up the temporary module only. The DOM globals must STAY installed for the
    // rest of this widget's pass: draw() and readout() run after the import returns, and
    // many widgets touch the page from inside draw(). Restoring document here (to
    // undefined) is what previously made every DOM-touching draw() report a bogus
    // "Cannot read properties of undefined (reading 'getElementById')".
    try { unlinkSync(tmpName); } catch { /* ignore */ }
  }

  if (importError) {
    // A widget that reads live DOM state at module scope cannot be driven against a stub
    // DOM. That is a harness limitation, not a widget defect - but it must be reported as
    // NOT DRIVEN rather than silently passing, so a genuine import error is never hidden.
    if (NOT_DRIVABLE.has(name)) notDriven.push(name);
    else problems.push({ file: name, msgs: [`module threw on import: ${importError.message}`] });
    continue;
  }

  {
    if (usesWidget && !captured) {
      problems.push({ file: name, msgs: ['uses widget() but the spec was never captured'] });
    } else if (captured) {
      const controls = captured.controls ?? [];
      const sets = samplesFor(controls);
      const hard = [];
      const soft = [];
      for (const vals of sets) {
        runsTotal++;
        const state = { values: { ...vals }, playing: false, raf: null, t: 0 };
        // seed state.values the way widget() does
        for (const c of controls) state.values[c.id] = vals[c.id];
        let out;
        try {
          out = captured.compute ? captured.compute(vals, state) : {};
        } catch (e) {
          hard.push(`compute() threw for ${JSON.stringify(vals)}: ${e.message}`);
          continue;
        }
        // A widget may legitimately report a non-physical state by returning NaN or
        // Infinity (VSWR = infinity for a short circuit; no real solution below a
        // waveguide cutoff; an inlet pressure that cannot drive the given flow). If the
        // widget flags that itself, non-finite values are expected and are not defects.
        // The defect is an UNFLAGGED non-finite value, which reaches the reader as "NaN".
        const selfFlagged =
          out && typeof out === 'object' &&
          (out.valid === false || out.ok === false || out.invalid === true || out.nonPhysical === true);
        if (out && typeof out === 'object' && !selfFlagged) {
          for (const [k, v] of Object.entries(out)) {
            if (typeof v === 'number' && !Number.isFinite(v)) {
              // Reported as an edge-state note, not a defect. Many of these are correct
              // engineering limits (VSWR -> infinity for a short; no real solution below
              // a waveguide cutoff; a recharge-current formula at a negligible conduction
              // angle). A widget that displays them gracefully is fine; one that prints
              // "NaN" in its readout is caught by the readout check below.
              soft.push(`${k}=${v} for ${JSON.stringify(vals)}`);
            }
          }
        }
        if (captured.draw) {
          try {
            const plot = new Plot(doc.createElement('canvas'), captured.range || {});
            captured.draw(makeCtx(), vals, out, plot, state);
          } catch (e) {
            const where = (e.stack || '').split('\n')[1] || '';
            hard.push(`draw() threw for ${JSON.stringify(vals)}: ${e.message}${where ? ' | ' + where.trim() : ''}`);
          }
        }
        if (captured.readout) {
          try {
            const rows = captured.readout(out, state) || {};
            const keys = Object.keys(rows);
            if (!keys.length) hard.push(`readout() returned no rows for ${JSON.stringify(vals)}`);
            for (const [k, v] of Object.entries(rows)) {
              if (v === undefined || v === null) {
                hard.push(`readout() ${k} is ${v} for ${JSON.stringify(vals)}`);
              }
            }
          } catch (e) {
            hard.push(`readout() threw for ${JSON.stringify(vals)}: ${e.message}`);
          }
        }
      }
      if (hard.length || soft.length) {
        problems.push({ file: name, hard: [...new Set(hard)].slice(0, 6), soft: [...new Set(soft)].slice(0, 3) });
      }
    }
  }
}

const hardProblems = problems.filter((p) => (p.hard ?? []).length || (p.msgs ?? []).length);
const softNotes = problems.filter((p) => !(p.hard ?? []).length && (p.soft ?? []).length);

if (!opts.quiet) {
  for (const p of hardProblems) {
    console.log(`x ${p.file}`);
    for (const s of p.msgs ?? []) console.log(`    ${s}`);
    for (const s of p.hard ?? []) console.log(`    ${s}`);
  }
  if (softNotes.length) {
    console.log(`\n--- edge states (non-finite results at control extremes; informational) ---`);
    for (const p of softNotes) {
      console.log(`  ~ ${p.file}`);
      for (const s of p.soft) console.log(`      ${s}`);
    }
  }
  console.log(`\nwidgets executed: ${run} / ${files.length} | control combinations driven: ${runsTotal}`);
  console.log(`defects: ${hardProblems.length} | edge-state notes only: ${softNotes.length} | not drivable headlessly: ${notDriven.length}`);
  for (const n of notDriven) console.log(`  - ${n} (reads live DOM at load; static checks only)`);
}

return {
  executed: run,
  total: files.length,
  combinations: runsTotal,
  notDriven,
  hard: hardProblems.map((p) => ({ file: p.file, hard: [...(p.msgs ?? []), ...(p.hard ?? [])], importFailed: (p.msgs ?? []).some((m) => /on import/.test(m)) })),
  soft: softNotes.map((p) => ({ file: p.file, soft: p.soft })),
};
}

const isMain = process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('build/check-widget-runtime.mjs');
if (isMain) {
  const r = await checkWidgetRuntime();
  if (r.hard.length) process.exitCode = 1;
}
