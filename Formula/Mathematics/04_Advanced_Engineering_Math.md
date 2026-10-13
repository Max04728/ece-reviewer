---
title: Advanced Engineering Math
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 19
---

## Part A — Complex Analysis and Series

### 1. Complex Numbers, Euler and De Moivre

**Rectangular, polar and exponential ★**

$$z=x+jy,\qquad z=r(\cos\theta+j\sin\theta)=re^{j\theta}$$

$$r=\lvert z\rvert=\sqrt{x^2+y^2},\qquad \theta=\arg z=\operatorname{atan2}(y,x),\qquad j^2=-1$$

**Quadrant correction for the argument ★** — $\tan^{-1}(y/x)$ alone returns a Quadrant-I/IV value and is **wrong** for $x<0$.

$$\theta=\begin{cases}\tan^{-1}\frac{y}{x}, & x>0\\[2pt] \tan^{-1}\frac{y}{x}+180^{\circ}, & x<0\end{cases}\qquad \text{Quadrant I}\ +\theta,\ \text{II}\ 180^{\circ}-\lvert\theta\rvert,\ \text{III}\ \theta-180^{\circ},\ \text{IV}\ -\theta$$

**Principal value:** $-\pi<\theta\le\pi$ (or $0\le\theta<2\pi$); $\arg z$ is multivalued by $\pm2\pi k$, the principal argument is single-valued.

**Conjugate, modulus and division**

$$\bar z=x-jy,\qquad z\bar z=\lvert z\rvert^2,\qquad \frac{z_1}{z_2}=\frac{z_1\bar z_2}{\lvert z_2\rvert^2}$$

**Euler's formula ★**

$$e^{j\theta}=\cos\theta+j\sin\theta,\qquad \cos\theta=\frac{e^{j\theta}+e^{-j\theta}}{2},\qquad \sin\theta=\frac{e^{j\theta}-e^{-j\theta}}{2j}$$

**De Moivre's theorem ★**

$$z^{n}=r^{n}\big(\cos n\theta+j\sin n\theta\big)=r^ne^{jn\theta}$$

$$\sqrt[n]{z}=r^{1/n}e^{j(\theta+2\pi k)/n},\qquad k=0,1,\dots,n-1$$

**Logarithm and powers**

$$\ln z=\ln r+j(\theta+2k\pi),\qquad z^{w}=e^{w\ln z}$$

**Polar arithmetic**

$$z_1z_2=r_1r_2e^{j(\theta_1+\theta_2)},\qquad \frac{z_1}{z_2}=\frac{r_1}{r_2}e^{j(\theta_1-\theta_2)}$$

**Conditions:** $x,y\in\mathbb{R}$, $j^{2}=-1$, $r=\lvert z\rvert\ge0$; the argument must be quadrant-corrected with $\theta=\operatorname{atan2}(y,x)$ — add $180^{\circ}$ when $x<0$; $z\neq0$ is required for $\arg z$, $\ln z$ and division; De Moivre and the $n$-th root require $n\in\mathbb{Z}$.

> [!tip] High-yield ★
> $\sqrt[n]{z}$ yields exactly $n$ distinct roots equally spaced by $2\pi/n$ on a circle of radius $r^{1/n}$. Exam items usually ask for the product/sum of all roots — by symmetry it is $(-1)^{n+1}$ times the constant term.

---

### 2. Cauchy-Riemann and Analytic Functions

**Analyticity ★**

$$\frac{\partial u}{\partial x}=\frac{\partial v}{\partial y},\qquad \frac{\partial u}{\partial y}=-\frac{\partial v}{\partial x}\quad \text{(★)}$$

