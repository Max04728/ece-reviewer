// apply-calc-patches.mjs — apply authored calculator-technique blocks to payloads.
//
// WHY THIS EXISTS: adding `calc` to a payload means surgically editing hand-formatted JSON.
// Delegated workers should not be doing that — they author DATA, this tool does the surgery,
// serially, with guards. It also means one bad batch cannot take the vault down with it.
//
// PATCH FILE FORMAT — a JSON array:
//
//   [
//     {
//       "file": "build/payload/04_EST/05_Transmission_Lines_and_Waveguides/04_Reflection_Coefficient_and_VSWR.json",
//       "problem": 1,                       // 1-BASED, matching "### P1." in the note
//       "expect": "A 50-ohm line",          // substring of the problem prompt — identity check
//       "calc": { "mode": "COMP", "steps": ["…"], "note": "…" }
//     }
//   ]
//
// `expect` is REQUIRED. Without it an off-by-one in `problem` would silently attach a
// calculator technique to the wrong question, which is worse than having none.
//
//   node build/apply-calc-patches.mjs build/calc-patches/MyArea.json --report
//   node build/apply-calc-patches.mjs build/calc-patches --apply      # every .json in a dir
//
// Guards, all learned the hard way in this build:
//   * FUNCTION replacements — a replacement STRING treats `$'`, `$&` and `$$` as substitution
//     patterns, which spliced a file into itself and corrupted a payload.
//   * JSON.parse BEFORE writing, so a bad edit never reaches disk.
//   * re-parse + verify each intended value after writing.
//   * no PowerShell anywhere: Set-Content -Encoding UTF8 writes a BOM that JSON.parse rejects.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const APPLY = process.argv.includes('--apply');
const target = process.argv.slice(2).find((a) => !a.startsWith('--'));

if (!target) {
  console.error('usage: node build/apply-calc-patches.mjs <patchfile.json|dir> [--apply]');
  process.exit(2);
}

const patchFiles = statSync(target).isDirectory()
  ? readdirSync(target).filter((f) => f.endsWith('.json')).sort().map((f) => join(target, f))
  : [target];

const countOccurrences = (haystack, needle) => haystack.split(needle).length - 1;

/** Modes the contract names, from _meta/CALCULATOR_TECHNIQUES.md §1. */
const VALID_MODES = new Set(['COMP', 'CPLX', 'EQN', 'MATX', 'STAT', 'BASE', 'TABLE', 'VCTR']);

/** Contract deviations worth telling the author about. Reported, never silently "fixed". */
const warnings = [];

/** Group patch entries by payload file so each file is read, edited and written once. */
function groupByFile(entries) {
  const byFile = new Map();
  for (const e of entries) {
    if (!byFile.has(e.file)) byFile.set(e.file, []);
    byFile.get(e.file).push(e);
  }
  return byFile;
}

const failures = [];
let applied = 0;
let problemsTouched = 0;

