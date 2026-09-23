---
id: GEAS-02-07
title: "Fluid Statics: Pascal and Archimedes"
part: "03_GEAS"
area: "02_University_Physics"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Newton’s_Laws,_Friction_and_Circular_Motion]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Fluid Statics: Pascal and Archimedes

> [!abstract] Scope
> Compute gauge and absolute pressure with depth, transmit it through a hydraulic system, and find buoyant force, floating fraction and apparent weight.

## Core Concept

> [!tip] Intuition
> A fluid cannot support shear, so it pushes equally in every direction and its pressure grows with depth simply because more fluid sits on top. Anything immersed displaces its own volume of fluid, and the fluid pushes back up with the weight of exactly that displaced volume.

**Gauge versus absolute pressure is a bookkeeping choice, and mixing them is the most common error.** $P_{abs} = P_{atm} + \rho g h$, so the pressure 25 m down in water is $245\ \mathrm{kPa}$ gauge but $347\ \mathrm{kPa}$ absolute, since $1\ \mathrm{atm} = 101.325\ \mathrm{kPa}$. Gauge pressure is what a tyre gauge or a depth gauge reads; absolute pressure is what the ideal-gas law needs. Since only *differences* of pressure drive flow, Bernoulli works with either as long as both sides use the same reference - but the ideal-gas law and partial pressures require absolute. Use $\rho_{water} = 1000\ \mathrm{kg/m^3}$ and $g = 9.81\ \mathrm{m/s^2}$ unless the problem states otherwise.

**Pressure depends only on depth, not on the shape or the amount of fluid.** Every point at the same depth in a connected body of the same fluid is at the same pressure - that is the hydrostatic paradox, and it is why a narrow standpipe can burst a wide barrel. The force on a submerged surface is $F = P_{avg}A$ with $P_{avg}$ evaluated at the surface's centroid, so on a vertical rectangular gate the average pressure is taken at half the depth. This is also the basis of the hydraulic press.

**Pascal's principle: a pressure change applied to an enclosed fluid is transmitted undiminished throughout it.** Because pressure is force per area and the fluid is incompressible in these problems, a small force on a small piston produces a large force on a large piston with the area ratio:
$$F_2 = F_1\frac{A_2}{A_1}$$
The device does not create energy - the large piston moves a proportionally shorter distance, so $F_1d_1 = F_2d_2$ and the work is unchanged. Boards test both the force ratio and the 'how far does the small piston travel' follow-up.

**Archimedes' principle: the buoyant force equals the weight of the displaced fluid, $F_B = \rho_{fluid}gV_{displaced}$.** The density that belongs in the formula is the *fluid's*, never the object's. Only the submerged volume counts: a partially submerged floating body displaces a volume equal to the part below the surface, not its whole volume. For a fully submerged object the displaced volume is the object's total volume, and the net force is $W - F_B$, which is why a submerged object feels lighter - the 'apparent weight' a spring scale would read.

