---
id: EST-04-04
title: "ARQ: Stop-and-Wait, GBN, Selective Repeat"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Framing_and_Flow_Control]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — ARQ: Stop-and-Wait, GBN, Selective Repeat

> [!abstract] Scope
> Compute ARQ link utilisation from the ratio of propagation delay to frame transmission time, and find the window size that fills a long-delay link.

## Core Concept

> [!tip] Intuition
> Every stop-and-wait frame spends most of its life travelling, not transmitting. The number a = propagation/transmission tells you how many frames could have been in flight during one round trip, and a sliding window of that size turns a nearly idle link into a busy one.

**Automatic Repeat reQuest.** ARQ turns an unreliable link into a reliable one using acknowledgements, timeouts and retransmission. Three variants are standard. *Stop-and-Wait* sends one frame and waits for its ACK before sending the next. *Go-Back-N* allows $N$ frames outstanding but the receiver only accepts frames in order, so a lost frame forces the retransmission of that frame and every frame after it. *Selective Repeat* allows $N$ frames outstanding and buffers out-of-order frames, so only the lost frame is retransmitted. Reliability increases from SW to GBN (better utilisation) to SR (fewest retransmissions, most receiver complexity).

**The parameter that governs everything.** Define $a = T_p/T_t$, the ratio of one-way propagation delay to frame transmission time. A frame and its acknowledgement together consume one round trip $2T_p$ of idle time, so a stop-and-wait sender is busy for $T_t$ out of every $T_t + 2T_p$ seconds. Dividing through gives the stop-and-wait utilisation $U = \dfrac{1}{1+2a}$. The interpretation is direct: $a$ is approximately the number of additional frames that could have been transmitted during the propagation delay, so a link with $a = 10$ is wasting 95% of its capacity under stop-and-wait.

**Sliding window closes the gap.** With a window of $N$ frames the sender keeps the pipe full, and the utilisation becomes $U = \dfrac{N}{1+2a}$ for $N < 1+2a$, saturating at $U = 1$ once $N \geq 1+2a$. The window needed for full utilisation is therefore $N_{min} = 1 + 2a$ — the classic *bandwidth-delay product* result. It is why long-delay links (satellite, intercontinental fibre) need large windows and short-delay links (LANs) need only a handful. Same formula for Go-Back-N and Selective Repeat at the utilisation level; the difference shows up in *how much* is retransmitted when a frame is lost.

**Error probability changes the picture.** With a frame error probability $P$, stop-and-wait becomes $U = \dfrac{1-P}{1+2a}$, because a fraction $P$ of transmissions are wasted. For Go-Back-N the penalty is much worse: one error forces up to $N$ retransmissions, and the utilisation falls to:
$$U \approx \dfrac{N(1-P)}{(1+2a)(1 + (N-1)P)}$$
Selective Repeat keeps $U \approx \dfrac{N(1-P)}{1+2a}$, since only the errored frame is repeated. This is the quantitative reason SR is worth its complexity on error-prone, high-delay links such as satellite channels, and why GBN is preferred on short reliable links where its simpler receiver wins.

**Sequence numbers and window limits.** The window cannot exceed the sequence space. Go-Back-N requires $N \leq 2^k - 1$ and Selective Repeat requires $N \leq 2^{k-1}$, where $k$ is the number of bits in the sequence field. Combine this with $N_{min} = 1 + 2a$ to answer the standard compound question: first find the window the link needs, then find the minimum $k$ that supports it.

