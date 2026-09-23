---
id: ECE-07-04
title: "Integrators and Differentiators"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Linear_Op-Amp_Circuits]]", "[[10_Inductors,_Capacitors_and_Energy]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Integrators and Differentiators

> [!abstract] Scope
> Turn a capacitor into a frequency-dependent element around an op-amp to obtain the integral or the derivative of an input waveform, and fix the DC-gain and high-frequency instabilities those ideal circuits hide.

## Core Concept

> [!tip] Intuition
> A capacitor's current is proportional to the rate of change of its voltage. In the integrator the input resistor fixes the current and the capacitor accumulates it; in the differentiator the input capacitor fixes the current by the input slope and the feedback resistor turns that current into a voltage.

**The integrator.** Put the resistor in the input path and the capacitor in the feedback path, and the virtual ground forces $V_i/R$ to flow into $C$. Integrating $i = C\,dV_o/dt$ gives $V_o(t) = -\frac{1}{RC}\int_0^t V_i\,dt + V_o(0)$, or in the frequency domain $V_o/V_i = -1/(j\omega RC)$. The magnitude is $1/(\omega RC)$, which falls at 20 dB/decade, and the phase is $+90^\circ$ because $-1/j = +j$: the output *leads* the input. The gain is unity at $f_b = 1/(2\pi RC)$; below that frequency the ideal gain exceeds 1 and at DC it is theoretically infinite.

**Why the ideal integrator cannot work.** Infinite DC gain means any input offset voltage or bias current is integrated forever. A 2 mV offset with $RC = 10^{-4}\ \mathrm{s}$ drives the output 20 V/s into the rail in well under a second, and the circuit stops integrating. The standard fix is a feedback resistor $R_f$ across $C$, which bounds the DC gain at $-R_f/R_1$ and moves the break to $f_b = 1/(2\pi R_f C)$; a bias-current compensating resistor at $V_+$ removes the other half of the problem. A reset switch across the capacitor serves the same purpose in switched-integrator applications, and the initial condition $V_o(0)$ must always be carried through the arithmetic.

**The differentiator is the integrator with the parts swapped — and it is dangerous.** $V_o = -RC\,dV_i/dt$, with transfer function $-j\omega RC$: gain rises at 20 dB/decade without limit and the phase is $-90^\circ$. A unity-gain differentiator therefore has a gain of 1000 at 1 MHz, so it amplifies every bit of high-frequency noise and interacts with the op-amp's own phase shift to oscillate. The practical circuit adds a series input resistor $R_1$ that caps the high-frequency gain at $-R_f/R_1$ above $f_b = 1/(2\pi R_1 C)$, and a small capacitor across $R_f$ to roll the response off again. Even then, the input impedance is capacitive at low frequency and the stage is only used where the signal is already band-limited.

**Reading the two circuits from one picture.** Both are single-pole shapes with the same characteristic frequency formula $1/(2\pi RC)$, but the resistor that matters is different: for the integrator the break is set by the *feedback* resistor $R_f$ (with $R_1$ setting the high-frequency gain), while for the differentiator it is set by the *input* resistor $R_1$ (with $R_f$ setting the high-frequency gain). Substituting the wrong resistor is the single most common computational error in this topic. In the useful band the integrator attenuates by 20 dB per decade and the differentiator boosts by 20 dB per decade, so a triangle-to-square-to-triangle loop has a flat overall response only while both stages are ideal.

**Applications and the real limits.** A square wave into an integrator gives a triangle of peak-to-peak $V_p/(2 f RC)$, and a triangle into a differentiator gives a square of peak $4 f RC V_p$; those two relations are the standard waveform-generator exam questions, and both must be checked against the rails because the amplitude scales with $1/f$ or $f$. The op-amp must supply the required output slope, so the slew rate sets an upper frequency limit, and the GBW limits the small-signal accuracy. Capacitor dielectric matters too: electrolytic and high-K ceramic parts have voltage-dependent capacitance and dielectric absorption, so precision integrators use polystyrene, polypropylene or NP0.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Ideal integrator (time domain) | $V_o(t) = -\frac{1}{RC}\int_0^t V_i\,dt + V_o(0)$ | Virtual ground forces V_i/R into C. The V_o(0) term is the capacitor's initial state and must not be dropped. |
| Integrator transfer function | $\frac{V_o}{V_i} = -\frac{1}{j\omega RC}$ | Magnitude 1/(omega RC), phase +90 degrees (output leads). Falls at 20 dB/decade. |
| Integrator unity-gain frequency | $f_b = \frac{1}{2\pi RC}$ | Where the ideal gain equals 1. Below f_b the ideal gain exceeds 1 and the DC gain is infinite. |
| Practical integrator with R_f | $A_{DC} = -\frac{R_f}{R_1},\quad f_b = \frac{1}{2\pi R_f C}$ | R_f bounds the DC gain and stops offset and bias current from ramping the output into the rail. |
| Ideal differentiator (time domain) | $V_o(t) = -RC\frac{dV_i}{dt}$ | Unity gain at 1/(2 pi RC); gain then rises without limit, which is why the ideal form is never built. |
| Differentiator transfer function | $\frac{V_o}{V_i} = -j\omega RC$ | Phase -90 degrees. A 1 kHz unity-gain differentiator has a gain of 1000 at 1 MHz. |
| Practical differentiator limits | $A_{HF} = -\frac{R_f}{R_1},\quad f_b = \frac{1}{2\pi R_1 C}$ | The input resistor sets the corner and caps the high-frequency gain; Cf across Rf adds a second break. |
| Square wave into a triangle | $V_{pp} = \frac{V_p}{2 f RC}$ | V_p is the square wave's peak amplitude. The triangle amplitude grows as f falls, so low frequencies saturate first. |
| Triangle wave into a square | $V_{o,p} = 4 f R C\,V_p$ | The slope of a triangle of peak V_p at frequency f is 4 V_p f; the differentiator multiplies that slope by RC. |
| Integrator attenuation at frequency | $\lvert A\rvert = \frac{1}{2\pi f RC}$ | One decade above f_b the integrator attenuates by 20 dB; one decade below it amplifies by 20 dB. |

## Worked Problems

### P1. An ideal integrator uses $R = 10\ \mathrm{k\Omega}$ and $C = 0.01\ \mu\mathrm{F}$. A $1\ \mathrm{V}$ step is applied for $100\ \mu\mathrm{s}$ from an initial output of $0\ \mathrm{V}$. Find the output change and the output at the end of the pulse.

**Given:** R = 10 kohm; C = 0.01 uF; V_i = 1 V step; t = 100 us; V_o(0) = 0

**Solution:**

1. Time constant product: RC = 10^4 x 10^-8 = 10^-4 s
2. Delta V_o = -(1/RC) x V_i x t = -(1/10^-4)(1)(10^-4)
3. Delta V_o = -1.000 V
4. V_o(100 us) = V_o(0) - 1.000 = -1.000 V

> [!success]- Answer
> **$V_o = -1.000\ \mathrm{V}$ at the end of the pulse.**

> [!warning] Trap
> Losing the sign. A positive step integrated by an inverting integrator drives the output *negative*; and if the pulse were 1 ms long the ideal answer would be $-10\ \mathrm{V}$, which must be reported as clipping at the rail instead.

### P2. Find the unity-gain frequency of an ideal integrator with $R = 10\ \mathrm{k\Omega}$ and $C = 0.1\ \mu\mathrm{F}$, and then the practical $R_f$ needed to limit the DC gain to $40\ \mathrm{dB}$.

**Given:** R1 = 10 kohm; C = 0.1 uF; target DC gain = 40 dB

**Solution:**

1. RC = 10^4 x 10^-7 = 10^-3 s
2. f_b = 1/(2 pi RC) = 1/(2 pi x 10^-3) = 159.15 Hz
3. DC gain of 40 dB means a ratio of 10^2 = 100
4. Rf = 100 x R1 = 100 x 10 kohm = 1.0 Mohm

> [!success]- Answer
> **Unity gain at $f_b = 159.2\ \mathrm{Hz}$; $R_f = 1.0\ \mathrm{M\Omega}$ for a $40\ \mathrm{dB}$ DC gain.**

> [!warning] Trap
> Using $R_1$ in the corner formula for the practical integrator. Once $R_f$ is fitted, the corner is $1/(2\pi R_f C) = 1.59\ \mathrm{Hz}$, a hundred times lower than the ideal break frequency.

### P3. A practical integrator has $R_1 = 10\ \mathrm{k\Omega}$, $C = 0.1\ \mu\mathrm{F}$ and $R_f = 1\ \mathrm{M\Omega}$. Find its DC gain, its break frequency, and its gain at $159.2\ \mathrm{Hz}$.

**Given:** R1 = 10 kohm; Rf = 1 Mohm; C = 0.1 uF

**Solution:**

1. DC gain = -Rf/R1 = -1e6/1e4 = -100, which is 40 dB
2. Break frequency = 1/(2 pi Rf C) = 1/(2 pi x 1e6 x 1e-7) = 1.5915 Hz
3. Above the break the gain follows 1/(2 pi f R1 C)
4. At 159.2 Hz: |A| = 1/(2 pi x 159.2 x 1e4 x 1e-7) = 1/1.000 = 1.00

> [!success]- Answer
> **DC gain $-100$ ($40\ \mathrm{dB}$), break at $1.59\ \mathrm{Hz}$, and unity gain at $159.2\ \mathrm{Hz}$.**

> [!warning] Trap
> Thinking the $40\ \mathrm{dB}$ DC gain extends up to the ideal break frequency. The response is flat only below $1.59\ \mathrm{Hz}$ and is already at unity gain two decades higher.

### P4. A differentiator with $R = 10\ \mathrm{k\Omega}$ and $C = 0.01\ \mu\mathrm{F}$ is driven by a triangle wave of peak $1\ \mathrm{V}$ at $2\ \mathrm{kHz}$. Find the output waveform amplitude.

**Given:** R = 10 kohm; C = 0.01 uF; triangle V_p = 1 V; f = 2 kHz

**Solution:**

1. Triangle slope magnitude = 4 V_p f = 4 x 1 x 2000 = 8000 V/s
2. Differentiator gain factor: RC = 10^4 x 10^-8 = 10^-4 s
3. V_o peak = RC x slope = 10^-4 x 8000 = 0.800 V
4. The output is a square wave of +/-0.800 V

> [!success]- Answer
> **A square wave of $\pm 0.800\ \mathrm{V}$.**

> [!warning] Trap
> Using the peak-to-peak triangle amplitude in the slope formula. The slope of a triangle of *peak* $V_p$ is $4V_p f$, so substituting the 2 V peak-to-peak value makes the answer twice too large.

### P5. A differentiator uses $C = 0.01\ \mu\mathrm{F}$ and $R = 10\ \mathrm{k\Omega}$. Find its gain at $1\ \mathrm{kHz}$ and at $10\ \mathrm{kHz}$ for a $1\ \mathrm{V}$ peak sine input, and state what limits the usable frequency.

**Given:** C = 0.01 uF; R = 10 kohm; V_p = 1 V; f = 1 kHz and 10 kHz

**Solution:**

1. Gain magnitude = 2 pi f RC = 2 pi f x 10^-4
2. At 1 kHz: |A| = 2 pi x 1000 x 10^-4 = 0.628, so V_o peak = 0.628 V
3. At 10 kHz: |A| = 2 pi x 10000 x 10^-4 = 6.283, so the ideal output is 6.28 V
4. The ideal output already exceeds a +/-5 V supply, and the input resistor is needed to cap the gain

> [!success]- Answer
> **$0.628\ \mathrm{V}$ peak at $1\ \mathrm{kHz}$ and an ideal $6.28\ \mathrm{V}$ at $10\ \mathrm{kHz}$, which clips on typical rails.**

> [!warning] Trap
> Reading the differentiator's rising gain as useful bandwidth. The gain rises forever, so high-frequency noise is amplified by the same factor and the stage becomes unstable unless a series input resistor and feedback capacitor are added.

## Traps & Exam Notes

- **Building the ideal integrator with no $R_f$.** Its DC gain is infinite, so a $2\ \mathrm{mV}$ offset or $80\ \mathrm{nA}$ of bias current ramps the output into the rail within seconds. Every practical integrator has a feedback resistor or a reset switch.
- **Using the wrong resistor in the break-frequency formula.** The integrator's corner uses $R_f$ (the feedback resistor) and the differentiator's uses $R_1$ (the series input resistor). Swapping them moves the corner by two decades in a typical design.
- **Treating the differentiator as a safe building block.** Its gain rises at 20 dB/decade for ever, so a 1 kHz unity-gain differentiator has a gain of 1000 at 1 MHz: it amplifies noise and oscillates. The series input resistor is mandatory.
- **Dropping the sign and the initial condition.** Integrating a positive step drives the output negative, and the integral gives only the *change*; $V_o(0)$ must be carried through or the answer is offset by the capacitor's starting voltage.
- **Ignoring the op-amp slew-rate limit.** The integrator output must move at $V_i/(RC)$ volts per second, and the op-amp has to supply that slope. A design demanding $1\ \mathrm{V/\mu s}$ from an op-amp rated $0.5\ \mathrm{V/\mu s}$ produces a triangle with the wrong slope, not the computed one.
- **Ignoring capacitor dielectric behaviour.** Electrolytic and high-K ceramic capacitors have voltage-dependent capacitance and dielectric absorption, so an integrator built with them drifts and does not return to zero when reset; precision integrators use polystyrene, polypropylene or NP0.

## See Also

- [[02_Linear_Op-Amp_Circuits]]
- [[07_Active_Filter_Responses]]
- [[11_First_Order_RC_and_RL_Transients]]

---

[[03_Instrumentation_and_Difference_Amplifiers|⬅ 03]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Comparators_and_Schmitt_Triggers|05 ➡]]
