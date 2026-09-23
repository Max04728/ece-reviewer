---
id: EST-03-03
title: "Quantization Noise and SQNR"
part: "04_EST"
area: "03_Digital_Communications"
topic: 3
tier: 2
depth: full
problem_count: 4
prereqs: ["[[02_PCM_Sampling,_Quantizing,_Encoding]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Quantization Noise and SQNR

> [!abstract] Scope
> Compute the signal-to-quantization-noise ratio of a uniform PCM quantizer from the bit count, the load factor and the signal waveform, and work backwards to the bit count a target SQNR demands.

## Core Concept

> [!tip] Intuition
> Quantization error is a small sawtooth riding on the signal, bounded by half a step. Once the signal is busy, that sawtooth looks like white noise with power q squared over twelve, so it can be traded against signal power in decibels.

**Where the noise comes from.** Rounding each sample to the nearest of $L$ levels produces an error confined to one half-step: $|e| \leq q/2$. That error is deterministic, but for a signal that crosses many steps per cycle it decorrelates from the signal and is well modelled as additive noise of power $P_q = q^2/12$. This is the *granular* noise floor of any PCM link; it cannot be removed by filtering because it occupies the same band as the signal.

**The 6.02n + 1.76 dB result.** For a sinusoid exactly filling the quantizer range, signal power is $V_{pp}^2/8$ and noise power is $V_{pp}^2/(12\cdot 2^{2n})$, so the power ratio is $1.5\cdot 2^{2n}$. In decibels this is $10\log_{10}1.5 + 20n\log_{10}2 = 1.76 + 6.02n$. Two facts make it usable in exams: every extra bit buys exactly $6.02\ \mathrm{dB}$, and the $1.76\ \mathrm{dB}$ is a *fixed offset from the sine's crest factor*, not a fudge factor. Landmarks worth memorising:
$$n = 8 \Rightarrow 49.9\ \mathrm{dB}$$
$n = 12 \Rightarrow 74.0\ \mathrm{dB}$, $n = 16 \Rightarrow 98.1\ \mathrm{dB}$.

**Why the formula fails when it is misapplied.** Three assumptions are hidden in it. (1) *Full loading*: if the signal only reaches a fraction $m$ of full scale, signal power scales as $m^2$, so $20\log_{10}m$ must be added. (2) *Sine waveform*: a Gaussian signal with the same *power* has occasional peaks well beyond the sine's, so a range sized for it is much larger and the effective SQNR is worse. (3) *Uniform quantizer with rounding*: truncation doubles the error power (adds $6\ \mathrm{dB}$ of penalty), and a non-uniform (companded) quantizer has a step size that varies with amplitude, so a single $q$ does not exist.

**Idle-channel noise and the silence problem.** With no input, a uniform quantizer's error is a DC offset, not noise — the signal sits on one level. The audible annoyance in real telephony comes from the quantizer drifting between two adjacent levels on a low-level tone. Companding and, in modern codecs, comfort noise injection exist specifically to manage this. Exam-wise, the point is that $q^2/12$ is a *statistical* result requiring a dithering-like signal; it is not the error for a DC input.

**Working backwards: bit budgeting.** Inverting the formula gives the design equation $n \geq (\mathrm{SQNR}_{dB} - 1.76)/6.02$, always rounded *up*. Speech needs roughly $30\ \mathrm{dB}$ for intelligibility and $50\ \mathrm{dB}$ for good quality; audio needs $80$–$96\ \mathrm{dB}$, which is why CD audio uses 16 bits. The corresponding bit rates follow from $R = n f_s$, and the bandwidth from $B_{min} = n f_s/2$ — so SQNR and bandwidth trade off directly against each other through $n$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| SQNR, full-scale sinusoid | $\mathrm{SQNR}_{dB} = 6.02n + 1.76$ | Uniform quantizer, rounding, sine filling the range. The single most examined formula in this area. |
| SQNR improvement per bit | $\Delta\mathrm{SQNR} = 6.02\ \mathrm{dB\ per\ bit}$ | Each bit halves q, quartering noise power. Two bits buy about 12 dB. |
| SQNR with loading factor | $\mathrm{SQNR}_{dB} = 6.02n + 1.76 + 20\log_{10} m$ | m = V_signal,pp / V_range,pp < 1. Voltage ratio, so 20-log. |
| Quantization noise power | $P_q = \frac{q^2}{12}$ | Uniform error over one step. Truncation instead of rounding gives q^2/3. |
| Quantization noise voltage | $e_{rms} = \frac{q}{\sqrt{12}} = 0.2887\,q$ | Voltage. Do not confuse with the peak error q/2. |
| Step from bit count | $q = \frac{V_{pp}}{2^n}$ | Vpp is the quantizer's full range, not the signal's actual span. |
| Bits for a target SQNR | $n \geq \frac{\mathrm{SQNR}_{dB} - 1.76}{6.02}$ | Round up to the next integer. The inequality is a hard spec. |
| SQNR in linear form | $\frac{S}{N_q} = 1.5\cdot 2^{2n} = 1.5\,4^{n}$ | Useful when combining with other noise sources before converting to dB. |
| Effective number of bits | $n_{eff} = \frac{\mathrm{SQNR}_{dB} - 1.76}{6.02}$ | For a measured SQNR this gives the resolution actually achieved, including loading and distortion. |

## Interactive Widget

**PCM Quantization Staircase**

![[PCM_Quantization_Staircase.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An 8-bit uniform PCM quantizer is driven by a full-scale sinusoid. Find the SQNR.

**Given:** n = 8; full-scale sine

**Solution:**

1. SQNR = 6.02n + 1.76
2. = 6.02 x 8 + 1.76
3. = 48.16 + 1.76
4. = 49.92 dB

> [!success]- Answer
> **$49.9\ \mathrm{dB}$**

> [!warning] Trap
> Dropping the $+1.76$ and answering $48.2\ \mathrm{dB}$. The $1.76\ \mathrm{dB}$ is $10\log_{10}1.5$ and only vanishes for a signal with a different crest factor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `6.02×8+1.76` → **49.92** dB, i.e. **49.9** dB.
> 2. `10×log(1.5)` → **1.7609** dB, confirming the $+1.76$ offset is $10\log_{10}1.5$ and not a fudge factor.

### P2. Find the SQNR of a 12-bit PCM system for a full-scale sinusoid, and state the improvement over 8 bits.

**Given:** n = 12; compare with n = 8

**Solution:**

1. SQNR(12) = 6.02 x 12 + 1.76 = 72.24 + 1.76 = 74.0 dB
2. SQNR(8) = 49.92 dB
3. Difference = 74.0 - 49.92 = 24.08 dB
4. Check: 4 extra bits x 6.02 dB = 24.08 dB

> [!success]- Answer
> **$74.0\ \mathrm{dB}$, a $24.1\ \mathrm{dB}$ improvement**

> [!warning] Trap
> Expecting a 4x improvement (6 dB) because the bit count quadrupled. SQNR scales with the *power* ratio $4^n$, so 4 bits give $2^8 = 256$ times the power ratio, i.e. $24\ \mathrm{dB}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `6.02×12+1.76` → **74.0** dB and `6.02×8+1.76` → **49.92** dB.
> 2. `6.02×(12−8)` → **24.08** dB improvement, agreeing with **74.0 − 49.92**.
>
> The difference of the two logarithms equals 6.02 dB per extra bit; 4 bits is 24 dB, not 6 dB.

### P3. A digital audio link must achieve an SQNR of at least $60\ \mathrm{dB}$ with a full-scale sinusoid. Find the minimum number of bits.

**Given:** SQNR >= 60 dB

**Solution:**

1. n >= (60 - 1.76)/6.02
2. = 58.24/6.02
3. = 9.674
4. Round up: n = 10 bits, giving 6.02x10 + 1.76 = 61.96 dB

> [!success]- Answer
> **$n = 10$ bits, giving $62.0\ \mathrm{dB}$**

> [!warning] Trap
> Answering 9 bits because 9.674 rounds to 10 but 9 bits gives $55.9\ \mathrm{dB}$ — verified by substitution, not by rounding the intermediate.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(60−1.76)÷6.02` → **9.6744**, so $n$ rounds up to **10** bits.
> 2. `6.02×10+1.76` → **61.96** dB passes the spec; `6.02×9+1.76` → **55.94** dB fails it.

### P4. An 8-bit PCM system is fed a sinusoid that peaks at only one tenth of the quantizer's full-scale voltage. Find the SQNR.

**Given:** n = 8; m = 0.1

**Solution:**

1. Full-scale SQNR = 6.02 x 8 + 1.76 = 49.92 dB
2. Loading penalty = 20 log10(0.1) = -20 dB
3. SQNR = 49.92 - 20 = 29.9 dB

> [!success]- Answer
> **$29.9\ \mathrm{dB}$**

> [!warning] Trap
> Using $10\log_{10}(0.1) = -10\ \mathrm{dB}$. Signal *voltage* scales by $m$ while power scales by $m^2$, hence the 20-log form.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `6.02×8+1.76` → **49.92** dB at full scale.
> 2. `20×log(0.1)` → **−20** dB loading penalty, then `Ans+49.92` → **29.92** dB ≈ **29.9** dB.
>
> Use 20-log: a one-tenth voltage ratio is −20 dB, not the −10 dB a 10-log would give.

## Traps & Exam Notes

- **Forgetting the $+1.76$.** It comes from $10\log_{10}1.5$, the ratio between a sine's mean-square value and the uniform-error distribution. A full answer is $6.02n + 1.76$, not $6.02n$.
- **Applying 6.02n + 1.76 to a non-sinusoidal signal.** The result is derived for a full-scale sine. For Gaussian or speech-like signals the crest factor differs and the actual SQNR is several dB worse; the formula is an upper reference, not a guarantee.
- **Using a 10-log for the loading factor.** Loading is a voltage ratio, so a signal 6 dB below full scale reduces SQNR by 6.02 dB, not 3 dB.
- **Rounding the bit count to the nearest integer.** $n$ is a spec-driven integer; $(60 - 1.76)/6.02 = 9.67$ demands 10 bits. Answering 9 fails the requirement.
- **Treating $q^2/12$ as the error for a DC input.** With a constant input the error is a fixed offset, not uniform noise. The $q^2/12$ model needs a signal that sweeps across steps.
- **Confusing quantization noise with thermal noise.** Quantization noise is deterministic and stays at $q^2/12$ no matter how long you integrate; thermal noise can be reduced by averaging. More bits is the only cure for quantization noise.

## See Also

- [[02_PCM_Sampling,_Quantizing,_Encoding]]
- [[04_Companding_Mu-Law_and_A-Law]]
- [[05_Delta_Modulation_and_ADM]]
- [[15_Shannon-Hartley_Capacity]]

---

[[02_PCM_Sampling,_Quantizing,_Encoding|⬅ 02]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Companding_Mu-Law_and_A-Law|04 ➡]]
