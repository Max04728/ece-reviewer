---
id: MATH-05-01
title: "Coordinate Systems and Vector Algebra"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[10_Plane_Areas_Polar]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Coordinate Systems and Vector Algebra

> [!abstract] Scope
> Read, transform and combine vectors in Cartesian, cylindrical and spherical coordinates — unit vectors, coordinate conversion, dot and cross products, and the differential elements every later field integral needs.

## Core Concept

> [!tip] Intuition
> A coordinate system is only a labelling choice. Pick the one whose unit vectors line up with the symmetry of the problem and the same physical field collapses from a three-term mess into a one-line expression.

**A point is physical; its coordinates are not.** The same point is $P(3,4,5)$ in Cartesian, $P(5,\,53.13^\circ,\,5)$ in cylindrical and $P(7.071,\,45^\circ,\,53.13^\circ)$ in spherical. Conversion is mechanical: $\rho=\sqrt{x^2+y^2}$, $\phi=\mathrm{atan2}(y,x)$, $z=z$ going to cylindrical, and $r=\sqrt{x^2+y^2+z^2}$, $\theta=\arccos(z/r)$, $\phi=\mathrm{atan2}(y,x)$ going to spherical. The reverse maps are $x=\rho\cos\phi$, $y=\rho\sin\phi$ and $x=r\sin\theta\cos\phi$, $y=r\sin\theta\sin\phi$, $z=r\cos\theta$. Note the two angles: $\phi$ is the azimuth measured in the $xy$-plane from $+x$, while $\theta$ is the polar angle measured down from $+z$.

**Vector algebra is geometry.** The dot product measures projection — it answers 'how much of $\mathbf{A}$ lies along $\mathbf{B}$', which is exactly what a work or flux integral needs:
$$\mathbf{A}\cdot\mathbf{B}=\lvert\mathbf{A}\rvert\lvert\mathbf{B}\rvert\cos\theta$$
The same geometric reading gives the cross product magnitude and a direction fixed by the right-hand rule, whose magnitude is the area of the parallelogram: $|\mathbf{A}||\mathbf{B}|\sin\theta$. This is area, torque and circulation. The scalar triple product is the volume of the parallelepiped they span:
$$\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C})$$
and is zero exactly when the three vectors are coplanar. A field is a vector or scalar function of position, so the unit-vector basis matters: $\mathbf{a}_\rho$ and $\mathbf{a}_\phi$ rotate as you move, they do not stay parallel to themselves the way $\mathbf{a}_x$ does.

