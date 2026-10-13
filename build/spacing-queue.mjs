// spacing-queue.mjs — the work queue for "separate the equations from the prose".
//
// The display threshold is a GLOBAL, FREE lever and it has already been spent
// (`CONCEPT_PROMOTE_MIN` is 15; dropping it to 12 would buy only ~20 more lines vault-wide, per
// `check-promote.mjs`). Everything still inline is inline because its equation sits MID-SENTENCE,
// and no threshold can fix that — the prose has to introduce the equation with a lead-in clause.
// That work is per-paragraph, so the cost driver is the number of AFFECTED PARAGRAPHS, not the
// number of formulas, and one rewrite usually fixes several formulas at once.
//
// This prints that queue, worst first, so the work can be targeted instead of applied blindly to
// all 408 notes. A formula counts as affected when it is equation-like (matches
// CONCEPT_PROMOTE_OPERATOR), at least CONCEPT_PROMOTE_MIN characters of content, and NOT already at
// a clause start (so the renderer leaves it inline).
//
// Usage:
//   node build/spacing-queue.mjs [--top N] [--tall-only]
//   node build/spacing-queue.mjs --area "<Part/Area>"

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CONCEPT_PROMOTE_MIN, CONCEPT_PROMOTE_OPERATOR } from './formula-layout.mjs';

const PAYLOAD_DIR = 'build/payload';
const CLAUSE_END = new Set([':', '.', ';', '!', '?']);
const TALL = /\\frac|\\dfrac|\\sqrt|\\int|\\sum|\\prod|\\lim|\\partial/;

function scanInline(text) {
  const s = String(text);
  const out = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] !== '$') { i += 1; continue; }
    if (s[i + 1] === '$') { const e = s.indexOf('$$', i + 2); if (e === -1) break; i = e + 2; continue; }
    let j = i + 1;
    while (j < s.length && s[j] !== '$') j += 1;
    if (j >= s.length) break;
    out.push({ body: s.slice(i + 1, j), start: i, end: j + 1 });
    i = j + 1;
  }
  return out;
}

function atClauseStart(src, off) {
  const before = src.slice(0, off).replace(/[ \t]+$/, '');
  const last = before.slice(-1);
  return before === '' || last === '\n' || CLAUSE_END.has(last);
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.json')) out.push(p);
  }
  return out;
}

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : d; };
const TOP = Number(opt('--top', 30));
const areaArg = opt('--area', null);
const tallOnly = argv.includes('--tall-only');
const contentLength = (b) => String(b).trim().replace(/^\\displaystyle\s+/, '').length;

const rows = [];
let totalFormulas = 0;
let totalTall = 0;
let totalParagraphs = 0;

for (const file of walk(PAYLOAD_DIR)) {
  const rel = file.replace(/\\/g, '/');
  if (areaArg && !rel.includes(areaArg)) continue;
  let j;
  try { j = JSON.parse(readFileSync(file, 'utf8')); } catch { continue; }
  const concept = Array.isArray(j.concept) ? j.concept : [];

  let formulas = 0;
  let tall = 0;
  let paragraphs = 0;
  concept.forEach((rawEntry) => {
    const src = String(rawEntry);
    let here = 0;
    let hereTall = 0;
    for (const m of scanInline(src)) {
      const body = m.body.trim();
      if (!CONCEPT_PROMOTE_OPERATOR.test(body)) continue;
      if (contentLength(body) < CONCEPT_PROMOTE_MIN) continue;
      if (atClauseStart(src, m.start)) continue;      // already gets its own line
      if (tallOnly && !TALL.test(body)) continue;
      here += 1;
      if (TALL.test(body)) hereTall += 1;
    }
    if (here) { paragraphs += 1; formulas += here; tall += hereTall; }
  });

  if (!formulas) continue;
  rows.push({ note: rel.split('/').slice(-1)[0], area: rel.split('/').slice(2, 4).join('/'), paragraphs, formulas, tall });
  totalFormulas += formulas;
  totalTall += tall;
  totalParagraphs += paragraphs;
}

rows.sort((a, b) => b.paragraphs - a.paragraphs || b.formulas - a.formulas);

console.log(`affected notes        : ${rows.length} of 408`);
console.log(`affected paragraphs   : ${totalParagraphs}   <- the unit of work (one rewrite fixes several formulas)`);
console.log(`affected formulas     : ${totalFormulas}   (of which ${totalTall} contain a fraction/root/integral)`);
console.log('');
const buckets = [[0, 0], [1, 1], [2, 3], [4, 6], [7, 10], [11, 999]];
console.log('paragraphs per note:');
for (const [lo, hi] of buckets) {
  const n = rows.filter((r) => r.paragraphs >= lo && r.paragraphs <= hi).length;
  const label = hi === 999 ? `${lo}+` : lo === hi ? `${lo}` : `${lo}-${hi}`;
  console.log(`  ${label.padEnd(6)} note(s): ${n}`);
}
console.log('');
console.log('cumulative coverage (work saved by stopping early):');
for (const n of [10, 25, 50, 100, 200]) {
  const slice = rows.slice(0, n);
  const p = slice.reduce((s, r) => s + r.paragraphs, 0);
  const f = slice.reduce((s, r) => s + r.formulas, 0);
  console.log(`  top ${String(n).padStart(3)} notes -> ${String(p).padStart(4)} paragraphs (${((p / totalParagraphs) * 100).toFixed(0)}%), ${String(f).padStart(4)} formulas`);
}
console.log('');
console.log(`worst ${Math.min(TOP, rows.length)} notes:`);
console.log('  paras  forms  tall  note');
for (const r of rows.slice(0, TOP)) {
  console.log(`  ${String(r.paragraphs).padStart(5)}  ${String(r.formulas).padStart(5)}  ${String(r.tall).padStart(4)}  ${r.note.replace(/\.json$/, '')}  [${r.area}]`);
}
