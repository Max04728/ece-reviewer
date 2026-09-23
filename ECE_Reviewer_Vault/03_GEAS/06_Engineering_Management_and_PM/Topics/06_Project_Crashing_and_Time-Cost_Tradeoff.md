---
id: GEAS-06-06
title: "Project Crashing and Time-Cost Tradeoff"
part: "03_GEAS"
area: "06_Engineering_Management_and_PM"
topic: 6
tier: 2
depth: full
problem_count: 4
prereqs: ["[[05_Network_Passes,_Float_and_Critical_Path]]"]
tags: ["ece", "geas", "engineering_management_and_pm"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Project Crashing and Time-Cost Tradeoff

> [!abstract] Scope
> Compute crash cost per period from normal and crash data, shorten a project by crashing only critical activities, and find the duration that minimizes the sum of direct and indirect cost.

## Core Concept

> [!tip] Intuition
> Crashing buys time with money at a fixed price per day — the cost slope. Since indirect cost falls as the project shortens, the optimum is where the next cheapest day of crashing costs more than the day of overhead it saves.

**Cost slope and the crashing rule.** Every activity has a **normal point** (normal time $T_n$, normal cost $C_n$) and a **crash point** (the shortest feasible time $T_c$ and its higher cost $C_c$). The **crash cost per period** is $\dfrac{C_c - C_n}{T_n - T_c}$, the price of buying one period on that activity; the maximum time that can be bought is $T_n - T_c$. Crashing is only ever applied to activities **on the critical path**, and among those you always buy the cheapest slope first, because shortening a non-critical activity changes nothing but the cost.

**Why the procedure is iterative, not a single calculation.** The moment you crash an activity, the network changes: a **new critical path** can appear, a near-critical path can run out of float, and if two critical paths exist in parallel then shortening the project by one period requires shortening **both** paths, so the effective cost slope is the sum of the cheapest slope on each parallel path. The stopping rule comes from the cost side: keep crashing while the marginal slope is **less than the indirect (overhead) cost per period**, and stop as soon as the next available slope exceeds it. Total cost is direct cost plus indirect cost:
$$C = C_{\mathrm{direct}} + r_{\mathrm{indirect}} \times T$$
The optimum duration is the minimum of that curve — not the crash time of every activity.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Crash cost per period | $s = \frac{C_c - C_n}{T_n - T_c}$ | Price of one period bought on that activity; the denominator is (normal time - crash time), so the slope is positive. |
| Maximum crash available | $\Delta t_{\max} = T_n - T_c$ | An activity cannot be shortened past its crash time no matter how much is spent. |
| Cost of a partial crash | $\Delta C = s \times (\mathrm{periods\ crashed})$ | Crashing is priced linearly between the two points; 2 of an available 4 days costs 2s. |
| Direct cost after crashing | $C_{\mathrm{direct}} = \sum C_n + \sum s_i \, \Delta t_i$ | Only the crashed activities change cost; non-crashed activities stay at their normal cost. |
| Indirect cost | $C_{\mathrm{indirect}} = r_{\mathrm{indirect}} \times T$ | Overhead is charged per period, so shortening the project reduces it — this is what makes crashing worthwhile. |
| Total project cost | $C_{\mathrm{total}} = C_{\mathrm{direct}} + C_{\mathrm{indirect}}$ | Evaluate at each candidate duration; the minimum of this curve is the optimum, not the minimum duration. |
| Crashing stopping rule | $\mathrm{crash\ while}\ s_{\mathrm{available}} < r_{\mathrm{indirect}}$ | Equality is the break-even point; if the cheapest available slope exceeds the indirect rate, stop. |
| Parallel critical paths | $s_{\mathrm{effective}} = \sum_{\mathrm{paths}} s_{\mathrm{cheapest\ on\ that\ path}}$ | Two critical paths must both be shortened for the project to gain one period; the slopes add. |
| Crash only critical activities | $\Delta T_{\mathrm{project}} = 0\ \mathrm{if}\ TF > 0$ | Shortening a non-critical activity consumes its float and leaves the project finish unchanged. |
| Slope sign check | $C_c > C_n,\ T_c < T_n$ | Both inequalities must hold; a negative slope means the normal and crash points were swapped. |

## Worked Problems

### P1. An activity has a normal time of 10 days at a normal cost of P20,000. It can be crashed to 6 days at a cost of P28,000. Find the crash cost per period and the maximum time that can be bought.

**Given:** T_n = 10 days; C_n = P20,000; T_c = 6 days; C_c = P28,000

**Solution:**

1. Cost difference: C_c - C_n = 28,000 - 20,000 = P8,000
2. Time difference: T_n - T_c = 10 - 6 = 4 days
3. Crash cost per period = 8,000/4 = P2,000 per day
4. Maximum crash available = T_n - T_c = 4 days

> [!success]- Answer
> **P2,000 per day, with up to 4 days available.**

> [!warning] Trap
> Forming the ratio as (C_c - C_n)/(T_c - T_n) = 8,000/(-4) = -P2,000 per day. The denominator must be normal time minus crash time so the slope is positive.

### P2. Using the same activity (normal 10 days / P20,000; crash 6 days / P28,000, slope P2,000 per day), find the cost if the project needs 8 days for this activity, and state the cost of crashing it fully.

**Given:** slope = P2,000 per day; target time = 8 days; T_n = 10 days; T_c = 6 days

**Solution:**

1. Periods crashed = T_n - target = 10 - 8 = 2 days, which is within the 4-day limit
2. Added cost = 2 x P2,000 = P4,000
3. Crashed cost = P20,000 + P4,000 = P24,000
4. Full crash to 6 days adds 4 x P2,000 = P8,000, giving P28,000 — the stated crash cost, which checks the slope

> [!success]- Answer
> **P24,000 at 8 days; P28,000 if fully crashed to 6 days.**

> [!warning] Trap
> Charging the full crash cost P28,000 for a 2-day reduction. A partial crash costs slope x periods, and the full crash cost applies only at the crash time.

### P3. A project has two parallel critical paths. The cheapest crashable activity on path 1 has a slope of P1,500 per day (2 days available) and on path 2 a slope of P900 per day (2 days available). Find the cost of shortening the project by 1 day and by 2 days.

**Given:** path 1 cheapest slope = P1,500/day, 2 days available; path 2 cheapest slope = P900/day, 2 days available; both paths critical

**Solution:**

1. Both paths set the project duration, so one day of project reduction requires one day on each path
2. Effective slope for 1 day = 1,500 + 900 = P2,400 per day
3. For 2 days: 2 on path 1 (2 x 1,500 = P3,000) plus 2 on path 2 (2 x 900 = P1,800)
4. Total for 2 days = P3,000 + P1,800 = P4,800, which is 2 x P2,400

> [!success]- Answer
> **P2,400 for one day, P4,800 for two days.**

> [!warning] Trap
> Crashing only the P900 activity and expecting the project to shorten. With two critical paths, the un-crashed path still fixes the duration, so the slopes must be added.

### P4. A project's critical path is 12 days with a normal direct cost of P60,000. Indirect cost is P3,000 per day. Activity X on the critical path can be crashed at P2,000 per day for up to 3 days; activity Y at P4,000 per day for up to 2 days. Find the optimum duration and the minimum total cost.

**Given:** T_normal = 12 days; C_direct normal = P60,000; indirect = P3,000/day; X slope = P2,000/day, max 3 days; Y slope = P4,000/day, max 2 days

**Solution:**

1. Compare marginal slope with the indirect rate: X at P2,000 < P3,000 saves P1,000 per day, so crash X fully (3 days)
2. Y at P4,000 > P3,000 would lose P1,000 per day, so Y is never crashed
3. Optimum duration = 12 - 3 = 9 days
4. Direct cost = 60,000 + 3(2,000) = P66,000; indirect cost = 3,000 x 9 = P27,000; total = P93,000
5. Check the neighbours: at 12 days 60,000 + 36,000 = P96,000; at 10 days 64,000 + 30,000 = P94,000; at 8 days (Y crashed one day) 70,000 + 24,000 = P94,000

> [!success]- Answer
> **Optimum duration 9 days, minimum total cost P93,000.**

> [!warning] Trap
> Assuming the optimum is the shortest duration. Crashing Y past 9 days adds P4,000 of direct cost to save only P3,000 of overhead, so total cost rises to P94,000.

## Traps & Exam Notes

- **Crashing a non-critical activity.** It spends money and leaves the project duration unchanged until the activity's total float is exhausted. Only critical activities (and later, newly critical ones) shorten the project.
- **Shortening one of two parallel critical paths.** The other path still sets the duration; each period of real reduction costs the sum of the cheapest slopes on all parallel critical paths, not just the cheapest one overall.
- **Ignoring newly critical paths.** After a few days of crashing, a former near-critical path can become critical; further reduction must then be applied to both paths, and the effective slope jumps.
- **Inverting the slope ratio.** Using (crash time - normal time) in the denominator gives a negative cost per period; it must be (normal time - crash time) with (crash cost - normal cost) on top.
- **Choosing the shortest duration instead of the cheapest.** The optimum minimizes direct plus indirect cost, so crashing continues only while the next slope is below the indirect cost per period.

## See Also

- [[05_Network_Passes,_Float_and_Critical_Path]]
- [[04_PERT_-_CPM_Fundamentals]]

---

[[05_Network_Passes,_Float_and_Critical_Path|⬅ 05]] · [[_MOC_Engineering_Management_and_PM|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Lean_Startup_and_MVP|07 ➡]]
