// repair-payload.mjs — fix unescaped backslashes in a payload JSON file.
//
// WHY THIS IS NEEDED: LaTeX must be written as \\ in JSON (the file contains two
// characters, `\` `\`? No — it contains a single backslash once parsed, which is what
// MathJax needs). A payload author who types `\pi` instead of `\\pi` produces a JSON
// string with the invalid escape `\p`, and JSON.parse rejects the whole file.
//
// This script walks the raw text and, inside JSON string literals only, doubles any
// backslash that does not begin a valid JSON escape. It writes a .bak alongside.
//
//   node build/repair-payload.mjs <file> [--check]
//
// Note: `\\` in the source is already correct, so it is left alone (the scanner steps
// over both characters). `\\d` in the source therefore stays `\\d`, which parses to the
// two-character sequence `\d` that MathJax renders correctly.

import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';

const VALID = new Set(['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u']);
const file = process.argv[2];
const checkOnly = process.argv.includes('--check');

if (!file) {
  console.error('usage: node build/repair-payload.mjs <payload.json> [--check]');
  process.exit(2);
}

const src = readFileSync(file, 'utf8').replace(/^\uFEFF/, '');

let inStr = false;
let out = '';
let fixes = 0;

for (let i = 0; i < src.length; i++) {
  const ch = src[i];

  if (!inStr) {
    out += ch;
    if (ch === '"') inStr = true;
    continue;
  }

  // inside a string literal
  if (ch === '\\') {
    const next = src[i + 1];
    if (next !== undefined && VALID.has(next)) {
      // already a valid escape: copy both characters and step over
      out += ch + next;
      i++;
      if (next === 'u') {
        // unicode escape: copy the 4 hex digits verbatim
        out += src.slice(i + 1, i + 5);
        i += 4;
      }
      continue;
    }
    // invalid escape: double the backslash
    out += '\\\\';
    fixes++;
    continue;
  }

  if (ch === '"') {
    inStr = false;
    out += ch;
    continue;
  }

  out += ch;
}

if (fixes === 0) {
  console.log(`no invalid escapes found in ${file}`);
  process.exit(0);
}

// verify the repaired text parses before writing
let parsed = null;
try {
  parsed = JSON.parse(out);
} catch (e) {
  console.error(`repair would still not parse: ${e.message}`);
  process.exit(1);
}

if (checkOnly) {
  console.log(`${file}: ${fixes} invalid escape(s) would be fixed`);
  process.exit(0);
}

copyFileSync(file, `${file}.bak`);
writeFileSync(file, out, 'utf8');
console.log(`${file}: fixed ${fixes} invalid escape(s); backup at ${file}.bak`);
console.log(`  parses OK, keys: ${Object.keys(parsed).join(', ')}`);
