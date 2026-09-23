---
id: GEAS-02-12
title: "Second Law, Entropy and Carnot"
part: "03_GEAS"
area: "02_University_Physics"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[11_First_Law_and_Processes]]", "[[09_Thermal_Expansion_and_Calorimetry]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Second Law, Entropy and Carnot

> [!abstract] Scope
> Decide whether a cycle is allowed, compute efficiencies and coefficients of performance, and evaluate entropy changes for reversible and irreversible processes.

## Core Concept

> [!tip] Intuition
> The first law says energy is conserved; it never says which way the energy will go. The second law supplies the direction: heat flows hot to cold on its own, and every real conversion of heat to work throws some heat away. Entropy is the bookkeeping number that measures how much of that irreversibility you accumulated.

**Two statements, one content.** Kelvin-Planck: no engine operating in a cycle can convert heat completely into work — some heat must be rejected to a cold reservoir. Clausius: no device can move heat from cold to hot with no work input. They are equivalent, and either one immediately forbids the two great perpetual-motion claims: a cyclic engine with $100\%$ efficiency, and a refrigerator with no plug. A board item phrased as 'is this possible?' is answered by checking one of these statements or by computing $\Delta S_{total} < 0$.

**Efficiency and COP are different animals.** A heat engine's thermal efficiency is $\eta = W/Q_H = 1 - Q_C/Q_H$, always a number between 0 and 1. A refrigerator's coefficient of performance is $COP_R = Q_C/W$, which is *greater* than 1 for any useful refrigerator and typically 2 to 6 — a value between 0 and 1 signals that you inverted the ratio. A heat pump uses $COP_{HP} = Q_H/W = COP_R + 1$. Sliding between these three definitions is the most common lost point in the whole topic.

**Carnot is the ceiling, and it is set only by the two temperatures.** $\eta_{Carnot} = 1 - T_C/T_H$ with absolute temperatures. Any real engine between the same reservoirs is worse; an engine claiming better is impossible. Note the two consequences the board exploits: (1) the same $\Delta T$ buys more efficiency at low $T_C$ than at high $T_H$ — going from $300$ to $400\ \mathrm{K}$ on the hot side beats going from $400$ to $500\ \mathrm{K}$; and (2) $\eta = 1$ requires $T_C = 0\ \mathrm{K}$, which is why no engine is perfect.

**Entropy change is computed along a reversible path you invent.** $S$ is a state function, so the actual path does not matter: replace the real, messy process with any reversible route between the same endpoints and integrate $dS = dQ_{rev}/T$. For an isothermal reservoir or a phase change, $\Delta S = Q/T$. For a temperature change of a solid or liquid, $\Delta S = mc\ln(T_2/T_1)$. For an ideal gas the result is:
$$\Delta S = nC_v\ln(T_2/T_1) + nR\ln(V_2/V_1)$$

**The universe's entropy never decreases.** For an isolated system, $\Delta S_{total} = 0$ for a reversible process and $> 0$ for an irreversible one; $\Delta S_{total} < 0$ is impossible. A single body's entropy *can* fall — the hot reservoir in a heat-transfer item does — but the cold body's gain always more than pays for it. That asymmetry is the quantitative content of 'heat flows hot to cold'.

**Entropy is not disorder and not a synonym for heat.** It is an energy divided by an absolute temperature, measured in $\mathrm{J/K}$. Treating it as 'the heat' and answering an entropy item with a joule value, or attaching a Celsius temperature to the denominator, are the two ways this topic is lost in the arithmetic.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Thermal efficiency | $\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H}$ | Any heat engine in a cycle. W = Q_H - Q_C always, by energy conservation. |
| Carnot efficiency | $\eta_C = 1 - \frac{T_C}{T_H}$ | Reversible ceiling. T in kelvin only: with 30 C and 500 C plugged in raw the ratio is nonsense. |
| Refrigerator COP | $COP_R = \frac{Q_C}{W}$ | Heat removed per unit work. Always > 1 in practice; a value below 1 means Q_H/W was used by mistake. |
| Heat pump COP | $COP_{HP} = \frac{Q_H}{W} = COP_R + 1$ | Heat delivered per unit work. The +1 is the work itself, dissipated in the hot side. |
| Carnot COP | $COP_{Carnot} = \frac{T_C}{T_H - T_C}$ | Upper bound for both a refrigerator and a heat pump; kelvin again. |
| Entropy for a reservoir or phase change | $\Delta S = \frac{Q}{T}$ | Isothermal at temperature T. T must be the kelvin temperature of the body that changes state. |
| Entropy for a temperature change | $\Delta S = mc\ln\frac{T_2}{T_1}$ | Solids and liquids with constant c. Kelvin in the ratio; the ratio is dimensionless so any consistent unit cancels. |
| Entropy of an ideal gas | $\Delta S = nC_v\ln\frac{T_2}{T_1} + nR\ln\frac{V_2}{V_1}$ | Both terms are needed unless one of T or V is constant. Signs follow the ratios. |
| Latent entropy | $\Delta S = \frac{mL_f}{T_m}$ | Melting or freezing at the melting point. Freezing gives the same magnitude with a negative sign. |
| Second-law test | $\Delta S_{total} = \Delta S_{system} + \Delta S_{surroundings} \geq 0$ | Equality only for a reversible process. A negative total makes the proposed process impossible. |
| Kelvin conversion | $T(\mathrm{K}) = T({}^\circ\mathrm{C}) + 273.15$ | Use 273 for exam rounding. Every efficiency and entropy formula in this note requires it. |

