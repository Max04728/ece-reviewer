---
id: GEAS-01-05
title: "Limiting Reagents and Yield"
part: "03_GEAS"
area: "01_General_Chemistry"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Mole_Concept_and_Stoichiometry]]"]
tags: ["ece", "geas", "general_chemistry"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Limiting Reagents and Yield

> [!abstract] Scope
> Identify which reactant runs out first, then compute the theoretical product, the leftover excess and the yield actually obtained.

## Core Concept

> [!tip] Intuition
> Two reactants, one recipe. The limiting reagent is whichever one forces the other to stop early, and the test is a division: moles divided by that reactant's own coefficient. The smallest quotient is the number of times the recipe can run.

**The method, and why the division works.** Convert every reactant to moles, divide each by its own balanced coefficient $\nu_i$, and the smallest quotient $n_i/\nu_i$ marks the limiting reagent. The quotient answers a physical question — how many complete batches of the reaction this reactant can support — so comparing quotients compares like with like. Comparing raw mole counts does not: in $\mathrm{N_2} + 3\mathrm{H_2} \to 2\mathrm{NH_3}$, $5.00\ \mathrm{mol}$ of $\mathrm{H_2}$ is more moles than $2.00\ \mathrm{mol}$ of $\mathrm{N_2}$ yet hydrogen is limiting because each batch of ammonia consumes three $\mathrm{H_2}$ for every one $\mathrm{N_2}$.

**Everything downstream comes from the limiting reagent.** The theoretical yield is computed from the limiting reagent only, using the ordinary mass-to-mass chain. The leftover excess is initial minus consumed, where the consumed amount comes from the limiting reagent through the coefficient ratio — not from a subtraction of masses. And percent yield is actual over theoretical for the limiting reagent's product, times 100. Compute the theoretical yield from the excess reagent instead and you will routinely report yields above 100%, which is physically impossible and is the marker the examiner is looking for.

**The disguises the board uses.** One reactant is usually supplied in excess deliberately — 'burned in excess oxygen', 'treated with excess acid' — so that the limiting reagent is unambiguous and you can go straight to the yield. In harder items one reactant is a pure substance given in grams and the other is a solution given in mL and molarity, so the moles arrive through two different formulae ($n = m/M$ and $n = MV$). The unit conversion for the solution volume is where most lost marks happen, because 25.0 mL used as 25.0 L is a 1000-fold error that produces a limiting-reagent verdict that is often still correct, hiding the mistake until the final mass.

**Excess as a number the examiner asks for.** A frequent second part is 'how much of the excess reagent remains?' The consumed moles of the excess reagent equal $n_{LR} \times (\nu_{excess}/\nu_{LR})$, and the remainder converts back to grams through its molar mass. For a 1:1 stoichiometry this collapses to initial minus consumed, which is why candidates remember the simple case and then apply it to a 1:2 reaction where it is wrong by a factor of two.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Limiting-reagent test | $\mathrm{LR} = \mathrm{smallest\ } \frac{n_i}{\nu_i}$ | n in mol, nu the balanced coefficient. The quotient is the number of complete reaction batches; the smallest one runs out first. |
| Moles from mass or solution | $n = \frac{m}{M} \quad \mathrm{or} \quad n = MV$ | V in litres inside MV. Mixing mL with mol/L is a 1000x error that leaves the limiting-reagent verdict unchanged. |
| Theoretical yield | $m_{\mathrm{theory}} = \frac{n_{LR}}{\nu_{LR}} \times \nu_{product} \times M_{product}$ | Built from the LIMITING reagent only. Using the excess reagent overstates the yield and can exceed 100%. |
| Excess reagent consumed | $n_{ex,\,consumed} = n_{LR} \times \frac{\nu_{ex}}{\nu_{LR}}$ | 1:1 stoichiometry reduces to 'consumed equals n_LR'; for A + 2B the consumed B is TWICE the A consumed. |
| Excess remaining | $n_{ex,\,left} = n_{ex,\,initial} - n_{ex,\,consumed}$ | In moles. Convert to grams afterwards with M; subtracting the product mass from the excess mass is meaningless. |
| Percent yield | $\%\ \mathrm{yield} = \frac{\mathrm{actual\ mass}}{\mathrm{theoretical\ mass}} \times 100$ | Must be at most 100% for a clean dry sample. Above 100% means wet or impure product, or the wrong theoretical yield. |
| Percent loss | $\mathrm{loss} = 100\% - \%\ \mathrm{yield}$ | Use when the question asks how much was not recovered rather than how much was. |

## Worked Problems

### P1. For $\mathrm{N_2} + 3\mathrm{H_2} \to 2\mathrm{NH_3}$, $2.00\ \mathrm{mol}$ of $\mathrm{N_2}$ is mixed with $5.00\ \mathrm{mol}$ of $\mathrm{H_2}$. Identify the limiting reagent, find the moles of $\mathrm{NH_3}$ formed, and state how much $\mathrm{N_2}$ is left.

**Given:** n(N2) = 2.00 mol; n(H2) = 5.00 mol; N2 + 3H2 -> 2NH3

**Solution:**

1. Divide each by its coefficient: $\mathrm{N_2}$: $2.00/1 = 2.00$; $\mathrm{H_2}$: $5.00/3 = 1.667$
2. The smaller quotient is hydrogen, so $\mathrm{H_2}$ is limiting
3. $n(\mathrm{NH_3}) = 5.00 \times (2/3) = 3.33\ \mathrm{mol}$
4. $\mathrm{N_2}$ consumed $= 5.00/3 = 1.667\ \mathrm{mol}$, so $2.00 - 1.667 = 0.33\ \mathrm{mol}$ remains

> [!success]- Answer
> **$\mathrm{H_2}$ is limiting; $3.33\ \mathrm{mol}$ of $\mathrm{NH_3}$ forms, leaving $0.33\ \mathrm{mol}$ of $\mathrm{N_2}$.**

> [!warning] Trap
> Choosing $\mathrm{N_2}$ because 2.00 mol is the smaller mole count. The test divides by the coefficient, and 5.00/3 = 1.667 is smaller than 2.00 — fewer moles does not mean limiting.

### P2. The same reaction is run with $5.00\ \mathrm{mol}$ of $\mathrm{H_2}$ limiting and produces $48.3\ \mathrm{g}$ of $\mathrm{NH_3}$ ($M = 17.03\ \mathrm{g/mol}$). Find the theoretical yield and the percent yield.

**Given:** n(NH3) from LR = 3.333 mol; M(NH3) = 17.03 g/mol; actual mass = 48.3 g

**Solution:**

1. Theoretical mass $= 3.333 \times 17.03 = 56.8\ \mathrm{g}$
2. $\%\ \mathrm{yield} = (48.3/56.8) \times 100$
3. $= 85.0\%$

> [!success]- Answer
> **$56.8\ \mathrm{g}$ theoretical and $85.0\%$ yield.**

> [!warning] Trap
> Reporting 100 − 85.0 = 15% as the yield, or computing the theoretical mass from the excess $\mathrm{N_2}$ (which would give 68.1 g and a yield of 70.9%). Percent yield is actual over theoretical for the limiting reagent's product.

### P3. $10.0\ \mathrm{g}$ of $\mathrm{CaCO_3}$ ($M = 100.09\ \mathrm{g/mol}$) is treated with $0.150\ \mathrm{mol}$ of $\mathrm{HCl}$: $\mathrm{CaCO_3} + 2\mathrm{HCl} \to \mathrm{CaCl_2} + \mathrm{H_2O} + \mathrm{CO_2}$. Identify the limiting reagent and find the mass of $\mathrm{CO_2}$ produced.

**Given:** m(CaCO3) = 10.0 g, M = 100.09 g/mol; n(HCl) = 0.150 mol; M(CO2) = 44.01 g/mol

**Solution:**

1. $n(\mathrm{CaCO_3}) = 10.0/100.09 = 0.0999\ \mathrm{mol}$
2. Quotients: $\mathrm{CaCO_3}$ $0.0999/1 = 0.0999$; $\mathrm{HCl}$ $0.150/2 = 0.0750$
3. $\mathrm{HCl}$ is limiting because $0.0750 < 0.0999$
4. $n(\mathrm{CO_2}) = 0.150/2 = 0.0750\ \mathrm{mol}$, so $m = 0.0750 \times 44.01 = 3.30\ \mathrm{g}$

> [!success]- Answer
> **$\mathrm{HCl}$ is limiting; $3.30\ \mathrm{g}$ of $\mathrm{CO_2}$ is produced.**

> [!warning] Trap
> Reporting the $\mathrm{CaCO_3}$-based yield of $0.0999 \times 44.01 = 4.40\ \mathrm{g}$, a 33% overstatement. The theoretical yield must be recomputed from the limiting reagent's quotient.

### P4. $5.00\ \mathrm{g}$ of ethanol ($\mathrm{C_2H_5OH}$, $M = 46.07\ \mathrm{g/mol}$) burns completely in excess oxygen: $\mathrm{C_2H_5OH} + 3\mathrm{O_2} \to 2\mathrm{CO_2} + 3\mathrm{H_2O}$. If $8.50\ \mathrm{g}$ of $\mathrm{CO_2}$ is collected, find the percent yield.

**Given:** m(C2H5OH) = 5.00 g; M = 46.07 g/mol; actual CO2 = 8.50 g, M(CO2) = 44.01 g/mol

**Solution:**

1. $n(\mathrm{ethanol}) = 5.00/46.07 = 0.1085\ \mathrm{mol}$
2. $n(\mathrm{CO_2})_{theory} = 2 \times 0.1085 = 0.2171\ \mathrm{mol}$
3. Theoretical mass $= 0.2171 \times 44.01 = 9.55\ \mathrm{g}$
4. $\%\ \mathrm{yield} = (8.50/9.55) \times 100 = 89.0\%$

> [!success]- Answer
> **$89.0\%$ yield.**

> [!warning] Trap
> Using a 1:1 ethanol-to-CO2 ratio and getting 4.78 g theoretical, which makes the yield 178%. An impossible yield is the signal that the equation was not read — the coefficient 2 is the whole point of the problem.

### P5. $50.0\ \mathrm{mL}$ of $0.200\ \mathrm{M}\ \mathrm{Pb(NO_3)_2}$ is mixed with $50.0\ \mathrm{mL}$ of $0.150\ \mathrm{M}\ \mathrm{KI}$: $\mathrm{Pb(NO_3)_2} + 2\mathrm{KI} \to \mathrm{PbI_2} + 2\mathrm{KNO_3}$. Find the limiting reagent and the mass of $\mathrm{PbI_2}$ precipitated ($M = 461.0\ \mathrm{g/mol}$).

**Given:** V = 50.0 mL of each solution; M(Pb(NO3)2) = 0.200 M; M(KI) = 0.150 M

**Solution:**

1. $n(\mathrm{Pb(NO_3)_2}) = (0.200)(0.0500) = 0.0100\ \mathrm{mol}$
2. $n(\mathrm{KI}) = (0.150)(0.0500) = 0.00750\ \mathrm{mol}$
3. Quotients: $\mathrm{Pb(NO_3)_2}$ $0.0100/1 = 0.0100$; $\mathrm{KI}$ $0.00750/2 = 0.00375$ → $\mathrm{KI}$ is limiting
4. $n(\mathrm{PbI_2}) = 0.00750/2 = 0.00375\ \mathrm{mol}$
5. $m = 0.00375 \times 461.0 = 1.73\ \mathrm{g}$

> [!success]- Answer
> **$\mathrm{KI}$ is limiting; $1.73\ \mathrm{g}$ of $\mathrm{PbI_2}$ precipitates.**

> [!warning] Trap
> Comparing 0.0100 mol with 0.00750 mol and stopping there, then reporting $0.0100 \times 461.0 = 4.61\ \mathrm{g}$. The 1:2 ratio means the quotient matters: 0.00750/2 = 0.00375, not 0.00750.

## Traps & Exam Notes

- **Picking the limiting reagent by smallest mass or smallest mole count.** The test is $n/\nu$. With $2.00\ \mathrm{mol}$ of $\mathrm{N_2}$ and $5.00\ \mathrm{mol}$ of $\mathrm{H_2}$, hydrogen is limiting even though it has more moles.
- **Reading a mass ratio off the equation.** $\mathrm{CaCO_3} + 2\mathrm{HCl}$ does not mean 100 g of carbonate reacts with 2 g of acid; each reactant must be converted to moles before any comparison.
- **Computing the theoretical yield from the excess reagent.** That is the single cause of yields above 100%. Theoretical yield always comes from the limiting reagent.
- **Subtracting masses to find the leftover excess.** Leftover is initial moles minus consumed moles, then converted to mass. Subtracting the product mass from the excess mass has no stoichiometric meaning.
- **Forgetting the coefficient when reading the leftover.** For A + 2B, one mole of A consumes two of B, so the consumed B is twice the consumed A. The 1:1 habit under-reports the leftover by a factor of two.
- **Treating a yield above 100% as a rounding artefact.** It means the product is wet or impure, or the theoretical yield was computed from the wrong reagent. The exam expects you to notice rather than round it away.
- **Using mL directly in $n = MV$.** $25.0\ \mathrm{mL}$ is $0.0250\ \mathrm{L}$. Because the same error usually scales both reactants, the limiting-reagent verdict survives and only the final mass exposes the mistake.

## See Also

- [[04_Mole_Concept_and_Stoichiometry]]
- [[06_Solutions_and_Concentration_Units]]
- [[07_Chemical_Equilibrium_and_Le_Chatelier]]

---

[[04_Mole_Concept_and_Stoichiometry|⬅ 04]] · [[_MOC_General_Chemistry|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Solutions_and_Concentration_Units|06 ➡]]
