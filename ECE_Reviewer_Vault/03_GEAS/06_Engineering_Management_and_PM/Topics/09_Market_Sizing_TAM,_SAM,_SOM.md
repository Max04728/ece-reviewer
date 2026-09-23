---
id: GEAS-06-09
title: "Market Sizing: TAM, SAM, SOM"
part: "03_GEAS"
area: "06_Engineering_Management_and_PM"
topic: 9
tier: 3
depth: full
problem_count: 0
prereqs: []
tags: ["ece", "geas", "engineering_management_and_pm"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Market Sizing: TAM, SAM, SOM

> [!abstract] Scope
> Define TAM, SAM and SOM, separate the top-down from the bottom-up estimate, and check both against each other with a worked arithmetic example.

## Core Concept

> [!tip] Intuition
> Three nested circles: everyone who could ever buy (TAM), the part your business model and geography can actually reach (SAM), and the slice you can realistically win in the near term (SOM). Each step is a filter, so the numbers must shrink.

**The three definitions.** **TAM (Total Addressable Market)** is the revenue available if you served every possible customer with no constraint of geography, channel or competition — the theoretical ceiling. **SAM (Serviceable Available Market)** is the portion of TAM that your business model, product scope and geography can actually serve. **SOM (Serviceable Obtainable Market)** is the share of SAM you can realistically capture in the planning period given competition, brand and capacity. The nesting is non-negotiable: $\mathrm{SOM} \le \mathrm{SAM} \le \mathrm{TAM}$, and each level must be justified by a named filter rather than by a round-number guess.

**Top-down versus bottom-up.** The **top-down** method starts from an industry, population or spend figure and narrows it with percentages; it is fast and good for framing, but every percentage is an assumption that multiplies the error. The **bottom-up** method builds from your own unit economics — reachable customers times units per customer per year times price — and is defensible because each factor can be checked against reality: sales capacity, channel reach, average order size. A serious answer gives both and cross-checks them: if top-down and bottom-up land orders of magnitude apart, one assumption is wrong. Watch the bases: percentages must be applied to the level they describe, and all figures must be annual before multiplying, or the answer comes out twelve times off.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| TAM, top-down | $\mathrm{TAM} = \mathrm{population} \times \mathrm{annual\ spend\ per\ customer}$ | Applied to *everyone* who could conceivably buy, with no geographic or competitive filter. |
| TAM, bottom-up | $\mathrm{TAM} = \mathrm{total\ units\ sold\ in\ the\ market} \times \mathrm{price}$ | Build from industry volumes and price; both factors must refer to the same period. |
| SAM | $\mathrm{SAM} = \mathrm{TAM} \times \mathrm{reachable\ share}$ | The filter is your model, product scope and geography — not your sales ability. |
| SOM | $\mathrm{SOM} = \mathrm{SAM} \times \mathrm{obtainable\ share}$ | Near-term, competition- and capacity-limited; this is the number that belongs in a revenue forecast. |
| Nesting check | $\mathrm{SOM} \le \mathrm{SAM} \le \mathrm{TAM}$ | Any inversion means a percentage was applied to the wrong base or the filters were applied out of order. |
| Top-down chain | $\mathrm{TAM} \xrightarrow{\times\ \mathrm{reach\%}} \mathrm{SAM} \xrightarrow{\times\ \mathrm{share\%}} \mathrm{SOM}$ | The two percentages are applied sequentially, so their effect compounds rather than adds. |
| Bottom-up chain | $\mathrm{SOM} = \mathrm{customers\ reachable} \times \mathrm{units\ per\ year} \times \mathrm{price}$ | Every factor must be annual and per the same customer base; mixing monthly price with annual units is a 12x error. |
| Combined filter effect | $\dfrac{\mathrm{SOM}}{\mathrm{TAM}} = \mathrm{reach\%} \times \mathrm{share\%}$ | 20% reach and 5% obtainable give 1% of TAM, not 25% and not 100%. |
| Cross-check ratio | $\dfrac{\mathrm{top\ down}}{\mathrm{bottom\ up}} \approx 1$ | Both methods should land in the same order of magnitude; a 100x gap means an assumption is broken. |
| Worked example | $\mathrm{TAM} = 20\mathrm{M} \times 5{,}000 = \mathrm{P}100\mathrm{B};\ \mathrm{SAM} = 0.20(100\mathrm{B}) = \mathrm{P}20\mathrm{B};\ \mathrm{SOM} = 0.05(20\mathrm{B}) = \mathrm{P}1\mathrm{B}$ | 20 million target households, P5,000 annual spend, 20% reachable, 5% obtainable share. |
| Worked SOM as share of TAM | $\dfrac{\mathrm{P}1\mathrm{B}}{\mathrm{P}100\mathrm{B}} = 0.01 = 1\%$ | Equals 20% x 5%; the compounding is the point examiners check. |

## Traps & Exam Notes

- **Reporting SAM as the year-one forecast.** SAM is what the model can *reach*; SOM is what is *obtainable* in the period. Quoting SAM overstates a start-up's plan by the competitive share it never had.
- **Adding the two filter percentages.** Reach of 20% and share of 5% multiply to 1% of TAM, not 25%; treating them as additive inflates SOM 25-fold.
- **Mixing time bases in a bottom-up build.** Customers x units per year x monthly price, or annual units with a monthly subscription price, throws the answer off by 12x.
- **Using total population for TAM without targeting.** Not everyone is a buyer; applying the targeting percentage after the spend figure (instead of before) multiplies the wrong base.
- **Presenting one unsupported number.** A defensible answer states the method (top-down, bottom-up or both) and shows SOM <= SAM <= TAM; a single round figure with no derivation is unmarkable.

## See Also

- [[08_Business_Model_Canvas_and_SWOT]]
- [[10_Funding,_Burn_Rate_and_Runway]]

---

[[08_Business_Model_Canvas_and_SWOT|⬅ 08]] · [[_MOC_Engineering_Management_and_PM|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Funding,_Burn_Rate_and_Runway|10 ➡]]
