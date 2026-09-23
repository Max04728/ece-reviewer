---
id: MATH-05-03
title: "Divergence and Stokes Theorems"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 3
tier: 2
depth: full
problem_count: 4
prereqs: ["[[02_Gradient,_Divergence,_Curl_and_Laplacian]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Divergence and Stokes Theorems

> [!abstract] Scope
> Convert between closed-surface flux integrals and volume integrals of the divergence, and between closed-loop line integrals and surface integrals of the curl — the two bridge theorems that turn Maxwell's equations into usable algebra.

## Core Concept

> [!tip] Intuition
> Both theorems say that what happens on a boundary is already accounted for by what happens inside. Interior contributions cancel in pairs, so only the outer skin survives. The divergence theorem does this for flux out of a volume; Stokes' theorem does it for circulation around a rim.

**Divergence theorem: surface flux equals volume source.** The statement is:
$$\oint_S\mathbf{A}\cdot d\mathbf{S}=\int_V(\nabla\cdot\mathbf{A})\,dv$$
where $S$ is the *closed* surface bounding $V$. The proof idea is worth keeping: tile the volume with tiny cells. Every internal face is shared by two cells and the outward flux through it appears twice with opposite signs, so all internal contributions cancel. What survives is the flux through the outer boundary. Practically, the theorem lets you swap a hard surface integral for an easy volume integral or the reverse; applying it to $\mathbf{D}$ turns the flux into the enclosed charge:
$$\oint\mathbf{D}\cdot d\mathbf{S}=Q_{\mathrm{enc}}$$
the integral face of the point form $\nabla\cdot\mathbf{D}=\rho_v$.

**Stokes' theorem: loop circulation equals curl flux.** The statement is:
$$\oint_L\mathbf{A}\cdot d\mathbf{l}=\int_S(\nabla\times\mathbf{A})\cdot d\mathbf{S}$$
where $L$ is the closed rim of the open surface $S$. The same cancellation argument applies: subdivide $S$ into patches, each internal edge is traversed twice in opposite directions, and only the boundary survives. Orientation is fixed by the right-hand rule — fingers along $L$, thumb along $d\mathbf{S}$. Applied to electrostatics it gives $\oint\mathbf{E}\cdot d\mathbf{l}=0$ and hence $\nabla\times\mathbf{E}=0$: static fields are conservative, and that is why a potential $V$ exists at all. Applied to magnetostatics it gives Ampère's law.

**Which theorem to reach for.** Use the divergence theorem when the natural object is a closed surface (Gauss's law, charge enclosed, flux out of a box or sphere). Use Stokes' theorem when the natural object is a closed loop (line integral of $\mathbf{E}$ or $\mathbf{H}$, circulation, work around a path). The two are complements, not alternatives: one converts dimension 2 to 3, the other converts dimension 1 to 2. A useful corollary follows for any *closed* surface:
$$\oint_S(\nabla\times\mathbf{A})\cdot d\mathbf{S}=0$$
because a closed surface has no rim for the line integral to run around.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Divergence theorem | $\oint_S\mathbf{A}\cdot d\mathbf{S}=\int_V(\nabla\cdot\mathbf{A})\,dv$ | S must be the closed surface bounding V, with dS pointing outward. |
| Stokes' theorem | $\oint_L\mathbf{A}\cdot d\mathbf{l}=\int_S(\nabla\times\mathbf{A})\cdot d\mathbf{S}$ | L is the closed rim of the open surface S; orientation follows the right-hand rule. |
| Flux through a closed surface | $\Phi=\oint_S\mathbf{A}\cdot d\mathbf{S}$ | Scalar, in units of A times area. Zero for a solenoidal field. |
| Gauss's law in integral form | $\oint_S\mathbf{D}\cdot d\mathbf{S}=Q_{\mathrm{enc}}=\int_V\rho_v\,dv$ | Obtained by applying the divergence theorem to D. Enclosed charge only. |
| Gauss's law in point form | $\nabla\cdot\mathbf{D}=\rho_v$ | The differential twin of the flux law; valid pointwise, no symmetry needed. |
| Electrostatic circulation | $\oint_L\mathbf{E}\cdot d\mathbf{l}=0\iff\nabla\times\mathbf{E}=0$ | Static fields only. A changing magnetic flux breaks this and defines an emf. |
| Ampère's law in integral form | $\oint_L\mathbf{H}\cdot d\mathbf{l}=I_{\mathrm{enc}}$ | Current enclosed by L; previewed here, derived from Stokes in the magnetic topics. |
| Curl over a closed surface | $\oint_S(\nabla\times\mathbf{A})\cdot d\mathbf{S}=0$ | A closed surface has no boundary, so the rim integral vanishes. |
| Divergence of a curl | $\nabla\cdot(\nabla\times\mathbf{A})=0$ | Why the magnetic flux density can always be written as B = curl A. |

## Worked Problems

### P1. Verify the divergence theorem for $\mathbf{A}=x\mathbf{a}_x+y\mathbf{a}_y+z\mathbf{a}_z$ over the unit cube $0\le x,y,z\le 1$.

**Given:** A = x a_x + y a_y + z a_z; unit cube 0..1 on each axis

**Solution:**

1. Volume side: div A = 1 + 1 + 1 = 3
2. Volume integral = 3 x (volume) = 3(1) = 3
3. Surface side, face x = 1: A.dS = x dy dz = 1, integral = 1; face x = 0: 0
4. Same for the y and z pairs: 1 + 1
5. Total flux = 1 + 1 + 1 = 3

> [!success]- Answer
> **Both sides give $3$ — the theorem checks out.**

> [!warning] Trap
> Integrating over all six faces but forgetting that the face at the origin contributes zero here. More commonly the opposite error: counting three faces and reporting a flux of 3 by luck while missing that each pair must be evaluated separately.

### P2. For $\mathbf{A}=r^2\mathbf{a}_r$, evaluate the outward flux through the sphere $r=2$ m two ways.

**Given:** A = r^2 a_r; sphere r = 2 m

**Solution:**

1. Surface side: on r = 2, dS = r^2 sin(theta) d(theta) d(phi) a_r = 4 sin(theta) d(theta) d(phi) a_r
2. Flux = (r^2)(4) x integral of sin(theta) over the sphere = (4)(4)(4pi) = 64pi
3. Volume side: div A = (1/r^2) d(r^4)/dr = 4r
4. Volume integral = integral of 4r dv = 4 x integral of r (4pi r^2 dr) from 0 to 2
5. = 16pi x [r^4/4] from 0 to 2 = 16pi (4) = 64pi

> [!success]- Answer
> **$\Phi=64\pi=201.1$ (units of A times m²).**

> [!warning] Trap
> Writing $\oint r^2\,dS$ with $dS=4\pi r^2$ but substituting $r=2$ in one place and leaving $r$ symbolic in the other. On the surface $r$ is the constant 2, so $A_r=4$ while the total surface area is $16\pi$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `∫dx` of $16\pi X^3$ from 0 to 2 `=` → **201.06** on the volume side.
> 2. Surface side: `4×4\pi×2²=` → **201.06** — $A_r=4$ at $r=2$ times the area $4\pi r^2=16\pi$.
> 3. Both routes return $64\pi$; the $4\pi$ Jacobian is not optional.

### P3. Use Stokes' theorem to evaluate $\oint\mathbf{A}\cdot d\mathbf{l}$ for $\mathbf{A}=-y\mathbf{a}_x+x\mathbf{a}_y$ around the unit circle in the $xy$-plane, traversed counter-clockwise.

**Given:** A = -y a_x + x a_y; L: unit circle in xy-plane, counter-clockwise

**Solution:**

1. curl A = (dA_y/dx - dA_x/dy)a_z = (1 + 1)a_z = 2a_z
2. The flat disc bounded by L has dS = a_z dS with the counter-clockwise rim by the right-hand rule
3. Flux of curl = 2 x (area of disc) = 2(pi)(1)^2 = 2pi
4. Direct check: on the circle A = a_phi, so A.dl = d(phi) and the integral is 2pi

> [!success]- Answer
> **$\oint\mathbf{A}\cdot d\mathbf{l}=2\pi=6.283$.**

> [!warning] Trap
> Using the clockwise rim with $d\mathbf{S}=+\mathbf{a}_z$. That orientation pair is inconsistent and yields $-2\pi$; the right-hand rule must couple the rim direction to the normal, not to convenience.

### P4. For $\mathbf{A}=y\mathbf{a}_x$, evaluate $\oint\mathbf{A}\cdot d\mathbf{l}$ counter-clockwise around the square $0\le x\le 1$, $0\le y\le 1$ in the $xy$-plane, and confirm with Stokes' theorem.

**Given:** A = y a_x; square from (0,0) to (1,1), counter-clockwise

**Solution:**

1. Bottom leg (y = 0, x: 0 to 1): A = 0, contribution 0
2. Right leg (x = 1, y: 0 to 1): dl = a_y dy, but A = y a_x, so A.dl = 0
3. Top leg (y = 1, x: 1 to 0): A = a_x, dl = a_x dx, contribution = integral from 1 to 0 of dx = -1
4. Left leg (x = 0, y: 1 to 0): dl = a_y dy, A.dl = 0
5. Loop integral = -1
6. Stokes: curl A = (dA_y/dx - dA_x/dy)a_z = (0 - 1)a_z = -a_z; flux = (-1)(area 1) = -1

> [!success]- Answer
> **$\oint\mathbf{A}\cdot d\mathbf{l}=-1$; Stokes' theorem gives the same value.**

> [!warning] Trap
> Assuming only the 'top' leg can contribute because $A$ points in $x$, then getting the sign from $\int_1^0 dx$ wrong. The $y=1$ leg is traversed in the $-x$ direction, which supplies the minus sign.

## Traps & Exam Notes

- **Applying the divergence theorem to an open surface.** It requires a *closed* surface. A disc, a hemispherical cap or a cylinder side alone has no enclosed volume; those need Stokes' theorem or a direct flux integral.
- **Applying Stokes' theorem to a non-closed path.** The line integral must run around a closed rim. If the path is not closed, either close it and subtract the added piece, or integrate directly.
- **Orientation mismatch between loop and surface normal.** Reversing either the traversal direction or the chosen $d\mathbf{S}$ flips the sign of the entire result. In an exam, a sign-flipped circulation typically loses the mark even when the magnitude is correct.
- **Assuming the surface integral of a curl is always zero.** It is zero only over a *closed* surface. Over an open surface it equals the line integral around the rim.
- **Thinking the divergence theorem solves for $\mathbf{D}$ in any geometry.** The theorem is always true, but extracting $|\mathbf{D}|$ from it requires the field to be constant in magnitude and normal to the chosen surface — spherical, cylindrical or planar symmetry only.

## See Also

- [[01_Coordinate_Systems_and_Vector_Algebra]]
- [[02_Gradient,_Divergence,_Curl_and_Laplacian]]
- [[05_Gauss_Law_and_Applications]]
- [[13_Ampere’s_Circuital_Law]]

---

[[02_Gradient,_Divergence,_Curl_and_Laplacian|⬅ 02]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Coulomb’s_Law_and_E_Field|04 ➡]]
