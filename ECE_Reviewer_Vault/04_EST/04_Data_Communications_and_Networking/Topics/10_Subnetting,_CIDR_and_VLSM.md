---
id: EST-04-10
title: "Subnetting, CIDR and VLSM"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 10
tier: 1
depth: full
problem_count: 10
prereqs: ["[[09_IPv4_Addressing_and_Classes]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Subnetting, CIDR and VLSM

> [!abstract] Scope
> Borrow host bits to carve a network into subnets, size each subnet mask to its host requirement under VLSM, and aggregate contiguous networks into a single CIDR route.

## Core Concept

> [!tip] Intuition
> Subnetting slides the network/host boundary to the right, trading hosts for networks. VLSM slides it independently for each subnet so nobody pays for space they do not need. CIDR slides it left again to collapse many routes into one.

**The mechanic of subnetting.** Starting from a classful network with $h$ host bits, you *borrow* $n$ of them for the subnet field. The prefix grows from $/p$ to $/(p+n)$, the number of subnets is $2^n$, and each subnet keeps $h - n$ host bits for $2^{h-n} - 2$ usable hosts. Every borrowed bit doubles the subnet count and halves the host count, so the trade is steep and irreversible: borrowing 4 bits from a /24 gives 16 subnets of 14 hosts each rather than one network of 254. The classical fixed-length scheme requires *all* subnets to use the same mask, whether or not they need it.

**The block-size method — the fastest exam technique.** For the octet where the mask is neither 0 nor 255, the block size is $256 - (\mathrm{mask\ octet})$. Subnets begin at multiples of the block size: 0, 64, 128, 192 for a /26; 0, 32, 64, ... for a /27. The network address is the largest multiple of the block size not exceeding the host's octet; the broadcast is that value plus block size minus one. This avoids all binary conversion and is the method to use under time pressure.

**Finding which subnet a host belongs to.** Take the host's address, apply the mask, and the result is the subnet's network address. Then the first usable host is network + 1, the last is broadcast − 1, and the broadcast is network + block size − 1. Everything follows from the block size. The only octet that requires any thought is the one where the mask is partially set.

**VLSM: variable-length subnet masking.** Fixed-length subnetting wastes addresses whenever the subnets have unequal requirements — a point-to-point link needs 2 hosts, not 30. VLSM lets each subnet have its own mask, chosen as the smallest one that fits its host requirement: find the smallest $h$ with $2^h - 2 \geq H$, then the prefix is $32 - h$. **Allocate the largest requirement first**, because the blocks must not overlap and the large blocks need aligned, large free space. A common failure is to allocate the small subnets first and then discover that the remaining space cannot hold the largest one contiguously.

**VLSM requires a classless routing protocol.** Because different subnets now have different masks, the mask must be carried in the routing advertisement. RIPv1 and IGRP cannot do this — they infer the mask from the address class — which is why VLSM needs RIPv2, OSPF, EIGRP or IS-IS. This is the networking reason behind the historical transition from classful to classless routing, and it is a favourite exam point.

**CIDR and route aggregation.** Classless inter-domain routing abandons classes entirely: an address is written as a prefix of any length, and a router keeps one entry per prefix. A block of $2^{32-p}$ addresses is written as a $/p$ prefix, and a *supernet* is a single prefix covering several smaller ones. To aggregate, write the candidate networks in binary, find the number of leading bits they all share, and that is the new prefix length. Four contiguous /24s always aggregate into a /22; the alignment requirement is strict — 192.168.16.0 through 192.168.23.0 aggregates to /21 because the range starts on an 8-boundary, whereas 192.168.17.0 through 192.168.20.0 cannot be expressed as one prefix at all.

**Longest-prefix match.** When several routes match a destination, the router uses the most specific one — the longest prefix. A /26 route beats a /24 route which beats a default route 0.0.0.0/0. This is what makes aggregation safe: you can advertise a coarse summary and still override it with a specific route for one subnet, and a packet to that subnet follows the specific path.

## Derivation

**Subnets and hosts from borrowed bits.** A network with $h$ host bits offers $2^h$ addresses. Borrowing $n$ bits creates $2^n$ subnets of $2^{h-n}$ addresses each. Subtracting the network address and the directed broadcast from each gives $2^{h-n} - 2$ usable hosts per subnet, so the total usable addresses fall from $2^h - 2$ to $2^n(2^{h-n} - 2) = 2^h - 2^{n+1}$. Borrowing always costs addresses: from a /24, splitting into 8 subnets costs $2^4 = 16$ addresses, leaving $256 - 16 = 240$ usable rather than 254.

**Block size, network and broadcast.** For a prefix $/p$, let $m$ be the mask octet in the octet containing the boundary. The block size is $B = 256 - m$. Subnet $k$ (counting from zero) has network address with that octet equal to $kB$, broadcast octet $kB + B - 1$, and usable hosts from $kB + 1$ to $kB + B - 2$. Worked example, /28: $m = 240$, $B = 16$, so the subnets in the last octet begin at 0, 16, 32, ..., 240. A host at 10.10.10.200 has $\lfloor 200/16 \rfloor = 12$, so its network is 10.10.10.192, broadcast 10.10.10.207, and hosts 10.10.10.193 to 10.10.10.206.

**Minimum mask for a host requirement.** To host $H$ devices you need $2^h - 2 \geq H$, so $h \geq \lceil \log_2(H+2) \rceil$ and the prefix is $32 - h$. For $H = 500$: $H + 2 = 502$; $2^8 = 256 < 502$ and $2^9 = 512 \geq 502$, so $h = 9$ and the prefix is /23, giving 510 usable hosts. For $H = 2$: $H + 2 = 4$, $h = 2$, prefix /30, giving exactly 2 hosts — the standard point-to-point link mask.

**VLSM allocation procedure.** Sort requirements from largest to smallest. Maintain a running allocation pointer starting at the network address. For each requirement compute $h$, then the block size $B = 2^h$; assign the block of $B$ addresses at the pointer, then advance the pointer by $B$. Worked example on 192.168.1.0/24 with requirements 100, 50, 20, 2: 100 needs $h = 7$ (126 hosts), $B = 128 \Rightarrow$ 192.168.1.0–192.168.1.127; 50 needs $h = 6$ (62 hosts), $B = 64 \Rightarrow$ 192.168.1.128–192.168.1.191; 20 needs $h = 5$ (30 hosts), $B = 32 \Rightarrow$ 192.168.1.192–192.168.1.223; 2 needs $h = 2$ (2 hosts), $B = 4 \Rightarrow$ 192.168.1.224–192.168.1.227. Remaining free space: 192.168.1.228–192.168.1.255 (28 addresses).

**Aggregating contiguous networks.** Write the third and fourth octets of each candidate network in binary and count the leading bits they share. Example: 200.1.0.0/24 through 200.1.3.0/24. The third octets are 0, 1, 2, 3 = `00000000`, `00000001`, `00000010`, `00000011`, which share the first 6 bits `000000`. The prefix is therefore $16 + 6 = /22$, and the summary route is 200.1.0.0/22. A second example: 192.168.16.0 through 192.168.23.0. Third octets 16–23 = `00010000` to `00010111`, sharing the leading 5 bits `00010`, so the prefix is $16 + 5 = /21$ and the summary is 192.168.16.0/21.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Number of subnets | $N_{subnets} = 2^n$ | n is the number of host bits borrowed. Every borrowed bit doubles the count. |
| Hosts per subnet | $N_{hosts} = 2^{h-n} - 2$ | h is the original host-bit count. Subtract the subnet address and the subnet broadcast. |
| New prefix length | $p_{new} = p_{class} + n$ | A /24 that borrows 3 bits becomes a /27. |
| Block size | $B = 256 - m$ | m is the mask octet at the boundary. 192 gives 64; 224 gives 32; 240 gives 16; 252 gives 4. |
| Subnet network addresses | $k B, \quad k = 0, 1, 2, \ldots, \frac{256}{B} - 1$ | Multiples of the block size in the boundary octet. |
| Broadcast address | $\mathrm{Broadcast} = \mathrm{Network} + B - 1$ | All host bits set to 1. The last usable host is one less. |
| Usable host range | $[\mathrm{Network}+1,\ \mathrm{Network}+B-2]$ | Count equals B - 2. For a /28, B = 16 and there are 14 hosts. |
| Minimum prefix for H hosts | $h = \lceil \log_2(H+2) \rceil, \quad p = 32 - h$ | Use H+2, not H: the network and broadcast addresses are consumed first. |
| Subnets of size /p inside /q | $N = 2^{\,p-q}$ | Valid only for p > q. Sixty-four /30s fit in a /24. |
| Addresses in a prefix | $N_{addr} = 2^{32-p}$ | A /22 holds 1024 addresses; a /30 holds 4. |
| CIDR aggregation | $p_{sum} = p + (\mathrm{common\ leading\ bits})$ | The range must start on an alignment boundary equal to its size, or no single prefix exists. |
| Longest prefix match | $\mathrm{choose\ the\ route\ with\ the\ largest}\ p$ | A /26 always beats a /24; the default route 0.0.0.0/0 is the last resort. |
| VLSM allocation order | $\mathrm{largest\ requirement\ first}$ | Each block must fit in the remaining contiguous space at the running pointer. |
| Point-to-point link mask | $/30 \Rightarrow 2\ \mathrm{hosts}; \quad /31 \Rightarrow 2\ \mathrm{hosts\ (RFC\ 3021)}$ | /31 has no network or broadcast address and is used only on point-to-point links. |

## Interactive Widget

**Subnet Calculator Interactive**

![[Subnet_Calculator_Interactive.html|width: 100%; height: max-content]]

## Worked Problems

### P1. 192.168.1.0/24 must be divided into at least 6 equal subnets. Find the new prefix, the number of subnets, the hosts per subnet, and list the first three subnet ranges.

**Given:** network = 192.168.1.0/24; need >= 6 subnets; equal-size subnets

**Solution:**

1. Need 2^n >= 6, so n = 3 (2^3 = 8)
2. New prefix = 24 + 3 = /27, mask 255.255.255.224
3. Block size B = 256 - 224 = 32
4. Hosts per subnet = 32 - 2 = 30
5. Subnets start at 0, 32, 64, ...: 192.168.1.0/27, 192.168.1.32/27, 192.168.1.64/27

> [!success]- Answer
> **/27, 8 subnets, 30 hosts each; first three are .0/27, .32/27, .64/27**

> [!warning] Trap
> Borrowing 2 bits because $2^2 = 4$ is close to 6. The requirement is an inequality — 4 subnets do not satisfy a demand for 6 — so round the *bit count* up to 3.

### P2. A host has address 10.10.10.200 with mask 255.255.255.240. Find its subnet, broadcast and usable host range.

**Given:** address = 10.10.10.200; mask = 255.255.255.240 (/28)

**Solution:**

1. Block size B = 256 - 240 = 16
2. floor(200/16) = 12, so the network octet is 12 x 16 = 192
3. Subnet = 10.10.10.192/28
4. Broadcast = 192 + 16 - 1 = 207 -> 10.10.10.207
5. Hosts = 10.10.10.193 through 10.10.10.206 (14 addresses)

> [!success]- Answer
> **10.10.10.192/28, broadcast 10.10.10.207, hosts .193–.206**

> [!warning] Trap
> Rounding 200 down to 192 by eye and then adding 16 to the *host* address rather than to the network address, giving 10.10.10.216 as the broadcast. Broadcast = network + block size − 1.

### P3. A subnet must support 500 hosts. Find the minimum prefix length and the resulting usable host count.

**Given:** H = 500 hosts

**Solution:**

1. Need 2^h - 2 >= 500, so 2^h >= 502
2. 2^8 = 256 is too small; 2^9 = 512 works
3. h = 9, so the prefix is 32 - 9 = /23
4. Usable hosts = 512 - 2 = 510

> [!success]- Answer
> **/23, 510 usable hosts**

> [!warning] Trap
> Choosing /24 because '254 is about half of 500'. The requirement is $2^h \geq H + 2$, not $2^h \geq H$: for $H = 500$ the threshold is 502 and $h = 9$ (a /23, 510 hosts) just clears it, while $H = 511$ pushes the threshold to 513 and forces $h = 10$ (a /22). One host of headroom is all that separates a /23 from a /22.

### P4. For the network 172.16.32.0/22, find the mask, the broadcast address, the usable host range and the host count.

**Given:** network = 172.16.32.0; prefix = /22

**Solution:**

1. Mask = 255.255.252.0 (third octet 11111100 = 252)
2. Block size in the third octet = 256 - 252 = 4
3. Network third octet = 32; broadcast third octet = 32 + 4 - 1 = 35
4. Broadcast = 172.16.35.255
5. Hosts = 172.16.32.1 through 172.16.35.254
6. Host bits = 10, count = 2^10 - 2 = 1022

> [!success]- Answer
> **255.255.252.0, broadcast 172.16.35.255, hosts 172.16.32.1–172.16.35.254 ($1022$ hosts)**

> [!warning] Trap
> Reporting the broadcast as 172.16.35.254. The last octet of a broadcast is always 255 when the host field extends through the fourth octet; .254 is the last *usable* host.

### P5. Using VLSM, allocate 192.168.1.0/24 for subnet requirements of 100, 50, 20 and 2 hosts.

**Given:** network = 192.168.1.0/24; requirements = 100, 50, 20, 2 hosts

**Solution:**

1. 100 hosts: need 2^h - 2 >= 100 -> h = 7 -> /25, block 128. Assign 192.168.1.0/25 (hosts .1-.126, broadcast .127)
2. 50 hosts: h = 6 -> /26, block 64. Assign 192.168.1.128/26 (hosts .129-.190, broadcast .191)
3. 20 hosts: h = 5 -> /27, block 32. Assign 192.168.1.192/27 (hosts .193-.222, broadcast .223)
4. 2 hosts: h = 2 -> /30, block 4. Assign 192.168.1.224/30 (hosts .225-.226, broadcast .227)
5. Free space remaining: 192.168.1.228 - 192.168.1.255

> [!success]- Answer
> **/25 = .0; /26 = .128; /27 = .192; /30 = .224**

> [!warning] Trap
> Allocating the small subnets first. Starting with the /30 at .0, then the /27 at .4, leaves only .36 onwards for the /25 — and a /25 needs 128 contiguous addresses aligned on a 128 boundary, so the allocation fails. Always allocate largest first.

### P6. Aggregate the four networks 200.1.0.0/24, 200.1.1.0/24, 200.1.2.0/24 and 200.1.3.0/24 into a single route.

**Given:** 200.1.0.0/24 through 200.1.3.0/24

**Solution:**

1. Third octets are 0, 1, 2, 3
2. Binary: 00000000, 00000001, 00000010, 00000011
3. Common leading bits: 000000 (6 bits)
4. New prefix = 16 + 6 = /22
5. Summary route = 200.1.0.0/22, which covers 200.1.0.0 - 200.1.3.255

> [!success]- Answer
> **200.1.0.0/22**

> [!warning] Trap
> Aggregating four /24s into a /20 by halving the prefix twice for the wrong reason. Four subnets means two borrowed bits, so the prefix shortens by exactly 2: /24 to /22.

### P7. Aggregate 192.168.16.0/24 through 192.168.23.0/24 into one prefix, and state the range it covers.

**Given:** eight contiguous /24 networks, third octets 16 to 23

**Solution:**

1. Third octets 16-23: 00010000 to 00010111
2. Common leading bits: 00010 (5 bits) — bit 6 differs (0 for 16-19, 1 for 20-23)
3. New prefix = 16 + 5 = /21
4. Mask = 255.255.248.0, block size 8
5. 192.168.16.0/21 covers 192.168.16.0 through 192.168.23.255

> [!success]- Answer
> **192.168.16.0/21**

> [!warning] Trap
> Answering /20 because there are eight networks, using the count rather than the shared prefix bits. Eight subnets doubles three times from a /24 base only when the range starts on a multiple of 8 *and* the prefix arithmetic is done in binary; here the shared-prefix count is 5, not 4.

### P8. How many /26 subnets fit in a /22, and how many /30 point-to-point links fit in a /24?

**Given:** /26 inside /22; /30 inside /24

**Solution:**

1. Subnets of size /p in /q: N = 2^(p-q)
2. /26 in /22: N = 2^(26-22) = 2^4 = 16
3. /30 in /24: N = 2^(30-24) = 2^6 = 64

> [!success]- Answer
> **Sixteen /26s; sixty-four /30s**

> [!warning] Trap
> Computing the ratio of address counts wrongly by using $2^{q-p}$ and getting fractions. The exponent is always the *difference in prefix lengths* with the larger prefix on top.

### P9. Write the dotted-decimal mask for /27, /28 and /21, and give the block size for each.

**Given:** prefixes /27, /28, /21

**Solution:**

1. /27: fourth octet 11100000 = 224 -> 255.255.255.224, block size 256 - 224 = 32
2. /28: fourth octet 11110000 = 240 -> 255.255.255.240, block size 16
3. /21: third octet 11111000 = 248 -> 255.255.248.0, block size 8

> [!success]- Answer
> **/27 = 255.255.255.224 (B = 32); /28 = 255.255.255.240 (B = 16); /21 = 255.255.248.0 (B = 8)**

> [!warning] Trap
> Deriving the mask octet as $256 - 2^{\mathrm{network\ bits}}$ instead of summing the set bits. For /27 the last octet has 3 network bits: $128+64+32 = 224$, with block size 32. Computing $256 - 2^3 = 248$ gives the /29 mask instead. The safe shortcut is $256 - B$ where $B$ is the *block size*, not $2^{\mathrm{network\ bits}}$.

### P10. A router has routes 10.1.0.0/16, 10.1.4.0/22 and 10.1.4.128/25 all matching a destination 10.1.4.200. Which does it use and why?

**Given:** destination = 10.1.4.200; routes /16, /22, /25

**Solution:**

1. All three prefixes match the destination address
2. Longest-prefix match selects the most specific route
3. /25 is longer than /22, which is longer than /16
4. The router uses 10.1.4.128/25

> [!success]- Answer
> **10.1.4.128/25 — longest prefix match**

> [!warning] Trap
> Choosing the first route installed or the lowest metric. Prefix length is compared *before* any metric; administrative distance and metric only break ties between routes of the same prefix length.

## Traps & Exam Notes

- **Subtracting 2 from the host bits for the network and broadcast addresses is only correct for a single subnet — for VLSM you must not double-count.** Every subnet in a VLSM plan consumes its own network and broadcast address, so a /24 split into 64 /30s yields $64 \times 2 = 128$ usable hosts, not 254. Budget the two reserved addresses per subnet, not per parent network.
- **Allocating VLSM subnets smallest-first.** Each block must sit at a multiple of its own size, so a /25 needs a free 128-boundary. If the small blocks are placed first they fragment the space and the large block no longer fits contiguously. Largest requirement first, always.
- **Using $2^h \geq H$ instead of $2^h \geq H + 2$.** The network and broadcast addresses are consumed before any host is assigned, so a 500-host requirement needs 502 addresses and therefore $h = 9$ (a /23), not $h = 9$ arrived at from 500.
- **Aggregating by counting networks instead of matching prefix bits.** Four /24s aggregate to a /22 only when they are contiguous and aligned; eight /24s from .16 to .23 aggregate to /21, not /20, because the shared prefix is 5 bits.
- **Assuming any contiguous range aggregates.** 192.168.17.0/24 through 192.168.20.0/24 has no single-prefix representation, because a prefix covers a power-of-two-sized aligned block. Two routes with a longest-prefix exception are required.
- **Believing VLSM works with any routing protocol.** RIPv1 and IGRP are classful and cannot carry a mask, so VLSM requires RIPv2, OSPF, EIGRP or IS-IS. A VLSM design on a RIPv1 network silently fails.
- **Rounding the subnet count down.** Subnets are counted with $2^n \geq$ requirement, so a demand for 6 subnets means 3 borrowed bits and 8 subnets. Rounding to 4 leaves two subnets short.

## See Also

- [[09_IPv4_Addressing_and_Classes]]
- [[11_IPv6_Structure]]
- [[12_Routing_Algorithms_Distance_Vector_and_Link_State]]
- [[13_TCP_vs_UDP_and_Port_Numbers]]

---

[[09_IPv4_Addressing_and_Classes|⬅ 09]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[11_IPv6_Structure|11 ➡]]
