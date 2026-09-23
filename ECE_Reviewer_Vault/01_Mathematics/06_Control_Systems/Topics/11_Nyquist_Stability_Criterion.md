---
id: MATH-06-11
title: "Nyquist Stability Criterion"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[10_Bode_Plots_and_Margins]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Nyquist Stability Criterion

> [!abstract] Scope
> Decide closed-loop stability by counting how many times the open-loop Nyquist plot encircles the $-1$ point, allowing for open-loop right-half-plane poles.

## Core Concept

> [!tip] Intuition
> A feedback loop becomes unstable exactly when its open-loop plot wraps around the point $-1$. Count the wraps, add the open-loop poles already in the right half plane, and the sum is the number of closed-loop poles that are unstable.

**The criterion.** Let $P$ be the number of open-loop poles of $G(s)H(s)$ in the right half plane, $N$ the number of **clockwise** encirclements of $-1$ by the Nyquist plot, and $Z$ the number of closed-loop poles in the right half plane. Then $Z=N+P$, and the closed loop is stable iff $Z=0$. The result comes from the argument principle applied to $1+G(s)H(s)$: the contour image winds around the origin as many times as the difference between the pole and zero counts inside the contour.

**Reading the encirclement count.** The full Nyquist plot is the image of the entire $j\omega$ axis, so it is symmetric about the real axis: the negative-frequency half is the mirror image. The commonest counting error is to draw only the positive-frequency half and double-count it, or to count crossings instead of net encirclements. Trace the curve from $\omega=0^+$ through $\omega\to\infty$ and back through $\omega=0^-$ to $0$; an encirclement is a closed loop around $-1$, and a curve that merely crosses the negative real axis to the left of $-1$ and returns may encircle it zero or two times.

**The sign convention matters.** With $Z=N+P$ and $N$ counting clockwise encirclements, an open-loop-unstable plant ($P>0$) needs a *counter-clockwise* encirclement, i.e. a negative $N$, to stabilise. For $P=0$ the requirement reduces to 'no encirclement of $-1$', which is the version most often quoted.

**Where the margins come from.** The intersection of the Nyquist plot with the negative real axis gives the gain margin: if the crossing is at $-x$, then $GM=1/\lvert x\rvert$ and the critical gain is $1/\lvert x\rvert$ times the present gain. The intersection with the unit circle gives the phase margin. Nyquist and Bode carry identical information; Nyquist is superior when the loop is conditionally stable, because it counts encirclements correctly where a Bode plot can show a negative gain margin at one crossing yet still describe a stable loop.

**Integrators and the contour.** If $GH$ has a pole at the origin, the Nyquist contour must indent into the right half plane around $s=0$ (a small semicircle), and that indentation sweeps a large arc at infinity in the plot. Skipping it changes the encirclement count. The practical rule for a single integrator is that the plot begins at infinity along the $-90^\circ$ direction and the arc closes the curve; treat the count as starting after that arc.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Nyquist criterion | $Z = N + P$ | N = clockwise encirclements of -1; P = open-loop RHP poles; Z = closed-loop RHP poles. |
| Stability condition | $Z = 0 \iff N = -P$ | For an open-loop stable plant (P=0) this reduces to: no encirclement of -1. |
| Open-loop stable case | $P = 0 \Rightarrow \mathrm{stable} \iff N = 0$ | The -1 point must lie outside the closed Nyquist curve. |
| Gain margin from the plot | $GM = \frac{1}{\lvert x \rvert},\quad x = \mathrm{negative\ real\ axis\ crossing}$ | With the present gain. Critical gain = GM times the present gain. |
| Phase crossover from the plot | $\omega_{pc}:\ \mathrm{where\ the\ plot\ meets\ the\ negative\ real\ axis}$ | Same frequency as the Bode gain margin frequency. |
| Gain crossover from the plot | $\mathrm{where\ the\ plot\ meets\ the\ unit\ circle}$ | Same frequency as the Bode phase margin frequency. |
| Critical gain for a third-order loop | $G = \frac{K}{s(s+a)(s+b)} \Rightarrow K_{crit} = ab(a+b)$ | From Routh: the s^1 entry vanishes at that gain. |
| Routh-consistent check | $K_{crit} = \frac{1}{\lvert G_{0}(j\omega_{pc}) \rvert}$ | G0 is the loop with K factored out; the two methods must agree. |
| Integrator indentation | $s = \varepsilon e^{j\theta},\ \theta \in [-90^\circ, 90^\circ]$ | Required when GH has a pole at the origin; the arc in the plot must be included. |
| Conditionally stable loop | $\mathrm{stable\ for}\ K_1 < K < K_2$ | Two negative-real-axis crossings; Bode alone can mislead, Nyquist counts correctly. |

