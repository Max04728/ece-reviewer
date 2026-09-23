---
id: EST-02-02
title: "AM Spectrum, Bandwidth and Power"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_AM_Fundamentals_and_Modulation_Index]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — AM Spectrum, Bandwidth and Power

> [!abstract] Scope
> Draw and read the AM spectrum, find the occupied bandwidth for single and multiple tones, and account for where the transmitted power sits.

## Core Concept

> [!tip] Intuition
> Modulation is a frequency translation, not a creation of new information: the message spectrum is copied to sit just above and just below the carrier, mirrored. Read the picture and every bandwidth and power question follows.

**The spectrum is the message, copied twice.** For a single tone the AM spectrum is three lines: the carrier at $f_c$ with peak amplitude $A_c$, and two sidebands at $f_c\pm f_m$ each with peak amplitude $mA_c/2$. There is no line at $f_m$ itself — the message frequency is not transmitted, only its sum and difference with the carrier. For a message occupying a band of width $W$ (voice, music, data), each sideband becomes a copy of the message spectrum: the **upper sideband** is the message translated up to $f_c$, and the **lower sideband** is the message spectrum *inverted* (mirrored) below $f_c$. Both copies carry identical information, which is what makes single-sideband transmission possible.

**Bandwidth and channel spacing.** The occupied bandwidth is $2W$, where $W$ is the *highest* modulating frequency — not the sum of modulating frequencies. A single $3\ \mathrm{kHz}$ tone gives $6\ \mathrm{kHz}$; a voice channel spanning $300$–$3400\ \mathrm{Hz}$ gives $2(3400) = 6.8\ \mathrm{kHz}$. Practical channel assignments add a guard band: a $6.8\ \mathrm{kHz}$ signal fits a $10\ \mathrm{kHz}$ channel with a $3.2\ \mathrm{kHz}$ guard, which is why AM broadcast channels in the medium-wave band are spaced $9$ or $10\ \mathrm{kHz}$ apart. Note the frequency span is set by the *audio bandwidth*, not by how many tones are present: a message with components at $300\ \mathrm{Hz}$ and $3\ \mathrm{kHz}$ has the same $6\ \mathrm{kHz}$ bandwidth as a message with a hundred components spread over the same range.

**Where the power sits.** Each sideband carries $P_c m^2/4$ and the pair carries $P_c m^2/2$, so the total is $P_c(1+m^2/2)$. The *fraction* of transmitted power that is information is this:
$$\dfrac{m^2/2}{1+m^2/2} = \dfrac{m^2}{2+m^2}$$
In numbers that is 11.1 percent at $m=0.5$, 24.2 percent at $m=0.8$, and exactly one third at $m=1$. Equivalently, at 100 percent modulation each sideband holds one sixth of the total power and the carrier holds the remaining two thirds. That asymmetry — full symmetry in the spectrum, two thirds of the power in the useless carrier — is the entire economic argument for suppressed-carrier systems.

**Same power, different frequency.** In AM the carrier power does not change when modulation is applied; the sideband power appears in addition, drawn from the modulator and the DC supply. This is why the antenna current rises by only 22.5 percent at 100 percent modulation even though the total power rises by 50 percent. It also means that as long as the modulation index is the same, moving the carrier from $1\ \mathrm{MHz}$ to $10\ \mathrm{MHz}$ changes nothing about the power distribution — only the sideband *positions*. Frequency and power are separate budgets in linear modulation.

**Reading a spectrum-analyzer display.** The display shows the carrier line and the two sidebands; the index follows from their ratio, $m = 2A_{sb}/A_c$ where $A_{sb}$ is a sideband line height. Working backwards, a measured sideband-to-carrier ratio of $-6\ \mathrm{dB}$ per sideband means $mA_c/2 = 0.5A_c$, so $m=1$: a handy calibration point, because 100 percent modulation corresponds to each sideband sitting 6 dB below the carrier. The **trapezoidal pattern** on an oscilloscope — the envelope plotted against the message — is the time-domain equivalent of the same reading, and it becomes a crossed bow-tie when the signal is overmodulated.

