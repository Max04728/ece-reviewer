---
id: GEAS-04-02
title: "Biogeochemical Cycles"
part: "03_GEAS"
area: "04_Environmental_Sci_and_PH_Laws"
topic: 2
tier: 3
depth: full
problem_count: 0
prereqs: ["[[01_Ecosystems_and_Energy_Flow]]"]
tags: ["ece", "geas", "environmental_sci_and_ph_laws"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Biogeochemical Cycles

> [!abstract] Scope
> Trace carbon, nitrogen, phosphorus, sulfur and water through the biosphere, name the human perturbation each cycle suffers, and keep straight which cycles have a gaseous phase.

## Core Concept

> [!tip] Intuition
> Energy flows through an ecosystem once and leaves as heat, but the atoms are recycled indefinitely — so every cycle is a set of reservoirs joined by fluxes, and pollution is what happens when a human flux overwhelms a natural one.

**Carbon cycle.** Carbon moves between four reservoirs: atmosphere (as $\mathrm{CO_2}$ and $\mathrm{CH_4}$), terrestrial biosphere, ocean, and fossil/lithosphere. Photosynthesis fixes carbon, respiration and decomposition release it, and the ocean is the largest *exchangeable* reservoir. The ocean takes up $\mathrm{CO_2}$ as $\mathrm{CO_2 + H_2O \rightleftharpoons H_2CO_3 \rightleftharpoons H^+ + HCO_3^-}$, which lowers seawater pH (ocean acidification) and reduces carbonate available to calcifiers. The human perturbation is combustion of fossil carbon and land-use change, moving carbon from a slow (geological) reservoir into the fast (atmospheric) one.

**Nitrogen cycle.** The five steps the examiner wants, in order: **fixation** ($\mathrm{N_2 \to NH_3/NH_4^+}$ by *Rhizobium*, *Azotobacter*, cyanobacteria, or industrially by Haber-Bosch), **ammonification/mineralisation** (organic N from dead matter $\to \mathrm{NH_4^+}$), **nitrification** ($\mathrm{NH_4^+ \to NO_2^-}$ by *Nitrosomonas*, then $\mathrm{NO_2^- \to NO_3^-}$ by *Nitrobacter*), **assimilation** (plants and microbes take up $\mathrm{NH_4^+}$ and $\mathrm{NO_3^-}$), and **denitrification** by facultative anaerobes such as *Pseudomonas* under low oxygen, which runs:
$$\mathrm{NO_3^- \to NO_2^- \to NO \to N_2O \to N_2}$$
Human perturbations: fertiliser manufacture, legume cultivation and fossil-fuel combustion roughly double the natural rate of N fixation; the excess N leaves as nitrate leaching to groundwater, ammonia volatilisation, and $\mathrm{N_2O}$ — a greenhouse gas with GWP about 298 and an ozone-depleting substance as well.

**Phosphorus cycle — the only major nutrient cycle with no gaseous phase.** P is released by weathering of phosphate rock (apatite), taken up by plants as $\mathrm{H_2PO_4^-}$ or $\mathrm{HPO_4^{2-}}$, passed through the food web, and returned to soil and sediment by decomposition; much of it is lost to deep sediment and only returns on a geological timescale. Because there is no atmospheric leg, P is normally the **limiting nutrient in freshwater** — which is exactly why phosphate detergent and fertiliser runoff triggers freshwater eutrophication, while nitrogen tends to be limiting in marine systems. Eutrophication sequence: nutrient enrichment $\to$ algal bloom $\to$ die-off $\to$ bacterial decomposition consumes DO $\to$ hypoxia and fish kill.

**Sulfur cycle and the hydrologic cycle.** Sulfur moves as $\mathrm{SO_2}$, $\mathrm{H_2S}$, sulfate and organic S; it is released by volcanism, by combustion of sulfur-bearing fossil fuel, and by microbial oxidation/reduction. Oxidised sulfur is deposited as sulfuric acid, the acid-deposition problem. The hydrologic cycle moves water as evaporation, transpiration, condensation, precipitation, infiltration, percolation and runoff; the ocean holds about 97% of Earth's water and evaporation from the ocean exceeds precipitation over it, with the balance returned by continental runoff. Human perturbations: groundwater overdraft, impervious (paved) surfaces that replace infiltration with flashy runoff, dams, and thermal discharge.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Nitrogen fixation (biological) | $\mathrm{N_2 + 8H^+ + 8e^- + 16ATP \to 2NH_3 + H_2 + 16ADP}$ | Catalysed by nitrogenase, inhibited by oxygen. Industrial Haber-Bosch instead uses high pressure and an iron catalyst. |
| Nitrification (two steps) | $\mathrm{NH_4^+ \to NO_2^- \to NO_3^-}$ | Nitrosomonas then Nitrobacter. Consumes oxygen and releases H+, so it acidifies soil. |
| Denitrification | $\mathrm{NO_3^- \to NO_2^- \to NO \to N_2O \to N_2}$ | Facultative anaerobic bacteria; occurs in waterlogged, low-oxygen soil and sediment. The intermediate N2O is a greenhouse gas (GWP about 298). |
| Ammonification | $\mathrm{organic\ N \to NH_4^+}$ | Decomposer mineralisation of dead matter and waste. Makes N available to nitrifiers and plants. |
| Phosphorus cycle | $\mathrm{no\ gaseous\ phase;\ P\ released\ by\ weathering\ of\ apatite}$ | The defining exam fact. P is the limiting nutrient in most freshwater; N is usually limiting in marine water. |
| Ocean CO2 uptake | $\mathrm{CO_2 + H_2O \rightleftharpoons H_2CO_3 \rightleftharpoons H^+ + HCO_3^-}$ | Direction shifts with temperature (colder water holds more CO2). Net effect is ocean acidification, not just storage. |
| Respiration stoichiometry | $\mathrm{C_6H_{12}O_6 + 6O_2 \to 6CO_2 + 6H_2O}$ | 1 mol glucose (180 g) yields 6 mol CO2 = 264 g. Use molar masses, never equal masses. |
| Global warming potential | $GWP = \frac{\mathrm{radiative\ forcing\ of\ 1\ kg\ gas}}{\mathrm{radiative\ forcing\ of\ 1\ kg\ } CO_2}$ | 100-year CO2-equivalent basis. AR4 values: CH4 = 25, N2O = 298; AR5 values: 28 and 265. State which basis you used. |
| CO2-equivalent | $CO_2e = \mathrm{mass} \times GWP$ | Convert each gas before summing; never add tonnes of CH4 to tonnes of CO2 directly. |
| Eutrophication trigger | $\mathrm{total\ P} > 0.02\ \mathrm{mg/L}\ (\mathrm{lake});\ \mathrm{chlorophyll-}a > 10\ \mu\mathrm{g/L}$ | Indicative freshwater thresholds; lakes are P-limited, coastal waters usually N-limited. |
| Water balance of a reservoir | $\Delta V = (Q_{in} - Q_{out} - E)\Delta t$ | Remove evaporation (and seepage) before dividing by volume. Mixing m3/s with m3/day is the classic unit trap. |
| Sulfur oxidation to acid | $\mathrm{S + O_2 \to SO_2};\ \mathrm{2SO_2 + O_2 + 2H_2O \to 2H_2SO_4}$ | 1 mol S (32 g) gives 1 mol SO2 (64 g) and ultimately 1 mol H2SO4 (98 g). |
| Treaty limbs | $Montreal\ Protocol\ (1987)\ vs\ Kyoto\ Protocol\ (1997)\ vs\ Paris\ Agreement\ (2015)$ | Montreal = ozone-depleting substances, universally ratified. Kyoto = binding GHG targets for Annex I only. Paris = nationally determined contributions for all parties. |
| Runoff load to concentration | $C\ (\mathrm{mg/L}) = \frac{\mathrm{load\ (kg)}}{\mathrm{volume\ }(\mathrm{m^3})}$ | Because 1 kg/m3 = 1000 mg/L. Example: 100 kg P in 2.5e5 m3 = 4.0e-4 kg/m3 = 0.40 mg/L, twenty times the 0.02 mg/L freshwater threshold. |
| Respiration mass ratio | $180\ \mathrm{g\ glucose} \to 264\ \mathrm{g\ CO_2}$ | The 6:1 mole ratio gives a 1.47 mass ratio. Reporting equal masses is the standard error. |
| Denitrification mass balance | $m(\mathrm{N_2}) = m(\mathrm{N})$ | A flux quoted as kg N needs no factor of 2; the two atoms of each N2 come from that same nitrogen. |
| Reservoir filling time | $t = \frac{\Delta V}{Q_{in} - Q_{out} - E}$ | Net, not gross, inflow. Example: 1.62e7 m3 at 3.0 m3/s net = 5.4e6 s = 62.5 days. |

## Traps & Exam Notes

- Saying the phosphorus cycle 'has no atmospheric phase' but then describing phosphate as an air pollutant. Phosphorus travels by water, soil erosion and dust — never as a gas — which is why it is the freshwater limiting nutrient.
- Adding an $\mathrm{N_2O}$ or $\mathrm{CH_4}$ mass directly to a $\mathrm{CO_2}$ mass. Every gas is multiplied by its own GWP before summing, so 4.5 kg of $\mathrm{N_2O}$ is 1,341 kg $\mathrm{CO_2e}$ at GWP 298 — not 4.5 kg.
- Respiration stoichiometry read as 1:1. $\mathrm{C_6H_{12}O_6 + 6O_2 \to 6CO_2 + 6H_2O}$: 180 g of glucose (1 mol) releases 264 g of $\mathrm{CO_2}$ (6 mol), so the mass ratio is 1.47, not 1.00.
- Converting runoff load to concentration with the wrong factor. 1 kg/m³ = 1000 mg/L, so a 100 kg P load in $2.5\times10^{5}\ \mathrm{m^3}$ of runoff gives 0.40 mg/L — twenty times the 0.02 mg/L freshwater eutrophication threshold.
- Doubling a nitrogen mass because '$\mathrm{N_2}$ has two atoms'. A flux reported as kg N is already the nitrogen mass; the paired atoms come from that same N, so the $\mathrm{N_2}$ mass equals the N mass.
- Mixing up the nitrification order: *Nitrosomonas* oxidises ammonium to **nitrite**, *Nitrobacter* oxidises nitrite to **nitrate**. Reversing the two bacteria inverts the cycle.
- Confusing fixation with nitrification. Fixation makes $\mathrm{N_2}$ usable ($\mathrm{N_2 \to NH_4^+}$); nitrification changes one combined form into another ($\mathrm{NH_4^+ \to NO_3^-}$).
- Treating denitrification as a pollution process. It is the beneficial return of N to the atmosphere, and is harnessed in constructed wetlands; the pollutant intermediate is the greenhouse gas $\mathrm{N_2O}$, not the final $\mathrm{N_2}$.
- Adding a $\mathrm{CH_4}$ or $\mathrm{N_2O}$ mass to a $\mathrm{CO_2}$ mass without a GWP. Blend the gases only in CO2-equivalent after multiplying by the stated GWP and stating the assessment basis (AR4 vs AR5).
- Assigning eutrophication purely to phosphorus in Manila Bay or other coastal water. Freshwater is generally P-limited, marine water generally N-limited; state which system the question describes.

## See Also

- [[01_Ecosystems_and_Energy_Flow]]
- [[05_Water_Quality_BOD,_COD,_DO,_TDS]]
- [[04_Greenhouse_Effect,_Ozone_and_Acid_Rain]]

---

[[01_Ecosystems_and_Energy_Flow|⬅ 01]] · [[_MOC_Environmental_Sci_and_PH_Laws|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Air_Pollution_and_Criteria_Pollutants|03 ➡]]
