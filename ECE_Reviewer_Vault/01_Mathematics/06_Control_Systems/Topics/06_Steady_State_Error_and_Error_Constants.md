---
id: MATH-06-06
title: "Steady State Error and Error Constants"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Block_Diagram_Reduction]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Steady State Error and Error Constants

> [!abstract] Scope
> Compute the steady-state error of a stable feedback loop to step, ramp and parabolic inputs from its static error constants.

## Core Concept

> [!tip] Intuition
> Steady-state error is what is left at the summing junction after all the transients have died. It is set by how much gain the loop has at zero frequency — a constant for a step, a $1/s$ factor for a ramp, a $1/s^2$ factor for a parabola.

**Where the error comes from.** With negative feedback and reference $R$, the signal at the summing junction is $E=\dfrac{R}{1+G(s)H(s)}$. The final value theorem gives the steady-state value:
$$e_{ss}=\lim_{s\to0}sE(s)=\lim_{s\to0}\dfrac{sR(s)}{1+G(s)H(s)}$$
The initial-value/final-value machinery is the only tool needed, and it applies to the *actual* error at the comparator — not automatically to $r-y$ when $H\neq1$.

**The three static error constants.** $K_p=\lim_{s\to0}G(s)H(s)$ (position), $K_v=\lim_{s\to0}sG(s)H(s)$ (velocity), $K_a=\lim_{s\to0}s^2G(s)H(s)$ (acceleration). Each is a number, possibly 0 or $\infty$, obtained by a limit, never by substitution of $s=0$ into a formula that has a pole there. Then $e_{ss}=\dfrac{1}{1+K_p}$ for a unit step, $\dfrac{1}{K_v}$ for a unit ramp and $\dfrac{1}{K_a}$ for a unit parabola.

**Why the limits work.** $K_p$ measures the DC gain of the loop: a large DC gain makes the step error small. $K_v$ measures the loop gain per unit of frequency — it exists only if the loop has at least one pole at the origin, because that pole cancels the $s$ from the ramp's $1/s^2$ transform. Similarly $K_a$ needs two poles at the origin. This is the entire content of 'system type'.

**Validity requires stability.** The final value theorem gives the limit of $e(t)$ only if $sE(s)$ has all poles in the left half plane. If the closed loop is unstable, the algebra still produces a finite number and that number is a lie. Always run Routh-Hurwitz on the characteristic equation before quoting $e_{ss}$ — a board question that gives you a gain and asks for error often hides an unstable gain.

**Non-unity feedback.** With $H\neq1$ every constant is still built from $G(s)H(s)$, so the comparator error for a unit step is $\dfrac{1}{1+K_p}$ with $K_p=\lim_{s\to0}G(s)H(s)$ — not $G(0)$. The output itself then follows from $y(\infty)=\dfrac{G(0)}{1+G(0)H(0)}$, and $r-y(\infty)$ is a *different* number from the comparator error whenever $H(0)\neq1$. Read the question to see which one it wants.

**Disturbances.** A disturbance entering at the plant input produces $Y=\dfrac{G_d(s)}{1+G(s)H(s)}D(s)$. The same machinery applies, but the location of the disturbance relative to any integrator is what determines whether it is rejected: an integrator *upstream* of the disturbance entry point drives the steady output contribution to zero.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Steady-state error | $e_{ss} = \lim_{s\to0} s E(s) = \lim_{s\to0} \frac{s R(s)}{1 + G(s)H(s)}$ | Valid only if the closed loop is stable (all CE roots in the LHP). |
| Position error constant | $K_p = \lim_{s\to0} G(s)H(s)$ | DC gain of the loop. Infinite when GH has any pole at the origin. |
| Velocity error constant | $K_v = \lim_{s\to0} s G(s)H(s)$ | Unit s^-1. Zero if GH has no pole at the origin. |
| Acceleration error constant | $K_a = \lim_{s\to0} s^2 G(s)H(s)$ | Unit s^-2. Finite only for type 2 or higher. |
| Step error | $e_{ss} = \frac{1}{1 + K_p}$ | Unit step input. Zero when Kp is infinite. |
| Ramp error | $e_{ss} = \frac{1}{K_v}$ | Unit ramp. Infinite when Kv = 0 (type 0). |
| Parabolic error | $e_{ss} = \frac{1}{K_a}$ | Unit parabola r(t) = t^2/2. Infinite for type 0 and type 1. |
| Error at the comparator | $E(s) = \frac{R(s)}{1 + G(s)H(s)}$ | This is the signal after the summing junction, for negative feedback. |
| Closed-loop DC output, non-unity H | $y(\infty) = \frac{G(0)}{1 + G(0)H(0)}$ | Unit step. The comparator error is 1/(1+Kp) with Kp = G(0)H(0); the two differ when H(0) is not 1. |
| Disturbance response | $Y(s) = \frac{G_d(s)}{1 + G(s)H(s)} D(s)$ | Gd is the path from the disturbance to the output; check its own zero-frequency gain. |

