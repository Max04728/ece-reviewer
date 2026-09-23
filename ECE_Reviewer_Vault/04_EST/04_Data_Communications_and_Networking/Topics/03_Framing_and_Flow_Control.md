---
id: EST-04-03
title: "Framing and Flow Control"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 3
tier: 2
depth: full
problem_count: 4
prereqs: ["[[01_OSI_Seven-Layer_Model]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Framing and Flow Control

> [!abstract] Scope
> Delimit frames on a bit stream by bit stuffing or byte stuffing, and size a sliding window from the sequence-number field.

## Core Concept

> [!tip] Intuition
> A stream of bits has no natural boundaries, so the sender inserts an unmistakable pattern to mark the start and end of each frame — and then must guarantee that pattern never appears inside the data by breaking up any accidental copy of it.

**Why framing is needed.** The physical layer delivers an undifferentiated stream of bits. Before anything else can happen the receiver must know where each frame begins and ends, and which bits belong to this frame rather than the next. Four classical techniques exist: character count, flag bytes with byte stuffing, starting and ending flags with bit stuffing, and physical-layer coding violations. Only the middle two are used in practice, and every one of them has a failure mode that shows up in exams.

**Character count.** The first field of the frame states how many characters follow. The receiver reads the count and knows exactly how far to go. It works until a single bit error hits the count field: the receiver then misjudges the frame boundary and every subsequent frame is misparsed — a desynchronisation with no way to resynchronise. This fragility is why character counting is never used alone.

**Flag bytes with byte stuffing.** A frame is bracketed by a reserved flag byte, conventionally `7E`. Any occurrence of `7E` *inside* the payload must be made harmless. The sender inserts an escape byte `7D` before it and XORs the byte with `20` hex: `7E` becomes `7D 5E` and a literal `7D` becomes `7D 5D`. The receiver reverses the substitution. This is the mechanism PPP uses over asynchronous links. The cost is that the frame length depends on the data content, and a pathologically escape-rich payload can nearly double.

**Bit stuffing with flags.** HDLC-style framing brackets the frame with the flag pattern `01111110` and guarantees that pattern can never occur inside the data by *bit stuffing*: whenever the transmitter has sent five consecutive 1s, it inserts a 0 regardless of the next data bit. The receiver counts 1s and, after five consecutive 1s, discards the next bit if it is 0. If it is not 0, the pattern must be a flag, because the only way to see six consecutive 1s is as `01111110`. HDLC is bit-oriented and fully transparent to any byte pattern, at the cost of a data-dependent overhead of at most one bit per five.

**Flow control, and why windows exist.** Flow control prevents a fast sender from swamping a slow receiver. *Stop-and-wait* lets the sender transmit one frame and then block until an acknowledgement arrives; it is trivially correct but wastes the link whenever the propagation delay exceeds the transmission time. *Sliding window* lets the sender have up to $W$ unacknowledged frames outstanding, so acknowledgements can arrive while later frames are still in flight. The window size is bounded by the sequence-number space, because the receiver must be able to tell an old duplicate from a new frame.

**Sizing the window from the sequence field.** With a $k$-bit sequence number there are $2^k$ distinct values. Go-Back-N needs the window to be at most $2^k - 1$: the receiver's window is always 1 frame wide, so if the sender's window were $2^k$ the acknowledgement ambiguity would let an old frame masquerade as a new one. Selective Repeat allows at most $2^{k-1}$, because both the send and receive windows can slide independently and together must cover no more than the sequence space. This factor-of-two difference is a standard exam question, and mixing up which protocol gets which bound is the standard wrong answer.

**Piggybacking.** In a bidirectional link, acknowledgements need not be separate frames: the data field of a frame travelling in the reverse direction can carry the acknowledgement for frames received. This is what TCP does with the ACK flag, and what HDLC does with the poll/final bit and the N(R) field. It halves the number of frames on a symmetric link — at the cost of adding delay, because an acknowledgement must wait for a reverse-direction frame to be going that way.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| HDLC/PPP flag pattern | $01111110$ | Cannot appear inside the payload by construction. Conventionally written 7E in hex. |
| Bit-stuffing rule | $\mathrm{insert\ a\ 0\ after\ every\ five\ consecutive\ 1s}$ | Unconditional — the inserted bit goes in even if the next data bit is 0. Worst-case overhead is one bit per five, i.e. 20%. |
| Byte-stuffing escape | $7E \to 7D\ 5E, \quad 7D \to 7D\ 5D$ | The escaped byte is the original XOR 0x20. Used by PPP on asynchronous links. |
| Character-count framing | $L_{frame} = 1 + C\ \mathrm{characters}$ | C is the count field value. A single error in the count destroys all subsequent framing. |
| Stop-and-wait window | $W = 1$ | Exactly one frame outstanding. Utilisation is 1/(1+2a). |
| Go-Back-N maximum window | $W_{GBN} = 2^k - 1$ | k is the number of bits in the sequence-number field. One value is always excluded. |
| Selective Repeat maximum window | $W_{SR} = 2^{k-1}$ | Half the sequence space, because send and receive windows slide independently. |
| Sequence space | $N_{seq} = 2^k$ | The total number of distinct sequence numbers available. |
| Bit-stuffing overhead | $\eta_{stuff} \leq \frac{1}{5} = 20\%$ | Worst case is an all-1s payload. Average depends on content and is far lower for real data. |
| Byte-stuffing overhead | $\eta_{stuff} = \frac{N_{esc}}{N_{frame}}$ | Data dependent. A payload full of 7E and 7D bytes can double the frame. |

## Worked Problems

### P1. The HDLC data field contains the 18 bits `111110111111011111`. Find the transmitted bit stream after bit stuffing and count the inserted bits.

**Given:** data = 111110111111011111 (18 bits); HDLC bit stuffing after five consecutive 1s

**Solution:**

1. Scan positions 1-5: five 1s; the next bit (position 6) is 0, so no insertion
2. Emit 1 1 1 1 1 0
3. Pass position 7: the run starts again. Positions 7-11 are five 1s; position 12 is 1, so insert a 0 after position 11
4. Emit 1 1 1 1 1 0 1, then continue with position 13 which is 0
5. Positions 14-18 are five 1s and the data ends, so no insertion
6. Transmitted payload = 111110 111110 10 11111 = 1111101111101011111

> [!success]- Answer
> **One 0 inserted; 19 bits transmitted**

> [!warning] Trap
> Inserting a 0 after *every* group of five 1s, including the final one and the one already followed by a 0. The rule fires only when a sixth 1 would otherwise follow, so the run `111110` needs no stuffing.

### P2. A PPP frame carries the payload bytes `7E 7D 41`. Show the byte-stuffed output and count the overhead.

**Given:** payload = 7E 7D 41; escape byte = 7D; escape rule = XOR 0x20

**Solution:**

1. Byte 7E is the flag pattern, so it must be escaped: 7E XOR 20 = 5E, giving 7D 5E
2. Byte 7D is the escape byte itself, so it must be escaped: 7D XOR 20 = 5D, giving 7D 5D
3. Byte 41 is neither 7E nor 7D, so it passes through unchanged
4. Output = 7D 5E 7D 5D 41, which is 5 bytes for 3 bytes of payload

> [!success]- Answer
> **`7D 5E 7D 5D 41`; overhead is 2 bytes on 3**

> [!warning] Trap
> Escaping only the flag byte and leaving a literal `7D` in the payload unescaped. The receiver would then interpret the following payload byte as an escape sequence and corrupt the frame — the escape byte must itself be escaped.

### P3. A sliding-window protocol uses a 3-bit sequence-number field. Find the maximum window for Go-Back-N and for Selective Repeat, and explain the difference.

**Given:** k = 3 bits

**Solution:**

1. Sequence space = 2^3 = 8 values
2. Go-Back-N: W = 2^k - 1 = 8 - 1 = 7
3. Selective Repeat: W = 2^(k-1) = 2^2 = 4
4. GBN needs one value excluded because its receive window is always 1, so ambiguity sets in at 8; SR must split the space between two sliding windows, halving it

> [!success]- Answer
> **GBN $W = 7$; SR $W = 4$**

> [!warning] Trap
> Using $W = 2^k = 8$ for either protocol. A window equal to the whole sequence space is ambiguous — an acknowledgement can shift the window by a full cycle so that a retransmitted old frame looks like a new one.

### P4. A frame of 1000 bytes is sent over a link that adds a 2-byte flag at each end and escapes 30 bytes for byte stuffing. Find the transmitted length and the framing efficiency.

**Given:** payload = 1000 bytes; flags = 2 bytes each end; escape bytes = 30

**Solution:**

1. Transmitted = 1000 + 30 + 2 + 2 = 1034 bytes
2. Framing efficiency = 1000/1034 = 0.9671
3. = 96.7%

> [!success]- Answer
> **1034 bytes; $96.7\%$ framing efficiency**

> [!warning] Trap
> Counting only the opening flag. Frames are delimited at *both* ends, so two flags are transmitted; counting one loses a byte per frame and, more importantly, usually means the closing delimiter was not accounted for at all.

## Traps & Exam Notes

- **Stuffing a 0 after five 1s even when a 0 already follows.** The rule exists to prevent six consecutive 1s, so `111110` needs no stuffing. Over-stuffing adds bits the receiver will strip incorrectly.
- **Forgetting to escape the escape byte.** A literal `7D` in the payload must become `7D 5D`; otherwise the receiver treats the following byte as a control sequence and the frame is silently corrupted.
- **Mixing up the two window limits.** Go-Back-N is $2^k - 1$, Selective Repeat is $2^{k-1}$. GBN loses one slot, SR loses half the space, and swapping them is the classic error in this topic.
- **Assuming bit stuffing has a fixed overhead of 20%.** 20% is the *worst case* for an all-1s payload. Real data with roughly random bits averages about 1 bit per 62, which is well under 2%.
- **Believing character-count framing is robust.** A single flipped bit in the count field desynchronises the receiver permanently, with no self-recovery. That is why every practical protocol uses flags with stuffing instead.
- **Confusing flow control with congestion control.** Flow control protects the *receiver* from being overrun and is a local, per-link mechanism. Congestion control protects the *network* and is end-to-end. A sliding window implements the former; TCP's slow start and AIMD implement the latter.

## See Also

- [[04_ARQ_Stop-and-Wait,_GBN,_Selective_Repeat]]
- [[05_HDLC_and_PPP]]
- [[06_MAC_Protocols_and_Ethernet]]
- [[01_OSI_Seven-Layer_Model]]

---

[[02_TCP_-_IP_Protocol_Suite|⬅ 02]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[04_ARQ_Stop-and-Wait,_GBN,_Selective_Repeat|04 ➡]]
