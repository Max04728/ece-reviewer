---
id: MATH-05-13
title: "Ampere’s Circuital Law"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 13
tier: 2
depth: full
problem_count: 4
prereqs: ["[[11_Current_Density_and_Continuity]]", "[[12_Biot-Savart_Law]]", "[[03_Divergence_and_Stokes_Theorems]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — Ampere’s Circuital Law

> [!abstract] Scope
> Use the line integral of H around a closed path to find magnetostatic fields in symmetric geometries — cylindrical conductors, coaxial cables, solenoids, toroids and current sheets — and know when the symmetry is too weak for the method.

## Core Concept

> [!tip] Intuition
> Ampere's law says the circulation of $\mathbf{H}$ around a closed loop equals the net current threading that loop, so a well-chosen path turns an integral into a division. It is the magnetic twin of Gauss's law and works exactly as often — only when the symmetry lets $\mathbf{H}$ come out of the integral.

**The law and the symmetry it demands.** Ampere's circuital law in integral form is:
$$\oint\mathbf{H}\cdot d\mathbf{l} = I_{\mathrm{enc}}$$
where $I_{\mathrm{enc}}$ is the net free current through any surface bounded by the closed path; the point form is $\nabla\times\mathbf{H}=\mathbf{J}$. The reason the law is usable at all is symmetry: to replace the left side by $H\,L$ you must argue that $\lvert\mathbf{H}\rvert$ is constant along the path and everywhere tangential to it, which requires the current distribution to be invariant under the translations and rotations that slide the Amperian path along itself. The four workable symmetries are the infinite line current (cylindrical), the infinite current sheet (planar), the infinite solenoid and the toroid. A finite wire, a short coil, a partial arc or any point near a bend has none of them, and there $\oint\mathbf{H}\cdot d\mathbf{l}$ cannot be evaluated without already knowing $\mathbf{H}$. The law remains *true* for every closed path, but it carries no usable information, and Biot-Savart is the working tool. The second standing caveat is that the form above is the steady-current form: for time-varying fields the displacement current must be added.

**Cylindrical conductors: the enclosed-current arithmetic.** For a long straight conductor of radius $a$ carrying total current $I$ at uniform current density $J=I/(\pi a^{2})$, take a circular path of radius $\rho$ centred on the axis, on which $\mathbf{H}$ is azimuthal and constant. Outside ($\rho>a$) the path encloses all of $I$, so $H(2\pi\rho)=I$ and $H=\dfrac{I}{2\pi\rho}$, the infinite-wire result. Inside ($\rho<a$) the path encloses only the current within $\rho$, which is $I\rho^{2}/a^{2}$ because the density is uniform and the area scales as $\rho^{2}$; then $H(2\pi\rho)=I\rho^{2}/a^{2}$, giving $H=\dfrac{I\rho}{2\pi a^{2}}$ — linear in $\rho$, rising from 0 at the axis to $I/(2\pi a)$ at the surface. The two expressions agree exactly at $\rho=a$, which is the check to run: an inside formula that does not meet the outside formula at the surface is wrong. A useful corollary is that a narrow axial hole in such a conductor carries no field, because the enclosed current there is zero.

**Coaxial cable, solenoid, toroid, sheet.** Adding a second conductor changes only which current is enclosed. In a coaxial cable with inner radius $a$, shield from $b$ to $c$, and equal-and-opposite currents $I$, there are four regions and four counts. Inside the inner conductor, $H=\dfrac{I\rho}{2\pi a^{2}}$. In the gap $a<\rho<b$, the path encloses the whole inner current and $H=\dfrac{I}{2\pi\rho}$. Inside the shield, the return current cancels part of the inner current, giving:
$$H=\dfrac{I(c^{2}-\rho^{2})}{2\pi\rho(c^{2}-b^{2})}$$
which falls to zero at $\rho=c$ and can reverse sign partway through the shield as the enclosed net current changes sign. Outside $\rho>c$ the net enclosed current is zero, so a perfect coaxial cable has no external field — the reason coaxial cable is self-shielding and neither radiates nor picks up magnetically. The ideal solenoid of $n$ turns per metre has $H=nI$ inside and $H=0$ outside; the ideal toroid of $N$ turns has $H=\dfrac{NI}{2\pi\rho}$ inside the core and zero everywhere else. An infinite current sheet with surface current density $\mathbf{K}$ produces $H=K/2$ on each side, directed parallel to the sheet, perpendicular to $\mathbf{K}$, and oppositely on the two sides; the factor $\frac{1}{2}$ appears because the Amperian rectangle crosses the sheet once while two sides of length $L$ contribute to the circulation.

**$H$ versus $B$, and why the finite wire defeats Ampere's law.** Ampere's law is stated in $\mathbf{H}$, not $\mathbf{B}$, and the distinction matters as soon as a material is present: $\mathbf{H}$ responds to free current only, while the flux density in a linear medium is:
$$\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})=\mu_r\mu_0\mathbf{H}$$
The useful consequence is that the free-current form of the law is unchanged by inserting a linear material:
$$\oint\mathbf{H}\cdot d\mathbf{l}=I_{\mathrm{enc,free}}$$
while $B$ is multiplied by $\mu_r$. So a solenoid's $H=nI$ is a property of the winding alone, whereas its $B$ depends on the core: air gives $B=\mu_0nI$, and an iron core with $\mu_r=1000$ gives a thousand times more $B$ until saturation. Two final cautions. First, Ampere's law alone cannot give the field of a finite wire, because no path exists along which $\lvert\mathbf{H}\rvert$ is constant and tangential; the law holds for every closed path, but evaluating it already requires the answer. Second, the conduction-only form fails for a charging capacitor: the same loop gives $I$ when the surface is stretched over the connecting wire and $0$ when it is stretched between the plates, and only the displacement-current term makes the two agree:
$$\int\partial\mathbf{D}/\partial t\cdot d\mathbf{S}$$

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Ampere's circuital law | $\oint\mathbf{H}\cdot d\mathbf{l}=I_{\mathrm{enc}}$ | Any closed path; I_enc is the free current through any surface bounded by it. Steady currents only. |
| Differential form | $\nabla\times\mathbf{H}=\mathbf{J}$ | Free current density only. Maxwell's equations add the displacement-current density dD/dt. |
| Infinite line current | $H=\frac{I}{2\pi\rho},\qquad B=\frac{\mu_0 I}{2\pi\rho}$ | rho is the perpendicular distance. The circular path is what makes H constant and lets it divide out. |
| Long cylindrical conductor, outside | $H=\frac{I}{2\pi\rho}\quad(\rho\geq a)$ | All the current is enclosed, so the radius a does not appear. Independent of the current density profile. |
| Long cylindrical conductor, inside | $H=\frac{I\rho}{2\pi a^{2}}\quad(\rho\leq a)$ | Uniform current density only. The enclosed current is I rho^2/a^2, so H rises linearly from the axis. |
| Coaxial cable, inside the inner conductor | $H=\frac{I\rho}{2\pi a^{2}}\quad(\rho<a)$ | Same as a solid conductor of radius a. Zero at the axis. |
| Coaxial cable, in the gap | $H=\frac{I}{2\pi\rho}\quad(a<\rho<b)$ | Only the inner conductor's current is enclosed. This is the field the cable is designed to use. |
| Coaxial cable, inside the outer conductor | $H=\frac{I(c^{2}-\rho^{2})}{2\pi\rho(c^{2}-b^{2})}\quad(b<\rho<c)$ | The shield's return current partially cancels the inner current; H reaches zero at rho = c and can reverse sign inside the shield. |
| Coaxial cable, outside | $H=0\quad(\rho>c)$ | Net enclosed current is zero for a perfect cable, which is why coaxial cable does not radiate or pick up magnetically. |
| Ideal solenoid | $H=nI\ (\mathrm{inside}),\qquad H=0\ (\mathrm{outside})$ | n is turns per METRE. Entering the total turn count N instead of N/l is a factor-of-l error. |
| Ideal toroid | $H=\frac{NI}{2\pi\rho}$ | N is the total turns, rho the mean radius. Confined to the core and not uniform across it. |
| Infinite current sheet | $H=\frac{K}{2}$ | K is the surface current density in A/m. Uniform on each side and oppositely directed across the sheet. |
| Constitutive relation | $\mathbf{B}=\mu_0(\mathbf{H}+\mathbf{M})=\mu_r\mu_0\mathbf{H}$ | H responds to free current only; B picks up the material. Ampere's law is unchanged by a linear medium. |
| Ampere-Maxwell correction | $\oint\mathbf{H}\cdot d\mathbf{l}=I_{\mathrm{enc}}+\int\frac{\partial\mathbf{D}}{\partial t}\cdot d\mathbf{S}$ | Required for time-varying fields; the conduction-only form fails across a charging capacitor. |

