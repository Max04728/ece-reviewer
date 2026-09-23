---
id: GEAS-02-03
title: "Work, Energy and Conservation"
part: "03_GEAS"
area: "02_University_Physics"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Newton’s_Laws,_Friction_and_Circular_Motion]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Work, Energy and Conservation

> [!abstract] Scope
> Compute work from force components, convert it to kinetic or potential energy, and account for what friction and other non-conservative forces take away.

## Core Concept

> [!tip] Intuition
> Work is the accountant's ledger of a mechanical process: forces that act along the motion deposit energy, forces that act across it deposit nothing, and friction always withdraws. Close the books and the final kinetic energy falls out without ever touching acceleration or time.

**Work is a dot product, so only the along-the-motion component counts.** $W = Fd\cos\theta$, where $\theta$ is the angle between the force and the displacement. A $60\ \mathrm{N}$ pull at $25^\circ$ over $8.0\ \mathrm{m}$ delivers:
$$(60)(8.0)\cos 25^\circ = 435\ \mathrm{J}$$
Three special cases the boards love: a force perpendicular to the motion does zero work (the normal force on a horizontal floor, the centripetal force on a circular orbit, gravity on a horizontal move); a force opposing the motion does negative work; and if the object does not move, no work is done no matter how hard you push.

**The work-energy theorem states:
$$W_{net} = \Delta KE = \frac{1}{2}mv^2 - \frac{1}{2}mv_0^2$$
It holds for *any* net force, constant or not, one-dimensional or not, which is why it answers 'find the speed after...' problems without ever solving for $a$ or $t$. The price is that you must account for the work of *every* force, signs included. Stopping distance follows immediately from it: if friction is the only horizontal force, $\mu_k mg\,d = \frac{1}{2}mv_0^2$, so $d = \frac{v_0^2}{2\mu_k g}$ and the mass cancels.

**Conservative versus non-conservative decides whether you may use $\frac{1}{2}mv^2 + mgh = $ constant.** Gravity and ideal springs are conservative: their work depends only on the endpoints, so they may be cashed in as potential energy and the mechanical energy is conserved. Friction, drag, applied pushes and tension from an external motor are non-conservative: their work depends on the path and cannot be stored as PE. The general statement that always works is $W_{nc} = \Delta KE + \Delta PE$, with $W_{nc}$ negative when friction removes mechanical energy. Setting $W_{nc} = 0$ on a rough surface is the single most frequent error in this topic.

**Potential energy needs a reference level, and only differences are physical.** $PE = mgh$ with $h$ measured from wherever you declare zero - the table, the floor, the ground. Choose the lowest point of the motion so $h$ is never negative. Spring potential energy is $\frac{1}{2}kx^2$ with $x$ the deformation from the *natural* length, not the total length. Note that $\frac{1}{2}kx^2$ is always positive, whether the spring is compressed or stretched.

**Power is the rate of energy transfer, and average power is not peak power.** $P = \frac{W}{t}$ for a constant rate, and $P = Fv$ for a force moving at speed $v$ - the second form is why a car climbing a hill at constant speed needs a bigger engine than the same car on the flat, and why acceleration fades at high speed even with the throttle down. Watch the units:
$$1\ \mathrm{hp} = 746\ \mathrm{W}$$
exactly, so a $50\ \mathrm{hp}$ motor is a $37.3\ \mathrm{kW}$ motor. Efficiency multiplies: useful output $= \eta \times$ input, with $\eta < 1$ always.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Work by a constant force | $W = Fd\cos\theta$ | theta is the angle between force and displacement, not the angle to the horizontal. Perpendicular force means zero work. |
| Work by a variable force | $W = \int F\,dx$ | Used for springs. Graphically the area under the force-displacement curve. |
| Kinetic energy | $KE = \frac{1}{2}mv^2$ | Scalar, always non-negative, and quadratic in v - doubling speed quadruples stopping distance. |
| Gravitational potential energy | $PE = mgh$ | h is measured from a chosen reference. Only differences are meaningful; pick the lowest point of the motion. |
| Spring potential energy | $PE_s = \frac{1}{2}kx^2$ | x is deformation from natural length, in metres, not the total length. Always positive. |
| Work-energy theorem | $W_{net} = \Delta KE = \frac{1}{2}mv^2 - \frac{1}{2}mv_0^2$ | Works for any net force. Every force's work, including the negative ones, must be included. |
| Conservation of mechanical energy | $\frac{1}{2}mv_1^2 + mgh_1 = \frac{1}{2}mv_2^2 + mgh_2$ | Frictionless, no applied forces. If a surface is rough this equation silently drops the lost energy. |
| Energy accounting with non-conservative work | $W_{nc} = \Delta KE + \Delta PE$ | The general statement. Friction gives W_nc < 0, so mechanical energy decreases. |
| Friction work | $W_f = -f_k d = -\mu_k Nd$ | Always negative. The distance d is the total path length, not the displacement - it matters over a round trip. |
| Average power | $P = \frac{W}{t} = \frac{\Delta E}{t}$ | Watts when W is in joules and t in seconds. 1 hp = 746 W exactly. |
| Instantaneous power | $P = Fv$ | Force and velocity must be along the same line. Constant-speed climbing means P = mgv sin(theta). |

