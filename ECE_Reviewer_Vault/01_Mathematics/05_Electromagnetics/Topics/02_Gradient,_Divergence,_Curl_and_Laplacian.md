---
id: MATH-05-02
title: "Gradient, Divergence, Curl and Laplacian"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Coordinate_Systems_and_Vector_Algebra]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Gradient, Divergence, Curl and Laplacian

> [!abstract] Scope
> Compute and interpret gradient, divergence, curl and Laplacian in Cartesian, cylindrical and spherical coordinates, including the identities that let a potential exist and that turn Gauss's law into a point equation.

## Core Concept

> [!tip] Intuition
> All four operators are the same idea — a derivative with respect to position. Gradient turns a scalar into the vector of steepest climb, divergence counts how much flux leaves a point, curl measures local circulation, and the Laplacian is just divergence of the gradient, i.e. how the average around a point compares with the point itself.

**Gradient: the steepest-ascent vector.** $\nabla V$ points in the direction in which $V$ increases fastest and its magnitude is that maximum rate of increase, in units of $V$ per metre. It is everywhere perpendicular to the level surfaces (equipotentials) of $V$. In electromagnetics this one fact produces the entire relation between potential and field: the field points *down* the potential hill, so $\mathbf{E}=-\nabla V$. A larger gradient means a stronger field for the same potential difference.

**Divergence: net outflow per unit volume.** $\nabla\cdot\mathbf{A}$ is the limit of (flux out of a closed surface)/(volume enclosed) as the volume shrinks to zero. Positive divergence is a source, negative a sink, zero means the field is solenoidal — what goes in comes out. The point form of Gauss's law is exactly this statement for the electric flux density, $\nabla\cdot\mathbf{D}=\rho_v$: charge is the source of $\mathbf{D}$. Note the output is a scalar; there is no direction to report.

**Curl: circulation per unit area.** $\nabla\times\mathbf{A}$ is the limit of (line integral around a closed loop)/(area enclosed), maximised over loop orientation; its direction is the axis about which the circulation is greatest, by the right-hand rule. It is a vector. A field with zero curl everywhere is irrotational (conservative), which is precisely the electrostatic condition:
$$\nabla\times\mathbf{E}=0$$
so the line integral of $\mathbf{E}$ is path-independent and a potential function exists. Non-zero curl means a field that can do net work around a loop — the signature of a changing magnetic field (Faraday) or a current (Ampère).

