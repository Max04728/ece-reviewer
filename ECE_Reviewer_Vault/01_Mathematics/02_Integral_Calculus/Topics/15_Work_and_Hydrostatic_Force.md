---
id: MATH-02-15
title: "Work and Hydrostatic Force"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 15
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Definite_Integrals_and_FTC]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 15 — Work and Hydrostatic Force

> [!abstract] Scope
> Compute work done by a variable force and the hydrostatic force on a submerged plate.

## Core Concept

> [!tip] Intuition
> Both problems are the same integral in different clothing. Work is a force applied through a distance; hydrostatic force is a pressure applied over an area. In each case you slice the situation into thin pieces over which the quantity is constant, then integrate.

**Work by a variable force.** For a force $F(x)$ acting along a straight line, $W = \int_a^b F(x)\,dx$. The method is always the same: slice the motion into thin intervals over which the force is essentially constant, compute $F\cdot dx$, and integrate. The essential step is expressing the force as a function of position — without that there is nothing to integrate.

**Work to lift, pump or hoist.** When lifting an object — a cable, a bucket of water leaking as it rises, a chain, or liquid being pumped out of a tank — the force at height $y$ is the *weight of what remains to be lifted*, which changes as you go. Set up a coordinate system (usually $y$ measured from the bottom of the tank or from the ground), express both the weight and the distance it must still travel as functions of $y$, and integrate. These are the most common exam problems in the topic and the setup, not the integration, is the difficulty.

**Hydrostatic force.** Pressure in a static fluid increases linearly with depth: $P = \rho g h$, where $h$ is the depth below the surface. The force on a horizontal strip of area $dA$ at depth $h$ is $dF = \rho g h\,dA$, so $F = \rho g\int h\,dA$. At a *constant* depth over a flat horizontal surface this reduces to $F = PA$, which is why only vertical or inclined plates need the integral. With the standard density of water $\rho = 1000\,\mathrm{kg/m^3}$ and $g = 9.81\,\mathrm{m/s^2}$, the product is $\gamma = 9810\,\mathrm{N/m^3}$.

**Setting up the hydrostatic integral.** Place the origin conveniently — often the top of the plate — and let $y$ increase downward. Then the depth is simply $h = y$, the strip's length is $L(y)$ (the plate's width at that depth), and $dA = L(y)\,dy$, so $F = \gamma\int y\,L(y)\,dy$ between the top and bottom of the plate. Two checks catch most errors: the width function must be the plate's horizontal extent at that depth, and the depth must be measured **from the fluid surface**, not from the plate's top if those differ. When the plate's top is submerged below the surface, $h = y + d$ where $d$ is the depth of the plate's top.

**Consistency of units.** Work in SI throughout: metres, kilograms, newtons, joules. A density given in $\mathrm{kg/m^3}$ with lengths in centimetres is the usual source of a factor-of-$10^6$ error; convert before integrating, and state the final unit.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Work, variable force | $W = \int_a^b F(x)\,dx$ | Force must be expressed as a function of position. |
| Work, Hooke's law | $W = \int_0^x kt\,dt = \tfrac{1}{2}kx^2$ | Spring force F = kx, measured from natural length. |
| Work against gravity | $W = \int \left(\mathrm{weight\ at\ } y\right)\left(\mathrm{distance\ to\ lift}\right)dy$ | Weight changes as material is removed or consumed. |
| Hydrostatic pressure | $P = \rho g h = \gamma h$ | Linear in depth. gamma = 9810 N/m^3 for water. |
| Hydrostatic force | $F = \rho g\int h\,dA$ | Only needed when depth varies across the plate. |
| Flat horizontal surface | $F = P A = \gamma h A$ | No integral needed; depth is constant. |
| Strip area on a plate | $dA = L(y)\,dy$ | L(y) is the plate's width at depth y. |
| Plate whose top is submerged by d | $F = \gamma\int_0^{H}(d+y)\,L(y)\,dy$ | Depth measured from the SURFACE, not the plate top. |
| Water density and weight density | $\rho = 1000\ \mathrm{kg/m^3}, \quad \gamma = 9810\ \mathrm{N/m^3}$ | Use gamma directly to avoid carrying g. |
| Work with a leaking bucket | $W = \int_0^{h} \left(W_0 - rt\right)g\,dt \mathrm{\ or\ in\ } y$ | Weight decreases as the bucket rises; express in the chosen variable. |

## Interactive Widget

**Hydrostatic Force Depth**