**The differential elements are where marks are lost.** In cylindrical coordinates the line and volume elements come straight from the metric:
$$d\mathbf{l}=d\rho\,\mathbf{a}_\rho+\rho\,d\phi\,\mathbf{a}_\phi+dz\,\mathbf{a}_z$$
$dv=\rho\,d\rho\,d\phi\,dz$. In spherical coordinates the same construction gives:
$$d\mathbf{l}=dr\,\mathbf{a}_r+r\,d\theta\,\mathbf{a}_\theta+r\sin\theta\,d\phi\,\mathbf{a}_\phi$$
while $dv=r^2\sin\theta\,dr\,d\theta\,d\phi$. The factors $\rho$, $r$ and $r^2\sin\theta$ are not decoration — they are the Jacobian of the coordinate change, and every flux, energy and capacitance integral downstream depends on them.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Cartesian to cylindrical | $\rho=\sqrt{x^2+y^2},\quad \phi=\mathrm{atan2}(y,x),\quad z=z$ | Use atan2, not arctan(y/x); arctan loses the quadrant. |
| Cylindrical to Cartesian | $x=\rho\cos\phi,\quad y=\rho\sin\phi,\quad z=z$ | \phi in radians whenever it is fed to sin or cos. |
| Cartesian to spherical | $r=\sqrt{x^2+y^2+z^2},\quad \theta=\arccos(z/r),\quad \phi=\mathrm{atan2}(y,x)$ | $\theta$ runs 0 to $\pi$ from the $+z$ axis. Some texts swap the names of $\theta$ and $\phi$. |
| Spherical to Cartesian | $x=r\sin\theta\cos\phi,\quad y=r\sin\theta\sin\phi,\quad z=r\cos\theta$ | The $r\sin\theta$ factor is the projection onto the $xy$-plane. |
| Unit vector along A | $\mathbf{a}_A=\frac{\mathbf{A}}{\lvert\mathbf{A}\rvert}$ | Defined only for $\mathbf{A}\neq\mathbf{0}$; dimensionless. |
| Dot product | $\mathbf{A}\cdot\mathbf{B}=A_xB_x+A_yB_y+A_zB_z=\lvert\mathbf{A}\rvert\lvert\mathbf{B}\rvert\cos\theta$ | Returns a scalar. Zero means perpendicular, not zero vectors. |
| Cross product magnitude | $\lvert\mathbf{A}\times\mathbf{B}\rvert=\lvert\mathbf{A}\rvert\lvert\mathbf{B}\rvert\sin\theta$ | Also the area of the parallelogram spanned. Direction by right-hand rule; $\mathbf{A}\times\mathbf{B}=-\mathbf{B}\times\mathbf{A}$. |
| Cross product components | $\mathbf{A}\times\mathbf{B}=(A_yB_z-A_zB_y)\mathbf{a}_x+(A_zB_x-A_xB_z)\mathbf{a}_y+(A_xB_y-A_yB_x)\mathbf{a}_z$ | Cyclic order $x\to y\to z$; a swapped pair flips the sign. |
| Scalar triple product | $\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C})=\mathrm{volume\ of\ the\ parallelepiped}$ | Zero for coplanar vectors. Change of sign means the triad is left-handed. |
| Line element, cylindrical | $d\mathbf{l}=d\rho\,\mathbf{a}_\rho+\rho\,d\phi\,\mathbf{a}_\phi+dz\,\mathbf{a}_z$ | The $\rho$ multiplies $d\phi$; $d\phi$ must be in radians. |
| Volume element, cylindrical | $dv=\rho\,d\rho\,d\phi\,dz$ | Dropping $\rho$ makes every cylindrical volume integral wrong. |
| Line element, spherical | $d\mathbf{l}=dr\,\mathbf{a}_r+r\,d\theta\,\mathbf{a}_\theta+r\sin\theta\,d\phi\,\mathbf{a}_\phi$ | $r\sin\theta$ is the distance from the $z$-axis; it vanishes on the axis. |
| Volume element, spherical | $dv=r^2\sin\theta\,dr\,d\theta\,d\phi$ | The full solid angle integral $\int_0^{2\pi}\!\int_0^{\pi}\sin\theta\,d\theta\,d\phi=4\pi$ is where the $4\pi$ in Coulomb's law comes from. |

## Worked Problems

### P1. Given $\mathbf{A}=3\mathbf{a}_x-4\mathbf{a}_y+12\mathbf{a}_z$, find $|\mathbf{A}|$ and the unit vector $\mathbf{a}_A$.

**Given:** A = 3a_x - 4a_y + 12a_z

**Solution:**

1. Magnitude: |A| = sqrt(3^2 + (-4)^2 + 12^2) = sqrt(9 + 16 + 144)
2. = sqrt(169) = 13
3. Unit vector: a_A = A/|A| = (3a_x - 4a_y + 12a_z)/13
4. = 0.2308 a_x - 0.3077 a_y + 0.9231 a_z

> [!success]- Answer
> **$|\mathbf{A}|=13$; $\mathbf{a}_A=0.231\mathbf{a}_x-0.308\mathbf{a}_y+0.923\mathbf{a}_z$.**

