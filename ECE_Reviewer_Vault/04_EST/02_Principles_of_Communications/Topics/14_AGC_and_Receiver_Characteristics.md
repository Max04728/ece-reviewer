---
id: EST-02-14
title: "AGC and Receiver Characteristics"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 14
tier: 3
depth: full
problem_count: 0
prereqs: ["[[12_Superheterodyne_Receiver]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — AGC and Receiver Characteristics

> [!abstract] Scope
> Recall what automatic gain control does to a receiver and the standard vocabulary used to specify receiver performance.

## Core Concept

**AGC in one line.** Automatic gain control derives a DC voltage from the demodulator or IF level and feeds it back to reduce the gain of the RF and IF stages as the input signal grows, so that the demodulator sees a roughly constant level. It prevents overload and keeps the audio output steady as the receiver is tuned across stations of different strength. It does **not** improve signal-to-noise ratio: a strong signal already has a good SNR, and reducing gain reduces signal and noise together. AGC is a dynamic-range tool, not a noise tool.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| AGC action | $G_{RF,IF} \downarrow \ \mathrm{as} \ P_{in} \uparrow \ \Rightarrow\ P_{demod} \approx \mathrm{constant}$ | Feedback from the detector to the RF/IF gain stages. Does not change SNR. |
| AGC range (figure of merit) | $\mathrm{AGC\ range} = 20\log_{10}\frac{V_{in,max}}{V_{in,min}}\ \mathrm{dB}$ | The input range over which the output stays within a stated tolerance; typical AM receivers: 60-80 dB. |
| Simple AGC | $\mathrm{gain\ reduction\ begins\ as\ soon\ as\ the\ signal\ exceeds\ the\ noise}$ | Reduces gain for weak signals too, so sensitivity at the threshold suffers. |
| Delayed AGC | $\mathrm{no\ gain\ reduction\ until\ } P_{in} > P_{threshold}$ | Preserves maximum sensitivity for weak signals; standard in quality receivers. The delay is electrical, not temporal. |
| Reverse versus forward AGC | $\mathrm{reverse:\ gain\ falls\ as\ AGC\ voltage\ rises\ (common)}; \quad \mathrm{forward:\ gain\ rises\ with\ it}$ | Depends on the controlled device (transistor versus FET), not on the receiver's quality. |
| AGC time constants | $\tau_{attack} \ll \tau_{decay} \ (\mathrm{typically\ } 0.1\mathrm{-}1\ \mathrm{s decay for AM})$ | Too fast and the AGC follows the modulation (distortion); too slow and it cannot follow fading. |
| Sensitivity (AM) | $\mathrm{minimum\ input\ for\ } 10\ \mathrm{dB}\ \mathrm{S/N\ at\ } 30\ \%\ \mathrm{modulation}$ | Limited by the receiver's noise figure and bandwidth, not by its gain. |
| Sensitivity (FM) | $\mathrm{minimum\ input\ for\ } 12\ \mathrm{dB}\ \mathrm{SINAD}$ | Standard FM sensitivity specification; related to the quieting curve near threshold. |
| Noise-limited sensitivity | $P_{n,in} = k T_0 B F$ | The floor below which no signal can be recovered; -174 dBm/Hz + 10log10 B + NF. |
| Selectivity | $\mathrm{adjacent-channel\ rejection\ (dB)}; \quad \mathrm{shape\ factor} = \frac{BW_{60\,\mathrm{dB}}}{BW_{6\,\mathrm{dB}}}$ | Set by the IF filter. Shape factor close to 1 means steep skirts. |
| Dynamic range | $DR = 20\log_{10}\frac{V_{max}}{V_{min}} \quad \mathrm{or} \quad \tfrac{2}{3}(IIP3 - \mathrm{noise\ floor})$ | Definitions differ; state whether the upper limit is the 1 dB compression point or the blocking level. |
| Fidelity | $\mathrm{flat\ amplitude\ and\ linear\ phase\ over\ the\ message\ band}$ | Degraded by a too-narrow IF, by poor group delay, and by an over-fast AGC. |
| Capture ratio (FM) | $\approx 6\ \mathrm{dB} \ \mathrm{typical}, \ 1\mathrm{-}2\ \mathrm{dB} \ \mathrm{for\ a\ good\ receiver}$ | Wanted-to-unwanted ratio at which the stronger FM signal suppresses the weaker. |
| Spurious responses | $\mathrm{image,\ IF\ feedthrough,\ LO\ harmonics,\ intermodulation}$ | Specified as rejection in dB; not improved by AGC. |
| SSB and DSB-SC AGC | $\mathrm{no\ transmitted\ carrier} \Rightarrow \mathrm{carrier-derived\ AGC\ fails}$ | Use audio-derived or IF-envelope AGC instead. |

## Traps & Exam Notes

- **Expecting AGC to improve the signal-to-noise ratio.** AGC reduces gain; signal and noise fall together, so the SNR is unchanged. It protects against overload and keeps the audio level constant — that is all.
- **Confusing sensitivity with selectivity.** Sensitivity is the weakest signal that yields an acceptable output SNR (a noise-figure property); selectivity is the ability to reject adjacent channels (an IF-filter property). A receiver can be very sensitive and still useless next to a strong local station.
- **Making the AGC too fast.** If the AGC time constant is comparable to the modulation period, the loop follows the envelope and *removes* the modulation — audible as severe distortion on AM and as pumping on voice peaks. The decay must be slow relative to the lowest audio frequency.
- **Using simple AGC where delayed AGC is needed.** Simple AGC begins reducing gain as soon as any signal is present, so weak signals are received at reduced gain and the receiver's effective sensitivity is worse than its specification. Delayed AGC holds full gain until a threshold is crossed.
- **Assuming carrier-derived AGC works for SSB or DSB-SC.** Those signals have no carrier to derive the control voltage from, so AGC must come from the recovered audio or the IF envelope, with correspondingly different time-constant requirements.
- **Quoting a dynamic range without defining its limits.** Dynamic range may mean noise floor to 1 dB compression, noise floor to blocking, or noise floor to the third-order intercept; the numbers differ by tens of dB. Always state the definition.
- **Ignoring that AGC can mask overload.** A receiver whose AGC holds the output constant may still be generating intermodulation and cross-modulation products in its front end, so a clean audio output does not prove the front end is linear.
- **Treating selectivity as a single number.** Adjacent-channel selectivity, alternate-channel selectivity and the shape factor describe different things; a filter can have excellent 6 dB bandwidth and poor 60 dB skirts, letting strong nearby stations through.

## See Also

- [[12_Superheterodyne_Receiver]]
- [[13_Image_Frequency_and_IRR]]
- [[05_SNR,_Noise_Factor_and_Noise_Figure]]
- [[11_Pre-Emphasis_and_De-Emphasis]]

---

[[13_Image_Frequency_and_IRR|⬅ 13]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
