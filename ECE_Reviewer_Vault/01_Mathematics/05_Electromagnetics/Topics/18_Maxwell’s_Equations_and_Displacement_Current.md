---
id: MATH-05-18
title: "Maxwell’s Equations and Displacement Current"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 18
tier: 2
depth: full
problem_count: 5
prereqs: ["[[13_Ampere’s_Circuital_Law]]", "[[17_Faraday’s_Law_and_Motional_EMF]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 18 — Maxwell’s Equations and Displacement Current

> [!abstract] Scope
> State the four field equations in differential and integral form, explain the physical job of each, and show exactly how the displacement current repairs Ampere's law and leads to the wave equation.

## Core Concept

> [!tip] Intuition
> Each of the four equations answers one question: where does $\mathbf{D}$ come from, why are there no magnetic charges, what makes $\mathbf{E}$ curl, and what makes $\mathbf{H}$ curl. Maxwell's contribution was the last one - adding the changing electric field as a second source of magnetic field, which is precisely what lets a wave leave the wires behind and travel.

**One equation, one physical job.** Gauss's law $\nabla\cdot\mathbf{D}=\rho_v$ says electric flux diverges from free charge and nowhere else: the flux out of any closed surface equals the charge enclosed, and inside a conductor $\rho_v=0$ so field lines cannot begin or end there. Gauss's law for magnetism $\nabla\cdot\mathbf{B}=0$ says there is no magnetic charge, so magnetic field lines never start or end - they close on themselves, which is why $\mathbf{B}$ can be written as a curl and why the flux through every closed surface is zero. Faraday's law is the statement about curl:
$$\nabla\times\mathbf{E}=-\partial\mathbf{B}/\partial t$$
which says a magnetic field changing in time drives a circulating electric field, which is the transformer, the generator and the induction furnace. Ampere's law with Maxwell's addition carries two sources instead of one:
$$\nabla\times\mathbf{H}=\mathbf{J}+\partial\mathbf{D}/\partial t$$
and it says both conduction current and changing electric flux produce a circulating magnetic field. Note the asymmetry that is not an accident: the magnetic equation carries a source where the electric one does not, and the electric divergence has a source where the magnetic one does not. The two divergences and the two curls, with their signs, are the complete classical theory - every other result in electromagnetics is a consequence.

**The inconsistency the displacement current repairs.** Take a wire charging a parallel-plate capacitor and apply Ampere's law to two different surfaces with the *same* rim, a circle around the wire. Surface A is a flat disc cutting the wire: it is pierced by the conduction current $I$, so $\oint\mathbf{H}\cdot d\mathbf{l}=I$. Surface B is a balloon that passes between the plates: no charge crosses it, so the same line integral would have to be zero. The same closed path cannot have two values, so Ampere's law as originally written is broken. The missing term is the rate of change of the electric flux through surface B: between the plates the field is $E=Q/(\varepsilon A)$, so $\partial D/\partial t$ integrated over the plate area equals $dQ/dt=I$, exactly the conduction current through surface A. Adding $\partial\mathbf{D}/\partial t$ makes the two surfaces agree, and it gives the charging capacitor a magnetic field between its plates - measurable, and the reason a capacitor does not break a high-frequency circuit. The displacement current density is not a flow of charge; it is a changing electric field, measured in A/m², and it exists even in vacuum.

**Consequences: charge conservation, the constitutive relations, and the boundary conditions.** Taking the divergence of the corrected Ampere law and using $\nabla\cdot(\nabla\times\mathbf{H})=0$ together with Gauss's law gives the continuity equation:
$$0=\nabla\cdot\mathbf{J}+\partial\rho_v/\partial t$$
so charge conservation is not an extra assumption but a *consequence* of Maxwell's equations. This is the essential check for a circular argument: Maxwell added the displacement current specifically so that the equations would not contradict the conservation of charge, and the derivation shows the repair worked. The material behaviour is supplied separately by the constitutive relations $\mathbf{D}=\varepsilon\mathbf{E}$, $\mathbf{B}=\mu\mathbf{H}$ and $\mathbf{J}=\sigma\mathbf{E}$: Maxwell's equations relate the fields, and the constitutive relations translate them into the medium. In a linear medium with no free charge these reduce to $\nabla\cdot\mathbf{E}=0$ and $\nabla\cdot\mathbf{H}=0$, so the fields are divergenceless and can be represented by potentials with no source term. At an interface the integral forms collapse to the boundary conditions already met in this area: tangential $\mathbf{E}$ and normal $\mathbf{B}$ continuous always, normal $\mathbf{D}$ jumping by $\rho_s$ and tangential $\mathbf{H}$ jumping by $\mathbf{K}$. Every one of those four is an integral Maxwell equation applied to a shrinking pillbox or loop.

**How the wave equation falls out.** In a source-free, lossless medium take the curl of Faraday's law:
$$\nabla\times(\nabla\times\mathbf{E})=-\mu\dfrac{\partial}{\partial t}(\nabla\times\mathbf{H})$$
The vector identity that turns this into a Laplacian is:
$$\nabla\times(\nabla\times\mathbf{E})=\nabla(\nabla\cdot\mathbf{E})-\nabla^2\mathbf{E}$$
and it kills the divergence term because $\nabla\cdot\mathbf{E}=0$. Ampere's law supplies the other curl:
$$\nabla\times\mathbf{H}=\varepsilon\,\partial\mathbf{E}/\partial t$$
Substituting gives the wave equation for the electric field:
$$\nabla^2\mathbf{E}=\mu\varepsilon\,\dfrac{\partial^2\mathbf{E}}{\partial t^2}$$
whose propagation speed is $v=1/\sqrt{\mu\varepsilon}$; in vacuum that speed takes the value:
$$1/\sqrt{\mu_0\varepsilon_0}=3\times10^{8}$$
m/s. The same manipulation on Ampere's law gives the identical equation for $\mathbf{H}$. Notice that the displacement current is *not optional* here: drop $\partial\mathbf{D}/\partial t$ and the substitution produces $\nabla^2\mathbf{E}=0$, a static diffusion-free field with no propagation at all. So the term Maxwell added to fix a bookkeeping problem in a capacitor is the same term that permits light, radio and every antenna - which is why the equation is named after him and not after Ampere alone.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Gauss's law (electric) | $\nabla\cdot\mathbf{D}=\rho_v\qquad\Longleftrightarrow\qquad \oint\mathbf{D}\cdot d\mathbf{S}=Q_{enc}$ | Free charge is the only source of D. In a conductor in equilibrium the volume density is zero. |
| Gauss's law (magnetic) | $\nabla\cdot\mathbf{B}=0\qquad\Longleftrightarrow\qquad \oint\mathbf{B}\cdot d\mathbf{S}=0$ | No magnetic monopoles. Field lines close, which is why B can be written as the curl of A. |
| Faraday's law | $\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t}\qquad\Longleftrightarrow\qquad \oint\mathbf{E}\cdot d\mathbf{l}=-\frac{d\Phi_B}{dt}$ | A time-varying B drives a circulating E. The minus sign is Lenz's law. |
| Ampere-Maxwell law | $\nabla\times\mathbf{H}=\mathbf{J}+\frac{\partial\mathbf{D}}{\partial t}\qquad\Longleftrightarrow\qquad \oint\mathbf{H}\cdot d\mathbf{l}=I_{enc}+\int\frac{\partial\mathbf{D}}{\partial t}\cdot d\mathbf{S}$ | Both conduction current and changing electric flux make H circulate. The second term is Maxwell's addition. |
| Displacement current density | $\mathbf{J}_d=\frac{\partial\mathbf{D}}{\partial t}$ | A/m^2. Not a charge flow - a changing field. Exists in vacuum; D = eps E in a linear medium. |
| Continuity equation | $\nabla\cdot\mathbf{J}+\frac{\partial\rho_v}{\partial t}=0$ | Charge conservation, derived from Maxwell's equations, not assumed separately. |
| Constitutive relations | $\mathbf{D}=\varepsilon\mathbf{E},\qquad \mathbf{B}=\mu\mathbf{H},\qquad \mathbf{J}=\sigma\mathbf{E}$ | Linear isotropic media. eps = eps_r eps0, mu = mu_r mu0, sigma is the conductivity in S/m. |
| Boundary conditions (summary) | $E_{1t}=E_{2t},\quad B_{1n}=B_{2n},\quad D_{1n}-D_{2n}=\rho_s,\quad H_{1t}-H_{2t}=K$ | The first two always hold; the last two need a surface charge or a surface current to be nonzero. |
| Wave equation in a lossless medium | $\nabla^2\mathbf{E}=\mu\varepsilon\frac{\partial^2\mathbf{E}}{\partial t^2}$ | The same equation holds for H. Requires zero free charge and zero conductivity. |
| Wave speed | $v=\frac{1}{\sqrt{\mu\varepsilon}}=\frac{c}{\sqrt{\mu_r\varepsilon_r}}$ | 3e8 m/s in vacuum. Follows from Maxwell's equations without any mechanical model of the ether. |
| Speed of light from the constants | $c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}=2.998\times10^{8}\ \mathrm{m/s}$ | The numerical agreement with the measured speed of light is what identified light as electromagnetic. |
| Displacement current in a capacitor | $I_d=\varepsilon A\frac{dE}{dt}=A\frac{\partial D}{\partial t}$ | Equals the conduction current in the connecting wires at every instant, including DC switch-on. |

