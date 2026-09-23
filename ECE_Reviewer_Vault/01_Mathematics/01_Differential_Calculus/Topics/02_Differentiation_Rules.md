---
id: MATH-01-02
title: "Differentiation Rules"
part: "01_Mathematics"
area: "01_Differential_Calculus"
topic: 2
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Limits,_Continuity_and_L_Hopital]]"]
tags: ["ece", "mathematics", "differential_calculus"]
status: not-started
confidence: 0
last_reviewed: 2026-09-24
updated: 2026-09-23
---

# 02 — Differentiation Rules

> [!abstract] Scope
> Differentiate any elementary combination using the power, product, quotient and chain rules, and differentiate implicitly or parametrically.

## Core Concept

> [!tip] Intuition
> Every derivative rule is the same idea at different nesting depths: differentiate the outside, keep the inside, then multiply by the inside's own derivative. The chain rule is the only one that is genuinely new; product and quotient are bookkeeping.

**The core rules, all of them.** Power:
$$\frac{d}{dx}x^n = nx^{n-1}$$
for every real $n$. Product: $(uv)' = u'v + uv'$. Quotient:
$$\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$$
Chain:
$$\frac{d}{dx}f(g(x)) = f'(g(x))g'(x)$$
or in Leibniz form:
$$\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$$
Everything else — implicit, parametric, logarithmic, inverse-trig — is one of these four applied to a rearranged expression.

**The chain rule compounds.** For a triple composition $f(g(h(x)))$, the derivative carries three factors:
$$f'(g(h(x)))\cdot g'(h(x))\cdot h'(x)$$
Forgetting a factor is the single most common exam error. A reliable check when time allows: count the function layers and confirm the answer has that many multiplicative factors.

**Implicit differentiation.** When $y$ is defined by an equation rather than solved for, differentiate both sides with respect to $x$ and treat $y$ as a function of $x$, so every $y$-term picks up a $\frac{dy}{dx}$ by the chain rule. Example: $x^2+y^2=25$ gives $2x + 2y\frac{dy}{dx} = 0$, so $\frac{dy}{dx} = -x/y$. Substituting the point gives the slope directly — no need to solve for $y$ first, which is exactly why implicit form is used when solving is hard.

**Parametric differentiation and the second derivative trap.** For $x = f(t)$, $y = g(t)$:
$$\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$$
The second derivative is **not** $\frac{d^2y/dt^2}{d^2x/dt^2}$. The correct expression is:
$$\frac{d}{dt}\left[\frac{dy}{dx}\right] \div \frac{dx}{dt}$$
This is the most-failed item in the whole topic.

