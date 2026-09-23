---
id: GEAS-05-01
title: "Simple and Compound Interest"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: []
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Simple and Compound Interest

> [!abstract] Scope
> Compute interest, future worth and present worth on a single lump sum under simple and compound interest, and pick the factor that matches the compounding actually stated.

## Core Concept

> [!tip] Intuition
> Simple interest grows money along a straight line because it is charged only on the original principal. Compound interest grows it along a curve, because each period's interest joins the principal and then earns interest itself, so the curve overtakes the line after the first period.

**Simple interest: one base, straight-line growth.** Interest is charged only on the original principal $P$ for the whole term, so $I = Pin$ and the future worth is $F = P(1+in)$. The rate $i$ and the number of periods $n$ must be expressed in the same time unit: with an annual rate, $n$ is in years, so a 9-month term is $n = 0.75$. Simple interest is the convention for short-term notes, bank discounting of promissory notes, and any transaction shorter than one compounding period.

**Compound interest: interest on interest.** At the end of every period the balance is multiplied by $(1+i)$, so after $n$ periods the balance is $F = P(1+i)^n = P(F/P,i,n)$. That factor is a geometric progression, not a straight line: growth in pesos accelerates because the interest credited in every earlier period is itself earning interest. The reciprocal $P = F(1+i)^{-n} = F(P/F,i,n)$ is the single-payment present-worth factor — the same equation read backwards. That is why a single-lump problem can be worked with either factor, provided you know which end of the timeline you are standing on.

**Work inside the compounding period, or convert the rate — never mix the two.** If compounding occurs $m$ times a year at nominal rate $r$, the rate per period is $i = r/m$ and the number of periods is $n = mt$, giving $F = P(1+r/m)^{mt}$. If instead the problem states an effective annual rate $i$, keep $n$ in years and use $F = P(1+i)^n$ directly. The reliable check is that $i$ and $n$ always describe the same period; a monthly rate paired with an annual period count is the single largest source of wrong answers in this topic.

**Where the rate comes from, and what 'money is worth' means.** A problem that says 'money is worth 12% compounded annually' is quoting the rate the owner could earn elsewhere, and that rate becomes the discount rate for every future amount. In later topics the same number is called the MARR (minimum attractive rate of return) or, in Philippine bank practice, the passive rate. Cash flows are assumed to occur at the end of each period unless the problem says otherwise, and a lump sum at time 0 is never discounted: an amount at the end of year $n$ is discounted exactly $n$ periods.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Simple interest | $I = Pin$ | i and n must share one time unit; P is the original principal only, so earlier interest never earns interest. |
| Simple future worth | $F = P(1+in)$ | Straight-line growth. Use when the problem says 'simple interest' or the term is shorter than one compounding period. |
| Simple present worth | $P = F/(1+in)$ | Discounts one amount at simple interest; the exact reciprocal of the simple future-worth factor. |
| Single-payment compound amount factor | $F = P(1+i)^n = P(F/P,i,n)$ | One lump sum, interest compounded once per period. Payments are assumed at end of period. |
| Single-payment present-worth factor | $P = F(1+i)^{-n} = F(P/F,i,n)$ | Reciprocal of (F/P,i,n). An amount at the end of year n is discounted exactly n periods, not n-1. |
| Compound amount with m periods per year | $F = P(1+r/m)^{mt}$ | r is the nominal annual rate and m the number of compounding periods per year; never pair this with an annual n. |
| Effective annual rate from a nominal rate | $i = (1+r/m)^m - 1$ | For m > 1 the effective rate always exceeds the nominal rate; m = 1 gives i = r. |
| Continuous compounding | $F = Pe^{rt}, i = e^r - 1$ | The m -> infinity limit. For a given nominal r it produces the largest F of any compounding frequency. |
| Periods needed to reach a future worth | $n = \ln(F/P)/\ln(1+i)$ | Single-lump compound interest only; the ratio F/P must be positive and i > 0. |
| Interest earned over the term | $I = F - P$ | A peso amount, not a rate. Do not report it when the question asks for i. |

## Worked Problems

### P1. A ₱50,000 loan is taken at 12% simple interest for 9 months. Find the interest and the amount due at maturity.

**Given:** $P = 50000$; $i = 0.12$ per year; $t = 9$ months

**Solution:**

1. Convert the term to years, because the rate is annual: $n = 9/12 = 0.75$.
2. Interest: $I = Pin = 50000(0.12)(0.75)$.
3. $I = 50000(0.09) = 4500$.
4. Amount due: $F = P + I = 50000 + 4500 = 54500$.

> [!success]- Answer
> **Interest $= 4500$; amount due $F = 54500$.**

> [!warning] Trap
> Substituting $n = 9$ while the rate is annual gives $I = 50000(0.12)(9) = 54000$, twelve times the correct interest. When i is per year, n must be in years.

### P2. ₱100,000 is invested at 10% compounded annually for 5 years. Find the compound amount and the compound interest.

**Given:** $P = 100000$; $i = 0.10$; $n = 5$ years

**Solution:**

1. Apply the single-payment compound amount factor: $F = P(1+i)^n = 100000(1.10)^5$.
2. $(1.10)^5 = 1.61051$.
3. $F = 100000(1.61051) = 161051$.
4. Compound interest: $I = F - P = 161051 - 100000 = 61051$.

