---
title: "Circuit Analysis and Design — Drill"
type: drill
area: 05_Circuit_Analysis_and_Design
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 92
updated: 2026-09-23
---

# Circuit Analysis and Design — Practice Drill

**8 problems** drawn from a pool of 92 across 17 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 05_Circuit_Analysis_and_Design --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A common-emitter stage has $C_{bc} = 2\ \mathrm{pF}$ and a midband inverting gain $A_v = -100$. The resistance seen at the input node is $R_{th} = 1\ \mathrm{k}\Omega$ and the transistor's own $C_{\pi} = 10\ \mathrm{pF}$. Find the Miller input capacitance, the total input capacitance and the high-frequency cutoff.

**Given:** $C_{bc} = 2\ \mathrm{pF}$; $A_v = -100$; $R_{th} = 1\ \mathrm{k}\Omega$; $C_{\pi} = 10\ \mathrm{pF}$

> [!success]- Answer
> **$C_{Mi} = 202\ \mathrm{pF}$, $C_{in} = 212\ \mathrm{pF}$ and $f_H = 751\ \mathrm{kHz}$ (versus $13.3\ \mathrm{MHz}$ if the Miller effect were ignored)**

> [!warning] Trap
> Sign error in Miller's theorem. Using $A_v = +100$ makes the divisor $1 - 100 = -99$ and gives $C_{Mi} = 2/(-99) = -20.2\ \mathrm{pF}$, a negative capacitance. The divisor for an inverting stage is $1 - (-|A_v|) = 1 + |A_v| = 101$, always one more than the gain magnitude.

<sub>from ECE-05-12</sub>

### 2. Find $I_B$, $I_C$, $I_E$ and $V_{CE}$ for an emitter-stabilized bias network.

**Given:** $V_{CC} = 12\ \mathrm{V}$; $R_B = 240\ \mathrm{k}\Omega$; $R_C = 2.2\ \mathrm{k}\Omega$; $R_E = 1\ \mathrm{k}\Omega$; $\beta = 100$; $V_{BE} = 0.7\ \mathrm{V}$

> [!success]- Answer
> **$I_B = 33.1\ \mu\mathrm{A}$, $I_C = 3.31\ \mathrm{mA}$, $I_E = 3.35\ \mathrm{mA}$, $V_{CE} = 1.36\ \mathrm{V}$.**

> [!warning] Trap
> Using $R_B + \beta R_E = 240\ \mathrm{k}\Omega + 100\ \mathrm{k}\Omega$ instead of $R_B + (\beta+1)R_E$. The $1\ \mathrm{k}\Omega$ difference is only 0.3 % here, but the same substitution in a Darlington or low-beta stage is a large error.

<sub>from ECE-05-01</sub>

### 3. A class AB output stage is biased by a $V_{BE}$ multiplier with $R_1 = 1\ \mathrm{k}\Omega$, $R_2 = 1\ \mathrm{k}\Omega$ and a multiplier transistor whose $V_{BE} = 0.65\ \mathrm{V}$. The two output devices each drop $V_{BE} = 0.60\ \mathrm{V}$ and each has an emitter resistor $R_E = 0.47\ \Omega$. Find the bias voltage $V_{BB}$ and the quiescent current in each output device, then state what happens if the multiplier is set to exactly $2V_{BE}$.

**Given:** $R_1 = 1\ \mathrm{k}\Omega$; $R_2 = 1\ \mathrm{k}\Omega$; multiplier $V_{BE} = 0.65\ \mathrm{V}$; output device $V_{BE} = 0.60\ \mathrm{V}$; $R_E = 0.47\ \Omega$

> [!success]- Answer
> **$V_{BB} = 1.30\ \mathrm{V}$ and $I_Q = 106\ \mathrm{mA}$ per device; setting $V_{BB} = 1.20\ \mathrm{V}$ gives $I_Q = 0$ and restores the crossover distortion**

> [!warning] Trap
> Setting the bias to exactly $2V_{BE}$ on the assumption that the two devices need precisely their threshold voltages. That leaves zero excess voltage, so no quiescent current flows and the stage is still class B with its crossover notch. The deliberate 0.1 V excess is what creates the class AB bias; too much excess, however, raises the dissipation and approaches class A.

<sub>from ECE-05-15</sub>

### 4. Two voltage-gain stages are cascaded, each with a single pole at $100\ \mathrm{kHz}$ and a midband gain of 100. Find the midband gain in dB, the overall bandwidth using the dominant-pole approximation, the gain-bandwidth product, and the slope and phase 1 decade above the pole.

**Given:** Stage 1: A_mid = 100, f_H = 100 kHz; Stage 2: A_mid = 100, f_H = 100 kHz; Two identical poles

> [!success]- Answer
> **Midband gain 80.0 dB; overall bandwidth 64.4 kHz; slope -40 dB/decade with phase about -168 degrees one decade above the pole.**

> [!warning] Trap
> Assuming the cascade keeps a 100 kHz bandwidth. Two identical poles reduce it to 0.6436 of the single-pole value, so 64.4 kHz, and the error grows fast: three identical poles give 0.51, four give 0.435. Applying the single-pole gain-bandwidth product to a two-pole cascade is the second error - the product is not constant here.

