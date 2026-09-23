---
id: GEAS-05-06
title: "Capitalized Cost"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Deferred_Annuities_and_Perpetuities]]", "[[02_Nominal_vs_Effective_Rates]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Capitalized Cost

> [!abstract] Scope
> Compute the present worth of an asset or project that must serve forever, including the cost of replacing it periodically.

## Core Concept

> [!tip] Intuition
> Capitalized cost asks how large an endowment you would have to set aside today so that the interest alone pays for the project forever. The annual cost is divided by the interest rate because that is exactly the size of fund whose yearly earnings equal the cost.

**Definition and the 1/i rule.** Capitalized cost is the present worth of an infinite stream of costs: $CC = FC + A/i$, where $FC$ is the first cost at time 0 and $A$ is the level annual cost of operating or replacing the asset. The second term is the perpetuity factor: an endowment of $A/i$ invested at rate $i$ earns exactly $A$ every period and never consumes principal, so $A/i$ is the amount that must exist today to fund $A$ forever. Setting up a project permanently therefore costs its first cost plus the capitalized value of everything it consumes from then on.

**Replacement forever.** An asset with first cost $FC$, service life $n$ and salvage value $SV$ must be bought again at the end of every $n$-year cycle. At each renewal the net outlay is $FC - SV$ — you hand over the purchase price and receive the salvage of the retired unit. Those outlays at years $n, 2n, 3n,\dots$ form a perpetuity whose present worth is:
$$(FC-SV)[i/((1+i)^n-1)]/i = (FC-SV)(A/F,i,n)/i$$
The step works because $(A/F,i,n) = i/[(1+i)^n-1]$ puts the $n$-year cycle onto an annual basis. Hence $CC = FC + (FC-SV)(A/F,i,n)/i$, and with no salvage this collapses to the familiar $CC = FC(1+i)^n/[(1+i)^n-1]$. The equivalent annual formulation, $CC = AEC/i$ with $AEC = FC(A/P,i,n) - SV(A/F,i,n)$, gives the identical number and is usually faster on a calculator.

**Why the answer is finite even though time is not.** Each replacement is discounted by $(1+i)^{-kn}$, a geometric series with ratio $(1+i)^{-n} < 1$; the series converges, so infinitely many replacements have a finite present worth. The same reasoning is why capitalized cost is the correct comparison basis for permanent public works — roads, bridges, dams, and perpetual maintenance funds — where a finite-horizon present worth would be an arbitrary choice.

**What goes into the annual term.** The annual amount may be an operating cost, a replacement cost, or both, and they simply add:
$$CC = FC + [A_{op} + (FC-SV)(A/F,i,n)]/i$$
If the recurring cost is deferred $k$ periods, discount the capitalized amount, $CC = FC + (A/i)(1+i)^{-k}$. If it escalates at rate $g$, use the growing perpetuity $A_1/(i-g)$. And if interest is compounded more often than annually, the $i$ in $A/i$ must be the effective rate per payment period, not the nominal rate.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Capitalized cost, level annual cost | $CC = FC + \frac{A}{i}$ | First cost at time 0 plus a perpetuity of operating costs. i is the rate per payment period, so convert a nominal rate first. |
| Capitalized cost with periodic replacement | $CC = FC + \frac{(FC-SV)(A/F,i,n)}{i}$ | Replacement every n years with salvage SV at each renewal; n is the service life, not the study period. |
| Replacement, zero salvage | $CC = FC\frac{(1+i)^n}{(1+i)^n - 1}$ | The SV = 0 special case. As n grows the multiplier approaches 1, since a longer-lived asset needs fewer renewals. |
| Capitalized cost via annual equivalent | $CC = \frac{FC(A/P,i,n) - SV(A/F,i,n)}{i}$ | Equivalent to the direct replacement formula; handy when an A/P factor is already on the table. |
| Sinking-fund factor | $(A/F,i,n) = \frac{i}{(1+i)^n - 1}$ | Converts a future lump into a level annual amount; note (A/P,i,n) = (A/F,i,n) + i. |
| Operating plus replacement | $CC = FC + \frac{A_{op} + (FC-SV)(A/F,i,n)}{i}$ | Both recurring burdens are capitalised once; do not capitalise the replacement and then also capitalise its own operating cost separately. |
| Deferred capitalized cost | $CC = FC + \frac{A}{i}(1+i)^{-k}$ | Recurring cost begins at the end of period k+1; the A/i amount already sits k periods before it. |
| Capitalized cost with escalation | $CC = FC + \frac{A_1}{i-g}$ | Annual cost A_1 next period growing at g forever; requires g < i or no finite capitalized cost exists. |

## Worked Problems

### P1. A bridge has a first cost of ₱2,000,000 and requires ₱150,000 per year of maintenance forever. Find its capitalized cost at 12%.

**Given:** $FC = 2000000$; $A = 150000$ per year; $i = 0.12$

**Solution:**

1. Capitalize the annual maintenance as a perpetuity: $A/i = 150000/0.12$.
2. $A/i = 1250000$.
3. Add the first cost: $CC = 2000000 + 1250000$.

> [!success]- Answer
> **$CC = 3250000$.**

> [!warning] Trap
> Multiplying the maintenance by the number of years the bridge is expected to last. Capitalized cost assumes perpetual service, so the maintenance stream is priced as a perpetuity at A/i, independent of any horizon.

### P2. A machine costs ₱500,000, has a 10-year life and a ₱50,000 salvage value, and must be replaced forever. Find its capitalized cost at 12%.

**Given:** $FC = 500000$; $n = 10$ years; $SV = 50000$; $i = 0.12$

**Solution:**

1. Sinking-fund factor: $(A/F,12\%,10) = 0.12/[(1.12)^{10} - 1] = 0.12/2.105848 = 0.05698416$.
2. Net replacement outlay per cycle: $FC - SV = 450000$.
3. Annualized replacement cost: $450000(0.05698416) = 25642.87$.
4. Capitalize it: $25642.87/0.12 = 213690.62$.
5. $CC = 500000 + 213690.62 = 713690.62$.

> [!success]- Answer
> **$CC = 713690.62$ (₱713,691).**

> [!warning] Trap
> Capitalizing the full ₱500,000 replacement and ignoring salvage, $500000(0.05698416)/0.12 = 237434.0$. That overstates the capitalized cost by ₱23,743 because the salvage recovered at every renewal offsets the next purchase.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `500000+450000×0.12÷(1.12^10−1)÷0.12` → $CC$ = **713690.62** — replacement, capitalisation and first cost in one line.
> 2. Annual-equivalent check: `(500000×0.12×1.12^10÷(1.12^10−1)−50000×0.12÷(1.12^10−1))÷0.12` → **713690.62**, the same number.

### P3. Compare two permanent alternatives at 10%. A: first cost ₱1,000,000, life 20 years, no salvage, ₱80,000 annual operating cost. B: first cost ₱1,500,000, life 40 years, no salvage, ₱40,000 annual operating cost.

**Given:** $i = 0.10$; A: $FC = 1000000$, $n = 20$, $A = 80000$; B: $FC = 1500000$, $n = 40$, $A = 40000$

**Solution:**

1. A: $(A/F,10\%,20) = 0.10/[(1.10)^{20} - 1] = 0.10/5.727500 = 0.0174596$; replacement = $1000000(0.0174596) = 17459.62$.
2. A annual total $= 80000 + 17459.62 = 97459.62$; $CC_A = 1000000 + 97459.62/0.10 = 1974596$.
3. B: $(A/F,10\%,40) = 0.10/[(1.10)^{40} - 1] = 0.10/44.259256 = 0.0022594$; replacement = $1500000(0.0022594) = 3389.12$.
4. B annual total $= 40000 + 3389.12 = 43389.12$; $CC_B = 1500000 + 43389.12/0.10 = 1933891$.
5. B is lower by $1974596 - 1933891 = 40705$.

> [!success]- Answer
> **Choose B: capitalized cost ₱1,933,891 against ₱1,974,596 for A, a saving of ₱40,705.**

> [!warning] Trap
> Choosing A because its first cost is ₱500,000 lower. Over a perpetual horizon B's 40-year life and lower annual operating cost more than repay the extra first cost.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000000+(80000+1000000×0.1÷(1.1^20−1))÷0.1` → $CC_A$ = **1974596.25**, with $(A/F,10\%,20)$ = **0.0174596**.
> 2. `1500000+(40000+1500000×0.1÷(1.1^40−1))÷0.1` → $CC_B$ = **1933891.22**; B is lower by **40705.03**, the note's ₱40,705.

### P4. A permanent maintenance programme pays ₱30,000 per year beginning at the end of year 6. Find its capitalized cost today at 8%.

**Given:** $A = 30000$ per year forever; first payment at end of year 6; $i = 0.08$

**Solution:**

1. Capitalize the stream as if it started at the end of year 1: $A/i = 30000/0.08 = 375000$.
2. That amount is positioned at the end of year 5, one period before the first payment.
3. Discount 5 periods: $(1.08)^{-5} = 0.680583$.
4. $P = 375000(0.680583) = 255218.7$.

> [!success]- Answer
> **$P = 255218.7$.**

> [!warning] Trap
> Discounting 6 periods because the first payment is in year 6. The capitalized amount A/i already sits at year 5, so the deferral is 5 periods; using 6 gives ₱236,313.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `30000÷0.08×1.08^-5` → $P$ = **255218.70** — $A/i$ sits at year 5, so the discount is five periods, not six.
> 2. Six periods, `1.08^-6`, would return **236313.61**, the trap value the note names.

### P5. A plant costs ₱3,000,000 and consumes ₱100,000 per year forever. Interest is 12% compounded monthly. Find the capitalized cost.

**Given:** $FC = 3000000$; $A = 100000$ per year; $r = 0.12$ compounded monthly

**Solution:**

1. Convert the nominal rate to an effective annual rate, since the payment period is one year: $i = (1+0.12/12)^{12} - 1$.
2. $(1.01)^{12} = 1.126825$, so $i = 0.126825$.
3. Capitalize: $A/i = 100000/0.126825 = 788487.89$.
4. $CC = 3000000 + 788487.89 = 3788487.89$.

> [!success]- Answer
> **$CC = 3788487.89$.**

> [!warning] Trap
> Dividing by the nominal 12% instead of the effective 12.68%. That gives ₱3,833,333 and overstates the capitalized cost by ₱44,845, because the annual payment must be capitalised at the rate the money actually earns per payment period.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(1+0.12÷12)^12−1` → $i$ = **0.126825** = **12.6825** % effective annual, because the payment period is one year.
> 2. `3000000+100000÷Ans` → $CC$ = **3788487.89** — `Ans` carries the effective rate straight into the capitalisation.

## Traps & Exam Notes

- **Multiplying an annual cost by a horizon instead of capitalising it.** A perpetual project converts every recurring cost with 1/i; a stated number of years makes it an annuity, not a capitalized cost.
- **Forgetting that salvage offsets each renewal.** The recurring outlay is FC - SV, not FC; the sinking-fund factor must be applied to the net amount.
- **Using the nominal rate when compounding is more frequent than payments.** A/i requires the effective rate per payment period.
- **Capitalising the first cost.** Only the recurring cost is divided by i; the first cost is already a present amount at time 0 and enters once.
- **Discounting a deferred perpetual cost by one period too many.** A/i sits one period before the first payment, so a stream starting at year k+1 is discounted k periods.
- **Comparing permanent alternatives on first cost.** Two perpetual alternatives differ in life and operating cost as well; only the full capitalized cost ranks them correctly.

## See Also

- [[04_Deferred_Annuities_and_Perpetuities]]
- [[03_Ordinary_Annuity_and_Annuity_Due]]
- [[07_PW,_FW_and_AW_Methods]]

---

[[05_Arithmetic_and_Geometric_Gradients|⬅ 05]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[07_PW,_FW_and_AW_Methods|07 ➡]]
