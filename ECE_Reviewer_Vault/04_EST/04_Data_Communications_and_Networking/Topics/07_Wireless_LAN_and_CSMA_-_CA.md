---
id: EST-04-07
title: "Wireless LAN and CSMA/CA"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 7
tier: 2
depth: full
problem_count: 4
prereqs: ["[[06_MAC_Protocols_and_Ethernet]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Wireless LAN and CSMA/CA

> [!abstract] Scope
> Explain why 802.11 uses collision avoidance instead of collision detection, work through the DIFS/backoff/SIFS/ACK timing, and count the usable channels in the 2.4 and 5 GHz bands.

## Core Concept

> [!tip] Intuition
> A radio cannot hear a collision while it is shouting, so Wi-Fi cannot detect one. Instead it stays quiet for a random interval, asks permission when the channel is doubtful, and waits for an explicit acknowledgement.

**Why CSMA/CA and not CSMA/CD.** Ethernet's collision detection relies on a transmitter hearing a corrupted signal while it is still sending. A half-duplex radio's own transmission swamps any incoming signal by tens of decibels, so a Wi-Fi station simply cannot detect a collision. Two further problems follow: the *hidden node* problem, where two stations both hear the access point but not each other, and the *exposed node* problem, where a station defers unnecessarily because it hears a transmission that would not actually interfere. CSMA/CA therefore borrows Ethernet's carrier sense but replaces collision detection with collision *avoidance* — pre-emptive randomisation and, optionally, a reservation handshake.

**The interframe spaces.** 802.11 defines several interframe spacings that create a priority order. *SIFS* (short interframe space, 10 μs in 802.11b, 16 μs in 802.11a/g) is the shortest and is used for the ACK, CTS and fragments — so a station already in a dialogue keeps the channel against new contenders. *PIFS* (point coordination function IFS) is next and is used by the access point in contention-free mode. *DIFS* (distributed IFS, 50 μs in 802.11b, 34 μs in 802.11a/g) is the longest and is what an ordinary station must wait before contending. The gaps encode priority without any explicit signalling.

**The CSMA/CA exchange.** A station with data to send senses the medium. If it is idle for a DIFS it then waits a random *backoff* interval counted down in slot times, only while the medium stays idle; if the medium becomes busy the countdown freezes and resumes later. When the countdown reaches zero it transmits. The receiver waits SIFS and returns an ACK. If the sender receives no ACK it assumes a collision, doubles the contention window (binary exponential backoff again, CW from 31 up to 1023 slots) and retries. The freeze-and-resume rule is what gives contending stations a fair, decaying chance to win the channel.

**RTS/CTS and the hidden node.** Optionally the sender transmits a short Request To Send, the receiver answers with Clear To Send, and only then does the data frame follow. Every station within range of either the sender or the receiver hears one of the two control frames and defers for the announced duration, so a hidden node is silenced even though it cannot hear the data. The cost is substantial overhead on short frames, which is why the standard uses an RTS *threshold*: RTS/CTS is used only for frames longer than the threshold, typically a few hundred bytes.

**Channel layout.** The 2.4 GHz ISM band spans about 83.5 MHz (2.400–2.4835 GHz) and 802.11b/g channels are 22 MHz wide with only 5 MHz spacing, so adjacent channels overlap heavily. Only three channels are effectively non-overlapping: 1, 6 and 11 (or 1, 7, 13 in regions that allow channel 13). The 5 GHz band offers far more spectrum — roughly 125 MHz in the lower U-NII band alone, and over 500 MHz across all U-NII sub-bands — with 20 MHz channels, so many more non-overlapping channels are available. That channel abundance, not raw data rate, is the main reason 5 GHz performs better in dense deployments.

**Data rates and what they mean.** 802.11b runs at 1, 2, 5.5 and 11 Mbps with complementary code keying; 802.11a and g at up to 54 Mbps using OFDM; 802.11n adds MIMO and channel bonding to reach 600 Mbps; 802.11ac uses wider channels and more spatial streams for multi-gigabit rates; 802.11ax (Wi-Fi 6) adds OFDMA and uplink MU-MIMO. In every case the *throughput* a user sees is roughly half the nominal rate or less, because of the interframe spaces, the ACK, the random backoff and the half-duplex shared medium. A well-loaded 11 Mbps 802.11b cell delivering 5–6 Mbps of goodput is behaving normally.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| DIFS (802.11b) | $T_{DIFS} = 50\ \mu\mathrm{s}$ | 2.4 GHz DSSS. It is 34 us for 802.11a/g OFDM and 28 us for 802.11n/ac. |
| SIFS (802.11b) | $T_{SIFS} = 10\ \mu\mathrm{s}$ | Shortest gap; used for ACK, CTS and fragments so an ongoing exchange keeps the channel. |
| Slot time (802.11b) | $T_{slot} = 20\ \mu\mathrm{s}$ | The unit of the backoff countdown. It is 9 us for 802.11a/g. |
| Contention window | $CW = 2^n - 1\ \mathrm{slots}, \quad 31 \leq CW \leq 1023$ | n is the retry number. The window doubles after each failure and stops growing at 1023. |
| Average backoff | $\overline{T}_{backoff} = \frac{CW}{2} \times T_{slot}$ | The mean of a uniform draw from 0 to CW. With CW = 31 and a 20 us slot this is 310 us. |
| ACK transmission time | $T_{ACK} \approx 304\ \mu\mathrm{s}\ (802.11b)$ | 14-byte ACK sent at the 1 Mbps basic rate plus the 192 us preamble and header. |
| Frame exchange duration | $T_{total} = T_{DIFS} + \overline{T}_{backoff} + T_{data} + T_{SIFS} + T_{ACK}$ | One successful data frame plus its acknowledgement. Every term is mandatory. |
| DSSS/CCK occupied bandwidth | $B_{ch} = 22\ \mathrm{MHz}, \quad \Delta f_{ch} = 5\ \mathrm{MHz}$ | The 5 MHz raster with 22 MHz channels is why only three 2.4 GHz channels do not overlap. |
| Non-overlapping 2.4 GHz channels | $\mathrm{channels\ 1,\ 6,\ 11}$ | Separated by 5 x 5 = 25 MHz, which exceeds the 22 MHz channel width. |
| Data throughput efficiency | $\eta = \frac{T_{data}}{T_{total}}$ | Typically 0.5 to 0.7 for full-size frames and far worse for short ones. |

## Worked Problems

### P1. How many non-overlapping channels does 802.11b provide in the 2.4 GHz ISM band? Justify with the numbers.

**Given:** band = 2.400 to 2.4835 GHz; channel width = 22 MHz; channel spacing = 5 MHz

**Solution:**

1. Total band = 2483.5 - 2400 = 83.5 MHz
2. Two channels are non-overlapping if their centres are at least 22 MHz apart
3. Centres separated by 5 channels: 5 x 5 MHz = 25 MHz >= 22 MHz
4. Channels 1, 6 and 11 are therefore usable; channel 14 sits apart in Japan
5. Count: 3 non-overlapping channels

> [!success]- Answer
> **3 channels (1, 6 and 11)**

> [!warning] Trap
> Dividing 83.5 MHz by 5 MHz and answering 16. The 5 MHz figure is the channel *spacing*, not the channel *width*; overlapping channels interfere even though they are on different centre frequencies.

### P2. An 802.11b station contends with a minimum contention window of 31 slots. Find the average backoff time and the worst-case backoff.

**Given:** CW = 31 slots; slot time = 20 us

**Solution:**

1. Backoff is a uniform draw from 0 to 31 slots
2. Average = CW/2 = 15.5 slots
3. Average time = 15.5 x 20 us = 310 us
4. Worst case = 31 x 20 us = 620 us

> [!success]- Answer
> **Average $310\ \mu\mathrm{s}$; worst case $620\ \mu\mathrm{s}$**

> [!warning] Trap
> Using the maximum rather than the mean for an average-throughput calculation. The backoff is uniformly distributed, so the expected wait is half the window, not the full window.

### P3. An 802.11b station sends a 1000-byte data frame at $11\ \mathrm{Mbps}$ with DIFS 50 us, average backoff 310 us, SIFS 10 us and an ACK of 304 us. Find the total exchange time and the throughput efficiency.

**Given:** frame = 1000 bytes = 8000 bits; R = 11 Mbps; DIFS 50 us, backoff 310 us, SIFS 10 us, ACK 304 us

**Solution:**

1. T_data = 8000/11e6 = 727 us
2. T_total = 50 + 310 + 727 + 10 + 304 = 1401 us
3. Efficiency = 727/1401 = 0.519 = 51.9%
4. Effective goodput = 0.519 x 11 Mbps = 5.71 Mbps

> [!success]- Answer
> **$T_{total} = 1401\ \mu\mathrm{s}$, efficiency $51.9\%$, goodput $5.7\ \mathrm{Mbps}$**

> [!warning] Trap
> Reporting the nominal 11 Mbps as the throughput. The mandatory DIFS, backoff, SIFS and ACK together consume 674 us — nearly as long as the data frame itself — so a well-behaved 802.11b cell delivers only about half its headline rate.

### P4. A station adds RTS/CTS to protect a 1000-byte frame. RTS is 20 bytes and CTS is 14 bytes, both sent at the 1 Mbps basic rate, and each is preceded by a 192 us preamble. Estimate the additional time and state when RTS/CTS is worth it.

**Given:** RTS = 20 bytes, CTS = 14 bytes; basic rate = 1 Mbps; preamble = 192 us each; SIFS = 10 us

**Solution:**

1. RTS on air = 192 + 20 x 8/1e6 = 192 + 160 = 352 us
2. CTS on air = 192 + 14 x 8/1e6 = 192 + 112 = 304 us
3. Added overhead = RTS + SIFS + CTS + SIFS = 352 + 10 + 304 + 10 = 676 us
4. Compare with the 727 us data frame: RTS/CTS adds 93% of the data time
5. Worth it only for frames long enough that a collision would waste more than 676 us, i.e. above the RTS threshold

> [!success]- Answer
> **$676\ \mu\mathrm{s}$ added; worthwhile only above the RTS threshold**

> [!warning] Trap
> Ignoring the 192 us preamble on each control frame. At the 1 Mbps basic rate the preambles alone contribute 384 us, more than half the added cost — the payload bytes are almost irrelevant.

## Traps & Exam Notes

- **Using the channel spacing as the channel width.** 2.4 GHz channels are 22 MHz wide but spaced 5 MHz apart, so most of them overlap. Only 1, 6 and 11 are non-overlapping.
- **Assuming CSMA/CA detects collisions.** It cannot — a radio cannot receive while transmitting. It *avoids* collisions by randomising the start time and confirming with an ACK. Failing to receive an ACK is the only collision signal the sender gets.
- **Using the maximum backoff for average-throughput calculations.** The backoff is uniform on $[0, CW]$, so the expected value is $CW/2$. Using CW overstates the delay by a factor of two.
- **Forgetting the fixed per-frame overhead.** DIFS, backoff, SIFS and the ACK together add roughly 674 us on 802.11b regardless of payload — more than the transmission time of a 1000-byte frame. Short frames are catastrophically inefficient on Wi-Fi.
- **Mixing 802.11b and 802.11a/g timing constants.** DIFS is 50 us and slot time 20 us for 802.11b DSSS, but 34 us and 9 us for OFDM. Substituting one set into the other changes the answer by tens of percent.
- **Treating the nominal data rate as throughput.** A 54 Mbps 802.11g link delivers roughly 20–25 Mbps at the application layer. Air-rate is a modulation property; throughput includes contention, headers and acknowledgement overhead.

## See Also

- [[06_MAC_Protocols_and_Ethernet]]
- [[17_OFDMA_and_Spread_Spectrum]]
- [[16_Multiple_Access_FDMA,_TDMA,_CDMA]]
- [[03_Framing_and_Flow_Control]]

---

[[06_MAC_Protocols_and_Ethernet|⬅ 06]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Switching_Circuit_vs_Packet|08 ➡]]
