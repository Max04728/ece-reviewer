---
id: MATH-03-14
title: "PDE Laplace Equation 2D"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 14
tier: 2
depth: full
problem_count: 5
prereqs: ["[[13_PDE_Heat_Equation_1D]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — PDE Laplace Equation 2D

> [!abstract] Scope
> Solve Laplace's equation on a rectangle by separation of variables, choose the correct trigonometric/hyperbolic split, and determine the series coefficients from the nonzero boundary side.

## Core Concept

> [!tip] Intuition
> Laplace's equation describes a steady state with no sources: heat that has stopped flowing, or potential in a charge-free region. The value at every interior point is a weighted average of the surrounding boundary values, so the solution is a smooth interpolation of the rim.

**The problem and its meaning.** $u_{xx}+u_{yy}=0$ on a plane region. It is the steady-state limit of the heat equation ($u_t\to0$) and the equation for the electrostatic potential in a charge-free region, so the same machinery serves thermal and electromagnetic problems. There is no time variable, so no initial condition exists; well-posedness comes entirely from boundary data, and boundary conditions must be given on the whole boundary. A solution of Laplace's equation is called harmonic, and every harmonic function has the mean-value property and the maximum principle.

**Separation of variables.** Put $u = X(x)Y(y)$: then $X''Y+XY'' = 0$, so $\frac{X''}{X} = -\frac{Y''}{Y}$, and each side must be a constant. Writing that constant as $-\lambda$ gives $X''+\lambda X = 0$ and $Y''-\lambda Y = 0$: one oscillatory factor and one hyperbolic factor. Which one lands in which direction is decided by the boundary conditions, not by preference. The direction that carries *two homogeneous Dirichlet conditions* must receive the trigonometric functions, because only sines vanish at two distinct points; the remaining direction then gets $\sinh$ and $\cosh$, which are monotone and better suited to a single nonzero side.

**The standard rectangle.** On $0<x<a$, $0<y<b$, take the three sides $x=0$, $x=a$ and $y=0$ at zero and let the top side carry the data, $u(x,b)=f(x)$. Then $X(0)=X(a)=0$ gives $X_n = \sin\frac{n\pi x}{a}$ with $\lambda_n = (n\pi/a)^2$, and $Y''-\lambda_nY=0$ with $Y(0)=0$ gives $Y_n = \sinh\frac{n\pi y}{a}$. The resulting solution is:
$$u(x,y) = \sum_{n=1}^{\infty}B_n\sin\frac{n\pi x}{a}\sinh\frac{n\pi y}{a}$$
Imposing the top condition gives the coefficient relation:
$$B_n\sinh\frac{n\pi b}{a} = \frac{2}{a}\int_0^af(x)\sin\frac{n\pi x}{a}dx$$
The crucial subtlety is that the Fourier coefficient of $f$ equals $B_n\sinh(n\pi b/a)$, not $B_n$ itself.

**Superposition across boundary sides.** With more than one nonzero side, split the problem into one problem per nonzero side, solve each with the other three sides held at zero, and add the results. This works because Laplace's equation and the zero boundary conditions are both linear and homogeneous, so each partial problem is independent. It fails if a boundary condition is inhomogeneous in a way that couples two sides (for example a prescribed flux depending on the solution) or if the boundary data are inconsistent at a corner.

**Why the answer behaves as it does.** The maximum principle states that a non-constant harmonic function attains its maximum and minimum only on the boundary; an interior hot spot means the solution is wrong. The mean-value property says the value at the centre of a region is the average of the surrounding values — for a square with three sides at $0\,^\circ$C and the fourth at $100\,^\circ$C, symmetry forces the centre to be exactly $25\,^\circ$C. The hyperbolic factor also explains shielding: $e^{-n\pi y/a}$ decays rapidly with distance, so boundary features are felt only within a distance of order $a/\pi$ in the $y$-direction — the same exponential attenuation that makes fields in a rectangular waveguide evanescent below cutoff.

**When separation fails.** The method needs a coordinate system in which the boundary coincides with coordinate surfaces. A rectangle is fine in Cartesian coordinates; a disk or a cylinder requires polar or cylindrical coordinates, where the separated solutions are $r^{\pm n}$ and $\sin n\theta$; a sphere requires Legendre polynomials. Curved or irregular boundaries, position-dependent material properties, and nonlinear boundary conditions (such as radiation with a $T^4$ term) all put the problem outside the method.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| 2D Laplace equation | $u_{xx} + u_{yy} = 0$ | Steady state with no sources: heat flow has stopped, or the region is charge-free. |
| Separation ansatz | $u(x,y) = X(x)Y(y)$ | Requires boundary conditions on coordinate surfaces — rectangles in Cartesian, disks in polar. |
| Separated equations | $X'' + \lambda X = 0, \quad Y'' - \lambda Y = 0$ | One trigonometric factor, one hyperbolic factor. Which direction gets which is set by the boundary conditions. |
| Eigenvalues in x | $\lambda_n = \left(\frac{n\pi}{a}\right)^2, \quad X_n = \sin\frac{n\pi x}{a}$ | Used for the direction with two homogeneous Dirichlet ends, of width a. |
| Hyperbolic factor in y | $Y_n = \sinh\frac{n\pi y}{a}$ | Used when Y(0) = 0. With Y(b) = 0 instead, use sinh(n*pi*(b-y)/a). |
| Series solution | $u(x,y) = \sum_{n=1}^{\infty} B_n \sin\frac{n\pi x}{a}\sinh\frac{n\pi y}{a}$ | For three sides at zero and data on y = b; the sinh vanishes at y = 0 as required. |
| Coefficient relation | $B_n \sinh\frac{n\pi b}{a} = \frac{2}{a}\int_0^a f(x)\sin\frac{n\pi x}{a}\,dx$ | The Fourier coefficient is B_n*sinh(...), not B_n. Dividing by the sinh is a separate step. |
| Semi-infinite strip | $u = \sum B_n \sin\frac{n\pi x}{a}e^{-n\pi y/a}$ | For y -> infinity with u bounded. Keep the decaying exponential, never the growing one. |
| Polar Laplace equation | $u_{rr} + \frac{1}{r}u_r + \frac{1}{r^2}u_{\theta\theta} = 0$ | For disks and cylinders: solutions r^{\pm n} and sin(n*theta), not sines in x. |
| Maximum principle | $\max_{\Omega} u = \max_{\partial\Omega} u$ | No interior maximum or minimum for a non-constant harmonic function; an interior hot spot signals an error. |
| Mean value property | $u(\mathrm{centre}) = \mathrm{average\ of\ boundary\ values}$ | Exact for symmetric regions; a fast consistency check on a computed series. |

## Worked Problems

### P1. Separate Laplace's equation on $0<x<a$, $0<y<b$ with $u(0,y)=u(a,y)=u(x,0)=0$ and $u(x,b)=f(x)$, and state the coefficient formula.

**Given:** $u_{xx}+u_{yy}=0$; rectangle $a$ by $b$; three sides at zero; top side $f(x)$

**Solution:**

1. Substitute $u=X(x)Y(y)$: $X''Y+XY''=0\Rightarrow X''/X=-Y''/Y=-\lambda$
2. $X''+\lambda X=0$ with $X(0)=X(a)=0\Rightarrow\lambda_n=(n\pi/a)^2$, $X_n=\sin(n\pi x/a)$
3. Why the sines go in $x$: two homogeneous Dirichlet conditions in $x$ force the oscillatory solution, and a hyperbolic $X$ could not vanish at both ends
4. Then $Y''-(n\pi/a)^2Y=0\Rightarrow Y_n=C_n\cosh(n\pi y/a)+D_n\sinh(n\pi y/a)$
5. Apply $Y(0)=0$: $C_n=0$, so $Y_n=\sinh(n\pi y/a)$
6. Superpose: $u(x,y)=\sum_{n=1}^{\infty}B_n\sin(n\pi x/a)\sinh(n\pi y/a)$
7. Apply $u(x,b)=f(x)$: $\sum B_n\sinh(n\pi b/a)\sin(n\pi x/a)=f(x)$
8. Since $\sinh(n\pi b/a)$ is a constant for each $n$, it multiplies the Fourier coefficient: $B_n\sinh(n\pi b/a)=\frac{2}{a}\int_0^af(x)\sin(n\pi x/a)dx$

> [!success]- Answer
> **$u = \sum_{n=1}^{\infty}B_n\sin\dfrac{n\pi x}{a}\sinh\dfrac{n\pi y}{a}$ with $B_n = \dfrac{2}{a\sinh(n\pi b/a)}\displaystyle\int_0^af(x)\sin\dfrac{n\pi x}{a}dx$**

> [!warning] Trap
> Putting the sines in $y$ and the hyperbolic functions in $x$. The two zero conditions in $x$ demand oscillation in $x$; swapping the roles makes $X(0)=X(a)=0$ impossible to satisfy except trivially.

### P2. On the square $0<x<\pi$, $0<y<\pi$, solve $u_{xx}+u_{yy}=0$ with $u(x,\pi)=100\sin x$ and the other three sides at $0\,^\circ$C.

**Given:** $a = b = \pi$; $u(x,\pi) = 100\sin x$; $u(0,y) = u(\pi,y) = u(x,0) = 0$

**Solution:**

1. Match the standard form with $a=\pi$: $u=\sum B_n\sin(nx)\sinh(ny)$
2. The top condition gives $B_n\sinh(n\pi)=\frac{2}{\pi}\int_0^{\pi}100\sin x\sin(nx)dx$
3. Orthogonality: $\frac{2}{\pi}\int_0^{\pi}\sin x\sin(nx)dx=1$ if $n=1$ and $0$ otherwise
4. So $B_1\sinh\pi=100\Rightarrow B_1=100/\sinh\pi=100/11.5487=8.659$, and all other $B_n=0$
5. Solution: $u(x,y)=8.659\sinh y\sin x=\frac{100\sinh y}{\sinh\pi}\sin x$
6. Check the top side: at $y=\pi$, $\sinh\pi/\sinh\pi=1$, so $u=100\sin x$ as required
7. Check the bottom: at $y=0$, $\sinh 0=0$, so $u=0$; check the sides: $\sin 0=\sin\pi=0$
8. Centre value: $u(\pi/2,\pi/2)=\frac{100\sinh(\pi/2)}{\sinh\pi}=\frac{100}{2\cosh(\pi/2)}=\frac{100}{5.018}=19.9\,^\circ$C

> [!success]- Answer
> **$u(x,y) = \dfrac{100\sinh y}{\sinh\pi}\sin x$, so $u = 8.66\sinh y\sin x$ and the centre is $19.9\,^\circ$C**

> [!warning] Trap
> Reading $B_1 = 100$ and dropping the $\sinh\pi$ divisor. The Fourier coefficient of the boundary data is $B_n\sinh(n\pi b/a)$; forgetting the factor gives a solution that is 11.5 times too hot on the top edge.

### P3. On the square $0<x<\pi$, $0<y<\pi$, solve Laplace's equation with $u(x,\pi)=100\,^\circ$C (constant) and the other three sides at $0\,^\circ$C. Find the first two nonzero terms and the centre temperature.

**Given:** $a = b = \pi$; $u(x,\pi) = 100$ (constant); other three sides at $0\,^\circ$C

**Solution:**

1. $B_n\sinh(n\pi)=\frac{2}{\pi}\int_0^{\pi}100\sin(nx)dx=\frac{200}{n\pi}(1-(-1)^n)$
2. Odd $n$: $B_n\sinh(n\pi)=400/(n\pi)$, so $B_n=400/(n\pi\sinh(n\pi))$; even $n$ gives 0
3. $u(x,y)=\sum_{n\ \mathrm{odd}}\frac{400}{n\pi\sinh(n\pi)}\sin(nx)\sinh(ny)$
4. At the centre $x=y=\pi/2$: $\sin(n\pi/2)=+1$ for $n=1,5,9,\dots$ and $-1$ for $n=3,7,\dots$
5. $n=1$: $\frac{400}{\pi\cdot 11.5487}\sinh(\pi/2)=11.024\cdot 2.3013=25.37$
6. $n=3$: $\frac{400}{3\pi\cdot 6195.8}(-1)\sinh(3\pi/2)=0.006850\cdot(-55.65)=-0.381$
7. $n=5$: $+0.0099$, and later terms are negligible; total $=25.37-0.381+0.010=25.00\,^\circ$C
8. Cross-check with the mean-value property: by symmetry the centre is the average of the four sides, $(0+0+0+100)/4=25\,^\circ$C

> [!success]- Answer
> **$u(x,y) = \sum_{n\ \mathrm{odd}}\dfrac{400}{n\pi\sinh(n\pi)}\sin(nx)\sinh(ny)$, and $u(\pi/2,\pi/2) = 25\,^\circ$C**

> [!warning] Trap
> Keeping only $n=1$ and reporting $25.4\,^\circ$C. The $n=3$ term is $-0.38\,^\circ$C and is exactly what brings the sum to the symmetry value of 25; truncating after one term breaks the mean-value check that the problem is designed to test.

### P4. On the semi-infinite strip $0<x<1$, $y>0$, solve $u_{xx}+u_{yy}=0$ with $u(0,y)=u(1,y)=0$, $u(x,0)=100\,^\circ$C and $u\to0$ as $y\to\infty$. Find $B_n$ and the temperature at $x=1/2$, $y=1/\pi$.

**Given:** $a = 1$; strip $y>0$; $u(x,0) = 100\,^\circ$C; $u\to0$ as $y\to\infty$

**Solution:**

1. Eigenvalues from the $x$-direction: $\lambda_n=(n\pi)^2$, $X_n=\sin(n\pi x)$
2. $Y''-(n\pi)^2Y=0$ gives $Y=Ae^{n\pi y}+Be^{-n\pi y}$; boundedness as $y\to\infty$ forces $A=0$
3. So $u=\sum B_n\sin(n\pi x)e^{-n\pi y}$
4. Apply $u(x,0)=100$: $\sum B_n\sin(n\pi x)=100$, so $B_n=2\int_0^1100\sin(n\pi x)dx=200(1-(-1)^n)/(n\pi)$
5. Odd $n$: $B_n=400/(n\pi)$; even $n$: $B_n=0$
6. At $x=1/2$, $y=1/\pi$: $e^{-n\pi y}=e^{-n}$ and $\sin(n\pi/2)$ alternates $+1,-1,+1,\dots$
7. $n=1$: $\frac{400}{\pi}e^{-1}=127.32\cdot 0.36788=46.84$
8. $n=3$: $\frac{400}{3\pi}(-1)e^{-3}=-42.44\cdot 0.049787=-2.113$
9. $n=5$: $\frac{400}{5\pi}(+1)e^{-5}=25.46\cdot 0.006738=+0.172$
10. Total: $46.84-2.113+0.172=44.9\,^\circ$C

> [!success]- Answer
> **$u = \sum_{n\ \mathrm{odd}}\dfrac{400}{n\pi}\sin(n\pi x)e^{-n\pi y}$, giving $u(1/2,1/\pi) \approx 44.9\,^\circ$C**

> [!warning] Trap
> Keeping the growing exponential $e^{+n\pi y}$, which satisfies the PDE and the two side conditions but sends $u\to\infty$ as $y\to\infty$ — it violates the boundedness requirement, so its coefficient must be zero.

### P5. Show that $u(x,y) = e^{-y}\sin x$ satisfies Laplace's equation, and state which boundary-value problem it solves on the strip $0<x<\pi$, $y>0$.

**Given:** $u = e^{-y}\sin x$; strip $0<x<\pi$, $y>0$

**Solution:**

1. $u_x=e^{-y}\cos x$, so $u_{xx}=-e^{-y}\sin x$
2. $u_y=-e^{-y}\sin x$, so $u_{yy}=+e^{-y}\sin x$
3. Sum: $u_{xx}+u_{yy}=-e^{-y}\sin x+e^{-y}\sin x=0$, so $u$ is harmonic
4. Boundary values: $u(0,y)=e^{-y}\sin 0=0$ and $u(\pi,y)=e^{-y}\sin\pi=0$
5. Bottom edge: $u(x,0)=\sin x$, so $f(x)=\sin x$
6. Far field: $u\to0$ as $y\to\infty$ because $e^{-y}$ decays, so $u$ is bounded
7. This is the semi-infinite strip problem with $a=\pi$ and $B_1=1$, i.e. the $n=1$ term of the series solution

> [!success]- Answer
> **$u = e^{-y}\sin x$ is harmonic and solves the strip problem with $f(x)=\sin x$ and $u\to0$ as $y\to\infty$**

> [!warning] Trap
> Concluding that any product $X(x)Y(y)$ works. The exponential must be $e^{-y}$ paired with $\sin x$: $e^{+y}\sin x$ is also harmonic but grows without bound and cannot satisfy the far-field condition.

## Traps & Exam Notes

- **Putting the trigonometric factor in the wrong direction.** The direction with two homogeneous Dirichlet ends takes the sines (width sets $\lambda_n=(n\pi/a)^2$); the other direction takes $\sinh$ and $\cosh$. Swapping them makes the two zero conditions unsatisfiable.
- **Forgetting the $\sinh$ divisor.** The Fourier coefficient of the boundary data is $B_n\sinh(n\pi b/a)$, so $B_n$ needs the extra $1/\sinh(n\pi b/a)$. Omitting it leaves the solution matching the wrong boundary temperature — often by more than an order of magnitude at the far side.
- **Using the wrong side length in the hyperbolic argument.** $\sinh(n\pi y/a)$ uses the width $a$ (the direction of the trigonometric factor), not the height $b$. The height appears only in the coefficient relation, through $\sinh(n\pi b/a)$.
- **Forgetting the constant/lowest mode.** For Neumann or mixed data the series starts at $n=0$; dropping the constant term removes the average temperature and destroys the mean-value check. For pure Dirichlet data the $n=0$ term is absent.
- **Keeping a growing exponential in a semi-infinite region.** $e^{+n\pi y/a}$ satisfies the PDE and the side conditions, so it looks admissible, but boundedness requires its coefficient to vanish. Only $e^{-n\pi y/a}$ may appear.
- **Reporting an interior extremum.** The maximum principle forbids an interior hot spot in a source-free steady state; if a computed series peaks in the middle of the rectangle, a sign or a coefficient is wrong.
- **Adding one composite series for several nonzero sides.** Superposition requires solving one problem per nonzero boundary side with the other three at zero, then adding. Trying to force a single sine series to match two different sides at once produces a coefficient equation with no solution.
- **Using Cartesian separation on a disk.** A circular boundary needs the polar Laplacian with $r^{\pm n}$ and $\sin n\theta$; sines in $x$ cannot satisfy a condition on $x^2+y^2=R^2$.

## See Also

- [[13_PDE_Heat_Equation_1D]]
- [[12_PDE_Wave_Equation_1D]]
- [[11_Fourier_Series_Trigonometric_and_Exponential]]
- [[02_Gradient,_Divergence,_Curl_and_Laplacian]]

---

[[13_PDE_Heat_Equation_1D|⬅ 13]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
