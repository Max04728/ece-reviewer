---
id: EST-01-05
title: "SNR, Noise Factor and Noise Figure"
part: "04_EST"
area: "01_Signals_Spectra_and_Noise"
topic: 5
tier: 1
depth: full
problem_count: 9
prereqs: ["[[03_Thermal_and_Johnson_Noise]]", "[[02_Power_Spectral_Density]]"]
tags: ["ece", "est", "signals_spectra_and_noise"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — SNR, Noise Factor and Noise Figure

> [!abstract] Scope
> Compute signal-to-noise ratio anywhere in a receiver chain, convert between noise factor, noise figure and added noise, and combine stage noise with the Friis noise-factor formula.

## Core Concept

> [!tip] Intuition
> Noise figure answers exactly one question: how much worse is the output SNR than the input SNR? Because a real amplifier adds its own noise, the answer is always a degradation of 1 or more, and the first stage's contribution is weighted by the gain of everything after it — which is why the low-noise amplifier goes first.

**SNR is a power ratio at a stated point.** Signal-to-noise ratio is $\mathrm{SNR} = P_s/P_n$ at a specific node, with both powers measured in the **same bandwidth**. In decibels, $\mathrm{SNR_{dB}} = 10\log_{10}(P_s/P_n)$; if the problem hands you rms voltages across the same impedance, the ratio of voltages is squared first. SNR is not a property of a signal alone — it is a property of the signal *and* the noise bandwidth you are looking through, so widening the filter always lowers SNR even when nothing else changes.

**Noise factor: the definition and why it is a pure number.** For a linear two-port driven by a source at the standard reference temperature $T_0 = 290\ \mathrm{K}$, the noise factor is $F = \dfrac{S_i/N_i}{S_o/N_o}$, the ratio of input SNR to output SNR. It is dimensionless and always $\ge1$ because no real network can improve SNR. The noise figure is just that ratio in decibels, $\mathrm{NF} = 10\log_{10}F$; an ideal noiseless network has $F=1$, $\mathrm{NF}=0\ \mathrm{dB}$. The two symbols are not interchangeable in the Friis formula — you must convert NF back to F before dividing by gain.

**The working form: output noise relative to a noiseless network.** Since the network is linear, $S_o = G S_i$ with $G$ the available power gain, so $S_i$ cancels out of the definition and $F = \dfrac{N_o}{G N_i} = \dfrac{N_o}{G k T_0 B}$. Read this as a ratio of two noise powers: the noise you actually measure at the output, divided by the noise that *would* appear there if the network were noiseless and the source were at 290 K. This is the most useful form in practice, because a single output-noise measurement plus the gain and bandwidth determines F. Inverted, $N_o = F\,G\,k T_0 B$ — the standard noise-power budget equation, which in dB is simply $-174 + 10\log_{10}B + G_{\mathrm{dB}} + \mathrm{NF}$ dBm.

**Noise temperature and added noise.** The network's own contribution can be referred to the input as a fictitious temperature: $F = 1 + T_e/T_0$, equivalently $T_e = T_0(F-1)$ (see [[06_Equivalent_Noise_Temperature]]). Equivalently, the noise the network adds, referred to its input, is $N_{ai} = (F-1)k T_0 B$. These three views — F, $T_e$, and added input noise — are algebraically identical, and the exam can start from any one of them. A useful anchor set:
$$\mathrm{NF} = 1\ \mathrm{dB}$$
means $F = 1.26$, $T_e \approx 75\ \mathrm{K}$;
$$\mathrm{NF}=3\ \mathrm{dB}$$
means $F=2$, $T_e = 290\ \mathrm{K}$;
$$\mathrm{NF}=10\ \mathrm{dB}$$
means $F=10$, $T_e = 2610\ \mathrm{K}$.

**Passive loss: an attenuator is a noise source.** A matched attenuator at $T_0$ with loss ratio $L = 1/G$ has $F = L$. A 3 dB pad therefore has $\mathrm{NF} = 3\ \mathrm{dB}$ and a 10 dB pad has $\mathrm{NF} = 10\ \mathrm{dB}$: its noise figure numerically equals its loss, and it can never be better than that. This one result explains a large fraction of real receiver noise budgets — a lossy cable or filter ahead of an amplifier adds exactly its loss in dB to the system noise figure, which is why the LNA is mounted at the antenna rather than at the receiver.

**Cascading: the Friis noise formula.** For stages in cascade the overall noise factor is $F = F_1 + \dfrac{F_2-1}{G_1} + \dfrac{F_3-1}{G_1G_2} + \cdots$ where all gains are **power ratios, not decibels**. Each later stage's excess noise is divided by all the gain ahead of it, so the first stage's noise factor is the floor and the first stage's gain suppresses everything after. Two consequences govern every receiver design decision: (1) an LNA must have both low NF *and* high gain to be useful, and (2) a loss ahead of the LNA (a filter, a connector, a long feedline) is directly added to the system NF, so losses before the first amplifier are the most expensive losses in the chain. Note carefully that this is the Friis **noise** formula, not the Friis **transmission** equation of EST-06 §06 — see the traps and [[07_Friis_Cascaded_Noise_Formula]].

**Where the framework breaks.** F is defined for a source at exactly $T_0 = 290\ \mathrm{K}$; if the source (an antenna looking at cold sky, for example) is at another temperature, the F formalism still works but the *system* noise must be computed with the system noise temperature instead, because the input noise is no longer $kT_0B$. F also assumes a linear network, a matched source, and a single well-defined noise bandwidth. If your computed F comes out below 1, you have made one of those assumptions fail — usually a bandwidth mismatch between the signal and noise measurements, or a gain used in the wrong units.

## Derivation

**From the definition to the output-noise form.** Start with $F = \dfrac{S_i/N_i}{S_o/N_o}$. A linear network gives $S_o = G S_i$, so substituting and cancelling $S_i$ leaves $F = \dfrac{N_o}{G N_i}$. With the standard source $N_i = k T_0 B$, this becomes $F = \dfrac{N_o}{G k T_0 B}$, i.e. $N_o = F G k T_0 B$. In dB this is the budget line $N_o(\mathrm{dBm}) = -174 + 10\log_{10}B + G_{\mathrm{dB}} + \mathrm{NF}$.

**From output noise to equivalent noise temperature.** Write the output noise as the amplified source noise plus the network's own added noise: $N_o = G k T_0 B + N_{added}$. Dividing by $G k T_0 B$ gives $F = 1 + \dfrac{N_{added}}{G k T_0 B}$. Defining $T_e$ by $G k T_e B \equiv N_{added}$ (the added noise referred to the input) yields $F = 1 + \dfrac{T_e}{T_0}$, hence $T_e = T_0(F-1)$ with $T_0 = 290\ \mathrm{K}$.

**Deriving the cascade formula for two stages.** Let stage 1 have gain $G_1$, noise factor $F_1$; stage 2 have $G_2$, $F_2$. The output noise is the amplified source noise, plus stage 1's added noise amplified by stage 2, plus stage 2's added noise: $N_o = G_1G_2\,kT_0B + G_1G_2\,kT_{e1}B + G_2\,kT_{e2}B$. Dividing by $G_1G_2 kT_0B$: $F = 1 + \dfrac{T_{e1}}{T_0} + \dfrac{T_{e2}}{G_1T_0} = F_1 + \dfrac{F_2-1}{G_1}$, using $T_{e}=T_0(F-1)$ on each term. The extension to $n$ stages is the same bookkeeping, each stage divided by the gain ahead of it.

**A passive two-port has $F = 1/G$.** Let a matched attenuator at physical temperature $T_0$ have available gain $G<1$ (loss $L = 1/G$). Its available output noise is $kT_0B$ — a matched passive network at $T_0$ always delivers $kT_0B$ regardless of its loss, because it is itself a resistor at $T_0$ from the output's point of view. The noise factor is therefore $F = \dfrac{kT_0B}{G\,kT_0B} = \dfrac{1}{G} = L$. In dB, $\mathrm{NF} = -G_{\mathrm{dB}} = L_{\mathrm{dB}}$: the noise figure of a passive attenuator equals its loss.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Signal-to-noise ratio | $\mathrm{SNR} = \frac{P_s}{P_n}, \qquad \mathrm{SNR_{dB}} = 10\log_{10}\frac{P_s}{P_n}$ | Signal and noise must be measured in the same bandwidth at the same node. |
| Noise factor (definition) | $F = \frac{S_i/N_i}{S_o/N_o}$ | Source at T0 = 290 K, linear network. Dimensionless and always >= 1. |
| Noise figure | $\mathrm{NF} = 10\log_{10} F, \qquad F = 10^{\mathrm{NF}/10}$ | Convert NF to F before using it in any ratio formula. |
| Noise factor from output noise | $F = \frac{N_o}{G\,k T_0 B}$ | The practical measurement form: one output-noise reading plus gain and bandwidth. |
| Output noise power | $N_o = F\,G\,k T_0 B$ | In dBm: -174 + 10 log10(B) + G_dB + NF. T0 = 290 K is already inside -174. |
| Output SNR from input SNR | $\frac{S_o}{N_o} = \frac{1}{F}\,\frac{S_i}{N_i}, \qquad \mathrm{SNR_{o,dB}} = \mathrm{SNR_{i,dB}} - \mathrm{NF}$ | A network degrades SNR by exactly its noise figure in dB. |
| Equivalent noise temperature | $F = 1 + \frac{T_e}{T_0}, \qquad T_e = T_0(F-1)$ | T0 = 290 K (IEEE reference), not 300 K. |
| Noise added by the network, input-referred | $N_{ai} = (F-1)\,k T_0 B$ | Useful when the source is not at 290 K and the F formalism must be replaced by added noise. |
| Passive attenuator noise factor | $F = L = \frac{1}{G} \quad (T_{\mathrm{phys}} = T_0)$ | Noise figure in dB equals the loss in dB. A 6 dB pad has 6 dB NF. |
| Friis cascaded noise formula | $F = F_1 + \frac{F_2-1}{G_1} + \frac{F_3-1}{G_1G_2} + \cdots$ | Gains are power ratios, not dB. First stage dominates when G1 is large. |
| Three-stage noise figure in dB | $\mathrm{NF} = 10\log_{10}\left(F_1 + \frac{F_2-1}{G_1} + \frac{F_3-1}{G_1G_2}\right)$ | Convert every stage NF to F, apply Friis, then convert back; dB values never add directly. |
| Friis TRANSMISSION equation (different formula) | $\frac{P_r}{P_t} = G_t G_r \left(\frac{\lambda}{4\pi d}\right)^{2}$ | EST-06 §06. Predicts received power from antenna gains and path loss; it shares only the name 'Friis' with the noise formula. |

## Worked Problems

### P1. A receiver input carries a $10\ \mu\mathrm{V}$ rms signal and $0.1\ \mu\mathrm{V}$ rms noise across the same impedance. Find the input SNR in dB.

**Given:** Vs = 10 uV rms; Vn = 0.1 uV rms; same impedance

**Solution:**

1. Voltage ratio = 10/0.1 = 100
2. Power ratio = 100^2 = 1e4
3. SNR = 10 log10(1e4) = 40 dB

> [!success]- Answer
> **SNR = 40 dB.**

> [!warning] Trap
> Computing 20 log10(100) = 40 dB by accident and then using the same shortcut when the ratio is not a clean power of ten. For voltages in the same impedance, SNR_dB = 20 log10(Vs/Vn) = 10 log10(Vs/Vn)^2, and the two agree only because it is a voltage ratio.

### P2. An amplifier measures $S_i/N_i = 40\ \mathrm{dB}$ at its input and $S_o/N_o = 30\ \mathrm{dB}$ at its output. Find its noise factor and noise figure.

**Given:** input SNR = 40 dB; output SNR = 30 dB

**Solution:**

1. F = (Si/Ni)/(So/No)
2. In dB: F_dB = 40 dB - 30 dB = 10 dB
3. F = 10^(10/10) = 10

> [!success]- Answer
> **F = 10; NF = 10 dB.**

> [!warning] Trap
> Reporting F = 10 dB as the dimensionless noise factor. Divide the dB difference to get the noise figure, then convert to a ratio if a ratio is asked for.

### P3. An amplifier has a noise figure of $3\ \mathrm{dB}$. Find its noise factor and equivalent noise temperature.

**Given:** NF = 3 dB; T0 = 290 K

**Solution:**

1. F = 10^(3/10) = 1.995, i.e. 2 for the exact 3.01 dB case
2. Te = T0(F - 1) = 290(2 - 1)
3. Te = 290 K

> [!success]- Answer
> **F = 2 (NF = 3.01 dB); Te = 290 K.**

> [!warning] Trap
> Using Te = 290 x 3 = 870 K by treating the dB figure as the ratio, or using T0 = 300 K. Always convert NF to F first.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(3÷10)` → **1.9952** = $F$; 3 dB is a rounded 3.0103 dB, so the note's $F$ = **2** is the exact-3.01 dB value.
> 2. `290×(2-1)` → $T_e$ = **290** K for that $F$ = 2; with $F$ = 1.9952 it is **288.6** K.
>
> Convert NF to a ratio before subtracting 1: $T_e$ = 290 × 3 = 870 K is the trap, and $T_0$ is 290 K, not 300 K.

### P4. An amplifier with 20 dB gain and 6 dB noise figure has a $100\ \mathrm{kHz}$ noise bandwidth, driven by a matched source at $290\ \mathrm{K}$. Find the output noise power in watts and in dBm.

**Given:** G = 20 dB; NF = 6 dB; B = 100 kHz; T0 = 290 K

**Solution:**

1. Convert: G = 100, F = 10^(6/10) = 3.981
2. Input noise: Ni = kT0B = (1.38e-23)(290)(1e5) = 4.002e-16 W
3. No = F G Ni = (3.981)(100)(4.002e-16) = 1.593e-13 W
4. In dBm: -174 + 10log10(1e5) + 20 + 6 = -174 + 50 + 26 = -98 dBm
5. Check: 1.593e-13 W = 1.593e-10 mW, and 10log10(1.593e-10) = -97.98 dBm

> [!success]- Answer
> **No = 1.59e-13 W = -98 dBm.**

> [!warning] Trap
> Forgetting the noise bandwidth term and answering Ni x G = 4.0e-14 W (-104 dBm). The 6 dB noise figure plus the 50 dB bandwidth factor are both required; the dB budget -174 + B + G + NF catches omissions immediately.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(20÷10) : 10^(6÷10)` → **100** ($G$) → **3.981** ($F$).
> 2. `k×290×1E5×3.981×100` with $k$ = `SHIFT` `CVALUE` `25` → **1.594E-13** W = $F G k T_0 B$.
> 3. `-174+10log(1E5)+20+6` → **-98.0** dBm; the direct check `10log(1.594E-13÷1E-3)` → **-97.98** dBm.
>
> The dB budget -174 + 10log B + G + NF shows a dropped bandwidth or noise-figure term immediately.

### P5. A $10\ \mathrm{dB}$ attenuator at room temperature is inserted between a source and a receiver. What is its noise figure, and what happens to the signal-to-noise ratio passing through it?

**Given:** loss = 10 dB; T = 290 K

**Solution:**

1. Matched passive network: F = L = 1/G, with G = 0.1
2. F = 1/0.1 = 10, so NF = 10 dB
3. A passive attenuator at T0 adds exactly as much noise as it removes signal
4. So the SNR passing through it is unchanged: the 10 dB signal loss is matched by a 10 dB noise loss

> [!success]- Answer
> **NF = 10 dB, and the SNR through the pad is unchanged (0 dB degradation) — but the receiver's own noise figure still degrades the system.**

> [!warning] Trap
> Concluding that the attenuator improves or worsens the SNR passing through it. A matched passive pad at T0 degrades SNR by exactly 0 dB internally (its F is the loss only when it is the whole system with a 290 K source at its input), but placing it ahead of an amplifier adds its loss directly to the system NF.

### P6. Two stages are cascaded: stage 1 has $F_1 = 2$ and $G_1 = 100$; stage 2 has $F_2 = 4$. Find the overall noise factor and noise figure.

**Given:** F1 = 2; G1 = 100 (20 dB); F2 = 4 (6.02 dB)

**Solution:**

1. Friis: F = F1 + (F2 - 1)/G1
2. = 2 + (4 - 1)/100 = 2 + 0.03
3. F = 2.03
4. NF = 10 log10(2.03) = 3.07 dB

> [!success]- Answer
> **F = 2.03; NF = 3.07 dB, barely worse than stage 1 alone (3.01 dB).**

> [!warning] Trap
> Adding the dB figures: 3.01 + 6.02 = 9.03 dB. Cascaded noise figures never add; the second stage's 6 dB is divided by the first stage's gain of 100, contributing only 0.13 dB.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2+(4-1)÷100` → $F$ = **2.03** overall (the 20 dB gain enters as the ratio 100).
> 2. `10log(2.03)` → **3.075** dB ≈ **3.07** dB, against **3.01** dB for stage 1 alone.
>
> Stage 2 adds only 0.03 to $F$ because $G_1$ = 100 divides its excess noise; 3.01 + 6.02 = 9.03 dB is the trap.

### P7. A $3\ \mathrm{dB}$ lossy feedline sits between an antenna and a receiver. Compare the system noise figure when a $1.5\ \mathrm{dB}$ NF LNA (20 dB gain) is placed *after* the line versus *before* it.

**Given:** feedline loss = 3 dB (F = 2, G = 0.5); LNA NF = 1.5 dB (F = 1.4125); LNA G = 20 dB (100)

**Solution:**

1. Case A, line first: F = F_line + (F_LNA - 1)/G_line = 2 + (1.4125 - 1)/0.5 = 2 + 0.825 = 2.825
2. NF_A = 10 log10(2.825) = 4.51 dB
3. Case B, LNA first: F = F_LNA + (F_line - 1)/G_LNA = 1.4125 + (2 - 1)/100 = 1.4225
4. NF_B = 10 log10(1.4225) = 1.53 dB
5. Improvement = 4.51 - 1.53 = 2.98 dB, essentially the whole feedline loss

> [!success]- Answer
> **Line first: 4.51 dB. LNA first: 1.53 dB. Moving the LNA ahead of the loss recovers about 3 dB.**

> [!warning] Trap
> Placing the LNA after the line and then adding 3 dB + 1.5 dB = 4.5 dB 'by inspection' — the right answer here only by coincidence of these numbers. The reliable route is always Friis with F and G ratios, because the recovery depends on the LNA gain.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(1.5÷10) : 10^(3÷10)` → **1.4125** ($F_{\mathrm{LNA}}$) → **1.9953** (the 3 dB pad, $F = L = 2$).
> 2. `2+(1.4125-1)÷0.5` → **2.825**; `10log(Ans)` → **4.51** dB with the line first.
> 3. `1.4125+(2-1)÷100` → **1.4225**; `10log(Ans)` → **1.53** dB with the LNA first — a **2.98** dB recovery.
>
> Below 1 the line's $G$ = 0.5 doubles the LNA's excess noise; ahead of the LNA the same pad divides it by 100 instead.

### P8. A receiver front end has an equivalent noise temperature of $435\ \mathrm{K}$. Find its noise factor and noise figure.

**Given:** Te = 435 K; T0 = 290 K

**Solution:**

1. F = 1 + Te/T0 = 1 + 435/290
2. F = 1 + 1.5 = 2.5
3. NF = 10 log10(2.5) = 3.98 dB

> [!success]- Answer
> **F = 2.5; NF = 3.98 dB (about 4 dB).**

> [!warning] Trap
> Reporting F = 435/290 = 1.5 and forgetting the +1. The '1' is the source noise that is always present at the input.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1+435÷290` → **2.5** = $F$; the leading 1 is the source noise always present at the input.
> 2. `10log(2.5)` → **3.979** dB ≈ **3.98** dB.
>
> Dropping the +1 answers $F$ = 1.5, i.e. 1.76 dB instead of 2.5 and 3.98 dB.

### P9. A receiver with a $6\ \mathrm{dB}$ noise figure is fed a signal whose input SNR is $60\ \mathrm{dB}$. What output SNR results?

**Given:** NF = 6 dB; input SNR = 60 dB

**Solution:**

1. SNR_out = SNR_in / F in ratio form; in dB, subtract
2. SNR_o,dB = 60 dB - 6 dB = 54 dB
3. F = 10^(6/10) = 3.98, and 60 dB - 10log10(3.98) = 54 dB

> [!success]- Answer
> **Output SNR = 54 dB.**

> [!warning] Trap
> Dividing the SNR in dB by the noise figure and getting 60/4 = 15 dB. Decibel quantities subtract for division; they never divide.

## Traps & Exam Notes

- **Noise figure is a POWER ratio in dB, so cascaded NF does not add directly.** You must convert each stage NF to a noise factor $F = 10^{\mathrm{NF}/10}$, apply Friis $F = F_1 + (F_2-1)/G_1 + \cdots$ with gains as ratios, then convert the result back with $10\log_{10}$. Adding dB values is the single most common failure in receiver noise problems.
- **Confusing the Friis noise formula with the Friis transmission equation.** The Friis **noise** formula (EST-01 §07) combines stage noise factors and gains into a system noise figure. The Friis **transmission** equation (EST-06 §06) computes received power from $G_tG_r(\lambda/4\pi d)^2$. They share a name and nothing else; if a problem mentions distance, wavelength or antenna gain in dBi, it wants the transmission equation.
- **Believing a passive attenuator has 0 dB noise figure.** A matched pad at $T_0$ has $F = 1/G = L$, so its noise figure in dB *equals* its loss in dB. A 3 dB pad is a 3 dB noise figure, and it is the reason feedline loss ahead of an LNA is so damaging.
- **Using gains in dB inside Friis.** With $G_1 = 20\ \mathrm{dB}$ and $F_2 = 4$, the second term is $3/100 = 0.03$, not $3/20 = 0.15$. A 7 dB error on the whole answer comes from this one substitution.
- **Treating $F$ and $\mathrm{NF}$ as interchangeable.** 'NF = 4' in a Friis formula means $F = 4$ (6.02 dB); if the problem said '4 dB' then $F = 2.51$. Read the unit, and convert explicitly and early.
- **Assuming the source is at 290 K when it is not.** The noise-figure framework is defined at $T_0 = 290\ \mathrm{K}$. For a cold antenna, compute system noise temperature instead: $P_n = k(T_a+T_e)B$, since $N_i$ is no longer $kT_0B$ and F alone under-describes the system.
- **Mixing bandwidths between the signal and noise measurements.** SNR is meaningless unless both powers are measured in the same bandwidth; an audio SNR quoted in a 3 kHz channel cannot be compared with a noise power computed over 1 MHz.
- **Getting $F<1$ and accepting it.** $F \ge 1$ always. A result below 1 signals a units error (dB gain used as a ratio), a bandwidth mismatch, or noise powers and voltage densities interchanged.

## See Also

- [[03_Thermal_and_Johnson_Noise]]
- [[04_Shot,_Flicker_and_Transit-Time_Noise]]
- [[06_Equivalent_Noise_Temperature]]
- [[07_Friis_Cascaded_Noise_Formula]]
- [[12_Superheterodyne_Receiver]]

---

[[04_Shot,_Flicker_and_Transit-Time_Noise|⬅ 04]] · [[_MOC_Signals_Spectra_and_Noise|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Equivalent_Noise_Temperature|06 ➡]]
