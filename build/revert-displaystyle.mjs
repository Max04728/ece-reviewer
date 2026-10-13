// revert-displaystyle.mjs — remove exactly the `\displaystyle ` prefixes that
// apply-displaystyle.mjs inserted, and nothing else.
//
// WHY NOT A RULE-BASED STRIP: the payload tree already contained 95 authorial `\displaystyle`
// occurrences before that pass (`git grep -o displaystyle HEAD -- build/payload` measured them), so
// stripping every leading `\displaystyle ` would corrupt real authorial markup. Instead this tool
// reconstructs the pre-pass formula list from a HEAD worktree and reverts an entry ONLY when its
// formula bodies match HEAD's with a prefix added, which makes the operation exact.
//
// Two invariants make that sound, and BOTH are verified per entry at runtime rather than assumed:
//   1. the prose-spacing pass never altered a formula body (apply-rewrites.mjs rejects such an
//      edit), so HEAD's ordered formula list for an entry IS the pre-displaystyle list;
//   2. the displaystyle pass only PREPENDS `\displaystyle `.
// So after removing the prefixes, every formula body must be byte-identical (modulo whitespace) to
// HEAD's. An entry that fails either check is skipped and reported, never guessed at.
//
// Prerequisite (one command, no binary piping — a `git archive | tar` pipe is mangled here):
//   git worktree add --detach build/_head HEAD
//
// Usage:
//   node build/revert-displaystyle.mjs --report
//   node build/revert-displaystyle.mjs --apply
//   node build/revert-displaystyle.mjs --apply --keep <path fragment>   # leave one payload alone
//
// Nothing is written without --apply.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const CUR_ROOT = 'build/payload';
const HEAD_ROOT = 'build/_head/build/payload';
const INSERT = '\\displaystyle ';
const MISSING = INSERT.length;

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

const norm = (s) => String(s).trim().replace(/\s+/g, ' ');

const argv = process.argv.slice(2);
const apply = argv.includes('--apply');
const keep = (() => { const i = argv.indexOf('--keep'); return i > -1 ? argv[i + 1] : null; })();

if (!existsSync(HEAD_ROOT)) {
  console.error(`missing HEAD tree at ${HEAD_ROOT}`);
  console.error('run: git worktree add --detach build/_head HEAD');
  process.exit(2);
}

const files = walk(CUR_ROOT);
console.log(`${apply ? 'APPLY' : 'REPORT (dry run)'}  revert displaystyle`);
console.log(`payloads: ${files.length}${keep ? `   keeping: ${keep}` : ''}`);
console.log('');

let stripped = 0;
let payloadsTouched = 0;
let keptPayloads = 0;
let skippedEntries = 0;
const problems = [];
const samples = [];

for (const file of files) {
  const rel = file.replace(/\\/g, '/');
  if (keep && rel.includes(keep)) { keptPayloads += 1; continue; }

  const headPath = HEAD_ROOT + rel.slice(CUR_ROOT.length);
  if (!existsSync(headPath)) { problems.push(`no HEAD copy for ${rel}`); continue; }

  const raw = readFileSync(file, 'utf8');
  let cur;
  let head;
  try { cur = JSON.parse(raw); } catch { problems.push(`unparseable current: ${rel}`); continue; }
  try { head = JSON.parse(readFileSync(headPath, 'utf8')); } catch { problems.push(`unparseable HEAD: ${rel}`); continue; }
  if (!Array.isArray(cur.concept) || !Array.isArray(head.concept)) continue;
  if (cur.concept.length !== head.concept.length) {
    problems.push(`entry count differs (${cur.concept.length} vs ${head.concept.length}): ${rel}`);
    continue;
  }

  let out = raw;
  let touchedHere = 0;

  for (let i = 0; i < cur.concept.length; i += 1) {
    const decoded = String(cur.concept[i]);
    const spans = scanInline(decoded);
    const headBodies = scanInline(String(head.concept[i])).map((m) => m.body);

    if (spans.length !== headBodies.length) {
      skippedEntries += 1;
      problems.push(`formula count differs in ${rel} entry ${i + 1} — skipped`);
      continue;
    }

    const targets = [];
    let ok = true;
    for (let k = 0; k < spans.length; k += 1) {
      const c = norm(spans[k].body);
      const h = norm(headBodies[k]);
      if (c === INSERT.trim() + ' ' + h || c === INSERT + h) {
        targets.push(k);
      } else if (c !== h) {
        // Invariant broken: the only permitted difference is the inserted prefix.
        ok = false;
        skippedEntries += 1;
        problems.push(
          `formula ${k + 1} in ${rel} entry ${i + 1} is neither identical to HEAD nor a prefix add — skipped` +
            `\n      current: ${c.slice(0, 70)}\n      HEAD   : ${h.slice(0, 70)}`
        );
        break;
      }
    }
    if (!ok || !targets.length) continue;

    // Remove exactly INSERT.length characters at each target body's first character, in reverse so
    // earlier offsets stay valid. The forward pass wrote INSERT at that offset, so this is exact.
    let next = decoded;
    for (let t = targets.length - 1; t >= 0; t -= 1) {
      const at = spans[targets[t]].start + 1;
      if (next.slice(at, at + MISSING) !== INSERT) {
        ok = false;
        problems.push(`expected prefix missing at offset ${at} in ${rel} entry ${i + 1} — skipped`);
        break;
      }
      next = next.slice(0, at) + next.slice(at + MISSING);
    }
    if (!ok) continue;

    // Round-trip proof: every body must now equal HEAD's.
    const afterBodies = scanInline(next).map((m) => m.body);
    for (let k = 0; k < afterBodies.length; k += 1) {
      if (norm(afterBodies[k]) !== norm(headBodies[k])) {
        ok = false;
        problems.push(`round-trip failed in ${rel} entry ${i + 1} formula ${k + 1} — skipped`);
        break;
      }
    }
    if (!ok) continue;

    const style = locate(out, decoded);
    if (!style) { skippedEntries += 1; problems.push(`cannot locate entry ${i + 1} in ${rel} — skipped`); continue; }
    const span = out.indexOf(style.text);
    const spliced = out.slice(0, span) + style.enc(next) + out.slice(span + style.text.length);
    let re;
    try { re = JSON.parse(spliced); } catch (e) {
      skippedEntries += 1;
      problems.push(`result does not parse in ${rel}: ${e.message} — skipped`);
      continue;
    }
    if (String(re.concept[i]) !== next) {
      skippedEntries += 1;
      problems.push(`post-splice check failed in ${rel} entry ${i + 1} — skipped`);
      continue;
    }

    out = spliced;
    touchedHere += targets.length;
    stripped += targets.length;
    if (samples.length < 5) samples.push(`${rel} entry ${i + 1}: ${targets.length} prefix(es) removed`);
  }

  if (touchedHere) {
    payloadsTouched += 1;
    if (apply) writeFileSync(file, out, 'utf8');
  }
}

console.log(`\\displaystyle prefixes removed : ${stripped}`);
console.log(`payloads reverted            : ${payloadsTouched}`);
console.log(`payloads kept                : ${keptPayloads}`);
console.log(`entries skipped              : ${skippedEntries}`);
if (problems.length) {
  console.log('');
  console.log('problems (nothing was guessed at — these were skipped):');
  for (const p of problems.slice(0, 12)) console.log(`  - ${p}`);
  if (problems.length > 12) console.log(`  ... and ${problems.length - 12} more`);
}
if (samples.length) {
  console.log('');
  for (const s of samples) console.log(`  ${s}`);
}
if (!apply) console.log('\nDry run — nothing written. Re-run with --apply.');
