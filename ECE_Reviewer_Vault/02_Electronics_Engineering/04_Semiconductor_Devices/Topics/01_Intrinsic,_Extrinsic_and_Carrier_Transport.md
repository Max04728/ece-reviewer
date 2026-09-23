---
id: ECE-04-01
title: "Intrinsic, Extrinsic and Carrier Transport"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Intrinsic, Extrinsic and Carrier Transport

> [!abstract] Scope
> Predict the equilibrium electron and hole concentrations of intrinsic and doped silicon at a given temperature, and compute the drift and diffusion currents and Hall voltage those carriers produce.

## Core Concept

> [!tip] Intuition
> Doping sets one carrier type, and the mass-action law forces the other to shrink by the same ratio, so a doped sample has a huge majority population and a vanishing minority one. Current then appears in two flavours: drift, where an electric field pushes carriers, and diffusion, where a concentration gradient pushes them.

**Intrinsic material and the mass-action law.** A pure semiconductor at absolute zero is an insulator; thermal energy breaks covalent bonds and creates electron-hole pairs. At 300 K silicon has $n_i = 1.5\times10^{10}\ \mathrm{cm^{-3}}$ and germanium about $2.4\times10^{13}\ \mathrm{cm^{-3}}$, the difference coming almost entirely from silicon's larger bandgap ($E_g = 1.12\ \mathrm{eV}$ against $0.66\ \mathrm{eV}$). In intrinsic material every electron has a partner hole, so $n_0 = p_0 = n_i$. Far more useful is the **law of mass action**, $n_0p_0 = n_i^{2}$, which holds at equilibrium for *any* doping level: it is a statement about the generation-recombination balance, not about purity. Because $n_i^{2} = N_CN_Ve^{-E_g/(kT)}$, the intrinsic concentration is violently temperature dependent — it roughly doubles every $10\ \mathrm{^\circ C}$ — while the doping you implant does not change with temperature at all.

**Extrinsic material.** A group-V donor (P, As, Sb) contributes a loosely bound electron and makes n-type material; a group-III acceptor (B, Al, Ga) contributes a hole and makes p-type material. Donor and acceptor levels sit within about $0.05\ \mathrm{eV}$ of a band edge, so at room temperature they are essentially fully ionised: $n_0 \approx N_D$ for n-type and $p_0 \approx N_A$ for p-type. The minority carrier then follows from mass action, $p_0 = n_i^{2}/N_D$, which is why one decade of extra doping costs the minority carriers exactly one decade. With both dopants present (compensation), charge neutrality gives $n_0 \approx N_D - N_A$ and the material type follows the *net* doping. Notice the leverage: going from $n_i = 1.5\times10^{10}$ to $N_D = 10^{16}$ raises the majority count by six decades and drops the minority count by six decades, to $2.25\times10^{4}\ \mathrm{cm^{-3}}$.

**Drift: conductivity, mobility and resistivity.** An applied field $E$ superimposes a small directed velocity on the random thermal motion: $v_d = \mu E$, with $\mu$ the mobility in $\mathrm{cm^2/(V\cdot s)}$. Silicon at low doping gives $\mu_n = 1350$ and $\mu_p = 480\ \mathrm{cm^2/(V\cdot s)}$ — electrons are about 2.8 times more mobile because their effective mass is smaller. Both carrier types contribute to the conductivity, $\sigma = q(n\mu_n + p\mu_p)$, and the resistivity is $\rho = 1/\sigma$. In a doped sample the majority term is normally 5 or more decades larger than the minority term, so $\sigma \approx qN_D\mu_n$ is an excellent approximation; only in near-intrinsic material must both terms be kept. Mobility is *not* a constant: above about $10^{17}\ \mathrm{cm^{-3}}$ ionised-impurity scattering cuts it down, and above $E \approx 10^{4}\ \mathrm{V/cm}$ the drift velocity saturates near $10^{7}\ \mathrm{cm/s}$ as optical-phonon scattering takes over.

