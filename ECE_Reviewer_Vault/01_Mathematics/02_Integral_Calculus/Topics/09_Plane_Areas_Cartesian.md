---
id: MATH-02-09
title: "Plane Areas Cartesian"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 9
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Definite_Integrals_and_FTC]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Plane Areas Cartesian

> [!abstract] Scope
> Find the area between curves in Cartesian coordinates, including splitting at intersection points and integrating with respect to y.

## Core Concept

> [!tip] Intuition
> Area between curves is the integral of (upper curve minus lower curve). Most of the work is deciding which is on top where, and that question is answered by finding the intersections first.

**The formula and its precondition.** For continuous $f$ and $g$ with $f(x)\geq g(x)$ on $[a,b]$, the area between them is $\int_a^b [f(x)-g(x)]\,dx$. The condition that one curve stays above the other is essential: if they cross inside the interval, the difference changes sign and the integral no longer measures area. **Always find the intersection points first** and split the interval there.

**Getting the limits right.** There are two situations. If the limits are given, use them but still check whether the curves cross inside. If the limits are not given, they *are* the intersection points: solve $f(x) = g(x)$, and the outermost solutions become the bounds of integration. A question saying 'the region enclosed by' always implies the intersections are the limits.

**Integrating with respect to y.** When the curves are better described as functions of $y$ — a parabola opening sideways, for instance — integrate $\int_c^d [x_{\mathrm{right}}(y) - x_{\mathrm{left}}(y)]\,dy$. This is not a different method, just the same idea with the roles of the axes exchanged. Choosing the axis wisely can turn a problem that needs three separate integrals into a single one, which is the main exam advantage.

**Vertical strips versus horizontal strips.** The choice corresponds exactly to whether you integrate in $x$ or in $y$. Vertical strips (integrating $x$) require the top-bottom relationship to hold across the whole interval; horizontal strips (integrating $y$) require left-right. Whichever relationship is simpler usually determines the better choice.

**Beyond two curves.** With three or more curves, sketch the region and identify which pair forms the upper and lower boundary in each sub-interval. Split at every intersection point of any pair that bounds the region. The most common failure is assuming one pair of curves bounds the whole region when in fact the boundary passes from one curve to another partway across.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Area between curves (x) | $A = \int_a^b \left[f(x)-g(x)\right]dx, \quad f\geq g$ | Upper minus lower. Split at every crossing. |
| Area between curves (y) | $A = \int_c^d \left[x_R(y)-x_L(y)\right]dy$ | Right minus left. Use when curves are natural in y. |
| Area under a single curve | $A = \int_a^b f(x)\,dx, \quad f\geq 0$ | The special case g = 0. |
| Signed vs total area | $\mathrm{total} = \int_a^b \left\lvert f-g\right \rvertdx$ | Split wherever f - g changes sign. |
| Intersection points | $f(x)=g(x) \Rightarrow \mathrm{limits\ of\ integration}$ | Solve before integrating; these are usually the bounds. |
| Area with a curve crossing the axis | $A = \int_a^c (0-g) + \int_c^b (f-0)$ | Treat the axis as one of the curves. |
| Choosing the variable | $\int \left[y_{\mathrm{top}}-y_{\mathrm{bot}}\right]dx \ \mathrm{or}\ \int \left[x_R-x_L\right]dy$ | Pick whichever needs fewer splits. |

## Worked Problems

### P1. Find the area enclosed between $y = x^2$ and $y = x + 2$.

**Given:** parabola and line; limits from intersections

**Solution:**

1. Find intersections: x^2 = x + 2, so x^2 - x - 2 = 0, (x-2)(x+1) = 0, giving x = -1 and x = 2
2. Determine which is on top between them: at x = 0, line gives 2 and parabola gives 0, so the line is above
3. A = ∫_{-1}^{2} [(x+2) - x^2] dx
4. Antidifferentiate: [x^2/2 + 2x - x^3/3]_{-1}^{2}
5. At x=2: 2 + 4 - 8/3 = 10/3; at x=-1: 1/2 - 2 + 1/3 = -7/6
6. A = 10/3 + 7/6 = 20/6 + 7/6 = 27/6 = 9/2

> [!success]- Answer
> **$\dfrac{9}{2}$ square units**

> [!warning] Trap
> Integrating x^2 - (x+2) instead, which gives -9/2. Area is never negative - a negative result means the order of subtraction is wrong.

### P2. Find the area bounded by $y = x^3$ and $y = x$.

**Given:** curves cross at three points; two separate regions

**Solution:**

1. Intersections: x^3 = x, so x(x^2-1) = 0, giving x = -1, 0, 1
2. On (-1,0), test x = -0.5: x^3 = -0.125 and x = -0.5, so x^3 > x and the cubic is on top
3. On (0,1), test x = 0.5: x^3 = 0.125 and x = 0.5, so x is on top
4. A = ∫_{-1}^{0}(x^3 - x)dx + ∫_{0}^{1}(x - x^3)dx
5. First: [x^4/4 - x^2/2]_{-1}^{0} = 0 - (1/4 - 1/2) = 1/4
6. Second by symmetry: also 1/4
7. Total = 1/2

