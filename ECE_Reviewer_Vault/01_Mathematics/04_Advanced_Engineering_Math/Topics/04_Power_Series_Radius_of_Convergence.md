---
id: MATH-04-04
title: "Power Series Radius of Convergence"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Sequences_and_Convergence_Tests]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Power Series Radius of Convergence

> [!abstract] Scope
> Find the radius and interval of convergence of a power series, including the endpoint behaviour that decides whether the interval is open, half-open or closed.

## Core Concept

> [!tip] Intuition
> A power series converges inside a symmetric interval around its centre and diverges outside it. The radius comes from the ratio or root test; the two endpoints are the only points where it ever needs a separate decision.

**A power series is a function defined by a limit of polynomials.** $\sum_{n=0}^{\infty}a_n(x-a)^n$ is centred at $x=a$. For each fixed $x$ it is an ordinary series of constants, so it either converges absolutely, converges conditionally, or diverges. The set of $x$ where it converges is always an interval with the same centre: $|x-a| < R$ converges, $|x-a| > R$ diverges. The number $R$ is the radius of convergence and the three cases $R=0$, $0<R<\infty$, $R=\infty$ are all possible.

**The radius comes from the ratio test on the terms, not the coefficients alone.** Apply the ratio test to $u_n = a_n(x-a)^n$:
$$\left|\frac{u_{n+1}}{u_n}\right| = \left|\frac{a_{n+1}}{a_n}\right||x-a| \to L|x-a|$$
Convergence needs $L|x-a|<1$, so $R = 1/L$. Equivalently, the radius is given by:
$$R = \lim\left|\frac{a_n}{a_{n+1}}\right|$$
when that limit exists. If the ratio limit is $0$ then $R=\infty$ (the series converges everywhere); if it is $\infty$ then $R=0$ (the series converges only at its centre). Getting these two inverted is the most common single error in the topic.

**The endpoints are never decided by the radius.** At $x = a \pm R$ the ratio test gives exactly $L|x-a| = 1$, which is inconclusive by construction. Each endpoint must be substituted back, producing a numerical series that is then attacked with the convergence tests: harmonic (diverges), alternating harmonic (converges), $p$-series. This is why $\sum x^n/n$ has interval $[-1,1)$ — closed on the left, open on the right — while $\sum x^n/n^2$ has the closed interval $[-1,1]$. The radius is the same in both cases; only the endpoints differ.

**Why the radius is what it is.** For a function given by a formula, $R$ equals the distance from the centre $a$ to the nearest singularity in the complex plane. Expanding $1/x$ about $x=2$ gives $R=2$ because the pole at $x=0$ is two units away. This is a fast sanity check: a function analytic everywhere has $R=\infty$, and a polynomial times a series inherits the series' radius. Inside the open interval the series may be differentiated and integrated term by term without changing $R$, which is what makes the power-series method in differential equations legitimate.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Power series | $\sum_{n=0}^{\infty}a_n(x-a)^{n}$ | Centred at $x=a$; convergence is symmetric about that centre. |
| Radius by ratio test | $R = \lim_{n\to\infty}\left\lvert \frac{a_n}{a_{n+1}}\right \rvert$ | Valid when the limit exists; $R=\infty$ if the ratio limit is 0. |
| Radius by root test | $R = \frac{1}{\lim_{n\to\infty}\sqrt[n]{\lvert a_n \rvert}}$ | Use when $a_n$ is itself an $n$-th power, e.g. $(2^n+3^n)$. |
| Convergence region | $\lvert x-a \rvert < R \mathrm{\ converges}, \qquad \lvert x-a \rvert > R \mathrm{\ diverges}$ | Absolute convergence strictly inside; the endpoints are separate cases. |
| Interval of convergence | $(a-R,\ a+R) \mathrm{\ plus\ whichever\ endpoints\ converge}$ | Four possible answers: open, half-open at either end, or closed. |
| Geometric case | $\sum_{n=0}^{\infty}x^{n} = \frac{1}{1-x},\qquad R = 1$ | The prototype; diverges at both endpoints. |
| Ratio-test inequality | $L\lvert x-a \rvert < 1 \Rightarrow \lvert x-a \rvert < \frac{1}{L} = R$ | Solve the inequality, and remember the centre $a$ shifts the interval. |
| Radius from singularities | $R = \mathrm{distance\ from\ } a \mathrm{\ to\ the\ nearest\ complex\ singularity}$ | Sanity check only; the exam wants the ratio-test computation. |
| Term-by-term calculus | $\frac{d}{dx}\sum a_n(x-a)^n = \sum n\,a_n(x-a)^{n-1}$ | Same radius $R$; may fail at the endpoints. |

