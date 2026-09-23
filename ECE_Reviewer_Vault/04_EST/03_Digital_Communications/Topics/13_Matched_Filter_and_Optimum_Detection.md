---
id: EST-03-13
title: "Matched Filter and Optimum Detection"
part: "04_EST"
area: "03_Digital_Communications"
topic: 13
tier: 2
depth: full
problem_count: 4
prereqs: ["[[10_BPSK_and_QPSK]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — Matched Filter and Optimum Detection

> [!abstract] Scope
> Design the optimum receiver for a known signal in white noise: the matched filter, its impulse response, its peak output SNR of 2E/N0, and the resulting BER.

## Core Concept

> [!tip] Intuition
> The best way to detect a known pulse buried in white noise is to correlate it against a copy of itself. Noise averages toward zero while the signal adds coherently, so the output peaks exactly when the whole pulse has arrived.

**The detection problem.** A receiver must decide which of two known waveforms was sent, given a noisy observation. The relevant comparison is not output *power* but the ratio of signal peak to noise at the single instant of the decision. Maximizing that ratio is the matched filter's job, and it is provably optimal: no linear filter can give a higher signal-to-noise ratio at the sampling instant than the matched filter.

**The matched filter response.** For a known signal $s(t)$ of finite duration $T$ in white noise of two-sided density $N_0/2$, the filter that maximizes output SNR at $t = T$ has impulse response $h(t) = s(T - t)$ — a time-reversed, delayed copy of the signal. Its frequency response is the complex conjugate of the signal spectrum, $H(f) = S^*(f)e^{-j2\pi f T}$, which is where the name comes from. The filter is therefore *matched* to the pulse shape, not chosen for bandwidth.

**The peak SNR result.** With matched filtering the output at the sampling instant equals the signal energy $E = \int_0^T s^2(t)\,dt$, and the maximum achievable output signal-to-noise ratio is $\mathrm{SNR}_{max} = \dfrac{2E}{N_0}$. Two consequences matter: the SNR depends only on the *energy* of the pulse, not on its shape or duration, and it degrades gracefully with noise density. Doubling the pulse energy raises the output SNR by 3 dB, which is exactly what one expects.

**Integrate-and-dump as the practical case.** For a rectangular pulse of amplitude $A$ and duration $T$, the matched filter is a simple integrator over one symbol period followed by a reset — an *integrate-and-dump* detector. Its output at the end of the symbol is $AT$, so a comparator against a threshold at zero decides between $+A$ and $-A$ signalling. It is the cheapest possible matched filter and appears in every textbook BER derivation.

**From SNR to BER.** In antipodal signalling the decision statistic is Gaussian with mean $\pm E$ and variance $N_0E/2$, so the decision is wrong when the noise exceeds $E$ in magnitude. Evaluating that tail gives $P_e = Q\!\left(\sqrt{2E_b/N_0}\right)$ — the BPSK result, now justified from the receiver's point of view: the matched filter is *why* BPSK achieves that curve, and any other filter does worse. For orthogonal signalling such as non-coherent FSK, the corresponding expression loses roughly 3 dB.

**What to watch for in exam questions.** The matched filter is a *receiver* concept: it does not change the transmitted spectrum or bandwidth, so questions that ask about occupied bandwidth are answered by the pulse shape, not the filter. The peak SNR $2E/N_0$ is often confused with $E/N_0$, a factor-of-2 (3 dB) error, and the dependence on $N_0$ rather than $N_0/2$ is a persistent slip. Note also that $2E/N_0$ is a *power* ratio, so the dB conversion uses the 10-log form.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Matched filter impulse response | $h(t) = s(T - t)$ | Time-reversed and delayed copy of the known pulse. Sampling at t = T is implied. |
| Matched filter frequency response | $H(f) = S^*(f) e^{-j 2\pi f T}$ | Conjugate of the signal spectrum with a delay to make it causal. |
| Peak output SNR | $\mathrm{SNR}_{max} = \frac{2E}{N_0}$ | E is the pulse energy. Uses the one-sided noise density N0, not N0/2. |
| Pulse energy | $E = \int_0^T s^2(t)\,dt$ | For a rectangular pulse of amplitude A, E = A^2 T. |
| Peak output value | $y(T) = E$ | The matched filter output at the sampling instant equals the signal energy. |
| Output noise variance | $\sigma^2 = \frac{N_0 E}{2}$ | Depends on E as well as N0, which is why the ratio simplifies to 2E/N0. |
| Integrate-and-dump output | $y(T) = \frac{1}{T}\int_0^T r(t)\,dt$ | Matched filter for a rectangular pulse. The 1/T scaling is a convention; it does not change the SNR. |
| BER with matched filtering, antipodal | $P_e = Q\!\left(\sqrt{\frac{2E_b}{N_0}}\right)$ | BPSK over AWGN. The matched filter is what makes this bound achievable. |
| SNR in dB | $\mathrm{SNR}_{dB} = 10\log_{10}\!\left(\frac{2E}{N_0}\right)$ | Power ratio, so 10-log. Doubling E adds 3.01 dB. |
| Orthogonal (non-coherent FSK) BER | $P_e = \frac{1}{2}e^{-E_b/(2N_0)}$ | About 3 dB worse than antipodal signalling at the same Eb/N0. |

## Worked Problems

### P1. A rectangular pulse of amplitude $2\ \mathrm{V}$ and duration $1\ \mathrm{ms}$ is detected with a matched filter. Find the pulse energy and the peak output value.

**Given:** A = 2 V; T = 1 ms; rectangular pulse

**Solution:**

1. E = A^2 T
2. = (2)^2 x 1e-3
3. = 4e-3 J
4. Peak output y(T) = E = 4 mJ (as a volt-second quantity)

> [!success]- Answer
> **$E = 4\ \mathrm{mJ}$, peak output $= 4\ \mathrm{mJ}$**

> [!warning] Trap
> Squaring the duration as well, or using the rms rather than the peak amplitude for a rectangular pulse. For a constant-amplitude rectangle the peak *is* the amplitude, so $E = A^2T$ with no factor of 2.

### P2. A pulse of energy $1\ \mu\mathrm{J}$ is received in white noise with one-sided density $N_0 = 2\times10^{-9}\ \mathrm{W/Hz}$. Find the maximum achievable output SNR in dB.

**Given:** E = 1 uJ; N0 = 2e-9 W/Hz

**Solution:**

1. SNR_max = 2E/N0
2. = 2 x 1e-6/2e-9
3. = 1e-6/1e-9 = 1000 (power ratio)
4. SNR_dB = 10 log10(1000) = 30 dB

> [!success]- Answer
> **$\mathrm{SNR}_{max} = 30\ \mathrm{dB}$**

> [!warning] Trap
> Substituting $N_0/2 = 10^{-9}$ into the formula and answering $60\ \mathrm{dB}$. The $2E/N_0$ result already contains the factor from the two-sided density; feeding it $N_0/2$ double-counts.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×1E-6÷2E-9` → $\mathrm{SNR}_{max}$ = **1000** as a power ratio.
> 2. `10×log(1000)` → **30** dB.
>
> $2E/N_0$ already carries the two-sided density factor; feeding it $N_0/2$ = 1e-9 doubles the answer to 60 dB.

### P3. A matched-filter BPSK receiver operates at $E_b/N_0 = 9.6\ \mathrm{dB}$. Estimate the BER.

**Given:** Eb/N0 = 9.6 dB; matched filter; AWGN

**Solution:**

1. Convert: Eb/N0 = 10^(0.96) = 9.120 (linear)
2. Argument = sqrt(2 x 9.120) = sqrt(18.24) = 4.271
3. Pe = Q(4.271); using Q(4.2) = 1.33e-5 and Q(4.3) = 8.54e-6 gives about 9.7e-6

> [!success]- Answer
> **$P_e \approx 1\times10^{-5}$**

> [!warning] Trap
> Forming $\sqrt{2E_b/N_0}$ by taking the square root of the *dB* value. Convert to a linear power ratio first, then apply the factor of 2, then take the root.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` STAT, then `Apps` `Distr` `R(` with the argument `√(2×10^(9.6÷10))` = **√18.240** = **4.2709**.
> 2. `=` → $P_e$ = **9.74×10^{-6}** ≈ **1×10^{-5}**, matching the BPSK landmark without interpolating a table.

### P4. A receiver uses a filter whose impulse response is the time-reverse of the transmitted pulse. Explain why sampling its output at $t = T$ maximizes SNR, and what happens if the sampling instant is moved to $t = 0.9T$.

**Given:** h(t) = s(T-t); rectangular pulse of duration T; sample at t = 0.9T instead of T

**Solution:**

1. At t = T the output is the autocorrelation of s with itself at zero lag, which equals the full energy E
2. Noise adds incoherently at every lag, so the noise power is independent of the sampling instant
3. Sampling early captures only 0.9T of the pulse: signal energy collected = A^2 x 0.9T = 0.9E
4. Output SNR falls to 2(0.9E)/N0 = 0.9 of its maximum, a loss of 10 log10(0.9) = 0.46 dB

> [!success]- Answer
> **Sampling at $T$ gives the full $E$; sampling at $0.9T$ loses $0.46\ \mathrm{dB}$**

> [!warning] Trap
> Believing the matched filter output is flat around the peak. It is the autocorrelation, which peaks only at zero lag, so any timing offset costs signal energy directly — this is exactly why timing recovery matters.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Sampling at $0.9T$ collects only $0.9E$ of the pulse energy, so the output ratio falls to **0.9** of its peak value.
> 2. `10×log(0.9)` → **−0.45757** dB, i.e. a **0.46** dB loss (10-log, because $2E/N_0$ is a power ratio).

## Traps & Exam Notes

- **Writing $E/N_0$ instead of $2E/N_0$.** The receiver's maximum output SNR is twice the pulse energy over the noise density. Dropping the 2 costs 3 dB and makes the BER derivation inconsistent with the BPSK curve.
- **Substituting $N_0/2$ into $2E/N_0$.** The $N_0/2$ is the two-sided density used when *deriving* the result; the final formula already accounts for it. Using $N_0/2$ doubles the answer.
- **Using the 20-log form for an SNR in dB.** $2E/N_0$ is a power ratio. Doubling the energy adds 3.01 dB, not 6.02 dB.
- **Thinking the matched filter changes the transmitted bandwidth.** It is purely a receiver structure. Occupied bandwidth is set by the transmitted pulse shape, and the matched filter's bandwidth is fixed as the conjugate of that pulse — it cannot be chosen independently.
- **Assuming the matched filter needs prior knowledge of the noise level.** Only the pulse *shape* and its timing enter $h(t)$; the noise density affects the resulting SNR but not the filter. A filter matched to the wrong pulse shape, however, performs strictly worse.
- **Confusing the matched filter with a bandpass filter chosen for selectivity.** A narrow bandpass filter rejects more noise but also distorts the pulse and loses signal energy. The matched filter is the optimum compromise, and it is generally not the narrowest filter available.

## See Also

- [[12_Constellation_and_BER_Comparison]]
- [[10_BPSK_and_QPSK]]
- [[08_Eye_Diagrams_and_Equalization]]
- [[03_Thermal_and_Johnson_Noise]]

---

[[12_Constellation_and_BER_Comparison|⬅ 12]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[14_Information_Theory_and_Entropy|14 ➡]]
