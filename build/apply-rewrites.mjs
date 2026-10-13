// apply-rewrites.mjs — apply DECODED-string prose rewrites to payload concept[] entries.
//
// Two problems this solves.
//
// 1. Escaping. A payload is raw JSON, so a payload's LaTeX is doubled (`\\frac`) and a worker
//    hand-writing that soup eventually emits `\f` instead of `\\f` — which JSON.parse accepts as a
//    form feed, silently corrupting the note (HANDOFF, footguns table, row 3). So patches are
//    authored in DECODED prose (`\frac`, one backslash, exactly as it reads in the note) and this
//    script owns the escaping.
//
// 2. Formatting. Do NOT parse-and-re-serialize these files. They are hand-formatted: 2-space
//    indent, but arrays of small objects (formulas, problems, traps) keep their members on one
//    line. `JSON.stringify(j, null, 2)` matched 3 of 408 payloads. Re-serializing would explode
//    every inline object into five lines and rewrite the whole vault's diff for a one-sentence
//    change. Instead this script splices raw text: it locates the entry's exact on-disk byte
//    range, replaces the escaped `find` inside it, and leaves every other byte untouched.
//
// Default is a dry run. Nothing is written without --apply.
//
// Usage:
//   node build/apply-rewrites.mjs --report build/rewrite-patches/<Area>.json
//   node build/apply-rewrites.mjs --apply  build/rewrite-patches/<Area>.json
//   node build/apply-rewrites.mjs --selftest
//
// Patch file format (JSON):
//   {
//     "area": "02_Electronics_Engineering/04_Semiconductor_Devices",
//     "rewrites": [
//       { "file": "build/payload/.../slug.json", "entry": 4,
//         "find": "Chain: $A$, or in Leibniz form $B$.",
//         "replace": "Chain: $A$. In Leibniz form: $B$." }
//     ]
//   }
// `entry` is the 1-based concept[] index that show-sites.mjs prints. `find` must occur exactly once
// inside that entry, and must be long enough to be unique.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CONCEPT_PROMOTE_MIN, CONCEPT_PROMOTE_OPERATOR } from './formula-layout.mjs';

const PAYLOAD_DIR = 'build/payload';
const WORKLIST_MIN = 40;
const CLAUSE_END = new Set([':', '.', ';', '!', '?']);

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

/** Residual 40+ char sites in one decoded concept entry. Drives the before/after report. */
function residualSites(src) {
  const out = [];
  for (const m of scanInline(src)) {
    if (!isSubstantial(m.body)) continue;
    if (atClauseStart(src, m.start)) continue;
    const body = m.body.trim();
    if (body.length >= WORKLIST_MIN) out.push(body);
  }
  return out;
}

/** An unpaired single `$` would corrupt the whole paragraph. */
function dollarBalanced(src) {
  return (String(src).match(/(?<!\$)\$(?!\$)/g) || []).length % 2 === 0;
}

/**
 * The same decoded string can appear on disk in more than one legal JSON encoding. Measured on this
 * repo: 397 of 408 payloads write an em dash literally (`—`), 11 write it as `\u2014`. So a decoded
 * string is located by trying each style and taking the one that occurs exactly once — never by
 * assuming the writer's style. If no style is unique, the rewrite is refused rather than guessed.
 */
function unicodeEscaped(s, upper) {
  return JSON.stringify(String(s))
    .slice(1, -1)
    .replace(/[\u0080-\uffff]/g, (c) => {
      const hex = c.charCodeAt(0).toString(16).padStart(4, '0');
      return `\\u${upper ? hex.toUpperCase() : hex}`;
    });
}

const ESCAPE_STYLES = [
  { name: 'literal', enc: (s) => JSON.stringify(String(s)).slice(1, -1) },
  { name: 'unicode-lower', enc: (s) => unicodeEscaped(s, false) },
  { name: 'unicode-upper', enc: (s) => unicodeEscaped(s, true) },
];

/** The on-disk encoding of `decoded` that occurs exactly once in `raw`, or null. */
function locate(raw, decoded) {
  const tries = ESCAPE_STYLES.map((st) => {
    const text = st.enc(decoded);
    return { name: st.name, enc: st.enc, text, hits: count(raw, text) };
  });
  return { style: tries.find((t) => t.hits === 1) || null, tries };
}

const count = (hay, needle) => hay.split(needle).length - 1;

function walk(dir, filter, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, out);
    else if (filter(e.name)) out.push(p);
  }
  return out;
}

/** Control characters must never appear in decoded patch text (that is the `\f` footgun). */
function controlChars(s) {
  const bad = [];
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charCodeAt(i);
    if (c < 32 && s[i] !== '\n' && s[i] !== '\t') bad.push([i, c]);
  }
  return bad;
}

