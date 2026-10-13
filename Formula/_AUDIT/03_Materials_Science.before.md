---
title: Materials Science
part: GEAS
tags: [ece, geas, formula-sheet]
topics: 13
---

## Part A — Crystal Structure

### 1. Crystal Structures and Unit Cells

![](https://www.youtube.com/watch?v=HCWwRh5CXYU)

*Video: Unit Cells: Simple Cubic, BCC and FCC — The Organic Chemistry Tutor, 17:22*

**Unit-cell geometry ★** — $a$ in m (or nm), $r$ = atomic radius, $n$ = atoms per cell (dimensionless).

$$\text{SC: } a = 2r,\quad n = 1 \qquad \text{BCC: } a = \frac{4r}{\sqrt3},\quad n = 2 \qquad \text{FCC: } a = \frac{4r}{\sqrt2},\quad n = 4$$

$$\text{HCP: } c/a = 1.633,\quad n = 6,\qquad V_{\text{cell}} = a^2c\sin 120^\circ$$

**Structure comparison ★**

| Property | SC | BCC | FCC | HCP |
|---|---|---|---|---|
| Atoms per cell | 1 | 2 | 4 | 6 |
| Coordination number | 6 | 8 | 12 | 12 |
| APF | 0.52 | 0.68 | 0.74 | 0.74 |
| $a$ vs $r$ | $2r$ | $\frac{4r}{\sqrt3}$ | $\frac{4r}{\sqrt2}$ | $a = 2r$ |
| Example | Po | Fe($\alpha$), W | Cu, Al, Au | Mg, Zn, Ti |

**Coordination and density relations**

$$\text{CN} = 6\ (SC),\ 8\ (BCC),\ 12\ (FCC/HCP),\qquad \text{Density } \rho = \frac{nA}{V_cN_A}\ \text{(g/cm}^3\text{)}$$

**Conditions:** hard-sphere model, spheres touching along the close-packed direction; $A$ in g/mol, $V_c$ in cm³, $N_A = 6.022\times10^{23}$ mol⁻¹.

> [!tip] High-yield ★
> Remember the coordination numbers 6–8–12 and the APF 0.52–0.68–0.74: FCC and HCP are both close-packed at 0.74, which is the maximum possible for equal spheres.

---

### 2. Atomic Packing Factor and Density

![](https://www.youtube.com/watch?v=-wqGxHQksSQ)

*Video: Atomic Packing Factor of FCC and BCC Unit Cells — easyedu, 5:26*

**Atomic packing factor ★** — $V_{\text{atoms}}$ = sphere volume, $V_{\text{cell}}$ = unit-cell volume, both in m³.

$$\text{APF} = \frac{n\cdot\frac43\pi r^3}{V_{\text{cell}}} = \frac{V_{\text{atoms}}}{V_{\text{cell}}}\quad \text{(dimensionless)}$$

**Per-structure results**

$$\text{APF}_{SC} = \frac{\pi}{6} = 0.52,\qquad \text{APF}_{BCC} = \frac{\pi\sqrt3}{8} = 0.68,\qquad \text{APF}_{FCC} = \frac{\pi\sqrt2}{6} = 0.74$$

**Theoretical density and porosity** — $\rho$ in g/cm³, $n$ atoms/cell, $A$ in g/mol.

$$\rho = \frac{nA}{V_cN_A},\qquad \%\text{porosity} = \left(1 - \frac{\rho_{\text{measured}}}{\rho_{\text{theoretical}}}\right)\times100$$

**Linear and planar density (BCC, FCC)**

$$\text{LD}_{[100]} = \frac{1}{a}\ \text{(SC)},\qquad \text{PLD}_{(111)\,\text{FCC}} = \frac{4}{\sqrt3 a^2} = \frac{2}{4r^2\sqrt3}$$

**Conditions:** perfect single crystal, no vacancies or interstitial solutes, atoms as incompressible spheres of a single radius; real metallic densities run 1–3% low.

> [!warning] Exam trap
> APF uses the **full sphere** volume for every atom but counts each corner atom as $\frac18$ and each face atom as $\frac12$. Using $n = 4$ spheres and the full cell volume directly gives 4× the wrong answer for FCC.

---

### 3. Miller Indices

![](https://www.youtube.com/watch?v=SelyoeEkRXs)

*Video: Labelling and Drawing Crystal Planes with Miller Indices — Taylor Sparks, 9:15*

**Procedure:** take intercepts $\frac{x}{a},\frac{y}{b},\frac{z}{c}$ → invert → clear fractions → reduce to smallest integers $(hkl)$ → enclose in parentheses, negatives get a bar.
**Interplanar spacing ★** — $d_{hkl}$ in m, $a$ = lattice parameter in m.

$$d_{hkl} = \frac{a}{\sqrt{h^2+k^2+l^2}}\ \text{(cubic)},\qquad d_{hkl} = \frac{1}{\sqrt{\frac{h^2+k^2}{a^2}+\frac{l^2}{c^2}}}\ \text{(tetragonal/hexagonal)}$$

**Plane families and angles**

$$N = h^2+k^2+l^2,\qquad d = \frac{a}{\sqrt N},\qquad \cos\phi = \frac{h_1h_2+k_1k_2+l_1l_2}{\sqrt{N_1N_2}}$$

Allowed reflections: SC all, BCC $h+k+l$ even, FCC $h,k,l$ all odd or all even.
**Bragg and crystal size** — $\lambda$ in m, $\theta$ in rad/°, $n$ = order (integer).

$$n\lambda = 2d\sin\theta,\qquad D = \frac{K\lambda}{\beta\cos\theta}\ \text{(Scherrer)},\quad K\approx0.9$$

**Conditions:** cubic symmetry for $d = a/\sqrt N$; Bragg requires elastic scattering from parallel planes with $n$ a positive integer; SC/BCC/FCC reflection rules assume monatomic basis.

> [!tip] High-yield ★
> For FCC only $N = 3, 4, 8, 11, 12$ appear; for BCC only $N = 2, 4, 6, 8$ (i.e. $h+k+l$ even). Spotting a missing $N$ in a diffractogram identifies the structure.

---

### 4. Crystal Imperfections

![](https://www.youtube.com/watch?v=EoCtPYHaRAE)

*Video: Crystallographic and Lattice Defects — tec-science, 10:41*

**Point defects and equilibrium vacancies ★** — $n_v$ = vacancy count, $N$ = site count, $Q_v$ in J/mol, $k = 8.62\times10^{-5}$ eV/K.

$$\frac{n_v}{N} = \exp\!\left(-\frac{Q_v}{kT}\right)\ \text{(dimensionless)},\qquad \text{Schottky: cation + anion pair},\qquad \text{Frenkel: vacancy + interstitial}$$

**Defect types**

| Class | Defect | Effect |
|---|---|---|
| 0-D | vacancy, interstitial, substitutional | diffusion, resistivity |
| 1-D | edge, screw/line dislocation | slip, ductility |
| 2-D | grain boundary, twin, stacking fault | strength, corrosion path |
| 3-D | void, crack, inclusion, precipitate | fracture initiation |

**Dislocation density and strengthening ★** — $\rho_d$ in m⁻² or lines/cm², $\sigma_y$ in MPa, $d$ = grain size in m.

$$\rho_d = \frac{L}{V}\ \text{(m}^{-2}\text{)},\qquad \text{Hall–Petch: } \sigma_y = \sigma_0 + \frac{k_y}{\sqrt d}$$

$$\text{Annealed: }\rho_d \approx 10^{10}\ \text{m}^{-2},\qquad \text{Severely deformed: }\rho_d \approx 10^{16}\ \text{m}^{-2}$$

**Hume-Rothery rules ★** — conditions for extensive substitutional solid solubility; all four must hold.

| Rule | Requirement |
|---|---|
| Atomic radius | difference $\le 15\%$ |
| Crystal structure | same |
| Electronegativity | similar |
| Valence | similar |

**Conditions:** vacancy equation holds at thermal equilibrium below the melting point; Hall–Petch applies for grain sizes above ~20 nm and fails in the nanocrystalline regime; the Hume–Rothery rules govern substitutional solubility, not interstitial solubility.

> [!warning] Exam trap
> Grain boundaries **block** dislocation motion, so smaller grains mean higher yield strength (Hall–Petch). A question asking for the "weaker" material wants the **larger** grain size.

---

## Part B — Properties and Behavior

### 5. Stress, Strain and Mechanical Properties

![](https://www.youtube.com/watch?v=X-zSlyM4JSQ)

*Video: Stress vs Strain Curve for Tensile Materials — ADTW Study, 4:54*

**Stress and strain ★** — $\sigma$ in Pa or MPa, $F$ in N, $A$ in m², $\varepsilon$ dimensionless.

$$\sigma = \frac{F}{A_0}\ \text{(engineering)},\qquad \varepsilon = \frac{\Delta L}{L_0} = \frac{L-L_0}{L_0},\qquad E = \frac{\sigma}{\varepsilon}\ \text{(Young's modulus, Pa)}$$

$$\sigma_{\text{true}} = \sigma(1+\varepsilon),\qquad \varepsilon_{\text{true}} = \ln(1+\varepsilon)$$

**Elastic moduli** — $G$ = shear modulus, $K$ = bulk modulus, $\nu$ = Poisson's ratio (dimensionless, ~0.3 metals).

$$G = \frac{E}{2(1+\nu)},\qquad K = \frac{E}{3(1-2\nu)},\qquad \nu = -\frac{\varepsilon_{\text{lateral}}}{\varepsilon_{\text{axial}}}$$

**Energy and ductility**

$$U_r = \frac{\sigma_y^2}{2E}\ \text{(resilience, J/m}^3\text{)},\qquad U_t = \int_0^{\varepsilon_f}\sigma\,d\varepsilon\ \text{(toughness)}$$

$$\%\text{EL} = \frac{L_f-L_0}{L_0}\times100$$

$$\%\text{RA} = \frac{A_0-A_f}{A_0}\times100$$

**Bulk modulus (definition) ★** — $V$ in m³, $\Delta P$ in Pa, $K$ in Pa; equivalent to the elastic-constant relation for an isotropic solid.

$$K = -V\frac{\Delta P}{\Delta V} = \frac{E}{3(1-2\nu)}$$

**Fracture toughness ★** — $K_{Ic}$ in Pa·√m, $Y$ = dimensionless geometry factor, $\sigma$ in Pa, $a$ = crack half-length in m.

$$K_{Ic} = Y\sigma\sqrt{\pi a}$$

**Conditions:** engineering stress uses the **original** area $A_0$ and is valid to the ultimate tensile strength; true stress is required past necking; $E$ is the slope of the linear elastic region only; $K_{Ic}$ assumes linear-elastic fracture mechanics with a sharp crack and small-scale yielding.

> [!tip] High-yield ★
> Ductility is measured by percent elongation and percent reduction in area. A material that shows necking is ductile; one that fractures on the elastic line is brittle — toughness is the **area** under the curve.

---

### 6. Hardness Testing

**Brinell hardness ★** — $F$ in kgf, $D$ = ball diameter in mm, $d$ = indentation diameter in mm.

$$HB = \frac{2F}{\pi D\left(D-\sqrt{D^2-d^2}\right)}\ \text{(kgf/mm}^2\text{)}$$

**Vickers and Knoop** — $F$ in kgf, $d$ in mm (mean diagonal), $L$ = long diagonal.

$$HV = \frac{1.854F}{d^2},\qquad HK = \frac{14.2F}{L^2},\qquad \text{Load range } 1\text{–}1000\ \text{gf (microhardness)}$$

**Rockwell scales**

| Scale | Indenter | Load | Used for |
|---|---|---|---|
| HRA | diamond cone | 60 kgf | carbides, thin stock |
| HRB | $\frac1{16}$ in steel ball | 100 kgf | soft metals, brass |
| HRC | diamond cone (Brale) | 150 kgf | hardened steel |

**Mohs scale (1–10):** talc 1, gypsum 2, calcite 3, fluorite 4, apatite 5, orthoclase 6, quartz 7, topaz 8, corundum 9, diamond 10.
**Conditions:** Brinell requires $d$ between 0.25D and 0.5D, and the specimen thickness be at least 10× the indentation depth; Rockwell gives arbitrary units, not kgf/mm².

> [!warning] Exam trap
> Brinell, Vickers and Knoop are **direct** load/area measures; Rockwell is a differential-depth reading. Never convert HRC to HB with a single linear factor — use a conversion chart.

---

### 7. Energy Bands and Classification

![](https://www.youtube.com/watch?v=y865nLVyQsY)

*Video: Conductors, Insulators and Semiconductors — Khan Academy India, 8:03*

**Band formation and gaps ★** — $E$ in eV, $E_g$ = band gap, $k_B = 8.62\times10^{-5}$ eV/K, $T$ in K.

$$E_g = E_c - E_v,\qquad \text{conductor } E_g = 0,\quad \text{semiconductor } E_g < 3\ \text{eV},\quad \text{insulator } E_g > 5\ \text{eV}$$

| Material | $E_g$ (eV, 300 K) | Class |
|---|---|---|
| Cu, Ag, Al | 0 (overlap) | conductor |
| Ge | 0.67 | semiconductor |
| Si | 1.12 | semiconductor |
| GaAs | 1.42 | semiconductor |
| GaN | 3.4 | wide-gap semiconductor |
| SiO$_2$, diamond | 8–9, 5.5 | insulator |

**Carrier statistics ★** — $n_i$ in cm⁻³, $N_c,N_v$ in cm⁻³, $k_BT$ in eV.

$$n_i^2 = N_cN_v\exp\!\left(-\frac{E_g}{k_BT}\right),\qquad n_i = \sqrt{N_cN_v}\,\exp\!\left(-\frac{E_g}{2k_BT}\right)$$

$$n_i(\text{Si}) \approx 1.5\times10^{10}\ \text{cm}^{-3}$$

**Conductivity and mobility** — $\sigma$ in S/m or S/cm, $n$ in cm⁻³, $\mu$ in cm²/(V·s), $q = 1.602\times10^{-19}$ C.

$$\sigma = q(n\mu_n + p\mu_p),\qquad \rho = \frac1\sigma,\qquad \mu \propto T^{-3/2}\ \text{(lattice scattering)}$$

**Conditions:** $n_i$ formula assumes non-degenerate (Boltzmann) statistics and parabolic bands; $E_g$ of Si falls with temperature at about $-2.4\times10^{-4}$ eV/K.

> [!tip] High-yield ★
> Silicon: $n_i = 1.5\times10^{10}$ cm⁻³, $E_g = 1.12$ eV, $\mu_n \approx 1350$, $\mu_p \approx 480$ cm²/(V·s). Those four numbers answer most intrinsic-material items.

---

### 8. Fermi Level

![](https://www.youtube.com/watch?v=eSTu7G-0pgg)

*Video: Fermi Level in Semiconductors — Engineering Physics by Sanjiv, 4:57*

**Fermi–Dirac distribution ★** — $f(E)$ dimensionless, $E_F$ = Fermi level in eV, $k_BT$ in eV.

$$f(E) = \frac{1}{1+\exp\!\left(\frac{E-E_F}{k_BT}\right)},\qquad f(E_F) = \tfrac12,\qquad f(E) \approx \exp\!\left(-\frac{E-E_F}{k_BT}\right)\ \text{for } E-E_F \gg k_BT$$

**Intrinsic and extrinsic position** — $E_i$ = intrinsic level, $N_D,N_A$ = doping in cm⁻³.

$$E_F = \frac{E_c+E_v}{2}\ \text{(intrinsic)},\qquad E_F - E_i = k_BT\ln\frac{N_D}{n_i}\ (n\text{-type}),\qquad E_i - E_F = k_BT\ln\frac{N_A}{n_i}\ (p\text{-type})$$

**Carrier concentrations and Law of Mass Action**

$$n = N_c\exp\!\left(\frac{E_F-E_c}{k_BT}\right),\qquad p = N_v\exp\!\left(\frac{E_v-E_F}{k_BT}\right),\qquad np = n_i^2$$

$$N_c = 2\!\left(\frac{2\pi m_n^*k_BT}{h^2}\right)^{3/2},\qquad N_v = 2\!\left(\frac{2\pi m_p^*k_BT}{h^2}\right)^{3/2}$$

**Fermi level at finite temperature:** for $n$-type, $E_F$ moves **down** toward $E_i$ as $T$ rises; the doping ionizes fully below ~100 K.
**Conditions:** $np = n_i^2$ holds at thermal equilibrium only; Boltzmann approximation requires the Fermi level to sit at least $3k_BT$ from either band edge.

> [!warning] Exam trap
> $n$-type doping raises $E_F$ toward $E_c$; $p$-type lowers it toward $E_v$. Getting the direction backwards flips every subsequent $n$, $p$ and junction answer.

---

### 9. Dielectric Properties and Breakdown

![](https://www.youtube.com/watch?v=4hpLxJYEBHA)

*Video: What Is a Dielectric? — Physics Made Easy, 13:52*

**Capacitance and permittivity ★** — $C$ in F, $A$ in m², $d$ in m, $\varepsilon_r$ dimensionless, $\varepsilon_0 = 8.854\times10^{-12}$ F/m.

$$C = \frac{\varepsilon A}{d} = \frac{\varepsilon_r\varepsilon_0 A}{d},\qquad C = \varepsilon_rC_{\text{air}},\qquad E = \frac{V}{d}\ \text{(V/m)}$$

$$W = \tfrac12 CV^2 = \frac{Q^2}{2C} = \tfrac12 QV\ \text{(J)}$$

**Polarization and dielectric constant** — $P$ in C/m², $\chi_e$ = electric susceptibility (dimensionless).

$$D = \varepsilon_0E + P = \varepsilon E,\qquad \varepsilon_r = 1+\chi_e,\qquad P = \varepsilon_0\chi_eE$$

**Loss and breakdown** — $\tan\delta$ = loss tangent (dimensionless), dissipation factor.

$$D_f = \tan\delta = \frac{\varepsilon''}{\varepsilon'},\qquad P_{\text{loss}} = 2\pi f C V^2\tan\delta\ \text{(W)}$$

$$E_{\text{bd}} = \frac{V_{\text{bd}}}{d}\ \text{(V/m or kV/mm)}$$

**Typical values:** air $\varepsilon_r\approx1.0$, paper 3–4, mica 5–7, ceramic (BaTiO$_3$) 1000–10,000, water 80; air breakdown 3 kV/mm, mica 40–150 kV/mm.

**Inverse piezoelectric effect ★** — applied field $E$ in V/m produces mechanical strain $S$ (dimensionless); $d$ = piezoelectric coefficient in m/V.

$$S = dE$$

The basis of BaTiO$_3$ and PZT actuators, which convert an applied voltage into controlled displacement.

**Conditions:** parallel-plate formula assumes a uniform field with negligible fringing; $\tan\delta \ll 1$ for a good dielectric; breakdown strength falls with temperature, humidity, thickness and frequency; the inverse piezoelectric strain is linear only below the poling and saturation limits.

> [!tip] High-yield ★
> Inserting a dielectric raises $C$ by $\varepsilon_r$ at constant geometry, but the voltage rating per unit thickness is set by $E_{\text{bd}}$, not by $\varepsilon_r$. Two separate board items hide in one question.

---

### 10. Magnetic Properties and Hysteresis

![](https://www.youtube.com/watch?v=ZyVSMfSgOq0)

*Video: The Hysteresis Loop Explained — The Electric Academy, 5:34*

**Field relations ★** — $B$ in T, $H$ in A/m, $M$ in A/m, $\mu_0 = 4\pi\times10^{-7}$ H/m, $\mu_r$ dimensionless.

$$B = \mu H = \mu_r\mu_0H,\qquad B = \mu_0(H+M),\qquad \chi = \mu_r - 1,\qquad \mu_r = 1+\chi$$

**Classification and domain behavior**

| Class | $\chi$ | $\mu_r$ | Example | Behavior |
|---|---|---|---|---|
| Diamagnetic | small negative | $\approx1$ | Cu, Bi, water | weakly repelled |
| Paramagnetic | small positive | $>1$ | Al, Pt, O$_2$ | weakly attracted |
| Ferromagnetic | large positive | $10^2$–$10^5$ | Fe, Ni, Co | domains, strong |
| Ferrimagnetic | positive | $10^2$–$10^4$ | ferrites, magnetite | ceramic magnets |
| Antiferromagnetic | small positive | $\approx1$ | MnO, Cr | moments cancel |

**Hysteresis and losses** — $B_r$ = retentivity (T), $H_c$ = coercivity (A/m), $W_h$ = hysteresis loss per cycle.

$$W_h = \oint H\,dB\ \text{(J/m}^3\text{ per cycle)},\qquad P_h = k_hfB_m^{1.6}\ \text{(Steinmetz)},\qquad P_e = k_ef^2B_m^2t^2\ \text{(eddy)}$$

$$L = \frac{N\Phi}{I} = \frac{\mu N^2A}{l}\ \text{(H)},\qquad \mathcal{R} = \frac{l}{\mu A}\ \text{(reluctance, A/Wb)}$$

**Soft magnets** (transformer Si–Fe, ferrites): narrow loop — high $\mu_r$, low $H_c$, low hysteresis loss.
**Hard magnets** (Alnico, NdFeB): wide loop — high $H_c$ and $B_r$, so the magnetism persists.

**Magnetic ordering temperatures ★** — $T_C$ = Curie temperature, $T_N$ = Néel temperature, both in K; $\chi$ dimensionless.

$$T < T_C:\ \text{ferromagnetic} \to T > T_C:\ \text{paramagnetic}\quad(\text{pure iron } T_C \approx 770\ ^\circ\text{C})$$

$$T < T_N:\ \text{antiferromagnetic} \to T > T_N:\ \text{paramagnetic}$$

$$\chi = \frac{C}{T-T_C}\ \text{(Curie–Weiss, } T > T_C\text{)}$$

**Conditions:** $\mu_r$ is not constant — it depends on $H$, temperature and frequency; saturation, hysteresis and eddy-current loss vanish only in the ideal linear core; the Curie–Weiss law applies in the paramagnetic region $T > T_C$ only.

> [!warning] Exam trap
> Transformer cores want **soft** magnetic material (small hysteresis area, easy demagnetization); permanent magnets want **hard** material (large $H_c$). Swapping them is the classic trap.

---

## Part C — Diffusion, Nanomaterials and Polymers

### 11. Diffusion and Fick's Laws

![](https://www.youtube.com/watch?v=JgAKv1Zlgcw)

*Video: Fick's Law of Diffusion and Concentration Gradient — The Organic Chemistry Tutor, 10:44*

**Fick's first law ★** — $J$ in kg/(m²·s), $D$ in m²/s, $C$ in kg/m³, $x$ in m.

$$J = -D\frac{dC}{dx}$$

**Fick's second law**

$$\frac{\partial C}{\partial t} = D\frac{\partial^2C}{\partial x^2}$$

**Arrhenius diffusivity ★** — $D_0$ = pre-exponential factor in m²/s, $Q$ = activation energy in J/mol, $R = 8.314$ J/(mol·K), $T$ in K.

$$D = D_0e^{-Q/(RT)}$$

**Steady state vs non-steady state:** steady state has $\frac{\partial C}{\partial t} = 0$, so $J$ is constant and Fick's first law applies directly.
Non-steady state has $C$ varying with both $x$ and $t$; the solution has the error-function form

$$C(x,t) = C_s - (C_s-C_0)\,\text{erf}\!\left(\frac{x}{2\sqrt{Dt}}\right)$$

**Conditions:** $D$ is constant and independent of concentration; Fick's first law is a steady-state statement; the Arrhenius form assumes a single activation energy $Q$ over the temperature range.

---

### 12. Nanomaterials

**Definition ★** — a nanomaterial has at least one external dimension in the 1–100 nm range (ISO/TS 80004, IUPAC).

**Size effects**

$$\text{surface-area-to-volume ratio} \propto \frac1r,\qquad \text{quantum dots: } E_g \text{ rises as } r \text{ falls (quantum confinement)}$$

**Fabrication routes**

| Route | Direction | Examples |
|---|---|---|
| Top-down | bulk → nano | milling, lithography |
| Bottom-up | atoms/molecules → nano | self-assembly, CVD |

**Why properties differ:** a large surface-atom fraction, quantum confinement and altered surface energy shift melting point, reactivity and optical behavior.
**Conditions:** the 1–100 nm definition counts external dimensions only, not internal structure; quantum-confinement shifts appear once the size approaches the exciton Bohr radius.

---

### 13. Polymers and Composites

**Polymer classes ★**

| Class | Bonding | On heating |
|---|---|---|
| Thermoplastic | linear chains, weak interchain forces | softens and reflows, recyclable |
| Thermoset | cross-linked network | chars rather than melts |
| Elastomer | lightly cross-linked | large reversible rubber elasticity |

**Degree of polymerization** — $M_n$ = number-average molar mass in g/mol, $M_0$ = repeat-unit mass in g/mol.

$$DP = \frac{M_n}{M_0}\quad \text{(dimensionless)}$$

**Glass transition** — $T_g$ in K or °C: below $T_g$ the amorphous polymer is glassy, above it rubbery or viscous; semi-crystalline grades also show $T_m > T_g$.

**Composites:** combining stiff fibers with a low-density matrix raises the specific stiffness, which is the stiffness/density trade-off that makes composites attractive.

$$\text{specific stiffness} = \frac{E}{\rho}\ \text{(m}^2\text{/s}^2\text{)}$$

**Conditions:** thermoplastic, thermoset and elastomer describe chain architecture, not chemical family; $T_g$ applies to the amorphous fraction only; composite estimates assume good fiber–matrix bonding and aligned fibers.

→ Back to [[00_Index]]
