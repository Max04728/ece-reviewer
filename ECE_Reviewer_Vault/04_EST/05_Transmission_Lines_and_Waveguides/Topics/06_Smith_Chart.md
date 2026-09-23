---
id: EST-05-06
title: "Smith Chart"
part: "04_EST"
area: "05_Transmission_Lines_and_Waveguides"
topic: 6
tier: 1
depth: full
problem_count: 9
prereqs: ["[[04_Reflection_Coefficient_and_VSWR]]", "[[05_Input_Impedance_and_Quarter-Wave_Transformer]]"]
tags: ["ece", "est", "transmission_lines_and_waveguides"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Smith Chart

> [!abstract] Scope
> Read a normalized impedance on the Smith chart, convert it to a reflection coefficient, VSWR and admittance, and rotate along the line to find the impedance at any distance from the load.

## Core Concept

> [!tip] Intuition
> The Smith chart is not a separate theory — it is the reflection-coefficient plane with an impedance grid drawn over it. Every passive impedance lands inside the unit circle, and moving down a lossless line is simply walking around the centre.

**What the chart actually is.** Normalize everything first: $z = Z/Z_0$ and $y = Y/Y_0 = 1/z$. Then plot the reflection coefficient $$\Gamma = \frac{z - 1}{z + 1}, \qquad z = \frac{1 + \Gamma}{1 - \Gamma}.$$ This is a one-to-one map from the right half of the impedance plane onto the unit disc of the $\Gamma$ plane. The centre is $\Gamma = 0$, the matched condition $z = 1$. The real axis is the locus of purely resistive impedances: the left edge is $z = 0$ (short circuit, $\Gamma = -1$), the centre is $z = 1$, and the right edge is $z = \infty$ (open circuit, $\Gamma = +1$). The upper half is inductive ($+jX$) and the lower half is capacitive ($-jX$). Normalizing is not optional: reading a $50\ \Omega$ line's chart with an unnormalized $300\ \Omega$ load puts the point outside the chart entirely.

**The two families of curves, and why they are circles.** Constant-resistance loci appear as circles with centres on the horizontal axis at $u = r/(1+r)$ and radii $1/(1+r)$ — every one of them passes through the point $\Gamma = +1$. Constant-reactance loci appear as arcs with centres at $u = 1,\ v = 1/x$ and radius $1/|x|$; the $x = 0$ line is the horizontal axis itself. Because the two families are orthogonal, any pair $(r, x)$ identifies exactly one point, and any point reads back to exactly one impedance. The price of the mapping is that the whole infinite right half-plane is compressed into a finite disc, so the outer edge near $\Gamma = +1$ is extremely crowded and low-impedance readings are hard to take accurately.

**The VSWR circle is the single most useful construction.** On a lossless line $|\Gamma|$ is the same at every plane, so the locus of all impedances a given load presents along the line is a circle centred on the origin with radius $|\Gamma|$. Its two intersections with the real axis read the standing-wave extremes directly: the right-hand crossing is $r = \mathrm{VSWR}$ and the left-hand crossing is $r = 1/\mathrm{VSWR}$. That is why $\mathrm{VSWR}$ can be read off a chart with no arithmetic at all, and why $\mathrm{VSWR}$ tells you the *radius* of the circle but nothing about *where* on it the load sits.

**Motion along the line is rotation.** Since $\Gamma(l) = \Gamma_L e^{-2j\beta l}$, moving a distance $l$ toward the generator rotates the point clockwise about the centre by $2\beta l = 4\pi l/\lambda$ radians. The chart's outer scales are calibrated accordingly: one complete revolution is $\lambda/2$, so $\lambda/4$ is $180^\circ$ and the printed wavelengths-toward-generator scale runs $0$ to $0.5$. Moving toward the load goes counter-clockwise. Because rotation preserves $|\Gamma|$, an impedance and its value a quarter-wavelength away always land on the same VSWR circle at opposite ends of a diameter — which is exactly the $z \to 1/z$ inversion, and therefore $Z_{in}(\lambda/4) = Z_0^2/Z_L$.

**Admittance for free, and where the chart lies to you.** Because $y = 1/z$ corresponds to $\Gamma \to -\Gamma$, the normalized admittance is read at the point diametrically opposite the impedance — a $180^\circ$ rotation, i.e. $\lambda/4$ on the scale. That trick is the whole basis of shunt stub matching: the constant-$g$ circles are just the constant-$r$ circles rotated by half a turn. The chart is exact for a lossless line with a single load, but it is a *graphical* tool: readings carry one or two percent of error, the chart says nothing about bandwidth, and on a lossy line the point spirals inward as $e^{-2\alpha l}$ instead of travelling on a circle. Several discontinuities break the single-circle picture altogether.

## Derivation

**Why $z = (1+\Gamma)/(1-\Gamma)$.** Start from the definition at the load, $\Gamma = (Z - Z_0)/(Z + Z_0)$, and divide numerator and denominator by $Z_0$: $$\Gamma = \frac{z - 1}{z + 1}.$$ Solve for $z$: $\Gamma(z+1) = z - 1 \Rightarrow \Gamma z + \Gamma = z - 1 \Rightarrow z(1 - \Gamma) = 1 + \Gamma$, hence $$z = \frac{1 + \Gamma}{1 - \Gamma}.$$ The two forms are the forward and reverse maps of the chart. Note that $|\Gamma| = 1$ corresponds to $z$ purely imaginary (reactive), and $|\Gamma| > 1$ would require $\mathrm{Re}\,z < 0$ — an active load, which lies outside the printed chart.

**The constant-resistance circles.** Write $\Gamma = u + jv$ and $z = r + jx$, then substitute into $z = (1+\Gamma)/(1-\Gamma)$ and rationalise by multiplying by $(1-u+jv)$: $$r = \frac{1 - u^2 - v^2}{(1-u)^2 + v^2}, \qquad x = \frac{2v}{(1-u)^2 + v^2}.$$ Setting $r$ to a constant and clearing the denominator gives $1 - u^2 - v^2 = r\left[(1-u)^2 + v^2\right]$, which rearranges to $$\left(u - \frac{r}{1+r}\right)^2 + v^2 = \left(\frac{1}{1+r}\right)^2.$$ So each constant-$r$ locus is a circle centred on the real axis at $u = r/(1+r)$ with radius $1/(1+r)$. At $r = 0$ the circle degenerates to the point $u = -1$ (the short), and as $r \to \infty$ it shrinks to the point $u = +1$ (the open); all of them pass through $\Gamma = +1$, which is why the right edge of the chart is the crowded one.

**The constant-reactance arcs.** The same substitution applied to $x$ gives $2v = x\left[(1-u)^2 + v^2\right]$, that is $u^2 - 2u + 1 + v^2 - 2v/x = 0$, which completes the square as $$(u - 1)^2 + \left(v - \frac{1}{x}\right)^2 = \left(\frac{1}{x}\right)^2.$$ Each constant-$x$ locus is a circle of radius $1/|x|$ centred at $(1,\ 1/x)$; only the arc inside the unit disc is drawn. For $x = 0$ the radius is infinite, which is the horizontal axis; for $|x| \to \infty$ the arc degenerates to the point $u = 1$, the open circuit. Because the $r$-families are centred on the $u$-axis and the $x$-families on the line $u = 1$, the two grids cross at right angles everywhere — the chart is conformal.

**Why one revolution is $\lambda/2$, and how to read the scales.** Substituting $\Gamma(l) = \Gamma_L e^{-2j\beta l}$ with $\beta = 2\pi/\lambda$ gives a rotation angle of $2\beta l = 4\pi l/\lambda$. A full turn ($2\pi$) therefore needs $l = \lambda/2$; a quarter turn ($\pi/2$, i.e. $90^\circ$) needs $l = \lambda/8$; and $l = \lambda/4$ gives $180^\circ$, which maps $z \to 1/z$ and confirms $Z_{in} = Z_0^2/Z_L$. The printed scale is nothing more than $l/\lambda$ measured in the clockwise direction, calibrated so that a complete lap reads $0.5$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Normalized impedance | $z = \frac{Z}{Z_0} = r + jx$ | Always normalize before plotting. An unnormalized load falls outside the chart. |
| Reflection coefficient from impedance | $\Gamma = \frac{z - 1}{z + 1}$ | Passive loads give \|Gamma\| <= 1, i.e. inside the unit circle. |
| Impedance from reflection coefficient | $z = \frac{1 + \Gamma}{1 - \Gamma}$ | The reverse map. Gamma = -1 is a short, +1 an open, 0 a match. |
| VSWR circle radius | $\lvert \Gamma \rvert = \frac{\mathrm{VSWR} - 1}{\mathrm{VSWR} + 1}$ | The circle is centred on the origin; rotation along a lossless line stays on it. |
| Real-axis readings | $r_{right} = \mathrm{VSWR}, \qquad r_{left} = \frac{1}{\mathrm{VSWR}}$ | The two crossings of the VSWR circle with the horizontal axis. |
| Constant-resistance circles | $\left(u - \frac{r}{1+r}\right)^2 + v^2 = \left(\frac{1}{1+r}\right)^2$ | Centre r/(1+r) on the real axis, radius 1/(1+r). All pass through Gamma = +1. |
| Constant-reactance arcs | $(u - 1)^2 + \left(v - \frac{1}{x}\right)^2 = \left(\frac{1}{x}\right)^2$ | Centre (1, 1/x), radius 1/\|x\|. x = 0 is the horizontal axis. |
| Rotation along the line | $\Delta\phi = 4\pi \frac{l}{\lambda} \ \mathrm{radians}$ | Clockwise toward the generator; lambda/2 per full turn, lambda/8 per 90 degrees. |
| Quarter-wave inversion | $z\left(\frac{\lambda}{4}\right) = \frac{1}{z_L}$ | Diametrically opposite point. Gives Z_in = Z_0^2 / Z_L. |
| Admittance by rotation | $y = \frac{1}{z}, \qquad \Gamma_y = -\Gamma_z$ | Read y 180 degrees from z, i.e. lambda/4 on the wavelength scale. |
| Constant-conductance circle | $\left(u + \frac{g}{1+g}\right)^2 + v^2 = \left(\frac{1}{1+g}\right)^2$ | The r-circles rotated by 180 degrees. The g = 1 circle passes through the origin. |
| Distances to the extremes | $\frac{l_{max}}{\lambda} = \frac{\theta_\Gamma}{4\pi}, \qquad \frac{l_{min}}{\lambda} = \frac{\theta_\Gamma}{4\pi} + 0.25$ | theta_Gamma is the angle of Gamma_L in radians; take the value that gives a distance below 0.5. |

## Interactive Widget

**Smith Chart Interactive**

![[Smith_Chart_Interactive.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A $50\ \Omega$ line is terminated in $Z_L = 50 + j50\ \Omega$. Locate the point on the Smith chart and read off $\Gamma$, $|\Gamma|$ and the VSWR.

**Given:** $Z_0 = 50\ \Omega$; $Z_L = 50 + j50\ \Omega$; lossless line

**Solution:**

1. Normalize: $z_L = \dfrac{50 + j50}{50} = 1 + j1$ — the intersection of the $r = 1$ circle with the $x = +1$ arc, in the inductive half
2. $\Gamma = \dfrac{z - 1}{z + 1} = \dfrac{(1+j1) - 1}{(1+j1) + 1} = \dfrac{j1}{2 + j1}$
3. Rationalise: $\dfrac{j(2 - j)}{(2+j)(2-j)} = \dfrac{1 + j2}{5} = 0.2 + j0.4$
4. $|\Gamma| = \sqrt{0.2^2 + 0.4^2} = \sqrt{0.20} = 0.4472$, at an angle of $\tan^{-1}(0.4/0.2) = 63.43^\circ$
5. $\mathrm{VSWR} = \dfrac{1 + 0.4472}{1 - 0.4472} = \dfrac{1.4472}{0.5528} = 2.618$

> [!success]- Answer
> **$\Gamma = 0.2 + j0.4 = 0.447\angle 63.4^\circ$; $\mathrm{VSWR} = 2.62$.**

> [!warning] Trap
> Plotting $50 + j50$ without normalizing and landing off the chart. Every chart reading is in normalized units, and the normalized value is $1 + j1$, not $50 + j50$.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `MODE` `2`: `i1÷(2+i1)` → **0.2000 + i0.4000** — normalise first, $z_L = 1 + j1$.
> 2. `Apps` `▶r∠θ` on that result → **0.4472∠63.43°** (Degree mode): magnitude and angle in one move.
> 3. `(1+0.4472)÷(1−0.4472)` → **2.618**.
>
> `i` is the `MODE` `2` imaginary unit (the note writes $j$).

### P2. For the load $z_L = 1 + j1$ of the previous problem, use the VSWR circle's real-axis crossings to read the VSWR and to check the result algebraically.

**Given:** $z_L = 1 + j1$; $|\Gamma| = 0.4472$

**Solution:**

1. Draw the circle of radius $|\Gamma| = 0.4472$ centred on the origin
2. The circle crosses the horizontal axis at two points; the right-hand one reads $r = \mathrm{VSWR}$ directly
3. Right crossing: $r = (1 + 0.4472)/(1 - 0.4472) = 2.618$
4. Left crossing: $r = 1/2.618 = 0.382$, which is the normalized resistance at a voltage minimum
5. Both readings are $180^\circ$ apart, i.e. $\lambda/4$, and they are the reciprocal pair $2.618$ and $1/2.618$

> [!success]- Answer
> **$\mathrm{VSWR} = 2.62$ read straight off the real-axis crossing; the conjugate crossing is $0.382$.**

> [!warning] Trap
> Reading the left-hand crossing as the VSWR. The left crossing is $1/\mathrm{VSWR}$ — using it inverts the answer to $0.38$, which is below $1$ and therefore impossible for a VSWR.

### P3. Using the chart, find the input impedance a quarter-wavelength from $z_L = 1 + j1$ on the $50\ \Omega$ line.

**Given:** $z_L = 1 + j1$; $Z_0 = 50\ \Omega$; $l = \lambda/4$

**Solution:**

1. $\lambda/4$ is $180^\circ$ on the wavelength scale, so rotate the point $180^\circ$ about the centre
2. The rotated point is the diametrically opposite one: $z = 1/z_L = 1/(1+j1)$
3. $\dfrac{1}{1+j1} = \dfrac{1 - j1}{2} = 0.5 - j0.5$
4. $Z = 50(0.5 - j0.5) = 25 - j25\ \Omega$
5. Check with the quarter-wave inverter: $Z = Z_0^2/Z_L = 2500/(50 + j50) = 25(1 - j) = 25 - j25\ \Omega$

> [!success]- Answer
> **$Z_{in} = 25 - j25\ \Omega$, i.e. $z = 0.5 - j0.5$ — the point diametrically opposite $z_L$ on the same VSWR circle.**

> [!warning] Trap
> Rotating $90^\circ$ because $\lambda/4$ "feels like a quarter turn". A quarter-wavelength is $180^\circ$ of $\Gamma$ rotation; a quarter turn of the chart is $\lambda/8$.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `MODE` `2`: `1÷(1+i1)` → **0.5000 − i0.5000** — a quarter wave is a 180° rotation, i.e. the inversion $z \to 1/z$.
> 2. `Ans×50` → **25 − i25** Ω; the inverter agrees: `50²÷(50+i50)` → **25 − i25** Ω.

### P4. How far must you move for the impedance to repeat itself, and what is the impedance at that distance? Start from $z_L = 1 + j1$.

**Given:** $z_L = 1 + j1$; lossless line

**Solution:**

1. The chart repeats after one full $360^\circ$ revolution
2. One revolution corresponds to $l = \lambda/2$
3. At $l = \lambda/2$, $2\beta l = 2(2\pi/\lambda)(\lambda/2) = 2\pi$, so $\Gamma$ returns to its original value
4. Therefore $Z(\lambda/2) = Z_L = 50 + j50\ \Omega$

> [!success]- Answer
> **The pattern repeats every $\lambda/2$, where $Z = 50 + j50\ \Omega$ — the same impedance as the load.**

> [!warning] Trap
> Answering $\lambda$. The wavelength scale on the chart runs only to $0.5$ precisely because a half-wavelength is $360^\circ$ of reflection-coefficient rotation; a full wavelength is two complete laps.

### P5. Read the normalized admittance of $z_L = 1 + j1$ on the $50\ \Omega$ line, and state the physical $Y_L$.

**Given:** $z_L = 1 + j1$; $Z_0 = 50\ \Omega$

**Solution:**

1. The admittance point is $180^\circ$ from the impedance point, i.e. $\lambda/4$ on the scale
2. $y = 1/z = 1/(1 + j1) = (1 - j1)/2 = 0.5 - j0.5$
3. Same answer as the $\lambda/4$ impedance, because the $180^\circ$ rotation is exactly the inversion $z \to 1/z$
4. $Y_L = y/Z_0 = (0.5 - j0.5)/50 = 0.01 - j0.01\ \mathrm{S} = 10 - j10\ \mathrm{mS}$

> [!success]- Answer
> **$y = 0.5 - j0.5$; $Y_L = 10 - j10\ \mathrm{mS}$.**

> [!warning] Trap
> Rotating $90^\circ$ to read the admittance. The impedance-to-admittance move is a half turn, not a quarter turn; the quarter turn is $\lambda/8$ of line and is a different impedance entirely (here $30 - j40\ \Omega$).

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `MODE` `2`: `1÷(1+i1)` → **0.5000 − i0.5000** — the admittance point is a half turn (λ/4) from the impedance point.
> 2. `Ans÷50` → **0.01 − i0.01** S = **10 − i10** mS.

### P6. A $50\ \Omega$ line has $\mathrm{VSWR} = 2$ and the first voltage *minimum* is $0.15\lambda$ from the load. Find the load impedance.

**Given:** $Z_0 = 50\ \Omega$; $\mathrm{VSWR} = 2$; first voltage minimum at $l = 0.15\lambda$

**Solution:**

1. $|\Gamma| = \dfrac{2 - 1}{2 + 1} = 0.3333$, so the VSWR circle has radius $0.3333$
2. At a voltage minimum the reflected wave cancels the incident wave, so $\Gamma(0.15\lambda) = -0.3333$ (real and negative)
3. Rotate back to the load against the direction of travel: $\Gamma_L = -0.3333\,e^{+j2\beta l}$ with $2\beta l = 2(2\pi)(0.15) = 108^\circ$
4. $\Gamma_L = -0.3333(\cos 108^\circ + j\sin 108^\circ) = -0.3333(-0.3090 + j0.9511) = 0.1030 - j0.3170$
5. $z_L = \dfrac{1 + \Gamma_L}{1 - \Gamma_L} = \dfrac{1.1030 - j0.3170}{0.8970 + j0.3170} = 0.9821 - j0.7005$
6. $Z_L = 50(0.9821 - j0.7005) = 49.1 - j35.0\ \Omega$

> [!success]- Answer
> **$Z_L = 49.1 - j35.0\ \Omega$ (capacitive), on a $50\ \Omega$ line.**

> [!warning] Trap
> Rotating the $0.15\lambda$ in the wrong direction and using $e^{-j2\beta l}$, which gives the conjugate $49.1 + j35.0\ \Omega$. Distance is always measured *from the load toward the generator*, so going back to the load is counter-clockwise.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. Degree, `MODE` `2`: `−0.3333×(cos(108)+i sin(108))` → **0.1030 − i0.3170**, since $2\beta l = 2(360°)(0.15) = 108°$.
> 2. `(1+Ans)÷(1−Ans)×50` → **49.1 − i35.0** Ω.
>
> Rotating back to the load takes $e^{+j2\beta l}$; the wrong sign gives the conjugate $49.1 + j35.0$.

### P7. For $z_L = 1 + j1$ on a lossless line, find the distance from the load to the first voltage maximum and to the first voltage minimum.

**Given:** $z_L = 1 + j1$; $\Gamma_L = 0.447\angle 63.4^\circ$

**Solution:**

1. A voltage maximum occurs where $\Gamma(l)$ is real and positive; a minimum where it is real and negative
2. From angle $63.4^\circ$, rotate clockwise (toward the generator) to reach $0^\circ$ for the maximum: $\Delta\phi = 63.4^\circ$
3. $l_{max}/\lambda = 63.4/720 = 0.0881\lambda$; check: $z(0.0881\lambda) = 2.618 = \mathrm{VSWR}$ ✓
4. Continue clockwise to $180^\circ$ for the minimum: total rotation $= 63.4 + 180 = 243.4^\circ$
5. $l_{min}/\lambda = 243.4/720 = 0.3381\lambda$; check: $z(0.3381\lambda) = 0.382 = 1/\mathrm{VSWR}$ ✓

> [!success]- Answer
> **First maximum at $0.088\lambda$ (where $Z = 130.9\ \Omega$); first minimum at $0.338\lambda$ (where $Z = 19.1\ \Omega$).**

> [!warning] Trap
> Dividing the angle by $360^\circ$ instead of $720^\circ$. The reflection coefficient rotates twice per wavelength, so one full $360^\circ$ lap is $\lambda/2$ and the divisor is $720$.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. Degree, `MODE` `2`: `Arg(0.2+i0.4)` → **63.43°**, the angle of $\Gamma_L$.
> 2. `Ans÷720` → **0.0881**$\lambda$ (first maximum); `Ans+0.25` → **0.3381**$\lambda$ (first minimum, a quarter wave further on).
>
> One full turn of $\Gamma$ is $\lambda/2$, so the divisor is 720 and not 360.

### P8. A load on a $50\ \Omega$ line has $\Gamma_L = 0.5\angle 120^\circ$. Find $Z_L$ and the VSWR.

**Given:** $Z_0 = 50\ \Omega$; $\Gamma_L = 0.5\angle 120^\circ$

**Solution:**

1. Resolve into rectangular form: $\Gamma_L = 0.5(\cos 120^\circ + j\sin 120^\circ) = -0.25 + j0.433$
2. $z_L = \dfrac{1 + \Gamma}{1 - \Gamma} = \dfrac{0.75 + j0.433}{1.25 - j0.433}$
3. Rationalise: $\dfrac{(0.75 + j0.433)(1.25 + j0.433)}{1.25^2 + 0.433^2} = \dfrac{0.750 + j0.866}{1.750}$
4. $z_L = 0.4286 + j0.4949$
5. $Z_L = 50(0.4286 + j0.4949) = 21.4 + j24.7\ \Omega$
6. $|\Gamma| = 0.5$ gives $\mathrm{VSWR} = 1.5/0.5 = 3$

> [!success]- Answer
> **$Z_L = 21.4 + j24.7\ \Omega$; $\mathrm{VSWR} = 3$.**

> [!warning] Trap
> Reading the magnitude $0.5$ as the impedance directly, or forgetting that the $120^\circ$ angle places the point in the upper-left region where the resistance is *below* $Z_0$. A VSWR of $3$ admits both $21.4 + j24.7\ \Omega$ and many other loads; only the phase pins this one down.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. Degree: `SHIFT` `Rec(0.5, 120)` → $X$ = **−0.25**, $Y$ = **0.4330**, so $\Gamma_L = X + jY$.
> 2. `MODE` `2`, recalling with `ALPHA` `X` and `ALPHA` `Y`: `(1+X+iY)÷(1−X−iY)×50` → **21.4 + i24.7** Ω.
> 3. VSWR from the magnitude: `(1+0.5)÷(1−0.5)` → **3.00**.
>
> `i` is the `MODE` `2` imaginary unit (the note writes $j$). `Rec(` leaves the pair in $X$ and $Y$, not in `Ans`.

### P9. For $z_L = 1 + j1$ on a $50\ \Omega$ line, use the chart to find the two distances from the load at which the normalized *conductance* is $1$ — the points a shunt stub would be attached at.

**Given:** $z_L = 1 + j1$; $|\Gamma| = 0.4472$

**Solution:**

1. The $g = 1$ circle is the $r = 1$ circle rotated $180^\circ$: it has centre $u = -0.5$ and radius $0.5$
2. Intersect it with the VSWR circle $u^2 + v^2 = 0.2$: substituting gives $0.2 + u = 0$, so $u = -0.2$ and $v = \pm 0.4$
3. The two crossing points are $\Gamma = -0.2 + j0.4$ (angle $116.6^\circ$) and $\Gamma = -0.2 - j0.4$ (angle $-116.6^\circ$)
4. From the load at $63.4^\circ$, rotating clockwise to $-116.6^\circ$ takes $63.4 + 116.6 = 180^\circ$, i.e. $l_1 = 0.250\lambda$
5. Continuing clockwise to $+116.6^\circ$ takes $63.4 + 243.4 = 306.9^\circ$, i.e. $l_2 = 0.426\lambda$
6. Check: at $0.250\lambda$, $z = 0.5 - j0.5$ and $y = 1 + j1$; at $0.426\lambda$, $z = 0.5 + j0.5$ and $y = 1 - j1$ — both have $g = 1$ ✓

> [!success]- Answer
> **The two solutions are $l = 0.250\lambda$ (where $y = 1 + j1$) and $l = 0.426\lambda$ (where $y = 1 - j1$); a shunt stub must supply $-j1$ or $+j1$ respectively.**

> [!warning] Trap
> Reporting only one distance. The VSWR circle always cuts the $g = 1$ circle twice, and the two stub lengths that result are complementary — a matching problem with one answer has usually had a solution thrown away.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. Degree, `MODE` `2`: `Arg(−0.2+i0.4)` → **116.57°** and `Arg(−0.2−i0.4)` → **−116.57°**; the load itself sits at **63.43°**.
> 2. `(63.43+116.57)÷720` → **0.250**$\lambda$; `(63.43+360−116.57)÷720` → **0.426**$\lambda$.
>
> Both crossings are real answers — the VSWR circle always cuts the $g = 1$ circle twice.

## Traps & Exam Notes

- **Forgetting to normalize.** The chart is drawn in $z = Z/Z_0$ and $y = Y/Y_0$. Plotting $300\ \Omega$ on a $50\ \Omega$ chart instead of $z = 6$ puts the point off the paper and every subsequent reading is wrong.
- **VSWR read from the left-hand crossing.** The VSWR circle meets the real axis twice: the right crossing is $\mathrm{VSWR}$ and the left is $1/\mathrm{VSWR}$. Reading the left one gives a number below $1$, which is impossible for a VSWR and is the giveaway.
- **One lap is $\lambda/2$, not $\lambda$.** The rotation is $4\pi l/\lambda$, so a full $360^\circ$ corresponds to $l = \lambda/2$ and the printed wavelength scale stops at $0.5$. Dividing a rotation angle by $360^\circ$ instead of $720^\circ$ doubles every distance.
- **Direction confusion.** Toward the generator is clockwise on the standard chart; toward the load is counter-clockwise. Walking the wrong way reflects the point about the real axis and conjugates the impedance — a $+jX$ answer becomes $-jX$.
- **Admittance is a half turn, not a quarter turn.** $y = 1/z$ corresponds to $\Gamma \to -\Gamma$, i.e. $180^\circ$ or $\lambda/4$ on the scale. Rotating $90^\circ$ reads a genuinely different impedance, not the admittance.
- **Treating the VSWR circle as a locus of frequency.** It is the locus of *distance* along the line at one frequency. Impedances at other frequencies lie inside or outside it, and the chart cannot give bandwidth.
- **Reading a lossy line as if it were lossless.** With attenuation the point spirals inward as $e^{-2\alpha l}$ instead of staying on the circle, so the load cannot be recovered by a simple rotation unless the loss is rotated back in first.
- **Assuming a single discontinuity.** The chart's rotation trick presumes one load. With two or more mismatches the reflections re-reflect and no single VSWR circle describes the line; the chart must be applied section by section.
- **Over-trusting the graphical answer.** The grid compresses badly near the right edge, where a small plotting error is a large impedance error. Chart answers should be quoted to two or three significant figures at most, and checked against the algebra whenever a clean formula exists.

## See Also

- [[04_Reflection_Coefficient_and_VSWR]]
- [[05_Input_Impedance_and_Quarter-Wave_Transformer]]
- [[07_Stub_Matching]]
- [[02_Secondary_Constants_Z0_and_Gamma]]

---

[[05_Input_Impedance_and_Quarter-Wave_Transformer|⬅ 05]] · [[_MOC_Transmission_Lines_and_Waveguides|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Stub_Matching|07 ➡]]
