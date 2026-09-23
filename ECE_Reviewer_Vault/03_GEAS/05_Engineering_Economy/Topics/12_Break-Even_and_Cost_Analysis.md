---
id: GEAS-05-12
title: "Break-Even and Cost Analysis"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_PW,_FW_and_AW_Methods]]", "[[03_Ordinary_Annuity_and_Annuity_Due]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Break-Even and Cost Analysis

> [!abstract] Scope
> Find the volume, output or utilization at which revenue covers cost, and the point at which one alternative becomes cheaper than another.

## Core Concept

> [!tip] Intuition
> Fixed costs are paid whether or not you produce; variable costs rise with every unit. Each unit sold therefore carries a fixed contribution toward the costs already committed, and break-even is the moment those contributions have covered the commitment exactly.

**Cost structure and the break-even quantity.** Total cost is $TC = FC + vQ$ and total revenue is $TR = pQ$, where $Q$ is quantity per period, $p$ the price per unit, $v$ the variable cost per unit and $FC$ the fixed cost per period. Setting them equal gives $Q^* = FC/(p-v)$. The denominator $p-v$ is the contribution margin: what each unit leaves behind to absorb fixed cost. Every extra unit beyond $Q^*$ adds $p-v$ straight to profit, and every unit short of it leaves that much fixed cost uncovered.

**Why the formula is a division and when it fails.** Because both revenue and cost are linear in $Q$, the profit line $(p-v)Q - FC$ is linear too, and it crosses zero exactly once, at $FC/(p-v)$, provided $p > v$. If $p < v$ the contribution margin is negative and profit falls as volume rises: the product loses money at every level of output and no break-even quantity exists. If $p = v$ the lines are parallel and the product never covers its fixed cost. Break-even can also be expressed in sales pesos, $TR^* = FC/(1 - v/p)$, or as a percentage of capacity, $Q^*/Q_{cap}$, which is the operating-leverage warning light: an 85% break-even load leaves little room for a demand shortfall.

**Two-alternative and make-versus-buy break-even.** Comparing two ways of doing the same job means setting their total costs equal:
$$FC_1 + v_1Q = FC_2 + v_2Q$$
so $Q^* = (FC_2-FC_1)/(v_1-v_2)$. Below the crossover the alternative with the lower fixed cost is cheaper; above it the alternative with the lower variable cost wins. That is why automation — high fixed cost, low variable cost — only pays at high volume, and why manual or outsourced production is preferred at low volume. If the option with the higher fixed cost also has the higher variable cost, it is dominated and never chosen; if the variable costs are equal, the break-even does not exist.

**Adding time value.** When the alternatives have different capital investments, the investments must first be converted to an annual cost with the capital-recovery factor, $FC_{annual} = FC(A/P,i,n)$, before they can enter the break-even equation. Treating a first cost as if it were incurred every year, or as if it were free, is the classic analytical error. Salvage value reduces the annual capital cost through the $(A/F,i,n)$ term, and the rate used is the MARR or the 'rate money is worth' stated in the problem.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Total cost | $TC = FC + vQ$ | v is per unit and FC is per period; both must refer to the same period as Q. |
| Total revenue | $TR = pQ$ | Assumes a single constant selling price; a quantity discount breaks the linearity. |
| Break-even quantity | $Q^* = \frac{FC}{p-v}$ | Requires p > v. If p <= v no positive break-even quantity exists. |
| Contribution margin | $CM = p - v$ | Pesos per unit available to absorb fixed cost; profit rises by exactly this amount per extra unit. |
| Profit at a volume | $\pi = (p-v)Q - FC$ | Negative below Q*, positive above it. Includes only the costs listed in the model. |
| Break-even revenue | $TR^* = \frac{FC}{1 - v/p}$ | Also FC p/(p-v). Use when the question asks for pesos of sales rather than units. |
| Volume for a target profit | $Q = \frac{FC + \pi_{target}}{p-v}$ | The target profit is added to fixed cost, not to revenue, because every unit contributes only p-v. |
| Two-alternative break-even | $Q^* = \frac{FC_2 - FC_1}{v_1 - v_2}$ | Below Q* choose the lower-fixed-cost option, above it the lower-variable-cost option. Denominators must be ordered consistently. |
| Break-even as percent of capacity | $\%\ capacity = \frac{Q^*}{Q_{cap}} \times 100$ | A high percentage means high operating leverage: little margin before losses begin. |
| Annualised first cost for break-even | $FC_{annual} = FC(A/P,i,n)$ | Required whenever alternatives have different capital investments; salvage enters as -SV(A/F,i,n). |

## Worked Problems

### P1. A product sells for ₱400 per unit, has a variable cost of ₱250 per unit and fixed costs of ₱1,500,000 per year. Find the break-even quantity and the break-even sales revenue.

**Given:** $p = 400$; $v = 250$; $FC = 1500000$ per year

**Solution:**

1. Contribution margin: $p - v = 400 - 250 = 150$ per unit.
2. $Q^* = FC/(p-v) = 1500000/150 = 10000$ units.
3. Break-even revenue: $TR^* = 10000(400) = 4000000$.
4. Check by the formula: $FC/(1-v/p) = 1500000/(1-0.625) = 1500000/0.375 = 4000000$.

> [!success]- Answer
> **$Q^* = 10000$ units; break-even revenue ₱4,000,000.**

> [!warning] Trap
> Dividing fixed cost by the selling price, 1500000/400 = 3750 units. That ignores the ₱250 of variable cost every unit carries; the correct divisor is the contribution margin.

### P2. Using the same product, how many units must be sold to earn ₱300,000 per year?

**Given:** $p = 400$; $v = 250$; $FC = 1500000$; $\pi_{target} = 300000$

**Solution:**

1. Add the target profit to fixed cost: $Q = (FC + \pi_{target})/(p-v)$.
2. $Q = (1500000 + 300000)/150$.
3. $Q = 1800000/150 = 12000$ units.
4. Check: $\pi = 150(12000) - 1500000 = 1800000 - 1500000 = 300000$.

> [!success]- Answer
> **$Q = 12000$ units, i.e. 2,000 units above break-even.**

> [!warning] Trap
> Adding the target to revenue and then dividing by price, or adding 300000/400 = 750 units to the break-even volume. Each extra unit contributes only ₱150, so 2,000 more units are needed.

### P3. Making a component in-house costs ₱2,000,000 per year in fixed cost plus ₱120 per unit. Buying it costs ₱400,000 per year in fixed cost plus ₱220 per unit. Find the indifference quantity and state the rule.

**Given:** Make: $FC = 2000000$, $v = 120$; Buy: $FC = 400000$, $v = 220$

**Solution:**

1. Set the total costs equal: $2000000 + 120Q = 400000 + 220Q$.
2. Collect terms: $1600000 = 100Q$.
3. $Q^* = 16000$ units.
4. Check at 16000: make $= 2000000 + 1920000 = 3920000$; buy $= 400000 + 3520000 = 3920000$.
5. Above 16,000 units the lower variable cost favours making; below it the lower fixed cost favours buying.

> [!success]- Answer
> **$Q^* = 16000$ units; make above it, buy below it.**

> [!warning] Trap
> Dividing the fixed-cost difference by the variable-cost difference in the wrong order, 100/1600000, which produces a meaningless quantity near zero. The cost difference goes on top and the per-unit saving on the bottom.

### P4. A plant has a capacity of 50,000 units per year, fixed costs of ₱3,000,000, variable cost ₱80 per unit and a price of ₱150 per unit. Find the break-even quantity and express it as a percentage of capacity.

**Given:** $Q_{cap} = 50000$; $FC = 3000000$; $v = 80$; $p = 150$

**Solution:**

1. Contribution margin: $150 - 80 = 70$ per unit.
2. $Q^* = 3000000/70 = 42857.1$ units.
3. Share of capacity: $42857.1/50000 = 0.8571$.
4. So the plant must run at 85.71% of capacity merely to cover its costs.

> [!success]- Answer
> **$Q^* = 42857$ units, or 85.7% of capacity.**

> [!warning] Trap
> Concluding the project is safe because break-even lies 'below capacity'. An 85.7% break-even load leaves only 14.3% of demand as a cushion, and profit is zero across all of it.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3000000÷(150−80)` → $Q^*$ = **42857.14** units — the divisor is the contribution margin, not the price.
> 2. `Ans÷50000×100` → **85.71** % of capacity; the `Ans` chain keeps the fractional quantity exact.

### P5. A machine costs ₱5,000,000, has a 5-year life, no salvage, and money is worth 12%. It makes a part that sells for ₱300 and uses ₱100 of variable cost. Other fixed costs are ₱800,000 per year. Find the break-even quantity.

**Given:** $FC_{capital} = 5000000$; $n = 5$; $i = 0.12$; $p = 300$; $v = 100$; $FC_{other} = 800000$

**Solution:**

1. Convert the investment to an annual cost: $(A/P,12\%,5) = 0.2774097$.
2. $FC_{annual} = 5000000(0.2774097) = 1387048.7$.
3. Total annual fixed cost: $1387048.7 + 800000 = 2187048.7$.
4. Contribution margin: $300 - 100 = 200$ per unit.
5. $Q^* = 2187048.7/200 = 10935.2$ units.

> [!success]- Answer
> **$Q^* = 10935$ units per year.**

> [!warning] Trap
> Treating the ₱5,000,000 first cost as a fixed cost of the first year, (5000000+800000)/200 = 29,000 units. Capital cost must be annualised with (A/P,i,n) before it enters the break-even equation.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5000000×0.12×1.12^5÷(1.12^5−1)` → $FC_{annual}$ = **1387048.66** — the first cost is annualised, not charged once.
> 2. `(Ans+800000)÷(300−100)` → $Q^*$ = **10935.24**, i.e. **10935** units per year.

## Traps & Exam Notes

- **Dividing fixed cost by price.** The divisor is the contribution margin p - v. Using price alone understates break-even by the ratio p/(p-v).
- **Adding a target profit to revenue.** Profit targets add to fixed cost, because each unit contributes only the margin, not the full price.
- **Reversing the ratio in a two-alternative break-even.** The numerator is the difference in fixed costs and the denominator the difference in unit variable costs; inverting it gives a meaningless quantity.
- **Choosing on unit variable cost alone.** At low volume the option with the higher variable cost and much lower fixed cost can be cheaper; the crossover quantity decides.
- **Leaving the capital cost unannualised.** A first cost is a present amount; using it as a yearly fixed cost overstates break-even by a factor of roughly 1/(A/P,i,n).
- **Confusing accounting break-even with economic break-even.** If the capital investment is annualised at the MARR, the break-even quantity found covers the cost of capital and leaves zero economic profit; if the first cost is omitted or straight-lined, the same calculation reports an accounting break-even that silently ignores the cost of money.

## See Also

- [[07_PW,_FW_and_AW_Methods]]
- [[08_Rate_of_Return_and_Payback]]
- [[13_Replacement_Analysis]]

---

[[11_Depreciation_DB_and_DDB|⬅ 11]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Replacement_Analysis|13 ➡]]
