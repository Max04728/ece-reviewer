---
id: MATH-06-12
title: "PID Controllers and Tuning"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_System_Types_and_Error_Analysis]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — PID Controllers and Tuning

> [!abstract] Scope
> Choose proportional, integral and derivative gains and tune them from a plant's ultimate gain or step response using the Ziegler-Nichols rules.

## Core Concept

> [!tip] Intuition
> P sets the speed, I removes the remaining offset, D anticipates the error. Each action has a predictable side effect: I adds lag and costs phase margin, D adds lead but amplifies noise, so tuning is always a trade, never a free lunch.

**What each term does.** Proportional action $K_p e(t)$ raises the loop gain: faster response, smaller (but never zero) steady-state error in a type-0 loop, and eventually oscillation. Integral action $K_i\int e\,dt$ adds a pole at the origin and a zero at $-1/T_i$; it makes the loop one type higher, so a step error becomes exactly zero, but its $-90^\circ$ of phase lag at low frequency erodes the phase margin. Derivative action $K_d\,de/dt$ adds a zero at $-1/T_d$; it anticipates the error, adds phase lead near the crossover and damps the response, but it differentiates sensor noise and produces a 'derivative kick' on a setpoint step.

**Two equivalent parameterisations.** The same controller can be written in either form:
$$G_c(s)=K_p+\dfrac{K_i}{s}+K_d s = K_p\left(1+\dfrac{1}{T_i s}+T_d s\right)$$
The conversions are $K_i=K_p/T_i$ and $K_d=K_pT_d$. The $(K_p,T_i,T_d)$ form is what the tuning tables publish; the $(K_p,K_i,K_d)$ form is what a digital implementation and a block diagram use. Converting between them in both directions is a standard exam item.

**Ziegler-Nichols closed-loop (ultimate gain) method.** With only P control, raise $K_p$ until the loop oscillates continuously; that gain is the ultimate gain $K_u$ and the oscillation period is $T_u$. For a third-order loop, $K_u$ and the oscillation frequency come straight out of Routh: the gain that makes the $s^1$ entry vanish, with the auxiliary polynomial giving $\omega$ and $T_u=2\pi/\omega$. Then PID: $K_p=0.6K_u$, $T_i=0.5T_u$, $T_d=0.125T_u$. (PI uses $0.45K_u$ and $T_i=T_u/1.2$; P alone uses $0.5K_u$.)

**Ziegler-Nichols open-loop (reaction-curve) method.** Fit the step response to a first-order-plus-dead-time model $\dfrac{K e^{-Ls}}{Ts+1}$, where $K$ is the process DC gain, $L$ the apparent dead time (where the response leaves the noise band) and $T$ the time constant of the tangent line. Then PID:
$$K_c=\dfrac{1.2}{K}\cdot\dfrac{T}{L}$$
$T_i=2L$, $T_d=0.5L$. (PI uses $0.9\,T/L$ and $T_i=3.33L$.) Note the two tables use completely different symbols: $K_u,T_u$ for closed loop, $K,L,T$ for open loop.

