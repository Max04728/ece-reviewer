---
id: MATH-03-12
title: "PDE Wave Equation 1D"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[11_Fourier_Series_Trigonometric_and_Exponential]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — PDE Wave Equation 1D

> [!abstract] Scope
> Solve the one-dimensional wave equation on a finite string by separation of variables, and determine the Fourier coefficients from the initial displacement and velocity.

## Core Concept

> [!tip] Intuition
> A stretched string supports travelling waves, but pinning both ends makes those waves reflect and interfere with themselves. Only standing waves that fit an integer number of half-wavelengths between the pins survive, and the general motion is a weighted sum — a Fourier sine series — of those normal modes.

**The problem.** For a uniform string of length $L$ under tension $T$ with linear density $\mu$, transverse displacement $u(x,t)$ satisfies $u_{tt} = c^2u_{xx}$ with wave speed $c = \sqrt{T/\mu}$, on $0<x<L$, $t>0$. A well-posed problem needs two boundary conditions (here the pinned ends $u(0,t)=u(L,t)=0$) and two initial conditions (the initial shape $u(x,0)=f(x)$ and the initial velocity $u_t(x,0)=g(x)$). The PDE alone has infinitely many solutions; the auxiliary conditions select one, and getting their roles right is the whole skill.

**Separation of variables and the sign of the constant.** Substitute $u = X(x)T(t)$ into $u_{tt}=c^2u_{xx}$ and divide by $c^2XT$ to get $\frac{T''}{c^2T} = \frac{X''}{X}$. The left side depends only on $t$ and the right only on $x$, so both must equal a common constant. Choosing that constant as $-\lambda$ (negative) is forced by the boundary conditions: it gives $X''+\lambda X = 0$, whose solutions are sines and cosines that can vanish at two distinct points $0$ and $L$. The positive choice is different:
$$X = Ae^{\sqrt{\lambda}x}+Be^{-\sqrt{\lambda}x}$$
This vanishes at both ends only for $A=B=0$ — the trivial solution. This is *why* a vibrating string has discrete frequencies at all.

**The eigenvalue problem and the modes.** With $X(0)=X(L)=0$, nontrivial solutions exist only for $\lambda_n = (n\pi/L)^2$, $n = 1,2,3,\dots$, with $X_n(x) = \sin\frac{n\pi x}{L}$. The corresponding time equation $T''+\frac{n^2\pi^2c^2}{L^2}T = 0$ oscillates at $\omega_n = \frac{n\pi c}{L}$ rad/s, i.e. $f_n = \frac{nc}{2L}$ Hz. Mode $n$ has $n$ half-wavelengths across the string, $n-1$ interior nodes, and a nodal set that never moves. The fact that the spatial eigenfunctions are orthogonal is what makes the coefficients extractable one at a time rather than by solving a coupled system:
$$\int_0^L\sin\frac{m\pi x}{L}\sin\frac{n\pi x}{L}dx = \frac{L}{2}\delta_{mn}$$

**The series solution and the coefficient formulas.** Superposing the modes gives the series solution:
$$u(x,t) = \sum_{n=1}^{\infty}\left(A_n\cos\frac{n\pi ct}{L}+B_n\sin\frac{n\pi ct}{L}\right)\sin\frac{n\pi x}{L}$$
Setting $t=0$ gives $f(x) = \sum A_n\sin\frac{n\pi x}{L}$, so $A_n$ is a Fourier sine coefficient:
$$A_n = \frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}dx$$
Differentiating with respect to $t$ and setting $t=0$ gives the velocity series:
$$g(x) = \sum \frac{n\pi c}{L}B_n\sin\frac{n\pi x}{L}$$
so the velocity coefficients are:
$$B_n = \frac{2}{n\pi c}\int_0^L g(x)\sin\frac{n\pi x}{L}dx$$
The extra factor $\frac{L}{n\pi c} = \frac{1}{\omega_n}$ is the single most-forgotten item in the topic: a displacement initial condition fixes $A_n$ directly, but a velocity initial condition fixes $\omega_nB_n$, not $B_n$.

