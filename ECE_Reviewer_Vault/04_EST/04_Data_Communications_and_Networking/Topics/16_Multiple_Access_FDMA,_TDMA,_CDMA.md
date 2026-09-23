---
id: EST-04-16
title: "Multiple Access: FDMA, TDMA, CDMA"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 16
tier: 2
depth: full
problem_count: 5
prereqs: ["[[14_Multiplexing_FDM,_TDM,_T1_and_E1]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 16 — Multiple Access: FDMA, TDMA, CDMA

> [!abstract] Scope
> Compare FDMA, TDMA and CDMA as ways to share one radio channel, and compute FDMA channel counts, TDMA slot timing and CDMA processing gain and capacity.

## Core Concept

> [!tip] Intuition
> FDMA slices the spectrum into lanes. TDMA gives everyone the whole road for a fraction of the time. CDMA lets everyone drive everywhere at once, in different languages, and relies on each receiver understanding only its own.

**FDMA.** Each user is assigned a distinct frequency band for the whole duration of the call. The bands must be separated by *guard bands* because real filters have finite roll-off, so a fraction of the spectrum is always wasted; the transmitter can then use a non-linear power amplifier since the envelope of a single narrowband carrier is well behaved. FDMA was the basis of the first-generation analog cellular systems (AMPS, TACS, NMT) and of the original satellite links. Its weaknesses are that the number of users is fixed by the spectrum, capacity does not adapt to traffic, and each channel needs its own costly duplexer and filter.

**TDMA.** Each user gets the entire channel bandwidth for a periodic *time slot*, so several users share one FDMA carrier. A TDMA frame contains a preamble or sync burst, the traffic slots, and guard times between slots to absorb propagation-delay differences between mobiles at different distances. TDMA requires tight synchronisation across the cell and burst-mode transmitters, but it needs no duplexer per user and it makes handoff easier because a mobile can listen to another base station in its idle slots. GSM is the canonical TDMA system: eight slots per 200 kHz carrier, with a frame of 4.615 ms and a slot of about 577 μs.

**CDMA.** Every user transmits simultaneously over the whole band using a distinct spreading code. The narrowband data is multiplied by a much faster *chip* sequence, which spreads the signal across the wideband channel; the receiver correlates with the same code to despread its own signal while leaving other users' signals spread and therefore appearing as low-level noise. The ratio of chip rate to data rate is the *processing gain*, which is exactly the interference-rejection the system buys. CDMA offers soft capacity (each additional user degrades everyone slightly rather than being blocked), soft handoff (a mobile can be connected to two base stations at once), and inherent resistance to narrowband interference and interception.

**Processing gain and capacity.** With a chip rate of 1.2288 Mcps and a 9.6 kbps voice channel, the processing gain is $128$, i.e. $21.1\ \mathrm{dB}$. Capacity follows from requiring each user's signal to exceed the total interference by the $E_b/N_0$ the receiver needs:
$$N \approx \dfrac{\mathrm{PG}}{E_b/N_0}$$
plus the gain from voice-activity factor, sectorisation and cell isolation. With $E_b/N_0 = 7\ \mathrm{dB}$ (a linear ratio of 5.0) the bare figure is $128/5 = 25$ users per sector-carrier, and realistic IS-95 designs arrived at roughly 20–25 with the additional factors included.

**Comparing the three.** For a fixed bandwidth and a fixed required $E_b/N_0$, CDMA has the highest theoretical capacity, because it is interference-limited rather than channelised: every user is an interferer to every other, but the processing gain suppresses them all. FDMA has the lowest, because guard bands are pure waste. TDMA sits in between and adds the flexibility of assigning multiple slots to one user to vary the data rate. In practice all three are combined: a cellular system uses FDMA to separate its carriers, TDMA or OFDMA within each carrier, and CDMA as an alternative multiple-access layer entirely (WCDMA, CDMA2000).

**What the exam asks.** Three calculations recur. First, count FDMA channels from the total spectrum, the channel width and the guard band. Second, compute a TDMA slot duration and the resulting per-slot bit rate from a frame structure. Third, compute processing gain in dB and estimate the number of simultaneous users from the processing gain and the required $E_b/N_0$. All three are single-formula exercises, and the standard failure is unit confusion between chips per second and bits per second.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| FDMA channel count | $N = \frac{B_{total}}{B_{ch} + B_{guard}}$ | AMPS: 25 MHz of spectrum with 30 kHz channels gives about 832 channels including the reserved control channels. |
| TDMA slot duration | $T_{slot} = \frac{T_{frame}}{N_{slots}}$ | GSM: 4.615 ms frame with 8 slots gives about 577 us per slot, of which some is guard time. |
| TDMA per-user bit rate | $R_{user} = \frac{\mathrm{bits\ per\ slot}}{T_{frame}}$ | The user's rate is the slot payload divided by the *whole frame*, not by the slot duration. |
| TDMA guard time | $T_{guard} \geq \frac{2\Delta d}{c}$ | Delta d is the maximum difference in distance from the mobiles to the base station. Absorbs timing misalignment. |
| Processing gain | $\mathrm{PG} = \frac{R_{chip}}{R_{bit}}$ | IS-95: 1.2288 Mcps over 9.6 kbps gives PG = 128. Must use chips/s over bits/s. |
| Processing gain in dB | $\mathrm{PG}_{dB} = 10\log_{10}\!\left(\frac{R_{chip}}{R_{bit}}\right)$ | PG = 128 gives 21.1 dB of interference rejection. |
| CDMA capacity estimate | $N \approx \frac{\mathrm{PG}}{E_b/N_0} = \frac{R_{chip}/R_{bit}}{E_b/N_0}$ | Bare interference-limited estimate. Real capacity adds voice-activity and sectorisation gains. |
| CDMA with voice activity | $N \approx \frac{\mathrm{PG}}{E_b/N_0} \times \frac{1}{v_f} \times G_{sect}$ | v_f is the voice activity factor (about 0.4 for speech); G_sect is 3 for a three-sector site. |
| Chipping rate | $R_{chip} = 1.2288\ \mathrm{Mcps}\ (\mathrm{IS{-}95})$ | 54 chips per bit at 9.6 kbps, giving 64-ary orthogonal modulation plus the spreading gain. |
| Guard band fraction | $\eta_{guard} = \frac{B_{guard}}{B_{ch} + B_{guard}}$ | Pure waste. It is why FDMA's spectrum efficiency is the lowest of the three. |

## Worked Problems

### P1. A $12.5\ \mathrm{MHz}$ band is divided into FDMA channels of $30\ \mathrm{kHz}$ including guard band. How many channels are available?

**Given:** B_total = 12.5 MHz; channel spacing = 30 kHz (guard included)

**Solution:**

1. N = B_total/B_channel
2. = 12.5e6/30e3
3. = 416.67
4. Round down: 416 channels

> [!success]- Answer
> **416 channels**

> [!warning] Trap
> Rounding 416.67 *up* to 417 and creating a channel that extends past the end of the band. The count is a floor, not a nearest-integer rounding.

### P2. A TDMA system uses a $4.615\ \mathrm{ms}$ frame with 8 slots. Find the slot duration and the fraction of the frame left as guard time if each slot needs $30\ \mu\mathrm{s}$ of guard.

**Given:** T_frame = 4.615 ms; N_slots = 8; guard = 30 us per slot

**Solution:**

1. Slot duration = 4.615 ms/8 = 0.5769 ms = 576.9 us
2. Total guard time = 8 x 30 us = 240 us
3. Useful slot time = 576.9 - 30 = 546.9 us per slot
4. Guard fraction = 240/4615 = 5.2% of the frame

> [!success]- Answer
> **$T_{slot} = 577\ \mu\mathrm{s}$; guard is $5.2\%$ of the frame**

> [!warning] Trap
> Quoting 577 μs as the usable slot and ignoring the guard entirely. Every slot loses its guard time, so the effective per-user payload is about 547 μs — a 5% capacity loss that a capacity calculation must include.

### P3. An IS-95 CDMA system uses a $1.2288\ \mathrm{Mcps}$ chip rate and a $9.6\ \mathrm{kbps}$ voice channel. Find the processing gain as a ratio and in dB.

**Given:** R_chip = 1.2288 Mcps; R_bit = 9.6 kbps

**Solution:**

1. PG = R_chip/R_bit
2. = 1 228 800/9600
3. = 128
4. PG_dB = 10 log10(128) = 10 x 2.1072
5. = 21.07 dB

> [!success]- Answer
> **$\mathrm{PG} = 128 = 21.1\ \mathrm{dB}$**

> [!warning] Trap
> Using 1.2288 MHz as the chip rate in MHz and then dividing by 9.6 kbps without converting units. Both must be in the same unit (per second), or the ratio is off by $10^6$.

### P4. Using the processing gain of 128, estimate how many simultaneous users a CDMA carrier supports if each requires $E_b/N_0 = 7\ \mathrm{dB}$.

**Given:** PG = 128; Eb/N0 = 7 dB

**Solution:**

1. Convert: Eb/N0 = 10^(7/10) = 5.012 (linear)
2. N = PG/(Eb/N0) = 128/5.012
3. = 25.5 users
4. So about 25 users per carrier before voice-activity and sectorisation gains

> [!success]- Answer
> **About 25 users per carrier**

> [!warning] Trap
> Dividing 128 by 7 and answering 18. $E_b/N_0$ in dB must be converted to a linear power ratio first; using the dB number directly understates capacity by about 30%.

### P5. Compare FDMA and TDMA capacity for a $200\ \mathrm{kHz}$ channel that can hold either one FDMA carrier at 25 kbps or a TDMA carrier with 8 slots. Find the per-user rate in each case.

**Given:** B = 200 kHz; FDMA = 1 user at 25 kbps; TDMA = 8 slots

**Solution:**

1. FDMA: each user gets the whole 25 kbps continuously
2. TDMA: the 25 kbps carrier is shared, so each user gets 25/8 = 3.125 kbps average
3. But TDMA serves 8 users simultaneously where FDMA serves 1
4. Aggregate throughput is the same 25 kbps; TDMA trades per-user rate for user count

> [!success]- Answer
> **FDMA 25 kbps for 1 user; TDMA 3.125 kbps for each of 8 users**

> [!warning] Trap
> Concluding that TDMA increases total capacity on the same bandwidth. It does not — the aggregate rate is unchanged. TDMA's advantages are in flexibility, handoff and hardware sharing, not raw spectral efficiency.

## Traps & Exam Notes

- **Dividing processing gain by $E_b/N_0$ in dB.** The capacity formula needs the *linear* power ratio. 7 dB is 5.01, not 7; using the dB value gives 18 users instead of 25.
- **Mixing chips per second with bits per second.** Processing gain is chip rate divided by bit rate in consistent units. Substituting MHz for cps against kbps for bps inflates the ratio by $10^6$.
- **Assuming TDMA or CDMA creates bandwidth from nothing.** On a fixed channel, TDMA keeps aggregate throughput the same and divides it among more users; FDMA and TDMA have comparable spectral efficiency. CDMA's gain comes from being interference-limited rather than channelised, plus voice-activity and sectorisation factors.
- **Ignoring TDMA guard time.** Every slot loses guard time that grows with the cell radius, so the usable payload per slot is less than frame divided by slots — typically 5% of the frame.
- **Rounding the FDMA channel count up.** The available channels are the *floor* of total bandwidth divided by channel spacing; rounding up invents a channel that runs past the end of the band.
- **Treating CDMA users as orthogonal.** They are not, in a multipath channel. Each user is interference to every other, which is exactly why capacity is interference-limited and why every added user degrades everyone's $E_b/N_0$ slightly.

## See Also

- [[14_Multiplexing_FDM,_TDM,_T1_and_E1]]
- [[17_OFDMA_and_Spread_Spectrum]]
- [[18_Cellular_Fundamentals,_Reuse_and_Handoff]]
- [[19_Cellular_Generations_2G_to_5G]]

---

[[15_WDM_and_DWDM|⬅ 15]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[17_OFDMA_and_Spread_Spectrum|17 ➡]]
