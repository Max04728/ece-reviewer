---
title: "Math Crash Review — Last Hour"
type: review
part: "01_Mathematics"
scope: "Timed 60-minute revision pass over all nine Mathematics areas, weighted to ECE board yield"
updated: 2026-09-25
---

# Math Crash Review — Last Hour

> [!abstract] How to use this in the final hour
> This sheet is a **triage and recall tool**, not a textbook. Nine areas are split into nine timed
> blocks totalling exactly **60 minutes**. Work them **in order** — the sequence runs from the
> highest-yield, fastest-to-recover material to the slowest.
>
> **Method per block:** read the formula table once at speed, say each trap out loud, then answer the
> rapid-fire questions with the answers covered. If you cannot answer in about 10 seconds, that is
> your revision target — not the whole block. Do **not** stop to re-derive anything; the drill
> problems exist to show you the pattern, and every answer is hidden in a collapsible callout.

## The 60-minute clock

Tick each block off as you finish it. If you run over on a block, **cut the next block short rather
than skipping it entirely** — partial coverage of a high-yield area beats perfect coverage of a
low-yield one.

- [ ] **1 · Differential Calculus** — 7 min — limits, L'Hôpital, extrema, related rates, error propagation
- [ ] **2 · Integral Calculus** — 7 min — the toolkit, areas, volumes, centroids, work
- [ ] **3 · Differential Equations** — 8 min — first-order methods, auxiliary equation, transients
- [ ] **4 · Advanced Engineering Math** — 8 min — Laplace pairs, Fourier series, matrices, eigenvalues
- [ ] **5 · Electromagnetics** — 10 min — Gauss, capacitance/inductance, waves, reflection
- [ ] **6 · Control Systems** — 6 min — second-order specs, error constants, Routh, Bode, PID
- [ ] **7 · Signals and Systems** — 6 min — convolution, Z-transform, ROC, stability
- [ ] **8 · Numerical Methods** — 4 min — root-finding, interpolation, quadrature, Runge-Kutta
- [ ] **9 · Engineering Data Analysis** — 4 min — probability, distributions, CLT, intervals, regression

> [!tip] The five things most likely to appear on your paper
> 1. A **limit** needing L'Hôpital or a standard trig/exponential form.
> 2. An **integral** by parts, trig substitution or partial fractions.
> 3. A **first- or second-order ODE** — separable, linear, or constant-coefficient.
> 4. An **inverse Laplace** or a **Fourier coefficient**.
> 5. A **capacitance, inductance, or field** from a standard geometry.

## If you have less than 60 minutes

| Time left | Do this | Why |
| --- | --- | --- |
| **10 min** | Block 5 (Electromagnetics) + the traps of every block | Widest and heaviest area; traps are where marks are lost |
| **20 min** | Blocks 1, 2, 5 | The three largest question pools |
| **30 min** | Blocks 1, 2, 4, 5, 9 | Adds the transform and probability staples |
| **60 min** | All nine, in order | Full pass |

## Two rules that protect marks

1. **Write units on every line.** Most avoidable losses on a math paper are unit and power-of-ten
   slips, not conceptual failures. Convert to SI **before** substituting.
2. **Sanity-check the magnitude.** If a capacitance comes out in farads rather than picofarads, or a
   time constant in seconds rather than milliseconds, you have almost certainly lost a factor of
   $10^{3}$ somewhere. Re-read the units in the question before re-doing the algebra.

> [!trap] The calculator will not save a wrong set-up
> Every shortcut below is a *speed* tool, not a correctness tool. A symbolic answer keyed into a
> solver still returns a confident wrong number. Set the problem up by hand first, then use the
> calculator to execute it.

---

## Block 1 — Differential Calculus (7 min)

