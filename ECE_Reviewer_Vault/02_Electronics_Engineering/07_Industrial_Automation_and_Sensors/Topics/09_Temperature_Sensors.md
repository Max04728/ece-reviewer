---
id: ECE-07-09
title: "Temperature Sensors"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 9
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Instrumentation_and_Difference_Amplifiers]]", "[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Temperature Sensors

> [!abstract] Scope
> Select and linearize the four workhorse temperature sensors — RTD, thermocouple, thermistor and IC sensor — and compute the error each one contributes in an industrial measurement.

## Core Concept

> [!tip] Intuition
> Temperature is inferred from something that changes with it: the resistance of a metal, the voltage across a junction of two dissimilar metals, the resistance of a ceramic, or the bandgap of a transistor. Each mechanism has a different sensitivity, linearity and range, and the exam question is always which one fits the application.

**RTDs and the platinum standard.** A resistance temperature detector uses the positive temperature coefficient of a metal; platinum is universal because it is stable, chemically inert and nearly linear. A Pt100 is $100\ \mathrm{\Omega}$ at $0\ ^\circ\mathrm{C}$ with $\alpha = 0.00385\ \mathrm{\Omega/\Omega/^\circ C}$, so its sensitivity is $\alpha R_0 = 0.385\ \mathrm{\Omega/^\circ C}$; a Pt1000 uses the same $\alpha$ but gives $3.85\ \mathrm{\Omega/^\circ C}$, which is easier to resolve but more prone to self-heating. Over a narrow range $R = R_0(1+\alpha T)$ is adequate, but the response is genuinely quadratic and the Callendar–Van Dusen polynomial is the standard:
$$R(T) = R_0[1+AT+BT^2+C(T-100)T^3]$$
with $A = 3.9083\times10^{-3}$, $B = -5.775\times10^{-7}$ and $C$ used only below $0\ ^\circ\mathrm{C}$. At $150\ ^\circ\mathrm{C}$ the linear formula already reads $1.1\ ^\circ\mathrm{C}$ high, which is far larger than the sensor's own accuracy class.

**Thermocouples and the cold junction.** Joining two dissimilar metals produces the Seebeck voltage $V = S(T_h - T_c)$, so a thermocouple measures a *difference* and only becomes an absolute thermometer when the reference junction temperature is known. Type K is the industrial default (about $41\ \mu\mathrm{V/^\circ C}$, range $-200$ to $+1350\ ^\circ\mathrm{C}$), type J is more sensitive ($51\ \mu\mathrm{V/^\circ C}$, limited range), type T is used at cryogenic temperatures ($41\ \mu\mathrm{V/^\circ C}$) and type E has the highest sensitivity of the common types ($68\ \mu\mathrm{V/^\circ C}$). Cold-junction compensation adds a voltage equal to $S\,T_c$ — from an ice point, an isothermal block with its own sensor, or in software — and the extension wire and connector must match the thermocouple alloy all the way to the reference junction, or the extra junctions corrupt the measurement.

**Thermistors and IC sensors.** An NTC thermistor is a semiconductor oxide whose resistance falls steeply with temperature:
$$R(T) = R_{25}\exp[\beta(1/T - 1/T_{25})]$$
with $T$ in kelvin and $\beta$ around 3500 K, or the more accurate Steinhart–Hart form $1/T = A + B\ln R + C(\ln R)^3$. The sensitivity is $\alpha = -\beta/T^2$, about $-3.9\%/^\circ\mathrm{C}$ at room temperature — ten times an RTD's — but the response is strongly nonlinear, so linear interpolation across a wide range fails badly and a lookup table or the beta equation is mandatory. IC sensors such as the LM35 exploit the predictable $V_{BE}$ of a transistor: $10\ \mathrm{mV/^\circ C}$ with $0\ \mathrm{V}$ at $0\ ^\circ\mathrm{C}$, giving excellent linearity and a ratiometric output, but a limited range (typically $-55$ to $+150\ ^\circ\mathrm{C}$) and a need for a negative supply or a pull-down to read below zero.

**Choosing between them.** The choice is driven by range, accuracy, linearity, sensitivity, cost and environment. An RTD wins on accuracy and stability over $-200$ to $+600\ ^\circ\mathrm{C}$; a thermocouple wins on range, ruggedness and speed, and is the only practical choice above $600\ ^\circ\mathrm{C}$ or for a tiny contact; a thermistor wins on sensitivity, size and cost for narrow-range control loops such as a thermostat; an IC sensor wins on linearity and interface simplicity at board level. A useful comparison in round numbers: an RTD gives $0.385\ \mathrm{\Omega/^\circ C}$ and a measurement uncertainty of a few tenths of a degree, a type K gives $41\ \mu\mathrm{V/^\circ C}$ with an uncertainty of one to three degrees, and a thermistor gives $-3.9\%/^\circ\mathrm{C}$.

**Error sources that decide the design.** An RTD needs an excitation current and therefore self-heats: the temperature rise is $I^2R/D$ where $D$ is the dissipation constant in mW/°C, and $D$ depends on whether the probe sits in still air, flowing water or a thermowell, so 1 mA is the usual compromise and 5 mA is a $1\ ^\circ\mathrm{C}$ error in still air. An RTD also needs two or three lead wires: 1 Ω of lead in series with a 120 Ω element is thousands of microstrain-equivalent error, so three-wire or four-wire connections cancel the lead resistance. A thermocouple's millivolt signal means the amplifier's offset voltage and drift and the accuracy of the cold-junction sensor dominate the total error — $10\ \mu\mathrm{V}$ of offset on a type K is $0.24\ ^\circ\mathrm{C}$ — and its low source impedance but common-mode noise on long runs demands a differential input or an isolated transmitter.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Linear RTD approximation | $R(T) = R_0(1 + \alpha T)$ | R_0 = 100 ohm for Pt100 with alpha = 0.00385 per degC, sensitivity 0.385 ohm/degC; a Pt1000 uses the same alpha and gives 3.85 ohm/degC. Good only near 0 degC. |
| Callendar-Van Dusen equation | $R(T) = R_0\left[1 + AT + BT^2 + C(T-100)T^3\right]$ | A = 3.9083e-3, B = -5.775e-7, C = -4.183e-12 (C used only for T < 0 degC). At 150 degC the linear form is 1.1 degC high. |
| RTD self-heating | $\Delta T = \frac{I^2R}{D}$ | D is the dissipation constant in mW/degC and depends on the medium. 1 mA in a Pt100 dissipates 0.1 mW; 5 mA in still air can cost over 1 degC. |
| Thermocouple output | $V = S\,(T_h - T_c)$ | A thermocouple measures a temperature difference. Without cold-junction compensation the reading is low by the ambient temperature. |
| Typical Seebeck coefficients | $S_K \approx 41,\ S_J \approx 51,\ S_T \approx 41,\ S_E \approx 68\ \mu\mathrm{V/^\circ C}$ | At about 25 degC. Type K is the industrial default; E is the most sensitive common type; S and R are about 10 uV/degC. |
| Cold-junction compensation | $T_h = T_c + \frac{V}{S}$ | Software compensation adds T_c/S to the measured voltage; hardware adds a voltage source equal to S T_c. Requires the correct extension wire to the reference junction. |
| Thermistor beta equation | $R(T) = R_{25}\exp\left[\beta\left(\frac{1}{T}-\frac{1}{T_{25}}\right)\right]$ | T in kelvin, beta typically 3000-4500 K. Highly nonlinear, so linear interpolation over a wide range is invalid. |
| Steinhart-Hart equation | $\frac{1}{T} = A + B\ln R + C(\ln R)^3$ | Three-coefficient fit for a thermistor, accurate to a few millikelvin over the rated range. Coefficients come from the manufacturer. |
| Thermistor sensitivity | $\alpha = \frac{1}{R}\frac{dR}{dT} = -\frac{\beta}{T^2}$ | About -3.9%/degC at 25 degC, roughly ten times an RTD - but negative and strongly temperature-dependent. |
| LM35 IC sensor output | $V_o = 10\ \mathrm{mV/^\circ C}\times T$ | 0 V at 0 degC, linear to within 0.5 degC, but needs a negative supply or a pull-down resistor to read below 0 degC. |

## Worked Problems

### P1. A Pt100 ($R_0 = 100\ \mathrm{\Omega}$, $\alpha = 0.00385\ \mathrm{\Omega/\Omega/^\circ C}$) is used at $150\ ^\circ\mathrm{C}$. Compute its resistance with the linear approximation and with the Callendar–Van Dusen equation, and express the difference in degrees.

**Given:** R_0 = 100 ohm; alpha = 0.00385 /degC; T = 150 degC; A = 3.9083e-3, B = -5.775e-7

**Solution:**

1. Linear: R = 100(1 + 0.00385 x 150) = 100(1.5775) = 157.75 ohm
2. CVD: A T = 3.9083e-3 x 150 = 0.586245
3. B T^2 = -5.775e-7 x 22500 = -0.0129938
4. R = 100(1 + 0.586245 - 0.0129938) = 157.325 ohm
5. Difference = 157.75 - 157.325 = 0.425 ohm, which is 0.425/0.385 = 1.10 degC

> [!success]- Answer
> **Linear $157.75\ \mathrm{\Omega}$ versus Callendar–Van Dusen $157.325\ \mathrm{\Omega}$ — a $1.10\ ^\circ\mathrm{C}$ error.**

> [!warning] Trap
> Using $R_0(1+\alpha T)$ away from $0\ ^\circ\mathrm{C}$. The $BT^2$ term is 13 mΩ at $150\ ^\circ\mathrm{C}$ but 52 mΩ at $300\ ^\circ\mathrm{C}$, so a linear design that looks fine near ambient is a degree or more wrong at process temperature.

### P2. A Pt100 has reached $300\ ^\circ\mathrm{C}$, where its resistance is $212.05\ \mathrm{\Omega}$. Find the self-heating error with $1\ \mathrm{mA}$ and with $5\ \mathrm{mA}$ of excitation in still air, where the dissipation constant is $5\ \mathrm{mW/^\circ C}$.

**Given:** R = 212.05 ohm at 300 degC; I = 1 mA and 5 mA; D = 5 mW/degC

**Solution:**

1. At 1 mA: P = I^2 R = (1e-3)^2 x 212.05 = 0.212 mW
2. Delta T = 0.212/5 = 0.042 degC
3. At 5 mA: P = (5e-3)^2 x 212.05 = 5.301 mW
4. Delta T = 5.301/5 = 1.06 degC

> [!success]- Answer
> **$0.042\ ^\circ\mathrm{C}$ at $1\ \mathrm{mA}$ and $1.06\ ^\circ\mathrm{C}$ at $5\ \mathrm{mA}$.**

> [!warning] Trap
> Assuming a higher excitation current is harmless because the resistance is only a couple of hundred ohms. Self-heating scales with $I^2$, so 5 mA dissipates 25 times the power of 1 mA, and the same probe in still air rather than flowing water can be ten times worse.

### P3. A type K thermocouple measures a hot junction at $200\ ^\circ\mathrm{C}$ with the reference junction at $25\ ^\circ\mathrm{C}$ and $S = 41\ \mu\mathrm{V/^\circ C}$. Find the measured voltage, and the indicated temperature if the meter assumes a $0\ ^\circ\mathrm{C}$ reference.

**Given:** T_h = 200 degC; T_c = 25 degC; S = 41 uV/degC; meter reference = 0 degC

**Solution:**

1. Generated voltage: V = S(T_h - T_c) = 41 uV/degC x (200 - 25) = 7175 uV
2. V = 7.175 mV
3. Uncompensated meter: T = V/S = 7175/41 = 175 degC
4. Error = 175 - 200 = -25 degC, exactly the missing cold-junction temperature

> [!success]- Answer
> **$V = 7.175\ \mathrm{mV}$; without compensation the meter indicates $175\ ^\circ\mathrm{C}$, exactly $25\ ^\circ\mathrm{C}$ low.**

> [!warning] Trap
> Treating the thermocouple voltage as an absolute temperature. The sensor measures $T_h - T_c$, so an uncompensated system is always wrong by the ambient temperature — a 25 degC error that looks like a plausible reading.

### P4. An NTC thermistor has $R_{25} = 10\ \mathrm{k\Omega}$ and $\beta = 3500\ \mathrm{K}$. Find its resistance at $50\ ^\circ\mathrm{C}$ and its fractional sensitivity at $25\ ^\circ\mathrm{C}$.

**Given:** R_25 = 10 kohm; beta = 3500 K; T = 50 degC = 323.15 K

**Solution:**

1. 1/T = 1/323.15 = 3.09454e-3; 1/T_25 = 1/298.15 = 3.35402e-3
2. Difference = -2.59477e-4
3. beta x difference = 3500 x (-2.59477e-4) = -0.90817
4. R = 10000 x exp(-0.90817) = 10000 x 0.40328 = 4032.8 ohm
5. Sensitivity at 25 degC: alpha = -beta/T^2 = -3500/298.15^2 = -0.0394 per degC, that is -3.94%/degC

> [!success]- Answer
> **$R(50\ ^\circ\mathrm{C}) = 4.03\ \mathrm{k\Omega}$; the sensitivity at $25\ ^\circ\mathrm{C}$ is $-3.94\%/^\circ\mathrm{C}$.**

> [!warning] Trap
> Using Celsius temperatures in the beta equation. It requires kelvin: substituting 50 and 25 gives an exponent of 3500(0.02 - 0.04) = -70 and a resistance that is wrong by many orders of magnitude.

### P5. An LM35 with $10\ \mathrm{mV/^\circ C}$ output feeds a 10-bit ADC with a $5\ \mathrm{V}$ reference. Find the output at $40\ ^\circ\mathrm{C}$, the code it produces, and the temperature resolution per LSB. Repeat for a 12-bit converter.

**Given:** LM35 sensitivity = 10 mV/degC; T = 40 degC; ADC = 10-bit, V_ref = 5 V; also 12-bit

**Solution:**

1. Sensor output: 10 mV/degC x 40 = 400 mV
2. 10-bit LSB = 5/1024 = 4.883 mV
3. Code = 400/4.883 = 81.9, so about code 82
4. Resolution = 4.883 mV / (10 mV/degC) = 0.488 degC per LSB
5. 12-bit LSB = 5/4096 = 1.221 mV, giving 1.221/10 = 0.122 degC per LSB

> [!success]- Answer
> **$400\ \mathrm{mV}$, about code 82, with $0.488\ ^\circ\mathrm{C}$ per LSB at 10 bits and $0.122\ ^\circ\mathrm{C}$ at 12 bits.**

> [!warning] Trap
> Assuming the sensor's 0.5 degC accuracy and the converter's resolution are the same thing. The 10-bit converter's 0.49 degC step is comparable to the sensor error, so it contributes directly to the total uncertainty rather than being negligible.

## Traps & Exam Notes

- **Extrapolating the linear RTD formula.** $R = R_0(1+\alpha T)$ is a small-range approximation: at $150\ ^\circ\mathrm{C}$ it reads $1.1\ ^\circ\mathrm{C}$ high and by $300\ ^\circ\mathrm{C}$ the missing $BT^2$ term is $3.45\ \mathrm{\Omega}$, about $9\ ^\circ\mathrm{C}$ of error — far outside any Pt100 accuracy class.
- **Confusing $\alpha$ with the sensitivity in ohms per degree.** $\alpha = 0.00385/^\circ\mathrm{C}$ is a ratio; the sensitivity is $\alpha R_0 = 0.385\ \mathrm{\Omega/^\circ C}$ for a Pt100 and $3.85\ \mathrm{\Omega/^\circ C}$ for a Pt1000. Using 0.385 for a Pt1000 understates the change tenfold.
- **Forgetting cold-junction compensation.** A thermocouple indicates $T_h - T_c$; an uncompensated type K at a $25\ ^\circ\mathrm{C}$ ambient reads exactly $25\ ^\circ\mathrm{C}$ low, and using ordinary copper wire instead of the matching extension alloy creates new junctions and adds a further error.
- **Over-driving the RTD.** Self-heating grows as $I^2R$: 1 mA in a Pt100 is 0.04 degC but 5 mA is 1.06 degC in still air, and the dissipation constant is far worse in air than in liquid, so the same transmitter is accurate in a water bath and wrong in a thermowell.
- **Linearizing an NTC thermistor by interpolation.** Its sensitivity is $-3.9\%/^\circ\mathrm{C}$ and strongly temperature-dependent, so a two-point linear fit across a wide range is wrong by many degrees; use the beta equation, Steinhart–Hart or a lookup table.
- **Ignoring amplifier offset in a thermocouple channel.** At $41\ \mu\mathrm{V/^\circ C}$, a $10\ \mu\mathrm{V}$ input offset is $0.24\ ^\circ\mathrm{C}$ and drift adds more, so the amplifier and cold-junction sensor — not the thermocouple — usually set the system accuracy.
- **Treating the LM35 and LM34 as interchangeable.** The LM35 is Celsius at $10\ \mathrm{mV/^\circ C}$ and the LM34 is Fahrenheit at $10\ \mathrm{mV/^\circ F}$, and both need a negative supply or an output pull-down to measure below zero.

## See Also

- [[10_Strain_Gauges_and_Wheatstone_Bridge]]
- [[12_Signal_Conditioning_and_DAQ]]
- [[13_ADC_Architectures_and_Quantization]]

---

[[08_Sallen-Key_Filter_Design|⬅ 08]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Strain_Gauges_and_Wheatstone_Bridge|10 ➡]]
