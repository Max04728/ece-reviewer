---
id: MATH-02-14
title: "Centroids and Pappus-Guldinus"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 14
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_Plane_Areas_Cartesian]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — Centroids and Pappus-Guldinus

> [!abstract] Scope
> Locate centroids of areas and volumes by integration, and apply the theorems of Pappus-Guldinus.

## Core Concept

> [!tip] Intuition
> A centroid is the balance point of a shape. Integration computes it by treating the shape as a sum of tiny pieces, each contributing its own position weighted by its size.

**Centroid versus centre of gravity.** For a uniform (homogeneous) lamina the centroid is the geometric centre of the area, independent of any density. If density varies, the centre of gravity is the density-weighted average and generally differs. Unless a problem mentions non-uniform density, 'centroid' is what is wanted and density cancels out.

**The defining formulas.** For a region of area $A$, the centroid coordinates are $\bar{x} = \frac{1}{A}\int x\,dA$ and $\bar{y} = \frac{1}{A}\int y\,dA$, where $A = \int dA$. With vertical strips, $dA = (y_{\mathrm{top}} - y_{\mathrm{bot}})\,dx$ and the strip's own centroid is at $y = \frac{y_{\mathrm{top}}+y_{\mathrm{bot}}}{2}$. **Do not skip the strip-centroid step** — using the top curve's height as the strip's $y$ is the most common error.

**First moments.** The numerator integrals $M_y = \int x\,dA$ and $M_x = \int y\,dA$ are called first moments of area. The centroid is the moment divided by the total area. Symmetry gives an immediate answer for one coordinate: a region symmetric about the $y$-axis has $\bar{x} = 0$; a region symmetric about the $x$-axis has $\bar{y} = 0$. Check for symmetry before integrating — it frequently halves the work.

**Theorem of Pappus (volume).** When a plane region of area $A$ is revolved about an external axis that does not intersect it, the volume swept is $V = 2\pi\bar{r}A$, where $\bar{r}$ is the distance from the centroid to the axis. This converts many volume problems into a centroid lookup, and conversely lets a known volume solve for a centroid.

**Theorem of Pappus (surface area).** Similarly, revolving a plane *curve* of length $L$ about a non-intersecting external axis sweeps a surface of area $S = 2\pi\bar{r}L$, where $\bar{r}$ is the distance from the curve's centroid to the axis. The condition that the axis must not cut the region is essential: if it does, the swept solid self-overlaps and the theorem double-counts.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Area | $A = \int_a^b\left(y_{\mathrm{top}}-y_{\mathrm{bot}}\right)dx$ | The denominator of both centroid formulas. |
| First moment about y-axis | $M_y = \int_a^b x\left(y_{\mathrm{top}}-y_{\mathrm{bot}}\right)dx$ | The strip's x-position times its area. |
| First moment about x-axis | $M_x = \int_a^b \frac{y_{\mathrm{top}}+y_{\mathrm{bot}}}{2}\left(y_{\mathrm{top}}-y_{\mathrm{bot}}\right)dx$ | Uses the strip's MIDPOINT height - not the top curve. |
| Centroid coordinates | $\bar{x} = \frac{M_y}{A}, \quad \bar{y} = \frac{M_x}{A}$ | Moment divided by area. |
| Symmetry shortcut | $\mathrm{symmetric\ about\ } x=0 \Rightarrow \bar{x}=0$ | Also the reverse for y. Always check first. |
| Pappus, volume | $V = 2\pi\bar{r}A$ | Axis external and not intersecting the region. |
| Pappus, surface area | $S = 2\pi\bar{r}L$ | L is the arc length of the generating curve. |
| Standard centroid, triangle | $\bar{y} = \frac{h}{3} \mathrm{\ from\ the\ base}$ | Worth memorising as a check. |
| Standard centroid, semicircle | $\bar{y} = \frac{4r}{3\pi} \mathrm{\ from\ the\ diameter}$ | Worth memorising as a check. |

## Worked Problems

### P1. Find the centroid of the region bounded by $y = x^2$, the $x$-axis and $x = 2$.

**Given:** region touching the axis

**Solution:**

1. Area: A = ∫_0^2 x^2 dx = [x^3/3]_0^2 = 8/3
2. M_y = ∫_0^2 x(x^2)dx = ∫_0^2 x^3 dx = [x^4/4]_0^2 = 4
3. For M_x the strip runs from y = 0 to y = x^2, so its centroid is at y = x^2/2
4. M_x = ∫_0^2 (x^2/2)(x^2)dx = (1/2)∫_0^2 x^4 dx = (1/2)(32/5) = 16/5
5. x-bar = (4)/(8/3) = 12/8 = 3/2; y-bar = (16/5)/(8/3) = 48/40 = 6/5

> [!success]- Answer
> **$(\bar{x},\bar{y}) = \left(\dfrac{3}{2}, \dfrac{6}{5}\right)$**

> [!warning] Trap
> Using y = x^2 (the top curve) as the strip's height in M_x instead of the midpoint x^2/2. That error doubles y-bar.

### P2. Find the centroid of the region bounded by $y = x$ and $y = x^2$.

**Given:** two curves, symmetric setup

