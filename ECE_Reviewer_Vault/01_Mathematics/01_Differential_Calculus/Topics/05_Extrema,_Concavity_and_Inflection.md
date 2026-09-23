---
id: MATH-01-05
title: "Extrema, Concavity and Inflection"
part: "01_Mathematics"
area: "01_Differential_Calculus"
topic: 5
tier: 1
depth: full
problem_count: 8
prereqs: ["[[02_Differentiation_Rules]]"]
tags: ["ece", "mathematics", "differential_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Extrema, Concavity and Inflection

> [!abstract] Scope
> Locate critical points, classify extrema with the first and second derivative tests, and determine concavity and inflection points.

## Core Concept

> [!tip] Intuition
> The first derivative answers *which way* the curve is going; the second answers *which way it bends*. Together they let you sketch a function accurately without plotting points.

**Critical points.** A critical point of $f$ is a value $c$ in the domain where $f'(c) = 0$ or $f'(c)$ does not exist. These are the only candidates for local extrema, but a critical point is not automatically an extremum — $f(x)=x^3$ has $f'(0)=0$ with no extremum there. Always test.

**First derivative test.** Determine the sign of $f'$ on each interval between critical points. If $f'$ changes from $+$ to $-$, you have a local maximum; from $-$ to $+$, a local minimum; no sign change means neither (a saddle or flat inflection). This test always works, including where $f'$ is undefined, which the second derivative test cannot handle.

**Second derivative test.** At a critical point with $f'(c)=0$: $f''(c) < 0$ gives a local maximum, $f''(c) > 0$ a local minimum, and $f''(c) = 0$ is **inconclusive** — fall back to the first derivative test. The test is faster when $f''$ is easy to compute, which is often but not always.

**Concavity and inflection.** $f'' > 0$ on an interval means concave up (holds water, tangent lies below the curve); $f'' < 0$ means concave down. An inflection point is where concavity *changes*, and it requires both $f''(c) = 0$ (or undefined) **and** an actual sign change in $f''$ across $c$. $f(x) = x^4$ has $f''(0) = 0$ with no inflection, because $f''$ stays positive.

**Extrema on a closed interval.** The candidates are the critical points *and both endpoints*. Compare values; the largest is the absolute maximum and the smallest the absolute minimum. Omitting the endpoints is the standard error in this question type.

## Derivation

**First derivative test, from the definition.** For $h > 0$ small, if $f'(c) = 0$ then the difference quotient gives $f(c+h) - f(c) \approx h f'(c) = 0$ to first order, so the sign of $f(c+h) - f(c)$ is governed by the next term, $\frac{h^2}{2}f''(c)$. That is why a nonzero $f''$ decides the extremum, and why $f''(c) = 0$ leaves the question open: the decision then falls to the first nonzero higher derivative.

**Why $f''(c) = 0$ is inconclusive.** $f(x) = x^4$ has $f'(0)=f''(0)=0$ and a minimum at 0; $f(x) = -x^4$ has the same derivatives and a maximum; $f(x) = x^3$ has both zero at 0 and neither. Three different outcomes from identical second-derivative information, so no conclusion is possible.

**Inflection requires a sign change.** $f''(c) = 0$ alone is only a *candidate*. For $f(x) = x^4$, $f''(x) = 12x^2 \geq 0$ everywhere, so concavity never changes and there is no inflection despite $f''(0)=0$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Critical point condition | $f'(c) = 0 \;\mathrm{or}\; f'(c) \mathrm{\ undefined}$ | Candidates only - must still be tested. |
| First derivative test | $f': +\to- \Rightarrow \mathrm{max}, \quad -\to+ \Rightarrow \mathrm{min}$ | Works everywhere, including where f' is undefined. |
| Second derivative test | $f''(c) < 0 \Rightarrow \mathrm{max}, \quad f''(c) > 0 \Rightarrow \mathrm{min}$ | Requires f'(c) = 0. Gives no answer when f''(c) = 0. |
| Concavity | $f'' > 0 \Rightarrow \mathrm{concave\ up}, \quad f'' < 0 \Rightarrow \mathrm{concave\ down}$ | Concave up = tangent below the curve = holds water. |
| Inflection point | $f''(c) = 0 \;\mathrm{and}\; f'' \mathrm{\ changes\ sign\ at\ } c$ | Both conditions. f''(c)=0 alone is not enough. |
| Absolute extrema on [a,b] | $\mathrm{compare\ } f \mathrm{\ at\ critical\ points\ and\ at\ } a, b$ | Endpoints are always candidates on a closed interval. |
| Tangent line at a point | $y - f(c) = f'(c)(x - c)$ | At an extremum f'(c) = 0, so the tangent is horizontal. |

## Interactive Widget

**Curve Sketching Slider**

![[Curve_Sketching_Slider.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find and classify all critical points of $f(x) = x^3 - 3x^2 + 4$.

**Given:** cubic polynomial

**Solution:**

1. f'(x) = 3x^2 - 6x = 3x(x - 2)
2. Critical points where f' = 0: x = 0 and x = 2
3. f''(x) = 6x - 6
4. f''(0) = -6 < 0, so x = 0 is a local maximum; f(0) = 4
5. f''(2) = 6 > 0, so x = 2 is a local minimum; f(2) = 8 - 12 + 4 = 0

> [!success]- Answer
> **Local max at $(0,4)$; local min at $(2,0)$.**

> [!warning] Trap
> Factoring 3x^2 - 6x as 3x(x - 6) and getting x = 6. Divide by 3 first: x^2 - 2x = x(x-2).

### P2. Determine the intervals of concavity and any inflection points for $f(x) = x^4 - 6x^2$.

**Given:** quartic

**Solution:**

1. f'(x) = 4x^3 - 12x, f''(x) = 12x^2 - 12 = 12(x^2 - 1)
2. f'' = 0 at x = -1 and x = 1
3. Test signs: f''(x) > 0 for x < -1, f'' < 0 on (-1,1), f'' > 0 for x > 1
4. Concavity changes at both points, so both are inflections
5. f(-1) = 1 - 6 = -5, f(1) = -5

> [!success]- Answer
> **Concave up on $(-\infty,-1)\cup(1,\infty)$, concave down on $(-1,1)$; inflection points $(-1,-5)$ and $(1,-5)$.**

> [!warning] Trap
> Reporting x = 0 (where f' = 0, a minimum) as an inflection. Inflection is about f'', not f'.

### P3. Find the absolute maximum and minimum of $f(x) = x^3 - 3x + 1$ on $[-2, 3]$.

**Given:** closed interval; endpoints must be checked

**Solution:**

1. f'(x) = 3x^2 - 3 = 0 gives x = ±1, both inside [-2,3]
2. Evaluate: f(-2) = -8 + 6 + 1 = -1; f(-1) = -1 + 3 + 1 = 3; f(1) = 1 - 3 + 1 = -1; f(3) = 27 - 9 + 1 = 19
3. Compare all four: largest 19, smallest -1

> [!success]- Answer
> **Absolute maximum $19$ at $x=3$; absolute minimum $-1$ at $x=-2$ and $x=1$.**

> [!warning] Trap
> Reporting the critical point values only, which gives a maximum of 3 and misses the actual maximum 19 at the endpoint.

### P4. Classify the critical point of $f(x) = x^4$ at $x = 0$ using both tests.

**Given:** the inconclusive case

**Solution:**

1. f'(x) = 4x^3, so f'(0) = 0; f''(x) = 12x^2, so f''(0) = 0
2. Second derivative test is inconclusive
3. First derivative test: f'(x) < 0 for x < 0 and f' > 0 for x > 0
4. Sign changes from - to +, so x = 0 is a local minimum

> [!success]- Answer
> **Local minimum at $(0,0)$; the second derivative test fails here.**

> [!warning] Trap
> Concluding 'neither' or 'cannot be determined' from f''(0) = 0. Inconclusive for the second derivative test does not mean inconclusive overall.

### P5. Find where $f(x) = x e^{-x}$ has its maximum.

**Given:** product requiring the product rule

**Solution:**

1. f'(x) = e^{-x} + x(-e^{-x}) = e^{-x}(1 - x)
2. f' = 0 when x = 1 (e^{-x} is never zero)
3. f''(x) = -e^{-x}(1 - x) + e^{-x}(-1) = e^{-x}(x - 2)
4. f''(1) = e^{-1}(-1) < 0, so a maximum
5. f(1) = e^{-1}

> [!success]- Answer
> **Maximum at $(1, 1/e)$.**

> [!warning] Trap
> Setting f'(x) = e^{-x} = 0 and claiming no critical point. Factor first: the bracket (1 - x) supplies the root.

### P6. Sketch the behaviour of $f(x) = \dfrac{x}{x^2+1}$: find extrema and inflections.

**Given:** rational function

**Solution:**

1. f'(x) = [(1)(x^2+1) - x(2x)]/(x^2+1)^2 = (1 - x^2)/(x^2+1)^2
2. f' = 0 at x = ±1
3. f''(x) = [(-2x)(x^2+1)^2 - (1-x^2)(2)(x^2+1)(2x)]/(x^2+1)^4 = 2x(x^2-3)/(x^2+1)^3
4. f'' = 0 at x = 0 and x = ±sqrt(3)
5. f(1) = 1/2 (maximum), f(-1) = -1/2 (minimum)

> [!success]- Answer
> **Max at $(1,\tfrac12)$, min at $(-1,-\tfrac12)$; inflections at $x=0, \pm\sqrt{3}$.**

> [!warning] Trap
> Using the quotient rule incorrectly by omitting the squaring of the denominator, or forgetting that f'' needs the quotient rule applied to f'.

### P7. Find the critical points of $f(x) = x^{2/3}$ and classify them.

**Given:** fractional exponent; f' undefined at the origin

**Solution:**

1. f'(x) = (2/3)x^{-1/3} = 2/(3 x^{1/3})
2. f' is never zero, but it is undefined at x = 0
3. x = 0 is therefore a critical point by the second condition
4. For x < 0, f' < 0; for x > 0, f' > 0: the sign changes from - to +
5. So x = 0 is a local (in fact absolute) minimum, f(0) = 0

> [!success]- Answer
> **Critical point $x=0$, a local minimum.**

> [!warning] Trap
> Concluding there are no critical points because f'(x) is never zero. The definition includes points where f' does not exist.

### P8. A function has $f''(x) = 6x(x-1)^2$. Find all inflection points.

**Given:** f'' in factored form; repeated root

**Solution:**

1. f'' = 0 at x = 0 and x = 1
2. For x < 0: 6x < 0 and (x-1)^2 > 0, so f'' < 0
3. For 0 < x < 1: 6x > 0 and (x-1)^2 > 0, so f'' > 0
4. For x > 1: both factors positive, so f'' > 0
5. Sign changes only at x = 0; at x = 1 the sign is positive on both sides

> [!success]- Answer
> **Inflection at $x=0$ only; $x=1$ is not an inflection despite $f''(1)=0$.**

> [!warning] Trap
> Listing both roots of f''=0. An even-multiplicity root of f'' does not change sign, so it is not an inflection point.

## Traps & Exam Notes

- **$f''(c)=0$ is inconclusive, not 'no extremum'.** Fall back to the first derivative test.
- **Inflection needs a concavity change**, not merely $f''=0$. $f(x)=x^4$ has $f''(0)=0$ and no inflection.
- **Forgetting the endpoints** on a closed interval. Absolute extrema on $[a,b]$ require comparing $f$ at $a$ and $b$ as well.
- **Confusing $f'$ and $f''$ roles.** $f'$ locates extrema; $f''$ determines concavity and classifies extrema. A question about 'where the curve bends' is about $f''$ only.
- **Losing domain restrictions.** A rational function's critical points must lie in its domain; a point where the function is undefined is never an extremum even if $f'=0$ nearby.

## See Also

- [[02_Differentiation_Rules]]
- [[06_Optimization_Problems]]
- [[08_Rolle’s_and_Mean_Value_Theorems]]

---

[[04_Related_Rates|⬅ 04]] · [[_MOC_Differential_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Optimization_Problems|06 ➡]]
