---
id: MATH-04-02
title: "Cauchy-Riemann and Analytic Functions"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Complex_Numbers,_Euler_and_De_Moivre]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Cauchy-Riemann and Analytic Functions

> [!abstract] Scope
> Test differentiability and analyticity of a complex function with the Cauchy–Riemann equations, and construct the harmonic conjugate of a given harmonic function.

## Core Concept

> [!tip] Intuition
> Analyticity is a much stronger demand than real differentiability: the derivative must be the same no matter which direction you approach the point from. Letting the real and imaginary directions agree produces the Cauchy–Riemann pair.

**What the CR equations actually say.** Write $f(z) = u(x,y) + jv(x,y)$ with $z = x+jy$. The derivative is:
$$f'(z) = \lim_{\Delta z \to 0}\frac{f(z+\Delta z)-f(z)}{\Delta z}$$
It must give the same value for every direction of approach. Approaching along the real axis and along the imaginary axis and equating real and imaginary parts gives $u_x = v_y$ and $u_y = -v_x$. These two equations are the *only* content of complex differentiability — everything else in the topic is bookkeeping on top of them.

**Differentiable at a point is not the same as analytic.** $f$ is analytic (holomorphic) at $z_0$ if it is differentiable at $z_0$ *and at every point of some open disk around* $z_0$. The CR equations with continuous partials are sufficient for differentiability at a point, but a function that satisfies CR only along a curve, or only at an isolated point, is differentiable there and analytic nowhere. This distinction is the single most examined subtlety: $f(z) = x^2 + jy^2$ satisfies CR on the line $y = x$, so it is differentiable on that line, yet it is analytic nowhere because no open disk lies inside the line.

**Harmonic functions and conjugates.** If $f = u+jv$ is analytic, then both $u$ and $v$ satisfy Laplace's equation $u_{xx}+u_{yy}=0$; such functions are called harmonic. Given a harmonic $u$, its harmonic conjugate $v$ is recovered by integrating $v_y = u_x$ with respect to $y$ and then fixing the arbitrary function of $x$ by imposing $v_x = -u_y$. The conjugate is unique only up to an additive real constant, which is exactly why the answer carries a $+C$ and why $f(z)$ is determined up to $jC$.

**When the machinery fails.** The CR equations are necessary but not sufficient on their own — without continuity of the four partials you can construct a function that satisfies CR at the origin and is still not differentiable there. They also say nothing about $\bar z$-type functions: $f(z) = \bar z$ satisfies $u_x = 1$, $v_y = -1$, so CR fails everywhere and the function is nowhere differentiable. And on domains with holes the conjugate can fail to be single-valued, which is why $\ln z$ and $z^{1/2}$ need branch cuts.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Decomposition | $f(z) = u(x,y) + j\,v(x,y),\qquad z = x + jy$ | $u$ and $v$ are real-valued functions of two real variables. |
| Cauchy–Riemann equations | $u_x = v_y,\qquad u_y = -v_x$ | For the $f = u+jv$ convention. The conjugate convention $f = u-jv$ flips the second sign. |
| Derivative from CR | $f'(z) = u_x + j\,v_x = v_y - j\,u_y$ | Both forms are equal once CR holds; use whichever partials are easier. |
| Sufficient condition | $u,v \mathrm{\ have\ continuous\ partials\ and\ satisfy\ CR} \Rightarrow f \mathrm{\ analytic}$ | Continuity of the partials is part of the hypothesis, not decoration. |
| Laplace's equation | $u_{xx} + u_{yy} = 0,\qquad v_{xx} + v_{yy} = 0$ | Satisfied by any harmonic function; a fast necessary test. |
| Harmonic conjugate | $v_y = u_x,\qquad v_x = -u_y$ | Integrate $v_y$ in $y$, then differentiate in $x$ to fix the arbitrary function of $x$. |
| Polar CR equations | $u_r = \frac{1}{r}v_\theta,\qquad v_r = -\frac{1}{r}u_\theta$ | Use for functions written in $r,\theta$ such as $\ln z$ or $z^{n}$. |
| Analyticity of $z^n$ | $f(z) = z^n \mathrm{\ is\ entire}, \qquad f'(z) = nz^{n-1}$ | Entire = analytic on the whole plane. Holds for every non-negative integer n. |
| Analyticity of $1/z$ | $f(z) = \frac{1}{z} \mathrm{\ analytic\ for\ } z \neq 0, \qquad f'(z) = -\frac{1}{z^2}$ | The domain excludes the pole; analyticity is always a statement about a domain. |
| Analyticity of $e^z$ | $e^z = e^x(\cos y + j\sin y),\qquad \left\lvert e^{z}\right \rvert = e^{x}$ | Entire. Note $\|e^z\|$ depends only on $x = \mathrm{Re}\,z$. |

## Worked Problems

### P1. Verify that $f(z) = z^2$ is entire and find $f'(z)$ from the CR equations.

**Given:** z = x + jy; f(z) = z^2

**Solution:**

1. $z^2 = (x+jy)^2 = x^2 - y^2 + j\,2xy$, so $u = x^2-y^2$ and $v = 2xy$
2. $u_x = 2x$ and $v_y = 2x$ — the first CR equation holds for all $(x,y)$
3. $u_y = -2y$ and $v_x = 2y$, so $u_y = -v_x$ — the second CR equation holds
4. The partials are polynomials, hence continuous everywhere, so $f$ is entire
5. $f'(z) = u_x + jv_x = 2x + j2y = 2z$

> [!success]- Answer
> **$f$ is entire and $f'(z) = 2z$.**

> [!warning] Trap
> Differentiating in $z$ and 'verifying' the result with CR, then writing $f'(z) = u_x + ju_y = 2x - j2y$. The imaginary part of the derivative is $v_x$, and $v_x = -u_y$ by CR.

