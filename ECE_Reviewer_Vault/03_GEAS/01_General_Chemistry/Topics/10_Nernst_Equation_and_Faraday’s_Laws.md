---
id: GEAS-01-10
title: "Nernst Equation and Faraday’s Laws"
part: "03_GEAS"
area: "01_General_Chemistry"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_Redox_and_Galvanic_Cells]]", "[[04_Mole_Concept_and_Stoichiometry]]"]
tags: ["ece", "geas", "general_chemistry"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Nernst Equation and Faraday’s Laws

> [!abstract] Scope
> Correct a standard cell voltage for non-standard concentrations, and convert current and time into the mass of metal an electrolysis deposits.

## Core Concept

> [!tip] Intuition
> A cell runs on a concentration gap: the Nernst equation prices that gap in volts, and at zero gap (a dead battery) the voltage is zero. Faraday's laws are the other side of the same coin — charge is a mole count of electrons, and each electron carries a fixed fraction of an atom.

**Why the voltage falls as a cell discharges.** $E^\circ_{cell}$ assumes every soluble species is at 1 M and every gas at 1 atm. Real cells are not standard, and the Nernst equation corrects for it:
$$E = E^\circ - (RT/nF)\ln Q$$
or at $25\ ^\circ\mathrm{C}$ the working form $E = E^\circ - (0.0592/n)\log Q$. As a galvanic cell discharges, the product concentration rises and the reactant concentration falls, so $Q$ grows, the correction grows, and the voltage sags toward zero — which is exactly what a battery meter is reading. Setting $E = 0$ (fully discharged) gives $\log K = nE^\circ/0.0592$, which is how a standard potential is converted into an equilibrium constant.

**Reading and writing Q correctly.** $Q$ takes the same form as $K$: products over reactants, each to its coefficient, with pure solids and liquids omitted entirely. For $\mathrm{Zn}(s) + \mathrm{Cu^{2+}} \to \mathrm{Zn^{2+}} + \mathrm{Cu}(s)$ it is $Q = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}]$ — the metals do not appear. The number of electrons $n$ comes from the BALANCED overall equation, not from one half-reaction. And a 0.0592 that is applied at a temperature other than 25 °C is simply wrong: the coefficient is $2.303RT/F$, which is 0.0592 V only at 298 K and about 0.0615 V at 310 K.

**Concentration cells.** If both electrodes are the same material in the same ion at different concentrations, $E^\circ_{cell} = 0$ and the entire voltage comes from the concentration difference:
$$E = -(0.0592/n)\log([\mathrm{dilute}]/[\mathrm{concentrated}])$$
The concentrated side is the cathode (it gets reduced further), so the spontaneous process dilutes the strong side and concentrates the weak one until they match — at which point the voltage is zero. A tenfold ratio gives 0.0592/n volts, which is a useful mental benchmark.

**Faraday's laws.** Charge is countable. $Q = It$ in coulombs, one mole of electrons is $F = 96485\ \mathrm{C}$, and $n$ electrons are needed per atom of product, so $m = MIt/(nF)$. The method has exactly three steps: charge from current and time, moles of electrons from charge, moles of substance from the half-reaction — then convert to mass or to time. Two unit traps dominate: time must be in SECONDS (so 30.0 min is 1800 s), and $n$ is the electrons per ion of the substance being deposited, which is 2 for $\mathrm{Cu^{2+}}$, 1 for $\mathrm{Ag^+}$ and 3 for $\mathrm{Al^{3+}}$. If the question supplies the mass and asks for $n$, the same formula rearranges to $n = MIt/(mF)$ and identifies the metal.

