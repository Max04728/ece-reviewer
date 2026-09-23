---
id: EST-03-04
title: "Companding: Mu-Law and A-Law"
part: "04_EST"
area: "03_Digital_Communications"
topic: 4
tier: 2
depth: full
problem_count: 4
prereqs: ["[[03_Quantization_Noise_and_SQNR]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Companding: Mu-Law and A-Law

> [!abstract] Scope
> Explain why uniform quantization starves quiet talkers, and apply the mu-law and A-law compression curves that equalize SQNR across the amplitude range.

## Core Concept

> [!tip] Intuition
> Companding is a change of variable. Squeeze the large amplitudes and stretch the small ones before the quantizer, then undo it at the receiver. The quantizer stays uniform, but its steps look logarithmically spaced in the original amplitude.

**The problem companding solves.** With a uniform quantizer the step size $q$ is fixed, so quantization noise power $q^2/12$ is the same for every sample while signal power falls with amplitude. A talker $40\ \mathrm{dB}$ below full scale therefore loses the full $40\ \mathrm{dB}$ of SQNR and ends up around $10\ \mathrm{dB}$ — barely intelligible. Human speech spends most of its time well below peak, so uniform PCM wastes almost all its codes on amplitudes that rarely occur.

**The fix: a non-uniform quantizer, implemented as compression plus a uniform quantizer.** Pass the signal through a compressive nonlinearity $y = C(x)$ that has high gain near zero and low gain near the peak, then quantize $y$ uniformly. Because the compressor maps a wide range of input amplitudes into a narrow output range, small inputs end up with proportionally finer effective steps. At the receiver, an expander $C^{-1}(y)$ restores the amplitude. The pair is a *compandor*: COMpressor plus exPANDER.

**Why logarithmic.** For SQNR to be constant in decibels across the whole amplitude range, the effective step must be proportional to the signal amplitude, $\Delta x \propto x$. Solving $dy/dx = k/x$ gives $y = k\ln x$ — a pure logarithm. A pure log is unbounded at zero, so both standards bend it into a linear segment near the origin. That single bend is the entire difference between the two curves.

**Mu-law (North America and Japan).** $|y| = \dfrac{\ln(1 + \mu|x|)}{\ln(1+\mu)}$ with $\mu = 255$ for the 8-bit, 8 kHz DS0 channel. It is one continuous curve with no segment break, so there is no slope discontinuity to distort low-level signals. The subjective improvement over uniform 8-bit PCM for speech is roughly $24\ \mathrm{dB}$ — equivalent to about 4 extra bits.

**A-law (Europe and international links).** $|y| = \dfrac{A|x|}{1+\ln A}$ for $|x| < 1/A$, and $|y| = \dfrac{1+\ln(A|x|)}{1+\ln A}$ for $1/A \leq |x| \leq 1$, with $A = 87.6$. It has an explicit linear segment for small signals, which makes it slightly easier to implement in early digital hardware and removes the mu-law curve's infinite slope at the origin. The penalty is a small slope discontinuity at $|x| = 1/A$.

**Practical consequences.** Both curves map a 13-bit (or 14-bit) linear sample into 8 companded bits, so an 8-bit companded channel delivers roughly 12-bit linear quality — the basis of the 64 kbps DS0 channel. Because mu-law and A-law are different curves, a mu-law-encoded stream decoded with an A-law expander produces audible distortion, so every international gateway must agree on one. That mismatch — a *codec mismatch*, not a bit error — is a favourite board question.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Mu-law compression | $\lvert y \rvert = \frac{\ln(1 + \mu \lvert x \rvert)}{\ln(1+\mu)}$ | mu = 255 in the North American/Japanese 8-bit PCM standard. x and y are normalized to full scale (0 to 1). |
| Mu-law standard value | $\mu = 255$ | Sometimes quoted as 255 or 256 depending on whether the normalising constant is counted; both appear in exams. |
| A-law compression, linear segment | $\lvert y \rvert = \frac{A\lvert x \rvert}{1+\ln A}, \quad \lvert x \rvert < \frac{1}{A}$ | Small-signal branch. Gives a finite slope at the origin. |
| A-law compression, log segment | $\lvert y \rvert = \frac{1+\ln(A\lvert x \rvert)}{1+\ln A}, \quad \frac{1}{A} \leq \lvert x \rvert \leq 1$ | Large-signal branch. A = 87.6 in the ITU G.711 standard. |
| A-law standard value | $A = 87.6$ | Chosen so the two branches meet with matching value; the 1/A breakpoint is at x = 0.0114. |
| Companded SQNR, constant across range | $\mathrm{SQNR}_{dB} \approx \mathrm{constant}$ | The design goal: effective step proportional to amplitude. Only approximately true near the origin. |
| Improvement over uniform PCM | $\Delta\mathrm{SQNR} \approx 24\ \mathrm{dB}$ | Subjective figure for mu = 255 8-bit speech versus uniform 8-bit. Equivalent to about 4 extra bits. |
| Companded to linear equivalence | $8\ \mathrm{bits}_{\mu\mathrm{-law}} \approx 12\ \mathrm{bits}_{linear}$ | Why DS0 carries 8 companded bits per 125 us sample instead of 12 linear bits. |
| Number of chords and steps | $8\ \mathrm{segments} \times 16\ \mathrm{steps} = 128\ \mathrm{levels\ per\ polarity}$ | G.711 segment structure; 256 codes total including sign. Each successive segment doubles its step size. |
| Expander | $x = C^{-1}(y)$ | Receiver inverse. Using the wrong law's inverse (mu vs A) causes audible distortion with no bit errors. |

## Worked Problems

### P1. A normalized sample $x = 0.1$ is compressed with mu-law using $\mu = 255$. Find the compressed output $y$.

**Given:** x = 0.1; mu = 255

**Solution:**

1. ln(1 + mu|x|) = ln(1 + 255 x 0.1) = ln(26.5)
2. ln(26.5) = 3.2771
3. ln(1 + 255) = ln(256) = 5.5452
4. y = 3.2771/5.5452 = 0.591

> [!success]- Answer
> **$y = 0.591$**

> [!warning] Trap
> Dividing by $\ln(255) = 5.541$ instead of $\ln(256)$. The normalising constant is $\ln(1+\mu)$, which includes the 1 inside the logarithm.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `ln(1+255×0.1)÷ln(256)` → $y$ = **0.59099** ≈ **0.591**.
> 2. `ln(255)` → **5.54126** instead gives **0.5914** — the divisor is $\ln(1+\mu) = \ln 256$.
>
> The 1 sits inside the logarithm of the normalising constant as well as the numerator.

### P2. The same sample $x = 0.1$ is compressed with A-law using $A = 87.6$. Find $y$ and compare with the mu-law result.

**Given:** x = 0.1; A = 87.6

**Solution:**

1. Breakpoint: 1/A = 1/87.6 = 0.0114. Since x = 0.1 > 0.0114, use the log branch
2. ln(A|x|) = ln(87.6 x 0.1) = ln(8.76) = 2.1698
3. 1 + ln(A) = 1 + 4.4728 = 5.4728
4. y = (1 + 2.1698)/5.4728 = 3.1698/5.4728 = 0.579
5. Comparison: mu-law gave 0.591, so A-law compresses this sample slightly more

> [!success]- Answer
> **$y = 0.579$ (mu-law gave $0.591$)**

> [!warning] Trap
> Using the linear branch $A|x|/(1+\ln A)$ for $x = 0.1$. That branch only applies below $1/A = 0.0114$; picking the wrong branch gives $y = 8.76/5.4728 = 1.60$, which is impossible since $|y|$ cannot exceed 1.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷87.6` → breakpoint = **0.011416**; $x$ = 0.1 is above it, so the log branch applies.
> 2. `(1+ln(87.6×0.1))÷(1+ln(87.6))` → **3.16976÷5.47278** = **0.57927** ≈ **0.579**.
>
> The linear branch on $x$ = 0.1 would give **1.60**, an output above 1 — the immediate self-check that the branch is wrong.

### P3. A very quiet sample $x = 0.001$ is mu-law compressed. Find $y$ and explain the result.

**Given:** x = 0.001; mu = 255

**Solution:**

1. ln(1 + 255 x 0.001) = ln(1.255) = 0.2272
2. y = 0.2272/5.5452
3. = 0.0410

> [!success]- Answer
> **$y = 0.041$**

> [!warning] Trap
> Approximating $\ln(1+\mu x) \approx \ln(\mu x)$ here. For small $x$ the linear term dominates and the approximation breaks down: it would give $\ln(0.255)/5.545 = -0.247$, a negative output for a positive input.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `ln(1+255×0.001)` → **0.227136**; the approximation `ln(255×0.001)` = `ln(0.255)` → **−1.3665** is the trap.
> 2. `0.227136÷ln(256)` → $y$ = **0.040961** ≈ **0.0410**.
>
> The $\ln(1+\mu x) \approx \ln(\mu x)$ shortcut fails for small $x$ and even returns a negative output.

### P4. A uniform 8-bit PCM channel handles a talker $40\ \mathrm{dB}$ below full scale, and the same channel uses mu-law companding. Estimate the SQNR in each case.

**Given:** n = 8; signal 40 dB below full scale; mu = 255

**Solution:**

1. Uniform: SQNR = 6.02 x 8 + 1.76 = 49.92 dB at full scale
2. Loading penalty = 20 log10(10^-2) = -40 dB
3. Uniform SQNR = 49.92 - 40 = 9.9 dB
4. Companded: the effective step shrinks with amplitude, adding roughly 24 dB
5. Companded SQNR = 9.9 + 24 = 33.9 dB

> [!success]- Answer
> **Uniform $9.9\ \mathrm{dB}$; companded $\approx 33.9\ \mathrm{dB}$**

> [!warning] Trap
> Expecting the companded system to also give about $50\ \mathrm{dB}$. Companding equalizes SQNR across the range at roughly the *worst-case* value, it does not make quiet signals as good as loud ones at full scale.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `6.02×8+1.76` → **49.92** dB; `20×log(10^{-2})` → **−40** dB loading penalty.
> 2. `49.92−40` → uniform SQNR = **9.92** ≈ **9.9** dB.
> 3. `Ans+24` → companded SQNR ≈ **33.92** ≈ **33.9** dB, the roughly 24 dB companding gain.

## Traps & Exam Notes

- **Mixing up which law belongs to which region.** Mu-law with $\mu = 255$ is North America and Japan; A-law with $A = 87.6$ is Europe and the international standard. Swapping them is the classic regional-standard trap.
- **Using the wrong A-law branch.** For $|x| \geq 1/A = 0.0114$ use the log branch; below that use the linear branch. Applying the linear branch to a normal-sized sample gives $|y| > 1$, which is an immediate self-check that the branch is wrong.
- **Dividing by $\ln\mu$ instead of $\ln(1+\mu)$.** The normaliser is $\ln(1+\mu) = \ln 256 = 5.545$, not $\ln 255$.
- **Believing companding improves full-scale SQNR.** It does not — it *reduces* full-scale SQNR slightly and raises quiet-signal SQNR a lot, flattening the curve. Quoting a single improved number without saying where on the amplitude range is meaningless.
- **Treating a mu/A-law mismatch as a bit error.** A codec mismatch produces no errored bits at all; the samples decode cleanly to the wrong amplitudes and the result is audible distortion. Error counters read zero while the link sounds broken.
- **Confusing companding with compression in the source-coding sense.** Companding is a memoryless nonlinearity that reshapes quantization noise; it does not remove redundancy or reduce the bit rate. It changes where the noise lands, not how many bits are sent.

## See Also

- [[03_Quantization_Noise_and_SQNR]]
- [[02_PCM_Sampling,_Quantizing,_Encoding]]
- [[05_Delta_Modulation_and_ADM]]

---

[[03_Quantization_Noise_and_SQNR|⬅ 03]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Delta_Modulation_and_ADM|05 ➡]]
