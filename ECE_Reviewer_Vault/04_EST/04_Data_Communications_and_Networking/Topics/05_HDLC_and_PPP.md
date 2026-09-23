---
id: EST-04-05
title: "HDLC and PPP"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 5
tier: 3
depth: full
problem_count: 0
prereqs: ["[[03_Framing_and_Flow_Control]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — HDLC and PPP

> [!abstract] Scope
> Recall the HDLC frame structure, control-field frame types and bit-stuffing rule, and the PPP frame format, LCP/NCP negotiation and authentication options.

## Core Concept

> [!tip] Intuition
> HDLC is a bit-oriented, synchronous, balanced data-link protocol whose whole design is a single flag pattern and a control byte. PPP is the dial-up-era simplification that keeps HDLC's flag framing but drops sequence numbers and adds negotiation for whatever the link turns out to need.

**HDLC frame layout.** Every frame begins and ends with the 8-bit flag `01111110`. Between them sit an Address field (8 bits, extended to multiples of 8), a Control field (8 or 16 bits), a variable Information field, and a 16- or 32-bit Frame Check Sequence. Addresses are not host addresses: in unbalanced (normal response) mode the address always names the *secondary* station, and the values `11111111` (all stations) and `00000000` (no station) are reserved for testing. The minimum frame with no information field is 32 bits — two flags, address, control and FCS.

**The Control field defines what kind of frame it is.** An Information frame (I-frame) carries user data and includes send and receive sequence numbers, N(S) and N(R); it implements the sliding window. A Supervisory frame (S-frame) carries no data and only acknowledges, requests retransmission or asks the sender to pause via Receive Ready (RR), Receive Not Ready (RNR), Reject (REJ) or Selective Reject (SREJ). An Unnumbered frame (U-frame) carries link-management commands and responses such as Set Normal Response Mode (SNRM), Disconnect (DISC), Unnumbered Acknowledgement (UA) and Frame Reject (FRMR). Every third frame in an exam is identified by which of these three classes its control-field bit pattern belongs to.

**Bit stuffing.** HDLC is fully bit-transparent: any byte value can appear in the data field, because the flag pattern can never occur inside a frame. The transmitter inserts a 0 after every five consecutive 1s; the receiver, after five consecutive 1s, discards the next bit if it is 0, and treats six 1s as a flag. The overhead is data dependent and at most 20%.

**Balanced and unbalanced modes.** In Normal Response Mode (NRM) there is one primary and one or more secondaries; a secondary may transmit only when polled. In Asynchronous Balanced Mode (ABM) two combined stations are equal and either may initiate transmission; this is the mode used by PPP's predecessors on point-to-point links. Asynchronous Response Mode (ARM) lets a secondary transmit unsolicited. The address field's meaning flips with the mode, which is why the same frame format serves both.

**PPP is HDLC simplified.** PPP is a byte-oriented point-to-point protocol for links that carry a single destination. Its frame is flag `7E`, address `FF`, control `03`, a 2-byte protocol field, the payload (default maximum 1500 bytes), and a 2- or 4-byte FCS — structurally HDLC-like, but with the address and control fields fixed. It adds *byte stuffing* on asynchronous links (`7E` becomes `7D 5E`, and `7D` becomes `7D 5D`) and bit stuffing on synchronous ones, plus optional address/control-field compression.

**The three components of PPP.** *Encapsulation* — the frame format above, which can carry multiple network-layer protocols distinguished by the protocol field (`0021` for IPv4, `0057` for IPv6, `C021` for LCP, `8021` for IPCP). *Link Control Protocol (LCP)* — establishes, configures, tests and tears down the link: it negotiates maximum receive unit, authentication protocol, compression and multilink. *Network Control Protocols (NCPs)* — one per network layer, negotiated after LCP is up; IPCP assigns IP addresses. Authentication options are PAP (passwords sent in clear, two-way handshake) and CHAP (three-way challenge-response using a shared secret and a hash, replay-resistant).

**The key contrast: PPP has no sequence numbers or acknowledgements.** PPP provides error *detection* via the FCS and simply discards a bad frame; reliability is left to the higher layers, whose retransmission mechanisms are better suited to end-to-end recovery. This is why PPP is preferred on links that already carry TCP: ARQ at layer 2 would duplicate work TCP is already doing, and would add latency. PPP's design assumption is therefore the opposite of HDLC's, which was built for links where layer 2 had to be reliable.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| HDLC flag | $01111110$ | Both opening and closing flag. Cannot occur inside the frame thanks to bit stuffing. |
| HDLC minimum frame | $L_{min} = 8 + 8 + 8 + 16 = 40\ \mathrm{bits}$ | Flag + address + control + 16-bit FCS, with an empty information field. Only 32 bits if the closing flag is shared with the next frame's opening flag. |
| HDLC overhead (16-bit FCS) | $H = 8 + 8 + 8 + 16 + 8 = 48\ \mathrm{bits}$ | Flag, address, control, FCS, closing flag. Add 24 more bits for sequence numbers in extended control. |
| HDLC bit stuffing | $50\ \mathrm{bits\ of\ 1s} \to 51\ \mathrm{bits\ transmitted}$ | One 0 inserted after every five consecutive 1s. Worst-case overhead 20%. |
| Control field classes | $\mathrm{I:\ bit\ 1 = 0}; \quad \mathrm{S:\ bits\ 1{-}2 = 10}; \quad \mathrm{U:\ bits\ 1{-}2 = 11}$ | Reading the first two control bits identifies the frame class immediately. |
| PPP frame layout | $7E\ \lvert \ FF\ \rvert\ 03\ \lvert \ \mathrm{protocol(2)}\ \rvert\ \mathrm{payload\ \leq\ 1500}\ \lvert \ \mathrm{FCS(2\ or\ 4)}\ \rvert\ 7E$ | Address FF and control 03 are fixed and may be compressed away. |
| PPP byte stuffing | $7E \to 7D\ 5E, \quad 7D \to 7D\ 5D$ | Asynchronous links. Synchronous links use HDLC-style bit stuffing instead. |
| PPP protocol field values | $0021 = IPv4,\quad 0057 = IPv6,\quad C021 = LCP,\quad 8021 = IPCP$ | The protocol field is what lets one framing format carry many network layers. |
| PPP default MRU | $MRU = 1500\ \mathrm{bytes}$ | Maximum Receive Unit, negotiated by LCP. The default matches Ethernet's payload. |
| PPP authentication | $\mathrm{PAP:\ 2\ messages,\ cleartext}; \quad \mathrm{CHAP:\ 3\ messages,\ hashed\ challenge}$ | CHAP repeats the challenge periodically, which is what makes it replay-resistant. |
| HDLC/PPP FCS polynomial | $G(x) = x^{16}+x^{12}+x^5+1$ | CRC-CCITT. Catches all bursts up to 16 bits; a 32-bit FCS option exists for HDLC. |

## Traps & Exam Notes

- **Stuffing a 0 after five 1s even when a 0 follows.** The rule prevents six consecutive 1s; `111110` needs no insertion. Over-stuffing corrupts the frame because the receiver removes bits on a fixed rule.
- **Calling the HDLC address field a source or destination address.** In unbalanced mode it always identifies the *secondary* station, regardless of direction. The reserved values all-1s and all-0s are test addresses, not broadcast in the Ethernet sense.
- **Expecting PPP to retransmit lost frames.** PPP has no sequence numbers and no acknowledgements; it detects errors with the FCS and drops the frame. Reliability is delegated to TCP or the application.
- **Confusing LCP with NCP.** LCP configures the *link* (MRU, authentication, compression, multilink) and runs first. Each NCP configures a *network layer* on top and runs only after LCP is up — IPCP assigns an IP address, for example.
- **Assuming PAP is secure because it is a handshake.** PAP sends the password in cleartext and offers no protection against replay. CHAP's three-way hashed exchange with a shared secret is the secure option.
- **Identifying a frame type from its length or content.** The Control field's leading bits decide I, S or U. Guessing from the presence of a data field fails, because I-frames with an empty information field are legal.
- **Using the 32-bit minimum-frame figure and forgetting the FCS width varies.** HDLC allows a 16- or 32-bit FCS; the overhead differs by 16 bits, so a problem that says frame check sequence without a width is ambiguous by 2 bytes.

## See Also

- [[03_Framing_and_Flow_Control]]
- [[04_ARQ_Stop-and-Wait,_GBN,_Selective_Repeat]]
- [[08_Switching_Circuit_vs_Packet]]
- [[01_OSI_Seven-Layer_Model]]

---

[[04_ARQ_Stop-and-Wait,_GBN,_Selective_Repeat|⬅ 04]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[06_MAC_Protocols_and_Ethernet|06 ➡]]
