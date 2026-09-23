---
id: EST-02-12
title: "Superheterodyne Receiver"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_DSB-SC_and_SSB-SC]]", "[[05_SNR,_Noise_Factor_and_Noise_Figure]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Superheterodyne Receiver

> [!abstract] Scope
> Trace a signal through a superheterodyne receiver, compute local oscillator and intermediate frequencies, and explain why the architecture dominates receiver design.

## Core Concept

> [!tip] Intuition
> Instead of building sharp, tunable filters at every station's frequency, the superheterodyne moves every station to the same intermediate frequency and filters it there. One fixed, excellent filter then serves the whole band.

**The idea and why it wins.** A receiver must amplify and select a narrow slice of spectrum, but that slice moves as the receiver is tuned. Building a high-Q, tunable filter at every frequency is impractical; the superheterodyne solves it by **translating** the wanted signal to a fixed **intermediate frequency (IF)** where a crystal, ceramic, SAW or LC filter of excellent shape factor can sit, followed by plenty of stable gain. The translation is done by a **mixer** driven by a **local oscillator (LO)**: the mixer outputs the sum and difference frequencies, and the IF filter keeps one of them. Everything after the mixer — IF amplifier, detector, AGC, audio — operates at a single frequency and does not need to be retuned.

**The block diagram, in order.** The antenna feeds an optional **RF amplifier** and preselector (a wide, tunable bandpass that gives the first line of defence against the image and against strong out-of-band signals). The **mixer** combines that with the LO. The **IF amplifier and filter** provide most of the gain and essentially all of the selectivity. The **detector/demodulator** (envelope detector, product detector, discriminator, or a digital equivalent) recovers the message. **AGC** feeds back from the detector to the RF and IF gain stages. Finally the audio or baseband stage drives the output. In a modern receiver the second detector is an ADC and the rest is digital, but the frequency plan is unchanged.

**Choosing the local oscillator frequency.** For a wanted RF signal $f_{RF}$ and an IF $f_{IF}$, the LO can sit either above or below the signal:
$$f_{LO} = f_{RF} + f_{IF}$$
(**high-side injection**, the usual choice because it gives a larger image separation) or $f_{LO} = f_{RF} - f_{IF}$ (**low-side injection**). The mixer output contains $|f_{LO}-f_{RF}| = f_{IF}$, which is why either works. High-side injection across the AM broadcast band ($540$–$1600\ \mathrm{kHz}$ with a $455\ \mathrm{kHz}$ IF) makes the LO tune from about $995\ \mathrm{kHz}$ to $2055\ \mathrm{kHz}$, a tuning range ratio of about 2.07 that must be tracked by the ganged tuning capacitor; the LO always runs at a higher frequency than the signal, which is why the oscillator section of a ganged capacitor is smaller.

**Choosing the IF: a genuine trade-off.** A **low IF** (455 kHz for AM, 262 kHz in some older sets) gives excellent selectivity, because the IF filter's *percentage* bandwidth is small for a given absolute bandwidth, and it gives high gain per stage with cheap components — but the image frequency sits only $2f_{IF} = 910\ \mathrm{kHz}$ away from the signal, inside the broadcast band, so image rejection is hard. A **high IF** (10.7 MHz for FM broadcast, 45.75 MHz for analogue TV video) pushes the image far away and makes image rejection easy, but the IF filter's percentage bandwidth is now large, so adjacent-channel selectivity suffers, and high-frequency gain is more expensive. The compromise for demanding receivers is **double conversion**: a high first IF for image rejection, then a second conversion to a low IF for selectivity.

**Spurious responses and tracking.** The mixer is a multiplier, so every strong signal at $f_{RF} \pm nf_{IF}$-style combinations can produce an output at the IF: the **image** frequency ($f_{RF}+2f_{IF}$ for high-side injection) is the most important, followed by IF feedthrough (a signal at the IF itself passing straight through the mixer) and harmonics of the LO. The RF preselector suppresses the image by a limited amount, quantified by the image rejection ratio of [[13_Image_Frequency_and_IRR]]. **Tracking** is the requirement that the preselector's passband and the LO stay aligned as the receiver is tuned; a **three-gang** capacitor tunes the RF, mixer and LO sections together and is aligned at the band's low, middle and high ends. Tracking error reduces both sensitivity and image rejection at the band edges and is one reason the preselector is deliberately broad.

**What the architecture costs and when it is bypassed.** The superheterodyne introduces the image response, requires a stable LO (drift moves the received frequency directly, so AM broadcast requires better than about $\pm100\ \mathrm{Hz}$ stability and SSB far better), and produces spurious mixing products that can be received as whistles. A **direct-conversion** (zero-IF) receiver eliminates the image entirely by setting $f_{IF}=0$, at the cost of DC offset, $1/f$ noise and second-order distortion problems, which is why it became practical only with integrated silicon and digital correction. Both architectures still need the low-noise front end and the AGC studied in [[05_SNR,_Noise_Factor_and_Noise_Figure]] and [[14_AGC_and_Receiver_Characteristics]].

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Mixing produces sum and difference | $f_{out} = \lvert f_{LO} \pm f_{RF} \rvert$ | The IF filter selects one of the two; the other is removed. |
| High-side injection | $f_{LO} = f_{RF} + f_{IF}$ | The usual choice: gives the largest image separation ($2f_{IF}$). LO tunes above the signal. |
| Low-side injection | $f_{LO} = f_{RF} - f_{IF}$ | Valid only if fRF > fIF. Image is at fRF - 2fIF; may not exist if that is below zero. |
| Image frequency (high-side injection) | $f_{image} = f_{RF} + 2f_{IF} = f_{LO} + f_{IF}$ | The frequency that also converts to the IF. Rejected only by the RF preselector. |
| Image frequency (low-side injection) | $f_{image} = f_{RF} - 2f_{IF}$ | Must be positive to exist; high-side injection is preferred precisely to keep the image far away. |
| Standard IF values | $\mathrm{AM\ broadcast\ } 455\ \mathrm{kHz}; \ \mathrm{FM\ broadcast\ } 10.7\ \mathrm{MHz}$ | TV video 45.75 MHz, TV sound 41.25 MHz (US). Chosen by the image/selectivity trade. |
| Local oscillator tuning range | $f_{LO,min} = f_{RF,min}+f_{IF}, \quad f_{LO,max} = f_{RF,max}+f_{IF}$ | AM band 540-1600 kHz with a 455 kHz IF gives 995-2055 kHz, a ratio of 2.07. |
| Selectivity argument (percentage bandwidth) | $\frac{\Delta f}{f_{IF}} \ll 1 \ \Rightarrow \ \mathrm{easy,\ sharp\ filtering}$ | A 10 kHz channel at 455 kHz is 2.2 percent; at 10.7 MHz it is 0.09 percent, which is harder. |
| Double conversion | $f_{RF} \rightarrow f_{IF1} (\mathrm{high}) \rightarrow f_{IF2} (\mathrm{low})$ | First IF buys image rejection, second IF buys selectivity. Example: 10.7 MHz then 455 kHz. |
| Tracking | $f_{preselector} \mathrm{\ centred\ on\ } f_{RF} \ \mathrm{as\ } f_{LO} \mathrm{\ tunes}$ | Ganged (multi-section) tuning capacitor; alignment at three points across the band. |
| LO stability requirement | $\Delta f_{LO} = \Delta f_{received}$ | AM broadcast needs about +/-100 Hz; SSB needs tens of hertz, hence crystal or synthesised oscillators. |

## Interactive Widget

**Superhet Block Diagram Tuner**

![[Superhet_Block_Diagram_Tuner.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An AM broadcast receiver with a $455\ \mathrm{kHz}$ IF is tuned to a $1000\ \mathrm{kHz}$ station using high-side injection. Find the local oscillator frequency and the image frequency.

**Given:** fRF = 1000 kHz; fIF = 455 kHz; high-side injection

**Solution:**

1. High-side injection: fLO = fRF + fIF = 1000 + 455 = 1455 kHz
2. Image: f_image = fRF + 2 fIF = 1000 + 910 = 1910 kHz
3. Check: |fLO - f_image| = |1455 - 1910| = 455 kHz, which is the IF

> [!success]- Answer
> **fLO = 1455 kHz; image at 1910 kHz.**

> [!warning] Trap
> Reporting the image as fRF + fIF = 1455 kHz, which is the LO frequency. The image is twice the IF away from the signal, i.e. fRF + 2fIF.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000+455 : 1000+2×455`
> 2. `=` down the chain: $f_{LO}$ = **1455** kHz → $f_{image}$ = **1910** kHz; `1910−1455` = **455** kHz confirms both land on the IF.
>
> $f_{LO}$ adds ONE IF and the image adds TWO: reporting `1000+455` = **1455** kHz as the image is the trap.

### P2. An FM receiver with a $10.7\ \mathrm{MHz}$ IF receives a $100\ \mathrm{MHz}$ station. Find the local oscillator and image frequencies, and comment on the image's location.

**Given:** fRF = 100 MHz; fIF = 10.7 MHz

**Solution:**

1. fLO = 100 + 10.7 = 110.7 MHz
2. f_image = 100 + 2(10.7) = 121.4 MHz
3. The image is 21.4 MHz away, well outside the FM broadcast band (88-108 MHz)
4. This is why FM broadcast uses a high IF: the image can be filtered by a fixed, non-critical preselector

> [!success]- Answer
> **fLO = 110.7 MHz; image at 121.4 MHz, far outside the FM band.**

> [!warning] Trap
> Assuming the image always falls inside the tuning band. With a 455 kHz IF at 100 MHz the image would be at 100.91 MHz, inside the band and impossible to filter — the choice of IF is what determines whether the image is a practical problem.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100+10.7 : 100+2×10.7 : Ans−100`
> 2. `=` down the chain: $f_{LO}$ = **110.7** MHz → $f_{image}$ = **121.4** MHz → **21.4** MHz clear of the 88–108 MHz band, so a fixed preselector removes it.

### P3. A receiver with a $455\ \mathrm{kHz}$ IF uses low-side injection to receive a $1000\ \mathrm{kHz}$ station. Find the local oscillator and image frequencies.

**Given:** fRF = 1000 kHz; fIF = 455 kHz; low-side injection

**Solution:**

1. fLO = fRF - fIF = 1000 - 455 = 545 kHz
2. Image: f_image = fRF - 2 fIF = 1000 - 910 = 90 kHz
3. Check: |545 - 90| = 455 kHz
4. 90 kHz is far below the AM broadcast band, so the image is easily rejected by the preselector

> [!success]- Answer
> **fLO = 545 kHz; image at 90 kHz.**

> [!warning] Trap
> Using f_image = fRF + 2fIF out of habit and getting 1910 kHz. With low-side injection the image lies BELOW the signal; use f_image = fRF - 2fIF, and note that a negative result means no image exists in the physical band.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000−455 : 1000−2×455 : 545−90`
> 2. `=` down the chain: $f_{LO}$ = **545** kHz → $f_{image}$ = **90** kHz, below the band → `545−90` = **455** kHz = the IF, the check that both mix down together.
>
> Low-side injection puts the image BELOW the signal: `1000+910` = **1910** kHz from habit is the trap.

### P4. An AM broadcast receiver tunes $540$ to $1600\ \mathrm{kHz}$ with a $455\ \mathrm{kHz}$ IF and high-side injection. Find the local oscillator tuning range and its ratio.

**Given:** band = 540-1600 kHz; fIF = 455 kHz

**Solution:**

1. fLO,min = 540 + 455 = 995 kHz
2. fLO,max = 1600 + 455 = 2055 kHz
3. Ratio = 2055/995 = 2.065
4. The LO must track the preselector across this range, which is why ganged tuning and three-point alignment are used

> [!success]- Answer
> **The LO tunes 995 to 2055 kHz, a ratio of 2.065.**

> [!warning] Trap
> Computing the LO range ratio as 1600/540 = 2.96 by forgetting the IF offset. Adding a constant IF compresses the ratio, and the difference is exactly what makes tracking alignment necessary.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `540+455 : 1600+455 : Ans÷995`
> 2. `=` down the chain: $f_{LO,min}$ = **995** kHz → $f_{LO,max}$ = **2055** kHz → ratio **2.065**, against the band's own `1600÷540` = **2.96**.
>
> The constant IF offset COMPRESSES the ratio; computing `1600÷540` and forgetting the offset is the trap.

### P5. A receiver needs both strong image rejection and narrow adjacent-channel selectivity. Compare a $455\ \mathrm{kHz}$ IF and a $10.7\ \mathrm{MHz}$ IF for a $10\ \mathrm{kHz}$ channel, and state the standard solution.

**Given:** required channel = 10 kHz; IF options 455 kHz and 10.7 MHz; signal near 100 MHz

**Solution:**

1. At 455 kHz the percentage bandwidth is 10/455 = 2.2 percent (filter is easy), but the image is only 910 kHz away, i.e. 0.9 percent of 100 MHz, so a preselector cannot reject it
2. At 10.7 MHz the image is 21.4 MHz away, which is easily filtered, but the percentage bandwidth is 10/10700 = 0.093 percent, so the IF filter must be very sharp
3. Neither single IF gives both
4. Standard solution: double conversion - first IF at 10.7 MHz for image rejection, second IF at 455 kHz for selectivity

> [!success]- Answer
> **455 kHz gives selectivity but poor image rejection; 10.7 MHz gives image rejection but a hard selectivity requirement. Use double conversion.**

> [!warning] Trap
> Believing a higher IF is simply better. A high IF improves image rejection but makes the IF filter's relative sharpness requirement harder; the two requirements pull in opposite directions, which is precisely why double conversion exists.

## Traps & Exam Notes

- **Confusing the local oscillator frequency with the image frequency.** $f_{LO}=f_{RF}+f_{IF}$ but $f_{image}=f_{RF}+2f_{IF}$. The image is the *other* input that also lands on the IF, one IF above the LO.
- **Using the high-side image formula with low-side injection.** With $f_{LO}=f_{RF}-f_{IF}$ the image is $f_{RF}-2f_{IF}$; if that value is negative there is no physical image. Always state the injection side.
- **Thinking the RF preselector can solve the image at any IF.** Image rejection depends on the *ratio* $f_{image}/f_{RF}$, which shrinks as the IF falls; a 455 kHz IF at 100 MHz gives an image 0.9 percent away, beyond any practical preselector.
- **Assuming a higher IF is unconditionally better.** A high IF fixes the image but makes the IF filter's percentage bandwidth smaller, so the same absolute channel width demands a sharper, lossier filter — and high-frequency IF gain is more expensive and less stable.
- **Forgetting that the LO frequency error is the received frequency error.** Any drift or phase noise in the LO translates directly into a tuning error; AM broadcast needs roughly $\pm100\ \mathrm{Hz}$, while SSB needs tens of hertz or the audio shifts audibly.
- **Ignoring IF feedthrough and spurious responses.** A strong signal at the IF itself can pass straight through the mixer, and LO harmonics create additional responses. A receiver's spurious-response specification covers all of them, not only the image.
- **Assuming tracking is automatic.** The preselector and LO must stay aligned as the receiver is tuned; ganged capacitors with three-point alignment are used, and tracking error at the band edges degrades both sensitivity and image rejection.
- **Believing direct conversion removes all receiver problems.** Zero-IF eliminates the image but introduces DC offset, $1/f$ noise and second-order intermodulation, which is why it needed integrated fabrication and digital correction before it became the dominant architecture.

## See Also

- [[13_Image_Frequency_and_IRR]]
- [[14_AGC_and_Receiver_Characteristics]]
- [[05_SNR,_Noise_Factor_and_Noise_Figure]]
- [[11_Pre-Emphasis_and_De-Emphasis]]

---

[[11_Pre-Emphasis_and_De-Emphasis|⬅ 11]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Image_Frequency_and_IRR|13 ➡]]