**Logarithmic differentiation.** Take $\ln$ of both sides first when the function is a variable raised to a variable power, $y = f(x)^{g(x)}$, or a tall product/quotient. Then $\frac{y'}{y} = \frac{d}{dx}[\ln y]$, so $y' = y\cdot\frac{d}{dx}[\ln y]$. The method converts products into sums and powers into factors, which is why it exists.

## Derivation

**Product rule, from the definition.** Write the difference quotient and add zero in a useful form:

$$\frac{u(x+h)v(x+h) - u(x)v(x)}{h} = \frac{[u(x+h)-u(x)]v(x+h) + u(x)[v(x+h)-v(x)]}{h}.$$

As $h\to 0$ the first bracket tends to $u'(x)$, $v(x+h)\to v(x)$, and the second bracket over $h$ tends to $v'(x)$. The limit is therefore $u'v + uv'$.

**Quotient rule, from the product rule.** Write $Q = u/v$, so $u = Qv$. Differentiate both sides: $u' = Q'v + Qv'$. Solve for $Q'$: $Q' = \frac{u' - Qv'}{v}$. Substituting $Q = u/v$ gives $Q' = \frac{u' - (u/v)v'}{v} = \frac{u'v - uv'}{v^2}$. The quotient rule is therefore not independent — it is the product rule applied to an inverse.

**Chain rule, Leibniz form.** The statement $\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$ is not a cancellation of fractions, but it can be motivated by writing the difference quotient as $\frac{\Delta y}{\Delta x} = \frac{\Delta y}{\Delta u}\cdot\frac{\Delta u}{\Delta x}$ for $\Delta u\neq 0$, then taking the limit. The rigorous proof handles $\Delta u = 0$, which is why the informal cancellation is a memory aid rather than a proof.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Power rule | $\frac{d}{dx}x^n = nx^{n-1}$ | Valid for all real n, including negative and fractional exponents. |
| Product rule | $(uv)' = u'v + uv'$ | Two terms always. Symmetric, so order does not matter. |
| Quotient rule | $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ | Order matters: u'v - uv', not the reverse. Low d-high minus high d-low, over low squared. |
| Chain rule | $\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$ | One factor per function layer. Most-missed rule in exams. |
| Implicit differentiation | $\frac{d}{dx}\left[y^n\right] = ny^{n-1}\frac{dy}{dx}$ | Every y-term acquires dy/dx via the chain rule. |
| Parametric first derivative | $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$ | Requires dx/dt != 0 at the point. |
| Parametric second derivative | $\frac{d^2y}{dx^2} = \frac{\frac{d}{dt}\left[\frac{dy}{dx}\right]}{\frac{dx}{dt}}$ | NOT (d2y/dt2)/(d2x/dt2). Differentiate dy/dx with respect to t, then divide by dx/dt. |
| Logarithmic differentiation | $y' = y\cdot\frac{d}{dx}\left[\ln y\right]$ | For f(x)^g(x) or tall products. Take ln first, differentiate, multiply back by y. |
| Inverse function derivative | $\frac{dx}{dy} = \frac{1}{dy/dx}$ | For differentiating inverse trig and inverse functions generally. |
| Derivative of a^x | $\frac{d}{dx}a^x = a^x \ln a$ | Reduces to e^x when a = e because ln e = 1. |

## Worked Problems

### P1. Differentiate $y = (3x^2 + 1)^5$.

**Given:** composite power function

**Solution:**

1. Identify the layers: outer ( )^5, inner 3x^2 + 1
2. Outer derivative: 5(3x^2 + 1)^4
3. Multiply by the inner derivative: d/dx(3x^2 + 1) = 6x
4. y' = 5(3x^2 + 1)^4 * 6x = 30x(3x^2 + 1)^4

> [!success]- Answer
> **$y' = 30x(3x^2+1)^4$**

> [!warning] Trap
> Forgetting the inner factor 6x, giving 5(3x^2+1)^4.

### P2. Differentiate $y = x^2 e^{3x}$.

**Given:** product of a polynomial and an exponential

**Solution:**

1. Product rule with u = x^2, v = e^{3x}
2. u' = 2x
3. v' = 3e^{3x} (chain rule on the exponent)
4. y' = 2x e^{3x} + x^2 (3e^{3x}) = x e^{3x}(2 + 3x)

> [!success]- Answer
> **$y' = xe^{3x}(2+3x)$**

> [!warning] Trap
> Differentiating e^{3x} as e^{3x} and dropping the 3. Factoring is optional but usually expected.

### P3. Differentiate $y = \dfrac{\sin x}{x}$.

**Given:** quotient

**Solution:**

1. u = sin x, u' = cos x; v = x, v' = 1
2. y' = (u'v - uv')/v^2 = (x cos x - sin x * 1)/x^2
3. y' = (x cos x - sin x)/x^2

> [!success]- Answer
> **$y' = \dfrac{x\cos x - \sin x}{x^2}$**

> [!warning] Trap
> Reversing the numerator to sin x - x cos x (sign error). Remember: low d-high minus high d-low.

### P4. Find $\dfrac{dy}{dx}$ if $x^2 + xy + y^2 = 7$.

**Given:** implicit equation

**Solution:**

1. Differentiate term by term with respect to x, treating y as y(x)
2. 2x + (y + x y') + 2y y' = 0   [product rule on xy, chain rule on y^2]
3. Group the y' terms: x y' + 2y y' = -2x - y
4. y' = -(2x + y)/(x + 2y)

> [!success]- Answer
> **$y' = -\dfrac{2x+y}{x+2y}$**

> [!warning] Trap
> Differentiating xy as just y (forgetting the product rule) or y^2 as 2y without the y' factor.

### P5. For $x = t^2$, $y = t^3$, find $\dfrac{d^2y}{dx^2}$.

**Given:** parametric equations

**Solution:**

1. dy/dt = 3t^2, dx/dt = 2t
2. dy/dx = 3t^2/(2t) = (3/2)t
3. Differentiate dy/dx with respect to t: d/dt[(3/2)t] = 3/2
4. Divide by dx/dt: (3/2)/(2t) = 3/(4t)

> [!success]- Answer
> **$\dfrac{d^2y}{dx^2} = \dfrac{3}{4t}$**

> [!warning] Trap
> Computing (d2y/dt2)/(d2x/dt2) = 6t/2 = 3t. Wrong. The second derivative needs d/dt of the first derivative, then division by dx/dt.

### P6. Differentiate $y = x^x$ for $x > 0$.

**Given:** variable to a variable power

**Solution:**

1. Take natural log: ln y = x ln x
2. Differentiate implicitly: y'/y = ln x + x(1/x) = ln x + 1
3. Multiply by y: y' = x^x (ln x + 1)

> [!success]- Answer
> **$y' = x^x(\ln x + 1)$**

> [!warning] Trap
> Applying the power rule (giving x*x^{x-1}) or the exponential rule (giving x^x ln x). Neither works when both base and exponent vary.

### P7. Differentiate $y = \ln(\cos x)$.

**Given:** logarithm of a trigonometric function

**Solution:**

1. Outer: ln( ) -> 1/( )
2. Inner derivative: d/dx(cos x) = -sin x
3. y' = (1/cos x)(-sin x)
4. y' = -tan x

> [!success]- Answer
> **$y' = -\tan x$**

> [!warning] Trap
> Writing 1/cos x and stopping, or losing the negative sign.

### P8. Differentiate $y = \arctan(2x)$.

**Given:** inverse trigonometric composite

**Solution:**

1. Standard form: d/du arctan u = 1/(1 + u^2)
2. With u = 2x: y' = [1/(1 + (2x)^2)] * d/dx(2x)
3. y' = 2/(1 + 4x^2)

> [!success]- Answer
> **$y' = \dfrac{2}{1+4x^2}$**

> [!warning] Trap
> Squaring only x instead of the whole 2x, giving 2/(1+2x^2).

### P9. Differentiate $y = e^{\sin x^2}$.

**Given:** three nested layers

**Solution:**

1. Layer 1 (outermost, exponential): derivative is e^{sin x^2}
2. Layer 2 (sine): derivative is cos(x^2)
3. Layer 3 (square): derivative is 2x
4. Multiply all three: y' = e^{sin x^2} * cos(x^2) * 2x

> [!success]- Answer
> **$y' = 2x\cos(x^2)e^{\sin x^2}$**

> [!warning] Trap
> Producing only two of the three factors. Layers = factors is the check.

### P10. Use logarithmic differentiation on $y = \dfrac{x^2\sqrt{x+1}}{(x-2)^3}$.

**Given:** tall quotient with a root

**Solution:**

1. Take ln: ln y = 2 ln x + (1/2)ln(x+1) - 3 ln(x-2)
2. Differentiate: y'/y = 2/x + 1/(2(x+1)) - 3/(x-2)
3. Multiply back by y: y' = y [2/x + 1/(2(x+1)) - 3/(x-2)]
4. Substitute y back in factored form, leaving the bracket expanded

> [!success]- Answer
> **$y' = \dfrac{x^2\sqrt{x+1}}{(x-2)^3}\left[\dfrac{2}{x} + \dfrac{1}{2(x+1)} - \dfrac{3}{x-2}\right]$**

> [!warning] Trap
> Forgetting to multiply back by y at the end and leaving y'/y as the answer. Also: ln((x-2)^3) is 3 ln(x-2), and the minus sign comes from the quotient.

## Traps & Exam Notes

- **Chain rule omission.** The most frequent error in the entire differential calculus block. $\frac{d}{dx}\sin(3x) = 3\cos(3x)$, never $\cos(3x)$.
- **Quotient rule order.** It is $\frac{u'v-uv'}{v^2}$. Reversing the numerator flips the sign of the whole answer and is easy to do under time pressure.
- **Parametric second derivative.** Never $\frac{d^2y/dt^2}{d^2x/dt^2}$. Differentiate $\frac{dy}{dx}$ with respect to $t$, then divide by $\frac{dx}{dt}$.
- **Implicit differentiation drops $\frac{dy}{dx}$.** Every $y$-term differentiated with respect to $x$ acquires a $\frac{dy}{dx}$ factor. Forgetting it on one term invalidates the algebra.
- **Power rule on variable exponents.** $\frac{d}{dx}x^x \neq xx^{x-1}$. Use logarithmic differentiation whenever both base and exponent depend on $x$.
- $\frac{d}{dx}a^x = a^x\ln a$, not $xa^{x-1}$ and not $a^x$. The exponential rule and the power rule are different rules for different placements of the variable.
- **Notation.** $\frac{d}{dx}$ is an operator applied to the whole following expression; $\frac{dy}{dx}$ is one symbol, not a fraction to be split casually — except in the chain rule, where the Leibniz form legitimately treats it as one.

## See Also

- [[01_Limits,_Continuity_and_L_Hopital]]
- [[03_Implicit,_Parametric_and_Logarithmic_Differentiation]]
- [[05_Extrema,_Concavity_and_Inflection]]

---

[[01_Limits,_Continuity_and_L_Hopital|⬅ 01]] · [[_MOC_Differential_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Implicit,_Parametric_and_Logarithmic_Differentiation|03 ➡]]
