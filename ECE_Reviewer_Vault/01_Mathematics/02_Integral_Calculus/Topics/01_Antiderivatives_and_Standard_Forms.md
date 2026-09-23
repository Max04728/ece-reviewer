---
id: MATH-02-01
title: "Antiderivatives and Standard Forms"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Differentiation_Rules]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Antiderivatives and Standard Forms

> [!abstract] Scope
> Recover antiderivatives from the standard derivative forms, and handle the constant of integration correctly.

## Core Concept

> [!tip] Intuition
> Integration is differentiation read backwards. Every antiderivative you will ever need is a derivative rule you already know, reversed — which is why the standard-forms table is the most valuable thing to memorise in this area.

**Antiderivative and the constant.** $F$ is an antiderivative of $f$ on an interval if $F'(x) = f(x)$ there. Antiderivatives are never unique: if $F$ works, so does $F + C$ for any constant, and these are the *only* possibilities on an interval (because a function with zero derivative on an interval is constant). The indefinite integral $\int f(x)\,dx = F(x) + C$ denotes that whole family. **Every indefinite integral must carry $+C$** — omitting it is not a stylistic slip, it is the wrong answer.

**The table is the whole method.** Each entry is a reversed derivative:
$$\int x^n\,dx = \frac{x^{n+1}}{n+1}+C$$
inverts the power rule;
$$\int \frac{dx}{x} = \ln|x| + C$$
is the exception the power rule cannot cover, because $n = -1$ makes the formula divide by zero. That single exception is why the logarithm appears where the pattern predicts a power.

**Absolute value in logarithms.** $\int \frac{dx}{x} = \ln|x| + C$, not $\ln x + C$. The integrand $1/x$ is defined for negative $x$ where $\ln x$ is not, so dropping the bars silently halves the domain. The same applies to $\int \frac{du}{u}$ in substitution and to $\int \tan x\,dx = -\ln|\cos x| + C$.

**Linearity lets you split.** $\int [af(x) + bg(x)]\,dx = a\int f\,dx + b\int g\,dx$. There is no product or quotient rule for integrals — no analogous split exists, which is exactly why substitution, parts and partial fractions have to be developed as separate techniques. Recognising that a product cannot be split is the first step in choosing a method.

**Verification is free.** Differentiate your answer. If it returns the integrand, the work is correct (up to the constant). In an exam this check costs a few seconds and catches essentially every algebraic slip; it is the single highest-value habit in integral calculus.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Power rule | $\int x^n\,dx = \frac{x^{n+1}}{n+1} + C, \quad n \neq -1$ | Raises the power and divides. Fails at n = -1. |
| Reciprocal rule | $\int \frac{dx}{x} = \ln\lvert x \rvert + C$ | The n = -1 case. Absolute value is required, not optional. |
| Exponential (base e) | $\int e^x\,dx = e^x + C$ | The only function equal to its own derivative and integral. |
| Exponential (general base) | $\int a^x\,dx = \frac{a^x}{\ln a} + C, \quad a>0,\ a\neq 1$ | Divide by ln a. Easy to forget. |
| Sine and cosine | $\int \sin x\,dx = -\cos x + C, \quad \int \cos x\,dx = \sin x + C$ | The minus sign belongs to the sine integral. |
| Secant squared and secant-tangent | $\int \sec^2 x\,dx = \tan x + C, \quad \int \sec x\tan x\,dx = \sec x + C$ | Reversed derivatives; no minus signs. |
| Inverse trigonometric | $\int \frac{dx}{1+x^2} = \arctan x + C, \quad \int \frac{dx}{\sqrt{1-x^2}} = \arcsin x + C$ | The two standard forms worth recognising on sight. |
| Linearity | $\int \left[af(x) + bg(x)\right]dx = a\!\int\! f\,dx + b\!\int\! g\,dx$ | Sums and constant multiples only. No product or quotient rule. |
| Constant of integration | $\int f(x)\,dx = F(x) + C$ | Mandatory for indefinite integrals; cancels for definite ones. |
| Verification | $\frac{d}{dx}\int f(x)\,dx = f(x)$ | Always available. Use it. |

## Worked Problems

