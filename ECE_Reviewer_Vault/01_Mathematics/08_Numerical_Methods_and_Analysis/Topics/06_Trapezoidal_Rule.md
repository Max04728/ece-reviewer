---
id: MATH-08-06
title: "Trapezoidal Rule"
part: "01_Mathematics"
area: "08_Numerical_Methods_and_Analysis"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Definite_Integrals_and_FTC]]"]
tags: ["ece", "mathematics", "numerical_methods_and_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Trapezoidal Rule

> [!abstract] Scope
> Approximate a definite integral by summing trapezoids, choose the panel count from an error bound, and use Richardson extrapolation when the step is fixed.

## Core Concept

> [!tip] Intuition
> Replace the curve with a chain of straight chords. Where the integrand is concave up the chords lie above the curve, so the trapezoidal rule overestimates; concave down and it underestimates.

**One panel is just the average of the endpoint heights times the width.** Over $[x_0,x_1]$ with $h=x_1-x_0$, the area of the trapezoid is $\frac{h}{2}[f(x_0)+f(x_1)]$. This is exactly the integral of the linear Lagrange polynomial through the two endpoints, so the trapezoidal rule is exact for every straight line.

**Composite form: halve the endpoints, count the interior points in full.** Over $n$ equal panels of width $h=\frac{b-a}{n}$, the composite rule is:
$$T_n=\frac{h}{2}\left[f_0+2f_1+2f_2+\cdots+2f_{n-1}+f_n\right]$$
The factor of 2 on the interior points is the bookkeeping for every interior node being shared by two neighbouring trapezoids — the single most common arithmetic slip in the topic.

**The error is controlled by curvature.** For one panel, $E=-\frac{h^{3}}{12}f''(\xi)$. For the composite rule:
$$E=-\frac{(b-a)h^{2}}{12}f''(\xi)=-\frac{(b-a)^{3}}{12n^{2}}f''(\xi)$$
the same statement written two ways. The rule is exact for constant and linear integrands (for which $f''=0$), second-order accurate, and **doubling $n$ quarters the error** — that factor of 4 is the basis of Richardson extrapolation.

**Choosing $n$ from an error tolerance.** Solve $\frac{(b-a)h^{2}}{12}M\le\varepsilon$ with $M=\max|f''|$. For $\int_0^1 e^{-x}dx$ with $\varepsilon=10^{-4}$: $M=1$, so $h^{2}\le1.2\times10^{-3}$, $h\le0.0346$, $n\ge28.9$, i.e. $n=29$. The $n^{2}$ in the denominator means accuracy is bought cheaply: 10 panels already give about $8\times10^{-4}$.

**Richardson extrapolation cancels the leading error.** Because $T(h)=I+c_1h^{2}+c_2h^{4}+\cdots$, the combination $\frac{4T(h/2)-T(h)}{3}$ removes the $h^{2}$ term and leaves an $h^{4}$ result. This is how you convert two coarse trapezoidal answers into one Simpson-quality answer with no extra function evaluations at the nodes you already have.

**Data tables versus formulas.** When the integrand is given only as a table of equally spaced values, the trapezoidal rule is the default because it needs no derivative and no equal-*h* assumption (for unequal spacing it becomes:
$$\frac{1}{2}\sum(x_{i+1}-x_i)(f_i+f_{i+1})$$
). Use Simpson's rules instead when $n$ is even or divisible by 3, because they are far more accurate for smooth data.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Single trapezoid | $T_1 = \frac{h}{2}\left[f(x_0)+f(x_1)\right]$ | Exact for any straight line; the building block of the composite rule. |
| Composite trapezoidal rule | $T_n = \frac{h}{2}\left[f_0 + 2\sum_{i=1}^{n-1} f_i + f_n\right], \quad h=\frac{b-a}{n}$ | Equal spacing. Endpoints counted once, interior points twice. |
| Unequal spacing form | $T = \frac{1}{2}\sum_{i=1}^{n}(x_i-x_{i-1})\left[f_{i-1}+f_i\right]$ | Use when the table spacing is not constant. |
| Local truncation error | $E = -\frac{h^{3}}{12}f''(\xi)$ | One panel, h = panel width. |
| Composite error | $E = -\frac{(b-a)h^{2}}{12}f''(\xi) = -\frac{(b-a)^{3}}{12n^{2}}f''(\xi)$ | $M=\max\|f''\|$ replaces $\|f''(\xi)\|$ to get a bound. Note the panel-width $h$, not $(b-a)$. |
| Panels for a tolerance | $n \ge \sqrt{\frac{(b-a)^{3}M}{12\varepsilon}}$ | M = max\|f''\|. Round n UP. Doubling n quarters the error. |
| Richardson extrapolation | $I \approx \frac{4T(h/2)-T(h)}{3}$ | Cancels the O(h^2) term, leaving O(h^4). |
| Averaging with the midpoint rule | $S = \frac{2}{3}M_n + \frac{1}{3}T_n$ | Also cancels the h^2 error; identical to Simpson's 1/3 rule on equal panels. |

## Interactive Widget

**Numerical Integration n Slider**

![[Numerical_Integration_n_Slider.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Approximate $\displaystyle\int_0^1 e^{-x}\,dx$ with the trapezoidal rule using $n=4$ and give the relative error.

**Given:** f(x) = e^{-x}; n = 4, h = 0.25

**Solution:**

1. Table: f(0) = 1.000000; f(0.25) = 0.778801; f(0.5) = 0.606531; f(0.75) = 0.472367; f(1) = 0.367879
2. Interior sum: 0.778801 + 0.606531 + 0.472367 = 1.857699
3. T = (0.25/2)[1.000000 + 2(1.857699) + 0.367879]
4. = 0.125[1.000000 + 3.715398 + 0.367879] = 0.125(5.083277)
5. = 0.635410
6. Exact value: 1 - e^{-1} = 0.632121
7. Error: 0.635410 - 0.632121 = 0.003289; relative error = 0.003289/0.632121 = 0.52%

> [!success]- Answer
> **$T_4 = 0.63541$, an overestimate of $0.52\%$ (exact $0.632121$).**

> [!warning] Trap
> Doubling only some interior points, or forgetting that $e^{0}$ in the first term is 1 rather than $e$. Losing one factor of 2 in the interior sum shifts the answer by about 0.048 here — larger than the entire true error.

### P2. Estimate $\displaystyle\int_0^1 x^{2}\,dx$ with $n=4$, and compare the actual error with the bound $\frac{(b-a)h^{2}}{12}\max|f''|$.

**Given:** f(x) = x^2; f''(x) = 2; n = 4, h = 0.25

**Solution:**

1. Values: f(0)=0, f(0.25)=0.0625, f(0.5)=0.25, f(0.75)=0.5625, f(1)=1
2. T = 0.125[0 + 2(0.0625+0.25+0.5625) + 1] = 0.125[0 + 2(0.875) + 1]
3. = 0.125(2.75) = 0.34375
4. Exact: 1/3 = 0.333333, so the actual error is 0.010417 (overestimate, as expected for a convex integrand)
5. Bound: (1)(0.25^2)(2)/12 = 0.125/12 = 0.010417
6. The bound is attained exactly because f'' is constant, so the two numbers agree

> [!success]- Answer
> **$T_4 = 0.34375$ versus exact $0.33333$; the error $0.01042$ exactly equals the bound $\frac{(b-a)h^{2}M}{12}$.**

> [!warning] Trap
> Using $\frac{(b-a)^{3}}{12n^{2}}$ with $b-a$ substituted for the panel width $h$. Here $h=0.25$ and $(b-a)=1$; mixing them up makes the bound 64 times too large and hides a genuinely failing answer.

### P3. The composite trapezoidal estimates for $\int_0^1 e^{-x}dx$ are $T(h)=0.635410$ with $h=0.25$ and $T(h/2)=0.632943$ with $h=0.125$. Apply Richardson extrapolation and compare with the exact value $0.632121$.

**Given:** T(0.25) = 0.635410; T(0.125) = 0.632943

**Solution:**

1. Error model: T(h) = I + c h^2 + ...
2. Richardson combination: I = [4T(h/2) - T(h)]/3
3. 4(0.632943) = 2.531772
4. 2.531772 - 0.635410 = 1.896362
5. 1.896362/3 = 0.632121
6. Exact: I - e^{-1} = 0.632121 — the extrapolated value is exact to 6 decimals

> [!success]- Answer
> **$I \approx 0.632121$, matching the exact value; the $h^{2}$ error term has been cancelled.**

> [!warning] Trap
> Applying the $(4T_2-T_1)/3$ weights to the *half* step incorrectly, e.g. using $h$ and doubling instead of halving. The rule assumes the second value uses half the step; feeding it a doubled step extrapolates the wrong way and makes the estimate worse.

### P4. How many panels does the trapezoidal rule need for $\int_0^1 e^{-x}dx$ to be accurate to $10^{-4}$?

**Given:** max|f''| = max|e^{-x}| = 1 on [0,1]; tolerance 1e-4

**Solution:**

1. Bound: (b-a)h^2 M/12 <= 1e-4 with M = 1 and b-a = 1
2. h^2 <= 12e-4 = 1.2e-3
3. h <= sqrt(1.2e-3) = 0.034641
4. n >= 1/0.034641 = 28.87
5. Round up: n = 29 panels
6. Cross-check with the h^2 rule of thumb: 4 panels gave 3.3e-3 error, and error falls as n^-2, so 1e-4 needs n >= 4 sqrt(3.3e-3/1e-4) = 4(5.74) = 23; the bound of 29 is the safe answer

> [!success]- Answer
> **$n = 29$ panels (a bound-based answer; the observed error suggests about 23 would also pass).**

> [!warning] Trap
> Solving for $n$ instead of $h$ and forgetting the square root. The error scales as $1/n^{2}$, so a tolerance 100 times smaller needs only 10 times as many panels — an answer of $n=3000$ means the square root was dropped.

### P5. Use the trapezoidal rule on the unequal-spacing table $x: 0,\,0.1,\,0.3,\,0.6$ with $f(x): 1.0000,\,0.9048,\,0.7408,\,0.5488$ to estimate $\int_0^{0.6}f\,dx$.

**Given:** unequal panel widths 0.1, 0.2, 0.3

**Solution:**

1. Panel 1 (0 to 0.1): (0.1/2)(1.0000 + 0.9048) = 0.05(1.9048) = 0.095240
2. Panel 2 (0.1 to 0.3): (0.2/2)(0.9048 + 0.7408) = 0.1(1.6456) = 0.164560
3. Panel 3 (0.3 to 0.6): (0.3/2)(0.7408 + 0.5488) = 0.15(1.2896) = 0.193440
4. Total: 0.095240 + 0.164560 + 0.193440 = 0.453240
5. Reference: the data follow f = e^{-x}, and the exact integral is 1 - e^{-0.6} = 0.451188
6. Error: 0.453240 - 0.451188 = 0.002052 (0.45%)

> [!success]- Answer
> **$T = 0.45324$ versus the exact $0.451188$.**

> [!warning] Trap
> Applying the equal-spacing weights $\frac{h}{2}[f_0+2f_1+\cdots]$ to a table whose panels differ in width. The composite formula in $h$ is only valid when every panel has the same width; with mixed widths each panel must be computed separately.

## Traps & Exam Notes

- **Forgetting the factor of 2 on interior ordinates.** The composite rule is $\frac{h}{2}[f_0+2(f_1+\cdots+f_{n-1})+f_n]$. Dropping it is the single largest source of wrong answers in this topic.
- **Panel width versus total width in the error term.** $E=-\frac{(b-a)h^{2}}{12}f''$ uses the *panel* width $h$. Substituting $(b-a)$ overstates the error by $n^{2}$.
- **Assuming $n$ odd is allowed in the simple statement.** The trapezoidal rule works for any $n$, but the error formula and Richardson extrapolation assume equal panels. Do not borrow Simpson's even-$n$ requirement here, and do not borrow the trapezoidal rule's freedom there.
- **Quoting more digits than the step justifies.** A 4-panel answer carries about 3 correct decimals; printing 0.6354095 claims precision the method does not have. Round to the accuracy the error bound supports.
- **Using the trapezoidal rule on a table with a singularity.** If $f$ blows up at an endpoint the endpoint ordinate is infinite and the sum is meaningless — the integral is improper and needs the limiting treatment, not a quadrature rule.
- **Expecting the sign of the error blindly.** Trapezoidal overestimates for concave-up integrands and underestimates for concave-down ones. The sign is set by $f''$, so a result *below* the true value on a convex function means an arithmetic error.
- **Using $\frac{4T_2-T_1}{3}$ when the two $T$ values were computed with the same $h$.** Richardson extrapolation requires the step to have been halved between the two evaluations.

## See Also

- [[07_Simpson’s_One-Third_and_Three-Eighth_Rules]]
- [[05_Lagrange_Interpolation]]
- [[03_Definite_Integrals_and_FTC]]

---

[[05_Lagrange_Interpolation|⬅ 05]] · [[_MOC_Numerical_Methods_and_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Simpson’s_One-Third_and_Three-Eighth_Rules|07 ➡]]