**Reading the physics off the answer, and when the method fails.** Each term is a standing wave whose time factor can be written $C_n\cos(\omega_nt-\phi_n)$: the string never travels, it rings. If $g=0$ the string is released from rest and every $B_n=0$; if $f=0$ it is struck from equilibrium and every $A_n=0$. The infinite-line equivalent is D'Alembert's solution:
$$u = \frac12[f(x-ct)+f(x+ct)]+\frac{1}{2c}\int_{x-ct}^{x+ct}g(s)\,ds$$
which shows the same motion as two travelling pulses. Separation of variables requires a linear PDE with homogeneous boundary conditions on a nice domain; inhomogeneous boundary conditions (a driven end, $u(L,t)=h(t)$) must first be removed by subtracting a steady-state or particular function, non-constant coefficients need other techniques, and nonlinear wave equations are outside the method entirely.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| 1D wave equation | $u_{tt} = c^2 u_{xx}$ | c is the wave speed in m/s, not a frequency. Valid for small transverse displacements of a uniform string. |
| Wave speed | $c = \sqrt{\frac{T}{\mu}}$ | T in newtons and mu in kg/m give c in m/s. Doubling the tension multiplies c by sqrt(2), not by 2. |
| Separation ansatz | $u(x,t) = X(x)T(t)$ | Only valid for linear homogeneous PDEs with homogeneous boundary conditions. |
| Eigenvalue problem | $X'' + \lambda X = 0, \quad X(0) = X(L) = 0$ | The negative separation constant. The positive choice yields only the trivial solution. |
| Eigenvalues and eigenfunctions | $\lambda_n = \left(\frac{n\pi}{L}\right)^2, \quad X_n = \sin\frac{n\pi x}{L}$ | n = 1, 2, 3, ... The eigenvalue is proportional to 1/L^2, so a shorter string has higher modes. |
| Mode frequency | $f_n = \frac{nc}{2L}, \quad \omega_n = \frac{n\pi c}{L}$ | The fundamental is n = 1. Frequencies are integer multiples of f_1, which is why a string sounds harmonic. |
| Series solution | $u = \sum_{n=1}^{\infty}\left(A_n\cos\frac{n\pi ct}{L}+B_n\sin\frac{n\pi ct}{L}\right)\sin\frac{n\pi x}{L}$ | Superposition of the normal modes; valid because the PDE and BCs are linear and homogeneous. |
| Coefficients from initial shape | $A_n = \frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx$ | Requires f(x), the initial displacement. For symmetric shapes only odd n survive. |
| Coefficients from initial velocity | $B_n = \frac{2}{n\pi c}\int_0^L g(x)\sin\frac{n\pi x}{L}\,dx$ | The 1/(n*pi*c) factor is mandatory: it comes from differentiating the time factor. |
| d'Alembert solution | $u = \frac{1}{2}[f(x-ct)+f(x+ct)] + \frac{1}{2c}\int_{x-ct}^{x+ct}g(s)\,ds$ | Infinite-line form. Each initial profile splits into two half-amplitude waves travelling in opposite directions. |
| Node spacing | $\Delta x = \frac{L}{n}$ | Mode n has n-1 interior nodes. Doubling the mode number halves the node spacing. |

## Worked Problems

### P1. Separate $u_{tt} = 4u_{xx}$ on $0<x<\pi$ with $u(0,t)=u(\pi,t)=0$, and write the general series solution.

**Given:** $u_{tt} = 4u_{xx}$; $L = \pi$; $c = 2$; fixed ends

**Solution:**

1. Substitute $u=X(x)T(t)$: $XT''=4X''T$, so $T''/(4T)=X''/X=-\lambda$
2. Spatial problem: $X''+\lambda X=0$ with $X(0)=X(\pi)=0$
3. Nontrivial solutions require $\lambda=n^2$, giving $X_n=\sin nx$ for $n=1,2,3,\dots$
4. Check the alternatives: $\lambda=0$ gives $X=ax+b$ and only $X=0$ works; $\lambda<0$ gives exponentials that cannot vanish at both ends
5. Time problem for each $n$: $T''+4n^2T=0\Rightarrow T_n=A_n\cos 2nt+B_n\sin 2nt$
6. Superpose: $u(x,t)=\sum_{n=1}^{\infty}(A_n\cos 2nt+B_n\sin 2nt)\sin nx$
7. Mode frequencies: $\omega_n=2n$ rad/s, so $f_n=n/\pi$ Hz and the fundamental period is $\pi$ s

> [!success]- Answer
> **$u(x,t) = \sum_{n=1}^{\infty}(A_n\cos 2nt + B_n\sin 2nt)\sin nx$, with $f_n = \dfrac{n}{\pi}$ Hz**

> [!warning] Trap
> Choosing the separation constant as $+\lambda$ and carrying exponentially growing spatial solutions. With $c=2$ and $L=\pi$ the time factor uses $\omega_n = n\pi c/L = 2n$, so writing $\cos nt$ halves every frequency.

