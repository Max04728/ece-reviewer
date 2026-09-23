// negtest.mjs — confirm check-widgets still rejects a canvas widget with no vault.js
// import, i.e. that relaxing the rule for DOM-only widgets did not disable the check.
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const dir = 'ECE_Reviewer_Vault/02_Electronics_Engineering/08_Logic_Circuits_and_Switching/Widgets/';
const tmp = dir + '_negtest_tmp.html';
const src = readFileSync(dir + 'KMap_Solver_Interactive.html', 'utf8');
const withCanvas = src.replace('<div id="app"></div>', '<div id="app"></div><canvas id="c"></canvas>');
writeFileSync(tmp, withCanvas, 'utf8');

let output = '';
try {
  // check-widgets prints a report; run it and capture by re-implementing the call
  const { checkWidgets } = await import('./check-widgets.mjs');
  const r = await checkWidgets();
  output = r.problems.map((p) => `${p.file}: ${p.msgs.join('; ')}`).join('\n');
} catch (e) {
  output = 'ERROR ' + e.message;
}

unlinkSync(tmp);

const flagged = /_negtest_tmp/.test(output);
console.log(output || '(no problems reported)');
console.log('');
console.log(flagged
  ? 'PASS: the canvas-without-vault.js case is still rejected'
  : 'FAIL: relaxing the rule also disabled the canvas check');
process.exitCode = flagged ? 0 : 1;
