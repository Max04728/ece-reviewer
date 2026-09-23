// wdiag4.mjs — bisect a widget's module body to find the offending line.
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const STUB = `const widget=()=>{}, fmt=()=>'', PALETTE={};
class Plot{constructor(){this.xMin=0;this.xMax=1;this.yMin=0;this.yMax=1;this.pad=0;this.ctx={save(){},restore(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fill(){},fillRect(){},arc(){},setLineDash(){},fillText(){},closePath(){}};}setRange(){}X(){return 0}Y(){return 0}clear(){return this}grid(){return this}axes(){return this}fn(){return this}segment(){return this}dot(){return this}band(){return this}text(){return this}label(){return this}}
`;

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
const body = m[1]
  .replace(/^\s*import\s+[^;]*?from\s+['"][^'"]+['"];\s*$/gm, '')
  .replace(/^\s*import\s+['"][^'"]+['"];\s*$/gm, '');
const lines = body.split('\n');
const tmp = mkdtempSync(join(tmpdir(), 'w4-'));

// Wrap the truncated body in a function so a partial body with unbalanced braces
// still parses as a statement list where possible.
async function parses(n) {
  const f = join(tmp, `t${n}.mjs`);
  const src = 'async function __w(){\n' + lines.slice(0, n).join('\n') + '\n}\n';
  writeFileSync(f, STUB + src, 'utf8');
  try {
    await import(pathToFileURL(f).href + '?v=' + n);
    return true;
  } catch (e) {
    return !(e instanceof SyntaxError);
  }
}

// Find the smallest prefix that fails. Note: truncation itself can break syntax, so
// this narrows rather than pinpoints; the reported line is where the first failure
// appears, which is at or just after the real defect.
let lo = 1, hi = lines.length, first = null;
while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  const ok = await parses(mid);
  if (ok) lo = mid + 1;
  else { first = mid; hi = mid - 1; }
}

console.log(`body lines: ${lines.length}`);
if (first === null) {
  console.log('every prefix parses (defect may be in balancing braces only)');
} else {
  console.log(`first failing prefix ends at body line ${first}`);
  const from = Math.max(0, first - 6);
  for (let i = from; i < Math.min(lines.length, first + 3); i++) {
    console.log(`${String(i + 1).padStart(4)}${i + 1 === first ? ' >> ' : '    '}${lines[i]}`);
  }
}
rmSync(tmp, { recursive: true, force: true });
