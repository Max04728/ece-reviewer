// scan-strings.mjs -- walk a module body tracking string state, and report the first line
// where a string is left unterminated. That is the signature of an unescaped apostrophe
// or a stray quote, which shows up as a downstream "Unexpected token" error.
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.log('no module block'); process.exit(1); }
const lines = m[1].split('\n');

let state = 'code';   // code | single | double | template | linecomment | blockcomment
let openedAt = 0;
let reported = 0;

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  for (let k = 0; k < l.length; k++) {
    const c = l[k];
    const prev = l[k - 1];
    if (state === 'linecomment') { break; }
    if (state === 'blockcomment') {
      if (c === '*' && l[k + 1] === '/') { state = 'code'; k++; }
      continue;
    }
    if (state === 'code') {
      if (c === '/' && l[k + 1] === '/') { state = 'linecomment'; k++; continue; }
      if (c === '/' && l[k + 1] === '*') { state = 'blockcomment'; k++; continue; }
      if (c === "'") { state = 'single'; openedAt = i + 1; continue; }
      if (c === '"') { state = 'double'; openedAt = i + 1; continue; }
      if (c === '`') { state = 'template'; openedAt = i + 1; continue; }
      continue;
    }
    // inside a string
    if (c === '\\') { k++; continue; }
    if (state === 'single' && c === "'") { state = 'code'; continue; }
    if (state === 'double' && c === '"') { state = 'code'; continue; }
    if (state === 'template' && c === '`') { state = 'code'; continue; }
  }
  if (state === 'linecomment') state = 'code';
  if (state === 'single' || state === 'double' || state === 'template') {
    // an unterminated string at end of line: legitimate only for a template literal that
    // continues (multi-line), so flag single/double quotes and templates that never close
    if (state !== 'template') {
      console.log(`UNTERMINATED ${state} string opened at line ${openedAt}, still open at end of line ${i + 1}:`);
      console.log(`  ${l.trim().slice(0, 150)}`);
      reported++;
      if (reported > 8) break;
    }
  }
}
console.log(`\n${file}`);
console.log(`state at end of body: ${state}`);
console.log(`unterminated single/double strings reported: ${reported}`);
