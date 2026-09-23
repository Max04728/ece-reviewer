---
id: MATH-08-03
title: "Newton-Raphson and Secant"
part: "01_Mathematics"
area: "08_Numerical_Methods_and_Analysis"
topic: 3
tier: 1
depth: full
problem_count: 9
prereqs: ["[[02_Differentiation_Rules]]"]
tags: ["ece", "mathematics", "numerical_methods_and_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Newton-Raphson and Secant

> [!abstract] Scope
> Solve f(x) = 0 with the tangent-line (Newton-Raphson) and chord (secant) iterations, and know exactly when each one fails.

## Core Concept

> [!tip] Intuition
> Newton-Raphson stands at the current guess, draws the tangent line, and jumps to where that line crosses the axis. Near a simple root the tangent is almost the curve, so the jump lands very close — and the next one lands quadratically closer.

**Newton-Raphson is the tangent-line linearisation.** Expand $f$ about $x_n$ and keep two terms:
$$f(x_n)+f'(x_n)(x_{n+1}-x_n)=0$$
Solving gives $x_{n+1}=x_n-\frac{f(x_n)}{f'(x_n)}$. Equivalently, the method replaces the curve by its tangent at each step — that is why it needs $f'$ and why it fails wherever the tangent is horizontal.

**Quadratic convergence, and what it costs.** Near a simple root the error satisfies:
$$E_{n+1}\approx\frac{|f''(r)|}{2|f'(r)|}E_n^{2}$$
The number of correct digits roughly doubles each iteration. The price: (1) $f'$ must exist and be cheap; (2) the initial guess must be close enough to be in the basin of attraction; (3) a multiple root destroys the quadratic rate — for a root of multiplicity $m$ the method degrades to linear with rate $\frac{m-1}{m}$.

**Failure modes you must recognise.** A *horizontal tangent* gives $f'(x_n)\to0$ and the next iterate shoots to infinity (for $f(x)=x^{3}-2x+2$ from $x_0=0$, $f'(0)=0$ — division by zero on the first step). An *oscillation* happens when successive iterates leap across a local extremum and alternate (classic on $f(x)=x^{3}-x-1$ guesses near an inflection with a poor start). A *poor start* can converge to a different root, or diverge. Newton-Raphson is not a bracketing method: nothing keeps the iterate between bounds.

**The secant method removes the derivative.** Replace $f'(x_n)$ by the backward difference $\frac{f(x_n)-f(x_{n-1})}{x_n-x_{n-1}}$. The resulting iteration is:
$$x_{n+1}=x_n-f(x_n)\frac{x_n-x_{n-1}}{f(x_n)-f(x_{n-1})}$$
This is the $x$-intercept of the chord through the last two points. Two starting values are required. Its convergence order is the golden ratio $p=\frac{1+\sqrt5}{2}\approx1.618$: slower than Newton, faster than linear, and no derivative needed. It is also more robust when $f'$ is expensive or unavailable.

**Secant is regula falsi without the bracket.** Because it discards the sign test, the secant method can be much faster than false position (no stall) but loses the guarantee. If the two current points have equal function values the denominator vanishes: the chord is horizontal and the next iterate is undefined. This is the standard exam failure for the secant method.

**Stopping.** Watch two convergence measures at every step. The relative change is:
$$\left|\frac{x_{n+1}-x_n}{x_{n+1}}\right|$$
The residual is $|f(x_{n+1})|$. Newton's speed is also its hazard: once iterates agree to machine precision further iterations produce noise, so a fixed iteration count plus a change test is the safe combination.

## Derivation

**Newton-Raphson from the Taylor expansion.** Expand $f$ about the current iterate and keep only the first two terms:

$$f(x_n + h) \approx f(x_n) + h f'(x_n).$$

Setting the linearisation to zero and solving for the step $h$ gives $h = -\frac{f(x_n)}{f'(x_n)}$, so the next iterate is $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$. The method is therefore a first-order (tangent-line) model of the function, solved exactly, repeated. This is why it needs $f'$ and why a near-zero $f'$ makes the step enormous.

**Where the quadratic error relation comes from.** Let $r$ be the root and $E_n = x_n - r$. Substituting $x_n = r + E_n$ into the iteration and expanding $f$ and $f'$ about $r$ (using $f(r)=0$):

$$E_{n+1} = E_n - \frac{f'(r)E_n + \tfrac12 f''(r)E_n^2 + \cdots}{f'(r) + f''(r)E_n + \cdots}.$$

Dividing out and discarding terms of order $E_n^2$ and higher leaves $E_{n+1} \approx \frac{f''(r)}{2f'(r)}E_n^{2}$. The squared error term is exactly what 'doubling the correct digits each step' means. It also shows the two failure conditions directly: $f'(r)\to 0$ makes the prefactor explode, and a multiple root has $f'(r)=0$ so the derivation's division is invalid — the rate drops to linear.

**Why the secant order is the golden ratio.** Replacing $f'$ with the backward difference turns the step into a two-point formula whose error recursion involves $E_n$ and $E_{n-1}$ together: $E_{n+1} \approx C\,E_nE_{n-1}$. Looking for a solution of the form $E_{n+1} = E_n^{p}$ forces $p = 1 + \frac1p$, i.e. $p^2 - p - 1 = 0$, whose positive root is $p = \frac{1+\sqrt5}{2} \approx 1.618$. So the secant method is superlinear but not quadratic: fewer digits gained per step, at the cost of only one new function evaluation per step instead of two.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Newton-Raphson iteration | $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$ | Needs f' and a good initial guess. Fails if f'(x_n) = 0. |
| Newton error relation | $E_{n+1} \approx \frac{\lvert f''(r) \rvert}{2\lvert f'(r) \rvert}\,E_n^{2}$ | Quadratic convergence near a simple root r (f'(r) != 0). |
| Newton for multiple roots | $E_{n+1} \approx \left(1-\frac{1}{m}\right)E_n$ | m = multiplicity. Linear, not quadratic; use the modified form with f/f' or u = f/f'. |
| Secant iteration | $x_{n+1} = x_n - f(x_n)\,\frac{x_n - x_{n-1}}{f(x_n)-f(x_{n-1})}$ | Two starting values x_0, x_1. No derivative required. |
| Secant convergence order | $p = \frac{1+\sqrt{5}}{2} \approx 1.618$ | Order 1.618 versus Newton's 2, but cheaper per step. |
| Secant failure condition | $f(x_n) = f(x_{n-1}) \Rightarrow \mathrm{horizontal\ chord,\ division\ by\ zero}$ | The secant method has no bracket to save it. |
| Relative stopping test | $\left\lvert \frac{x_{n+1}-x_n}{x_{n+1}}\right \rvert < \varepsilon$ | Better than \|f\| alone when the root is large or the scale is unknown. |

## Interactive Widget

**Root Finding Convergence Race**

![[Root_Finding_Convergence_Race.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Use Newton-Raphson on $f(x)=x^{3}-2x-5$ starting at $x_0=2$ for 3 iterations.

**Given:** f(x) = x^3 - 2x - 5; f'(x) = 3x^2 - 2; x0 = 2

**Solution:**

1. x0 = 2: f(2) = 8 - 4 - 5 = -1; f'(2) = 12 - 2 = 10; x1 = 2 - (-1/10) = 2.1
2. x1 = 2.1: f(2.1) = 9.261 - 4.2 - 5 = +0.061; f'(2.1) = 13.23 - 2 = 11.23; x2 = 2.1 - 0.061/11.23 = 2.1 - 0.005432 = 2.094568
3. x2 = 2.094568: f = 9.189247 - 4.189136 - 5 = +0.000186; f' = 13.161647 - 2 = 11.161647; x3 = 2.094568 - 0.0000167 = 2.094551
4. Confirm: f(2.094551) = 9.189389 - 4.189102 - 5 = -0.000000 (to 6 decimals)
5. Note the digit doubling: x1 is good to 1 decimal, x2 to 4, x3 to 7 — quadratic convergence

> [!success]- Answer
> **$x_3 = 2.094551$, matching the true root to 6 decimals after 3 iterations.**

> [!warning] Trap
> Dividing by $f(x_n)$ instead of $f'(x_n)$, or forgetting that the correction $f/f'$ is *subtracted*. A sign slip sends the iterate the wrong way and the sequence diverges instead of converging.

### P2. Find $\sqrt{2}$ by Newton-Raphson starting from $x_0=1$, using the iteration for $f(x)=x^{2}-2$.

**Given:** f(x) = x^2 - 2; f'(x) = 2x; x0 = 1

**Solution:**

1. Simplify: x_{n+1} = x_n - (x_n^2 - 2)/(2x_n) = (x_n + 2/x_n)/2 — the Babylonian average
2. x1 = (1 + 2/1)/2 = 1.5
3. x2 = (1.5 + 2/1.5)/2 = (1.5 + 1.333333)/2 = 1.416667
4. x3 = (1.416667 + 2/1.416667)/2 = (1.416667 + 1.411765)/2 = 1.414216
5. Check: 1.414216^2 = 2.000006, true sqrt(2) = 1.41421356
6. Correct digits: 1, then 2, then 3, then 6 — quadratic convergence again

> [!success]- Answer
> **$x_3 = 1.414216$ (true $\sqrt{2}=1.4142136$).**

> [!warning] Trap
> Rounding each iterate to 3 decimals and continuing. The quadratic rate depends on carrying full precision; rounding to 1.42 at step 2 leaves an iterate that no longer improves.

### P3. Use the secant method on $f(x)=x^{2}-2$ with $x_0=1$ and $x_1=2$ for 3 iterations.

**Given:** f(x) = x^2 - 2; x0 = 1, x1 = 2

**Solution:**

1. x2 = x1 - f(x1)(x1 - x0)/(f(x1) - f(x0)) = 2 - 2(2-1)/(2-(-1)) = 2 - 2/3 = 1.333333
2. x3 = (x2 f(x1) - x1 f(x2))/(f(x1) - f(x2)) = (1.333333(2) - 2(-0.222222))/(2 + 0.222222) = (2.666667 + 0.444444)/2.222222 = 3.111111/2.222222 = 1.400000 (use this two-point form: it avoids the sign slips of the subtracted form)
3. x4 = (x3 f(x2) - x2 f(x3))/(f(x2) - f(x3)); f(x3) = 1.96 - 2 = -0.04; = (1.4(-0.222222) - 1.333333(-0.04))/(-0.222222 + 0.04) = (-0.311111 + 0.053333)/(-0.182222) = -0.257778/(-0.182222) = 1.414634
4. Check: 1.414634^2 = 2.001189, true sqrt(2) = 1.4142136

> [!success]- Answer
> **$x_4 = 1.414634$ after 3 secant steps (true $1.4142136$) — slower than Newton from the same start, but no derivative was used.**

> [!warning] Trap
> Forgetting that the secant method carries *two* previous points. Reusing only the latest point reduces it to a one-point formula with a zero denominator, and the iteration breaks.

### P4. Show that Newton-Raphson fails immediately for $f(x)=x^{3}-2x+2$ from $x_0=0$, and suggest a remedy.

**Given:** f(x) = x^3 - 2x + 2; f'(x) = 3x^2 - 2; x0 = 0

**Solution:**

1. f(0) = 2; f'(0) = 3(0) - 2 = -2
2. x1 = 0 - 2/(-2) = 1
3. f(1) = 1 - 2 + 2 = +1; f'(1) = 3 - 2 = 1; x2 = 1 - 1/1 = 0
4. The sequence is 0, 1, 0, 1, ... — a 2-cycle, not convergence
5. Diagnosis: this f has a local maximum at x = -sqrt(2/3) and a local minimum at x = +sqrt(2/3), and f has only one real root (at x = -1.769292); the iterates straddle the local minimum and are repelled
6. Remedy: start from a bracket, e.g. x0 = -2 gives f(-2) = -8+4+2 = -2 and f(-1) = -1+2+2 = +3, so bisect first or run regula falsi, then finish with Newton-Raphson

> [!success]- Answer
> **It oscillates in the 2-cycle $0\to1\to0$; use a bracket (bisection or false position) to get a starting point in the root's basin, then switch to Newton-Raphson.**

> [!warning] Trap
> Assuming Newton-Raphson always converges when the first step 'works'. Here the first step is perfectly legal and the method still cycles forever. A non-converging sequence is not a roundoff problem.

### P5. How many iterations does bisection need to match the accuracy Newton-Raphson reaches in 3 iterations on $x^{3}-2x-5$ over $[2,3]$?

**Given:** bisection bound: (b-a)/2^n; Newton after 3 iterations: error ~ 1e-7

**Solution:**

1. Newton error after 3 iterations: |2.094551 - 2.09455148| is at the 1e-7 level
2. Bisection: 1/2^n <= 1e-7 requires 2^n >= 1e7
3. n >= log10(1e7)/log10(2) = 7/0.30103 = 23.3, so 24 iterations
4. Even at 1e-5 (Newton's x2) bisection needs n >= 5/0.30103 = 16.6, i.e. 17 iterations
5. Conclusion: 3 Newton iterations replace about 24 bisection iterations, at the cost of evaluating f'

> [!success]- Answer
> **About 24 bisection iterations — a factor of 8 in work — because Newton's quadratic order roughly doubles the correct digits per step.**

> [!warning] Trap
> Comparing per-iteration cost naively. One Newton step costs two function evaluations ($f$ and $f'$); the fair comparison is Newton's 3 steps (6 evaluations) against bisection's 24 ($f$ only), which Newton still wins.

### P6. Use Newton-Raphson to solve $\cos x = x$ starting from $x_0 = 1$ for 3 iterations.

**Given:** f(x) = cos x - x; x0 = 1, radians

**Solution:**

1. Write f(x) = cos x - x, so f'(x) = -sin x - 1
2. x1 = 1 - (cos 1 - 1)/(-sin 1 - 1) = 1 - (0.540302 - 1)/(-0.841471 - 1) = 1 - (-0.459698)/(-1.841471)
3. = 1 - 0.249637 = 0.750363
4. x2 = 0.750363 - (cos 0.750363 - 0.750363)/(-sin 0.750363 - 1)
5. cos 0.750363 = 0.731689, sin 0.750363 = 0.681639, so numerator = -0.018674, denominator = -1.681639
6. x2 = 0.750363 - 0.011104 = 0.739259
7. x3 = 0.739259 - (0.739085 - 0.739259)/(-0.673612 - 1) = 0.739259 - 0.000104 = 0.739155

> [!success]- Answer
> **$x \approx 0.739085$ (3 iterations reach $0.73916$; the correct digits roughly double each step).**

> [!warning] Trap
> Computing in degrees. The derivative of cos x is -sin x only in radians; in degrees a factor of pi/180 enters and every iterate is wrong.

### P7. Use the secant method on $f(x) = x^3 - 2x - 5$ with $x_0 = 2$ and $x_1 = 3$.

**Given:** two starting points required; same function as the Newton example

**Solution:**

1. f(2) = 8 - 4 - 5 = -1; f(3) = 27 - 6 - 5 = 16
2. x2 = 3 - 16(3 - 2)/(16 - (-1)) = 3 - 16/17 = 2.058824
3. f(2.058824) = 8.7271 - 4.1176 - 5 = -0.3905
4. x3 = 2.058824 - (-0.3905)(2.058824 - 3)/(-0.3905 - 16) = 2.058824 - (0.36760)/(-16.3905) = 2.058824 + 0.022428 = 2.081252
5. f(2.081252) = 9.01554 - 4.16250 - 5 = -0.14696
6. x4 = 2.081252 - (-0.14696)(2.081252 - 2.058824)/(-0.14696 + 0.3905) = 2.081252 + 0.013539 = 2.094791

> [!success]- Answer
> **$x \approx 2.094551$; the secant method reaches $2.0948$ in 3 steps — accurate but visibly slower than Newton here.**

> [!warning] Trap
> Sign errors in the denominator f(x_n) - f(x_{n-1}). It must pair with (x_n - x_{n-1}) in the same order; swapping one and not the other flips the correction's sign and the iteration diverges.

### P8. Determine the multiplicity of the root of $f(x) = x^3 - 3x^2 + 3x - 1$ and explain why Newton-Raphson converges slowly to it.

**Given:** factor the polynomial; relate multiplicity to convergence

**Solution:**

1. Recognise the perfect cube: x^3 - 3x^2 + 3x - 1 = (x - 1)^3
2. The root r = 1 has multiplicity m = 3
3. f'(x) = 3(x-1)^2, so f'(1) = 0 — the simple-root convergence derivation does not apply
4. For multiplicity m the error recursion becomes linear with rate (m-1)/m
5. Here the rate is 2/3, so each iteration removes only about 0.18 of the error's digits rather than doubling them

> [!success]- Answer
> **Multiplicity 3; convergence is linear with rate $2/3$ instead of quadratic.**

> [!warning] Trap
> Reporting 'it still converges, just a bit slower' without quantifying. The loss is qualitative: quadratic becomes linear, so the iteration count to reach a given accuracy grows dramatically.

### P9. For $f(x) = x^3 - 2x + 2$ with $x_0 = 0$, show that Newton-Raphson enters a 2-cycle and never converges.

**Given:** f'(0) = 0 but f(0) != 0; classic non-convergence example

**Solution:**

1. f(0) = 2 and f'(x) = 3x^2 - 2, so f'(0) = -2 (finite, so the first step is legal)
2. x1 = 0 - 2/(-2) = 1
3. f(1) = 1 - 2 + 2 = 1; f'(1) = 3 - 2 = 1, so x2 = 1 - 1/1 = 0
4. x3 = 0 - 2/(-2) = 1, so the iterates alternate 0, 1, 0, 1, ...
5. The sequence is bounded but not convergent, so the method fails

> [!success]- Answer
> **The iterates cycle $0 \to 1 \to 0$ and never converge.**

> [!warning] Trap
> Assuming that because $f'(0) \neq 0$ the first step is safe, the method must converge. A finite first step guarantees nothing about the long-run behaviour — Newton-Raphson has no bracket to keep it honest.

## Traps & Exam Notes

- **Dividing by $f'(x_n)=0$.** A horizontal tangent makes the next iterate infinite. Check $|f'|$ against a floor before dividing, and know that $f(x)=x^{3}-2x+2$ at $x_0=0$ is the standard example.
- **Using Newton-Raphson without a bracket on a multiple root.** For $f(x)=(x-1)^{2}$ the iteration converges only linearly and the final iterates crawl. Detect it by $f'(r)=0$ and switch to $u=f/f'$ or to a bracketing method.
- **Assuming convergence because the first iterate moved closer.** The $0\to1\to0$ cycle on $x^{3}-2x+2$ shows a legal first step followed by permanent oscillation.
- **Secant with only one starting point.** The formula needs $x_{n-1}$, so two values must be supplied; reusing one degenerates the denominator to zero.
- **Equal function values in the secant denominator.** If $f(x_n)=f(x_{n-1})$ the chord is horizontal. Re-pick a starting pair rather than dividing by zero.
- **Rounding the iterates between steps.** Quadratic convergence needs the guard digits; truncating to 3 decimals each pass turns a 3-iteration answer into a 6-iteration one and can change the last digit.
- **Confusing the secant method with regula falsi.** Secant drops the sign bracket and uses the last two iterates (fast, unguaranteed); regula falsi keeps the bracket (guaranteed, may stall).

## See Also

- [[02_Bisection_and_Regula_Falsi]]
- [[01_Error_Analysis,_Roundoff_and_Truncation]]
- [[05_Taylor_and_Maclaurin_Series]]

---

[[02_Bisection_and_Regula_Falsi|⬅ 02]] · [[_MOC_Numerical_Methods_and_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Newton’s_Divided_Difference_Interpolation|04 ➡]]