const argv = process.argv.slice(2);
const apply = argv.includes('--apply');
const selftest = argv.includes('--selftest');
const target = argv.find((a) => !a.startsWith('--'));

// ---------------------------------------------------------------------------
// --selftest: the invariant --apply depends on, measured rather than assumed.
//   For every payload, the escaped form of every concept[] entry must occur
//   exactly once in the raw file bytes. That is what makes splicing safe.
// ---------------------------------------------------------------------------
if (selftest) {
  const files = walk(PAYLOAD_DIR, (n) => n.endsWith('.json'));
  let payloadOk = 0;
  let entries = 0;
  const unlocatable = [];
  const stylesUsed = new Map();
  const unparseable = [];
  for (const f of files) {
    const raw = readFileSync(f, 'utf8');
    let j;
    try {
      j = JSON.parse(raw);
    } catch {
      unparseable.push(f);
      continue;
    }
    const concept = Array.isArray(j.concept) ? j.concept : [];
    let ok = true;
    for (const entry of concept) {
      entries += 1;
      const { style } = locate(raw, entry);
      if (!style) {
        unlocatable.push(`${f.replace(/\\/g, '/')} :: ${String(entry).slice(0, 60)}`);
        ok = false;
        continue;
      }
      stylesUsed.set(style.name, (stylesUsed.get(style.name) || 0) + 1);
    }
    if (ok) payloadOk += 1;
  }
  console.log('invariant: every concept[] entry is byte-locatable, exactly once');
  console.log(`  payloads                       : ${files.length}`);
  console.log(`  concept[] entries              : ${entries}`);
  console.log(`  all entries locatable uniquely : ${payloadOk}`);
  console.log(`  entries NOT uniquely locatable : ${unlocatable.length}`);
  console.log(`  unparseable                    : ${unparseable.length}`);
  console.log(`  encoding style in use          : ${[...stylesUsed.entries()].map(([n, c]) => `${n}=${c}`).join('  ')}`);
  for (const u of unlocatable.slice(0, 5)) console.log(`  ! ${u}`);
  if (payloadOk === files.length) {
    console.log('VERDICT: raw-text splicing is safe; the applier never re-serializes.');
    process.exit(0);
  }
  console.log('VERDICT: some entries need manual handling — see the list above.');
  process.exit(1);
}

if (!target) {
  console.error('usage: node build/apply-rewrites.mjs --report <patch.json>');
  console.error('       node build/apply-rewrites.mjs --apply  <patch.json>');
  console.error('       node build/apply-rewrites.mjs --selftest');
  process.exit(2);
}
if (!existsSync(target)) {
  console.error(`no such patch file: ${target}`);
  process.exit(2);
}

let patch;
try {
  patch = JSON.parse(readFileSync(target, 'utf8'));
} catch (e) {
  console.error(`patch file is not valid JSON: ${e.message}`);
  process.exit(2);
}
const rewrites = Array.isArray(patch) ? patch : patch.rewrites;
if (!Array.isArray(rewrites)) {
  console.error('patch file must be an array, or an object with a `rewrites` array.');
  process.exit(2);
}

console.log(`${apply ? 'APPLY' : 'REPORT (dry run)'}  ${target}`);
console.log(`rewrites: ${rewrites.length}${patch.area ? `  area: ${patch.area}` : ''}`);
console.log('');

/** file -> raw text, mutated as rewrites are applied in order. */
const state = new Map();
/** Files actually spliced — only these get written, so a re-run is a true no-op. */
const dirty = new Set();
let errors = 0;
let drifts = 0;
let clean = 0;
let already = 0;

