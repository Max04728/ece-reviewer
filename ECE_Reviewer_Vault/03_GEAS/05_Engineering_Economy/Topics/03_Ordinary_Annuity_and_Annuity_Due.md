---
id: GEAS-05-03
title: "Ordinary Annuity and Annuity Due"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 3
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Simple_and_Compound_Interest]]", "[[02_Nominal_vs_Effective_Rates]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Ordinary Annuity and Annuity Due

> [!abstract] Scope
> Value a series of equal payments at equal intervals as a present worth, a future worth or an equivalent annual amount, and tell an ordinary annuity from an annuity due.

## Core Concept

> [!tip] Intuition
> An annuity factor is nothing more than a finite geometric series of discounted payments: n equal terms, each one factor of $(1+i)^{-1}$ smaller than the one before it. Write the series once and every annuity formula the exam asks for follows.

**What a uniform series is.** An annuity is a series of equal payments $A$ made at equal intervals for $n$ periods. In engineering economy a payment is assumed to fall at the **end** of each period unless the problem says otherwise; that is an **ordinary annuity** (annuity in arrears), so the first payment is at $t=1$ and the last at $t=n$. When the first payment falls at $t=0$ — rent, insurance, lease or tuition paid in advance — the series is an **annuity due** (annuity in advance). The single question that decides which factor to use is: *when is the first payment?*

**The factors and how they interlock.** $(P/A,i,n)$ moves the whole series back to one period before the first payment of an ordinary annuity; $(F/A,i,n)$ moves it forward to the date of the last payment. Their reciprocals $(A/P,i,n)$ and $(A/F,i,n)$ recover an equivalent annual amount from a present or future amount. The four are coupled by the single-payment factor: $F = P(1+i)^n$ converts $(P/A)$ into $(F/A)$, and the identity $(A/P,i,n) = (A/F,i,n) + i$ says a capital-recovery payment returns principal through the sinking-fund part plus interest on the unrecovered balance. A capital-recovery factor is therefore always larger than the interest rate itself.

**Annuity due: one extra period on every payment.** Shifting the whole series one period earlier multiplies *every* discounted term by $(1+i)$ and every compounded term by $(1+i)$, so the entire value is $(1+i)$ times the ordinary value:
$$P_{due} = A(P/A,i,n)(1+i)$$
and $F_{due} = A(F/A,i,n)(1+i)$. The **number of payments does not change** — only their dates. This is the single highest-yield fact in this topic, and the one the exam punishes hardest.

**The second form of the annuity-due identity.** An annuity due of $n$ payments is identical to one immediate payment $A$ plus an ordinary annuity of $n-1$ payments beginning one period from now:
$$P_{due} = A + A(P/A,i,n-1)$$
Either form is acceptable; they must give the same answer. Using $A + A(P/A,i,n)$ counts $n+1$ payments and is the classic wrong answer, off by exactly one payment's worth of discounting.

**Where the factors fail.** The tables assume (i) the first payment is exactly one period after the valuation date, (ii) the payment period equals the compounding period, and (iii) $i$ and $n$ are stated in the same time unit. A deferment of $k$ periods needs a shift of $(1+i)^{-k}$ applied to the ordinary present worth. Quarterly payments with annual compounding must have the rate converted to the payment period before any table is read. And when $n$ is the unknown, the factor equations invert to logarithms:
$$n = \ln\!\left(1 + \dfrac{Fi}{A}\right) / \ln(1+i)$$
which is usually fractional — the number of whole payments is the next integer, and the final payment is then smaller than $A$ (or the fund is over-subscribed by a small amount).

## Derivation

Write the definition: the present worth of $n$ end-of-period payments of $A$ is the sum of each payment discounted to $t=0$, $P = A(1+i)^{-1} + A(1+i)^{-2} + \cdots + A(1+i)^{-n}$.

Recognise the finite geometric series with first term $a = A(1+i)^{-1}$ and common ratio $r = (1+i)^{-1}$, whose sum is $a\,\dfrac{1-r^{n}}{1-r}$.

Substitute: $P = A(1+i)^{-1}\,\dfrac{1-(1+i)^{-n}}{1-(1+i)^{-1}}$. Multiplying numerator and denominator by $(1+i)$ clears the nested fractions.

Simplify to the uniform-series present-worth factor: $P = A\,\dfrac{(1+i)^{n}-1}{i(1+i)^{n}} = A(P/A,i,n)$.

Compound that result forward $n$ periods with the single-payment factor: $F = P(1+i)^{n}$, which collapses to $F = A\,\dfrac{(1+i)^{n}-1}{i} = A(F/A,i,n)$ — the uniform-series compound-amount factor.

Invert the two factors to get the capital-recovery and sinking-fund factors: $A = P\,\dfrac{i(1+i)^{n}}{(1+i)^{n}-1} = P(A/P,i,n)$ and $A = F\,\dfrac{i}{(1+i)^{n}-1} = F(A/F,i,n)$.

For an annuity due, replace every payment date $t=k$ by $t=k-1$; each term grows by exactly one factor of $(1+i)$, so $P_{due} = (1+i)\,P_{ord}$ and $F_{due} = (1+i)\,F_{ord}$. Equivalently, split off the immediate payment: $P_{due} = A + A(P/A,i,n-1)$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Uniform-series present worth | $(P/A,i,n) = \frac{(1+i)^{n}-1}{i(1+i)^{n}}$ | Ordinary annuity: n equal payments at the END of periods 1..n; P is valued one period before the first payment. |
| Uniform-series compound amount | $(F/A,i,n) = \frac{(1+i)^{n}-1}{i}$ | Ordinary annuity: F is valued ON the date of the last payment, which therefore earns no interest. |
| Capital recovery | $(A/P,i,n) = \frac{i(1+i)^{n}}{(1+i)^{n}-1}$ | Level end-of-period payment that repays principal plus interest. Always greater than i. |
| Sinking fund | $(A/F,i,n) = \frac{i}{(1+i)^{n}-1}$ | Level end-of-period deposit needed to accumulate F. |
| Capital-recovery identity | $(A/P,i,n) = (A/F,i,n) + i$ | Fast check on any (A/P) value: the payment must recover principal AND pay interest on the unrecovered balance. |
| Annuity due, present worth | $P_{due} = (1+i)\,A\,(P/A,i,n)$ | First payment at t = 0. Same number of payments as the ordinary case, each one period earlier. |
| Annuity due, future worth | $F_{due} = (1+i)\,A\,(F/A,i,n)$ | F is valued one period after the last payment (t = n) when payments run t = 0..n-1. |
| Annuity due, second form | $P_{due} = A + A\,(P/A,i,n-1)$ | Must equal the (1+i) form. Writing A + A(P/A,i,n) counts n+1 payments. |
| Deferred annuity | $P = (1+i)^{-k}\,A\,(P/A,i,n)$ | First payment at the end of period k+1; k = number of payment-free periods. |
| Perpetuity | $P = \frac{A}{i}$ | Ordinary perpetuity: n -> infinity, first payment at t = 1. Undefined for i = 0. |
| Perpetuity due | $P = \frac{A}{i}(1+i)$ | First payment now. Used with capitalized cost and endowment problems. |
| Solving for the number of periods | $n = \frac{\ln\!\left(1+\frac{Fi}{A}\right)}{\ln(1+i)}$ | From A(F/A,i,n) = F. Usually fractional; round UP to the whole number of payments. |
| Single-payment link | $F = P(1+i)^{n}$ | Converts (P/A) into (F/A). Requires i and n in the same time unit as the payments. |

## Worked Problems

### P1. A machine is expected to earn ₱10,000 at the end of each year for 10 years. Money is worth 10% per year. What is the present worth of the earnings?

**Given:** A = ₱10,000 per year; n = 10 years; i = 10% per year; ordinary annuity: first payment at t = 1

**Solution:**

1. $(P/A,10\%,10) = \dfrac{(1.1)^{10}-1}{0.1(1.1)^{10}}$
2. $(1.1)^{10} = 2.593742$, so the numerator is $1.593742$ and the denominator is $0.1 \times 2.593742 = 0.259374$
3. $(P/A,10\%,10) = \dfrac{1.593742}{0.259374} = 6.144567$
4. $P = 10{,}000 \times 6.144567 = 61{,}445.67$

> [!success]- Answer
> **₱61,445.67 (about ₱61,446)**

> [!warning] Trap
> Applying the annuity-due multiplier $(1+i)$ to an end-of-year series. That would report ₱67,590 and overstate the present worth by one full period of interest on every payment.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10000((1.1)^10−1)÷(0.1(1.1)^10)` → $P$ = **61445.67**; the factor alone reads **6.144567**, the note's $(P/A,10\%,10)$.
> 2. No annuity table is read: $A\,(P/A,i,n)$ is the whole problem once $i$ and $n$ share a time unit.

### P2. The same ₱10,000 is paid at the BEGINNING of each year for 10 years, first payment today. Money is worth 10% per year. What is the present worth?

**Given:** A = ₱10,000 per year; n = 10 payments; i = 10% per year; annuity due: first payment at t = 0

**Solution:**

1. $(P/A,10\%,10) = 6.144567$ from the previous problem
2. Every payment is one period earlier, so multiply the whole series by $(1+i)$: $P = 6.144567 \times 1.1 = 6.759024$
3. $P = 10{,}000 \times 6.759024 = 67{,}590.24$
4. Check with the second form: $10{,}000 + 10{,}000(P/A,10\%,9) = 10{,}000 + 10{,}000(5.759024) = 67{,}590.24$

> [!success]- Answer
> **₱67,590.24 — exactly ₱6,144.57 more than the ordinary annuity**

> [!warning] Trap
> Using the ordinary annuity factor for an annuity DUE understates the value: annuity-due payments occur at the start of each period and carry one extra period of interest, so the correct value is $(1+i)$ times the ordinary one — here the entire difference is $P_{ord} \times i = 61{,}445.67 \times 0.10 = 6{,}144.57$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10000((1.1)^10−1)÷(0.1(1.1)^10)×1.1` → $P_{due}$ = **67590.24** — the `×1.1` is the entire move from P1's **61445.67**.
> 2. Second form as a check: `10000+10000((1.1)^9−1)÷(0.1(1.1)^9)` → **67590.24**, identical.

### P3. ₱5,000 is deposited at the end of each year for 8 years into a fund earning 8% compounded annually. How much is in the fund immediately after the 8th deposit?

**Given:** A = ₱5,000 per year; n = 8 years; i = 8% per year; F valued at t = 8

**Solution:**

1. $(F/A,8\%,8) = \dfrac{(1.08)^{8}-1}{0.08}$
2. $(1.08)^{8} = 1.850930$, numerator $= 0.850930$
3. $(F/A,8\%,8) = \dfrac{0.850930}{0.08} = 10.636628$
4. $F = 5{,}000 \times 10.636628 = 53{,}183.14$

> [!success]- Answer
> **₱53,183.14**

> [!warning] Trap
> Compounding the last deposit for an extra year. The 8th deposit is made ON the valuation date and earns no interest, which is exactly what $(F/A,i,n)$ assumes.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5000((1.08)^8−1)÷0.08` → $F$ = **53183.14**; $(F/A,8\%,8)$ = **10.636628**, and the 8th deposit earns nothing by construction.
> 2. One more year of interest, `Ans×1.08` → **57437.79**, is P4's annuity-due answer — not this one.

### P4. ₱5,000 is deposited at the BEGINNING of each year for 8 years into a fund earning 8% compounded annually. How much is in the fund at the end of the 8th year?

**Given:** A = ₱5,000 per year; n = 8 deposits at t = 0..7; i = 8% per year; F valued at t = 8

**Solution:**

1. $(F/A,8\%,8) = 10.636628$
2. Each of the 8 deposits is one period earlier than in the ordinary case, so $F = 10.636628 \times 1.08 = 11.487558$
3. $F = 5{,}000 \times 11.487558 = 57{,}437.79$
4. Equivalently the ordinary 8-deposit future worth at $t=8$ is ₱53,183.14, which is the balance at $t=7$ for this annuity due; compounding one year gives $53{,}183.14 \times 1.08 = 57{,}437.79$

> [!success]- Answer
> **₱57,437.79**

> [!warning] Trap
> Answering ₱53,183.14 by ignoring that the deposits were made in advance. Timing, not the count of payments, is what changed.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5000((1.08)^8−1)÷0.08×1.08` → $F$ = **57437.79**; the `×1.08` is the annuity-due multiplier and nothing else changes.
> 2. Equivalently `53183.14×1.08` → **57437.79**: the eight deposits at $t = 0..7$ each sit one period earlier.

### P5. A ₱500,000 loan is to be repaid in 5 equal end-of-year payments at 12% compounded annually. Find the annual payment.

**Given:** P = ₱500,000; n = 5 years; i = 12% per year; end-of-year payments

**Solution:**

1. $(A/P,12\%,5) = \dfrac{0.12(1.12)^{5}}{(1.12)^{5}-1}$
2. $(1.12)^{5} = 1.762342$; numerator $= 0.12 \times 1.762342 = 0.211481$; denominator $= 0.762342$
3. $(A/P,12\%,5) = \dfrac{0.211481}{0.762342} = 0.277410$
4. $A = 500{,}000 \times 0.277410 = 138{,}704.87$

> [!success]- Answer
> **₱138,704.87 per year ($5 \times 138{,}704.87 = 693{,}524.35$ total, of which ₱193,524.35 is interest)**

> [!warning] Trap
> Dividing ₱500,000 by 5 and answering ₱100,000. That ignores interest entirely; the correct payment is nearly 39% larger.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `500000×0.12×1.12^5÷(1.12^5−1)` → $A$ = **138704.87**; $(A/P,12\%,5)$ = **0.277410** comes out in the same entry.
> 2. `Ans×5` → **693524.35** paid in total, of which `Ans−500000` → **193524.35** is interest.

### P6. Equipment is leased for 5 years at ₱100,000 per year payable at the START of each year. Money is worth 12%. What single amount today is equivalent to the lease?

**Given:** A = ₱100,000 per year; n = 5 payments; i = 12% per year; first payment today

**Solution:**

1. $(P/A,12\%,5) = \dfrac{(1.12)^{5}-1}{0.12(1.12)^{5}} = \dfrac{0.762342}{0.211481} = 3.604776$
2. $P = 100{,}000 \times 3.604776 \times 1.12 = 100{,}000 \times 4.037349$
3. $P = 403{,}734.93$

> [!success]- Answer
> **₱403,734.93**

> [!warning] Trap
> Quoting ₱360,477.62 (the ordinary annuity value). A lease paid in advance costs $(1+i)$ times more in present-worth terms because the lessor receives each payment a year earlier.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100000((1.12)^5−1)÷(0.12(1.12)^5)×1.12` → $P$ = **403734.93** — the first payment is at $t = 0$, so the due multiplier rides on the ordinary factor.
> 2. Without it the ordinary **360477.62** appears — that is the note's trap, not the answer.

### P7. ₱50,000 is deposited at the end of every year at 10% compounded annually. How long until the fund first reaches ₱1,000,000, and what is the balance then?

**Given:** A = ₱50,000 per year; F = ₱1,000,000 target; i = 10% per year; ordinary annuity

**Solution:**

1. $F = A(F/A,i,n)$ gives $(F/A,10\%,n) = \dfrac{1{,}000{,}000}{50{,}000} = 20$
2. $\dfrac{(1.1)^{n}-1}{0.1} = 20 \Rightarrow (1.1)^{n} = 1 + 2 = 3$
3. $n = \dfrac{\ln 3}{\ln 1.1} = \dfrac{1.098612}{0.095310} = 11.53$ years
4. Payments are whole numbers, so 11 deposits give $50{,}000 \times 18.531167 = 926{,}558.35$ — not enough; 12 deposits give $50{,}000 \times 21.384284 = 1{,}069{,}214.19$

> [!success]- Answer
> **The formula gives n = 11.53 years; the fund first reaches ₱1,000,000 after the 12th deposit, with a balance of ₱1,069,214.19**

> [!warning] Trap
> Reporting n = 11.53 years as the answer. A deposit can only be made at a period boundary, so the number of payments must be rounded UP — and the resulting balance overshoots the target.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `SOLVE` on `50000((1.1)^X−1)÷0.1=1000000` with a guess of 12 → $X$ = **11.526705** years.
> 2. Whole deposits only: `50000((1.1)^11−1)÷0.1` → **926558.35** falls short, `50000((1.1)^12−1)÷0.1` → **1069214.19** is the first that clears.
>
> SOLVE replaces the $n=\ln(1+Fi/A)/\ln(1+i)$ rearrangement; the root is fractional, the number of deposits is not.

### P8. A ₱500,000 machine can be bought for cash, or leased with no down payment for 10 payments of ₱70,000 at the beginning of each year, first payment today. Money is worth 10%. Which is cheaper and by how much in present-worth terms?

**Given:** Cash price = ₱500,000; Lease: A = ₱70,000, n = 10, first payment at t = 0; i = 10% per year

**Solution:**

1. $(P/A,10\%,10) = 6.144567$
2. Annuity due: $P_{lease} = 70{,}000 \times 6.144567 \times 1.10 = 70{,}000 \times 6.759024$
3. $P_{lease} = 473{,}131.67$
4. $500{,}000 - 473{,}131.67 = 26{,}868.33$ in favour of the lease

> [!success]- Answer
> **The lease is cheaper by ₱26,868.33 in present-worth terms (₱473,131.67 versus ₱500,000)**

> [!warning] Trap
> Treating the lease as an ordinary annuity (₱430,119.70) and claiming a saving of ₱69,880. That is the annuity-due error compounding into a wrong investment decision.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `70000((1.1)^10−1)÷(0.1(1.1)^10)×1.1` → $P_{lease}$ = **473131.67**.
> 2. `500000−Ans` → the lease is cheaper by **26868.33**; reading it as an ordinary annuity gives **430119.70** and a false ₱69,880 saving.

### P9. How much must be deposited at the end of each year for 10 years at 6% compounded annually to accumulate ₱2,000,000?

**Given:** F = ₱2,000,000; n = 10 years; i = 6% per year; end-of-year deposits

**Solution:**

1. $(A/F,6\%,10) = \dfrac{0.06}{(1.06)^{10}-1}$
2. $(1.06)^{10} = 1.790848$, denominator $= 0.790848$
3. $(A/F,6\%,10) = \dfrac{0.06}{0.790848} = 0.075868$
4. $A = 2{,}000{,}000 \times 0.075868 = 151{,}735.92$

> [!success]- Answer
> **₱151,735.92 per year**

> [!warning] Trap
> Using $(A/F,i,n)$ when the question asks for the payment on a loan (that is $(A/P,i,n)$), or dividing ₱2,000,000 by 10. A sinking fund is smaller than the straight-line amount because the fund earns interest.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2000000×0.06÷(1.06^10−1)` → $A$ = **151735.92**; $(A/F,6\%,10)$ = **0.075868**.
> 2. Identity check: `2000000×0.06×1.06^10÷(1.06^10−1)−120000` → **151735.92** — the capital-recovery payment less the interest is the sinking-fund deposit.

### P10. An endowment pays ₱25,000 at the beginning of every quarter, forever. Money earns 8% compounded quarterly. What principal is required today?

**Given:** A = ₱25,000 per quarter; nominal rate 8% compounded quarterly; perpetuity due: first payment today

**Solution:**

1. Convert the rate to the payment period: $i = \dfrac{0.08}{4} = 0.02 = 2\%$ per quarter
2. Ordinary perpetuity would be $P = \dfrac{A}{i} = \dfrac{25{,}000}{0.02} = 1{,}250{,}000$
3. Payments are in advance, so multiply by $(1+i)$: $P = 1{,}250{,}000 \times 1.02$
4. $P = 1{,}275{,}000$

> [!success]- Answer
> **₱1,275,000**

> [!warning] Trap
> Answering ₱1,250,000 for a perpetuity DUE, and using 8% per quarter instead of 8%/4 = 2%. The rate must be per payment period before it is divided into the payment.

## Traps & Exam Notes

- **Using the ordinary annuity factor for an annuity due understates the value.** Annuity-due payments occur at the start of each period and each carries one extra period of interest, so the whole value is $(1+i)$ times the ordinary value. The shortfall is exactly $i$ times the ordinary present worth.
- **Turning a count of payments into an off-by-one factor.** For $n$ payments made in advance use $A(P/A,i,n)(1+i)$ or $A + A(P/A,i,n-1)$ — never $A + A(P/A,i,n)$, which silently adds an $(n+1)$-th payment.
- **Valuing $(F/A)$ at the wrong date.** $(F/A,i,n)$ lands on the date of the LAST payment, which earns no interest. Asking for the balance one period later needs one more factor of $(1+i)$; that is the same operation that turns an ordinary annuity into an annuity due.
- **Mixing the payment period with the compounding period.** A nominal rate of 12% compounded monthly with quarterly payments requires $i_{quarter} = (1+0.12/12)^{3}-1 = 3.03\%$ and $n$ counted in quarters. Using $12\%$ per quarter or $n$ in years gives an answer that is off by orders of magnitude.
- **Deferred first payment ignored.** A payment-free gap of $k$ periods shifts the whole series: multiply the ordinary present worth by $(1+i)^{-k}$. Valuing the annuity at $t=0$ when the first payment is at $t=k+1$ overstates the present worth by the missing discounting.
- **Fractional $n$ reported as the answer.** Solving $n$ from the factors returns a real number; payments occur only at period boundaries. Round UP for a fund that must *reach* a target, because a partial final period earns no full interest — and report the overshoot.
- **$(A/P,i,n)$ smaller than $i$.** A capital-recovery factor is always greater than the interest rate because it repays principal as well as interest. Any computed $(A/P)$ below $i$ is a signal that the factor was inverted in the tables.

## See Also

- [[04_Deferred_Annuities_and_Perpetuities]]
- [[02_Nominal_vs_Effective_Rates]]
- [[06_Capitalized_Cost]]
- [[01_Simple_and_Compound_Interest]]

---

[[02_Nominal_vs_Effective_Rates|⬅ 02]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Deferred_Annuities_and_Perpetuities|04 ➡]]