### P2. Show that $f(z) = \bar z = x - jy$ is nowhere differentiable.

**Given:** u = x; v = -y

**Solution:**

1. $u_x = 1$ and $v_y = -1$
2. The first CR equation requires $u_x = v_y$, i.e. $1 = -1$, which is false
3. Since the equations fail at every point, $f$ is differentiable nowhere and analytic nowhere
4. Direction check: along the real axis $f'(z) = 1$, along the imaginary axis $f'(z) = -1$ — the limit depends on the path

> [!success]- Answer
> **Nowhere differentiable; CR fails everywhere.**

> [!warning] Trap
> Assuming $\bar z$ is analytic because it is a simple algebraic expression in $z$. Conjugation is not expressible as a power series in $z$, so it is the standard counterexample; only $z$, constants, and combinations built from them are analytic.

### P3. Show that $u(x,y) = x^2 - y^2$ is harmonic and find its harmonic conjugate $v$.

**Given:** u = x^2 - y^2

**Solution:**

1. $u_x = 2x$, $u_{xx} = 2$; $u_y = -2y$, $u_{yy} = -2$
2. $u_{xx}+u_{yy} = 2 - 2 = 0$, so $u$ is harmonic
3. Integrate $v_y = u_x = 2x$ in $y$: $v = 2xy + g(x)$
4. Impose $v_x = -u_y$: $v_x = 2y + g'(x)$ must equal $2y$, so $g'(x) = 0$ and $g(x) = C$
5. $v = 2xy + C$, giving $f(z) = (x^2-y^2) + j(2xy+C) = z^2 + jC$

> [!success]- Answer
> **$v = 2xy + C$ (so $f(z) = z^2 + jC$)**

> [!warning] Trap
> Dropping the arbitrary constant or, worse, the arbitrary function $g(x)$ before differentiating. Setting $v = 2xy$ and stopping is only correct because $g'$ happens to vanish here; in general $g(x)$ is not constant.

### P4. Determine where $f(z) = x^2 + jy^2$ is differentiable and whether it is analytic anywhere.

**Given:** u = x^2; v = y^2

**Solution:**

1. $u_x = 2x$, $v_y = 2y$; the first CR equation needs $2x = 2y$, i.e. $y = x$
2. $u_y = 0$ and $v_x = 0$, so the second CR equation holds everywhere
3. Both equations hold only on the line $y = x$
4. Every point of that line has no open disk contained in it, so $f$ is analytic nowhere
5. $f$ is differentiable at each point of the line $y = x$, where $f'(z) = u_x + jv_x = 2x$

> [!success]- Answer
> **Differentiable on the line $y = x$; analytic nowhere.**

> [!warning] Trap
> Answering 'analytic on the line $y=x$'. Analyticity requires an open neighbourhood, and a line has empty interior. CR satisfied on a curve (or at a single point) never yields analyticity.

### P5. Verify that $f(z) = e^z$ is entire and find its derivative.

**Given:** e^z = e^x(\cos y + j\sin y)

**Solution:**

1. $u = e^x\cos y$ and $v = e^x\sin y$
2. $u_x = e^x\cos y$ and $v_y = e^x\cos y$ — first CR equation holds
3. $u_y = -e^x\sin y$ and $v_x = e^x\sin y$, so $u_y = -v_x$ — second CR equation holds
4. All four partials are continuous everywhere, so $f$ is entire
5. $f'(z) = u_x + jv_x = e^x\cos y + je^x\sin y = e^z$

> [!success]- Answer
> **$f$ is entire and $f'(z) = e^z$.**

> [!warning] Trap
> Treating $e^z$ as a real exponential and asserting its derivative without checking the CR pair, or writing $|e^z| = e^{|z|}$. The modulus is $e^{x}$, which depends only on the real part.

## Traps & Exam Notes

- **Differentiable $\neq$ analytic.** $f(z) = x^2+jy^2$ satisfies CR on the line $y=x$ but is analytic nowhere, because analyticity needs differentiability on an open disk. Any answer of the form 'analytic on the line/at the point' is wrong.
- **CR alone is not sufficient.** The standard sufficiency theorem also requires the four partials to be continuous. A function can satisfy CR at an isolated point and still have no derivative there.
- **Sign error in the second CR equation.** For $f = u+jv$ it is $u_y = -v_x$. Writing $u_y = v_x$ is the $f = u-jv$ convention and silently reverses every conclusion.
- **Wrong imaginary part in the derivative.** $f'(z) = u_x + jv_x$, and only because of CR does this equal $v_y - ju_y$. Writing $u_x + ju_y$ gives the conjugate of the correct derivative.
- **Forgetting the arbitrary function in the conjugate.** Integrating $v_y = u_x$ in $y$ leaves an unknown $g(x)$. Determine it by imposing $v_x = -u_y$; dropping it loses the $+C$ and can lose a genuine $x$-term.
- **Declaring a function analytic on its whole formula.** Analyticity is always relative to a domain: $1/z$ is analytic on $\mathbb{C}\setminus\{0\}$, not at $z=0$; $\ln z$ needs a branch cut.
- **Testing harmonicity with the wrong second derivatives.** Harmonicity is $u_{xx}+u_{yy}=0$ with both derivatives taken in the *same* variable pair — mixing $u_{xx}$ with $u_{xy}$ is a common slip.

## See Also

- [[01_Complex_Numbers,_Euler_and_De_Moivre]]
- [[13_Fourier_Transform_Properties]]
- [[06_Partial_Fractions]]

---

[[01_Complex_Numbers,_Euler_and_De_Moivre|⬅ 01]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Sequences_and_Convergence_Tests|03 ➡]]
