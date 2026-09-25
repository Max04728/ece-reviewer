// verify-crash-review.mjs — independent numeric spot-checks for the Math Crash Review note.
//
//   node build/verify-crash-review.mjs
//
// WHY: `verify.mjs` proves structure, links and tiers — it cannot tell a right number from a
// wrong one (see build/README.md). Every value asserted in the crash review is recomputed here
// from first principles, so a claim can be checked against something other than itself.
//
// Each check prints PASS/FAIL against an independently known value. A FAIL is a real defect.

const PI = Math.PI;

// --- constants -------------------------------------------------------------
const eps0 = 8.8541878128e-12;   // F/m
const mu0 = 4 * PI * 1e-7;       // H/m  (exact by SI definition, pre-2019)
const c0 = 1 / Math.sqrt(eps0 * mu0);

let fail = 0;
const close = (label, got, want, relTol = 5e-3) => {
  const ok = Math.abs(got - want) <= Math.abs(want) * relTol + 1e-12;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${got}  want ${want}`);
};
const exact = (label, got, want) => {
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${got}  want ${want}`);
};

console.log('--- 1. fundamental constants ---');
close('c0 = 1/sqrt(eps0*mu0)  (m/s)', c0, 2.99792458e8, 1e-6);
close('Z0 = sqrt(mu0/eps0)  (ohm)', Math.sqrt(mu0 / eps0), 376.730313668, 1e-6);
exact('mu0 == 4pi e-7', mu0, 4 * PI * 1e-7);

console.log('\n--- 2. parallel-plate capacitance: C = eps0*A/d ---');
// A = 0.5 m^2, d = 1 mm  ->  the vault's own worked example claims 4.43 nF
const C_pp = (eps0 * 0.5) / 1e-3;
close('C = 4.43 nF for A=0.5 m^2, d=1 mm', C_pp * 1e9, 4.43, 1e-3);

console.log('\n--- 3. coaxial capacitance per metre: C = 2*pi*eps0/ln(b/a) ---');
// a = 1 mm, b = 5 mm  ->  2pi*eps0/ln 5 = 34.57 pF/m.
// (An earlier draft of THIS check expected 86.5 pF/m; that value belongs to a ratio of about
//  e^(2pi*eps0/86.5e-12) ~ 1.9 (b/a ~ 2), not b/a = 5. The check was wrong, not the vault.)
const C_coax = (2 * PI * eps0) / Math.log(5 / 1);
close("C' pF/m for a=1mm b=5mm", C_coax * 1e12, 34.57, 1e-3);
// anchor the reference value independently: b/a = e^(2pi*eps0/86.5pF)
close('b/a implied by 86.5 pF/m', Math.exp((2 * PI * eps0) / 86.5e-12), 1.9, 5e-3);

console.log('\n--- 4. solenoid inductance: L = mu0*N^2*A/l ---');
// N = 1000, A = 1e-4 m^2, l = 0.1 m -> 4*pi*1e-7*1e6*1e-4/0.1 = 1.2566 mH
const L_sol = (mu0 * 1000 * 1000 * 1e-4) / 0.1;
close('L mH for N=1000, A=1cm^2, l=10cm', L_sol * 1e3, 1.2566, 1e-3);

console.log('\n--- 5. skin depth: delta = 1/sqrt(pi*f*mu*sigma) ---');
// copper sigma = 5.8e7 S/m, f = 1 MHz -> delta ~ 66.1 um
const sigmaCu = 5.8e7;
const delta = 1 / Math.sqrt(PI * 1e6 * mu0 * sigmaCu);
close('copper skin depth at 1 MHz (um)', delta * 1e6, 66.1, 5e-3);
// scaling check: delta(4f) = delta(f)/2
close('delta scales as 1/sqrt(f)', delta / (1 / Math.sqrt(PI * 4e6 * mu0 * sigmaCu)), 2, 1e-9);

console.log('\n--- 6. second-order control specs ---');
const zeta = 0.5, wn = 4;         // rad/s
const Mp = Math.exp((-PI * zeta) / Math.sqrt(1 - zeta ** 2));
close('Mp for zeta=0.5 (fraction)', Mp, 0.1630, 5e-3);
close('Mp for zeta=0.5 (%)', Mp * 100, 16.30, 5e-3);
close('tp = pi/(wn*sqrt(1-zeta^2))', PI / (wn * Math.sqrt(1 - zeta ** 2)), 0.9069, 1e-3);
close('ts (2%) = 4/(zeta*wn)', 4 / (zeta * wn), 2.0, 1e-9);
close('ts (5%) = 3/(zeta*wn)', 3 / (zeta * wn), 1.5, 1e-9);
// zeta for 10% overshoot: zeta = |ln Mp| / sqrt(pi^2 + ln^2 Mp)
const zFor = (m) => Math.abs(Math.log(m)) / Math.sqrt(PI ** 2 + Math.log(m) ** 2);
close('zeta for 10% overshoot', zFor(0.10), 0.5912, 1e-3);
close('zeta for 16.3% overshoot', zFor(0.1630), 0.5, 2e-3);

