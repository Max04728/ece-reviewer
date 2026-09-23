---
id: GEAS-02-02
title: "Newton’s Laws, Friction and Circular Motion"
part: "03_GEAS"
area: "02_University_Physics"
topic: 2
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Kinematics_1D_and_2D]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Newton’s Laws, Friction and Circular Motion

> [!abstract] Scope
> Draw the free-body diagram, resolve along the acceleration, and get normal force, friction, tension and centripetal force right - including the cases where the normal force is not the weight.

## Core Concept

> [!tip] Intuition
> Newton's second law is a bookkeeping rule, not a formula: you list every force acting on one chosen object, add them as vectors, and that sum alone equals $m\vec{a}$. Nothing else - no 'centripetal force', no 'force of motion' - is allowed in the diagram.

**The free-body diagram is the method, and it has rules.** Isolate exactly one object. Draw only forces exerted *on* it by other things - never the forces it exerts on them, never $m\vec{a}$ itself. Then choose axes: take one axis along the acceleration. On a flat floor that is horizontal/vertical; on an incline, tilt the axes so the $x$-axis runs along the surface; on a banked curve, take $x$ horizontal toward the centre and $y$ vertical. Getting the axes right removes most of the trigonometry before you write a single equation.

**$\sum F = m\vec{a}$ is a vector equation, so it is two scalar equations.** Resolve everything into the chosen axes and write $\sum F_x = ma_x$ and $\sum F_y = ma_y$ separately. The single most common mechanical error is to assume the normal force equals the weight. It does *not*: on an incline $N = mg\cos\theta$; in an accelerating elevator $N = m(g+a)$; and if a rope pulls upward on a crate at an angle, $N = mg - T\sin\theta$. Every one of those changes the friction force, because friction is $\mu N$.

**Static and kinetic friction are different physics.** Kinetic friction opposes sliding with a fixed magnitude: $f_k = \mu_k N$. Static friction is *reactive*: it takes whatever value (up to $f_{s,max} = \mu_s N$) is needed to prevent sliding, so $f_s = F_{applied}$ for a gentle push, and it only equals $\mu_s N$ at the instant motion is about to begin. Boards test this with 'the minimum force needed to start it moving' (that is $\mu_s N$) followed by 'the acceleration once it moves under that same force' (that uses $\mu_k$, and the answer is $a = (\mu_s - \mu_k)g$, independent of mass).

**Inclines: the two-axis split and the angle of repose.** Tilting the axes puts the component $mg\sin\theta$ along the slope (pulling the block down) and $mg\cos\theta$ into the surface (setting $N$). With kinetic friction the acceleration down the slope is $a = g(\sin\theta - \mu_k\cos\theta)$, which can be negative - then the block does not slide at all, it is held by static friction. At the critical angle $\tan\theta_s = \mu_s$ (the angle of repose) the block is on the verge of sliding; that is the fastest way to *measure* a coefficient of static friction in a lab question.

**Circular motion: the net force points to the centre, and it is supplied by something real.** 'Centripetal force' is a *role*, not a new force. The equation is:
$$\sum F_{toward\ centre} = \frac{mv^2}{r}$$
Identify what plays that role: friction on a flat curve, the horizontal component of the normal force on a banked curve, tension at the bottom of a vertical circle, gravity at the top of a loop. Drawing a separate arrow labelled 'centripetal force' alongside the real forces double-counts it and makes the tension come out roughly twice too large.

**Vertical circles and the tension limits.** At the top of a vertical circle both the tension and gravity point inward, so $T + mg = \frac{mv^2}{r}$ gives $T = \frac{mv^2}{r} - mg$; the string stays taut only while $T \ge 0$, which sets a minimum speed $v_{min} = \sqrt{gr}$. At the bottom both reversed, so $T = \frac{mv^2}{r} + mg$ - the string is always under more tension at the bottom. This is why a bucket of water can be swung overhead at speed but spills if you slow down near the top. Banked curves work the same way: the designers pick the banking so that $\tan\theta = \frac{v^2}{rg}$ needs no friction at all at the design speed.

