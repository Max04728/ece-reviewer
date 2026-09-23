---
id: GEAS-03-02
title: "Atomic Packing Factor and Density"
part: "03_GEAS"
area: "03_Materials_Science"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Crystal_Structures_and_Unit_Cells]]"]
tags: ["ece", "geas", "materials_science"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Atomic Packing Factor and Density

> [!abstract] Scope
> Compute how much of a unit cell is occupied by atoms and predict a material's density from its cell geometry, then judge what a mismatch with the measured value means.

## Core Concept

> [!tip] Intuition
> APF asks how efficiently spheres fill a box; density asks how much that box weighs. Same cell, two questions — and both are decided by the number of atoms per cell and the radius–lattice relation.

**APF is a ratio, so it is dimensionless and unit-free.** $\mathrm{APF} = \dfrac{n\left(\frac{4}{3}\pi R^3\right)}{V_c}$. Because it is a ratio, the same structure always yields the same number no matter what the actual lattice parameter is: SC 0.52, BCC 0.68, FCC 0.74, HCP 0.74, diamond cubic 0.34, caesium chloride (CsCl) 0.73. If a question gives you a lattice parameter and asks for the APF, that number is a distractor — the APF depends only on the structure type.

**Why the packing factors order the way they do.** SC packs only along the cube edge, so it wastes the face and body directions: $\pi/6 = 52.4\%$. BCC adds a body-centre atom that touches all eight corners, but the atoms still do not touch along the edges, so it reaches only $\pi\sqrt{3}/8 = 68.0\%$. FCC and HCP are close-packed planes stacked in different sequences (ABCABC versus ABAB) and both reach the three-dimensional sphere-packing maximum, $\pi/(3\sqrt{2}) = 74.05\%$. Kepler's conjecture — that 0.7405 is the largest possible fraction for equal spheres — was only proved in 1998; the board only needs the number and the ordering SC < BCC < FCC = HCP.

**The theoretical density formula and where it breaks.** $\rho = \dfrac{nA}{V_c N_A}$ assumes the crystal is perfect, that $a$ was measured at the same temperature as $\rho$, and that the sample is a single phase with no porosity. Measured density *below* theoretical is the signature of vacancies or porosity; *above* theoretical points to a heavier second phase, to a substitutional solute heavier than the host, or to an error in $a$. The discrepancy size matters: a fraction of a percent is normal point-defect content, several percent means either real porosity or a wrong structure assumption.

**The unit-conversion discipline that decides every answer.** Density is wanted in $\mathrm{g/cm^3}$, so express the cell edge in centimetres:
$$1\ \hat{A} = 10^{-8}\ \mathrm{cm}$$
and therefore $1\ \hat{A}^3 = 10^{-24}\ \mathrm{cm^3}$. One shortcut that saves time and prevents errors is to compute $\rho = \dfrac{nA}{a^3 N_A}\times10^{24}$ when $a$ is entered in ångströms — the $10^{24}$ is the conversion for $\hat{A}^3\rightarrow\mathrm{cm^3}$ folded in. Write the factor down rather than trusting a mental power of ten.

**The inverse problem is the exam favourite.** Given $\rho$ and $A$, recover the structure: compute $a$ from $a = (nA/\rho N_A)^{1/3}$ for each candidate $n$ (1, 2, 4), then check which candidate produces a *physically sensible* atomic radius against known values ($R$ is 1.2–1.8 Å for most metals) and which matches a handbook lattice parameter. This is also how the number of atoms per cell is measured in practice, and it is why a density measurement plus an X-ray lattice parameter is a complete structural characterisation.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Atomic packing factor | $APF = \frac{n\left(\frac{4}{3}\pi R^3\right)}{V_c}$ | Dimensionless. Use R and V_c in the same length unit; the value depends only on the structure, never on the lattice parameter. |
| SC packing factor | $APF = \frac{\pi}{6} \approx 0.524$ | With a = 2R. Low because atoms touch only along the edge. |
| BCC packing factor | $APF = \frac{\pi\sqrt{3}}{8} \approx 0.680$ | With a = 4R/\sqrt{3}. Quoting 0.74 here overstates the filled volume by 8.8%. |
| FCC and HCP packing factor | $APF = \frac{\pi}{3\sqrt{2}} \approx 0.7405$ | The maximum for equal spheres. FCC uses a = 4R/\sqrt{2}; HCP uses a = 2R with ideal c/a. |
| Diamond cubic packing factor | $APF = \frac{\pi\sqrt{3}}{16} \approx 0.340$ | 8 atoms per cell, a = 8R/\sqrt{3}. Covalent Si, Ge and C, hence their low densities. |
| Theoretical density | $\rho = \frac{nA}{V_c N_A}$ | A in g/mol, N_A = 6.022\times10^{23}\ \mathrm{mol^{-1}}. n must be the true atoms per cell, not the number of lattice points. |
| Density with a in ångströms | $\rho = \frac{nA}{a^3 N_A}\times10^{24}$ | Shortcut for cubic cells. The 10^{24} converts \hat{A}^3 to cm^3; omitting it gives an answer 10^{24} too large. |
| HCP cell volume | $V_c = \frac{3\sqrt{3}}{2}a^2c$ | Six atoms per hexagonal cell. Using a^2c inflates density by a factor of 2.6. |
| Equivalent spherical volume | $V_{atoms} = n\frac{4}{3}\pi R^3$ | Only valid for atoms modelled as hard spheres; real electron clouds are not rigid and APF is a model, not a measurement. |
| Void fraction | $f_{void} = 1 - APF$ | SC 47.6%, BCC 32.0%, FCC 26.0%. Useful check: void fraction must fall as packing improves. |
| Density deficit and vacancies | $c_{vac} \approx \frac{\rho_{th}-\rho_{meas}}{\rho_{th}}$ | Requires a from the same sample. A negative result means the measured density exceeds theoretical — look for a second phase. |
| Lattice parameter from density | $a = \left(\frac{nA}{\rho N_A}\right)^{1/3}$ | Cubic cells only. Compare the resulting a with handbook values to identify the structure. |

## Worked Problems

### P1. Tungsten is BCC with $a = 3.165\ \hat{A}$ and $A = 183.84\ \mathrm{g/mol}$. Confirm the atomic radius from the BCC contact geometry, then determine the theoretical density.

**Given:** BCC, $n = 2$; $a = 3.165\ \hat{A}$; $A = 183.84\ \mathrm{g/mol}$

**Solution:**

1. BCC contact is the body diagonal: sqrt(3) a = 4R
2. R = sqrt(3)(3.165)/4 = 5.4819/4 = 1.370 Å
3. V_c = (3.165e-8)^3 = 3.171e-23 cm^3
4. ρ = 2(183.84)/(3.171e-23 x 6.022e23) = 367.68/19.100
5. ρ = 19.25 g/cm^3

> [!success]- Answer
> **$R = 1.370\ \hat{A}$ and $\rho = 19.25\ \mathrm{g/cm^3}$ (handbook 19.3 g/cm³).**

> [!warning] Trap
> Using $R = a/2$ gives $1.583\ \hat{A}$, and then applying the FCC radius relation $a = 4R/\sqrt{2}$ to check it 'closes' the wrong way. Fix the structure first, then pick the one contact relation that belongs to it.

### P2. Gold is FCC ($A = 196.97\ \mathrm{g/mol}$, $a = 4.078\ \hat{A}$). Compute its theoretical density, then find its atomic packing factor without using $a$.

**Given:** FCC, $n = 4$; $a = 4.078\ \hat{A}$; $A = 196.97\ \mathrm{g/mol}$

**Solution:**

1. V_c = (4.078e-8)^3 = 6.782e-23 cm^3
2. ρ = 4(196.97)/(6.782e-23 x 6.022e23) = 787.88/40.843
3. ρ = 19.29 g/cm^3
4. APF for FCC = π/(3 sqrt(2)) = 3.14159/4.24264 = 0.7405
5. Void fraction = 1 - 0.7405 = 0.2595

> [!success]- Answer
> **$\rho = 19.29\ \mathrm{g/cm^3}$ and APF $= 0.7405$ (25.95% void), independent of the lattice parameter.**

> [!warning] Trap
> Dividing $a$ into the APF calculation and losing numerical precision, or reporting 26.0% *filled* instead of 26.0% *void*. The APF is the filled fraction — $1-\mathrm{APF}$ is the empty space.

### P3. A cubic metal has $n = 4$, $A = 63.55\ \mathrm{g/mol}$ and a measured density of $8.96\ \mathrm{g/cm^3}$. Determine its lattice parameter and identify the metal.

**Given:** FCC, $n = 4$; $A = 63.55\ \mathrm{g/mol}$; $\rho = 8.96\ \mathrm{g/cm^3}$

**Solution:**

1. a^3 = nA/(ρ N_A) = 4(63.55)/(8.96 x 6.022e23)
2. Numerator 254.20; denominator 5.396e24
3. a^3 = 4.711e-23 cm^3
4. a = (4.711e-23)^(1/3) = 3.613e-8 cm = 3.613 Å
5. n = 4 and a = 3.61 Å identify FCC copper

> [!success]- Answer
> **$a = 3.613\ \hat{A}$; the metal is copper (FCC, $a = 3.615\ \hat{A}$).**

> [!warning] Trap
> Solving for $a$ and forgetting the cube root, reporting $a^3 = 4.71\times10^{-23}$ as the lattice parameter. The exponent gives the slip away: a lattice parameter can never be $10^{-23}$ of anything.

### P4. Screen a semiconductor: silicon has the diamond cubic structure with 8 atoms per cell, $A = 28.09\ \mathrm{g/mol}$ and $a = 5.431\ \hat{A}$. Compute its theoretical density and its packing factor.

**Given:** diamond cubic, $n = 8$; $a = 5.431\ \hat{A}$; $A = 28.09\ \mathrm{g/mol}$

**Solution:**

1. V_c = (5.431e-8)^3 = 1.6018e-22 cm^3
2. ρ = 8(28.09)/(1.6018e-22 x 6.022e23) = 224.72/96.463
3. ρ = 2.33 g/cm^3
4. For diamond cubic a = 8R/sqrt(3), so R = sqrt(3)a/8 = 1.7321(5.431)/8 = 1.176 Å
5. APF = 8(4/3)π(1.176)^3/[1.6018e-22 x 1e24] = 8 x 6.812/160.18
6. APF = 54.50/160.18 = 0.340

> [!success]- Answer
> **$\rho = 2.33\ \mathrm{g/cm^3}$ (measured 2.33) and APF $= 0.340$, only 34% filled.**

> [!warning] Trap
> Applying the FCC relation $a = 4R/\sqrt{2}$ to silicon because it 'looks' FCC. Diamond cubic is two interpenetrating FCC lattices, and its contact direction is the body diagonal of the cube ($a = 8R/\sqrt{3}$); using the FCC relation overstates $R$ by 22%.

### P5. An FCC metal is measured with a lattice parameter $a = 3.517\ \hat{A}$ and a density of $8.86\ \mathrm{g/cm^3}$ ($A = 58.69\ \mathrm{g/mol}$). Reconcile the two measurements and state the density deficit as a percentage.

**Given:** FCC, $n = 4$; $a = 3.517\ \hat{A}$; $A = 58.69\ \mathrm{g/mol}$; $\rho_{meas} = 8.86\ \mathrm{g/cm^3}$

**Solution:**

1. V_c = (3.517e-8)^3 = 4.3503e-23 cm^3
2. ρ_th = 4(58.69)/(4.3503e-23 x 6.022e23) = 234.76/26.197
3. ρ_th = 8.961 g/cm^3
4. Deficit = (8.961 - 8.86)/8.961 = 0.101/8.961
5. Deficit = 0.0113 = 1.13%

> [!success]- Answer
> **$\rho_{th} = 8.96\ \mathrm{g/cm^3}$ against $8.86\ \mathrm{g/cm^3}$ measured: a deficit of about **1.1%**, consistent with roughly 1% vacant sites.**

> [!warning] Trap
> Dividing by the measured value instead of the theoretical one. The vacancy fraction is defined against the *perfect-crystal* baseline; dividing by $\rho_{meas}$ inflates the fraction by the same 1% and, in cases with a large deficit, visibly shifts the answer.

## Traps & Exam Notes

- **Quoting the FCC packing factor (0.74) for a BCC metal.** The computed filled volume comes out too high by the ratio $0.74/0.68 = 1.088$, an 8.8% error, because BCC leaves roughly a third of the cell empty rather than a quarter.
- **Reporting void fraction where packing factor was asked.** APF 0.74 means 74% *filled*; the void fraction is 26%. Answering the complement loses the mark even though the arithmetic was right.
- **Entering $a$ in ångströms into $V_c = a^3$ without a conversion.** With $A$ in g/mol the answer comes out $10^{24}$ times too large — the single most common error in this topic. Use $1\ \hat{A}^3 = 10^{-24}\ \mathrm{cm^3}$, or the $\times10^{24}$ shortcut with an explicit note to yourself.
- **Using the ideal $c/a = 1.633$ for a real HCP metal.** Zinc (1.856) and cadmium (1.886) are far from ideal; forcing 1.633 into a zinc cell volume makes the density wrong by about 12%.
- **Treating the packing factor as dependent on the lattice parameter.** APF is a pure ratio fixed by the structure type. If a problem supplies $a$ and asks only for APF, the supplied number is a distractor.
- **Reading any density mismatch as experimental error.** A measured density below theoretical is *evidence* — vacancies, porosity, or an interstitial-poor composition. Label it as such; the question is usually testing whether you know the defect interpretation.
- **Assuming a measured density above theoretical is impossible.** It happens whenever a heavier second phase or a heavy substitutional solute is present. Do not 'correct' it by adjusting $n$.

## See Also

- [[01_Crystal_Structures_and_Unit_Cells]]
- [[04_Crystal_Imperfections]]
- [[03_Miller_Indices]]

---

[[01_Crystal_Structures_and_Unit_Cells|⬅ 01]] · [[_MOC_Materials_Science|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Miller_Indices|03 ➡]]
