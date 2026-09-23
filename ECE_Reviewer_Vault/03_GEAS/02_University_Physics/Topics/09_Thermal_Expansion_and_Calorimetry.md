---
id: GEAS-02-09
title: "Thermal Expansion and Calorimetry"
part: "03_GEAS"
area: "02_University_Physics"
topic: 9
tier: 2
depth: full
problem_count: 4
prereqs: ["[[03_Work,_Energy_and_Conservation]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Thermal Expansion and Calorimetry

> [!abstract] Scope
> Compute how solids and liquids change size when heated, and how much heat moves between bodies when temperatures change or a phase change occurs.

## Core Concept

> [!tip] Intuition
> Temperature measures the average kinetic energy of the molecules; heat is the energy that actually moves. Heating a solid makes the molecules vibrate over a slightly larger range, so every length in the object grows by the same small fraction — which is why one coefficient per material controls length, area and volume at once.

**One coefficient, three formulas.** For a solid, thermal expansion is isotropic in the small-strain limit: every length grows by the same fraction $\alpha\,\Delta T$. That immediately gives area expansion with coefficient $2\alpha$ and volume expansion with coefficient $3\alpha$. The board writes the volume law as $\Delta V = \beta V_0 \Delta T$ with $\beta = 3\alpha$ for solids, but for a *liquid* there is no linear dimension to measure, so the tabulated coefficient is already $\beta$ and you must **never** multiply it by 3. This single distinction decides most expansion items.

**Only $\Delta T$ matters, and it is unitless-equivalent.** A change of $1\ ^\circ\mathrm{C}$ equals a change of $1\ \mathrm{K}$, so $\Delta T$ may be left in Celsius. Absolute temperatures may not: anything that goes through a gas law, a radiation law, or an efficiency ratio needs kelvin. Expansion coefficients are quoted per $^\circ\mathrm{C}$ or per $\mathrm{K}$ — the same number — and are of order $10^{-5}$ for metals, so answers are usually millimetres or millilitres, not metres.

**Calorimetry is conservation of energy, with a boundary condition.** Isolate the mixture, set $\sum Q = 0$, and give heat leaving the hot body a negative sign. The method fails at a phase change unless the change is priced separately: warm-up/ cool-down legs use $mc\Delta T$, while melting/freezing uses $mL_f$ and boiling/condensing uses $mL_v$ — and during those legs the temperature is **constant**, so no $\Delta T$ leg overlaps them.

**$L_f$ and $L_v$ are energies per kilogram, so a small mass error is punished.** For water $L_f = 334\ \mathrm{kJ/kg}$ and $L_v = 2260\ \mathrm{kJ/kg}$. Note how lopsided they are: melting $1\ \mathrm{kg}$ of ice costs the same heat as warming that kilogram of water by $80\ ^\circ\mathrm{C}$, and vaporising it costs as much as a $540\ ^\circ\mathrm{C}$ warm-up. That ratio is why the board loves ice-plus-water problems.

**The classic ice-plus-water problem has a decision point.** Before you set $\sum Q = 0$ with ice on one side and warm water on the other, check that the warm water can actually supply the latent heat needed to melt all the ice. If the final temperature comes out below $0\ ^\circ\mathrm{C}$, or the available heat is less than $m_{ice}L_f$, the correct answer is not a temperature at all — it is a residual ice mass at $0\ ^\circ\mathrm{C}$. State the check explicitly; that check is the exam answer.

**Water is the standard exception.** Between $0\ ^\circ\mathrm{C}$ and $4\ ^\circ\mathrm{C}$ water *contracts* as it warms ($\beta < 0$), which is why a lake freezes from the top and why $4\ ^\circ\mathrm{C}$ water sits at the bottom. The same anomaly makes ice less dense than liquid water, so a closed container of freezing water bursts rather than shrinking.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Linear expansion | $\Delta L = \alpha L_0 \Delta T$ | Rods, rails, pendulum lengths, one dimension only. Delta-T may stay in Celsius; alpha is per degree C or per K, the same number. |
| Area expansion | $\Delta A = 2\alpha A_0 \Delta T$ | Plates, holes, sheet metal. A hole in a plate expands exactly as if it were filled with the same metal. |
| Volume expansion of a solid | $\Delta V = 3\alpha V_0 \Delta T = \beta V_0 \Delta T$ | Blocks and cavities. The factor 3 is the trap: forgetting it makes the answer three times too small. |
| Volume expansion of a liquid | $\Delta V = \beta V_0 \Delta T$ | beta is the tabulated liquid coefficient already; do not multiply by 3. Container expansion must be subtracted separately. |
| Heat without phase change | $Q = mc\Delta T$ | c is per kg, so mass must be in kg. If c is given in cal/(g degree C), multiply by 4.186 to get joules. |
| Latent heat | $Q = mL$ | Used only during melting/freezing (L_f) or boiling/condensing (L_v). T is constant, so no mc delta-T term is added for that leg. |
| Heat capacity of a body | $C = mc$ | C is in J/K for the whole object, not per kg. Q = C delta-T; using C in place of c for a different mass is wrong. |
| Calorimetry balance | $\sum Q = 0 \quad \mathrm{with\ heat\ lost\ negative}$ | Applies only in a sealed, insulated system. Every leg of every body must appear exactly once. |
| Ice-to-water heat path | $Q = m_ic_i\Delta T + mL_f + mc_w\Delta T$ | Three legs for ice below 0 C ending as liquid water: warm ice, melt, warm meltwater. |
| Liquid-in-tank spill | $V_{spill} = V_0(\beta_{liq}-3\alpha_{tank})\Delta T$ | The tank also grows, so the overflow is driven by the difference of coefficients, not by beta-liq alone. |
| Exam constants | $c_w = 4186\ \mathrm{J/(kg\cdot K)},\ L_f = 334\ \mathrm{kJ/kg},\ L_v = 2260\ \mathrm{kJ/kg}$ | Board-rounded values. Ice c is about 2100 J/(kg K); steel alpha = 12e-6, aluminium 24e-6, copper 17e-6 per degree C. |

## Worked Problems

### P1. A 12.0 m steel rail is installed at $25\ ^\circ\mathrm{C}$. The hottest day reaches $60\ ^\circ\mathrm{C}$. Take $\alpha_{steel} = 12.0\times10^{-6}\ {}^\circ\mathrm{C}^{-1}$ and find the rail's change in length.

**Given:** $L_0 = 12.0\ \mathrm{m}$; $\alpha = 12.0\times10^{-6}\ {}^\circ\mathrm{C}^{-1}$; $T_i = 25\ ^\circ\mathrm{C}$, $T_f = 60\ ^\circ\mathrm{C}$

**Solution:**

1. Temperature change: $\Delta T = 60 - 25 = 35\ ^\circ\mathrm{C}$ (identical to $35\ \mathrm{K}$)
2. $\Delta L = \alpha L_0 \Delta T = (12.0\times10^{-6})(12.0)(35)$
3. $= (1.44\times10^{-4})(35) = 5.04\times10^{-3}\ \mathrm{m}$
4. $\Delta L = 5.04\ \mathrm{mm}$ of added length

> [!success]- Answer
> **$\Delta L = 5.04\ \mathrm{mm}$ (about $5.0\ \mathrm{mm}$).**

> [!warning] Trap
> Converting Celsius to kelvin 'to be safe' and then using the kelvin temperature itself (333 K) instead of the difference. Expansion depends on $\Delta T$, and a 35 degree C rise is a 35 K rise.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `12.0E-6×12.0×35` → $\Delta L$ = **5.04E-3** m = **5.04** mm.
> 2. Only the difference matters: `60−25` = **35**, never the 333 K itself. A coefficient per °C is the same number per K.

### P2. A steel tank is filled to the brim with $50.0\ \mathrm{L}$ of gasoline at $10\ ^\circ\mathrm{C}$. Both are warmed to $35\ ^\circ\mathrm{C}$. With $\beta_{gas} = 9.5\times10^{-4}\ {}^\circ\mathrm{C}^{-1}$ and $\alpha_{steel} = 12.0\times10^{-6}\ {}^\circ\mathrm{C}^{-1}$, how much gasoline overflows?

**Given:** $V_0 = 50.0\ \mathrm{L}$; $\beta_{gas} = 9.5\times10^{-4}\ {}^\circ\mathrm{C}^{-1}$; $\alpha_{steel} = 12.0\times10^{-6}\ {}^\circ\mathrm{C}^{-1}$; $\Delta T = 25\ ^\circ\mathrm{C}$

**Solution:**

1. Gasoline expands: $\Delta V_{gas} = \beta V_0 \Delta T = (9.5\times10^{-4})(50.0)(25) = 1.1875\ \mathrm{L}$
2. The tank is a solid, so use $3\alpha$: $\Delta V_{tank} = 3\alpha V_0 \Delta T = (3)(12.0\times10^{-6})(50.0)(25)$
3. $\Delta V_{tank} = (3)(1.5\times10^{-2}) = 4.5\times10^{-2}\ \mathrm{L} = 0.045\ \mathrm{L}$
4. Overflow $= 1.1875 - 0.045 = 1.1425\ \mathrm{L}$

> [!success]- Answer
> **$V_{spill} \approx 1.14\ \mathrm{L}$ (about $1.1\ \mathrm{L}$).**

> [!warning] Trap
> Calling the overflow $1.19\ \mathrm{L}$ by ignoring the tank's own expansion, or using $\alpha_{steel}$ instead of $3\alpha$ for the tank. The tank grows by 0.045 L, which is small but is exactly the correction the item is testing.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `9.5E-4×50.0×25` → gasoline **1.1875** L; `3×12.0E-6×50.0×25` → tank **0.045** L.
> 2. `1.1875−0.045` → overflow **1.1425** L ≈ **1.14** L, not the 1.19 L you get by ignoring the tank.

### P3. A $0.200\ \mathrm{kg}$ block of ice at $-10.0\ ^\circ\mathrm{C}$ is dropped into $0.500\ \mathrm{kg}$ of water at $30.0\ ^\circ\mathrm{C}$ in an insulated cup. Find the final temperature. Use $c_{ice} = 2100\ \mathrm{J/(kg\cdot K)}$, $c_{water} = 4186\ \mathrm{J/(kg\cdot K)}$, $L_f = 334\ \mathrm{kJ/kg}$.

**Given:** $m_{ice} = 0.200\ \mathrm{kg}$ at $-10.0\ ^\circ\mathrm{C}$; $m_w = 0.500\ \mathrm{kg}$ at $30.0\ ^\circ\mathrm{C}$; $L_f = 3.34\times10^{5}\ \mathrm{J/kg}$

**Solution:**

1. Warm the ice to $0\ ^\circ\mathrm{C}$: $Q_1 = (0.200)(2100)(10) = 4200\ \mathrm{J}$
2. Melt the ice: $Q_2 = mL_f = (0.200)(3.34\times10^{5}) = 66{,}800\ \mathrm{J}$. Total to get $0.200\ \mathrm{kg}$ of $0\ ^\circ\mathrm{C}$ water $= 71{,}000\ \mathrm{J}$
3. Heat available from cooling the warm water to $0\ ^\circ\mathrm{C}$: $Q_3 = (0.500)(4186)(30) = 62{,}790\ \mathrm{J}$
4. $Q_3 < Q_1 + Q_2$, so not all the ice melts. Melted mass: the $62{,}790\ \mathrm{J}$ first warms all the ice ($4200\ \mathrm{J}$), leaving $58{,}590\ \mathrm{J}$ for melting
5. $m_{melt} = 58{,}590 / 3.34\times10^{5} = 0.1754\ \mathrm{kg}$, so $0.200 - 0.1754 = 0.0246\ \mathrm{kg}$ of ice is left

> [!success]- Answer
> **Final temperature $0\ ^\circ\mathrm{C}$, with about $0.025\ \mathrm{kg}$ ($25\ \mathrm{g}$) of ice remaining.**

> [!warning] Trap
> Plunging ahead with $\sum Q = 0$ and reporting a final temperature near $10\ ^\circ\mathrm{C}$. The warm water cannot even pay for the latent heat, so the mixture is pinned at $0\ ^\circ\mathrm{C}$. The required pre-check is comparing $m_wc_w\Delta T$ against $m_{ice}(c_{ice}\Delta T + L_f)$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.200×2100×10` → warming **4200** J; `0.200×3.34E5` → melting **66800** J; total **71000** J.
> 2. `0.500×4186×30` → the warm water offers only **62790** J < 71000 J, so the mixture pins at **0** °C, not near 10 °C.
> 3. `(62790−4200)÷3.34E5` → **0.1754** kg melted, and `0.200−Ans` → **0.0246** kg ≈ **25** g of ice left over.

### P4. A $0.300\ \mathrm{kg}$ aluminium block at $200\ ^\circ\mathrm{C}$ is dropped into $0.500\ \mathrm{kg}$ of water at $20.0\ ^\circ\mathrm{C}$ in an insulated container. Find the equilibrium temperature. $c_{Al} = 900\ \mathrm{J/(kg\cdot K)}$, $c_w = 4186\ \mathrm{J/(kg\cdot K)}$.

**Given:** $m_{Al} = 0.300\ \mathrm{kg}$, $T_{Al} = 200\ ^\circ\mathrm{C}$; $m_w = 0.500\ \mathrm{kg}$, $T_w = 20.0\ ^\circ\mathrm{C}$

**Solution:**

1. Heat lost by aluminium $=$ heat gained by water: $m_{Al}c_{Al}(200 - T) = m_wc_w(T - 20)$
2. $(0.300)(900)(200 - T) = (0.500)(4186)(T - 20)$
3. $54{,}000 - 270T = 2093T - 41{,}860$
4. $95{,}860 = 2363T$, so $T = 40.57\ ^\circ\mathrm{C}$

> [!success]- Answer
> **$T \approx 40.6\ ^\circ\mathrm{C}$.**

> [!warning] Trap
> Using $\Delta T$ in kelvin for one body and Celsius for the other — harmless here because it is a *difference* — but then writing the equilibrium temperature itself in kelvin in one bracket and Celsius in the other. Mixing absolute and relative temperatures inside the same equation is the failure.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `SOLVE`: enter `0.300×900×(200−X)=0.500×4186×(X−20)`, give a guess of 40, `=` → $T$ = **40.57** °C.
> 2. Balance check: `270×(200−X)` → **43047** J out and `2093×(X−20)` → **43047** J in.

## Traps & Exam Notes

- **Using $\alpha$ for a volume.** The volume coefficient of a solid is $\beta = 3\alpha$, so a cube's volume expansion computed with $\alpha$ comes out three times too small.
- **Multiplying a liquid's $\beta$ by 3.** Liquid coefficients are already volumetric. Applying the factor 3 inflates the spill (or the contraction) by 300%.
- **Confusing heat with temperature.** $Q = mc\Delta T$ has no term for how hot something already is; two bodies at the same temperature can need very different heats, and the item that asks 'which is hotter' is not a calorimetry item.
- **Skipping a leg of the ice path.** Warming ice to $0\ ^\circ\mathrm{C}$, melting it, then warming the meltwater is three separate terms. Dropping the $mL_f$ leg is the single most common lost point on ice problems.
- **Assuming all the ice melts.** If $m_wc_w(T_w - 0) < m_{ice}(c_{ice}\Delta T + L_f)$, the final state is an ice-water mixture at $0\ ^\circ\mathrm{C}$ and any computed temperature above $0\ ^\circ\mathrm{C}$ is meaningless.
- **Mixing kJ and J in one sum.** $L_f = 334\ \mathrm{kJ/kg}$ while $c\Delta T$ terms come out in joules. Converting only the latent term, or only the sensible terms, shifts the answer by a factor of 1000.
- **Leaving mass in grams.** $c = 4186\ \mathrm{J/(kg\cdot K)}$ demands kilograms. Substituting 200 g into $mc\Delta T$ overstates the heat by 1000x, an error that shows up as a wildly wrong equilibrium temperature.
- **Giving a mixture a negative Celsius answer.** A liquid-water mixture cannot cool below $0\ ^\circ\mathrm{C}$ without freezing; the correct statement is a residual ice mass at $0\ ^\circ\mathrm{C}$.

## See Also

- [[10_Heat_Transfer]]
- [[11_First_Law_and_Processes]]
- [[12_Second_Law,_Entropy_and_Carnot]]
- [[08_Fluid_Dynamics_Continuity_and_Bernoulli]]
- [[_MOC_University_Physics]]

---

[[08_Fluid_Dynamics_Continuity_and_Bernoulli|⬅ 08]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Heat_Transfer|10 ➡]]
