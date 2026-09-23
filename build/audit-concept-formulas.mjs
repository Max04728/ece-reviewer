// audit-concept-formulas.mjs — is the "inline formulas crammed next to the prose" problem fixed?
//
// Checks the Core Concept prose at TWO levels:
//
//   A. the payload level — every `concept[]` entry through `hoistInlineFormulas()`, against the
//      transform's own contract (CONCEPT_PROMOTE_MIN / CONCEPT_PROMOTE_OPERATOR / clause start);
//   B. the rendered level — the `## Core Concept` section of every generated note, for
//      artefacts (unbalanced `$`, `$$$`, orphan fragments) and for how much math still sits
//      inside a sentence.
//
// A formula is "spaced out" when it has its own `$$` display line. The transform deliberately
// leaves substantial formulas ALONE when they do not begin a clause, because hoisting those
// strands the surrounding words (this is what produced 439 fragments on the first attempt).
// So the residual count is a real, expected number, not automatically a bug — the point of
// this audit is to size it and show the worst notes, not to drive it to zero.
//
// Usage: node build/audit-concept-formulas.mjs [--top N]

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  hoistInlineFormulas,
  CONCEPT_PROMOTE_MIN,
  CONCEPT_PROMOTE_OPERATOR,
} from './formula-layout.mjs';

const VAULT = 'ECE_Reviewer_Vault';
const PAYLOAD_DIR = 'build/payload';
const OUT_MD = 'build/CONCEPT_FORMULA_AUDIT.md';
const WORKLIST_MD = 'build/concept-spacing-worklist.md';

const INLINE = /(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)/g;
const CLAUSE_END = new Set([':', '.', ';', '!', '?']);

/**
 * Scan inline `$...$` spans with an explicit state walk instead of the lookbehind regex.
 *
 * The regex `(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)` has an asymmetry: after matching
 * `$A$` in `$A$$B$` the guard `(?<!\$)` cannot open at the next character, because the
 * previous character IS the `$` that closed A — so B is never scored. A worker found a real
 * 40+ equation hidden that way. This walk is the authoritative counter; `INLINE` is kept only
 * to report the discrepancy so the size of the undercount is visible rather than assumed.
 */
function scanInline(text) {
  const s = String(text);
  const out = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] !== '$') {
      i += 1;
      continue;
    }
    if (s[i + 1] === '$') {
      const end = s.indexOf('$$', i + 2);
      if (end === -1) break;
      i = end + 2;
      continue;
    }
    let j = i + 1;
    while (j < s.length && s[j] !== '$') j += 1;
    if (j >= s.length) break;
    out.push({ body: s.slice(i + 1, j), start: i, end: j + 1 });
    i = j + 1;
  }
  return out;
}

function isSubstantial(body) {
  const t = String(body).trim();
  return t.length >= CONCEPT_PROMOTE_MIN && CONCEPT_PROMOTE_OPERATOR.test(t);
}

function atClauseStart(src, offset) {
  const before = src.slice(0, offset).replace(/[ \t]+$/, '');
  const last = before.slice(-1);
  return before === '' || last === '\n' || CLAUSE_END.has(last);
}

function walk(dir, filter, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, out);
    else if (filter(e.name)) out.push(p);
  }
  return out;
}

// `--area <path fragment>` restricts the audit to one area and prints a compact count instead of
// writing the shared report files. That makes it safe to run several of these concurrently — two
// workers writing CONCEPT_FORMULA_AUDIT.md at once could hand each other a torn file.
const areaArg = (() => {
  const i = process.argv.indexOf('--area');
  return i > -1 ? process.argv[i + 1] : null;
})();

// ---------------------------------------------------------------------------
// A. payload level
// ---------------------------------------------------------------------------
const payloads = walk(PAYLOAD_DIR, (n) => n.endsWith('.json'))
  .filter((f) => !areaArg || f.replace(/\\/g, '/').includes(areaArg.replace(/\\/g, '/')));

