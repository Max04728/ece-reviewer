---
id: GEAS-06-10
title: "Funding, Burn Rate and Runway"
part: "03_GEAS"
area: "06_Engineering_Management_and_PM"
topic: 10
tier: 3
depth: full
problem_count: 0
prereqs: []
tags: ["ece", "geas", "engineering_management_and_pm"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Funding, Burn Rate and Runway

> [!abstract] Scope
> The venture funding stages and what each buys, how equity rounds dilute founders through pre- and post-money valuation, and how gross and net burn convert cash into runway.

## Core Concept

> [!tip] Intuition
> Funding buys time, and time is measured by runway. Each equity round trades a slice of ownership for months of cash, so the two numbers a founder must know cold are the post-money valuation (which sets the slice) and the net monthly burn (which sets the clock).

**Stages and the two instruments.** The venture ladder runs **pre-seed** (idea and first MVP, friends-and-family or angel money), **seed** (proving product-market fit), **Series A** (scaling a proven model), then **Series B** and **Series C** for expansion and late-stage growth. **Equity** sells ownership permanently: the money is never repaid, but each round dilutes existing holders and brings investor expectations of a multiple return. **Debt** keeps ownership intact but imposes interest and principal payments and can force default if cash flow stalls — which is why early ventures without predictable revenue rarely carry much of it. A funding round is priced off the **pre-money valuation** (what the company is worth before the cheque) and the **post-money valuation** (pre-money plus the investment); the investor's ownership is the investment divided by the **post-money** figure, so P20M into an P80M pre-money buys 20%, not 25%.

**Burn, runway and default alive.** **Gross burn** is total cash spent per month; **net burn** subtracts cash collected, so net burn = gross burn − monthly revenue. **Runway** is cash on hand divided by monthly **net** burn — the number of months until the bank balance reaches zero. Once the burn is *growing*, the simple division overstates the runway because later months cost more; the geometric version is the honest one. Paul Graham's **default alive / default dead** test asks the sharper question: on current growth and cost trends, will the company reach profitability before the cash runs out? A company can be default dead while still holding a year of runway, and default alive while nearly out of cash. Practically, a seed raise targets roughly 12–18 months of runway, enough to reach the next milestone and raise again from strength.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Post-money valuation | $\mathrm{post} = \mathrm{pre} + \mathrm{investment}$ | Always compute the post-money before quoting an ownership percentage; the pre-money alone is not the denominator. |
| Investor ownership | $\mathrm{stake} = \dfrac{\mathrm{investment}}{\mathrm{pre} + \mathrm{investment}}$ | P20M into an P80M pre-money buys 20%; dividing by the pre-money instead gives the wrong 25%. |
| Dilution per round | $\mathrm{prior\ holders'} = \mathrm{prior\ \%} \times (1 - \mathrm{new\ investor\ \%})$ | Rounds compound multiplicatively; adding the percentages across rounds overstates total dilution. |
| Gross burn | $\mathrm{gross\ burn} = \mathrm{cash\ out\ per\ month}$ | Ignores all collections; the right figure for cost discipline, the wrong one for runway once revenue exists. |
| Net burn | $\mathrm{net\ burn} = \mathrm{cash\ out} - \mathrm{cash\ in}$ | What actually drains the bank; if revenue exceeds spending the net burn is negative and the runway is unlimited. |
| Runway (constant burn) | $\mathrm{runway\ (months)} = \dfrac{\mathrm{cash\ on\ hand}}{\mathrm{net\ burn\ per\ month}}$ | Valid only while the burn is steady; overstates survival when spending grows each month. |
| Runway (burn growing at g) | $N = \dfrac{\ln\left(1 + \dfrac{\mathrm{cash} \times g}{\mathrm{burn}_0}\right)}{\ln(1+g)}$ | burn_0 is this month's burn and g the monthly growth rate; for cash P1.2M, burn_0 P100k and g = 10% this gives 8.3 months, not 12. |
| Default alive test | $\mathrm{revenue\ growth} \Rightarrow \mathrm{profitable\ before\ cash\ =\ 0}$ | Graham's heuristic: on current trends, does the company reach break-even in time? Otherwise it is default dead. |
| Target runway per raise | $12\!-\!18\ \mathrm{months}$ | Enough to hit the next milestone; raising less forces a fast follow-on round at a weak price. |
| Funding stages | $\mathrm{pre\!-\!seed} \to \mathrm{seed} \to \mathrm{A} \to \mathrm{B} \to \mathrm{C}$ | Pre-seed = idea/MVP, seed = product-market fit, A = scale, B and C = expansion and late stage. |
| Equity vs debt | $\mathrm{no\ repayment,\ dilution} \mid \mathrm{repayment\ +\ interest,\ no\ dilution}$ | Equity never matures but dilutes; debt preserves ownership but adds fixed obligations and default risk. |
| Cash-in-bank rule | $\mathrm{runway\ unchanged\ until\ funds\ clear}$ | A signed term sheet is not cash; runway is computed from the bank balance, not from committed money. |

## Traps & Exam Notes

- **Dividing the investment by the pre-money valuation.** P20M for a P80M pre-money is 25% of the *pre*-money; the stake is P20M/(P80M + P20M) = 20%.
- **Using gross burn for runway after revenue starts.** Runway uses net burn, so quoting gross burn understates survival; conversely, ignoring collections entirely can make a profitable month look fatal.
- **Dividing cash by the current burn when burn is growing.** The simple formula gave 12 months for a P1.2M balance at P100k/month, but at 10% monthly growth the money lasts about 8.3 months.
- **Adding dilution percentages across rounds.** A 20% round followed by another 20% round leaves founders with 0.8 x 0.8 = 64%, not 60%; rounds multiply.
- **Counting a signed term sheet as runway.** Until the funds are in the bank the burn continues unchanged, and the deadline for the next milestone does not move.

## See Also

- [[09_Market_Sizing_TAM,_SAM,_SOM]]
- [[07_Lean_Startup_and_MVP]]

---

[[09_Market_Sizing_TAM,_SAM,_SOM|⬅ 09]] · [[_MOC_Engineering_Management_and_PM|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