for (const pf of patchFiles) {
  let entries;
  try {
    entries = JSON.parse(readFileSync(pf, 'utf8').replace(/^\uFEFF/, ''));
  } catch (e) {
    failures.push(`${relative('.', pf)}: not valid JSON (${e.message})`);
    continue;
  }
  if (!Array.isArray(entries)) { failures.push(`${relative('.', pf)}: expected a JSON array`); continue; }

  for (const [file, group] of groupByFile(entries)) {
    let raw;
    try { raw = readFileSync(file, 'utf8').replace(/^\uFEFF/, ''); }
    catch { failures.push(`${file}: cannot read`); continue; }
    let obj;
    try { obj = JSON.parse(raw); }
    catch (e) { failures.push(`${file}: payload does not parse (${e.message})`); continue; }

    let out = raw;
    let changed = 0;

    for (const e of group) {
      const idx = Number(e.problem) - 1;
      const where = `${relative('.', file)} P${e.problem}`;
      const p = obj.problems?.[idx];
      if (!p) { failures.push(`${where}: no such problem`); continue; }
      if (!e.calc?.steps?.length) { failures.push(`${where}: calc.steps is empty`); continue; }
      if (typeof e.expect !== 'string' || !e.expect) { failures.push(`${where}: "expect" is required`); continue; }
      if (!String(p.prompt ?? '').includes(e.expect)) {
        failures.push(`${where}: prompt does not contain expect "${e.expect}" — refusing (off-by-one?)`);
        continue;
      }

      // LINT — contract checks from _meta/CALCULATOR_TECHNIQUES.md §2. Warnings, not failures:
      // a slightly long note or a 4-step block is a style miss, not a reason to reject content.
      const lint = [];
      if (!VALID_MODES.has(String(e.calc.mode))) lint.push(`mode "${e.calc.mode}" is not one of ${[...VALID_MODES].join('/')}`);
      if (e.calc.steps.length > 3) lint.push(`${e.calc.steps.length} steps (the contract asks for 2–3)`);
      e.calc.steps.forEach((s, i) => {
        const txt = String(s);
        if (txt.trim().length < 12) lint.push(`step ${i + 1} is empty or very short`);
        if (/\\text\{/.test(txt)) lint.push(`step ${i + 1} uses \\text{} — use \\mathrm{}`);
        if (/(?<!\\)\|/.test(txt)) lint.push(`step ${i + 1} has a literal | — use \\lvert/\\rvert`);
      });
      // The block as a WHOLE must produce numbers. An interpretive closing step — "the force is
      // attractive", "direction is azimuthal", "that error message IS the answer" — legitimately
      // has none, and requiring a digit in EVERY step flagged 7 such conclusions as violations.
      // That was a false positive of this rule, not a defect in the content.
      if (!e.calc.steps.some((s) => /\d/.test(String(s)))) lint.push('no step states a numeric value');
      if (typeof e.expect !== 'string' || e.expect.length < 10) lint.push('"expect" is very short — it may not uniquely identify the problem');
      if (e.calc.note && e.calc.note.length > 220) lint.push('note is long — the contract asks for one short line');
      if (lint.length) warnings.push(`${where}: ${lint.join('; ')}`);

      if (p.calc) {
        const jsonOld = JSON.stringify(p.calc);
        const n = countOccurrences(out, jsonOld);
        if (n !== 1) { failures.push(`${where}: existing calc appears ${n} times — refusing`); continue; }
        if (jsonOld === JSON.stringify(e.calc)) continue;
        out = out.replace(jsonOld, () => JSON.stringify(e.calc));
        changed++;
        continue;
      }

      const anchorKey = p.trap ? 'trap' : (p.ans ? 'ans' : null);
      if (!anchorKey) { failures.push(`${where}: no trap or ans to anchor after`); continue; }
      const jsonOld = JSON.stringify(p[anchorKey]);
      const n = countOccurrences(out, jsonOld);
      if (n === 0) { failures.push(`${where}: anchor text not found`); continue; }
      if (n > 1) { failures.push(`${where}: anchor text appears ${n} times — refusing to guess`); continue; }
      out = out.replace(jsonOld, () => `${jsonOld}, "calc": ${JSON.stringify(e.calc)}`);
      changed++;
    }

    if (!changed) continue;
    problemsTouched += changed;

    if (APPLY) {
      try { JSON.parse(out); }
      catch (e) { failures.push(`${relative('.', file)}: edit produced invalid JSON (${e.message}) — NOT WRITTEN`); continue; }
      writeFileSync(file, out, 'utf8');
      const check = JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
      for (const e of group) {
        const got = check.problems?.[Number(e.problem) - 1]?.calc;
        if (!got || got.steps?.length !== e.calc.steps.length) {
          failures.push(`${relative('.', file)} P${e.problem}: VERIFY FAILED after write`);
        }
      }
      applied++;
    }
  }
}

console.log(`patch files      : ${patchFiles.length}`);
console.log(`problems changed : ${problemsTouched}`);
console.log(`payloads written : ${applied}`);
if (warnings.length) {
  console.log(`\nCONTRACT WARNINGS: ${warnings.length}`);
  for (const w of warnings.slice(0, 40)) console.log(`   ! ${w}`);
  if (warnings.length > 40) console.log(`   … and ${warnings.length - 40} more`);
}
if (failures.length) {
  console.log(`\n!! PROBLEMS: ${failures.length}`);
  for (const f of failures) console.log(`   ${f}`);
  process.exitCode = 1;
} else {
  console.log(APPLY ? '\nAPPLIED and verified' : '\nDRY RUN — re-run with --apply to write');
}