![](https://www.youtube.com/watch?v=Ico7k2QlPH8)

*Video: Cauchy-Riemann Equations Explained — TheMathCoach, 6:05*

**Derivative**

$$f'(z)=\frac{\partial u}{\partial x}+j\frac{\partial v}{\partial x}=\frac{\partial v}{\partial y}-j\frac{\partial u}{\partial y}$$

**Polar form CR** — $z=re^{j\theta}$:

$$\frac{\partial u}{\partial r}=\frac1r\frac{\partial v}{\partial\theta},\qquad \frac{1}{r}\frac{\partial u}{\partial\theta}=-\frac{\partial v}{\partial r}$$

**Harmonic conjugates** — both $u$ and $v$ satisfy Laplace's equation:

$$\nabla^2u=0,\qquad \nabla^2v=0,\qquad f(z)=\int u_x\,dx - u_y\,dy + jv$$

**Cauchy's integral theorem and formula ★**

$$\oint_C f(z)\,dz=0,\qquad \oint_C\frac{f(z)}{z-z_0}dz=2\pi j f(z_0)$$

$$\oint_C\frac{f(z)}{(z-z_0)^{n+1}}dz=\frac{2\pi j}{n!}f^{(n)}(z_0)\quad \text{(generalized)}$$


**Residue theorem**

$$\oint_C f(z)dz=2\pi j\sum_k \operatorname{Res}_{z=z_k}f(z),\qquad \operatorname{Res}_{z=z_0}f=\lim_{z\to z_0}(z-z_0)f(z)$$

**Conditions:** $f(z)=u(x,y)+jv(x,y)$ satisfies CR equations and partials are continuous; $f$ analytic inside and on simple closed $C$.

> [!warning] Exam trap
> $u=x^2-y^2,\ v=2xy$ satisfies CR, but $u=x^2+y^2$ does **not**. Always test the pair — a function that "looks analytic" is not.

---

### 3. Sequences and Convergence Tests

**Sequence limit** — $\lim_{n\to\infty}a_n=L$; series $\sum a_n$ converges if the partial sums $S_N=\sum_{n=1}^{N}a_n$ converge.

**Divergence test ★**

$$\lim_{n\to\infty}a_n\neq0 \Rightarrow \sum a_n\ \text{diverges}$$

**Geometric and p-series ★**

$$\sum_{n=0}^{\infty}ar^{n}=\frac{a}{1-r},\ \lvert r\rvert<1;\qquad \sum_{n=1}^{\infty}\frac{1}{n^{p}}\ \text{converges}\iff p>1$$

**Test summary**

| Test | Condition for convergence |
|---|---|
| Integral | $\int_1^{\infty}f(x)dx$ converges, $f$ positive decreasing |
| Comparison | $0\le a_n\le b_n$, $\sum b_n$ converges |
| Limit comparison | $\lim\frac{a_n}{b_n}=c$, $0<c<\infty$ (same behaviour) |
| Ratio ★ | $\lim\left\lvert\frac{a_{n+1}}{a_n}\right\rvert=L<1$ converges, $L>1$ diverges |
| Root | $\lim\sqrt[n]{\lvert a_n\rvert}=L<1$ converges |
| Alternating (Leibniz) | $a_n$ decreasing, $\lim a_n=0$ |
| Absolute | $\sum\lvert a_n\rvert$ converges ⇒ $\sum a_n$ converges |

**Common benchmarks**

$$\sum\frac{1}{n}\ \text{diverges},\qquad \sum\frac{1}{n!}=e-1,\qquad \sum\frac{(-1)^{n+1}}{n}=\ln 2$$

**Conditions:** comparison and integral tests need eventually positive terms, and the integral test also needs $a_n$ eventually decreasing; the ratio and root tests are inconclusive at $L=1$; absolute convergence implies convergence but not conversely; power-series tests hold only inside $\lvert x-a\rvert<R$.

> [!warning] Exam trap
> The ratio test is **inconclusive** when $L=1$. Fall back to comparison or the integral test — never conclude convergence from $L=1$.

---

### 4. Power Series Radius of Convergence

**Power series ★**

$$\sum_{n=0}^{\infty}c_n(x-a)^{n},\qquad \text{converges for } \lvert x-a\rvert<R$$

**Radius of convergence ★**

$$R=\lim_{n\to\infty}\left\lvert\frac{c_n}{c_{n+1}}\right\rvert\qquad\text{or}\qquad \frac1R=\lim_{n\to\infty}\left\lvert\frac{c_{n+1}}{c_n}\right\rvert$$

$$R=\frac{1}{\limsup_{n\to\infty}\sqrt[n]{\lvert c_n\rvert}}\quad \text{(Cauchy–Hadamard)}$$

**Interval endpoints** — test $x=a\pm R$ separately with series tests; convergence may differ at each end.

**Term-by-term operations**

$$\frac{d}{dx}\sum c_n(x-a)^{n}=\sum n c_n(x-a)^{n-1},\qquad \int\sum c_n(x-a)^n dx=\sum\frac{c_n}{n+1}(x-a)^{n+1}+C$$

**Conditions:** inside $\lvert x-a\rvert<R$.

**Complex analogue** — the series converges on $\lvert z-z_0\rvert<R$ and diverges outside; $R$ = distance to nearest singularity.

> [!tip] High-yield ★
> Factorials ⇒ ratio test; $n$-th powers ⇒ root test. Both give $R$ in one line for nearly every board item.

---

### 5. Taylor and Maclaurin Series

![](https://www.youtube.com/watch?v=a58otkmkHtk)

*Video: Taylor and Maclaurin Series — Professor Dave Explains, 9:34*

**Taylor series ★**

$$f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x-a)^{n},\qquad \text{Maclaurin}=\text{Taylor at } a=0$$

**Conditions:** $f$ infinitely differentiable near $a$.

**Remainder (Lagrange)**

$$R_n(x)=\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1},\quad c\ \text{between } a \text{ and } x$$

**Standard expansions ★**

| Function | Series | Radius |
|---|---|---|
| $e^{x}$ | $1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\dots$ | $\infty$ |
| $\sin x$ | $x-\frac{x^3}{3!}+\frac{x^5}{5!}-\dots$ | $\infty$ |
| $\cos x$ | $1-\frac{x^2}{2!}+\frac{x^4}{4!}-\dots$ | $\infty$ |
| $\ln(1+x)$ | $x-\frac{x^2}{2}+\frac{x^3}{3}-\dots$ | $1$ |
| $\frac{1}{1-x}$ | $1+x+x^2+\dots$ | $1$ |
| $\frac{1}{1+x}$ | $1-x+x^2-\dots$ | $1$ |
| $(1+x)^{k}$ | $1+kx+\frac{k(k-1)}{2!}x^2+\dots$ | $1$ |
| $\tan^{-1}x$ | $x-\frac{x^3}{3}+\frac{x^5}{5}-\dots$ | $1$ |

