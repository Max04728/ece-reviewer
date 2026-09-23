---
id: EST-02-03
title: "DSB-SC and SSB-SC"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_AM_Spectrum,_Bandwidth_and_Power]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — DSB-SC and SSB-SC

> [!abstract] Scope
> Compare double-sideband suppressed carrier and single-sideband suppressed carrier with AM in bandwidth, power, generation and detection.

## Core Concept

> [!tip] Intuition
> The AM spectrum wastes a carrier that carries no information and duplicates the message in a mirrored sideband. Delete the carrier and you get DSB-SC; delete one sideband as well and you get SSB — half the bandwidth for a quarter of the power.

**DSB-SC: keep both sidebands, kill the carrier.** Double-sideband suppressed carrier is $s(t) = A_c\,m(t)\cos\omega_c t$ — a plain product of the message and the carrier, with no DC term. The spectrum is the AM spectrum minus the carrier line: two sidebands, each with the full message spectrum, and nothing at $f_c$. The bandwidth is still $2W$. The point of deleting the carrier is power: at $m=1$ plain AM transmits $1.5P_c$ to deliver $0.5P_c$ of information, while DSB-SC transmits exactly that $0.5P_c$ — a 4.77 dB saving at equal information power. The price is demodulation: with no carrier in the received signal, the envelope is $|m(t)|$, so a diode detector rectifies and folds the message instead of recovering it.

**DSB-SC detection and generation.** Detection requires a **product detector**: multiply the received signal by a locally generated carrier of the same frequency and phase, then lowpass. If the local carrier is $\cos(\omega_c t+\phi)$, the output is $\tfrac{1}{2}m(t)\cos\phi$ plus a double-frequency term that the lowpass removes. A phase error therefore scales the output by $\cos\phi$ and, at $\phi = 90^\circ$, destroys it entirely (the **quadrature null**); a frequency error makes the output fade in and out at the difference frequency. Generation is by a **balanced modulator**, typically two AM modulators driven in antiphase so that the carrier cancels at the output, or a ring modulator, which is the same idea implemented with diodes and a transformer. Carrier suppression of 40–50 dB is routine, which is why the residual carrier in a real DSB-SC signal is measured in milliwatts.

**SSB-SC: one sideband only.** Since the upper and lower sidebands carry identical information, transmitting only one halves the bandwidth to $W$ and halves the power again to $P_c m^2/4$ at $m=1$. Relative to 100 percent AM, SSB therefore needs a quarter of the power (an 83.3 percent saving, 7.78 dB) and half the bandwidth. This double saving is why SSB is the standard voice mode for HF radio, marine and aeronautical service, and point-to-point links: it packs twice as many channels into a band and concentrates the transmitter's power into the one sideband that will actually be received. The peak-to-average ratio of an SSB signal is high (voice peaks greatly exceed the average), so SSB transmitters are rated in **peak envelope power (PEP)** and must use linear amplifiers.

**How SSB is generated.** The *filter method* passes the DSB-SC signal through a sharp bandpass filter that removes one sideband. The difficulty is the transition band: an audio message starting at $300\ \mathrm{Hz}$ produces sidebands only $600\ \mathrm{Hz}$ apart at the carrier, so the filter must have a transition of a few hundred hertz at the IF — feasible only with crystal, mechanical or SAW filters, which is why the method is used at a low fixed IF (typically a few hundred kHz to a few MHz) followed by up-conversion. The *phase-shift (third) method* combines two balanced modulators with $90^\circ$ phase-shifted carriers and audio paths, and cancels one sideband by addition; it needs a wideband $90^\circ$ audio network rather than a razor-sharp filter. The *Weaver* method uses the same idea with two stages to avoid the wideband phase shifter altogether.

