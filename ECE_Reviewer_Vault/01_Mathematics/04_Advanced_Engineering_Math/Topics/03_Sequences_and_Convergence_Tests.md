---
id: MATH-04-03
title: "Sequences and Convergence Tests"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Limits,_Continuity_and_L_Hopital]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Sequences and Convergence Tests

> [!abstract] Scope
> Decide whether an infinite series of constants converges, and distinguish absolute convergence from conditional convergence, using the standard battery of tests.

## Core Concept

> [!tip] Intuition
> A series converges when its partial sums settle down. The tests are ordered shortcuts: first check whether the terms even shrink to zero, then compare the series against one whose behaviour you already know.

**Convergence means the partial sums have a limit.** $\sum_{n=1}^{\infty}a_n$ converges to $L$ when $S_N = \sum_{n=1}^{N}a_n$ satisfies $\lim_{N\to\infty}S_N = L$ with $L$ finite. There is no general formula for the sum; the exam asks a yes/no question, and the tests exist to answer that question without evaluating anything.

**Test selection order matters more than test knowledge.** (1) *Divergence test first*: if $a_n \not\to 0$ the series diverges and you are done in one line. (2) Recognise a *geometric* series ($r^n$, converges iff $|r|<1$) or a *p-series* ($1/n^p$, converges iff $p>1$). (3) For factorials and $n$-th powers use the *ratio* or *root* test. (4) For rational functions of $n$, use *limit comparison* against the dominant power of $n$, or the *integral test*. (5) For alternating series use the *alternating series test*, then check absolute convergence separately.

**Absolute versus conditional is a separate question.** If $\sum|a_n|$ converges the series is *absolutely* convergent, and then it converges in every rearrangement. If $\sum a_n$ converges but $\sum|a_n|$ diverges, the series is *conditionally* convergent. The alternating series test only ever proves the first fact; the second requires you to run a test on $\sum|a_n|$ by hand. The classic answer is $\sum (-1)^{n+1}/\sqrt{n}$: convergent by the alternating test, while $\sum 1/\sqrt n$ diverges like a $p$-series with $p = 1/2$.

**The ratio test is powerful and easy to misuse.** $\lim_{n\to\infty}|a_{n+1}/a_n| = L$ gives convergence for $L<1$ and divergence for $L>1$, but $L = 1$ is *inconclusive* — the test says nothing. Every rational function of $n$ gives $L=1$, so $\sum 1/n$ and $\sum 1/n^2$ both come back inconclusive from the ratio test even though one diverges and the other converges. Reaching for comparison, the integral test or the $p$-series rule in that situation is not optional.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Convergence definition | $\sum_{n=1}^{\infty}a_n = \lim_{N\to\infty}\sum_{n=1}^{N}a_n$ | The limit must exist and be finite; a divergent series has no sum. |
| Divergence (n-th term) test | $\lim_{n\to\infty}a_n \neq 0 \Rightarrow \sum a_n \mathrm{\ diverges}$ | Only detects divergence. $a_n\to 0$ proves nothing. |
| Geometric series | $\sum_{n=0}^{\infty}ar^{n} = \frac{a}{1-r},\quad \lvert r \rvert<1$ | Diverges for $\|r\|\geq 1$. Valid only when the ratio is constant. |
| p-series | $\sum_{n=1}^{\infty}\frac{1}{n^{p}} \mathrm{\ converges} \iff p>1$ | The harmonic series $p=1$ diverges. This is the comparison benchmark. |
| Ratio test | $L = \lim_{n\to\infty}\left\lvert \frac{a_{n+1}}{a_n}\right \rvert$ | Converges if $L<1$, diverges if $L>1$, inconclusive if $L=1$. |
| Root test | $L = \lim_{n\to\infty}\sqrt[n]{\lvert a_n \rvert}$ | Same verdict thresholds as the ratio test; best when $a_n$ is an n-th power. |
| Direct comparison | $0\leq a_n\leq b_n \mathrm{\ and\ } \sum b_n \mathrm{\ conv.} \Rightarrow \sum a_n \mathrm{\ conv.}$ | For divergence: if $a_n\geq b_n\geq 0$ and $\sum b_n$ diverges, so does $\sum a_n$. |
| Limit comparison | $\lim_{n\to\infty}\frac{a_n}{b_n} = L,\ 0<L<\infty \Rightarrow \mathrm{same\ behaviour}$ | Compare against the dominant power of $n$; usually the fastest test. |
| Alternating series test | $b_n \downarrow 0 \Rightarrow \sum(-1)^{n+1}b_n \mathrm{\ converges}$ | Requires $b_n>0$, eventually decreasing, with limit 0. Does not imply absolute convergence. |
| Integral test | $\sum_{n=1}^{\infty}f(n) \mathrm{\ and\ } \int_1^{\infty}f(x)\,dx \mathrm{\ agree}$ | Needs $f$ positive, continuous and decreasing on $[1,\infty)$. |

