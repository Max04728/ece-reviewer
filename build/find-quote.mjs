// find-quote.mjs -- locate lines with an odd number of single quotes in a widget body,
// which is the signature of an unescaped apostrophe that terminates a string early.
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.log('no module block'); process.exit(1); }
const lines = m[1].split('\n');

let hits = 0;
lines.forEach((l, i) => {
  const t = l.trim();
  if (t.startsWith('//') || t.startsWith('*') || t.startsWith('/*')) return;
  // count only quotes that are not escaped
  let q = 0;
  for (let k = 0; k < l.length; k++) {
    if (l[k] === "'" && l[k - 1] !== '\\') q++;
  }
  if (q % 2 === 1) {
    hits++;
    console.log(`  body line ${i + 1} (${q} single quotes): ${t.slice(0, 140)}`);
  }
});
console.log(`\n${file}`);
console.log(`odd-quote lines: ${hits}`);