**Flotation and the submerged fraction.** A floating body is in equilibrium, so $F_B = W$, which gives:
$$\rho_{fluid}gV_{sub} = \rho_{obj}gV_{total}$$
This is equivalent to:
$$\frac{V_{sub}}{V_{total}} = \frac{\rho_{obj}}{\rho_{fluid}}$$
This single ratio answers almost every floating question: wood at $750\ \mathrm{kg/m^3}$ floats 75% submerged in water, ice at $917\ \mathrm{kg/m^3}$ floats about 92% submerged (which is why only the tip shows), and anything with $\rho \ge \rho_{fluid}$ cannot float at all. Because the ratio is dimensionless, an object that floats 75% submerged in water floats only $\frac{750}{13600} = 5.5\%$ submerged in mercury.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Pressure from force | $P = \frac{F}{A}$ | Pascals when F is in N and A in m^2. 1 Pa = 1 N/m^2, which is very small - most answers are in kPa. |
| Gauge pressure with depth | $P_{gauge} = \rho g h$ | h is the depth below the free surface, measured vertically. rho is the fluid's density, here 1000 kg/m^3 for water. |
| Absolute pressure | $P_{abs} = P_{atm} + \rho g h$ | P_atm = 101.325 kPa = 1 atm. Mixing gauge and absolute adds a spurious 101.325 kPa. |
| Unit conversions | $1\ \mathrm{atm} = 101.325\ \mathrm{kPa} = 760\ \mathrm{mmHg} = 14.7\ \mathrm{psi}$ | Mercury density is 13600 kg/m^3. Board stems switch between these without warning. |
| Pascal's principle (hydraulic press) | $F_2 = F_1\frac{A_2}{A_1} = F_1\frac{d_2^2}{d_1^2}$ | Areas scale as diameter squared. The force multiplies but the work does not: F1 d1 = F2 d2. |
| Buoyant force | $F_B = \rho_{fluid}\,g\,V_{displaced}$ | Use the FLUID density, not the object's. V is the submerged volume only, in m^3. |
| Apparent weight when submerged | $W_{app} = W - F_B$ | What a spring scale reads underwater. Zero for a floating body, since F_B = W. |
| Floating fraction | $\frac{V_{sub}}{V_{total}} = \frac{\rho_{obj}}{\rho_{fluid}}$ | Dimensionless, so it also equals the fraction of the object's height below the surface for a uniform body. |
| Density from air and water weights | $\rho_{obj} = \frac{W_{air}}{W_{air}-W_{water}}\,\rho_{water}$ | The denominator is the buoyant force. Works only when the object is fully submerged and sinks. |
| Pressure at equal depths | $P_1 = P_2 \quad (h_1 = h_2)$ | Same fluid, same depth, any container shape. This is what makes a U-tube manometer and the hydrostatic paradox work. |

## Worked Problems

### P1. Find the gauge pressure and the absolute pressure at a depth of $25\ \mathrm{m}$ in fresh water. Take $\rho = 1000\ \mathrm{kg/m^3}$, $g = 9.81\ \mathrm{m/s^2}$ and $P_{atm} = 101.325\ \mathrm{kPa}$.

**Given:** h = 25 m; rho = 1000 kg/m^3; g = 9.81 m/s^2; P_atm = 101.325 kPa

**Solution:**

1. Gauge pressure: $P = \rho g h = (1000)(9.81)(25)$
2. $P = 245250\ \mathrm{Pa} = 245.25\ \mathrm{kPa}$ gauge
3. Absolute pressure: $P_{abs} = P_{atm} + \rho g h = 101.325 + 245.25$
4. $P_{abs} = 346.6\ \mathrm{kPa}$

> [!success]- Answer
> **$245\ \mathrm{kPa}$ gauge; $347\ \mathrm{kPa}$ absolute.**