## Worked Problems

### P1. A Carnot engine operates between a hot reservoir at $500\ ^\circ\mathrm{C}$ and a cold reservoir at $30.0\ ^\circ\mathrm{C}$. Find its efficiency.

**Given:** $T_H = 500\ ^\circ\mathrm{C}$; $T_C = 30.0\ ^\circ\mathrm{C}$

**Solution:**

1. Convert: $T_H = 500 + 273.15 = 773.15\ \mathrm{K}$ and $T_C = 30.0 + 273.15 = 303.15\ \mathrm{K}$
2. $\eta_C = 1 - T_C/T_H = 1 - 303.15/773.15$
3. $T_C/T_H = 0.3921$
4. $\eta_C = 1 - 0.3921 = 0.608$

> [!success]- Answer
> **$\eta_C = 0.608$, i.e. $60.8\%$.**

> [!warning] Trap
> Substituting $1 - 30/500 = 0.94$. Celsius in an efficiency ratio ignores the offset and claims a $94\%$ engine, which no Carnot engine can reach between these reservoirs.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `500+` `SHIFT` `CVALUE` 38 → **773.15** K and `30.0+CVALUE 38` → **303.15** K (code 38 is 273.15 K).
> 2. `1−Ans÷773.15` → $\eta_C$ = **0.608** = **60.8**%; the raw `1−30÷500` = **0.94** is the Celsius trap.

### P2. A heat engine absorbs $5000\ \mathrm{J}$ per cycle from a hot reservoir at $600\ \mathrm{K}$ and rejects $1900\ \mathrm{J}$ to a sink at $300\ \mathrm{K}$. Find the efficiency, the work per cycle, and state whether the engine could be a Carnot engine. If it runs at $1.00$ cycle per second, what is its power?

**Given:** $Q_H = 5000\ \mathrm{J}$; $Q_C = 1900\ \mathrm{J}$; $T_H = 600\ \mathrm{K}$, $T_C = 300\ \mathrm{K}$; $f = 1.00\ \mathrm{Hz}$

**Solution:**

