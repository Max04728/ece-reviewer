---
id: ECE-01-12
title: "Second Order RLC Natural Response"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 12
tier: 1
depth: full
problem_count: 10
prereqs: ["[[11_First_Order_RC_and_RL_Transients]]", "[[10_Inductors,_Capacitors_and_Energy]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Second Order RLC Natural Response

> [!abstract] Scope
> Classify a source-free series or parallel RLC circuit as overdamped, critically damped or underdamped, and write its natural response.

## Core Concept

> [!tip] Intuition
> An RLC circuit is an energy tug-of-war: the capacitor and inductor swap energy back and forth while the resistor bleeds it away. Damping is the score. If the resistor wins, the response crawls back to zero without oscillating; if the reactive pair wins, it rings at a frequency set by L and C; critical damping is the exact boundary.

**Where the second-order equation comes from.** A source-free RLC loop has two energy-storage elements, so its describing equation is second order. For the series case, KVL around the loop gives $L\dfrac{di}{dt} + Ri + \dfrac{1}{C}\int i\,dt = 0$; differentiating once yields $\dfrac{d^2i}{dt^2} + \dfrac{R}{L}\dfrac{di}{dt} + \dfrac{1}{LC}i = 0$. Proposing $i = Ae^{st}$ turns it into the characteristic equation $s^2 + \dfrac{R}{L}s + \dfrac{1}{LC} = 0$, whose roots decide everything.

**The two numbers that matter.** Write the characteristic equation in the standard form $s^2 + 2\alpha s + \omega_0^2 = 0$. Then $\omega_0 = 1/\sqrt{LC}$ is the undamped natural frequency (rad/s) and $\alpha$ is the neper frequency (Np/s): $\alpha = R/(2L)$ for the series circuit and $\alpha = 1/(2RC)$ for the parallel circuit. The duality is the whole reason a series and a parallel RLC behave in opposite ways as $R$ grows: in series a large $R$ damps harder, in parallel a large $R$ damps less.

**The discriminant decides the case.** The roots are $s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}$. If $\alpha > \omega_0$ the roots are real and distinct and the circuit is **overdamped** — a sum of two decaying exponentials, no oscillation. If $\alpha = \omega_0$ the roots are real and repeated at $-\alpha$ and the circuit is **critically damped** — the fastest possible return to zero with no overshoot, with the form $(A + Bt)e^{-\alpha t}$. If $\alpha < \omega_0$ the roots are complex conjugates $-\alpha \pm j\omega_d$ with $\omega_d = \sqrt{\omega_0^2 - \alpha^2}$, and the circuit is **underdamped** — a damped sinusoid that rings and decays. If $\alpha = 0$ (no resistance, an ideal LC) the oscillation never decays: **undamped**.

**Writing the response.** Overdamped:
$$x = A_1e^{s_1t} + A_2e^{s_2t}$$
Critically damped:
$$x = (A_1 + A_2t)e^{-\alpha t}$$
Underdamped:
$$x = e^{-\alpha t}(A_1\cos\omega_dt + A_2\sin\omega_dt)$$
or equivalently $Be^{-\alpha t}\cos(\omega_dt + \theta)$. The two constants come from the two initial conditions, which for a circuit are the capacitor voltage $v_C(0)$ and the inductor current $i_L(0)$ — both are continuous, so their $0^-$ values carry over to $0^+$.

**The initial conditions are where the marks are lost.** $v_C$ cannot jump (it would need infinite current) and $i_L$ cannot jump (it would need infinite voltage). Everything else can jump. To get the second constant, differentiate the assumed solution and use KVL/KCL at $t = 0^+$ to evaluate $di/dt(0^+)$ from $v_C(0^+)$ (or $dv/dt(0^+)$ from $i_L(0^+)$): for a series loop, $L\,di/dt\big|_{0^+} = -v_C(0^+) - Ri(0^+)$.

