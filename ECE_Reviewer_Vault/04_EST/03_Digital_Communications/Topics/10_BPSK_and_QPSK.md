---
id: EST-03-10
title: "BPSK and QPSK"
part: "04_EST"
area: "03_Digital_Communications"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_ASK,_OOK_and_FSK]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — BPSK and QPSK

> [!abstract] Scope
> Analyse BPSK and QPSK: convert between bit rate and symbol rate, find the occupied bandwidth, and relate BER to Eb/N0 for the two most common phase-shift schemes.

## Core Concept

> [!tip] Intuition
> BPSK flips the carrier between 0 and 180 degrees, one bit per symbol. QPSK uses four phases and packs two bits into each, so it sends the same data in half the symbol rate — the same bandwidth saving, with identical error performance per bit.

**BPSK.** Binary phase shift keying maps 1 and 0 to two carrier phases separated by $180^\circ$. The signal is $s(t) = A\cos(2\pi f_c t + \pi b)$ for bit $b \in \{0,1\}$, which is equivalent to multiplying the carrier by $\pm 1$. Because the two symbols are antipodal — the maximum possible Euclidean distance for a given energy — BPSK is the most power-efficient binary scheme there is. Detection is coherent: the receiver must recover the carrier phase, usually with a squaring loop or a Costas loop, because a $180^\circ$ phase ambiguity otherwise inverts the whole message.

**BPSK bandwidth and error rate.** One bit per symbol means the symbol rate equals the bit rate, $R_s = f_b$, and the null-to-null bandwidth of the rectangular-pulse spectrum is $B = 2f_b$. The bit error probability over an AWGN channel with coherent detection is $P_e = Q\!\left(\sqrt{2E_b/N_0}\right)$, the best of any binary scheme. Useful landmarks:
$$E_b/N_0 = 6.8\ \mathrm{dB}$$
gives $10^{-3}$, $8.4\ \mathrm{dB}$ gives $10^{-4}$, $9.6\ \mathrm{dB}$ gives $10^{-5}$, and $10.5\ \mathrm{dB}$ gives $10^{-6}$.

**QPSK.** Quadrature phase shift keying uses four phases — conventionally $45^\circ$, $135^\circ$, $225^\circ$, $315^\circ$ — so each symbol carries $\log_2 4 = 2$ bits. The symbol rate is therefore half the bit rate, $R_s = f_b/2$, and the null-to-null bandwidth is $B = 2R_s = f_b$: **QPSK halves the bandwidth of BPSK for the same bit rate**. The constellation can be viewed as two independent BPSK signals on the in-phase and quadrature carriers, which is exactly how a QPSK modulator is built — a serial-to-parallel converter feeding two BPSK modulators driven by carriers in quadrature.

**Why QPSK does not cost power.** Because the two quadrature carriers are orthogonal, the I and Q BPSK channels do not interfere. Each carries its own bits with its own $E_b$, and the symbol energy is $E_s = 2E_b$. Substituting that into the BPSK error expression gives exactly $P_e = Q\!\left(\sqrt{2E_b/N_0}\right)$ — *the same BER as BPSK at the same $E_b/N_0$*. QPSK is therefore a free 2:1 bandwidth saving in the ideal case. The catch is that it requires a linear transmitter, because a $180^\circ$ phase jump passes through the origin and drives an envelope to zero.

**Offsets and variants.** In QPSK the I and Q channels can change simultaneously, causing instantaneous $180^\circ$ transitions and large envelope dips when the signal is filtered and then amplified by a nonlinear (saturated) amplifier. *Offset QPSK (OQPSK)* delays the Q channel by half a symbol so at most one channel changes at a time, limiting phase jumps to $90^\circ$ and keeping the envelope nearly constant. *$\pi/4$-QPSK* alternates between two rotated QPSK constellations so that every transition is at most $135^\circ$ and the signal never passes through the origin, allowing non-coherent differential detection; it was used in IS-136 and PHS. These variants preserve QPSK's bandwidth and BER while improving spectral regrowth in real amplifiers.

