---
id: MATH-05-11
title: "Current Density and Continuity"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Gauss_Law_and_Applications]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Current Density and Continuity

> [!abstract] Scope
> Relate current to current density and drift velocity, compute resistance from material and geometry, and apply the continuity equation to steady and time-varying charge distributions.

## Core Concept

> [!tip] Intuition
> Current is charge in motion, and current density is that motion measured per unit area. The continuity equation is just conservation of charge written locally: whatever leaves a region must have been there, so the divergence of $\mathbf{J}$ is the rate at which the local charge density falls.

**Current, current density and drift.** Current is the rate of charge transport, $I=dQ/dt=\int\mathbf{J}\cdot d\mathbf{S}$, in amperes. Current density $\mathbf{J}$ is the vector whose magnitude is the current per unit cross-sectional area and whose direction is that of positive-charge flow, in A/m². In a conductor with $n$ carriers per cubic metre, each of charge $e$ drifting with average velocity $\mathbf{v}_d$, $\mathbf{J}=ne\mathbf{v}_d$. Drift is slow: for copper at $2\times10^{6}$ A/m² the electrons creep at about $0.15$ mm/s, yet the lights come on instantly because the *field* that pushes them propagates at a large fraction of the speed of light. The distinction between drift speed and signal speed is a classic exam question.

**The point form of Ohm's law.** Microscopically, carriers are accelerated by $\mathbf{E}$ and repeatedly scattered, so the average drift velocity is proportional to the field:
$$\mathbf{v}_d=\mu\mathbf{E}$$
with mobility $\mu$ in m²/(V·s). Substituting into $\mathbf{J}=ne\mathbf{v}_d$ gives $\mathbf{J}=\sigma\mathbf{E}$ with $\sigma=ne\mu$ — the point form of Ohm's law, valid at every point in a conductor, unlike $V=IR$ which is a statement about a whole component. In a semiconductor both electrons and holes contribute:
$$\sigma=e(n\mu_e+p\mu_h)$$
Resistance then follows from geometry:
$$R=\dfrac{L}{\sigma A}=\dfrac{\rho L}{A}$$
where $L$ is the length along the field and $A$ the cross-section. This is the form to use when the dimensions or the material vary; $R=V/I$ tells you nothing about the geometry.

**The continuity equation.** Charge is conserved locally:
$$\nabla\cdot\mathbf{J}=-\dfrac{\partial\rho_v}{\partial t}$$
Positive divergence means net outflow, so the charge density at that point must be falling — hence the minus sign, which is not optional. Integrating over a volume and applying the divergence theorem expresses the same conservation law globally:
$$\oint\mathbf{J}\cdot d\mathbf{S}=-dQ_{\mathrm{enc}}/dt$$
That is the statement that the current leaving a closed surface equals the rate of loss of enclosed charge. In the steady state $\partial\rho_v/\partial t=0$, so $\nabla\cdot\mathbf{J}=0$ and $\sum I=0$ at a node: Kirchhoff's current law is just the steady-state continuity equation with the divergence theorem applied.

**Relaxation and the limits of the steady state.** Combining three relations — the continuity equation:
$$\nabla\cdot\mathbf{J}=-\partial\rho_v/\partial t$$
Ohm's law $\mathbf{J}=\sigma\mathbf{E}$ and Gauss's law:
$$\nabla\cdot\mathbf{E}=\rho_v/\varepsilon$$
— gives the charge-decay equation:
$$\partial\rho_v/\partial t=-(\sigma/\varepsilon)\rho_v$$
so any free charge placed inside a conductor decays exponentially with the relaxation time $\tau=\varepsilon/\sigma$ — microseconds or less for metals, which is why static charge survives only on surfaces. Note where the steady-state assumption breaks: in the wire feeding a charging capacitor $\nabla\cdot\mathbf{J}\neq0$, and $\sum I=0$ appears to fail at the capacitor plates. The resolution is the displacement current $\partial\mathbf{D}/\partial t$, which restores continuity and is the reason Maxwell's equations contain that term.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Current | $I=\frac{dQ}{dt}=\int_S\mathbf{J}\cdot d\mathbf{S}$ | Amperes. The integral is the flux of J through the conducting cross-section. |
| Current density from carriers | $\mathbf{J}=ne\mathbf{v}_d$ | n is carrier density per m³, e = 1.602e-19 C, v_d the drift velocity. Direction of positive flow. |
| Point form of Ohm's law | $\mathbf{J}=\sigma\mathbf{E}$ | Valid pointwise in a conductor. sigma in S/m; unlike V = IR it needs no geometry. |
| Conductivity and mobility | $\sigma=ne\mu_e+pe\mu_h$ | For metals the hole term is absent, sigma = n e mu. Mobility is in m²/(V s). |
| Drift velocity | $\mathbf{v}_d=\mu\mathbf{E}=\frac{\mathbf{J}}{ne}$ | Typical metals: mm/s, even at large current density. Not the signal speed. |
| Resistance from geometry | $R=\frac{L}{\sigma A}=\frac{\rho L}{A}$ | L along the current, A the cross-section. Here rho is RESISTIVITY in ohm-metres, not charge density. |
| Conductance | $G=\frac{1}{R}=\frac{\sigma A}{L}$ | Siemens. A thick, short, high-sigma path conducts best. |
| Continuity equation | $\nabla\cdot\mathbf{J}=-\frac{\partial\rho_v}{\partial t}$ | Local charge conservation. The minus sign links outflow to falling density. |
| Steady-state continuity (KCL) | $\nabla\cdot\mathbf{J}=0\iff\sum_kI_k=0$ | Holds only when nothing is changing with time; fails at a charging capacitor without displacement current. |
| Relaxation time | $\tau=\frac{\varepsilon}{\sigma},\qquad \rho_v(t)=\rho_0e^{-t/\tau}$ | Free charge inside a conductor decays in tau. For copper tau is about 1.5e-19 s. |
| Joule power density | $p=\mathbf{J}\cdot\mathbf{E}=\sigma E^2$ | W/m³. Integrate over volume for total heating; equals I²R for a uniform conductor. |

