---
id: MATH-02-02
title: "Algebraic Substitution"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Antiderivatives_and_Standard_Forms]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Algebraic Substitution

> [!abstract] Scope
> Integrate by substituting a new variable, including trigonometric substitution and the definite-integral change of limits.

## Core Concept

> [!tip] Intuition
> Substitution is the chain rule run backwards. If the integrand contains a function and its derivative is available nearby, name the function $u$ and the whole expression often collapses into a table entry.

**The method.** Choose $u = g(x)$, compute $du = g'(x)\,dx$, and rewrite the entire integral in terms of $u$ and $du$. An integral in $x$ is not finished until every $x$ and every $dx$ has been replaced; a leftover $x$ means either the substitution was wrong or an algebraic step was skipped.

**Choosing $u$.** Prefer the inside of a composite function, the denominator of a fraction, or the exponent. The test is whether $g'(x)$ — up to a constant multiple — already appears in the integrand. If it does, substitution will work cleanly; if it does not, substitution is the wrong tool and parts or partial fractions is likely correct.

**Definite integrals: change the limits.** When evaluating $\int_a^b f(g(x))g'(x)\,dx$ by substitution, either (a) convert the limits to $u$-values using $u = g(x)$ and never return to $x$, or (b) antidifferentiate back in terms of $x$ and then apply the original limits. Option (a) is shorter but the limits *must* be converted; leaving $x$-limits on a $u$-integrand is the most common serious error in the topic and produces a confidently wrong number.

**Trigonometric substitution for radicals.** The three standard forms: for $\sqrt{a^2-x^2}$ use $x = a\sin\theta$; for $\sqrt{a^2+x^2}$ use $x = a\tan\theta$; for $\sqrt{x^2-a^2}$ use $x = a\sec\theta$. The purpose in each case is to convert the radical into a single trigonometric factor using the Pythagorean identities. After integrating in $\theta$ you must convert back, which requires drawing the reference right triangle.

**Back-substitution and the triangle.** Because $\theta$ is not the original variable, every result must be expressed in $x$. Rather than manipulating inverse functions algebraically, draw a right triangle with the substitution as its ratio and read the required trigonometric function off the sides. This is faster and less error-prone than identity gymnastics.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Substitution rule | $\int f(g(x))g'(x)\,dx = \int f(u)\,du, \quad u = g(x)$ | Every x and dx must be replaced before integrating. |
| Definite integral with substitution | $\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du$ | Convert the limits, or convert back to x before substituting. Never mix. |
| Differential conversion | $du = g'(x)\,dx$ | Solve for dx when the integrand carries an extra constant factor. |
| Radical a^2 - x^2 | $x = a\sin\theta, \quad \sqrt{a^2-x^2} = a\cos\theta$ | Use when the radical is of the form a^2 minus x^2. |
| Radical a^2 + x^2 | $x = a\tan\theta, \quad \sqrt{a^2+x^2} = a\sec\theta$ | Uses 1 + tan^2 = sec^2. |
| Radical x^2 - a^2 | $x = a\sec\theta, \quad \sqrt{x^2-a^2} = a\tan\theta$ | Uses sec^2 - 1 = tan^2. Domain requires \|x\| >= a. |
| Back-substitution triangle | $\sin\theta = \frac{x}{a},\ \tan\theta = \frac{x}{\sqrt{a^2-x^2}}$ | Read the needed trig function from the triangle rather than inverting. |
| Scaling shortcut | $\int \frac{dx}{ax+b} = \frac{1}{a}\ln\lvert ax+b \rvert + C$ | The linear-inside substitution, worth memorising. |

## Worked Problems

### P1. Evaluate $\displaystyle\int (3x+1)^5\,dx$.

**Given:** composite power with linear inside

**Solution:**

1. Let u = 3x + 1, so du = 3 dx and dx = du/3
2. Substitute: ∫ u^5 (du/3) = (1/3)∫u^5 du
3. Integrate: (1/3)(u^6/6) = u^6/18
4. Back-substitute

> [!success]- Answer
> **$\dfrac{(3x+1)^6}{18} + C$**

