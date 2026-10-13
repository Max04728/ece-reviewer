import fs from 'node:fs';
const ROOT = 'C:\\Users\\Admin\\Desktop\\ECE_Reviewer\\Formula';
const files = [
  'Mathematics/01_Differential_Calculus.md',
  'Mathematics/02_Integral_Calculus.md',
  'Mathematics/04_Advanced_Engineering_Math.md',
  'Mathematics/07_Signals_and_Systems.md',
  'Mathematics/08_Numerical_Methods_and_Analysis.md',
  'Mathematics/09_Engineering_Data_Analysis.md',
  'GEAS/05_Engineering_Economy.md',
  'CALCULATOR_TECHNIQUES.md',
];

let bad = 0, blocks = 0, lines = 0;
const problems = [];

for (const f of files) {
  const L = fs.readFileSync(ROOT + '/' + f, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
  let inBlk = false;
  for (let i = 0; i < L.length; i++) {
    const line = L[i];
    if (/^> \[!example\]/.test(line)) { inBlk = true; blocks++; continue; }
    if (inBlk && !/^>/.test(line)) inBlk = false;
    if (!inBlk) continue;
    lines++;

    // Detect backtick (code) spans — $ inside code should be ignored by Obsidian
    const stripped = line.replace(/`[^`]*`/g, '');
    // Count unescaped $ (treat $$ as two)
    let n = 0;
    for (let k = 0; k < stripped.length; k++) {
      if (stripped[k] === '\\') { k++; continue; }
      if (stripped[k] === '$') n++;
    }
    if (n % 2 !== 0) { problems.push(`ODD $  ${f}:${i + 1}  ${line}`); bad++; }

    // Bare pipe inside inline math in a callout is fine (not a table row),
    // but flag stray unescaped pipes outside code for review.
    const noCode = line.replace(/`[^`]*`/g, '');
    const mathSpans = noCode.match(/\$[^$]*\$/g) || [];
    for (const s of mathSpans) {
      // unbalanced braces inside math
      const open = (s.match(/\{/g) || []).length;
      const close = (s.match(/\}/g) || []).length;
      if (open !== close) problems.push(`BRACE ${f}:${i + 1}  ${s.slice(0, 80)}`);
    }
  }
}

console.log(`example blocks: ${blocks}, callout body lines: ${lines}, odd-$ lines: ${bad}`);
if (problems.length) { console.log('\n--- problems ---'); problems.forEach(p => console.log(p)); }
else console.log('No odd-$ or unbalanced-brace issues found.');
