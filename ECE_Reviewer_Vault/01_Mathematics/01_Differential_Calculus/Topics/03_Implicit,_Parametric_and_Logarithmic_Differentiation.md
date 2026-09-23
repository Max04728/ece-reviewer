---
id: MATH-01-03
title: "Implicit, Parametric and Logarithmic Differentiation"
part: "01_Mathematics"
area: "01_Differential_Calculus"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Differentiation_Rules]]"]
tags: ["ece", "mathematics", "differential_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Implicit, Parametric and Logarithmic Differentiation

> [!abstract] Scope
> Differentiate functions defined implicitly, parametrically, or as variable powers using logarithmic differentiation.

## Core Concept

> [!tip] Intuition
> All three methods are the same trick: when $y$ is tangled up with $x$, differentiate the whole relationship and then isolate $\frac{dy}{dx}$ instead of trying to untangle it first.

**Implicit differentiation.** If $F(x,y) = 0$ defines $y$ as a function of $x$, differentiate both sides with respect to $x$, applying the chain rule to every $y$:
$$\frac{d}{dx}[y^n] = ny^{n-1}\frac{dy}{dx}$$
and to products of $x$ and $y$ apply the product rule. Then collect the $\frac{dy}{dx}$ terms and solve. The result usually still contains $y$ — that is normal and acceptable; you substitute the point's coordinates to get a numeric slope.

**Why the derivative can still contain $y$.** The slope of an implicit curve generally depends on *where* you are on it, and the location is given by both coordinates. A derivative in terms of $x$ alone is only possible when the relation is solvable for $y$, which is exactly the case implicit differentiation was invented to avoid. A useful consequence: to find where the tangent is horizontal, set the numerator of $\frac{dy}{dx}$ to zero; vertical tangents come from the denominator going to zero.

**Parametric differentiation.** For a curve traced by $x(t), y(t)$, the slope is the ratio of the rates:
$$\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$$
valid when $\frac{dx}{dt} \neq 0$. The parameter $t$ does not disappear; that is the point, because the curve may not be a function of $x$ at all (a circle, for instance).

**The parametric second derivative.** Because $\frac{dy}{dx}$ is itself a function of $t$, differentiating it with respect to $x$ requires the chain rule in reverse:
$$\frac{d^2y}{dx^2} = \frac{d}{dt}\left[\frac{dy}{dx}\right]\Big/\frac{dx}{dt}$$
Writing $\frac{d^2y/dt^2}{d^2x/dt^2}$ is the classic error and gives a wrong answer for every curve.

**Logarithmic differentiation.** For $y = f(x)^{g(x)}$ or a long product/quotient, take $\ln$ of both sides. This converts powers into multiplicative factors and products into sums, so the differentiation becomes trivial, after which you multiply back by $y$. It is the only reliable method when the variable appears in both the base and the exponent.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Implicit, differentiated term | $\frac{d}{dx}\left[y^n\right] = ny^{n-1}\frac{dy}{dx}$ | The dy/dx is the chain rule factor. Never omit it. |
| Implicit, differentiated product | $\frac{d}{dx}(xy) = y + x\frac{dy}{dx}$ | Product rule with y treated as y(x). |
| Parametric first derivative | $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$ | Undefined where dx/dt = 0: vertical tangent there. |
| Parametric second derivative | $\frac{d^2y}{dx^2} = \frac{1}{dx/dt}\cdot\frac{d}{dt}\left(\frac{dy}{dx}\right)$ | Divide by dx/dt a second time; do not use d2y/dt2 over d2x/dt2. |
| Horizontal tangent | $\frac{dy}{dx} = 0 \iff \mathrm{numerator} = 0$ | For implicit derivatives in quotient form, only the numerator matters. |
| Vertical tangent | $\frac{dx}{dy} = 0 \iff \mathrm{denominator} = 0$ | Slope is infinite; check the point is on the curve. |
| Logarithmic differentiation | $\frac{d}{dx}\ln y = \frac{y'}{y} \Rightarrow y' = y\,\frac{d}{dx}\ln y$ | Take ln, differentiate, multiply back by y. |
| Inverse function derivative | $\frac{dx}{dy} = \frac{1}{dy/dx}$ | Useful when differentiating the inverse is easier than the function. |

## Worked Problems

### P1. Find $\dfrac{dy}{dx}$ for $x^3 + y^3 = 6xy$ (the folium of Descartes).

**Given:** implicit cubic relation

**Solution:**

1. Differentiate each term with respect to x: 3x^2 + 3y^2 y' = 6(y + x y')
2. Expand the right side: 3x^2 + 3y^2 y' = 6y + 6x y'
3. Collect y' terms: y'(3y^2 - 6x) = 6y - 3x^2
4. y' = (6y - 3x^2)/(3y^2 - 6x) = (2y - x^2)/(y^2 - 2x)

> [!success]- Answer
> **$y' = \dfrac{2y-x^2}{y^2-2x}$**

> [!warning] Trap
> Differentiating 6xy as 6y only, or as 6x y' only. It is a product: 6(y + xy').