**Laplacian and the two killer identities.** $\nabla^2 V=\nabla\cdot(\nabla V)$ returns a scalar and measures how $V$ at a point differs from its local average. It converts the two integral laws of electrostatics into one differential equation:
$$\nabla^2 V=-\rho_v/\varepsilon$$
(Poisson), which becomes $\nabla^2 V=0$ (Laplace) in charge-free regions. Two identities do most of the work in the whole area:
$$\nabla\times(\nabla V)=0$$
(a gradient is always irrotational) and $\nabla\cdot(\nabla\times\mathbf{A})=0$ (a curl is always solenoidal). The first guarantees a potential exists for a conservative field; the second is why magnetic flux density can be written as a curl, $\mathbf{B}=\nabla\times\mathbf{A}$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Gradient, Cartesian | $\nabla V=\frac{\partial V}{\partial x}\mathbf{a}_x+\frac{\partial V}{\partial y}\mathbf{a}_y+\frac{\partial V}{\partial z}\mathbf{a}_z$ | Scalar in, vector out. Units: V/m when V is in volts. |
| Gradient, cylindrical | $\nabla V=\frac{\partial V}{\partial \rho}\mathbf{a}_\rho+\frac{1}{\rho}\frac{\partial V}{\partial \phi}\mathbf{a}_\phi+\frac{\partial V}{\partial z}\mathbf{a}_z$ | The $1/\rho$ is required: a fixed $d\phi$ covers arc length $\rho\,d\phi$. |
| Gradient, spherical | $\nabla V=\frac{\partial V}{\partial r}\mathbf{a}_r+\frac{1}{r}\frac{\partial V}{\partial \theta}\mathbf{a}_\theta+\frac{1}{r\sin\theta}\frac{\partial V}{\partial \phi}\mathbf{a}_\phi$ | Diverges on the $z$-axis where $\sin\theta=0$; change origin if the field is evaluated there. |
| Divergence, Cartesian | $\nabla\cdot\mathbf{A}=\frac{\partial A_x}{\partial x}+\frac{\partial A_y}{\partial y}+\frac{\partial A_z}{\partial z}$ | Vector in, scalar out. |
| Divergence, cylindrical | $\nabla\cdot\mathbf{A}=\frac{1}{\rho}\frac{\partial(\rho A_\rho)}{\partial \rho}+\frac{1}{\rho}\frac{\partial A_\phi}{\partial \phi}+\frac{\partial A_z}{\partial z}$ | The $\rho$ sits inside the derivative; that is what makes $A_\rho=c/\rho$ divergence-free. |
| Divergence, spherical | $\nabla\cdot\mathbf{A}=\frac{1}{r^2}\frac{\partial(r^2A_r)}{\partial r}+\frac{1}{r\sin\theta}\frac{\partial(\sin\theta\,A_\theta)}{\partial \theta}+\frac{1}{r\sin\theta}\frac{\partial A_\phi}{\partial \phi}$ | For a purely radial field this reduces to the familiar $\frac{1}{r^2}\frac{\partial(r^2A_r)}{\partial r}$. |
| Curl, Cartesian | $\nabla\times\mathbf{A}=\left(\frac{\partial A_z}{\partial y}-\frac{\partial A_y}{\partial z}\right)\mathbf{a}_x+\left(\frac{\partial A_x}{\partial z}-\frac{\partial A_z}{\partial x}\right)\mathbf{a}_y+\left(\frac{\partial A_y}{\partial x}-\frac{\partial A_x}{\partial y}\right)\mathbf{a}_z$ | Cyclic order. Vector in, vector out. |
| Curl, cylindrical | $\nabla\times\mathbf{A}=\left(\frac{1}{\rho}\frac{\partial A_z}{\partial \phi}-\frac{\partial A_\phi}{\partial z}\right)\mathbf{a}_\rho+\left(\frac{\partial A_\rho}{\partial z}-\frac{\partial A_z}{\partial \rho}\right)\mathbf{a}_\phi+\frac{1}{\rho}\left(\frac{\partial(\rho A_\phi)}{\partial \rho}-\frac{\partial A_\rho}{\partial \phi}\right)\mathbf{a}_z$ | The $\mathbf{a}_z$ component is the one used for Ampère's law along a circular path. |
| Laplacian, Cartesian | $\nabla^2 V=\frac{\partial^2 V}{\partial x^2}+\frac{\partial^2 V}{\partial y^2}+\frac{\partial^2 V}{\partial z^2}$ | Scalar. Unlike the other operators it can also act on each component of a vector. |
| Poisson and Laplace equations | $\nabla^2 V=-\frac{\rho_v}{\varepsilon}\quad(\mathrm{Poisson});\qquad \nabla^2 V=0\ \mathrm{\ where\ } \rho_v=0$ | Note the minus sign: positive charge gives downward-curving potential. |
| Field from potential | $\mathbf{E}=-\nabla V$ | Static fields only. Valid because $\nabla\times\mathbf{E}=0$ lets a scalar potential exist. |
| Two vanishing identities | $\nabla\times(\nabla V)=0,\qquad \nabla\cdot(\nabla\times\mathbf{A})=0$ | First: every gradient is irrotational. Second: every curl is solenoidal. |

## Worked Problems

### P1. The potential in a region is $V=x^2yz$ volts with $x,y,z$ in metres. Find $\nabla V$ and the electric field at the point $(1,2,3)$ m, and the magnitude of $\mathbf{E}$.