**Connected bodies: one acceleration, one tension per string.** Objects joined by an inextensible string share the magnitude of the acceleration, so you may write a separate $\sum F = ma$ for each mass and add the equations to eliminate $T$. In an Atwood machine that gives $a = \frac{(m_1-m_2)g}{m_1+m_2}$ and $T = \frac{2m_1m_2g}{m_1+m_2}$. The tension is *not* either weight: for a 4 kg and 6 kg pair, $T = 47.1\ \mathrm{N}$ while the lighter block weighs 39.2 N. Assuming $T = m_1g$ makes the acceleration come out zero, which is the giveaway that the assumption is wrong.

## Derivation

**Angle of repose.** Take $x$ up the slope, $y$ perpendicular to it, and let the block be on the verge of sliding *down*, so static friction acts up the slope at its maximum. Perpendicular: $N - mg\cos\theta = 0$, so $N = mg\cos\theta$. Along the slope the block is in equilibrium at the critical angle: $mg\sin\theta_s - f_{s,max} = 0$. Substituting $f_{s,max} = \mu_s N = \mu_s mg\cos\theta_s$ gives $mg\sin\theta_s = \mu_s mg\cos\theta_s$. The mass cancels - the critical angle is independent of the block's mass - and dividing by $\cos\theta_s$ gives $$\tan\theta_s = \mu_s, \qquad \theta_s = \arctan\mu_s.$$ A block that just starts to slide on a ramp at $21.8^\circ$ has $\mu_s = \tan 21.8^\circ = 0.400$.

**Frictionless banked curve: where the design speed comes from.** On a bank making angle $\theta$ with the horizontal, the normal force is perpendicular to the road surface, so it is tilted $\theta$ from the vertical. With no friction, the only two forces are $N$ and $mg$. Vertically there is no acceleration: $N\cos\theta = mg$. Horizontally the acceleration is centripetal, directed toward the centre of the curve: $N\sin\theta = \frac{mv^2}{r}$. Dividing the second equation by the first eliminates both $N$ and $m$: $$\tan\theta = \frac{v^2}{rg}, \qquad v = \sqrt{rg\tan\theta}.$$ Because the mass cancelled, a loaded truck and a motorcycle can take the same bank at the same speed. Above that speed the car needs *more* inward force than gravity and the normal force can supply, so it drifts outward and must be held by friction.

**Atwood machine by elimination.** Let $m_1 > m_2$, so $m_1$ descends. For $m_1$, taking downward as positive for that block: $m_1g - T = m_1a$. For $m_2$, which rises, taking upward as positive: $T - m_2g = m_2a$. The string is inextensible, so both blocks share the same $a$, and a massless, frictionless pulley makes the tension the same on both sides. Adding the two equations cancels $T$: $(m_1 - m_2)g = (m_1+m_2)a$, hence $$a = \frac{m_1-m_2}{m_1+m_2}\,g, \qquad T = \frac{2m_1m_2}{m_1+m_2}\,g.$$ The tension result follows from back-substituting $a$ into $T = m_2(g+a)$. Sanity checks: equal masses give $a = 0$ and $T = mg$; and $T$ always lies between $m_2g$ and $m_1g$, which is why neither block is in equilibrium.

