/* ============================================================================
 * vault.js — shared runtime for all ECE_Reviewer widgets.
 *
 * WHY THIS EXISTS: ~70 widgets each need sliders, plotting, a canvas, number
 * formatting and a readout. Writing that boilerplate per widget costs a large
 * amount of generation budget and produces inconsistent results. This file
 * provides it once. A widget then only declares its own model + draw function.
 *
 * USAGE (inside a widget .html file):
 *
 *   <link rel="stylesheet" href="../../Assets/snippets.css">
 *   <div id="app"></div>
 *   <script type="module">
 *     import { widget, fmt } from '../../Assets/vault.js';
 *
 *     widget({
 *       title: 'Disk / Washer Method',
 *       description: 'Rotate f(x) about the x-axis and watch the volume converge.',
 *       controls: [
 *         { id: 'a', label: 'a (left)',  min: 0,  max: 4,   step: 0.1, value: 0 },
 *         { id: 'b', label: 'b (right)', min: 0,  max: 4,   step: 0.1, value: 3 },
 *         { id: 'n', label: 'slices n',  min: 2,  max: 200, step: 1,   value: 20 },
 *       ],
 *       compute: (v) => {
 *         const f = (x) => Math.sqrt(x + 1);
 *         const dx = (v.b - v.a) / v.n;
 *         let V = 0;
 *         for (let i = 0; i < v.n; i++) {
 *           const x = v.a + (i + 0.5) * dx;
 *           V += Math.PI * f(x) ** 2 * dx;
 *         }
 *         return { V, exact: Math.PI * ((v.b + 1) ** 2 - (v.a + 1) ** 2) / 2 };
 *       },
 *       draw: (ctx, v, out, plot) => { ... },       // optional custom render
 *       readout: (out) => ({
 *         'Approx V': fmt(out.V, 4),
 *         'Exact V': fmt(out.exact, 4),
 *         'Error': fmt(Math.abs(out.V - out.exact), 4),
 *       }),
 *     });
 *   </script>
 *
 * The host page must NOT contain its own <script> that reads the DOM before this
 * module runs. Widgets are plain ES modules: opening the file directly with file://
 * works in most browsers for same-folder imports; Obsidian's built-in browser view
 * handles https/file imports of relative assets.
 * ==========================================================================*/

// ---------------------------------------------------------------------------
// number / math formatting
// ---------------------------------------------------------------------------

/** Format a number to `sig` significant digits, avoiding exponent noise. */
export function fmt(x, sig = 4) {
  if (x === null || x === undefined || Number.isNaN(x)) return '—';
  if (!Number.isFinite(x)) return x > 0 ? '∞' : '−∞';
  if (x === 0) return '0';
  const a = Math.abs(x);
  if (a >= 1e6 || a < 1e-4) return x.toExponential(Math.max(0, sig - 1)).replace('e', '×10^');
  const d = Math.max(0, sig - 1 - Math.floor(Math.log10(a)));
  return Number(x.toFixed(Math.min(d, 12))).toString();
}

