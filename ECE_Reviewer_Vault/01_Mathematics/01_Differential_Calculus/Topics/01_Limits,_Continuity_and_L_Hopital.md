---
id: MATH-01-01
title: "Limits, Continuity and L’Hôpital"
part: "01_Mathematics"
area: "01_Differential_Calculus"
topic: 1
tier: 1
depth: full
problem_count: 10
prereqs: []
tags: ["ece", "mathematics", "differential_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Limits, Continuity and L’Hôpital

> [!abstract] Scope
> Evaluate limits algebraically, by L'Hopital's rule, and at infinity; test continuity at a point and find parameters that restore it.

## Core Concept

> [!tip] Intuition
> A limit asks where the function is *heading*, not what it equals there. That is why algebraic cleanup works: two functions that agree everywhere except at x = a have the same limit at a, even though their values there may differ.

Three ideas that students blur together:

- **Limit** — $L = \lim_{x\to a} f(x)$ exists when $f(x)$ can be forced arbitrarily close to $L$ from both sides. $f(a)$ itself is irrelevant; $f$ need not even be defined at $a$.
- **Continuity at a point** — three conditions, all required: (1) $f(a)$ is defined, (2) $\lim_{x\to a} f(x)$ exists, (3) the two are equal. Failing (1) or (3) gives a *removable* discontinuity; failing (2) because the one-sided limits differ gives a *jump*.
- **L'Hopital's rule** — a tool for exactly the two indeterminate forms $0/0$ and $\infty/\infty$, and for nothing else.

**Indeterminate vs determinate forms.** Indeterminate means the form alone does not determine the answer: $0/0$, $\infty/\infty$, $0\cdot\infty$, $\infty-\infty$, $0^0$, $1^\infty$, $\infty^0$. Determinate means the form does determine it: $k/0^{\pm}$ diverges to $\pm\infty$, and $0/\infty = 0$. **L'Hopital may never be applied to a determinate form** — this is the single most common misuse.

**Limits at infinity for rational functions: divide by the highest power.** For $\lim_{x\to\infty} p(x)/q(x)$ with polynomials, compare degrees: numerator degree smaller, limit is 0; degrees equal, limit is the ratio of leading coefficients; numerator degree larger, the limit is $\pm\infty$ (no finite limit). This shortcut is faster and safer than repeated L'Hopital and should be used first.

**Continuity for a piecewise function.** At the seam $x = c$, you need left limit = right limit = $f(c)$. The standard exam question supplies an unknown constant $k$ in one branch and asks for the value that makes the function continuous: set the two one-sided limits equal and solve for $k$. If instead the question asks whether a given $k$ works, evaluate three quantities and report which one fails.

## Derivation

**Why L'Hopital works in the $0/0$ case.** Suppose $f(a) = g(a) = 0$ and both are differentiable near $a$ with $g'(a) \neq 0$. Linearise each function about $a$: $f(x) \approx f(a) + f'(a)(x-a) = f'(a)(x-a)$, and likewise $g(x) \approx g'(a)(x-a)$. Then

$$\frac{f(x)}{g(x)} \approx \frac{f'(a)(x-a)}{g'(a)(x-a)} = \frac{f'(a)}{g'(a)}.$$

The factor $(x-a)$ cancels, which is exactly the algebraic cleanup you would otherwise do by hand — L'Hopital is that cancellation performed automatically.

**Why it also covers $\infty/\infty$.** Write $f/g = (1/g)/(1/f)$. As $x \to a$, both $1/g$ and $1/f$ tend to $0$, so the expression is again a $0/0$ form, and the same argument applies to the reciprocal. This is why one rule statement legitimately covers both cases.

**Why the converse fails (the exam trap).** If $\lim f'/g'$ does **not** exist, nothing follows about $\lim f/g$. The rule is one-directional. Example: $f = x + \sin x$, $g = x$ as $x\to\infty$. The quotient tends to $1$, but $f'/g' = 1 + \cos x$ oscillates and has no limit. Reporting "does not exist" here is wrong.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Limit definition | $\lim_{x \to a} f(x) = L$ | Two-sided. Left/right limits must agree for L to exist. |
| L'Hopital's rule | $\lim_{x\to a} \frac{f(x)}{g(x)} = \lim_{x\to a} \frac{f'(x)}{g'(x)}$ | Only for 0/0 or infinity/infinity. Differentiate top and bottom separately - never the quotient rule. |
| Trigonometric limit | $\lim_{x\to 0} \frac{\sin x}{x} = 1$ | x in radians. With degrees the limit is pi/180 instead. |
| Related cosine limit | $\lim_{x\to 0} \frac{1-\cos x}{x} = 0$ | Equivalent to (1-cos x)/x^2 -> 1/2. |
| Exponential limit | $\lim_{x\to 0} \frac{e^x - 1}{x} = 1$ | Generalises to (a^x - 1)/x -> ln a. |
| Logarithmic limit | $\lim_{x\to 0} \frac{\ln(1+x)}{x} = 1$ | Follows from the previous row by substitution. |
| Growth hierarchy | $\ln x \ll x^p \ll e^x \ll x!$ | For x -> infinity. Decides any mixed infinity/infinity race without differentiating. |
| Continuity at a point | $\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = f(a)$ | All three conditions at once: f(a) defined, two-sided limit exists, the two agree. State them explicitly in a proof question. |

## Interactive Widget

**Limit Explorer Table of Values**

![[Limit_Explorer_Table_of_Values.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Evaluate $\lim_{x \to 3} \dfrac{x^2 - 9}{x - 3}$.

**Given:** rational function, 0/0 at x = 3

**Solution:**

1. Substitute: (9 - 9)/(3 - 3) = 0/0, indeterminate, so factor.
2. x^2 - 9 = (x - 3)(x + 3)
3. Cancel the common factor (x - 3), valid for x != 3: the expression becomes x + 3
4. Substitute: 3 + 3 = 6

> [!success]- Answer
> **6**

> [!warning] Trap
> Concluding 'undefined' because f(3) does not exist. The limit can exist where the function is undefined - that is a removable discontinuity.

### P2. Evaluate $\lim_{x \to 0} \dfrac{\sin 5x}{3x}$.

**Given:** trigonometric limit, 0/0

**Solution:**

1. Write as (1/3)(sin 5x / x)
2. Multiply and divide by 5: (5/3) * (sin 5x / (5x))
3. Let u = 5x; as x -> 0, u -> 0, so sin u / u -> 1
4. Result: (5/3)(1) = 5/3

> [!success]- Answer
> **5/3**

> [!warning] Trap
> Forgetting the 5 from the inner coefficient, or using L'Hopital and then mis-differentiating sin 5x as cos 5x instead of 5 cos 5x.

### P3. Evaluate $\lim_{x \to 0} \dfrac{e^{4x} - 1}{x}$.

**Given:** exponential limit, 0/0

**Solution:**

1. Recognise the standard form (e^u - 1)/u -> 1
2. Rewrite as 4 * (e^{4x} - 1)/(4x)
3. As x -> 0 the bracketed factor -> 1
4. Result: 4

> [!success]- Answer
> **4**

> [!warning] Trap
> Treating this as 0/0 and giving up, or applying L'Hopital correctly but reporting 4e^{4x} without substituting x = 0.

### P4. Evaluate $\lim_{x \to \infty} \dfrac{3x^2 - 5x + 2}{7x^2 + x - 4}$.

**Given:** rational function at infinity

**Solution:**

1. Numerator and denominator both degree 2, so divide by x^2
2. Numerator: 3 - 5/x + 2/x^2 -> 3
3. Denominator: 7 + 1/x - 4/x^2 -> 7
4. Result: 3/7

> [!success]- Answer
> **3/7**

> [!warning] Trap
> Applying L'Hopital twice when the degree rule answers it instantly; also reporting infinity because 'both go to infinity'.

### P5. Evaluate $\lim_{x \to 0} \dfrac{\tan x - x}{x^3}$.

**Given:** 0/0, requires repeated differentiation

**Solution:**

1. Check: 0/0, so L'Hopital applies
2. First application: (sec^2 x - 1)/(3x^2), still 0/0
3. Use sec^2 x - 1 = tan^2 x: limit becomes tan^2 x / (3x^2) = (1/3)(tan x / x)^2
4. tan x / x -> 1, so the result is 1/3

> [!success]- Answer
> **1/3**

> [!warning] Trap
> Differentiating sec^2 x - 1 as 2 sec^2 x tan x and continuing blindly - you get a mess and often a wrong sign. Using the identity collapses it in one line.

### P6. Evaluate $\lim_{x \to 0^+} x \ln x$.

**Given:** 0 * (-infinity) indeterminate product

**Solution:**

1. Rewrite the product as a quotient to reach infinity/infinity: x ln x = ln x / (1/x)
2. Apply L'Hopital: derivative of ln x is 1/x; derivative of 1/x is -1/x^2
3. Ratio = (1/x) / (-1/x^2) = -x
4. As x -> 0^+, -x -> 0

> [!success]- Answer
> **0**

> [!warning] Trap
> Writing '0 times infinity = 0'. It is indeterminate. Also note the one-sided limit: ln x is undefined for x < 0, so the two-sided limit does not exist.

### P7. Find $k$ so that $f(x) = \begin{cases} x^2 + k, & x < 2 \\ 3x - 1, & x \ge 2 \end{cases}$ is continuous at $x = 2$.

**Given:** piecewise function; continuity required at x = 2

**Solution:**

1. Left limit: lim_{x->2^-} (x^2 + k) = 4 + k
2. Right limit and value: lim_{x->2^+} (3x - 1) = 5, and f(2) = 5
3. Set left limit equal to the value: 4 + k = 5
4. k = 1

> [!success]- Answer
> **k = 1**

> [!warning] Trap
> Setting the two branch expressions equal as functions (x^2 + k = 3x - 1 for all x) instead of equating their limits at the single point x = 2.

### P8. Evaluate $\lim_{x \to \infty} \left(1 + \dfrac{3}{x}\right)^{2x}$.

**Given:** 1^infinity indeterminate power

**Solution:**

1. Let L be the limit and take logarithms: ln L = lim 2x * ln(1 + 3/x)
2. Rewrite: 2x ln(1 + 3/x) = 2 * [ln(1 + 3/x) / (1/x)]
3. Let u = 3/x, so 1/x = u/3 and the bracket becomes ln(1+u)/(u/3) = 3 ln(1+u)/u -> 3
4. ln L = 2 * 3 = 6, so L = e^6

> [!success]- Answer
> **$e^6$**

> [!warning] Trap
> Answering 1 because the base tends to 1. Also, after finding ln L = 6, forgetting to exponentiate and reporting 6.

### P9. Is $f(x) = \dfrac{x^2 - 4}{x - 2}$ continuous at $x = 2$? Classify the discontinuity.

**Given:** rational function; x = 2

**Solution:**

1. f(2) is undefined: 0/0, so condition 1 fails immediately
2. The limit exists and equals 4 (factor and cancel)
3. Since the limit exists but the value does not, the discontinuity is removable
4. Defining f(2) = 4 removes it

> [!success]- Answer
> **Not continuous; removable discontinuity at x = 2 (limit is 4).**

> [!warning] Trap
> Calling it a 'hole' without checking that the limit exists. If the one-sided limits had differed it would be a jump, not removable.

### P10. Evaluate $\lim_{x \to 0} \dfrac{1 - \cos 4x}{x^2}$.

**Given:** trigonometric limit, 0/0

**Solution:**

1. Use 1 - cos u ~ u^2/2 for small u, or the identity 1 - cos u = 2 sin^2(u/2)
2. With u = 4x: 1 - cos 4x = 2 sin^2(2x)
3. Divide by x^2: 2 [sin 2x / x]^2 = 2 * 4 * [sin 2x / (2x)]^2 = 8 [sin 2x/(2x)]^2
4. As x -> 0 the bracket -> 1, so the limit is 8

> [!success]- Answer
> **8**

> [!warning] Trap
> Forgetting to square the 2 inside the sine. (1 - cos 4x)/x^2 scales as (4x)^2/2 / x^2 = 8, not 4 or 16.

## Traps & Exam Notes

- **L'Hopital on a determinate form.** $\lim_{x\to 0} \frac{\cos x}{x}$ is $1/0$, not $0/0$. The rule does not apply; the limit diverges. Always substitute first and name the form before differentiating.
- **Differentiating the quotient instead of top and bottom.** L'Hopital differentiates $f$ and $g$ separately. Using the quotient rule is a guaranteed wrong answer.
- **Stopping after one application.** Repeated application is legitimate while the form remains $0/0$ or $\infty/\infty$ — but stop the moment it is determinate, and use algebra (identities, factoring, dividing by the highest power) whenever it is faster.
- **Concluding the limit does not exist when L'Hopital fails.** If $f'/g'$ has no limit, no conclusion follows. Try $x + \sin x$ over $x$ as $x\to\infty$: the original limit is 1.
- **Radians.** $\lim_{x\to0} \frac{\sin x}{x} = 1$ only in radians. In degrees it is $\pi/180$.
- **Piecewise continuity: equating functions instead of limits.** You equate the values the two branches approach at the seam, not the branch formulas for all $x$.
- **$0\cdot\infty$, $\infty-\infty$, $1^\infty$ are indeterminate.** Convert a product to a quotient, a difference to a common denominator (or rationalise), and a power via $\ln$.

## See Also

- [[02_Differentiation_Rules]]
- [[08_Rolle’s_and_Mean_Value_Theorems]]
- [[_MOC_Differential_Calculus|Differential Calculus MOC]]

---

⬅ *start* · [[_MOC_Differential_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Differentiation_Rules|02 ➡]]
