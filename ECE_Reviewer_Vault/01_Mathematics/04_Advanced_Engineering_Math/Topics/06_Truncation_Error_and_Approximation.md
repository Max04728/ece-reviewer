---
id: MATH-04-06
title: "Truncation Error and Approximation"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Taylor_and_Maclaurin_Series]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Truncation Error and Approximation

> [!abstract] Scope
> Bound and control the error made when a Taylor or alternating series is truncated, and choose how many terms a required accuracy demands.

## Core Concept

> [!tip] Intuition
> Truncation error is the tail you threw away. Two tools cover almost every exam case: for an alternating series the error is no larger than the first omitted term, and for a general Taylor series the Lagrange remainder bounds it with the next derivative.

**Truncation error is the tail, not a rounding error.** Approximating $f(x)$ by its degree-$N$ Taylor polynomial leaves a remainder:
$$R_N(x) = f(x) - P_N(x) = \frac{f^{(N+1)}(c)}{(N+1)!}(x-a)^{N+1}$$
for some $c$ between $a$ and $x$. This is the Lagrange remainder, and it is an *equality* with an unknown point $c$; to get a usable bound you replace $f^{(N+1)}(c)$ by its maximum magnitude $M$ on the interval. The bound $|R_N| \leq \frac{M|x-a|^{N+1}}{(N+1)!}$ is a worst case, so the true error is usually smaller — but only the bound is guaranteed.

**Alternating series give a free, exact-in-form bound.** If the terms alternate, decrease in magnitude, and tend to zero, then the error from stopping after $N$ terms is bounded by the magnitude of the first omitted term: $|R_N| \leq b_{N+1}$. No derivative is needed and the bound is tight. This is why alternating series are the friendliest truncation problems: you can read the error straight off the next term, and the sign of the error is the sign of that term.

**Choosing the number of terms.** To guarantee an error below a tolerance $\varepsilon$, solve the bound inequality. For an alternating series that means $b_{N+1} < \varepsilon$ — a one-line inequality in $N$. For the Lagrange form the condition is:
$$\frac{M|x-a|^{N+1}}{(N+1)!} < \varepsilon$$
which is usually solved by trial: compute successive factorials until the bound drops below the target. Note that the *guarantee* comes from the bound, never from comparing successive approximations, which can look converged while the tail is still large.

**Error, relative error, and significant digits.** Absolute error is $|f - P_N|$; relative error is that quantity divided by $|f|$, and it is what matters when the answer is quoted as a percentage. A stated error bound of $2\times10^{-5}$ supports at most four decimal places; quoting eight digits from a two-term expansion claims precision the bound does not support. In engineering problems the input quantities also carry measurement uncertainty, and the truncation bound is only worth computing to the same order as that uncertainty.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Lagrange remainder | $R_N(x) = \frac{f^{(N+1)}(c)}{(N+1)!}(x-a)^{N+1}$ | $c$ lies between $a$ and $x$; exact but unknown, so it is bounded. |
| Taylor error bound | $\lvert R_N(x) \rvert \leq \frac{M\,\lvert x-a \rvert^{N+1}}{(N+1)!},\quad M = \max\lvert f^{(N+1)} \rvert$ | Take the maximum over the whole interval between $a$ and $x$, not at an endpoint. |
| Alternating series error | $\left\lvert S - S_N\right \rvert \leq b_{N+1}$ | Requires terms alternating with decreasing magnitudes tending to 0. |
| Relative error | $\varepsilon_{\mathrm{rel}} = \frac{\lvert \mathrm{approx} - \mathrm{true} \rvert}{\lvert \mathrm{true} \rvert}$ | Reported as a fraction or percent; small absolute error on a large value may still be acceptable. |
| Linear approximation error | $f(x) \approx f(a) + f'(a)(x-a),\qquad \lvert R_1 \rvert \leq \frac{M_2}{2}\lvert x-a \rvert^{2}$ | The $N=1$ case; useful for quick sanity checks of small-signal work. |
| Accuracy condition | $b_{N+1} < \varepsilon \Rightarrow \mathrm{stop\ after\ } N \mathrm{\ terms}$ | Applies to alternating series only; a general series needs the Lagrange bound. |
| Number of accurate digits | $\lvert R_N \rvert < 0.5\times10^{-d} \Rightarrow d \mathrm{\ decimal\ places\ are\ safe}$ | Quoting more digits than the bound allows is a reporting error, not a computing one. |

## Worked Problems

