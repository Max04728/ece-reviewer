// apply-displaystyle.mjs — render tall INLINE maths at full size, without touching prose.
//
// THE PROBLEM: MathJax renders inline `$...$` in script style, so a fraction, root or integral
// sitting inside a sentence comes out at roughly half size — legible alone, hard to read in dense
// prose. Prefixing the formula with `\displaystyle` restores full-size glyphs while it stays
// inline and the sentence is untouched.
//
// WHY A SEPARATE TOOL: this changes formula bodies, and `apply-rewrites.mjs` deliberately refuses
// that — its guard requires an entry's ordered `$...$` list to be byte-identical, which is what
// stops a prose rewrite from silently altering mathematics. Relaxing that guard would weaken the
// protection for every future prose edit, so the formatting pass lives here instead, with its own
// narrower guard (see `normalizedOnly` below).
//
// TARGET SET — an inline formula that:
//   (a) renders INLINE, i.e. the layout transform will not hoist it (it is not
//       substantial-and-clause-start). This is the SAFETY PROPERTY: a formula that stays inline
//       cannot change the note's block structure, so this pass can only change appearance.
//   (b) contains a construct MathJax renders small inline (fraction, root, integral, sum, limit),
//   (c) is at least CONCEPT_PROMOTE_MIN characters.
// Formulas already using `\displaystyle`, `\dfrac` or `\tfrac` are left alone: those already
// render full size, and `\tfrac` asks for small on purpose.
//
// Usage:
//   node build/apply-displaystyle.mjs                          # dry run, whole vault
//   node build/apply-displaystyle.mjs --area "<Part/Area>"     # one area
//   node build/apply-displaystyle.mjs --report build/reports/displaystyle.md
//   node build/apply-displaystyle.mjs --apply
// Nothing is written without --apply.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { CONCEPT_PROMOTE_MIN, CONCEPT_PROMOTE_OPERATOR } from './formula-layout.mjs';

const PAYLOAD_DIR = 'build/payload';
const CLAUSE_END = new Set([':', '.', ';', '!', '?']);
const INSERT = '\\displaystyle ';

/** Constructs that MathJax renders in script size inline. */
const TALL = [
  ['\\frac', /\\frac/],
  ['\\sqrt', /\\sqrt/],
  ['\\int', /\\int/],
  ['\\sum', /\\sum/],
  ['\\prod', /\\prod/],
  ['\\lim', /\\lim/],
  ['\\partial', /\\partial/],
];

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

const substantial = (b) => {
  const t = String(b).trim();
  return t.length >= CONCEPT_PROMOTE_MIN && CONCEPT_PROMOTE_OPERATOR.test(t);
};

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

/** The same encoding styles `apply-rewrites.mjs` must cope with (literal vs \uXXXX escapes). */
function unicodeEscaped(s, upper) {
  return JSON.stringify(String(s)).slice(1, -1).replace(/[\u0080-\uffff]/g, (c) => {
    const hex = c.charCodeAt(0).toString(16).padStart(4, '0');
    return `\\u${upper ? hex.toUpperCase() : hex}`;
  });
}
const ESCAPE_STYLES = [
  { name: 'literal', enc: (s) => JSON.stringify(String(s)).slice(1, -1) },
  { name: 'unicode-lower', enc: (s) => unicodeEscaped(s, false) },
  { name: 'unicode-upper', enc: (s) => unicodeEscaped(s, true) },
];
const count = (hay, needle) => hay.split(needle).length - 1;

/** The on-disk encoding of `decoded` that occurs exactly once in `raw`, or null. */
function locate(raw, decoded) {
  const tries = ESCAPE_STYLES.map((st) => {
    const text = st.enc(decoded);
    return { name: st.name, enc: st.enc, text, hits: count(raw, text) };
  });
  return { style: tries.find((t) => t.hits === 1) || null, tries };
}

/**
 * Post-splice guard: the new entry's formula list must be the old one with `\displaystyle `
 * prepended at exactly the intended indices — nothing else may differ.
 */
function normalizedOnly(before, after, indices) {
  if (before.length !== after.length) return false;
  // Whitespace runs are insignificant in TeX, and the insertion lands just after the opening `$`,
  // so a body written as `$ x $` gains a second leading space. Normalise before comparing, or this
  // guard rejects exactly those formulas.
  const norm = (s) => String(s).trim().replace(/\s+/g, ' ');
  const want = new Set(indices);
  for (let k = 0; k < before.length; k += 1) {
    const a = norm(before[k]);
    const b = norm(after[k]);
    if (want.has(k)) {
      if (b !== '\\displaystyle ' + a) return false;
    } else if (a !== b) return false;
  }
  return true;
}

const argv = process.argv.slice(2);
const apply = argv.includes('--apply');
const areaArg = (() => { const i = argv.indexOf('--area'); return i > -1 ? argv[i + 1] : null; })();
const reportPath = (() => { const i = argv.indexOf('--report'); return i > -1 ? argv[i + 1] : null; })();

const files = walk(PAYLOAD_DIR).filter(
  (f) => !areaArg || f.replace(/\\/g, '/').includes(areaArg.replace(/\\/g, '/'))
);
if (!files.length) {
  console.error(`no payloads under ${PAYLOAD_DIR} match "${areaArg}"`);
  process.exit(2);
}

console.log(`${apply ? 'APPLY' : 'REPORT (dry run)'}  displaystyle pass`);
console.log(`payloads scanned: ${files.length}${areaArg ? `  area: ${areaArg}` : ''}`);
console.log('');

