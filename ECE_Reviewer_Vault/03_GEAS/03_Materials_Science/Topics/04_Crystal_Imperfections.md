---
id: GEAS-03-04
title: "Crystal Imperfections"
part: "03_GEAS"
area: "03_Materials_Science"
topic: 4
tier: 3
depth: full
problem_count: 0
prereqs: ["[[01_Crystal_Structures_and_Unit_Cells]]"]
tags: ["ece", "geas", "materials_science"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Crystal Imperfections

> [!abstract] Scope
> Recall every defect type from zero- to three-dimensional, the notation and magnitude of the Burgers vector, and how each defect changes strength, ductility and density.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Equilibrium vacancy fraction | $\frac{n_v}{N} = \exp\left(-\frac{Q_v}{kT}\right)$ | Q_v in J/atom (convert from eV: multiply by 1.602\times10^{-19}), k = 1.38\times10^{-23}\ \mathrm{J/K} or 8.617\times10^{-5}\ \mathrm{eV/K}. Mixing eV energy with the joule k gives an exponent wrong by 10^{19}. For Cu, Q_v = 0.9 eV gives 2.9\times10^{-5} at 1000 K but only 7.6\times10^{-16} at 300 K. |
| Vacancy concentration per volume | $n_v = N\exp\left(-\frac{Q_v}{kT}\right)$ | N is the number of lattice sites per unit volume, about 8.5\times10^{22}\ \mathrm{cm^{-3}} for copper. The fraction is steeply temperature-dependent — roughly tripling per 100 K near 1000 K but rising by more than a decade per 100 K near 500 K — so a quenched sample holds far more vacancies than an annealed one. |
| Frenkel defect | $\mathrm{vacancy} + \mathrm{interstitial},\ \mathrm{stoichiometry\ preserved}$ | An ion leaves its own site and sits in an interstitial. Charge-neutral overall and density nearly unchanged, but it is the dominant disorder in AgCl and CaF_2. |
| Schottky defect | $\mathrm{cation\ vacancy} + \mathrm{anion\ vacancy\ (pair)}$ | Equal numbers of both vacancies keep charge neutrality, as in NaCl and KCl. Density falls because two atoms are absent while a barely changes — the measured-density signature of an ionic crystal defect. |
| Burgers vector magnitude in FCC | $b = \frac{a}{\sqrt{2}} = \frac{a}{2}\langle110\rangle = 0.707a$ | The shortest lattice translation, along the close-packed face diagonal. It is the full slip distance of one dislocation event; strain energy scales as b^2, so this is the lowest-energy choice. |
| Burgers vector magnitude in BCC | $b = \frac{\sqrt{3}\,a}{2} = \frac{a}{2}\langle111\rangle = 0.866a$ | Along the body diagonal, the BCC close-packed direction. About 22% longer than the FCC value, so quoting a/\sqrt{2} understates the stored energy by 33%. |
| Dislocation density | $\rho_d = \frac{\mathrm{total\ dislocation\ line\ length}}{\mathrm{volume}}$ | Units m^{-2}. Annealed metal is 10^{10}–10^{11}\ \mathrm{m^{-2}}, heavily cold-worked 10^{15}–10^{16}\ \mathrm{m^{-2}}; a density of 10^{10}\ \mathrm{m^{-2}} in a 1 mm^3 crystal is already 10 m of dislocation line (density x volume = 10^{10} m^{-2} x 10^{-9} m^3). |
| Slip systems in FCC | $4\ \{111\} \times 3\ \langle110\rangle = 12$ | The ductility of Cu, Al, Ni and Au. HCP has only 3 easy systems at room temperature (the (0001) basal plane), which is why Mg and Zn are relatively brittle. |
| Critical resolved shear stress (Schmid law) | $\tau_{CRSS} = \sigma\cos\phi\cos\lambda$ | Slip starts when the shear resolved onto the slip plane and slip direction reaches a threshold, not when the axial stress does. phi is the angle to the plane normal, lambda the angle to the slip direction. |
| Hall-Petch strengthening | $\sigma_y = \sigma_0 + \frac{k_y}{\sqrt{d}}$ | d is grain diameter in metres, so a 10 $\mathrm{\mu m}$ grain gives 1/\sqrt{d} = 316\ \mathrm{m^{-1/2}}. Smaller grains mean more boundary area and a higher yield strength. |
| Hume-Rothery size criterion | $\left\lvert \frac{R_{solute}-R_{solvent}}{R_{solvent}}\right \rvert < 15\%$ | One of four conditions for extensive substitutional solubility; the others are similar crystal structure, similar electronegativity and equal valence. Ni in Cu passes at 2.7%, Pb in Cu fails badly. |
| Atomic radius from lattice parameter | $R_{FCC} = \frac{\sqrt{2}a}{4},\qquad R_{BCC} = \frac{\sqrt{3}a}{4}$ | Needed for the Hume-Rothery size check. Comparing lattice parameters instead of radii (Cu 3.615 Å vs Ni 3.517 Å) is meaningless across different structures. |
| Vacancy effect on density | $\frac{\Delta\rho}{\rho} \approx -c_{vac}$ | One vacancy removes one atom's mass while barely changing the cell volume, so measured density falls in direct proportion to the vacancy fraction. |

## Traps & Exam Notes

- **Calling a screw dislocation 'a line of missing atoms'.** An edge dislocation is an extra half-plane; a screw dislocation is a spiral ramp with no extra plane at all. Describing a screw as a missing plane loses the mark on any question about strain fields, cross-slip or Burger's-vector direction.
- **Using $b = a/\sqrt{2}$ for a BCC metal.** The BCC Burgers vector is $\frac{\sqrt{3}}{2}a = 0.866a$, about 22% longer than the FCC $0.707a$. Because stored strain energy goes as $b^2$, the error is 33%, and it also changes the computed slip distance.
- **Reversing Frenkel and Schottky.** Frenkel = vacancy **plus** interstitial of the same ion (density nearly unchanged); Schottky = a paired cation and anion vacancy (density falls). Swapping the names is the most common error on ionic-crystal questions.
- **Believing grain boundaries weaken a metal.** Boundaries are barriers to dislocation motion, so refining grain size *raises* yield strength by Hall-Petch. Removing boundaries (a single crystal) makes the metal softer and easier to deform.
- **Treating every vacancy as damage.** Equilibrium vacancies exist at any $T>0$ and are the vehicle for diffusion; only excess vacancies from quenching or radiation are 'damage'. A metal at 1000 K holds roughly 1 vacancy per 34 000 sites in thermodynamic equilibrium.

## See Also

- [[01_Crystal_Structures_and_Unit_Cells]]
- [[03_Miller_Indices]]
- [[05_Stress,_Strain_and_Mechanical_Properties]]
- [[02_Atomic_Packing_Factor_and_Density]]

---

[[03_Miller_Indices|⬅ 03]] · [[_MOC_Materials_Science|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Stress,_Strain_and_Mechanical_Properties|05 ➡]]
