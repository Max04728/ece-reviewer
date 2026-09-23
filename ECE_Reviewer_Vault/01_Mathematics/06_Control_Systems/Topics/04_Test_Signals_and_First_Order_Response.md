---
id: MATH-06-04
title: "Test Signals and First Order Response"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_System_Modeling_and_Transfer_Functions]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Test Signals and First Order Response

> [!abstract] Scope
> Predict a first-order system's response to impulse, step and ramp test inputs from its time constant and pole location.

## Core Concept

> [!tip] Intuition
> A first-order system has one stored quantity and one leak. The time constant is how long the leak takes to move the system 63.2% of the way to its new equilibrium — every other number in this topic is a multiple of it.

**The standard test signals.** Impulse $\delta(t)$ (the purest probe — the response *is* the impulse response), unit step $u(t)$ (the standard performance probe, because it mimics a sudden setpoint change), unit ramp $tu(t)$ (tests tracking of a moving reference), parabola $t^2u(t)/2$ (tests acceleration tracking), and the sinusoid (tests frequency response). Steady-state error constants are defined for exactly these inputs, which is why they matter beyond the maths.

**Standard first-order form.** $G(s)=\dfrac{K}{\tau s+1}$, with a single pole at $s=-1/\tau$. Normalising to this form is mandatory before using any of the time-constant results: a pole at $s=-5$ means $\tau=0.2\ \mathrm{s}$, not $5\ \mathrm{s}$, and $G(s)=\dfrac{8}{s+4}$ is $\dfrac{2}{0.25s+1}$ with $K=2$, $\tau=0.25\ \mathrm{s}$.

**Step response and the 63.2% rule.** $y(t)=K\left(1-e^{-t/\tau}\right)$. At $t=\tau$ the output has covered $1-e^{-1}=63.2\%$ of its final value; at $2\tau$, $86.5\%$; at $3\tau$, $95.0\%$; at $4\tau$, $98.2\%$. This is where the $2\%$ settling time $t_s\approx4\tau$ and the $5\%$ settling time $t_s\approx3\tau$ come from — they are band definitions, not physics.

**Rise time.** There is no pole for which a first-order step response has zero rise time, so rise time is defined between the $10\%$ and $90\%$ points: $t_r=2.2\tau$. Do not reuse the second-order formula $t_r\approx1.8/\omega_n$ here; that form is only valid near $\zeta=0.5$ and for a very different response shape.

**Ramp response, lag and error.** For the unit ramp $r(t)=t$ the output is:
$$y(t)=K\left(t-\tau+\tau e^{-t/\tau}\right)$$
The transient decays and the output settles into a ramp *parallel* to the input but delayed by exactly $\tau$ and short by a constant $K\tau$. A first-order system can therefore never track a ramp without a steady offset, no matter how large $K$ is — only extra integrators fix it.

**What breaks the simple picture.** The formulas assume zero initial conditions, a linear model, and no transport delay. A pure time delay $e^{-sT}$ adds a transport lag on top of $\tau$ and is not approximated by a first-order pole unless you deliberately use a Padé approximation.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Standard first-order form | $G(s) = \frac{K}{\tau s + 1}$ | Normalise first: divide out the s coefficient. Pole at s = -1/tau. |
| Time constant from a pole | $\tau = \frac{1}{\lvert p \rvert},\quad p = -1/\tau$ | A pole at s = -5 gives tau = 0.2 s, not 5 s. |
| Unit step response | $y(t) = K\left(1 - e^{-t/\tau}\right)u(t)$ | Final value K; 63.2% of K at t = tau. |
| Unit impulse response | $y(t) = \frac{K}{\tau} e^{-t/\tau} u(t)$ | Starts at K/tau, not at K; the area under it is K. |
| Unit ramp response | $y(t) = K\left(t - \tau + \tau e^{-t/\tau}\right)u(t)$ | Steady lag of tau and steady error K*tau relative to the input ramp. |
| 10-90% rise time | $t_r = 2.2\tau$ | First order only. The second-order 1.8/wn form does not apply. |
| 2% settling time | $t_s \approx 4\tau$ | Time for the transient to fall inside 2% of the final value. |
| 5% settling time | $t_s \approx 3\tau$ | Wider band settles sooner. Quote the band with the answer. |
| Percentage completed | $y(t)/K = 1 - e^{-t/\tau}$ | 63.2% at tau, 86.5% at 2tau, 95.0% at 3tau, 98.2% at 4tau. |
| Ramp lag in a closed loop | $e_{ss} = K\tau \ \mathrm{(open-loop\ tracking\ of\ a\ unit\ ramp)}$ | For a type-0 unity-feedback loop the ramp error is actually infinite; this lag applies to an open-loop first-order block. |