## Worked Problems

### P1. A long cylindrical conductor of radius $a=2$ mm carries a uniform total current of $5$ A. Find $H$ at $\rho=1$ mm and at $\rho=4$ mm.

**Given:** a = 2 mm = 0.002 m; I = 5 A uniformly distributed; field points: rho = 1 mm (inside), rho = 4 mm (outside)

**Solution:**

1. Inside (rho < a): H = I rho/(2 pi a^2)
2. H = (5)(0.001)/(2 pi (0.002)^2) = 0.005/2.51327e-5
3. H(1 mm) = 198.9 A/m
4. Outside (rho > a): H = I/(2 pi rho) = 5/(2 pi (0.004)) = 5/0.0251327
5. H(4 mm) = 198.9 A/m, the same magnitude here only because rho = 4 mm is exactly 2a
6. Surface value (rho = a): H = 5/(2 pi (0.002)) = 397.9 A/m, and B = mu0 H = 0.500 mT

> [!success]- Answer
> **$H(1\ \mathrm{mm})=199$ A/m and $H(4\ \mathrm{mm})=199$ A/m; the surface value at $\rho=a$ is 398 A/m**

> [!warning] Trap
> Applying the outside formula inside the conductor. At $\rho=1$ mm it gives $I/(2\pi\rho)=796$ A/m, four times the correct value, because it encloses all of $I$ instead of the fraction $\rho^{2}/a^{2}=1/4$. The matching numbers at 1 mm and 4 mm are a coincidence of this geometry, not a general rule.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5×1E-3÷(2\pi×(2E-3)²)=` → inside $H$ = **198.9** A/m; `5÷(2\pi×4E-3)=` → outside $H$ = **198.9** A/m.
> 2. The coincidence is geometric: 4 mm is exactly $2a$, so the two formulas cross there.
> 3. Surface: `5÷(2\pi×2E-3)=` → **397.9** A/m, and `×` `SHIFT` `CVALUE` `33` `=` → $B$ = **5.00E-4** T = **0.500** mT.
>
> The outside formula at 1 mm gives `5÷(2\pi×1E-3)=` → 796 A/m, four times too much.

### P2. An ideal solenoid has $1000$ turns per metre and carries $2$ A. Find $H$ and $B$ inside it, and then $B$ if the core is iron with $\mu_r=1000$.

**Given:** n = 1000 turns/m; I = 2 A; air core first, then mu_r = 1000

**Solution:**

1. H = n I = (1000)(2) = 2000 A/m, axial and uniform inside
2. Air: B = mu0 H = (4 pi x 1e-7)(2000)
3. B = 2.5133e-3 T = 2.51 mT
4. Iron core: B = mu_r mu0 H = 1000(2.5133e-3)
5. B = 2.5133 T

> [!success]- Answer
> **$H=2000$ A/m; $B=2.51$ mT in air and $2.51$ T with $\mu_r=1000$**

> [!warning] Trap
> Multiplying $H$ by $\mu_r$ as well as $B$. $H=nI$ is fixed by the winding and the current alone, and only $B$ scales with the material. Applying $\mu_r$ to both gives 2510 T, which exceeds the saturation flux density of every known material and is the giveaway.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000×2=` → $H$ = **2000** A/m, axial and uniform.
> 2. `×` `SHIFT` `CVALUE` `33` `=` → $B$ = **2.513E-3** T = **2.51** mT in air.
> 3. `×1000=` → $B$ = **2.513** T with $\mu_r=1000$, while $H$ stays **2000** A/m.
>
> Applying $\mu_r$ to $H$ as well gives 2510 T, above the saturation of every known material.

