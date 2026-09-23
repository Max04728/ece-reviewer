---
title: "Engineering Economy — Drill"
type: drill
area: 05_Engineering_Economy
part: 03_GEAS
seed: 1
count: 8
pool: 69
updated: 2026-09-23
---

# Engineering Economy — Practice Drill

**8 problems** drawn from a pool of 69 across 13 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 05_Engineering_Economy --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A contract pays ₱10,000 at the end of each year for 8 years, but the first payment is delayed to the end of year 4. Find the present worth at 12% compounded annually.

**Given:** $A = 10000$; $n = 8$ payments; $k = 3$ periods deferred; $i = 0.12$

> [!success]- Answer
> **$P \approx 35359$ (₱35,358.7).**

> [!warning] Trap
> Discounting over 4 periods because the first payment arrives at the end of year 4. The annuity factor already stops one period before the first payment, so the deferral is k = 3; using 4 gives ₱31,570, which is 12% too low.

<sub>from GEAS-05-04</sub>

### 2. Using marginal cost, verify the economic life found in the previous problem.

**Given:** $MV = 1000000, 700000, 500000, 350000$; $O\&M = 100000, 200000, 300000$; $i = 0.10$

> [!success]- Answer
> **Economic life = 2 years, confirmed: the marginal cost crosses the average between years 2 and 3.**

> [!warning] Trap
> Stopping as soon as the marginal cost rises. The rule is to keep while MC < EUAC, so year 3 is rejected at ₱500,000 against ₱485,714 — a ₱14,286 gap, not a comparison against the year-1 figure.

<sub>from GEAS-05-13</sub>

### 3. A ₱500,000 loan is to be repaid in 5 equal end-of-year payments at 12% compounded annually. Find the annual payment.

**Given:** P = ₱500,000; n = 5 years; i = 12% per year; end-of-year payments

> [!success]- Answer
> **₱138,704.87 per year ($5 \times 138{,}704.87 = 693{,}524.35$ total, of which ₱193,524.35 is interest)**

> [!warning] Trap
> Dividing ₱500,000 by 5 and answering ₱100,000. That ignores interest entirely; the correct payment is nearly 39% larger.

<sub>from GEAS-05-03</sub>

### 4. For the same machine, use the sum-of-years-digits method to find the depreciation in each of the first 3 years and the book value after 3 years.

**Given:** $FC = 1200000$; $SV = 120000$; $n = 8$ years; SYD

> [!success]- Answer
> **Year 1 ₱240,000; year 2 ₱210,000; year 3 ₱180,000; $BV_3 = 570000$.**

> [!warning] Trap
> Applying the SYD fraction to the full first cost, 1200000(8/36) = ₱266,667 in year 1. The salvage value must be removed first: SYD allocates FC - SV, not FC.

<sub>from GEAS-05-10</sub>

### 5. An asset costs ₱800,000 with a 4-year life and a ₱100,000 salvage value. Find the book value after 3 years under DDB, respecting the salvage floor, and state the year-4 charge.

**Given:** $FC = 800000$; $n = 4$; $SV = 100000$; DDB with floor

> [!success]- Answer
> **$BV_3 = 100000$; the year-4 depreciation charge is zero.**

> [!warning] Trap
> Charging ₱50,000 in year 4 and reporting a book value of ₱50,000. Depreciation stops once book value equals salvage; the salvage value is a floor and an asset cannot be written below it.

<sub>from GEAS-05-11</sub>

### 6. Making a component in-house costs ₱2,000,000 per year in fixed cost plus ₱120 per unit. Buying it costs ₱400,000 per year in fixed cost plus ₱220 per unit. Find the indifference quantity and state the rule.

**Given:** Make: $FC = 2000000$, $v = 120$; Buy: $FC = 400000$, $v = 220$

> [!success]- Answer
> **$Q^* = 16000$ units; make above it, buy below it.**

> [!warning] Trap
> Dividing the fixed-cost difference by the variable-cost difference in the wrong order, 100/1600000, which produces a meaningless quantity near zero. The cost difference goes on top and the per-unit saving on the bottom.

<sub>from GEAS-05-12</sub>

### 7. Two cost alternatives at 10%: X has a ₱400,000 first cost, a 4-year life, no salvage and ₱60,000 annual cost; Y has a ₱600,000 first cost, a 6-year life, no salvage and ₱40,000 annual cost. Which is cheaper?

**Given:** $i = 0.10$; X: $FC = 400000$, $n = 4$, $A = 60000$; Y: $FC = 600000$, $n = 6$, $A = 40000$

> [!success]- Answer
> **Y is cheaper by $186188.3 - 177764.4 = 8424$ per year.**

> [!warning] Trap
> Comparing first costs (₱400,000 versus ₱600,000) and choosing X, or comparing PW over the 4-year and 6-year lives directly. Annual worth puts both on a per-year basis so the different lives cannot distort the ranking.

<sub>from GEAS-05-07</sub>

### 8. ₱100,000 is invested at 10% compounded annually for 5 years. Find the compound amount and the compound interest.

**Given:** $P = 100000$; $i = 0.10$; $n = 5$ years

> [!success]- Answer
> **$F = 161051$; compound interest $= 61051$.**

> [!warning] Trap
> Falling back on simple interest, $F = 100000(1+0.10 \times 5) = 150000$, understates the amount by $11051$ — precisely the interest earned on the reinvested interest.

<sub>from GEAS-05-01</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| GEAS-05-01 | Simple and Compound Interest | 5 |
| GEAS-05-02 | Nominal vs Effective Rates | 5 |
| GEAS-05-03 | Ordinary Annuity and Annuity Due | 10 |
| GEAS-05-04 | Deferred Annuities and Perpetuities | 5 |
| GEAS-05-05 | Arithmetic and Geometric Gradients | 5 |
| GEAS-05-06 | Capitalized Cost | 5 |
| GEAS-05-07 | PW, FW and AW Methods | 4 |
| GEAS-05-08 | Rate of Return and Payback | 5 |
| GEAS-05-09 | Benefit-Cost Ratio | 5 |
| GEAS-05-10 | Depreciation: SLM and SYD | 5 |
| GEAS-05-11 | Depreciation: DB and DDB | 5 |
| GEAS-05-12 | Break-Even and Cost Analysis | 5 |
| GEAS-05-13 | Replacement Analysis | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