## Worked Problems

### P1. A system has $G(s)=\dfrac{8}{s+4}$. Find $K$, $\tau$, the $10$-$90\%$ rise time, and the $2\%$ settling time.

**Given:** G(s) = 8/(s+4); step input

**Solution:**

1. Normalise: $G(s) = \dfrac{8}{4(0.25s+1)} = \dfrac{2}{0.25s+1}$
2. So $K = 2$ and $\tau = 0.25\ \mathrm{s}$ (pole at $s=-4$)
3. Rise time: $t_r = 2.2\tau = 2.2(0.25) = 0.55\ \mathrm{s}$
4. Settling time (2%): $t_s = 4\tau = 4(0.25) = 1.0\ \mathrm{s}$
5. Answer check: $y(\infty) = K = 2$

> [!success]- Answer
> **$K=2$, $\tau=0.25\ \mathrm{s}$, $t_r = 0.55\ \mathrm{s}$, $t_s = 1.0\ \mathrm{s}$.**

> [!warning] Trap
> Reading $\tau = 4$ from the pole magnitude because the denominator is $s+4$. After normalising, the pole is $s=-4$ so $\tau = 1/4 = 0.25\ \mathrm{s}$.

### P2. For $G(s)=\dfrac{10}{0.5s+1}$ with a unit step input, find the output at $t=0.5\ \mathrm{s}$ and at $t=2\ \mathrm{s}$, and the final value.

**Given:** G(s) = 10/(0.5s+1); unit step

**Solution:**

1. From standard form $K=10$, $\tau=0.5\ \mathrm{s}$
2. $y(t) = 10\left(1-e^{-t/0.5}\right) = 10\left(1-e^{-2t}\right)$
3. At $t = 0.5$: $y = 10(1-e^{-1}) = 10(1-0.3679) = 6.32$
4. At $t = 2$: $t/\tau = 4$, so $y = 10(1-0.0183) = 9.82$
5. As $t\to\infty$: $y\to K = 10$

> [!success]- Answer
> **$y(0.5)=6.32$ (63.2% of 10), $y(2)=9.82$ (98.2% of 10), final value $10$.**

