---
id: GEAS-03-05
title: "Stress, Strain and Mechanical Properties"
part: "03_GEAS"
area: "03_Materials_Science"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Crystal_Imperfections]]"]
tags: ["ece", "geas", "materials_science"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Stress, Strain and Mechanical Properties

> [!abstract] Scope
> Read a stress–strain curve for the numbers a designer needs — modulus, yield, UTS, ductility and toughness — and apply Hooke's law with correct units and safety factors.

## Core Concept

> [!tip] Intuition
> Pull a metal bar and plot force per area against stretch per length. The slope tells you stiffness, the first departure from a straight line tells you the yield point, the peak tells you the ultimate strength, and the area under the whole curve tells you how much energy the bar absorbed before it broke.

**The curve, point by point.** Loading a ductile metal from zero traces a straight line (elastic region) up to the **proportional limit**, where the curve first bends. The **elastic limit** is the largest stress with no permanent set — usually just above the proportional limit and often treated as the same point in exam work. The **yield point** follows: some steels show distinct upper and lower yield points, while most metals show a gradual knee, so yield strength is defined by the **0.2% offset** construction — draw a line parallel to the elastic slope from a strain of 0.002 and read where it crosses the curve. Stress then rises to the **ultimate tensile strength (UTS)**, the maximum engineering stress, after which deformation localises into a neck and the *engineering* stress falls to fracture. The material is not getting weaker after UTS — it is the cross-sectional area shrinking faster than the load falls, which the engineering stress hides.

**Modulus of elasticity is a bond-stiffness measurement, not a strength.** $E = \sigma/\epsilon$ in the linear region, and its value is set by the curvature of the interatomic potential well — which is why $E$ depends on bonding type and only weakly on microstructure. All steels, plain or alloyed, heat-treated or annealed, sit near $E = 200\ \mathrm{GPa}$, because alloying barely perturbs the bonding. That fact is examinable: if a question asks how a treatment changes stiffness and the treatment only changes microstructure (cold work, quenching, grain refinement), the answer is *it does not change $E$*. Cold working raises yield strength but leaves the slope of the elastic line untouched.

**The elastic constants come in fours.** For an isotropic material, $E$ (tension), $G$ (shear), $K$ (bulk, resistance to hydrostatic compression) and $\nu$ (Poisson's ratio, lateral contraction per axial extension) are linked:
$$G = \dfrac{E}{2(1+\nu)}$$
and $E = 3K(1-2\nu)$. For metals $\nu \approx 0.25$–$0.35$ (0.33 is a safe exam default) and $G \approx 0.4E$. A value of $\nu = 0.5$ means the material is incompressible (rubber-like), and $\nu$ can never exceed 0.5 for a stable isotropic solid — an answer above 0.5 signals an arithmetic slip.

**Ductile versus brittle.** Ductility is quantified as percent elongation, $\mathrm{EL} = \frac{L_f-L_0}{L_0}\times100$, and percent reduction in area, $\mathrm{RA} = \frac{A_0-A_f}{A_0}\times100$. Above roughly 5% elongation the material is ductile and fails after visible necking and shear; below it, the material is brittle and fails abruptly by cleavage on a plane normal to the tensile axis, with essentially no plastic deformation. Ductile metals (Cu, Al, mild steel) absorb large energy before fracture and give warning; brittle materials (cast iron, ceramics, glass) absorb little and fail without visible strain. That is why **static design against yielding** uses the yield strength for ductile materials with a factor of safety, while **brittle materials are designed against the ultimate strength**, since they have no yield point to give warning.

**Toughness and resilience are areas, not points.** Modulus of resilience is the energy stored per unit volume in the elastic range, $u_r = \frac{1}{2}\sigma_y\epsilon_y = \dfrac{\sigma_y^2}{2E}$ — the triangle under the elastic line. Toughness is the total area under the whole curve to fracture, so a tough material needs both strength *and* ductility. High-strength tool steel can be strong yet not tough; mild steel is less strong but far tougher. The units expose the meaning:
$$\mathrm{MPa}\times\mathrm{strain}$$
= $\mathrm{MJ/m^3}$ = $\mathrm{J/cm^3}$, an energy per volume.

**Where the numbers come from and how they are changed.** Grain refinement, solid-solution alloying, cold work (strain hardening) and precipitation hardening all raise yield strength, and all of them do it by obstructing dislocation motion. Cold work raises strength and hardness but lowers ductility and can leave residual stress; annealing reverses it. Raising temperature lowers $E$ slightly, lowers yield strength, and — above roughly $0.4T_m$ — lets the metal creep, deforming slowly under a constant load well below yield. In a tensile test, higher strain rate gives a higher apparent yield stress, so quoted values must be tied to a standard test rate.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Engineering stress | $\sigma = \frac{F}{A_0}$ | Uses the ORIGINAL area for the whole test. Force in N and area in m^2 gives Pa; area in mm^2 with force in N gives MPa directly. |
| Engineering strain | $\epsilon = \frac{L-L_0}{L_0} = \frac{\Delta L}{L_0}$ | Dimensionless, often quoted in microstrain or percent. Never mix mm of extension with m of gauge length. |
| Hooke's law in tension | $\sigma = E\epsilon$ | Valid only in the linear-elastic region, below the proportional limit. E in GPa pairs with stress in MPa and strain as a bare number. |
| Poisson's ratio | $\nu = -\frac{\epsilon_{lateral}}{\epsilon_{axial}}$ | About 0.33 for steels, 0.34 for copper, 0.35 for aluminium. Cannot exceed 0.5 for an isotropic solid; 0.5 means incompressible. |
| Shear stress and shear strain | $\tau = \frac{F}{A},\qquad \gamma = \frac{\delta}{h},\qquad \tau = G\gamma$ | F is parallel to the area, not normal to it. Using the normal stress formula here is the classic mix-up. |
| Elastic constants relation | $G = \frac{E}{2(1+\nu)}$ | Isotropic materials only. With nu = 0.33, G = 0.376E; the common shortcut G = 0.4E is an exam rounding. |
| Bulk modulus relation | $E = 3K(1-2\nu)$ | K is the resistance to hydrostatic pressure. As nu approaches 0.5, E/K approaches 0 and the material becomes incompressible. |
| Elongation to failure | $\%\mathrm{EL} = \frac{L_f-L_0}{L_0}\times100$ | The gage length must be stated; elongation on a short gage length reads higher. Above about 5% the metal is ductile. |
| Reduction in area | $\%\mathrm{RA} = \frac{A_0-A_f}{A_0}\times100$ | Measured at the neck, so it captures local ductility. Always larger than percent elongation. |
| Modulus of resilience | $u_r = \frac{\sigma_y^2}{2E}$ | Energy per unit volume stored elastically to the yield point. Result lands in J/m^3 when sigma is Pa and E is Pa; divide by 10^6 for MJ/m^3. |
| Modulus of toughness | $u_t = \int_0^{\epsilon_f}\sigma\,d\epsilon$ | Area under the full curve to fracture, so it needs both strength and ductility. Approximated for a ductile metal by \sigma_{UTS}\epsilon_f. |
| True stress (up to necking) | $\sigma_t = \frac{F}{A_i} = \sigma(1+\epsilon)$ | Uses the instantaneous area, so it keeps rising to fracture while engineering stress falls. Valid only before necking unless the area is measured directly. |
| True strain (up to necking) | $\epsilon_t = \ln(1+\epsilon)$ | Small strains: true and engineering strain agree to within 1% below about 2%. The two diverge quickly in the plastic range. |
| Factor of safety | $n = \frac{\sigma_{yield}}{\sigma_{allow}}$ | For ductile materials. Brittle materials are designed against the ultimate strength, because they have no yield warning. |
| Grain-size strengthening (Hall-Petch) | $\sigma_y = \sigma_0 + k_y d^{-1/2}$ | d in metres. Refining grains raises yield strength; it does not change E. |

## Worked Problems

### P1. A round tensile specimen of diameter $6.000\ \mathrm{mm}$ and gage length $50.00\ \mathrm{mm}$ carries $11.3\ \mathrm{kN}$ and extends by $0.100\ \mathrm{mm}$ in the elastic range. Find the stress, the strain and the modulus of elasticity, then state whether the result is consistent with a steel.

**Given:** $d_0 = 6.000\ \mathrm{mm}$; $L_0 = 50.00\ \mathrm{mm}$; $F = 11.3\ \mathrm{kN}$; $\Delta L = 0.100\ \mathrm{mm}$

**Solution:**

1. A_0 = π(3.0e-3)^2 = 2.827e-5 m^2
2. σ = 11300/2.827e-5 = 4.00e8 Pa = 400 MPa
3. ε = 0.100/50.00 = 2.00e-3
4. E = σ/ε = 400e6/2.00e-3 = 2.00e11 Pa = 200 GPa
5. 200 GPa is exactly the textbook modulus for steel, so the data are self-consistent

> [!success]- Answer
> **$\sigma = 400\ \mathrm{MPa}$, $\varepsilon = 2.00\times10^{-3}$, $E = 200\ \mathrm{GPa}$ — consistent with steel.**

> [!warning] Trap
> Dividing by the wrong length. Strain is extension over *gage length*; using the 6 mm diameter (or the cross-section in mm²) as the divisor gives a strain 8 times too large and a modulus 8 times too small.

### P2. A brass tube has outside diameter $12\ \mathrm{mm}$, inside diameter $9\ \mathrm{mm}$ and gage length $100.0\ \mathrm{mm}$. Under an axial load of $15.0\ \mathrm{kN}$ it extends by $0.137\ \mathrm{mm}$ and its outside diameter shrinks by $0.0041\ \mathrm{mm}$. Compute the modulus of elasticity and Poisson's ratio.

**Given:** $d_o = 12\ \mathrm{mm}$, $d_i = 9\ \mathrm{mm}$; $L_0 = 100.0\ \mathrm{mm}$; $F = 15.0\ \mathrm{kN}$; $\Delta L = 0.137\ \mathrm{mm}$; $\Delta d_o = -0.0041\ \mathrm{mm}$

**Solution:**

1. A = (π/4)(0.012^2 - 0.009^2) = (π/4)(1.44e-4 - 8.1e-5) = (π/4)(6.3e-5) = 4.948e-5 m^2
2. σ = 15000/4.948e-5 = 3.031e8 Pa = 303 MPa
3. ε_axial = 0.137/100.0 = 1.370e-3
4. E = 303e6/1.370e-3 = 2.21e11 Pa = 221 GPa
5. ε_lateral = -0.0041/12 = -3.417e-4
6. ν = -ε_lat/ε_axial = 3.417e-4/1.370e-3 = 0.249

> [!success]- Answer
> **$E = 221\ \mathrm{GPa}$ and $\nu = 0.25$.**

> [!warning] Trap
> Using the outside diameter as the whole cross-section, $A = \pi d_o^2/4 = 1.131\times10^{-4}\ \mathrm{m^2}$. That is 2.3 times too large, so the stress and the modulus both come out 2.3 times too small. For a tube, subtract the bore area.

### P3. An isotropic metal has $E = 120\ \mathrm{GPa}$ and $\nu = 0.30$. Find its shear modulus and bulk modulus, then determine the change in diameter of a $12.00\ \mathrm{mm}$ rod that is stretched elastically to an axial strain of $0.200\%$.

**Given:** $E = 120\ \mathrm{GPa}$; $\nu = 0.30$; $d_0 = 12.00\ \mathrm{mm}$; $\varepsilon_{axial} = 2.00\times10^{-3}$

**Solution:**

1. G = E/[2(1+ν)] = 120/[2(1.30)] = 120/2.60 = 46.2 GPa
2. K = E/[3(1-2ν)] = 120/[3(0.40)] = 120/1.20 = 100 GPa
3. ε_lat = -ν ε_axial = -0.30 x 2.00e-3 = -6.00e-4
4. Δd = ε_lat d_0 = -6.00e-4 x 12.00 mm = -7.20e-3 mm
5. The diameter decreases by 7.2 µm

> [!success]- Answer
> **$G = 46.2\ \mathrm{GPa}$, $K = 100\ \mathrm{GPa}$, and $\Delta d = -7.2\ \mathrm{\mu m}$ (a decrease).**

> [!warning] Trap
> Writing the denominator as $2(1+\nu)$ but substituting $\nu$ as a percentage (30 instead of 0.30). That gives $G = 1.94\ \mathrm{GPa}$, roughly 24 times too small — Poisson's ratio is a bare number, never a percent.

### P4. A structural steel has $\sigma_y = 300\ \mathrm{MPa}$ and $\sigma_{UTS} = 450\ \mathrm{MPa}$. A tie rod of $5\ \mathrm{mm^2}$ cross-section must carry a working load of $1.2\ \mathrm{kN}$. Determine the factor of safety with respect to yielding, and the load that would cause fracture.

**Given:** $A = 5\ \mathrm{mm^2}$; $\sigma_y = 300\ \mathrm{MPa}$; $\sigma_{UTS} = 450\ \mathrm{MPa}$; $F_{working} = 1.2\ \mathrm{kN}$

**Solution:**

1. Working stress = 1200 N/5e-6 m^2 = 2.4e8 Pa = 240 MPa
2. Safety factor against yielding n = 300/240 = 1.25
3. Load at yield = σ_y A = 300e6 x 5e-6 = 1500 N = 1.5 kN
4. Load at UTS = 450e6 x 5e-6 = 2250 N = 2.25 kN

> [!success]- Answer
> **$n = 1.25$ against yielding; yield load $1.50\ \mathrm{kN}$ and fracture load $2.25\ \mathrm{kN}$.**

> [!warning] Trap
> Using $\sigma_{UTS}$ in the safety factor for a ductile steel. Ductile members are designed against yield (the structure must not deform permanently); UTS is only the design basis for brittle materials that fail without warning.

### P5. A steel wire of diameter $0.5\ \mathrm{mm}$ has $E = 200\ \mathrm{GPa}$ and $\sigma_y = 450\ \mathrm{MPa}$. For a gage length of $2\ \mathrm{m}$, find the maximum elastic load, the extension at that load, and the modulus of resilience.

**Given:** $d = 0.5\ \mathrm{mm}$; $L_0 = 2\ \mathrm{m}$; $E = 200\ \mathrm{GPa}$; $\sigma_y = 450\ \mathrm{MPa}$

**Solution:**

1. A = π(0.25e-3)^2 = 1.9635e-7 m^2
2. F_max = σ_y A = 450e6 x 1.9635e-7 = 88.36 N
3. ε_y = σ_y/E = 450e6/200e9 = 2.25e-3
4. ΔL = ε_y L_0 = 2.25e-3 x 2 m = 4.50e-3 m = 4.50 mm
5. u_r = σ_y^2/(2E) = (450e6)^2/(2 x 200e9) = 5.0625e5 J/m^3

> [!success]- Answer
> **$F_{max} = 88.4\ \mathrm{N}$, elongation at yield $= 4.50\ \mathrm{mm}$, resilience $u_r = 5.06\times10^{5}\ \mathrm{J/m^3} = 506\ \mathrm{kJ/m^3}$.**

> [!warning] Trap
> Computing resilience as $\sigma_y\epsilon_y$ instead of $\frac{1}{2}\sigma_y\epsilon_y$. The elastic region is a triangle under the curve, not a rectangle, so dropping the $\frac{1}{2}$ doubles the stored-energy answer.

## Traps & Exam Notes

- **Using the instantaneous area to get engineering stress.** Engineering stress uses the *original* area throughout; the falling part of the stress–strain curve after UTS exists only because $A_0$ is held constant while the neck reduces the true area. Using the neck area removes the drop and turns the curve into the true-stress curve.
- **Reporting a modulus that is not about 200 GPa for steel.** $E$ is a bonding property, so alloying, quenching and cold work cannot move it much. An answer of 600 GPa for a steel, or a claim that annealing doubled its stiffness, is wrong on principle — microstructure changes strength, not stiffness.
- **Dropping the $\frac{1}{2}$ in resilience.** $u_r = \frac{1}{2}\sigma_y\epsilon_y = \sigma_y^2/(2E)$. The elastic region is a triangle; using the rectangle doubles the energy.
- **Designing a ductile member against UTS.** Ductile materials are checked against yield so the structure never deforms permanently; only brittle materials, which fail without yielding, are designed against the ultimate strength.
- **Confusing $\nu$ above 0.5 as merely unusual.** Poisson's ratio cannot exceed 0.5 for a stable isotropic solid — 0.5 is incompressible. A computed value of 0.8 is proof of a unit or sign error, not an exotic material.
- **Mixing N and mm² without noticing.** Force in newtons over area in $\mathrm{mm^2}$ gives MPa directly, but $\mathrm{kN}$ over $\mathrm{mm^2}$ gives GPa, and $\mathrm{kN}$ over $\mathrm{m^2}$ gives kPa. The unit triplet decides where the decimal point lands.
- **Reading the UTS as the fracture stress.** The engineering stress at fracture is *lower* than the UTS because of necking; UTS is the peak, not the endpoint. Quoting the endpoint as the material's strength understates it.

## See Also

- [[04_Crystal_Imperfections]]
- [[06_Hardness_Testing]]
- [[01_Crystal_Structures_and_Unit_Cells]]
- [[02_Atomic_Packing_Factor_and_Density]]

---

[[04_Crystal_Imperfections|⬅ 04]] · [[_MOC_Materials_Science|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Hardness_Testing|06 ➡]]