console.log('\n--- 7. Routh-Hurwitz specific case ---');
// For s^3 + a s^2 + b s + c the array is built explicitly:
//   s^3 | 1   b
//   s^2 | a   c
//   s^1 | (a*b - c)/a      0
//   s^0 | c                0
// For s^3 + 6s^2 + 11s + 6 = (s+1)(s+2)(s+3) all roots are negative, so every first-column
// entry must be positive and the sign-change count must be 0.
const routh3 = (a, b, c) => [
  [1, b],
  [a, c],
  [(a * b - c) / a, 0],
  [c, 0],
];
const R = routh3(6, 11, 6);
console.log(`  Routh array: ${R.map((r) => `[${r.join(', ')}]`).join(' ')}`);
exact('Routh row s^3 col0', R[0][0], 1);
exact('Routh row s^2 col0', R[1][0], 6);
close('Routh b1 = (6*11 - 6)/6', R[2][0], 10, 1e-12);
close('Routh c1 (s^0 row) = 6', R[3][0], 6, 1e-12);
// first-column sign changes == number of RHP roots; this polynomial has none
const firstCol = R.map((r) => r[0]);
let signChanges = 0;
for (let i = 1; i < firstCol.length; i++) if (Math.sign(firstCol[i]) !== Math.sign(firstCol[i - 1])) signChanges++;
exact('Routh sign changes (unstable roots)', signChanges, 0);
// and the classic instability case: s^3 + s^2 + 2s + 8 has two RHP roots (sign changes = 2)
const Rbad = routh3(1, 2, 8);
console.log(`  unstable array: ${Rbad.map((r) => `[${r.join(', ')}]`).join(' ')}`);
let sc2 = 0;
for (let i = 1; i < Rbad.length; i++) if (Math.sign(Rbad[i][0]) !== Math.sign(Rbad[i - 1][0])) sc2++;
exact('sign changes for s^3+s^2+2s+8 (2 RHP roots)', sc2, 2);

console.log('\n--- 8. numerical integration on int_0^1 e^x dx = e-1 = 1.718281828... ---');
// These are APPROXIMATIONS, so the assertion is that each lands within its own known error
// bound, not that it equals e-1. Tolerances are set from the standard error formulas:
//   trapezoidal |E| <= (b-a)h^2/12 * max|f''| = (1)(0.0625)/12 * e = 0.01416
//   Simpson 1/3 (n=4) is exact for cubics, so its error is already ~1e-5
//   Simpson 3/8 (n=3) likewise
const f = (x) => Math.exp(x);
const exactVal = Math.E - 1;
const h = 0.25;
let trap = (f(0) + f(1)) / 2;
for (let i = 1; i < 4; i++) trap += f(i * h);
trap *= h;
const trapBound = ((1 - 0) * h ** 2 / 12) * Math.E;
close('trapezoidal n=4 (within error bound)', trap, exactVal, trapBound / exactVal);
// Simpson 1/3, n=4 (even) : (h/3)[f0 + 4(f1+f3) + 2 f2 + f4]
const simp = (h / 3) * (f(0) + 4 * (f(h) + f(3 * h)) + 2 * f(2 * h) + f(1));
close('Simpson 1/3 n=4 (near-exact)', simp, exactVal, 5e-5);
// Simpson 3/8 over n=3: (3h/8)[f0 + 3(f1+f2) + f3]
const h3 = 1 / 3;
const simp38 = ((3 * h3) / 8) * (f(0) + 3 * (f(h3) + f(2 * h3)) + f(1));
close('Simpson 3/8 n=3 (near-exact)', simp38, exactVal, 2e-4);
// and confirm Simpson beats trapezoidal here, which is the exam point
console.log(`  trapezoidal error ${Math.abs(trap - exactVal).toExponential(3)} vs Simpson error ${Math.abs(simp - exactVal).toExponential(3)}`);

console.log('\n--- 9. Newton-Raphson on x^3 - 2x - 5 = 0 (root 2.0945514815...) ---');
let x = 2;
for (let i = 0; i < 4; i++) x = x - (x ** 3 - 2 * x - 5) / (3 * x ** 2 - 2);
close('NR after 4 iterations', x, 2.0945514815, 1e-9);

