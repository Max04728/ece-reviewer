---
id: MATH-02-06
title: "Partial Fractions"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Antiderivatives_and_Standard_Forms]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Partial Fractions

> [!abstract] Scope
> Decompose rational functions into partial fractions and integrate each resulting term.

## Core Concept

> [!tip] Intuition
> Every rational function with a factorable denominator can be split into simple pieces that integrate to logarithms and arctangents. Partial fractions is the un-multiplying of a fraction — the reverse of combining over a common denominator.

**When to use it.** Partial fractions applies to $\int \frac{P(x)}{Q(x)}\,dx$ where $P$ and $Q$ are polynomials. Two preconditions: the fraction must be **proper** (degree of $P$ less than degree of $Q$), and $Q$ must be factorable. If the fraction is improper, perform polynomial long division first; the quotient integrates directly and the remainder becomes a proper fraction.

**The four denominator cases.** (1) *Distinct linear factors*:
$$\frac{A}{x-a} + \frac{B}{x-b}$$
(2) *Repeated linear factor*: include one term per power, $\frac{A}{x-a} + \frac{B}{(x-a)^2}$. (3) *Irreducible quadratic factor*: a numerator linear in $x$, $\frac{Ax+B}{x^2+px+q}$ — irreducible meaning the discriminant is negative. (4) *Repeated quadratic*: one term per power, with linear numerators throughout. Omitting the lower-power terms in a repeated factor is the most common setup error.

**Finding the constants.** Two reliable routes. *Substitution*: plug in the roots of the linear factors; each choice kills all but one unknown, so the constants fall out immediately. *Equating coefficients*: expand and match powers of $x$; slower but necessary for irreducible quadratics where no useful value can be substituted. In practice, substitute for the linear factors and equate coefficients for whatever remains.

**The integrals that result.** Each piece is one of three forms:
$$\int\frac{A}{x-a}dx = A\ln|x-a|$$