let entries = 0;
let srcInline = 0;
let hoisted = 0;
let residualSubstantial = 0;
let residualParagraphs = 0;
let shortInline = 0;
let unbalancedSrc = 0;
/** How many inline formulas the old lookbehind regex silently skipped (scanner minus regex). */
let regexUndercount = 0;

/** payload -> { residual, worst } */
const perNote = new Map();
const residualSamples = [];
/** How substantial are the formulas left mid-sentence? Drives whether extending the rule is worth it. */
const residualByLen = { '20-29': 0, '30-39': 0, '40-59': 0, '60+': 0 };
const residualByOp = new Map();

/** Every site the prose rewrite has to fix: a 40+ char equation sitting inside a sentence. */
const WORKLIST_MIN = 40;
const worklist = [];

for (const file of payloads) {
  let j;
  try {
    j = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    continue;
  }
  const concept = Array.isArray(j.concept) ? j.concept : [];
  if (!concept.length) continue;

  let noteResidual = 0;
  let entryIndex = 0;

  for (const raw of concept) {
    const src = String(raw);
    entries += 1;
    entryIndex += 1;

    // source-side sanity: an unpaired single `$` would corrupt the whole paragraph
    const singles = (src.match(/(?<!\$)\$(?!\$)/g) || []).length;
    if (singles % 2 !== 0) unbalancedSrc += 1;

    const matches = scanInline(src);
    const regexCount = [...src.matchAll(INLINE)].length;
    srcInline += matches.length;
    if (regexCount !== matches.length) {
      regexUndercount += matches.length - regexCount;
    }

    let paraResidual = 0;
    for (const m of matches) {
      const body = m.body;
      if (!isSubstantial(body)) {
        shortInline += 1;
        continue;
      }
      if (atClauseStart(src, m.start)) {
        hoisted += 1;
      } else {
        residualSubstantial += 1;
        paraResidual += 1;
        noteResidual += 1;
        const len = String(body).trim().length;
        if (len < 30) residualByLen['20-29'] += 1;
        else if (len < 40) residualByLen['30-39'] += 1;
        else if (len < 60) residualByLen['40-59'] += 1;
        else residualByLen['60+'] += 1;
        if (residualSamples.length < 400) {
          residualSamples.push({ file, body: body.trim() });
        }
        if (len >= WORKLIST_MIN) {
          const before = src.slice(Math.max(0, m.start - 150), m.start);
          const after = src.slice(m.end, m.end + 150);
          worklist.push({
            file,
            entry: entryIndex,
            formula: body.trim(),
            before,
            after,
            len,
          });
        }
      }
    }
    if (paraResidual > 0) residualParagraphs += 1;

    // contract self-check: every substantial clause-start formula must actually have been hoisted
    const out = hoistInlineFormulas(src);
    for (const m of matches) {
      if (!isSubstantial(m.body)) continue;
      if (!atClauseStart(src, m.start)) continue;
      const needle = `$$${m.body.trim()}$$`;
      if (!out.includes(needle)) {
        console.log(`  !! transform missed a clause-start formula in ${file}: ${m.body.trim().slice(0, 60)}`);
      }
    }
  }

  if (noteResidual > 0) {
    perNote.set(file, noteResidual);
  }
}