**Minimum speed at the top of a vertical circle.** At the top of the circle the centre lies *below* the object, so both the tension $T$ (pulling down along the string) and gravity $mg$ point toward the centre. Newton's second law along the radial direction gives $T + mg = \frac{mv^2}{r}$, so $T = \frac{mv^2}{r} - mg$. A string can only pull, so the physical requirement is $T \ge 0$: $$\frac{mv^2}{r} \ge mg \quad\Longrightarrow\quad v \ge \sqrt{gr}.$$ For $r = 0.80\ \mathrm{m}$ this is $v_{min} = \sqrt{(9.81)(0.80)} = 2.80\ \mathrm{m/s}$. Below that speed the string goes slack before the object reaches the top and the motion becomes a projectile. Note the speed is not zero: gravity alone must still supply the full centripetal requirement.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Newton's second law | $\sum \vec{F} = m\vec{a}$ | Vector equation, so resolve into components first. F is the net force on ONE chosen object only. |
| Component form | $\sum F_x = ma_x, \qquad \sum F_y = ma_y$ | Choose one axis along the acceleration. Friction is a consequence of N, so the y-equation must be solved before the x-equation. |
| Maximum static friction | $f_{s,max} = \mu_s N$ | This is the threshold value only, used for 'about to slip'. Below it, f_s equals the applied force. |
| Kinetic friction | $f_k = \mu_k N$ | Opposes the direction of sliding. mu_k < mu_s always, so less force is needed to keep an object moving than to start it. |
| Normal force on an incline | $N = mg\cos\theta$ | theta is the incline angle, measured from horizontal. Using N = mg overstates friction by 1/cos(theta). |
| Acceleration down an incline | $a = g(\sin\theta - \mu_k\cos\theta)$ | Sliding with kinetic friction. A negative result means it does not slide at all - static friction holds it. |
| Angle of repose | $\tan\theta_s = \mu_s$ | Mass-independent. The steepest angle at which a block still stays put. |
| Centripetal acceleration | $a_c = \frac{v^2}{r} = \omega^2 r$ | Directed toward the centre, so it is perpendicular to the velocity. The speed is constant, the velocity is not. |
| Centripetal force | $F_c = \frac{mv^2}{r}$ | Not a new force: it is the inward component of whatever real forces exist (friction, tension, N). |
| Flat curve maximum speed | $v_{max} = \sqrt{\mu_s g r}$ | Friction alone supplies the centripetal force. Independent of the car's mass. |
| Banked curve (no friction) | $\tan\theta = \frac{v^2}{rg}$ | Design speed only. At any other speed friction is required to hold the car on the bank. |
| Atwood machine | $a = \frac{(m_1-m_2)g}{m_1+m_2}, \quad T = \frac{2m_1m_2g}{m_1+m_2}$ | Massless string, frictionless pulley, m1 > m2. T lies between the two weights, never equal to either. |
| Apparent weight, elevator accelerating up | $N = m(g+a)$ | a > 0 for upward acceleration, so the reading exceeds the true weight. Free fall (a = -g) gives N = 0. |
| Apparent weight, elevator accelerating down | $N = m(g-a)$ | a > 0 for downward acceleration, so the reading is less than the true weight. Constant velocity means N = mg. |
| Tension at the top of a vertical circle | $T = \frac{mv^2}{r} - mg$ | String goes slack when this is negative. The minimum speed for a taut string is sqrt(gr). |
| Tension at the bottom of a vertical circle | $T = \frac{mv^2}{r} + mg$ | Always larger than at the top for the same speed - the string is most likely to break at the bottom. |
| Objects on a frictionless table with a hanging mass | $a = \frac{m_B g}{m_A+m_B}$ | A horizontal on the table, B hanging. T = m_A a is the quickest route to the tension. |

## Worked Problems

### P1. A $5.0\ \mathrm{kg}$ block slides down a $30^\circ$ incline with $\mu_k = 0.25$. Find its acceleration. Use $g = 9.81\ \mathrm{m/s^2}$.

**Given:** m = 5.0 kg; theta = 30 deg; mu_k = 0.25; g = 9.81 m/s^2

**Solution:**