## Worked Problems

### P1. Find the interval of convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{x^{n}}{n}$.

**Given:** a_n = 1/n; centre a = 0

**Solution:**

1. $R = \lim_{n\to\infty}\left|\frac{a_n}{a_{n+1}}\right| = \lim_{n\to\infty}\frac{(n+1)}{n} = 1$
2. So the series converges absolutely on $(-1,1)$
3. Endpoint $x=1$: $\sum 1/n$, the harmonic series — diverges
4. Endpoint $x=-1$: $\sum(-1)^n/n$, alternating with $b_n = 1/n \downarrow 0$ — converges
5. One endpoint in, one endpoint out

> [!success]- Answer
> **Interval of convergence $[-1,\ 1)$, radius $R=1$.**

> [!warning] Trap
> Answering $(-1,1)$ by reflex and never substituting the endpoints. The left endpoint converges conditionally here, so the correct interval is half-open.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Endpoint $x = 1$: `∫dx` `∫(1 ÷ X, 1, 1000)` → **6.9078** and `∫(1 ÷ X, 1, 1E6)` → **13.816** — the harmonic area grows like $\ln N$, so it diverges.
> 2. Endpoint $x = -1$: `Apps` `Σ` `Σ((-1)^X ÷ X, 1, 1000)` → **-0.6926**, closing on $-\ln 2$ = **-0.6931** — convergent.
>
> One endpoint settles and one does not, which is why the interval is $[-1,1)$ and not closed.

### P2. Find the interval of convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{(x-2)^{n}}{3^{n}\,n}$.

**Given:** a_n = 1/(3^n n); centre a = 2

**Solution:**

1. $\left|\frac{u_{n+1}}{u_n}\right| = \frac{|x-2|^{n+1}}{3^{n+1}(n+1)}\cdot\frac{3^{n}n}{|x-2|^{n}} = \frac{|x-2|}{3}\cdot\frac{n}{n+1}$
2. $L|x-a| = \frac{|x-2|}{3} < 1 \Rightarrow |x-2| < 3$, so $R = 3$
3. The open interval is $(2-3,\ 2+3) = (-1,\ 5)$
4. Endpoint $x=5$: $\sum\frac{3^n}{3^n n} = \sum\frac{1}{n}$ — harmonic, diverges
5. Endpoint $x=-1$: $\sum\frac{(-3)^n}{3^n n} = \sum\frac{(-1)^n}{n}$ — converges
6. Left endpoint converges, right endpoint diverges

> [!success]- Answer
> **Interval of convergence $[-1,\ 5)$, radius $R=3$.**

> [!warning] Trap
> Reporting $(-3,3)$ by forgetting the centre shift, or $(-2,4)$. The radius is 3 but the interval is centred at $x=2$, so it runs from $-1$ to $5$.

### P3. Find the interval of convergence of $\displaystyle\sum_{n=1}^{\infty} n!\,x^{n}$.

**Given:** a_n = n!

**Solution:**

1. $\left|\frac{u_{n+1}}{u_n}\right| = (n+1)|x|$
2. For convergence we need $\lim_{n\to\infty}(n+1)|x| < 1$
3. That limit is $0$ only when $x = 0$, and $\infty$ for every other $x$
4. $R = 0$; the series converges at the centre alone

> [!success]- Answer
> **Converges only at $x = 0$; $R = 0$.**

> [!warning] Trap
> Reading '$n!$ in the numerator' as fast growth and therefore $R=\infty$. The factorial is the *coefficient*; it makes the terms blow up for any nonzero $x$, so the radius collapses to zero — the reverse of $\sum x^n/n!$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Set $x = 0.5$ and watch the terms grow: `8!×0.5^8` → **157.5**, `10!×0.5^10` → **3543.75**, `12!×0.5^12` → **116944**.
> 2. The terms blow up for every $x \neq 0$, so the series converges at the centre alone: $R = 0$ — the reverse of $\sum x^n/n!$.
>
> The factorial is the coefficient here, so it collapses the radius instead of extending it.

