---
id: EST-02-10
title: "AM vs FM Noise Comparison"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_FM_Noise_and_Threshold_Effect]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — AM vs FM Noise Comparison

> [!abstract] Scope
> Compare AM and FM in output signal-to-noise ratio, bandwidth cost and behaviour below threshold, and state the comparison fairly.

## Core Concept

> [!tip] Intuition
> AM spends its power on a carrier and gets no noise improvement at all; FM spends its bandwidth and gets a large one. The exchange rate is the whole comparison: FM buys signal-to-noise ratio with spectrum, and it only collects while the input stays above threshold.

**AM's output SNR is essentially its input SNR.** For an envelope detector operating above threshold with a fully modulated carrier, the output equals the input:
$$\left(S/N\right)_o\approx\left(S/N\right)_i$$
The detector passes the noise through with the signal, so AM offers no improvement. A synchronous (coherent) detector for DSB can give up to 3 dB because it rejects the quadrature noise component, but that is the entire extent of the advantage. AM's virtue is not noise performance — it is spectral efficiency and receiver simplicity, and it degrades *gracefully*: as the input SNR falls, the output SNR falls with it, without any cliff.

**FM's output SNR scales with $\beta^2$ — above threshold.** The standard single-tone result for the improvement is:
$$\left(S/N\right)_o=\frac{3}{2}\beta^2\left(S/N\right)_i$$
(texts differ in the input-bandwidth normalisation; the $\beta^2$ scaling is what matters). At the broadcast maximum of $\beta=5$ this is about 16 dB, and with de-emphasis counted it is closer to 29 dB. The improvement comes from the limiter stripping amplitude noise and from the fact that the message is carried in the zero crossings, but it is paid for in bandwidth: Carson's rule gives $BW=2(\Delta f+f_m)=2f_m(1+\beta)$ against AM's $2f_m$.

**The exchange is the point.** Doubling the deviation doubles the bandwidth (roughly) and quadruples the output SNR — 3 dB of spectrum for 6 dB of SNR, a 2:1 exchange rate in dB terms. This is the classic bandwidth-for-SNR trade of communication theory, and it is why the comparison must always state the two conditions: at *equal received carrier power* FM wins in SNR but loses badly in bandwidth; at *equal bandwidth* the advantage shrinks to whatever index fits, which for a voice channel in a 25 kHz land-mobile allocation is only about 6 dB (and for a channel barely wider than the audio, nothing at all).

**Threshold: where FM loses.** The $\beta^2$ law is a small-signal linearisation. Below the FM threshold — about 10 dB carrier-to-noise ratio, sometimes quoted as 13 dB for the improvement threshold — the noise phase perturbations exceed $\pi$ and the discriminator emits clicks, so the output SNR collapses far faster than the input SNR. Below threshold FM is *worse* than AM, which is why a fringe-area FM signal disappears abruptly while an AM signal merely becomes noisy. The threshold rises with deviation, so the same wideband signal that offers the largest above-threshold advantage is also the most fragile. Threshold extension (FMFB or a PLL demodulator) buys a few dB.

**Interference: two different behaviours.** FM's capture effect means the stronger signal suppresses the weaker once the amplitude ratio passes the capture ratio (about 6 dB), so co-channel interference is heard as a clean switch from one station to another rather than as a heterodyne. AM instead mixes the two carriers and produces a beat note — annoying but intelligible, and AM therefore tolerates a *lower* wanted-to-unwanted ratio. Impulse noise (ignition, switching) is amplitude-like, so FM's limiter rejects it almost completely while AM passes it straight into the audio; this, plus spectrum availability at VHF, is the real reason FM displaced AM for high-fidelity broadcasting.

