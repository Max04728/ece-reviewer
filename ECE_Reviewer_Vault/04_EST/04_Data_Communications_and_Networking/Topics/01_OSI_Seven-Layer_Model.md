---
id: EST-04-01
title: "OSI Seven-Layer Model"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 1
tier: 1
depth: full
problem_count: 9
prereqs: []
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — OSI Seven-Layer Model

> [!abstract] Scope
> Place every networking function, protocol, address and device in one of the seven OSI layers, and trace how a message is encapsulated on the way down and decapsulated on the way up.

## Core Concept

> [!tip] Intuition
> The OSI model is a stack of envelopes. Each layer writes its own header on the outside and hands the result down; the receiving stack opens the envelopes in reverse. Peers at the same layer talk logically to each other even though the bits physically travel only at layer 1.

**Why layers at all.** Networking is too complicated to design as a single object, so it is decomposed into seven layers, each with a well-defined *service* to the layer above and a well-defined *interface* to the layer below. The decisive benefit is replaceability: Ethernet can be swapped for Wi-Fi at layer 2 without touching IP at layer 3, and IP can be swapped for IPv6 without touching TCP. Each layer adds exactly the information the layer above does not want to manage — frames do not know about routes, and routers do not know about ports.

**The seven layers, top to bottom.** *7 Application* — user services, the interface a program actually calls (HTTP, SMTP, FTP, DNS). *6 Presentation* — syntax: character encoding, compression, encryption (JPEG, ASCII, TLS encryption happens here in the OSI description). *5 Session* — dialogue control, checkpointing and recovery of long exchanges (RPC, NetBIOS). *4 Transport* — end-to-end delivery between processes: segmentation, reassembly, port addressing, and optionally reliability and flow control (TCP, UDP). *3 Network* — host-to-host delivery across networks: logical addressing and routing (IP, ICMP, routing protocols). *2 Data Link* — node-to-node delivery on one link: framing, physical (MAC) addressing, error detection, medium access control; split into LLC and MAC sublayers in IEEE terms. *1 Physical* — bits on the medium: voltage levels, connectors, pinouts, data rate, encoding and synchronisation.

**Encapsulation.** As data moves down the stack each layer prepends its own header — and layer 2 also appends a trailer. The application data becomes a *segment* (or datagram) at layer 4, a *packet* at layer 3, a *frame* at layer 2, and finally a stream of *bits* at layer 1. At the receiver the process runs in reverse: each layer strips and interprets its own header and passes the payload up. Crucially, no layer reads another layer's header — a router forwards a packet without ever examining the TCP header inside it.

**Devices live at the layer they can read.** A *repeater* and a *hub* regenerate signals and are pure layer-1 devices; they cannot read an address. A *bridge* and a *layer-2 switch* read MAC addresses and forward frames, so they are layer-2 devices. A *router* reads IP addresses and makes forwarding decisions, so it is layer 3. A *layer-3 switch* does routing in hardware. A *gateway* terminates a protocol stack completely and translates between different protocol families, which means it operates at layer 7 — the only device that does.

**Addresses are layered too.** The three addresses in a single frame belong to three different layers and answer three different questions. The *port number* (layer 4) identifies which process on the host. The *IP address* (layer 3) identifies which host on which network, and changes only when the packet crosses into a different subnet. The *MAC address* (layer 2) identifies which network interface on the local link, and is rewritten by every router hop. A packet therefore has one source and destination IP address end to end, while the MAC addresses change at every hop.

**How OSI maps to TCP/IP.** The practical stack has four layers: Network Access (OSI 1–2), Internet (OSI 3), Transport (OSI 4) and Application (OSI 5–7). OSI's upper three layers were never clearly separable in real implementations — no protocol maps cleanly to layer 5 alone — so TCP/IP collapses them. In a classroom question, *which OSI layer does HTTP belong to* expects *Application* (layer 7), while *which layer does TCP belong to* expects *Transport* (layer 4).

**End-to-end versus hop-by-hop.** Layers 1–3 are *hop-by-hop*: each intermediate device terminates them, and their headers can change from hop to hop. Layers 4–7 are *end-to-end*: intermediate routers do not inspect them, so a TCP header written by the source arrives unchanged at the destination. The single exception is a middlebox such as a NAT router or a firewall, which deliberately breaks the rule — that is exactly why NAT and deep packet inspection cause so much trouble.

## Derivation