## Worked Problems

### P1. A crate is dragged $8.0\ \mathrm{m}$ across a level floor by a rope pulling with $60\ \mathrm{N}$ at $25^\circ$ above the horizontal. Find the work done by the rope and the work done by gravity.

**Given:** F = 60 N; d = 8.0 m; theta = 25 deg; level floor

**Solution:**

1. Work by the rope: $W = Fd\cos\theta = (60)(8.0)\cos 25^\circ$
2. $\cos 25^\circ = 0.9063$, so $W = (60)(8.0)(0.9063) = 435\ \mathrm{J}$
3. Gravity is vertical and the displacement is horizontal, so the angle between them is $90^\circ$.
4. $W_{grav} = mgd\cos 90^\circ = 0\ \mathrm{J}$ - gravity does no work on a level move.

> [!success]- Answer
> **Rope: $435\ \mathrm{J}$. Gravity: $0\ \mathrm{J}$.**

> [!warning] Trap
> Using $W = Fd = 480\ \mathrm{J}$, which treats the whole rope tension as if it pulled horizontally. The vertical component of the tension does no work; it only lightens the normal force.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `60×8×cos(25)` → $W$ = **435** J.
> 2. Gravity is perpendicular to a level move, so $W_{grav}$ = **0** J; the unresolved `60×8` = **480** J is the trap.

### P2. A $0.50\ \mathrm{kg}$ ball is dropped from rest at a height of $12\ \mathrm{m}$. Find its speed just before impact, neglecting air resistance, using energy methods. Take $g = 9.81\ \mathrm{m/s^2}$.

**Given:** m = 0.50 kg; h = 12 m; v_0 = 0; g = 9.81 m/s^2

**Solution:**

1. Take the ground as the reference level and use $\frac{1}{2}mv_1^2 + mgh_1 = \frac{1}{2}mv_2^2 + mgh_2$.
2. At the release point: $KE_1 = 0$, $PE_1 = mgh = (0.50)(9.81)(12) = 58.86\ \mathrm{J}$.
3. At impact: $h_2 = 0$ so $PE_2 = 0$, and all the energy is kinetic: $\frac{1}{2}mv_2^2 = 58.86\ \mathrm{J}$.
4. $v_2 = \sqrt{\frac{2(58.86)}{0.50}} = \sqrt{235.4} = 15.3\ \mathrm{m/s}$
5. Note the mass cancelled: $v = \sqrt{2gh}$ gives $\sqrt{2(9.81)(12)} = 15.3\ \mathrm{m/s}$ for any mass.

> [!success]- Answer
> **$v = 15.3\ \mathrm{m/s}$ downward.**

> [!warning] Trap
> Substituting $h = 12\ \mathrm{m}$ into $v = \sqrt{gh}$ instead of $\sqrt{2gh}$, which gives 10.8 m/s. The factor of 2 comes from $\frac{1}{2}mv^2$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(2×9.81×12)` → $v$ = **15.34** m/s; the mass cancels, so `√(9.81×12)` = **10.8** m/s is the missing-2 trap.
> 2. Energy route: `0.50×9.81×12` → $PE_1$ = **58.86** J; `√(2×Ans÷0.50)` → **15.34** m/s.

### P3. A $1200\ \mathrm{kg}$ car accelerates uniformly from $10\ \mathrm{m/s}$ to $25\ \mathrm{m/s}$ in $8.0\ \mathrm{s}$ on a level road. Find the net work done on the car and the average power delivered, in horsepower.

**Given:** m = 1200 kg; v_0 = 10 m/s; v = 25 m/s; t = 8.0 s

**Solution:**

1. Net work equals the change in kinetic energy: $W_{net} = \frac{1}{2}m(v^2 - v_0^2)$
2. $v^2 - v_0^2 = 625 - 100 = 525\ \mathrm{m^2/s^2}$
3. $W_{net} = \frac{1}{2}(1200)(525) = 315000\ \mathrm{J} = 315\ \mathrm{kJ}$
4. Average power: $P = \frac{W}{t} = \frac{315000}{8.0} = 39375\ \mathrm{W}$
5. Convert: $\frac{39375}{746} = 52.8\ \mathrm{hp}$

> [!success]- Answer
> **$W_{net} = 315\ \mathrm{kJ}$; $P_{avg} = 39.4\ \mathrm{kW} = 52.8\ \mathrm{hp}$.**

> [!warning] Trap
> Reporting the power in watts as the answer to a horsepower question, or using 1 hp = 750 W. At 746 W/hp the answer is 52.8 hp; with the rounded 750 it becomes 52.5 hp and misses the keyed value.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5×1200×(25²−10²)` → $W_{net}$ = **315000** J = **315** kJ; `÷8.0` → **39375** W.
> 2. `CONVT` power W → hp gives **52.8** hp; the rounded 750 W/hp would give **52.5** hp.

