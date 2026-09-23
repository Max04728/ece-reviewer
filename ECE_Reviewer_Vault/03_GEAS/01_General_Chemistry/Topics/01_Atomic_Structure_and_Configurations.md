---
id: GEAS-01-01
title: "Atomic Structure and Configurations"
part: "03_GEAS"
area: "01_General_Chemistry"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[_MOC_General_Chemistry]]"]
tags: ["ece", "geas", "general_chemistry"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Atomic Structure and Configurations

> [!abstract] Scope
> Build the atom from its particles, then fill orbitals to read off the configuration, ion or isotope a problem asks for.

## Core Concept

> [!tip] Intuition
> Electron configuration is an energy-ordered filling queue: electrons always take the cheapest slot available, and the only real surprises are the two elements where moving one 4s electron into 3d buys extra stability.

**Subatomic accounting.** $Z$ (atomic number) is the proton count and fixes the element; $A = Z + N$ is the mass number, so $N = A - Z$ neutrons. Atoms of the same element with different $N$ are isotopes and differ chemically only in mass. Charge is proton count minus electron count: $q = Z - n_e$. The exam gives you the ion symbol far more often than the numbers, so run the arithmetic in this order — symbol to $Z$, charge to $n_e$, then $N$ from the mass number.

**Average atomic mass and molar mass.** A periodic-table mass is the abundance-weighted average of the isotope masses:
$$\bar{A} = \sum f_i A_i$$
with $\sum f_i = 1$. That is why chlorine's table value is 35.45 u even though no chlorine atom weighs 35.45 u. Molar mass is the same number in $\mathrm{g/mol}$, because $N_A \times 1\ \mathrm{u} = 1.000\ \mathrm{g/mol}$; that identity is what lets you cross between the balance, the particle count and the gas volume.

**Filling orbitals.** Four quantum numbers label an electron: $n$ (shell), $l$ (subshell, $0 \ldots n-1$), $m_l$ (one of $2l+1$ values) and $m_s = \pm\tfrac{1}{2}$. A shell holds $2n^2$ electrons and a subshell holds $2(2l+1)$. Fill by the aufbau order — lowest $n+l$ first, and for equal $n+l$ the lower $n$ first — which is what puts $4s$ before $3d$. Pauli forbids two electrons sharing all four quantum numbers, and Hund's rule singly occupies every orbital in a subshell with parallel spins before any pairing. Read the unpaired count off the box diagram, never off the electron total.

**The two exceptions, and how ions differ.** Chromium ($Z=24$) is $[\mathrm{Ar}]3d^5 4s^1$ and copper ($Z=29$) is $[\mathrm{Ar}]3d^{10}4s^1$, because a half-filled or completely filled $d$ subshell sits lower in energy than the aufbau order predicts. These two are the configurations the board actually tests. For cations, remove electrons from the **highest $n$** orbital first, which means $4s$ before $3d$: $\mathrm{Fe}^{2+}$ is $[\mathrm{Ar}]3d^6$, not $[\mathrm{Ar}]3d^4 4s^2$. For anions, keep filling forward in the normal order.

**Where the energy comes from.** When an electron drops from $n_2$ to $n_1$ the atom emits a photon of energy $E = hc/\lambda$; for hydrogen the wavelengths obey the Rydberg formula. Board questions either hand you a wavelength and ask for the energy, or hand you an energy and ask which transition it is. Convert joules to electron-volts with $1\ \mathrm{eV} = 1.602\times10^{-19}\ \mathrm{J}$ before comparing with a level diagram, and remember that $Z_{\mathrm{eff}}$ shrinks the levels for every atom heavier than hydrogen.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Mass number | $A = Z + N$ | A counts nucleons and is an integer. The periodic-table mass is NOT A; for an ion, Z is still the proton count. |
| Net charge of an ion | $q = Z - n_e$ | Monatomic ions only. A cation has fewer electrons than protons, so q > 0; the sign convention is the usual source of sign errors. |
| Average atomic mass | $\bar{A} = \sum_i f_i A_i, \quad \sum_i f_i = 1$ | f_i is fractional abundance, not percent. Feeding 75.77 instead of 0.7577 gives an answer 100x too large. |
| Mole-particle bridge | $n = \frac{N}{N_A}, \quad N_A = 6.022\times10^{23}\ \mathrm{mol^{-1}}$ | Counts formula units unless the question says atoms; for atoms multiply by the total subscript sum. |
| Shell electron capacity | $\mathrm{max\ electrons\ in\ shell\ } n = 2n^2$ | n = 3 holds 18 electrons, not 8. The 8 comes from the aufbau filling order for that row, not from the capacity. |
| Subshell occupancy | $\#\mathrm{orbitals} = 2l+1, \quad \#\mathrm{electrons} = 2(2l+1)$ | s, p, d, f give 1, 3, 5, 7 orbitals and 2, 6, 10, 14 electrons respectively. |
| Aufbau ordering rule | $\mathrm{lowest\ } (n+l) \mathrm{\ first;\ tie} \Rightarrow \mathrm{lower\ } n$ | Gives 4s (n+l = 4) before 3d (n+l = 5). It fails for Cr and Cu, which is why those two are memorised. |
| Photon energy from wavelength | $E = \frac{hc}{\lambda} = \frac{(6.626\times10^{-34})(3.00\times10^{8})}{\lambda}$ | Lambda in metres. Leaving it in nm makes E too small by 10^9. |
| Rydberg formula | $\frac{1}{\lambda} = R_H\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right), \ R_H = 1.097\times10^{7}\ \mathrm{m^{-1}}$ | Emission with n_2 > n_1 and n_1 the LOWER level. Reversing them yields a negative wavelength. |
| de Broglie wavelength | $\lambda = \frac{h}{mv}$ | Any particle with mass. Mass in kg and speed in m/s; using grams makes lambda 1000x too small. |

