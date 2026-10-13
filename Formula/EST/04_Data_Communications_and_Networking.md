---
title: Data Communications and Networking
part: EST
tags: [ece, est, formula-sheet]
topics: 21
---

# Data Communications and Networking

## Part A — Layered Models, Framing and ARQ

### 1. OSI Seven-Layer Model

**Layer stack and PDUs ★**

| # | Layer | PDU | Function | Typical protocols |
|---|---|---|---|---|
| 7 | Application | Data | user services | HTTP, FTP, SMTP, DNS |
| 6 | Presentation | Data | syntax, encryption, compression | SSL/TLS, JPEG, ASCII |
| 5 | Session | Data | dialogue control, sync points | RPC, NetBIOS, SMB |
| 4 | Transport | Segment/Datagram | end-to-end reliability, flow | TCP, UDP |
| 3 | Network | Packet | logical addressing, routing | IP, ICMP, OSPF |
| 2 | Data link | Frame | framing, MAC, error control | Ethernet, PPP, HDLC |
| 1 | Physical | Bit | bit transmission, signaling | RS-232, 10Base-T |

**Symbols**

- OSI — Open Systems Interconnection seven-layer reference model (ISO/IEC 7498-1), dimensionless
- PDU — protocol data unit, the named data block handled at each layer (data, data, data, segment, packet, frame, bit), dimensionless

**Encapsulation overhead**

$$L_{frame}=H_{DL}+H_{NW}+H_{TR}+Payload+FCS,\qquad \eta_{eff}=\frac{Payload}{L_{frame}},\qquad MTU_{Eth}=1500\ \text{B}$$

**Symbols**

- $L_{frame}$ — total frame length (all headers plus payload plus trailer), in B
- $FCS$ — frame check sequence, the error-detection trailer appended to the frame, in B
- $MTU_{Eth}$ — Ethernet maximum transmission unit, the largest payload a frame may carry, in B
- $\eta_{eff}$ — payload efficiency, the ratio $Payload/L_{frame}$, dimensionless

$L_{frame}$ and $MTU$ in bytes (B), $\eta_{eff}$ dimensionless; the classic TCP/IP header stack is 14 (Ethernet) + 20 (IP) + 20 (TCP) = 54 B.

**Layer interaction rules**

$$t_{total}=\sum_{i=1}^{7}t_i\ \text{(s)},\qquad \text{each layer adds }H_i\ \text{bytes at layer }i,\qquad \text{peer layers communicate logically}$$

$t_i$ in s (per-layer delay), $H_i$ in B; layer $n$ on one host talks to layer $n$ on the other host, not to the layer above or below.

**Conditions:** seven-layer reference model (ISO/IEC 7498-1); the model is descriptive — real stacks (TCP/IP) collapse session and presentation into the application layer. #osi

> [!tip] High-yield ★
> Memorize the layer order both ways plus each layer's PDU: data, data, data, segment, packet, frame, bit. PDU naming is the single most common OSI exam item.

---

### 2. TCP/IP Protocol Suite

