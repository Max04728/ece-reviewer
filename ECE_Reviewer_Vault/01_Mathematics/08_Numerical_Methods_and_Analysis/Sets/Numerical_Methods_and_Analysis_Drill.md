---
title: "Numerical Methods and Analysis — Drill"
type: drill
area: 08_Numerical_Methods_and_Analysis
part: 01_Mathematics
seed: 1
count: 8
pool: 51
updated: 2026-09-23
---

# Numerical Methods and Analysis — Practice Drill

**8 problems** drawn from a pool of 51 across 10 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 08_Numerical_Methods_and_Analysis --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. Evaluate $\displaystyle\int_1^2 \frac{dx}{x}$ with Simpson's three-eighth rule using $n=3$.

**Given:** f(x) = 1/x; n = 3 (divisible by 3), h = 1/3

> [!success]- Answer
> **$S_{3/8} = 0.69375$ versus the exact $0.693147$.**

> [!warning] Trap
> Applying the 1/3 weights 1-4-2-4 to three panels. With $n=3$ the 1/3 rule is illegal — there is no fourth interior node and the weights do not pair. Recognise the multiple-of-3 condition and switch rules.

<sub>from MATH-08-07</sub>

### 2. Find $\sqrt{2}$ by Newton-Raphson starting from $x_0=1$, using the iteration for $f(x)=x^{2}-2$.

**Given:** f(x) = x^2 - 2; f'(x) = 2x; x0 = 1

> [!success]- Answer
> **$x_3 = 1.414216$ (true $\sqrt{2}=1.4142136$).**

> [!warning] Trap
> Rounding each iterate to 3 decimals and continuing. The quadratic rate depends on carrying full precision; rounding to 1.42 at step 2 leaves an iterate that no longer improves.

<sub>from MATH-08-03</sub>

### 3. Use RK4 with $h=0.1$ on $\dfrac{dy}{dx}=x+y$, $y(0)=1$ to find $y(0.2)$.

**Given:** f(x,y) = x + y; y(0) = 1; h = 0.1

> [!success]- Answer
> **$y(0.2) \approx 1.242805$ versus the exact $1.242806$ — an error of $10^{-6}$ where Euler's error is $2\times10^{-2}$.**

> [!warning] Trap
> Evaluating $k_2$ and $k_3$ at the same argument or at $x_i+h$. Both midpoint stages use $x_i+h/2$; using $x_i+h$ for $k_3$ silently reduces the method to something third-order or worse, and the answer still looks reasonable.

<sub>from MATH-08-10</sub>

### 4. The same three data points $(0,1),(1,2),(3,10)$ are interpolated by Newton's divided-difference polynomial. Show that the two forms give identical coefficients after expansion.

**Given:** Lagrange form already found: x^2 + 1; Newton table for the same points

> [!success]- Answer
> **Both reduce to $x^{2}+1$; the interpolating polynomial of degree $\le n$ through $n+1$ points is unique.**

> [!warning] Trap
> Believing the two methods can give different answers and hunting for an error in one of them. If the node set is the same, any disagreement is arithmetic — the uniqueness theorem rules out a genuine difference.

<sub>from MATH-08-05</sub>

### 5. Prove that integrating the linear Lagrange polynomial over $[x_0,x_1]$ gives the trapezoidal rule.

**Given:** L0 and L1 linear over one panel; h = x1 - x0

> [!success]- Answer
> **The weights are $\int L_0\,dx = h/2$ and $\int L_1\,dx = h/2$, giving $\frac{h}{2}(f_0+f_1)$.**

> [!warning] Trap
> Forgetting that $L_0+L_1=1$ for two nodes. That identity is the quickest check that the weights sum to the panel width $h$ — and it fails immediately if a denominator was copied with the wrong sign.

<sub>from MATH-08-05</sub>

### 6. Repeat the same root with regula falsi on $[2,3]$ for 3 iterations and compare the interval length with bisection.

**Given:** f(2) = -1; f(3) = +16

> [!success]- Answer
> **$c_3 = 2.089639$ — closer to the root $2.094551$ than bisection's $2.125$ at the same cost, but the bracket barely shrank.**

> [!warning] Trap
> Using the interval width as the error estimate for regula falsi. After 3 iterations the bracket is still 0.91 wide while the estimate is accurate to 0.005 — the width is meaningless here, and only $|f(c)|$ or consecutive estimates reveal the real accuracy.

<sub>from MATH-08-02</sub>

### 7. Show that halving $h$ halves the error by redoing the previous problem with $h=0.1$, and estimate the step size for $1\%$ relative accuracy.

**Given:** same ODE, h = 0.1; exact y(1) = 2.640859

> [!success]- Answer
> **$y(1)=2.5438$ at $h=0.1$; errors fall in the ratio $1.88\approx2$, confirming $O(h)$. About $h\approx0.027$ (37 steps) is needed for $1\%$.**

> [!warning] Trap
> Assuming the error falls as $h^{2}$ because the local truncation error is $h^{2}$. There are $1/h$ steps, so the global error is $O(h)$ — the second-order claim belongs to Heun and Runge-Kutta.

<sub>from MATH-08-08</sub>

### 8. A steam table gives saturation temperature versus pressure: $(360,393.04)$, $(365,400.75)$, $(370,408.37)$, $(375,415.92)$, $(380,423.41)$. Estimate $T$ at $373.6$ psia by Newton's forward-difference formula.

**Given:** five equally spaced points, h = 5 psia; x = 373.6, x0 = 360

> [!success]- Answer
> **$T(373.6) \approx 397.23\ ^\circ\mathrm{F}$.**

> [!warning] Trap
> Substituting the raw $x$-value 373.6 into the polynomial instead of the index $p=(x-x_0)/h=2.72$. The forward-difference form is written in $p$, and feeding it 373.6 makes every term astronomically large.

<sub>from MATH-08-04</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| MATH-08-01 | Error Analysis, Roundoff and Truncation | 5 |
| MATH-08-02 | Bisection and Regula Falsi | 3 |
| MATH-08-03 | Newton-Raphson and Secant | 9 |
| MATH-08-04 | Newton’s Divided Difference Interpolation | 4 |
| MATH-08-05 | Lagrange Interpolation | 4 |
| MATH-08-06 | Trapezoidal Rule | 5 |
| MATH-08-07 | Simpson’s One-Third and Three-Eighth Rules | 6 |
| MATH-08-08 | Euler’s Method | 5 |
| MATH-08-09 | Modified Euler and Heun’s Method | 5 |
| MATH-08-10 | Runge-Kutta 4th Order | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