$$\int\frac{B}{(x-a)^n}dx$$
uses the power rule for $n\geq 2$; and a quadratic denominator gives a logarithm (after completing the square and splitting off the derivative) plus an arctangent. Recognising which form you are heading toward tells you whether the decomposition was set up correctly.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Distinct linear factors | $\frac{P(x)}{(x-a)(x-b)} = \frac{A}{x-a} + \frac{B}{x-b}$ | One term per distinct factor, constant numerator. |
| Repeated linear factor | $\frac{P(x)}{(x-a)^2} = \frac{A}{x-a} + \frac{B}{(x-a)^2}$ | One term for EACH power, including the first. |
| Irreducible quadratic | $\frac{P(x)}{x^2+px+q} = \frac{Ax+B}{x^2+px+q}$ | Numerator must be linear, not constant. Discriminant < 0. |
| Logarithmic result | $\int \frac{A}{x-a}\,dx = A\ln\lvert x-a \rvert + C$ | Absolute value required. |
| Repeated factor result | $\int \frac{B}{(x-a)^n}\,dx = \frac{B(x-a)^{1-n}}{1-n} + C, \quad n \neq 1$ | For n >= 2 the power rule applies, not a logarithm. |
| Quadratic: complete the square | $x^2+px+q = \left(x+\tfrac{p}{2}\right)^2 + \left(q-\tfrac{p^2}{4}\right)$ | Reduces to the arctangent standard form. |
| Arctangent form | $\int \frac{du}{u^2+a^2} = \frac{1}{a}\arctan\frac{u}{a} + C$ | Divide by a, do not forget the scaling. |
| Logarithm by derivative | $\int \frac{u'}{u}\,dx = \ln\lvert u \rvert + C$ | Split a quadratic numerator into its derivative plus a constant. |

## Worked Problems

### P1. Evaluate $\displaystyle\int \frac{dx}{x^2-1}$.

**Given:** distinct linear factors

**Solution:**

1. Factor: x^2 - 1 = (x-1)(x+1)
2. Decompose: 1/[(x-1)(x+1)] = A/(x-1) + B/(x+1)
3. Substitute x = 1: 1 = A(2), so A = 1/2; substitute x = -1: 1 = B(-2), so B = -1/2
4. Integrate: (1/2)ln|x-1| - (1/2)ln|x+1|

> [!success]- Answer
> **$\dfrac{1}{2}\ln\left|\dfrac{x-1}{x+1}\right| + C$**

> [!warning] Trap
> Applying the arctangent form. The denominator factorises over the reals, so partial fractions is the correct route - arctangent applies only to x^2 + 1.

### P2. Evaluate $\displaystyle\int \frac{3x+5}{(x-2)(x+3)}\,dx$.

**Given:** distinct linear factors; non-constant numerator

**Solution:**

1. Decompose: (3x+5)/[(x-2)(x+3)] = A/(x-2) + B/(x+3)
2. Multiply out: 3x + 5 = A(x+3) + B(x-2)
3. Substitute x = 2: 11 = 5A, so A = 11/5
4. Substitute x = -3: -4 = -5B, so B = 4/5
5. Integrate: (11/5)ln|x-2| + (4/5)ln|x+3|

> [!success]- Answer
> **$\dfrac{11}{5}\ln|x-2| + \dfrac{4}{5}\ln|x+3| + C$**

> [!warning] Trap
> Solving by equating coefficients only and making an arithmetic slip. Substituting the roots gives each constant in one step with no algebra.

### P3. Evaluate $\displaystyle\int \frac{dx}{x(x+1)^2}$.

**Given:** repeated linear factor

**Solution:**

1. Decompose with one term per power: 1/[x(x+1)^2] = A/x + B/(x+1) + C/(x+1)^2
2. Multiply out: 1 = A(x+1)^2 + Bx(x+1) + Cx
3. Substitute x = 0: 1 = A, so A = 1
4. Substitute x = -1: 1 = -C, so C = -1
5. Equate x^2 coefficients: 0 = A + B, so B = -1
6. Integrate: ln|x| - ln|x+1| + 1/(x+1)

> [!success]- Answer
> **$\ln|x| - \ln|x+1| + \dfrac{1}{x+1} + C$**

> [!warning] Trap
> Omitting the B/(x+1) term and writing only A/x + C/(x+1)^2. Every power of a repeated factor needs its own term.

### P4. Evaluate $\displaystyle\int \frac{x^2+x+1}{x-1}\,dx$.

**Given:** improper fraction - divide first

**Solution:**

1. The numerator degree (2) exceeds the denominator degree (1), so divide: x^2+x+1 divided by x-1 gives x + 2 with remainder 3
2. Rewrite: x + 2 + 3/(x-1)
3. Integrate term by term: x^2/2 + 2x + 3 ln|x-1|

> [!success]- Answer
> **$\dfrac{x^2}{2} + 2x + 3\ln|x-1| + C$**

> [!warning] Trap
> Attempting partial fractions on an improper fraction. Long division must come first; only the remainder produces partial fractions.

### P5. Evaluate $\displaystyle\int \frac{2x+3}{x^2+4x+13}\,dx$.

**Given:** irreducible quadratic; complete the square

**Solution:**

1. Complete the square: x^2+4x+13 = (x+2)^2 + 9
2. Split the numerator to expose the derivative of the denominator: 2x+3 = (2x+4) - 1
3. First part: ∫(2x+4)/(x^2+4x+13) dx = ln(x^2+4x+13)
4. Second part: -∫dx/[(x+2)^2+9] = -(1/3)arctan((x+2)/3)
5. Combine

> [!success]- Answer
> **$\ln(x^2+4x+13) - \dfrac{1}{3}\arctan\dfrac{x+2}{3} + C$**

> [!warning] Trap
> Not splitting the numerator. Without isolating the denominator's derivative, the integral cannot be resolved into the standard log and arctan forms.

## Traps & Exam Notes

- **Improper fraction first.** If the numerator's degree is not less than the denominator's, divide before decomposing. Partial fractions on an improper fraction gives nonsense constants.
- **Missing terms for repeated factors.** $(x-a)^2$ requires both $\frac{A}{x-a}$ and $\frac{B}{(x-a)^2}$. Listing only the highest power is the most frequent setup error.
- **Constant numerator on a quadratic factor.** An irreducible quadratic gets a linear numerator $Ax+B$, not a constant. A constant numerator usually signals an algebra mistake.
- **Forgetting the absolute value** in $\ln|x-a|$. The logarithm's domain requires it.
- **Using the power rule on the $n=1$ term.** $\int\frac{A}{x-a}dx$ is a logarithm; only $n\geq 2$ uses the power rule.
- **Inventing factors.** $x^2+4$ does not factor over the reals. Treating it as $(x+2)(x-2)$ or as a perfect square is wrong; it is irreducible and needs completing the square.
- **Losing the $\frac{1}{a}$ scaling** in $\int \frac{du}{u^2+a^2} = \frac{1}{a}\arctan\frac{u}{a}$.
- **Not splitting the numerator** when a quadratic's derivative is partly present. Isolating the derivative produces the logarithm; the leftover constant produces the arctangent.

## See Also

- [[01_Antiderivatives_and_Standard_Forms]]
- [[07_Improper_Integrals]]
- [[10_Inverse_Laplace_and_Partial_Fractions]]

---

[[05_Trigonometric_Integrals_and_Substitution|⬅ 05]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Improper_Integrals|07 ➡]]
