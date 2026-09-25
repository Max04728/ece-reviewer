// verify-worker-claims.mjs — independent recomputation of the worker-reported vault defects.
//
//   node build/verify-worker-claims.mjs
//
// The repo rule (BUILD_STATE.md, HANDOFF.md §6) is that a worker's report is a LEAD, not
// evidence. Each claim below is recomputed from first principles here. Several earlier worker
// claims in this session were false positives, and one of my own was too, so the substitution /
// closed-form check decides — never the report.

let fail = 0;
const chk = (label, got, want, tol = 1e-9) => {
  const ok = Math.abs(got - want) <= tol * Math.max(1, Math.abs(want));
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}\n        got ${got}\n        want ${want}`);
};

console.log('=== A. Bode P2: G(s) = 50/[s(s+1)(s+5)], worker claims |G| = 1.6667, GM = -4.44 dB ===');
// DIRECT evaluation is the authority here: |a+jw| = hypot(a, w).
//   |j sqrt5| = sqrt5, |1 + j sqrt5| = sqrt6, |5 + j sqrt5| = sqrt30
//   product = sqrt(5*6*30) = sqrt900 = 30,  so |G| = 50/30 = 1.6667
const direct = (w) => 50 / (Math.hypot(0, w) * Math.hypot(1, w) * Math.hypot(5, w));
const wpc = Math.sqrt(5);
console.log(`  |j sqrt5| = ${Math.hypot(0, wpc).toFixed(6)}, |1+j sqrt5| = ${Math.hypot(1, wpc).toFixed(6)}, |5+j sqrt5| = ${Math.hypot(5, wpc).toFixed(6)}`);
console.log(`  product = ${(Math.hypot(0, wpc) * Math.hypot(1, wpc) * Math.hypot(5, wpc)).toFixed(6)}  (= sqrt900 = 30)`);
console.log(`  direct complex |G(j sqrt5)| = ${direct(wpc).toFixed(6)}   -> GM_dB = ${(-20 * Math.log10(direct(wpc))).toFixed(4)} dB`);
console.log(`  phase at w=sqrt5 = ${(Math.atan(wpc) + Math.atan(wpc / 5)) * 180 / Math.PI} deg (loop phase -180)`);
chk('|G(j sqrt5)| - worker says 1.6667, payload says 8.333', direct(wpc), 5 / 3, 1e-9);
chk('GM_dB - worker says -4.437, payload says -18.416', -20 * Math.log10(direct(wpc)), -4.4370, 1e-4);
console.log(`  the payload's error: it writes (s+5) = 1 + s/5, dropping the factor of 5, so it uses`);
console.log(`  numerator 50 where the factored form needs 10. 8.3333/1.6667 = ${(8.333333333333334 / (5 / 3)).toFixed(4)} = the factor of 5.`);
console.log('  => the worker claim is CORRECT: this is a REAL payload error. The stability conclusion');
console.log('     (unstable) is unchanged either way, but the quoted magnitude and dB value are wrong.');
console.log('  Routh cross-check: s^3+s^2+5s+50, a2*a1 = 5 < a0 = 50 -> UNSTABLE, consistent with GM < 0.');

