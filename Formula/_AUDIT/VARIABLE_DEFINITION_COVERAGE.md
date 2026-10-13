---
title: Variable Definition Coverage Audit
audit: variable-definition-coverage
scope: Formula/ subject vaults (Mathematics, Electronics_Engineering, EST, GEAS)
status: complete
---

# Variable Definition Coverage Audit

## 1. Summary

Every `### <n>. <Topic Name>` topic in the four subject vaults was read in full and judged on how well it
defines the symbols, variables and constants it uses.

**Status key**

| Status | Meaning |
|---|---|
| `DEFINED` | The topic names essentially all of the symbols it uses that are not universal constants or self-evident dummy variables. |
| `PARTIAL` | Some symbols are defined; conspicuous ones are left bare. |
| `NONE` | Equations are bare — no symbol meanings given at all. |

A "definition" was credited for any of: a `where $R$ is ...` clause; a bold or plain lead-in defining symbols
before/after an equation; a "Here $x$ is ..." sentence; a legend/notation list or table mapping symbols to
meaning and units; symbol names inside a `**Conditions:**` line; or symbol meaning given inline in the prose
surrounding the equation. Tolerated as self-evident: `x`, `y`, `t`, `f(x)`, `n`, `k`, `i`, `j`, `\pi`, `e`,
standard operator notation, dummy indices in sums, and generic constants in generic algebraic definitions.

### 1.1 Totals per subject folder

**Grand totals — 452 topics across 33 subject files in 4 vaults**

| Part (vault) | Subject files | Topics | `DEFINED` | `PARTIAL` | `NONE` | `DEFINED` share |
|---|---|---|---|---|---|---|
| `Mathematics/` | 9 | 132 | 91 | 41 | 0 | 68.9 % |
| `Electronics_Engineering/` | 9 | 119 | 69 | 50 | 0 | 58.0 % |
| `EST/` | 7 | 99 | 61 | 38 | 0 | 61.6 % |
| `GEAS/` | 8 | 102 | 56 | 46 | 0 | 54.9 % |
| **All four vaults** | **33** | **452** | **277** | **175** | **0** | **61.3 %** |

**Headline result:** there are **no `NONE` topics** — not one of the 452 topics leaves its equations completely bare. Every topic carries a `**Conditions:**` line, and the great majority carry at least a partial units/legend line. The problem is therefore not missing definitions in bulk but **unfinished definition coverage**: 175 topics (38.7 %) define *some* symbols and leave others bare, and in most of those the bare items are (a) an unexpanded abbreviation used as a quantity (ROC, THD, GBW, CMRR, PSRR, LSB, ENOB, AWGN, INL/DNL, ARR/LTV/CAC, ES/EF/LS/LF/TF/FF), or (b) an intermediate symbol introduced only inside a working formula (γ as specific weight, I_xc, R_L′, R_S′, Q_g, C_p, L_0, m*, k_h/k_e, τ_T, φ_F).

### 1.2 Totals per file

| Part | File | Topics | `DEFINED` | `PARTIAL` | `NONE` |
|---|---|---|---|---|---|
| Mathematics | 01_Differential_Calculus.md | 8 | 6 | 2 | 0 |
| Mathematics | 02_Integral_Calculus.md | 16 | 11 | 5 | 0 |
| Mathematics | 03_Differential_Equations.md | 14 | 8 | 6 | 0 |
| Mathematics | 04_Advanced_Engineering_Math.md | 19 | 12 | 7 | 0 |
| Mathematics | 05_Electromagnetics.md | 22 | 22 | 0 | 0 |
| Mathematics | 06_Control_Systems.md | 14 | 7 | 7 | 0 |
| Mathematics | 07_Signals_and_Systems.md | 13 | 10 | 3 | 0 |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 12 | 9 | 3 | 0 |
| Mathematics | 09_Engineering_Data_Analysis.md | 14 | 6 | 8 | 0 |
| Electronics_Engineering | 01_DC_Circuits.md | 13 | 13 | 0 | 0 |
| Electronics_Engineering | 02_AC_Circuits.md | 10 | 10 | 0 | 0 |
| Electronics_Engineering | 03_Two_Port_Networks.md | 9 | 6 | 3 | 0 |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 15 | 5 | 10 | 0 |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 18 | 8 | 10 | 0 |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 9 | 5 | 4 | 0 |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 18 | 6 | 12 | 0 |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 17 | 12 | 5 | 0 |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 10 | 4 | 6 | 0 |
| EST | 01_Signals_Spectra_and_Noise.md | 12 | 11 | 1 | 0 |
| EST | 02_Principles_of_Communications.md | 15 | 13 | 2 | 0 |
| EST | 03_Digital_Communications.md | 16 | 7 | 9 | 0 |
| EST | 04_Data_Communications_and_Networking.md | 21 | 5 | 16 | 0 |
| EST | 05_Transmission_Lines_and_Waveguides.md | 10 | 9 | 1 | 0 |
| EST | 06_Antenna_Systems_and_Propagation.md | 17 | 14 | 3 | 0 |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 8 | 2 | 6 | 0 |
| GEAS | 01_General_Chemistry.md | 11 | 5 | 6 | 0 |
| GEAS | 02_University_Physics.md | 20 | 15 | 5 | 0 |
| GEAS | 03_Materials_Science.md | 13 | 6 | 7 | 0 |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 13 | 5 | 8 | 0 |
| GEAS | 05_Engineering_Economy.md | 13 | 11 | 2 | 0 |
| GEAS | 06_Engineering_Management_and_PM.md | 13 | 5 | 8 | 0 |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 11 | 5 | 6 | 0 |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 8 | 4 | 4 | 0 |

Best and worst files:

- **Fully covered:** `Mathematics/05_Electromagnetics.md` (22/22), `Electronics_Engineering/01_DC_Circuits.md` (13/13), `Electronics_Engineering/02_AC_Circuits.md` (10/10). Every topic ends with a units/legend clause.
- **Exemplar for method:** `EST/01_Signals_Spectra_and_Noise.md` puts a literal `**Symbols**` bullet list under *every* formula block, giving symbol, meaning and SI unit. 11 of its 12 topics are `DEFINED`; the single gap is the bare `ROC` abbreviation.
- **Weakest:** `EST/04_Data_Communications_and_Networking.md` (5/21 `DEFINED`) and `GEAS/04_Environmental_Sci_and_PH_Laws.md` (5/13), followed by `Electronics_Engineering/07_Industrial_Automation_and_Sensors.md` (6/18) — all three rely on unexplained acronyms and on symbols that appear only inside working formulas.


### 1.3 Size of the worklist

Distribution of the 175 `PARTIAL` topics by number of bare symbols listed:

| Bare symbols in the row | Topics |
|---|---|
| 8 | 4 |
| 7 | 6 |
| 6 | 14 |
| 5 | 22 |
| 4 | 35 |
| 3 | 45 |
| 2 | 35 |
| 1 | 14 |

**Longest worklist rows (8 bare symbols each):** `Electronics_Engineering/07_Industrial_Automation_and_Sensors.md` topic 1 (Op-Amp Fundamentals: CMRR, PSRR, V_os, I_B, A_d, A_cm, R_comp, β); `Mathematics/03_Differential_Equations.md` topic 13 (PDE Heat Equation: L, A_0, A_n, B_n, T_1, T_2, f(x), λ) and topic 14 (PDE Laplace: ρ, ε, a, b, λ, A_n, B_n, k); `GEAS/04_Environmental_Sci_and_PH_Laws.md` topic 5 (Water Quality: L_0, V_0, V_1, M, Q_w, C_w, Q_r, C_r).

Five further topics list 7: `Mathematics/03` topic 9 (Variation of Parameters), `Electronics_Engineering/07` topic 13 (ADC Architectures), `EST/04` topic 5 (HDLC and PPP) and topic 6 (MAC Protocols and Ethernet), `GEAS/06` topic 5 (Network Passes, Float and Critical Path). *(Note: a LaTeX subscript that itself contains a comma — e.g. `$P_{L,\text{ref}}$` — makes a bare-symbol list read as one item longer than it is.)*

The rows are dominated by **unexpanded abbreviations used as quantities** rather than by missing physics: across the 175 `PARTIAL` rows the most frequent offenders are `ROC`, `THD`, `GBW`, `CMRR`, `PSRR`, `LSB`, `ENOB`, `INL/DNL`, `SINAD/SFDR`, `AWGN`, `Q(·)`, `SNR`, `PIV`, `MTBF`, `CCM/DCM`, `FCS/PDU/MTU`, `PERT/CPM`, `ES/EF/LS/LF/TF/FF`, `MARR`, `CAC/ARPU/LTV/ARR/MRR/COGS`, `NTC/CPCN/DICT/DOLE/OSH/RPC/BOECE`.


## 2. Per-topic worklist

One row per topic. For `NONE` and `PARTIAL` rows the **Bare symbols** column is the worklist: the most
conspicuous undefined symbols in that topic, to be given meaning + SI unit in a later pass.

