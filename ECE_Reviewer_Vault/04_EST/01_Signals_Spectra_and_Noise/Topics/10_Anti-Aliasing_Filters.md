---
id: EST-01-10
title: "Anti-Aliasing Filters"
part: "04_EST"
area: "01_Signals_Spectra_and_Noise"
topic: 10
tier: 2
depth: full
problem_count: 4
prereqs: ["[[08_Sampling_Theorem_and_Aliasing]]"]
tags: ["ece", "est", "signals_spectra_and_noise"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Anti-Aliasing Filters

> [!abstract] Scope
> Specify an analog anti-alias filter: where its stopband must begin, how much attenuation it needs, and what order it must be.

## Core Concept

> [!tip] Intuition
> An anti-alias filter is the one analog part of a digital system that cannot be moved or fixed later. Its job is to make sure that whatever the sampler folds back lands on top of nothing.

**Purpose and position in the chain.** The anti-alias filter is an analog lowpass placed between the signal source and the sample-and-hold. It must remove or adequately attenuate every frequency above $f_s/2$ *before* the sampler, because after sampling a component at $f_s-f_p$ produces samples identical to a genuine component at $f_p$. This is the reason a digital filter cannot substitute for it under any circumstances: the information needed to separate the two has already been destroyed by the folding.

**Deriving the stopband edge.** Suppose the wanted band is $[0, f_p]$ and the converter's dynamic range is $A$ dB (a 12-bit converter has $6.02n+1.76 \approx 74\ \mathrm{dB}$). Any input at $f_{stop} = f_s - f_p$ folds exactly onto $f_p$, so the filter must be $A$ dB down by $f_s - f_p$. The transition band is therefore $f_p \to f_s - f_p$, and its width relative to the passband is what sets the filter's difficulty: a wide transition band (large oversampling ratio) means a gentle, cheap filter; a narrow one means a high-order filter or a different sampling scheme.

**Order from the roll-off requirement.** An $n$-th order lowpass rolls off at $20n\ \mathrm{dB}$ per decade ($6n\ \mathrm{dB}$ per octave) well above cutoff. Solving for the order gives $n \ge \dfrac{A}{20\log_{10}(f_{stop}/f_{pass})}$, evaluated with the *actual* attenuations at the two edges rather than the asymptotic slope when accuracy matters. For a Butterworth response, $|H(f)| = 1/\sqrt{1+(f/f_c)^{2n}}$, so the order can also be found directly from the passband and stopband specifications without the decade approximation. The order result is what makes oversampling attractive: at $f_s = 10\ \mathrm{kHz}$ with $f_p = 4\ \mathrm{kHz}$ the ratio is only 1.5 and the order is huge; at $4\times$ oversampling the ratio is 9 and the order drops by a factor of about five.

**The second half of the job: the reconstruction filter.** The digital-to-analog side has the mirror-image problem. A DAC output contains images of the baseband at $f_s - f_p, f_s + f_p, \dots$, which must be removed by an analog **anti-imaging (smoothing) filter** with the same passband edge and stopband edge. Systems that use a zero-order-hold DAC add the same $\mathrm{sinc}(f\tau)$ aperture droop discussed in [[09_Sampling_Types_and_Aperture_Effect]], so the reconstruction filter is often paired with a compensating response. Oversampling helps here for the same reason: images move far from the baseband, and a gentle analog filter suffices.

**Oversampling, delta-sigma and the modern trade.** If the signal is sampled far above the Nyquist rate, the analog filter's transition band becomes wide and a first- or second-order filter may be enough; the digital side then removes the out-of-band noise with a sharp decimation filter. Delta-sigma converters take this to the limit, shaping quantisation noise away from the baseband and leaving only a very relaxed analog filter. The trade is real, though: oversampling requires a faster converter, and the digital decimation filter consumes power and area. The exam-level conclusion is that oversampling never removes the need for an analog anti-alias filter — it only makes that filter easier to build.

**Where it goes wrong in practice.** A filter that is too narrow cuts wanted signal; one that is too gentle leaves aliases above the noise floor; one whose stopband edge is computed as $f_s/2$ instead of $f_s - f_p$ still lets the worst-case component fold directly onto the passband edge. The filter's own noise and loss also contribute: a passive LC anti-alias filter inserted ahead of a high-impedance ADC input can add its insertion loss and thermal noise to the system budget, and its source impedance interacts with the sampling capacitor's charge injection. Finally, the filter must be designed for the *actual* sampling rate including any clock jitter, since the folding behaviour depends on the true $f_s$, not the nominal one.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Stopband edge of the anti-alias filter | $f_{stop} = f_s - f_p$ | The frequency that folds exactly onto the passband edge fp. Not fs/2; using fs/2 leaves the worst alias unattenuated. |
| Transition-band ratio | $r = \frac{f_{stop}}{f_p} = \frac{f_s}{f_p} - 1$ | Larger r means an easier filter. Oversampling increases r directly. |
| Order from asymptotic roll-off | $n \ge \frac{A}{20\log_{10}(f_{stop}/f_p)}$ | A is the required attenuation in dB at fstop. Rounds up to the next integer. |
| Butterworth magnitude | $\lvert H(f) \rvert = \frac{1}{\sqrt{1 + \left(\frac{f}{f_c}\right)^{2n}}}$ | Maximally flat passband. At f = fc the response is -3 dB for every order. |
| Attenuation of an n-th order Butterworth | $A(f) = 10\log_{10}\left[1 + \left(\frac{f}{f_c}\right)^{2n}\right] \ \mathrm{dB}$ | Exact, unlike the 20n dB/decade approximation, and needed when f is only a few times fc. |
| Roll-off per order | $20n\ \mathrm{dB/decade} = 6n\ \mathrm{dB/octave}$ | First-order RC = 20 dB/decade; second-order = 40 dB/decade. Asymptotic only. |
| Converter dynamic range | $A \approx 6.02n + 1.76\ \mathrm{dB}$ | n = bits. This is the attenuation the anti-alias filter must provide for the alias to sit at the noise floor. |
| Anti-imaging (reconstruction) filter | $f_{stop} = f_s - f_p \quad \mathrm{at\ the\ DAC\ output}$ | Same specification on the transmit side; removes images at fs - fp, fs + fp, ... |
| Oversampling benefit | $f_s \uparrow \ \Rightarrow r \uparrow \ \Rightarrow n \downarrow$ | Doubling fs roughly widens the transition band; the order needed falls steeply. Quantisation noise also spreads over a wider band. |
| Passband edge choice | $f_p \le \frac{f_s}{2} - \Delta f_{guard}$ | Leave a guard band so a realisable filter can reach its stopband before fs/2. |

## Worked Problems

### P1. A signal band-limited to $4\ \mathrm{kHz}$ is digitised by a 12-bit converter at $10\ \mathrm{kHz}$. Find the frequency at which the anti-alias filter's stopband must begin and the minimum filter order required.

**Given:** fp = 4 kHz; fs = 10 kHz; 12-bit converter

**Solution:**

1. Stopband edge: fstop = fs - fp = 10 - 4 = 6 kHz
2. Converter dynamic range: A = 6.02(12) + 1.76 = 74.0 dB
3. Transition ratio: fstop/fp = 6/4 = 1.5, and 20 log10(1.5) = 3.52 dB per order
4. n >= 74.0/3.52 = 21.0
5. Use a 21st-order lowpass (a realisable design usually oversamples instead)

> [!success]- Answer
> **Stopband begins at 6 kHz; n = 21.**

> [!warning] Trap
> Taking the stopband edge as fs/2 = 5 kHz. The alias that lands exactly on the 4 kHz passband edge comes from 10 - 4 = 6 kHz, so 5 kHz is 1 kHz too low and leaves the worst case unattenuated.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10-4` → $f_{stop}$ = **6** kHz ($f_s-f_p$, not $f_s/2$ = 5 kHz); `6.02×12+1.76` → $A$ = **74.0** dB.
> 2. `20log(6÷4)` → **3.522** dB per order.
> 3. `74÷3.522` → **21.0**, so $n$ = **21**.
>
> The stopband edge is the frequency that folds onto $f_p$: $f_s-f_p$ = 6 kHz. Designing to 5 kHz leaves the worst alias intact.

### P2. The converter in the previous problem is replaced by an oversampled 4x scheme, so $f_s = 40\ \mathrm{kHz}$ with the same $4\ \mathrm{kHz}$ signal and 74 dB requirement. Find the new stopband edge and order.

**Given:** fp = 4 kHz; fs = 40 kHz; A = 74 dB

**Solution:**

1. fstop = fs - fp = 40 - 4 = 36 kHz
2. Ratio = 36/4 = 9, and 20 log10(9) = 19.08 dB per order
3. n >= 74.0/19.08 = 3.88
4. Use a 4th-order lowpass

> [!success]- Answer
> **Stopband begins at 36 kHz; n = 4 instead of 21.**

> [!warning] Trap
> Assuming oversampling removes the analog filter requirement. The stopband edge moves to 36 kHz and the order drops from 21 to 4, but a 4th-order analog filter is still mandatory — oversampling relaxes the filter, it does not replace it.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `40-4` → $f_{stop}$ = **36** kHz; `36÷4` → **9** = transition ratio $r$.
> 2. `20log(9)` → **19.08** dB per order.
> 3. `74÷19.08` → **3.88**, so $n$ = **4** — down from 21.
>
> Oversampling widens the transition band and drops the order steeply; it never removes the analog filter.

### P3. A 4th-order Butterworth anti-alias filter has its 3 dB cutoff at $f_c = 5\ \mathrm{kHz}$. How much attenuation does it provide at $20\ \mathrm{kHz}$, and would that be enough for a 12-bit converter?

**Given:** n = 4; fc = 5 kHz; f = 20 kHz; 12-bit converter

**Solution:**

1. |H| = 1/sqrt(1 + (f/fc)^(2n)) = 1/sqrt(1 + (20/5)^8)
2. (4)^8 = 65536, so |H| = 1/sqrt(65537) = 1/256.0
3. A = 20 log10(1/256) = -48.2 dB
4. A 12-bit converter needs about 74 dB, so 48 dB is 26 dB short

> [!success]- Answer
> **48.2 dB of attenuation at 20 kHz — not enough for 12 bits.**

> [!warning] Trap
> Applying the asymptotic 80 dB/decade rule directly: from 5 kHz to 20 kHz is 0.602 decades, predicting 48.2 dB here, but the asymptote overestimates attenuation when f is only 4x fc. Use the exact Butterworth expression, then round the order up until the requirement is met.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(20÷5)^8` → **65536**; `1÷√(1+Ans)` → **3.906E-3** = $\lvert H\rvert$.
> 2. `20log(3.906E-3)` → **-48.16** dB ≈ **-48.2** dB.
> 3. `74-48.16` → **25.8** dB short of what a 12-bit converter needs.
>
> Use the exact Butterworth expression, not the 80 dB/decade asymptote — at only 4x $f_c$ the asymptote overstates.

### P4. A digital audio system runs at $f_s = 44.1\ \mathrm{kHz}$ with a $20\ \mathrm{kHz}$ passband. Find the reconstruction filter's stopband edge and comment on why this transition band is difficult.

**Given:** fs = 44.1 kHz; fp = 20 kHz

**Solution:**

1. fstop = fs - fp = 44.1 - 20 = 24.1 kHz
2. Transition band = 24.1 - 20 = 4.1 kHz, a ratio of only 24.1/20 = 1.205
3. 20 log10(1.205) = 1.62 dB per order, so reaching 74 dB needs n >= 74/1.62 = 46
4. The narrow transition band is why early CD players used high-order analog filters and why modern players oversample and filter digitally

> [!success]- Answer
> **Stopband edge = 24.1 kHz; the 1.205 transition ratio needs an impractically high order, which is why oversampling is used.**

> [!warning] Trap
> Assuming the reconstruction filter only needs to pass 0-20 kHz and ignoring the images. Images at fs - fp = 24.1 kHz and above must be suppressed, and the very narrow gap between 20 and 24.1 kHz is what makes the analog part hard.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `44.1-20` → $f_{stop}$ = **24.1** kHz; `24.1÷20` → **1.205**, the image at $f_s-f_p$ having nowhere to go.
> 2. `20log(1.205)` → **1.620** dB per order.
> 3. `74÷1.620` → **45.7**, so $n$ is at least **46** — which is why CD players oversample.
>
> The 4.1 kHz gap from 20 kHz to 24.1 kHz is the whole difficulty; passing 0-20 kHz is not the requirement.

## Traps & Exam Notes

- **Setting the stopband edge at $f_s/2$ instead of $f_s - f_p$.** The component that folds exactly onto the passband edge $f_p$ sits at $f_s - f_p$. Designing to $f_s/2$ leaves that worst-case alias unattenuated, and it lands right where the signal is.
- **Thinking the digital filter can clean up aliasing.** Samples of a $f_s-f_p$ component and a genuine $f_p$ component are identical; no post-sampling operation can separate them. The anti-alias filter must be analog and must be before the sampler.
- **Forgetting the guard band.** Designing with $f_p = f_s/2$ leaves zero transition width and demands an infinite-order filter. Real systems put $f_p$ below $f_s/2$ (44.1 kHz for a 20 kHz band) precisely to create a realisable transition band.
- **Using the asymptotic $20n\ \mathrm{dB/decade}$ rule near cutoff.** At $f = 4f_c$ the exact Butterworth attenuation is less than the asymptote predicts; the error can be several dB and can push a design below its required suppression.
- **Believing oversampling eliminates the analog filter.** Oversampling widens the transition band and drops the order from, say, 21 to 4 — it never removes the requirement, because the sampler still folds whatever reaches it.
- **Ignoring the filter's own noise and loss.** A passive anti-alias filter ahead of an ADC adds insertion loss and thermal noise; placing it after the LNA costs system noise figure, so it usually belongs in the signal chain where loss is affordable.
- **Designing to the nominal sampling rate.** Clock jitter and any sample-rate error shift the true fold-back frequencies; a filter designed for the exact nominal $f_s$ with no margin can leak aliases when the clock is off-frequency.

## See Also

- [[08_Sampling_Theorem_and_Aliasing]]
- [[09_Sampling_Types_and_Aperture_Effect]]
- [[11_DFT_and_FFT]]
- [[12_FIR_vs_IIR_Filters]]

---

[[09_Sampling_Types_and_Aperture_Effect|⬅ 09]] · [[_MOC_Signals_Spectra_and_Noise|MOC]] · [[00_Dashboard|Dashboard]] · [[11_DFT_and_FFT|11 ➡]]
