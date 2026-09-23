---
id: EST-03-07
title: "Inter-Symbol Interference and Nyquist Criterion"
part: "04_EST"
area: "03_Digital_Communications"
topic: 7
tier: 2
depth: full
problem_count: 4
prereqs: ["[[06_Line_Coding_Schemes]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Inter-Symbol Interference and Nyquist Criterion

> [!abstract] Scope
> Find the maximum distortion-free symbol rate a channel of bandwidth B can carry, and use the raised-cosine roll-off factor to trade excess bandwidth against symbol rate.

## Core Concept

> [!tip] Intuition
> Intersymbol interference is the smear from neighbouring symbols arriving at the sampling instant. Nyquist's answer is to shape every pulse so that it is exactly zero at all other sampling instants — it can be fat, as long as it is zero in the right places.

**What causes ISI.** A channel of finite bandwidth cannot pass an ideal rectangular pulse, so each transmitted symbol spreads in time and its tail overlaps the sampling instants of its neighbours. The received sample is then the intended symbol plus a weighted sum of its neighbours — *intersymbol interference*. Unlike noise, ISI is deterministic and grows as the symbol rate rises, so it sets a hard ceiling on rate that no amount of transmit power can raise.

**The Nyquist zero-ISI criterion.** ISI vanishes at the sampling instants if the overall pulse shape $p(t)$ satisfies $p(kT_s) = 0$ for every nonzero integer $k$, with $p(0) = 1$. The ideal $\mathrm{sinc}$ pulse does this exactly, and its bandwidth is $R_s/2$ — hence the Nyquist maximum symbol rate $R_s \leq 2B$ for a channel of bandwidth $B$. Equivalently, a channel of bandwidth $B$ can carry at most $2B$ independent symbols per second with zero ISI. This is the *Nyquist criterion*, and combined with $M$-ary signalling it gives the maximum data rate $R = 2B\log_2 M$.

**Why the ideal sinc is not used.** A brick-wall ideal low-pass filter is non-causal and unrealizable, and the sinc's tails decay as $1/t$, so a small timing error produces a large ISI and the receiver becomes impossibly sensitive to clock jitter. Practical systems use the *raised-cosine* family, which satisfies the zero-ISI criterion while having a gradual, realizable roll-off.

**Raised cosine and the roll-off factor.** The raised-cosine spectrum is flat up to $\dfrac{R_s}{2}(1-\alpha)$ and rolls off to zero at $\dfrac{R_s}{2}(1+\alpha)$, where $\alpha \in [0,1]$ is the roll-off (excess-bandwidth) factor. Its bandwidth is therefore $B = \dfrac{R_s}{2}(1+\alpha)$. Setting $\alpha = 0$ recovers the ideal brick wall ($B = R_s/2$); $\alpha = 1$ doubles the bandwidth to a full $R_s$. In practice $\alpha$ is chosen between 0.2 and 0.5: small $\alpha$ buys spectral efficiency at the cost of a longer, more jitter-sensitive impulse response.

**The design loop you will actually be asked to run.** Given a bit rate $R$ and a modulation level count $M$, first get the symbol rate $R_s = R/\log_2 M$, then get the bandwidth $B = \dfrac{R_s}{2}(1+\alpha)$. Running it backwards: given $B$ and $\alpha$, $R_s = \dfrac{2B}{1+\alpha}$ and $R = \dfrac{2B\log_2 M}{1+\alpha}$. The *spectral efficiency* follows immediately:
$$\eta = \dfrac{R}{B} = \dfrac{2\log_2 M}{1+\alpha}$$
bits per second per hertz, which is 2 bits/s/Hz for QPSK with $\alpha = 0$ and 1 bit/s/Hz for QPSK with $\alpha = 1$.

**ISI versus noise, and equalization.** ISI and thermal noise are traded against each other. Widening the bandwidth (larger $\alpha$) reduces the filter's noise-equivalent bandwidth but shortens the impulse response; narrowing it does the reverse. When the channel is worse than a raised cosine — for example a twisted pair with dispersion — an equalizer is added to force the overall response back to the zero-ISI shape. That is the subject of the eye-diagram note.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Nyquist maximum symbol rate | $R_s \leq 2B$ | Zero-ISI limit for a channel of bandwidth B. Symbols per second, not bits per second. |
| Nyquist maximum data rate | $R = 2B \log_2 M$ | The classic Nyquist bit-rate formula. M is the number of signalling levels. |
| Raised-cosine bandwidth | $B = \frac{R_s}{2}(1+\alpha)$ | alpha is the roll-off factor, 0 to 1. This is the *total* bandwidth including excess. |
| Symbol rate from bandwidth | $R_s = \frac{2B}{1+\alpha}$ | Invert the bandwidth relation. Setting alpha = 0 recovers Rs = 2B. |
| Roll-off factor | $\alpha = \frac{B - R_s/2}{R_s/2} = \frac{2B}{R_s} - 1$ | Excess bandwidth divided by the Nyquist minimum. alpha = 0 is the ideal brick wall. |
| Spectral efficiency | $\eta = \frac{R}{B} = \frac{2\log_2 M}{1+\alpha}\ \mathrm{bit/s/Hz}$ | Caps out at 2 bits/s/Hz per dimension for alpha = 0; Shannon's capacity is the true ceiling. |
| Nyquist minimum bandwidth | $B_{min} = \frac{R_s}{2} = \frac{R}{2\log_2 M}$ | The alpha = 0 ideal. Unrealizable filter but the reference number boards compare against. |
| Excess bandwidth | $B_{excess} = \frac{\alpha R_s}{2}$ | The part of the spectrum spent purely on making the filter realizable. |
| Zero-ISI condition | $p(kT_s) = 0 \ \mathrm{for\ all\ } k \neq 0, \quad p(0)=1$ | Nyquist's first criterion. Any pulse shape satisfying this is ISI-free at the sampling instants. |
| Binary special case | $R = 2B \ \mathrm{for}\ M = 2$ | Nyquist's original result for binary signalling: one bit per symbol, 2 symbols per Hz. |

## Worked Problems

### P1. A channel has a bandwidth of $4\ \mathrm{kHz}$ and uses 8-level signalling. Find the maximum data rate with zero ISI.

**Given:** B = 4 kHz; M = 8 levels

**Solution:**

1. Nyquist: R = 2B log2 M
2. log2(8) = 3 bits per symbol
3. R = 2 x 4000 x 3
4. = 24 000 bps

> [!success]- Answer
> **$24\ \mathrm{kbps}$**

> [!warning] Trap
> Using $R = 2B = 8\ \mathrm{kbps}$ and ignoring the level count. The $2B$ limit is on *symbols*; each 8-level symbol carries 3 bits.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `log(8)÷log(2)` → **3** bits per symbol (`log` is base 10, so divide by `log 2` for base 2).
> 2. `2×4000×3` → $R$ = **24 000** bps = **24** kbps.
>
> The $2B$ limit is on symbols; the level count multiplies the rate by $\log_2 M$.

### P2. A raised-cosine filtered link uses a roll-off factor of $0.5$ over a $6\ \mathrm{kHz}$ channel with 4-level signalling. Find the symbol rate and the data rate.

**Given:** B = 6 kHz; alpha = 0.5; M = 4

**Solution:**

1. Rs = 2B/(1 + alpha) = 12 000/1.5 = 8000 baud
2. log2(4) = 2 bits per symbol
3. R = Rs x 2 = 16 000 bps
4. Check: B = (Rs/2)(1+alpha) = 4000 x 1.5 = 6000 Hz

> [!success]- Answer
> **$R_s = 8000\ \mathrm{Bd}$, $R = 16\ \mathrm{kbps}$**

> [!warning] Trap
> Applying $R_s = 2B = 12\ \mathrm{kBd}$ and then forgetting the $(1+\alpha)$ penalty. Roll-off is *excess* bandwidth that does not carry symbols.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×6000÷1.5` → $R_s$ = **8000** Bd ($\alpha$ = 0.5 means dividing by $1+\alpha$ = 1.5).
> 2. `Ans×(log(4)÷log(2))` → $R$ = **16 000** bps; check `4000×1.5` → **6000** Hz.

### P3. A 64 kbps link uses QPSK with a roll-off of $0.5$. Find the required channel bandwidth.

**Given:** R = 64 kbps; M = 4 (QPSK); alpha = 0.5

**Solution:**

1. Rs = R/log2 M = 64 000/2 = 32 000 baud
2. B = (Rs/2)(1 + alpha) = 16 000 x 1.5
3. = 24 000 Hz

> [!success]- Answer
> **$24\ \mathrm{kHz}$**

> [!warning] Trap
> Using $B = R/2 = 32\ \mathrm{kHz}$ (treating QPSK as if it were binary) and then, separately, forgetting the roll-off. Two independent factors of the symbol rate are involved: $\log_2 M$ and $(1+\alpha)$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `64000÷(log(4)÷log(2))` → $R_s$ = **32 000** Bd.
> 2. `Ans÷2×1.5` → $B$ = **24 000** Hz = **24** kHz.
>
> Both factors sit on the symbol rate: divide by $\log_2 M$ first, then multiply by $R_s/2$ and $(1+\alpha)$.

### P4. A system transmits at $2400\ \mathrm{baud}$ with a roll-off factor of $0.25$. Find the occupied bandwidth and the excess bandwidth.

**Given:** Rs = 2400 baud; alpha = 0.25

**Solution:**

1. Nyquist minimum = Rs/2 = 1200 Hz
2. B = 1200 x (1 + 0.25) = 1500 Hz
3. Excess = B - Rs/2 = 1500 - 1200 = 300 Hz
4. Check: alpha x Rs/2 = 0.25 x 1200 = 300 Hz

> [!success]- Answer
> **$B = 1500\ \mathrm{Hz}$, excess $= 300\ \mathrm{Hz}$**

> [!warning] Trap
> Applying the roll-off to the symbol rate instead of half the symbol rate, giving $2400 \times 1.25 = 3000\ \mathrm{Hz}$ — exactly double the correct answer.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2400÷2` → Nyquist minimum = **1200** Hz.
> 2. `Ans×1.25` → $B$ = **1500** Hz and `Ans−1200` → excess = **300** Hz.
>
> The roll-off multiplies $R_s/2$ = 1200 Hz, not $R_s$ = 2400 Hz; using 2400 gives 3000 Hz, exactly double.

## Traps & Exam Notes

- **Confusing the Nyquist criterion with the Shannon capacity.** Nyquist's $2B\log_2 M$ assumes a *noiseless* channel and is limited by bandwidth and levels; Shannon's $B\log_2(1+S/N)$ accounts for noise and is the true ceiling. A Nyquist answer that exceeds the Shannon capacity for the same channel is physically impossible.
- **Applying $(1+\alpha)$ to the bit rate instead of the symbol rate.** The roll-off multiplies $R_s/2$, not $R/2$. For multilevel signalling these differ by $\log_2 M$, so the error can be a factor of 3 or 4.
- **Forgetting that $R_s \leq 2B$ limits symbols, not bits.** With $M$ levels the bit rate is $\log_2 M$ times larger, which is the whole reason multilevel signalling exists.
- **Assuming $\alpha = 0$ is achievable.** The ideal brick-wall filter is non-causal with an impulse response of infinite duration; every real system has $\alpha > 0$. Quoting a design with $\alpha = 0$ is quoting an unrealizable bound.
- **Believing a larger roll-off always costs efficiency.** It costs bandwidth for a given symbol rate, but it also shortens the impulse response, which reduces sensitivity to timing jitter and eases equalization. In a jitter-dominated link a larger $\alpha$ can be the better engineering choice.
- **Treating ISI as noise that averaging can remove.** ISI is signal-dependent and deterministic, so integrating longer does not reduce it. Only pulse shaping or equalization fixes it.

## See Also

- [[08_Eye_Diagrams_and_Equalization]]
- [[12_Constellation_and_BER_Comparison]]
- [[15_Shannon-Hartley_Capacity]]
- [[06_Line_Coding_Schemes]]

---

[[06_Line_Coding_Schemes|⬅ 06]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Eye_Diagrams_and_Equalization|08 ➡]]
