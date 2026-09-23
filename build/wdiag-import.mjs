// wdiag-import.mjs -- write a widget's processed body and import it to surface the error.
// Uses dynamic import (not execFileSync) because the DSH sandbox blocks piped child stdio.
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const file = process.argv[2];
const txt = readFileSync(file, 'utf8');
const m = txt.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.log('no module block'); process.exit(1); }

const STUB = [
  'const widget=()=>{};', "const fmt=()=>'';", "const si=()=>'';", 'const d=()=>0;',
  'function simpson(){return 0}', 'function trapezoid(){return 0}', 'function solve2(){return null}',
  'const deg=()=>0;', 'const rad=()=>0;', 'const clamp=(a)=>a;', 'const lerp=(a)=>a;',
  'const PALETTE=new Proxy({},{get:()=>"#888"});',
  'class Plot{constructor(){}setRange(){}X(){return 0}Y(){return 0}clear(){return this}',
  'grid(){return this}axes(){return this}fn(){return this}segment(){return this}',
  'dot(){return this}band(){return this}text(){return this}label(){return this}}',
].join('\n');

const body = m[1]
  .replace(/^[ \t]*import\s+[^;\n]*?from\s+['"][^'"\n]+['"];[ \t]*$/gm, '')
  .replace(/^[ \t]*import\s+['"][^'"\n]+['"];[ \t]*$/gm, '');

const stubLines = STUB.split('\n').length;
const tmp = 'build/_diag2.mjs';
writeFileSync(tmp, STUB + '\n' + body, 'utf8');

try {
  await import(pathToFileURL(tmp).href + '?t=' + Date.now());
  console.log('imported without a syntax error (it may have failed later for DOM reasons)');
} catch (e) {
  console.log(`${e.constructor.name}: ${e.message}`);
  const st = e.stack || '';
  const loc = st.split('\n').find((l) => l.includes('_diag2.mjs'));
  if (loc) {
    const n = Number((loc.match(/_diag2\.mjs:(\d+)/) || [])[1]);
    const bodyLine = n - stubLines;
    const src = body.split('\n');
    console.log(`\nat combined line ${n} -> widget body line ${bodyLine}`);
    for (let i = Math.max(0, bodyLine - 6); i < Math.min(src.length, bodyLine + 3); i++) {
      console.log(`${String(i + 1).padStart(4)}${i + 1 === bodyLine ? ' >> ' : '    '}${src[i]}`);
    }
  } else {
    console.log('stack head:\n' + st.split('\n').slice(0, 4).join('\n'));
  }
}
try { unlinkSync(tmp); } catch { /* ignore */ }