### P4. A $2.0\ \mathrm{kg}$ block starts from rest and slides $5.0\ \mathrm{m}$ down a ramp inclined at $30^\circ$. Its speed at the bottom is $6.0\ \mathrm{m/s}$. Find the energy dissipated by friction and the average friction force.

**Given:** m = 2.0 kg; L = 5.0 m along the ramp; theta = 30 deg; v = 6.0 m/s at bottom; g = 9.81 m/s^2

**Solution:**

1. Height dropped: $h = L\sin\theta = (5.0)\sin 30^\circ = 2.50\ \mathrm{m}$
2. Potential energy released: $mgh = (2.0)(9.81)(2.50) = 49.05\ \mathrm{J}$
3. Kinetic energy gained: $\frac{1}{2}mv^2 = \frac{1}{2}(2.0)(6.0)^2 = 36.0\ \mathrm{J}$
4. Energy lost to friction: $W_{nc} = 36.0 - 49.05 = -13.05\ \mathrm{J}$, so $13.1\ \mathrm{J}$ was dissipated.
5. Average friction force along the ramp: $f_k = \frac{13.05}{5.0} = 2.61\ \mathrm{N}$

> [!success]- Answer
> **$13.1\ \mathrm{J}$ dissipated; average friction force $2.61\ \mathrm{N}$ up the ramp.**

> [!warning] Trap
> Setting $mgh = \frac{1}{2}mv^2$ and concluding friction is zero. Conservation of mechanical energy is invalid on a rough ramp; the 13.1 J shortfall is the whole point of the problem.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5.0×sin(30)` → $h$ = **2.50** m; `2.0×9.81×Ans` → $PE$ = **49.05** J; `0.5×2.0×6.0²` → $KE$ = **36.0** J.
> 2. `36.0−49.05` → $W_{nc}$ = **−13.05** J, so **13.1** J is dissipated; `13.05÷5.0` → $f_k$ = **2.61** N up the ramp.

### P5. A spring with $k = 800\ \mathrm{N/m}$ is compressed by $0.15\ \mathrm{m}$ and launches a $0.20\ \mathrm{kg}$ ball straight up. Find the maximum height the ball rises above its release point, neglecting air resistance.

**Given:** k = 800 N/m; x = 0.15 m; m = 0.20 kg; g = 9.81 m/s^2

**Solution:**

1. Elastic potential energy stored: $PE_s = \frac{1}{2}kx^2 = \frac{1}{2}(800)(0.15)^2$
2. $(0.15)^2 = 0.0225$, so $PE_s = (400)(0.0225) = 9.00\ \mathrm{J}$
3. At the top all of it has become gravitational potential energy: $mgh = 9.00\ \mathrm{J}$
4. $h = \frac{9.00}{mg} = \frac{9.00}{(0.20)(9.81)} = \frac{9.00}{1.962} = 4.59\ \mathrm{m}$

> [!success]- Answer
> **$h = 4.59\ \mathrm{m}$ above the release point.**

> [!warning] Trap
> Using $x = 0.15$ as the spring's length instead of its deformation, or forgetting the $\frac{1}{2}$ in $\frac{1}{2}kx^2$. Squaring is not enough - omitting the half gives 9.18 m instead of 4.59 m.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5×800×0.15²` → $PE_s$ = **9.00** J.
> 2. `9.00÷(0.20×9.81)` → $h$ = **4.59** m. Drop the half and both the stored energy and the height double.

## Traps & Exam Notes

- **Dropping $\cos\theta$.** A 60 N force at $25^\circ$ over 8.0 m does 435 J, not 480 J. The perpendicular component of a force does zero work by definition, so overstating by $1/\cos\theta$ is always an overestimate.
- **Using energy conservation across friction.** On a rough surface $\frac{1}{2}mv^2 + mgh$ is *not* constant; the shortfall is $\mu_k N d$. A ball rolling to rest on a floor has no mechanical energy left but the energy went to heat, not nowhere.
- **Treating friction's $d$ as displacement instead of path length.** Friction work on a round trip is $-f_k(2L)$, not zero. Using the net displacement of zero predicts a block returns to its start at full speed.
- **Measuring $h$ from the wrong reference.** $PE = mgh$ needs a level you chose; dropping $h$ by the thickness of a table changes the answer by $mg\Delta h$ without any warning. Pick the lowest point in the problem so $h \ge 0$.
- **Rounding $1\ \mathrm{hp}$ to $1\ \mathrm{kW}$.** 746 W is the exact definition; the 34% inflation turns a 52.8 hp answer into 39.4 hp and misses the keyed choice.
- **Confusing power with energy.** A 100 W bulb left on for one hour uses $360\ \mathrm{kJ}$, not 100 J. Watts measure the rate; only multiplying by time gives joules.

## See Also

- [[02_Newton’s_Laws,_Friction_and_Circular_Motion]]
- [[04_Momentum_and_Collisions]]
- [[05_Rotational_Kinematics_and_Torque]]
- [[11_First_Law_and_Processes]]

---

[[02_Newton’s_Laws,_Friction_and_Circular_Motion|⬅ 02]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Momentum_and_Collisions|04 ➡]]
