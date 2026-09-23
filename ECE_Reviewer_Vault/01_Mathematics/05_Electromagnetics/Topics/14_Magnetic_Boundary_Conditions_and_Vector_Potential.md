---
id: MATH-05-14
title: "Magnetic Boundary Conditions and Vector Potential"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 14
tier: 2
depth: full
problem_count: 4
prereqs: ["[[03_Divergence_and_Stokes_Theorems]]", "[[13_Ampere’s_Circuital_Law]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — Magnetic Boundary Conditions and Vector Potential

> [!abstract] Scope
> Match magnetostatic fields across an interface using the normal-B and tangential-H conditions, refract field lines between two permeabilities, and compute the magnetic vector potential for wires and uniform fields.

## Core Concept

> [!tip] Intuition
> Magnetic fields have no sources, so the flux that enters an interface must leave it — that is why the normal component of $\mathbf{B}$ can never jump. Currents, on the other hand, are exactly what makes $\mathbf{H}$ circulate, so a sheet of current is the only thing that can make the tangential $\mathbf{H}$ jump.

**Two conditions, from two integral laws, and no more.** Apply Gauss's law for magnetism, the closed-surface flux law, to a vanishing pillbox straddling the interface:
$$\oint\mathbf{B}\cdot d\mathbf{S}=0$$
The curved side contributes nothing as the height shrinks, so the top and bottom faces give $B_{1n}=B_{2n}$: the *normal* component of $\mathbf{B}$ is continuous across every magnetostatic interface, with or without currents, with or without magnetic material. Apply Ampere's law, the closed-loop circulation law, to a vanishing rectangular loop straddling the interface:
$$\oint\mathbf{H}\cdot d\mathbf{l}=I_{\mathrm{enc}}$$
The two short legs vanish and the long legs give the jump condition. With no free surface current the line integral is zero and $H_{1t}=H_{2t}$; with a surface current density $\mathbf{K}$ flowing on the sheet, the loop encloses $K\,l$ and the tangential component jumps by exactly $K$. Written as a vector the jump condition is:
$$\mathbf{n}\times(\mathbf{H}_1-\mathbf{H}_2)=\mathbf{K}$$
with $\mathbf{n}$ drawn from region 2 into region 1. Note the asymmetry that catches people: $\mathbf{B}$ is the quantity whose normal part is continuous, but $\mathbf{H}$ is the quantity whose tangential part is continuous. Reading it the other way round ($B_n$ jumps, $H_t$ jumps) is the single most common error in this topic.

**Refraction, and why the comparison with electrostatics is examinable.** Divide the two conditions. With no surface current, $B_{1t}/\mu_1=B_{2t}/\mu_2$ and $B_{1n}=B_{2n}$, so the refracted field directions obey:
$$\dfrac{\tan\theta_1}{\tan\theta_2}=\dfrac{\mu_1}{\mu_2}=\dfrac{\mu_{r1}}{\mu_{r2}}$$
where $\theta$ is measured from the interface *normal*. In words: the normal part of $\mathbf{B}$ is fixed while the tangential part scales with the permeability, so a field line rotates *away* from the normal on entering the higher-permeability medium. This is the exact analogue of the electric-field rule, where the permittivity ratio plays the same role:
$$\tan\theta_1/\tan\theta_2=\varepsilon_{r1}/\varepsilon_{r2}$$
and the field line rotates *away* from the normal on entering the higher-permittivity medium. The two topics must be memorised as a pair, because a board question will often give one and ask for the other: tangential $\mathbf{E}$ is always continuous, while tangential $\mathbf{H}$ is continuous only when the sheet carries no current. The normal rules are just as paired:
$$D_{1n}-D_{2n}=\rho_s$$
(so normal $\mathbf{D}$ jumps by the free surface charge), whereas $B_{1n}=B_{2n}$ with no exception, because there is no magnetic charge to jump it.

**The magnetic vector potential $\mathbf{A}$, and its deliberate non-uniqueness.** Since $\nabla\cdot\mathbf{B}=0$ identically, $\mathbf{B}$ can always be written as the curl of a vector field, $\mathbf{B}=\nabla\times\mathbf{A}$, and this is not merely a convenience — it is what makes the flux through any surface computable as a line integral around its rim by Stokes' theorem. But $\mathbf{A}$ is not unique: adding the gradient of *any* scalar, $\mathbf{A}'=\mathbf{A}+\nabla\psi$, leaves the curl unchanged because $\nabla\times\nabla\psi=0$. Every physically measurable quantity ($\mathbf{B}$, the flux, the force) is therefore gauge invariant, while $\mathbf{A}$ itself is not. To pin $\mathbf{A}$ down one imposes a gauge condition; the standard choice in magnetostatics is the **Coulomb gauge** $\nabla\cdot\mathbf{A}=0$. With it, Ampere's law $\nabla\times\mathbf{B}=\mu\mathbf{J}$ collapses to a Poisson equation for each Cartesian component, $\nabla^2\mathbf{A}=-\mu\mathbf{J}$, whose solutions are the familiar $1/R$ integrals. The practical consequence for exams is that $\mathbf{A}$ is only defined up to a constant (or a gradient) — so quote the *difference* of $\mathbf{A}$, or quote $\mathbf{B}=\nabla\times\mathbf{A}$ back to confirm the answer.

**$\mathbf{A}$ for the two cases worth memorising, and the scalar potential that only half-works.** For a long straight wire along $z$ carrying current $I$, symmetry forces $\mathbf{A}=A_z(\rho)\,\mathbf{a}_z$ because $\mathbf{B}$ is purely azimuthal; integrating the azimuthal field gives the vector potential up to the arbitrary constant the gauge allows:
$$B_\phi=\mu_0I/(2\pi\rho)=\partial A_z/\partial\rho$$
hence $A_z=-(\mu_0I/2\pi)\ln\rho$. For a uniform field $\mathbf{B}=B\,\mathbf{a}_z$ the symmetric choice is not unique either:
$$\mathbf{A}=\tfrac{1}{2}\mathbf{B}\times\mathbf{r}=\tfrac{1}{2}Br\,\mathbf{a}_\phi$$
works, and so does $\mathbf{A}=Bx\,\mathbf{a}_y$; both give the same curl, and both illustrate that different gauges are different functions representing the same physics. Independently, whenever the current density is zero in a region, $\nabla\times\mathbf{H}=0$ there and one may write $\mathbf{H}=-\nabla V_m$, a magnetic *scalar* potential. It is genuinely restricted to current-free regions: any path between two points in a region threaded by net current gives different line integrals, so $V_m$ would have to be multivalued. This is the sharp difference from electrostatics, where the scalar potential exists everywhere and the vector potential is the optional extra.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Vector potential definition | $\mathbf{B}=\nabla\times\mathbf{A}$ | Always valid because the divergence of B is zero. Units of A: Wb/m (T m). |
| Gauge freedom | $\mathbf{A}'=\mathbf{A}+\nabla\psi$ | Any scalar psi gives the same B. A itself is therefore never a unique answer - quote a difference. |
| Coulomb gauge | $\nabla\cdot\mathbf{A}=0$ | The magnetostatic choice. Makes the vector Poisson equation separate into three scalar ones. |
| Poisson equation for A | $\nabla^2\mathbf{A}=-\mu\mathbf{J}$ | One scalar Poisson equation per Cartesian component; J points the same way as A. |
| Vector potential of a line current | $\mathbf{A}=-\frac{\mu_0I}{2\pi}(\ln\rho)\,\mathbf{a}_z$ | Long straight wire along z. The constant is dropped; only differences of A are meaningful. |
| Rotational form for a uniform field | $\mathbf{A}=\frac{1}{2}\mathbf{B}\times\mathbf{r}=\frac{1}{2}Br\,\mathbf{a}_\phi$ | Valid for a uniform B along z. Not the only gauge: A = B x a_y also works. |
| Flux from A | $\Phi_B=\oint\mathbf{A}\cdot d\mathbf{l}$ | Stokes' theorem. Use when A is known and the rim of the surface is an easy path. |
| Normal B boundary | $B_{1n}=B_{2n}$ | No exceptions - there is no magnetic charge. Normal H does jump, by mu_r1/mu_r2. |
| Tangential H boundary | $H_{1t}-H_{2t}=K$ | K is the surface current density on the sheet, in A/m, flowing perpendicular to the tangential H. |
| Tangential H, no surface current | $H_{1t}=H_{2t}\qquad(K=0)$ | The default in magnetic-material problems. Because B_t = mu H_t, B_t jumps by the permeability ratio. |
| Field-line refraction | $\frac{\tan\theta_1}{\tan\theta_2}=\frac{\mu_{r1}}{\mu_{r2}}=\frac{\mu_1}{\mu_2}$ | Angles from the normal, no surface current. Same algebraic form as the dielectric rule, which uses eps_r; but B bends like E, not like D. |
| Magnetic scalar potential | $\mathbf{H}=-\nabla V_m\qquad(\mathbf{J}=0)$ | Only where the current density is zero. In a region carrying net current V_m is multivalued and unusable. |

## Worked Problems

### P1. A magnetic field $B_1=0.1$ T in air makes an angle of $30^\circ$ with the normal to a flat interface with a material of $\mu_r=4$. There is no surface current. Find the magnitude of $\mathbf{B}_2$ and the angle it makes with the normal.

**Given:** B1 = 0.1 T in air (mu_r1 = 1); theta1 = 30 deg from the normal; mu_r2 = 4; K = 0 (no surface current)

**Solution:**

1. Split B1: B1n = 0.1 cos 30 = 0.1 x 0.8660 = 0.08660 T; B1t = 0.1 sin 30 = 0.05000 T
2. Normal component is continuous: B2n = B1n = 0.08660 T
3. No surface current, so H1t = H2t, i.e. B2t/mu2 = B1t/mu1, giving B2t = (mu_r2/mu_r1) B1t = 4 x 0.05 = 0.2000 T
4. Magnitude: B2 = sqrt(0.08660^2 + 0.2000^2) = sqrt(0.007500 + 0.040000) = sqrt(0.047500) = 0.21795 T
5. Angle: tan(theta2) = B2t/B2n = 0.2/0.0866 = 2.3094, so theta2 = arctan(2.3094) = 66.59 deg
6. Check with the refraction rule: tan(theta2) = tan(30) x (mu_r2/mu_r1) = 0.57735 x 4 = 2.3094

> [!success]- Answer
> **$B_2=0.218$ T and $\theta_2=66.6^\circ$ from the normal - the field turns *away* from the normal on entering the high-permeability medium, since the normal part of B is carried across unchanged while only the tangential part is scaled by the permeability.**

> [!warning] Trap
> Scaling the whole vector by $\mu_{r2}/\mu_{r1}$ and reporting $B_2=0.4$ T. Only the *tangential* part scales with permeability; the normal part is carried across unchanged by $B_{1n}=B_{2n}$. The wrong direction of the bend is a second giveaway: with $\theta_2<\theta_1$ the field would lie closer to the normal, which contradicts $B_{1n}=B_{2n}$; here $\theta_2$ must be *larger* than $30^\circ$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.1×\cos30=` → $B_{1n}$ = **0.08660** T; `0.1×\sin30=` → $B_{1t}$ = **0.05000** T; `×4=` → $B_{2t}$ = **0.2000** T.
> 2. `SHIFT` `Pol(0.0866,0.2)=` → X = $B_2$ = **0.2179** T, Y = $\theta_2$ = **66.59°** from the normal.
> 3. Scaling the whole vector by 4 would give `4×0.1=` → **0.400** T, the trap.
>
> `Pol(` reads the rectangular pair $(B_{2n},B_{2t})$ as a magnitude and angle in one keypress; keep degrees mode.

### P2. Region 1 is a magnetic material with $\mu_{r1}=2$ whose tangential field just above a current sheet is $H_{1t}=1200$ A/m. The sheet carries a surface current density $K=300$ A/m flowing perpendicular to both $\mathbf{H}_{1t}$ and the interface normal. Find $H_{2t}$ on the other side of the sheet, and state what $H_{2t}$ would be if the current instead flowed parallel to $\mathbf{H}_{1t}$.

**Given:** H1t = 1200 A/m (tangential); K = 300 A/m (perpendicular to H1t, in the sheet); mu_r1 = 2

**Solution:**

1. With n from region 2 into region 1, the boundary condition is n x (H1 - H2) = K, which reduces to H1t - H2t = K for K perpendicular to H1t
2. Substitute: 1200 - H2t = 300
3. H2t = 1200 - 300 = 900 A/m
4. Reversed current direction flips the sign of the jump: H1t - H2t = -300 gives H2t = 1500 A/m, and the magnitude of the jump is 300 A/m in both cases
5. If K instead flowed parallel to H1t, the cross product K x n has no component along H1t: H2t = H1t = 1200 A/m, a jump of zero
6. Note this needs no permeability at all - the condition is on H, not on B

> [!success]- Answer
> **$H_{2t}=900$ A/m for a sheet current perpendicular to the field (1500 A/m if the current reverses); $H_{2t}=1200$ A/m if the current flows parallel to $\mathbf{H}_{1t}$.**

> [!warning] Trap
> Adding the surface current to the field on the same side, or applying the jump to $B_t$. The tangential component of $\mathbf{H}$ jumps by $K$; the corresponding jump in $\mathbf{B}$ is $\mu K$, and a $\mu_r$ that appears in a B-based answer but not here is the tell that the wrong quantity was used.

### P3. A long straight wire along the z-axis carries $I=10$ A. Find the vector potential $A_z$ at $\rho=0.5$ m taking $A_z=0$ at $\rho=1$ m, and verify that $\mathbf{B}=\nabla\times\mathbf{A}$ reproduces the field at that radius.

**Given:** I = 10 A along z; rho = 0.5 m; reference A_z = 0 at rho = 1 m; mu0 = 4pi x 10^-7 H/m

**Solution:**

1. $A_z(\rho)=-(\mu_0I/2\pi)\ln\rho + C$, with $\mu_0I/2\pi = (4\pi\times10^{-7})(10)/(2\pi) = 2\times10^{-7}\times 10 = 2\times10^{-6}$ Wb/m
2. Fix C by the reference: $A_z(1)=0$ gives $C=0$
3. $A_z(0.5) = -2\times10^{-6}\ln 0.5 = -2\times10^{-6}(-0.693147) = +1.3863\times10^{-6}$ Wb/m
4. Verify: $\mathbf{B}=\nabla\times\mathbf{A}$ has only a phi component, $B_\phi=-\partial A_z/\partial\rho$
5. $-\partial/\partial\rho\left[-(\mu_0I/2\pi)\ln\rho\right] = \mu_0I/(2\pi\rho)$, the correct Ampere field
6. Numerically $B_\phi = (2\times10^{-6})/0.5 = 4.0\times10^{-6}$ T, which equals $\mu_0I/(2\pi\rho) = (2\pi\times10^{-7})(10)/(\pi\times 0.5) = 4.0\times10^{-6}$ T

> [!success]- Answer
> **$A_z=1.386\ \mu$Wb/m (directed along $+z$, from the chosen reference) and $B_\phi=4.0\ \mu$T.**

> [!warning] Trap
> Reporting a bare $A_z$ without the reference point. Because $A_z=-(\mu_0I/2\pi)\ln\rho+C$ is defined only up to an additive constant, quoting $A_z=-2\times10^{-6}\ln 0.5$ and stopping *is* a different answer from the one asked for. Also, $\mathbf{A}$ here points along the *wire*, not around it - unlike $\mathbf{B}$, whose only component is azimuthal.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(-)2E-6×\ln(0.5)=` → $A_z$ = **1.3863E-6** Wb/m.
> 2. `2E-6÷0.5=` → $B_\phi$ = **4.0E-6** T, the same as $\mu_0I/2\pi\rho$.
> 3. The additive constant is fixed by the reference: $A_z$ at 1 m is **0**, so $C$ = **0**.
>
> $\mu_0I/2\pi$ collapses to `2E-7×10=` → 2E-6 Wb/m; $\mathbf{A}$ runs along the wire, $\mathbf{B}$ around it.

### P4. In a region of uniform field $\mathbf{B}=0.2\,\mathbf{a}_z$ T, write down a vector potential using the rotational form $\mathbf{A}=\tfrac{1}{2}\mathbf{B}\times\mathbf{r}$, then use it to find the flux through a circular loop of radius $2$ cm lying in the $xy$-plane, and confirm the answer against $BA$.

**Given:** B = 0.2 T along z (uniform); loop radius r = 0.02 m, in the xy-plane; A = (1/2) B x r

**Solution:**

1. $\mathbf{A}=\tfrac{1}{2}\mathbf{B}\times\mathbf{r}=\tfrac{1}{2}(B\,\mathbf{a}_z)\times(r\,\mathbf{a}_\rho)=\tfrac{1}{2}Br\,\mathbf{a}_\phi$, so $A_\phi$ grows linearly with radius
2. On the loop, $A_\phi = 0.5(0.2)(0.02) = 2.0\times10^{-3}$ Wb/m
3. $\Phi_B=\oint\mathbf{A}\cdot d\mathbf{l}$ with $d\mathbf{l}=r\,d\phi\,\mathbf{a}_\phi$, so $\Phi_B = A_\phi(2\pi r) = (2.0\times10^{-3})(2\pi)(0.02)$
4. $\Phi_B = 2.0\times10^{-3}\times 0.12566 = 2.5133\times10^{-4}$ Wb
5. Check directly: $\Phi_B = BA = 0.2\times\pi(0.02)^2 = 0.2\times1.2566\times10^{-3} = 2.5133\times10^{-4}$ Wb, identical
6. A different gauge gives a different $\mathbf{A}$ (for example $\mathbf{A}=Bx\,\mathbf{a}_y$) but the same closed-loop integral

> [!success]- Answer
> **$\mathbf{A}=\tfrac{1}{2}Br\,\mathbf{a}_\phi$ with $A_\phi=2.0$ mWb/m at the loop; $\Phi_B=2.51\times10^{-4}$ Wb $=251\ \mu$Wb.**

> [!warning] Trap
> Using $\mathbf{A}=\mathbf{B}\times\mathbf{r}$ without the $\tfrac{1}{2}$, which gives $4.0\times10^{-3}$ Wb/m and doubles the flux to $503\ \mu$Wb. Equally common: assuming a *uniform* $\mathbf{A}$ is possible, or that $\mathbf{A}$ must be perpendicular to $\mathbf{B}$ - here it circulates around $\mathbf{B}$, and $\mathbf{A}\cdot\mathbf{B}=0$ only by coincidence of this gauge.

## Traps & Exam Notes

- **Swapping which component is continuous.** Normal $\mathbf{B}$ is continuous; tangential $\mathbf{H}$ is continuous (when $K=0$). Normal $\mathbf{H}$ jumps by $\mu_{r1}/\mu_{r2}$ and tangential $\mathbf{B}$ jumps by the same ratio, so writing $B_{1t}=B_{2t}$ gives a tangential field that is wrong by $\mu_{r2}/\mu_{r1}$ - for $\mu_r=1000$ that is a factor of 1000, not a rounding error.
- **Applying the tangential-H condition with a surface current present.** With $K\neq0$ the tangential $\mathbf{H}$ jumps by $K$; treating it as continuous loses a term of size $K$ (for a solenoid-like sheet that is tens of percent). The normal-B condition, by contrast, is unaffected by $K$.
- **Expecting $\mathbf{B}$ to bend the way $\mathbf{D}$ does.** The electric rule is $\tan\theta_1/\tan\theta_2=\varepsilon_{r1}/\varepsilon_{r2}$ and the magnetic rule is $\tan\theta_1/\tan\theta_2=\mu_{r1}/\mu_{r2}$, so the two look alike and swapping them is numerically harmless when the ratios happen to match. The real trap is the direction: with $\mu_r>1$ ahead, $\tan\theta_2=\tan\theta_1(\mu_{r2}/\mu_{r1})$ gives a *larger* $\theta_2$, so $\mathbf{B}$ turns *away* from the normal and rides nearer the interface - the same sense as $\mathbf{E}$ in a high-$\varepsilon_r$ dielectric. An answer that puts the flux nearer the normal contradicts $B_{1n}=B_{2n}$; it is $\mathbf{H}$ that turns toward the normal.
- **Quoting a value of $\mathbf{A}$ as if it were unique.** $\mathbf{A}$ is defined only up to $\nabla\psi$. An answer that omits the reference point (or the gauge) for $A_z=-(\mu_0I/2\pi)\ln\rho$ cannot be checked, and two students can both be right with $A$ values differing by a constant. Quote $\mathbf{B}=\nabla\times\mathbf{A}$ or a difference in $\mathbf{A}$.
- **Assuming the magnetic scalar potential always exists.** $\mathbf{H}=-\nabla V_m$ requires $\nabla\times\mathbf{H}=0$, i.e. zero current density in the region. Around a wire, the line integral of $\mathbf{H}$ is $I\neq0$ on a closed path, so no single-valued $V_m$ exists and the potential difference between two points depends on the path taken.
- **Directing the vector potential of a wire along $\phi$.** For a long straight wire along $z$, $\mathbf{A}$ is parallel to the current ($z$), and it is $\mathbf{B}$ that circles the wire. Reversing the two gives an $\mathbf{A}$ whose curl is radial.
- **Forgetting that $\mathbf{A}$ and $\mathbf{B}$ do not share a direction.** $\mathbf{A}$ is only constrained by $\nabla\times\mathbf{A}=\mathbf{B}$ and $\nabla\cdot\mathbf{A}=0$, so a uniform $\mathbf{B}$ can be produced by an $\mathbf{A}$ that circles it or by one that is everywhere parallel to a fixed axis - both are correct, and neither need be perpendicular to $\mathbf{B}$.

## See Also

- [[08_Dielectrics_and_Boundary_Conditions]]
- [[13_Ampere’s_Circuital_Law]]
- [[15_Inductance_from_Geometry_and_Materials]]
- [[12_Biot-Savart_Law]]

---

[[13_Ampere’s_Circuital_Law|⬅ 13]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[15_Inductance_from_Geometry_and_Materials|15 ➡]]
