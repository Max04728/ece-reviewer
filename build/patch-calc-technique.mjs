// patch-calc-technique.mjs — the optional calculator-based solution path, per problem.
//
// Adds (or replaces) a `calc` field on chosen problems:
//
//   "calc": { "mode": "COMP", "steps": ["..."], "note": "..." }
//
// rendered by expand.mjs as a collapsed `> [!tip]- Calculator technique (Canon F-789SGA)`
// callout. Per problem, so "only where it can be done" needs no placeholder.
//
// KEY SEQUENCES are taken from the F-789SGA function reference and used as written there:
//   * multi-statement separator is `ALPHA` `:` — several statements on ONE line, each `=`
//     evaluating the next. This is what makes the technique short.
//   * `SHIFT` `STO` + variable stores; `RCL` + variable recalls (no shift).
//   * `SHIFT` `SOLVE` runs Newton's method on `X`; `=` inside an equation is `ALPHA` `=`.
//   * `CALC` re-evaluates an expression, prompting per variable.
//   * `Ans` holds the last result.
//   An earlier draft of this file said `SHIFT` `RCL` to store and `SHIFT` `CALC` for SOLVE;
//   both were wrong and are corrected here.
//
// Writes: exact JSON-encoded VALUE replacement in FUNCTION form (a replacement string would
// treat `$'`/`$$` as substitution patterns — that corrupted a payload earlier in this build),
// parse-before-write, re-parse after. New keys are inserted by extending a unique existing
// value so the payload's hand formatting survives.
//
//   node build/patch-calc-technique.mjs --report
//   node build/patch-calc-technique.mjs --apply

import { readFileSync, writeFileSync } from 'node:fs';

const APPLY = process.argv.includes('--apply');

const JOBS = [
  {
    file: 'build/payload/02_Electronics_Engineering/02_AC_Circuits/08_Parallel_Resonance_and_Anti-Resonance.json',
    label: 'Parallel Resonance — calculator technique (short form)',
    sets: [
      {
        p: 0,
        after: 'trap',
        calc: {
          mode: 'COMP',
          steps: [
            'One line, statements separated by `ALPHA` `:` — `√(0.1÷1E-5) : √(1÷(0.1×1E-5)−10²÷0.1²) : Ans÷2π : 995×0.1÷10 : 0.1÷(10×1E-5)`',
            // NOTE: `\\omega` — a single backslash in a JS string literal is DROPPED ('\w' is
            // not a recognised escape), which silently produced `$omega_0$` on the first run.
            'Press `=` down the chain: $Z_0$ = **100** Ω → $\\omega_0$ = **995.0** rad/s → $f_0$ = **158.4** Hz → $Q$ = **9.95** → $Z_{dyn}$ = **1000** Ω. The approximation `1÷√(0.1×1E-5)` = **1000** rad/s is the 0.5 % high check.',
          ],
        },
      },
      {
        p: 1,
        after: 'trap',
        calc: {
          mode: 'COMP',
          steps: [
            '`120÷1000 : 120×995×1E-5 : 120÷√(10²+995²×0.1²) : 10÷0.1 : Ans÷2π`',
            '`=` down the chain: $I_s$ = **0.120** A → $I_C$ = **1.194** A → $|I_L|$ = **1.200** A → $BW$ = **100** rad/s → **15.9** Hz.',
          ],
          note: 'The two branch currents differing by under 1 % is the built-in sanity check — they differ only by the $R^2$ term.',
        },
      },
      {
        p: 2,
        after: 'trap',
        calc: {
          mode: 'COMP',
          steps: [
            '`2π×1E5` → **6.2832E5** rad/s. Enter rad/s, never $f_0$.',
            '`1÷(6.2832E5²×1E-7)` → **25.33** µH, then `×6.2832E5÷50` → **0.318** Ω.',
            '`√(2.533E-5÷1E-7)` → **15.92** Ω and `2.533E-5÷(0.318×1E-7)` → **795.8** Ω.',
          ],
        },
      },
      {
        p: 3,
        after: 'trap',
        calc: {
          mode: 'COMP',
          steps: [
            '`√(0.02÷5E-7)` → $Z_0$ = **200** Ω, against $R$ = 5 Ω and 250 Ω.',
            '(a) `√(1÷(0.02×5E-7)−5²÷0.02²)` → **9996.9** rad/s = **1.591** kHz.',
            '(b) swap in $R$ = 250 and the same expression returns **Math ERROR** — a negative radicand. That error IS the answer: no anti-resonance.',
          ],
          note: 'Cannot isolate the unknown? Type it with `X`, press `SHIFT` `SOLVE`, give a guess, `=`. The `L−R` line shows the residual.',
        },
      },
    ],
  },
];