**Encapsulation arithmetic for an Ethernet LAN.** Start with $P$ bytes of application payload. Layer 4 adds a TCP header of 20 bytes (minimum) $\Rightarrow P+20$. Layer 3 adds a 20-byte IPv4 header $\Rightarrow P+40$. Layer 2 adds a 14-byte Ethernet header (6 destination MAC + 6 source MAC + 2 type/length) and appends a 4-byte FCS trailer $\Rightarrow P+58$. Layer 1 adds an 8-byte preamble/SFD that is not part of the frame $\Rightarrow$ the transmitted octet count on the wire is $P+66$. The *frame*, as counted by layer 2, is $P+58$ including the FCS.

**Working out the maximum application payload.** Ethernet's maximum frame is 1518 bytes excluding the preamble. Removing the 14-byte header and 4-byte FCS leaves 1500 bytes for the IP packet. Removing the 20-byte IPv4 header leaves 1480 bytes. Removing the 20-byte TCP header leaves the *maximum segment size* of 1460 bytes of application data. This chain — 1518, 1500, 1480, 1460 — is worth memorising because board questions jump in at any point.

**Overhead fraction.** For a payload of $P$ bytes the overhead fraction is $\dfrac{58}{P+58}$, and the efficiency is $\dfrac{P}{P+58}$. For a full-size segment, $P = 1460$: efficiency $= 1460/1518 = 0.9618$, i.e. $96.2\%$ efficiency and $3.8\%$ overhead. For a 100-byte payload the same 58 bytes give $100/158 = 63.3\%$ efficiency — a reminder that small packets are dominated by headers.

**Segment count for a large transfer.** A file of $F$ bytes sent with MSS 1460 requires $N = \lceil F/1460 \rceil$ segments. Each segment costs 40 bytes of TCP+IP header at layer 3/4, so the total host-to-host bytes are $F + 40N$. For $F = 1\,460\,000$: $N = 1000$ segments, header bytes $= 40\,000$, and the TCP/IP overhead is $40\,000/1\,460\,000 = 2.74\%$.

**Why layer 2 overhead is not usually counted in a throughput problem.** TCP goodput is measured at layer 4 and above: it excludes the Ethernet header and preamble. Capacity calculations that use the 1518-byte frame size implicitly include them. Mixing the two conventions — comparing a TCP goodput against an Ethernet line rate — produces an apparent shortfall that is really just a measurement-boundary artefact, typically $\approx 3.8\%$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Layer count and function | $\mathrm{Physical(1) \to Data\ Link(2) \to Network(3) \to Transport(4) \to Session(5) \to Presentation(6) \to Application(7)}$ | Mnemonics: Please Do Not Throw Sausage Pizza Away (bottom-up) or All People Seem To Need Data Processing (top-down). |
| PDU names by layer | $\mathrm{bits(1),\ frame(2),\ packet(3),\ segment/datagram(4),\ data(5-7)}$ | TCP's layer-4 PDU is a segment; UDP's is a datagram. Both are packets at layer 3 and frames at layer 2. |
| Ethernet frame size | $L_{frame} = 14 + P_{IP} + 4, \quad 64 \leq L_{frame} \leq 1518\ \mathrm{bytes}$ | Excludes the 8-byte preamble/SFD. The 64-byte minimum comes from CSMA/CD slot timing. |
| IP packet from frame | $P_{IP} = L_{frame} - 18$ | 18 = 14-byte header + 4-byte FCS. Maximum 1500 bytes. |
| Maximum segment size | $\mathrm{MSS} = 1500 - 20 - 20 = 1460\ \mathrm{bytes}$ | IPv4 and TCP minimum headers. IPv6's 40-byte header drops it to 1440. |
| TCP/IP overhead per segment | $H = 20 + 20 + 18 = 58\ \mathrm{bytes}$ | Header plus trailer for a minimum-header IPv4/TCP-over-Ethernet segment. |
| Protocol efficiency | $\eta = \frac{P}{P + 58}$ | P is the application payload. 1460 bytes gives 96.2%; 100 bytes gives 63.3%. |
| Segments for a transfer | $N = \left\lceil \frac{F}{\mathrm{MSS}} \right\rceil$ | Ceiling matters: a partial final segment still occupies a frame. |
| Total header bytes | $B_{hdr} = 40N + 18N = 58N$ | 40 bytes counted at layers 3-4, 18 at layer 2. Report which boundary the question means. |
| Address to layer | $\mathrm{port} \to 4, \quad \mathrm{IP} \to 3, \quad \mathrm{MAC} \to 2$ | A port names a process, an IP address names a host, a MAC address names an interface on the local link. |

## Interactive Widget

**OSI Encapsulation Animator**

