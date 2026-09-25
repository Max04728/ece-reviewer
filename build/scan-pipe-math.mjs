// scan-pipe-math.mjs — find `|` used INSIDE inline maths in a way that BREAKS an Obsidian table.
//
//   node build/scan-pipe-math.mjs
//
// WHY: the renderer escapes `|` to `\|` inside a table cell. Hand-authored markdown gets no such
// help, so `$|Z|$` in a table cell is read as TWO cell separators: the row gains columns and the
// maths is chopped in half. It renders wrong and nothing reports an error.
//
// THE RELIABLE TEST. You cannot find this by regex alone, because the offending `|` is precisely
// the character a parser uses to split cells. So: split the row into cells the way a parser does,
// then check each resulting cell for an ODD number of `$`. A well-formed cell holds whole `$...$`
// spans (even count); a formula split by `|` leaves a dangling fragment on each side (odd count).
//
// Pipes inside maths OUTSIDE a table render fine. They are reported separately as advisory,
// because CONVENTIONS.md §6 still prefers \lvert / \rvert for house consistency.

import { readFileSync, existsSync } from 'node:fs';

const SCRATCH = {
  math: 'C:/Users/Admin/AppData/Local/Temp/dsh-FdDsSK/crash/math',
  ee: 'C:/Users/Admin/AppData/Local/Temp/dsh-FdDsSK/crash/ee',
};
const PARTS = {
  math: ['_framing.md', 'b1b2.md', 'b3.md', 'b4.md', 'b5.md', 'b6b9.md'],
  ee: ['_framing.md', 'b12.md', 'b34.md', 'b5.md', 'b67.md', 'b89.md'],
};

let totalBreaking = 0;
let totalAdvisory = 0;

for (const key of ['math', 'ee']) {
  const dir = SCRATCH[key];
  if (!existsSync(dir)) continue;
  const chunks = [];
  for (const f of PARTS[key]) {
    const p = `${dir}/${f}`;
    if (existsSync(p)) chunks.push(readFileSync(p, 'utf8').replace(/^\uFEFF/, '').trimEnd());
  }
  const md = chunks.join('\n\n---\n\n') + '\n';
  const lines = md.split('\n');

  console.log('='.repeat(62));
  console.log(`COURSE ${key}`);
  console.log('='.repeat(62));

  let breaking = 0;
  let advisory = 0;

  lines.forEach((line, i) => {
    const isRow = /^\s*\|/.test(line);
    const isSeparator = /^\s*\|[\s:|-]+\|\s*$/.test(line);

    if (isRow && !isSeparator) {
      const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|');
      const bad = [];
      cells.forEach((cell, ci) => {
        const dollars = (cell.match(/(?<!\\)\$/g) || []).length;
        if (dollars % 2 !== 0) bad.push({ ci: ci + 1, cell: cell.trim(), dollars });
      });
      if (bad.length) {
        breaking++;
        console.log(`  BREAKS line ${i + 1} (${bad.length} split cell(s)):`);
        for (const b of bad) console.log(`      cell ${b.ci} (${b.dollars} $): ${b.cell.slice(0, 66)}`);
      }
    } else if (!isRow) {
      const n = [...line.matchAll(/\$[^$\n]*\|[^$\n]*\$/g)].length;
      advisory += n;
    }
  });

  console.log(`  table-breaking rows : ${breaking}`);
  console.log(`  advisory (outside tables, renders fine): ${advisory}`);
  console.log('');
  totalBreaking += breaking;
  totalAdvisory += advisory;
}

console.log('='.repeat(62));
console.log(`table-breaking rows total : ${totalBreaking}`);
console.log(`advisory pipes total      : ${totalAdvisory}`);
console.log(totalBreaking === 0 ? 'NO TABLE-BREAKING PIPES' : 'TABLE BREAKAGE PRESENT');
