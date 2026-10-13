# PB MATH corpus vs Mathematics vault — coverage audit

## 1. Corpus summary

**Source:** `PB FINAL PB MATH-merged.pdf` — 166 pages, 8 merged sub-reviewers, each nominally a 100-item set (≈800 nominal items). The digest recovered **520 answerable question blocks**; the remainder are continuation/duplicate copies of the same items (e.g. digest DOC 5 is the tail of the same Set 6 whose head is DOC 4, and several reviewers re-run identical numbers).

**Sub-reviewers (digest DOC → identity):**

| DOC | Identity | Pages | Q blocks recovered |
|---|---|---|---|
| 1 | Flagship reviewer — *Engineering Mathematics & Sciences, 100 Solved Questions & Formulas* | 3–28 | 100 |
| 2 | Set 10 | 30–55 | 100 |
| 3 | Set 8 | 56–91 | 100 |
| 4 + 5 | Set 6 — *Advanced Engineering Mathematics & Systems Engineering* (split in the digest) | 92–114 | 66 + 35 |
| 6 | Set 4 | 115–133 | 33 |
| 7 | Set 3 | 134–152 | 53 |
| 8 | Final unnamed comprehensive guide | 153–166 | 33 |

**Topic clusters observed (approx. share of the 520 recovered blocks):**

| Cluster | ≈Q | Notes |
|---|---|---|
| Differential & integral calculus (limits, derivatives, related rates, optimisation, series/transforms of functions, area/volume/arc length/techniques) | ~150 | Largest cluster; heavy on area-between-curves, disk/shell, arcs, improper integrals, Maclaurin |
| Signals, transforms & DSP (Laplace, z, Fourier, convolution, correlation, sampling) | ~80 | Correlation/PSD/matched-filter and Nyquist sampling are unexpectedly heavy |
| Differential equations (1st order, higher order, RLC/RC transients, PDEs) | ~60 | Newton's cooling, mixing, logistic, classification of PDEs |
| Probability & statistics (descriptive, distributions, CI, hypothesis, regression) | ~60 | Binomial, Poisson, hypergeometric, normal, exponential, t-tests |
| Control systems | ~55 | Steady-state error, 2nd-order specs, Routh, root locus, FVT validity |
| Electromagnetics & vector calculus | ~55 | Almost all *vector-calculus/integral-theorem* items, not EM apparatus |
| Numerical methods | ~25 | Newton-Raphson, Euler, trapezoidal, Simpson, finite differences, Gauss-Seidel |
| Complex numbers & linear algebra | ~25 | De Moivre, `j^j`, Cramer, determinants, consistency |
| Design of experiments / ANOVA / factorial | ~22 | df arithmetic, main effect, interaction, confounding, blocking |
| Analytic geometry / conic sections | ~8 | Ellipse/hyperbola/circle identified from parametric or implicit forms |

The exam's own Part III formula sheet, Part II terms and Part IV traps were also read; the terms list is a good proxy for what the setter considers examinable and is cited below where relevant.

---

## 2. Coverage scorecard

