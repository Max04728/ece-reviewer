---
title: "Industrial Automation and Sensors — Drill"
type: drill
area: 07_Industrial_Automation_and_Sensors
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 78
updated: 2026-09-23
---

# Industrial Automation and Sensors — Practice Drill

**8 problems** drawn from a pool of 78 across 16 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 07_Industrial_Automation_and_Sensors --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. An inverting Schmitt trigger uses $R_1 = 10\ \mathrm{k\Omega}$ from $V_+$ to ground and $R_2 = 100\ \mathrm{k\Omega}$ from the output, with the signal applied to $V_-$ and saturation levels of $\pm13\ \mathrm{V}$. Find both thresholds and the hysteresis width.

**Given:** R1 = 10 kohm; R2 = 100 kohm; V_sat = +/-13 V; V_ref = 0

> [!success]- Answer
> **$V_{UT} = +1.18\ \mathrm{V}$, $V_{LT} = -1.18\ \mathrm{V}$, width $2.36\ \mathrm{V}$.**

> [!warning] Trap
> Using the supply value instead of the saturation value. With $\pm15\ \mathrm{V}$ assumed the thresholds come out at $\pm1.36\ \mathrm{V}$, a 15% error, because a 741 loses about 1.5 V inside each rail.

<sub>from ECE-07-05</sub>

### 2. An NTC thermistor has $R_{25} = 10\ \mathrm{k\Omega}$ and $\beta = 3500\ \mathrm{K}$. Find its resistance at $50\ ^\circ\mathrm{C}$ and its fractional sensitivity at $25\ ^\circ\mathrm{C}$.

**Given:** R_25 = 10 kohm; beta = 3500 K; T = 50 degC = 323.15 K

> [!success]- Answer
> **$R(50\ ^\circ\mathrm{C}) = 4.03\ \mathrm{k\Omega}$; the sensitivity at $25\ ^\circ\mathrm{C}$ is $-3.94\%/^\circ\mathrm{C}$.**

> [!warning] Trap
> Using Celsius temperatures in the beta equation. It requires kelvin: substituting 50 and 25 gives an exponent of 3500(0.02 - 0.04) = -70 and a resistance that is wrong by many orders of magnitude.

<sub>from ECE-07-09</sub>

### 3. An op-amp has $SR = 0.5\ \mathrm{V/\mu s}$. What is the largest peak output amplitude at $20\ \mathrm{kHz}$, and what is the full-power bandwidth for a $10\ \mathrm{V}$ peak sine?

**Given:** SR = 0.5 V/us; f = 20 kHz; V_p = 10 V (second part)

> [!success]- Answer
> **$V_p \le 3.98\ \mathrm{V}$ at $20\ \mathrm{kHz}$; the full-power bandwidth at $10\ \mathrm{V_p}$ is $7.96\ \mathrm{kHz}$.**

> [!warning] Trap
> Substituting $SR = 0.5$ without converting micro to base units. The ratio $2\pi f V_p/SR$ then comes out $10^6$ too large, and every answer is wrong by six decades.

<sub>from ECE-07-01</sub>

### 4. A type K thermocouple ($S = 41\ \mu\mathrm{V/^\circ C}$) on a 30 m run picks up $0.5\ \mathrm{V}$ of common-mode voltage from a ground loop. Find the temperature error for a single-ended input and for a differential input with $CMRR = 80\ \mathrm{dB}$.

**Given:** S = 41 uV/degC; V_cm = 0.5 V; single-ended input; differential CMRR = 80 dB

> [!success]- Answer
> **The single-ended input saturates; the differential input with 80 dB CMRR leaves $50\ \mu\mathrm{V}$, which is $1.22\ ^\circ\mathrm{C}$.**

> [!warning] Trap
> Connecting a low-level sensor to a single-ended input because the wires are short. Any ground potential difference appears directly in the reading, and for a thermocouple even a few millivolts of it is tens of degrees.

<sub>from ECE-07-12</sub>

### 5. An 8-bit DAC has $\pm2$ LSB integral nonlinearity, 1 LSB of offset error and a $0.5\%$ gain error at full scale. Find the worst-case total error in LSBs and the effective number of bits.

