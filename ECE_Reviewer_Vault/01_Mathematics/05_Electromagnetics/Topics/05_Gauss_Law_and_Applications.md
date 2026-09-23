---
id: MATH-05-05
title: "Gauss Law and Applications"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Divergence_and_Stokes_Theorems]]", "[[04_Coulomb’s_Law_and_E_Field]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Gauss Law and Applications

> [!abstract] Scope
> Use Gauss's law to find electric flux density and field for the three symmetric geometries — spherical, cylindrical and planar — including charged conductors and uniform volume charge.

## Core Concept

> [!tip] Intuition
> Gauss's law is a bookkeeping statement: the number of field lines crossing any closed surface equals the charge trapped inside. It is always true, but it only becomes a formula you can solve when symmetry lets you pull |D| out of the integral.

**The law and the symmetry requirement.** In integral form the law reads:
$$\oint_S\mathbf{D}\cdot d\mathbf{S}=Q_{\mathrm{enc}}$$
The flux of $\mathbf{D}$ through any closed surface depends only on the charge enclosed — not on the shape of the surface, not on where the charges sit inside it, and not on charges outside at all. But to turn the integral into $D\times(\mathrm{area})$ you must be able to argue that $|\mathbf{D}|$ is constant over the surface and everywhere normal to it. That argument exists for exactly three geometries: spherical (point charge, sphere), cylindrical (infinite line, coaxial cable) and planar (infinite sheet). Without one of the three, Gauss's law remains true but useless for finding the field, and you must integrate Coulomb contributions instead.

**The standard results and where the constants come from.** A point charge or a uniformly charged sphere seen from outside gives $D=Q/(4\pi r^2)$ because the Gaussian surface area is $4\pi r^2$. An infinite line gives $D=\lambda/(2\pi\rho)$ because the side area of a cylinder of length $L$ is $2\pi\rho L$. An infinite sheet gives $D=\sigma/2$ because flux escapes from *both* faces, so each side carries half the enclosed charge and the area cancels out entirely — the field does not weaken with distance. Each constant is a statement about the shape of the surface, which is why a wrong constant almost always means the wrong Gaussian surface.

**Conductors versus insulators.** Inside a conductor in electrostatic equilibrium the field is exactly zero, so $Q_{\mathrm{enc}}=0$ and all excess charge sits on the outer surface, spread with $\sigma=Q/(4\pi a^2)$ for a sphere. Just outside, $E=\sigma/\varepsilon_0$. Inside a uniformly charged *insulating* sphere the field is not zero: only the charge within radius $r$ is enclosed, so $E=\rho r/(3\varepsilon_0)=kQr/a^3$, growing linearly from the centre and matching the outside expression at $r=a$. Mistaking one for the other is a recurring exam error.

**Reading the field from flux density.** $\mathbf{D}$ responds only to free charge; in vacuum or air $\mathbf{E}=\mathbf{D}/\varepsilon_0$. Inside a dielectric, $\mathbf{D}=\varepsilon\mathbf{E}$ with $\varepsilon=\varepsilon_r\varepsilon_0$, so the same free charge produces a field smaller by $\varepsilon_r$ — the bound charge partially cancels it. That is why Gauss's law is written for $\mathbf{D}$: the free charge is what you control and can measure, and it is the quantity that stays continuous across a dielectric interface with no free surface charge.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Gauss's law | $\oint_S\mathbf{D}\cdot d\mathbf{S}=Q_{\mathrm{enc}}=\int_V\rho_v\,dv$ | S is any closed surface. Only the enclosed charge counts; outside charges contribute zero net flux. |
| Point form | $\nabla\cdot\mathbf{D}=\rho_v$ | True at every point, symmetry or not; used to get Poisson's equation. |
| Spherical symmetry | $D=\frac{Q_{\mathrm{enc}}}{4\pi r^2},\qquad E=\frac{Q_{\mathrm{enc}}}{4\pi\varepsilon r^2}$ | Any spherically symmetric distribution, evaluated outside it; the 4 pi is the sphere's area. |
| Infinite line or coaxial | $D=\frac{\lambda}{2\pi\rho},\qquad E=\frac{\lambda}{2\pi\varepsilon\rho}$ | Radial. Uses the cylinder side area 2 pi rho L, so lambda is charge per metre. |
| Infinite sheet | $D=\frac{\sigma}{2},\qquad E=\frac{\sigma}{2\varepsilon}$ | Independent of distance from the sheet. Half the flux leaves each face. |
| Conductor surface field | $E_{\mathrm{just\ outside}}=\frac{\sigma}{\varepsilon_0}$ | Because E = 0 inside, one face carries all the flux. Twice the free-sheet value. |
| Uniformly charged insulating sphere (inside) | $E=\frac{\rho r}{3\varepsilon}=\frac{kQr}{a^3},\qquad r\le a$ | Linear in r, zero at the centre. Only the charge inside r is enclosed. |
| Insulating sphere (outside) | $E=\frac{kQ}{r^2},\qquad r\ge a$ | Indistinguishable from a point charge at the centre. |
| Conducting sphere (inside) | $E=0,\qquad r<a$ | Electrostatic equilibrium. All excess charge lies on the surface. |
| Surface charge density of a sphere | $\sigma=\frac{Q}{4\pi a^2}$ | Radius a, not diameter. Using the diameter makes sigma four times too small. |

## Interactive Widget

**Gauss Law Flux Surface**

![[Gauss_Law_Flux_Surface.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A point charge $Q=10$ nC is at the centre of a spherical Gaussian surface of radius $0.2$ m. Find $D$ and $E$ on the surface.

**Given:** Q = 10 nC at centre; r = 0.2 m

**Solution:**

1. Gaussian surface area = 4 pi r^2 = 4 pi (0.04) = 0.50265 m^2
2. D = Q/(4 pi r^2) = (10e-9)/0.50265 = 1.989e-8 C/m^2
3. E = D/eps0 = (1.989e-8)/(8.854e-12) = 2.247e3 V/m
4. Check by the point-charge formula: E = kQ/r^2 = (8.988e9)(10e-9)/0.04 = 2247 V/m

> [!success]- Answer
> **$D=19.9\ \mathrm{nC/m^2}$; $E=2.25$ kV/m, radially outward.**

> [!warning] Trap
> Using the surface area $4\pi r^2$ but substituting $r^2=0.2$ instead of $0.04$. Also, the flux would be unchanged if the charge were off-centre — but $D$ would no longer be uniform, so the shortcut $D=Q/(4\pi r^2)$ would fail.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10E-9÷(4\pi×0.2²)=` → $D$ = **1.989E-8** C/m².
> 2. `Ans÷` `SHIFT` `CVALUE` `32` `=` → $E$ = **2247** V/m, with code `32` = $\varepsilon_0$.
> 3. Point-charge check: `8.988E9×10E-9÷0.2²=` → **2247** V/m, agreeing.
>
> $r^2$ is `0.04`, not `0.2`; keying `0.2` gives 11.2 nC/m², four times too large.

### P2. An insulating sphere of radius $a=2$ cm carries $Q=4\ \mu\mathrm{C}$ uniformly distributed. Find $E$ at $r=1$ cm and at $r=4$ cm.

**Given:** Q = 4 uC; a = 2 cm; r1 = 1 cm (inside); r2 = 4 cm (outside)

**Solution:**

1. Inside (r < a): E = kQr/a^3 = (8.988e9)(4e-6)(0.01)/(0.02)^3
2. = 35952 x 0.01 / 8e-6 = 359.52/8e-6 = 4.494e7 V/m
3. Outside (r > a): treat the whole charge as a point charge at the centre
4. E = kQ/r^2 = (8.988e9)(4e-6)/(0.04)^2 = 35952/1.6e-3 = 2.247e7 V/m

> [!success]- Answer
> **$E(1\ \mathrm{cm})=44.9$ MV/m; $E(4\ \mathrm{cm})=22.5$ MV/m.**

> [!warning] Trap
> Applying $kQ/r^2$ inside the sphere. That formula encloses the whole charge, but at $r=1$ cm only $(r/a)^3=1/8$ of the charge lies inside the Gaussian surface; using the full charge overestimates the field eightfold.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `8.988E9×4E-6=` → $kQ$ = **35952**; store with `SHIFT` `STO` `A`.
> 2. `A×0.01÷0.02³=` → inside $E$ = **4.494E7** V/m; `A÷0.04²=` → outside $E$ = **2.247E7** V/m.
> 3. Ratio check: `4.494E7÷2.247E7=` → **2.00**, exactly $a/r_1$.
>
> Inside, only the fraction $(r/a)^3=1/8$ of $Q$ is enclosed; `kQ/r²` there gives 8x too much.

### P3. A long coaxial line has inner conductor charge $\lambda=30$ nC/m. Find $E$ at $\rho=5$ mm.

**Given:** lambda = 30 nC/m; rho = 5 mm

**Solution:**

1. E = lambda/(2 pi eps0 rho)
2. 2 pi eps0 = 5.5635e-11
3. Denominator = (5.5635e-11)(0.005) = 2.7818e-13
4. E = (30e-9)/(2.7818e-13) = 1.078e5 V/m

> [!success]- Answer
> **$E=108$ kV/m, radially outward from the inner conductor.**

> [!warning] Trap
> Treating the coaxial problem as a point charge and using $4\pi\varepsilon_0\rho^2$. The cylindrical Gaussian surface has area $2\pi\rho L$, so the field falls as $1/\rho$, not $1/\rho^2$. Also, only the *inner* conductor's charge is enclosed between the conductors.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `30E-9÷(2\pi×` `SHIFT` `CVALUE` `32` `×0.005)=` → $E$ = **1.078E5** V/m = **108** kV/m.
> 2. Unit check: `0.005` m is the 5 mm radius; leaving `5` gives **108** V/m, off by $10^{3}$.
> 3. The same line with `4\pi` returns **5.39E4** V/m, the cylindrical-symmetry trap.
>
> Code `32` is $\varepsilon_0$.

### P4. An infinite sheet carries a uniform free surface charge $\sigma=8$ nC/m². Find $D$ and $E$ on each side.

**Given:** sigma = 8 nC/m2

**Solution:**

1. Use a pillbox straddling the sheet, area A on each face
2. Flux = 2DA (one face each side); enclosed charge = sigma A
3. 2DA = sigma A, so D = sigma/2 = (8e-9)/2 = 4.0e-9 C/m^2
4. E = D/eps0 = (4.0e-9)/(8.854e-12) = 451.8 V/m

> [!success]- Answer
> **$D=4.0\ \mathrm{nC/m^2}$; $E=452$ V/m on each side, directed away from the sheet.**

> [!warning] Trap
> Writing $D=\sigma$ because the pillbox area cancelled. The factor $\frac{1}{2}$ comes from having *two* faces; forgetting it doubles the field. The same reasoning is why the field of a sheet does not fall off with distance.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `8E-9÷2=` → $D$ = **4.0E-9** C/m² — the pillbox has two faces, so the half survives.
> 2. `Ans÷` `SHIFT` `CVALUE` `32` `=` → $E$ = **451.8** V/m on each side, with code `32` = $\varepsilon_0$.
> 3. Without the half: `8E-9÷` `SHIFT` `CVALUE` `32` `=` → **903.5** V/m, double.

### P5. A conducting sphere of radius $a=5$ cm carries $Q=20$ nC. Find $E$ at $r=2$ cm and $r=10$ cm, and the surface charge density.

**Given:** Q = 20 nC; a = 5 cm

**Solution:**

1. r = 2 cm < a: inside the conductor, E = 0
2. r = 10 cm > a: E = kQ/r^2 = (8.988e9)(20e-9)/(0.1)^2 = 179.76/0.01 = 1.798e4 V/m
3. sigma = Q/(4 pi a^2) = (20e-9)/(4 pi x 0.0025) = (20e-9)/0.031416 = 6.366e-7 C/m^2
4. Check just outside the surface: E = sigma/eps0 = (6.366e-7)/(8.854e-12) = 7.19e4 V/m, which equals kQ/a^2

> [!success]- Answer
> **$E(2\ \mathrm{cm})=0$; $E(10\ \mathrm{cm})=18.0$ kV/m; $\sigma=637\ \mathrm{nC/m^2}$.**

> [!warning] Trap
> Using $kQ/r^2$ at $r=2$ cm. Inside a conductor the field is zero — the charge has rearranged itself entirely onto the surface, and the Gaussian surface at $r=2$ cm encloses nothing.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `8.988E9×20E-9÷0.1²=` → $E$ at 10 cm = **1.7976E4** V/m; at $r=2$ cm, inside the conductor, $E$ = **0**.
> 2. `20E-9÷(4\pi×0.05²)=` → $\sigma$ = **6.366E-7** C/m² = **637** nC/m².
> 3. Check: `Ans÷` `SHIFT` `CVALUE` `32` `=` → **7.19E4** V/m, which equals $kQ/a^2$.

## Traps & Exam Notes

- **Using Gauss's law where the symmetry does not exist.** The law is always true, but $D=Q/(4\pi r^2)$ is only a *solution* for spherical symmetry. For a finite line, a disc or a cube you must integrate; assuming a Gaussian shortcut there gives an answer that is simply wrong.
- **Enclosing the wrong charge.** $Q_{\mathrm{enc}}$ is only the charge inside the surface. A charge just outside contributes to the local field but adds zero net flux, and including it in the formula breaks the result.
- **Conducting versus insulating sphere.** Inside a conductor $E=0$; inside a uniformly charged insulator $E=\rho r/(3\varepsilon_0)$, rising linearly. The charge distribution is different, so the fields are different.
- **Radius versus diameter.** $\sigma=Q/(4\pi a^2)$ uses the radius. Substituting the diameter makes the surface area four times too large and $\sigma$ four times too small.
- **Forgetting the factor two for a sheet versus a conductor surface.** A free charge sheet gives $\sigma/2\varepsilon_0$; the surface of a conductor gives $\sigma/\varepsilon_0$, because inside the conductor the field is zero and both halves of the flux emerge on the same side.
- **Unit slips with nC and mm.** $\lambda=30\ \mathrm{nC/m}$ and $\rho=5\ \mathrm{mm}$ must enter as $30\times10^{-9}$ and $5\times10^{-3}$; mixing them changes the answer by factors of $10^{3}$ to $10^{6}$.

## See Also

- [[03_Divergence_and_Stokes_Theorems]]
- [[04_Coulomb’s_Law_and_E_Field]]
- [[06_Electric_Potential_and_Gradient]]
- [[08_Dielectrics_and_Boundary_Conditions]]
- [[09_Capacitance_from_Geometry]]

---

[[04_Coulomb’s_Law_and_E_Field|⬅ 04]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Electric_Potential_and_Gradient|06 ➡]]
