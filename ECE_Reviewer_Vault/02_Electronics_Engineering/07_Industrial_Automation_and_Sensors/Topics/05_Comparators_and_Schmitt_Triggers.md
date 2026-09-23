---
id: ECE-07-05
title: "Comparators and Schmitt Triggers"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Linear_Op-Amp_Circuits]]", "[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Comparators and Schmitt Triggers

> [!abstract] Scope
> Compare two voltages and produce a clean digital output, and add positive feedback so that noise on a slow analog input cannot cause multiple transitions.

## Core Concept

> [!tip] Intuition
> A comparator is an op-amp used open-loop, so its output is always slammed to a rail and the only question is which rail. Adding positive feedback makes the threshold depend on the output state, which turns one trip point into two and gives the circuit a memory of its last decision.

**Open-loop comparator.** With no feedback the op-amp's enormous gain means the output is at a rail for all inputs except a band of width $V_{sat}/A_{ol}$ — microvolts — around the point where $V_+ = V_-$. So the transfer characteristic is a step: $V_o = +V_{sat}$ when $V_+ > V_-$ and $-V_{sat}$ otherwise. The saturation level is not the supply: a 741 on $\pm15\ \mathrm{V}$ reaches about $\pm13\ \mathrm{V}$, so a problem that assumes $\pm15\ \mathrm{V}$ thresholds is already 15% wrong. Dedicated comparators (LM393, LM339) are uncompensated for speed, have an open-collector output that can be pulled to a different logic supply, and specify propagation delay rather than gain-bandwidth.

**The noise problem that hysteresis solves.** A comparator has no dead band, so an input that crosses the reference slowly with even a few millivolts of noise on it makes the output chatter between the rails at the noise rate. The cure is *positive* feedback: a resistor from the output back to the non-inverting input makes the threshold depend on the output state. When the output is high the threshold is $V_{UT}$; the moment the input crosses it the output drops, which lowers the threshold to $V_{LT}$ and latches the new state. A resistor from the output to the inverting input is *negative* feedback and produces a linear amplifier with a small gain, not a Schmitt trigger.

**Inverting and non-inverting forms.** In the inverting Schmitt trigger the signal enters $V_-$ while $R_1$ goes from $V_+$ to a reference and $R_2$ goes from $V_o$ to $V_+$. The divider gives $V_+ = (V_oR_1 + V_{ref}R_2)/(R_1+R_2)$, so the two thresholds are $V_{UT} = (V_{sat}R_1 + V_{ref}R_2)/(R_1+R_2)$ and $V_{LT} = (-V_{sat}R_1 + V_{ref}R_2)/(R_1+R_2)$, a width of $2V_{sat}R_1/(R_1+R_2)$ centred on $V_{ref}R_2/(R_1+R_2)$ — *not* on $V_{ref}$ itself, because $R_1$ loads the reference. In the non-inverting form the signal enters $V_+$ through $R_1$ and $R_2$ feeds back from the output; the thresholds are $\pm V_{sat}R_1/R_2$. Note the different ratio, and note that the non-inverting form latches if $R_1 > R_2$, because no input within the rails can then overcome the feedback.

**Choosing the hysteresis width.** The width must exceed the peak-to-peak noise riding on the input, and it must be small enough that it does not distort the measurement. A zero-crossing detector asked to ignore $100\ \mathrm{mV}$ of noise needs a width above $100\ \mathrm{mV}$; with $V_{sat} = \pm12\ \mathrm{V}$ that means $R_1/(R_1+R_2) > 0.1/24$, so $R_2$ below about $239\ \mathrm{k\Omega}$ for $R_1 = 1\ \mathrm{k\Omega}$. At such small widths the comparator's own input offset voltage — a few millivolts, not divided by any feedback — becomes a first-order threshold error, and the offset drift with temperature shifts the threshold with it.

**Dynamic behaviour.** The transition is a slewing event: the output must move the full $\Delta V$ between rails, so the transition time is $\Delta V/SR$ and can easily be tens of microseconds for an op-amp with a 1 V/µs slew rate. Hysteresis improves noise immunity but costs a small amount of threshold accuracy and adds a propagation delay; it does nothing about the output's rise time, which for an open-collector part is set by the pull-up resistor and the load capacitance ($2.2RC$). Finally, the analog input range of a comparator is a real limit: an op-amp whose common-mode range stops 2 V below the positive rail cannot be used to compare against a reference near that rail.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Comparator decision rule | $V_o = +V_{sat}\ \mathrm{if}\ V_+ > V_-,\ \mathrm{else}\ -V_{sat}$ | Open-loop, no feedback: the output is always at a rail, so the only analysis question is which rail. |
| Output saturation levels | $V_{sat} \approx V_{CC} - 1.5\ \mathrm{V}$ | For a 741-style op-amp on +/-15 V the output reaches only about +/-13 V. Rail-to-rail comparators come within 100-200 mV of each rail. |
| Simple comparator threshold | $V_{in,th} = V_{ref}$ | No hysteresis: the switching point is where the two inputs are equal, so input noise produces output chatter. |
| Inverting Schmitt thresholds | $V_{UT} = \frac{V_{sat}R_1 + V_{ref}R_2}{R_1+R_2},\quad V_{LT} = \frac{-V_{sat}R_1 + V_{ref}R_2}{R_1+R_2}$ | Signal into V-, R1 from V+ to V_ref, R2 from V_o to V+. With V_ref = 0 the thresholds are symmetric. |
| Hysteresis width (inverting) | $V_H = V_{UT} - V_{LT} = \frac{2V_{sat}R_1}{R_1+R_2}$ | Independent of V_ref, so the reference shifts both thresholds without changing the noise immunity. |
| Non-inverting Schmitt thresholds | $V_{UT} = +\frac{V_{sat}R_1}{R_2},\quad V_{LT} = -\frac{V_{sat}R_1}{R_2}$ | Signal via R1 into V+, R2 from V_o to V+. Needs R1 < R2; if R1 > R2 the circuit latches and no input within the rails can switch it. |
| Transition time from slew rate | $t_r = \frac{\Delta V}{SR}$ | Moving 12 V with SR = 1 V/us takes 12 us. The slew rate, not the propagation delay, usually dominates. |
| Open-collector output | $V_{OH} = V_{pullup},\quad I_{OL} = \frac{V_{pullup} - V_{OL}}{R_{pullup}}$ | The high level is set by the external pull-up supply, which is how a comparator level-shifts into 3.3 V logic. |
| Noise-immunity requirement | $V_H > V_{noise,pp}$ | Hysteresis smaller than the peak-to-peak noise still allows several transitions on one slow edge. |
| Offset as threshold error | $\Delta V_{th} = V_{OS}$ | No feedback divides the offset, so V_OS shifts both thresholds directly; 9 mV of offset on a 54 mV threshold is a 17% error. |

## Interactive Widget

**Schmitt Hysteresis Loop**

![[Schmitt_Hysteresis_Loop.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An inverting Schmitt trigger uses $R_1 = 10\ \mathrm{k\Omega}$ from $V_+$ to ground and $R_2 = 100\ \mathrm{k\Omega}$ from the output, with the signal applied to $V_-$ and saturation levels of $\pm13\ \mathrm{V}$. Find both thresholds and the hysteresis width.

**Given:** R1 = 10 kohm; R2 = 100 kohm; V_sat = +/-13 V; V_ref = 0

**Solution:**

1. Divider: V+ = V_o x R1/(R1+R2) = V_o x 10/110
2. Output high: V_UT = 13 x 0.090909 = 1.1818 V
3. Output low: V_LT = -13 x 0.090909 = -1.1818 V
4. Width = 2.3636 V

> [!success]- Answer
> **$V_{UT} = +1.18\ \mathrm{V}$, $V_{LT} = -1.18\ \mathrm{V}$, width $2.36\ \mathrm{V}$.**

> [!warning] Trap
> Using the supply value instead of the saturation value. With $\pm15\ \mathrm{V}$ assumed the thresholds come out at $\pm1.36\ \mathrm{V}$, a 15% error, because a 741 loses about 1.5 V inside each rail.

### P2. A non-inverting Schmitt trigger has $R_1 = 10\ \mathrm{k\Omega}$ in series with the input at $V_+$ and $R_2 = 47\ \mathrm{k\Omega}$ from the output to $V_+$. Saturation is $\pm12\ \mathrm{V}$. Find the thresholds and the width, and check that the circuit does not latch.

**Given:** R1 = 10 kohm; R2 = 47 kohm; V_sat = +/-12 V

**Solution:**

1. Thresholds are +/-V_sat x R1/R2 = +/-12 x 10/47
2. V_UT = +2.553 V, V_LT = -2.553 V
3. Width = 5.106 V
4. R1 < R2 (10 kohm < 47 kohm), so the feedback is weak enough for the input to switch the circuit

> [!success]- Answer
> **$V_{UT} = +2.55\ \mathrm{V}$, $V_{LT} = -2.55\ \mathrm{V}$, width $5.11\ \mathrm{V}$; no latch because $R_1 < R_2$.**

> [!warning] Trap
> Applying the inverting-Schmitt formula $V_{sat}R_1/(R_1+R_2) = 2.11\ \mathrm{V}$. The non-inverting topology uses $V_{sat}R_1/R_2$, and the two answers differ by 20% here.

### P3. Design an inverting Schmitt trigger with thresholds at $\pm2.0\ \mathrm{V}$ using an op-amp whose saturation levels are $\pm10\ \mathrm{V}$. Choose standard resistor values and report the realized thresholds.

**Given:** target V_UT = +2.0 V; target V_LT = -2.0 V; V_sat = +/-10 V

**Solution:**

1. Need V_sat x R1/(R1+R2) = 2.0, so 10 R1 = 2.0(R1+R2)
2. 10 R1 = 2 R1 + 2 R2, hence 8 R1 = 2 R2 and R2 = 4 R1
3. Choose R1 = 10 kohm, so R2 = 40 kohm; nearest standard value is 39 kohm
4. Realized threshold = 10 x 10/49 = 2.041 V

> [!success]- Answer
> **$R_1 = 10\ \mathrm{k\Omega}$, $R_2 = 39\ \mathrm{k\Omega}$, giving $V_{UT} = \pm2.04\ \mathrm{V}$.**

> [!warning] Trap
> Solving $V_{sat}R_1/R_2 = 2$ and getting $R_2 = 5R_1$. That is the non-inverting ratio; in this topology the divider is $R_1/(R_1+R_2)$, so $R_2 = 4R_1$.

### P4. An open-collector comparator drives a 3.3 V logic input through a $4.7\ \mathrm{k\Omega}$ pull-up and has $V_{OL} = 0.2\ \mathrm{V}$. Find the sink current when the output is low and the rise time with a $50\ \mathrm{pF}$ load capacitance.

**Given:** V_pullup = 3.3 V; R_pullup = 4.7 kohm; V_OL = 0.2 V; C_load = 50 pF

**Solution:**

1. Sink current = (3.3 - 0.2)/4700 = 3.1/4700 = 0.6596 mA
2. Rise time constant: R C = 4700 x 50e-12 = 235 ns
3. Rise time (10% to 90%) = 2.2 RC = 2.2 x 235 ns = 517 ns

> [!success]- Answer
> **$I_{OL} = 0.66\ \mathrm{mA}$ and a rise time of about $517\ \mathrm{ns}$.**

> [!warning] Trap
> Forgetting that an open-collector output has no internal pull-up: without the resistor the output never goes high, and with too large a resistor the rise time ($2.2RC$) swamps the comparator's own switching speed.

### P5. A zero-crossing detector with saturation levels of $\pm12\ \mathrm{V}$ must ignore $100\ \mathrm{mV}$ peak-to-peak noise on a slowly varying input. Using an inverting Schmitt configuration, choose $R_1$ and $R_2$ and report the threshold accuracy problem.

**Given:** V_sat = +/-12 V; noise = 100 mV pp; R1 = 1 kohm (chosen)

**Solution:**

1. Required width > 0.1 V: 2 x 12 x R1/(R1+R2) > 0.1
2. 24 R1/(R1+R2) > 0.1, so R1/(R1+R2) > 4.167e-3
3. With R1 = 1 kohm: R2 < 239 kohm; choose R2 = 220 kohm
4. Realized width = 24 x 1/221 = 0.1086 V, thresholds +/-54.3 mV
5. A comparator with 9 mV worst-case V_OS has a 9/54.3 = 17% threshold error

> [!success]- Answer
> **$R_1 = 1\ \mathrm{k\Omega}$, $R_2 = 220\ \mathrm{k\Omega}$ gives a width of $108.6\ \mathrm{mV}$ (thresholds $\pm54.3\ \mathrm{mV}$), but a $9\ \mathrm{mV}$ offset is a $17\%$ error.**

> [!warning] Trap
> Designing the hysteresis and then ignoring the comparator's own input offset. No feedback divides $V_{OS}$, so at small threshold levels the offset and its temperature drift dominate the accuracy.

## Traps & Exam Notes

- **Using positive feedback by accident.** Hysteresis requires the feedback resistor to return to the *non-inverting* input. A resistor from the output to $V_-$ is negative feedback and produces a low-gain linear amplifier that simply follows the input.
- **Mixing the two threshold formulas.** The inverting Schmitt uses $V_{sat}R_1/(R_1+R_2)$ while the non-inverting form uses $V_{sat}R_1/R_2$. Applying the wrong one is a 10-30% threshold error and changes the required resistor ratio completely.
- **Assuming the hysteresis band is centred on $V_{ref}$.** With $R_1$ to $V_{ref}$ and $R_2$ to the output, the band is centred at $V_{ref}R_2/(R_1+R_2)$ because $R_1$ loads the reference; a 2.5 V reference with $R_1 = R_2$ centres the band on 1.25 V.
- **Substituting the supply voltage for $V_{sat}$.** A 741 or LM358 loses 1-2 V inside each rail, so thresholds computed from $\pm15\ \mathrm{V}$ are 10-15% high, and the error grows as the load current increases.
- **Using an op-amp where a comparator is required.** The op-amp's compensation capacitor limits its slew rate, so the transition time is $\Delta V/SR$ rather than a few nanoseconds, and large differential input voltages can damage the input stage.
- **Making the hysteresis too narrow.** If the band is smaller than the peak-to-peak noise the output still chatters, and the comparator's own offset voltage and drift then move the threshold unpredictably.
- **Designing a non-inverting Schmitt with $R_1 > R_2$.** The feedback then overpowers the input and the circuit latches in one state; no input within the rails can switch it.

## See Also

- [[01_Op-Amp_Fundamentals_and_Real_Parameters]]
- [[06_Precision_Rectifiers]]
- [[12_Signal_Conditioning_and_DAQ]]

---

[[04_Integrators_and_Differentiators|⬅ 04]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Precision_Rectifiers|06 ➡]]