> [!success]- Answer
> **$F = 161051$; compound interest $= 61051$.**

> [!warning] Trap
> Falling back on simple interest, $F = 100000(1+0.10 \times 5) = 150000$, understates the amount by $11051$ — precisely the interest earned on the reinvested interest.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100000×1.1^5` → $F$ = **161051** — the single-payment compound-amount factor in one entry, with no table lookup.
> 2. `Ans−100000` → $I$ = **61051**; the interest is simply what the factor leaves above the principal.

### P3. A debt of ₱250,000 is due in 4 years. What is its present worth if money is worth 12% compounded annually?

**Given:** $F = 250000$; $i = 0.12$; $n = 4$ years

**Solution:**

1. Apply the single-payment present-worth factor: $P = F(1+i)^{-n} = 250000(1.12)^{-4}$.
2. $(1.12)^4 = 1.57351936$.
3. $P = 250000/1.57351936 = 158879.5$.
4. So ₱158,879.52 today is equivalent to ₱250,000 in 4 years at 12%.

> [!success]- Answer
> **$P \approx 158880$ (₱158,879.52).**

> [!warning] Trap
> Discounting only 3 periods because the money is 'due at the end of year 4'. An end-of-period-4 amount is discounted four periods; using n = 3 gives ₱177,836.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `250000×1.12^-4` → $P$ = **158879.52** — key the exponent as `-4` rather than dividing by 1.57351936.
> 2. Equivalent check: `250000÷1.12^4` → **158879.52**, identical to the reciprocal factor.

### P4. ₱80,000 is deposited at 12% compounded quarterly for 3 years. Find the maturity value.

**Given:** $P = 80000$; $r = 0.12$ nominal; $m = 4$; $t = 3$ years

**Solution:**

1. Rate per quarter: $i = r/m = 0.12/4 = 0.03$.
2. Number of quarters: $n = mt = 4(3) = 12$.
3. $F = P(1+i)^n = 80000(1.03)^{12}$.
4. $(1.03)^{12} = 1.4257609$, so $F = 80000(1.4257609) = 114060.87$.

> [!success]- Answer
> **$F = 114060.87$ (interest ₱34,060.87).**

> [!warning] Trap
> Keeping the nominal rate with an annual period count, $F = 80000(1.12)^3 = 112394$, understates the maturity value by ₱1,667. The conversion i = r/m and n = mt is mandatory.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `80000×(1+0.12÷4)^(4×3)` → $F$ = **114060.87** — $i = r/m$ and $n = mt$ are built into the one line, so the two cannot drift apart.
> 2. `Ans−80000` → interest = **34060.87**.
>
> Keying `(1.12)^3` instead returns **112394**, the understated value the note's trap describes.

### P5. How long does it take money to double at 8% compounded annually?

**Given:** $F/P = 2$; $i = 0.08$ compounded annually

**Solution:**

1. Set $F = P(1+i)^n$ with $F/P = 2$: $2 = (1.08)^n$.
2. Take logarithms of both sides: $n = \ln 2 / \ln 1.08$.
3. $n = 0.693147/0.0769610 = 9.0065$.
4. The money has doubled during the 10th year; the first end-of-year balance above 2P is at $n = 10$.

> [!success]- Answer
> **$n \approx 9.01$ years (10 year-ends).**

> [!warning] Trap
> Answering $2/0.08 = 25$ years. That is the simple-interest answer; compound growth requires logarithms. The Rule of 72 ($72/8 = 9$) is a check, not a derivation.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `SOLVE` on `2=1.08^X` with a guess of 9 → $X$ = **9.0064683**; the `L−R` line reads 0.
> 2. So $n$ = **9.01** years, and `1.08^10` → **2.158925** confirms the first whole year-end that clears $2P$ is $n$ = **10**.
>
> The closed form $n=\ln(F/P)/\ln(1+i)$ returns the same 9.00647; SOLVE needs no rearrangement at all.

## Traps & Exam Notes

- **Annual rate, monthly period count.** $I = Pin$ with an annual $i$ and $n$ counted in months overstates the interest twelvefold. Convert the term into the rate's time unit before substituting.
- **Charging compound interest on a 'simple interest' problem, or the reverse.** The two differ by the interest-on-interest term, which is negligible for one period and enormous for many: per ₱100,000 at 10% over 5 years, simple gives ₱150,000 and compound ₱161,051.
- **Mixing the nominal rate with an effective-rate period count.** With 12% compounded quarterly, the working rate is 3% and the periods are quarters, $n = 4t$. Using 12% with $n = t$ always understates the future worth.
- **Discounting one period too few.** A cash flow at the end of year 4 uses $(1+i)^{-4}$. The '-1' habit comes from annuity factors, whose first payment already sits at period 1; it does not apply to single amounts.
- **Reporting interest when the rate is asked.** $I = Pin$ is a peso amount and $i$ is a rate. Answering ₱4,500 for a question that asks for the rate is marked wrong even though the arithmetic was correct.

## See Also

- [[02_Nominal_vs_Effective_Rates]]
- [[03_Ordinary_Annuity_and_Annuity_Due]]
- [[06_Capitalized_Cost]]

---

⬅ *start* · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Nominal_vs_Effective_Rates|02 ➡]]
