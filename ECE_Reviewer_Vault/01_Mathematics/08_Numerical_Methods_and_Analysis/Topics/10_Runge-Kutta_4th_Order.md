---
id: MATH-08-10
title: "Runge-Kutta 4th Order"
part: "01_Mathematics"
area: "08_Numerical_Methods_and_Analysis"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_Modified_Euler_and_Heun’s_Method]]"]
tags: ["ece", "mathematics", "numerical_methods_and_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Runge-Kutta 4th Order

> [!abstract] Scope
> Apply the classic fourth-order Runge-Kutta method, build its four-stage table by hand, and use the O(h^4) error scaling to pick a step size.

## Core Concept

> [!tip] Intuition
> Four slope samples are taken across each step — at the start, twice at the midpoint, and once at the end — and combined with weights 1-2-2-1. The two midpoint samples are what make the single step agree with the Taylor series through the $h^{4}$ term.

**The four stages.** $k_1=f(x_i,y_i)$;
$$k_2=f\!\left(x_i+\frac{h}{2},y_i+\frac{h}{2}k_1\right)$$

$$k_3=f\!\left(x_i+\frac{h}{2},y_i+\frac{h}{2}k_2\right)$$

$$k_4=f(x_i+h,\,y_i+h k_3)$$
The single update is:
$$y_{i+1}=y_i+\frac{h}{6}(k_1+2k_2+2k_3+k_4)$$
with $k_1$ and $k_4$ carrying weight $1/6$ and the two midpoint slopes $k_2$ and $k_3$ carrying weight $1/3$ each. The weights sum to 6, so dividing by 6 makes them a weighted average — 1/6, 1/3, 1/3, 1/6. This is Simpson's rule applied to the slope function $f$.

**Why the order is four.** The combination of stages reproduces the Taylor series of the exact solution through the $h^{4}$ term, so the local truncation error is $O(h^{5})$ and the global error is $O(h^{4})$. The operational consequence: **halving $h$ divides the error by 16**. Accuracy per unit work is why RK4, not Euler, is the default general-purpose solver.

**Reading the stage table.** Each stage is a slope, not a solution value. $k_2$ and $k_3$ are evaluated at $x_i+h/2$ with different $y$-estimates; $k_4$ uses the full step. If $k_1=k_2=k_3=k_4$ (which happens when $f$ is constant in $x$ and $y$, or when $h=0$) the update collapses to $y_{i+1}=y_i+h f$ — a useful sanity check.

**Cost and comparison.** Four function evaluations per step against Euler's one and Heun's two. On $y'=x+y$, $y(0)=1$ at $x=1$ with $h=0.1$: Euler is wrong by $2.5\times10^{-1}$, Heun by $8.4\times10^{-3}$, RK4 by $4.2\times10^{-6}$ — for four evaluations instead of one. RK4 is unstable for stiff problems (its stability interval on the real axis is about $-2.78\le\lambda h\le0$), where implicit methods are required.

**The automated step-size control idea.** Because the error is $O(h^{4})$, an embedded pair (RKF45) can estimate the local error by comparing a fourth- and a fifth-order result and shrink or grow $h$ automatically. The board exam does not ask for the embedded coefficients, but it does ask 'estimate the error after halving $h$' — and the answer is always 'divide by 16'.

**When RK4 is exact.** For $y'=f(x)$ with $f$ a polynomial of degree $\le3$, RK4 reproduces Simpson's rule and is exact. It is also exact for any problem whose solution is a polynomial of degree $\le4$ in $x$. Everything else carries an $h^{4}$ error that the exam expects you to bound, not eliminate.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| RK4 stage 1 | $k_1 = f(x_i,\,y_i)$ | Start-of-step slope. |
| RK4 stage 2 | $k_2 = f\!\left(x_i+\frac{h}{2},\ y_i+\frac{h}{2}k_1\right)$ | Midpoint slope using the k1 estimate. |
| RK4 stage 3 | $k_3 = f\!\left(x_i+\frac{h}{2},\ y_i+\frac{h}{2}k_2\right)$ | Midpoint slope using the improved k2 estimate. |
| RK4 stage 4 | $k_4 = f(x_i+h,\ y_i+h k_3)$ | End-of-step slope using the k3 estimate. |
| RK4 update | $y_{i+1} = y_i + \frac{h}{6}\left(k_1+2k_2+2k_3+k_4\right)$ | Weights sum to 6. Same as Simpson's 1/3 rule on the four slopes. |
| Local truncation error | $E_{\mathrm{local}} = O(h^{5})$ | Per step, one order better than Heun's O(h^3). |
| Global error order | $E_{\mathrm{global}} = O(h^{4})$ | Halving h divides the error by 16. This is the number the exam wants. |
| Stability interval (real lambda) | $-2.78 \le \lambda h \le 0$ | For y' = lambda y. Not suitable for stiff problems. |
| Work per step | $4\ \mathrm{function\ evaluations}$ | Versus 1 for Euler and 2 for Heun. |

## Worked Problems

### P1. Use RK4 with $h=0.1$ on $\dfrac{dy}{dx}=x+y$, $y(0)=1$ to find $y(0.2)$.

**Given:** f(x,y) = x + y; y(0) = 1; h = 0.1

**Solution:**

1. Step 1: k1 = f(0,1) = 1.000000
2. k2 = f(0.05, 1 + 0.05(1)) = f(0.05, 1.05) = 0.05 + 1.05 = 1.100000
3. k3 = f(0.05, 1 + 0.05(1.1)) = f(0.05, 1.055) = 1.105000
4. k4 = f(0.1, 1 + 0.1(1.105)) = f(0.1, 1.1105) = 1.210500
5. y1 = 1 + (0.1/6)(1.000000 + 2(1.100000) + 2(1.105000) + 1.210500) = 1 + (0.1/6)(6.620500) = 1.110342
6. Step 2: k1 = f(0.1, 1.110342) = 1.210342
7. k2 = f(0.15, 1.110342 + 0.05(1.210342)) = f(0.15, 1.170859) = 1.320859
8. k3 = f(0.15, 1.110342 + 0.05(1.320859)) = f(0.15, 1.176385) = 1.326385
9. k4 = f(0.2, 1.110342 + 0.1(1.326385)) = f(0.2, 1.242980) = 1.442980
10. y2 = 1.110342 + (0.1/6)(1.210342 + 2(1.320859) + 2(1.326385) + 1.442980) = 1.110342 + (0.1/6)(7.947810) = 1.242805
11. Exact: y(0.2) = 2e^{0.2} - 0.2 - 1 = 1.242806; error = 1e-6

> [!success]- Answer
> **$y(0.2) \approx 1.242805$ versus the exact $1.242806$ — an error of $10^{-6}$ where Euler's error is $2\times10^{-2}$.**

> [!warning] Trap
> Evaluating $k_2$ and $k_3$ at the same argument or at $x_i+h$. Both midpoint stages use $x_i+h/2$; using $x_i+h$ for $k_3$ silently reduces the method to something third-order or worse, and the answer still looks reasonable.

### P2. Work one full RK4 step for $\dfrac{dy}{dx}=y-x^{2}+1$, $y(0)=0.5$, $h=0.2$, and compare with the exact $y(0.2)=0.829299$.

**Given:** f(x,y) = y - x^2 + 1; y(0) = 0.5; h = 0.2

**Solution:**

1. k1 = f(0, 0.5) = 0.5 - 0 + 1 = 1.500000
2. k2 = f(0.1, 0.5 + 0.1(1.5)) = f(0.1, 0.65) = 0.65 - 0.01 + 1 = 1.640000
3. k3 = f(0.1, 0.5 + 0.1(1.64)) = f(0.1, 0.664) = 0.664 - 0.01 + 1 = 1.654000
4. k4 = f(0.2, 0.5 + 0.2(1.654)) = f(0.2, 0.8308) = 0.8308 - 0.04 + 1 = 1.790800
5. Increment = (0.2/6)(1.5 + 2(1.64) + 2(1.654) + 1.7908) = (0.033333)(9.8788) = 0.329293
6. y(0.2) = 0.5 + 0.329293 = 0.829293
7. Exact: 0.04 + 0.4 + 1 - 0.5e^{0.2} = 1.44 - 0.610351 = 0.829299; error = -6e-6
8. Compare plain Euler at the same h = 0.2, which gives 0.800000 — an error of 0.029, about 4700 times larger

> [!success]- Answer
> **$y(0.2) \approx 0.829293$ versus the exact $0.829299$; error $6\times10^{-6}$.**

> [!warning] Trap
> Substituting the wrong $x$ into the $-x^{2}$ term for the midpoint stages. Both $k_2$ and $k_3$ use $x=0.1$, so the term is $-0.01$; using $-0.04$ (the end-of-step value) corrupts $k_2$ and $k_3$ and costs three orders of accuracy.

### P3. Verify the fourth-order claim: for $y'=x+y$, $y(0)=1$ on $[0,1]$, the RK4 errors are $-6.14\times10^{-5}$ at $h=0.2$, $-4.17\times10^{-6}$ at $h=0.1$ and $-2.72\times10^{-7}$ at $h=0.05$. What do the ratios show, and what error should $h=0.025$ give?

**Given:** exact y(1) = 3.43656366

**Solution:**

1. Ratio 1: 6.14e-5 / 4.17e-6 = 14.7
2. Ratio 2: 4.17e-6 / 2.72e-7 = 15.3
3. Both are close to 16, the factor expected when h is halved for an O(h^4) method
4. Prediction for h = 0.025: 2.72e-7 / 16 = 1.70e-8
5. For comparison, Heun's method at h = 0.1 has an error of 8.40e-3, about 2000 times larger than RK4 at the same step

> [!success]- Answer
> **Ratios of about 15 confirm $O(h^{4})$; the predicted error at $h=0.025$ is $\approx1.7\times10^{-8}$.**

> [!warning] Trap
> Using a factor of 4 (the $O(h^{2})$ rule) or 2. Fourth order means $2^{4}=16$ when $h$ is halved. Quoting the wrong factor is a wrong answer even if the arithmetic of the ratio is right.

### P4. One RK4 step is taken on $y'=y$, $y(0)=1$ with $h=0.5$, giving $y(0.5)=1.64843750$. Do the second step and compare with $e^{1}=2.71828183$.

**Given:** f(x,y) = y; h = 0.5; y(0.5) = 1.64843750

**Solution:**

1. k1 = f(0.5, 1.6484375) = 1.6484375
2. k2 = f(0.75, 1.6484375 + 0.25(1.6484375)) = f(0.75, 2.06054688) = 2.06054688
3. k3 = f(0.75, 1.6484375 + 0.25(2.06054688)) = f(0.75, 2.16357422) = 2.16357422
4. k4 = f(1.0, 1.6484375 + 0.5(2.16357422)) = f(1.0, 2.73022461) = 2.73022461
5. Increment = (0.5/6)(1.6484375 + 2(2.06054688) + 2(2.16357422) + 2.73022461)
6. = (0.0833333)(12.82690430) = 1.06890869
7. y(1) = 1.64843750 + 1.06890869 = 2.71734619
8. Exact e = 2.71828183; error = -9.36e-4 (0.034%)

> [!success]- Answer
> **$y(1) \approx 2.717346$ versus $e = 2.718282$; error $9.4\times10^{-4}$ at this very coarse $h=0.5$.**

> [!warning] Trap
> Forgetting that the $x$-arguments of $k_2$ and $k_3$ are $0.75$, not $0.5$ or $1.0$. The increments in $y$ are half-step amounts ($h k_1/2 = 0.25k_1$); using the full $0.5k_1$ doubles the $y$-advance in both midpoint stages.

### P5. A designer needs $y(1)$ accurate to $10^{-6}$ for $y'=x+y$, $y(0)=1$. Starting from the RK4 error at $h=0.2$ of $6.1\times10^{-5}$, what step size and how many steps are needed?

**Given:** error at h = 0.2 is 6.14e-5; target 1e-6; O(h^4) scaling

**Solution:**

1. Write the error as E = C h^4, so C = 6.14e-5 / (0.2^4) = 6.14e-5/1.6e-3 = 0.0384
2. Required: 0.0384 h^4 <= 1e-6  ->  h^4 <= 2.60e-5
3. h <= (2.60e-5)^(1/4) = 0.0714
4. n = (1 - 0)/h >= 14.0, so use n = 14 steps of exactly h = 1/14 = 0.0714 (15 would also work but is not needed)
5. Cross-check with the observed h = 0.1 error of 4.17e-6: to reach 1e-6, reduce h by (4.17)^(1/4) = 1.43, so h = 0.1/1.43 = 0.070 — the same answer
6. Four evaluations per step means about 56 evaluations of f

> [!success]- Answer
> **$h \approx 0.07$, about 14 steps (56 function evaluations).**

> [!warning] Trap
> Scaling the error linearly in $h$ (as if the method were Euler) and answering $h\approx3\times10^{-3}$, or scaling as $h^{2}$ and answering $h\approx0.039$. Both give many more steps than necessary and show the wrong order.

## Traps & Exam Notes

- **Using the wrong factor when the step changes.** RK4 is $O(h^{4})$: halving $h$ divides the error by 16, not 4 or 2. Every step-size question on this topic turns on that number.
- **Evaluating $k_3$ at the end of the step.** $k_3$ uses the same midpoint $x_i+h/2$ as $k_2$, with the improved $y$-estimate. Moving it to $x_i+h$ breaks the derivation and drops the order.
- **Advancing $y$ by the full step inside the midpoint stages.** The $k_2$ and $k_3$ estimates are $y_i+\frac{h}{2}k_1$ and $y_i+\frac{h}{2}k_2$ — half steps. Using $h k_1$ doubles the predicted advance.
- **Summing the weights to 4 instead of 6.** The bracket is $k_1+2k_2+2k_3+k_4=6$ when all stages are equal, so the coefficient is $h/6$. Simplifying to $h/4$ gives an answer 50% too large in the constant-$f$ limit.
- **Reporting the stages as intermediate solutions.** $k_1,\dots,k_4$ are slopes. Only $y_{i+1}$ is a solution value; quoting $k_4$ as $y$ answers the wrong question.
- **Assuming RK4 fixes stiffness.** Its real-axis stability interval is roughly $-2.78\le\lambda h\le0$ — a modest improvement on Euler's $-2$ and nowhere near enough for stiff systems, which need implicit methods.
- **Expecting exactness for non-polynomial solutions.** RK4 is exact only when the solution is a polynomial of degree $\le4$. For $y'=y$ it is not exact at any $h$, and rounding the result to the exact value hides a real error.

## See Also

- [[09_Modified_Euler_and_Heun’s_Method]]
- [[08_Euler’s_Method]]
- [[07_Simpson’s_One-Third_and_Three-Eighth_Rules]]

---

[[09_Modified_Euler_and_Heun’s_Method|⬅ 09]] · [[_MOC_Numerical_Methods_and_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
