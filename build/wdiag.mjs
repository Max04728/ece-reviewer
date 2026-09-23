// wdiag.mjs — locate the syntax error in a widget's module body.
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const STUB = `
const widget=()=>{}, fmt=()=>'', si=()=>'', d=()=>0, simpson=()=>0, trapezoid=()=>0,
      solve2=()=>null, deg=()=>0, rad=()=>0, clamp=(a)=>a, lerp=(a,b)=>a, PALETTE={};
class Plot{constructor(){this.xMin=0;this.xMax=1;this.yMin=0;this.yMax=1;this.pad=0;
  this.ctx={save(){},restore(){},beginPath(){},moveTo(){},lineTo(){},stroke(){},fill(){},
  fillRect(){},arc(){},setLineDash(){},fillText(){},closePath(){}};}
  setRange(){}X(){return 0}Y(){return 0}xInv(){return 0}clear(){return this}grid(){return this}
  axes(){return this}fn(){return this}segment(){return this}dot(){return this}
  band(){return this}text(){return this}label(){return this}}
`;

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.log('no module script'); process.exit(1); }
const body = m[1]
  .replace(/^\s*import\s+[^;]*?from\s+['"][^'"]+['"];\s*$/gm, '')
  .replace(/^\s*import\s+['"][^'"]+['"];\s*$/gm, '');

const tmp = mkdtempSync(join(tmpdir(), 'wdiag-'));
const f = join(tmp, 'body.mjs');
writeFileSync(f, STUB + body, 'utf8');

try {
  await import(pathToFileURL(f).href);
  console.log('parses OK');
} catch (e) {
  if (!(e instanceof SyntaxError)) { console.log('non-syntax error (expected):', e.message); }
  else {
    console.log('SyntaxError:', e.message);
    // The stub prefix shifts line numbers; report the reported line and show context.
    const stack = e.stack || '';
    const lm = stack.match(/body\.mjs:(\d+)/);
    if (lm) {
      const stubLines = STUB.split('\n').length - 1;
      const bodyLine = Number(lm[1]) - stubLines;
      const lines = body.split('\n');
      const from = Math.max(0, bodyLine - 5);
      const to = Math.min(lines.length, bodyLine + 4);
      console.log(`\nbody line ${bodyLine}, context:`);
      for (let i = from; i < to; i++) {
        console.log(`${String(i + 1).padStart(4)}${i + 1 === bodyLine ? ' >> ' : '    '}${lines[i]}`);
      }
    }
  }
}
rmSync(tmp, { recursive: true, force: true });
