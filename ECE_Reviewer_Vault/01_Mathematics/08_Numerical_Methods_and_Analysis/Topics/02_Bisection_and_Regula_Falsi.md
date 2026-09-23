---
id: MATH-08-02
title: "Bisection and Regula Falsi"
part: "01_Mathematics"
area: "08_Numerical_Methods_and_Analysis"
topic: 2
tier: 2
depth: full
problem_count: 3
prereqs: ["[[01_Limits,_Continuity_and_L_Hopital]]"]
tags: ["ece", "mathematics", "numerical_methods_and_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Bisection and Regula Falsi

> [!abstract] Scope
> Locate a root of a nonlinear equation by bracketing, using bisection for guaranteed halving and regula falsi for faster but lopsided convergence.

## Core Concept

> [!tip] Intuition
> If a continuous function is negative at one end of an interval and positive at the other, it must cross zero somewhere in between. Both methods exploit that sign change: bisection cuts the interval in half, regula falsi cuts it where the straight chord crosses zero.

**Bracketing needs a sign change.** Both methods start from an interval $[a,b]$ with $f(a)f(b)<0$. By the Intermediate Value Theorem a root lies inside. If $f(a)f(b)>0$ there is no guarantee of a root in $[a,b]$ — and no guarantee the iteration finds the one you want. The bracket must also contain exactly one root for the methods to be safe.

**Bisection halves the interval every time.** Compute the midpoint $c=\frac{a+b}{2}$; if $f(a)f(c)<0$ the root is in $[a,c]$, otherwise in $[c,b]$. Because the *root itself* is never used, convergence is guaranteed and the error is bounded by the half-width $(b-a)/2^{n}$ after $n$ steps. The price is speed: one binary digit per iteration, and roughly 10 iterations for every 3 decimal digits (since $2^{10}\approx10^{3}$).

**Regula falsi replaces the midpoint with the chord intercept.** The false-position estimate is $c=\frac{a f(b)-b f(a)}{f(b)-f(a)}$, the point where the secant through $(a,f(a))$ and $(b,f(b))$ cuts the axis. For a smooth function the root is usually much closer to $c$ than to the midpoint, so early convergence is far faster than bisection.

**The regula falsi stall is the exam trap.** If $f$ is convex over the bracket, one endpoint never leaves the interval; every new estimate crowds against the other end and the interval width shrinks geometrically but slowly (the stagnant endpoint approaches the root only linearly). On $f(x)=x^{3}-2x-5$ over $[2,3]$ the upper end stays at $b=3$ for every iteration. Modified false position (Illinois algorithm) halves the stagnant function value to break the stall.

**Stopping and error control.** Bisection stops when $(b-a)/2^{n}$ or $|f(c)|$ is below tolerance; the bracket bound is a true bound, $|f(c)|$ is not. Regula falsi needs the same criterion but the interval bound is misleading because the interval may stay long while $c$ is already accurate. Always report the root to the tolerance you claim: if the bracket bound is $2\times10^{-3}$, do not quote 7 decimals.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Bracket condition | $f(a)\,f(b) < 0$ | Required by both methods. Opposite signs guarantee a root for a continuous f. |
| Bisection midpoint | $c = \frac{a+b}{2}$ | No derivative and no function shape used. |
| Bracket update | $f(a)f(c)<0 \Rightarrow b=c; \quad f(a)f(c)>0 \Rightarrow a=c$ | Keep the half that still contains the sign change. |
| Bisection error bound | $\lvert E_n \rvert \le \frac{b-a}{2^{n}}$ | Absolute bound after n iterations. True bound, independent of f. |
| Iterations for a tolerance | $n \ge \log_2\!\left(\frac{b-a}{\varepsilon}\right)$ | Round UP. About 3.32 iterations per decimal digit. |
| Regula falsi estimate | $c = \frac{a\,f(b) - b\,f(a)}{f(b)-f(a)}$ | Chord intercept. Requires f(a) and f(b) to have opposite signs, and the denominator is never zero then. |
| Relative stopping rule | $\left\lvert \frac{c_{n}-c_{n-1}}{c_{n}}\right \rvert < \varepsilon$ | Use when the root magnitude is unknown or large. |
| Convergence orders | $\mathrm{bisection:\ linear\ } (E_{n+1}\approx E_n/2), \quad \mathrm{false\ position:\ superlinear\ early,\ linear\ late}$ | Bisection is reliable; regula falsi is fast then stalls. |

## Interactive Widget

**Root Finding Convergence Race**

![[Root_Finding_Convergence_Race.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find the root of $f(x)=x^{3}-2x-5$ in $[2,3]$ by bisection. Do 5 iterations and bound the error.

**Given:** f(2) = 8 - 4 - 5 = -1; f(3) = 27 - 6 - 5 = +16

**Solution:**

1. Iteration 1: c = (2+3)/2 = 2.5; f(2.5) = 15.625 - 5 - 5 = +5.625. f(2)f(2.5) < 0 so the root is in [2, 2.5]; set b = 2.5, bound = 0.5
2. Iteration 2: c = (2+2.5)/2 = 2.25; f(2.25) = 11.390625 - 4.5 - 5 = +1.890625. Root in [2, 2.25]; b = 2.25, bound = 0.25
3. Iteration 3: c = (2+2.25)/2 = 2.125; f(2.125) = 9.595703 - 4.25 - 5 = +0.345703. Root in [2, 2.125]; b = 2.125, bound = 0.125
4. Iteration 4: c = (2+2.125)/2 = 2.0625; f(2.0625) = 8.773682 - 4.125 - 5 = -0.351318. Root in [2.0625, 2.125]; a = 2.0625, bound = 0.0625
5. Iteration 5: c = (2.0625+2.125)/2 = 2.09375; f(2.09375) = 9.178528 - 4.1875 - 5 = -0.008942. Root in [2.09375, 2.125]; a = 2.09375, bound = 0.03125
6. Best estimate after 5 iterations: 2.09375, error bound 0.03125. True root is 2.094551

> [!success]- Answer
> **$x \approx 2.094$ (after 5 iterations $c=2.09375$, with a guaranteed bound of $\pm0.03125$); exact root $2.094551$.**

> [!warning] Trap
> Deciding the bracket update from the sign of $f(c)$ alone without checking $f(a)$. If you keep the wrong half the method silently converges to nothing, and copying the wrong $c$ into the next step is the single most common arithmetic error here.

### P2. Repeat the same root with regula falsi on $[2,3]$ for 3 iterations and compare the interval length with bisection.

**Given:** f(2) = -1; f(3) = +16

**Solution:**

1. Iteration 1: c = (2(16) - 3(-1))/(16-(-1)) = (32+3)/17 = 35/17 = 2.058824; f(2.058824) = 8.726814 - 4.117647 - 5 = -0.390800. Root in [2.058824, 3]; a = 2.058824 (bracket width 1.0000)
2. Iteration 2: c = (2.058824(16) - 3(-0.390800))/(16.390800) = (32.941184 + 1.172400)/16.390800 = 34.113584/16.390800 = 2.081264; f(c) = 9.015226 - 4.162528 - 5 = -0.147204 (width 0.9412)
3. Iteration 3: c = (2.081264(16) - 3(-0.147204))/(16.147204) = (33.300224 + 0.441612)/16.147204 = 33.741836/16.147204 = 2.089639; f(c) = 9.124699 - 4.179278 - 5 = -0.054677 (width 0.9187)
4. Compare the estimates: bisection after 3 iterations gives 2.125, regula falsi gives 2.089639
5. Note the bracket: b stays at 3 for all three iterations (f is convex on [2,3]), so the interval width fell only from 1.0000 to 0.9187

> [!success]- Answer
> **$c_3 = 2.089639$ — closer to the root $2.094551$ than bisection's $2.125$ at the same cost, but the bracket barely shrank.**

> [!warning] Trap
> Using the interval width as the error estimate for regula falsi. After 3 iterations the bracket is still 0.91 wide while the estimate is accurate to 0.005 — the width is meaningless here, and only $|f(c)|$ or consecutive estimates reveal the real accuracy.

### P3. Use bisection on $f(x)=\cos x - x$ over $[0,1]$ to find the root to within $10^{-3}$. How many iterations, and what is the estimate?

**Given:** f(0) = 1 - 0 = +1; f(1) = 0.540302 - 1 = -0.459698

**Solution:**

1. Iterations needed: n >= log2(1/0.001) = 9.97, so n = 10
2. Iteration 1: c = 0.5; f(0.5) = 0.877583 - 0.5 = +0.377583 -> root in [0.5, 1]
3. Iteration 2: c = 0.75; f(0.75) = 0.731689 - 0.75 = -0.018311 -> root in [0.5, 0.75]
4. Iteration 3: c = 0.625; f(0.625) = 0.810963 - 0.625 = +0.185963 -> root in [0.625, 0.75]
5. Iteration 4: c = 0.6875; f(0.6875) = 0.772830 - 0.6875 = +0.085330 -> root in [0.6875, 0.75]
6. Iteration 5: c = 0.71875; f(0.71875) = 0.752390 - 0.71875 = +0.033640 -> root in [0.71875, 0.75]
7. Iteration 6: c = 0.734375; f(c) = 0.742523 - 0.734375 = +0.008148 -> root in [0.734375, 0.75]
8. Iteration 7: c = 0.7421875; f(c) = 0.737333 - 0.742188 = -0.004854 -> root in [0.734375, 0.7421875]
9. After 10 iterations the bracket is narrower than 1/1024 = 9.77e-4, centred near 0.7391
10. True root: cos(0.739085) = 0.739085, so x = 0.739085

> [!success]- Answer
> **$n = 10$ iterations; $x \approx 0.739$ (root $0.739085$, bracket width $<10^{-3}$).**

> [!warning] Trap
> Forgetting that $x$ must be in radians. Entering `cos` in degree mode gives $f(0.5)=\cos 28.6^\circ-0.5$, which has the wrong sign pattern and sends the bracket to a nonsense root.

## Traps & Exam Notes

- **No sign change in the initial bracket.** If $f(a)f(b)>0$ the Intermediate Value Theorem gives you nothing. Scan for a sign change first; do not start the iteration on faith.
- **An even number of roots inside the bracket.** Two roots in $[a,b]$ still give $f(a)f(b)>0$, so the test passes on neither branch correctly. Sketch or sample the function before choosing the interval.
- **Updating the wrong endpoint.** Compare $f(a)f(c)$, not just the sign of $f(c)$. Reversing the rule produces a sequence that converges to a bracket edge, not a root.
- **Expecting bisection's interval bound to apply to regula falsi.** False position can leave the interval almost as wide as it started while the estimate is already accurate — quoting $(b-a)/2^{n}$ there is a fiction.
- **Stopping at 9 iterations for a $10^{-3}$ tolerance on a unit interval.** $1/2^{9}=1.95\times10^{-3} > 10^{-3}$. The iteration count is rounded **up**.
- **Trying to evaluate $f$ at a root of the denominator.** For regula falsi the denominator $f(b)-f(a)$ is zero only when $f(a)=f(b)$, which is impossible under the sign-change requirement — but it *is* possible if you carry a roundoff-level $f(c)$ and wrongly consider it a root.

## See Also

- [[01_Error_Analysis,_Roundoff_and_Truncation]]
- [[03_Newton-Raphson_and_Secant]]
- [[08_Rolle’s_and_Mean_Value_Theorems]]

---

[[01_Error_Analysis,_Roundoff_and_Truncation|⬅ 01]] · [[_MOC_Numerical_Methods_and_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Newton-Raphson_and_Secant|03 ➡]]
