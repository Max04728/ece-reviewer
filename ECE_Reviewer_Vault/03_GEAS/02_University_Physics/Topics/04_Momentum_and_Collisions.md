---
id: GEAS-02-04
title: "Momentum and Collisions"
part: "03_GEAS"
area: "02_University_Physics"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Newton’s_Laws,_Friction_and_Circular_Motion]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Momentum and Collisions

> [!abstract] Scope
> Use impulse and momentum conservation to find post-collision velocities, decide whether kinetic energy survives, and locate a system's centre of mass.

## Core Concept

> [!tip] Intuition
> Momentum is the quantity that survives a collision, because the colliding bodies push each other with equal and opposite forces for the same time. Kinetic energy is what may or may not survive - it depends entirely on whether the objects bounce or deform.

**Impulse is momentum's delivery mechanism.** The impulse-momentum relation is:
$$\vec{J} = \vec{F}_{avg}\Delta t = \Delta\vec{p} = m\vec{v}_f - m\vec{v}_i$$
Momentum is a vector, so a rebound changes the sign and the change is much larger than a mere slowdown. A $0.145\ \mathrm{kg}$ ball arriving at $40\ \mathrm{m/s}$ and leaving at $50\ \mathrm{m/s}$ in the opposite direction has:
$$\Delta p = (0.145)(50 + 40) = 13.05\ \mathrm{kg\cdot m/s}$$
This is not $(0.145)(10) = 1.45$. The same impulse delivered over a shorter contact time is a larger force, which is why airbags and crumple zones extend $\Delta t$: the momentum change is fixed by the crash, only the force is negotiable.

**Conservation of momentum is a statement about an isolated system.** When no net *external* force acts, total momentum is constant: $\sum m_i\vec{v}_i$ before equals after. Internal forces - the collision itself - always cancel in pairs. Gravity and friction are external and spoil the conservation, so the rule is applied only during the brief collision, or along a direction (say horizontal) in which no external force acts. Momentum is conserved in *every* collision, elastic or not; only kinetic energy is selective.

**Perfectly inelastic means they stick, and kinetic energy always drops.** The combined body moves at $v' = \frac{m_1v_1 + m_2v_2}{m_1 + m_2}$. The kinetic energy lost is:
$$\Delta KE = \frac{1}{2}\frac{m_1m_2}{m_1+m_2}(v_1-v_2)^2$$
This is the magnitude, signed negative when it is written as an energy loss, and it depends on the *relative* speed. In the special case of a moving mass striking a stationary one, the fraction lost is $\frac{m_2}{m_1+m_2}$, so an equal-mass sticking collision throws away exactly half the kinetic energy. That lost energy went into deformation, sound and heat - it is not 'missing'.

**Elastic collisions conserve both momentum and kinetic energy, and that extra equation is what you solve.** For 1D motion with $v_2$ initially zero:
$$v_1' = \frac{m_1-m_2}{m_1+m_2}v_1$$
and $v_2' = \frac{2m_1}{m_1+m_2}v_1$. Three results boards test repeatedly: equal masses exchange velocities ($v_1' = 0$, $v_2' = v_1$); a light ball bouncing off a very heavy one reverses at nearly its original speed; and a heavy ball hitting a light one barely slows while the light one leaves at nearly $2v_1$. The relative speed of approach equals the relative speed of separation in an elastic collision.

**Real collisions sit between the two extremes, and the coefficient of restitution quantifies where.** $e = \frac{v_2' - v_1'}{v_1 - v_2}$ equals 1 for elastic, 0 for perfectly inelastic, and lies between for real bodies (a dropped ball rebounding to height $h'$ from $h$ has $e = \sqrt{h'/h}$). Using $e$ replaces the energy equation whenever the problem gives a rebound height or a 'bounces back at half its speed' statement.

