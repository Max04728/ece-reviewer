---
title: Industrial Automation and Sensors
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 19
---

# Industrial Automation and Sensors

## Part A — Op-Amp Circuits

### 1. Op-Amp Fundamentals and Real Parameters

**Ideal op-amp rules ★**

$$V_+=V_-\ \text{(virtual short)},\qquad I_+=I_-=0\ \text{(virtual open)}$$

$V$ in V, $I$ in A; valid under negative feedback.

**Open-loop gain and feedback**

$$V_o=A_{OL}(V_+-V_-),\qquad A_{CL}=\frac{A_{OL}}{1+\beta A_{OL}},\qquad A_{CL}\approx\frac{1}{\beta}$$

**Symbols**

- $V_o$ — output voltage, in V
- $A_{OL}$ — open-loop voltage gain (dimensionless)
- $V_+$, $V_-$ — non-inverting and inverting input voltages, in V
- $A_{CL}$ — closed-loop voltage gain (dimensionless)
- $\beta$ — feedback factor (fraction of the output fed back to the input, dimensionless)

**Real parameter definitions ★**

$$CMRR=20\log_{10}\frac{A_d}{A_{cm}}\ \text{(dB)},\qquad PSRR=20\log_{10}\frac{\Delta V_{supply}}{\Delta V_{os}}\ \text{(dB)}$$

$$Slew\ rate=\left.\frac{dV_o}{dt}\right|_{max}\ \text{(V/}\mu\text{s)}$$

**Symbols**

- $CMRR$ — common-mode rejection ratio, in dB
- $PSRR$ — power-supply rejection ratio, in dB
- $A_d$ — differential voltage gain (dimensionless)
- $A_{cm}$ — common-mode voltage gain (dimensionless)
- $\Delta V_{supply}$ — change in supply voltage, in V
- $\Delta V_{os}$ — resulting change in input offset voltage, in V
- $Slew\ rate$ — maximum rate of change of the output voltage, in V/µs
- $t$ — time, in s

**Error contributions**

$$V_{out,error}=V_{os}\left(1+\frac{R_f}{R_i}\right)+I_BR_{comp}+V_{cm}\frac{1}{CMRR}$$

**Symbols**

- $V_{out,error}$ — output error voltage, in V
- $V_{os}$ — input offset voltage, in V
- $R_f$ — feedback resistor, in $\Omega$
- $R_i$ — input resistor, in $\Omega$
- $I_B$ — input bias current, in A
- $R_{comp}$ — bias-current compensation resistor, in $\Omega$
- $V_{cm}$ — common-mode input voltage, in V
- $CMRR$ — common-mode rejection ratio (linear, dimensionless)

**Typical real values**

| Parameter | Ideal | Real (typ. 741) |
|---|---|---|
| $A_{OL}$ | $\infty$ | $2\times10^5$ |
| $R_{in}$ | $\infty$ | 2 M$\Omega$ |
| $R_{out}$ | 0 | 75 $\Omega$ |
| $BW$ | $\infty$ | 1 MHz (GBW) |
| $CMRR$ | $\infty$ | 90 dB |
| Slew rate | $\infty$ | 0.5 V/µs |

**Conditions:** ideal rules apply only with negative feedback and when $A_{OL}\beta\gg1$; slew rate limits large-signal response; $V_{cm}$ must stay within the common-mode input range. #opamp

---

### 2. Linear Op-Amp Circuits