> [!warning] Trap
> Reporting 245 kPa as the absolute pressure, forgetting the atmosphere already sitting on the free surface. The distinction matters physically: at 10.3 m depth the gauge pressure is 101 kPa but the absolute pressure is 202 kPa - two atmospheres, not one.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000×9.81×25` → $P_{gauge}$ = **245250** Pa = **245.25** kPa.
> 2. `CONVT` pressure atm → Pa gives **101325** Pa; `Ans+245250` → $P_{abs}$ = **346575** Pa = **346.6** kPa.

### P2. A hydraulic lift has a small piston of area $5.0\ \mathrm{cm^2}$ and a large piston of area $400\ \mathrm{cm^2}$. A force of $250\ \mathrm{N}$ is applied to the small piston. Find the force the large piston exerts.

**Given:** A_1 = 5.0 cm^2; A_2 = 400 cm^2; F_1 = 250 N; enclosed incompressible fluid

**Solution:**

1. Pascal's principle: the pressure is the same at both pistons, $\frac{F_1}{A_1} = \frac{F_2}{A_2}$.
2. $F_2 = F_1\frac{A_2}{A_1} = 250\cdot\frac{400}{5.0}$
3. $\frac{400}{5.0} = 80$, so $F_2 = (250)(80) = 20000\ \mathrm{N}$
4. Note the areas were left in $\mathrm{cm^2}$: a ratio of areas is dimensionless, so the unit cancels. Check the pressure: $\frac{250}{5.0\times10^{-4}} = 500\ \mathrm{kPa}$ on both sides.

> [!success]- Answer
> **$F_2 = 20.0\ \mathrm{kN}$ - a mechanical advantage of 80.**

> [!warning] Trap
> Converting the areas to $\mathrm{m^2}$ inconsistently (for example 5.0 cm$^2$ to 0.05 m$^2$). A square centimetre is $10^{-4}\ \mathrm{m^2}$, not $10^{-2}$, so a botched conversion changes the advantage by 100x. As a pure ratio, the units may be left alone.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `400÷5.0` → area ratio **80**; `250×Ans` → $F_2$ = **20000** N = **20.0** kN.
> 2. Pressure check: `250÷5.0E-4` → **500000** Pa = **500** kPa, since 1 cm² = 1E-4 m². A pure ratio of areas needs no conversion at all.

### P3. A $0.025\ \mathrm{m^3}$ block of aluminium ($\rho = 2700\ \mathrm{kg/m^3}$) is fully submerged in water. Find its weight in air, the buoyant force, and the apparent weight measured by a scale while submerged.

**Given:** V = 0.025 m^3; rho_Al = 2700 kg/m^3; rho_water = 1000 kg/m^3; fully submerged

**Solution:**

1. Weight in air: $W = \rho_{Al}Vg = (2700)(0.025)(9.81) = 67.5(9.81) = 662.2\ \mathrm{N}$
2. Buoyant force uses the WATER density and the full block volume (it is fully submerged):
3. $F_B = \rho_{water}Vg = (1000)(0.025)(9.81) = 25(9.81) = 245.3\ \mathrm{N}$
4. Apparent weight: $W_{app} = 662.2 - 245.3 = 416.9\ \mathrm{N}$
5. Note the ratio: aluminium is 2.7x as dense as water, so the apparent weight is $\frac{1.7}{2.7} = 63\%$ of the true weight.

> [!success]- Answer
> **$W = 662\ \mathrm{N}$ in air; $F_B = 245\ \mathrm{N}$; apparent weight $= 417\ \mathrm{N}$.**

> [!warning] Trap
> Using the aluminium density in $F_B = \rho g V$, which gives 662 N - the *whole* weight - and therefore an apparent weight of zero for a block that in fact sinks. The buoyant force is always set by the fluid that is displaced.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2700×0.025×9.81` → $W$ = **662.2** N in air.
> 2. `1000×0.025×9.81` → $F_B$ = **245.3** N (the fluid's density, the full volume); `662.175−Ans` → $W_{app}$ = **416.9** N.

### P4. A block of wood of density $750\ \mathrm{kg/m^3}$ floats in water. What fraction of its volume is submerged, and what fraction would be submerged if the same block floated in mercury ($\rho = 13600\ \mathrm{kg/m^3}$)?

**Given:** rho_wood = 750 kg/m^3; rho_water = 1000 kg/m^3; rho_Hg = 13600 kg/m^3

**Solution:**

1. Floating means $F_B = W$: $\rho_{fluid}gV_{sub} = \rho_{obj}gV_{total}$
2. So $\frac{V_{sub}}{V_{total}} = \frac{\rho_{obj}}{\rho_{fluid}}$
3. In water: $\frac{750}{1000} = 0.75$, so 75% of the volume is submerged.
4. In mercury: $\frac{750}{13600} = 0.0551$, so only 5.5% is submerged - the block rides almost entirely above the surface.
5. Because the block is uniform, these are also the fractions of its height below the surface.

> [!success]- Answer
> **75% submerged in water; 5.5% submerged in mercury.**

> [!warning] Trap
> Inverting the ratio to $\frac{\rho_{fluid}}{\rho_{obj}}$, which gives 1.33 for wood in water - a physically impossible answer greater than 1. A floating body can never displace more than its own volume.

### P5. A metal object weighs $12.0\ \mathrm{N}$ in air and $10.5\ \mathrm{N}$ when fully submerged in water. Find its volume and its density.

**Given:** W_air = 12.0 N; W_water = 10.5 N; rho_water = 1000 kg/m^3; g = 9.81 m/s^2

**Solution:**

1. The apparent loss of weight is the buoyant force: $F_B = 12.0 - 10.5 = 1.50\ \mathrm{N}$
2. $F_B = \rho_{water}gV$, so $V = \frac{F_B}{\rho_{water}g} = \frac{1.50}{(1000)(9.81)} = 1.53\times10^{-4}\ \mathrm{m^3}$
3. Mass: $m = \frac{W_{air}}{g} = \frac{12.0}{9.81} = 1.223\ \mathrm{kg}$
4. $\rho = \frac{m}{V} = \frac{1.223}{1.53\times10^{-4}} = 8000\ \mathrm{kg/m^3}$
5. Shortcut check: $\rho = \frac{W_{air}}{W_{air}-W_{water}}\rho_{water} = \frac{12.0}{1.50}(1000) = 8000\ \mathrm{kg/m^3}$, consistent.

> [!success]- Answer
> **$V = 1.53\times10^{-4}\ \mathrm{m^3}$ (153 cm$^3$); $\rho = 8000\ \mathrm{kg/m^3}$, consistent with steel or brass.**

> [!warning] Trap
> Treating $W_{water} = 10.5\ \mathrm{N}$ as the object's weight and dividing by $g$ to get the mass. The submerged reading is the *apparent* weight; the mass comes from the 12.0 N air weight only.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `12.0−10.5` → $F_B$ = **1.50** N; `Ans÷(1000×9.81)` → $V$ = **1.529E-4** m³ = **153** cm³.
> 2. Shortcut: `12.0÷1.50×1000` → $\rho$ = **8000** kg/m³, matching `(12.0÷9.81)÷1.529E-4`.

## Traps & Exam Notes

- **Using the object's density in $F_B$.** Buoyancy is $\rho_{fluid}gV_{displaced}$. An aluminium block ($2700\ \mathrm{kg/m^3}$) in water gets $F_B = 245\ \mathrm{N}$ on a $0.025\ \mathrm{m^3}$ volume, not the 662 N its own density would give.
- **Reporting gauge pressure as absolute (or vice versa).** 25 m down in water is 245 kPa gauge but 347 kPa absolute. Adding 101.325 kPa where a gauge reading was asked shifts the answer by 41%.
- **Using the total volume for a floating body.** Only the submerged volume displaces fluid. A wooden block 75% submerged displaces $0.75V$, and using $V$ overstates the buoyant force by 33%.
- **Inverting the floating-fraction ratio.** $\frac{V_{sub}}{V} = \frac{\rho_{obj}}{\rho_{fluid}}$, so wood in water gives 0.75, not 1.33. Any fraction above 1 means the ratio was flipped.
- **Converting $\mathrm{cm^2}$ to $\mathrm{m^2}$ as $10^{-2}$.** The correct factor is $10^{-4}$; the error changes a hydraulic advantage by a factor of 100 and turns a 20 kN lift into 200 kN.
- **Assuming a floating body has an apparent weight.** A floating body is in equilibrium, so $F_B = W$ and the apparent weight is zero. Solving for a non-zero apparent weight contradicts the fact that it is not accelerating.

## See Also

- [[08_Fluid_Dynamics_Continuity_and_Bernoulli]]
- [[02_Newton’s_Laws,_Friction_and_Circular_Motion]]

---

[[06_Angular_Momentum_and_Rigid_Bodies|⬅ 06]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Fluid_Dynamics_Continuity_and_Bernoulli|08 ➡]]
