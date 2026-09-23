---
id: ECE-07-01
title: "Op-Amp Fundamentals and Real Parameters"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]", "[[06_Small-Signal_re_Model_CE,_CB,_CC]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Op-Amp Fundamentals and Real Parameters

> [!abstract] Scope
> Quantify how a real op-amp departs from the ideal gain block: finite open-loop gain, gain-bandwidth roll-off, slew rate, input offset and bias currents, CMRR, PSRR and output saturation.

## Core Concept

> [!tip] Intuition
> Negative feedback trades raw gain for control. Because the open-loop gain is enormous, the differential input voltage is forced to almost zero and two external resistors alone set the answer; every real parameter is a quantitative statement of how much error that word almost leaves behind.

**What the ideal model buys you.** An ideal op-amp is five infinities and one zero: infinite open-loop gain $A_{ol}$, infinite input resistance, infinite CMRR and PSRR, infinite bandwidth and slew rate, and zero output resistance, offset and bias current. Almost all of that is bookkeeping, because closed-loop analysis needs only two rules: with negative feedback the differential input is driven to zero, so $V_+ = V_-$, and no current flows into either input, so $I_+ = I_- = 0$. Those two rules are what let $R_1$ and $R_f$ alone set the gain. Every real parameter in this note is a correction term on those two rules.

**Finite $A_{ol}$ and loop gain.** The exact closed-loop gain is $A_{CL} = A_{ol}/(1 + A_{ol}\beta)$, where $\beta$ is the fraction of the output fed back to the inverting input: for the non-inverting amplifier $\beta = R_1/(R_1+R_f)$. The product $A_{ol}\beta$ is the *loop gain*, and it is the single number that governs gain accuracy, closed-loop output impedance and distortion. Gain error is approximately $1/(A_{ol}\beta) = (1+R_f/R_1)/A_{ol}$, so a $\times 1$ follower built on $A_{ol} = 10^5$ is accurate to 0.001%, while a $\times 1000$ stage would be accurate only to 0.1% *if* the op-amp still had $10^5$ at that frequency. It does not: the dominant pole rolls $A_{ol}$ off at 20 dB/decade, so a 100 dB DC figure is down to roughly 60 dB by 1 kHz on a 741.

**Gain-bandwidth product.** Because a compensated op-amp behaves as a single-pole system, the product of gain and bandwidth is constant above the dominant pole:
$$GBW = A_{CL}\,f_{-3\,\mathrm{dB}}$$
The point that is examined constantly is that $A_{CL}$ here is the **noise gain** $1 + R_f/R_1$, not the signal gain. An inverting amplifier with $R_f/R_1 = 100$ has a signal gain of $-100$ but a noise gain of 101, so it rolls off at $GBW/101$. The inverting configuration buys nothing in bandwidth over a non-inverting stage of the same magnitude.

**Slew rate is the large-signal limit.** Slew rate is the fastest the output can move, $SR = \left.dV_o/dt\right|_{max}$, quoted in V/µs and set by an internal bias current charging the compensation capacitor. A sine of peak $V_p$ at frequency $f$ demands $2\pi f V_p \le SR$. Slew rate is not the same limit as bandwidth: bandwidth is linear and small-signal, slew rate is nonlinear and large-signal. The same op-amp can pass a 200 kHz, 10 mV sine cleanly and turn a 20 kHz, 10 V sine into a triangle. The frequency where the two limits meet for a given amplitude is the full-power bandwidth $f_{max} = SR/(2\pi V_p)$.

**DC errors, CMRR, PSRR and saturation.** Input offset voltage appears at the output multiplied by the noise gain, so $V_{OS} = 2\ \mathrm{mV}$ in a $\times 101$ stage is 202 mV of output error — larger than one LSB of a 12-bit, 10 V converter. Bias current produces an output error $I_B R_f$ in the inverting amplifier unless a compensating resistor $R_+ = R_1\|R_f$ is fitted; that resistor reduces the term to $I_{OS}R_f$, typically 10–20× smaller. Common-mode and supply effects are specified as CMRR and PSRR in dB and act as input-referred error voltages $V_{cm}/CMRR$ and $\Delta V_{CC}/PSRR$. Finally the output cannot leave the rails: a 741 clips about 1.5 V inside each rail, and the output current limit sets a second ceiling. Any calculation that returns a voltage beyond the rail is a clipping problem, not a gain problem.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Ideal op-amp conditions | $V_+ = V_-,\quad I_+ = I_- = 0$ | Valid only with negative feedback and effectively infinite A_ol; these two rules justify every ideal gain formula. |
| Open-loop gain in dB | $A_{ol,dB} = 20\log_{10} A_{ol}$ | Voltage ratio, so 20 log. 100 dB = 10^5, 120 dB = 10^6. This is the DC value. |
| Closed-loop gain with finite A_ol | $A_{CL} = \frac{A_{ol}}{1 + A_{ol}\beta}$ | Exact for a single feedback loop; gain error is roughly 1/(A_ol beta). For the non-inverting amp, beta = R1/(R1+Rf). |
| Gain-bandwidth product | $GBW = A_{CL}\,f_{-3\,\mathrm{dB}}$ | Constant for a dominant-pole compensated op-amp. A_CL is the noise gain 1+Rf/R1, not the inverting signal gain. |
| Slew-rate limit on a sine | $SR \geq 2\pi f V_p$ | SR in V/s. Full-power bandwidth f_max = SR/(2 pi V_p). Convert V/us to V/s (x 10^6) before substituting. |
| Input offset voltage error | $V_{o,err} = V_{OS}\left(1 + \frac{R_f}{R_1}\right)$ | Amplified by the noise gain in both inverting and non-inverting configurations; add the bias-current term separately. |
| Bias-current error with R_+ = R1\|\|Rf | $V_{o,err} = I_{OS} R_f$ | The compensating resistor converts I_B R_f into I_OS R_f. Without it the inverting-amp error is I_B R_f. |
| Common-mode rejection ratio | $CMRR_{dB} = 20\log_{10}\frac{A_d}{A_{cm}}$ | Input-referred common-mode error = V_cm/CMRR_linear. At 80 dB, 5 V of V_cm is a 500 uV input error. |
| Power-supply rejection ratio | $PSRR_{dB} = 20\log_{10}\frac{\Delta V_{CC}}{\Delta V_{OS}}$ | A 60 dB PSRR turns 1 V of supply ripple into 1 mV of input-referred error; it falls with frequency. |
| Output saturation | $V_{sat} \approx V_{CC} - 1.5\ \mathrm{V}$ | Typical for a 741 on +/-15 V. Rail-to-rail outputs come within 50-100 mV, but never reach the rail; the output current limit sets a lower ceiling under load. |

## Worked Problems

### P1. A non-inverting amplifier uses $R_1 = 1\ \mathrm{k\Omega}$ and $R_f = 100\ \mathrm{k\Omega}$ with an op-amp whose open-loop gain is $100\ \mathrm{dB}$. Find the ideal gain, the feedback fraction $\beta$, and the actual closed-loop gain.

**Given:** R1 = 1 kohm; Rf = 100 kohm; A_ol = 100 dB

**Solution:**

1. Ideal gain: 1 + Rf/R1 = 1 + 100k/1k = 101
2. A_ol = 10^(100/20) = 10^5
3. Feedback fraction: beta = R1/(R1+Rf) = 1000/101000 = 9.901e-3
4. Loop gain: A_ol x beta = 10^5 x 9.901e-3 = 990.1
5. A_CL = 10^5/(1 + 990.1) = 100.90

> [!success]- Answer
> **$A_{CL} = 100.90$ against an ideal $101$, a gain error of $0.10\%$.**

> [!warning] Trap
> Writing $A_{CL} = A_{ol}/(1+A_{ol})$ and dropping $\beta$. That is the voltage-follower error, and it understates this stage's gain error by a factor of 101.

### P2. An op-amp has $GBW = 1\ \mathrm{MHz}$. An inverting amplifier is built with $R_1 = 1\ \mathrm{k\Omega}$ and $R_f = 100\ \mathrm{k\Omega}$. Find its $-3\ \mathrm{dB}$ bandwidth and its gain at $20\ \mathrm{kHz}$.

**Given:** GBW = 1 MHz; R1 = 1 kohm; Rf = 100 kohm; f = 20 kHz

**Solution:**

1. Signal gain = -Rf/R1 = -100, but the noise gain is NG = 1 + 100k/1k = 101
2. f_-3dB = GBW/NG = 10^6/101 = 9901 Hz, about 9.9 kHz
3. At 20 kHz the single-pole magnitude is |A| = 100/sqrt(1 + (20/9.901)^2)
4. (20/9.901)^2 = 4.080, so |A| = 100/sqrt(5.080) = 100/2.254 = 44.4

> [!success]- Answer
> **$f_{-3\,\mathrm{dB}} \approx 9.9\ \mathrm{kHz}$; the gain at $20\ \mathrm{kHz}$ has fallen to $44.4$.**

> [!warning] Trap
> Using $GBW/|A_{signal}| = 1\ \mathrm{MHz}/100 = 10\ \mathrm{kHz}$. The inverting topology still has a noise gain of 101, so its bandwidth is 9.9 kHz.

### P3. An op-amp has $SR = 0.5\ \mathrm{V/\mu s}$. What is the largest peak output amplitude at $20\ \mathrm{kHz}$, and what is the full-power bandwidth for a $10\ \mathrm{V}$ peak sine?

**Given:** SR = 0.5 V/us; f = 20 kHz; V_p = 10 V (second part)

**Solution:**

1. Convert: SR = 0.5 V/us = 5 x 10^5 V/s
2. Requirement: 2 pi f V_p <= SR, so V_p <= SR/(2 pi f)
3. At 20 kHz: V_p <= 5e5/(2 pi x 2e4) = 5e5/1.2566e5 = 3.98 V
4. For V_p = 10 V: f_max = 5e5/(2 pi x 10) = 7958 Hz, about 7.96 kHz

> [!success]- Answer
> **$V_p \le 3.98\ \mathrm{V}$ at $20\ \mathrm{kHz}$; the full-power bandwidth at $10\ \mathrm{V_p}$ is $7.96\ \mathrm{kHz}$.**

> [!warning] Trap
> Substituting $SR = 0.5$ without converting micro to base units. The ratio $2\pi f V_p/SR$ then comes out $10^6$ too large, and every answer is wrong by six decades.

### P4. An inverting amplifier has $R_1 = 1\ \mathrm{k\Omega}$, $R_f = 100\ \mathrm{k\Omega}$ and a compensating resistor $R_+ = R_1\|R_f$. The op-amp has $V_{OS} = 2\ \mathrm{mV}$, $I_B = 80\ \mathrm{nA}$ and $I_{OS} = 20\ \mathrm{nA}$. Find the worst-case output offset, then repeat with $R_+$ removed.

**Given:** R1 = 1 kohm; Rf = 100 kohm; V_OS = 2 mV; I_B = 80 nA; I_OS = 20 nA

**Solution:**

1. Noise gain = 1 + Rf/R1 = 101
2. Offset-voltage term: V_OS x 101 = 2 mV x 101 = 202 mV
3. With R+ = R1||Rf = 990 ohm, the current error becomes I_OS Rf = 20 nA x 100 kohm = 2.0 mV
4. Total with R+ = 202 + 2.0 = 204 mV
5. Without R+ the inverting input current flows through Rf: I_B Rf = 80 nA x 100 kohm = 8.0 mV, for 210 mV total

> [!success]- Answer
> **$204\ \mathrm{mV}$ with the compensating resistor, $210\ \mathrm{mV}$ without it.**

> [!warning] Trap
> Believing a compensating resistor cancels bias-current error completely. It converts $I_B R_f$ into the much smaller $I_{OS}R_f$; it does nothing at all about the $V_{OS}$ term that dominates here.

### P5. An op-amp with $CMRR = 90\ \mathrm{dB}$ is used in a non-inverting stage whose closed-loop gain is $101$. The input sits on a $5\ \mathrm{V}$ common-mode level. Find the input-referred and output common-mode error.

**Given:** CMRR = 90 dB; A_CL = 101; V_cm = 5 V

**Solution:**

1. Convert: CMRR_linear = 10^(90/20) = 3.162 x 10^4
2. Input-referred error = V_cm/CMRR_linear = 5/3.162e4 = 158 uV
3. Output error = 158 uV x 101 = 16.0 mV

> [!success]- Answer
> **$158\ \mu\mathrm{V}$ input-referred, $16.0\ \mathrm{mV}$ at the output.**

> [!warning] Trap
> Using $10^{90/10} = 10^9$ because dB looked like a power ratio. CMRR is a voltage ratio, so the conversion is $10^{\mathrm{dB}/20}$; the 10 log form makes the error $3\times10^4$ times too small.

## Traps & Exam Notes

- **Using the DC open-loop gain at signal frequency.** The 100 dB figure is the DC value. A 741's dominant pole is a few hertz, so at 1 kHz the available $A_{ol}$ is nearer 60 dB and the gain error is about 1000 times worse than the DC calculation promises.
- **Dividing GBW by the signal gain instead of the noise gain.** The $-3\ \mathrm{dB}$ bandwidth is $GBW/(1+R_f/R_1)$ for both topologies, so an inverting $\times 100$ stage rolls off at $GBW/101$ — the inverting configuration gains no bandwidth.
- **Confusing slew rate with bandwidth.** GBW is a small-signal limit set by the compensation pole; SR is the large-signal limit set by the internal bias current charging $C_c$. An op-amp can be perfectly linear at 100 kHz with a 10 mV input and hopeless at 10 kHz with 10 V.
- **Leaving the micro in V/µs.** $SR = 0.5\ \mathrm{V/\mu s}$ is $5\times10^5\ \mathrm{V/s}$. Using 0.5 directly makes the full-power bandwidth $10^6$ times too small.
- **Treating CMRR in dB as a division factor.** The common-mode error is $V_{cm}/10^{\mathrm{CMRR}_{dB}/20}$, because CMRR is a voltage ratio: 90 dB is $3.16\times10^4$, not $10^9$.
- **Dismissing input bias current because it is nanoamps.** 80 nA through a 1 MΩ feedback resistor is 80 mV of output offset, comparable to the $V_{OS}$ term — and without $R_+ = R_1\|R_f$ the error is set by $I_B$, not the smaller $I_{OS}$.
- **Reporting a saturated output from the linear formula.** On $\pm15\ \mathrm{V}$ rails a 741 cannot deliver 15.15 V, so a calculated $101\times0.15\ \mathrm{V}$ must be reported as a clipped waveform near $+13.5\ \mathrm{V}$, not as 15.15 V.

## See Also

- [[02_Linear_Op-Amp_Circuits]]
- [[13_Gain-Bandwidth_Product_and_fT]]
- [[11_Frequency_Response_and_Bode_Plots]]

---

⬅ *start* · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Linear_Op-Amp_Circuits|02 ➡]]
