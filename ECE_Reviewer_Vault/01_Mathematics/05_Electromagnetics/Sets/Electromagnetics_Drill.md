---
title: "Electromagnetics — Drill"
type: drill
area: 05_Electromagnetics
part: 01_Mathematics
seed: 1
count: 8
pool: 113
updated: 2026-09-23
---

# Electromagnetics — Practice Drill

**8 problems** drawn from a pool of 113 across 22 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 05_Electromagnetics --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. Verify the solenoid formula $L = \mu N^2A/l$ for the previous problem by computing the flux linkage per unit current, and compare with the direct formula.

**Given:** N = 1000; l = 0.3 m; A = 6e-4 m^2

> [!success]- Answer
> **$L = 2.51$ mH by both routes.**

> [!warning] Trap
> Computing lambda/i as Phi_B/i times N but forgetting that the flux must be multiplied by N *because each turn links it* - the N^2 in the closed form is not two separate factors by accident.

<sub>from MATH-05-15</sub>

### 2. A field $E_0=10$ kV/m exists in air between isolated plates. A dielectric with $\varepsilon_r=4$ is inserted to fill the gap completely. Find $E$, $D$ and $P$ in the dielectric, taking $\varepsilon_0=8.854\times10^{-12}$ F/m.

**Given:** E0 = 10 kV/m (air); eps_r = 4; isolated plates (free charge fixed)

> [!success]- Answer
> **$E=2.5$ kV/m; $D=88.5$ nC/m²; $P=66.4$ nC/m².**

> [!warning] Trap
> Keeping $E=10$ kV/m because the applied voltage 'is still there'. With isolated plates the charge is fixed, so the field must drop by $\varepsilon_r$. Only with the battery still connected does $E=V/d$ stay unchanged.

<sub>from MATH-05-08</sub>

### 3. Capacitors of $1$, $2$ and $4\ \mu$F are connected in parallel across a $24$ V source. Find the total capacitance, the total charge and the stored energy.

**Given:** C1 = 1 uF, C2 = 2 uF, C3 = 4 uF in parallel; V = 24 V

> [!success]- Answer
> **$C_{\mathrm{eq}}=7\ \mu$F; $Q=168\ \mu$C; $W=2.02$ mJ.**

> [!warning] Trap
> Forgetting the $\frac{1}{2}$ in $W=\frac{1}{2}CV^2$, which doubles the energy. Also, $24^2=576$, not 48 — squaring before multiplying by $C$ matters.

<sub>from MATH-05-09</sub>

### 4. A dielectric sphere carries the radially varying polarization $\mathbf{P}=kr\,\mathbf{a}_r$ with $k=2$ nC/m³. Find the bound volume charge density $\rho_b$ and evaluate it at $r=5$ mm.

**Given:** P = k r a_r; k = 2 nC/m3; r = 5 mm

> [!success]- Answer
> **$\rho_b=-6$ nC/m³ (uniform, independent of $r$).**

> [!warning] Trap
> Differentiating $P_r$ alone to get $k$ instead of carrying the $r^2$ weighting. Radial divergence needs $\frac{1}{r^2}\frac{\partial(r^2P_r)}{\partial r}$; for $P_r=kr$ that gives $3k$, not $k$. Also keep the minus sign in $\rho_b=-\nabla\cdot\mathbf{P}$.

<sub>from MATH-05-07</sub>

### 5. In a certain region the electric field is $E=50\sin(10^{8}t)$ V/m along $x$. Find the displacement current density and its maximum value, taking the medium as air.

**Given:** E = 50 sin(1e8 t) V/m along x; air: eps_r = 1, eps0 = 8.854e-12 F/m

> [!success]- Answer
> **$J_d=44.3\cos(10^{8}t)$ mA/m², with a maximum of $44.3$ mA/m².**

> [!warning] Trap
> Computing $\varepsilon_0E$ instead of $\varepsilon_0\partial E/\partial t$: that gives $4.43\times10^{-10}$ C/m² - the electric flux density, not a current density, and smaller by the factor $10^{8}$ that the time derivative supplies. The second slip is dropping the angular frequency from $\sin(\omega t)$.

<sub>from MATH-05-18</sub>

### 6. A parallel-plate capacitor has $A=0.01$ m², $d=0.5$ mm and is held at $V=100$ V. Find the force pulling the plates together.

**Given:** A = 0.01 m2; d = 0.5 mm; V = 100 V; air

> [!success]- Answer
> **$F=1.77$ mN, attractive.**

> [!warning] Trap
> Using $F=QE$ with the full gap field $E=V/d$: that gives 3.54 mN, exactly double. A plate does not feel its own field — only the $E/2$ from the opposite plate, which is the source of the $\frac{1}{2}$ in the formula.

<sub>from MATH-05-10</sub>

### 7. A coaxial cable has an inner conductor radius of 1 mm and an inner radius of the outer conductor of 4 mm. Find its inductance per metre in air.

**Given:** a = 1e-3 m; b = 4e-3 m

> [!success]- Answer
> **$L \approx 277$ nH/m**

> [!warning] Trap
> Using diameters instead of radii in a way that changes the ratio, or forgetting that only the ratio b/a matters - doubling both radii leaves the inductance unchanged.

<sub>from MATH-05-15</sub>

### 8. A conducting sphere of radius $a=5$ cm carries $Q=20$ nC. Find $E$ at $r=2$ cm and $r=10$ cm, and the surface charge density.

**Given:** Q = 20 nC; a = 5 cm

> [!success]- Answer
> **$E(2\ \mathrm{cm})=0$; $E(10\ \mathrm{cm})=18.0$ kV/m; $\sigma=637\ \mathrm{nC/m^2}$.**

> [!warning] Trap
> Using $kQ/r^2$ at $r=2$ cm. Inside a conductor the field is zero — the charge has rearranged itself entirely onto the surface, and the Gaussian surface at $r=2$ cm encloses nothing.

<sub>from MATH-05-05</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| MATH-05-01 | Coordinate Systems and Vector Algebra | 5 |
| MATH-05-02 | Gradient, Divergence, Curl and Laplacian | 5 |
| MATH-05-03 | Divergence and Stokes Theorems | 4 |
| MATH-05-04 | Coulomb’s Law and E Field | 5 |
| MATH-05-05 | Gauss Law and Applications | 5 |
| MATH-05-06 | Electric Potential and Gradient | 5 |
| MATH-05-07 | Dipoles and Polarization | 5 |
| MATH-05-08 | Dielectrics and Boundary Conditions | 5 |
| MATH-05-09 | Capacitance from Geometry | 10 |
| MATH-05-10 | Electrostatic Energy and Forces | 5 |
| MATH-05-11 | Current Density and Continuity | 5 |
| MATH-05-12 | Biot-Savart Law | 4 |
| MATH-05-13 | Ampere’s Circuital Law | 4 |
| MATH-05-14 | Magnetic Boundary Conditions and Vector Potential | 4 |
| MATH-05-15 | Inductance from Geometry and Materials | 10 |
| MATH-05-16 | Magnetic Forces, Torque and Lorentz | 5 |
| MATH-05-17 | Faraday’s Law and Motional EMF | 5 |
| MATH-05-18 | Maxwell’s Equations and Displacement Current | 5 |
| MATH-05-19 | EM Wave Equations and Uniform Plane Waves | 4 |
| MATH-05-20 | Waves in Lossy Media and Skin Depth | 4 |
| MATH-05-21 | Reflection and Transmission at Boundaries | 5 |
| MATH-05-22 | Intrinsic Impedance and Poynting Vector | 4 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
