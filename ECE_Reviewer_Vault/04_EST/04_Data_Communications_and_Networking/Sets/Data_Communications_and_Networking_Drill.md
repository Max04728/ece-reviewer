---
title: "Data Communications and Networking — Drill"
type: drill
area: 04_Data_Communications_and_Networking
part: 04_EST
seed: 1
count: 8
pool: 83
updated: 2026-09-23
---

# Data Communications and Networking — Practice Drill

**8 problems** drawn from a pool of 83 across 15 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 04_Data_Communications_and_Networking --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. An 802.11b station contends with a minimum contention window of 31 slots. Find the average backoff time and the worst-case backoff.

**Given:** CW = 31 slots; slot time = 20 us

> [!success]- Answer
> **Average $310\ \mu\mathrm{s}$; worst case $620\ \mu\mathrm{s}$**

> [!warning] Trap
> Using the maximum rather than the mean for an average-throughput calculation. The backoff is uniformly distributed, so the expected wait is half the window, not the full window.

<sub>from EST-04-07</sub>

### 2. A $10\ \mathrm{Mbps}$ CSMA/CD LAN has a maximum collision domain of $2500\ \mathrm{m}$ and a signal speed of $2\times10^{8}\ \mathrm{m/s}$. Find the minimum frame size in bits and bytes, ignoring repeater delays.

**Given:** R = 10 Mbps; d = 2500 m; v = 2e8 m/s

> [!success]- Answer
> **250 bits, i.e. about 31 bytes**

> [!warning] Trap
> Answering 64 bytes and stopping. The 64-byte standard figure comes from the *repeater-buffered* 51.2 us round trip of a five-segment 10Base5 network, not from raw cable delay. The raw calculation here gives half that, which is why the standard rounds up and adds repeater budget.

<sub>from EST-04-06</sub>

### 3. A slotted ALOHA channel is offered a load of $G = 1$. Find the throughput as a fraction and, for a $10\ \mathrm{Mbps}$ channel, the goodput in Mbps.

**Given:** G = 1; channel rate = 10 Mbps; slotted ALOHA

> [!success]- Answer
> **$S = 36.8\%$, goodput $= 3.68\ \mathrm{Mbps}$**

> [!warning] Trap
> Using the pure-ALOHA formula $Ge^{-2G}$ and answering $13.5\%$. Slotting halves the vulnerable period; using the wrong exponent understates the throughput by a factor of about 2.7.

<sub>from EST-04-06</sub>

### 4. For the link above, find the window size that achieves 100% utilisation, then the minimum sequence-number field width for Go-Back-N and for Selective Repeat.

**Given:** a = 10; target U = 1

> [!success]- Answer
> **$N = 21$ frames; $k = 5$ for GBN, $k = 6$ for SR**

> [!warning] Trap
> Using $2^k \geq N$ for Go-Back-N. The bound is $2^k - 1 \geq N$, so a 32-frame window needs $k = 6$ (63 values, since $2^5 - 1 = 31 < 32$) even though $2^5 = 32$ looks sufficient. One sequence value must always be reserved to distinguish a new frame from an old duplicate.

<sub>from EST-04-04</sub>

### 5. A DSSS receiver has a processing gain of $21\ \mathrm{dB}$, requires an $S/N$ of $10\ \mathrm{dB}$ at its output, and has $2\ \mathrm{dB}$ of implementation loss. Find the jamming margin.

**Given:** PG = 21 dB; (S/N)req = 10 dB; L = 2 dB

> [!success]- Answer
> **Jamming margin $= 9\ \mathrm{dB}$**

> [!warning] Trap
> Forgetting the implementation loss, or subtracting it with the wrong sign. The margin is what is left of the processing gain after the receiver's own requirements are met, so both subtractions reduce it.

<sub>from EST-04-17</sub>

### 6. How many usable host addresses does a Class C network provide, and how many Class C networks exist?

**Given:** Class C = /24

> [!success]- Answer
> **254 hosts per network; $2\,097\,152$ networks**

> [!warning] Trap
> Answering 256 hosts. The all-zeros host part is the network address and the all-ones host part is the directed broadcast, so two addresses per network are never assignable.

<sub>from EST-04-09</sub>

### 7. A congested cell of radius $1\ \mathrm{km}$ is split by halving the radius. Find the capacity gain and the change in the reuse distance for $N = 7$.

**Given:** R_old = 1 km; R_new = 0.5 km; N = 7

> [!success]- Answer
> **Four times the capacity; reuse distance drops from $4.58\ \mathrm{km}$ to $2.29\ \mathrm{km}$**

> [!warning] Trap
> Saying capacity doubles because the radius halved. Capacity scales with the number of *cells*, which scales with area, so it goes as the square of the radius ratio — a factor of 4, not 2. The cost is a fourfold increase in base stations and far more frequent handoffs.

<sub>from EST-04-18</sub>

### 8. A datagram network and a virtual-circuit network both carry a 10-packet file. Explain the difference in packet ordering, header size and failure behaviour.

**Given:** 10 packets; datagram vs virtual circuit

> [!success]- Answer
> **Datagram: independent routing, full addresses, out-of-order, robust. VC: fixed path, short labels, in-order, fragile.**

> [!warning] Trap
> Claiming a virtual circuit guarantees delivery. It guarantees *ordering* and a fixed path; it does not make the network reliable. Frame Relay and ATM had no retransmission at the network layer, and MPLS does not either.

<sub>from EST-04-08</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| EST-04-01 | OSI Seven-Layer Model | 9 |
| EST-04-02 | TCP/IP Protocol Suite | 4 |
| EST-04-03 | Framing and Flow Control | 4 |
| EST-04-04 | ARQ: Stop-and-Wait, GBN, Selective Repeat | 5 |
| EST-04-06 | MAC Protocols and Ethernet | 4 |
| EST-04-07 | Wireless LAN and CSMA/CA | 4 |
| EST-04-08 | Switching: Circuit vs Packet | 4 |
| EST-04-09 | IPv4 Addressing and Classes | 10 |
| EST-04-10 | Subnetting, CIDR and VLSM | 10 |
| EST-04-12 | Routing Algorithms: Distance Vector and Link State | 5 |
| EST-04-13 | TCP vs UDP and Port Numbers | 5 |
| EST-04-14 | Multiplexing: FDM, TDM, T1 and E1 | 5 |
| EST-04-16 | Multiple Access: FDMA, TDMA, CDMA | 5 |
| EST-04-17 | OFDMA and Spread Spectrum | 4 |
| EST-04-18 | Cellular Fundamentals, Reuse and Handoff | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