**Current efficiency and the practical correction.** Real plating cells lose charge to side reactions such as hydrogen evolution, so the mass actually deposited is less than the Faraday prediction. Current efficiency is $\eta = m_{actual}/m_{theoretical}\times100$, and every Faraday calculation can be run in reverse through it. This is why a question that gives both a current, a time and a final mass is really asking about efficiency rather than about Faraday's law — check whether the mass matches the prediction before deciding which quantity is unknown.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Nernst equation | $E = E^\circ - \frac{RT}{nF}\ln Q$ | R = 8.314 J/(mol K), F = 96485 C/mol, T in kelvin, n from the balanced equation. General form, any temperature. |
| Nernst at 25 °C | $E = E^\circ - \frac{0.0592}{n}\log Q$ | The 0.0592 V is 2.303RT/F evaluated at 298 K only. Using it at another temperature is invalid. |
| Cell reaction quotient | $Q = \frac{[\mathrm{products}]^{\mathrm{coeff}}}{[\mathrm{reactants}]^{\mathrm{coeff}}}$ | Pure solids and pure liquids are omitted. For Zn + Cu2+ the quotient is just [Zn2+]/[Cu2+]. |
| Concentration cell | $E = -\frac{0.0592}{n}\log\frac{[\mathrm{dilute}]}{[\mathrm{concentrated}]}$ | E-nought is zero because both half-reactions are identical. Tenfold ratio gives 0.0592/n volts. |
| Free energy and cell potential | $\Delta G = -nFE, \quad \Delta G = \Delta G^\circ + RT\ln Q$ | At equilibrium E = 0 and Q = K, which links the two expressions. Joules when E is in volts. |
| Equilibrium constant from E-nought | $\log K = \frac{nE^\circ}{0.0592} \mathrm{\ at\ } 25\ ^\circ\mathrm{C}$ | Only for a full cell with a positive E-nought. For Zn/Cu (n = 2, 1.10 V) it gives log K = 37.2, K about 1.4x10^37. |
| Charge from current | $Q = It$ | I in amperes, t in SECONDS. Using minutes makes the mass 60x too small. |
| Faraday's first law | $m = \frac{M I t}{n F}$ | n = electrons per ion: 1 for Ag+, 2 for Cu2+, 3 for Al3+. F = 96485 C/mol. |
| Moles of electrons | $n_{e^-} = \frac{It}{F}$ | Then divide by the ion's charge to get moles of metal. Forgetting the division is a factor of n error. |
| Time required to deposit a mass | $t = \frac{m n F}{M I}$ | Seconds out. Useful when the question fixes the mass and the current and asks how long to run the cell. |
| Current efficiency | $\eta = \frac{m_{actual}}{m_{theoretical}} \times 100$ | Always at most 100%. A higher value means the electrode was weighed wet or the wrong n was used. |

## Worked Problems

### P1. For $\mathrm{Zn}(s) + \mathrm{Cu^{2+}}(aq) \to \mathrm{Zn^{2+}}(aq) + \mathrm{Cu}(s)$ with $E^\circ = 1.10\ \mathrm{V}$, find the cell voltage at $25\ ^\circ\mathrm{C}$ when $[\mathrm{Zn^{2+}}] = 1.00\ \mathrm{M}$ and $[\mathrm{Cu^{2+}}] = 0.0100\ \mathrm{M}$.

**Given:** E° = 1.10 V; [Zn2+] = 1.00 M; [Cu2+] = 0.0100 M; n = 2

**Solution:**

1. $Q = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}] = 1.00/0.0100 = 100$ (the metals are omitted)
2. $E = E^\circ - (0.0592/n)\log Q = 1.10 - (0.0592/2)\log(100)$
3. $= 1.10 - (0.0296)(2)$
4. $= 1.10 - 0.0592 = 1.04\ \mathrm{V}$

> [!success]- Answer
> **$E = 1.04\ \mathrm{V}$, below the standard value because the product ion is in excess.**

> [!warning] Trap
> Writing $Q = [\mathrm{Cu^{2+}}]/[\mathrm{Zn^{2+}}] = 0.0100$ and getting $E = 1.10 + 0.0592 = 1.16\ \mathrm{V}$. Q is products over reactants, and a depleted reactant must make the voltage DROP, not rise.

### P2. A concentration cell is built from two copper electrodes: $\mathrm{Cu}\,|\,\mathrm{Cu^{2+}}(0.0100\ \mathrm{M})\,||\,\mathrm{Cu^{2+}}(1.00\ \mathrm{M})\,|\,\mathrm{Cu}$. Find the cell voltage at $25\ ^\circ\mathrm{C}$ and identify the cathode.

**Given:** dilute side 0.0100 M; concentrated side 1.00 M; n = 2

**Solution:**

1. $E^\circ = 0$ because both half-reactions are the same couple
2. $E = -(0.0592/2)\log(0.0100/1.00)$
3. $= -(0.0296)(-2) = +0.0592\ \mathrm{V}$
4. The spontaneous process reduces $\mathrm{Cu^{2+}}$ on the concentrated side, so that electrode is the cathode

> [!success]- Answer
> **$E = 0.0592\ \mathrm{V}$; the concentrated (1.00 M) electrode is the cathode.**

> [!warning] Trap
> Answering 0 V 'because both electrodes are copper'. The standard potential cancels but the concentration term does not; a concentration cell is the one case where E-nought is zero and E is not.

### P3. How many grams of copper are deposited on the cathode when a current of $2.00\ \mathrm{A}$ passes through $\mathrm{CuSO_4}$ solution for $30.0\ \mathrm{min}$? ($M(\mathrm{Cu}) = 63.55\ \mathrm{g/mol}$)

**Given:** I = 2.00 A; t = 30.0 min; Cu2+ + 2e- -> Cu; F = 96485 C/mol

**Solution:**

