---
title: General Chemistry
part: GEAS
tags: [ece, geas, formula-sheet]
topics: 11
---

## Part A — Atomic Structure and Bonding

### 1. Atomic Structure and Configurations

![](https://www.youtube.com/watch?v=Aoi4j8es4gQ)

*Video: Quantum Numbers, Atomic Orbitals and Electron Configurations — Professor Dave Explains, 8:42*

**Bohr energy and radius ★** — $Z$ = atomic number (dimensionless), $n$ = principal quantum number.

$$E_n = -\frac{13.6\,Z^2}{n^2}\ \text{eV},\qquad r_n = \frac{0.529\,n^2}{Z}\ \text{Å},\qquad E_n \propto -\frac{1}{n^2}$$

**Photon and Rydberg relations ★**

$$E = hf = \frac{hc}{\lambda}\ \text{(J)},\qquad \frac{1}{\lambda} = R_H Z^2\!\left(\frac{1}{n_1^2}-\frac{1}{n_2^2}\right),\ n_2 > n_1$$

**Symbols**

- $E$ — photon energy, in J
- $h$ — Planck constant, $h = 6.626\times10^{-34}$ J·s
- $f$ — photon frequency, in Hz
- $c$ — speed of light in vacuum, $c = 2.998\times10^{8}$ m/s
- $R_H$ — Rydberg constant, $R_H = 1.097\times10^{7}$ m$^{-1}$
- $n_1, n_2$ — principal quantum numbers of the lower and upper levels of the transition (integers, dimensionless)

**Matter waves and uncertainty** — $\lambda$ in m, $p$ in kg·m/s, $v$ in m/s, $\hbar = h/2\pi$ in J·s.

$$\lambda = \frac{h}{p} = \frac{h}{mv},\qquad \Delta x\,\Delta p \ge \frac{\hbar}{2}$$

**Symbols**

- $m$ — mass of the electron, in kg
- $\Delta x$ — uncertainty in position, in m
- $\Delta p$ — uncertainty in momentum, in kg·m/s

**Quantum numbers** — $n,l,m_l,m_s$; $l = 0\ldots n-1$, $m_l = -l\ldots +l$, $m_s = \pm\tfrac12$ (dimensionless).

| Quantum number | Symbol | Allowed values | Specifies |
|---|---|---|---|
| Principal | $n$ | $1,2,3,\ldots$ | shell, energy |
| Azimuthal | $l$ | $0\ldots n-1$ | subshell ($s,p,d,f$) |
| Magnetic | $m_l$ | $-l\ldots +l$ | orbital orientation |
| Spin | $m_s$ | $+\tfrac12,-\tfrac12$ | electron spin |

**Filling rules:** Aufbau (lowest $n+l$ first), Pauli (max 2 $e^-$ per orbital, opposite spin), Hund (max parallel spins in degenerate orbitals).
Half-filled and fully filled subshells are extra stable — the Cr and Cu exceptions.

**Isotopes ★** — same proton number $Z$, different neutron number $N$, hence different mass number $A = Z + N$.

$${}^{12}_{6}\text{C}:\ Z = 6,\ N = 6,\ A = 12 \qquad {}^{14}_{6}\text{C}:\ Z = 6,\ N = 8,\ A = 14$$

**Photoelectric equation ★** — $K_{\max}$ and work function $\Phi$ in eV, $f$ in Hz, $\lambda$ in nm in the short form.

$$K_{\max} = hf - \Phi = \frac{hc}{\lambda} - \Phi \approx \frac{1240}{\lambda(\text{nm})} - \Phi\ \text{(eV)},\qquad f_0 = \frac{\Phi}{h}$$

**Conditions:** the Bohr energy and radius apply to one-electron (hydrogenic) species only, with $Z$ the atomic number; configuration rules apply to ground-state isolated atoms, with exceptions at Cr, Cu and the heavy $d$/$f$ blocks; isotopes share proton number $Z$ and chemistry but differ in neutron number and mass; photoelectric emission requires $f > f_0 = \Phi/h$ and below threshold no emission occurs regardless of intensity.

> [!warning] Exam trap
> Ion configurations remove electrons from the **highest $n$** orbital first — for $\text{Fe}^{2+}$ that is $4s$, not $3d$: $[\text{Ar}]3d^6$, never $[\text{Ar}]3d^4 4s^2$.

---

### 2. Periodic Trends

![](https://www.youtube.com/watch?v=hePb00CqvP0)

*Video: Atomic Radius, Ionization Energy and Electronegativity — Professor Dave Explains, 7:53*

**Effective nuclear charge ★** — Slater screening $S$ in electron units; $Z$ dimensionless.

$$Z_{\text{eff}} = Z - S \qquad \text{(Slater: }S = 0.35\text{ per same-}n,\ 0.85\text{ per }n-1,\ 1.00\text{ per core)}$$

**Ionization energy and electron affinity** — all in kJ/mol, $X$ = any element.

$$\text{IE}_1:\ X(g) \to X^+(g) + e^-,\qquad \text{EA}_1:\ X(g) + e^- \to X^-(g),\qquad \text{IE}_n \gg \text{IE}_{n-1}$$

**Electronegativity scales** — dimensionless (Pauling) or kJ/mol (Mulliken).

$$\chi_{\text{Mulliken}} = \frac{\text{IE} + \text{EA}}{2}\ \text{(kJ/mol)},\qquad \text{Pauling: } \chi_F = 4.0,\ \Delta\chi = \chi_A - \chi_B$$

$$\text{Percent ionic character} \approx 16\,\lvert\Delta\chi\rvert + 3.5\,(\Delta\chi)^2\ (\%),\qquad \mu = q\,d\ \text{(C·m)}$$

$$1\,\text{D} = 3.336\times10^{-30}\ \text{C·m}$$

**Symbols**

- $\mu$ — molecular dipole moment, in C·m
- $q$ — magnitude of either charge of the dipole, in C
- $d$ — separation between the two charges, in m

**Trend summary**

| Property | Across period (→) | Down group (↓) | Reason |
|---|---|---|---|
| Atomic radius | decreases | increases | $Z_{\text{eff}}$ up, $n$ up |
| Ionization energy | increases | decreases | hold on valence $e^-$ |
| Electron affinity | increases (with dips) | decreases | $Z_{\text{eff}}$ vs size |
| Electronegativity | increases | decreases | $Z_{\text{eff}}$ vs size |
| Metallic character | decreases | increases | ease of losing $e^-$ |
| Ionic radius | cation < atom < anion | increases | charge vs shell |

**Conditions:** trends are for main-group representative elements; transition-series irregularities and lanthanide contraction are the standard exceptions.

> [!tip] High-yield ★
> Radius drops sharply at the **cation** and jumps at the **anion** of the same element — $\text{Na}^+ < \text{Ne} < \text{F}^-$ is isoelectronic and ordered purely by nuclear charge.

---

### 3. Chemical Bonding

![](https://www.youtube.com/watch?v=S_k0kr2eZSQ)

*Video: Introduction to Ionic and Covalent Bonding — The Organic Chemistry Tutor, 12:50*

**Lewis and formal charge ★** — FC in electron units; valence $e^-$ counts are integers.

$$\text{FC} = V - N_{\text{nonbonding}} - \frac{B_{\text{bonding}}}{2},\qquad \text{Bond order} = \frac{\text{bonding} - \text{antibonding}}{2}$$

**VSEPR geometry** — $\text{BP}$ = bonding pairs, $\text{LP}$ = lone pairs.

| BP + LP | Shape | Angle |
|---|---|---|
| 2 + 0 | linear | 180° |
| 3 + 0 | trigonal planar | 120° |
| 4 + 0 | tetrahedral | 109.5° |
| 3 + 1 | trigonal pyramidal | ~107° |
| 2 + 2 | bent | ~104.5° |
| 5 + 0 | trigonal bipyramidal | 90/120° |
| 6 + 0 | octahedral | 90° |

**Hybridization and MO bond order** — $\Psi$ = wavefunction, coefficients dimensionless.

| Steric number | Hybrid | s / p character |
|---|---|---|
| 2 | $sp$ | 50% / 50% |
| 3 | $sp^2$ | 33% / 67% |
| 4 | $sp^3$ | 25% / 75% |
| 5 | $sp^3d$ | — |
| 6 | $sp^3d^2$ | — |

**Lattice energy (Born–Landé) ★** — $U$ in kJ/mol, $r_0$ in pm, $A$ = Madelung constant (dimensionless).

$$U = -\frac{N_A M z^+ z^- e^2}{4\pi\varepsilon_0 r_0}\left(1-\frac{1}{n}\right) \approx -\frac{k\,z^+ z^-}{r_0}$$

**Symbols**

- $N_A$ — Avogadro constant, $N_A = 6.022\times10^{23}$ mol$^{-1}$
- $M$ — Madelung constant, a dimensionless geometric factor of the lattice
- $z^+, z^-$ — charge numbers of the cation and the anion (integers, dimensionless)
- $e$ — elementary charge, $e = 1.602\times10^{-19}$ C
- $\varepsilon_0$ — vacuum permittivity, $\varepsilon_0 = 8.854\times10^{-12}$ F/m
- $n$ — Born exponent, a dimensionless measure of ion compressibility (typically 5–12)
- $k = 1/(4\pi\varepsilon_0)$ — Coulomb constant, $k = 8.988\times10^{9}$ N·m²/C²

**Bond type decision:** $\Delta\chi > 1.7$ ionic, $0.4 < \Delta\chi \le 1.7$ polar covalent, $\Delta\chi \le 0.4$ nonpolar covalent.
**Conditions:** Born–Landé assumes purely ionic, point-charge, non-polarizable ions; VSEPR angles shrink as lone-pair repulsion increases.

> [!warning] Exam trap
> Lone pairs compress bond angles but never change the **electron-domain** count. $\text{NH}_3$ is $sp^3$ (domain 4) with a 107° angle — not $sp^2$.

---

## Part B — Stoichiometry and Solutions

### 4. Mole Concept and Stoichiometry

![](https://www.youtube.com/watch?v=Gle1bPAZsgg)

*Video: Stoichiometry Made Easy — ketzbook, 6:55*

**Core mole relations ★** — $m$ in g, $M$ in g/mol, $N_A = 6.022\times10^{23}\ \text{mol}^{-1}$.

$$n = \frac{m}{M}\ \text{(mol)},\qquad N = n\,N_A,\qquad V_m = 22.414\ \text{L/mol at STP},\quad n = \frac{PV}{RT}$$

**Composition and formula** — masses in g, $M$ in g/mol.

$$\%\text{element} = \frac{n_{\text{atoms}} M_{\text{element}}}{M_{\text{compound}}}\times100$$

$$n = \frac{\%\text{composition}}{\text{atomic mass}} \Rightarrow \text{empirical formula}$$

$$\text{Molecular formula} = (\text{empirical formula})_k,\qquad k = \frac{M_{\text{molar}}}{M_{\text{empirical}}}$$

**Solution and gas stoichiometry**

$$M_1V_1 = M_2V_2,\qquad PV = nRT,\quad R = 0.08206\ \text{L·atm/(mol·K)} = 8.314\ \text{J/(mol·K)}$$

**Conditions:** ideal-gas behavior ($P$ low, $T$ high), balanced equation first, $V_m = 22.414$ L/mol only at 0 °C and 1 atm.

> [!tip] High-yield ★
> Convert everything to **moles** before using any ratio; the coefficients of the balanced equation are mole ratios, never mass or volume ratios (except gases at the same $T$, $P$).

---

### 5. Limiting Reagents and Yield

![](https://www.youtube.com/watch?v=dodsvTfqWNc)

*Video: Limiting Reagents and Percent Yield — Professor Dave Explains, 4:35*

**Limiting reagent ★** — pick the smallest ratio $\dfrac{n_{\text{reactant}}}{\nu_{\text{stoichiometric}}}$.

$$n_{\text{limiting}} = \min_i\left(\frac{n_i}{\nu_i}\right),\qquad \text{excess }\% = \frac{n_{\text{supplied}} - n_{\text{required}}}{n_{\text{required}}}\times100$$

**Yield and conversion** — all either in g, mol or %, consistent per equation.

$$\%\text{yield} = \frac{\text{actual yield}}{\text{theoretical yield}}\times100 \qquad \%\text{conversion} = \frac{\text{reacted}}{\text{fed}}\times100$$

**Atom economy and selectivity**

$$\text{Atom economy} = \frac{M_{\text{desired product}}}{\sum M_{\text{reactants}}}\times100\ (\%)$$

$$\%\text{selectivity} = \frac{n_{\text{product}}}{n_{\text{reacted}}}\times100$$

**Conditions:** theoretical yield assumes 100% conversion and pure reactants; atom economy ignores solvent, catalysts and excess reagent.

> [!warning] Exam trap
> Two "obvious" limits can both exist: if $\dfrac{n_A}{\nu_A} = \dfrac{n_B}{\nu_B}$ the mixture is **stoichiometric** — there is no limiting reagent, and either reactant converts fully.

---

### 6. Solutions and Concentration Units

![](https://www.youtube.com/watch?v=KLjWa9cE2uk)

*Video: Molarity Made Easy: Calculating Molarity and Making Solutions — ketzbook, 8:46*

**Concentration definitions ★** — $n$ in mol, $m_{\text{solvent}}$ in kg, $V$ in L, $m_{\text{soln}}$ in g.

$$M = \frac{n_{\text{solute}}}{V_{\text{soln}}}\ (\text{mol/L}),\qquad m = \frac{n_{\text{solute}}}{m_{\text{solvent}}}\ (\text{mol/kg}),\qquad N = M\times\text{(eq/mol)}$$

**Symbols**

- $M$ — molarity, in mol/L
- $m$ — molality, in mol/kg
- $N$ — normality, in eq/L

$$\text{ppm} = \frac{m_{\text{solute}}}{m_{\text{soln}}}\times10^6,\qquad x_i = \frac{n_i}{n_{\text{total}}}$$

$$\%\frac{w}{w} = \frac{m_{\text{solute}}}{m_{\text{soln}}}\times100$$

**Interconversion** — $\rho$ in g/mL, $M_{\text{solute}}$ in g/mol.

$$M = \frac{10\,\%\frac{w}{w}\times\rho}{M_{\text{solute}}},\qquad m = \frac{M}{1000\rho - M\,M_{\text{solute}}}$$

$$m \approx M\ \text{for dilute aqueous solutions}$$

**Colligative properties ★** — $K_b, K_f$ in K·kg/mol, $i$ = van't Hoff factor (dimensionless).

$$\Delta T_b = iK_b m,\qquad \Delta T_f = iK_f m,\qquad \pi = iMRT\ \text{(Pa)}$$

**Vapor pressure and solubility of gases**

$$P_{\text{soln}} = x_{\text{solvent}}P^\circ_{\text{solvent}}\ \text{(Raoult)},\qquad C = k_H P\ \text{(Henry)}$$

**Symbols**

- $P_{\text{soln}}$ — vapour pressure of the solution, in Pa
- $x_{\text{solvent}}$ — mole fraction of the solvent (dimensionless)
- $P^\circ_{\text{solvent}}$ — vapour pressure of the pure solvent, in Pa
- $C$ — concentration (solubility) of the dissolved gas, in mol/L
- $k_H$ — Henry's law constant, in Pa·L/mol
- $P$ — partial pressure of the gas above the solution, in Pa

$i$ values: 1 nonelectrolyte, 2 NaCl/KCl, 3 CaCl$_2$/Na$_2$SO$_4$, 4 AlCl$_3$.
**Conditions:** Raoult and colligative laws hold for dilute ideal solutions; Henry's law holds at low $P$ and constant $T$.

> [!tip] High-yield ★
> Freezing-point depression is the most tested colligative property: $\Delta T_f = iK_fm$ with $K_f = 1.86$ K·kg/mol for water and $i$ doubled for NaCl.

---

## Part C — Equilibrium, Electrochemistry and Batteries

### 7. Chemical Equilibrium and Le Chatelier

![](https://www.youtube.com/watch?v=XmgRRmxS3is)

*Video: Le Chatelier's Principle — Professor Dave Explains, 4:09*

**Equilibrium constants ★** — dimensionless activities; $K_p$ uses $P$ in atm, $K_c$ uses mol/L.

$$K_c = \frac{\prod [\text{products}]^{\nu}}{\prod[\text{reactants}]^{\nu}},\qquad K_p = K_c (RT)^{\Delta n}$$

$$\Delta n = \sum\nu_{\text{gas,prod}} - \sum\nu_{\text{gas,react}}$$

**Reaction quotient vs $K$:** $Q < K$ forward, $Q = K$ at equilibrium, $Q > K$ reverse.
**Thermodynamic link** — $\Delta G^\circ$ in J/mol, $R = 8.314$ J/(mol·K), $T$ in K.

$$\Delta G = \Delta G^\circ + RT\ln Q,\qquad \Delta G^\circ = -RT\ln K,\qquad \Delta G^\circ = \Delta H^\circ - T\Delta S^\circ$$

**Le Chatelier shifts**

| Disturbance | Shift |
|---|---|
| Add reactant / remove product | → right |
| Increase $P$ (gas) | toward fewer gas moles |
| Increase $T$ (endothermic) | → right |
| Increase $T$ (exothermic) | ← left |
| Catalyst | no shift (faster only) |

**Degree of dissociation and $K_{sp}$** — $\alpha$ dimensionless, $c$ in mol/L, $s$ = molar solubility.

$$\alpha = \frac{\text{dissociated}}{c},\qquad K_a = \frac{c\alpha^2}{1-\alpha},\qquad K_{sp} = (x s)^x (y s)^y \text{ for } A_xB_y$$

**Conditions:** $K$ depends only on $T$; solids, pure liquids and solvents are excluded from the expression; $K_p = K_c(RT)^{\Delta n}$ only for gas-phase equilibria.

> [!warning] Exam trap
> Catalysts raise **rate**, never yield. On a Le Chatelier question, "faster approach to equilibrium" is never an answer to "shifts the equilibrium".

---

### 8. pH, pOH and Buffers

![](https://www.youtube.com/watch?v=OEW4-Sfyvik)

*Video: pH, pOH, Ka, Kb, pKa and pKb Calculations — The Organic Chemistry Tutor, 13:50*

**pH scale ★** — $[\text{H}^+]$ in mol/L, $K_w = 1.0\times10^{-14}$ at 25 °C.

$$\text{pH} = -\log[\text{H}^+],\qquad \text{pOH} = -\log[\text{OH}^-],\qquad \text{pH} + \text{pOH} = \text{p}K_w = 14.00$$

$$K_aK_b = K_w,\qquad \text{p}K_a + \text{p}K_b = 14.00,\qquad \%\text{ionization} = \frac{[\text{H}^+]}{c}\times100$$

**Weak acid / weak base** — $c$ in mol/L, approximations valid when $c/K_a > 100$.

$$[\text{H}^+] \approx \sqrt{K_a c},\qquad \text{pH} = \tfrac12(\text{p}K_a - \log c),\qquad [\text{OH}^-] \approx \sqrt{K_b c}$$

**Henderson–Hasselbalch (buffers) ★** — $[\ ]$ in mol/L, ratio dimensionless.

$$\text{pH} = \text{p}K_a + \log\frac{[\text{A}^-]}{[\text{HA}]},\qquad \text{pOH} = \text{p}K_b + \log\frac{[\text{BH}^+]}{[\text{B}]}$$

$$\text{Buffer capacity } \beta = \frac{dn_{\text{base}}}{d\,\text{pH}}\ (\text{mol per pH unit}),\qquad \text{max buffering at pH} = \text{p}K_a \pm 1$$

**Salt hydrolysis:** cation from weak base is acidic, anion from weak acid is basic, both weak → $\text{pH} \approx 7 + \tfrac12(\text{p}K_a - \text{p}K_b)$.
**Conditions:** $K_w = 1.0\times10^{-14}$ only at 25 °C; buffer equations assume the acid/base pair is present in comparable amounts and that added strong acid/base is small.

> [!tip] High-yield ★
> Buffer shortcut: when $[\text{A}^-] = [\text{HA}]$, $\text{pH} = \text{p}K_a$ exactly. Half-neutralization of a weak acid gives $\text{pH} = \text{p}K_a$ — a standard titration-curve item.

---

### 9. Redox and Galvanic Cells

![](https://www.youtube.com/watch?v=2VT5rl8P84M)

*Video: Electrochemistry: Redox and Galvanic Cells — Professor Dave Explains, 6:21*

**Oxidation number rules** — free element 0; O usually −2 (peroxide −1); H +1 with nonmetals, −1 with metals; sum = net charge.

**Cell potential ★** — $E^\circ$ in V, $n$ = moles of electrons (mol), $F = 96{,}485$ C/mol.

$$E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}} = E^\circ_{\text{reduction}} + E^\circ_{\text{oxidation}}$$

$$\Delta G^\circ = -nFE^\circ_{\text{cell}}\ \text{(J)},\qquad \Delta G^\circ = -RT\ln K \Rightarrow E^\circ = \frac{0.0592}{n}\log K\ (25\ ^\circ\text{C})$$

**Symbols**

- SHE — standard hydrogen electrode ($2\text{H}^+ + 2e^- \to \text{H}_2$ at 1 M, 1 atm, 25 °C), the reference half-cell whose potential is defined as $E^\circ = 0.00$ V (electrode potentials in V)

**Standard potentials (V vs SHE)**

| Half-reaction | $E^\circ$ |
|---|---|
| $\text{F}_2 + 2e^- \to 2\text{F}^-$ | +2.87 |
| $\text{Ag}^+ + e^- \to \text{Ag}$ | +0.80 |
| $\text{Cu}^{2+} + 2e^- \to \text{Cu}$ | +0.34 |
| $2\text{H}^+ + 2e^- \to \text{H}_2$ | 0.00 |
| $\text{Pb}^{2+} + 2e^- \to \text{Pb}$ | −0.13 |
| $\text{Fe}^{2+} + 2e^- \to \text{Fe}$ | −0.44 |
| $\text{Zn}^{2+} + 2e^- \to \text{Zn}$ | −0.76 |
| $\text{Al}^{3+} + 3e^- \to \text{Al}$ | −1.66 |
| $\text{Li}^+ + e^- \to \text{Li}$ | −3.05 |

**Cell notation:** anode (oxidation, −) on the left, salt bridge $\|$, cathode (reduction, +) on the right: $\text{Zn}\lvert\text{Zn}^{2+}\|\text{Cu}^{2+}\lvert\text{Cu}$.
**Conditions:** $E^\circ$ values at 25 °C, 1 M solutes, 1 atm gases; a positive $E^\circ_{\text{cell}}$ means spontaneous as written.

> [!warning] Exam trap
> Reversing a half-reaction flips the sign of $E^\circ$ — but **do not multiply $E^\circ$ by the balancing coefficients**. Only $\Delta G^\circ = -nFE^\circ$ scales with $n$.

---

### 10. Nernst Equation and Faraday's Laws

![](https://www.youtube.com/watch?v=rn1gLiQ3DAg)

*Video: Electrochemistry Formulas: Gibbs Energy, K, Cell Potential and Nernst — The Organic Chemistry Tutor, 10:42*

**Nernst equation ★** — $E$ in V, $n$ in mol $e^-$, $Q$ dimensionless, $R = 8.314$ J/(mol·K).

$$E = E^\circ - \frac{RT}{nF}\ln Q = E^\circ - \frac{2.303RT}{nF}\log Q = E^\circ - \frac{0.0592}{n}\log Q\ \text{(25 °C)}$$

$$\text{At equilibrium: } E = 0 \Rightarrow E^\circ = \frac{0.0592}{n}\log K$$

**Faraday's laws of electrolysis ★** — $m$ in g, $I$ in A, $t$ in s, $M$ in g/mol, $F = 96{,}485$ C/mol.

$$m = \frac{M\,I\,t}{nF} = \frac{E_w\,Q}{F},\qquad Q = It\ \text{(C)},\qquad E_w = \frac{M}{n}\ \text{(g/eq)}$$

$$n_{e^-} = \frac{Q}{F} = \frac{It}{F}\ \text{(mol)},\qquad \text{current efficiency} = \frac{m_{\text{actual}}}{m_{\text{theoretical}}}\times100$$

**Conditions:** Nernst uses activities approximated by molarity for dilute solutions and partial pressures in atm for gases; Faraday's laws assume 100% current efficiency with no side reactions.

> [!tip] High-yield ★
> At 25 °C the Nernst constant is exactly $\frac{0.0592}{n}$ V. Remember $0.0592$ — many board items quote $0.0591$; either is accepted at exam precision.

---

### 11. Battery Chemistries

**Capacity and energy ★** — $Q$ in Ah, $I$ in A, $t$ in h, $E$ in V, $W$ in Wh.

$$Q = I\,t\ \text{(Ah)},\qquad W = E\,Q = E\,I\,t\ \text{(Wh)},\qquad \text{C-rate} = \frac{I}{Q}\ \text{(h}^{-1})$$

$$\eta_{\text{Ah}} = \frac{Q_{\text{discharge}}}{Q_{\text{charge}}}\times100,\qquad \eta_{\text{Wh}} = \frac{W_{\text{discharge}}}{W_{\text{charge}}}\times100$$

**Peukert and energy density** — $k$ dimensionless, $t$ in h; density per kg or per L.

$$I^k t = C_p \Rightarrow t = \frac{C_p}{I^k},\qquad \text{Specific energy} = \frac{Wh}{kg},\qquad \text{Energy density} = \frac{Wh}{L}$$

**Symbols**

- $C_p$ — Peukert capacity (capacity extrapolated to a 1 A discharge), in A·h
- $k$ — Peukert exponent (dimensionless, typically 1.1–1.4)

**Common cell chemistries**

| Cell | Anode / Cathode | $E^\circ_{\text{cell}}$ | Nominal | Notes |
|---|---|---|---|---|
| Leclanché (dry) | Zn / MnO$_2$–C | 1.5 V | 1.5 V | primary, non-rechargeable |
| Alkaline | Zn / MnO$_2$ | 1.5 V | 1.5 V | primary, longer shelf life |
| Silver–zinc | Zn / Ag$_2$O | 1.6 V | 1.55 V | button cells, flat discharge |
| Lead–acid | Pb / PbO$_2$ | 2.05 V | 2.0 V/cell | rechargeable, 12 V = 6 cells |
| NiCd | Cd / NiOOH | 1.3 V | 1.2 V | memory effect |
| NiMH | MH / NiOOH | 1.3 V | 1.2 V | higher capacity, no Cd |
| Li-ion | C / LiCoO$_2$ | 3.6 V | 3.7 V | no memory, high energy density |
| Li-poly | Li / polymer | 3.7 V | 3.7 V | flexible, thin form factor |

**Series/parallel:** series adds $E$, parallel adds $Q$; $n$ cells in series give $E_{\text{total}} = nE_{\text{cell}}$.
**Conditions:** nominal voltages are at 25 °C under light load; capacity and $E^\circ$ fall with temperature, load current and aging.

> [!warning] Exam trap
> A 12 V lead–acid battery is **six 2 V cells in series** — a standard recall item. Do not answer "2 V" when the question asks for the pack voltage.

→ Back to [[00_Index]]
