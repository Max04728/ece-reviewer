---
title: Numerical Methods and Analysis
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 12
---

# Numerical Methods and Analysis
#numerical #errors #rootfinding #interpolation #integration #ode

## Part A — Errors and Root Finding

### 1. Error Analysis, Roundoff and Truncation

**True and approximate error ★**

$$E_t = x_{true} - x_{approx},\ \ \varepsilon_t = \frac{E_t}{x_{true}}\times 100\%,\qquad E_a = x_{present} - x_{previous},\ \ \varepsilon_a = \frac{E_a}{x_{present}}\times 100\%$$

**Conditions:** $x_{true}$ is the exact value.

**Stopping criterion, roundoff and machine epsilon ★** — stop when $|\varepsilon_a| \leq \varepsilon_s$; base $b$, $t$ mantissa digits.

$$\varepsilon_s = \left(0.5\times 10^{2-n}\right)\%,\qquad n = 2 - \log_{10}(\varepsilon_s),\qquad \epsilon_{mach} = b^{1-t}$$

$$|\varepsilon_t| \leq b^{1-t}\ \text{(chopping)},\qquad |\varepsilon_t| \leq \tfrac{1}{2}b^{1-t}\ \text{(rounding)}$$

**Taylor truncation and error propagation ★** — step $h = x_{i+1}-x_i$:

$$f(x_{i+1}) = f(x_i) + f'(x_i)h + \frac{f''(x_i)}{2!}h^2 + \cdots + \frac{f^{(n)}(x_i)}{n!}h^n + R_n$$

$$R_n = \frac{f^{(n+1)}(\xi)}{(n+1)!}h^{n+1},\quad x_i < \xi < x_{i+1},\qquad |\Delta y| = |\Delta a| + |\Delta b|$$