const report = [];
const perArea = new Map();
const perConstruct = new Map();
const samples = [];
let sites = 0;
let payloadsTouched = 0;
let skippedAmbiguous = 0;
let filesWritten = 0;

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  let parsed;
  try { parsed = JSON.parse(raw); } catch { continue; }
  if (!Array.isArray(parsed.concept)) continue;

  let out = raw;
  let touchedHere = 0;

  parsed.concept.forEach((rawEntry, idx) => {
    const decoded = String(rawEntry);
    const spans = scanInline(decoded);
    const targets = [];
    spans.forEach((m, k) => {
      const body = m.body.trim();
      if (body.length < CONCEPT_PROMOTE_MIN) return;
      if (/\\displaystyle|\\dfrac|\\tfrac/.test(body)) return;
      // (a) safety property: only formulas that render inline, so block structure cannot change.
      if (substantial(body) && atClauseStart(decoded, m.start)) return;
      const hits = TALL.filter(([, re]) => re.test(body));
      if (!hits.length) return;
      targets.push({ k, m, body, hits: hits.map(([n]) => n) });
    });
    if (!targets.length) return;

    // Insert in reverse so earlier offsets stay valid.
    let next = decoded;
    for (let t = targets.length - 1; t >= 0; t -= 1) {
      const at = targets[t].m.start + 1;
      next = next.slice(0, at) + INSERT + next.slice(at);
    }

    const located = locate(out, decoded);
    if (!located.style) {
      skippedAmbiguous += 1;
      console.log(`  !! cannot locate concept[${idx + 1}] uniquely in ${file.replace(/\\/g, '/')} — skipped`);
      return;
    }
    const span = out.indexOf(located.style.text);
    const spliced = out.slice(0, span) + located.style.enc(next) + out.slice(span + located.style.text.length);

    let re;
    try { re = JSON.parse(spliced); } catch (e) {
      skippedAmbiguous += 1;
      console.log(`  !! result does not parse in ${file.replace(/\\/g, '/')}: ${e.message} — skipped`);
      return;
    }
    if (String(re.concept[idx]) !== next) {
      skippedAmbiguous += 1;
      console.log(`  !! post-splice check failed for concept[${idx + 1}] in ${file.replace(/\\/g, '/')} — skipped`);
      return;
    }
    if (!normalizedOnly(spans.map((m) => m.body), scanInline(next).map((m) => m.body), targets.map((t) => t.k))) {
      skippedAmbiguous += 1;
      console.log(`  !! normalisation guard failed for concept[${idx + 1}] in ${file.replace(/\\/g, '/')} — skipped`);
      return;
    }

    out = spliced;
    touchedHere += targets.length;
    for (const t of targets) {
      sites += 1;
      for (const h of t.hits) perConstruct.set(h, (perConstruct.get(h) || 0) + 1);
      if (samples.length < 6) samples.push({ file: file.replace(/\\/g, '/'), entry: idx + 1, body: t.body });
    }
  });

  if (touchedHere) {
    const a = file.replace(/\\/g, '/').split('/').slice(2, 4).join('/');
    perArea.set(a, (perArea.get(a) || 0) + touchedHere);
    payloadsTouched += 1;
    report.push(`- ${file.replace(/\\/g, '/')} — ${touchedHere} formula(s)`);
    if (apply) {
      writeFileSync(file, out, 'utf8');
      filesWritten += 1;
    }
  }
}

console.log(`inline formulas to normalise : ${sites}`);
console.log(`payloads affected            : ${payloadsTouched}`);
console.log(`skipped (guard/ambiguity)    : ${skippedAmbiguous}`);
if (apply) console.log(`payloads written             : ${filesWritten}`);
console.log('');
console.log('by construct (a formula can match more than one):');
for (const [n, c] of [...perConstruct.entries()].sort((x, y) => y[1] - x[1])) {
  console.log(`  ${n.padEnd(10)} ${c}`);
}
console.log('');
console.log('by area (top 12):');
for (const [a, c] of [...perArea.entries()].sort((x, y) => y[1] - x[1]).slice(0, 12)) {
  console.log(`  ${String(c).padStart(3)}  ${a}`);
}
if (samples.length) {
  console.log('');
  console.log('samples:');
  for (const s of samples) console.log(`  ${s.file.split('/').slice(-1)[0]} entry ${s.entry}: $${s.body.slice(0, 60)}$`);
}
if (!apply) console.log('\nDry run — nothing written. Re-run with --apply.');

if (reportPath) {
  const md = [
    '# displaystyle pass — full-size inline maths',
    '',
    `Generated by \`build/apply-displaystyle.mjs\`${apply ? '' : ' (dry run)'}.`,
    '',
    `- inline formulas normalised : ${sites}`,
    `- payloads affected          : ${payloadsTouched}`,
    `- skipped                    : ${skippedAmbiguous}`,
    '',
    'Each entry below had `\\displaystyle` inserted at the start of the listed number of inline',
    'formulas. Prose and block structure are unchanged by construction: only formulas that render',
    'inline are targeted, so no display block can appear or disappear.',
    '',
    ...report,
    '',
  ].join('\n');
  if (!existsSync(dirname(reportPath))) writeFileSync(reportPath, md, 'utf8');
  else writeFileSync(reportPath, md, 'utf8');
  console.log(`report written: ${reportPath.replace(/\\/g, '/')}`);
}