1. Tilt the axes: x along the slope downward, y perpendicular to the slope.
2. y-equation (no acceleration perpendicular to the surface): $N = mg\cos\theta = (5.0)(9.81)\cos 30^\circ = 49.05(0.8660) = 42.48\ \mathrm{N}$
3. Kinetic friction: $f_k = \mu_k N = (0.25)(42.48) = 10.62\ \mathrm{N}$, acting up the slope.
4. x-equation: $mg\sin\theta - f_k = ma$, with $mg\sin\theta = 49.05(0.5000) = 24.53\ \mathrm{N}$
5. $24.53 - 10.62 = 13.91\ \mathrm{N}$, so $a = \frac{13.91}{5.0} = 2.78\ \mathrm{m/s^2}$ down the incline.
6. Check by formula: $a = g(\sin\theta - \mu_k\cos\theta) = 9.81(0.5000 - 0.2165) = 9.81(0.2835) = 2.78\ \mathrm{m/s^2}$.

> [!success]- Answer
> **$a = 2.78\ \mathrm{m/s^2}$ down the incline.**

> [!warning] Trap
> Using $N = mg = 49.05\ \mathrm{N}$ instead of $mg\cos\theta$. That gives $f_k = 12.26\ \mathrm{N}$ and $a = 2.45\ \mathrm{m/s^2}$, a 12% error; at $60^\circ$ the friction force would be overstated by $1/\cos 60^\circ = 2$, a factor of two.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `9.81×(sin(30)−0.25×cos(30))` → $a$ = **2.78** m/s², the whole formula in one line.
> 2. Force path: `5×9.81×cos(30)` → $N$ = **42.48** N; `0.25×Ans` → $f_k$ = **10.62** N; `(5×9.81×sin(30)−Ans)÷5` → **2.78** m/s².

### P2. An Atwood machine has $m_1 = 6.0\ \mathrm{kg}$ and $m_2 = 4.0\ \mathrm{kg}$ on a frictionless, massless pulley. Find the acceleration of the system and the tension in the string.

**Given:** m_1 = 6.0 kg; m_2 = 4.0 kg; g = 9.81 m/s^2

**Solution:**

1. For the heavier mass descending: $m_1g - T = m_1a$.
2. For the lighter mass rising: $T - m_2g = m_2a$.
3. Add the equations to cancel $T$: $(m_1-m_2)g = (m_1+m_2)a$
4. $a = \frac{(6.0-4.0)(9.81)}{6.0+4.0} = \frac{19.62}{10.0} = 1.96\ \mathrm{m/s^2}$
5. Tension: $T = m_2(g+a) = 4.0(9.81+1.96) = 4.0(11.77) = 47.1\ \mathrm{N}$
6. Check the other block: $6.0(9.81) - 47.1 = 58.86 - 47.1 = 11.76\ \mathrm{N} = (6.0)(1.96)$, consistent.

> [!success]- Answer
> **$a = 1.96\ \mathrm{m/s^2}$; $T = 47.1\ \mathrm{N}$ (between the two weights of 39.2 N and 58.9 N).**