| Part | File | No. | Topic name | Status | Bare symbols |
|---|---|---|---|---|---|
| Mathematics | 01_Differential_Calculus.md | 1 | Limits, Continuity and L'Hôpital | DEFINED | - |
| Mathematics | 01_Differential_Calculus.md | 2 | Differentiation Rules | DEFINED | - |
| Mathematics | 01_Differential_Calculus.md | 3 | Implicit, Parametric and Logarithmic Differentiation | DEFINED | - |
| Mathematics | 01_Differential_Calculus.md | 4 | Related Rates | PARTIAL | $h_1$, $d_1$, $h_2$, $d_2$ |
| Mathematics | 01_Differential_Calculus.md | 5 | Extrema, Concavity and Inflection | DEFINED | - |
| Mathematics | 01_Differential_Calculus.md | 6 | Optimization Problems | DEFINED | - |
| Mathematics | 01_Differential_Calculus.md | 7 | Differentials and Error Propagation | PARTIAL | $P$, $V$, $R$ |
| Mathematics | 01_Differential_Calculus.md | 8 | Rolle's and Mean Value Theorems | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 1 | Antiderivatives and Standard Forms | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 2 | Algebraic Substitution | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 3 | Definite Integrals and FTC | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 4 | Integration by Parts and Tabular | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 5 | Trigonometric Integrals and Substitution | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 6 | Partial Fractions | PARTIAL | $N(x)$, $D(x)$, $Q$, $R$ |
| Mathematics | 02_Integral_Calculus.md | 7 | Improper Integrals | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 8 | Average Value and MVT for Integrals | PARTIAL | $V_m$, $\omega$, $x_{\text{ave}}$, $v(t)$ |
| Mathematics | 02_Integral_Calculus.md | 9 | Plane Areas Cartesian | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 10 | Plane Areas Polar | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 11 | Volumes by Slicing, Disk and Washer | PARTIAL | $R(x)$, $r(x)$, $L$, $A_1$, $A_m$, $A_2$ |
| Mathematics | 02_Integral_Calculus.md | 12 | Volumes by Cylindrical Shells | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 13 | Arc Length and Surface Area | DEFINED | - |
| Mathematics | 02_Integral_Calculus.md | 14 | Centroids and Pappus-Guldinus | PARTIAL | $Q_x$, $Q_y$, $z$-centroid terms |
| Mathematics | 02_Integral_Calculus.md | 15 | Work and Hydrostatic Force | PARTIAL | $\gamma$, $y_{cp}$, $I_{xc}$, $A(y)$, $d$, $w(y)$ |
| Mathematics | 02_Integral_Calculus.md | 16 | Iterated and Double Integrals | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 1 | Separation of Variables | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 2 | Linear First Order and Bernoulli | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 3 | Exact Equations and Integrating Factors | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 4 | Homogeneous Equations and Substitutions | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 5 | Growth, Decay and Newton's Cooling | PARTIAL | $L$ (carrying capacity), $r$ (continuous rate), $A$, $A_0$, $N$, $N_0$ |
| Mathematics | 03_Differential_Equations.md | 6 | Mixtures and Orthogonal Trajectories | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 7 | Higher Order Homogeneous Auxiliary Equation | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 8 | Undetermined Coefficients | PARTIAL | $F(a)$ (characteristic polynomial), $R(x)$ (forcing term) |
| Mathematics | 03_Differential_Equations.md | 9 | Variation of Parameters | PARTIAL | $y_1$, $y_2$, $u_1$, $u_2$, $W_1$, $W_2$, $R(x)$ |
| Mathematics | 03_Differential_Equations.md | 10 | Mass-Spring-Damper Systems | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 11 | RLC Circuit Transients | DEFINED | - |
| Mathematics | 03_Differential_Equations.md | 12 | PDE Wave Equation 1D | PARTIAL | $L$ (string length), $A_n$, $B_n$, $f(x)$, $g(x)$ |
| Mathematics | 03_Differential_Equations.md | 13 | PDE Heat Equation 1D | PARTIAL | $L$, $A_0$, $A_n$, $B_n$, $T_1$, $T_2$, $f(x)$, $\lambda$ |
| Mathematics | 03_Differential_Equations.md | 14 | PDE Laplace Equation 2D | PARTIAL | $\rho$, $\varepsilon$, $a$, $b$, $\lambda$, $A_n$, $B_n$, $k$ |
| Mathematics | 04_Advanced_Engineering_Math.md | 1 | Complex Numbers, Euler and De Moivre | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 2 | Cauchy-Riemann and Analytic Functions | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 3 | Sequences and Convergence Tests | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 4 | Power Series Radius of Convergence | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 5 | Taylor and Maclaurin Series | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 6 | Truncation Error and Approximation | PARTIAL | $P_n(x)$, $h$, $\xi$, $n$ (Simpson subintervals) |
| Mathematics | 04_Advanced_Engineering_Math.md | 7 | Laplace Transform Pairs | PARTIAL | ROC, $\sigma$, $\delta(t)$, $u(t-a)$ |
| Mathematics | 04_Advanced_Engineering_Math.md | 8 | Shifting Theorems and Properties | PARTIAL | $\sigma_0$, $T$, $\tau$ |
| Mathematics | 04_Advanced_Engineering_Math.md | 9 | Unit Step, Dirac and Periodic Functions | PARTIAL | $g(t)$, $h(t)$, $X(s)$, $Y(s)$, $T$ |
| Mathematics | 04_Advanced_Engineering_Math.md | 10 | Inverse Laplace and Partial Fractions | PARTIAL | $Q(s)$, $R(s)$, $c$ (Bromwich), $p_i$, $b$ |
| Mathematics | 04_Advanced_Engineering_Math.md | 11 | Fourier Series Trigonometric and Exponential | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 12 | Half-Range Expansions and Symmetry | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 13 | Fourier Transform Properties | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 14 | Bessel Functions | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 15 | Legendre Polynomials | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 16 | Matrices, Determinants, Rank and Inversion | PARTIAL | $M_{ij}$ (minor), $\lambda_i$, $k$, $C_{ij}$ |
| Mathematics | 04_Advanced_Engineering_Math.md | 17 | Cramer's Rule and Linear Systems | DEFINED | - |
| Mathematics | 04_Advanced_Engineering_Math.md | 18 | Eigenvalues and Eigenvectors | PARTIAL | $\Lambda$, $c_i$ (Cayley-Hamilton), $Q$ |
| Mathematics | 04_Advanced_Engineering_Math.md | 19 | Analytic Geometry and Conic Sections | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 1 | Coordinate Systems and Vector Algebra | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 2 | Gradient, Divergence, Curl and Laplacian | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 3 | Divergence and Stokes Theorems | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 4 | Coulomb's Law and E Field | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 5 | Gauss Law and Applications | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 6 | Electric Potential and Gradient | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 7 | Dipoles and Polarization | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 8 | Dielectrics and Boundary Conditions | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 9 | Capacitance from Geometry | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 10 | Electrostatic Energy and Forces | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 11 | Current Density and Continuity | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 12 | Biot-Savart Law | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 13 | Ampere's Circuital Law | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 14 | Magnetic Boundary Conditions and Vector Potential | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 15 | Inductance from Geometry and Materials | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 16 | Magnetic Forces, Torque and Lorentz | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 17 | Faraday's Law and Motional EMF | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 18 | Maxwell's Equations and Displacement Current | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 19 | EM Wave Equations and Uniform Plane Waves | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 20 | Waves in Lossy Media and Skin Depth | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 21 | Reflection and Transmission at Boundaries | DEFINED | - |
| Mathematics | 05_Electromagnetics.md | 22 | Intrinsic Impedance and Poynting Vector | DEFINED | - |
| Mathematics | 06_Control_Systems.md | 1 | System Modeling and Transfer Functions | PARTIAL | $V_a(s)$ (armature voltage), $\theta(s)$ (shaft angle), $N(s)$, $D(s)$ |
| Mathematics | 06_Control_Systems.md | 2 | Block Diagram Reduction | DEFINED | - |
| Mathematics | 06_Control_Systems.md | 3 | Mason's Gain Formula | DEFINED | - |
| Mathematics | 06_Control_Systems.md | 4 | Test Signals and First Order Response | DEFINED | - |
| Mathematics | 06_Control_Systems.md | 5 | Second Order Specifications | PARTIAL | $K$, $J$, $B$, $t_p$, $t_r$, $t_s$ |
| Mathematics | 06_Control_Systems.md | 6 | Steady State Error and Error Constants | PARTIAL | $R(s)$ (reference input), $A$ (input amplitude) |
| Mathematics | 06_Control_Systems.md | 7 | System Types and Error Analysis | PARTIAL | $A$ (input amplitude), $K$ (error-constant value) |
| Mathematics | 06_Control_Systems.md | 8 | Routh-Hurwitz Criterion | DEFINED | - |
| Mathematics | 06_Control_Systems.md | 9 | Root Locus Techniques | DEFINED | - |
| Mathematics | 06_Control_Systems.md | 10 | Bode Plots and Margins | PARTIAL | PM (phase margin), GM (gain margin), $M_r$, $K$, $\omega_z$, $\omega_p$ |
| Mathematics | 06_Control_Systems.md | 11 | Nyquist Stability Criterion | DEFINED | - |
| Mathematics | 06_Control_Systems.md | 12 | PID Controllers and Tuning | PARTIAL | $\tau_f$ (filter time constant), $e_{ss}$ |
| Mathematics | 06_Control_Systems.md | 13 | Lead-Lag Compensator Design | PARTIAL | $K_c$, $z_c$, $p_c$, $\tau$, $\omega_{gc}$ |
| Mathematics | 06_Control_Systems.md | 14 | State Space Representation Basics | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 1 | Signal Classification and Operations | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 2 | Energy, Power, Even and Odd | PARTIAL | $c_n$ (Fourier coefficient), $E_x$, $a$ |
| Mathematics | 07_Signals_and_Systems.md | 3 | System Properties and LTI | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 4 | Continuous-Time Convolution | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 5 | Discrete-Time Convolution | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 6 | Z Transform Definition and ROC | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 7 | Z Transform Theorems and Pairs | PARTIAL | $R$, $R_1$, $R_2$ (ROC regions) |
| Mathematics | 07_Signals_and_Systems.md | 8 | Inverse Z Transform | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 9 | Difference Equations and Stability | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 10 | System Response and Step Response | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 11 | CT Fourier and Laplace as System Tools | PARTIAL | $A$ (amplitude), $\delta'(\omega)$, $\sigma_{max}$, ROC |
| Mathematics | 07_Signals_and_Systems.md | 12 | Correlation and Spectral Density | DEFINED | - |
| Mathematics | 07_Signals_and_Systems.md | 13 | Sampling and Circular Convolution | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 1 | Error Analysis, Roundoff and Truncation | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 2 | Bisection and Regula Falsi | PARTIAL | $x_r$ (approximate root), $n$ (iterations) |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 3 | Newton-Raphson and Secant | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 4 | Newton's Divided Difference Interpolation | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 5 | Lagrange Interpolation | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 6 | Trapezoidal Rule | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 7 | Simpson's One-Third and Three-Eighth Rules | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 8 | Euler's Method | PARTIAL | LTE (local truncation error), $p$ (order) |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 9 | Modified Euler and Heun's Method | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 11 | Numerical Differentiation | DEFINED | - |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 12 | Iterative Linear Solvers | PARTIAL | $D$, $L$, $U$ (matrix triangular parts), $k$ (iteration index) |
| Mathematics | 08_Numerical_Methods_and_Analysis.md | 10 | Runge-Kutta 4th Order | DEFINED | - |
| Mathematics | 09_Engineering_Data_Analysis.md | 1 | Central Tendency | DEFINED | - |
| Mathematics | 09_Engineering_Data_Analysis.md | 2 | Dispersion, Variance, SD, IQR and CV | DEFINED | - |
| Mathematics | 09_Engineering_Data_Analysis.md | 3 | Permutations and Combinations | DEFINED | - |
| Mathematics | 09_Engineering_Data_Analysis.md | 4 | Probability Rules and Bayes | PARTIAL | $p_i$ (path reliability), $P(\text{none})$ |
| Mathematics | 09_Engineering_Data_Analysis.md | 5 | Binomial and Geometric Distributions | PARTIAL | $M(t)$ (moment generating function), $s$, $t$ |
| Mathematics | 09_Engineering_Data_Analysis.md | 6 | Poisson and Hypergeometric Distributions | PARTIAL | FPC, CLT, $K$, $N$ |
| Mathematics | 09_Engineering_Data_Analysis.md | 7 | Uniform and Exponential Distributions | PARTIAL | MTBF, $R(x)$ (reliability function) |
| Mathematics | 09_Engineering_Data_Analysis.md | 8 | Normal Distribution and Z Scores | DEFINED | - |
| Mathematics | 09_Engineering_Data_Analysis.md | 9 | Sampling Techniques and Sampling Distributions | PARTIAL | $\rho$ (intraclass correlation), $\bar m$ (cluster size), $E$, $z_{\alpha/2}$ |
| Mathematics | 09_Engineering_Data_Analysis.md | 10 | Central Limit Theorem | DEFINED | - |
| Mathematics | 09_Engineering_Data_Analysis.md | 11 | Confidence Intervals | DEFINED | - |
| Mathematics | 09_Engineering_Data_Analysis.md | 12 | Hypothesis Testing, Z, t and p Errors | PARTIAL | $s_p$ (pooled SD), $q_0$, $\bar d$ |
| Mathematics | 09_Engineering_Data_Analysis.md | 13 | Linear Regression and Pearson r | PARTIAL | SSE, SST, $s_e$, $s_b$, $d_i$, $x_0$ |
| Mathematics | 09_Engineering_Data_Analysis.md | 14 | ANOVA and DOE | PARTIAL | $\eta^2$, $I$ (defining relation), $q_\alpha$ |
| Electronics_Engineering | 01_DC_Circuits.md | 1 | Circuit Variables, Ohm's Law and Signs | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 2 | KCL, KVL, Series and Parallel Reduction | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 3 | Delta-Wye Transformations | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 4 | Mesh Analysis and Supermesh | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 5 | Nodal Analysis and Supernodes | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 6 | Superposition Theorem | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 7 | Thevenin and Norton Equivalents | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 8 | Maximum Power Transfer and Source Transformation | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 9 | Millman's and Tellegen Theorems | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 10 | Inductors, Capacitors and Energy | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 11 | First Order RC and RL Transients | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 12 | Second Order RLC Natural Response | DEFINED | - |
| Electronics_Engineering | 01_DC_Circuits.md | 13 | Mutual Inductance and Coupled Coils | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 1 | Sinusoid, RMS, Average, Form and Crest | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 2 | Phasors and Complex Impedance | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 3 | Series and Parallel AC Analysis | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 4 | AC Thevenin, Norton and Max Power | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 5 | AC Power, PQS and Triangle | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 6 | Power Factor and Correction | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 7 | Series Resonance | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 8 | Parallel Resonance and Anti-Resonance | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 9 | Balanced Wye and Delta Systems | DEFINED | - |
| Electronics_Engineering | 02_AC_Circuits.md | 10 | Three-Phase Power and Two-Wattmeter | DEFINED | - |
| Electronics_Engineering | 03_Two_Port_Networks.md | 1 | Two-Port Variables and Conventions | DEFINED | - |
| Electronics_Engineering | 03_Two_Port_Networks.md | 2 | Z and Y Parameters | DEFINED | - |
| Electronics_Engineering | 03_Two_Port_Networks.md | 3 | T and Pi Equivalent Networks | DEFINED | - |
| Electronics_Engineering | 03_Two_Port_Networks.md | 4 | Hybrid and Inverse Hybrid Parameters | PARTIAL | $r_\pi$ (input resistance), $r_o$ (output resistance) |
| Electronics_Engineering | 03_Two_Port_Networks.md | 5 | Transmission ABCD Parameters | PARTIAL | $n$ (turns ratio), $Z_1$, $Z_2$ (T-network arms), $Y$ |
| Electronics_Engineering | 03_Two_Port_Networks.md | 6 | Parameter Conversions and Determinants | DEFINED | - |
| Electronics_Engineering | 03_Two_Port_Networks.md | 7 | Reciprocity and Symmetry Conditions | DEFINED | - |
| Electronics_Engineering | 03_Two_Port_Networks.md | 8 | Interconnections: Series, Parallel, Cascade | DEFINED | - |
| Electronics_Engineering | 03_Two_Port_Networks.md | 9 | Terminated Networks and Gains | PARTIAL | $G_T$, $P_{avail}$, $P_{L,\text{ref}}$, $P_{L,\text{loaded}}$, $P_{in}$ |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 1 | Intrinsic, Extrinsic and Carrier Transport | PARTIAL | $N_c$, $N_v$ (band densities), $B$, $E$ (field), $N_D^+$, $N_A^-$ |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 2 | PN Junction and Depletion Region | PARTIAL | $\tau_T$ (transit time), $C_{j0}$ (zero-bias capacitance), $C_d$ |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 3 | Diode Characteristics and Shockley | DEFINED | - |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 4 | Diode Models and Load Line | PARTIAL | $V_\gamma$ (knee voltage), $V_{DQ}$, $I_{DQ}$ |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 5 | Rectifiers: Half-Wave, Center-Tapped, Bridge | PARTIAL | $I_m$ (peak current), $I_{surge}$, $\theta_{cond}$ |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 6 | Filters, Ripple Factor and PIV | DEFINED | - |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 7 | Clippers, Clampers and Multipliers | PARTIAL | $V_{ref}$ (reference level), $V_\gamma$, $T$ |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 8 | Zener Diodes and Shunt Regulators | PARTIAL | TC (temperature coefficient), $V_{Z0}$ (knee voltage) |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 9 | BJT Structure and Operating Regions | DEFINED | - |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 10 | BJT Current Gains and Relationships | DEFINED | - |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 11 | JFET Characteristics and Pinch-Off | DEFINED | - |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 12 | MOSFET Types and Regions | PARTIAL | $\gamma$ (body effect), $\phi_F$ (surface potential), $V_{SB}$, $V_{th0}$, $C_{ox}$ |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 13 | Thyristors: UJT, SCR, DIAC, TRIAC | PARTIAL | $\alpha$ (firing angle), $R_{B1}$, $R_{B2}$, $V_{BB}$ |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 14 | Optoelectronics and Solar Cells | PARTIAL | $I_L$, $I_0$, $I_{sc}$, FF, AM1.5 |
| Electronics_Engineering | 04_Semiconductor_Devices.md | 15 | Special Diodes: Varactor, Schottky, Tunnel | PARTIAL | $C_0$, $V_0$, $t_{rr}$ (reverse recovery), NDR, $V_P$, $V_V$ |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 1 | BJT DC Biasing Configurations | DEFINED | - |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 2 | Load Lines and Q Point | DEFINED | - |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 3 | Bias Stability and Stability Factors | PARTIAL | $I_{CO}$ (leakage current), $I_{C1}$, $\beta_1$, $P_{D,max}$ |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 4 | FET Biasing Configurations | DEFINED | - |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 5 | BJT Small-Signal h-Parameter Model | PARTIAL | $R_L'$ (effective AC load), $r_\pi$, $r_o$ |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 6 | Small-Signal re Model: CE, CB, CC | PARTIAL | $R_{in,source}$ (source resistance), $f_L$ (lower cutoff) |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 7 | Hybrid-Pi Model | DEFINED | - |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 8 | FET Amplifiers: CS, CD, CG | PARTIAL | $R_S'$, $R_D'$ (effective loads), $r_d$ |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 9 | Multistage, Cascade and Cascode | DEFINED | - |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 10 | Darlington and Feedback Pairs | DEFINED | - |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 11 | Frequency Response and Bode Plots | PARTIAL | $A_{v,mid}$ (mid-band gain), $C_C$ (coupling cap), $R_{Th}$, $C_{in}$ |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 12 | Miller's Theorem and High-Frequency Effects | DEFINED | - |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 13 | Gain-Bandwidth Product and fT | PARTIAL | GBW, $R_f$, $R_i$, $r_b$ (base resistance), SR, $V_{op}$ |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 14 | Feedback Amplifier Topologies | PARTIAL | THD, $R_m$ (transresistance), $G_m$ (transconductance), $S_A^{A_f}$ |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 15 | Power Amplifiers: Classes A, B, AB, C | PARTIAL | $\theta_{JA}$ (thermal resistance), $T_A$, $T_J$, $Q$ (tank Q) |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 16 | Oscillators: RC Phase Shift and Wien Bridge | PARTIAL | $R_f$, $R_i$, $A_{loop}$ (loop gain) |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 17 | Oscillators: Hartley, Colpitts, Crystal | DEFINED | - |
| Electronics_Engineering | 05_Circuit_Analysis_and_Design.md | 18 | Current Mirrors | PARTIAL | $I_S$ (transistor saturation current), $R_E$ |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 1 | Power Switches: MOSFET, IGBT, GTO, TRIAC | PARTIAL | $Q_g$, $V_g$, $\beta_{off}$, $R_{DS(on)}$, $P_{leak}$ |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 2 | Thermal Resistance and Heat Sinking | DEFINED | - |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 3 | SCR Phase-Controlled Rectifiers | DEFINED | - |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 4 | Buck Converter | PARTIAL | CCM, DCM (conduction modes) |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 5 | Boost Converter | DEFINED | - |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 6 | Buck-Boost Converter | DEFINED | - |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 7 | Inverters: Half-Bridge and Full-Bridge | PARTIAL | THD, $V_{1,rms}$, $V_n$, $V_{o,1}$ |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 8 | PWM Techniques | DEFINED | - |
| Electronics_Engineering | 06_Power_Electronics_and_Systems.md | 9 | Linear Voltage Regulators | PARTIAL | $I_Q$ (quiescent current), PSRR, $V_{DO}$ (dropout) |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 1 | Op-Amp Fundamentals and Real Parameters | PARTIAL | CMRR, PSRR, $V_{os}$, $I_B$, $A_d$, $A_{cm}$, $R_{comp}$, $\beta$ |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 2 | Linear Op-Amp Circuits | DEFINED | - |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 3 | Instrumentation and Difference Amplifiers | PARTIAL | $R$ (gain-set resistor), $R_G$, $V_{o1}$, $V_{o2}$ |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 4 | Integrators and Differentiators | DEFINED | - |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 5 | Comparators and Schmitt Triggers | PARTIAL | UTP, LTP (threshold abbreviations), GBW |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 6 | Precision Rectifiers | DEFINED | - |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 7 | Active Filter Responses | PARTIAL | $H_{LP}$, $H_{HP}$, $H_{BP}$, $H_{BR}$, $\omega_z$, $M_p$ |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 8 | Sallen-Key Filter Design | DEFINED | - |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 9 | Temperature Sensors | PARTIAL | $K$ (IC sensitivity), $\theta$ (thermal resistance), $T_0$, $R_0$ |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 10 | Strain Gauges and Wheatstone Bridge | PARTIAL | $E$ (modulus of elasticity), $R_1$–$R_4$ (bridge arms) |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 11 | Position Sensors: LVDT, Hall, Encoders | PARTIAL | PPR, $n$ (carrier density), $q$ (carrier charge), $t$ (thickness) |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 12 | Signal Conditioning and DAQ | PARTIAL | LSB, ENOB, SNR, $A$, $A_p$, $f_p$ |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 13 | ADC Architectures and Quantization | PARTIAL | INL, DNL, SINAD, SFDR, ENOB, $t_{acq}$, $T_{clk}$ |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 14 | DAC Architectures | PARTIAL | $b_k$ (bit coefficient), DNL, INL, $t_{settle}$ |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 15 | PLC Architecture and Scan Cycle | DEFINED | - |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 16 | Ladder Logic, Timers and Counters | PARTIAL | DN, PT, PRE, RES, $K$ (units/pulse) |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 17 | Measurements and Instrumentation | DEFINED | - |
| Electronics_Engineering | 07_Industrial_Automation_and_Sensors.md | 18 | Building, AV and Industrial Integration | PARTIAL | $N$ (shaft speed), $Q$ (flow), $H$ (head), $P$ (power) |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 1 | Number Systems and Base Conversion | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 2 | Signed Arithmetic and Two's Complement | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 3 | Codes: BCD, Gray, ASCII, Parity | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 4 | Boolean Algebra and De Morgan | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 5 | SOP, POS, Minterms and Maxterms | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 6 | Karnaugh Maps | PARTIAL | prime implicants, $d$ (don't-care set), $k$ |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 7 | Adders and Subtractors | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 8 | Encoders and Decoders | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 9 | Multiplexers and Demultiplexers | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 10 | Latches and Flip-Flops | PARTIAL | $X$ (don't-care entry in excitation table) |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 11 | Flip-Flop Timing, Setup and Hold | PARTIAL | $t_{PHL}$, $t_{PLH}$ (propagation delays), $t_{logic,min}$ |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 12 | Shift Registers | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 13 | Asynchronous and Synchronous Counters | PARTIAL | $t_{FF}$ (flip-flop delay), $N_{reset}$ |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 14 | Finite State Machines | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 15 | ASM Charts | DEFINED | - |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 16 | Logic Families: TTL vs CMOS and Interfacing | PARTIAL | PDP, $C_L$ (load capacitance), $V_{DD}$ |
| Electronics_Engineering | 08_Logic_Circuits_and_Switching.md | 17 | Asynchronous Logic, Hazards and Races | DEFINED | - |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 1 | CPU Architecture: CISC and RISC | PARTIAL | MIPS, $S_{part}$ (part speedup), CISC, RISC |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 2 | Registers, Buses and Memory Organization | PARTIAL | Z, C, N, V (processor status flags) |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 3 | Memory Technologies and Address Decoding | PARTIAL | $t_{RC}$ (DRAM row cycle), $N_{rows}$, $C_{total}$, $C_{chip}$ |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 4 | Instruction and Machine Cycles | DEFINED | - |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 5 | Addressing Modes and Instruction Sets | PARTIAL | $\#$ (immediate prefix), $M[\,]$ (memory at address), $R_b$ |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 6 | Interrupts and ISRs | PARTIAL | ISR, $t_{vector}$ (vector fetch time) |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 7 | DMA and Bus Arbitration | DEFINED | - |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 8 | GPIO and Timer Peripherals | DEFINED | - |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 9 | PWM and ADC/DAC Modules | PARTIAL | $N_{cycles}$ (ADC clock cycles), SNR, CCR |
| Electronics_Engineering | 09_Microprocessors_and_Embedded.md | 10 | Serial Interfaces: UART, SPI, I2C | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 1 | Time vs Frequency and Line Spectra | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 2 | Power Spectral Density | PARTIAL | ROC (region of convergence), $z$ |
| EST | 01_Signals_Spectra_and_Noise.md | 3 | Thermal and Johnson Noise | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 4 | Shot, Flicker and Transit-Time Noise | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 5 | SNR, Noise Factor and Noise Figure | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 6 | Equivalent Noise Temperature | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 7 | Sampling Theorem and Aliasing | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 8 | Sampling Types and Aperture Effect | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 9 | Anti-Aliasing Filters | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 10 | DFT and FFT | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 11 | FIR vs IIR Filters | DEFINED | - |
| EST | 01_Signals_Spectra_and_Noise.md | 12 | IIR Filters | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 1 | AM Fundamentals and Modulation Index | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 2 | AM Spectrum, Bandwidth and Power | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 3 | DSB-SC and SSB-SC | PARTIAL | LPF (low-pass filter), $\phi$ (phase error) |
| EST | 02_Principles_of_Communications.md | 4 | VSB and AM Variants Comparison | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 5 | FM and PM Fundamentals | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 6 | FM Sidebands and Bessel Functions | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 7 | Carson's Rule and FM Bandwidth | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 8 | NBFM vs WBFM | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 9 | FM Noise and Threshold Effect | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 10 | AM vs FM Noise Comparison | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 11 | Pre-Emphasis and De-Emphasis | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 12 | Superheterodyne Receiver | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 13 | Image Frequency and IRR | DEFINED | - |
| EST | 02_Principles_of_Communications.md | 14 | AGC and Receiver Characteristics | PARTIAL | AGC (automatic gain control), $P_{f_{\pm\Delta}}$, $\Delta$ (offset), $T$ (loop gain) |
| EST | 02_Principles_of_Communications.md | 15 | Signal Levels and the Telephony Reference | DEFINED | - |
| EST | 03_Digital_Communications.md | 1 | Pulse Modulation: PAM, PWM, PPM | DEFINED | - |
| EST | 03_Digital_Communications.md | 2 | PCM: Sampling, Quantizing, Encoding | PARTIAL | NRZ (non-return-to-zero) |
| EST | 03_Digital_Communications.md | 3 | Quantization Noise and SQNR | DEFINED | - |
| EST | 03_Digital_Communications.md | 4 | Companding: Mu-Law and A-Law | DEFINED | - |
| EST | 03_Digital_Communications.md | 5 | Delta Modulation and ADM | DEFINED | - |
| EST | 03_Digital_Communications.md | 6 | Line Coding Schemes | PARTIAL | AMI, RZ, 2B1Q |
| EST | 03_Digital_Communications.md | 7 | Inter-Symbol Interference and Nyquist Criterion | DEFINED | - |
| EST | 03_Digital_Communications.md | 8 | Eye Diagrams and Equalization | PARTIAL | MSE, ZF, MMSE, DFE, LMS |
| EST | 03_Digital_Communications.md | 9 | ASK, OOK and FSK | PARTIAL | AWGN, $Q(\cdot)$ (Gaussian tail function) |
| EST | 03_Digital_Communications.md | 10 | BPSK and QPSK | PARTIAL | AWGN, $Q(\cdot)$ |
| EST | 03_Digital_Communications.md | 11 | M-ary PSK and 16-QAM | PARTIAL | AWGN, $Q(\cdot)$ |
| EST | 03_Digital_Communications.md | 12 | Constellation and BER Comparison | PARTIAL | AWGN, $Q(\cdot)$ |
| EST | 03_Digital_Communications.md | 13 | Matched Filter and Optimum Detection | PARTIAL | AWGN, MAP, ML, $Q(\cdot)$ |
| EST | 03_Digital_Communications.md | 14 | Information Theory and Entropy | DEFINED | - |
| EST | 03_Digital_Communications.md | 15 | Shannon-Hartley Capacity | DEFINED | - |
| EST | 03_Digital_Communications.md | 16 | Error Control: Hamming and CRC | PARTIAL | CRC, SEC, FCS |
| EST | 04_Data_Communications_and_Networking.md | 1 | OSI Seven-Layer Model | PARTIAL | PDU, FCS, MTU, OSI |
| EST | 04_Data_Communications_and_Networking.md | 2 | TCP/IP Protocol Suite | DEFINED | - |
| EST | 04_Data_Communications_and_Networking.md | 3 | Framing and Flow Control | PARTIAL | AMI (alternate mark inversion) |
| EST | 04_Data_Communications_and_Networking.md | 4 | ARQ: Stop-and-Wait, GBN, Selective Repeat | PARTIAL | ARQ, GBN, SR |
| EST | 04_Data_Communications_and_Networking.md | 5 | HDLC and PPP | PARTIAL | LCP, NCP, PAP, CHAP, ABM, ARM, FCS |
| EST | 04_Data_Communications_and_Networking.md | 6 | MAC Protocols and Ethernet | PARTIAL | CSMA/CD, SFD, DA, SA, BPDU, STP, UTP |
| EST | 04_Data_Communications_and_Networking.md | 7 | Wireless LAN and CSMA/CA | PARTIAL | DCF, DIFS, SIFS, RTS, CTS, CW |
| EST | 04_Data_Communications_and_Networking.md | 8 | Switching: Circuit vs Packet | DEFINED | - |
| EST | 04_Data_Communications_and_Networking.md | 9 | IPv4 Addressing and Classes | PARTIAL | APIPA, $s$ (subnet bits) |
| EST | 04_Data_Communications_and_Networking.md | 10 | Subnetting, CIDR and VLSM | DEFINED | - |
| EST | 04_Data_Communications_and_Networking.md | 11 | IPv6 Structure | PARTIAL | SLAAC, EUI-64, DSCP, ECN, TTL |
| EST | 04_Data_Communications_and_Networking.md | 12 | Routing Algorithms: Distance Vector and Link State | PARTIAL | LSA, SPF, $O(\cdot)$ |
| EST | 04_Data_Communications_and_Networking.md | 13 | TCP vs UDP and Port Numbers | PARTIAL | AIMD |
| EST | 04_Data_Communications_and_Networking.md | 14 | Multiplexing: FDM, TDM, T1 and E1 | PARTIAL | FDM, TDM, STDM, B8ZS, HDB3 |
| EST | 04_Data_Communications_and_Networking.md | 15 | WDM and DWDM | PARTIAL | WDM, DWDM, CWDM, EDFA, $R_{ch}$ |
| EST | 04_Data_Communications_and_Networking.md | 16 | Multiple Access: FDMA, TDMA, CDMA | PARTIAL | FDMA, TDMA, CDMA, PN, PAPR |
| EST | 04_Data_Communications_and_Networking.md | 17 | OFDMA and Spread Spectrum | PARTIAL | OFDM, OFDMA, DS-SS, FH-SS |
| EST | 04_Data_Communications_and_Networking.md | 18 | Cellular Fundamentals, Reuse and Handoff | DEFINED | - |
| EST | 04_Data_Communications_and_Networking.md | 19 | Cellular Generations 2G to 5G | PARTIAL | URLLC, eMBB, mMTC, HSDPA, HSUPA |
| EST | 04_Data_Communications_and_Networking.md | 20 | Network Topologies | DEFINED | - |
| EST | 04_Data_Communications_and_Networking.md | 21 | Network Security | PARTIAL | AES, DES, 3DES, ECC, MAC |
| EST | 05_Transmission_Lines_and_Waveguides.md | 1 | Primary Constants R, L, G, C | DEFINED | - |
| EST | 05_Transmission_Lines_and_Waveguides.md | 2 | Secondary Constants Z0 and Gamma | DEFINED | - |
| EST | 05_Transmission_Lines_and_Waveguides.md | 3 | Lossless and Distortionless Lines | DEFINED | - |
| EST | 05_Transmission_Lines_and_Waveguides.md | 4 | Reflection Coefficient and VSWR | DEFINED | - |
| EST | 05_Transmission_Lines_and_Waveguides.md | 5 | Input Impedance and Quarter-Wave Transformer | PARTIAL | $Q$ (quality factor), $\ell$ (physical length) |
| EST | 05_Transmission_Lines_and_Waveguides.md | 6 | Smith Chart | DEFINED | - |
| EST | 05_Transmission_Lines_and_Waveguides.md | 7 | Stub Matching | DEFINED | - |
| EST | 05_Transmission_Lines_and_Waveguides.md | 8 | Waveguide TE and TM Modes | DEFINED | - |
| EST | 05_Transmission_Lines_and_Waveguides.md | 9 | Cutoff Frequency and Guide Wavelength | DEFINED | - |
| EST | 05_Transmission_Lines_and_Waveguides.md | 10 | Phase and Group Velocity | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 1 | Antenna Parameters: Directivity, Gain, EIRP | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 2 | Radiation Resistance, Efficiency and Capture Area | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 3 | Hertzian and Half-Wave Dipoles | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 4 | Marconi, Folded Dipole, Yagi-Uda | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 5 | Parabolic Reflector Antennas | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 6 | FSPL and Friis Transmission Equation | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 7 | Ground Wave Propagation | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 8 | Space Wave and Radio Horizon | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 9 | Sky Wave and Ionospheric Layers | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 10 | Critical Frequency, MUF and Skip Distance | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 11 | Radar Range Equation and Microwave Links | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 12 | Television Systems and ISDB-T | PARTIAL | $f_{sc}$ (colour subcarrier), $b_{subcarrier}$, $N_{carriers}$, ISDB-T, NTSC |
| EST | 06_Antenna_Systems_and_Propagation.md | 13 | Satellite Orbits, Transponders and G/T | PARTIAL | $C/N_0$ (carrier-to-noise density), VSAT, dBHz |
| EST | 06_Antenna_Systems_and_Propagation.md | 14 | Optical Fiber NA, V Number and Modes | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 15 | Fiber Attenuation and Dispersion | DEFINED | - |
| EST | 06_Antenna_Systems_and_Propagation.md | 16 | Optical Sources, Detectors and Power Budget | PARTIAL | APD, PIN, MSM, NRZ |
| EST | 06_Antenna_Systems_and_Propagation.md | 17 | Antenna Arrays and Polarization | DEFINED | - |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 1 | The 4–20 mA Current Loop | PARTIAL | HART, FSK, Profibus PA |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 2 | Temperature Sensors: Thermocouples and RTDs | DEFINED | - |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 3 | Humidity, Strain, Proximity and Switch Sensors | PARTIAL | PNP, NPN, SPDT, $C_{dry}$ |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 4 | PLC Architecture and the Scan Cycle | PARTIAL | $T_{filter}$ (input filter delay), LSB |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 5 | Ladder Logic Programming | DEFINED | - |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 6 | PID Control | PARTIAL | $\tau_D$ (derivative filter time) |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 7 | SCADA, HMI and Industrial Networks | PARTIAL | SCADA, HMI, RTU, MES, ERP, IIoT |
| EST | 07_Industrial_Automation_and_Instrumentation.md | 8 | Building Automation, HVAC and Life Safety | PARTIAL | VFD, BAS, MS/TP |
| GEAS | 01_General_Chemistry.md | 1 | Atomic Structure and Configurations | PARTIAL | $R_H$ (Rydberg constant), $\Delta x$, $\Delta p$, $m$ (electron mass), $c$ |
| GEAS | 01_General_Chemistry.md | 2 | Periodic Trends | PARTIAL | $\mu$ (dipole moment), $q$ (charge), $d$ (separation) |
| GEAS | 01_General_Chemistry.md | 3 | Chemical Bonding | PARTIAL | $k$ (Coulomb constant), $n$ (Born exponent), $\varepsilon_0$ |
| GEAS | 01_General_Chemistry.md | 4 | Mole Concept and Stoichiometry | DEFINED | - |
| GEAS | 01_General_Chemistry.md | 5 | Limiting Reagents and Yield | DEFINED | - |
| GEAS | 01_General_Chemistry.md | 6 | Solutions and Concentration Units | PARTIAL | $N$ (normality), $k_H$ (Henry constant), $P^\circ$ (pure-solvent vapour pressure) |
| GEAS | 01_General_Chemistry.md | 7 | Chemical Equilibrium and Le Chatelier | DEFINED | - |
| GEAS | 01_General_Chemistry.md | 8 | pH, pOH and Buffers | DEFINED | - |
| GEAS | 01_General_Chemistry.md | 9 | Redox and Galvanic Cells | PARTIAL | SHE (standard hydrogen electrode) |
| GEAS | 01_General_Chemistry.md | 10 | Nernst Equation and Faraday's Laws | DEFINED | - |
| GEAS | 01_General_Chemistry.md | 11 | Battery Chemistries | PARTIAL | $C_p$ (Peukert capacity), $k$ (Peukert exponent) |
| GEAS | 02_University_Physics.md | 1 | Kinematics 1D and 2D | DEFINED | - |
| GEAS | 02_University_Physics.md | 2 | Newton's Laws, Friction and Circular Motion | DEFINED | - |
| GEAS | 02_University_Physics.md | 3 | Work, Energy and Conservation | DEFINED | - |
| GEAS | 02_University_Physics.md | 4 | Momentum and Collisions | DEFINED | - |
| GEAS | 02_University_Physics.md | 5 | Rotational Kinematics and Torque | DEFINED | - |
| GEAS | 02_University_Physics.md | 6 | Angular Momentum and Rigid Bodies | DEFINED | - |
| GEAS | 02_University_Physics.md | 7 | Fluid Statics: Pascal and Archimedes | DEFINED | - |
| GEAS | 02_University_Physics.md | 8 | Fluid Dynamics: Continuity and Bernoulli | DEFINED | - |
| GEAS | 02_University_Physics.md | 9 | Thermal Expansion and Calorimetry | DEFINED | - |
| GEAS | 02_University_Physics.md | 10 | Heat Transfer | DEFINED | - |
| GEAS | 02_University_Physics.md | 11 | First Law and Processes | DEFINED | - |
| GEAS | 02_University_Physics.md | 12 | Second Law, Entropy and Carnot | DEFINED | - |
| GEAS | 02_University_Physics.md | 13 | SHM and Waves | PARTIAL | $k$ (angular wavenumber), $\Delta$ (path difference), $m$ (interference order) |
| GEAS | 02_University_Physics.md | 14 | Sound and Doppler | DEFINED | - |
| GEAS | 02_University_Physics.md | 15 | Reflection and Refraction | PARTIAL | $\Delta$ (angular dispersion), $A$ (prism apex angle) |
| GEAS | 02_University_Physics.md | 16 | Lenses and Mirrors | PARTIAL | $s$ (lens separation) |
| GEAS | 02_University_Physics.md | 17 | Electrostatics | PARTIAL | $Q$ (capacitor charge), $V$ (potential difference) |
| GEAS | 02_University_Physics.md | 18 | AC Circuits | PARTIAL | $\theta$ (power-factor angle) |
| GEAS | 02_University_Physics.md | 19 | Magnetism | DEFINED | - |
| GEAS | 02_University_Physics.md | 20 | Nuclear Physics | DEFINED | - |
| GEAS | 03_Materials_Science.md | 1 | Crystal Structures and Unit Cells | PARTIAL | APF, CN (coordination number), $c$ (HCP cell height) |
| GEAS | 03_Materials_Science.md | 2 | Atomic Packing Factor and Density | DEFINED | - |
| GEAS | 03_Materials_Science.md | 3 | Miller Indices | PARTIAL | $D$ (crystallite size), $\beta$ (peak breadth), $K$ (shape factor) |
| GEAS | 03_Materials_Science.md | 4 | Crystal Imperfections | DEFINED | - |
| GEAS | 03_Materials_Science.md | 5 | Stress, Strain and Mechanical Properties | DEFINED | - |
| GEAS | 03_Materials_Science.md | 6 | Hardness Testing | DEFINED | - |
| GEAS | 03_Materials_Science.md | 7 | Energy Bands and Classification | DEFINED | - |
| GEAS | 03_Materials_Science.md | 8 | Fermi Level | PARTIAL | $m_n^*$, $m_p^*$ (effective masses), $h$ |
| GEAS | 03_Materials_Science.md | 9 | Dielectric Properties and Breakdown | PARTIAL | $D$ (electric flux density), $\varepsilon'$, $\varepsilon''$, $S$ (strain), $d$ (piezoelectric coeff.) |
| GEAS | 03_Materials_Science.md | 10 | Magnetic Properties and Hysteresis | PARTIAL | $C$ (Curie constant), $k_h$, $k_e$, $B_m$ |
| GEAS | 03_Materials_Science.md | 11 | Diffusion and Fick's Laws | PARTIAL | erf (error function), $C_s$, $C_0$ |
| GEAS | 03_Materials_Science.md | 12 | Nanomaterials | PARTIAL | CVD, $r$ (particle radius) |
| GEAS | 03_Materials_Science.md | 13 | Polymers and Composites | DEFINED | - |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 1 | Ecosystems and Energy Flow | PARTIAL | $R$ (respiration loss), GPP, NPP |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 2 | Biogeochemical Cycles | DEFINED | - |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 3 | Air Pollution and Criteria Pollutants | PARTIAL | $C_p$ (measured concentration), $I_{hi}$, $I_{lo}$, VOC |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 4 | Greenhouse Effect, Ozone and Acid Rain | PARTIAL | $S$ (climate sensitivity parameter), GWP |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 5 | Water Quality: BOD, COD, DO, TDS | PARTIAL | $L_0$ (ultimate BOD), $V_0$, $V_1$, $M$, $Q_w$, $C_w$, $Q_r$, $C_r$ |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 6 | Solid, Hazardous and E-Waste | PARTIAL | $P$ (population), $W_{EEE}$, HHV, TCLP |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 7 | PD 1586, EIS and ECC | DEFINED | - |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 8 | RA 8749 Clean Air Act | PARTIAL | TSP, PTO, PAB |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 9 | RA 9275 Clean Water Act | DEFINED | - |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 10 | RA 9003 Solid Waste Management | DEFINED | - |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 11 | RA 6969 Toxic Substances | PARTIAL | PCB, TCLP, CCO |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 12 | Sustainability Frameworks | DEFINED | - |
| GEAS | 04_Environmental_Sci_and_PH_Laws.md | 13 | Energy Resources | PARTIAL | $\dot m$ (mass flow rate), $c_p$ (specific heat), $G$ (irradiance) |
| GEAS | 05_Engineering_Economy.md | 1 | Simple and Compound Interest | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 2 | Nominal vs Effective Rates | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 3 | Ordinary Annuity and Annuity Due | PARTIAL | $k$ (deferral period) |
| GEAS | 05_Engineering_Economy.md | 4 | Deferred Annuities and Perpetuities | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 5 | Arithmetic and Geometric Gradients | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 6 | Capitalized Cost | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 7 | PW, FW and AW Methods | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 8 | Rate of Return and Payback | PARTIAL | $np$ (discounted payback period), $k$ (year index) |
| GEAS | 05_Engineering_Economy.md | 9 | Benefit-Cost Ratio | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 10 | Depreciation: SLM and SYD | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 11 | Depreciation: DB and DDB | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 12 | Break-Even and Cost Analysis | DEFINED | - |
| GEAS | 05_Engineering_Economy.md | 13 | Replacement Analysis | DEFINED | - |
| GEAS | 06_Engineering_Management_and_PM.md | 1 | Management Functions and Organizational Structures | DEFINED | - |
| GEAS | 06_Engineering_Management_and_PM.md | 2 | TQM and Six Sigma | PARTIAL | DMADV, DFSS |
| GEAS | 06_Engineering_Management_and_PM.md | 3 | ISO 9001 Overview | PARTIAL | PDCA, OHS |
| GEAS | 06_Engineering_Management_and_PM.md | 4 | PERT/CPM Fundamentals | PARTIAL | PERT, CPM |
| GEAS | 06_Engineering_Management_and_PM.md | 5 | Network Passes, Float and Critical Path | PARTIAL | ES, EF, LS, LF, TF, FF, IF |
| GEAS | 06_Engineering_Management_and_PM.md | 6 | Project Crashing and Time-Cost Tradeoff | DEFINED | - |
| GEAS | 06_Engineering_Management_and_PM.md | 7 | Lean Startup and MVP | PARTIAL | CAC, ARPU |
| GEAS | 06_Engineering_Management_and_PM.md | 8 | Business Model Canvas and SWOT | PARTIAL | COGS, TOWS, SaaS |
| GEAS | 06_Engineering_Management_and_PM.md | 9 | Market Sizing: TAM, SAM, SOM | PARTIAL | MRR |
| GEAS | 06_Engineering_Management_and_PM.md | 10 | Funding, Burn Rate and Runway | PARTIAL | ARR, LTV, CAC, IPO, M&A |
| GEAS | 06_Engineering_Management_and_PM.md | 11 | Decision Analysis under Risk and Uncertainty | DEFINED | - |
| GEAS | 06_Engineering_Management_and_PM.md | 12 | Financial Ratios | DEFINED | - |
| GEAS | 06_Engineering_Management_and_PM.md | 13 | Motivation and Leadership | DEFINED | - |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 1 | RA 9292 Scope of Practice | DEFINED | - |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 2 | Titles: PECE, ECE, ECT and Seal | PARTIAL | PRC, BOECE, APO |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 3 | PRC and BEE Powers and Penal Provisions | DEFINED | - |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 4 | RA 7925 Telecom Policy and Carriers | PARTIAL | CPCN, NTC, DICT, PTE, VAS |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 5 | NTC Mandates and Regulations | DEFINED | - |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 6 | RA 10173 Data Privacy Act | PARTIAL | IRR |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 7 | RA 10175 Cybercrime Prevention Act | PARTIAL | RPC, DOJ, RTC |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 8 | DOLE DO 13 OSHS Safety | PARTIAL | DOLE, OSH, DO |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 9 | Philippine Electronics Code Books | PARTIAL | OFNP, OFNR, BOECE, PEC |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 10 | IECEP Code of Ethics | DEFINED | - |
| GEAS | 07_ECE_Laws_and_Professional_Ethics.md | 11 | Intellectual Property | DEFINED | - |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 1 | OOP Fundamentals: Classes, Objects and the Four Pillars | DEFINED | - |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 2 | Inheritance, Interfaces and Polymorphism | DEFINED | - |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 3 | Data Types, Casting and Control Flow | DEFINED | - |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 4 | Exception Handling and Programming Paradigms | PARTIAL | JVM |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 5 | SDLC Phases and Process Models | PARTIAL | SDLC |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 6 | UML Diagrams: Structure, Behaviour and Relationships | PARTIAL | UML |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 7 | GUI Vocabulary and Event Handling | PARTIAL | HWND, API |
| GEAS | 08_Computer_Systems_OOP_and_CAD.md | 8 | CAD Drafting Aids, Coordinates and Documentation | DEFINED | - |
## 3. File-level convention problems (reported, not fixed)

Everything below was observed while reading the files in full. Per the audit brief these are **reported only** — no subject file was modified.

### 3.1 Topic numbering and order

| File | Problem |
|---|---|
| `Mathematics/08_Numerical_Methods_and_Analysis.md` | Topic **10 (Runge-Kutta 4th Order) is placed after topics 11 and 12**, at the end of the file. File order is 1–9, 11, 12, 10. The `## Part C`/`## Part D` boundary is also misplaced relative to the numbering. Frontmatter `topics: 12` and the `###` count agree, and `00_Index.md` lists the same 12 topics, so only the order is wrong — but it breaks the style guide's "topic numbering is continuous across parts (1…N), never restarting or reordering". |

### 3.2 Index disagreement with the file

| File | Problem |
|---|---|
| `EST/00_Index.md` vs `EST/03_Digital_Communications.md` | The index row for subject 3 describes the parts as "**Part A** Pulse and PCM · **Part B** Line Coding and Bandpass · **Part C** Detection and Coding". The file has only **two** `## Part` headings: `## Part A — Pulse Modulation and PCM` and `## Part B — Bandpass Digital Modulation`. There is no Part C, and Part B's name does not match the index. |

Index **counts** were verified against the files and are all correct: Mathematics 132 (8+16+14+19+22+14+13+12+14), Electronics_Engineering 119, EST 99, GEAS 102 — per-file counts in every `00_Index.md` MOC table match the actual `###` counts, and each file's frontmatter `topics:` equals its `###` count.

### 3.3 Headings glued to the previous block

A `## Part X` heading that follows a completed topic must be preceded by a `---` rule. Heading counts below exclude the leading `## Part A`, which legitimately sits at the top of the file.

| File | Parts missing the preceding `---` |
|---|---|
| `Mathematics/02_Integral_Calculus.md` | Part C |
| `Mathematics/04_Advanced_Engineering_Math.md` | Part D |
| `Mathematics/07_Signals_and_Systems.md` | Part C |
| `Mathematics/08_Numerical_Methods_and_Analysis.md` | Part D |
| `Electronics_Engineering/01_DC_Circuits.md` | Parts B and C |
| `Electronics_Engineering/02_AC_Circuits.md` | Part B |
| `Electronics_Engineering/03_Two_Port_Networks.md` | Part B |
| `Electronics_Engineering/04_Semiconductor_Devices.md` | Part C |
| `Electronics_Engineering/05_Circuit_Analysis_and_Design.md` | 2 of Parts B/C/D |
| `Electronics_Engineering/06_Power_Electronics_and_Systems.md` | Parts B and C |
| `Electronics_Engineering/07_Industrial_Automation_and_Sensors.md` | Parts B and C |
| `Electronics_Engineering/08_Logic_Circuits_and_Switching.md` | Parts B, C and D |
| `Electronics_Engineering/09_Microprocessors_and_Embedded.md` | Part B |

All seven `EST/` files and all eight `GEAS/` files separate their parts correctly.

### 3.4 Doubled `---` rules

`Mathematics/02_Integral_Calculus.md`, `04_Advanced_Engineering_Math.md`, `07_Signals_and_Systems.md` and `08_Numerical_Methods_and_Analysis.md` each end with **two consecutive `---` rules** immediately before `→ Back to [[00_Index]]`.

### 3.5 Callouts detached from their topic

| File | Problem |
|---|---|
| `EST/01_Signals_Spectra_and_Noise.md` | **4 callouts** (2 `[!tip]`, 2 `[!warning]`) sit after the final topic's `**Conditions:**` line, before the closing rule and the back-link — they summarise topics 3, 5, 6 and 7 but are attached to nothing. |
| `EST/03_Digital_Communications.md` | **3 callouts** after the final topic's `**Conditions:**` line (they belong to topics 7 and 2). |
| `EST/05_Transmission_Lines_and_Waveguides.md` | **2 callouts** after the final topic's `**Conditions:**` line. |
| `EST/04_Data_Communications_and_Networking.md` | 2 callouts stacked between topic 19's `**Conditions:**` line and the `## Part D` heading. |
| `Electronics_Engineering/01_DC_Circuits.md` | The "Series vs parallel RLC swap the α formula" `[!warning]` sits **after** the `---` that closes topic 12, i.e. between the topic's closing rule and `## Part C`, so it reads as belonging to no topic. |

### 3.5b `---` before the back-link

The style guide asks for `---` rules "between topics and parts" but its own file skeleton ends the last topic with the back-link directly. The corpus is split: **12 files** close the final topic with a `---` before `→ Back to [[00_Index]]`, while **21 files** place the back-link immediately after the last topic's `Conditions:` or callout (`Mathematics/08`, `Mathematics/09`, all nine `Electronics_Engineering/` files, `EST/07`, and all eight `GEAS/` files). Whichever convention is chosen should be applied to every file.

### 3.6 Tags

| Problem | Files |
|---|---|
| **No `#tags` anywhere in the file** | `GEAS/01_General_Chemistry.md`, `02_University_Physics.md`, `03_Materials_Science.md`, `04_Environmental_Sci_and_PH_Laws.md`, `05_Engineering_Economy.md`, `06_Engineering_Management_and_PM.md`, `07_ECE_Laws_and_Professional_Ethics.md` (all seven) plus `Mathematics/01_Differential_Calculus.md` and `03_Differential_Equations.md`. The style guide asks for `#tags` "where genuinely useful for search". |
| **Tags appended inside the `**Conditions:**` line** instead of standing alone | Worst: `EST/04` (21 lines), `Electronics_Engineering/07` (18), `Electronics_Engineering/05` (17), `Electronics_Engineering/08` (17), `EST/06` (17), `EST/03` (16), `Electronics_Engineering/04` (15), `EST/02` (15), `Mathematics/06` (14). The style guide wants exactly one tight `**Conditions:**` line; these lines carry conditions *plus* two or three tags, which also pushes them past the 180-character limit. |
| **Tags with a stray trailing period** | `Mathematics/07_Signals_and_Systems.md` topic 7 (`#ztransform.`) and topic 9 (`#ztransform #stability.`), topic 11 (`#signals.`). |
| **Tags inside a bold label / heading** | `Mathematics/09_Engineering_Data_Analysis.md` line 223 `**Sampling techniques #statistics**` and line 375 `**Prediction and Spearman #statistics ★**`. |

### 3.7 Structural inconsistency across vaults

| Problem | Detail |
|---|---|
| H1 heading present in one vault family only | Every `Electronics_Engineering/` and `EST/` file opens with `# <Subject Name>`. `Mathematics/08` and `09` have one; `Mathematics/01`–`07` do not. **No `GEAS/` file has an H1** — they all start straight at `## Part A`. |
| Frontmatter tag style differs | `GEAS/08_Computer_Systems_OOP_and_CAD.md` and `Mathematics/08`/`09` carry a stray inline tag line near the top (`# Numerical Methods and Analysis` + `#numerical #errors …`, `# Engineering Data Analysis #statistics …`) duplicating the frontmatter tags. |
| Display-math density collapses in GEAS | `GEAS/07_ECE_Laws_and_Professional_Ethics.md` has **2** `$$` blocks in 11 topics; `GEAS/08_Computer_Systems_OOP_and_CAD.md` has 8 in 8 topics (and several are prose identities such as `object = state + behaviour + identity`); `GEAS/04` topics 7–12 (the six Philippine-law topics) contain **none** — they are bulleted legal lists; `GEAS/06` topics 3, 7, 8 have no display math at all. These files are formula sheets only in name. |

### 3.8 Semicolon chains and over-long lines

- **Semicolon chains (4 or more `;` on one source line):** `Mathematics/09_Engineering_Data_Analysis.md` (3 lines), `GEAS/04_Environmental_Sci_and_PH_Laws.md` (2), `GEAS/07_ECE_Laws_and_Professional_Ethics.md` (2), `Mathematics/04_Advanced_Engineering_Math.md` (1).
- **Lines over 180 characters:** `EST/06_Antenna_Systems_and_Propagation.md` (47 lines), `EST/04_Data_Communications_and_Networking.md` (26), `EST/07` (25), `EST/05` (24), `Mathematics/04` (18), `Electronics_Engineering/07` (17), `Electronics_Engineering/08` (17), `GEAS/02_University_Physics.md` (15), `GEAS/03_Materials_Science.md` (15). These are almost always `**Conditions:**` lines that have absorbed a symbol legend plus tags.
- Unescaped pipes inside math in table rows: **0** in all four vaults (the style guide's own `# must print 0` check passes).

### 3.9 Video embeds / filler prose

Every file except `GEAS/07` embeds raw YouTube links (`![](https://www.youtube.com/watch?v=…)`) followed by an italic caption line such as `*Video: … — Professor Dave Explains, 9:12*`. Densest: `EST/03` and `EST/06` (16 embeds each), `EST/04` (14), `Electronics_Engineering/05` (13). The style guide says "**Formulas only.** No introductions, no filler prose".

### 3.10 Content and notation defects noticed in passing

| File | Topic | Defect |
|---|---|---|
| `Electronics_Engineering/06_Power_Electronics_and_Systems.md` | 3 | Line 121 is self-referential / dimensionally meaningless: `$V_{rms}=V_m\sqrt{\tfrac{1}{\pi}(\pi-\alpha+\tfrac{\sin2\alpha}{2})}=\sqrt2\,V_{rms}$(half-wave)` — the right-hand side equates the quantity to √2 times itself. |
| `Mathematics/03_Differential_Equations.md` | 5 | `$P=Pe^{rt}$` — the left and right sides use the same symbol; this should be $P_0e^{rt}$ (the file's own earlier line uses $P(t)=P_0e^{kt}$). |
| `Mathematics/09_Engineering_Data_Analysis.md` | 2 | Tip text reads "the single most common EDA **markdown**" where "mistake" was intended. |
| `Electronics_Engineering/03_Two_Port_Networks.md` | 3 | The "T and Pi correspondence" table writes `$Z_a=a$`, `$Y_b=b$`, `$Z_c=c$`, mixing single-letter element labels with the `Z_*`/`Y_*` subscripts used everywhere else in the topic. |
| `Electronics_Engineering/03_Two_Port_Networks.md` | 3 | `Δ_Z` is used in the Conditions line before it is defined in topic 6. |
| `Electronics_Engineering/08_Logic_Circuits_and_Switching.md` | 5 | The "Standard to canonical expansion" line expands `A+BC` into `A\bar B\bar C+A\bar BC+AB\bar C+ABC+ABC` — the term `ABC` is duplicated. |
| `GEAS/05_Engineering_Economy.md` | 5 | The arithmetic-gradient expression carries a spurious factor: `P = G[…]·(1/i)·i = …`. |
| `GEAS/02_University_Physics.md` | 14 | `I_0 = 10^{-12}\ \text{W/m}^2` is given as a constant, but `I_0` is not declared in the legend line and collides with the `I_0` (dark/reverse current) used elsewhere in the corpus. |
| `EST/01_Signals_Spectra_and_Noise.md` | 3 | The sentence "R in Ω, C in F, P_n in W; the receiver noise power is P_n = kTB_n." appears **twice** in the same topic (once after the equivalent-noise-bandwidth symbols, once two lines later). |
| `EST/05_Transmission_Lines_and_Waveguides.md` | 1 | The coaxial closed forms use inner/outer radii `a`, `b`, while the characteristic-impedance table in the same topic switches to diameters `D`, `d` for the same geometry. |
| `Electronics_Engineering/07_Industrial_Automation_and_Sensors.md` | 3 | The instrumentation-amplifier topic uses `R_g` in the gain formula but `R_G` in the input-impedance line — same resistor, two spellings, neither defined. |

### 3.11 Symbol overloading observed (a definition problem, not a typo)

| File | Symbol | Meanings found in one file |
|---|---|---|
| `Electronics_Engineering/02_AC_Circuits.md` | `Q` | quality factor (topics 7, 8); L-section matching `Q` (topic 4); reactive power in VAR (topics 5, 10). `S` = siemens (topic 2) and apparent power in VA (topic 5). |
| `Electronics_Engineering/04_Semiconductor_Devices.md` | `V_P` | JFET pinch-off (11, 12); UJT peak voltage (13); tunnel-diode peak voltage (15). `I_L` = Zener load current (8), SCR latching current (13), solar light-generated current (14). `η` = UJT standoff ratio (13), cell efficiency (14). |
| `Mathematics/05_Electromagnetics.md` | `ρ` | volume charge density (topics 4–11) and resistivity (topic 11). `L` = inductance (topics 1, 9, 15, 17) and length (topic 15 table). |
| `EST/06_Antenna_Systems_and_Propagation.md` | `f` | frequency (topics 6–17) and focal length (topic 5). `σ` = conductivity (7, 11), radar cross-section (11), RMS pulse broadening (15). `D` = directivity (1–4, 17), dish diameter `D_a` (5), chromatic-dispersion coefficient `D(λ)` (15). `M` = avalanche gain (16), system margin (16), mode count (14). |
| `Mathematics/06_Control_Systems.md` | `K` | DC gain (4), mechanical stiffness (5), error-constant value (6, 7), Bode constant gain (10), compensator gain `K_c` (13). |
| `GEAS/02_University_Physics.md` | `k` | spring constant (3, 13), Coulomb constant (17), thermal conductivity (10), angular wavenumber (13, undefined). |
| `GEAS/03_Materials_Science.md` | `d` | plane spacing `d_{hkl}` (3), grain size (4), indenter diagonal (6), plate thickness (9), piezoelectric coefficient (9). |
| `GEAS/04_Environmental_Sci_and_PH_Laws.md` | `C_p` | measured pollutant concentration (topic 3) and wind power coefficient (topic 13). |
| `EST/04_Data_Communications_and_Networking.md` | `N` | sequence-number space, node count, slave count, cell count, cluster size, alphabet size — across topics 3–21. |

### 3.12 Out of scope

`Formula/PB/` contains four merged PDFs (`PB FINAL ELECS-merged.pdf`, `PB FINAL GEAS-merged.pdf`, `PB FINAL PB MATH-merged.pdf`, `PB5 EST NEW VERSION-merged.pdf`) and **no markdown subject notes**; it was therefore not audited. `Formula/.obsidian/` and `Formula/FORMULA_SHEET_STYLE_GUIDE.md` were excluded as instructed.