**Diffusion, the Einstein relation and the Hall effect.** Whenever carriers are injected or depleted they flow down their concentration gradient, $J_{diff} = qD_n\,dn/dx - qD_p\,dp/dx$, with no field required. The bridge between the two transport mechanisms is the Einstein relation $D/\mu = kT/q = V_T$ (about $26\ \mathrm{mV}$ at 300 K), so $D_n = \mu_nV_T = 35.1\ \mathrm{cm^2/s}$. Diffusion is the engine of the PN junction and of every diode equation (see [[02_PN_Junction_and_Depletion_Region]]). Finally, the Hall effect exposes both the density and the sign of the dominant carrier: a current $I$ along $x$ in a wafer of thickness $t$ with a field $B$ along $z$ develops $V_H = IB/(qnt)$ across the third dimension. A negative Hall voltage identifies electrons; its magnitude gives $n$ directly, which is how mobility is measured in the first place.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Law of mass action | $n_0 p_0 = n_i^{2}$ | Equilibrium only. Holds at any doping level; breaks down under injection (forward-biased junction) or illumination. |
| Intrinsic carrier concentration | $n_i^{2} = N_C N_V e^{-E_g/(kT)}$ | Si: n_i = 1.5e10 /cm^3 and Ge: 2.4e13 /cm^3 at 300 K. Roughly doubles per 10 C, so n_i^2 rises about 4x per 10 C. |
| n-type majority and minority | $n_0 \approx N_D, \qquad p_0 = \frac{n_i^{2}}{N_D}$ | Valid at room temperature when N_D >> n_i (say N_D >= 100 n_i). Fails at high temperature, where n_i overtakes the doping. |
| p-type majority and minority | $p_0 \approx N_A, \qquad n_0 = \frac{n_i^{2}}{N_A}$ | Same conditions. For compensated material replace N_A by the net doping \|N_D - N_A\|. |
| Conductivity | $\sigma = q\left(n\mu_n + p\mu_p\right) = \frac{1}{\rho}$ | Gives S/cm when n, p are in cm^-3 and mobility in cm^2/(V.s). Never mix cm^-3 with m^2/(V.s). |
| Drift current density | $J_{drift} = \sigma E = q\left(n\mu_n + p\mu_p\right)E$ | Ohmic only while mu is field-independent, i.e. below E ~ 1e4 V/cm in Si. |
| Drift velocity | $v_d = \mu E$ | Average directed velocity, not the thermal speed (~1e7 cm/s) and not the signal speed. Saturates near 1e7 cm/s. |
| Diffusion current density | $J_{diff} = q D_n \frac{dn}{dx} - q D_p \frac{dp}{dx}$ | Flows with no field present. The two terms oppose because electrons and holes carry opposite charge. |
| Einstein relation | $\frac{D_n}{\mu_n} = \frac{D_p}{\mu_p} = V_T = \frac{kT}{q}$ | V_T = 26 mV at 300 K, so D_n = 35.1 and D_p = 12.5 cm^2/s. Uses the thermal voltage, never the applied diode voltage. |
| Hall voltage | $V_H = \frac{I B}{q n t}$ | t = wafer thickness measured along B. Use SI consistently or the answer is off by 1e6 (cm^-3 vs m^-3). |

## Worked Problems

### P1. A silicon sample at 300 K is doped with phosphorus at $N_D = 1\times10^{16}\ \mathrm{cm^{-3}}$. Find the equilibrium electron and hole concentrations and state the material type.

**Given:** Nd = 1e16 cm^-3; ni = 1.5e10 cm^-3; T = 300 K

**Solution:**

1. Since $N_D \gg n_i$, every donor is ionised at 300 K: $n_0 \approx N_D = 1\times10^{16}\ \mathrm{cm^{-3}}$.
2. Mass action: $p_0 = n_i^{2}/n_0$, and $n_i^{2} = (1.5\times10^{10})^{2} = 2.25\times10^{20}\ \mathrm{cm^{-6}}$.
3. $p_0 = 2.25\times10^{20} / 1\times10^{16} = 2.25\times10^{4}\ \mathrm{cm^{-3}}$.
4. Electrons outnumber holes by $4.4\times10^{11}$, so the sample is n-type.

> [!success]- Answer
> **n0 = 1.0e16 cm^-3 (majority electrons), p0 = 2.25e4 cm^-3 (minority holes); n-type.**

