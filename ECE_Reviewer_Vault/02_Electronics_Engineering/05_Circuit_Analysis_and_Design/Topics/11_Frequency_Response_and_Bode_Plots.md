---
id: ECE-05-11
title: "Frequency Response and Bode Plots"
part: "02_Electronics_Engineering"
area: "05_Circuit_Analysis_and_Design"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Hybrid-Pi_Model]]", "[[10_Bode_Plots_and_Margins]]"]
tags: ["ece", "electronics_engineering", "circuit_analysis_and_design"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Frequency Response and Bode Plots

> [!abstract] Scope
> Find the lower and upper cutoff frequencies of an amplifier from its coupling and internal capacitances, and read gain, slope, phase and bandwidth off a Bode plot without being fooled by the asymptote.

## Core Concept

> [!tip] Intuition
> Every capacitor in an amplifier is an open circuit at DC and a short circuit at high frequency, so each one carves a corner out of the gain curve. The flat plateau between the corners is the midband, and the width of that plateau is the bandwidth you can actually use.

**One capacitor, one corner, and one formula.** Any single resistor-capacitor combination in the signal path produces a first-order response whose corner frequency is $f = \frac{1}{2\pi RC}$, where $R$ is the resistance seen by the capacitor with the source zeroed (voltage sources shorted) and $C$ is the capacitor itself. Below the corner the capacitor's reactance is large and it attenuates; above it the reactance is small and it passes. **Coupling and bypass capacitors create the low-frequency corners; the transistor's internal capacitances create the high-frequency corner.** The method never changes: identify the capacitor, find the Thevenin resistance across it, apply the formula. The only skill is getting $R$ right.

**The low-frequency end: three capacitors, three corners, one dominant.** The input coupling capacitor $C_{in}$ sees $R_s + R_{in}$; the output coupling capacitor $C_{out}$ sees $R_{out} + R_L$; the emitter bypass $C_E$ sees a small resistance:
$$R_E \parallel \left(r_e + \frac{R_{th} + r_\pi}{\beta + 1}\right)$$
which is often under $100\ \Omega$. Because $f_L = 1/(2\pi RC)$, a capacitor that sees a *small* resistance needs a *huge* value to reach the same corner. This is the examinable asymmetry: a $1\ \mu\mathrm{F}$ input capacitor across $11\ \mathrm{k\Omega}$ gives $14.5\ \mathrm{Hz}$, while the same $1\ \mu\mathrm{F}$ bypassing an emitter that presents $200\ \Omega$ gives $796\ \mathrm{Hz}$ — a factor of 55 worse for the same part. In a multi-capacitor design the highest of the individual $f_L$ values dominates the overall low cutoff, so you rarely need to combine them.

**The high-frequency end and where the Miller capacitance hides.** At high frequency the junction capacitances $C_{be}$ ($C_\pi$) and $C_{bc}$ ($C_\mu$) become the loads. $C_{be}$ shunts $r_\pi$ directly and is small; $C_{bc}$ bridges input and output and is multiplied by Miller's theorem into $C_{Mi} = C_{bc}(1 + |A_v|)$, which for a CE stage with $|A_v| = 100$ and $C_{bc} = 2\ \mathrm{pF}$ becomes $202\ \mathrm{pF}$. The upper cutoff is then $f_H = \frac{1}{2\pi R_{th} C_{th}}$ with $C_{th} = C_{be} + C_{Mi}$ and $R_{th}$ the resistance seen at the input node after zeroing the source, typically $R_s \parallel R_B$. **The trap is applying the Miller factor at the output node or leaving it off entirely** — leaving it off moves $f_H$ up by roughly the voltage gain, which can turn a correct $318\ \mathrm{kHz}$ answer into $32\ \mathrm{MHz}$.

**Reading a Bode plot, and what 'the -3 dB point' really is.** A Bode magnitude plot is the gain in dB against log frequency. Each simple pole adds $-20\ \mathrm{dB}$ per decade above its corner and each zero adds $+20\ \mathrm{dB}$ per decade; because $20\log_{10}2 = 6.02$, the same slope is $6\ \mathrm{dB}$ per octave. The actual curve is 3 dB *below* the asymptote intersection at the corner: the corner is the **$-3\ \mathrm{dB}$ point**, where the gain is $0.707$ of midband, and it is also where the asymptote switches slope. The phase is $-45^\circ$ exactly at the pole, tending to $0^\circ$ a decade below and $-90^\circ$ a decade above; two poles stack to $-180^\circ$. Finally, for a single-pole amplifier the product of midband gain and bandwidth is constant, $A_{mid} \times BW = f_T$: cascading a stage with $A_{mid} = 100$ and $f_H = 100\ \mathrm{kHz}$ against one with $A_{mid} = 10$ and $f_H = 1\ \mathrm{MHz}$ gives the same $10\ \mathrm{MHz}$ product, which is why you cannot buy gain and bandwidth independently from the same device.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Corner frequency of any RC pair | $f = \frac{1}{2\pi RC}$ | R is the resistance seen by C with all sources zeroed. This one formula gives both f_L (coupling and bypass capacitors) and f_H (internal capacitances); only which capacitor you plug in changes. |
| Gain in decibels | $A_v(\mathrm{dB}) = 20\log_{10}\lvert A_v \rvert$ | Voltage ratio. A factor of 10 is 20 dB, a factor of 100 is 40 dB. Common error: using 10*log10 for a voltage ratio, which halves the answer. |
| The minus 3 dB point | $A_{(-3\,dB)} = 0.707 A_{mid}, \qquad -3.01\ \mathrm{dB}$ | Defines both f_L and f_H. It is 3 dB below the midband level and 3 dB below the asymptotic intersection at the corner - the real curve passes 3 dB under the break point. |
| Amplifier bandwidth | $BW = f_H - f_L \approx f_H$ | The approximation is safe when f_H is many decades above f_L, which is the normal case. When f_L = 20 Hz and f_H = 20 kHz the exact bandwidth is 19.98 kHz, a 0.1 percent difference. |
| Gain-bandwidth product | $A_{mid} \times BW = f_T$ | For a single-pole (or dominant-pole) amplifier this product is a constant. Trades gain for bandwidth exactly: doubling the gain halves the upper cutoff. It does not hold once a second pole is within a decade of the first. |
| Bode slope per pole or zero | $\pm 20\ \mathrm{dB/decade} = \pm 6\ \mathrm{dB/octave}$ | Because 20*log10(2) = 6.02. A pole gives -20 dB/decade, a zero +20 dB/decade, and two coincident poles -40 dB/decade. The slope changes only at a corner frequency. |
| High-frequency input capacitance with Miller effect | $C_{in} = C_{be} + C_{bc}(1 + \lvert A_v \rvert)$ | Use at the input node of the stage. C_bc alone is 1-5 pF; the multiplication by (1+\|A_v\|) is what makes it dominant, and it is why a cascode (\|A_v1\| = 1) has 10 to 30 times less input capacitance. |
| Upper cutoff from the input time constant | $f_H = \frac{1}{2\pi R_{th} C_{th}}, \qquad R_{th} = R_s \parallel R_B$ | R_th is the resistance seen back from the input node with the source zeroed; C_th is C_be plus the Miller capacitance. Ignoring R_B makes R_th too large and f_H too low. |

## Worked Problems

### P1. An amplifier has a $1\ \mu\mathrm{F}$ input coupling capacitor, a source resistance of $1\ \mathrm{k\Omega}$, an input resistance of $10\ \mathrm{k\Omega}$, and a $1\ \mu\mathrm{F}$ output coupling capacitor with $R_{out}=2\ \mathrm{k\Omega}$ driving $R_L=8\ \mathrm{k\Omega}$. Find the two low-frequency corners.

**Given:** C_in = 1 uF; R_s = 1 kohm; R_in = 10 kohm; C_out = 1 uF; R_out = 2 kohm; R_L = 8 kohm

**Solution:**

1. Input capacitor sees R_s + R_in = 1 kohm + 10 kohm = 11 kohm (the source resistance is in series with the amplifier input)
2. f_L(in) = 1/(2*pi*R*C) = 1/(2*pi*11000*1e-6) = 1/(0.06912) = 14.47 Hz
3. Output capacitor sees R_out + R_L = 2 kohm + 8 kohm = 10 kohm
4. f_L(out) = 1/(2*pi*10000*1e-6) = 1/(0.06283) = 15.92 Hz
5. The dominant (higher) corner is 15.92 Hz, so f_L = 15.9 Hz for the amplifier as a whole

> [!success]- Answer
> **f_L(in) = 14.5 Hz, f_L(out) = 15.9 Hz, so the overall f_L = 15.9 Hz (the higher corner dominates).**

> [!warning] Trap
> Using R_in alone for the input capacitor and getting 15.9 Hz by coincidence of the numbers, or using R_s alone and getting 159 Hz. The input capacitor carries the source resistance in series with the input resistance, and the output capacitor carries the output resistance in series with the load.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1 ÷ (2π × 11E3 × 1E-6)` → $f_{L(in)}$ = **14.47** Hz.
> 2. `1 ÷ (2π × 10E3 × 1E-6)` → $f_{L(out)}$ = **15.92** Hz.
> 3. The higher corner dominates, so the stage's $f_L$ = **15.9** Hz.

### P2. A common-emitter stage has an emitter bypass capacitor $C_E = 10\ \mu\mathrm{F}$ across $R_E = 1\ \mathrm{k\Omega}$. With the source resistance $1\ \mathrm{k\Omega}$, $R_B = 47\ \mathrm{k\Omega}$, $r_\pi = 2.6\ \mathrm{k\Omega}$ and $\beta = 100$, find the resistance seen by $C_E$ and its corner frequency, then compare with the $14.5\ \mathrm{Hz}$ input corner of the previous problem.

**Given:** C_E = 10 uF; R_E = 1 kohm; R_s = 1 kohm; R_B = 47 kohm; r_pi = 2.6 kohm; beta = 100

**Solution:**

1. R_th at the base = R_s || R_B = (1 kohm)(47 kohm)/(48 kohm) = 979 ohm
2. Resistance looking into the base = R_th + r_pi = 979 + 2600 = 3579 ohm
3. Referred to the emitter by dividing by (beta + 1): 3579/101 = 35.4 ohm
4. R seen by C_E = R_E || (r_e + 35.4 ohm); with r_e = 26 ohm this is 1000 || 61.4 = 57.9 ohm
5. f_L(bypass) = 1/(2*pi*57.9*10e-6) = 1/(0.003638) = 274.9 Hz
6. The bypass corner is 19 times higher than the 14.5 Hz input corner, so f_L is set by C_E

> [!success]- Answer
> **R seen by C_E = 57.9 ohm, f_L(bypass) = 275 Hz, which dominates the 14.5 Hz input-coupling corner.**

> [!warning] Trap
> Applying the formula with R = R_E = 1 kohm and answering f_L = 15.9 Hz. The bypass capacitor sees the parallel combination of R_E with the tiny emitter-referred source resistance, here 57.9 ohm, so the same 10 uF gives 275 Hz. If the emitter resistor is left unbypassed on purpose, this corner disappears entirely and the gain simply drops.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1 × 47 ÷ 48` → $R_s \parallel R_B$ = **979** $\Omega$; `+ 2600` → **3579** $\Omega$; `÷ 101` → **35.4** $\Omega$.
> 2. `1 ÷ (1 ÷ 1000 + 1 ÷ (26 + 35.4))` → the resistance seen by $C_E$ = **57.9** $\Omega$.
> 3. `1 ÷ (2π × 57.9 × 10E-6)` → $f_{L(bypass)}$ = **274.9** Hz, 19× the 14.5 Hz input corner.

### P3. A CE stage has $R_s = 1\ \mathrm{k\Omega}$, $R_B = 100\ \mathrm{k\Omega}$, $C_{be} = 20\ \mathrm{pF}$, $C_{bc} = 2\ \mathrm{pF}$ and a midband gain of $-100$. Find the Miller capacitance, the total input capacitance, the Thevenin resistance at the input node and the upper cutoff frequency.

**Given:** R_s = 1 kohm; R_B = 100 kohm; C_be = 20 pF; C_bc = 2 pF; A_v = -100; r_pi = 1 kohm

**Solution:**

1. C_Mi = C_bc(1 + |A_v|) = 2 pF * (1 + 100) = 2 pF * 101 = 202 pF
2. C_th = C_be + C_Mi = 20 pF + 202 pF = 222 pF
3. R_th = R_s || R_B || r_pi = (1 kohm || 100 kohm) || 1 kohm = 990 || 1000 = 497.5 ohm
4. f_H = 1/(2*pi*R_th*C_th) = 1/(2*pi*497.5*222e-12) = 1/(6.939e-7) = 1.441E6 Hz
5. Bandwidth = f_H - f_L = 1.44 MHz, since f_L is only about 15 Hz

> [!success]- Answer
> **C_Mi = 202 pF, C_th = 222 pF, R_th = 497.5 ohm, f_H = 1.44 MHz, BW = 1.44 MHz.**

> [!warning] Trap
> Using only C_be = 20 pF and answering f_H = 16 MHz - an error of 11 times. The Miller capacitance of 202 pF is ten times C_be and is what actually sets the high-frequency limit. The second error is using R_th = R_s = 1 kohm and ignoring the 100 kohm base bias resistor in parallel, or using 101 kohm and ignoring the signal-path short.

### P4. An amplifier has a midband gain of 400 (52.0 dB) and a single dominant pole at $f_H = 50\ \mathrm{kHz}$. Find the gain in dB and as a ratio at $500\ \mathrm{kHz}$ and at $100\ \mathrm{kHz}$, and identify the slope and phase at each point.

**Given:** A_mid = 400; A_mid(dB) = 52.0 dB; f_H = 50 kHz; Test frequencies: 100 kHz and 500 kHz

**Solution:**

1. 500 kHz is one decade above the pole: the asymptote falls 20 dB per decade, so the gain is 52.0 - 20 = 32.0 dB
2. As a ratio: 10^(32.0/20) = 39.8, close to the exact 400/10 = 40 for a frequency well above the pole
3. 100 kHz is one octave above the pole: 6 dB of rolloff, so the gain is 52.0 - 6.0 = 46.0 dB
4. As a ratio: 10^(46.0/20) = 199.5, matching the exact 400/sqrt(1 + 4) = 400/2.236 = 178.9 only approximately - the asymptote is optimistic near the corner
5. Slope past the pole is -20 dB/decade (-6 dB/octave); phase is about -84 degrees at 500 kHz and -63 degrees at 100 kHz, approaching the -90 degree asymptote

> [!success]- Answer
> **At 500 kHz: 32.0 dB (ratio 39.8, slope -20 dB/decade, phase about -84 deg). At 100 kHz: 46.0 dB by asymptote (exact 45.1 dB, ratio 178.9, phase -63 deg).**

> [!warning] Trap
> Using the -20 dB/decade asymptote right at the corner. At 100 kHz (one octave above the pole) the true gain is 400/2.236 = 178.9, which is 45.1 dB, while the asymptote predicts 46.0 dB - a 0.9 dB error that grows as you approach f_H. Also do not apply 10*log10 to a voltage ratio: 400 is 52.0 dB, not 26 dB.

> [!tip]- Calculator technique (Canon F-789SGA) — TABLE
> 1. `MODE` `6`: f(X) = `20 log(400 ÷ √(1 + (X ÷ 50)²))`, with X in kHz.
> 2. Start 50, end 500, step 50 → at X = 100 kHz the table reads **45.05** dB and at X = 500 kHz **32.0** dB.
> 3. The straight-line asymptote gives 52.0 − 6.0 = **46.0** dB at the octave point, so it is **0.9** dB optimistic there.

### P5. Two voltage-gain stages are cascaded, each with a single pole at $100\ \mathrm{kHz}$ and a midband gain of 100. Find the midband gain in dB, the overall bandwidth using the dominant-pole approximation, the gain-bandwidth product, and the slope and phase 1 decade above the pole.

**Given:** Stage 1: A_mid = 100, f_H = 100 kHz; Stage 2: A_mid = 100, f_H = 100 kHz; Two identical poles

**Solution:**

1. Midband gain = (100)(100) = 1.0E4, which is 20 log10(10000) = 80.0 dB
2. Two identical poles combine to f_H(overall) = f_H * sqrt(2^(1/2) - 1) = f_H * 0.6436 = 64.4 kHz
3. The gain-bandwidth product of one stage is 100 * 100 kHz = 1.0E7 Hz; the cascade gives 1.0E4 * 64.4 kHz = 6.44E8 Hz, not 1.0E7 - the single-pole rule does not hold for a two-pole cascade
4. One decade above the pole the slope is -40 dB/decade (two poles stack), and at 1 MHz the gain is approximately 80 - 40 = 40 dB
5. Phase at 1 MHz: each pole contributes about -84 degrees, so the total is about -168 degrees, approaching -180 degrees

> [!success]- Answer
> **Midband gain 80.0 dB; overall bandwidth 64.4 kHz; slope -40 dB/decade with phase about -168 degrees one decade above the pole.**

> [!warning] Trap
> Assuming the cascade keeps a 100 kHz bandwidth. Two identical poles reduce it to 0.6436 of the single-pole value, so 64.4 kHz, and the error grows fast: three identical poles give 0.51, four give 0.435. Applying the single-pole gain-bandwidth product to a two-pole cascade is the second error - the product is not constant here.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100 × 100` → $A_{mid}$ = **1.0e4**; `20 log(Ans)` → **80.0** dB.
> 2. `100E3 × √(√2 − 1)` → $f_H$ = **64.4** kHz, the shrinkage factor for two identical poles.
> 3. `1E4 × 64.4E3` → GBP = **6.44e8** Hz, not the single-pole **1.0e7**; the slope is **−40** dB/decade with phase about **−168**°.

## Traps & Exam Notes

- **Using the wrong resistance for a bypass capacitor.** $C_E = 10\ \mu\mathrm{F}$ across $R_E = 1\ \mathrm{k\Omega}$ looks like a $15.9\ \mathrm{Hz}$ corner, but the capacitor really sees about $58\ \Omega$ and the true corner is $275\ \mathrm{Hz}$ - an error of 17 times. The bypass capacitor sees $R_E$ in parallel with the emitter-referred source resistance, never $R_E$ alone.
- **Dropping the Miller multiplication.** At $|A_v| = 100$ and $C_{bc} = 2\ \mathrm{pF}$, the input capacitance is $222\ \mathrm{pF}$, not $20\ \mathrm{pF}$, and $f_H$ falls from $16\ \mathrm{MHz}$ to $1.44\ \mathrm{MHz}$. Forgetting the $(1+|A_v|)$ factor is the single largest source of wrong bandwidth answers.
- **Using $10\log_{10}$ for a voltage gain.** $A_v(\mathrm{dB}) = 20\log_{10}|A_v|$, so a ratio of 400 is $52.0\ \mathrm{dB}$, not $26.0\ \mathrm{dB}$. The factor of 20 exists because power goes as voltage squared.
- **Reading gain off the asymptote at the corner.** The straight-line Bode approximation crosses the midband level exactly at the corner, but the true curve is $3\ \mathrm{dB}$ below there: $0.707A_{mid}$. At one octave above the pole the asymptote is still $0.9\ \mathrm{dB}$ optimistic (a predicted 46.0 dB against a true 45.1 dB for a 400-gain stage at $f = 2f_H$).
- **Confusing dB per decade with dB per octave.** $20\ \mathrm{dB/decade} = 6\ \mathrm{dB/octave}$. A single pole at $50\ \mathrm{kHz}$ gives $-20\ \mathrm{dB}$ at $500\ \mathrm{kHz}$ but only $-6\ \mathrm{dB}$ at $100\ \mathrm{kHz}$; using 20 dB for the octave point overstates the loss by a factor of 3.3.
- **Assuming a cascaded amplifier keeps the single-stage bandwidth.** Two identical poles move $f_H$ to $0.6436 f_H$ and double the rolloff to $-40\ \mathrm{dB/decade}$; four identical poles move it to $0.435 f_H$ and give $-80\ \mathrm{dB/decade}$, which reaches the $-180^\circ$ phase that makes feedback oscillate.

## See Also

- [[12_Miller’s_Theorem_and_High-Frequency_Effects]]
- [[13_Gain-Bandwidth_Product_and_fT]]
- [[09_Multistage,_Cascade_and_Cascode]]

---

[[10_Darlington_and_Feedback_Pairs|⬅ 10]] · [[_MOC_Circuit_Analysis_and_Design|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Miller’s_Theorem_and_High-Frequency_Effects|12 ➡]]
