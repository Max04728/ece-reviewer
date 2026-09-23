---
id: MATH-04-08
title: "Shifting Theorems and Properties"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Laplace_Transform_Pairs]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Shifting Theorems and Properties

> [!abstract] Scope
> Apply the s-shift, t-shift, time-multiplication, derivative and integral properties of the Laplace transform, and use the initial and final value theorems correctly.

## Core Concept

> [!tip] Intuition
> The shifting theorems are the table's extension mechanism: multiplying by an exponential in time slides the whole transform sideways in $s$, and delaying a signal in time multiplies the transform by $e^{-as}$. Everything else in the table follows from ordinary differentiation and integration rules.

**The first shifting theorem (s-shift).** If $\mathcal{L}\{f(t)\} = F(s)$ then $\mathcal{L}\{e^{-at}f(t)\} = F(s+a)$, with the ROC shifted from $\mathrm{Re}\,s>\sigma_0$ to $\mathrm{Re}\,s>\sigma_0-a$. Multiplying by a decaying exponential in time moves every pole left by $a$; the operational rule is 'replace $s$ by $s+a$ everywhere'. This is why the damped sinusoid pairs are the undamped pairs with $s \to s+a$, and why an exponential envelope turns a marginally stable oscillator into a decaying one.

**The second shifting theorem (t-shift / delay).** A signal that starts late is written $f(t-a)u(t-a)$. The delay theorem then gives:
$$\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$$
Two conditions must both hold: the step must be present (otherwise the pre-delay part is integrated too), and the function argument must be shifted as well, $f(t-a)$ rather than $f(t)$. If the expression given is $g(t)u(t-a)$ with an unshifted $g$, rewrite it as $g(t-a+a)u(t-a)$ and transform $g(u+a)$. The worked case is:
$$\mathcal{L}\{tu(t-1)\} = e^{-s}\left(\frac{1}{s^{2}}+\frac{1}{s}\right)$$
It is not $e^{-s}/s^{2}$.

