// apply-colon-pass.mjs — the cheap half of "separate the equations from the prose".
//
// WHAT IT DOES: when an inline equation is introduced by a copula or reporting verb —
// "the driving-point impedance is $z_{11}$" — inserting a single `:` after that word makes the
// formula begin a clause, so the layout transform gives it its own `$$` line. One character, no
// rewriting, no model tokens.
//
// WHY ONLY THAT: 2274 equations sit mid-sentence. Only ~400 of them follow a word where a colon is
// grammatical. 229 follow "and", 114 "so", 102 "with", 66 "at" — a colon there is simply wrong and
// the sentence has to be rephrased, which is a separate (and far more expensive) job. Measured with
// a throwaway probe, not assumed.
//
// SAFETY:
//   - It never touches a formula. The guard re-scans the entry afterwards and requires the ordered
//     list of `$...$` bodies to be byte-identical, so this pass cannot alter mathematics.
//   - It skips a site when the formula is followed by a capitalised word with no punctuation
//     between ("$EQ$ The next..."), because hoisting that would put a capital at the start of a
//     continuation line — a visible seam. Skipped sites are reported, not silently mangled.
//   - The verb set is deliberately conservative: copulas and reporting verbs only. Transitive verbs
//     (satisfies, requires, produces, equals, has) are EXCLUDED because "satisfies: $x$" is wrong.
//
// Usage:
//   node build/apply-colon-pass.mjs [--payload <fragment>] [--area "<Part/Area>"] [--sample 12]
//   node build/apply-colon-pass.mjs --apply
// Nothing is written without --apply.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CONCEPT_PROMOTE_MIN, CONCEPT_PROMOTE_OPERATOR } from './formula-layout.mjs';

const PAYLOAD_DIR = 'build/payload';
const CLAUSE_END = new Set([':', '.', ';', '!', '?']);

/** Copulas and reporting verbs that a colon may legitimately follow. */
const SAFE = new Set([
  'is', 'are', 'was', 'were', 'be',
  'becomes', 'become',
  'gives', 'give',
  'yields', 'yield',
  'follows', 'reads', 'means', 'implies', 'holds',
]);

/**
 * Unit-looking tokens that must not open the line after a hoisted equation. This is the SAME list
 * `audit-concept-formulas.mjs` uses, kept in sync deliberately: the first run of this pass inserted
 * 348 colons and stranded 3 units (`m`, `m`, `nm`) because the original guard only looked for a
 * CAPITALISED next word. A colon is only safe when the token after the equation is not a unit.
 */
const UNIT_TOKEN =
  /^(?:eV|keV|MeV|GeV|mV|kV|µV|uV|nV|mA|µA|uA|nA|kA|kW|MW|mW|µW|uW|nW|pW|kHz|MHz|GHz|THz|ms|µs|ns|ps|cm|mm|µm|um|nm|km|mH|µH|uH|nH|pF|nF|µF|uF|mF|kΩ|MΩ|Ω|ohm|ohms|dBi|dBd|dBm|dBW|Hz|rad|sr|mol|kg|mg|µg|Wb|nmi|ft|mi|yd|V|A|W|J|mJ|µJ|uJ|kJ|MJ|F|H|T|C|N|K|Pa|kPa|MPa|GPa|m|s|g|L|mL|dB)$/;

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
function locate(raw, decoded) {
  const tries = ESCAPE_STYLES.map((st) => {
    const text = st.enc(decoded);
    return { name: st.name, enc: st.enc, text, hits: count(raw, text) };
  });
  return tries.find((t) => t.hits === 1) || null;
}

const contentLength = (b) => String(b).trim().replace(/^\\displaystyle\s+/, '').length;

const argv = process.argv.slice(2);
const opt = (n, d) => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : d; };
const apply = argv.includes('--apply');
const areaArg = opt('--area', null);
const payloadArg = opt('--payload', null);
const SAMPLE = Number(opt('--sample', 12));

const files = walk(PAYLOAD_DIR).filter((f) => {
  const r = f.replace(/\\/g, '/');
  if (areaArg && !r.includes(areaArg)) return false;
  if (payloadArg && !r.includes(payloadArg)) return false;
  return true;
});

console.log(`${apply ? 'APPLY' : 'REPORT (dry run)'}  colon pass`);
console.log(`payloads scanned: ${files.length}`);
console.log('');

