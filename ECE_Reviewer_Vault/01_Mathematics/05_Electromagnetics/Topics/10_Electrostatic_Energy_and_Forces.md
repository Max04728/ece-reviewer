---
id: MATH-05-10
title: "Electrostatic Energy and Forces"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[06_Electric_Potential_and_Gradient]]", "[[09_Capacitance_from_Geometry]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Electrostatic Energy and Forces

> [!abstract] Scope
> Compute the energy stored in an electrostatic system by assembling charges or by integrating the field, and find the mechanical forces that energy produces on conductors and dielectrics.

## Core Concept

> [!tip] Intuition
> Energy is stored in the field, not in the metal. Every joule in a charged capacitor is distributed through the volume between the plates at a density $\frac{1}{2}\varepsilon E^2$ — and because nature minimises energy, that stored energy is the source of every mechanical pull, push and pressure in electrostatics.

**Assembling charges costs work.** Bringing a charge $q$ from infinity to a point where the potential is already $V$ requires work $qV$; assembling a whole system therefore costs $W=\frac{1}{2}\sum_iq_iV_i$. The $\frac{1}{2}$ is not arbitrary bookkeeping: summing $q_iV_i$ over all charges counts every pair twice, once from each end, so the true work is half of it. For a pair of point charges this gives $U=\dfrac{q_1q_2}{4\pi\varepsilon_0r}$, negative for opposite charges (the field does the work) and positive for like charges (you must push). This is exactly the quantity that appears in ionisation energies, lattice energies and electron–nucleus binding.

**The field point of view.** Instead of assembling charges, integrate the energy density over the region where the field exists:
$$W=\displaystyle\int\frac{1}{2}\mathbf{D}\cdot\mathbf{E}\,dv=\int\frac{1}{2}\varepsilon E^2\,dv$$
with $u=\frac{1}{2}\varepsilon E^2$ in J/m³. The two methods must agree, and checking that they do is a standard exam question. For an isolated conducting sphere of radius $a$ carrying $Q$, for instance, $E=Q/(4\pi\varepsilon_0r^2)$ for $r>a$, so the work done in assembling the charge is:
$$W=\int_a^{\infty}\frac{1}{2}\varepsilon_0\left(\frac{Q}{4\pi\varepsilon_0r^2}\right)^24\pi r^2dr=\frac{Q^2}{8\pi\varepsilon_0a}$$
which matches $\frac{1}{2}Q^2/C$ with $C=4\pi\varepsilon_0a$. The field picture is the one that survives into electromagnetic waves, where energy genuinely travels through empty space.

**Forces from energy, and the factor-of-two question.** A conductor or dielectric in a field is pushed in the direction that *reduces* the stored energy at constant charge:
$$F_x=-\left.\dfrac{\partial W}{\partial x}\right\rvert_Q$$
If instead the plates stay connected to a battery, the voltage is held constant and the battery also supplies charge, so the correct statement is the constant-voltage force:
$$F_x=+\left.\dfrac{\partial W}{\partial x}\right\rvert_V$$
For any linear system both routes give the same magnitude, $F=\frac{1}{2}V^2\dfrac{dC}{dx}$, because the battery supplies exactly twice the mechanical work and the extra half goes into the field. Applying the constant-charge formula with a constant-voltage setup (or vice versa) produces a signed error — the classic way to lose this mark.

**The standard forces and pressures.** For parallel plates of area $A$ separated by $d$, $W=\frac{1}{2}CV^2$ and $C=\varepsilon A/d$, so the force between the plates is:
$$F=\frac{1}{2}\varepsilon AV^2/d^2=Q^2/(2\varepsilon A)$$
and the plates are always attracted, whatever the polarity. Note that $F\neq QE_{\mathrm{gap}}$: a plate does not feel its own field, only the $E/2$ produced by the opposite plate, which is precisely where the $\frac{1}{2}$ comes from. The same factor appears as the Maxwell pressure on any conductor surface, acting outward along the normal:
$$p=\frac{1}{2}\varepsilon_0E^2=\frac{\sigma^2}{2\varepsilon_0}$$
At $E=3$ MV/m that pressure is only about 40 Pa — which is why electrostatic forces seem weak, and why they become decisive only at small separations ($F\propto1/d^2$) or in MEMS-sized devices.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Work to assemble point charges | $W=\frac{1}{2}\sum_iq_iV_i$ | The 1/2 prevents double counting each pair. V_i is the potential at q_i due to all the OTHER charges. |
| Potential energy of two charges | $U=\frac{q_1q_2}{4\pi\varepsilon_0r}$ | Negative for opposite signs. Reference at infinite separation; the separation r is in metres. |
| Capacitor energy | $W=\frac{1}{2}CV^2=\frac{1}{2}\frac{Q^2}{C}=\frac{1}{2}QV$ | One half in every form. Fixed Q -> use Q²/2C; fixed V -> use CV²/2. |
| Field energy integral | $W=\int_V\frac{1}{2}\mathbf{D}\cdot\mathbf{E}\,dv$ | Integrate over all space where the field exists. Must agree with the circuit formula. |
| Energy density | $u=\frac{1}{2}\varepsilon E^2=\frac{D^2}{2\varepsilon}$ | J/m³. Multiply by volume only when E is uniform over it. |
| Energy of a charged conducting sphere | $W=\frac{Q^2}{8\pi\varepsilon_0a}$ | Radius a. Equals Q²/2C with C = 4 pi eps0 a; note the 8 pi, not 4 pi. |
| Force at constant charge | $F_x=-\left.\frac{\partial W}{\partial x}\right\rvert_Q$ | Isolated conductors. The minus sign means the system moves to lower its energy. |
| Force at constant voltage | $F_x=+\left.\frac{\partial W}{\partial x}\right\rvert_V$ | Battery connected; the battery supplies 2x the mechanical work. Same magnitude as the constant-Q result for linear systems. |
| General electrostatic force | $F=\frac{1}{2}V^2\frac{dC}{dx}$ | Valid for linear dielectrics and rigid conductors; direction of increasing capacitance. |
| Force between parallel plates | $F=\frac{1}{2}\frac{\varepsilon AV^2}{d^2}=\frac{Q^2}{2\varepsilon A}$ | Always attractive. F = QE_gap would be exactly twice this. |
| Maxwell pressure on a conductor | $p=\frac{1}{2}\varepsilon_0E^2=\frac{\sigma^2}{2\varepsilon_0}$ | Outward tensile stress in pascals; E is the field just outside, normal to the surface. |
| Force on a point charge | $\mathbf{F}=q\mathbf{E}$ | Different physics: this is the force on a free charge in an external field, not an energy derivative. |

## Worked Problems

### P1. Find the potential energy of the system of two charges $q_1=+2\ \mu$C and $q_2=-2\ \mu$C separated by $0.1$ m.

**Given:** q1 = +2 uC; q2 = -2 uC; r = 0.1 m

**Solution:**

1. U = k q1 q2/r = (8.988e9)(2e-6)(-2e-6)/(0.1)
2. Product: (8.988e9)(-4e-12) = -0.035952
3. U = -0.035952/0.1 = -0.35952 J

> [!success]- Answer
> **$U=-0.360$ J — the pair is bound; bringing them together released energy.**

> [!warning] Trap
> Reporting a positive value because only magnitudes were substituted. The sign of the product $q_1q_2$ carries the physics: negative means bound, positive means the pair would fly apart if released.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `8.988E9×2E-6×(-)2E-6÷0.1=` → $U$ = **-0.3595** J.
> 2. Charge product first: `2E-6×(-)2E-6=` → **-4E-12** C²; the negative product is the whole sign.
> 3. Magnitudes alone would give `8.988E9×2E-6×2E-6÷0.1=` → **+0.3595** J, the classic lost sign.

### P2. A $100\ \mu$F capacitor is charged to $50$ V. Find the stored energy.

**Given:** C = 100 uF; V = 50 V

**Solution:**

1. W = (1/2)CV^2 = 0.5(100e-6)(50^2)
2. 50^2 = 2500
3. W = 0.5(100e-6)(2500) = 0.125 J

> [!success]- Answer
> **$W=0.125$ J.**

> [!warning] Trap
> Dropping the $\frac{1}{2}$ and reporting 0.25 J. Equivalently, confusing $W=QV$ (which is twice the actual stored energy at final charge) with $W=\frac{1}{2}QV$.

### P3. A uniform field $E=100$ kV/m exists throughout a volume of $0.5$ m³ of air. Find the energy density and the total stored energy.

**Given:** E = 100 kV/m = 1e5 V/m; volume = 0.5 m3; air

**Solution:**

1. u = (1/2) eps0 E^2 = 0.5(8.854e-12)(1e5)^2
2. E^2 = 1e10
3. u = 0.5(8.854e-12)(1e10) = 0.04427 J/m^3
4. W = u x volume = (0.04427)(0.5) = 0.022135 J

> [!success]- Answer
> **$u=44.3$ mJ/m³; $W=22.1$ mJ.**

> [!warning] Trap
> Squaring $100$ kV and forgetting the $10^{3}$: $E$ must enter as $10^{5}$ V/m, so $E^2=10^{10}$, not $10^{4}$. The energy then comes out $10^{6}$ times too small.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5×` `SHIFT` `CVALUE` `32` `×1E10=` → $u$ = **0.04427** J/m³ = **44.3** mJ/m³.
> 2. `×0.5=` → $W$ = **0.022135** J = **22.1** mJ.
> 3. The field is `1E5`, so $E^2$ is `1E10`: keying `100` gives `0.5×` `SHIFT` `CVALUE` `32` `×100²=` → **4.43E-8** J/m³.

### P4. A parallel-plate capacitor has $A=0.01$ m², $d=0.5$ mm and is held at $V=100$ V. Find the force pulling the plates together.

**Given:** A = 0.01 m2; d = 0.5 mm; V = 100 V; air

**Solution:**

1. F = (1/2) eps0 A V^2/d^2
2. Numerator: 0.5(8.854e-12)(0.01)(1e4) = 4.427e-10
3. d^2 = (5e-4)^2 = 2.5e-7
4. F = 4.427e-10/2.5e-7 = 1.7708e-3 N

> [!success]- Answer
> **$F=1.77$ mN, attractive.**

> [!warning] Trap
> Using $F=QE$ with the full gap field $E=V/d$: that gives 3.54 mN, exactly double. A plate does not feel its own field — only the $E/2$ from the opposite plate, which is the source of the $\frac{1}{2}$ in the formula.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5×` `SHIFT` `CVALUE` `32` `×0.01×100²÷0.5E-3²=` → $F$ = **1.7708E-3** N = **1.77** mN.
> 2. Using the full gap field $E=V/d$ doubles it: `2×Ans=` → **3.54E-3** N, the $F=QE$ trap.
> 3. The gap enters squared, so `0.5` mm must be keyed `0.5E-3`, not `0.5`.

### P5. A conductor surface in air has a field of $3$ MV/m normal to it. Find the outward electrostatic pressure on the surface.

**Given:** E = 3 MV/m = 3e6 V/m at the surface; air

**Solution:**

1. p = (1/2) eps0 E^2
2. E^2 = 9e12
3. p = 0.5(8.854e-12)(9e12)
4. p = 39.84 Pa

> [!success]- Answer
> **$p=39.8$ Pa directed outward, away from the conductor.**

> [!warning] Trap
> Forgetting the $\frac{1}{2}$ and using the full magnetic-field-like $\frac{1}{2}\mu_0H^2$ analogue without the half. Also, the pressure is outward for both positive and negative surface charge — the sign of $\sigma$ does not reverse it, because $E$ is squared.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5×` `SHIFT` `CVALUE` `32` `×3E6²=` → $p$ = **39.84** Pa outward.
> 2. Without the half: `2×Ans=` → **79.7** Pa, exactly double.
> 3. The pressure is outward for either sign of $\sigma$, because `(-)3E6` squared still gives **39.84** Pa.

## Traps & Exam Notes

- **Omitting the $\frac{1}{2}$ in $W=\frac{1}{2}\sum q_iV_i$.** Summing $q_iV_i$ counts each pair from both ends; without the half, the energy of any multi-charge system is exactly double.
- **Using $F=QE_{\mathrm{gap}}$ for a capacitor plate.** The plate sits in the field of the *other* plate, $E/2$, so the force is $Q^2/(2\varepsilon A)$. This is the same factor-of-two trap that appears in the Maxwell pressure.
- **Mixing the constant-charge and constant-voltage derivative signs.** Isolated: $F=-\partial W/\partial x$. Battery connected: $F=+\partial W/\partial x$. The magnitudes agree for a linear system, but the sign convention does not, and the battery case also changes the charge.
- **Believing a larger capacitance always means more stored energy.** At fixed charge, inserting a dielectric *increases* $C$ but *decreases* $W=Q^2/2C$. The energy difference is released as the mechanical work that sucks the dielectric in — which is exactly the force the energy method predicts.
- **Confusing energy with energy density.** $W$ is in joules and needs the field volume; $u=\frac{1}{2}\varepsilon E^2$ is in J/m³. Reporting joules per cubic metre for a stored-energy question, or multiplying by volume when the field is not uniform, changes the answer by orders of magnitude.
- **Treating $\int\frac{1}{2}\varepsilon E^2dv$ as if $E$ were constant.** Pull $E$ out of the integral only for uniform fields (parallel plate, inside a coaxial gap it varies as $1/\rho$ and must be integrated).

## See Also

- [[04_Coulomb’s_Law_and_E_Field]]
- [[06_Electric_Potential_and_Gradient]]
- [[08_Dielectrics_and_Boundary_Conditions]]
- [[09_Capacitance_from_Geometry]]

---

[[09_Capacitance_from_Geometry|⬅ 09]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Current_Density_and_Continuity|11 ➡]]