**Euler's identity**

$$e^{j\theta}=\cos\theta+j\sin\theta,\qquad e^{j\pi}+1=0$$

**Multivariable Taylor (to first order)**

$$f(x,y)\approx f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$$

> [!warning] Exam trap
> The Maclaurin series of $\ln(1+x)$ is valid only for $-1<x\le1$; the alternating $\tan^{-1}x$ series only for $-1\le x\le1$. Stating $R=\infty$ costs the item.

---

### 6. Truncation Error and Approximation

**Taylor truncation error ★**

$$f(x)=P_n(x)+R_n(x),\qquad \lvert R_n\rvert\le \frac{M}{(n+1)!}\lvert x-a\rvert^{n+1},\quad M=\max\lvert f^{(n+1)}\rvert$$

**Linear and quadratic approximation**

$$f(x)\approx f(a)+f'(a)(x-a)$$

$$f(x)\approx f(a)+f'(a)(x-a)+\frac{f''(a)}{2}(x-a)^2$$

**Small-angle and series shortcuts ★**

$$\sin x\approx x,\quad \cos x\approx 1-\frac{x^2}{2},\quad \tan x\approx x,\quad e^{x}\approx 1+x,\quad \ln(1+x)\approx x$$

**Bounding the error term**

$$\lvert E\rvert \le \frac{f''(\xi)}{2}h^2\ \text{(trapezoidal)},\qquad \lvert E\rvert\le \frac{(b-a)^5}{180n^4}\max\lvert f^{(4)}\rvert\ \text{(Simpson)}$$

**Significant digits / relative error**

$$\varepsilon_{\text{rel}}=\frac{\lvert \text{true}-\text{approx}\rvert}{\lvert \text{true}\rvert},\qquad \text{digits} = -\log_{10}\varepsilon_{\text{rel}}$$

**Conditions:** error bounds assume the stated derivatives are continuous on $[a,b]$ with $\xi$ unknown in $(a,b)$; the alternating-series bound applies only when terms decrease monotonically to zero; relative-error digit counts use $\varepsilon<5\times10^{-n}$; truncation error excludes round-off.

> [!tip] High-yield ★
> Board items give $\lvert x\rvert<0.1$ and ask for the number of terms. Compare the next term against the tolerance — the alternating series error is bounded by the first omitted term.

---

## Part B — Transforms

### 7. Laplace Transform Pairs

