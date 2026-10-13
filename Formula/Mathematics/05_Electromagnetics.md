---
title: Electromagnetics
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 22
---

## Part A — Electrostatics and Vector Analysis

### 1. Coordinate Systems and Vector Algebra

**Coordinate conversions ★**

$$x=\rho\cos\phi,\quad y=\rho\sin\phi,\quad z=z$$

$$r=\sqrt{x^2+y^2+z^2},\qquad \theta=\arccos\!\left(\frac{z}{r}\right),\qquad \phi=\arctan\!\left(\frac{y}{x}\right)$$

**Differential elements**

| System | $d\vec l$ | $d\vec S$ | $dV$ |
|---|---|---|---|
| Cartesian | $\hat a_x dx+\hat a_y dy+\hat a_z dz$ | $dx\,dy$ | $dx\,dy\,dz$ |
| Cylindrical | $\hat a_\rho d\rho+\rho\hat a_\phi d\phi+\hat a_z dz$ | $\rho\,d\rho\,d\phi$ | $\rho\,d\rho\,d\phi\,dz$ |
| Spherical | $\hat a_r dr+r\hat a_\theta d\theta+r\sin\theta\,d\phi$ | $r^2\sin\theta\,d\theta\,d\phi$ | $r^2\sin\theta\,dr\,d\theta\,d\phi$ |

**Products and identities ★**

$$\vec A\cdot\vec B=AB\cos\theta,\qquad \vec A\times\vec B=\hat n\,AB\sin\theta,\qquad \vec A\times\vec B=-\vec B\times\vec A$$

$$\vec A\times(\vec B\times\vec C)=\vec B(\vec A\cdot\vec C)-\vec C(\vec A\cdot\vec B)$$

$$\vec A\cdot(\vec B\times\vec C)=\vec B\cdot(\vec C\times\vec A)=\vec C\cdot(\vec A\times\vec B)$$

**Geometric reading of the scalar triple product ★** — $\vec A,\vec B,\vec C$ in the same length unit.

$$\lvert\vec A\cdot(\vec B\times\vec C)\rvert=\text{parallelepiped volume},\qquad \vec A\cdot(\vec B\times\vec C)=0\iff\text{coplanar}$$

$$\lvert\vec A\times\vec B\rvert=\text{parallelogram area},\qquad \tfrac12\lvert\vec A\times\vec B\rvert=\text{triangle area}$$

**Conditions:** right-handed orthonormal set $\hat a_x\times\hat a_y=\hat a_z$; components in m, unit vectors dimensionless. #vector

---

### 2. Gradient, Divergence, Curl and Laplacian

**Cartesian operators ★**

| Operator | Cartesian form |
|---|---|
| $\nabla V$ | $\hat a_x\partial_x V+\hat a_y\partial_y V+\hat a_z\partial_z V$ |
| $\nabla\cdot\vec A$ | $\partial_x A_x+\partial_y A_y+\partial_z A_z$ |
| $\nabla\times\vec A$ | $\begin{vmatrix}\hat a_x&\hat a_y&\hat a_z\\ \partial_x&\partial_y&\partial_z\\ A_x&A_y&A_z\end{vmatrix}$ |
| $\nabla^2 V$ | $\partial_x^2V+\partial_y^2V+\partial_z^2V$ |

