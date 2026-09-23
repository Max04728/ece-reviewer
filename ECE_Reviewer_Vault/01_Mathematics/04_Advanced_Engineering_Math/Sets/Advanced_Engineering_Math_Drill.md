---
title: "Advanced Engineering Math — Drill"
type: drill
area: 04_Advanced_Engineering_Math
part: 01_Mathematics
seed: 1
count: 8
pool: 97
updated: 2026-09-23
---

# Advanced Engineering Math — Practice Drill

**8 problems** drawn from a pool of 97 across 18 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 04_Advanced_Engineering_Math --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. Find the trigonometric Fourier series of the square wave $f(t) = 1$ for $0 < t < \pi$ and $-1$ for $\pi < t < 2\pi$, period $2\pi$.

**Given:** period T = 2pi; omega_0 = 1; odd function

> [!success]- Answer
> **$f(t) = \dfrac{4}{\pi}\left(\sin t + \dfrac{\sin 3t}{3} + \dfrac{\sin 5t}{5} + \cdots\right)$**

> [!warning] Trap
> Integrating for the cosine coefficients despite the function being odd. Recognising the symmetry saves the work and prevents a nonzero a_n from an arithmetic slip.

<sub>from MATH-04-11</sub>

### 2. Use the convolution theorem to find $f(t)$ for $F(s) = \dfrac{1}{s^{2}(s+1)}$, then verify the result by partial fractions.

**Given:** F(s) = (1/s^2) times (1/(s+1)); no decomposition needed if convolution is used

> [!success]- Answer
> **$f(t) = t - 1 + e^{-t}$ for $t\geq 0$**

> [!warning] Trap
> Using the same time variable in both factors, $\int_0^{t}\tau\,e^{-\tau}d\tau$, which gives $1-(t+1)e^{-t}$. At $t = 1$ that is $0.264$ instead of the correct $0.368$; the convolution kernel must always be the shifted factor $g(t-\tau)$.

<sub>from MATH-04-10</sub>

### 3. Find $\mathcal{L}\{3e^{-2t}u(t)\}$ and state its ROC.

**Given:** f(t) = 3e^{-2t}u(t); a = 2

> [!success]- Answer
> **$F(s) = \dfrac{3}{s+2}$, ROC $\mathrm{Re}\,s > -2$**

> [!warning] Trap
> Writing $\frac{3}{s-2}$ by treating $e^{-2t}$ as if its pole sat at $s=+2$. The pole is at $s=-a = -2$, and the ROC starts to the right of it.

<sub>from MATH-04-07</sub>

### 4. Find the Taylor series of $f(x) = \ln x$ about $x = 1$ and state its interval of convergence.

**Given:** f(x) = ln x; a = 1

> [!success]- Answer
> **$\ln x = \sum_{n=1}^{\infty}\frac{(-1)^{n+1}(x-1)^{n}}{n}$ on $0 < x \leq 2$**

> [!warning] Trap
> Expanding $\ln x$ as a Maclaurin series. $\ln 0$ is undefined, so no Maclaurin series exists; the expansion must be about a positive centre, here $x=1$.

<sub>from MATH-04-05</sub>

### 5. Find the rank of $N=\begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 6 & 8 \\ 1 & 0 & 1 & 2 \end{pmatrix}$ and state how many free variables its homogeneous system has.

**Given:** N is 3x4; rows (1,2,3,4), (2,4,6,8), (1,0,1,2)

> [!success]- Answer
> **$\mathrm{rank}(N)=2$; the homogeneous system has 2 free variables**

> [!warning] Trap
> Counting non-zero rows of the original matrix and answering 3, because 3 is also the number of rows and looks plausible. Rank counts pivots after reduction, not rows before it, and it can never exceed the smaller dimension.

<sub>from MATH-04-16</sub>

### 6. The square wave of problem 1 is truncated after the third harmonic. Estimate the Gibbs overshoot at the discontinuity as a percentage of the jump.

**Given:** truncated square wave; jump magnitude 2

> [!success]- Answer
> **About $9\%$ of the jump, i.e. a peak of roughly $1.18$ — and it does not shrink as more terms are added.**

> [!warning] Trap
> Expecting the overshoot to vanish with enough harmonics. The ripple narrows and moves closer to the discontinuity, but its amplitude converges to about 9 percent of the jump.

<sub>from MATH-04-11</sub>

### 7. Find $\mathcal{L}\{5\cos 3t\;u(t)\}$.

**Given:** f(t) = 5 cos 3t u(t); omega = 3 rad/s

> [!success]- Answer
> **$F(s) = \dfrac{5s}{s^{2}+9}$, ROC $\mathrm{Re}\,s > 0$**

> [!warning] Trap
> Swapping the sine and cosine numerators, i.e. answering $\frac{15}{s^{2}+9}$. The numerator $s$ is what makes the inverse a cosine rather than a sine.

<sub>from MATH-04-07</sub>

### 8. Find $\mathcal{L}\{(t-2)^{2}u(t-2)\}$.

**Given:** f(t-2) = (t-2)^2; a = 2

> [!success]- Answer
> **$F(s) = \dfrac{2e^{-2s}}{s^{3}}$**

> [!warning] Trap
> Expanding $(t-2)^{2} = t^{2}-4t+4$ and transforming the terms without the step function, then adding $e^{-2s}$ to only one of them. The delay factor multiplies the whole transform of the delayed function.

<sub>from MATH-04-08</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| MATH-04-01 | Complex Numbers, Euler and De Moivre | 5 |
| MATH-04-02 | Cauchy-Riemann and Analytic Functions | 5 |
| MATH-04-03 | Sequences and Convergence Tests | 5 |
| MATH-04-04 | Power Series Radius of Convergence | 5 |
| MATH-04-05 | Taylor and Maclaurin Series | 5 |
| MATH-04-06 | Truncation Error and Approximation | 5 |
| MATH-04-07 | Laplace Transform Pairs | 9 |
| MATH-04-08 | Shifting Theorems and Properties | 5 |
| MATH-04-09 | Unit Step, Dirac and Periodic Functions | 5 |
| MATH-04-10 | Inverse Laplace and Partial Fractions | 5 |
| MATH-04-11 | Fourier Series Trigonometric and Exponential | 10 |
| MATH-04-12 | Half-Range Expansions and Symmetry | 5 |
| MATH-04-13 | Fourier Transform Properties | 5 |
| MATH-04-14 | Bessel Functions | 5 |
| MATH-04-15 | Legendre Polynomials | 5 |
| MATH-04-16 | Matrices, Determinants, Rank and Inversion | 5 |
| MATH-04-17 | Cramer’s Rule and Linear Systems | 4 |
| MATH-04-18 | Eigenvalues and Eigenvectors | 4 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
