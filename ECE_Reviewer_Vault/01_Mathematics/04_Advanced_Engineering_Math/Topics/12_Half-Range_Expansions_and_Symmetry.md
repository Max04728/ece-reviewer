---
id: MATH-04-12
title: "Half-Range Expansions and Symmetry"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[11_Fourier_Series_Trigonometric_and_Exponential]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Half-Range Expansions and Symmetry

> [!abstract] Scope
> Choose an even or odd extension for a function known only on a finite interval and quote the cosine or sine series it produces.

## Core Concept

> [!tip] Intuition
> A Fourier series only sees the periodic extension of the function, so extending the graph as a mirror image (cosines) or a rotationally symmetric copy (sines) is a free choice that decides which half of the trigonometric basis you must integrate.

**Both extensions are legitimate, and that is the whole point.** When $f$ is given only on $(0,L)$, the values outside that interval are not data — they are an invention. Extending $f$ as an even function about the origin produces only cosine terms; extending it as an odd function produces only sine terms. Both series agree with $f$ everywhere inside $(0,L)$, so a board question that says *expand in a cosine series* is asking you to choose the even extension, not revealing a hidden property of $f$. The factor $2/L$ in both sets of coefficients is the direct consequence: the full-range series on $(-L,L)$ has the coefficient:
$$a_n = \frac{1}{L}\int_{-L}^{L} f\cos\frac{n\pi x}{L}dx$$
An even integrand doubles over the half interval while an odd one cancels, leaving $\frac{2}{L}\int_0^{L}$ in both cases.

**Convergence is governed by the periodic extension, not by $f$ alone.** Dirichlet's theorem gives the series the value $\frac{1}{2}[f(x^{+})+f(x^{-})]$ at every point of the extended function, so a jump in the extension produces a series that converges to the average of the two one-sided limits — for a pulse that jumps from $1$ to $0$, the series gives $0.5$ exactly at the jump, no matter how many terms are kept. Endpoints follow the same rule, and this is where the two half-range series behave very differently: the even extension is continuous at $x=0$ (value $f(0^{+})$) so the cosine series converges to $f(0^{+})$ there, while every sine series vanishes at both $x=0$ and $x=L$ because $\sin(n\pi)=0$ for every $n$. The sine series of $f(x)=x$ on $(0,L)$ therefore sums to $0$ at $x=L$ although $f(L)=L$ — a guaranteed exam trap, not a computational error.

**Symmetry decides which series to prefer, and quarter-wave symmetry halves the work.** If $f$ vanishes at both ends and its odd extension is smooth, the sine series converges quickly and is the natural choice; if the even extension is the smooth one (zero slope at the ends), the cosine series converges quickly. Quarter-wave symmetry is the pattern that lets you skip half the coefficients: substituting $L-x$ into $\sin\frac{n\pi x}{L}$ gives $(-1)^{n+1}\sin\frac{n\pi x}{L}$, so a function with $f(L-x)=f(x)$ has all even sine coefficients zero and only odd harmonics survive, whereas $f(L-x)=-f(x)$ kills the odd harmonics and leaves only even ones. The cosine series is the mirror image of this rule with the roles of even and odd reversed. Detecting that symmetry before integrating turns a two-page expansion into one nonzero coefficient.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Cosine half-range series | $f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} a_n\cos\frac{n\pi x}{L},\qquad 0<x<L$ | The even extension of $f$; the constant term is $a_0/2$, not $a_0$, exactly as in the full-range series. |
| Cosine coefficients | $a_0 = \frac{2}{L}\int_0^{L} f(x)\,dx,\qquad a_n = \frac{2}{L}\int_0^{L} f(x)\cos\frac{n\pi x}{L}\,dx$ | The factor is $2/L$, not $1/L$; the doubled integrand over half the period is what supplies it. |
| Sine half-range series | $f(x) = \sum_{n=1}^{\infty} b_n\sin\frac{n\pi x}{L},\qquad 0<x<L$ | The odd extension of $f$; there is no constant term because the odd extension has zero mean. |
| Sine coefficients | $b_n = \frac{2}{L}\int_0^{L} f(x)\sin\frac{n\pi x}{L}\,dx$ | Same $2/L$; the integral is over the given half interval only. |
| Even extension | $F_e(x) = f(x)\ \ (0<x<L),\qquad F_e(-x) = f(x),\qquad F_e(x+2L) = F_e(x)$ | Continuous across $x=0$ when $f(0^{+})$ exists; this is the extension that produces cosines. |
| Odd extension | $F_o(x) = f(x)\ \ (0<x<L),\qquad F_o(-x) = -f(x),\qquad F_o(x+2L) = F_o(x)$ | Has a jump of $2f(L^{-})$ at $x=\pm L$ unless $f(L)=0$, which is why every sine series is zero at the ends. |
| Cosine series of x on (0,L) | $x = \frac{L}{2} - \frac{4L}{\pi^{2}}\sum_{n\ \mathrm{odd}} \frac{\cos\frac{n\pi x}{L}}{n^{2}}$ | Only odd harmonics; evaluating at $x=0$ gives $\sum_{n\ \mathrm{odd}} 1/n^{2} = \pi^{2}/8$, and at $x=L$ the same value $L/2 - L/2 = 0$. |
| Sine series of x on (0,L) | $x = \frac{2L}{\pi}\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}\sin\frac{n\pi x}{L}$ | Alternating signs from the $(-1)^{n+1}$; at $x=L/2$ it yields Leibniz, $1 - 1/3 + 1/5 - \cdots = \pi/4$. |
| Sine series of the constant 1 | $1 = \frac{4}{\pi}\sum_{n\ \mathrm{odd}} \frac{\sin\frac{n\pi x}{L}}{n},\qquad 0<x<L$ | Odd harmonics only, coefficients $4/(n\pi)$; a square wave, so expect Gibbs overshoot of about 9 percent at each end. |
| Value at a jump | $S(x_0) = \frac{f(x_0^{+}) + f(x_0^{-})}{2}$ | Applies to the periodic extension: a pulse from $1$ to $0$ has the series equal to $0.5$ at the jump, not $1$ and not $0$. |
| Endpoint values | $S_{\sin}(0) = S_{\sin}(L) = 0,\qquad S_{\cos}(0) = f(0^{+}),\qquad S_{\cos}(L) = f(L^{-})$ | True for every function, since $\sin(n\pi)=0$; do not substitute $f(L)$ into a sine series. |
| Quarter-wave symmetry | $f(L-x)=f(x) \Rightarrow b_n = 0\ (n\ \mathrm{even}),\qquad f(L-x)=-f(x) \Rightarrow b_n = 0\ (n\ \mathrm{odd})$ | Sine series rules; for the cosine series the surviving set is reversed, so $f(L-x)=-f(x)$ keeps only odd $n$. |