### P4. Find the interval of convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{n\,x^{n}}{2^{n}}$.

**Given:** a_n = n/2^n; centre a = 0

**Solution:**

1. $\left|\frac{u_{n+1}}{u_n}\right| = \frac{(n+1)|x|^{n+1}}{2^{n+1}}\cdot\frac{2^{n}}{n|x|^{n}} = \frac{n+1}{n}\cdot\frac{|x|}{2}$
2. The coefficient ratio tends to $|x|/2$, so convergence requires $|x| < 2$ and $R = 2$
3. Endpoint $x = 2$: $\sum n$, terms grow without bound — diverges
4. Endpoint $x = -2$: $\sum n(-1)^n$, terms do not tend to zero — diverges
5. Both endpoints are excluded

> [!success]- Answer
> **Interval of convergence $(-2,\ 2)$, radius $R=2$.**

> [!warning] Trap
> Keeping the endpoint $x=-2$ because the series alternates there. The alternating series test needs $b_n\downarrow 0$; $b_n = n \to \infty$ fails it immediately.

### P5. Find the interval of convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{x^{n}}{n^{2}}$.

**Given:** a_n = 1/n^2

**Solution:**

1. $R = \lim_{n\to\infty}\frac{(n+1)^2}{n^2} = 1$
2. Endpoint $x = 1$: $\sum 1/n^2$ is a $p$-series with $p = 2 > 1$ — converges
3. Endpoint $x = -1$: $\sum(-1)^n/n^2$ converges absolutely, since $\sum 1/n^2$ converges
4. Both endpoints are included

> [!success]- Answer
> **Interval of convergence $[-1,\ 1]$, radius $R=1$.**

> [!warning] Trap
> Assuming the endpoint verdict is the same for every series with $R=1$. Compare with $\sum x^n/n$, whose interval is $[-1,1)$: same radius, different endpoints because $1/n^2$ decays fast enough and $1/n$ does not.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `Apps` `Σ` `Σ(1 ÷ X², 1, 1000)` → **1.6439**, closing on $\pi^2/6$ = **1.6449** — a settled, convergent value.
> 2. Both endpoints are that series with alternating signs, and a convergent $\sum 1/n^2$ makes them absolutely convergent, so both endpoints are kept.
>
> Same $R = 1$ as P1 but a closed interval: $1/n$ never settles, $1/n^2$ does.

## Traps & Exam Notes

- **Assuming the interval is open.** The radius gives $(a-R, a+R)$ only as the *guaranteed* region. Each endpoint must be substituted and tested; the final interval can be open, half-open at either end, or closed.
- **Inverting the extreme cases.** A ratio limit of $0$ means $R=\infty$; a ratio limit of $\infty$ means $R=0$. Writing $R=0$ for $\sum x^n/n!$ is the classic reversal.
- **Forgetting the centre.** For $\sum (x-2)^n/3^n n$ the interval is $(-1,5)$, not $(-3,3)$. Compute $|x-a| < R$ and solve for $x$.
- **Applying the tests to $x$ instead of the terms.** The ratio test is applied to $u_n = a_n(x-a)^n$; comparing coefficients alone without the $(x-a)^n$ factor loses the dependence on $x$ entirely.
- **Declaring the endpoints from the ratio test.** At $x = a\pm R$ the ratio equals exactly 1, which is the inconclusive case by construction. The ratio test can never decide an endpoint.
- **Keeping an endpoint because the series alternates there.** The alternating series test also needs the magnitudes to decrease to zero: $\sum n(-1)^n x^n$ at $|x|=2$ diverges because the terms grow.
- **Confusing the radius with the interval length.** $R$ is the distance from the centre to each endpoint, so the interval has length $2R$ — not $R$.

## See Also

- [[03_Sequences_and_Convergence_Tests]]
- [[05_Taylor_and_Maclaurin_Series]]
- [[06_Truncation_Error_and_Approximation]]
- [[13_Fourier_Transform_Properties]]

---

[[03_Sequences_and_Convergence_Tests|⬅ 03]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Taylor_and_Maclaurin_Series|05 ➡]]
