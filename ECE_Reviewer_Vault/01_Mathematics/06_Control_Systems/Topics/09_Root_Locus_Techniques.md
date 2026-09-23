---
id: MATH-06-09
title: "Root Locus Techniques"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 9
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Second_Order_Specifications]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Root Locus Techniques

> [!abstract] Scope
> Sketch the path traced by the closed-loop poles as gain varies, and locate breakaway points, asymptotes, imaginary-axis crossings and gain at a point.

## Core Concept

> [!tip] Intuition
> The root locus is the set of points in the s-plane where the open-loop phase is exactly $180^\circ$. Once a point satisfies that angle condition, the gain that puts a closed-loop pole there is fixed by $\lvert GH\rvert = 1/K$ — phase picks the shape, magnitude picks the gain.

**Where the locus comes from.** The closed-loop characteristic equation is $1+KG(s)H(s)=0$, i.e. $KG(s)H(s)=-1$. A complex number equals $-1$ only if its magnitude is 1 and its angle is $180^\circ$ (plus multiples of $360^\circ$). So the locus is the set of $s$ with $\angle G(s)H(s)=180^\circ+360^\circ k$, and the gain at any point on it is $K=\dfrac{1}{\lvert G(s)H(s)\rvert}$ — evaluated **without** $K$, because $K$ was factored out. For positive feedback the angle condition becomes $0^\circ+360^\circ k$, a completely different (complementary) locus.

**The construction rules.** (1) $n$ branches, one per open-loop pole, starting at the open-loop poles for $K=0$ and ending at the open-loop *zeros* (or at infinity along asymptotes) as $K\to\infty$. (2) A point on the real axis is on the locus iff the total number of real poles and zeros **to its right** is odd. (3) $n-m$ asymptotes meet at the centroid $\sigma_a=\dfrac{\sum p_i-\sum z_i}{n-m}$ at angles $\dfrac{(2k+1)180^\circ}{n-m}$. (4) Breakaway/break-in points solve $\dfrac{dK}{ds}=0$, equivalently $N(s)D'(s)-N'(s)D(s)=0$ for $GH=N/D$ — then keep only roots that actually lie on the locus. (5) The $j\omega$ crossings come from the Routh array applied to the closed-loop characteristic equation, which also gives the critical gain.

**Reading specifications off the locus.** On the locus, $\zeta$ is the cosine of the angle from the negative real axis, so a constant-$\zeta$ ray is a straight line from the origin and the crossing of that ray with the locus gives the gain that achieves that damping. Constant $\omega_n$ is a circle, constant $t_s$ a vertical line and constant $t_p$ a horizontal line. Board problems almost always ask for one of these intersections followed by the gain from the magnitude condition.

**Why the magnitude condition is the second half of every answer.** The angle condition tells you *whether* a point is on the locus; the magnitude condition tells you *which gain* puts a pole there. Students who sketch correctly still lose marks by reporting a gain obtained from $\lvert GH\rvert=1$ instead of $K=1/\lvert GH\rvert$ — the two are reciprocals.