**Given:** V = x^2 y z (V); point (1,2,3) m

**Solution:**

1. dV/dx = 2xyz, dV/dy = x^2 z, dV/dz = x^2 y
2. At (1,2,3): grad V = (2(1)(2)(3))a_x + ((1)^2(3))a_y + ((1)^2(2))a_z = 12a_x + 3a_y + 2a_z V/m
3. E = -grad V = -12a_x - 3a_y - 2a_z V/m
4. |E| = sqrt(144 + 9 + 4) = sqrt(157) = 12.5 V/m

> [!success]- Answer
> **$\nabla V=12\mathbf{a}_x+3\mathbf{a}_y+2\mathbf{a}_z$ V/m; $\mathbf{E}=-12\mathbf{a}_x-3\mathbf{a}_y-2\mathbf{a}_z$ V/m, $|\mathbf{E}|=12.5$ V/m.**

> [!warning] Trap
> Omitting the minus sign in $\mathbf{E}=-\nabla V$. The field points toward decreasing potential; dropping the sign reverses the field direction and every force computed from it.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×1×2×3` `ALPHA` `:` `1²×3` `ALPHA` `:` `1²×2` `=` → $\nabla V$ = **12** → **3** → **2** V/m.
> 2. `√(12²+3²+2²)=` → $\lvert\mathbf{E}\rvert$ = **12.53** V/m.
> 3. $\mathbf{E}=-\nabla V$ negates the three components to **-12**, **-3**, **-2** V/m.

### P2. For $\mathbf{A}=x^2\mathbf{a}_x+2xy\mathbf{a}_y+z\mathbf{a}_z$, find $\nabla\cdot\mathbf{A}$ and evaluate it at $(2,1,1)$.

**Given:** A = x^2 a_x + 2xy a_y + z a_z

**Solution:**

1. d(A_x)/dx = 2x
2. d(A_y)/dy = 2x
3. d(A_z)/dz = 1
4. div A = 2x + 2x + 1 = 4x + 1
5. At x = 2: div A = 9

> [!success]- Answer
> **$\nabla\cdot\mathbf{A}=4x+1$; at $(2,1,1)$ it is $9$ (per metre).**

> [!warning] Trap
> Differentiating $A_x$ with respect to $y$ or otherwise pairing the wrong component with the wrong variable. Each component is differentiated only with respect to its own coordinate.

### P3. Find the curl of $\mathbf{A}=-y\mathbf{a}_x+x\mathbf{a}_y$ and state what the result says about the field.

**Given:** A = -y a_x + x a_y

**Solution:**

1. A_x = -y, A_y = x, A_z = 0
2. (curl A)_x = dA_z/dy - dA_y/dz = 0 - 0 = 0
3. (curl A)_y = dA_x/dz - dA_z/dx = 0 - 0 = 0
4. (curl A)_z = dA_y/dx - dA_x/dy = 1 - (-1) = 2
5. curl A = 2a_z

> [!success]- Answer
> **$\nabla\times\mathbf{A}=2\mathbf{a}_z$ — a uniform rotation about the $z$-axis (velocity field of rigid-body rotation).**

> [!warning] Trap
> Reading the field as 'circular, therefore curl is zero'. The $\partial A_y/\partial x$ and $-\partial A_x/\partial y$ terms add rather than cancel; the field circulates and its curl is non-zero and uniform.

### P4. A purely radial field is $\mathbf{A}=r^2\mathbf{a}_r$. Show that $\nabla\cdot\mathbf{A}=4r$ and evaluate it at $r=0.5$ m.

**Given:** A = r^2 a_r (spherical)

**Solution:**

1. Only the radial term of the spherical divergence survives: div A = (1/r^2) d(r^2 A_r)/dr
2. r^2 A_r = r^2(r^2) = r^4
3. d(r^4)/dr = 4r^3
4. div A = (1/r^2)(4r^3) = 4r
5. At r = 0.5 m: div A = 2 per metre

> [!success]- Answer
> **$\nabla\cdot\mathbf{A}=4r$; at $r=0.5$ m it equals $2\ \mathrm{m^{-1}}$.**

> [!warning] Trap
> Differentiating $A_r$ alone as $2r$ and forgetting the $r^2$ weighting. For radial fields the divergence is $\frac{1}{r^2}\frac{\partial(r^2A_r)}{\partial r}$, so an $r^2$ field has divergence $4r$, not $2r$.

### P5. The potential in a one-dimensional region is $V=-1.1294\times10^{5}x^2$ volts with $x$ in metres. Find the volume charge density, using $\varepsilon_0=8.854\times10^{-12}$ F/m.

**Given:** V = -1.1294e5 x^2 V; eps0 = 8.854e-12 F/m

**Solution:**

1. dV/dx = -2(1.1294e5)x = -2.2588e5 x
2. d2V/dx^2 = -2.2588e5 V/m^2 = laplacian of V
3. Poisson: laplacian V = -rho_v/eps0, so rho_v = -eps0(laplacian V)
4. rho_v = -(8.854e-12)(-2.2588e5)
5. rho_v = +2.000e-6 C/m^3

> [!success]- Answer
> **$\rho_v=+2.00\ \mu\mathrm{C/m^3}$ — a uniform positive volume charge.**

> [!warning] Trap
> Using $\nabla^2V=+\rho_v/\varepsilon_0$. The minus sign is physical, and here it is the only thing that makes the charge density come out positive for a downward-curving potential.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×1.1294E5=` → $\lvert d^2V/dx^2\rvert$ = **2.2588E5** V/m².
> 2. `(-)` `SHIFT` `CVALUE` `32` `×` `(-)` `Ans` `=` → $\rho_v$ = **2.000E-6** C/m³, with code `32` = $\varepsilon_0$.
> 3. The two minus signs cancel: Poisson gives $\rho_v=-\varepsilon_0\nabla^2V$ and $\nabla^2V$ is negative here.

