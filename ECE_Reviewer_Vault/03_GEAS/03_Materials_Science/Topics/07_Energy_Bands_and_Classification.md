---
id: GEAS-03-07
title: "Energy Bands and Classification"
part: "03_GEAS"
area: "03_Materials_Science"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Atomic_Structure_and_Configurations]]"]
tags: ["ece", "geas", "materials_science"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Energy Bands and Classification

> [!abstract] Scope
> Classify a solid as conductor, semiconductor or insulator from its band structure, and compute band-gap energy, cutoff wavelength and carrier concentrations from that structure.

## Core Concept

> [!tip] Intuition
> Bring atoms together and their sharp atomic energy levels smear into bands. Whether the highest filled band is full, partly filled or separated from the next empty band by a wide gap decides everything: metals conduct, semiconductors conduct a little when promoted across a small gap, insulators do not conduct at all.

**How bands form.** An isolated atom has discrete levels. As $N$ atoms approach, each level splits into $N$ closely spaced levels; with $N \sim 10^{23}$ the splitting is so fine that the levels form a quasi-continuous **band**. Core levels stay narrow; the outer valence levels broaden most and overlap into the **valence band** (the highest band that is filled at 0 K) and the **conduction band** (the next band up, empty at 0 K). The **band gap** $E_g$ is the energy interval with no allowed states between them. This is why the valence-electron count per atom, not the atomic mass, decides the electrical class: an even number of valence electrons per atom tends to fill a band exactly, while an odd number leaves a partly filled band.

**The three classes, defined by gap width and by which band is partly filled.** In a **conductor** the valence band is only partially filled (or bands overlap), so there are empty states immediately adjacent to filled ones and an applied field accelerates electrons freely — resistivity is $10^{-8}\ \Omega\mathrm{\cdot m}$ and rises with temperature as lattice vibrations scatter the carriers. In an **insulator** the valence band is completely full, the gap is wide ($E_g > 4\ \mathrm{eV}$, diamond 5.5 eV, fused silica about 9 eV), and thermal energy at 300 K ($kT = 0.026\ \mathrm{eV}$) can promote essentially no electrons. In a **semiconductor** the full/empty structure is the same but the gap is small ($E_g \approx 1.1\ \mathrm{eV}$ for Si, 0.67 eV for Ge, 1.42 eV for GaAs), so a small but usable number of carriers is thermally excited and conductivity rises steeply with temperature. **The distinction between semiconductor and insulator is therefore one of degree, not of kind** — a 0.7 eV gap gives roughly $10^{10}$ times more intrinsic carriers than a 5.5 eV gap at the same temperature.

**Intrinsic conduction and the mass-action law.** In a pure crystal every electron promoted to the conduction band leaves a hole in the valence band, so $n = p = n_i$, with $n_i = \sqrt{N_cN_v}\,e^{-E_g/2kT}$. For silicon at 300 K, $n_i \approx 1.0\times10^{10}\ \mathrm{cm^{-3}}$ — one carrier per $5\times10^{12}$ atoms ($5\times10^{22}$ atoms per cm³ divided by $10^{10}$ carriers), which is why intrinsic silicon is a poor conductor and why doping is essential. The product $np = n_i^2$ is independent of doping (**mass-action law**): adding donors to raise $n$ forces $p$ down by the same factor, which is the entire mechanism of an extrinsic semiconductor.

**Direct and indirect gaps decide the optics.** A **direct** gap (GaAs, InP, GaN) puts the conduction-band minimum directly above the valence-band maximum in $k$-space, so a photon alone can lift an electron. The material absorbs and emits light strongly, and it is used for LEDs and lasers. An **indirect** gap (Si, Ge) puts the minimum at a different $k$, so a phonon must supply the missing momentum; absorption is weak and radiative recombination is very unlikely, which is why silicon is a poor light emitter despite its excellent electronics. The absorption edge wavelength is $\lambda_c = hc/E_g$: 1.12 eV corresponds to $1.11\ \mathrm{\mu m}$, so silicon is blind beyond the near infrared, which is exactly why silicon photodiodes respond from the visible to about 1.1 µm.

**Temperature moves the gap the 'wrong' way and the carriers the 'right' way.** Heating a semiconductor *narrows* the gap because thermal expansion weakens the bonding (Si: about 1.17 eV at 0 K falling to 1.12 eV at 300 K; the Varshni relation $E_g(T) = E_g(0) - \alpha T^2/(T+\beta)$ describes it). The carrier statistics dominate, however, and $n_i$ roughly doubles for every 10 K at room temperature, so resistance falls sharply with heating. A metal does the opposite: its resistivity rises with temperature because the carrier concentration is fixed and only the scattering rate increases. That sign difference is the fastest experimental test for which class a material belongs to.

**The Fermi function and the effective density of states.** $f(E) = 1/\left[1+e^{(E-E_F)/kT}\right]$. At 0 K it is a perfect step: all states below $E_F$ full, all above empty. At room temperature the step is smeared over a few $kT$ (about 0.1 eV). In an intrinsic semiconductor $E_F$ sits near mid-gap, which makes $f(E)$ at the band edges tiny — but the *density of states* is large, and the product is what counts. The Boltzmann approximation $f(E)\approx e^{-(E-E_F)/kT}$ for $E - E_F > 3kT$ gives $n = N_c e^{-(E_c-E_F)/kT}$ with $N_c = 2(2\pi m_n^*kT/h^2)^{3/2}$, about $2.8\times10^{19}\ \mathrm{cm^{-3}}$ for silicon. The approximation fails when the Fermi level comes within about $3kT$ of a band edge, which is precisely the degenerate-doping case.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Band-gap energy from wavelength | $E_g = \frac{hc}{\lambda} = \frac{1.24}{\lambda\ [\mathrm{\mu m}]}\ \mathrm{eV}$ | The 1.24 shortcut uses hc = 1.24 eV·µm. Entering lambda in nm instead of µm makes the gap 1000 times too small. |
| Cutoff wavelength | $\lambda_c = \frac{hc}{E_g} = \frac{1.24}{E_g\ [\mathrm{eV}]}\ \mathrm{\mu m}$ | Longest wavelength that can still create an electron–hole pair. Silicon, Eg = 1.12 eV, gives 1.11 µm; light of longer wavelength passes through unabsorbed. |
| Thermal voltage | $V_T = \frac{kT}{q}$ | 26 mV at 300 K, 25.85 mV exactly; 25.9 mV at 300 K and 26.7 mV at 310 K. Do not round kT to 0.026 eV and then claim three-figure accuracy. |
| Intrinsic carrier concentration | $n_i = \sqrt{N_cN_v}\,e^{-E_g/2kT}$ | Roughly 1.0\times10^{10}\ \mathrm{cm^{-3}} for Si and 2.4\times10^{13}\ \mathrm{cm^{-3}} for Ge at 300 K. The gap enters as Eg/2, not Eg — using Eg makes n_i far too small. |
| Mass-action law | $n\,p = n_i^2$ | Independent of doping at a fixed temperature. Light doping raises n and lowers p by the same factor. |
| Fermi-Dirac distribution | $f(E) = \frac{1}{1+e^{(E-E_F)/kT}}$ | Probability a state at energy E is occupied. At E = E_F it is exactly 0.5 at any temperature. |
| Boltzmann approximation | $f(E) \approx e^{-(E-E_F)/kT}\ \mathrm{for}\ E-E_F > 3kT$ | Valid for non-degenerate material. Fails within about 3kT of a band edge, which is exactly the heavily doped case. |
| Electron concentration (n-type form) | $n = N_c\,e^{-(E_c-E_F)/kT}$ | N_c \approx 2.8\times10^{19}\ \mathrm{cm^{-3}} for silicon. Rearranged, E_c - E_F = kT\ln(N_c/n) gives the Fermi level position. |
| Hole concentration | $p = N_v\,e^{-(E_F-E_v)/kT}$ | N_v \approx 1.04\times10^{19}\ \mathrm{cm^{-3}} for silicon. Note the sign of the exponent: holes increase as E_F moves DOWN toward the valence band. |
| Conductivity | $\sigma = q(n\mu_n + p\mu_p)$ | Mobility in cm^2/(V·s) with n in cm^{-3} gives sigma in (Ohm·cm)^{-1}. For an extrinsic semiconductor only the majority term matters. |
| Resistivity and its temperature coefficient | $\rho = \frac{1}{\sigma} = \frac{1}{q(n\mu_n+p\mu_p)}$ | Metals: rho rises with T. Semiconductors: rho falls with T. The sign of d(rho)/dT is the standard identification test. |
| Class thresholds (room temperature) | $E_g = 0\ \mathrm{(metal)},\ < 3\ \mathrm{eV\ (semiconductor)},\ > 4\ \mathrm{eV\ (insulator)}$ | Indicative, not exact: the real test is whether thermal excitation at 300 K produces a usable carrier density. Diamond at 5.5 eV is the classic insulator example. |
| Band gap versus temperature | $E_g(T) = E_g(0) - \frac{\alpha T^2}{T+\beta}$ | Varshni form. For silicon E_g goes from about 1.17 eV at 0 K to 1.12 eV at 300 K — the gap narrows as the crystal expands, unlike carrier concentration which rises. |

## Worked Problems

### P1. A semiconductor has a band gap of $1.42\ \mathrm{eV}$. Find the longest wavelength of light it can absorb, and state whether the material is a direct or indirect gap semiconductor if it is GaAs.

**Given:** $E_g = 1.42\ \mathrm{eV}$; $h = 6.626\times10^{-34}\ \mathrm{J\cdot s}$; $c = 3\times10^{8}\ \mathrm{m/s}$

**Solution:**

1. λ_c = hc/E_g = (6.626e-34 x 3e8)/(1.42 x 1.602e-19)
2. Numerator = 1.988e-25 J·m; denominator = 2.275e-19 J
3. λ_c = 8.738e-7 m = 874 nm
4. 874 nm lies in the near infrared, just beyond the red end of the visible spectrum
5. GaAs has its conduction-band minimum directly above the valence-band maximum, so it is a direct-gap semiconductor

> [!success]- Answer
> **$\lambda_c = 874\ \mathrm{nm}$; GaAs is direct-gap, which is why it is used for LEDs and laser diodes.**

> [!warning] Trap
> Using $E_g$ in eV without converting to joules. Dividing $hc$ by 1.42 gives an answer in metres that is $1.6\times10^{19}$ times too long. The $1.24/E_g$ shortcut avoids the conversion — remember $hc = 1.24\ \mathrm{eV\cdot\mu m}$.

### P2. Silicon has $E_g = 1.12\ \mathrm{eV}$ and $n_i = 1.0\times10^{10}\ \mathrm{cm^{-3}}$ at 300 K. Find the conductivity of intrinsic silicon given $\mu_n = 1350$ and $\mu_p = 480\ \mathrm{cm^2/(V\cdot s)}$.

**Given:** $E_g = 1.12\ \mathrm{eV}$; $n_i = 1.0\times10^{10}\ \mathrm{cm^{-3}}$; $\mu_n = 1350\ \mathrm{cm^2/(V\cdot s)}$; $\mu_p = 480\ \mathrm{cm^2/(V\cdot s)}$

**Solution:**

1. Intrinsic: n = p = n_i = 1.0e10 cm^-3
2. σ = q(n μ_n + p μ_p) = 1.602e-19 x 1.0e10 x (1350 + 480)
3. Sum of mobilities = 1830 cm^2/(V·s)
4. σ = 1.602e-19 x 1.0e10 x 1830 = 2.93e-6 (Ω·cm)^-1
5. ρ = 1/σ = 3.41e5 Ω·cm

> [!success]- Answer
> **$\sigma = 2.93\times10^{-6}\ (\Omega\mathrm{\cdot cm})^{-1}$, i.e. $\rho = 3.4\times10^{5}\ \Omega\mathrm{\cdot cm}$ — intrinsic silicon is nearly an insulator.**

> [!warning] Trap
> Using only the electron term and dropping the hole term. Holes contribute about 26% of the intrinsic conductivity here; omitting them makes the resistivity 35% too high. It is only in heavily doped n-type material that the hole term becomes genuinely negligible.

### P3. The Fermi level in silicon at 300 K sits $0.25\ \mathrm{eV}$ below the conduction-band edge, and $N_c = 2.8\times10^{19}\ \mathrm{cm^{-3}}$. Determine the electron concentration and state whether the material is degenerate.

**Given:** $E_c - E_F = 0.25\ \mathrm{eV}$; $N_c = 2.8\times10^{19}\ \mathrm{cm^{-3}}$; $kT = 0.02585\ \mathrm{eV}$

**Solution:**

1. n = N_c exp[-(E_c - E_F)/kT]
2. (E_c - E_F)/kT = 0.25/0.02585 = 9.67
3. exp(-9.67) = 6.31e-5
4. n = 2.8e19 x 6.31e-5 = 1.77e15 cm^-3
5. Since E_c - E_F = 9.67 kT is well above 3kT, the Boltzmann approximation is valid and the material is non-degenerate

> [!success]- Answer
> **$n = 1.8\times10^{15}\ \mathrm{cm^{-3}}$, non-degenerate (the Fermi level is $9.7\,kT$ below the band edge).**

> [!warning] Trap
> Writing the exponent as $+0.25/kT$ instead of negative, which gives $4.4\times10^{23}\ \mathrm{cm^{-3}}$ — more electrons than there are silicon atoms ($5\times10^{22}\ \mathrm{cm^{-3}}$). Any carrier concentration above the atomic density is impossible and signals a sign error.

### P4. Undoped silicon at 300 K has $n_i = 1.0\times10^{10}\ \mathrm{cm^{-3}}$ and $N_c = 2.8\times10^{19}\ \mathrm{cm^{-3}}$. Locate the Fermi level relative to the conduction-band edge, and state what fraction of the states at $E_c$ are occupied.

**Given:** $n_i = 1.0\times10^{10}\ \mathrm{cm^{-3}}$; $N_c = 2.8\times10^{19}\ \mathrm{cm^{-3}}$; $kT = 0.02585\ \mathrm{eV}$

**Solution:**

1. n = N_c exp[-(E_c - E_F)/kT], so E_c - E_F = kT ln(N_c/n)
2. N_c/n = 2.8e19/1.0e10 = 2.8e9
3. ln(2.8e9) = 21.75
4. E_c - E_F = 0.02585 x 21.75 = 0.562 eV
5. f(E_c) ≈ exp(-21.75) = 3.6e-10, so about one state in 3 billion is occupied

> [!success]- Answer
> **$E_F$ lies $0.562\ \mathrm{eV}$ below $E_c$ in intrinsic silicon at 300 K — essentially mid-gap; only $3.6\times10^{-10}$ of the states at the band edge are occupied.**

> [!warning] Trap
> Reporting $E_F$ as $0.562\ \mathrm{eV}$ *above* $E_c$, or as an absolute energy. The Fermi level is only meaningful as an offset from a band edge (or as an absolute energy on the vacuum scale); a bare number with the wrong sign places the material as heavily degenerate when it is in fact intrinsic.

### P5. Intrinsic silicon at 300 K has $n_i = 1.0\times10^{10}\ \mathrm{cm^{-3}}$. Phosphorus is added to a concentration of $5\times10^{16}\ \mathrm{cm^{-3}}$ and is fully ionised. Find the electron and hole concentrations and the conductivity, with $\mu_n = 1350$ and $\mu_p = 480\ \mathrm{cm^2/(V\cdot s)}$.

**Given:** $n_i = 1.0\times10^{10}\ \mathrm{cm^{-3}}$; $N_D = 5\times10^{16}\ \mathrm{cm^{-3}}$; $\mu_n = 1350$, $\mu_p = 480\ \mathrm{cm^2/(V\cdot s)}$

**Solution:**

1. Majority carriers: n ≈ N_D = 5e16 cm^-3 (donor level is shallow, fully ionised at 300 K)
2. Mass action: p = n_i^2/n = (1.0e10)^2/5e16 = 1.0e20/5e16
3. p = 2.0e3 cm^-3
4. σ ≈ q n μ_n = 1.602e-19 x 5e16 x 1350 = 10.8 (Ω·cm)^-1
5. ρ = 1/10.8 = 0.0926 Ω·cm

> [!success]- Answer
> **$n = 5\times10^{16}\ \mathrm{cm^{-3}}$, $p = 2.0\times10^{3}\ \mathrm{cm^{-3}}$, $\sigma = 10.8\ (\Omega\mathrm{\cdot cm})^{-1}$ ($\rho = 0.093\ \Omega\mathrm{\cdot cm}$).**

> [!warning] Trap
> Computing $p$ by subtracting: $p = N_D - n_i$. The correct relation is the *product* $np = n_i^2$, so $p$ falls by seven orders of magnitude, not by $N_D$. Also resist the urge to add the hole term back in — it changes $\sigma$ by less than $10^{-11}$.

## Traps & Exam Notes

- **Confusing $kT$ in eV with $kT/q$ in volts.** $kT = 0.0259\ \mathrm{eV}$ and $V_T = kT/q = 25.9\ \mathrm{mV}$ are the same physical quantity in different dress. Using 0.0259 as a voltage in $\sigma = qn\mu$ or using 25.9 mV as an energy in an exponential both give answers wrong by many orders of magnitude.
- **Using $E_g$ instead of $E_g/2$ in the intrinsic-carrier exponential.** $n_i \propto e^{-E_g/2kT}$ because creating a pair costs one gap shared between two carriers. Doubling the exponent makes $n_i$ for silicon come out near $3\ \mathrm{cm^{-3}}$ instead of $10^{10}$ — wrong by a factor of about $4\times10^{9}$, so every downstream conductivity and leakage estimate is useless.
- **Reporting a carrier concentration above the atomic density.** Silicon has about $5\times10^{22}$ atoms per cm³. Any computed $n$ larger than that means a sign error in the Fermi exponent, not a new material.
- **Saying silicon conducts better than germanium because its gap is larger.** Larger gap means fewer thermally generated carriers, so intrinsic silicon is the poorer conductor ($n_i = 10^{10}$ against $2.4\times10^{13}\ \mathrm{cm^{-3}}$). Silicon wins in devices because its oxide is excellent and its leakage is low, not because of higher intrinsic conductivity.
- **Treating the semiconductor/insulator line as a fixed gap value.** A 2.5 eV gap material is a semiconductor only if it can be doped and if $kT$ is not negligible against the gap. At 1000 K, $kT = 0.086\ \mathrm{eV}$ and a 2.5 eV material has acquired a great many carriers.
- **Applying the Boltzmann approximation in degenerate material.** $f(E) \approx e^{-(E-E_F)/kT}$ requires $E - E_F > 3kT$. Heavy doping pushes $E_F$ to within a few $kT$ of the band edge (or inside the band), where the exact Fermi function must be used and $n$ saturates rather than growing exponentially.
- **Forgetting the phonon in an indirect-gap transition.** Silicon cannot absorb a photon at exactly $E_g$ because crystal momentum must also be conserved; the true absorption edge is slightly above $E_g$ and the process is weak. Quoting the same sharp absorption strength for Si and GaAs is a physics error, and it is why silicon is not an LED material.

## See Also

- [[08_Fermi_Level]]
- [[09_Dielectric_Properties_and_Breakdown]]
- [[10_Magnetic_Properties_and_Hysteresis]]

---

[[06_Hardness_Testing|⬅ 06]] · [[_MOC_Materials_Science|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Fermi_Level|08 ➡]]
