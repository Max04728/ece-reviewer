---
id: EST-04-02
title: "TCP/IP Protocol Suite"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 2
tier: 2
depth: full
problem_count: 4
prereqs: ["[[01_OSI_Seven-Layer_Model]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — TCP/IP Protocol Suite

> [!abstract] Scope
> Describe the four-layer TCP/IP stack, which protocols live at each layer, and how it differs from the seven-layer OSI reference model.

## Core Concept

> [!tip] Intuition
> OSI is the theory: seven clean layers that never quite matched an implementation. TCP/IP is the practice: four layers that everything actually runs on. The upper three OSI layers were never separable, so TCP/IP merged them.

**The four layers.** The TCP/IP suite is organised into Network Access (also called Network Interface or Link), Internet, Transport and Application. Network Access covers everything OSI calls physical and data link: Ethernet, Wi-Fi, PPP, ARP and the device drivers. Internet is a single connectionless, best-effort layer whose job is host-to-host delivery across independent networks — IP, ICMP, IGMP plus the routing protocols. Transport provides process-to-process delivery with ports, and offers a choice between reliable stream service (TCP) and unreliable datagram service (UDP). Application collects OSI's session, presentation and application layers into one, because in practice no protocol occupies layer 5 or 6 alone.

**The hourglass shape.** TCP/IP's most important structural property is that it is narrow in the middle. Dozens of application protocols and dozens of link technologies sit above and below a single Internet layer — IP. That narrowing is what makes the suite extensible: a new application (the web) or a new link (Wi-Fi, fibre, 5G) requires no change to the layer in the middle. It is also why IP is deliberately kept simple and stateless, with intelligence pushed to the endpoints — the *end-to-end principle*.

**Protocols at each layer.** *Application*: HTTP/HTTPS 80/443, DNS 53, SMTP 25, POP3 110, IMAP 143, FTP 20/21, Telnet 23, SSH 22, SNMP 161, DHCP 67/68, TFTP 69, NTP 123. *Transport*: TCP (connection-oriented, reliable, ordered, flow- and congestion-controlled, 20-byte minimum header) and UDP (connectionless, unreliable, 8-byte header). *Internet*: IPv4, IPv6, ICMP, IGMP, ARP/RARP (sometimes placed at the boundary), and routing protocols RIP, OSPF, BGP. *Network Access*: Ethernet (IEEE 802.3), Wi-Fi (802.11), PPP, HDLC, Frame Relay, ATM.

**OSI versus TCP/IP.** Three differences matter in an exam. (1) *Layer count and boundaries*: OSI separates session and presentation; TCP/IP merges them into Application. (2) *Where reliability lives*: OSI puts both connection-oriented and connectionless service in the transport layer and also allows reliability at layer 2; TCP/IP puts reliability only in TCP at layer 4 and treats IP and everything below as best-effort. (3) *Origin and status*: OSI is a prescriptive reference model produced by ISO with protocols designed to fit it; TCP/IP is a descriptive model reverse-engineered from protocols that already worked. That is why OSI is the better teaching vocabulary and TCP/IP is what actually runs.

**Encapsulation in TCP/IP terms.** Application data is handed to the transport layer, which adds a TCP or UDP header to form a segment or datagram. The Internet layer adds an IP header to form a packet (or *datagram* in IP terminology). The Network Access layer adds a link header, and for Ethernet also a trailer, to form a frame. Each layer treats everything above it as opaque payload; the receiver's stack strips headers in reverse and hands the payload up by port number.

**Numbers worth carrying into the exam.** Headers: UDP 8 bytes, TCP 20 bytes minimum, IPv4 20 bytes minimum, IPv6 fixed 40 bytes, Ethernet 14 bytes plus a 4-byte FCS. Protocol identifiers: TCP is IP protocol number 6, UDP is 17, ICMP is 1. TCP's maximum segment size over Ethernet with IPv4 is 1460 bytes; over IPv6 it drops to 1440 because the IPv6 header is 20 bytes larger. These constants are what turn a protocol-suite question into an arithmetic question.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| TCP/IP layer stack | $\mathrm{Network\ Access \to Internet \to Transport \to Application}$ | Four layers, bottom-up. Maps to OSI 1-2, 3, 4 and 5-7 respectively. |
| OSI to TCP/IP mapping | $\mathrm{OSI\ 1{-}2 \to N/A;\ 3 \to Internet;\ 4 \to Transport;\ 5{-}7 \to Application}$ | The upper-three merge is the single most examined difference between the models. |
| TCP header size | $H_{TCP} = 20\ \mathrm{bytes\ minimum}$ | Up to 60 bytes with options. The data offset field is in 4-byte words. |
| UDP header size | $H_{UDP} = 8\ \mathrm{bytes}$ | Four 16-bit fields: source port, destination port, length, checksum. Fixed, never larger. |
| IPv4 header size | $H_{IPv4} = 20\ \mathrm{bytes\ minimum}$ | Up to 60 bytes with options. IHL counts 4-byte words. |
| IPv6 header size | $H_{IPv6} = 40\ \mathrm{bytes\ fixed}$ | No options field; extension headers follow instead, which is why MSS drops by 20 bytes. |
| IP protocol numbers | $\mathrm{ICMP}=1,\quad \mathrm{TCP}=6,\quad \mathrm{UDP}=17$ | These identify the layer-4 protocol inside an IP packet. |
| MSS over Ethernet | $\mathrm{MSS}_{IPv4} = 1460\ \mathrm{bytes},\quad \mathrm{MSS}_{IPv6} = 1440\ \mathrm{bytes}$ | From a 1500-byte IP payload minus the transport header, minus the network header. |
| Header overhead, UDP over IPv4 | $H = 8 + 20 + 18 = 46\ \mathrm{bytes}$ | 42 bytes at layers 3-4, plus Ethernet's 14+4 at layer 2. |
| Header overhead, TCP over IPv4 | $H = 20 + 20 + 18 = 58\ \mathrm{bytes}$ | The standard figure for TCP/IP-over-Ethernet efficiency calculations. |

## Worked Problems

### P1. A DNS query is sent as a 40-byte UDP datagram over IPv4 and Ethernet. Find the total frame length and the protocol efficiency.

**Given:** UDP payload = 40 bytes; UDP header 8; IPv4 header 20; Ethernet header+FCS 18

**Solution:**

1. UDP datagram = 40 + 8 = 48 bytes
2. IP packet = 48 + 20 = 68 bytes
3. Frame = 68 + 18 = 86 bytes
4. Efficiency = 40/86 = 0.465 = 46.5%

> [!success]- Answer
> **86-byte frame, $46.5\%$ efficiency**

> [!warning] Trap
> Comparing against the 64-byte Ethernet minimum and concluding the frame is fine. This frame exceeds 64 bytes so no padding is added, but a 40-byte payload with a 8-byte UDP header alone would be padded to 46 bytes of payload — padding changes the arithmetic but is not counted in the IP length field.

### P2. Compare the header overhead of sending 1000 bytes of data with TCP versus UDP, both over IPv4 and Ethernet.

**Given:** payload = 1000 bytes; TCP 20 + IPv4 20 + Eth 18; UDP 8 + IPv4 20 + Eth 18

**Solution:**

1. TCP: total = 1000 + 20 + 20 + 18 = 1058 bytes; efficiency = 1000/1058 = 94.5%
2. UDP: total = 1000 + 8 + 20 + 18 = 1046 bytes; efficiency = 1000/1046 = 95.6%
3. Difference = 12 bytes; TCP overhead is 12/1046 = 1.15% more than UDP's

> [!success]- Answer
> **TCP 1058 bytes ($94.5\%$); UDP 1046 bytes ($95.6\%$)**

> [!warning] Trap
> Reporting a 12-byte difference as a large efficiency loss. The 12-byte TCP-versus-UDP difference is about $1.1\%$ for a 1000-byte payload — the reliability TCP buys is cheap at full payload size and expensive only for small ones.

### P3. How many bytes of transport-layer payload fit in a 1500-byte IPv6 packet carrying TCP? Compare with the IPv4 case.

**Given:** IP payload = 1500 bytes; TCP header = 20 bytes; IPv6 header = 40 bytes, IPv4 header = 20 bytes

**Solution:**

1. IPv4: MSS = 1500 - 20 (IPv4) - 20 (TCP) = 1460 bytes
2. IPv6: MSS = 1500 - 40 (IPv6) - 20 (TCP) = 1440 bytes
3. Difference = 20 bytes, exactly the IPv6 header increase

> [!success]- Answer
> **IPv4 MSS 1460 bytes; IPv6 MSS 1440 bytes**

> [!warning] Trap
> Assuming IPv6's larger address is free. The fixed 40-byte IPv6 header costs 20 bytes of payload per packet, which is why IPv6 hosts advertise an MSS of 1440 over Ethernet.

### P4. Place each item in the correct TCP/IP layer: ICMP, ARP, UDP, HTTP, Ethernet, OSPF, TCP, DNS.

**Given:** eight protocols/devices

**Solution:**

1. Network Access: Ethernet, ARP (resolves IP to MAC on the local link)
2. Internet: ICMP (control messages), OSPF (routing)
3. Transport: TCP, UDP
4. Application: HTTP, DNS

> [!success]- Answer
> **N/A: Ethernet, ARP; Internet: ICMP, OSPF; Transport: TCP, UDP; Application: HTTP, DNS**

> [!warning] Trap
> Placing ARP in the Internet layer because it deals with IP addresses. ARP resolves an IP address to a MAC address and operates strictly within one link, so it belongs to the Network Access layer; it is never routed.

## Traps & Exam Notes

- **Calling IP reliable.** IP is connectionless and best-effort: it can drop, duplicate or reorder packets and reports failures only through ICMP. All reliability in the suite lives in TCP at layer 4 — this is the single most important structural fact about TCP/IP.
- **Expecting a TCP/IP layer 5 or 6.** The suite has four layers. Questions that ask which TCP/IP layer handles encryption or session state expect *Application*, because those OSI functions were merged upward.
- **Placing ARP or ICMP in the wrong layer.** ARP works only within a single link (Network Access); ICMP is carried inside IP packets (Internet). Neither has a port number, which is the quickest way to tell they are not transport protocols.
- **Assuming the IPv6 header is only slightly larger.** It is exactly double IPv4's minimum at 40 bytes, and it is fixed — there is no options field, so the payload cost per packet is a constant 20 bytes.
- **Confusing the IP 'datagram' with the UDP 'datagram'.** Both are called datagrams in different textbooks: at layer 3 the PDU is a packet or IP datagram, at layer 4 UDP's PDU is a datagram and TCP's is a segment. Read the layer before answering.
- **Treating OSI and TCP/IP as interchangeable when comparing security or QoS.** OSI has explicit presentation and session layers that security frameworks use as reference points; TCP/IP has none. A question about where TLS belongs expects an OSI answer (presentation/session in theory, application in practice).

## See Also

- [[01_OSI_Seven-Layer_Model]]
- [[13_TCP_vs_UDP_and_Port_Numbers]]
- [[09_IPv4_Addressing_and_Classes]]
- [[11_IPv6_Structure]]

---

[[01_OSI_Seven-Layer_Model|⬅ 01]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Framing_and_Flow_Control|03 ➡]]
