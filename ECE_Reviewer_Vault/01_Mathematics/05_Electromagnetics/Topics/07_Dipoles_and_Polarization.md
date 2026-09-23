---
id: MATH-05-07
title: "Dipoles and Polarization"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[06_Electric_Potential_and_Gradient]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Dipoles and Polarization

> [!abstract] Scope
> Analyse electric dipoles — moment, field, torque and energy — and connect them to polarization, bound charge and the flux density D in a dielectric.

## Core Concept

> [!tip] Intuition
> Two equal opposite charges held a fixed distance apart look like a point charge from very close up and like nothing at all from very far away, because their fields cancel to leading order. What is left is a 1/r³ field and a strong sensitivity to the *direction* of the observation point.

**The dipole moment.** A pair $+Q$ and $-Q$ separated by distance $d$ has moment $\mathbf{p}=Q\mathbf{d}$ with $\mathbf{d}$ drawn from the negative to the positive charge, in coulomb-metres. The field is axisymmetric about $\mathbf{p}$: in spherical coordinates $E_r=\dfrac{2kp\cos\theta}{r^3}$ and $E_\theta=\dfrac{kp\sin\theta}{r^3}$, giving $E=2kp/r^3$ on the axis ($\theta=0$) and exactly half that, $kp/r^3$, on the equatorial plane. Both components fall as $1/r^3$, one power faster than a point charge, because the two opposite charges nearly cancel at large distance. The potential falls as $1/r^2$, $V=kp\cos\theta/r^2$, and is zero everywhere on the equatorial plane.

**Torque, energy and force.** In a uniform field a dipole feels no net force, only a torque of magnitude $pE\sin\theta$ about the centre:
$$\boldsymbol{\tau}=\mathbf{p}\times\mathbf{E}$$
Its potential energy is $U=-\mathbf{p}\cdot\mathbf{E}$. The energy is minimised when $\mathbf{p}$ aligns with $\mathbf{E}$, which is why the torque always rotates the dipole toward alignment — the perpendicular position is the maximum-torque position, and the anti-aligned position is the unstable maximum-energy one. A *net force* requires a non-uniform field:
$$\mathbf{F}=(\mathbf{p}\cdot\nabla)\mathbf{E}$$
so a dipole drifts toward the stronger field when it is aligned with it. This is the mechanism behind dielectrophoresis and why a charged rod attracts uncharged paper.

**From one dipole to a polarized material.** A dielectric contains permanent or field-induced dipoles. Polarization is their volume density, measured in C/m²:
$$\mathbf{P}=\lim_{\Delta v\to0}\dfrac{\sum\mathbf{p}_i}{\Delta v}$$
A non-uniform $\mathbf{P}$ leaves an uncompensated bound charge inside the material, and a $\mathbf{P}$ that terminates on a surface leaves bound surface charge:
$$\rho_b=-\nabla\cdot\mathbf{P}$$
and $\sigma_b=\mathbf{P}\cdot\mathbf{a}_n$, where $\mathbf{a}_n$ is the outward normal. These bound charges are real charges that produce real fields; they are called 'bound' only because they cannot be removed without destroying the material.

**Why D exists.** The total charge density is free plus bound, and bound charge is awkward to know in advance. The definition that makes the bound charge disappear from Gauss's law is:
$$\mathbf{D}=\varepsilon_0\mathbf{E}+\mathbf{P}$$
That leaves the free-charge form:
$$\nabla\cdot\mathbf{D}=\rho_{v,\mathrm{free}}$$
For a linear isotropic dielectric the polarization is proportional to the field:
$$\mathbf{P}=\chi_e\varepsilon_0\mathbf{E}$$
The flux density then collapses to:
$$\mathbf{D}=\varepsilon_0(1+\chi_e)\mathbf{E}=\varepsilon_0\varepsilon_r\mathbf{E}$$
That is the whole practical payoff: geometry plus free charge determines $\mathbf{D}$ as if the material were not there, and dividing by $\varepsilon$ gives the reduced field.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Dipole moment | $\mathbf{p}=Q\mathbf{d}$ | C m; d points from the negative to the positive charge. A reversing sign flips every downstream result. |
| Dipole potential | $V=\frac{kp\cos\theta}{r^2}$ | Far field only (r >> d). Zero on the equatorial plane. |
| Dipole field components | $E_r=\frac{2kp\cos\theta}{r^3},\qquad E_\theta=\frac{kp\sin\theta}{r^3}$ | Both fall as 1/r^3. Spherical components, not Cartesian. |
| Axial and equatorial fields | $E_{\mathrm{axis}}=\frac{2kp}{r^3},\qquad E_{\mathrm{equator}}=\frac{kp}{r^3}$ | The equatorial field is exactly half the axial one — a favourite comparison question. |
| Torque on a dipole | $\boldsymbol{\tau}=\mathbf{p}\times\mathbf{E},\qquad \lvert\tau\rvert=pE\sin\theta$ | Zero when aligned or anti-aligned. Uniform field: torque but no net force. |
| Dipole potential energy | $U=-\mathbf{p}\cdot\mathbf{E}=-pE\cos\theta$ | Minimum (most stable) at theta = 0. Work to rotate from aligned to anti-aligned is 2pE. |
| Force on a dipole | $\mathbf{F}=(\mathbf{p}\cdot\nabla)\mathbf{E}$ | Non-zero only in a non-uniform field; points toward increasing field when p is aligned with E. |
| Polarization | $\mathbf{P}=\lim_{\Delta v\to0}\frac{\sum\mathbf{p}_i}{\Delta v}$ | C/m^2. Zero in vacuum; field-induced in a linear dielectric. |
| Bound charge | $\rho_b=-\nabla\cdot\mathbf{P},\qquad \sigma_b=\mathbf{P}\cdot\mathbf{a}_n$ | Note the minus on the volume term. a_n is the outward normal at the surface. |
| Electric flux density | $\mathbf{D}=\varepsilon_0\mathbf{E}+\mathbf{P}=\varepsilon_0\varepsilon_r\mathbf{E}$ | D responds to free charge only; this is why Gauss's law is written for D inside matter. |
| Susceptibility relation | $\mathbf{P}=\chi_e\varepsilon_0\mathbf{E},\qquad \varepsilon_r=1+\chi_e$ | chi_e dimensionless. For free space chi_e = 0 and eps_r = 1. |

