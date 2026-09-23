---
id: EST-01-07
title: "Friis Cascaded Noise Formula"
part: "04_EST"
area: "01_Signals_Spectra_and_Noise"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_SNR,_Noise_Factor_and_Noise_Figure]]"]
tags: ["ece", "est", "signals_spectra_and_noise"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Friis Cascaded Noise Formula

> [!abstract] Scope
> Combine the noise factors and gains of cascaded stages into one system noise figure, and decide where an amplifier or a lossy component belongs in the chain.

## Core Concept

> [!tip] Intuition
> Each stage's excess noise is divided by all the gain ahead of it. That single sentence is the whole formula: put a high-gain, low-noise stage first and everything after it becomes almost irrelevant; put loss first and you have multiplied the noise of the entire chain.

**The formula.** For stages in cascade, $F = F_1 + \dfrac{F_2-1}{G_1} + \dfrac{F_3-1}{G_1G_2} + \cdots$, where each $F_i$ is a dimensionless noise factor and each $G_i$ is an **available power gain ratio**. The overall gain is simply the product $G = G_1G_2G_3$, i.e. the sum in dB. The structure of the formula is the message: the first stage contributes its full excess noise $(F_1-1)$, the second only $(F_2-1)/G_1$, the third only $(F_3-1)/(G_1G_2)$, and so on. There is no division of the first term by anything, which is why the first stage sets the floor.

**Numbers to make the dominance concrete.** A first stage with $G_1 = 20\ \mathrm{dB}$ (a ratio of 100) divides every later contribution by 100 — a 0.05 dB effect from a 6 dB second stage. A first stage with $G_1 = 0\ \mathrm{dB}$ (a ratio of 1) passes later stages through unchanged. A first stage that is a *loss*, say $G_1 = 0.5$, both adds its own $F_1 = 2$ and **doubles** every later stage's excess noise. This is why a receiver's noise figure is decided by the components between the antenna and the first amplifier: connectors, switches, filters, lightning arrestors and feedline all sit in the worst possible place.

**The loss-before-amplifier result.** If a matched attenuator of loss ratio $L$ (so $G_1 = 1/L$, $F_1 = L$ at $T_0$) precedes an amplifier of noise factor $F_2$, Friis collapses to $F_{total} = L + L(F_2-1) = L\,F_2$. In dB this is beautifully simple:
$$\mathrm{NF}_{total} = L_{\mathrm{dB}} + \mathrm{NF}_2$$
A 6 dB pad in front of a 2 dB NF amplifier gives $6 + 2 = 8\ \mathrm{dB}$ system noise figure, a result worth memorising because it is the standard penalty for a long feedline, a switch, or a filter placed ahead of the LNA. Equivalently in temperature form, a passive loss at $T_p$ contributes $T_p(1-1/L)$ and multiplies everything downstream by $L$.

**Working these problems reliably.** Three conversions must be done before the formula is evaluated: every NF in dB to a ratio $F = 10^{\mathrm{NF}/10}$, every gain in dB to a ratio $G = 10^{G_{\mathrm{dB}}/10}$, and every conversion loss to a ratio below 1 ($6\ \mathrm{dB}$ loss → $G = 0.251$). Then compute $F$, and only then convert back with $10\log_{10}F$. Problems can run in reverse too: given a target system NF, a fixed $F_1$ and a fixed $F_2$, the required first-stage gain is $G_1 \ge \dfrac{F_2-1}{F_{target}-F_1}$ — a genuinely useful design inequality, since no amount of later-stage cleverness can fix an inadequate $G_1$.

**When the formula does not hold.** Friis assumes each stage is linear, matched, and that its added noise is uncorrelated with the source noise and with other stages' noise, and that all stages share one noise bandwidth. It breaks for mixers, whose noise factor depends on whether the image response is counted (single- vs double-sideband noise figure) and whose conversion loss is not a simple available gain; for frequency-dependent stages, where F must be handled band by band; and for mismatched interfaces, where the available gain is not the transducer gain and the reflected power changes the effective chain. In those cases the temperature form with measured data, or a full noise-parameter analysis, is the honest route.

**Name collision, settled once.** The **Friis noise formula** on this page combines cascaded stage noise factors and gains into a system noise figure. The **Friis transmission equation**, $P_r/P_t = G_tG_r(\lambda/4\pi d)^2$, belongs to EST-06 §06 and predicts received power from antenna gains, wavelength and distance. They share only the name 'Friis'. If the given data mentions distance in metres, wavelength, or antenna gain in dBi, it is a transmission-equation problem; if it mentions noise figures, gain in dB and bandwidth, it is this page.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Friis cascaded noise formula (n stages) | $F = F_1 + \frac{F_2-1}{G_1} + \frac{F_3-1}{G_1G_2} + \cdots$ | Fi are ratios (not dB) and Gi are available power gain ratios (not dB). |
| Two-stage case | $F = F_1 + \frac{F_2-1}{G_1}$ | Use when only a front end and a following block are given; the workhorse exam form. |
| Three-stage case | $F = F_1 + \frac{F_2-1}{G_1} + \frac{F_3-1}{G_1G_2}$ | The third stage divides by the product of the first two gains. |
| Cascaded noise temperature | $T_e = T_{e1} + \frac{T_{e2}}{G_1} + \frac{T_{e3}}{G_1G_2}$ | Algebraically identical to the F form; often easier for low-noise work. |
| Overall cascade gain | $G = G_1 G_2 G_3, \qquad G_{\mathrm{dB}} = G_{1,\mathrm{dB}} + G_{2,\mathrm{dB}} + G_{3,\mathrm{dB}}$ | Gains in dB add; gains in the Friis formula must be ratios. |
| Unit conversions before substituting | $F = 10^{\mathrm{NF}/10}, \qquad G = 10^{G_{\mathrm{dB}}/10}$ | A conversion loss of 6 dB becomes G = 0.251, not 6. |
| System noise figure in dB | $\mathrm{NF} = 10\log_{10}\left(F_1 + \frac{F_2-1}{G_1} + \cdots\right)$ | Convert only at the very end; never add stage NFs. |
| Lossy stage at T0 | $F_1 = L = \frac{1}{G_1}$ | A matched attenuator at 290 K has noise figure equal to its loss in dB. |
| Lossy component before an amplifier | $F_{total} = L\,F_2 \quad\Rightarrow\quad \mathrm{NF}_{total} = L_{\mathrm{dB}} + \mathrm{NF}_{2,\mathrm{dB}}$ | The classic penalty: every dB of loss ahead of the LNA adds directly to the system NF. |
| Required first-stage gain for a target | $G_1 \ge \frac{F_2-1}{F_{target}-F_1}$ | Assumes F_target > F1; if not, the target is unreachable at any gain. |
| Friis TRANSMISSION equation (different formula) | $\frac{P_r}{P_t} = G_t G_r \left(\frac{\lambda}{4\pi d}\right)^{2}$ | EST-06 §06. Predicts received power; shares only the name 'Friis' with the cascaded noise formula above. |

## Interactive Widget

**Noise Cascade Calculator**

![[Noise_Cascade_Calculator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A receiver front end consists of an LNA with $1.76\ \mathrm{dB}$ noise figure and $13\ \mathrm{dB}$ gain, followed by a mixer with a $6\ \mathrm{dB}$ noise figure. Find the overall noise factor and noise figure.

**Given:** LNA: NF = 1.76 dB, G = 13 dB; mixer: NF = 6 dB

**Solution:**

1. Convert: F1 = 10^(0.176) = 1.5; G1 = 10^(1.3) = 20; F2 = 10^(0.6) = 3.98
2. Friis two-stage: F = F1 + (F2 - 1)/G1
3. = 1.5 + (3.98 - 1)/20 = 1.5 + 0.149
4. F = 1.649
5. NF = 10 log10(1.649) = 2.17 dB

> [!success]- Answer
> **F = 1.65; NF = 2.17 dB.**

> [!warning] Trap
> Adding 1.76 + 6 = 7.76 dB. The mixer's 6 dB is divided by the LNA gain of 20, contributing only 0.62 dB, because noise factors are ratios and cascaded noise figures do not add.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(0.176) : 10^(1.3) : 10^(0.6)` → **1.500** ($F_1$) → **19.95** ($G_1$) → **3.981** ($F_2$).
> 2. `1.5+(3.981-1)÷19.95` → $F$ = **1.6494**.
> 3. `10log(1.6494)` → **2.173** dB ≈ **2.17** dB.
>
> Convert every stage to a ratio first; adding 1.76 + 6 = 7.76 dB is the trap.

### P2. A $6\ \mathrm{dB}$ lossy bandpass filter sits between the antenna and an LNA with a $2\ \mathrm{dB}$ noise figure and $30\ \mathrm{dB}$ gain. Find the system noise figure.

**Given:** filter loss = 6 dB; LNA NF = 2 dB; LNA G = 30 dB; T = 290 K

**Solution:**

1. Filter as stage 1: G1 = 10^(-0.6) = 0.2512, so F1 = L = 3.98
2. LNA as stage 2: F2 = 10^(0.2) = 1.585, G2 = 1000
3. F = F1 + (F2 - 1)/G1 = 3.98 + (0.585)/0.2512 = 3.98 + 2.329
4. F = 6.309
5. Shortcut check: F = L x F2 = 3.98 x 1.585 = 6.31
6. NF = 10 log10(6.31) = 8.0 dB

> [!success]- Answer
> **F = 6.31; NF = 8.0 dB — exactly the 6 dB loss plus the 2 dB LNA figure.**

> [!warning] Trap
> Answering 2 dB 'because the LNA has 30 dB gain'. Gain *after* the loss cannot undo the loss: the filter attenuates the signal before the LNA ever sees it, so its loss adds directly.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(6÷10) : 10^(-6÷10) : 10^(2÷10)` → **3.981** ($F_1 = L$) → **0.2512** ($G_1$) → **1.585** ($F_2$).
> 2. `3.981+(1.585-1)÷0.2512` → $F$ = **6.310**; the shortcut `3.981×1.585` → **6.310** confirms it.
> 3. `10log(6.310)` → **8.00** dB = the 6 dB loss plus the 2 dB LNA figure.
>
> A loss is a gain below 1, so it both contributes $F_1$ = 3.98 and magnifies the LNA's excess noise about 4x.

### P3. Three stages are cascaded: stage 1 has $F_1 = 2$, $G_1 = 100$; stage 2 has $F_2 = 5$, $G_2 = 10$; stage 3 has $F_3 = 10$. Find the overall noise factor and noise figure.

**Given:** F1 = 2, G1 = 100; F2 = 5, G2 = 10; F3 = 10

**Solution:**

1. Term 1: F1 = 2
2. Term 2: (F2 - 1)/G1 = 4/100 = 0.04
3. Term 3: (F3 - 1)/(G1 G2) = 9/(100 x 10) = 9/1000 = 0.009
4. F = 2 + 0.04 + 0.009 = 2.049
5. NF = 10 log10(2.049) = 3.12 dB

> [!success]- Answer
> **F = 2.049; NF = 3.12 dB.**

> [!warning] Trap
> Dividing stage 3 by G1 + G2 = 110 or by G2 = 10 alone. Each stage is divided by the product of *all* gains ahead of it.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4÷100 : 9÷1000` → **0.04** → **0.009** (the stage-2 and stage-3 contributions, each over all gain ahead).
> 2. `2+0.04+0.009` → $F$ = **2.049**.
> 3. `10log(2.049)` → **3.115** dB ≈ **3.12** dB.
>
> Stage 3 divides by $G_1 G_2$ = 1000, not by $G_2$ = 10 or by $G_1 + G_2$ = 110.

### P4. A receiver chain is LNA (NF = 2 dB, gain = 20 dB) → mixer (conversion loss = 6 dB, NF = 8 dB) → IF amplifier (NF = 4 dB, gain = 20 dB). Find the overall noise figure.

**Given:** LNA: NF 2 dB, G 20 dB; mixer: loss 6 dB, NF 8 dB; IF amp: NF 4 dB, G 20 dB

**Solution:**

1. F1 = 1.585, G1 = 100
2. F2 = 6.31, G2 = 10^(-0.6) = 0.2512 (conversion loss is a gain below 1)
3. F3 = 2.512, G3 = 100
4. Term 2: (6.31 - 1)/100 = 0.0531
5. Term 3: (2.512 - 1)/(100 x 0.2512) = 1.512/25.12 = 0.0602
6. F = 1.585 + 0.0531 + 0.0602 = 1.698
7. NF = 10 log10(1.698) = 2.30 dB

> [!success]- Answer
> **F = 1.698; NF = 2.30 dB.**

> [!warning] Trap
> Treating the 6 dB mixer conversion loss as G2 = 6 (or omitting it) and so dividing the IF amplifier's excess noise by 600 instead of 25.1. A lossy stage makes everything after it worse, so it must appear as G < 1.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(0.2) : 10^(0.8) : 10^(-0.6) : 10^(0.4)` → **1.585** → **6.310** → **0.2512** → **2.512** ($F_1, F_2, G_2, F_3$).
> 2. `(6.310-1)÷100 : (2.512-1)÷(100×0.2512)` → **0.0531** → **0.0602** (terms 2 and 3).
> 3. `1.585+0.0531+0.0602` → $F$ = **1.698**; `10log(Ans)` → **2.300** dB ≈ **2.30** dB.
>
> The mixer's 6 dB conversion loss must enter as $G_2$ = 0.2512, not as +6 dB of gain.

### P5. Decide which formula each situation needs, and state the deciding quantity: (a) an LNA and mixer with quoted noise figures and gains, (b) a 10 W transmitter with a 15 dBi antenna communicating over 20 km to a 3 dBi antenna at 2.4 GHz.

**Given:** (a) noise figures, gains, bandwidth; (b) power, antenna gains, distance, wavelength

**Solution:**

1. (a) The data are noise figures and gains in dB, so this is the Friis cascaded NOISE formula: convert NF to F, apply F = F1 + (F2-1)/G1, convert back to dB
2. (b) The data are transmit power, antenna gains, distance and wavelength, so this is the Friis TRANSMISSION equation: Pr/Pt = GtGr(lambda/4 pi d)^2 with lambda = c/f = 0.125 m
3. The deciding quantity is what is asked: system noise temperature/figure (a) versus received power (b)

> [!success]- Answer
> **(a) Friis noise formula; (b) Friis transmission equation. The two share a name but no variables.**

> [!warning] Trap
> Mixing them because both are called 'Friis'. Distance and wavelength belong only to the transmission equation; noise factor, gain in dB and bandwidth belong only to the noise formula.

## Traps & Exam Notes

- **Adding cascaded noise figures in dB.** Noise figure is a **power ratio in dB**, so cascaded NF does not add directly — you must convert each stage to a noise factor, apply Friis with gains as ratios, then convert back with $10\log_{10}$. A 2 dB LNA followed by a 6 dB mixer behind 20 dB of gain gives 2.17 dB, not 8 dB.
- **Confusing the two Friis formulas.** This page combines cascaded noise factors and gains into a system noise figure (EST-01 §07). The Friis **transmission** equation in EST-06 §06 computes received power from $G_tG_r(\lambda/4\pi d)^2$. Same name, different variables, different areas.
- **Using dB gain inside the denominators.** $(F_2-1)/G_1$ needs $G_1 = 100$ for 20 dB. Substituting 20 inflates the second stage's contribution five-fold and can change the answer by several dB.
- **Forgetting that losses are gains below 1.** A 6 dB conversion loss is $G = 0.251$; it both adds its own $F = 3.98$ and magnifies every later stage's excess noise by about 4x. Treating it as $+6$ dB of gain is a sign error that produces an absurdly optimistic system NF.
- **Placing the low-noise amplifier after a lossy component.** Every dB of loss ahead of the LNA adds directly to the system noise figure (attenuator-first gives $F = L\,F_2$), and no downstream gain can recover the SNR that the loss destroyed.
- **Assuming a high-gain first stage makes everything else irrelevant.** It suppresses later stages, but any component *before* it — a filter, a switch, a connector — is stage 1 and its loss is unprotected. Put the LNA at the antenna.
- **Believing the formula covers mixers without qualification.** A mixer's noise figure depends on whether the image band is counted (SSB vs DSB) and on its conversion loss; silently treating it as an ordinary amplifier stage gives a system NF that is 3 dB off.
- **Rounding intermediate ratios too early.** Converting NF to F and back at every stage accumulates error; keep the ratios to four significant figures and convert to dB once, at the end.

## See Also

- [[05_SNR,_Noise_Factor_and_Noise_Figure]]
- [[06_Equivalent_Noise_Temperature]]
- [[03_Thermal_and_Johnson_Noise]]
- [[12_Superheterodyne_Receiver]]

---

[[06_Equivalent_Noise_Temperature|⬅ 06]] · [[_MOC_Signals_Spectra_and_Noise|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Sampling_Theorem_and_Aliasing|08 ➡]]
