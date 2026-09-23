---
id: GEAS-05-13
title: "Replacement Analysis"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 13
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_PW,_FW_and_AW_Methods]]", "[[10_Depreciation_SLM_and_SYD]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — Replacement Analysis

> [!abstract] Scope
> Decide whether an existing asset should be kept or replaced, using equivalent annual cost, marginal cost and the economic life of the challenger.

## Core Concept

> [!tip] Intuition
> An asset you already own costs you whatever it could be sold for today — that forgone cash is its real price of staying. Replacement analysis compares the cost of one more year of the old machine against the average annual cost of the best available new one.

**Defender and challenger, and the sunk-cost rule.** The defender is the asset in use; the challenger is the proposed replacement. The defender's original purchase price and its book value are both irrelevant — they are sunk. What matters is its current market value, because keeping the asset means forgoing the cash it would fetch today, and that forgone amount is the opportunity cost with which the defender enters the comparison. The challenger enters at its purchase price. This single substitution of market value for original cost is the heart of replacement analysis and the most frequently examined step.

**Economic life and equivalent annual cost.** An asset can be kept for any number of years up to its physical life, and each holding period implies a different average annual cost:
$$EUAC_k = \left[FC + \sum_{t=1}^{k} O\&M_t(P/F,i,t) - SV_k(P/F,i,k)\right](A/P,i,k)$$
The economic life is the $k$ that minimises $EUAC_k$. Keeping an asset past that point raises the average cost even though the machine still runs, because rising maintenance and falling resale value eventually outweigh the declining capital charge. Note that the first cost here is the purchase price for a challenger and the current market value for a defender.

**The marginal-cost shortcut.** Instead of tabulating every EUAC, compute the cost of holding the defender one more year:
$$MC = MV_{t-1}\,i + (MV_{t-1} - MV_t) + O\&M_t$$
that is, the interest on the capital tied up, the loss in resale value, and the operating cost. The rule is to keep the defender while its marginal cost is below the challenger's minimum EUAC, and to replace as soon as it exceeds it. The marginal cost and the average-cost curve are linked exactly as in economics: while the marginal year costs less than the average, the average falls, so the minimum EUAC occurs where the marginal cost crosses the average from below.

**Comparison mechanics and the rate.** The challenger must be evaluated over its economic life, not over its first year and not over its physical life, because a replacement decision is implicitly repeated forever. Alternatives with different lives must be compared on an annual-equivalent basis — annual worth or EUAC — never on first cost and never on present worth over unequal horizons. Working capital recovered at the end of the study and any salvage value of the defender or challenger enter as receipts. The interest rate is the MARR, and a higher MARR shortens the economic life because future costs and future resale values are discounted more heavily.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Equivalent uniform annual cost | $EUAC_k = \left[FC + \sum_{t=1}^{k} A_t(P/F,i,t) - SV_k(P/F,i,k)\right](A/P,i,k)$ | A_t is the operating and maintenance cost of year t. FC is the purchase price for a challenger and the current market value for a defender. |
| Economic life | $EUAC_{k^*} = \min_{k} EUAC_k$ | Not the physical life. Replace at the end of the economic life even if the asset still operates. |
| Marginal cost of one more year | $MC_t = MV_{t-1}\,i + (MV_{t-1} - MV_t) + A_t$ | Three parts: interest on tied-up capital, loss of resale value, and the year's operating cost A_t. |
| Replacement decision rule | $MC_{defender} > EUAC_{challenger,min} \Rightarrow \mathrm{replace}$ | Keep the defender while its marginal cost is the smaller of the two. |
| Annual cost from capital recovery | $EUAC = FC(A/P,i,n) - SV(A/F,i,n) + A$ | The quick two-factor form; A is the level annual operating and maintenance cost. |
| Defender's relevant capital cost | $FC_{defender} = \mathrm{current\ market\ value}$ | Never the original cost and never the book value; only the cash actually forgone by keeping it. |
| Capital recovery identity | $(A/P,i,n) = (A/F,i,n) + i$ | The i term is interest on the unrecovered balance; the A/F term returns the principal. |
| Minimum-cost life condition | $MC_{k^*} = EUAC_{k^*}$ | At the economic life the marginal year's cost equals the average; before it MC < EUAC, after it MC > EUAC. |

## Worked Problems

### P1. A defender has a current market value of ₱300,000 and will be worth ₱220,000 in one year; its operating cost next year is ₱60,000 and money is worth 12%. The best challenger has a minimum EUAC of ₱150,000 per year. Should the defender be kept one more year?

**Given:** $MV_0 = 300000$; $MV_1 = 220000$; $O\&M_1 = 60000$; $i = 0.12$; $EUAC_{challenger} = 150000$

**Solution:**

1. Interest on the capital tied up: $MV_0\,i = 300000(0.12) = 36000$.
2. Loss of resale value: $MV_0 - MV_1 = 300000 - 220000 = 80000$.
3. Marginal cost: $MC_1 = 36000 + 80000 + 60000 = 176000$.
4. Compare with the challenger: $176000 > 150000$, so replacement is cheaper.

> [!success]- Answer
> **Replace now; keeping the defender one more year costs ₱176,000 against ₱150,000 for the challenger.**

> [!warning] Trap
> Omitting the ₱36,000 of interest on the tied-up market value and reporting a marginal cost of ₱140,000. That makes the defender look cheaper than the challenger and reverses the recommendation.

### P2. A challenger costs ₱1,000,000, needs ₱100,000 of operating cost in year 1 rising by ₱100,000 each year, and can be resold for ₱700,000, ₱500,000 or ₱350,000 after 1, 2 or 3 years. At 10%, find its economic life.

**Given:** $FC = 1000000$; $O\&M = 100000, 200000, 300000$; $SV = 700000, 500000, 350000$; $i = 0.10$

**Solution:**

1. $k=1$: $EUAC_1 = [1000000 - 700000(0.909091) + 100000(0.909091)](1.10) = 454545.5(1.10) = 500000$.
2. $k=2$: $PW = 1000000 + 256198.3 - 413223.1 = 842975.2$; $(A/P,10\%,2) = 0.5761905$; $EUAC_2 = 485714$.
3. $k=3$: $PW = 1000000 + 481592.8 - 262960.2 = 1218632.6$; $(A/P,10\%,3) = 0.4021148$; $EUAC_3 = 490030$.
4. The minimum is at $k = 2$: ₱485,714 against ₱500,000 and ₱490,030.

> [!success]- Answer
> **Economic life = 2 years, with $EUAC_{min} = 485714$.**

> [!warning] Trap
> Taking the physical life or the year with the lowest operating cost. The economic life minimises the average annual cost, which balances a falling capital charge against rising maintenance; here that is year 2.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(1000000+(100000−700000)÷1.1)×1.1` → $EUAC_1$ = **500000**.
> 2. `(1000000+100000÷1.1+(200000−500000)÷1.1^2)×0.1×1.1^2÷(1.1^2−1)` → $EUAC_2$ = **485714.29**.
> 3. `(1000000+100000÷1.1+200000÷1.1^2+(300000−350000)÷1.1^3)×0.1×1.1^3÷(1.1^3−1)` → $EUAC_3$ = **490030.21**: the minimum, and so the economic life, is at $k$ = **2**.

### P3. Using marginal cost, verify the economic life found in the previous problem.

**Given:** $MV = 1000000, 700000, 500000, 350000$; $O\&M = 100000, 200000, 300000$; $i = 0.10$

**Solution:**

1. $MC_1 = 1000000(0.10) + (1000000-700000) + 100000 = 100000 + 300000 + 100000 = 500000$, equal to $EUAC_1$.
2. $MC_2 = 700000(0.10) + (700000-500000) + 200000 = 70000 + 200000 + 200000 = 470000$.
3. $MC_2 = 470000 < EUAC_2 = 485714$, so adding year 2 lowers the average — keep through year 2.
4. $MC_3 = 500000(0.10) + (500000-350000) + 300000 = 50000 + 150000 + 300000 = 500000$.
5. $MC_3 = 500000 > EUAC_2 = 485714$, so year 3 raises the average — stop at 2 years.

> [!success]- Answer
> **Economic life = 2 years, confirmed: the marginal cost crosses the average between years 2 and 3.**

> [!warning] Trap
> Stopping as soon as the marginal cost rises. The rule is to keep while MC < EUAC, so year 3 is rejected at ₱500,000 against ₱485,714 — a ₱14,286 gap, not a comparison against the year-1 figure.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain the three marginal years with `ALPHA` `:` — `1000000×0.1+(1000000−700000)+100000 : 700000×0.1+(700000−500000)+200000 : 500000×0.1+(500000−350000)+300000` → **500000** → **470000** → **500000**.
> 2. $MC_2$ = **470000** is below $EUAC_2$ = **485714**, so year 2 pulls the average down; $MC_3$ = **500000** is above it, so year 3 pushes it up — stop at **2** years.

### P4. A defender has a market value of ₱300,000, a remaining life of 3 years, a ₱50,000 resale value at the end of that time and ₱120,000 annual operating cost. A challenger costs ₱400,000, has a minimum EUAC of ₱210,000 and is available now. At 10%, keep or replace?

**Given:** Defender: $MV = 300000$, $SV = 50000$, $O\&M = 120000$, $n = 3$; Challenger: $EUAC_{min} = 210000$; $i = 0.10$

**Solution:**

1. Defender's annual cost: $EUAC_d = [300000 + 120000(P/A,10\%,3) - 50000(P/F,10\%,3)](A/P,10\%,3)$.
2. $(P/A,10\%,3) = 2.486852$, $(P/F,10\%,3) = 0.751315$, $(A/P,10\%,3) = 0.402115$.
3. $PW_d = 300000 + 298422.2 - 37565.7 = 560856.5$.
4. $EUAC_d = 560856.5(0.402115) = 225529$.
5. $225529 > 210000$, so the challenger is cheaper.

> [!success]- Answer
> **Replace: the defender's EUAC of ₱225,529 exceeds the challenger's ₱210,000.**

> [!warning] Trap
> Entering the defender at its original cost or at its book value. The defender's relevant first cost is the ₱300,000 market value — the cash forgone by keeping it. Using a lower book value makes the defender look artificially cheap.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `300000+120000((1.1)^3−1)÷(0.1(1.1)^3)−50000×1.1^-3` → $PW_d$ = **560856.50**.
> 2. `Ans×0.1×1.1^3÷(1.1^3−1)` → $EUAC_d$ = **225528.70**, above the challenger's **210000**, so replace.

### P5. For the defender in the previous problem, compute the marginal cost of keeping it one more year if its market value falls to ₱200,000 in one year, and check the decision rule.

**Given:** $MV_0 = 300000$; $MV_1 = 200000$; $O\&M_1 = 120000$; $i = 0.10$; $EUAC_{challenger} = 210000$

**Solution:**

1. Interest on tied-up capital: $300000(0.10) = 30000$.
2. Loss of resale value: $300000 - 200000 = 100000$.
3. Marginal cost: $MC_1 = 30000 + 100000 + 120000 = 250000$.
4. $250000 > 210000$, so the first year of continued ownership already fails the test.

> [!success]- Answer
> **$MC_1 = 250000 > 210000$: replace immediately.**

> [!warning] Trap
> Reporting the marginal cost as ₱220,000 by leaving out the ₱30,000 interest on the tied-up market value. The opportunity cost of not selling is part of the cost of keeping, and omitting it narrows the margin against the challenger unnecessarily.

## Traps & Exam Notes

- **Using the defender's original cost or book value.** Only the current market value enters, because that is the cash forgone by keeping the asset. Original cost is sunk and book value is an accounting residual.
- **Comparing first costs directly.** A challenger with a higher purchase price can still be cheaper; the comparison is between annual-equivalent costs over the respective economic lives.
- **Evaluating the challenger over its first year or its physical life.** Use the economic life that minimises its EUAC; a first-year cost usually overstates the challenger and a physical-life average usually understates it.
- **Omitting interest on the tied-up market value from the marginal cost.** MC = MV(i) + loss in resale value + O&M. Dropping the interest term understates the cost of keeping the defender.
- **Comparing present worths of unequal lives.** Replacement horizons differ; annual worth or EUAC is the only valid common basis.
- **Ignoring rising maintenance and falling resale value.** An asset does not become uneconomic because it is old, but because the marginal year eventually costs more than a new asset's average year.

## See Also

- [[07_PW,_FW_and_AW_Methods]]
- [[11_Depreciation_DB_and_DDB]]
- [[12_Break-Even_and_Cost_Analysis]]

---

[[12_Break-Even_and_Cost_Analysis|⬅ 12]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