## Worked Problems

### P1. A copper wire of cross-section $1$ mm² carries $2$ A. Find the current density and the drift velocity, taking $n=8.5\times10^{28}$ electrons/m³.

**Given:** A = 1 mm2 = 1e-6 m2; I = 2 A; n = 8.5e28 /m3; e = 1.602e-19 C

**Solution:**

1. J = I/A = 2/1e-6 = 2e6 A/m^2
2. v_d = J/(n e)
3. n e = (8.5e28)(1.602e-19) = 1.3617e10
4. v_d = 2e6/1.3617e10 = 1.469e-4 m/s

> [!success]- Answer
> **$J=2.0\times10^{6}$ A/m²; $v_d=0.147$ mm/s.**

> [!warning] Trap
> Using $A=1$ mm² as $10^{-3}$ m². The correct conversion is $1\ \mathrm{mm^2}=10^{-6}\ \mathrm{m^2}$; getting it wrong changes $J$ — and therefore $v_d$ — by $10^{3}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2÷1E-6=` → $J$ = **2E6** A/m², since $1$ mm² is `1E-6` m².
> 2. `Ans÷(8.5E28×` `SHIFT` `CVALUE` `23` `)=` → $v_d$ = **1.469E-4** m/s = **0.147** mm/s, with code `23` = $e$.
> 3. The wrong area `1E-3` returns **2E3** A/m² and a drift velocity 1000x too large.
>
> `CONVT` Area, mm² to m², inserts the `1E-6` directly.

### P2. Find the resistance of a copper conductor of resistivity $1.72\times10^{-8}$ $\Omega\cdot$m, length $100$ m and cross-section $2.5$ mm².

**Given:** rho = 1.72e-8 ohm.m; L = 100 m; A = 2.5 mm2 = 2.5e-6 m2

**Solution:**

1. R = rho L/A
2. rho L = (1.72e-8)(100) = 1.72e-6 ohm.m^2
3. A = 2.5e-6 m^2
4. R = 1.72e-6/2.5e-6 = 0.688 ohm

> [!success]- Answer
> **$R=0.688\ \Omega$.**

> [!warning] Trap
> Using $\rho$ as volume charge density. The symbol is overloaded: in $R=\rho L/A$ it is resistivity in $\Omega\cdot$m; in Gauss's law $\rho_v$ is charge density in C/m³. Check the units to tell them apart.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1.72E-8×100÷2.5E-6=` → $R$ = **0.688** ohm.
> 2. `2.5E-6` m² is the 2.5 mm²; leaving `2.5E-3` returns **6.88E-4** ohm, a factor of $10^{3}$ low.
> 3. The numerator is `1.72E-8×100=` → **1.72E-6** ohm·m².

### P3. A conductor has $\sigma=5.8\times10^{7}$ S/m and carries a field of $0.05$ V/m. Find the current density, and the current through a cross-section of $2$ mm².

**Given:** sigma = 5.8e7 S/m; E = 0.05 V/m; A = 2 mm2

**Solution:**

1. J = sigma E = (5.8e7)(0.05) = 2.9e6 A/m^2
2. A = 2e-6 m^2
3. I = J A = (2.9e6)(2e-6)
4. I = 5.8 A

> [!success]- Answer
> **$J=2.9\times10^{6}$ A/m²; $I=5.8$ A.**