**The centre of mass is the mass-weighted average position, and it moves as if all external forces acted there.** $x_{cm} = \frac{\sum m_ix_i}{\sum m_i}$; the same formula applies to $y$ and $z$ independently. Its power is that a system with no external force has a centre of mass that keeps moving at constant velocity even while the parts scatter - an exploding shell's fragments still have their centre of mass follow the original parabola, and a rifle-and-bullet system has zero total momentum because the centre of mass stays put.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Linear momentum | $p = mv$ | Vector, in kg m/s. Direction matters: a rebound has a larger change of momentum than a stop. |
| Impulse-momentum theorem | $\vec{J} = \vec{F}_{avg}\Delta t = \Delta\vec{p}$ | The area under a force-time graph. Extending the contact time reduces the average force for the same impulse. |
| Conservation of momentum | $\sum m_i v_i = \sum m_i v_i'$ | Isolated system only, or one direction with no external force. Applies to every collision, elastic or not. |
| Perfectly inelastic (stick together) | $v' = \frac{m_1v_1 + m_2v_2}{m_1+m_2}$ | One unknown velocity. Kinetic energy is NOT conserved; use momentum only. |
| Kinetic energy lost when sticking | $\Delta KE = -\frac{1}{2}\frac{m_1m_2}{m_1+m_2}(v_1-v_2)^2$ | Always negative and depends on relative speed. Equal masses with one at rest lose exactly half. |
| Elastic collision, 1D | $v_1' = \frac{m_1-m_2}{m_1+m_2}v_1, \quad v_2' = \frac{2m_1}{m_1+m_2}v_1$ | Partner stationary. Equal masses exchange velocities; both momentum and KE are conserved. |
| Relative-velocity rule (elastic) | $v_1 - v_2 = -(v_1' - v_2')$ | Speed of approach equals speed of separation. Cheap second equation when both final velocities are unknown. |
| Coefficient of restitution | $e = \frac{v_2' - v_1'}{v_1 - v_2}$ | e = 1 elastic, e = 0 perfectly inelastic. For a dropped ball, e = sqrt(h'/h). |
| Recoil (explosion) from rest | $m_1v_1 + m_2v_2 = 0$ | Total momentum stays zero, so the pieces move in opposite directions with opposite momenta. |
| Centre of mass | $x_{cm} = \frac{\sum m_i x_i}{\sum m_i}$ | Compute x and y separately. With no external force the CM moves at constant velocity. |

## Worked Problems

### P1. A $1500\ \mathrm{kg}$ car travelling at $20\ \mathrm{m/s}$ collides head-on with a stationary $1000\ \mathrm{kg}$ car and the two lock together. Find their common velocity and the kinetic energy lost.

**Given:** m_1 = 1500 kg; v_1 = 20 m/s; m_2 = 1000 kg; v_2 = 0; perfectly inelastic

**Solution:**

1. Momentum is conserved (no significant external horizontal force during the collision).
2. $m_1v_1 + m_2v_2 = (m_1+m_2)v'$
3. $(1500)(20) + 0 = (2500)v'$, so $v' = \frac{30000}{2500} = 12\ \mathrm{m/s}$
4. Initial KE: $\frac{1}{2}(1500)(20)^2 = 300000\ \mathrm{J}$
5. Final KE: $\frac{1}{2}(2500)(12)^2 = 180000\ \mathrm{J}$
6. Loss: $300000 - 180000 = 120000\ \mathrm{J} = 120\ \mathrm{kJ}$ (40% of the initial KE).

> [!success]- Answer
> **$v' = 12\ \mathrm{m/s}$ in the original direction; $120\ \mathrm{kJ}$ lost.**

> [!warning] Trap
> Trying to conserve kinetic energy as well. Momentum alone answers this: $\frac{1}{2}(1500)(20)^2 \neq \frac{1}{2}(2500)v'^2$, and solving that gives $v' = 15.5\ \mathrm{m/s}$, which violates momentum conservation.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1500×20÷(1500+1000)` → $v'$ = **12.0** m/s.
> 2. `0.5×1500×20²` → $KE_i$ = **300000** J; `0.5×2500×12²` → $KE_f$ = **180000** J; `300000−180000` → **120** kJ lost (40%).

### P2. A $0.16\ \mathrm{kg}$ billiard ball moving at $3.0\ \mathrm{m/s}$ strikes an identical stationary ball head-on in a perfectly elastic collision. Find both final velocities.

**Given:** m_1 = m_2 = 0.16 kg; v_1 = 3.0 m/s; v_2 = 0; elastic collision

**Solution:**

1. Use the elastic results with $v_2 = 0$: $v_1' = \frac{m_1-m_2}{m_1+m_2}v_1$ and $v_2' = \frac{2m_1}{m_1+m_2}v_1$.
2. Since $m_1 = m_2$, the first numerator is zero: $v_1' = 0$.
3. $v_2' = \frac{2m_1}{2m_1}(3.0) = 3.0\ \mathrm{m/s}$
4. Check momentum: $(0.16)(3.0) = 0.48\ \mathrm{kg\cdot m/s}$ before, and $(0.16)(0) + (0.16)(3.0) = 0.48$ after.
5. Check energy: KE before $= \frac{1}{2}(0.16)(9.0) = 0.72\ \mathrm{J}$; after $= \frac{1}{2}(0.16)(9.0) = 0.72\ \mathrm{J}$.

> [!success]- Answer
> **Cue ball stops ($v_1' = 0$); struck ball moves off at $3.0\ \mathrm{m/s}$.**

> [!warning] Trap
> Applying the perfectly inelastic formula $v' = \frac{m_1v_1}{m_1+m_2} = 1.5\ \mathrm{m/s}$ to a head-on billiard shot. Equal-mass elastic collisions transfer *all* the velocity; the sticking result loses half the KE and is the wrong model here.

### P3. A $0.145\ \mathrm{kg}$ baseball arrives at the bat at $40\ \mathrm{m/s}$ and leaves in the opposite direction at $50\ \mathrm{m/s}$. The bat is in contact with the ball for $1.2\ \mathrm{ms}$. Find the magnitude of the average force on the ball.

**Given:** m = 0.145 kg; v_i = -40 m/s; v_f = +50 m/s; dt = 1.2 ms

**Solution:**

1. Choose the outgoing direction as positive: $v_i = -40\ \mathrm{m/s}$, $v_f = +50\ \mathrm{m/s}$.
2. $\Delta p = m(v_f - v_i) = 0.145\,(50 - (-40)) = 0.145(90) = 13.05\ \mathrm{kg\cdot m/s}$
3. Convert the contact time: $1.2\ \mathrm{ms} = 1.2\times10^{-3}\ \mathrm{s}$
4. $F_{avg} = \frac{\Delta p}{\Delta t} = \frac{13.05}{1.2\times10^{-3}} = 10875\ \mathrm{N}$
5. To three significant figures: $F_{avg} \approx 1.09\times10^{4}\ \mathrm{N} = 10.9\ \mathrm{kN}$.

> [!success]- Answer
> **$F_{avg} = 10.9\ \mathrm{kN}$ in the direction the ball leaves.**

> [!warning] Trap
> Ignoring the reversal and computing $0.145(50-40) = 1.45\ \mathrm{kg\cdot m/s}$, giving $1.21\ \mathrm{kN}$ - nine times too small. A rebound doubles the momentum change relative to a stop, which is why the bat stings more on a line drive than on a bunt.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.145×(50−(−40))` → $\Delta p$ = **13.05** kg·m/s — the rebound gives 90 m/s, not 10.
> 2. `Ans÷1.2E-3` → $F_{avg}$ = **10875** N ≈ **10.9** kN; ignoring the reversal gives **1.21** kN, nine times too small.

### P4. A $4.0\ \mathrm{kg}$ rifle fires a $0.020\ \mathrm{kg}$ bullet at $600\ \mathrm{m/s}$. Find the rifle's recoil speed.

**Given:** M = 4.0 kg rifle; m = 0.020 kg bullet; v_bullet = 600 m/s; initially at rest

**Solution:**

1. Total momentum before firing is zero, and no external horizontal force acts.
2. After: $m v_{bullet} + M v_{rifle} = 0$
3. $v_{rifle} = -\frac{m v_{bullet}}{M} = -\frac{(0.020)(600)}{4.0}$
4. $v_{rifle} = -\frac{12}{4.0} = -3.0\ \mathrm{m/s}$

> [!success]- Answer
> **$3.0\ \mathrm{m/s}$ opposite to the bullet.**

> [!warning] Trap
> Assuming the bullet's kinetic energy is shared. The *momenta* are equal in magnitude ($12\ \mathrm{kg\cdot m/s}$ each) but the bullet carries $3600\ \mathrm{J}$ while the rifle carries only $18\ \mathrm{J}$ - energy is not the conserved quantity here.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.020×600÷4.0` → $v_{rifle}$ = **3.0** m/s, opposite the bullet.
> 2. Momentum is shared, energy is not: `0.5×0.020×600²` → **3600** J for the bullet, `0.5×4.0×3.0²` → **18** J for the rifle.

### P5. Three masses lie on the $x$-axis: $3.0\ \mathrm{kg}$ at $x = 0$, $5.0\ \mathrm{kg}$ at $x = 2.0\ \mathrm{m}$, and $2.0\ \mathrm{kg}$ at $x = 5.0\ \mathrm{m}$. Find the $x$-coordinate of the centre of mass.

**Given:** m_1 = 3.0 kg at x = 0; m_2 = 5.0 kg at x = 2.0 m; m_3 = 2.0 kg at x = 5.0 m

**Solution:**

1. $x_{cm} = \frac{\sum m_i x_i}{\sum m_i}$
2. Numerator: $(3.0)(0) + (5.0)(2.0) + (2.0)(5.0) = 0 + 10 + 10 = 20\ \mathrm{kg\cdot m}$
3. Denominator: $3.0 + 5.0 + 2.0 = 10.0\ \mathrm{kg}$
4. $x_{cm} = \frac{20}{10.0} = 2.0\ \mathrm{m}$

> [!success]- Answer
> **$x_{cm} = 2.0\ \mathrm{m}$, which coincides with the position of the 5.0 kg mass.**

> [!warning] Trap
> Dividing by the number of masses (3) instead of the total mass, giving 6.67 m. The centre of mass is a mass-weighted average, and it can lie where no mass exists at all.

## Traps & Exam Notes

- **Treating momentum as a scalar.** A ball rebounding off a wall at the same speed has $\Delta p = 2mv$, not zero. Using $v_f - v_i$ with both speeds positive gives $\Delta p = 0$ and predicts no force from a perfectly bouncy collision.
- **Conserving kinetic energy in a collision that is not described as elastic.** Unless the problem says elastic, or gives a coefficient of restitution, assume energy is lost. Solving an inelastic collision with the energy equation gives a velocity that fails the momentum check.
- **Forgetting that friction and gravity are external.** Momentum is conserved only during the brief collision or only along a direction with no net external force. A block sliding to rest on a rough floor loses momentum to the floor, which is not in the system.
- **Swapping the elastic-collision results for recoil.** In $v_1' = \frac{m_1-m_2}{m_1+m_2}v_1$ the *sign* of the numerator carries the direction: a light ball hitting a heavy one gets a negative $v_1'$ (it bounces back), while a heavy ball hitting a light one keeps moving forward. Dropping the sign turns a rebound into a pass-through.
- **Assuming the bullet and the gun share kinetic energy.** They share *momentum*. A 12 kg m/s bullet at 600 m/s carries 3600 J while the 4 kg rifle recoiling at 3 m/s carries 18 J; energy is quadratic in speed, so the light fast object always takes almost all of it.
- **Dividing the centre of mass by the number of particles.** The denominator is the total mass. With masses 3, 5 and 2 kg the correct divisor is 10, not 3.

## See Also

- [[02_Newton’s_Laws,_Friction_and_Circular_Motion]]
- [[03_Work,_Energy_and_Conservation]]
- [[06_Angular_Momentum_and_Rigid_Bodies]]

---

[[03_Work,_Energy_and_Conservation|⬅ 03]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Rotational_Kinematics_and_Torque|05 ➡]]