## Worked Problems

### P1. A unity-feedback loop has $G(s)=\dfrac{100}{s(s+10)}$. Find the steady-state error for a unit step and for a unit ramp.

**Given:** G(s) = 100/(s(s+10)); unity feedback; stable closed loop

**Solution:**

1. Step: $K_p = \lim_{s\to0}\dfrac{100}{s(s+10)} = \infty$ (a pole at the origin), so $e_{ss} = 0$
2. Ramp: $K_v = \lim_{s\to0} s\cdot\dfrac{100}{s(s+10)} = \dfrac{100}{10} = 10\ \mathrm{s^{-1}}$
3. $e_{ss} = 1/K_v = 0.1$
4. Stability check: CE is $s^2+10s+100 = 0$, poles $-5\pm j8.66$ — stable, so both answers are valid

> [!success]- Answer
> **Step error $0$; ramp error $0.1$.**

> [!warning] Trap
> Substituting $s=0$ into $G(s)$ to get $K_p$ and declaring it infinite for the ramp case too. Each input uses its own constant, with its own power of $s$.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. Stability first: `MODE` `5` page 2 `1` with `1`, `10`, `100` (the CE $s^2+10s+100$) → $x=-5\pm j8.66$, both left half plane, so the error constants are meaningful.
> 2. `100÷10 : 1÷Ans` → $K_v=$ **10** s⁻¹ → $e_{ss}=1/K_v=$ **0.1** for the unit ramp; the step error is **0** because the pole at the origin makes $K_p=\infty$.

### P2. A unity-feedback loop has $G(s)=\dfrac{50}{(s+2)(s+5)}$. Find the steady-state error to a unit step.

**Given:** G(s) = 50/((s+2)(s+5)); unit step

**Solution:**

1. $K_p = \lim_{s\to0}\dfrac{50}{(s+2)(s+5)} = \dfrac{50}{10} = 5$
2. $e_{ss} = \dfrac{1}{1+K_p} = \dfrac{1}{6}$
3. $e_{ss} = 0.1667$
4. Closed-loop CE: $(s+2)(s+5)+50 = s^2+7s+60$, roots $-3.5\pm j6.9$ — stable

> [!success]- Answer
> **$e_{ss} = 1/6 \approx 0.167$.**

> [!warning] Trap
> Writing $e_{ss} = 1/K_p = 0.2$. The step error is $1/(1+K_p)$ — the direct path contributes the '1'.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `50÷(2×5) : 1÷(1+Ans)` → $K_p=$ **5** → $e_{ss}=1/(1+K_p)=$ **0.1667**, i.e. $1/6$.
> 2. `MODE` `5` page 2 `1` with `1`, `7`, `60` (the CE $(s+2)(s+5)+50$) → $x=-3.5\pm j6.9$, stable, so the value stands.

### P3. A unity-feedback loop has $G(s)=\dfrac{100(s+5)}{s^2(s+10)}$. Find $K_v$, the ramp error, $K_a$ and the parabolic error, after confirming stability.

**Given:** G(s) = 100(s+5)/(s^2(s+10)); type 2

**Solution:**

1. Stability first: CE $= s^2(s+10) + 100(s+5) = s^3+10s^2+100s+500$
2. Routh: $s^1$ entry $= \dfrac{10(100)-500}{10} = 50 > 0$, and all other first-column entries ($1, 10, 50, 500$) are positive — stable, so the error values are meaningful
3. $K_v = \lim_{s\to0} s\cdot\dfrac{100(s+5)}{s^2(s+10)} = \lim_{s\to0}\dfrac{100(s+5)}{s(s+10)} = \infty$, so the ramp error is $0$
4. $K_a = \lim_{s\to0}s^2\cdot\dfrac{100(s+5)}{s^2(s+10)} = \dfrac{100(5)}{10} = 50\ \mathrm{s^{-2}}$
5. $e_{ss} = 1/K_a = 1/50 = 0.02$ for a unit parabola

> [!success]- Answer
> **$K_v=\infty$ (ramp error $0$); $K_a = 50\ \mathrm{s^{-2}}$, parabolic error $0.02$.**

> [!warning] Trap
> Computing $K_a$ from the numerator constant alone. $K_a = 100(5)/10$ uses the ratio of the low-frequency numerator to the remaining denominator — dropping the $(s+5)$ gives a wrong 10.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `100×5÷10 : 1÷Ans` → $K_a=$ **50** s⁻² → $e_{ss}=1/K_a=$ **0.02** for a unit parabola ($K_v=\infty$, so the ramp error is 0).
> 2. `MODE` `5` page 2 `2` (cubic) with `1`, `10`, `100`, `500` → $x=$ **-6.478**, **-1.761±j8.607** — every real part negative, so the Routh array is replaced by reading the roots.

