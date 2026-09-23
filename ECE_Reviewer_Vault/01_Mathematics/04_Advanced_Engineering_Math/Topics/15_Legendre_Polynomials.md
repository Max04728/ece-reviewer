---
id: MATH-04-15
title: "Legendre Polynomials"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 15
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Taylor_and_Maclaurin_Series]]", "[[03_Sequences_and_Convergence_Tests]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 15 — Legendre Polynomials

> [!abstract] Scope
> Expand a function on the interval from minus one to one in Legendre polynomials and generate any order from the recurrence or Rodrigues formula.

## Core Concept

> [!tip] Intuition
> Legendre polynomials are the sines and cosines of the sphere: separating Laplace's equation with axisymmetry leaves an oscillation in the polar angle whose shape is fixed by requiring the potential to stay finite on the axis.

**The equation and why only one solution survives.** With $x = \cos\theta$, separating Laplace's equation in spherical coordinates for an azimuth-independent potential leaves $(1-x^{2})y'' - 2xy' + n(n+1)y = 0$, whose independent solutions are $P_n(x)$, finite on the closed interval, and $Q_n(x)$, which diverges logarithmically at $x = \pm 1$. The parameter is the product $n(n+1)$, not $n^{2}$ — that product is what makes the equation self-adjoint with weight 1 and what makes the eigenvalues come out as the integers. Since $x = \pm 1$ are the positive and negative $z$-axis, and a physical potential is finite on the axis, every full-sphere or exterior problem sets the $Q_n$ coefficient to zero. $Q_n$ returns only when the domain excludes the axis, as between two coaxial cones.

**Rodrigues, the explicit polynomials, and the recurrence.** Rodrigues' formula is:
$$P_n(x) = \frac{1}{2^{n}n!}\frac{d^{n}}{dx^{n}}(x^{2}-1)^{n}$$
It generates every order and is the reliable fallback when a polynomial is misremembered; the normalisation $P_n(1) = 1$ and $P_n(-1) = (-1)^{n}$ is the one-line test on the result. The first five are $P_0 = 1$, $P_1 = x$, $P_2 = \frac{1}{2}(3x^{2}-1)$, $P_3 = \frac{1}{2}(5x^{3}-3x)$ and $P_4 = \frac{1}{8}(35x^{4}-30x^{2}+3)$; each has degree $n$ and the parity of $n$. For higher orders, $(n+1)P_{n+1} = (2n+1)xP_n - nP_{n-1}$ climbs two orders at a time, which is faster and less error-prone than differentiating $(x^{2}-1)^{n}$ four or five times. The generating function is:
$$\frac{1}{\sqrt{1-2xt+t^{2}}} = \sum P_n(x)t^{n}$$
That is where the polynomials come from physically: with $t = d/r$ it produces the multipole expansion of the kernel:
$$\frac{1}{\lvert\mathbf{r}-\mathbf{d}\rvert}$$
so $P_0$ is the monopole, $P_1$ the dipole and so on.

**Orthogonality makes the expansion trivial, and parity halves it.** On $[-1,1]$ the polynomials satisfy $\int_{-1}^{1}P_mP_n\,dx = 0$ for $m\neq n$ and $\frac{2}{2n+1}$ for $m = n$, with weight 1 in $x$ because the $\sin\theta$ of the spherical volume element is already absorbed by the substitution $x = \cos\theta$. Projecting $f = \sum a_nP_n$ onto $P_n$ therefore gives the coefficient:
$$a_n = \frac{2n+1}{2}\int_{-1}^{1}fP_n\,dx$$
The $(2n+1)/2$ is exactly the reciprocal of the norm. Parity then does real work: an even $f$ has every odd $a_n$ zero and an odd $f$ has every even $a_n$ zero, so expanding $x^{2}$ needs only $a_0$ and $a_2$ and expanding $x^{3}$ needs only $a_1$ and $a_3$. Because any polynomial of degree $N$ has an exact finite Legendre expansion, these problems have no truncation error — unlike a Taylor series, the finite sum is exact.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Legendre's equation | $\left(1-x^{2}\right)y'' - 2xy' + n(n+1)y = 0$ | The parameter is $n(n+1)$, never $n^{2}$; $x = \cos\theta$ and $n$ is a non-negative integer for the polynomial solutions. |
| Rodrigues' formula | $P_n(x) = \frac{1}{2^{n}n!}\,\frac{d^{n}}{dx^{n}}\left(x^{2}-1\right)^{n}$ | The $2^{n}n!$ is essential; dropping it scales the polynomial by up to 48 at $n = 3$, which $P_n(1)=1$ exposes. |
| Orders 0 and 1 | $P_0(x) = 1,\qquad P_1(x) = x$ | Normalised so that $P_n(1) = 1$ for every $n$. |
| Order 2 | $P_2(x) = \frac{1}{2}\left(3x^{2}-1\right)$ | Even in $x$; $P_2(0) = -\frac{1}{2}$, and it is the quadrupole shape in the multipole expansion. |
| Order 3 | $P_3(x) = \frac{1}{2}\left(5x^{3}-3x\right)$ | Odd in $x$; $P_3(1) = 1$ and $P_3(-1) = -1$, as parity requires. |
| Order 4 | $P_4(x) = \frac{1}{8}\left(35x^{4}-30x^{2}+3\right)$ | Even in $x$; worth quoting whenever a $x^{4}$ expansion appears. |
| Orthogonality and norm | $\int_{-1}^{1}P_m(x)P_n(x)\,dx = 0\ (m\neq n),\qquad = \frac{2}{2n+1}\ (m=n)$ | Weight 1 in $x$; the $\sin\theta$ factor is already absorbed by $x = \cos\theta$, unlike the Bessel case which carries weight $\rho$. |
| Expansion coefficients | $f(x) = \sum_{n=0}^{\infty}a_nP_n(x),\qquad a_n = \frac{2n+1}{2}\int_{-1}^{1}f(x)P_n(x)\,dx$ | The $(2n+1)/2$ is the reciprocal of the norm; a polynomial of degree $N$ has an exact finite expansion with $a_n = 0$ for $n>N$. |
| Three-term recurrence | $(n+1)P_{n+1}(x) = (2n+1)x\,P_n(x) - n\,P_{n-1}(x)$ | Generates the next order from the previous two; the multipliers are $(2n+1)x$ and $n$, and both $n$ terms must be present. |
| Generating function | $\frac{1}{\sqrt{1-2xt+t^{2}}} = \sum_{n=0}^{\infty}P_n(x)\,t^{n},\qquad \lvert t\rvert < 1$ | With $x = \cos\theta$ and $t = d/r$ this is the multipole expansion of $1/\lvert\mathbf{r}-\mathbf{d}\rvert$ for $r>d$. |
| Parity and endpoint values | $P_n(-x) = (-1)^{n}P_n(x),\qquad P_n(1) = 1,\qquad P_n(-1) = (-1)^{n}$ | Even $f$ keeps only even $n$, odd $f$ keeps only odd $n$; the endpoint values are the fastest check on a derived polynomial. |
| Second solution | $Q_n(x) = \frac{1}{2}P_n(x)\ln\frac{1+x}{1-x} - W_{n-1}(x)$ | Diverges at $x = \pm 1$ (the $z$-axis), so its coefficient is zero whenever the axis lies in the domain; retained only for conical or annular regions that exclude the axis. |

## Worked Problems

### P1. Expand $f(x) = x^{2}$ in Legendre polynomials on $[-1,1]$.

**Given:** f(x) = x^2; even function on [-1, 1]

**Solution:**

1. Parity: $x^{2}$ is even, so every odd coefficient vanishes; only $a_0$ and $a_2$ can be nonzero
2. $a_0 = \frac{1}{2}\int_{-1}^{1}x^{2}dx = \frac{1}{2}\cdot\frac{2}{3} = \frac{1}{3}$
3. $a_2 = \frac{5}{2}\int_{-1}^{1}x^{2}\cdot\frac{3x^{2}-1}{2}dx = \frac{5}{4}\int_{-1}^{1}\left(3x^{4}-x^{2}\right)dx$
4. $\int_{-1}^{1}3x^{4}dx = \frac{6}{5}$ and $\int_{-1}^{1}x^{2}dx = \frac{2}{3}$, so the bracket is $\frac{6}{5}-\frac{2}{3} = \frac{8}{15}$
5. $a_2 = \frac{5}{4}\cdot\frac{8}{15} = \frac{2}{3}$
6. $x^{2} = \frac{1}{3}P_0 + \frac{2}{3}P_2$; check: $\frac{1}{3} + \frac{2}{3}\cdot\frac{3x^{2}-1}{2} = \frac{1 + 3x^{2} - 1}{3} = x^{2}$

> [!success]- Answer
> **$x^{2} = \dfrac{1}{3}P_0(x) + \dfrac{2}{3}P_2(x) = \dfrac{1}{3} + \dfrac{1}{3}\left(3x^{2}-1\right)$**

> [!warning] Trap
> Using norm 1 instead of $\frac{2}{2n+1}$: that gives $a_2 = \int_{-1}^{1}x^{2}P_2dx = \frac{4}{15} = 0.2667$ instead of $\frac{2}{3} = 0.6667$, and the reconstructed polynomial becomes $\frac{1}{5} + \frac{2}{5}x^{2}$, which is $0.396$ at $x = 0.7$ where $x^{2} = 0.49$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. $a_0 = (1/2)\int_{-1}^{1}x^2dx$: `∫dx` `∫(X², -1, 1)` → **0.6666667**, `÷2` → **0.3333333** = $1/3$.
> 2. $a_2 = (5/4)\int_{-1}^{1}(3x^4-x^2)dx$: `∫dx` `∫(3X^4-X², -1, 1)` → **0.5333333**, `×5÷4` → **0.6666667** = $2/3$.
> 3. Odd coefficients: `∫(X³, -1, 1)` → **0** by parity, so $x^2 = (1/3)P_0 + (2/3)P_2$.
>
> The bare projection integral is $4/15$ = **0.2667**; the $(2n+1)/2 = 5/2$ factor is what turns it into $2/3$.

### P2. Expand $f(x) = x^{3}$ in Legendre polynomials on $[-1,1]$.

**Given:** f(x) = x^3; odd function on [-1, 1]

**Solution:**

1. Parity: $x^{3}$ is odd, so $a_0 = a_2 = 0$ and only $a_1$ and $a_3$ remain
2. $a_1 = \frac{3}{2}\int_{-1}^{1}x^{3}\cdot x\,dx = \frac{3}{2}\int_{-1}^{1}x^{4}dx = \frac{3}{2}\cdot\frac{2}{5} = \frac{3}{5}$
3. $a_3 = \frac{7}{2}\int_{-1}^{1}x^{3}\cdot\frac{5x^{3}-3x}{2}dx = \frac{7}{4}\int_{-1}^{1}\left(5x^{6}-3x^{4}\right)dx$
4. $\int_{-1}^{1}5x^{6}dx = \frac{10}{7}$ and $\int_{-1}^{1}3x^{4}dx = \frac{6}{5}$, so the bracket is $\frac{10}{7}-\frac{6}{5} = \frac{8}{35}$
5. $a_3 = \frac{7}{4}\cdot\frac{8}{35} = \frac{2}{5}$
6. $x^{3} = \frac{3}{5}P_1 + \frac{2}{5}P_3$; check: $\frac{3}{5}x + \frac{2}{5}\cdot\frac{5x^{3}-3x}{2} = \frac{3x + 5x^{3} - 3x}{5} = x^{3}$

> [!success]- Answer
> **$x^{3} = \dfrac{3}{5}P_1(x) + \dfrac{2}{5}P_3(x)$**

> [!warning] Trap
> Keeping $a_0$ or $a_2$ because the calculation was started without checking parity. Both integrals contain an odd power of $x$ and are exactly zero, so a nonzero numerical value there is always an arithmetic slip, not a real coefficient.

### P3. Evaluate $\int_{-1}^{1}P_2(x)P_3(x)\,dx$ and $\int_{-1}^{1}\left[P_3(x)\right]^{2}dx$ directly from the polynomials.

**Given:** P_2 = (3x^2-1)/2; P_3 = (5x^3-3x)/2

**Solution:**

1. $\int_{-1}^{1}P_2P_3\,dx = \frac{1}{4}\int_{-1}^{1}\left(3x^{2}-1\right)\left(5x^{3}-3x\right)dx = \frac{1}{4}\int_{-1}^{1}\left(15x^{5}-14x^{3}+3x\right)dx$
2. Every term is an odd power of $x$, so each integrates to zero over the symmetric interval: the integral is $0$, as orthogonality with $m\neq n$ requires
3. $\int_{-1}^{1}P_3^{2}dx = \frac{1}{4}\int_{-1}^{1}\left(25x^{6}-30x^{4}+9x^{2}\right)dx$
4. $= \frac{1}{4}\left[25\cdot\frac{2}{7} - 30\cdot\frac{2}{5} + 9\cdot\frac{2}{3}\right] = \frac{1}{4}\left[\frac{50}{7} - 12 + 6\right]$
5. $= \frac{1}{4}\left[\frac{50}{7} - 6\right] = \frac{1}{4}\cdot\frac{8}{7} = \frac{2}{7}$
6. The norm formula gives $\frac{2}{2(3)+1} = \frac{2}{7}$, confirming the direct integration

> [!success]- Answer
> **$\int_{-1}^{1}P_2P_3\,dx = 0$ and $\int_{-1}^{1}P_3^{2}dx = \dfrac{2}{7} = 0.2857$**

> [!warning] Trap
> Reporting the self-inner-product as zero because the cross term vanished. Orthogonality applies only to $m\neq n$; the $m = n$ integral equals $\frac{2}{2n+1} = \frac{2}{7}$, and this norm is exactly what divides the projection integral in the coefficient formula.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `∫dx` `∫(((3X²-1)÷2) × ((5X³-3X)÷2), -1, 1)` → **0** — every term is an odd power, as orthogonality requires for $m \neq n$.
> 2. `∫dx` `∫(((5X³-3X)÷2)², -1, 1)` → **0.2857143** = $2/7$, matching $2/(2n+1)$ at $n = 3$.
>
> The $m = n$ integral is not zero; the norm $2/7$ is the number that divides the projection.

### P4. Find the Legendre coefficients $c_1$ and $c_3$ of the odd square wave $f(x) = -1$ on $(-1,0)$ and $f(x) = +1$ on $(0,1)$.

**Given:** f(x) = sgn(x) on [-1, 1]; odd function

**Solution:**

1. $f$ is odd and $P_n$ has the parity of $n$, so $c_n = 0$ for every even $n$; in particular $c_0 = 0$
2. $c_1 = \frac{3}{2}\int_{-1}^{1}f(x)P_1(x)\,dx = \frac{3}{2}\int_{-1}^{1}\mathrm{sgn}(x)\,x\,dx$
3. The integrand is even, so $\int_{-1}^{1}\mathrm{sgn}(x)x\,dx = 2\int_0^{1}x\,dx = 1$
4. $c_1 = \frac{3}{2}(1) = \frac{3}{2}$
5. $c_3 = \frac{7}{2}\int_{-1}^{1}\mathrm{sgn}(x)\frac{5x^{3}-3x}{2}dx = \frac{7}{2}\cdot 2\int_0^{1}\frac{5x^{3}-3x}{2}dx = \frac{7}{2}\left[\frac{5}{4}-\frac{3}{2}\right]$
6. $= \frac{7}{2}\left(-\frac{1}{4}\right) = -\frac{7}{8} = -0.875$

> [!success]- Answer
> **$c_1 = \dfrac{3}{2} = 1.5$ and $c_3 = -\dfrac{7}{8} = -0.875$; every even coefficient is zero by parity**

> [!warning] Trap
> Dropping the factor 2 that the even integrand produces and taking $c_1 = \frac{3}{2}\int_0^{1}x\,dx = \frac{3}{4}$. Since every odd coefficient is then halved, the series converges to $\frac{1}{2}\mathrm{sgn}(x)$ and returns $0.5$ at $x = 0.99$ instead of the required $1$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. The integrand $\mathrm{sgn}(x)P_n(x)$ is even, so double the half range: $c_1 = (3/2)\cdot 2\int_0^1 x\,dx$ = `1.5×2×∫(X, 0, 1)` → **1.5**.
> 2. $c_3 = 7\int_0^1(5x^3-3x)/2\,dx$: `∫dx` `∫((5X³-3X)÷2, 0, 1)` → **-0.125**, `×7` → **-0.875**.
>
> `∫dx` cannot see `sgn`, so split at 0 and double the $[0,1]$ half; dropping that factor 2 halves every coefficient.

### P5. Given $P_2(0.5) = -0.125$ and $P_3(0.5) = -0.4375$, use the three-term recurrence to find $P_4(0.5)$, and check it against the explicit polynomial.

**Given:** P_2(0.5) = -0.125; P_3(0.5) = -0.4375; x = 0.5

**Solution:**

1. The recurrence with $n = 3$: $(3+1)P_4 = (2(3)+1)xP_3 - 3P_2$, that is $4P_4 = 7xP_3 - 3P_2$
2. $7xP_3 = 7(0.5)(-0.4375) = -1.53125$
3. $3P_2 = 3(-0.125) = -0.375$
4. $4P_4 = -1.53125 - (-0.375) = -1.15625$
5. $P_4(0.5) = -0.2890625$
6. Check with $P_4(x) = \frac{35x^{4}-30x^{2}+3}{8}$: $\frac{35(0.0625) - 30(0.25) + 3}{8} = \frac{2.1875 - 7.5 + 3}{8} = -0.2890625$

> [!success]- Answer
> **$P_4(0.5) = -0.2890625$**

> [!warning] Trap
> Using $nP_{n-1}$ with the wrong $n$: at $n = 3$ the subtraction term is $3P_2$, not $2P_2$ or $4P_2$. Using $2P_2$ gives $P_4 = -0.3203$ instead of $-0.2891$, and the explicit polynomial immediately contradicts it.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Recurrence at $n = 3$: `7×0.5×(-0.4375) - 3×(-0.125)` → **-1.15625**, then `÷4` → **-0.2890625**.
> 2. Explicit check: `(35×0.5^4 - 30×0.5² + 3) ÷ 8` → **-0.2890625**, identical to the recurrence value.
>
> Using $2P_2$ in place of $3P_2$ gives **-0.3203125**, which the explicit polynomial rejects at once.

## Traps & Exam Notes

- **Writing $n^{2}$ instead of $n(n+1)$.** For $n = 2$ the last term is $6y$, not $4y$; substituting $P_2$ with $n^{2} = 4$ leaves the nonzero residual $1-3x^{2}$ and makes a correct polynomial look wrong.
- **Treating the orthogonality norm as 1.** $\int_{-1}^{1}P_n^{2}dx = \frac{2}{2n+1}$, which is why the expansion coefficient carries $\frac{2n+1}{2}$. Using norm 1 for $x^{2}$ gives $a_2 = \frac{4}{15}$ instead of $\frac{2}{3}$.
- **Inserting a weight function.** Legendre orthogonality has weight 1 in $x$ because the $\sin\theta$ of the spherical volume element is absorbed by $x = \cos\theta$; writing $\int P_mP_n\sin\theta\,d\theta$ and then treating it as weight 1 mixes the two variables and gives a wrong norm. Only the Bessel family carries an explicit weight $\rho$.
- **Ignoring parity.** An even function has every odd coefficient zero; computing $a_1 = \frac{3}{2}\int_{-1}^{1}x^{2}\cdot x\,dx$ as anything other than $0$ is always an arithmetic slip, not a physical result.
- **Dropping $2^{n}n!$ from Rodrigues' formula.** At $n = 3$ that returns $120x^{3}-72x$ instead of $\frac{1}{2}(5x^{3}-3x)$, a factor of 48 too large; the check $P_3(1) = 1$ catches it in one line.

## See Also

- [[14_Bessel_Functions]]
- [[05_Taylor_and_Maclaurin_Series]]
- [[11_Fourier_Series_Trigonometric_and_Exponential]]

---

[[14_Bessel_Functions|⬅ 14]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[16_Matrices,_Determinants,_Rank_and_Inversion|16 ➡]]
