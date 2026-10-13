#!/usr/bin/env node
/**
 * verify-calc-techniques.mjs
 *
 * Ground-truth checker for the calculator-technique blocks added to the
 * Formula vaults.  Every numeric claim made in a `> [!example]` block is
 * reproduced here with plain floating-point arithmetic, so a technique that
 * silently disagrees with the note's own worked answer is caught.
 *
 * Read-only with respect to the notes.  Prints a PASS/FAIL table.
 *
 * Run:  node verify-calc-techniques.mjs
 */

const near = (a, b, tol = 5e-4) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const fmt = (x) => (Math.abs(x) >= 1e6 || (Math.abs(x) < 1e-3 && x !== 0)
  ? x.toExponential(6) : String(Number(x.toFixed(6))));

let pass = 0, fail = 0;
const rows = [];
function check(name, got, want, tol) {
  const ok = near(got, want, tol);
  ok ? pass++ : fail++;
  rows.push(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(62)} got=${fmt(got).padStart(16)}  want=${fmt(want).padStart(16)}`);
  return ok;
}

// =====================================================================
// A. Engineering Economy — annuity factors, the "one-line chain" claims
// =====================================================================
{
  // A1. Ordinary annuity: P = A[(1+i)^n - 1]/(i(1+i)^n)
  const A = 1000, i = 0.08, n = 10;
  const P = A * ((1 + i) ** n - 1) / (i * (1 + i) ** n);
  check('annuity P given A (1000, 8%, 10)', P, 6710.081, 1e-5);
  check('annuity P via (1-(1+i)^-n)/i', A * (1 - (1 + i) ** -n) / i, P, 1e-9);

  // A2. F given A
  const F = A * ((1 + i) ** n - 1) / i;
  check('annuity F given A (1000, 8%, 10)', F, 14486.5625, 1e-6);
  check('F = P(1+i)^n consistency', P * (1 + i) ** n, F, 1e-9);

  // A3. A given P (capital recovery)
  const Acalc = 100000 * (i * (1 + i) ** n) / ((1 + i) ** n - 1);
  check('A given P=100000 (8%,10)', Acalc, 14902.9497, 1e-6);

  // A4. Summation identity: the annuity factor IS a geometric sum
  let s = 0;
  for (let k = 1; k <= n; k++) s += 1 / (1 + i) ** k;
  check('sum_{k=1..10} v^k == (1-(1+i)^-n)/i', s, (1 - (1 + i) ** -n) / i, 1e-12);

  // A5. Annuity due = ordinary x (1+i)
  check('P_due = P_ord*(1+i)', P * (1 + i), 7246.8875, 1e-6);

  // A6. Perpetuity
  check('perpetuity P = A/i (1000, 8%)', A / i, 12500, 1e-12);

  // A7. Capitalized cost  CC = FC + A/i
  check('CC = 50000 + 4000/0.08', 50000 + 4000 / 0.08, 100000, 1e-12);

  // A8. Arithmetic gradient P/G factor
  const G = 500;
  const PG = G / i * ((1 + i) ** n - 1) / (i * (1 + i) ** n) - G * n / (i * (1 + i) ** n);
  // independent: sum of G*(k-1)*v^k
  let pg = 0;
  for (let k = 1; k <= n; k++) pg += G * (k - 1) / (1 + i) ** k;
  check('arithmetic gradient P/G (500,8%,10)', PG, pg, 1e-9);
  check('arithmetic gradient P/G value', pg, 12988.415738, 1e-6);

  // A9. Capital recovery + gradient equivalence
  const AG = (1 / i) - n / ((1 + i) ** n - 1);
  check('A/G factor (8%,10)', AG, 3.8713, 1e-4);

  // A10. Geometric gradient
  const A1 = 1000, g = 0.05;
  const Pg = A1 * (1 - ((1 + g) / (1 + i)) ** n) / (i - g);
  let pg2 = 0;
  for (let k = 1; k <= n; k++) pg2 += A1 * (1 + g) ** (k - 1) / (1 + i) ** k;
  check('geometric gradient P (1000,g=5%,i=8%,10)', Pg, pg2, 1e-9);

  // A11. Effective rate
  check('i_eff (12% nominal, monthly)', (1 + 0.12 / 12) ** 12 - 1, 0.126825, 1e-6);
  check('i_eff continuous e^0.12 - 1', Math.exp(0.12) - 1, 0.127497, 1e-6);

  // A12. Solve for n: n = ln[A/(A-Pi)]/ln(1+i)
  const P0 = 10000, A0 = 2000, i0 = 0.10;
  const nSolve = Math.log(A0 / (A0 - P0 * i0)) / Math.log(1 + i0);
  // verify by plugging back
  const Pback = A0 * (1 - (1 + i0) ** -nSolve) / i0;
  check('unknown-n formula reproduces P', Pback, P0, 1e-9);
}

// =====================================================================
// B. Regression mode reproduces least squares (the STAT trick)
// =====================================================================
{
  // B1. Two-point line: regression through (1,3),(2,5) -> y = 2x + 1
  const pts = [[1, 3], [2, 5], [3, 7], [4, 9]];
  const n = pts.length;
  const sx = pts.reduce((a, p) => a + p[0], 0);
  const sy = pts.reduce((a, p) => a + p[1], 0);
  const sxy = pts.reduce((a, p) => a + p[0] * p[1], 0);
  const sxx = pts.reduce((a, p) => a + p[0] ** 2, 0);
  const b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const a = (sy - b * sx) / n;
  check('regression slope on exact line', b, 2, 1e-12);
  check('regression intercept on exact line', a, 1, 1e-12);

  // B2. The regression trick for a 2x2 linear system:
  //     2x + 3y = 13 ;  4x - y = 5   ->  x = 2, y = 3
  // Recast: the line y = m*x + c through (2,3)&(4,-1) is NOT the system.
  // The correct trick: enter the TWO equations as data pairs of (a, b) with
  // result c, i.e. solve a1 x + b1 y = c1 by regressing (b1, c1) vs a1.
  // Verified here as: solve exactly.
  const A2 = [[2, 3], [4, -1]], B2 = [13, 5];
  const det = A2[0][0] * A2[1][1] - A2[0][1] * A2[1][0];
  const xs = (B2[0] * A2[1][1] - A2[0][1] * B2[1]) / det;
  const ys = (A2[0][0] * B2[1] - B2[0] * A2[1][0]) / det;
  check('2x2 system x', xs, 2, 1e-12);
  check('2x2 system y', ys, 3, 1e-12);
  // and confirm each equation holds
  check('eq1 residual 2x+3y', 2 * xs + 3 * ys, 13, 1e-12);
  check('eq2 residual 4x-y', 4 * xs - ys, 5, 1e-12);

  // B3. 3x3 system via Cramer (what MODE 5 / matrix inverse returns)
  //     x +  y +  z = 6 ; 2x - y + z = 3 ; x + 2y - z = 2
  const M = [[1, 1, 1], [2, -1, 1], [1, 2, -1]], V = [6, 3, 2];
  const det3 = (m) =>
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  const col = (m, k, v) => m.map((row, r) => row.map((c, j) => (j === k ? v[r] : c)));
  const D = det3(M);
  const x3 = det3(col(M, 0, V)) / D, y3 = det3(col(M, 1, V)) / D, z3 = det3(col(M, 2, V)) / D;
  check('3x3 Cramer x', x3, 1, 1e-9);
  check('3x3 Cramer y', y3, 2, 1e-9);
  check('3x3 Cramer z', z3, 3, 1e-9);
  check('3x3 residual row 2', 2 * x3 - y3 + z3, 3, 1e-9);

  // B4. Exponential fit y = a*b^x via regression on (x, ln y)
  //     data: (1,2),(2,4),(3,8) -> a=1, b=2  since ln y = ln a + x ln b
  const dp = [[1, Math.log(2)], [2, Math.log(4)], [3, Math.log(8)]];
  const m = dp.length;
  const Sx = dp.reduce((s, p) => s + p[0], 0), Sy = dp.reduce((s, p) => s + p[1], 0);
  const Sxy = dp.reduce((s, p) => s + p[0] * p[1], 0), Sxx = dp.reduce((s, p) => s + p[0] ** 2, 0);
  const slope = (m * Sxy - Sx * Sy) / (m * Sxx - Sx * Sx);
  const inter = (Sy - slope * Sx) / m;
  check('exp fit b = e^slope', Math.exp(slope), 2, 1e-9);
  check('exp fit a = e^intercept', Math.exp(inter), 1, 1e-9);

  // B5. Power fit y = a*x^b via regression on (ln x, ln y)
  const pp = [[1, 3], [2, 12], [3, 27]]; // y = 3x^2
  const lp = pp.map(([x, y]) => [Math.log(x), Math.log(y)]);
  const k = lp.length;
  const px = lp.reduce((s, p) => s + p[0], 0), py = lp.reduce((s, p) => s + p[1], 0);
  const pxy = lp.reduce((s, p) => s + p[0] * p[1], 0), pxx = lp.reduce((s, p) => s + p[0] ** 2, 0);
  const sl2 = (k * pxy - px * py) / (k * pxx - px * px);
  const in2 = (py - sl2 * px) / k;
  check('power fit exponent b', sl2, 2, 1e-9);
  check('power fit coefficient a', Math.exp(in2), 3, 1e-9);
}

// =====================================================================
// C. Summation mode: series the calculator can total directly
// =====================================================================
{
  // C1. Arithmetic series sum
  let s1 = 0; for (let k = 1; k <= 100; k++) s1 += k;
  check('sum 1..100', s1, 5050, 1e-12);

  // C2. Geometric series
  let s2 = 0; for (let k = 0; k <= 20; k++) s2 += 3 * 2 ** k;
  check('sum 3*2^k, k=0..20', s2, 3 * (2 ** 21 - 1), 1e-9);

  // C3. Power sums used by SYD / regression shortcuts
  let s3 = 0; for (let k = 1; k <= 10; k++) s3 += k * k;
  check('sum k^2, 1..10 == n(n+1)(2n+1)/6', s3, 10 * 11 * 21 / 6, 1e-12);

  // C4. SYD denominator = sum_{k=1..n} k
  check('SOY n=5', 5 * 6 / 2, 15, 1e-12);

  // C5. Series convergence check: sum 1/k^2 -> pi^2/6
  let s5 = 0; for (let k = 1; k <= 100000; k++) s5 += 1 / (k * k);
  check('sum 1/k^2 (1e5 terms) ~ pi^2/6', s5, Math.PI ** 2 / 6, 1e-5);

  // C6. Riemann sum for an integral (numerical integration check)
  const f = (x) => x * x;
  const N = 100000, a0 = 0, b0 = 3, h = (b0 - a0) / N;
  let rs = 0; for (let k = 0; k < N; k++) rs += f(a0 + (k + 0.5) * h) * h;
  check('midpoint Riemann sum of x^2 on [0,3]', rs, 9, 1e-6);

  // C7. Depreciation schedule sums (DDB book value)
  const FC = 10000, nn = 5;
  let bv = FC;
  const ddbs = [];
  for (let kk = 1; kk <= nn; kk++) { const d = (2 / nn) * bv; bv -= d; ddbs.push([d, bv]); }
  check('DDB year1 charge', ddbs[0][0], 4000, 1e-9);
  check('DDB year2 charge', ddbs[1][0], 2400, 1e-9);
  check('DDB year5 BV', ddbs[4][1], 777.6, 1e-6);
  check('DDB BV formula FC(1-2/n)^5', FC * (1 - 2 / nn) ** nn, 777.6, 1e-6);

  // C8. SYD claims made in the Engineering Economy block
  let soy = 0; for (let k = 1; k <= 5; k++) soy += k;
  check('SOY = sum k, n=5', soy, 15, 1e-12);
  let cum = 0; for (let j = 1; j <= 2; j++) cum += (5 - j + 1);
  check('cumulative SYD numerator k=2, n=5', cum, 9, 1e-12);
  check('SYD year-1 charge (base 900)', 900 * 5 / 15, 300, 1e-9);
  check('SYD year-5 charge (base 900)', 900 * 1 / 15, 60, 1e-9);

  // C9. Capitalized cost with periodic renewal: A + B/((1+i)^k - 1)
  check('CC periodic k=1 reduces to A+B/i', 50000 + 4000 / ((1.08) ** 1 - 1), 50000 + 4000 / 0.08, 1e-9);
}

// =====================================================================
// D. SOLVE / back-substitution: roots and implicit equations
// =====================================================================
{
  // D1. Newton's method reaches the same root the calculator's SOLVE reports
  const f = (x) => x ** 3 - 2 * x - 5;
  const df = (x) => 3 * x ** 2 - 2;
  let x = 2;
  for (let k = 0; k < 60; k++) x = x - f(x) / df(x);
  check('root of x^3-2x-5', x, 2.0945514815, 1e-9);
  check('residual at that root', f(x), 0, 1e-9);

  // D2. IRR is the root of the PW equation; reproduce by bisection
  const cf = [-1000, 300, 400, 500];
  const pw = (r) => cf.reduce((s, c, t) => s + c / (1 + r) ** t, 0);
  let lo = -0.9, hi = 5;
  for (let k = 0; k < 300; k++) { const mid = (lo + hi) / 2; if (pw(mid) > 0) lo = mid; else hi = mid; }
  const irr = (lo + hi) / 2;
  check('IRR of (-1000,300,400,500)', irr, 0.088963, 1e-4);
  check('PW at solved IRR ~ 0', pw(irr), 0, 1e-8);

  // D3. Interest rate implied by an annuity (SOLVE target)
  const P1 = 50000, A1s = 8000, n1 = 10;
  const g = (i) => A1s * (1 - (1 + i) ** -n1) / i - P1;
  let l2 = 1e-6, h2 = 1;
  for (let k = 0; k < 300; k++) { const mid = (l2 + h2) / 2; if (g(mid) > 0) l2 = mid; else h2 = mid; }
  const ir = (l2 + h2) / 2;
  check('rate for P=50000,A=8000,n=10', ir, 0.096059, 1e-4);
}

// =====================================================================
// E. Choice back-substitution: testing options is exact for identities
// =====================================================================
{
  // E1. Roots of a quadratic — plug each candidate back
  const q = (x) => 2 * x ** 2 - 7 * x + 3;
  const r1 = 3, r2 = 0.5;
  check('quadratic root 3', q(r1), 0, 1e-12);
  check('quadratic root 0.5', q(r2), 0, 1e-12);
  check('sum of roots = -b/a', r1 + r2, 7 / 2, 1e-12);
  check('product of roots = c/a', r1 * r2, 3 / 2, 1e-12);

  // E2. A definite integral via the antiderivative (choice-checking)
  const F = (x) => x ** 3 / 3 - x;
  check('int (x^2-1) from 0 to 2', F(2) - F(0), 2 / 3, 1e-12);

  // E3. Numerical derivative at a point (CALC/d/dx check)
  const hh = 1e-6, xv = 1;
  const num = (Math.sin(xv + hh) - Math.sin(xv - hh)) / (2 * hh);
  check('d/dx sin x at 1', num, Math.cos(1), 1e-9);

  // E4. Numerical integral of sin on [0,pi] == 2
  let si = 0; const M2 = 200000, h3 = Math.PI / M2;
  for (let k = 0; k < M2; k++) si += Math.sin((k + 0.5) * h3) * h3;
  check('int sin x on [0,pi]', si, 2, 1e-9);

  // E5. Limit check by table of values
  const limf = (x) => Math.sin(3 * x) / x;
  check('sin(3x)/x at x=1e-7 ~ 3', limf(1e-7), 3, 1e-6);
}

// =====================================================================
// F. Complex / phasor mode results
// =====================================================================
{
  const re = (z) => z.re, im = (z) => z.im;
  const mul = (a, b) => ({ re: re(a) * re(b) - im(a) * im(b), re2: 0, im: re(a) * im(b) + im(a) * re(b) });
  const Z1 = { re: 3, im: 4 }, Z2 = { re: 1, im: -2 };
  const prod = mul(Z1, Z2);
  check('(3+4j)(1-2j) real', prod.re, 11, 1e-12);
  check('(3+4j)(1-2j) imag', prod.im, -2, 1e-12);
  check('|3+4j|', Math.hypot(3, 4), 5, 1e-12);
  check('arg(3+4j) deg', Math.atan2(4, 3) * 180 / Math.PI, 53.130102, 1e-6);

  // Parallel impedance — the classic Pol/Rec use
  const Rp = 4, Xp = 3;              // 4 + j3
  const num = { re: Rp, im: Xp };
  const den = { re: 5, im: -6 };
  const denMag2 = 5 ** 2 + (-6) ** 2;
  const zre = (num.re * den.re + num.im * den.im) / denMag2;
  const zim = (num.im * den.re - num.re * den.im) / denMag2;
  check('(4+j3)/(5-j6) real', zre, (4 * 5 + 3 * -6) / 61, 1e-12);
  check('(4+j3)/(5-j6) imag', zim, (3 * 5 - 4 * -6) / 61, 1e-12);
}

// =====================================================================
// G. Numerical methods the calculator can shortcut
// =====================================================================
{
  // G1. Trapezoidal rule
  const f = (x) => 1 / (1 + x * x);
  const n = 8, a = 0, b = 1, h = (b - a) / n;
  let T = f(a) + f(b);
  for (let k = 1; k < n; k++) T += 2 * f(a + k * h);
  T *= h / 2;
  check('trapezoid n=8 on 1/(1+x^2) [0,1]', T, 0.784747, 1e-6);

  // G2. Simpson 1/3
  let S = f(a) + f(b);
  for (let k = 1; k < n; k++) S += (k % 2 ? 4 : 2) * f(a + k * h);
  S *= h / 3;
  check('Simpson n=8 on 1/(1+x^2) [0,1]', S, 0.785398, 1e-6);
  check('pi/4', Math.PI / 4, 0.785398, 1e-6);

  // G3. Lagrange/Newton interpolation through known points
  const pts = [[0, 1], [1, 3], [2, 9]];
  const L = (x) => pts.reduce((s, [xi, yi]) => {
    let t = 1;
    for (const [xj] of pts) if (xj !== xi) t *= (x - xj) / (xi - xj);
    return s + yi * t;
  }, 0);
  check('Lagrange through (0,1),(1,3),(2,9) at x=1', L(1), 3, 1e-12);
  check('same at x=0.5', L(0.5), 1.5, 1e-12);

  // G4. Newton-Raphson on a transcendental equation (SOLVE's job)
  const ff = (x) => Math.exp(-x) - x, dff = (x) => -Math.exp(-x) - 1;
  let xr = 0.5;
  for (let k = 0; k < 50; k++) xr = xr - ff(xr) / dff(xr);
  check('root of e^-x = x', xr, 0.5671432904, 1e-9);

  // G5. Matrix inverse / determinant path for a 2x2
  const A = [[4, 7], [2, 6]];
  const d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  check('det [[4,7],[2,6]]', d, 10, 1e-12);
  const inv = [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
  check('A*A^-1 = I (1,1)', A[0][0] * inv[0][0] + A[0][1] * inv[1][0], 1, 1e-12);
  check('A*A^-1 = I (1,2)', A[0][0] * inv[0][1] + A[0][1] * inv[1][1], 0, 1e-12);
}

console.log(rows.join('\n'));
console.log(`\n${pass} passed, ${fail} failed  (${pass + fail} checks)`);
process.exit(fail === 0 ? 0 : 1);
