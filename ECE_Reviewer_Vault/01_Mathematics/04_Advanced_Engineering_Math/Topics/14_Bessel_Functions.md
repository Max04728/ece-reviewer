---
id: MATH-04-14
title: "Bessel Functions"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 14
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Power_Series_Radius_of_Convergence]]", "[[03_Sequences_and_Convergence_Tests]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — Bessel Functions

> [!abstract] Scope
> Pick the cylindrical solution that stays finite at the axis and use the zeros of that function as the eigenvalues of the boundary-value problem.

## Core Concept

> [!tip] Intuition
> Bessel functions are the sines and cosines of a circle: separating the wave or Laplace equation in cylindrical coordinates leaves an oscillation whose shape is fixed by the requirement that it be finite on the axis and vanish at the rim.

**Where the equation comes from and what its two solutions mean.** Separating Laplace's or the Helmholtz equation in cylindrical coordinates puts every radial factor through $x^{2}y'' + xy' + (x^{2}-\nu^{2})y = 0$ with $x = k\rho$. The Frobenius method gives two independent solutions: $J_\nu$, which is finite at the origin, and $Y_\nu$, which is not. $Y_0$ behaves like $\frac{2}{\pi}\ln x$ and $Y_\nu$ for $\nu>0$ like $-\frac{(\nu-1)!}{\pi}(x/2)^{-\nu}$, so the second solution is needed only when the origin is excluded from the domain. That single geometric question — is $\rho = 0$ inside the region — decides the whole form of the answer: a solid cylinder or a full waveguide cross-section keeps $J_\nu$ alone, while an annulus, a coaxial line or a hollow wave guide keeps both terms.

**Recurrences and derivative identities replace differentiation.** The two ladder identities are:
$$\frac{d}{dx}[x^{\nu}J_\nu(x)] = x^{\nu}J_{\nu-1}(x)$$
The companion is:
$$\frac{d}{dx}[x^{-\nu}J_\nu(x)] = -x^{-\nu}J_{\nu+1}(x)$$
Together they generate every recurrence, so differentiating the series is never necessary in an exam. Adding and subtracting them gives the standard recurrences. The sum is:
$$J_{\nu-1}+J_{\nu+1} = \frac{2\nu}{x}J_\nu$$
The difference is:
$$J_{\nu-1}-J_{\nu+1} = 2J_\nu'$$
Splitting the pair gives:
$$J_{\nu-1} = \frac{\nu}{x}J_\nu + J_\nu'$$
The partner is:
$$J_{\nu+1} = \frac{\nu}{x}J_\nu - J_\nu'$$
The most-used special case is $J_0' = -J_1$, which follows at $\nu = 0$. Because these relations move only the order, a table of $J_0$ and $J_1$ values is enough to reach any higher integer order without evaluating a single integral.

**Zeros become eigenvalues, and orthogonality carries a weight.** A clamped rim at $\rho = a$ imposes $J_\nu(ka) = 0$, so the permitted $k$ values are $k_n = \alpha_{\nu n}/a$ where $\alpha_{\nu n}$ is the $n$-th positive zero of $J_\nu$ — the eigenvalues come from the zeros, never from the value at the origin, where $J_0(0) = 1$ and $J_\nu(0) = 0$ for $\nu>0$. The eigenfunctions are orthogonal with respect to the weight $\rho$:
$$\int_0^{a}\rho J_\nu(\alpha_m\rho/a)J_\nu(\alpha_p\rho/a)d\rho$$
vanishes for $m\neq p$ and equals $\frac{a^{2}}{2}J_{\nu+1}^{2}(\alpha_n)$ for $m = p$. The weight is not optional — Bessel's equation is self-adjoint only in the weighted Sturm-Liouville sense — so dropping it destroys the orthogonality that makes a Fourier-Bessel expansion possible, and the computed coefficients come out biased toward the outer part of the region.

**The modified forms and the half-integer exception.** When the separation constant has the opposite sign, as in a decaying field below cutoff or heat flow along a fin, the equation becomes $x^{2}y'' + xy' - (x^{2}+\nu^{2})y = 0$ with solutions $I_\nu$ and $K_\nu$. These are monotone: $I_\nu$ grows exponentially, $K_\nu$ decays and is singular at the origin, and neither oscillates, so a modified problem has no zero-crossing eigenvalue structure at all. Finally, half-integer orders collapse to elementary functions, the cleanest being $J_{1/2}(x) = \sqrt{2/(\pi x)}\sin x$, so $J_{1/2}(\pi/2) = 2/\pi = 0.6366$; this lets a spherical-geometry problem be solved with ordinary sines instead of Bessel tables.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Bessel's equation of order nu | $x^{2}y'' + xy' + \left(x^{2}-\nu^{2}\right)y = 0$ | Arises from separation in cylindrical coordinates with $x = k\rho$; $\nu$ may be any real number but is an integer in most exam problems. |
| Series solution | $J_\nu(x) = \sum_{m=0}^{\infty}\frac{(-1)^{m}}{m!\,\Gamma(m+\nu+1)}\left(\frac{x}{2}\right)^{2m+\nu}$ | Converges for all $x$; $\Gamma(m+\nu+1) = (m+\nu)!$ when $\nu$ is an integer. |
| General solution | $y = A\,J_\nu(x) + B\,Y_\nu(x)$ | Set $B = 0$ whenever $\rho = 0$ lies in the region, because $Y_\nu$ is singular there; keep both on an annulus. |
| Values at the origin | $J_0(0) = 1,\qquad J_n(0) = 0\ \ (n\geq 1)$ | $Y_n$ diverges at $0$ for every $n$; also $J_{-n} = (-1)^{n}J_n$, so negative integer orders add nothing new. |
| Recurrence I | $J_{\nu-1}(x) + J_{\nu+1}(x) = \frac{2\nu}{x}J_\nu(x)$ | The order-stepping relation; watch that the numerator is $2\nu$, not $2$. |
| Recurrence II | $J_{\nu-1}(x) - J_{\nu+1}(x) = 2J_\nu'(x)$ | Gives derivatives from neighbouring orders; at $\nu = 0$ it reduces to $J_0' = -J_1$. |
| Recurrence III | $J_{\nu-1}(x) = \frac{\nu}{x}J_\nu(x) + J_\nu'(x),\qquad J_{\nu+1}(x) = \frac{\nu}{x}J_\nu(x) - J_\nu'(x)$ | The split forms, obtained by combining I and II; the minus sign sits on the $J_{\nu+1}$ branch. |
| Derivative identities | $\frac{d}{dx}\left[x^{\nu}J_\nu(x)\right] = x^{\nu}J_{\nu-1}(x),\qquad \frac{d}{dx}\left[x^{-\nu}J_\nu(x)\right] = -x^{-\nu}J_{\nu+1}(x)$ | The second identity carries the minus sign; these two generate all three recurrences. |
| Modified Bessel equation | $x^{2}y'' + xy' - \left(x^{2}+\nu^{2}\right)y = 0,\qquad y = A\,I_\nu(x) + B\,K_\nu(x)$ | Opposite sign of the separation constant; $I_\nu$ grows, $K_\nu$ decays and is singular at $0$. No oscillation, so no eigenvalue-from-zeros problem. |
| Orthogonality and norm | $\int_0^{a}\rho\,J_\nu\!\left(\frac{\alpha_m\rho}{a}\right)J_\nu\!\left(\frac{\alpha_p\rho}{a}\right)d\rho = 0\ (m\neq p),\qquad = \frac{a^{2}}{2}J_{\nu+1}^{2}(\alpha_n)\ (m=p)$ | The weight is $\rho$, not 1; $\alpha_n$ is a zero of $J_\nu$ and the two-sided form uses $J_{\nu+1}(\alpha_n) = -J_\nu'(\alpha_n)$. |
| Eigenvalues from the zeros | $k_n = \frac{\alpha_{\nu n}}{a},\qquad J_\nu(\alpha_{\nu n}) = 0$ | For a clamped rim. An insulated or free rim instead uses the zeros of $J_\nu'$, i.e. of $J_{\nu+1}$, and $\alpha_{01} = 2.4048$, $\alpha_{11} = 3.8317$. |
| Half-integer order | $J_{1/2}(x) = \sqrt{\frac{2}{\pi x}}\,\sin x$ | Collapses to elementary functions, so $J_{1/2}(\pi/2) = 2/\pi = 0.6366$; valid only for half-integer $\nu$. |

## Worked Problems

### P1. A circular membrane of radius $a = 5$ cm is clamped at its rim. For the $\nu = 0$ mode write the radial solution and find the first permitted value of $k$.

**Given:** a = 0.05 m; clamped rim; nu = 0 mode; alpha_01 = 2.4048

**Solution:**

1. The origin is inside the membrane, so the $Y_0$ term is discarded and $R(\rho) = A\,J_0(k\rho)$
2. The clamped rim requires $R(a) = 0$, that is $J_0(ka) = 0$
3. So $ka$ must equal a positive zero of $J_0$; the smallest is $\alpha_{01} = 2.4048$
4. $k_1 = \frac{\alpha_{01}}{a} = \frac{2.4048}{0.05\ \mathrm{m}} = 48.10$ rad/m
5. The corresponding mode shape is $R(\rho) = A\,J_0(48.10\rho)$, which is finite at $\rho = 0$, where $J_0(0) = 1$

> [!success]- Answer
> **$R(\rho) = A\,J_0(k\rho)$ with $k_1 = 48.10$ rad/m**

> [!warning] Trap
> Taking the eigenvalue from $J_0(0) = 1$ or from $ka = 0$. The eigenvalue comes from the zero of $J_0$, not from its value at the axis; using $\alpha_{01} = 0$ makes the mode constant and violates the clamped-rim condition entirely.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Put the radius in metres in a variable: `0.05` `SHIFT` `STO` `A`, then `2.4048 ÷ A` → **48.096** rad/m.
> 2. The next zero uses the same line: `5.5201 ÷ A` → **110.40** rad/m.
>
> The only arithmetic in the problem is the cm to m conversion, and it is inside the division.

### P2. Use the series definition to evaluate $J_0(1)$ to four significant figures.

**Given:** x = 1; J_0 series; 0! = 1, 1! = 1, 2! = 2, 3! = 6, 4! = 24

**Solution:**

1. $J_0(x) = \sum_{m=0}^{\infty}\frac{(-1)^{m}}{(m!)^{2}}\left(\frac{x}{2}\right)^{2m} = 1 - \frac{x^{2}}{4} + \frac{x^{4}}{64} - \frac{x^{6}}{2304} + \frac{x^{8}}{147456} - \cdots$
2. At $x = 1$: $1 - 0.25 + 0.015625 - 0.00043403 + 0.00000678$
3. $= 0.765625 - 0.00043403 + 0.00000678$
4. $= 0.76519775$
5. The alternating series converges rapidly, so the four-term value $0.7652$ is already correct to four places

> [!success]- Answer
> **$J_0(1) = 0.7652$**

> [!warning] Trap
> Forgetting that the denominator is $(m!)^{2}$, not $m!$. With $m!$ alone the $x^{4}$ term becomes $1/32$ instead of $1/64$ and the series gives $0.7788$ instead of $0.7652$ — a 1.8 percent error that looks like a rounding issue but is structural.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `Apps` `Σ` `Σ((-1)^X × 0.5^(2X) ÷ (X!)², 0, 3)` → **0.76519097**; adding the $m = 4$ term gives **0.76519775**.
> 2. So $J_0(1)$ = **0.7652** to four places, the same value the hand series reaches.
>
> The denominator is $(X!)^2$ — key `X!` then `x²`. A single `X!` gives **0.7788**, the trap's number.

### P3. Given $J_0(2) = 0.223891$ and $J_1(2) = 0.576725$, find $J_2(2)$ without integrating.

**Given:** J_0(2) = 0.223891; J_1(2) = 0.576725; use a recurrence relation

**Solution:**

1. Recurrence I with $\nu = 1$: $J_0(x) + J_2(x) = \frac{2}{x}J_1(x)$
2. Solve for the highest order: $J_2(x) = \frac{2}{x}J_1(x) - J_0(x)$
3. At $x = 2$: $J_2(2) = \frac{2}{2}(0.576725) - 0.223891$
4. $= 0.576725 - 0.223891$
5. $= 0.352834$

> [!success]- Answer
> **$J_2(2) = 0.3528$**

> [!warning] Trap
> Using $\frac{2}{x}\to\frac{1}{x}$ or $\frac{\nu}{x}$, which gives $0.288363 - 0.223891 = 0.0645$ instead of $0.3528$. The numerator in recurrence I is $2\nu$, and at $\nu = 1$ that happens to equal 2 while the denominator is $x = 2$, so the factor is exactly 1.

### P4. Use the derivative identity to evaluate $\frac{d}{dx}\left[x\,J_1(x)\right]$ at $x = 2$, given $J_0(2) = 0.223891$.

**Given:** expression = x times J_1(x); x = 2; nu = 1

**Solution:**

1. Apply $\frac{d}{dx}\left[x^{\nu}J_\nu(x)\right] = x^{\nu}J_{\nu-1}(x)$ with $\nu = 1$
2. $\frac{d}{dx}\left[x\,J_1(x)\right] = x\,J_0(x)$
3. At $x = 2$: $2\,J_0(2)$
4. $= 2(0.223891) = 0.447782$

> [!success]- Answer
> **$\left.\frac{d}{dx}\left[xJ_1(x)\right]\right\rvert_{x=2} = 0.4478$**

> [!warning] Trap
> Reaching for the companion identity with the minus sign, $\frac{d}{dx}[x^{-\nu}J_\nu] = -x^{-\nu}J_{\nu+1}$, and producing $-2J_2(2) = -0.7057$. The plus-order identity raises the order by one on the left and lowers it on the right.

### P5. For $J_0$ on the interval $0 < \rho < a$ with $a = 1$ and the first zero $\alpha_1 = 2.4048$, evaluate the squared norm $\int_0^{1}\rho\,J_0^{2}(\alpha_1\rho)\,d\rho$ and explain its role.

**Given:** a = 1; alpha_1 = 2.4048; J_1(2.4048) = 0.519147

**Solution:**

1. The norm formula for the weight-$\rho$ inner product is $\int_0^{a}\rho\,J_\nu^{2}\!\left(\frac{\alpha_n\rho}{a}\right)d\rho = \frac{a^{2}}{2}J_{\nu+1}^{2}(\alpha_n)$
2. With $\nu = 0$, $n = 1$ and $a = 1$: the norm is $\frac{1}{2}J_1^{2}(2.4048)$
3. $J_1(2.4048) = 0.519147$, so $J_1^{2} = 0.269514$
4. Norm $= \frac{1}{2}(0.269514) = 0.134757$
5. This value is the denominator of every Fourier-Bessel coefficient: $c_n = \frac{\int_0^{a}\rho f(\rho)J_0(\alpha_n\rho/a)d\rho}{\frac{a^{2}}{2}J_1^{2}(\alpha_n)}$

> [!success]- Answer
> **Norm $= 0.1348$ (exactly $\frac{1}{2}J_1^{2}(2.4048)$)**

> [!warning] Trap
> Using $J_0$ instead of $J_1$ in the norm, that is $\frac{1}{2}J_0^{2}(2.4048) = 0$ because $\alpha_1$ is a zero of $J_0$. The norm of a mode is never zero, and the zero of $J_\nu$ sits one order below the $J_{\nu+1}$ factor that the norm needs.

## Traps & Exam Notes

- **Keeping $Y_\nu$ when the axis is inside the region.** $Y_0\sim\frac{2}{\pi}\ln\rho$ and $Y_\nu\sim-\frac{(\nu-1)!}{\pi}(\rho/2)^{-\nu}$ both diverge at the origin, so any solid disk, solid cylinder or full waveguide cross-section forces that coefficient to zero.
- **Reading the eigenvalue off the wrong function value.** The clamped-rim condition is $J_\nu(ka) = 0$, so the eigenvalues are $k = \alpha_{\nu n}/a$ with $\alpha_{\nu n}$ a positive zero. Using $J_0(0) = 1$, or the zeros of $J_0$ when the rim is insulated (which needs the zeros of $J_0'$), gives a completely wrong mode set.
- **Dropping the weight $\rho$.** Fourier-Bessel orthogonality is $\int_0^{a}\rho J_\nu J_\nu\,d\rho$; with weight 1 the cross terms do not vanish, so every coefficient comes out wrong and the reconstructed field is biased toward the outer radius.
- **Confusing the ordinary and modified equations.** $x^{2}y''+xy'+(x^{2}-\nu^{2})y=0$ gives the oscillating pair $J_\nu, Y_\nu$, while $x^{2}y''+xy'-(x^{2}+\nu^{2})y=0$ gives the monotone pair $I_\nu, K_\nu$. Answering an $I_\nu$ problem with a $J_\nu$ zero condition imposes oscillation where none exists.
- **Sign slip between the two derivative identities.** $\frac{d}{dx}[x^{\nu}J_\nu] = x^{\nu}J_{\nu-1}$ has no minus, $\frac{d}{dx}[x^{-\nu}J_\nu] = -x^{-\nu}J_{\nu+1}$ does. Mixing them flips the sign of a derivative, which propagates into a wrong boundary condition — for example giving $J_0' = +J_1$ and reversing the sign of every Neumann-condition eigenvalue.

## See Also

- [[04_Power_Series_Radius_of_Convergence]]
- [[15_Legendre_Polynomials]]
- [[11_Fourier_Series_Trigonometric_and_Exponential]]

---

[[13_Fourier_Transform_Properties|⬅ 13]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[15_Legendre_Polynomials|15 ➡]]
