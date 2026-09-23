---
id: MATH-06-10
title: "Bode Plots and Margins"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Second_Order_Specifications]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Bode Plots and Margins

> [!abstract] Scope
> Draw asymptotic Bode magnitude and phase plots, find the gain and phase crossover frequencies, and read gain and phase margins from them.

## Core Concept

> [!tip] Intuition
> A Bode plot multiplies magnitudes and adds phases. On a log-frequency axis every pole bends the magnitude by $-20\ \mathrm{dB/dec}$ and eventually adds $-90^\circ$, so the whole plot is a sum of straight-line pieces plus a phase ramp.

**Why log coordinates.** $\lvert G\rvert$ in dB is $20\log_{10}\lvert G\rvert$, so a product of factors becomes a sum:
$$20\log\lvert G_1G_2\rvert = 20\log\lvert G_1\rvert + 20\log\lvert G_2\rvert$$
Each standard factor therefore contributes an independent straight-line piece, and the total plot is their sum. Phase is already additive.

**The building blocks.** A constant $K$ is a flat $20\log K$ dB and $0^\circ$ (or $180^\circ$ if negative). A pole at the origin, $1/s$, is $-20\ \mathrm{dB/dec}$ and $-90^\circ$ everywhere. A simple pole $(1+j\omega\tau)^{-1}$ is flat at 0 dB, breaks downward at the corner $\omega=1/\tau$, and reaches $-90^\circ$ asymptotically; a simple zero is the mirror image. A quadratic pair contributes $-40\ \mathrm{dB/dec}$ above $\omega_n$ and a phase that drops from $0^\circ$ to $-180^\circ$, passing $-90^\circ$ exactly at $\omega_n$. The asymptotic approximation is 3 dB low at the corner for a simple pole and $20\log(2\zeta)$ low for a quadratic.

**The two crossover frequencies, and which margin uses which.** The **gain crossover** $\omega_{gc}$ is where $\lvert G\rvert = 1$ (0 dB); the **phase margin** is $PM = 180^\circ + \angle G(j\omega_{gc})$ — how much extra phase lag would drive the loop to the $-180^\circ$ boundary without changing the gain. The **phase crossover** $\omega_{pc}$ is where $\angle G = -180^\circ$; the **gain margin** is:
$$GM = \dfrac{1}{\lvert G(j\omega_{pc})\rvert}$$
or in dB:
$$GM_{dB} = -20\log\lvert G(j\omega_{pc})\rvert$$
It measures how much extra gain would push the loop to the boundary. Mixing the two frequencies is the topic's signature error.

**Stability reading.** For a minimum-phase loop, $GM>0\ \mathrm{dB}$ and $PM>0^\circ$ together mean a stable closed loop, and the margins measure robustness. Increasing $K$ shifts the magnitude curve up by a constant, moves $\omega_{gc}$ to the right and (for a loop with at least one pole beyond the integrator) *reduces* the phase margin. Gain changes do not move the phase curve at all — this is why $K$ alone cannot fix a poor phase margin.

**Limits of the method.** The asymptotic sketch is only a sketch: read the exact magnitude when the margin matters, or state that the answer is approximate. Bode margins are necessary and sufficient for stability only for minimum-phase systems with a single gain crossover; a conditionally stable loop can be stable while its Bode plot shows a negative gain margin at one crossing, because the $-1$ point is encircled an even number of times. That case needs Nyquist. Finally, a phase margin read from a straight-line phase approximation can be off by $10^\circ$ or more near a corner.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Decibels | $\lvert G \rvert_{dB} = 20\log_{10}\lvert G \rvert$ | Products become sums. A factor of 2 is 6.02 dB, of 10 is 20 dB. |
| Integrator 1/s | $-20\ \mathrm{dB/dec},\ -90^\circ$ | Constant slope and phase at every frequency. |
| Simple pole corner | $\omega_c = 1/\tau,\ -20\ \mathrm{dB/dec\ beyond}$ | The corner is 1/tau, not tau. Asymptote is 3 dB high at the corner. |
| Quadratic corner | $\omega_n,\ -40\ \mathrm{dB/dec\ beyond}$ | Peaking of 20log(1/(2zeta)) at resonance; exactly -90 degrees phase at omega_n. |
| Gain crossover | $\lvert G(j\omega_{gc}) \rvert = 1,\ \ 0\ \mathrm{dB}$ | This frequency sets the phase margin. |
| Phase margin | $PM = 180^\circ + \angle G(j\omega_{gc})$ | Measured at the GAIN crossover. A negative PM means an unstable closed loop. |
| Phase crossover | $\angle G(j\omega_{pc}) = -180^\circ$ | This frequency sets the gain margin. |
| Gain margin | $GM = \frac{1}{\lvert G(j\omega_{pc}) \rvert},\quad GM_{dB} = -20\log\lvert G(j\omega_{pc}) \rvert$ | Measured at the PHASE crossover. Positive dB is stable. |
| Gain change affects magnitude only | $K\ \mathrm{shifts\ magnitude\ by}\ 20\log K\ \mathrm{dB,\ phase\ unchanged}$ | True for minimum-phase factors. Moves the gain crossover and hence the PM. |
| Damping from phase margin | $\zeta \approx \frac{PM}{100} \ (PM\ \mathrm{in\ degrees})$ | Rough, and only for PM below about 60 degrees. |