1. Energy balance: $W = Q_H - Q_C = 5000 - 1900 = 3100\ \mathrm{J}$ per cycle
2. $\eta = W/Q_H = 3100/5000 = 0.620 = 62.0\%$
3. Carnot ceiling: $\eta_C = 1 - 300/600 = 0.500 = 50.0\%$
4. Since $\eta > \eta_C$, this engine is impossible
5. Power $= W f = (3100\ \mathrm{J})(1.00\ \mathrm{s^{-1}}) = 3100\ \mathrm{W}$

> [!success]- Answer
> **$\eta = 62.0\%$, $W = 3100\ \mathrm{J}$ per cycle, power $= 3.10\ \mathrm{kW}$ — but the engine **violates the second law** because $62.0\% > 50.0\%$.**

> [!warning] Trap
> Reporting the $62\%$ and stopping. When a stem supplies both reservoir temperatures, you are expected to compare against the Carnot ceiling; the correct conclusion is 'impossible', not 'efficient'.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5000−1900` → $W$ = **3100** J; `÷5000` → $\eta$ = **0.620** = **62.0**%.
> 2. `1−300÷600` → Carnot ceiling **0.500** = **50.0**% — 62.0% > 50.0%, so the engine is impossible.
> 3. Power: `3100×1.00` → **3100** W = **3.10** kW.

### P3. A refrigerator with $COP = 5.00$ removes $3000\ \mathrm{J}$ of heat per cycle from its cold compartment. Find the work input per cycle, the heat rejected, and the power drawn if it completes $8.33$ cycles per second.

**Given:** $COP_R = 5.00$; $Q_C = 3000\ \mathrm{J}$ per cycle; $8.33$ cycles/s

**Solution:**

1. $COP_R = Q_C/W$, so $W = Q_C/COP_R = 3000/5.00 = 600\ \mathrm{J}$ per cycle
2. Rejected heat: $Q_H = Q_C + W = 3000 + 600 = 3600\ \mathrm{J}$ per cycle
3. Power $= W f = (600)(8.33) = 5.00\times10^{3}\ \mathrm{W}$

> [!success]- Answer
> **$W = 600\ \mathrm{J}$ per cycle, $Q_H = 3600\ \mathrm{J}$ rejected, power $= 5.00\ \mathrm{kW}$.**

> [!warning] Trap
> Setting $COP = W/Q_C = 1/5 = 0.200$ and reporting $20\%$ efficiency. A refrigerator's COP is deliberately defined as heat moved per work, so it is larger than 1; a COP under 1 means the ratio was inverted.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3000÷5.00` → $W$ = **600** J per cycle; `3000+Ans` → $Q_H$ = **3600** J rejected to the room.
> 2. `600×8.33` → $P$ = **4998** W ≈ **5.00** kW. `3000÷600` = **5.00** is the COP, not an efficiency.

### P4. Find the entropy change of $1.00\ \mathrm{kg}$ of ice at $0\ ^\circ\mathrm{C}$ as it melts completely. Use $L_f = 3.34\times10^{5}\ \mathrm{J/kg}$.

**Given:** $m = 1.00\ \mathrm{kg}$; $T = 0\ ^\circ\mathrm{C} = 273.15\ \mathrm{K}$; $L_f = 3.34\times10^{5}\ \mathrm{J/kg}$

**Solution:**

1. The melting happens at constant temperature, so $\Delta S = Q/T$
2. $Q = mL_f = (1.00)(3.34\times10^{5}) = 3.34\times10^{5}\ \mathrm{J}$
3. $\Delta S = 3.34\times10^{5}/273.15 = 1.22\times10^{3}\ \mathrm{J/K}$

> [!success]- Answer
> **$\Delta S = +1.22\times10^{3}\ \mathrm{J/K}$ (entropy increases, as it must for melting).**