## Worked Problems

### P1. Two charges of $\pm2$ nC are separated by $1$ mm. Find the magnitude and direction of the dipole moment.

**Given:** Q = 2 nC; d = 1 mm

**Solution:**

1. p = Qd = (2e-9)(1e-3)
2. = 2e-12 C.m
3. Direction: from the negative charge toward the positive charge

> [!success]- Answer
> **$p=2\times10^{-12}$ C$\cdot$m, pointing from $-Q$ to $+Q$.**

> [!warning] Trap
> Drawing $\mathbf{p}$ from $+$ to $-$. The convention is negative-to-positive, and reversing it flips the sign of the torque, the energy and every bound charge computed from $\mathbf{P}$.

### P2. For the dipole $p=2\times10^{-12}$ C$\cdot$m, find $E$ on the axis and on the equatorial plane at $r=10$ mm.

**Given:** p = 2e-12 C.m; r = 10 mm

**Solution:**

1. r^3 = (0.01)^3 = 1e-6 m^3; kp = (8.988e9)(2e-12) = 0.017976
2. Axis (theta = 0): E = 2kp/r^3 = 2(0.017976)/1e-6 = 3.595e4 V/m
3. Equator (theta = 90 deg): E = kp/r^3 = 0.017976/1e-6 = 1.798e4 V/m
4. Ratio: axis/equator = 2

> [!success]- Answer
> **$E_{\mathrm{axis}}=36.0$ kV/m; $E_{\mathrm{equator}}=18.0$ kV/m.**

> [!warning] Trap
> Using $1/r^2$ (the point-charge law) for a dipole. Both dipole components go as $1/r^3$; using $1/r^2$ overestimates the field by a factor of $r$, which at 10 mm is $10^{4}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `8.988E9×2E-12÷0.01³=` → equatorial $E$ = **1.7976E4** V/m.
> 2. `×2=` → axial $E$ = **3.5952E4** V/m; the axis/equator ratio is exactly **2**.
> 3. Both scale as $1/r^3$: the wrong power `8.988E9×2E-12÷0.01²=` → **1.80E2** V/m.
>
> `r = 10` mm must be keyed as `0.01`; the cube is what makes the dipole field fall so fast.

### P3. A dipole with $p=2\times10^{-12}$ C$\cdot$m sits at $\theta=30^\circ$ to a uniform field $E=10$ kV/m. Find the torque and the potential energy.

**Given:** p = 2e-12 C.m; E = 10 kV/m; theta = 30 deg

**Solution:**

1. Torque: tau = pE sin(theta) = (2e-12)(1e4)(0.5) = 1.0e-8 N.m
2. Energy: U = -pE cos(theta) = -(2e-12)(1e4)(0.8660)
3. = -1.732e-8 J
4. Equivalently U = -1.73e-8 J, negative because the dipole is closer to aligned than anti-aligned

> [!success]- Answer
> **$\tau=1.0\times10^{-8}$ N$\cdot$m; $U=-1.73\times10^{-8}$ J.**

