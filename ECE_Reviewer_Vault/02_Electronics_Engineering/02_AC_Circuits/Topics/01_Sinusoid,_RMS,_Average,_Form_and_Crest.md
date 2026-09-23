---
id: ECE-02-01
title: "Sinusoid, RMS, Average, Form and Crest"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Circuit_Variables,_Ohm’s_Law_and_Signs]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Sinusoid, RMS, Average, Form and Crest

> [!abstract] Scope
> Convert between peak, peak-to-peak, RMS and average values of periodic waveforms, and compute the form factor and crest factor that identify the waveform shape.

## Core Concept

> [!tip] Intuition
> A periodic waveform has several different 'sizes', and each one answers a different physical question: the peak is what insulation must withstand, the RMS is what a resistor actually heats with, and the average is what a DC meter or a battery charger delivers. For a sine these three numbers are fixed multiples of each other, so a single reading pins down the whole waveform.

**The four sine parameters.** A sinusoid is fixed by amplitude, angular frequency and phase. The standard form is:
$$v(t) = V_m\sin(\omega t + \varphi)$$
where $V_m$ is the amplitude, $\omega = 2\pi f = 2\pi/T$ is the angular frequency and $\varphi$ is the phase. The peak-to-peak value is twice the amplitude, not the amplitude itself: $2V_m = V_{pp}$. The period and frequency are reciprocals, $T = 1/f$. Phase is only meaningful as a *difference*: $v_1$ leads $v_2$ when $\varphi_1 > \varphi_2$, and the lead in time is:
$$\Delta t = \Delta\varphi/\omega$$
A sine and a cosine of the same frequency differ by exactly $90^\circ$, which gives the conversion:
$$\cos\omega t = \sin(\omega t + 90^\circ)$$
Converting between the two is the most common source of sign errors in phasor work.

**RMS is the heating-equivalent DC value.** The definition, which is why it is also called the effective value, is:
$$V_{rms} = \sqrt{\frac{1}{T}\int_0^T v^2\,dt}$$
A resistor dissipates the same average power $P = V_{rms}^2/R$ from a DC source of that value. For a pure sine the integral gives:
$$V_{rms} = V_m/\sqrt{2} = 0.7071V_m$$
For a *symmetric* triangle or sawtooth it gives:
$$V_m/\sqrt{3} = 0.5774V_m$$
The physics behind the different constants is the shape of $v^2$: squaring a sine produces a raised cosine that spends its time near the average, while squaring a triangle produces a parabola weighted toward the tips. Meter settings matter here — a "true-RMS" meter computes the integral for any shape, but a cheap averaging meter is calibrated on sines and reads a triangle or a rectified wave incorrectly.

**Average value is the DC component, and it is zero for most AC.** It is defined as:
$$V_{avg} = \frac{1}{T}\int_0^T v\,dt$$
For any symmetric wave with equal positive and negative lobes it is exactly zero, so reporting "the average value of a sine" as $2V_m/\pi$ is wrong unless the wave has been rectified. The figure $2V_m/\pi = 0.6366V_m$ is the average of a **full-wave rectified** sine (the mean of $|v|$), and a half-wave rectified sine averaged over a whole period is half of that, $V_m/\pi = 0.3183V_m$. Watch the interval as well: the average of a sine over a *half* cycle is $2V_m/\pi$ even without rectification, because you integrated only where the wave is positive.

**Form factor and crest factor are shape fingerprints.** Their definitions are:
$$F_F = V_{rms}/V_{avg}$$
and the crest (peak) factor is $F_C = V_m/V_{rms}$. Both are dimensionless and both depend only on shape, never on amplitude or frequency, so they are the fast way to identify an unknown waveform and the fast way to catch a wrong RMS. For a pure sine $F_F = 0.7071/0.6366 = 1.11$ and $F_C = \sqrt{2} = 1.414$; for a half-wave rectified sine $F_F = 1.57$ and $F_C = 2$; for a full-wave rectified sine $F_F = 1.11$ and $F_C = 1.414$ (identical to the sine, since rectification does not change the heating); for a $50\%$ duty unipolar square pulse train (0 to $V_m$) $F_F = \sqrt{2} = 1.414$ and $F_C = \sqrt{2} = 1.414$, while the bipolar $\pm V_m$ square has $V_{rms} = V_m$, a zero average, no form factor at all, and $F_C = 1$.

