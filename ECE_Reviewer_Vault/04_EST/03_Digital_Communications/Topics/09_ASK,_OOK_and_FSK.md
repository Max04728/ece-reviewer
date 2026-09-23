---
id: EST-03-09
title: "ASK, OOK and FSK"
part: "04_EST"
area: "03_Digital_Communications"
topic: 9
tier: 2
depth: full
problem_count: 4
prereqs: ["[[06_Line_Coding_Schemes]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — ASK, OOK and FSK

> [!abstract] Scope
> Compare the three basic digital carrier modulations: OOK as on-off amplitude keying, ASK in general, and FSK with its frequency deviation, modulation index and Carson-style bandwidth.

## Core Concept

> [!tip] Intuition
> Take a carrier and switch one of its three knobs: amplitude gives ASK, frequency gives FSK, phase gives PSK. Switching amplitude is the easiest to build and the easiest to corrupt; switching frequency is the most robust and the most bandwidth-hungry.

**ASK and OOK.** In amplitude shift keying the carrier amplitude takes one of $M$ values according to the symbol. The binary case with $M = 2$ and one state at zero is *on-off keying* (OOK) — the carrier is simply switched on and off, which is why it is also called 100% modulation. Generation needs only a multiplier and a unipolar data stream; detection needs only an envelope detector and a comparator, no carrier recovery at all. That simplicity is why OOK survives in optical links, RFID and infrared remotes. Its weaknesses are equally simple: the decision threshold depends on received amplitude, so fading and gain drift translate directly into errors, and the spectrum has a large discrete carrier component that carries no information.

**ASK bandwidth.** For OOK with a bit rate $f_b$, the baseband data occupies roughly $f_b$ and double-sideband amplitude modulation places copies either side of the carrier, so the null-to-null bandwidth is $B = 2f_b$. The general $M$-ary ASK case keeps the same bandwidth but reduces the symbol rate by $\log_2 M$, so it becomes more spectrally efficient at the cost of a tighter amplitude decision. Because the information sits in the amplitude, ASK is the least power-efficient of the three basic schemes for a given BER.

**FSK.** In frequency shift keying the carrier hops between two frequencies $f_1$ and $f_2$ according to the bit. Amplitude stays constant, so a limiter can strip amplitude noise before detection, which makes FSK markedly more robust than ASK on fading or noisy links. Generation is a voltage-controlled oscillator driven by the data; detection can be non-coherent (two bandpass filters plus envelope detectors, or a discriminator) which avoids carrier recovery entirely. That combination — constant envelope plus non-coherent detection — is why FSK was used for the 300 baud Bell 103 acoustic modem and for low-cost telemetry.

**The modulation index and bandwidth.** Define the peak frequency deviation $\Delta f = |f_1 - f_2|/2$ and the FSK modulation index $h = \Delta f / f_b = \Delta f T_b$. FSK is a form of FM, so its bandwidth follows the Carson-style result $B = 2(\Delta f + f_b)$ — twice the deviation plus twice the bit rate. When $h$ is small (narrowband FSK) the bandwidth approaches $2f_b$, the same as OOK; when $h$ is large (wideband FSK) the bandwidth is dominated by $2\Delta f$ and grows without bound. The special case $h = 0.5$ gives the *minimum* frequency spacing for which the two tones remain orthogonal over a bit period; that scheme is **minimum shift keying (MSK)**, which has the same bandwidth as OOK and a constant envelope.

**Comparing the three.** Bandwidth at equal bit rate, using the null-to-null convention: OOK and narrowband FSK both need about $2f_b$; wideband FSK needs $2(\Delta f + f_b)$ which can be far larger; MSK sits at $2f_b$ with continuous phase. Power efficiency for a given BER ranks PSK best, then FSK, then ASK — a gap of roughly 3 dB between coherent PSK and coherent FSK, and coherent schemes beat non-coherent ones by up to 3 dB more. The practical summary a board expects: **ASK is cheapest to build, FSK is the most robust and the most bandwidth-hungry, PSK is the most efficient when the channel permits carrier recovery.**

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| ASK/OOK bandwidth | $B_{OOK} = 2 f_b$ | Null-to-null for 100% modulation. f_b is the bit rate, not the carrier frequency. |
| Frequency deviation | $\Delta f = \frac{\lvert f_1 - f_2 \rvert}{2}$ | Peak deviation measured from the centre frequency. |
| FSK modulation index | $h = \frac{\Delta f}{f_b} = \Delta f \, T_b$ | Dimensionless. Sometimes defined with 2*delta_f; check the convention before substituting. |
| FSK bandwidth | $B_{FSK} = 2(\Delta f + f_b)$ | Carson-style estimate. Narrowband FSK (small h) approaches 2 fb; wideband FSK is dominated by 2 delta_f. |
| Minimum shift keying condition | $h = 0.5 \Rightarrow \Delta f = \frac{f_b}{2}$ | Smallest deviation keeping the two tones orthogonal over one bit; gives MSK. |
| MSK bandwidth | $B_{MSK} = 2\left(\frac{f_b}{2} + f_b\right) = 3 f_b$ | From the FSK formula at h = 0.5. Phase is continuous, so the actual spectrum is tighter than this bound. |
| Tone spacing | $\lvert f_1 - f_2 \rvert = 2\Delta f$ | The tones are separated by twice the peak deviation. |
| M-ary ASK symbol rate | $R_s = \frac{f_b}{\log_2 M}$ | Bandwidth stays about 2 Rs, so M-ary ASK improves spectral efficiency. |
| Non-coherent FSK error rate | $P_e = \frac{1}{2} e^{-E_b/(2N_0)}$ | Orthogonal non-coherent FSK. Roughly 3 dB worse than coherent FSK. |
| OOK carrier component | $P_{carrier} = \frac{A^2}{4}$ | Half the total power sits in a discrete carrier that carries no information when the data is equiprobable. |

## Worked Problems

### P1. An OOK system transmits at $1\ \mathrm{Mbps}$. Find the null-to-null bandwidth.

**Given:** fb = 1 Mbps; OOK (100% modulation)

**Solution:**

1. B_OOK = 2 fb
2. = 2 x 1 000 000
3. = 2 000 000 Hz

> [!success]- Answer
> **$2\ \mathrm{MHz}$**

> [!warning] Trap
> Answering $1\ \mathrm{MHz}$ by equating bandwidth with bit rate. DSB amplitude modulation doubles the baseband width, giving $2f_b$.

### P2. An FSK transmitter sends $1\ \mathrm{Mbps}$ using tones at $1.0\ \mathrm{MHz}$ and $1.5\ \mathrm{MHz}$. Find the peak deviation, the modulation index and the bandwidth.

**Given:** f1 = 1.5 MHz; f2 = 1.0 MHz; fb = 1 Mbps

**Solution:**

1. Deviation: delta_f = |f1 - f2|/2 = (1.5 - 1.0) MHz/2 = 0.25 MHz
2. Modulation index: h = delta_f/fb = 250 000/1 000 000 = 0.25
3. Bandwidth: B = 2(delta_f + fb) = 2(250 000 + 1 000 000)
4. = 2 500 000 Hz

> [!success]- Answer
> **$\Delta f = 250\ \mathrm{kHz}$, $h = 0.25$, $B = 2.5\ \mathrm{MHz}$**

> [!warning] Trap
> Using the full tone separation as $\Delta f$. The 500 kHz spacing is twice the peak deviation; halving it is the single most common FSK error.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(1.5E6−1.0E6)÷2` → $\Delta f$ = **250 000** Hz = **250** kHz.
> 2. `Ans÷1E6` → $h$ = **0.25**.
> 3. `2×(250000+1E6)` → $B$ = **2 500 000** Hz = **2.5** MHz.
>
> The 500 kHz tone spacing is $2\Delta f$; feeding the spacing into $h$ doubles the deviation and the bandwidth.

### P3. A 1 Mbps FSK link is required to operate with $h = 0.5$ (minimum shift keying). Find the tone spacing and the bandwidth.

**Given:** fb = 1 Mbps; h = 0.5

**Solution:**

1. h = delta_f/fb so delta_f = 0.5 x 1 000 000 = 500 kHz
2. Tone spacing = 2 delta_f = 1 MHz
3. B = 2(delta_f + fb) = 2(500 000 + 1 000 000)
4. = 3 000 000 Hz

> [!success]- Answer
> **$\Delta f = 500\ \mathrm{kHz}$, spacing $1\ \mathrm{MHz}$, $B = 3\ \mathrm{MHz}$**

> [!warning] Trap
> Reporting the tone spacing as $\Delta f = 500\ \mathrm{kHz}$ and then also using 500 kHz as the spacing. The tones are $2\Delta f = 1\ \mathrm{MHz}$ apart.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5×1E6` → $\Delta f$ = **500 000** Hz; `Ans×2` → tone spacing = **1 000 000** Hz = **1** MHz.
> 2. `2×(500000+1E6)` → $B$ = **3 000 000** Hz = **3** MHz.

### P4. A $1200\ \mathrm{bps}$ FSK modem uses a deviation of $600\ \mathrm{Hz}$. Find the modulation index and the bandwidth, then compare with OOK at the same bit rate.

**Given:** fb = 1200 bps; delta_f = 600 Hz

**Solution:**

1. h = delta_f/fb = 600/1200 = 0.5
2. B_FSK = 2(600 + 1200) = 3600 Hz
3. B_OOK = 2 fb = 2400 Hz
4. FSK costs 3600/2400 = 1.5 times the OOK bandwidth

> [!success]- Answer
> **$h = 0.5$; $B_{FSK} = 3600\ \mathrm{Hz}$ versus $2400\ \mathrm{Hz}$ for OOK**

> [!warning] Trap
> Claiming FSK and OOK occupy the same bandwidth at $h = 0.5$. The Carson bound gives $2(0.5f_b + f_b) = 3f_b$ against OOK's $2f_b$, a $1.5\times$ penalty; only MSK's continuous phase tightens the real spectrum.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `600÷1200` → $h$ = **0.5**.
> 2. `2×(600+1200)` → $B_{FSK}$ = **3600** Hz.
> 3. `Ans÷(2×1200)` → **1.5×** the OOK bandwidth of **2400** Hz.
>
> At $h$ = 0.5 the Carson bound is $3f_b$ against OOK's $2f_b$ — a 1.5× penalty, not parity.

## Traps & Exam Notes

- **Using the tone separation as the frequency deviation.** $\Delta f = |f_1 - f_2|/2$. Substituting the spacing doubles the deviation and inflates the bandwidth by $2\Delta f$.
- **Applying $B = 2f_b$ to every FSK signal.** That is the narrowband limit. The correct expression is $B = 2(\Delta f + f_b)$, which is only equal to $2f_b$ when $\Delta f \ll f_b$.
- **Using a 10-log for a bandwidth ratio.** Bandwidth is a frequency ratio, so $1.5\times$ is $3.5\ \mathrm{dB}$ under the 20-log convention and $1.76\ \mathrm{dB}$ under the 10-log convention. State the convention rather than the ambiguous number.
- **Assuming OOK is power-efficient because it is simple.** OOK wastes half its transmitted power in a discrete carrier when the data is equiprobable; the information-bearing sidebands hold the rest. For a given BER, OOK needs more $E_b/N_0$ than coherent FSK or PSK.
- **Ignoring that non-coherent detection costs about 3 dB.** Envelope detection of OOK and dual-filter detection of FSK avoid carrier recovery entirely, but they pay roughly 3 dB in $E_b/N_0$ compared with coherent detection. A problem that gives both a BER target and a non-coherent receiver expects the penalty.
- **Confusing MSK with plain FSK.** MSK is FSK with $h = 0.5$ *and* continuous phase. The continuous phase is what actually tightens the spectrum; plain switched FSK at the same $h$ has much larger spectral sidelobes.

## See Also

- [[10_BPSK_and_QPSK]]
- [[12_Constellation_and_BER_Comparison]]
- [[13_Matched_Filter_and_Optimum_Detection]]
- [[05_FM_and_PM_Fundamentals]]

---

[[08_Eye_Diagrams_and_Equalization|⬅ 08]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[10_BPSK_and_QPSK|10 ➡]]