**Relative error rule** ([[01_Differential_Calculus#7. Differentials and Error Propagation|Differentials and Error Propagation]]) — quotients add, powers multiply:

$$\frac{|\Delta y|}{|y|} \approx \frac{|\Delta a|}{|a|} + \frac{|\Delta b|}{|b|},\qquad y = a^n \Rightarrow \frac{|\Delta y|}{|y|} \approx n\frac{|\Delta a|}{|a|}$$

> [!warning] Exam trap
> $E_a$ is **not** the true error — only $E_t$ needs $x_{true}$. A sign flip in $\varepsilon_a$ between iterations is the classic false-convergence signal.

---

### 2. Bisection and Regula Falsi

![](https://www.youtube.com/watch?v=hqlQeWRPyvI)

*Video: Regula Falsi Method in 5 Minutes — Smart Engineer, 5:52*

**Bracketing requirement ★**

$$x_r = \frac{a+b}{2}\quad\text{(bisection: keep the half that still brackets the root)}$$

**Symbols**

- $x_r$ — approximate root (midpoint of the current bracket), in the same unit as $x$
- $a$, $b$ — lower and upper endpoints of the current bracket, in the same unit as $x$

**Conditions:** $f(x)$ continuous on $[a,b]$ and $f(a)\,f(b) < 0$.

**Error bound and iterations needed for tolerance $\varepsilon_s$ ★**

$$|E_t| \leq \frac{b-a}{2^{n+1}},\qquad n \geq \frac{\log_{10}(b-a) - \log_{10}\varepsilon_s}{\log_{10}2} \approx \frac{\ln\left(\frac{b-a}{\varepsilon_s}\right)}{\ln 2}$$

**Symbols**

- $E_t$ — true error of the root estimate, in the same unit as $x$
- $n$ — number of bisection iterations required, dimensionless (integer)
- $\varepsilon_s$ — preset stopping tolerance on the relative error, dimensionless (in %)

**Regula falsi (false position) ★** — superlinear, but one endpoint stagnates:

$$x_r = b - \frac{f(b)(a-b)}{f(a)-f(b)} = \frac{a\,f(b) - b\,f(a)}{f(b)-f(a)}$$

**Symbols**

- $x_r$ — regula falsi root estimate (false-position point), in the same unit as $x$
- $f(a)$, $f(b)$ — function values at the bracket endpoints, in the same unit as $f(x)$

**Convergence comparison**

| Method | Order | Rate / behaviour |
|---|---|---|
| Bisection | linear, order $1$ | rate $\tfrac{1}{2}$; guaranteed once bracketed |
| Regula falsi | superlinear | fast, but one endpoint stagnates |

> [!tip] High-yield ★
> The bound $\frac{b-a}{2^{n+1}}$ buys one binary digit per halving — about $0.301$ decimal digits, so round $n$ **up**.

---

### 3. Newton-Raphson and Secant

**Newton-Raphson ★**

$$x_{i+1} = x_i - \frac{f(x_i)}{f'(x_i)},\qquad E_{t,i+1} \approx \frac{f''(\xi)}{2f'(x_i)}E_{t,i}^2\ \text{(quadratic, order }2)$$

**Conditions:** $f$ differentiable, $f'(x_i)\neq 0$.

![](https://www.youtube.com/watch?v=PIPiv6gn_Ls)

*Video: How to Use the Newton-Raphson Method — ExamSolutions, 12:24*

**Convergence condition and iteration bound** — fails at $f'(x)\approx 0$ and at repeated roots:

$$\left|\frac{f(x)f''(x)}{[f'(x)]^2}\right| < 1,\qquad |E_{t,i+1}| \leq \frac{|f''(\xi)|}{2|f'(x_i)|}E_{t,i}^2$$

**Secant method ★** — two starting points, no derivative required:

$$x_{i+1} = x_i - \frac{f(x_i)(x_{i-1}-x_i)}{f(x_{i-1}) - f(x_i)},\qquad \text{order } \varphi = \frac{1+\sqrt5}{2}\approx 1.618$$

**Modified Newton — repeated root of multiplicity $m$**

$$x_{i+1} = x_i - \frac{f f'}{(f')^2 - f f''} \quad\text{or}\quad x_{i+1} = x_i - m\frac{f}{f'}$$

> [!tip] High-yield ★
> Given $|\varepsilon_a| \leq \varepsilon_s$ and a starting value, Newton usually converges in 3–5 iterations; bisection needs ~3.3 per decimal digit.

> [!example] Calculator — iterate in one keystroke, and check with `SOLVE`
> Store the starting value in `X`, then key the Newton step **using `Ans`** so each `=` performs one iteration:
> `Ans - f(Ans)/f'(Ans)` — press `=` repeatedly and read the convergence.
> Better still, when the item only wants **the root**, use `SHIFT` `SOLVE` on `f(X)=0` and read `L−R` for the residual; the manual labels that line "precision of solution".
> **Verified:** $x^{3}-2x-5=0$ → $x=2.0945514815$ with residual $<10^{-15}$, in agreement with a 60-step hand Newton iteration.
> Use `MODE` → TABLE to **bracket** the root first when you are unsure of a starting guess.

---

## Part B — Interpolation and Integration

### 4. Newton's Divided Difference Interpolation

![](https://www.youtube.com/watch?v=hcsBjizQ9X8)

*Video: Newton's Divided Differences Interpolation Polynomial — AF Math & Engineering, 10:37*

**Zeroth, first and higher differences ★**

$$f[x_i] = f(x_i),\quad f[x_i,x_j] = \frac{f(x_j)-f(x_i)}{x_j-x_i},\quad f[x_i,\dots,x_k] = \frac{f[x_{i+1},\dots,x_k] - f[x_i,\dots,x_{k-1}]}{x_k - x_i}$$

**Newton interpolating polynomial and error ★**

$$f_n(x) = f[x_0] + \sum_{k=1}^{n} f[x_0,x_1,\dots,x_k]\prod_{j=0}^{k-1}(x-x_j),\qquad R_n = f[x,x_0,\dots,x_n]\prod_{i=0}^{n}(x-x_i)$$

**Divided-difference table layout** — with $x_0<x_1<x_2$:

| $x_i$ | $f(x_i)$ | First | Second | Third |
|---|---|---|---|---|
| $x_0$ | $f[x_0]$ | $f[x_0,x_1]$ | $f[x_0,x_1,x_2]$ | $f[x_0,x_1,x_2,x_3]$ |
| $x_1$ | $f[x_1]$ | $f[x_1,x_2]$ | $f[x_1,x_2,x_3]$ | |
| $x_2$ | $f[x_2]$ | $f[x_2,x_3]$ | | |
| $x_3$ | $f[x_3]$ | | | |

**Conditions:** nodes $x_0,\dots,x_n$ must be distinct with $f$ tabulated there; the table gives the unique interpolating polynomial of degree $\le n$; adding a node reuses earlier differences (unlike Lagrange); accuracy collapses outside the tabulated range (extrapolation).

---

### 5. Lagrange Interpolation

![](https://www.youtube.com/watch?v=WCGKqJrf4N4)

*Video: Lagrange Interpolating Polynomial — Easy Method — AF Math & Engineering, 8:11*

**Basis polynomials ★**

$$P_n(x) = \sum_{i=0}^{n} f(x_i)L_i(x),\qquad L_i(x) = \prod_{\substack{j=0\\ j\neq i}}^{n} \frac{x-x_j}{x_i-x_j}$$

**Conditions:** $n+1$ distinct nodes $x_0,\dots,x_n$.

**Linear and quadratic forms ★**

$$P_1(x) = \frac{x-x_1}{x_0-x_1}f_0 + \frac{x-x_0}{x_1-x_0}f_1$$

$$\begin{aligned}
P_2(x) ={}& \frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)}f_0 + \frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)}f_1\\
&+ \frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}f_2
\end{aligned}$$

**Partition of unity and error term**

$$\sum_i L_i(x) = 1,\qquad E_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^{n}(x-x_i),\quad \xi \in (\min x_i, \max x_i)$$

Equal spacing reduces these to the Newton forward/backward difference forms.

> [!warning] Exam trap
> Lagrange degree is $n$ for $n+1$ points. Adding a point forces a full rebuild — divided differences only append a term.

---

### 6. Trapezoidal Rule

**Single and composite segments ★**

$$I \approx \frac{b-a}{2}\left[f(a)+f(b)\right],\qquad I \approx \frac{h}{2}\left[f(x_0) + 2\sum_{i=1}^{n-1}f(x_i) + f(x_n)\right]$$

**Conditions:** $f$ continuous on $[a,b]$; $h=\frac{b-a}{n}$.

**Error terms ★** — single segment, then composite:

$$E_t = -\frac{1}{12}f''(\xi)(b-a)^3,\quad \xi \in (a,b),\qquad E_t = -\frac{(b-a)}{12}h^2 f''(\xi) = O(h^2)$$

**Romberg extrapolation** ([[02_Integral_Calculus#3. Definite Integrals and FTC|Definite Integrals and FTC]]):

$$I_{k,j} = \frac{4^{j-1}I_{k,j-1}-I_{k-1,j-1}}{4^{j-1}-1}$$

---

### 7. Simpson's One-Third and Three-Eighth Rules

**Simpson $1/3$ ★**

$$I \approx \frac{h}{3}\left[f_0 + 4f_1 + f_2\right]$$

$$I \approx \frac{h}{3}\Big[f_0 + 4\!\!\sum_{i\ \text{odd}}\!\! f_i + 2\!\!\sum_{i\ \text{even}\neq 0,n}\!\! f_i + f_n\Big]$$

**Conditions:** single use = 2 panels, $h=\frac{b-a}{2}$; composite needs $n$ even, $h=\frac{b-a}{n}$.

![](https://www.youtube.com/watch?v=7EqRRuh-5Lk)

*Video: Simpson's Rule and Numerical Integration — The Organic Chemistry Tutor, 12:11*

**$1/3$ errors ★**

$$E_t = -\frac{1}{90}\left(\frac{b-a}{2}\right)^5 f^{(4)}(\xi),\qquad E_t = -\frac{(b-a)}{180}h^4 f^{(4)}(\xi) = O(h^4)$$

**Simpson $3/8$ and its errors ★** — 3 panels, $h=\frac{b-a}{3}$, $n$ a multiple of 3:

$$I \approx \frac{3h}{8}\left[f_0 + 3f_1 + 3f_2 + f_3\right],\quad E_t = -\frac{3}{80}h^5 f^{(4)}(\xi),\quad E_t = -\frac{(b-a)}{80}h^4 f^{(4)}(\xi)$$

**Rule summary**

| Rule | Panels per step | Coefficients (interior) | Degree exact | Error $O$ |
|---|---|---|---|---|
| Trapezoidal | 1 | $1,\,1$ | 1 | $h^2$ |
| Simpson $1/3$ | 2 | $1,\,4,\,2,\,4,\dots,1$ | 3 | $h^4$ |
| Simpson $3/8$ | 3 | $1,\,3,\,3,\,2,\,3,\,3,\dots,1$ | 3 | $h^4$ |
| Boole / $2/45$ | 4 | $7,\,32,\,12,\,32,\,7$ | 5 | $h^6$ |

> [!example] Calculator — evaluate the rule, then verify with `∫(`
> The composite rules are weighted sums, but `Σ` cannot alternate weights on odd/even indices, so the practical route is:
> **Let the calculator do the quadrature** with `∫(f(x), a, b, n)` and use the rule only to *show* the method or when the item specifies $n$.
> If the item demands the rule's own arithmetic, tabulate the $f_i$ with `MODE` → TABLE, then accumulate the weighted sum in a letter variable — the alternation `4,2,4,2,…` is the only manual step.
> **Verified:** $n=8$ on $\frac{1}{1+x^2}$ over $[0,1]$ → trapezoid $0.784747$, Simpson $0.785398$ against $\pi/4=0.785398$.
> `∫` and `d/dx` are **COMP mode only** and require **radian** measure for trig. They cannot nest with each other or with `Σ`, `Π`, `Pol`, `Rec`.

> [!tip] High-yield ★
> Composite Simpson $1/3$ needs an **even** number of panels; $3/8$ needs a multiple of 3. Mixed panels: apply $3/8$ to 3 panels + $1/3$ to the rest.

---

## Part C — Initial Value Problems

### 8. Euler's Method

**Explicit step ★**

$$y_{i+1} = y_i + f(x_i,y_i)\,h$$

**Symbols**

- $y_i$ — computed solution at the point $x_i$, in the SI unit of the dependent variable $y$
- $y_{i+1}$ — solution advanced one step to $x_{i+1}$, in the same unit as $y$
- $f(x_i,y_i)$ — derivative $y'$ evaluated at $(x_i,y_i)$, in the unit of $y$ per unit of $x$
- $h = x_{i+1}-x_i$ — step size, in the same unit as $x$

**Exactness case ★** — Euler's method is exact when $y'$ is constant, because the tangent coincides with the solution over every step.

$$y'=c\ \Rightarrow\ y_{n+1}=y_n+ch\ \text{is exact for all }h;\qquad \text{global error }O(h)\ \text{otherwise}$$

**Symbols**

- $c$ — constant value of the derivative $y'$, in the unit of $y$ per unit of $x$
- $y_n$, $y_{n+1}$ — exact solution at consecutive steps, in the same unit as $y$
- $O(h)$ — first-order global error of the method, dimensionless

**Conditions:** $y' = f(x,y)$, $y(x_0)=y_0$, step $h = x_{i+1}-x_i$.

**Taylor basis and error ★** — with $y'_i = f(x_i,y_i)$:

$$y_{i+1} = y_i + y'_i h + \frac{y''_i}{2}h^2 + \cdots,\qquad \text{LTE} = \frac{h^2}{2}y''(\xi) = O(h^2),\quad \text{global } O(h)$$

**Symbols**

- $\text{LTE}$ — local truncation error (error committed in a single step), in the same unit as $y$
- $y''(\xi)$ — second derivative at an interior point of the step, in the unit of $y$ per unit of $x$ squared
- $\xi$ — point inside the step interval, $x_i < \xi < x_{i+1}$, in the same unit as $x$
- $O(h^2)$, $O(h)$ — local and global orders of the error, dimensionless

**Step-halving error estimate** — $p=1$ for Euler:

$$E \approx \frac{y(h/2) - y(h)}{2^p - 1}$$

**Symbols**

- $E$ — estimated error of the coarser solution, in the same unit as $y$
- $y(h)$ — solution computed with step $h$, in the same unit as $y$
- $y(h/2)$ — solution computed with half the step, $h/2$, in the same unit as $y$
- $p$ — order of the method, dimensionless ($p=1$ for Euler)

---

### 9. Modified Euler and Heun's Method

![](https://www.youtube.com/watch?v=zRcxBXAaLks)

*Video: Modified Euler's Method / Heun's Method — Maths With Hanif, 17:04*

**Heun (predictor–corrector, trapezoidal) ★**

$$y^0_{i+1} = y_i + f(x_i,y_i)h,\qquad y_{i+1} = y_i + \frac{h}{2}\left[f(x_i,y_i) + f\!\left(x_{i+1},\,y^0_{i+1}\right)\right]$$

Local truncation error $O(h^3)$.

**Conditions:** $f$ continuous, step $h$.

**Iterative (improved) Euler** — iterate until $|y^{(k)}-y^{(k-1)}|\leq \varepsilon_s$:

$$y^{(k)}_{i+1} = y_i + \frac{h}{2}\left[f(x_i,y_i) + f\!\left(x_{i+1},y^{(k-1)}_{i+1}\right)\right]$$

**Modified Euler (midpoint / RK2) ★** — second order, global $O(h^2)$:

$$y_{i+1/2} = y_i + f(x_i,y_i)\frac{h}{2},\qquad y_{i+1} = y_i + f\!\left(x_{i+1/2},\,y_{i+1/2}\right)h$$

## Part D — Numerical Differentiation and Linear Systems

### 11. Numerical Differentiation

**Difference formulas ★** — $h$ the step, in the same unit as $x$.

| Formula | Expression | Truncation error |
|---|---|---|
| Forward | $f'(x)\approx\frac{f(x+h)-f(x)}{h}$ | $O(h)$ |
| Backward | $f'(x)\approx\frac{f(x)-f(x-h)}{h}$ | $O(h)$ |
| Central | $f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}$ | $O(h^2)$ |
| Central second derivative | $f''(x)\approx\frac{f(x+h)-2f(x)+f(x-h)}{h^2}$ | $O(h^2)$ |

**Richardson extrapolation ★** — combining two central estimates cancels the leading $O(h^2)$ term.

$$f'(x)\approx\frac{4f_{c}(h/2)-f_{c}(h)}{3}\ \Rightarrow\ O(h^4)$$

**Optimum step** — round-off grows as $\varepsilon/h$ while truncation falls as $h^2$, so the error is minimised near $h\approx\sqrt[3]{\varepsilon}$ for the central form.

**Conditions:** $f$ smooth enough that the stated derivatives exist and are continuous; the central form needs function values on both sides, so it cannot be used at the interval endpoints (use forward or backward there); $h$ must be small for accuracy but not so small that subtractive cancellation in floating point dominates. #numerical

> [!tip] High-yield ★
> Halving $h$ halves the error of a forward difference but quarters that of a central difference — the order of the method is what board items ask for, not the arithmetic.

---

### 12. Iterative Linear Solvers

![](https://www.youtube.com/watch?v=6cMphYpqtsw)

*Video: Gauss-Jacobi vs Gauss-Seidel Method — The Concept Guy, 8:19*

**Jacobi and Gauss-Seidel ★** — solve $A\vec x=\vec b$ by repeated substitution, $a_{ii}\neq0$.

$$x_i^{(k+1)}=\frac1{a_{ii}}\left(b_i-\sum_{j\ne i}a_{ij}x_j^{(k)}\right)\ \text{(Jacobi — all old values)}$$

$$x_i^{(k+1)}=\frac1{a_{ii}}\left(b_i-\sum_{j<i}a_{ij}x_j^{(k+1)}-\sum_{j>i}a_{ij}x_j^{(k)}\right)\ \text{(Gauss-Seidel — newest values)}$$

**Symbols**

- $A$ — coefficient matrix of the system, in the unit of its entries (dimensionless for a pure-coefficient system)
- $\vec x$ — vector of unknowns, in the unit of $x_i$
- $\vec b$ — right-hand-side vector, in the same unit as $A\vec x$
- $x_i^{(k)}$ — value of unknown $i$ at iteration $k$, in the unit of $x_i$
- $x_i^{(k+1)}$ — updated value of unknown $i$, in the same unit as $x_i$
- $a_{ii}$ — diagonal entry of $A$ in row $i$ (non-zero), in the unit of the entries of $A$
- $a_{ij}$ — off-diagonal entry of $A$ in row $i$, column $j$, in the unit of the entries of $A$
- $b_i$ — $i$th entry of the right-hand-side vector, in the same unit as $b$
- $k$ — iteration index, dimensionless (integer)
- $i$, $j$ — row and column indices, dimensionless (integers)

**Convergence: strict diagonal dominance ★**

$$\lvert a_{ii}\rvert>\sum_{j\ne i}\lvert a_{ij}\rvert\ \text{for every }i\qquad\Rightarrow\qquad \text{both methods converge for any starting vector}$$

**Symbols**

- $D$ — diagonal part of $A$ (holds the $a_{ii}$), in the unit of the entries of $A$
- $L$ — strictly lower-triangular part of $A$ (entries $a_{ij}$ with $j<i$), in the unit of the entries of $A$
- $U$ — strictly upper-triangular part of $A$ (entries $a_{ij}$ with $j>i$), in the unit of the entries of $A$

Gauss-Seidel typically converges about twice as fast as Jacobi and needs only one storage vector, which is why it is preferred when the dominance test passes.

**Conditions:** $A$ square with non-zero diagonal; strict diagonal dominance is sufficient but not necessary for convergence; the iteration matrix of Jacobi is $-D^{-1}(L+U)$ and of Gauss-Seidel $-(D+L)^{-1}U$, each required to have spectral radius below 1; an ill-conditioned $A$ can diverge even when the test is nearly satisfied. #numerical

> [!warning] Exam trap
> A matrix can be **not** diagonally dominant and still converge, and a symmetric matrix that is not dominant can diverge. The dominance test is a guarantee, not the only route.

---

---

### 10. Runge-Kutta 4th Order

**Stage slopes ★**

$$k_1 = f(x_i,y_i),\qquad k_2 = f\!\left(x_i+\frac{h}{2},\,y_i+\frac{h k_1}{2}\right),\qquad k_3 = f\!\left(x_i+\frac{h}{2},\,y_i+\frac{h k_2}{2}\right)$$

$$k_4 = f\!\left(x_i+h,\,y_i+h k_3\right),\qquad y_{i+1} = y_i + \frac{h}{6}\left(k_1 + 2k_2 + 2k_3 + k_4\right)\ (\text{LTE } O(h^5),\ O(h^4))$$

**Conditions:** $y'=f(x,y)$; four function evaluations per step.

![](https://www.youtube.com/watch?v=1YZnic1Ug9g)

*Video: 4th-Order Runge-Kutta Method for ODEs — LearnChemE, 12:07*

**Systems of ODEs** — with $\mathbf{k}_1 = \mathbf{f}(x_i,\mathbf{y}_i)$:

$$\mathbf{k}_2 = \mathbf{f}\!\left(x_i+\tfrac{h}{2},\ \mathbf{y}_i+\tfrac{h}{2}\mathbf{k}_1\right)$$

$$\mathbf{k}_3 = \mathbf{f}\!\left(x_i+\tfrac{h}{2},\ \mathbf{y}_i+\tfrac{h}{2}\mathbf{k}_2\right),\ \mathbf{k}_4 = \mathbf{f}\!\left(x_i+h,\ \mathbf{y}_i+h\mathbf{k}_3\right)$$

$$\mathbf{y}_{i+1} = \mathbf{y}_i + \frac{h}{6}\left(\mathbf{k}_1+2\mathbf{k}_2+2\mathbf{k}_3+\mathbf{k}_4\right)$$

**Butcher tableau ($c$–$A$–$b$)**

| $0$ | | | |
|---|---|---|---|
| $1/2$ | $1/2$ | | |
| $1/2$ | $0$ | $1/2$ | |
| $1$ | $0$ | $0$ | $1$ |
| $b$ | $1/6$ | $1/3$ | $1/3$ | $1/6$ |

> [!tip] High-yield ★
> Stiff or unstable IVPs: smaller $h$; RK4 with step halving error estimate $E \approx \dfrac{y(h/2)-y(h)}{15}$.

> [!warning] Exam trap
> Euler and RK4 step on the **dependent** variable via $f$ only. Never re-derive $y'$ analytically for RK4 — it is a function evaluation scheme.

→ Back to [[00_Index]]
