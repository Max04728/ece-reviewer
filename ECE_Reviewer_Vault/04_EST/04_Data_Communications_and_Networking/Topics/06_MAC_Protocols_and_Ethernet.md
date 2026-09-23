---
id: EST-04-06
title: "MAC Protocols and Ethernet"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 6
tier: 2
depth: full
problem_count: 4
prereqs: ["[[03_Framing_and_Flow_Control]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — MAC Protocols and Ethernet

> [!abstract] Scope
> Compare random-access, controlled-access and channelization MAC protocols, and compute ALOHA throughput, CSMA/CD minimum frame size and Ethernet frame efficiency.

## Core Concept

> [!tip] Intuition
> A shared medium is a room full of people. Random access is everyone talking whenever they like and coping with collisions; controlled access is a chairman calling on speakers; channelization is giving each pair a separate frequency or time slot so collisions cannot happen at all.

**Three families of medium access control.** *Random access* — no station is superior and none is scheduled; stations transmit when they choose and a procedure resolves collisions (ALOHA, CSMA, CSMA/CD, CSMA/CA). *Controlled access* — stations take turns by polling, reservation or token passing, so collisions are eliminated at the cost of overhead and a single point of failure (token ring, token bus, polling). *Channelization* — the bandwidth is divided in frequency, time or code, so multiple stations transmit simultaneously without interfering (FDMA, TDMA, CDMA). The engineering question is always which of collision overhead, scheduling overhead or wasted spectrum is cheapest for the traffic pattern at hand.

**ALOHA and its throughput ceiling.** In pure ALOHA a station transmits the moment it has data. A frame is destroyed if any other transmission begins within one frame time before or after it, so the vulnerable period is $2T_{fr}$. With Poisson arrivals of offered load $G$ frames per frame time, the throughput is $S = Ge^{-2G}$, which peaks at $S = 1/(2e) = 18.4\%$ when $G = 0.5$. *Slotted ALOHA* forces transmissions to begin only at slot boundaries, halving the vulnerable period to $T_{fr}$ and giving $S = Ge^{-G}$, which peaks at $S = 1/e = 36.8\%$ at $G = 1$. The cost is the need for slot synchronisation. These two numbers are the most examined results in the topic.

**CSMA, CSMA/CD and CSMA/CA.** *Carrier sense multiple access* has a station listen before transmitting, which reduces but does not eliminate collisions — two stations can still begin within the propagation delay of each other. *CSMA/CD* adds collision detection: the transmitter keeps listening, and on detecting a collision it aborts immediately, sends a jam signal and backs off. *CSMA/CA* avoids collisions instead of detecting them, because a radio cannot listen while it transmits; it uses a short reservation (RTS/CTS) and a positive acknowledgement. Ethernet uses CSMA/CD; Wi-Fi uses CSMA/CA and is covered separately.

**The minimum frame size for CSMA/CD.** Collision detection requires that a station still be transmitting when the collision's effects return to it. In the worst case the other station is at the far end of the collision domain, so the round-trip propagation time is $2\tau$. Therefore the transmission time must satisfy $T_{fr} \geq 2\tau$, i.e. the frame must be at least $R \cdot 2\tau$ bits long. For classic 10 Mbps Ethernet with a 2500 m maximum collision domain and a repeater-buffered round-trip of $51.2\ \mu\mathrm{s}$, this gives 512 bits = 64 bytes. That is the origin of Ethernet's 64-byte minimum frame; shorter frames are padded to reach it.

**Binary exponential backoff.** After the $n$-th collision a station picks a random slot from $0$ to $2^n - 1$ and waits that many slot times before trying again, with $n$ capped (commonly at 10) and the retry count capped at 16 before the frame is dropped. The window doubles with each collision, which dramatically reduces the chance of repeated collisions among many stations while keeping the delay low when few are contending. It is also why Ethernet's delay is not bounded — a property that makes it unsuitable for hard real-time traffic without additional mechanisms.

**Ethernet frame format and efficiency.** An Ethernet (DIX) frame is 7 bytes of preamble, 1 byte of start frame delimiter, 6 bytes of destination MAC, 6 of source MAC, 2 of type/length, 46 to 1500 bytes of payload, and 4 bytes of FCS. Layer-2 overhead excluding the preamble is 18 bytes, so on a full 1500-byte payload the efficiency is $1500/1518 = 98.8\%$; on a minimum 46-byte payload with padding it is only $46/64 = 71.9\%$. The 802.1Q VLAN tag inserts 4 more bytes and raises the maximum frame to 1522.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Pure ALOHA throughput | $S = G e^{-2G}$ | G is the offered load in frames per frame time. Maximum S = 1/(2e) = 18.4% at G = 0.5. |
| Slotted ALOHA throughput | $S = G e^{-G}$ | Maximum S = 1/e = 36.8% at G = 1. Exactly double pure ALOHA's ceiling. |
| ALOHA vulnerable period | $T_{vuln} = 2T_{fr}\ (\mathrm{pure}), \quad T_{fr}\ (\mathrm{slotted})$ | The halving of the vulnerable window is the entire gain from slotting. |
| CSMA/CD minimum frame size | $L_{min} = R \cdot 2\tau = 2 \times \mathrm{bandwidth\ delay\ product}$ | tau is the one-way propagation delay to the far end. 10 Mbps Ethernet gives 512 bits = 64 bytes. |
| Propagation delay over a cable | $\tau = \frac{d}{v}, \quad v \approx 2\times10^{8}\ \mathrm{m/s}$ | Typical velocity factor is about 0.7c for twisted pair and coax. |
| Binary exponential backoff | $\mathrm{wait} = r \times T_{slot}, \quad r \in [0,\ 2^n - 1]$ | n is the collision number, capped at 10. Slot time is 512 bit times on 10 Mbps Ethernet. |
| Slot time | $T_{slot} = 2\tau$ | Equal to the maximum round-trip propagation delay, so it is the worst case a station must keep transmitting for. |
| Ethernet frame layout | $7 + 1 + 6 + 6 + 2 + [46..1500] + 4\ \mathrm{bytes}$ | Maximum 1518 bytes and minimum 64 bytes, both excluding the preamble. VLAN tagging adds 4 bytes. |
| Ethernet layer-2 overhead | $H = 6 + 6 + 2 + 4 = 18\ \mathrm{bytes}$ | Excludes the 8-byte preamble/SFD, which is added on the wire but not counted in the frame. |
| Frame efficiency | $\eta = \frac{P}{P + 18}$ | P is the payload. 1500 bytes gives 98.8%; the 46-byte padded minimum gives 71.9%. |
| Maximum payload | $P_{max} = 1500\ \mathrm{bytes}, \quad P_{min} = 46\ \mathrm{bytes}$ | The minimum is set by the 64-byte frame floor, not by protocol design. |

## Worked Problems

### P1. A slotted ALOHA channel is offered a load of $G = 1$. Find the throughput as a fraction and, for a $10\ \mathrm{Mbps}$ channel, the goodput in Mbps.

**Given:** G = 1; channel rate = 10 Mbps; slotted ALOHA

**Solution:**

1. S = G e^(-G) = 1 x e^(-1)
2. = 0.3679 = 36.8%
3. Goodput = 0.3679 x 10 Mbps
4. = 3.68 Mbps

> [!success]- Answer
> **$S = 36.8\%$, goodput $= 3.68\ \mathrm{Mbps}$**

> [!warning] Trap
> Using the pure-ALOHA formula $Ge^{-2G}$ and answering $13.5\%$. Slotting halves the vulnerable period; using the wrong exponent understates the throughput by a factor of about 2.7.

### P2. A $10\ \mathrm{Mbps}$ CSMA/CD LAN has a maximum collision domain of $2500\ \mathrm{m}$ and a signal speed of $2\times10^{8}\ \mathrm{m/s}$. Find the minimum frame size in bits and bytes, ignoring repeater delays.

**Given:** R = 10 Mbps; d = 2500 m; v = 2e8 m/s

**Solution:**

1. tau = d/v = 2500/2e8 = 12.5 us
2. Round trip = 2 tau = 25 us
3. L_min = R x 2 tau = 1e7 x 25e-6
4. = 250 bits = 31.25 bytes

> [!success]- Answer
> **250 bits, i.e. about 31 bytes**

> [!warning] Trap
> Answering 64 bytes and stopping. The 64-byte standard figure comes from the *repeater-buffered* 51.2 us round trip of a five-segment 10Base5 network, not from raw cable delay. The raw calculation here gives half that, which is why the standard rounds up and adds repeater budget.

### P3. An Ethernet frame carries a 1500-byte payload. Find the frame size, the layer-2 efficiency, and the efficiency for a minimum-size padded frame.

**Given:** payload = 1500 bytes; Ethernet overhead = 18 bytes; minimum frame = 64 bytes

**Solution:**

1. Max frame = 1500 + 18 = 1518 bytes
2. Efficiency = 1500/1518 = 0.9881 = 98.8%
3. Minimum frame payload = 64 - 18 = 46 bytes
4. Efficiency = 46/64 = 0.7188 = 71.9%

> [!success]- Answer
> **$98.8\%$ at full payload; $71.9\%$ at the padded minimum**

> [!warning] Trap
> Including the 8-byte preamble and SFD in the 1518-byte maximum. The preamble is transmitted on the wire but is not part of the frame as counted by the MAC, so adding it overstates the overhead and gives 1494/1500.

### P4. A station on a 10 Mbps Ethernet has collided 6 times on the same frame. Find the maximum backoff window and the longest possible wait before the next attempt.

**Given:** collision number n = 6; slot time = 51.2 us

**Solution:**

1. Window size in slots = 2^n = 2^6 = 64 slots, so r ranges from 0 to 63
2. Maximum wait = 63 x 51.2 us
3. = 3225.6 us
4. = 3.23 ms

> [!success]- Answer
> **64-slot window; maximum wait $3.23\ \mathrm{ms}$**

> [!warning] Trap
> Using $2^n$ as the maximum slot index rather than $2^n - 1$, which overstates the wait by one slot. Also note the cap: beyond $n = 10$ the window stops doubling, so the answer does not keep growing.

## Traps & Exam Notes

- **Swapping the ALOHA constants.** Pure ALOHA peaks at $1/(2e) = 18.4\%$ with $S = Ge^{-2G}$; slotted peaks at $1/e = 36.8\%$ with $S = Ge^{-G}$. The slotted scheme is exactly twice as good because the vulnerable period is halved.
- **Quoting 64 bytes as the raw CSMA/CD calculation.** 64 bytes comes from 10 Mbps with the standard repeater-buffered 51.2 us round trip. A problem that gives actual distance and velocity expects you to compute $R \cdot 2d/v$ and then compare with the standard, not to recite 64.
- **Forgetting that the minimum frame exists to make collisions detectable.** Short frames are padded to 46 bytes of payload. A 10-byte payload is not transmitted as a 28-byte frame; the padding matters for efficiency calculations.
- **Counting the preamble as part of the frame.** The 7-byte preamble plus 1-byte SFD are physical-layer sync overhead; the MAC frame is 64 to 1518 bytes. Mixing the two shifts every efficiency answer.
- **Assuming CSMA/CD eliminates collisions.** Carrier sensing only removes collisions between stations that can hear each other. Two stations separated by more than the propagation delay can still start within the same slot, which is exactly why the minimum frame size and slot time exist.
- **Believing binary exponential backoff bounds the delay.** The window doubles but the retry count is capped, and after 16 failures the frame is discarded. Ethernet is therefore not a deterministic medium — a fact that matters as soon as anyone asks about real-time guarantees.

## See Also

- [[07_Wireless_LAN_and_CSMA_-_CA]]
- [[16_Multiple_Access_FDMA,_TDMA,_CDMA]]
- [[03_Framing_and_Flow_Control]]
- [[01_OSI_Seven-Layer_Model]]

---

[[05_HDLC_and_PPP|⬅ 05]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Wireless_LAN_and_CSMA_-_CA|07 ➡]]