**Where the rules fail.** The angle condition assumes $K>0$; negative gains trace the complementary (positive-feedback) locus. The real-axis rule counts poles and zeros with multiplicity. Breakaway solutions that are complex, or that lie in a real-axis segment with an even count to the right, are spurious — the derivative condition is necessary but not sufficient. And the locus is drawn for the *open-loop* $GH$: cancelling a common pole-zero pair first silently removes a branch, which is legitimate only if the cancellation is exact.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Characteristic equation | $1 + K G(s)H(s) = 0$ | Positive K. Root locus is the set of its roots as K varies 0 to infinity. |
| Angle condition | $\angle G(s)H(s) = 180^\circ + 360^\circ k$ | Positive-feedback (negative K) locus instead uses 0 + 360k degrees. |
| Magnitude condition | $K = \frac{1}{\lvert G(s)H(s) \rvert}$ | Evaluate GH without K at the chosen point. The reciprocal is the classic slip. |
| Number of branches | $n\ \mathrm{branches},\ \mathrm{one\ per\ open\ loop\ pole}$ | Branches end at the m open-loop zeros, remaining n-m go to infinity. |
| Asymptote angles | $\theta_a = \frac{(2k+1)180^\circ}{n-m}$ | k = 0, 1, ..., n-m-1. Only when n > m. |
| Centroid | $\sigma_a = \frac{\sum p_i - \sum z_i}{n-m}$ | Real-axis point where all asymptotes meet; sum of poles minus sum of zeros. |
| Real-axis rule | $\mathrm{on\ locus} \iff \mathrm{odd\ count\ of\ poles+zeros\ to\ the\ right}$ | Count both poles and zeros, with multiplicity. |
| Breakaway condition | $\frac{dK}{ds} = 0 \iff N D' - N' D = 0$ | Then keep only solutions that satisfy the angle condition. |
| Imaginary-axis crossing | $\mathrm{Routh\ array\ on}\ D(s) + K N(s) = 0$ | The boundary gain makes an s^1 entry vanish; the auxiliary polynomial gives omega. |
| Damping from a locus point | $\zeta = \cos\theta$ | theta is measured from the negative real axis to the vector from the origin to the point. |
| Angle of departure from a complex pole | $\theta_d = 180^\circ + \sum\angle(p-z_i) - \sum_{j\neq d}\angle(p-p_j)$ | Sigma of angles from every zero, minus angles from all other poles. |

## Interactive Widget

**Root Locus Animator**