## Worked Problems

### P1. A parallel-plate capacitor has plates of area $0.01$ m² separated by $1$ mm of air, driven by $v(t)=100\sin(2\pi\times10^{6}t)$ V. Find the displacement current between the plates and show that it equals the conduction current in the connecting wire.

**Given:** A = 0.01 m2; d = 1 mm = 1e-3 m; v(t) = 100 sin(2 pi 1e6 t) V; eps0 = 8.854e-12 F/m

**Solution:**

1. The field between the plates is uniform: $E(t)=v(t)/d = 100\sin(\omega t)/10^{-3} = 1\times10^{5}\sin(\omega t)$ V/m with $\omega=2\pi\times10^{6}$ rad/s
2. $\partial E/\partial t = 10^{5}\omega\cos\omega t = 10^{5}(6.2832\times10^{6})\cos\omega t = 6.2832\times10^{11}\cos\omega t$ V/(m s)
3. $J_d=\varepsilon_0\,\partial E/\partial t = (8.854\times10^{-12})(6.2832\times10^{11})\cos\omega t = 5.563\cos\omega t$ A/m²
4. $I_d=J_dA = (5.563)(0.01)\cos\omega t = 0.05563\cos\omega t$ A, a peak of $55.6$ mA
5. Conduction route: $C=\varepsilon_0A/d = (8.854\times10^{-12})(0.01)/10^{-3} = 8.854\times10^{-11}$ F
6. $i_C=C\,dv/dt = (8.854\times10^{-11})(100\omega)\cos\omega t = (8.854\times10^{-11})(6.2832\times10^{8})\cos\omega t = 0.05563\cos\omega t$ A - identical

