---
id: EST-03-06
title: "Line Coding Schemes"
part: "04_EST"
area: "03_Digital_Communications"
topic: 6
tier: 2
depth: full
problem_count: 4
prereqs: ["[[08_Sampling_Theorem_and_Aliasing]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Line Coding Schemes

> [!abstract] Scope
> Convert a bit stream into a baseband waveform: compare NRZ, RZ, Manchester, AMI and the multilevel codes on bandwidth, DC content, self-synchronisation and error detection.

## Core Concept

> [!tip] Intuition
> Line coding is a purely cosmetic decision about how to draw 1s and 0s on a wire — but the drawing decides whether the receiver can recover a clock, whether the cable sees a DC bias, and how much spectrum the link occupies.

**The four properties an examiner grades.** A line code is judged on (1) *baseline wandering* — a running DC imbalance that a transformer-coupled or AC-coupled receiver cannot track; (2) *DC component* — a nonzero average that wastes power and cannot pass a transformer; (3) *self-synchronisation* — whether the receiver can extract a clock from the waveform itself without a separate timing wire; and (4) *bandwidth* — how much spectrum the code needs for a given bit rate. Built-in *error detection* is a bonus property of the bipolar codes.

**NRZ family.** In NRZ-L the level itself encodes the bit (high = 1). In NRZ-I the *transition* encodes the bit: a transition at the start of the bit means 1, no transition means 0. Both need a bandwidth of only $N/2$ for a bit rate $N$ — half the bit rate — because the fundamental frequency of the worst-case pattern (0101...) is $N/2$. Neither is self-synchronising for long runs of identical bits, and NRZ-L suffers baseline wandering whenever the data is unbalanced. NRZ-I is immune to baseline wandering for long runs of 1s but not of 0s.

**RZ, Manchester and differential Manchester.** Return-to-zero forces a mid-bit transition to zero, which restores synchronisation but doubles the bandwidth to $B = N$ because the pulse is only half a bit wide, so its spectrum is twice as broad as NRZ's. Manchester encodes the bit as a *mid-bit transition* (high-to-low = 0, low-to-high = 1), giving guaranteed transitions and zero DC, also at $B = N$. Differential Manchester adds the transition-for-0 rule on top, so it is differential *and* self-clocking, which is why 802.5 Token Ring used it. Ethernet 10Base5/10Base2 used Manchester.

**Bipolar and multilevel codes.** AMI (Alternate Mark Inversion) encodes 0 as zero volts and each 1 as an alternating $+V/-V$. It has no DC component and detects any single-bit error, because a corrupted 1 breaks the alternation. However, long runs of 0s still kill synchronisation, so B8ZS (North America) and HDB3 (Europe/Japan) substitute deliberate violations of the AMI rule: B8ZS replaces eight consecutive zeros with `000VB0VB`, and HDB3 replaces four zeros with `000V` or `B00V` depending on the running parity. 2B1Q maps 2 bits into one of 4 levels, halving the symbol rate and therefore quartering the bandwidth relative to NRZ, and is used in ISDN basic rate and HDSL.

**Choosing, and the exam pattern.** Manchester and differential Manchester are chosen when self-clocking matters and bandwidth is cheap (classic Ethernet, Token Ring). AMI with B8ZS/HDB3 is chosen on long-haul T-carrier spans where DC and error detection matter. 2B1Q is chosen when the copper pair is band-limited (ISDN U-interface). NRZ is chosen for short chip-to-chip links and for optical systems where DC balance is handled by scrambling (e.g. 64b/66b). The standard bandwidth ladder to remember: NRZ and AMI need $N/2$; RZ, Manchester and differential Manchester need $N$; 2B1Q needs $N/4$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| NRZ minimum bandwidth | $B_{NRZ} = \frac{N}{2}$ | N is the bit rate in bps. Worst case is the 0101 pattern whose fundamental is N/2. |
| Manchester minimum bandwidth | $B_{Man} = N$ | Twice NRZ, because the guaranteed mid-bit transition doubles the highest fundamental frequency. |
| Differential Manchester bandwidth | $B_{DiffMan} = N$ | Same as Manchester, but also encodes a 0 as a transition at the bit boundary. |
| RZ minimum bandwidth | $B_{RZ} = N$ | Twice NRZ: the half-width pulses have a sinc envelope whose main lobe reaches 2N. |
| AMI bandwidth | $B_{AMI} = \frac{N}{2}$ | Same as NRZ. No DC component, and a single-bit error breaks the +/- alternation. |
| 2B1Q symbol rate and bandwidth | $R_s = \frac{N}{2}, \quad B_{2B1Q} = \frac{N}{4}$ | Two bits per symbol, four levels. Bandwidth is one quarter of the bit rate. |
| Baud and bit rate | $N = R_s \log_2 M$ | M is the number of signal levels. For 2B1Q, M = 4 so N = 2 Rs. |
| AMI alternation rule | $1 \rightarrow +V, -V, +V, -V, \ldots$ | Each successive 1 alternates polarity; 0 is always zero volts. |
| B8ZS substitution | $00000000 \rightarrow 000VB0VB$ | V = violation of the AMI rule, B = normal bipolar pulse. Two violations guarantee no false DC. |
| HDB3 substitution | $0000 \rightarrow 000V \ \mathrm{or}\ B00V$ | Choice keeps the running number of pulses between violations odd, preserving DC balance. |

## Interactive Widget

**Line Coding Waveform Viewer**

![[Line_Coding_Waveform_Viewer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A 1 Mbps NRZ-L data stream is sent over a baseband channel. Find the minimum bandwidth required.

**Given:** N = 1 Mbps; NRZ-L

**Solution:**

1. B_NRZ = N/2
2. = 1 000 000/2
3. = 500 000 Hz

> [!success]- Answer
> **$500\ \mathrm{kHz}$**

> [!warning] Trap
> Answering $1\ \mathrm{MHz}$ by equating bandwidth with bit rate. For NRZ the worst-case fundamental is $N/2$; only Manchester needs a full $N$.

### P2. The same 1 Mbps stream is sent using Manchester encoding. Find the minimum bandwidth and the bandwidth penalty relative to NRZ.

**Given:** N = 1 Mbps; Manchester

**Solution:**

1. B_Man = N = 1 000 000 Hz
2. Compare with NRZ: B_NRZ = 500 kHz
3. Penalty = 1 MHz/500 kHz = 2
4. In dB: 10 log10(2) = 3.01 dB

> [!success]- Answer
> **$1\ \mathrm{MHz}$, twice the NRZ bandwidth**

> [!warning] Trap
> Treating Manchester's waveform rate as the bit rate and doubling again to $2\ \mathrm{MHz}$. The mid-bit transition already *is* the $N$ component; no further doubling applies.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000000÷2` → NRZ floor = **500 000** Hz, while Manchester keeps the full **1 000 000** Hz.
> 2. `10×log(1000000÷500000)` → **3.0103** dB penalty, i.e. a **2×** bandwidth increase.
>
> Follows the note's own 10-log step; the traps section argues a bandwidth *ratio* in dB should use the 20-log, giving 6.02 dB.

### P3. A 160 kbps ISDN basic-rate signal is transmitted with 2B1Q line coding. Find the symbol rate and the minimum bandwidth.

**Given:** N = 160 kbps; 2B1Q (M = 4 levels)

**Solution:**

1. 2B1Q carries 2 bits per symbol: log2(4) = 2
2. Rs = N/2 = 160 000/2 = 80 000 baud
3. B_2B1Q = Rs/2 = 40 000 Hz

> [!success]- Answer
> **$R_s = 80\ \mathrm{kBd}$, $B = 40\ \mathrm{kHz}$**

> [!warning] Trap
> Reporting the symbol rate as the bandwidth. Nyquist limits a baseband symbol stream to $2B$ symbols per second, so the bandwidth is half the symbol rate.

### P4. An AMI-coded stream contains the eight-zero sequence `00000000`. Show the B8ZS substitution and state why it preserves both synchronisation and DC balance.

**Given:** AMI coding; eight consecutive zeros; assume the last pulse was +V

**Solution:**

1. Plain AMI would transmit eight zero-volt intervals, so the receiver sees no transitions and loses clock
2. B8ZS substitutes the eight zeros with the pattern 000VB0VB
3. With the preceding pulse +V, the first V violates AMI by repeating the polarity: V = +V
4. The intervening B then alternates normally: B = -V
5. The second V violates again against that B: V = -V, and the final B alternates: B = +V
6. Substituted pattern reads: 0 0 0 +V -V 0 +V -V
7. The two violations have opposite polarities, so the running DC average stays at zero

> [!success]- Answer
> **`000VB0VB` → `0 0 0 +V -V 0 +V -V`, net DC zero**

> [!warning] Trap
> Substituting a single violation. One violation leaves a DC component and makes the pattern ambiguous; B8ZS uses *two* violations of opposite polarity precisely to cancel.

## Traps & Exam Notes

- **Equating bandwidth with bit rate.** Only Manchester and differential Manchester need $B = N$; NRZ and AMI need $N/2$, 2B1Q needs $N/4$. Multiplying by two on every problem is the most common single error in this topic.
- **Calling NRZ self-synchronising.** A long run of identical bits gives a constant level with no transitions. The receiver's clock drifts and the whole frame is misread — that is the specific failure the Manchester and scrambling schemes exist to fix.
- **Confusing NRZ-L with NRZ-I.** NRZ-L encodes the *level*, NRZ-I encodes the *presence of a transition*. A single stream drawn correctly under one convention looks inverted under the other, and NRZ-I has the opposite behaviour on long runs of 1s versus 0s.
- **Assuming AMI removes all synchronisation problems.** AMI only guarantees transitions on 1s. A long run of 0s produces zero volts and kills the clock, which is exactly why B8ZS and HDB3 substitution patterns exist.
- **Getting the B8ZS/HDB3 violation polarity wrong.** The violation must have the *same* polarity as the preceding pulse (violating the alternation rule), not the opposite. Reversing it hides the violation from the receiver's error detector.
- **Mixing the 10-log and 20-log forms inside one problem.** Bandwidth ratios are conventionally quoted in the power form, so $2\times$ is $10\log_{10}2 = 3.01\ \mathrm{dB}$ — the figure these worked problems use. Some texts treat a frequency ratio as a field quantity and would write $6.02\ \mathrm{dB}$; either convention is defensible, so state which you are using rather than switching between them mid-problem.

## See Also

- [[07_Inter-Symbol_Interference_and_Nyquist_Criterion]]
- [[08_Eye_Diagrams_and_Equalization]]
- [[03_Framing_and_Flow_Control]]

---

[[05_Delta_Modulation_and_ADM|⬅ 05]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Inter-Symbol_Interference_and_Nyquist_Criterion|07 ➡]]
