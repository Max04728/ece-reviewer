---
id: MATH-04-01
title: "Complex Numbers, Euler and De Moivre"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: []
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Complex Numbers, Euler and De Moivre

> [!abstract] Scope
> Convert between rectangular, polar and exponential form, and use Euler's formula and De Moivre's theorem to compute powers and all $n$ roots.

## Core Concept

> [!tip] Intuition
> Multiplying complex numbers in polar form is a rotate-and-scale: the magnitudes multiply and the angles add. Euler's formula packages that rotation as a single exponential, which is why powers and roots collapse to one multiplication or one division of the argument.

**Rectangular form is for adding; polar form is for multiplying.** A complex number is $z = x + jy$ with $j = \sqrt{-1}$, so $j^2 = -1$. Addition is componentwise, so rectangular form wins there. Multiplication in rectangular form forces you to expand and collect terms with $j^2 = -1$; in polar form $z = r(\cos\theta + j\sin\theta)$ it is one line. This split is the whole reason the topic exists: choose the form that matches the operation the problem asks for.

**Modulus, argument, and the quadrant trap.** $r = |z| = \sqrt{x^2 + y^2}$ is always non-negative, and $\theta = \arg z$ satisfies $\tan\theta = y/x$ but is *not* simply $\arctan(y/x)$. A calculator's arctan returns a value in $(-90^\circ, 90^\circ)$, so for $z$ in quadrants II or III you must add $180^\circ$ (or $\pi$). The principal argument is normally taken in $(-\pi, \pi]$, while engineering texts often use $[0^\circ, 360^\circ)$; both are the same set of numbers, but a problem that asks for the principal value wants the former.

**Euler's formula turns rotation into exponentiation.** $e^{j\theta} = \cos\theta + j\sin\theta$, obtained by substituting $j\theta$ into the Maclaurin series for $e^{x}$ and separating real and imaginary parts using the series for $\cos$ and $\sin$. It gives the exponential form $z = re^{j\theta}$ and the two product rules that matter. The product rule is:
$$z_1 z_2 = r_1 r_2 e^{j(\theta_1 + \theta_2)}$$
The quotient rule is:
$$z_1/z_2 = (r_1/r_2)e^{j(\theta_1 - \theta_2)}$$
A useful consequence is that $|z_1 z_2| = |z_1||z_2|$ — magnitudes factor through products and quotients but **not** through sums.

**De Moivre: powers by one multiplication, roots by one division plus $2\pi k$.** $(re^{j\theta})^n = r^n e^{jn\theta}$ for integer $n$, so $n$ never appears inside a trigonometric argument you have to expand. For roots, exponentiation by $1/n$ is *multi-valued* because $\theta$ and $\theta + 2\pi k$ describe the same number: $z^{1/n}$ has exactly $n$ distinct values $r^{1/n}e^{j(\theta + 2\pi k)/n}$, $k = 0, 1, \dots, n-1$, equally spaced by $2\pi/n$. Failures are predictable: the principal root alone is only one answer, the method does not extend to non-integer powers of negative reals without a branch cut, and the integer exponent must be an actual integer — $n = 1/2$ has to be handled as a root, not as De Moivre with a fractional power.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Rectangular form | $z = x + jy,\qquad j^2 = -1$ | Use for addition, subtraction and conjugate work. |
| Modulus | $r = \lvert z \rvert = \sqrt{x^2 + y^2}$ | Always non-negative; it is the distance from the origin. |
| Argument (all quadrants) | $\theta = \arctan\!\left(\frac{y}{x}\right) \mathrm{\ adjusted\ by\ } \pm 180^\circ \mathrm{\ for\ } x<0$ | A blind arctan gives the wrong quadrant; check the sign of x. |
| Polar form | $z = r(\cos\theta + j\sin\theta) = r\,\angle\,\theta$ | The $r\,\angle\,\theta$ shorthand is engineering notation, not a product. |
| Euler's formula | $e^{j\theta} = \cos\theta + j\sin\theta$ | $\theta$ in radians inside the exponential; degrees are only a display unit. |
| Exponential form | $z = re^{j\theta}$ | Best form for products, quotients, powers and roots. |
| Product | $z_1z_2 = r_1r_2\,e^{j(\theta_1+\theta_2)}$ | Magnitudes multiply, arguments add — never add the moduli. |
| Quotient | $\frac{z_1}{z_2} = \frac{r_1}{r_2}\,e^{j(\theta_1-\theta_2)}$ | The angle is $\theta_1-\theta_2$, not $\theta_2-\theta_1$. |
| De Moivre (power) | $(re^{j\theta})^n = r^n e^{jn\theta}$ | Integer n only; normalise $n\theta$ afterwards. |
| n-th roots | $z_k = r^{1/n}e^{j(\theta+2\pi k)/n},\quad k = 0,1,\dots,n-1$ | Exactly n distinct roots, spaced $360^\circ/n$ apart. |
| Reciprocal | $\frac{1}{z} = \frac{\bar z}{\lvert z \rvert^2} = \frac{1}{r}e^{-j\theta}$ | Fails only at $z = 0$. |
| Modulus of a product | $\lvert z_1z_2 \rvert = \lvert z_1 \rvert\,\lvert z_2 \rvert$ | Does NOT hold for sums: $\|z_1+z_2\| \neq \|z_1\|+\|z_2\|$ in general. |

