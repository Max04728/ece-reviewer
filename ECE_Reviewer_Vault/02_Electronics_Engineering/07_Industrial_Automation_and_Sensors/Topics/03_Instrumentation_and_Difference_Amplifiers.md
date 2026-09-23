---
id: ECE-07-03
title: "Instrumentation and Difference Amplifiers"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Linear_Op-Amp_Circuits]]", "[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Instrumentation and Difference Amplifiers

> [!abstract] Scope
> Amplify the difference between two sensor voltages while rejecting the common-mode level they both sit on, using the four-resistor difference amplifier or the three-op-amp instrumentation amplifier.

## Core Concept

> [!tip] Intuition
> A sensor in a bridge or a thermocouple sitting on a 2.5 V common-mode pedestal produces a tiny differential signal. Two matched resistor dividers subtract the pedestal; three op-amps do the same job while keeping both inputs at enormous impedance so the sensor is not loaded.

**The four-resistor difference amplifier.** The signal at $V_2$ passes through the $R_3$-$R_4$ divider into $V_+$ and is then amplified by the non-inverting gain $1+R_2/R_1$; the signal at $V_1$ passes through $R_1$ into a virtual ground and is amplified by $-R_2/R_1$. Superposition gives the exact result $V_o = (1+R_2/R_1)\frac{R_4}{R_3+R_4}V_2 - \frac{R_2}{R_1}V_1$. When the ratios match, $R_2/R_4 = R_1/R_3$ — most easily built as $R_1 = R_3$ and $R_2 = R_4$ — the two terms collapse to $V_o = (R_2/R_1)(V_2-V_1)$ and the common-mode term cancels exactly.

**Why matching, not the op-amp, sets CMRR.** Write the same expression as $V_o = A_d(V_2-V_1) + A_{cm}(V_2+V_1)/2$. The differential gain is $A_d = R_2/R_1$ and the common-mode gain is $A_{cm} = (1+R_2/R_1)\frac{R_4}{R_3+R_4} - \frac{R_2}{R_1}$, which is zero only when the ratio condition holds *exactly*. A 1% resistor therefore leaks a fraction of the common-mode voltage into the output, and because the op-amp's own CMRR is 100-120 dB while the resistor network gives 40-60 dB, the network is always the limiting factor. A worst-case estimate is $CMRR \approx (1+R_2/R_1)/(4\delta)$ for fractional tolerance $\delta$, which is why a discrete difference amplifier with 1% resistors and a gain of 10 manages only about 48 dB.

**The three-op-amp instrumentation amplifier.** The input stage is two non-inverting buffers whose inverting nodes are joined by the single gain resistor $R_{gain}$: because the same current flows through both $R$'s, the differential input is amplified by $1 + 2R/R_{gain}$ with the common-mode voltage passing through at unity gain. The second stage is a unity-gain difference amplifier that removes the common mode. The result is a differential gain that depends on exactly one resistor, an input impedance independent of gain, and a resistor network in the output stage that must be *matched* but not accurate — which is why laser-trimmed in-amps reach 100-120 dB CMRR.

**Where the CMRR actually goes.** Two effects defeat an instrumentation amplifier. The first is resistor tolerance in the subtractor, as above; the ($1+2R/R_{gain}$) gain multiplies any mismatch, so high-gain designs are *less* tolerant of a poor output stage. The second is source-impedance imbalance: any series resistance in one sensor lead — a long cable, an input filter resistor, a multiplexer's on-resistance — unbalances the network and converts common-mode voltage into a differential error. That is why in-amps for bridges and thermocouples are specified with a matched source impedance and often driven through a guard or a driven shield.

**Practical limits.** The common-mode input range of the input buffers is not rail-to-rail on most in-amps, so a bridge sitting at $V_{ex}/2$ needs either a split supply or an in-amp whose input range includes the positive rail. Single-supply parts also have an output that cannot swing below a few tens of millivolts. Gain-bandwidth trades against gain exactly as it does in a single op-amp, and the input stage's noise gain is $(1+2R/R_{gain})$ so the noise rises with the gain. For microvolt-level thermocouple work, the input offset drift and 1/f noise of the in-amp — not the resistor matching — dominate.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Matched difference amplifier | $V_o = \frac{R_2}{R_1}(V_2 - V_1)$ | Requires R2/R4 = R1/R3, most easily R1 = R3 and R2 = R4. Differential gain is R2/R1. |
| General four-resistor difference amplifier | $V_o = \left(1+\frac{R_2}{R_1}\right)\frac{R_4}{R_3+R_4}V_2 - \frac{R_2}{R_1}V_1$ | Exact superposition result for unequal resistors; use it whenever the bridge is not perfectly matched. |
| Common-mode gain of the difference amplifier | $A_{cm} = \left(1+\frac{R_2}{R_1}\right)\frac{R_4}{R_3+R_4} - \frac{R_2}{R_1}$ | Zero only when the resistor ratios match exactly; this term, not the op-amp, sets the stage CMRR. |
| CMRR definition | $CMRR_{dB} = 20\log_{10}\frac{A_d}{A_{cm}}$ | Voltage ratio, so 20 log. A measured 0.5 V output from a 5 V common-mode input with A_d = 100 implies about 60 dB. |
| Worst-case CMRR from resistor tolerance | $CMRR \approx \frac{1+R_2/R_1}{4\delta}$ | delta is the fractional tolerance (0.01 for 1%). Gain 10 with 1% parts gives about 48 dB - far below the op-amp's own CMRR. |
| Three-op-amp instrumentation amplifier gain | $G = \left(1+\frac{2R}{R_{gain}}\right)\frac{R_3}{R_2}$ | R are the two equal input-stage feedback resistors. With a unity-gain output stage, G = 1 + 2R/R_gain - note the factor of 2. |
| Instrumentation amplifier with R_gain open | $G = \frac{R_3}{R_2}$ | An open R_gain gives unity gain (the two buffers become followers), not infinite gain; a short gives the maximum gain. |
| Gain resistor selection | $R_{gain} = \frac{2R}{G-1}$ | Solve the gain equation for the resistor. For G = 100 and R = 25 kohm, R_gain = 505 ohm - and R_gain sets the *excess* over unity. |
| Differential input resistance | $R_{in,diff} = 2R_{in,opamp}$ | For the three-op-amp in-amp this is independent of gain. For the single-op-amp difference amplifier it is R1 + R3, which loads a bridge. |
| Bridge interface output | $V_o = G\,V_{ex}\frac{\Delta R}{4R}$ | Quarter-bridge case. The in-amp must reject the V_ex/2 common-mode pedestal while passing this millivolt-level difference. |

## Worked Problems

### P1. A four-resistor difference amplifier has $R_1 = R_3 = 10\ \mathrm{k\Omega}$, $R_2 = 100\ \mathrm{k\Omega}$ and $R_4 = 99\ \mathrm{k\Omega}$ (1% low). Inputs are $V_1 = 2.00\ \mathrm{V}$ and $V_2 = 2.05\ \mathrm{V}$. Find the exact output, the ideal output, and the resulting CMRR.

**Given:** R1 = R3 = 10 kohm; R2 = 100 kohm; R4 = 99 kohm; V1 = 2.00 V; V2 = 2.05 V

**Solution:**

1. Exact form: V_o = (1 + 100/10)(99/109)(2.05) - (100/10)(2.00)
2. 11 x 0.908257 = 9.99083; 9.99083 x 2.05 = 20.4812 V
3. V_o = 20.4812 - 20.0000 = 0.4812 V, against an ideal 0.5 V
4. A_d = (9.99083 + 10)/2 = 9.9954; A_cm = 9.99083 - 10 = -0.009175
5. CMRR = 9.9954/0.009175 = 1089, which is 20 log(1089) = 60.7 dB

> [!success]- Answer
> **$V_o = 0.4812\ \mathrm{V}$ instead of the ideal $0.500\ \mathrm{V}$; effective $CMRR = 60.7\ \mathrm{dB}$.**

> [!warning] Trap
> Using $V_o = 10(V_2-V_1) = 0.5\ \mathrm{V}$ and declaring the circuit matched. A single 1% resistor destroys the ratio condition and leaks $0.5\ \mathrm{V}$ of common-mode pedestal into the output as a $3.8\%$ error.

### P2. A three-op-amp instrumentation amplifier has input-stage resistors $R = 25\ \mathrm{k\Omega}$ and a gain resistor $R_{gain} = 1\ \mathrm{k\Omega}$. The output stage is unity gain. Find the overall gain and the output for a $5\ \mathrm{mV}$ differential input.

**Given:** R = 25 kohm; R_gain = 1 kohm; output stage gain = 1; V_diff = 5 mV

**Solution:**

1. G = 1 + 2R/R_gain = 1 + 2(25k)/1k = 1 + 50
2. G = 51
3. V_o = 51 x 5 mV = 255 mV

> [!success]- Answer
> **$G = 51$, so $V_o = 255\ \mathrm{mV}$.**

> [!warning] Trap
> Writing $G = 1 + R/R_{gain} = 26$. The two input buffers are joined by $R_{gain}$, so the current through it is set by *both* $R$ resistors and the gain is $1 + 2R/R_{gain}$.

### P3. An instrumentation amplifier must have a gain of exactly 100 with $R = 25\ \mathrm{k\Omega}$ in each input-stage feedback position and a unity-gain output stage. Find the required $R_{gain}$ and the gain obtained with the nearest standard value.

**Given:** target gain = 100; R = 25 kohm; R_2 = R_3 (output stage unity)

**Solution:**

1. 100 = 1 + 2R/R_gain = 1 + 50k/R_gain
2. 50k/R_gain = 99, so R_gain = 50000/99 = 505.05 ohm
3. Nearest standard value: 505 ohm
4. Realized gain = 1 + 50000/505 = 1 + 99.010 = 100.01

> [!success]- Answer
> **$R_{gain} = 505\ \mathrm{\Omega}$ gives $G = 100.01$, within $0.01\%$ of the target.**

> [!warning] Trap
> Solving $2R/R_{gain} = 100$ instead of $G-1 = 99$, which gives $R_{gain} = 500\ \mathrm{\Omega}$ and a realized gain of $101$. The gain resistor sets the *excess* over unity, not the total gain.

### P4. An instrumentation amplifier with $CMRR = 100\ \mathrm{dB}$ has a gain of 100 and sits on a $5\ \mathrm{V}$ common-mode level. Find the input-referred common-mode error and the output error.

**Given:** CMRR = 100 dB; G = 100; V_cm = 5 V

**Solution:**

1. CMRR_linear = 10^(100/20) = 10^5
2. Input-referred error = 5 V/10^5 = 50 uV
3. Output error = 50 uV x 100 = 5.0 mV

> [!success]- Answer
> **$50\ \mu\mathrm{V}$ input-referred, $5.0\ \mathrm{mV}$ at the output.**

> [!warning] Trap
> Forgetting that the common-mode error is amplified by the gain just like the signal. A 100 dB in-amp still produces millivolts of output error on a 5 V pedestal at a gain of 100.

### P5. A bridge output of $10\ \mathrm{mV}$ must be resolved to $1\ \mathrm{mV}$ at the output of a gain-100 stage while the bridge sits at a $2.5\ \mathrm{V}$ common-mode voltage. Find the CMRR required, and compare it with the best a discrete 1% difference amplifier of the same gain can do.

**Given:** V_cm = 2.5 V; G = 100; target output CM error < 1 mV; resistor tolerance = 1%

**Solution:**

1. Input-referred error allowed = 1 mV/100 = 10 uV
2. Required CMRR = 2.5 V/10 uV = 2.5 x 10^5, which is 20 log(2.5e5) = 108 dB
3. Discrete 1% difference amplifier: CMRR = (1+100)/(4 x 0.01) = 101/0.04 = 2525, or 68 dB
4. Shortfall = 108 - 68 = 40 dB

> [!success]- Answer
> **The application needs $108\ \mathrm{dB}$; 1% resistors give about $68\ \mathrm{dB}$, a $40\ \mathrm{dB}$ shortfall. A laser-trimmed instrumentation amplifier is required.**

> [!warning] Trap
> Specifying the op-amp's CMRR and ignoring the resistor network. A 120 dB op-amp inside four 1% resistors delivers the network's 68 dB, and the 40 dB gap is exactly the measurement error the design was meant to avoid.

## Traps & Exam Notes

- **Assuming a difference amplifier is matched because the schematic shows equal values.** The gain $R_2/R_1$ requires $R_2/R_4 = R_1/R_3$ exactly; a single 1% resistor breaks the cancellation and lets the common-mode pedestal through.
- **Blaming the op-amp for poor CMRR.** In a four-resistor difference amplifier the resistor tolerance dominates: 120 dB of op-amp CMRR inside 1% resistors still yields only about 48-68 dB, and no op-amp upgrade fixes it.
- **Ignoring source-impedance imbalance.** A long cable, an input filter resistor or a multiplexer on-resistance in one leg only unbalances the input network and converts common-mode voltage into a differential error, exactly the effect the in-amp was chosen to remove.
- **Using $1 + R/R_{gain}$ for the three-op-amp in-amp.** The gain of the input stage is $1 + 2R/R_{gain}$; dropping the factor of 2 halves the design gain, and it is the most common arithmetic error in this topic.
- **Expecting an open $R_{gain}$ to give infinite gain.** With $R_{gain}$ open the two buffers degenerate to followers and the gain is that of the output stage alone, typically unity.
- **Applying the matched-pair gain formula at a gain the resistors cannot support.** At $A_d = 100$ the tolerance-driven CMRR falls as $(1+A_d)/4\delta$, so raising the gain of a resistor-matched difference amplifier makes its common-mode rejection *worse*.

## See Also

- [[01_Op-Amp_Fundamentals_and_Real_Parameters]]
- [[02_Linear_Op-Amp_Circuits]]
- [[10_Strain_Gauges_and_Wheatstone_Bridge]]
- [[12_Signal_Conditioning_and_DAQ]]

---

[[02_Linear_Op-Amp_Circuits|⬅ 02]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Integrators_and_Differentiators|04 ➡]]
