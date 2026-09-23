// wdiag2.mjs — report the exact line of a widget's syntax error.
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

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
const tmp = mkdtempSync(join(tmpdir(), 'wdiag2-'));
const f = join(tmp, 'body.mjs');
writeFileSync(f, STUB + body, 'utf8');

let out = '';
try {
  execFileSync(process.execPath, ['--check', f], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  console.log('parses OK');
} catch (e) {
  out = (e.stderr || '') + (e.stdout || '');
}

// node --check does not give line numbers for modules; do our own scan for the
// reported token and print the body line numbers it could correspond to.
if (!out.includes('parses OK')) {
  console.log(out.trim().split('\n').slice(0, 6).join('\n'));
  const lines = body.split('\n');
  // Find suspicious lines: a binary + with nothing meaningful before it, or an
  // operator at the start of a line.
  const susp = [];
  lines.forEach((l, i) => {
    const t = l.trim();
    if (/^[+*/]/.test(t) && !/^\+{2}/.test(t)) susp.push({ n: i + 1, l });
    if (/[+\-*/]\s*[+\*/]/.test(t)) susp.push({ n: i + 1, l });
    if (/\bconst\b[^=]*=\s*[+\-*/]/.test(t)) susp.push({ n: i + 1, l });
  });
  console.log('\nsuspicious lines in the module body:');
  for (const s of susp.slice(0, 20)) console.log(`  ${String(s.n).padStart(4)}  ${s.l.trim().slice(0, 110)}`);
}

rmSync(tmp, { recursive: true, force: true });