![](https://www.youtube.com/watch?v=idJEMYhrIfs)

*Video: Inverting and Non-Inverting Op-Amps — The Organic Chemistry Tutor, 12:02*

**Inverting and non-inverting ★**

$$A_v=-\frac{R_f}{R_i}\ \text{(inverting)},\qquad A_v=1+\frac{R_f}{R_i}\ \text{(non-inverting)}$$

$$R_{in}=R_i\ \text{(inverting)},\qquad R_{in}\to\infty\ \text{(non-inverting)}$$

**Voltage follower and summing**

$$A_v=1\ \text{(follower)},\qquad V_o=-R_f\left(\frac{V_1}{R_1}+\frac{V_2}{R_2}+\frac{V_3}{R_3}\right)$$

**Average and difference**

$$V_o=-\frac{R_f}{n}\left(\sum_{k=1}^{n}\frac{V_k}{R_k}\right)\ \text{(averager, }R_k=R\text{)}$$

$$V_o=\frac{R_f}{R_i}(V_2-V_1)\ \text{if }R_1=R_i,\ R_2=R_f$$

**Circuit summary ★**

| Circuit | $A_v$ | $R_{in}$ | Phase |
|---|---|---|---|
| Inverting | $-R_f/R_i$ | $R_i$ | 180° |
| Non-inverting | $1+R_f/R_i$ | very high | 0° |
| Follower | 1 | very high | 0° |
| Summing | $-R_f/R_k$ per input | $R_k$ | 180° |

**Conditions:** ideal op-amp with negative feedback; $R_{comp}=R_1\parallel R_2$ added at the non-inverting input minimizes bias-current offset error; gains are limited by $A_{OL}$ and $GBW$. #opamp

> [!tip] High-yield ★
> Inverting gain is $-R_f/R_i$, non-inverting is $1+R_f/R_i$ — the "1+" is the whole difference. Inverting inputs sum (virtual ground at the node); non-inverting inputs see $V_{in}$ directly.

---

### 3. Instrumentation and Difference Amplifiers

![](https://www.youtube.com/watch?v=VfJ2AHO2aHg)

*Video: Instrumentation Amplifiers Explained — Aaron Danner, 9:34*

**Difference amplifier ★**

$$V_o=\frac{R_2}{R_1}(V_2-V_1)\ \text{when }\frac{R_4}{R_3}=\frac{R_2}{R_1}$$

**Symbols**

- $V_o$ — output voltage, in V
- $V_1$, $V_2$ — input voltages at the two input terminals, in V
- $R_1$, $R_2$, $R_3$, $R_4$ — difference-amplifier resistor arms, in $\Omega$

**Three-op-amp instrumentation amplifier ★**

$$A_d=\frac{V_o}{V_2-V_1}=\left(1+\frac{2R}{R_g}\right)\frac{R_3}{R_2}$$

**Symbols**

- $A_d$ — differential voltage gain (dimensionless)
- $V_o$ — output voltage, in V
- $V_1$, $V_2$ — input voltages at the two input terminals, in V
- $R$ — first-stage gain-setting resistor, in $\Omega$
- $R_g$ — external gain-setting resistor between the first-stage outputs, in $\Omega$
- $R_2$, $R_3$ — second-stage gain-setting resistors, in $\Omega$

**Gain-setting resistor**

$$R_g=\frac{2R}{\frac{A_dR_2}{R_3}-1}\ \text{(}\Omega\text{)},\qquad G=1+\frac{2R}{R_g}\ \text{(first stage)}$$

**Symbols**

- $R_g$ — external gain-setting resistor, in $\Omega$
- $R$ — first-stage gain-setting resistor, in $\Omega$
- $R_2$, $R_3$ — second-stage gain-setting resistors, in $\Omega$
- $A_d$ — differential gain of the instrumentation amplifier (dimensionless)
- $G$ — first-stage gain, $G=1+2R/R_g$ (dimensionless)

**CMRR and input impedance**

$$CMRR_{total}=CMRR_1\cdot\frac{A_{d1}}{A_{d2}}\ \text{(stage cascade)},\qquad R_{in}\approx2R_G\ \text{(very high)}$$

**Symbols**

- $CMRR_{total}$ — overall common-mode rejection ratio (dimensionless ratio)
- $CMRR_1$ — common-mode rejection ratio of the first stage (dimensionless)
- $A_{d1}$ — differential gain of the first stage (dimensionless)
- $A_{d2}$ — differential gain of the second stage (dimensionless)
- $R_{in}$ — differential input resistance, in $\Omega$
- $R_G$ — effective gain-setting resistance at the inputs, in $\Omega$

**Gain equations of the three-op-amp stages**

$$\begin{aligned}
\text{stage 1: } & V_{o1}-V_{o2}=\left(1+\frac{2R}{R_g}\right)(V_2-V_1)\\
\text{stage 2: } & V_o=\frac{R_3}{R_2}(V_{o2}-V_{o1})
\end{aligned}$$

**Symbols**

- $V_{o1}$, $V_{o2}$ — first-stage output voltages (one per input branch), in V
- $V_o$ — final output voltage, in V
- $V_1$, $V_2$ — input voltages at the two input terminals, in V
- $R$ — first-stage gain-setting resistor, in $\Omega$
- $R_g$ — external gain-setting resistor, in $\Omega$
- $R_2$, $R_3$ — second-stage gain-setting resistors, in $\Omega$

**Conditions:** resistor ratios $R_3/R_2=R_4/R_1$ must match exactly for common-mode rejection; $A_d$ is dimensionless; a single $R_g$ sets the gain without breaking the matched pairs. #opamp

---

### 4. Integrators and Differentiators

![](https://www.youtube.com/watch?v=OPvs7A554Rw)

*Video: Op-Amp Integrator with Derivation — ALL ABOUT ELECTRONICS, 18:21*

**Integrator ★**

$$V_o(t)=-\frac{1}{RC}\int_0^t V_{in}\,dt+V_o(0),\qquad V_o(s)=-\frac{1}{sRC}V_{in}(s)$$

$$V_o=-\frac{1}{j\omega RC}V_{in}\ \text{(sinusoidal)},\qquad \lvert A_v\rvert=\frac{1}{\omega RC}$$

$R$ in $\Omega$, $C$ in F, $RC$ in s; unity-gain frequency $f=1/2\pi RC$ Hz.

**Differentiator ★**

$$V_o(t)=-RC\frac{dV_{in}}{dt},\qquad V_o(s)=-sRC\,V_{in}(s)$$

$$V_o=-j\omega RC\,V_{in},\qquad \lvert A_v\rvert=\omega RC$$

**Practical integrator limits**

$$f_{unity}=\frac{1}{2\pi RC},\qquad f_{lower}\ll f_{unity}\ \text{for true integration}$$

**Practical differentiator compensation**

$$R_1C_1\approx R_fC_f\ \text{to limit high-frequency gain and noise}$$

**Step and ramp responses**

| Input | Integrator output | Differentiator output |
|---|---|---|
| Step $V$ | ramp $-Vt/RC$ | impulse |
| Ramp $kt$ | parabola $-kt^2/2RC$ | constant $-kRC$ |
| Sine | cosine, $+90^\circ$ phase | cosine, $-90^\circ$ phase |

**Conditions:** ideal op-amp; a practical integrator needs a DC feedback resistor $R_f$ to prevent saturation from offset; a differentiator needs an input resistor to tame noise gain. #opamp

---

### 5. Comparators and Schmitt Triggers

![](https://www.youtube.com/watch?v=Nrp8OgQLAlw)

*Video: What Is a Schmitt Trigger and How It Works — How To Mechatronics, 5:59*

**Comparator and threshold ★**

$$V_o=\begin{cases}+V_{sat},& V_+>V_-\\-V_{sat},& V_+<V_-\end{cases},\qquad \text{threshold: }V_+=V_-$$

**Symbols**

- $V_o$ — output voltage, in V
- $V_{sat}$ — output saturation voltage, in V
- $V_+$, $V_-$ — non-inverting and inverting input voltages, in V

**Inverting Schmitt trigger ★**

$$V_{UTP}=\frac{R_1}{R_1+R_2}(+V_{sat}),\qquad V_{LTP}=\frac{R_1}{R_1+R_2}(-V_{sat})$$

$$V_H=V_{UTP}-V_{LTP}=\frac{2R_1V_{sat}}{R_1+R_2}\ \text{(hysteresis, V)}$$

**Symbols**

- $V_{UTP}$ — upper trip point (upper threshold voltage), in V
- $V_{LTP}$ — lower trip point (lower threshold voltage), in V
- $V_H$ — hysteresis width, in V
- $V_{sat}$ — output saturation voltage, in V
- $R_1$, $R_2$ — feedback and input resistors of the trigger, in $\Omega$

**Non-inverting Schmitt trigger**

$$V_{UTP}=\frac{R_1}{R_1+R_2}V_{ref}+\frac{R_2}{R_1+R_2}V_{sat},\qquad V_{LTP}=\frac{R_1V_{ref}-R_2V_{sat}}{R_1+R_2}$$

**Symbols**

- $V_{UTP}$ — upper trip point, in V
- $V_{LTP}$ — lower trip point, in V
- $V_{ref}$ — reference voltage at the inverting input, in V
- $V_{sat}$ — output saturation voltage, in V
- $R_1$, $R_2$ — feedback and input resistors, in $\Omega$

**Saturation and timing**

$$V_{sat}\approx V_{CC}-1.5\ \text{V (typical)},\qquad t_{rise}\approx 2.2R_LC_{load}$$

**Symbols**

- $V_{sat}$ — output saturation voltage, in V
- $V_{CC}$ — positive supply voltage, in V
- $t_{rise}$ — output rise time, in s
- $R_L$ — load resistance, in $\Omega$
- $C_{load}$ — load capacitance, in F
- $GBW$ — gain-bandwidth product of the op-amp, in Hz

**Comparator vs op-amp**

| Property | Op-amp | Comparator |
|---|---|---|
| Feedback | negative (linear) | none or positive |
| Output | analog | logic levels |
| Speed | GBW-limited | ns propagation |
| Use | amplify | decide |

**Conditions:** $V_{sat}$ in V, $R_1,R_2$ in $\Omega$; hysteresis prevents multiple transitions from a noisy input; open-collector comparators need a pull-up resistor. #opamp

---

### 6. The 555 Timer

**Internal reference divider ★**

$$V_{TH}=V_{CONTROL}=\tfrac{2}{3}V_{CC},\qquad V_{TRIG}=\tfrac{1}{2}V_{CONTROL}=\tfrac{1}{3}V_{CC}$$

Three equal internal resistors (5 kΩ each, hence "555") set the comparator thresholds; driving the CONTROL pin overrides both.

**Monostable (one-shot) ★**

$$t_w=1.1RC=\ln(3)\,RC\approx1.0986\,RC,\qquad f_{max}\approx\frac{1}{t_w}$$

Output pulse width per trigger; recovery time $\approx t_w$ before the next trigger is accepted.

**Astable (free-running) ★**

$$t_{HIGH}=0.693(R_1+R_2)C,\qquad t_{LOW}=0.693R_2C$$

$$T=t_{HIGH}+t_{LOW}=0.693(R_1+2R_2)C,\qquad f=\frac{1}{T}=\frac{1.44}{(R_1+2R_2)C}$$

**Duty cycle ★**

$$D=\frac{t_{HIGH}}{T}=\frac{R_1+R_2}{R_1+2R_2}\times100\%$$

| Mode | Timing relation | Typical use |
|---|---|---|
| Monostable | $t_w=1.1RC$ | one-shot delay, pulse stretcher |
| Astable | $f=\dfrac{1.44}{(R_1+2R_2)C}$ | clock, oscillator, LED flasher |
| Bistable | — (SR latch) | debounced switch, latch |

**Symbols**

- $V_{CC}$ — supply voltage, in V
- $V_{CONTROL}$ — voltage at the CONTROL pin (defaults to $\frac23V_{CC}$ internally), in V
- $R$, $C$ — external timing resistor (Ω) and capacitor (F) in monostable mode
- $R_1$, $R_2$ — external timing resistors in astable mode, in $\Omega$
- $t_w$ — monostable output pulse width, in s
- $t_{HIGH}$, $t_{LOW}$ — astable output high and low times, in s
- $T$ — astable period, in s
- $f$ — astable frequency, in Hz
- $D$ — duty cycle, in %

**Conditions:** bipolar 555 (NE/SE555) timing assumes the standard threshold levels and $V_{CC}=5$–15 V; timing is independent of $V_{CC}$ because both thresholds scale with it. In the standard astable the capacitor charges through $R_1+R_2$ but discharges through $R_2$ only, so $D>50\%$ always. #timer #oscillator

> [!warning] Exam trap
> The astable capacitor charges through $\mathbf{R_1+R_2}$ but discharges through $\mathbf{R_2}$ **alone** — that asymmetry is why the duty cycle can never fall below 50 % in the basic circuit. A diode across $R_2$ (or a separate charge/discharge path) is needed for $D<50\%$.

> [!tip] High-yield ★
> $1.1RC$ (monostable) and $\frac{1.44}{(R_1+2R_2)C}$ (astable) are the two numbers to memorize. The $\ln 3\approx1.1$ in the monostable comes from charging $\frac13V_{CC}\to\frac23V_{CC}$.

---

### 7. Precision Rectifiers

**Half-wave precision rectifier ★**

$$V_o=\begin{cases}-\frac{R_f}{R_i}V_{in},& V_{in}>0\\0,& V_{in}<0\end{cases}\ \text{(inverting output)}$$

**Output during the negative half-cycle**

$$V_o=0\ \text{(D}_2\text{ conducts, op-amp holds the node at virtual ground)}$$

**Full-wave precision rectifier**

$$V_o=-\lvert V_{in}\rvert\frac{R_f}{R_i}\ \text{(absolute-value circuit, }R_f=R_i\text{; output is inverted)}$$

$$V_o=-\left(\frac{R_f}{R_i}V_{in}+\frac{R_f}{R_i}V_{in}\right)\ \text{summed positive and inverted negative half-cycles}$$

**Diode-drop cancellation**

$$V_{out}=V_{in}\ \text{to within }V_{os}/A_{OL}\ \text{(drop of }0.7\text{ V removed by the loop)}$$

**Comparison with a passive rectifier**

| Property | Passive | Precision |
|---|---|---|
| Drop | $0.7$ V per diode | $\approx V_{os}$ |
| Small signals | unusable | accurate |
| Bandwidth | full | op-amp GBW limited |
| Use | power | instrumentation |

**Conditions:** op-amp must recover from saturation quickly (use a high slew rate for high frequency); the virtual ground removes the diode drop, so signals below $0.7$ V rectify correctly. #opamp #rectifier

> [!warning] Exam trap
> A precision rectifier uses the **op-amp loop to cancel the $0.7$ V diode drop**. If you analyze it as a passive rectifier and subtract $0.7$ V, the answer is wrong.

---

### 8. Active Filter Responses

![](https://www.youtube.com/watch?v=Pc9G7aFWn-w)

*Video: Active Filters: First-Order Low-Pass, High-Pass and Band-Pass — TU Graz, 7:58*

**Transfer function forms ★**

$$H_{LP}=\frac{K\omega_0^2}{s^2+\frac{\omega_0}{Q}s+\omega_0^2},\qquad H_{HP}=\frac{Ks^2}{s^2+\frac{\omega_0}{Q}s+\omega_0^2}$$

$$H_{BP}=\frac{K\frac{\omega_0}{Q}s}{s^2+\frac{\omega_0}{Q}s+\omega_0^2},\qquad H_{BR}=\frac{K(s^2+\omega_z^2)}{s^2+\frac{\omega_0}{Q}s+\omega_0^2}$$

$\omega_0$ in rad/s, $Q$ dimensionless, $K$ = passband gain.

**Symbols**

- $H_{LP}$ — second-order low-pass transfer function (dimensionless, output/input)
- $H_{HP}$ — second-order high-pass transfer function (dimensionless)
- $H_{BP}$ — second-order band-pass transfer function (dimensionless)
- $H_{BR}$ — second-order band-reject (notch) transfer function (dimensionless)
- $s=j\omega$ — Laplace variable, in rad/s
- $K$ — passband gain (dimensionless)
- $\omega_0$ — undamped natural (cutoff) angular frequency, in rad/s
- $Q$ — quality factor (dimensionless)
- $\omega_z$ — notch (zero) angular frequency, in rad/s

**Magnitude and roll-off**

$$\lvert H(j\omega)\rvert=\frac{K}{\sqrt{\left[1-(\omega/\omega_0)^2\right]^2+\left(\frac{\omega}{\omega_0Q}\right)^2}}$$

**Order and response types**

| Response | $Q$ | Feature |
|---|---|---|
| Butterworth | 0.707 | maximally flat, no ripple |
| Chebyshev | $>0.707$ | ripple in passband, sharper |
| Bessel | 0.577 | linear phase, best pulse |
| Elliptic | any | ripple in both bands |

**Second-order peaking**

$$M_p=Q\ \text{for }Q>\frac{1}{\sqrt2},\qquad \omega_{peak}=\omega_0\sqrt{1-\frac{1}{2Q^2}}$$

**Symbols**

- $M_p$ — peak magnitude of the second-order response (dimensionless)
- $Q$ — quality factor (dimensionless)
- $\omega_{peak}$ — angular frequency of the peak, in rad/s
- $\omega_0$ — undamped natural angular frequency, in rad/s

**Conditions:** second-order sections; Butterworth $Q=0.7071$; cascading $n/2$ sections raises the filter order by 2 per stage, and $Q$ values follow a standard table. #filter #opamp

## Part B — Sensors, Data Conversion and PLCs

### 9. Sallen-Key Filter Design

![](https://www.youtube.com/watch?v=I9pc29rCdEM)

*Video: How to Design Active Filters Using Sallen-Key Circuits — Aaron Danner, 4:15*

**Low-pass Sallen-Key ★**

$$\omega_0=\frac{1}{\sqrt{R_1R_2C_1C_2}},\qquad Q=\frac{\sqrt{R_1R_2C_1C_2}}{C_2(R_1+R_2)}\ \text{(unity gain)}$$

$$f_0=\frac{\omega_0}{2\pi}\ \text{(Hz)},\qquad K=1+\frac{R_b}{R_a}\ \text{(non-inverting gain)}$$

**Equal-component simplification ★**

$$f_0=\frac{1}{2\pi RC}\ \text{for }R_1=R_2=R,\ C_1=C_2=C$$

$$Q=\frac{1}{3-K}\ \Rightarrow\ K=3-\frac{1}{Q},\qquad C_1=2QC_2\ \text{for unity gain}$$

**High-pass Sallen-Key**

$$\omega_0=\frac{1}{\sqrt{R_1R_2C_1C_2}},\qquad Q=\frac{\sqrt{R_1R_2C_1C_2}}{R_1(C_1+C_2)}$$

**Design steps and limits**

$$K<3\ \text{for stability (unity-gain Sallen-Key)},\qquad 2Q=\frac{C_1}{C_2}\ \text{ratio choice}$$

**Conditions:** op-amp treated as ideal; $Q>0.707$ gives overshoot; component spread grows quickly with $Q$, so $Q\le10$ is practical for a single stage. #filter #opamp

---

### 10. Temperature Sensors

**RTD (platinum) ★**

$$R_T=R_0\left[1+\alpha(T-T_0)\right],\qquad \alpha\approx0.00385\ /\ ^\circ\text{C (Pt100)}$$

$$R_T=R_0\left[1+\alpha T+\beta T^2\right]\ \text{(Callendar-Van Dusen, }T<0^\circ\text{C)}$$

$R$ in $\Omega$, $T$ in °C, $\alpha$ in °C⁻¹.

**Symbols**

- $R_T$ — RTD resistance at temperature $T$, in $\Omega$
- $R_0$ — RTD resistance at the reference temperature $T_0$, in $\Omega$
- $\alpha$ — temperature coefficient of resistance, in °C⁻¹
- $T$ — temperature, in °C
- $T_0$ — reference temperature, in °C
- $\beta$ — Callendar–Van Dusen quadratic coefficient, in °C⁻²

**Thermistor**

$$R_T=R_0e^{\beta\left(\frac{1}{T}-\frac{1}{T_0}\right)},\qquad \alpha=-\frac{\beta}{T^2}\ \text{(negative, typ. }-4\%/^\circ\text{C)}$$

$T$ in K, $\beta$ in K (typ. 3000–5000 K).

**Symbols**

- $R_T$ — thermistor resistance at temperature $T$, in $\Omega$
- $R_0$ — thermistor resistance at the reference temperature $T_0$, in $\Omega$
- $\beta$ — thermistor material constant, in K
- $T$ — absolute temperature, in K
- $T_0$ — reference absolute temperature, in K
- $\alpha$ — temperature coefficient of resistance, in K⁻¹

**Thermocouple and IC sensors**

$$V_{TC}=S(T_{hot}-T_{cold}),\qquad S\approx41\ \mu\text{V}/^\circ\text{C (type K)}$$

$$V_{out}=10\ \text{mV}/^\circ\text{C}\ \text{(LM35)},\qquad V_{out}=K\frac{T}{\ ^\circ\text{C}}\ \text{(linear IC)}$$

**Symbols**

- $V_{TC}$ — thermocouple output voltage (Seebeck emf), in V
- $S$ — Seebeck coefficient of the thermocouple, in V/°C
- $T_{hot}$, $T_{cold}$ — hot-junction and cold-junction temperatures, in °C
- $V_{out}$ — IC sensor output voltage, in V
- $K$ — IC sensor sensitivity (output voltage per degree), in V/°C
- $T$ — temperature, in °C

**Self-heating and sensitivity comparison**

$$P_D=\frac{V^2}{R},\qquad \Delta T=\theta P_D\ (^\circ\text{C})$$

**Symbols**

- $P_D$ — power dissipated in the sensor (self-heating), in W
- $V$ — voltage across the sensor, in V
- $R$ — sensor resistance, in $\Omega$
- $\Delta T$ — temperature rise above ambient, in °C
- $\theta$ — thermal resistance (junction-to-ambient), in °C/W

| Sensor | Sensitivity | Range | Linearity |
|---|---|---|---|
| RTD Pt100 | $0.385\ \Omega/^\circ\text{C}$ | $-200$ to $850^\circ\text{C}$ | excellent |
| Thermistor | $-4\%/^\circ\text{C}$ | $-50$ to $150^\circ\text{C}$ | poor |
| Thermocouple | $41\ \mu\text{V}/^\circ\text{C}$ | $-200$ to $1300^\circ\text{C}$ | moderate |
| IC (LM35) | $10\ \text{mV}/^\circ\text{C}$ | $-55$ to $150^\circ\text{C}$ | good |

**Conditions:** thermocouple needs cold-junction compensation; RTD needs a constant-current excitation to avoid self-heating error ($I\le1$ mA typical); thermistor is highly nonlinear. #sensors

---

### 11. Strain Gauges and Wheatstone Bridge

![](https://www.youtube.com/watch?v=GjmM6KKhgp0)

*Video: Wheatstone Bridge with Strain Gauge Explained — learnchannel, 7:12*

**Gauge factor ★**

$$GF=\frac{\Delta R/R}{\varepsilon},\qquad \varepsilon=\frac{\Delta L}{L}\ \text{(dimensionless)}$$

$GF\approx2$ for metal foil, $\approx100$–200 for semiconductor; $\Delta R$ in $\Omega$.

**Symbols**

- $GF$ — gauge factor (dimensionless)
- $\Delta R$ — change in gauge resistance, in $\Omega$
- $R$ — unstrained gauge resistance, in $\Omega$
- $\varepsilon$ — strain (dimensionless)
- $\Delta L$ — change in length, in m
- $L$ — original length, in m

**Wheatstone bridge output ★**

$$V_o=V_{in}\left(\frac{R_3}{R_1+R_3}-\frac{R_4}{R_2+R_4}\right)$$

**Symbols**

- $V_o$ — bridge output (differential) voltage, in V
- $V_{in}$ — bridge excitation voltage, in V
- $R_1$, $R_2$, $R_3$, $R_4$ — the four bridge-arm resistances, in $\Omega$

**Quarter-bridge (one active gauge) ★**

$$V_o=\frac{V_{in}}{4}GF\,\varepsilon\ \text{for small strain},\qquad V_o\approx V_{in}\frac{\Delta R}{4R}$$

**Symbols**

- $V_o$ — bridge output voltage, in V
- $V_{in}$ — bridge excitation voltage, in V
- $GF$ — gauge factor (dimensionless)
- $\varepsilon$ — strain (dimensionless)
- $\Delta R$ — change in gauge resistance, in $\Omega$
- $R$ — unstrained gauge resistance, in $\Omega$

**Bridge configurations**

| Configuration | Sensitivity | Temperature compensation |
|---|---|---|
| Quarter bridge | $V_{in}GF\varepsilon/4$ | none |
| Half bridge | $V_{in}GF\varepsilon/2$ | good (dummy gauge) |
| Full bridge | $V_{in}GF\varepsilon$ | excellent |

**Bridge balance and nonlinearity**

$$R_1R_4=R_2R_3\ \Rightarrow\ V_o=0\ \text{(balanced)}$$

$$\text{error}=\frac{\varepsilon}{2}\times100\%\ \text{(quarter bridge, nonlinear term)}$$

**Stress and strain**

$$\sigma=E\varepsilon\ \text{(Pa)},\qquad E\ \text{in Pa (steel }\approx200\ \text{GPa)}$$

**Symbols**

- $\sigma$ — mechanical stress, in Pa
- $E$ — modulus of elasticity (Young's modulus) of the gauge material, in Pa
- $\varepsilon$ — strain (dimensionless)

**Conditions:** small-strain linearization ($\varepsilon<10^{-3}$); full bridge with four active gauges gives four times the quarter-bridge sensitivity and cancels bending and thermal effects. #sensors

---

### 12. Position Sensors: LVDT, Hall, Encoders

**LVDT output ★**

$$V_{out}=K_{LVDT}x\ \text{(V, linear range)},\qquad x\ \text{in mm},\ K\ \text{in V/mm}$$

$$\text{Sensitivity}=\frac{\Delta V_{out}}{\Delta x},\qquad \text{linearity }\approx\pm0.1\%\ \text{of full scale}$$

**Symbols**

- $V_{out}$ — LVDT output (AC) voltage, in V
- $K_{LVDT}$ — LVDT sensitivity, in V/mm
- $x$ — core displacement from null, in mm
- $\Delta V_{out}$ — change in output voltage, in V
- $\Delta x$ — change in core displacement, in mm

**Hall effect sensor**

$$V_H=\frac{IB}{nqt}=R_H\frac{IB}{t}\ \text{(V)},\qquad R_H=\frac{1}{nq}\ \text{(m}^3\text{/C)}$$

$B$ in T, $I$ in A, $t$ in m, $R_H$ in m³/C.

**Symbols**

- $V_H$ — Hall voltage, in V
- $I$ — current through the Hall element, in A
- $B$ — magnetic flux density, in T
- $n$ — charge-carrier density, in m⁻³
- $q$ — magnitude of the carrier charge, in C
- $t$ — thickness of the Hall element, in m
- $R_H$ — Hall coefficient, in m³/C

**Incremental encoder resolution ★**

$$\theta_{res}=\frac{360^\circ}{N}=\frac{360^\circ}{4\times PPR}\ \text{(degrees, quadrature)}$$

$$PPR=\frac{N}{4},\qquad RPM=\frac{60f_{pulse}}{N}\ \text{(rev/min)}$$

$N$ = counts per revolution; $f_{pulse}$ in Hz.

**Symbols**

- $\theta_{res}$ — angular resolution per count, in degrees
- $N$ — counts per revolution (quadrature counts, dimensionless)
- $PPR$ — pulses per revolution per channel (dimensionless)
- $RPM$ — shaft speed, in rev/min
- $f_{pulse}$ — pulse frequency, in Hz

**Absolute encoder resolution**

$$\text{Resolution}=\frac{360^\circ}{2^n}\ \text{(degrees for }n\ \text{bits)}$$

$$n=\log_2\frac{360^\circ}{\theta_{res}}\ \text{bits required}$$

**Symbols**

- $n$ — number of bits (resolution bits, dimensionless integer)
- $\theta_{res}$ — required angular resolution, in degrees

**Sensor comparison**

| Sensor | Output | Range | Contact |
|---|---|---|---|
| LVDT | AC voltage | $\pm$mm to $\pm$cm | none |
| Hall | voltage/pulse | proximity | none |
| Incremental encoder | pulses | unlimited rotation | none |
| Absolute encoder | parallel/serial code | $360^\circ$ | none |
| Potentiometer | resistance | limited | yes |

**Conditions:** LVDT needs AC excitation and synchronous demodulation for direction; incremental encoders need a home/index pulse for absolute position; quadrature gives 4× interpolation. #sensors

---

### 13. Signal Conditioning and DAQ

**Amplifier and anti-alias chain**

$$V_{ADC}=G\cdot V_{sensor}+V_{offset},\qquad G=\frac{V_{FS}}{V_{sensor,FS}}$$

**Symbols**

- $V_{ADC}$ — voltage presented to the ADC input, in V
- $G$ — signal-conditioning (amplifier) gain (dimensionless)
- $V_{sensor}$ — sensor output voltage, in V
- $V_{offset}$ — DC offset added by the conditioning stage, in V
- $V_{FS}$ — ADC full-scale input voltage, in V
- $V_{sensor,FS}$ — sensor output voltage at full scale, in V

**Nyquist criterion ★**

$$f_s\ge2f_{max},\qquad f_s\ \text{must exceed twice the highest input frequency}$$

**Symbols**

- $f_s$ — sampling frequency (rate), in Hz
- $f_{max}$ — highest frequency component in the input signal, in Hz

**Aliasing**

$$f_{alias}=\lvert f_{in}-kf_s\rvert\ \text{for integer }k,\qquad f_{in}\ \text{folded into }0\text{ to }f_s/2$$

**Symbols**

- $f_{alias}$ — apparent (aliased) frequency after sampling, in Hz
- $f_{in}$ — input signal frequency, in Hz
- $f_s$ — sampling frequency, in Hz
- $k$ — integer harmonic index (dimensionless)

**Anti-alias filter order**

$$\text{order}\ge\frac{\log\left(\frac{10^{A/20}-1}{10^{A_p/20}-1}\right)}{2\log\left(\frac{f_s/2}{f_p}\right)}\ \text{for attenuation }A\ \text{(dB)}$$

**Symbols**

- $order$ — minimum anti-alias filter order (dimensionless integer)
- $A$ — required attenuation at the Nyquist frequency, in dB
- $A_p$ — passband ripple allowed, in dB
- $f_s$ — sampling frequency, in Hz
- $f_p$ — passband-edge frequency, in Hz

**Resolution and full-scale**

$$LSB=\frac{V_{FS}}{2^n}\ \text{(V)},\qquad V_{FS}=V_{ref}\ \text{(unipolar)}$$

**Symbols**

- $LSB$ — least significant bit (quantization step size), in V
- $V_{FS}$ — full-scale input voltage, in V
- $n$ — ADC resolution, in bits (dimensionless integer)
- $V_{ref}$ — reference voltage, in V

$$SNR_{ideal}=6.02n+1.76\ \text{(dB)},\qquad ENOB=\frac{SNR-1.76}{6.02}\ \text{bits}$$

**Symbols**

- $SNR_{ideal}$ — ideal signal-to-noise ratio for a full-scale sine input, in dB
- $n$ — ADC resolution, in bits (dimensionless integer)
- $ENOB$ — effective number of bits (dimensionless)
- $SNR$ — measured signal-to-noise ratio, in dB

**Common-mode and isolation**

$$CMRR=20\log_{10}\frac{A_d}{A_{cm}}\ \text{(dB)},\qquad \text{isolation in V}_{rms}\ \text{or kV}$$

**Conditions:** $f_s\ge2f_{max}$ is a minimum — practical designs use $f_s\ge5$–$10f_{max}$ plus an anti-alias filter; $n$ bits gives $2^n$ levels. #sensors #daq

---

### 14. ADC Architectures and Quantization

![](https://www.youtube.com/watch?v=NASkjo7s8f4)

*Video: Flash ADC and Half-Flash ADC Explained — ALL ABOUT ELECTRONICS, 11:12*

**Quantization step and error ★**

$$Q=\frac{V_{FS}}{2^n}\ \text{(V)},\qquad e_q=\pm\frac{Q}{2}\ \text{(V)}$$

$$e_{rms}=\frac{Q}{\sqrt{12}}\ \text{(V)},\qquad SNR_{max}=6.02n+1.76\ \text{(dB)}$$

**Symbols**

- $Q$ — quantization step size, in V
- $V_{FS}$ — full-scale input voltage, in V
- $n$ — ADC resolution, in bits (dimensionless integer)
- $e_q$ — peak quantization error, in V
- $e_{rms}$ — RMS quantization error, in V
- $SNR_{max}$ — maximum signal-to-noise ratio (full-scale sine input), in dB

**Conversion time and rate**

$$t_{conv}=\frac{1}{f_s},\qquad f_{s,max}=\frac{1}{t_{conv}+t_{acq}}\ \text{(Hz)}$$

**Symbols**

- $t_{conv}$ — conversion time, in s
- $f_s$ — sampling (conversion) rate, in Hz
- $f_{s,max}$ — maximum achievable sampling rate, in Hz
- $t_{acq}$ — acquisition (sample-and-hold) time, in s

**Architecture comparison ★**

| Type | Speed | Resolution | Typical use |
|---|---|---|---|
| Flash | fastest (ns) | 6–8 bits | video, radar |
| SAR | fast (µs) | 8–18 bits | general DAQ |
| Sigma-delta | slow (ms) | 16–24 bits | audio, precision |
| Dual-slope | very slow | 12–18 bits | DMM, noise rejection |
| Pipeline | fast | 10–14 bits | communication |

**Successive approximation**

$$t_{SAR}=nT_{clk}\ \text{(s)},\qquad \text{comparison steps}=n$$

**Symbols**

- $t_{SAR}$ — successive-approximation conversion time, in s
- $n$ — number of bits (comparison steps, dimensionless integer)
- $T_{clk}$ — clock period of the SAR logic, in s

**Other metrics**

$$INL,\ DNL\ \text{in LSB},\qquad SINAD,\ SFDR\ \text{(dB)},\qquad ENOB=\frac{SINAD-1.76}{6.02}\ \text{bits}$$

**Symbols**

- $INL$ — integral nonlinearity, in LSB
- $DNL$ — differential nonlinearity, in LSB
- $LSB$ — least significant bit (quantization step size), in V
- $SINAD$ — signal-to-noise-and-distortion ratio, in dB
- $SFDR$ — spurious-free dynamic range, in dB
- $ENOB$ — effective number of bits (dimensionless)
- $n$ — ADC resolution, in bits (dimensionless integer)

**Flash ADC comparator count ★**

$$N_c=2^n-1\ \text{(comparators for }n\ \text{bits)},\qquad \text{one comparator per threshold}+\text{priority encoder}$$

**Symbols**

- $N_c$ — number of comparators (dimensionless integer)
- $n$ — ADC resolution, in bits (dimensionless integer)

$$\text{Hardware scales as }2^n\ \Rightarrow\ \text{fastest conversion but }2^n\text{-scaled comparator and encoder count}$$

**Conditions:** quantization noise is uniform over $\pm Q/2$; $SNR=6.02n+1.76$ dB assumes a full-scale sine input; sigma-delta trades speed for resolution through oversampling. #adc

> [!tip] High-yield ★
> $SNR=6.02n+1.76$ dB and $Q=V_{FS}/2^n$ answer most ADC questions. Each added bit buys about **6 dB** of SNR and halves the quantization step.

---

### 15. DAC Architectures

![](https://www.youtube.com/watch?v=bXUfDLF4MVc)

*Video: DAC Methods: R-2R Ladder — Columbia Gorge Community College, 8:58*

**Output and resolution ★**

$$V_{out}=V_{ref}\frac{D}{2^n},\qquad D=\sum_{k=0}^{n-1}b_k2^k$$

$$LSB=\frac{V_{ref}}{2^n}\ \text{(V)},\qquad V_{FS}=V_{ref}\frac{2^n-1}{2^n}\approx V_{ref}\left(1-2^{-n}\right)$$

$D$ = digital input (decimal equivalent), dimensionless.

**Symbols**

- $V_{out}$ — DAC output voltage, in V
- $V_{ref}$ — DAC reference voltage, in V
- $D$ — digital input code (decimal equivalent, dimensionless)
- $b_k$ — bit coefficient of the $k$th bit ($0$ or $1$, dimensionless)
- $k$ — bit index (dimensionless integer, $0$ to $n-1$)
- $n$ — DAC resolution, in bits (dimensionless integer)
- $LSB$ — least significant bit (output step per code), in V
- $V_{FS}$ — full-scale output voltage, in V

**Weighted-resistor and R-2R**

$$V_{out}=-V_{ref}\frac{R_f}{R}\sum_{k=0}^{n-1}\frac{b_k}{2^{n-k}}\ \text{(weighted resistor)}$$

$$R_{in}=2R\ \text{per leg (R-2R ladder)},\qquad V_{out}=\frac{V_{ref}D}{2^n}$$

**Symbols**

- $V_{ref}$ — DAC reference voltage, in V
- $R_f$ — op-amp feedback resistor, in $\Omega$
- $R$ — ladder/resistor value, in $\Omega$
- $b_k$ — bit coefficient ($0$ or $1$, dimensionless)
- $n$ — DAC resolution, in bits (dimensionless integer)
- $R_{in}$ — input resistance of each ladder leg, in $\Omega$
- $D$ — digital input code (dimensionless)

**Settling time and errors**

$$t_{settle}\ \text{to }\pm\tfrac12LSB\ \text{(s)},\qquad \text{glitch energy}=V\cdot t\ \text{(V}\cdot\text{s)}$$

**Symbols**

- $t_{settle}$ — settling time to within $\pm\tfrac12LSB$, in s
- $LSB$ — least significant bit, in V
- $V$ — output voltage step involved in the glitch, in V
- $t$ — duration of the glitch, in s

$$DNL=\frac{\Delta V_{step}-LSB}{LSB},\qquad INL=\frac{V_{actual}-V_{ideal}}{LSB}\ \text{(in LSB)}$$

**Symbols**

- $DNL$ — differential nonlinearity, in LSB
- $INL$ — integral nonlinearity, in LSB
- $\Delta V_{step}$ — actual output step between adjacent codes, in V
- $V_{actual}$ — measured output at a given code, in V
- $V_{ideal}$ — ideal output at that code, in V

**Architecture comparison**

| Type | Resolution | Speed | Matching demand |
|---|---|---|---|
| Weighted resistor | medium | fast | tight for many bits |
| R-2R ladder | high | fast | only two values |
| Current steering | high | fastest | current-source matching |
| PWM | any | slow | none |
| Sigma-delta | very high | slow | none |

**Conditions:** ideal reference and switches; R-2R needs only two resistor values, which is why it scales to more bits than the weighted-resistor type; DNL $>-1$ LSB guarantees monotonicity. #dac

---

### 16. PLC Architecture and Scan Cycle

![](https://www.youtube.com/watch?v=iLty6SPaXJc)

*Video: What Is the PLC Scan Cycle? — PLC Programming Tutorials, 3:52*

**Scan (sweep) time ★**

$$T_{scan}=T_{input}+T_{program}+T_{output}+T_{comm}$$

$$f_{scan}=\frac{1}{T_{scan}}\ \text{(Hz)},\qquad T\ \text{in ms typically}$$

**Response time**

$$t_{response,worst}=2T_{scan}\ \text{(input change to output change)}$$

$$t_{response,typ}=T_{scan}+\text{input filter}+\text{output delay}$$

**Watchdog and I/O update**

$$T_{watchdog}>T_{scan,max},\qquad N_{I/O}=N_{in}+N_{out}\ \text{points}$$

**PLC architecture blocks**

| Block | Function |
|---|---|
| CPU | executes the ladder program |
| Input module | conditions field signals to logic levels |
| Output module | drives relays, triacs, transistors |
| Power supply | internal DC rails |
| Backplane bus | CPU to I/O communication |
| Programming device | ladder/HMI access |

**Ladder vs relay logic**

$$Y=(\text{NOT }X_1)\text{ AND }X_2\ \text{(series = AND, parallel = OR)}$$

$$Y=X_1\cdot X_2\ \text{(series contacts)},\qquad Y=X_1+X_2\ \text{(parallel contacts)}$$

**Conditions:** scan is sequential — inputs are read, logic solved, outputs written; outputs do not change mid-scan, so two rungs referencing the same output can produce order-dependent behavior. #plc

---

### 17. Ladder Logic, Timers and Counters

![](https://www.youtube.com/watch?v=BHbOXDt5O3o)

*Video: PLC Timer Programming for Beginners — RealPars, 10:44*

**Timer instructions ★**

$$T_{ON}:\ \text{DN}=1\ \text{after }t\ge PT,\qquad ET=\text{accumulated time (s)}$$

$$T_{OFF}:\ \text{DN}=1\ \text{while }ET<PT,\ \text{resets }PT\ \text{after the input drops}$$

$$T_{RET}:\ \text{retentive, holds }ET\ \text{when the rung goes false}$$

**Symbols**

- $T_{ON}$ — on-delay timer instruction
- $T_{OFF}$ — off-delay timer instruction
- $T_{RET}$ — retentive on-delay timer instruction
- $DN$ — done bit (timer output, dimensionless logic 0 or 1)
- $t$ — elapsed time, in s
- $PT$ — preset time (timer target value), in s
- $ET$ — elapsed (accumulated) time, in s

**Timer relations**

$$t_{delay}=\frac{PT}{time\ base}\ \text{(preset counts)},\qquad \text{Resolution}=time\ base\ \text{(s or ms)}$$

**Symbols**

- $t_{delay}$ — timer preset expressed in counts (dimensionless integer)
- $PT$ — preset time, in s
- $time\ base$ — timer time base (resolution per count), in s
- $Resolution$ — smallest time increment the timer can measure, in s

**Counter instructions ★**

$$CTU:\ DN=1\ \text{when }ACC\ge PRE,\qquad ACC=\text{accumulated count}$$

$$CTD:\ DN=1\ \text{when }ACC\le0,\qquad ACC=ACC-1\ \text{per false-to-true transition}$$

$$CTUD:\ ACC=ACC+1\ \text{(up)}/ACC-1\ \text{(down)}$$

**Symbols**

- $CTU$ — count-up counter instruction
- $CTD$ — count-down counter instruction
- $CTUD$ — count-up/down counter instruction
- $DN$ — done bit (counter output, dimensionless logic 0 or 1)
- $ACC$ — accumulated count (dimensionless integer)
- $PRE$ — counter preset value (dimensionless integer)
- $RES$ — reset instruction for timers and counters

**Frequency and totalizing**

$$f_{pulse}=\frac{1}{T_{pulse}}\ \text{(Hz)},\qquad \text{flow total}=ACC\times K\ \text{(units/pulse)}$$

**Symbols**

- $f_{pulse}$ — pulse frequency, in Hz
- $T_{pulse}$ — time between successive pulses, in s
- $ACC$ — accumulated count (dimensionless integer)
- $K$ — scale factor converting counts to engineering units, in units/pulse

**Instruction comparison**

| Instruction | Trigger | Reset |
|---|---|---|
| TON | rung true | rung false |
| TOF | rung false | — |
| RTO | rung true | RES instruction |
| CTU | false-to-true | RES instruction |
| CTD | false-to-true | preset load |

**Conditions:** counters respond to **edges**, not levels; a retentive timer keeps its accumulated value through a power cycle; the time base determines resolution and maximum preset. #plc

> [!warning] Exam trap
> Counters increment on a **false-to-true transition**, so a held-on input counts exactly once. And a PLC output does not respond within the same scan — worst-case response is two scan times.

## Part C — Instrumentation and Systems Integration

### 18. Measurements and Instrumentation

**Voltmeter multiplier ★**

$$R_s=\frac{V_{max}}{I_m}-R_m\ \text{(}\Omega\text{)}$$

$R_s$ = series multiplier, $R_m$ = meter resistance, $I_m$ = full-scale deflection current.

**Ammeter shunt ★**

$$R_{sh}=\frac{I_mR_m}{I_{tot}-I_m}\ \text{(}\Omega\text{)}$$

**Potentiometer and voltmeter sensitivity**

$$\text{Resolution}=\frac{V_{total}}{\text{turns}}\ \text{(V/turn)},\qquad \text{Sensitivity}=\frac{1}{I_m}\ \text{(}\Omega/\text{V)}$$

**Loading error ★**

$$\text{Loading error}=\frac{R_m}{R_m+R_s}\ \text{(fraction, dimensionless)}$$

**Conditions:** all resistances in $\Omega$, $V_{max}$ in V and currents in A; sensitivity in $\Omega$/V is the reciprocal of the full-scale current; the meter loads the circuit, so $R_m+R_s$ must be much larger than the source resistance. #instrumentation

---

### 19. Building, AV and Industrial Integration

**Protocol identification ★**

| Protocol | Domain | Typical role |
|---|---|---|
| KNX | building control | lighting and HVAC bus |
| DALI | lighting control | addressable ballasts |
| DMX512 | stage lighting | 512 dimmer channels |
| Modbus | industrial serial | RTU / ASCII / TCP |
| BACnet | building automation | HVAC, IP or Ethernet |
| SCADA | supervisory | control and data acquisition |
| IoT / API | device cloud | IP-based integration |

**Fail-safe vs fail-secure locks ★**

$$\text{fail-safe: de-energises to open on power loss},\qquad \text{fail-secure: stays locked on power loss}$$

**70 V distributed-line amplifier**

$$P=\sum P_{taps}\ \text{(W)},\qquad P_{amp}\ge1.25P\ \text{(25\% headroom)}$$

**Symbols**

- $P$ — total power drawn by all speaker-line taps, in W
- $P_{taps}$ — individual transformer tap wattage, in W
- $P_{amp}$ — required amplifier output power, in W

**HVAC sensible heat ★**

$$\text{CFM}=\frac{Q_s}{1.08\,\Delta T}$$

$Q_s$ in Btu/h, $\Delta T$ in °F, CFM in ft³/min.

**Symbols**

- $CFM$ — air volumetric flow rate, in ft³/min
- $Q_s$ — sensible heat load, in Btu/h
- $\Delta T$ — temperature difference between supply and return air, in °F

**VFD affinity laws ★**

$$Q\propto N,\qquad H\propto N^2,\qquad P\propto N^3$$

**Symbols**

- $Q$ — volumetric flow rate, in m³/s
- $N$ — shaft speed (rotational speed), in rev/min
- $H$ — head (or pressure), in m
- $P$ — shaft power, in W

**Conditions:** $P_{taps}$ are the transformer tap wattages on a 70 V or 100 V constant-voltage line, so the total is their sum and the amplifier is sized with headroom; the affinity laws assume a fixed system curve with $N$ the shaft speed, so halving speed cuts power to one-eighth. #av #hvac #industrial

→ Back to [[00_Index]]
