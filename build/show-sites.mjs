// show-sites.mjs — print the residual Core Concept formula sites for ONE area, sized for a patch.
//
// Why this exists: the full audit (audit-concept-formulas.mjs) rewrites CONCEPT_FORMULA_AUDIT.md and
// a 66 KB worklist. Reading that to find ~15 sites costs roughly 17k tokens of context and is stale
// the moment anyone edits a payload. This script writes NOTHING and prints only what a rewrite
// needs: payload path, concept[] index, the offending formula, and a DECODED context window that can
// be pasted straight into a patch file as `find`.
//
// No JSON escaping appears in the output at all. Inline math is printed as it reads in the note
// (`\frac` is one backslash). apply-rewrites.mjs owns the escaping, so nobody hand-writes `\\frac`.
//
// Detection is a verbatim copy of the audit's scanner, so the counts agree with
// `audit-concept-formulas.mjs --area "<Part/Area>"` by construction. If they ever disagree, this
// file is wrong — not the audit.
//
// Usage:
//   node build/show-sites.mjs --summary                    # residual counts per area; writes nothing
//   node build/show-sites.mjs --area "<Part/Area>"         # every site in that area
//   node build/show-sites.mjs --area "<Part/Area>" --limit 6
//
// `concept[]` indices are printed 1-BASED, matching the `entry N` the audit prints.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CONCEPT_PROMOTE_MIN, CONCEPT_PROMOTE_OPERATOR } from './formula-layout.mjs';

const PAYLOAD_DIR = 'build/payload';
/** The 40+ char contract from HANDOFF section 3 — the only sites the prose rewrite targets. */
const WORKLIST_MIN = 40;
/** Characters of decoded context either side of the formula, for the patch `find` window. */
const CTX = 110;
const CLAUSE_END = new Set([':', '.', ';', '!', '?']);

/** Authoritative inline scanner (same walk as the audit; see its comment for why not the regex). */
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

/** `build/payload/<Part>/<Area>/<slug>.json` -> `<Part>/<Area>`. */
function areaOf(file) {
  const p = file.replace(/\\/g, '/').split('/');
  return p.length >= 4 ? `${p[2]}/${p[3]}` : p.slice(0, -1).join('/');
}

/** Every residual site in one payload, in note order. */
function sitesIn(file) {
  const raw = readFileSync(file, 'utf8');
  let j;
  try {
    j = JSON.parse(raw);
  } catch {
    return { file, error: 'unparseable JSON — skipping' };
  }
  const concept = Array.isArray(j.concept) ? j.concept : [];
  const sites = [];
  concept.forEach((rawEntry, i) => {
    const src = String(rawEntry);
    for (const m of scanInline(src)) {
      if (!isSubstantial(m.body)) continue;
      if (atClauseStart(src, m.start)) continue;
      const body = m.body.trim();
      // Length is measured on the CONTENT: a leading `\displaystyle` directive (written by
      // apply-displaystyle.mjs) is formatting, not equation content. Keep this identical to
      // audit-concept-formulas.mjs, which was verified to agree with this tool.
      const len = body.replace(/^\\displaystyle\s+/, '').length;
      if (len < WORKLIST_MIN) continue;
      sites.push({
        file,
        entry: i + 1,
        len,
        prev: src.slice(0, m.start).replace(/[ \t\n]+$/, '').slice(-1),
        find: src.slice(Math.max(0, m.start - CTX), Math.min(src.length, m.end + CTX)),
        formula: body,
      });
    }
  });
  return { file, sites };
}

const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i > -1 ? argv[i + 1] : null;
};
const summary = argv.includes('--summary');
const areaArg = flag('--area');
const limit = flag('--limit') ? Number(flag('--limit')) : 0;

if (!summary && !areaArg) {
  console.error('usage: node build/show-sites.mjs --summary');
  console.error('       node build/show-sites.mjs --area "<Part/Area>" [--limit N]');
  process.exit(2);
}

const files = walk(PAYLOAD_DIR, (n) => n.endsWith('.json')).filter(
  (f) => !areaArg || f.replace(/\\/g, '/').includes(areaArg.replace(/\\/g, '/'))
);

if (!files.length) {
  console.error(`no payloads under ${PAYLOAD_DIR} match "${areaArg}"`);
  process.exit(2);
}

if (summary) {
  const perArea = new Map();
  let total = 0;
  for (const f of files) {
    const { sites, error } = sitesIn(f);
    if (error) console.log(`  !! ${f}: ${error}`);
    if (!sites || !sites.length) continue;
    const a = areaOf(f);
    perArea.set(a, (perArea.get(a) || 0) + sites.length);
    total += sites.length;
  }
  console.log(`residual 40+ char equations, by area (${total} total, ${files.length} payloads scanned)`);
  for (const [a, n] of [...perArea.entries()].sort((x, y) => y[1] - x[1])) {
    console.log(`  ${String(n).padStart(3)}  ${a}`);
  }
  process.exit(total ? 1 : 0);
}

let shown = 0;
let found = 0;
for (const f of files) {
  const { sites, error } = sitesIn(f);
  if (error) {
    console.log(`!! ${f}: ${error}`);
    continue;
  }
  for (const s of sites) {
    found += 1;
    if (limit && shown >= limit) continue;
    shown += 1;
    const multiline = /\n/.test(s.find);
    console.log('');
    console.log(
      `SITE ${shown}  concept[${s.entry}]  ${s.len} chars  prev=${JSON.stringify(s.prev)}`
    );
    console.log(`  file  : ${s.file.replace(/\\/g, '/')}`);
    console.log(`  entry : ${s.entry}`);
    console.log(`  formula: $${s.formula}$`);
    if (multiline) {
      console.log(`  find  : (MULTILINE — newlines shown as \u23ce below)`);
      console.log(`  ${s.find.replace(/\n/g, '\u23ce')}`);
    } else {
      console.log(`  find  : ${s.find}`);
    }
  }
}

console.log('');
console.log(
  `AREA ${areaArg}: ${found} site(s) in ${files.length} payload(s)` +
    (limit && found > shown ? `; printed ${shown} (--limit ${limit})` : '')
);
console.log('Patch format and the rewrite recipe: build/WORKER_BRIEF_spacing.md');
console.log(found ? 'NOT CLEAN' : 'CLEAN');
process.exit(found ? 1 : 0);