## Interactive Widget

**Complex Roots Visualizer**

![[Complex_Roots_Visualizer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Express $z = -1 + j\sqrt{3}$ in polar and exponential form, giving the principal argument.

**Given:** x = -1; y = \sqrt{3}

**Solution:**

1. $r = \sqrt{(-1)^2 + (\sqrt{3})^2} = \sqrt{1+3} = 2$
2. $x < 0$ so $z$ is in quadrant II: $\theta = 180^\circ - \arctan\!\left(\frac{\sqrt{3}}{1}\right) = 180^\circ - 60^\circ = 120^\circ$
3. $120^\circ = \frac{2\pi}{3}$ rad
4. $z = 2(\cos 120^\circ + j\sin 120^\circ) = 2\,\angle\,120^\circ = 2e^{j2\pi/3}$

> [!success]- Answer
> **$z = 2\,\angle\,120^\circ = 2e^{j2\pi/3}$**

> [!warning] Trap
> Computing $\arctan(\sqrt{3}/(-1)) = -60^\circ$ on the calculator and reporting $-60^\circ$. That is the quadrant IV angle; the correct argument for $x<0$ is $-60^\circ + 180^\circ = 120^\circ$. The modulus is right either way, so only the answer's angle is wrong.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `MODE` `2` in degrees: `SHIFT` `Pol(` `-1` `,` `√3` `)` `=` → $r$ = **2** (held in `X`), $\theta$ = **120** (held in `Y`) — the quadrant comes out right with no adjustment.
> 2. `Y` `×` `π` `÷` `180` `=` → **2.0944** rad, so $z = 2\angle 120^\circ = 2e^{j2\pi/3}$.
>
> `Pol(` returns the four-quadrant angle; `tan^-1(√3 ÷ -1)` returns **-60**, the quadrant-IV value the trap describes.

### P2. Evaluate $(1+j)^{10}$ in rectangular form.

**Given:** z = 1 + j; n = 10

**Solution:**

1. $r = \sqrt{1^2+1^2} = \sqrt{2}$, $\theta = \arctan(1) = 45^\circ$
2. De Moivre: $(1+j)^{10} = (\sqrt{2})^{10}\,e^{j(10 \cdot 45^\circ)}$
3. $(\sqrt{2})^{10} = 2^{5} = 32$
4. $10 \times 45^\circ = 450^\circ$, and $450^\circ - 360^\circ = 90^\circ$
5. $32\,\angle\,90^\circ = 32(\cos 90^\circ + j\sin 90^\circ) = j32$

> [!success]- Answer
> **$(1+j)^{10} = j32$**

> [!warning] Trap
> Leaving the angle as $450^\circ$ and then evaluating $\cos 450^\circ$ in a calculator set to radians, which returns $\cos(450\,\mathrm{rad})$. Reduce the angle modulo $360^\circ$ first, then convert.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `MODE` `2`: `(1+j)^10` `=` → **0 + 32j** in `▶a+bi` display.
> 2. Modulus cross-check: `(√2)^10` `=` → **32**, and the angle wrap $10\times 45^\circ = 450^\circ$ is handled internally as $90^\circ$.
>
> The power is exact in CPLX; the $450^\circ$ reduction that a radian-mode `cos(450)` ruins never enters.

### P3. Find all cube roots of $8$ and plot them conceptually on the unit-radius-$2$ circle.

**Given:** z = 8 = 8\,\angle\,0^\circ; n = 3

**Solution:**

1. $r = 8$ and $\theta = 0^\circ$, so $r^{1/3} = 2$
2. $z_k = 2\,e^{j(0 + 2\pi k)/3}$ for $k = 0,1,2$
3. $k=0$: $2\,\angle\,0^\circ = 2$
4. $k=1$: $2\,\angle\,120^\circ = -1 + j\sqrt{3}$
5. $k=2$: $2\,\angle\,240^\circ = -1 - j\sqrt{3}$

> [!success]- Answer
> **$2$, $-1+j\sqrt{3}$, $-1-j\sqrt{3}$**

> [!warning] Trap
> Reporting only the principal root $2$. An $n$-th root question wants all $n$ values; a cubic has three roots and the exam answer is incomplete without the two at $120^\circ$ and $240^\circ$.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `8^(1÷3)` `=` → **2** — the principal root only, which is exactly the incomplete answer.
> 2. `2∠120` `=` → **-1 + 1.7321j**, then `2∠240` `=` → **-1 - 1.7321j** (the `∠` key takes $r\angle\theta$ and returns $a+bj$).
>
> The three roots are $2\angle 0^\circ, 2\angle 120^\circ, 2\angle 240^\circ$; `8^(1÷3)` alone shows only the first.

### P4. Given $z_1 = 3\,\angle\,40^\circ$ and $z_2 = 2\,\angle\,15^\circ$, find $z_1z_2$ and $z_1/z_2$.

**Given:** r_1 = 3; \theta_1 = 40^\circ; r_2 = 2; \theta_2 = 15^\circ

**Solution:**

1. $z_1z_2 = (3)(2)\,\angle\,(40^\circ + 15^\circ) = 6\,\angle\,55^\circ$
2. $z_1/z_2 = (3/2)\,\angle\,(40^\circ - 15^\circ) = 1.5\,\angle\,25^\circ$
3. Check the modulus rules: $|z_1z_2| = 3 \cdot 2 = 6$ and $|z_1/z_2| = 3/2 = 1.5$

> [!success]- Answer
> **$z_1z_2 = 6\,\angle\,55^\circ$ and $z_1/z_2 = 1.5\,\angle\,25^\circ$**

> [!warning] Trap
> Adding the moduli ($3+2 = 5$) or subtracting the quotient's angles the wrong way round ($15^\circ - 40^\circ = -25^\circ$). Magnitudes multiply/divide; the quotient angle is numerator minus denominator.

### P5. Simplify $\dfrac{1+j}{1-j}$.

**Given:** numerator $1+j$; denominator $1-j$

**Solution:**

1. Polar route: $1+j = \sqrt{2}\,\angle\,45^\circ$ and $1-j = \sqrt{2}\,\angle\,-45^\circ$
2. Quotient: $\dfrac{\sqrt{2}}{\sqrt{2}}\,\angle\,(45^\circ - (-45^\circ)) = 1\,\angle\,90^\circ$
3. Algebraic check: multiply top and bottom by the conjugate $(1+j)$: $\dfrac{(1+j)^2}{(1-j)(1+j)} = \dfrac{1+2j+j^2}{1-j^2} = \dfrac{2j}{2} = j$

> [!success]- Answer
> **$\dfrac{1+j}{1-j} = j$**

> [!warning] Trap
> Expanding $(1+j)^2$ as $1 + j^2 = 0$ and dropping the cross term $2j$. The cross term is the whole answer here — $(a+b)^2 = a^2 + 2ab + b^2$ even when $b$ is imaginary.

## Traps & Exam Notes

- **Blind arctan loses the quadrant.** For $z = -1+j\sqrt{3}$, $\arctan(y/x) = -60^\circ$ but the argument is $120^\circ$. Always inspect the signs of $x$ and $y$ and add $\pm 180^\circ$ when $x<0$.
- **Reporting only the principal $n$-th root.** $z^{1/n}$ has $n$ distinct values spaced $360^\circ/n$ apart. A cube-root question answered with one number is costing you two marks.
- **Mixing degrees and radians inside Euler's formula.** $e^{j45}$ means $45$ *radians*. Convert to radians before the exponential form, or keep the angle in degrees but use $\cos/\sin$ in degree mode consistently.
- **Adding moduli.** $|z_1+z_2| \neq |z_1|+|z_2|$: for $z_1 = 1$ and $z_2 = j$, $|1+j| = \sqrt{2}$, not $2$. Only products, quotients, powers and roots factor.
- **Sign slip in the quotient argument.** $\arg(z_1/z_2) = \theta_1 - \theta_2$. Writing $\theta_2-\theta_1$ gives the reciprocal's angle and flips the real/imaginary parts.
- **De Moivre applied to a non-integer power.** $(re^{j\theta})^{1/2}$ by halving the angle returns only the principal root; the other root at $\theta/2 + 180^\circ$ is missed.
- **Forgetting to reduce the power angle.** $n\theta$ can exceed $360^\circ$; an unreduced angle feeds a radian-mode calculator a value that has no relation to the intended direction.

## See Also

- [[02_Cauchy-Riemann_and_Analytic_Functions]]
- [[13_Fourier_Transform_Properties]]
- [[11_Fourier_Series_Trigonometric_and_Exponential]]
- [[05_Taylor_and_Maclaurin_Series]]

---

⬅ *start* · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Cauchy-Riemann_and_Analytic_Functions|02 ➡]]