**Detection and its error modes.** SSB needs a product detector driven by a **beat frequency oscillator (BFO)** reinserting the carrier. The sensitivity to error is qualitatively different from DSB-SC: a phase error in SSB leaves the audio intelligible but adds a quadrature distortion, while a *frequency* error shifts the entire recovered audio by the same number of hertz — a 50 Hz BFO error turns a 1 kHz tone into 1050 Hz or 950 Hz. Since speech has no absolute pitch reference, a small SSB frequency error is heard as an unnatural 'Donald Duck' timbre rather than as distortion, which is why SSB operators fine-tune the BFO by ear. A pilot carrier or a reduced carrier (as in some HF systems) is sometimes transmitted to make this tuning easier.

**Choosing between them.** AM is the simplest to receive (an envelope detector and an AGC derived from the carrier) and is used where receivers must be cheap and where a carrier is useful for tuning — medium-wave broadcasting. DSB-SC is largely a stepping stone: it teaches carrier suppression and it is the input to an SSB generator, but it saves only half the power and none of the bandwidth. SSB wins on both counts wherever bandwidth and power are scarce, at the cost of receiver complexity and of the linear amplification that its high peak-to-average ratio demands. VSB, treated in [[04_VSB_and_AM_Variants_Comparison]], is the compromise used for analogue television, where the video baseband extends to DC and an SSB filter cannot be built at DC.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| DSB-SC waveform | $s(t) = A_c\, m(t)\cos(\omega_c t)$ | No DC term, so no carrier. Requires m(t) to have zero mean for full carrier suppression. |
| DSB-SC power | $P_t = \frac{P_c m^2}{2}$ | Both sidebands, no carrier. Half of AM's total at m = 1. |
| SSB waveform (single tone) | $s_{USB}(t) = \frac{A_c m}{2}\cos(\omega_c+\omega_m)t$ | One sideband only. For the LSB use (wc - wm). |
| SSB power | $P_{SSB} = \frac{P_c m^2}{4}$ | A quarter of AM's total at m = 1; half of DSB-SC. |
| Bandwidths | $BW_{AM} = BW_{DSB} = 2W, \qquad BW_{SSB} = W$ | W is the highest modulating frequency. SSB halves the channel requirement. |
| Power comparison at m = 1 | $P_{AM} = 1.5P_c, \quad P_{DSB} = 0.5P_c, \quad P_{SSB} = 0.25P_c$ | Savings versus AM: DSB 66.7 percent (4.77 dB), SSB 83.3 percent (7.78 dB). |
| Coherent (product) detector output | $e(t) = A_c m(t)\cos(\omega_c t)\cos(\omega_c t+\phi) \Rightarrow \frac{A_c m(t)}{2}\cos\phi$ | After lowpass filtering. Phase error scales by cos(phi); phi = 90 deg gives the quadrature null. |
| Effect of a local oscillator frequency error | $\Delta f = f_{LO} - f_c$ | DSB-SC: output fades at the beat rate. SSB: the whole recovered audio is shifted by df hertz. |
| Carrier suppression in dB | $\mathrm{suppression} = 10\log_{10}\frac{P_{carrier}}{P_{residual}}$ | A 40 dB balanced modulator leaves one ten-thousandth of the carrier power. |
| Filter requirement for the filter method | $Q \approx \frac{f_{IF}}{\Delta f_{gap}}, \qquad \Delta f_{gap} = 2 f_{audio,min}$ | The sidebands are separated by twice the lowest audio frequency; a 300 Hz audio floor means a 600 Hz gap. |

## Worked Problems

### P1. A 100 percent-modulated AM transmitter with a $1\ \mathrm{kW}$ carrier is to be replaced by (a) DSB-SC and (b) SSB-SC transmitting the same information. Compare the transmitted powers and the savings.

**Given:** Pc = 1 kW; m = 1

**Solution:**

1. AM total: Pt = Pc(1 + m^2/2) = 1000(1.5) = 1500 W
2. DSB-SC: Pt = Pc m^2/2 = 1000(0.5) = 500 W
3. SSB-SC: Pt = Pc m^2/4 = 1000(0.25) = 250 W
4. Saving DSB vs AM = (1500-500)/1500 = 66.7 percent (4.77 dB)
5. Saving SSB vs AM = (1500-250)/1500 = 83.3 percent (7.78 dB)