**What the rules do and do not promise.** Both ZN tables were tuned empirically for a quarter-amplitude-decay (about $25\%$ overshoot) response. They are *starting points*: expect to detune for less overshoot, and expect ZN gains to be aggressive on a noisy or non-minimum-phase plant. Derivative action is always implemented with a first-order filter $\dfrac{T_d s}{1+(T_d/N)s}$ to limit the noise gain, with $N$ typically 8-20, and with anti-windup on the integrator so a saturated actuator does not let the integral state run away.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| PID transfer function | $G_c(s) = K_p + \frac{K_i}{s} + K_d s$ | Parallel (ideal) form; the digital implementation form. |
| Standard (series) form | $G_c(s) = K_p\left(1 + \frac{1}{T_i s} + T_d s\right)$ | T_i and T_d are the values the tuning tables publish. |
| Parameter conversion | $K_i = \frac{K_p}{T_i},\quad K_d = K_p T_d$ | Also T_i = Kp/Ki and Td = Kd/Kp. Get the direction right. |
| Ultimate gain from Routh | $K_u = \mathrm{gain\ at\ which\ the}\ s^1\ \mathrm{entry\ vanishes}$ | The auxiliary polynomial at K_u gives the oscillation frequency. |
| Ultimate period | $T_u = \frac{2\pi}{\omega_u}$ | omega_u is the j-omega-axis root at the critical gain. |
| ZN closed-loop PID | $K_p = 0.6K_u,\ T_i = 0.5T_u,\ T_d = 0.125T_u$ | From the sustained-oscillation test. Targets about 25% overshoot. |
| ZN closed-loop PI | $K_p = 0.45K_u,\ T_i = T_u/1.2$ | Use when derivative action is not acceptable (noisy measurement). |
| ZN open-loop PID (FOPDT) | $K_c = \frac{1.2}{K}\frac{T}{L},\ T_i = 2L,\ T_d = 0.5L$ | K = process gain, L = dead time, T = time constant of the tangent. |
| ZN open-loop PI (FOPDT) | $K_c = \frac{0.9}{K}\frac{T}{L},\ T_i = 3.33L$ | Same FOPDT model, less aggressive than PID. |
| Derivative filter | $T_f = \frac{T_d}{N},\ N = 8\ \mathrm{to}\ 20$ | Limits high-frequency noise gain to about N. |
| Integrator effect on type | $\mathrm{type} \to \mathrm{type}+1$ | Kills the step error but adds -90 degrees of phase; re-check the phase margin. |

## Worked Problems

### P1. A controller is implemented as $G_c(s)=4+\dfrac{2}{s}+0.5s$. Find $K_p$, $K_i$, $K_d$, $T_i$ and $T_d$.

**Given:** Gc(s) = 4 + 2/s + 0.5s

**Solution:**

1. Compare with $K_p + K_i/s + K_d s$: $K_p = 4$, $K_i = 2$, $K_d = 0.5$
2. $T_i = K_p/K_i = 4/2 = 2\ \mathrm{s}$
3. $T_d = K_d/K_p = 0.5/4 = 0.125\ \mathrm{s}$
4. Check: $K_p\left(1+\dfrac{1}{2s}+0.125s\right) = 4 + \dfrac{2}{s} + 0.5s$ ✓

> [!success]- Answer
> **$K_p=4$, $K_i=2$, $K_d=0.5$, $T_i=2\ \mathrm{s}$, $T_d=0.125\ \mathrm{s}$.**

