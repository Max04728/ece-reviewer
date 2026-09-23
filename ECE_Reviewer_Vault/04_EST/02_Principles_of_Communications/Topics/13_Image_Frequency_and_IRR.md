---
id: EST-02-13
title: "Image Frequency and IRR"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 13
tier: 2
depth: full
problem_count: 5
prereqs: ["[[12_Superheterodyne_Receiver]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — Image Frequency and IRR

> [!abstract] Scope
> Compute the image frequency and the image rejection ratio of a superheterodyne receiver, and decide when double conversion is required.

## Core Concept

> [!tip] Intuition
> Two different stations, one above the local oscillator and one below, land on the same intermediate frequency. The one you did not want is the image, and only the front-end preselector can keep it out — so the image rejection ratio is really a statement about how good that preselector is.

**Where the image comes from.** A mixer multiplies, so it responds to any input at $f_{LO}\pm f_{IF}$ with an output at the IF. The wanted signal sits at $f_{RF}=f_{LO}-f_{IF}$ (high-side injection), and the **image** sits at $f_{image}=f_{LO}+f_{IF}=f_{RF}+2f_{IF}$. Both convert to exactly the same IF and both are then amplified, filtered and demodulated together — if the image reaches the mixer, it is indistinguishable from the wanted signal. This is why a superheterodyne receiver's front end must attenuate the image *before* the mixer; no amount of IF filtering afterwards can help.

**Image rejection ratio of a single tuned preselector.** For a single-tuned RF amplifier of quality factor $Q$, the **image rejection ratio** is as follows:
$$IRR=\sqrt{1+Q^{2}\rho^{2}}$$
The separation factor $\rho$ is defined by:
$$\rho=\dfrac{f_{image}}{f_{RF}}-\dfrac{f_{RF}}{f_{image}}$$
The quantity $\rho$ measures how far apart the signal and image are *in proportion*: it is zero when they coincide and grows as the ratio moves away from 1. The IRR is a voltage ratio, so it converts with $20\log_{10}$; a 60 dB requirement therefore means an IRR of 1000. Because the preselector also attenuates the *signal* slightly, the honest figure compares the response at the image with the response at the signal, which is exactly what the formula does.

**The two knobs: $Q$ and $\rho$.** Every useful conclusion follows from those two variables. Increasing $Q$ by a factor of 2 adds 6 dB of image rejection (the IRR goes as $Q$ for large $Q\rho$), but a higher $Q$ also narrows the preselector, which raises tracking difficulty and can attenuate the wanted signal at the band edges. Meanwhile $\rho$ is fixed by the frequency plan: for the AM broadcast case ($1000\ \mathrm{kHz}$ signal, $455\ \mathrm{kHz}$ IF) $\rho\approx1.39$, but for FM broadcast ($100\ \mathrm{MHz}$ signal, $10.7\ \mathrm{MHz}$ IF) $\rho\approx0.39$ — barely a quarter as large. Image rejection is intrinsically harder at high frequencies and small fractional IFs, and much harder with a low IF, which is why a $455\ \mathrm{kHz}$ IF at $100\ \mathrm{MHz}$ would need an impossible $Q$.

**Making the numbers concrete.** With $Q=50$ at AM broadcast the IRR is about 36.8 dB; a 60 dB requirement needs $Q\approx721$, which no practical single-tuned RF stage provides (and which would make tracking and alignment impossible). The standard engineering answers are therefore: (1) use a **high IF** so that $\rho$ is large — this is why FM broadcast uses 10.7 MHz and TV uses 45.75 MHz; (2) use **double conversion**, with a high first IF for image rejection and a low second IF for selectivity; or (3) use an **image-reject mixer** (Hartley or Weaver architecture), which cancels the image by combining two mixers with $90^\circ$ phase shifts, achieving 40–60 dB without a sharp preselector — limited in practice by the matching of the two paths.

**The second image in a double-conversion receiver.** After the first IF filter, the signal is converted again to a low IF. The second mixer has its own image, at $f_{IF1}+2f_{IF2}$ (for high-side injection into the second mixer). With $f_{IF1}=10.7\ \mathrm{MHz}$ and $f_{IF2}=455\ \mathrm{kHz}$ the second image sits at $11.61\ \mathrm{MHz}$, which is $910\ \mathrm{kHz}$ away from the first IF — far outside the first IF filter's few-kilohertz passband, so it is already attenuated to nothing before it can reach the second mixer. Mapping each image back to the antenna also matters: a signal at the second mixer's image corresponds to an RF frequency that the first IF filter has already rejected, which is the whole point of the architecture.

**Practical consequences and measurements.** Image response is specified as a receiver parameter (a good AM receiver achieves better than 60–80 dB, a communication receiver better than 70 dB) and is measured by injecting a signal at the image frequency and observing the output. Because the image depends on the LO setting, it is measured at several points across the band, and tracking error causes the worst-case figure to occur at the band edges. The IF itself must also be chosen to avoid falling inside the wanted band — a $455\ \mathrm{kHz}$ IF is below the AM broadcast band, but an IF inside the band would allow a strong local station to pass straight through the mixer (**IF feedthrough**), which is a separate spurious response that the preselector must also handle.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Image frequency (high-side injection) | $f_{image} = f_{RF} + 2 f_{IF} = f_{LO} + f_{IF}$ | The most important spurious response. Both signal and image convert to the same IF. |
| Image frequency (low-side injection) | $f_{image} = f_{RF} - 2 f_{IF}$ | Below the signal. A negative value means no physical image exists. |
| Separation parameter rho | $\rho = \frac{f_{image}}{f_{RF}} - \frac{f_{RF}}{f_{image}}$ | Zero when signal and image coincide; grows with their fractional separation. |
| Image rejection ratio (single tuned circuit) | $IRR = \sqrt{1 + Q^{2}\rho^{2}}$ | A VOLTAGE ratio: convert with 20 log10, not 10 log10. |
| IRR in dB | $IRR_{dB} = 20\log_{10}\sqrt{1+Q^{2}\rho^{2}} \approx 20\log_{10}(Q\rho)$ | The approximation holds for Q*rho >> 1. |
| Q doubling | $Q \rightarrow 2Q \ \Rightarrow\ IRR \mathrm{\ increases\ by\ } 6\ \mathrm{dB}$ | Only in the large-Q*rho regime; a narrower preselector also worsens tracking. |
| Required Q for a target IRR | $Q = \frac{\sqrt{IRR^{2}-1}}{\rho}$ | 60 dB (IRR = 1000) at AM broadcast needs Q about 721 - impractical, hence double conversion. |
| Second image in double conversion | $f_{image2} = f_{IF1} + 2 f_{IF2}$ | 10.7 MHz and 455 kHz give 11.61 MHz, rejected by the first IF filter long before the second mixer. |
| Image-reject mixer | $\mathrm{two\ mixers} + 90^\circ \mathrm{\ phase\ shifts} \Rightarrow 40\mathrm{-}60\ \mathrm{dB}$ | Hartley/Weaver architectures; rejection limited by gain and phase matching between the two paths. |
| Typical receiver specifications | $\mathrm{AM:\ } 60\mathrm{-}80\ \mathrm{dB}, \quad \mathrm{communications:\ } >70\ \mathrm{dB}$ | Measured by injecting a signal at f_image; worst case usually at the band edges because of tracking error. |

## Worked Problems

### P1. An AM receiver has a $455\ \mathrm{kHz}$ IF and an RF preselector with $Q = 50$. It is tuned to $1000\ \mathrm{kHz}$. Find the image frequency and the image rejection ratio in dB.

**Given:** fRF = 1000 kHz; fIF = 455 kHz; Q = 50

**Solution:**

1. f_image = fRF + 2 fIF = 1000 + 910 = 1910 kHz
2. rho = 1910/1000 - 1000/1910 = 1.9100 - 0.5236 = 1.3864
3. rho^2 = 1.9222, Q^2 = 2500
4. IRR = sqrt(1 + 2500 x 1.9222) = sqrt(4806.6) = 69.33
5. IRR_dB = 20 log10(69.33) = 36.8 dB

> [!success]- Answer
> **f_image = 1910 kHz; IRR = 69.3 (36.8 dB).**

> [!warning] Trap
> Converting with 10 log10(69.33) = 18.4 dB. IRR is defined as a voltage ratio, so it takes 20 log10 — an error of exactly a factor of two in dB terms.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000+2×455 : Ans÷1000−1000÷Ans : √(1+50^2×Ans^2) : 20log(Ans)`
> 2. `=` down the chain: $f_{image}$ = **1910** kHz → $\rho$ = **1.3864** → $IRR$ = **69.33** → **36.8** dB.
>
> $IRR$ is a VOLTAGE ratio, so `20log`; `10log(69.33)` = **18.4** dB is exactly half and is the trap.

### P2. For the receiver above, what preselector $Q$ would be needed for a $60\ \mathrm{dB}$ image rejection ratio? Comment on the practicality.

**Given:** target IRR = 60 dB; rho = 1.3864

**Solution:**

1. 60 dB means IRR = 10^(60/20) = 1000
2. 1000^2 = 1 + Q^2 rho^2, so Q^2 = (1e6 - 1)/1.9222 = 520,232
3. Q = 721
4. A single-tuned RF stage with Q = 721 at 1 MHz is not practical: it would be far too narrow to track and would attenuate the wanted signal
5. The standard remedies are a higher IF, double conversion, or an image-reject mixer

> [!success]- Answer
> **Q ≈ 721 is required — impractical for a single tuned stage, so double conversion is used instead.**

> [!warning] Trap
> Using IRR = 100 for 60 dB (mixing the 10 log and 20 log conventions) and answering Q = 72.1. That is a factor of ten too low and would leave the receiver 20 dB short of the requirement.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(60÷20) : √((Ans^2−1)÷1.9222)`
> 2. `=` down the chain: 60 dB is a voltage ratio of **1000** → $Q$ = **721**, which no single tuned stage provides.
>
> `10^(60÷10)` = **100** comes from the power convention and returns $Q$ = **72.1**, a factor of ten low — the trap.

### P3. The preselector $Q$ is doubled to $100$ while the receiver stays tuned to $1000\ \mathrm{kHz}$. Find the new IRR in dB and state the general rule.

**Given:** Q = 100; fRF = 1000 kHz; f_image = 1910 kHz

**Solution:**

1. rho = 1.3864, rho^2 = 1.9222
2. Q^2 = 10,000, so Q^2 rho^2 = 19,222
3. IRR = sqrt(19,223) = 138.6
4. IRR_dB = 20 log10(138.6) = 42.8 dB
5. Increase over the Q = 50 case = 42.8 - 36.8 = 6.0 dB

> [!success]- Answer
> **IRR = 42.8 dB; doubling Q adds 6 dB in the large-Qρ regime.**

> [!warning] Trap
> Expecting a 3 dB improvement because 'doubling is 3 dB'. IRR is proportional to Q (a linear, voltage-like relation) in this regime, so the improvement is 6 dB in power-equivalent terms — but note the cost: the preselector is now twice as narrow and tracking is harder.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(1+100^2×1.9222) : 20log(Ans) : Ans−36.8`
> 2. `=` down the chain: $IRR$ = **138.6** → **42.8** dB → **6.0** dB more than the $Q=50$ case.
>
> $IRR$ goes as $Q$ once $Q\rho \gg 1$, so doubling $Q$ adds `10log(4)` = **6.0** dB, not 3 dB.

### P4. An FM receiver with a $10.7\ \mathrm{MHz}$ IF and a preselector of $Q = 50$ receives $100\ \mathrm{MHz}$. Find the image frequency and IRR, and compare with the AM case.

**Given:** fRF = 100 MHz; fIF = 10.7 MHz; Q = 50

**Solution:**

1. f_image = 100 + 21.4 = 121.4 MHz
2. rho = 121.4/100 - 100/121.4 = 1.2140 - 0.8237 = 0.3903
3. rho^2 = 0.1523, Q^2 rho^2 = 2500 x 0.1523 = 380.8
4. IRR = sqrt(381.8) = 19.54, IRR_dB = 20 log10(19.54) = 25.8 dB
5. Compare with AM at 1000 kHz: 36.8 dB for the same Q - about 11 dB worse

> [!success]- Answer
> **f_image = 121.4 MHz; IRR = 25.8 dB, about 11 dB worse than the AM case with the same Q.**

> [!warning] Trap
> Assuming the same Q gives the same image rejection at any frequency. It does not: rho shrinks as the fractional IF separation falls, so image rejection is intrinsically harder at high frequencies — which is why an FM receiver relies on the image falling outside the band rather than on preselector Q.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100+2×10.7 : Ans÷100−100÷Ans : √(1+50^2×Ans^2) : 20log(Ans)`
> 2. `=` down the chain: $f_{image}$ = **121.4** MHz → $\rho$ = **0.3903** → $IRR$ = **19.54** → **25.8** dB, about **11** dB worse than the AM case at the same $Q$.
>
> $\rho$ shrinks as the fractional IF separation falls, so the same $Q$ cannot buy the same rejection at 100 MHz.

### P5. A double-conversion receiver uses a first IF of $10.7\ \mathrm{MHz}$ (with a $10\ \mathrm{kHz}$ filter) and a second IF of $455\ \mathrm{kHz}$. Find the second local oscillator frequency and the second image frequency, and explain why the second image is harmless.

**Given:** fIF1 = 10.7 MHz; fIF2 = 455 kHz; high-side injection at both mixers

**Solution:**

1. Second LO: fLO2 = fIF1 + fIF2 = 10.7 + 0.455 = 11.155 MHz
2. Second image: f_image2 = fIF1 + 2 fIF2 = 10.7 + 0.91 = 11.61 MHz
3. The first IF filter is only 10 kHz wide centred on 10.7 MHz
4. 11.61 MHz is 910 kHz above the first IF, i.e. 182 times the filter's half-bandwidth (5 kHz), or 91 times its full 10 kHz width, so it is attenuated by well over 60 dB before reaching the second mixer
5. The second image is therefore rejected by the first IF filter, not by any preselector

> [!success]- Answer
> **fLO2 = 11.155 MHz; second image at 11.61 MHz, rejected by the first IF filter's narrow passband.**

> [!warning] Trap
> Looking for a second image at RF and trying to reject it with the antenna preselector. In a double-conversion receiver each mixer has its own image, and the second one is rejected by the filter that precedes it — the first IF filter, which is thousands of times narrower than the preselector.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10.7+0.455 : 10.7+2×0.455 : 910÷10`
> 2. `=` down the chain: $f_{LO2}$ = **11.155** MHz → second image **11.61** MHz → **910** kHz above the first IF, i.e. **91** times the 10 kHz first-IF filter width, so it is long gone before the second mixer.
>
> Keep the second IF in MHz as `0.455`; mixing kHz into a MHz chain is the slip this problem invites.

## Traps & Exam Notes

- **Using $f_{RF}+f_{IF}$ as the image.** The image is $f_{RF}+2f_{IF}$ (high-side injection) because it must be one IF away from the *local oscillator* on the other side. The $f_{RF}+f_{IF}$ value is the LO frequency.
- **Converting IRR with $10\log_{10}$.** The formula $\sqrt{1+Q^2\rho^2}$ is a voltage ratio, so the dB conversion is $20\log_{10}$; using 10 halves every answer. A 60 dB specification means a voltage ratio of 1000, not 100.
- **Assuming preselector $Q$ alone can always meet the specification.** At AM broadcast 60 dB needs $Q\approx721$; at FM broadcast the same requirement is hopeless. The practical answers are a higher IF, double conversion, or an image-reject mixer.
- **Forgetting $\rho$ depends on both frequencies.** $\rho = f_{image}/f_{RF}-f_{RF}/f_{image}$; it is not $2f_{IF}/f_{RF}$ and it is not constant across a band. It changes as the receiver is tuned, which is why IRR must be checked at several dial settings.
- **Ignoring the second image in a double-conversion design.** Each conversion creates its own image, and the second image ($f_{IF1}+2f_{IF2}$) must fall outside the first IF filter's passband — a design constraint on the frequency plan, not something the preselector can fix.
- **Expecting an image-reject mixer to give unlimited rejection.** Hartley and Weaver architectures achieve 40–60 dB, limited by gain and phase mismatch between their two paths; temperature drift and component tolerance set the practical ceiling.
- **Neglecting IF feedthrough.** A strong signal at the IF frequency itself can leak through the mixer and appear as interference regardless of the image calculation. The preselector and the mixer's balance are what suppress it.
- **Assuming tracking error is negligible.** The preselector and LO are ganged, and any misalignment reduces the attenuation at the image; the worst-case image rejection is normally measured at the band edges, not at mid-band.

## See Also

- [[12_Superheterodyne_Receiver]]
- [[14_AGC_and_Receiver_Characteristics]]
- [[05_SNR,_Noise_Factor_and_Noise_Figure]]

---

[[12_Superheterodyne_Receiver|⬅ 12]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[14_AGC_and_Receiver_Characteristics|14 ➡]]
