---
id: GEAS-06-05
title: "Network Passes, Float and Critical Path"
part: "03_GEAS"
area: "06_Engineering_Management_and_PM"
topic: 5
tier: 2
depth: full
problem_count: 4
prereqs: ["[[04_PERT_-_CPM_Fundamentals]]"]
tags: ["ece", "geas", "engineering_management_and_pm"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Network Passes, Float and Critical Path

> [!abstract] Scope
> Compute the forward and backward passes of a project network, read total, free, interfering and independent float from them, and identify the critical path and project duration.

## Core Concept

> [!tip] Intuition
> The forward pass asks 'how early can this start?' and the backward pass asks 'how late can this finish?'. Float is the gap between the two answers, and the critical path is where that gap closes to zero.

**The two passes.** The **forward pass** sweeps left to right: start activities get $ES = 0$, every activity finishes at $EF = ES + t$, and any activity with several predecessors starts at the *largest* predecessor finish, $ES = \max(EF_{\mathrm{pred}})$. The largest $EF$ in the network is the project duration. The **backward pass** sweeps right to left: the last activities are given $LF$ equal to the project duration, each activity starts at $LS = LF - t$, and any activity with several successors finishes at the *smallest* successor $LS$, $LF = \min(LS_{\mathrm{succ}})$. Using the smallest successor late-start is what makes the backward pass conservative; using the largest is the classic computational error.

**Four kinds of float.** **Total float** $TF = LS - ES = LF - EF$ is how long the activity can slip without delaying the project. **Free float** $FF = \min(ES_{\mathrm{succ}}) - EF$ is how long it can slip without delaying *any* successor's early start. **Interfering float** is the difference, $TF - FF$, and it can be consumed only by pushing successors off their early starts — it never delays the project but it does cost a successor its own float. **Independent float**, $\max(0,\ \min(ES_{\mathrm{succ}}) - LF)$, is the slack available even if the activity starts as late as possible and successors start as early as possible; it is the only float that is nobody else's. Activities with $TF = 0$ form the **critical path** — the longest path through the network — and a network may have more than one critical path.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Early start of a start activity | $ES = 0$ | Or day 1 in some day-count conventions; keep one convention for the whole problem. |
| Early finish | $EF = ES + t$ | The activity occupies t periods, so an ES of 4 with t = 3 finishes at 7. |
| Early start from predecessors | $ES = \max\left(EF_{\mathrm{pred}}\right)$ | Use the largest, not the smallest; the merger node is where this rule bites. |
| Project duration | $T = \max\left(EF\right) = \max_{\mathrm{paths}} \sum t$ | The longest path, which need not be the path with the most activities. |
| Late finish of a terminal activity | $LF = T$ | Anchors the backward pass at the computed project duration, not at an assumed value. |
| Late finish from successors | $LF = \min\left(LS_{\mathrm{succ}}\right)$ | The smallest successor late start; using the largest is the standard backward-pass error. |
| Late start | $LS = LF - t$ | Mirror of EF = ES + t; applies in the same time units. |
| Total float | $TF = LS - ES = LF - EF$ | Slip that does not delay the project; zero total float defines a critical activity. |
| Free float | $FF = \min\left(ES_{\mathrm{succ}}\right) - EF$ | Uses successors' *early* starts; for a terminal activity use the project duration in place of successor ES. |
| Interfering float | $IF = TF - FF$ | Float that delays a successor's early start without delaying the project. |
| Independent float | $IF_{\mathrm{ind}} = \max\left(0,\ \min(ES_{\mathrm{succ}}) - LF\right)$ | Floored at zero; the only float that is unaffected by late predecessors or early successors. |
| Critical path condition | $TF = 0\ \mathrm{for\ every\ activity\ on\ it}$ | A path can be long but not critical if it has float; two paths can both be critical. |

## Interactive Widget

**CPM Network Solver**

![[CPM_Network_Solver.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A project has activities A(4), B(6), C(3), D(3) and E(7) days. A and B start the project; C follows A; D follows both A and B; E follows both C and D. Perform the forward pass and state the project duration.

**Given:** A = 4, no predecessors; B = 6, no predecessors; C = 3, after A; D = 3, after A and B; E = 7, after C and D

**Solution:**

1. Start activities: ES_A = 0 so EF_A = 4; ES_B = 0 so EF_B = 6
2. C has one predecessor: ES_C = EF_A = 4, EF_C = 4 + 3 = 7
3. D is a merger: ES_D = max(EF_A, EF_B) = max(4, 6) = 6, EF_D = 6 + 3 = 9
4. E is a merger: ES_E = max(EF_C, EF_D) = max(7, 9) = 9, EF_E = 9 + 7 = 16
5. Project duration = max(EF) = 16 days

> [!success]- Answer
> **$ES/EF = A(0,4), B(0,6), C(4,7), D(6,9), E(9,16)$; duration $16$ days.**

> [!warning] Trap
> Taking ES_D = EF_A = 4 instead of the maximum of A and B. D waits for both predecessors, so B's later finish of 6 controls, and the error shortens D and E by 2 days.

### P2. For the same network (A = 4, B = 6, C = 3 after A, D = 3 after A and B, E = 7 after C and D, duration 16 days), perform the backward pass and give LF and LS for every activity.

**Given:** project duration = 16 days; same precedence as the forward-pass problem

**Solution:**

1. Terminal activity E: LF_E = 16, LS_E = 16 - 7 = 9
2. E is the only successor of both C and D: LF_C = LF_D = LS_E = 9
3. LS_C = 9 - 3 = 6 and LS_D = 9 - 3 = 6
4. A has two successors, C and D: LF_A = min(LS_C, LS_D) = min(6, 6) = 6, LS_A = 6 - 4 = 2
5. B has one successor, D: LF_B = LS_D = 6, LS_B = 6 - 6 = 0

> [!success]- Answer
> **$LF/LS = A(6,2), B(6,0), C(9,6), D(9,6), E(16,9)$.**

> [!warning] Trap
> Using the largest successor LS for A. The backward pass always takes the minimum successor late start; taking the maximum pushes the late dates out and manufactures float that does not exist.

### P3. Using the completed passes of the same network, compute the total float and free float of A, B, C and D, and identify the critical path.

**Given:** ES/EF = A(0,4), B(0,6), C(4,7), D(6,9), E(9,16); LS/LF = A(2,6), B(0,6), C(6,9), D(6,9), E(9,16)

**Solution:**

1. A: TF = LS - ES = 2 - 0 = 2; FF = min(ES_C, ES_D) - EF_A = min(4, 6) - 4 = 0
2. B: TF = 0 - 0 = 0; FF = ES_D - EF_B = 6 - 6 = 0
3. C: TF = 6 - 4 = 2; FF = ES_E - EF_C = 9 - 7 = 2
4. D: TF = 6 - 6 = 0; FF = ES_E - EF_D = 9 - 9 = 0
5. Zero total float runs through B, D and E, so the critical path is B-D-E with duration 16 days

> [!success]- Answer
> **$TF$: A = 2, B = 0, C = 2, D = 0; $FF$: A = 0, B = 0, C = 2, D = 0. Critical path B-D-E, 16 days.**

> [!warning] Trap
> Reading A's total float of 2 as 'A is safe for any purpose'. A's free float is 0, so a 1-day slip of A immediately moves C's early start; A's float is interfering float that belongs partly to C.

### P4. Activity A (duration 4, total float 2) is delayed by 3 days. What is the new project duration, and what would the answer have been for a 2-day delay?

**Given:** A original duration = 4 days; TF_A = 2 days; FF_A = 0; critical path B-D-E = 16 days

**Solution:**

1. A 2-day delay makes EF_A = 4 + 2 = 6, so ES_C = 6, EF_C = 9 and ES_D = max(6, 6) = 6, EF_D = 9
2. ES_E = max(EF_C, EF_D) = max(9, 9) = 9, so EF_E = 16 — unchanged
3. A 3-day delay makes EF_A = 7, so ES_C = 7, EF_C = 10 and ES_D = max(7, 6) = 7, EF_D = 10
4. ES_E = max(10, 10) = 10 and EF_E = 10 + 7 = 17 — the project is late by 1 day
5. Consuming float beyond TF_A = 2 delays the project by the excess, 3 - 2 = 1 day

> [!success]- Answer
> **A 2-day delay leaves the duration at 16 days; a 3-day delay extends it to 17 days.**

> [!warning] Trap
> Assuming any delay inside the total float is harmless to the network's dates. The project finish is protected only up to TF = 2, and even a 1-day slip already moves C's early start because A's free float is 0.

## Traps & Exam Notes

- **Taking the maximum successor late start in the backward pass.** $LF = \min(LS_{\mathrm{succ}})$; using the largest creates float that does not exist and hides the true critical path.
- **Using $LS - EF$ for total float.** Total float is $LS - ES$, equivalently $LF - EF$; mixing the two formulas gives $t + TF$ and misclassifies critical activities.
- **Computing free float from successors' late starts.** Free float uses the *early* start of successors, $\min(ES_{\mathrm{succ}}) - EF$, so it can never exceed total float.
- **Treating total float as free to use.** An activity with $TF = 2$ and $FF = 0$ shares its float with successors; consuming it silently removes their float even though the project date survives.
- **Picking the longest path by counting activities.** The critical path is the largest sum of durations, not the path with the most activities; a two-activity path can beat a four-activity path.

## See Also

- [[04_PERT_-_CPM_Fundamentals]]
- [[06_Project_Crashing_and_Time-Cost_Tradeoff]]

---

[[04_PERT_-_CPM_Fundamentals|⬅ 04]] · [[_MOC_Engineering_Management_and_PM|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Project_Crashing_and_Time-Cost_Tradeoff|06 ➡]]