> [!warning] Trap
> Using $V=IR$ with the field E as if it were the voltage. $\mathbf{J}=\sigma\mathbf{E}$ is the point form and needs no length; if the length were involved you would use $I=V/R$ with $R=\rho L/A$ after computing $V=EL$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5.8E7×0.05=` → $J$ = **2.9E6** A/m².
> 2. `×2E-6=` → $I$ = **5.8** A through the 2 mm² section.
> 3. The section is `2E-6` m², not `2E-3`: `2.9E6×2E-3=` → **5800** A is the unit slip.

### P4. In a region the current density is $\mathbf{J}=3x^2\mathbf{a}_x$ A/m². Find the rate of change of the volume charge density at $x=2$ m and state whether the charge there is increasing or decreasing.

**Given:** J = 3x^2 a_x A/m2; x = 2 m

**Solution:**

1. div J = d(3x^2)/dx = 6x
2. At x = 2: div J = 12 A/m^3
3. Continuity: d(rho_v)/dt = -div J = -12 C/(m^3 s)
4. The sign is negative, so the charge density there is decreasing

> [!success]- Answer
> **$\partial\rho_v/\partial t=-12$ C/(m³$\cdot$s): the charge density falls at 12 C/(m³$\cdot$s).**

> [!warning] Trap
> Dropping the minus sign in $\nabla\cdot\mathbf{J}=-\partial\rho_v/\partial t$ and concluding the charge is increasing. Positive divergence means net outflow, which always drains the local charge.

### P5. A cylindrical conductor of radius $a=1$ mm has the non-uniform current density $J(r)=4\times10^{6}(1-r/a)$ A/m². Find the total current.

**Given:** a = 1 mm; J(r) = 4e6(1 - r/a) A/m2

**Solution:**

1. I = integral of J dA with dA = 2 pi r dr from 0 to a
2. I = 4e6 (2 pi) integral from 0 to a of (r - r^2/a) dr
3. = 4e6 (2 pi)[a^2/2 - a^2/3] = 4e6 (2 pi)(a^2/6)
4. a^2 = 1e-6 m^2, so I = 4e6 (2 pi)(1e-6)/6
5. I = (4e6)(1.0472e-6) = 4.189 A

> [!success]- Answer
> **$I=4.19$ A.**

> [!warning] Trap
> Multiplying $J$ by the area using the peak value, $J_{\max}\pi a^2=4\times10^{6}\times3.14\times10^{-6}=12.6$ A. That over-counts by a factor of 3 because $J$ falls linearly to zero at the surface — the current needs the integral, and its average is $J_{\max}/3$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `∫dx` of $4E6(1-X÷1E-3)×2\pi X$ from 0 to `1E-3` `=` → $I$ = **4.189** A.
> 2. Closed form: `4E6×2\pi×1E-6÷6=` → **4.189** A, since the linear fall makes the mean $J_{\max}/3$.
> 3. The no-integral estimate `4E6×\pi×1E-3²=` → **12.57** A over-counts by 3.
>
> `∫dx` takes the $2\pi r\,dr$ area element inside the integrand; the integration variable is `X`.

## Traps & Exam Notes

- **Confusing drift velocity with signal speed.** Electrons drift at a fraction of a millimetre per second in ordinary wiring, but the field that drives them propagates at a large fraction of $c$. Timing a circuit with the drift time gives hours instead of nanoseconds.
- **The symbol clash on $\sigma$ and $\rho$.** $\sigma$ is conductivity (S/m) in $\mathbf{J}=\sigma\mathbf{E}$ but surface charge density (C/m²) in boundary conditions; $\rho$ is resistivity ($\Omega\cdot$m) in $R=\rho L/A$ but volume charge density (C/m³) in Gauss's law. Read the units in the question before substituting.
- **Assuming $\nabla\cdot\mathbf{J}=0$ always.** It holds only in the steady state. In the wire feeding a charging capacitor the conduction current is not solenoidal and KCL appears to fail at the plates; the missing term is the displacement current $\partial\mathbf{D}/\partial t$.
- **Using $\mathrm{mm^2}$ as $10^{-3}\ \mathrm{m^2}$.** $1\ \mathrm{mm^2}=10^{-6}\ \mathrm{m^2}$. The error is a factor of $10^{3}$, in either direction depending on which quantity is being solved for.
- **Quoting $R=V/I$ when the question is about geometry.** That relation is true but useless if the material, length or cross-section varies along the path; use $R=L/(\sigma A)$ and integrate when the area changes.
- **Dropping the minus sign in the continuity equation.** Positive divergence means charge is leaving, so the local density must be falling. A positive rate of change with positive divergence describes charge being created, which never happens.

## See Also

- [[05_Gauss_Law_and_Applications]]
- [[09_Capacitance_from_Geometry]]
- [[16_Magnetic_Forces,_Torque_and_Lorentz]]
- [[18_Maxwell’s_Equations_and_Displacement_Current]]

---

[[10_Electrostatic_Energy_and_Forces|⬅ 10]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Biot-Savart_Law|12 ➡]]