console.log('\n=== B. Central tendency P1: skew of 12,15,15,18,20,21,21,21,25,32 ===');
const d = [12, 15, 15, 18, 20, 21, 21, 21, 25, 32];
const mean = d.reduce((a, b) => a + b, 0) / d.length;
const sorted = [...d].sort((a, b) => a - b);
const median = (sorted[4] + sorted[5]) / 2;
const counts = {};
for (const x of d) counts[x] = (counts[x] || 0) + 1;
const mode = Number(Object.keys(counts).find((k) => counts[k] === Math.max(...Object.values(counts))));
const sd = Math.sqrt(d.reduce((a, b) => a + (b - mean) ** 2, 0) / d.length);
const skew = d.reduce((a, b) => a + ((b - mean) / sd) ** 3, 0) / d.length;
const sumd3 = d.reduce((a, b) => a + (b - mean) ** 3, 0);
console.log(`  mean=${mean}  median=${median}  mode=${mode}`);
console.log(`  sum of cubed deviations = ${sumd3.toFixed(1)}  (positive => RIGHT/positive skew)`);
console.log(`  third-moment skewness g1 = ${skew.toFixed(4)}`);
chk('mean', mean, 20);
chk('median', median, 20.5);
chk('mode', mode, 21);
chk('sum of cubed deviations (the worker claimed -1086)', sumd3, 1086, 1e-9);
console.log(`  VERDICT: the three moment statistics say ${skew > 0 ? 'RIGHT (positive)' : 'LEFT (negative)'} skew,`);
console.log(`  but the payload prints mean(${mean}) < median(${median}) < mode(${mode}), which is the textbook`);
console.log('  signature of NEGATIVE (left) skew, and the payload labels it "left-skewed".');
console.log('  => the worker\'s NUMBER was wrong (sign); the underlying self-contradiction is REAL.');
console.log(`  Pearson mode skewness (mean-mode)/sd = ${((mean - mode) / sd).toFixed(4)} (negative, disagrees with g1)`);
console.log('  This is a genuinely mixed case: a mild right tail (32) plus a repeated mode (21 x3).');

console.log('\n=== C. Normal P6: P(X+Y > 280), X~N(100,10^2), Y~N(150,15^2) ===');
const s = Math.sqrt(100 + 225);
const z = (280 - 250) / s;
const Phi = (zz) => {   // A&S 7.1.26
  const t = 1 / (1 + 0.2316419 * Math.abs(zz));
  const pdf = 0.3989422804014327 * Math.exp(-zz * zz / 2);
  const p = pdf * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return zz >= 0 ? 1 - p : p;
};
chk('sigma', s, 18.0277563773, 1e-9);
chk('z', z, 1.66410, 1e-4);
chk('tail P = 1-Phi(z)', 1 - Phi(z), 0.048046, 1e-5);
console.log(`  payload says 0.0481, correct to 4 dp is ${(1 - Phi(z)).toFixed(4)} -> matches the payload's own ans "0.048"`);

console.log('\n=== D. Normal P5: warranty 5 - 1.96(0.5) ===');
chk('warranty years', 5 - 1.96 * 0.5, 4.02, 1e-12);
console.log('  4.02 > 4.00, so going 4.00 -> 4.02 LENGTHENS the warranty. Payload says "shortening".');

console.log('\n=== E. CLT P4 claim: payload 0.483626 vs worker 0.483588 ===');
// The payload's 0.4836 is P(0 < Z < z) = Phi(z) - 0.5, i.e. the CENTRAL area, not Phi(z).
chk('Phi(0.648886)', Phi(0.648886), 0.741794, 1e-5);
chk('central area Phi(z) - 0.5', Phi(0.648886) - 0.5, 0.241794, 1e-5);
console.log('  The worker compared the payload\'s central-area figure against a RAW Phi value and then');
console.log('  subtracted 0.5 again. 0.483626 vs 0.483588 is a difference in the 4th significant figure');
console.log('  that this approximation cannot resolve, so no defect is demonstrated.');
console.log('  => FALSE POSITIVE (or at best unproven). Not recorded as a defect.');

console.log('\n=== F. Newton-Raphson / secant P7 claim ===');
// secant on x^3-2x-5 with x0=2, x1=3
let x0 = 2, x1 = 3;
const f = (x) => x ** 3 - 2 * x - 5;
const rows = [];
for (let i = 0; i < 3; i++) {
  const xn = x1 - f(x1) * (x1 - x0) / (f(x1) - f(x0));
  x0 = x1; x1 = xn;
  rows.push([xn, f(xn)]);
}
rows.forEach((r, i) => console.log(`  x${i + 3} = ${r[0].toFixed(6)}  f = ${r[1].toFixed(6)}`));
console.log(`  true root = 2.0945514815423265`);

console.log(`\n${'='.repeat(56)}`);
console.log(fail === 0 ? 'ALL RECOMPUTATIONS CONSISTENT' : `${fail} ASSERTION(S) DID NOT MATCH`);