> [!success]- Answer
> **$I_d=55.6\cos(\omega t)$ mA, exactly equal to the wire current $i_C$ at every instant; peak $55.6$ mA.**

> [!warning] Trap
> Using the displacement current as $\varepsilon_0\partial E/\partial t$ but forgetting to multiply by the plate area to get a current, which reports $5.56$ A/m² as if it were amperes. The mirror error is including the area twice. Also, the equality $I_d=i_C$ is instantaneous, not just at the peak - an answer that matches only at the peak has used the rms value in one place and the peak in the other.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `32` `×1E5×2\pi×1E6=` → peak $J_d$ = **5.563** A/m², with code `32` = $\varepsilon_0$.
> 2. `×0.01=` → peak $I_d$ = **0.05563** A = **55.6** mA.
> 3. Conduction route: `SHIFT` `CVALUE` `32` `×0.01÷1E-3×100×2\pi×1E6=` → **0.05563** A, identical.
>
> The $\cos\omega t$ is common to both routes, so the equality holds instant by instant.

### P2. In a certain region the electric field is $E=50\sin(10^{8}t)$ V/m along $x$. Find the displacement current density and its maximum value, taking the medium as air.

**Given:** E = 50 sin(1e8 t) V/m along x; air: eps_r = 1, eps0 = 8.854e-12 F/m

**Solution:**

1. $\partial E/\partial t = 50(10^{8})\cos(10^{8}t) = 5\times10^{9}\cos(10^{8}t)$ V/(m s)
2. $J_d=\varepsilon_0\,\partial E/\partial t = (8.854\times10^{-12})(5\times10^{9})\cos(10^{8}t)$
3. $J_d = 4.427\times10^{-2}\cos(10^{8}t)$ A/m²
4. Maximum at $\cos=1$: $J_{d,max}=4.43\times10^{-2}$ A/m² $=44.3$ mA/m²
5. Direction: $J_d$ is along $+x$ when $\partial E/\partial t$ is positive (the first quarter cycle) and reverses every half period

> [!success]- Answer
> **$J_d=44.3\cos(10^{8}t)$ mA/m², with a maximum of $44.3$ mA/m².**

> [!warning] Trap
> Computing $\varepsilon_0E$ instead of $\varepsilon_0\partial E/\partial t$: that gives $4.43\times10^{-10}$ C/m² - the electric flux density, not a current density, and smaller by the factor $10^{8}$ that the time derivative supplies. The second slip is dropping the angular frequency from $\sin(\omega t)$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `32` `×50×1E8=` → $J_{d,\max}$ = **0.04427** A/m² = **44.3** mA/m².
> 2. The time derivative supplies the `1E8`: the peak of $\partial E/\partial t$ is **5E9** V/(m·s).
> 3. Dropping it: `SHIFT` `CVALUE` `32` `×50=` → **4.427E-10** C/m², the flux density $D$ and not a current.

