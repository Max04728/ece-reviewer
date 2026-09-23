// show-lines.mjs -- print numbered lines of a widget's script body.
import { readFileSync } from 'node:fs';
const file = process.argv[2];
const from = Number(process.argv[3] || 1);
const to = Number(process.argv[4] || from + 20);
const m = readFileSync(file, 'utf8').match(/<script type="module">([\s\S]*?)<\/script>/);
const lines = m[1].split('\n');
console.log(`body has ${lines.length} lines`);
for (let i = from; i <= Math.min(to, lines.length); i++) {
  console.log(`${String(i).padStart(4)}  ${lines[i - 1]}`);
}