> [!success]- Answer
> **AM 1.5 kW, DSB-SC 0.5 kW, SSB-SC 0.25 kW — savings of 66.7 percent and 83.3 percent.**

> [!warning] Trap
> Comparing against the carrier power alone (1000 W) instead of the AM total power (1500 W). The baseline for a power-saving claim is what the AM system actually transmits with its sidebands at the same index.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000×1.5 : 1000÷2 : 1000÷4 : (1500−500)÷1500 : (1500−250)÷1500`
> 2. `=` down the chain: AM **1500** W → DSB-SC **500** W → SSB-SC **250** W → saving **66.7** % → **83.3** %.
> 3. Both savings are POWER ratios, so `10log(1500÷500)` → **4.77** dB and `10log(1500÷250)` → **7.78** dB.
>
> The baseline is the AM TOTAL **1500** W, not the 1000 W carrier — against the carrier the SSB saving reads **75** %, the trap.

### P2. An audio channel carries $300$ to $3000\ \mathrm{Hz}$. Find the transmitted bandwidth for AM, DSB-SC and SSB-SC, and how many SSB channels fit in the spectrum of one AM channel.

**Given:** audio band = 300-3000 Hz

**Solution:**

1. AM and DSB-SC: BW = 2 x 3000 = 6000 Hz each
2. SSB-SC: BW = 3000 Hz
3. Ratio = 6000/3000 = 2
4. So two SSB channels fit in one AM channel's bandwidth

> [!success]- Answer
> **AM/DSB-SC 6 kHz; SSB-SC 3 kHz; two SSB channels per AM channel.**

> [!warning] Trap
> Using the audio band's width (2700 Hz) instead of its highest frequency. The bandwidth is twice the highest modulating frequency, so 6 kHz, not 5.4 kHz.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×3000 : Ans÷2`
> 2. `=` down the chain: AM and DSB-SC = **6000** Hz → SSB-SC = **3000** Hz, so `6000÷3000` = **2** SSB channels per AM channel.
>
> Twice the HIGHEST frequency, `2×3000` = **6** kHz; the band width gives `2×2700` = **5.4** kHz, the trap.

### P3. A balanced modulator specified for $40\ \mathrm{dB}$ carrier suppression is fed so that the unsuppressed carrier would have been $100\ \mathrm{W}$. Find the residual carrier power.

**Given:** suppression = 40 dB; Pcarrier = 100 W

**Solution:**

1. 40 dB means a power ratio of 10^4
2. P_residual = 100/1e4 = 0.01 W
3. = 10 mW, i.e. -20 dBW as an absolute level (against 1 W), which is 40 dB below the 100 W carrier

> [!success]- Answer
> **Residual carrier = 10 mW.**

