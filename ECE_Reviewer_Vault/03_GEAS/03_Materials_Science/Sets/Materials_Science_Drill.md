---
title: "Materials Science — Drill"
type: drill
area: 03_Materials_Science
part: 03_GEAS
seed: 1
count: 8
pool: 45
updated: 2026-09-23
---

# Materials Science — Practice Drill

**8 problems** drawn from a pool of 45 across 8 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 03_Materials_Science --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. An FCC metal is measured with a lattice parameter $a = 3.517\ \hat{A}$ and a density of $8.86\ \mathrm{g/cm^3}$ ($A = 58.69\ \mathrm{g/mol}$). Reconcile the two measurements and state the density deficit as a percentage.

**Given:** FCC, $n = 4$; $a = 3.517\ \hat{A}$; $A = 58.69\ \mathrm{g/mol}$; $\rho_{meas} = 8.86\ \mathrm{g/cm^3}$

> [!success]- Answer
> **$\rho_{th} = 8.96\ \mathrm{g/cm^3}$ against $8.86\ \mathrm{g/cm^3}$ measured: a deficit of about **1.1%**, consistent with roughly 1% vacant sites.**

> [!warning] Trap
> Dividing by the measured value instead of the theoretical one. The vacancy fraction is defined against the *perfect-crystal* baseline; dividing by $\rho_{meas}$ inflates the fraction by the same 1% and, in cases with a large deficit, visibly shifts the answer.

<sub>from GEAS-03-02</sub>

### 2. Silicon has $E_g = 1.12\ \mathrm{eV}$ and $n_i = 1.0\times10^{10}\ \mathrm{cm^{-3}}$ at 300 K. Find the conductivity of intrinsic silicon given $\mu_n = 1350$ and $\mu_p = 480\ \mathrm{cm^2/(V\cdot s)}$.

**Given:** $E_g = 1.12\ \mathrm{eV}$; $n_i = 1.0\times10^{10}\ \mathrm{cm^{-3}}$; $\mu_n = 1350\ \mathrm{cm^2/(V\cdot s)}$; $\mu_p = 480\ \mathrm{cm^2/(V\cdot s)}$

> [!success]- Answer
> **$\sigma = 2.93\times10^{-6}\ (\Omega\mathrm{\cdot cm})^{-1}$, i.e. $\rho = 3.4\times10^{5}\ \Omega\mathrm{\cdot cm}$ — intrinsic silicon is nearly an insulator.**

> [!warning] Trap
> Using only the electron term and dropping the hole term. Holes contribute about 26% of the intrinsic conductivity here; omitting them makes the resistivity 35% too high. It is only in heavily doped n-type material that the hole term becomes genuinely negligible.

<sub>from GEAS-03-07</sub>

### 3. A plane in a cubic crystal cuts the axes at $x = a$, $y = a/2$ and $z = a$. Write its indices, then write the indices of the plane parallel to it that passes through the origin of the next cell.

**Given:** intercepts: $a$, $a/2$, $a$

> [!success]- Answer
> **The given plane is $(121)$; the parallel plane through the origin is $(1\bar{2}1)$.**

> [!warning] Trap
> Trying to index a plane through the origin from its 'intercepts' and getting $(000)$. A plane through the origin has no finite intercepts in that frame — you must shift the origin to a neighbouring lattice point and re-read, which usually introduces a bar index.

<sub>from GEAS-03-03</sub>

### 4. A metal crystallises in the simple cubic structure with $a = 3.00\ \hat{A}$. Find its atomic radius, its atomic packing factor and the percentage of the cell that is empty space.

**Given:** SC; $a = 3.00\ \hat{A}$

> [!success]- Answer
> **$R = 1.50\ \hat{A}$, APF $= 0.524$ (52.4% filled), 47.6% void.**

> [!warning] Trap
> Quoting APF $= 0.68$ from BCC memory. For SC the packing is $\pi/6 \approx 0.52$; the 0.68 value belongs to BCC and 0.74 to FCC/HCP.

<sub>from GEAS-03-01</sub>

### 5. Tungsten is BCC with $a = 3.165\ \hat{A}$ and $A = 183.84\ \mathrm{g/mol}$. Confirm the atomic radius from the BCC contact geometry, then determine the theoretical density.

