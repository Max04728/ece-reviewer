---
id: MATH-03-13
title: "PDE Heat Equation 1D"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 13
tier: 2
depth: full
problem_count: 5
prereqs: ["[[11_Fourier_Series_Trigonometric_and_Exponential]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — PDE Heat Equation 1D

> [!abstract] Scope
> Solve the one-dimensional heat equation by separation of variables, and read the exponential decay of each Fourier mode from the series solution.

## Core Concept

> [!tip] Intuition
> Heat diffuses: sharp features smooth out and the temperature profile relaxes toward a steady state. Separation of variables turns that smoothing into a sum of sine shapes whose amplitudes simply decay in time, the sharpest shapes decaying fastest.

**The problem.** The temperature $u(x,t)$ in a uniform bar of length $L$ with thermal diffusivity $\alpha$ satisfies $u_t = \alpha u_{xx}$ on $0<x<L$, $t>0$, where $\alpha = k/(\rho c_p)$ combines conductivity $k$, density $\rho$ and specific heat $c_p$, and carries units of m$^2$/s. A complete problem needs two boundary conditions (for example both ends held at zero, $u(0,t)=u(L,t)=0$) and one initial condition $u(x,0)=f(x)$. The single time derivative is why the heat equation needs one initial condition while the wave equation needs two.

**Separation of variables.** Substituting $u = X(x)T(t)$ and dividing by $\alpha XT$ separates the variables:
$$\frac{T'}{\alpha T} = \frac{X''}{X} = -\lambda$$
The negative constant is again forced by the boundary conditions: $X''+\lambda X=0$ with $X(0)=X(L)=0$ has nontrivial solutions only for $\lambda_n = (n\pi/L)^2$ with $X_n = \sin\frac{n\pi x}{L}$. The time equation $T' = -\alpha\lambda_nT$ then gives pure exponential decay, $T_n = e^{-\alpha n^2\pi^2t/L^2}$ — no oscillation, because the equation is first order in $t$. This is the fundamental structural difference from the wave equation, where the second time derivative produced $\cos$ and $\sin$.

**The series solution and its coefficients.** Superposing the modes gives the series solution:
$$u(x,t) = \sum_{n=1}^{\infty}B_n\sin\frac{n\pi x}{L}e^{-\alpha n^2\pi^2t/L^2}$$
At $t=0$ this is a Fourier sine series for the initial profile, so orthogonality gives the coefficients:
$$B_n = \frac{2}{L}\int_0^Lf(x)\sin\frac{n\pi x}{L}dx$$
The spatial part is identical to the wave problem; only the time factor changed. Each term is a *mode* that decays without changing shape, and mode $n$ decays with time constant $\tau_n = \frac{L^2}{\alpha n^2\pi^2}$, so mode 3 decays nine times faster than mode 1. After a short time only the fundamental survives, which is why a cooling bar eventually looks like a single sine hump.

**Steady states and long-time behaviour.** If both ends are held at zero, the steady state is $u\equiv0$ and the whole profile decays away. If the ends are held at $T_1$ and $T_2$, the steady state is the linear profile $u_{ss}(x) = T_1+(T_2-T_1)x/L$, so write $u = u_{ss}+v$: the remainder $v$ satisfies the same heat equation with *zero* end conditions and initial data $v(x,0) = f(x)-u_{ss}(x)$, which is the problem solved above. This subtraction is mandatory, not cosmetic — the sine eigenfunctions vanish at both ends and cannot represent a nonzero boundary temperature. For zero-flux (insulated) ends the eigenfunctions are cosines, the $n=0$ term is present, and the steady state is the average temperature.

**Why it works and when it fails.** The method relies on linearity, constant $\alpha$, homogeneous boundary conditions and a separable geometry. It fails for temperature-dependent conductivity (a nonlinear PDE), for a moving boundary such as a melting front, and for boundary conditions coupling $u$ and $u_x$ in a nonlinear way. The backward heat equation $u_t = -\alpha u_{xx}$ is not solvable this way in any useful sense: the exponential becomes $e^{+\alpha n^2\pi^2t/L^2}$, whose high modes blow up instantly, which is the mathematical statement that diffusion cannot be run backwards.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| 1D heat equation | $u_t = \alpha u_{xx}$ | alpha is the thermal diffusivity in m^2/s, not the conductivity k in W/(m.K). |
| Thermal diffusivity | $\alpha = \frac{k}{\rho c_p}$ | k in W/(m.K), rho in kg/m^3, c_p in J/(kg.K) give alpha in m^2/s. |
| Eigenvalue problem | $X'' + \lambda X = 0, \quad X(0) = X(L) = 0$ | Identical to the wave equation's spatial problem; only the time equation differs. |
| Eigenvalues and eigenfunctions | $\lambda_n = \left(\frac{n\pi}{L}\right)^2, \quad X_n = \sin\frac{n\pi x}{L}$ | n = 1, 2, 3, ... for Dirichlet ends. Insulated ends instead give cosines including n = 0. |
| Time factor | $T_n(t) = e^{-\alpha n^2\pi^2 t/L^2}$ | Pure decay, never oscillation. The alpha sits in the exponent and the L is squared in the denominator. |
| Series solution | $u(x,t) = \sum_{n=1}^{\infty} B_n \sin\frac{n\pi x}{L} e^{-\alpha n^2\pi^2 t/L^2}$ | Valid for zero end temperatures; each mode decays without changing its spatial shape. |
| Fourier coefficients | $B_n = \frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx$ | From the initial profile f(x). No extra factor appears, unlike the wave equation's velocity coefficients. |
| Mode time constant | $\tau_n = \frac{L^2}{\alpha n^2\pi^2}$ | Mode 3 decays 9 times faster than mode 1; the ratio is n^2. |
| Steady state, fixed ends | $u_{ss}(x) = T_1 + \frac{T_2-T_1}{L}x$ | For ends held at T_1 and T_2. Subtract it before expanding the transient in sines. |
| Steady state, insulated ends | $u_{ss} = \frac{1}{L}\int_0^L f(x)\,dx$ | Zero-flux ends conserve total heat, so the final temperature is the initial average. |
| Mode decay ratio | $\frac{\tau_1}{\tau_n} = n^2$ | The fundamental always dominates at large t; this is why the long-time profile is one sine hump. |

## Worked Problems

### P1. Separate $u_t = \alpha u_{xx}$ on $0<x<L$ with $u(0,t)=u(L,t)=0$, and write the general series solution with its coefficient formula.

**Given:** $u_t = \alpha u_{xx}$; Dirichlet ends at zero; initial profile $f(x)$

**Solution:**

1. Set $u=X(x)T(t)$: $XT'=\alpha X''T$, so $T'/(\alpha T)=X''/X=-\lambda$
2. Spatial problem: $X''+\lambda X=0$, $X(0)=X(L)=0\Rightarrow\lambda_n=(n\pi/L)^2$, $X_n=\sin(n\pi x/L)$
3. Time problem: $T'=-\alpha\lambda_nT$, a first-order linear ODE, so $T_n=e^{-\alpha n^2\pi^2t/L^2}$
4. Superpose the modes: $u(x,t)=\sum B_n\sin(n\pi x/L)e^{-\alpha n^2\pi^2t/L^2}$
5. Apply $u(x,0)=f(x)$: $\sum B_n\sin(n\pi x/L)=f(x)$
6. Use orthogonality of the sines on $(0,L)$ to isolate $B_n=\frac{2}{L}\int_0^Lf(x)\sin(n\pi x/L)dx$
7. Note the contrast with the wave equation: one initial condition here, two there, and the time factor decays instead of oscillating

> [!success]- Answer
> **$u(x,t) = \sum_{n=1}^{\infty}B_n\sin\dfrac{n\pi x}{L}e^{-\alpha n^2\pi^2t/L^2}$ with $B_n = \dfrac{2}{L}\int_0^L f(x)\sin\dfrac{n\pi x}{L}dx$**

> [!warning] Trap
> Writing $T'' = -\alpha\lambda T$ by copying the wave equation's time equation. The heat equation is first order in $t$, so a second derivative there is a different (and wrong) problem — and its solutions would oscillate instead of decay.

### P2. A bar of length $\pi$ with $\alpha = 1$ m$^2$/s has ends held at $0\,^\circ$C and initial temperature $u(x,0) = 100\sin x\ ^\circ$C. Find $u(x,t)$ and the time at which the peak temperature falls to $50\ ^\circ$C.

**Given:** $L = \pi$; $\alpha = 1$ m$^2$/s; $u(x,0) = 100\sin x$; $u(0,t) = u(\pi,t) = 0$

**Solution:**

1. Compare $u(x,0)=100\sin x$ with $\sum B_n\sin(nx)$ (since $n\pi x/L=nx$): only $n=1$ survives, so $B_1=100$
2. Time factor for $n=1$ with $L=\pi$: $e^{-\alpha(1)^2\pi^2t/\pi^2}=e^{-\alpha t}=e^{-t}$
3. So $u(x,t)=100\sin x\,e^{-t}$
4. The peak is at $x=\pi/2$ with value $100e^{-t}$
5. Set $100e^{-t}=50\Rightarrow e^{-t}=0.5\Rightarrow t=\ln 2$
6. $t=0.693$ s, and the exponent $\alpha t/L^2$ is dimensionless as required

> [!success]- Answer
> **$u(x,t) = 100\,e^{-t}\sin x\ ^\circ$C; the peak halves at $t = \ln 2 \approx 0.693$ s**

> [!warning] Trap
> Setting the decay rate to $\alpha$ without checking $L$: for general $L$ the rate is $\alpha\pi^2/L^2$, so with $L=1$ the same bar would decay as $e^{-\pi^2t}$ and the half-time would be $0.070$ s, ten times shorter. The exponent must be $\alpha n^2\pi^2t/L^2$.

### P3. A bar of length 1 m with diffusivity $\alpha$ has both ends held at $0\,^\circ$C and initial temperature $u(x,0)=100\ ^\circ$C throughout. Find the series solution and estimate when the centre reaches $10\ ^\circ$C.

**Given:** $L = 1$ m; $f(x) = 100$ (uniform); ends at $0\,^\circ$C; $\alpha$ given

**Solution:**

1. $B_n=2\int_0^1100\sin(n\pi x)\,dx=200(1-(-1)^n)/(n\pi)$
2. Odd $n$: $B_n=400/(n\pi)$; even $n$: $B_n=0$
3. $u(x,t)=\sum_{n\ \mathrm{odd}}\frac{400}{n\pi}\sin(n\pi x)e^{-\alpha n^2\pi^2t}$
4. Check at $t=0$, $x=1/2$: $(400/\pi)(1-1/3+1/5-\dots)=(400/\pi)(\pi/4)=100$, matching the initial condition
5. At $x=1/2$ the odd modes alternate in sign with magnitude 1, so $u(1/2,t)=\frac{400}{\pi}\left(e^{-\alpha\pi^2t}-\frac{1}{3}e^{-9\alpha\pi^2t}+\dots\right)$
6. For the centre to fall to 10, the first mode alone must be about 10: $\frac{400}{\pi}e^{-\alpha\pi^2t}=10\Rightarrow e^{-\alpha\pi^2t}=0.0785$
7. Solve: $\alpha\pi^2t=\ln(1/0.0785)=2.545$, so $t=0.258/\alpha$ s; at that time the $n=3$ term is $e^{-9(2.545)}\approx10^{-10}$ and negligible

> [!success]- Answer
> **$u(x,t) = \sum_{n\ \mathrm{odd}}\dfrac{400}{n\pi}\sin(n\pi x)e^{-\alpha n^2\pi^2t}$, and the centre reaches $10\,^\circ$C at $t \approx 0.258/\alpha$ s**

> [!warning] Trap
> Claiming the centre decays as a single exponential from $t=0$. It only does so after the higher modes have died; at small $t$ the $n=3$ term is a third of the fundamental and the true centre temperature is well below the one-term estimate.

### P4. A bar of length 1 m with diffusivity $\alpha$ has $u(0,t)=0\,^\circ$C, $u(1,t)=100\,^\circ$C and $u(x,0)=0\,^\circ$C. Find $u(x,t)$.

**Given:** $L = 1$ m; left end $0\,^\circ$C; right end $100\,^\circ$C; $f(x) = 0$

**Solution:**

1. The boundary data are inhomogeneous, so first find the steady state: $u_{ss}(x)=0+(100-0)x/1=100x$
2. Write $u=u_{ss}+v$, so $v$ satisfies $v_t=\alpha v_{xx}$ with $v(0,t)=v(1,t)=0$
3. Initial condition for $v$: $v(x,0)=f(x)-u_{ss}(x)=0-100x=-100x$
4. $B_n=2\int_0^1(-100x)\sin(n\pi x)dx$; with $\int_0^1x\sin(n\pi x)dx=(-1)^{n+1}/(n\pi)$ this gives $B_n=200(-1)^n/(n\pi)$
5. So $v(x,t)=\sum_{n=1}^{\infty}\frac{200(-1)^n}{n\pi}\sin(n\pi x)e^{-\alpha n^2\pi^2t}$
6. Check at $t=0$ using $\sum(-1)^{n+1}\sin(n\pi x)/n=\pi x/2$: $v=\frac{200}{\pi}\left(-\frac{\pi x}{2}\right)=-100x$, so $u=100x-100x=0$ as required
7. Long-time limit: every exponential dies, leaving $u\to100x$, the linear profile between the two end temperatures

> [!success]- Answer
> **$u(x,t) = 100x + \sum_{n=1}^{\infty}\dfrac{200(-1)^n}{n\pi}\sin(n\pi x)e^{-\alpha n^2\pi^2t}$, tending to $u = 100x$**

> [!warning] Trap
> Expanding $f(x)=0$ directly in sines, which gives $u\equiv0$ and contradicts the boundary condition $u(1,t)=100$. The sine eigenfunctions vanish at both ends, so the nonzero steady state must be subtracted before the series is written.

### P5. A steel slab has $k = 50$ W/(m·K), $\rho = 7800$ kg/m$^3$ and $c_p = 500$ J/(kg·K), and is 0.1 m thick with both faces held at $0\,^\circ$C. Find $\alpha$ and the time for the fundamental mode to decay to 10% of its initial amplitude.

**Given:** $k = 50$ W/(m·K); $\rho = 7800$ kg/m$^3$; $c_p = 500$ J/(kg·K); $L = 0.1$ m

**Solution:**

1. $\alpha=k/(\rho c_p)=50/(7800\cdot 500)=50/(3.9\times10^6)=1.282\times10^{-5}$ m$^2$/s
2. Fundamental decay rate: $\alpha\pi^2/L^2=(1.282\times10^{-5})(9.870)/0.01$
3. Numerator: $1.282\times10^{-5}\cdot 9.870=1.265\times10^{-4}$
4. Divide by $L^2=0.01$: rate $=1.265\times10^{-2}$ s$^{-1}$, so the fundamental time constant is $\tau_1=79.0$ s
5. Decay to 10%: $e^{-rt}=0.10\Rightarrow t=\ln(10)/r=2.3026/1.265\times10^{-2}$
6. $t=182$ s (about 3 minutes), and by then modes $n\ge2$ have decayed by at least a further factor $e^{-3(2.3026)}\approx10^{-3}$

> [!success]- Answer
> **$\alpha = 1.28\times10^{-5}$ m$^2$/s and $t \approx 182$ s for the fundamental to reach 10%**

> [!warning] Trap
> Using $k$ itself as the diffusivity. $\alpha = k/(\rho c_p)$ is of order $10^{-5}$ m$^2$/s for metals, and using $k=50$ inflates the decay rate by six orders of magnitude — the slab would appear to cool in microseconds.

## Traps & Exam Notes

- **Treating the time equation as second order.** $u_t = \alpha u_{xx}$ gives $T' = -\alpha\lambda T$ and pure exponential decay. Copying the wave equation's $T''$ produces oscillating temperatures that the physics forbids.
- **Dropping $\alpha$, or putting it in the wrong place.** The mode decay rate is $\alpha n^2\pi^2/L^2$; writing $e^{-n^2\pi^2t/L^2}$ sets $\alpha = 1$ silently, and writing $e^{-\alpha n^2\pi^2t/L}$ forgets to square $L$.
- **Assuming all modes decay at the same rate.** Mode $n$ decays $n^2$ times faster than the fundamental; after a short time only $n=1$ is visible.
- **Expanding an inhomogeneous problem without subtracting the steady state.** If an end is held at a nonzero temperature, $u(x,0)=f(x)$ is *not* the series data; the remainder $f(x)-u_{ss}(x)$ is. Otherwise the boundary condition is violated at every $t$.
- **Using sines for insulated ends.** Zero-flux ends need cosines, including the constant $n=0$ mode; the steady state is then the average temperature, not zero.
- **Confusing $k$ with $\alpha$.** Conductivity is W/(m·K); diffusivity is m$^2$/s. In an exponent only the diffusivity makes the argument dimensionless.
- **Expecting finite-time extinction.** The exponential never reaches zero in finite time; problems that ask 'when is it zero' have no finite answer, and 'when does it drop to 10%' is the well-posed version.

## See Also

- [[12_PDE_Wave_Equation_1D]]
- [[14_PDE_Laplace_Equation_2D]]
- [[11_Fourier_Series_Trigonometric_and_Exponential]]
- [[13_Fourier_Transform_Properties]]

---

[[12_PDE_Wave_Equation_1D|⬅ 12]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[14_PDE_Laplace_Equation_2D|14 ➡]]