## Interactive Widget

**Bode Margin Explorer**

![[Bode_Margin_Explorer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. For $G(s)=\dfrac{100}{s(s+10)}$ in unity feedback, find the gain crossover frequency, the phase margin and the gain margin.

**Given:** G = 100/(s(s+10)); unity feedback

**Solution:**

1. Write $G(s) = \dfrac{10}{s(1+0.1s)}$ (corner at $\omega = 10\ \mathrm{rad/s}$)
2. Gain crossover: $\dfrac{100}{\omega\sqrt{\omega^2+100}} = 1 \Rightarrow \omega^2(\omega^2+100) = 10^4$
3. Let $x=\omega^2$: $x^2+100x-10^4 = 0 \Rightarrow x = \dfrac{-100+\sqrt{5\times10^4}}{2} = 61.80$
4. $\omega_{gc} = 7.86\ \mathrm{rad/s}$
5. Phase: $-90^\circ - \arctan(7.86/10) = -90^\circ - 38.2^\circ = -128.2^\circ$
6. $PM = 180^\circ - 128.2^\circ = 51.8^\circ$
7. Phase never reaches $-180^\circ$ (it approaches $-180^\circ$ only as $\omega\to\infty$), so there is no phase crossover and $GM = \infty$

> [!success]- Answer
> **$\omega_{gc} = 7.86\ \mathrm{rad/s}$, $PM = 51.8^\circ$, $GM = \infty$.**

> [!warning] Trap
> Reading the phase margin at $\omega = 10$ (the corner) instead of at the gain crossover $7.86\ \mathrm{rad/s}$. The two frequencies are close here, but the phases differ by about $3^\circ$ — and in higher-order loops the gap can be enormous.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `1` with `1`, `100`, `-10000`, i.e. $\omega^2(\omega^2+100)=10^4$ → the positive root $x=$ **61.80**, so $\omega_{gc}=\sqrt{61.80}=$ **7.86** rad/s.
> 2. Deg: `-90−tan⁻¹(7.86÷10)` → $\angle G=$ **-128.2°** → $PM=$ **51.8°**; the phase only approaches $-180°$, so $GM=\infty$.

### P2. For $G(s)=\dfrac{50}{s(s+1)(s+5)}$ in unity feedback, find the gain margin in dB and state whether the closed loop is stable.

**Given:** G = 50/(s(s+1)(s+5)); unity feedback

**Solution:**

1. Phase crossover: $-90^\circ - \arctan\omega - \arctan(\omega/5) = -180^\circ$
2. $\arctan\omega + \arctan(\omega/5) = 90^\circ \Rightarrow 1 - \omega(\omega/5) = 0 \Rightarrow \omega_{pc} = \sqrt5 = 2.236\ \mathrm{rad/s}$
3. $\lvert G(j2.236) \rvert = \dfrac{50}{2.236\cdot\sqrt{1+5}\cdot\sqrt{1+1.2}} = \dfrac{50}{(2.236)(2.449)(1.095)}$
4. The denominator is $2.236\times2.449\times1.095 = 6.000$, so $\lvert G \rvert = 50/6 = 8.333$
5. $GM_{dB} = -20\log_{10}8.333 = -18.4\ \mathrm{dB}$
6. Negative gain margin, so the closed loop is unstable
7. Cross-check by Routh on $s^3+6s^2+5s+50$: $a_2a_1 = 30 < a_0 = 50$, confirming instability

> [!success]- Answer
> **$GM = -18.4\ \mathrm{dB}$ (i.e. $GM = 0.12$); the closed loop is *unstable*.**

> [!warning] Trap
> Reporting $GM = +18.4\ \mathrm{dB}$ by dropping the minus sign. Gain margin is defined as $-20\log\lvert G(j\omega_{pc})\rvert$: when $\lvert G\rvert > 1$ at the phase crossover, the margin is negative and the loop is unstable.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√5` → $\omega_{pc}=$ **2.236** rad/s, from $\arctan\omega+\arctan(\omega/5)=90°$, that is $\omega^2=5$.
> 2. `50÷(√5×√6×√1.2)` → $\lvert G\rvert=$ **8.333** → `−20×log(Ans)` → $GM_{dB}=$ **-18.4** dB: negative, so the closed loop is unstable.

### P3. For $G(s)=\dfrac{10}{s(1+0.5s)}$ in unity feedback, find $\omega_{gc}$, the phase margin, and estimate $\zeta$ and the percent overshoot.

**Given:** G = 10/(s(1+0.5s)); unity feedback

**Solution:**

1. Gain crossover: $\dfrac{10}{\omega\sqrt{1+0.25\omega^2}} = 1$
2. Let $x = 0.5\omega$ (so $\omega = 2x$): $10 = 2x\sqrt{1+x^2} \Rightarrow x\sqrt{1+x^2} = 5$
3. $x^4+x^2-25 = 0 \Rightarrow x^2 = \dfrac{-1+\sqrt{101}}{2} = 4.525 \Rightarrow x = 2.127$
4. $\omega_{gc} = x/0.5 = 4.25\ \mathrm{rad/s}$
5. Phase: $-90^\circ - \arctan(2.127) = -90^\circ - 64.8^\circ = -154.8^\circ$
6. $PM = 180^\circ - 154.8^\circ = 25.2^\circ$
7. Estimate $\zeta \approx PM/100 = 0.25$
8. $M_p = e^{-\pi(0.25)/\sqrt{1-0.0625}} = e^{-0.811} = 0.44$, i.e. about $44\%$

> [!success]- Answer
> **$\omega_{gc} = 4.25\ \mathrm{rad/s}$, $PM = 25.2^\circ$, $\zeta\approx0.25$, $M_p\approx44\%$ — a poorly damped loop.**

> [!warning] Trap
> Using $\omega = 2$ (the inverse of $\tau=0.5$) as the crossover because the corner frequency '$\omega=1/\tau=2$' looks like a crossover. The corner is at 2 rad/s but the gain is still 10/2 = 5 there, far above 0 dB.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. With $x=0.5\omega$ the crossover solves $x^4+x^2-25=0$: `MODE` `5` page 2 `1` with `1`, `1`, `-25` → the positive root **4.525**, so $\omega_{gc}=\sqrt{4.525}÷0.5=$ **4.25** rad/s.
> 2. Deg: `-90−tan⁻¹(2.127)` → **-154.8°** → $PM=$ **25.2°**; `e^(−π×0.25÷√(1−0.25²))` → $M_p=$ **0.444**, with $\zeta\approx PM/100=$ **0.25**.

### P4. For $G(s)=\dfrac{K}{s(s+10)}$, find the gain that gives a phase margin of exactly $45^\circ$, and the resulting $K_v$.

**Given:** G = K/(s(s+10)); PM = 45 degrees

**Solution:**

1. $PM = 180^\circ + \angle G(j\omega_{gc}) = 45^\circ \Rightarrow \angle G = -135^\circ$
2. $-90^\circ - \arctan(\omega_{gc}/10) = -135^\circ \Rightarrow \arctan(\omega_{gc}/10) = 45^\circ$
3. $\omega_{gc} = 10\ \mathrm{rad/s}$
4. At the crossover $\lvert G\rvert = 1$: $\dfrac{K}{10\sqrt{100+100}} = 1$
5. $K = 10\sqrt{200} = 141.4$
6. $K_v = \lim_{s\to0}sG(s) = K/10 = 14.14\ \mathrm{s^{-1}}$

> [!success]- Answer
> **$K = 141.4$ gives $PM = 45^\circ$ (crossover at 10 rad/s), with $K_v = 14.14\ \mathrm{s^{-1}}$.**

> [!warning] Trap
> Solving for $K$ with the wrong crossover. The phase condition fixes $\omega_{gc}$ first (here it forces the crossover onto the corner frequency); only then does the magnitude condition give $K$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Deg: the phase condition forces $\tan^{-1}(\omega_{gc}/10)=45°$, so `tan(45)×10` → $\omega_{gc}=$ **10** rad/s, exactly the corner frequency.
> 2. `10×√200` → $K=$ **141.4** from $\lvert G\rvert=1$ at that frequency → `Ans÷10` → $K_v=$ **14.14** s⁻¹.

### P5. Sketch the asymptotic magnitude Bode plot of $G(s)=\dfrac{200(s+2)}{s(s+1)(s+20)}$: give the low-frequency asymptote in dB at $\omega=0.1$, the corner frequencies, and the slope in each band.

**Given:** G = 200(s+2)/(s(s+1)(s+20))

**Solution:**

1. As $\omega\to0$: $G \approx \dfrac{200(2)}{s(1)(20)} = \dfrac{20}{s}$
2. At $\omega = 0.1$: $\lvert G\rvert = 20/0.1 = 200 \Rightarrow 20\log_{10}200 = 46.0\ \mathrm{dB}$
3. Corners: pole at $\omega=1$, zero at $\omega=2$, pole at $\omega=20$
4. Slopes: $-20\ \mathrm{dB/dec}$ below 1 (integrator only)
5. $-40\ \mathrm{dB/dec}$ between 1 and 2 (integrator + pole)
6. $-20\ \mathrm{dB/dec}$ between 2 and 20 (the zero cancels one pole)
7. $-40\ \mathrm{dB/dec}$ above 20

> [!success]- Answer
> **46.0 dB at $\omega=0.1$; corners at 1, 2, 20 rad/s with slopes $-20$, $-40$, $-20$, $-40\ \mathrm{dB/dec}$.**

> [!warning] Trap
> Treating $(s+2)$ as a pole because it sits in the denominator of the original expression. Its root is a zero of $G$, so it adds $+20\ \mathrm{dB/dec}$, not $-20$. Convert every factor to the $(1+j\omega\tau)^{\pm1}$ form first.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. DC asymptote: `200×2÷(1×20)` → **20**, so $G\approx 20/s$ at low frequency (the $(s+2)$ is a zero, not a pole).
> 2. `20÷0.1` → $\lvert G\rvert=$ **200** → `20×log(Ans)` → **46.0** dB at $\omega=0.1$; corners at the roots **1**, **2**, **20** with slopes $-20$, $-40$, $-20$, $-40$ dB/dec.

## Traps & Exam Notes

- **Reading the phase margin off the phase crossover.** Gain margin uses $\omega_{pc}$ (where phase is $-180^\circ$); phase margin uses $\omega_{gc}$ (where gain is 0 dB). Swapping them is the classic Bode error.
- **Dropping the minus sign on the gain margin.** $GM_{dB} = -20\log\lvert G(j\omega_{pc})\rvert$; a system with $\lvert G\rvert = 8.3$ at the phase crossover has $-18.4$ dB, not $+18.4$ dB, and is unstable.
- **Using $\tau$ as the corner frequency.** The corner is $1/\tau$. A factor $(1+0.1s)$ breaks at 10 rad/s.
- **Mis-signing a numerator factor.** Convert everything to $(1+j\omega\tau)$ form; a root in the numerator is a zero and adds slope, even if it appears as $(s+2)$.
- **Adding magnitudes instead of dB values.** Multiply the raw magnitudes, add the dB values — $20\log(AB) = 20\log A + 20\log B$.
- **Believing a positive gain margin guarantees stability, or that $K$ can fix phase margin.** Bode margins are sufficient for minimum-phase loops with a single crossover; $K$ shifts magnitude only and moves $\omega_{gc}$, which changes the PM in the wrong direction when the loop rolls off.
- **Reading exact values off the asymptotes.** The straight-line approximation is 3 dB off at each simple corner and $20\log(2\zeta)$ off at a quadratic corner; say 'approximately' when you read a margin from the sketch.
- **Ignoring the sign of K.** A negative $K$ adds $180^\circ$ of phase and inverts the stability conclusion.

## See Also

- [[11_Nyquist_Stability_Criterion]]
- [[12_PID_Controllers_and_Tuning]]
- [[13_Lead-Lag_Compensator_Design]]

---

[[09_Root_Locus_Techniques|⬅ 09]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Nyquist_Stability_Criterion|11 ➡]]