**Which protocol does what.** Stop-and-Wait uses a 1-bit sequence number and is used by simple character-oriented protocols. Go-Back-N is used where the receiver buffer is small and errors are rare. Selective Repeat appears in TCP's selective acknowledgement option and in HDLC's selective-reject mode. TCP itself is a hybrid: a sliding window with cumulative acknowledgement like GBN, but with SACK it behaves like Selective Repeat.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Transmission time | $T_t = \frac{L}{R}$ | L is frame length in bits, R the bit rate. Also written T_fr or T_frame. |
| Propagation delay | $T_p = \frac{d}{v}$ | d is the link length, v the propagation speed (about 2e8 m/s in copper or fibre, 3e8 in vacuum). |
| Normalised propagation delay | $a = \frac{T_p}{T_t}$ | Dimensionless. a = 10 means ten more frames could have been sent while one propagated. |
| Stop-and-wait utilisation | $U = \frac{1}{1+2a}$ | One frame per round trip. a = 0 gives U = 1; a = 10 gives 4.76%. |
| Sliding window utilisation | $U = \frac{N}{1+2a} \quad \mathrm{for}\ N < 1+2a$ | Saturates at U = 1. Same expression for Go-Back-N and Selective Repeat. |
| Window for full utilisation | $N_{min} = 1 + 2a$ | The bandwidth-delay product in frames. Round up to an integer. |
| Stop-and-wait with frame errors | $U = \frac{1-P}{1+2a}$ | P is the frame error probability. Retransmissions waste a fraction P of the transmission time. |
| Go-Back-N with errors | $U \approx \frac{N(1-P)}{(1+2a)\,[1+(N-1)P]}$ | Worse than SR because one error costs up to N retransmissions. |
| Selective Repeat with errors | $U \approx \frac{N(1-P)}{1+2a}$ | Only the errored frame is repeated, so the error penalty is minimal. |
| Go-Back-N window limit | $N \leq 2^k - 1$ | k = sequence-number bits. The receive window is 1, so one value must be excluded. |
| Selective Repeat window limit | $N \leq 2^{k-1}$ | Both windows slide independently, so together they must fit inside the sequence space. |
| Effective throughput | $R_{eff} = U \cdot R$ | The utilisation fraction times the raw line rate. |

## Worked Problems

### P1. A stop-and-wait protocol sends 1000-bit frames at $1\ \mathrm{Mbps}$ over a link with a one-way propagation delay of $10\ \mathrm{ms}$. Find $a$ and the link utilisation.

**Given:** L = 1000 bits; R = 1 Mbps; Tp = 10 ms

**Solution:**

1. Tt = L/R = 1000/1e6 = 1 ms
2. a = Tp/Tt = 10/1 = 10
3. U = 1/(1 + 2a) = 1/(1 + 20) = 1/21
4. = 0.0476 = 4.76%

> [!success]- Answer
> **$a = 10$, $U = 4.76\%$**

> [!warning] Trap
> Using $U = 1/(1+a) = 1/11 = 9.1\%$ and forgetting the return trip. A frame and its ACK each consume one propagation delay, so the idle time is $2T_p$.

### P2. For the link above, find the window size that achieves 100% utilisation, then the minimum sequence-number field width for Go-Back-N and for Selective Repeat.

**Given:** a = 10; target U = 1

**Solution:**

1. N_min = 1 + 2a = 1 + 20 = 21 frames
2. Go-Back-N: need 2^k - 1 >= 21, so 2^k >= 22. 2^4 = 16 is too small, 2^5 = 32 -> k = 5
3. Selective Repeat: need 2^(k-1) >= 21, so 2^(k-1) >= 21. 2^4 = 16 is too small, 2^5 = 32 -> k-1 = 5, k = 6

> [!success]- Answer
> **$N = 21$ frames; $k = 5$ for GBN, $k = 6$ for SR**

> [!warning] Trap
> Using $2^k \geq N$ for Go-Back-N. The bound is $2^k - 1 \geq N$, so a 32-frame window needs $k = 6$ (63 values, since $2^5 - 1 = 31 < 32$) even though $2^5 = 32$ looks sufficient. One sequence value must always be reserved to distinguish a new frame from an old duplicate.

### P3. The same link uses Go-Back-N with a window of 7 frames. Find the utilisation, and compare with Selective Repeat using the same window.

**Given:** a = 10; N = 7

**Solution:**

