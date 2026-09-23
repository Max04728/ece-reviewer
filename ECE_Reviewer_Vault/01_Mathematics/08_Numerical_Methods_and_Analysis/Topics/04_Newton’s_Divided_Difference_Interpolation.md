---
id: MATH-08-04
title: "Newton’s Divided Difference Interpolation"
part: "01_Mathematics"
area: "08_Numerical_Methods_and_Analysis"
topic: 4
tier: 2
depth: full
problem_count: 4
prereqs: ["[[05_Taylor_and_Maclaurin_Series]]"]
tags: ["ece", "mathematics", "numerical_methods_and_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Newton’s Divided Difference Interpolation

> [!abstract] Scope
> Build the Newton divided-difference table, write the interpolating polynomial from its top diagonal, and evaluate interior points with the forward-difference form.

## Core Concept

> [!tip] Intuition
> A divided difference is a slope. The first-order difference is the slope of a chord, the second-order difference is the slope of slopes — a curvature — and the top diagonal of the table gives the coefficients of the unique polynomial through all the points.

**The divided differences are defined recursively.** $f[x_i]=f(x_i)$. The first order is:
$$f[x_i,x_{i+1}]=\frac{f(x_{i+1})-f(x_i)}{x_{i+1}-x_i}$$
In general:
$$f[x_i,\dots,x_{i+k}]=\frac{f[x_{i+1},\dots,x_{i+k}]-f[x_i,\dots,x_{i+k-1}]}{x_{i+k}-x_i}$$
Each entry is the difference of the two entries diagonally above and to its left, divided by the difference of the two x-values that span it. The table is built left to right, column by column.

**The top diagonal is the answer.** Newton's divided-difference form is:
$$P(x)=f[x_0]+f[x_0,x_1](x-x_0)+f[x_0,x_1,x_2](x-x_0)(x-x_1)+\cdots$$
The coefficients are exactly the first entry of each column: $f[x_0]$, $f[x_0,x_1]$, $f[x_0,x_1,x_2]$, etc. Read them down the top-left to bottom-right diagonal, not across a row.

**Uniqueness and the degree test.** For $n+1$ distinct points there is exactly one polynomial of degree $\le n$ through them, so Newton, Lagrange and the direct solve of the Vandermonde system all produce the *same* polynomial — only the algebraic form differs. Consequence: if the $(n+1)$-th divided difference is zero, the data lie exactly on a polynomial of lower degree. A zero third difference means a quadratic fits all four points exactly.

**Newton's forward-difference form for equally spaced data.** With spacing $h$ and $p=\frac{x-x_0}{h}$, the working form is:
$$P(x)=f_0+p\Delta f_0+\frac{p(p-1)}{2!}\Delta^{2}f_0+\frac{p(p-1)(p-2)}{3!}\Delta^{3}f_0+\cdots$$
where $\Delta$ is the ordinary forward difference. This is the form used for steam tables, log tables and calibration charts, because the differences are already tabulated in steps of $h$ and no divisions are needed.

**Error and extrapolation.** The interpolation error is:
$$\frac{f^{(n+1)}(\xi)}{(n+1)!}\prod(x-x_i)$$
Accuracy is therefore best *inside* the data range and degrades as you move outward. For equally spaced data with a smooth function, the error is bounded by $\frac{h^{n+1}}{4(n+1)}\max|f^{(n+1)}|$ over the interval. Do not extrapolate outside the table: the product term grows without bound and the polynomial can swing wildly.

**Adding a point costs one row, not a rebuild.** Because the Newton form is nested in the order the points are introduced, adding a new point appends one divided difference to the polynomial without recomputing the old coefficients. That is the practical advantage over Lagrange's form when data arrive incrementally.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| First divided difference | $f[x_i,x_{i+1}] = \frac{f(x_{i+1})-f(x_i)}{x_{i+1}-x_i}$ | The chord slope over the two points. |
| General divided difference | $f[x_i,\dots,x_{i+k}] = \frac{f[x_{i+1},\dots,x_{i+k}]-f[x_i,\dots,x_{i+k-1}]}{x_{i+k}-x_i}$ | Recursion that fills the table column by column. |
| Newton divided-difference polynomial | $P(x) = f[x_0] + \sum_{k=1}^{n} f[x_0,\dots,x_k]\prod_{j=0}^{k-1}(x-x_j)$ | Coefficients are the top diagonal of the table. |
| Forward-difference form | $P(x) = f_0 + p\Delta f_0 + \frac{p(p-1)}{2!}\Delta^{2}f_0 + \cdots, \quad p=\frac{x-x_0}{h}$ | Equally spaced data only. p is a dimensionless index, not an x-value. |
| Interpolation error | $E(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod_{i=0}^{n}(x-x_i)$ | xi lies in the smallest interval containing the nodes and x. |
| Equally spaced error bound | $\lvert E \rvert \le \frac{h^{n+1}}{4(n+1)}\max\lvert f^{(n+1)} \rvert$ | Valid for x inside the tabulated range. |
| Degree test | $f[x_0,\dots,x_k]=0 \Rightarrow \mathrm{data\ fit\ a\ polynomial\ of\ degree} < k$ | A zero k-th difference means the k-th-degree term is absent. |

## Worked Problems

### P1. Given the data $x: 1, 2, 4$ and $f(x): 1, 4, 16$, build the divided-difference table and write the Newton interpolating polynomial. Then estimate $f(3)$.

**Given:** (1, 1), (2, 4), (4, 16)

**Solution:**

1. Zeroth differences: f[x0] = 1, f[x1] = 4, f[x2] = 16
2. First differences: f[x0,x1] = (4-1)/(2-1) = 3; f[x1,x2] = (16-4)/(4-2) = 12/2 = 6
3. Second difference: f[x0,x1,x2] = (6 - 3)/(4 - 1) = 3/3 = 1
4. Top diagonal (Newton coefficients): 1, 3, 1
5. P(x) = 1 + 3(x-1) + 1(x-1)(x-2)
6. Expand: 1 + 3x - 3 + x^2 - 3x + 2 = x^2, so P(1)=1, P(2)=4, P(4)=16 all check
7. Evaluate at x = 3: P(3) = 9 (equivalently 1 + 3(2) + (2)(1) = 9)

> [!success]- Answer
> **$P(x)=x^{2}$, so $f(3)=9$ exactly.**

> [!warning] Trap
> Reading the coefficients across a row of the table instead of down the top diagonal. Taking the second column instead of the diagonal gives a different polynomial that still passes through the first two points — the error is invisible unless you verify against a third point.

### P2. A steam table gives saturation temperature versus pressure: $(360,393.04)$, $(365,400.75)$, $(370,408.37)$, $(375,415.92)$, $(380,423.41)$. Estimate $T$ at $373.6$ psia by Newton's forward-difference formula.

**Given:** five equally spaced points, h = 5 psia; x = 373.6, x0 = 360

**Solution:**

1. First differences (divide by h = 5): (400.75-393.04)/5 = 1.542; (408.37-400.75)/5 = 1.524; (415.92-408.37)/5 = 1.510; (423.41-415.92)/5 = 1.498
2. Second differences (span 10): (1.524-1.542)/10 = -0.0018; (1.510-1.524)/10 = -0.0014; (1.498-1.510)/10 = -0.0012
3. Third differences (span 15): (-0.0014+0.0018)/15 = 0.0000267; (-0.0012+0.0014)/15 = 0.0000133
4. Fourth difference (span 20): (0.0000133-0.0000267)/20 = -6.7e-7
5. Top diagonal (Newton coefficients): 393.04, 1.542, -0.0018, 2.67e-5, -6.7e-7
6. p = (373.6 - 360)/5 = 13.6/5 = 2.72
7. T = 393.04 + 2.72(1.542) + [2.72(1.72)/2](-0.0018) + [2.72(1.72)(0.72)/6](2.67e-5) + [2.72(1.72)(0.72)(-0.28)/24](-6.7e-7)
8. = 393.04 + 4.19424 - 0.004211 + 0.0000150 + 0.0000000
9. = 397.230

> [!success]- Answer
> **$T(373.6) \approx 397.23\ ^\circ\mathrm{F}$.**

> [!warning] Trap
> Substituting the raw $x$-value 373.6 into the polynomial instead of the index $p=(x-x_0)/h=2.72$. The forward-difference form is written in $p$, and feeding it 373.6 makes every term astronomically large.

### P3. For the data $(0,1),(1,2),(2,5),(3,10)$, complete the divided-difference table and state the lowest-degree polynomial that fits all four points exactly.

**Given:** (0,1), (1,2), (2,5), (3,10)

**Solution:**

1. First differences: (2-1)/1 = 1; (5-2)/1 = 3; (10-5)/1 = 5
2. Second differences: (3-1)/2 = 1; (5-3)/2 = 1
3. Third difference: (1-1)/3 = 0
4. A zero third divided difference means the x^3 coefficient vanishes
5. Top diagonal: 1, 1, 1, 0, so P(x) = 1 + 1(x-0) + 1(x-0)(x-1) = 1 + x + x^2 - x = x^2 + 1
6. Verify: P(0)=1, P(1)=2, P(2)=5, P(3)=10 — all four exact
7. Note the first differences increase by a constant 2, which is the signature of a quadratic

> [!success]- Answer
> **A **quadratic**, $P(x)=x^{2}+1$; the third divided difference is exactly zero.**

> [!warning] Trap
> Grinding out a cubic because four points were supplied. Four points allow a cubic but do not require one; the zero top difference proves the cubic coefficient is 0 and the extra term contributes nothing.

### P4. Build the cubic divided-difference polynomial through $(0,1),(1,3),(2,11),(3,31)$ and evaluate it at $x=1.5$.

**Given:** (0,1), (1,3), (2,11), (3,31)

**Solution:**

1. First differences: (3-1)/1 = 2; (11-3)/1 = 8; (31-11)/1 = 20
2. Second differences: (8-2)/2 = 3; (20-8)/2 = 6
3. Third difference: (6-3)/3 = 1
4. Top diagonal: 1, 2, 3, 1, so P(x) = 1 + 2x + 3x(x-1) + 1x(x-1)(x-2)
5. Expand: 1 + 2x + 3x^2 - 3x + x^3 - 3x^2 + 2x = x^3 + x + 1
6. Check: P(1) = 3, P(2) = 11, P(3) = 31 — all match the table
7. Evaluate: P(1.5) = (1.5)^3 + 1.5 + 1 = 3.375 + 2.5 = 5.875

> [!success]- Answer
> **$P(x)=x^{3}+x+1$ and $P(1.5)=5.875$.**

> [!warning] Trap
> Using the four data points as if they were equally spaced in a forward-difference table when they are not. Here $h=1$ so both forms work, but substituting $p$-style terms into non-uniform data is the standard error on mixed-interval exam questions.

## Traps & Exam Notes

- **Reading coefficients across a row.** The Newton coefficients are the *top diagonal* entries $f[x_0]$, $f[x_0,x_1]$, $f[x_0,x_1,x_2]$. Taking a row gives a polynomial that fits fewer points and can still look plausible.
- **Dividing by the wrong x-span.** The $k$-th difference divides by $x_{i+k}-x_i$, the *total* span, not the adjacent spacing $h$. For equally spaced data with $h=5$ and a second difference, the divisor is $10$, not $5$.
- **Substituting $x$ into the forward-difference form.** It is written in $p=(x-x_0)/h$. Feeding it an $x$ of hundreds of units produces a meaningless number.
- **Assuming the highest available degree is needed.** If the $(n+1)$-th divided difference is zero, the data lie on a lower-degree polynomial and the extra term contributes nothing. Check before grinding through a full cubic.
- **Rounding the intermediate differences too early.** Newton's table is a difference cascade: a 3-decimal rounding in the first differences is multiplied by the $10$ and $15$ divisors in the higher columns. Carry at least 5 significant figures.
- **Extrapolating beyond the table.** The error term $\prod(x-x_i)$ grows rapidly outside the node range. A divided-difference polynomial evaluated two intervals past the last data point can be off by more than the quantity being estimated.
- **Using unequally spaced data in the forward-difference form.** $\Delta f$ assumes a constant $h$. If the x-values are not equally spaced, use the divided-difference (Newton) or Lagrange form instead.

## See Also

- [[05_Lagrange_Interpolation]]
- [[01_Error_Analysis,_Roundoff_and_Truncation]]
- [[05_Taylor_and_Maclaurin_Series]]

---

[[03_Newton-Raphson_and_Secant|⬅ 03]] · [[_MOC_Numerical_Methods_and_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Lagrange_Interpolation|05 ➡]]
