---
id: EST-01-12
title: "FIR vs IIR Filters"
part: "04_EST"
area: "01_Signals_Spectra_and_Noise"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[11_DFT_and_FFT]]"]
tags: ["ece", "est", "signals_spectra_and_noise"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — FIR vs IIR Filters

> [!abstract] Scope
> Choose between FIR and IIR digital filters on stability, phase linearity, order and cost, and estimate the filter length a specification demands.

## Core Concept

> [!tip] Intuition
> An FIR filter is a weighted moving average: it can only forget, so it can never blow up, and a symmetric average delays every frequency by the same amount. An IIR filter feeds its own output back, which buys sharpness with far fewer taps but can ring, drift, or oscillate.

**The structural difference.** An FIR filter computes $y[n] = \sum_{k=0}^{M} b_k x[n-k]$: the output depends only on present and past inputs, so its transfer function $H(z) = \sum_k b_k z^{-k}$ has all its poles at the origin and it is **unconditionally stable**. An IIR filter adds feedback, $y[n] = \sum_k b_k x[n-k] - \sum_k a_k y[n-k]$, giving $H(z) = \frac{\sum b_k z^{-k}}{1 + \sum a_k z^{-k}}$ with poles that must lie strictly inside the unit circle for stability. That single difference drives every other trade-off in this topic: feedback lets a few poles shape a sharp response, and it is exactly what makes the filter potentially unstable.

**Linear phase: the FIR's unique selling point.** If the impulse response is symmetric, $h[n] = h[M-n]$ (or antisymmetric), the FIR has exactly linear phase and therefore a **constant group delay** of $(M)/2$ samples across the whole passband. No causal IIR filter has exactly linear phase; its group delay varies with frequency, which smears the shape of a pulse or a digital symbol. For audio mastering, pulse-shaping, radar matched filtering and any application where waveform fidelity matters, this makes the FIR the only choice, and it is the reason an FIR's high order is often accepted as the price of admission.

**Order and cost: what feedback buys.** To meet the same magnitude specification, an IIR filter derived from an analog prototype (Butterworth, Chebyshev, elliptic) typically needs an order an order of magnitude or more smaller than an FIR. A concrete case: 60 dB of attenuation one fifth of an octave past the passband edge needs about 110 FIR taps but only about 38 poles for a Butterworth IIR, and about 7 for an elliptic — because the IIR places poles near the unit circle to create a sharp transition, while the FIR must build the same skirt from many zeros. The cost is paid in phase distortion, sensitivity to coefficient quantisation (poles close to the unit circle move easily and can even migrate outside it in fixed-point arithmetic), and the possibility of limit cycles and overflow oscillation.

**Estimating the FIR length.** A specification gives a passband edge, a stopband edge, and a required attenuation $A$ in dB. The transition width is $\Delta f = f_{stop}-f_{pass}$, and the Kaiser/Hamming rule of thumb gives $N \approx \dfrac{A}{22\,\Delta f/f_s}$ taps for a Hamming-window design (the constant is about 14.36 for a Kaiser window when the passband ripple is small). Note how everything scales: a narrower transition band or a larger attenuation makes $N$ grow linearly, while the sampling rate dilutes the requirement because $\Delta f$ is measured relative to $f_s$. This is why decimating to the lowest workable rate before filtering is a standard trick — it cuts the required order directly.

**Stability, quantisation and practical behaviour.** FIR filters are stable, have no feedback path to accumulate error, and (with symmetric coefficients) can implement exactly linear phase in fixed point. Their round-off error stays bounded and no limit cycles exist. IIR filters must be checked for pole locations after quantisation: a design with poles at $r = 0.999$ can land outside the unit circle when coefficients are rounded to 16 bits, and even inside they ring for a long time after a transient. Direct-form implementations of high-order IIR filters are numerically fragile, so second-order sections (biquads) in cascade are used in practice. The exam takeaway: choose IIR for cheap, sharp magnitude-only filtering where phase does not matter, and FIR when linear phase, guaranteed stability, or exact reproducibility matters.

**Design routes and their fingerprints.** FIR designs come from windows (simple, predictable, needs high order), frequency sampling (convenient for arbitrary shapes, poor transition behaviour), and optimal equiripple methods (Parks-McClellan/Remez, minimum order for a given ripple, the standard CAD approach). IIR designs come from analog prototypes transformed by the bilinear transform $s = \frac{2}{T}\frac{1-z^{-1}}{1+z^{-1}}$, which maps the whole $j\Omega$ axis onto the unit circle and therefore avoids aliasing but warps frequency, so critical frequencies must be **pre-warped** with $\Omega = \frac{2}{T}\tan(\omega/2)$. Forgetting the pre-warp is the classic IIR design error: a specified 3 dB cutoff lands somewhere else, most visibly near Nyquist.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| FIR difference equation | $y[n] = \sum_{k=0}^{M} b_k\, x[n-k]$ | No feedback. Order M, length M+1 taps. Always stable. |
| IIR difference equation | $y[n] = \sum_{k=0}^{M} b_k x[n-k] - \sum_{k=1}^{N} a_k y[n-k]$ | Feedback terms make the response sharp but conditional on pole placement. |
| Transfer functions | $H_{FIR}(z) = \sum_{k} b_k z^{-k}, \qquad H_{IIR}(z) = \frac{\sum_k b_k z^{-k}}{1 + \sum_k a_k z^{-k}}$ | FIR poles all at z = 0; IIR poles set by the denominator polynomial. |
| Stability criterion | $\mathrm{IIR\ stable} \iff \lvert z_p \rvert < 1 \ \mathrm{for\ all\ poles}$ | FIR is unconditionally stable since all poles are at the origin. |
| Exact linear phase condition | $h[n] = \pm h[M-n]$ | Symmetry (even or odd) gives linear phase; no causal IIR filter has it exactly. |
| Group delay of a linear-phase FIR | $\tau_g = \frac{M}{2}\ \mathrm{samples} = \frac{M}{2 f_s}\ \mathrm{seconds}$ | Constant across frequency. M is the filter order, so length M+1. |
| FIR order estimate (Kaiser/Hamming) | $N \approx \frac{A}{22\,\Delta f / f_s}, \qquad \Delta f = f_{stop} - f_{pass}$ | A in dB. Rounds up; add 1 if the order must be even for a type-II design. |
| Tighter Kaiser estimate | $N \approx \frac{A - 7.95}{14.36\,\Delta f / f_s}$ | Use when the passband ripple is small; gives a slightly different constant from the Hamming rule. |
| Bilinear transform | $s = \frac{2}{T}\,\frac{1 - z^{-1}}{1 + z^{-1}}$ | Maps the analog j-omega axis onto the unit circle; no aliasing but frequency warping. |
| Pre-warping of critical frequencies | $\Omega = \frac{2}{T}\tan\!\left(\frac{\omega}{2}\right)$ | Required so the specified digital cutoff is met; the error is largest near Nyquist. |
| Order comparison rule of thumb | $N_{IIR} \ll N_{FIR} \ \mathrm{for\ the\ same\ magnitude\ spec}$ | Butterworth can need 1/3 the order, elliptic 1/15 or less; the FIR pays for linear phase. |
| Cascade form for IIR implementation | $H(z) = \prod_i \frac{b_{0i} + b_{1i}z^{-1} + b_{2i}z^{-2}}{1 + a_{1i}z^{-1} + a_{2i}z^{-2}}$ | Second-order sections avoid the numerical fragility of high-order direct forms. |

## Worked Problems

### P1. An FIR lowpass must have a $200\ \mathrm{Hz}$ transition width and $60\ \mathrm{dB}$ of stopband attenuation at a sampling rate of $8\ \mathrm{kHz}$. Estimate the number of taps.

**Given:** A = 60 dB; df = 200 Hz; fs = 8 kHz

**Solution:**

1. Normalised transition width: df/fs = 200/8000 = 0.025
2. N = A/(22 x df/fs) = 60/(22 x 0.025) = 60/0.55
3. N = 109.1 taps
4. Round up to N = 110 (use 111 for an odd-length symmetric type-I design)

> [!success]- Answer
> **N ≈ 110 taps.**

> [!warning] Trap
> Forgetting to normalise the transition width by fs and computing 60/(22 x 200) = 0.014 taps. The estimate uses the *fractional* transition width df/fs, which is why higher sampling rates make FIR filters longer for the same absolute transition band.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `200÷8000` → **0.025** = the normalised transition width $\Delta f/f_s$.
> 2. `60÷(22×0.025)` → **109.1** taps.
> 3. Round up to $N$ = **110** (or **111** for an odd-length symmetric type-I design).
>
> The estimate needs $\Delta f/f_s$; keying 60/(22×200) = 0.014 taps is the trap in the note.

### P2. A linear-phase FIR lowpass has $101$ taps and runs at $f_s = 8\ \mathrm{kHz}$. Find its group delay in samples, in milliseconds, and in degrees at $1\ \mathrm{kHz}$.

**Given:** N = 101 taps; fs = 8 kHz; f = 1 kHz

**Solution:**

1. Order M = N - 1 = 100
2. Group delay = M/2 = 50 samples
3. In time: 50/8000 = 6.25 ms
4. Phase shift at 1 kHz = 360 x f x delay = 360 x 1000 x 6.25e-3 = 2250 degrees, i.e. 6.25 cycles of phase delay

> [!success]- Answer
> **50 samples = 6.25 ms, corresponding to 2250 degrees at 1 kHz (linear in frequency).**

> [!warning] Trap
> Using N/2 = 50.5 samples instead of (N-1)/2. The group delay of a symmetric length-N filter is (N-1)/2 samples; for odd N = 101 that is exactly 50, and the half-sample ambiguity is why odd-length type-I designs are preferred.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(101-1)÷2` → **50** samples group delay (order $M$ = $N-1$, not $N$).
> 2. `50÷8000` → **6.25E-3** s = **6.25** ms.
> 3. `360×1000×6.25E-3` → **2250**° at 1 kHz, i.e. 6.25 cycles of phase delay.
>
> $N/2$ = 50.5 samples is the trap; a symmetric length-$N$ FIR delays by $(N-1)/2$.

### P3. Three IIR filters have poles at (a) $z = 0.95$, (b) $z = 1.05$, (c) $z = -0.8 \pm j0.5$. Which are stable?

**Given:** poles at 0.95, 1.05, -0.8 +/- j0.5

**Solution:**

1. (a) |0.95| < 1, stable
2. (b) |1.05| > 1, unstable - the impulse response grows without bound
3. (c) |z| = sqrt(0.8^2 + 0.5^2) = sqrt(0.64 + 0.25) = sqrt(0.89) = 0.943 < 1, stable
4. The complex pair is stable but close to the unit circle, so it rings at the frequency corresponding to its angle

> [!success]- Answer
> **(a) stable, (b) unstable, (c) stable (|z| = 0.943).**

> [!warning] Trap
> Judging stability from the real part alone. For complex poles it is the *magnitude* sqrt(Re^2 + Im^2) that must be below 1; a pole pair at -0.8 +/- j0.5 has magnitude 0.943 and is stable.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(0.8²+0.5²)` → **0.9434** = $\lvert z_p\rvert$ of the $-0.8\pm j0.5$ pair (or `SHIFT` `Pol(-0.8, 0.5)` → $r$ = **0.9434**).
> 2. `0.95-1 : 1.05-1 : 0.9434-1` → **-0.05** → **+0.05** → **-0.0566**: only the second pole has a positive margin.
>
> The test is whether $\lvert z_p\rvert-1$ is negative; the real part -0.8 on its own is not the magnitude.

### P4. For a $60\ \mathrm{dB}$ stopband attenuation with a transition ratio $f_{stop}/f_{pass} = 1.2$, estimate the order needed by (a) a Butterworth IIR and (b) the FIR rule of thumb above with $f_s$ chosen so the normalised transition width is 0.02. Compare.

**Given:** A = 60 dB; fstop/fpass = 1.2; FIR: df/fs = 0.02

**Solution:**

1. (a) Butterworth: |H|^2 = 1/(1 + (f/fc)^(2n)), need 10^(-6) at f/fc = 1.2
2. 1.2^(2n) = 1e6 - 1, so 2n log10(1.2) = 6
3. log10(1.2) = 0.07918, so n = 6/(2 x 0.07918) = 37.9, i.e. n = 38
4. (b) FIR: N = 60/(22 x 0.02) = 136 taps
5. Ratio: the FIR needs about 136 coefficients against 38 for the IIR, roughly 3.6x

> [!success]- Answer
> **Butterworth IIR ≈ 38th order; FIR ≈ 136 taps — about 3.6x more coefficients (and an elliptic IIR would need only a handful).**

> [!warning] Trap
> Assuming the IIR is always cheaper in *every* sense. It is cheaper in multiplies, but it has frequency-dependent group delay, is sensitive to coefficient rounding at 38th order, and must be implemented as cascaded biquads. If linear phase is required, the FIR is the only option.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Butterworth: `log(1E6-1)÷(2×log(1.2))` → **37.89**, so $n$ = **38**.
> 2. FIR rule of thumb: `60÷(22×0.02)` → **136** taps.
> 3. `136÷38` → **3.58**x more coefficients for the FIR (an elliptic IIR would need far fewer).
>
> `log` is base 10 and the numerator is $\log_{10}(10^6-1)$; 6/(2×0.07918) gives the same 37.9 by hand.

### P5. An FIR lowpass has coefficients $h = \{0.1,\ 0.2,\ 0.4,\ 0.2,\ 0.1\}$. Determine whether it has linear phase, its group delay in samples, and its DC gain.

**Given:** h = [0.1, 0.2, 0.4, 0.2, 0.1]; fs arbitrary

**Solution:**

1. Check symmetry: h[0] = h[4] = 0.1, h[1] = h[3] = 0.2, h[2] = 0.4, so h[n] = h[M-n] with M = 4
2. Symmetry means the phase response is exactly linear
3. Group delay = M/2 = 2 samples, constant at all frequencies
4. DC gain = sum of coefficients = 0.1 + 0.2 + 0.4 + 0.2 + 0.1 = 1.0, so this filter already has unity DC gain

> [!success]- Answer
> **Linear phase (symmetric), group delay 2 samples, DC gain 1.0.**

> [!warning] Trap
> Using N/2 = 2.5 samples for the group delay, or reading the largest coefficient (0.4) as the DC gain. The filter has 5 taps, so the delay is (N-1)/2 = 2 samples and the DC gain is the sum of the coefficients.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.1+0.2+0.4+0.2+0.1` → **1.0** = DC gain ($H$ at $z$ = 1, the sum of the coefficients).
> 2. `(5-1)÷2` → **2** samples group delay; $h[0]$ = $h[4]$ and $h[1]$ = $h[3]$ confirm the symmetry.
>
> Using $N/2$ = 2.5 samples, or reading 0.4 as the DC gain, are the two traps in the note.

## Traps & Exam Notes

- **Treating an IIR filter's stability as automatic.** Only FIR filters are unconditionally stable. An IIR is stable if and only if **every** pole satisfies $|z_p|<1$; a coefficient rounding that pushes one pole outside the circle turns a working filter into an oscillator.
- **Judging stability from the real part of a complex pole.** Use the magnitude $\sqrt{\sigma^2+\omega^2}$. A pole at $-0.8\pm j0.5$ has magnitude 0.943 and is stable even though its real part looks large in magnitude.
- **Expecting linear phase from an IIR filter.** No causal IIR has exactly linear phase; its group delay varies with frequency and a pulse's shape is distorted even when the magnitude response is perfect. If the exam asks for constant group delay, the answer is an FIR with symmetric coefficients.
- **Using the transition width in hertz in the FIR order formula.** The Kaiser/Hamming estimate needs $\Delta f/f_s$; substituting $\Delta f$ in Hz gives an order smaller by the sampling rate and an unusable design.
- **Using $M/2$ with the tap count as $M$.** Group delay is $(N-1)/2$ samples for a length-$N$ symmetric FIR. Using $N/2$ is off by half a sample, which is fatal to a symbol-timing budget.
- **Forgetting to pre-warp IIR critical frequencies.** The bilinear transform warps frequency as $\Omega = \frac{2}{T}\tan(\omega/2)$; a 3 dB cutoff specified at $0.4f_s$ lands noticeably low unless the analog prototype's frequency is pre-warped.
- **Assuming the IIR is always the practical winner because its order is lower.** Low order brings pole sensitivity, limit cycles and long ringing. High-order IIR filters must be built as cascaded second-order sections, not in direct form.
- **Ignoring the group-delay penalty of a long FIR.** A 110-tap FIR at $8\ \mathrm{kHz}$ delays the signal 6.9 ms; inside a closed control loop or a real-time duplex link that latency may be the binding constraint, not the order.

## See Also

- [[10_Anti-Aliasing_Filters]]
- [[11_DFT_and_FFT]]
- [[09_Sampling_Types_and_Aperture_Effect]]

---

[[11_DFT_and_FFT|⬅ 11]] · [[_MOC_Signals_Spectra_and_Noise|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