rewrites.forEach((r, i) => {
  const tag = `[${i + 1}]`;
  const where = `${String(r.file || '?').replace(/\\/g, '/')} entry ${r.entry}`;
  const fail = (msg) => {
    errors += 1;
    console.log(`${tag} ERROR  ${where}`);
    console.log(`     ${msg}`);
  };

  if (typeof r.file !== 'string' || typeof r.find !== 'string' || typeof r.replace !== 'string') {
    return fail('needs string fields: file, find, replace');
  }
  if (!Number.isInteger(r.entry) || r.entry < 1) return fail('`entry` must be a 1-based integer');
  if (r.find === r.replace) return fail('find and replace are identical');
  if (!r.find.includes('$')) return fail('find contains no $ — is this really a formula rewrite?');

  for (const [label, s] of [['find', r.find], ['replace', r.replace]]) {
    const bad = controlChars(s);
    if (bad.length) {
      return fail(
        `${label} contains a control character at offset ${bad[0][0]} (code ${bad[0][1]}) — ` +
          'you likely wrote \\f instead of \\\\f in the raw patch JSON'
      );
    }
  }
  if (r.replace.includes('$$') && !r.find.includes('$$')) {
    return fail('replace introduces `$$` — author single `$` and let the renderer convert');
  }
  if (!existsSync(r.file)) return fail('file does not exist');

  if (!state.has(r.file)) state.set(r.file, readFileSync(r.file, 'utf8'));
  const raw = state.get(r.file);

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return fail(`payload is not valid JSON: ${e.message}`);
  }
  if (!Array.isArray(parsed.concept)) return fail('payload has no concept[] array');

  const idx = r.entry - 1;
  if (idx >= parsed.concept.length) {
    return fail(`concept[] has only ${parsed.concept.length} entries`);
  }

  const decodedEntry = String(parsed.concept[idx]);
  const { style, tries } = locate(raw, decodedEntry);
  if (!style) {
    return fail(
      `concept[${r.entry}] is not uniquely locatable in the file — ` +
        tries.map((t) => `${t.name}:${t.hits} match(es)`).join(', ') +
        ' — refusing to guess which bytes you meant'
    );
  }

  const escFind = style.enc(r.find);
  const findHits = count(style.text, escFind);
  if (findHits !== 1) {
    // Already applied? A patch file is a ledger, not a transaction: the repo convention is to
    // re-run and re-apply a patch file before declaring an area done, which must not read as drift.
    if (findHits === 0 && count(style.text, style.enc(r.replace)) >= 1) {
      already += 1;
      console.log(`${tag} DONE   ${where}   (already applied — no-op)`);
      return undefined;
    }
    drifts += 1;
    console.log(`${tag} ${findHits === 0 ? 'DRIFT ' : 'AMBIG '} ${where}`);
    console.log(`     find occurs ${findHits} time(s) in concept[${r.entry}] — expected exactly 1`);
    if (findHits === 0) console.log(`     entry now reads: ${decodedEntry.slice(0, 200)}`);
    return undefined;
  }

  const before = residualSites(decodedEntry);
  const expected = decodedEntry.split(r.find).join(r.replace);
  const span = raw.indexOf(style.text);
  const spliced =
    raw.slice(0, span) +
    style.text.replace(escFind, () => style.enc(r.replace)) +
    raw.slice(span + style.text.length);

  let re;
  try {
    re = JSON.parse(spliced);
  } catch (e) {
    return fail(`result does not parse — nothing written (${e.message})`);
  }
  const afterEntry = String(re.concept[idx]);
  if (afterEntry !== expected) {
    return fail(
      'post-splice check failed: concept[' + r.entry + '] is not the expected text — ' +
        'the bytes matched somewhere else in the file. Nothing written.'
    );
  }
  if (!dollarBalanced(afterEntry)) {
    return fail('result would contain an unpaired single $ — that corrupts the paragraph');
  }
  // The one rule that matters most in this workstream: prose and punctuation only. Comparing the
  // whole entry (not just the patch window, which can start mid-formula) makes this exact.
  const mathBefore = scanInline(decodedEntry).map((m) => m.body.trim());
  const mathAfter = scanInline(afterEntry).map((m) => m.body.trim());
  if (mathBefore.length !== mathAfter.length || mathBefore.some((f, k) => f !== mathAfter[k])) {
    return fail(
      `the mathematics changed — concept[${r.entry}] would go from ${mathBefore.length} formula(s) ` +
        `to ${mathAfter.length}, or their content differs. Prose and punctuation only; if this site ` +
        'cannot be fixed without touching the mathematics, skip it and report it.'
    );
  }

  const after = residualSites(afterEntry);
  state.set(r.file, spliced);
  dirty.add(r.file);
  clean += 1;
  console.log(`${tag} OK     ${where}   [${style.name}]  residual ${before.length} -> ${after.length}`);
  if (after.length >= before.length) {
    console.log('     NOTE: residual count did not fall — check the lead-in clause, then re-audit');
  }
  return undefined;
});

console.log('');
console.log(`ok: ${clean}   already applied: ${already}   drift/ambiguous: ${drifts}   errors: ${errors}`);

if (!apply) {
  console.log('Dry run — nothing written. Re-run with --apply.');
  process.exit(errors || drifts ? 1 : 0);
}
if (errors || drifts) {
  console.log('Refusing to apply while any rewrite is in drift or error.');
  process.exit(1);
}

let written = 0;
for (const file of dirty) {
  const raw = state.get(file);
  try {
    JSON.parse(raw);
  } catch (e) {
    console.log(`!! refusing to write ${file}: output does not parse (${e.message})`);
    process.exit(1);
  }
  writeFileSync(file, raw, 'utf8');
  written += 1;
  console.log(`wrote ${file.replace(/\\/g, '/')}`);
}
console.log(`${written} payload(s) written.`);
console.log('Next: node build/show-sites.mjs --area "<Area>"   (expect CLEAN)');
console.log('      node build/build-notes.mjs --validate');
