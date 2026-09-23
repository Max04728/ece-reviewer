---
id: MATH-05-17
title: "Faraday’s Law and Motional EMF"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 17
tier: 2
depth: full
problem_count: 5
prereqs: ["[[13_Ampere’s_Circuital_Law]]", "[[15_Inductance_from_Geometry_and_Materials]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 17 — Faraday’s Law and Motional EMF

> [!abstract] Scope
> Compute induced voltages from changing flux linkages and moving conductors, choose the correct sign with Lenz's law, and tell the transformer case apart from the motional case.

## Core Concept

> [!tip] Intuition
> A magnetic field that changes with time drags an electric field along with it, and so does a conductor that sweeps through a steady field. Both effects are one law - the induced emf equals the negative rate of change of the flux linkage - seen from two different frames.

**Faraday's law and the two mechanisms inside it.** The induced emf around a closed path is fixed by the rate of change of the flux linkage:
$$\mathcal{E}=-\dfrac{d\lambda}{dt}=-N\dfrac{d\Phi_B}{dt}$$
where $\Phi_B=\int\mathbf{B}\cdot d\mathbf{S}$ is the flux through the surface bounded by the path and $\lambda=N\Phi_B$ is the flux linkage of an $N$-turn coil. This single statement covers both effects a board question can ask about. In the **transformer (pulsation) emf** the conductor is stationary and $\mathbf{B}$ varies with time, so the changing field produces a genuine circulating electric field and the emf is the line integral of that field. In the **motional emf** the field is steady and the conductor moves through it; the free charges are dragged by the magnetic force $q\mathbf{v}\times\mathbf{B}$ and the emf is the line integral of that force:
$$\oint(\mathbf{v}\times\mathbf{B})\cdot d\mathbf{l}$$
which for a straight rod of length $l$ moving with speed $v$ perpendicular to a uniform $\mathbf{B}$ evaluates to the familiar $\mathcal{E}=Blv$. Both names describe the same law, and a problem may mix them (a rotating loop in a varying field); in that case always integrate the flux and differentiate, rather than adding two separate formulas.

**The sign comes from Lenz, never from the formula.** The minus sign is not decoration: it says the induced effect *opposes* the change that produced it. An induced current always circulates in the sense that its own flux fights the change in the original flux - if the flux through a loop is increasing, the induced current creates flux in the opposite direction; if it is decreasing, the induced current tries to maintain it. This is simultaneously energy conservation (the induced current's mechanical reaction opposes the motion, so the work you do becomes the electrical energy dissipated in the resistance) and the reason the sign is examinable. In practice, decide the direction in three steps: find the direction of the original $\mathbf{B}$ through the loop, ask whether its magnitude is rising or falling, then select the induced current direction whose flux opposes the *change* (note: not the field itself). Then the right-hand rule converts the current direction into a terminal polarity.

**Differential form, the surface that matters, and the voltage-current relation.** By Stokes' theorem the integral law takes the differential form:
$$\nabla\times\mathbf{E}=-\dfrac{\partial\mathbf{B}}{\partial t}$$
In words, a time-varying magnetic field is a source of curl in $\mathbf{E}$. A crucial detail follows from the surface integral itself - the flux must be computed through the *actual* surface bounded by the actual path. Different surfaces with the same rim give the same flux only when $\nabla\cdot\mathbf{B}=0$ holds everywhere on the closed surface they form, so a moving or deforming loop must be integrated at each instant, and a loop that changes its orientation changes $\Phi_B$ even if both $B$ and the area are constant. The circuit-level consequences are the two laws an ECE student already knows: $v=L\dfrac{di}{dt}$ for self-inductance and $v_2=M\dfrac{di_1}{dt}$ for mutual inductance, both special cases of Faraday's law with $\lambda=Li$ or $\lambda=Mi_1$. A rotating $N$-turn loop of area $A$ turning at $\omega$ in a uniform field has $\Phi_B=BA\cos\omega t$ and therefore $\mathcal{E}=NBA\omega\sin\omega t$, with peak value $NBA\omega$, giving the sinusoid that every AC generator produces.

**Where the simple formulas fail: eddy currents and geometry.** Faraday's law applies to every closed path, including paths inside a solid conductor. A changing flux through a metal block drives circulating *eddy* currents whose $I^2R$ heating is the basis of induction furnaces and the reason transformer cores are laminated: laminations cut the available paths, raise $R$, and cut the loss. Eddy currents also produce a braking force on a conductor moving through a field, again by Lenz. Two further geometric traps are worth naming. First, $\mathcal{E}=Blv$ requires $\mathbf{B}$, the rod and the velocity to be mutually perpendicular and the rod to be part of a closed circuit; an open rod still develops a potential *difference* $Blv$ between its ends but no current and no steady power. Second, only the flux change *linked* by the circuit counts - a coil on one leg of a core may link only part of the total flux, and a rod sliding parallel to $\mathbf{B}$ links no change at all and generates nothing.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Faraday's law (flux linkage) | $\mathcal{E}=-\frac{d\lambda}{dt}=-N\frac{d\Phi_B}{dt}$ | The master statement. lambda = N Phi_B. The minus sign is Lenz's law, not a sign convention. |
| Flux through a surface | $\Phi_B=\int\mathbf{B}\cdot d\mathbf{S}=BA\cos\theta$ | Webers. theta is between B and the surface normal; for a uniform field on a flat loop the BA cos form applies. |
| Loop rotating in a uniform field | $\mathcal{E}=NBA\omega\sin\omega t,\qquad \mathcal{E}_{peak}=NBA\omega$ | Peak when the loop plane is parallel to B. omega in rad/s; f = omega/2 pi and rms = peak/sqrt(2). |
| Motional emf (straight rod) | $\mathcal{E}=Blv$ | B, l and v mutually perpendicular. Gives the potential difference even with the circuit open. |
| Motional emf (general) | $\mathcal{E}=\oint(\mathbf{v}\times\mathbf{B})\cdot d\mathbf{l}$ | Use for a curved or rotating conductor. Equals -dPhi/dt when the geometry is closed. |
| Transformer emf | $\mathcal{E}=-N\frac{d\Phi_B}{dt}\qquad(v=0)$ | Conductor stationary, B time-varying. The mechanism behind every transformer and induction coil. |
| Faraday's law, differential form | $\nabla\times\mathbf{E}=-\frac{\partial\mathbf{B}}{\partial t}$ | A changing B is a source of curl in E. Partial derivative: E may also vary in space. |
| Induced voltage and self-inductance | $v=L\frac{di}{dt}$ | Volts, with L in henries. Polarity opposes the change in current (Lenz applied to a coil). |
| Mutual inductance | $v_2=M\frac{di_1}{dt}$ | M in henries, from coil 1 into coil 2. Sign depends on the dot convention and the winding sense. |
| Flux linkage of an inductor | $\lambda=Li=N\Phi_B$ | Links the circuit law to the field picture; the current cancels if L is computed from geometry. |
| Eddy-current loss per unit volume | $p=\frac{\pi^2t^2B_m^2f^2}{6\rho}$ | Watts per m^3 in a lamination of thickness t and resistivity rho. The t^2 and f^2 dependences are why cores are thin and laminated. |
| Induced emf from a flux ramp | $\mathcal{E}=-A\frac{dB}{dt}$ | Use when the area is fixed and B changes linearly: a constant emf proportional to the rate, in V. |

## Worked Problems

### P1. A conducting rod of length $0.4$ m slides at $3$ m/s perpendicular to a uniform field $B=0.5$ T, on rails closed by a $2\ \Omega$ resistor. Find the motional emf, the current, and the force that must be applied to keep the rod moving at constant speed.

**Given:** l = 0.4 m; v = 3 m/s; B = 0.5 T; R = 2 ohm

**Solution:**

1. $\mathcal{E}=Blv = (0.5)(0.4)(3) = 0.6$ V
2. Current: $I=\mathcal{E}/R = 0.6/2 = 0.3$ A
3. The current-carrying rod sits in the field, so the magnetic force on it is $F=BIl = (0.5)(0.3)(0.4) = 0.06$ N, directed to oppose the motion
4. At constant speed the applied force must exactly balance it: $F_{applied}=0.06$ N
5. Energy check: mechanical power $= Fv = 0.06(3) = 0.18$ W; electrical $= \mathcal{E}^2/R = 0.36/2 = 0.18$ W
6. Lenz direction: the flux through the loop increases as the rod sweeps out more area, so the induced current circulates to produce flux opposing that increase

> [!success]- Answer
> **$\mathcal{E}=0.6$ V, $I=0.3$ A, and the required applied force is $0.06$ N (opposing the magnetic drag).**

> [!warning] Trap
> Calling the magnetic force on the rod the *applied* force and reporting it with the wrong sign, or using $F=BIl$ with the full loop length instead of the rod length $l=0.4$ m. Also, the magnetic braking force does not depend on the applied force - it is set by $B^2l^2v/R$, so halving the resistance doubles both the current and the drag.

### P2. A generator coil has $N=200$ turns and area $A=0.02$ m² and rotates at $377$ rad/s in a uniform field $B=0.4$ T. Find the peak emf, the rms emf, and the emf at the instant the coil plane is parallel to the field.

**Given:** N = 200 turns; A = 0.02 m2; omega = 377 rad/s; B = 0.4 T

**Solution:**

1. $\mathcal{E}_{peak}=NBA\omega = (200)(0.4)(0.02)(377)$
2. $NAB = 200\times0.4\times0.02 = 1.6$ Wb (the peak flux linkage)
3. $\mathcal{E}_{peak} = 1.6\times377 = 603.2$ V
4. rms: $\mathcal{E}_{rms}=603.2/\sqrt{2} = 603.2/1.41421 = 426.5$ V
5. The emf follows $\mathcal{E}=\mathcal{E}_{peak}\sin\omega t$, and the sine reaches $\pm1$ exactly when the coil plane is parallel to $\mathbf{B}$ - so the emf there is the full $603.2$ V, not zero
6. Check the frequency: $f=\omega/2\pi = 377/6.2832 = 60.0$ Hz

> [!success]- Answer
> **$\mathcal{E}_{peak}=603$ V, $\mathcal{E}_{rms}=427$ V, and $603$ V at the instant the plane is parallel to the field.**

> [!warning] Trap
> Quoting the peak as $NBA=1.6$ V by forgetting the $\omega$ factor, which understates the answer by a factor of $377$. The related error is taking the emf to be zero when the plane is parallel to the field by confusing the *flux* (which is zero there) with its *rate of change* (which is maximum there).

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `200×0.4×0.02×377=` → peak $\mathcal{E}$ = **603.2** V.
> 2. `÷√2=` → rms = **426.5** V.
> 3. `377÷(2\pi)=` → $f$ = **60.0** Hz, which identifies the 377 rad/s source.
>
> Dropping $\omega$ leaves $NBA$ = **1.6** Wb — a flux linkage quoted as a voltage, 377 times too small.

### P3. A single loop of area $0.1$ m² lies perpendicular to a field that increases uniformly at $4$ T/s. Find the induced emf, the current if the loop resistance is $2\ \Omega$, and the dissipated power. What happens to the current if the resistance is doubled?

**Given:** A = 0.1 m2, loop normal along B; dB/dt = 4 T/s (uniform); R = 2 ohm, then 4 ohm

**Solution:**

1. The loop is perpendicular to B, so $\Phi_B = BA$ and $N=1$
2. $\mathcal{E} = -d\Phi_B/dt = -A\,dB/dt = -(0.1)(4) = -0.4$ V - the magnitude is $0.4$ V
3. Current: $I = \mathcal{E}/R = 0.4/2 = 0.2$ A
4. Power: $P = I^2R = (0.2)^2(2) = 0.08$ W $= 80$ mW (equivalently $\mathcal{E}^2/R = 0.16/2$)
5. With $R=4\ \Omega$: $I = 0.4/4 = 0.1$ A and $P = 0.16/4 = 0.04$ W $= 40$ mW
6. Doubling R halves the current but does not change the emf: the emf is set by the flux rate, the current by the circuit

> [!success]- Answer
> **$\mathcal{E}=0.4$ V, $I=0.2$ A, $P=80$ mW; doubling the resistance gives $I=0.1$ A and $P=40$ mW at the same $0.4$ V.**

> [!warning] Trap
> Scaling the emf with the resistance, or assuming the emf depends on $R$ at all. The emf is a property of the flux change; only the current and power respond to the resistance, and the power *falls* when resistance rises at fixed emf.

### P4. The current in coil 1 rises from $0$ to $3$ A in $15$ ms. The mutual inductance between coil 1 and coil 2 is $M=0.25$ H. Find the emf induced in coil 2 and state its polarity rule.

**Given:** M = 0.25 H; di1 = 3 A; dt = 15 ms = 0.015 s

**Solution:**

1. Rate of change: $di_1/dt = 3/0.015 = 200$ A/s
2. $v_2 = M\,di_1/dt = (0.25)(200) = 50$ V
3. Polarity: the induced voltage in coil 2 opposes the *increase* in the flux it links, so terminal 2 drives current in the sense that produces flux opposing coil 1's growing flux
4. If the current instead fell from 3 A to 0 in 15 ms, the rate would be $-200$ A/s and the induced emf would reverse to $-50$ V
5. Note the emf does not depend on the steady value of the current - only on how fast it changes

> [!success]- Answer
> **$v_2=50$ V, with polarity opposing the increase in coil 1's flux (reversing to $-50$ V if the current falls at the same rate).**

> [!warning] Trap
> Substituting the current instead of its rate of change, which gives $v_2=0.25\times3=0.75$ V - off by the factor $dt$ and with the units of the quantity no longer voltage-shaped. The other slip is leaving $dt$ in milliseconds, giving an emf 1000 times too large.

### P5. A wire loop encloses a magnetic flux that increases uniformly from $0.02$ Wb to $0.08$ Wb in $0.1$ s. The loop has $N=50$ turns and a resistance of $4\ \Omega$. Find the induced emf, the current and the total charge that flows.

**Given:** flux per turn: 0.02 Wb to 0.08 Wb; dt = 0.1 s; N = 50 turns; R = 4 ohm

**Solution:**

1. Change in flux per turn: $\Delta\Phi_B = 0.08 - 0.02 = 0.06$ Wb
2. Flux linkage change: $\Delta\lambda = N\Delta\Phi_B = 50(0.06) = 3.0$ Wb-turns
3. $|\mathcal{E}| = \Delta\lambda/\Delta t = 3.0/0.1 = 30$ V
4. Current: $I = \mathcal{E}/R = 30/4 = 7.5$ A
5. Charge: $Q = I\Delta t = (7.5)(0.1) = 0.75$ C; equivalently $Q = \Delta\lambda/R = 3.0/4 = 0.75$ C
6. The charge result needs the flux change only, not the time - a useful check that survives even when the rate is not uniform

> [!success]- Answer
> **$\mathcal{E}=30$ V, $I=7.5$ A, and $Q=0.75$ C flows.**

> [!warning] Trap
> Using the *final* flux instead of the *change* in flux ($\mathcal{E}=50(0.08)/0.1=40$ V), or forgetting $N$ when the problem states the flux per turn. The two mistakes push the answer in the same direction, so a sanity check against $\Delta\lambda/\Delta t$ is worth the ten seconds.

## Traps & Exam Notes

- **Reading the minus sign as decoration.** Lenz's law fixes the polarity: the induced current opposes the *change* in flux, not the flux itself. In the sliding-rod problem this shows up as a braking force rather than a driving one; the wrong sign reverses the direction of the current in the loop.
- **Confusing flux with its rate of change.** A rotating coil has zero flux but maximum emf when its plane is parallel to $\mathbf{B}$, and maximum flux but zero emf when perpendicular. Reporting zero emf at the parallel position because the flux there is zero is the standard sign-free error.
- **Mixing the two emf mechanisms.** $\mathcal{E}=Blv$ requires a *steady* $\mathbf{B}$ and a moving conductor; $-N\,d\Phi_B/dt$ covers everything. Applying $Blv$ to a stationary transformer winding, or adding $Blv$ to the transformer emf in a problem where both occur, double-counts the same physics.
- **Dropping $N$ or $\omega$ from the generator emf.** The peak is $NBA\omega$, not $NBA$. Omitting $\omega$ at $377$ rad/s understates the peak by a factor of $377$, and omitting $N$ understates it by the turn count.
- **Using the final or initial flux instead of the change.** $\mathcal{E}$ responds to $\Delta\Phi_B/\Delta t$; substituting the absolute flux value gives an answer that depends on the reference level, which is unphysical. For the charge, use $Q=\Delta\lambda/R$ and notice that the time cancels.
- **Substituting the current instead of $di/dt$.** Mutual and self-induced voltages are proportional to the *rate* of change of current: $v=M\,di/dt$. Using $Mi$ or $Li$ gives a quantity with the wrong units, and a steady current then appears to produce a voltage when it produces none.
- **Assuming an open conductor produces power.** A rod moving through a field with no closed circuit still has $Blv$ across its ends, but no current flows, no energy is dissipated, and the magnetic force does not appear as a drag. The force, current and heat all require a closed path.
- **Ignoring eddy currents and lamination.** A solid core has low-resistance paths for circulating currents, so the loss $\mathcal{E}^2/R$ is large and rises as $t^2B^2f^2$. An answer that ignores eddy loss in a high-frequency transformer predicts an efficiency no real laminated core achieves.

## See Also

- [[13_Ampere’s_Circuital_Law]]
- [[15_Inductance_from_Geometry_and_Materials]]
- [[16_Magnetic_Forces,_Torque_and_Lorentz]]
- [[18_Maxwell’s_Equations_and_Displacement_Current]]

---

[[16_Magnetic_Forces,_Torque_and_Lorentz|⬅ 16]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[18_Maxwell’s_Equations_and_Displacement_Current|18 ➡]]