## Worked Problems

### P1. Find the half-range cosine series of $f(x) = x$ on $0 < x < 2$.

**Given:** f(x) = x on (0, 2); L = 2; even extension required

**Solution:**

1. $a_0 = \frac{2}{L}\int_0^{L} x\,dx = \frac{2}{2}\cdot\frac{2^{2}}{2} = 2$, so the constant term is $a_0/2 = 1$
2. $a_n = \frac{2}{2}\int_0^{2} x\cos\frac{n\pi x}{2}\,dx$
3. With $u = \frac{n\pi x}{2}$, the integral is $\frac{4}{n^{2}\pi^{2}}\left[u\sin u + \cos u\right]_0^{n\pi} = \frac{4}{n^{2}\pi^{2}}\left[(-1)^{n}-1\right]$
4. Even $n$ give $a_n = 0$; odd $n$ give $a_n = -\frac{8}{n^{2}\pi^{2}}$
5. $f(x) = 1 - \frac{8}{\pi^{2}}\left[\cos\frac{\pi x}{2} + \frac{1}{9}\cos\frac{3\pi x}{2} + \frac{1}{25}\cos\frac{5\pi x}{2} + \cdots\right]$
6. Spot check at $x = 1$: every retained cosine has $\cos\frac{n\pi}{2} = 0$ for odd $n$, so the series gives $1$, matching $f(1) = 1$

> [!success]- Answer
> **$f(x) = 1 - \dfrac{8}{\pi^{2}}\displaystyle\sum_{n\ \mathrm{odd}} \dfrac{1}{n^{2}}\cos\dfrac{n\pi x}{2}$ on $0 < x < 2$**

> [!warning] Trap
> Using the full-range coefficient $1/L$ instead of $2/L$: that gives $a_0 = 1$ and the constant term $1/2$, which halves every ordinate and fails at $x=1$, where the correct series returns $1$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `∫dx` `∫(X × cos(πX÷2), 0, 2)` → **-0.8105695**, and $8/\pi^2$ = **0.8105695**, so $a_1 = -8/\pi^2$.
> 2. Even $n$: `∫(X × cos(πX), 0, 2)` → **0**; and `2 ÷ 2 × ∫(X, 0, 2)` → **2** gives the constant term $a_0/2$ = **1**.
>
> With $L = 2$ the $2/L$ factor is exactly 1, so the keyed integral is already $a_n$.

### P2. Find the half-range sine series of $f(x) = 1$ on $0 < x < \pi$ and use it to evaluate $1 - \frac{1}{3} + \frac{1}{5} - \cdots$.

