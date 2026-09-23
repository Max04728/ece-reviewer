---
id: EST-03-15
title: "Shannon-Hartley Capacity"
part: "04_EST"
area: "03_Digital_Communications"
topic: 15
tier: 2
depth: full
problem_count: 5
prereqs: ["[[14_Information_Theory_and_Entropy]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 15 — Shannon-Hartley Capacity

> [!abstract] Scope
> Apply Shannon-Hartley to find the maximum error-free bit rate of a noisy channel, invert it for the SNR a target rate demands, and use it to compare bandwidth against power.

## Core Concept

> [!tip] Intuition
> A noisy channel is a pipe with a hard size limit. Adding bandwidth widens the pipe; adding signal power pushes the noise floor down. Shannon's formula says exactly how much water fits, and no clever coding can beat it.

**The theorem.** For a channel of bandwidth $B$ hertz perturbed by additive white Gaussian noise of power $N$, the maximum rate at which information can be transmitted with arbitrarily small error probability is $C = B\log_2\!\left(1 + \dfrac{S}{N}\right)$ bits per second. The word *arbitrarily* is doing important work: the theorem promises that for any rate below $C$ there exists a code achieving any required error probability, and that above $C$ no code can. It does not say how to build the code — that took fifty years of research, ending with turbo and LDPC codes that come within a fraction of a dB of the bound.

**Reading the formula.** $S/N$ is a *power* ratio, so a channel specified as $30\ \mathrm{dB}$ SNR has $S/N = 1000$ inside the logarithm, not 30. The result is tiny-sensitive to SNR at low SNR and almost insensitive at high SNR: at $S/N = 1000$ the logarithm is 9.97, while doubling the power to $S/N = 2000$ raises it only to 10.97 — 1 bit per hertz for a 3 dB power increase. Bandwidth, by contrast, enters linearly and is the more valuable resource at high SNR.

**The classic comparison — bandwidth versus power.** Two channels can have the same capacity with wildly different resources. A $3\ \mathrm{kHz}$ channel at $30\ \mathrm{dB}$ SNR gives about $29.9\ \mathrm{kbps}$, and a $30\ \mathrm{kHz}$ channel at only $0\ \mathrm{dB}$ SNR ($S/N = 1$) gives $30\ \mathrm{kHz} \times \log_2 2 = 30\ \mathrm{kbps}$ — the same rate from ten times the bandwidth and one-thousandth the power. This is the whole argument behind spread spectrum and ultra-wideband: when power is scarce and spectrum is available, trade one for the other. The exchange rate is not free, though: at low SNR the capacity per hertz collapses toward zero, and the required power per bit actually *falls* toward the Shannon limit.

**The Shannon limit.** As bandwidth grows without bound for a fixed signal power, capacity does not grow without bound — it approaches $C_{\infty} = 1.4427\,S/N_0$ bps, and the corresponding minimum energy per bit is $E_b/N_0 = \ln 2 = -1.59\ \mathrm{dB}$. No scheme, however wideband or however clever, can communicate reliably below $-1.59\ \mathrm{dB}$. Every real system sits above this: BPSK needs $9.6\ \mathrm{dB}$ for $10^{-5}$, uncoded QPSK with a practical $10^{-6}$ target sits near $13.5\ \mathrm{dB}$, and good modern codes operate within 1–2 dB of the limit at low rates.

**Spectral efficiency and the practical ceiling.** Dividing by bandwidth gives the spectral efficiency $C/B = \log_2(1+S/N)$ bits per second per hertz. This is the number that connects Shannon to the modulation notes: to achieve $\eta = 4$ bits/s/Hz you need $S/N = 2^4 - 1 = 15$, i.e. $11.8\ \mathrm{dB}$; to achieve $\eta = 6$ you need $S/N = 63$, i.e. $18\ \mathrm{dB}$. Higher-order QAM sets a *bandwidth* target, and Shannon then tells you the SNR that target demands — which is exactly how adaptive modulation decides the constellation order for the current channel.

**Where the limits actually bite.** Inverting the formula for a required rate gives $S/N = 2^{C/B} - 1$, and this is the workhorse exam calculation. Watch three things: convert dB to a linear power ratio before substituting; the difference $C/B$ is in bits per second per hertz and must be formed *before* exponentiating; and a system quoted at 'capacity' in practice achieves 40–70% of it once finite blocklength, latency and implementation loss are included. Shannon's $C$ is a ceiling, not a forecast.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Shannon-Hartley capacity | $C = B\log_2\!\left(1 + \frac{S}{N}\right)$ | AWGN channel. S/N is a power ratio; convert from dB with 10^(dB/10) first. |
| Capacity in base-10 form | $C = 3.3219\,B\log_{10}\!\left(1 + \frac{S}{N}\right)$ | Convenient when only a base-10 log is available. 3.3219 = log2(10). |
| Spectral efficiency | $\frac{C}{B} = \log_2\!\left(1 + \frac{S}{N}\right)\ \mathrm{bit/s/Hz}$ | The bridge to modulation: eta = 4 needs S/N = 15 (11.8 dB). |
| Required SNR for a target rate | $\frac{S}{N} = 2^{C/B} - 1$ | Form C/B first, then exponentiate. Subtracting 1 matters at low spectral efficiency. |
| SNR conversion | $\frac{S}{N}\bigg\lvert _{\mathrm{lin}} = 10^{\mathrm{SNR_{dB}}/10}$ | 30 dB is 1000, not 30. This is the single most common error in the topic. |
| Shannon limit on Eb/N0 | $\frac{E_b}{N_0}\bigg\lvert _{min} = \ln 2 = -1.59\ \mathrm{dB}$ | The absolute floor for reliable communication as B goes to infinity. No scheme can beat it. |
| Wideband capacity limit | $C_{\infty} = \frac{S}{N_0}\log_2 e = 1.4427\,\frac{S}{N_0}$ | Capacity saturates as bandwidth grows for fixed signal power. |
| Shannon relation for Eb/N0 | $\frac{E_b}{N_0} = \frac{2^{C/B} - 1}{C/B}$ | Links spectral efficiency to the energy per bit required. Approaches ln 2 as C/B approaches 0. |
| Capacity per hertz doubling rule | $\Delta C = B\ \mathrm{for\ each\ doubling\ of}\ (1+S/N)$ | At high SNR, doubling the power adds about 1 bit/s/Hz, i.e. 3 dB per bit. |
| Nyquist contrast | $R = 2B\log_2 M \quad (\mathrm{noiseless})$ | Nyquist limits rate by bandwidth and levels only. Shannon is the noisy-channel ceiling and always binds first. |

## Worked Problems

### P1. A telephone channel has a $3\ \mathrm{kHz}$ bandwidth and a $30\ \mathrm{dB}$ signal-to-noise ratio. Find the Shannon capacity.

**Given:** B = 3 kHz; SNR = 30 dB

**Solution:**

1. Convert: S/N = 10^(30/10) = 1000
2. 1 + S/N = 1001
3. log2(1001) = ln(1001)/ln(2) = 6.9088/0.6931 = 9.967
4. C = 3000 x 9.967 = 29 900 bps

> [!success]- Answer
> **$C \approx 29.9\ \mathrm{kbps}$**

> [!warning] Trap
> Substituting 30 into the logarithm, giving $C = 3000\log_2 31 = 14.9\ \mathrm{kbps}$ — exactly half the correct answer. The SNR must be the linear power ratio 1000.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(30÷10)` → **1000** and `1+Ans` → **1001** (never place the dB figure itself inside the log).
> 2. `3000×log(1001)÷log(2)` → $C$ = **29 902** bps ≈ **29.9** kbps.
>
> Using 30 in the log gives 3000×log2(31) = **14.9** kbps, exactly half the correct capacity.

### P2. A $1\ \mathrm{MHz}$ channel operates at $20\ \mathrm{dB}$ SNR. Find the capacity and the spectral efficiency.

**Given:** B = 1 MHz; SNR = 20 dB

**Solution:**

1. S/N = 10^(20/10) = 100
2. log2(101) = 4.6151/0.6931 = 6.658
3. C = 1e6 x 6.658 = 6.658e6 bps
4. Spectral efficiency = C/B = 6.658 bit/s/Hz

> [!success]- Answer
> **$C = 6.66\ \mathrm{Mbps}$, $\eta = 6.66\ \mathrm{bit/s/Hz}$**

> [!warning] Trap
> Using $\log_{10}(101) = 2.004$ and answering $2\ \mathrm{Mbps}$. The formula's logarithm is base 2; multiplying by 3.3219 converts a base-10 result correctly.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(20÷10)` → **100**; `1+Ans` → **101**.
> 2. `log(101)÷log(2)` → $C/B$ = **6.6582** bit/s/Hz.
> 3. `Ans×1E6` → $C$ = **6.658×10^6** bps ≈ **6.66** Mbps.

### P3. A $5\ \mathrm{kHz}$ channel must carry $50\ \mathrm{kbps}$. Find the minimum SNR in dB.

**Given:** B = 5 kHz; C = 50 kbps

**Solution:**

1. Spectral efficiency: C/B = 50 000/5000 = 10 bit/s/Hz
2. S/N = 2^10 - 1 = 1024 - 1 = 1023
3. SNR_dB = 10 log10(1023) = 10 x 3.0099
4. = 30.1 dB

> [!success]- Answer
> **$\mathrm{SNR} \geq 30.1\ \mathrm{dB}$**

> [!warning] Trap
> Forgetting the $-1$ and answering $\log_{10}(1024) = 30.10\ \mathrm{dB}$ — which happens to round identically here, hiding the error. At low spectral efficiency the $-1$ dominates: for $C/B = 1$ the answer is $10\log_{10}1 = 0\ \mathrm{dB}$, not $3\ \mathrm{dB}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `50000÷5000` → $C/B$ = **10** bit/s/Hz, formed before exponentiating.
> 2. `2^10−1` → $S/N$ = **1023**.
> 3. `10×log(1023)` → **30.099** dB ≈ **30.1** dB.
>
> Here the $−1$ changes nothing visible, but at $C/B$ = 1 it is the whole answer: 0 dB, not 3 dB.

### P4. Compare two channels that deliver the same capacity: a $3\ \mathrm{kHz}$ channel at $30\ \mathrm{dB}$ SNR, and a wideband channel at $0\ \mathrm{dB}$ SNR. Find the bandwidth the second needs.

**Given:** C = 29.9 kbps; SNR2 = 0 dB (S/N = 1)

**Solution:**

1. For S/N = 1: 1 + S/N = 2, so log2(2) = 1 bit/s/Hz
2. C = B x 1, so B = C = 29 900 Hz
3. The second channel needs about 30 kHz, ten times the bandwidth, at one-thousandth the power
4. Power ratio: 30 dB - 0 dB = 30 dB, i.e. 1000 times less power

> [!success]- Answer
> **$B \approx 29.9\ \mathrm{kHz}$ at $0\ \mathrm{dB}$ SNR**

> [!warning] Trap
> Assuming the wideband channel must be 1000 times wider because it has 1000 times less power. Capacity grows *linearly* with bandwidth, not logarithmically, so only about ten times the bandwidth is needed.

### P5. A system must achieve a spectral efficiency of $4\ \mathrm{bit/s/Hz}$. Find the minimum SNR, and state which modulation order is implied.

**Given:** C/B = 4 bit/s/Hz

**Solution:**

1. S/N = 2^4 - 1 = 16 - 1 = 15
2. SNR_dB = 10 log10(15) = 11.76 dB
3. Nyquist for a noiseless channel: R = 2B log2 M, so C/B = 4 implies 2 log2 M >= 4
4. log2 M >= 2, so M >= 4: at least 16-QAM with raised-cosine filtering, or 4-ary signalling at the ideal Nyquist limit

> [!success]- Answer
> **$\mathrm{SNR} \geq 11.8\ \mathrm{dB}$; 16-QAM is the practical choice**

> [!warning] Trap
> Reading $C/B = 4$ as requiring $M = 4$ (QPSK). The Nyquist factor of 2 means QPSK gives only $2\ \mathrm{bit/s/Hz}$ at the ideal limit, so 4 bit/s/Hz needs 16-QAM — and the Shannon result tells you it also needs at least 11.8 dB.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2^4−1` → $S/N$ = **15**.
> 2. `10×log(15)` → **11.761** dB ≈ **11.8** dB.
> 3. `2^(4÷2)` → **4**, so $M \geq 4$ at the ideal Nyquist limit and **16-QAM** is the practical choice once roll-off is budgeted.

## Traps & Exam Notes

- **Substituting the dB value of SNR directly into the logarithm.** $30\ \mathrm{dB}$ means $S/N = 1000$. Using 30 understates capacity by roughly a factor of two in the common 30 dB case.
- **Using $\log_{10}$ instead of $\log_2$.** The capacity formula is base 2 because capacity is in bits. If you compute with base 10, multiply by 3.3219 — or equivalently use $C = 3.3219\,B\log_{10}(1+S/N)$.
- **Dropping the $-1$ when inverting the formula.** At high SNR it is negligible, which is precisely why it goes unnoticed until a low-SNR problem (or a $C/B = 1$ problem) makes the answer wrong by 3 dB.
- **Believing capacity grows without bound with bandwidth.** For a fixed signal power, $C$ saturates at $1.4427\,S/N_0$. Infinite bandwidth does not give infinite rate; it gives $E_b/N_0 = -1.59\ \mathrm{dB}$ as the hard floor.
- **Treating Shannon capacity as an achievable design target.** It is an upper bound requiring infinite block length and infinite delay. Real systems achieve perhaps 40–70% of it; a link budget built on $C$ itself will fail.
- **Confusing Shannon's capacity with Nyquist's rate formula.** Nyquist's $2B\log_2 M$ is a *noiseless* bandwidth-and-levels limit with no error-probability statement. When both are quoted, the Shannon value binds first, and a Nyquist answer exceeding the Shannon capacity is automatically wrong.

## See Also

- [[14_Information_Theory_and_Entropy]]
- [[16_Error_Control_Hamming_and_CRC]]
- [[12_Constellation_and_BER_Comparison]]
- [[07_Inter-Symbol_Interference_and_Nyquist_Criterion]]

---

[[14_Information_Theory_and_Entropy|⬅ 14]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[16_Error_Control_Hamming_and_CRC|16 ➡]]