## Worked Problems

### P1. Chlorine consists of $^{35}\mathrm{Cl}$ (34.969 u, 75.77%) and $^{37}\mathrm{Cl}$ (36.966 u, 24.23%). Find its average atomic mass to four significant figures.

**Given:** 34.969 u at 75.77%; 36.966 u at 24.23%

**Solution:**

1. Convert the abundances to fractions: 0.7577 and 0.2423 (they must sum to 1)
2. Contribution of Cl-35: (0.7577)(34.969) = 26.496 u
3. Contribution of Cl-37: (0.2423)(36.966) = 8.957 u
4. Add: 26.496 + 8.957 = 35.453 u

> [!success]- Answer
> **$35.45\ \mathrm{u}$, which is also $35.45\ \mathrm{g/mol}$.**

> [!warning] Trap
> Multiplying by 75.77 instead of 0.7577 returns about 2650 u. The check that catches it instantly is that the abundance fractions must sum to exactly 1.

### P2. Give the ground-state electron configuration of $\mathrm{Fe}$ ($Z=26$) and of $\mathrm{Fe}^{2+}$, and state how many unpaired electrons each has.

**Given:** Z = 26 for Fe; Fe2+ forms by losing two electrons

**Solution:**

1. Fe: fill 26 electrons in aufbau order gives $1s^22s^22p^63s^23p^63d^64s^2$, i.e. $[\mathrm{Ar}]3d^64s^2$
2. Ionise from the highest n: remove both 4s electrons before touching 3d
3. $\mathrm{Fe}^{2+} = [\mathrm{Ar}]3d^6$ (24 electrons)
4. Box diagram for $3d^6$: five orbitals take one electron each, the sixth pairs up, so 4 unpaired. The filled 4s of neutral Fe contributes none, so Fe also has 4 unpaired.

> [!success]- Answer
> **Fe = $[\mathrm{Ar}]3d^64s^2$ with 4 unpaired; Fe$^{2+}$ = $[\mathrm{Ar}]3d^6$ with 4 unpaired.**

> [!warning] Trap
> Removing the two 3d electrons instead of the 4s pair gives $[\mathrm{Ar}]3d^44s^2$ for Fe$^{2+}$ — wrong configuration AND wrong unpaired count, which breaks any magnetism question built on it.

### P3. Write the ground-state configuration of chromium ($Z=24$) and count its unpaired electrons. Compare with what the aufbau rule predicts.

**Given:** Z = 24; a half-filled d subshell is unusually stable

**Solution:**

1. Aufbau predicts $[\mathrm{Ar}]3d^44s^2$, which has 4 unpaired electrons
2. Promote one 4s electron: $[\mathrm{Ar}]3d^54s^1$
3. A half-filled $3d^5$ has all five d orbitals singly occupied with parallel spins = 5 unpaired; the lone 4s electron adds 1
4. Total unpaired = 6