**Quality factor and the practical reading.** $Q = \omega_0/(2\alpha)$ measures how many radians of ringing survive; large $Q$ means lightly damped. Equivalently $\alpha = \omega_0/(2Q)$. In a series circuit $Q = \omega_0L/R = 1/(\omega_0CR)$, and in a parallel circuit the same expression with $R$ in the numerator. Critical damping corresponds to $Q = 1/2$, and any $Q > 1/2$ rings.

**When the model fails.** The classification assumes one independent $R$, one $L$ and one $C$, all linear and time-invariant. Multiple reactive elements that cannot be reduced to a single equivalent give a higher-order system with more than two characteristic roots, and the overdamped/underdamped labels no longer cover the response.

## Derivation

**Series characteristic equation.** KVL around the series loop with $i$ the loop current: $L\dfrac{di}{dt} + Ri + \dfrac{1}{C}\int_{-\infty}^{t} i\,d\tau = 0$. Differentiate once: $L\dfrac{d^2i}{dt^2} + R\dfrac{di}{dt} + \dfrac{i}{C} = 0$. Divide by $L$ and substitute $i = Ae^{st}$: $s^2 + \dfrac{R}{L}s + \dfrac{1}{LC} = 0$, so $2\alpha = R/L$ and $\omega_0^2 = 1/(LC)$.

**Parallel characteristic equation.** KCL at the top node of a parallel RLC with node voltage $v$: $C\dfrac{dv}{dt} + \dfrac{v}{R} + \dfrac{1}{L}\int v\,d\tau = 0$. Differentiating and dividing by $C$ gives $\dfrac{d^2v}{dt^2} + \dfrac{1}{RC}\dfrac{dv}{dt} + \dfrac{v}{LC} = 0$, hence $2\alpha = 1/(RC)$ and the same $\omega_0^2 = 1/(LC)$.

**The three cases from the roots.** The characteristic roots are

$$s_{1,2} = -\alpha \pm \sqrt{\alpha^2-\omega_0^2}$$

With $\alpha^2 > \omega_0^2$ the square root is real and the two exponentials decay at different rates; with $\alpha^2 = \omega_0^2$ the root is repeated and the second independent solution is $te^{-\alpha t}$ (not $e^{-\alpha t}$ twice, which would be linearly dependent); with $\alpha^2 < \omega_0^2$ the square root is $j\sqrt{\omega_0^2-\alpha^2} = j\omega_d$ and Euler's identity turns the two complex exponentials into the damped sinusoid.

**Initial conditions, series case.** Write $i(t) = e^{-\alpha t}(A_1\cos\omega_dt + A_2\sin\omega_dt)$. Then $i(0) = A_1 = i_L(0)$, and differentiating gives $i'(0) = -\alpha A_1 + \omega_dA_2$. KVL at $0^+$ supplies $Li'(0) = -v_C(0) - Ri(0)$, so $A_2 = \big[Li'(0) + \alpha L i(0)\big]/(L\omega_d)$, which reduces to a clean number once the two initial values are substituted.

**Critical damping is the fastest non-oscillatory return.** For $R_L$ fixed, increasing $R$ beyond the critical value slows the response (one exponential becomes very slow) while decreasing it introduces overshoot. Critical damping is therefore the boundary, and it is the design target wherever overshoot is unacceptable.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Undamped natural frequency | $\omega_0 = \frac{1}{\sqrt{LC}}$ | Rad/s. Identical for series and parallel RLC. In hertz, f_0 = omega_0/(2 pi). |
| Neper frequency, series | $\alpha = \frac{R}{2L}$ | Np/s. In a series circuit a LARGER R damps harder. |
| Neper frequency, parallel | $\alpha = \frac{1}{2RC}$ | Np/s. In a parallel circuit a LARGER R damps LESS — the duality that trips people up. |
| Characteristic equation | $s^2 + 2\alpha s + \omega_0^2 = 0$ | Write the circuit equation in this standard form before classifying; do not read alpha off an unnormalised equation. |
| Characteristic roots | $s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}$ | Real and distinct (overdamped), repeated (critical), or complex (underdamped). |
| Damped frequency | $\omega_d = \sqrt{\omega_0^2 - \alpha^2}$ | Defined only when alpha < omega_0. Always smaller than omega_0. |
| Overdamped response | $x(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}$ | alpha > omega_0. Two time constants; the slow one dominates late in the decay. |
| Critically damped response | $x(t) = (A_1 + A_2 t)\,e^{-\alpha t}$ | alpha = omega_0. The t-multiplied term is mandatory; two plain exponentials cannot satisfy both initial conditions. |
| Underdamped response | $x(t) = e^{-\alpha t}\left(A_1\cos\omega_d t + A_2\sin\omega_d t\right)$ | alpha < omega_0. Envelope e^{-alpha t}, ringing at omega_d. |
| Quality factor | $Q = \frac{\omega_0}{2\alpha}$ | Q = 1/2 is critical damping; Q > 1/2 rings. Series: Q = omega_0 L / R. |
| Series initial slope | $L\,\frac{di}{dt}\Big\lvert _{0^+} = -v_C(0^+) - R\,i_L(0^+)$ | How the second constant is obtained when the excitation is the capacitor voltage. |
| Critical resistance, series | $R_{crit} = 2\sqrt{\frac{L}{C}}$ | From alpha = omega_0 with alpha = R/(2L). |
| Critical resistance, parallel | $R_{crit} = \frac{1}{2}\sqrt{\frac{L}{C}}$ | From alpha = omega_0 with alpha = 1/(2RC). Four times smaller than the series value. |

