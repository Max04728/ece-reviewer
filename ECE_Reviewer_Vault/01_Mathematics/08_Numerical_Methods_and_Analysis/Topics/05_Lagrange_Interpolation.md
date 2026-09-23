---
id: MATH-08-05
title: "Lagrange Interpolation"
part: "01_Mathematics"
area: "08_Numerical_Methods_and_Analysis"
topic: 5
tier: 2
depth: full
problem_count: 4
prereqs: ["[[05_Taylor_and_Maclaurin_Series]]"]
tags: ["ece", "mathematics", "numerical_methods_and_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Lagrange Interpolation

> [!abstract] Scope
> Write and evaluate the Lagrange interpolating polynomial, including the linear and quadratic cases used for table lookups.

## Core Concept

> [!tip] Intuition
> Lagrange's form is a set of switches. Each term is a product of factors built so that it equals 1 at its own node and 0 at every other node, so the polynomial automatically passes through all the data — no simultaneous equations and no difference table needed.

**The cardinal basis functions do the work.** For nodes $x_0,\dots,x_n$, the basis function is defined as:
$$L_k(x)=\prod_{j\neq k}\frac{x-x_j}{x_k-x_j}$$
Then $L_k(x_k)=1$ and $L_k(x_j)=0$ for $j\neq k$, so $P(x)=\sum_k f(x_k)L_k(x)$ passes through every node by construction. There is nothing to solve: the polynomial is assembled directly from the data.

**The linear and quadratic templates are worth memorising.** Two points:
$$P(x)=f_0\frac{x-x_1}{x_0-x_1}+f_1\frac{x-x_0}{x_1-x_0}$$
— this is exactly the interpolation formula from the steam tables. Three points:
$$P(x)=f_0\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)}+f_1\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)}+f_2\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}$$
The denominators are constants; only the numerators depend on $x$.

**Cost and behaviour.** Lagrange needs no divided-difference table and handles arbitrarily spaced nodes, which is its advantage. Its disadvantages: adding one new data point forces a complete rebuild (every $L_k$ changes), and evaluating at many $x$ re-does the products each time. Newton's form is the better choice when data arrive incrementally; Lagrange is the better choice for a one-off fit at one point.

**Uniqueness means any correct form is the same polynomial.** Lagrange and Newton return identical results for identical data, so a discrepancy is always an arithmetic slip, never a 'different method'. On an exam, use the difference table if the x-values are equally spaced and the Lagrange product if the x-values are irregular.

**A useful application: derive a quadrature rule.** Applying the linear Lagrange polynomial over a pair of points and integrating gives the trapezoidal rule; applying the quadratic over three equally spaced points and integrating gives Simpson's one-third rule. This is *why* those rules have the coefficients they have — the weights are $\int L_k\,dx$.

**Error.** The same error term as any interpolating polynomial:
$$E(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^{n}(x-x_i)$$
Minimising the product term is what motivates choosing Chebyshev nodes when you are free to pick them — equally spaced nodes for quadratics give a Runge-phenomenon error that grows toward the ends of the interval.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Lagrange basis function | $L_k(x) = \prod_{j=0,\,j\neq k}^{n}\frac{x-x_j}{x_k-x_j}$ | Equals 1 at x_k and 0 at every other node. |
| Lagrange interpolating polynomial | $P(x) = \sum_{k=0}^{n} f(x_k)\,L_k(x)$ | Degree <= n. No linear system to solve. |
| Linear (two-point) form | $P(x) = f_0\frac{x-x_1}{x_0-x_1} + f_1\frac{x-x_0}{x_1-x_0}$ | The table-lookup formula. Use when the second difference is negligible. |
| Quadratic (three-point) form | $P(x) = f_0\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)} + f_1\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)} + f_2\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}$ | Use for irregular spacing; no equal-h requirement. |
| Cardinal property | $L_k(x_j) = \delta_{kj}$ | Kronecker delta: 1 if k = j, else 0. This is why no solving is needed. |
| Interpolation error | $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^{n}(x-x_i)$ | Get the product term as small as possible by choosing interior nodes. |
| Quadrature weights | $w_k = \int_a^b L_k(x)\,dx$ | Why the trapezoidal weights are h/2 and Simpson's are h/3 and 4h/3. |

## Worked Problems

### P1. Fit a Lagrange quadratic to $(0,1),(1,2),(3,10)$ and evaluate it at $x=2$.

**Given:** (0,1), (1,2), (3,10)

**Solution:**

1. L0(x) = (x-1)(x-3)/[(0-1)(0-3)] = (x^2 - 4x + 3)/3
2. L1(x) = (x-0)(x-3)/[(1-0)(1-3)] = (x^2 - 3x)/(-2) = (-x^2 + 3x)/2
3. L2(x) = (x-0)(x-1)/[(3-0)(3-1)] = (x^2 - x)/6
4. Check the switches at x=0: L0 = 3/3 = 1, L1 = 0, L2 = 0 — correct
5. P(x) = 1(x^2-4x+3)/3 + 2(-x^2+3x)/2 + 10(x^2-x)/6
6. = (x^2-4x+3)/3 + (-x^2+3x) + (5/3)(x^2-x)
7. Combine over 3: (x^2-4x+3) + (-3x^2+9x) + (5x^2-5x) all over 3 = (3x^2 + 0x + 3)/3 = x^2 + 1
8. Evaluate: P(2) = 4 + 1 = 5

> [!success]- Answer
> **$P(x)=x^{2}+1$, so $P(2)=5$.**