### P3. A toroid has $500$ turns, a mean radius of $10$ cm and carries $1$ A. Find $H$ and $B$ at the mean radius, and state where the field is non-zero.

**Given:** N = 500 turns; mean radius rho = 0.1 m; I = 1 A; air core

**Solution:**

1. H = N I/(2 pi rho) = (500)(1)/(2 pi (0.1))
2. 2 pi (0.1) = 0.62832 m, so H = 500/0.62832
3. H = 795.8 A/m
4. B = mu0 H = (4 pi x 1e-7)(795.8) = 1.0000e-3 T
5. The field is confined to the core: zero in the central hole and zero outside the ring for an ideal toroid

> [!success]- Answer
> **$H=796$ A/m and $B=1.00$ mT at the mean radius**

> [!warning] Trap
> Using $H=nI$ with the total turn count, giving 500 A/m instead of 796 A/m, or treating the toroid as a straight solenoid of some length. The Amperian path is the circumference $2\pi\rho$, and the field is not uniform across the core.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `500÷(2\pi×0.1)=` → $H$ = **795.8** A/m.
> 2. `×` `SHIFT` `CVALUE` `33` `=` → $B$ = **1.000E-3** T = **1.00** mT.
> 3. The $nI$ slip with the total turn count gives `500×1=` → **500** A/m, low by 1.59x.

### P4. A coaxial cable has inner radius $a=1$ mm, an outer conductor from $b=3$ mm to $c=4$ mm, and carries $I=10$ A uniformly distributed, returned through the outer conductor. Find $H$ at $\rho=0.5$ mm, $2$ mm, $3.5$ mm and $6$ mm.