**Topics:** [[01_Limits,_Continuity_and_L_Hopital|Limits & L'Hôpital]] · [[02_Differentiation_Rules|Differentiation Rules]] · [[03_Implicit,_Parametric_and_Logarithmic_Differentiation|Implicit/Parametric]] · [[05_Extrema,_Concavity_and_Inflection|Extrema & Concavity]] · [[06_Optimization_Problems|Optimization]] · [[07_Differentials_and_Error_Propagation|Differentials & Error]] · [[08_Rolle’s_and_Mean_Value_Theorems|Rolle & MVT]] · [[04_Related_Rates|Related Rates]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| L'Hôpital | $\lim_{x\to a}\frac{f}{g} = \lim_{x\to a}\frac{f'}{g'}$ | ONLY $0/0$ or $\infty/\infty$. Substitute and name the form first. Differentiate top and bottom separately, never by the quotient rule. |
| Trig limit | $\lim_{x\to 0}\frac{\sin x}{x}=1$ | Radians only ($\pi/180$ in degrees). Generalises to $\sin kx/(kx)\to 1$. |
| Cosine limit | $\lim_{x\to 0}\frac{1-\cos x}{x^{2}}=\frac{1}{2}$ | Trap: $(1-\cos x)/x \to 0$, but divided by $x^{2}$ it is $1/2$. |
| Exponential limit | $\lim_{x\to 0}\frac{e^{x}-1}{x}=1$ | Generalises to $(a^{x}-1)/x \to \ln a$. |
| Rational limit at $\infty$ | compare degrees of $p$ and $q$ | Equal: ratio of leading coefficients. Numerator lower: $0$. Numerator higher: diverges. Faster than L'Hôpital. |
| Power of $1^{\infty}$ | $\lim (1+u)^{v} = e^{\lim uv}$ | For $\left(1+\frac{3}{x}\right)^{2x}$: exponent $\frac{3}{x}\cdot 2x = 6$, so $e^{6}$. |
| Product / quotient | $(uv)'=u'v+uv'$, $\left(\frac{u}{v}\right)'=\frac{u'v-uv'}{v^{2}}$ | Quotient order: low d-high minus high d-low, over low squared. |
| Chain rule | $f'(g(x))g'(x)$ | One factor per layer. Most-missed rule: $\frac{d}{dx}\sin 3x = 3\cos 3x$. |
| General exponential | $\frac{d}{dx}a^{x}=a^{x}\ln a$ | Not $xa^{x-1}$ and not $a^{x}$. Power rule is for variable base, fixed exponent. |
| Implicit | $\frac{d}{dx}y^{n}=ny^{n-1}y'$, $\frac{d}{dx}(xy)=y+xy'$ | Every $y$-term picks up $y'$. Horizontal tangent: numerator $=0$; vertical: denominator $=0$. |
| Parametric $y'$ | $\frac{dy}{dx}=\frac{dy/dt}{dx/dt}$ | Undefined where $dx/dt=0$ (vertical tangent). |
| Parametric $y''$ | $\frac{d^{2}y}{dx^{2}}=\frac{1}{dx/dt}\cdot\frac{d}{dt}\left[\frac{dy}{dx}\right]$ | NEVER $\frac{d^{2}y/dt^{2}}{d^{2}x/dt^{2}}$. The single most-failed item. |
| Log differentiation | $y'=y\cdot\frac{d}{dx}[\ln y]$ | For $f(x)^{g(x)}$ and tall products. Multiply back by $y$ or lose the mark. |
| Critical point | $f'(c)=0$ or $f'$ undefined at $c$ | Candidates only. $f(x)=x^{2/3}$ has a critical point at $0$ where $f'$ is undefined. |
| Second derivative test | $f''(c)<0 \Rightarrow$ max, $f''(c)>0 \Rightarrow$ min | $f''(c)=0$ is INCONCLUSIVE — fall back to the first derivative sign. |
| Concavity / inflection | $f''>0$ up, $f''<0$ down | Inflection needs $f''=0$ AND a sign change. $x^{4}$ has neither at $0$. |
| Closed-interval extrema | compare $f$ at critical points AND both endpoints | Omitting endpoint $x=3$ loses the true maximum $19$ for $x^{3}-3x+1$ on $[-2,3]$. |
| Optimization | optimize $f(x)$ subject to $g(x,y)=k$ | Use the constraint to eliminate a variable BEFORE differentiating. Minimise $D^{2}$, not $D$. |
| Related rates | differentiate the relation with respect to $t$ | Differentiate first, substitute numbers second. Substituting early gives $0=0$. |
| Similar triangles | $\frac{r}{h}=\frac{R}{H}=k$ | Cone/shadow problems. Eliminate the second variable before differentiating. |
| Differential | $dy=f'(x)\,dx$, $f(x+\Delta x)\approx f(x)+f'(x)\Delta x$ | $dy$ is the correction; the estimate is $f(x)+dy$. Radians for trig. |
| Error propagation | $\Delta Q=\lvert\frac{\partial Q}{\partial x}\rvert\Delta x+\lvert\frac{\partial Q}{\partial y}\rvert\Delta y$ | Uncertainties ADD in magnitude. A minus in the differential becomes a plus. |
| Power-law error | $\frac{\Delta Q}{Q}=n\frac{\Delta x}{x}$ for $Q=kx^{n}$ | Square doubles, square root halves, cube triples the relative error. |
| Rolle / MVT | $f(a)=f(b)\Rightarrow\exists c:f'(c)=0$; $f'(c)=\frac{f(b)-f(a)}{b-a}$ | Check hypotheses first. Keep only roots strictly inside $(a,b)$. |

### Traps that cost marks

> [!warning] The seven errors that appear every exam
> **1.** L'Hôpital on a determinate form — $\lim_{x\to0}\frac{\cos x}{x}$ is $1/0$, not $0/0$. The rule does not apply.
> **2.** Dropping a chain-rule factor: $\frac{d}{dx}e^{3x}=3e^{3x}$, not $e^{3x}$.
> **3.** Parametric $y''$ as $y''_{tt}/x''_{tt}$. For $x=t^{2},y=t^{3}$ that gives $3t$, but the true value is $\frac{3}{4t}$.
> **4.** Reporting $dy$ alone as the estimate. Add it to $f(x)$: $\sqrt{4.02}\approx 2+0.005=2.005$.
> **5.** Letting a minus sign cancel an uncertainty. $Q=x^{2}/y$ gives $2\frac{\Delta x}{x}+\frac{\Delta y}{y}$ — plus, always.
> **6.** Answering $x=c$ when the question asked for the maximum value, the dimensions, or the area.
> **7.** Substituting numerical values into a related-rates relation before differentiating — the derivative of a constant is zero.

### Calculator shortcuts — Canon F-789SGA

| Purpose | Keys | Example and verified result |
| --- | --- | --- |
| Numerical derivative at a point | `SHIFT` `d/dx` | $\frac{d}{dx}x^{x}$ at $x=2$: key `SHIFT` `d/dx` `X^X` `,` `2` `=` → `6.7726`; matches $x^{x}(\ln x+1)=4(\ln2+1)=6.7726$. |
| Check a rule-based derivative | `SHIFT` `d/dx` | $\frac{d}{dx}(3x^{2}+1)^{5}$ at $x=1$ → `7680`; matches $30(1)(4)^{4}=7680$. |
| Indeterminate $1^{\infty}$ limit | `MODE` `1`, then `ALPHA` `:` | $(1+3/x)^{2x}$ at $x=1\times10^{7}$ → `403.4284`; $e^{6}=403.4288$. |
| Solve $f(x)=0$ (critical points) | `SHIFT` `SOLVE` | $x^{3}-6x^{2}+9x=5$ → `X = 1`; residual `L−R = 0`. |
| Chain a multi-part calculation | `ALPHA` `:` | $Q=x^{2}/y$ with $x=10,y=4,\Delta x=0.1,\Delta y=0.05$: $\lvert2x/y\rvert\Delta x + \lvert x^{2}/y^{2}\rvert\Delta y$ → `0.8125`, and $\Delta Q/Q$ → `0.0325`. |

### Rapid-fire recall

- [ ] **Q1.** Evaluate $\lim_{x\to\infty}\frac{5x^{3}-2x}{4x^{3}+x^{2}}$.
- [ ] **Q2.** Evaluate $\lim_{x\to0}\frac{1-\cos 4x}{x^{2}}$.
- [ ] **Q3.** Differentiate $y=x^{3}\ln x$.
- [ ] **Q4.** Differentiate $y=(2x+1)^{3}$ at $x=1$.
- [ ] **Q5.** For $x=t^{2},y=t^{3}$, find $\frac{d^{2}y}{dx^{2}}$ at $t=2$.
- [ ] **Q6.** Locate the local maximum of $f(x)=xe^{-x}$.
- [ ] **Q7.** A cube's side is measured as $20\pm0.05$ cm. Percentage error in $V=s^{3}$?
- [ ] **Q8.** State Rolle's conclusion for $f(x)=x^{3}-3x^{2}+4$ on $[-1,3]$.
- [ ] **Q9.** A rectangle has perimeter 36 m. Its maximum area?
- [ ] **Q10.** Find $\frac{dy}{dx}$ for $x^{2}+y^{2}=25$ at $(3,4)$.

> [!success]- Answers
> **Q1.** $\frac{5}{4}$ — equal degrees, ratio of leading coefficients.
> **Q2.** $8$ — use $1-\cos u\approx u^{2}/2$ with $u=4x$.
> **Q3.** $y'=3x^{2}\ln x+x^{2}=x^{2}(3\ln x+1)$.
> **Q4.** $y'=6(2x+1)^{2}$, so $y'(1)=6(3)^{2}=54$.
> **Q5.** $\frac{dy}{dx}=\frac{3t}{2}$, $\frac{d^{2}y}{dx^{2}}=\frac{3}{4t}$, so at $t=2$: $\frac{3}{8}$.
> **Q6.** $f'=e^{-x}(1-x)=0$ at $x=1$; $f''(1)=-e^{-1}<0$, maximum at $(1,e^{-1})$.
> **Q7.** $\frac{\Delta V}{V}=3\frac{\Delta s}{s}=3(0.0025)=0.75\%$.
> **Q8.** $f(-1)=0=f(3)$ and $f$ is a polynomial, so some $c\in(-1,3)$ has $f'(c)=0$; $f'=3x(x-2)$ gives $c=2$.
> **Q9.** $x=y=9$, $A=81$ m². A square.
> **Q10.** $2x+2yy'=0$, $y'=-x/y=-3/4$.

### Drill — 5 minutes

**1.** Evaluate $\lim_{x\to0}\frac{1-\cos 6x}{3x^{2}}$.
> [!success]- Solution
> $1-\cos u\approx u^{2}/2$ with $u=6x$ gives $1-\cos 6x\approx 18x^{2}$.
> Divide by $3x^{2}$: $\frac{18x^{2}}{3x^{2}}=6$.
> Calculator check: key $(1-\cos 6X)/(3X^{2})$ and evaluate at $X=10^{-5}$ → `6.0000`.
> **Answer: $6$.** Trap: reporting $1/2$ (the unscaled value) or $18$.

**2.** Find the absolute maximum and minimum of $f(x)=x^{2}e^{-x}$ on $[-1,3]$.
> [!success]- Solution
> $f'(x)=e^{-x}(2x-x^{2})=xe^{-x}(2-x)$, so $f'=0$ at $x=0$ and $x=2$.
> Evaluate all candidates: $f(-1)=e\approx2.718$, $f(0)=0$, $f(2)=4e^{-2}\approx0.5413$, $f(3)=9e^{-3}\approx0.4481$.
> **Answer: absolute max $e$ at $x=-1$; absolute min $0$ at $x=0$.**
> Trap: quoting $4e^{-2}$ as the maximum. The endpoint $x=-1$ beats it — endpoints are candidates.

**3.** A cylinder keeps a constant volume of $1000$ cm³ while its height grows at $2$ cm/s. How fast is the radius changing when $r=6$ cm?
> [!success]- Solution
> Constraint: $V=\pi r^{2}h=1000$, so $\frac{dV}{dt}=\pi\left(2rh\frac{dr}{dt}+r^{2}\frac{dh}{dt}\right)=0$.
> $2h\frac{dr}{dt}=-r\frac{dh}{dt}$, so $\frac{dr}{dt}=-\frac{r}{2h}\frac{dh}{dt}$.
> With $r=6$, $h=\frac{1000}{\pi r^{2}}=\frac{1000}{36\pi}$: $\frac{dr}{dt}=-\frac{6}{2}\cdot\frac{36\pi}{1000}\cdot2=-\frac{2}{3}$.
> **Answer: $\frac{dr}{dt}=-\frac{2}{3}\approx-0.667$ cm/s (shrinking).**
> Trap: dropping the sign, or substituting $r=6$ into $\pi r^{2}h$ before differentiating.

---

## Block 2 — Integral Calculus (7 min)

**Topics:** [[01_Antiderivatives_and_Standard_Forms|Standard Forms]] · [[02_Algebraic_Substitution|Substitution]] · [[03_Definite_Integrals_and_FTC|Definite Integrals & FTC]] · [[04_Integration_by_Parts_and_Tabular|Parts & Tabular]] · [[05_Trigonometric_Integrals_and_Substitution|Trig Integrals]] · [[06_Partial_Fractions|Partial Fractions]] · [[07_Improper_Integrals|Improper Integrals]] · [[08_Average_Value_and_MVT_for_Integrals|Average Value]] · [[09_Plane_Areas_Cartesian|Plane Areas]] · [[10_Plane_Areas_Polar|Polar Areas]] · [[11_Volumes_by_Slicing,_Disk_and_Washer|Disk & Washer]] · [[12_Volumes_by_Cylindrical_Shells|Shells]] · [[13_Arc_Length_and_Surface_Area|Arc Length & Surface]] · [[14_Centroids_and_Pappus-Guldinus|Centroids & Pappus]] · [[15_Work_and_Hydrostatic_Force|Work & Hydrostatics]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Power rule | $\int x^{n}dx=\frac{x^{n+1}}{n+1}+C$, $n\neq-1$ | Fails at $n=-1$ only. $\int x^{-3}dx=-\frac{1}{2x^{2}}+C$, not a logarithm. |
| Reciprocal | $\int\frac{dx}{x}=\ln\lvert x\rvert+C$ | Absolute value required — the bars change the domain. |
| Exponential | $\int e^{x}dx=e^{x}+C$, $\int a^{x}dx=\frac{a^{x}}{\ln a}+C$ | Forget the $\ln a$ and every non-$e$ base is wrong. |
| Trig standard forms | $\int\sin=-\cos$, $\int\cos=\sin$, $\int\sec^{2}=\tan$, $\int\sec\tan=\sec$ | Signs: $\int\csc^{2}=-\cot$. Verify by differentiating. |
| Inverse trig forms | $\int\frac{dx}{1+x^{2}}=\arctan x$, $\int\frac{dx}{\sqrt{1-x^{2}}}=\arcsin x$ | Scaled: $\int\frac{dx}{x^{2}+a^{2}}=\frac{1}{a}\arctan\frac{x}{a}$. |
| Substitution | $\int f(g(x))g'(x)dx=\int f(u)\,du$, $u=g(x)$ | If $du=k\,dx$ the integral picks up $\frac{1}{k}$. Every $x$ and $dx$ must vanish. |
| Definite substitution | $\int_a^b f(g)g'\,dx=\int_{g(a)}^{g(b)}f(u)\,du$ | Convert the limits or convert back — never mix. $x=0,2$ with $u=x^{2}+1$ becomes $1,5$. |
| Radical substitutions | $\sqrt{a^{2}-x^{2}}\to x=a\sin\theta$; $\sqrt{a^{2}+x^{2}}\to x=a\tan\theta$; $\sqrt{x^{2}-a^{2}}\to x=a\sec\theta$ | Match the Pythagorean identity. Convert back via a reference triangle. |
| By parts | $\int u\,dv=uv-\int v\,du$ | Choose $u$ by LIATE: Log > InvTrig > Alg > Trig > Exp. |
| Logarithm alone | $\int\ln x\,dx=x\ln x-x+C$ | Take $u=\ln x$, $dv=dx$. Worth memorising. |
| Tabular | derivative column $\times$ integral column, signs $+,-,+,-$ | Valid only when the derivative column reaches zero (polynomial $u$). |
| Circular closure | $I=\int e^{ax}\sin bx\,dx\Rightarrow I=\frac{e^{ax}(a\sin bx-b\cos bx)}{a^{2}+b^{2}}$ | Parts twice returns $I$; solve algebraically. Do not add $+C$ twice. |
| FTC Part 2 | $\int_a^b f=F(b)-F(a)$ | Top limit minus bottom limit. No $+C$ on a definite integral. |
| Variable limits | $\frac{d}{dx}\int_a^{g(x)}f=f(g)g'$; $\frac{d}{dx}\int_{h(x)}^{a}f=-f(h)h'$ | Lower limit flips the sign. Most-missed: the $g'(x)$ factor. |
| Odd/even symmetry | odd on $[-a,a]\Rightarrow 0$; even $\Rightarrow 2\int_0^a$ | Check before integrating. $\int_{-2}^{2}(x^{3}+x)dx=0$ in one line. |
| Net vs total area | $\mathrm{total}=\int_a^b\lvert f\rvert\,dx$ | Split at the zeros. $\int_{-1}^{1}(x^{3}-x)dx=0$ but the enclosed area is $\frac{1}{2}$. |
| Area between curves | $A=\int_a^b(y_{\mathrm{top}}-y_{\mathrm{bot}})dx=\int_c^d(x_R-x_L)dy$ | Intersections are the limits. Area is never negative. |
| Average value | $f_{\mathrm{avg}}=\frac{1}{b-a}\int_a^b f\,dx$ | The $\frac{1}{b-a}$ is mandatory. On $[0,3]$, $x^{2}$ averages $3$, not $9$. |
| RMS / AC | $f_{\mathrm{rms}}=\sqrt{\frac{1}{b-a}\int f^{2}}$, $v_{\mathrm{rms}}=\frac{A}{\sqrt{2}}$ | Average of a full sine cycle is $0$; RMS is not. Power uses RMS. |
| Polar area | $A=\frac{1}{2}\int_{\alpha}^{\beta}r^{2}d\theta$ | $r$ squared and the $\frac12$ both mandatory. Rose petal spans $\pi/n$; cardioid traces once over $2\pi$. |
| Disk / washer | $V=\pi\int f^{2}dx$, $V=\pi\int(R^{2}-r^{2})dx$ | Difference of SQUARES, never the square of the difference. About $y=k$: radius $\lvert f-k\rvert$. |
| Shells | $V=2\pi\int(\mathrm{radius})(\mathrm{height})\,dx$ | Strips must be PARALLEL to the axis. Do not swap radius and height. |
| Arc length | $L=\int_a^b\sqrt{1+(y')^{2}}\,dx$; polar $\int\sqrt{r^{2}+(r')^{2}}\,d\theta$ | Do not drop the $1$. Exam problems are built so the radical collapses. |
| Surface of revolution | $S=2\pi\int(\mathrm{radius})\,ds$ | Uses $ds$, not $dx$. About the $x$-axis the radius is $y$. |
| Pappus | $V=2\pi\bar{r}A$, $S=2\pi\bar{r}L$ | Axis must be external and non-intersecting. Volume takes an AREA, surface takes an ARC LENGTH. |
| Hydrostatic force | $F=\rho g\int h\,dA=\gamma\int h\,L(y)\,dy$, $\gamma=9810$ N/m³ | Depth is measured from the FLUID SURFACE. Not $\rho g h A$ when depth varies. |
| Work | $W=\int F\,dx$, spring $W=\frac{1}{2}kx^{2}$ | Use extension from natural length, not total length. Each slice is lifted only its own distance. |

### Calculator shortcuts — Canon F-789SGA

| Purpose | Keys | Example verified by hand |
| --- | --- | --- |
| Numerical definite integral | `∫dx` | $\int_0^{2}x\sqrt{x^{2}+1}\,dx$ → `3.393447`; exact $\frac{5\sqrt5-1}{3}=3.393447$. |
| Integrate with the $\frac{1}{k}$ factor | `∫dx` | $\int_1^{4}\frac{x+1}{\sqrt{x}}dx$ → `6.666667`; exact $\frac{20}{3}$. Trap answer $\frac{10}{3}$ comes from dropping the $2$ in $2x^{1/2}$ at the top limit. |
| Tabular case in one line | `∫dx` | $\int_0^{3}x^{2}e^{-x}dx$ → `1.153620`; exact $2-17e^{-3}=1.153620$. |
| Linear-inside scaling | `∫dx` | $\int_1^{4}\frac{dx}{2x+1}$ → `0.549306`; exact $\frac{1}{2}\ln 3=0.549306$. |
| Verify a variable-limit FTC result | `SHIFT` `d/dx` | $\frac{d}{dx}\int_0^{x^{2}}\sin t\,dt$ at $x=1.5$: key `SHIFT` `d/dx` of $1-\cos(X^{2})$ `,` `1.5` → `2.3342`; matches $2x\sin(x^{2})=2.3342$. |
| Solve for a limit of integration | `SHIFT` `SOLVE` | $\int_0^{a}(x+1)dx=6$: chain `ALPHA` `=` then `SHIFT` `SOLVE` → `A = 2`; check $\frac{a^{2}}{2}+a=6$. |
| Chain pieces of a total area | `ALPHA` `:` | $\int_0^{4}\lvert x^{2}-2x\rvert dx$ on one line: `∫(X^2-2X,0,2)` `+` `∫(2X-X^2,2,4)` → `4/3 + 4/3` → `8/3`. |

### Traps that cost marks

> [!warning] The eight errors that appear every exam
> **1.** $\int_{-1}^{1}\frac{dx}{x^{2}}=-2$ by blind FTC. The integrand is positive everywhere; the true answer is DIVERGENCE. Split at the blow-up.
> **2.** Power rule at $n=-1$: $\int\frac{dx}{x}=\ln\lvert x\rvert+C$, never $x^{0}/0$.
> **3.** Forgetting to convert the limits after substitution: $\int_0^2 x\sqrt{x^2+1}\,dx$ with $u=x^{2}+1$ needs limits $1$ and $5$, not $0$ and $2$.
> **4.** Washer as $\pi\int(R-r)^{2}dx$. It is $R^{2}-r^{2}$. For $y=x$ over $y=x^{2}$ about the $x$-axis the correct volume is $\frac{2\pi}{15}$.
> **5.** Shell radius/height swapped, or strips perpendicular to the axis. Shells need strips PARALLEL to the rotation axis.
> **6.** Surface area with $dx$ instead of $ds$. A stack of cylinders is not a surface of revolution.
> **7.** Net signed area answered for a total-area question. $\int_{-1}^{2}x^{3}dx=\frac{15}{4}$; the enclosed area is $\frac{17}{4}$.
> **8.** Hydrostatic depth measured from the plate's top when the top is submerged by $d$: $h=y+d$, and omitting $d$ understates the force.

### Rapid-fire recall

- [ ] **Q1.** Evaluate $\int_1^{4}\left(2x+\frac{3}{x}\right)dx$.
- [ ] **Q2.** Evaluate $\int_0^{1}xe^{-x}dx$.
- [ ] **Q3.** Evaluate $\int\frac{dx}{x^{2}+16}$.
- [ ] **Q4.** Evaluate $\int x^{3}e^{2x}dx$ — state the LIATE choice for $u$.
- [ ] **Q5.** Decompose $\frac{1}{x(x+1)^{2}}$ — how many terms?
- [ ] **Q6.** Does $\int_1^{\infty}\frac{dx}{\sqrt{x}}$ converge?
- [ ] **Q7.** Find the average value of $x^{2}$ on $[0,1]$.
- [ ] **Q8.** Volume of $y=\sqrt{x}$ on $[0,4]$ rotated about the $x$-axis?
- [ ] **Q9.** Arc length of $y=\ln(\sec x)$ from $0$ to $\pi/4$?
- [ ] **Q10.** Hydrostatic force on a $2$ m × $3$ m plate whose top is $1$ m under water?

> [!success]- Answers
> **Q1.** $[x^{2}+3\ln\lvert x\rvert]_1^4=15+3\ln 4$.
> **Q2.** $1-\frac{2}{e}\approx0.2642$; $v=-e^{-x}$ carries the minus.
> **Q3.** $\frac{1}{4}\arctan\frac{x}{4}+C$ — the $1/a$ scaling is mandatory.
> **Q4.** $u=x^{3}$ (Algebraic beats Exponential); $e^{2x}\left(\frac{x^{3}}{2}-\frac{3x^{2}}{4}+\frac{3x}{4}-\frac{3}{8}\right)+C$.
> **Q5.** Three: $\frac{A}{x}+\frac{B}{x+1}+\frac{C}{(x+1)^{2}}$. One term per power of a repeated factor.
> **Q6.** Diverges — this is $p=\frac{1}{2}<1$, and the p-rule at infinity needs $p>1$.
> **Q7.** $\frac{1}{1-0}\int_0^1x^{2}dx=\frac{1}{3}$.
> **Q8.** $V=\pi\int_0^4 x\,dx=8\pi$.
> **Q9.** $1+(y')^{2}=1+\tan^{2}x=\sec^{2}x$, so $L=\int_0^{\pi/4}\sec x\,dx=\ln(\sqrt2+1)\approx0.8814$.
> **Q10.** $F=9810(2)\int_0^3(y+1)dy=19620(7.5)=147{,}150$ N.

### Drill — 5 minutes

**1.** Evaluate $\int_1^{4}\frac{x+1}{\sqrt{x}}\,dx$.
> [!success]- Solution
> There is no quotient rule for integrals, so split algebraically: $\frac{x+1}{\sqrt{x}}=x^{1/2}+x^{-1/2}$.
> Antidifferentiate: $\frac{2}{3}x^{3/2}+2x^{1/2}$.
> Evaluate from $1$ to $4$: $\frac{2}{3}(8-1)+2(2-1)=\frac{14}{3}+2=\frac{20}{3}$.
> Calculator check: `∫dx` of $(X+1)/\sqrt{X}$ from `1` to `4` → `6.666667`, matching $\frac{20}{3}=6.6667$.
> **Answer: $\frac{20}{3}$.**
> Trap: attempting $\int\frac{x+1}{\sqrt x}dx=\frac{\int(x+1)dx}{\int\sqrt x\,dx}$. Split the fraction, never the integral.

**2.** Find the volume generated by rotating $y=x^{2}$ on $[0,2]$ about the $y$-axis.
> [!success]- Solution
> Strips parallel to the $y$-axis, so shells: radius $=x$, height $=x^{2}$.
> $V=2\pi\int_0^2 x\cdot x^{2}dx=2\pi\left[\frac{x^{4}}{4}\right]_0^2=2\pi(4)=8\pi$.
> Cross-check by disks in $y$: $x=\sqrt{y}$, so $V=\pi\int_0^4 y\,dy=\pi(8)=8\pi$. The two methods agree.
> **Answer: $8\pi$ cubic units.**
> Trap: using washers in $x$, which forces two integrals because the inner boundary changes at the parabola's vertex; or swapping radius $x$ with height $x^{2}$.

**3.** Evaluate $\int\frac{dx}{x^{2}+16}$.
> [!success]- Solution
> Match $\int\frac{du}{u^{2}+a^{2}}=\frac{1}{a}\arctan\frac{u}{a}+C$ with $a=4$.
> **Answer: $\frac{1}{4}\arctan\frac{x}{4}+C$.**
> Verify by differentiating: $\frac{d}{dx}\left[\frac{1}{4}\arctan\frac{x}{4}\right]=\frac{1}{4}\cdot\frac{1/4}{1+x^{2}/16}=\frac{1}{x^{2}+16}$. Correct.
> Trap: writing $\arctan\frac{x}{4}+C$ and dropping the $\frac{1}{a}$ — a factor-of-4 error.

---

## Block 3 — Differential Equations (8 min)

**Topics:** [[01_Separation_of_Variables|Separation of Variables]] · [[02_Linear_First_Order_and_Bernoulli|Linear 1st Order & Bernoulli]] · [[03_Exact_Equations_and_Integrating_Factors|Exact & Integrating Factors]] · [[04_Homogeneous_Equations_and_Substitutions|Homogeneous & Substitutions]] · [[05_Growth,_Decay_and_Newton’s_Cooling|Growth, Decay & Newton’s Cooling]] · [[06_Mixtures_and_Orthogonal_Trajectories|Mixtures & Orthogonal Trajectories]] · [[07_Higher_Order_Homogeneous_Auxiliary_Equation|Auxiliary Equation]] · [[08_Undetermined_Coefficients|Undetermined Coefficients]] · [[09_Variation_of_Parameters|Variation of Parameters]] · [[10_Mass-Spring-Damper_Systems|Mass-Spring-Damper]] · [[11_RLC_Circuit_Transients|RLC Transients]] · [[12_PDE_Wave_Equation_1D|Wave (brief)]] · [[13_PDE_Heat_Equation_1D|Heat (brief)]] · [[14_PDE_Laplace_Equation_2D|Laplace (brief)]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Separable | $\frac{dy}{dx}=f(x)g(y)\Rightarrow\int\frac{dy}{g(y)}=\int f(x)\,dx+C$ | RHS must **factor**. $x+y$ is not separable. Zero of $g$ gives the lost singular solution $y\equiv c$. |
| Linear 1st order | $\frac{dy}{dx}+P(x)y=Q(x)$ | Coefficient of $y'$ must be 1 first. Reading $P$ off $xy'+y=x^2$ ($P=1/x$, not 1) is the classic killer. |
| Integrating factor | $\mu=e^{\int P\,dx}$ | Sign of $P$ is kept: $y'-y=e^{2x}$ needs $\mu=e^{-x}$. Constant inside $\mu$ cancels; set it to 0. |
| Linear solution | $y=\frac{1}{\mu}\left[\int\mu Q\,dx+C\right]$ | The $1/\mu$ divides the constant **and** the integral. Ambushing mistake: applying it to the integral only. |
| Bernoulli | $v=y^{1-n}\Rightarrow v'+(1-n)Pv=(1-n)Q$ | $n\neq0,1$. Preserves $P$'s sign; $y\equiv0$ is lost by dividing by $y^n$ and must be added back. |
| Exact test | $M_y=N_x$ | Not $M_x=N_y$. Then $F=\int M\,dx+g(y)$ and $g'(y)=N-\partial_y\int M\,dx$ must be free of $x$. |
| Integrating factors (exact) | $\mu(x)=e^{\int\frac{M_y-N_x}{N}dx}$, $\mu(y)=e^{\int\frac{N_x-M_y}{M}dy}$ | Numerator and denominator are both swapped; the ratio must lose the other variable. Re-test on $\mu M,\mu N$. |
| Auxiliary equation | $ay''+by'+cy=0\Rightarrow am^2+bm+c=0$ | $m_1+m_2=-b/a$, $m_1m_2=c/a$ check the factorisation in 5 seconds. |
| Repeated root | $m_1=m_2=m\Rightarrow y=(C_1+C_2x)e^{mx}$ | Missing $x$ = one solution wearing two names; cannot meet two initial conditions. |
| Complex roots | $m=\alpha\pm j\beta\Rightarrow y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$ | $\beta=\sqrt{4ac-b^2}/(2a)$, **not** $\sqrt{b^2-4ac}$. Both sin and cos are required. |
| Euler-Cauchy | $ax^2y''+bxy'+cy=0\Rightarrow am(m-1)+bm+c=0$ | The $b-a$ is the whole trap; repeated root gives $y=(C_1+C_2\ln x)x^m$. |
| Undetermined coefficients | $y_p=x^s\times(\mathrm{trial})$ | $s$ = multiplicity of the duplicated root ($s=2$ for a double root). Polynomial forcing needs **every** lower power. |
| Variation of parameters | $u_1'=-\frac{y_2f}{W}$, $u_2'=\frac{y_1f}{W}$, $W=y_1y_2'-y_1'y_2$ | Only for $\tan x$, $\sec x$, $\ln x$, $1/x$, $e^x/x$. Divide by the leading coefficient first; minus sign belongs to $u_1'$. |
| Growth / decay | $y=y_0e^{k(t-t_0)}$, $t_{1/2}=\frac{\ln 2}{\lambda}=0.6931/\lambda$ | $\ln 2$, never $0.5$ or $1$. Fraction remaining = $2^{-t/t_{1/2}}$ works for fractional half-lives. |
| Newton's cooling | $T=T_m+(T_0-T_m)e^{-kt}$ | Only the **excess** $T-T_m$ is exponential; $T_m$ is the asymptote, never crossed. |
| Mass-spring-damper | $m\ddot{x}+c\dot{x}+kx=F$, $\omega_n=\sqrt{k/m}$, $c_c=2\sqrt{mk}$, $\omega_d=\omega_n\sqrt{1-\zeta^2}$ | The factor 2 in $c_c$ decides overdamped vs underdamped; $\omega_d<\omega_n$ always, and does not exist for $\zeta\ge1$. |
| Series RLC | $\alpha=\frac{R}{2L}$, $\omega_0=\frac{1}{\sqrt{LC}}$, $R_{crit}=2\sqrt{L/C}$ | Critically damped at $R=2\sqrt{L/C}$; for **parallel** RLC it is $R=\frac{1}{2}\sqrt{L/C}$ and $\alpha=\frac{1}{2RC}$. Convert mH and µF first. |
| DC steady state | $i(\infty)=v_s/R$, $v_C(\infty)=v_s$, $q_p=Cv_s$ | L is a short, C is an open. The particular solution is what the transient decays **to**, not zero. |
| Wave (low yield) | $u_{tt}=c^2u_{xx}$, $f_n=\frac{nc}{2L}$, $B_n=\frac{2}{n\pi c}\int_0^L g\sin\frac{n\pi x}{L}dx$ | The $1/(n\pi c)$ in the velocity coefficients is the most-forgotten factor in the topic. |
| Heat (low yield) | $u_t=\alpha u_{xx}$, $u=\sum B_n\sin\frac{n\pi x}{L}e^{-\alpha n^2\pi^2t/L^2}$ | First order in $t$ → pure decay, no oscillation. Mode $n$ decays $n^2$ times faster than mode 1. |
| Laplace (low yield) | $u_{xx}+u_{yy}=0$, $B_n\sinh\frac{n\pi b}{a}=\frac{2}{a}\int_0^a f\sin\frac{n\pi x}{a}dx$ | Two homogeneous sides take the sines; the Fourier coefficient is $B_n\sinh(n\pi b/a)$, so divide by the sinh. |

### Traps that cost marks

- **Non-normalised first-order equations.** Every $P$, $Q$ and every $f$ in variation of parameters must come from $y'+Py=Q$ and $y''+Py'+Qy=f$. Skipping the division scales the whole answer.
- **Lost singular solutions.** Dividing by $g(y)$ or $y^n$ deletes $y\equiv0$ (or $y\equiv c$). If the question says "all solutions", it is worth a mark.
- **Two arbitrary constants in a separable solution.** Only $C_1-C_2$ is physical; carrying both gives a family wider than the ODE's order.
- **Sign slips in the integrating factor.** $\mu=e^{\int P\,dx}$ keeps the sign of $P$; it is never $e^{\int\lvert P\rvert dx}$.
- **Reversed exactness partials.** $M_y=N_x$. Reversing gives a wrong potential that still "looks" symmetric.
- **Bernoulli sign error.** From $v'+(1-n)Pv=(1-n)Q$ the $P$-sign flips for $n=2,3,\dots$; for $y'+y=xy^2$ the reduced equation is $v'-v=-x$.
- **Repeated root without the $x$.** $(C_1+C_2x)e^{mx}$; a third-order ODE needs **three** constants — count the roots with multiplicity.
- **Resonance trial left unmultiplied.** For $y''+4y=8\sin2x$ the plain $A\cos2x+B\sin2x$ gives $0=8\sin2x$; you need $x^s$ with $s$ = root multiplicity.
- **Constants put inside $y_p$.** They belong to $y_h$; there they make the coefficient system singular when 0 is a root.
- **Unit prefixes in the RLC criteria.** $\omega_0=1/\sqrt{LC}$ needs henries and farads; leaving $L$ in mH inflates $\omega_0$ by $\sqrt{1000}$.
- **Comparing $R$ with $\sqrt{L/C}$.** The criteria are $2\sqrt{L/C}$ (series) and $\frac{1}{2}\sqrt{L/C}$ (parallel) — dropping the factor 2 (or 4) misclassifies the circuit.
- **Treating $i(0)$ as a condition on $q$.** $i=q'$, so an initial current is a condition on the derivative; substituting it for $q(0)$ forces the trivial solution.
- **"Released from rest" ≠ $c_2=0$.** Rest fixes $\dot{x}(0)=0$; the derivative of the decaying oscillation is not zero at $t=0$, so $c_2$ is generally nonzero.
- **Absolute temperature in Newton's cooling.** Feed $T-T_m$, not $T$. Mixing °C and °F between the two readings destroys the ratio.
- **Assuming resonance is at $\omega_n$.** Peak displacement is at $\omega_n\sqrt{1-2\zeta^2}$, below $\omega_n$, and does not exist for $\zeta\ge0.707$. At $\omega=\omega_n$ the amplitude is the finite $F_0/(c\omega_n)$.
- **PDE coefficient thefts.** Heat: the rate is $\alpha n^2\pi^2/L^2$ — $\alpha$ is diffusivity (m²/s), not conductivity; Laplace: the Fourier coefficient is $B_n\sinh(n\pi b/a)$, not $B_n$.

### Rapid-fire recall

- [ ] **Q1.** Solve $\frac{dy}{dx}=2xy^2$, $y(0)=1$, and give the interval of validity.
- [ ] **Q2.** What is $\mu$ for $xy'+y=x^2$, and what is the solution through $y(1)=2$?
- [ ] **Q3.** Test $(2xy-3)\,dx+(x^2+4y)\,dy=0$ for exactness and write $F(x,y)=C$.
- [ ] **Q4.** $y''+6y'+9y=0$: write the general solution.
- [ ] **Q5.** The auxiliary equation is $m^2+4m+13=0$: give $\alpha$, $\beta$ and the real general solution.
- [ ] **Q6.** Solve $y''-2y'+y=6e^{x}$ for the particular solution only.
- [ ] **Q7.** Series RLC with $L=1$ H, $C=0.1$ F, $R=2\ \Omega$: give $\omega_0$, $\alpha$, $\omega_d$ and the damping class.
- [ ] **Q8.** $m=2$ kg, $k=50$ N/m, $\zeta=0.5$: find $c$ and $\omega_d$.
- [ ] **Q9.** A body at $100\ ^\circ\mathrm{C}$ in a $25\ ^\circ\mathrm{C}$ room reaches $70\ ^\circ\mathrm{C}$ in 10 min: find $k$ and the time to $40\ ^\circ\mathrm{C}$.
- [ ] **Q10.** A string of length $\pi$, $c=1$, is released from rest with $u(x,0)=3\sin 2x$: write $u(x,t)$ and $\omega_2$.

> [!success]- Answers
> **Q1.** $y=\dfrac{1}{1-x^2}$ on $-1<x<1$, plus the singular solution $y\equiv0$. Trap: no interval — the formula blows up at $x=\pm1$.
> **Q2.** $\mu=e^{\int dx/x}=x$ (normalise first!), so $(xy)'=x^2$, $xy=x^3/3+C$, $C=5/3$: $y=\dfrac{x^2}{3}+\dfrac{5}{3x}$ for $x>0$.
> **Q3.** $M_y=2x=N_x$, exact. $F=x^2y-3x+2y^2$, so $x^2y-3x+2y^2=C$. Trap: treating the $x$-integration constant as a number instead of $g(y)$.
> **Q4.** $(m+3)^2=0$ is a double root: $y=(C_1+C_2x)e^{-3x}$. Trap: writing two separate $e^{-3x}$ terms.
> **Q5.** $\alpha=-2$, $\beta=\sqrt{52-16}/2=3$, so $y=e^{-2x}(C_1\cos3x+C_2\sin3x)$. Trap: $\beta=6$ from $\sqrt{b^2-4ac}$.
> **Q6.** Double root $r=1$, so $s=2$: $y_p=Ax^2e^{x}$ gives $2Ae^{x}=6e^{x}$, $A=3$, $y_p=3x^2e^{x}$. Trap: $Axe^{x}$ also returns zero.
> **Q7.** $\omega_0=1/\sqrt{0.1}=3.162$ rad/s, $\alpha=R/(2L)=1$ Np/s, $\omega_d=\sqrt{10-1}=3$ rad/s, underdamped ($R<R_{crit}=6.32\ \Omega$, $\zeta=0.316$). Trap: $\omega_0-\alpha=2.162$.
> **Q8.** $\omega_n=\sqrt{50/2}=5$ rad/s, $c=2\zeta m\omega_n=2(0.5)(2)(5)=10$ N·s/m, $\omega_d=5\sqrt{0.75}=4.33$ rad/s. Trap: $c=\zeta\sqrt{mk}=5$.
> **Q9.** $45=75e^{-10k}$, $k=\ln(5/3)/10=0.0511\ \mathrm{min^{-1}}$; then $15=75e^{-kt}$ gives $t=\ln 5/k=31.5$ min. Trap: feeding $T$ instead of $T-T_m$.
> **Q10.** $u=3\sin2x\cos4t$ with $\omega_2=2\cdot 2=4$ rad/s. Trap: $\cos2t$ — the time factor is $\omega_n=n\pi c/L=2n$.

### Calculator shortcuts (Canon F-789SGA key sequences)

- **Auxiliary-equation roots, including complex.** `MODE` `5` (EQN) then page 2 `1` quadratic / page 2 `2` cubic; key the coefficients and read the roots. $m^2-5m+6=0$: $m_1=3$, $m_2=2$ (so $y=C_1e^{2x}+C_2e^{3x}$). $m^2+4m+13=0$: $x_1=-2+3i$, $x_2=-2-3i$ (so $\alpha=-2$, $\beta=3$; the screen shows `i` directly). $m^3-6m^2+11m-6=0$ via cubic: $1,2,3$, and $1+2+3=6=-b/a$ confirms it.
- **Non-homogeneous coefficient by `SHIFT` `SOLVE`, then sanity-check the derivative.** For $y_p=A$ with $y''-4y=8$: key `0-4A=8` with `ALPHA` `=` for the equals sign, `SHIFT` `SOLVE`, guess `1`, `=` → $A=-2$ with $L-R=0$. To check a candidate extremum of a solution, `SHIFT` `d/dx` $\left(x^2e^{-x}\right)$ at $x=2$ → $0$, which is exactly why $t=\ln4/3$ is where the RLC charge peaks.
- **Cooling / decay constants, chained with `ALPHA` `:`.** Cooling: `(ln(5/3))/10` `ALPHA` `:` `(ln5)*10/(ln(5/3))` gives $k=0.05108\ \mathrm{min^{-1}}$ then $t=31.51$ min. Growth/decay: `ln2/5730` `ALPHA` `:` `ln5*5730/ln2` gives $\lambda=1.2097\times10^{-4}\ \mathrm{yr^{-1}}$ then $t=13305$ yr for 20% remaining.
- **Critical resistance / resonant frequency in one line.** Series RLC, $L=40$ mH, $C=10\ \mu$F: `2√(0.04÷10⁻⁵)` → $126.49\ \Omega$; `1÷√(0.04×10⁻⁵)` → $1581.14$ rad/s; chain a third statement `Ans÷(2π)` → $251.65$ Hz. Note `Ans` carries the last result, so no manual re-entry of $\omega_0$.

### Drill — 5 minutes

**1.** Solve $\dfrac{dy}{dx}+\dfrac{1}{x}y=2$ for $x>0$ with $y(1)=3$.

> [!success]- Solution
> $\mu=e^{\int dx/x}=x$; $(xy)'=2x$, so $xy=x^2+C$ and $y=x+C/x$. $y(1)=3$ gives $C=2$: $y=x+\dfrac{2}{x}$, i.e. $y=\dfrac{x^2+2}{x}$. Check: $y(1)=3$ and $y'+y/x=1-2/x^2+(x+2/x)/x=2$.
> **Discriminator trap:** reading $P=1$ from $y'+y/x=2$ gives $\mu=e^{x}$ and a solution that fails substitution. The coefficient of $y'$ must be 1 (it already is here), and $P$ is $1/x$, not 1.

**2.** Solve $y''+9y=x^2$, $y(0)=2$, $y'(0)=1$.

> [!success]- Solution
> $y_h=C_1\cos3x+C_2\sin3x$. The forcing $x^2$ duplicates no root, so $y_p=Ax^2+Bx+C$: $2A+9Ax^2+9Bx+9C=x^2$ gives $A=1/9$, $B=0$, $C=-2/9$. Then $y(0)=C_1-2/9=2$, so $C_1=20/9$; $y'=-3C_1\sin3x+3C_2\cos3x+2x/9$, so $y'(0)=3C_2=1$, $C_2=1/3$.
> **Answer:** $y=\dfrac{20}{9}\cos3x+\dfrac{1}{3}\sin3x+\dfrac{x^2}{9}-\dfrac{2}{9}$, equivalently $y=\dfrac{20\cos3x+3\sin3x+x^2-2}{9}$. Check: $y(0)=(20-2)/9=2$, $y'(0)=3(1/3)=1$, and $y''+9y=x^2$ identically.
> **Discriminator trap:** dropping the lower powers of the polynomial trial. $Ax^2$ alone leaves $B$ and $C$ undetermined, so the constant equation $2A+9C=0$ is never solved and the $-2/9$ offset — worth the whole answer — is lost.

**3.** A series RLC circuit uses $L=25$ mH and $C=0.4\ \mu$F. Find the resistance for critical damping and the resulting undamped resonant frequency in Hz.

> [!success]- Solution
> Convert first: $L=0.025$ H, $C=4\times10^{-7}$ F. $L/C=0.025/(4\times10^{-7})=62{,}500$, so $R_{crit}=2\sqrt{62{,}500}=2(250)=500.0\ \Omega$. Then $\omega_0=1/\sqrt{LC}=1/\sqrt{10^{-8}}=10{,}000$ rad/s and $f_0=\omega_0/(2\pi)=1591.5$ Hz. Consistency: at critical damping $\alpha=R/(2L)=500/0.05=10{,}000=\omega_0$.
> **Discriminator trap:** substituting millihenries and microfarads directly. $2\sqrt{25/0.4}=15.81\ \Omega$ is $31.6=\sqrt{1000}$ times too small; the prefixes must be converted before the square root, and every damping conclusion drawn from the unconverted value is wrong.

---

## Block 4 — Advanced Engineering Math (8 min)

**Topics:** [[07_Laplace_Transform_Pairs|Laplace Pairs]] · [[08_Shifting_Theorems_and_Properties|Shifting Theorems]] · [[10_Inverse_Laplace_and_Partial_Fractions|Inverse Laplace]] · [[09_Unit_Step,_Dirac_and_Periodic_Functions|Step, Dirac, Periodic]] · [[11_Fourier_Series_Trigonometric_and_Exponential|Fourier Series]] · [[13_Fourier_Transform_Properties|Fourier Transform]] · [[16_Matrices,_Determinants,_Rank_and_Inversion|Matrices & Determinants]] · [[17_Cramer’s_Rule_and_Linear_Systems|Cramer & Systems]] · [[18_Eigenvalues_and_Eigenvectors|Eigenvalues]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Transform of a sinusoid | $\mathcal{L}\{\sin\omega t\}=\frac{\omega}{s^{2}+\omega^{2}}$, $\mathcal{L}\{\cos\omega t\}=\frac{s}{s^{2}+\omega^{2}}$ | Numerator distinguishes them. Inverse trap: $\mathcal{L}^{-1}\{\frac{1}{s^{2}+a^{2}}\}=\frac{\sin at}{a}$, not $\sin at$. |
| Transform of a damped sinusoid | $\mathcal{L}\{e^{-at}\sin\omega t\}=\frac{\omega}{(s+a)^{2}+\omega^{2}}$, $\mathcal{L}\{e^{-at}\cos\omega t\}=\frac{s+a}{(s+a)^{2}+\omega^{2}}$ | Every $s$ becomes $s+a$, numerator included. Expanding gives $s^{2}+2as+(a^{2}+\omega^{2})$. |
| Transform of a power | $\mathcal{L}\{t^{n}\}=\frac{n!}{s^{n+1}}$, $\mathcal{L}\{t^{n}e^{-at}\}=\frac{n!}{(s+a)^{n+1}}$ | The $n!$ and the $(n+1)$ are the two marks lost most often: $t^{2}\to 2/s^{3}$, $t\to 1/s^{2}$. |
| Impulse, step, delay | $\mathcal{L}\{\delta(t)\}=1$, $\mathcal{L}\{u(t)\}=\frac{1}{s}$, $\mathcal{L}\{f(t-a)u(t-a)\}=e^{-as}F(s)$ | Impulse is $1$ for all $s$; step needs $\mathrm{Re}\,s>0$. Delaying the step without delaying the argument gives $\mathcal{L}\{tu(t-1)\}=e^{-s}(\frac{1}{s^{2}}+\frac{1}{s})$, never $e^{-s}/s^{2}$. |
| Shifting and derivative rules | $\mathcal{L}\{e^{-at}f(t)\}=F(s+a)$, $\mathcal{L}\{f'\}=sF(s)-f(0^{-})$, $\mathcal{L}\{f''\}=s^{2}F(s)-sf(0^{-})-f'(0^{-})$ | The $s$-shift is $s+a$, not $s-a$. Dropping the initial-condition terms silently solves a different problem. |
| Periodic waveform | $\mathcal{L}\{f\}=\frac{1}{1-e^{-sT}}\int_0^{T}f(t)e^{-st}dt$ | $T$ is the FULL period in both the integral and the geometric factor. A period-2 $\pm1$ square wave gives $\frac{1}{s}\tanh(\frac{s}{2})$. |
| Inverse Laplace by pole type | $\frac{1}{s+a}\to e^{-at}$, $\frac{1}{(s+a)^{n}}\to\frac{t^{n-1}e^{-at}}{(n-1)!}$, $\frac{A(s+a)+B}{(s+a)^{2}+b^{2}}\to e^{-at}(A\cos bt+\frac{B}{b}\sin bt)$ | Simple, repeated, complex-conjugate poles. $1/s^{3}\to t^{2}/2$. Divide first when $\deg N\geq\deg D$ or the $\delta(t)$ is lost. |
| Residue coefficients | $A_k=\frac{N(-p_k)}{D'(-p_k)}$, $B=\frac{d}{ds}[(s+p)^{2}F(s)]_{s=-p}$ | Simple poles by evaluation, repeated poles by derivative. The lower repeated-pole coefficient is never the same evaluation as the highest, even when the values coincide. |
| Initial and final value | $f(0^{+})=\lim_{s\to\infty}sF(s)$, $f(\infty)=\lim_{s\to 0}sF(s)$ | Both include the extra $s$. Final value needs every pole of $sF(s)$ in the open left half-plane, at most one simple pole at the origin: $F=\frac{1}{s^{2}+1}$ gives $0$ but $\sin t$ has no limit. |
| Fourier coefficients | $a_0=\frac{1}{T}\int_T f\,dt$, $a_n=\frac{2}{T}\int_T f\cos n\omega_0 t\,dt$, $b_n=\frac{2}{T}\int_T f\sin n\omega_0 t\,dt$ | $a_0$ has NO factor 2 — it integrates against the constant of mean square 1. Canonic conventions in [[11_Fourier_Series_Trigonometric_and_Exponential]]. |
| Exponential form | $c_n=\frac{1}{T}\int_T f e^{-jn\omega_0 t}dt$, $c_n=\frac{1}{2}(a_n-jb_n)$, $c_{-n}=c_n^{*}$ | $c_0=a_0$. Conjugate symmetry is the one-line check on any computed spectrum. |
| Harmonic amplitude | $A_n=\sqrt{a_n^{2}+b_n^{2}}=2\lvert c_n\rvert$, $\phi_n=-\arctan\frac{b_n}{a_n}$ | Exponential magnitude is exactly HALF the one-sided amplitude. Reporting $\lvert c_1\rvert=4/\pi$ for the $\pm1$ square wave keeps the trigonometric number by mistake; the true value is $2/\pi\approx0.6366$. |
| Symmetry shortcuts | even: $b_n=0$; odd: $a_n=0$, $a_0=0$; half-wave $f(t\pm T/2)=-f(t)$: odd $n$ only | Check before integrating. Even symmetry governs sine vs cosine; half-wave symmetry governs the harmonic index. They are independent. |
| Parseval and convergence | $P=a_0^{2}+\frac{1}{2}\sum(a_n^{2}+b_n^{2})=\sum\lvert c_n\rvert^{2}$; $\lvert c_n\rvert\sim\frac{1}{n}$ (jump), $\sim\frac{1}{n^{2}}$ (corner) | The $\frac{1}{2}$ is mandatory. A $+1/-1$ square wave has mean square 1 via $\frac{8}{\pi^{2}}\cdot\frac{\pi^{2}}{8}$. |
| Half-range series | cos $f=\frac{a_0}{2}+\sum a_n\cos\frac{n\pi x}{L}$, sin $f=\sum b_n\sin\frac{n\pi x}{L}$, both with $\frac{2}{L}\int_0^{L}$ | Half-range $a_0/2$ is already the constant term. Every sine series is zero at $x=0$ and $x=L$, even when $f(L)=L$. At a jump the series gives the average $\frac{1}{2}[f(x^{+})+f(x^{-})]$. |
| Fourier transform core | $F(\omega)=\int f e^{-j\omega t}dt$, delay $e^{-j\omega t_0}$, scale $\frac{1}{\lvert a\rvert}F(\frac{\omega}{a})$, $f' \to j\omega F$ | A delay changes phase only: $\lvert F\rvert$ is untouched by a shift. Angular convention puts $\frac{1}{2\pi}$ on the inverse and on Parseval. |
| Transform pairs and nulls | rect $\leftrightarrow$ $\tau\,\mathrm{sinc}(\frac{\omega\tau}{2})$, $e^{-at}u(t)\leftrightarrow\frac{1}{a+j\omega}$, $e^{-at^{2}}\leftrightarrow\sqrt{\frac{\pi}{a}}e^{-\omega^{2}/(4a)}$ | First null at $\omega=2\pi/\tau$, not $1/\tau$ — answering $1/\tau$ rad/s is off by $2\pi$. $F(0)=\tau$ is the pulse area. Dropping $\frac{1}{\lvert a\rvert}$ in $f(2t)$ doubles the spectrum and quadruples the Parseval energy. |
| Complex numbers | $e^{j\theta}=\cos\theta+j\sin\theta$, $(r\angle\theta)^{n}=r^{n}\angle n\theta$, roots $r^{1/n}\angle\frac{\theta+2\pi k}{n}$ | Euler and De Moivre. A root question needs all $n$ values $k=0,\ldots,n-1$; giving one costs most of the marks. |
| Determinant laws | $\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$; $\det(AB)=\det A\det B$; $\det(A^{T})=\det A$; $\det(kA)=k^{n}\det A$ | $n$ is the ORDER: $\det(3A)=9\det A$ on a 2x2 and $27\det A$ on a 3x3. Multiplying only ONE row by $k$ is the case where the factor really is $k$. Triangular: product of the diagonal, so one zero diagonal entry kills it. |
| Determinant by cofactors | $\det A=\sum_j a_{ij}C_{ij}$, $C_{ij}=(-1)^{i+j}M_{ij}$ | Expand along the row or column with the most zeros — the answer is the same. Sarrus is a 3x3 ONLY shortcut and its checkerboard starts $+,-,+$ across the first row. |
| Inverse and adjugate | $A^{-1}=\frac{1}{\det A}\mathrm{adj}(A)$, $\mathrm{adj}(A)_{ij}=C_{ji}$, $A\,\mathrm{adj}(A)=(\det A)I$ | $2\times2$: swap the diagonal, negate the off-diagonal, divide by $ad-bc$. The adjugate identity holds even for singular matrices and is the fastest hand check that the cofactors are right; forget the transpose and it still looks plausible but fails $AA^{-1}=I$. |
| Rank and singularity | $\det A=0\iff\mathrm{rank}(A)<n\iff A\mathbf{x}=\mathbf{0}$ has $\mathbf{x}\neq\mathbf{0}$ | Rank is the pivot count in row-echelon form, never the row count of the original matrix, and it cannot exceed $\min(\mathrm{rows},\mathrm{cols})$. A matrix with no zero entry can still be singular. |
| Eigenvalues | $\det(A-\lambda I)=0$; $\sum_i\lambda_i=\mathrm{tr}\,A$, $\prod_i\lambda_i=\det A$ | The trace and determinant checks reject wrong roots in seconds, and they are also free — compute them BEFORE expanding. Triangular or diagonal: eigenvalues are the diagonal entries. |
| Eigenvectors and diagonalisation | $(A-\lambda I)\mathbf{v}=\mathbf{0}$; $A=PDP^{-1}$, $A^{k}=PD^{k}P^{-1}$ | The eigenvector is any nonzero null-space vector, defined only up to scale, so $(2,1)$, $(4,2)$ and $(-2,-1)$ all pass. Column $i$ of $P$ must pair with $D_{ii}$, and the $P^{-1}$ is never optional. |
| Diagonalisability and Cayley-Hamilton | Needs $n$ independent eigenvectors; $\mathrm{tr}\,A=6,\det A=5\Rightarrow\lambda^{2}-6\lambda+5=0$; real symmetric $\Rightarrow$ orthogonal $P$, $P^{-1}=P^{T}$ | $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has $\lambda=1$ twice but only one eigenvector, so it is NOT diagonalisable. Counting eigenvalues is not counting eigenvectors. |
| Cramer's rule | $x_i=\frac{\det(A_i)}{\det A}$, unique iff $\det A\neq0$ | $A_i$ is $A$ with column $i$ replaced by $\mathbf{b}$, with no sign change. Swapping the numerators on a 2x2 gives a plausible pair and only the substitution check $A\mathbf{x}=\mathbf{b}$ exposes it. |
| Consistency and free variables | solution iff $\mathrm{rank}(A)=\mathrm{rank}([A\mid\mathbf{b}])$; free variables $=n-\mathrm{rank}(A)$ | $\det A=0$ says NOT unique, not "no solution". The certificate of inconsistency is a reduced row $0=c$ with $c\neq0$; equal ranks below $n$ means infinitely many solutions, never finitely many. |

### Traps that cost marks

- **Dropping the $1/a$ on the inverse sine.** $\mathcal{L}^{-1}\{\frac{1}{s^{2}+a^{2}}\}=\frac{\sin at}{a}$. With $a=3$ the term is $\frac{1}{3}\sin 3t$; writing $\sin 3t$ triples the amplitude. Same trap in reverse: $\frac{8}{s^{2}+4}\to 4\sin 2t$, not $8\sin 2t$.
- **Using $b^{2}$ as the sine numerator.** In $(s+a)^{2}+b^{2}$ the sine numerator is $b$. For $b=3$ it is $3$, so $F=\frac{s+2}{s^{2}+4s+20}$ with $a=2,b=4$ and $F=\frac{5}{s^{2}+4s+29}$ with $a=2,\omega=5$ are both correct expansions, while $s^{2}+29$ has silently dropped the cross term $4s$.
- **Treating a repeated pole as if it were simple.** For $(s+2)^{2}$ the coefficient of $\frac{1}{s+2}$ is $\frac{d}{ds}[(s+2)^{2}F(s)]$ at $s=-2$, not the value of the product. Reusing the top-order evaluation gives a signal that fails the one-line check $f(0^{+})=\lim_{s\to\infty}sF(s)$.
- **Skipping polynomial division on an improper transform.** If $\deg N\geq\deg D$ the answer must contain $\delta(t)$ (or a derivative of one). An answer with no impulse is wrong by inspection — and that impulse check is free.
- **Applying the final value theorem without its pole condition.** $F=\frac{1}{s^{2}+1}$ returns $0$, but $\sin t$ has no final value. Also compute $\lim_{s\to0}sF(s)$ and never $F(0)$: $F=\frac{10}{s(s+2)}$ gives $5$, while $F(0)=\infty$.
- **Dropping the $e^{-as}$ or delaying the function but not the step.** $\mathcal{L}\{g(t)u(t-a)\}=e^{-as}\mathcal{L}\{g(t+a)\}$. So $\mathcal{L}\{t^{2}u(t-2)\}=e^{-2s}(\frac{2}{s^{3}}+\frac{4}{s^{2}}+\frac{4}{s})$, not $e^{-2s}\frac{2}{s^{3}}$; and $e^{-as}$ has no poles, so it never sets the region of convergence.
- **The Fourier factor of 2.** $a_n$ and $b_n$ carry $\frac{2}{T}$; $a_0$ carries $\frac{1}{T}$. Then recall $A_n=\sqrt{a_n^{2}+b_n^{2}}=2\lvert c_n\rvert$: the two-sided spectrum splits each real harmonic between $+n$ and $-n$.
- **Omitting the $\frac{1}{2}$ in Parseval.** $P=a_0^{2}+\frac{1}{2}\sum(a_n^{2}+b_n^{2})$. Without the half, the $\pm1$ square wave comes out as mean square 2 instead of 1.
- **Evaluating a sine half-range series at an endpoint.** $S_{\sin}(0)=S_{\sin}(L)=0$ always, because $\sin n\pi=0$. The sine series of $x$ on $(0,L)$ sums to $0$ at $x=L$ even though $f(L)=L$; at a jump of the extension the series gives the average, e.g. $0.5$ for a $1\to0$ pulse.
- **Mixing the Fourier-transform $2\pi$ conventions.** With angular $\omega$ the $\frac{1}{2\pi}$ sits on the inverse and on Parseval. With hertz the pulse pair is $\tau\,\mathrm{sinc}(\pi f\tau)$ with nulls at $f=k/\tau$. Substituting $f$ into the angular table pushes every null out by $2\pi$.
- **Writing $\det(kA)=k\det A$, and extending Sarrus past 3x3.** Scaling $kA$ scales all $n$ rows, so the factor is $k^{n}$. Sarrus is a 3x3 coincidence; on a 4x4 it returns a number with no relation to the determinant. And a matrix full of nonzero entries can still be singular: $\begin{pmatrix}1&2\\2&4\end{pmatrix}$.
- **Reading eigenvalues off the diagonal of a non-triangular matrix.** $\begin{pmatrix}1&4\\2&3\end{pmatrix}$ has diagonal 1 and 3 but eigenvalues 5 and $-1$. The trace would pass; only $\det A=\prod\lambda_i$ exposes it. Use both checks, never one.
- **Swapping Cramer's numerators, or using Cramer when $\det A=0$.** $x$ takes $\det(A_1)$ with $\mathbf{b}$ in column 1. With $\det A=0$ the ratio is undefined: the system either has infinitely many solutions or none, and the augmented rank decides which.

### Rapid-fire recall

- [ ] **Q1.** $\mathcal{L}^{-1}\{\frac{5}{s^{2}+9}\}=$ ?
- [ ] **Q2.** $F(s)=\frac{1}{s^{2}+1}$. What does the final value theorem return, and what is the truth?
- [ ] **Q3.** $\mathcal{L}\{2\delta(t)+3\delta(t-4)\}=$ ?
- [ ] **Q4.** $\mathcal{L}\{t^{2}e^{-3t}\}=$ ?
- [ ] **Q5.** A $+1/-1$ square wave of period $2\pi$ in exponential form: $\lvert c_1\rvert=$ ?
- [ ] **Q6.** $a_n=3$, $b_n=-4$. Give $A_n$, $\phi_n$ and $c_n$.
- [ ] **Q7.** $M=\begin{pmatrix}1&2&3\\2&4&1\\k&1&3\end{pmatrix}$. For which $k$ is it singular?
- [ ] **Q8.** $N=\begin{pmatrix}1&2&3&4\\2&4&6&8\\1&0&1&2\end{pmatrix}$. $\mathrm{rank}(N)=$ ? Free variables?
- [ ] **Q9.** $M=\begin{pmatrix}2&1\\3&0\end{pmatrix}$. Eigenvalues and eigenvectors?
- [ ] **Q10.** A 3x3 $A$ has $\mathrm{tr}\,A=-3$ and $\det A=2$. Is a non-trivial $A\mathbf{x}=\mathbf{0}$ solution possible?

> [!success]- Answers
> **Q1.** $\frac{5}{3}\sin 3t$. $\omega=3$, so divide by $\omega$: $\frac{5}{3}\approx1.667$, not $5\sin 3t$.
> **Q2.** The theorem returns $0$; the function is $\sin t$, which never settles. The condition fails because $sF(s)=\frac{s}{s^{2}+1}$ has poles at $\pm j$ on the imaginary axis.
> **Q3.** $2+3e^{-4s}$, valid for all $s$. No $1/s$ terms: the impulse pair is $1$, and $e^{-as}$ is a delay factor with no pole.
> **Q4.** $\frac{2}{(s+3)^{3}}$. The $n!=2$ survives and every $s$ is replaced by $s+3$; $\frac{2}{s^{3}+27}$ is wrong.
> **Q5.** $\lvert c_1\rvert=\frac{2}{\pi}\approx0.6366$ with $c_{\pm1}=\mp\frac{j2}{\pi}$. The trigonometric value $b_1=4/\pi\approx1.2732$ is exactly twice as large.
> **Q6.** $A_2=\sqrt{9+16}=5$, $\phi_2=-\arctan(-4/3)=+53.13^{\circ}$, $c_2=\frac{1}{2}(3+j4)=1.5+j2$ and $c_{-2}=1.5-j2$.
> **Q7.** $k=\frac{1}{2}$ only. $\det M=5-10k$, so at $k=0$ the determinant is `5` and $M$ is invertible — one zero entry never makes a matrix singular.
> **Q8.** Rank 2 (row 2 is $2\times$row 1, leaving 2 pivots), so 2 free variables from $n-\mathrm{rank}=4-2$. Rank is the pivot count after reduction, not the row count.
> **Q9.** $\lambda=3$ with $(1,1)$ and $\lambda=-1$ with $(1,-3)$. Trace $2=3+(-1)$, determinant $-3=3(-1)$.
> **Q10.** Yes. $\det A=2\neq0$, so $A$ is invertible and $A\mathbf{x}=\mathbf{0}$ has only $\mathbf{x}=\mathbf{0}$; a non-trivial solution needs $\det A=0$. Trace says nothing about singularity.

### Drill — 5 minutes

**1.** Solve $y''+3y'+2y=0$ with $y(0)=1$, $y'(0)=0$, using Laplace transforms.
> [!success]- Solution
> Transforming with the initial conditions: $(s^{2}+3s+2)Y=s+3$, i.e. $Y=\frac{s+3}{(s+1)(s+2)}$. Residues: $A=\frac{s+3}{s+2}\big\rvert_{s=-1}=2$ and $B=\frac{s+3}{s+1}\big\rvert_{s=-2}=-1$, so $y(t)=2e^{-t}-e^{-2t}$.
> Check: $y(0)=2-1=1$ and $y'(0)=-2+2=0$, matching the data, and $\lim_{s\to\infty}sY(s)=1=y(0^{+})$.
> **Trap:** transforming $y''$ as $s^{2}Y$ alone and then fitting the initial conditions at the end, or inverting $\frac{1}{s+2}$ as $e^{+2t}$. The $s$-shift direction is the whole game: $e^{-2t}\leftrightarrow\frac{1}{s+2}$.

**2.** For $f(t)=1$ on $(0,\pi)$ and $-1$ on $(\pi,2\pi)$, period $2\pi$, find $b_1$, $b_3$ and $a_0$.
> [!success]- Solution
> The waveform is odd, so $a_0=0$ and every $a_n=0$ — state it, do not integrate. With $\omega_0=1$: $b_n=\frac{1}{\pi}\left[\int_0^{\pi}\sin nt\,dt-\int_{\pi}^{2\pi}\sin nt\,dt\right]=\frac{2(1-\cos n\pi)}{n\pi}$, and $\cos n\pi=(-1)^{n}$ gives $b_n=\frac{4}{n\pi}$ for odd $n$, zero for even $n$. Hence $b_1=\frac{4}{\pi}\approx1.2732$, $b_3=\frac{4}{3\pi}\approx0.4244$, $a_0=0$. The series is $f=\frac{4}{\pi}(\sin t+\frac{\sin 3t}{3}+\frac{\sin 5t}{5}+\cdots)$, converging to $0$ at each jump.
> **Trap:** including even harmonics because "the square wave has a rich spectrum". Half-wave symmetry kills every even $n$, so $b_2=0$ exactly; and reporting $\lvert c_1\rvert=\frac{4}{\pi}$ instead of $\frac{2}{\pi}$ doubles the exponential spectrum.

**3.** Solve $x+2y+z=1$, $3x-y+2z=2$, $2x+2y-z=11$.
> [!success]- Solution
> $\det A=19\neq0$, unique solution. Cramer: replace a column with $\mathbf{b}=(1,2,11)$.
> $\det A_1=60$, $\det A_2=12$, $\det A_3=-65$, so $x=\frac{60}{19}\approx3.158$, $y=\frac{12}{19}\approx0.632$, $z=-\frac{65}{19}\approx-3.421$.
> Check in equation 1: $\frac{60+24-65}{19}=\frac{19}{19}=1$; equation 3: $\frac{120+24+65}{19}=\frac{209}{19}=11$.
> **Trap:** putting $\mathbf{b}$ into the wrong column (that swaps $x$ and $z$ and still looks plausible), or running Cramer without checking $\det A$ first. If the determinant were zero, $x_i=\frac{\det A_i}{0}$ is undefined and any finite value produced is fabricated — the augmented rank decides between no solution and infinitely many.

### Calculator shortcuts (Canon F-789SGA, verified keys only)

- **Residues in one chained line (`ALPHA` `:`).** For $F=\frac{s+3}{(s+1)(s+2)}$ key `(X+3)÷(X+2)` at `X = -1` → **2**, then chain `ALPHA` `:` `(X+3)÷(X+1)` at `X = -2` → **-1**. So $f(t)=2e^{-t}-e^{-2t}$, and the check `2-1` → **1** equals $\lim_{s\to\infty}sF(s)$. The surviving-factor method cannot lose the sign of $s+2$.
- **Repeated-pole coefficient with `SHIFT` `d/dx`.** In $F=\frac{s+4}{s(s+2)^{2}}$ the top coefficient is `(X+4)÷X` at `X = -2` → **-1**, and the lower one is the derivative: `SHIFT` `d/dx` of `(X+4)÷X` at `X = -2` → **-1**. With `(X+4)÷(X+2)²` at `X = 0` → **1** the transform is $\frac{1}{s}-\frac{1}{s+2}-\frac{1}{(s+2)^{2}}$ and $f(t)=1-(1+t)e^{-2t}$.
- **Eigenvalues without expanding: `MODE` `5` page 2 `1`.** For $A=\begin{pmatrix}1&-4\\2&-5\end{pmatrix}$ key `1`, `4`, `3` from $\lambda^{2}+4\lambda+3$ gives $\lambda$ = **-1, -3**. Verify before trusting: `1-5` → **-4** is the trace and `1×(-5)-2×(-4)` → **3** is the determinant, so the roots must sum to $-4$ and multiply to `3` — they do.
- **Determinant, inverse, transpose: `MODE` `7` then `Apps` for `Det`/`Inv`/`Trn`/`Adj`.** The singularity question $\begin{pmatrix}1&2&3\\2&4&1\\k&1&3\end{pmatrix}$ is one line: `Apps` `Det` with $k=0.5$ → **0**, while $k=0$ → **5** (the trap value), so the only singular $k$ is $\frac{1}{2}$. `MatA × Inv(MatA)` → the identity confirms an adjugate inverse immediately.
- **3x3 systems and all three Cramer determinants: `MODE` `5` `2`.** Rows `(-1,0,1,0)`, `(0,3,2,5)`, `(2,1,-2,5)` give `x,y,z =` **-5, 5, -5** with no determinant at all — $z$ and $y$ come out positive, which is where the hand sign slips live. Missing terms must be entered as `0`; a shifted row changes $\det A=2$ and every root.
- **Fourier coefficients on the integral key.** `∫dx` `∫(sin X, 0, π)` → **2**, so $b_1=\frac{4}{\pi}$ → **1.2732**; `∫(sin 2X, 0, π)` → **0** proves the even harmonics really vanish. For $\sum_{n\ \mathrm{odd}}1/n^{2}$ use `Apps` `Σ`, which closes on $\frac{\pi^{2}}{8}=1.2337$.

---

## Block 5 — Electromagnetics (10 min)

**Topics:** [[05_Gauss_Law_and_Applications|Gauss's Law]] · [[09_Capacitance_from_Geometry|Capacitance]] · [[13_Ampere’s_Circuital_Law|Ampere's Law]] · [[12_Biot-Savart_Law|Biot-Savart]] · [[15_Inductance_from_Geometry_and_Materials|Inductance]] · [[17_Faraday’s_Law_and_Motional_EMF|Faraday]] · [[18_Maxwell’s_Equations_and_Displacement_Current|Maxwell]] · [[19_EM_Wave_Equations_and_Uniform_Plane_Waves|Plane Waves]] · [[20_Waves_in_Lossy_Media_and_Skin_Depth|Skin Depth]] · [[21_Reflection_and_Transmission_at_Boundaries|Reflection]] · [[22_Intrinsic_Impedance_and_Poynting_Vector|Poynting]] · [[02_Gradient,_Divergence,_Curl_and_Laplacian|Vector Operators]]

Constants as given on the board formula sheet: $\varepsilon_0 = 8.854\times10^{-12}\ \mathrm{F/m}$, $\mu_0 = 4\pi\times10^{-7}\ \mathrm{H/m}$, $c = 3\times10^{8}\ \mathrm{m/s}$, $\eta_0 = \sqrt{\mu_0/\varepsilon_0} = 376.73\ \Omega$ (exam-rounded to $377\ \Omega$; the shorthand moves answers by ~0.1%). Shortcuts worth memorising rather than deriving: $\mu_0/2\pi = 2\times10^{-7}$ **exactly**, $\mu_0/\pi = 4\times10^{-7}$ **exactly**, $4\pi\varepsilon_0 = 1.1126\times10^{-10}$, $1/4\pi\varepsilon_0 = 8.988\times10^{9}$, $\eta_0/4\pi = 30\ \Omega$.

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Gauss's law | $\oint_S\mathbf{D}\cdot d\mathbf{S}=Q_{\mathrm{enc}}=\int_V\rho_v\,dv$ | True for *any* closed surface, but $D=Q/4\pi r^2$ is only a *solution* under spherical symmetry. Finite line, disc, cube: integrate Coulomb instead. Only the enclosed charge counts — outside charges add zero net flux. |
| Spherical symmetry | $D=\dfrac{Q_{\mathrm{enc}}}{4\pi r^2}$, $E=\dfrac{Q_{\mathrm{enc}}}{4\pi\varepsilon r^2}$ | The $4\pi$ is the sphere's area. True outside *any* spherically symmetric distribution; off-centre charge keeps the flux but destroys the uniform-$D$ shortcut. |
| Cylindrical and planar symmetry | $D=\dfrac{\lambda}{2\pi\rho}$, $D=\dfrac{\sigma}{2}$ | Cylinder side area $2\pi\rho L$ gives the $2\pi$ and the $1/\rho$ falloff. The sheet has no distance dependence and keeps its $\tfrac{1}{2}$ because flux escapes *two* faces. |
| Conductor surface and inside-charge cases | $E_{\mathrm{just\ outside}}=\dfrac{\sigma}{\varepsilon_0}$; $E=\dfrac{\rho_vr}{3\varepsilon}=\dfrac{kQr}{a^3}\ (r\le a)$; $E=0\ (r<a,\ \mathrm{conductor})$ | Twice the free-sheet value, because $E=0$ inside sends all the flux out one face. Inside a charged *insulator* only $I\rho^2/a^2$-style enclosed fractions count — here $(r/a)^3$ of the charge, so $E\propto r$ and $E=0$ at the centre. |
| Capacitance definition and recipe | $C=\dfrac{Q}{V}$, $C=\varepsilon\dfrac{(\mathrm{area\ factor})}{(\mathrm{length\ factor})}$ | Depends only on geometry and $\varepsilon$ — never on $Q$ or $V$. $Q$ must cancel at the last step and $\varepsilon$ appears exactly once; if $Q$ survives, a step is wrong. |
| Parallel plate | $C=\dfrac{\varepsilon A}{d}$ | $d$ in **metres** ($0.1$ mm $=10^{-4}$ m), $A$ in m². Fringing ignored; layered gap: $C=A/\sum_i(d_i/\varepsilon_i)$ — layers are in *series*. |
| Coaxial | $C=\dfrac{2\pi\varepsilon L}{\ln(b/a)}$, $\dfrac{C}{L}=\dfrac{2\pi\varepsilon}{\ln(b/a)}$ | Only the ratio $b/a$ enters, so diameters work. The logarithm is the fingerprint of a $1/\rho$ field. $E$ is largest at $\rho=a$: $E_{\max}=V/(a\ln(b/a))$, so breakdown starts at the inner conductor. |
| Spherical and two-wire | $C=\dfrac{4\pi\varepsilon ab}{b-a}$, $C=4\pi\varepsilon a$, $\dfrac{C}{L}=\dfrac{\pi\varepsilon}{\ln(D/a)}$ | Spherical uses **radii**; the $(b-a)$ comes from integrating $1/r^2$ and the $4\pi$ from the area, so neither can be dropped. Two-wire has $\pi$, not $2\pi$. |
| Combinations, dielectric, energy | $\frac{1}{C_{\mathrm{ser}}}=\sum\frac{1}{C_i}$, $C_{\mathrm{par}}=\sum C_i$, $C=\varepsilon_rC_0$, $W=\tfrac{1}{2}CV^2=\tfrac{1}{2}Q^2/C=\tfrac{1}{2}QV$, $u=\tfrac{1}{2}\varepsilon E^2$ | Series equivalent is smaller than the smallest member; parallel larger than the largest. In series the *smaller* capacitor takes the *larger* voltage. One half, in every equivalent form. |
| Plate force | $F=\dfrac{\varepsilon AV^2}{2d^2}=\dfrac{Q^2}{2\varepsilon A}$ | Always attractive. $F=QE_{\mathrm{gap}}$ with the full $E=V/d$ doubles it: a plate feels only the other plate's $E/2=\sigma/2\varepsilon_0$. |
| Inductance definition and solenoid | $L=\dfrac{N\Phi_B}{i}=\dfrac{\lambda}{i}$, $L=\dfrac{\mu N^2A}{l}$, $\dfrac{L}{l}=\mu n^2A$ | $N^2$, not $N$: $N$ turns make $N\Phi$ and every turn links it. $A$ in cm² needs $\times10^{-4}$. $n=N/l$ in turns per metre. $B=\mu Ni/l$ inside. |
| Toroid and coaxial inductance | $L=\dfrac{\mu N^2h}{2\pi}\ln\dfrac{b}{a}$, $L=\dfrac{\mu l}{2\pi}\ln\dfrac{b}{a}$ | Both are $1/\rho$ fields, so both carry a logarithm: using $b-a$ returns 0.80 mH where the toroid answer is 32.4 mH. The coax value neglects flux inside the inner conductor (which would add $\mu/8\pi$ per metre). |
| Two-wire inductance and energy | $L=\dfrac{\mu l}{\pi}\ln\dfrac{D}{a}$, $W=\tfrac{1}{2}Li^2$, $w=\dfrac{B^2}{2\mu}$, $v=L\dfrac{di}{dt}$, $\tau=\dfrac{L}{R}$ | The two-wire denominator is $\pi$ because *both* conductors contribute $\mu/2\pi\ln$ terms. Using $2\pi$ halves the answer: 2.12 → 1.06 $\mu$H/m. |
| Magnetic energy, coupling and gap force | $M=k\sqrt{L_1L_2}$, $L_{\mathrm{ser}}=L_1+L_2\pm2M$, $F=\dfrac{B^2A}{2\mu_0}$ | Combinations are resistor-like *only* if uncoupled. The gap force contains no $g$: the gap sets the current needed for that $B$, not the force at that $B$. |
| Ampere's circuital law | $\oint\mathbf{H}\cdot d\mathbf{l}=I_{\mathrm{enc}}$, $\nabla\times\mathbf{H}=\mathbf{J}$ | Usable only where $\lvert\mathbf{H}\rvert$ is constant and tangential on the path: infinite line, infinite sheet, ideal solenoid, ideal toroid. It is an $\mathbf{H}$-law, so $\mu_r$ scales $B$ only. |
| Ampere's standard results | $H=\dfrac{I}{2\pi\rho}$; $H=\dfrac{I\rho}{2\pi a^2}\ (\rho<a)$; $H=\dfrac{K}{2}$; $H=nI$; $H=\dfrac{NI}{2\pi\rho}$ | Inside a conductor only $I\rho^2/a^2$ is enclosed; the two expressions must agree at $\rho=a$ — that is the check. Coax shield region: $H=I(c^2-\rho^2)/2\pi\rho(c^2-b^2)$, zero at $\rho=c$ and reversed partway through; $H=0$ outside. |
| Biot-Savart | $d\mathbf{B}=\dfrac{\mu_0}{4\pi}\dfrac{I\,d\mathbf{l}\times\mathbf{a}_R}{R^2}$, $dB=\dfrac{\mu_0I\,dl\sin\theta}{4\pi R^2}$ | $R$ is element-to-point, not from the origin. Parallel segments contribute zero. Superpose *components*; never add magnitudes of non-parallel parts. |
| Biot-Savart integrated results | $B=\dfrac{\mu_0I}{2\pi\rho}$; $B=\dfrac{\mu_0I}{4\pi\rho}(\sin\theta_1+\sin\theta_2)$; $B=\dfrac{\mu_0I}{2a}$; $B=\dfrac{\mu_0Ia^2}{2(a^2+z^2)^{3/2}}$; $\dfrac{F}{L}=\dfrac{\mu_0I_1I_2}{2\pi d}$ | Radius, not diameter, in the loop formulas. Keep the $3/2$ power: dropping it gives 1.57 $\mu$T against 55.5 $\mu$T at $z=a$. Infinite-wire limit is $\theta_1=\theta_2=90^\circ$. Same-direction parallel currents **attract**. |
| Faraday's law and motional emf | $\mathcal{E}=-\dfrac{d\lambda}{dt}=-N\dfrac{d\Phi_B}{dt}$, $\nabla\times\mathbf{E}=-\dfrac{\partial\mathbf{B}}{\partial t}$, $\mathcal{E}=Blv$, $\mathcal{E}_2=M\dfrac{di_1}{dt}$ | The minus sign is Lenz: oppose the *change*, not the field. $Blv$ needs $B$, $l$, $v$ mutually perpendicular and a closed circuit (an open rod still shows the potential difference, but no current, drag or power). |
| Generator and rotating loop | $\Phi_B=BA\cos\omega t$, $\mathcal{E}=NBA\omega\sin\omega t$, $\mathcal{E}_{peak}=NBA\omega$, $P_t=1-\lvert\Gamma\rvert^2$ | Peak emf when the coil plane is *parallel* to $\mathbf{B}$ (flux zero, rate maximum). $\omega$ in rad/s; $f=\omega/2\pi$; rms $=$ peak/$\sqrt{2}$. |
| Maxwell's equations | $\nabla\cdot\mathbf{D}=\rho_v$; $\nabla\cdot\mathbf{B}=0$; $\nabla\times\mathbf{E}=-\dfrac{\partial\mathbf{B}}{\partial t}$; $\nabla\times\mathbf{H}=\mathbf{J}+\dfrac{\partial\mathbf{D}}{\partial t}$ | Displacement current $\mathbf{J}_d=\partial\mathbf{D}/\partial t$ is a changing field in A/m², not charge flow, and exists in vacuum. It is what makes Ampere's law independent of which surface you stretch over the loop, and it yields the continuity equation $\nabla\cdot\mathbf{J}+\partial\rho_v/\partial t=0$. |
| Lossless wave parameters | $v=\dfrac{1}{\sqrt{\mu\varepsilon}}=\dfrac{c}{\sqrt{\mu_r\varepsilon_r}}$, $\beta=\omega\sqrt{\mu\varepsilon}=\dfrac{2\pi}{\lambda}$, $\lambda=\dfrac{v_p}{f}$, $n=\sqrt{\varepsilon_r\mu_r}$ | $\beta z$ must enter a cosine in **radians**. The source fixes $f$ across a boundary, never $\lambda$ or $\beta$: 100 MHz is 3 m in air but 1.5 m in $\varepsilon_r=4$. |
| Intrinsic impedance | $\eta=\sqrt{\dfrac{\mu}{\varepsilon}}=\dfrac{E_0}{H_0}$, $\eta_0=120\pi=377\ \Omega$, $\eta=\dfrac{377}{\sqrt{\varepsilon_r\mu_r}}$ | A medium property, independent of amplitude and frequency. Divide by $\sqrt{\varepsilon_r}$, never multiply: $\varepsilon_r=4$ gives 188.5 $\Omega$, not 94.2 or 1508. Denser medium $\Rightarrow$ lower $\eta$, larger $H_0$ for the same $E_0$. |
| Poynting vector and power | $\mathbf{S}=\mathbf{E}\times\mathbf{H}$, $\langle\mathbf{S}\rangle=\tfrac{1}{2}\mathrm{Re}(\mathbf{E}\times\mathbf{H}^{*})$, $\langle S\rangle=\dfrac{E_0^2}{2\eta}=\dfrac{E_0H_0}{2}=\dfrac{E_{\mathrm{rms}}^2}{\eta}$, $P=\oint\langle\mathbf{S}\rangle\cdot d\mathbf{A}$ | $\mathbf{H}=\frac{1}{\eta}\mathbf{a}_k\times\mathbf{E}$; getting $\mathbf{H}$ parallel to $\mathbf{E}$ gives zero power. The $\tfrac{1}{2}$ belongs to **peak** amplitudes; with rms drop it — mixing conventions costs exactly 2. Tilted aperture: $P=\langle S\rangle A\cos\theta$. |
| Radiation pressure and momentum | $p=\dfrac{\langle S\rangle}{c}$ (absorbed), $p=\dfrac{2\langle S\rangle}{c}$ (perfect reflector) | The factor 2 is reversed momentum, so it belongs to a mirror only. Multiply by area for force. Sunlight at 1.36 kW/m² gives 4.5 $\mu$Pa. |
| Loss tangent and classification | $\tan\delta=\dfrac{\sigma}{\omega\varepsilon}$ | $\tan\delta\gg1$ good conductor; $\ll1$ low-loss dielectric; of order 1 quasi-conductor (exact formulas only). Frequency-dependent: seawater ($\sigma=4$ S/m, $\varepsilon_r=81$) is a good conductor at 1 MHz ($\tan\delta=888$) and low-loss in the visible. |
| Skin depth and conductor constants | $\gamma=\alpha+j\beta=\sqrt{j\omega\mu(\sigma+j\omega\varepsilon)}$, $\alpha=\beta=\sqrt{\pi f\mu\sigma}$, $\delta_s=\dfrac{1}{\alpha}=\dfrac{1}{\sqrt{\pi f\mu\sigma}}$, $R_s=\dfrac{1}{\sigma\delta_s}=\sqrt{\dfrac{\pi f\mu}{\sigma}}$, $\dfrac{R_{\mathrm{ac}}}{R_{\mathrm{dc}}}\approx\dfrac{a}{2\delta}$ | $\delta_s$ is a $1/e$ **depth**, not a wavelength: inside a good conductor $\lambda=2\pi\delta_s$ (copper at 1 MHz: 415 $\mu$m against 66.1 $\mu$m). $\delta_s\propto1/\sqrt{f}$ but $R_s\propto\sqrt{f}$. Keeping $\mu_0$ is mandatory: $\delta_s=1/\sqrt{\pi f\sigma}$ gives 74 nm instead of 66 $\mu$m. |
| Conductor and low-loss impedance | $v_p=\dfrac{\omega}{\beta}=\sqrt{\dfrac{4\pi f}{\mu\sigma}}$ (conductor); $\eta=(1+j)\sqrt{\dfrac{\omega\mu}{2\sigma}}=(1+j)R_s$; $\alpha\approx\dfrac{\sigma}{2}\sqrt{\dfrac{\mu}{\varepsilon}}$ (low-loss) | In a conductor $v_p$ has nothing to do with $1/\sqrt{\mu\varepsilon}$: copper at 1 MHz is 415 m/s. $\lvert\eta\rvert=\sqrt{2}R_s$ at exactly $45^\circ$. Nepers to dB: $\alpha_{\mathrm{dB}}=8.686\,\alpha_{\mathrm{Np}}$ (amplitude, i.e. $20\log_{10}e$), never 4.343. |
| Reflection at normal incidence | $\Gamma=\dfrac{\eta_2-\eta_1}{\eta_2+\eta_1}$, $\tau=1+\Gamma=\dfrac{2\eta_2}{\eta_1+\eta_2}$, $\Gamma_H=-\Gamma_E$ | $\Gamma<0$ entering a denser medium ($\eta_2<\eta_1$): the reflected $E$ is inverted. Perfect conductor: $\Gamma=-1$. Matching needs $\eta_2=\eta_1$ only. |
| Power split and standing waves | $\dfrac{P_t}{P_i}=1-\lvert\Gamma\rvert^{2}$, $s=\dfrac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$, $\lvert\Gamma\rvert=\dfrac{s-1}{s+1}$ | Transmitted power is **not** $\lvert\tau\rvert^2$: the exact identity is $\lvert\Gamma\rvert^2+\frac{\eta_1}{\eta_2}\lvert\tau\rvert^2=1$, and the two fractions must add to 1. SWR is a field ratio carrying no phase, bounded below by 1 — an answer under 1 is impossible. |
| Oblique incidence | $n_1\sin\theta_i=n_2\sin\theta_t$, $\tan\theta_B=\dfrac{n_2}{n_1}$, $\sin\theta_c=\dfrac{n_2}{n_1}\ (n_1>n_2)$, $\Gamma_{\perp}=\dfrac{\eta_2\cos\theta_i-\eta_1\cos\theta_t}{\eta_2\cos\theta_i+\eta_1\cos\theta_t}$ | Angles from the normal. Brewster kills only the parallel (TM) component — whose cosines are interchanged, $\eta_2\cos\theta_t-\eta_1\cos\theta_i$. TIR needs denser-to-rarer; air into glass has no critical angle. |
| Quarter-wave matching layer | $\eta_s=\sqrt{\eta_1\eta_3}$, $\varepsilon_{rs}=(377/\eta_s)^2$, $d=\dfrac{\lambda_s}{4}$, $\lambda_s=\dfrac{\lambda_0}{\sqrt{\varepsilon_{rs}}}$ | Thickness is measured **inside** the slab: 17.7 mm, not $\lambda_0/4=25$ mm. Exact only at the design frequency and its odd multiples. |
| Vector operators (Cartesian) | $\nabla V$; $\nabla\cdot\mathbf{A}=\dfrac{\partial A_x}{\partial x}+\dfrac{\partial A_y}{\partial y}+\dfrac{\partial A_z}{\partial z}$; $\nabla\times\mathbf{A}$; $\nabla^2V$ | Gradient: scalar → vector, points up the steepest ascent, $\mathbf{E}=-\nabla V$. Divergence: vector → scalar, net outflow per volume, $\nabla\cdot\mathbf{D}=\rho_v$ (a source) against $\nabla\cdot\mathbf{B}=0$ (none). |
| Vector operators (curvilinear) | $\nabla\cdot\mathbf{A}=\dfrac{1}{\rho}\dfrac{\partial(\rho A_\rho)}{\partial\rho}+\ldots$; $\nabla\cdot\mathbf{A}=\dfrac{1}{r^2}\dfrac{\partial(r^2A_r)}{\partial r}+\ldots$ | The $\rho$ or $r^2$ sits *inside* the derivative — that is what makes $A_\rho=c/\rho$ and $A_r=c/r^2$ divergence-free. Omitting it is the standard operator error. |
| Two vanishing identities | $\nabla\times(\nabla V)=0$, $\nabla\cdot(\nabla\times\mathbf{A})=0$ | A gradient is irrotational (a potential exists for any conservative field); a curl is solenoidal (so $\mathbf{B}=\nabla\times\mathbf{A}$). Also $\nabla\times(\nabla\times\mathbf{E})=\nabla(\nabla\cdot\mathbf{E})-\nabla^2\mathbf{E}$ is what turns Maxwell into the wave equation. |

### Geometry cheat-sheet (memorise the shape, not the symbols)

| Geometry | Capacitance | Inductance |
| --- | --- | --- |
| Parallel plate, area $A$, gap $d$ | $C=\varepsilon A/d$ | — |
| Coaxial, radii $a<b$, length $l$ | $C=\dfrac{2\pi\varepsilon l}{\ln(b/a)}$ | $L=\dfrac{\mu l}{2\pi}\ln\dfrac{b}{a}$ |
| Two-wire, radius $a$, spacing $D$ | $\dfrac{C}{l}=\dfrac{\pi\varepsilon}{\ln(D/a)}$ | $\dfrac{L}{l}=\dfrac{\mu}{\pi}\ln\dfrac{D}{a}$ |
| Sphere / spherical shell | $C=4\pi\varepsilon a$; $C=\dfrac{4\pi\varepsilon ab}{b-a}$ | — |
| Solenoid, $N$ turns, length $l$, area $A$ | — | $L=\dfrac{\mu N^2A}{l}$ |
| Toroid, height $h$, $a<b$ | — | $L=\dfrac{\mu N^2h}{2\pi}\ln\dfrac{b}{a}$ |

Everything in this table is the same recipe: place $\pm Q$ (or drive $i$), get $D$ (or $B$) from the symmetry, integrate to $V$ (or $\Phi$), divide. The $2\pi$ versus $\pi$ and the $\ln$ versus linear width are the only things that differ — and they are exactly what the exam tests.

### Traps that cost marks

- **Radius versus diameter.** $\sigma=Q/4\pi a^2$ raises it to the fourth power if you use the diameter, $C=4\pi\varepsilon a$ and $C=4\pi\varepsilon ab/(b-a)$ and $B=\mu_0I/2a$ all use the **radius**. Coax and toroid ratios are the only immune cases.
- **Forgetting the $\tfrac{1}{2}$ for a free sheet, adding it for a conductor.** Free sheet $E=\sigma/2\varepsilon_0$; conductor surface $E=\sigma/\varepsilon_0$. Same for the current sheet $H=K/2$ versus $H=K$.
- **$E=0$ inside a conductor, $E\propto r$ inside charged insulation.** Using $kQ/r^2$ at $r=2$ cm in a 3 cm insulating sphere gives 2541 V/m instead of 753 V/m — 3.4x, because the enclosed charge is only $(r/a)^3=8/27$ of the total.
- **Unit slips: mm, cm², nC.** $d=0.1$ mm is $10^{-4}$ m ($C$ becomes 1.77 $\mu$F instead of 1.77 nF); $4\ \mathrm{cm^2}$ is $4\times10^{-4}\ \mathrm{m^2}$; $\lambda=30$ nC/m and $\rho=5$ mm must both convert or the field shifts by $10^{3}$–$10^{6}$.
- **Dividing by $\varepsilon_r$ instead of $\sqrt{\varepsilon_r}$.** $\eta=377/\sqrt{\varepsilon_r}=188.5\ \Omega$ (not 94.2) for $\varepsilon_r=4$; $v_p=c/\sqrt{\varepsilon_r}=1.5\times10^{8}$ m/s and $\lambda=1.5$ m (not 0.75). $\varepsilon_r$ enters $C$ linearly but $\eta$ and $v_p$ as a square root.
- **Dropping the $\tfrac{1}{2}$ in $\langle S\rangle$.** $E_0^2/2\eta=13.27\ \mathrm{W/m^2}$ for 100 V/m in air; forgetting it doubles to 26.5. With rms amplitudes the $\tfrac{1}{2}$ must be absent — mixing conventions costs exactly 2. Peak instantaneous $S$ is twice the average.
- **Using $\lvert\tau\rvert^2$ as the transmitted power.** Air into $\varepsilon_r=4$: $\Gamma=-1/3$, $\tau=2/3$, so 11.1% reflects and 88.9% transmits — not $\lvert\tau\rvert^2=44.4\%$. The fractions must add to 1; $1/9+4/9$ does not.
- **Degrees into $\cos(\omega t-\beta z)$.** $\beta=20.94$ rad/m at 1 GHz, so $z=3$ m is $\beta z=20\pi$ and $\cos=1$. Keying the phase in degrees returns 26.46 mA/m instead of 26.53 mA/m from a formula that looks right — and a phase-shift question answered with $\delta_s$ instead of $2\pi\delta_s$ is wrong by $2\pi$.
- **Mixing the two transmission-line geometries.** Coax uses $\mu/2\pi$; two-wire uses $\mu/\pi$ because both conductors contribute, so using $2\pi$ halves the answer (2.12 → 1.06 $\mu$H/m). The capacitance pair is $\pi\varepsilon$ (two-wire) against $2\pi\varepsilon$ (coax).
- **$N$ versus $N^2$, and $n=N/l$.** $L\propto N^2$; $H=nI$ needs turns **per metre**. A 1000-turn coil over 2 m has $n=500$, so entering 1000 doubles $H$; a 600-turn, 30 cm coil has $n=2000$ per metre and entering 600 makes $B$ 3.3x too small.
- **Using the good-conductor shortcut at moderate loss.** It needs $\tan\delta\gg1$: at $\tan\delta=0.016$ it returns 0.281 Np/m where the low-loss result is 0.0251 Np/m — 11x. At $\tan\delta=1$ the exact coefficients are $0.455\,\omega\sqrt{\mu\varepsilon}$ and $1.099\,\omega\sqrt{\mu\varepsilon}$ against the shortcut's 0.707.
- **Scaling $\delta_s$ and $R_s$ together.** $\delta_s\propto1/\sqrt{f}$ but $R_s\propto\sqrt{f}$: 1 MHz → 100 MHz shrinks $\delta_s$ by 10 (66.1 → 6.61 $\mu$m) and grows $R_s$ by only 10 (0.261 → 2.61 m$\Omega$ per square). Reporting $R_s$ 100x larger overstates the loss by 10.
- **Mixing up the boundary conditions.** Tangential $\mathbf{E}$ and normal $\mathbf{B}$ are *always* continuous; normal $\mathbf{D}$ jumps by $\rho_s$ and tangential $\mathbf{H}$ by $K$. Swapping $\mathbf{D}$ for $\mathbf{E}$ costs a factor $\varepsilon_r$.
- **Applying a formula outside its symmetry or regime.** Gauss's law on a finite line, Ampere's law on a finite wire, $Blv$ on a stationary transformer winding, or $1/\sqrt{\mu\varepsilon}$ inside metal are all "right law, wrong case" errors — and they are the ones that look most innocent on paper.
- **Confusing flux with flux linkage.** $\Phi_B$ is the flux through one turn; $\lambda=N\Phi_B$ is the linkage, and $L=\lambda/i$ uses the linkage. Reporting $\Phi_B$ where $\lambda$ is asked understates by $N$.

### Rapid-fire recall

- [ ] **Q1.** State $\eta_0$, $\mu_0$, $\varepsilon_0$ to board precision, plus the $\mu_0/2\pi$ shortcut.
- [ ] **Q2.** Air-filled $A=0.02\ \mathrm{m^2}$, $d=0.1$ mm: find $C$ and the charge at 100 V.
- [ ] **Q3.** Coaxial cable, $a=0.5$ mm, $b=5$ mm, $\varepsilon_r=3$: find $C$ per metre.
- [ ] **Q4.** $E$ at 1 cm inside a solid copper conductor of radius 2 cm.
- [ ] **Q5.** 4000 turns per metre carrying 0.5 A in air: find $H$ and $B$.
- [ ] **Q6.** Brewster angle for air into glass, $n=1.5$.
- [ ] **Q7.** A wave has $H_0=2.65$ mA/m in air: find $E_0$ and $\langle S\rangle$.
- [ ] **Q8.** A closed surface of area $0.4\ \mathrm{m^2}$ carries $D=2.5\times10^{-4}\ \mathrm{C/m^2}$ outward on **each** face: find $Q_{\mathrm{enc}}$. Then one face only.
- [ ] **Q9.** Lossless dielectric, $\varepsilon_r=2.25$: find $v_p$, $\eta$, $\lambda$ at 300 MHz.
- [ ] **Q10.** $\Gamma$ and $s$ for air normally onto $\varepsilon_r=4$.
- [ ] **Q11.** $\partial D/\partial t=2.5\times10^{-4}\ \mathrm{C/(m^2\,s)}$ through $0.4\ \mathrm{m^2}$: find $I_d$.
- [ ] **Q12.** $E_0=300\ \mathrm{V/m}$ in air at 1 GHz: find $H_0$, $\langle S\rangle$, and $S$ at $\cos(\omega t-\beta z)=1$.
- [ ] **Q13.** Copper, $\sigma=5.8\times10^{7}$ S/m: find $\delta_s$ and $\alpha$ at 1 MHz and at 100 MHz.
- [ ] **Q14.** $10\ \mu$C on an isolated sphere of radius 5 cm in air: find $C$, $V$ and $E$ just outside.
- [ ] **Q15.** A solenoid of 800 turns, length 0.4 m, cross-section $5\ \mathrm{cm^2}$, air core: find $L$.
- [ ] **Q16.** Three skin depths into copper: attenuation in nepers and dB, and the remaining amplitude.
- [ ] **Q17.** A 3 GHz wave in air needs a quarter-wave match into $\varepsilon_r=9$: find the layer's $\eta_s$, $\varepsilon_{rs}$ and thickness.
- [ ] **Q18.** What does $\mathbf{H}=\frac{1}{\eta}\mathbf{a}_k\times\mathbf{E}$ give for a $+\mathbf{a}_z$ wave with $\mathbf{E}=E_0\mathbf{a}_x$, and why does the cross product matter?
- [ ] **Q19.** Name the condition for zero reflection, and the Brewster condition in words.
- [ ] **Q20.** Write the four Maxwell equations and state which physics each governs.

> [!success]- Answers
> **Q1.** $\eta_0=\sqrt{\mu_0/\varepsilon_0}=120\pi=377\ \Omega$ (exact 376.73); $\mu_0=4\pi\times10^{-7}\ \mathrm{H/m}$; $\varepsilon_0=8.854\times10^{-12}\ \mathrm{F/m}$; $\mu_0/2\pi=2\times10^{-7}$ **exactly**.
> **Q2.** $C=\varepsilon_0A/d=(8.854\times10^{-12})(0.02)/(10^{-4})=1.77\times10^{-9}=1.77$ nF; $Q=CV=(1.7708\times10^{-9})(100)=1.77\times10^{-7}=177$ nC. Trap: $d=0.1$ mm is $10^{-4}$ m, not 0.1.
> **Q3.** $C/L=2\pi\varepsilon_0\varepsilon_r/\ln(b/a)=2\pi(3)(8.854\times10^{-12})/\ln 10=1.6693\times10^{-10}/2.302585=72.5$ pF/m. Trap: only $b/a=10$ enters, and any consistent unit gives the same number.
> **Q4.** $E=0$. In electrostatic equilibrium all excess charge sits on the surface, so a Gaussian surface at 1 cm encloses nothing. Trap: $kQ/r^2$ returns a plausible nonzero field here.
> **Q5.** $H=nI=4000(0.5)=2000$ A/m; $B=\mu_0H=(4\pi\times10^{-7})(2000)=2.51$ mT. Trap: treating $\mu_r=1$ as $\mu=1$ H/m gives kiloteslas.
> **Q6.** $\tan\theta_B=n_2/n_1=1.5$, so $\theta_B=56.31^\circ$; the refracted angle there is $33.69^\circ$ and the pair sums to exactly $90^\circ$. Trap: $\arctan(n_1/n_2)=33.7^\circ$ is the refracted angle, not the Brewster angle.
> **Q7.** $E_0=\eta_0H_0=376.73(2.65\times10^{-3})=0.9983$ V/m (377 gives 1.00 V/m); $\langle S\rangle=E_0H_0/2=(1.00)(2.65\times10^{-3})/2=1.32$ mW/m². Trap: the missing $\tfrac{1}{2}$ doubles it.
> **Q8.** $Q=D(2A)=2.5\times10^{-4}(0.8)=2.0\times10^{-4}$ C $=200\ \mu$C (a pillbox has two faces, so the effective area is $2A$). One face: $100\ \mu$C. Trap: writing $D=\sigma$ and forgetting the factor 2.
> **Q9.** $v_p=c/\sqrt{2.25}=2.0\times10^{8}$ m/s; $\eta=377/1.5=251.3\ \Omega$; $\lambda=v_p/f=2.0\times10^{8}/3\times10^{8}=0.667$ m; $\beta=2\pi/\lambda=9.42$ rad/m. Trap: $377/2.25=167.6\ \Omega$ instead of dividing by the square root.
> **Q10.** $\eta_2=377/2=188.5\ \Omega$; $\Gamma=(188.5-377)/(188.5+377)=-1/3$; $s=(1+1/3)/(1-1/3)=2.00$; 11.1% of the power reflects. Trap: $s=2$ is not 50% reflected — SWR is a field ratio.
> **Q11.** $J_d=\partial D/\partial t=2.5\times10^{-4}$ A/m², so $I_d=J_dA=(2.5\times10^{-4})(0.4)=1.0\times10^{-4}$ A $=100\ \mu$A. Trap: C/(m²·s) and A/m² are the same unit; multiplying by $A$ twice reports 40 $\mu$A.
> **Q12.** $H_0=E_0/\eta_0=300/376.73=0.7963$ A/m; $\langle S\rangle=E_0^2/2\eta_0=90000/753.46=119.4\ \mathrm{W/m^2}$; at $\cos=1$ the instantaneous value is $E_0^2/\eta_0=238.9\ \mathrm{W/m^2}$ — twice the average. Trap: that factor of 2 between peak and mean.
> **Q13.** At 1 MHz: $\pi f\mu_0\sigma=2.2897\times10^{8}$, $\delta_s=1/\sqrt{2.2897\times10^{8}}=66.1\ \mu$m, $\alpha=1/\delta_s=1.51\times10^{4}$ Np/m. At 100 MHz ($\times100$): $\delta_s=6.61\ \mu$m and $\alpha=1.51\times10^{5}$ Np/m. Trap: $\delta_s$ shrinks 10x while $R_s$ grows only 10x, not 100x.
> **Q14.** $C=4\pi\varepsilon_0a=1.1126\times10^{-10}(0.05)=5.563\times10^{-12}=5.56$ pF; $V=Q/C=10\times10^{-6}/5.563\times10^{-12}=1.798\times10^{6}$ V; $E=Q/4\pi\varepsilon_0a^2=(10\times10^{-6})/(4\pi\varepsilon_0)(0.05^2)=7.19\times10^{6}$ V/m. Trap: $4\pi a^2$ instead of $4\pi a$ inflates $C$ by $a$.
> **Q15.** $L=\mu_0N^2A/l=(4\pi\times10^{-7})(640000)(5\times10^{-4})/0.4=0.80425\times10^{-3}=0.804$ mH. Trap: $5\ \mathrm{cm^2}=5\times10^{-4}\ \mathrm{m^2}$; keying 5 gives 8.04 H.
> **Q16.** At 1 MHz $\delta_s=66.1\ \mu$m, so $3\delta_s$ is $\alpha z=3.000$ Np exactly; $3(8.686)=26.06$ dB; remaining amplitude $e^{-3}=0.0498$, i.e. 4.98%. Trap: 4.343 dB/Np gives 13.0 dB, and "3 Np = 3 dB" is off by 8.7.
> **Q17.** $\eta_3=377/3=125.67\ \Omega$; $\eta_s=\sqrt{(377)(125.67)}=217.66\ \Omega$; $\varepsilon_{rs}=(377/217.66)^2=3.00$; $\lambda_0=0.12$ m, $\lambda_s=0.12/\sqrt{3}=0.06928$ m, $d=17.32$ mm. Trap: $\lambda_0/4=30$ mm is not a quarter wave inside the layer.
> **Q18.** $\mathbf{H}=(E_0/\eta)\mathbf{a}_y$, because $\mathbf{a}_z\times\mathbf{a}_x=\mathbf{a}_y$. The cross product guarantees $\mathbf{E}\times\mathbf{H}$ points along $+\mathbf{a}_z$; putting $\mathbf{H}$ along $\mathbf{a}_x$ makes $\mathbf{E}\times\mathbf{H}=0$ and predicts a wave that carries no power.
> **Q19.** Zero reflection needs equal intrinsic impedances, $\eta_2=\eta_1$ (so $\varepsilon_{r2}=\varepsilon_{r1}$ in non-magnetic media). Brewster: the reflected and refracted rays are perpendicular, $\theta_i+\theta_t=90^\circ$, i.e. $\tan\theta_B=n_2/n_1$, and then only the parallel (TM) component vanishes.
> **Q20.** $\nabla\cdot\mathbf{D}=\rho_v$ (free charge is the source of $\mathbf{D}$); $\nabla\cdot\mathbf{B}=0$ (no magnetic monopoles, flux lines close); $\nabla\times\mathbf{E}=-\partial\mathbf{B}/\partial t$ (a changing $\mathbf{B}$ drives a circulating $\mathbf{E}$ — transformers, generators); $\nabla\times\mathbf{H}=\mathbf{J}+\partial\mathbf{D}/\partial t$ (conduction current *and* changing electric flux drive a circulating $\mathbf{H}$ — Maxwell's addition).

### Drill — 5 minutes

**1.** A sphere of radius $a=3$ cm carries a uniform volume charge density $\rho_v=1.0\ \mu\mathrm{C/m^3}$. Find $E$ at $r=2$ cm, at the surface, and the flux density $D$ at $r=2$ cm.
> [!success]- Solution
> Inside a uniformly charged insulator only the charge within $r$ is enclosed, and Gauss's law gives $E=\rho_vr/3\varepsilon_0$ — linear in $r$, zero at the centre:
> $E(2\ \mathrm{cm})=(10^{-6})(0.02)/(3\times8.854\times10^{-12})=7.5296\times10^{-8}/2.6562\times10^{-11}=753$ V/m.
> Cross-check by the $kQ$ route: $Q=\tfrac{4}{3}\pi a^3\rho_v=\tfrac{4}{3}\pi(2.7\times10^{-5})(10^{-6})=1.131\times10^{-10}$ C, so $kQ=(8.988\times10^{9})(1.131\times10^{-10})=1.0165$ and $E=kQr/a^3=1.0165(0.02)/(0.03)^3=753$ V/m. Identical — this is the check to run.
> Surface: $E=\rho_va/3\varepsilon_0=(10^{-6})(0.03)/2.6562\times10^{-11}=1129$ V/m, and $753/1129=0.6667$ is exactly $r/a$ — the ratio test that catches a wrong exponent.
> $D=\varepsilon_0E=(8.854\times10^{-12})(753)=6.67\times10^{-9}=6.67\ \mathrm{nC/m^2}$.
> **Discriminator:** the enclosed fraction is $(r/a)^3=8/27=0.296$ for charge but $r/a=0.667$ for the field — the two must not be used interchangeably. Applying $kQ/r^2$ with the **full** $Q$ at $r=2$ cm gives 2541 V/m, 3.4x too large. At $r=0$ the answer is 0, not a division by zero.
> **Calc** (`MODE` `1` COMP, code `32` = $\varepsilon_0$): `1E-6×0.02÷(3×` `SHIFT` `CVALUE` `32` `)=` → **752.96** V/m; `×` `SHIFT` `CVALUE` `32` `=` → $D$ = **6.667E-9** C/m². Chain both radii on one line with `ALPHA` `:` — `1E-6×0.02÷(3×` `SHIFT` `CVALUE` `32` `)` `ALPHA` `:` `1E-6×0.03÷(3×` `SHIFT` `CVALUE` `32` `)=` → **752.96** then **1129.4**, whose ratio is the $2/3$ check.

**2.** A conducting rod 0.5 m long slides at 4 m/s perpendicular to a uniform $B=0.8$ T, on rails closed by a $0.5\ \Omega$ resistor. Find the emf, the current, the force needed to hold the speed constant, and verify the energy balance.
> [!success]- Solution
> $\mathcal{E}=Blv=(0.8)(0.5)(4)=1.6$ V; $I=\mathcal{E}/R=1.6/0.5=3.2$ A.
> Magnetic drag $F=BIl=(0.8)(3.2)(0.5)=1.28$ N, opposing the motion; at constant speed the applied force equals it exactly.
> **Energy check (do this every time):** mechanical $Fv=(1.28)(4)=5.12$ W; electrical $\mathcal{E}^2/R=(1.6)^2/0.5=5.12$ W. Equal to three figures.
> The closed form $F=B^2l^2v/R=(0.64)(0.25)(4)/0.5=1.28$ N shows that the drag is set by the circuit, not by your hand: halving $R$ doubles both $I$ and $F$.
> **Discriminator:** $F=B^2l^2v/R$ contains **no** applied force, so "the force you apply" and "the magnetic force" are equal and opposite only at constant speed. Using the loop's *total* perimeter instead of the rod's 0.5 m inflates $F$. Open circuit: still 1.6 V across the rod, but zero current, zero drag, zero power — the emf is a property of the flux rate, the current is a property of the circuit.

**3.** A coaxial cable has inner radius 0.5 mm and outer-conductor inner radius 5 mm, filled with $\varepsilon_r=3$. Find its capacitance and inductance per metre, and check the pair against $v_p=c/\sqrt{3}$.
> [!success]- Solution
> $C/L=\dfrac{2\pi\varepsilon_0\varepsilon_r}{\ln(b/a)}=\dfrac{2\pi(8.854\times10^{-12})(3)}{\ln 10}=\dfrac{1.6693\times10^{-10}}{2.302585}=7.25\times10^{-11}$ F/m $=72.5$ pF/m.
> $L/L=\dfrac{\mu_0}{2\pi}\ln\dfrac{b}{a}=(2\times10^{-7})(2.302585)=4.605\times10^{-7}$ H/m $=461$ nH/m.
> Consistency: $v_p=1/\sqrt{LC}=\left((7.25\times10^{-11})(4.605\times10^{-7})\right)^{-1/2}=1.731\times10^{8}$ m/s, and $c/\sqrt{3}=1.732\times10^{8}$ m/s — the dielectric constant and the $LC$ product agree, which verifies both formulas at once.
> **Discriminator:** only $b/a=10$ enters, so diameters give the same answer; but the inductance carries $\mu/2\pi$ whereas a *two-wire* line of the same spacing would carry $\mu/\pi$ and give twice as much. The parallel-plate estimate $\varepsilon A/d$ with the 4.5 mm gap returns 59 pF/m: the field falls as $1/\rho$, so the geometry factor is a logarithm, never a linear gap.
> **Calc** (`MODE` `1` COMP, codes `32` = $\varepsilon_0$, `33` = $\mu_0$): `2\pi×3×` `SHIFT` `CVALUE` `32` `÷\ln(10)=` → $C/L$ = **7.248E-11** F/m = **72.5** pF/m; then `SHIFT` `CVALUE` `33` `÷(2\pi)×\ln(10)=` → $L/L$ = **4.605E-7** H/m. The `\ln` key also does $e^x$ via `SHIFT` `\ln`, which is how you invert a required $b/a$ back to a radius.

**4.** A uniform plane wave in air at 1 GHz has $E_0=300$ V/m along $\mathbf{a}_x$, propagating along $+\mathbf{a}_z$. Find $H_0$, the average and peak power density, the direction of $\mathbf{H}$, and the instantaneous power density at $z=3$ m.
> [!success]- Solution
> $H_0=E_0/\eta_0=300/376.73=0.7963$ A/m (377 shorthand: 0.7958 A/m), directed along $+\mathbf{a}_y$ because $\mathbf{H}=\frac{1}{\eta}\mathbf{a}_k\times\mathbf{E}$ and $\mathbf{a}_z\times\mathbf{a}_x=\mathbf{a}_y$.
> $\langle S\rangle=\dfrac{E_0^2}{2\eta_0}=\dfrac{90000}{753.46}=119.4\ \mathrm{W/m^2}$, and this is $\mathbf{E}\times\mathbf{H}$ along $+\mathbf{a}_z$ — the direction of energy transport. Product-form check: $E_0H_0/2=(300)(0.7963)/2=119.4\ \mathrm{W/m^2}$.
> Peak instantaneous $S=E_0^2/\eta_0=238.9\ \mathrm{W/m^2}$ when $\cos^2(\omega t-\beta z)=1$. Here $\lambda=c/f=0.3$ m and $\beta=2\pi/0.3=20.94$ rad/m, so at $z=3$ m the phase is $\beta z=20\pi$ and the wave sits exactly at that peak: $S=238.9\ \mathrm{W/m^2}$. Note $S$ never goes negative — the two fields change sign together.
> Sanity checks: $\lvert\mathbf{E}\rvert=\eta_0\lvert\mathbf{H}\rvert$ with $\eta_0$ in ohms reads like Ohm's law; $\mathbf{E}\cdot\mathbf{a}_k=0$ and $\mathbf{H}\cdot\mathbf{a}_k=0$ confirm the wave is TEM; the time-average energy density splits equally, $w_e=w_m$.
> **Discriminator:** choosing $\mathbf{H}$ along $\mathbf{a}_x$ gives $\mathbf{E}\times\mathbf{H}=0$ — a wave transporting no power, which is impossible, so the cross product is a free error filter. Dropping the $\tfrac{1}{2}$ reports 238.9 as the *average* instead of the peak; feeding $\beta z$ in degrees instead of radians, or using the *average* where the *instantaneous* value is asked, are the two silent killers here.

---

## Block 6 — Control Systems (6 min)

**Topics:** [[01_System_Modeling_and_Transfer_Functions|Transfer Functions]] · [[02_Block_Diagram_Reduction|Block Diagrams]] · [[03_Mason’s_Gain_Formula|Mason]] · [[04_Test_Signals_and_First_Order_Response|1st-Order]] · [[05_Second_Order_Specifications|2nd-Order Specs]] · [[06_Steady_State_Error_and_Error_Constants|Steady-State Error]] · [[07_System_Types_and_Error_Analysis|System Types]] · [[08_Routh-Hurwitz_Criterion|Routh-Hurwitz]] · [[09_Root_Locus_Techniques|Root Locus]] · [[10_Bode_Plots_and_Margins|Bode]] · [[12_PID_Controllers_and_Tuning|PID]] · [[14_State_Space_Representation_Basics|State Space]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Transfer function | $G(s)=C(sI-A)^{-1}B+D$ | Zero ICs only. $G(0)=b_0/a_0$; $m>n$ (improper) is an algebra error. |
| Cascade / parallel | $G_1G_2$ / $G_1+G_2$ | Series multiplies, parallel adds. Adding a cascade is the #1 modelling slip. |
| Negative feedback | $T=\dfrac{G}{1+GH}$ | The $1$ is the direct path, not $H$. Positive feedback uses $1-GH$. |
| Mason | $T=\dfrac{1}{\Delta}\sum_k P_k\Delta_k$ | $\Delta=1-\sum L_i+\sum L_iL_j-\dots$; $\Delta_k$ = cofactor of a non-touching part. |
| First order step | $y(t)=K(1-e^{-t/\tau})$ | $\tau=1/\lvert p\rvert$ (pole $-4$ gives $\tau=0.25$). $t_r=2.2\tau$, $t_s=4\tau$ (2 %). |
| $\omega_d$ | $\omega_d=\omega_n\sqrt{1-\zeta^2}$ | Underdamped only. $\omega_d<\omega_n$, so $t_p>\pi/\omega_n$ always. |
| Percent overshoot | $M_p=e^{-\pi\zeta/\sqrt{1-\zeta^2}}$ | Depends on $\zeta$ **only** — no $\omega_n$. Returns a fraction; x100 for percent. |
| $\zeta$ from $M_p$ | $\zeta=\dfrac{\lvert\ln M_p\rvert}{\sqrt{\pi^2+\ln^2 M_p}}$ | Feed $0.163$, never $16.3$. $M_p=16.3\%\Rightarrow\zeta=0.500$. |
| $t_p$, $t_r$ | $t_p=\dfrac{\pi}{\omega_d}$, $t_r\approx\dfrac{\pi-\arccos\zeta}{\omega_d}$ | Use $\omega_d$. $1.8/\omega_n$ is only valid near $\zeta=0.5$. |
| Settling time | $t_s=\dfrac{4}{\zeta\omega_n}$ (2 %), $\dfrac{3}{\zeta\omega_n}$ (5 %) | Pole real part sets it. Quote the band or lose the mark. |
| Poles from specs | $s=-\zeta\omega_n\pm j\omega_n\sqrt{1-\zeta^2}$ | $\zeta=\lvert\mathrm{Re}\rvert/\omega_n$, never $\mathrm{Re}/\mathrm{Im}$. |
| Error constants | $K_p=\lim_{s\to0}GH$, $K_v=\lim_{s\to0}sGH$, $K_a=\lim_{s\to0}s^2GH$ | All built from $GH$, not $G$. Each input uses its own power of $s$. |
| Steady-state error | $e_{ss}=\dfrac{1}{1+K_p}$, $\dfrac{1}{K_v}$, $\dfrac{1}{K_a}$ | Step/ramp/parabola. Valid **only** if the closed loop is stable. |
| Routh | RHP poles = sign changes in column 1 | Zero entry: use $\varepsilon\to0^+$. All-zero row: auxiliary polynomial $A(s)$, replace with $A'(s)$. |
| Routh shortcuts | $s^3$: $a_2a_1>a_0$; $s^4$: $a_1(a_3a_2-a_1)>a_3^2a_0$ | Both need all coefficients positive first. 4th order needs **both** 4th-order conditions. |
| $K_u$, $T_u$ | $s^1$ entry $=0$; $T_u=2\pi/\omega_u$ | $\omega_u$ comes from the auxiliary polynomial, not from the gain. |
| Gain / phase margin | $PM=180^\circ+\angle G(j\omega_{gc})$, $GM_{dB}=-20\log_{10}\lvert G(j\omega_{pc})\rvert$ | PM at the **gain** crossover, GM at the **phase** crossover. Swapping them is the classic error. |
| ZN open-loop PID | $K_c=\dfrac{1.2}{K}\dfrac{T}{L},\ T_i=2L,\ T_d=0.5L$ | FOPDT $Ke^{-Ls}/(Ts+1)$. The $1/K$ is **mandatory** — $T/L$ alone is not a gain. |
| ZN open-loop PI | $K_c=\dfrac{0.9}{K}\dfrac{T}{L},\ T_i=3.33L$ | Standard form. (The vault's concept 4 prints $0.9\,T/L$ — the $1/K$ is missing there.) |
| ZN closed-loop | PID $0.6K_u,\ 0.5T_u,\ 0.125T_u$; PI $0.45K_u,\ T_u/1.2$ | Different table, different symbols. Never mix $K_u,T_u$ with $K,L,T$. |
| Controllability / observability | $\mathcal{C}=[B\ AB\ \cdots]$, $\mathcal{O}=[C;\ CA;\ \cdots]$ | Rank $=n$. $B\neq0$ proves nothing; rank is the test. |

### Traps that cost marks

- **Reading the PM off the phase crossover.** $GM$ uses $\omega_{pc}$, $PM$ uses $\omega_{gc}$.
- **Dropping the minus on $GM_{dB}$.** $\lvert G\rvert=1.667$ at $\omega_{pc}$ gives $GM=-4.4$ dB and an **unstable** loop — not $+4.4$.
- **Using $\tau$ as the corner frequency.** The corner is $1/\tau$: $(1+0.1s)$ breaks at $10$ rad/s.
- **$e_{ss}=1/K_p$ for a step.** It is $1/(1+K_p)$; the $1$ is the direct path. $K_p=5\Rightarrow0.1667$, not $0.2$.
- **Quoting $e_{ss}$ before running Routh.** Accuracy needs $K\ge5000$ while stability needs $K<750$ in the classic problem — no such $K$ exists.
- **Integrator placement for disturbance rejection (do not trust the vault's `traps[8]`).** From $Y=G_d(s)D/(1+G(s)H(s))$ the steady output contribution vanishes when the **closed-loop** disturbance-to-output transfer has a zero at $s=0$ — standard texts state this as an integrator between the disturbance entry point and the output, i.e. a $G_d(s)$ that supplies the cancelling $s$. Concept 6 (an integrator **upstream** of the entry point) is the standard mechanism; `traps[8]` says "only an integrator between the disturbance and the output does", which is the same words attached to the opposite side. Verify with $G_d(s)$, do not trust either sentence.
- **Feeding $M_p$ as a percent.** $\ln 16.3$ is positive and yields a meaningless $\zeta$.
- **Mixing the $t_s$ bands.** $4/(\zeta\omega_n)$ vs $3/(\zeta\omega_n)$ is a 25–33 % error.
- **Reading $C$ in phase-variable form in polynomial order.** It is lowest power first: $b_0$ then $b_1$.
- **Expecting P action to zero the error.** A type-0 loop gives $1/(1+K_p)$, which only $\to0$ as $K_p\to\infty$. Only integral action makes it identically zero.
- **$T_i=K_p/K_i$, $T_d=K_d/K_p$.** Swapping gives reciprocals. For $G_c=4+2/s+0.5s$: $T_i=2$ s, $T_d=0.125$ s.

### Rapid-fire recall

- [ ] **Q1.** $G(s)=K/[s(s+1)(s+4)]$ — find the stable range of $K$.
- [ ] **Q2.** $T(s)=25/(s^2+6s+25)$ — give $\zeta$, $\omega_d$, $M_p$, $t_p$.
- [ ] **Q3.** A loop has $16.3\%$ overshoot — find $\zeta$.
- [ ] **Q4.** $G=100/[s(s+10)]$ (unity feedback) — ramp error?
- [ ] **Q5.** Is $s^4+s^3+2s^2+2s+1=0$ stable?
- [ ] **Q6.** $G=K/[s(s+10)]$ — what $K$ gives $PM=45^\circ$?
- [ ] **Q7.** $G_c=4+2/s+0.5s$ — find $T_i$ and $T_d$.
- [ ] **Q8.** FOPDT $2e^{-0.5s}/(4s+1)$ — ZN PID gains?
- [ ] **Q9.** $A=\mathrm{diag}(1,2)$, $B=[1;0]^T$ — controllable? Which mode is lost?
- [ ] **Q10.** $G(s)=8/(s+4)$ — $\tau$, $t_r$, $t_s$ (2 %)?

> [!success]- Answers
> **Q1.** CE $s^3+5s^2+4s+K$; $a_2a_1>a_0\Rightarrow20>K$, and $K>0$: $0<K<20$. At $K=20$ the auxiliary $5s^2+20$ puts poles at $\omega=2$ rad/s.
> **Q2.** $\omega_n=5$, $\zeta=0.6$, $\omega_d=4$ rad/s, $M_p=e^{-2.356}=0.0948$ ($9.48\%$), $t_p=\pi/4=0.785$ s.
> **Q3.** $\zeta=0.500$ — the canonical pair.
> **Q4.** $K_v=100/10=10\ \mathrm{s^{-1}}$, so $e_{ss}=0.1$; step error is $0$ (pole at the origin).
> **Q5.** Unstable. Array column $1,1,\varepsilon,(2\varepsilon-1)/\varepsilon,1$ has **2** sign changes $\Rightarrow$ 2 RHP roots.
> **Q6.** $\angle G=-135^\circ\Rightarrow\omega_{gc}=10$; $\lvert G\rvert=1\Rightarrow K=10\sqrt{200}=141.4$, and $K_v=14.14\ \mathrm{s^{-1}}$.
> **Q7.** $K_p=4$, $K_i=2$, $K_d=0.5$, so $T_i=4/2=2$ s and $T_d=0.5/4=0.125$ s.
> **Q8.** $T/L=8$; $K_c=\frac{1.2}{2}(8)=4.8$, $T_i=1$ s, $T_d=0.25$ s ($K_i=4.8$, $K_d=1.2$).
> **Q9.** $AB=B$, so $\mathcal{C}=[[1,1],[0,0]]$, $\det=0$, rank 1 — not controllable; $\lambda=2$ cannot be driven.
> **Q10.** $G=2/(0.25s+1)$: $\tau=0.25$ s, $t_r=0.55$ s, $t_s=1.0$ s, $y(\infty)=2$.

### Drill — 4 minutes

**1.** For $G(s)=K/[s(s+1)(s+4)]$ in unity feedback, find the critical gain, the frequency of sustained oscillation, and the resulting Ziegler-Nichols PID settings.

> [!success]- Solution
> CE $=s^3+5s^2+4s+K$. Third-order condition $a_2a_1>a_0$: $5(4)>K\Rightarrow K_u=20$ (and $K>0$ for the necessary test).
> Auxiliary polynomial from the $s^2$ row at $K_u$: $5s^2+20=0\Rightarrow\omega_u=\sqrt4=2$ rad/s, so $T_u=2\pi/2=\pi=3.1416$ s.
> ZN closed-loop PID: $K_p=0.6(20)=12$, $T_i=0.5(3.1416)=1.571$ s, $T_d=0.125(3.1416)=0.393$ s.
> Implementation form: $K_i=K_p/T_i=12/1.571=7.639$, $K_d=K_pT_d=12(0.393)=4.712$. (ZN targets ~25 % overshoot.)

**2.** A unity-feedback system has $\zeta=0.5$ and a 2 % settling time of $2$ s. Write $T(s)$ and give $t_p$.

> [!success]- Solution
> $t_s=4/(\zeta\omega_n)=2\Rightarrow\zeta\omega_n=2\Rightarrow\omega_n=2/0.5=4$ rad/s.
> $\omega_n^2=16$, $2\zeta\omega_n=2(0.5)(4)=4$, so $T(s)=\dfrac{16}{s^2+4s+16}$.
> $\omega_d=4\sqrt{1-0.25}=3.464$ rad/s, $t_p=\pi/3.464=0.907$ s. ($M_p=e^{-\pi(0.5)/0.866}=0.1632$, i.e. $16.3\%$.)

**3.** For $G(s)=K/[s(s+10)]$, find $K$ for $PM=45^\circ$, then the gain margin of $G(s)=50/[s(s+1)(s+5)]$.

> [!success]- Solution
> PM condition: $-90^\circ-\arctan(\omega_{gc}/10)=-135^\circ\Rightarrow\omega_{gc}=10$ rad/s (exactly the corner).
> $\lvert G(j10)\rvert=K/[10\sqrt{200}]=1\Rightarrow K=141.4$, and $K_v=K/10=14.14\ \mathrm{s^{-1}}$.
> For the second loop: $\arctan\omega+\arctan(\omega/5)=90^\circ\Rightarrow\omega^2=5$, $\omega_{pc}=2.236$ rad/s.
> $\lvert G\rvert=50/[\omega_{pc}\sqrt{1+5}\cdot5\sqrt{1+1.2}]=50/[2.236(2.449)(5)(1.095)]=50/30=1.667$.
> $GM_{dB}=-20\log_{10}1.667=-4.4$ dB — negative, so the closed loop is **unstable**, confirmed by Routh ($a_2a_1=6(5)=30<50$).

---

## Block 7 — Signals and Systems (6 min)

**Topics:** [[01_Signal_Classification_and_Operations|Signal Classification]] · [[02_Energy,_Power,_Even_and_Odd|Energy & Power]] · [[03_System_Properties_and_LTI|LTI Properties]] · [[04_Continuous-Time_Convolution|CT Convolution]] · [[05_Discrete-Time_Convolution|DT Convolution]] · [[06_Z_Transform_Definition_and_ROC|Z & ROC]] · [[07_Z_Transform_Theorems_and_Pairs|Z Theorems]] · [[08_Inverse_Z_Transform|Inverse Z]] · [[09_Difference_Equations_and_Stability|Difference Equations]] · [[11_CT_Fourier_and_Laplace_as_System_Tools|Fourier & Laplace]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Convolution integral | $y(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau$ | Integrate the **overlap**. Limits $0$ to $t$ only if both signals are causal. |
| Support & duration | $[a+c,\ b+d]$, $T_y=T_x+T_h$ | Instant sanity check: reject any answer of the wrong length before integrating. |
| Standard pairs | $u*u=tu(t)$; $e^{-at}u*e^{-bt}u=\dfrac{e^{-at}-e^{-bt}}{b-a}u$ | Denominator is $b-a$, not $a-b$. $a=b$ gives $te^{-at}u(t)$. |
| Impulse | $x(t)*\delta(t-t_0)=x(t-t_0)$ | Shift only, no scaling. Area of $\delta$ is 1. |
| DT convolution | $y[n]=\sum_k x[k]h[n-k]$ | Length $L_1+L_2-1$ (not $L_1+L_2$). Supports add, so the start index adds. |
| DT step pair | $u[n]*u[n]=(n+1)u[n]$ | The $+1$ from counting terms. At $n=5$ this is $6$, not $5$. |
| Geometric sum | $a^nu[n]*u[n]=\dfrac{1-a^{n+1}}{1-a}u[n]$ | Exponent is $n+1$ for $n+1$ terms; settles at $1/(1-a)$. |
| Z definition | $X(z)=\sum_n x[n]z^{-n}$ | The ROC is part of the answer; a bare rational form is ambiguous. |
| Core Z pair | $a^nu[n]\leftrightarrow\dfrac{1}{1-az^{-1}}$, $\lvert z\rvert>\lvert a\rvert$ | Same algebra with $\lvert z\rvert<\lvert a\rvert$ is $-a^nu[-n-1]$. |
| Ramped pair | $na^nu[n]\leftrightarrow\dfrac{az^{-1}}{(1-az^{-1})^2}$ | The extra $a$ in the numerator is the usual omission. |
| Two-sided ROC | intersection, $r_1<\lvert z\rvert<r_2$ | Intersect, never union. Empty annulus $\Rightarrow$ transform does not exist. |
| Stability | $\sum_n\lvert h[n]\rvert<\infty$ | Equivalently: the ROC contains $\lvert z\rvert=1$. For causal systems: all poles inside the unit circle. |
| Jury (2nd order) | $\lvert a_2\rvert<1$ **and** $\lvert a_1\rvert<1+a_2$ | For $z^2+a_1z+a_2=0$. $\lvert a_2\rvert<1$ alone is not enough. |
| Shift theorem | $x[n-k]\leftrightarrow z^{-k}X(z)$ | Delay is $z^{-k}$; $z^{+k}$ is an advance. |
| Scaling / $n$ | $a^nx[n]\leftrightarrow X(z/a)$; $nx[n]\leftrightarrow-z\dfrac{dX}{dz}$ | Argument $z/a$, not $az$; the minus sign is part of the theorem. |
| Initial / final value | $x[0]=\lim_{z\to\infty}X(z)$; $x[\infty]=\lim_{z\to1}(z-1)X(z)$ | Final value needs all poles inside the unit circle except a simple pole at $z=1$. Never $X(1)$. |
| Frequency response | $y_{ss}=A\lvert H(j\omega_0)\rvert\cos(\omega_0t+\angle H(j\omega_0))$ | Legal iff the ROC contains the $j\omega$ axis. Evaluate at the **input** frequency. |
| 1st-order lag | $\lvert H\rvert=1/\sqrt{1+\omega^2\tau^2}$, $\angle H=-\arctan(\omega\tau)$, $\omega_c=1/\tau$ | At $\omega_c$: $0.7071$ ($-3$ dB) and $-45^\circ$. |
| Laplace of derivatives | $\mathcal{L}\{y'\}=sY-y(0)$, $\mathcal{L}\{y''\}=s^2Y-sy(0)-y'(0)$ | Dropping these silently computes only the zero-state response. |
| Parseval / energy | $\int\lvert x\rvert^2dt=\frac{1}{2\pi}\int\lvert X\rvert^2d\omega$ | First-order lag $H=1/(1+\tau s)$ has impulse energy $1/(2\tau)$. |

### Traps that cost marks

- **Using $0$ to $t$ limits for non-causal signals.** $x=u(t)-u(t-2)$ convolved with $u(t)$ flattens at 2, it does not ramp forever.
- **Reporting $u[n]*u[n]=nu[n]$.** Copying CT gives $5$ at $n=5$; the DT answer is $6$.
- **$L_1+L_2$ instead of $L_1+L_2-1$.** The single most common DT convolution error.
- **Starting the DT output at $n=0$.** Supports add: $x$ on $[-2,1]$ and $h$ on $[1,3]$ give support $[-1,4]$, length 6.
- **Omitting the ROC.** $z/(z-0.8)$ is $(0.8)^nu[n]$ for $\lvert z\rvert>0.8$ and $-(0.8)^nu[-n-1]$ for $\lvert z\rvert<0.8$ — same algebra, different sequence.
- **Union of ROCs.** For $(1/3)^nu[n]-(1/2)^nu[-n-1]$ the ROC is the annulus $1/3<\lvert z\rvert<1/2$, which excludes the unit circle.
- **Reading a zero off the $z^{-1}$ form.** $1/(1-az^{-1})=z/(z-a)$ has its zero at $z=0$, not at $a$.
- **A pole on the unit circle called stable.** $z=1$ survives a step but not a ramp — not BIBO stable.
- **Sign error building the characteristic polynomial.** A recursion with $-ay[n-1]$ gives `$z-a=0$, not $z+a=0$.
- **Rounding $y[-1]$ away.** $y[-1]=2$ gives $y[0]=0.5(2)=1$, so $y[n]=(0.5)^nu[n]$ — not $2(0.5)^nu[n]$.
- **Substituting $s=j\omega$ into an unstable $H(s)$.** $H(s)=1/(s-1)$ has **no** Fourier transform; the ROC $\mathrm{Re}\{s\}>1$ excludes the axis.

### Rapid-fire recall

- [ ] **Q1.** $e^{-t}u(t)*e^{-2t}u(t)$ — closed form and peak value?
- [ ] **Q2.** $X(z)=1/(1-\frac13z^{-1})$ with $\lvert z\rvert<1/3$ — find $x[n]$.
- [ ] **Q3.** $y[n]=1.2y[n-1]-0.32y[n-2]+x[n]$ — stable?
- [ ] **Q4.** $H(s)=10/(s+2)$, $x=3\cos4t$ — steady-state output?
- [ ] **Q5.** $u[n]*u[n]$ at $n=5$?
- [ ] **Q6.** $H(s)=1/(s-1)$ — does $H(j\omega)$ exist?
- [ ] **Q7.** $z^2-z+0.5=0$ — Jury verdict and pole radius?
- [ ] **Q8.** $\delta[n]+2\delta[n-1]+3\delta[n-2]$ — $X(z)$ and ROC?
- [ ] **Q9.** Transform of $(1/2)^{n-2}u[n-2]$?
- [ ] **Q10.** $H(s)=1/(1+0.05s)$ — $\omega_c$, and the phase there?

> [!success]- Answers
> **Q1.** $y=(e^{-t}-e^{-2t})u(t)$; $dy/dt=0\Rightarrow t=\ln2=0.693$ s, $y(\ln2)=0.5-0.25=0.25$.
> **Q2.** $x[n]=-(1/3)^nu[-n-1]$ — left-sided, growing as $n\to-\infty$, because the ROC is inside the pole.
> **Q3.** CE $z^2-1.2z+0.32=0$; $\Delta=1.44-1.28=0.16$, roots $z=0.8$ and $0.4$ — both inside the unit circle, **stable**.
> **Q4.** $H(j4)=10/(2+j4)=(20-j40)/20=1-j2$, $\lvert H\rvert=\sqrt5=2.236$, $\angle=-63.43^\circ$, so $y_{ss}=6.708\cos(4t-63.43^\circ)$.
> **Q5.** $(n+1)u[n]\Rightarrow6$ — one more than the CT value $t=5$.
> **Q6.** No: the causal ROC $\mathrm{Re}\{s\}>1$ excludes the imaginary axis; $h(t)=e^tu(t)$ is unbounded.
> **Q7.** $\lvert a_2\rvert=0.5<1$ and $\lvert a_1\rvert=1<1.5$ — stable; poles $0.5\pm j0.5$, $\lvert z\rvert=\sqrt{0.5}=0.707$.
> **Q8.** $X(z)=1+2z^{-1}+3z^{-2}$, ROC $\lvert z\rvert>0$ (the whole plane except $z=0$).
> **Q9.** `$X(z)=z^{-2}/(1-0.5z^{-1})$, ROC $\lvert z\rvert>0.5$ — a delay of 2, not an advance.
> **Q10.** $\tau=0.05$ s, $\omega_c=1/\tau=20$ rad/s, $\lvert H\rvert=0.7071$ ($-3.01$ dB) and $\angle H=-45^\circ$.

### Drill — 4 minutes

**1.** Convolve $x[n]=(1/2)^nu[n]$ with $h[n]=(1/2)^nu[n]$; give $X(z)$, $x[n]$, and the checks at $n=0,1,2$.

> [!success]- Solution
> Each factor is $1/(1-0.5z^{-1})$ with ROC $\lvert z\rvert>0.5$. By the convolution theorem
> $X(z)=\dfrac{1}{(1-0.5z^{-1})^2}$, ROC $\lvert z\rvert>0.5$.
> Recognise $1/(1-az^{-1})^2\leftrightarrow(n+1)a^nu[n]$ with $a=0.5$: $x[n]=(n+1)(0.5)^nu[n]$.
> Checks: $x[0]=1$; $x[1]=2(0.5)=1=0.5+0.5$; $x[2]=3(0.25)=0.75=0.25+0.5+0.25$ ✓.

**2.** Find the z-transform, ROC, poles and zeros of $x[n]=(1/3)^nu[n]-(1/2)^nu[-n-1]$.

> [!success]- Solution
> Right-sided part: $1/(1-\frac13z^{-1})$ with ROC $\lvert z\rvert>1/3$.
> Left-sided part (form $-a^nu[-n-1]$, $a=1/2$): $1/(1-\frac12z^{-1})$ with ROC $\lvert z\rvert<1/2$.
> The ROC is the **intersection**: $1/3<\lvert z\rvert<1/2$. Poles at $z=1/3$ and $z=1/2$, neither in the annulus ✓.
> The annulus excludes $\lvert z\rvert=1$, so the sequence is not absolutely summable and the system is not BIBO stable.

**3.** $y[n]-0.5y[n-1]=x[n]$ with $y[-1]=2$ and $x[n]=0$ for $n\ge0$: find $y[n]$. Then find the step response of the same recursion from zero initial rest.

> [!success]- Solution
> Zero input: $y[n]=0.5\,y[n-1]$. Seed: $y[0]=0.5(2)=1$, then $0.5,\ 0.25,\dots$
> So $y[n]=(0.5)^nu[n]$ (equivalently $2(0.5)^{n+1}u[n]$) — not $2(0.5)^nu[n]$; the state at $n=-1$ decays once before $n=0$.
> Zero-state step: $H(z)=1/(1-0.5z^{-1})$, $Y(z)=\dfrac{1}{(1-0.5z^{-1})(1-z^{-1})}=\dfrac{2}{1-z^{-1}}-\dfrac{1}{1-0.5z^{-1}}$.
> Both poles are inside the unit circle, so $y[n]=(2-(0.5)^n)u[n]$, settling to $H(1)=2$.
> Check: $y[0]=2-1=1$ and $0.5(0)+1=1$ ✓; $y[1]=1.5$ and $0.5(1)+1=1.5$ ✓.

---

## Block 8 — Numerical Methods (4 min)

**Topics:** [[01_Error_Analysis,_Roundoff_and_Truncation|Error Analysis]] · [[02_Bisection_and_Regula_Falsi|Bisection & Regula Falsi]] · [[03_Newton-Raphson_and_Secant|Newton & Secant]] · [[04_Newton’s_Divided_Difference_Interpolation|Divided Differences]] · [[05_Lagrange_Interpolation|Lagrange]] · [[06_Trapezoidal_Rule|Trapezoidal]] · [[07_Simpson’s_One-Third_and_Three-Eighth_Rules|Simpson]] · [[08_Euler’s_Method|Euler]] · [[09_Modified_Euler_and_Heun’s_Method|Heun]] · [[10_Runge-Kutta_4th_Order|RK4]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Relative error | $\varepsilon_a=\left\lvert\dfrac{x_{\mathrm{new}}-x_{\mathrm{old}}}{x_{\mathrm{new}}}\right\rvert$ | Divide by the **new** value. Absolute vs relative is a standard distractor. |
| Significant digits | $n$ digits when $\varepsilon_a<0.5\times10^{2-n}$ | For 3 significant digits the threshold is $0.5\times10^{-1}$. |
| Bracket | $f(a)f(b)<0$ | IVT only. Two roots inside still give $>0$ — scan first. |
| Bisection | $c=\dfrac{a+b}{2}$, $\lvert E_n\rvert\le\dfrac{b-a}{2^n}$ | $n\ge\log_2[(b-a)/\varepsilon]$, round **up**. ~3.32 iterations per decimal digit. |
| Regula falsi | $c=\dfrac{a\,f(b)-b\,f(a)}{f(b)-f(a)}$ | Fast early then **stalls** on convex $f$: one endpoint never moves. Interval width is not an error bound here. |
| Newton-Raphson | $x_{n+1}=x_n-\dfrac{f(x_n)}{f'(x_n)}$ | Quadratic: $E_{n+1}\approx\dfrac{\lvert f''\rvert}{2\lvert f'\rvert}E_n^2$. Fails on $f'=0$; $x^3-2x+2$ from $x_0=0$ cycles $0\to1\to0$. |
| Multiple root | rate $1-1/m$, linear | $(x-1)^3$ has $m=3$, rate $2/3$ — not quadratic. |
| Secant | $x_{n+1}=x_n-f(x_n)\dfrac{x_n-x_{n-1}}{f(x_n)-f(x_{n-1})}$ | Order $p=\dfrac{1+\sqrt5}{2}=1.618$. Two starts; fails when $f(x_n)=f(x_{n-1})$. |
| Lagrange | $P(x)=\sum_i y_i\prod_{j\neq i}\dfrac{x-x_j}{x_i-x_j}$ | No ordering required; node count $=n+1$ points. |
| Divided differences | $f[x_i,x_j]=\dfrac{f(x_j)-f(x_i)}{x_j-x_i}$ | Newton form; nested (Horner) evaluation is faster. |
| Trapezoidal | $T=\dfrac{h}{2}\left[f_0+2\sum_{\mathrm{interior}}f_i+f_n\right]$ | Error $-\dfrac{(b-a)h^2}{12}f''$. Overestimates for convex $f$. |
| Simpson 1/3 | $S=\dfrac{h}{3}\left[f_0+4\sum_{\mathrm{odd}}f_i+2\sum_{\mathrm{even}}f_i+f_n\right]$ | $n$ **even**. Exact for cubics. Error $-\dfrac{(b-a)h^4}{180}f^{(4)}$. |
| Simpson 3/8 | $S=\dfrac{3h}{8}\left[f_0+3\sum_{i\neq0,3,6,\dots}f_i+2\sum_{i=3,6,\dots}f_i+f_n\right]$ | $n$ divisible by **3**. Prefactor $3h/8$; error constant $1/80$ (worse than $1/180$). |
| Mixed panels | $n=2a+3b$ | $n=5$ is $2+3$; $n=7$ is $4+3$. Never force 1/3 weights onto odd $n$. |
| Euler / Heun | $y_{i+1}=y_i+hf$ / $\tfrac{h}{2}(k_1+k_2)$ | $O(h)$ vs $O(h^2)$ global. |
| RK4 | $y_{i+1}=y_i+\dfrac{h}{6}(k_1+2k_2+2k_3+k_4)$ | Midpoint stages use $x_i+h/2$ and **half** steps in $y$. Global $O(h^4)$: halving $h$ divides the error by **16**. |
| Real stability interval | $-2.78\le\lambda h\le0$ | RK4 is not a stiff solver; use implicit methods there. |

### Calculator shortcuts

- Newton-Raphson, one line per step: `MODE` `1` with `ALPHA` `:` chaining — `ANS−(ANS³−2ANS−5)÷(3ANS²−2)` then press `=` repeatedly. Or type `X−(X³−2X−5)÷(3X²−2)`, `SHIFT` `SOLVE`, guess, `=`; `L−R` shows the residual.
- Simpson / trapezoidal: key `f(X)` once, then `∫dx` with limits; for a table-valued rule, chain the weighted sum with `ALPHA` `:`. `∫(X³,0,1)` returns exactly **0.25**.
- No calculator verifies a Routh array, so use `MODE` `5` page 2 `2` (cubic) / `3` (quartic) on the characteristic equation when the CE has numeric coefficients.

### Traps that cost marks

- **Stopping bisection at 9 iterations for a $10^{-3}$ tolerance on a unit interval.** $1/2^9=1.95\times10^{-3}>10^{-3}$; the count rounds **up** to 10.
- **Quoting $(b-a)/2^n$ as the regula-falsi error.** On $x^3-2x-5$ over $[2,3]$ the estimate after 3 steps is $2.089639$ (error $0.0049$) while the bracket is still $0.9187$ wide.
- **Swapping $\sum x^2$ and $(\sum x)^2$ in regression/interpolation sums.** $30$ versus $100$ for $1,2,3,4$.
- **Rounding iterates between Newton steps.** The quadratic rate depends on guard digits; truncating to 3 decimals turns 3 iterations into 6.
- **Assuming the first Newton step "worked."** $f(x)=x^3-2x+2$ from $x_0=0$: $f'(0)=-2$ is finite, yet the iterates never converge.
- **Adding the lengths/panels instead of using whole blocks.** Simpson 1/3 needs even $n$, 3/8 needs $n$ a multiple of 3 — otherwise split $n=2a+3b$.
- **Using $h/3$ on the 3/8 rule.** The prefactor is $3h/8$; dropping the 3 is an answer off by a factor of 3.
- **Claiming Simpson is exact only for parabolas.** It is exact for every cubic — the $x^3$ error term integrates to zero over a symmetric double panel.
- **Evaluating $k_3$ at $x_i+h$.** Both midpoint stages use $x_i+h/2$; moving $k_3$ to the step end silently drops the order.
- **Advancing $y$ by a full $h k_1$ inside the midpoint stages.** It is $\frac{h}{2}k_1$; doubling it corrupts $k_2$ and $k_3$.
- **Summing RK4 weights to 4.** Use $h/6$: $k_1+2k_2+2k_3+k_4=6$ when all stages agree.
- **Scaling the RK4 error as $h$ or $h^2$.** $O(h^4)$ means $h\to h/2$ divides the error by 16. For $y'=x+y$ on $[0,1]$: $6.14\times10^{-5}$ at $h=0.2$, $4.17\times10^{-6}$ at $h=0.1$, $2.72\times10^{-7}$ at $h=0.05$ (ratios 14.7, 15.3), predicting $1.7\times10^{-8}$ at $h=0.025$.

### Rapid-fire recall

- [ ] **Q1.** How many bisection iterations for $\varepsilon=10^{-3}$ on $[0,1]$?
- [ ] **Q2.** Newton on $f=x^2-2$ from $x_0=1$ — give $x_3$.
- [ ] **Q3.** Secant order of convergence?
- [ ] **Q4.** $\int_0^1 x^3dx$ by Simpson 1/3 with $h=0.25$?
- [ ] **Q5.** Is Simpson 3/8 legal at $n=5$?
- [ ] **Q6.** Simpson 1/3 with $h\to h/2$ — error factor?
- [ ] **Q7.** RK4: how many function evaluations per step?
- [ ] **Q8.** Newton on a triple root — what rate?

> [!success]- Answers
> **Q1.** $n\ge\log_2(1/0.001)=9.97\Rightarrow n=10$.
> **Q2.** $x_1=1.5$, $x_2=1.416667$, $x_3=1.414216$ (true $1.4142136$).
> **Q3.** $p=(1+\sqrt5)/2=1.618$ — superlinear, cheaper per step than Newton.
> **Q4.** Weighted sum $0+4(0.015625)+2(0.125)+4(0.421875)+1=3.000000$, $S=(0.25/3)(3)=0.250000$ — exactly $\int_0^1x^3dx$.
> **Q5.** No — $n=5$ is neither even nor a multiple of 3. Split $5=2+3$.
> **Q6.** Error divides by $2^4=16$.
> **Q7.** Four ($k_1$–$k_4$), versus 1 for Euler and 2 for Heun.
> **Q8.** Linear, rate $1-1/m$; for $m=3$ the rate is $2/3$.

### Drill — 4 minutes

**1.** Use Newton-Raphson on $f(x)=x^3-2x-5$ from $x_0=2$ for 3 iterations, then say how much accuracy one more step buys.

> [!success]- Solution
> $f'=3x^2-2$. $x_0=2$: $f=-1$, $f'=10$, $x_1=2-(-0.1)=2.1$.
> $x_1=2.1$: $f=9.261-4.2-5=0.061$, $f'=13.23-2=11.23$, $x_2=2.1-0.005432=2.094568$.
> $x_2=2.094568$: $f=9.189247-4.189136-5=1.86\times10^{-4}$, $f'=11.161647$, $x_3=2.094568-1.67\times10^{-5}=2.094551$.
> True root $2.09455148$: $x_3$ is correct to 6 decimals while $x_1$ was good to one and $x_2$ to four — the digits roughly double.
> One Newton step costs two evaluations ($f$ and $f'$); three steps replace about 24 bisection iterations ($2^n\ge10^7\Rightarrow n\ge23.3$).

**2.** Evaluate $\int_0^1e^{-x}dx$ with Simpson's 1/3 rule at $n=4$ and state the error against $1-e^{-1}$.

> [!success]- Solution
> $h=0.25$; ordinates $1.000000,\ 0.778801,\ 0.606531,\ 0.472367,\ 0.367879$.
> Weighted sum $=1(1.000000)+4(0.778801)+2(0.606531)+4(0.472367)+1(0.367879)$
> $=1.000000+3.115204+1.213062+1.889468+0.367879=7.585613$.
> $S=(0.25/3)(7.585613)=0.632134$.
> Exact $1-e^{-1}=0.6321206$, so the error is $1.36\times10^{-5}$ — the trapezoidal rule at the same $n=4$ gives $0.635410$, wrong by $3.3\times10^{-3}$ (about 240 times worse).

**3.** One RK4 step for $y'=y-x^2+1$, $y(0)=0.5$, $h=0.2$; compare with the exact $y(0.2)=0.829299$.

> [!success]- Solution
> $k_1=f(0,0.5)=0.5-0+1=1.500000$.
> $k_2=f(0.1,\ 0.5+0.1(1.5))=f(0.1,0.65)=0.65-0.01+1=1.640000$.
> $k_3=f(0.1,\ 0.5+0.1(1.64))=f(0.1,0.664)=0.664-0.01+1=1.654000$.
> $k_4=f(0.2,\ 0.5+0.2(1.654))=f(0.2,0.8308)=0.8308-0.04+1=1.790800$.
> Increment $=\dfrac{0.2}{6}(1.5+3.28+3.308+1.7908)=\dfrac{0.2}{6}(9.8788)=0.329293$.
> $y(0.2)=0.5+0.329293=0.829293$, error $-6\times10^{-6}$. Plain Euler at the same $h$ gives $0.800000$ — an error 4700 times larger.

---

## Block 9 — Engineering Data Analysis & Probability (4 min)

**Topics:** [[01_Central_Tendency|Central Tendency]] · [[02_Dispersion,_Variance,_SD,_IQR_and_CV|Dispersion]] · [[03_Permutations_and_Combinations|Counting]] · [[04_Probability_Rules_and_Bayes|Probability & Bayes]] · [[05_Binomial_and_Geometric_Distributions|Binomial & Geometric]] · [[06_Poisson_and_Hypergeometric_Distributions|Poisson & Hypergeometric]] · [[07_Uniform_and_Exponential_Distributions|Uniform & Exponential]] · [[08_Normal_Distribution_and_Z_Scores|Normal & z]] · [[09_Sampling_Techniques_and_Sampling_Distributions|Sampling]] · [[10_Central_Limit_Theorem|CLT]] · [[11_Confidence_Intervals|Confidence Intervals]] · [[12_Hypothesis_Testing,_Z,_t_and_p_Errors|Hypothesis Testing]] · [[13_Linear_Regression_and_Pearson_r|Regression]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Sample variance | $s^2=\dfrac{\sum(x_i-\bar x)^2}{n-1}$ | $n-1$ for a sample, $N$ for a population. Shortcut: $\dfrac{\sum x^2-(\sum x)^2/n}{n-1}$. |
| Quartiles (convention used here) | median **excluded** from both halves | For $45,47,50,52,55,58,60,62,65,68,70,95$: $Q_1=51$, $Q_3=66.5$, $\mathrm{IQR}=15.5$, fences $[27.75,89.75]$. Including the median instead gives $Q_1=52$, $Q_3=65$, fence $84.5$ — a different (also published) convention. **State which one you use.** |
| Outlier fences | $Q_1-1.5\,\mathrm{IQR}$, $Q_3+1.5\,\mathrm{IQR}$ | The raw rule, not an eyeball judgement. |
| CV | $CV=\dfrac{s}{\bar x}\times100\%$ | Unitless, ratio-scale data only. Unchanged by $x\to kx+c$; $s\to ks$, $s^2\to k^2s^2$. |
| Counting | ${}_nP_r=\dfrac{n!}{(n-r)!}$, ${}_nC_r=\dfrac{n!}{r!(n-r)!}$ | Order matters vs not. Repeats: divide by $n_1!n_2!\cdots$. Circle: $(n-1)!$. |
| Addition / complement | $P(A\cup B)=P(A)+P(B)-P(A\cap B)$; $P(A')=1-P(A)$ | Subtract the overlap; $P(\mathrm{at\ least\ one})=1-P(\mathrm{none})$. |
| Independence | $P(A\cap B)=P(A)P(B)$ | Independent $\neq$ mutually exclusive — exclusive events with positive $P$ are dependent. |
| Bayes | $P(B_j\mid A)=\dfrac{P(B_j)P(A\mid B_j)}{\sum_iP(B_i)P(A\mid B_i)}$ | Denominator is the **total probability of the evidence**, not the prior. |
| Binomial | $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$, $\mu=np$, $\sigma^2=npq$ | Keep **both** exponents. $P(X\ge1)=1-q^n$. |
| Geometric | $P(X=k)=q^{k-1}p$, $P(X>k)=q^k$, $\mu=1/p$ | Exponent $k-1$ for a trial count. Memoryless: $P(X>m+n\mid X>m)=q^n$. |
| Poisson | $P(X=k)=\dfrac{e^{-\lambda}\lambda^k}{k!}$, $\mu=\sigma^2=\lambda$ | Rescale $\lambda=rt$ for every window. $P(X\ge1)=1-e^{-\lambda}$. |
| Hypergeometric | $P(X=k)=\dfrac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}$, $\sigma^2=n\frac{K}{N}(1-\frac{K}{N})\frac{N-n}{N-1}$ | Without replacement. Drop the correction only when $n\le0.05N$. |
| Uniform | $\mu=\dfrac{a+b}{2}$, $\sigma^2=\dfrac{(b-a)^2}{12}$ | Divisor is 12, not 2 or 4. $P(c<X<d)=\dfrac{d-c}{b-a}$. |
| Exponential | $F=1-e^{-x/\beta}$, $P(X>x)=e^{-x/\beta}$, $\mu=\sigma=\beta$ | $\beta$ is the mean, $\lambda=1/\beta$ the rate. Median $=0.693\beta$; 90th percentile $=2.303\beta$. |
| Normal / z | $z=\dfrac{x-\mu}{\sigma}$; $z_{0.90}=1.282$, $z_{0.95}=1.645$, $z_{0.975}=1.960$, $z_{0.99}=2.326$, $z_{0.995}=2.576$ | $\Phi$ is the area to the **left**. Two-sided 95 % uses 1.96, one-sided 1.645. |
| CLT | $\bar X\sim N(\mu,\sigma^2/n)$, $\sigma_{\bar X}=\dfrac{\sigma}{\sqrt n}$, $S\sim N(n\mu,n\sigma^2)$ | About the mean, **not** about one observation. $n\ge30$ for mild skew. |
| Confidence interval | $\bar x\pm z_{\alpha/2}\dfrac{\sigma}{\sqrt n}$ or $\pm t_{\alpha/2,n-1}\dfrac{s}{\sqrt n}$; $\hat p\pm z\sqrt{\dfrac{\hat p(1-\hat p)}{n}}$ | Use $s$ with small $n$ $\Rightarrow$ use $t$. Interval uses $\hat p$; a test uses $p_0$. |
| Sample size | $n=\left(\dfrac{z\sigma}{E}\right)^2$; $n=\dfrac{z^2p(1-p)}{E^2}$ | Round **up**, always. Use $p=0.5$ only when no estimate exists. |
| Test statistic | $z=\dfrac{\bar x-\mu_0}{\sigma/\sqrt n}$; $t=\dfrac{\bar x-\mu_0}{s/\sqrt n},\ \nu=n-1$; $z=\dfrac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}$ | SE always has $\sqrt n$. $p_0$, not $\hat p$, in a test. |
| p-value | $p=2[1-\Phi(\lvert z\rvert)]$ two-tailed | Reject iff $p\le\alpha$ or $\lvert z\rvert>z_{\mathrm{crit}}$. |
| Errors | $\alpha=P(\mathrm{reject}\mid H_0)$, $\beta=P(\mathrm{fail\ to\ reject}\mid H_a)$, power $=1-\beta$ | Type I = false alarm (producer's risk); Type II = missed detection. |
| Sample size for power | $n=\dfrac{(z_{\alpha/2}+z_\beta)^2\sigma^2}{(\mu_0-\mu_a)^2}$ | Both $z$ terms are required; $z_\beta=1.282$ for 90 % power. |
| Regression | $b=\dfrac{n\sum xy-\sum x\sum y}{n\sum x^2-(\sum x)^2}$, $a=\bar y-b\bar x$ | Line passes through $(\bar x,\bar y)$ — a free check. |
| Pearson | $r=\dfrac{n\sum xy-\sum x\sum y}{\sqrt{[n\sum x^2-(\sum x)^2][n\sum y^2-(\sum y)^2]}}$ | $-1\le r\le1$, unitless. $b=r\,s_y/s_x$. $r=0.9\Rightarrow r^2=0.81$ (81 %, not 90 %). |

### Calculator shortcuts

- `MODE` `3` STAT → `Apps` → `Distr` → `R(` (upper tail), `Q(` (0 to $z$), `P(` (lower tail). All re-verified: `R(1.5)=0.066807`, `R(4)=3.1686\times10^{-5}`, `R(-0.75)=0.773373` (so $P(X<64)=1-R(-0.75)=0.226627$), `R(0.8)=0.211855` (so two-tailed $p=2R(0.8)=0.4237$), and $P(98<X<103)=R(-1)-R(1.5)=0.774538$.
- Same mode, `S-VAR` / `S-SUM` give $\bar x$, $\mathrm{x}\sigma n$ (population) and $\mathrm{x}\sigma n-1$ (sample). For $12,15,18,20,24,30,45$: $\bar x=23.4286$, $\mathrm{x}\sigma n-1=11.1931$, $s^2=125.29$, $CV=11.1931/23.4286=47.78\%$; `S-PTS` returns $Q_1=15$, $Q_3=30$.
- `MODE` `3` `2:Lin` (bivariate) then `Apps` → `Reg` returns `A`, `B`, `r` with no sums. For $(1,2),(2,4),(3,5),(4,8)$: $B=1.9$, $A=0$, $r=0.981156$.
- Counting keys `nCr` / `nPr` / `x!`: $\binom{48}{2}=1128$, $\binom{52}{2}=1326$, $\binom{16}{4}=1820$, $10!/(3!3!2!)=50400$.

### Traps that cost marks

- **$z=1.645$ for a two-sided 95 % interval.** That is the **90 %** two-sided (or 95 % one-sided) value. $n=36$, $\sigma=12$: 95 % gives $50\pm3.92=(46.08,53.92)$; 99 % gives $50\pm2.576(2)=(44.85,55.15)$.
- **Using $p=0.5$ in a confidence interval.** $\hat p$ belongs in the interval; 0.5 belongs only in sample-size planning. With $\hat p=0.30$, $n=400$: SE $=0.022913$, $0.30\pm0.0449=(0.2551,0.3449)$.
- **Using $\hat p$ in a test's standard error.** Tests assume $H_0$: $p_0=0.50$, $n=400$, $x=212$ gives SE $=0.025$, $z=1.20$, $p=0.230$.
- **Adding standard deviations instead of variances.** $N(100,100)+N(150,225)$ gives $\sigma=\sqrt{325}=18.03$, not $25$; $P(X+Y>280)=0.0480$, not $0.115$.
- **Using $\sigma$ instead of $\sigma/\sqrt n$.** For $\bar X$ over $n=40$ from a uniform $[0,10]$: z uses $0.456435$, so $P(\bar X>5.5)=0.1367$; using $\sigma=2.8868$ answers for one reading ($0.431$).
- **Rounding $n$ down.** $(1.96\times15/3)^2=96.04\Rightarrow n=97$. Tightening $E$ threefold costs nine times the sample ($E=1\Rightarrow865$).
- **Degrees of freedom off by one, or $\nu=n$.** $n=9$, $s=3$, $\bar x=25$: $\nu=8$, $t_{0.025,8}=2.306$, CI $(22.694,27.306)$; the z-version $(23.04,26.96)$ is too narrow. $n=15$, $s=2$, 90 %: $\nu=14$, $t=1.761$, CI $(11.09,12.91)$ — 13 is outside.
- **$r$ reported as the slope.** For $\hat y=1.9x$ the slope is $1.9$ and $r=0.9812$; $\lvert r\rvert>1$ is impossible.
- **Extrapolating the regression.** $\hat y=1.3+0.9x$ fitted on $x\in[1,5]$ gives $6.7$ at $x=6$ — a mild extrapolation, and not evidence of causation.
- **Poisson $\lambda$ not rescaled.** 3 calls/hour over two hours is $\lambda=6$: $P(X=4)=0.133853$, not $0.1680$.
- **Swapping the exponential tails.** $P(X>x)=e^{-x/\beta}$; $P(X\le x)=1-e^{-x/\beta}$. Reversing gives $0.393$ where $0.777$ was wanted.
- **Quartile convention slippage.** The vault's `02_Dispersion` P4 trap quotes $Q_1=50$, $Q_3=68$ for the include-the-median rule; that rule actually gives $Q_1=52$, $Q_3=65$, $\mathrm{IQR}=13$ and a fence of $84.5$ — so $95$ is still an outlier and the trap's stated numbers, method label and punchline disagree. Use the excluded-median convention above ($Q_1=51$, $Q_3=66.5$, fence $89.75$) and say so.

### Rapid-fire recall

- [ ] **Q1.** $P(98<X<103)$ for $N(100,2^2)$?
- [ ] **Q2.** $n=10$, $p=0.1$ — $P(X=2)$, $\mu$, $\sigma$?
- [ ] **Q3.** $n=20$, $p=0.05$ — $P(X\ge2)$?
- [ ] **Q4.** Geometric $p=0.05$ — $P(X=3)$ and the mean?
- [ ] **Q5.** $N=20$, $K=4$, $n=5$ — hypergeometric $P(X=1)$?
- [ ] **Q6.** $\bar x=102$, $\sigma=15$, $n=36$, $\mu_0=100$ — two-sided $p$ at $\alpha=0.05$?
- [ ] **Q7.** $z_{0.975}$ and $z_{0.95}$?
- [ ] **Q8.** Machine A $60\%$ @ $2\%$ defect, B $40\%$ @ $5\%$ — $P(A\mid D)$?
- [ ] **Q9.** Regression on $(1,2),(2,4),(3,5),(4,8)$ — slope, intercept, $r$?
- [ ] **Q10.** Exponential mean 1000 h — median and $P(X>500)$?

> [!success]- Answers
> **Q1.** $z_1=-1$, $z_2=1.5$; $\Phi(1.5)-\Phi(-1)=0.933193-0.158655=0.774538$; the right tail $P(X>103)=0.066807$.
> **Q2.** $\binom{10}{2}(0.1)^2(0.9)^8=45(0.01)(0.430467)=0.193710$; $\mu=1.0$, $\sigma=\sqrt{0.9}=0.9487$.
> **Q3.** $1-0.95^{20}-20(0.05)(0.95)^{19}=1-0.358486-0.377354=0.264160$.
> **Q4.** $(0.95)^2(0.05)=0.045125$; $\mu=1/0.05=20$ cycles ($\sigma^2=0.95/0.0025=380$).
> **Q5.** $\dfrac{\binom41\binom{16}{4}}{\binom{20}{5}}=\dfrac{4(1820)}{15504}=0.469556$; the binomial gives $0.4096$.
> **Q6.** SE $=2.5$, $z=0.800$, $p=2(1-0.788145)=0.4237$; $\lvert0.8\rvert<1.960$ — fail to reject.
> **Q7.** $1.960$ and $1.645$ — the second is one-sided 5 % (or 90 % two-sided).
> **Q8.** $0.012/(0.012+0.020)=0.012/0.032=0.375$; $P(B\mid D)=0.625$, and they sum to 1 ✓.
> **Q9.** $b=38/20=1.9$, $a=4.75-1.9(2.5)=0$, $r=38/\sqrt{20\times75}=38/38.7298=0.981156$, $r^2=0.9627$.
> **Q10.** Median $=1000\ln2=693.15$ h; $P(X>500)=e^{-0.5}=0.606531$.

### Drill — 4 minutes

**1.** Bolt diameters are $N(2.50,0.01^2)$ cm with specification $2.48$–$2.52$ cm. What fraction is acceptable? What limits capture the middle 95 %?

> [!success]- Solution
> $z_{\mathrm{lower}}=(2.48-2.50)/0.01=-2.00$, $z_{\mathrm{upper}}=+2.00$.
> $\Phi(2.00)-\Phi(-2.00)=0.977250-0.022750=0.954500$ — **95.45 %** acceptable, $4.55\%$ rejected (2.275 % each tail).
> $R(-2)-R(2)=0.954500$ on `Distr`, confirming both tails are counted.
> Middle 95 % leaves 2.5 % in each tail, so $z=1.960$: the limits are $2.50\pm1.96(0.01)=(2.4804,\ 2.5196)$ cm. Using $1.645$ would be the one-sided value and too narrow.

**2.** A relay fails to operate with probability $0.10$ per actuation, independently. In 10 actuations find $P(X=2)$. Separately, a component fails each cycle with $p=0.05$: give the geometric $P(X=3)$ and the mean cycles to first failure.

> [!success]- Solution
> Binomial: $P(X=2)=\binom{10}{2}(0.1)^2(0.9)^8=45(0.01)(0.43046721)=0.193710$, $\mu=np=1.0$, $\sigma=\sqrt{npq}=\sqrt{0.9}=0.9487$.
> Complement check: $P(X\ge1)=1-(0.9)^{10}=1-0.348678=0.651322$.
> Geometric: $P(X=3)=(0.95)^2(0.05)=0.9025(0.05)=0.045125$ — exponent $k-1=2$; using $k=3$ would give $0.0429$.
> Mean $=1/p=1/0.05=20$ cycles; variance $=(1-p)/p^2=0.95/0.0025=380$, $\sigma=19.49$.
> Cumulative check: $0.05+0.0475+0.045125=0.142625=1-0.95^3$ ✓.

**3.** A sample of 36 resistors has $\bar x=102\ \Omega$, $\sigma=15\ \Omega$ known, and the claim is $\mu_0=100\ \Omega$. Test at $\alpha=0.05$ two-sided and give the 95 % CI. Then, for 9 measurements with $\bar x=9.2$ and $s=2.5$ against $\mu_0=10$, name the correct test.

> [!success]- Solution
> $\mathrm{SE}=15/\sqrt{36}=2.5$; $z=(102-100)/2.5=0.800$.
> Two-tailed $p=2[1-\Phi(0.8)]=2(0.211855)=0.4237$; $1.960>0.800$, so **fail to reject** $H_0$.
> 95 % CI: $102\pm1.96(2.5)=102\pm4.9=(97.1,\ 106.9)$, which contains 100 — the same conclusion.
> Second case: $\sigma$ unknown and $n=9$ small, so use $t$ with $\nu=8$: $\mathrm{SE}=2.5/3=0.833333$, $t=(9.2-10)/0.833333=-0.960$, against $t_{0.025,8}=2.306$ — fail to reject. The 95 % CI is $9.2\pm2.306(0.833333)=(7.28,\ 11.12)$, which contains 10 ✓. Using $z=1.96$ would be the standard small-sample error.
