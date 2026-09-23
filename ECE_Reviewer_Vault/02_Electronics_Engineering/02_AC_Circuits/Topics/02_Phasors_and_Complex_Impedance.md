---
id: ECE-02-02
title: "Phasors and Complex Impedance"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 2
tier: 1
depth: full
problem_count: 9
prereqs: ["[[01_Sinusoid,_RMS,_Average,_Form_and_Crest]]", "[[01_Complex_Numbers,_Euler_and_De_Moivre]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Phasors and Complex Impedance

> [!abstract] Scope
> Convert a sinusoid to a phasor and back, write the complex impedance of R, L and C, and combine impedances in series and parallel.

## Core Concept

> [!tip] Intuition
> At a single frequency every steady-state voltage and current is a sinusoid of the same frequency, so the only things that distinguish them are amplitude and phase. A phasor is that pair, drawn as one complex number; differentiation turns into multiplication by $j\omega$, which converts a differential circuit problem into ordinary complex algebra.

**The phasor representation.** A sinusoid is represented by the complex number:
$$v(t) = V_m\cos(\omega t + \varphi)$$
is represented by $\mathbf{V} = V_m\angle\varphi$ — magnitude $V_m$, angle $\varphi$, with the $\omega t$ rotation suppressed because every quantity in the circuit shares it. The transform is linear, so KCL, KVL, series and parallel reduction, superposition, Thévenin/Norton and nodal/mesh analysis all carry over unchanged with $\mathbf{V}$, $\mathbf{I}$ and $\mathbf{Z}$ in place of $v$, $i$ and $R$.

**Why $j\omega$ appears.** Differentiating a phasor quantity multiplies it by $j\omega$. Take a current:
$$i = I_m\cos(\omega t + \varphi)$$
Its derivative is:
$$di/dt = -\omega I_m\sin(\omega t+\varphi) = \omega I_m\cos(\omega t + \varphi + 90^\circ)$$
which is the original phasor rotated by $+90^\circ$ and scaled by $\omega$ — exactly multiplication by $j\omega$. Integrating divides by $j\omega$. This one fact produces every impedance. The resistance is: $\mathbf{Z}_R = R$, the inductive reactance is:
$$\mathbf{Z}_L = j\omega L$$
and the capacitive reactance is:
$$\mathbf{Z}_C = 1/(j\omega C) = -j/(\omega C)$$

**Impedance is the phasor-domain resistance.** $\mathbf{Z} = \mathbf{V}/\mathbf{I}$ is complex: its magnitude $|\mathbf{Z}|$ is the ratio of amplitudes and its angle is the phase by which the voltage leads the current. Write $\mathbf{Z} = R + jX$ with $R$ the resistance and $X$ the reactance. Inductive reactance is positive and capacitive reactance is negative, so a positive angle means the load is inductive and a negative angle means it is capacitive.

**Combination rules are unchanged.** Series impedances add:
$$\mathbf{Z}_{eq} = \mathbf{Z}_1 + \mathbf{Z}_2 + \cdots$$
(same current). Parallel impedances combine as $1/\mathbf{Z}_{eq} = \sum 1/\mathbf{Z}_k$ (same voltage), or $\mathbf{Z}_1\mathbf{Z}_2/(\mathbf{Z}_1+\mathbf{Z}_2)$ for two. Because the arithmetic is complex, addition is easiest in rectangular form and multiplication/division is easiest in polar form — the standard workflow is to convert, operate, and convert back.

**The reference matters.** With a cosine reference the correspondence is:
$$v(t) = V_m\cos(\omega t+\varphi) \leftrightarrow \mathbf{V} = V_m\angle\varphi$$
If the given function is a sine, convert first:
$$\sin\theta = \cos(\theta - 90^\circ)$$
so $V_m\sin(\omega t+\varphi) \leftrightarrow V_m\angle(\varphi - 90^\circ)$. Mixing a sine-referenced and a cosine-referenced phasor in the same KVL equation is a silent $90^\circ$ error.

**RMS versus peak phasors.** Power calculations require RMS phasors:
$$S = \mathbf{V}_{rms}\mathbf{I}_{rms}^*$$
Impedance does not care which you use, since the ratio is the same, but the moment you compute power the convention must be RMS. Philippine board problems usually state RMS values; the phasor magnitude is then the RMS value, and the time-domain amplitude is $\sqrt{2}$ times it.

**Frequency-domain only.** Phasors describe the sinusoidal steady state at one frequency. They say nothing about the transient after a switch, and they cannot be used when two sources of different frequencies are present — solve each frequency separately and add the time-domain results, which is why superposition is the only network theorem that survives a frequency mismatch.

## Derivation

**Resistor.** Ohm's law $v = Ri$ holds instantaneously, so $\mathbf{V} = R\mathbf{I}$ and $\mathbf{Z}_R = R$. Voltage and current are in phase.

**Inductor.** The element law is $v = L\dfrac{di}{dt}$. With $i = I_m\cos(\omega t+\varphi)$, differentiation gives $v = -\omega LI_m\sin(\omega t+\varphi) = \omega LI_m\cos(\omega t+\varphi+90^\circ)$. In phasor form

$$\mathbf{V} = \omega L\angle90^\circ\,\mathbf{I} = j\omega L\,\mathbf{I} \quad\Longrightarrow\quad \mathbf{Z}_L = j\omega L$$

so the voltage leads the current by exactly $90^\circ$.

**Capacitor.** $i = C\dfrac{dv}{dt}$. With $v = V_m\cos(\omega t+\varphi)$, $i = -\omega CV_m\sin(\omega t+\varphi) = \omega CV_m\cos(\omega t+\varphi+90^\circ)$. Since $\mathbf{I}$ leads $\mathbf{V}$, the impedance $\mathbf{V}/\mathbf{I}$ carries a $-90^\circ$ angle: $\mathbf{Z}_C = 1/(j\omega C) = -j/(\omega C)$.

**Series and parallel.** KVL in the phasor domain gives $\mathbf{V} = \mathbf{I}\mathbf{Z}_1 + \mathbf{I}\mathbf{Z}_2$, hence $\mathbf{Z}_{eq} = \mathbf{Z}_1+\mathbf{Z}_2$. KCL gives $\mathbf{I} = \mathbf{V}/\mathbf{Z}_1 + \mathbf{V}/\mathbf{Z}_2$, hence $1/\mathbf{Z}_{eq} = 1/\mathbf{Z}_1 + 1/\mathbf{Z}_2$, or $\mathbf{Z}_{eq} = \mathbf{Z}_1\mathbf{Z}_2/(\mathbf{Z}_1+\mathbf{Z}_2)$.

**Magnitude and angle of a series combination.** $\mathbf{Z} = R + jX$ gives $|\mathbf{Z}| = \sqrt{R^2+X^2}$ and $\theta = \tan^{-1}(X/R)$ with quadrant taken from the signs of $R$ and $X$. The current magnitude is $|\mathbf{V}|/|\mathbf{Z}|$ and the current angle is the source angle minus $\theta$.

**Conjugate impedances in parallel.** For $\mathbf{Z}_1 = R+jX$ and $\mathbf{Z}_2 = R-jX$, the product is $R^2+X^2$ (real) and the sum is $2R$, so $\mathbf{Z}_{eq} = (R^2+X^2)/(2R)$ — purely resistive, and equal to half the magnitude of either branch when the two are equal in magnitude.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Cosine to phasor | $v(t) = V_m\cos(\omega t + \varphi) \;\leftrightarrow\; \mathbf{V} = V_m\angle\varphi$ | Cosine reference. Magnitude is the PEAK value unless RMS phasors are declared. |
| Sine to phasor | $V_m\sin(\omega t + \varphi) \;\leftrightarrow\; V_m\angle(\varphi - 90^\circ)$ | Convert to cosine first, or subtract 90 degrees. Forgetting this shifts every subsequent result. |
| RMS phasor | $\mathbf{V}_{rms} = \frac{V_m}{\sqrt{2}}\angle\varphi$ | Required for any power calculation. Impedance alone is convention-independent. |
| Phasor back to time domain | $\mathbf{V} = V\angle\varphi \;\rightarrow\; v(t) = \sqrt{2}\,V\cos(\omega t+\varphi)$ | The sqrt(2) appears only when V is the RMS magnitude. |
| Resistive impedance | $\mathbf{Z}_R = R$ | Real and positive. Voltage and current in phase. |
| Inductive impedance | $\mathbf{Z}_L = j\omega L = jX_L, \quad X_L = \omega L$ | +90 degrees. Reactance grows with frequency; an inductor is an open circuit at DC. |
| Capacitive impedance | $\mathbf{Z}_C = \frac{1}{j\omega C} = -jX_C, \quad X_C = \frac{1}{\omega C}$ | -90 degrees. Reactance falls with frequency; a capacitor is a short at DC in the steady state. |
| General impedance | $\mathbf{Z} = R + jX = \lvert \mathbf{Z} \rvert\angle\theta, \quad \theta = \tan^{-1}\!\frac{X}{R}$ | Positive theta means inductive, negative means capacitive. Take the quadrant from the signs. |
| Admittance | $\mathbf{Y} = \frac{1}{\mathbf{Z}} = G + jB$ | Siemens. Admittances add in parallel; useful when many branches share two nodes. |
| Series impedances | $\mathbf{Z}_{eq} = \mathbf{Z}_1 + \mathbf{Z}_2 + \cdots$ | Common current. Add in rectangular form to avoid angle mistakes. |
| Parallel impedances | $\frac{1}{\mathbf{Z}_{eq}} = \frac{1}{\mathbf{Z}_1} + \frac{1}{\mathbf{Z}_2}, \qquad \mathbf{Z}_{eq} = \frac{\mathbf{Z}_1\mathbf{Z}_2}{\mathbf{Z}_1+\mathbf{Z}_2}$ | Common voltage. The product-over-sum shortcut works for exactly two branches, complex or not. |
| Ohm's law in the phasor domain | $\mathbf{V} = \mathbf{I}\mathbf{Z}$ | Division must be complex: divide magnitudes and subtract angles. |
| Series voltage divider | $\mathbf{V}_k = \mathbf{V}_s\frac{\mathbf{Z}_k}{\mathbf{Z}_{eq}}$ | Complex ratio. The largest \|Z\| does NOT necessarily take the largest voltage angle-wise, but it does take the largest magnitude. |

## Worked Problems

### P1. Express $v(t) = 120\sqrt{2}\sin(377t + 30^\circ)\,\mathrm{V}$ as an RMS phasor.

**Given:** v(t) = 120√2 sin(377t + 30°) V; cosine reference; RMS phasor required

**Solution:**

1. The peak value is 120 sqrt(2) V, so the RMS value is 120 V
2. Convert sine to cosine: sin(theta) = cos(theta - 90 degrees)
3. v(t) = 120 sqrt(2) cos(377t + 30 - 90) = 120 sqrt(2) cos(377t - 60)
4. The RMS phasor is therefore V = 120 angle -60 degrees V

> [!success]- Answer
> **$\mathbf{V} = 120\angle{-60^\circ}\,\mathrm{V\,rms}$**

> [!warning] Trap
> Writing $120\sqrt{2}\angle30^\circ$: two errors at once — using the peak value as the RMS magnitude, and ignoring the $-90^\circ$ that the sine-to-cosine conversion forces.

### P2. Find the impedance of a series combination of $R = 30\,\Omega$ and $L = 0.1\,\mathrm{H}$ at $60\,\mathrm{Hz}$, in both rectangular and polar form.

**Given:** R = 30 Ω; L = 0.1 H; f = 60 Hz

**Solution:**

1. omega = 2 pi f = 2 pi (60) = 376.99 rad/s
2. X_L = omega L = (376.99)(0.1) = 37.70 Ω
3. Z = 30 + j37.70 Ω
4. |Z| = sqrt(30^2 + 37.70^2) = sqrt(900 + 1421.3) = sqrt(2321.3) = 48.18 Ω
5. theta = arctan(37.70/30) = 51.5 degrees, so Z = 48.18 angle 51.5 degrees Ω

> [!success]- Answer
> **$\mathbf{Z} = 30 + j37.7\,\Omega = 48.18\angle{51.5^\circ}\,\Omega$**

> [!warning] Trap
> Adding the magnitudes arithmetically to get 67.7 Ω. Impedances add as vectors; at a 51.5 degree angle the magnitude is 48.18 Ω, well below the algebraic sum.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×60×0.1` → $X_L$ = **37.70** Ω, so $\mathbf{Z} = 30 + j37.70$ Ω.
> 2. `SHIFT` `Pol(` `30` `,` `37.70` `)` → $r$ = **48.18** Ω lands in `X`, $\theta$ = **51.49**° lands in `Y`, i.e. $\mathbf{Z} = 48.18\angle51.5^\circ$ Ω.
>
> Angle unit Deg. Feed `Pol(` the rectangular pair $R$ then $X$, sign included.

### P3. Find the impedance of a series combination of $R = 40\,\Omega$ and $C = 50\,\mu\mathrm{F}$ at $60\,\mathrm{Hz}$.

**Given:** R = 40 Ω; C = 50 μF; f = 60 Hz

**Solution:**

1. omega = 376.99 rad/s
2. X_C = 1/(omega C) = 1/(376.99 x 50e-6) = 1/0.018850 = 53.05 Ω
3. Z = 40 - j53.05 Ω (capacitive reactance is negative)
4. |Z| = sqrt(1600 + 2814.3) = sqrt(4414.3) = 66.44 Ω
5. theta = arctan(-53.05/40) = -52.98 degrees, so Z = 66.44 angle -52.98 degrees Ω

> [!success]- Answer
> **$\mathbf{Z} = 40 - j53.05\,\Omega = 66.44\angle{-52.98^\circ}\,\Omega$**

> [!warning] Trap
> Writing $+jX_C$ for a capacitor. The capacitive impedance is $1/(j\omega C) = -j/(\omega C)$; the minus sign is what makes the current lead the voltage.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷(2π×60×50E-6)` → $X_C$ = **53.05** Ω, so $\mathbf{Z} = 40 - j53.05$ Ω.
> 2. `SHIFT` `Pol(` `40` `,` `−53.05` `)` → $r$ = **66.44** Ω, $\theta$ = **−52.98**°.
>
> Enter the reactance with its minus sign — that is what puts the angle in the fourth quadrant.

### P4. A $10\,\Omega$ resistor, a $50\,\mathrm{mH}$ inductor and a $100\,\mu\mathrm{F}$ capacitor are in parallel at $\omega = 200\,\mathrm{rad/s}$. Find the equivalent impedance.

**Given:** R = 10 Ω; L = 50 mH; C = 100 μF; omega = 200 rad/s; parallel

**Solution:**

1. Y_R = 1/10 = 0.1 S
2. Y_L = 1/(j(200)(0.05)) = 1/(j10) = -j0.1 S
3. Y_C = j(200)(100e-6) = j0.02 S
4. Y = 0.1 - j0.1 + j0.02 = 0.1 - j0.08 S
5. Z = 1/Y = (0.1 + j0.08)/(0.1^2 + 0.08^2) = (0.1 + j0.08)/0.0164
6. Z = 6.098 + j4.878 Ω, and |Z| = 1/|Y| = 1/sqrt(0.0164) = 7.808 Ω with angle +38.66 degrees

> [!success]- Answer
> **$\mathbf{Z} = 6.10 + j4.88\,\Omega = 7.81\angle{38.66^\circ}\,\Omega$**

> [!warning] Trap
> Adding the parallel impedances directly. Impedances in parallel require reciprocals: convert each branch to admittance, add, then invert. Note the result is inductive even though a capacitor is present, because $|X_L| > |X_C|$ here.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷10 : −1÷(200×0.05)+200×100E-6` → $G$ = **0.100** S → $B$ = **−0.0800** S, so $\mathbf{Y} = 0.1 - j0.08$ S.
> 2. `SHIFT` `Pol(` `0.1` `,` `−0.08` `)` → $\lvert \mathbf{Y} \rvert$ = **0.1281** S in `X`, $\angle\mathbf{Y}$ = **−38.66**° in `Y`.
> 3. `SHIFT` `Rec(` `1÷0.12806` `,` `38.66` `)` → $X$ = **6.10**, $Y$ = **4.88**, so $\mathbf{Z} = 6.10 + j4.88$ Ω $= 7.81\angle38.66^\circ$ Ω.
>
> Inverting an admittance negates its angle, so feed `Rec(` the magnitude $1/\lvert \mathbf{Y} \rvert$ and $+38.66^\circ$.

### P5. A series circuit has $R = 6\,\Omega$ and $X_L = 8\,\Omega$ and is driven by $\mathbf{V}_s = 100\angle0^\circ\,\mathrm{V\,rms}$. Find the current phasor.

**Given:** V_s = 100∠0° V rms; R = 6 Ω; X_L = 8 Ω; series

**Solution:**

1. Z = 6 + j8 Ω, |Z| = 10 Ω, angle = 53.13 degrees
2. I = V/Z = 100 angle 0 / 10 angle 53.13 = 10 angle -53.13 A
3. In rectangular form: 1/(6 + j8) = (6 - j8)/100, so I = (100)(6 - j8)/100 = 6 - j8 A
4. Check: |I| = sqrt(36 + 64) = 10 A ✓

> [!success]- Answer
> **$\mathbf{I} = 6 - j8\,\mathrm{A} = 10\angle{-53.13^\circ}\,\mathrm{A\,rms}$**

> [!warning] Trap
> Dividing only the magnitudes and keeping the source angle (10 A at 0 degrees). Division in the phasor domain subtracts the impedance angle, so the current lags by 53.13 degrees.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `Pol(` `6` `,` `8` `)` → $\lvert \mathbf{Z} \rvert$ = **10** Ω in `X`, $\angle\mathbf{Z}$ = **53.13**° in `Y`.
> 2. `SHIFT` `Rec(` `100÷X` `,` `−Y` `)` → $X$ = **6.00**, $Y$ = **−8.00**, so $\mathbf{I} = 6 - j8$ A $= 10\angle-53.13^\circ$ A.
>
> One `Pol(` then one `Rec(` does the whole division: divide the magnitudes, negate the impedance angle.

### P6. For the same series circuit ($R = 6\,\Omega$, $X_L = 8\,\Omega$, $\mathbf{I} = 6 - j8\,\mathrm{A}$), find the phasor voltage across the resistor and across the inductor, and verify KVL.

**Given:** I = 6 - j8 A; R = 6 Ω; Z_L = j8 Ω; V_s = 100∠0° V

**Solution:**

1. V_R = I R = (6 - j8)(6) = 36 - j48 V, magnitude 60 V
2. V_L = I (j8) = j48 + 64 = 64 + j48 V, magnitude 80 V
3. KVL: V_R + V_L = (36 + 64) + j(-48 + 48) = 100 + j0 = 100 angle 0 V ✓
4. Note that 60 + 80 = 140 V, which is NOT the 100 V source — the magnitudes do not add

> [!success]- Answer
> **$\mathbf{V}_R = 36 - j48\,\mathrm{V}$ ($60\,\mathrm{V}$) and $\mathbf{V}_L = 64 + j48\,\mathrm{V}$ ($80\,\mathrm{V}$); their phasor sum is the $100\,\mathrm{V}$ source**

> [!warning] Trap
> Adding 60 V and 80 V to 'check' against 100 V and then hunting for an arithmetic mistake. Series voltages add as phasors: $100 = \sqrt{60^2+80^2}$ only because these two are exactly 90 degrees apart.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `Pol(` `6` `,` `−8` `)` → $\lvert \mathbf{I} \rvert$ = **10** A in `X`, $\angle\mathbf{I}$ = **−53.13**° in `Y`.
> 2. `SHIFT` `Rec(` `6×X` `,` `Y` `)` → $X$ = **36**, $Y$ = **−48**, so $\mathbf{V}_R = 36 - j48$ V (60 V).
> 3. `SHIFT` `Rec(` `8×10` `,` `36.87` `)` → $X$ = **64**, $Y$ = **48**, so $\mathbf{V}_L = 64 + j48$ V (80 V); $36+64 = 100$ and $-48+48 = 0$ is the KVL check.
>
> Multiplying by $j$ adds $90^\circ$ to the angle: $-53.13^\circ + 90^\circ = 36.87^\circ$.

### P7. Combine $\mathbf{Z}_1 = 3 + j4\,\Omega$ and $\mathbf{Z}_2 = 6 - j8\,\Omega$ in series and in parallel.

**Given:** Z1 = 3 + j4 Ω; Z2 = 6 - j8 Ω

**Solution:**

1. Series: Z = (3 + 6) + j(4 - 8) = 9 - j4 Ω, |Z| = sqrt(81 + 16) = 9.849 Ω, angle = -23.96 degrees
2. Parallel: Z1 Z2 = (3 + j4)(6 - j8) = 18 - j24 + j24 - j^2(32) = 18 + 32 = 50 + j0
3. Z1 + Z2 = 9 - j4 Ω (the series result)
4. Z_parallel = 50/(9 - j4) = 50(9 + j4)/(81 + 16) = (450 + j200)/97
5. Z_parallel = 4.639 + j2.062 Ω = 5.077 angle 23.96 degrees Ω

> [!success]- Answer
> **Series $\mathbf{Z} = 9 - j4\,\Omega$; parallel $\mathbf{Z} = 4.64 + j2.06\,\Omega$**

> [!warning] Trap
> Using product-over-sum only for real resistors. The complex shortcut is identical in form but the product and sum must be done in complex arithmetic — and the two results (series and parallel) are never interchangeable.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3+6 : 4−8 : 3×6−4×−8 : 3×−8+4×6` → series $\mathbf{Z} = 9 - j4$ Ω → and $\mathbf{Z}_1\mathbf{Z}_2 = 50 + j0$.
> 2. `50×9÷(9²+4²) : 50×4÷(9²+4²)` → **4.639** and **2.062**, so the parallel result is $4.64 + j2.06$ Ω.
> 3. `SHIFT` `Pol(` `4.639` `,` `2.062` `)` → $\mathbf{Z}_{parallel}$ = **5.077** Ω at **23.96**°.
>
> Division by $c+jd$ is $[(ac+bd) + j(bc-ad)]/(c^2+d^2)$ — one line of real arithmetic, no complex mode needed.

### P8. Find the equivalent impedance of $\mathbf{Z}_1 = 6 + j8\,\Omega$ in parallel with $\mathbf{Z}_2 = 6 - j8\,\Omega$.

**Given:** Z1 = 6 + j8 Ω; Z2 = 6 - j8 Ω; parallel

**Solution:**

1. Z1 Z2 = (6 + j8)(6 - j8) = 36 + 64 = 100 + j0 (a conjugate product is real)
2. Z1 + Z2 = 12 + j0 Ω
3. Z_eq = 100/12 = 8.333 Ω, purely resistive
4. Cross-check with admittances: Y1 = (6 - j8)/100, Y2 = (6 + j8)/100, Y = 12/100 = 0.12 S, so Z = 8.333 Ω ✓

> [!success]- Answer
> **$\mathbf{Z}_{eq} = 8.333\,\Omega$ purely resistive**

> [!warning] Trap
> Reporting an impedance with an angle because the branch impedances had angles. Two conjugate impedances in parallel cancel their reactances exactly; the answer is real even though neither branch is.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `6²+8²` → **100**, the conjugate product $\mathbf{Z}_1\mathbf{Z}_2$, purely real.
> 2. `Ans÷(2×6)` → **8.333** Ω, since the sum $\mathbf{Z}_1+\mathbf{Z}_2 = 2R = 12$ Ω.
>
> For $R+jX$ in parallel with $R-jX$ the answer is always $(R^2+X^2)/(2R)$, with no angle at all.

### P9. A current phasor $\mathbf{I} = 10\angle{-53.13^\circ}\,\mathrm{A\,rms}$ flows at $\omega = 377\,\mathrm{rad/s}$. Write the time-domain expression using a cosine reference.

**Given:** I = 10∠-53.13° A rms; omega = 377 rad/s; cosine reference

**Solution:**

1. The phasor magnitude is RMS, so the time-domain amplitude is sqrt(2) x 10 = 14.14 A
2. The angle -53.13 degrees becomes the phase of the cosine
3. i(t) = 14.14 cos(377t - 53.13 degrees) A

> [!success]- Answer
> **$i(t) = 14.14\cos(377t - 53.13^\circ)\,\mathrm{A}$**

> [!warning] Trap
> Writing $10\cos(377t-53.13^\circ)$. An RMS phasor converts back with a $\sqrt{2}$ factor; omitting it understates the amplitude by 29%.

## Traps & Exam Notes

- **Sine and cosine references mixed.** $V_m\sin(\omega t+\varphi)$ converts to $V_m\angle(\varphi-90^\circ)$, not $V_m\angle\varphi$. Combining a sine-referenced source phasor with a cosine-referenced element phasor introduces a silent $90^\circ$ error that no arithmetic check will catch.
- **Using a peak phasor in a power calculation.** $S = \mathbf{V}\mathbf{I}^*$ requires RMS phasors. Peak phasors double the apparent power.
- **Sign of capacitive reactance.** $\mathbf{Z}_C = -j/(\omega C)$. Writing $+jX_C$ reverses the phase relationship and turns a leading current into a lagging one.
- **Adding impedance magnitudes.** Series impedances add as complex numbers: $|\mathbf{Z}_1+\mathbf{Z}_2| \neq |\mathbf{Z}_1|+|\mathbf{Z}_2|$ unless the angles are identical. Only pure resistances add arithmetically.
- **Adding series voltage magnitudes.** $|\mathbf{V}_R|+|\mathbf{V}_L| \neq |\mathbf{V}_s|$ in general. Voltages at 90 degrees combine as $\sqrt{V_R^2+V_L^2}$.
- **Adding parallel impedances directly.** Parallel branches need admittances (or product-over-sum). Branch impedances never add directly in parallel.
- **Ignoring the quadrant of the impedance angle.** $\tan^{-1}(X/R)$ is ambiguous by $180^\circ$; a negative $R$ (possible in a dependent-source network) puts the angle in the wrong half-plane.
- **Applying phasors to a transient or to two different frequencies.** Phasors only describe the sinusoidal steady state at one frequency. A switch event needs the full transient solution, and two sources at different frequencies must be superposed in the time domain.

## See Also

- [[01_Sinusoid,_RMS,_Average,_Form_and_Crest]]
- [[03_Series_and_Parallel_AC_Analysis]]
- [[05_AC_Power,_PQS_and_Triangle]]
- [[01_Complex_Numbers,_Euler_and_De_Moivre]]

---

[[01_Sinusoid,_RMS,_Average,_Form_and_Crest|⬅ 01]] · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Series_and_Parallel_AC_Analysis|03 ➡]]