## Worked Problems

### P1. For $G(s)=\dfrac{K}{s(s+1)(s+2)}$ in unity feedback, use the Nyquist crossing to find the critical gain and the gain margin when $K=3$.

**Given:** G = K/(s(s+1)(s+2)); K = 3

**Solution:**

1. Phase crossover: $-90^\circ - \arctan\omega - \arctan(\omega/2) = -180^\circ$
2. $\arctan\omega + \arctan(\omega/2) = 90^\circ \Rightarrow 1 - \omega^2/2 = 0 \Rightarrow \omega_{pc} = \sqrt2 = 1.414\ \mathrm{rad/s}$
3. $\lvert G_0(j\sqrt2) \rvert = \dfrac{1}{\sqrt2\cdot\sqrt3\cdot\sqrt6} = \dfrac{1}{1.414\times1.732\times2.449} = \dfrac{1}{6}$
4. The plot crosses the negative real axis at $-K/6$, so the critical gain is $K_{crit} = 6$
5. Check with Routh: CE $= s^3+3s^2+2s+K$; the $s^1$ entry is $(6-K)/3$, vanishing at $K=6$ — the two methods agree
6. At $K=3$ the crossing is at $-0.5$, so $GM = 1/0.5 = 2$ and $GM_{dB} = 20\log_{10}2 = 6.02\ \mathrm{dB}$

> [!success]- Answer
> **$K_{crit}=6$; at $K=3$, $GM = 2$ ($6.02\ \mathrm{dB}$) and the loop is stable.**

