---
id: MATH-02-07
title: "Improper Integrals"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Definite_Integrals_and_FTC]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Improper Integrals

> [!abstract] Scope
> Evaluate improper integrals with infinite limits or infinite discontinuities, and determine convergence or divergence.

## Core Concept

> [!tip] Intuition
> An improper integral is a limit in disguise. You cannot substitute infinity or integrate across a blow-up directly, so you integrate up to a finite boundary and then ask what happens as the boundary runs away or closes in.

**The two kinds of improper integral.** (1) *Infinite interval*: the upper or lower limit is $\pm\infty$, or the interval is the whole line. (2) *Infinite discontinuity*: the integrand blows up at a point *inside* the interval or at an endpoint. Both are defined by taking a limit; neither can be evaluated by direct substitution.

**The definition, and why the limit matters.** $\int_a^{\infty} f(x)\,dx = \lim_{b\to\infty}\int_a^b f(x)\,dx$. If the limit exists and is finite the integral **converges**; otherwise it **diverges**. Writing the limit explicitly is not optional decoration — it is the definition, and skipping it is how divergent integrals get assigned finite values.

**Interior discontinuities split the interval.** If $f$ blows up at $c$ with $a<c<b$, then $\int_a^b f = \int_a^c f + \int_c^b f$, and **both** pieces must converge for the whole to converge. If one diverges, the integral diverges. This is why $\int_{-1}^{1}\frac{dx}{x^2}$ does not equal $-2$: the naive antiderivative evaluation produces that number, but both halves diverge to $+\infty$. This is the classic trap of the topic.

**The p-integral benchmarks.** $\int_1^{\infty}\frac{dx}{x^p}$ converges if and only if $p>1$.
$$\int_0^{1}\frac{dx}{x^p}$$
converges if and only if $p<1$. The two rules are reversed, and the boundary case $p=1$ diverges in both. These are the reference integrals against which everything else is compared, so memorise them as a pair and keep straight which end of the interval you are at.

**Comparison tests avoid evaluating anything.** If $0\leq f\leq g$ and $\int g$ converges then $\int f$ converges; if $\int f$ diverges then $\int g$ diverges. The limit comparison test is often easier: if $\lim_{x\to\infty}\frac{f}{g} = L$ with $0<L<\infty$, then $\int f$ and $\int g$ converge or diverge together. Comparing to a p-integral usually settles convergence in one line.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Infinite upper limit | $\int_a^{\infty} f(x)\,dx = \lim_{b\to\infty}\int_a^{b} f(x)\,dx$ | Converges only if the limit is finite. |
| Infinite lower limit | $\int_{-\infty}^{b} f = \lim_{a\to-\infty}\int_a^{b} f$ | Separate limit, evaluated independently. |
| Whole real line | $\int_{-\infty}^{\infty} f = \int_{-\infty}^{c} f + \int_c^{\infty} f$ | Both halves must converge separately. Split at any convenient c. |
| Discontinuity at an endpoint | $\int_a^{b} f = \lim_{t\to b^-}\int_a^{t} f$ | If f blows up at b. |
| Discontinuity inside | $\int_a^b f = \int_a^{c} f + \int_c^{b} f, \quad \mathrm{both\ must\ converge}$ | One divergent piece makes the whole integral divergent. |
| p-integral at infinity | $\int_1^{\infty}\frac{dx}{x^p} \mathrm{\ converges} \iff p>1$ | Diverges for p <= 1, including p = 1. |
| p-integral at zero | $\int_0^{1}\frac{dx}{x^p} \mathrm{\ converges} \iff p<1$ | Reversed condition. Diverges for p >= 1. |
| Direct comparison | $0\leq f\leq g \Rightarrow \int g \mathrm{\ conv.} \Rightarrow \int f \mathrm{\ conv.}$ | Also: if the smaller diverges, the larger diverges. |
| Limit comparison | $\lim_{x\to\infty}\frac{f}{g}=L,\ 0<L<\infty \Rightarrow \mathrm{same\ behaviour}$ | Compare against a p-integral; usually the fastest test. |
| Gaussian benchmark | $\int_0^{\infty} e^{-x^2}dx = \frac{\sqrt{\pi}}{2}$ | Converges. Useful reference for exponential decay. |

## Worked Problems

### P1. Evaluate $\displaystyle\int_1^{\infty} \frac{dx}{x^2}$.

**Given:** infinite interval; p = 2

**Solution:**

1. Write the limit: lim_{b->inf} ∫_1^b x^{-2} dx
2. Antidifferentiate: [-1/x]_1^b = -1/b + 1
3. Take the limit: as b -> inf, -1/b -> 0
4. Result: 0 + 1 = 1