## Worked Problems

### P1. A series RLC circuit has $R = 2\,\Omega$, $L = 1\,\mathrm{H}$ and $C = 0.25\,\mathrm{F}$. Find $\alpha$, $\omega_0$, the damping case, $\omega_d$, and the characteristic roots.

**Given:** R = 2 Ω; L = 1 H; C = 0.25 F; series

**Solution:**

1. alpha = R/(2L) = 2/(2 x 1) = 1 Np/s
2. omega_0 = 1/sqrt(LC) = 1/sqrt(0.25) = 2 rad/s
3. alpha < omega_0 (1 < 2), so the circuit is underdamped
4. omega_d = sqrt(omega_0^2 - alpha^2) = sqrt(4 - 1) = 1.732 rad/s
5. Roots: s = -1 +/- j1.732

> [!success]- Answer
> **$\alpha = 1\,\mathrm{Np/s}$, $\omega_0 = 2\,\mathrm{rad/s}$, underdamped with $\omega_d = 1.732\,\mathrm{rad/s}$ and roots $-1 \pm j1.732$**

> [!warning] Trap
> Using $\alpha = 1/(2RC)$ for a series circuit. The two alpha formulas belong to different topologies; mixing them swaps the damping verdict whenever R is far from the critical value.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `2÷(2×1) : 1÷√(1×0.25) : Ans²−1²`
> 2. **1** Np/s → $\omega_0$ = **2** rad/s → $\omega_d^2$ = **3**, so $\omega_d$ = **1.732** rad/s (the $1^2$ in the last chunk is $\alpha^2$). Since $\alpha<\omega_0$ the response is underdamped.
> 3. Roots follow from those two numbers: `−1` ± `j1.732`, i.e. s = **−1 ± j1.732**.

### P2. A parallel RLC circuit has $R = 5\,\Omega$, $L = 1\,\mathrm{H}$ and $C = 0.1\,\mathrm{F}$. Find $\alpha$, $\omega_0$, $\omega_d$ and classify the response.

**Given:** R = 5 Ω; L = 1 H; C = 0.1 F; parallel

**Solution:**

1. alpha = 1/(2RC) = 1/(2 x 5 x 0.1) = 1/(1.0) = 1 Np/s
2. omega_0 = 1/sqrt(LC) = 1/sqrt(0.1) = 3.162 rad/s
3. alpha < omega_0, so underdamped
4. omega_d = sqrt(10 - 1) = 3 rad/s; roots s = -1 +/- j3

> [!success]- Answer
> **$\alpha = 1\,\mathrm{Np/s}$, $\omega_0 = 3.162\,\mathrm{rad/s}$, $\omega_d = 3\,\mathrm{rad/s}$, underdamped**