1. 1 + 2a = 21
2. Go-Back-N: U = N/(1+2a) = 7/21 = 0.333 = 33.3%
3. Selective Repeat: U = 7/21 = 0.333 = 33.3% on an error-free link
4. The two are identical without errors; they differ only in how much is retransmitted when a frame is lost

> [!success]- Answer
> **Both $33.3\%$; the protocols differ only under errors**

> [!warning] Trap
> Expecting Selective Repeat to give a higher utilisation on a clean link. With no errors the two formulas coincide — SR's advantage is not utilisation per se but the *number of retransmissions* when P > 0.

### P4. A geostationary satellite link has a one-way delay of $270\ \mathrm{ms}$ and carries 1000-bit frames at $1\ \mathrm{Mbps}$. Find the window needed for full utilisation and the corresponding sequence bits for Selective Repeat.

**Given:** Tp = 270 ms; L = 1000 bits; R = 1 Mbps

**Solution:**

1. Tt = 1000/1e6 = 1 ms
2. a = 270/1 = 270
3. N_min = 1 + 2(270) = 541 frames
4. SR requires 2^(k-1) >= 541; 2^9 = 512 is too small, 2^10 = 1024 works
5. k - 1 = 10, so k = 11 bits

> [!success]- Answer
> **$N = 541$ frames, $k = 11$ bits of sequence number**

> [!warning] Trap
> Confusing the round-trip delay with the one-way delay: using $T_p = 540\ \mathrm{ms}$ doubles the answer to 1081 frames and pushes $k$ to 12. The quoted 270 ms is one way; the formula's $2a$ already accounts for the round trip.

### P5. A stop-and-wait link has $a = 10$ and a frame error probability of $0.1$. Find the utilisation and the effective throughput on a $1\ \mathrm{Mbps}$ line.

**Given:** a = 10; P = 0.1; R = 1 Mbps

**Solution:**

1. U = (1 - P)/(1 + 2a) = 0.9/21
2. = 0.04286 = 4.29%
3. Effective throughput = U x R = 0.04286 x 1e6
4. = 42.86 kbps

> [!success]- Answer
> **$U = 4.29\%$, throughput $= 42.9\ \mathrm{kbps}$**

> [!warning] Trap
> Applying the error penalty to the numerator and denominator inconsistently, or forgetting that the timeout is longer than $2T_p$ once retransmissions are counted. The simple $(1-P)/(1+2a)$ form assumes the timeout equals the round trip; a longer timeout reduces utilisation further.

## Traps & Exam Notes

- **Using $U = 1/(1+a)$ instead of $1/(1+2a)$.** The acknowledgement needs its own propagation delay. Using the one-way figure doubles the apparent utilisation.
- **Treating the given delay as round-trip when it is one-way.** Satellite problems habitually quote the 270 ms one-way figure; the $2a$ in the formula converts it to a round trip. Doubling it again is a factor-of-two error in the window.
- **Assuming Selective Repeat gives higher utilisation than Go-Back-N without errors.** At $P = 0$ their utilisation formulas are identical. SR's advantage is reducing the *cost* of errors, not raising the ceiling.
- **Using $N = 2^k$ for Go-Back-N.** The bound is $2^k - 1$; a window equal to the full sequence space makes an old frame indistinguishable from a new one after the window wraps.
- **Forgetting that a window cannot make U exceed 1.** The formula $N/(1+2a)$ saturates: a window larger than $1+2a$ does not give 150% utilisation, it simply wastes receiver buffer. Always cap at 1.
- **Confusing the window limit with the window needed.** $N_{min} = 1+2a$ is what the link requires; $2^k - 1$ (GBN) or $2^{k-1}$ (SR) is what the sequence field permits. A problem usually needs both, in that order.

## See Also

- [[03_Framing_and_Flow_Control]]
- [[05_HDLC_and_PPP]]
- [[13_TCP_vs_UDP_and_Port_Numbers]]
- [[16_Error_Control_Hamming_and_CRC]]

---

[[03_Framing_and_Flow_Control|⬅ 03]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[05_HDLC_and_PPP|05 ➡]]