> [!warning] Trap
> Squaring the components but not taking the square root, or forgetting that the unit vector keeps the sign of every component. A unit vector whose magnitude is not exactly 1 is an automatic error check.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(3²+(-4)²+12²)=` → $\lvert\mathbf{A}\rvert$ = **13**; store it with `SHIFT` `STO` `A`.
> 2. `3÷A` `ALPHA` `:` `(-)4÷A` `ALPHA` `:` `12÷A` `=` → **0.2308** → **-0.3077** → **0.9231**.
> 3. Magnitude check: `√(0.2308²+0.3077²+0.9231²)=` → **1.0000**, so the unit vector is right.

### P2. Convert the point $P(3,4,5)$ from Cartesian to cylindrical and to spherical coordinates.

**Given:** P(x,y,z) = (3,4,5)

**Solution:**

1. Cylindrical radius: rho = sqrt(3^2+4^2) = sqrt(25) = 5
2. Cylindrical angle: phi = atan2(4,3) = 53.13 deg; z = 5
3. Spherical radius: r = sqrt(25 + 5^2) = sqrt(50) = 7.071
4. Polar angle: theta = arccos(z/r) = arccos(5/7.071) = arccos(0.7071) = 45 deg
5. Azimuth is unchanged: phi = 53.13 deg

> [!success]- Answer
> **Cylindrical $(5,\,53.13^\circ,\,5)$; spherical $(7.071,\,45^\circ,\,53.13^\circ)$.**

> [!warning] Trap
> Writing $\theta=45^\circ$ by pattern-matching the earlier $\phi$ calculation instead of computing $\arccos(z/r)$. The two angles answer different questions and coincidentally landed on the same value here.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. In degrees: `SHIFT` `Pol(3,4)=` → X = **5** = $\rho$, Y = **53.13** = $\phi$.
> 2. `√(X²+5²)=` → $r$ = **7.071**; `SHIFT` `cos⁻¹(5÷Ans)=` → $\theta$ = **45.00°**.
> 3. $\phi$ is unchanged, so the answers are $(5,\,53.13^\circ,\,5)$ and $(7.071,\,45^\circ,\,53.13^\circ)$.
>
> `Pol(` lands the radius in `X` and the angle in `Y` — one keypress replaces atan2.

### P3. Express the spherical point $r=4$, $\theta=30^\circ$, $\phi=60^\circ$ in Cartesian coordinates.

**Given:** r = 4; theta = 30 deg; phi = 60 deg

**Solution:**

1. x = r sin(theta) cos(phi) = 4 sin30 cos60 = 4(0.5)(0.5) = 1
2. y = r sin(theta) sin(phi) = 4(0.5)(0.8660) = 1.7321
3. z = r cos(theta) = 4 cos30 = 4(0.8660) = 3.4641

> [!success]- Answer
> **$(x,y,z)=(1,\,1.732,\,3.464)$ m.**

> [!warning] Trap
> Using degrees directly in a calculator set to radians (or the reverse): $\sin 30$ in radian mode is $-0.988$, which produces a nonsense point with no obvious warning. Also, $z$ uses $\cos\theta$, not $\sin\theta$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `Pol(4\sin30,60)=` → X = **1** = $x$, Y = **1.7321** = $y$.
> 2. `4\cos30=` → $z$ = **3.4641**.
> 3. Both components come from one `Pol(` because $\rho=r\sin\theta=$ **2** is the radius of the $xy$-projection.
>
> `Pol(r,·)` returns $r\cos$ in `X` and $r\sin$ in `Y` — exactly the $(x,y)$ pair. Keep degrees mode on.

### P4. Find the angle between $\mathbf{A}=2\mathbf{a}_x+\mathbf{a}_y-\mathbf{a}_z$ and $\mathbf{B}=\mathbf{a}_x+3\mathbf{a}_y+2\mathbf{a}_z$.

**Given:** A = 2a_x + a_y - a_z; B = a_x + 3a_y + 2a_z

**Solution:**

1. Dot product: A.B = (2)(1) + (1)(3) + (-1)(2) = 2 + 3 - 2 = 3
2. |A| = sqrt(4+1+1) = sqrt(6) = 2.4495
3. |B| = sqrt(1+9+4) = sqrt(14) = 3.7417
4. cos(theta) = 3/[(2.4495)(3.7417)] = 3/9.165 = 0.3273
5. theta = arccos(0.3273) = 70.9 deg

> [!success]- Answer
> **$\theta=70.9^\circ$.**

> [!warning] Trap
> Dividing by $|\mathbf{A}|$ or $|\mathbf{B}|$ alone. The cosine needs the product of *both* magnitudes; using one gives a number greater than 1 and an impossible angle.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3÷(√(2²+1²+1²)×√(1²+3²+2²))=` → $\cos\theta$ = **0.32733**.
> 2. `SHIFT` `cos⁻¹` `Ans` `=` → $\theta$ = **70.89°**.
> 3. The numerator alone is `2×1+1×3+(-)1×2=` → **3**, the dot product.

### P5. For $\mathbf{A}=\mathbf{a}_x+2\mathbf{a}_y$ and $\mathbf{B}=3\mathbf{a}_y+4\mathbf{a}_z$, find $\mathbf{A}\times\mathbf{B}$ and the area of the parallelogram they span.

**Given:** A = a_x + 2a_y; B = 3a_y + 4a_z

**Solution:**

1. A x B = (A_yB_z - A_zB_y)a_x + (A_zB_x - A_xB_z)a_y + (A_xB_y - A_yB_x)a_z
2. = [(2)(4) - (0)(3)]a_x + [(0)(0) - (1)(4)]a_y + [(1)(3) - (2)(0)]a_z
3. = 8a_x - 4a_y + 3a_z
4. Area = |A x B| = sqrt(64 + 16 + 9) = sqrt(89) = 9.434

> [!success]- Answer
> **$\mathbf{A}\times\mathbf{B}=8\mathbf{a}_x-4\mathbf{a}_y+3\mathbf{a}_z$; area $=9.434$ square units.**

> [!warning] Trap
> Computing $\mathbf{B}\times\mathbf{A}$ and reporting it — the magnitude is right but the direction (and therefore the normal of any surface using it) is reversed. Also, the zero components must be carried explicitly; dropping them silently corrupts the $y$ term.

## Traps & Exam Notes

- **Mixing unit vectors from different systems at the same point.** $\mathbf{a}_\rho$ points radially away from the $z$-axis and rotates as you move; it is not $\mathbf{a}_x$. Adding $A_\rho\mathbf{a}_\rho+B_x\mathbf{a}_x$ is meaningless until both vectors are expressed in one system *at the same point*.
- **Using $\arctan(y/x)$ instead of $\mathrm{atan2}(y,x)$.** $(3,4)$ and $(-3,-4)$ both give $\tan\phi=4/3$, but their azimuths differ by $180^\circ$. The quadrant must come from the signs of $x$ and $y$.
- **Dropping the metric coefficients $\rho$, $r$ and $r\sin\theta$.** $d\mathbf{l}\neq d\phi\,\mathbf{a}_\phi$ in cylindrical and $dv\neq dr\,d\theta\,d\phi$ in spherical. Every flux, capacitance and resistance integral inherits the error.
- **Dot product versus cross product in work and flux problems.** $\mathbf{A}\cdot\mathbf{B}$ is a scalar and measures projection; $\mathbf{A}\times\mathbf{B}$ is a vector and measures area or rotation. Work uses the dot product, $\mathbf{F}=q\mathbf{v}\times\mathbf{B}$ uses the cross.
- **Reversing the order in a cross product.** $\mathbf{A}\times\mathbf{B}=-\mathbf{B}\times\mathbf{A}$. For a surface normal this flips the sign of the flux, which is the difference between an answer and its negative.

## See Also

- [[02_Gradient,_Divergence,_Curl_and_Laplacian]]
- [[03_Divergence_and_Stokes_Theorems]]
- [[10_Plane_Areas_Polar]]

---

⬅ *start* · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Gradient,_Divergence,_Curl_and_Laplacian|02 ➡]]