/** Read the field a patch key refers to, or undefined if it does not exist. */
function fieldOf(problem, key) {
  if (Array.isArray(key) && key[0] === 'give') return problem?.give?.[key[1]];
  if (key === 'trap' || key === 'ans' || key === 'prompt') return problem?.[key];
  return problem?.steps?.[key];
}

const countOccurrences = (haystack, needle) => haystack.split(needle).length - 1;

let totalMatched = 0;
const failures = [];

for (const job of JOBS) {
  const raw = readFileSync(job.file, 'utf8').replace(/^\uFEFF/, '');
  const obj = JSON.parse(raw);
  let out = raw;
  let matched = 0;
  const unchanged = [];

  for (const set of job.sets) {
    const where = `P${set.p + 1}`;
    const existing = obj.problems?.[set.p]?.calc;
    const fragment = `"calc": ${JSON.stringify(set.calc)}`;

    if (existing) {
      // REPLACE the existing calc object. JSON.parse -> JSON.stringify round-trips the key
      // order and spacing the insert wrote, so this text is exactly what is on disk.
      const jsonOld = JSON.stringify(existing);
      const n = countOccurrences(out, jsonOld);
      if (n !== 1) { failures.push(`${job.label} ${where}: existing calc appears ${n} times — refusing to guess`); continue; }
      if (jsonOld === JSON.stringify(set.calc)) { unchanged.push(where); continue; }
      out = out.replace(jsonOld, () => JSON.stringify(set.calc));
      matched++;
      continue;
    }

    const old = fieldOf(obj.problems?.[set.p], set.after);
    if (typeof old !== 'string') { failures.push(`${job.label} ${where}: anchor field does not exist`); continue; }
    const jsonOld = JSON.stringify(old);
    const n = countOccurrences(out, jsonOld);
    if (n === 0) { failures.push(`${job.label} ${where}: anchor text not found`); continue; }
    if (n > 1) { failures.push(`${job.label} ${where}: anchor appears ${n} times — refusing to guess which problem`); continue; }
    out = out.replace(jsonOld, () => `${jsonOld}, ${fragment}`);
    matched++;
  }

  console.log(`${job.label}: ${matched} problem(s) to change${unchanged.length ? `, ${unchanged.length} already current` : ''}`);

  if (APPLY && matched) {
    try {
      JSON.parse(out);
    } catch (e) {
      failures.push(`${job.label}: produced invalid JSON (${e.message}) — NOT WRITTEN`);
      continue;
    }
    writeFileSync(job.file, out, 'utf8');
    const check = JSON.parse(readFileSync(job.file, 'utf8').replace(/^\uFEFF/, ''));
    for (const set of job.sets) {
      const got = check.problems?.[set.p]?.calc;
      if (!got || got.steps?.length !== set.calc.steps.length) failures.push(`${job.label} VERIFY FAILED P${set.p + 1}`);
    }
  }
  totalMatched += matched;
}

console.log(`\ntotal problems touched: ${totalMatched}`);
if (failures.length) {
  console.log(`\n!! PROBLEMS: ${failures.length}`);
  for (const f of failures) console.log(`   ${f}`);
  process.exitCode = 1;
} else if (APPLY) {
  console.log('APPLIED and verified');
} else {
  console.log('DRY RUN — re-run with --apply to write');
}
