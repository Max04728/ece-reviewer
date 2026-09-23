---
id: GEAS-05-04
title: "Deferred Annuities and Perpetuities"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Ordinary_Annuity_and_Annuity_Due]]", "[[02_Nominal_vs_Effective_Rates]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Deferred Annuities and Perpetuities

> [!abstract] Scope
> Value a uniform series whose first payment is delayed past the first period, and value a payment stream that never ends, including its deferred and growing forms.

## Core Concept

> [!tip] Intuition
> A deferred annuity is an ordinary annuity parked in the future: value it one period before its first payment, then slide that single amount back to today. A perpetuity is the same series with no last payment, and its value collapses to a single division because the discounted payments form a geometric series that sums to a finite number.

**Deferred annuity: value first, then discount.** If a uniform series of $n$ payments of $A$ begins at the end of period $k+1$ — that is, the first $k$ periods carry nothing — then $P = A(P/A,i,n)(P/F,i,k)$. The annuity factor already places the series one period before its first payment, which is the end of period $k$, so the second step discounts that single amount back over exactly $k$ periods. The equivalent one-line form is $P = A[(P/A,i,k+n) - (P/A,i,k)]$: pretend the series started at period 1, then subtract the $k$ payments that never arrive. Both routes are correct and must agree; using them as a cross-check is the fastest way to catch a miscounted deferral.

**Perpetuity: the 1/i factor.** Letting $n \to \infty$ drives $(P/A,i,n) = [1-(1+i)^{-n}]/i$ to $1/i$, so a level payment of $A$ at the end of every period forever is worth $P = A/i$ today. The reason is a geometric series:
$$P = A/(1+i) + A/(1+i)^2 + \cdots$$
a geometric series with first term $A/(1+i)$ and ratio $1/(1+i) < 1$, whose sum is $A/i$. The economic reading is an endowment: $A/i$ invested at rate $i$ throws off exactly $A$ per period forever while the principal is never touched. That is why capitalized cost divides an annual cost by $i$.

**Perpetuity due, deferred perpetuity, growing perpetuity.** If the first payment is immediate rather than at the end of period 1, add that one payment:
$$P = A + A/i = A(1+i)/i$$
If the stream is deferred $k$ periods, discount the capitalized amount: $P = (A/i)(1+i)^{-k}$. If the payments grow at rate $g$, the geometric series still closes provided $g < i$, giving $P = A_1/(i-g)$; when $g \ge i$ the series diverges and no finite present worth exists.

**Where the conventions bite.** Every formula above assumes end-of-period payments at a constant rate $i$ that is already the rate per payment period — if interest compounds quarterly but payments are annual, convert to the effective annual rate first (see the nominal-versus-effective note). In Philippine board problems the perpetuity framing shows up as an endowment, a maintenance fund, or a project 'to last forever', and the answer is always independent of any horizon a problem might tempt you to invent.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Deferred annuity present worth | $P = A(P/A,i,n)(P/F,i,k)$ | First payment falls at the end of period k+1; the discount step uses k periods, not k+1. |
| Deferred annuity, subtraction form | $P = A[(P/A,i,k+n) - (P/A,i,k)]$ | Identical result to the two-step form; useful as an arithmetic check on k. |
| Perpetuity present worth | $P = A/i$ | Level payment at the end of every period forever. First payment at period 1; i must be the rate per payment period. |
| Perpetuity due | $P = A(1+i)/i = A + A/i$ | First payment is immediate (time 0); the ordinary formula would miss that one payment. |
| Deferred perpetuity | $P = (A/i)(1+i)^{-k}$ | First payment at the end of period k+1; A/i already sits one period before it, so only k discount periods apply. |
| Growing perpetuity | $P = A_1/(i-g)$ | First payment A_1 one period from now, growing at g per period. Requires g < i; diverges otherwise. |
| Capitalized cost of a level annual cost | $CC = FC + A/i$ | First cost plus the endowment needed to fund A forever; the classic use of the perpetuity factor. |
| Capitalized cost of a deferred cost | $CC = FC + (A/i)(1+i)^{-k}$ | When the recurring cost starts only after a grace or construction period of k periods. |

## Worked Problems

### P1. A contract pays ₱10,000 at the end of each year for 8 years, but the first payment is delayed to the end of year 4. Find the present worth at 12% compounded annually.

**Given:** $A = 10000$; $n = 8$ payments; $k = 3$ periods deferred; $i = 0.12$

**Solution:**

1. Value the 8 payments one period before the first one, i.e. at the end of year 3: $PW_3 = 10000(P/A,12\%,8)$.
2. $(P/A,12\%,8) = [1-(1.12)^{-8}]/0.12 = 4.967640$, so $PW_3 = 49676.40$.
3. Discount that single amount 3 periods to time 0: $(P/F,12\%,3) = (1.12)^{-3} = 0.711780$.
4. $P = 49676.40(0.711780) = 35358.6$.
5. Check by subtraction: $10000[(P/A,12\%,11) - (P/A,12\%,3)] = 10000(5.937702 - 2.401831) = 35358.7$.

> [!success]- Answer
> **$P \approx 35359$ (₱35,358.7).**

> [!warning] Trap
> Discounting over 4 periods because the first payment arrives at the end of year 4. The annuity factor already stops one period before the first payment, so the deferral is k = 3; using 4 gives ₱31,570, which is 12% too low.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10000((1.12)^8−1)÷(0.12(1.12)^8)×1.12^-3` → $P$ = **35358.68** — the discount is $k$ = 3 periods, valued one period before the first payment.
> 2. Subtraction form as a check: `10000(((1.12)^11−1)÷(0.12(1.12)^11)−((1.12)^3−1)÷(0.12(1.12)^3))` → **35358.68**.

### P2. An endowment must pay ₱60,000 at the end of every year forever. How much must be deposited today at 8%?

**Given:** $A = 60000$ per year forever; $i = 0.08$

**Solution:**

1. Perpetuity factor: $P = A/i$.
2. $P = 60000/0.08 = 750000$.
3. Check: $750000 \times 0.08 = 60000$ is withdrawn each year, and the principal is untouched.

> [!success]- Answer
> **$P = 750000$.**

> [!warning] Trap
> Multiplying the payment by a horizon, or treating the stream as a 20- or 30-year annuity. The 1/i factor already assumes n -> infinity, so the answer does not depend on any number of years.

### P3. Rework the endowment if the first ₱60,000 payment is made today instead of one year from now.

**Given:** $A = 60000$ forever, first payment at time 0; $i = 0.08$

**Solution:**

1. The stream is an ordinary perpetuity plus the immediate payment: $P = A + A/i$.
2. $A/i = 750000$ values all payments from year 1 onward.
3. Add today's payment: $P = 750000 + 60000 = 810000$.
4. Equivalently, $P = A(1+i)/i = 60000(1.08)/0.08 = 810000$.

> [!success]- Answer
> **$P = 810000$.**

> [!warning] Trap
> Using $A/i = 750000$ for a perpetuity whose first payment is immediate. The 1/i factor capitalises the stream one period before its first payment, so a payment at time 0 must be added separately.

### P4. A machine needs ₱25,000 of maintenance at the end of every year forever, but the first outlay occurs at the end of year 5. Capitalize this cost at 10%.

**Given:** $A = 25000$ per year; first payment at end of year 5; $i = 0.10$

**Solution:**

1. Capitalize the stream as if it began at the end of year 1: $A/i = 25000/0.10 = 250000$.
2. That amount sits at the end of year 4, one period before the first payment at year 5.
3. Discount 4 periods: $(P/F,10\%,4) = (1.10)^{-4} = 0.683013$.
4. $P = 250000(0.683013) = 170753.4$.

> [!success]- Answer
> **$P = 170753.4$.**

> [!warning] Trap
> Discounting 5 periods instead of 4. With the first payment at t = 5, the capitalized amount A/i is already positioned at t = 4, so a fifth discount period double-counts the deferral.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `25000÷0.1×1.1^-4` → $P$ = **170753.36** — $A/i$ = **250000** already sits at the end of year 4, so four discount periods apply.
> 2. The trap's fifth period, `1.1^-5` = **0.620921**, would return **155230.33** — about 9 % low.

### P5. At 10%, compare the present worth of ₱100,000 per year for 25 years against ₱100,000 per year forever.

**Given:** $A = 100000$; $n = 25$ or $n \to \infty$; $i = 0.10$

**Solution:**

1. 25-year annuity: $(P/A,10\%,25) = [1-(1.10)^{-25}]/0.10 = 9.077040$.
2. $PW_{25} = 100000(9.077040) = 907704$.
3. Perpetuity: $PW_{\infty} = 100000/0.10 = 1000000$.
4. The perpetuity is worth ₱92,296 more — 10.2% of the finite option's ₱907,704 value, which is the same fact as the 9.2% shortfall measured against the ₱1,000,000 perpetuity.

> [!success]- Answer
> **The perpetuity wins: ₱1,000,000 versus ₱907,704, a gap of ₱92,296.**

> [!warning] Trap
> Assuming 25 years is 'almost forever' and answering with A/i. At 10% a 25-year stream captures only 90.8% of the perpetuity, and the 9.2% shortfall is a full exam question.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100000(1−1.1^-25)÷0.1` → $PW_{25}$ = **907704.00**, beside the perpetuity `100000÷0.1` → **1000000**.
> 2. `1000000−907704` → the gap is **92296**, i.e. **9.23** % of the perpetuity: a 25-year stream captures only **90.77** % of it.

## Traps & Exam Notes

- **Discounting a deferred annuity by one period too many.** The (P/A) factor already values the series one period before its first payment, so a series starting at the end of year 4 is discounted only 3 periods.
- **Using A/i for an annuity with a finite but unstated life.** If the problem names a number of years, it is an annuity; if it says 'forever', 'perpetual' or 'endowment', it is a perpetuity.
- **Ignoring a first payment at time 0.** A perpetuity due is worth A(1+i)/i, which is larger than A/i by exactly one payment.
- **Applying the growing-perpetuity factor when g >= i.** P = A_1/(i-g) requires g < i; at g = i the denominator vanishes and the stream has no finite present worth.
- **Using a nominal rate in A/i when payments are annual but compounding is monthly.** Convert to the effective annual rate first, or every perpetual cost is understated.

## See Also

- [[03_Ordinary_Annuity_and_Annuity_Due]]
- [[06_Capitalized_Cost]]
- [[05_Arithmetic_and_Geometric_Gradients]]

---

[[03_Ordinary_Annuity_and_Annuity_Due|⬅ 03]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Arithmetic_and_Geometric_Gradients|05 ➡]]
