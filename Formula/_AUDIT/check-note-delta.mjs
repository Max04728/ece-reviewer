// check-note-delta.mjs — compare a formula note before/after a definition-expansion pass.
// Checks: every $$ equation survives, inline math balance, table integrity, back-link, topic count.
// Usage: node Formula/_AUDIT/check-note-delta.mjs <before.md> <after.md>

import { readFileSync } from 'node:fs';

const [, , a, b] = process.argv;
if (!a || !b) { console.error('usage: check-note-delta.mjs <before.md> <after.md>'); process.exit(2); }

const before = readFileSync(a, 'utf8');
const after = readFileSync(b, 'utf8');

let fails = 0;
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`); if (!cond) fails++; };

const disp = (s) => (s.match(/\$\$[\s\S]*?\$\$/g) || []);
const db = disp(before), da = disp(after);

const norm = (x) => x.replace(/\s+/g, ' ').trim();
const sb = new Set(db.map(norm));
const sa = new Set(da.map(norm));

// 1. every original display equation still present
const lost = [...sb].filter((e) => !sa.has(e));
ok(lost.length === 0, `all ${db.length} original $$ equations retained (lost ${lost.length})`);
lost.forEach((e) => console.log(`      LOST: ${e.slice(0, 120)}`));

// 2. display blocks balanced (even count of $$)
ok(da.length === (after.match(/\$\$/g) || []).length / 2,
   `$$ delimiters balanced (${da.length} blocks, ${(after.match(/\$\$/g) || []).length} markers)`);

// 3. inline $ balance per non-fence line, after removing $$ tokens
let unbalanced = 0;
for (const [i, line] of after.split('\n').entries()) {
  if (line.trimStart().startsWith('$$')) continue;
  const stripped = line.replace(/\$\$/g, '');
  const n = (stripped.match(/(?<!\\)\$/g) || []).length;
  if (n % 2 !== 0) { unbalanced++; console.log(`      line ${i + 1}: odd inline \$ count -> ${line.slice(0, 110)}`); }
}
ok(unbalanced === 0, `inline $ balanced on every line (${unbalanced} odd)`);

// 4. markdown table integrity: every table must have a header + separator
const lines = after.split('\n');
let tablesChecked = 0, badTable = 0;
for (let i = 0; i < lines.length; i++) {
  if (/^\s*\|/.test(lines[i]) && !/^\s*\|[\s:|-]+\|\s*$/.test(lines[i])) {
    const next = lines[i + 1] || '';
    const prev = lines[i - 1] || '';
    const isFirst = !/^\s*\|/.test(prev);
    if (isFirst) {
      tablesChecked++;
      if (!/^\s*\|[\s:|-]+\|\s*$/.test(next)) { badTable++; console.log(`      line ${i + 1}: table has no separator row`); }
    }
  }
}
ok(badTable === 0, `all ${tablesChecked} tables have a header + separator row`);

// 5. orphaned separator rows (a |---| with no header above)
let orphan = 0;
for (let i = 0; i < lines.length; i++) {
  if (/^\s*\|[\s:|-]+\|\s*$/.test(lines[i]) && !/^\s*\|/.test(lines[i - 1] || '')) {
    orphan++; console.log(`      line ${i + 1}: orphan separator row`);
  }
}
ok(orphan === 0, `no orphan table separator rows (${orphan})`);

// 6. topic count preserved
const topicCount = (s) => (s.match(/^### /gm) || []).length;
ok(topicCount(before) === topicCount(after), `topic count preserved (${topicCount(before)} -> ${topicCount(after)})`);

// 7. back-link last
const last = after.trimEnd().split('\n').pop().trim();
ok(last === '→ Back to [[00_Index]]', `back-link intact ("${last}")`);

// 8. ## part headings preserved
const parts = (s) => (s.match(/^## /gm) || []).length;
ok(parts(before) === parts(after), `part headings preserved (${parts(before)} -> ${parts(after)})`);

// 9. no HTML / usepackage introduced
ok(!/\\usepackage|\\newcommand|<div|<span|<br/i.test(after), 'no \\usepackage / HTML introduced');

console.log(`\nlines: ${before.split('\n').length} -> ${after.split('\n').length}`);
console.log(`Symbols blocks: ${(before.match(/\*\*Symbols\*\*/g) || []).length} -> ${(after.match(/\*\*Symbols\*\*/g) || []).length}`);
console.log(fails === 0 ? '\nALL CHECKS PASSED' : `\n${fails} CHECK(S) FAILED`);
process.exit(fails === 0 ? 0 : 1);