**Writing a fair comparison.** A complete statement names four things: the modulation indices or deviations, the transmission bandwidths, the received carrier power, and whether the input SNR is above threshold. Weighting and de-emphasis must also be declared, since broadcast FM's measured SNR improves by roughly 13 dB once 75 µs de-emphasis is applied, and different weighting curves (CCIR/ITU-R 468 versus flat) shift the number further. An answer that says only 'FM is 20 dB better' is incomplete; an answer that says 'FM gives 15.7 dB over AM at the same received carrier power with $\beta=5$, using 180 kHz against AM's 30 kHz, provided the input CNR stays above 10 dB' is an exam answer.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| AM output SNR (envelope detector) | $\left(\frac{S}{N}\right)_o \approx \left(\frac{S}{N}\right)_i$ | About 0 dB improvement above threshold at m = 1. Falls linearly with input SNR. |
| AM with synchronous detection | $\left(\frac{S}{N}\right)_o = 2\left(\frac{S}{N}\right)_i \ (\approx 3\ \mathrm{dB})$ | Best case for DSB with a coherent detector; the quadrature noise is rejected. |
| FM output SNR | $\left(\frac{S}{N}\right)_o = \frac{3}{2}\beta^2 \left(\frac{S}{N}\right)_i$ | Single tone, above threshold. Improvement in dB = 10 log10(1.5 beta^2). |
| FM improvement factor | $I_{FM} = 10\log_{10}\!\left(\frac{3}{2}\beta^2\right)\ \mathrm{dB}$ | 7.8 dB at beta = 2; 15.7 dB at beta = 5; 21.8 dB at beta = 10. |
| FM advantage over AM | $I = I_{FM} - I_{AM} = 10\log_{10}(1.5\beta^2)\ \mathrm{dB}$ | At the same received carrier power. State the bandwidth cost alongside. |
| Bandwidth cost ratio | $\frac{BW_{FM}}{BW_{AM}} = \frac{2(\Delta f+f_m)}{2f_m} = 1+\beta$ | The exchange rate is roughly beta of bandwidth for beta^2 of SNR. |
| Bandwidth-SNR exchange | $\Delta\mathrm{SNR} \approx 6\ \mathrm{dB} \ \mathrm{per\ doubling\ of\ } \beta \ (\approx 3\ \mathrm{dB of bandwidth})$ | Quadratic SNR against linear bandwidth; the reason FM is attractive in wide channels. |
| Threshold condition | $\left(\frac{C}{N}\right)_{in} \gtrsim 10\ \mathrm{dB} \ (\mathrm{to\ } 13\ \mathrm{dB})$ | Below it FM is worse than AM; the threshold worsens as beta increases. |
| With de-emphasis | $I_{FM,total} \approx 10\log_{10}(1.5\beta^2) + 13\ \mathrm{dB}$ | The 13 dB applies for tau = 75 us with 15 kHz audio; weighting must be declared. |
| Interference behaviour | $\mathrm{FM:\ capture\ at\ } \approx 6\ \mathrm{dB} \quad \mathrm{AM:\ heterodyne\ beat,\ no\ capture}$ | FM suppresses a weaker co-channel signal; AM mixes and tolerates a lower wanted/unwanted ratio. |
| Impulse noise immunity | $\mathrm{FM\ limiter\ removes\ amplitude\ noise}; \quad \mathrm{AM\ passes\ it}$ | The practical reason FM is used at VHF where ignition and switching noise dominate. |

## Worked Problems

### P1. An AM receiver and an FM receiver receive the same carrier power with an input CNR of $20\ \mathrm{dB}$. The AM signal is 100 percent modulated and the FM signal has $\beta = 5$. Compare the output SNRs and the bandwidths used.

**Given:** input CNR = 20 dB; AM: m = 1; FM: beta = 5

**Solution:**

1. AM envelope detection: output SNR = input SNR = 20 dB
2. FM: improvement = 10 log10(1.5 x 25) = 15.74 dB
3. FM output SNR = 20 + 15.74 = 35.74 dB
4. Bandwidths: AM = 2fm; FM = 2fm(1+5) = 6 x AM, i.e. three times wider

> [!success]- Answer
> **AM 20 dB, FM 35.7 dB — a 15.7 dB FM advantage at six times the bandwidth (1+beta = 6).**