> [!warning] Trap
> Reporting $T_i = K_i/K_p = 0.5$ and $T_d = K_p/K_d = 8$. Both conversions are $K_p$ divided by (or times) the gain: $T_i=K_p/K_i$, $T_d=K_d/K_p$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4÷2 : 0.5÷4` → $T_i=K_p/K_i=$ **2** s → $T_d=K_d/K_p=$ **0.125** s.
> 2. Reverse check: `4×(1÷2) : 4×0.125` → **2** and **0.5**, rebuilding $K_i$ and $K_d$ from $K_p(1+1/(T_i s)+T_d s)$.

### P2. A plant $G(s)=\dfrac{1}{s(s+1)(s+2)}$ is controlled by a proportional gain only. Find the ultimate gain and period, then the Ziegler-Nichols PID settings.

**Given:** G = 1/(s(s+1)(s+2)); P control, ZN closed-loop PID

**Solution:**

1. CE with P control: $s(s+1)(s+2)+K_p = s^3+3s^2+2s+K_p = 0$
2. Routh: the $s^1$ entry is $\dfrac{3(2)-K_p}{3}$, which vanishes at $K_u = 6$
3. Auxiliary polynomial at $K_u$: $3s^2+6 = 0 \Rightarrow s = \pm j\sqrt2$, so $\omega_u = 1.414\ \mathrm{rad/s}$
4. $T_u = 2\pi/1.414 = 4.443\ \mathrm{s}$
5. ZN PID: $K_p = 0.6K_u = 0.6(6) = 3.6$
6. $T_i = 0.5T_u = 2.221\ \mathrm{s}$, $T_d = 0.125T_u = 0.555\ \mathrm{s}$
7. $K_i = K_p/T_i = 3.6/2.221 = 1.62$; $K_d = K_pT_d = 3.6(0.555) = 2.00$

> [!success]- Answer
> **$K_u=6$, $T_u=4.44\ \mathrm{s}$; PID: $K_p=3.6$, $T_i=2.22\ \mathrm{s}$, $T_d=0.555\ \mathrm{s}$ (i.e. $K_i=1.62$, $K_d=2.00$).**

> [!warning] Trap
> Taking $T_u = 2\pi/\omega_u$ with $\omega_u = 6$ (the gain) instead of the oscillation frequency $\sqrt2$. The ultimate gain and the ultimate frequency are different numbers obtained from the same Routh row.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π÷√2` `SHIFT` `STO` `A` → $T_u=$ **4.443** s at $K_u=$ **6**, whose auxiliary $3s^2+6=0$ gives $\omega_u=\sqrt2$.
> 2. `0.6×6 : 0.5×A : 0.125×A` → $K_p=$ **3.6** → $T_i=$ **2.221** s → $T_d=$ **0.5554** s.
> 3. `3.6÷2.221 : 3.6×0.5554` → $K_i=$ **1.621** → $K_d=$ **2.00**.

### P3. A process step response is fitted by $G(s)=\dfrac{2e^{-0.5s}}{4s+1}$. Design a Ziegler-Nichols PID from the open-loop reaction curve.

**Given:** K = 2; L = 0.5 s dead time; T = 4 s time constant

**Solution:**

1. $T/L = 4/0.5 = 8$
2. $K_c = \dfrac{1.2}{K}\cdot\dfrac{T}{L} = \dfrac{1.2}{2}(8) = 4.8$
3. $T_i = 2L = 2(0.5) = 1\ \mathrm{s}$
4. $T_d = 0.5L = 0.5(0.5) = 0.25\ \mathrm{s}$
5. Implementation form: $K_i = K_c/T_i = 4.8\ \mathrm{s^{-1}}$, $K_d = K_cT_d = 1.2\ \mathrm{s}$

> [!success]- Answer
> **$K_c = 4.8$, $T_i = 1\ \mathrm{s}$, $T_d = 0.25\ \mathrm{s}$ ($K_i = 4.8$, $K_d = 1.2$).**