**Given:** f(x) = 1 on (0, pi); L = pi

**Solution:**

1. $b_n = \frac{2}{\pi}\int_0^{\pi}\sin(nx)\,dx = \frac{2}{n\pi}\left[-\cos nx\right]_0^{\pi} = \frac{2}{n\pi}\left[1-(-1)^{n}\right]$
2. Even $n$ give $b_n = 0$; odd $n$ give $b_n = \frac{4}{n\pi}$
3. $1 = \frac{4}{\pi}\left[\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \cdots\right]$ for $0 < x < \pi$
4. Evaluate at $x = \frac{\pi}{2}$: $\sin\frac{n\pi}{2} = +1, -1, +1, \ldots$ for $n = 1, 3, 5, \ldots$
5. $1 = \frac{4}{\pi}\left[1 - \frac{1}{3} + \frac{1}{5} - \cdots\right]$, so the bracket equals $\frac{\pi}{4}$

> [!success]- Answer
> **$1 = \dfrac{4}{\pi}\displaystyle\sum_{n\ \mathrm{odd}}\dfrac{\sin nx}{n}$, giving $1 - \dfrac{1}{3} + \dfrac{1}{5} - \cdots = \dfrac{\pi}{4} = 0.7854$**

> [!warning] Trap
> Keeping the even harmonics because the function is constant. The constant has $f(L-x) = f(x)$, so quarter-wave symmetry kills every even sine coefficient; keeping $\sin 2x/2$ doubles the peak of the reconstructed waveform.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. $b_n = (2/\pi)\int_0^{\pi}\sin nX\,dX$: `∫dx` `∫(sin X, 0, π)` → **2**, so $b_1$ = `2×2÷π` → **1.2732** = $4/\pi$.
> 2. Even $n$ vanish: `∫(sin 2X, 0, π)` → **0**.
> 3. Leibniz at $x = \pi/2$: `Apps` `Σ` `Σ((-1)^(X+1) ÷ (2X-1), 1, 1000)` → **0.785148**, closing on $\pi/4$ = **0.785398**.
>
> The even coefficients are zero because the integral is zero, not because they were skipped.

### P3. A pulse is $f(x) = 1$ on $0 < x < L/2$ and $f(x) = 0$ on $L/2 < x < L$. Find its half-range cosine series and the value the series converges to at $x = L/2$, at $x = 0$ and at $x = L$.

**Given:** pulse of height 1 and width L/2; even extension

**Solution:**

1. $a_0 = \frac{2}{L}\int_0^{L/2} dx = \frac{2}{L}\cdot\frac{L}{2} = 1$, so the constant term is $1/2$
2. $a_n = \frac{2}{L}\int_0^{L/2}\cos\frac{n\pi x}{L}\,dx = \frac{2}{n\pi}\left[\sin\frac{n\pi x}{L}\right]_0^{L/2} = \frac{2}{n\pi}\sin\frac{n\pi}{2}$
3. Even $n$ give $a_n = 0$; $n = 1, 5, 9, \ldots$ give $+\frac{2}{n\pi}$ and $n = 3, 7, 11, \ldots$ give $-\frac{2}{n\pi}$
4. $f(x) = \frac{1}{2} + \frac{2}{\pi}\left[\cos\frac{\pi x}{L} - \frac{1}{3}\cos\frac{3\pi x}{L} + \frac{1}{5}\cos\frac{5\pi x}{L} - \cdots\right]$
5. The even extension jumps from $0$ (left of $x = L/2$ mirrored) to $1$, so at $x = L/2$ the series converges to $\frac{0+1}{2} = 0.5$
6. At $x = 0$ the even extension is continuous with value $1$, so the series gives $f(0^{+}) = 1$; at $x = L$ it gives $f(L^{-}) = 0$
7. Substituting $x = L/2$ verifies the jump: every cosine is $\cos\frac{n\pi}{2} = 0$ for odd $n$, leaving $0.5$

> [!success]- Answer
> **$f(x) = \frac{1}{2} + \frac{2}{\pi}\sum_{n\ \mathrm{odd}}\frac{1}{n}\sin\frac{n\pi}{2}\cos\frac{n\pi x}{L}$; it converges to $0.5$ at $x=L/2$, $1$ at $x=0$ and $0$ at $x=L$**

> [!warning] Trap
> Reporting the series value at the jump as $1$ (the left-hand plateau). The series converges to the average $0.5$ at a jump of the extension, and at $x = L/2$ every retained cosine vanishes, which confirms $0.5$ and not $1$.

### P4. Find the half-range sine series of $f(x) = \sin\frac{\pi x}{L}$ on $0 < x < L$ and explain why a single term is enough.