> [!warning] Trap
> Dividing by 40 (treating dB as a ratio) and getting 2.5 W. Convert the dB figure to a power ratio first: 40 dB is 10^4, not 40.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100÷10^(40÷10) : Ans×1000`
> 2. `=` down the chain: residual carrier **0.01** W → **10** mW. As an absolute level `10log(0.01)` = **−20** dBW, i.e. **40** dB below the 100 W carrier.
>
> 40 dB is a power ratio of `10^(40÷10)` = **10^4**; `100÷40` = **2.5** W treats dB as a plain divisor — the trap.

### P4. An SSB receiver's BFO is off by $50\ \mathrm{Hz}$. A $1\ \mathrm{kHz}$ tone is transmitted with a $7.000\ \mathrm{MHz}$ carrier. What audio frequency is heard, and what happens to a 3 kHz tone?

**Given:** BFO error = 50 Hz; tone = 1 kHz then 3 kHz

**Solution:**

1. In SSB the recovered audio is shifted by exactly the BFO frequency error
2. 1 kHz tone becomes 1000 +/- 50 Hz, i.e. 950 Hz or 1050 Hz
3. A 3 kHz tone becomes 2950 Hz or 3050 Hz - the same 50 Hz shift, not a proportional one
4. The shift is absolute: speech sounds unnatural ('Donald Duck') because all formants move by the same 50 Hz

> [!success]- Answer
> **The 1 kHz tone is heard at 1050 Hz (or 950 Hz); the 3 kHz tone at 3050 Hz (2950 Hz) — an absolute 50 Hz shift in every case.**

> [!warning] Trap
> Assuming the error scales proportionally with tone frequency. An SSB carrier-frequency error translates the whole audio band by a fixed number of hertz, which is why it is audible as a timbre change rather than as a pitch ratio.

### P5. An SSB generator uses the filter method at an intermediate frequency of $1\ \mathrm{MHz}$ with an audio band starting at $300\ \mathrm{Hz}$. Find the separation between the two sidebands and the effective filter Q required.

**Given:** fIF = 1 MHz; lowest audio = 300 Hz

**Solution:**

1. The sidebands nearest the carrier are at fIF +/- 300 Hz
2. Separation = 2 x 300 = 600 Hz
3. Filter Q = fIF/separation = 1e6/600
4. Q = 1667

> [!success]- Answer
> **600 Hz separation; a filter Q of about 1700 is needed.**

> [!warning] Trap
> Using the highest audio frequency (3 kHz) for the gap and concluding Q = 333. The hardest part of the filtering job is near the carrier, where the two sidebands are separated by only twice the LOWEST audio frequency.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×300 : 1E6÷Ans`
> 2. `=` down the chain: sideband separation **600** Hz → filter $Q$ = **1667**, about 1700.
>
> The gap uses the LOWEST audio frequency; `1E6÷3000` = **333** comes from the highest and is the trap.

## Traps & Exam Notes

- **Feeding DSB-SC or SSB to an envelope detector.** With no carrier the detected envelope is $|m(t)|$, so the message is rectified and folded; the output sounds like severe distortion. Suppressed-carrier systems need a product detector and a locally reinserted carrier.
- **Forgetting the quadrature null in DSB-SC.** The coherent detector output is proportional to $\cos\phi$; a $90^\circ$ phase error kills the signal completely, and a frequency error produces a slow fade at the difference frequency. Carrier recovery (a squaring loop or a Costas loop) is what makes DSB-SC practical.
- **Comparing SSB power with the carrier power instead of the AM total.** At $m=1$ the honest comparison is 0.25 kW versus 1.5 kW (an 83.3 percent saving). Quoting 'a quarter of the carrier' understates the saving and breaks the dB arithmetic.
- **Treating an SSB frequency error as proportional distortion.** The BFO error shifts every audio component by the same absolute number of hertz; it does not scale with frequency, which is why a 50 Hz error is inaudible on a bass note and obvious on speech formants.
- **Assuming one sideband can be filtered easily at any IF.** The gap between sidebands is twice the lowest audio frequency (600 Hz for a 300 Hz audio floor), so the filter Q is $f_{IF}/600$ — about 1700 at 1 MHz and much worse at higher IFs. This is why the filter method works at a low IF and why the phase-shift method exists.
- **Believing SSB halves the *power* only.** SSB halves the bandwidth *and* halves the power relative to DSB-SC; relative to AM it is a quarter of the power and half the bandwidth. Both savings must be stated.
- **Ignoring the peak-to-average ratio of SSB.** SSB transmitters are rated in PEP because voice peaks are many times the average power; an amplifier that is linear enough for AM may still distort SSB peaks, splattering into adjacent channels.
- **Expecting a suppressed-carrier signal to provide AGC.** AGC derived from the carrier disappears when the carrier is suppressed, so DSB-SC and SSB receivers need AGC derived from the recovered audio or from the IF envelope, and they need an accurate BFO — three extra receiver blocks compared with AM.

## See Also

- [[01_AM_Fundamentals_and_Modulation_Index]]
- [[02_AM_Spectrum,_Bandwidth_and_Power]]
- [[04_VSB_and_AM_Variants_Comparison]]
- [[12_Superheterodyne_Receiver]]

---

[[02_AM_Spectrum,_Bandwidth_and_Power|⬅ 02]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[04_VSB_and_AM_Variants_Comparison|04 ➡]]