**Reading exam questions.** The two conversions that decide every problem are $R_s = f_b/\log_2 M$ and $B = 2R_s$ (null-to-null, rectangular pulses) or $B = (R_s/2)(1+\alpha)$ once raised-cosine filtering is specified. Watch for the phrase *input bit rate*: a 10 Mbps QPSK link has a 5 MBd symbol rate and therefore a 10 MHz unfiltered bandwidth, not 20 MHz.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| BPSK symbol rate | $R_s = f_b$ | One bit per symbol. BPSK and binary FSK share this property. |
| BPSK bandwidth | $B_{BPSK} = 2 f_b$ | Null-to-null with rectangular pulses. Apply the raised-cosine factor separately if filtering is specified. |
| QPSK symbol rate | $R_s = \frac{f_b}{2}$ | Two bits per symbol: log2(4) = 2. |
| QPSK bandwidth | $B_{QPSK} = 2 R_s = f_b$ | Half the BPSK bandwidth at the same bit rate. The headline result of this topic. |
| BPSK/QPSK bit error rate | $P_e = Q\!\left(\sqrt{\frac{2E_b}{N_0}}\right)$ | Coherent detection, AWGN. Identical for both schemes at the same Eb/N0. |
| Symbol to bit energy | $E_s = E_b \log_2 M$ | For QPSK, Es = 2Eb. Forgetting this turns a 3 dB error into the BER comparison. |
| Q function | $Q(x) = \frac{1}{\sqrt{2\pi}}\int_x^{\infty} e^{-u^2/2} du$ | Standard normal tail. Landmarks: Q(3.09)=1e-3, Q(3.72)=1e-4, Q(4.27)=1e-5, Q(4.75)=1e-6. |
| Error rate from Eb/N0 in dB | $\frac{E_b}{N_0}\bigg\lvert _{\mathrm{lin}} = 10^{\mathrm{dB}/10}$ | Convert first, then take the square root; taking 20-log directly is wrong for power ratios. |
| Minimum distance, BPSK | $d_{min} = 2\sqrt{E_b}$ | Antipodal. Gives the best power efficiency of any binary scheme. |
| Minimum distance, QPSK | $d_{min} = \sqrt{2E_s} = 2\sqrt{E_b}$ | Equal to BPSK's when expressed in Eb, which is why the BERs coincide. |

## Worked Problems

### P1. A BPSK link carries $1\ \mathrm{Mbps}$ over an unfiltered channel. Find the symbol rate and the null-to-null bandwidth.

**Given:** fb = 1 Mbps; BPSK

**Solution:**

1. Rs = fb = 1 000 000 baud
2. B = 2 Rs = 2 000 000 Hz

> [!success]- Answer
> **$R_s = 1\ \mathrm{MBd}$, $B = 2\ \mathrm{MHz}$**

> [!warning] Trap
> Writing $B = R_s$ because a symmetric spectrum sounds like half the bit rate. The null-to-null width of a rectangular-pulse PSK spectrum is $2R_s$.

### P2. A QPSK link carries the same $2\ \mathrm{Mbps}$ input bit stream. Find the symbol rate and bandwidth, and compare with BPSK at the same bit rate.

**Given:** fb = 2 Mbps; QPSK (M = 4)

**Solution:**

1. Rs = fb/log2(4) = 2 000 000/2 = 1 000 000 baud
2. B_QPSK = 2 Rs = 2 000 000 Hz
3. BPSK would be B = 2 fb = 4 000 000 Hz
4. Saving = 4 MHz/2 MHz = 2 (a factor of two, 3.01 dB in the 10-log convention)

> [!success]- Answer
> **$R_s = 1\ \mathrm{MBd}$, $B = 2\ \mathrm{MHz}$ versus $4\ \mathrm{MHz}$ for BPSK**

> [!warning] Trap
> Applying $B = 2f_b = 4\ \mathrm{MHz}$ to QPSK. The bandwidth formula uses the *symbol* rate, which is half the bit rate for QPSK.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2E6÷(log(4)÷log(2))` → $R_s$ = **1 000 000** Bd.
> 2. `Ans×2` → $B_{QPSK}$ = **2 000 000** Hz; `2×2E6` → $B_{BPSK}$ = **4 000 000** Hz.
> 3. `4E6÷2E6` → **2**, so QPSK halves the bandwidth (`10×log(2)` → **3.01** dB).

### P3. A coherent BPSK receiver operates at $E_b/N_0 = 10\ \mathrm{dB}$. Estimate the bit error rate.

**Given:** Eb/N0 = 10 dB; coherent BPSK; AWGN

**Solution:**

1. Convert: Eb/N0 = 10^(10/10) = 10 (linear)
2. Argument: sqrt(2 x 10) = sqrt(20) = 4.472
3. Pe = Q(4.472)
4. Using Q(4.4) = 5.4e-6 and Q(4.5) = 3.4e-6, interpolate: Q(4.472) = 3.9e-6

> [!success]- Answer
> **$P_e \approx 3.9\times10^{-6}$**

> [!warning] Trap
> Computing $\sqrt{2 \times 10}$ as 20 or forgetting to convert dB to a linear power ratio first. $10\ \mathrm{dB}$ is a factor of 10, not 10 units of the same quantity.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` STAT, then `Apps` `Distr` `R(` : the argument is `√(2×10^(10÷10))` = **√20** = **4.4721**.
> 2. `=` → $P_e$ = **3.88×10^{-6}** ≈ **3.9×10^{-6}**; `R(` is the machine's upper tail, i.e. $Q(x)$, so no table interpolation is needed.
>
> Convert dB to a linear power ratio *before* the factor of 2 and the square root: `10^(10÷10)` = 10, not 10 dB.

