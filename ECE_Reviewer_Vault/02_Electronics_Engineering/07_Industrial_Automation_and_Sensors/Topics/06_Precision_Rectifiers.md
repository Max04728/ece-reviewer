---
id: ECE-07-06
title: "Precision Rectifiers"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Diode_Characteristics_and_Shockley]]", "[[02_Linear_Op-Amp_Circuits]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Precision Rectifiers

> [!abstract] Scope
> Rectify signals far below the diode knee by placing the diode inside an op-amp feedback loop, and build half-wave, full-wave and absolute-value outputs whose accuracy is set by the op-amp rather than by the diode.

## Core Concept

> [!tip] Intuition
> A diode needs about 0.6 V across it before it conducts, which destroys any attempt to rectify a millivolt signal. Wrapping the diode in the feedback loop makes the op-amp supply that 0.6 V itself, so the output follows the input down to microvolts.

**The superdiode.** Put the diode in the op-amp's feedback path and take the output from the cathode: the op-amp now drives its own output one diode drop *above* the required output voltage, so the diode is always conducting when it should be and the loop forces $V_o = V_+ = V_i$. Deriving the residual error from $V_o + V_D = A_{ol}(V_i - V_o)$ gives $V_o = (A_{ol}V_i - V_D)/(1+A_{ol}) \approx V_i - V_D/A_{ol}$. The diode drop is divided by the open-loop gain: $0.6\ \mathrm{V}$ with $A_{ol} = 10^5$ leaves $6\ \mu\mathrm{V}$ of error, and a $10\ \mathrm{mV}$ input rectifies to $9.994\ \mathrm{mV}$ instead of vanishing below a 0.6 V knee. That single division is the whole point of the circuit.

**Half-wave and gain variants.** With the diode in the feedback loop around a unity-gain buffer the output is a half-wave rectified copy of the input: $V_o = V_i$ for one polarity and approximately zero for the other (the second diode, which clamps the op-amp out of saturation, holds the output at a virtual zero rather than letting it follow the op-amp to the rail). Adding an input resistor $R_1$ and a feedback resistor $R_f$ gives a precise gain, $V_o = -(R_f/R_1)V_i$ during the conducting half-cycle, and a second diode in the opposite direction keeps the op-amp from saturating when the first one is off. Without that clamping diode the op-amp saturates during the blocked half-cycle and takes its full recovery time — many microseconds — to come back, which is what limits the rectifier's bandwidth.

**Full-wave and absolute value.** A precision absolute-value circuit uses two op-amps: the first produces a precision half-wave signal $V_1$, and the second is an inverting summer that adds the original input with weight 1 and the half-wave signal with weight 2, so $V_o = -(V_i + 2V_1)$. For $V_i > 0$ the first stage gives $V_1 = -V_i$ and the sum is $-(V_i - 2V_i) = +V_i$; for $V_i < 0$ the first stage gives $V_1 = 0$ and the sum is $-V_i$. Either way $V_o = |V_i|$. The 1:2 weighting is the whole trick: with equal summing resistors the two terms cancel for positive inputs and the output is zero for half the cycle.

**Reading the result.** A rectified sine has a DC average, not an RMS value, and the two are different numbers. For a full-wave rectified sine of peak $V_p$ the average is $2V_p/\pi = 0.6366V_p$ and the RMS is $0.7071V_p$; for half-wave it is $V_p/\pi$. An average-responding DC meter applies the sine form factor 1.11 to its reading, so it indicates the correct RMS only for a sine — for a square wave or a distorted waveform the indication is wrong by the form-factor ratio. Rectifier-based measurement circuits are therefore specified with a crest factor, and true-RMS converters use thermal or computational methods instead.

**Real limits.** The op-amp has to leave saturation and re-enter it once per half-cycle, so the usable bandwidth is set by slew rate, $f_{max} = SR/(2\pi V_p)$, not by the small-signal GBW, and it gets much worse at low amplitude because the recovery time is roughly fixed while the signal period is not. At very low inputs the op-amp's own $V_{OS}$ and $I_B$ are rectified along with the signal and appear as a DC output offset: at a gain of 62 a $2\ \mathrm{mV}$ offset becomes $124\ \mathrm{mV}$ of DC error, which is 6% of a 2 V output. The output stage must also have a diode drop of headroom beyond the required output, so the rectifier clips one diode drop earlier than an equivalent amplifier, and single-supply versions must have an input common-mode range that includes ground.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Precision half-wave transfer | $V_o = V_i\ \mathrm{for}\ V_i > 0,\quad V_o = 0\ \mathrm{for}\ V_i < 0$ | Non-inverting superdiode: the diode is inside the feedback loop and the output is taken at the cathode. |
| Superdiode residual error | $V_o = \frac{A_{ol}V_i - V_D}{1+A_{ol}} \approx V_i - \frac{V_D}{A_{ol}}$ | The diode drop is divided by A_ol: 0.6 V with A_ol = 10^5 leaves 6 uV of error instead of a 0.6 V dead band. |
| Inverting precision half-wave with gain | $V_o = -\frac{R_f}{R_1}V_i$ | Valid only during the conducting half-cycle; for the other polarity the clamping diode holds the output near zero. |
| Precision full-wave (absolute value) | $V_o = \lvert V_i\rvert$ | Two-op-amp circuit; the second stage sums the input with weight 1 and the half-wave signal with weight 2. |
| Full-wave rectifier with gain | $V_o = \frac{R_f}{R}\lvert V_i\rvert$ | Scale both summing resistors together; the 1:2 ratio between the two inputs must be preserved or the output collapses. |
| Average of a full-wave rectified sine | $V_{avg} = \frac{2V_p}{\pi} = 0.6366\,V_p$ | Full-wave DC average. The RMS of the same sine is 0.7071 V_p - a different number. |
| Average of a half-wave rectified sine | $V_{avg} = \frac{V_p}{\pi} = 0.3183\,V_p$ | Exactly half the full-wave value; mixing the two is a factor-of-2 error. |
| Sine form factor | $FF = \frac{V_{rms}}{V_{avg}} = \frac{0.7071}{0.6366} = 1.11$ | An average-responding meter multiplies its reading by 1.11, so it indicates true RMS only for a sine. |
| Slew-rate frequency limit | $f_{max} = \frac{SR}{2\pi V_p}$ | The op-amp must exit saturation once per half cycle, so SR - not small-signal GBW - sets the rectifier bandwidth. |
| Peak-detector droop | $\Delta V = \frac{I_{leak}\,\Delta t}{C}$ | Hold-capacitor discharge between peaks: 1 nA into 0.1 uF for 10 ms is 100 uV, but for 1 s it is 10 mV. |

## Worked Problems

### P1. A superdiode uses an op-amp with $A_{ol} = 10^5$ and a silicon diode with $V_D = 0.6\ \mathrm{V}$. The input is $10\ \mathrm{mV}$. Find the output, and state what a plain diode would give.

**Given:** A_ol = 10^5; V_D = 0.6 V; V_i = 10 mV

**Solution:**

1. V_o = (A_ol V_i - V_D)/(1 + A_ol)
2. Numerator: 10^5 x 0.01 - 0.6 = 1000 - 0.6 = 999.4
3. V_o = 999.4/100001 = 9.9940 mV
4. Equivalent: V_o = V_i - V_D/A_ol = 10 mV - 6 uV
5. A plain diode needs 0.6 V to conduct, so it would output 0 V

> [!success]- Answer
> **$V_o = 9.994\ \mathrm{mV}$; a plain diode would give $0\ \mathrm{V}$.**

> [!warning] Trap
> Concluding the diode drop still matters because it appears at the op-amp's output. It does appear there, but the *output* error is $V_D/A_{ol} = 6\ \mu\mathrm{V}$, five orders of magnitude smaller.

### P2. An inverting precision half-wave rectifier has $R_1 = 1\ \mathrm{k\Omega}$ and $R_f = 10\ \mathrm{k\Omega}$. Find the output for $V_i = +0.2\ \mathrm{V}$ and for $V_i = -0.2\ \mathrm{V}$.

**Given:** R1 = 1 kohm; Rf = 10 kohm; V_i = +/-0.2 V

**Solution:**

1. Gain during the conducting half-cycle = -Rf/R1 = -10
2. For the polarity that forward-biases the feedback diode: V_o = -10 x 0.2 V = -2.0 V
3. For the opposite polarity the diode is reverse-biased and blocked; the clamping diode holds the output at approximately 0 V
4. So V_o = -2.0 V for V_i = +0.2 V and V_o = 0 V for V_i = -0.2 V

> [!success]- Answer
> **$-2.0\ \mathrm{V}$ for the conducting polarity and $0\ \mathrm{V}$ for the other.**

> [!warning] Trap
> Assuming the output simply follows $-(R_f/R_1)V_i$ for both polarities. That would give $+2.0\ \mathrm{V}$ for the negative input, but the rectifier blocks that half-cycle by design.

### P3. A precision absolute-value circuit with unity gain is driven by a $3\ \mathrm{V}$ peak sine at $1\ \mathrm{kHz}$. Find the peak, DC average and RMS values of its output, and what an average-responding meter scaled by the sine form factor would indicate.

**Given:** V_p = 3 V; f = 1 kHz; gain = 1; full-wave output

**Solution:**

1. Output = |V_i|, so the peak value is 3.0 V
2. DC average = 2 V_p/pi = 0.6366 x 3 = 1.9099 V
3. RMS = V_p/sqrt(2) = 3/1.4142 = 2.1213 V
4. Average-responding meter: 1.9099 x 1.11 = 2.120 V, which matches the true RMS because the input is a sine

> [!success]- Answer
> **Peak $3.0\ \mathrm{V}$, average $1.91\ \mathrm{V}$, RMS $2.12\ \mathrm{V}$; the scaled meter reads $2.12\ \mathrm{V}$.**

> [!warning] Trap
> Reporting the average as the RMS. $0.6366V_p$ and $0.7071V_p$ differ by 11%, which is exactly the form factor of a sine — and the meter's 1.11 scaling only works for that waveform.

### P4. A precision rectifier must produce a $10\ \mathrm{V}$ peak output, and the op-amp has $SR = 1\ \mathrm{V/\mu s}$. Find the maximum input frequency and explain what happens above it.

**Given:** V_p = 10 V; SR = 1 V/us

**Solution:**

1. SR = 1 V/us = 10^6 V/s
2. f_max = SR/(2 pi V_p) = 10^6/(2 pi x 10) = 15915 Hz
3. Above 15.9 kHz the op-amp cannot leave saturation and return within one half-cycle
4. The output amplitude falls and the waveform distorts rather than merely attenuating

> [!success]- Answer
> **$f_{max} \approx 15.9\ \mathrm{kHz}$; above it the output distorts as the op-amp fails to recover from saturation.**

> [!warning] Trap
> Using the small-signal gain-bandwidth product to set the limit. A precision rectifier's bandwidth is set by slew-rate recovery from saturation, so a 1 MHz GBW op-amp can be limited to a few tens of kilohertz at 10 V.

### P5. A full-wave precision rectifier must convert a $50\ \mathrm{mV}$ peak sensor signal into a $2\ \mathrm{V}$ DC average. Find the required gain and the resistor values for $R = 1\ \mathrm{k\Omega}$, then estimate the DC error from a $2\ \mathrm{mV}$ input offset voltage.

**Given:** V_p = 50 mV; target V_avg = 2 V; R = 1 kohm; V_OS = 2 mV

**Solution:**

1. V_avg = 0.6366 x G x V_p, so G = 2/(0.6366 x 0.05) = 2/0.03183 = 62.8
2. Use Rf = 62 kohm with R = 1 kohm: V_avg = 0.6366 x 0.05 x 62 = 1.973 V
3. Offset error at the output = V_OS x G = 2 mV x 62 = 124 mV
4. Percentage error = 0.124/1.973 = 6.3%

> [!success]- Answer
> **$G \approx 63$ ($R = 1\ \mathrm{k\Omega}$, $R_f = 62\ \mathrm{k\Omega}$), giving $V_{avg} = 1.97\ \mathrm{V}$ with a $124\ \mathrm{mV}$ ($6.3\%$) offset error.**

> [!warning] Trap
> Choosing a high gain for a small signal and then ignoring the DC errors. The rectifier passes the op-amp's offset through the same gain as the signal, and unlike noise it cannot be averaged out.

## Traps & Exam Notes

- **Concluding that the diode drop disappears entirely.** It does not vanish - the op-amp must produce it at its own output - but the *output* error is $V_D/A_{ol}$, so 0.6 V becomes microvolts rather than an effective 0.6 V dead band.
- **Forgetting the clamping diode and the saturation recovery.** With only one diode the op-amp saturates whenever the signal is blocked, and the recovery time (set by slew rate) limits the useful bandwidth to a few tens of kilohertz even with a 1 MHz op-amp.
- **Dropping the 1:2 summing ratio in the full-wave circuit.** If the second stage weights the half-wave signal equally with the input, the two terms cancel for positive inputs and the output is zero for half the cycle.
- **Confusing average and RMS.** For a full-wave rectified sine the average is $0.6366V_p$ and the RMS is $0.7071V_p$; an average-responding meter only indicates true RMS because it multiplies by the 1.11 form factor of a sine.
- **Assuming the op-amp output has the headroom.** The op-amp output sits one diode drop above the rectifier output, so the circuit clips a diode drop earlier than an equivalent amplifier and loses a further diode drop at low supply voltages.
- **Building a single-supply precision rectifier without checking the input range.** If the op-amp's common-mode range or output swing does not include ground, the negative half-cycle is lost or the stage latches.
- **Ignoring the rectified input bias current.** $I_B$ through the feedback resistor appears as a DC output offset — and in a rectifier, unlike an amplifier, that offset is present even with a zero-mean input.

## See Also

- [[06_Filters,_Ripple_Factor_and_PIV]]
- [[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge]]
- [[05_Comparators_and_Schmitt_Triggers]]

---

[[05_Comparators_and_Schmitt_Triggers|⬅ 05]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Active_Filter_Responses|07 ➡]]