> [!warning] Trap
> Reading a large parallel R as heavy damping. In a parallel circuit $\alpha = 1/(2RC)$, so increasing R reduces damping — the exact opposite of the series case.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `1÷(2×5×0.1) : 1÷√(1×0.1) : Ans²−1²`
> 2. **1** Np/s → $\omega_0$ = **3.162** rad/s → $\omega_d^2$ = **9**, so $\omega_d$ = **3** rad/s, underdamped. Roots s = **−1 ± j3**.

### P3. A series RLC circuit has $L = 1\,\mathrm{H}$ and $C = 1\,\mathrm{F}$. What value of $R$ gives critical damping, and what is the repeated root?

**Given:** L = 1 H; C = 1 F; series; critical damping required

**Solution:**

1. Critical damping requires alpha = omega_0
2. omega_0 = 1/sqrt(1 x 1) = 1 rad/s
3. R/(2L) = 1 → R = 2L = 2 Ω
4. The repeated root is s = -alpha = -1 rad/s (double root)

> [!success]- Answer
> **$R = 2\,\Omega$ gives critical damping with a double root at $s = -1$**

> [!warning] Trap
> Using $R = \sqrt{L/C} = 1\,\Omega$. Critical damping needs $\alpha = \omega_0$, i.e. $R/(2L) = 1/\sqrt{LC}$, which gives $R = 2\sqrt{L/C}$ — the factor of 2 comes from the $2\alpha s$ term.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Set $\alpha=\omega_0$: `1÷√(1×1)` → $\omega_0$ = **1** rad/s, then `2×1×Ans` → $R$ = **2** Ω.
> 2. The repeated root is $s=-\alpha$ = **−1** rad/s (double).

### P4. A parallel RLC circuit has $R = 0.5\,\Omega$, $L = 1\,\mathrm{H}$, $C = 1\,\mathrm{F}$, with $v(0) = 10\,\mathrm{V}$ and $i_L(0) = 0$. Find $v(t)$ for $t \ge 0$.

**Given:** R = 0.5 Ω; L = 1 H; C = 1 F; parallel; v(0) = 10 V; i_L(0) = 0

**Solution:**

1. alpha = 1/(2RC) = 1/(2 x 0.5 x 1) = 1 Np/s; omega_0 = 1 rad/s, so alpha = omega_0: critically damped
2. Assume v(t) = (A + Bt)e^{-t}
3. Continuity of capacitor voltage: v(0) = A = 10 V
4. KCL at t = 0: C v'(0) + v(0)/R + i_L(0) = 0 → v'(0) = -(10/0.5)/1 = -20 V/s
5. Differentiate: v'(0) = B - A = -20 → B = -20 + 10 = -10
6. v(t) = (10 - 10t)e^{-t} V

> [!success]- Answer
> **$v(t) = (10 - 10t)e^{-t}\,\mathrm{V}$, zero at $t = 1\,\mathrm{s}$**

> [!warning] Trap
> Writing two plain exponentials $A_1e^{-t} + A_2e^{-t}$ for the critically damped case. A repeated root needs the $t$-multiplied second solution $(A + Bt)e^{-\alpha t}$; two identical exponentials cannot satisfy two independent initial conditions.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. $\alpha$ and $\omega_0$ in one chain with `ALPHA` `:` — `1÷(2×0.5×1) : 1÷√(1×1)` → both **1**, so critical damping.
> 2. Initial slope from the KCL constraint: `(10÷0.5+0)÷1` = **20** V/s, and $B-A=-20$ with $A=10$ gives $B$ = **−10**.
> 3. So $v(t) = (10-10t)e^{-t}$ V, zero at $t = 1$ s where `10−10×1` = **0**.

### P5. A series RLC circuit has $R = 5\,\Omega$, $L = 1\,\mathrm{H}$, $C = 0.25\,\mathrm{F}$. With $i(0) = 0$ and $di/dt|_{0^+} = 10\,\mathrm{A/s}$, find $i(t)$.