### P3. Starting from the Ampere-Maxwell law and Gauss's law, derive the continuity equation and explain what it proves about the displacement current.

**Given:** Ampere-Maxwell: curl H = J + dD/dt; Gauss: div D = rho_v; vector identity: div(curl H) = 0

**Solution:**

1. Take the divergence of both sides: $\nabla\cdot(\nabla\times\mathbf{H}) = \nabla\cdot\mathbf{J} + \dfrac{\partial}{\partial t}(\nabla\cdot\mathbf{D})$
2. The left side is identically zero for any vector field, so $0 = \nabla\cdot\mathbf{J} + \dfrac{\partial}{\partial t}(\nabla\cdot\mathbf{D})$
3. Substitute Gauss's law $\nabla\cdot\mathbf{D}=\rho_v$: $0 = \nabla\cdot\mathbf{J} + \dfrac{\partial\rho_v}{\partial t}$
4. This is the continuity equation - the local statement of charge conservation
5. Read it as a consistency proof: without the $\partial\mathbf{D}/\partial t$ term the same manipulation would give $\nabla\cdot\mathbf{J}=0$, which is false whenever charge accumulates (as it does on a capacitor plate)
6. So the displacement current is forced by charge conservation, and the integral form follows by the divergence theorem: $\oint\mathbf{J}\cdot d\mathbf{S} = -dQ_{enc}/dt$

> [!success]- Answer
> **$\nabla\cdot\mathbf{J}+\partial\rho_v/\partial t=0$; the displacement current is exactly the term that makes Ampere's law consistent with charge conservation.**

> [!warning] Trap
> Treating the continuity equation as an independent postulate. It is a *consequence* of Maxwell's equations; presenting it as a separate assumption loses the point of the derivation, and omitting the displacement current makes the same derivation contradict it. The other slip is dropping the divergence of the curl term, which is what allows the proof to start at all.

### P4. A region has a uniform electric flux density changing at $\partial\mathbf{D}/\partial t = 2.5\times10^{-4}$ C/(m² s) through an area of $0.4$ m². Find the displacement current, and compare it with the conduction current density $J=2.5\times10^{-4}$ A/m² through the same area.

**Given:** dD/dt = 2.5e-4 C/(m2 s), uniform; A = 0.4 m2; J = 2.5e-4 A/m2

**Solution:**

1. $J_d = \partial D/\partial t = 2.5\times10^{-4}$ A/m² (the units C/(m² s) and A/m² are identical)
2. $I_d = J_dA = (2.5\times10^{-4})(0.4) = 1.0\times10^{-4}$ A $= 100\ \mu$A
3. The stated conduction current density is numerically equal, so $I_{cond} = JA = 1.0\times10^{-4}$ A as well
4. Total current through the surface, $\mathbf{J}+\partial\mathbf{D}/\partial t$, is $5.0\times10^{-4}$ A/m² whenever both are present in the same region
5. In a good conductor the two are very unequal: $J/J_d=\sigma/(\omega\varepsilon)$, which is large at low frequency and approaches 1 near the relaxation frequency

> [!success]- Answer
> **$I_d=1.0\times10^{-4}$ A $=100\ \mu$A, numerically equal to the conduction current here; the two add when they coexist.**

> [!warning] Trap
> Multiplying by the area twice, or reporting the current density as the current in amperes. Also, assuming $J_d$ and $J$ are always equal: the equality held here because the numbers were chosen so, but in a conductor $J\gg J_d$ at low frequency, and in a good dielectric it is the other way round.

### P5. Name the single Maxwell equation that governs each of the following, in differential form: (a) an emf induced in a stationary loop by a changing field; (b) the magnetic field inside a charging capacitor's gap; (c) the fact that magnetic field lines never begin or end; (d) the field of a point charge; (e) the field surrounding a steady current-carrying wire.

**Given:** five physical situations; answer in differential form

**Solution:**