// `--area` mode stops here: a compact, race-free per-area verdict.
if (areaArg) {
  console.log(`AREA ${areaArg}`);
  console.log(`  payloads scanned            : ${payloads.length}`);
  console.log(`  residual 40+ char equations : ${worklist.length}`);
  console.log(`  residual 20+ char equations : ${residualSubstantial}`);
  if (worklist.length) {
    for (const w of worklist) {
      console.log(`  - ${w.file.replace(/\\/g, '/')} entry ${w.entry} (${w.len}): $${w.formula}$`);
    }
    console.log('  NOT CLEAN — fix the sites above.');
    process.exit(1);
  }
  console.log('  CLEAN — no 40+ char equation is left inside a sentence.');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// B. rendered level
// ---------------------------------------------------------------------------
const notes = areaArg ? [] : walk(VAULT, (n) => n.endsWith('.md'));

let noteCount = 0;
let noConcept = 0;
let paragraphs = 0;
let displayBlocks = 0;
let paraWithDisplay = 0;
let paraWithResidualInline = 0;
let tripleDollar = 0;
let unbalancedRendered = 0;
let orphanFragments = 0;
let strandedUnits = 0;
const strandedSamples = [];

const ORPHAN = /^(?:and|or|so|but|then|thus|hence|while|where|with|for|giving|yields?|since|because|if|when|as)[\s,;:]*$/i;
const worstNotes = [];
const unbalancedSamples = [];
/**
 * Unit-looking tokens that must not begin the line after a display block.
 *
 * Deliberately EXCLUDES the ambiguous English words that are also units — `in` (inches) and
 * `us` (microseconds) — because "… $$EQ$$ in which the $A_c$ cancels" is a legitimate
 * continuation and flagging it is a false alarm. A checker that cries wolf costs more than it
 * saves; the same rule removed false-positive patterns from diagnose-formulas.mjs.
 */
const UNIT_TOKEN =
  /^(?:eV|keV|MeV|GeV|mV|kV|µV|uV|nV|mA|µA|uA|nA|kA|kW|MW|mW|µW|uW|nW|pW|kHz|MHz|GHz|THz|ms|µs|ns|ps|cm|mm|µm|um|nm|km|mH|µH|uH|nH|pF|nF|µF|uF|mF|kΩ|MΩ|Ω|ohm|ohms|dBi|dBd|dBm|dBW|Hz|rad|sr|mol|kg|mg|µg|Wb|nmi|ft|mi|yd|V|A|W|J|mJ|µJ|uJ|kJ|MJ|F|H|T|C|N|K|Pa|kPa|MPa|GPa|m|s|g|L|mL|dB)$/;

for (const file of notes) {
  const text = readFileSync(file, 'utf8');
  // NOTE: `\Z` is NOT an anchor in JavaScript — it is an identity escape for a literal "Z", so
  // `(?=^## |\Z)` silently truncated the section at the first capital Z in a formula (impedance
  // `Z_0`, `Z_{dyn}` …) and manufactured phantom "unbalanced $" paragraphs. `(?=^## )` alone is
  // correct: every Core Concept section is followed by another `##` heading, and if one were not,
  // the non-greedy group simply extends to the end of the file.
  const m = text.match(/^## Core Concept\s*$([\s\S]*?)(?=^## )/m)
    || text.match(/^## Core Concepts\s*$([\s\S]*?)(?=^## )/m);
  if (!m) continue;
  noteCount += 1;

  const section = m[1];
  if (/\$\$\$/.test(section)) tripleDollar += (section.match(/\$\$\$/g) || []).length;

  const paras = section.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  if (!paras.length) noConcept += 1;

  let nResidual = 0;
  for (const p of paras) {
    paragraphs += 1;
    const disp = (p.match(/\$\$/g) || []).length / 2;
    displayBlocks += disp;
    if (disp > 0) paraWithDisplay += 1;

    // unbalanced single dollars INSIDE this paragraph (ignoring $$ pairs)
    const stripped = p.replace(/\$\$[\s\S]*?\$\$/g, '');
    const singles = (stripped.match(/(?<!\$)\$(?!\$)/g) || []).length;
    if (singles % 2 !== 0) {
      unbalancedRendered += 1;
      if (unbalancedSamples.length < 12) unbalancedSamples.push({ file, p });
    }

    let r = 0;
    for (const mm of stripped.matchAll(INLINE)) {
      if (isSubstantial(mm[1])) r += 1;
    }
    if (r > 0) {
      paraWithResidualInline += 1;
      nResidual += r;
    }
    if (ORPHAN.test(p) && !p.includes('$')) orphanFragments += 1;

    // A display block that was hoisted out of "… $EQ$ eV, so …" leaves the UNIT stranded at the
    // start of the next line: "$$EQ$$\neV, so …". That reads badly, and it is invisible to the
    // 40-character rule because the equation itself may be short.
    const lines = p.split('\n');
    for (let li = 0; li < lines.length - 1; li += 1) {
      if (!/^\$\$[\s\S]*\$\$\s*$/.test(lines[li].trim())) continue;
      const next = lines[li + 1].trim();
      const tok = (next.match(/^([^\s,;:.]+)/) || [])[1] ?? '';
      if (UNIT_TOKEN.test(tok) && !/^[A-Z]/.test(tok)) {
        strandedUnits += 1;
        if (strandedSamples.length < 12) strandedSamples.push({ file, next: next.slice(0, 70) });
      }
    }
  }
  if (nResidual > 0) worstNotes.push({ file, nResidual, paras: paras.length });
}

worstNotes.sort((a, b) => b.nResidual - a.nResidual);
const byNote = [...perNote.entries()].sort((a, b) => b[1] - a[1]);

const topN = (() => {
  const i = process.argv.indexOf('--top');
  return i > -1 ? Number(process.argv[i + 1]) || 15 : 15;
})();

// ---------------------------------------------------------------------------
// report
// ---------------------------------------------------------------------------
const L = [];
const say = (s = '') => {
  console.log(s);
  L.push(s);
};

say('# Core Concept formula formatting — audit');
say();
say('Generated by `build/audit-concept-formulas.mjs`. Re-run it after any change to');
say('`build/formula-layout.mjs` or to any payload `concept[]`.');
say();
say('## A. Payload level (the transform contract)');
say();
say(`- concept entries                 : ${entries}`);
say(`- inline formulas in source       : ${srcInline}`);
say(`- short/symbol formulas (stay inline by design) : ${shortInline}`);
say(`- substantial + clause-start (hoisted to a display line) : ${hoisted}`);
say(`- substantial + MID-SENTENCE (deliberately left inline)  : ${residualSubstantial}`);
say(`- entries still containing one or more of those          : ${residualParagraphs}`);
say(`- entries with an unpaired single \`$\`  : ${unbalancedSrc}`);
say(`- formulas the old lookbehind regex silently skipped : ${regexUndercount} (the scanner above is authoritative)`);
say();
say('### How substantial are the formulas left mid-sentence?');
say();
say('| body length (chars) | count |');
say('| --- | ---: |');
for (const [k, v] of Object.entries(residualByLen)) say(`| ${k} | ${v} |`);
say();
say('A formula under ~40 characters is a term or a short relation that reads acceptably inside a');
say('sentence; the 40+ band is where the "equation buried in prose" complaint bites.');
say();
say('## B. Rendered level (what the reader sees)');
say();
say(`- notes with a Core Concept section : ${noteCount}`);
say(`- concept paragraphs                : ${paragraphs}`);
say(`- \`$$\` display blocks              : ${displayBlocks}`);
say(`- paragraphs containing >=1 display block : ${paraWithDisplay}`);
say(`- paragraphs still holding a substantial inline formula : ${paraWithResidualInline}`);
say(`- \`$$$\` artefacts                  : ${tripleDollar}`);
say(`- paragraphs with unbalanced \`$\`   : ${unbalancedRendered}`);
say(`- orphan continuation fragments     : ${orphanFragments}`);
say(`- display blocks with a STRANDED UNIT after them : ${strandedUnits}`);
say();
say(`## Worst notes by remaining inline math (top ${topN})`);
say();
say('| note | residual inline | concept paras |');
say('| --- | ---: | ---: |');
for (const w of worstNotes.slice(0, topN)) {
  say(`| ${w.file.replace(/\\/g, '/').replace('ECE_Reviewer_Vault/', '')} | ${w.nResidual} | ${w.paras} |`);
}
say();
say(`## Worst payloads by residual inline math (top ${topN})`);
say();
say('| payload | residual |');
say('| --- | ---: |');
for (const [f, n] of byNote.slice(0, topN)) {
  say(`| ${f.replace(/\\/g, '/')} | ${n} |`);
}
say();
say('## Sample of formulas left mid-sentence');
say();
for (const s of residualSamples.slice(0, 25)) {
  say(`- \`${s.body.slice(0, 90)}\``);
}
say();
if (unbalancedSamples.length) {
  say('## Paragraphs with an unbalanced single `$` (investigate)');
  say();
  for (const u of unbalancedSamples) {
    say(`- ${u.file.replace(/\\/g, '/').replace('ECE_Reviewer_Vault/', '')}`);
    say(`  \`${u.p.replace(/\n/g, ' ').slice(0, 220)}\``);
  }
  say();
}
if (strandedSamples.length) {
  say('## Display blocks that strand a unit on the next line');
  say();
  say('The equation was hoisted out of "… $EQ$ eV, so …", leaving the unit to open the next line.');
  say('Fix by moving the unit into the lead-in or inside the equation.');
  say();
  for (const s of strandedSamples) {
    say(`- ${s.file.replace(/\\/g, '/').replace('ECE_Reviewer_Vault/', '')}`);
    say(`  next line: \`${s.next}\``);
  }
  say();
}

writeFileSync(OUT_MD, L.join('\n') + '\n', 'utf8');
console.log(`\nwritten: ${OUT_MD}`);

// ---------------------------------------------------------------------------
// Worklist: the 40+ char equations that still need a prose rewrite
// ---------------------------------------------------------------------------
const byArea = new Map();
const byPayload = new Map();
for (const w of worklist) {
  const area = w.file.replace(/\\/g, '/').replace(/^build\/payload\//, '').split('/').slice(0, 2).join('/');
  byArea.set(area, (byArea.get(area) ?? 0) + 1);
  if (!byPayload.has(w.file)) byPayload.set(w.file, []);
  byPayload.get(w.file).push(w);
}

const W = [];
const wsay = (s = '') => W.push(s);
wsay('# Core Concept spacing — rewrite worklist');
wsay();
wsay(`Every equation of **${WORKLIST_MIN}+ characters** still sitting inside a sentence, generated by`);
wsay('`node build/audit-concept-formulas.mjs`. Fixing one means rewriting the payload prose so the');
wsay('equation begins a clause (introduce it with a colon or end the sentence first) and the text');
wsay('after it still reads as a sentence. The layout rule then hoists it automatically — **do not**');
wsay('change `formula-layout.mjs` to force the break.');
wsay();
wsay(`**${worklist.length} sites across ${byPayload.size} payloads in ${byArea.size} areas.**`);
wsay();
wsay('## Per area');
wsay();
wsay('| area | sites |');
wsay('| --- | ---: |');
for (const [a, n] of [...byArea.entries()].sort((x, y) => y[1] - x[1])) {
  wsay(`| ${a} | ${n} |`);
}
wsay();
wsay('## Per payload');
wsay();
wsay('| payload | sites |');
wsay('| --- | ---: |');
for (const [f, ws] of [...byPayload.entries()].sort((x, y) => y[1].length - x[1].length)) {
  wsay(`| ${f.replace(/\\/g, '/')} | ${ws.length} |`);
}
wsay();
wsay('## Sites');
wsay();
for (const [f, ws] of [...byPayload.entries()].sort((x, y) => y[1].length - x[1].length)) {
  wsay(`### ${f.replace(/\\/g, '/')}`);
  wsay();
  for (const w of ws) {
    wsay(`- **entry ${w.entry}** (${w.len} chars): \`$${w.formula}$\``);
    wsay(`  - before: …${w.before.replace(/\n/g, ' ')}`);
    wsay(`  - after : ${w.after.replace(/\n/g, ' ')}…`);
  }
  wsay();
}
writeFileSync(WORKLIST_MD, W.join('\n') + '\n', 'utf8');
console.log(`written: ${WORKLIST_MD}`);
console.log(`worklist sites: ${worklist.length} across ${byPayload.size} payloads / ${byArea.size} areas`);