**Given:** R = 5 Ω; L = 1 H; C = 0.25 F; series; i(0) = 0; di/dt(0+) = 10 A/s

**Solution:**

1. alpha = R/(2L) = 2.5 Np/s; omega_0 = 1/sqrt(0.25) = 2 rad/s; alpha > omega_0: overdamped
2. Roots: s = -2.5 +/- sqrt(6.25 - 4) = -2.5 +/- 1.5 → s1 = -1, s2 = -4
3. Assume i(t) = A e^{-t} + B e^{-4t}
4. i(0) = A + B = 0 → B = -A
5. i'(0) = -A - 4B = -A + 4A = 3A = 10 → A = 3.333, B = -3.333
6. i(t) = 3.333(e^{-t} - e^{-4t}) A

> [!success]- Answer
> **$i(t) = 3.333\left(e^{-t} - e^{-4t}\right)\,\mathrm{A}$**

> [!warning] Trap
> Applying the derivative condition with the same sign for both terms. Each exponential differentiates to its own (negative) root: $i'(0) = s_1A + s_2B$, so the two roots must be carried separately.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Discriminant first, then both roots: one line with `ALPHA` `:` — `5÷(2×1) : 1÷√(1×0.25) : Ans²−2.5²`
> 2. **2.5** Np/s, $\omega_0$ = **2** rad/s, $\alpha^2-\omega_0^2$ = **2.25**, so the roots are `−2.5±1.5` = **−1** and **−4** (overdamped, hence the positive $\alpha^2-\omega_0^2$).
> 3. Coefficients from $i'(0)=10$: `10÷(4−1)` → $A$ = **3.333**, $B$ = **−3.333**, so $i(t) = 3.333(e^{-t}-e^{-4t})$ A.

### P6. A series RLC circuit has $R = 1\,\Omega$, $L = 1\,\mathrm{H}$, $C = 1\,\mathrm{F}$. With $i(0) = 0$ and $di/dt|_{0^+} = 10\,\mathrm{A/s}$, find $i(t)$.

**Given:** R = 1 Ω; L = 1 H; C = 1 F; series; i(0) = 0; di/dt(0+) = 10 A/s

**Solution:**

1. alpha = 1/(2) = 0.5 Np/s; omega_0 = 1 rad/s; alpha < omega_0: underdamped
2. omega_d = sqrt(1 - 0.25) = 0.866 rad/s; roots s = -0.5 +/- j0.866
3. Assume i(t) = e^{-0.5t}(A cos 0.866t + B sin 0.866t)
4. i(0) = A = 0
5. i'(t) = e^{-0.5t}(-0.5 B sin 0.866t + 0.866 B cos 0.866t); at t = 0, i'(0) = 0.866B = 10
6. B = 11.547, so i(t) = 11.55 e^{-0.5t} sin(0.866t) A

> [!success]- Answer
> **$i(t) = 11.55\,e^{-0.5t}\sin(0.866t)\,\mathrm{A}$**

> [!warning] Trap
> Forgetting that the exponential factor also differentiates. The product rule produces the $-\alpha B\sin$ term from $e^{-\alpha t}$, but at $t = 0$ only the $\omega_dB\cos$ term survives — dropping $e^{-\alpha t}$ from the derivative altogether loses B.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `1÷(2×1) : 1÷√(1×1) : 1²−Ans²`
> 2. **0.5** Np/s, $\omega_0$ = **1** rad/s, $\omega_0^2-\alpha^2$ = **0.75**, so $\omega_d$ = **0.866** rad/s and $\alpha<\omega_0$: underdamped.
> 3. The derivative condition gives $B\omega_d=10$, so `10÷0.866` → $B$ = **11.547** and $i(t) = 11.55e^{-0.5t}\sin(0.866t)$ A.

### P7. An ideal LC circuit (no resistance) has $L = 1\,\mathrm{H}$ and $C = 0.01\,\mathrm{F}$. Find $\omega_0$, the frequency in hertz and the period of oscillation.

**Given:** L = 1 H; C = 0.01 F; R = 0 (undamped)

**Solution:**

