---
id: MATH-02-11
title: "Volumes by Slicing, Disk and Washer"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 11
tier: 1
depth: full
problem_count: 9
prereqs: ["[[09_Plane_Areas_Cartesian]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Volumes by Slicing, Disk and Washer

> [!abstract] Scope
> Compute volumes of solids of revolution by slicing, using the disk and washer methods, including rotation about axes other than the x-axis.

## Core Concept

> [!tip] Intuition
> A solid of revolution is a stack of thin circular slices. Add up their volumes and you get the integral — the only real work is identifying the radius of each slice, and whether it has a hole.

**The slicing principle.** If a solid has cross-sectional area $A(x)$ perpendicular to the $x$-axis, its volume is $V = \int_a^b A(x)\,dx$. This is the definition, and disk and washer are just the two cases where the cross-section is a circle or an annulus. Every volume formula in this topic descends from it.

**Disk method.** When the region between $y = f(x)$ and the $x$-axis is rotated about the $x$-axis, each slice is a disk of radius $f(x)$, so $V = \pi\int_a^b [f(x)]^2\,dx$. The radius is always the *distance from the curve to the axis of rotation*, and if the axis is not the $x$-axis that distance must be measured accordingly.

**Washer method.** When a region between an outer curve $R(x)$ and an inner curve $r(x)$ is rotated, each slice is an annulus:
$$V = \pi\int_a^b \left([R(x)]^2 - [r(x)]^2\right)dx$$
Like the polar area formula, this is a **difference of squares**, not the square of a difference. The hole exists whenever the region does not touch the axis of rotation.

**Choosing the variable, and the axis.** Integrating in $y$ instead of $x$ is not a different method — it just means the slices are horizontal, so the radii are measured from the curve to the axis as horizontal distances. If the region is described by $x$ as a function of $y$, integrating in $y$ avoids solving for $x$ and usually avoids splitting the region. The same reasoning as for plane areas applies: choose the axis that keeps the radius expression in one piece.

**Interpreting 'about the line $y = k$'.** The radius becomes $|f(x) - k|$ rather than $|f(x)|$. When the entire region lies above the axis of rotation, the absolute value is unnecessary and the expressions stay simple; when the axis cuts through the region, the geometry must be reconsidered. Washer radii are still measured to the axis, and the outer radius is whichever is larger.

## Derivation

**Slicing to the disk formula.** Partition $[a,b]$ into subintervals of width $\Delta x$ and cut the solid at each point. The slab over $[x_i, x_{i+1}]$ is approximately a circular disk of radius $f(x_i)$ and thickness $\Delta x$, so its volume is $\pi[f(x_i)]^2\Delta x$. Summing gives a Riemann sum $\sum \pi f(x_i)^2\Delta x$, whose limit as $\|\Delta x\|\to 0$ is $\pi\int_a^b f(x)^2\,dx$. The approximation improves because the radius varies continuously over a shrinking interval.

**Why the washer is a difference of squares.** An annulus with outer radius $R$ and inner radius $r$ has area $\pi R^2 - \pi r^2 = \pi(R^2-r^2)$. Applying the slicing principle to this area gives the washer formula directly. Note that the subtraction happens at the level of *areas*, which is why the squares appear: subtracting radii first would compute the wrong shape.

**Rotating about $y = k$.** A point on the curve at height $f(x)$ is a distance $|f(x)-k|$ from the line $y=k$. Because the cross-section perpendicular to the $x$-axis is still a circle (or annulus) centred on that line, the disk formula becomes $\pi\int (f(x)-k)^2dx$, and the washer form uses the two distances to $k$. The structure is unchanged; only the radius expression is translated.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Slicing principle | $V = \int_a^b A(x)\,dx$ | The parent formula. A(x) is the cross-sectional area. |
| Disk about the x-axis | $V = \pi\int_a^b \left[f(x)\right]^2dx$ | Solid, no hole. Radius = distance from curve to axis. |
| Washer about the x-axis | $V = \pi\int_a^b \left(R^2 - r^2\right)dx$ | Difference of SQUARES. R is outer, r is inner. |
| Disk about the y-axis | $V = \pi\int_c^d \left[x(y)\right]^2dy$ | Horizontal slices; radius is a horizontal distance. |
| Washer about the y-axis | $V = \pi\int_c^d \left(R(y)^2 - r(y)^2\right)dy$ | Right curve squared minus left curve squared. |
| Rotation about y = k | $V = \pi\int_a^b \left(f(x)-k\right)^2dx$ | Radius measured from the curve to the line y = k. |
| Rotation about x = h | $V = \pi\int_c^d \left(x(y)-h\right)^2dy$ | Horizontal radius measured to the line x = h. |
| Sphere volume check | $V = \pi\int_{-r}^{r}\left(r^2-x^2\right)dx = \tfrac{4}{3}\pi r^3$ | Use the sphere as a calibration for the method. |

## Interactive Widget

**Disk Washer Method Slider**

![[Disk_Washer_Method_Slider.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find the volume generated by rotating $y = \sqrt{x}$ about the $x$-axis from $x = 0$ to $x = 4$.

**Given:** disk method; simple radius

**Solution:**

1. The region touches the axis, so this is a disk, not a washer
2. $V = \pi\int_0^4 \left(\sqrt{x}\right)^2 dx = \pi\int_0^4 x\,dx$
3. $= \pi\left[\dfrac{x^2}{2}\right]_0^4 = \pi(8)$

> [!success]- Answer
> **$8\pi$ cubic units**

> [!warning] Trap
> Squaring only after integrating, or forgetting to square the radius at all. The radius enters as $r^2$, so $(\sqrt{x})^2 = x$.

### P2. Find the volume generated by rotating the region bounded by $y = x^2$ and $y = x$ about the $x$-axis.

**Given:** washer method; limits from intersections

**Solution:**

1. Find intersections: $x^2 = x$ at $x = 0$ and $x = 1$
2. On $(0,1)$ the line is above the parabola, so $R = x$ and $r = x^2$
3. $V = \pi\int_0^1 \left(x^2 - x^4\right)dx$
4. $= \pi\left[\dfrac{x^3}{3} - \dfrac{x^5}{5}\right]_0^1 = \pi\left(\dfrac{1}{3} - \dfrac{1}{5}\right)$
5. $= \pi\left(\dfrac{5}{15} - \dfrac{3}{15}\right) = \dfrac{2\pi}{15}$

> [!success]- Answer
> **$\dfrac{2\pi}{15}$ cubic units**

> [!warning] Trap
> Using $\pi\int (x - x^2)^2 dx$, which squares the difference instead of subtracting the squares. These give different answers and the second is wrong.

### P3. Find the volume generated by rotating the region bounded by $y = x^2$, the $y$-axis and $y = 4$ about the $y$-axis.

**Given:** integrating in y is easier

**Solution:**

1. Solve for $x$ in terms of $y$: $x = \sqrt{y}$
2. Horizontal slices from $y = 0$ to $y = 4$, each a disk of radius $\sqrt{y}$
3. $V = \pi\int_0^4 \left(\sqrt{y}\right)^2 dy = \pi\int_0^4 y\,dy$
4. $= \pi\left[\dfrac{y^2}{2}\right]_0^4 = \pi(8)$

> [!success]- Answer
> **$8\pi$ cubic units**

> [!warning] Trap
> Integrating in x, which requires expressing the region as a washer and splitting it. Integrating in y makes it a single disk.

### P4. Find the volume generated by rotating $y = x^2$ on $[0,2]$ about the line $y = -1$.

**Given:** axis offset from the origin

**Solution:**

1. The distance from the curve to the line $y = -1$ is $\left(x^2 + 1\right)$
2. $V = \pi\int_0^2 \left(x^2 + 1\right)^2 dx$
3. Expand: $x^4 + 2x^2 + 1$
4. Integrate: $\pi\left[\dfrac{x^5}{5} + \dfrac{2x^3}{3} + x\right]_0^2$
5. $= \pi\left(\dfrac{32}{5} + \dfrac{16}{3} + 2\right)$
6. Common denominator 15: $\dfrac{96}{15} + \dfrac{80}{15} + \dfrac{30}{15} = \dfrac{206}{15}$

> [!success]- Answer
> **$\dfrac{206\pi}{15}$ cubic units**

> [!warning] Trap
> Using a radius of $x^2$ instead of $x^2 + 1$. When the axis is translated, every radius grows by the translation distance.

### P5. Find the volume of the solid generated by rotating $y = e^{-x}$ on $[0,\infty)$ about the $x$-axis, or show that it diverges.

**Given:** improper integral; volume may be finite

**Solution:**

1. $V = \pi\int_0^{\infty} e^{-2x}\,dx$, an improper integral
2. $\lim_{b\to\infty} \pi\left[-\dfrac{e^{-2x}}{2}\right]_0^b$
3. $= \lim_{b\to\infty} \pi\left(-\dfrac{e^{-2b}}{2} + \dfrac{1}{2}\right)$
4. As $b \to \infty$, $e^{-2b} \to 0$

> [!success]- Answer
> **$\dfrac{\pi}{2}$ cubic units**

> [!warning] Trap
> Assuming an infinite region always has infinite volume. Here the exponential decays fast enough that the volume is finite - a nice illustration that improper integrals must be evaluated, not guessed. (Its surface area, by contrast, diverges: Gabriel's horn.)

### P6. Find the volume generated by rotating the region bounded by $y = \sqrt{x}$, $x = 4$ and $y = 0$ about the line $x = 4$.

**Given:** vertical axis at the right edge; better with horizontal slices

**Solution:**

1. Solve for $x$ in terms of $y$: $y = \sqrt{x}$ gives $x = y^2$, with $y$ from $0$ to $2$
2. A horizontal strip at height $y$ runs from $x = y^2$ to $x = 4$, so its length is $\left(4 - y^2\right)$
3. Rotating about the vertical line $x = 4$, the radius is the distance from the strip to that line: $\left(4 - y^2\right)$
4. $V = \pi\int_0^2 \left(4 - y^2\right)^2 dy$
5. Expand: $16 - 8y^2 + y^4$
6. Integrate: $\pi\left[16y - \dfrac{8y^3}{3} + \dfrac{y^5}{5}\right]_0^2 = \pi\left(32 - \dfrac{64}{3} + \dfrac{32}{5}\right)$
7. Common denominator 15: $\dfrac{480}{15} - \dfrac{320}{15} + \dfrac{96}{15} = \dfrac{256}{15}$

> [!success]- Answer
> **$\dfrac{256\pi}{15}$ cubic units**

> [!warning] Trap
> Using vertical strips, which would make the radius vary along the strip and require a different method entirely. When the axis is vertical and the region is bounded by a horizontal line, horizontal slices give a clean disk or washer.

### P7. A solid has a base that is the region bounded by $y = x^2$ and $y = 4$, with cross-sections perpendicular to the $y$-axis that are squares. Find the volume.

**Given:** non-circular cross-sections; slicing principle applies directly

**Solution:**

1. At height $y$, the base region runs from $x = -\sqrt{y}$ to $x = +\sqrt{y}$, a width of $2\sqrt{y}$
2. Each cross-section is a square of side $2\sqrt{y}$, so its area is $\left(2\sqrt{y}\right)^2 = 4y$
3. $V = \int_0^4 4y\,dy$
4. $= \left[2y^2\right]_0^4 = 32$

> [!success]- Answer
> **$32$ cubic units**

> [!warning] Trap
> Applying $\pi$. The cross-sections are squares, not circles, so the slicing principle is used with $A(y) = (\mathrm{side})^2$ and no $\pi$ anywhere. This is the general slicing formula, not the disk method.

### P8. Find the volume generated by rotating $y = \sin x$ on $[0,\pi]$ about the $x$-axis.

**Given:** trigonometric integrand; requires power reduction

**Solution:**

1. $V = \pi\int_0^{\pi} \sin^2 x\,dx$
2. Use $\sin^2 x = \dfrac{1 - \cos 2x}{2}$
3. $V = \dfrac{\pi}{2}\int_0^{\pi} (1 - \cos 2x)\,dx = \dfrac{\pi}{2}\left[x - \dfrac{\sin 2x}{2}\right]_0^{\pi}$
4. $= \dfrac{\pi}{2}\left[(\pi - 0) - (0 - 0)\right] = \dfrac{\pi}{2}(\pi)$

> [!success]- Answer
> **$\dfrac{\pi^2}{2}$ cubic units**

> [!warning] Trap
> Integrating $\sin^2 x$ as $-\cos^2 x/2$ or as $\sin^3 x/3$. Even powers of sine require the half-angle identity; there is no direct power rule.

### P9. Find the volume generated by rotating the region bounded by $y = x^3$, $y = 8$ and $x = 0$ about the $y$-axis.

**Given:** choose the variable to avoid splitting

**Solution:**

1. Solve for $x$: $x = y^{1/3}$, with $y$ from $0$ to $8$
2. Horizontal strips give a disk of radius $x = y^{1/3}$
3. $V = \pi\int_0^8 \left(y^{1/3}\right)^2 dy = \pi\int_0^8 y^{2/3} dy$
4. $= \pi\left[\dfrac{3}{5}y^{5/3}\right]_0^8 = \dfrac{3\pi}{5}\left(8^{5/3}\right)$
5. $8^{5/3} = \left(8^{1/3}\right)^5 = 2^5 = 32$
6. $V = \dfrac{3\pi}{5}(32)$

> [!success]- Answer
> **$\dfrac{96\pi}{5}$ cubic units**

> [!warning] Trap
> Integrating in x, which produces a washer with a hole and requires two integrals. Integrating in y gives a single disk and much simpler arithmetic.

## Traps & Exam Notes

- **Squaring the difference instead of subtracting squares.** The washer formula is $\pi\int(R^2-r^2)dx$, never $\pi\int(R-r)^2dx$. This is the single most common error in the topic.
- **Forgetting to square the radius.** The integrand is $r^2$, not $r$.
- **Omitting $\pi$.** It survives unless the cross-section is not circular; if your answer has no $\pi$ and the solid is a revolution, check the setup.
- **Wrong radius when the axis is translated.** Rotating about $y=k$ gives radius $|f(x)-k|$, not $|f(x)|$.
- **Choosing the inconvenient variable.** If the region is naturally described as $x$ in terms of $y$, integrate in $y$; otherwise the problem may require splitting into several washers.
- **Not finding the intersections.** As with plane areas, the intersection points are usually the limits of integration, and they identify where the outer and inner curves swap.
- **Assuming a washer when the region touches the axis.** If the inner radius is zero the solid is a disk; treating it as a washer still works but adds unnecessary terms and invites errors.

## See Also

- [[09_Plane_Areas_Cartesian]]
- [[12_Volumes_by_Cylindrical_Shells]]
- [[07_Improper_Integrals]]

---

[[10_Plane_Areas_Polar|⬅ 10]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Volumes_by_Cylindrical_Shells|12 ➡]]