**Multiplication by $t$ and the derivative/integral properties.** Multiplication in time by $-t$ is differentiation in $s$:
$$\mathcal{L}\{tf(t)\} = -\frac{dF}{ds}$$
and $n$ factors of $t$ give $(-1)^n d^nF/ds^n$. In the other direction, $\mathcal{L}\{f'(t)\} = sF(s)-f(0^-)$ and the second-derivative rule is:
$$\mathcal{L}\{f''(t)\} = s^{2}F(s)-sf(0^-)-f'(0^-)$$
which is precisely what converts a differential equation plus initial conditions into an algebraic equation. Integration in time divides by $s$:
$$\mathcal{L}\{\int_0^{t}f(\tau)d\tau\} = F(s)/s$$

**Initial and final value theorems — with their hypotheses.** $f(0^+) = \lim_{s\to\infty}sF(s)$ and $f(\infty) = \lim_{s\to 0}sF(s)$. Both are limits in the $s$-domain that avoid an inverse transform entirely, and both have validity conditions that exams test relentlessly. The final value theorem requires every pole of $sF(s)$ to lie in the open left half-plane, with at most a *simple* pole at the origin; if $F(s)$ has poles on the imaginary axis elsewhere or in the right half-plane, $f(t)$ has no limit and the theorem returns a meaningless number. The initial value theorem assumes $f$ has no impulse at the origin, i.e. $F(s) \to 0$ as $s\to\infty$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| First shifting (s-shift) | $\mathcal{L}\{e^{-at}f(t)\} = F(s+a)$ | Replace every $s$ by $s+a$; ROC moves to $\mathrm{Re}\,s > \sigma_0 - a$. |
| Second shifting (delay) | $\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s),\quad a>0$ | The function argument and the step must both be delayed. |
| Unshifted form | $\mathcal{L}\{g(t)u(t-a)\} = e^{-as}\mathcal{L}\{g(t+a)\}$ | Use this when the given function is not already written as $f(t-a)$. |
| Multiplication by $t$ | $\mathcal{L}\{t\,f(t)\} = -\frac{dF}{ds}$ | General: $\mathcal{L}\{t^{n}f(t)\} = (-1)^{n}\frac{d^{n}F}{ds^{n}}$. The minus sign is easy to drop. |
| Derivative of $f$ | $\mathcal{L}\{f'(t)\} = sF(s) - f(0^-)$ | Initial conditions enter through the subtracted terms. |
| Second derivative | $\mathcal{L}\{f''(t)\} = s^{2}F(s) - s\,f(0^-) - f'(0^-)$ | Each extra derivative adds one more initial-condition term. |
| Integral of $f$ | $\mathcal{L}\left\{\int_0^{t}f(\tau)\,d\tau\right\} = \frac{F(s)}{s}$ | Division by $s$; the constant of integration is zero by the $0^-$ convention. |
| Time scaling | $\mathcal{L}\{f(at)\} = \frac{1}{a}F\!\left(\frac{s}{a}\right),\quad a>0$ | Speeding a signal up in time scales the $s$-plane down. |
| Initial value theorem | $f(0^{+}) = \lim_{s\to\infty}sF(s)$ | Fails if $f$ has an impulse at the origin. |
| Final value theorem | $f(\infty) = \lim_{s\to 0}sF(s)$ | Valid only if all poles of $sF(s)$ are in the open LHP, allowing one simple pole at the origin. |
| s-shift applied to a pair | $\frac{\omega}{(s+a)^{2}+\omega^{2}} \longleftrightarrow e^{-at}\sin\omega t$ | The numerator $\omega$ is unchanged by the shift. |

## Worked Problems

### P1. Find $\mathcal{L}\{t^{2}e^{-3t}u(t)\}$.

**Given:** f(t) = t^2; a = 3

**Solution:**

1. Unshifted pair: $\mathcal{L}\{t^{2}\} = \frac{2!}{s^{3}} = \frac{2}{s^{3}}$
2. First shifting theorem with $a = 3$: replace $s$ by $s+3$
3. $F(s) = \frac{2}{(s+3)^{3}}$

> [!success]- Answer
> **$F(s) = \dfrac{2}{(s+3)^{3}}$, ROC $\mathrm{Re}\,s > -3$**

> [!warning] Trap
> Shifting only the pole and writing $\frac{2}{s^{3}+27}$, or shifting the exponent instead of the base. The substitution acts on the variable $s$, so $(s)^{3} \to (s+3)^{3}$.

### P2. Find $\mathcal{L}\{e^{-2t}\cos 4t\;u(t)\}$ in expanded rational form.

**Given:** f(t) = cos 4t; a = 2; omega = 4

**Solution:**

1. Unshifted pair: $\mathcal{L}\{\cos 4t\} = \frac{s}{s^{2}+16}$
2. First shifting theorem: replace every $s$ by $s+2$
3. $F(s) = \frac{s+2}{(s+2)^{2}+16}$
4. Expand: $(s+2)^{2}+16 = s^{2}+4s+4+16 = s^{2}+4s+20$
5. $F(s) = \frac{s+2}{s^{2}+4s+20}$

> [!success]- Answer
> **$F(s) = \dfrac{s+2}{s^{2}+4s+20}$, ROC $\mathrm{Re}\,s > -2$**

> [!warning] Trap
> Shifting the numerator but not the denominator (or vice versa), giving $\frac{s}{s^{2}+4s+20}$. In a damped pair *both* the numerator and the quadratic are written in $s+a$.

### P3. Find $\mathcal{L}\{(t-2)^{2}u(t-2)\}$.

**Given:** f(t-2) = (t-2)^2; a = 2

**Solution:**

1. The function is already in delayed form $f(t-2)u(t-2)$ with $f(u) = u^{2}$
2. Unshifted transform: $F(s) = \mathcal{L}\{t^{2}\} = \frac{2}{s^{3}}$
3. Second shifting theorem: multiply by $e^{-2s}$
4. $F(s) = \frac{2e^{-2s}}{s^{3}}$

> [!success]- Answer
> **$F(s) = \dfrac{2e^{-2s}}{s^{3}}$**

> [!warning] Trap
> Expanding $(t-2)^{2} = t^{2}-4t+4$ and transforming the terms without the step function, then adding $e^{-2s}$ to only one of them. The delay factor multiplies the whole transform of the delayed function.

### P4. Use the final value theorem to find $\lim_{t\to\infty}f(t)$ for $F(s) = \dfrac{10}{s(s+2)}$.

**Given:** F(s) = 10/(s(s+2))

**Solution:**

1. Check the hypothesis: $sF(s) = \frac{10}{s+2}$ has its only pole at $s=-2$, in the open left half-plane, so the theorem applies
2. $f(\infty) = \lim_{s\to 0}sF(s) = \lim_{s\to 0}\frac{10}{s+2}$
3. $= \frac{10}{2} = 5$
4. Check by inversion: $F(s) = \frac{5}{s}-\frac{5}{s+2}$, so $f(t) = 5(1-e^{-2t}) \to 5$ as $t\to\infty$

> [!success]- Answer
> **$f(\infty) = 5$**

> [!warning] Trap
> Applying the theorem without checking the pole condition, or evaluating $\lim_{s\to0}F(s)$ instead of $\lim_{s\to0}sF(s)$. Dropping the $s$ gives $\infty$ and is the usual error.

### P5. Use the initial value theorem to find $f(0^{+})$ for $F(s) = \dfrac{3s+2}{s^{2}+4s+5}$.

**Given:** F(s) = (3s+2)/(s^2+4s+5)

**Solution:**

1. The initial value theorem requires $\lim_{s\to\infty}sF(s)$ to exist as a finite number
2. $sF(s) = \frac{3s^{2}+2s}{s^{2}+4s+5}$
3. Divide numerator and denominator by $s^{2}$: $\frac{3 + 2/s}{1 + 4/s + 5/s^{2}}$
4. $f(0^{+}) = \lim_{s\to\infty}\frac{3+2/s}{1+4/s+5/s^{2}} = 3$

> [!success]- Answer
> **$f(0^{+}) = 3$**

> [!warning] Trap
> Computing $\lim_{s\to\infty}F(s) = 0$ instead of $\lim_{s\to\infty}sF(s)$. The extra factor of $s$ is the whole theorem; without it every proper rational transform returns 0.

## Traps & Exam Notes

- **Applying the final value theorem to a non-decaying system.** For $F(s) = \frac{1}{s^{2}+1}$, $sF(s) = \frac{s}{s^{2}+1}\to 0$, so the theorem 'gives' $0$ — but $f(t) = \sin t$ has no final value. The theorem needs every pole of $sF(s)$ in the open left half-plane (at most a simple pole at the origin).
- **Shifting in the wrong direction.** $\mathcal{L}\{e^{-at}f(t)\} = F(s+a)$, not $F(s-a)$. The pole of $e^{-3t}$ sits at $s=-3$, so its transform is $1/(s+3)$.
- **Delaying the step but not the function.** $\mathcal{L}\{g(t)u(t-a)\} = e^{-as}\mathcal{L}\{g(t+a)\}$. Transforming $g(t)$ itself and attaching $e^{-as}$ is the classic error: $\mathcal{L}\{tu(t-1)\} = e^{-s}\left(\frac{1}{s^{2}}+\frac{1}{s}\right)$, not $e^{-s}/s^{2}$.
- **Dropping the minus sign in $\mathcal{L}\{tf(t)\} = -dF/ds$.** With $F(s) = 1/(s+a)$ this gives $+1/(s+a)^{2}$, but omitting the sign produces the transform of $-te^{-at}$.
- **Forgetting the initial-condition terms in the derivative property.** $\mathcal{L}\{f''\} = s^{2}F - sf(0^-) - f'(0^-)$; using $s^{2}F$ alone silently imposes zero initial conditions and changes the answer to a different problem.
- **Mixing up the two value theorems.** The initial value uses $s\to\infty$ with $sF(s)$; the final value uses $s\to 0$ with $sF(s)$. Computing $F(0)$ or $F(\infty)$ instead is dimensionally wrong and usually gives 0 or $\infty$.
- **Treating the delay factor as part of the ROC.** $e^{-as}$ has no poles or zeros in the finite $s$-plane, so it never changes the ROC; the ROC is set entirely by the rational part.

## See Also

- [[07_Laplace_Transform_Pairs]]
- [[09_Unit_Step,_Dirac_and_Periodic_Functions]]
- [[10_Inverse_Laplace_and_Partial_Fractions]]
- [[06_Partial_Fractions]]
- [[02_Linear_First_Order_and_Bernoulli]]

---

[[07_Laplace_Transform_Pairs|⬅ 07]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Unit_Step,_Dirac_and_Periodic_Functions|09 ➡]]
