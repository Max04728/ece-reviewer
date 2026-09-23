---
id: EST-03-11
title: "M-ary PSK and 16-QAM"
part: "04_EST"
area: "03_Digital_Communications"
topic: 11
tier: 2
depth: full
problem_count: 4
prereqs: ["[[10_BPSK_and_QPSK]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — M-ary PSK and 16-QAM

> [!abstract] Scope
> Trade bits per symbol against power for M-ary PSK and 16-QAM: find the symbol rate, bandwidth and minimum distance for a given bit rate and level count.

## Core Concept

> [!tip] Intuition
> Packing more bits into one symbol is just crowding more points into the same constellation circle or grid. Bandwidth drops as the symbol rate falls, but the points get closer together, so the same noise causes more errors.

**The fundamental trade.** With $M$ signalling states each symbol carries $k = \log_2 M$ bits, so for a fixed bit rate the symbol rate falls as $R_s = f_b/k$ and the occupied bandwidth falls with it. But the constellation now holds $M$ points in a fixed average-energy region, so the minimum distance between points shrinks and the receiver needs a higher $E_b/N_0$ for the same BER. Every $M$-ary scheme is therefore a *bandwidth-for-power* trade, and the design question is always which resource is scarcer.

**M-ary PSK.** All $M$ points lie on a circle of radius $\sqrt{E_s}$, so the envelope is constant — the decisive advantage when the transmitter amplifier must run saturated for efficiency. The minimum distance is $d_{min} = 2\sqrt{E_s}\sin(\pi/M)$, which falls as $M$ grows: for QPSK it is $\sqrt{2E_s}$, for 8-PSK $0.765\sqrt{E_s}$, for 16-PSK $0.390\sqrt{E_s}$. PSK's penalty grows quickly because the points can only spread angularly; beyond $M = 16$ the constellation becomes impractical and QAM takes over.

**16-QAM.** Quadrature amplitude modulation places points on a rectangular grid, varying both amplitude and phase. A square 16-QAM constellation is a $4\times4$ grid of points at odd-integer spacings; it can be built as two 4-level ASK signals in quadrature, which is exactly how the modulator is drawn. With points at $\pm d/2$ and $\pm 3d/2$ in each dimension, the average symbol energy is $2\times\frac{(d/2)^2+(3d/2)^2}{2} = 2.5d^2$, so $d = \sqrt{0.4E_s} = \sqrt{1.6E_b}$ since $E_s = 4E_b$.

**Why QAM beats PSK above 16 points.** Compare 16-QAM with 16-PSK at the same average energy. 16-PSK's minimum distance is $0.390\sqrt{E_s}$ while 16-QAM's is $0.632\sqrt{E_s}$ — about 4.2 dB better. QAM wins because it uses the amplitude dimension as well as the phase dimension, so it packs points more efficiently within the same circle. This is why 16-QAM, 64-QAM and 256-QAM appear in every modern bandwidth-limited standard (DVB-C, LTE, Wi-Fi) while 8-PSK is the practical upper limit for PSK.

**Bandwidth conventions and the exam recipe.** For unfiltered rectangular pulses the null-to-null bandwidth is $B = 2R_s = \dfrac{2f_b}{\log_2 M}$; with raised-cosine filtering it is $B = \dfrac{R_s}{2}(1+\alpha) = \dfrac{f_b(1+\alpha)}{2\log_2 M}$. The recipe is always the same: get $k = \log_2 M$, divide the bit rate by $k$ to get the symbol rate, then apply whichever bandwidth convention the problem states. Watch the two places errors hide — the level count $M$ versus the bit count $k$, and the factor 2 between null-to-null and Nyquist minimum.

**Power cost, quantitatively.** For a target BER, each doubling of $M$ costs roughly 3–4 dB in $E_b/N_0$ in AWGN. Going from QPSK (2 bits/symbol) to 16-QAM (4 bits/symbol) costs about 4 dB; 16-QAM to 64-QAM costs about 4 dB more; 64-QAM to 256-QAM about 6 dB more. Those numbers are the engineer's exchange rate: halving the bandwidth costs a few dB of link margin, which is why adaptive modulation switches constellation order according to the instantaneous channel quality.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Bits per symbol | $k = \log_2 M$ | M is the number of constellation points; k must be an integer for a practical scheme. |
| Symbol rate | $R_s = \frac{f_b}{\log_2 M}$ | Halving the symbol rate is the entire bandwidth benefit of multilevel signalling. |
| Symbol duration | $T_s = \frac{1}{R_s} = \frac{\log_2 M}{f_b}$ | Larger M means longer symbols, which is also why latency grows. |
| Null-to-null bandwidth | $B = 2 R_s = \frac{2 f_b}{\log_2 M}$ | Rectangular pulses, unfiltered. Standard convention for board problems. |
| Raised-cosine bandwidth | $B = \frac{R_s}{2}(1+\alpha) = \frac{f_b (1+\alpha)}{2\log_2 M}$ | Use when a roll-off factor is quoted. Note the factor 4 difference from the null-to-null form. |
| Minimum distance, M-PSK | $d_{min} = 2\sqrt{E_s}\sin\!\left(\frac{\pi}{M}\right)$ | Constant-envelope constellation. Falls rapidly with M. |
| Minimum distance, 16-QAM | $d_{min} = \sqrt{0.4 E_s} = \sqrt{1.6 E_b}$ | Square 16-QAM with average symbol energy Es = 2.5 d^2. |
| Generic QAM minimum distance | $d_{min} = \sqrt{\frac{6 E_s}{M-1}}$ | Average-energy result for a square M-QAM constellation. Gives sqrt(0.4 Es) at M = 16. |
| Symbol to bit energy | $E_s = E_b \log_2 M$ | The conversion that makes or breaks a BER comparison. 16-QAM has Es = 4Eb. |
| Spectral efficiency, ideal | $\eta = \frac{f_b}{B} = \frac{\log_2 M}{2}\ \mathrm{bit/s/Hz}$ | Null-to-null convention. Doubles to log2 M bits/s/Hz if measured against the Nyquist minimum Rs/2. |

## Interactive Widget

**Constellation Diagram Explorer**

![[Constellation_Diagram_Explorer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A 16-QAM link carries $10\ \mathrm{Mbps}$ with unfiltered rectangular pulses. Find the symbol rate and the null-to-null bandwidth.

**Given:** fb = 10 Mbps; M = 16

**Solution:**

1. k = log2(16) = 4 bits per symbol
2. Rs = fb/k = 10 000 000/4 = 2 500 000 baud
3. B = 2 Rs = 5 000 000 Hz

> [!success]- Answer
> **$R_s = 2.5\ \mathrm{MBd}$, $B = 5\ \mathrm{MHz}$**

> [!warning] Trap
> Using $k = 16$ instead of $\log_2 16 = 4$, giving an absurd $625\ \mathrm{kBd}$. The level count and the bit count per symbol differ by a logarithm.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `log(16)÷log(2)` → $k$ = **4** bits per symbol.
> 2. `10E6÷4` → $R_s$ = **2 500 000** Bd; `Ans×2` → $B$ = **5 000 000** Hz = **5** MHz.
>
> Divide by $\log_2 M$ = 4, never by $M$ = 16, which would give an absurd 625 kBd.

### P2. An $8$-PSK modem transmits at $4800\ \mathrm{bps}$. Find the symbol rate, symbol duration and minimum bandwidth.

**Given:** fb = 4800 bps; M = 8 (8-PSK)

**Solution:**

1. k = log2(8) = 3 bits per symbol
2. Rs = 4800/3 = 1600 baud
3. Ts = 1/1600 = 625 us
4. Nyquist minimum B = Rs/2 = 800 Hz

> [!success]- Answer
> **$R_s = 1600\ \mathrm{Bd}$, $T_s = 625\ \mu\mathrm{s}$, $B_{min} = 800\ \mathrm{Hz}$**

> [!warning] Trap
> Quoting $1600\ \mathrm{Hz}$ as the minimum bandwidth. Nyquist allows $2B$ symbols per second, so a $1600\ \mathrm{Bd}$ stream needs only $800\ \mathrm{Hz}$; the null-to-null figure of $3200\ \mathrm{Hz}$ is a different convention.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `log(8)÷log(2)` → $k$ = **3**; `4800÷3` → $R_s$ = **1600** Bd.
> 2. `1÷1600` → $T_s$ = **6.25×10^{-4}** s = **625** µs.
> 3. `1600÷2` → $B_{min}$ = **800** Hz, the Nyquist minimum rather than the 3200 Hz null-to-null figure.

### P3. A 64-QAM system carries $30\ \mathrm{Mbps}$. Find the symbol rate and the occupied bandwidth under the null-to-null convention.

**Given:** fb = 30 Mbps; M = 64

**Solution:**

1. k = log2(64) = 6 bits per symbol
2. Rs = 30 000 000/6 = 5 000 000 baud
3. B = 2 Rs = 10 000 000 Hz

> [!success]- Answer
> **$R_s = 5\ \mathrm{MBd}$, $B = 10\ \mathrm{MHz}$**

> [!warning] Trap
> Assuming 64-QAM is unusable without a huge power increase and refusing the problem. It costs about 4 dB over 16-QAM and about 8 dB over QPSK — a real but finite penalty that a good link budget can absorb.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `log(64)÷log(2)` → $k$ = **6** bits per symbol.
> 2. `30E6÷6` → $R_s$ = **5 000 000** Bd; `Ans×2` → $B$ = **10 000 000** Hz = **10** MHz.

### P4. Compare the bandwidth and the minimum distance of QPSK and 16-QAM at a common bit rate of $20\ \mathrm{Mbps}$ and a common average symbol energy $E_s$.

**Given:** fb = 20 Mbps; M = 4 and M = 16; same Es

**Solution:**

1. QPSK: k = 2, Rs = 10 MBd, B = 20 MHz
2. 16-QAM: k = 4, Rs = 5 MBd, B = 10 MHz
3. Minimum distance: QPSK d = sqrt(2 Es) = 1.414 sqrt(Es)
4. 16-QAM d = sqrt(0.4 Es) = 0.632 sqrt(Es)
5. Distance penalty = 20 log10(1.414/0.632) = 20 log10(2.236) = 6.99 dB

> [!success]- Answer
> **16-QAM halves the bandwidth but needs about $7\ \mathrm{dB}$ more symbol energy**

> [!warning] Trap
> Comparing the distances using $E_b$ rather than $E_s$ and concluding 16-QAM is only about 4 dB worse. Both answers appear in textbooks: at equal $E_s$ the gap is $7\ \mathrm{dB}$, at equal $E_b$ it is about $4\ \mathrm{dB}$ because 16-QAM spreads the same energy over twice as many bits.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20E6÷(log(4)÷log(2))×2` → QPSK $B$ = **20×10^6** Hz; `20E6÷(log(16)÷log(2))×2` → 16-QAM $B$ = **10×10^6** Hz.
> 2. `√2` → **1.4142** and `√0.4` → **0.6325**, the two $d_{min}$ in $\sqrt{E_s}$ units.
> 3. `20×log(1.4142÷0.6325)` → **6.9897** dB ≈ **7** dB penalty when $E_s$, not $E_b$, is held constant.

## Traps & Exam Notes

- **Using $M$ where $\log_2 M$ belongs.** The symbol rate divides the bit rate by the *bits per symbol*, not by the number of constellation points. For 16-QAM that is 4, not 16.
- **Comparing minimum distances at equal $E_s$ and reporting it as a BER penalty.** At equal $E_b$ the penalty is about 3 dB smaller than at equal $E_s$. State which energy you are holding constant — the two answers differ by $10\log_{10}(\log_2 M)$.
- **Assuming M-ary PSK scales indefinitely.** Its points can only spread in angle, so $d_{min}$ collapses: 16-PSK is about $4\ \mathrm{dB}$ worse than 16-QAM and rarely used. Above $M = 16$, QAM is the standard choice.
- **Believing higher-order QAM needs a linear amplifier only.** All QAM has amplitude variation, so it never has a constant envelope and always needs a linear (backed-off) amplifier. M-PSK is the constant-envelope choice; the two cannot be had together.
- **Mixing the null-to-null and Nyquist bandwidth conventions.** $B = 2R_s$ and $B = R_s/2$ differ by a factor of 4 and both appear in textbooks. Check whether the question says null-to-null, minimum Nyquist bandwidth, or quotes a roll-off factor.
- **Forgetting that 16-QAM's two quadrature 4-level ASK components are independent.** Each carries 2 bits, so a symbol error in one dimension corrupts only those 2 bits — which is why Gray-coded 16-QAM has a symbol error rate roughly twice its bit error rate, not four times.

## See Also

- [[10_BPSK_and_QPSK]]
- [[12_Constellation_and_BER_Comparison]]
- [[07_Inter-Symbol_Interference_and_Nyquist_Criterion]]
- [[15_Shannon-Hartley_Capacity]]

---

[[10_BPSK_and_QPSK|⬅ 10]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Constellation_and_BER_Comparison|12 ➡]]