> [!success]- Answer
> **$\dfrac{1}{2}$ square units**

> [!warning] Trap
> Integrating ∫_{-1}^{1}(x^3 - x)dx in one piece, which gives 0 by odd symmetry. The two lobes have opposite signed area; total area requires splitting at x = 0.

### P3. Find the area enclosed by $x = y^2$ and the line $x = y + 2$.

**Given:** better integrated with respect to y

**Solution:**

1. Solve for intersections in y: y^2 = y + 2, so y^2 - y - 2 = 0, (y-2)(y+1) = 0, giving y = -1 and y = 2
2. The line x = y+2 is to the right of the parabola x = y^2 on this interval: test y = 0, line gives 2 and parabola gives 0
3. A = ∫_{-1}^{2} [(y+2) - y^2] dy
4. = [y^2/2 + 2y - y^3/3]_{-1}^{2}
5. At y=2: 2 + 4 - 8/3 = 10/3; at y=-1: 1/2 - 2 + 1/3 = -7/6
6. A = 10/3 + 7/6 = 9/2

> [!success]- Answer
> **$\dfrac{9}{2}$ square units**

> [!warning] Trap
> Integrating with respect to x, which requires splitting the region into two pieces around the vertex of the parabola. Integrating in y handles it in one integral - this is the payoff for choosing the axis well.

### P4. Find the area bounded by $y = x^3$, the $x$-axis, and the lines $x = -1$ and $x = 2$.

**Given:** curve crosses the axis inside the interval

**Solution:**

1. The curve crosses the x-axis at x = 0, which is inside [-1,2]
2. On [-1,0] the curve lies below the axis; on [0,2] above
3. Area = ∫_{-1}^{0}(0 - x^3)dx + ∫_{0}^{2}(x^3 - 0)dx
4. First: [-x^4/4]_{-1}^{0} = 0 - (-1/4) = 1/4
5. Second: [x^4/4]_{0}^{2} = 4
6. Total = 1/4 + 4 = 17/4

> [!success]- Answer
> **$\dfrac{17}{4}$ square units**

> [!warning] Trap
> Computing ∫_{-1}^{2} x^3 dx = 15/4, which is the net signed area. The region below the axis must be added in magnitude, not subtracted.

### P5. Find the area between $y = \sin x$ and $y = \cos x$ from $x = 0$ to $x = \pi/2$.

**Given:** curves cross inside the interval

**Solution:**

1. Find the crossing: sin x = cos x at x = pi/4 inside [0, pi/2]
2. On (0, pi/4), cos x > sin x; on (pi/4, pi/2), sin x > cos x
3. A = ∫_0^{pi/4}(cos x - sin x)dx + ∫_{pi/4}^{pi/2}(sin x - cos x)dx
4. First: [sin x + cos x]_0^{pi/4} = (sqrt2/2 + sqrt2/2) - (0 + 1) = sqrt2 - 1
5. Second: [-cos x - sin x]_{pi/4}^{pi/2} = (-0 - 1) - (-sqrt2/2 - sqrt2/2) = sqrt2 - 1
6. Total = 2(sqrt2 - 1)

> [!success]- Answer
> **$2(\sqrt{2}-1) \approx 0.828$ square units**

> [!warning] Trap
> Integrating (cos x - sin x) across the whole interval, which gives 0 because the signed areas cancel. The crossing at pi/4 forces a split.

## Traps & Exam Notes

- **Not finding the intersections first.** They are usually the limits of integration, and they tell you where to split. Skipping this step is the main cause of wrong answers.
- **Subtracting in the wrong order.** Area is positive. A negative result means the lower curve was subtracted from the upper one incorrectly.
- **Failing to split at a crossing.** Integrating across a crossing produces signed cancellation, not area. This is why $\int_{-1}^{1}(x^3-x)dx = 0$ even though the enclosed area is $1/2$.
- **Assuming one pair of curves bounds the whole region.** With three or more curves the boundary can switch from one pair to another partway across; each sub-interval needs its own upper and lower function.
- **Integrating in the harder variable.** A sideways parabola integrated in $x$ needs splitting at its vertex; integrating in $y$ does not. Inspect the region before committing.
- **Using the crossing point as a limit when it is a boundary of the region.** Confirm with a sketch which intersections actually bound the region being asked about.
- **Mixing up 'area under a curve' with 'area between curves'.** The first is the special case where the second curve is the $x$-axis.

## See Also

- [[03_Definite_Integrals_and_FTC]]
- [[10_Plane_Areas_Polar]]
- [[08_Average_Value_and_MVT_for_Integrals]]

---

[[08_Average_Value_and_MVT_for_Integrals|⬅ 08]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Plane_Areas_Polar|10 ➡]]
