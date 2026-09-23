// scan-escapes.mjs — list every backslash in a file with its following character,
// so an invalid JSON escape can be identified precisely.
import { readFileSync } from 'node:fs';

const VALID = new Set(['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u']);
const file = process.argv[2];
const s = readFileSync(file, 'utf8').replace(/^\uFEFF/, '');

const counts = new Map();
const bad = [];

for (let i = 0; i < s.length; i++) {
  if (s[i] !== '\\') continue;
  const next = s[i + 1];
  const key = next === undefined ? '<EOF>' : next;
  counts.set(key, (counts.get(key) ?? 0) + 1);
  if (next === undefined || !VALID.has(next)) {
    bad.push({ pos: i, next: key });
  }
}

console.log(`file: ${file}`);
console.log(`total backslashes: ${[...counts.values()].reduce((a, b) => a + b, 0)}`);
console.log('followed by:');
for (const [k, v] of [...counts.entries()].sort()) {
  const ok = k === '<EOF>' ? 'INVALID' : VALID.has(k) ? 'valid' : 'INVALID';
  console.log(`  '\\${k}' x${String(v).padStart(4)}  ${ok}`);
}
console.log(`\ninvalid occurrences: ${bad.length}`);
for (const b of bad.slice(0, 10)) {
  console.log(`  @${b.pos} '\\${b.next}'  ...${s.slice(Math.max(0, b.pos - 60), b.pos + 20).replace(/\n/g, '\\n')}...`);
}