> [!warning] Trap
> Using the closed-loop table ($K_u$, $T_u$) on an open-loop reaction curve. Open loop uses $K$, $L$ and $T$ with the $1.2\,T/(KL)$ rule; there is no $K_u$ in this method.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4÷0.5` → $T/L=$ **8** for the FOPDT model.
> 2. `1.2÷2×Ans : 2×0.5 : 0.5×0.5` → $K_c=$ **4.8** → $T_i=$ **1** s → $T_d=$ **0.25** s.
> 3. `4.8÷1 : 4.8×0.25` → $K_i=$ **4.8** s⁻¹ → $K_d=$ **1.2** s.

### P4. A unity-feedback plant is $G(s)=\dfrac{1}{(s+1)(s+3)}$ with a proportional controller $K_p$. Find the minimum $K_p$ that gives a unit-step steady-state error of at most $5\%$, and state what happens with PI control.

**Given:** G = 1/((s+1)(s+3)); e_ss <= 0.05; then PI

**Solution:**

1. Type-0 plant: $K_p^{\mathrm{static}} = \lim_{s\to0}K_pG(s) = K_p/3$
2. $e_{ss} = \dfrac{1}{1+K_p/3} = \dfrac{3}{3+K_p}$
3. $\dfrac{3}{3+K_p}\le0.05 \Rightarrow 3+K_p\ge60 \Rightarrow K_p\ge57$
4. Stability check: CE $= s^2+4s+3+K_p$, always stable for $K_p>0$
5. With PI the loop becomes type 1, so the step error is exactly $0$ for any finite gain — the integral term, not the gain, removes the offset

> [!success]- Answer
> **P only: $e_{ss}\le5\%$ requires $K_p\ge57$. With PI: $e_{ss}=0$.**

> [!warning] Trap
> Claiming a large enough $K_p$ can make the error zero. For a type-0 loop the error is $1/(1+K_p^s)$, which only tends to zero as $K_p\to\infty$; only integral action makes it identically zero.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3÷0.05−3` → from $\dfrac{3}{3+K_p}\le 0.05$, the minimum is $K_p\ge$ **57**.
> 2. `MODE` `5` page 2 `1` with `1`, `4`, `60` (the CE $s^2+4s+3+K_p$ at $K_p=57$) → $x=-2\pm j7.483$: the real part is $-2$ for every $K_p$, so it is stable, and PI makes the step error **0**.

### P5. The PID settings above are $K_p=3.6$, $T_d=0.555\ \mathrm{s}$. Choose the derivative filter time constant for $N=10$ and state why the filter is needed.

**Given:** Td = 0.555 s; N = 10

**Solution:**

1. $T_f = T_d/N = 0.555/10 = 0.0555\ \mathrm{s}$
2. The filtered derivative has gain $\dfrac{T_d\omega}{\sqrt{1+(T_d\omega/N)^2}}$, which levels off at $N = 10$ (20 dB) at high frequency
3. Without the filter the derivative gain rises without bound, so sensor noise is amplified into the actuator

> [!success]- Answer
> **$T_f = 0.0555\ \mathrm{s}$ (about 56 ms); it bounds the high-frequency derivative gain at about 20 dB.**

> [!warning] Trap
> Filtering the derivative too heavily (small $N$, large $T_f$). That removes the phase lead you added the D term for; the standard range is $N=8$ to 20.

## Traps & Exam Notes

- **Mixing the two Ziegler-Nichols tables.** Closed loop uses $K_u,T_u$; open loop uses the FOPDT parameters $K,L,T$ and the $1.2\,T/(KL)$ rule.
- **Expecting P action to remove steady-state error.** In a type-0 loop the error only shrinks as $1/(1+K_p)$; it is never zero. Only integral action removes it.
- **Adding integral action without re-checking stability.** The $90^\circ$ of extra lag at low frequency reduces the phase margin and can destabilise a loop that was fine with P alone.
- **Converting $K_i,K_d$ into $T_i,T_d$ backwards.** $T_i=K_p/K_i$ and $T_d=K_d/K_p$; swapping the direction gives reciprocals.
- **Taking the ultimate period from the gain.** $T_u=2\pi/\omega_u$ where $\omega_u$ is the imaginary-axis oscillation frequency at $K_u$, obtained from the auxiliary polynomial.
- **Using unfiltered derivative action.** Real sensors are noisy; $T_d s$ alone has unbounded high-frequency gain. Always add $T_f=T_d/N$.
- **Assuming ZN gains are optimal.** They are tuned for roughly 25% overshoot — aggressive by modern standards. Detune for the actual specification.
- **Ignoring derivative kick and integral windup.** A setpoint step makes $de/dt$ a spike; a saturated actuator lets the integrator wind up and overshoot badly on recovery.

## See Also

- [[10_Bode_Plots_and_Margins]]
- [[13_Lead-Lag_Compensator_Design]]
- [[07_System_Types_and_Error_Analysis]]

---

[[11_Nyquist_Stability_Criterion|⬅ 11]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Lead-Lag_Compensator_Design|13 ➡]]