![](https://www.youtube.com/watch?v=wvPe4Zb0tUA)

*Video: The TCP/IP Protocol Suite — Neso Academy, 10:09*

**Four/five-layer stack ★**

| TCP/IP layer | Maps to OSI | PDU | Protocols |
|---|---|---|---|
| Application | 5, 6, 7 | Data | HTTP, DNS, SMTP, FTP, SNMP |
| Transport | 4 | Segment (TCP), datagram (UDP) | TCP, UDP, SCTP |
| Internet | 3 | Packet | IPv4, IPv6, ICMP, ARP, IGMP |
| Network access | 1, 2 | Frame / bit | Ethernet, PPP, Wi-Fi |

**Addressing across layers**

$$MAC_{48}\ \text{(layer 2)}:\ 6\ \text{B},\qquad IPv4_{32}:\ 4\ \text{B},\qquad IPv6_{128}:\ 16\ \text{B},\qquad Port_{16}:\ 2\ \text{B}$$

Socket pair is $(\text{IP}_{src},\text{port}_{src},\text{IP}_{dst},\text{port}_{dst})$; ports are dimensionless 16-bit numbers.

**Header sizes**

$$H_{IPv4}=20\ \text{B}\ (\text{to }60),\qquad H_{IPv6}=40\ \text{B (fixed)},\qquad H_{TCP}=20\ \text{B (to }60),\qquad H_{UDP}=8\ \text{B}$$

$H$ in bytes; IPv6 dropped the checksum and options from the base header, moving options into extension headers.

**Conditions:** TCP/IP is the practical Internet suite; ARP resolves IPv4 to MAC and is link-local, while ICMP carries error and control messages at the internet layer. #tcpip

---

### 3. Framing and Flow Control

![](https://www.youtube.com/watch?v=NhpzBldHOYo)

*Video: Framing (Part 1) — Neso Academy, 7:12*

**Framing methods ★**

$$\text{Byte count: } \text{frame}=[\text{count}][\text{data}],\qquad \text{Flag bytes: } 01111110\ \text{data}\ 01111110,\qquad \text{Bit stuffing: } 11111\Rightarrow111110$$

$$\text{Physical coding violation: } \text{V in Manchester/AMI as delimiter}$$

**Symbols**

- AMI — alternate mark inversion, a bipolar line code in which successive 1 bits alternate in polarity while 0 bits sit at zero level, dimensionless (line-code name)
- $V$ — a deliberate physical coding violation (a pulse that breaks the Manchester/AMI coding rule) used as a frame delimiter, dimensionless

Frame delimiters are dimensionless bit patterns; the byte count field is in bytes; stuffed bits are dimensionless.

**Stop-and-wait flow control**

$$T_{frame}=\frac{L}{R}\ \text{(s)},\qquad U=\frac{T_{frame}}{T_{frame}+2T_{prop}+T_{ack}},\qquad a=\frac{T_{prop}}{T_{frame}}$$

$L$ in bits, $R$ in bit/s, $T_{prop}$ in s (one-way propagation), $T_{ack}$ in s, $a$ dimensionless (normalized propagation), $U$ dimensionless (utilization).

**Sliding window flow control**

$$W\ge\frac{T_{frame}+2T_{prop}}{T_{frame}}=1+2a,\qquad U=\frac{W}{1+2a}\ \text{(capped at 1)},\qquad N_{seq}\ge W_{TX}+W_{RX}$$

$W$ in frames (window size, dimensionless), $N_{seq}$ dimensionless (sequence number space), $a$ dimensionless.

**Conditions:** sliding window with window size $W\ge1+2a$ saturates the link (utilization 1); byte-count framing is fragile because a corrupted count destroys synchronization. #framing

---

### 4. ARQ: Stop-and-Wait, GBN, Selective Repeat

![](https://www.youtube.com/watch?v=QD3oCelHJ20)

*Video: Go-Back-N ARQ — Neso Academy, 10:55*

**Efficiency and window sizes ★**

| ARQ | Send window $W_s$ | Receive window $W_r$ | Sequence bits for window $W$ |
|---|---|---|---|
| Stop-and-wait | 1 | 1 | $n\ge1$ ($2^1=2$ values) |
| Go-Back-N | $2^n-1$ | 1 | $n$ bits, $N_{seq}=2^n$ |
| Selective Repeat | $2^{n-1}$ | $2^{n-1}$ | $n$ bits, $N_{seq}=2^n$ |

**Symbols**

- ARQ — automatic repeat request, the retransmit-on-error protocol family, dimensionless (protocol name)
- GBN — Go-Back-N ARQ, which retransmits the lost frame plus every frame sent after it, dimensionless (protocol name)
- SR — Selective Repeat ARQ, which retransmits only the frame that was lost, dimensionless (protocol name)

$W_s,W_r$ dimensionless (frames), $n$ dimensionless (sequence-number bits), $N_{seq}$ dimensionless.

**Utilization formulas ★**

$$U_{SW}=\frac{1}{1+2a},\qquad U_{GBN}=\frac{W_s}{1+2a}\ (W_s<1+2a),\qquad U_{SR}=\frac{W_s}{1+2a}\ (W_s<1+2a)$$

$$U_{GBN}\ \text{retransmits}\ 1+\text{(lost sequence)}\ \text{frames},\qquad U_{SR}\ \text{retransmits only the lost frame}$$

$a$ dimensionless (propagation/slot ratio), $U$ dimensionless (link utilization), $W_s$ dimensionless.

**Throughput and optimal frame size**

$$S=\frac{W\cdot L}{T_{frame}+2T_{prop}}\ \text{(bit/s)},\qquad L_{opt}=\sqrt{\frac{2T_{prop}R\,H}{1-U}},\qquad U_{max}=1\ \text{when}\ W\ge1+2a$$

$S$ in bit/s, $L$ in bits, $R$ in bit/s, $H$ in bits (header), $T$ in s, $T_{prop}$ in s.

**Conditions:** error-free first pass for utilization formulas; GBN wastes bandwidth on retransmission bursts, so SR wins on noisy high-$a$ links but needs buffering and larger sequence space. #arq

> [!warning] Exam trap
> GBN send window is $2^n-1$ while Selective Repeat is $2^{n-1}$ for the same $n$ sequence bits — swapping these two is the classic ARQ window error.

---

### 5. HDLC and PPP

**HDLC frame and control field ★**

$$\text{Frame}=\text{Flag}_{8}\ \text{Address}_{8}\ \text{Control}_{8\ \text{or}\ 16}\ \text{Data}_{n}\ \text{FCS}_{16\ \text{or}\ 32}\ \text{Flag}_{8}$$

**Symbols**

- $FCS$ — frame check sequence, the 16- or 32-bit error-detection field, in bits
- ABM — Asynchronous Balanced Mode, the HDLC mode in which either combined station may initiate transmission, dimensionless (mode name)
- ARM — Asynchronous Response Mode, the HDLC mode in which the secondary transmits only with the primary's permission, dimensionless (mode name)

| Frame type | Control bits | Use |
|---|---|---|
| I-frame (information) | $0$, seq, piggyback N(R) | user data with ACK |
| S-frame (supervisory) | $10$, RR/RNR/REJ/SREJ | flow and error control |
| U-frame (unnumbered) | $11$ | link setup, disconnect |

**Window and sequence field**

$$N(S),N(R)\ \text{3 bits each (modulo-8) or 7 bits (modulo-128)},\qquad W\le2^{k}-1,\qquad k=3\Rightarrow W\le7$$

$N(S)$ in frames (send sequence), $N(R)$ in frames (next expected), $k$ dimensionless (sequence bits).

**PPP frame and negotiation**

$$PPP=\text{Flag}_{7E}\ \text{Address}_{FF}\ \text{Control}_{03}\ \text{Protocol}_{2}\ \text{Payload}_{1500}\ \text{FCS}_{2}\ \text{Flag}_{7E}$$

$$LCP:\ \text{link setup},\qquad NCP:\ \text{network layer config},\qquad PAP/CHAP:\ \text{authentication}$$

**Symbols**

- LCP — Link Control Protocol, which sets up, configures, tests and closes the PPP link, dimensionless (protocol name)
- NCP — Network Control Protocol, which configures the network-layer protocol carried over PPP, dimensionless (protocol name)
- PAP — Password Authentication Protocol, a PPP authentication that sends the password in clear text, dimensionless (protocol name)
- CHAP — Challenge Handshake Authentication Protocol, a challenge-response PPP authentication that never sends the secret, dimensionless (protocol name)

Field sizes in bytes (B); PPP payload MTU defaults to 1500 B, and byte stuffing (7E, 7D) replaces the bit stuffing used by HDLC.

**Conditions:** HDLC is bit-oriented and synchronous with balanced (ABM) or unbalanced (ARM) modes; PPP is byte-oriented and carries a protocol field to multiplex network layers. #hdlc

---

### 6. MAC Protocols and Ethernet

![](https://www.youtube.com/watch?v=iKn0GzF5-IU)

*Video: CSMA/CD and CSMA/CA Explained — PowerCert, 6:14*

**Ethernet frame and CSMA/CD ★**

$$\text{Frame}=\text{Preamble}_{7}\ \text{SFD}_{1}\ \text{DA}_{6}\ \text{SA}_{6}\ \text{Type/Len}_{2}\ \text{Data}_{46\text{–}1500}\ \text{FCS}_{4}\ \text{(bytes)}$$

$$T_{slot}=2\tau=512\ \text{bit times (10 Mbit/s)},\qquad L_{min}=2\tau R=64\ \text{B},\qquad \text{jam signal }=32\ \text{bits}$$

**Symbols**

- $SFD$ — start-of-frame delimiter, the 10101011 byte that ends the 7-byte preamble, in B
- $DA$ — destination MAC address, in B
- $SA$ — source MAC address, in B
- $FCS$ — frame check sequence, the 32-bit CRC trailer, in B
- CSMA/CD — carrier sense multiple access with collision detection, the half-duplex Ethernet access method, dimensionless (protocol name)

$T_{slot}$ in s (round-trip contention), $\tau$ in s (one-way propagation), $R$ in bit/s, $L_{min}$ in bytes; frames shorter than 64 B are runts and are discarded.

**Binary exponential backoff**

$$W=2^{\min(k,10)},\qquad k=\text{collision count},\qquad 0\le r<W,\qquad \text{give up after }16\ \text{attempts}$$

$W$ dimensionless (slot count), $r$ dimensionless (random slots to wait), $k$ dimensionless; $k$ is capped at 10 (and 16 retries) so $W_{max}=1024$.

**Efficiency and variants**

$$E_{eff}=\frac{1}{1+5a}\ \text{(CSMA/CD limit)},\qquad a=\frac{\tau}{T_{frame}},\qquad \text{Gbit Ethernet: } \tau\to0\Rightarrow E_{eff}\to1$$

**Symbols**

- $E_{eff}$ — CSMA/CD efficiency, the steady-state fraction of link capacity carried by successful frames, dimensionless
- $a$ — normalized propagation delay, $a=\tau/T_{frame}$, dimensionless

| Standard | Rate | Medium | Max segment |
|---|---|---|---|
| 10Base-T | 10 Mbit/s | UTP Cat 3 | 100 m |
| 100Base-TX | 100 Mbit/s | UTP Cat 5 | 100 m |
| 1000Base-T | 1 Gbit/s | UTP Cat 5e | 100 m |
| 1000Base-LX | 1 Gbit/s | fiber | 550 m–5 km |
| 10GBase-SR | 10 Gbit/s | multimode fiber | 300 m |

**Symbols**

- UTP — unshielded twisted pair copper cable, dimensionless (cable type)

**STP (IEEE 802.1D) loop prevention ★**

$$\text{root bridge}:\ \min(\text{bridge ID}),\qquad \text{bridge ID}=(\text{priority}_{16},\ MAC_{48}),\qquad \text{redundant port}\Rightarrow\text{blocking}$$

$$\text{one active path at a time},\qquad \text{BPDU hello}=2\ \text{s},\ \text{max age}=20\ \text{s},\qquad \text{failure}\Rightarrow\text{reconvergence}$$

**Symbols**

- STP — Spanning Tree Protocol (IEEE 802.1D), which blocks redundant ports so that only one active Layer-2 path exists, dimensionless (protocol name)
- BPDU — bridge protocol data unit, the 2 s hello message that carries bridge IDs and path costs, dimensionless (message name)

$P_{priority}$ dimensionless (2 B priority, lowest wins) and $MAC_{48}$ the 6 B address; blocked ports still receive BPDUs and take over when the active path fails.

**Conditions:** CSMA/CD applies to half-duplex shared media only; switched full-duplex links have no collisions, and Gigabit Ethernet can drop carrier extension/carrier sense padding; STP places every redundant port in a blocking state so only one active Layer-2 path exists and reconverges after a failure. #ethernet

---

### 7. Wireless LAN and CSMA/CA

![](https://www.youtube.com/watch?v=PcbTMSf0D2M)

*Video: CSMA/CA: The Wireless MAC Protocol — Sunny Classroom, 5:18*

**DCF access and interframe spaces ★**

$$DIFS=SIFS+2\sigma,\qquad \text{backoff}: W=2^{\min(k,10)},\qquad \text{contention window }CW_{min}=15,\ CW_{max}=1023$$

**Symbols**

- DCF — distributed coordination function, the mandatory contention-based 802.11 access method, dimensionless (protocol name)
- DIFS — DCF interframe space, the idle wait a station observes before contending, in s
- SIFS — short interframe space, the shortest wait, used for ACKs, CTS and fragment bursts, in s
- $CW_{min},CW_{max}$ — lower and upper bounds of the contention window, in slots (dimensionless)
- RTS — request to send, the optional control frame that reserves the medium, dimensionless (frame name)
- CTS — clear to send, the reply control frame that reserves the medium and mitigates the hidden-node problem, dimensionless (frame name)

$DIFS,SIFS$ in $\mu$s (or slots), $\sigma$ in s (slot time, 9 $\mu$s for 802.11g OFDM), $W$ dimensionless (slots), $k$ dimensionless (retries).

**Throughput and airtime**

$$S=\frac{L_{payload}}{T_{total}}\ \text{(bit/s)},\qquad T_{total}=T_{DIFS}+\text{backoff}+T_{data}+SIFS+T_{ack},\qquad a=\frac{T_{prop}}{T_{frame}}$$

$L_{payload}$ in bits, $T$ in s, $S$ in bit/s; 802.11a/g uses 9 $\mu$s slot, 16 $\mu$s SIFS and 34 $\mu$s DIFS.

**Standards summary**

| Standard | Band | Max rate | Modulation |
|---|---|---|---|
| 802.11b | 2.4 GHz | 11 Mbit/s | DSSS/CCK |
| 802.11a | 5 GHz | 54 Mbit/s | OFDM |
| 802.11g | 2.4 GHz | 54 Mbit/s | OFDM (CCK fallback) |
| 802.11n | 2.4/5 GHz | 600 Mbit/s | OFDM + MIMO |
| 802.11ac | 5 GHz | 6.9 Gbit/s | OFDM + MU-MIMO |
| 802.11ax (Wi-Fi 6) | 2.4/5/6 GHz | 9.6 Gbit/s | OFDMA + MU-MIMO |

**Conditions:** CSMA/CA avoids rather than detects collisions (a wireless station cannot hear collisions while transmitting); RTS/CTS optionally mitigates the hidden-node problem. #wlan

---

### 8. Switching: Circuit vs Packet

**Delay components ★**

$$T_{total}=T_{proc}+T_{queue}+T_{trans}+T_{prop},\qquad T_{trans}=\frac{L}{R},\qquad T_{prop}=\frac{d}{v}$$

$T_{proc}$ in s (processing), $T_{queue}$ in s (queueing), $T_{trans}$ in s, $T_{prop}$ in s, $L$ in bits, $R$ in bit/s, $d$ in m, $v$ in m/s ($2\times10^8$ m/s in copper/fiber).

**Circuit versus packet**

$$T_{circuit}=T_{setup}+\frac{M}{R}\ \text{(s)},\qquad T_{packet}=\sum_{i=1}^{h}\Bigl(\frac{L_i}{R_i}+T_{prop,i}\Bigr)\ \text{(s)},\qquad \text{message: } T=\frac{M}{R}\cdot h\ \text{(store-and-forward)}$$

$T_{setup}$ in s, $M$ in bits (message), $h$ dimensionless (hops), $L_i$ in bits, $R_i$ in bit/s.

| Aspect | Circuit switching | Packet switching | Message switching |
|---|---|---|---|
| Path | dedicated | per-packet | store-and-forward whole message |
| Setup delay | yes | none | none |
| Efficiency | low (idle capacity) | high | high |
| Delay guarantee | deterministic | statistical | long |
| Example | PSTN, ISDN | Internet, X.25 | telegraph |

**Conditions:** packet switching multiplexes statistically, so queueing delay grows with utilization; datagram service gives no ordering guarantee while virtual-circuit service does. #switching

---

## Part B — IP Addressing, Routing and Transport

### 9. IPv4 Addressing and Classes

![](https://www.youtube.com/watch?v=XQ3T14SIlV4)

*Video: IPv4 Addressing: Network IDs and Subnet Masks — NGT Academy, 20:32*

**Classful ranges and masks ★**

| Class | First byte | Default mask | Networks | Hosts/network |
|---|---|---|---|---|
| A | 1–126 | /8 (255.0.0.0) | 126 | $2^{24}-2$ |
| B | 128–191 | /16 (255.255.0.0) | 16 384 | $2^{16}-2$ |
| C | 192–223 | /24 (255.255.255.0) | $2^{21}$ | $2^8-2=254$ |
| D | 224–239 | — | multicast | — |
| E | 240–255 | — | experimental | — |

**Address arithmetic ★**

$$N_{hosts}=2^{h}-2,\qquad N_{subnets}=2^{s}\ (\text{with subnet zero}),\qquad \text{broadcast}=\text{all host bits }1,\qquad \text{network}=\text{all host bits }0$$

**Symbols**

- $N_{hosts}$ — usable host addresses per subnet (all-zeros network and all-ones broadcast excluded), dimensionless
- $N_{subnets}$ — subnets created by borrowing host bits, dimensionless
- $h$ — host bits left in the subnet mask, dimensionless (integer)
- $s$ — subnet bits borrowed from the host portion of the address, dimensionless (integer)

$h$ dimensionless (host bits), $s$ dimensionless (borrowed subnet bits); the two reserved addresses are the all-zeros network and all-ones broadcast.

**Private and special ranges**

$$10.0.0.0/8,\quad 172.16.0.0/12,\quad 192.168.0.0/16\ \text{(RFC 1918)};\qquad 127.0.0.0/8\ \text{(loopback)};\qquad 169.254.0.0/16\ \text{(APIPA)}$$

**Symbols**

- APIPA — Automatic Private IP Addressing, the link-local 169.254.0.0/16 self-configuration used when no DHCP server answers, dimensionless (protocol name)

**Conditions:** the first octet determines the class in classful addressing; classful routing is obsolete, but class boundaries still matter for default masks and for reading legacy exam items. #subnetting

---

### 10. Subnetting, CIDR and VLSM

![](https://www.youtube.com/watch?v=RLCd5u0sjoU)

*Video: VLSM Subnetting: Subnetting a Subnet — Sunny Classroom, 14:32*

**Subnet arithmetic ★**

$$/n=\underbrace{1\ldots1}_{n}\underbrace{0\ldots0}_{32-n},\qquad \text{block size}=2^{32-n},\qquad N_{subnets}=2^{n-n_{default}},\qquad N_{hosts}=2^{32-n}-2$$

$n$ dimensionless (prefix length), block size dimensionless (address count per subnet), $N$ dimensionless.

**CIDR aggregation and VLSM ★**

$$CIDR:\ \text{summarize }\ 2^{k}\ \text{contiguous prefixes into one }/(n-k),\qquad VLSM:\ \text{allocate largest requirement first}$$

$$\text{requirements sorted descending: } h_1\ge h_2\ge\cdots,\qquad n_i=32-\lceil\log_2(h_i+2)\rceil$$

$k$ dimensionless (aggregated prefixes), $h_i$ dimensionless (hosts needed), $n_i$ dimensionless (prefix length for block $i$), $\lceil\cdot\rceil$ is the ceiling.

**Worked mask conversions**

| Prefix | Mask | Block size | Usable hosts |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /30 | 255.255.255.252 | 4 | 2 (point-to-point) |

**Conditions:** VLSM subnets a subnet, so allocate from the largest block down to avoid fragmentation; CIDR requires contiguous, power-of-two-aligned blocks to summarize. #subnetting

> [!tip] High-yield ★
> Fastest board route: block size $=256-$mask octet. Subnets begin at multiples of the block size, and the broadcast is one below the next block start.

---

### 11. IPv6 Structure

**Header and address format ★**

$$IPv6=\underbrace{8\ \text{fields}\times16\ \text{bits}}_{\text{fixed }40\ \text{B}},\qquad \text{address}=8\ \text{groups}\times16\ \text{bits}=128\ \text{bits},\qquad N_{addr}=2^{128}$$

Field sizes in bits (B = bytes); the base header is fixed at 40 B and extension headers chain for options.

**Header fields**

| Field | Bits | Purpose |
|---|---|---|
| Version | 4 | 6 |
| Traffic class | 8 | DSCP/ECN |
| Flow label | 20 | per-flow handling |
| Payload length | 16 | bytes after base header |
| Next header | 8 | protocol or extension type |
| Hop limit | 8 | replaces TTL |
| Source/Destination | 128 each | addressing |

**Symbols**

- DSCP — differentiated services code point, the 6-bit traffic-class field that selects the per-hop forwarding treatment, dimensionless
- ECN — explicit congestion notification, the 2-bit field with which routers mark congestion instead of dropping, dimensionless
- TTL — time to live, the legacy IPv4 hop-count field that IPv6 replaces with the 8-bit hop limit, dimensionless

**Subnetting and transition**

$$/64\ \text{standard LAN prefix},\qquad 2^{64}\ \text{hosts per subnet},\qquad SLAAC:\ \text{prefix}_{64}+EUI\text{-}64\ \text{interface ID},\qquad \text{tunnel/dual-stack/NAT64 for transition}$$

**Symbols**

- SLAAC — stateless address autoconfiguration, which builds an address from the advertised /64 prefix plus an interface ID, dimensionless (protocol name)
- EUI-64 — extended unique identifier, the 64-bit interface ID formed from the 48-bit MAC by inserting FFFE, dimensionless

**Conditions:** IPv6 has no broadcast (multicast and anycast only), no header checksum, and no fragmentation by routers; $::$ may compress one run of zero groups. #subnetting

---

### 12. Routing Algorithms: Distance Vector and Link State

![](https://www.youtube.com/watch?v=nMqUkVi_j_4)

*Video: Distance-Vector vs Link-State Routing — Sunny Classroom, 6:56*

**Distance vector (Bellman-Ford) ★**

$$D_x(y)=\min_v\bigl\{c(x,v)+D_v(y)\bigr\},\qquad \text{update every }T\ \text{s},\qquad \text{count-to-infinity: } \infty=16\ \text{hops (RIP)}$$

$D_x(y)$ dimensionless (cost from $x$ to $y$), $c(x,v)$ dimensionless (link cost), $T$ in s (update timer, 30 s for RIP), hops dimensionless.

**Link state (Dijkstra) ★**

$$D(v)=\min\bigl(D(v),\ D(w)+c(w,v)\bigr)\ \text{for each neighbor }w\ \text{of the settled node},\qquad O(n^2)\ \text{or}\ O(E\log V)$$

**Symbols**

- $O(\cdot)$ — big-O asymptotic complexity, the growth rate of the algorithm's running time with network size, dimensionless
- LSA — link-state advertisement, the packet a router floods to describe its links and their costs, dimensionless (message name)
- SPF — shortest path first, the Dijkstra computation each router runs on its link-state database, dimensionless (algorithm name)

$D(v)$ dimensionless (shortest known cost), $c(w,v)$ dimensionless (link cost), $n$ dimensionless (nodes), $E$ dimensionless (edges), $V$ dimensionless (vertices).

| Feature | Distance vector | Link state |
|---|---|---|
| Knowledge | neighbors only | full topology |
| Algorithm | Bellman-Ford | Dijkstra |
| Convergence | slow (loops) | fast |
| Message size | small, frequent | large, on change |
| Protocols | RIP, IGRP | OSPF, IS-IS |
| Loop remedy | split horizon, poison reverse, hold-down | areas, SPF recalc |

**Conditions:** Bellman-Ford converges to the correct shortest paths but reacts slowly to bad news; link-state floods LSAs so every router builds an identical topology database. #routing

---

### 13. TCP vs UDP and Port Numbers

![](https://www.youtube.com/watch?v=cA9ZJdqzOoU)

*Video: TCP vs UDP Comparison — CertBros, 7:13*

**TCP header, window and timers ★**

$$H_{TCP}=20\ \text{B}\ \text{minimum},\qquad W_{max}=65\,535\ \text{B},\qquad \text{scaling}: W_{eff}=W\cdot2^{k},\ k\le14$$

$$RTO=SRTT+4\cdot RTTVAR,\qquad SRTT=(1-\alpha)SRTT+\alpha RTT,\qquad \alpha=\frac18,\ \beta=\frac14$$

$H$ in bytes, $W$ in bytes, $k$ dimensionless (window-scale shift), RTO/SRTT/RTTVAR in s, $\alpha,\beta$ dimensionless (Jacobson/Karels smoothing constants).

**TCP congestion control**

$$cwnd_{slow\ start}: 1\to2\to4\ldots\ \text{doubling per RTT},\qquad cwnd_{AIMD}: +1\ \text{MSS per RTT},\ \times\tfrac12\ \text{on loss}$$

$$Throughput\approx\frac{W_{max}\cdot MSS}{RTT}\ \text{(bit/s)},\qquad ssthresh=\frac{cwnd}{2}\ \text{on timeout}$$

**Symbols**

- AIMD — additive increase, multiplicative decrease, the congestion-window law that adds one MSS per RTT and halves the window on loss, dimensionless (algorithm name)

$cwnd$ in bytes or MSS units, $MSS$ in bytes, $RTT$ in s, $ssthresh$ in bytes.

**Well-known ports**

| Port | Protocol | Port | Protocol |
|---|---|---|---|
| 20/21 | FTP data/control | 110 | POP3 |
| 22 | SSH | 143 | IMAP |
| 23 | Telnet | 161/162 | SNMP |
| 25 | SMTP | 443 | HTTPS |
| 53 | DNS | 3306 | MySQL |
| 67/68 | DHCP server/client | 5060/5061 | SIP |
| 69 | TFTP | 8080 | HTTP alternate |
| 80 | HTTP | 0–1023 | well-known range |

**Conditions:** TCP is connection-oriented with sequencing, ACKs, retransmission and flow control; UDP is connectionless with an 8 B header and no reliability, used for DNS queries, DHCP, TFTP, RTP and streaming. #tcpip

---

## Part C — Multiplexing, Multiple Access and Cellular

### 14. Multiplexing: FDM, TDM, T1 and E1

![](https://www.youtube.com/watch?v=2q-1ETyk4zA)

*Video: Multiplexing: FDM, TDM, WDM and STDM Explained — SysAdmin Academy, 9:06*

**T1 and E1 hierarchies ★**

$$T1:\ 24\ \text{channels}\times8\ \text{bits}+1\ \text{framing bit}=193\ \text{bits/frame},\qquad R_{T1}=8000\times193=1.544\ \text{Mbit/s}$$

$$E1:\ 32\ \text{channels}\times8\ \text{bits}=256\ \text{bits/frame},\qquad R_{E1}=8000\times256=2.048\ \text{Mbit/s}$$

**Symbols**

- $R_{T1}$ — T1 line rate (1.544 Mbit/s), in bit/s
- $R_{E1}$ — E1 line rate (2.048 Mbit/s), in bit/s
- B8ZS — bipolar with 8-zero substitution, the T1 line code that replaces runs of eight zeros with a violation pattern so the clock is recovered, dimensionless (line-code name)
- HDB3 — high-density bipolar 3-zeros, the E1 line code that substitutes for runs of four zeros, dimensionless (line-code name)

Frame rate 8000 frames/s (125 $\mu$s per frame) in both; channel rate 64 kbit/s; $R$ in bit/s.

**DS and E carrier hierarchy**

| North America (DS) | Rate | Europe (E) | Rate |
|---|---|---|---|
| DS0 | 64 kbit/s | E0 | 64 kbit/s |
| DS1 (T1) | 1.544 Mbit/s | E1 | 2.048 Mbit/s |
| DS2 | 6.312 Mbit/s | E2 | 8.448 Mbit/s |
| DS3 (T3) | 44.736 Mbit/s | E3 | 34.368 Mbit/s |
| DS4 | 274.176 Mbit/s | E4 | 139.264 Mbit/s |

**FDM and statistical TDM**

$$FDM:\ BW_{total}=\sum_{i=1}^{n}BW_i+BW_{guard}(n-1),\qquad STDM:\ \text{slots assigned on demand},\qquad \eta=\frac{\text{useful}}{\text{total}}$$

**Symbols**

- FDM — frequency division multiplexing, which places each channel in its own frequency band, dimensionless (technique name)
- TDM — time division multiplexing, which gives each channel a periodic time slot, dimensionless (technique name)
- STDM — statistical TDM, which assigns slots on demand to active channels only, dimensionless (technique name)
- $BW_{guard}$ — guard band inserted between adjacent FDM channels, in Hz

$BW$ in Hz, $n$ dimensionless (channels), $\eta$ dimensionless (efficiency); FDM needs guard bands, TDM needs frame synchronization.

**Conditions:** T1 uses alternate mark inversion with B8ZS and a 193rd framing bit; E1 uses HDB3 with timeslot 0 for framing/sync and timeslot 16 for signaling (30 voice channels). #mux

---

### 15. WDM and DWDM

![](https://www.youtube.com/watch?v=94Vg3pzjHNU)

*Video: What Is WDM (Wavelength Division Multiplexing)? — Fosco Connect, 4:34*

**Wavelength channels and capacity ★**

$$N_{ch}=\frac{\Delta\lambda}{\Delta\lambda_{ch}},\qquad C=N_{ch}\cdot R_{ch}\ \text{(bit/s)},\qquad \nu=\frac{c}{\lambda},\qquad \Delta\nu=\frac{c\,\Delta\lambda}{\lambda^2}$$

**Symbols**

- $R_{ch}$ — bit rate carried by one wavelength channel, in bit/s

$N_{ch}$ dimensionless (channels), $\Delta\lambda$ in nm (bandwidth), $\Delta\lambda_{ch}$ in nm (channel spacing), $\nu$ in Hz, $\lambda$ in m, $c=3\times10^8$ m/s, $C$ in bit/s.

**Bands and spacing**

| Band | Wavelength | Typical use |
|---|---|---|
| O-band | 1260–1360 nm | original, zero dispersion |
| E-band | 1360–1460 nm | water-peak, limited |
| S-band | 1460–1530 nm | short-wavelength WDM |
| C-band | 1530–1565 nm | EDFA gain band, DWDM workhorse |
| L-band | 1565–1625 nm | extended DWDM |
| U-band | 1625–1675 nm | future/long |

**Symbols**

- EDFA — erbium-doped fiber amplifier, the C-band optical amplifier that makes DWDM links possible, dimensionless (device name)

**Capacity scales**

$$CWDM:\ 18\ \text{channels},\ 20\ \text{nm spacing};\qquad DWDM:\ 40/80/160\ \text{channels},\ 0.8\ \text{nm (100 GHz)};\qquad 25\ \text{GHz grid in modern systems}$$

**Symbols**

- WDM — wavelength division multiplexing, which carries several signals on one fiber in separate wavelength channels, dimensionless (technique name)
- DWDM — dense WDM, the 40/80/160-channel 0.8 nm (100 GHz) grid, dimensionless (technique name)
- CWDM — coarse WDM, up to 18 channels on a 20 nm spacing, dimensionless (technique name)

**Conditions:** DWDM needs temperature-stabilized lasers and EDFA amplification; channel spacing on the ITU grid is defined in frequency (100 GHz $\approx$ 0.8 nm at 1550 nm). #fiber

---

### 16. Multiple Access: FDMA, TDMA, CDMA

![](https://www.youtube.com/watch?v=oYRMYSIVj1o)

*Video: Multiple Access: FDMA, TDMA, CDMA and OFDMA — LTE, 6:08*

**Capacity and reuse ★**

$$C_{FDMA}=\frac{BW_{total}}{BW_{ch}}\ \text{channels},\qquad C_{TDMA}=\frac{\text{frames}}{\text{slot}}\ \text{per frame},\qquad C_{CDMA}\approx\frac{BW}{R}\cdot\frac{1}{E_b/N_0}\cdot G_p$$

**Symbols**

- FDMA — frequency division multiple access, which gives each user a dedicated sub-band, dimensionless (access-scheme name)
- TDMA — time division multiple access, which gives each user a repeating time slot, dimensionless (access-scheme name)
- CDMA — code division multiple access, which separates users by orthogonal spreading codes, dimensionless (access-scheme name)

$BW$ in Hz, $C$ dimensionless (channels), $R$ in bit/s, $G_p$ dimensionless (processing gain), $E_b/N_0$ dimensionless.

**CDMA spreading and capacity ★**

$$G_p=\frac{BW_{ss}}{R}=\frac{T_b}{T_c},\qquad N_{max}\approx\frac{G_p}{(E_b/N_0)_{req}}+1,\qquad s(t)=d(t)c(t)$$

**Symbols**

- PN — pseudonoise, the pseudorandom spreading code that each user multiplies onto the data, dimensionless (code name)

$G_p$ dimensionless (processing gain, chips per bit), $T_b$ in s (bit), $T_c$ in s (chip), $N_{max}$ dimensionless (simultaneous users), $d(t)$ dimensionless (data), $c(t)$ dimensionless (PN code).

| Access | Separates users by | Strengths | Weaknesses |
|---|---|---|---|
| FDMA | frequency | simple, no sync | guard bands, rigid |
| TDMA | time slots | higher capacity, digital | needs timing sync |
| CDMA | orthogonal codes | soft capacity, anti-jam | near-far problem, power control |
| OFDMA | subcarriers | high spectral efficiency, flexible | PAPR, synchronization |

**Symbols**

- PAPR — peak-to-average power ratio, the peak envelope power divided by the average power, dimensionless

**Conditions:** CDMA capacity is interference-limited, not hard-limited, so every added user raises the noise floor; strict power control is what keeps the near-far effect in check. #cdma #cellular

---

### 17. OFDMA and Spread Spectrum

![](https://www.youtube.com/watch?v=eKjGseCo1CY)

*Video: What Is a Spread Spectrum Signal and Why Is It Used? — Iain Explains, 11:21*

**OFDM orthogonality and subcarriers ★**

$$f_n=\frac{n}{T_s},\qquad \Delta f=\frac{1}{T_s},\qquad N_{sc}=\frac{BW}{\Delta f},\qquad T_s=T_{FFT}+T_{CP}$$

**Symbols**

- OFDM — orthogonal frequency division multiplexing, which splits the band into orthogonal subcarriers, dimensionless (technique name)
- OFDMA — orthogonal frequency division multiple access, which assigns groups of subcarriers to different users, dimensionless (technique name)

$f_n$ in Hz (subcarrier), $T_s$ in s (symbol time), $\Delta f$ in Hz (spacing), $N_{sc}$ dimensionless (subcarriers), $T_{FFT}$ in s, $T_{CP}$ in s (cyclic prefix).

**Spreading methods and processing gain ★**

$$DS\text{-}SS:\ s(t)=d(t)c(t),\qquad FH\text{-}SS:\ f_k\ \text{hops per }T_h,\qquad G_p=\frac{BW_{ss}}{R_b}=10\log_{10}G_p\ \text{dB}$$

$$Jamming\ margin\ M_j=G_p-\Bigl(\frac{S}{N}\Bigr)_{req}\ \text{dB},\qquad R_{chip}=\frac{1}{T_c}\ \text{(chip/s)}$$

**Symbols**

- DS-SS — direct-sequence spread spectrum, which multiplies the data by a fast pseudonoise code, dimensionless (technique name)
- FH-SS — frequency-hopping spread spectrum, which hops the carrier across $f_k$ channels with dwell time $T_h$, dimensionless (technique name)

$G_p$ dimensionless (or dB), $M_j$ in dB, $S/N$ dimensionless, $R_{chip}$ in chip/s, $T_h$ in s (hop dwell).

**OFDMA resource mapping**

$$Resource\ block:\ 12\ \text{subcarriers}\times7\ \text{OFDM symbols (LTE)},\qquad \Delta f_{LTE}=15\ \text{kHz},\qquad slot=0.5\ \text{ms}$$

**Conditions:** OFDM subcarriers stay orthogonal only with accurate frequency sync; a cyclic prefix longer than the channel delay spread removes ISI at the cost of spectral efficiency. #ofdma

---

### 18. Cellular Fundamentals, Reuse and Handoff

![](https://www.youtube.com/watch?v=ioj6F1v59yw)

*Video: Frequency Reuse, Cell Splitting and Handoff — EzEd Channel, 3:27*

**Frequency reuse and capacity ★**

$$N=i^2+ij+j^2,\qquad D=R\sqrt{3N},\qquad Q=\frac{D}{R}=\sqrt{3N},\qquad C=MkN=\frac{M}{N}\cdot k$$

$N$ dimensionless (cluster size), $i,j$ nonnegative integers, $D$ in m (reuse distance), $R$ in m (cell radius), $Q$ dimensionless (co-channel reuse ratio), $C$ dimensionless (total channels), $M$ dimensionless (total channels available), $k$ dimensionless (channels per cell).

**Co-channel interference and SIR ★**

$$\frac{S}{I}=\frac{(D/R)^n}{6}=\frac{(3N)^{n/2}}{6},\qquad n=2\ \text{(free space)},\ 4\ \text{(typical)},\qquad N\uparrow\Rightarrow SIR\uparrow,\ C\downarrow$$

$S/I$ dimensionless (signal-to-interference ratio), $n$ dimensionless (path-loss exponent), $N$ dimensionless (cluster size).

**Handoff and sectorization**

$$P_{handoff}=\Pr[\text{received level}<T_{handoff}],\qquad \text{sectorization: } 3\ \text{or}\ 6\ \text{sectors},\ 120^\circ/60^\circ;\qquad \text{trunking: Erlang B/C}$$

$T_{handoff}$ in dBm, $P$ dimensionless, sectors dimensionless; trunking efficiency improves as channels per trunk group grow.

| Pattern | $N$ | $Q=D/R$ | $SIR$ ($n=4$) |
|---|---|---|---|
| $i=1,j=1$ | 3 | 3.00 | $\approx11.3$ dB |
| $i=2,j=0$ | 4 | 3.46 | $\approx13.8$ dB |
| $i=2,j=1$ | 7 | 4.58 | $\approx18.7$ dB |
| $i=2,j=2$ | 12 | 6.00 | $\approx23.3$ dB |

**Conditions:** hexagonal cell model with omnidirectional base antennas and the six nearest co-channel interferers; $SIR$ rises as $N^{n/2}$, so larger clusters trade capacity for quality. #cellular

---

### 19. Cellular Generations 2G to 5G

**Generation comparison ★**

| Generation | Access | Peak rate | Bandwidth | Core features |
|---|---|---|---|---|
| 2G GSM | TDMA/FDMA | 9.6–14.4 kbit/s | 200 kHz | digital voice, SMS |
| 2.5G GPRS | TDMA + packet | 40–115 kbit/s | 200 kHz | always-on data |
| 2.75G EDGE | TDMA, 8-PSK | 236–473 kbit/s | 200 kHz | 3× GPRS spectral efficiency |
| 3G UMTS | WCDMA | 384 kbit/s–2 Mbit/s | 5 MHz | video, soft handoff |
| 3.5G HSPA+ | WCDMA + MIMO | 21–84 Mbit/s | 5 MHz | HSDPA/HSUPA |
| 4G LTE | OFDMA + SC-FDMA | 100–300 Mbit/s | 1.4–20 MHz | all-IP, MIMO, flat architecture |
| 4G LTE-A | OFDMA + CA | 1 Gbit/s (peak) | up to 100 MHz | carrier aggregation, 8×8 MIMO |
| 5G NR FR1 | OFDMA/CP-OFDM | 1–2 Gbit/s | 5–100 MHz | sub-6 GHz, massive MIMO |
| 5G NR FR2 | OFDMA | 4–20 Gbit/s | 100–400 MHz | mmWave, beamforming |

**Symbols**

- HSDPA — High-Speed Downlink Packet Access, the 3.5G downlink upgrade of UMTS/WCDMA, dimensionless (standard name)
- HSUPA — High-Speed Uplink Packet Access, the matching 3.5G uplink upgrade, dimensionless (standard name)

**Cellular capacity and spectral efficiency**

$$SE=\frac{R_{peak}}{BW}\ \text{(bit/s/Hz)},\qquad C_{area}=C_{cell}\cdot N_{cells},\qquad \text{MIMO: } C\approx M\log_2(1+\rho)\ \text{(bit/s/Hz)}$$

$SE$ in bit/s/Hz, $R_{peak}$ in bit/s, $BW$ in Hz, $M$ dimensionless (spatial streams), $\rho$ dimensionless (SNR).

**Latency targets**

$$4G:\ \approx20\text{–}30\ \text{ms},\qquad 5G\ \text{URLLC}:\ 1\ \text{ms},\qquad 5G\ \text{eMBB}\ \text{peak}\ 20\ \text{Gbit/s},\qquad \text{connection density }10^6/\text{km}^2$$

**Symbols**

- URLLC — ultra-reliable low-latency communication, the 5G service class with a 1 ms latency target, dimensionless (service-class name)
- eMBB — enhanced mobile broadband, the 5G service class for very high peak rates, dimensionless (service-class name)
- mMTC — massive machine-type communication, the 5G service class for very high connection density, dimensionless (service-class name)

**Conditions:** 2G/3G are circuit-switched at the voice level with packet overlays, while 4G/5G are all-IP; 5G splits into eMBB, URLLC and mMTC service classes sharing the same NR air interface. #cellular

> [!warning] Exam trap
> Frequency reuse factor is $1/N$ (channels per cell), not $N$. Cluster size $N$ larger means a larger reuse distance and lower co-channel interference, but fewer channels per cell.

> [!tip] High-yield ★
> $Q=\sqrt{3N}$ and $N=i^2+ij+j^2$ are the two cells-planning formulas to memorize; combining them gives $SIR=(3N)^{n/2}/6$ for six interferers directly.

---

## Part D — Topologies and Security

### 20. Network Topologies

**Topology comparison ★**

| Topology | Layout | Failure mode | Single point of failure |
|---|---|---|---|
| Bus | one shared backbone with taps | a break kills the whole segment | backbone cable and terminators |
| Star | every node to a central hub or switch | one link drops one node | central device |
| Ring | closed point-to-point loop | a break splits the ring (dual ring survives) | any node or link on the ring |
| Full mesh | every node to every other node | link loss reroutes instantly | none |
| Tree | hierarchical cascade of stars or buses | branch loss isolates its subtree | root or backbone |
| Hybrid | star plus mesh or ring layers | depends on the failing layer | varies by design |

**Link count and connectivity ★**

$$L_{full}=\frac{N(N-1)}{2},\qquad L_{partial}\ge N-1\ \text{for connectivity},\qquad d_i=\text{links terminating at node }i$$

$$\text{cost}\propto L,\qquad \text{redundancy}\uparrow\Rightarrow\text{cost}\uparrow,\ \text{availability}\uparrow$$

$N$ dimensionless (nodes), $L$ dimensionless (links), $d_i$ dimensionless (degree of node $i$); a spanning tree of $N-1$ links keeps every node reachable.

**Conditions:** counted for point-to-point duplex links with no shared-medium or repeater limits; a full mesh buys the highest availability at $O(N^2)$ link cost, while bus, star and tree are cheapest but concentrate risk in one component. #topology

---

### 21. Network Security

**Symmetric versus asymmetric cryptography ★**

| Property | Symmetric | Asymmetric |
|---|---|---|
| Keys | one shared secret | public/private key pair |
| Speed | fast | slow modular arithmetic |
| Key distribution | needs a secure channel | public key is open |
| Typical use | bulk data encryption | key exchange, signatures |
| Examples | AES, DES, 3DES | RSA, ECC, Diffie-Hellman |

**Symbols**

- AES — Advanced Encryption Standard, the symmetric block cipher with 128-bit blocks and 128/192/256-bit keys, dimensionless (algorithm name)
- DES — Data Encryption Standard, the legacy symmetric block cipher with a 56-bit key, dimensionless (algorithm name)
- 3DES — triple DES, three DES passes giving 112 or 168 effective key bits, dimensionless (algorithm name)
- ECC — elliptic-curve cryptography, asymmetric cryptography over elliptic curves using much shorter keys, dimensionless (algorithm name)

**RSA and modular exponentiation ★**

$$c=m^{e}\bmod n,\qquad m=c^{d}\bmod n,\qquad n=pq,\qquad ed\equiv1\bmod\phi(n),\qquad \phi(n)=(p-1)(q-1)$$

$m,c$ dimensionless (message and ciphertext blocks), $n$ dimensionless (modulus, 1024–4096 bits), $e,d$ dimensionless (public/private exponents), $p,q$ secret primes.

The security of RSA rests on the difficulty of factoring the large modulus $n=pq$.

**Diffie-Hellman key exchange ★**

$$A=g^{a}\bmod p,\qquad B=g^{b}\bmod p,\qquad K=B^{a}\bmod p=A^{b}\bmod p=g^{ab}\bmod p$$

$$\text{each side derives }K=g^{ab}\ \text{without transmitting it},\qquad a,b\ \text{stay private}$$

$g$ dimensionless (generator), $p$ dimensionless (large prime), $a,b$ dimensionless (private exponents), $K$ dimensionless (shared session key).

**Hash functions, signatures and MACs ★**

$$h=H(M)\ \text{(fixed length)},\qquad s=\text{sign}_{K_{priv}}\bigl(H(M)\bigr),\qquad \text{verify with }K_{pub}$$

$$MAC=H(K\parallel M)\ \text{(shared key)},\qquad H(M')\ne H(M)\Rightarrow\text{integrity failure}$$

**Symbols**

- MAC — message authentication code, a keyed tag that proves both integrity and origin, dimensionless (tag name)

$H$ dimensionless (hash, e.g. SHA-256), $h$ dimensionless (digest), $M$ the message, $s$ the signature, $MAC$ the tag; the private key signs, the public key verifies.

**Password keyspace ★**

$$Keyspace=S^{L},\qquad \log_{10}Keyspace=L\log_{10}S,\qquad T_{brute}\approx\frac{S^{L}}{R}\ \text{(s)}$$

| Length $L$ | Lowercase $S=26$ | Letters and digits $S=62$ |
|---|---|---|
| 4 | $4.6\times10^{5}$ | $1.5\times10^{7}$ |
| 6 | $3.1\times10^{8}$ | $5.7\times10^{10}$ |
| 8 | $2.1\times10^{11}$ | $2.2\times10^{14}$ |
| 10 | $1.4\times10^{14}$ | $8.4\times10^{17}$ |

$S$ dimensionless (alphabet size), $L$ dimensionless (password length), $R$ in guesses/s; each added character multiplies the keyspace by $S$.

**Conditions:** symmetric and asymmetric primitives are complementary (asymmetric exchanges the key, symmetric encrypts the payload); RSA and Diffie-Hellman rest on the hardness of factoring and of the discrete logarithm, and the keyspace counts assume uniformly random fixed-length passwords with no rate limiting. #security

---

→ Back to [[00_Index]]
