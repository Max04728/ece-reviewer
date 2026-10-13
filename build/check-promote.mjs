// check-promote.mjs — how many Core Concept equations would get their own line if the
// "long enough to deserve a display line" threshold were lowered?
//
// THE LEVER: hoisting is done by the renderer, not by editing prose. `formula-layout.mjs` hoists an
// inline formula onto its own `$$` line when ALL THREE hold:
//     1. its (content) length >= CONCEPT_PROMOTE_MIN   [currently 20]
//     2. it matches CONCEPT_PROMOTE_OPERATOR           (it is an equation, not a symbol)
//     3. it already begins a clause                     (prev char is . : ; ! ? or line start)
// So "give every equation longer than ~15 characters its own line" is a ONE-CONSTANT change:
// lower CONCEPT_PROMOTE_MIN and re-render. No payload editing at all.
//
// WHAT IT MUST NOT DO: hoist condition 3 away. Hoisting formulas that sit MID-SENTENCE is what
// produced 439 one-word fragments ("it is", "valid when") and an ungrammatical join on the first
// attempt; those sites need the PROSE rewritten so the equation begins a clause. This script
// reports that group separately and never promotes it.
//
// Usage:
//   node build/check-promote.mjs --min 15            # instant check, writes nothing
//   node build/check-promote.mjs --min 15 --show 40  # list more of the newly-promoted sites
//   node build/check-promote.mjs --min 15 --apply    # set CONCEPT_PROMOTE_MIN in formula-layout.mjs
//
// After --apply you must render, then verify:
//   node build/build-notes.mjs && node build/audit-concept-formulas.mjs && node build/verify.mjs

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CONCEPT_PROMOTE_MIN, CONCEPT_PROMOTE_OPERATOR } from './formula-layout.mjs';

const PAYLOAD_DIR = 'build/payload';
const LAYOUT = 'build/formula-layout.mjs';
const CLAUSE_END = new Set([':', '.', ';', '!', '?']);

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

/** Content length: a leading `\displaystyle` is formatting, not equation content. */
const contentLength = (body) => String(body).trim().replace(/^\\displaystyle\s+/, '').length;

const argv = process.argv.slice(2);
const opt = (name, dflt) => { const i = argv.indexOf(name); return i > -1 ? argv[i + 1] : dflt; };
const MIN = Number(opt('--min', 15));
const SHOW = Number(opt('--show', 20));
const payloadFilter = opt('--payload', null);
const apply = argv.includes('--apply');

if (!Number.isFinite(MIN) || MIN < 4) {
  console.error('--min must be a number >= 4');
  process.exit(2);
}

const wouldNewlyHoist = [];
let alreadyOwnLine = 0;
let longButMidSentence = 0;
let shorterThanMin = 0;
let equationsConsidered = 0;

for (const file of walk(PAYLOAD_DIR)) {
  if (payloadFilter && !file.replace(/\\/g, '/').includes(payloadFilter)) continue;
  let j;
  try { j = JSON.parse(readFileSync(file, 'utf8')); } catch { continue; }
  const concept = Array.isArray(j.concept) ? j.concept : [];
  concept.forEach((rawEntry, idx) => {
    const src = String(rawEntry);
    for (const m of scanInline(src)) {
      const body = m.body.trim();
      const len = contentLength(body);
      if (!CONCEPT_PROMOTE_OPERATOR.test(body)) continue; // a symbol, not an equation
      equationsConsidered += 1;
      const clauseStart = atClauseStart(src, m.start);
      const hoistsNow = len >= CONCEPT_PROMOTE_MIN && clauseStart;
      const hoistsAtMin = len >= MIN && clauseStart;
      if (len < MIN) { shorterThanMin += 1; continue; }
      if (hoistsNow) { alreadyOwnLine += 1; continue; }
      if (hoistsAtMin) {
        wouldNewlyHoist.push({ file: file.replace(/\\/g, '/'), entry: idx + 1, len, body });
      } else {
        longButMidSentence += 1;
      }
    }
  });
}

console.log('Core Concept equations: threshold preview');
console.log(`  payload filter                         : ${payloadFilter || '(all 408)'}`);
console.log(`  current CONCEPT_PROMOTE_MIN            : ${CONCEPT_PROMOTE_MIN} chars`);
console.log(`  proposed                               : ${MIN} chars`);
console.log(`  equation-like inline formulas examined : ${equationsConsidered}`);
console.log('');
console.log(`  already get their own line             : ${alreadyOwnLine}`);
console.log(`  WOULD newly get their own line         : ${wouldNewlyHoist.length}   <- the change`);
console.log(`  still inline: mid-sentence (needs prose rewrite, NOT auto-hoisted) : ${longButMidSentence}`);
console.log(`  still inline: shorter than ${String(MIN).padEnd(3)} chars            : ${shorterThanMin}`);
console.log('');
if (wouldNewlyHoist.length) {
  console.log(`newly promoted (showing ${Math.min(SHOW, wouldNewlyHoist.length)} of ${wouldNewlyHoist.length}):`);
  for (const s of wouldNewlyHoist.slice(0, SHOW)) {
    console.log(`  [${String(s.len).padStart(2)}] ${s.file.split('/').slice(-1)[0]} entry ${s.entry}: $${s.body.slice(0, 58)}$`);
  }
  if (wouldNewlyHoist.length > SHOW) console.log(`  ... and ${wouldNewlyHoist.length - SHOW} more`);
} else {
  console.log('nothing would change at this threshold.');
}

if (apply) {
  if (!existsSync(LAYOUT)) { console.error(`\nmissing ${LAYOUT}`); process.exit(2); }
  const src = readFileSync(LAYOUT, 'utf8');
  const re = /export const CONCEPT_PROMOTE_MIN = (\d+);/;
  if (!re.test(src)) { console.error('\ncould not find CONCEPT_PROMOTE_MIN in formula-layout.mjs'); process.exit(2); }
  const current = Number(src.match(re)[1]);
  if (current === MIN) {
    console.log(`\nCONCEPT_PROMOTE_MIN is already ${MIN} — nothing to write.`);
  } else {
    writeFileSync(LAYOUT, src.replace(re, `export const CONCEPT_PROMOTE_MIN = ${MIN};`), 'utf8');
    console.log(`\nwrote ${LAYOUT}: CONCEPT_PROMOTE_MIN ${current} -> ${MIN}`);
    console.log('now run:');
    console.log('  node build/build-notes.mjs            # re-render all notes');
    console.log('  node build/audit-concept-formulas.mjs # check rendered artefacts');
    console.log('  node build/verify.mjs                 # must print ALL CHECKS PASSED');
  }
} else {
  console.log('\nDry run — nothing written. Add --apply to set the threshold.');
}