**Given:** n = 8 bits; INL = +/-2 LSB; offset = 1 LSB; gain error = 0.5%

> [!success]- Answer
> **Worst-case error $4.3\ \mathrm{LSB}$, so an 8-bit DAC delivers about $5.9$ effective bits.**

> [!warning] Trap
> Adding the percentage gain error directly to the LSB figures. A gain error must first be converted using the full-scale code count: 0.5% of 255 is 1.275 LSB, not 0.005 LSB.

<sub>from ECE-07-14</sub>

### 6. A non-inverting amplifier uses $R_1 = 10\ \mathrm{k\Omega}$, $R_f = 47\ \mathrm{k\Omega}$ and $V_i = 0.2\ \mathrm{V}$. Find the gain, the output voltage, and the feedback fraction $\beta$.

**Given:** R1 = 10 kohm; Rf = 47 kohm; V_i = 0.2 V

> [!success]- Answer
> **$A_v = 5.7$, $V_o = 1.14\ \mathrm{V}$, $\beta = 0.1754$.**

> [!warning] Trap
> Computing $1 + R_1/R_f = 1.213$ by putting the wrong resistor on top. The larger resistor is $R_f$; the formula is $1 + R_f/R_1$.

<sub>from ECE-07-02</sub>

### 7. A three-op-amp instrumentation amplifier has input-stage resistors $R = 25\ \mathrm{k\Omega}$ and a gain resistor $R_{gain} = 1\ \mathrm{k\Omega}$. The output stage is unity gain. Find the overall gain and the output for a $5\ \mathrm{mV}$ differential input.

**Given:** R = 25 kohm; R_gain = 1 kohm; output stage gain = 1; V_diff = 5 mV

> [!success]- Answer
> **$G = 51$, so $V_o = 255\ \mathrm{mV}$.**

> [!warning] Trap
> Writing $G = 1 + R/R_{gain} = 26$. The two input buffers are joined by $R_{gain}$, so the current through it is set by *both* $R$ resistors and the gain is $1 + 2R/R_{gain}$.

<sub>from ECE-07-03</sub>

### 8. A CPU's worst-case scan time is $18\ \mathrm{ms}$ and the watchdog must not trip during normal operation. Recommend a watchdog setting, and state what happens if a program change raises the scan to $120\ \mathrm{ms}$.

**Given:** worst-case scan = 18 ms; watchdog must exceed the worst case

> [!success]- Answer
> **Set the watchdog at about $100\ \mathrm{ms}$ (2-3 times the $18\ \mathrm{ms}$ worst-case scan); a $120\ \mathrm{ms}$ scan trips it and the CPU faults with outputs in their safe state.**

> [!warning] Trap
> Setting the watchdog equal to the nominal scan time. Normal scan jitter, communications bursts and diagnostic tasks make the worst-case scan much longer than the average, and a too-tight watchdog produces phantom faults on a healthy machine.

<sub>from ECE-07-15</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-07-01 | Op-Amp Fundamentals and Real Parameters | 5 |
| ECE-07-02 | Linear Op-Amp Circuits | 5 |
| ECE-07-03 | Instrumentation and Difference Amplifiers | 5 |
| ECE-07-04 | Integrators and Differentiators | 5 |
| ECE-07-05 | Comparators and Schmitt Triggers | 5 |
| ECE-07-06 | Precision Rectifiers | 5 |
| ECE-07-07 | Active Filter Responses | 5 |
| ECE-07-08 | Sallen-Key Filter Design | 5 |
| ECE-07-09 | Temperature Sensors | 5 |
| ECE-07-10 | Strain Gauges and Wheatstone Bridge | 5 |
| ECE-07-11 | Position Sensors: LVDT, Hall, Encoders | 5 |
| ECE-07-12 | Signal Conditioning and DAQ | 5 |
| ECE-07-13 | ADC Architectures and Quantization | 5 |
| ECE-07-14 | DAC Architectures | 5 |
| ECE-07-15 | PLC Architecture and Scan Cycle | 4 |
| ECE-07-16 | Ladder Logic, Timers and Counters | 4 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
