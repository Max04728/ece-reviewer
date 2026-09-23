---
id: EST-02-04
title: "VSB and AM Variants Comparison"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 4
tier: 3
depth: full
problem_count: 0
prereqs: ["[[03_DSB-SC_and_SSB-SC]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — VSB and AM Variants Comparison

> [!abstract] Scope
> Recall the trade-off table for AM, DSB-SC, SSB-SC and VSB, and know why vestigial sideband exists.

## Core Concept

**The one-line picture.** All four schemes are linear (amplitude) modulation: the message spectrum is translated around the carrier, and only the question of *which* parts are transmitted changes. AM sends carrier plus both sidebands; DSB-SC sends both sidebands only; SSB-SC sends one sideband; VSB sends one complete sideband plus a narrow **vestige** (a tapering remnant) of the other. Nothing is gained in noise performance by removing the carrier or a sideband — the benefit is purely in transmitted power and occupied bandwidth, at the cost of receiver complexity.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| AM (DSB with large carrier, DSB-LC) | $BW = 2W, \quad P_t = P_c\left(1+\frac{m^2}{2}\right), \quad \eta_{max} = \frac{1}{3}$ | Simplest receiver (envelope detector, carrier-derived AGC). Standard for medium-wave broadcast. |
| DSB-SC | $BW = 2W, \quad P_t = \frac{P_c m^2}{2}$ | Carrier suppressed by a balanced modulator; requires coherent detection; saves power but no bandwidth. |
| SSB-SC | $BW = W, \quad P_t = \frac{P_c m^2}{4}$ | One sideband; product detector plus BFO; HF voice, marine, point-to-point. Peak envelope power rating. |
| VSB (vestigial sideband) | $BW = W + f_v \approx 1.25W$ | One full sideband plus a vestige of the other; used for analogue TV video and some data links. |
| VSB symmetry condition | $H(f_c-f) + H(f_c+f) = \mathrm{constant\ over\ the\ vestige}$ | Vestigial symmetry. It is what makes distortionless detection possible with a simple envelope detector. |
| Power and bandwidth comparison at m = 1 | $P:\ 1.5 : 0.5 : 0.25\ P_c \quad BW:\ 2W : 2W : W$ | AM : DSB-SC : SSB-SC. Savings versus AM: 4.77 dB and 7.78 dB respectively. |
| Detector required | $\mathrm{envelope:\ AM,\ VSB} \qquad \mathrm{coherent/BFO:\ DSB-SC,\ SSB}$ | A transmitted (or reinserted) carrier is what makes envelope detection possible. |
| Vestige width rule | $f_v \gtrsim f_{min}\ \mathrm{of\ the\ baseband}$ | Wide enough to cover the lowest message frequency; TV video uses 0.75 MHz of a 4.2 MHz baseband. |
| Analogue TV example | $4.2\ \mathrm{MHz}\ \mathrm{video} \rightarrow 6\ \mathrm{MHz}\ \mathrm{channel}$ | VSB saves about 1.25 MHz per channel compared with DSB and allows an envelope detector in a cheap receiver. |
| Carrier reinsertion error | $\mathrm{phase\ error} \rightarrow \cos\phi\ \mathrm{scaling\ or\ distortion}; \quad \mathrm{freq\ error} \rightarrow \mathrm{audio\ shift}$ | DSB-SC has a quadrature null at 90 degrees; SSB shifts all audio by the BFO error in hertz. |
| Why VSB instead of SSB for video | $\mathrm{SSB\ filter\ at\ } f_c\ \mathrm{with\ baseband\ to\ DC\ is\ unrealisable}$ | Video has significant energy near DC, so the sidebands touch at the carrier and no practical filter can separate them. |

## Traps & Exam Notes

- **Treating VSB as 'SSB with a bit of the other sideband left over by accident'.** The vestige is deliberate and the filter is designed so that $H(f_c-f)+H(f_c+f)$ is constant across it. Remove the vestige, or filter it asymmetrically, and the envelope-detected video is distorted.
- **Claiming SSB is 'twice as efficient in power' as DSB-SC.** SSB is half of DSB-SC in power and half in bandwidth; versus AM at $m=1$ it is a quarter of the power ($7.78\ \mathrm{dB}$) and half the bandwidth. Mixing the baselines produces wrong dB figures.
- **Assuming removing the carrier improves the *noise* performance.** Carrier suppression saves transmitted power and nothing else; the post-detection SNR at equal received sideband power is unchanged. Noise performance is a property of the modulation *type* (linear versus angle), not of which sidebands are kept — compare with [[10_AM_vs_FM_Noise_Comparison]].
- **Forgetting that VSB still needs a small carrier.** VSB is normally transmitted with a carrier (or a pilot) so that a simple envelope detector works; that is why its power efficiency is close to AM's rather than SSB's.
- **Using the wrong bandwidth for VSB.** $BW = W + f_v$, not $W$ and not $2W$: one full sideband of width $W$ plus a vestige $f_v$ on the other side of the carrier.

## See Also

- [[03_DSB-SC_and_SSB-SC]]
- [[02_AM_Spectrum,_Bandwidth_and_Power]]
- [[01_AM_Fundamentals_and_Modulation_Index]]
- [[10_AM_vs_FM_Noise_Comparison]]

---

[[03_DSB-SC_and_SSB-SC|⬅ 03]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[05_FM_and_PM_Fundamentals|05 ➡]]