### P2. Find the slope of the tangent to $x^2 + y^2 = 25$ at $(3,4)$.

**Given:** circle; point (3,4)

**Solution:**

1. Differentiate: 2x + 2y y' = 0
2. y' = -x/y
3. Substitute (3,4): y' = -3/4

> [!success]- Answer
> **$-3/4$**

> [!warning] Trap
> Solving for y = sqrt(25 - x^2) and forgetting the negative branch, or substituting into the wrong variable order (getting -4/3).

### P3. For $x = 2\cos t$, $y = 3\sin t$, find $\dfrac{dy}{dx}$ and $\dfrac{d^2y}{dx^2}$.

**Given:** parametric ellipse

**Solution:**

1. dx/dt = -2 sin t, dy/dt = 3 cos t
2. dy/dx = 3cos t / (-2 sin t) = -(3/2) cot t
3. Differentiate with respect to t: d/dt[-(3/2)cot t] = (3/2)csc^2 t
4. Divide by dx/dt = -2 sin t: d2y/dx2 = (3/2)csc^2 t / (-2 sin t) = -(3/4) csc^3 t

> [!success]- Answer
> **$\dfrac{dy}{dx} = -\dfrac{3}{2}\cot t$, $\dfrac{d^2y}{dx^2} = -\dfrac{3}{4}\csc^3 t$**

> [!warning] Trap
> Dividing by dx/dt only once, or using d2y/dt2 = -3 sin t over d2x/dt2 = -2 cos t. Both are wrong.

### P4. For $x = t^2 - 1$, $y = t^3 + t$, find $\dfrac{dy}{dx}$ at $t = 2$.

**Given:** parametric; t = 2

**Solution:**

1. dx/dt = 2t, dy/dt = 3t^2 + 1
2. dy/dx = (3t^2 + 1)/(2t)
3. At t = 2: (12 + 1)/4 = 13/4

> [!success]- Answer
> **$13/4$**

> [!warning] Trap
> Substituting t = 2 into x and y first, then differentiating the resulting point - there is nothing to differentiate.

### P5. Differentiate $y = (\sin x)^x$.

**Given:** variable base and variable exponent

**Solution:**

1. ln y = x ln(sin x)
2. y'/y = ln(sin x) + x * (cos x / sin x)
3. y'/y = ln(sin x) + x cot x
4. y' = (sin x)^x [ln(sin x) + x cot x]

> [!success]- Answer
> **$y' = (\sin x)^x\left[\ln(\sin x) + x\cot x\right]$**

> [!warning] Trap
> Treating it as a power (x(sin x)^{x-1} cos x) or as an exponential ((sin x)^x ln(sin x)). Both are incomplete.

## Traps & Exam Notes

- **Omitting $\frac{dy}{dx}$ on a $y$-term.** In implicit problems every differentiated $y$ carries a $\frac{dy}{dx}$. One omission and the isolation algebra is ruined.
- **Parametric second derivative.** $\frac{d^2y}{dx^2} \neq \frac{d^2y/dt^2}{d^2x/dt^2}$. Differentiate $\frac{dy}{dx}$ with respect to $t$, then divide by $\frac{dx}{dt}$.
- **Leaving $y'$ mixed into both sides.** Collect all $\frac{dy}{dx}$ terms on one side and factor before dividing. Skipping this step is the usual cause of a wrong final expression.
- **Forgetting to multiply back by $y$** after logarithmic differentiation, and answering with $\frac{y'}{y}$ instead of $y'$.
- **Using the power rule with a variable exponent.** Any expression of the form $f(x)^{g(x)}$ requires logarithmic differentiation.
- **Tangent vs normal.** A question asking for the normal wants the negative reciprocal slope; reading past that word is a common, entirely avoidable loss.
- **Implicit point verification.** After solving for a tangent condition you must confirm the resulting points satisfy the original equation.

## See Also

- [[02_Differentiation_Rules]]
- [[05_Extrema,_Concavity_and_Inflection]]
- [[04_Related_Rates]]

---

[[02_Differentiation_Rules|⬅ 02]] · [[_MOC_Differential_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Related_Rates|04 ➡]]