> [!warning] Trap
> Dropping a sign in the denominator of $L_1$ where $x_1-x_0=1$ and $x_1-x_2=-2$. The denominators are constants that can be negative; flipping one sign flips the whole term and the polynomial no longer passes through its own node.

### P2. Use one-point linear Lagrange interpolation (the table-lookup formula) on $(370,408.37)$ and $(375,415.92)$ to estimate $T$ at $373.6$ psia.

**Given:** (370, 408.37), (375, 415.92); x = 373.6

**Solution:**

1. L0(x) = (x - x1)/(x0 - x1) = (373.6 - 375)/(370 - 375) = (-1.4)/(-5) = 0.28
2. L1(x) = (x - x0)/(x1 - x0) = (373.6 - 370)/(375 - 370) = 3.6/5 = 0.72
3. Check the weights sum to 1: 0.28 + 0.72 = 1.00 (a free arithmetic check)
4. T = 408.37(0.28) + 415.92(0.72)
5. = 114.3436 + 299.4624
6. = 413.806

> [!success]- Answer
> **$T(373.6) \approx 413.81\ ^\circ\mathrm{F}$ by linear interpolation.**

> [!warning] Trap
> Reversing which node gets which weight. The weight multiplying $f_0$ must use the *other* node ($x_1$) in its numerator; swapping them gives the extrapolated value, not the interpolated one, and the two weights still sum to 1 so the error is hard to spot.

### P3. Prove that integrating the linear Lagrange polynomial over $[x_0,x_1]$ gives the trapezoidal rule.

**Given:** L0 and L1 linear over one panel; h = x1 - x0

**Solution:**

1. With x0 = a and x1 = a + h: L0(x) = (x - a - h)/(-h) = (a + h - x)/h; L1(x) = (x - a)/h
2. Integrate L0 over [a, a+h]: (1/h)[(a+h)x - x^2/2] from a to a+h
3. At the upper limit: (a+h)^2 - (a+h)^2/2 = (a+h)^2/2; at the lower: a(a+h) - a^2/2 = a^2/2 + ah
4. Difference: [(a+h)^2 - a^2]/2 - ah = [2ah + h^2]/2 - ah = h/2
5. By symmetry the integral of L1 is also h/2 (the two weights must sum to h because L0 + L1 = 1 identically)
6. Therefore ∫P dx = f0(h/2) + f1(h/2) = (h/2)[f0 + f1] — the trapezoidal rule

> [!success]- Answer
> **The weights are $\int L_0\,dx = h/2$ and $\int L_1\,dx = h/2$, giving $\frac{h}{2}(f_0+f_1)$.**

> [!warning] Trap
> Forgetting that $L_0+L_1=1$ for two nodes. That identity is the quickest check that the weights sum to the panel width $h$ — and it fails immediately if a denominator was copied with the wrong sign.

### P4. The same three data points $(0,1),(1,2),(3,10)$ are interpolated by Newton's divided-difference polynomial. Show that the two forms give identical coefficients after expansion.

**Given:** Lagrange form already found: x^2 + 1; Newton table for the same points

**Solution:**

1. Newton first differences: f[0,1] = (2-1)/(1-0) = 1; f[1,3] = (10-2)/(3-1) = 8/2 = 4
2. Newton second difference: f[0,1,3] = (4-1)/(3-0) = 3/3 = 1
3. Newton polynomial: P(x) = 1 + 1(x-0) + 1(x-0)(x-1) = 1 + x + x^2 - x = x^2 + 1
4. Both forms give exactly x^2 + 1
5. Uniqueness of the interpolating polynomial of degree <= 2 guarantees this in advance: there is only one such polynomial

> [!success]- Answer
> **Both reduce to $x^{2}+1$; the interpolating polynomial of degree $\le n$ through $n+1$ points is unique.**

> [!warning] Trap
> Believing the two methods can give different answers and hunting for an error in one of them. If the node set is the same, any disagreement is arithmetic — the uniqueness theorem rules out a genuine difference.

## Traps & Exam Notes

- **Sign errors in the constant denominators.** $\prod(x_k-x_j)$ can be negative; a sign slip in one $L_k$ breaks the cardinal property. Check $L_k(x_k)=1$ before evaluating anything else.
- **Using linear interpolation where the curvature is large.** With the steam-table data the linear result is several degrees off the quadratic one. If second differences are not negligible, two points are not enough.
- **Swapping which node appears in the numerator.** The weight on $f_0$ must use $x-x_1$, not $x-x_0$. Both wrong and right forms give weights that sum to one, so the mistake survives the obvious check.
- **Extrapolating with a two-point Lagrange form.** It is a straight line; past the last node the error grows linearly and there is no curvature term to correct it.
- **Rebuilding the whole polynomial when a point is added.** Mathematically valid but wasteful in an exam — recognise that Newton's form is the tool for incremental data and Lagrange for a one-off fit.
- **Forgetting that the polynomial is bounded by the node count.** Three points give at most a quadratic. Writing a cubic term into a three-point Lagrange fit means a basis function was copied from a four-point template.

## See Also

- [[04_Newton’s_Divided_Difference_Interpolation]]
- [[06_Trapezoidal_Rule]]
- [[07_Simpson’s_One-Third_and_Three-Eighth_Rules]]

---

[[04_Newton’s_Divided_Difference_Interpolation|⬅ 04]] · [[_MOC_Numerical_Methods_and_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Trapezoidal_Rule|06 ➡]]