**Why the shape matters later.** Every bandwidth and efficiency argument in the rest of the area is read off this one picture: DSB-SC keeps both sidebands but deletes the carrier line, SSB keeps one sideband, VSB keeps one sideband plus a small vestige of the other, and FM spreads an infinite family of sidebands around the carrier with amplitude set by Bessel functions. Once you can sketch the AM spectrum and label its three lines with amplitude and power, the comparison questions take one line each — see [[03_DSB-SC_and_SSB-SC]] and [[04_VSB_and_AM_Variants_Comparison]].

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Sideband frequencies | $f_{USB} = f_c + f_m, \qquad f_{LSB} = f_c - f_m$ | The LSB is the message spectrum inverted. Both sidebands carry the same information. |
| Sideband amplitudes | $A_{USB} = A_{LSB} = \frac{m A_c}{2}$ | Equal in amplitude for a single tone. Their ratio to the carrier is m/2. |
| Occupied bandwidth | $BW = 2 f_{m(max)}$ | Twice the HIGHEST modulating frequency, not the sum or the average. Independent of the number of tones. |
| Channel spacing with guard band | $\mathrm{spacing} = BW(1 + g), \quad g = \mathrm{fractional\ guard}$ | A 20 percent guard on 6.8 kHz gives 8.16 kHz, rounded up to a standard 10 kHz channel. |
| Power in each sideband | $P_{sb} = \frac{P_c m^2}{4}$ | Peak amplitude mAc/2, so power is proportional to (mAc/2)^2/2 = Pc m^2/4. |
| Total power | $P_t = P_c + 2P_{sb} = P_c\left(1+\frac{m^2}{2}\right)$ | At m = 1 each sideband is one sixth of the total and the carrier two thirds. |
| Fraction of power in the sidebands | $\frac{P_{sb,total}}{P_t} = \frac{m^2}{2+m^2}$ | 24.2 percent at m = 0.8; one third at m = 1. Never more than one third. |
| Modulation index from a sideband line | $m = \frac{2 A_{sb}}{A_c}$ | Spectrum-analyzer form. Each sideband 6 dB below the carrier means m = 1. |
| Sideband-to-carrier ratio in dB | $20\log_{10}\frac{m}{2}\ \mathrm{dB}$ | -6 dB at m = 1, -14 dB at m = 0.4, -20 dB at m = 0.2. |
| Index from measured sideband power | $m = \sqrt{\frac{2P_{sb,total}}{P_c}}$ | Both powers must be referred to the same impedance. |

## Worked Problems

### P1. A $1\ \mathrm{MHz}$ carrier is amplitude-modulated by a $3\ \mathrm{kHz}$ tone. List the spectral components and the occupied bandwidth.

**Given:** fc = 1 MHz; fm = 3 kHz

**Solution:**

1. Carrier line at 1000 kHz
2. USB at fc + fm = 1003 kHz, LSB at fc - fm = 997 kHz
3. Bandwidth = 2 fm = 6 kHz, i.e. 997 kHz to 1003 kHz

> [!success]- Answer
> **Lines at 997, 1000 and 1003 kHz; BW = 6 kHz.**

> [!warning] Trap
> Reporting a bandwidth of 3 kHz. The message spectrum appears twice (once mirrored), so the occupied band is twice the highest modulating frequency.

### P2. An AM transmitter has a carrier amplitude of $20\ \mathrm{V}$ and a modulation index of $0.4$ into a $50\ \Omega$ load. Find the carrier power, the power in each sideband and the total power.

**Given:** Ac = 20 V; m = 0.4; R = 50 ohm

**Solution:**

1. Pc = Ac^2/(2R) = 400/100 = 4 W
2. Each sideband = Pc m^2/4 = 4(0.16)/4 = 0.16 W
3. Total = Pc(1 + m^2/2) = 4(1 + 0.08) = 4.32 W
4. Check: 4 + 0.16 + 0.16 = 4.32 W

> [!success]- Answer
> **Pc = 4 W; each sideband 0.16 W; Pt = 4.32 W.**

> [!warning] Trap
> Using Pc = Ac^2/R = 8 W and omitting the factor 2 in the peak-to-RMS conversion. For a sinusoid of peak amplitude Ac, the power is Ac^2/(2R).

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20^2÷(2×50) : Ans×1.08 : 20^2÷(2×50)×0.4^2÷4`
> 2. `=` down the chain: $P_c$ = **4** W → $P_t$ = **4.32** W → each sideband **0.16** W, so `4+0.16+0.16` = **4.32** W as the note checks.
>
> The `2` in $A_c^2/(2R)$ is the peak-to-rms conversion: `20^2÷50` = **8** W for $P_c$ is the trap.

### P3. A voice channel occupies $300$ to $3400\ \mathrm{Hz}$. Find the AM bandwidth and a suitable channel spacing with a 20 percent guard band.

**Given:** band = 300-3400 Hz; guard = 20 percent

**Solution:**

1. Highest modulating frequency = 3400 Hz
2. BW = 2(3400) = 6800 Hz = 6.8 kHz
3. Spacing = 6.8(1.20) = 8.16 kHz
4. Round up to a standard 10 kHz channel

> [!success]- Answer
> **BW = 6.8 kHz; spacing about 8.2 kHz, rounded to a 10 kHz channel.**

> [!warning] Trap
> Computing the bandwidth as 2(3400-300) = 6.2 kHz from the band's width. The occupied bandwidth is twice the highest frequency component, not twice the width of the message band.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×3.4 : Ans×1.2`
> 2. `=` down the chain: $BW$ = **6.8** kHz → spacing **8.16** kHz, which rounds up to the standard **10** kHz channel.
>
> Twice the HIGHEST frequency, $2×3400$ = **6.8** kHz; $2(3400−300)$ = **6.2** kHz from the band WIDTH is the trap.

### P4. An AM signal is modulated to 80 percent. What fraction of the total transmitted power is in the sidebands, and how much of that is in the upper sideband?

**Given:** m = 0.8

**Solution:**