> [!warning] Trap
> Setting $T = m_1g = 58.9\ \mathrm{N}$, which makes the acceleration of the 6 kg block zero. If the tension equalled either weight there would be no net force and nothing would move.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` `1` (2 unknowns, X = $a$ and Y = $T$): enter `6 , 1 , 58.86` then `−4 , 1 , 39.24`.
> 2. `=` → $a$ = **1.962** m/s² and $T$ = **47.09** N; check `4×(9.81+1.962)` = **47.09** N and `6×(9.81−1.962)` = **47.09** N.
>
> The two rows are $6a+T=6g$ and $T-4a=4g$. A tension equal to either weight would force $a$ = 0.

### P3. A $70\ \mathrm{kg}$ person stands on a scale in an elevator. Find the scale reading when the elevator accelerates (a) upward at $2.0\ \mathrm{m/s^2}$ and (b) downward at $2.0\ \mathrm{m/s^2}$.

**Given:** m = 70 kg; a = 2.0 m/s^2 up, then down; g = 9.81 m/s^2

**Solution:**

1. The scale reads the normal force $N$ it exerts; the free-body diagram has $N$ up and $mg$ down.
2. (a) Accelerating upward, take up positive: $N - mg = ma$, so $N = m(g+a) = 70(9.81+2.0) = 70(11.81) = 826.7\ \mathrm{N}$
3. (b) Accelerating downward, $a = -2.0\ \mathrm{m/s^2}$: $N = m(g+a) = 70(9.81-2.0) = 70(7.81) = 546.7\ \mathrm{N}$
4. Report as apparent mass (what a bathroom scale is calibrated to show): $826.7/9.81 = 84.3\ \mathrm{kg}$ up, and $546.7/9.81 = 55.7\ \mathrm{kg}$ down.

> [!success]- Answer
> **(a) $827\ \mathrm{N}$ (reads $84.3\ \mathrm{kg}$); (b) $547\ \mathrm{N}$ (reads $55.7\ \mathrm{kg}$).**

> [!warning] Trap
> Using $N = m(g-a)$ for the upward-accelerating case. That swaps the answers and reports 547 N while the elevator speeds up - the passenger should feel heavier, not lighter.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `70×(9.81+2.0)` → **826.7** N, then `÷9.81` → **84.3** kg apparent mass while rising.
> 2. `70×(9.81−2.0)` → **546.7** N, then `÷9.81` → **55.7** kg while descending.
>
> Take up as positive with $a$ = +2.0 then −2.0 in $N = m(g+a)$; the sign flip swaps 827 N and 547 N.

### P4. A car rounds a flat (unbanked) curve of radius $120\ \mathrm{m}$ with $\mu_s = 0.60$ between tyres and road. Find the maximum speed at which it can take the curve without skidding.

**Given:** r = 120 m; mu_s = 0.60; g = 9.81 m/s^2; flat curve

**Solution:**

1. On a flat curve the only horizontal force is static friction, and it must supply the entire centripetal requirement.
2. $f_s = \frac{mv^2}{r}$, and the maximum available is $f_{s,max} = \mu_s N = \mu_s mg$.
3. Set them equal: $\mu_s mg = \frac{mv^2}{r}$ - the mass cancels.
4. $v_{max} = \sqrt{\mu_s g r} = \sqrt{(0.60)(9.81)(120)} = \sqrt{706.3} = 26.6\ \mathrm{m/s}$
5. Convert: $26.6 \times 3.6 = 95.7\ \mathrm{km/h}$.

> [!success]- Answer
> **$v_{max} = 26.6\ \mathrm{m/s} = 95.7\ \mathrm{km/h}$.**

> [!warning] Trap
> Remembering the $m$ and trying to cancel it after substituting numbers. Because $v_{max}$ is mass-independent, a loaded van and a motorcycle skid at the same speed - a result boards deliberately test with a 'does the mass matter?' follow-up.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(0.60×9.81×120)` → $v_{max}$ = **26.6** m/s — the car's mass cancels before you start.
> 2. `CONVT` speed m/s → km/h gives **95.7** km/h (`×3.6` is the same conversion).

### P5. A curve of radius $200\ \mathrm{m}$ is banked at $15^\circ$ and is designed so that no friction is needed. Find the design speed.

**Given:** r = 200 m; theta = 15 deg; friction neglected; g = 9.81 m/s^2

**Solution:**

1. The normal force is perpendicular to the road surface, so it is tilted $15^\circ$ from the vertical.
2. Vertical equilibrium: $N\cos\theta = mg$.
3. Horizontal (centripetal): $N\sin\theta = \frac{mv^2}{r}$.
4. Divide: $\tan\theta = \frac{v^2}{rg}$, so $v = \sqrt{rg\tan\theta}$
5. $v = \sqrt{(200)(9.81)\tan 15^\circ} = \sqrt{(1962)(0.2679)} = \sqrt{525.7} = 22.9\ \mathrm{m/s}$
6. Convert: $22.9 \times 3.6 = 82.5\ \mathrm{km/h}$.

> [!success]- Answer
> **$v = 22.9\ \mathrm{m/s} = 82.5\ \mathrm{km/h}$ (the frictionless design speed).**

