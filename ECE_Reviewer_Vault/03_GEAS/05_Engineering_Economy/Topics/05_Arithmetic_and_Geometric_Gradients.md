---
id: GEAS-05-05
title: "Arithmetic and Geometric Gradients"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Ordinary_Annuity_and_Annuity_Due]]", "[[01_Simple_and_Compound_Interest]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Arithmetic and Geometric Gradients

> [!abstract] Scope
> Convert a cash-flow series that changes by a constant amount, or by a constant percentage, into an equivalent uniform annual amount or present worth.

## Core Concept

> [!tip] Intuition
> A gradient is just a stack of shifted uniform series. Each increment sits one period later than the last, so the whole pattern can be priced once and for all by a single factor — no year-by-year discounting required.

**Arithmetic gradient.** A series is arithmetic when each payment differs from the previous one by a fixed amount $G$. The standard form is $A_t = A + (t-1)G$ for $t = 1,\dots,n$: the base $A$ at the end of period 1 and the first increment $G$ only at the end of period 2. The gradient part alone is worth $A = G(A/G,i,n)$ as a uniform annual amount, where $(A/G,i,n) = 1/i - n/[(1+i)^n - 1]$, or $P = G(P/G,i,n)$ as a present worth, with the factor:
$$(P/G,i,n) = [(1+i)^n - in - 1]/[i^2(1+i)^n]$$
Converting to an annual amount first and then multiplying by $(P/A,i,n)$ is the safer route because every term stays in units you can sanity-check.

**Why the factor has that shape.** The gradient is the sum of $n-1$ uniform series: one $G$ running from period 2 to $n$, a second from period 3 to $n$, and so on. Each is an ordinary annuity delayed by one more period, so summing the geometric pieces collapses to the closed form above. The two structural facts worth memorising are that the factor multiplies $G$ — not the final increment — and that it is built on a zero payment at period 1. A series whose first increment already appears at period 1 does not fit the standard factor and must be handled by adding the first increment to the base annuity.

**Geometric gradient.** A series is geometric when each payment is a fixed percentage of the previous one:
$$A_t = A_1(1+g)^{t-1}$$
with $g$ the growth rate. Discounting term by term gives a geometric series with ratio $(1+g)/(1+i)$, which sums to $P = A_1[1 - (1+g)^n(1+i)^{-n}]/(i-g)$ when $g \ne i$. Because the discounting explicitly deflates the growth, the growth rate may be positive, negative or larger than $i$ and the formula still applies; only the perpetuity version $P = A_1/(i-g)$ needs $g < i$.

**The g = i special case.** When the growth rate equals the interest rate, the ratio $(1+g)/(1+i)$ equals 1 and the closed form divides by zero. The series itself is perfectly ordinary, however: each term discounted is $A_1(1+i)^{t-1}(1+i)^{-t} = A_1/(1+i)$, a constant, so the present worth is simply $P = nA_1/(1+i)$. Examiners use this because it separates candidates who substitute blindly from those who understand the derivation.

**Using gradients in PH board problems.** Gradients model rising maintenance, declining salvage, escalating fuel or power costs, and bond or lease payments with a step. As always, the rate $i$ is the MARR or the rate 'money is worth', payments are at end of period, and a gradient problem that states a first cost at time 0 simply adds that first cost to the discounted series.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Arithmetic gradient series | $A_t = A + (t-1)G, \quad t = 1,\dots,n$ | The first increment G appears at the end of period 2; period 1 carries only the base A. |
| Arithmetic gradient to annual (A/G) | $(A/G,i,n) = \frac{1}{i} - \frac{n}{(1+i)^n - 1}$ | Converts the gradient portion alone into a uniform annual amount; add the base A separately. |
| Arithmetic gradient present worth (P/G) | $(P/G,i,n) = \frac{(1+i)^n - in - 1}{i^2(1+i)^n}$ | Also equals (A/G,i,n)(P/A,i,n). Built in a zero payment at period 1. |
| Arithmetic gradient future worth (F/G) | $(F/G,i,n) = \frac{(1+i)^n - in - 1}{i^2}$ | Multiply by G and compound the base annuity separately; the two terms must not be mixed. |
| Uniform series from a gradient cash flow | $A_{eq} = A + G(A/G,i,n)$ | The whole arithmetic series restated as one level annual amount, in end-of-period pesos. |
| Geometric gradient present worth, g != i | $P = A_1\frac{1 - (1+g)^n(1+i)^{-n}}{i-g}$ | A_1 is the period-1 payment. Works for negative g (declining series) and for g > i. |
| Geometric gradient, g = i | $P = \frac{nA_1}{1+i}$ | The special case; the general formula divides by zero. Every discounted term equals A_1/(1+i). |
| Growing perpetuity | $P = \frac{A_1}{i-g}$ | Requires g < i. Used for perpetual costs that escalate; diverges when g >= i. |

## Worked Problems

### P1. A maintenance contract pays ₱20,000 at the end of year 1 and increases by ₱2,000 each year through year 8. Find the present worth at 12%.

**Given:** $A = 20000$; $G = 2000$; $n = 8$; $i = 0.12$

**Solution:**

1. Split the series into a base annuity and a gradient: $P = 20000(P/A,12\%,8) + 2000(P/G,12\%,8)$.
2. $(P/A,12\%,8) = 4.967640$, so the base is $20000(4.967640) = 99352.8$.
3. $(P/G,12\%,8) = [(1.12)^8 - 0.12(8) - 1]/[0.12^2(1.12)^8] = 0.515963/0.035654 = 14.471450$.
4. Gradient part: $2000(14.471450) = 28942.90$.
5. $P = 99352.80 + 28942.90 = 128295.69$.

> [!success]- Answer
> **$P = 128295.69$ (₱128,296).**

> [!warning] Trap
> Adding an extra $G(P/A,i,n) = 2000(4.967640) = 9935$ term for the 'first increment'. The (P/G) factor already assumes ₱0 at the end of year 1, and the ₱20,000 base is fully handled by the (P/A) term.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `((1.12)^8−1)÷(0.12(1.12)^8)` `SHIFT` `STO` `A` → $(P/A,12\%,8)$ = **4.967640**; `((1.12)^8−0.12×8−1)÷(0.12²(1.12)^8)` `SHIFT` `STO` `B` → $(P/G,12\%,8)$ = **14.471450**.
> 2. `20000A+2000B` → $P$ = **128295.69**, that is the base **99352.80** plus the gradient **28942.90**.

### P2. A machine's net annual income is ₱50,000 in year 1 and falls by ₱4,000 each year through year 6. Find the present worth at 10%.

**Given:** $A = 50000$; $G = 4000$ decreasing; $n = 6$; $i = 0.10$

**Solution:**

1. A decreasing series is a positive gradient subtracted from the base: $P = 50000(P/A,10\%,6) - 4000(P/G,10\%,6)$.
2. $(P/A,10\%,6) = 4.355261$, so the base is $50000(4.355261) = 217763.0$.
3. $(P/G,10\%,6) = [(1.10)^6 - 0.10(6) - 1]/[0.01(1.10)^6] = 0.171561/0.017716 = 9.684171$.
4. Gradient part: $4000(9.684171) = 38736.68$.
5. $P = 217763.05 - 38736.68 = 179026.37$.

> [!success]- Answer
> **$P = 179026.37$ (₱179,026).**

> [!warning] Trap
> Adding the gradient term for a declining cash flow. The (P/G) factor is always positive, so a decreasing series needs the minus sign; adding it gives ₱256,500 instead of ₱179,026.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `((1.1)^6−1)÷(0.1(1.1)^6)` `SHIFT` `STO` `A` → **4.355261**; `((1.1)^6−0.1×6−1)÷(0.1²(1.1)^6)` `SHIFT` `STO` `B` → **9.684171**.
> 2. `50000A−4000B` → $P$ = **179026.35**; the minus sign is the whole point — adding the gradient instead gives **256499.72**.

### P3. An expense of ₱30,000 at the end of year 1 grows 8% per year for 10 years. If money is worth 12%, find the present worth.

**Given:** $A_1 = 30000$; $g = 0.08$; $n = 10$; $i = 0.12$

**Solution:**

1. Since $g \ne i$, use the geometric gradient factor: $P = A_1[1-(1+g)^n(1+i)^{-n}]/(i-g)$.
2. $(1.08/1.12)^{10} = (0.9642857)^{10} = 0.695116$.
3. $1 - 0.695116 = 0.304884$; divide by $i-g = 0.04$: $0.304884/0.04 = 7.62210$.
4. $P = 30000(7.62210) = 228663.0$.

> [!success]- Answer
> **$P = 228663$.**

> [!warning] Trap
> Using the arithmetic-gradient factor for a percentage-increasing series, or discounting at 8% instead of 12%. The geometric factor deflates $(1+g)^t$ by $(1+i)^t$ and divides by $(i-g)$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `30000(1−(1.08÷1.12)^10)÷0.04` → $P$ = **228662.95**; the ratio $(1+g)/(1+i)$ = **0.9642857** carries the whole series.
> 2. Bracket alone `1−0.9642857^10` → **0.304884**, and `÷(i−g)` = `÷0.04` gives the factor **7.622098** the note rounds to 7.62210.

### P4. Find the present worth of ₱10,000 at the end of year 1, growing 12% per year for 15 years, when money is worth 12%.

**Given:** $A_1 = 10000$; $g = 0.12$; $i = 0.12$; $n = 15$

**Solution:**

1. Here $g = i$, so the general formula has a zero denominator and must not be used.
2. Discount each term: $A_1(1.12)^{t-1}(1.12)^{-t} = 10000/1.12 = 8928.571$ for every $t$.
3. The present worth is 15 identical terms: $P = 15(8928.571)$.
4. $P = 133928.6$.

> [!success]- Answer
> **$P = 133928.6$.**

> [!warning] Trap
> Substituting g = i into A_1/(i-g) and dividing by zero, then reporting a huge or undefined value. At g = i every discounted term is constant, so P = nA_1/(1+i).

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `15×10000÷1.12` → $P$ = **133928.57** — at $g = i$ every discounted term equals $A_1/(1+i)$, so $P = nA_1/(1+i)$.
> 2. Keying the general form instead, `10000(1−(1.12÷1.12)^15)÷(0.12−0.12)`, returns **Math ERROR** (0/0): only the special case evaluates.

### P5. A maintenance fund pays ₱40,000 next year and grows 5% per year forever. Find the amount needed today at 10%.

**Given:** $A_1 = 40000$; $g = 0.05$; $i = 0.10$; perpetual

**Solution:**

1. Use the growing perpetuity: $P = A_1/(i-g)$, valid because $g = 0.05 < i = 0.10$.
2. $i - g = 0.05$.
3. $P = 40000/0.05 = 800000$.

> [!success]- Answer
> **$P = 800000$.**

> [!warning] Trap
> Using the level perpetuity A/i = ₱400,000. That factor assumes zero growth; when the stream escalates at 5% the liability doubles.

## Traps & Exam Notes

- **Placing G at the end of period 1.** The standard (A/G) and (P/G) factors are built on a zero payment at period 1 and the first increment at period 2. A series that increases immediately needs one increment moved into the base annuity.
- **Confusing G with the last payment.** The factor multiplies the increment, not the final period's amount or the total spread. The ₱2,000 in a ₱20,000-to-₱34,000 series is G, not ₱14,000.
- **Adding instead of subtracting a gradient on a declining series.** The factors are positive; direction is carried by the sign you choose, and forgetting it inflates the answer.
- **Using the arithmetic factor on a percentage series.** A series growing 8% per year is geometric even when the growth looks small; the arithmetic factor will systematically misprice it.
- **Substituting g = i into the geometric formula.** The denominator i-g vanishes. The correct result for g = i is P = nA_1/(1+i), not infinity.
- **Feeding A_n instead of A_1 into the geometric factor.** The formula is anchored at the period-1 payment; starting from the last payment is off by (1+g)^(n-1).

## See Also

- [[03_Ordinary_Annuity_and_Annuity_Due]]
- [[04_Deferred_Annuities_and_Perpetuities]]
- [[06_Capitalized_Cost]]

---

[[04_Deferred_Annuities_and_Perpetuities|⬅ 04]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Capitalized_Cost|06 ➡]]