### P4. A loop has $G(s)=\dfrac{20}{s+4}$ and $H(s)=2$ (negative feedback). Find the steady-state error at the summing junction and the steady-state output for a unit step.

**Given:** G = 20/(s+4); H = 2; unit step

**Solution:**

1. $G(s)H(s) = \dfrac{40}{s+4}$
2. $K_p = \lim_{s\to0}\dfrac{40}{s+4} = 10$
3. Comparator error: $e_{ss} = \dfrac{1}{1+10} = \dfrac{1}{11} = 0.0909$
4. $G(0) = 20/4 = 5$, so $y(\infty) = \dfrac{G(0)}{1+K_p} = \dfrac{5}{11} = 0.4545$
5. Check: $r-Hy = 1 - 2(0.4545) = 0.0909$, matching the comparator error

> [!success]- Answer
> **Comparator error $1/11 = 0.0909$; $y(\infty) = 5/11 = 0.4545$.**

> [!warning] Trap
> Using $H=1$ out of habit. With $H=2$ the DC loop gain is 10, not 5, so the error is $1/11 = 0.0909$ rather than $1/6 = 0.167$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20×2÷4 : 1÷(1+Ans)` → $K_p=G(0)H(0)=$ **10** → the comparator error $1/(1+K_p)=$ **0.0909**, i.e. $1/11$.
> 2. `5÷11 : 1−2×Ans` → $y(\infty)=$ **0.4545** → **0.0909**, matching $r-Hy$ at the summing junction.

### P5. For $G(s)=\dfrac{K}{s(s+5)(s+10)}$ in unity feedback, find the minimum $K$ that keeps the ramp error at or below $0.01$.

**Given:** G = K/(s(s+5)(s+10)); ramp error <= 0.01; unity feedback

**Solution:**

1. $K_v = \lim_{s\to0}s\cdot\dfrac{K}{s(s+5)(s+10)} = \dfrac{K}{50}$
2. $e_{ss} = \dfrac{1}{K_v} = \dfrac{50}{K} \le 0.01$
3. $K \ge 50/0.01 = 5000$
4. Stability check (required): CE $= s(s+5)(s+10)+K = s^3+15s^2+50s+K$; Routh needs $15(50) > K$, i.e. $K < 750$
5. The accuracy requirement $K\ge5000$ contradicts the stability limit $K<750$: no such $K$ exists

> [!success]- Answer
> **No $K$ satisfies both. Accuracy needs $K\ge5000$; stability needs $K<750$. The design must be changed (add a compensator).**

> [!warning] Trap
> Answering $K = 5000$ and stopping. A steady-state-error answer is meaningless without confirming that the gain keeps the loop stable — the two requirements usually pull in opposite directions.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `50÷0.01` → the accuracy requirement $K\ge 50/0.01=$ **5000**, from $e_{ss}=50/K\le 0.01$.
> 2. `15×50` → the Routh cross-term $a_2a_1=15(50)=$ **750**, so stability needs $K<750$: the two conditions are incompatible and no such $K$ exists.

## Traps & Exam Notes

- **Quoting $e_{ss}$ for an unstable loop.** The final value theorem requires every pole of $sE(s)$ in the left half plane. Run Routh first.
- **Using $e_{ss}=1/K_p$.** The step error is $1/(1+K_p)$; the '1' is the direct path and cannot be dropped.
- **Reaching for the wrong constant.** Step uses $K_p$, ramp uses $K_v$, parabola uses $K_a$. A type-0 loop has $K_v=0$, so its ramp error is infinite, not zero.
- **Treating $\infty$ carelessly.** $K_v=\infty$ gives zero error; $K_v=0$ gives infinite error. These are opposite conclusions from the same symbol-swap.
- **Forgetting H in the loop gain.** Every constant is built from $G(s)H(s)$, not $G(s)$ alone.
- **Confusing comparator error with output error.** With $H\neq1$ they differ by $H(0)$.
- **Assuming a large gain always helps.** Raising $K$ lowers the error but pushes the roots right; the Routh bound usually makes the achievable error far worse than requested.
- **Placing the disturbance integrator downstream.** An integrator after the disturbance entry point does not reject that disturbance; only an integrator between the disturbance and the output does.

## See Also

- [[07_System_Types_and_Error_Analysis]]
- [[02_Block_Diagram_Reduction]]
- [[12_PID_Controllers_and_Tuning]]

---

[[05_Second_Order_Specifications|⬅ 05]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[07_System_Types_and_Error_Analysis|07 ➡]]