1. omega_0 = 1/sqrt(1 x 0.01) = 1/0.1 = 10 rad/s
2. f_0 = omega_0/(2 pi) = 10/6.2832 = 1.592 Hz
3. T = 1/f_0 = 2 pi/omega_0 = 6.2832/10 = 0.6283 s

> [!success]- Answer
> **$\omega_0 = 10\,\mathrm{rad/s}$, $f_0 = 1.59\,\mathrm{Hz}$, $T = 0.628\,\mathrm{s}$**

> [!warning] Trap
> Reporting $\omega_0 = 10\,\mathrm{rad/s}$ as the frequency in hertz. Angular frequency and cyclic frequency differ by the factor $2\pi$; the board question usually asks for one and expects the other to be labelled.

### P8. A source-free second-order circuit has characteristic roots $s_{1,2} = -2 \pm j5$. Find $\alpha$, $\omega_d$, $\omega_0$ and classify the damping.

**Given:** s1,2 = -2 ± j5

**Solution:**

1. Comparing with s = -alpha +/- j omega_d gives alpha = 2 Np/s and omega_d = 5 rad/s
2. omega_0 = sqrt(alpha^2 + omega_d^2) = sqrt(4 + 25) = sqrt(29)
3. omega_0 = 5.385 rad/s
4. Since the roots are complex, the circuit is underdamped

> [!success]- Answer
> **$\alpha = 2\,\mathrm{Np/s}$, $\omega_d = 5\,\mathrm{rad/s}$, $\omega_0 = 5.385\,\mathrm{rad/s}$, underdamped**

> [!warning] Trap
> Computing $\omega_0$ as $\sqrt{\omega_d^2 - \alpha^2} = \sqrt{21}$. For complex roots $\omega_0^2 = \alpha^2 + \omega_d^2$; the minus sign belongs to the overdamped (real-root) case.

### P9. A parallel RLC circuit has $R = 100\,\Omega$, $L = 0.1\,\mathrm{H}$ and $C = 10\,\mu\mathrm{F}$. Find $\alpha$, $\omega_0$, $\omega_d$ and the quality factor $Q$.

**Given:** R = 100 Ω; L = 0.1 H; C = 10 μF; parallel

**Solution:**

1. alpha = 1/(2RC) = 1/(2 x 100 x 10e-6) = 1/(2e-3) = 500 Np/s
2. omega_0 = 1/sqrt(LC) = 1/sqrt(0.1 x 10e-6) = 1/sqrt(1e-6) = 1000 rad/s
3. alpha < omega_0: underdamped
4. omega_d = sqrt(1e6 - 2.5e5) = sqrt(750000) = 866 rad/s
5. Q = omega_0/(2 alpha) = 1000/1000 = 1

> [!success]- Answer
> **$\alpha = 500\,\mathrm{Np/s}$, $\omega_0 = 1000\,\mathrm{rad/s}$, $\omega_d = 866\,\mathrm{rad/s}$, $Q = 1$**

> [!warning] Trap
> Mixing microfarads into the omega_0 calculation as $10\,\mathrm{F}$. $10\,\mu\mathrm{F} = 10\times10^{-6}\,\mathrm{F}$; dropping the prefix makes $\omega_0$ a thousand times too small and flips the damping verdict.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `1÷(2×100×10E-6) : 1÷√(0.1×10E-6) : Ans²−500²` (the 500 in the last chunk is the $\alpha$ the first chunk returned)
> 2. **500** Np/s → $\omega_0$ = **1000** rad/s → $\omega_0^2-\alpha^2$ = **750000**, so `√Ans` → $\omega_d$ = **866** rad/s and the response is underdamped.
> 3. Then `1000÷(2×500)` → $Q$ = **1**, which is also $\omega_0/(2\alpha)$.
>
> Use the `EXP` key for the µ (10E-6); writing the $\mu\mathrm{F}$ value as 10 µF directly is where the decimal slips.

