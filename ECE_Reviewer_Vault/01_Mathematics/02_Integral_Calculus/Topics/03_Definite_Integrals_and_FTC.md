---
id: MATH-02-03
title: "Definite Integrals and FTC"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 3
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Antiderivatives_and_Standard_Forms]]", "[[02_Algebraic_Substitution]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Definite Integrals and FTC

> [!abstract] Scope
> Evaluate definite integrals with the Fundamental Theorem of Calculus, and differentiate accumulation functions.

## Core Concept

> [!tip] Intuition
> The Fundamental Theorem says that accumulating area and finding slopes are inverse operations. That is why integration undoes differentiation, and why an area can be computed from an antiderivative alone.

**Part 1 — differentiating an accumulation function.** If $f$ is continuous on $[a,b]$ and $F(x) = \int_a^x f(t)\,dt$, then $F'(x) = f(x)$. The accumulation function is differentiable, and its derivative is the integrand evaluated at the upper limit. The variable of integration is a dummy: $t$ exists only inside the integral and must not appear in the answer.

**Part 2 — evaluating a definite integral.** If $F$ is any antiderivative of $f$ on $[a,b]$, then $\int_a^b f(x)\,dx = F(b) - F(a)$. The constant of integration is irrelevant because it cancels, which is why definite integrals are written $[F(x)]_a^b$ with no $+C$. Read it as *value at the top limit minus value at the bottom limit*, always in that order.

**Signed area.** A definite integral computes net signed area: regions below the $x$-axis contribute negatively. If a question asks for *total* area enclosed, you must split the interval at the zeros of the integrand and add absolute values. Answering a total-area question with the raw integral is a standard and fully avoidable error.

**Chain rule with a variable limit.** For $F(x) = \int_{a}^{g(x)} f(t)\,dt$ the derivative is $F'(x) = f(g(x))\,g'(x)$. When the variable is in the lower limit, $F(x) = \int_{h(x)}^{a} f(t)\,dt$ reverses the sign:
$$F'(x) = -f(h(x))h'(x)$$
When both limits vary, split the integral at a fixed point and apply both rules.

**Properties that save work.** $\int_a^a f = 0$;
$$\int_b^a f = -\int_a^b f$$
(swapping limits flips the sign);
$$\int_a^b f + \int_b^c f = \int_a^c f$$
(splitting is always allowed). For even and odd functions over a symmetric interval $[-a,a]$: an even integrand $f(-x)=f(x)$ gives $2\int_0^a f$, and an odd integrand $f(-x)=-f(x)$ gives $0$. Recognising symmetry can collapse an apparently hard integral to zero instantly.

## Derivation

**Part 1 from the definition of the derivative.** Let $F(x) = \int_a^x f(t)\,dt$. Then

$$F(x+h) - F(x) = \int_x^{x+h} f(t)\,dt.$$

For small $h$ and continuous $f$, that sliver of area is approximately a rectangle of height $f(x)$ and width $h$, so $F(x+h)-F(x) \approx h f(x)$. Dividing by $h$ and letting $h \to 0$ gives $F'(x) = f(x)$. The Mean Value Theorem for integrals makes the approximation exact in the limit, which is why continuity of $f$ is the required hypothesis.

**Part 2 from Part 1.** Let $G(x) = \int_a^x f(t)\,dt$. By Part 1, $G' = f$, so $G$ is *an* antiderivative of $f$. Any other antiderivative differs from $G$ by a constant: $F = G + C$. Then

$$F(b) - F(a) = [G(b)+C] - [G(a)+C] = G(b) - G(a) = \int_a^b f - \int_a^a f = \int_a^b f,$$

because $\int_a^a f = 0$ and $G(a) = 0$. This is the whole content of the theorem: evaluating any antiderivative at the limits computes the accumulation.

**Why the chain rule appears for variable limits.** If $F(x) = \int_a^{g(x)} f(t)\,dt = G(g(x))$ where $G$ is the accumulation function from $a$, then the chain rule gives $F'(x) = G'(g(x))\,g'(x) = f(g(x))g'(x)$. The chain rule is not an add-on: it is automatic once the upper limit is itself a function.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| FTC Part 1 | $\frac{d}{dx}\int_a^x f(t)\,dt = f(x)$ | Requires f continuous at x. The dummy variable t must not survive. |
| FTC Part 2 | $\int_a^b f(x)\,dx = F(b) - F(a)$ | Any antiderivative. The constant cancels, so no +C. |
| Variable upper limit | $\frac{d}{dx}\int_a^{g(x)} f(t)\,dt = f(g(x))\,g'(x)$ | Chain rule applies. Most common exam variant. |
| Variable lower limit | $\frac{d}{dx}\int_{h(x)}^{a} f(t)\,dt = -f(h(x))\,h'(x)$ | Reversing the limits introduces the minus sign. |
| Both limits variable | $\frac{d}{dx}\int_{h(x)}^{g(x)} f = f(g)g' - f(h)h'$ | Split at a fixed point, then apply each rule. |
| Reversed limits | $\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$ | Flipping the limits flips the sign. |
| Additivity | $\int_a^b f + \int_b^c f = \int_a^c f$ | Valid for any ordering of a, b, c. |
| Even function on [-a,a] | $\int_{-a}^{a} f = 2\int_0^a f \quad (f \mathrm{\ even})$ | Symmetric integrand: double the half. |
| Odd function on [-a,a] | $\int_{-a}^{a} f = 0 \quad (f \mathrm{\ odd})$ | Antisymmetric integrand: the integral vanishes. |
| Net vs total area | $\mathrm{total\ area} = \int_a^b \lvert f(x) \rvert\,dx$ | Split at the zeros of f; the raw integral gives net signed area only. |
| Average value | $f_{\mathrm{avg}} = \frac{1}{b-a}\int_a^b f(x)\,dx$ | Direct consequence of the FTC. |

## Worked Problems

### P1. Evaluate $\displaystyle\int_1^3 (2x+1)\,dx$.

**Given:** definite integral of a linear function

**Solution:**

1. Antidifferentiate: x^2 + x
2. Apply the limits: [x^2 + x]_1^3 = (9 + 3) - (1 + 1)
3. = 12 - 2

> [!success]- Answer
> **$10$**

> [!warning] Trap
> Subtracting in the wrong order, giving -10. Always top limit minus bottom limit.

### P2. Evaluate $\displaystyle\int_0^{\pi/2} \cos x\,dx$.

**Given:** trigonometric definite integral

**Solution:**

1. Antiderivative: sin x
2. Apply limits: sin(pi/2) - sin(0)
3. = 1 - 0

> [!success]- Answer
> **$1$**

> [!warning] Trap
> Using radians incorrectly (the limits are in radians), or reporting -1 from a sign slip. The area here is positive because cos x >= 0 on this interval.

### P3. Find the total area enclosed between $y = x^2 - 4$ and the $x$-axis on $[-3, 3]$.

**Given:** integrand changes sign; total area requested

**Solution:**

1. Find the zeros: x^2 - 4 = 0 at x = ±2
2. Note the function is negative on (-2,2) and positive on (-3,-2) and (2,3)
3. Compute the integral in pieces and take absolute values
4. ∫_{-3}^{-2}(x^2-4)dx = [x^3/3 - 4x] = (-8/3+8) - (-9+12) = 16/3 - 3 = 7/3
5. ∫_{-2}^{2}(x^2-4)dx = (8/3-8) - (-8/3+8) = -32/3, absolute value 32/3
6. By symmetry the third piece is also 7/3
7. Total = 7/3 + 32/3 + 7/3 = 46/3

> [!success]- Answer
> **$\dfrac{46}{3}$ square units**

> [!warning] Trap
> Reporting the net signed integral ∫_{-3}^{3}(x^2-4)dx = 16/3 - 32/3 = -16/3. Total area requires splitting at the zeros; the raw integral is the net area.

### P4. Find $\dfrac{d}{dx}\displaystyle\int_0^{x^2} \sin t\,dt$.

**Given:** variable upper limit; chain rule required

**Solution:**

1. Apply FTC Part 1 with the chain rule: the integrand at the upper limit, times the derivative of the limit
2. f(g(x)) = sin(x^2)
3. g'(x) = 2x
4. Multiply

> [!success]- Answer
> **$2x\sin(x^2)$**

> [!warning] Trap
> Answering sin(x^2) and omitting the chain-rule factor 2x. The most common error in this question type.

### P5. Evaluate $\displaystyle\int_{-2}^{2} \left(x^3 + x\right)dx$ using symmetry.

**Given:** odd integrand on a symmetric interval

**Solution:**

1. Check the symmetry: f(-x) = -x^3 - x = -(x^3 + x) = -f(x), so f is odd
2. The interval [-2,2] is symmetric about the origin
3. For an odd integrand over a symmetric interval the integral is zero
4. Verify directly: [x^4/4 + x^2/2] from -2 to 2 = (4+2) - (4+2) = 0

> [!success]- Answer
> **$0$**

> [!warning] Trap
> Integrating term by term and making an arithmetic slip. Recognising the odd symmetry answers it immediately - and the substitution check confirms it.

### P6. If $F(x) = \displaystyle\int_{x}^{5} \frac{1}{t}\,dt$ for $x > 0$, find $F'(x)$.

**Given:** variable lower limit

**Solution:**

1. Rewrite with the limits reversed to put the variable on top: F(x) = -∫_5^x (1/t) dt
2. Apply FTC Part 1 with the chain rule: F'(x) = -(1/x)(1)
3. So F'(x) = -1/x

> [!success]- Answer
> **$F'(x) = -\dfrac{1}{x}$**

> [!warning] Trap
> Answering +1/x and forgetting the sign flip that comes from reversing the limits.

### P7. Evaluate $\displaystyle\int_0^4 |x - 2|\,dx$.

**Given:** absolute value integrand

**Solution:**

1. Split at x = 2 where the sign of the inside changes
2. On [0,2]: |x-2| = 2-x; on [2,4]: |x-2| = x-2
3. ∫_0^2 (2-x)dx = [2x - x^2/2]_0^2 = 4 - 2 = 2
4. ∫_2^4 (x-2)dx = [x^2/2 - 2x]_2^4 = (8-8) - (2-4) = 2
5. Total = 2 + 2

> [!success]- Answer
> **$4$**

> [!warning] Trap
> Integrating |x-2| as if the bars were not there, which gives 0 by symmetry - the wrong answer, because absolute value removes the sign cancellation.

### P8. Find the average value of $f(x) = x^2$ on $[0,3]$.

**Given:** average value definition

**Solution:**

1. f_avg = (1/(3-0))∫_0^3 x^2 dx
2. ∫_0^3 x^2 dx = [x^3/3]_0^3 = 9
3. f_avg = 9/3 = 3

> [!success]- Answer
> **$3$**

> [!warning] Trap
> Forgetting to divide by the interval length (b - a) and reporting 9.

### P9. Given $\displaystyle\int_1^5 f(x)\,dx = 9$ and $\displaystyle\int_1^3 f(x)\,dx = 4$, find $\displaystyle\int_3^5 f(x)\,dx$.

**Given:** additivity of the integral

**Solution:**

1. Additivity: ∫_1^5 f = ∫_1^3 f + ∫_3^5 f
2. 9 = 4 + ∫_3^5 f
3. So ∫_3^5 f = 5

> [!success]- Answer
> **$5$**

> [!warning] Trap
> Subtracting in the wrong direction, giving -5, or attempting to find f(x) explicitly when only the additive property is needed.

### P10. Find $\dfrac{d}{dx}\displaystyle\int_{x^2}^{x^3} e^{t}\,dt$.

**Given:** both limits variable

**Solution:**

1. Split at a fixed point, 0: = d/dx[∫_0^{x^3} e^t dt - ∫_0^{x^2} e^t dt]
2. First term by FTC with chain rule: e^{x^3} * 3x^2
3. Second term: e^{x^2} * 2x
4. Subtract

> [!success]- Answer
> **$3x^2e^{x^3} - 2xe^{x^2}$**

> [!warning] Trap
> Writing e^{x^3} - e^{x^2} and losing both chain-rule factors, or adding the two terms instead of subtracting.

## Traps & Exam Notes

- **Limits in the wrong order.** $F(b) - F(a)$ always: top limit minus bottom limit. Reversing the subtraction flips the sign of the whole answer.
- **Net area versus total area.** The definite integral gives net signed area. A question asking for the area *enclosed* requires splitting at the zeros and taking absolute values.
- **Omitting the chain-rule factor** in $\frac{d}{dx}\int_a^{g(x)} f(t)\,dt$. The answer is $f(g(x))g'(x)$, not $f(g(x))$.
- **Variable lower limit sign.** $\frac{d}{dx}\int_{h(x)}^{a} f = -f(h(x))h'(x)$. Reverse the limits first and the sign takes care of itself.
- **Leaving the dummy variable in the answer.** $\frac{d}{dx}\int_a^x f(t)\,dt = f(x)$, not $f(t)$.
- **Applying the FTC across a discontinuity.** The theorem needs $f$ continuous on $[a,b]$. For an integrand such as $1/x^2$ on $[-1,1]$ the antiderivative is not continuous across the interval and the naive evaluation gives a nonsense negative 'area'.
- **Adding $+C$ to a definite integral.** It cancels by construction; including it in a numeric answer signals a conceptual slip.
- **Missing symmetry.** Checking even/odd before integrating over a symmetric interval can reduce the work to zero.

## See Also

- [[01_Antiderivatives_and_Standard_Forms]]
- [[02_Algebraic_Substitution]]
- [[08_Average_Value_and_MVT_for_Integrals]]

---

[[02_Algebraic_Substitution|⬅ 02]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Integration_by_Parts_and_Tabular|04 ➡]]
