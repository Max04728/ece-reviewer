// scan-brackets.mjs -- track paren/brace/bracket depth and quote state; report the first
// line where an opener is never closed, or where depth goes negative. An unbalanced
// opener is the usual cause of a downstream "Unexpected token" at an operator.
import { readFileSync } from 'node:fs';

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.log('no module block'); process.exit(1); }
const lines = m[1].split('\n');

let depth = 0;
let state = 'code';
const stack = [];

for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  for (let k = 0; k < l.length; k++) {
    const c = l[k];
    if (state === 'linecomment') break;
    if (state === 'blockcomment') {
      if (c === '*' && l[k + 1] === '/') { state = 'code'; k++; }
      continue;
    }
    if (state !== 'code') {
      if (c === '\\') { k++; continue; }
      if ((state === 'single' && c === "'") || (state === 'double' && c === '"') || (state === 'template' && c === '`')) state = 'code';
      continue;
    }
    if (c === '/' && l[k + 1] === '/') { state = 'linecomment'; k++; continue; }
    if (c === '/' && l[k + 1] === '*') { state = 'blockcomment'; k++; continue; }
    if (c === "'") { state = 'single'; continue; }
    if (c === '"') { state = 'double'; continue; }
    if (c === '`') { state = 'template'; continue; }
    if (c === '(' || c === '{' || c === '[') { depth++; stack.push({ ch: c, line: i + 1 }); continue; }
    if (c === ')' || c === '}' || c === ']') {
      depth--;
      stack.pop();
      if (depth < 0) {
        console.log(`depth went NEGATIVE at line ${i + 1}: ${l.trim().slice(0, 140)}`);
        process.exit(0);
      }
    }
  }
  if (state === 'linecomment') state = 'code';
}

console.log(`${file}`);
console.log(`final depth: ${depth}   final state: ${state}`);
if (depth !== 0) {
  console.log('unclosed openers (last 12):');
  for (const s of stack.slice(-12)) console.log(`  '${s.ch}' opened at line ${s.line}`);
} else {
  console.log('brackets balanced');
}
