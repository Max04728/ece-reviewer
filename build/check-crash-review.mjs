// check-crash-review.mjs — post-write verification of an assembled crash-review note.
//
//   node build/check-crash-review.mjs                      # both courses
//   node build/check-crash-review.mjs --course ee          # one course
//
// `verify.mjs` proves the vault's structure, links and tiers. This proves the things specific to
// these hand-authored notes: that each exists, is really UTF-8 with the typographic characters the
// vault uses, keeps the house single-`$` maths convention, links only to real notes, and still has
// all nine timed blocks and its checkbox list intact. Read-only.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, basename, relative } from 'node:path';
import { PART_NOTES, partNotePath, VAULT } from './vault.mjs';

// Mirrors the plan in assemble-crash-review.mjs; kept here so the check is independent of it.
const COURSES = {
  math: { part: '01_Mathematics', plan: { 1: 7, 2: 7, 3: 8, 4: 8, 5: 10, 6: 6, 7: 6, 8: 4, 9: 4 } },
  ee: { part: '02_Electronics_Engineering', plan: { 1: 8, 2: 7, 3: 4, 4: 9, 5: 10, 6: 5, 7: 8, 8: 5, 9: 4 } },
};

const argOf = (flag, dflt) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
};
const only = process.argv.includes('--course') ? argOf('--course', null) : null;
const courses = only ? { [only]: COURSES[only] } : COURSES;

// ---------------------------------------------------------- shared link index
function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const stripExt = (n) => n.replace(/\.(md|html)$/i, '');
const byBase = new Map();
for (const f of walk(VAULT)) {
  if (!/\.(md|html)$/i.test(f)) continue;
  const b = stripExt(basename(f));
  if (!byBase.has(b)) byBase.set(b, []);
  byBase.get(b).push(relative(VAULT, f).replace(/\\/g, '/'));
}

let totalFail = 0;

for (const [key, cfg] of Object.entries(courses)) {
  if (!cfg) { console.log(`unknown course "${key}"`); totalFail++; continue; }
  const NOTE = PART_NOTES[cfg.part];
  const path = partNotePath(cfg.part, NOTE);
  const mocRel = `${cfg.part}/_MOC_${cfg.part.replace(/^\d+_/, '')}.md`;
  const moc = `${VAULT}/${mocRel}`;

  console.log(`${'='.repeat(58)}`);
  console.log(`COURSE ${key}  (${cfg.part})`);
  console.log(`${'='.repeat(58)}`);

  let fail = 0;
  const ok = (cond, label, detail = '') => {
    if (!cond) fail++;
    console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${detail ? `  ${detail}` : ''}`);
  };

  if (!existsSync(path)) { ok(false, 'note exists', path); totalFail += fail; continue; }
  ok(true, 'note exists', path);
  ok(existsSync(moc), 'part MOC exists');

  const md = readFileSync(path, 'utf8');
  const mocText = readFileSync(moc, 'utf8');
  const lines = md.split('\n');

  ok(!md.startsWith('\uFEFF'), 'no UTF-8 BOM');
  ok(md.includes('\u2014'), 'em dashes preserved (U+2014)');
  ok(!/\uFFFD/.test(md), 'no replacement characters (no mojibake)');

  const displayMath = lines.filter((l) => l.includes('$$')).length;
  ok(displayMath === 0, 'no $$ display math', `${displayMath} lines`);
  ok((md.match(/\\text\{/g) || []).length === 0, 'no \\text{} (house rule prefers \\mathrm{})');
  const oddDollar = lines.filter((l) => {
    if (l.trimStart().startsWith('```')) return false;
    return ((l.match(/(?<!\\)\$/g) || []).length) % 2 !== 0;
  }).length;
  ok(oddDollar === 0, 'every line has balanced $ delimiters', `${oddDollar} unbalanced`);

  const blocks = Object.keys(cfg.plan).map(Number);
  const headings = [...md.matchAll(/^## Block (\d+)/gm)].map((m) => Number(m[1]));
  ok(JSON.stringify(headings) === JSON.stringify(blocks),
    `all ${blocks.length} timed blocks present in order`, headings.join(','));

  // stated minutes must match the plan, and the clock must total 60
  const heads = [...md.matchAll(/^## Block (\d+)\s*—\s*.+?\((\d+)\s*min\)/gm)];
  const wrongMin = heads.filter((m) => cfg.plan[Number(m[1])] !== Number(m[2]));
  ok(wrongMin.length === 0, 'block headings state the planned minutes',
    wrongMin.map((m) => `B${m[1]}=${m[2]}`).join(','));
  const clock = [...md.matchAll(/^- \[ \] \*\*(\d+) · .*?— (\d+) min/gm)].map((m) => [Number(m[1]), Number(m[2])]);
  ok(clock.length === blocks.length, 'the 60-minute clock lists every block', `${clock.length} entries`);
  const clockTotal = clock.reduce((a, [, min]) => a + min, 0);
  ok(clockTotal === 60, 'the clock totals exactly 60 minutes', `${clockTotal} min`);

  const boxes = (md.match(/^- \[ \]/gm) || []).length;
  ok(boxes >= 20, 'checkbox recall list present', `${boxes} checkboxes`);
  ok((md.match(/^### Rapid-fire recall/gm) || []).length === blocks.length, 'rapid-fire section in each block');
  ok((md.match(/> \[!success\]- Answers/g) || []).length === blocks.length, 'one answers callout per block');
  const drills = (md.match(/> \[!success\]- Solution/g) || []).length;
  ok(drills >= 20, 'drill solutions present', `${drills} solutions`);

  ok(mocText.includes(`[[${NOTE.file}\\|`) || mocText.includes(`[[${NOTE.file}|`), 'part MOC links the note');

  // every wikilink resolves
  const broken = [];
  const ambiguous = [];
  let total = 0;
  for (const [i, l] of lines.entries()) {
    if (l.trimStart().startsWith('```')) continue;
    for (const m of l.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g)) {
      total++;
      const target = m[1].trim();
      const b = stripExt(basename(target.replace(/\\/g, '/')));
      const hits = byBase.get(b);
      if (!hits) broken.push(`line ${i + 1}: [[${target}]]`);
      else if (hits.length > 1 && !hits.some((h) => basename(h) === target)) {
        ambiguous.push(`line ${i + 1}: [[${target}]] -> ${hits.join(', ')}`);
      }
    }
  }
  ok(broken.length === 0, `all ${total} wikilinks resolve`, broken.slice(0, 5).join('; '));
  ok(ambiguous.length === 0, 'no ambiguous wikilinks', ambiguous.slice(0, 5).join('; '));

  console.log(`  ${lines.length} lines, ${Buffer.byteLength(md)} bytes`);
  if (fail) console.log(`  -> ${fail} CHECK(S) FAILED`);
  totalFail += fail;
  console.log('');
}

console.log(`${'='.repeat(58)}`);
console.log(totalFail === 0 ? 'CRASH REVIEWS OK' : `${totalFail} CHECK(S) FAILED`);
if (totalFail) process.exitCode = 1;
