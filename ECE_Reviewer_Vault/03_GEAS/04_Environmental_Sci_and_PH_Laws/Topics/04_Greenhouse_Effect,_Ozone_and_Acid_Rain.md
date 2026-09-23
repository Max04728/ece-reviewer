---
id: GEAS-04-04
title: "Greenhouse Effect, Ozone and Acid Rain"
part: "03_GEAS"
area: "04_Environmental_Sci_and_PH_Laws"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Air_Pollution_and_Criteria_Pollutants]]"]
tags: ["ece", "geas", "environmental_sci_and_ph_laws"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Greenhouse Effect, Ozone and Acid Rain

> [!abstract] Scope
> Quantify the greenhouse gases by GWP and radiative forcing, follow the stratospheric ozone chemistry from CFC to chlorine radical, and work the acid-deposition stoichiometry and pH threshold.

## Core Concept

> [!tip] Intuition
> Two thin chemical layers decide the whole topic: a few hundred ppm of trace gas in the troposphere traps outgoing infrared, and a few ppm of ozone in the stratosphere absorbs incoming ultraviolet. Both layers are perturbed by the same industrial chemistry — combustion gases warm, and CFCs destroy ozone.

**Greenhouse gases and their relative strength.** A greenhouse gas absorbs outgoing longwave (infrared) radiation and re-radiates it, warming the surface. The atmospheric window matters: $\mathrm{CO_2}$ absorbs near 15 µm, $\mathrm{CH_4}$ near 7.7 µm, $\mathrm{N_2O}$ near 17 µm, and water vapour is the strongest absorber overall. Because equal masses are not equally potent, emissions are compared by **global warming potential**, the radiative forcing of 1 kg of a gas over a chosen horizon relative to 1 kg of $\mathrm{CO_2}$ ($\mathrm{GWP_{CO_2} = 1}$ by definition). The 100-year values to memorise:
$$\mathrm{CH_4} \approx 25$$
(AR4) or 28 (AR5), $\mathrm{N_2O} \approx 298$ (AR4) or 265 (AR5), and the CFCs and HFCs in the thousands (CFC-12 about 10,900; CFC-11 about 4,750; HFC-23 about 14,800). Results are reported as $\mathrm{CO_2}$-equivalent. The water-vapour feedback amplifies whatever the long-lived gases do — it is a feedback, not a control knob.

**Radiative forcing and the policy instruments.** Forcing is measured in $\mathrm{W/m^2}$; the standard first-order expression for a $\mathrm{CO_2}$ increase is:
$$\Delta F = 5.35\ln(C/C_0)\ \mathrm{W/m^2}$$
which gives about $+3.7\ \mathrm{W/m^2}$ for a doubling of $\mathrm{CO_2}$ from 280 to 560 ppm. The three treaties an examiner confuses: the **Montreal Protocol (1987)** controls ozone-depleting substances and is the most successful environmental treaty; the **Kyoto Protocol (1997)** set binding greenhouse-gas targets for Annex I (developed) countries only, and the Philippines ratified it in 2003; the **Paris Agreement (2015)** replaced that architecture with nationally determined contributions (NDCs) applying to all parties, aiming to hold warming well below 2 degrees C and pursuing 1.5 degrees C. The UNFCCC (1992, Rio) is the parent convention; the Philippines ratified it in 1994 and created the Climate Change Commission under RA 9729 (2009), amended by RA 10174 (2012).

**Stratospheric ozone chemistry.** Ozone is made and destroyed naturally by the **Chapman cycle**:
$$\mathrm{O_2 + h\nu \to 2O}$$
then $\mathrm{O + O_2 + M \to O_3 + M}$ (formation), against $\mathrm{O_3 + h\nu \to O_2 + O}$ and $\mathrm{O + O_3 \to 2O_2}$ (destruction). The natural steady state keeps a few ppm of ozone in the stratosphere. Chlorofluorocarbons perturb it catalytically: CFCs are unreactive in the troposphere, drift up, and are photolysed in the stratosphere by UV-C:
$$\mathrm{CF_2Cl_2 + h\nu \to CF_2Cl\cdot + Cl\cdot}$$
The chlorine radical then runs a **catalytic cycle**:
$$\mathrm{Cl\cdot + O_3 \to ClO\cdot + O_2}$$
followed by $\mathrm{ClO\cdot + O \to Cl\cdot + O_2}$ — regenerating the catalyst, so one Cl atom destroys on the order of $10^{5}$ ozone molecules before it is removed as HCl or $\mathrm{ClONO_2}$. Bromine from halons is even more efficient. The **Antarctic ozone hole** is a special case: the polar vortex traps air at below -78 degrees C, polar stratospheric clouds form, heterogeneous reactions on their surfaces convert reservoir chlorine ($\mathrm{HCl}$, $\mathrm{ClONO_2}$) into photolabile $\mathrm{Cl_2}$, and the returning spring sunlight releases a burst of chlorine that destroys ozone over a shallow, low-altitude layer — which is why the hole appears in September-October, not at the winter pole. The Montreal Protocol's phase-out (and the Kigali Amendment for HFCs) is why the hole is slowly closing.

**Acid deposition.** Unpolluted rain is already slightly acidic — about pH 5.6 — because atmospheric $\mathrm{CO_2}$ equilibrates to carbonic acid. Acid rain is defined as precipitation below pH 5.6, and the responsible acids are strong: $\mathrm{SO_2}$ oxidised to $\mathrm{H_2SO_4}$ and $\mathrm{NO_x}$ oxidised to $\mathrm{HNO_3}$. Roughly two thirds of the acidity in a coal-burning region is sulfuric, one third nitric — which is why the $\mathrm{SO_2}$ control strategy dominates. Deposition is **wet** (rain, snow, fog carrying the acid down) or **dry** (gases and particles deposited directly, later washed off), and dry deposition can dominate close to the source. Effects: lake acidification and fish loss (aluminium mobilisation is the actual fish killer), soil base-cation leaching and nutrient loss, forest dieback, and carbonate-stone corrosion on buildings and monuments. The mitigation hierarchy is fuel switching to low-sulfur fuel, then flue-gas desulfurisation by wet limestone scrubbing:
$$\mathrm{CaCO_3 + SO_2 + \tfrac12 O_2 + 2H_2O \to CaSO_4\cdot2H_2O + CO_2}$$
After that come low-$\mathrm{NO_x}$ burners and selective catalytic reduction for the nitrogen half.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Global warming potential | $\mathrm{GWP}_i = \frac{\int_0^{TH} a_i C_i(t)\,dt}{\int_0^{TH} a_{CO_2} C_{CO_2}(t)\,dt}$ | Relative to CO2 = 1 over a stated time horizon (usually 100 yr). Always state AR4 or AR5, because CH4 is 25 vs 28 and N2O is 298 vs 265. |
| CO2-equivalent emission | $\mathrm{CO_2e} = \sum_i m_i \times \mathrm{GWP}_i$ | Convert every gas first, then sum. Never add tonnes of CH4 to tonnes of CO2. |
| Reference GWPs (100-year) | $\mathrm{CO_2}=1,\ \mathrm{CH_4}\approx25,\ \mathrm{N_2O}\approx298,\ \mathrm{CFC\mathrm{-}12}\approx10{,}900$ | AR4 values. The same ranking applies in AR5 (28, 265) with the CFCs still in the thousands. CFCs are also ozone-depleting substances. |
| Radiative forcing from CO2 | $\Delta F = 5.35\ln\!\left(\frac{C}{C_0}\right)\ \mathrm{W/m^2}$ | Logarithmic in concentration, so each doubling adds a roughly constant increment. Doubling 280 -> 560 ppm gives +3.7 W/m2. |
| Chapman cycle (ozone creation) | $\mathrm{O_2 + h\nu \to 2O};\quad \mathrm{O + O_2 + M \to O_3 + M}$ | M is a third body (N2 or O2) that carries away excess energy. Requires UV-C, which is why ozone forms in the stratosphere. |
| Chapman cycle (ozone destruction) | $\mathrm{O_3 + h\nu \to O_2 + O};\quad \mathrm{O + O_3 \to 2O_2}$ | Natural balance; the catalytic cycles below are what unbalance it. |
| CFC photolysis | $\mathrm{CF_2Cl_2 + h\nu \to CF_2Cl\cdot + Cl\cdot}$ | Happens only in the stratosphere, because the CFC must first drift above the UV-absorbing ozone layer. One CFC molecule can release more than one Cl atom. |
| Catalytic ozone destruction | $\mathrm{Cl\cdot + O_3 \to ClO\cdot + O_2};\quad \mathrm{ClO\cdot + O \to Cl\cdot + O_2}$ | Net: O3 + O -> 2O2, with Cl regenerated. Each Cl atom destroys about 1e5 ozone molecules; bromine is several times more efficient per atom. |
| Chlorine reservoir formation | $\mathrm{ClO\cdot + NO_2 \to ClONO_2};\quad \mathrm{Cl\cdot + CH_4 \to HCl + CH_3\cdot}$ | How the catalyst is temporarily deactivated. On polar stratospheric clouds these reservoirs are re-released as Cl2, which is the Antarctic hole mechanism. |
| Acid rain threshold | $\mathrm{pH} < 5.6$ | 5.6 is the natural pH of water in equilibrium with atmospheric CO2 — not a neutral-rain criterion. Below it, the excess acidity is from strong acids (H2SO4, HNO3). |
| Carbonic acid equilibrium | $\mathrm{CO_2 + H_2O \rightleftharpoons H_2CO_3 \rightleftharpoons H^+ + HCO_3^-}$ | At 400 ppm the dissolved CO2 is about 1.4e-5 mol/L, giving pH 5.6. This is why 'pure' rain is not pH 7. |
| Sulfuric acid formation | $\mathrm{SO_2 + \tfrac12 O_2 + H_2O \to H_2SO_4}$ | 1 mol SO2 (64 g) -> 1 mol H2SO4 (98 g), a mass ratio of 1.53. Gas-phase (OH radical) and aqueous (metal-catalysed) pathways both operate. |
| Nitric acid formation | $\mathrm{4NO_2 + 2H_2O + O_2 \to 4HNO_3}$ | The NOx half of acid deposition. Because nitrogen fertiliser also emits N2O, NOx control has a greenhouse co-benefit. |
| Sulfur-to-acid stoichiometry | $m(\mathrm{H_2SO_4}) = m(\mathrm{S})\times\frac{98.08}{32.07} = 3.06\,m(\mathrm{S})$ | Coal at 1.5% S burned at 200 t/day gives 3.0 t S/day; at 70% conversion that is 6.4 t H2SO4/day. |
| Treaty attribution | $Montreal\ 1987\ (ODS);\ Kyoto\ 1997\ (Annex\ I\ GHGs);\ Paris\ 2015\ (NDCs,\ all\ parties)$ | Montreal = ozone. Kyoto = binding targets for developed countries only. Paris = voluntary-but-reported contributions from everyone. RA 9729 created the Philippine Climate Change Commission. |
| Antarctic hole mechanism | $polar\ vortex + PSCs\ at\ <-78\ ^\circ C \Rightarrow \mathrm{Cl_2} \xrightarrow{h\nu} 2Cl\cdot$ | Heterogeneous chemistry on cloud surfaces, then spring sunlight. Explains why the hole peaks in September-October over Antarctica and not at the North Pole. |

## Worked Problems

### P1. A landfill releases $120\ \mathrm{kg}$ of methane and $3.0\ \mathrm{kg}$ of nitrous oxide per day. Using AR4 100-year GWPs ($\mathrm{CH_4} = 25$, $\mathrm{N_2O} = 298$), find the total $\mathrm{CO_2}$-equivalent emission in tonnes per day.

**Given:** CH4 = 120 kg/day (AR4 GWP = 25); N2O = 3.0 kg/day (AR4 GWP = 298)

**Solution:**

1. Convert methane: 120 kg CH4/day x 25 = 3000 kg CO2e/day
2. Convert nitrous oxide: 3.0 kg N2O/day x 298 = 894 kg CO2e/day
3. Total CO2e = 3000 + 894 = 3894 kg CO2e/day
4. Convert to tonnes: 3894 / 1000 = 3.894 t CO2e/day

> [!success]- Answer
> **$3.894\ \mathrm{t\ CO_2e}$ per day (3,894 kg CO2e/day).**

> [!warning] Trap
> Reporting 123 kg/day by adding the raw masses. Methane at 120 kg outweighs the nitrous oxide at 3.0 kg by a factor of 40 even though its GWP is smaller — always convert before comparing.

### P2. Atmospheric $\mathrm{CO_2}$ rises from 280 ppm (pre-industrial) to 420 ppm. Using $\Delta F = 5.35\ln(C/C_0)$, find the radiative forcing in $\mathrm{W/m^2}$.

**Given:** C0 = 280 ppm; C = 420 ppm; coefficient = 5.35 W/m2

**Solution:**

1. Form the ratio: C/C0 = 420 / 280 = 1.500
2. Take the natural log: ln(1.500) = 0.4055
3. Multiply: dF = 5.35 x 0.4055 = 2.169 W/m2
4. Sanity check: a full doubling (ratio 2, ln = 0.693) gives 3.71 W/m2, so 2.17 W/m2 for a 1.5-fold rise is consistent

> [!success]- Answer
> **About $2.17\ \mathrm{W/m^2}$.**

> [!warning] Trap
> Using log base 10 instead of the natural log: log10(1.5) = 0.176 gives 0.94 W/m2, less than half the correct value. The formula is written with ln and must be evaluated with ln.

### P3. A power plant burns coal containing 1.5% sulfur at a rate of $200\ \mathrm{t/day}$, and 70% of the sulfur is converted to sulfuric acid in the plume. What mass of $\mathrm{H_2SO_4}$ is formed per day?

**Given:** coal = 200 t/day; S = 1.5% by mass; M(S) = 32.07 g/mol; M(H2SO4) = 98.08 g/mol; 70% conversion

**Solution:**

1. Sulfur input = 200 t/day x 0.015 = 3.0 t S/day = 3000 kg S/day
2. Moles of S = 3000 kg / 32.07 kg/kmol = 93.5 kmol/day
3. Each mole of S yields one mole of H2SO4, and 70% converts: 0.70 x 93.5 = 65.5 kmol acid/day
4. Mass of acid = 65.5 kmol/day x 98.08 kg/kmol = 6,424 kg/day

> [!success]- Answer
> **About $6.42\ \mathrm{t}$ of $\mathrm{H_2SO_4}$ per day.**

> [!warning] Trap
> Treating sulfur and sulfuric acid as equal masses and reporting 2.1 t/day. The molar mass ratio 98.08/32.07 = 3.06 nearly triples the answer, and the 70% conversion applies to the sulfur, not to the acid.

### P4. A refrigerator charge of $0.90\ \mathrm{kg}$ of CFC-12 is eventually released to the atmosphere. Using a 100-year GWP of 10,900 for CFC-12, find the $\mathrm{CO_2}$-equivalent of that release.

**Given:** mass of CFC-12 = 0.90 kg; GWP(CFC-12, 100-yr) = 10,900

**Solution:**

1. Apply the definition of CO2-equivalent: CO2e = mass x GWP
2. CO2e = 0.90 kg x 10,900 = 9,810 kg CO2e
3. Convert to tonnes: 9,810 / 1000 = 9.81 t CO2e

> [!success]- Answer
> **About $9.81\ \mathrm{t\ CO_2e}$ from less than one kilogram of refrigerant.**

> [!warning] Trap
> Scaling from methane's GWP by memory (about 25) instead of using the stated 10,900. CFCs are two to three orders of magnitude more potent per kilogram and are also ozone-depleting substances controlled by the Montreal Protocol.

### P5. Rain in equilibrium with atmospheric $\mathrm{CO_2}$ at 400 ppm has a dissolved $\mathrm{CO_2}$ concentration of $1.36\times10^{-5}\ \mathrm{mol/L}$. If essentially all of it forms carbonic acid that dissociates once, $\mathrm{H_2CO_3 \rightleftharpoons H^+ + HCO_3^-}$ with $K_{a1} = 4.3\times10^{-7}$, find the pH and state whether this rain is 'acid rain'.

**Given:** [CO2(aq)] = 1.36e-5 mol/L; Ka1 = 4.3e-7; acid rain threshold pH = 5.6

**Solution:**

1. Set up the equilibrium: [H+][HCO3-]/[H2CO3] = Ka1, and with equal dissociation [H+]^2 = Ka1 x [H2CO3]
2. [H+]^2 = 4.3e-7 x 1.36e-5 = 5.85e-12
3. [H+] = sqrt(5.85e-12) = 2.42e-6 mol/L
4. pH = -log10(2.42e-6) = 5.62
5. Compare with the 5.6 threshold: this rain is at the natural background, not acid rain

> [!success]- Answer
> **$\mathrm{pH} \approx 5.6$ — natural, unpolluted rain; acid rain requires a pH below 5.6.**

> [!warning] Trap
> Calling pH 5.6 neutral or declaring this rain acidic. Rain in equilibrium with CO2 is naturally about 5.6; 'acid rain' is defined as anything below that, and only the strong acids from SO2 and NOx push it to 4.0-4.5.

## Traps & Exam Notes

- Confusing the Montreal and Kyoto Protocols. Montreal (1987) phases out ozone-depleting substances such as CFCs and halons; Kyoto (1997) addresses greenhouse gases. A question about CFCs is a Montreal question even though CFCs are also greenhouse gases.
- Calling the Paris Agreement the first treaty with binding greenhouse-gas targets for all countries. Paris uses nationally determined contributions that are reported and reviewed — the hard binding targets for developed countries were Kyoto's Annex I structure.
- Writing the CFC destruction cycle with the catalyst consumed. Chlorine is regenerated at the end of every cycle ($\mathrm{ClO\cdot + O \to Cl\cdot + O_2}$), which is exactly why one atom destroys about $10^{5}$ ozone molecules; a stoichiometric (non-catalytic) reading understates the damage by five orders of magnitude.
- Placing the ozone hole at the North Pole or in the tropics. The severe hole is Antarctic, formed inside the polar vortex with polar stratospheric clouds in the dark winter and revealed when spring sunlight releases chlorine in September-October.
- Saying CFCs destroy ozone directly. The CFC must first be photolysed by UV-C in the stratosphere to release $\mathrm{Cl\cdot}$; the reactive agent is the chlorine radical, not the CFC.
- Using pH 7 as the acid-rain baseline. The baseline is 5.6, set by $\mathrm{CO_2}$ equilibrium; pH 6.0 rain is natural, and the pollutant signature is 4.0-4.5.
- Quoting a single GWP for methane without the assessment report. AR4 gives 25 and AR5 gives 28; a 12% difference on every methane calculation. State the basis or use the value the question supplies.
- Reading dry deposition as harmless because it is not rain. Dry deposition of $\mathrm{SO_2}$ and sulfate particles can dominate the total acid load near a source and is only 'delivered' later by a rain event.

## See Also

- [[03_Air_Pollution_and_Criteria_Pollutants]]
- [[08_RA_8749_Clean_Air_Act]]
- [[02_Biogeochemical_Cycles]]

---

[[03_Air_Pollution_and_Criteria_Pollutants|⬅ 03]] · [[_MOC_Environmental_Sci_and_PH_Laws|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Water_Quality_BOD,_COD,_DO,_TDS|05 ➡]]
