---
id: ECE-07-08
title: "Sallen-Key Filter Design"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Active_Filter_Responses]]", "[[02_Phasors_and_Complex_Impedance]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Sallen-Key Filter Design

> [!abstract] Scope
> Choose Sallen-Key component values that place a second-order pole pair at a required natural frequency and Q, and understand why the unity-gain equal-component version is not Butterworth.

## Core Concept

> [!tip] Intuition
> Two resistors and two capacitors around one op-amp place a complex pole pair. The resistor and capacitor products set how far the poles sit from the origin, while the amplifier gain decides how close together their angles are — that angle is the Q, and pushing it too far makes the filter ring.

**The topology and the two design equations.** The Sallen-Key low-pass is a unity-gain (or gain-K) amplifier with $R_1$, $R_2$ in series into the non-inverting input, $C_2$ from the midpoint to ground and $C_1$ from the output back to the midpoint — positive feedback through $C_1$ is what creates the complex poles. The transfer function has the standard second-order denominator $s^2R_1R_2C_1C_2 + s\left[R_1C_2 + R_2C_2 + R_1C_1(1-K)\right] + 1$, so $f_0 = 1/(2\pi\sqrt{R_1R_2C_1C_2})$ and $Q = \sqrt{R_1R_2C_1C_2}/\left[R_1C_2+R_2C_2+R_1C_1(1-K)\right]$. Every design problem in this topic is those two equations solved for two unknowns.

**The trap that defines the topic.** Set $R_1 = R_2 = R$, $C_1 = C_2 = C$ and $K = 1$ — the obvious, tidy choice — and the denominator collapses to $s^2R^2C^2 + 3sRC + 1$, giving $Q = 1/3 - K$ evaluated at $K = 1$: that is, $Q = 0.5$. The equal-component unity-gain Sallen-Key is *overdamped*, not Butterworth. Its response at $f_0$ is $Q = 0.5$, which is $-6\ \mathrm{dB}$, and its $-3\ \mathrm{dB}$ point is at $0.6436f_0$. There are two standard repairs: keep $K = 1$ and make $C_1/C_2 = 4Q^2$ (so $C_1 = 2C_2$ for Butterworth), or keep equal components and set the gain to $K = 3 - 1/Q$, which is $K = 1.586$ for Butterworth.

**The gain-K version and its knife edge.** For equal resistors and equal capacitors the relation is simply $Q = 1/(3-K)$ with $K = 1 + R_b/R_a$. That is an extremely direct design lever — but it also shows the danger: as $K$ approaches 3 the denominator approaches zero and Q diverges, so at $K = 3$ exactly the stage oscillates at $f_0$ and above 3 it latches to a rail because the feedback has become net positive. Because the same formula makes Q hypersensitive to gain, the fractional sensitivity is $\Delta Q/Q = \varepsilon\,QK$ for a fractional gain error $\varepsilon$: a 1% resistor error costs about 1.1% of Q at $Q = 0.707$ but 14% of Q at $Q = 5$. High-Q Sallen-Key stages therefore need 1% resistors, trimmers, or a different topology.

**Choosing a response.** The Q value *is* the response family for a second-order section. Butterworth ($Q = 0.7071$) is maximally flat in magnitude with a $-3\ \mathrm{dB}$ point exactly at $f_0$; Bessel ($Q = 0.5774$) has the flattest group delay and the cleanest step response but a slower initial roll-off; Chebyshev trades a passband ripple for a steeper skirt and needs $Q = 0.864$ at 0.5 dB ripple, $0.957$ at 1 dB and $1.305$ at 3 dB. Higher-order filters are cascades of second-order sections (plus one first-order section for odd orders) whose Q values come from a normalized table, and the sections are ordered so that the lowest-Q stage comes first to preserve dynamic range.

**Practical design checks.** Component spread matters more than exact values: with $R_1 = R_2$ the capacitor ratio must satisfy $C_1/C_2 = 4Q^2 \ge 2$, and a 5% capacitor error changes the realized Q by roughly half that percentage in the ratio. The op-amp's finite gain-bandwidth degrades Q and shifts $f_0$; the working rule of thumb is $GBW \ge 100f_0Q$, so a 10 kHz, $Q = 5$ stage needs 5 MHz of gain-bandwidth and a 741 is nowhere near adequate. Noise gain sets the offset contribution, and the DC path must exist — a Sallen-Key high-pass has no DC feedback path unless one is added, so its output offsets drift. Finally, the high-pass version swaps the roles of R and C; keeping the low-pass component values and merely rearranging them gives a different $f_0$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Sallen-Key natural frequency | $f_0 = \frac{1}{2\pi\sqrt{R_1R_2C_1C_2}}$ | General form for the low-pass. For equal R and equal C it reduces to 1/(2 pi RC). |
| Unity-gain equal-component case | $f_0 = \frac{1}{2\pi RC}$ | Only when R1 = R2 = R and C1 = C2 = C. The gain must be exactly K = 1 for this simplification. |
| Sallen-Key Q (non-unity gain) | $Q = \frac{\sqrt{R_1R_2C_1C_2}}{R_1C_2 + R_2C_2 + R_1C_1(1-K)}$ | The general design equation. The (1-K) term is what raises Q; dropping it makes every gain-K design wrong. |
| Sallen-Key Q (unity gain) | $Q = \frac{\sqrt{R_1R_2C_1C_2}}{C_2(R_1+R_2)}$ | Valid only for K = 1. Using it on a stage with gain overstates or understates Q depending on the topology. |
| Equal-component Q from gain | $Q = \frac{1}{3-K},\quad K = 1 + \frac{R_b}{R_a}$ | The most direct design lever - and the reason K must stay below 3: at K = 3, Q is infinite. |
| Butterworth gain setting | $K = 3 - \frac{1}{Q} = 1.586\ \mathrm{for}\ Q = 0.7071$ | With equal R and equal C. Implemented as Rb/Ra = 0.586, for example Ra = 10 kohm and Rb = 5.86 kohm. |
| Unity-gain capacitor ratio | $Q = \frac{1}{2}\sqrt{\frac{C_1}{C_2}},\quad \frac{C_1}{C_2} = 4Q^2$ | Equal resistors, K = 1. Butterworth needs C1 = 2C2; the ratio must be at least 2 or Q falls below 0.707. |
| Damping ratio | $\zeta = \frac{1}{2Q}$ | Butterworth zeta = 0.7071, Bessel 0.8660, Chebyshev 1 dB ripple 0.5227. |
| Q sensitivity to gain error | $\frac{\Delta Q}{Q} = \varepsilon\,QK$ | For a fractional gain error epsilon. 1% costs 1.1% of Q at Q = 0.707 but 14% at Q = 5 - high-Q stages need tight resistors. |
| Op-amp bandwidth requirement | $GBW \ge 100\,f_0Q$ | Rule of thumb to keep the finite op-amp gain from shifting f_0 and reducing Q; a 10 kHz, Q = 5 stage needs 5 MHz. |

## Interactive Widget

**Sallen Key Filter Tuner**

![[Sallen_Key_Filter_Tuner.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A Sallen-Key low-pass is built with $R_1 = R_2 = 10\ \mathrm{k\Omega}$, $C_1 = C_2 = 10\ \mathrm{nF}$ and unity gain. Find $f_0$, $Q$, the response at $f_0$, and the actual $-3\ \mathrm{dB}$ frequency.

**Given:** R1 = R2 = 10 kohm; C1 = C2 = 10 nF; K = 1

**Solution:**

1. RC = 1e4 x 1e-8 = 1e-4 s
2. f_0 = 1/(2 pi x 1e-4) = 1591.5 Hz
3. Equal components with K = 1 give Q = 1/(3-1) = 0.5
4. At f_0 the magnitude is exactly Q = 0.5, that is -6.0 dB
5. For Q = 0.5 the -3 dB point is at 0.6436 f_0 = 1024 Hz

> [!success]- Answer
> **$f_0 = 1.59\ \mathrm{kHz}$, $Q = 0.5$, $-6.0\ \mathrm{dB}$ at $f_0$, and a $-3\ \mathrm{dB}$ point at $1.02\ \mathrm{kHz}$.**

> [!warning] Trap
> Reporting the design as a 1.59 kHz Butterworth filter. Equal components with unity gain give $Q = 0.5$; the filter is overdamped and its real cutoff is 36% below $f_0$.

### P2. Keep $R_1 = R_2 = 10\ \mathrm{k\Omega}$ and $K = 1$ but make the stage Butterworth by choosing the capacitors. Find the required $C_1/C_2$ ratio, pick standard values, and compute the resulting $f_0$ and $Q$.

**Given:** R1 = R2 = 10 kohm; target Q = 0.7071; K = 1

**Solution:**

1. For equal resistors and K = 1: Q = 0.5 sqrt(C1/C2)
2. 0.7071 = 0.5 sqrt(C1/C2), so sqrt(C1/C2) = 1.4142 and C1/C2 = 2
3. Choose C2 = 10 nF, so C1 = 20 nF
4. f_0 = 1/(2 pi x 1e4 x sqrt(20e-9 x 10e-9)) = 1/(2 pi x 1e4 x 1.4142e-8)
5. f_0 = 1/(8.8858e-4) = 1125 Hz, and Q = 0.5 sqrt(2) = 0.7071

> [!success]- Answer
> **$C_1 = 20\ \mathrm{nF}$, $C_2 = 10\ \mathrm{nF}$ gives $f_0 = 1125\ \mathrm{Hz}$ with $Q = 0.7071$ (Butterworth, so $-3\ \mathrm{dB}$ at $f_0$).**

> [!warning] Trap
> Choosing $C_1 = C_2$ and then claiming Butterworth. The ratio is what sets Q when the gain is unity, so equal capacitors force $Q = 0.5$ regardless of the resistor values.

### P3. Design an equal-component Butterworth Sallen-Key low-pass with $f_0 = 1.59\ \mathrm{kHz}$ using $K > 1$. Find the required gain $K$ and the gain-setting resistors for $R_a = 10\ \mathrm{k\Omega}$.

**Given:** R1 = R2 = 10 kohm; C1 = C2 = 10 nF; target Q = 0.7071

**Solution:**

1. Equal components: Q = 1/(3-K)
2. 0.7071 = 1/(3-K), so 3 - K = 1.4142 and K = 1.5858
3. K = 1 + Rb/Ra, so Rb/Ra = 0.5858
4. With Ra = 10 kohm, Rb = 5.858 kohm; nearest standard value 5.9 kohm
5. Realized: K = 1.59, Q = 1/(3-1.59) = 0.709

> [!success]- Answer
> **$K = 1.586$, implemented as $R_a = 10\ \mathrm{k\Omega}$ and $R_b = 5.9\ \mathrm{k\Omega}$, giving $Q = 0.709$.**

> [!warning] Trap
> Sizing the gain without checking the $3-K$ denominator. Any accidental gain above 3 (a drifted resistor, a potentiometer turned up) makes $Q$ infinite or negative and the stage oscillates or latches.

### P4. A student builds the equal-component stage with $R_1 = R_2 = 10\ \mathrm{k\Omega}$, $C_1 = C_2 = 10\ \mathrm{nF}$ and $R_a = 10\ \mathrm{k\Omega}$, $R_b = 20\ \mathrm{k\Omega}$. Describe the behaviour, and what happens if $R_b$ drifts to $21\ \mathrm{k\Omega}$.

**Given:** R1 = R2 = 10 kohm; C1 = C2 = 10 nF; Ra = 10 kohm; Rb = 20 kohm

**Solution:**

1. K = 1 + Rb/Ra = 1 + 20/10 = 3.0
2. Q = 1/(3-K) = 1/0 = infinite
3. f_0 = 1/(2 pi x 1e4 x 1e-8) = 1591.5 Hz
4. With Rb = 21 kohm: K = 3.1, so Q = 1/(3-3.1) = -10 (negative Q means net positive feedback)

> [!success]- Answer
> **At $K = 3$ the stage has infinite $Q$ and oscillates at $f_0 = 1.59\ \mathrm{kHz}$; at $K = 3.1$ the feedback is net positive and the output latches to a rail.**

> [!warning] Trap
> Treating $K$ as an independent design variable. In the equal-component topology $K = 3$ is a hard stability boundary, so a 5% resistor drift is enough to turn a filter into an oscillator.

### P5. A unity-gain Sallen-Key low-pass uses $R_1 = R_2 = 10\ \mathrm{k\Omega}$ with $C_2 = 10\ \mathrm{nF}$ and $C_1 = 47\ \mathrm{nF}$. Find $Q$, $f_0$, and the resulting passband peak in dB.

**Given:** R1 = R2 = 10 kohm; C1 = 47 nF; C2 = 10 nF; K = 1

**Solution:**

1. Q = 0.5 sqrt(C1/C2) = 0.5 sqrt(4.7) = 0.5 x 2.1679 = 1.0840
2. sqrt(R1R2C1C2) = sqrt(1e8 x 4.7e-16) = sqrt(4.7e-8) = 2.1679e-4
3. f_0 = 1/(2 pi x 2.1679e-4) = 734.1 Hz
4. Peak frequency f_p = 734.1 x sqrt(1 - 1/(2 x 1.17499)) = 734.1 x 0.75794 = 556.4 Hz
5. M_p = 1.08398/sqrt(1 - 1/(4 x 1.17499)) = 1.08398/0.88726 = 1.2217, that is +1.74 dB

> [!success]- Answer
> **$Q = 1.084$, $f_0 = 734\ \mathrm{Hz}$, with a $+1.74\ \mathrm{dB}$ peak at $556\ \mathrm{Hz}$.**

> [!warning] Trap
> Assuming a unity-gain design has no peaking. $Q = 1.084 > 0.7071$, so the response rises $1.7\ \mathrm{dB}$ above the passband; and because the sensitivity is $\varepsilon QK$, a 5% capacitor tolerance spreads this peak considerably.

## Traps & Exam Notes

- **Believing the tidy equal-component unity-gain design is Butterworth.** It gives $Q = 0.5$: $-6\ \mathrm{dB}$ at $f_0$ and a $-3\ \mathrm{dB}$ point at $0.6436f_0$, so a nominal 1.59 kHz filter cuts off at 1.02 kHz.
- **Letting the gain reach $K = 3$ in the equal-component topology.** $Q = 1/(3-K)$ diverges at $K = 3$, so the filter oscillates at $f_0$; above 3 the feedback is net positive and the stage latches to a rail. A 1% resistor drift is enough.
- **Using the unity-gain Q formula on a stage with gain.** $Q = \sqrt{R_1R_2C_1C_2}/[C_2(R_1+R_2)]$ is valid only for $K = 1$; for $K \ne 1$ the $(1-K)$ term in the denominator is precisely the mechanism that raises Q.
- **Ignoring the Q sensitivity to component tolerance.** $\Delta Q/Q = \varepsilon QK$, so a 1% gain error costs 1.1% of Q at Butterworth but 14% at $Q = 5$. High-Q Sallen-Key stages need 1% or trimmed resistors, not 5%.
- **Ignoring the op-amp's finite gain-bandwidth.** The positive feedback that creates the complex poles is frequency-dependent, so a slow op-amp shifts $f_0$ and changes the realized Q; the working rule is $GBW \ge 100f_0Q$.
- **Reusing low-pass component values in the high-pass version.** The Sallen-Key high-pass swaps the roles of R and C, so the same four components in the high-pass topology give a different $f_0$ and can leave the stage with no DC feedback path at all.
- **Choosing a Chebyshev Q for a Bessel design, or vice versa.** $Q$ *is* the response family: 0.5774 for Bessel, 0.7071 for Butterworth, 0.864/0.957/1.305 for 0.5/1/3 dB Chebyshev. Using the wrong one silently changes both the passband shape and the step response.

## See Also

- [[07_Active_Filter_Responses]]
- [[11_Frequency_Response_and_Bode_Plots]]
- [[13_Gain-Bandwidth_Product_and_fT]]

---

[[07_Active_Filter_Responses|⬅ 07]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Temperature_Sensors|09 ➡]]