console.log('\n--- 10. RK4 on y\' = y, y(0)=1, h=0.1 -> y(0.1) = e^0.1 ---');
const k1 = 1, k2 = 1 + 0.05 * k1, k3 = 1 + 0.05 * k2, k4 = 1 + 0.1 * k3;
const y1 = 1 + (0.1 / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
close('RK4 one step', y1, Math.exp(0.1), 1e-7);

console.log('\n--- 11. normal distribution (uses the same tail values a table gives) ---');
// Abramowitz-Stegun 7.1.26 error-function approximation, |eps| < 1.5e-7
const Phi = (z) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z >= 0 ? 1 - p : p;
};
close('P(Z < 1.96)', Phi(1.96), 0.975, 1e-4);
close('P(Z < 1.645)', Phi(1.645), 0.95, 1e-3);
close('P(Z < 2.576)', Phi(2.576), 0.995, 1e-3);
close('P(-1 < Z < 1)', Phi(1) - Phi(-1), 0.6827, 2e-3);
close('P(-2 < Z < 2)', Phi(2) - Phi(-2), 0.9545, 1e-3);
close('P(-3 < Z < 3)', Phi(3) - Phi(-3), 0.9973, 5e-4);

console.log('\n--- 12. counting and distributions ---');
const fact = (n) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
const nCr = (n, r) => fact(n) / (fact(r) * fact(n - r));
exact('C(10,3)', nCr(10, 3), 120);
exact('C(5,2)*C(7,3)', nCr(5, 2) * nCr(7, 3), 350);
exact('P(6,3)', fact(6) / fact(3), 120);
// binomial n=10 p=0.5, P(X=5) = 252/1024
close('Binomial P(X=5), n=10 p=0.5', nCr(10, 5) * 0.5 ** 10, 252 / 1024, 1e-12);
// Poisson lambda=3, P(X=0) = e^-3
close('Poisson P(X=0), lambda=3', Math.exp(-3), 0.049787, 1e-5);

console.log('\n--- 13. Laplace / Fourier anchors ---');
close('L{sin(3t)} at s=2 -> 3/(4+9)', 3 / (2 ** 2 + 3 ** 2), 3 / 13, 1e-12);
// e^{-at} f(t) shifting: L{e^{-2t} sin 3t} = 3/((s+2)^2+9); at s=0 -> 3/13
close('L{e^-2t sin3t}(s=0)', 3 / ((0 + 2) ** 2 + 9), 3 / 13, 1e-12);
// square wave Fourier b_n = 4/(n pi)
close('b1 of unit square wave', 4 / (1 * PI), 1.27324, 1e-5);
close('b3 of unit square wave', 4 / (3 * PI), 0.42441, 1e-5);
// Parseval check on the square wave: sum of 4/(n pi)^2 over odd n, times 1/2, -> 1
let P = 0;
for (let n = 1; n < 200000; n += 2) P += 0.5 * (4 / (n * PI)) ** 2;
close('Parseval sum for unit square wave -> 1', P, 1, 2e-5);

console.log('\n--- 14. IQR / dispersion (fence convention used by the note) ---');
// n = 10 values. Under the linear-interpolation ("type 7") convention the positions are
// h = (n-1)p: n=10 => Q1 at position 2.25 and Q3 at position 6.75.
const data = [12, 15, 18, 20, 22, 25, 28, 30, 35, 42];
const q = (arr, p) => {          // linear interpolation between closest ranks (type 7)
  const s = [...arr].sort((a, b) => a - b);
  const h = (s.length - 1) * p;
  const lo = Math.floor(h), hi = Math.ceil(h);
  return s[lo] + (h - lo) * (s[hi] - s[lo]);
};
const q1 = q(data, 0.25), q3 = q(data, 0.75);
console.log(`  Q1=${q1}  Q3=${q3}  IQR=${q3 - q1}  upper fence=${q3 + 1.5 * (q3 - q1)}`);
exact('Q1 (type 7, position 2.25)', q1, 18.5);
exact('Q3 (type 7, position 6.75)', q3, 29.5);
exact('IQR (type 7)', q3 - q1, 11);
// The convention matters, which is the trap: the "median of halves" (Moore-McCabe) convention
// on the same data gives a different IQR, so a problem must state which one it uses.
const lower = [12, 15, 18, 20, 22], upper = [25, 28, 30, 35, 42];
const q1m = q(lower, 0.5), q3m = q(upper, 0.5);
console.log(`  median-of-halves: Q1=${q1m}  Q3=${q3m}  IQR=${q3m - q1m}  upper fence=${q3m + 1.5 * (q3m - q1m)}`);
exact('Q1 (median-of-halves)', q1m, 18);
exact('Q3 (median-of-halves)', q3m, 30);

console.log('\n--- 15. vector calculus identity check (numeric, one point) ---');
// For F = (x^2 y, y^2 z, z^2 x) at (1,2,3): div F = 2xy + 2yz + 2zx
const divF = 2 * 1 * 2 + 2 * 2 * 3 + 2 * 3 * 1;
exact('div F at (1,2,3)', divF, 4 + 12 + 6);

console.log(`\n${'='.repeat(56)}`);
console.log(fail === 0 ? 'ALL CRASH-REVIEW CHECKS PASSED' : `${fail} CHECK(S) FAILED`);
if (fail) process.exitCode = 1;