**Given:** a = 1 mm, b = 3 mm, c = 4 mm; I = 10 A, uniform density, return current in the shield

**Solution:**

1. rho = 0.5 mm (inside the inner conductor): H = I rho/(2 pi a^2) = (10)(5e-4)/(2 pi (1e-3)^2) = 5e-3/6.2832e-6
2. H = 795.8 A/m
3. rho = 2 mm (in the gap): H = I/(2 pi rho) = 10/(2 pi (0.002)) = 10/0.0125664
4. H = 795.8 A/m
5. rho = 3.5 mm (inside the shield): H = I(c^2 - rho^2)/(2 pi rho (c^2 - b^2))
6. c^2 = 1.6e-5, rho^2 = 1.225e-5 so c^2 - rho^2 = 3.75e-6, and c^2 - b^2 = 1.6e-5 - 9e-6 = 7e-6
7. H = 10(3.75e-6)/(2 pi (0.0035)(7e-6)) = 3.75e-5/1.53938e-7
8. H = 243.6 A/m, with reversed sense relative to the gap because the enclosed net current is now negative
9. rho = 6 mm (outside the cable): net enclosed current = I - I = 0, so H = 0

> [!success]- Answer
> **$H=796$ A/m at 0.5 mm; $796$ A/m at 2 mm; $244$ A/m reversed at 3.5 mm; $H=0$ at 6 mm**

> [!warning] Trap
> Ignoring the shield's return current and applying $H=I/(2\pi\rho)$ at $\rho=3.5$ mm. That gives $455$ A/m instead of $244$ A/m and misses the sign reversal. The shield current is enclosed in full only at $\rho=c$, where the expression returns to zero.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10×5E-4÷(2\pi×(1E-3)²)=` → **795.8** A/m at 0.5 mm; `10÷(2\pi×2E-3)=` → **795.8** A/m at 2 mm.
> 2. Inside the shield: `10×(1.6E-5−1.225E-5)÷(2\pi×3.5E-3×(1.6E-5−9E-6))=` → **243.6** A/m, sense reversed.
> 3. Outside the enclosed net current is `10−10=` → **0**, so $H$ = **0** A/m at 6 mm.
>
> Ignoring the shield return current gives `10÷(2\pi×3.5E-3)=` → 455 A/m and hides the reversal.

## Traps & Exam Notes

- **Using Ampere's law without the symmetry.** A finite wire, a short solenoid or a point near a bend has no path on which $\lvert\mathbf{H}\rvert$ is constant and tangential, so the circulation cannot be reduced. The law is still true but yields no field; Biot-Savart is required.
- **Applying the outside formula inside a conductor.** For $\rho<a$ the enclosed current is only $I\rho^{2}/a^{2}$, so $H=I\rho/(2\pi a^{2})$. At $\rho=1$ mm in a 2 mm conductor the wrong formula gives 796 A/m against a correct 199 A/m.
- **Forgetting the shield return current in a coaxial cable.** Inside the outer conductor the enclosed net current is $I(c^{2}-\rho^{2})/(c^{2}-b^{2})$, not $I$. Ignoring it inflates $H$ and hides the reversal that occurs before $\rho=c$.
- **Replacing $n$ with the total number of turns.** $H=nI$ needs turns per metre. A 1000-turn coil wound over 2 m has $n=500$ per metre; entering 1000 doubles the field.
- **Scaling $H$ by $\mu_r$.** Ampere's law is an $H$-law, and $H=nI$ or $NI/(2\pi\rho)$ is independent of the core material. Only $B=\mu_r\mu_0H$ changes, so applying $\mu_r$ twice gives an unphysical answer.
- **Dropping the $\frac{1}{2}$ for an infinite current sheet.** $H=K/2$, not $K$. The Amperian rectangle crosses the sheet once but has two sides of length $L$ contributing to the circulation, so the half survives the division.
- **Using the conduction-only form with time-varying currents.** Across a charging capacitor the enclosed conduction current is $I$ through a surface over the wire and $0$ through a surface between the plates. Without the displacement-current term the law appears self-contradictory.
- **Assuming a toroid's field is uniform.** $H=NI/(2\pi\rho)$ varies across the core because the path length varies with $\rho$; using the mean radius everywhere is an approximation.

## See Also

- [[12_Biot-Savart_Law]]
- [[14_Magnetic_Boundary_Conditions_and_Vector_Potential]]
- [[15_Inductance_from_Geometry_and_Materials]]
- [[18_Maxwell’s_Equations_and_Displacement_Current]]

---

[[12_Biot-Savart_Law|⬅ 12]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[14_Magnetic_Boundary_Conditions_and_Vector_Potential|14 ➡]]
