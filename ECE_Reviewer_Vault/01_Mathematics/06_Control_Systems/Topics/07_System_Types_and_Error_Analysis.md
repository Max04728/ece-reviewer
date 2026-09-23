---
id: MATH-06-07
title: "System Types and Error Analysis"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[06_Steady_State_Error_and_Error_Constants]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — System Types and Error Analysis

> [!abstract] Scope
> Classify a loop by the number of open-loop poles at the origin and use that type to predict accuracy, disturbance rejection and the stability trade-off.

## Core Concept

> [!tip] Intuition
> System type counts how many pure integrations sit in the loop. Each integration buys one order of accuracy (a step, a ramp, a parabola) at the cost of $90^\circ$ of phase — which is exactly why accuracy and stability are always in tension.

**Definition.** The system type is the number of poles of the **open-loop** $G(s)H(s)$ at the origin. Type 0: no integrator. Type 1: one. Type 2: two. It is not the order of the system, not the number of closed-loop poles, and not the number of poles in the plant alone — it is the multiplicity of $s=0$ in the loop transfer function.

**The accuracy table.** Multiplying the loop by $1/s$ converts each error constant into the next one: $K_p=\lim_{s\to0}GH$, $K_v=\lim_{s\to0}sGH$, $K_a=\lim_{s\to0}s^2GH$. So a type-1 loop has $K_p=\infty$ (zero step error) and a finite $K_v$ (finite ramp error), while $K_a=0$ (infinite parabolic error). The three rows of the table are the same limit evaluated with one, two and three powers of $s$.

**Why integrators buy accuracy.** The input transforms carry powers of $1/s$: step $1/s$, ramp $1/s^2$, parabola $1/s^3$. The error is $\dfrac{R(s)}{1+GH}$; the integrator poles in $GH$ cancel those powers in the limit, leaving a finite ratio. Without enough integrators the limit diverges, and the answer is 'infinite error', not 'zero error'.

**Scaling a non-unit input.** A step of height $A$ gives $e_{ss}=A/(1+K_p)$; a ramp of slope $A$ gives $e_{ss}=A/K_v$; a parabola $r(t)=At^2/2$ gives $A/K_a$. Board questions frequently scale the input; do not report the unit-input error.

**Disturbance rejection depends on location.** For a disturbance entering at the plant input, $Y=\dfrac{G}{1+GC}D$. A step disturbance is fully rejected only if the *controller* contains the integrator ($GC\to\infty$ as $s\to0$), because then $G/(1+GC)\to0$. An integrator inside the plant but downstream of the disturbance entry point does not reject that disturbance. Reference tracking and disturbance rejection are different requirements.

**The trade-off, quantified.** Each integrator contributes $-90^\circ$ of phase at all frequencies, so a type-2 loop has at least $180^\circ$ of phase lag built in before the plant poles are counted. Raising the gain to satisfy $K_v$ pushes the gain crossover out to where the phase is worse, so a type-2 loop is always conditionally stable at best. Sensitivity formalises the same trade: $S=\dfrac{1}{1+GH}$ is the fraction of a plant change that appears at the output, and $T=\dfrac{GH}{1+GH}$ is the complementary sensitivity, with $S+T=1$ at every frequency — you cannot make both small at once.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| System type | $\mathrm{type} = \mathrm{number\ of\ poles\ of}\ G(s)H(s)\ \mathrm{at}\ s=0$ | Open-loop poles only. Not the order, not the closed-loop poles. |
| Type 0 accuracy | $e_{ss} = \frac{1}{1+K_p},\ \infty,\ \infty$ | Step, ramp, parabola. Kp finite, Kv = Ka = 0. |
| Type 1 accuracy | $e_{ss} = 0,\ \frac{1}{K_v},\ \infty$ | Step, ramp, parabola. Kp = infinite, Kv finite, Ka = 0. |
| Type 2 accuracy | $e_{ss} = 0,\ 0,\ \frac{1}{K_a}$ | Step, ramp, parabola. Kp = Kv = infinite, Ka finite. |
| Scaled step input | $e_{ss} = \frac{A}{1+K_p}$ | r(t) = A u(t). Scales linearly with the input size. |
| Scaled ramp input | $e_{ss} = \frac{A}{K_v}$ | r(t) = A t. Slope A in units per second. |
| Disturbance at the plant input | $\frac{Y(s)}{D(s)} = \frac{G(s)}{1+G(s)C(s)}$ | Goes to zero for a step disturbance only if C has an integrator. |
| Sensitivity | $S(s) = \frac{1}{1+G(s)H(s)}$ | Fraction of a plant perturbation that reaches the output. |
| Complementary sensitivity | $T(s) = \frac{G(s)H(s)}{1+G(s)H(s)},\quad S+T = 1$ | Small S and small T cannot both hold at the same frequency. |
| Adding an integrator | $\mathrm{type} \to \mathrm{type}+1,\ \mathrm{phase\ lag} + 90^\circ$ | Improves the error constant but eats phase margin; re-check stability. |