![](https://www.youtube.com/watch?v=rB83DpBJQsE)

*Video: Divergence and Curl — 3Blue1Brown, 15:42*

**Cylindrical ★**

$$\nabla\cdot\vec A=\frac1\rho\partial_\rho(\rho A_\rho)+\frac1\rho\partial_\phi A_\phi+\partial_z A_z$$

$$\nabla^2V=\frac1\rho\partial_\rho(\rho\,\partial_\rho V)+\frac1{\rho^2}\partial_\phi^2V+\partial_z^2V$$

**Spherical ★**

$$\nabla\cdot\vec A=\frac1{r^2}\partial_r(r^2A_r)+\frac1{r\sin\theta}\partial_\theta(\sin\theta\,A_\theta)+\frac1{r\sin\theta}\partial_\phi A_\phi$$

$$\nabla^2V=\frac1{r^2}\partial_r(r^2\partial_rV)+\frac1{r^2\sin\theta}\partial_\theta(\sin\theta\,\partial_\theta V)+\frac1{r^2\sin^2\theta}\partial_\phi^2V$$

**Second-derivative identities**

$$\nabla\times\nabla V=0,\qquad \nabla\cdot(\nabla\times\vec A)=0,\qquad \nabla\cdot(V\vec A)=V\,\nabla\cdot\vec A+\vec A\cdot\nabla V$$

**Directional derivative ★** — $\hat a$ a unit vector (dimensionless), $V$ in V.

$$D_{\hat a}V=\nabla V\cdot\hat a,\qquad \max D_{\hat a}V=\lvert\nabla V\rvert\ \text{(in the direction of }\nabla V),\qquad \min D_{\hat a}V=-\lvert\nabla V\rvert$$

**Field classification** — $\nabla\cdot\vec A=0$: **solenoidal** (no sources or sinks); $\nabla\times\vec A=0$: **irrotational** (conservative, so $\vec A=\nabla\phi$ exists); a field that is both is harmonic, $\nabla^2\phi=0$.

**Curvilinear curl ★**

$$\begin{aligned}
\nabla\times\vec A=\ &\hat a_\rho\left(\tfrac1\rho\partial_\phi A_z-\partial_zA_\phi\right)+\hat a_\phi\left(\partial_zA_\rho-\partial_\rho A_z\right)\\
&+\frac{\hat a_z}{\rho}\left(\partial_\rho(\rho A_\phi)-\partial_\phi A_\rho\right)\quad\text{(cylindrical)}
\end{aligned}$$

$$\begin{aligned}
\nabla\times\vec A=\ &\frac{\hat a_r}{r\sin\theta}\left(\partial_\theta(\sin\theta\,A_\phi)-\partial_\phi A_\theta\right)
+\frac{\hat a_\theta}{r}\left(\frac1{\sin\theta}\partial_\phi A_r-\partial_r(rA_\phi)\right)\\
&+\frac{\hat a_\phi}{r}\left(\partial_r(rA_\theta)-\partial_\theta A_r\right)\quad\text{(spherical)}
\end{aligned}$$

**Conditions:** $V,\vec A$ continuously differentiable; $V$ in V, $\vec A$ in its own SI unit. See [[04_Advanced_Engineering_Math#7. Laplace Transform Pairs|Laplace Transform Pairs]]. #vector

---

### 3. Divergence and Stokes Theorems

![](https://www.youtube.com/watch?v=PIoqMNL7tV0)

*Video: A Unified View of Vector Calculus: Stokes, Divergence and Green — Dr. Trefor Bazett, 8:18*

**Divergence theorem ★**

$$\oint_S\vec A\cdot d\vec S=\int_v(\nabla\cdot\vec A)\,dv$$

**Stokes theorem ★**

$$\oint_L\vec A\cdot d\vec l=\int_S(\nabla\times\vec A)\cdot d\vec S$$

**Immediate corollaries**

$$\oint_S(\nabla\times\vec A)\cdot d\vec S=0,\qquad \int_v\nabla\times\vec A\,dv=-\oint_S\vec A\times d\vec S$$

**Green's theorem in the plane ★** — $C$ the positively oriented boundary of the plane region $R$.

$$\oint_C\big(P\,dx+Q\,dy\big)=\iint_R\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)dA$$

It is Stokes' theorem with $\vec A=P\hat a_x+Q\hat a_y$ and $d\vec S=dA\,\hat a_z$; the area of $R$ follows from $P=-y/2$, $Q=x/2$.

**Conditions:** continuous first partials on the region; $S$ closed piecewise-smooth, boundary $L$ positively oriented, $d\vec S=\hat n\,dS$ outward.

> [!tip] High-yield ★
> These two identities convert every integral Maxwell law into its differential form and back — know both directions cold for derivations.

---

### 4. Coulomb's Law and E Field

![](https://www.youtube.com/watch?v=eCCbUdnj0j4)

*Video: Coulomb's Law Problems — Physics Ninja, 19:19*

**Point charges ★**

$$\vec F=\frac{q_1q_2}{4\pi\varepsilon_0R^2}\hat a_R,\qquad \vec E=\frac{q}{4\pi\varepsilon_0R^2}\hat a_R=\frac{\vec F}{q}$$

**Superposition ★**

$$\vec E=\sum_i\frac{q_i(\vec r-\vec r_i)}{4\pi\varepsilon_0\lvert\vec r-\vec r_i\rvert^3}$$

$$\vec E=\int\frac{\rho_L\,dl}{4\pi\varepsilon_0R^2}\hat a_R=\int\frac{\rho_S\,dS}{4\pi\varepsilon_0R^2}\hat a_R=\int\frac{\rho_v\,dv}{4\pi\varepsilon_0R^2}\hat a_R$$

**Standard geometries ★**

| Source | Field |
|---|---|
| Infinite line charge | $\vec E=\dfrac{\rho_L}{2\pi\varepsilon_0\rho}\hat a_\rho$ |
| Infinite sheet | $\vec E=\dfrac{\rho_S}{2\varepsilon_0}\hat a_n$ |
| Ring / disk on axis | integrate $z$-components |

**Constants and units**

$$k=\frac{1}{4\pi\varepsilon_0}=8.99\times10^9\ \text{m/F},\qquad \varepsilon_0=8.854\times10^{-12}\ \text{F/m}$$

**Conditions:** static charges in vacuum; superposition valid in linear media; field point off the source. $\vec F$ in N, $\vec E$ in V/m, $q$ in C, $\rho_L$ C/m, $\rho_S$ C/m², $\rho_v$ C/m³. #electrostatics

---

### 5. Gauss Law and Applications

**Integral and point form ★**

$$\oint_S\vec D\cdot d\vec S=Q_{enc},\qquad \nabla\cdot\vec D=\rho_v$$

$$\vec D=\varepsilon_0\vec E+\vec P=\varepsilon\vec E$$

**Field by symmetry ★**

| Geometry | $E$ at distance $r$ or $\rho$ |
|---|---|
| Point / outside sphere | $\dfrac{Q}{4\pi\varepsilon r^2}$ |
| Uniform sphere (inside) | $\dfrac{\rho_v r}{3\varepsilon}$ |
| Infinite line | $\dfrac{\rho_L}{2\pi\varepsilon\rho}$ |
| Infinite sheet | $\dfrac{\rho_S}{2\varepsilon}$ |
| Coaxial (between conductors) | $\dfrac{\rho_L}{2\pi\varepsilon\rho}$ |

**Conditions:** high symmetry (spherical, cylindrical, planar) so $\vec D$ is normal to and constant over the Gaussian surface. $\vec D$ in C/m², $Q_{enc}$ in C, $\varepsilon=\varepsilon_r\varepsilon_0$ in F/m, $\varepsilon_r\ge1$ dimensionless.

![](https://www.youtube.com/watch?v=q1eor6oIuUo)

*Video: Electric Flux, Gauss's Law and Electric Fields — The Organic Chemistry Tutor, 12:52*

> [!warning] Exam trap
> $\oint\vec E\cdot d\vec S=Q_{enc}/\varepsilon_0$ uses **total** charge including bound charge; $\oint\vec D\cdot d\vec S=Q_{free}$ uses free charge only — the two $Q$'s differ inside a dielectric.

---

### 6. Electric Potential and Gradient

**Potential from field ★**

$$V=-\int_A^B\vec E\cdot d\vec l,\qquad \vec E=-\nabla V$$

**Potential of a charge distribution**

$$V=\frac{q}{4\pi\varepsilon_0r},\qquad V=-\int\frac{\rho_v\,dv}{4\pi\varepsilon_0R}$$

**Simple cases**

$$V=Ed\ \text{(parallel plates)},\qquad E=-\frac{dV}{dx}\ \text{(1-D field)},\qquad W=q(V_B-V_A)$$

**Conditions:** electrostatic field with $\nabla\times\vec E=0$, so $V$ is single-valued; reference $V(\infty)=0$ for a localized charge. $V$ in V = J/C, $W$ in J, $E$ in V/m. #electrostatics

---

### 7. Dipoles and Polarization

**Dipole moment and potential ★**

$$\vec p=Q\vec d,\qquad V=\frac{\vec p\cdot\hat a_r}{4\pi\varepsilon_0r^2}=\frac{p\cos\theta}{4\pi\varepsilon_0r^2}$$

**Dipole field, torque and force ★**

$$\vec E=\frac{p}{4\pi\varepsilon_0r^3}\big(2\cos\theta\,\hat a_r+\sin\theta\,\hat a_\theta\big)$$

$$\vec T=\vec p\times\vec E,\qquad W=-\vec p\cdot\vec E,\qquad \vec F=\nabla(\vec p\cdot\vec E)$$

**Polarization ★**

$$\vec D=\varepsilon_0\vec E+\vec P,\qquad \vec P=\chi_e\varepsilon_0\vec E,\qquad \chi_e=\varepsilon_r-1$$

$$\rho_{pv}=-\nabla\cdot\vec P,\qquad \rho_{ps}=\vec P\cdot\hat a_n$$

**Conditions:** ideal dipole $d\ll r$; linear isotropic dielectric gives the $\vec P$–$\vec E$ proportionality. $\vec p$ in C·m, $\vec P$ in C/m², $\vec T$ in N·m, $\chi_e$ dimensionless.

---

### 8. Dielectrics and Boundary Conditions

**Normal and tangential components ★**

$$D_{1n}-D_{2n}=\rho_S,\qquad E_{1t}=E_{2t}$$

**Refraction of field lines ★**

$$\frac{\tan\theta_1}{\tan\theta_2}=\frac{\varepsilon_1}{\varepsilon_2}=\frac{\varepsilon_{r1}}{\varepsilon_{r2}}$$

**Special case — no free surface charge**

$$D_{1n}=D_{2n}\quad (\rho_S=0)$$

**Energy density**

$$w_e=\frac12\vec D\cdot\vec E=\frac12\varepsilon E^2\ \text{(J/m}^3\text{)}$$

**Conditions:** no free surface charge for the $D_n$ equality; tangential $\vec E$ continuous across any boundary; media at rest.

---

### 9. Capacitance from Geometry

**Definitions and stored energy ★**

$$Q=CV,\qquad C=\frac{Q}{V},\qquad W=\frac12CV^2=\frac{Q^2}{2C}=\frac12QV$$

**Geometry formulas ★**

| Geometry | Capacitance |
|---|---|
| Parallel plate | $\dfrac{\varepsilon S}{d}$ |
| Coaxial cylinder | $\dfrac{2\pi\varepsilon L}{\ln(b/a)}$ |
| Concentric spheres | $\dfrac{4\pi\varepsilon}{\dfrac1a-\dfrac1b}$ |
| Isolated sphere | $4\pi\varepsilon a$ |
| Two-wire line | $\dfrac{\pi\varepsilon L}{\ln(D/a)}$ |

**Combinations**

$$\text{Series: }\frac1{C_{eq}}=\sum_i\frac1{C_i},\qquad \text{Parallel: }C_{eq}=\sum_i C_i$$

**Conditions:** linear dielectrics and static fields; fringing neglected for the parallel plate ($d\ll$ plate size). $C$ in F, $S$ in m², $d,L,a,b,D$ in m, $\varepsilon$ in F/m.

---

### 10. Electrostatic Energy and Forces

**Stored energy ★**

$$W_e=\frac12\int_v\rho_vV\,dv=\frac12\int_v\vec D\cdot\vec E\,dv,\qquad w_e=\frac12\varepsilon E^2=\frac{D^2}{2\varepsilon}$$

**Force on a conductor surface**

$$F=\frac{\rho_S^2}{2\varepsilon}S=\frac12\varepsilon E^2S\ \text{(N)},\qquad \text{pressure}=\frac12\varepsilon E^2\ \text{(Pa)}$$

**Image charge above a ground plane ★**

$$\text{image }-Q\ \text{at }-h,\qquad F=\frac{Q^2}{4\pi\varepsilon_0(2h)^2}$$

**Virtual work**

$$F=+\frac12V^2\frac{dC}{dx}\ \text{(constant }V\text{)},\qquad F=-\frac{dW_e}{dx}\ \text{(constant }Q\text{)}$$

**Conditions:** linear media with fixed geometry; pick the constant-$V$ or constant-$Q$ form to match how the source is connected.

---

## Part B — Magnetostatics

### 11. Current Density and Continuity

**Current and continuity ★**

$$\vec J=\rho_v\vec u\ \text{(A/m}^2\text{)},\qquad I=\int_S\vec J\cdot d\vec S$$

$$\nabla\cdot\vec J=-\frac{\partial\rho_v}{\partial t},\qquad \oint_S\vec J\cdot d\vec S=-\frac{dQ_{enc}}{dt}$$

**Steady state**

$$\nabla\cdot\vec J=0$$

**Ohm's law forms**

$$\vec J=\sigma\vec E,\qquad R=\frac{L}{\sigma S}=\frac{\rho L}{S},\qquad P=\int_v\vec E\cdot\vec J\,dv=I^2R$$

**Conditions:** drift model with $\vec u$ the carrier drift velocity; continuity is general, the steady form needs $\partial_t\rho_v=0$. $\vec J$ in A/m², $\vec u$ in m/s, $\sigma$ in S/m, $\rho=1/\sigma$ in Ω·m, $R$ in Ω, $P$ in W. #magnetostatics

---

### 12. Biot-Savart Law

![](https://www.youtube.com/watch?v=I8X1EpH_VQY)

*Video: Biot-Savart Law in Vector Form — Khan Academy India, 12:50*

**Differential forms ★**

$$d\vec H=\frac{Id\vec l\times\hat a_R}{4\pi R^2},\qquad \vec H=\oint_L\frac{Id\vec l\times\hat a_R}{4\pi R^2}$$

$$d\vec H=\frac{\vec K\times\hat a_R\,dS}{4\pi R^2}=\frac{\vec J\times\hat a_R\,dv}{4\pi R^2},\qquad \vec B=\mu_0\vec H$$

**Standard results ★**

| Source | Field |
|---|---|
| Infinite line | $\vec H=\dfrac{I}{2\pi\rho}\hat a_\phi$ |
| Loop on axis | $H=\dfrac{Ia^2}{2(a^2+z^2)^{3/2}}$ (centre: $I/2a$) |
| Finite segment | $H=\dfrac{I}{4\pi\rho}(\sin\theta_2-\sin\theta_1)$ |
| Solenoid | $H=nI$ |
| Toroid | $H=\dfrac{NI}{2\pi\rho}$ |

**Conditions:** steady currents ($\nabla\cdot\vec J=0$); $R$ runs from source element to field point; all elements superposed. $\vec H$ in A/m, $\vec B$ in T = Wb/m², $\mu_0=4\pi\times10^{-7}$ H/m, $I$ in A, $n=N/L$ in turns/m.

---

### 13. Ampere's Circuital Law

![](https://www.youtube.com/watch?v=lLQQjwuqdeg)

*Video: Ampere's Law and the Magnetic Field of a Solenoid — The Organic Chemistry Tutor, 10:05*

**Integral and point form ★**

$$\oint_L\vec H\cdot d\vec l=I_{enc},\qquad \nabla\times\vec H=\vec J\ \text{(static)}$$

$$\vec B=\mu\vec H,\qquad \mu=\mu_r\mu_0$$

**Applications**

| Geometry | $H$ |
|---|---|
| Infinite line | $I/2\pi\rho$ |
| Coaxial, $a<\rho<b$ | $I/2\pi\rho$ (zero outside) |
| Sheet | $H=K/2$ |
| Solenoid | $H=nI$ |
| Toroid | $H=NI/2\pi\rho$ |

**Conditions:** steady currents with enough symmetry to pull $\vec H$ from the integral (or $H_n=0$ where needed). $\mu_r$ dimensionless, $\mu$ in H/m, $K$ in A/m, $I_{enc}$ in A.

> [!warning] Exam trap
> Ampere's law holds for every closed loop but is only *computable* under symmetry; a loop that does not follow a constant-$H$ contour gives no shortcut.

---

### 14. Magnetic Boundary Conditions and Vector Potential

**Boundary conditions ★**

$$B_{1n}=B_{2n},\qquad H_{1t}-H_{2t}=K,\qquad \frac{\tan\theta_1}{\tan\theta_2}=\frac{\mu_1}{\mu_2}$$

**Vector potential ★**

$$\vec B=\nabla\times\vec A,\qquad \nabla\cdot\vec A=0,\qquad \nabla^2\vec A=-\mu\vec J\ \text{(Poisson)}$$

**Standard potentials**

$$A=\frac{\mu_0I}{4\pi}\oint\frac{d\vec l}{R},\qquad A_z=-\frac{\mu_0I}{2\pi}\ln\rho\ \text{(line)}$$

$$\Phi=\oint\vec A\cdot d\vec l=\int\vec B\cdot d\vec S$$

**Conditions:** magnetostatic (displacement current neglected); $K$ is free surface current tangential to the interface normal $\hat a_n$. $\vec A$ in Wb/m, $K$ in A/m, $\vec M$ in A/m with $\vec B=\mu_0(\vec H+\vec M)$, $\Phi$ in Wb.

---

### 15. Inductance from Geometry and Materials

**Definition and energy ★**

$$L=\frac{N\Phi}{I}=\frac{\lambda}{I},\qquad W_m=\frac12LI^2,\qquad v=L\frac{di}{dt}$$

**Geometry formulas ★**

| Geometry | Inductance |
|---|---|
| Solenoid | $\mu N^2S/l=\mu n^2Sl$ |
| Toroid | $\mu N^2S/(2\pi\rho)$ |
| Coaxial | $\dfrac{\mu L}{2\pi}\ln(b/a)$ |
| Two-wire line | $\dfrac{\mu L}{\pi}\ln(D/a)$ |
| Single wire (internal) | $\mu L/(8\pi)$ |

**Mutual inductance**

$$M=\frac{N_2\Phi_{12}}{I_1}=k\sqrt{L_1L_2},\qquad \lvert k\rvert\le1$$

**Conditions:** linear homogeneous medium of constant $\mu$ without saturation; tight coupling gives $k=1$. $L$ in H = Wb/A, $\lambda$ flux linkage in Wb, $W_m$ in J, $k$ dimensionless. See [[03_Differential_Equations#11. RLC Circuit Transients|RLC Circuit Transients]].

---

### 16. Magnetic Forces, Torque and Lorentz

**Force on a charge and on a current ★**

$$\vec F=q(\vec E+\vec u\times\vec B),\qquad \vec F=I\vec L\times\vec B,\qquad d\vec F=Id\vec l\times\vec B$$

$$\vec F=\int_S\vec K\times\vec B\,dS=\int_v\vec J\times\vec B\,dv$$

**Torque on a loop ★**

$$\vec T=\vec m\times\vec B,\qquad \vec m=NIS\,\hat a_n$$

**Named effects**

$$\text{Cyclotron: }r=\frac{mu}{qB},\quad \omega_c=\frac{qB}{m},\qquad \text{Hall: }V_H=\frac{IB}{nqt}$$

**Conditions:** moving charge or current in a magnetic field; in a uniform field a closed loop feels zero net force but nonzero torque. $q$ in C, $\vec u$ in m/s, $\vec B$ in T, $\vec m$ in A·m², $\vec F$ in N, $\vec T$ in N·m.

---

### 17. Faraday's Law and Motional EMF

![](https://www.youtube.com/watch?v=LDOa7UdfcMQ)

*Video: Faraday's Law of Induction and Induced EMF — The Organic Chemistry Tutor, 11:53*

**Faraday's law ★**

$$\oint_L\vec E\cdot d\vec l=-\frac{d\Phi}{dt},\qquad \nabla\times\vec E=-\frac{\partial\vec B}{\partial t},\qquad \mathcal{E}=-N\frac{d\Phi}{dt}$$

**Motional EMF ★**

$$\mathcal{E}=\oint(\vec u\times\vec B)\cdot d\vec l,\qquad \vec E_m=\vec u\times\vec B,\qquad \mathcal{E}=BLu\ \text{(rod on rails)}$$

**Induced voltage of a coil**

$$v=L\frac{di}{dt}\ \text{(self)},\qquad v=M\frac{di}{dt}\ \text{(mutual)}$$

**Conditions:** Lenz's law fixes the sign (the induced effect opposes the flux change); $\Phi$ may vary through $\vec B(t)$, circuit motion, or both. $\mathcal{E}$ in V, $\Phi$ in Wb, $B$ in T, $u$ in m/s.

> [!tip] High-yield ★
> A single $\mathcal{E}=-N\,d\Phi/dt$ with $\Phi=\int\vec B\cdot d\vec S$ captures transformer EMF (fixed path, $\vec B(t)$) and motional EMF (moving path) at once.

---

## Part C — Maxwell, Waves and Boundaries

### 18. Maxwell's Equations and Displacement Current

**The four laws — differential and integral ★**

| Law | Differential | Integral |
|---|---|---|
| Gauss (E) | $\nabla\cdot\vec D=\rho_v$ | $\oint\vec D\cdot d\vec S=Q_{enc}$ |
| Gauss (B) | $\nabla\cdot\vec B=0$ | $\oint\vec B\cdot d\vec S=0$ |
| Faraday | $\nabla\times\vec E=-\partial_t\vec B$ | $\oint\vec E\cdot d\vec l=-\partial_t\Phi_B$ |
| Ampere–Maxwell | $\nabla\times\vec H=\vec J+\partial_t\vec D$ | $\oint\vec H\cdot d\vec l=I_{enc}+\partial_t\Phi_D$ |

**Expanded set**

$$\nabla\times\vec E=-\frac{\partial\vec B}{\partial t},\qquad \nabla\times\vec H=\vec J+\frac{\partial\vec D}{\partial t}$$

$$\nabla\cdot\vec D=\rho_v,\qquad \nabla\cdot\vec B=0$$

**Displacement current ★**

$$\vec J_d=\frac{\partial\vec D}{\partial t}=\varepsilon\frac{\partial\vec E}{\partial t},\qquad I_d=\varepsilon\frac{d\Phi_E}{dt}$$

$$\nabla\cdot\vec J=-\frac{\partial\rho_v}{\partial t}$$

**Conditions:** differential forms require continuous fields; a simple medium obeys $\vec J=\sigma\vec E$, $\vec D=\varepsilon\vec E$, $\vec B=\mu\vec H$. $\vec J,\vec J_d$ in A/m², $\Phi_D$ in C, $\Phi_B$ in Wb. #maxwell

![](https://www.youtube.com/watch?v=0jW74lrpeM0)

*Video: Maxwell's Equations Explained for Beginners — Parth G, 10:38*

> [!tip] High-yield ★
> Without $\partial\vec D/\partial t$, Ampere's law fails across a charging capacitor; the displacement current restores charge conservation for time-varying fields.

---

### 19. EM Wave Equations and Uniform Plane Waves

![](https://www.youtube.com/watch?v=VQ5In-cDxLw)

*Video: Uniform Plane Waves — RTU Wallah, 6:13*

**Wave equations ★**

$$\nabla^2\vec E-\mu\varepsilon\frac{\partial^2\vec E}{\partial t^2}=0,\qquad \nabla^2\vec H-\mu\varepsilon\frac{\partial^2\vec H}{\partial t^2}=0$$

**Propagation parameters ★**

$$u_p=\frac1{\sqrt{\mu\varepsilon}}=\frac{\omega}{\beta},\qquad \beta=\omega\sqrt{\mu\varepsilon},\qquad \eta=\sqrt{\frac{\mu}{\varepsilon}}\ \Omega,\qquad \lambda=\frac{2\pi}{\beta}$$

**Free space**

$$c=\frac{1}{\sqrt{\mu_0\varepsilon_0}}=3\times10^8\ \text{m/s},\qquad \eta_0=120\pi\approx377\ \Omega,\qquad \beta_0=\frac{\omega}{c}$$

**Phasor form ★**

$$\vec E=E_0e^{-\alpha z}e^{-j\beta z}\hat a_x,\qquad \vec H=\frac{\hat a_z\times\vec E}{\eta}$$

$$\vec E\perp\vec H\perp\hat a_k,\qquad \frac{E}{H}=\eta$$

**Conditions:** source-free, lossless ($\sigma=0$), homogeneous linear isotropic medium; a uniform plane wave has $\vec E,\vec H$ constant over each constant-phase plane. $u_p$ in m/s, $\beta$ in rad/m, $\omega=2\pi f$ in rad/s, $\lambda$ in m. See [[07_Signals_and_Systems#11. CT Fourier and Laplace as System Tools|CT Fourier and Laplace as System Tools]]. #waves

---

### 20. Waves in Lossy Media and Skin Depth

**Propagation constant ★**

$$k=\alpha+j\beta=\omega\sqrt{\mu\varepsilon}\sqrt{1-j\frac{\sigma}{\omega\varepsilon}},\qquad \gamma^2=j\omega\mu(\sigma+j\omega\varepsilon)$$

**Attenuation and phase constants**

$$\alpha=\omega\sqrt{\frac{\mu\varepsilon}{2}\left[\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^2}-1\right]}$$

$$\beta=\omega\sqrt{\frac{\mu\varepsilon}{2}\left[\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^2}+1\right]}$$

**Good conductor ($\sigma\gg\omega\varepsilon$) ★**

$$\alpha=\beta=\sqrt{\pi f\mu\sigma},\qquad \delta=\frac1\alpha=\sqrt{\frac{1}{\pi f\mu\sigma}}$$

$$R_s=\frac1{\sigma\delta}=\sqrt{\frac{\pi f\mu}{\sigma}}\ \text{(}\Omega\text{/sq)},\qquad \eta\approx(1+j)\sqrt{\frac{\pi f\mu}{\sigma}}$$

**Loss tangent**

$$\tan\delta=\frac{\sigma}{\omega\varepsilon}$$

**Conditions:** the good-conductor forms need $\sigma\gg\omega\varepsilon$; $\delta$ is the depth at which amplitude falls to $e^{-1}=36.8\%$ and phase lags by 1 rad. In a good conductor $\vec H$ lags $\vec E$ by $45^\circ$. $\alpha$ in Np/m, $\delta$ in m, $R_s$ in Ω, $\eta$ in Ω.

---

### 21. Reflection and Transmission at Boundaries

![](https://www.youtube.com/watch?v=gcsjqs1u508)

*Video: Reflection and Transmission at Normal Incidence — Real Physics, 17:04*

**Normal incidence ★**

$$\Gamma=\frac{\eta_2-\eta_1}{\eta_2+\eta_1},\qquad \tau=\frac{2\eta_2}{\eta_2+\eta_1}=1+\Gamma$$

**SWR and power balance ★**

$$s=\frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert},\qquad 1=\lvert\Gamma\rvert^2+\frac{\eta_1}{\eta_2}\lvert\tau\rvert^2$$

**Oblique incidence**

$$\theta_i=\theta_r,\qquad \frac{\sin\theta_t}{\sin\theta_i}=\frac{\beta_1}{\beta_2}=\frac{\sqrt{\mu_1\varepsilon_1}}{\sqrt{\mu_2\varepsilon_2}}$$

$$\text{Brewster: }\tan\theta_B=\sqrt{\frac{\varepsilon_2}{\varepsilon_1}}\ \text{(parallel pol.)},\qquad \text{critical: }\sin\theta_c=\sqrt{\frac{\varepsilon_2}{\varepsilon_1}}$$

**Fresnel coefficients**

$$\Gamma_\perp=\frac{\eta_2\cos\theta_i-\eta_1\cos\theta_t}{\eta_2\cos\theta_i+\eta_1\cos\theta_t}$$

$$\Gamma_\parallel=\frac{\eta_2\cos\theta_t-\eta_1\cos\theta_i}{\eta_2\cos\theta_t+\eta_1\cos\theta_i}$$

**Conditions:** planar interface between lossless dielectrics and a uniform plane wave; $\Gamma=-1$ at a PEC, $\Gamma=0$ when $\eta_1=\eta_2$. $\Gamma,\tau$ dimensionless and possibly complex, $s$ dimensionless, angles in rad or degrees.

> [!warning] Exam trap
> $\tau=1+\Gamma$ applies to the **electric field** at normal incidence; use $1-\lvert\Gamma\rvert^2$ for transmitted power, not $\lvert\tau\rvert^2$.

---

### 22. Intrinsic Impedance and Poynting Vector

![](https://www.youtube.com/watch?v=RWmgF7abFPE)

*Video: Poynting Vector — Andrey K, 9:13*

**Intrinsic impedance ★**

$$\eta=\frac{\lvert\vec E\rvert}{\lvert\vec H\rvert}=\sqrt{\frac{j\omega\mu}{\sigma+j\omega\varepsilon}},\qquad \eta_0=\sqrt{\frac{\mu_0}{\varepsilon_0}}=120\pi\approx377\ \Omega$$

**Poynting vector ★**

$$\vec{\mathcal{P}}=\vec E\times\vec H\ \text{(W/m}^2\text{)},\qquad P_{avg}=\frac12\Re\!\left(\vec E_s\times\vec H_s^{*}\right)$$

$$P_{avg}=\frac{E_0^2}{2\eta}\ \text{(lossless plane wave)}$$

**Energy conservation (Poynting theorem) ★**

$$\oint_S\vec{\mathcal{P}}\cdot d\vec S=-\frac{\partial}{\partial t}\int_v\left(\frac12\varepsilon E^2+\frac12\mu H^2\right)dv-\int_v\vec E\cdot\vec J\,dv$$

**Energy density and radiation pressure**

$$w=\frac12\varepsilon E_0^2+\frac12\mu H_0^2\ \text{(J/m}^3\text{)},\qquad \text{radiation pressure}=\frac{P_{avg}}{c}\ \text{(Pa, absorbed)}$$

**Conditions:** instantaneous $\vec{\mathcal{P}}$ uses real fields and the time average uses phasors; for a uniform plane wave $\vec E\perp\vec H$ with power along $\hat a_k$. $\vec{\mathcal{P}}$ and $P_{avg}$ in W/m², $E_0$ in V/m, $\eta$ in Ω. #maxwell #waves

> [!tip] High-yield ★
> Remember the free-space pair $\eta_0=377\ \Omega$ and $S_{avg}=E_0^2/(2\eta_0)$; they turn any field-amplitude question into power density in one step.

---

→ Back to [[00_Index]]
