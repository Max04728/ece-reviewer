---
id: EST-01-11
title: "DFT and FFT"
part: "04_EST"
area: "01_Signals_Spectra_and_Noise"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[08_Sampling_Theorem_and_Aliasing]]"]
tags: ["ece", "est", "signals_spectra_and_noise"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — DFT and FFT

> [!abstract] Scope
> Work out the frequency resolution, bin frequencies and computational cost of a DFT or FFT, and know what leakage and windows do to a measured spectrum.

## Core Concept

> [!tip] Intuition
> The DFT answers one question: how much of each of N equally spaced frequencies is in this finite record? It treats the record as one period of a periodic signal, so anything that does not fit an integer number of cycles gets smeared — that smear is leakage.

**What the DFT computes.** For $N$ samples of a signal taken at $f_s$, the DFT returns $N$ complex bins, $X[k] = \sum_{n=0}^{N-1} x[n]e^{-j2\pi kn/N}$ for $k = 0,1,\dots,N-1$. Bin $k$ represents the frequency $f_k = k f_s/N$, so the **bin spacing** is $\Delta f = f_s/N$ and the total record duration is $T = N/f_s = 1/\Delta f$. Those two relations are the whole frequency-resolution story: the only way to resolve two closely spaced tones is to observe longer. For a real-valued signal the spectrum is conjugate-symmetric, so bins $k$ and $N-k$ carry the same information and only $k = 0 \dots N/2$ are unique — bin $0$ is DC and bin $N/2$ (when $N$ is even) is the Nyquist frequency.

**The FFT is not a different transform.** The fast Fourier transform is an algorithm that computes exactly the same $X[k]$ with far fewer operations, exploiting the periodicity and symmetry of the twiddle factors to split the sum recursively. A direct DFT costs $N^2$ complex multiplications; a radix-2 FFT costs about $(N/2)\log_2 N$ complex multiplications, a speed advantage of $2N/\log_2 N$ that grows with $N$ — about 341x at $N = 4096$ and over 10,000x at $N = 10^6$. Radix-2 requires $N$ to be a power of two; real hardware and libraries handle other lengths with mixed-radix or Bluestein algorithms, but zero-padding to the next power of two is the common exam-level answer.

**Leakage and why windows exist.** The DFT implicitly assumes the $N$ samples are exactly one period of a periodic extension of the signal. If the record contains a non-integer number of cycles, the periodic extension has a discontinuity at the wrap point, and the energy of that discontinuity spreads across *all* bins. This is **leakage**, and it is not an artifact of the computer — it is the rectangular window's sidelobes. Applying a tapered window (Hann, Hamming, Blackman, Kaiser) reduces the sidelobes at the cost of widening the main lobe, which is equivalent to a slight loss of resolution. The rule of thumb: the rectangular window has the narrowest main lobe and the worst sidelobes (−13 dB); Hamming gives −43 dB sidelobes with a main lobe about 1.4 bins wide; Blackman reaches −58 dB but is wider still. There is no free lunch, so choose a window whose sidelobe level is below the dynamic range you need.

**Scalloping, the picket-fence effect, and process gain.** A tone that falls exactly on a bin is measured at full height; a tone halfway between two bins is attenuated by up to 3.92 dB with a rectangular window (Scalloping loss, or the picket-fence effect, because the DFT only 'sees' the tone through the picket fence of its bins). Averaging $N$ samples of a real tone in white noise also improves the displayed SNR: the signal concentrates in one bin while the noise spreads over all $N$ bins, giving a processing gain of $10\log_{10}(N/2)$ — for $N = 1024$ that is 27.1 dB. This is why a weak tone can be measured with a long FFT even when it is buried in noise.

**What resolution is and is not.** $\Delta f = f_s/N$ is the *resolution* limit: two tones closer together than one bin cannot be separated, no matter how the data are processed. Zero-padding a record interpolates the spectrum between the true bins — it produces a smoother display and can locate a *single* tone's peak more precisely, but it does not create resolution, because no new information was added. Accuracy and resolution are different quantities: a lone tone can be located to a small fraction of a bin by centroid or parabolic interpolation, while two tones 0.5 bins apart remain one bump.

**Practical cautions.** Choose $N$ so that $\Delta f$ is well below the spacing you must resolve, window when the record cannot be made periodic (basically always for noise), and remember that the amplitude read from an uncalibrated DFT bin is *not* the signal amplitude: a real sinusoid of amplitude $A$ on an exact bin appears with $|X[k]| = AN/2$ (plus its mirror image), so the display must be scaled by $2/N$ and the window's coherent gain. Finally, aliasing does not disappear just because you are looking in the frequency domain: the DFT's bin $k$ and bin $N-k$ fold, and any energy above $f_s/2$ has already been folded by the sampler as described in [[08_Sampling_Theorem_and_Aliasing]].

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| DFT definition | $X[k] = \sum_{n=0}^{N-1} x[n]\, e^{-j 2\pi k n / N}, \quad k = 0,1,\dots,N-1$ | N samples in, N complex bins out. No frequency information between bins. |
| Inverse DFT | $x[n] = \frac{1}{N}\sum_{k=0}^{N-1} X[k]\, e^{+j 2\pi k n / N}$ | The 1/N normalisation belongs to the inverse transform. |
| Bin spacing (frequency resolution) | $\Delta f = \frac{f_s}{N}$ | The single most used DFT relation. Zero padding does not change it. |
| Frequency of bin k | $f_k = k\,\frac{f_s}{N} = k\,\Delta f$ | Bin 0 is DC; bin N/2 is fs/2 for even N; bins above N/2 mirror the negative frequencies. |
| Record duration and resolution | $T = \frac{N}{f_s} = \frac{1}{\Delta f}$ | Resolution is set by observation time, never by padding or interpolation. |
| DFT cost versus FFT cost | $N^2 \ \mathrm{complex\ mults\ (DFT)} \quad \mathrm{vs} \quad \frac{N}{2}\log_2 N \ \mathrm{(radix-2\ FFT)}$ | Speed advantage about 2N/log2(N). Radix-2 requires N = 2^m. |
| Speed advantage of the FFT | $\mathrm{speedup} = \frac{2N}{\log_2 N}$ | About 341x at N = 4096; grows without bound as N increases. |
| Processing gain (real tone in white noise) | $PG = 10\log_{10}\!\left(\frac{N}{2}\right)\ \mathrm{dB}$ | The factor 2 is because a real signal's power splits between positive and negative frequencies. |
| Scalloping loss (rectangular window) | $\mathrm{up\ to\ } 3.92\ \mathrm{dB}$ | Worst case when a tone sits exactly between two bins; reduce by windowing or by using a longer N. |
| Window trade-off | $\mathrm{rect:} -13\ \mathrm{dB},\ \mathrm{Hamming:} -43\ \mathrm{dB},\ \mathrm{Blackman:} -58\ \mathrm{dB sidelobes}$ | Lower sidelobes mean a wider main lobe, so resolution degrades as leakage improves. |
| Single-bin amplitude of a real sinusoid | $\lvert X[k] \rvert = \frac{A N}{2} \ \mathrm{for\ a\ tone\ exactly\ on\ bin\ } k$ | Scale by 2/N (and the window's coherent gain) to read amplitude, not power. |
| DFT Parseval relation | $\sum_{n=0}^{N-1} \lvert x[n] \rvert^{2} = \frac{1}{N}\sum_{k=0}^{N-1} \lvert X[k] \rvert^{2}$ | Energy in the record is conserved; useful for checking a scaling convention. |

## Worked Problems

### P1. A $10\ \mathrm{kHz}$ signal is digitised with $N = 1024$ samples. Find the bin spacing, the record duration and the frequency of bin 100.

**Given:** fs = 10 kHz; N = 1024

**Solution:**

1. df = fs/N = 10000/1024 = 9.766 Hz
2. T = N/fs = 1024/10000 = 102.4 ms (equivalently 1/df)
3. Bin 100: f = 100 x 9.766 = 976.6 Hz

> [!success]- Answer
> **df = 9.77 Hz; T = 102.4 ms; bin 100 = 976.6 Hz.**

> [!warning] Trap
> Using N - 1 in the denominator and getting 9.775 Hz, or reporting the resolution as 1/T with T = (N-1)/fs. The record has N intervals worth of samples spanning N/fs seconds for the periodic-extension assumption.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1E4÷1024` → $\Delta f$ = **9.766** Hz.
> 2. `1024÷1E4` → **0.1024** s = **102.4** ms (equivalently `1÷9.766`).
> 3. `100×9.766` → bin 100 sits at **976.6** Hz.
>
> $N$ = 1024, not $N-1$ = 1023: using 1023 gives 9.775 Hz and 102.3 ms, the trap in the note.

### P2. Compare the number of complex multiplications for a $4096$-point DFT and a radix-2 FFT, and state the speed advantage.

**Given:** N = 4096 = 2^12

**Solution:**

1. DFT: N^2 = 4096^2 = 1.6777e7 complex multiplications
2. FFT: (N/2) log2 N = 2048 x 12 = 24576 complex multiplications
3. Speed advantage = 1.6777e7/24576 = 682.6
4. Check with 2N/log2 N = 8192/12 = 682.7

> [!success]- Answer
> **DFT 1.68e7 vs FFT 2.46e4 multiplications: about 683x faster.**

> [!warning] Trap
> Using N log2 N instead of (N/2) log2 N and reporting 4096x12 = 49152, which halves the speed advantage. Different texts count butterflies or real multiplies, so state the convention; the ratio 2N/log2 N is the robust comparison.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4096²` → **1.678E7** complex multiplications for the direct DFT.
> 2. `(4096÷2)×(log(4096)÷log(2))` → **24576** for the radix-2 FFT; `log(4096)÷log(2)` is $\log_2 N$ = **12**.
> 3. `1.678E7÷24576` → **682.7**x, matching the convention-free $2N/\log_2 N$.
>
> `log` is base 10, so $\log_2 N$ must be keyed as `log(N)÷log(2)`; the ratio is the robust comparison.

### P3. A $1\ \mathrm{kHz}$ tone is sampled at $8\ \mathrm{kHz}$ with $N = 512$ points. Where does it fall in the spectrum, and what is the worst-case scalloping loss if the tone were half a bin away instead?

**Given:** f = 1 kHz; fs = 8 kHz; N = 512

**Solution:**

1. df = 8000/512 = 15.625 Hz
2. Bin index = 1000/15.625 = 64.0, an exact bin 64
3. So the tone appears at full amplitude (no scalloping)
4. If the tone were at 1007.8 Hz (bin 64.5), the rectangular-window scalloping loss would be up to 3.92 dB

> [!success]- Answer
> **Bin 64 (1000 Hz), exactly on-bin; worst-case off-bin loss is 3.92 dB.**

> [!warning] Trap
> Reading the bin amplitude as the tone's amplitude. |X[64]| = AN/2 for a real tone, so an unnormalised display is 54 dB too high at N = 512; the factor 2/N must be applied.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `8E3÷512` → $\Delta f$ = **15.625** Hz.
> 2. `1000÷15.625` → **64.0**, exactly bin 64, so the tone is on-bin at full amplitude.
> 3. Half a bin off, with the angle unit in Rad: `20log(sin(π÷2)÷(π÷2))` → **-3.92** dB scalloping loss.
>
> An unnormalised bin reads $\lvert X[64]\rvert$ = $AN/2$; scale by $2/N$ before calling it an amplitude.

### P4. Two tones $50\ \mathrm{Hz}$ apart must be resolved by an FFT running at $f_s = 20\ \mathrm{kHz}$. What is the minimum transform length, rounded to a power of two?

**Given:** required resolution = 50 Hz; fs = 20 kHz

**Solution:**

1. Need df <= 50 Hz
2. df = fs/N <= 50, so N >= 20000/50 = 400
3. Next power of two: N = 512, giving df = 20000/512 = 39.1 Hz
4. Record length = 512/20000 = 25.6 ms

> [!success]- Answer
> **N = 512 (df = 39.1 Hz, 25.6 ms of data).**

> [!warning] Trap
> Answering N = 400 exactly and then zero-padding it to 512. Zero padding adds no information; the *collected* record must itself be 512 samples long, or the two tones will still merge.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20E3÷50` → **400** = the minimum $N$ for $\Delta f$ at most 50 Hz.
> 2. Next power of two: `20E3÷512` → **39.06** Hz for $N$ = **512**.
> 3. `512÷20E3` → **0.0256** s = **25.6** ms of data that must actually be collected.
>
> Zero-padding a 400-sample record to 512 adds no resolution — the record itself must be 512 samples long.

### P5. A weak tone is buried in white noise. With $N = 1024$ samples the FFT shows the tone 10 dB above the noise floor. What processing gain does the transform provide, and how many samples would be needed for a 40 dB display?

**Given:** N = 1024; target display = 40 dB

**Solution:**

1. PG = 10 log10(N/2) = 10 log10(512) = 27.1 dB for N = 1024
2. Required: PG = 40 dB means 10 log10(N/2) = 40, so N/2 = 1e4
3. N = 2e4 samples; round to the next power of two, N = 32768
4. Check: 10 log10(32768/2) = 10 log10(16384) = 42.1 dB

> [!success]- Answer
> **27.1 dB at N = 1024; about N = 20000 samples (use 32768) for 40 dB.**

> [!warning] Trap
> Using PG = 10 log10(N) = 30.1 dB and answering N = 10000. The factor 2 accounts for the real signal's spectrum being split between positive and negative frequencies; the correct expression is 10 log10(N/2).

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10log(1024÷2)` → **27.1** dB processing gain.
> 2. `10^(40÷10)×2` → **20000** samples needed for a 40 dB display ($N/2$ = 1e4).
> 3. Round up to $N$ = **32768**: `10log(32768÷2)` → **42.1** dB.
>
> The factor 2 is for a real tone; $10\log_{10}N$ = 30.1 dB and $N$ = 10000 is the trap.

## Traps & Exam Notes

- **Expecting zero padding to improve resolution.** Padding interpolates the spectrum between bins and sharpens the *appearance* of a lone peak, but the resolution is fixed by the true record length: $\Delta f = f_s/N_{\mathrm{collected}}$. Two tones closer than one bin stay merged no matter how much you pad.
- **Using $\Delta f = f_s/(N-1)$.** The bin spacing is $f_s/N$ for an $N$-point transform. The $N-1$ appears in the *record duration* $T = (N-1)/f_s$ for sample-count definitions, which is a different quantity from the DFT's resolution.
- **Ignoring leakage and then blaming the hardware.** A non-integer number of cycles in the record spreads a tone's energy across all bins. Window the data when the record cannot be made periodic, and accept the wider main lobe.
- **Believing a window cures everything.** Every window trades main-lobe width against sidelobe level. Choosing Blackman to kill leakage can merge two tones that a rectangular window would have separated.
- **Mixing up processing gain conventions.** The SNR improvement for a real tone in white noise is $10\log_{10}(N/2)$; using $10\log_{10}N$ overstates it by 3 dB, and using $20\log_{10}N$ overstates it by a factor of two in dB.
- **Reading amplitudes straight off an FFT plot.** A real tone on an exact bin has $|X[k]| = AN/2$, and off-bin tones lose up to 3.92 dB. Amplitude calibration needs $2/N$, the window's coherent gain, and a correction for scalloping.
- **Forgetting that only half the bins are independent for real data.** Bins $k$ and $N-k$ are mirror images; summing power over all $N$ bins while treating them as independent double-counts the signal.
- **Assuming a radix-2 FFT works for any $N$.** Radix-2 needs $N = 2^m$; arbitrary lengths need mixed-radix, prime-factor or Bluestein algorithms. Padding to a power of two changes the effective resolution only if you also collect more data.

## See Also

- [[08_Sampling_Theorem_and_Aliasing]]
- [[10_Anti-Aliasing_Filters]]
- [[12_FIR_vs_IIR_Filters]]
- [[02_Power_Spectral_Density]]
- [[01_Time_vs_Frequency_and_Line_Spectra]]

---

[[10_Anti-Aliasing_Filters|⬅ 10]] · [[_MOC_Signals_Spectra_and_Noise|MOC]] · [[00_Dashboard|Dashboard]] · [[12_FIR_vs_IIR_Filters|12 ➡]]
