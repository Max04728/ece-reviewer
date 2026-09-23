---
id: GEAS-02-11
title: "First Law and Processes"
part: "03_GEAS"
area: "02_University_Physics"
topic: 11
tier: 2
depth: full
problem_count: 4
prereqs: ["[[09_Thermal_Expansion_and_Calorimetry]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — First Law and Processes

> [!abstract] Scope
> Apply the energy balance to a gas, work out the four standard process paths with the correct sign convention, and compute $\Delta U$, $Q$ and $W$ for each.

## Core Concept

> [!tip] Intuition
> The first law is bookkeeping for energy, not a new force law: heat in and work out are two doors into the same room, and the internal energy is whatever is left inside. Most exam errors are sign errors, because 'work' changes meaning depending on which door you label positive.

**Fix the convention before you substitute anything.** This note and the board use $\Delta U = Q - W$, where $Q>0$ means heat *into* the gas and $W>0$ means work done *by* the gas (expansion). The chemistry convention $\Delta U = Q + W$ takes $W$ as work done *on* the gas, so the same physical expansion flips sign. Write the convention on your scratch paper first; a correct computation with the wrong convention is a wrong answer.

**The path matters, $\Delta U$ does not.** For an ideal gas $U$ depends only on $T$, so $\Delta U = nC_v\Delta T$ is the same for every path between the same two temperatures — including paths where no heat is added at all. That single fact collapses most items: if you can find $\Delta T$, you have $\Delta U$; then $Q$ or $W$ follows from the first law with no integration.

**Four process names, four shortcuts.** Isochoric ($V$ const): $W = 0$, so $Q = \Delta U = nC_v\Delta T$. Isobaric ($P$ const):
$$W = P\Delta V = nR\Delta T$$
and $Q = nC_p\Delta T$. Isothermal ($T$ const): $\Delta U = 0$, so $Q = W = nRT\ln(V_2/V_1)$. Adiabatic ($Q = 0$): $\Delta U = -W$, and the state path obeys $PV^{\gamma} = \mathrm{const}$. Recognising which of the four you are in is the whole method.

**Adiabatic does not mean isothermal.** An adiabatic *free* expansion into a vacuum is special: no heat, no work, so $\Delta U = 0$ and the temperature is unchanged. Every other adiabatic process changes $T$, because the gas does work at the expense of its own internal energy (expansion cools, compression heats). The board tests both cases and they behave differently.

**$C_p - C_v = R$ per mole is the work term in disguise.** The extra heat at constant pressure is exactly the $P\Delta V$ the gas performs while expanding. Hence $\gamma = C_p/C_v$, $C_v = R/(\gamma-1)$ and $C_p = \gamma R/(\gamma-1)$. Monatomic gases have $C_v = \frac{3}{2}R$ and $\gamma = 1.67$; diatomic gases at room temperature have $C_v = \frac{5}{2}R$ and $\gamma = 1.40$. Default to diatomic ($\gamma = 1.4$) for 'air' and for any gas named as $\mathrm{N_2}$, $\mathrm{O_2}$ or $\mathrm{H_2}$.

**Polytropic processes generalise all four.** $PV^n = \mathrm{const}$ with $W = (P_1V_1 - P_2V_2)/(n-1)$ for $n\neq1$, while $n = 0$ reproduces isobaric, $n\to\infty$ isochoric, $n = 1$ is isothermal and $n = \gamma$ is adiabatic. Use it when the stem gives a pressure-volume pair and asks for work without naming the process, and remember to convert litres and kPa into $\mathrm{m^3}$ and Pa before multiplying.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| First law (this note's convention) | $\Delta U = Q - W$ | W is work done BY the gas. Using the chemistry convention Q + W elsewhere flips every sign in the problem. |
| Internal energy of an ideal gas | $\Delta U = nC_v\Delta T = \frac{nR\Delta T}{\gamma-1}$ | T in kelvin. Path-independent: it is the same for every route between the two temperatures. |
| Work at constant pressure | $W = P\Delta V = nR\Delta T$ | Only when P is fixed. Litres times kPa gives joules directly; litres times atm does not. |
| Work at constant volume | $W = 0 \Rightarrow Q = \Delta U$ | Rigid container. All the heat shows up as internal energy and therefore as temperature. |
| Isothermal work | $W = Q = nRT\ln\frac{V_2}{V_1}$ | Ideal gas, T fixed, so delta-U = 0. The ratio must be V2/V1, not V1/V2. |
| Adiabatic state relation | $P_1V_1^{\gamma} = P_2V_2^{\gamma}, \quad T_1V_1^{\gamma-1} = T_2V_2^{\gamma-1}$ | Reversible adiabatic only. Q = 0 and delta-U = -W. |
| Heat capacities | $C_p - C_v = R,\quad \gamma = \frac{C_p}{C_v}$ | Per mole. Monatomic C_v = 1.5R, gamma = 1.67; diatomic C_v = 2.5R, gamma = 1.40. |
| Heat at constant pressure | $Q = nC_p\Delta T$ | Use C_p only for a fixed-pressure path; using C_v understates Q by the factor gamma. |
| Polytropic work | $W = \frac{P_1V_1 - P_2V_2}{n-1},\quad n\neq1$ | Valid for any PV^n = const path. Sign follows P1V1 - P2V2, so expansion gives positive work. |
| Free expansion into vacuum | $Q = 0,\ W = 0 \Rightarrow \Delta U = 0,\ \Delta T = 0$ | Ideal gas only. No resisting pressure means no work, even though the volume changes. |
| Gas constant | $R = 8.314\ \mathrm{J/(mol\cdot K)}$ | Pair with n in moles, P in Pa, V in m^3. R = 0.0821 L atm/(mol K) needs the other units instead. |

## Worked Problems

### P1. $2.00\ \mathrm{mol}$ of an ideal gas expands isothermally at $300\ \mathrm{K}$ from $10.0\ \mathrm{L}$ to $20.0\ \mathrm{L}$. Find $W$, $Q$ and $\Delta U$.

**Given:** $n = 2.00\ \mathrm{mol}$; $T = 300\ \mathrm{K}$; $V_1 = 10.0\ \mathrm{L}$, $V_2 = 20.0\ \mathrm{L}$; $R = 8.314\ \mathrm{J/(mol\cdot K)}$

**Solution:**

1. Isothermal means $\Delta T = 0$, so $\Delta U = nC_v\Delta T = 0$
2. Work done by the gas: $W = nRT\ln(V_2/V_1) = (2.00)(8.314)(300)\ln(2)$
3. $nRT = 4988\ \mathrm{J}$ and $\ln 2 = 0.6931$
4. $W = 4988 \times 0.6931 = 3.46\times10^{3}\ \mathrm{J}$
5. First law: $Q = \Delta U + W = 0 + 3460 = 3.46\times10^{3}\ \mathrm{J}$

> [!success]- Answer
> **$W = Q = 3.46\ \mathrm{kJ}$, $\Delta U = 0$.**

> [!warning] Trap
> Computing $Q = nC_v\Delta T$ for an isothermal process and declaring $Q = 0$ because $\Delta T = 0$. The heat is not zero here; it equals the work, because the gas is doing work while its internal energy is held fixed.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.00×8.314×300×ln(2)` → $W$ = **3460** J = **3.46** kJ, with $V_2/V_1$ = 20.0/10.0 = 2.
> 2. $\Delta U$ = **0** J at fixed $T$, so $Q$ = **3.46** kJ too; $nC_v\Delta T$ = 0 is zero *change*, not zero heat.

### P2. $5.00\ \mathrm{mol}$ of monatomic ideal gas is heated at constant pressure from $300\ \mathrm{K}$ to $400\ \mathrm{K}$. Find $Q$, $\Delta U$ and $W$.

**Given:** $n = 5.00\ \mathrm{mol}$, monatomic; $\Delta T = 100\ \mathrm{K}$; $C_v = \frac{3}{2}R$, $C_p = \frac{5}{2}R$

**Solution:**

1. $Q = nC_p\Delta T = (5.00)(2.5)(8.314)(100)$
2. $= (5.00)(20.785)(100) = 1.039\times10^{4}\ \mathrm{J}$
3. $\Delta U = nC_v\Delta T = (5.00)(1.5)(8.314)(100) = 6.236\times10^{3}\ \mathrm{J}$
4. $W = Q - \Delta U = 10{,}390 - 6236 = 4.16\times10^{3}\ \mathrm{J}$
5. Check with $W = nR\Delta T = (5.00)(8.314)(100) = 4157\ \mathrm{J}$, which agrees

> [!success]- Answer
> **$Q = 10.4\ \mathrm{kJ}$, $\Delta U = 6.24\ \mathrm{kJ}$, $W = 4.16\ \mathrm{kJ}$.**

> [!warning] Trap
> Using $C_v$ in place of $C_p$ for a constant-pressure heat. That understates $Q$ by the factor $\gamma = 1.67$, and the resulting $W$ then looks negative or vanishes against the internal-energy check.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5.00×2.5×8.314×100` → $Q$ = **10393** J ≈ **10.4** kJ; `5.00×1.5×8.314×100` → $\Delta U$ = **6236** J.
> 2. `10393−6236` → $W$ = **4157** J, matching the direct `5.00×8.314×100` = **4157** J.

### P3. $2.00\ \mathrm{mol}$ of diatomic ideal gas at $300\ \mathrm{K}$ is compressed adiabatically and reversibly to half its volume. Find the final temperature and the work done on the gas.

**Given:** $n = 2.00\ \mathrm{mol}$, diatomic so $\gamma = 1.40$; $T_1 = 300\ \mathrm{K}$; $V_2 = V_1/2$

**Solution:**

1. Adiabatic relation: $T_1V_1^{\gamma-1} = T_2V_2^{\gamma-1}$ with $\gamma - 1 = 0.400$
2. $T_2 = T_1(V_1/V_2)^{0.400} = 300(2)^{0.4}$
3. $2^{0.4} = 1.3195$, so $T_2 = 396\ \mathrm{K}$
4. $\Delta U = nC_v\Delta T = (2.00)(2.5)(8.314)(396 - 300) = (2.00)(20.785)(96)$
5. $\Delta U = 3.99\times10^{3}\ \mathrm{J}$; since $Q = 0$, the work done by the gas is $-3.99\ \mathrm{kJ}$, i.e. $3.99\ \mathrm{kJ}$ of work is done **on** the gas

> [!success]- Answer
> **$T_2 = 396\ \mathrm{K}$ (about $400\ \mathrm{K}$); $3.99\ \mathrm{kJ}$ of work is done on the gas.**

> [!warning] Trap
> Assuming an adiabatic compression keeps the temperature constant because no heat enters. Compressing a gas adiabatically raises its temperature — that is why a bicycle pump gets hot — and using $T_2 = T_1$ gives $\Delta U = 0$ and no work at all.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `300×2^0.4` → $T_2$ = **396** K, with $\gamma$ − 1 = 0.400 for a diatomic gas.
> 2. `2.00×2.5×8.314×(396−300)` → $\Delta U$ = **3991** J ≈ **3.99** kJ; since $Q$ = 0 that is also the work done on the gas.

### P4. An ideal gas in an insulated rigid container is allowed to expand freely into an evacuated half of the container, tripling its volume. Find $Q$, $W$, $\Delta U$ and the final temperature if the initial temperature was $300\ \mathrm{K}$.

**Given:** insulated, rigid, ideal gas; $T_1 = 300\ \mathrm{K}$; $V_2 = 3V_1$

**Solution:**

1. Insulated means no heat transfer: $Q = 0$
2. Expanding into a vacuum means no resisting pressure, so $P_{ext} = 0$ and $W = 0$
3. First law: $\Delta U = Q - W = 0$
4. For an ideal gas $U$ depends only on $T$, so $\Delta T = 0$ and $T_2 = 300\ \mathrm{K}$

> [!success]- Answer
> **$Q = W = \Delta U = 0$ and $T_2 = 300\ \mathrm{K}$.**

> [!warning] Trap
> Computing $W = P\Delta V$ with the gas's own initial pressure. Free expansion does no work because there is nothing to push against; using $P_1\Delta V$ invents about $2P_1V_1 = 2nRT$ of work and forces a contradictory temperature drop.

## Traps & Exam Notes

- **Mixing work sign conventions mid-problem.** $\Delta U = Q - W$ and $\Delta U = Q + W$ differ by a factor of $-1$ on every work term. An adiabatic compression computed with the wrong convention gives $-3.99\ \mathrm{kJ}$ of 'work by the gas', which would mean the gas cooled while being squeezed.
- **Using degrees Celsius in a gas law.** $PV = nRT$ and $C_v\Delta T$ need kelvin. Substituting $T = 27$ instead of $300$ understates every energy by a factor of about 11.
- **Thinking $\Delta U = 0$ means $U = 0$.** In an isothermal process the internal energy *change* is zero, not the internal energy. The gas still holds $\frac{3}{2}nRT$ of it.
- **Ignoring the $P\Delta V$ term under constant pressure.** $Q = nC_v\Delta T$ is valid only at constant volume; at constant pressure the gas also does work, and $Q$ is larger by the factor $\gamma$.
- **Calling every adiabatic process isothermal.** Only *free* expansion is both adiabatic and isothermal. A reversible adiabatic expansion cools the gas sharply — for a diatomic gas, doubling the volume drops the temperature to about $227\ \mathrm{K}$.
- **Using $\gamma = 1.67$ for air.** Air is diatomic, $\gamma = 1.40$. Using the monatomic value raises $T_2$ in an adiabatic process by tens of kelvin.
- **Mixing R's units.** $R = 8.314\ \mathrm{J/(mol\cdot K)}$ requires pascals and cubic metres; $R = 0.0821\ \mathrm{L\cdot atm/(mol\cdot K)}$ requires litres and atmospheres. Pairing 8.314 with litres gives work too small by $10^{3}$.

## See Also

- [[09_Thermal_Expansion_and_Calorimetry]]
- [[10_Heat_Transfer]]
- [[12_Second_Law,_Entropy_and_Carnot]]
- [[03_Work,_Energy_and_Conservation]]
- [[_MOC_University_Physics]]

---

[[10_Heat_Transfer|⬅ 10]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Second_Law,_Entropy_and_Carnot|12 ➡]]
