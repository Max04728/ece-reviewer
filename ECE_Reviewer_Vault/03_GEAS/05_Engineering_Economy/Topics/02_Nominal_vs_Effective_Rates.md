---
id: GEAS-05-02
title: "Nominal vs Effective Rates"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Simple_and_Compound_Interest]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Nominal vs Effective Rates

> [!abstract] Scope
> Convert between nominal and effective interest rates, handle continuous compounding, and choose the correct rate-and-period pair when compounding is more frequent than the payment.

## Core Concept

> [!tip] Intuition
> The nominal rate is a name; the effective rate is what actually happens. If a bank advertises 12% but adds interest every month, the money grows by 12.68% in a year — the advertised figure describes the rate, the effective figure describes the growth.

**Nominal versus effective.** The nominal rate $r$ is a quoted annual rate that ignores compounding inside the year; the effective rate $i$ is the actual annual growth factor, $i = (1+r/m)^m - 1$, where $m$ is the number of compounding periods per year. Any $m > 1$ makes $i$ larger than $r$, and the gap grows with both $m$ and $r$: 12% nominal is 12.36% effective when compounded semiannually, 12.55% quarterly, 12.68% monthly and 12.75% daily.

**Why the formula looks like that.** One peso left for a year at $r$ compounded $m$ times grows by the factor $(1+r/m)^m$, because each of the $m$ periods multiplies the balance by $1 + r/m$. The effective annual rate is that growth factor minus the original peso. Letting $m \to \infty$ gives the continuous-compounding limit $(1+r/m)^m \to e^r$, so the effective rate becomes $e^r - 1$ — the largest value any compounding frequency can produce for a given nominal rate.

**Two legal ways to work a problem.** Keep everything in the compounding period — rate $i = r/m$ over $n = mt$ periods — or convert once to an effective rate per payment period and use years. Both give identical future worths, and examiners accept either. What is never acceptable is mixing the two: a nominal annual rate multiplied by a term in years silently assumes annual compounding and understates the answer.

**Rates when the payment period is longer than the compounding period.** If payments are annual but interest compounds quarterly, the rate to use for the annual payment is the effective annual rate $i = (1+0.12/4)^4 - 1 = 12.55\%$, obtained by setting $m$ equal to the number of compounding periods *per payment period*. For biennial payments the same logic gives $(1.03)^8 - 1 = 26.68\%$. This is the conversion that annuity, capitalized-cost and bond problems depend on.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Effective annual rate from a nominal rate | $i = (1+r/m)^m - 1$ | m = compounding periods per year. Use the effective rate whenever the payment period equals one year; i > r for all m > 1. |
| Continuous compounding effective rate | $i = e^r - 1$ | The m -> infinity limit. Always larger than the same r compounded finitely. |
| Future worth at a nominal rate | $F = P(1+r/m)^{mt}$ | r nominal, m periods per year, t in years; the exponent is the total number of compounding periods. |
| Future worth, continuous | $F = Pe^{rt}$ | Used when the problem says 'compounded continuously' or 'force of interest'. |
| Rate per compounding period | $i = r/m$ | The working rate for the period; pair it with n = mt, never with n in years. |
| Rate per payment period | $i = (1+r/m)^m - 1$ | Here m is the number of compounding periods in one payment period (4 for quarterly-to-annual, 8 for quarterly-to-biennial). |
| Equivalent nominal rate from an effective rate | $r = m[(1+i)^{1/m} - 1]$ | The inverse conversion; the equivalent nominal rate is always below the effective rate for m > 1. |
| Equivalence of two nominal rates | $(1+r_1/m_1)^{m_1} = (1+r_2/m_2)^{m_2}$ | Two quotes are equal only when their effective annual rates match; comparing r values directly is meaningless across different m. |

## Worked Problems

### P1. Convert 18% compounded monthly into an effective annual rate.

**Given:** $r = 0.18$; $m = 12$

**Solution:**

1. Rate per month: $r/m = 0.18/12 = 0.015$.
2. Compound it twelve times: $(1.015)^{12} = 1.195617$.
3. $i = 1.195617 - 1 = 0.195617$.

> [!success]- Answer
> **$i = 19.56\%$ effective annual.**