**Given:** f(x) = sin(pi x / L) on (0, L)

**Solution:**

1. Check quarter-wave symmetry: $f(L-x) = \sin\left(\pi - \frac{\pi x}{L}\right) = \sin\frac{\pi x}{L} = f(x)$, so only odd harmonics can appear
2. $b_n = \frac{2}{L}\int_0^{L}\sin\frac{\pi x}{L}\sin\frac{n\pi x}{L}\,dx$
3. By the orthogonality of sines on $(0,L)$ this integral is $L/2$ for $n = 1$ and $0$ for every other integer $n$
4. $b_1 = \frac{2}{L}\cdot\frac{L}{2} = 1$ and $b_n = 0$ for $n\neq 1$
5. $f(x) = \sin\frac{\pi x}{L}$ exactly — the function is already one term of its own basis

> [!success]- Answer
> **$f(x) = \sin\dfrac{\pi x}{L}$, the single-term series with $b_1 = 1$ and all other $b_n = 0$**

> [!warning] Trap
> Integrating every harmonic instead of reading the symmetry and orthogonality. The exam shortcut is to notice $f(L-x)=f(x)$ (odd harmonics only) and then that $\sin\frac{\pi x}{L}$ is itself basis element number one, so only $b_1$ can be nonzero.

### P5. Use the cosine series of $f(x) = x$ on $(0,L)$ at the endpoint $x = 0$ to evaluate $\displaystyle\sum_{n\ \mathrm{odd}}\frac{1}{n^{2}}$.

**Given:** x = L/2 - (4L/pi^2) sum over odd n of cos(n pi x / L)/n^2; even extension is continuous at x = 0

**Solution:**

1. The even extension of $x$ has the limit $f(0^{+}) = 0$ at the origin and no jump there, so the series converges to $0$
2. Substitute $x = 0$ into $x = \frac{L}{2} - \frac{4L}{\pi^{2}}\sum_{n\ \mathrm{odd}}\frac{\cos\frac{n\pi x}{L}}{n^{2}}$
3. Every cosine becomes $\cos 0 = 1$, so $0 = \frac{L}{2} - \frac{4L}{\pi^{2}}\sum_{n\ \mathrm{odd}}\frac{1}{n^{2}}$
4. The factor $L$ cancels: $\frac{4}{\pi^{2}}\sum_{n\ \mathrm{odd}}\frac{1}{n^{2}} = \frac{1}{2}$
5. Therefore $\sum_{n\ \mathrm{odd}}\frac{1}{n^{2}} = \frac{\pi^{2}}{8} = 1.2337$

> [!success]- Answer
> **$\displaystyle\sum_{n\ \mathrm{odd}}\frac{1}{n^{2}} = \frac{\pi^{2}}{8} = 1.2337$**

> [!warning] Trap
> Expecting the endpoint value to be $f(0) = 0$ only when the extension is continuous there. Here it is, but for a discontinuous extension the series would converge to the average of the one-sided limits instead, so the endpoint must be classified before it is evaluated.

## Traps & Exam Notes

- **Using $1/L$ instead of $2/L$.** Both half-range coefficient formulas carry $2/L$. With $f(x)=x$ on $(0,L)$ this is the difference between $a_0 = L$ (correct) and $a_0 = L/2$, which halves the mean value of the whole series.
- **Substituting $f(L)$ into a sine series.** Every sine half-range series is identically zero at $x=0$ and $x=L$ because $\sin(n\pi)=0$; the sine series of $x$ on $(0,L)$ sums to $0$ at $x=L$ even though $f(L)=L$.
- **Ignoring that jumps converge to the average.** At a discontinuity of the extension the series gives $\frac{1}{2}[f(x^{+})+f(x^{-})]$; a pulse jumping from $1$ to $0$ has series value $0.5$ exactly at the jump, so answering $1$ or $0$ there is wrong.
- **Believing one extension is more correct than the other.** Since $f$ is defined only on $(0,L)$, both extensions give series that agree with $f$ on the open interval; they differ only at endpoints and jumps, so the choice is dictated by the question, not by $f$.
- **Missing quarter-wave symmetry and computing dead coefficients.** If $f(L-x)=f(x)$ the even sine coefficients are zero; integrating for them anyway wastes time and typically produces a small nonzero numerical value from a sign slip, which then corrupts the whole series.

## See Also

- [[11_Fourier_Series_Trigonometric_and_Exponential]]
- [[13_Fourier_Transform_Properties]]
- [[09_Unit_Step,_Dirac_and_Periodic_Functions]]

---

[[11_Fourier_Series_Trigonometric_and_Exponential|⬅ 11]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Fourier_Transform_Properties|13 ➡]]
