#!/usr/bin/env node
/**
 * run-all-checks.mjs
 *
 * One-shot verification for the calculator-technique work:
 *   1. structure audit      (the vault's own checker — style-guide compliance)
 *   2. calc-block syntax    (math delimiters, braces, block detection)
 *   3. numeric ground truth (every number quoted in a block, recomputed)
 *
 * Spawns child processes with stdio:'inherit' only — the sandbox blocks
 * piped stdio (EPERM), so no output is captured.
 *
 * Run:  node run-all-checks.mjs
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const steps = [
  ['structure audit', 'check-formula-structure.mjs'],
  ['calc-block syntax', 'check-calc-blocks.mjs'],
  ['numeric ground truth', 'verify-calc-techniques.mjs'],
  ['economy block numbers', 'verify-economy-blocks.mjs'],
];

let failed = 0;
for (const [label, script] of steps) {
  console.log(`\n${'='.repeat(72)}\n== ${label}  (${script})\n${'='.repeat(72)}`);
  const r = spawnSync(process.execPath, [path.join(here, script)], {
    stdio: 'inherit',
    cwd: here,
  });
  if (r.status !== 0) { failed++; console.log(`!! ${label} exited ${r.status}`); }
}

console.log(`\n${'='.repeat(72)}`);
console.log(failed === 0
  ? 'ALL CHECKS PASSED'
  : `${failed} check group(s) reported a non-zero exit`);
process.exit(failed === 0 ? 0 : 1);
