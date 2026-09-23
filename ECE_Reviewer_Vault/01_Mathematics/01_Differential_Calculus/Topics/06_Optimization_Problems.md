---
id: MATH-01-06
title: "Optimization Problems"
part: "01_Mathematics"
area: "01_Differential_Calculus"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Extrema,_Concavity_and_Inflection]]"]
tags: ["ece", "mathematics", "differential_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Optimization Problems

> [!abstract] Scope
> Translate word problems into a single-variable function, then maximise or minimise it with calculus.

## Core Concept

> [!tip] Intuition
> Optimisation is a two-part skill: the calculus is easy, the setup is the whole problem. Your job is to spend one unknown, using a constraint, so that the quantity you want depends on exactly one variable.

**The five-step method.** (1) Identify the quantity to optimise and write its formula. (2) Identify the constraint — the fixed perimeter, area, volume or budget. (3) Use the constraint to eliminate all but one variable. (4) Differentiate, set to zero, and solve. (5) Verify it is the required type of extremum (first or second derivative test) and answer the question actually asked, including units.

**The constraint is what makes it solvable.** Without a constraint the problem has no unique answer: a rectangle of area 100 can have any perimeter you like. The constraint is the second equation that lets you eliminate variables. If you find yourself with two unknowns after differentiating, you skipped step 3.

**Which variable to eliminate.** Choose the one that makes the resulting function simplest. In a fixed-perimeter rectangle, express the length in terms of the width rather than introducing a square root. In problems with a square root in the objective, sometimes minimising the *square* of the objective is equivalent and far easier — valid whenever the objective is non-negative.

**Closed-interval versus open-domain problems.** If the physical domain is a closed interval, compare against endpoints as well, and be alert to the degenerate case where the optimum sits at a boundary (a minimum area of zero, for instance). If the domain is open, the second derivative test confirms you found the interior optimum.

**Always answer the question asked.** Many problems require the *dimensions*, the *maximum value*, or the *cost*, not just the location of the optimum. Reporting $x = 5$ when the question asked for the largest possible area is a full-credit loss on an otherwise correct solution.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Objective + constraint | $\mathrm{optimise\ } f(x) \quad \mathrm{subject\ to\ } g(x,y)=k$ | Two equations are required. One alone cannot determine an optimum. |
| Fixed perimeter rectangle | $2x + 2y = P \Rightarrow y = \tfrac{P}{2} - x$ | Eliminate y before writing the area. |
| Maximum area for fixed perimeter | $A = x\left(\tfrac{P}{2}-x\right) \Rightarrow x = \tfrac{P}{4}$ | A square. Verify with A'' = -2 < 0. |
| Minimum distance to a curve | $D^2 = (x-a)^2 + (y-b)^2$ | Minimise D^2 instead of D - same x, no square roots. |
| Fixed volume, minimise surface | $V = \pi r^2 h = \mathrm{const} \Rightarrow h = \tfrac{V}{\pi r^2}$ | Cylinder: eliminating h first is much easier than eliminating r. |
| Cylinder surface area | $S = 2\pi r^2 + 2\pi r h$ | Two circular ends plus the lateral band. Omitting an end is a classic error. |
| Optimum check | $f''(x^*) > 0 \Rightarrow \mathrm{min}, \quad f''(x^*) < 0 \Rightarrow \mathrm{max}$ | State which test you used. |

## Worked Problems

### P1. A rectangle has perimeter 40 m. Find the dimensions that maximise its area.

**Given:** P = 40 m

**Solution:**

1. Constraint: 2x + 2y = 40, so y = 20 - x
2. Objective: A = xy = x(20 - x) = 20x - x^2
3. A' = 20 - 2x = 0 gives x = 10, so y = 10
4. A'' = -2 < 0, confirming a maximum

> [!success]- Answer
> **$10 \times 10$ m square, area $100$ m².**

> [!warning] Trap
> Introducing two variables and setting both partial derivatives - unnecessary, and the constraint must first reduce the problem to one variable.

### P2. Find two positive numbers whose sum is 20 and whose product is as large as possible.

**Given:** sum = 20; both positive

**Solution:**

1. Constraint: x + y = 20, so y = 20 - x
2. Product: P = x(20 - x) = 20x - x^2
3. P' = 20 - 2x = 0 gives x = 10, y = 10
4. P'' = -2 < 0, a maximum

> [!success]- Answer
> **$x = y = 10$, maximum product $100$.**

> [!warning] Trap
> Reporting only x = 10 when the question asks for both numbers.

### P3. A cylindrical can must hold 1000 cm³. Find the radius that minimises the surface area.

**Given:** V = 1000 cm³

**Solution:**

1. Constraint: pi r^2 h = 1000, so h = 1000/(pi r^2)
2. Surface: S = 2 pi r^2 + 2 pi r h = 2 pi r^2 + 2000/r
3. S' = 4 pi r - 2000/r^2 = 0 gives 4 pi r^3 = 2000
4. r^3 = 500/pi, so r = (500/pi)^(1/3) ~= 5.42 cm

> [!success]- Answer
> **$r = \sqrt[3]{500/\pi} \approx 5.42$ cm (with $h = 2r$).**

> [!warning] Trap
> Forgetting one of the two circular ends in S, which shifts the optimum and breaks the h = 2r result.

### P4. Find the point on the line $y = 2x + 3$ closest to the origin.

**Given:** line y = 2x + 3; target point (0,0)

**Solution:**

1. Minimise D^2 = x^2 + y^2 subject to y = 2x + 3
2. Substitute: D^2 = x^2 + (2x+3)^2 = 5x^2 + 12x + 9
3. d/dx = 10x + 12 = 0 gives x = -6/5
4. y = 2(-6/5) + 3 = 3/5

> [!success]- Answer
> **$\left(-\dfrac{6}{5}, \dfrac{3}{5}\right)$, distance $\dfrac{3\sqrt{5}}{5}$.**

> [!warning] Trap
> Minimising D rather than D^2 makes the derivative messy and risks algebra errors; the minimum occurs at the same x either way.

### P5. A farmer has 100 m of fencing and wants to enclose a rectangular field along a straight river (no fence needed on the river side). Find the maximum area.

**Given:** 100 m of fence; three sides only

**Solution:**

1. Constraint: 2y + x = 100 where x is parallel to the river and y are the two ends
2. Then x = 100 - 2y
3. Area: A = xy = (100 - 2y)y = 100y - 2y^2
4. A' = 100 - 4y = 0 gives y = 25, x = 50
5. A'' = -4 < 0, a maximum

> [!success]- Answer
> **$50 \times 25$ m, maximum area $1250$ m².**

> [!warning] Trap
> Using 2x + 2y = 100 as if all four sides needed fencing. Read which sides are free.

## Traps & Exam Notes

- **Not using the constraint.** After differentiating you must have exactly one variable. Two variables left means an equation was ignored.
- **Answering the wrong question.** Asked for maximum area, students report x. State every quantity requested with its unit.
- **Skipping the extremum test.** An equation $f'=0$ can give a minimum when a maximum is wanted. One line of justification is expected.
- **Missing a side or a face.** Open-top boxes, fence-free river sides and cans with or without lids change the objective function and the optimum.
- **Minimising $D$ instead of $D^2$.** Both give the same location, but $D^2$ avoids the square root and is far less error-prone.
- **Ignoring the physical domain.** A length cannot be negative; a radius must be positive. Check the optimum lies in the admissible range and check endpoints when the domain is closed.

## See Also

- [[05_Extrema,_Concavity_and_Inflection]]
- [[03_Implicit,_Parametric_and_Logarithmic_Differentiation]]
- [[04_Related_Rates]]

---

[[05_Extrema,_Concavity_and_Inflection|⬅ 05]] · [[_MOC_Differential_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Differentials_and_Error_Propagation|07 ➡]]