| Vault file | Topics in vault | Examined clusters it covers | Verdict |
|---|---|---|---|
| `01_Differential_Calculus.md` | 8 | Limits/L'Hôpital, differentiation rules, implicit/parametric/log, related rates, extrema/concavity/inflection, optimisation, differentials/error propagation, MVT | **Strong.** Only gaps: no 2-variable (Hessian) second-derivative test for the multi-variable optima (DOC 3 Q28). |
| `02_Integral_Calculus.md` | 15 | Techniques, by parts/LIATE, partial fractions, trig integrals, improper integrals, average/RMS, areas, volumes (disk/washer/shell), arc length, surface area, centroids, work | **Strong but incomplete.** No Wallis formula, no area moment of inertia, no double/iterated integrals over a plane region, no mass-of-lamina. |
| `03_Differential_Equations.md` | 14 | Separable, linear/Bernoulli, exact, homogeneous, orthogonal trajectories, growth/decay/Newton cooling, mixing, auxiliary equation, undetermined coefficients, mass-spring, RLC, wave/heat/Laplace PDEs | **Strong.** Missing only the explicit PDE discriminant classification rule. |
| `04_Advanced_Engineering_Math.md` | 18 | Complex numbers/De Moivre, C-R, series/convergence, Taylor/Maclaurin, truncation error, Laplace pairs & properties, inverse Laplace, Fourier series, Fourier transform, Bessel, Legendre, matrices, Cramer, eigenvalues | **Strong** for its listed topics, but has **no analytic geometry / conic-section topic at all**, and `arg z` is stated without quadrant correction. |
| `05_Electromagnetics.md` | 22 | Coordinate conversion, vector algebra, div/grad/curl/Laplacian, divergence & Stokes theorems, point-charge field, Gauss law, potential, Maxwell, plane waves, boundaries, Poynting | **Adequate but has a hole:** no Green's theorem; the Cartesian curl is tabulated but cylindrical/spherical curl are not; "solenoidal/irrotational" terminology and the triple-product volume/coplanarity reading are absent. Most of Part B/C is never exercised by this corpus. |
| `06_Control_Systems.md` | 14 | Transfer functions, block reduction, Mason, 1st/2nd-order response, steady-state error & type, Routh, root locus, Bode/margins, Nyquist, PID, lead-lag, state space | **Strong.** Missing the formal definition of a dominant pole and the "added LHP zero raises overshoot" rule. |
| `07_Signals_and_Systems.md` | 11 | Classification, energy/power, LTI/BIBO, CT & DT convolution, z transform & ROC, z theorems, inverse z, difference equations/Jury, step response, Fourier/Laplace tools | **Weakest file relative to demand.** No correlation family, no Nyquist–Shannon sampling theorem, no circular/DFT convolution, no logarithmic z pair. |
| `08_Numerical_Methods_and_Analysis.md` | 10 | Errors/roundoff, bisection/regula falsi, Newton-Raphson/secant, divided differences, Lagrange, trapezoidal, Simpson 1/3 & 3/8, Euler, Heun, RK4 | **Good but missing a whole sub-topic:** numerical differentiation (forward/backward/central differences, O(h) vs O(h²)) and iterative linear solvers (Jacobi/Gauss-Seidel, diagonal dominance). |
| `09_Engineering_Data_Analysis.md` | 14 | Central tendency, dispersion, counting, probability/Bayes, binomial/geometric, Poisson/hypergeometric + distribution summary, uniform/exponential, normal/z, sampling, CLT, CI, hypothesis tests, regression/correlation, ANOVA/DOE | **Strong.** Missing MLE, blocking/RCBD, fractional-factorial aliasing, the interaction-contrast formula, and the two-way ANOVA df breakdown. |

---

## 3. MISSING items

### 3.1 Formula-level gaps