![](https://www.youtube.com/watch?v=KqokoYr_h1A)

*Video: Intro to the Laplace Transform and Three Examples — Dr. Trefor Bazett, 12:05*

**Definition ★**

$$F(s)=\mathcal{L}\{f(t)\}=\int_0^{\infty}e^{-st}f(t)\,dt,\qquad s=\sigma+j\omega\ \text{(s}^{-1}\text{)}$$

**Conditions:** $f$ piecewise continuous, exponential order.

**Transform pairs ★**

| $f(t)$, $t\ge0$ | $F(s)=\mathcal{L}\{f(t)\}$ | ROC |
|---|---|---|
| $1$ | $\frac1s$ | $\sigma>0$ |
| $t$ | $\frac{1}{s^2}$ | $\sigma>0$ |
| $t^{n}$ | $\frac{n!}{s^{n+1}}$ | $\sigma>0$ |
| $e^{at}$ | $\frac{1}{s-a}$ | $\sigma>a$ |
| $t^{n}e^{at}$ | $\frac{n!}{(s-a)^{n+1}}$ | $\sigma>a$ |
| $\sin\omega t$ | $\frac{\omega}{s^2+\omega^2}$ | $\sigma>0$ |
| $\cos\omega t$ | $\frac{s}{s^2+\omega^2}$ | $\sigma>0$ |
| $e^{at}\sin\omega t$ | $\frac{\omega}{(s-a)^2+\omega^2}$ | $\sigma>a$ |
| $e^{at}\cos\omega t$ | $\frac{s-a}{(s-a)^2+\omega^2}$ | $\sigma>a$ |
| $\sinh\omega t$ | $\frac{\omega}{s^2-\omega^2}$ | $\sigma>\lvert\omega\rvert$ |
| $\cosh\omega t$ | $\frac{s}{s^2-\omega^2}$ | $\sigma>\lvert\omega\rvert$ |
| $t\sin\omega t$ | $\frac{2\omega s}{(s^2+\omega^2)^2}$ | $\sigma>0$ |
| $\delta(t)$ | $1$ | all $s$ |
| $u(t-a)$ | $\frac{e^{-as}}{s}$ | $\sigma>0$ |

> [!tip] High-yield ★
> Every transform item reduces to partial fractions plus this table. Memorize $t^{n}$ and the damped sinusoids — they cover RLC, control and vibrations in one shot.

---

### 8. Shifting Theorems and Properties

![](https://www.youtube.com/watch?v=_CvlSs0T8ok)

*Video: Laplace Transform: First Shifting Theorem — Dr Chris Tisdell, 7:42*

**Linearity, scaling, derivatives ★**

$$\mathcal{L}\{af+bg\}=aF(s)+bG(s),\qquad \mathcal{L}\{f(at)\}=\frac1aF\!\left(\frac{s}{a}\right),\ a>0$$

$$\mathcal{L}\{f'\}=sF(s)-f(0),\qquad \mathcal{L}\{f''\}=s^2F(s)-sf(0)-f'(0)$$

$$\mathcal{L}\{f^{(n)}\}=s^{n}F(s)-s^{n-1}f(0)-\dots-f^{(n-1)}(0)$$

**Integrals and multiplication**

$$\mathcal{L}\left\{\int_0^t f(\tau)d\tau\right\}=\frac{F(s)}{s},\qquad \mathcal{L}\left\{\frac{f(t)}{t}\right\}=\int_s^{\infty}F(\sigma)d\sigma$$

$$\mathcal{L}\{t^{n}f(t)\}=(-1)^{n}\frac{d^{n}F}{ds^{n}},\qquad \mathcal{L}\{tf(t)\}=-F'(s)$$

**First shifting (s-shift) ★**

$$\mathcal{L}\{e^{at}f(t)\}=F(s-a)$$

**Second shifting (t-shift) ★**

$$\mathcal{L}\{f(t-a)u(t-a)\}=e^{-as}F(s),\qquad \mathcal{L}^{-1}\{e^{-as}F(s)\}=f(t-a)u(t-a)$$

**Convolution and initial/final value ★**

$$\mathcal{L}\{f*g\}=F(s)G(s),\qquad (f*g)(t)=\int_0^t f(\tau)g(t-\tau)d\tau$$

$$f(0^+)=\lim_{s\to\infty}sF(s),\qquad f(\infty)=\lim_{s\to0}sF(s)\ \text{(if the limit exists)}$$

**Periodic function**

$$\mathcal{L}\{f(t)\}=\frac{1}{1-e^{-sT}}\int_0^{T}e^{-st}f(t)dt,\qquad f(t+T)=f(t)$$

**Conditions:** $f$ piecewise continuous and of exponential order with $\operatorname{Re}s>\sigma_0$; the $s$-shift takes real $a$; the $t$-shift requires $f(t-a)u(t-a)$, never $f(t-a)$ alone; differentiation theorems assume the transform of the derivative exists; the final-value theorem needs all poles of $sF(s)$ in the open LHP except at most a simple pole at $s=0$.

> [!warning] Exam trap
> The final value theorem requires all poles of $sF(s)$ in the open left half-plane (except a simple pole at $s=0$). Applying it to an unstable or oscillatory $F(s)$ gives a false answer.

---

### 9. Unit Step, Dirac and Periodic Functions

![](https://www.youtube.com/watch?v=yHzXAoFjU3k)

*Video: Laplace Transform of a Piecewise Function (Unit Step) — BriTheMathGuy, 6:27*

**Unit step (Heaviside)** — $u(t-a)=0$ for $t<a$, $1$ for $t\ge a$.

$$f(t)=g(t)+\big[h(t)-g(t)\big]u(t-a),\qquad \mathcal{L}\{u(t-a)\}=\frac{e^{-as}}{s},\ a>0$$

**Windowed (gate) function**

$$\mathcal{L}\{u(t-a)-u(t-b)\}=\frac{e^{-as}-e^{-bs}}{s},\qquad a<b$$

**Dirac delta ★**

$$\delta(t-a)=0\ (t\neq a),\qquad \int_{-\infty}^{\infty}\delta(t-a)dt=1,\qquad \int_{-\infty}^{\infty}\delta(t-a)g(t)dt=g(a)$$

$$\mathcal{L}\{\delta(t-a)\}=e^{-as},\qquad \mathcal{L}\{\delta(t)\}=1,\qquad \mathcal{L}\{\delta'(t)\}=s$$

**Ramp and related**

$$\mathcal{L}\{tu(t)\}=\frac{1}{s^2},\qquad \mathcal{L}\{(t-a)u(t-a)\}=\frac{e^{-as}}{s^2}$$

**Impulse response** — for $H(s)=Y(s)/X(s)$:

$$h(t)=\mathcal{L}^{-1}\{H(s)\},\qquad y(t)=h(t)*x(t)$$

**Conditions:** $u(t-a)=0$ for $t<a$ and $1$ for $t>a$, undefined at $t=a$; $\delta$ is a distribution defined only under an integral, with $\int\delta(t-a)\,dt=1$; the periodic transform needs $f(t+T)=f(t)$ with $T>0$; $y=h*x$ assumes zero initial conditions.

> [!tip] High-yield ★
> An impulse input "$x(t)=\delta(t)$" makes $Y(s)=H(s)$ directly — the output *is* the impulse response. This is the fastest route in state/transfer-function items.

---

### 10. Inverse Laplace and Partial Fractions

**Inverse definition**

$$f(t)=\mathcal{L}^{-1}\{F(s)\}=\frac{1}{2\pi j}\int_{c-j\infty}^{c+j\infty}F(s)e^{st}ds\quad \text{(Bromwich)}$$

**Partial-fraction strategy ★**

$$F(s)=\frac{N(s)}{D(s)}=\sum\frac{A_i}{s-p_i}+\sum\frac{B_js+C_j}{s^2+bs+c}$$

**Conditions:** $\deg N<\deg D$ (else divide first).

![](https://www.youtube.com/watch?v=c6YnYr8KsSo)

*Video: Inverse Laplace Transform via Partial Fractions — Dr. Trefor Bazett, 8:53*

**Distinct real poles**

$$A_i=\lim_{s\to p_i}(s-p_i)F(s)=\frac{N(p_i)}{D'(p_i)}$$

**Repeated poles** — order $m$ at $p$:

$$A_k=\frac{1}{(m-k)!}\lim_{s\to p}\frac{d^{m-k}}{ds^{m-k}}\big[(s-p)^{m}F(s)\big]$$

**Complex pair** — poles $-\alpha\pm j\omega$:

$$F(s)=\frac{As+B}{(s+\alpha)^2+\omega^2}\ \Rightarrow\ f(t)=e^{-\alpha t}\left(\frac{B-A\alpha}{\omega}\sin\omega t + A\cos\omega t\right)$$

**Common inverses**

$$\frac{1}{s(s+a)}\to\frac{1-e^{-at}}{a},\qquad \frac{1}{s^2+\omega^2}\to\frac{\sin\omega t}{\omega},\qquad \frac{s}{s^2+\omega^2}\to\cos\omega t$$

**Repeated real pole**

$$\frac{1}{(s+a)^2}\to te^{-at},\qquad \frac{1}{s^2(s+a)}\to \frac{at-1+e^{-at}}{a^2}$$

> [!warning] Exam trap
> Check $\deg N<\deg D$ first. If not, divide: $F(s)=Q(s)+R(s)/D(s)$ — the polynomial part becomes $\delta$ functions and derivatives, not a time function.

---

### 11. Fourier Series Trigonometric and Exponential

**Trigonometric form ★**

$$f(t)=a_0+\sum_{n=1}^{\infty}\left(a_n\cos\frac{2\pi nt}{T}+b_n\sin\frac{2\pi nt}{T}\right)$$

$$a_0=\frac1T\int_{-T/2}^{T/2}f(t)dt,\qquad a_n=\frac2T\int_{-T/2}^{T/2}f(t)\cos\frac{2\pi nt}{T}dt,\qquad b_n=\frac2T\int_{-T/2}^{T/2}f(t)\sin\frac{2\pi nt}{T}dt$$

**Conditions:** $f$ periodic with period $T$, piecewise smooth.

![](https://www.youtube.com/watch?v=ijQaTAT3kOg)

*Video: How to Compute a Fourier Series — Dr. Trefor Bazett, 13:16*

**Exponential form**

$$f(t)=\sum_{n=-\infty}^{\infty}c_ne^{jn\omega_0t},\qquad c_n=\frac1T\int_{-T/2}^{T/2}f(t)e^{-jn\omega_0t}dt,\qquad \omega_0=\frac{2\pi}{T}$$

$$c_0=a_0,\qquad c_n=\frac{a_n-jb_n}{2},\qquad c_{-n}=\frac{a_n+jb_n}{2}=\bar c_n$$

**Amplitude–phase form and Parseval ★**

$$f(t)=A_0+\sum A_n\cos(n\omega_0t-\phi_n),\qquad A_n=\sqrt{a_n^2+b_n^2},\qquad \phi_n=\tan^{-1}\frac{b_n}{a_n}$$

$$\frac1T\int_T \lvert f(t)\rvert^2dt=\lvert c_0\rvert^2+2\sum_{n=1}^{\infty}\lvert c_n\rvert^2$$

**Dirichlet convergence** — at a jump $t_0$, the series converges to $\frac{f(t_0^-)+f(t_0^+)}{2}$.

> [!warning] Exam trap
> The half-range factor: $a_n$ and $b_n$ carry $\frac2T$, but $a_0$ carries $\frac1T$. Mixing them up doubles the DC term.

---

### 12. Half-Range Expansions and Symmetry

**Even and odd symmetry ★**

$$\text{Even: } f(-t)=f(t)\Rightarrow b_n=0,\ a_n=\frac4T\int_0^{T/2}f(t)\cos n\omega_0t\,dt,\ a_0=\frac{2}{T}\int_0^{T/2}f(t)dt$$

$$\text{Odd: } f(-t)=-f(t)\Rightarrow a_0=a_n=0,\ b_n=\frac4T\int_0^{T/2}f(t)\sin n\omega_0t\,dt$$

**Half-range expansions** — $f(t)$ defined on $0<t<L$ only:

$$\text{Sine series: } f(t)=\sum b_n\sin\frac{n\pi t}{L},\qquad b_n=\frac2L\int_0^L f(t)\sin\frac{n\pi t}{L}dt$$

$$\text{Cosine series: } f(t)=a_0+\sum a_n\cos\frac{n\pi t}{L},\qquad a_n=\frac2L\int_0^L f(t)\cos\frac{n\pi t}{L}dt,\ a_0=\frac1L\int_0^L f\,dt$$

**Half-wave symmetry**

$$f(t\pm T/2)=-f(t)\Rightarrow \text{only odd harmonics }(n\ \text{odd}),\ a_0=0$$

**Quarter-wave symmetry** — only odd $n$ with a single trigonometric family (cosine for even, sine for odd).

**Conditions:** $f$ piecewise smooth on $(0,L)$; the cosine series is the even extension and the sine series the odd extension, both periodic with period $2L$; at a jump each series converges to the mean of the one-sided limits; quarter-wave symmetry requires an additional odd or even extension about $L/2$.

> [!tip] High-yield ★
> Spotting symmetry before integrating cuts the work by a factor of four. Square waves ⇒ odd (sine) series; triangular ⇒ odd or cosine; sawtooth ⇒ full series.

---

### 13. Fourier Transform Properties

![](https://www.youtube.com/watch?v=spUNpyF58BY)

*Video: But What Is the Fourier Transform? A Visual Introduction — 3Blue1Brown, 19:42*

**Definition ★**

$$F(\omega)=\mathcal{F}\{f(t)\}=\int_{-\infty}^{\infty}f(t)e^{-j\omega t}dt,\qquad f(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)e^{j\omega t}d\omega$$

**Conditions:** $f$ absolutely integrable.

**Property table ★**

| Property | Time domain | Frequency domain |
|---|---|---|
| Linearity | $af+bg$ | $aF(\omega)+bG(\omega)$ |
| Time shift | $f(t-t_0)$ | $e^{-j\omega t_0}F(\omega)$ |
| Frequency shift | $e^{j\omega_0t}f(t)$ | $F(\omega-\omega_0)$ |
| Scaling | $f(at)$ | $\frac{1}{\lvert a\rvert}F\!\left(\frac{\omega}{a}\right)$ |
| Differentiation | $f^{(n)}(t)$ | $(j\omega)^{n}F(\omega)$ |
| Integration | $\int_{-\infty}^{t}f$ | $\frac{F(\omega)}{j\omega}+\pi F(0)\delta(\omega)$ |
| Convolution | $f*g$ | $F(\omega)G(\omega)$ |
| Multiplication | $f(t)g(t)$ | $\frac{1}{2\pi}F*G$ |
| Duality | $F(t)$ | $2\pi f(-\omega)$ |

**Standard pairs**

$$e^{-at}u(t)\leftrightarrow\frac{1}{a+j\omega},\qquad \delta(t)\leftrightarrow1,\qquad \cos\omega_0t\leftrightarrow\pi\big[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)\big]$$

$$\operatorname{rect}\!\left(\frac{t}{\tau}\right)\leftrightarrow \tau\operatorname{sinc}\!\left(\frac{\omega\tau}{2}\right),\qquad \operatorname{sinc}(x)=\frac{\sin x}{x}\ \text{(unnormalized, }\omega\text{-convention)}$$

**Convention cross-check** — this file uses the **unnormalized** $\operatorname{sinc}(x)=\sin x/x$ with $\omega$ in rad/s, so the transform is $\tau\operatorname{sinc}(\omega\tau/2)$. [[07_Signals_and_Systems]] uses the **normalized** $\operatorname{sinc}(x)=\sin(\pi x)/(\pi x)$ with $f$ in Hz. Both are correct — match the convention the question uses.

**Parseval / energy**

$$\int_{-\infty}^{\infty}\lvert f(t)\rvert^2dt=\frac{1}{2\pi}\int_{-\infty}^{\infty}\lvert F(\omega)\rvert^2d\omega$$

> [!tip] High-yield ★
> Convolution in time ⇔ multiplication in frequency. Board items that ask for the output of an LTI system are almost always one line in the frequency domain.

---

## Part C — Special Functions and Linear Algebra

### 14. Bessel Functions

**Bessel's equation ★**

$$x^2y''+xy'+(x^2-\nu^2)y=0$$

$$J_\nu(x)=\sum_{m=0}^{\infty}\frac{(-1)^{m}}{m!\,\Gamma(m+\nu+1)}\left(\frac{x}{2}\right)^{2m+\nu}$$

**Second-kind divergence at the origin ★**

$$Y_\nu(0^{+})\to-\infty,\qquad K_\nu(0^{+})\to+\infty\qquad\Rightarrow\qquad \text{only }J_\nu\ \text{stays finite at }r=0$$

That finiteness is exactly why $J_\nu$ is chosen for the field in a fibre core or a circular waveguide, with $Y_\nu$ discarded.

**Conditions:** $x>0$, order $\nu\ge0$.

**General solution**

$$y=AJ_\nu(x)+BJ_{-\nu}(x)\ (\nu\notin\mathbb{Z}),\qquad y=AJ_\nu(x)+BY_\nu(x)\ (\nu\in\mathbb{Z})$$

**Recurrence and derivative relations**

$$J_{\nu-1}(x)+J_{\nu+1}(x)=\frac{2\nu}{x}J_\nu(x),\qquad J_{\nu-1}(x)-J_{\nu+1}(x)=2J_\nu'(x)$$

$$\frac{d}{dx}\big[x^{\nu}J_\nu(x)\big]=x^{\nu}J_{\nu-1}(x),\qquad \frac{d}{dx}\big[x^{-\nu}J_\nu(x)\big]=-x^{-\nu}J_{\nu+1}(x)$$

**Modified Bessel (imaginary argument)**

$$x^2y''+xy'-(x^2+\nu^2)y=0\Rightarrow y=AI_\nu(x)+BK_\nu(x),\qquad I_\nu(x)=j^{-\nu}J_\nu(jx)$$

**Small-argument limits**

$$J_0(0)=1,\qquad J_\nu(0)=0\ (\nu>0),\qquad I_0(0)=1$$

> [!warning] Exam trap
> For **integer** order, $J_{-\nu}$ is not independent of $J_\nu$; the second solution must be the Bessel function of the second kind $Y_\nu$ (Neumann).

---

### 15. Legendre Polynomials

**Legendre's equation ★**

$$(1-x^2)y''-2xy'+n(n+1)y=0$$

$$P_n(x)=\frac{1}{2^{n}n!}\frac{d^{n}}{dx^{n}}\big(x^2-1\big)^{n}\quad \text{(Rodrigues)}$$

**Conditions:** $-1<x<1$, $n$ a non-negative integer.

**First polynomials ★**

| $n$ | $P_n(x)$ |
|---|---|
| $0$ | $1$ |
| $1$ | $x$ |
| $2$ | $\frac12(3x^2-1)$ |
| $3$ | $\frac12(5x^3-3x)$ |
| $4$ | $\frac18(35x^4-30x^2+3)$ |

**Orthogonality ★**

$$\int_{-1}^{1}P_m(x)P_n(x)dx=\frac{2}{2n+1}\delta_{mn},\qquad P_n(1)=1,\quad P_n(-1)=(-1)^{n}$$

**Generating function and recurrence**

$$\frac{1}{\sqrt{1-2xt+t^2}}=\sum_{n=0}^{\infty}P_n(x)t^{n},\qquad \lvert t\rvert<1$$

$$(n+1)P_{n+1}(x)=(2n+1)xP_n(x)-nP_{n-1}(x)$$

**Legendre series**

$$f(x)=\sum_{n=0}^{\infty}A_nP_n(x),\qquad A_n=\frac{2n+1}{2}\int_{-1}^{1}f(x)P_n(x)dx$$

> [!tip] High-yield ★
> Rodrigues' formula plus the orthogonality integral $\frac{2}{2n+1}$ answers nearly every item. $P_n(1)=1$ for all $n$ is a free answer-checker.

---

### 16. Matrices, Determinants, Rank and Inversion

**Determinant of order 2 and 3 ★**

$$\begin{vmatrix}a&b\\ c&d\end{vmatrix}=ad-bc$$

$$\begin{vmatrix}a_1&b_1&c_1\\ a_2&b_2&c_2\\ a_3&b_3&c_3\end{vmatrix}=a_1\begin{vmatrix}b_2&c_2\\ b_3&c_3\end{vmatrix}-b_1\begin{vmatrix}a_2&c_2\\ a_3&c_3\end{vmatrix}+c_1\begin{vmatrix}a_2&b_2\\ a_3&b_3\end{vmatrix}$$

**Properties of determinants** — $\det(AB)=\det A\det B$, $\det(A^{T})=\det A$, $\det(kA)=k^{n}\det A$, row swap flips sign.

**Inverse ★**

$$A^{-1}=\frac{\operatorname{adj}A}{\det A},\qquad \operatorname{adj}A=\big[\text{cofactor }C_{ij}\big]^{T},\qquad C_{ij}=(-1)^{i+j}M_{ij}$$

$$A^{-1}A=AA^{-1}=I,\qquad (AB)^{-1}=B^{-1}A^{-1},\qquad (A^{T})^{-1}=(A^{-1})^{T}$$

**Conditions:** $\det A\neq0$ (nonsingular).

**Rank and nullity**

$$\operatorname{rank}A=\text{number of nonzero rows in row echelon form},\qquad \operatorname{rank}A+\operatorname{nullity}A=n$$

**Trace and transpose identities**

$$\operatorname{tr}(AB)=\operatorname{tr}(BA),\qquad \det A=\prod_i\lambda_i,\qquad \operatorname{tr}A=\sum_i\lambda_i$$

> [!warning] Exam trap
> The adjugate uses the **transpose** of the cofactor matrix. Using cofactors directly yields the inverse only for symmetric matrices by accident.

---

### 17. Cramer's Rule and Linear Systems

**Matrix form** — $A\vec x=\vec b$ with coefficient matrix $A$.

$$x_i=\frac{\det A_i}{\det A},\qquad A_i=A\ \text{with column } i\ \text{replaced by } \vec b\ \text{(★)}$$

**Two-variable case**

$$a_1x+b_1y=c_1,\quad a_2x+b_2y=c_2$$

$$x=\frac{\begin{vmatrix}c_1&b_1\\ c_2&b_2\end{vmatrix}}{\begin{vmatrix}a_1&b_1\\ a_2&b_2\end{vmatrix}},\qquad y=\frac{\begin{vmatrix}a_1&c_1\\ a_2&c_2\end{vmatrix}}{\begin{vmatrix}a_1&b_1\\ a_2&b_2\end{vmatrix}}$$

**Consistency classification**

| Condition | Solution set |
|---|---|
| $\det A\neq0$ | Unique solution |
| $\det A=0$, $\operatorname{rank}A=\operatorname{rank}[A\lvert\vec b]<n$ | Infinitely many |
| $\det A=0$, $\operatorname{rank}A<\operatorname{rank}[A\lvert\vec b]$ | No solution |

**Gauss–Jordan / row operations** — swap rows, scale a row, add a multiple of one row to another; solve by reducing to $[I\lvert A^{-1}\vec b]$.

**Homogeneous system** — $A\vec x=\vec 0$ has nontrivial solutions iff $\det A=0$.

**Conditions:** $A$ square with $\det A\neq0$ for Cramer's rule to apply at all; when $\det A=0$ the system is inconsistent or has infinitely many solutions, decided by comparing $\operatorname{rank}A$ with $\operatorname{rank}[A\lvert\vec b]$; row operations preserve the solution set only on the augmented matrix.

> [!tip] High-yield ★
> Cramer's rule is fast for $2\times2$ and $3\times3$; beyond that use elimination. If $\det A=0$, stop — Cramer does not apply.

---

### 18. Eigenvalues and Eigenvectors

![](https://www.youtube.com/watch?v=TQvxWaQnrqI)

*Video: Finding Eigenvalues and Eigenvectors — Professor Dave Explains, 17:10*

**Characteristic equation ★**

$$A\vec v=\lambda\vec v \iff \det(A-\lambda I)=0,\qquad (A-\lambda I)\vec v=\vec 0$$

**Determination for $2\times2$**

$$\lambda^2-(\operatorname{tr}A)\lambda+\det A=0,\qquad \lambda_{1,2}=\frac{\operatorname{tr}A\pm\sqrt{(\operatorname{tr}A)^2-4\det A}}{2}$$

**Eigenvector computation** — solve $(A-\lambda_i I)\vec v_i=0$ by row reduction; normalize to unit length if required.

**Diagonalization and Cayley–Hamilton**

$$A=PDP^{-1},\ D=\operatorname{diag}(\lambda_1,\dots,\lambda_n),\qquad A^{k}=PD^{k}P^{-1}$$

$$A^{n}+c_{n-1}A^{n-1}+\dots+c_1A+c_0I=0\quad \text{(Cayley–Hamilton)}$$

$$e^{At}=Pe^{Dt}P^{-1},\qquad e^{Dt}=\operatorname{diag}\big(e^{\lambda_1t},\dots,e^{\lambda_nt}\big)\ \text{(★)}$$

**Symmetric matrices** — real symmetric $A$: all eigenvalues real, eigenvectors of distinct eigenvalues are orthogonal, $A=Q\Lambda Q^{T}$ with $Q$ orthogonal.

**Stability link** — CT system is stable iff $\operatorname{Re}\lambda_i<0$; DT system is stable iff $\lvert\lambda_i\rvert<1$. See [[06_Control_Systems#14. State Space Representation Basics|State Space Representation Basics]] and [[07_Signals_and_Systems#9. Difference Equations and Stability|Difference Equations and Stability]].

**Conditions:** $\det(A-\lambda I)=0$ gives $n$ eigenvalues counting multiplicity over $\mathbb{C}$; the eigenvector basis exists only when $A$ is diagonalisable ($n$ independent eigenvectors) — defective matrices need the Jordan form; a real symmetric $A$ is always orthogonally diagonalisable with real eigenvalues.

> [!tip] High-yield ★
> For $2\times2$: $\lambda_1+\lambda_2=\operatorname{tr}A$ and $\lambda_1\lambda_2=\det A$. Use these as a two-second check on any computed pair.

## Part D — Analytic Geometry and Conic Sections

### 19. Analytic Geometry and Conic Sections

**Standard forms ★** — centre at the origin, $a,b>0$ in the same length unit.

| Conic | Equation | Key parameters |
|---|---|---|
| Circle | $x^2+y^2=r^2$ | radius $r$, eccentricity $e=0$ |
| Parabola | $y^2=4ax$ | focus $(a,0)$, directrix $x=-a$ |
| Ellipse | $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ | $c^2=a^2-b^2$, $e=c/a<1$ |
| Hyperbola | $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ | $c^2=a^2+b^2$, $e=c/a>1$ |

**Parametric forms ★**

$$(a\cos\theta,\ b\sin\theta)\ \text{(ellipse)},\qquad (a\sec\theta,\ b\tan\theta)\ \text{(hyperbola)},\qquad (at^2,\ 2at)\ \text{(parabola)}$$

**Classifying $Ax^2+Bxy+Cy^2+Dx+Ey+F=0$ ★**

$$B^2-4AC<0\ \text{(ellipse or circle)},\qquad =0\ \text{(parabola)},\qquad >0\ \text{(hyperbola)}$$

**Loci in the complex plane** — $z_1,z_2$ fixed; the loci are conics with foci $z_1,z_2$.

$$\lvert z-z_1\rvert+\lvert z-z_2\rvert=2a\ \text{(ellipse)},\qquad \lvert z-z_1\rvert-\lvert z-z_2\rvert=2a\ \text{(hyperbola)}$$

**Distance and section formulas**

$$d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2},\qquad \text{section: }\left(\frac{mx_2+nx_1}{m+n},\frac{my_2+ny_1}{m+n}\right)$$

**Conditions:** the general equation is quadratic in $x,y$; the discriminant test $B^2-4AC$ is the same classification used for second-order PDEs; an ellipse needs $2a>\lvert z_1-z_2\rvert$, a hyperbola $2a<\lvert z_1-z_2\rvert$, and $z_1=z_2$ degenerates to a circle. #conics #complex

> [!tip] High-yield ★
> Read the conic off the parametric form: a $\sin/\cos$ pair with unequal coefficients is an ellipse, a $\sec/\tan$ pair is a hyperbola, and a $t^2$/$t$ pair is a parabola.

---

---

→ Back to [[00_Index]]