**Solution:**

1. Intersections at x = 0 and x = 1; on (0,1) the line is on top
2. A = ∫_0^1 (x - x^2)dx = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6
3. M_y = ∫_0^1 x(x - x^2)dx = ∫_0^1 (x^2 - x^3)dx = 1/3 - 1/4 = 1/12
4. Strip centroid height = (x + x^2)/2
5. M_x = ∫_0^1 [(x+x^2)/2](x - x^2)dx = (1/2)∫_0^1 (x^2 - x^4)dx = (1/2)(1/3 - 1/5) = (1/2)(2/15) = 1/15
6. x-bar = (1/12)/(1/6) = 1/2; y-bar = (1/15)/(1/6) = 2/5

> [!success]- Answer
> **$(\bar{x},\bar{y}) = \left(\dfrac{1}{2}, \dfrac{2}{5}\right)$**

> [!warning] Trap
> Simplifying (x+x^2)(x-x^2) as x^2 - x^4 without expanding carefully. The cross terms cancel, but only if done correctly.

### P3. Use the theorem of Pappus to find the volume generated by rotating a circle of radius $r$ whose centre is $R$ from the $y$-axis about the $y$-axis (a torus).

**Given:** Pappus with a known area; axis external to the region

**Solution:**

1. The region is a disk of area A = pi r^2
2. Its centroid is at its centre, a distance R from the axis
3. By Pappus: V = 2pi R A = 2pi R (pi r^2)
4. V = 2 pi^2 R r^2

> [!success]- Answer
> **$V = 2\pi^2 R r^2$**

> [!warning] Trap
> Attempting this by integration, which is far harder. Pappus answers it in one line, provided the axis does not intersect the disk - which requires R > r.

### P4. Use Pappus to find the volume generated by rotating the triangle with vertices $(0,0)$, $(4,0)$, $(0,3)$ about the $x$-axis.

**Given:** right triangle; known centroid

**Solution:**

1. Area: A = (1/2)(4)(3) = 6
2. The centroid of a triangle is the average of its vertices: y-bar = (0 + 0 + 3)/3 = 1
3. The axis is the x-axis (y = 0), and the triangle lies above it, so the region does not cross the axis
4. V = 2pi(y-bar)A = 2pi(1)(6)

> [!success]- Answer
> **$12\pi$ cubic units**

> [!warning] Trap
> Using the centroid height of a triangle as h/3 measured from the base only works for this orientation; the vertex-average rule (x-bar, y-bar each the mean of the three vertex coordinates) is the general and safer method.

### P5. Find the centroid of the semicircular region of radius $r$ bounded by $y = \sqrt{r^2-x^2}$ and the $x$-axis.

**Given:** symmetric region; use a known result or integrate

**Solution:**

1. The region is symmetric about the y-axis, so x-bar = 0 immediately
2. Area: A = (1/2)pi r^2
3. M_x = ∫_{-r}^{r} [(sqrt(r^2-x^2) + 0)/2](sqrt(r^2-x^2) - 0) dx = (1/2)∫_{-r}^{r}(r^2 - x^2)dx
4. = (1/2)[r^2x - x^3/3]_{-r}^{r} = (1/2)(2r^3 - 2r^3/3) = (1/2)(4r^3/3) = 2r^3/3
5. y-bar = (2r^3/3)/((1/2)pi r^2) = (4r)/(3pi)

> [!success]- Answer
> **$(0, \dfrac{4r}{3\pi})$ — the standard semicircle result**

> [!warning] Trap
> Reporting y-bar = r/2 by analogy with a rectangle. The centroid of a semicircular region is at 4r/(3 pi) ~= 0.424r, noticeably above the midpoint of the radius.

## Traps & Exam Notes

- **Using the top curve instead of the strip midpoint** when computing $M_x$. The strip's centroid is at $(y_{\mathrm{top}}+y_{\mathrm{bot}})/2$; using $y_{\mathrm{top}}$ doubles the contribution from the strip's own extent.
- **Forgetting to divide by the area.** $M_y$ and $M_x$ are moments, not coordinates. The centroid is moment over area.
- **Ignoring symmetry.** If the region is symmetric, one coordinate is zero or otherwise immediate. Check before integrating.
- **Applying Pappus with an axis that cuts the region.** The theorem requires an external, non-intersecting axis. If the axis passes through the region the swept solid self-overlaps and $V = 2\pi\bar{r}A$ is invalid.
- **Using Pappus for volume with a curve's length** (or for surface area with an area). The volume theorem takes the area of a region; the surface theorem takes the arc length of a curve.
- **Confusing centroid with centre of gravity.** They coincide only for uniform density.
- **Sign errors from a region below the axis.** The moment $M_x$ will be negative, which correctly places $\bar{y}$ below the axis. Do not 'fix' the sign.

## See Also

- [[11_Volumes_by_Slicing,_Disk_and_Washer]]
- [[13_Arc_Length_and_Surface_Area]]
- [[09_Plane_Areas_Cartesian]]

---

[[13_Arc_Length_and_Surface_Area|⬅ 13]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[15_Work_and_Hydrostatic_Force|15 ➡]]