**Square and triangle waves, and how to handle a DC offset.** A square wave alternating between $+V_m$ and $-V_m$ has $V_{rms} = V_m$ because $v^2 = V_m^2$ at every instant — no integral needed. A symmetric triangle has $V_{rms} = V_m/\sqrt{3}$. When a waveform is a DC level plus a zero-mean AC ripple, do **not** add the RMS values: the RMS of the sum is the root-sum-square:
$$I_{rms} = \sqrt{I_{dc}^2 + I_{ac,rms}^2}$$
— the average is just the DC part. Adding $3\ \mathrm{A}$ and $2.83\ \mathrm{A}$ to get $5.83\ \mathrm{A}$ instead of $\sqrt{9+8} = 4.12\ \mathrm{A}$ is the classic error, and it inflates every power calculation that follows.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Sinusoid in the time domain | $v(t) = V_m\sin(\omega t + \varphi)$ | V_m is the amplitude (peak), not the peak-to-peak value. A cosine is the same family with a 90-degree phase shift. |
| Angular frequency and period | $\omega = 2\pi f = \frac{2\pi}{T}$ | omega is rad/s in every phasor or reactance formula; f in Hz and T in seconds. Converting 60 Hz to 377 rad/s is the standard first step of an AC problem. |
| Peak-to-peak value | $V_{pp} = 2V_m$ | Twice the amplitude. Given V_pp, halve it before using any RMS formula; using V_pp as V_m doubles every downstream answer. |
| RMS of a pure sine | $V_{rms} = \frac{V_m}{\sqrt{2}} = 0.7071\,V_m$ | Only for a sine with zero average. Inverting gives the peak from the usual 230 V or 120 V mains RMS value. |
| RMS of a symmetric triangle or sawtooth | $V_{rms} = \frac{V_m}{\sqrt{3}} = 0.5774\,V_m$ | Symmetric about zero. For a triangle of peak-to-peak V_pp the amplitude is V_pp/2 first, then divide by root 3. |
| Average of a full-wave rectified sine | $V_{avg} = \frac{2V_m}{\pi} = 0.6366\,V_m$ | Mean of the absolute value over one period. The average of a plain (unrectified) sine over a full period is zero. |
| Average of a half-wave rectified sine | $V_{avg} = \frac{V_m}{\pi} = 0.3183\,V_m$ | Averaged over the full period; the conducting half contributes V_m*T/pi and the blocked half contributes nothing. |
| RMS of a half-wave rectified sine | $V_{rms} = \frac{V_m}{2} = 0.5\,V_m$ | Because the square is nonzero only half the time: V_m^2/2 averaged over the period, then square-rooted. It is not V_m/root-2. |
| Form factor | $F_F = \frac{V_{rms}}{V_{avg}}$ | Shape only; 1.11 for a sine or full-wave rectified sine, 1.57 for half-wave, 1.155 for a triangle, 1.414 for a 50% unipolar square pulse train. Requires a nonzero average, so it is undefined for a bipolar square or a pure sine over a full period. |
| Crest (peak) factor | $F_C = \frac{V_m}{V_{rms}}$ | 1.414 for a sine or a 50% unipolar square pulse train, 2 for a half-wave rectified sine, 1 for a bipolar square (where V_rms = V_m), 1.732 for a triangle. Well defined for any waveform, including one with zero average. |
| DC plus ripple | $X_{rms} = \sqrt{X_{dc}^2 + X_{ac,rms}^2}, \qquad X_{avg} = X_{dc}$ | RMS values combine in quadrature, never by direct addition, when the components are independent (orthogonal). The average keeps only the DC term. |

## Worked Problems

### P1. A voltage is described as $169.7\ \mathrm{V}$ RMS at $60\ \mathrm{Hz}$, written as $v(t) = V_m\sin(\omega t)$. Find the peak value, the peak-to-peak value, the angular frequency and the period, then evaluate $v$ at $t = 4.63\ \mathrm{ms}$.

**Given:** $V_{rms} = 169.7\ \mathrm{V}$; $f = 60\ \mathrm{Hz}$; $\varphi = 0$; $t = 4.63\ \mathrm{ms}$

**Solution:**