### P1. Evaluate $\displaystyle\int \left(4x^3 - \frac{2}{x} + 5\right)dx$.

**Given:** polynomial and reciprocal terms

**Solution:**

1. Split by linearity: 4∫x^3 dx - 2∫(1/x) dx + 5∫dx
2. ∫x^3 dx = x^4/4, so the first term is 4(x^4/4) = x^4
3. ∫(1/x) dx = ln|x|, so the second term is -2 ln|x|
4. ∫dx = x, so the third term is 5x
5. Combine and add the constant

> [!success]- Answer
> **$x^4 - 2\ln|x| + 5x + C$**

> [!warning] Trap
> Writing 2/x as a power and applying the power rule, giving a wrong x^0 term. The reciprocal needs the logarithm.

### P2. Evaluate $\displaystyle\int \frac{1}{x^3}\,dx$.

**Given:** negative exponent

**Solution:**

1. Rewrite as a power: 1/x^3 = x^{-3}
2. Apply the power rule with n = -3: x^{-3+1}/(-3+1) = x^{-2}/(-2)
3. Rewrite with a positive exponent: -1/(2x^2)

> [!success]- Answer
> **$-\dfrac{1}{2x^2} + C$**

> [!warning] Trap
> Applying the n = -1 logarithm rule here. The logarithm applies only when the exponent is exactly -1, not any negative power.

### P3. Evaluate $\displaystyle\int \sqrt{x}\,dx$.

**Given:** fractional exponent

**Solution:**

1. Rewrite as x^{1/2}
2. Power rule: x^{3/2}/(3/2)
3. Simplify by multiplying by the reciprocal: (2/3)x^{3/2}

> [!success]- Answer
> **$\dfrac{2}{3}x^{3/2} + C$**

> [!warning] Trap
> Dividing by 3/2 by multiplying by 3/2 instead of by 2/3. Rewrite the division as multiplication before simplifying.

### P4. Evaluate $\displaystyle\int \left(3e^x - \frac{4}{1+x^2}\right)dx$.

**Given:** exponential and inverse-trig standard forms

**Solution:**

1. Split: 3∫e^x dx - 4∫dx/(1+x^2)
2. ∫e^x dx = e^x
3. ∫dx/(1+x^2) = arctan x
4. Combine: 3e^x - 4 arctan x

> [!success]- Answer
> **$3e^x - 4\arctan x + C$**

> [!warning] Trap
> Using ln(1+x^2) for the second term. The denominator 1+x^2 has no real factorisation, so it produces an arctangent, not a logarithm.

### P5. Evaluate $\displaystyle\int 2^x\,dx$.

**Given:** exponential with base other than e

**Solution:**

1. Use the general-base rule: ∫a^x dx = a^x/ln a
2. With a = 2: 2^x/ln 2

> [!success]- Answer
> **$\dfrac{2^x}{\ln 2} + C$**

> [!warning] Trap
> Writing 2^x + C by analogy with e^x. The division by ln a is required for every base except e.

## Traps & Exam Notes

- **Omitting $+C$** on an indefinite integral. Always required, and routinely penalised.
- **Applying the power rule at $n=-1$.** $\int x^{-1}dx = \ln|x| + C$, not $x^0/0$.
- **Dropping the absolute value in $\ln|x|$.** The integrand $1/x$ is defined for negative $x$, so the bars change the domain of the answer.
- **No product or quotient rule for integrals.** $\int fg \neq \int f\int g$ and $\int f/g \neq \int f / \int g$. Split the fraction algebraically first, or use substitution/parts.
- **Forgetting to divide by $\ln a$** for $\int a^x dx$ with $a \neq e$.
- **Sign errors in the trigonometric forms.** $\int \sin = -\cos$; $\int \csc^2 = -\cot$. Verify by differentiating rather than trusting recall.
- **Determining $C$ too early.** Antidifferentiate first, then impose the initial condition. Doing it in the other order usually loses the constant entirely.
- **Not checking by differentiation.** The check is nearly free and catches almost every error in this topic.

## See Also

- [[02_Algebraic_Substitution]]
- [[03_Definite_Integrals_and_FTC]]
- [[02_Differentiation_Rules]]

---

⬅ *start* · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Algebraic_Substitution|02 ➡]]