> [!warning] Trap
> Using $p_0 = n_i/N_D$ instead of $n_i^{2}/N_D$: that gives $1.5\times10^{-6}\ \mathrm{cm^{-3}}$, wrong by ten orders of magnitude. Equally wrong is writing $n_0 = n_i + N_D$; the intrinsic contribution is negligible, and the minority value is set by $n_i^{2}$, not by subtracting.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(1.5E10)²÷1E16` → **2.25e4** cm⁻³ = $p_0$; the majority is $n_0 = N_D$ = **1.0e16** cm⁻³.
> 2. `1E16÷2.25E4` → **4.44e11**, so electrons dominate: n-type.
>
> Square $n_i$ before dividing — using $n_i/N_D$ is ten orders of magnitude too small.

### P2. For the same $N_D = 1\times10^{16}\ \mathrm{cm^{-3}}$ silicon sample, find the conductivity and resistivity. State whether the hole term matters.

**Given:** n0 = 1e16 cm^-3; p0 = 2.25e4 cm^-3; mu_n = 1350 cm^2/V.s; mu_p = 480 cm^2/V.s; q = 1.602e-19 C

**Solution:**

1. Compare the two terms: $n_0\mu_n = (10^{16})(1350) = 1.35\times10^{19}$ and $p_0\mu_p = (2.25\times10^{4})(480) = 1.08\times10^{7}$, a ratio of $1.25\times10^{12}$.
2. Drop the hole term: $\sigma \approx q n_0 \mu_n = (1.602\times10^{-19})(10^{16})(1350)$.
3. $\sigma = 2.16\ (\Omega\cdot\mathrm{cm})^{-1}$.
4. $\rho = 1/\sigma = 0.462\ \Omega\cdot\mathrm{cm} = 4.62\times10^{-3}\ \Omega\cdot\mathrm{m}$.

> [!success]- Answer
> **sigma = 2.16 S/cm; rho = 0.462 ohm.cm = 4.62e-3 ohm.m.**

> [!warning] Trap
> Unit mixing. cm^-3 with cm^2/(V.s) returns S/cm, so 2.16 is *not* 2.16 S/m; converting the concentration to m^-3 while leaving the mobility in cm^2/(V.s) gives 216, a hundredfold error. The shortcut of dropping the hole term is safe only here, where p0 is twelve decades below n0.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `23` `×1E16×1350` → **2.1627** S/cm = $\sigma$; the hole term is 12 decades smaller, so it is dropped.
> 2. `1÷Ans` → **0.4624** $\Omega\cdot\mathrm{cm}$ = **4.62e-3** $\Omega\cdot\mathrm{m}$.
>
> cm⁻³ with cm²/(V·s) returns S/cm, not S/m — convert the mobility too if you convert the doping.

### P3. Find the conductivity and resistivity of pure (intrinsic) silicon at 300 K and compare it with the doped sample above.

**Given:** ni = 1.5e10 cm^-3; mu_n = 1350 cm^2/V.s; mu_p = 480 cm^2/V.s

**Solution:**

1. Intrinsic material has both carrier types present: $\sigma_i = qn_i(\mu_n + \mu_p)$.
2. $\mu_n + \mu_p = 1350 + 480 = 1830\ \mathrm{cm^2/(V\cdot s)}$.
3. $\sigma_i = (1.602\times10^{-19})(1.5\times10^{10})(1830) = 4.40\times10^{-6}\ (\Omega\cdot\mathrm{cm})^{-1}$.
4. $\rho_i = 1/\sigma_i = 2.27\times10^{5}\ \Omega\cdot\mathrm{cm} = 2270\ \Omega\cdot\mathrm{m}$.
5. Ratio: $\sigma_{doped}/\sigma_i = 2.16/4.40\times10^{-6} = 4.9\times10^{5}$.

> [!success]- Answer
> **sigma_i = 4.40e-6 S/cm, rho_i = 2.27e5 ohm.cm; doping at 1e16 raised the conductivity by a factor of 4.9e5.**

> [!warning] Trap
> Using only the electron mobility. Intrinsic silicon has equal electron and hole populations, so the hole term contributes $480/1830 = 26\%$ of the total; dropping it makes $\sigma_i$ 26% too small and $\rho_i$ 35% too large.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `23` `×1.5E10×(1350+480)` → **4.3975e-6** S/cm = $\sigma_i$; store with `SHIFT` `STO` `A`.
> 2. `1÷A` → **2.274e5** $\Omega\cdot\mathrm{cm}$; `2.1627÷A` → **4.92e5**, the conductivity gain from doping.
>
> The hole term is 26 % of the intrinsic sum, so $\mu_n+\mu_p$ is mandatory here.

### P4. Use the Einstein relation to find the diffusion constants of electrons and holes in silicon at 300 K from their mobilities, and check the result against $kT/q = 25.85\ \mathrm{mV}$.

**Given:** mu_n = 1350 cm^2/V.s; mu_p = 480 cm^2/V.s; V_T = 26 mV (300 K)

**Solution:**

1. $D_n = \mu_n V_T = (1350)(0.026) = 35.1\ \mathrm{cm^2/s}$.
2. $D_p = \mu_p V_T = (480)(0.026) = 12.5\ \mathrm{cm^2/s}$.
3. Exact check: $kT/q = (1.38\times10^{-23})(300)/(1.602\times10^{-19}) = 0.02585\ \mathrm{V}$.
4. That gives $D_n = 34.9$ and $D_p = 12.4\ \mathrm{cm^2/s}$ — a 0.6% difference from the 26 mV shortcut.

> [!success]- Answer
> **Dn = 35.1 cm^2/s, Dp = 12.5 cm^2/s (34.9 and 12.4 using kT/q = 25.85 mV).**

> [!warning] Trap
> Substituting the applied diode voltage or a bias value for $V_T$. The Einstein relation is $D/\mu = kT/q$ and nothing else; it also drifts with temperature (about 30 mV at 75 C), so both D and the diffusion current grow as the device heats.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `25` `×300÷` `SHIFT` `CVALUE` `23` → **2.5852e-2** V, store it with `SHIFT` `STO` `A` (25 is $k$, 23 is $q$).
> 2. `A×1350` → **34.90** cm²/s = $D_n$ and `A×480` → **12.41** cm²/s = $D_p$.
>
> The 26 mV shortcut returns 35.1 and 12.5; the exact $kT/q$ is 25.85 mV.

### P5. In the $N_D = 1\times10^{16}\ \mathrm{cm^{-3}}$ wafer, (i) find the electron drift velocity for $E = 100\ \mathrm{V/cm}$ and (ii) find the Hall voltage when $I = 1\ \mathrm{mA}$ flows through a wafer $0.5\ \mathrm{mm}$ thick in a perpendicular $B = 0.2\ \mathrm{T}$.

**Given:** E = 100 V/cm; mu_n = 1350 cm^2/V.s; n = 1e16 cm^-3 = 1e22 m^-3; I = 1 mA; B = 0.2 T; t = 0.5 mm

**Solution:**

1. $v_d = \mu_n E = (1350)(100) = 1.35\times10^{5}\ \mathrm{cm/s} = 1350\ \mathrm{m/s}$.
2. Convert to SI for the Hall calculation: $n = 1\times10^{22}\ \mathrm{m^{-3}}$ and $t = 5\times10^{-4}\ \mathrm{m}$.
3. $qnt = (1.602\times10^{-19})(1\times10^{22})(5\times10^{-4}) = 0.801\ \mathrm{C/m^{2}}$.
4. $V_H = IB/(qnt) = (1\times10^{-3})(0.2)/0.801 = 2.50\times10^{-4}\ \mathrm{V}$.
5. Sign: $\vec{v}\times\vec{B}$ pushes electrons toward one face, leaving it negative — a negative Hall voltage is the signature of n-type material.

> [!success]- Answer
> **vd = 1.35e5 cm/s (1350 m/s); VH = 0.25 mV, negative on the face the electrons are deflected toward.**

> [!warning] Trap
> Mixing cm^-3 with metres in $V_H = IB/(qnt)$: n = 1e16 with t in metres makes the Hall voltage $10^{6}$ times too large. Also, $v_d = \mu E$ is not the signal speed — carriers crawl at metres per second while the field change travels at nearly $c$ — and it only holds below velocity saturation (about $10^{4}\ \mathrm{V/cm}$ in Si).

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1350×100` → **1.35e5** cm/s = **1350** m/s.
> 2. `1E-3×0.2÷(` `SHIFT` `CVALUE` `23` `×1E22×5E-4)` → **2.497e-4** V = **0.25** mV.
>
> Put n in m⁻³ and t in m first; leaving n in cm⁻³ inflates $V_H$ by 10⁶.

