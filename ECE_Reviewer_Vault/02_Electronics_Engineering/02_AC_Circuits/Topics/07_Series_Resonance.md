---
id: ECE-02-07
title: "Series Resonance"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Phasors_and_Complex_Impedance]]", "[[03_Series_and_Parallel_AC_Analysis]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Series Resonance

> [!abstract] Scope
> At what frequency does a series RLC branch become purely resistive, how sharply does it select that frequency, and how large do the element voltages become there?

## Core Concept

> [!tip] Intuition
> In a series RLC branch the inductor's reactance rises with frequency while the capacitor's falls, so there is exactly one frequency at which they are equal and opposite and cancel. There the source sees nothing but $R$, the current is as large as it will ever be and in phase with the voltage, and the energy sloshing between the inductor's magnetic field and the capacitor's electric field is replenished only to cover the resistor's losses.

**The cancellation picture.** In series the impedances add, so the total impedance is:
$$\mathbf{Z} = R + j\left(\omega L - \frac{1}{\omega C}\right) = R + j(X_L-X_C)$$
As frequency rises, $X_L = \omega L$ grows linearly while $X_C = 1/(\omega C)$ falls as $1/\omega$, so the difference $X_L-X_C$ sweeps monotonically from $-\infty$ to $+\infty$ and crosses zero exactly once, at the resonant frequency:
$$\omega_0 = 1/\sqrt{LC}$$
At that frequency the reactances cancel, $\mathbf{Z} = R$ is real and minimum in magnitude, the current $\mathbf{I} = \mathbf{V}_s/R$ is maximum and in phase with the source so the power factor is unity, and $\mathbf{V}_L$ and $\mathbf{V}_C$ are individually large but exactly $180^\circ$ apart, so they cancel and the source only ever sees $\mathbf{V}_R = \mathbf{V}_s$. Physically the inductor and capacitor trade energy twice per cycle between magnetic and electric fields; the source replaces only what $R$ burns, which is why the resonant branch looks purely resistive from the outside.

**Sharpness and the quality factor.** How narrow the current peak is depends on how much resistance damps the tank, and the dimensionless measure of that is the quality factor:
$$Q_0 = \omega_0 L/R = 1/(\omega_0 C R) = (1/R)\sqrt{L/C}$$
— three forms that agree only at resonance. $Q_0$ has three useful readings. First, it is the ratio of reactive voltage to source voltage, so the inductor and capacitor each see $Q_0V_s$: that is voltage magnification, and it is how a small source stresses a component. Second, it sets the bandwidth, because the half-power points $f_1$ and $f_2$ are where $|\mathbf{Z}| = R\sqrt{2}$ and the current falls to $I_0/\sqrt{2}$, halving the power; consequently the bandwidth is:
$$BW = f_2-f_1 = f_0/Q_0 = R/(2\pi L)$$
Third, the two half-power frequencies are geometrically symmetric about $f_0$ rather than arithmetically: $f_0 = \sqrt{f_1f_2}$ holds for every $Q_0$, while the arithmetic mean $(f_1+f_2)/2$ sits slightly *above* $f_0$ and approaches it only as $Q_0\to\infty$.

**Where the idealisation breaks.** The model assumes a lossless inductor with the only resistance in the circuit. A real inductor has winding resistance, and often a core, so part of $R$ is frequency dependent and $Q_0$ has a practical ceiling; measured $Q$ values above a few hundred need air-core or ferrite construction, and past the winding's self-resonant frequency the inductor behaves capacitively. Two consequences matter for design. A high-$Q$ series branch develops $Q_0V_s$ across each reactive element, so the capacitor must be rated for at least $\sqrt{2}\,Q_0V_{s,rms}$ peak, not for the source voltage. And a narrow $BW$ cuts both ways: it is exactly what a radio tuned circuit wants and exactly what a power circuit must avoid, because a small drift in frequency or in component value moves the branch far off resonance. Below $f_0$ the branch is capacitive and the current leads; above $f_0$ it is inductive and the current lags. The sign of $X_L-X_C$ is the whole story.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Resonant frequency (rad/s) | $\omega_0 = \frac{1}{\sqrt{LC}}$ | $L$ in henries and $C$ in farads give rad/s. This is never the frequency in hertz. |
| Resonant frequency (hertz) | $f_0 = \frac{1}{2\pi\sqrt{LC}} = \frac{\omega_0}{2\pi}$ | The $2\pi$ is the single most commonly dropped factor in this topic. |
| Resonance condition | $X_L = X_C \quad\Longleftrightarrow\quad \omega_0 L = \frac{1}{\omega_0 C}$ | Holds only at $\omega_0$; there each reactance equals $\sqrt{L/C}$, not zero. |
| Series input impedance | $\mathbf{Z} = R + j\left(\omega L - \frac{1}{\omega C}\right)$ | Equal to $R$ at $\omega_0$; capacitive below it, inductive above it. A series branch has minimum impedance at resonance. |
| Quality factor | $Q_0 = \frac{\omega_0 L}{R} = \frac{1}{\omega_0 C R} = \frac{1}{R}\sqrt{\frac{L}{C}}$ | All three forms coincide at resonance only; $\omega_0$ must be in rad/s, so using $f_0$ makes the result $2\pi$ times too small. |
| Bandwidth | $BW = f_2 - f_1 = \frac{f_0}{Q_0} = \frac{R}{2\pi L}$ | The half-power (3 dB) width in hertz. Higher $Q_0$ means a narrower passband. |
| Half-power frequencies | $f_{1,2} = f_0\left[\sqrt{1+\left(\frac{1}{2Q_0}\right)^{2}} \mp \frac{1}{2Q_0}\right]$ | The minus sign gives $f_1$ and the plus sign $f_2$; both collapse to $f_0$ as $Q_0\to\infty$. At these points $\|\mathbf{Z}\| = R\sqrt{2}$ and $I = I_0/\sqrt{2}$. |
| Geometric symmetry | $f_0 = \sqrt{f_1 f_2}$ | Geometric, not arithmetic: $(f_1+f_2)/2$ exceeds $f_0$ for every finite $Q_0$. |
| Voltage magnification | $V_L = V_C = Q_0 V_s$ | RMS with RMS and peak with peak. $\mathbf{V}_L$ and $\mathbf{V}_C$ are $180^\circ$ apart, so they cancel and the source sees only $V_R = V_s$. |

## Interactive Widget

**Resonance Curve Sweep**

![[Resonance_Curve_Sweep.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A series circuit has $R = 10\ \Omega$, $L = 50$ mH and $C = 5\ \mu$F. Find $\omega_0$, $f_0$, $Q_0$, the bandwidth and the two half-power frequencies. Then find the voltages across $L$ and $C$ when the circuit is driven at resonance by $V_s = 20$ V rms.

**Given:** R = 10 ohm; L = 50 mH; C = 5 uF; V_s = 20 V rms at resonance

**Solution:**

1. $LC = (0.050)(5\times10^{-6}) = 2.5\times10^{-7}$ s$^{2}$, so $\omega_0 = 1/\sqrt{LC} = 1/(5\times10^{-4}) = 2000$ rad/s.
2. $f_0 = \omega_0/2\pi = 2000/6.28319 = 318.31$ Hz.
3. $Q_0 = \omega_0L/R = (2000)(0.050)/10 = 10.0$. Check with the capacitance form: $1/(\omega_0CR) = 1/[(2000)(5\times10^{-6})(10)] = 1/0.1 = 10.0$.
4. $BW = f_0/Q_0 = 318.31/10 = 31.83$ Hz. Check with $R/(2\pi L) = 10/(2\pi\cdot 0.050) = 31.83$ Hz.
5. $1/(2Q_0) = 0.05$ and $\sqrt{1+0.05^{2}} = 1.001249$.
6. $f_2 = 318.31(1.001249+0.05) = 334.62$ Hz and $f_1 = 318.31(1.001249-0.05) = 302.79$ Hz. Check: $f_2-f_1 = 31.83$ Hz $= BW$, and $\sqrt{f_1f_2} = \sqrt{302.79\cdot 334.62} = 318.31$ Hz $= f_0$.
7. At resonance $\mathbf{Z} = R$, so $I_0 = 20/10 = 2.000$ A rms and $V_R = 20$ V rms.
8. $V_L = V_C = Q_0V_s = 10(20) = 200$ V rms, that is $200\sqrt{2} = 283$ V peak across each reactive element.

> [!success]- Answer
> **$\omega_0 = 2000$ rad/s, $f_0 = 318.31$ Hz, $Q_0 = 10.0$, $BW = 31.83$ Hz, $f_1 = 302.79$ Hz, $f_2 = 334.62$ Hz, $V_L = V_C = 200$ V rms (283 V peak)**

> [!warning] Trap
> Computing $Q_0$ with the resonant frequency in hertz: $f_0L/R = 318.31(0.050)/10 = 1.59$, which is exactly $Q_0/2\pi$. The giveaway is the bandwidth, which then comes out $318.31/1.59 = 200$ Hz instead of 31.83 Hz - and a 1.59 quality factor would describe a hopelessly wide, almost untuned circuit.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷√(0.05×5E-6) : Ans÷2π : 2000×0.05÷10 : 318.31÷10` → $\omega_0$ = **2000** rad/s → $f_0$ = **318.31** Hz → $Q_0$ = **10.0** → $BW$ = **31.83** Hz.
> 2. `1÷(2×10) : √(1+Ans²) : 318.31×(1.00125+0.05) : 318.31×(1.00125−0.05)` → $1/(2Q_0)$ = **0.05** → **1.00125** → $f_2$ = **334.62** Hz → $f_1$ = **302.79** Hz.
> 3. `10×20 : Ans×√2` → $V_L = V_C$ = **200** V rms → **282.8** V peak across each reactive element.
>
> `Ans÷2π` is what keeps $Q_0$ in rad/s; using $f_0$ would give 1.59 and a 200 Hz bandwidth.

### P2. A series RLC circuit must resonate at 1 kHz with a bandwidth of 100 Hz while $R = 10\ \Omega$. Find $Q_0$, $L$ and $C$.

**Given:** f_0 = 1 kHz; BW = 100 Hz; R = 10 ohm

**Solution:**

1. $Q_0 = f_0/BW = 1000/100 = 10.0$.
2. Rearrange the bandwidth form $BW = R/(2\pi L)$: $L = R/(2\pi\,BW) = 10/(2\pi\cdot 100) = 10/628.32 = 0.015915$ H $= 15.92$ mH.
3. Check with $L = RQ_0/\omega_0$: $\omega_0 = 2\pi(1000) = 6283.2$ rad/s, so $L = 10(10)/6283.2 = 0.015915$ H, which agrees.
4. $C = 1/(\omega_0^{2}L) = 1/[(6283.2)^{2}(0.015915)] = 1/[(3.9478\times10^{7})(0.015915)] = 1/628318 = 1.5915\times10^{-6}$ F $= 1.5915\ \mu$F.
5. Check with $Q_0 = (1/R)\sqrt{L/C}$: $L/C = 0.015915/1.5915\times10^{-6} = 10000$, so $\sqrt{L/C} = 100$ and $100/10 = 10.0$, which agrees.
6. At resonance $X_L = X_C = \omega_0L = 6283.2(0.015915) = 100.0\ \Omega$, so $Q_0 = 100/10 = 10.0$ once more.

> [!success]- Answer
> **$Q_0 = 10.0$, $L = 15.92$ mH, $C = 1.5915\ \mu$F, with $X_L = X_C = 100.0\ \Omega$ at 1 kHz**

> [!warning] Trap
> Taking $L = RQ_0/f_0 = 10(10)/1000 = 0.1$ H by using $f_0$ where $\omega_0$ belongs. That is $2\pi$ times too large; with $L = 0.1$ H the capacitance that resonates at 1 kHz is only $0.2533\ \mu$F and the bandwidth becomes $R/(2\pi L) = 15.92$ Hz, nowhere near the required 100 Hz.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000÷100 : 10÷(2π×100)` → $Q_0$ = **10.0** → $L$ = **0.015915** H = **15.92** mH.
> 2. `1÷((2π×1000)²×0.015915) : 2π×1000×0.015915` → $C$ = **1.5915E-6** F = **1.5915** µF → $X_L = X_C$ = **100.0** Ω.
>
> `BW = R/(2πL)` needs no $\omega_0$, so $L$ falls straight out of the specification.

### P3. A series RLC branch has $R = 5\ \Omega$, $L = 20$ mH and $C = 1\ \mu$F. Find $f_0$, $Q_0$, the bandwidth and the two half-power frequencies, then verify that the current at $f_1$ is $1/\sqrt{2}$ of its resonant value.

**Given:** R = 5 ohm; L = 20 mH; C = 1 uF

**Solution:**

1. $LC = (0.020)(1\times10^{-6}) = 2\times10^{-8}$ s$^{2}$, so $\omega_0 = 1/\sqrt{2\times10^{-8}} = 1/(1.41421\times10^{-4}) = 7071.1$ rad/s.
2. $f_0 = 7071.1/6.28319 = 1125.4$ Hz.
3. $Q_0 = \omega_0L/R = (7071.1)(0.020)/5 = 141.42/5 = 28.284$. Check with $(1/R)\sqrt{L/C} = (1/5)\sqrt{0.020/10^{-6}} = 141.42/5 = 28.284$.
4. $BW = f_0/Q_0 = 1125.4/28.284 = 39.79$ Hz. Check with $R/(2\pi L) = 5/(2\pi\cdot 0.020) = 5/0.12566 = 39.79$ Hz.
5. $1/(2Q_0) = 0.017678$ and $\sqrt{1+0.017678^{2}} = 1.000156$.
6. $f_2 = 1125.4(1.000156+0.017678) = 1125.4(1.017834) = 1145.47$ Hz and $f_1 = 1125.4(1.000156-0.017678) = 1125.4(0.982478) = 1105.68$ Hz.
7. Checks: $f_2-f_1 = 39.79$ Hz $= BW$, and $\sqrt{(1145.47)(1105.68)} = \sqrt{1.2665\times10^{6}} = 1125.40$ Hz $= f_0$, confirming geometric symmetry.
8. At $f_1$, $\omega_1 = 2\pi(1105.68) = 6947.2$ rad/s, so $X_L = 138.94\ \Omega$ and $X_C = 1/[(6947.2)(10^{-6})] = 143.94\ \Omega$, giving $X = -5.00\ \Omega = -R$ exactly, since the half-power condition is $|X| = R$.
9. Therefore $|\mathbf{Z}| = \sqrt{25+25} = \sqrt{50} = 7.071\ \Omega = R\sqrt{2}$, so $I = I_0/\sqrt{2}$ and the power is exactly half its resonant value.

> [!success]- Answer
> **$f_0 = 1125.4$ Hz, $Q_0 = 28.284$, $BW = 39.79$ Hz, $f_1 = 1105.68$ Hz, $f_2 = 1145.47$ Hz; at $f_1$ the reactance is $-R$ exactly, so $|\mathbf{Z}| = R\sqrt{2} = 7.071\ \Omega$ and $I = I_0/\sqrt{2}$**

> [!warning] Trap
> Taking the resonant frequency as the arithmetic mean of the half-power points, $f_0 = (1105.68+1145.47)/2 = 1125.57$ Hz, instead of the geometric mean $\sqrt{f_1f_2} = 1125.40$ Hz. The two agree only as $Q_0\to\infty$; at $Q_0 = 28.28$ the arithmetic mean is 0.17 Hz high, and at the $Q_0 = 2$ of a wideband stage the error reaches about 3%.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷√(0.02×1E-6) : Ans÷2π : 7071.1×0.02÷5 : 1125.4÷28.284` → $\omega_0$ = **7071.1** rad/s → $f_0$ = **1125.4** Hz → $Q_0$ = **28.28** → $BW$ = **39.79** Hz.
> 2. `1÷(2×28.284) : √(1+Ans²) : 1125.4×(1.000156+0.017678) : 1125.4×(1.000156−0.017678)` → $f_2$ = **1145.47** Hz and $f_1$ = **1105.68** Hz.
> 3. `2π×1105.68 : √(5²+(Ans×0.02−1÷(Ans×1E-6))²)` → $\omega_1$ = **6947.2** rad/s → $\lvert \mathbf{Z} \rvert$ = **7.071** Ω $= R\sqrt{2}$, so $I = I_0/\sqrt{2}$.
>
> Both reactances must be evaluated at the same $\omega_1$; the half-power condition is exactly $\lvert X_L-X_C \rvert = R$.

### P4. A series circuit with $R = 4\ \Omega$, $L = 2$ mH and $C = 0.5\ \mu$F is driven at resonance by $V_s = 12$ V rms. Find $f_0$, $Q_0$, the voltages across $L$ and $C$, and the minimum peak voltage rating for the capacitor.

**Given:** R = 4 ohm; L = 2 mH; C = 0.5 uF; V_s = 12 V rms at resonance

**Solution:**

1. $LC = (2\times10^{-3})(0.5\times10^{-6}) = 1\times10^{-9}$ s$^{2}$, so $\omega_0 = 1/\sqrt{10^{-9}} = 3.1623\times10^{4}$ rad/s.
2. $f_0 = 31623/6.28319 = 5032.9$ Hz.
3. $Q_0 = \omega_0L/R = (31623)(0.002)/4 = 63.246/4 = 15.81$. Check with $(1/R)\sqrt{L/C} = (1/4)\sqrt{2\times10^{-3}/0.5\times10^{-6}} = (1/4)\sqrt{4000} = 63.246/4 = 15.81$.
4. At resonance $\mathbf{Z} = R = 4\ \Omega$ and $I_0 = 12/4 = 3.000$ A rms.
5. $V_L = V_C = Q_0V_s = 15.81(12) = 189.7$ V rms. Check with the reactance: $X_L = \omega_0L = 63.246\ \Omega$ and $V_L = I_0X_L = (3.000)(63.246) = 189.7$ V, which agrees.
6. Peak capacitor voltage $= 189.7\sqrt{2} = 268.3$ V, so the capacitor must be rated above 268 V peak even though the source is only 12 V rms.
7. Note also that $\mathbf{V}_L$ and $\mathbf{V}_C$ are $180^\circ$ apart, so their phasor sum is zero: the source still only supplies $\mathbf{V}_R = 12$ V rms.

> [!success]- Answer
> **$f_0 = 5032.9$ Hz, $Q_0 = 15.81$, $V_L = V_C = 189.7$ V rms (268.3 V peak) from a 12 V rms source**

> [!warning] Trap
> Rating the capacitor from the source voltage, or from $Q_0V_s$ rms without the peak margin. Here the reactive voltage is 189.7 V rms, i.e. 268.3 V peak across a capacitor in a circuit fed by 12 V rms; a 200 V part fails in service, and even the rms figure of 189.7 V exceeds a 150 V rating. Adding $V_L+V_C = 379$ V and expecting it across the source is the mirror-image error, since those two phasors cancel.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷√(0.002×0.5E-6) : Ans÷2π` → $\omega_0$ = **31623** rad/s → $f_0$ = **5032.9** Hz.
> 2. `31623×0.002÷4 : Ans×12 : Ans×√2` → $Q_0$ = **15.81** → $V_L = V_C$ = **189.7** V rms → **268.3** V peak.
>
> The capacitor rating is the peak of $Q_0V_s$ — neither $Q_0V_s$ itself nor the 12 V source.

### P5. A series branch with $R = 5\ \Omega$ and $L = 100$ mH is tuned to resonance at 60 Hz by choosing $C$. Find $C$ in $\mu$F, then find the current when the branch is driven by 120 V rms at 50 Hz, and compare it with the resonant current.

**Given:** R = 5 ohm; L = 100 mH; f_0 = 60 Hz (resonance); V_s = 120 V rms; operating frequency 50 Hz

**Solution:**

1. $\omega_0 = 2\pi(60) = 376.99$ rad/s.
2. $C = 1/(\omega_0^{2}L) = 1/[(376.99)^{2}(0.100)] = 1/[(142122)(0.100)] = 1/14212.2 = 7.036\times10^{-5}$ F $= 70.36\ \mu$F.
3. At 60 Hz, $Q_0 = \omega_0L/R = 376.99(0.100)/5 = 37.699/5 = 7.540$ and the resonant current is $I_0 = 120/5 = 24.00$ A rms.
4. At 50 Hz, $\omega = 2\pi(50) = 314.16$ rad/s, so $X_L = 314.16(0.100) = 31.416\ \Omega$.
5. $X_C = 1/(\omega C) = 1/[(314.16)(7.036\times10^{-5})] = 1/0.022105 = 45.24\ \Omega$.
6. $\mathbf{Z} = 5 + j(31.416-45.24) = 5 - j13.82\ \Omega$, so $|\mathbf{Z}| = \sqrt{25+191.0} = \sqrt{216.0} = 14.70\ \Omega$.
7. $I = 120/14.70 = 8.164$ A rms, and since $X_L < X_C$ the branch is capacitive at 50 Hz, so the current leads the voltage by $\tan^{-1}(13.82/5) = 70.1^\circ$.
8. The bandwidth is $BW = f_0/Q_0 = 60/7.540 = 7.958$ Hz, so 50 Hz is $10/7.958 = 1.26$ bandwidths below resonance - deep on the skirt, which is why the current collapses from 24.00 A to 8.164 A.

> [!success]- Answer
> **$C = 70.36\ \mu$F for 60 Hz resonance; at 50 Hz $\mathbf{Z} = 5-j13.82\ \Omega$ and $I = 8.164$ A rms leading by $70.1^\circ$, against $I_0 = 24.00$ A rms at resonance**

> [!warning] Trap
> Recomputing $X_L$ at the new frequency but leaving $X_C$ at its resonant value. $X_C$ depends on the actual frequency: at 50 Hz it is $1/(\omega C) = 45.24\ \Omega$, not $1/(\omega_0C) = 37.70\ \Omega$. Keeping the resonant value gives $X = -6.283\ \Omega$, $|\mathbf{Z}| = 8.03\ \Omega$ and $I = 14.94$ A instead of 8.164 A - nearly double the correct current.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷((2π×60)²×0.1)` → $C$ = **7.036E-5** F = **70.36** µF for 60 Hz resonance.
> 2. `2π×50×0.1 : 1÷(2π×50×70.36E-6) : SHIFT` `Pol(` `5` `,` `31.416−45.24` `)` → $X_L$ = **31.42** Ω → $X_C$ = **45.24** Ω → $\lvert \mathbf{Z} \rvert$ = **14.70** Ω at **−70.1**°.
> 3. `120÷14.70 : 120÷5 : 60÷7.540` → $I$ = **8.164** A leading by 70.1° → $I_0$ = **24.00** A → $BW$ = **7.958** Hz.
>
> $X_C$ must be recomputed at 50 Hz: $1/(\omega C)$ = 45.24 Ω, not the resonant 37.70 Ω.

## Traps & Exam Notes

- **Using $f_0$ where $\omega_0$ belongs in the quality factor.** $Q_0 = \omega_0L/R$ needs rad/s. For $R = 10\ \Omega$, $L = 50$ mH, $C = 5\ \mu$F the correct value is $2000(0.050)/10 = 10.0$, but $f_0L/R = 318.31(0.050)/10 = 1.59$ - low by exactly $2\pi$ - which then reports the bandwidth as 200 Hz instead of 31.83 Hz.
- **Taking $f_0$ as the arithmetic mean of the half-power frequencies.** The relation is $f_0 = \sqrt{f_1f_2}$: for $f_1 = 1105.68$ Hz and $f_2 = 1145.47$ Hz the arithmetic mean is 1125.57 Hz while the true resonance is 1125.40 Hz. The gap widens as damping rises, reaching about 3% at $Q_0 = 2$.
- **Carrying parallel-resonance intuition into the series case.** A series branch at resonance has *minimum* $|\mathbf{Z}| = R$ and maximum current; the parallel anti-resonant tank at resonance has maximum impedance and minimum line current. Choosing "maximum $Z$" here and asserting $I = 0$ instead of $I_0 = V_s/R$ costs the whole problem.
- **Inverting the bandwidth relation.** $BW = f_0/Q_0$, not $Q_0/f_0$. For $f_0 = 1125.4$ Hz and $Q_0 = 28.284$ the correct bandwidth is 39.79 Hz; the inverted form gives $28.284/1125.4 = 0.0251$ Hz, a passband narrower than the tolerance on the components that set it.

## See Also

- [[02_Phasors_and_Complex_Impedance]]
- [[08_Parallel_Resonance_and_Anti-Resonance]]
- [[06_Power_Factor_and_Correction]]
- [[01_Sinusoid,_RMS,_Average,_Form_and_Crest]]

---

[[06_Power_Factor_and_Correction|⬅ 06]] · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Parallel_Resonance_and_Anti-Resonance|08 ➡]]