> [!warning] Trap
> Computing $e^{-t/\tau}$ with $t/\tau$ inverted (using $e^{-\tau t}$). The exponent is $-t/\tau$, so at $t=\tau$ it is exactly $e^{-1}=0.3679$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5÷0.5 : 10×(1−e^(−Ans))` → $t/\tau=$ **1** → $y(0.5)=$ **6.321** (the 63.2 % point, since $1-e^{-1}=0.3679$).
> 2. `2÷0.5 : 10×(1−e^(−Ans))` → $t/\tau=$ **4** → $y(2)=$ **9.817**; the final value is $K=$ **10**.

### P3. A first-order system settles to within $2\%$ of its final value in $1.2\ \mathrm{s}$. Find its time constant and the location of its pole.

**Given:** t_s (2%) = 1.2 s

**Solution:**

1. $t_s \approx 4\tau$ for the 2% band
2. $\tau = 1.2/4 = 0.3\ \mathrm{s}$
3. Pole: $p = -1/\tau = -3.333\ \mathrm{s^{-1}}$
4. Rise time check: $t_r = 2.2(0.3) = 0.66\ \mathrm{s}$, comfortably less than $1.2\ \mathrm{s}$

> [!success]- Answer
> **$\tau = 0.3\ \mathrm{s}$, pole at $s = -3.33\ \mathrm{rad/s}$.**

> [!warning] Trap
> Using $t_s = 3\tau$ (the 5% band) when the question says 2%. The two bands differ by 33% in the answer, and mixing them is common under time pressure.

### P4. A first-order block $G(s)=\dfrac{1}{2s+1}$ is driven by the unit ramp $r(t)=t$, $t\ge0$. Find the steady-state output, the lag relative to the input, and the steady-state error magnitude.

**Given:** G(s) = 1/(2s+1); r(t) = t

**Solution:**

1. $K = 1$, $\tau = 2\ \mathrm{s}$
2. $y(t) = t - 2 + 2e^{-t/2}$
3. As $t\to\infty$ the exponential dies: $y_{ss}(t) = t - 2$
4. The output is the input delayed by $\tau = 2\ \mathrm{s}$
5. Steady-state error $= r - y = t - (t-2) = 2 = K\tau$

> [!success]- Answer
> **$y_{ss}(t) = t-2$: a lag of $2\ \mathrm{s}$ and a steady error of $2$ (that is, $K\tau = 2$).**

> [!warning] Trap
> Concluding the error goes to zero because the exponential decays. The output tracks a ramp of the same slope but with a permanent constant offset of $K\tau$.

### P5. A thermometer modelled as first order reads $20^\circ\mathrm{C}$ in a $100^\circ\mathrm{C}$ oven and reaches $70.4^\circ\mathrm{C}$ after $30\ \mathrm{s}$. Estimate its time constant.

**Given:** initial 20 C; final 100 C; reading 70.4 C at t = 30 s

**Solution:**

1. $y(t) = 100 - 80e^{-t/\tau}$ (final value 100, initial value 20, so $K = 80$)
2. At $t=30$: $70.4 = 100 - 80e^{-30/\tau}$
3. $80e^{-30/\tau} = 29.6$, so $e^{-30/\tau} = 0.37$
4. Note $0.37 \approx e^{-1}$, so $30/\tau \approx 1$
5. $\tau \approx 30\ \mathrm{s}$

> [!success]- Answer
> **$\tau \approx 30\ \mathrm{s}$ (the reading was 63.2% of the way from 20 to 100).**

> [!warning] Trap
> Using the absolute temperature rather than the change: $(70.4-20)/(100-20) = 0.63$ is the correct fractional completion. Dividing $70.4/100$ gives 0.704 and a wrong time constant.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Work with the change, not the absolute reading: `(100−70.4)÷80` → the part still to go **0.37**, so $e^{-30/\tau}=0.37$.
> 2. `−30÷ln(Ans)` → $\tau=$ **30.17** s, since $\ln 0.37=-0.9943$; the 63.2 % coincidence is what rounds this to 30 s.
>
> `SHIFT` `SOLVE` on `70.4=100−80e^(−30÷X)` with a guess of 30 returns the same 30.17.

## Traps & Exam Notes

- **Taking $\tau$ from the pole value instead of its reciprocal.** Pole $s=-4$ means $\tau=0.25\ \mathrm{s}$. Forgetting the reciprocal scales every time answer by $\tau^2$.
- **Using the second-order rise time.** $t_r = 2.2\tau$ for first order; $1.8/\omega_n$ belongs to second order near $\zeta=0.5$.
- **Quoting a settling time without its band.** $4\tau$ is 2%, $3\tau$ is 5%; the numbers differ by 33%.
- **Expecting zero steady-state error to a ramp from a type-0 loop.** A first-order closed loop is type 0: its ramp error is infinite. The finite lag $K\tau$ describes an open-loop first-order block, not a unity-feedback type-0 loop.
- **Reading the impulse response peak as $K$.** The impulse response starts at $K/\tau$ and has area $K$.
- **Forgetting to normalise $K$.** $\dfrac{8}{s+4}$ has $K=2$, not 8; the DC gain and the final value both change.
- **Treating a transport delay as a first-order pole.** $e^{-sT}$ contributes delay without any smoothing; approximating it with a pole changes both the rise time and the phase.

## See Also

- [[01_System_Modeling_and_Transfer_Functions]]
- [[05_Second_Order_Specifications]]
- [[10_System_Response_and_Step_Response]]

---

[[03_Mason’s_Gain_Formula|⬅ 03]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Second_Order_Specifications|05 ➡]]
