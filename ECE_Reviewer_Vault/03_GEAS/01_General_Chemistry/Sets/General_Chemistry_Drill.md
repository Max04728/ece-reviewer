---
title: "General Chemistry — Drill"
type: drill
area: 01_General_Chemistry
part: 03_GEAS
seed: 1
count: 8
pool: 49
updated: 2026-09-23
---

# General Chemistry — Practice Drill

**8 problems** drawn from a pool of 49 across 9 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 01_General_Chemistry --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. For $\mathrm{Zn}(s) + \mathrm{Cu^{2+}}(aq) \to \mathrm{Zn^{2+}}(aq) + \mathrm{Cu}(s)$ with $E^\circ = 1.10\ \mathrm{V}$, find the cell voltage at $25\ ^\circ\mathrm{C}$ when $[\mathrm{Zn^{2+}}] = 1.00\ \mathrm{M}$ and $[\mathrm{Cu^{2+}}] = 0.0100\ \mathrm{M}$.

**Given:** E° = 1.10 V; [Zn2+] = 1.00 M; [Cu2+] = 0.0100 M; n = 2

> [!success]- Answer
> **$E = 1.04\ \mathrm{V}$, below the standard value because the product ion is in excess.**

> [!warning] Trap
> Writing $Q = [\mathrm{Cu^{2+}}]/[\mathrm{Zn^{2+}}] = 0.0100$ and getting $E = 1.10 + 0.0592 = 1.16\ \mathrm{V}$. Q is products over reactants, and a depleted reactant must make the voltage DROP, not rise.

<sub>from GEAS-01-10</sub>

### 2. What volume does $8.00\ \mathrm{g}$ of $\mathrm{O_2}$ occupy at STP ($0\ ^\circ\mathrm{C}$, $1\ \mathrm{atm}$)?

**Given:** m = 8.00 g O2; M = 32.00 g/mol; molar volume at STP = 22.4 L/mol

> [!success]- Answer
> **$5.60\ \mathrm{L}$ at STP.**

> [!warning] Trap
> Using 22.4 L/mol at room temperature. At 25 °C and 1 atm the molar volume is 24.5 L/mol, so the same 0.250 mol would fill 6.13 L — a 9% error that still looks like a reasonable answer.

<sub>from GEAS-01-04</sub>

### 3. The same reaction is run with $5.00\ \mathrm{mol}$ of $\mathrm{H_2}$ limiting and produces $48.3\ \mathrm{g}$ of $\mathrm{NH_3}$ ($M = 17.03\ \mathrm{g/mol}$). Find the theoretical yield and the percent yield.

**Given:** n(NH3) from LR = 3.333 mol; M(NH3) = 17.03 g/mol; actual mass = 48.3 g

> [!success]- Answer
> **$56.8\ \mathrm{g}$ theoretical and $85.0\%$ yield.**

> [!warning] Trap
> Reporting 100 − 85.0 = 15% as the yield, or computing the theoretical mass from the excess $\mathrm{N_2}$ (which would give 68.1 g and a yield of 70.9%). Percent yield is actual over theoretical for the limiting reagent's product.

<sub>from GEAS-01-05</sub>

### 4. Chlorine consists of $^{35}\mathrm{Cl}$ (34.969 u, 75.77%) and $^{37}\mathrm{Cl}$ (36.966 u, 24.23%). Find its average atomic mass to four significant figures.

**Given:** 34.969 u at 75.77%; 36.966 u at 24.23%

> [!success]- Answer
> **$35.45\ \mathrm{u}$, which is also $35.45\ \mathrm{g/mol}$.**

> [!warning] Trap
> Multiplying by 75.77 instead of 0.7577 returns about 2650 u. The check that catches it instantly is that the abundance fractions must sum to exactly 1.

<sub>from GEAS-01-01</sub>

### 5. A buffer is $0.250\ \mathrm{M}$ in acetic acid and $0.100\ \mathrm{M}$ in sodium acetate. Find its pH. ($\mathrm{p}K_a = 4.74$)

**Given:** [HA] = 0.250 M; [A-] = 0.100 M; pKa = 4.74

> [!success]- Answer
> **pH $= 4.34$.**

> [!warning] Trap
> Inverting the ratio and answering $4.74 + 0.398 = 5.14$. The conjugate BASE goes in the numerator; the sign of the log term flips with the inversion.

<sub>from GEAS-01-08</sub>

### 6. For the best Lewis structure of the nitrate ion $\mathrm{NO_3^-}$, find the formal charge on the nitrogen and on each oxygen.

**Given:** N is the central atom; one N=O and two N–O bonds; no lone pair on N

> [!success]- Answer
> **$FC(\mathrm{N}) = +1$, double-bonded O = 0, each single-bonded O = $-1$; the sum is $-1$.**

> [!warning] Trap
> Forgetting to add the ionic charge to the valence-electron count and using 23 instead of 24. The formal charges then fail to sum to the ion charge, which is the built-in signal that the structure is wrong.

<sub>from GEAS-01-03</sub>

### 7. How many moles are in $25.0\ \mathrm{g}$ of $\mathrm{CaCO_3}$? ($M = 100.09\ \mathrm{g/mol}$)

**Given:** m = 25.0 g CaCO3; M = 100.09 g/mol

> [!success]- Answer
> **$0.250\ \mathrm{mol}$ of $\mathrm{CaCO_3}$.**

> [!warning] Trap
> Multiplying instead of dividing. Molar mass carries the units g/mol, so g divided by g/mol gives mol; writing the units down rejects the wrong operation immediately.

<sub>from GEAS-01-04</sub>

### 8. How many formula units are in $0.250\ \mathrm{mol}$ of $\mathrm{CaCO_3}$, and how many oxygen atoms?

**Given:** n = 0.250 mol; N_A = 6.022×10²³ mol⁻¹

> [!success]- Answer
> **$1.51\times10^{23}$ formula units and $4.52\times10^{23}$ oxygen atoms.**

> [!warning] Trap
> Reporting $1.51\times10^{23}$ for the oxygen atoms too. The question says atoms, so the subscript 3 must be applied — a one-line omission that changes the answer by a factor of three.

<sub>from GEAS-01-04</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| GEAS-01-01 | Atomic Structure and Configurations | 5 |
| GEAS-01-03 | Chemical Bonding | 4 |
| GEAS-01-04 | Mole Concept and Stoichiometry | 10 |
| GEAS-01-05 | Limiting Reagents and Yield | 5 |
| GEAS-01-06 | Solutions and Concentration Units | 5 |
| GEAS-01-07 | Chemical Equilibrium and Le Chatelier | 5 |
| GEAS-01-08 | pH, pOH and Buffers | 5 |
| GEAS-01-09 | Redox and Galvanic Cells | 5 |
| GEAS-01-10 | Nernst Equation and Faraday’s Laws | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