### P10. For the underdamped series circuit with $R = 1\,\Omega$, $L = 1\,\mathrm{H}$, $C = 1\,\mathrm{F}$ whose current is $i(t) = 11.55e^{-0.5t}\sin(0.866t)\,\mathrm{A}$, find the time of the first current peak and the peak current.

**Given:** alpha = 0.5 Np/s; omega_d = 0.866 rad/s; B = 11.55 A

**Solution:**

1. The peak occurs where di/dt = 0, which for a damped sinusoid gives tan(omega_d t) = omega_d/alpha
2. tan(0.866 t) = 0.866/0.5 = 1.732 → 0.866 t = 1.0472 rad (60 degrees)
3. t_peak = 1.0472/0.866 = 1.209 s
4. i_peak = 11.55 e^{-0.5(1.209)} sin(1.0472) = 11.55 x 0.5462 x 0.8660
5. i_peak = 5.46 A

> [!success]- Answer
> **$t_{peak} = 1.209\,\mathrm{s}$ and $i_{peak} = 5.46\,\mathrm{A}$**

> [!warning] Trap
> Taking the first peak at $t = T/4$ or at $\pi/(2\omega_d)$. Damping shifts the peak earlier than a quarter period; the correct condition is $\tan(\omega_dt) = \omega_d/\alpha$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `tan⁻¹(0.866÷0.5) : Ans÷0.866 : 11.55×e^-(0.5×Ans)×sin(0.866×Ans)`
> 2. The peak needs $\tan(\omega_d t)=\omega_d/\alpha$: angle = **1.0472** rad → $t_{peak}$ = **1.209** s → $i_{peak}$ = **5.46** A.
> 3. `MODE` `6` TABLE sweeping $t$ from 0 to 3 s in 0.1 s steps shows the same single maximum near $t$ = **1.2** s.
>
> Set the calculator to radians before the arctangent, or the 1.0472 rad answer comes out as 60 and the peak time is off by 57×.

## Traps & Exam Notes

- **Swapping the two alpha formulas.** $\alpha = R/(2L)$ is the series circuit and $\alpha = 1/(2RC)$ is the parallel circuit. Using the parallel formula on a series circuit inverts the damping conclusion whenever R is on the wrong side of critical.
- **Treating a critical response as two equal exponentials.** The repeated root requires $(A+Bt)e^{-\alpha t}$. Writing $A_1e^{-\alpha t} + A_2e^{-\alpha t}$ collapses to one constant and cannot meet two initial conditions.
- **Assuming $\omega_d$ exists in every case.** $\omega_d = \sqrt{\omega_0^2-\alpha^2}$ is defined only when $\alpha < \omega_0$. For $\alpha \ge \omega_0$ the square root is real (or zero) and there is no oscillation to describe.
- **Getting the sign inside the $\omega_0$/root relation wrong.** For complex roots $\omega_0^2 = \alpha^2 + \omega_d^2$; for real roots $\omega_0^2 = \alpha^2 - \beta^2$ where the roots are $-\alpha \pm \beta$. Using the wrong one gives a different, plausible-looking $\omega_0$.
- **Initial conditions on the wrong variable.** $v_C$ and $i_L$ are the continuous quantities. $i_R$, $v_L$ and $v_R$ can jump at $t = 0$; quoting one of them as an initial condition is invalid.
- **Dropping $e^{-\alpha t}$ when differentiating.** The product rule contributes $-\alpha(\ldots)$ terms that matter for the second constant, even though at $t = 0$ only the $\omega_d$ term survives.
- **Reading a large parallel R as heavy damping.** In parallel, $\alpha = 1/(2RC)$: increasing R *reduces* damping. Only in series does more resistance mean more damping.
- **Undamped response treated as decaying.** With $R = 0$, $\alpha = 0$ and the oscillation has constant amplitude — energy circulates between L and C indefinitely.

## See Also

- [[11_First_Order_RC_and_RL_Transients]]
- [[10_Inductors,_Capacitors_and_Energy]]
- [[07_Laplace_Transform_Pairs]]
- [[11_RLC_Circuit_Transients]]

---

[[11_First_Order_RC_and_RL_Transients|⬅ 11]] · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