1. Peak value: $V_m = \sqrt{2}\,V_{rms} = 1.4142(169.7) = 240.0\ \mathrm{V}$.
2. Peak-to-peak: $V_{pp} = 2V_m = 2(240.0) = 480.0\ \mathrm{V}$.
3. Angular frequency: $\omega = 2\pi f = 2\pi(60) = 376.99\ \mathrm{rad/s}$.
4. Period: $T = 1/f = 1/60 = 16.67\ \mathrm{ms}$.
5. Phase argument at $t = 4.63\ \mathrm{ms}$: $\omega t = 376.99(4.63\times10^{-3}) = 1.7455\ \mathrm{rad}$, which is $100.0^\circ$.
6. $v = 240.0\sin(100.0^\circ) = 240.0(0.9848) = 236.4\ \mathrm{V}$.
7. Check: $4.63\ \mathrm{ms}$ is slightly past the quarter-period peak at $T/4 = 4.167\ \mathrm{ms}$, so the instantaneous value should be just below the peak of $240\ \mathrm{V}$ — it is.

> [!success]- Answer
> **$V_m = 240.0\ \mathrm{V}$, $V_{pp} = 480.0\ \mathrm{V}$, $\omega = 377\ \mathrm{rad/s}$, $T = 16.67\ \mathrm{ms}$, and $v(4.63\ \mathrm{ms}) = 236.4\ \mathrm{V}$**

> [!warning] Trap
> Multiplying the RMS value by $\sqrt{2}$ twice, or reading $V_{rms}$ as the amplitude so that $v = 169.7\sin(\omega t)$. The $\sqrt{2}$ factor is the only bridge between heating value and peak value, and it applies once: $V_m = \sqrt{2}V_{rms}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `169.7×√2 : Ans×2 : 2π×60 : 1÷60` — chain with `ALPHA` `:`, `=` down the line: $V_m$ = **240.0** V → $V_{pp}$ = **480.0** V → $\omega$ = **377.0** rad/s → $T$ = **16.67** ms.
> 2. Angle unit Deg: `376.991×4.63E-3 : Ans×180÷π : 240×sin(Ans)` → **1.7455** rad → **100.0**° → $v$ = **236.4** V.
>
> `Ans×180÷π` is the radian-to-degree conversion; in Rad mode skip it and key `240×sin(376.991×4.63E-3)`.

### P2. A full-wave bridge rectifier produces $v(t) = |100\sin(377t)|\ \mathrm{V}$ across a load. Find the average value, the RMS value, the form factor and the crest factor of this waveform.

**Given:** $V_m = 100\ \mathrm{V}$; $\omega = 377\ \mathrm{rad/s}$; full-wave rectified sine

**Solution:**

1. Average of a full-wave rectified sine: $V_{avg} = \dfrac{2V_m}{\pi} = \dfrac{2(100)}{3.1416} = 63.66\ \mathrm{V}$.
2. RMS of a full-wave rectified sine: rectification does not change the heating, so $V_{rms} = \dfrac{V_m}{\sqrt{2}} = 70.71\ \mathrm{V}$.
3. Form factor: $F_F = \dfrac{V_{rms}}{V_{avg}} = \dfrac{70.71}{63.66} = 1.111$.
4. Crest factor: $F_C = \dfrac{V_m}{V_{rms}} = \dfrac{100}{70.71} = 1.414$.
5. Both factors match the pure-sine values, confirming the general rule that a full-wave rectifier is a shape-preserving operation for these metrics.
6. Check on the ripple: the AC component is $V_{ac} = \sqrt{V_{rms}^2 - V_{avg}^2} = \sqrt{5000 - 4053} = 30.8\ \mathrm{V}$ RMS, a ripple factor of $30.8/63.66 = 0.484 = 48.4\%$, the textbook value for an unfiltered full-wave rectifier.

> [!success]- Answer
> **$V_{avg} = 63.66\ \mathrm{V}$, $V_{rms} = 70.71\ \mathrm{V}$, $F_F = 1.111$, $F_C = 1.414$**

