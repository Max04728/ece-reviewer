---
id: EST-04-12
title: "Routing Algorithms: Distance Vector and Link State"
part: "04_EST"
area: "04_Data_Communications_and_Networking"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_IPv4_Addressing_and_Classes]]"]
tags: ["ece", "est", "data_communications_and_networking"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Routing Algorithms: Distance Vector and Link State

> [!abstract] Scope
> Compare distance-vector and link-state routing, compute OSPF link costs and RIP hop limits, and run a Bellman-Ford update and a Dijkstra shortest-path tree.

## Core Concept

> [!tip] Intuition
> Distance vector is gossip: each router tells its neighbours what it knows and they patch their tables. Link state is broadcast: every router learns the whole map and then computes its own shortest-path tree.

**Distance-vector routing.** Each router keeps a table of (destination, cost, next hop) and periodically sends the whole table to its directly connected neighbours. On receiving a neighbour's table it applies the Bellman-Ford equation $D_x(y) = \min_v\{c(x,v) + D_v(y)\}$: the cost to a destination via a neighbour is the link cost plus the neighbour's advertised cost, and the router keeps the minimum over all neighbours. The algorithm is fully distributed, needs no global knowledge and converges without coordination — but convergence is slow, and routers learn about failures only from their neighbours' advertisements. RIP is the classic implementation, using hop count as the metric.

**The count-to-infinity problem.** In a linear topology A–B–C, if the link to C fails, B may still have an old route to C via A. A advertises C at cost 2 (via B), B adopts that and advertises 3, A adopts 4, and the two routers increment each other's stale information forever. The fix set is standard: *split horizon* (never advertise a route back out of the interface it was learned from), *poison reverse* (advertise it back but with cost infinity, which is stronger because it breaks the loop immediately), and *hold-down timers* (ignore updates about a route for a fixed period after it fails). RIP caps the metric at 16, which is infinity, so count-to-infinity terminates — at the cost of limiting the network diameter to 15 hops.

**Link-state routing.** Each router discovers its neighbours, measures the cost of each link, and floods a *link-state advertisement* describing only its own links to every router in the area. Every router therefore builds an identical database of the complete topology and runs Dijkstra's algorithm on it independently, producing a shortest-path tree rooted at itself. Convergence is fast because each router computes locally from a complete map and all routers reach the same conclusion at roughly the same time. The costs are memory (the full topology database), flooding bandwidth, and the need to divide large networks into areas so that flooding does not become the bottleneck. OSPF is the standard implementation.

**Metrics.** RIP's metric is hop count, which is simple but ignores bandwidth — a route over three slow satellite hops beats one over two fast fibre hops. OSPF's default metric is a cost inversely proportional to bandwidth, computed as a reference bandwidth divided by the interface bandwidth. The reference is conventionally 100 Mbps ($10^8$), giving cost 64 for a T1, 10 for 10 Mbps Ethernet and 1 for 100 Mbps and above. Because everything at or above 100 Mbps then costs the same 1, modern practice raises the reference to 1 Gbps or 10 Gbps so that faster links remain distinguishable.

**Choosing between them.** Distance vector is simpler to configure and needs less memory and processor, which suits small networks with a flat topology. Link state scales better, converges faster, and supports hierarchical areas and explicit bandwidth metrics, which suits large enterprise networks. The hybrid EIGRP and the path-vector BGP fall outside both pure categories — BGP in particular uses a path vector (the full AS path) rather than a scalar distance, precisely to make policy routing and loop detection possible between autonomous systems.

**What the exam asks.** Three calculations recur. First, convert a link bandwidth into an OSPF cost. Second, run one round of a Bellman-Ford update given a neighbour's advertised table. Third, run Dijkstra on a small graph and report the shortest path and its cost. All three are mechanical provided you record the *visited* set and the *tentative* distances carefully; the usual error is to relax an edge out of a node that has not yet been permanently added to the tree.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Bellman-Ford update | $D_x(y) = \min_v \{ c(x,v) + D_v(y) \}$ | The distance-vector update. c(x,v) is the cost of the link from x to neighbour v. |
| RIP metric | $\mathrm{metric} = \mathrm{hop\ count}, \quad \mathrm{infinity} = 16$ | Maximum usable diameter is 15 hops. A route of 16 is unreachable, not merely slow. |
| RIP update interval | $T_{update} = 30\ \mathrm{s}, \quad T_{timeout} = 180\ \mathrm{s}$ | Advertisements every 30 s; a route is invalidated after 180 s with no refresh. |
| Split horizon | $\mathrm{do\ not\ advertise\ a\ route\ back\ out\ the\ interface\ it\ came\ from}$ | Prevents the simplest two-node loop but not all loops. |
| Poison reverse | $\mathrm{advertise\ the\ route\ back\ with\ cost} = \infty$ | Stronger than split horizon: the neighbour is told explicitly that the path is unusable. |
| OSPF cost | $\mathrm{cost} = \frac{\mathrm{reference\ bandwidth}}{\mathrm{interface\ bandwidth}}$ | Default reference is 100 Mbps (10^8). Costs below 1 are rounded up to 1. |
| OSPF cost examples | $1544\ \mathrm{kbps} \to 64; \quad 10\ \mathrm{Mbps} \to 10; \quad 100\ \mathrm{Mbps} \to 1$ | Computed with a 10^8 reference. All links at or above 100 Mbps collapse to cost 1. |
| Dijkstra relaxation | $\mathrm{if}\ D(u) + w(u,v) < D(v) \ \mathrm{then}\ D(v) = D(u) + w(u,v)$ | Only relax edges out of the node just added to the visited set. |
| OSPF areas | $\mathrm{all\ areas\ must\ connect\ to\ area\ 0\ (backbone)}$ | Area 0 is 0.0.0.0. Inter-area traffic traverses the backbone. |
| LS flooding scope | $\mathrm{one\ LSA\ per\ router\ per\ area}$ | Sequence numbers and ageing prevent stale LSAs from looping; the database is identical on all routers in an area. |

## Worked Problems

### P1. Find the OSPF cost of a T1 link ($1.544\ \mathrm{Mbps}$), a $10\ \mathrm{Mbps}$ Ethernet link and a $100\ \mathrm{Mbps}$ Fast Ethernet link, using the default reference bandwidth.

**Given:** reference bandwidth = 100 Mbps = 1e8; links: 1.544, 10, 100 Mbps

**Solution:**

1. T1: cost = 1e8/1.544e6 = 64.77 -> 64
2. 10 Mbps: cost = 1e8/1e7 = 10
3. 100 Mbps: cost = 1e8/1e8 = 1
4. A 1 Gbps link would give 0.1, which is rounded up to 1

> [!success]- Answer
> **T1 = 64, 10 Mbps = 10, 100 Mbps = 1**

> [!warning] Trap
> Reporting the T1 cost as 65 by rounding 64.77 up. OSPF truncates the integer division, so the standard answer is 64. Also note that any link faster than the reference collapses to cost 1 — which is why the reference is raised in modern designs.

### P2. Router R has neighbours X, Y and Z with link costs 1, 2 and 5 respectively. R's current table is: to A cost 3 via X; to B cost 5 via Y; to C cost 2 via Z. Y advertises: to A cost 1; to B cost 0; to C cost 3. Apply one Bellman-Ford update.

**Given:** link costs: X = 1, Y = 2, Z = 5; Y's advertisement: A = 1, B = 0, C = 3

**Solution:**

1. Via Y to A: c(R,Y) + D_Y(A) = 2 + 1 = 3; current is 3 via X, so the cost is unchanged (tie keeps the existing next hop)
2. Via Y to B: 2 + 0 = 2; current is 5 via Y, so B improves to cost 2 via Y
3. Via Y to C: 2 + 3 = 5; current is 2 via Z, so C stays at cost 2 via Z
4. Updated table: A = 3 via X, B = 2 via Y, C = 2 via Z

> [!success]- Answer
> **A = 3 via X, B = 2 via Y, C = 2 via Z**

> [!warning] Trap
> Replacing a route with an equal-cost alternative simply because it arrived later. A tie keeps the incumbent, which avoids needless table churn — and on a real router the update must also not be re-advertised back to Y with the new cost, which split horizon prevents.

### P3. Run Dijkstra from node A on the graph: A-B = 2, A-C = 5, B-C = 1, B-D = 6, C-D = 3, C-E = 8, D-E = 2. Find the shortest path to E and its cost.

**Given:** edges: A-B 2, A-C 5, B-C 1, B-D 6, C-D 3, C-E 8, D-E 2; source = A

**Solution:**

1. Initialise: A = 0, all others infinity, visited = {}
2. Add A. Relax: B = 2, C = 5
3. Add B (cost 2). Relax: C = min(5, 2+1) = 3; D = 2+6 = 8
4. Add C (cost 3). Relax: D = min(8, 3+3) = 6; E = 3+8 = 11
5. Add D (cost 6). Relax: E = min(11, 6+2) = 8
6. Add E (cost 8). Done

> [!success]- Answer
> **A -> B -> C -> D -> E with cost 8**

> [!warning] Trap
> Taking the direct-looking A-C-E path (cost 13) or A-B-D-E (cost 10) because they have few hops. Dijkstra minimizes the summed *cost*, and the 4-hop path at 8 beats both. Also: never relax edges out of a node that has not yet been permanently visited.

### P4. A RIP network has a route at 14 hops. What happens when the destination moves one hop further away, and what is the maximum usable network diameter?

**Given:** current metric = 14 hops; RIP infinity = 16

**Solution:**

1. A destination 15 hops away is still reachable
2. One more hop gives 16, which RIP defines as infinity — unreachable
3. So the maximum usable diameter is 15 hops
4. The cap also terminates count-to-infinity, because the two routers incrementing each other's stale metric reach 16 and stop

> [!success]- Answer
> **It becomes unreachable (16 = infinity); the maximum diameter is 15 hops**

> [!warning] Trap
> Answering 16 hops as reachable because the field can hold it. 16 is the *sentinel*, not a distance; a packet needing 16 hops cannot be routed by RIP at all, which is why RIP is unsuitable for large networks.

### P5. In a three-router line A-B-C, the link B-C fails. Explain how count-to-infinity arises and how poison reverse prevents it.

**Given:** topology A-B-C; B-C link fails; A and B are neighbours

**Solution:**

1. B detects the B-C link failure and sets its cost to C to infinity (16 in RIP)
2. Before B's update reaches A, A advertises its still-valid route: C at cost 2 via B, learned when the link was up
3. B reasons: A can reach C in 2, and my link to A costs 1, so I can reach C via A in 3. B installs C = 3 via A
4. B advertises C = 3 to A; A updates its own route to C to 4 via B
5. A advertises 4, so B becomes 5; the two increment each other until both hit 16 and RIP gives up
6. With poison reverse, A would advertise C back to B as 16 (or not at all), so B never believes a path exists through A

> [!success]- Answer
> **Mutual re-advertisement of stale costs; poison reverse breaks it by advertising infinity back along the learned interface**

> [!warning] Trap
> Thinking split horizon alone always suffices. Split horizon suppresses the advertisement entirely, which still lets two routers form a loop through a third; poison reverse is the stronger form because it states the cost explicitly as infinity.

## Traps & Exam Notes

- **Rounding the OSPF cost up.** The cost is an integer division that truncates: 1.544 Mbps gives 64.77 and therefore 64. Rounding to 65 gives a link cost that no real router would ever report.
- **Forgetting that fast links collapse to the same cost.** With the default $10^8$ reference, 100 Mbps, 1 Gbps and 10 Gbps all cost 1, so OSPF cannot distinguish them. The reference bandwidth must be raised for the metric to be meaningful on modern links.
- **Treating RIP's 16 as a usable hop count.** 16 is infinity. The largest routable distance is 15 hops, and any route that would need 16 is discarded rather than used slowly.
- **Relaxing edges from an unvisited node in Dijkstra.** Only the node just permanently added may relax its outgoing edges. Relaxing early from a tentative node can produce a distance that is later invalidated, giving a wrong path.
- **Assuming split horizon alone prevents all loops.** It only stops a route being sent back out of the interface it arrived on. Three-router loops require poison reverse or hold-down timers.
- **Conflating administrative distance with metric.** Administrative distance chooses between routes from *different* protocols (connected, static, OSPF, RIP); the metric chooses between routes from the *same* protocol. A lower-metric RIP route never beats an OSPF route merely because its number is smaller.

## See Also

- [[09_IPv4_Addressing_and_Classes]]
- [[10_Subnetting,_CIDR_and_VLSM]]
- [[08_Switching_Circuit_vs_Packet]]
- [[01_OSI_Seven-Layer_Model]]

---

[[11_IPv6_Structure|⬅ 11]] · [[_MOC_Data_Communications_and_Networking|MOC]] · [[00_Dashboard|Dashboard]] · [[13_TCP_vs_UDP_and_Port_Numbers|13 ➡]]