> [!warning] Trap
> Solving for the wrong angle convention: if the bank angle is measured from the vertical, $\tan\theta$ becomes $\cot\theta$ and the answer drops to $\sqrt{1962/0.2679} = 85.6\ \mathrm{m/s}$ - a 3.7x error. Read how the problem states the bank.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(200×9.81×tan(15))` → $v$ = **22.9** m/s; `CONVT` speed m/s → km/h → **82.5** km/h.
> 2. The vertical-angle form `√(200×9.81÷tan(15))` = **85.6** m/s is the 3.7x trap.

### P6. A $0.50\ \mathrm{kg}$ ball on a $0.80\ \mathrm{m}$ string moves in a vertical circle. Find the tension when the ball is at the top moving at $5.0\ \mathrm{m/s}$, and the minimum speed the ball can have at the top with the string still taut.

**Given:** m = 0.50 kg; r = 0.80 m; v_top = 5.0 m/s; g = 9.81 m/s^2

**Solution:**

1. At the top both tension and gravity point toward the centre: $T + mg = \frac{mv^2}{r}$.
2. $\frac{mv^2}{r} = \frac{(0.50)(5.0)^2}{0.80} = \frac{12.5}{0.80} = 15.63\ \mathrm{N}$
3. $mg = (0.50)(9.81) = 4.905\ \mathrm{N}$
4. $T = 15.63 - 4.905 = 10.72\ \mathrm{N}$
5. Minimum speed: set $T = 0$, so $mg = \frac{mv^2}{r}$ and $v_{min} = \sqrt{gr} = \sqrt{(9.81)(0.80)} = \sqrt{7.848} = 2.80\ \mathrm{m/s}$.

> [!success]- Answer
> **$T = 10.7\ \mathrm{N}$ at the top; $v_{min} = 2.80\ \mathrm{m/s}$.**

> [!warning] Trap
> Writing $T = \frac{mv^2}{r} + mg$ at the top (the bottom-of-circle form). That gives 20.5 N, about double, and would also predict the string is safest at the top. At the bottom the same 5.0 m/s gives $T = 15.63 + 4.905 = 20.53\ \mathrm{N}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.50×5²÷0.80−0.50×9.81` → $T$ = **10.72** N at the top.
> 2. `√(9.81×0.80)` → $v_{min}$ = **2.80** m/s; the bottom-of-circle `+` sign gives **20.5** N at the same speed.

### P7. A $10\ \mathrm{kg}$ block rests on a horizontal floor with $\mu_s = 0.40$ and $\mu_k = 0.30$. Find the minimum horizontal force needed to start it moving, and its acceleration if that same force is maintained once it is sliding.

**Given:** m = 10 kg; mu_s = 0.40; mu_k = 0.30; horizontal push

**Solution:**

1. Normal force on a horizontal floor with a horizontal push: $N = mg = (10)(9.81) = 98.1\ \mathrm{N}$.
2. Threshold force to start motion: $F = f_{s,max} = \mu_s N = (0.40)(98.1) = 39.24\ \mathrm{N}$
3. Once sliding, friction drops to kinetic: $f_k = \mu_k N = (0.30)(98.1) = 29.43\ \mathrm{N}$
4. Net force: $39.24 - 29.43 = 9.81\ \mathrm{N}$
5. $a = \frac{9.81}{10} = 0.981\ \mathrm{m/s^2}$

> [!success]- Answer
> **$F_{min} = 39.2\ \mathrm{N}$ to start it; $a = 0.981\ \mathrm{m/s^2}$ once moving.**