> [!warning] Trap
> Dropping the minus sign in $U=-\mathbf{p}\cdot\mathbf{E}$, or using $\sin\theta$ in the energy instead of $\cos\theta$. Torque uses sine, energy uses cosine.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2E-12×1E4×\sin30=` → $\tau$ = **1.0E-8** N·m.
> 2. `(-)2E-12×1E4×\cos30=` → $U$ = **-1.732E-8** J.
> 3. The swap is visible: `2E-12×1E4×\cos30=` → **1.73E-8**, the torque answer off by 73 %.
>
> Torque takes the sine, energy the cosine, and the minus in $U=-\mathbf{p}\cdot\mathbf{E}$ stays.

### P4. A slab of dielectric occupies $0\le z\le2$ mm and has uniform polarization $\mathbf{P}=4\mathbf{a}_z$ nC/m². Find the bound surface charge densities, the bound volume charge density, and the field the bound charge produces inside the slab.

**Given:** P = 4 a_z nC/m2; slab 0 <= z <= 2 mm

**Solution:**

1. Top face (z = 2 mm, outward normal +a_z): sigma_b = P.a_n = +4 nC/m^2
2. Bottom face (z = 0, outward normal -a_z): sigma_b = P.(-a_z) = -4 nC/m^2
3. Volume: rho_b = -div P = 0 because P is uniform
4. The slab is therefore a pair of sheets of +/- 4 nC/m^2
5. Field between them: E = sigma_b/eps0 = (4e-9)/(8.854e-12) = 451.8 V/m
6. Direction: from the positive (top) face to the negative (bottom) face, i.e. -a_z, opposite to P

> [!success]- Answer
> **$\sigma_b=+4\ \mathrm{nC/m^2}$ (top), $-4\ \mathrm{nC/m^2}$ (bottom); $\rho_b=0$; $E=452$ V/m opposing $\mathbf{P}$.**

> [!warning] Trap
> Reporting $\sigma_b=+4$ nC/m² on *both* faces. Sign matters: the outward normal reverses between the two faces, so the bottom bound charge is negative. Forgetting this makes the bound field point the wrong way and destroys the depolarization argument.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. The bound sheets are **4E-9** C/m² on the top face and **-4E-9** C/m² on the bottom, because $\mathbf{a}_n$ reverses.
> 2. `4E-9÷` `SHIFT` `CVALUE` `32` `=` → $E$ = **451.8** V/m, from top to bottom.
> 3. $\rho_b=-\nabla\cdot\mathbf{P}$ = **0** because $\mathbf{P}$ is uniform, so the pair of sheets is the whole source.
>
> Code `32` is $\varepsilon_0$; the depolarization field always opposes $\mathbf{P}$.

### P5. A dielectric sphere carries the radially varying polarization $\mathbf{P}=kr\,\mathbf{a}_r$ with $k=2$ nC/m³. Find the bound volume charge density $\rho_b$ and evaluate it at $r=5$ mm.

**Given:** P = k r a_r; k = 2 nC/m3; r = 5 mm

**Solution:**

1. For a radial field in spherical coordinates, div P = (1/r^2) d(r^2 P_r)/dr
2. P_r = kr, so r^2 P_r = k r^3 and d(kr^3)/dr = 3kr^2
3. div P = (1/r^2)(3kr^2) = 3k
4. rho_b = -div P = -3k = -3(2e-9) = -6e-9 C/m^3
5. The bound charge density is uniform, so it does not depend on r; at r = 5 mm it is still -6 nC/m^3

> [!success]- Answer
> **$\rho_b=-6$ nC/m³ (uniform, independent of $r$).**

> [!warning] Trap
> Differentiating $P_r$ alone to get $k$ instead of carrying the $r^2$ weighting. Radial divergence needs $\frac{1}{r^2}\frac{\partial(r^2P_r)}{\partial r}$; for $P_r=kr$ that gives $3k$, not $k$. Also keep the minus sign in $\rho_b=-\nabla\cdot\mathbf{P}$.

## Traps & Exam Notes

- **Dipole moment direction.** $\mathbf{p}$ points from the negative to the positive charge. Reversing it flips the sign of the torque, the energy, the force and every computed bound charge.
- **Using $1/r^2$ for the dipole field.** Both components fall as $1/r^3$ because the opposite charges cancel to leading order. On the axis $E=2kp/r^3$; on the equator $kp/r^3$ — the equatorial field is *weaker*, not stronger.
- **Confusing $\mathbf{p}$ with $\mathbf{P}$.** The dipole moment is in C$\cdot$m, polarization in C/m²; they differ by a volume and by the dipole number density. Mixing them changes the units of every answer.
- **Expecting a net force in a uniform field.** A uniform field gives torque only. Net force requires $\nabla\mathbf{E}\neq\mathbf{0}$ and is computed from $(\mathbf{p}\cdot\nabla)\mathbf{E}$.
- **Bound charge signs.** $\rho_b=-\nabla\cdot\mathbf{P}$ carries an explicit minus, and $\sigma_b=\mathbf{P}\cdot\mathbf{a}_n$ changes sign between opposite faces because $\mathbf{a}_n$ reverses. The resulting field inside a uniformly polarized slab always opposes $\mathbf{P}$ (depolarization).
- **Assuming 'bound' means 'not real'.** Bound charges produce genuine fields; the name only records that they cannot be separated from the material. Skipping them makes the field in a dielectric look unchanged by the material.

## See Also

- [[04_Coulomb’s_Law_and_E_Field]]
- [[06_Electric_Potential_and_Gradient]]
- [[08_Dielectrics_and_Boundary_Conditions]]
- [[09_Capacitance_from_Geometry]]

---

[[06_Electric_Potential_and_Gradient|⬅ 06]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Dielectrics_and_Boundary_Conditions|08 ➡]]