### P2. A string of length $\pi$ with $c = 2$ is released from rest with initial shape $u(x,0) = 3\sin 2x$. Find $u(x,t)$.

**Given:** $L = \pi$; $c = 2$; $u(x,0) = 3\sin 2x$; $u_t(x,0) = 0$

**Solution:**

1. General solution with fixed ends: $u=\sum(A_n\cos 2nt+B_n\sin 2nt)\sin nx$
2. Released from rest means $u_t(x,0)=0$, so every $B_n=0$
3. Set $t=0$: $\sum A_n\sin nx=3\sin 2x$
4. By orthogonality (or by inspection) only $n=2$ is present, so $A_2=3$ and all other $A_n=0$
5. Substitute into the $n=2$ term: $u=3\sin 2x\cos(2\cdot 2\cdot t)$
6. Frequency check: mode 2 has $\omega_2=2(2)=4$ rad/s, so $f_2=4/(2\pi)=0.637$ Hz, and the node at $x=\pi/2$ never moves

> [!success]- Answer
> **$u(x,t) = 3\sin 2x\cos 4t$; a pure second mode at $\omega = 4$ rad/s**

> [!warning] Trap
> Writing $\cos 2t$ because the coefficient of $u_{xx}$ is 4. The time frequency is $\omega_n = n\pi c/L = 2n$, so mode $n=2$ oscillates at 4 rad/s; using 2 gives a string vibrating at half the correct rate.

### P3. A string of length $\pi$ with $c = 1$ has fixed ends and initial shape $u(x,0) = x(\pi-x)$, with $u_t(x,0)=0$. Determine the coefficients $A_n$ and write the solution.

**Given:** $L = \pi$; $c = 1$; $f(x) = x(\pi - x)$; $g(x) = 0$

**Solution:**

1. With $g=0$ all $B_n=0$, and $A_n=(2/\pi)\int_0^{\pi}x(\pi-x)\sin nx\,dx$
2. Expand the integrand: $I=\pi\int_0^{\pi}x\sin nx\,dx-\int_0^{\pi}x^2\sin nx\,dx$
3. Standard results: $\int_0^{\pi}x\sin nx\,dx=\pi(-1)^{n+1}/n$ and $\int_0^{\pi}x^2\sin nx\,dx=-\pi^2(-1)^n/n+2((-1)^n-1)/n^3$
4. Substitute: $I=\pi^2(-1)^{n+1}/n+\pi^2(-1)^n/n-2((-1)^n-1)/n^3$
5. The first two terms cancel: $\pi^2(-1)^n(-1+1)/n=0$, leaving $I=-2((-1)^n-1)/n^3=2(1-(-1)^n)/n^3$
6. So $I=4/n^3$ for odd $n$ and $I=0$ for even $n$; hence $A_n=(2/\pi)(4/n^3)=8/(\pi n^3)$ for odd $n$
7. Sanity check at $x=\pi/2$, $t=0$: $(8/\pi)(1-1/27+1/125-\dots)=2.546(0.963)=2.45$, close to the exact peak $\pi^2/4=2.467$

> [!success]- Answer
> **$u(x,t) = \sum_{n\ \mathrm{odd}} \dfrac{8}{\pi n^3}\sin(nx)\cos(nt)$**

> [!warning] Trap
> Assuming all $A_n$ are nonzero and carrying even terms. The shape $x(\pi-x)$ is symmetric about the midpoint, so only odd modes appear and the coefficients fall off as $n^{-3}$; even-$n$ terms integrate to exactly zero.

### P4. A string of length $\pi$ with $c = 1$ and fixed ends starts from equilibrium with uniform initial velocity $u_t(x,0) = 5$ m/s. Find $B_n$ and $u(x,t)$.

**Given:** $L = \pi$; $c = 1$; $f(x) = 0$; $g(x) = 5$ m/s

**Solution:**

1. From $f=0$, every $A_n=0$
2. Velocity condition: $B_n=\frac{2}{n\pi c}\int_0^{\pi}5\sin nx\,dx$ with $c=1$
3. The integral is $\int_0^{\pi}5\sin nx\,dx=5(1-(-1)^n)/n$
4. So $B_n=\frac{2}{n\pi}\cdot\frac{5(1-(-1)^n)}{n}=\frac{10(1-(-1)^n)}{n^2\pi}$
5. For odd $n$, $1-(-1)^n=2$, giving $B_n=20/(n^2\pi)$; for even $n$, $B_n=0$
6. Substitute: $u(x,t)=\sum_{n\ \mathrm{odd}}\frac{20}{n^2\pi}\sin(nx)\sin(nt)$
7. Check the velocity at $t=0$: $u_t=\sum_{odd}\frac{20}{n\pi}\sin(nx)$ and $\sum_{odd}\sin(nx)/n=\pi/4$, so $u_t=(20/\pi)(\pi/4)=5$ m/s as required

