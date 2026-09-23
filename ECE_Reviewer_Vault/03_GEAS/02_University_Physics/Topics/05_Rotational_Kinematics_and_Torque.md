---
id: GEAS-02-05
title: "Rotational Kinematics and Torque"
part: "03_GEAS"
area: "02_University_Physics"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Kinematics_1D_and_2D]]", "[[02_Newton’s_Laws,_Friction_and_Circular_Motion]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Rotational Kinematics and Torque

> [!abstract] Scope
> Translate the linear equations of motion into angular form, compute torque about a chosen axis, and satisfy the two conditions of static equilibrium.

## Core Concept

> [!tip] Intuition
> Rotation is linear motion rewritten with angles: every $x$ becomes $\theta$, every $v$ becomes $\omega$, and every mass becomes a moment of inertia that depends on how far the mass sits from the axis. Torque is the rotational version of force, but the same force produces different torques depending on where and at what angle it is applied.

**Rotational kinematics is the linear set with renamed variables.** The equations are:
$$\omega = \omega_0 + \alpha t$$

$$\theta = \omega_0 t + \frac{1}{2}\alpha t^2$$

$$\omega^2 = \omega_0^2 + 2\alpha\Delta\theta$$
They are the same three equations as before, with $x\to\theta$, $v\to\omega$, $a\to\alpha$. Every technique you learned for linear kinematics - splitting a motion into stages, using the equation that omits the variable you were not given - transfers directly. The only genuinely new work is unit conversion: boards mix revolutions, degrees, rpm and rad/s in one stem, and every rotational equation requires radians.

**Angles must be in radians, and rpm is a rate not an angle.** In radians:
$$1\ \mathrm{rev} = 2\pi\ \mathrm{rad} = 360^\circ$$
for angular velocity:
$$1\ \mathrm{rpm} = \frac{2\pi}{60} = 0.1047\ \mathrm{rad/s}$$
A wheel at $1800\ \mathrm{rpm}$ turns at $188.5\ \mathrm{rad/s}$, and its rim moves at $v = \omega r$. Mixing rpm into $\omega = \omega_0 + \alpha t$ is dimensionally invisible but wrong by a factor of $\frac{2\pi}{60}$.

**Torque is the lever-arm idea made precise: $\tau = rF\sin\theta$.** Here $r$ is the distance from the axis to the point of application, $F$ the force magnitude, and $\theta$ the angle between the position vector and the force. Equivalently $\tau = F d_{\perp}$, where $d_{\perp} = r\sin\theta$ is the perpendicular distance from the axis to the force's line of action. Consequences boards test: a force directed straight at (or away from) the axis has $\theta = 180^\circ$ or $0^\circ$ and produces zero torque; the same force on a longer wrench gives more torque; and the sign of the torque is set by the direction of rotation it tends to produce (counter-clockwise positive by convention).

**Moment of inertia is rotational mass, and it depends on where the mass sits.** $I = \sum m_ir_i^2$, so the same total mass gives a much larger $I$ when it is far from the axis. Memorise the standard results: point mass $mr^2$; thin hoop or ring about its centre $MR^2$; solid disk or cylinder about its centre $\frac{1}{2}MR^2$; solid sphere about a diameter $\frac{2}{5}MR^2$; thin rod about its centre $\frac{1}{12}ML^2$ and about one end $\frac{1}{3}ML^2$. A hoop and a disk of the same mass and radius have $I$ in the ratio 2:1, which is why the hoop is harder to spin up and rolls down an incline more slowly.

**$\sum\tau = I\alpha$ is the rotational Newton's second law, but only about a fixed axis or the centre of mass.** Choose your axis cleverly: taking torques about an unknown support force eliminates it from the equation immediately, so a ladder problem or a beam on two supports usually solves in one line if you pivot at one of the supports. Also, torque and moment of inertia must be taken about the *same* axis - an $I$ about the centre combined with a torque about the end is the classic mismatched-axis error.

**Static equilibrium is two conditions, not one.** A rigid body at rest needs $\sum F = 0$ *and* $\sum\tau = 0$ about any axis. Satisfying only the force condition lets a body translate nowhere while it spins - a beam that balances its weights but tips. The method is: draw the free-body diagram, write the force conditions, then choose a pivot that kills the most unknowns and write one torque equation. Rolling without slipping adds the geometric link $v = R\omega$ and $a = R\alpha$, which is what couples the rotation to the translation.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Angular velocity from time | $\omega = \omega_0 + \alpha t$ | alpha in rad/s^2, omega in rad/s, t in s. Never substitute rpm directly. |
| Angular displacement | $\theta = \omega_0 t + \frac{1}{2}\alpha t^2$ | Gives radians when omega is in rad/s. Divide by 2 pi for revolutions, multiply by 180/pi for degrees. |
| Time-independent angular relation | $\omega^2 = \omega_0^2 + 2\alpha\Delta\theta$ | Use when time is neither given nor wanted. Delta theta comes out in radians. |
| rpm to rad/s | $\omega = \frac{2\pi N}{60}$ | N is revolutions per minute. The factor is 0.1047, not 60 and not 2 pi. |
| Link between linear and angular motion | $v = r\omega, \qquad a_t = r\alpha$ | Tangential quantities. A point nearer the axis has a smaller tangential speed for the same omega. |
| Centripetal acceleration in angular form | $a_c = \omega^2 r = \frac{v^2}{r}$ | Points toward the axis, perpendicular to the tangential velocity. |
| Torque | $\tau = rF\sin\theta = Fd_{\perp}$ | r from the axis to the point of application; theta between r and F. Force through the axis gives zero torque. |
| Rotational Newton's second law | $\sum\tau = I\alpha$ | Torque and I must be about the same axis. Fixed axis or centre of mass only. |
| Moment of inertia, point mass | $I = mr^2$ | r is the perpendicular distance to the axis of rotation, not to the origin. |
| Moment of inertia, hoop / disk / solid sphere | $I_{hoop} = MR^2, \quad I_{disk} = \frac{1}{2}MR^2, \quad I_{sphere} = \frac{2}{5}MR^2$ | All about the symmetry axis through the centre. A hoop and a disk of equal M and R differ by a factor of 2. |
| Moment of inertia, thin rod | $I_{centre} = \frac{1}{12}ML^2, \quad I_{end} = \frac{1}{3}ML^2$ | The axis choice changes the answer by 4x. Read which end the rod pivots about. |
| Static equilibrium | $\sum F = 0 \quad \mathrm{and} \quad \sum\tau = 0$ | Both conditions are required. Choose the pivot at an unknown force to eliminate it. |
| Rolling without slipping | $v = R\omega, \qquad a = R\alpha$ | Valid only while the contact point does not slide. For a skidding tyre the link is broken. |
| Rotational kinetic energy | $KE_{rot} = \frac{1}{2}I\omega^2$ | omega in rad/s. Add it to the translational term for a rolling body. |

## Worked Problems

### P1. A wheel starts from rest and accelerates uniformly at $3.0\ \mathrm{rad/s^2}$ for $4.0\ \mathrm{s}$. Find its final angular velocity and the number of revolutions it turns through.

**Given:** omega_0 = 0; alpha = 3.0 rad/s^2; t = 4.0 s

**Solution:**

1. $\omega = \omega_0 + \alpha t = 0 + (3.0)(4.0) = 12\ \mathrm{rad/s}$
2. $\theta = \omega_0t + \frac{1}{2}\alpha t^2 = 0 + \frac{1}{2}(3.0)(4.0)^2 = 24\ \mathrm{rad}$
3. Convert to revolutions: $\frac{24}{2\pi} = \frac{24}{6.2832} = 3.82\ \mathrm{rev}$

> [!success]- Answer
> **$\omega = 12\ \mathrm{rad/s}$; $\theta = 3.82$ revolutions.**

> [!warning] Trap
> Reporting 24 revolutions by forgetting to divide by $2\pi$. A radian is $\frac{1}{2\pi}$ of a turn, so converting is mandatory whenever the answer is asked for in revolutions.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3.0×4.0` → $\omega$ = **12** rad/s; `0.5×3.0×4.0²` → $\theta$ = **24** rad.
> 2. `24÷(2π)` → **3.82** rev; reporting 24 revolutions is the missing-$2\pi$ trap.

### P2. A grinding wheel $0.30\ \mathrm{m}$ in diameter spins at $1800\ \mathrm{rpm}$. Find its angular velocity in $\mathrm{rad/s}$ and the tangential speed of a point on its rim.

**Given:** d = 0.30 m; N = 1800 rpm

**Solution:**

1. $\omega = \frac{2\pi N}{60} = \frac{2\pi(1800)}{60} = 60\pi = 188.5\ \mathrm{rad/s}$
2. The rim is at the radius, not the diameter: $r = \frac{0.30}{2} = 0.15\ \mathrm{m}$
3. $v = r\omega = (0.15)(188.5) = 28.3\ \mathrm{m/s}$

> [!success]- Answer
> **$\omega = 188.5\ \mathrm{rad/s}$; $v = 28.3\ \mathrm{m/s}$.**

> [!warning] Trap
> Using the diameter in $v = r\omega$. That doubles the rim speed to 56.5 m/s (about 204 km/h) and makes the wheel look far more dangerous than it is. Also note $1800\ \mathrm{rpm} \neq 1800\ \mathrm{rad/s}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×1800÷60` → $\omega$ = **188.5** rad/s; never type rpm into an angular equation.
> 2. `0.15×Ans` → $v$ = **28.3** m/s — the rim is at the radius, half the 0.30 m diameter.

### P3. A force of $250\ \mathrm{N}$ is applied to the end of a $0.40\ \mathrm{m}$ wrench. Find the torque when the force is perpendicular to the handle, and when it is applied at $70^\circ$ to the handle.

**Given:** F = 250 N; r = 0.40 m; theta = 90 deg, then 70 deg

**Solution:**

1. Perpendicular case: $\tau = rF\sin 90^\circ = (0.40)(250)(1) = 100\ \mathrm{N\cdot m}$
2. At $70^\circ$: $\tau = rF\sin 70^\circ = (0.40)(250)(0.9397)$
3. $\tau = 100(0.9397) = 93.97\ \mathrm{N\cdot m}$
4. Equivalently, the lever arm is $d_{\perp} = r\sin 70^\circ = 0.376\ \mathrm{m}$, and $(0.376)(250) = 94.0\ \mathrm{N\cdot m}$.

> [!success]- Answer
> **Perpendicular: $100\ \mathrm{N\cdot m}$. At $70^\circ$: $94.0\ \mathrm{N\cdot m}$.**

> [!warning] Trap
> Using $\cos\theta$ instead of $\sin\theta$, which gives $34.2\ \mathrm{N\cdot m}$ at $70^\circ$ - only a third of the correct value. The lever arm is $r\sin\theta$, so a force directed along the handle produces no torque at all.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.40×250×sin(90)` → **100** N·m perpendicular.
> 2. `0.40×250×sin(70)` → **94.0** N·m; `cos(70)` instead gives **34.2** N·m, about a third of the truth.

### P4. A uniform $6.0\ \mathrm{m}$ plank of mass $20\ \mathrm{kg}$ rests on supports at its two ends. A $50\ \mathrm{kg}$ person stands $4.0\ \mathrm{m}$ from the left end. Find the reaction force at each support. Use $g = 9.81\ \mathrm{m/s^2}$.

**Given:** L = 6.0 m; plank mass = 20 kg (uniform); person 50 kg at 4.0 m from left; g = 9.81 m/s^2

**Solution:**

1. The plank's weight acts at its centre, 3.0 m from the left end: $(20)(9.81) = 196.2\ \mathrm{N}$.
2. The person's weight acts at 4.0 m: $(50)(9.81) = 490.5\ \mathrm{N}$.
3. Take torques about the left support so $R_1$ drops out: $R_2(6.0) = (196.2)(3.0) + (490.5)(4.0)$
4. $R_2(6.0) = 588.6 + 1962 = 2550.6$, so $R_2 = 425.1\ \mathrm{N}$
5. Force equilibrium: $R_1 + R_2 = 196.2 + 490.5 = 686.7\ \mathrm{N}$, so $R_1 = 686.7 - 425.1 = 261.6\ \mathrm{N}$
6. Check by taking torques about the right support: $R_1(6.0) = (196.2)(3.0) + (490.5)(2.0) = 588.6 + 981 = 1569.6$, giving $R_1 = 261.6\ \mathrm{N}$. Consistent.

> [!success]- Answer
> **$R_1 = 262\ \mathrm{N}$ (left) and $R_2 = 425\ \mathrm{N}$ (right); the two sum to the total weight of 687 N.**

> [!warning] Trap
> Treating the plank's weight as acting at the person's position (or at the far end). A *uniform* plank puts its weight at the geometric centre, 3.0 m from either end; moving it to 4.0 m changes $R_1$ by about 33 N.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` `1` with rows `1 , 1 , 686.7` (force balance) and `0 , 6 , 2550.6` (torques about the left support).
> 2. `=` → $R_1$ = **261.6** N and $R_2$ = **425.1** N; `196.2+490.5` = **686.7** N confirms the total.
>
> Torque row: $R_2(6.0)=(20)(9.81)(3.0)+(50)(9.81)(4.0)$; pivoting at a support removes that unknown.

### P5. A $2.0\ \mathrm{kg}$ mass hangs from a string wound around a $3.0\ \mathrm{kg}$ solid disk of radius $0.20\ \mathrm{m}$ that is free to rotate about its centre. The mass is released from rest. Find its acceleration and the string tension.

**Given:** m = 2.0 kg (hanging); M = 3.0 kg, R = 0.20 m (solid disk); g = 9.81 m/s^2

**Solution:**

1. Disk moment of inertia about its centre: $I = \frac{1}{2}MR^2 = \frac{1}{2}(3.0)(0.20)^2 = 0.060\ \mathrm{kg\cdot m^2}$
2. Tension provides the torque: $\tau = TR = I\alpha$, and no-slip string means $\alpha = \frac{a}{R}$.
3. So $T = \frac{I\alpha}{R} = \frac{Ia}{R^2} = \frac{(0.060)a}{(0.20)^2} = 1.5a$
4. For the hanging mass: $mg - T = ma$, so $(2.0)(9.81) - 1.5a = 2.0a$
5. $19.62 = 3.5a$, giving $a = 5.61\ \mathrm{m/s^2}$
6. Tension: $T = 1.5(5.61) = 8.41\ \mathrm{N}$
7. Check: $19.62 - 8.41 = 11.21\ \mathrm{N} = (2.0)(5.61)$, consistent.

> [!success]- Answer
> **$a = 5.61\ \mathrm{m/s^2}$ (less than $g$ because the disk must be spun up); $T = 8.41\ \mathrm{N}$.**

> [!warning] Trap
> Setting $T = mg = 19.6\ \mathrm{N}$, which makes the torque on the disk enormous and implies the mass does not accelerate. The tension is *less* than the weight precisely because the mass accelerates downward, and it is the tension alone that torques the disk.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5×3.0×0.20²` → $I$ = **0.060** kg·m²; `Ans÷0.20²` → $I/R²$ = **1.5**, so $T = 1.5a$.
> 2. `2.0×9.81÷(2.0+1.5)` → $a$ = **5.61** m/s²; `1.5×Ans` → $T$ = **8.41** N.

## Traps & Exam Notes

- **Substituting rpm for rad/s.** $\omega = \omega_0 + \alpha t$ needs rad/s. A wheel at 1800 rpm is 188.5 rad/s, so using 1800 inflates every angular result by a factor of $\frac{60}{2\pi} = 9.55$.
- **Using $v = r\omega$ with the diameter.** The radius is half the diameter. A $0.30\ \mathrm{m}$ wheel at $188.5\ \mathrm{rad/s}$ has a rim speed of $28.3\ \mathrm{m/s}$, not $56.5\ \mathrm{m/s}$.
- **Using $\cos\theta$ in $\tau = rF\sin\theta$.** $\theta$ is measured between the position vector and the force, so a force along the lever gives zero torque. Using cosine at $70^\circ$ gives $34.2\ \mathrm{N\cdot m}$ where 94.0 is correct.
- **Applying an $I$ that belongs to a different axis.** $\frac{1}{12}ML^2$ is about the rod's centre, $\frac{1}{3}ML^2$ about its end - a factor of 4 apart. Plugging the centre value into a torque taken about the end is the standard static-equilibrium error.
- **Satisfying only $\sum F = 0$ in equilibrium.** A beam with balanced weights can still rotate. Both $\sum F = 0$ and $\sum\tau = 0$ are needed, and the torque condition must hold about *every* axis, so one well-chosen pivot suffices.
- **Putting a uniform body's weight at its end.** A uniform plank or rod carries its weight at the geometric centre. Offsetting it changes the support reactions even though the total weight is unchanged.
- **Assuming $\alpha = a/R$ for a slipping wheel.** Rolling without slipping is a condition, not an identity. If the tyre skids, the angular and linear accelerations are linked only through friction, not by geometry.

## See Also

- [[06_Angular_Momentum_and_Rigid_Bodies]]
- [[01_Kinematics_1D_and_2D]]
- [[02_Newton’s_Laws,_Friction_and_Circular_Motion]]

---

[[04_Momentum_and_Collisions|⬅ 04]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Angular_Momentum_and_Rigid_Bodies|06 ➡]]
