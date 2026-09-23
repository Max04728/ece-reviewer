---
title: "Principles of Communications — Drill"
type: drill
area: 02_Principles_of_Communications
part: 04_EST
seed: 1
count: 8
pool: 63
updated: 2026-09-23
---

# Principles of Communications — Practice Drill

**8 problems** drawn from a pool of 63 across 11 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 02_Principles_of_Communications --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. An FM transmitter's deviation is doubled while the modulating frequency is unchanged. What happens to the modulation index, the bandwidth and the output SNR?

**Given:** beta: 2 then 4; fm unchanged

> [!success]- Answer
> **Bandwidth rises by about 4.4 dB; output SNR rises by exactly 6 dB.**

> [!warning] Trap
> Expecting an equal exchange (6 dB of bandwidth for 6 dB of SNR). The exchange is unfavourable: SNR goes as beta^2 while bandwidth goes roughly as beta, so a 6 dB SNR gain costs only about 4.4 dB of bandwidth at this index — but the threshold also worsens.

<sub>from EST-02-09</sub>

### 2. An FM signal has a modulation index of $5$ and a peak deviation of $20\ \mathrm{kHz}$. Find the modulating frequency and the carrier swing.

**Given:** beta = 5; df = 20 kHz

> [!success]- Answer
> **fm = 4 kHz; carrier swing = 40 kHz.**

> [!warning] Trap
> Reporting the carrier swing as 20 kHz. The deviation is the one-sided excursion; the swing is twice it. Also note beta is the ratio df/fm, so fm = df/beta, not beta/df.

<sub>from EST-02-05</sub>

### 3. An FM signal is observed to sweep between $99.925\ \mathrm{MHz}$ and $100.075\ \mathrm{MHz}$. Find the carrier frequency, the peak deviation and the percent modulation against a $75\ \mathrm{kHz}$ limit.

**Given:** f range = 99.925 to 100.075 MHz; df_max = 75 kHz

> [!success]- Answer
> **fc = 100 MHz; df = 75 kHz; 100 percent modulation.**

> [!warning] Trap
> Reporting the deviation as 150 kHz from the total sweep. The observed frequency range is the carrier swing, which is twice the peak deviation — a 150 kHz swing is exactly full deviation, not 200 percent modulation.

<sub>from EST-02-05</sub>

### 4. Pre-emphasis boosts $15\ \mathrm{kHz}$ by $17\ \mathrm{dB}$. By how much must the transmitter's audio level be backed off to keep the peak deviation at $75\ \mathrm{kHz}$, and why does this matter?

**Given:** boost = 17 dB at 15 kHz; df_max = 75 kHz

> [!success]- Answer
> **The level must be backed off by 17 dB at 15 kHz (a 7.08x amplitude boost) to preserve the deviation limit.**

> [!warning] Trap
> Assuming pre-emphasis is free because it is undone at the receiver. It is undone for the *audio*, but the deviation headroom was consumed at the transmitter, so a pre-emphasised system cannot use the full deviation for all frequencies simultaneously.

<sub>from EST-02-11</sub>

### 5. An AM transmitter has a carrier amplitude of $20\ \mathrm{V}$ and a modulation index of $0.4$ into a $50\ \Omega$ load. Find the carrier power, the power in each sideband and the total power.

**Given:** Ac = 20 V; m = 0.4; R = 50 ohm

> [!success]- Answer
> **Pc = 4 W; each sideband 0.16 W; Pt = 4.32 W.**

> [!warning] Trap
> Using Pc = Ac^2/R = 8 W and omitting the factor 2 in the peak-to-RMS conversion. For a sinusoid of peak amplitude Ac, the power is Ac^2/(2R).

<sub>from EST-02-02</sub>

### 6. An FM signal is radiated with a carrier amplitude of $20\ \mathrm{V}$. Compare the total power when $\beta = 0$ (unmodulated), $\beta = 1$ and $\beta = 2.405$, and explain.

**Given:** Ac = 20 V; beta = 0, 1, 2.405

> [!success]- Answer
> **4 W at every index; only the distribution changes (carrier 4 W, then 2.34 W, then 0 W).**

> [!warning] Trap
> Assuming the power grows with the modulation index, as it does in AM where sideband power is added to a fixed carrier. FM redistributes a constant total, so at a carrier null the carrier contributes nothing yet the total is unchanged.

<sub>from EST-02-06</sub>

### 7. An FM transmitter operates with a modulation index of $5$ and a $15\ \mathrm{kHz}$ modulating tone. How many significant sidebands appear on each side, what is the occupied bandwidth, and what is the index relative to Carson's rule?

**Given:** beta = 5; fm = 15 kHz

> [!success]- Answer
> **6 sidebands per side; BW = 180 kHz by both the table rule and Carson's rule.**

> [!warning] Trap
> Counting 6 sidebands in total rather than 6 per side, and halving the bandwidth to 90 kHz. The occupied band is 2 n_max fm, and the carrier sits in the middle.

<sub>from EST-02-06</sub>

### 8. An AM transmitter is 100 percent modulated. By what percentage does the antenna current increase over the unmodulated value, and what is the total power if the carrier power is $1\ \mathrm{kW}$?

**Given:** m = 1; Pc = 1 kW

> [!success]- Answer
> **Current rises 22.5 percent; Pt = 1.5 kW with 500 W in the sidebands.**

> [!warning] Trap
> Expecting the current to double at 100 percent modulation. Power rises by 50 percent, and current, going as the square root of power, rises by only 22.5 percent.

<sub>from EST-02-01</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| EST-02-01 | AM Fundamentals and Modulation Index | 9 |
| EST-02-02 | AM Spectrum, Bandwidth and Power | 5 |
| EST-02-03 | DSB-SC and SSB-SC | 5 |
| EST-02-05 | FM and PM Fundamentals | 9 |
| EST-02-06 | FM Sidebands and Bessel Functions | 5 |
| EST-02-07 | Carson’s Rule and FM Bandwidth | 5 |
| EST-02-09 | FM Noise and Threshold Effect | 5 |
| EST-02-10 | AM vs FM Noise Comparison | 5 |
| EST-02-11 | Pre-Emphasis and De-Emphasis | 5 |
| EST-02-12 | Superheterodyne Receiver | 5 |
| EST-02-13 | Image Frequency and IRR | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