## Worked Problems

### P1. A unity-feedback loop has $G(s)=\dfrac{20(s+2)}{s^2(s+10)}$. State the system type, find $K_a$ and the parabolic error, and confirm stability.

**Given:** G(s) = 20(s+2)/(s^2(s+10)); unity feedback

**Solution:**

1. Two poles at $s=0$ (the $s^2$), so the type is 2
2. Type 2 means zero step and ramp error: $K_p = K_v = \infty$
3. $K_a = \lim_{s\to0}s^2\cdot\dfrac{20(s+2)}{s^2(s+10)} = \dfrac{20(2)}{10} = 4\ \mathrm{s^{-2}}$
4. $e_{ss} = 1/K_a = 0.25$ for a unit parabola
5. Stability: CE $= s^2(s+10)+20(s+2) = s^3+10s^2+20s+40$; Routh gives $s^1$ entry $(10\cdot20-40)/10 = 16 > 0$ and first column $1, 10, 16, 40$ — all positive, so stable

> [!success]- Answer
> **Type 2; $K_a = 4\ \mathrm{s^{-2}}$; parabolic error $0.25$; closed loop stable.**

> [!warning] Trap
> Calling this type 3 because the denominator degree is 3, or type 1 by counting only the plant's $s$ factor. Type counts poles at $s=0$: here exactly two.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `20×2÷10 : 1÷Ans` → $K_a=$ **4** s⁻² → $e_{ss}=1/K_a=$ **0.25** for a unit parabola ($K_p=K_v=\infty$ from the $s^2$).
> 2. `MODE` `5` page 2 `2` (cubic) with `1`, `10`, `20`, `40` → $x=$ **-8.148**, **-0.926±j2.013** — all real parts negative, so the loop is stable and the error is real.

### P2. A unity-feedback loop has $G(s)=\dfrac{K}{s(s+3)}$. Find the ramp error as a function of $K$, and the smallest $K$ giving $e_{ss}\le0.02$ for a unit ramp. Check stability.

**Given:** G = K/(s(s+3)); unit ramp; e_ss <= 0.02

**Solution:**

1. Type 1 (one pole at the origin), so the step error is zero
2. $K_v = \lim_{s\to0}s\cdot\dfrac{K}{s(s+3)} = \dfrac{K}{3}$
3. $e_{ss} = \dfrac{1}{K_v} = \dfrac{3}{K}$
4. $\dfrac{3}{K}\le0.02 \Rightarrow K\ge150$
5. Stability: CE $= s^2+3s+K$, roots have real part $-1.5$ for every $K>0$ — stable, so $K\ge150$ is achievable

> [!success]- Answer
> **$e_{ss} = 3/K$; $K\ge150$ gives $e_{ss}\le0.02$; the loop is stable for all $K>0$.**

> [!warning] Trap
> Answering $K = 150$ without the stability check. Here it happens to be fine, but a third-order plant would impose an upper bound on $K$ and the requested accuracy might be impossible.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `3÷0.02` → $e_{ss}=3/K\le 0.02$ needs $K\ge$ **150** (with $K_v=K/3$).
> 2. `MODE` `5` page 2 `1` with `1`, `3`, `150` → $x=-1.5\pm j12.16$; the real part of the pair is $-a_1/2=-1.5$ for every $K>0$, so $K=150$ is stable.
>
> Stability for all $K>0$ follows from that fixed real part — change $K$ and the $x$ pair moves only vertically.

### P3. At DC a loop has $G(0)H(0) = 100$. Find the sensitivity, the complementary sensitivity, and the steady-state error to a unit step.

**Given:** GH(0) = 100; unity step

**Solution:**

1. $S(0) = \dfrac{1}{1+100} = \dfrac{1}{101} = 0.0099$
2. $T(0) = \dfrac{100}{101} = 0.9901$
3. Check: $S+T = 0.0099+0.9901 = 1$
4. $e_{ss} = \dfrac{1}{1+K_p} = \dfrac{1}{101} = 0.0099$, identical to $S(0)$

> [!success]- Answer
> **$S(0)=0.0099$, $T(0)=0.9901$, $e_{ss}=0.0099$ — the step error equals the DC sensitivity.**