## Worked Problems

### P1. Does $\displaystyle\sum_{n=1}^{\infty}\frac{n}{2n+1}$ converge?

**Given:** a_n = n/(2n+1)

**Solution:**

1. Apply the divergence test first: $\lim_{n\to\infty}\frac{n}{2n+1} = \lim_{n\to\infty}\frac{1}{2 + 1/n} = \frac{1}{2}$
2. The terms tend to $1/2$, not to $0$
3. A series whose terms do not vanish cannot converge

> [!success]- Answer
> **Diverges by the $n$-th term test.**

> [!warning] Trap
> Running a comparison or ratio test while ignoring that $a_n \to 1/2$. Any series with terms tending to a nonzero constant diverges, and the other tests can only obscure that.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1E6 ÷ (2×1E6+1)` → **0.49999975**, and `1E9 ÷ (2×1E9+1)` → **0.4999999998**.
> 2. Both readings sit on $1/2$, so $a_n$ does not tend to 0 and the series diverges before any other test is tried.
>
> The divergence test wants the *limit* of the terms, and this is the whole computation.

### P2. Determine the convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{1}{n^2+1}$.

**Given:** a_n = 1/(n^2+1)

**Solution:**

1. For large $n$, $n^2+1 \sim n^2$, so compare with $b_n = 1/n^2$
2. Limit comparison: $\lim_{n\to\infty}\frac{1/(n^2+1)}{1/n^2} = \lim_{n\to\infty}\frac{n^2}{n^2+1} = 1$, which is finite and positive
3. The benchmark $\sum 1/n^2$ is a $p$-series with $p = 2 > 1$, so it converges
4. The two series share the same behaviour

> [!success]- Answer
> **Converges by limit comparison with the $p=2$ series.**

> [!warning] Trap
> Using the ratio test. $|a_{n+1}/a_n| \to 1$ for every rational function of $n$, so the ratio test returns inconclusive and the answer never gets made.

### P3. Determine the convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{2^{n}}{n!}$.

**Given:** a_n = 2^n/n!

**Solution:**

1. The factorial in the denominator signals the ratio test
2. $\left|\frac{a_{n+1}}{a_n}\right| = \frac{2^{n+1}}{(n+1)!}\cdot\frac{n!}{2^{n}} = \frac{2}{n+1}$
3. $L = \lim_{n\to\infty}\frac{2}{n+1} = 0 < 1$
4. The series converges, and it converges absolutely since all terms are positive

> [!success]- Answer
> **Converges (absolutely) by the ratio test, $L=0$.**

> [!warning] Trap
> Reading the factorial as growing in the numerator and concluding divergence. Factorials in the *denominator* beat any fixed exponential; the ratio collapses to $2/(n+1)$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `Apps` `Σ` `Σ(2^X ÷ X!, 1, 20)` → **6.389056** — the partial sums have settled on the finite value $e^2-1$.
> 2. Ratio term at large $n$: `2 ÷ (1E3+1)` → **0.001998** and `2 ÷ (1E6+1)` → **2E-6**, so $L = 0 < 1$.
>
> $\sum 2^n/n!$ is exactly $e^2-1$; a settled partial sum and $L=0$ are the same verdict.

### P4. Classify the convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{\sqrt{n}}$.

**Given:** b_n = 1/sqrt(n)

**Solution:**

1. Alternating series test: $b_n = 1/\sqrt n$ is positive, decreasing, and $\lim_{n\to\infty}b_n = 0$
2. So the alternating series converges
3. Now test absolute convergence: $\sum\left|\frac{(-1)^{n+1}}{\sqrt n}\right| = \sum\frac{1}{n^{1/2}}$
4. That is a $p$-series with $p = 1/2 \leq 1$, so it diverges
5. Convergent but not absolutely convergent

> [!success]- Answer
> **Conditionally convergent.**

> [!warning] Trap
> Stopping at the alternating series test and answering 'converges absolutely'. The test says nothing about $\sum|a_n|$; absolute convergence must be tested separately, and here it fails.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `Apps` `Σ` `Σ((-1)^(X+1) ÷ √X, 1, 1000)` → **0.5891**, and at 1001 terms → **0.6207**: the partial sums oscillate in a fixed band instead of marching off.
> 2. `Apps` `Σ` `Σ(1 ÷ √X, 1, 1000)` → **61.80**, and `∫dx` `∫(X^-0.5, 1, 1E6)` → **1998** — the absolute series is unbounded.
>
> Bounded oscillation of $\sum a_n$ against unbounded growth of $\sum\lvert a_n\rvert$ is exactly conditional convergence.

### P5. Determine the convergence of $\displaystyle\sum_{n=1}^{\infty}\frac{n!}{10^{n}}$.

**Given:** a_n = n!/10^n

**Solution:**

1. Ratio test: $\left|\frac{a_{n+1}}{a_n}\right| = \frac{(n+1)!}{10^{n+1}}\cdot\frac{10^{n}}{n!} = \frac{n+1}{10}$
2. $L = \lim_{n\to\infty}\frac{n+1}{10} = \infty > 1$
3. The terms grow without bound, so the series diverges

> [!success]- Answer
> **Diverges by the ratio test ($L=\infty$).**

> [!warning] Trap
> Comparing against the convergent $\sum 2^n/n!$ and assuming a fixed base in the numerator behaves the same way. Here the factorial is in the numerator and grows faster than any fixed base to the $n$.

## Traps & Exam Notes

- **'$a_n\to 0$ therefore it converges.'** False. $\sum 1/n$ has terms tending to zero and diverges. The $n$-th term test detects divergence only.
- **Reporting a verdict when the ratio test gives $L=1$.** $L=1$ is inconclusive, not convergent. Every rational function of $n$ lands there, so switch to limit comparison, the $p$-series rule, or the integral test.
- **Claiming absolute convergence from the alternating series test.** The AST proves only conditional convergence. Test $\sum|a_n|$ explicitly; for $\sum(-1)^{n+1}/\sqrt n$ it diverges.
- **Dropping the absolute value in the ratio test.** With $a_n$ alternating, $a_{n+1}/a_n$ is negative and $L<1$ looks false. Take the modulus first.
- **Forgetting that the geometric formula needs a constant ratio.** $\sum 3^{n}/n$ is not geometric; applying $a/(1-r)$ to it produces a meaningless number.
- **Getting the $p$-series condition backwards.** It converges for $p>1$ and diverges for $p\leq 1$. The harmonic case $p=1$ is the one most often mis-answered as convergent.
- **Using the integral test on a non-decreasing $f$.** The test needs $f$ positive, continuous and eventually decreasing; applying it to an oscillating or increasing $f$ proves nothing.

## See Also

- [[04_Power_Series_Radius_of_Convergence]]
- [[05_Taylor_and_Maclaurin_Series]]
- [[07_Improper_Integrals]]
- [[06_Truncation_Error_and_Approximation]]

---

[[02_Cauchy-Riemann_and_Analytic_Functions|⬅ 02]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Power_Series_Radius_of_Convergence|04 ➡]]
