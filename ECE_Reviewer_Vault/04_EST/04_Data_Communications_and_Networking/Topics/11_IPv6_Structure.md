---
id: EST-04-11
title: "IPv6 Structure"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 11
tier: 3
depth: full
problem_count: 0
prereqs: ["[[09_IPv4_Addressing_and_Classes]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — IPv6 Structure

> [!abstract] Scope
> Recall the IPv6 address format, the fixed 40-byte header, the abbreviated notation rules, and the address types and transition mechanisms that replace IPv4's conventions.

## Core Concept

> [!tip] Intuition
> IPv6 is not a bigger IPv4 — it is a simpler one. The address grew to 128 bits, but the header lost its checksum, its options field and its fragmentation duties, so routers do less work per packet even though each address is four times longer.

**The address.** An IPv6 address is 128 bits, written as eight groups of four hexadecimal digits separated by colons, for example `2001:0db8:0000:0000:0000:ff00:0042:8329`. The address space is $2^{128} \approx 3.4\times10^{38}$ — about $7.9\times10^{28}$ times IPv4's $2^{32}$. The conventional split is a 64-bit network prefix and a 64-bit interface identifier, with `/48` site prefixes and `/64` subnet prefixes being the normal allocation units. A `/64` provides $2^{64}$ addresses per subnet, which is why IPv6 has no need for NAT.

**Abbreviation rules.** Two rules apply, and only two. (1) Leading zeros within any 16-bit group are dropped: `0db8` may be written `db8`, and `0000` becomes `0`. (2) One — and only one — run of consecutive all-zero groups may be replaced by a double colon `::`. Each rule may be applied independently to as many groups as you like, except that `::` may appear only once, because otherwise the length of the collapsed run would be ambiguous. `2001:0db8:0000:0000:0000:ff00:0042:8329` becomes `2001:db8::ff00:42:8329`.

**The header.** The IPv6 header is a fixed 40 bytes with eight fields: Version, Traffic Class (8 bits, like IPv4's ToS/DSCP), Flow Label (20 bits, new — for identifying a flow without inspecting the transport header), Payload Length (16 bits), Next Header (8 bits, replacing IPv4's Protocol field and also chaining extension headers), Hop Limit (8 bits, IPv4's TTL renamed because it counts hops and never seconds), Source Address (128 bits) and Destination Address (128 bits). It cannot grow: options moved into *extension headers* that only the destination reads, which is what keeps router processing cheap.

**What IPv6 removed and why.** No header checksum — link layers and transport layers already check, and recomputing a checksum at every hop was the single most expensive per-packet operation in IPv4 routers. No options field in the fixed header — replaced by extension headers that intermediate routers can skip. No broadcast — replaced by multicast to the all-nodes group `ff02::1` and by anycast, where one address is assigned to several interfaces and a packet goes to the nearest. No router fragmentation — a router that receives an oversized packet drops it and returns an ICMPv6 Packet Too Big message, and the source must fragment; the minimum MTU every link must support is 1280 bytes, and path MTU discovery is mandatory rather than optional.

**Address types and key ranges.** *Unicast*: global unicast `2000::/3`, link-local `fe80::/10` (auto-configured on every interface and required for neighbour discovery), unique local `fc00::/7` (the private-address analogue), and the loopback `::1`. *Multicast*: `ff00::/8`, with well-known groups such as all-nodes `ff02::1`, all-routers `ff02::2` and solicited-node multicast used by neighbour discovery. *Anycast*: syntactically a unicast address assigned to multiple interfaces. There is no reserved network address or directed broadcast, and no subnet mask — the prefix length serves that role.

**Transition mechanisms.** Three approaches exist and exams ask which is which. *Dual stack* runs IPv4 and IPv6 simultaneously on the same interface and is the preferred long-term answer. *Tunneling* carries IPv6 packets inside IPv4 (or the reverse) across a region that only speaks the other protocol — 6to4, Teredo and ISATAP are examples. *Translation* rewrites headers between protocols, of which NAT64 with DNS64 is the practical form. Stateless and stateful autoconfiguration (SLAAC via router advertisements, or DHCPv6) replace IPv4's DHCP-plus-NAT combination and are why an IPv6 host can number itself without a server.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Address size | $128\ \mathrm{bits} = 8 \times 16\ \mathrm{bits} = 32\ \mathrm{hex\ digits}$ | Written as eight colon-separated groups of four hex digits. |
| Address space | $N = 2^{128} \approx 3.4\times10^{38}$ | Roughly 7.9e28 times IPv4's 2^32. Often quoted as enough for 100 addresses per atom on Earth. |
| Standard prefix split | $/64 = 64\ \mathrm{bits\ network} + 64\ \mathrm{bits\ interface\ ID}$ | A /64 holds 2^64 addresses. Sites normally receive a /48, giving 65 536 /64 subnets. |
| IPv6 header size | $H_{IPv6} = 40\ \mathrm{bytes\ fixed}$ | Exactly double IPv4's 20-byte minimum, but with no options it never grows beyond 40. |
| Zero compression | $0000:0000:0000 \to ::$ | One run only, once per address. Two uses of :: make the address ambiguous. |
| Leading-zero suppression | $0db8 \to db8, \quad 0042 \to 42, \quad 0000 \to 0$ | Trailing zeros within a group are NOT dropped: 0db0 must stay 0db0. |
| Minimum MTU | $\mathrm{MTU}_{min} = 1280\ \mathrm{bytes}$ | Every link must support it. Routers never fragment; they return ICMPv6 Packet Too Big. |
| Recommended MTU | $\mathrm{MTU} = 1500\ \mathrm{bytes}$ | Matches Ethernet, giving an MSS of 1440 bytes for TCP over IPv6. |
| Loopback and unspecified | $::1\ (\mathrm{loopback}), \quad ::\ (\mathrm{unspecified})$ | There is no 127.0.0.0/8 equivalent and no 0.0.0.0. |
| Link-local prefix | $fe80::/10$ | Auto-configured on every IPv6 interface; required for neighbour discovery. Never routed. |
| Unique local prefix | $fc00::/7$ | The private-address analogue (RFC 4193). Not globally routable. |
| Multicast prefixes | $ff00::/8; \quad ff02::1\ (\mathrm{all\ nodes}), \quad ff02::2\ (\mathrm{all\ routers})$ | IPv6 has no broadcast; the all-nodes group replaces the directed broadcast. |
| Anycast | $\mathrm{one\ address,\ many\ interfaces,\ nearest\ wins}$ | Syntactically identical to unicast; the routing system delivers to the closest instance. |

## Traps & Exam Notes

- **Using `::` twice in one address.** Only one zero-run may be collapsed, because the receiver cannot tell how many zero groups each `::` represents. `2001::db8::1` is invalid.
- **Dropping trailing zeros inside a group.** The rule removes *leading* zeros only: `0db0` stays `0db0`, and writing `db` changes the value by a factor of 16.
- **Assuming the IPv6 header is 60 bytes because the address is 4x longer.** The header is a fixed 40 bytes — 20 bytes larger than IPv4's minimum, not 4x. The address field grew by 24 bytes per address pair and 20 bytes were saved by removing the checksum, options and fragment fields.
- **Looking for a broadcast address.** IPv6 has none. The directed broadcast's role is taken by multicast to `ff02::1` (all nodes on the link), and the limited broadcast's by the same group. Code that computes an IPv4-style broadcast address for an IPv6 subnet is simply wrong.
- **Expecting routers to fragment.** In IPv4 a router could fragment an oversized packet; in IPv6 it must drop it and send ICMPv6 Packet Too Big. If that ICMP is blocked, path MTU discovery fails and large packets vanish silently — the classic IPv6 black-hole.
- **Calling `fe80::/10` the private range.** Link-local addresses are auto-configured and never routed; the private-address analogue is unique local `fc00::/7`. An `fe80::` address on a router interface is not reachable from another subnet.
- **Believing IPv6 has a checksum at layer 3.** It does not; correctness relies on the link-layer FCS and on transport-layer checksums, which are mandatory in UDP over IPv6 (unlike IPv4, where the UDP checksum is optional).

## See Also

- [[09_IPv4_Addressing_and_Classes]]
- [[10_Subnetting,_CIDR_and_VLSM]]
- [[12_Routing_Algorithms_Distance_Vector_and_Link_State]]
- [[02_TCP_-_IP_Protocol_Suite]]

---

[[10_Subnetting,_CIDR_and_VLSM|⬅ 10]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Routing_Algorithms_Distance_Vector_and_Link_State|12 ➡]]