1. Convert time: $30.0\ \mathrm{min} = 1800\ \mathrm{s}$
2. $Q = It = (2.00)(1800) = 3600\ \mathrm{C}$
3. $n_{e^-} = 3600/96485 = 0.03731\ \mathrm{mol}$
4. $n(\mathrm{Cu}) = 0.03731/2 = 0.01866\ \mathrm{mol}$
5. $m = 0.01866 \times 63.55 = 1.19\ \mathrm{g}$

> [!success]- Answer
> **$1.19\ \mathrm{g}$ of copper.**

> [!warning] Trap
> Skipping the division by $n = 2$ and reporting 2.37 g, or leaving the time in minutes and reporting 0.0198 g. Both errors are silent — the arithmetic is otherwise correct.

### P4. How long must a $5.00\ \mathrm{A}$ current pass through $\mathrm{AgNO_3}$ solution to deposit $10.0\ \mathrm{g}$ of silver? ($M(\mathrm{Ag}) = 107.87\ \mathrm{g/mol}$)

**Given:** I = 5.00 A; m = 10.0 g Ag; Ag+ + e- -> Ag; F = 96485 C/mol

**Solution:**

1. $n(\mathrm{Ag}) = 10.0/107.87 = 0.09270\ \mathrm{mol}$
2. Silver is monovalent, so $n_{e^-} = 0.09270\ \mathrm{mol}$
3. $Q = n_{e^-}F = (0.09270)(96485) = 8945\ \mathrm{C}$
4. $t = Q/I = 8945/5.00 = 1789\ \mathrm{s}$
5. $= 29.8\ \mathrm{min}$

> [!success]- Answer
> **$1789\ \mathrm{s}$, about $29.8\ \mathrm{min}$.**

> [!warning] Trap
> Multiplying by 2 for silver out of habit from copper problems. Ag+ needs only one electron, so a factor-of-two error here halves the required time to 14.9 min.

### P5. A current of $2.00\ \mathrm{A}$ passing for $1930\ \mathrm{s}$ deposits $1.270\ \mathrm{g}$ of a metal of molar mass $63.55\ \mathrm{g/mol}$. Determine the number of electrons per ion and identify the ion.

**Given:** I = 2.00 A; t = 1930 s; m = 1.270 g; M = 63.55 g/mol

**Solution:**

1. $Q = It = (2.00)(1930) = 3860\ \mathrm{C}$
2. $n_{e^-} = 3860/96485 = 0.04001\ \mathrm{mol}$
3. $n(\mathrm{metal}) = 1.270/63.55 = 0.01998\ \mathrm{mol}$
4. $n = n_{e^-}/n(\mathrm{metal}) = 0.04001/0.01998 = 2.00$

> [!success]- Answer
> **$n = 2$, so the ion is $\mathrm{Cu^{2+}}$ (molar mass 63.55 g/mol).**

> [!warning] Trap
> Dividing the moles of metal by the moles of electrons instead of the other way round gives n = 0.5, and then guessing a monovalent metal. The electrons per ion is always greater than or equal to 1.

## Traps & Exam Notes

- **Using 0.0592 V at a temperature other than 25 °C.** The coefficient is $2.303RT/F$ and rises with temperature (about 0.0615 V at 310 K). Applying 0.0592 at body or process temperature biases every cell voltage in the same direction.
- **Putting n from a half-reaction instead of the balanced equation.** For $\mathrm{MnO_4^-} + 5\mathrm{Fe^{2+}} + 8\mathrm{H^+} \to \ldots$ the electron count is 5, not 1. A wrong n scales the whole logarithmic correction and the Faraday mass alike.
- **Leaving the time in minutes in $Q = It$.** 30.0 min used as 30.0 makes the charge 60x too small and the deposited mass 60x too small; the answer stays numerically tidy, which is why the error survives.
- **Omitting solids and liquids from Q.** For a cell with a solid electrode the metal never appears in $Q$, and including it makes the expression dimensionally meaningless. For $\mathrm{Zn}+\mathrm{Cu^{2+}}$ the quotient is $[\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}]$ alone.
- **Assuming a tenfold concentration ratio means tenfold the voltage.** It means 0.0592/n volts — which is 0.0296 V for a divalent ion. Reading the ratio as a multiplier is a common and large overestimate.
- **Reporting a plating mass without applying current efficiency.** Side reactions such as hydrogen evolution consume charge, so the deposited mass is always below the Faraday prediction. If the question gives a measured mass and a predicted mass, it is asking for efficiency, not for the faradaic value.

## See Also

- [[09_Redox_and_Galvanic_Cells]]
- [[11_Battery_Chemistries]]
- [[07_Chemical_Equilibrium_and_Le_Chatelier]]

---

[[09_Redox_and_Galvanic_Cells|⬅ 09]] · [[_MOC_General_Chemistry|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Battery_Chemistries|11 ➡]]