> [!warning] Trap
> Using $\mu_s$ for the sliding phase, which gives zero acceleration - as if the block kept needing exactly the starting force. The shortcut $a = (\mu_s-\mu_k)g = (0.10)(9.81) = 0.981\ \mathrm{m/s^2}$ shows the answer is independent of the mass.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10×9.81×0.40` → $F_{min}$ = **39.24** N to start it; `10×9.81×0.30` → $f_k$ = **29.43** N once sliding.
> 2. Net `39.24−29.43` → **9.81** N, so `9.81÷10` → $a$ = **0.981** m/s² — also `(0.40−0.30)×9.81` = **0.981**, mass-free.

### P8. A $3.0\ \mathrm{kg}$ block sits on a frictionless horizontal table, connected by a string over a frictionless pulley at the table edge to a $2.0\ \mathrm{kg}$ mass hanging vertically. Find the acceleration and the string tension.

**Given:** m_A = 3.0 kg (on table); m_B = 2.0 kg (hanging); frictionless table and pulley

**Solution:**

1. Block A on the table: the only horizontal force is the tension, so $T = m_A a = 3.0a$.
2. Hanging block B: $m_Bg - T = m_Ba$.
3. Substitute $T$: $(2.0)(9.81) - 3.0a = 2.0a$
4. $19.62 = 5.0a$, so $a = \frac{19.62}{5.0} = 3.92\ \mathrm{m/s^2}$
5. $T = m_Aa = (3.0)(3.92) = 11.8\ \mathrm{N}$
6. Check B: $19.62 - 11.8 = 7.85\ \mathrm{N} = (2.0)(3.92)$, consistent.

> [!success]- Answer
> **$a = 3.92\ \mathrm{m/s^2}$; $T = 11.8\ \mathrm{N}$.**

> [!warning] Trap
> Assuming the hanging weight accelerates the system alone, $a = g = 9.81\ \mathrm{m/s^2}$. The tension is an internal force that robs the hanging block of acceleration; the correct value is $\frac{m_Bg}{m_A+m_B}$, only 40% of $g$ here.

### P9. A $1200\ \mathrm{kg}$ car rounds a flat curve of radius $80\ \mathrm{m}$ at $20\ \mathrm{m/s}$. Find the minimum coefficient of static friction required.

**Given:** m = 1200 kg; r = 80 m; v = 20 m/s; flat curve

**Solution:**

1. The centripetal force is supplied entirely by friction: $f_s = \frac{mv^2}{r}$.
2. $f_s = \frac{(1200)(20)^2}{80} = \frac{(1200)(400)}{80} = 6000\ \mathrm{N}$
3. Normal force: $N = mg = (1200)(9.81) = 11772\ \mathrm{N}$
4. $\mu_s = \frac{f_s}{N} = \frac{6000}{11772} = 0.510$

> [!success]- Answer
> **$\mu_s \ge 0.510$ (dry asphalt is typically 0.7 to 0.9, so the curve is takeable).**

> [!warning] Trap
> Including $g$ in $\frac{mv^2}{r}$ as if it were a weight, or dividing by $v^2$ instead of computing $N$ correctly. Both mistakes shift the answer by more than 50%; note the mass cancels, so a heavier car does not need grippier tyres.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20²÷(80×9.81)` → $\mu_s$ = **0.510**; the 1200 kg never needs to be typed.
> 2. Full route: `1200×20²÷80` → $f_s$ = **6000** N; `1200×9.81` → $N$ = **11772** N; `6000÷11772` → **0.510**.

### P10. A $20\ \mathrm{kg}$ crate on a horizontal floor is pulled by a rope that makes $30^\circ$ with the horizontal with tension $100\ \mathrm{N}$. The coefficient of kinetic friction is $0.20$. Find the normal force and the crate's acceleration.

**Given:** m = 20 kg; T = 100 N at 30 deg above horizontal; mu_k = 0.20; g = 9.81 m/s^2

**Solution:**

1. The rope has an upward component that lifts the crate, reducing the normal force.
2. y-equation: $N + T\sin\theta - mg = 0$, so $N = mg - T\sin\theta = (20)(9.81) - (100)(0.5000) = 196.2 - 50.0 = 146.2\ \mathrm{N}$
3. Kinetic friction: $f_k = \mu_k N = (0.20)(146.2) = 29.24\ \mathrm{N}$
4. x-equation: $T\cos\theta - f_k = ma$, with $T\cos\theta = (100)(0.8660) = 86.60\ \mathrm{N}$
5. $86.60 - 29.24 = 57.36\ \mathrm{N}$, so $a = \frac{57.36}{20} = 2.87\ \mathrm{m/s^2}$

