---
title: "Control Systems — Drill"
type: drill
area: 06_Control_Systems
part: 01_Mathematics
seed: 1
count: 8
pool: 70
updated: 2026-09-23
---

# Control Systems — Practice Drill

**8 problems** drawn from a pool of 70 across 14 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 06_Control_Systems --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. At DC a loop has $G(0)H(0) = 100$. Find the sensitivity, the complementary sensitivity, and the steady-state error to a unit step.

**Given:** GH(0) = 100; unity step

> [!success]- Answer
> **$S(0)=0.0099$, $T(0)=0.9901$, $e_{ss}=0.0099$ — the step error equals the DC sensitivity.**

> [!warning] Trap
> Reporting $e_{ss}=1/100=0.01$ from $K_p$ alone. The step error is $S(0)=1/(1+K_p)$, so a DC loop gain of 100 buys a 0.99% error, not 1%.

<sub>from MATH-06-07</sub>

### 2. For $G(s)H(s)=\dfrac{K}{s(s+4)}$, find the breakaway point and its gain, and the gain that gives $\zeta = 0.5$.

**Given:** GH = K/(s(s+4))

> [!success]- Answer
> **Breakaway at $s=-2$ with $K=4$; the $\zeta=0.5$ ray is met at $K=16$ (poles $-2\pm j3.464$).**

> [!warning] Trap
> Using $t_p$ or $M_p$ formulas instead of the geometry. On the locus, $\zeta=\cos\theta$ from the negative real axis, and for this plant $\zeta = 2/\sqrt{K}$ — setting it to 0.5 gives $K=16$ in one line.

<sub>from MATH-06-09</sub>

### 3. For $G(s)=\dfrac{K}{s(s+1)}$ in unity feedback, use the Nyquist plot to determine whether the closed loop is stable for all $K>0$.

**Given:** G = K/(s(s+1)); all K > 0

> [!success]- Answer
> **Stable for all $K>0$: the plot never crosses the negative real axis, so $GM=\infty$.**

> [!warning] Trap
> Assuming a loop with an integrator plus one pole must be conditionally stable. The phase only approaches $-180^\circ$, so the crossing never occurs and there is no gain limit.

<sub>from MATH-06-11</sub>

### 4. A type-1 loop has $K_v = 20\ \mathrm{s^{-1}}$. Find the steady-state error for $r(t)=3t$ and for $r(t)=5u(t)$.

**Given:** type 1; Kv = 20 /s; ramp slope 3; step height 5

> [!success]- Answer
> **Step error $0$; ramp error $0.15$.**

> [!warning] Trap
> Reporting $1/K_v = 0.05$ for the $3t$ input. Every error constant is defined for the *unit* input; a scaled input multiplies the error by the same factor.

<sub>from MATH-06-07</sub>

### 5. A first-order block $G(s)=\dfrac{1}{2s+1}$ is driven by the unit ramp $r(t)=t$, $t\ge0$. Find the steady-state output, the lag relative to the input, and the steady-state error magnitude.

**Given:** G(s) = 1/(2s+1); r(t) = t

> [!success]- Answer
> **$y_{ss}(t) = t-2$: a lag of $2\ \mathrm{s}$ and a steady error of $2$ (that is, $K\tau = 2$).**

> [!warning] Trap
> Concluding the error goes to zero because the exponential decays. The output tracks a ramp of the same slope but with a permanent constant offset of $K\tau$.

<sub>from MATH-06-04</sub>

### 6. For $G(s)=\dfrac{50}{s(s+1)(s+5)}$ in unity feedback, find the gain margin in dB and state whether the closed loop is stable.

**Given:** G = 50/(s(s+1)(s+5)); unity feedback

> [!success]- Answer
> **$GM = -18.4\ \mathrm{dB}$ (i.e. $GM = 0.12$); the closed loop is *unstable*.**

> [!warning] Trap
> Reporting $GM = +18.4\ \mathrm{dB}$ by dropping the minus sign. Gain margin is defined as $-20\log\lvert G(j\omega_{pc})\rvert$: when $\lvert G\rvert > 1$ at the phase crossover, the margin is negative and the loop is unstable.

<sub>from MATH-06-10</sub>

### 7. For $G(s)H(s)=\dfrac{K}{s(s+2)(s+4)}$, find the asymptote angles and centroid, the breakaway point and the gain there.

**Given:** GH = K/(s(s+2)(s+4))

> [!success]- Answer
> **Asymptotes at $60^\circ,180^\circ,300^\circ$ meeting at $\sigma_a=-2$; breakaway at $s=-0.845$ with $K=3.08$.**

> [!warning] Trap
> Reporting both roots of $dK/ds=0$ as breakaway points. $-3.155$ has two poles to its right (at $-2$ and $0$... in fact $-4$ and $-2$), so it is not on the locus at all — the derivative condition is necessary but not sufficient.

<sub>from MATH-06-09</sub>

### 8. A unity-feedback loop has $G(s)=\dfrac{100}{s(s+10)}$. Find the steady-state error for a unit step and for a unit ramp.

**Given:** G(s) = 100/(s(s+10)); unity feedback; stable closed loop

> [!success]- Answer
> **Step error $0$; ramp error $0.1$.**

> [!warning] Trap
> Substituting $s=0$ into $G(s)$ to get $K_p$ and declaring it infinite for the ramp case too. Each input uses its own constant, with its own power of $s$.

<sub>from MATH-06-06</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| MATH-06-01 | System Modeling and Transfer Functions | 5 |
| MATH-06-02 | Block Diagram Reduction | 5 |
| MATH-06-03 | Mason’s Gain Formula | 5 |
| MATH-06-04 | Test Signals and First Order Response | 5 |
| MATH-06-05 | Second Order Specifications | 5 |
| MATH-06-06 | Steady State Error and Error Constants | 5 |
| MATH-06-07 | System Types and Error Analysis | 5 |
| MATH-06-08 | Routh-Hurwitz Criterion | 5 |
| MATH-06-09 | Root Locus Techniques | 5 |
| MATH-06-10 | Bode Plots and Margins | 5 |
| MATH-06-11 | Nyquist Stability Criterion | 5 |
| MATH-06-12 | PID Controllers and Tuning | 5 |
| MATH-06-13 | Lead-Lag Compensator Design | 5 |
| MATH-06-14 | State Space Representation Basics | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
