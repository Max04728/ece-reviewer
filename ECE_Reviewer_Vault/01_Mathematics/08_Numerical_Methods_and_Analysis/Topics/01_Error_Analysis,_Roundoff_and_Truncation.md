---
id: MATH-08-01
title: "Error Analysis, Roundoff and Truncation"
part: "01_Mathematics"
area: "08_Numerical_Methods_and_Analysis"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Taylor_and_Maclaurin_Series]]"]
tags: ["ece", "mathematics", "numerical_methods_and_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Error Analysis, Roundoff and Truncation

> [!abstract] Scope
> Quantify numerical error, separate roundoff from truncation, and choose a stopping rule that is defensible on an exam.

## Core Concept

> [!tip] Intuition
> Every numerical answer is wrong by construction. Error analysis tells you *which* wrongness dominates — the finite step you chose (truncation) or the finite digits your machine keeps (roundoff) — and when shrinking the step stops helping.

**Two ways to report an error.** The *true error* is the signed difference:
$$E_t = x_{\mathrm{true}} - x_{\mathrm{approx}}$$
The *relative error* divides by the true value, $\varepsilon_t = E_t / x_{\mathrm{true}}$, and is what examiners ask for because it is scale-free. Use the absolute value when the sign is irrelevant. A relative error of $0.05\%$ is an answer; an absolute error of $0.001$ is not, because $0.001$ on $1.0$ is $0.1\%$ but $0.001$ on $0.01$ is $10\%$.

**Roundoff error comes from the machine.** Binary floating point cannot store most decimals exactly ($0.1$ is a repeating fraction in base 2), so each stored value already carries an error of order the machine epsilon, $\varepsilon_m\approx 2.22\times10^{-16}$ in double precision, $\approx 1.19\times10^{-7}$ in single. Every arithmetic operation adds a little more. Roundoff is *not* reduced by making $h$ smaller — it is amplified.

**Truncation error comes from the mathematics you threw away.** A Taylor series is cut after a few terms, a derivative is replaced by a difference quotient, an integral by a strip sum. The leading discarded term is the truncation error, and for the standard schemes it scales as a power of the step: forward difference $O(h)$, trapezoidal rule $O(h^2)$, Simpson's rule $O(h^4)$, Euler's method $O(h)$ per step and $O(h)$ globally. Halving $h$ halves a first-order error and quarters a second-order one.

**Total error has a minimum.** Truncation falls as $h^{p}$ while roundoff grows roughly as $\varepsilon_m/h$ (differences of nearly equal numbers lose significant digits). Adding the two gives a U-shaped total error curve: there is an *optimal* step size, and driving $h$ below it makes the answer *worse*. This is why 'use a smaller step' is not a valid blanket answer.

**Catastrophic cancellation is the exam-relevant roundoff failure.** Subtracting two nearly equal numbers destroys significant digits. In double precision the smallest case shows why:
$$1.0000000000000002 - 1 = 2.2\times10^{-16}$$
The absolute error is unchanged while the relative error explodes. The fix is algebraic, not numerical. The rewritten form is:
$$\sqrt{x+1}-\sqrt{x} = 1/(\sqrt{x+1}+\sqrt{x})$$
rearranging the formula to avoid the subtraction works just as well. Numerical instability is a property of the *algorithm*, not of floating point itself.

**Choosing a stopping rule.** Since the true answer is unknown, iterations stop on an error estimate: either the step bound $|x_{n+1}-x_n|$ or the relative form:
$$\left|\frac{x_{n+1}-x_n}{x_{n+1}}\right|\times100\%$$
The second matters when the root is large or small. A stopping criterion is a claim about accuracy, so state it with the answer.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| True error | $E_t = x_{\mathrm{true}} - x_{\mathrm{approx}}$ | Signed. Needs the exact value, which in practice only exists for test problems. |
| Relative true error | $\varepsilon_t = \frac{x_{\mathrm{true}} - x_{\mathrm{approx}}}{x_{\mathrm{true}}}\times100\%$ | The exam answer form. Scale-free, so it is the only fair comparison across magnitudes. |
| Approximate percent relative error | $\varepsilon_a = \left\lvert \frac{x_{n+1}-x_n}{x_{n+1}}\right \rvert\times100\%$ | The practical stopping rule when x_true is unknown. Iterate until it falls below the tolerance. |
| Machine epsilon (double) | $\varepsilon_m \approx 2.22\times10^{-16}$ | Roughly 16 significant decimal digits. Single precision is about 1.19e-7 (7 digits). |
| Roundoff bound | $\lvert \delta x \rvert \approx \varepsilon_m \lvert x \rvert$ | Error already present in a stored value before any arithmetic is done. |
| Taylor truncation error | $f(x+h) = f(x) + f'(x)h + \frac{f''(\xi)}{2}h^{2}$ | The last term is the truncation error of a first-order approximation. Order h^2 with h. |
| Forward difference truncation | $f'(x) \approx \frac{f(x+h)-f(x)}{h} + O(h)$ | First-order accurate. Cancellation makes it unreliable for very small h. |
| Convergence order | $E_{n+1} \approx C\,E_n^{\,p}$ | p = 1 linear, p = 2 quadratic. Bisection p = 1; Newton-Raphson p = 2. |
| Significant digits retained | $\mathrm{digits\ lost} \approx \log_{10}\left(\frac{x}{x-y}\right)$ | For the cancellation x - y with x and y nearly equal. |

## Worked Problems

### P1. A computed value is $x_{\mathrm{approx}} = 3.142$ while the true value is $x_{\mathrm{true}} = \pi$. Find the true error and the relative true error.

**Given:** x_approx = 3.142; x_true = 3.14159265...

**Solution:**

1. True error: E_t = pi - 3.142 = 3.14159265 - 3.142 = -0.00040735
2. Magnitude: |E_t| = 4.0735e-4
3. Relative error: 4.0735e-4 / 3.14159265 = 1.2966e-4
4. As a percentage: 1.2966e-4 x 100% = 0.01297%

> [!success]- Answer
> **$E_t \approx -4.07\times10^{-4}$, relative error $\approx 0.0130\%$.**

> [!warning] Trap
> Dividing by the approximate value instead of the true value. Using 3.142 as the denominator gives 0.012961% — close here, but it is the wrong definition and costs the mark when the two differ appreciably.

### P2. A resistor is labelled $1000\ \Omega$ and measured as $1005\ \Omega$; a second is labelled $10\ \Omega$ and measured as $15\ \Omega$. Which measurement is more accurate?

**Given:** R1: true 1000, measured 1005; R2: true 10, measured 15

**Solution:**

1. R1 absolute error: 1005 - 1000 = 5 ohm; relative: 5/1000 = 0.005 = 0.5%
2. R2 absolute error: 15 - 10 = 5 ohm; relative: 5/10 = 0.5 = 50%
3. The absolute errors are identical but the relative errors differ by a factor of 100
4. Accuracy is judged by relative error

> [!success]- Answer
> **The $1000\ \Omega$ resistor (0.5% vs 50%).**

> [!warning] Trap
> Comparing absolute errors only. Both are off by 5 ohm, but 5 ohm on a 10 ohm nominal value is a 50% error — a defective part, not a good measurement.

### P3. Show that the quadratic formula loses precision for $x^{2} - 1000x + 1 = 0$, and give the numerically stable form of the small root.

**Given:** a = 1, b = -1000, c = 1

**Solution:**

1. Discriminant: b^2 - 4ac = 1000000 - 4 = 999996
2. sqrt(999996) = 999.997999... (only about 6 digits of the difference survive)
3. Small root by the textbook formula: (1000 - 999.997999)/2 = 0.0010005, computed from the difference of two nearly equal numbers
4. Stable form: x = 2c / (b + sqrt(b^2-4ac)) with b = -1000 gives 2(1)/(1000 + 999.997999) = 0.0010000...
5. The two forms agree to about 4 decimals but the second keeps full precision

> [!success]- Answer
> **Use $x_{\mathrm{small}} = \dfrac{2c}{-b+\sqrt{b^{2}-4ac}} = \dfrac{2}{1000+999.997999} \approx 0.0010000$.**

> [!warning] Trap
> Treating the unstable form as wrong. It is not wrong, it is *ill-conditioned*: the subtraction 1000 - 999.997999 cancels the leading digits, so the answer is only good to the digits that survived.

### P4. The forward-difference approximation $f'(x) \approx [f(x+h)-f(x)]/h$ is applied to $f(x)=e^{x}$ at $x=1$ with $h=0.1$, $h=0.01$ and $h=10^{-8}$. Explain what happens to the error.

**Given:** f(x) = e^x; f'(1) = e = 2.718281828

**Solution:**

1. h = 0.1: [e^1.1 - e^1]/0.1 = [3.004166 - 2.718282]/0.1 = 2.858842, error = +0.140560 (5.17%)
2. h = 0.01: [2.745601 - 2.718282]/0.01 = 2.731919, error = +0.013637 (0.50%)
3. The error fell by about a factor of 10 when h fell by 10 -> first-order (O(h)) truncation
4. h = 1e-8: e^(1+1e-8) and e^1 agree to about 16 digits, so their difference is mostly roundoff noise; the result is erratic and typically correct to only 2-3 digits
5. Total error = truncation (falls with h) + roundoff (grows with 1/h), so there is an optimum h, near sqrt(eps_m) ~ 1e-8 for this formula

> [!success]- Answer
> **Truncation dominates at $h=0.1$ and $0.01$ (error $\propto h$); at $h=10^{-8}$ roundoff from cancellation dominates and shrinking $h$ further makes it worse.**

> [!warning] Trap
> Claiming the $10^{-8}$ answer is the most accurate because the step is smallest. Below $h\approx\sqrt{\varepsilon_m}$ the subtraction cancels the significant digits and the error grows.

### P5. Bisection on $[2,3]$ is run until the absolute error is below $10^{-3}$. How many iterations are required, and what is the error bound after 6 iterations?

**Given:** a = 2; b = 3; tolerance = 1e-3

**Solution:**

1. Error bound after n halvings: |E_n| <= (b-a)/2^n = 1/2^n
2. Solve 1/2^n <= 1e-3  ->  2^n >= 1000
3. n >= log10(1000)/log10(2) = 3/0.30103 = 9.97, so n = 10 iterations
4. After 6 iterations the bound is 1/2^6 = 1/64 = 0.015625
5. The half-width is the classic bisection error bound; it never uses f at all

> [!success]- Answer
> **$n = 10$ iterations for $10^{-3}$; after 6 iterations the bound is $0.0156$.**

> [!warning] Trap
> Using the width $1/2^{n}$ as the error instead of the half-width $1/2^{n+1}$ — or forgetting to round the iteration count up. 9 iterations gives 1/512 = 0.00195, which fails the tolerance.

## Traps & Exam Notes

- **Dividing by the approximate value in the relative error.** The definition uses $x_{\mathrm{true}}$. Only when the error is tiny do the two agree; a marker checking the denominator will see the substitution.
- **Believing 'smaller step = better answer'.** Truncation falls with $h$, roundoff rises as $1/h$. Below the optimum ($h\approx\sqrt{\varepsilon_m}\approx10^{-8}$ for a forward difference) the answer degrades.
- **Not converting a relative error to a percentage.** A tolerance stated as `0.001` means 0.1%, not 0.001%. The two differ by a factor of 100.
- **Calling an unstable formula wrong.** The quadratic-formula subtraction $1000-999.997999$ is exact arithmetic — the loss is from cancellation of significant digits. Recognise it and rewrite the expression.
- **Confusing roundoff with truncation.** Roundoff grows when you shrink $h$; truncation shrinks. If the error curve turned upward as $h$ decreased, you were seeing roundoff.
- **Reporting more digits than the error justifies.** If the relative error is 0.5%, an answer of 2.858842 claims 7 correct digits. Report 2.86.

## See Also

- [[02_Bisection_and_Regula_Falsi]]
- [[03_Newton-Raphson_and_Secant]]
- [[06_Truncation_Error_and_Approximation]]
- [[07_Differentials_and_Error_Propagation]]

---

⬅ *start* · [[_MOC_Numerical_Methods_and_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Bisection_and_Regula_Falsi|02 ➡]]