> [!warning] Trap
> Forgetting that the crossing point moves with $K$. The plot crosses at $-K/6$; the critical gain is the $K$ that puts the crossing exactly at $-1$, i.e. $K=6$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√2` → $\omega_{pc}=$ **1.414** rad/s from $\omega^2=2$; `√2×√3×√6` → **6**, the $\lvert G_0\rvert$ denominator, so $K_{crit}=$ **6** (the Routh $s^1$ entry $(6-K)/3$ vanishes there).
> 2. `3÷6 : 1÷Ans : 20×log(Ans)` → the crossing at **-0.5** → $GM=$ **2** → **6.02** dB.

### P2. For the same loop with $K=6$, find the gain margin and phase margin, and describe the closed-loop behaviour.

**Given:** G = 6/(s(s+1)(s+2))

**Solution:**

1. The negative-real-axis crossing is at $-6/6 = -1$, so it passes exactly through the critical point
2. $GM = 1/1 = 1 \Rightarrow GM_{dB} = 0\ \mathrm{dB}$
3. Gain crossover: solve $\dfrac{6}{\omega\sqrt{1+\omega^2}\sqrt{4+\omega^2}} = 1$
4. At $\omega=\sqrt2$: $\lvert G\rvert = 6/(1.414)(1.732)(2.449) = 6/6 = 1$ — the gain crossover coincides with the phase crossover
5. Phase at $\sqrt2$ is exactly $-180^\circ$, so $PM = 180^\circ-180^\circ = 0^\circ$
6. Routh: the $s^1$ entry of $s^3+3s^2+2s+6$ is zero, and the auxiliary polynomial $3s^2+6=0$ gives $s=\pm j\sqrt2$

> [!success]- Answer
> **$GM = 0\ \mathrm{dB}$ and $PM = 0^\circ$: marginally stable, with sustained oscillation at $\omega=\sqrt2\ \mathrm{rad/s}$.**

> [!warning] Trap
> Calling this 'stable with zero margin'. Passing exactly through $-1$ means a pole pair on the imaginary axis — the loop oscillates forever and is not BIBO stable for a sinusoid at $\sqrt2\ \mathrm{rad/s}$.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `2` (cubic) with `1`, `3`, `2`, `6` → $x=$ **-3**, **±j1.414** — a $j\omega$-axis pair, so the plot passes exactly through $-1$.
> 2. `6÷6` → the negative-real-axis crossing sits at **-1**: $GM=$ **0** dB and $PM=$ **0°**, with sustained oscillation at $\omega=\sqrt2=$ **1.414** rad/s.

### P3. An open-loop-unstable plant has $P=1$ (one pole in the right half plane). Its Nyquist plot encircles the $-1$ point once in the counter-clockwise direction. Is the closed loop stable?

**Given:** P = 1; one counter-clockwise encirclement

**Solution:**

1. Clockwise encirclements are positive, so one counter-clockwise encirclement means $N=-1$
2. $Z = N + P = -1 + 1 = 0$
3. Zero closed-loop poles in the right half plane
4. Therefore the closed loop is stable

> [!success]- Answer
> **Stable: $Z = -1+1 = 0$.**

> [!warning] Trap
> Answering 'unstable because the plot encircles $-1$'. For $P>0$ an encirclement is *required*; the criterion is $Z=N+P=0$, not $N=0$.

### P4. For $G(s)=\dfrac{K}{s(s+1)}$ in unity feedback, use the Nyquist plot to determine whether the closed loop is stable for all $K>0$.

**Given:** G = K/(s(s+1)); all K > 0

**Solution:**

1. Poles: $0$ and $-1$; no open-loop right-half-plane poles, so $P=0$
2. Phase $-90^\circ-\arctan\omega$ approaches $-180^\circ$ asymptotically but never reaches it for finite $\omega$
3. The plot therefore never crosses the negative real axis; it spirals to the origin inside the unit circle
4. No encirclement of $-1$ for any $K>0$, so $N=0$ and $Z=0$
5. Check with Routh: CE $= s^2+s+K$ has roots with real part $-0.5$ for every $K>0$ — always stable

> [!success]- Answer
> **Stable for all $K>0$: the plot never crosses the negative real axis, so $GM=\infty$.**

> [!warning] Trap
> Assuming a loop with an integrator plus one pole must be conditionally stable. The phase only approaches $-180^\circ$, so the crossing never occurs and there is no gain limit.

### P5. A Nyquist plot with $P=0$ crosses the negative real axis only at $-0.4$ for the current gain. State the gain margin in dB and how much the gain can be increased before instability.

**Given:** P = 0; single negative-real-axis crossing at -0.4

**Solution:**

1. $GM = \dfrac{1}{\lvert -0.4 \rvert} = 2.5$
2. $GM_{dB} = 20\log_{10}2.5 = 7.96\ \mathrm{dB}$
3. The closed loop is stable now because $-1$ is outside the curve ($0.4 < 1$)
4. Instability begins when the crossing reaches $-1$, i.e. when the gain is multiplied by 2.5
5. So the gain may rise to $2.5K$ before marginal stability

> [!success]- Answer
> **$GM = 2.5$ (7.96 dB); the gain can be increased by a factor of 2.5.**

> [!warning] Trap
> Assuming the loop is unstable because the plot crosses the negative real axis. Crossing is normal; only an encirclement of $-1$ matters. At $-0.4$ the point $-1$ is still outside the curve.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷0.4` → $GM=$ **2.5**: the crossing is at $-0.4$ and the critical point is $-1$, so the $0.4$ is the whole margin.
> 2. `20×log(Ans)` → $GM_{dB}=$ **7.96** dB, so the gain may rise by the factor **2.5** before the crossing reaches $-1$.

## Traps & Exam Notes

- **Counting crossings instead of net encirclements.** A curve that crosses the negative real axis twice to the left of $-1$ may encircle $-1$ zero or two times; only the winding number matters.
- **Forgetting the mirror image.** The full Nyquist plot is symmetric about the real axis because it includes negative frequencies; drawing only the positive-frequency half doubles or halves the count.
- **Applying $N=0$ when $P>0$.** The criterion is $Z=N+P$; an open-loop-unstable plant *requires* $-P$ (counter-clockwise) encirclements.
- **Reading the gain margin from the unit-circle crossing.** Unit circle gives phase margin; the negative real axis gives gain margin.
- **Ignoring the indentation for integrators.** A pole at the origin forces a right-half-plane indentation whose image is a large arc; omitting it changes the winding number.
- **Trusting Bode margins on conditionally stable loops.** A loop stable for $K_1<K<K_2$ can show a negative gain margin at one crossover and remain stable. Count encirclements.
- **Confusing P with the closed-loop pole count.** $P$ counts only the *open-loop* right-half-plane poles of $GH$.
- **Treating 'exactly on $-1$' as stable.** That is the marginal case: a $j\omega$-axis pole pair and sustained oscillation.

## See Also

- [[10_Bode_Plots_and_Margins]]
- [[08_Routh-Hurwitz_Criterion]]
- [[09_Root_Locus_Techniques]]

---

[[10_Bode_Plots_and_Margins|⬅ 10]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[12_PID_Controllers_and_Tuning|12 ➡]]
