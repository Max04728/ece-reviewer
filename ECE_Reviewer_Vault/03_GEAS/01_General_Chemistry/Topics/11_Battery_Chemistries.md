---
id: GEAS-01-11
title: "Battery Chemistries"
part: "03_GEAS"
area: "01_General_Chemistry"
topic: 11
tier: 3
depth: full
problem_count: 0
prereqs: ["[[09_Redox_and_Galvanic_Cells]]"]
tags: ["ece", "geas", "general_chemistry"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Battery Chemistries

> [!abstract] Scope
> Recall the chemistry, nominal voltage and practical limits of the standard primary and secondary cells, and convert between cell and pack ratings.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Lead-acid discharge (overall) | $\mathrm{Pb} + \mathrm{PbO_2} + 2\mathrm{H_2SO_4} \to 2\mathrm{PbSO_4} + 2\mathrm{H_2O}$ | The classic secondary cell, about 2.05 V per cell. Six cells in series give the 12 V automotive battery. |
| Lead-acid half-reactions | $\mathrm{anode\ } \mathrm{Pb} + \mathrm{SO_4^{2-}} \to \mathrm{PbSO_4} + 2e^-; \quad \mathrm{cathode\ } \mathrm{PbO_2} + \mathrm{SO_4^{2-}} + 4\mathrm{H^+} + 2e^- \to \mathrm{PbSO_4} + 2\mathrm{H_2O}$ | Both electrodes end up as lead(II) sulfate. Sulfuric acid is a REACTANT, so the electrolyte is consumed on discharge. |
| Lead-acid recharge | $2\mathrm{PbSO_4} + 2\mathrm{H_2O} \to \mathrm{Pb} + \mathrm{PbO_2} + 2\mathrm{H_2SO_4}$ | The exact reverse. Overcharging electrolyses water, so flooded cells lose water and vent hydrogen and oxygen. |
| Nickel-cadmium discharge | $\mathrm{Cd} + 2\mathrm{NiOOH} + 2\mathrm{H_2O} \to \mathrm{Cd(OH)_2} + 2\mathrm{Ni(OH)_2}$ | About 1.2 V per cell. The electrolyte (KOH) is not consumed, so specific gravity does not indicate state of charge. |
| Nickel-metal-hydride discharge | $\mathrm{MH} + \mathrm{NiOOH} \to \mathrm{M} + \mathrm{Ni(OH)_2}$ | About 1.2 V per cell, similar to NiCd but with roughly twice the energy density and no cadmium. Higher self-discharge. |
| Lithium-ion discharge | $\mathrm{Li}_{1-x}\mathrm{CoO_2} + \mathrm{Li}_x\mathrm{C_6} \rightleftharpoons \mathrm{LiCoO_2} + 6\mathrm{C}$ | Lithium ions shuttle between layers; no metal is plated in normal operation. Nominal 3.6-3.7 V, charged to 4.2 V. |
| Alkaline primary cell | $\mathrm{Zn} + 2\mathrm{MnO_2} + \mathrm{H_2O} \to \mathrm{ZnO} + 2\mathrm{MnOOH}$ | 1.5 V, PRIMARY and not rechargeable. Nominal voltage is the same as the Leclanche cell but it holds up far better under load. |
| Pack voltage from cells in series | $V_{pack} = N_{series} \times V_{cell}$ | Voltages add in series; capacity in Ah does not. A 12 V lead-acid battery is 6 cells x about 2.05 V = 12.3 V open-circuit, not 6 x 2.00. |
| Pack capacity from parallel cells | $Q_{pack} = N_{parallel} \times Q_{cell}\ (\mathrm{Ah})$ | Capacity adds in parallel, voltage does not. A 2S2P pack doubles BOTH voltage and capacity relative to one cell. |
| C-rate and discharge current | $I = (\mathrm{C-rate}) \times Q_{rated}\ (\mathrm{Ah})$ | A 1C rate on a 2.0 Ah cell is 2.0 A. The usable capacity falls at high C-rates (Peukert effect), so a 1C discharge lasts less than a nominal hour at higher currents. |
| Stored energy | $E\ (\mathrm{Wh}) = V_{nominal} \times Q\ (\mathrm{Ah})$ | Uses NOMINAL voltage, not the 4.2 V charge limit. A 3.7 V, 3.0 Ah 18650 cell stores about 11 Wh. |

## Traps & Exam Notes

- **Treating the lead-acid electrolyte as inert.** Sulfuric acid is consumed on discharge, so the specific gravity falls from about 1.28 fully charged to about 1.10 discharged. A hydrometer therefore reads state of charge — and a cell topped up with water instead of acid reads low even when fully charged.
- **Confusing the nominal and maximum voltage of a lithium-ion cell.** Nominal is 3.6-3.7 V; the charge cutoff is 4.2 V and the discharge cutoff about 2.5-3.0 V. Sizing a pack with 4.2 V per cell overstates the voltage, and discharging below the cutoff permanently damages the cell.
- **Recharging a primary cell.** Alkaline, zinc-carbon, silver-oxide and lithium primary cells are not rechargeable; forcing current through them generates gas and can rupture the seal. Only the named secondary chemistries (lead-acid, NiCd, NiMH, Li-ion, Li-polymer) may be charged.
- **Assuming series connection raises capacity.** Series adds voltage only, and parallel adds capacity only. Wiring cells in series to 'get more runtime' leaves the Ah rating unchanged and can drive the weakest cell into reverse polarity.
- **Assigning the NiCd memory effect to every chemistry.** The voltage-depression 'memory' is characteristic of sintered-plate NiCd; NiMH does not share it, and its real penalty is a much higher self-discharge rate (often 20-30% per month against 10% for NiCd).

## See Also

- [[09_Redox_and_Galvanic_Cells]]
- [[10_Nernst_Equation_and_Faraday’s_Laws]]

---

[[10_Nernst_Equation_and_Faraday’s_Laws|⬅ 10]] · [[_MOC_General_Chemistry|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
