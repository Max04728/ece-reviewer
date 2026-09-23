// patch-trial-steps.mjs — targeted, reviewable edits to one payload's worked-solution fields.
//
// CURRENT JOB: REVERT the givens trial on Parallel Resonance. The bullet-list layout and the
// LaTeX `give` values were shown on a real note and the author judged the ORIGINAL single
// semicolon-joined line good enough, so both are being put back exactly as they were. The
// layout gate (GIVENS_STYLE_TRIAL in formula-layout.mjs) has been emptied to match.
//
// Writes follow the pattern proven by fix-formulas.mjs: only the exact JSON-encoded VALUE is
// swapped, so indentation, key order and every other byte survive, and the file is re-parsed
// afterwards. Replacements use FUNCTION form — a replacement STRING would treat `$'`, `$&` and
// `$$` in this LaTeX as substitution patterns, which corrupted a payload earlier in this build.
// PowerShell is never used: Set-Content -Encoding UTF8 writes a BOM that JSON.parse rejects.
//
//   node build/patch-trial-steps.mjs --report
//   node build/patch-trial-steps.mjs --apply

import { readFileSync, writeFileSync } from 'node:fs';

const APPLY = process.argv.includes('--apply');

const JOBS = [
  {
    file: 'build/payload/02_Electronics_Engineering/02_AC_Circuits/08_Parallel_Resonance_and_Anti-Resonance.json',
    label: 'Parallel Resonance — revert givens to the original text',
    patches: [
      [0, ['give', 0], 'L = 100 mH'],
      [0, ['give', 1], 'C = 10 uF'],
      [0, ['give', 2], 'R = 10 ohm (coil, in series with L)'],

      [1, ['give', 0], 'V_s = 120 V rms at omega_0'],
      [1, ['give', 1], 'L = 100 mH'],
      [1, ['give', 2], 'C = 10 uF'],
      [1, ['give', 3], 'R = 10 ohm'],
      [1, ['give', 4], 'omega_0 = 994.99 rad/s'],
      [1, ['give', 5], 'Z_dyn = 1000 ohm'],
      [1, ['give', 6], 'Q = 9.95'],

      [2, ['give', 0], 'f_0 = 100 kHz'],
      [2, ['give', 1], 'BW = 2 kHz'],
      [2, ['give', 2], 'C = 0.1 uF'],

      [3, ['give', 0], 'L = 20 mH'],
      [3, ['give', 1], 'C = 0.5 uF'],
      [3, ['give', 2], 'R_a = 5 ohm'],
      [3, ['give', 3], 'R_b = 250 ohm'],
    ],
  },
];

/** Read the field a patch key refers to, or undefined if it does not exist. */
function fieldOf(problem, key) {
  if (Array.isArray(key) && key[0] === 'give') return problem?.give?.[key[1]];
  if (key === 'trap' || key === 'ans' || key === 'prompt') return problem?.[key];
  return problem?.steps?.[key];
}

let totalMatched = 0;
const failures = [];

for (const job of JOBS) {
  const raw = readFileSync(job.file, 'utf8').replace(/^\uFEFF/, '');
  const obj = JSON.parse(raw);
  let out = raw;
  let matched = 0;
  const already = [];

  for (const [pi, key, text] of job.patches) {
    const old = fieldOf(obj.problems?.[pi], key);
    const where = `P${pi + 1} ${Array.isArray(key) ? key.join(':') : key}`;
    if (typeof old !== 'string') { failures.push(`${job.label} ${where}: field does not exist`); continue; }
    // `replaceAll` fixes EVERY identical value in one pass, so a later patch whose old value
    // matched an earlier one finds its text already rewritten. That is success, not a failure.
    if (out.includes(JSON.stringify(text))) { already.push(where); continue; }
    const jsonOld = JSON.stringify(old);
    if (!out.includes(jsonOld)) { failures.push(`${job.label} ${where}: raw text not matched`); continue; }
    // Function replacement: no `$` substitution.
    out = out.replaceAll(jsonOld, () => JSON.stringify(text));
    matched++;
  }

  console.log(`${job.label}: ${matched} field(s) to change${already.length ? `, ${already.length} already correct` : ''}`);

  if (APPLY && matched) {
    try {
      JSON.parse(out);
    } catch (e) {
      failures.push(`${job.label}: replacement produced invalid JSON (${e.message}) — NOT WRITTEN`);
      continue;
    }
    writeFileSync(job.file, out, 'utf8');
    const check = JSON.parse(readFileSync(job.file, 'utf8').replace(/^\uFEFF/, ''));
    for (const [pi, key, text] of job.patches) {
      if (fieldOf(check.problems?.[pi], key) !== text) {
        failures.push(`${job.label} VERIFY FAILED P${pi + 1} ${Array.isArray(key) ? key.join(':') : key}`);
      }
    }
  }
  totalMatched += matched;
}

console.log(`\ntotal fields to change: ${totalMatched}`);
if (failures.length) {
  console.log(`\n!! PROBLEMS: ${failures.length}`);
  for (const f of failures) console.log(`   ${f}`);
  process.exitCode = 1;
} else if (APPLY) {
  console.log('APPLIED and verified');
} else {
  console.log('DRY RUN — re-run with --apply to write');
}
