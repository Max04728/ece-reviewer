---
id: GEAS-01-04
title: "Mole Concept and Stoichiometry"
part: "03_GEAS"
area: "01_General_Chemistry"
topic: 4
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Atomic_Structure_and_Configurations]]"]
tags: ["ece", "geas", "general_chemistry"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Mole Concept and Stoichiometry

> [!abstract] Scope
> Convert between mass, moles, particles, gas volume and solution volume, then carry a mole ratio through a balanced equation to the units the question asks for.

## Core Concept

> [!tip] Intuition
> The mole is the exchange rate that lets a balance and a particle count talk to each other. Every stoichiometry problem is the same three-legged bridge: convert in, apply the mole ratio, convert out.

**What the mole actually is.** A mole is $6.022\times10^{23}$ entities — atoms, molecules, ions, electrons, formula units. That number is not arbitrary: it is the count that makes the numeric value of an atomic mass in u equal to the mass of one mole in grams. The bridge is worth writing once and remembering forever:
$$N_A \times 1\ \mathrm{u} = 1.000\ \mathrm{g/mol}$$
So carbon's 12.011 u becomes $12.011\ \mathrm{g/mol}$, and the periodic table doubles as a molar-mass table with no conversion factor needed.

**The four ways to state an amount, and the bridge between them.** An amount of substance can be handed to you as a mass ($n = m/M$), a particle count ($n = N/N_A$), a gas volume ($n = V/22.4\ \mathrm{L\,mol^{-1}}$ at STP, or $n = PV/RT$ otherwise), or a solution ($n = MV$, with $V$ in litres). Every board stoichiometry problem starts by converting whatever it gave you into moles, and ends by converting moles back into whatever unit it asked for. Write the unit with every number — $\mathrm{g} \div (\mathrm{g/mol}) = \mathrm{mol}$ is the check that rejects the wrong operation before any arithmetic happens.

**Balance before you ratio.** Mass is conserved in a reaction; moles are not. The coefficients of a balanced equation give the mole ratio, and nothing else does. Balance in a fixed order — metals, then nonmetals, then hydrogen, then oxygen last — and treat polyatomic ions that survive the reaction ($\mathrm{NO_3^-}$, $\mathrm{SO_4^{2-}}$, $\mathrm{PO_4^{3-}}$) as single units. An unbalanced equation does not throw an error; it silently supplies the wrong ratio and produces a plausible-looking wrong answer, which is why every worked solution should start by writing and checking the balance.

**Empirical to molecular formula.** From mass percent: take a 100.0 g sample so the percentages become grams, divide each mass by its atomic mass to get moles, divide every mole value by the smallest, and multiply the whole ratio until each number is a near-integer (1 : 1.5 becomes 2 : 3). That ratio is the empirical formula. The molecular formula is $(\mathrm{empirical})_n$ with $n = M_{\mathrm{molar}}/M_{\mathrm{empirical}}$, an integer. Percent composition runs the same machinery in reverse and is the fastest way to identify an unknown salt on a multiple-choice item.

**Where the method breaks.** The molar volume $22.4\ \mathrm{L/mol}$ holds only at $0\ ^\circ\mathrm{C}$ and $1\ \mathrm{atm}$; at the far more common lab condition of $25\ ^\circ\mathrm{C}$ and $1\ \mathrm{atm}$ it is $24.5\ \mathrm{L/mol}$, and at $1\ \mathrm{bar}$ the IUPAC value is $22.7\ \mathrm{L/mol}$. Any gas problem that states its own temperature and pressure wants $PV = nRT$, not a memorised volume. The same discipline applies to solutions: $M = \mathrm{mol/L}$ of finished solution, so 'dissolve in 250 mL of water' and 'dilute to 250 mL' are different concentrations. And the mole ratio is only as good as the balance of the equation it came from.

## Derivation

**Why the molar mass equals the atomic mass in grams.** $1\ \mathrm{u} = 1.6605\times10^{-27}\ \mathrm{kg}$, so one mole of u is $N_A \times 1\ \mathrm{u} = (6.022\times10^{23})(1.6605\times10^{-27}\ \mathrm{kg}) = 1.000\times10^{-3}\ \mathrm{kg} = 1.000\ \mathrm{g}$. Therefore the number on the periodic table serves as both the mass of one atom in u and the mass of one mole in g/mol, and no conversion factor is needed.

**Why the molar volume at STP is 22.4 L.** Take exactly one mole of an ideal gas at $T = 273.15\ \mathrm{K}$ and $P = 1.00\ \mathrm{atm}$ and apply the ideal gas law: $V = nRT/P = (1)(0.08206)(273.15)/(1.00) = 22.41\ \mathrm{L}$. The value is therefore a property of the chosen STP definition, not a constant of nature — at $25\ ^\circ\mathrm{C}$ the same calculation gives $24.5\ \mathrm{L}$.

**The mass-to-mass chain, and why it works.** For $a\mathrm{A} \to b\mathrm{B}$: $m_A \div M_A = n_A$; $n_A \times (b/a) = n_B$; $n_B \times M_B = m_B$. The coefficients enter at exactly one point, and the molar masses enter at exactly two, so a dimensional check at each arrow localises any error. Writing the whole chain as one expression, $m_B = m_A\,(M_B/M_A)(b/a)$, also shows that the ratio $M_B/M_A$ — not the individual masses — sets the scale.

**Empirical formula from mass percent.** With a 100.0 g basis the percentages become grams directly. Dividing each mass by its atomic mass converts to moles; dividing all mole values by the smallest normalises the ratio; and multiplying by the smallest integer that clears any residual fraction (for instance 1.00 : 1.50 : 1.00 becomes 2 : 3 : 2) produces integer subscripts. The normalising step is what distinguishes an empirical formula from a raw mole ratio.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Moles from mass | $n = \frac{m}{M}$ | M in g/mol, m in g. Dividing the other way is the most common single error in the topic. |
| Moles from particle count | $n = \frac{N}{N_A}, \quad N_A = 6.022\times10^{23}\ \mathrm{mol^{-1}}$ | N is a count of formula units unless the question says atoms; for atoms apply the total subscript sum first. |
| Molar mass of a compound | $M = \sum_i (\mathrm{subscript}_i \times \mathrm{atomic\ mass}_i)$ | Every atom in the formula counts, including those inside bracketed groups such as (NH4)2SO4. |
| Moles in solution | $n = MV$ | V in LITRES. Molarity is mol per litre of solution. Leaving V in mL inflates n by 1000x. |
| Molar volume at STP | $V_m = 22.4\ \mathrm{L/mol}\ \mathrm{at\ } 0\ ^\circ\mathrm{C},\ 1\ \mathrm{atm}$ | For an ideal gas only. At 25 C and 1 atm it is 24.5 L/mol; use PV = nRT whenever T or P is given. |
| Ideal gas law | $PV = nRT, \quad R = 0.08206\ \mathrm{L\,atm\,mol^{-1}K^{-1}}$ | R's value is tied to the pressure and volume units: 8.314 J/(mol K) needs Pa and m3, 62.36 needs mmHg and L. |
| Mass-to-mass stoichiometry | $m_B = m_A \times \frac{1}{M_A} \times \frac{b}{a} \times M_B$ | For aA -> bB. The coefficient ratio is always target-over-given; inverting it inverts the answer. |
| Percent composition | $\%\,\mathrm{X} = \frac{\mathrm{mass\ of\ X\ in\ 1\ mol}}{M_{\mathrm{compound}}} \times 100$ | Numerator is (subscript of X) x (atomic mass of X), not a single atomic mass. |
| Empirical formula from percent | $n_i = \frac{\%_i}{A_i}, \quad \mathrm{then\ divide\ all\ by\ the\ smallest\ } n_i$ | Residual fractions near 0.5 or 0.33 mean the whole ratio must be multiplied out to integers. |
| Molecular from empirical | $n = \frac{M_{\mathrm{molar}}}{M_{\mathrm{empirical}}}, \quad \mathrm{molecular} = (\mathrm{empirical})_n$ | n must come out an integer. A value like 5.9 means the empirical formula or the molar mass is wrong. |

## Worked Problems

### P1. How many moles are in $25.0\ \mathrm{g}$ of $\mathrm{CaCO_3}$? ($M = 100.09\ \mathrm{g/mol}$)

**Given:** m = 25.0 g CaCO3; M = 100.09 g/mol

**Solution:**

1. $n = m/M$
2. $= 25.0\ \mathrm{g} \div 100.09\ \mathrm{g/mol}$
3. $= 0.2498\ \mathrm{mol}$

> [!success]- Answer
> **$0.250\ \mathrm{mol}$ of $\mathrm{CaCO_3}$.**

> [!warning] Trap
> Multiplying instead of dividing. Molar mass carries the units g/mol, so g divided by g/mol gives mol; writing the units down rejects the wrong operation immediately.

### P2. How many formula units are in $0.250\ \mathrm{mol}$ of $\mathrm{CaCO_3}$, and how many oxygen atoms?

**Given:** n = 0.250 mol; N_A = 6.022×10²³ mol⁻¹

**Solution:**

1. $N = n N_A = (0.250)(6.022\times10^{23})$
2. $= 1.506\times10^{23}$ formula units
3. Each formula unit contains 3 oxygen atoms: $3 \times 1.506\times10^{23} = 4.52\times10^{23}$

> [!success]- Answer
> **$1.51\times10^{23}$ formula units and $4.52\times10^{23}$ oxygen atoms.**

> [!warning] Trap
> Reporting $1.51\times10^{23}$ for the oxygen atoms too. The question says atoms, so the subscript 3 must be applied — a one-line omission that changes the answer by a factor of three.

### P3. What volume does $8.00\ \mathrm{g}$ of $\mathrm{O_2}$ occupy at STP ($0\ ^\circ\mathrm{C}$, $1\ \mathrm{atm}$)?

**Given:** m = 8.00 g O2; M = 32.00 g/mol; molar volume at STP = 22.4 L/mol

**Solution:**

1. $n = 8.00/32.00 = 0.250\ \mathrm{mol}$
2. $V = n \times 22.4\ \mathrm{L/mol} = (0.250)(22.4)$
3. $= 5.60\ \mathrm{L}$

> [!success]- Answer
> **$5.60\ \mathrm{L}$ at STP.**

> [!warning] Trap
> Using 22.4 L/mol at room temperature. At 25 °C and 1 atm the molar volume is 24.5 L/mol, so the same 0.250 mol would fill 6.13 L — a 9% error that still looks like a reasonable answer.

### P4. Find the mass percent of nitrogen in ammonium nitrate, $\mathrm{NH_4NO_3}$. Use $M = 80.04\ \mathrm{g/mol}$ and $A(\mathrm{N}) = 14.01$.

**Given:** M(NH4NO3) = 80.04 g/mol; A(N) = 14.01 g/mol; two N atoms per formula unit

**Solution:**

1. Nitrogen per mole of compound: $2 \times 14.01 = 28.02\ \mathrm{g}$
2. $\%\mathrm{N} = (28.02/80.04) \times 100$
3. $= 35.01\%$

> [!success]- Answer
> **$35.0\%$ nitrogen by mass.**

> [!warning] Trap
> Using $14.01/80.04 = 17.5\%$ because the formula writes nitrogen twice as two separate groups. Every atom in the formula counts: subscript times coefficient for each element.

### P5. A compound is $40.0\%$ C, $6.71\%$ H and $53.3\%$ O by mass. Find its empirical formula. ($A$: C 12.01, H 1.008, O 16.00)

**Given:** %C = 40.0, %H = 6.71, %O = 53.3; A(C) = 12.01, A(H) = 1.008, A(O) = 16.00

**Solution:**

1. Take a 100.0 g basis: 40.0 g C, 6.71 g H, 53.3 g O
2. Moles: C 40.0/12.01 = 3.33; H 6.71/1.008 = 6.66; O 53.3/16.00 = 3.33
3. Divide each by the smallest (3.33): C 1.00, H 2.00, O 1.00
4. Empirical formula = $\mathrm{CH_2O}$, empirical mass $= 12.01 + 2(1.008) + 16.00 = 30.03\ \mathrm{g/mol}$

> [!success]- Answer
> **$\mathrm{CH_2O}$.**

> [!warning] Trap
> Stopping at the raw mole ratio 3.33 : 6.66 : 3.33 and reporting $\mathrm{C_3H_7O_3}$. The ratio must be normalised by dividing through by the smallest value.

### P6. The empirical formula of a sugar is $\mathrm{CH_2O}$ and its molar mass is $180.2\ \mathrm{g/mol}$. Find its molecular formula.

**Given:** empirical formula CH2O; empirical mass = 30.03 g/mol; M = 180.2 g/mol

**Solution:**

1. $n = M_{\mathrm{molar}}/M_{\mathrm{empirical}} = 180.2/30.03$
2. $n = 6.00$
3. Multiply every subscript by 6: $(\mathrm{CH_2O})_6 = \mathrm{C_6H_{12}O_6}$

> [!success]- Answer
> **$\mathrm{C_6H_{12}O_6}$ (glucose).**

> [!warning] Trap
> Dividing by the atomic mass of carbon (12.01) instead of the empirical formula mass (30.03), which returns n = 15 and a formula with no chemical meaning.

### P7. How many grams of Al are needed to produce $51.0\ \mathrm{g}$ of $\mathrm{Al_2O_3}$ by $4\mathrm{Al} + 3\mathrm{O_2} \to 2\mathrm{Al_2O_3}$? ($M$: Al 26.98, $\mathrm{Al_2O_3}$ 101.96 g/mol)

**Given:** m(Al2O3) = 51.0 g; M(Al2O3) = 101.96 g/mol; M(Al) = 26.98 g/mol; equation 4Al + 3O2 -> 2Al2O3

**Solution:**

1. Balance check: 4 Al, 6 O on each side — already balanced
2. $n(\mathrm{Al_2O_3}) = 51.0/101.96 = 0.5002\ \mathrm{mol}$
3. Mole ratio Al : Al2O3 = 4 : 2, so $n(\mathrm{Al}) = 0.5002 \times (4/2) = 1.0004\ \mathrm{mol}$
4. $m(\mathrm{Al}) = 1.0004 \times 26.98 = 26.99\ \mathrm{g}$

> [!success]- Answer
> **$27.0\ \mathrm{g}$ of Al.**

> [!warning] Trap
> Using the ratio 2 : 4 upside down, which gives 0.2501 mol and 6.75 g. Write the ratio as 'coefficient of target over coefficient of given' and include the units before substituting.

### P8. What volume of $\mathrm{CO_2}$ measured at $25\ ^\circ\mathrm{C}$ and $1.00\ \mathrm{atm}$ is produced by the complete combustion of $1.00\ \mathrm{mol}$ of propane? $\mathrm{C_3H_8} + 5\mathrm{O_2} \to 3\mathrm{CO_2} + 4\mathrm{H_2O}$

**Given:** n(C3H8) = 1.00 mol; T = 298 K, P = 1.00 atm; R = 0.08206 L·atm/(mol·K)

**Solution:**

1. From the balanced equation, 1 mol C3H8 gives 3 mol CO2, so $n(\mathrm{CO_2}) = 3.00\ \mathrm{mol}$
2. $V = nRT/P = (3.00)(0.08206)(298)/(1.00)$
3. $RT$ at 298 K $= 24.45\ \mathrm{L/mol}$, so $V = 3.00 \times 24.45 = 73.4\ \mathrm{L}$

> [!success]- Answer
> **$73.4\ \mathrm{L}$ of $\mathrm{CO_2}$.**

> [!warning] Trap
> Multiplying by 22.4 L/mol because 'it is a gas'. 22.4 applies only at 0 °C and 1 atm; at 25 °C the answer would come out 67.2 L, about 8% low, with no other symptom.

### P9. What volume of $0.250\ \mathrm{M}\ \mathrm{BaCl_2}$ is needed to react completely with $25.0\ \mathrm{mL}$ of $0.400\ \mathrm{M}\ \mathrm{AgNO_3}$? $\mathrm{BaCl_2} + 2\mathrm{AgNO_3} \to 2\mathrm{AgCl} + \mathrm{Ba(NO_3)_2}$

**Given:** V(AgNO3) = 25.0 mL; M(AgNO3) = 0.400 M; M(BaCl2) = 0.250 M

**Solution:**

1. Convert the volume: $25.0\ \mathrm{mL} = 0.0250\ \mathrm{L}$
2. $n(\mathrm{AgNO_3}) = MV = (0.400)(0.0250) = 0.0100\ \mathrm{mol}$
3. Ratio BaCl2 : AgNO3 = 1 : 2, so $n(\mathrm{BaCl_2}) = 0.0100/2 = 0.00500\ \mathrm{mol}$
4. $V = n/M = 0.00500/0.250 = 0.0200\ \mathrm{L} = 20.0\ \mathrm{mL}$

> [!success]- Answer
> **$20.0\ \mathrm{mL}$ of $0.250\ \mathrm{M}\ \mathrm{BaCl_2}$.**

> [!warning] Trap
> Leaving the volume in mL and computing $0.400 \times 25.0 = 10.0$ 'mol', which is 1000x too large. Molarity is moles per LITRE, so every volume must be converted before multiplying.

### P10. Find the mass of one molecule of water, and the number of hydrogen atoms in $18.0\ \mathrm{g}$ of water. ($M = 18.02\ \mathrm{g/mol}$)

**Given:** M(H2O) = 18.02 g/mol; N_A = 6.022×10²³ mol⁻¹; m = 18.0 g

**Solution:**

1. Mass of one molecule $= M/N_A = 18.02/(6.022\times10^{23}) = 2.99\times10^{-23}\ \mathrm{g}$
2. $n(\mathrm{H_2O}) = 18.0/18.02 = 0.999\ \mathrm{mol}$
3. Each molecule has 2 H, so $n(\mathrm{H}) = 2 \times 0.999 = 1.998\ \mathrm{mol}$
4. $N(\mathrm{H}) = 1.998 \times 6.022\times10^{23} = 1.20\times10^{24}$ atoms

> [!success]- Answer
> **$2.99\times10^{-23}\ \mathrm{g}$ per molecule and $1.20\times10^{24}$ hydrogen atoms.**

> [!warning] Trap
> Answering $6.02\times10^{23}$ hydrogen atoms from 'one mole of water'. An atom count must include the subscript: one mole of water holds 2 mol H and 1 mol O.

## Traps & Exam Notes

- **Using 22.4 L/mol outside STP.** The molar volume is 22.4 L/mol only at 0 °C and 1 atm; at 25 °C and 1 atm it is 24.5 L/mol. Substituting it at room temperature makes every gas volume about 9% low, which is small enough to pass unnoticed.
- **Treating a mole ratio as a mass ratio.** The coefficients of $4\mathrm{Al} + 3\mathrm{O_2} \to 2\mathrm{Al_2O_3}$ mean 4 mol : 3 mol : 2 mol, never 4 g : 3 g : 2 g. Grams must be converted to moles before any ratio is applied.
- **Using the ratio from an unbalanced equation.** In $\mathrm{H_2} + \mathrm{O_2} \to \mathrm{H_2O}$ the unbalanced coefficients suggest a 1 : 1 H2 : H2O ratio, but the balanced 2 : 1 : 2 is correct. An unbalanced equation throws no error — it just returns a wrong answer.
- **Inverting the mole ratio.** Always convert with (coefficient of the target) / (coefficient of the given). Writing it the other way is the single most common stoichiometry error and produces a self-consistent but wrong solution.
- **Counting formula units when the question asks for atoms.** One mole of $\mathrm{Na_2SO_4}$ is $6.022\times10^{23}$ formula units but $7 \times 6.022\times10^{23}$ atoms; the word 'atoms' means applying the total subscript sum.
- **Leaving solution volumes in mL.** $M = \mathrm{mol/L}$, so 25.0 mL must become 0.0250 L. Using 25.0 inflates the mole count 1000-fold, which usually produces an absurd mass with no other warning.
- **Rounding an empirical ratio too early.** A ratio of 1.00 : 1.49 : 1.00 is 2 : 3 : 2, not 1 : 1 : 1. If the value is off an integer by more than about 0.05, multiply the whole ratio until every entry is near-integral.
- **Confusing the mass of one molecule with the molar mass.** $\mathrm{H_2O}$ is 18.02 u per molecule and 18.02 g per mole. Mixing the two scales produces an answer that is either $N_A$ times too small or too large.

## See Also

- [[05_Limiting_Reagents_and_Yield]]
- [[06_Solutions_and_Concentration_Units]]
- [[07_Chemical_Equilibrium_and_Le_Chatelier]]
- [[03_Chemical_Bonding]]

---

[[03_Chemical_Bonding|⬅ 03]] · [[_MOC_General_Chemistry|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Limiting_Reagents_and_Yield|05 ➡]]