1. Fraction in both sidebands = m^2/(2+m^2) = 0.64/2.64 = 0.2424
2. So 24.24 percent of the total power is information
3. The upper sideband carries half of that: 12.12 percent of the total
4. Check with powers: Pc = 1 W, sidebands = 0.32 W total, Pt = 1.32 W; 0.32/1.32 = 24.2 percent

> [!success]- Answer
> **24.2 percent in both sidebands, 12.1 percent in the USB.**

> [!warning] Trap
> Answering 32 percent by using m^2/2 = 0.32 as a fraction of the total. The sideband power must be divided by the TOTAL power (1 + m^2/2), not by the carrier power.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.8^2÷(2+0.8^2) : Ans÷2`
> 2. `=` down the chain: **0.2424** = **24.24** % in both sidebands → **12.12** % in the USB alone.
>
> The denominator is the TOTAL power budget, $2+m^2$: `0.8^2÷2` = **32** % divides by the carrier and is the trap.

### P5. Two tones, $1\ \mathrm{kHz}$ with index $0.3$ and $5\ \mathrm{kHz}$ with index $0.4$, modulate a $2\ \mathrm{MHz}$ carrier with a carrier power of $200\ \mathrm{W}$. List the spectral lines, find the bandwidth and the total sideband power.

**Given:** fm1 = 1 kHz, m1 = 0.3; fm2 = 5 kHz, m2 = 0.4; fc = 2 MHz; Pc = 200 W

**Solution:**

1. Lines at fc +/- 1 kHz and fc +/- 5 kHz, plus the carrier: 1995, 1999, 2000, 2001, 2005 kHz
2. Bandwidth = 2 x highest fm = 2(5 kHz) = 10 kHz
3. Total index = sqrt(0.3^2 + 0.4^2) = sqrt(0.25) = 0.5
4. Total sideband power = Pc m^2/2 = 200(0.25)/2 = 25 W
5. Split: 1 kHz pair = Pc m1^2/2 = 200(0.09)/2 = 9 W; 5 kHz pair = 200(0.16)/2 = 16 W

> [!success]- Answer
> **Lines at 1995/1999/2000/2001/2005 kHz; BW = 10 kHz; sideband power 25 W (9 W in the 1 kHz pair, 16 W in the 5 kHz pair).**

> [!warning] Trap
> Using the peak sum m1 + m2 = 0.7 for the power budget, which gives 49 W instead of 25 W. Power adds, so the indices combine in quadrature; the arithmetic sum matters only for the peak-envelope (overmodulation) check.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(0.3^2+0.4^2) : 200×Ans^2÷2 : 200×0.3^2÷2 : 200×0.4^2÷2 : 2×5`
> 2. `=` down the chain: $m_{tot}$ = **0.5** → sideband power **25** W → the 1 kHz pair **9** W → the 5 kHz pair **16** W → $BW$ = **10** kHz.
>
> The two tones' powers ADD (`9+16` = **25** W); the peak sum `0.3+0.4` = **0.7** belongs to the envelope check only.

## Traps & Exam Notes

- **Taking the bandwidth as twice the message *width* rather than twice the highest *frequency*.** A 300–3400 Hz channel occupies 6.8 kHz, not 6.2 kHz. Only the highest modulating frequency sets the outer edges.
- **Charging the whole sideband power to one sideband.** Each sideband is $P_c m^2/4$; the pair is $P_c m^2/2$. Every downstream comparison (DSB-SC, SSB, power saving) depends on this split.
- **Believing the carrier power increases with modulation.** $P_c$ is fixed by $A_c$ and $R$; modulation adds the sideband power on top. That is why the antenna current rises only 22.5 percent at $m=1$ even though total power rises 50 percent.
- **Assuming the sideband amplitudes differ.** Both sidebands have peak amplitude $mA_c/2$; they differ only in frequency and in the *sense* of the message spectrum (the LSB is inverted). A spectrum plot showing unequal sidebands indicates something other than pure AM — an asymmetric filter or an overmodulated stage.
- **Confusing the 6 dB sideband-to-carrier reading.** Each sideband is $mA_c/2$, so at 100 percent modulation each is 6 dB below the carrier — not 3 dB, and not 0 dB. A spectrum display with sidebands 3 dB down corresponds to $m$ well above 1, i.e. overmodulation.
- **Forgetting that the occupied bandwidth is unchanged by the modulation index.** Overmodulation does not widen the *intended* spectrum from $2f_m$ symmetrically; it adds harmonic sidebands at multiples of $f_m$, so the real emission is wider and violates the spectral mask.
- **Mixing power referenced to different resistances.** $P_c = A_c^2/(2R)$; if a problem gives the carrier voltage across one impedance and the sideband power into another, convert both to the same reference before dividing.

## See Also

- [[01_AM_Fundamentals_and_Modulation_Index]]
- [[03_DSB-SC_and_SSB-SC]]
- [[04_VSB_and_AM_Variants_Comparison]]
- [[01_Time_vs_Frequency_and_Line_Spectra]]

---

[[01_AM_Fundamentals_and_Modulation_Index|⬅ 01]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[03_DSB-SC_and_SSB-SC|03 ➡]]
