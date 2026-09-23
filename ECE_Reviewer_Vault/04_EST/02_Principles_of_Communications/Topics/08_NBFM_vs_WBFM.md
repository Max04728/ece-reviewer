---
id: EST-02-08
title: "NBFM vs WBFM"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 8
tier: 3
depth: full
problem_count: 0
prereqs: ["[[07_Carson’s_Rule_and_FM_Bandwidth]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — NBFM vs WBFM

> [!abstract] Scope
> Recall the narrowband and wideband FM regimes, how each is generated, and how their bandwidth and noise performance compare.

## Core Concept

**One parameter separates the two regimes.** Everything about FM follows from the modulation index $\beta = \Delta f/f_m$. **NBFM** keeps $\beta \le 1$ (typically $\beta \le 0.5$), so the deviation is small compared with the modulating frequency and Carson's rule collapses to $BW\approx2f_m$. **WBFM** makes $\beta \gg 1$, so the bandwidth is essentially $2\Delta f$ and the signal occupies many times the message bandwidth. The same transmitter hardware can sit in either regime — it is the deviation setting, not the circuit, that decides.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| NBFM index and bandwidth | $\beta \le 1 \ (\mathrm{often} \le 0.5), \qquad BW \approx 2f_m$ | Spectrum is carrier plus one significant sideband pair, like AM in width. |
| NBFM sideband amplitude | $A_{sb} = \frac{A_c\beta}{2}, \qquad J_0 \approx 1, \ J_1 \approx \frac{\beta}{2}$ | Small-index Bessel limit. The sidebands are in phase opposition, which is why the NBFM envelope differs from AM. |
| WBFM index and bandwidth | $\beta \gg 1, \qquad BW \approx 2\Delta f = 2\beta f_m$ | Many significant sidebands: n_max ~ beta + 1 per side. Broadcast FM: 180 kHz. |
| Exact (Carson) bandwidth | $BW = 2(\Delta f + f_m) = 2f_m(1+\beta)$ | Covers both regimes; reduces to 2fm for NBFM and 2 df for WBFM. |
| Spectrum appearance | $\mathrm{NBFM:\ } f_c, f_c\pm f_m; \qquad \mathrm{WBFM:\ } f_c \pm n f_m, \ n = 0 \dots n_{max}$ | NBFM has three lines; WBFM has an extended family whose amplitudes follow Jn(beta). |
| Generation - direct method | $\mathrm{VCO\ /\ reactance\ modulator} \rightarrow \mathrm{deviation\ set\ by\ } k_f A_m$ | Carrier stability is poor, so a crystal reference and an AFC loop (or a PLL) are used; typical of NBFM and of wideband VCO-based transmitters. |
| Generation - indirect (Armstrong) | $\mathrm{crystal\ osc} \rightarrow \mathrm{NBFM\ (balanced\ modulator)} \rightarrow \times n \rightarrow \mathrm{mixer}$ | Frequency multipliers multiply deviation and carrier by n while keeping beta fixed; the mixer moves the result to the final channel. |
| Frequency multiplication effect | $f_c \rightarrow n f_c, \quad \Delta f \rightarrow n\Delta f, \quad \beta \mathrm{\ unchanged}$ | A ×3 multiplier turns 25 kHz of deviation into 75 kHz, which is how WBFM is made from an NBFM source. |
| Noise improvement scaling | $\frac{S_o}{N_o} \propto \beta^{2} \ \mathrm{(single-tone,\ above\ threshold)}$ | WBFM's large beta is bought with bandwidth; each doubling of beta gives about 6 dB. |
| Comparison summary | $\mathrm{NBFM:\ } 2f_m,\ \mathrm{low\ improvement}, \mathrm{\ NBFM/voice} \quad \mathrm{WBFM:\ } 2\Delta f,\ \mathrm{high\ improvement}, \mathrm{\ broadcast}$ | Bandwidth and noise performance trade directly against each other. |

## Traps & Exam Notes

- **Calling NBFM 'AM-like' and then using AM formulas.** The spectrum has three lines, but the sidebands are in phase opposition (the lower sideband is inverted), so the envelope is not $1+m\cos\omega_m t$ and an AM envelope detector does not recover the message correctly. NBFM still needs a discriminator.
- **Using $BW = 2\Delta f$ for NBFM.** In the narrowband regime the deviation is the smaller term: $\Delta f = 500\ \mathrm{Hz}$ with $f_m = 3\ \mathrm{kHz}$ gives 7 kHz by Carson, not 1 kHz. The 2 df approximation belongs to WBFM only.
- **Forgetting that multiplication preserves $\beta$.** A frequency multiplier raises the carrier and the deviation together, so the *index* does not change and the sideband pattern is unchanged in shape — only the frequency scale moves. To reach a final carrier frequency you still need a mixer after the multiplier.
- **Assuming WBFM transmitters can use a free-running oscillator.** Direct generation has poor carrier stability, so practical wideband transmitters use the indirect Armstrong method, or a VCO inside a phase-locked loop locked to a crystal reference.
- **Believing a larger $\beta$ is free.** SNR improvement goes roughly as $\beta^2$ but bandwidth goes as $\beta$, and the threshold effect gets worse at large deviation. WBFM's advantage is purchased with spectrum, and the purchase has a floor (the threshold) below which it collapses.

## See Also

- [[05_FM_and_PM_Fundamentals]]
- [[07_Carson’s_Rule_and_FM_Bandwidth]]
- [[06_FM_Sidebands_and_Bessel_Functions]]
- [[09_FM_Noise_and_Threshold_Effect]]

---

[[07_Carson’s_Rule_and_FM_Bandwidth|⬅ 07]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[09_FM_Noise_and_Threshold_Effect|09 ➡]]