**Given:** BCC, $n = 2$; $a = 3.165\ \hat{A}$; $A = 183.84\ \mathrm{g/mol}$

> [!success]- Answer
> **$R = 1.370\ \hat{A}$ and $\rho = 19.25\ \mathrm{g/cm^3}$ (handbook 19.3 g/cm³).**

> [!warning] Trap
> Using $R = a/2$ gives $1.583\ \hat{A}$, and then applying the FCC radius relation $a = 4R/\sqrt{2}$ to check it 'closes' the wrong way. Fix the structure first, then pick the one contact relation that belongs to it.

<sub>from GEAS-03-02</sub>

### 6. Iron transforms from BCC ($a = 2.866\ \hat{A}$, $A = 55.85$) to FCC ($a = 3.591\ \hat{A}$) above $912\ ^\circ\mathrm{C}$. Compute both theoretical densities and state which phase is denser, and by what percentage.

**Given:** BCC: $n = 2$, $a = 2.866\ \hat{A}$; FCC: $n = 4$, $a = 3.591\ \hat{A}$; $A = 55.85\ \mathrm{g/mol}$

> [!success]- Answer
> **$\rho_{BCC} = 7.88\ \mathrm{g/cm^3}$, $\rho_{FCC} = 8.01\ \mathrm{g/cm^3}$; FCC is denser by $\approx 1.7\%$.**

> [!warning] Trap
> Asserting FCC must be denser because its packing factor is higher. APF is higher (0.74 vs 0.68) but the FCC lattice parameter is larger, so the *density* gain is only about 1.7% — a small margin that a sloppy $a$ value easily reverses.

<sub>from GEAS-03-01</sub>

### 7. A plane in a cubic crystal cuts the $x$ axis at $a/2$, the $y$ axis at $a/3$, and is parallel to the $z$ axis. Determine its Miller indices.

**Given:** intercepts: $x = a/2$, $y = a/3$, $z = \infty$

> [!success]- Answer
> **$(230)$.**

> [!warning] Trap
> Taking the intercepts directly as $(\frac{1}{2}\frac{1}{3}0)$ and clearing fractions to $(130)$-style answers. Miller indices are *reciprocals* of the intercepts; skipping the reciprocal inverts the plane.

<sub>from GEAS-03-03</sub>

### 8. A ceramic dielectric has $\varepsilon_r = 1200$ and $E_{bd} = 8.0\ \mathrm{MV/m}$. A capacitor is built with a dielectric thickness of $50\ \mathrm{\mu m}$ and an active area of $2.0\ \mathrm{cm^2}$. Find the capacitance, the maximum working voltage and the maximum stored energy.

**Given:** $\varepsilon_r = 1200$; $E_{bd} = 8.0\ \mathrm{MV/m}$; $d = 50\ \mathrm{\mu m}$; $A = 2.0\ \mathrm{cm^2}$

> [!success]- Answer
> **$C = 42.5\ \mathrm{nF}$, $V_{max} = 400\ \mathrm{V}$ and $U_{max} = 3.4\ \mathrm{mJ}$ (energy density $U/V_{diel} = 3.4\times10^{-3}/1.0\times10^{-8} = 3.4\times10^{5}\ \mathrm{J/m^3}$, which is $\frac{1}{2}\varepsilon_r\varepsilon_0E_{bd}^2$).**

> [!warning] Trap
> Dividing by $d$ in micrometres ($50$ instead of $50\times10^{-6}$) or by $A$ in $\mathrm{cm^2}$. Either slip changes $C$ by a factor of $10^{4}$–$10^{6}$ and turns a nanofarad capacitor into a farad-sized nonsense answer. Convert both to SI before substituting.

<sub>from GEAS-03-09</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| GEAS-03-01 | Crystal Structures and Unit Cells | 10 |
| GEAS-03-02 | Atomic Packing Factor and Density | 5 |
| GEAS-03-03 | Miller Indices | 5 |
| GEAS-03-05 | Stress, Strain and Mechanical Properties | 5 |
| GEAS-03-07 | Energy Bands and Classification | 5 |
| GEAS-03-08 | Fermi Level | 5 |
| GEAS-03-09 | Dielectric Properties and Breakdown | 5 |
| GEAS-03-10 | Magnetic Properties and Hysteresis | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