<sub>from ECE-05-11</sub>

### 5. A CE stage runs at $I_C = 1\ \mathrm{mA}$ with $\beta = 100$, $V_A = 100\ \mathrm{V}$, $R_C = 3\ \mathrm{k\Omega}$ and an open output (no $R_L$). Find the voltage gain with and without the Early effect, and state the percentage error from ignoring $r_o$.

**Given:** I_C = 1 mA; beta = 100; V_A = 100 V; R_C = 3 kohm; R_L = open; V_T = 26 mV

> [!success]- Answer
> **A_v = -115.4 V/V ignoring r_o and -112.0 V/V including it; ignoring r_o overstates the gain by 3.0 percent.**

> [!warning] Trap
> Putting r_o in parallel with the *input* side, or writing R_C || r_o = 2.91 kohm but then multiplying by r_pi instead of g_m. The controlled source is g_m*v_pi, so the multiplier is always g_m and the collector-side resistance is always 3 kohm || 100 kohm.

<sub>from ECE-05-07</sub>

### 6. A CE amplifier has the Q-point of the previous problem and a bypassed emitter resistor. Find $A_v$, $Z_i$, $A_i$ and $Z_o$ (neglect $r_o$).

**Given:** $r_e = 13\ \Omega$ (from $I_E = 2\ \mathrm{mA}$); $\beta = 150$; $R_C = 4.7\ \mathrm{k}\Omega$; $R_L = 10\ \mathrm{k}\Omega$; $R_B = 220\ \mathrm{k}\Omega$

> [!success]- Answer
> **$A_v = -246$ (inverting), $Z_i = 1.93\ \mathrm{k}\Omega$, $A_i = 148.7$, $Z_o = 4.7\ \mathrm{k}\Omega$.**

> [!warning] Trap
> Using $R_C$ instead of $R_C \parallel R_L$: $A_v = -4700/13 = -362$, which is 47 % higher than the correct -246. The AC load always includes $R_L$.

<sub>from ECE-05-06</sub>

### 7. A silicon NPN is biased at $I_C = 1\ \mathrm{mA}$ with $\beta = 100$ and $V_A = 100\ \mathrm{V}$. Find $g_m$, $r_\pi$, $r_e$ and $r_o$.

**Given:** I_C = 1 mA; beta = 100; V_A = 100 V; V_T = 26 mV

> [!success]- Answer
> **g_m = 38.5 mS, r_pi = 2.60 kohm, r_e = 25.7 ohm, r_o = 100 kohm.**

> [!warning] Trap
> Reporting r_pi = 26 ohm by computing V_T/I_C and calling it r_pi. That is r_e. r_pi is beta times larger, so the error understates the input resistance by a factor of 100 and makes every following gain calculation inconsistent with the source loading.

<sub>from ECE-05-07</sub>

### 8. The CE stage with $A_v = -246$ and $Z_i = 1.933\ \mathrm{k}\Omega$ is driven from a source with $R_s = 600\ \Omega$ and $v_s = 10\ \mathrm{mV}$ peak. Find the output voltage and the fraction of the source signal lost at the input.

**Given:** $A_v = -245.9$; $Z_i = 1.933\ \mathrm{k}\Omega$; $R_s = 600\ \Omega$; $v_s = 10\ \mathrm{mV}$ peak

> [!success]- Answer
> **$v_b = 7.63\ \mathrm{mV}$, $v_o = 1.88\ \mathrm{V}$ peak; 23.7 % of the source signal is dropped across $R_s$.**

> [!warning] Trap
> Multiplying $A_v$ by $v_s$ directly and reporting 2.46 V. The source resistance and the low CE input resistance form a divider; with a 10 kohm source the same stage would lose 84 % of the signal.

<sub>from ECE-05-06</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-05-01 | BJT DC Biasing Configurations | 9 |
| ECE-05-02 | Load Lines and Q Point | 5 |
| ECE-05-03 | Bias Stability and Stability Factors | 5 |
| ECE-05-04 | FET Biasing Configurations | 5 |
| ECE-05-05 | BJT Small-Signal h-Parameter Model | 5 |
| ECE-05-06 | Small-Signal re Model: CE, CB, CC | 9 |
| ECE-05-07 | Hybrid-Pi Model | 5 |
| ECE-05-08 | FET Amplifiers: CS, CD, CG | 5 |
| ECE-05-09 | Multistage, Cascade and Cascode | 4 |
| ECE-05-10 | Darlington and Feedback Pairs | 5 |
| ECE-05-11 | Frequency Response and Bode Plots | 5 |
| ECE-05-12 | Miller’s Theorem and High-Frequency Effects | 5 |
| ECE-05-13 | Gain-Bandwidth Product and fT | 5 |
| ECE-05-14 | Feedback Amplifier Topologies | 5 |
| ECE-05-15 | Power Amplifiers: Classes A, B, AB, C | 5 |
| ECE-05-16 | Oscillators: RC Phase Shift and Wien Bridge | 5 |
| ECE-05-17 | Oscillators: Hartley, Colpitts, Crystal | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
