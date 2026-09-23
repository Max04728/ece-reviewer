---
id: EST-04-09
title: "IPv4 Addressing and Classes"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 9
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_OSI_Seven-Layer_Model]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — IPv4 Addressing and Classes

> [!abstract] Scope
> Classify an IPv4 address into its class, find its default mask, and derive the network address, broadcast address and usable host range by ANDing with the mask.

## Core Concept

> [!tip] Intuition
> An IPv4 address is 32 bits split into a network part and a host part, and the mask is the stencil that separates them. The network address is what you get by ANDing every host bit away; the broadcast address is what you get by setting every host bit to 1.

**Structure.** An IPv4 address is 32 bits, written as four dotted-decimal octets. It is divided into a *network* portion, which identifies the network and is used by routers, and a *host* portion, which identifies the interface within that network. The boundary between them is given by the subnet mask, a 32-bit value with a contiguous run of 1s (the network bits) followed by 0s (the host bits). Classful addressing derives the boundary from the address alone; classless addressing (CIDR) states it explicitly as a prefix length.

**The five classes.** The class is determined by the leading bits of the first octet. *Class A* begins with 0, so the first octet runs 1 to 126 with 7 network bits and 24 host bits (default mask /8, 255.0.0.0). *Class B* begins with 10, first octet 128 to 191, 14 network bits and 16 host bits (/16, 255.255.0.0). *Class C* begins with 110, first octet 192 to 223, 21 network bits and 8 host bits (/24, 255.255.255.0). *Class D* begins with 1110, first octet 224 to 239, and is reserved for multicast — it has no host portion. *Class E* begins with 1111, first octet 240 to 255, reserved for experimental use. The loopback range 127.0.0.0/8 occupies the gap between Class A and Class B and is not assignable.

**Counting networks and hosts.** Class A has $2^7 = 128$ combinations but the all-0s network (0.0.0.0/8) and the loopback network (127.0.0.0/8) are reserved, leaving **126 usable Class A networks**. Class B has $2^{14} = 16\,384$ networks with no reservation. Class C has $2^{21} = 2\,097\,152$ networks. Host counts always subtract two: the all-0s host part is the *network address* and the all-1s host part is the *directed broadcast address*, so a Class C network has $2^8 - 2 = 254$ usable hosts, a Class B has $2^{16} - 2 = 65\,534$ and a Class A has $2^{24} - 2 = 16\,777\,214$.

**Why the two addresses are unusable.** The network address (host bits all zero) names the network itself and cannot be assigned to an interface. The directed broadcast address (host bits all one) addresses every host on that network at once; a packet sent to it is delivered to all of them. Confusing either with a host address is the single most common error in this topic.

**Special and private ranges.** *Private* addresses are never routed on the public Internet and are reused inside every organisation: 10.0.0.0/8 (one Class A), 172.16.0.0/12 — that is 172.16.0.0 through 172.31.255.255, sixteen Class B networks — and 192.168.0.0/16 (256 Class C networks). Note carefully that 172.32.0.0 is **not** private; the private block stops at 172.31.255.255. Other specials: 127.0.0.0/8 is loopback (127.0.0.1 is the local host); 169.254.0.0/16 is the link-local APIPA range a host self-assigns when DHCP fails; 0.0.0.0 means *this host, this network* and is used as a default route; 255.255.255.255 is the limited broadcast confined to the local link.

**Finding the network and broadcast addresses.** Two methods give the same answer. *AND the mask*: convert the host's octets to binary and AND each with the mask; the result is the network address. *Block size*: for the interesting octet, the block size is $256 - \mathrm{mask\ octet}$; the network address is the largest multiple of the block size that is not greater than the host's octet value, and the broadcast address is the network's octet plus block size minus one. The block-size method is faster and less error-prone in an exam, and it generalises directly to subnetting.

## Derivation

**Class from the leading bits.** Write the first octet in binary and read the leading bits. `0` → Class A, first octet 1–126. `10` → Class B, 128–191. `110` → Class C, 192–223. `1110` → Class D, 224–239. `1111` → Class E, 240–255. As a shortcut: 1–126 is A, 128–191 is B, 192–223 is C, 224–239 is D, 240–255 is E, and 127 is reserved loopback. The default masks follow immediately: /8 for A, /16 for B, /24 for C.