> [!success]- Answer
> **Converges to $1$.**

> [!warning] Trap
> Substituting infinity directly into -1/x and writing -1/inf = 0 without showing the limit. Stating the limit is the definition of the procedure.

### P2. Evaluate $\displaystyle\int_1^{\infty} \frac{dx}{x}$.

**Given:** p = 1, the boundary case

**Solution:**

1. lim_{b->inf} ∫_1^b (1/x) dx = lim_{b->inf} [ln|x|]_1^b
2. = lim_{b->inf} (ln b - ln 1) = lim_{b->inf} ln b
3. ln b grows without bound

> [!success]- Answer
> **Diverges to $+\infty$.**

> [!warning] Trap
> Treating it like the p = 2 case and reporting a finite value. The harmonic integral is the boundary case and diverges, even though the integrand tends to zero.

### P3. Evaluate $\displaystyle\int_0^{1} \frac{dx}{\sqrt{x}}$.

**Given:** infinite discontinuity at the lower endpoint

**Solution:**

1. The integrand blows up at x = 0, so use a limit: lim_{t->0+} ∫_t^1 x^{-1/2} dx
2. Antidifferentiate: [2 sqrt(x)]_t^1 = 2 - 2 sqrt(t)
3. Take the limit: as t -> 0+, 2 sqrt(t) -> 0
4. Result: 2

> [!success]- Answer
> **Converges to $2$.**

> [!warning] Trap
> Declaring divergence because the integrand is infinite at 0. A blow-up does not by itself imply divergence; the p-integral rule with p = 1/2 < 1 says it converges.

### P4. Evaluate $\displaystyle\int_0^{1} \frac{dx}{x}$.

**Given:** infinite discontinuity; p = 1 at zero

**Solution:**

1. lim_{t->0+} ∫_t^1 (1/x) dx = lim_{t->0+} [ln|x|]_t^1
2. = lim_{t->0+} (0 - ln t) = lim_{t->0+} (-ln t)
3. As t -> 0+, -ln t -> +inf

> [!success]- Answer
> **Diverges to $+\infty$.**

> [!warning] Trap
> Applying the p < 1 convergence rule with p = 1. The rule is strict: p = 1 diverges at the zero endpoint.

### P5. Evaluate $\displaystyle\int_{-1}^{1} \frac{dx}{x^2}$, or show it diverges.

**Given:** interior discontinuity at x = 0

**Solution:**

1. The integrand is undefined at x = 0, which lies inside the interval
2. Split: ∫_{-1}^0 + ∫_0^1
3. First piece: lim_{t->0-} [-1/x]_{-1}^t = lim (-1/t + (-1)) which diverges to +inf
4. Since one piece diverges, the whole integral diverges
5. Note the naive antiderivative evaluation gives [-1/x]_{-1}^{1} = -1 - 1 = -2, which is meaningless

> [!success]- Answer
> **Diverges. The value $-2$ obtained naively is invalid.**

> [!warning] Trap
> Reporting -2 by applying the FTC across a discontinuity. A negative integral of a strictly positive integrand is the signal that something is wrong.

## Traps & Exam Notes

- **Omitting the limit notation.** An improper integral *is* a limit. Writing the limit is the definition; skipping it invites treating divergent integrals as finite.
- **Applying FTC across a discontinuity.** $\int_{-1}^{1}\frac{dx}{x^2} \neq -2$. The integrand is positive everywhere it is defined, so a negative answer is impossible. Split at the blow-up and test both pieces.
- **One divergent piece is enough.** For an interior discontinuity, both halves must converge. If either diverges, the whole integral diverges.
- **p-integral conditions are reversed at the two endpoints.** At infinity converge when $p>1$; at zero converge when $p<1$. Mixing these up inverts the answer.
- **$p=1$ always diverges**, at both endpoints. It is the boundary case in both rules.
- **The integrand tending to zero does not imply convergence.** $\int_1^\infty \frac{dx}{x}$ diverges although $1/x\to 0$. Decay *rate* is what matters.
- **Splitting the whole real line.** $\int_{-\infty}^{\infty}$ must be split at a finite point with both halves converging independently; a symmetric limit is a different (Cauchy principal value) object.

## See Also

- [[03_Definite_Integrals_and_FTC]]
- [[01_Antiderivatives_and_Standard_Forms]]
- [[06_Partial_Fractions]]

---

[[06_Partial_Fractions|⬅ 06]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Average_Value_and_MVT_for_Integrals|08 ➡]]
