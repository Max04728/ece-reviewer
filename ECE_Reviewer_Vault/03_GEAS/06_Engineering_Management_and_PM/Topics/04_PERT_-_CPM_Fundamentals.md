---
id: GEAS-06-04
title: "PERT/CPM Fundamentals"
part: "03_GEAS"
area: "06_Engineering_Management_and_PM"
topic: 4
tier: 2
depth: full
problem_count: 4
prereqs: ["[[01_Management_Functions_and_Organizational_Structures]]"]
tags: ["ece", "geas", "engineering_management_and_pm"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — PERT/CPM Fundamentals

> [!abstract] Scope
> How PERT's three-point beta estimate becomes an expected activity time and variance, how activity-on-arrow and activity-on-node networks represent the same logic, and how to attach a probability to a project completion date.

## Core Concept

> [!tip] Intuition
> CPM treats every activity as a known single duration; PERT admits the duration is uncertain and replaces it with a weighted average, so the project stops being one number and becomes a distribution with a mean and a spread.

**Two networks, one logic.** In **activity-on-arrow (AOA)** the arrow is the activity and the node is an *event* — a point in time where activities start or finish. Because two activities that share the same start and finish nodes cannot be told apart in AOA, a **dummy activity** (zero duration, zero resource) is inserted to carry the logic. In **activity-on-node (AON)**, also called the precedence diagramming method, the node is the activity and the arrows only show precedence; no dummies are needed, which is why AON is the default for computation and AOA is the default when the examiner asks you to draw or interpret an arrow diagram.

**The three-point estimate.** PERT asks for three durations per activity: the optimistic $a$ (everything goes right), the most likely $m$ (the mode), and the pessimistic $b$ (everything that can go wrong, short of a catastrophe). The activity duration is modelled as a **beta distribution** on $[a,b]$, and PERT uses its mean and variance. The expected duration is $t_e = \dfrac{a+4m+b}{6}$ and the variance is:
$$\sigma^2 = \left(\dfrac{b-a}{6}\right)^2$$
The mean is a weighted average that gives the most likely value four times the weight of either extreme; the standard deviation is simply one-sixth of the range, so a wider range means more uncertainty.

**From activities to the project.** The expected project duration is the sum of the $t_e$ values **along the critical path only**, and the project variance is the sum of those same critical activities' variances:
$$\sigma_p^2 = \sum \sigma_i^2$$
on the critical path. Because the sum of many independent activity times is approximately normal, the probability of finishing by a target date $T_S$ comes from the standard normal table using $Z = \dfrac{T_S - T_E}{\sigma_p}$. Adding the variances of *non-critical* activities inflates $\sigma_p$ and understates the risk — the critical path, not the whole network, is what determines the completion date.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Expected activity time | $t_e = \frac{a + 4m + b}{6}$ | PERT beta weighted mean; a, m, b must share one time unit (days, weeks) before substituting. |
| Activity variance | $\sigma^2 = \left(\frac{b-a}{6}\right)^2$ | Depends only on the range; a narrow range means the estimate is trusted, not that it is small. |
| Activity standard deviation | $\sigma = \frac{b-a}{6}$ | One-sixth of the range; take the square root of the variance if you computed variance first. |
| Symmetric estimate shortcut | $t_e = m \iff b - m = m - a$ | Only in the symmetric case does the PERT mean equal the most likely time; do not assume it in general. |
| Expected project duration | $T_E = \sum_{\mathrm{critical}} t_e$ | Sum along the critical path only; summing all activities gives a meaningless large number. |
| Project variance | $\sigma_p^2 = \sum_{\mathrm{critical}} \sigma_i^2$ | Variances add, standard deviations do not; including non-critical activities overstates the spread. |
| Project standard deviation | $\sigma_p = \sqrt{\sigma_p^2}$ | Required before any probability statement; report it in the same unit as the durations. |
| Completion probability | $Z = \frac{T_S - T_E}{\sigma_p}$ | Then read the normal table; a negative Z means the target date is earlier than the expected duration. |
| AOA convention | $\mathrm{arrow} = \mathrm{activity},\ \mathrm{node} = \mathrm{event}$ | Two activities cannot share both nodes without a dummy to distinguish them. |
| AON convention | $\mathrm{node} = \mathrm{activity},\ \mathrm{arrow} = \mathrm{precedence}$ | Precedence diagramming method; no dummy activities are needed. |
| Dummy activity | $t = 0,\ \mathrm{resource} = 0$ | Exists only to enforce logic in AOA; it must never be given a duration or a cost. |
| CPM vs PERT | $\mathrm{deterministic} \mid \mathrm{probabilistic}$ | CPM uses one known duration and emphasizes time-cost tradeoff; PERT uses three estimates and emphasizes uncertainty. |

## Worked Problems

### P1. An activity has optimistic time $a = 4$ days, most likely time $m = 6$ days and pessimistic time $b = 14$ days. Find its expected time, variance and standard deviation under PERT.

**Given:** a = 4 days; m = 6 days; b = 14 days

**Solution:**

1. t_e = (a + 4m + b)/6 = (4 + 4(6) + 14)/6
2. = (4 + 24 + 14)/6 = 42/6 = 7 days
3. Variance = ((b - a)/6)^2 = ((14 - 4)/6)^2 = (10/6)^2 = 2.778 days^2
4. Standard deviation = (b - a)/6 = 10/6 = 1.667 days

> [!success]- Answer
> **$t_e = 7$ days, $\sigma^2 = 2.78$ days$^2$, $\sigma = 1.67$ days.**

> [!warning] Trap
> Giving the optimistic time a and the most likely time m equal weight. The weight is 1-4-1, so a=4, m=6, b=14 gives 7, not the plain average 8.

### P2. Three activities lie on the critical path with expected times 6, 10 and 4 weeks and variances 1, 4 and 1 week$^2$. Find the expected project duration, its standard deviation, and the probability of finishing within 24 weeks.

**Given:** t_A = 6, sigma^2_A = 1; t_B = 10, sigma^2_B = 4; t_C = 4, sigma^2_C = 1; target T_S = 24 weeks

**Solution:**

1. T_E = 6 + 10 + 4 = 20 weeks
2. Project variance = 1 + 4 + 1 = 6 week^2
3. sigma_p = sqrt(6) = 2.449 weeks
4. Z = (T_S - T_E)/sigma_p = (24 - 20)/2.449 = 1.63
5. From the normal table, P(Z <= 1.63) = 0.9484

> [!success]- Answer
> **Expected duration 20 weeks, $\sigma_p = 2.45$ weeks, probability of finishing within 24 weeks $\approx 94.8\%$.**

> [!warning] Trap
> Averaging the activity variances (or adding the standard deviations to get 4). Variances add and the square root is taken last: sqrt(1+4+1) = 2.45, not 1+2+1.

### P3. An activity has $a = 2$, $m = 5$, $b = 8$ days. Find $t_e$, $\sigma$ and $\sigma^2$, and state why the same value would appear for a deterministic CPM duration of 5 days.

**Given:** a = 2 days; m = 5 days; b = 8 days

**Solution:**

1. t_e = (2 + 4(5) + 8)/6 = (2 + 20 + 8)/6 = 30/6 = 5 days
2. The estimate is symmetric: b - m = 8 - 5 = 3 and m - a = 5 - 2 = 3
3. sigma = (b - a)/6 = (8 - 2)/6 = 1 day, so sigma^2 = 1 day^2
4. Because the mode sits at the midpoint of the range, the beta mean coincides with m = 5, matching the CPM single-point duration

> [!success]- Answer
> **$t_e = 5$ days, $\sigma = 1$ day, $\sigma^2 = 1$ day$^2$; the PERT mean equals the most likely time only in this symmetric case.**

> [!warning] Trap
> Concluding that PERT always returns the most likely time. It equals m only when b - m = m - a; a skewed estimate such as a=4, m=6, b=14 gives 7, not 6.

### P4. A project has two paths: activities A then B, and activities C then D. Their three-point estimates are A(3, 6, 9), B(3, 9, 15), C(1, 4, 7) and D(6, 9, 12) days. Find the expected project duration and the probability of finishing within 17 days.

**Given:** A(3, 6, 9); B(3, 9, 15); C(1, 4, 7); D(6, 9, 12); target T_S = 17 days

**Solution:**

1. t_A = (3+24+9)/6 = 6, sigma^2_A = ((9-3)/6)^2 = 1
2. t_B = (3+36+15)/6 = 9, sigma^2_B = ((15-3)/6)^2 = 4
3. t_C = (1+16+7)/6 = 4, sigma^2_C = ((7-1)/6)^2 = 1
4. t_D = (6+36+12)/6 = 9, sigma^2_D = ((12-6)/6)^2 = 1
5. Path A-B = 6 + 9 = 15 days; path C-D = 4 + 9 = 13 days, so A-B is critical with T_E = 15 days
6. Project variance = 1 + 4 = 5 (critical path only), sigma_p = sqrt(5) = 2.236 days
7. Z = (17 - 15)/2.236 = 0.894, and P(Z <= 0.89) = 0.813

> [!success]- Answer
> **$T_E = 15$ days; $P(\mathrm{finish\ within\ } 17) \approx 81\%$.**

> [!warning] Trap
> Adding all four activity variances (1+4+1+1 = 7), which gives sigma_p = 2.65, Z = 0.75 and only 77.5%. Project variance includes critical-path activities only.

## Traps & Exam Notes

- **Using a plain arithmetic average of a, m and b.** The PERT weights are 1-4-1: (a + 4m + b)/6. For a=4, m=6, b=14 the correct answer is 7 days, while the plain mean gives 8.
- **Adding all activity variances instead of the critical path's.** Non-critical activities do not determine the completion date; including them inflates $\sigma_p$ and makes the project look riskier than it is.
- **Adding standard deviations rather than variances.** Variances are additive, standard deviations are not: $\sqrt{1+4+1} = 2.45$, not $1+2+1 = 6$.
- **Assigning a duration or cost to a dummy activity.** A dummy in AOA has $t = 0$ and consumes nothing; it exists purely to enforce precedence logic.
- **Assuming the PERT mean equals the most likely time $m$.** That holds only when $b - m = m - a$; a skewed range such as a=4, m=6, b=14 gives $t_e = 7$ days.

## See Also

- [[05_Network_Passes,_Float_and_Critical_Path]]
- [[06_Project_Crashing_and_Time-Cost_Tradeoff]]

---

[[03_ISO_9001_Overview|⬅ 03]] · [[_MOC_Engineering_Management_and_PM|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Network_Passes,_Float_and_Critical_Path|05 ➡]]