## Traps & Exam Notes

- **Squaring the wrong quantity in the mass-action law.** $p_0 = n_i^{2}/N_D$ needs $n_i^{2} = 2.25\times10^{20}\ \mathrm{cm^{-6}}$; substituting $n_i = 1.5\times10^{10}$ alone gives an answer that is off by ten orders of magnitude and always too small.
- **Mixing /cm^3 with /m^3.** $\sigma = q(n\mu_n + p\mu_p)$ returns S/cm only when the concentrations are in cm^-3 *and* the mobilities are in cm^2/(V.s). If you convert one, convert both, including the mobility (1 cm^2/(V.s) = 1e-4 m^2/(V.s)).
- **Treating mobility as a constant.** The 1350/480 figures are low-doping values. Above about $10^{17}\ \mathrm{cm^{-3}}$ impurity scattering halves them, so a heavily doped sample conducts far less than $qN_D\mu$ predicts and the resistivity stops falling with doping.
- **Forgetting how fast n_i moves with temperature.** $n_i$ doubles roughly every $10\ \mathrm{^\circ C}$, so $n_i^{2}$ grows about fourfold per $10\ \mathrm{^\circ C}$. At $100\ \mathrm{^\circ C}$ ($\approx 7$ doublings) $n_i$ is about 128 times larger and $n_i^{2}$ about 16000 times larger — a lightly doped sample loses its extrinsic behaviour and becomes intrinsic-dominated, which is why leakage doubles every 10 C.
- **Confusing drift with diffusion.** Drift requires a field and obeys $J = \sigma E$; diffusion requires a gradient and obeys $J = qD\,dn/dx$ with no field at all. The Einstein relation bridges them and uses the *thermal* voltage, so quoting 0.7 V or a bias voltage there is a category error.

## See Also

- [[02_PN_Junction_and_Depletion_Region]]
- [[03_Diode_Characteristics_and_Shockley]]

---

⬅ *start* · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[02_PN_Junction_and_Depletion_Region|02 ➡]]