**Networks and hosts per class.** With a network portion of $n$ bits and a host portion of $h = 32 - n$ bits, the number of networks is $2^n$ (less reserved values) and the number of usable hosts per network is $2^h - 2$. Class A: $n = 7$, $h = 24 \Rightarrow 126$ networks, $16\,777\,214$ hosts. Class B: $n = 14$, $h = 16 \Rightarrow 16\,384$ networks, $65\,534$ hosts. Class C: $n = 21$, $h = 8 \Rightarrow 2\,097\,152$ networks, $254$ hosts. The Class A host count is what made classful addressing unsustainable: a single Class A network is larger than the entire early Internet.

**Network address by ANDing.** Convert the address and mask to binary and AND bit by bit. Worked example: 192.168.10.130 with mask 255.255.255.192 (/26). The significant octet is the fourth. $130 = 10000010_2$ and $192 = 11000000_2$, so the AND is $10000000_2 = 128$. Network address: 192.168.10.128. The key insight is that only the octet where the mask is neither 0 nor 255 needs bit-level work.

**Broadcast address and host range.** Invert the mask and OR it with the network address, or equivalently add the block size minus one to the network octet. For the /26 example the block size is $256 - 192 = 64$, so the broadcast is $128 + 64 - 1 = 191$: 192.168.10.191. The usable host range is the network address plus one through the broadcast address minus one: 192.168.10.129 to 192.168.10.190, which is 62 addresses — exactly $2^6 - 2$.

**Verifying with the host count.** Any valid answer must satisfy: broadcast − network = block size − 1, and the host count = block size − 2. For a /26, block size 64, so the broadcast offset must be 63 and the host count 62. These two checks catch nearly every arithmetic slip, and both are quick.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Class A | $0xxxxxxx, \quad 1{-}126, \quad /8, \quad 255.0.0.0$ | 7 network bits, 24 host bits. 126 usable networks, 16 777 214 hosts each. |
| Class B | $10xxxxxx, \quad 128{-}191, \quad /16, \quad 255.255.0.0$ | 14 network bits, 16 host bits. 16 384 networks, 65 534 hosts each. |
| Class C | $110xxxxx, \quad 192{-}223, \quad /24, \quad 255.255.255.0$ | 21 network bits, 8 host bits. 2 097 152 networks, 254 hosts each. |
| Class D | $1110xxxx, \quad 224{-}239$ | Multicast. No host portion; an address names a group, not an interface. |
| Class E | $1111xxxx, \quad 240{-}255$ | Reserved for experimental use. Not assignable. |
| Loopback | $127.0.0.0/8$ | Reserved. 127.0.0.1 is the local host and is never routed. |
| Usable hosts | $N_{hosts} = 2^h - 2$ | h is the number of host bits. Subtract the network address and the directed broadcast. |
| Network address | $\mathrm{Network} = \mathrm{Address} \ \mathrm{AND}\ \mathrm{Mask}$ | Bitwise AND. Only the octet where the mask is partially 1s needs binary work. |
| Broadcast address | $\mathrm{Broadcast} = \mathrm{Network} + \mathrm{BlockSize} - 1$ | Block size in the significant octet is 256 minus that mask octet. |
| Host range | $[\mathrm{Network}+1,\ \mathrm{Broadcast}-1]$ | The first and last assignable addresses. Count equals block size minus 2. |
| Private ranges | $10.0.0.0/8, \quad 172.16.0.0/12, \quad 192.168.0.0/16$ | 172.16.0.0/12 covers 172.16 through 172.31 — 172.32 is public. |
| Link-local (APIPA) | $169.254.0.0/16$ | Self-assigned when DHCP fails. Reachable only on the local link. |
| Limited broadcast | $255.255.255.255$ | Delivered on the local link only; routers do not forward it. |

## Worked Problems

### P1. Classify 172.16.5.10 and state its default mask and the number of usable hosts.

**Given:** address = 172.16.5.10

**Solution:**

1. First octet 172 lies in the Class B range 128-191
2. Default mask is /16 = 255.255.0.0
3. Host bits h = 32 - 16 = 16
4. Usable hosts = 2^16 - 2 = 65 534

> [!success]- Answer
> **Class B, 255.255.0.0, $65\,534$ hosts**

> [!warning] Trap
> Calling it Class C because the address starts with what looks like a small number. The class is set by the *range* of the first octet, not by the magnitude of the later ones.