/** Format with an SI prefix (k, M, G, m, µ, n, p). unit is appended verbatim. */
export function si(x, unit = '', sig = 4) {
  if (!Number.isFinite(x) || x === 0) return `${fmt(x, sig)}${unit ? ' ' + unit : ''}`;
  const table = [
    [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'],
    [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'],
  ];
  const a = Math.abs(x);
  for (const [m, p] of table) {
    if (a >= m) return `${fmt(x / m, sig)} ${p}${unit}`;
  }
  return `${fmt(x, sig)} ${unit}`;
}

export const deg = (r) => (r * 180) / Math.PI;
export const rad = (d) => (d * Math.PI) / 180;
export const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
export const lerp = (a, b, t) => a + (b - a) * t;

// ---------------------------------------------------------------------------
// colour palette (shared so widgets look like one vault)
// ---------------------------------------------------------------------------

export const PALETTE = {
  bg: '#1e1e2e',
  panel: '#27273a',
  grid: '#3a3a52',
  axis: '#8a8aa8',
  text: '#e4e4f0',
  dim: '#a0a0be',
  accent: '#89b4fa',
  accent2: '#f38ba8',
  accent3: '#a6e3a1',
  accent4: '#fab387',
  accent5: '#cba6f7',
  warn: '#f9e2af',
};

// ---------------------------------------------------------------------------
// graphing helper: maps data space <-> canvas space
// ---------------------------------------------------------------------------

export class Plot {
  constructor(canvas, { xMin = -1, xMax = 1, yMin = -1, yMax = 1, pad = 34 } = {}) {
    this.c = canvas;
    this.ctx = canvas.getContext('2d');
    this.pad = pad;
    this.setRange({ xMin, xMax, yMin, yMax });
  }

  setRange({ xMin, xMax, yMin, yMax }) {
    this.xMin = xMin; this.xMax = xMax; this.yMin = yMin; this.yMax = yMax;
  }

  get w() { return this.c.width; }
  get h() { return this.c.height; }
  get iw() { return this.w - 2 * this.pad; }
  get ih() { return this.h - 2 * this.pad; }

  X(x) { return this.pad + ((x - this.xMin) / (this.xMax - this.xMin)) * this.iw; }
  Y(y) { return this.h - this.pad - ((y - this.yMin) / (this.yMax - this.yMin)) * this.ih; }
  xInv(px) { return this.xMin + ((px - this.pad) / this.iw) * (this.xMax - this.xMin); }

  clear(color = PALETTE.bg) {
    const { ctx } = this;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, this.w, this.h);
    return this;
  }

  grid(stepX = 1, stepY = 1, color = PALETTE.grid) {
    const { ctx } = this;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    for (let x = Math.ceil(this.xMin / stepX) * stepX; x <= this.xMax; x += stepX) {
      ctx.beginPath(); ctx.moveTo(this.X(x), this.Y(this.yMin)); ctx.lineTo(this.X(x), this.Y(this.yMax)); ctx.stroke();
    }
    for (let y = Math.ceil(this.yMin / stepY) * stepY; y <= this.yMax; y += stepY) {
      ctx.beginPath(); ctx.moveTo(this.X(this.xMin), this.Y(y)); ctx.lineTo(this.X(this.xMax), this.Y(y)); ctx.stroke();
    }
    ctx.restore();
    return this;
  }

  axes(color = PALETTE.axis) {
    const { ctx } = this;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    if (this.yMin <= 0 && this.yMax >= 0) {
      ctx.beginPath(); ctx.moveTo(this.X(this.xMin), this.Y(0)); ctx.lineTo(this.X(this.xMax), this.Y(0)); ctx.stroke();
    }
    if (this.xMin <= 0 && this.xMax >= 0) {
      ctx.beginPath(); ctx.moveTo(this.X(0), this.Y(this.yMin)); ctx.lineTo(this.X(0), this.Y(this.yMax)); ctx.stroke();
    }
    ctx.fillStyle = PALETTE.dim;
    ctx.font = '11px ui-monospace, monospace';
    for (let x = Math.ceil(this.xMin / 1) * 1; x <= this.xMax; x += 1) {
      if (x === 0) continue;
      ctx.fillText(String(+x.toFixed(2)), this.X(x) - 6, this.Y(0) + 13);
    }
    for (let y = Math.ceil(this.yMin / 1) * 1; y <= this.yMax; y += 1) {
      if (y === 0) continue;
      ctx.fillText(String(+y.toFixed(2)), this.X(0) + 5, this.Y(y) + 4);
    }
    ctx.restore();
    return this;
  }

  /** Plot y = f(x) across [a,b] with `samples` points. */
  fn(f, a, b, { color = PALETTE.accent, width = 2, samples = 400, dash = null } = {}) {
    const { ctx } = this;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= samples; i++) {
      const x = lerp(a, b, i / samples);
      const y = f(x);
      if (!Number.isFinite(y)) { started = false; continue; }
      const px = this.X(x), py = this.Y(clamp(y, this.yMin - 1e3, this.yMax + 1e3));
      if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.restore();
    return this;
  }

  segment(x1, y1, x2, y2, opts = {}) {
    const { ctx } = this;
    ctx.save();
    ctx.strokeStyle = opts.color ?? PALETTE.accent2;
    ctx.lineWidth = opts.width ?? 2;
    if (opts.dash) ctx.setLineDash(opts.dash);
    ctx.beginPath(); ctx.moveTo(this.X(x1), this.Y(y1)); ctx.lineTo(this.X(x2), this.Y(y2)); ctx.stroke();
    ctx.restore();
    return this;
  }

  dot(x, y, { color = PALETTE.warn, r = 4, label = null } = {}) {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(this.X(x), this.Y(y), r, 0, Math.PI * 2); ctx.fill();
    if (label) {
      ctx.fillStyle = PALETTE.text;
      ctx.font = '12px ui-monospace, monospace';
      ctx.fillText(label, this.X(x) + 7, this.Y(y) - 7);
    }
    ctx.restore();
    return this;
  }

  /** Filled vertical band between two y-functions from x1 to x2 (washer/area). */
  band(fTop, fBot, x1, x2, { color = 'rgba(137,180,250,0.28)' } = {}) {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    const N = 120;
    for (let i = 0; i <= N; i++) {
      const x = lerp(x1, x2, i / N);
      const px = this.X(x), py = this.Y(fTop(x));
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    for (let i = N; i >= 0; i--) {
      const x = lerp(x1, x2, i / N);
      ctx.lineTo(this.X(x), this.Y(fBot(x)));
    }
    ctx.closePath(); ctx.fill();
    ctx.restore();
    return this;
  }

  text(str, x, y, { color = PALETTE.text, font = '13px system-ui, sans-serif', align = 'left' } = {}) {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = color; ctx.font = font; ctx.textAlign = align;
    ctx.fillText(str, x, y);
    ctx.restore();
    return this;
  }

  /** Data-space label convenience: label(str, x, y). */
  label(str, x, y, opts = {}) { return this.text(str, this.X(x), this.Y(y), opts); }
}

// ---------------------------------------------------------------------------
// widget host: builds controls + readout, wires the render loop, handles DPR
// ---------------------------------------------------------------------------

/**
 * @param {object} spec
 * @param {string} spec.title
 * @param {string} [spec.description]
 * @param {Array}  spec.controls   [{id,label,min,max,step,value,unit,type}]
 *                                 type: 'range' (default) | 'checkbox' | 'select'
 * @param {function} [spec.compute] (values, state) => any
 * @param {function} [spec.draw]    (ctx, values, out, plot, state) => void
 * @param {function} [spec.readout] (out, state) => Record<string,string>
 * @param {number} [spec.height]
 * @param {object} [spec.range]     {xMin,xMax,yMin,yMax} for the default plot
 */
export function widget(spec) {
  const root = document.getElementById('app') || document.body;
  root.classList.add('vault-widget');

  const state = { values: {}, playing: false, raf: null, t: 0 };
  for (const c of spec.controls ?? []) {
    state.values[c.id] = c.type === 'checkbox' ? !!c.value : c.value;
  }

  // --- DOM ---------------------------------------------------------------
  const head = el('header', 'vault-widget-head');
  if (spec.title) head.appendChild(el('h2', 'vault-widget-title', spec.title));
  if (spec.description) head.appendChild(el('p', 'vault-widget-desc', spec.description));
  root.appendChild(head);

  const canvas = document.createElement('canvas');
  canvas.className = 'vault-widget-canvas';
  canvas.width = 900;
  canvas.height = spec.height ?? 460;
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  root.appendChild(canvas);

  const out = el('div', 'vault-widget-readout');
  root.appendChild(out);

  const panel = el('div', 'vault-widget-controls');
  root.appendChild(panel);

  const controls = {};
  for (const c of spec.controls ?? []) {
    const wrap = el('label', 'vault-widget-control');
    const name = el('span', 'vault-widget-label', c.label ?? c.id);
    const val = el('span', 'vault-widget-value');
    wrap.appendChild(name);
    wrap.appendChild(val);

    let input;
    if (c.type === 'checkbox') {
      input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = !!c.value;
    } else if (c.type === 'select') {
      input = document.createElement('select');
      for (const o of c.options ?? []) {
        const opt = document.createElement('option');
        opt.value = o.value ?? o; opt.textContent = o.label ?? o;
        input.appendChild(opt);
      }
      input.value = c.value;
    } else {
      input = document.createElement('input');
      input.type = 'range';
      input.min = c.min ?? 0; input.max = c.max ?? 1;
      input.step = c.step ?? 0.01; input.value = c.value ?? 0;
    }
    input.className = 'vault-widget-input';
    wrap.appendChild(input);
    panel.appendChild(wrap);

    const show = () => {
      const v = state.values[c.id];
      val.textContent = typeof v === 'number' ? fmt(v, 4) + (c.unit ? ` ${c.unit}` : '') : String(v);
    };
    const onChange = () => {
      state.values[c.id] =
        c.type === 'checkbox' ? input.checked
        : c.type === 'select' ? input.value
        : parseFloat(input.value);
      show();
      if (typeof spec.onChange === 'function') spec.onChange(state.values, state);
      render();
    };
    input.addEventListener('input', onChange);
    input.addEventListener('change', onChange);
    controls[c.id] = { input, show };
    show();
  }

  // --- render loop -------------------------------------------------------
  const plot = new Plot(canvas, {
    xMin: -4, xMax: 4, yMin: -2, yMax: 4, ...(spec.range ?? {}),
  });

  function render() {
    const values = { ...state.values };
    let result = {};
    try {
      if (typeof spec.compute === 'function') result = spec.compute(values, state) ?? {};
    } catch (e) {
      result = { error: String(e && e.message ? e.message : e) };
    }
    try {
      if (typeof spec.draw === 'function') {
        spec.draw(plot.ctx, values, result, plot, state);
      } else {
        plot.clear().grid().axes();
      }
    } catch (e) {
      plot.clear();
      plot.text('draw error: ' + e.message, 20, 30, { color: PALETTE.accent2 });
    }
    // readout
    out.innerHTML = '';
    let rows = {};
    try {
      if (typeof spec.readout === 'function') rows = spec.readout(result, state) ?? {};
    } catch (e) { rows = { error: String(e) }; }
    for (const [k, v] of Object.entries(rows)) {
      const cell = el('div', 'vault-widget-readout-item');
      cell.appendChild(el('span', 'vault-widget-readout-key', k));
      cell.appendChild(el('span', 'vault-widget-readout-val', v));
      out.appendChild(cell);
    }
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  window.addEventListener('resize', render);
  render();
  return { render, state, controls, canvas };
}

// ---------------------------------------------------------------------------
// discrete helpers used by several widgets
// ---------------------------------------------------------------------------

/** Numerical derivative (central difference). */
export const d = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);

/** Composite Simpson's rule. */
export function simpson(f, a, b, n = 200) {
  if (n % 2) n++;
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

/** Composite trapezoidal rule. */
export function trapezoid(f, a, b, n = 200) {
  const h = (b - a) / n;
  let s = (f(a) + f(b)) / 2;
  for (let i = 1; i < n; i++) s += f(a + i * h);
  return s * h;
}

/** Solve a 2x2 system [[a,b],[c,d]] x = [e,f]. */
export function solve2(a, b, c, d, e, f) {
  const det = a * d - b * c;
  if (Math.abs(det) < 1e-15) return null;
  return { x: (e * d - b * f) / det, y: (a * f - e * c) / det };
}