> [!warning] Trap
> Using $V_{avg} = V_m/\pi = 31.83\ \mathrm{V}$ for a full-wave rectified wave. That halved value belongs to the half-wave rectifier, where half of every period contributes nothing to the integral.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×100÷π : 100÷√2 : Ans÷63.662 : 100÷70.711` → $V_{avg}$ = **63.66** V → $V_{rms}$ = **70.71** V → $F_F$ = **1.111** → $F_C$ = **1.414**.
> 2. `√(70.711²−63.662²)` → the AC ripple $V_{ac}$ = **30.78** V rms, the standard unfiltered full-wave figure (≈48 % of $V_{avg}$).

### P3. A half-wave rectified sine has a peak of $240\ \mathrm{V}$. Compute its average and RMS values over a full period, then its form factor and crest factor.

**Given:** $V_m = 240\ \mathrm{V}$; half-wave rectified sine

**Solution:**

1. Average over the full period: only one half conducts, so $V_{avg} = \dfrac{V_m}{\pi} = \dfrac{240}{3.1416} = 76.39\ \mathrm{V}$ (equivalently half of $2V_m/\pi$).
2. RMS: the square is $V_m^2\sin^2$ for half the period and zero for the other half, so $V_{rms}^2 = \tfrac{1}{2}\cdot\tfrac{V_m^2}{2}$, giving $V_{rms} = \dfrac{V_m}{2} = 120.0\ \mathrm{V}$.
3. Form factor: $F_F = \dfrac{120.0}{76.39} = 1.571$.
4. Crest factor: $F_C = \dfrac{240}{120.0} = 2.000$.
5. Check with the standard identities: $F_F = \pi/2 = 1.571$ and $F_C = 2$ for a half-wave rectified sine in every case, independent of the amplitude — our numbers reproduce both exactly.

> [!success]- Answer
> **$V_{avg} = 76.39\ \mathrm{V}$, $V_{rms} = 120.0\ \mathrm{V}$, $F_F = 1.571$, $F_C = 2.000$**

> [!warning] Trap
> Reporting $V_{rms} = V_m/\sqrt{2} = 169.7\ \mathrm{V}$ for a half-wave rectified sine. Halving the duty cycle halves the mean square, so the RMS divides by 2, not by $\sqrt{2}$ — the difference is a factor of $\sqrt{2}$ and it propagates straight into every power calculation.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `240÷π : 240÷2` → $V_{avg}$ = **76.39** V → $V_{rms}$ = **120.0** V.
> 2. `Ans÷76.394 : 240÷120` → $F_F$ = **1.571** (= $\pi/2$) → $F_C$ = **2.000**.
>
> Both factors are amplitude-independent: the chain reproduces the shape constants, so any peak gives the same 1.571 and 2.000.

### P4. A current through a heating element is $i(t) = 3 + 4\sin(\omega t)\ \mathrm{A}$. Find the average value, the RMS value, the form factor and the crest factor as seen by the element.

**Given:** DC component $I_{dc} = 3\ \mathrm{A}$; AC amplitude $= 4\ \mathrm{A}$; $i(t) = 3 + 4\sin(\omega t)\ \mathrm{A}$

**Solution:**

1. Average value: the sine averages to zero over a period, so $I_{avg} = I_{dc} = 3.000\ \mathrm{A}$.
2. RMS of the AC part: $I_{ac} = \dfrac{4}{\sqrt{2}} = 2.828\ \mathrm{A}$.
3. Combine in quadrature (the DC and AC components are orthogonal): $I_{rms} = \sqrt{3^2 + 2.828^2} = \sqrt{9 + 8} = \sqrt{17} = 4.123\ \mathrm{A}$.
4. Form factor: $F_F = \dfrac{4.123}{3.000} = 1.374$.
5. Crest factor: the peak is $3 + 4 = 7\ \mathrm{A}$, so $F_C = \dfrac{7}{4.123} = 1.698$.
6. Note both factors sit between the pure-sine values and the DC-only values ($F_F = F_C = 1$), which is the correct trend as the DC offset grows.

> [!success]- Answer
> **$I_{avg} = 3.00\ \mathrm{A}$, $I_{rms} = 4.12\ \mathrm{A}$, $F_F = 1.374$, $F_C = 1.698$**

> [!warning] Trap
> Adding the RMS values directly to get $I_{rms} = 3 + 2.828 = 5.83\ \mathrm{A}$, which would overstate the heating by $100\%$. RMS values of orthogonal components combine as the root-sum-square; only instantaneous values add directly.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4÷√2 : √(9+Ans²)` → $I_{ac}$ = **2.828** A → $I_{rms}$ = **4.123** A.
> 2. `Ans÷3 : 7÷4.123` → $F_F$ = **1.374** → $F_C$ = **1.698**.
>
> The square root of the sum, `√(9+Ans²)`, is the quadrature combination — keying `3+2.828` gives the trap answer 5.83 A.

### P5. A symmetric triangular voltage wave alternates between $+50\ \mathrm{V}$ and $-50\ \mathrm{V}$ with a period of $2\ \mathrm{ms}$. Find its RMS value, its average over one full period, its average over one half period, its form factor referred to the half-period average, and its crest factor.