![[Hydrostatic_Force_Depth.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A spring with natural length 0.4 m requires a force of 60 N to stretch it to 0.5 m. Find the work done in stretching it from 0.4 m to 0.7 m.

**Given:** Hooke's law; find k first

**Solution:**

1. Extension when stretched to 0.5 m is 0.1 m, so 60 = k(0.1), giving k = 600 N/m
2. Work to stretch from natural length to extension x is W = (1/2)kx^2
3. The stretch goes from extension 0 to extension 0.3 m (since 0.7 - 0.4 = 0.3)
4. W = ∫_0^{0.3} 600x dx = 300[x^2]_0^{0.3} = 300(0.09)

> [!success]- Answer
> **$27$ J**

> [!warning] Trap
> Using the total lengths 0.5 and 0.7 as the extensions instead of the extensions beyond the natural length. Hooke's law uses extension from natural length, so the worked range is 0 to 0.3 m, not 0.4 to 0.7 m.

### P2. A cable of length 50 m and mass 3 kg/m hangs from a winch. Find the work done in winding the entire cable up.

**Given:** variable weight as the cable shortens

**Solution:**

1. Let y be the length of cable still hanging, from 50 down to 0
2. The weight still hanging is (3 kg/m)(y m)(9.81 m/s^2) = 29.43y N
3. A slice of length dy at the bottom must be lifted the full remaining length y
4. W = ∫_0^{50} 29.43y dy (as y goes from 50 to 0 the same integral results)
5. = 29.43[y^2/2]_0^{50} = 29.43(1250)

> [!success]- Answer
> **$\approx 36{,}788$ J**

> [!warning] Trap
> Treating the cable as a point mass and computing (150 kg)(9.81)(25 m) — which happens to give the same value here because the centre of mass is at 25 m, but the reasoning does not generalise and fails for tapered or partially wound cables.

### P3. A conical tank of height 4 m and top radius 2 m is full of water. Find the work required to pump all the water out over the top.

**Given:** similar triangles; water weight density 9810 N/m^3

**Solution:**

1. Let y be the depth below the top, 0 <= y <= 4
2. At depth y the water surface radius is found by similar triangles: r/y = 2/4, so r = y/2
3. Slice volume: dV = pi r^2 dy = pi(y/2)^2 dy = (pi y^2/4)dy
4. Weight of slice: dF = 9810(pi y^2/4)dy
5. Each slice must be lifted a distance y to reach the top
6. W = ∫_0^4 y * 9810 * (pi y^2/4) dy = (9810 pi/4)∫_0^4 y^3 dy
7. = (9810 pi/4)(64) = 9810 pi (16)

> [!success]- Answer
> **$156{,}960\pi \approx 493{,}000$ J**

> [!warning] Trap
> Lifting every slice the full height 4 m. The slice at the top moves essentially nowhere; the lift distance is the slice's own depth y, which is what makes the integral necessary.

### P4. A rectangular plate 2 m wide and 3 m tall is submerged vertically with its top 1 m below the water surface. Find the hydrostatic force on one side.

**Given:** constant width; plate top below the surface

**Solution:**

1. Let y be measured downward from the plate's top, 0 <= y <= 3
2. The depth below the surface is h = y + 1
3. The strip width is constant: L = 2
4. dF = gamma * h * dA = 9810(y+1)(2 dy)
5. F = 9810(2)∫_0^3 (y+1)dy = 19620[y^2/2 + y]_0^3
6. = 19620(4.5 + 3) = 19620(7.5)

> [!success]- Answer
> **$147{,}150$ N**

> [!warning] Trap
> Using h = y, which measures depth from the plate's top rather than from the water surface. That would give 88,290 N - the depth reference is the surface, always.

### P5. A vertical triangular plate has its vertex at the water surface and its 4 m wide base at a depth of 6 m. Find the hydrostatic force on one side.

**Given:** variable width; vertex at the surface

**Solution:**

1. Let y be depth below the surface, 0 <= y <= 6
2. At depth y the width grows linearly from 0 at the surface to 4 at y = 6: L(y) = (4/6)y = (2/3)y
3. dA = L(y)dy = (2/3)y dy, and the depth is h = y
4. F = 9810∫_0^6 y * (2/3)y dy = 6540∫_0^6 y^2 dy
5. = 6540[y^3/3]_0^6 = 6540(72)

> [!success]- Answer
> **$470{,}880$ N**

> [!warning] Trap
> Using the constant width 4 m throughout. The plate's width varies with depth, so L must be expressed as a function of y.

## Traps & Exam Notes

- **Using total length instead of extension** in spring problems. Hooke's law measures from the natural length; the integration range is the extension, not the total stretched length.
- **Lifting every slice the full height** when pumping liquid. Each slice moves only its own distance to the outlet.
- **Measuring depth from the plate's top instead of the fluid surface.** If the plate's top is submerged by $d$, the depth is $y+d$. Forgetting the offset gives a force that is too small.
- **Forgetting that width varies with depth.** A triangular or circular plate needs $L(y)$ as a function, not a constant.
- **Using $\rho g$ with mixed units.** Density in $\mathrm{kg/m^3}$ with lengths in cm is a factor of $10^6$ error. Convert to SI first.
- **Confusing force with pressure.** Pressure is force per unit area; the hydrostatic integral yields force in newtons. Reporting a pressure when a force was asked is a missing step, not a rounding difference.
- **Omitting the weight density factor.** $F = \rho g\int h\,dA$; dropping $\rho g$ (or $\gamma$) leaves a purely geometric integral with no physical meaning.
- **Sign and direction.** Work done *by* a system is positive and work done *on* it is negative by convention. State which is being asked.

## See Also

- [[11_Volumes_by_Slicing,_Disk_and_Washer]]
- [[14_Centroids_and_Pappus-Guldinus]]
- [[13_Arc_Length_and_Surface_Area]]
- [[01_Antiderivatives_and_Standard_Forms]]

---

[[14_Centroids_and_Pappus-Guldinus|⬅ 14]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
