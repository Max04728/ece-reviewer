// wdiag3.mjs — get the real line number of a widget's syntax error.
// A dynamic import gives a stack with file:line, which is what we need.
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
const stubLines = STUB.split('\n').length - 1;

const tmp = mkdtempSync(join(tmpdir(), 'w3-'));
const f = join(tmp, 'b.mjs');
writeFileSync(f, STUB + body, 'utf8');

try {
  await import(pathToFileURL(f).href);
  console.log('parses OK');
} catch (e) {
  console.log('error:', e.constructor.name, '-', e.message);
  const stack = e.stack || '';
  console.log('--- stack head ---');
  console.log(stack.split('\n').slice(0, 5).join('\n'));
  // V8 sometimes includes the offending source position in the message or stack.
  const lines = body.split('\n');
  const lm = stack.match(/b\.mjs:(\d+):(\d+)/);
  if (lm) {
    const bodyLine = Number(lm[1]) - stubLines;
    const col = Number(lm[2]);
    console.log(`\nreported at body line ${bodyLine}, column ${col}`);
    for (let i = Math.max(0, bodyLine - 4); i < Math.min(lines.length, bodyLine + 3); i++) {
      console.log(`${String(i + 1).padStart(4)}${i + 1 === bodyLine ? ' >> ' : '    '}${lines[i]}`);
    }
  } else {
    console.log('\nno line info; dumping body line count:', lines.length);
  }
}
rmSync(tmp, { recursive: true, force: true });