let inserted = 0;
let payloadsTouched = 0;
let skippedSeam = 0;
let skippedWord = 0;
let skippedUnit = 0;
const byWord = new Map();
const samples = [];
const seams = [];

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  let parsed;
  try { parsed = JSON.parse(raw); } catch { continue; }
  if (!Array.isArray(parsed.concept)) continue;

  let out = raw;
  let here = 0;

  parsed.concept.forEach((rawEntry, idx) => {
    const src = String(rawEntry);
    const spans = scanInline(src);
    const targets = [];

    for (const m of spans) {
      const body = m.body.trim();
      if (!CONCEPT_PROMOTE_OPERATOR.test(body)) continue;
      if (contentLength(body) < CONCEPT_PROMOTE_MIN) continue;
      if (atClauseStart(src, m.start)) continue;          // already gets its own line
      const before = src.slice(0, m.start).replace(/[ \t]+$/, '');
      const wm = before.match(/([A-Za-z'\u2019-]+)$/);
      if (!wm) { skippedWord += 1; continue; }
      const word = wm[1].toLowerCase();
      if (!SAFE.has(word)) { skippedWord += 1; continue; }
      const after = src.slice(m.end);
      const nextTok = after.match(/^[ \t]+([^\s,;.)\]]+)/);
      if (nextTok && UNIT_TOKEN.test(nextTok[1])) {      // would strand a unit on the next line
        skippedUnit += 1;
        continue;
      }
      if (/^[ \t]+[A-Z]/.test(after)) {                   // would strand a capitalised word
        skippedSeam += 1;
        seams.push(`${file.replace(/\\/g, '/')} entry ${idx + 1}: "...${src.slice(Math.max(0, m.start - 40), m.start)}[EQ] ${after.slice(0, 34).replace(/\s+/g, ' ')}"`);
        continue;
      }
      targets.push({ at: before.length, word, body });
    }
    if (!targets.length) return;

    // Insert in reverse offset order so earlier offsets stay valid.
    let next = src;
    for (let t = targets.length - 1; t >= 0; t -= 1) {
      next = next.slice(0, targets[t].at) + ':' + next.slice(targets[t].at);
    }

    // GUARD 1: the ordered formula list is byte-identical (this pass must not touch mathematics).
    const beforeBodies = spans.map((m) => m.body.trim());
    const afterSpans = scanInline(next);
    const afterBodies = afterSpans.map((m) => m.body.trim());
    if (beforeBodies.length !== afterBodies.length || beforeBodies.some((b, k) => b !== afterBodies[k])) {
      console.log(`  !! formula list changed in ${file.replace(/\\/g, '/')} entry ${idx + 1} — skipped`);
      return;
    }
    // GUARD 2: every targeted formula is now at a clause start, i.e. the colon landed where intended.
    const nowStart = targets.every((t) => afterSpans.some((m) => atClauseStart(next, m.start) && m.body.trim() === t.body));
    if (!nowStart) {
      console.log(`  !! a colon did not take effect in ${file.replace(/\\/g, '/')} entry ${idx + 1} — skipped`);
      return;
    }

    const style = locate(out, src);
    if (!style) { console.log(`  !! cannot locate entry ${idx + 1} in ${file.replace(/\\/g, '/')} — skipped`); return; }
    const span = out.indexOf(style.text);
    const spliced = out.slice(0, span) + style.enc(next) + out.slice(span + style.text.length);
    let re;
    try { re = JSON.parse(spliced); } catch (e) {
      console.log(`  !! result does not parse (${e.message}) — skipped`);
      return;
    }
    if (String(re.concept[idx]) !== next) { console.log('  !! post-splice check failed — skipped'); return; }

    out = spliced;
    here += targets.length;
    inserted += targets.length;
    for (const t of targets) {
      byWord.set(t.word, (byWord.get(t.word) || 0) + 1);
      if (samples.length < SAMPLE) {
        const i = targets.indexOf(t);
        samples.push(`  ...${src.slice(Math.max(0, t.at - 46), t.at)}: $${t.body.slice(0, 46)}$`);
      }
    }
  });

  if (here) {
    payloadsTouched += 1;
    if (apply) writeFileSync(file, out, 'utf8');
  }
}

console.log(`colons inserted            : ${inserted}`);
console.log(`payloads affected          : ${payloadsTouched}`);
console.log(`left alone: other word     : ${skippedWord}`);
console.log(`left alone: would seam     : ${skippedSeam}`);
console.log(`left alone: would strand unit: ${skippedUnit}`);
console.log('');
console.log('by preceding word:');
for (const [w, c] of [...byWord.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${String(c).padStart(4)}  ${w}`);
if (samples.length) {
  console.log('');
  console.log('samples (before -> after):');
  for (const s of samples) console.log(s);
}
if (seams.length) {
  console.log('');
  console.log(`skipped because hoisting would strand a capitalised word (${seams.length}) — these need a prose rewrite:`);
  for (const s of seams.slice(0, 8)) console.log(`  ${s}`);
}
if (!apply) console.log('\nDry run — nothing written. Re-run with --apply.');