> [!success]- Answer
> **$[\mathrm{Ar}]3d^54s^1$ with 6 unpaired electrons; the aufbau form would give only 4.**

> [!warning] Trap
> Writing $[\mathrm{Ar}]3d^44s^2$ and reporting 4 unpaired. Chromium and copper are the two configurations that must be memorised rather than derived from the filling order.

### P4. A hydrogen emission line has $\lambda = 486\ \mathrm{nm}$. Find the photon energy in joules and in electron-volts.

**Given:** λ = 486 nm; h = 6.626×10⁻³⁴ J·s; c = 3.00×10⁸ m/s; 1 eV = 1.602×10⁻¹⁹ J

**Solution:**

1. Convert: λ = 486 nm = 4.86 × 10⁻⁷ m
2. $E = hc/\lambda = (6.626\times10^{-34})(3.00\times10^{8})/(4.86\times10^{-7})$
3. $hc = 1.988\times10^{-25}\ \mathrm{J\,m}$, so $E = 4.09\times10^{-19}\ \mathrm{J}$
4. Convert: $4.09\times10^{-19}/1.602\times10^{-19} = 2.55\ \mathrm{eV}$

> [!success]- Answer
> **$4.09\times10^{-19}\ \mathrm{J} = 2.55\ \mathrm{eV}$.**

> [!warning] Trap
> Substituting 486 for lambda instead of $4.86\times10^{-7}$ m returns an energy 10^9 times too small — convert nm to m before dividing, every time.

### P5. For the $n=3$ shell, state the number of subshells, the total number of orbitals, the maximum electron count, and how many of those orbitals are $3d$.

**Given:** n = 3

**Solution:**

1. $l = 0, 1, 2$ gives three subshells: 3s, 3p, 3d
2. Orbitals: $2l+1$ summed = 1 + 3 + 5 = 9
3. Maximum electrons: $2n^2 = 2(3^2) = 18$, which also equals 2 electrons per orbital times 9 orbitals
4. 3d orbitals: $2(2)+1 = 5$

> [!success]- Answer
> **3 subshells, 9 orbitals, 18 electrons maximum, of which 5 orbitals are $3d$ (holding 10 electrons).**

> [!warning] Trap
> Answering 8 electrons because period 3 of the table contains eight elements. $2n^2$ is the shell capacity; the eight comes from the aufbau order stopping at 3p for that row.

## Traps & Exam Notes

- **Removing 3d electrons when ionising a transition metal.** 4s fills last but empties first, so $\mathrm{Fe}^{2+} = [\mathrm{Ar}]3d^6$. Writing $[\mathrm{Ar}]3d^44s^2$ also changes the unpaired-electron count and any magnetic-moment question built on it.
- **Reading a periodic-table mass as a mass number.** Cl is listed as 35.45, which is neither an integer nor an $A$ value; $A$ comes from the isotope notation, so $^{35}\mathrm{Cl}$ has $A = 35$ and $N = 18$.
- **Using percent instead of fraction in the weighted average.** 75.77 rather than 0.7577 inflates the answer by 100x, and the abundance fractions not summing to 1 is the one-line check that catches it.
- **Forgetting the Cr and Cu exceptions.** $\mathrm{Cr} = [\mathrm{Ar}]3d^54s^1$ and $\mathrm{Cu} = [\mathrm{Ar}]3d^{10}4s^1$; the aufbau prediction is wrong for exactly these two elements and exam items target them precisely.
- **Photon energy with lambda still in nm.** $E = hc/\lambda$ needs metres, so 486 nm must become $4.86\times10^{-7}$ m or the energy is off by $10^9$ while still looking like a plausible small number.
- **Counting formula units when the question says atoms.** One mole of $\mathrm{Na_2SO_4}$ is $6.022\times10^{23}$ formula units but $7\times6.022\times10^{23}$ atoms; 'how many atoms' means applying the total subscript sum.

## See Also

- [[02_Periodic_Trends]]
- [[03_Chemical_Bonding]]
- [[04_Mole_Concept_and_Stoichiometry]]

---

⬅ *start* · [[_MOC_General_Chemistry|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Periodic_Trends|02 ➡]]