### P2. Classify 224.10.20.30 and state what the address is used for and how many hosts it addresses.

**Given:** address = 224.10.20.30

**Solution:**

1. First octet 224 lies in 224-239, the Class D range
2. Class D is reserved for multicast
3. There is no host portion, so no per-interface host count applies
4. The address names a multicast group; any number of receivers may join it

> [!success]- Answer
> **Class D multicast — group addressing, not a host count**

> [!warning] Trap
> Applying the $2^h - 2$ formula to Class D and reporting a host count. Class D has no network/host split at all; the entire 28 bits identify the group.

### P3. How many usable host addresses does a Class C network provide, and how many Class C networks exist?

**Given:** Class C = /24

**Solution:**

1. Host bits h = 32 - 24 = 8
2. Usable hosts = 2^8 - 2 = 256 - 2 = 254
3. Network bits n = 21 (the leading 110 is fixed)
4. Networks = 2^21 = 2 097 152

> [!success]- Answer
> **254 hosts per network; $2\,097\,152$ networks**

> [!warning] Trap
> Answering 256 hosts. The all-zeros host part is the network address and the all-ones host part is the directed broadcast, so two addresses per network are never assignable.

### P4. How many usable Class A networks exist, and why is the number not $2^7 = 128$?

**Given:** Class A = /8, first octet 1-126

**Solution:**

1. The first bit is fixed at 0, leaving 7 network bits: 2^7 = 128 combinations
2. 0.0.0.0/8 is reserved (means this network / default route)
3. 127.0.0.0/8 is reserved for loopback
4. Usable = 128 - 2 = 126

> [!success]- Answer
> **126 usable Class A networks**

> [!warning] Trap
> Answering 128. Two values are reserved for reasons that are not part of the host-count rule: the all-zero network and the loopback block. This is a separate subtraction from the $2^h - 2$ host rule.

### P5. For 192.168.10.130/26, find the network address, the broadcast address and the usable host range.

**Given:** address = 192.168.10.130; prefix = /26; mask = 255.255.255.192

**Solution:**

1. Block size in the fourth octet = 256 - 192 = 64
2. Largest multiple of 64 not exceeding 130 is 128, so network = 192.168.10.128
3. Broadcast = 128 + 64 - 1 = 191, so 192.168.10.191
4. Usable hosts = 192.168.10.129 through 192.168.10.190
5. Count = 64 - 2 = 62

> [!success]- Answer
> **Network 192.168.10.128, broadcast 192.168.10.191, hosts .129–.190 (62 addresses)**

> [!warning] Trap
> Reporting 192.168.10.128 as the first usable host. It is the network address. The first usable address is always network + 1, which is why a /26 has 62 hosts and not 64.

### P6. A host has address 10.20.30.40 with mask 255.255.240.0. Find the network address, broadcast address and host count.

**Given:** address = 10.20.30.40; mask = 255.255.240.0

**Solution:**

1. The significant octet is the third: mask 240, block size = 256 - 240 = 16
2. Largest multiple of 16 not exceeding 30 is 16
3. Network = 10.20.16.0
4. Broadcast = 10.20.16.0 with the third octet at 16 + 16 - 1 = 31, and the fourth at 255 -> 10.20.31.255
5. Host bits = 32 - 20 = 12, so hosts = 2^12 - 2 = 4094

> [!success]- Answer
> **Network 10.20.16.0, broadcast 10.20.31.255, $4094$ hosts**

> [!warning] Trap
> Reporting the broadcast as 10.20.31.254. The broadcast sets *every* host bit to 1, so the last octet is 255, not 254 — 254 would be the last usable host address, not the broadcast.

### P7. Give the first and last usable host addresses in 200.100.50.0/24.

**Given:** network = 200.100.50.0; prefix = /24

**Solution:**

1. Network address = 200.100.50.0
2. Broadcast = 200.100.50.255
3. First usable host = 200.100.50.1
4. Last usable host = 200.100.50.254
5. Count = 256 - 2 = 254

> [!success]- Answer
> **200.100.50.1 through 200.100.50.254**

> [!warning] Trap
> Listing .0 as usable because it looks like a normal address, or listing .255 as usable because it is the last address in the range. Both are reserved by definition.

### P8. Which of these addresses are private: 10.5.5.5, 172.20.1.1, 172.32.1.1, 192.168.1.1, 11.0.0.1?