1. (a) A stationary loop with a time-varying $\mathbf{B}$: $\nabla\times\mathbf{E}=-\partial\mathbf{B}/\partial t$ (Faraday). The electric term of the Lorentz force does not apply - no charges are in motion, so the induction is purely from the field.
2. (b) No conduction current crosses the gap but the field between the plates is changing: $\nabla\times\mathbf{H}=\partial\mathbf{D}/\partial t$ (Ampere-Maxwell, J = 0 in the gap).
3. (c) No magnetic charge exists, so the flux through any closed surface is zero: $\nabla\cdot\mathbf{B}=0$ (Gauss for magnetism).
4. (d) The field diverges from the charge: $\nabla\cdot\mathbf{D}=\rho_v$ (Gauss for electricity).
5. (e) A steady current sets up a circulating field: $\nabla\times\mathbf{H}=\mathbf{J}$ (Ampere-Maxwell with the displacement term zero, since nothing varies with time)
6. Note (b) and (e) are the same equation with different terms retained - that is the whole point of the displacement current

> [!success]- Answer
> **(a) $\nabla\times\mathbf{E}=-\partial\mathbf{B}/\partial t$; (b) $\nabla\times\mathbf{H}=\partial\mathbf{D}/\partial t$; (c) $\nabla\cdot\mathbf{B}=0$; (d) $\nabla\cdot\mathbf{D}=\rho_v$; (e) $\nabla\times\mathbf{H}=\mathbf{J}$.**

> [!warning] Trap
> Answering with the integral form when the question asks for the differential form (or vice versa) - the physical content is the same but the mark is for the equation asked for. In (b) the common error is quoting Ampere with $\mathbf{J}$ retained: no conduction current crosses the dielectric gap, so the entire field there comes from $\partial\mathbf{D}/\partial t$.

## Traps & Exam Notes

- **Dropping the displacement current in a capacitor gap.** With $\partial\mathbf{D}/\partial t$ removed, Ampere's law gives different answers for two surfaces sharing a rim, and the magnetic field between the plates vanishes. Any calculation that finds no field inside a charging capacitor has silently dropped Maxwell's term.
- **Treating the displacement current as a flow of charge.** $\mathbf{J}_d=\partial\mathbf{D}/\partial t$ is a changing field measured in A/m², not moving carriers, and it exists in vacuum. Reasoning about it as if charges were crossing the gap leads to nonsense about charge conservation inside the dielectric.
- **Forgetting the sign in Faraday's law.** The minus sign is Lenz's law. Getting it wrong reverses the polarity of every induced emf and turns a braking force into a driving one; the induced quantity always opposes the change that produced it.
- **Confusing the roles of the divergence equations.** $\nabla\cdot\mathbf{D}=\rho_v$ has a source and $\nabla\cdot\mathbf{B}=0$ does not, precisely because there is no magnetic charge. Writing $\nabla\cdot\mathbf{B}=\rho_m$ or $\nabla\cdot\mathbf{D}=0$ in the presence of free charge are both errors of the same kind.
- **Using the wrong frequency in a displacement-current comparison.** $J/J_d=\sigma/(\omega\varepsilon)$: at 50 Hz in copper the conduction current dominates by many orders of magnitude, while in air or a good dielectric the displacement term can dominate. Assuming one always beats the other without computing the ratio produces an answer off by orders of magnitude rather than percent.
- **Applying the wave equation outside its assumptions.** $\nabla^2\mathbf{E}=\mu\varepsilon\,\partial^2\mathbf{E}/\partial t^2$ requires zero free charge and zero conductivity. In a conductor the same starting point yields a diffusion equation with a decay term, which is why fields attenuate in metals instead of propagating freely.
- **Mixing up the boundary conditions for the two fields.** Tangential $\mathbf{E}$ and normal $\mathbf{B}$ are continuous; normal $\mathbf{D}$ jumps by $\rho_s$ and tangential $\mathbf{H}$ by $\mathbf{K}$. Swapping $\mathbf{D}$ for $\mathbf{E}$ or $\mathbf{H}$ for $\mathbf{B}$ in the jump conditions gives an answer wrong by the permittivity or permeability ratio.
- **Assuming the wave speed is always $c$.** $v=1/\sqrt{\mu\varepsilon}$ reduces to $c$ only in vacuum. In a dielectric with $\varepsilon_r=4$ the speed halves and the refractive index is 2 - substituting $c$ for every medium puts every delay and wavelength off by $\sqrt{\mu_r\varepsilon_r}$.

## See Also

- [[17_Faraday’s_Law_and_Motional_EMF]]
- [[19_EM_Wave_Equations_and_Uniform_Plane_Waves]]
- [[11_Current_Density_and_Continuity]]
- [[08_Dielectrics_and_Boundary_Conditions]]

---

[[17_Faraday’s_Law_and_Motional_EMF|⬅ 17]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[19_EM_Wave_Equations_and_Uniform_Plane_Waves|19 ➡]]
