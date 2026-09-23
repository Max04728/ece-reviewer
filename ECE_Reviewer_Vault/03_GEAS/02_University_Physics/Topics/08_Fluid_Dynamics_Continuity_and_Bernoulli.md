---
id: GEAS-02-08
title: "Fluid Dynamics: Continuity and Bernoulli"
part: "03_GEAS"
area: "02_University_Physics"
topic: 8
tier: 1
depth: full
problem_count: 10
prereqs: ["[[07_Fluid_Statics_Pascal_and_Archimedes]]", "[[03_Work,_Energy_and_Conservation]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Fluid Dynamics: Continuity and Bernoulli

> [!abstract] Scope
> Relate flow speed to pipe area, then trade pressure, speed and height against each other along a streamline to get efflux speeds, metered flow rates and stagnation pressure.

## Core Concept

> [!tip] Intuition
> An ideal fluid is incompressible and non-viscous, so what flows in must flow out, and the only things that can change along a streamline are pressure, speed and height. Speed up a fluid and its pressure must fall - that trade is Bernoulli's whole content.

**The four assumptions behind everything here, and what each one buys.** Bernoulli's equation describes *steady, incompressible, non-viscous, irrotational* flow along a streamline. Steady means the velocity at any fixed point does not change with time (streamlines do not cross). Incompressible means density is constant - safe for water always, and for air only below about Mach 0.3 (roughly $100\ \mathrm{m/s}$). Non-viscous means no friction against the pipe wall, which is the assumption that fails most often in real systems. Irrotational rules out turbulence and separation. A board problem that includes a pump, a turbine, a long rough pipe or a bend with separation has broken one of these, and Bernoulli must be replaced or augmented.

**Continuity is conservation of mass, and it fixes the speed.** For steady flow the mass entering a pipe in a time $\Delta t$ equals the mass leaving it, so $\rho_1A_1v_1 = \rho_2A_2v_2$; for an incompressible fluid this reduces to $A_1v_1 = A_2v_2 = Q$, the volume flow rate in $\mathrm{m^3/s}$. Two consequences to memorise: a pipe that narrows must speed the fluid up, and the speed scales as the *square* of the diameter ratio, $v_2 = v_1\left(\frac{d_1}{d_2}\right)^2$, because $A = \frac{\pi d^2}{4}$. Halving the diameter quadruples the speed, and the kinetic-energy density goes up sixteenfold.

**Bernoulli's equation is the work-energy theorem written per unit volume.** $P + \frac{1}{2}\rho v^2 + \rho gh$ is constant along a streamline: the three terms are the static pressure, the dynamic pressure $\frac{1}{2}\rho v^2$, and the hydrostatic pressure $\rho gh$, all in pascals. Divide by $\rho g$ and the same equation reads as head in metres, which is how civil engineers write it. The essential reading is that where the flow speeds up the static pressure drops - that is not a separate law, it is energy accounting. In a horizontal pipe with a constriction the pressure *falls* where the fluid moves fastest, which is exactly what a Venturi meter measures.

**Static, dynamic and stagnation pressure.** A pressure tap drilled perpendicular to the wall (a piezometer or static tap) reads the static pressure $P$. A tube facing directly into the flow (a Pitot tube) brings the fluid to rest at its mouth, so it reads the *stagnation* pressure $P_0 = P + \frac{1}{2}\rho v^2$. The difference, measured by a Pitot-static tube, is the dynamic pressure, giving $v = \sqrt{\frac{2(P_0 - P)}{\rho}}$ - the basis of every airspeed indicator. This is also the definition of pressure in Bernoulli: the faster the flow, the lower the static pressure reading on the wall.

**The standard exam applications all come from the same equation.** *Torricelli's theorem* for a small hole a depth $h$ below a free surface: both surfaces are at atmospheric pressure, the tank surface moves negligibly, so $v = \sqrt{2gh}$ - the same speed a body would reach falling that height. *Venturi meter*: continuity plus Bernoulli gives the flow rate from a measured pressure difference, with no moving parts. *Pitot-static airspeed*:
$$v = \sqrt{2\Delta P/\rho}$$
*Hydroelectric power*: $P = \rho gQh$ is Bernoulli's $\rho gh$ term multiplied by the flow rate to convert energy density into watts.

**When Bernoulli fails, and what to do instead.** Four failure modes the boards test. (1) *Viscosity*: a real pipe loses pressure to wall friction, so $P$ falls monotonically along a straight pipe of constant area - Bernoulli alone predicts $P_1 = P_2$, which is why the corrected form adds a head-loss term $h_L$ or a pump head $h_p$. (2) *Compressibility*: above roughly Mach 0.3 the density changes through a nozzle, so the incompressible Bernoulli understates the pressure change and continuity must carry $\rho$ explicitly. (3) *Unsteady flow*: starting a siphon or a water hammer involves $\partial v/\partial t$, which the steady equation ignores. (4) *Turbulent separation*: behind a bluff body or past an abrupt expansion the flow recirculates, energy is dissipated, and the 'fast flow means low pressure' rule can reverse at the wall - the reason a diffuser that is too aggressive stalls.

## Derivation

**Continuity from conservation of mass.** Consider a streamtube - the bundle of streamlines bounded by the pipe walls - with cross-sectional areas $A_1$ and $A_2$ at two stations, and fluid densities $\rho_1$ and $\rho_2$. In a short time $\Delta t$ the mass crossing station 1 is $\rho_1A_1v_1\Delta t$, and the mass crossing station 2 is $\rho_2A_2v_2\Delta t$. For *steady* flow the mass inside the streamtube cannot change (the flow pattern is fixed in time), so mass in equals mass out: $$\rho_1A_1v_1 = \rho_2A_2v_2.$$ If the fluid is also incompressible, $\rho_1 = \rho_2$ cancels and $$A_1v_1 = A_2v_2 = Q.$$ Since $A = \frac{\pi d^2}{4}$, the same relation in terms of diameters is $v_2 = v_1\left(\frac{d_1}{d_2}\right)^2$ - the speed follows the *square* of the diameter ratio.

**Bernoulli from the work-energy theorem.** Follow a fixed slug of fluid from a lower station 1 to a higher station 2 on the same streamline. Let its volume be $\Delta V$, constant because the fluid is incompressible. The pressure at station 1 pushes it forward, doing work $P_1A_1\,(v_1\Delta t) = P_1\Delta V$; at station 2 the surrounding fluid pushes backward, doing $-P_2\Delta V$. Gravity does $-\rho\Delta V\,g(h_2-h_1)$. The slug's kinetic energy changes by $\frac{1}{2}\rho\Delta V(v_2^2 - v_1^2)$, and its potential energy by $\rho\Delta V\,g(h_2-h_1)$. Writing $W_{net} = \Delta KE$: $$(P_1 - P_2)\Delta V - \rho\Delta V\,g(h_2-h_1) = \tfrac{1}{2}\rho\Delta V\,(v_2^2-v_1^2).$$ Divide by $\Delta V$ and collect terms at each station: $$P_1 + \tfrac{1}{2}\rho v_1^2 + \rho gh_1 = P_2 + \tfrac{1}{2}\rho v_2^2 + \rho gh_2.$$ Each term has units of pascals, so Bernoulli is an energy density budget, not a new principle.

**Torricelli's theorem.** Take a large open tank with a small hole a depth $h$ below the free surface. Apply Bernoulli along a streamline from the surface (station 1) to the jet just outside the hole (station 2). Both are open to the atmosphere, so $P_1 = P_2 = P_{atm}$ and those terms cancel. Set $h_2 = 0$ at the hole, so $h_1 = h$. Continuity says the surface speed is smaller than the jet speed by the area ratio; because the tank is *large* compared with the hole, $v_1 \approx 0$. What remains is $$\rho gh = \tfrac{1}{2}\rho v_2^2 \quad\Longrightarrow\quad v_2 = \sqrt{2gh}.$$ The density cancels, so the efflux speed is independent of the fluid - mercury and water leave the same hole at the same speed. It depends only on the depth, and it equals the free-fall speed from that height.

**Venturi meter: measuring flow with a pressure difference.** A horizontal Venturi has a wide inlet (station 1) and a narrow throat (station 2), so $h_1 = h_2$ and the $\rho gh$ terms cancel. Continuity gives $v_1 = v_2\frac{A_2}{A_1}$. Substituting into Bernoulli: $$P_1 - P_2 = \tfrac{1}{2}\rho(v_2^2 - v_1^2) = \tfrac{1}{2}\rho v_2^2\left[1 - \left(\tfrac{A_2}{A_1}\right)^2\right].$$ Solve for the throat speed and then the flow rate: $$v_2 = \sqrt{\frac{2(P_1-P_2)}{\rho\left[1-(A_2/A_1)^2\right]}}, \qquad Q = A_2v_2.$$ Everything on the right is either geometry or a measured pressure difference, so a Venturi is a flow meter with no moving parts. The same algebra read backwards is the Pitot-static airspeed: with the throat replaced by a stagnation point, $A_2 \to 0$ and $v = \sqrt{2\Delta P/\rho}$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Continuity (incompressible) | $A_1v_1 = A_2v_2 = Q$ | Steady, incompressible flow in a full pipe. A in m^2, v in m/s, Q in m^3/s. Never use diameters directly here. |
| Continuity in diameters | $v_2 = v_1\left(\frac{d_1}{d_2}\right)^2$ | The ratio is squared. Halving the diameter quadruples the speed, not doubles it. |
| Volume flow rate | $Q = Av$ | m^3/s. Multiply by 1000 for litres per second, and by 60 for litres per minute. |
| Continuity (compressible) | $\rho_1A_1v_1 = \rho_2A_2v_2$ | Required for gases above about Mach 0.3. Dropping rho understates the speed change in a nozzle. |
| Bernoulli's equation | $P_1 + \frac{1}{2}\rho v_1^2 + \rho gh_1 = P_2 + \frac{1}{2}\rho v_2^2 + \rho gh_2$ | Along one streamline, steady, incompressible, non-viscous. Terms are in pascals; either both sides gauge or both absolute. |
| Bernoulli as head (metres) | $\frac{P}{\rho g} + \frac{v^2}{2g} + h = \mathrm{constant}$ | The civil-engineering form. Add a pump head or subtract a loss head when they exist. |
| Dynamic pressure | $P_{dyn} = \frac{1}{2}\rho v^2$ | In pascals. In a horizontal pipe, the pressure drop between two stations equals the rise in dynamic pressure. |
| Stagnation pressure | $P_0 = P + \frac{1}{2}\rho v^2$ | What a Pitot tube facing the flow reads. The static tap reads P; the difference is the dynamic pressure. |
| Pitot-static airspeed | $v = \sqrt{\frac{2(P_0-P)}{\rho}}$ | rho is the density of the flowing fluid (air, about 1.2 kg/m^3 at sea level), not of the aircraft. |
| Torricelli efflux speed | $v = \sqrt{2gh}$ | Large open tank, small hole, both at atmospheric pressure. Independent of fluid density. |
| Depth to efflux-hydrostatic link | $P_2 = P_1 + \rho g h \quad (v = 0)$ | Bernoulli with the flow stopped. The static case is the v = 0 slice of the same equation. |
| Venturi meter throat speed | $v_2 = \sqrt{\frac{2\Delta P}{\rho\left[1-(A_2/A_1)^2\right]}}$ | Horizontal meter. Delta P is the measured inlet-minus-throat pressure difference, in Pa. |
| Hydraulic power | $P = \rho gQh$ | Ideal power from a head h at flow rate Q. Real turbines deliver 85-95% of this. |

## Interactive Widget

**Bernoulli Pipe Flow**

![[Bernoulli_Pipe_Flow.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Water flows at $1.5\ \mathrm{m/s}$ through a hose of internal diameter $6.0\ \mathrm{cm}$. The hose ends in a nozzle of diameter $2.0\ \mathrm{cm}$. Find the speed of the water leaving the nozzle.

**Given:** d_1 = 6.0 cm; v_1 = 1.5 m/s; d_2 = 2.0 cm; incompressible flow

**Solution:**

1. Continuity: $A_1v_1 = A_2v_2$, and $A = \frac{\pi d^2}{4}$ so the areas go as $d^2$.
2. $v_2 = v_1\left(\frac{d_1}{d_2}\right)^2 = 1.5\left(\frac{6.0}{2.0}\right)^2$
3. $\frac{6.0}{2.0} = 3.0$ and $3.0^2 = 9.0$
4. $v_2 = (1.5)(9.0) = 13.5\ \mathrm{m/s}$

> [!success]- Answer
> **$v_2 = 13.5\ \mathrm{m/s}$.**

> [!warning] Trap
> Using the diameter ratio linearly, which gives $1.5 \times 3.0 = 4.5\ \mathrm{m/s}$ - a factor of 3 too low. The areas scale as the square of the diameter, and the resulting kinetic energy density is 81 times higher, not 9.

### P2. A pipe of internal radius $0.050\ \mathrm{m}$ carries water at $2.0\ \mathrm{m/s}$. Find the volume flow rate, and the volume delivered in $1.0\ \mathrm{min}$.

**Given:** r = 0.050 m; v = 2.0 m/s; t = 60 s

**Solution:**

1. $A = \pi r^2 = \pi(0.050)^2 = 7.854\times10^{-3}\ \mathrm{m^2}$
2. $Q = Av = (7.854\times10^{-3})(2.0) = 1.57\times10^{-2}\ \mathrm{m^3/s}$
3. Convert to litres per second: $1\ \mathrm{m^3} = 1000\ \mathrm{L}$, so $Q = 15.7\ \mathrm{L/s}$.
4. Volume in 60 s: $V = Qt = (1.57\times10^{-2})(60) = 0.942\ \mathrm{m^3}$

> [!success]- Answer
> **$Q = 1.57\times10^{-2}\ \mathrm{m^3/s} = 15.7\ \mathrm{L/s}$; $V = 0.942\ \mathrm{m^3} = 942\ \mathrm{L}$ in one minute.**

> [!warning] Trap
> Squaring the diameter instead of the radius, or writing $A = 2\pi r$. Using the diameter $0.10\ \mathrm{m}$ in $\pi r^2$ inflates the area and the flow rate fourfold, to $62.8\ \mathrm{L/s}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `π×0.050²` → $A$ = **7.854E-3** m²; `×2.0` → $Q$ = **1.571E-2** m³/s = **15.7** L/s.
> 2. `Ans×60` → **0.942** m³ = **942** L delivered in one minute.

### P3. A large open tank of water has a small hole in its side $3.0\ \mathrm{m}$ below the free surface. Find the speed at which water leaves the hole, and the same for a hole at $1.5\ \mathrm{m}$.

**Given:** h = 3.0 m (and 1.5 m); large tank; small hole; g = 9.81 m/s^2

**Solution:**

1. Both the free surface and the jet are at atmospheric pressure, so the pressure terms cancel in Bernoulli.
2. The tank is large, so the surface descends negligibly: $v_1 \approx 0$.
3. Torricelli: $v = \sqrt{2gh} = \sqrt{2(9.81)(3.0)} = \sqrt{58.86}$
4. $v = 7.67\ \mathrm{m/s}$
5. At half the depth: $v = \sqrt{2(9.81)(1.5)} = \sqrt{29.43} = 5.42\ \mathrm{m/s}$ - so halving the depth divides the speed by $\sqrt{2}$, not by 2.

> [!success]- Answer
> **$v = 7.67\ \mathrm{m/s}$ at 3.0 m depth; $v = 5.42\ \mathrm{m/s}$ at 1.5 m depth.**

> [!warning] Trap
> Using $v = \sqrt{gh}$ and dropping the 2, which gives 5.42 m/s for the 3.0 m hole. It is the same formula as free fall, $v^2 = 2gh$, for the same reason.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(2×9.81×3.0)` → **7.67** m/s at 3.0 m depth.
> 2. `√(2×9.81×1.5)` → **5.42** m/s at 1.5 m: halving the depth divides the speed by $\sqrt{2}$, not by 2.

### P4. Water flows through a horizontal pipe that narrows from $A_1 = 0.010\ \mathrm{m^2}$ to $A_2 = 0.0050\ \mathrm{m^2}$. At the wide section the speed is $2.0\ \mathrm{m/s}$ and the pressure is $200\ \mathrm{kPa}$. Find the speed and pressure at the narrow section.

**Given:** A_1 = 0.010 m^2; A_2 = 0.0050 m^2; v_1 = 2.0 m/s; P_1 = 200 kPa; horizontal pipe

**Solution:**

1. Continuity: $v_2 = v_1\frac{A_1}{A_2} = 2.0\left(\frac{0.010}{0.0050}\right) = 4.0\ \mathrm{m/s}$
2. Bernoulli with $h_1 = h_2$ (horizontal): $P_1 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2$
3. $P_2 = P_1 + \frac{1}{2}\rho(v_1^2 - v_2^2) = 200000 + \frac{1}{2}(1000)(4.0 - 16.0)$
4. $P_2 = 200000 + 500(-12.0) = 200000 - 6000 = 194000\ \mathrm{Pa}$
5. $P_2 = 194\ \mathrm{kPa}$ - the pressure fell where the water sped up.

> [!success]- Answer
> **$v_2 = 4.0\ \mathrm{m/s}$; $P_2 = 194\ \mathrm{kPa}$.**

> [!warning] Trap
> Adding the dynamic-pressure change instead of subtracting it, giving 206 kPa and predicting a pressure *rise* in the constriction. Speeding a fluid up must cost static pressure; a rising pressure at a throat would let a Venturi meter run backwards.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.0×0.010÷0.0050` → $v_2$ = **4.0** m/s.
> 2. `200000+0.5×1000×(2.0²−4.0²)` → $P_2$ = **194000** Pa = **194** kPa — the pressure falls where the water speeds up.

### P5. A Venturi meter in a horizontal water pipe has an inlet diameter of $10.0\ \mathrm{cm}$ and a throat diameter of $5.0\ \mathrm{cm}$. The pressure difference between inlet and throat is $12.0\ \mathrm{kPa}$. Find the throat velocity and the volume flow rate.

**Given:** d_1 = 10.0 cm; d_2 = 5.0 cm; Delta P = 12.0 kPa; rho = 1000 kg/m^3

**Solution:**

1. Area ratio: $\frac{A_2}{A_1} = \left(\frac{d_2}{d_1}\right)^2 = \left(\frac{5.0}{10.0}\right)^2 = 0.25$, so $1 - 0.25^2 = 0.9375$.
2. $v_2 = \sqrt{\frac{2\Delta P}{\rho[1-(A_2/A_1)^2]}} = \sqrt{\frac{2(12000)}{(1000)(0.9375)}} = \sqrt{\frac{24000}{937.5}}$
3. $v_2 = \sqrt{25.6} = 5.06\ \mathrm{m/s}$
4. Inlet speed: $v_1 = 0.25v_2 = 1.26\ \mathrm{m/s}$; check $\Delta P = \frac{1}{2}(1000)(25.6 - 1.6) = 12000\ \mathrm{Pa}$, correct.
5. Throat area: $A_2 = \pi(0.025)^2 = 1.963\times10^{-3}\ \mathrm{m^2}$
6. $Q = A_2v_2 = (1.963\times10^{-3})(5.06) = 9.93\times10^{-3}\ \mathrm{m^3/s} = 9.93\ \mathrm{L/s}$

> [!success]- Answer
> **$v_2 = 5.06\ \mathrm{m/s}$; $Q = 9.93\times10^{-3}\ \mathrm{m^3/s}$ (about $9.93\ \mathrm{L/s}$).**

> [!warning] Trap
> Forgetting the $1-(A_2/A_1)^2$ factor and using $v = \sqrt{2\Delta P/\rho}$, which gives 4.90 m/s here. The error is modest at a 2:1 area ratio but blows up as the throat approaches the inlet size: at $A_2/A_1 = 0.9$ the naive formula gives 2.3 times the correct speed, and it diverges as the ratio tends to 1.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(5.0÷10.0)²` → area ratio **0.25**; `1−Ans²` → **0.9375**.
> 2. `√(2×12000÷(1000×0.9375))` → $v_2$ = **5.06** m/s; the naive `√(2×12000÷1000)` gives **4.90** m/s.
>
> The $1-(A_2/A_1)^2$ factor is the whole correction; skipping it understates the throat speed.

### P6. An aircraft flies at sea level where $\rho_{air} = 1.20\ \mathrm{kg/m^3}$. Its Pitot-static system measures a difference of $2.16\ \mathrm{kPa}$ between the stagnation pressure and the static pressure. Find the airspeed.

**Given:** rho_air = 1.20 kg/m^3; P_0 - P = 2.16 kPa; incompressible flow assumed

**Solution:**

1. The Pitot tube brings the air to rest, so the measured difference is exactly the dynamic pressure $\frac{1}{2}\rho v^2$.
2. $\frac{1}{2}\rho v^2 = 2160\ \mathrm{Pa}$
3. $v^2 = \frac{2(2160)}{1.20} = \frac{4320}{1.20} = 3600$
4. $v = 60.0\ \mathrm{m/s}$ (about $216\ \mathrm{km/h}$)

> [!success]- Answer
> **$v = 60.0\ \mathrm{m/s}$.**

> [!warning] Trap
> Using the density of water (1000) instead of air (1.20) in the same formula, which gives $2.08\ \mathrm{m/s}$ - a factor of 29 too slow. The density in $\frac{1}{2}\rho v^2$ always belongs to the fluid doing the flowing.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(2×2160÷1.20)` → $v$ = **60.0** m/s.
> 2. `CONVT` speed m/s → km/h → **216** km/h; using 1000 kg/m³ for air instead gives **2.08** m/s.

### P7. A tank has a small hole of area $1.0\ \mathrm{cm^2}$ in its side, $5.0\ \mathrm{m}$ below the water surface. Find the volume flow rate through the hole.

**Given:** A_hole = 1.0 cm^2; h = 5.0 m; large tank; g = 9.81 m/s^2

**Solution:**

1. Efflux speed: $v = \sqrt{2gh} = \sqrt{2(9.81)(5.0)} = \sqrt{98.1} = 9.90\ \mathrm{m/s}$
2. Convert the area: $1.0\ \mathrm{cm^2} = 1.0\times10^{-4}\ \mathrm{m^2}$
3. $Q = Av = (1.0\times10^{-4})(9.90) = 9.90\times10^{-4}\ \mathrm{m^3/s}$
4. In litres per second: $(9.90\times10^{-4})(1000) = 0.990\ \mathrm{L/s}$

> [!success]- Answer
> **$Q = 9.90\times10^{-4}\ \mathrm{m^3/s} = 0.990\ \mathrm{L/s}$.**

> [!warning] Trap
> Leaving the area in $\mathrm{cm^2}$, which gives $Q = 9.90\ \mathrm{cm^2\cdot m/s}$ - a number with no physical meaning and 10 000 times too large if read as $\mathrm{m^3/s}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(2×9.81×5.0)` → **9.90** m/s efflux speed.
> 2. `1.0E-4×9.90` → $Q$ = **9.90E-4** m³/s = **0.990** L/s, with 1 cm² = 1E-4 m².

### P8. A large tank is filled with water to a depth of $4.0\ \mathrm{m}$. A small hole at the bottom of the tank discharges horizontally from a height of $1.5\ \mathrm{m}$ above the ground. Find the horizontal distance from the tank where the jet lands.

**Given:** depth of water h = 4.0 m; hole height above ground = 1.5 m; g = 9.81 m/s^2

**Solution:**

1. Efflux speed from Torricelli (the hole is 4.0 m below the free surface): $v = \sqrt{2gh} = \sqrt{2(9.81)(4.0)} = \sqrt{78.48} = 8.86\ \mathrm{m/s}$
2. After leaving, the water is a projectile with zero initial vertical velocity: $t = \sqrt{\frac{2H}{g}} = \sqrt{\frac{2(1.5)}{9.81}} = \sqrt{0.3058} = 0.553\ \mathrm{s}$
3. Horizontal distance: $x = vt = (8.86)(0.553) = 4.90\ \mathrm{m}$

> [!success]- Answer
> **$x = 4.90\ \mathrm{m}$ from the foot of the tank.**

> [!warning] Trap
> Using the 1.5 m ground clearance as the Torricelli depth, or the 4.0 m depth as the fall height. The two heights play different roles: 4.0 m sets the exit speed, 1.5 m sets the flight time.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(2×9.81×4.0)` → **8.86** m/s, set by the 4.0 m of water above the hole.
> 2. `√(2×1.5÷9.81)` → $t$ = **0.553** s of fall from 1.5 m; `8.86×Ans` → $x$ = **4.90** m.

### P9. Water flows at $Q = 0.50\ \mathrm{m^3/s}$ down a penstock and falls $40\ \mathrm{m}$ to a turbine. Find the ideal power available at the turbine, and the realistic output at 90% efficiency.

**Given:** Q = 0.50 m^3/s; h = 40 m; rho = 1000 kg/m^3; g = 9.81 m/s^2; efficiency = 90%

**Solution:**

1. Ideal hydraulic power is the Bernoulli $\rho gh$ energy density multiplied by the flow rate: $P = \rho gQh$.
2. $P = (1000)(9.81)(0.50)(40)$
3. $P = 196200\ \mathrm{W} = 196.2\ \mathrm{kW}$
4. At 90% efficiency: $P_{out} = 0.90(196.2) = 176.6\ \mathrm{kW}$
5. In horsepower: $\frac{176600}{746} = 237\ \mathrm{hp}$

> [!success]- Answer
> **$P_{ideal} = 196\ \mathrm{kW}$; realistic output $= 177\ \mathrm{kW}$ (about $237\ \mathrm{hp}$).**

> [!warning] Trap
> Using $P = \frac{1}{2}\rho v^2$ and forgetting the flow rate, which leaves the answer in watts per cubic metre. Hydraulic power is a rate: energy per unit volume ($\rho gh$) times volume per unit time ($Q$).

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000×9.81×0.50×40` → $P$ = **196200** W = **196.2** kW ideal.
> 2. `×0.90` → **176.6** kW; `CONVT` power W → hp gives **237** hp.

### P10. Water flows upward through a pipe that narrows and rises. At the lower, wider station $A_1 = 0.020\ \mathrm{m^2}$, $v_1 = 2.0\ \mathrm{m/s}$ and $P_1 = 150\ \mathrm{kPa}$. At the upper station, $2.5\ \mathrm{m}$ higher, $A_2 = 0.010\ \mathrm{m^2}$. Find the pressure at the upper station.

**Given:** A_1 = 0.020 m^2; v_1 = 2.0 m/s; P_1 = 150 kPa; A_2 = 0.010 m^2; h_2 - h_1 = 2.5 m

**Solution:**

1. Continuity: $v_2 = v_1\frac{A_1}{A_2} = 2.0(2.0) = 4.0\ \mathrm{m/s}$
2. Bernoulli, taking station 1 as the reference height: $P_2 = P_1 + \frac{1}{2}\rho(v_1^2 - v_2^2) - \rho g(h_2-h_1)$
3. Speed term: $\frac{1}{2}(1000)(4.0 - 16.0) = -6000\ \mathrm{Pa}$
4. Height term: $-(1000)(9.81)(2.5) = -24525\ \mathrm{Pa}$
5. $P_2 = 150000 - 6000 - 24525 = 119475\ \mathrm{Pa}$
6. $P_2 = 119.5\ \mathrm{kPa}$

> [!success]- Answer
> **$P_2 = 119.5\ \mathrm{kPa}$ - a drop of 30.5 kPa, of which 24.5 kPa is height and only 6.0 kPa is speed.**

> [!warning] Trap
> Dropping the $\rho gh$ term because the pipe is 'a pipe'. In this problem the height costs four times as much pressure as the narrowing does; ignoring it gives 144 kPa instead of 119.5 kPa.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.0×0.020÷0.010` → $v_2$ = **4.0** m/s.
> 2. `150000+0.5×1000×(2.0²−4.0²)−1000×9.81×2.5` → **119475** Pa = **119.5** kPa, of which 24.5 kPa is height.

## Traps & Exam Notes

- **Using the diameter ratio linearly in continuity.** $v_2 = v_1\left(\frac{d_1}{d_2}\right)^2$, not $v_1\frac{d_1}{d_2}$. A 6 cm to 2 cm nozzle gives 13.5 m/s, not 4.5 m/s; the kinetic energy density is wrong by a factor of 9 either way.
- **Forgetting the $\left[1-(A_2/A_1)^2\right]$ factor in a Venturi meter.** Using $v = \sqrt{2\Delta P/\rho}$ ignores the inlet velocity and overstates the throat speed - 4.90 m/s instead of 5.06 m/s at a 2:1 area ratio, and the error grows without bound as the throat narrows.
- **Mixing gauge and absolute pressure across Bernoulli.** The equation is linear in $P$, so it works with either - provided both sides use the same reference. Putting $P_1$ absolute against $P_2$ gauge injects a spurious 101.325 kPa and can flip the sign of the predicted pressure change.
- **Applying Bernoulli across a pump, turbine or long rough pipe.** Bernoulli has no loss term, so on a real straight pipe of constant area it predicts $P_1 = P_2$ while the actual pressure falls steadily. Add the pump head or subtract the friction head, or the answer will be optimistic by the entire loss.
- **Setting $v_1 = 0$ when the tank is not large.** Torricelli requires the free surface area to be much larger than the hole. If the hole area is a tenth of the tank, the true efflux speed is $\sqrt{2gh}\sqrt{1-(A_2/A_1)^2} = 0.995\sqrt{2gh}$ - small here, but the same carelessness applied to a pipe junction silently drops the inlet velocity.
- **Reporting $\frac{1}{2}\rho v^2$ without converting to kPa.** At $v = 20\ \mathrm{m/s}$ in water, $\frac{1}{2}(1000)(400) = 200000\ \mathrm{Pa} = 200\ \mathrm{kPa}$, which is nearly two atmospheres - far larger than most students expect, and the reason a fast-flowing pipe's wall pressure can fall below atmospheric.
- **Confusing static and stagnation pressure taps.** A wall tap reads static pressure $P$; the Pitot mouth reads $P + \frac{1}{2}\rho v^2$. Using the static reading alone gives zero airspeed, and using it as the stagnation value understates the speed by the same factor.
- **Using the incompressible form for high-speed gas.** Below about Mach 0.3 the density change is under 5% and Bernoulli is fine; above it the compressible correction matters and continuity must carry $\rho$. A Pitot tube reading 2.16 kPa in air at 1.20 kg/m^3 gives 60 m/s, and the same tube at 300 m/s would be badly wrong.

## See Also

- [[07_Fluid_Statics_Pascal_and_Archimedes]]
- [[03_Work,_Energy_and_Conservation]]
- [[04_Momentum_and_Collisions]]

---

[[07_Fluid_Statics_Pascal_and_Archimedes|⬅ 07]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Thermal_Expansion_and_Calorimetry|09 ➡]]