![[Root_Locus_Animator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. For $G(s)H(s)=\dfrac{K}{s(s+2)(s+4)}$, find the asymptote angles and centroid, the breakaway point and the gain there.

**Given:** GH = K/(s(s+2)(s+4))

**Solution:**

1. $n=3$ poles at $0,-2,-4$; $m=0$ zeros, so $n-m=3$
2. Asymptote angles: $\dfrac{(2k+1)180^\circ}{3} = 60^\circ,\ 180^\circ,\ 300^\circ$
3. Centroid: $\sigma_a = \dfrac{0-2-4}{3} = -2$
4. Breakaway: $K = -s(s+2)(s+4) = -(s^3+6s^2+8s)$, so $\dfrac{dK}{ds} = -(3s^2+12s+8) = 0$
5. $s = \dfrac{-12\pm\sqrt{144-96}}{6} = \dfrac{-12\pm6.928}{6} \Rightarrow s = -0.845$ or $s = -3.155$
6. Only $-0.845$ lies on the locus (the segment $-2<s<0$); $-3.155$ has an even count to its right
7. $K = \lvert(-0.845)(1.155)(3.155)\rvert = 3.08$

> [!success]- Answer
> **Asymptotes at $60^\circ,180^\circ,300^\circ$ meeting at $\sigma_a=-2$; breakaway at $s=-0.845$ with $K=3.08$.**

> [!warning] Trap
> Reporting both roots of $dK/ds=0$ as breakaway points. $-3.155$ has two poles to its right (at $-2$ and $0$... in fact $-4$ and $-2$), so it is not on the locus at all — the derivative condition is necessary but not sufficient.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `1` with `3`, `12`, `8` (from $dK/ds=-(3s^2+12s+8)=0$) → $x=$ **-0.845**, **-3.155**; only $-0.845$ lies on the locus, on the $-2<s<0$ segment.
> 2. `0.845×1.155×3.155` → $K=\lvert s(s+2)(s+4)\rvert=$ **3.08** at the breakaway; `(0−2−4)÷3` → the centroid **-2**, with asymptotes at $60°$, $180°$, $300°$.

### P2. For the same $G(s)H(s)=\dfrac{K}{s(s+2)(s+4)}$, find the gain and frequency at which the locus crosses the imaginary axis.

**Given:** GH = K/(s(s+2)(s+4))

**Solution:**

1. CE: $s(s+2)(s+4)+K = s^3+6s^2+8s+K = 0$
2. Routh: row $s^3$: 1, 8; row $s^2$: 6, K; row $s^1$: $\dfrac{48-K}{6}$; row $s^0$: K
3. The $s^1$ entry vanishes when $K = 48$
4. Auxiliary polynomial from the $s^2$ row: $6s^2+48 = 0 \Rightarrow s = \pm j2.828$
5. So the branches cross the imaginary axis at $\omega = \pm 2.83\ \mathrm{rad/s}$ when $K = 48$

> [!success]- Answer
> **$K = 48$ at $\omega = \pm 2.83\ \mathrm{rad/s}$ (i.e. $\pm j\sqrt{8}$).**

> [!warning] Trap
> Solving $\lvert GH \rvert=1$ at $s=j\omega$ numerically and missing the crossing. The Routh route gives both the boundary gain and the frequency in one step, and it also confirms the locus stays in the left half plane for $K<48$.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. CE $=s^3+6s^2+8s+K$, whose $s^1$ entry is $(6×8-K)/6$: `6×8` → it vanishes at $K=$ **48**.
> 2. `MODE` `5` page 2 `2` (cubic) with `1`, `6`, `8`, `48` → $x=$ **-6**, **±j2.828** — the crossing is at $\omega=$ **2.83** rad/s with $K=$ **48**.

### P3. For $G(s)H(s)=\dfrac{K}{s(s+4)}$, find the breakaway point and its gain, and the gain that gives $\zeta = 0.5$.

**Given:** GH = K/(s(s+4))

**Solution:**

1. $n=2$, $m=0$, so two branches and asymptotes at $\pm90^\circ$ meeting at $\sigma_a = -2$
2. $K = -s(s+4) = -(s^2+4s) \Rightarrow \dfrac{dK}{ds} = -(2s+4) = 0 \Rightarrow s = -2$
3. $K = \lvert(-2)(2)\rvert = 4$ at the breakaway
4. Closed-loop CE $s^2+4s+K = 0$ gives poles $-2\pm j\sqrt{K-4}$, so $\zeta\omega_n = 2$ and $\omega_n = \sqrt{K}$
5. $\zeta = 0.5 \Rightarrow 0.5\sqrt{K} = 2 \Rightarrow \sqrt{K} = 4 \Rightarrow K = 16$
6. Poles there: $-2\pm j3.464$, with $\omega_n = 4$ and $\zeta = 2/4 = 0.5$

> [!success]- Answer
> **Breakaway at $s=-2$ with $K=4$; the $\zeta=0.5$ ray is met at $K=16$ (poles $-2\pm j3.464$).**

> [!warning] Trap
> Using $t_p$ or $M_p$ formulas instead of the geometry. On the locus, $\zeta=\cos\theta$ from the negative real axis, and for this plant $\zeta = 2/\sqrt{K}$ — setting it to 0.5 gives $K=16$ in one line.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `1` with `1`, `4`, `16` → $x=-2\pm j3.464$: at $K=$ **16** the poles lie on the $\zeta=0.5$ ray, since $\lvert x\rvert=\sqrt{16}=$ **4** and $\lvert\mathrm{Re}\rvert/\lvert x\rvert=2/4=$ **0.5**.
> 2. `MODE` `5` page 2 `1` with `1`, `4`, `4` → $x=$ **-2, -2** (a repeated root): the breakaway point $s=-2$ with $K=$ **4**.

### P4. Is $s=-1+j2$ on the root locus of $G(s)H(s)=\dfrac{K}{s(s+2)}$? If so, find the gain.

**Given:** GH = K/(s(s+2)); candidate point s = -1 + j2

**Solution:**

1. Angle from the pole at 0: $\angle(-1+j2) = 180^\circ - \arctan(2/1) = 180^\circ - 63.43^\circ = 116.57^\circ$
2. Angle from the pole at $-2$: $\angle(1+j2) = \arctan(2/1) = 63.43^\circ$
3. Sum of pole angles $= 116.57^\circ + 63.43^\circ = 180.00^\circ$ — the angle condition is satisfied
4. Magnitude: $\lvert s\rvert = \sqrt{1+4} = \sqrt5$ and $\lvert s+2\rvert = \sqrt{1+4} = \sqrt5$
5. $K = \lvert s(s+2)\rvert = \sqrt5\cdot\sqrt5 = 5$

> [!success]- Answer
> **Yes — the point is on the locus, and $K = 5$.**

> [!warning] Trap
> Computing $K = 1/\lvert GH\rvert$ with the $K$ already included, or reporting $K = 1/5 = 0.2$. The magnitude condition is $K = 1/\lvert GH_{\mathrm{without }K}\rvert$, so here $K=5$.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. Deg: `SHIFT` `Pol(` `-1` `,` `2` `)` → $\theta=$ **116.57°**, and `SHIFT` `Pol(` `1` `,` `2` `)` → $\theta=$ **63.43°**; the two pole angles sum to **180.00°**, so the angle condition holds.
> 2. `√(1+4)×√(1+4)` → $K=\lvert s\rvert\lvert s+2\rvert=$ **5** — the magnitude condition is the product, never its reciprocal 0.2.

### P5. For $G(s)H(s)=\dfrac{K}{s(s^2+2s+2)}$, find the angle of departure from the pole at $s=-1+j$ and the imaginary-axis crossing gain.

**Given:** GH = K/(s(s^2+2s+2)); poles at 0, -1 +/- j

**Solution:**

1. Poles: $0$, $-1+j$, $-1-j$. No zeros
2. Angle from the pole at 0 to $-1+j$: $\angle(-1+j) = 135^\circ$
3. Angle from the other complex pole at $-1-j$ to $-1+j$: the vector is $j2$, so $90^\circ$
4. $\theta_d = 180^\circ - 135^\circ - 90^\circ = -45^\circ$
5. Crossing: CE $= s^3+2s^2+2s+K$; Routh row $s^1$ is $\dfrac{4-K}{2}$, vanishing at $K=4$
6. Auxiliary $2s^2+4=0 \Rightarrow s = \pm j\sqrt2 = \pm j1.414$

> [!success]- Answer
> **Departure at $-45^\circ$ (down and to the right) from $s=-1+j$; the locus crosses the imaginary axis at $\omega=\pm1.414\ \mathrm{rad/s}$ when $K=4$.**

> [!warning] Trap
> Summing the angles of *all* poles including the one you are departing from. Exclude the pole in question; its own angle is the unknown you are solving for.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `2` (cubic) with `1`, `2`, `2`, `4` → $x=$ **-2**, **±j1.414** — the crossing is at $\omega=$ **1.414** rad/s with $K=$ **4**.
> 2. Deg departure: `SHIFT` `Pol(` `-1` `,` `1` `)` → **135°** and `SHIFT` `Pol(` `0` `,` `2` `)` → **90°**, so $\theta_d=180°-135°-90°=$ **-45°**.

## Traps & Exam Notes

- **Reciprocating the magnitude condition the wrong way.** $K=1/\lvert GH\rvert$ evaluated at the point with $K$ removed. Reporting $\lvert GH\rvert$ itself is the standard error.
- **Using $180^\circ$ for a positive-feedback loop.** Positive feedback satisfies $\angle GH = 0^\circ+360^\circ k$, which traces a mirrored locus.
- **Treating every root of $dK/ds=0$ as a breakaway point.** The derivative condition is necessary, not sufficient; discard roots not on the locus.
- **Counting only poles to the right for the real-axis rule.** Zeros count too, with multiplicity.
- **Confusing the endpoints of the branches.** Branches *end* at the open-loop zeros; closed-loop zeros are a different set and are not on the locus.
- **Forgetting the $n-m$ asymptote count.** With $m>0$, one branch terminates at each finite zero and only $n-m$ run to infinity — using $n$ asymptotes is wrong.
- **Mixing up the angle of departure and arrival.** Departure is from a complex pole, arrival at a complex zero; the sign of the zero-angle sum flips between them.
- **Applying the $180^\circ$ angle condition to a point and skipping the magnitude check.** Both conditions must hold; the angle alone gives no gain.

## See Also

- [[05_Second_Order_Specifications]]
- [[08_Routh-Hurwitz_Criterion]]
- [[13_Lead-Lag_Compensator_Design]]

---

[[08_Routh-Hurwitz_Criterion|⬅ 08]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Bode_Plots_and_Margins|10 ➡]]
