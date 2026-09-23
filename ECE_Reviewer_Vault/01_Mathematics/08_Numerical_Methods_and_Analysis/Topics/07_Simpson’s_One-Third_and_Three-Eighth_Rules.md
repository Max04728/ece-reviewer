---
id: MATH-08-07
title: "Simpson’s One-Third and Three-Eighth Rules"
part: "01_Mathematics"
area: "08_Numerical_Methods_and_Analysis"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Definite_Integrals_and_FTC]]"]
tags: ["ece", "mathematics", "numerical_methods_and_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Simpson’s One-Third and Three-Eighth Rules

> [!abstract] Scope
> Integrate with Simpson's one-third rule (n even) and three-eighth rule (n a multiple of 3), know their exactness and error orders, and mix them when n fits neither.

## Core Concept

> [!tip] Intuition
> Simpson's rules fit a parabola (or a cubic) through groups of three or four consecutive points and integrate that curve exactly. Because a parabola tracks a smooth function far better than a chord, the accuracy jumps from second order to fourth.

**One-third rule: the weights are 1-4-2-4-…-1.** Over a double panel of width $2h$, the rule is:
$$\int_{x_0}^{x_2}f\,dx\approx\frac{h}{3}[f_0+4f_1+f_2]$$
Composite over $n$ (even) panels:
$$S=\frac{h}{3}[f_0+4(f_1+f_3+\cdots)+2(f_2+f_4+\cdots)+f_n]$$
Odd-indexed interior points get the 4, even-indexed interior points get the 2, and both endpoints get 1. The rule is the exact integral of the quadratic through each triple of points — equivalently the average of the trapezoidal and midpoint rules, $S=\frac{2}{3}M+\frac{1}{3}T$.

**Three-eighth rule: the weights are 1-3-3-1.** Over a triple panel of width $3h$, the rule is:
$$\int_{x_0}^{x_3}f\,dx\approx\frac{3h}{8}[f_0+3f_1+3f_2+f_3]$$
Composite over $n$ panels:
$$S=\frac{3h}{8}[f_0+3(f_1+f_2+f_4+f_5+\cdots)+2(f_3+f_6+\cdots)+f_n]$$
with $n$ divisible by 3. Interior nodes whose index is a multiple of 3 get weight 2, all other interior nodes weight 3.

**The index conditions are not interchangeable.** One-third needs $n$ **even**; three-eighth needs $n$ **divisible by 3**. A common exam datum is $n=6$, which satisfies both — then either rule is legal and they give slightly different answers, since the underlying interpolants differ. If $n$ is odd and not divisible by 3, split the interval: apply the 3/8 rule to one three-panel block (or the 1/3 rule to as many two-panel blocks as possible) and the 1/3 rule to the remainder.

**Why the order is $h^{4}$, not $h^{2}$.** Simpson's 1/3 rule is exact for every cubic, even though it is derived from a quadratic — the cubic term's error integrates to zero over a symmetric double panel. The panel error is $-\frac{h^{5}}{90}f^{(4)}(\xi)$. The composite error is:
$$-\frac{(b-a)h^{4}}{180}f^{(4)}(\xi)=-\frac{(b-a)^{5}}{180n^{4}}f^{(4)}(\xi)$$
Halving $h$ divides the error by 16. The three-eighth rule shares the same $h^{4}$ order with a different constant.

**Accuracy payoff.** For $\int_0^1 e^{-x}dx$: the 1/3 rule gives $0.632334$ at $n=2$ and $0.632134$ at $n=4$, an error of $1.4\times10^{-5}$ where the trapezoidal rule at the same $n=4$ is wrong by $3.3\times10^{-3}$ — a factor of 240 for the same five ordinates. The cost is that the rule needs equally spaced data and an even (or multiple-of-3) panel count.

**Use it correctly.** Simpson's rules assume equal spacing and a smooth integrand. They do **not** apply to tables with mixed panel widths, to singular integrands at an endpoint, or to functions with a discontinuous derivative inside a panel. For those, fall back to the trapezoidal rule on each panel or transform the integral first.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Simpson 1/3, single double panel | $\int_{x_0}^{x_2} f\,dx \approx \frac{h}{3}\left[f_0+4f_1+f_2\right]$ | Panel width h, double panel 2h. Exact for cubics. |
| Simpson 1/3, composite | $S = \frac{h}{3}\left[f_0 + 4\!\sum_{\mathrm{odd\ }i} f_i + 2\!\sum_{\mathrm{even\ }i} f_i + f_n\right]$ | n must be EVEN. h = (b-a)/n. |
| Simpson 3/8, single triple panel | $\int_{x_0}^{x_3} f\,dx \approx \frac{3h}{8}\left[f_0+3f_1+3f_2+f_3\right]$ | Panel width h, triple panel 3h. |
| Simpson 3/8, composite | $S = \frac{3h}{8}\left[f_0 + 3\!\sum_{i\neq0,3,6,\dots} f_i + 2\!\sum_{i=3,6,9,\dots} f_i + f_n\right]$ | n must be DIVISIBLE BY 3. Nodes with index a multiple of 3 take weight 2. |
| Panel error, 1/3 rule | $E = -\frac{h^{5}}{90}f^{(4)}(\xi)$ | Fourth-order accurate; exact when f is a cubic or lower. |
| Composite error, 1/3 rule | $E = -\frac{(b-a)h^{4}}{180}f^{(4)}(\xi) = -\frac{(b-a)^{5}}{180n^{4}}f^{(4)}(\xi)$ | Halving h divides the error by 16. |
| Composite error, 3/8 rule | $E = -\frac{(b-a)h^{4}}{80}f^{(4)}(\xi)$ | Same order h^4; the constant is larger than the 1/3 rule's. |
| Trapezoid + midpoint identity | $S_{1/3} = \frac{2}{3}M_n + \frac{1}{3}T_n$ | M_n is the midpoint sum on the same panels. Useful sanity check. |
| Mixed-rule split | $n = 2a + 3b$ | Use 1/3 on 2-panel blocks and 3/8 on 3-panel blocks; e.g. n = 5 = 2 + 3, n = 7 = 4 + 3. |

## Interactive Widget

**Numerical Integration n Slider**

![[Numerical_Integration_n_Slider.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Use Simpson's one-third rule with $n=4$ to evaluate $\displaystyle\int_0^1 e^{-x}\,dx$ and state the error.

**Given:** f(x) = e^{-x}; h = 0.25, n = 4 (even, so the rule applies)

**Solution:**

1. Table: f(0) = 1.000000; f(0.25) = 0.778801; f(0.50) = 0.606531; f(0.75) = 0.472367; f(1.00) = 0.367879
2. Weighted sum: 1(1.000000) + 4(0.778801) + 2(0.606531) + 4(0.472367) + 1(0.367879)
3. = 1.000000 + 3.115204 + 1.213062 + 1.889468 + 0.367879 = 7.585613
4. S = (h/3)(sum) = (0.25/3)(7.585613) = 0.0833333(7.585613)
5. = 0.632134
6. Exact: 1 - e^{-1} = 0.632121; error = 1.36e-5 (0.0022%)
7. Compare: the trapezoidal rule at the same n = 4 gave 0.635410, an error of 3.3e-3 — about 240 times worse

> [!success]- Answer
> **$S_4 = 0.632134$, error $1.4\times10^{-5}$ versus the exact $0.632121$.**

> [!warning] Trap
> Giving the weight 2 to the odd-indexed interior point x = 0.25 and weight 4 to x = 0.5. The pattern alternates 4, 2, 4 starting from the first interior point, and swapping a pair changes the answer by about 0.08 here.

### P2. Verify that Simpson's one-third rule is exact for $f(x)=x^{3}$ on $[0,1]$ with $h=0.25$.

**Given:** f(x) = x^3; n = 4, h = 0.25

**Solution:**

1. Table: f(0) = 0; f(0.25) = 0.015625; f(0.5) = 0.125; f(0.75) = 0.421875; f(1) = 1
2. Weighted sum: 0 + 4(0.015625) + 2(0.125) + 4(0.421875) + 1
3. = 0 + 0.0625 + 0.25 + 1.6875 + 1 = 3.000000
4. S = (0.25/3)(3.000000) = 0.250000
5. Exact integral: [x^4/4] from 0 to 1 = 0.25
6. The two agree exactly: Simpson's 1/3 error term contains f^(4), which is zero for a cubic

> [!success]- Answer
> **$S = 0.25$, exactly equal to $\int_0^1 x^{3}dx$ — the rule is exact for cubics, not just quadratics.**

> [!warning] Trap
> Assuming the rule is only exact for parabolas because it is derived from a quadratic interpolant. The cubic contribution cancels over each symmetric double panel, so degree $\le3$ is exact; a test with $x^{4}$ would show a nonzero error.

### P3. Evaluate $\displaystyle\int_1^2 \frac{dx}{x}$ with Simpson's three-eighth rule using $n=3$.

**Given:** f(x) = 1/x; n = 3 (divisible by 3), h = 1/3

**Solution:**

1. Nodes: x = 1, 4/3, 5/3, 2
2. Values: f(1) = 1.000000; f(4/3) = 0.750000; f(5/3) = 0.600000; f(2) = 0.500000
3. Weighted sum: 1 + 3(0.75) + 3(0.60) + 0.5 = 1 + 2.25 + 1.80 + 0.5 = 5.55
4. S = (3h/8)(sum) = (3(1/3)/8)(5.55) = (1/8)(5.55)
5. = 0.693750
6. Exact: ln 2 = 0.693147; error = 6.03e-4 (0.087%)
7. Same data with the 1/3 rule is impossible at n = 3 (n must be even) — that is when the 3/8 rule is needed

> [!success]- Answer
> **$S_{3/8} = 0.69375$ versus the exact $0.693147$.**

> [!warning] Trap
> Applying the 1/3 weights 1-4-2-4 to three panels. With $n=3$ the 1/3 rule is illegal — there is no fourth interior node and the weights do not pair. Recognise the multiple-of-3 condition and switch rules.

### P4. The integral in the previous problem is redone with the 1/3 rule and $n=4$ ($h=0.25$). Compute it and compare the two rules on the same integral.

**Given:** f(x) = 1/x on [1,2]; n = 4, h = 0.25

**Solution:**

1. Nodes: 1, 1.25, 1.5, 1.75, 2; values: 1.000000, 0.800000, 0.666667, 0.571429, 0.500000
2. Weighted sum: 1 + 4(0.8) + 2(0.666667) + 4(0.571429) + 0.5
3. = 1 + 3.2 + 1.333333 + 2.285714 + 0.5 = 8.319048
4. S = (0.25/3)(8.319048) = 0.693254
5. Exact: 0.693147; error = 1.07e-4
6. The 1/3 rule with 5 points is about 5.6 times more accurate than the 3/8 rule with 4 points

> [!success]- Answer
> **$S_{1/3} = 0.693254$ (error $1.1\times10^{-4}$) versus $S_{3/8}=0.69375$ (error $6.0\times10^{-4}$).**

> [!warning] Trap
> Concluding the 3/8 rule is 'better' because it uses fewer points for the same $h$. For the same number of panels the 1/3 rule has the smaller error constant; the 3/8 rule exists to handle $n$ divisible by 3, not to beat the 1/3 rule.

### P5. Use $n=5$ equal panels of width $h=0.2$ on $\displaystyle\int_0^1 e^{-x}\,dx$ by combining both Simpson rules, and state the error.

**Given:** n = 5 = 2 + 3; h = 0.2

**Solution:**

1. Values at x = 0, 0.2, 0.4, 0.6, 0.8, 1.0: 1.000000, 0.818731, 0.670320, 0.548812, 0.449329, 0.367879
2. 1/3 rule on the first two panels [0, 0.4]: (0.2/3)[1.000000 + 4(0.818731) + 0.670320]
3. = 0.0666667[1.000000 + 3.274924 + 0.670320] = 0.0666667(4.945244) = 0.329683
4. 3/8 rule on the last three panels [0.4, 1.0]: (3(0.2)/8)[0.670320 + 3(0.548812) + 3(0.449329) + 0.367879]
5. = 0.075[0.670320 + 1.646436 + 1.347987 + 0.367879] = 0.075(4.032622) = 0.302447
6. Total: 0.329683 + 0.302447 = 0.632130
7. Exact: 0.632121; error = 8.9e-6

> [!success]- Answer
> **$S = 0.63213$ (error $8.9\times10^{-6}$), obtained as $S_{1/3}(2\ \mathrm{panels})+S_{3/8}(3\ \mathrm{panels})$.**

> [!warning] Trap
> Trying to force all five panels into one rule. $n=5$ is neither even nor divisible by 3, so the interval must be split 2+3 (or 3+2). Applying the 1/3 weights to five panels silently mispairs the whole table.

## Traps & Exam Notes

- **Using the 1/3 rule with an odd number of panels.** The rule requires $n$ even; with odd $n$ the 4-2-4 pattern does not close on the last interval and the coefficients mispair against the wrong ordinates.
- **Using the 3/8 rule when $n$ is not a multiple of 3.** The 1-3-3-1 block must tile the whole interval exactly. $n=4$ or $n=5$ cannot be done with the 3/8 rule alone — split the interval instead.
- **Mixing up the weight patterns.** 1/3 rule: 4 on odd indices, 2 on even indices. 3/8 rule: 3 everywhere except indices that are multiples of 3, which take 2. Confusing the two produces plausible-looking but wrong answers.
- **Applying composite weights to unequal panels.** Both composite formulas assume the same $h$ throughout. A table with mixed spacing needs per-panel evaluation.
- **Claiming exactness for quadratics only.** The 1/3 rule integrates cubics exactly because the cubic term cancels over a symmetric double panel; the error term is governed by $f^{(4)}$, not $f^{(3)}$.
- **Forgetting the $3h/8$ factor.** The 3/8 rule's prefactor is $\frac{3h}{8}$, not $\frac{h}{3}$ or $\frac{h}{8}$. Dropping the 3 gives an answer off by a factor of 3.
- **Assuming a smaller error constant for the 3/8 rule.** On the same $h$ the 3/8 rule is the *less* accurate of the two (its composite error constant $1/80$ exceeds the 1/3 rule's $1/180$); it earns its place only when $n$ is divisible by 3.

## See Also

- [[06_Trapezoidal_Rule]]
- [[05_Lagrange_Interpolation]]
- [[04_Newton’s_Divided_Difference_Interpolation]]

---

[[06_Trapezoidal_Rule|⬅ 06]] · [[_MOC_Numerical_Methods_and_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Euler’s_Method|08 ➡]]
