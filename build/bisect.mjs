// bisect.mjs -- find the first malformed top-level statement in a widget body.
// Cuts only at depth-0 newlines so each prefix is a syntactically complete prefix,
// then imports each prefix and reports the first one that fails.
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
const src = m[1];
const imported = (src.match(/import\s*\{([^}]*)\}\s*from\s*['"][^'"]*vault\.js['"]/) || [, ''])[1];
const names = imported.split(',').map((s) => s.trim().split(/\s+as\s+/).pop().trim()).filter(Boolean);
const exports = names.map((n) => `export const ${n} = undefined;`).join('\n');
const dataUrl = 'data:text/javascript,' + encodeURIComponent(exports + '\nexport default {};');
const body = src.replace(/from\s*['"][^'"]*vault\.js['"]/, `from '${dataUrl}'`);
const lines = body.split('\n');

// depth-0 line indices (safe cut points)
function depthAt(lines, upTo) {
  let depth = 0, state = 'code';
  for (let i = 0; i < upTo; i++) {
    const l = lines[i];
    for (let k = 0; k < l.length; k++) {
      const c = l[k];
      if (state === 'linecomment') break;
      if (state === 'blockcomment') { if (c === '*' && l[k + 1] === '/') { state = 'code'; k++; } continue; }
      if (state !== 'code') { if (c === '\\') { k++; continue; } if ((state === 'single' && c === "'") || (state === 'double' && c === '"') || (state === 'template' && c === '`')) state = 'code'; continue; }
      if (c === '/' && l[k + 1] === '/') { state = 'linecomment'; k++; continue; }
      if (c === '/' && l[k + 1] === '*') { state = 'blockcomment'; k++; continue; }
      if (c === "'") { state = 'single'; continue; }
      if (c === '"') { state = 'double'; continue; }
      if (c === '`') { state = 'template'; continue; }
      if ('({['.includes(c)) depth++;
      if (')}]'.includes(c)) depth--;
    }
    if (state === 'linecomment') state = 'code';
  }
  return depth;
}

const cuts = [];
for (let i = 1; i <= lines.length; i++) if (depthAt(lines, i) === 0) cuts.push(i);
if (!cuts.includes(lines.length)) cuts.push(lines.length);

async function ok(n) {
  const prefix = lines.slice(0, n).join('\n');
  writeFileSync('build/_bis.mjs', prefix, 'utf8');
  try {
    await import(pathToFileURL('build/_bis.mjs').href + '?t=' + n + '_' + Date.now());
    return true;
  } catch (e) {
    return !(e instanceof SyntaxError);
  }
}

let lo = 0, hi = cuts.length - 1, firstBad = null;
while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (await ok(cuts[mid])) lo = mid + 1;
  else { firstBad = mid; hi = mid - 1; }
}

console.log(`${file}`);
if (firstBad === null) {
  console.log('every depth-0 prefix parses (malformation is not statement-local)');
} else {
  const endLine = cuts[firstBad];
  const startLine = firstBad > 0 ? cuts[firstBad - 1] + 1 : 1;
  console.log(`first malformed statement: body lines ${startLine}-${endLine}`);
  for (let i = startLine - 1; i < Math.min(lines.length, endLine); i++) {
    console.log(`${String(i + 1).padStart(4)}  ${lines[i]}`);
  }
}
try { unlinkSync('build/_bis.mjs'); } catch { /* ignore */ }
