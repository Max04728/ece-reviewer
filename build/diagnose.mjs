// diagnose.mjs — locate invalid JSON escapes in payload files.
import { readFileSync } from 'node:fs';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith('.json')) out.push(p);
  }
  return out;
}

const VALID = new Set(['"', '\\', '/', 'b', 'f', 'n', 'r', 't', 'u']);
let problems = 0;

for (const f of walk('build/payload')) {
  const s = readFileSync(f, 'utf8').replace(/^\uFEFF/, '');
  let ok = true;
  try {
    JSON.parse(s);
  } catch (e) {
    ok = false;
    problems++;
    console.log(`\n=== ${f}`);
    console.log(`  ${e.message}`);
    // scan for backslashes not forming a valid escape
    const bad = [];
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== '\\') continue;
      const next = s[i + 1];
      if (next === undefined || !VALID.has(next)) bad.push(i);
    }
    console.log(`  invalid escapes: ${bad.length}`);
    for (const i of bad.slice(0, 8)) {
      const ctx = s.slice(Math.max(0, i - 50), i + 30).replace(/\n/g, '\\n');
      console.log(`    @${i}: ...${ctx}...`);
    }
  }
}

console.log(`\npayload files checked: ${walk('build/payload').length} | invalid: ${problems}`);