**Given:** $V_m = 50\ \mathrm{V}$; $T = 2\ \mathrm{ms}$; symmetric triangle, zero mean

**Solution:**

1. RMS of a symmetric triangle: $V_{rms} = \dfrac{V_m}{\sqrt{3}} = \dfrac{50}{1.7321} = 28.87\ \mathrm{V}$.
2. Average over a full period: the positive and negative lobes cancel exactly, so $V_{avg} = 0\ \mathrm{V}$.
3. Average over a half period (one lobe): a symmetric triangle ramps linearly to the peak and back, so its mean is $\dfrac{V_m}{2} = 25.0\ \mathrm{V}$.
4. Form factor using the half-period average: $F_F = \dfrac{28.87}{25.0} = 1.155$ (the standard value for a triangle; with a zero denominator the full-period form factor is undefined).
5. Crest factor: $F_C = \dfrac{50}{28.87} = 1.732 = \sqrt{3}$.
6. Check the frequency: $f = 1/T = 500\ \mathrm{Hz}$, which does not appear in any of the above — consistent with the fact that both factors are shape-only quantities.

> [!success]- Answer
> **$V_{rms} = 28.87\ \mathrm{V}$, $V_{avg} = 0\ \mathrm{V}$ over a full period (25.0 V over a half period), $F_F = 1.155$, $F_C = 1.732$**

> [!warning] Trap
> Writing $F_F = V_{rms}/V_{avg}$ with $V_{avg} = 0$ and then claiming the form factor is zero, or dividing by zero and reporting 1.11 from memory. A zero-average waveform has no full-period form factor at all; quote the half-period average, or use the crest factor, which is always defined.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `50÷√3 : 50÷2` → $V_{rms}$ = **28.87** V → half-period average **25.0** V (full-period average **0** V).
> 2. `28.868÷25 : 50÷28.868` → $F_F$ = **1.155** → $F_C$ = **1.732** $= \sqrt{3}$.

## Traps & Exam Notes

- **Using peak-to-peak where amplitude belongs.** The RMS relation is $V_{rms} = V_m/\sqrt{2}$ with $V_m$ the amplitude. Substituting $V_{pp} = 480\ \mathrm{V}$ for a 240 V peak gives $339\ \mathrm{V}$ RMS, double the correct value and therefore four times too much power in every calculation downstream.
- **Reporting $2V_m/\pi$ as the average value of an unrectified sine.** Over a full period a symmetric sine averages to exactly zero; $2V_m/\pi = 0.6366V_m$ is the average of the *absolute* value (full-wave rectified) and $V_m/\pi$ is the half-wave figure. The interval of integration decides which formula is legal.
- **Applying $V_m/\sqrt{2}$ to a non-sinusoidal wave.** A symmetric triangle gives $V_m/\sqrt{3}$, a half-wave rectified sine gives $V_m/2$, and a bipolar square gives $V_m$. The $\sqrt{2}$ is a property of the sine's shape, not a universal constant.
- **Adding RMS values that should combine in quadrature.** For $i = I_{dc} + i_{ac}$ the correct result is $\sqrt{I_{dc}^2 + I_{ac}^2}$; direct addition of $3\ \mathrm{A}$ and $2.83\ \mathrm{A}$ to get $5.83\ \mathrm{A}$ instead of $4.12\ \mathrm{A}$ overstates the heating current by 41%.
- **Treating phase as an absolute quantity.** Phase has meaning only as a difference; $\varphi = 30^\circ$ alone tells you nothing. When comparing two sinusoids, subtract the phase angles, and remember that a larger phase angle means that wave *leads*, not lags.
- **Confusing degrees and radians in $\omega t$.** $\omega$ is always in rad/s, so $\omega t$ comes out in radians and must be converted before evaluating a sine with a calculator in degree mode — a $100^\circ$ argument entered as 100 rad gives a completely different instantaneous value.
- **Computing form factor on a zero-average waveform.** The definition $F_F = V_{rms}/V_{avg}$ needs a nonzero average; for a symmetric triangle, a square wave or a raw sine over a full period the denominator is zero and the quantity does not exist. Use the crest factor there instead.

## See Also

- [[02_Phasors_and_Complex_Impedance]]
- [[05_AC_Power,_PQS_and_Triangle]]
- [[10_Three-Phase_Power_and_Two-Wattmeter]]

---

⬅ *start* · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Phasors_and_Complex_Impedance|02 ➡]]