> [!success]- Answer
> **$N = 146\ \mathrm{N}$; $a = 2.87\ \mathrm{m/s^2}$.**

> [!warning] Trap
> Setting $N = mg = 196.2\ \mathrm{N}$. That inflates friction to 39.2 N and drops the acceleration to $2.37\ \mathrm{m/s^2}$; worse, if the rope angle is steep enough that $T\sin\theta > mg$ the crate leaves the floor and friction vanishes entirely.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20×9.81−100×sin(30)` → $N$ = **146.2** N — the rope's upward component lifts the crate.
> 2. `(100×cos(30)−0.20×Ans)÷20` → $a$ = **2.87** m/s², with `Ans` still holding the normal force.

## Traps & Exam Notes

- **Assuming $N = mg$.** It is true only for a horizontal surface with no vertical applied force. On a $60^\circ$ incline $N = mg\cos 60^\circ = 0.50\,mg$; on a crate pulled upward at an angle $N = mg - T\sin\theta$; in an accelerating elevator $N = m(g+a)$. Since friction is $\mu N$, a wrong normal force propagates straight into the acceleration.
- **Drawing 'centripetal force' as an extra arrow.** $\frac{mv^2}{r}$ is the *required* net inward force, not a force to add. Drawing it alongside tension gives $T + \frac{mv^2}{r} = \frac{mv^2}{r}$, a contradiction, or with careless algebra a tension roughly twice too large. Identify which real force plays the inward role.
- **Treating friction as always $\mu N$.** Static friction is reactive: pushing a 10 kg block with 5 N on a floor where $\mu_s N = 39$ N produces $f_s = 5\ \mathrm{N}$ and zero acceleration. Reporting $f_s = \mu_s N$ there predicts a net force and motion that does not happen.
- **Sign error in elevator apparent weight.** For an elevator accelerating upward the reading is $m(g+a)$, not $m(g-a)$. A 70 kg passenger at $2.0\ \mathrm{m/s^2}$ upward reads 827 N; the sign flip gives 547 N and tells the passenger they are lighter while speeding up.
- **Using $\mu_s$ for the sliding phase (or $\mu_k$ for the threshold).** Starting a block needs $\mu_s N$; keeping it moving needs only $\mu_k N$. Swapping them gives $a = 0$ for the push-that-keeps-moving problem, because the assumed friction exactly equals the applied force.
- **Assuming Atwood tension equals a weight.** For $m_1 = 6.0$ and $m_2 = 4.0\ \mathrm{kg}$, $T = 47.1\ \mathrm{N}$ while the weights are 58.9 N and 39.2 N. Setting $T = m_1g$ forces $a = 0$ and contradicts the observed motion.
- **Minimum speed at the top of a vertical circle set to zero.** Gravity must still supply $\frac{mv^2}{r}$ there, so $v_{min} = \sqrt{gr}$, not 0. Setting it to zero predicts the string stays taut at any speed and understates the required speed at the top by a full factor.
- **Inclined-plane acceleration without the friction term's cosine.** Writing $a = g(\sin\theta - \mu_k)$ instead of $g(\sin\theta - \mu_k\cos\theta)$. At $30^\circ$ with $\mu_k = 0.25$ that gives $2.66\ \mathrm{m/s^2}$ instead of $2.78\ \mathrm{m/s^2}$, and the error grows quickly with $\theta$.

## See Also

- [[01_Kinematics_1D_and_2D]]
- [[03_Work,_Energy_and_Conservation]]
- [[04_Momentum_and_Collisions]]
- [[05_Rotational_Kinematics_and_Torque]]

---

[[01_Kinematics_1D_and_2D|⬅ 01]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Work,_Energy_and_Conservation|03 ➡]]