### P4. A system must deliver $10\ \mathrm{Mbps}$ with a BER below $10^{-5}$. Compare the unfiltered bandwidth required by BPSK and by QPSK, using the landmark $E_b/N_0 = 9.6\ \mathrm{dB}$ for $10^{-5}$.

**Given:** fb = 10 Mbps; target BER = 1e-5; unfiltered rectangular pulses

**Solution:**

1. Required Eb/N0 = 9.6 dB for both schemes, since their BER curves coincide
2. BPSK: Rs = 10 MBd so B = 2 x 10 = 20 MHz
3. QPSK: Rs = 10/2 = 5 MBd so B = 2 x 5 = 10 MHz
4. QPSK halves the bandwidth at the same Eb/N0 and the same BER

> [!success]- Answer
> **BPSK $20\ \mathrm{MHz}$; QPSK $10\ \mathrm{MHz}$, both at $E_b/N_0 = 9.6\ \mathrm{dB}$**

> [!warning] Trap
> Believing QPSK must pay about 3 dB in power for its bandwidth saving. In AWGN it does not — its BER versus $E_b/N_0$ is identical to BPSK's. The real cost is linearity, not power.

### P5. An unfiltered QPSK signal at $20\ \mathrm{MHz}$ occupied bandwidth is fed to a saturated amplifier, and the resulting spectral regrowth is unacceptable. Which variant should be used and what does it change?

**Given:** QPSK; 20 MHz occupied bandwidth; saturated (nonlinear) amplifier

**Solution:**

1. Plain QPSK allows simultaneous I and Q transitions, producing 180 degree phase jumps that pass through zero envelope
2. A saturated amplifier cannot reproduce the envelope dip, so it regenerates spectral sidelobes
3. Offset QPSK (OQPSK) delays Q by Ts/2, limiting phase jumps to 90 degrees
4. pi/4-QPSK alternates constellations, limiting jumps to 135 degrees and avoiding the origin
5. Either choice keeps Rs = 10 MBd and B = 20 MHz unchanged; only the envelope behaviour improves

> [!success]- Answer
> **Use OQPSK or $\pi/4$-QPSK; bandwidth ($20\ \mathrm{MHz}$) and BER are unchanged**

> [!warning] Trap
> Assuming an offset scheme trades bandwidth for linearity. OQPSK's main lobe is the same width as QPSK's and its BER curve is the same; the benefit is constant envelope, which lets the amplifier run saturated and therefore more efficiently.

## Traps & Exam Notes

- **Using $B = 2f_b$ for QPSK.** The factor 2 multiplies the *symbol* rate, and QPSK's symbol rate is half its bit rate — so QPSK bandwidth is $f_b$, not $2f_b$.
- **Assuming QPSK needs 3 dB more power than BPSK.** In AWGN their BER versus $E_b/N_0$ is identical. The 3 dB figure belongs to comparisons involving $E_s/N_0$ (symbol energy), where $E_s = 2E_b$ for QPSK.
- **Forgetting to convert dB to a linear ratio before taking the square root.** $E_b/N_0$ in dB is a power ratio; use $10^{\mathrm{dB}/10}$, not the dB number itself.
- **Confusing $E_b/N_0$ with $E_s/N_0$.** For QPSK $E_s = 2E_b$, so a quoted $E_s/N_0$ of 10 dB corresponds to $E_b/N_0$ of 7 dB and a much worse BER. Read which one the problem gives.
- **Assuming BPSK is immune to phase ambiguity.** A Costas or squaring loop locks to the carrier but cannot tell $0^\circ$ from $180^\circ$, so BPSK data can be received completely inverted. Differential encoding or a known preamble is required.
- **Treating QPSK as usable with a saturated amplifier.** A 180-degree jump in a filtered QPSK signal drops the envelope through zero, and a nonlinear amplifier restores the sidelobes that filtering removed — the failure mode that OQPSK and $\pi/4$-QPSK exist to prevent.

## See Also

- [[09_ASK,_OOK_and_FSK]]
- [[11_M-ary_PSK_and_16-QAM]]
- [[12_Constellation_and_BER_Comparison]]
- [[13_Matched_Filter_and_Optimum_Detection]]

---

[[09_ASK,_OOK_and_FSK|⬅ 09]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[11_M-ary_PSK_and_16-QAM|11 ➡]]
