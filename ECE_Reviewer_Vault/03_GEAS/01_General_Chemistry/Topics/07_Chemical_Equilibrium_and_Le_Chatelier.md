---
id: GEAS-01-07
title: "Chemical Equilibrium and Le Chatelier"
part: "03_GEAS"
area: "01_General_Chemistry"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Mole_Concept_and_Stoichiometry]]", "[[06_Solutions_and_Concentration_Units]]"]
tags: ["ece", "geas", "general_chemistry"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Chemical Equilibrium and Le Chatelier

> [!abstract] Scope
> Write the equilibrium expression for a reaction, decide which way a disturbed system shifts, and solve for the composition that results.

## Core Concept

> [!tip] Intuition
> Equilibrium is not 'the reaction stopped' — it is the point where the forward and reverse rates match so the concentrations stop changing. The quotient $Q$ is a snapshot of the current ratio; comparing it with $K$ tells you which way the system must move to reach equilibrium.

**Equilibrium is dynamic, and $K$ is a ratio.** At equilibrium both reactions are still running at equal rates, so the macroscopic composition is static while the molecular traffic is not. The equilibrium constant is products over reactants, each raised to its balanced coefficient, with pure solids and pure liquids omitted because their activities are 1. That omission is not a convention you can skip: for $\mathrm{CaCO_3}(s) \rightleftharpoons \mathrm{CaO}(s) + \mathrm{CO_2}(g)$ the constant is simply $K_p = P_{\mathrm{CO_2}}$, and writing $1/[\mathrm{CaCO_3}]$ makes the expression unsolvable.

**$K_c$ and $K_p$ differ by a pressure correction.** $K_p = K_c(RT)^{\Delta n}$ with $\Delta n$ the change in moles of GAS across the balanced equation, products minus reactants, and $R = 0.08206\ \mathrm{L\,atm\,mol^{-1}K^{-1}}$ when $K_p$ is in atmospheres. For ammonia synthesis $\Delta n = 2 - 4 = -2$, so $K_p$ is much smaller than $K_c$. Reversing the sign of $\Delta n$ inflates the answer by $(RT)^4$, which at 500 K is a factor of about $2.8\times10^6$ — large enough that the wrong sign is obvious once you sanity-check the magnitude.

**$Q$ versus $K$: the only reliable direction test.** The reaction quotient uses the same expression with the CURRENT concentrations. If $Q < K$ the reaction proceeds forward, if $Q > K$ it proceeds in reverse, and at $Q = K$ it is at equilibrium. The critical asymmetry: $Q$ changes continuously as the reaction proceeds, while $K$ changes only with temperature. Adding reactant, changing the volume or adding a catalyst does not touch $K$ — only the position of equilibrium, which is a $Q$-versus-$K$ statement.

**ICE tables are bookkeeping, not chemistry.** Write initial concentrations, the change in terms of a single extent $x$ scaled by the coefficients, and the equilibrium row as their sum. Substitute the equilibrium row into $K$ and solve. When the algebra is a perfect square (as in $\mathrm{H_2}+\mathrm{I_2}\rightleftharpoons2\mathrm{HI}$ starting from equal concentrations) take the square root instead of expanding a quadratic. When it is not, either solve the quadratic or use the small-$x$ approximation $x \approx \sqrt{KC}$ — but only after checking that $x/C$ is under 5%, because dropping $x$ from the denominator when ionisation is 30% produces an error larger than the quantity being measured.

**Le Chatelier as a set of four reflexes.** Adding or removing a substance shifts the system away from the change. Changing the pressure by changing the volume shifts toward the side with fewer gas moles, and does nothing at all if $\Delta n_{gas} = 0$. Adding an inert gas at constant volume does nothing; at constant pressure it dilutes the reactants and shifts toward more gas moles. Changing the temperature is the only disturbance that changes $K$ itself: heating favours the endothermic direction, so for an exothermic forward reaction $K$ falls on heating. A catalyst changes neither $K$ nor the position — only the time taken to get there.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Equilibrium constant | $K = \frac{[C]^c[D]^d}{[A]^a[B]^b}$ | Products over reactants, each to its coefficient. Pure solids and pure liquids are omitted entirely. |
| K_p from K_c | $K_p = K_c(RT)^{\Delta n}, \quad \Delta n = n_{gas,prod} - n_{gas,react}$ | R = 0.08206 L atm/(mol K) with K_p in atm. Gas moles only; a pure liquid or solid does not enter Delta-n. |
| Reaction quotient | $Q \mathrm{\ uses\ the\ same\ expression\ as\ } K \mathrm{\ with\ current\ concentrations}$ | Q < K goes forward, Q > K goes reverse, Q = K is equilibrium. Q is not a constant. |
| Reciprocal and multiple rules | $K_{reversed} = 1/K, \quad K_{doubled} = K^2$ | Reversing an equation inverts K; multiplying every coefficient by n raises K to the n. Adding reactions multiplies their K values. |
| ICE table rows | $[A]_{eq} = [A]_0 - ax, \quad [C]_{eq} = [C]_0 + cx$ | x is an extent in mol/L. The coefficients MULTIPLY x; they become exponents only inside the K expression. |
| Small-x approximation | $x \approx \sqrt{K C} \ \mathrm{valid\ while\ } x/C < 5\%$ | Always check the ratio. Above 5% solve x^2 + Kx - KC = 0 instead of accepting a biased answer. |
| Degree of dissociation | $\alpha = \frac{\mathrm{moles\ dissociated}}{\mathrm{moles\ initial}}$ | Often quoted as a percentage. It enters the ICE table as the extent for PCl5-style decomposition problems. |
| Le Chatelier volume rule | $V \downarrow \Rightarrow \mathrm{shift\ toward\ fewer\ gas\ moles}$ | Only when Delta-n(gas) is not zero. An inert gas at CONSTANT VOLUME causes no shift at all. |

## Worked Problems

### P1. For $\mathrm{N_2}(g) + 3\mathrm{H_2}(g) \rightleftharpoons 2\mathrm{NH_3}(g)$, $K_c = 0.500$ at $500\ \mathrm{K}$. Find $K_p$.

**Given:** K_c = 0.500 at 500 K; R = 0.08206 L·atm/(mol·K)

**Solution:**

1. $\Delta n = 2 - (1+3) = -2$
2. $RT = (0.08206)(500) = 41.03$
3. $K_p = K_c(RT)^{\Delta n} = 0.500 \times (41.03)^{-2}$
4. $= 0.500/1683.5 = 2.97\times10^{-4}$

> [!success]- Answer
> **$K_p = 2.97\times10^{-4}$ (in $\mathrm{atm^{-2}}$).**

> [!warning] Trap
> Writing $(RT)^{+2}$ because 'there are two product moles'. Delta-n is gas products minus gas reactants, which is −2 here, so the correction divides rather than multiplies.

### P2. $\mathrm{H_2}(g) + \mathrm{I_2}(g) \rightleftharpoons 2\mathrm{HI}(g)$ has $K_c = 50.5$ at $448\ ^\circ\mathrm{C}$. Starting from $1.00\ \mathrm{M}$ of each reactant and no HI, find all equilibrium concentrations.

**Given:** K_c = 50.5; [H2]0 = [I2]0 = 1.00 M; [HI]0 = 0

**Solution:**

1. ICE: H2 and I2 each lose x, HI gains 2x
2. $K = (2x)^2/((1.00-x)(1.00-x)) = 50.5$
3. Take the square root of both sides: $2x/(1.00-x) = 7.106$
4. $2x = 7.106 - 7.106x$, so $9.106x = 7.106$ and $x = 0.780$
5. $[\mathrm{HI}] = 2x = 1.56\ \mathrm{M}$; $[\mathrm{H_2}] = [\mathrm{I_2}] = 1.00 - 0.780 = 0.220\ \mathrm{M}$

> [!success]- Answer
> **$[\mathrm{HI}] = 1.56\ \mathrm{M}$ and $[\mathrm{H_2}] = [\mathrm{I_2}] = 0.220\ \mathrm{M}$.**

> [!warning] Trap
> Writing the numerator as $x^2$ instead of $(2x)^2$. The coefficient 2 multiplies x in the ICE row AND becomes an exponent in K — it does both, and forgetting either one gives a wrong x.

### P3. $1.00\ \mathrm{mol}$ of $\mathrm{PCl_5}$ is placed in a $2.00\ \mathrm{L}$ flask and decomposes: $\mathrm{PCl_5} \rightleftharpoons \mathrm{PCl_3} + \mathrm{Cl_2}$. At equilibrium $0.200\ \mathrm{mol}$ of $\mathrm{Cl_2}$ is present. Find $K_c$.

**Given:** n0(PCl5) = 1.00 mol; V = 2.00 L; n_eq(Cl2) = 0.200 mol

**Solution:**

1. Initial concentration: $[\mathrm{PCl_5}]_0 = 1.00/2.00 = 0.500\ \mathrm{M}$
2. From the 1:1:1 stoichiometry, $[\mathrm{Cl_2}] = [\mathrm{PCl_3}] = 0.200/2.00 = 0.100\ \mathrm{M}$
3. $[\mathrm{PCl_5}]_{eq} = 0.500 - 0.100 = 0.400\ \mathrm{M}$
4. $K_c = (0.100)(0.100)/0.400 = 0.0250$

> [!success]- Answer
> **$K_c = 0.0250$.**

> [!warning] Trap
> Substituting moles (0.200, 0.200, 0.800) instead of molarities. K_c is defined on concentrations, so using moles silently changes the value whenever the volume is not 1 L — here it would give 0.0500.

### P4. For $2\mathrm{SO_2}(g) + \mathrm{O_2}(g) \rightleftharpoons 2\mathrm{SO_3}(g)$ at equilibrium, state the direction of shift when (a) $\mathrm{O_2}$ is added, (b) the volume is halved, (c) the temperature is raised ($\Delta H^\circ = -198\ \mathrm{kJ/mol}$ for the forward reaction), (d) a catalyst is added.

**Given:** Delta-n(gas) = 2 - 3 = -1; forward reaction is exothermic

**Solution:**

1. (a) Adding $\mathrm{O_2}$ raises a reactant concentration, so $Q < K$ → shifts right, producing more $\mathrm{SO_3}$
2. (b) Halving the volume raises every partial pressure; the system relieves this by moving to the side with fewer gas moles → right, since $\Delta n = -1$
3. (c) The forward reaction is exothermic, so heating favours the endothermic reverse → shifts left and $K$ decreases
4. (d) A catalyst lowers the activation energy of both directions equally → no shift, equilibrium is simply reached sooner

> [!success]- Answer
> **(a) right; (b) right; (c) left, with $K$ falling; (d) no shift.**

> [!warning] Trap
> Answering (c) with 'right, because heating speeds the reaction up'. Temperature is the one disturbance that changes K; concentration and volume changes only move Q toward the same K.

### P5. For $\mathrm{CO}(g) + \mathrm{H_2O}(g) \rightleftharpoons \mathrm{CO_2}(g) + \mathrm{H_2}(g)$ with $K_c = 4.00$ at the working temperature, a vessel holds $[\mathrm{CO}] = [\mathrm{H_2O}] = 0.500\ \mathrm{M}$ and $[\mathrm{CO_2}] = [\mathrm{H_2}] = 1.50\ \mathrm{M}$. Which way does the reaction proceed?

**Given:** K_c = 4.00; [CO] = [H2O] = 0.500 M; [CO2] = [H2] = 1.50 M

**Solution:**

1. $Q = \dfrac{(1.50)(1.50)}{(0.500)(0.500)} = \dfrac{2.25}{0.250}$
2. $Q = 9.00$
3. $Q > K$ (9.00 > 4.00), so the reverse reaction is favoured

> [!success]- Answer
> **It shifts left, toward $\mathrm{CO}$ and $\mathrm{H_2O}$, until $Q$ falls to 4.00.**

> [!warning] Trap
> Comparing 1.50 with 0.500 and declaring the forward direction 'because the products are larger'. Only the ratio Q against K decides; large product concentrations are perfectly consistent with equilibrium when K is large.

## Traps & Exam Notes

- **Putting the coefficient on the wrong side of K.** For $\mathrm{H_2}+\mathrm{I_2}\rightleftharpoons2\mathrm{HI}$ the expression is $[\mathrm{HI}]^2/([\mathrm{H_2}][\mathrm{I_2}])$. Attaching the 2 to a reactant inverts the expression and squares the wrong term.
- **Including pure solids or pure liquids in K.** For $\mathrm{CaCO_3}(s)\rightleftharpoons\mathrm{CaO}(s)+\mathrm{CO_2}(g)$ the constant is $K_p = P_{\mathrm{CO_2}}$ alone. Writing $1/[\mathrm{CaCO_3}]$ makes the expression unsolvable and the problem unanswerable.
- **Using the wrong sign for Delta-n in $K_p = K_c(RT)^{\Delta n}$.** Ammonia synthesis has $\Delta n = -2$, so $K_p < K_c$. Using +2 inflates $K_p$ by $(RT)^4$, roughly $2.8\times10^6$ at 500 K — wrong by millions, not by percent.
- **Treating Q as if it were K.** Q changes continuously and equals K only at equilibrium; K changes only with temperature. Concentration changes, volume changes and catalysts move Q or the rate, never K.
- **Assuming a volume change always shifts the equilibrium.** If $\Delta n_{gas} = 0$ the position does not move at all, and adding an inert gas at constant volume does nothing even when $\Delta n \neq 0$.
- **Accepting the small-x approximation without the 5% check.** Dropping x from the denominator at 30% ionisation biases the answer by more than the effect being measured, and the resulting K looks entirely reasonable.

## See Also

- [[05_Limiting_Reagents_and_Yield]]
- [[08_pH,_pOH_and_Buffers]]
- [[09_Redox_and_Galvanic_Cells]]

---

[[06_Solutions_and_Concentration_Units|⬅ 06]] · [[_MOC_General_Chemistry|MOC]] · [[00_Dashboard|Dashboard]] · [[08_pH,_pOH_and_Buffers|08 ➡]]