**Given:** five addresses; private ranges 10/8, 172.16/12, 192.168/16

**Solution:**

1. 10.5.5.5 falls in 10.0.0.0/8 -> private
2. 172.20.1.1 falls in 172.16.0.0/12 (172.16 through 172.31) -> private
3. 172.32.1.1 is above 172.31.255.255 -> public
4. 192.168.1.1 falls in 192.168.0.0/16 -> private
5. 11.0.0.1 is outside 10.0.0.0/8 -> public

> [!success]- Answer
> **Private: 10.5.5.5, 172.20.1.1, 192.168.1.1. Public: 172.32.1.1, 11.0.0.1**

> [!warning] Trap
> Treating the whole 172.x range as private. The private block is 172.16.0.0/12, which stops at 172.31.255.255; 172.32.0.0 onwards is public. This is the most frequently missed boundary in the topic.

### P9. Identify the purpose of each special address: 127.0.0.1, 169.254.10.5, 0.0.0.0, 255.255.255.255.

**Given:** four special addresses

**Solution:**

1. 127.0.0.1 is the loopback address; packets never leave the host
2. 169.254.10.5 is in the link-local / APIPA range, self-assigned when DHCP is unavailable
3. 0.0.0.0 means this host / this network and is used as a default route or as a source before an address is known
4. 255.255.255.255 is the limited broadcast, confined to the local link and never forwarded

> [!success]- Answer
> **loopback, APIPA link-local, unspecified/default, limited broadcast**

> [!warning] Trap
> Confusing 255.255.255.255 with a network's directed broadcast such as 192.168.1.255. The limited broadcast stays on the local link; the directed broadcast is routed to a specific remote network.

### P10. A network uses the prefix /22. Find the mask, the block size in the third octet, the number of addresses and the number of usable hosts.

**Given:** prefix = /22

**Solution:**

1. Mask = 255.255.252.0 (the third octet has 6 network bits: 11111100 = 252)
2. Block size in the third octet = 256 - 252 = 4
3. Host bits = 32 - 22 = 10
4. Total addresses = 2^10 = 1024
5. Usable hosts = 1024 - 2 = 1022

> [!success]- Answer
> **255.255.252.0, block size 4, 1024 addresses, $1022$ hosts**

> [!warning] Trap
> Computing the block size from the *fourth* octet. The block size belongs to the octet where the mask is neither 0 nor 255 — here the third, giving 4, which means the third octet steps 0, 4, 8, 12 and so on.

## Traps & Exam Notes

- **Subtracting 2 from the host bits for the network and broadcast addresses is only correct for a single subnet.** The network address and directed broadcast are reserved on every subnet, so the rule applies per subnet — a /22 has 1022 hosts, but if it is split into four /24s each has 254 and four addresses in total are consumed as network/broadcast pairs, not two.
- **Treating all of 172.x as private.** Only 172.16.0.0 through 172.31.255.255 is private. 172.32.0.0 is public, and a firewall rule written as '172.*' both leaks and over-blocks.
- **Using the broadcast address as a host address.** $2^h - 2$, not $2^h$. The two reserved values are the all-zeros host part (network) and the all-ones host part (broadcast).
- **Deriving the class from the mask instead of the address.** Class is determined by the leading bits of the first octet. A Class A address can carry a /26 mask under CIDR, and its *class* is still A.
- **Confusing the limited broadcast with a directed broadcast.** 255.255.255.255 never leaves the local link; 192.168.1.255 is routed to that specific network. A router drops the former and forwards the latter.
- **Adding 1 to the network address to get the broadcast.** The broadcast is network + block size − 1. For a /24 that is +255, and for a /26 it is +63 — using the wrong block size shifts the whole host range.
- **Assuming 127.x.x.x is a usable Class A network.** The entire 127.0.0.0/8 block is loopback and is not assignable, which is why Class A yields 126 networks rather than 128.

## See Also

- [[10_Subnetting,_CIDR_and_VLSM]]
- [[11_IPv6_Structure]]
- [[12_Routing_Algorithms_Distance_Vector_and_Link_State]]
- [[02_TCP_-_IP_Protocol_Suite]]

---

[[08_Switching_Circuit_vs_Packet|⬅ 08]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Subnetting,_CIDR_and_VLSM|10 ➡]]