### P1. Approximate $\sin(0.3)$ using the first two terms of its Maclaurin series and bound the truncation error.

**Given:** x = 0.3 rad; sin x ≈ x - x^3/6

**Solution:**

1. $x = 0.3$, $x^{3} = 0.027$
2. $\sin(0.3) \approx 0.3 - \frac{0.027}{6} = 0.3 - 0.0045 = 0.2955$
3. The series alternates with decreasing terms, so the error is bounded by the first omitted term
4. $b_{3} = \frac{x^{5}}{5!} = \frac{0.00243}{120} = 2.025\times10^{-5}$
5. Check: true $\sin(0.3) = 0.29552021$, actual error $= 2.02\times10^{-5}$, within the bound

> [!success]- Answer
> **$\sin(0.3) \approx 0.2955$ with $|R| \leq 2.03\times10^{-5}$**

> [!warning] Trap
> Reading $0.3$ as $0.3^\circ$. The sine series is a radian expansion; $\sin(0.3^\circ) = 0.00524$, three orders of magnitude smaller.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. In RAD: `sin(0.3)` → **0.2955202**, and the two-term value `0.3-0.3³÷6` → **0.2955**.
> 2. Difference **2.0207E-5** against the bound `0.3^5÷120` → **2.025E-5** — inside it, as the alternating rule promises.
>
> Degree mode returns `sin(0.3)` = **0.00524**, three orders out — the trap the note names.

### P2. Approximate $\ln(1.1)$ with the series $x - x^{2}/2 + x^{3}/3$ and bound the error.

**Given:** x = 0.1; ln(1+x) ≈ x - x^2/2 + x^3/3

**Solution:**

1. $x = 0.1$: $x^{2}/2 = 0.005$ and $x^{3}/3 = 0.000333333$
2. $\ln(1.1) \approx 0.1 - 0.005 + 0.0003333 = 0.0953333$
3. Terms alternate and decrease, so $|R| \leq b_{4} = \frac{x^{4}}{4} = \frac{0.0001}{4} = 2.5\times10^{-5}$
4. True value: $\ln(1.1) = 0.09531018$, actual error $= 2.31\times10^{-5}$ — inside the bound
5. Only four decimal places ($0.0953$) are supported by this accuracy

> [!success]- Answer
> **$\ln(1.1) \approx 0.09533$ with $|R| \leq 2.5\times10^{-5}$**

> [!warning] Trap
> Writing the answer as $0.0953333$, claiming seven correct digits when the error bound limits you to about four. Digit count must be justified by the bound.

### P3. Use $\sqrt{1+x} \approx 1 + \frac{x}{2} - \frac{x^{2}}{8}$ to estimate $\sqrt{1.02}$ and bound the error.

**Given:** x = 0.02; three-term binomial series

**Solution:**

1. $x/2 = 0.01$ and $x^{2}/8 = 0.0004/8 = 0.00005$
2. $\sqrt{1.02} \approx 1 + 0.01 - 0.00005 = 1.00995$
3. The next binomial term is $\frac{x^{3}}{16} = \frac{8\times10^{-6}}{16} = 5\times10^{-7}$
4. The binomial series for $k=1/2$ alternates after the second term, so $|R| \leq 5\times10^{-7}$
5. True: $\sqrt{1.02} = 1.00995049$, actual error $= 4.9\times10^{-7}$

> [!success]- Answer
> **$\sqrt{1.02} \approx 1.00995$ with $|R| \leq 5.0\times10^{-7}$**

> [!warning] Trap
> Using the first two terms only ($1 + x/2 = 1.01$) and still claiming five decimals. The dropped $x^{2}/8$ term is $5\times10^{-5}$, a hundred times larger than the three-term error.

### P4. Estimate $e^{0.5}$ with the Maclaurin polynomial through $x^{3}$ and bound the error with the Lagrange remainder.

**Given:** x = 0.5; f(x) = e^x; N = 3

**Solution:**

1. $P_3(0.5) = 1 + 0.5 + \frac{0.25}{2} + \frac{0.125}{6} = 1 + 0.5 + 0.125 + 0.0208333 = 1.6458333$
2. Lagrange form: $|R_3| = \left|\frac{e^{c}}{4!}(0.5)^{4}\right|$ with $0 < c < 0.5$
3. Bound $e^{c} \leq e^{0.5} < 2$ on that interval
4. $|R_3| \leq \frac{2 \times 0.0625}{24} = \frac{0.125}{24} = 5.21\times10^{-3}$
5. True: $e^{0.5} = 1.6487213$, actual error $= 2.89\times10^{-3}$ — inside the bound