| # | Examined formula / theorem | Where it is tested (Q numbers / sub-reviewer) | Evidence it is absent from the vault | Suggested vault home (file + topic) |
|---|---|---|---|---|
| 1 | **Wallis' formula** $\int_0^{\pi/2}\sin^m x\cos^n x\,dx=\frac{(m-1)!!(n-1)!!}{(m+n)!!}\cdot\alpha$, $\alpha=\pi/2$ if both even, else $1$ | DOC 1 Q47 (`∫₀^{π/2} sin²x cos²x dx = π/16`); the exam's own terms sheet lists it (`P2_TERMS` "Wallis Formula") | grep `Wallis` over `Mathematics\` → **0 matches**; `02_Integral_Calculus.md` `### 5. Trigonometric Integrals and Substitution` gives only power-reduction and product-to-sum, and `∫√(a²−x²)dx`-type results | `02_Integral_Calculus.md` → `### 5. Trigonometric Integrals and Substitution` |
| 2 | **Green's theorem** $\oint_C(P\,dx+Q\,dy)=\iint_R(\partial_xQ-\partial_yP)\,dA$ | DOC 2 Q74; DOC 6 Q46; DOC 5 (Set 6) Q69; the exam's terms sheet defines it twice | `05_Electromagnetics.md` `### 3. Divergence and Stokes Theorems` tabulates only divergence and Stokes; grep `Green` over `Mathematics\` → **0 matches** | `05_Electromagnetics.md` → `### 3. Divergence and Stokes Theorems` |
| 3 | **Nyquist–Shannon sampling theorem** $f_s\ge 2f_{max}$ (and Nyquist rate) | DOC 3 Q82 (20 kHz signal → 40 kHz) | grep `Nyquist` in the vault → only `06_Control_Systems.md` `### 11. Nyquist Stability Criterion`; no sampling/Nyquist rate anywhere | `07_Signals_and_Systems.md` → `### 1. Signal Classification and Operations` |
| 4 | **Autocorrelation / cross-correlation** $R_{xx}(k)=\sum_n x[n]x[n-k]$, $R_{xy}(k)=R_{yx}(-k)$, $R_{xx}(0)=E$ | DOC 1 Q21, Q48; DOC 4 (Set 6) Q58; DOC 8 Q11; DOC 3 Q91 (white noise ⇒ impulse) | grep `autocorrelation\|cross-correlation\|correlation` over `Mathematics\` → **0 matches**; `07_Signals_and_Systems.md` covers only convolution | `07_Signals_and_Systems.md` → new topic after `### 4. Continuous-Time Convolution` |
| 5 | **Wiener–Khinchin / PSD** $S_{xx}(\omega)=\mathcal{F}\{R_{xx}(\tau)\}$ | DOC 1 Q97; the exam's `P3_FORMULAS` table ("Wiener-Khinchin Relation") | grep `Wiener\|Khinchin\|Power Spectral` in the vault → **0 matches** | `07_Signals_and_Systems.md` → same new correlation topic |
| 6 | **Matched filter = cross-correlation** with a time-reversed template | DOC 4 (Set 6) Q17 | no correlation/matched-filter content anywhere in the vault (same grep as #4) | `07_Signals_and_Systems.md` → same new correlation topic |
| 7 | **Numerical differentiation**: forward $f'(x)\approx\frac{f(x+h)-f(x)}{h}$ (O(h)) and central $f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}$ (O(h²)) | DOC 4 (Set 6) Q60 (central vs forward LTE order); DOC 5 (Set 6) Q74 (forward difference on sampled data) | `08_Numerical_Methods_and_Analysis.md` has no differentiation topic; grep `central difference\|forward difference` over `Mathematics\` → **0 matches** | `08_Numerical_Methods_and_Analysis.md` → new topic between `### 5. Lagrange Interpolation` and `### 6. Trapezoidal Rule` |
| 8 | **Iterated/double integral over a plane region** (Fubini) and **mass of a lamina** $M=\iint_R\rho\,dA$ | DOC 1 Q9 (`∬(x+y)dA=15`); DOC 2 Q83 (`=48`); DOC 3 Q69 (`=2.5`); DOC 4 Q8 (`=3`); DOC 8 Q12; DOC 4 (Set 6) Q96; DOC 2 Q80 (lamina mass) | `02_Integral_Calculus.md` contains no double-integral topic — `### 9. Plane Areas Cartesian` … `### 15. Work and Hydrostatic Force` are all one-dimensional integrals; grep `double integral\|iterated integral` → **0 matches** | `02_Integral_Calculus.md` → new topic before `### 9. Plane Areas Cartesian` |
| 9 | **Area moment of inertia** $I_x=\int y^2\,dA=\int \frac13 y^3\,dx$ (and $I_y$) | DOC 6 Q72 (`y=x²`, `0≤x≤3` → `I_x = 104.14`) | grep `moment of inertia\|inertia` over `Mathematics\` → **0 matches**; `02_Integral_Calculus.md` `### 14. Centroids and Pappus-Guldinus` gives only *first* moments $Q_x=\int y\,dA$ | `02_Integral_Calculus.md` → `### 14. Centroids and Pappus-Guldinus` |
| 10 | **Z-transform logarithmic pair** $-\ln(1-az^{-1})=\sum_{n\ge1}\frac{a^n}{n}z^{-n}$ | DOC 4/5 (Set 6) Q76: `X(z) = −ln(1−2z⁻¹)`, `|z|>2`, find `x[1] = 2` | `07_Signals_and_Systems.md` `### 6. Z Transform Definition and ROC` pair table has 12 pairs, none logarithmic; `### 8. Inverse Z Transform` names "power series/long division" but tabulates no log series | `07_Signals_and_Systems.md` → `### 6. Z Transform Definition and ROC` |
| 11 | **PDE classification by discriminant** $B^2-4AC>0$ hyperbolic, $=0$ parabolic, $<0$ elliptic | DOC 1 Q72 (`u_xx+3u_xy+u_yy=0` → hyperbolic); DOC 5 (Set 6) Q84 (telegrapher's equation); exam's `P2_TERMS` §2.2 states the rule explicitly | `03_Differential_Equations.md` treats the three PDEs in separate topics (`### 12` wave, `### 13` heat, `### 14` Laplace) but never states the discriminant rule; grep `discriminant\|4AC` → **0 matches** | `03_Differential_Equations.md` → `### 14. PDE Laplace Equation 2D` (or a new lead topic for Part C) |
| 12 | **Interaction-effect contrast** for a $2^2$ design, $AB=\frac{(ab+a)-((1)+b)}{2}$ | DOC 4/5 (Set 6) Q78; interaction significance DOC 2 Q17, Q79; DOC 1 Q28 | `09_Engineering_Data_Analysis.md` `### 14. ANOVA and DOE` gives *main* effect $\bar y_+-\bar y_-$ and $SS_{effect}=(\text{contrast})^2/2^kr$ but no interaction contrast formula | `09_Engineering_Data_Analysis.md` → `### 14. ANOVA and DOE` |
| 13 | **Directional derivative / max rate of change** $D_{\hat a}V=\nabla V\cdot\hat a$, $\max D=|\nabla V|$ | DOC 4 (Set 6) Q65 (`U=x²yz`, max rate of change $=|\nabla U|=\sqrt{21}$); DOC 6 Q22 ("maximum rate of change occurs in the direction: along the gradient") | `05_Electromagnetics.md` `### 2. Gradient, Divergence, Curl and Laplacian` defines the $\nabla V$ operator but never links it to the directional derivative; grep `directional derivative` → **0 matches** | `05_Electromagnetics.md` → `### 2. Gradient, Divergence, Curl and Laplacian` |
| 14 | **2-variable unconstrained optimum (Hessian / $D$-test)** $f_x=f_y=0$, $D=f_{xx}f_{yy}-f_{xy}^2$ | DOC 3 Q28 (maximise $P(I_1,I_2)=12I_1+16I_2-2I_1^2-I_2^2-I_1I_2$); DOC 3 Q84 (marginal cost, partial derivatives) | `01_Differential_Calculus.md` `### 6. Optimization Problems` covers only single-variable and Lagrange; grep `Hessian\|saddle` → **0 matches** | `01_Differential_Calculus.md` → `### 6. Optimization Problems` |
| 15 | **Jacobi / Gauss-Seidel iteration & strict diagonal dominance** $|a_{ii}|>\sum_{j\ne i}|a_{ij}|$ | DOC 4 (Set 6) Q31 | `08_Numerical_Methods_and_Analysis.md` has no linear-system solver topic; `04_Advanced_Engineering_Math.md` `### 17. Cramer's Rule and Linear Systems` covers elimination only; grep `Gauss-Seidel\|diagonal dominance` → **0 matches** | `08_Numerical_Methods_and_Analysis.md` → new topic in Part A (or `04` `### 17`) |
| 16 | **Circular (modulo-N) convolution and DFT** $y[n]=\sum_{k=0}^{N-1}x[k]h[(n-k)\bmod N]$, length exactly $N$ | DOC 1 Q14 (N = 4 → 4 samples) | `07_Signals_and_Systems.md` `### 5. Discrete-Time Convolution` gives only the linear sum and $L_y=L_x+L_h-1$; grep `circular convolution\|DFT` → **0 matches** | `07_Signals_and_Systems.md` → `### 5. Discrete-Time Convolution` |

### 3.2 Transform-pair / table gaps

| # | Needed pair or value | Q numbers | What the vault tabulates instead | Suggested vault home |
|---|---|---|---|---|
| 1 | $-\ln(1-az^{-1})\ \leftrightarrow\ \frac{a^n}{n}u[n-1]$, ROC $|z|>|a|$ | DOC 4/5 (Set 6) Q76 (`a=2`, `x[1]=2`) | `07_Signals_and_Systems.md` `### 6. Z Transform Definition and ROC`: 12 pairs ($\delta$, $\mu$, $n\mu$, $a^n\mu$, $na^n\mu$, $\cos/\sin\omega_0n$, $r^n\cos/\sin$) — no logarithmic or reciprocal-$n$ pair | `07_Signals_and_Systems.md` → `### 6. Z Transform Definition and ROC` |
| 2 | $\mathcal{L}^{-1}\{s/(s^2+\omega^2)^2\}=\frac{t\sin\omega t}{2\omega}$ | DOC 1 Q11 (`s/(s²+9)²` → `t sin3t/6`) | `04_Advanced_Engineering_Math.md` `### 7. Laplace Transform Pairs` contains the forward pair `$t\sin\omega t\leftrightarrow \frac{2\omega s}{(s^2+\omega^2)^2}$`, so it is **derivable**, but `### 10. Inverse Laplace and Partial Fractions` "Common inverses" omits it, so a candidate must invert the pair mentally under time pressure | `04_Advanced_Engineering_Math.md` → `### 10. Inverse Laplace and Partial Fractions` |
| 3 | $\mathcal{F}\{\text{rect}\}$ **sinc convention** | DOC 3 Q20 (inverse FT of a rectangular window = sinc) | `04_Advanced_Engineering_Math.md` `### 13. Fourier Transform Properties` uses $\operatorname{sinc}(x)=\sin x/x$ with $\tau\operatorname{sinc}(\omega\tau/2)$; `07_Signals_and_Systems.md` `### 1. Signal Classification and Operations` uses $\operatorname{sinc}(x)=\sin(\pi x)/(\pi x)$ with $\tau\operatorname{sinc}(f\tau)$. Both are individually correct, but **two incompatible sinc definitions coexist in one vault**, so the same question yields two different-looking answers | `04`/`07` — pick one convention and cross-note it |

### 3.3 Concept-level gaps

| # | Examined concept | Q numbers | Suggested vault home |
|---|---|---|---|
| 1 | **Analytic geometry / conic sections** — identifying a curve from its parametric or implicit form (circle, ellipse, hyperbola, parabola), plus the focal-distance definition $\lvert z-z_1\rvert-\lvert z-z_2\rvert=$ const | DOC 2 Q1 (ellipse), Q68 (circle, implicit 2nd derivative); DOC 1 Q16 (hyperbola from $a\sec\theta,b\tan\theta$); DOC 3 Q1 (circle from parametric); DOC 7 Q18 (hyperbola locus); DOC 8 Q6; DOC 6 Q25 (rectangle in semicircle) | new topic in `04_Advanced_Engineering_Math.md` Part A (Complex/Series) or a new analytic-geometry note; nothing in the vault covers conics (grep `ellipse\|hyperbola\|conic` → 0 matches) |
| 2 | **Dominant pole** = pole/pole-pair closest to the $j\omega$ axis; governs settling and decay rate | DOC 1 Q4; DOC 2 Q97 | `06_Control_Systems.md` → `### 5. Second Order Specifications` (or `07` `### 10. System Response and Step Response`) |
| 3 | **Solenoidal vs irrotational** vector-field classification ($\nabla\cdot\vec A=0$ / $\nabla\times\vec A=0$) and the Laplace-potential consequence | DOC 2 Q3, Q15, Q39; DOC 3 Q8 | `05_Electromagnetics.md` → `### 2. Gradient, Divergence, Curl and Laplacian` (the identities are present; the vocabulary and classification are not — grep `solenoidal\|irrotational` → 0 matches) |
| 4 | **Scalar triple product as determinant = parallelepiped volume**, and $=0\iff$ coplanar; $|\vec A\times\vec B|$ = parallelogram area | DOC 1 Q94; DOC 5 (Set 6) Q94; DOC 4 Q64 | `05_Electromagnetics.md` → `### 1. Coordinate Systems and Vector Algebra` |
| 5 | **Bessel second kind diverges at the origin** $Y_\nu(0)\to-\infty$ (hence $J_\nu$ is chosen in a fibre core) | DOC 4 (Set 6) Q7 | `04_Advanced_Engineering_Math.md` → `### 14. Bessel Functions` ("Small-argument limits" lists only $J_0(0)=1$, $J_\nu(0)=0$, $I_0(0)=1$) |
| 6 | **MLE** — estimator maximising $\mathcal{L}(\theta;x)=\prod f(x_i;\theta)$ | DOC 1 Q10 | `09_Engineering_Data_Analysis.md` → `### 12. Hypothesis Testing, Z, t and p Errors` (or `### 9`) |
| 7 | **Blocking / randomised complete block design** as a nuisance-variable control | DOC 6 Q12 (machine calibration treated as a blocking factor); DOC 3 Q77 ("groups experimental runs into discrete time shifts … to account for factory humidity" → Blocking) | `09_Engineering_Data_Analysis.md` → `### 14. ANOVA and DOE` (grep `blocking\|randomized` → 0 matches) |
| 8 | **Fractional factorial / confounding / defining relation** $I=ABC\Rightarrow A$ aliased with $BC$ | DOC 1 Q25 | `09_Engineering_Data_Analysis.md` → `### 14. ANOVA and DOE` (grep `fractional factorial\|aliasing\|confound\|defining relation` → 0 matches) |
| 9 | **Two-way ANOVA df breakdown** $(a-1),(b-1),(a-1)(b-1),ab(n-1),N-1$ | DOC 6 Q75 (4×5, one obs/cell → total df 19); DOC 6 Q54 (error df) | `09_Engineering_Data_Analysis.md` → `### 14. ANOVA and DOE` (only the one-way and $2^k$ df are given) |
| 10 | **Taguchi nominal-is-best S/N** and **orthogonal arrays** ($L_8$, $L_9$) | Taguchi named in the exam's `P2_TERMS`; full-factorial run count DOC 6 Q53 | `09_Engineering_Data_Analysis.md` → `### 14. ANOVA and DOE` (only larger-is-better and smaller-is-better S/N are tabulated) |
| 11 | **Non-minimum-phase system** = RHP zero/pole; adding an **LHP zero** raises percent overshoot and cuts rise time | DOC 3 Q60; DOC 1 Q92 | `06_Control_Systems.md` → `### 5. Second Order Specifications` |
| 12 | **Improper integrals of $\sin/\cos$ to $\infty$ diverge by oscillation** (not by the p-test) | DOC 5 (Set 6) Q89; stated in the exam's traps | `02_Integral_Calculus.md` → `### 7. Improper Integrals` |
| 13 | **Euler's method is exact for $y'=$ const** | DOC 7 Q40 | `08_Numerical_Methods_and_Analysis.md` → `### 8. Euler's Method` |
| 14 | **Self-loop** terminology in a signal-flow graph | DOC 4 (Set 6) Q53 | `06_Control_Systems.md` → `### 3. Mason's Gain Formula` |
| 15 | **Parameter vs statistic**, primary vs secondary data, observational study vs experiment, census vs sample, double-blind design | DOC 1 Q57; DOC 4 (Set 6) Q97; DOC 7 Q15; DOC 2 Q46; DOC 1 Q78 | `09_Engineering_Data_Analysis.md` → `### 9. Sampling Techniques and Sampling Distributions` |

---

## 4. PARTIAL / incorrect coverage

| # | Item | What the vault says (quote it, with file + `###` topic) | What the exam needs | Fix |
|---|---|---|---|---|
| 1 | Argument of a complex number in Quadrant II/III | `04_Advanced_Engineering_Math.md` `### 1. Complex Numbers, Euler and De Moivre`: "$r=\lvert z\rvert=\sqrt{x^2+y^2},\qquad \theta=\arg z=\tan^{-1}\frac{y}{x}$" | DOC 8 Q6: `z` with negative real and positive imaginary part — the correct argument is in Quadrant II (the source key itself notes "Quadrant II complex numbers have argument …"); `tan^{-1}(y/x)` returns a Quadrant IV value and is **wrong** here | Add the quadrant/`atan2` rule: $\theta=\operatorname{atan2}(y,x)$, $+180^\circ$ when $x<0$. |
| 2 | Bessel functions of the second kind at $r=0$ | `04_Advanced_Engineering_Math.md` `### 14. Bessel Functions`: "**Small-argument limits** $J_0(0)=1,\qquad J_\nu(0)=0\ (\nu>0),\qquad I_0(0)=1$" | DOC 4 (Set 6) Q7 asks which **boundary property** validates Bessel functions at the centre of a fibre core; the key is "Bessel functions of the second kind ($Y_\nu$) approach infinity at $r=0$, so $J_\nu$ (first kind) is chosen because it stays finite." The vault gives no limit for $Y_\nu$ (or $K_\nu$) | Add $Y_\nu(0^+)=-\infty$, $K_\nu(0^+)=+\infty$ to the same block. |
| 3 | Two-way ANOVA degrees of freedom | `09_Engineering_Data_Analysis.md` `### 14. ANOVA and DOE`: defines `df_total=N-1, df_A=k-1, df_E=N-k` for one-way, then for two-way only "$SST = SSA+SSB+SSAB+SSE,\ F_A=\frac{MSA}{MSE}\dots$" and "$df_{corrected}=2^kr-1$" | DOC 6 Q75 (two-way 4 rows × 5 columns, one observation per cell → total df = 19) and DOC 6 Q54 require the per-source two-way df: $(a-1),\ (b-1),\ (a-1)(b-1),\ ab(n-1),\ N-1$ | Add a two-way ANOVA df/SS/MS/F source table alongside the existing one-way table. |
| 4 | Interaction effect formula | `09_Engineering_Data_Analysis.md` `### 14. ANOVA and DOE`: "$\text{main effect} = \bar{y}_{+} - \bar{y}_{-},\quad SS_{effect} = \frac{(\text{contrast})^2}{2^k r}$" | DOC 4/5 (Set 6) Q78 computes the $AB$ **interaction effect** of a single-replicate $2^2$ design as $\frac{(ab+a)-((1)+b)}{2}$; only the main-effect contrast is given | Add the interaction contrast (for $2^2$: $AB=\frac{(ab+a)-(b+(1))}{2r}$, and the general $2^k$ interaction-contrast pattern). |
| 5 | Scalar triple product geometry | `05_Electromagnetics.md` `### 1. Coordinate Systems and Vector Algebra`: "$\vec A\cdot(\vec B\times\vec C)=\vec B\cdot(\vec C\times\vec A)=\vec C\cdot(\vec A\times\vec B)$" — the algebraic identity only | DOC 1 Q94 and DOC 5 (Set 6) Q94 need the geometric reading: $\lvert\vec A\cdot(\vec B\times\vec C)\rvert$ = volume of the parallelepiped, and $=0\iff$ coplanar | Append the determinant form $\det[\vec A\,\vec B\,\vec C]$ with the volume/coplanarity interpretation. |
| 6 | Cylindrical and spherical **curl** | `05_Electromagnetics.md` `### 2. Gradient, Divergence, Curl and Laplacian`: the "**Cartesian operators ★**" table lists $\nabla\times\vec A$ as the Cartesian determinant; the "**Cylindrical ★**" and "**Spherical ★**" blocks then give only $\nabla\cdot\vec A$ and $\nabla^2V$ | No recovered question demands curvilinear curl directly, but the exam's own `P3_FORMULAS` supplies "Spherical Divergence" as a stand-alone examinable item and DOC 4 (Set 6) Q38 works a cylindrical divergence; the vault's coordinate tables are asymmetric and an examiner-style item on $\nabla\times\vec H$ in cylindrical coordinates is unanswerable from the sheet | Complete the cylindrical and spherical operator tables with $\nabla\times\vec A$. |
| 7 | Differentiability vs continuity trap | `01_Differential_Calculus.md` `### 1. Limits, Continuity and L'Hôpital` gives continuity tests, and `### 2. Differentiation Rules` the definition, but never states "differentiable $\Rightarrow$ continuous; continuous $\nRightarrow$ differentiable" | DOC 6 Q11 and Q15 (is `f` differentiable at a corner/cusp; "continuous but not differentiable at $x=0$") | Add the one-line implication and the $y=\lvert x\rvert$ counter-example. |

---

## 5. Over-coverage

Topics the vault carries that this corpus never exercises (fine to keep, but they earn no points *from this corpus* — they belong to the ELECS/GEAS papers):

- `02_Integral_Calculus.md`: `### 10. Plane Areas Polar`; `### 11` prismoid formula; `### 14` Pappus–Guldinus theorems; `### 15. Work and Hydrostatic Force` centre-of-pressure.
- `03_Differential_Equations.md`: `### 9. Variation of Parameters` (only the *existence* of the method is asked); `### 4` Clairaut equations; the Fourier-series solutions of the wave/heat PDEs (`### 12`, `### 13`).
- `04_Advanced_Engineering_Math.md`: `### 14. Bessel Functions` recurrences and `### 15. Legendre Polynomials` (Rodrigues, orthogonality, generating function — only Legendre's *singular points* are asked, DOC 8 Q5); `### 12. Half-Range Expansions` (only the even/odd conclusion is tested).
- `05_Electromagnetics.md`: the bulk of Part B/C — `### 7. Dipoles and Polarization`, `### 8. Dielectrics and Boundary Conditions`, `### 9. Capacitance from Geometry`, `### 10. Electrostatic Energy and Forces`, `### 11`–`### 17` (current density, Biot–Savart, Ampère, magnetic boundaries, inductance, Lorentz, Faraday/motional EMF), `### 20. Waves in Lossy Media`, `### 21. Reflection and Transmission`, `### 22. Poynting`. This corpus tests electromagnetics only through vector-calculus theorems, Coulomb's law and Maxwell's curl.
- `06_Control_Systems.md`: `### 12` Ziegler–Nichols / PID tuning; `### 13. Lead-Lag Compensator Design`; `### 11. Nyquist Stability Criterion` (Routh is tested, Nyquist is not); `### 14` controllability/observability matrices.
- `08_Numerical_Methods_and_Analysis.md`: `### 2. Bisection and Regula Falsi`; `### 4`/`### 5` interpolation; `### 6` Romberg extrapolation; `### 9. Modified Euler and Heun`.
- `09_Engineering_Data_Analysis.md`: `### 3. Permutations and Combinations`; `### 11` χ² variance interval; `### 13` Spearman ρ and prediction interval.

---

## 6. Top 12 edits to make, ranked by likely board-point value

1. **`02_Integral_Calculus.md` → `### 5. Trigonometric Integrals and Substitution`** — add the Wallis formula with the both-even $\pi/2$ rule (tested DOC 1 Q47; the exam's own terms sheet carries it verbatim).
2. **`07_Signals_and_Systems.md` → new topic after `### 4. Continuous-Time Convolution`** — autocorrelation, cross-correlation parity $R_{xy}(k)=R_{yx}(-k)$, $R_{xx}(0)=E$, white-noise ⇒ impulse, Wiener–Khinchin $S_{xx}=\mathcal{F}\{R_{xx}\}$, matched filter (≈8 questions across DOC 1, 3, 4/5, 8).
3. **`07_Signals_and_Systems.md` → `### 1. Signal Classification and Operations`** — Nyquist–Shannon theorem $f_s\ge2f_{max}$ and the Nyquist rate (DOC 3 Q82; nothing in the vault).
4. **`05_Electromagnetics.md` → `### 3. Divergence and Stokes Theorems`** — Green's theorem in the plane $\oint(P\,dx+Q\,dy)=\iint(\partial_xQ-\partial_yP)\,dA$ (4 questions; defined twice in the exam's own term sheets).
5. **`04_Advanced_Engineering_Math.md` → new Part A topic "Analytic Geometry and Conic Sections"** — circle/ellipse/hyperbola/parabola standard and parametric forms and the $|z-z_1|-|z-z_2|=$ const definition (≈8 questions; the vault has zero conics content).
6. **`08_Numerical_Methods_and_Analysis.md` → new topic between `### 5. Lagrange Interpolation` and `### 6. Trapezoidal Rule`** — forward/backward/central difference formulas with their O(h)/O(h²) errors (DOC 4 Q60, DOC 5 Q74).
7. **`02_Integral_Calculus.md` → new topic before `### 9. Plane Areas Cartesian`** — iterated/double integrals over a region and mass of a lamina $M=\iint\rho\,dA$ (≈7 questions).
8. **`09_Engineering_Data_Analysis.md` → `### 14. ANOVA and DOE`** — add two-way ANOVA df breakdown, the $2^k$ interaction contrast, RCBD/blocking, and fractional-factorial aliasing $I=ABC$ (≈6 questions, including a whole 3-question DOE sub-cluster in Set 8).
9. **`07_Signals_and_Systems.md` → `### 6. Z Transform Definition and ROC`** — add $-\ln(1-az^{-1})\leftrightarrow\frac{a^n}{n}u[n-1]$, ROC $|z|>|a|$ (DOC 4/5 Q76, flagged in the exam's own tip as "logarithmic power series expansion").
10. **`04_Advanced_Engineering_Math.md` → `### 1. Complex Numbers, Euler and De Moivre`** — fix `arg z` with the quadrant/`atan2` rule (DOC 8 Q6; the current formula gives a wrong answer for Quadrant II/III).
11. **`03_Differential_Equations.md` → `### 14. PDE Laplace Equation 2D`** — add the $B^2-4AC$ hyperbolic/parabolic/elliptic classification rule (DOC 1 Q72, DOC 4/5 Q84; stated in the exam's own terms and traps).
12. **`02_Integral_Calculus.md` → `### 14. Centroids and Pappus-Guldinus`** — add second moments / area moment of inertia $I_x=\int y^2\,dA=\int\frac13y^3dx$ (DOC 6 Q72).

Then, in a second pass: dominant-pole definition (`06` `### 5`), solenoidal/irrotational vocabulary (`05` `### 2`), Bessel $Y_\nu$ divergence (`04` `### 14`), Jacobi/Gauss-Seidel + diagonal dominance (`08`), 2-variable Hessian test (`01` `### 6`), MLE (`09`), circular convolution (`07` `### 5`), and the sinc-convention conflict between `04` `### 13` and `07` `### 1`.

---

## 7. Verdict

The vault is a genuinely strong formula sheet for this corpus — I found usable, correct formulas for roughly **80–85 % of the examined concepts**, concentrated in differential/integral calculus, differential equations, control systems, probability/statistics and vector calculus, where coverage is close to complete (including the exact trap framing the exam uses: FVT validity, $p$-test inequalities, $n-1$ vs $N$, one-way ANOVA df, Routh, RLC damping cases, Laplace and most $z$ pairs).

It is **not yet adequate as-is**, because the misses cluster in exactly the places the corpus hammers: the entire **correlation / power-spectral-density / matched-filter / Nyquist-sampling** family in signals, **Green's theorem**, **Wallis' formula**, **numerical differentiation**, **double integrals**, and the whole **analytic-geometry/conics** and **DOE-design (blocking, aliasing, two-way df, interaction contrast)** blocks are absent, and `arg z` as written will produce a wrong answer on a Quadrant-II item.

**The single biggest hole is `07_Signals_and_Systems.md`'s missing correlation family** — autocorrelation, cross-correlation, Wiener–Khinchin/PSD and the matched filter account for the largest run of questions (≈8) that the vault cannot answer at all, and unlike a missing derivation they cannot be reconstructed from anything else in the vault.
