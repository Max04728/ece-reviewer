// check-lvert-spacing.mjs — find \lvert / \rvert written without a delimiter before a letter.
//
//   node build/check-lvert-spacing.mjs
//
// WHY: TeX control words are terminated by a non-letter. `\lvertZ` parses as the unknown command
// "\lvertZ" and fails to render, whereas `\lvert Z` is correct. The same applies to `\rvert` at the
// end of a control word, and a bare `\rvert^2` is fine because `^` is a non-letter. This scans for
// the dangerous form: \lvert or \rvert immediately followed by a letter.
import { readFileSync, existsSync } from 'node:fs';

const files = [
  'ECE_Reviewer_Vault/01_Mathematics/_Math_Crash_Review.md',
  'ECE_Reviewer_Vault/02_Electronics_Engineering/_Electronics_Crash_Review.md',
];

let total = 0;
for (const f of files) {
  if (!existsSync(f)) { console.log(`${f} (missing)`); continue; }
  const lines = readFileSync(f, 'utf8').split('\n');
  const bad = [];
  lines.forEach((l, i) => {
    for (const m of l.matchAll(/\\(l|r)vert(?=[A-Za-z])/g)) {
      bad.push({ line: i + 1, text: l.trim().slice(0, 110) });
    }
  });
  console.log(`${f}`);
  console.log(`  ${bad.length} \\lvert/\\rvert immediately followed by a letter (will not render)`);
  for (const b of bad.slice(0, 12)) console.log(`    line ${b.line}: ${b.text}`);
  total += bad.length;
  console.log('');
}
console.log(total === 0 ? 'ALL \\lvert/\\rvert ARE PROPERLY DELIMITED' : `${total} BAD DELIMITER(S)`);