> [!warning] Trap
> Reporting $e_{ss}=1/100=0.01$ from $K_p$ alone. The step error is $S(0)=1/(1+K_p)$, so a DC loop gain of 100 buys a 0.99% error, not 1%.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷101` `SHIFT` `STO` `A` `ALPHA` `:` `100÷101` → $S(0)=$ **0.009901** → $T(0)=$ **0.990099**.
> 2. `A+Ans` → **1.0000**, the $S+T=1$ check; the step error $1/(1+K_p)=$ **0.0099** is identical to $S(0)$, not $1/100$.

### P4. A plant $G(s)=\dfrac{10}{s+1}$ is controlled by $C(s)=1$ with a unit step disturbance entering at the plant input. Find the steady-state output due to the disturbance. Then repeat with $C(s)=1+\dfrac{1}{s}$.

**Given:** G = 10/(s+1); step disturbance at plant input; C = 1, then C = 1 + 1/s

**Solution:**

1. With $C=1$: $\dfrac{Y}{D} = \dfrac{G}{1+G} = \dfrac{10}{s+11}$
2. For $D=1/s$: $y_{ss} = \lim_{s\to0}s\cdot\dfrac{10}{s(s+11)} = \dfrac{10}{11} = 0.909$
3. With the integrator: $GC = \dfrac{10}{s+1}\cdot\dfrac{s+1}{s} = \dfrac{10}{s}$
4. $\dfrac{Y}{D} = \dfrac{G}{1+GC} = \dfrac{10/(s+1)}{1+10/s} = \dfrac{10s}{(s+1)(s+10)}$
5. $y_{ss} = \lim_{s\to0}s\cdot\dfrac{10s}{s(s+1)(s+10)} = 0$

> [!success]- Answer
> **With P control only, the disturbance leaves a steady output of $0.909$; with the controller integrator it is rejected exactly ($y_{ss}=0$).**

> [!warning] Trap
> Keeping $C=1$ but expecting zero disturbance error because 'the loop has high gain'. Only a controller integrator ($GC\to\infty$ at DC) drives $G/(1+GC)$ to zero.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10÷11` → with $C=1$, $\dfrac{Y}{D}=\dfrac{10}{s+11}$ and the pole at $-11$ is left half plane, so $y_{ss}=$ **0.9091**.
> 2. With $C=1+1/s$ the path is $\dfrac{10s}{(s+1)(s+10)}$: key it at $s=0$, `10×0÷(1×10)` → **0**, so the controller integrator rejects the step disturbance exactly.

### P5. A type-1 loop has $K_v = 20\ \mathrm{s^{-1}}$. Find the steady-state error for $r(t)=3t$ and for $r(t)=5u(t)$.

**Given:** type 1; Kv = 20 /s; ramp slope 3; step height 5

**Solution:**

1. Step of height 5: $K_p=\infty$ for a type-1 loop, so $e_{ss} = 5/(1+\infty) = 0$
2. Ramp: $R(s) = 3/s^2$, so $e_{ss} = \lim_{s\to0}\dfrac{s\cdot3/s^2}{1+GH} = \dfrac{3}{K_v}$
3. $e_{ss} = 3/20 = 0.15$
4. The unit-input ramp error would have been $1/20 = 0.05$; the slope scales the answer

> [!success]- Answer
> **Step error $0$; ramp error $0.15$.**

> [!warning] Trap
> Reporting $1/K_v = 0.05$ for the $3t$ input. Every error constant is defined for the *unit* input; a scaled input multiplies the error by the same factor.

## Traps & Exam Notes

- **Counting system type as the order of the denominator.** Type is the multiplicity of $s=0$ in $GH$, so $s^2(s+10)$ is type 2, and $(s+1)^3$ is type 0.
- **Confusing 'infinite error' with 'zero error'.** A type-0 loop has $K_v=0$, so its ramp error is $\infty$; a type-1 loop has $K_v=\infty$ only if the numerator does not vanish at the origin.
- **Forgetting that a non-unit input scales the error.** $e_{ss}=A/(1+K_p)$, $A/K_v$, $A/K_a$.
- **Quoting an error constant without a stability check.** $K_v$ is defined from the open loop, so it exists even when the closed loop is unstable — and then the error number is fiction.
- **Assuming an integrator anywhere rejects a disturbance.** Only an integrator *upstream* of the disturbance entry point (i.e. in the controller) drives the disturbance-to-output transfer to zero at DC.
- **Designing for accuracy alone.** Every added integrator costs $90^\circ$ of phase; a type-3 loop is practically impossible to stabilise without heavy compensation.
- **Treating $S$ and $T$ as independently reducible.** $S+T=1$ at every frequency; pushing one down pushes the other up. Measurement noise rides on $T$, plant drift on $S$.

## See Also

- [[06_Steady_State_Error_and_Error_Constants]]
- [[12_PID_Controllers_and_Tuning]]
- [[08_Routh-Hurwitz_Criterion]]

---

[[06_Steady_State_Error_and_Error_Constants|⬅ 06]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Routh-Hurwitz_Criterion|08 ➡]]