> [!warning] Trap
> Claiming the advantage without the bandwidth. FM's 15.7 dB is bought with a bandwidth a factor of (1+beta) = 6 wider than AM's (about 7.8 dB in bandwidth terms); the comparison is only meaningful with both numbers.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10log(1.5×5^2) : 20+Ans : 5+1`
> 2. `=` down the chain: FM improvement **15.74** dB → FM output **35.74** dB against AM's **20** dB → bandwidth factor $1+\beta$ = **6**× AM's.
>
> FM's gain is bought with bandwidth: quote the `1+β` = **6**× cost alongside the **15.7** dB, never the dB alone.

### P2. Compute the FM improvement factor in dB for $\beta = 2$ and for $\beta = 10$, and comment on the trend.

**Given:** beta = 2 then 10

**Solution:**

1. beta = 2: I = 1.5(4) = 6, so 10 log10(6) = 7.8 dB
2. beta = 10: I = 1.5(100) = 150, so 10 log10(150) = 21.8 dB
3. The index rose by 14 dB (a factor of 5) while the SNR rose 14 dB as well (a factor of 25)
4. Bandwidth rose by the factor (1+10)/(1+2) = 3.67, i.e. 5.6 dB

> [!success]- Answer
> **7.8 dB at β = 2 and 21.8 dB at β = 10 — a 14 dB gain for 5.6 dB more bandwidth.**

> [!warning] Trap
> Assuming the SNR gain equals the deviation gain in dB. The improvement goes as beta^2 while the bandwidth goes roughly as beta, so the SNR gain is twice the deviation's dB increase — a favourable-looking ratio that is undone by the threshold.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10log(1.5×2^2) : 10log(1.5×10^2) : 10log((1+10)÷(1+2))`
> 2. `=` down the chain: **7.78** dB at $\beta=2$ → **21.76** dB at $\beta=10$ (a **14** dB gain) for **5.64** dB more bandwidth.
>
> Improvement goes as $\beta^2$ while bandwidth goes as $1+\beta$: the SNR gain is twice the index's dB rise, and the threshold worsens.

### P3. A 25 kHz land-mobile channel must carry a $3\ \mathrm{kHz}$ voice channel. Compare an AM system (bandwidth $2f_m$) with an FM system using the maximum $5\ \mathrm{kHz}$ deviation that still fits the channel.

**Given:** channel = 25 kHz; fm = 3 kHz; FM df = 5 kHz

**Solution:**

1. AM bandwidth = 2(3) = 6 kHz
2. FM: beta = 5/3 = 1.667, Carson BW = 2(5+3) = 16 kHz, which fits inside 25 kHz
3. FM improvement = 10 log10(1.5 x 1.667^2) = 10 log10(4.167) = 6.2 dB
4. AM improvement = 0 dB
5. So in an equal-channel comparison FM gains about 6 dB, not the 15.7 dB of broadcast FM

> [!success]- Answer
> **FM improvement ≈ 6.2 dB over AM within the same 25 kHz channel (β = 1.67).**

