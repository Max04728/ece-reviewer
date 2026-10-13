import fs from 'node:fs';
const ROOT = 'C:\\Users\\Admin\\Desktop\\ECE_Reviewer\\Formula';
const files = [
  'Mathematics/01_Differential_Calculus.md','Mathematics/02_Integral_Calculus.md',
  'Mathematics/04_Advanced_Engineering_Math.md','Mathematics/07_Signals_and_Systems.md',
  'Mathematics/08_Numerical_Methods_and_Analysis.md','Mathematics/09_Engineering_Data_Analysis.md',
  'GEAS/05_Engineering_Economy.md',
];

// Pattern to find: a `$$` display block (or table row run), then a callout, then `**Symbols**`
// with NO intervening formula that the Symbols could belong to.
let issues = 0;
for (const f of files) {
  const L = fs.readFileSync(ROOT + '/' + f, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
  for (let i = 0; i < L.length; i++) {
    if (!/^\*\*Symbols\*\*/.test(L[i])) continue;
    // walk backwards over blanks to find what precedes Symbols
    let j = i - 1;
    while (j >= 0 && L[j].trim() === '') j--;
    if (j >= 0 && /^>/.test(L[j])) {
      // Symbols is preceded by a callout. Find the last non-callout content before it.
      let k = j;
      while (k >= 0 && (/^>/.test(L[k]) || L[k].trim() === '')) k--;
      console.log(`DISPLACED? ${f}:${i + 1}  Symbols follows callout; preceding content L${k + 1}: ${(L[k] || '').slice(0, 70)}`);
      issues++;
    }
  }
}
console.log(issues ? `\n${issues} possible displaced Symbols block(s)` : 'No displaced Symbols blocks.');