> [!warning] Trap
> Using $\Delta S = mc\ln(T_2/T_1)$ with $T_2 = T_1$ and reporting zero. A phase change has no temperature change but a large entropy change, because the $Q$ is latent heat.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1.00×3.34E5` → $Q$ = **3.34E5** J; `0+` `SHIFT` `CVALUE` 38 → $T$ = **273.15** K.
> 2. `3.34E5÷273.15` → $\Delta S$ = **+1.22E3** J/K; a phase change has $\Delta T$ = 0 but a large $\Delta S$.

### P5. $2000\ \mathrm{J}$ of heat flows from a reservoir at $400\ \mathrm{K}$ to a reservoir at $300\ \mathrm{K}$. Find the entropy change of each reservoir and of the universe, and state whether the process is reversible.

**Given:** $Q = 2000\ \mathrm{J}$; $T_{hot} = 400\ \mathrm{K}$, $T_{cold} = 300\ \mathrm{K}$

**Solution:**

1. Hot reservoir loses heat: $\Delta S_H = -Q/T_H = -2000/400 = -5.00\ \mathrm{J/K}$
2. Cold reservoir gains it: $\Delta S_C = +Q/T_C = +2000/300 = +6.67\ \mathrm{J/K}$
3. $\Delta S_{total} = -5.00 + 6.67 = +1.67\ \mathrm{J/K}$
4. $\Delta S_{total} > 0$, so the process is irreversible

> [!success]- Answer
> **$\Delta S_H = -5.00\ \mathrm{J/K}$, $\Delta S_C = +6.67\ \mathrm{J/K}$, $\Delta S_{universe} = +1.67\ \mathrm{J/K}$; irreversible.**

> [!warning] Trap
> Concluding the process is forbidden because one reservoir's entropy fell by $5.00\ \mathrm{J/K}$. Only the *total* must rise; the hot reservoir is not isolated. Heat transfer across a finite temperature difference is always irreversible, which is exactly what the $+1.67\ \mathrm{J/K}$ measures.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `−2000÷400` → $\Delta S_H$ = **−5.00** J/K; `2000÷300` → $\Delta S_C$ = **+6.67** J/K.
> 2. `−5.00+6.67` → $\Delta S_{universe}$ = **+1.67** J/K > 0, so the transfer is irreversible, not forbidden.

## Traps & Exam Notes

- **Celsius in $1 - T_C/T_H$.** Using $30$ and $500$ raw gives $94\%$ instead of $60.8\%$. Every second-law formula uses kelvin.
- **Assuming a $100\%$ engine is achievable with a big enough temperature ratio.** $\eta = 1$ requires $T_C = 0\ \mathrm{K}$; the Kelvin-Planck statement outlaws it outright regardless of $T_H$.
- **Swapping $COP_R$ and $COP_{HP}$.** They differ by exactly 1, and the heat pump value is always the larger. Using $Q_C/W$ for a heat pump under-reports the delivered heat by the work input, which is the entire unit.
- **Reporting a COP below 1 and calling it an efficiency.** A domestic refrigerator has $COP\approx3$; if your answer is $0.2$, you computed $W/Q_C$.
- **Reporting $W$ as a percentage of the wrong reservoir.** $\eta = W/Q_H$, never $W/Q_C$. Using the cold side inflates efficiency and can push it above $100\%$.
- **Setting $\Delta S = 0$ for any adiabatic process.** A *reversible* adiabatic process is isentropic; a real adiabatic process (free expansion, unrestrained compression) has $\Delta S > 0$. The word 'reversible' is doing all the work.
- **Declaring a process impossible when one body's entropy falls.** Only the isolated total must be non-negative. A refrigerator lowers the entropy of its cold compartment every second.
- **Giving entropy in joules.** $\Delta S = Q/T$ carries $\mathrm{J/K}$. An answer in joules is an energy, not an entropy, and is off by a factor of $T$.

## See Also

- [[11_First_Law_and_Processes]]
- [[10_Heat_Transfer]]
- [[09_Thermal_Expansion_and_Calorimetry]]
- [[_MOC_University_Physics]]
- [[_MOC_GEAS]]

---

[[11_First_Law_and_Processes|⬅ 11]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[13_SHM_and_Waves|13 ➡]]