> [!success]- Answer
> **$B_n = \dfrac{20}{n^2\pi}$ for odd $n$ (zero for even $n$), so $u(x,t) = \sum_{n\ \mathrm{odd}}\dfrac{20}{n^2\pi}\sin(nx)\sin(nt)$**

> [!warning] Trap
> Forgetting the $1/(n\pi c)$ factor and setting $B_n$ equal to the Fourier coefficient of $g$. That error scales mode $n$ by $n\pi$, so the first mode is 3.14 times too large and every higher mode is worse.

### P5. A 2 m guitar-style string has tension $T = 100$ N and linear density $\mu = 0.01$ kg/m. Find the wave speed and the first three natural frequencies.

**Given:** $T = 100$ N; $\mu = 0.01$ kg/m; $L = 2$ m

**Solution:**

1. $c=\sqrt{T/\mu}=\sqrt{100/0.01}=\sqrt{10^4}=100$ m/s
2. Fundamental: $f_1=c/(2L)=100/4=25$ Hz
3. Second mode: $f_2=2f_1=50$ Hz
4. Third mode: $f_3=3f_1=75$ Hz
5. Wavelength check for the fundamental: $\lambda_1=2L=4$ m and $f_1=c/\lambda_1=100/4=25$ Hz
6. If the tension were quadrupled to 400 N, $c$ would double to 200 m/s and every frequency would double

> [!success]- Answer
> **$c = 100$ m/s, $f_1 = 25$ Hz, $f_2 = 50$ Hz, $f_3 = 75$ Hz**

> [!warning] Trap
> Using $f_1 = c/L = 50$ Hz. The fundamental wavelength on a string fixed at both ends is $2L$, so $f_1 = c/(2L)$; the $c/L$ form applies to a pipe open at one end or to a string fixed at only one end.

## Traps & Exam Notes

- **Wrong sign of the separation constant.** Choosing $X''-\lambda X=0$ gives exponentials and forces $X\equiv0$ under $X(0)=X(L)=0$. The oscillatory choice $-\lambda$ is the one the boundary conditions permit.
- **Mixing the roles of boundary and initial conditions.** Boundary conditions fix the spatial eigenfunctions $\sin(n\pi x/L)$ and hence the allowed frequencies; initial conditions fix the coefficients $A_n, B_n$. Imposing $u(x,0)=f(x)$ on $X(x)$ alone produces nonsense.
- **Dropping $1/(n\pi c)$ in $B_n$.** A velocity initial condition determines $\omega_nB_n$, so $B_n = \frac{2}{n\pi c}\int g\sin$. The displacement coefficients have no such factor, and mixing the two formulas scales modes by $n$.
- **Using $c$ as a frequency.** $c$ is a speed in m/s; the mode frequencies are $nc/(2L)$ in Hz. Substituting $c$ where $f_1$ belongs is off by the factor $2L$.
- **Forgetting the mode index inside the time factor.** Mode $n$ oscillates at $\omega_n = n\pi c/L$; writing $\cos(\pi ct/L)$ for every term freezes all modes at the fundamental frequency and destroys the waveform's motion.
- **Assuming a nonzero mean is possible.** With $u(0,t)=u(L,t)=0$ the sine series contains no $n=0$ term, so the average displacement is always zero. A problem giving a nonzero average over fixed ends is inconsistent.
- **Applying separation to inhomogeneous boundary conditions.** If $u(L,t)=h(t)\neq0$, the $\sin(n\pi x/L)$ eigenfunctions no longer satisfy the boundary data; subtract the steady-state (or a suitable particular) solution first and expand the remainder.

## See Also

- [[13_PDE_Heat_Equation_1D]]
- [[14_PDE_Laplace_Equation_2D]]
- [[11_Fourier_Series_Trigonometric_and_Exponential]]
- [[12_Half-Range_Expansions_and_Symmetry]]

---

[[11_RLC_Circuit_Transients|⬅ 11]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[13_PDE_Heat_Equation_1D|13 ➡]]