> [!success]- Answer
> **$e^{0.5} \approx 1.6458$ with $|R_3| \leq 5.2\times10^{-3}$**

> [!warning] Trap
> Using $M = 1$ (the value of $e^{x}$ at the left endpoint) or $M = e^{0.5}$ without rounding up. The bound needs the *maximum* of $|f^{(4)}|$ over $[0, 0.5]$, and replacing it by a smaller number destroys the guarantee.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1+0.5+0.25÷2+0.125÷6` → **1.6458333**, and `e^0.5` → **1.6487213**: the true error is **2.888E-3**.
> 2. Bound with $M = 2$: `2×0.5^4÷24` → **5.208E-3**, which contains that error.
>
> Using $M = 1$ gives `0.5^4÷24` = **2.604E-3**, *smaller* than the true error — not a bound at all.

### P5. How many terms of $\displaystyle\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n^{2}}$ are needed to guarantee an error below $0.01$?

**Given:** alternating series; tolerance = 0.01

**Solution:**

1. The series alternates with $b_n = 1/n^{2}$ decreasing to 0, so the error bound is the first omitted term
2. Stopping after $N$ terms gives $|R_N| \leq b_{N+1} = \frac{1}{(N+1)^{2}}$
3. Require $\frac{1}{(N+1)^{2}} < 0.01$
4. $(N+1)^{2} > 100 \Rightarrow N+1 > 10 \Rightarrow N \geq 10$
5. So 10 terms are required (the 11th term $1/121 = 0.00826$ is the first one below the tolerance)

> [!success]- Answer
> **$N = 10$ terms**

> [!warning] Trap
> Solving $1/N^{2} < 0.01$ and answering 10 terms from $N > 10$ — the index is off by one either way. The bound is on the first *omitted* term, $b_{N+1}$, not on the last included term.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `SOLVE` on `1÷(X+1)²` `ALPHA` `=` `0.01`, guess 10 → `X` = **9**, so $N+1 > 10$ gives $N \geq 10$.
> 2. Boundary check: `1÷11²` → **0.0082645** (below 0.01) while `1÷10²` → **0.01** (not below).
>
> The bound is on the first *omitted* term $b_{N+1}$, so the inequality is written in $N+1$ and the answer is 10, not 9.

## Traps & Exam Notes

- **Using the next term as the error bound for a non-alternating series.** The first-omitted-term rule is an alternating-series theorem. For $e^{0.5}$ the first omitted term is $2.6\times10^{-3}$ but the guaranteed bound is $5.2\times10^{-3}$ — twice as large, and only Lagrange proves either.
- **Evaluating $M$ at the wrong point.** For $f = e^{x}$ on $[0, 0.5]$ the maximum of $f^{(4)}$ is $e^{0.5}$, not $e^{0} = 1$. Substituting the left endpoint understates the bound and can make an inadequate approximation look sufficient.
- **Confusing the bound with the actual error.** $|R_N| \leq 5.2\times10^{-3}$ means the error is *at most* that; the true error here is $2.9\times10^{-3}$. Quoting the actual error as if it were guaranteed is unjustified, and quoting it as the bound is pessimistic.
- **Reporting more digits than the error supports.** An error bound of $2\times10^{-5}$ supports four decimal places. Printing $0.0953333$ from a two-digit-accurate computation claims precision that does not exist.
- **Radians versus degrees in the trig series.** The whole error analysis collapses if $x = 30$ is substituted for $30^\circ$; the series and its remainder both assume radians.
- **Off-by-one in the alternating tolerance.** The error after truncating at $N$ is bounded by $b_{N+1}$, so the inequality to solve is $b_{N+1} < \varepsilon$; using $b_N$ gives one term too few.
- **Forgetting that the Lagrange bound needs an interval.** $c$ ranges between the centre and the evaluation point, so $M$ must be the maximum on that whole interval — taking it at the evaluation point only is not a bound.

## See Also

- [[05_Taylor_and_Maclaurin_Series]]
- [[04_Power_Series_Radius_of_Convergence]]
- [[03_Sequences_and_Convergence_Tests]]
- [[07_Differentials_and_Error_Propagation]]

---

[[05_Taylor_and_Maclaurin_Series|⬅ 05]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Laplace_Transform_Pairs|07 ➡]]
