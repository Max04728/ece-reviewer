---
title: "Differential Equations — Drill"
type: drill
area: 03_Differential_Equations
part: 01_Mathematics
seed: 1
count: 8
pool: 79
updated: 2026-09-23
---

# Differential Equations — Practice Drill

**8 problems** drawn from a pool of 79 across 14 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 03_Differential_Equations --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. On the square $0<x<\pi$, $0<y<\pi$, solve Laplace's equation with $u(x,\pi)=100\,^\circ$C (constant) and the other three sides at $0\,^\circ$C. Find the first two nonzero terms and the centre temperature.

**Given:** $a = b = \pi$; $u(x,\pi) = 100$ (constant); other three sides at $0\,^\circ$C

> [!success]- Answer
> **$u(x,y) = \sum_{n\ \mathrm{odd}}\dfrac{400}{n\pi\sinh(n\pi)}\sin(nx)\sinh(ny)$, and $u(\pi/2,\pi/2) = 25\,^\circ$C**

> [!warning] Trap
> Keeping only $n=1$ and reporting $25.4\,^\circ$C. The $n=3$ term is $-0.38\,^\circ$C and is exactly what brings the sum to the symmetry value of 25; truncating after one term breaks the mean-value check that the problem is designed to test.

<sub>from MATH-03-14</sub>

### 2. A series RLC circuit has $L = 1$ H, $C = 0.1$ F and $R = 2\ \Omega$. Initially $q(0) = 0.1$ C with $i(0) = 0$. Find the damped frequency, the damping ratio, and $q(t)$.

**Given:** $L = 1$ H; $C = 0.1$ F; $R = 2\ \Omega$; $q(0) = 0.1$ C; $i(0) = 0$

> [!success]- Answer
> **$q(t) = e^{-t}(0.1\cos 3t + 0.0333\sin 3t)$ C, $\omega_d = 3$ rad/s, $\zeta = 0.316$**

> [!warning] Trap
> Computing $\omega_d$ as $\omega_0-\alpha = 3.162-1 = 2.162$ rad/s. The relation is $\omega_d=\sqrt{\omega_0^2-\alpha^2}$ — a Pythagorean subtraction of the squares, not of the frequencies.

<sub>from MATH-03-11</sub>

### 3. A body at $100\,^\circ\mathrm{C}$ is placed in a room at $25\,^\circ\mathrm{C}$ and cools to $70\,^\circ\mathrm{C}$ in $10$ minutes. Find the cooling constant and the time needed to reach $40\,^\circ\mathrm{C}$.

**Given:** T_0 = 100 °C; T_m = 25 °C; T(10) = 70 °C

> [!success]- Answer
> **$k=0.0511$ min$^{-1}$ and $t=31.5$ minutes.**

> [!warning] Trap
> Substituting $T=100$ instead of $T-T_m=75$ into the exponential. Newton's law governs the *excess* over ambient; using absolute temperatures destroys the asymptote and produces a $k$ that is wrong by the factor $T_m$.

<sub>from MATH-03-05</sub>

### 4. Solve $y'' - 2y' + y = \dfrac{e^{x}}{x}$.

**Given:** $y''-2y'+y=e^{x}/x$; double root $r=1$

> [!success]- Answer
> **$y = (c_1 + c_2x)e^{x} + xe^{x}\ln|x| - xe^{x}$**

> [!warning] Trap
> Using $W = e^{2x}$ with the wrong sign convention, or forgetting that $y_2 = xe^{x}$ (not $e^{x}$) for a double root. Also note $e^{x}/x$ is not in any finite trial family, so undetermined coefficients cannot start.

<sub>from MATH-03-09</sub>

### 5. Solve $xy'+y=x^2$ with $y(1)=2$.

**Given:** x y' + y = x^2; y(1) = 2

> [!success]- Answer
> **$y=\dfrac{x^2}{3}+\dfrac{5}{3x}$ for $x>0$.**

> [!warning] Trap
> Reading $P=1$ off the un-normalised $xy'+y=x^2$. That gives $\mu=e^{x}$ and a solution that does not satisfy the ODE. Normalise first: divide by the coefficient of $y'$.

<sub>from MATH-03-02</sub>

### 6. A 1 kg mass with $c = 4$ N·s/m and $k = 25$ N/m is driven by $F(t) = 100\cos 3t$ N. Find the steady-state amplitude and phase, and the damping ratio.

**Given:** $m = 1$ kg; $c = 4$ N·s/m; $k = 25$ N/m; $F(t) = 100\cos 3t$ N

> [!success]- Answer
> **$x_p = 5\cos(3t - 36.87^\circ)$ m, with $\zeta = 0.4$ and $\omega_d = 4.58$ rad/s**

> [!warning] Trap
> Using $c = 4$ rather than $c\omega = 12$ in the denominator. At 3 rad/s the dashpot contributes $4(3) = 12$, and ignoring it gives $X = 100/16 = 6.25$ m — 25% too large. Note also that $\omega = 3$ is not the peak frequency $\omega_r = 4.12$ rad/s.

<sub>from MATH-03-10</sub>

### 7. Solve $(2xy-3)\,dx+(x^2+4y)\,dy=0$ with $y(0)=1$.

**Given:** M = 2xy - 3; N = x^2 + 4y; y(0) = 1

> [!success]- Answer
> **$x^2y-3x+2y^2=2$.**

> [!warning] Trap
> Treating the constant of the x-integration as a number. It is $g(y)$, a function of $y$; setting it to a constant immediately makes $F_y=N$ impossible to satisfy unless $N$ happens to be independent of $y$.

<sub>from MATH-03-03</sub>

### 8. A series $RC$ circuit has $R=2\,\mathrm{k}\Omega$, $C=500\,\mu\mathrm{F}$ and is switched onto a $10\,\mathrm{V}$ DC source at $t=0$ with the capacitor uncharged. Find $v_C(t)$ and the time to reach $5\,\mathrm{V}$.

**Given:** R = 2 kΩ; C = 500 µF; V_s = 10 V; v_C(0) = 0

> [!success]- Answer
> **$v_C(t)=10\left(1-e^{-t}\right)$ V, reaching $5$ V at $t=RC\ln 2=0.693$ s.**

> [!warning] Trap
> Using $\tau=R/C$ instead of $RC$, or leaving $C$ in $\mu$F and $R$ in k$\Omega$ without converting. $2000\times500\times10^{-6}=1.0$ s; the same product without the prefixes gives $1\times10^{6}$, off by $10^{6}$.

<sub>from MATH-03-02</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| MATH-03-01 | Separation of Variables | 10 |
| MATH-03-02 | Linear First Order and Bernoulli | 10 |
| MATH-03-03 | Exact Equations and Integrating Factors | 5 |
| MATH-03-04 | Homogeneous Equations and Substitutions | 5 |
| MATH-03-05 | Growth, Decay and Newton’s Cooling | 5 |
| MATH-03-06 | Mixtures and Orthogonal Trajectories | 5 |
| MATH-03-07 | Higher Order Homogeneous Auxiliary Equation | 5 |
| MATH-03-08 | Undetermined Coefficients | 5 |
| MATH-03-09 | Variation of Parameters | 4 |
| MATH-03-10 | Mass-Spring-Damper Systems | 5 |
| MATH-03-11 | RLC Circuit Transients | 5 |
| MATH-03-12 | PDE Wave Equation 1D | 5 |
| MATH-03-13 | PDE Heat Equation 1D | 5 |
| MATH-03-14 | PDE Laplace Equation 2D | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