![[OSI_Encapsulation_Animator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Assign each function to its OSI layer: (a) encryption, (b) routing between networks, (c) framing and MAC addressing, (d) process-to-process delivery, (e) bit encoding onto the medium, (f) dialogue checkpointing.

**Given:** six functions; seven-layer model

**Solution:**

1. Encryption is a data-representation function -> Presentation, layer 6
2. Routing is logical addressing across networks -> Network, layer 3
3. Framing and MAC addressing are link-local delivery -> Data Link, layer 2
4. Process-to-process delivery is port multiplexing -> Transport, layer 4
5. Bit encoding and signalling -> Physical, layer 1
6. Dialogue control and checkpoints -> Session, layer 5

> [!success]- Answer
> **(a) 6, (b) 3, (c) 2, (d) 4, (e) 1, (f) 5**

> [!warning] Trap
> Placing encryption in the Transport layer because TLS sits above TCP in practice. In the OSI reference model, presentation (6) owns syntax transformation; the real-world layering is explicitly a collapse of 5–7 into one application layer.

### P2. Name the protocol data unit at each of layers 1, 2, 3 and 4 for a TCP connection carrying a web page.

**Given:** TCP over IPv4 over Ethernet

**Solution:**

1. Layer 4 (TCP) units are segments
2. Layer 3 (IPv4) units are packets
3. Layer 2 (Ethernet) units are frames
4. Layer 1 units are bits

> [!success]- Answer
> **bits, frames, packets, segments**

> [!warning] Trap
> Calling the layer-3 unit a frame, or the layer-2 unit a packet. The names are fixed by convention and examiners mark them strictly.

### P3. A hub, a layer-2 switch, a router and an application gateway each forward traffic. State the highest OSI layer whose header each device examines.

**Given:** hub; layer-2 switch; router; application gateway

**Solution:**

1. A hub repeats electrical signals with no header inspection -> layer 1
2. A layer-2 switch reads the destination MAC address -> layer 2
3. A router reads the destination IP address -> layer 3
4. A gateway terminates the full stack and translates protocols -> layer 7

> [!success]- Answer
> **1, 2, 3, 7 respectively**

> [!warning] Trap
> Answering layer 4 for a router because TCP port numbers appear in firewall rules. A pure router never reads the transport header; port-based filtering is a middlebox function above layer 3.

### P4. Find the maximum application payload (MSS) that fits in a standard Ethernet frame carrying IPv4 and TCP with minimum headers.

**Given:** max Ethernet frame = 1518 bytes; Ethernet header 14 + FCS 4; IPv4 header 20; TCP header 20

**Solution:**

1. IP packet = 1518 - 14 - 4 = 1500 bytes
2. Transport payload = 1500 - 20 (IPv4) = 1480 bytes
3. Application payload = 1480 - 20 (TCP) = 1460 bytes

> [!success]- Answer
> **$\mathrm{MSS} = 1460$ bytes**

> [!warning] Trap
> Forgetting the 4-byte FCS trailer and answering 1464. The frame's 1518 bytes include the trailer, so the IP payload available is exactly 1500.

### P5. A 1000-byte application payload is sent over Ethernet using IPv4 and TCP. Find the frame size and the protocol efficiency.

**Given:** payload = 1000 bytes; TCP 20 + IPv4 20 + Ethernet 18

**Solution:**

1. Total frame = 1000 + 20 + 20 + 18 = 1058 bytes
2. Efficiency = 1000/1058 = 0.9452
3. = 94.5%

> [!success]- Answer
> **1058-byte frame, $94.5\%$ efficiency**

> [!warning] Trap
> Dividing by 1000 + 40 and ignoring the 18 bytes of Ethernet header and FCS, which gives 96.2%. The efficiency depends on where the measurement boundary is drawn.

### P6. How many TCP segments are needed to transfer $1\,460\,000$ bytes with an MSS of 1460 bytes, and what fraction of the host-to-host traffic is header?

**Given:** F = 1 460 000 bytes; MSS = 1460 bytes; TCP + IPv4 = 40 bytes per segment

**Solution:**

1. N = 1 460 000/1460 = 1000 segments exactly
2. Header bytes = 1000 x 40 = 40 000
3. Fraction = 40 000/1 460 000 = 0.02740
4. = 2.74% of the layer-3/4 traffic

> [!success]- Answer
> **1000 segments; $2.74\%$ overhead at layers 3–4**

> [!warning] Trap
> Using 40 bytes for TCP alone, or adding the Ethernet 18 bytes and then comparing against layer-4 goodput. State whether the header count is layers 3–4 (40 bytes) or layers 2–4 (58 bytes) — the two overheads are $2.74\%$ and $3.8\%$ respectively.

### P7. Which of the seven layers are hop-by-hop and which are end-to-end? Explain using a packet traversing three routers.

**Given:** source host; 3 intermediate routers; destination host

**Solution:**

1. Layers 1-3 are terminated by each router and rebuilt for the next hop
2. The source and destination MAC addresses change at every hop
3. Layers 4-7 are not examined by routers, so the TCP header passes through unchanged
4. The source and destination IP addresses are preserved end to end

> [!success]- Answer
> **Layers 1–3 hop-by-hop; layers 4–7 end-to-end**

> [!warning] Trap
> Claiming the IP address changes at each hop. Only the MAC address pair changes per hop; the IP addresses identify the endpoints and stay constant (barring NAT, which is precisely a middlebox violating this rule).

### P8. Map OSI layers to the four-layer TCP/IP model and name one protocol at each TCP/IP layer.

**Given:** OSI 1-7; TCP/IP 4 layers

**Solution:**

1. OSI 1-2 (Physical + Data Link) -> Network Access layer; example Ethernet
2. OSI 3 (Network) -> Internet layer; example IP
3. OSI 4 (Transport) -> Transport layer; example TCP
4. OSI 5-7 (Session + Presentation + Application) -> Application layer; example HTTP

> [!success]- Answer
> **Network Access / Internet / Transport / Application**

> [!warning] Trap
> Looking for a TCP/IP protocol that maps to OSI layer 5 alone. None exists cleanly — the session and presentation layers are not separately implemented, which is why the practical stack collapses them.

### P9. A frame arrives at a layer-2 switch with destination MAC address equal to the switch's own port-1 interface. What does the switch do, and what would a router do differently with the same frame?

**Given:** frame delivered to the switch itself; destination MAC = switch interface

**Solution:**

1. The switch recognises its own MAC and accepts the frame for local processing
2. It strips the Ethernet header and passes the payload up to layer 3
3. A router receiving a frame addressed to itself does the same, then reads the IP header
4. The router consults its routing table and builds a NEW frame with new MAC addresses for the next hop

> [!success]- Answer
> **The switch consumes the frame; the router consumes it and re-encapsulates for the next hop**

> [!warning] Trap
> Assuming a switch forwards a frame addressed to itself. A frame addressed to the device's own MAC is delivered locally, not forwarded — conflating this with forwarding behaviour is a standard layer-2 question.

## Traps & Exam Notes

- **Putting TCP in the same layer as IP.** TCP is transport (layer 4); IP is network (layer 3). Their headers are adjacent in a packet but they live in different layers, and a router forwards on the IP header without ever reading TCP.
- **Claiming the IP address changes at every hop.** Only MAC addresses change hop by hop. The IP addresses stay with the endpoints — which is the entire point of layer 3 addressing, and the reason NAT is a violation rather than a normal operation.
- **Forgetting the OSI upper-layer collapse.** Asking which OSI layer a real protocol belongs to above layer 4 gives ambiguous answers because layers 5 and 6 are not separately implemented in TCP/IP. Answer the OSI question with the OSI answer (HTTP = 7) and note the collapse.
- **Mixing measurement boundaries in an efficiency calculation.** Layer-4 goodput excludes the Ethernet header and FCS; line-rate calculations include them. The same stream is $96.2\%$ or $94.5\%$ efficient depending on where the boundary is drawn.
- **Assuming every encapsulation layer adds a trailer.** Only layer 2 (Ethernet) appends one — the 4-byte FCS. Layers 3 and 4 add headers only, so an overhead count of 58 bytes is 54 bytes of header plus 4 bytes of trailer.
- **Treating the minimum 64-byte Ethernet frame as the maximum.** Ethernet's floor is 64 bytes (for CSMA/CD collision detection) and its ceiling is 1518 bytes. A 46-byte minimum payload is padded, and that padding is invisible to IP, which is why IP length and frame length can disagree.
- **Confusing a layer-3 switch with a router.** A layer-3 switch performs the same routing function in hardware. The distinction is implementation and port density, not layer — both read IP headers.

## See Also

- [[02_TCP_-_IP_Protocol_Suite]]
- [[03_Framing_and_Flow_Control]]
- [[06_MAC_Protocols_and_Ethernet]]
- [[09_IPv4_Addressing_and_Classes]]

---

⬅ *start* · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[02_TCP_-_IP_Protocol_Suite|02 ➡]]
