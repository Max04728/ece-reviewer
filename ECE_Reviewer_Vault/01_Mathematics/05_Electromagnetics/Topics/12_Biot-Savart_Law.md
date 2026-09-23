---
id: MATH-05-12
title: "Biot-Savart Law"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 12
tier: 2
depth: full
problem_count: 4
prereqs: ["[[01_Coordinate_Systems_and_Vector_Algebra]]", "[[11_Current_Density_and_Continuity]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Biot-Savart Law

> [!abstract] Scope
> Compute the magnetic flux density of a steady current from the Biot-Savart element, and apply the straight-wire, loop, solenoid and toroid results obtained by integrating it.

## Core Concept

> [!tip] Intuition
> Every current element contributes a field that falls off as $1/R^{2}$ and points perpendicular to both the current and the line to the field point. That one cross-product rule integrates up to every magnetostatic formula in this area.

**The differential law and the three facts it encodes.** Biot-Savart states that a current element $I\,d\mathbf{l}$ at a source point produces at a field point a flux density given by:
$$d\mathbf{B} = \dfrac{\mu_0}{4\pi}\dfrac{I\,d\mathbf{l}\times\mathbf{a}_R}{R^{2}}$$
where $\mathbf{R}$ runs from the source element to the field point, $R = \lvert\mathbf{R}\rvert$ and $\mathbf{a}_R = \mathbf{R}/R$. Its magnitude follows from the cross product:
$$dB = \dfrac{\mu_0 I\,dl\sin\theta}{4\pi R^{2}}$$
with $\theta$ the angle between $d\mathbf{l}$ and $\mathbf{a}_R$. Three structural facts do most of the work. First, the $1/R^{2}$ is the same inverse-square falloff as Coulomb's law, and Biot-Savart is exactly the magnetostatic analogue of Coulomb's law: both are the fundamental experimental statements for their field, and Gauss's law and Ampere's law are their integrated consequences. Second, the cross product makes $d\mathbf{B}$ perpendicular to both the current element and the line of sight, so the field never points along the wire or radially away from it — this is the origin of the right-hand rule, which says that $\mathbf{B}$ circulates around the current with the fingers of the right hand curled along $I$. Third, the law is linear in $I$, so the net field of any current distribution is the vector sum of its elements; this is why a bent conductor, a partial loop or two parallel wires are each solved by superposing pieces. Biot-Savart is a magnetostatic result: with a time-varying current the displacement current and retardation enter and the correct description is Maxwell's equations.

**The standard integrated results, and how they reduce to each other.** The infinite straight wire is the canonical integral: taking the wire along $z$ and the field point at perpendicular distance $\rho$, only the azimuthal component survives, and the result is:
$$B = \dfrac{\mu_0 I}{2\pi\rho}$$
The field lines are concentric circles and there is no component parallel to the wire. Truncating the same integral to a finite length gives the field in terms of the two angles subtended at the field point by the ends of the wire:
$$B = \dfrac{\mu_0 I}{4\pi\rho}(\sin\theta_1+\sin\theta_2)$$
with the angles measured from the perpendicular dropped to the wire; both angles go to $90^\circ$ (so the bracket goes to 2) and the infinite-wire formula returns, which is the check to run every time. A circular loop of radius $a$ has a centre field given by:
$$B = \dfrac{\mu_0 I}{2a}$$
A point on its axis at distance $z$ instead sees:
$$B = \dfrac{\mu_0 I a^{2}}{2(a^{2}+z^{2})^{3/2}}$$
directed along the axis by the right-hand rule. The centre value is the $z=0$ case of the axis formula, and for $z\gg a$ the axis field becomes $\mu_0 I a^{2}/(2z^{3})$, the field of a magnetic dipole of moment $m = I\pi a^{2}$ — a $1/z^{3}$ decay, which is the quickest way to tell a dipole-like source from the $1/\rho$ wire.

**Solenoids and toroids as integrated consequences.** A solenoid of $n$ turns per metre is a stack of coaxial loops, and superposing their axial fields gives an interior field $B = \mu_0 n I$ that is uniform and axial well inside a long coil, with a very small exterior field (ideally zero in the infinite-length limit). A toroid is the same stack wrapped into a closed ring: the field is confined to the core, and with $N$ total turns at mean radius $\rho$ it takes the value:
$$B = \dfrac{\mu_0 N I}{2\pi\rho}$$
which varies across the core because the path length $2\pi\rho$ does. In every case the direction follows from the winding sense, and reversing the current reverses the field. All of these results are linear in $I$ and inherit the medium: for a linear magnetic material replace $\mu_0$ by $\mu = \mu_r\mu_0$, which is why a ferromagnetic core can raise $B$ by a factor of thousands and why solenoids and toroids are the standard way to produce a strong controlled field. The same results reappear in the Ampere's-law topic, where the symmetry makes them one-line derivations instead of integrals.

**Choosing between Biot-Savart and Ampere, and the limits of both.** Biot-Savart always applies to a steady current, so it is the tool for geometry without usable symmetry: a finite wire, a partial arc, a bent conductor, or any point on the axis of a loop. It is also the tool of record for the differential field, which is what you need when the problem asks for a contribution rather than a total. Ampere's law is the shortcut when symmetry is high — infinite wire, coaxial cable, ideal solenoid, ideal toroid, infinite current sheet — because it reduces the field to a division, but it is not an alternative law: applying the Ampere's-law integral to a finite wire or a partial loop gives a wrong number:
$$\oint\mathbf{H}\cdot d\mathbf{l} = I_{\mathrm{enc}}$$
because $\mathbf{H}$ cannot be pulled out of the integral without knowing how it varies along the chosen path. Biot-Savart has no such failure mode; its cost is the integral, and its real trap is numerical — evaluating $R$ from the origin instead of from the element, or dropping the $\sin\theta$ factor, both of which produce an answer that looks reasonable and is off by a large factor.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Biot-Savart element | $d\mathbf{B}=\frac{\mu_0}{4\pi}\frac{I\,d\mathbf{l}\times\mathbf{a}_R}{R^{2}}$ | R is the distance from the source ELEMENT to the field point, not from the origin. dB is perpendicular to both dl and a_R. |
| Magnitude form | $dB=\frac{\mu_0 I\,dl\sin\theta}{4\pi R^{2}}$ | theta is the angle between dl and a_R. Segments where they are parallel contribute exactly zero. |
| Biot-Savart integrated | $\mathbf{B}=\frac{\mu_0 I}{4\pi}\int\frac{d\mathbf{l}\times\mathbf{a}_R}{R^{2}}$ | A vector integral: integrate components. Adding magnitudes is valid only when the directions are known to agree. |
| Infinite straight wire | $B=\frac{\mu_0 I}{2\pi\rho}$ | rho is the PERPENDICULAR distance from the wire. Using a distance along the wire is the standard error. |
| Finite straight wire | $B=\frac{\mu_0 I}{4\pi\rho}(\sin\theta_1+\sin\theta_2)$ | Angles measured from the perpendicular to the wire. Both at 90 degrees recovers the infinite-wire result as a check. |
| Circular loop at the centre | $B=\frac{\mu_0 I}{2a}$ | a is the RADIUS. Substituting the diameter halves the answer. Direction is along the loop axis. |
| Circular loop on the axis | $B=\frac{\mu_0 I a^{2}}{2(a^{2}+z^{2})^{3/2}}$ | z from the loop centre. The exponent is 3/2 on the whole bracket; z = 0 reduces to the centre formula. |
| Loop as a magnetic dipole | $B_{\mathrm{axis}}\approx\frac{\mu_0 m}{2\pi z^{3}},\qquad m=I\pi a^{2}$ | Valid for z much greater than a. The 1/z^3 decay is the dipole signature; a wire decays as 1/rho. |
| Solenoid interior | $B=\mu_0 n I,\qquad n=\frac{N}{l}$ | n is turns per METRE. Entering the total turn count N instead of N/l is a factor-of-l error. |
| Toroid interior | $B=\frac{\mu_0 N I}{2\pi\rho}$ | N is the total turns, rho the mean radius. Confined to the core: zero in the hole and outside an ideal toroid. |
| Force between parallel wires | $\frac{F}{L}=\frac{\mu_0 I_1 I_2}{2\pi d}$ | Same-direction currents attract, opposite repel. Follows directly from the infinite-wire field. |
| Constants and medium | $\mu_0=4\pi\times10^{-7}\ \mathrm{H/m},\qquad \mathbf{B}=\mu_r\mu_0\mathbf{H}$ | 4 pi x 1e-7 H/m is exact. Scale B by mu_r inside a linear magnetic core; H is unchanged. |

## Worked Problems

### P1. Find the magnetic flux density at a point $5$ cm from a long straight wire carrying $10$ A, and state its direction.

**Given:** I = 10 A; rho = 5 cm = 0.05 m; long straight wire

**Solution:**

1. Infinite-wire result: B = mu0 I/(2 pi rho), with mu0 = 4 pi x 1e-7 H/m
2. mu0/(2 pi) = 2 x 1e-7, so B = (2e-7)(10)/0.05
3. B = 2e-6/0.05 = 4e-5 T
4. Direction: azimuthal, circling the wire by the right-hand rule

> [!success]- Answer
> **$B=40\ \mu$T**

> [!warning] Trap
> Using the distance along the wire or the wire's length in place of the perpendicular distance $\rho$. The formula needs the perpendicular distance only, so entering 5 in the wrong sense still yields a plausible-looking number.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `33` `×10÷(2\pi×0.05)=` → $B$ = **4.0E-5** T = **40** uT, with code `33` = $\mu_0$.
> 2. Shortcut check: `2E-7×10÷0.05=` → **4.0E-5** T, since $\mu_0/2\pi$ is exactly `2E-7`.
> 3. Doubling the distance halves it: `2E-7×10÷0.1=` → **2.0E-5** T.

### P2. A circular loop of radius $2$ cm carries $5$ A. Find the flux density at its centre.

**Given:** I = 5 A; a = 2 cm = 0.02 m

**Solution:**

1. Centre of a loop: B = mu0 I/(2a)
2. B = (4 pi x 1e-7)(5)/(2(0.02))
3. Numerator: 4 pi x 1e-7 x 5 = 6.2832e-6
4. B = 6.2832e-6/0.04 = 1.5708e-4 T

> [!success]- Answer
> **$B=157\ \mu$T, along the loop axis**

> [!warning] Trap
> Using the diameter for $a$. Substituting $a=0.04$ m halves the field to $78.5\ \mu$T. A second version of the same slip is forgetting the factor 2 and computing $\mu_0I/a$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `33` `×5÷(2×0.02)=` → $B$ = **1.5708E-4** T = **157** uT.
> 2. Diameter slip: the same line with `0.04` returns **78.5** uT, half.
> 3. The missing-factor-2 slip `÷0.02=` returns **314** uT, double.

### P3. For the same $2$ cm loop carrying $5$ A, find the flux density on the axis at $z=a=2$ cm.

**Given:** I = 5 A; a = 0.02 m; z = 0.02 m (one radius from the centre)

**Solution:**

1. B = mu0 I a^2/(2(a^2 + z^2)^(3/2)) with a^2 = z^2 = 4e-4 m^2
2. a^2 + z^2 = 8e-4, and (8e-4)^(3/2) = 8^(3/2) x 1e-6 = 22.6274 x 1e-6 = 2.26274e-5
3. Numerator: mu0 I a^2 = 6.2832e-6 x 4e-4 = 2.51327e-9
4. B = 2.51327e-9/(2 x 2.26274e-5) = 5.5536e-5 T
5. Ratio check: at z = a the axis field is 1/2^(3/2) = 0.35355 of the centre field, and 0.35355 x 157.08 uT = 55.5 uT

> [!success]- Answer
> **$B=55.5\ \mu$T, still along the axis**

> [!warning] Trap
> Dropping the $3/2$ exponent and using $(a^{2}+z^{2})$ once, which makes the denominator $2(a^{2}+z^{2})=1.6\times10^{-3}$ instead of $2.263\times10^{-5}$ and gives $1.57\ \mu$T instead of $55.5\ \mu$T. The error makes the field *far too small*, and it breaks the required fall-off below the centre value at every $z>0$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `33` `×5×0.02²÷(2×(0.02²+0.02²)^1.5)=` → $B$ = **5.5536E-5** T = **55.5** uT.
> 2. Ratio check: `55.5÷157=` → **0.354**, the $1/2^{3/2}$ on-axis-at-$z=a$ factor.
> 3. Dropping the `^1.5` returns **1.57E-6** T — below the centre value, which is impossible.

### P4. Two long parallel wires $20$ cm apart carry $10$ A each in the same direction. Find the flux density at the midpoint between them, and the value if one current is reversed.

**Given:** I1 = I2 = 10 A; separation d = 20 cm; field point at the midpoint, 10 cm from each wire

**Solution:**

1. Each wire alone gives B = mu0 I/(2 pi r) with r = 0.1 m
2. B_one = (2 x 1e-7)(10)/0.1 = 2e-5 T = 20 uT
3. Same-direction currents: at the midpoint the two fields are antiparallel, so they subtract
4. B_net = 20 - 20 = 0
5. Opposite directions: the two fields are parallel at the midpoint, so B_net = 20 + 20 = 40 uT

> [!success]- Answer
> **$B=0$ for same-direction currents; $B=40\ \mu$T for opposite directions**

> [!warning] Trap
> Adding the two magnitudes by default and answering $40\ \mu$T for the same-direction case. The field of each wire circulates about that wire, so identical currents give exactly opposite field directions at the midpoint and cancel.

## Traps & Exam Notes

- **Treating Biot-Savart as a scalar law.** The magnitude carries $\sin\theta$, and the direction is perpendicular to both $d\mathbf{l}$ and $\mathbf{a}_R$. Dropping the sine over-counts every geometry; adding magnitudes of non-parallel contributions is wrong outright.
- **Measuring $R$ from the origin.** $R$ is the element-to-field-point distance and changes from element to element. Using a fixed origin distance makes the integral for a finite wire come out too large and destroys the finite-wire limit.
- **Using the infinite-wire formula near an end.** $B=\mu_0I/(2\pi\rho)$ assumes the wire extends far in both directions. Near an end, $\sin\theta_1+\sin\theta_2 < 2$ and the true field is smaller; the finite-wire form is required.
- **Substituting the diameter for the radius in loop formulas.** Both $B=\mu_0I/(2a)$ and the axis formula use the radius. A 4 cm diameter entered as $a$ gives a centre field twice the correct value.
- **Losing the $3/2$ power on the axis formula.** Using $(a^{2}+z^{2})^{1}$ instead of $(a^{2}+z^{2})^{3/2}$ enlarges the denominator, so the field comes out far too small: for $I=5$ A and $a=2$ cm at $z=a$ it gives $1.57\ \mu$T against the correct $55.5\ \mu$T. Note that $78.5\ \mu$T is a different error - it is $\mu_0I/(4a)$, which comes from treating $(2a^{2})^{3/2}$ as $2a^{3}$ instead of $2^{3/2}a^{3}$.
- **Assuming two parallel currents add at the midpoint.** Identical currents give antiparallel fields there and a net of zero; only opposite currents add to $2B_{\mathrm{one}}$.
- **Using total turns instead of turns per metre in a solenoid.** $B=\mu_0nI$ needs $n=N/l$. A 600-turn, 30 cm coil has $n=2000$ per metre; entering 600 makes the field 3.3 times too small.
- **Applying Biot-Savart to an alternating current.** The law is magnetostatic. With $dI/dt\neq0$ the displacement-current term and propagation delay matter, and the field must be found from Maxwell's equations.

## See Also

- [[13_Ampere’s_Circuital_Law]]
- [[04_Coulomb’s_Law_and_E_Field]]
- [[14_Magnetic_Boundary_Conditions_and_Vector_Potential]]
- [[16_Magnetic_Forces,_Torque_and_Lorentz]]

---

[[11_Current_Density_and_Continuity|⬅ 11]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Ampere’s_Circuital_Law|13 ➡]]