> [!warning] Trap
> Integrating to (3x+1)^6/6 and forgetting the 1/3 from dx. The extra constant factor is the most common substitution error.

### P2. Evaluate $\displaystyle\int 2x\,e^{x^2}\,dx$.

**Given:** exponential with the derivative of its exponent present

**Solution:**

1. Let u = x^2, so du = 2x dx
2. The integrand already contains 2x dx, so substitute directly: ∫e^u du
3. Integrate: e^u
4. Back-substitute

> [!success]- Answer
> **$e^{x^2} + C$**

> [!warning] Trap
> Trying integration by parts. Substitution is correct precisely because the derivative of the exponent is present as a factor.

### P3. Evaluate $\displaystyle\int \frac{\ln x}{x}\,dx$.

**Given:** logarithm and its derivative

**Solution:**

1. Let u = ln x, so du = dx/x
2. The integrand becomes ∫u du
3. Integrate: u^2/2
4. Back-substitute

> [!success]- Answer
> **$\dfrac{(\ln x)^2}{2} + C$**

> [!warning] Trap
> Attempting integration by parts with ln x as the part to differentiate, which works but is far longer. The factor 1/x is the giveaway for substitution.

### P4. Evaluate $\displaystyle\int_0^2 x\sqrt{x^2+1}\,dx$.

**Given:** definite integral; limits must be converted

**Solution:**

1. Let u = x^2 + 1, so du = 2x dx and x dx = du/2
2. Convert the limits: when x = 0, u = 1; when x = 2, u = 5
3. Substitute: (1/2)∫_1^5 u^{1/2} du
4. Integrate: (1/2)[(2/3)u^{3/2}]_1^5 = (1/3)[u^{3/2}]_1^5
5. Evaluate: (1/3)(5^{3/2} - 1) = (1/3)(5sqrt(5) - 1)

> [!success]- Answer
> **$\dfrac{5\sqrt{5}-1}{3}$**

> [!warning] Trap
> Converting to u but leaving the limits as 0 and 2, which gives a meaningless number. Both must change together.

### P5. Evaluate $\displaystyle\int \frac{dx}{x^2+4}$.

**Given:** inverse-trig form with a scaled variable

**Solution:**

1. Factor 4 from the denominator: 1/(4[(x/2)^2 + 1])
2. Let u = x/2, so dx = 2 du
3. The integral becomes (1/4)(2)∫du/(1+u^2) = (1/2) arctan u
4. Back-substitute

> [!success]- Answer
> **$\dfrac{1}{2}\arctan\dfrac{x}{2} + C$**

> [!warning] Trap
> Writing arctan(x/2) without the 1/2 factor, or arctan x/2 with ambiguous grouping. The scaling factor is (1/a).

## Traps & Exam Notes

- **Forgetting the $\frac{1}{g'(x)}$ factor.** When $du = k\,dx$, the integral picks up a factor $\frac{1}{k}$. Omitting it is the most frequent substitution error.
- **Mixing limits and variables.** In a definite integral after substitution, either convert the limits to $u$-values or convert back to $x$ before applying them. Leaving $x$-limits on a $u$-integrand gives a wrong number.
- **Leaving an $x$ behind.** A correct substitution eliminates every $x$ and every $dx$. A stray $x$ means the substitution is incomplete or inappropriate.
- **Stopping at $\theta$.** Trigonometric substitution results must be converted back to the original variable using a reference triangle.
- **Wrong trigonometric substitution for the radical form.** $a^2-x^2$ pairs with sine, $a^2+x^2$ with tangent, $x^2-a^2$ with secant. Matching the wrong identity leaves a radical that does not simplify.
- **Reaching for trig substitution when simple substitution suffices.** If the numerator is (a multiple of) the derivative of the inside, name the inside $u$ and finish in one line.
- **Dropping absolute values in $\ln$.** $\int du/u = \ln|u| + C$.

## See Also

- [[01_Antiderivatives_and_Standard_Forms]]
- [[03_Definite_Integrals_and_FTC]]
- [[05_Trigonometric_Integrals_and_Substitution]]

---

[[01_Antiderivatives_and_Standard_Forms|⬅ 01]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Definite_Integrals_and_FTC|03 ➡]]