> [!warning] Trap
> Reporting 18% as the effective rate, or multiplying $1.5\% \times 12 = 18\%$ — the monthly rate must be compounded (raised to the 12th power), not added.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(1+0.18÷12)^12−1` → $i$ = **0.195618** = **19.56** % effective annual.
> 2. The additive chain `0.18÷12×12` → **0.18** is the trap: the monthly rate is compounded, not multiplied out.

### P2. A borrower may take 16% compounded quarterly or 16.5% compounded monthly. Which is cheaper?

**Given:** Option A: $r = 0.16$, $m = 4$; Option B: $r = 0.165$, $m = 12$

**Solution:**

1. Option A: $i_A = (1+0.16/4)^4 - 1 = (1.04)^4 - 1$.
2. $(1.04)^4 = 1.16985856$, so $i_A = 16.9859\%$.
3. Option B: $i_B = (1+0.165/12)^{12} - 1 = (1.01375)^{12} - 1$.
4. $(1.01375)^{12} = 1.178065$, so $i_B = 17.8065\%$.
5. Option A costs 16.99% per year against 17.81% for Option B.

> [!success]- Answer
> **Option A, 16% compounded quarterly, is cheaper at 16.99% effective versus 17.81%.**

> [!warning] Trap
> Choosing on the quoted nominals: 16.5% looks only half a point worse than 16%, so a borrower may assume the difference is negligible. Monthly compounding adds 1.31 points while quarterly adds 0.99, and the effective ordering reverses the nominal ordering.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Both options on one line, chained with `ALPHA` `:` — `(1+0.16÷4)^4−1 : (1+0.165÷12)^12−1` → **0.169859** → **0.178068**.
> 2. Option A = **16.99** %, Option B = **17.81** %: the lower effective rate wins, and here it belongs to the lower nominal quote.

### P3. ₱100,000 is invested for 5 years at 10% compounded continuously. Find the amount and the equivalent effective annual rate.

**Given:** $P = 100000$; $r = 0.10$; $t = 5$ years; continuous

**Solution:**

1. Continuous accumulation: $F = Pe^{rt} = 100000e^{0.5}$.
2. $e^{0.5} = 1.6487213$, so $F = 164872.13$.
3. Effective rate: $i = e^{0.10} - 1 = 1.1051709 - 1 = 0.1051709$.

> [!success]- Answer
> **$F = 164872.13$; $i = 10.52\%$ effective annual.**

> [!warning] Trap
> Treating 'compounded continuously' as annual compounding, $F = 100000(1.10)^5 = 161051$, which understates the answer by ₱3,821. Continuous compounding is the m -> infinity limit and gives the largest F for a given r.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100000×e^(0.5)` → $F$ = **164872.13** — the exponent is $rt = 0.10\times5$, not $t$ alone.
> 2. `e^(0.1)−1` → $i$ = **0.105171** = **10.52** % effective annual, the equivalent rate.
>
> `100000×1.1^5` → **161051** is the annual-compounding answer and understates the continuous case by ₱3,821.

### P4. Find the nominal rate compounded semiannually that is equivalent to 12% effective annual.

**Given:** $i = 0.12$ effective; $m = 2$

**Solution:**

1. Set the effective rates equal: $(1+r/2)^2 = 1.12$.
2. Take the square root: $1 + r/2 = (1.12)^{1/2} = 1.0583005$.
3. $r/2 = 0.0583005$, so $r = 2(0.0583005) = 0.116601$.

> [!success]- Answer
> **$r = 11.66\%$ compounded semiannually.**

> [!warning] Trap
> Halving the effective rate and calling 12% the nominal equivalent. The correct conversion takes the square root, so the semiannual equivalent (11.66%) lies below the effective rate of 12%.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `SOLVE` on `(1+X÷2)^2=1.12` with a guess of 0.1 → $X$ = **0.1166010**.
> 2. So $r$ = **11.66** % compounded semiannually — below the 12 % effective rate, which is the check that the conversion went the right way.

### P5. Interest is 12% compounded quarterly. Find the effective rate to use for (a) an annual payment and (b) a payment made every 2 years.

**Given:** $r = 0.12$; quarterly compounding, $m = 4$ per year

**Solution:**

1. (a) One year holds 4 quarters: $i = (1+0.12/4)^4 - 1 = (1.03)^4 - 1$.
2. $(1.03)^4 = 1.12550881$, so $i = 12.5509\%$ per year.
3. (b) Two years hold 8 quarters: $i = (1.03)^8 - 1$.
4. $(1.03)^8 = 1.2667701$, so $i = 26.677\%$ per 2-year payment period.

> [!success]- Answer
> **(a) 12.5509% per year; (b) 26.677% per 2-year period.**

> [!warning] Trap
> Multiplying the quarterly rate by four, $3\% \times 4 = 12\%$, and calling that the annual effective rate. It understates the true 12.55% and compounds the error in every annuity and capitalized-cost factor built on it.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(1+0.12÷4)^4−1` → **0.125509** = **12.5509** % for an annual payment.
> 2. `(1+0.12÷4)^8−1` → **0.266770** = **26.677** % for a biennial payment — eight quarters, not four times two per cent.

## Traps & Exam Notes

- **Treating the nominal rate as the effective rate.** They are equal only when m = 1. Every m > 1 makes the true annual growth larger than the quoted number.
- **Adding the sub-period rates instead of compounding them.** $1.5\% \times 12 = 18\%$ is not the effective annual rate of 18% compounded monthly; $(1.015)^{12} - 1 = 19.56\%$ is.
- **Comparing nominal rates with different m.** 16% quarterly (16.99% effective) beats 16.5% monthly (17.81% effective) as a borrowing cost. Ranking quoted nominals is the standard exam trap.
- **Using an annual n with a nominal r.** The substitution $F = P(1+r)^t$ quietly assumes annual compounding; it is valid only when m = 1.
- **Converting with the wrong m for payment periods.** For yearly payments on quarterly-compounded interest, m in the conversion is 4 (quarters per payment period), not 12 and not 1.

## See Also

- [[01_Simple_and_Compound_Interest]]
- [[03_Ordinary_Annuity_and_Annuity_Due]]
- [[04_Deferred_Annuities_and_Perpetuities]]

---

[[01_Simple_and_Compound_Interest|⬅ 01]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Ordinary_Annuity_and_Annuity_Due|03 ➡]]
