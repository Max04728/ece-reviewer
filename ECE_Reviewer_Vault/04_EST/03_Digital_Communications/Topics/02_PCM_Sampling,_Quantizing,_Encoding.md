---
id: EST-03-02
title: "PCM: Sampling, Quantizing, Encoding"
part: "04_EST"
area: "03_Digital_Communications"
topic: 2
tier: 1
depth: full
problem_count: 10
prereqs: ["[[08_Sampling_Theorem_and_Aliasing]]", "[[01_Pulse_Modulation_PAM,_PWM,_PPM]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — PCM: Sampling, Quantizing, Encoding

> [!abstract] Scope
> Turn an analog sample train into bits: pick the number of quantization levels, find the step size and worst-case error, and compute the PCM bit rate, bandwidth and SQNR.

## Core Concept

> [!tip] Intuition
> PCM is a three-stage pipeline — sample in time, round in amplitude, spell the rounded value in binary. Sampling error is avoided by Nyquist; quantization error is unavoidable and is the price of a finite codebook.

**The pipeline.** PCM converts an analog waveform into a serial bit stream in three steps. (1) *Sampling*: read the waveform every $T_s = 1/f_s$ seconds, with $f_s \geq 2f_m$ so the samples determine the waveform uniquely. (2) *Quantizing*: round each sample to the nearest of $L$ discrete levels spanning the peak-to-peak range $V_{pp}$. (3) *Encoding*: assign each level a unique $n$-bit binary code, which requires $L = 2^n$. Sampling is the only step that is exactly invertible; quantizing destroys information permanently.

**Why quantization costs error, and how much.** If the levels are uniformly spaced by $q = V_{pp}/L$, rounding a sample to the nearest level is wrong by at most half a step: $|e_{max}| = q/2$. Within a step the error is essentially uniform, so its mean square value is $q^2/12$ and its rms value is $q/\sqrt{12}$. This is *granular* or quantization noise. It is deterministic given the input, but for a busy signal it behaves like additive white noise, which is why it can be treated as a noise power in SQNR calculations.

**Bit rate and bandwidth.** With $n$ bits per sample and $f_s$ samples per second, the line rate is $R = n f_s$ bits per second. A binary PCM waveform is a baseband polar signal, so its minimum (Nyquist) bandwidth is half the bit rate, $B_{min} = R/2 = n f_s/2$; practical systems use $B \approx R$ once filtering and timing recovery are included. For a single voice channel $f_s = 8\ \mathrm{kHz}$ and $n = 8$ gives the universal $R = 64\ \mathrm{kbps}$ (DS0), needing at least $32\ \mathrm{kHz}$ of channel.

**Signal-to-quantization-noise ratio.** Every added bit halves the step, quartering the noise power, so SQNR improves by $6.02\ \mathrm{dB}$ per bit. For a full-scale sinusoid the closed form is $\mathrm{SQNR}_{dB} = 6.02n + 1.76$. Two assumptions are baked in and examiners exploit both: the signal must be a *sine* (crest factor $\sqrt{2}$) and it must *fully load* the quantizer. A signal $20\log_{10} m$ dB below full scale (loading factor $m < 1$) loses exactly that many dB of SQNR.

**Why 8 bits is enough for voice, and what companding fixes.** Uniform 8-bit PCM gives about $50\ \mathrm{dB}$ SQNR at full scale, which meets the $\approx 30\ \mathrm{dB}$ intelligibility target for loud talkers. But a talker $40\ \mathrm{dB}$ down would only get $10\ \mathrm{dB}$ SQNR under a uniform quantizer, because the step size is fixed. Companding applies a logarithmic compression before quantization so the step is effectively small for small signals; that is the subject of the companding note.

**Failure modes beyond granular noise.** If the input exceeds the quantizer range the sample *clips* and the error is unbounded — overload noise is far worse than granular noise, so the range must be set for the peak, not the rms, signal. If the code is transmitted with an offset or the receiver's clock drifts, the error pattern becomes correlated with the signal and appears as a tone rather than as noise. Both effects are why PCM links specify an alignment and a clock-recovery scheme.

## Derivation

**Levels to bits.** A uniform quantizer with $L$ levels needs a code with $L$ distinct words, and $n$ bits give $2^n$ words, so $L = 2^n$ and $n = \log_2 L$. Reversing it: to resolve a peak-to-peak range $V_{pp}$ with step $q$ you need $L \geq V_{pp}/q$, hence $n \geq \log_2(V_{pp}/q)$. Since $n$ must be an integer, always round *up* to the next whole bit.

**Step size and worst-case error.** With $L$ levels spanning $V_{pp}$ the step is $q = \dfrac{V_{pp}}{L} = \dfrac{V_{pp}}{2^n}$. Rounding to the nearest level gives a maximum error of one half step, so $|e|_{max} = \dfrac{q}{2} = \dfrac{V_{pp}}{2^{n+1}}$. This gives the design rule: required $n \geq \log_2\!\left(\dfrac{V_{pp}}{2|e|_{max}}\right)$.

**Noise power and rms error.** The error is uniform on $[-q/2, +q/2]$, so $\overline{e^2} = \dfrac{1}{q}\int_{-q/2}^{q/2} e^2\,de = \dfrac{q^2}{12}$, i.e. rms error $= q/\sqrt{12} = q/(2\sqrt{3})$. Substituting $q = V_{pp}/2^n$ gives noise power $P_q = \dfrac{V_{pp}^2}{12\cdot 2^{2n}}$.

**The 6.02n + 1.76 result.** A full-scale sinusoid has power $P_s = \dfrac{(V_{pp}/2)^2}{2} = \dfrac{V_{pp}^2}{8}$. Dividing, $\dfrac{P_s}{P_q} = \dfrac{V_{pp}^2/8}{V_{pp}^2/(12\cdot 2^{2n})} = \dfrac{12}{8}\cdot 2^{2n} = 1.5\cdot 4^{n}$. In decibels: $\mathrm{SQNR}_{dB} = 10\log_{10}(1.5) + 20n\log_{10}2 = 1.76 + 6.02n$. The $1.76$ is exactly $10\log_{10}(1.5)$ — it comes from the sine's crest factor, which is why the formula does not apply to arbitrary waveforms.

**Bit rate and bandwidth.** Each sample becomes $n$ bits, and there are $f_s$ samples per second, so $R = n f_s$. For binary transmission the Nyquist minimum bandwidth is half the symbol (here bit) rate: $B_{min} = R/2 = n f_s/2$. Worked example: $n = 8$, $f_s = 8\ \mathrm{kHz} \Rightarrow R = 64\ \mathrm{kbps}$ and $B_{min} = 32\ \mathrm{kHz}$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Quantization levels | $L = 2^n$ | Uniform quantizer. n is an integer, so round up: L must be at least the requirement. |
| Quantization step | $q = \frac{V_{pp}}{L} = \frac{V_{pp}}{2^n}$ | Vpp is the full quantizer range (peak-to-peak), not the peak value. |
| Maximum quantization error | $\lvert e \rvert_{max} = \frac{q}{2} = \frac{V_{pp}}{2^{n+1}}$ | Rounding to nearest level. Rounding down (truncation) instead gives a full step q. |
| Quantization noise power | $P_q = \frac{q^2}{12} = \frac{V_{pp}^2}{12\cdot 2^{2n}}$ | Assumes the error is uniform across a step — valid for a busy signal, not for DC. |
| RMS quantization error | $e_{rms} = \frac{q}{\sqrt{12}} = \frac{q}{2\sqrt{3}}$ | Voltage, not power. Dividing q by 12 instead of taking sqrt of q^2/12 is a common slip. |
| PCM bit rate | $R = n f_s$ | Bits per second. n from the level count, fs from Nyquist plus guard band. |
| Minimum PCM bandwidth | $B_{min} = \frac{R}{2} = \frac{n f_s}{2}$ | Nyquist binary minimum. Practical links budget B approx R for filtering and clock recovery. |
| SQNR for a full-scale sine | $\mathrm{SQNR}_{dB} = 6.02n + 1.76$ | Uniform quantizer, sinusoid exactly filling the range. Does not hold for Gaussian or low-crest-factor signals. |
| SQNR with loading factor | $\mathrm{SQNR}_{dB} = 6.02n + 1.76 + 20\log_{10} m$ | m is the fraction of full scale actually used. m = 0.5 costs 6.02 dB. |
| Bits for a target SQNR | $n \geq \frac{\mathrm{SQNR}_{dB} - 1.76}{6.02}$ | Round up to the next integer bit. n = 7 gives 43.9 dB, not 40 dB. |

## Interactive Widget

**PCM Quantization Staircase**

![[PCM_Quantization_Staircase.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A PCM system uses 256 quantization levels. How many bits are sent per sample?

**Given:** L = 256

**Solution:**

1. L = 2^n
2. 256 = 2^n
3. n = log2(256) = 8

> [!success]- Answer
> **$n = 8$ bits per sample**

> [!warning] Trap
> Writing $n = \log_{10}L = 2.41$. The level-to-bit relation is base 2 because the code alphabet is binary.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `log(256)÷log(2)` → $n$ = **8** bits per sample (`log` is base 10, so a base-2 log is `log x ÷ log 2`).
> 2. Check `2^8` → **256** levels, confirming $L = 2^n$.

### P2. The quantizer range of an 8-bit PCM system is $10\ \mathrm{V}$ peak-to-peak. Find the step size and the maximum quantization error.

**Given:** Vpp = 10 V; n = 8 bits

**Solution:**

1. L = 2^8 = 256 levels
2. q = Vpp/L = 10/256 = 39.06 mV
3. Maximum error = q/2 = 39.06/2
4. = 19.53 mV

> [!success]- Answer
> **$q = 39.06\ \mathrm{mV}$, $|e|_{max} = 19.53\ \mathrm{mV}$**

> [!warning] Trap
> Reporting $q$ as the maximum error. Rounding to the nearest level wastes at most half a step; truncation wastes a full step.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2^8` → $L$ = **256** levels; `10÷256` → $q$ = **0.0390625** V = **39.06** mV (`SHIFT` `ENG`).
> 2. `Ans÷2` → $\lvert e \rvert_{max}$ = **0.019531** V = **19.53** mV.
>
> Nearest-level rounding wastes half a step, so the error is $q/2$; the `Ans÷2` is what keeps $q$ from being quoted as the error.

### P3. A voice channel is low-pass filtered to $3.4\ \mathrm{kHz}$ and sampled at $8\ \mathrm{kHz}$ with 8 bits per sample. Find the PCM bit rate and the minimum transmission bandwidth.

**Given:** fm = 3.4 kHz; fs = 8 kHz; n = 8

**Solution:**

1. R = n fs = 8 x 8000 = 64 000 bps
2. B_min = R/2 = 64 000/2 = 32 000 Hz
3. Check Nyquist: fs = 8 kHz > 2 x 3.4 kHz = 6.8 kHz

> [!success]- Answer
> **$R = 64\ \mathrm{kbps}$, $B_{min} = 32\ \mathrm{kHz}$**

> [!warning] Trap
> Using $B_{min} = R = 64\ \mathrm{kHz}$. That is the practical budget; the Nyquist minimum for a binary baseband signal is $R/2$.

### P4. How many bits per sample are needed for a target SQNR of at least $40\ \mathrm{dB}$ with a full-scale sinusoid?

**Given:** SQNR target = 40 dB; full-scale sine; uniform quantizer

**Solution:**

1. 6.02n + 1.76 >= 40
2. 6.02n >= 38.24
3. n >= 6.352
4. Round up: n = 7 bits (gives 6.02x7 + 1.76 = 43.9 dB)

> [!success]- Answer
> **$n = 7$ bits, giving $43.9\ \mathrm{dB}$**

> [!warning] Trap
> Rounding 6.35 to 6. Six bits give only $37.9\ \mathrm{dB}$, which misses the target — always round bits up.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(40−1.76)÷6.02` → **6.3522**, so $n$ must **round up** to **7** bits.
> 2. `6.02×7+1.76` → **43.9** dB; `6.02×6+1.76` → **37.9** dB falls short of the 40 dB spec.
>
> The spec is an inequality: substitute the rounded bit count back in rather than rounding 6.35 down.

### P5. A signal spans $5\ \mathrm{V}$ peak-to-peak and must be quantized with a maximum error no greater than $2\ \mathrm{mV}$. Find the minimum number of bits.

**Given:** Vpp = 5 V; |e|max <= 2 mV

**Solution:**

1. q/2 <= 2 mV so q <= 4 mV
2. L >= Vpp/q = 5000 mV / 4 mV = 1250
3. Find the smallest power of two at least 1250: 2^10 = 1024 (too small), 2^11 = 2048
4. n = 11; then q = 5/2048 = 2.441 mV and error = 1.22 mV

> [!success]- Answer
> **$n = 11$ bits, $q = 2.44\ \mathrm{mV}$, error $= 1.22\ \mathrm{mV}$**

> [!warning] Trap
> Choosing $n = 10$ because $2^{10} = 1024$ is close to 1250. The requirement is an inequality on $L$, so it must be satisfied, not approximated.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5000÷4` → need $L \geq$ **1250** levels (a 2 mV error ceiling means $q$ = 4 mV).
> 2. Test the powers of two: `2^10` → **1024** is short, `2^11` → **2048** works, so $n$ = **11** bits.
> 3. `5÷2048` → $q$ = **2.441** mV and `Ans÷2` → error = **1.221** mV.
>
> Do not stop at $2^{10} = 1024$ because it is near 1250 — the level count must satisfy the inequality.

### P6. A 12-bit PCM system covers a $20\ \mathrm{V}$ peak-to-peak range. Find the step size, the maximum error and the rms quantization noise voltage.

**Given:** n = 12; Vpp = 20 V

**Solution:**

1. L = 2^12 = 4096
2. q = 20/4096 = 4.883 mV
3. Max error = q/2 = 2.441 mV
4. e_rms = q/sqrt(12) = 4.883/3.464 = 1.410 mV

> [!success]- Answer
> **$q = 4.88\ \mathrm{mV}$, error $= 2.44\ \mathrm{mV}$, $e_{rms} = 1.41\ \mathrm{mV}$**

> [!warning] Trap
> Using $q/2$ as the rms error. The peak error is $q/2$, but the rms of a uniform distribution over one step is $q/\sqrt{12}$, which is smaller.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2^12` → **4096** levels; `20÷4096` → $q$ = **4.8828×10^{-3}** V = **4.88** mV.
> 2. `Ans÷2` → **2.441×10^{-3}** V = **2.44** mV maximum error.
> 3. `Ans×2÷√12` → **1.4096×10^{-3}** V = **1.41** mV rms — the `Ans×2` returns to $q$ before dividing by $\sqrt{12}$.

### P7. A DS1 (T1) line carries PCM at $1.544\ \mathrm{Mbps}$. Find the duration of one bit.

**Given:** R = 1.544 Mbps

**Solution:**

1. Tb = 1/R
2. = 1/(1.544e6)
3. = 6.477e-7 s

> [!success]- Answer
> **$T_b = 648\ \mathrm{ns}$**

> [!warning] Trap
> Dividing by 8 first (treating it as a byte rate). The 1.544 Mbps figure is the *line* rate including framing and signalling; no de-multiplexing is implied.

### P8. A PCM system must send a $4\ \mathrm{kHz}$ audio signal with an SQNR of at least $50\ \mathrm{dB}$. Find the number of bits and the resulting bit rate, using the standard $8\ \mathrm{kHz}$ sampling rate.

**Given:** fm = 4 kHz; fs = 8 kHz; SQNR >= 50 dB

**Solution:**

1. n >= (50 - 1.76)/6.02 = 48.24/6.02 = 8.01
2. Round up: n = 9 bits (gives 6.02x9 + 1.76 = 55.9 dB)
3. R = n fs = 9 x 8000 = 72 000 bps

> [!success]- Answer
> **$n = 9$ bits, $R = 72\ \mathrm{kbps}$**

> [!warning] Trap
> Answering 8 bits because 8-bit PCM is the familiar voice standard. Exactly $n = 8$ gives $49.9\ \mathrm{dB}$, which fails a 50 dB spec by $0.1\ \mathrm{dB}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(50−1.76)÷6.02` → **8.0133**, so $n$ **rounds up** to **9** bits.
> 2. `6.02×9+1.76` → **55.9** dB (8 bits gives only **49.9** dB); `9×8000` → $R$ = **72 000** bps.
>
> Exactly 8 bits misses a 50 dB spec by 0.1 dB, so the familiar voice standard is not the answer here.

### P9. An 8-bit PCM system is driven by a sinusoid that only reaches half of the quantizer's full-scale range. Find the SQNR.

**Given:** n = 8; loading factor m = 0.5

**Solution:**

1. Full-scale value: 6.02 x 8 + 1.76 = 49.92 dB
2. Loading penalty: 20 log10(0.5) = -6.02 dB
3. SQNR = 49.92 - 6.02 = 43.9 dB

> [!success]- Answer
> **$43.9\ \mathrm{dB}$**

> [!warning] Trap
> Forgetting the loading term entirely, or applying it as $10\log_{10}m$ ($-3\ \mathrm{dB}$). The sample values scale linearly in voltage, so the penalty is the 20-log form.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `6.02×8+1.76` → full-scale SQNR = **49.92** dB.
> 2. `20×log(0.5)` → **−6.0206** dB loading penalty (a voltage ratio, so 20-log, not 10-log).
> 3. `Ans+49.92` → **43.9** dB.

### P10. A PCM link samples at $10\ \mathrm{kHz}$ and transmits 6 bits per sample over a channel that supports a minimum baseband bandwidth of $35\ \mathrm{kHz}$. Is the channel adequate?

**Given:** fs = 10 kHz; n = 6; B = 35 kHz

**Solution:**

1. R = n fs = 6 x 10 000 = 60 000 bps
2. B_min = R/2 = 30 000 Hz
3. Compare: 35 kHz > 30 kHz, so the channel is adequate
4. Margin = 5 kHz

> [!success]- Answer
> **Yes — required $30\ \mathrm{kHz}$, available $35\ \mathrm{kHz}$**

> [!warning] Trap
> Comparing $B$ against $R = 60\ \mathrm{kHz}$ and declaring failure. For binary PCM the bandwidth test is against $R/2$, not $R$.

## Traps & Exam Notes

- **Using $q$ as the maximum error.** Nearest-level rounding costs at most $q/2$; only truncation costs a full $q$. Using $q$ halves the apparent resolution and inflates the required bit count by one.
- **Treating the SQNR formula as waveform-independent.** $6.02n + 1.76$ assumes a *full-scale sinusoid*. A Gaussian signal with the same power has a higher crest factor and a worse SQNR; a signal 6 dB below full scale loses 6.02 dB.
- **Rounding the bit count down.** $n$ is an integer and the SQNR and error specs are inequalities. $(40 - 1.76)/6.02 = 6.35$ means 7 bits, not 6 — the standard trap in every PCM bit-rate problem.
- **Confusing the Nyquist minimum with the practical bandwidth.** $B_{min} = R/2$ is a theoretical floor requiring a brick-wall filter. Real PCM links are budgeted at $B \approx R$ or higher.
- **Missing the guard band in $f_s$.** Applying $f_s = 2f_m$ exactly to a 3.4 kHz voice channel gives 6.8 kHz, but the standard is 8 kHz. Board problems that quote 8 kHz expect you to use 8 kHz, not to re-derive it.
- **Ignoring clipping.** Granular noise is bounded by $q/2$, but overload noise is not bounded at all. The quantizer range must cover the *peak* signal, so a system designed on rms level alone will produce impulse-like clipping noise.

## See Also

- [[03_Quantization_Noise_and_SQNR]]
- [[04_Companding_Mu-Law_and_A-Law]]
- [[01_Pulse_Modulation_PAM,_PWM,_PPM]]
- [[15_Shannon-Hartley_Capacity]]

---

[[01_Pulse_Modulation_PAM,_PWM,_PPM|⬅ 01]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Quantization_Noise_and_SQNR|03 ➡]]
