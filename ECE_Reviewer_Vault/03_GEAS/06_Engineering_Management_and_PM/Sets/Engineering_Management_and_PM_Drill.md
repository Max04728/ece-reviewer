---
title: "Engineering Management and PM — Drill"
type: drill
area: 06_Engineering_Management_and_PM
part: 03_GEAS
seed: 1
count: 8
pool: 12
updated: 2026-09-23
---

# Engineering Management and PM — Practice Drill

**8 problems** drawn from a pool of 12 across 3 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 06_Engineering_Management_and_PM --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A project has two paths: activities A then B, and activities C then D. Their three-point estimates are A(3, 6, 9), B(3, 9, 15), C(1, 4, 7) and D(6, 9, 12) days. Find the expected project duration and the probability of finishing within 17 days.

**Given:** A(3, 6, 9); B(3, 9, 15); C(1, 4, 7); D(6, 9, 12); target T_S = 17 days

> [!success]- Answer
> **$T_E = 15$ days; $P(\text{finish within } 17) \approx 81\%$.**

> [!warning] Trap
> Adding all four activity variances (1+4+1+1 = 7), which gives sigma_p = 2.65, Z = 0.75 and only 77.5%. Project variance includes critical-path activities only.

<sub>from GEAS-06-04</sub>

### 2. For the same network (A = 4, B = 6, C = 3 after A, D = 3 after A and B, E = 7 after C and D, duration 16 days), perform the backward pass and give LF and LS for every activity.

**Given:** project duration = 16 days; same precedence as the forward-pass problem

> [!success]- Answer
> **$LF/LS = A(6,2), B(6,0), C(9,6), D(9,6), E(16,9)$.**

> [!warning] Trap
> Using the largest successor LS for A. The backward pass always takes the minimum successor late start; taking the maximum pushes the late dates out and manufactures float that does not exist.

<sub>from GEAS-06-05</sub>

### 3. Activity A (duration 4, total float 2) is delayed by 3 days. What is the new project duration, and what would the answer have been for a 2-day delay?

**Given:** A original duration = 4 days; TF_A = 2 days; FF_A = 0; critical path B-D-E = 16 days

> [!success]- Answer
> **A 2-day delay leaves the duration at 16 days; a 3-day delay extends it to 17 days.**

> [!warning] Trap
> Assuming any delay inside the total float is harmless to the network's dates. The project finish is protected only up to TF = 2, and even a 1-day slip already moves C's early start because A's free float is 0.

<sub>from GEAS-06-05</sub>

### 4. An activity has a normal time of 10 days at a normal cost of P20,000. It can be crashed to 6 days at a cost of P28,000. Find the crash cost per period and the maximum time that can be bought.

**Given:** T_n = 10 days; C_n = P20,000; T_c = 6 days; C_c = P28,000

> [!success]- Answer
> **P2,000 per day, with up to 4 days available.**

> [!warning] Trap
> Forming the ratio as (C_c - C_n)/(T_c - T_n) = 8,000/(-4) = -P2,000 per day. The denominator must be normal time minus crash time so the slope is positive.

<sub>from GEAS-06-06</sub>

### 5. Using the completed passes of the same network, compute the total float and free float of A, B, C and D, and identify the critical path.

**Given:** ES/EF = A(0,4), B(0,6), C(4,7), D(6,9), E(9,16); LS/LF = A(2,6), B(0,6), C(6,9), D(6,9), E(9,16)

> [!success]- Answer
> **$TF$: A = 2, B = 0, C = 2, D = 0; $FF$: A = 0, B = 0, C = 2, D = 0. Critical path B-D-E, 16 days.**

> [!warning] Trap
> Reading A's total float of 2 as 'A is safe for any purpose'. A's free float is 0, so a 1-day slip of A immediately moves C's early start; A's float is interfering float that belongs partly to C.

<sub>from GEAS-06-05</sub>

### 6. A project has activities A(4), B(6), C(3), D(3) and E(7) days. A and B start the project; C follows A; D follows both A and B; E follows both C and D. Perform the forward pass and state the project duration.

**Given:** A = 4, no predecessors; B = 6, no predecessors; C = 3, after A; D = 3, after A and B; E = 7, after C and D

> [!success]- Answer
> **$ES/EF = A(0,4), B(0,6), C(4,7), D(6,9), E(9,16)$; duration $16$ days.**

> [!warning] Trap
> Taking ES_D = EF_A = 4 instead of the maximum of A and B. D waits for both predecessors, so B's later finish of 6 controls, and the error shortens D and E by 2 days.

<sub>from GEAS-06-05</sub>

### 7. A project has two parallel critical paths. The cheapest crashable activity on path 1 has a slope of P1,500 per day (2 days available) and on path 2 a slope of P900 per day (2 days available). Find the cost of shortening the project by 1 day and by 2 days.

**Given:** path 1 cheapest slope = P1,500/day, 2 days available; path 2 cheapest slope = P900/day, 2 days available; both paths critical

> [!success]- Answer
> **P2,400 for one day, P4,800 for two days.**

> [!warning] Trap
> Crashing only the P900 activity and expecting the project to shorten. With two critical paths, the un-crashed path still fixes the duration, so the slopes must be added.

<sub>from GEAS-06-06</sub>

### 8. A project's critical path is 12 days with a normal direct cost of P60,000. Indirect cost is P3,000 per day. Activity X on the critical path can be crashed at P2,000 per day for up to 3 days; activity Y at P4,000 per day for up to 2 days. Find the optimum duration and the minimum total cost.

**Given:** T_normal = 12 days; C_direct normal = P60,000; indirect = P3,000/day; X slope = P2,000/day, max 3 days; Y slope = P4,000/day, max 2 days

> [!success]- Answer
> **Optimum duration 9 days, minimum total cost P93,000.**

> [!warning] Trap
> Assuming the optimum is the shortest duration. Crashing Y past 9 days adds P4,000 of direct cost to save only P3,000 of overhead, so total cost rises to P94,000.

<sub>from GEAS-06-06</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| GEAS-06-04 | PERT/CPM Fundamentals | 4 |
| GEAS-06-05 | Network Passes, Float and Critical Path | 4 |
| GEAS-06-06 | Project Crashing and Time-Cost Tradeoff | 4 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