> [!warning] Trap
> Quoting the broadcast-FM 15.7 dB figure for a land-mobile service. The index that fits in a narrow channel is much smaller, and the advantage scales as $\beta^2$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×3 : 2×(5+3) : 5÷3 : 10log(1.5×Ans^2)`
> 2. `=` down the chain: AM $BW$ = **6** kHz → FM $BW$ = **16** kHz → $\beta$ = **1.667** → FM improvement **6.2** dB inside the same channel.
>
> The index that fits a narrow channel is small: `5÷3` = **1.667** gives **6.2** dB, not broadcast FM's **15.7** dB.

### P4. FM with $\beta = 5$ claims a 15.7 dB advantage over AM. At what input CNR does FM actually become worse than AM?

**Given:** beta = 5; improvement = 15.7 dB; threshold ~ 10 dB

**Solution:**

1. Above threshold: SNR_FM = SNR_AM + 15.7 dB
2. FM needs input CNR above about 10 dB for the law to hold
3. At input CNR = 8 dB, the linear law would predict 23.7 dB, but the receiver is below threshold and clicks dominate
4. AM at 8 dB input gives about 8 dB output with no cliff
5. So FM is worse than AM once the input drops below the ~10 dB threshold, not at some lower value

> [!success]- Answer
> **FM is better only while the input CNR exceeds about 10 dB; below that it collapses and AM wins.**

> [!warning] Trap
> Finding an algebraic crossover by setting SNR_AM = SNR_FM and concluding they are equal everywhere. The comparison is not algebraic below threshold because the FM output does not follow the linear law at all.

### P5. A broadcast FM receiver with $\beta = 5$ operates at 20 dB input CNR. Find the output SNR with and without 75 µs de-emphasis, and state the total advantage over an AM receiver at the same input.

**Given:** beta = 5; input CNR = 20 dB; de-emphasis = 75 us, fm = 15 kHz

**Solution:**

1. Without de-emphasis: improvement = 15.7 dB, output = 35.7 dB
2. De-emphasis adds about 13 dB by suppressing the f^2-weighted high-frequency noise
3. With de-emphasis: output = 20 + 15.7 + 13 = 48.7 dB
4. AM at the same input gives 20 dB, so the total advantage is about 28.7 dB

> [!success]- Answer
> **35.7 dB unweighted, about 48.7 dB with de-emphasis — roughly 29 dB better than AM at the same carrier power.**

> [!warning] Trap
> Using the unweighted 15.7 dB figure as the receiver's real performance. Practical FM SNR specifications include de-emphasis (and often a weighting curve), which is worth about 13 dB more — but the weighting and time constant must be stated for the number to mean anything.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10log(1.5×5^2) : 20+Ans : Ans+13 : Ans−20`
> 2. `=` down the chain: improvement **15.74** dB → **35.74** dB unweighted → **48.74** dB with 75 µs de-emphasis → **28.74** dB better than AM.
>
> Add the de-emphasis **13** dB ON TOP of the unweighted `10log(1.5β^2)`; the AM baseline is the same 20 dB input CNR.

## Traps & Exam Notes

- **Forgetting the bandwidth in the comparison.** FM's improvement is purchased with a bandwidth factor of $(1+\beta)$ over AM. Quoting '15.7 dB better' without 'at six times the bandwidth' is an incomplete answer, and at equal bandwidth the advantage can fall to a few dB or to zero.
- **Expecting AM to improve with modulation depth.** AM's output SNR is essentially its input SNR even at $m=1$; only synchronous detection of DSB adds about 3 dB. AM's efficiency and its noise performance are separate facts.
- **Linearising through the threshold.** Below about 10 dB input CNR the FM output collapses (clicks) and can be worse than AM's. Any question asking for FM performance at a low input CNR is testing whether you notice that the $\beta^2$ law does not apply.
- **Assuming a bigger index is always better.** $\beta$ raises both the improvement and the threshold, and raises the bandwidth. Below threshold the wideband system is the first to fail, which is why satellite and deep-space links use threshold extension or narrowband schemes.
- **Confusing impulse-noise immunity with co-channel tolerance.** FM's limiter rejects amplitude-type impulse noise almost completely, but its capture effect means a co-channel interferer only 6 dB weaker takes over the channel; AM mixes instead and tolerates a lower wanted-to-unwanted ratio.
- **Omitting the weighting and de-emphasis declarations.** Measured SNR figures for broadcast FM routinely include 75 µs de-emphasis and a weighting curve worth more than 13 dB. Comparing a weighted FM figure with an unweighted AM figure inflates the difference.
- **Comparing at unequal received power.** FM's improvement is defined at the same carrier power over the same message bandwidth. A comparison where the FM transmitter also radiates more power measures the transmitter, not the modulation.
- **Believing FM needs no pre-emphasis because the limiter removes all noise.** The limiter removes *amplitude* noise; the phase noise that survives is weighted by $f^2$ and requires pre-emphasis and de-emphasis, as developed in [[11_Pre-Emphasis_and_De-Emphasis]].

## See Also

- [[09_FM_Noise_and_Threshold_Effect]]
- [[11_Pre-Emphasis_and_De-Emphasis]]
- [[05_FM_and_PM_Fundamentals]]
- [[07_Carson’s_Rule_and_FM_Bandwidth]]
- [[05_SNR,_Noise_Factor_and_Noise_Figure]]

---

[[09_FM_Noise_and_Threshold_Effect|⬅ 09]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Pre-Emphasis_and_De-Emphasis|11 ➡]]