## Traps & Exam Notes

- **Divergence returns a scalar, curl returns a vector.** Answering $\nabla\cdot\mathbf{A}$ with components loses the mark even if the arithmetic is perfect. Only $\nabla\times\mathbf{A}$ has a direction.
- **Dropping the metric factors in the cylindrical and spherical operators.** $\nabla\cdot\mathbf{A}$ in cylindrical starts with $\frac{1}{\rho}\frac{\partial(\rho A_\rho)}{\partial\rho}$, not $\frac{\partial A_\rho}{\partial\rho}$. A uniform $A_\rho=c/\rho$ field has zero divergence only because of the $\rho$ inside the derivative.
- **Sign in Poisson's equation.** $\nabla^2V=-\rho_v/\varepsilon$, so a positive charge density gives a negative Laplacian (downward curvature). Flipping the sign flips every computed charge density.
- **Confusing the operator with its inverse property.** $\nabla\times\mathbf{E}=0$ is what lets you define a potential $V$; $\nabla\cdot\mathbf{D}=\rho_v$ is Gauss's law in point form. A field can have zero curl and non-zero divergence (a point charge field does exactly that).
- **Applying $\mathbf{E}=-\nabla V$ to a time-varying field.** It holds only in electrostatics; with changing flux the field has a non-zero curl and a scalar potential alone is not enough.

## See Also

- [[01_Coordinate_Systems_and_Vector_Algebra]]
- [[03_Divergence_and_Stokes_Theorems]]
- [[05_Gauss_Law_and_Applications]]
- [[06_Electric_Potential_and_Gradient]]

---

[[01_Coordinate_Systems_and_Vector_Algebra|⬅ 01]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Divergence_and_Stokes_Theorems|03 ➡]]
