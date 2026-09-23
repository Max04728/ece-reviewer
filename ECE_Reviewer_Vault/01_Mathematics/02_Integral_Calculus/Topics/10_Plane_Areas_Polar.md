---
id: MATH-02-10
title: "Plane Areas Polar"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_Plane_Areas_Cartesian]]", "[[05_Trigonometric_Integrals_and_Substitution]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Plane Areas Polar

> [!abstract] Scope
> Compute areas of regions bounded by polar curves using the sector integral, including intersections of polar curves.

## Core Concept

> [!tip] Intuition
> In polar coordinates the natural area element is a thin circular wedge, not a rectangle. A wedge at radius $r$ spanning angle $d\theta$ has area $\frac12 r^2\,d\theta$, and that single fact produces the entire formula.

**The polar area formula.** The area swept by $r = f(\theta)$ from $\theta=\alpha$ to $\theta=\beta$ is $A = \frac{1}{2}\int_{\alpha}^{\beta} r^2\,d\theta$. Note that $r$ is **squared** — unlike the Cartesian case there is no 'upper minus lower' curve, because the wedge area depends on the square of the radius. The $\frac12$ is part of the formula and is very commonly dropped.

**Area between two polar curves.** $A = \frac{1}{2}\int_{\alpha}^{\beta}\left(r_{\mathrm{outer}}^2 - r_{\mathrm{inner}}^2\right)d\theta$, where the outer curve is the one with the larger $r$ on the interval. As in Cartesian work, find the intersections first and split the interval wherever the curves swap which is outer.

**Finding intersections requires care.** Solving $f(\theta) = g(\theta)$ finds most intersections, but polar curves can also intersect at the **pole** when both pass through it at *different* angles. Both cases must be considered; missing the pole intersections is the characteristic polar error, and unlike Cartesian work there is no algebraic trace of it in the equation $f = g$.

**Symmetry saves substantial work.** A curve symmetric about the polar axis (the $x$-axis) has equal area above and below, so integrate over half the range and double. Symmetry about $\theta = \frac{\pi}{2}$ or about the pole works similarly. For a limaçon or rose, exploiting symmetry is usually the difference between one integral and four.

**Roses, cardioids and limaçons.** A rose $r = a\cos n\theta$ has $n$ petals when $n$ is odd and $2n$ petals when $n$ is even — the even case double-counts each petal over $[0,2\pi]$, which is why the petal count doubles and why integrating one petal requires care in choosing the angular range. A cardioid $r = a(1\pm\cos\theta)$ is traced once over $[0,2\pi]$; integrating over $[0,4\pi]$ double-counts it and doubles the area.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Polar area | $A = \frac{1}{2}\int_{\alpha}^{\beta} r^2\,d\theta$ | r squared. The 1/2 is mandatory and frequently omitted. |
| Area between polar curves | $A = \frac{1}{2}\int_{\alpha}^{\beta}\left(r_{\mathrm{out}}^2 - r_{\mathrm{in}}^2\right)d\theta$ | Outer squared minus inner squared - not the difference of radii. |
| Area element | $dA = \frac{1}{2}r^2\,d\theta$ | A circular wedge with apex at the pole. |
| Polar to Cartesian | $x = r\cos\theta, \quad y = r\sin\theta, \quad r^2 = x^2+y^2$ | Used to convert or to verify a curve's shape. |
| Curve passing through the pole | $r = 0 \mathrm{\ at\ } \theta = \theta_0$ | Two curves through the pole intersect there even if f = g has no solution. |
| Symmetry about the polar axis | $A = 2\cdot\frac{1}{2}\int_{0}^{\beta} r^2\,d\theta$ | Integrate the upper half and double. |
| Rose petal count | $r=a\cos n\theta: \ n \mathrm{\ petals\ if\ } n \mathrm{\ odd}, \ 2n \mathrm{\ if\ } n \mathrm{\ even}$ | Determines the angular range for one petal. |
| One petal of an odd rose | $\theta \in \left[-\tfrac{\pi}{2n}, \tfrac{\pi}{2n}\right]$ | Where r >= 0 and the petal is traced once. |
| Circle in polar form | $r = 2a\cos\theta \mathrm{\ or\ } r = 2a\sin\theta$ | Circles through the pole with diameter 2a. |

## Interactive Widget

**Polar Area Sweep**

![[Polar_Area_Sweep.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find the area enclosed by the circle $r = 4\cos\theta$.

**Given:** circle through the pole

**Solution:**

1. The circle is traced once as theta runs from -pi/2 to pi/2, where r >= 0
2. A = (1/2)∫_{-pi/2}^{pi/2} (4cos theta)^2 d(theta) = (1/2)∫16cos^2 theta d(theta)
3. Use cos^2 theta = (1 + cos 2theta)/2: A = 8∫_{-pi/2}^{pi/2}(1+cos 2theta)/2 d(theta)
4. = 4[theta + (sin 2theta)/2]_{-pi/2}^{pi/2}
5. = 4[(pi/2 + 0) - (-pi/2 + 0)] = 4pi

> [!success]- Answer
> **$4\pi$ (matching $\pi a^2$ with $a = 2$)**

> [!warning] Trap
> Integrating from 0 to 2pi, which traces the circle twice and doubles the area. The correct range is where r >= 0.

### P2. Find the area of one petal of the rose $r = 3\cos 3\theta$.

**Given:** rose with n = 3; odd number of petals

**Solution:**

1. For n = 3 (odd) there are 3 petals; find the range for one petal where r >= 0
2. r = 0 when cos 3theta = 0, i.e. 3theta = ±pi/2, so theta = ±pi/6
3. A = (1/2)∫_{-pi/6}^{pi/6} 9cos^2 3theta d(theta)
4. Use cos^2 u = (1+cos 2u)/2 with u = 3theta: A = (9/4)∫_{-pi/6}^{pi/6}(1 + cos 6theta)d(theta)
5. = (9/4)[theta + (sin 6theta)/6]_{-pi/6}^{pi/6}
6. At the limits sin(±pi) = 0, so A = (9/4)(pi/6 + pi/6) = (9/4)(pi/3)

> [!success]- Answer
> **$\dfrac{3\pi}{4}$**

> [!warning] Trap
> Using the full range [0, 2pi] for one petal. For odd roses each petal spans pi/n; using a wider range integrates several petals.

### P3. Find the area inside the cardioid $r = 2(1+\cos\theta)$.

**Given:** cardioid traced once over 0 to 2pi

**Solution:**

1. The cardioid is traced exactly once as theta runs from 0 to 2pi
2. A = (1/2)∫_0^{2pi} 4(1+cos theta)^2 d(theta) = 2∫_0^{2pi}(1 + 2cos theta + cos^2 theta)d(theta)
3. ∫_0^{2pi} 1 d(theta) = 2pi; ∫_0^{2pi} 2cos theta d(theta) = 0; ∫_0^{2pi} cos^2 theta d(theta) = pi
4. A = 2[2pi + 0 + pi] = 2(3pi)

> [!success]- Answer
> **$6\pi$ (the standard result $\frac{3}{2}\pi a^2$ with $a = 2$)**

> [!warning] Trap
> Integrating over [0, 4pi]. The cardioid closes after 2pi; a wider range traverses it twice. Also dropping the cross term 2cos theta, which integrates to zero but must be shown.

### P4. Find the area inside $r = 2$ and outside $r = 1$ (the annulus between two circles).

**Given:** two circles centred at the pole

**Solution:**

1. Both are circles centred at the pole, so the outer is r = 2 and the inner is r = 1
2. A = (1/2)∫_0^{2pi}(2^2 - 1^2)d(theta) = (1/2)∫_0^{2pi} 3 d(theta)
3. = (1/2)(3)(2pi)

> [!success]- Answer
> **$3\pi$ (consistent with $\pi(2^2) - \pi(1^2)$)**

> [!warning] Trap
> Computing (1/2)∫(2-1)^2 d(theta), squaring the difference of radii instead of taking the difference of squares.

### P5. Find the area of the region inside $r = 2\cos\theta$ and outside $r = 1$.

**Given:** circle and circle, need intersections

**Solution:**

1. Find intersections: 2cos theta = 1 gives cos theta = 1/2, so theta = ±pi/3
2. Determine which is outer: test theta = 0, where 2cos 0 = 2 > 1, so 2cos theta is outer
3. A = (1/2)∫_{-pi/3}^{pi/3}[(2cos theta)^2 - 1^2]d(theta)
4. = (1/2)∫(4cos^2 theta - 1)d(theta)
5. Use cos^2 = (1+cos 2theta)/2: 4cos^2 theta - 1 = 2 + 2cos 2theta - 1 = 1 + 2cos 2theta
6. A = (1/2)[theta + sin 2theta]_{-pi/3}^{pi/3}
7. At pi/3: pi/3 + sin(2pi/3) = pi/3 + sqrt3/2; at -pi/3 the value is the negative of both terms
8. A = (1/2)[2(pi/3) + 2(sqrt3/2)] = pi/3 + sqrt3/2

> [!success]- Answer
> **$\dfrac{\pi}{3} + \dfrac{\sqrt{3}}{2}$**

> [!warning] Trap
> Using the full 0 to 2pi range. Outside the range ±pi/3 the circle r = 2cos theta is not the outer curve for this region, and the integrand goes negative.

## Traps & Exam Notes

- **Dropping the $\frac12$.** The polar area formula carries it; omitting it doubles the answer.
- **Forgetting to square.** The integrand is $r^2$, not $r$. The difference of squares $r_{\mathrm{out}}^2 - r_{\mathrm{in}}^2$ is not $(r_{\mathrm{out}}-r_{\mathrm{in}})^2$.
- **Tracing the curve more than once.** A cardioid over $[0,4\pi]$ or a circle over $[0,2\pi]$ double-counts the area. Determine the angular range where $r\geq 0$ and traces each point exactly once.
- **Missing pole intersections.** Two polar curves can both pass through the pole at *different* angles, which $f(\theta)=g(\theta)$ never reveals. Check whether each curve reaches $r=0$.
- **Wrong angular range for one petal of a rose.** For $r=a\cos n\theta$ with $n$ odd, one petal spans $\pi/n$. Using $[0,2\pi]$ covers all petals.
- **Not exploiting symmetry.** When the region is symmetric, integrating half and doubling reduces work and reduces the chance of an arithmetic slip.
- **Assuming $r\geq 0$.** Negative $r$ is meaningful in polar coordinates and traces points on the opposite ray. When a curve goes negative over part of the range, that portion retraces already-covered ground.

## See Also

- [[09_Plane_Areas_Cartesian]]
- [[11_Volumes_by_Slicing,_Disk_and_Washer]]
- [[05_Trigonometric_Integrals_and_Substitution]]

---

[[09_Plane_Areas_Cartesian|⬅ 09]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Volumes_by_Slicing,_Disk_and_Washer|11 ➡]]
