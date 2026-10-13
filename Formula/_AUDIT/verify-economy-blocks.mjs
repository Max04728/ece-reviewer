import fs from 'node:fs';

// Recompute every numeric claim made in the Economy calculator blocks.
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
let pass = 0, fail = 0;
const chk = (name, got, want, tol) => {
  const ok = near(got, want, tol);
  ok ? pass++ : fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(58)} got=${Number(got.toFixed(8))}  want=${want}`);
};

// effective rate table
chk('eff 12% annual', (1 + 0.12 / 1) ** 1 - 1, 0.12);
chk('eff 12% semiannual', (1 + 0.12 / 2) ** 2 - 1, 0.1236, 1e-4);
chk('eff 12% quarterly', (1 + 0.12 / 4) ** 4 - 1, 0.12551, 1e-5);
chk('eff 12% monthly', (1 + 0.12 / 12) ** 12 - 1, 0.126825, 1e-6);
chk('eff 12% daily', (1 + 0.12 / 365) ** 365 - 1, 0.12748, 1e-5);
chk('eff 12% continuous', Math.exp(0.12) - 1, 0.127497, 1e-6);

// break-even
const FC = 100000, v = 40, p = 60;
chk('Q_BE = FC/(p-v)', FC / (p - v), 5000);
chk('sales BE = FC/(1-v/p)', FC / (1 - v / p), 300000);
chk('profit at Q=8000', (p - v) * 8000 - FC, 60000);
chk('target Q for profit 60000', (FC + 60000) / (p - v), 8000);

// indifference
const FA = 200000, FB = 120000, vA = 15, vB = 25;
chk('Q_indiff', (FA - FB) / (vB - vA), 8000);
// at indifference total costs equal
chk('TC equal at Q_indiff', FA + vA * 8000, FB + vB * 8000);

// DOL = Q(p-v) / (Q(p-v) - FC) = 8000*20 / (160000 - 100000) = 2.6667
chk('DOL at Q=8000', (8000 * (p - v)) / (8000 * (p - v) - FC), 8 / 3, 1e-9);

// EUAC forms agree
const P = 50000, S = 5000, i = 0.10, k = 5;
const AP = (i * (1 + i) ** k) / ((1 + i) ** k - 1);
const AF = i / ((1 + i) ** k - 1);
chk('EUAC form1 == form2', P * AP - S * AF, (P - S) * AP + S * i, 1e-9);
chk('A/P factor (10%,5)', AP, 0.263797, 1e-6);
chk('A/F factor (10%,5)', AF, 0.163797, 1e-6);

// CAPITALIZED: A/P and A/F relation
chk('A/F = A/P - i', AF, AP - i, 1e-12);

// EMV
chk('EMV', 0.3 * 100000 + 0.5 * 40000 + 0.2 * -20000, 46000);

// annuity: P/A and F/A
chk('P/A (8%,10)', (1 - 1.08 ** -10) / 0.08, 6.710081, 1e-6);
chk('F/A (8%,10)', (1.08 ** 10 - 1) / 0.08, 14.486562, 1e-6);

// PW via sum equals closed form
let pw = 0; const AA = 1000;
for (let t = 1; t <= 10; t++) pw += AA / 1.08 ** t;
chk('PW via sum == A(P/A)', pw, AA * ((1 - 1.08 ** -10) / 0.08), 1e-9);

// SLM / SYD
chk('SLM d (900,5)', 900 / 5, 180);
chk('SYD y1 (900,5)', 900 * 5 / 15, 300);

// --- Regression guard for the gradient block (review rounds 1 and 2) -------
// The block prints:  P/G = C * Sigma((X-1)/(1+A)^X, 1, B),  then A/G = (P/G)*(A/P).
// This test evaluates THE PRINTED EXPRESSION LITERALLY, so a wrong scaling
// factor cannot slip through by testing the algebra instead of the text.
{
  const G = 500, i2 = 0.08, n2 = 10;
  const A = i2, B = n2, C = G;                  // the letter assignments the block prescribes

  // literal transcription of:  C·Σ((X-1)/(1+A)^X, 1, B)
  let sigma = 0;
  for (let X = 1; X <= B; X++) sigma += (X - 1) / (1 + A) ** X;
  const PG_printed = C * sigma;

  // literal transcription of:  Ans·A/(1-(1+A)^-B)
  const AG_printed = PG_printed * (A / (1 - (1 + A) ** -B));

  // independent ground truth: closed forms and brute-force cash flows
  const bracket = (1 - (1 + i2) ** -n2) / i2 - n2 * (1 + i2) ** -n2;
  const PG_closed = G / i2 * bracket;
  let PG_brute = 0;
  for (let k = 1; k <= n2; k++) PG_brute += G * (k - 1) / (1 + i2) ** k;
  const AG_closed = G * ((1 / i2) - n2 / ((1 + i2) ** n2 - 1));

  chk('sigma value quoted in the block (25.976831)', sigma, 25.976831, 1e-6);
  chk('PRINTED P/G expression == closed form', PG_printed, PG_closed, 1e-9);
  chk('PRINTED P/G expression == brute force', PG_printed, PG_brute, 1e-9);
  chk('PRINTED P/G value (note quotes 12988.4157)', PG_printed, 12988.4157, 1e-4);
  chk('PRINTED A/G expression == closed form', AG_printed, AG_closed, 1e-9);
  chk('PRINTED A/G value (note quotes 1935.6570)', AG_printed, 1935.6570, 1e-4);

  // Every scaling variant that has actually been shipped must stay unequal.
  const defective = [
    ['v^n*i route (round 1)', G * (1 + i2) ** -n2 * i2],
    ['(C/A)*sigma route (round 2)', (C / A) * sigma],
    ['G*bracket route (missing 1/i)', G * bracket],
  ];
  for (const [label, v] of defective) {
    if (near(v, PG_closed, 1e-4)) { console.log(`FAIL  guard: ${label} equals correct P/G`); fail++; }
    else { console.log(`PASS  guard: ${label} = ${v.toFixed(4)} != ${PG_closed.toFixed(4)}`); pass++; }
  }
}

// --- Guard for STAT FREQ semantics (review W5) ----------------------------
// Weighted mean via sum f*x / sum f is only equal to the composite centroid
// when the weights behave as counts; assert the arithmetic identity holds
// and document that FREQ is a repeat count.
{
  const xs = [1, 4, 7], As = [2, 3, 5];
  const wm = xs.reduce((s, x, k) => s + x * As[k], 0) / As.reduce((a, b) => a + b, 0);
  chk('weighted mean (composite centroid)', wm, (1 * 2 + 4 * 3 + 7 * 5) / 10, 1e-12);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
