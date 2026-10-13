---
title: Signals and Systems
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 13
---

## Part A — Signals and LTI Systems

### 1. Signal Classification and Operations

**Classification tests**

| Class | Test |
|---|---|
| Continuous / discrete | defined on $\mathbb{R}$ vs. $n\in\mathbb{Z}$ |
| Periodic | $x(t)=x(t+T_0)$, $f_0=1/T_0$ Hz, $\omega_0=2\pi/T_0$ rad/s |
| Energy | $0<E<\infty$, so $P=0$ |
| Power | $0<P<\infty$, so $E=\infty$ |
| Causal | $x(t)=0$ for $t<0$ |

**Energy and power ★**

$$E=\int_{-\infty}^{\infty}|x(t)|^2dt\ \text{J},\qquad E=\sum_n|x[n]|^2$$

$$P=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}|x(t)|^2dt\ \text{W}$$

$$P=\lim_{N\to\infty}\frac{1}{2N+1}\sum_{n=-N}^{N}|x[n]|^2$$

**Time operations ★**

- $y(t)=x(at+b)$ scales time by $1/|a|$ and shifts by $-b/a$
- $x(-t)$ reverses time
- $x(t-t_0)$ delays by $t_0$ for $t_0>0$

**Singularity and elementary signals**

| Signal | Value |
|---|---|
| $\delta(t)$ | $\int\delta(t)\,dt=1$, and zero elsewhere |
| $\delta[n]$ | $\delta[n]=1$ at $n=0$ |
| Sifting | $\int x(t)\delta(t-t_0)\,dt=x(t_0)$ |
| Discrete sifting | $\sum_n x[n]\delta[n-k]=x[k]$ |
| $\mu(t)$ | $1$ for $t\geq0$, with $\frac{d\mu}{dt}=\delta(t)$ |
| Unit-step integral | $\int_{-\infty}^{t}\delta(\tau)\,d\tau=\mu(t)$ |
| Rect | $\operatorname{rect}(t/\tau)=1$ for $\lvert t\rvert<\tau/2$ |
| Rect transform | $\mathcal{F}\{\operatorname{rect}\}=\tau\operatorname{sinc}(f\tau)$ |
| sinc | $\operatorname{sinc}(x)=\frac{\sin(\pi x)}{\pi x}$, with $\operatorname{sinc}(0)=1$ (normalized) |

**Conditions:** Amplitude scaling by $a$ scales energy by $|a|^2$. Scale and shift order matters when both apply. #signals

**Convention cross-check** — this file uses the **normalized** $\operatorname{sinc}(x)=\sin(\pi x)/(\pi x)$ with $f$ in Hz, so the rect transform is $\tau\operatorname{sinc}(f\tau)$. [[04_Advanced_Engineering_Math]] uses the **unnormalized** $\operatorname{sinc}(x)=\sin x/x$ with $\omega$ in rad/s, giving $\tau\operatorname{sinc}(\omega\tau/2)$. Both are correct — match the convention the question uses.

---

### 2. Energy, Power, Even and Odd

**Energy and power ★**

$$E_\infty=\int_{-\infty}^{\infty}|x(t)|^2dt$$

$$P_\infty=\lim_{T\to\infty}\frac{1}{T}\int_{-T/2}^{T/2}|x(t)|^2dt$$

**Signal classes**

- Energy signal: $E$ finite with $P=0$, e.g. $e^{-at}\mu(t)$, rect
- Power signal: $P$ finite nonzero with $E=\infty$, e.g. $\mu(t)$, $\cos\omega_0t$, any periodic signal
- Neither: $x(t)=t\mu(t)$

**Periodic power (Parseval)**

$$P=\frac{1}{T_0}\int_{T_0}|x(t)|^2dt=\sum_n|c_n|^2$$

**Even and odd parts ★**

$$x_e(t)=\frac{x(t)+x(-t)}{2},\qquad x_o(t)=\frac{x(t)-x(-t)}{2}$$

$$x=x_e+x_o,\qquad E_x=E_{x_e}+E_{x_o}$$

**Symmetry rules**

- $\int_{-T}^{T}x_e(t)\,dt=2\int_0^T x_e(t)\,dt$
- $\int_{-T}^{T}x_o(t)\,dt=0$
- even·even and odd·odd give even, while even·odd gives odd
- $x_e$ has cosine terms only, with real $c_n$
- $x_o$ has sine terms only, with imaginary $c_n$

> [!warning] Exam trap
> RMS is $\sqrt{P}$ only for a power signal. For an energy signal use $\sqrt{E/T}$ over a stated window.

**Conditions:** Real-valued signals unless stated, and even/odd tests require symmetry about $t=0$. #signals

---

### 3. System Properties and LTI

![](https://www.youtube.com/watch?v=5JCuqlExTvo)

*Video: What Is a Linear Time-Invariant (LTI) System? — Iain Explains, 6:17*

**Property tests**

| Property | Test |
|---|---|
| Memoryless | $y(t)$ depends only on $x(t)$ |
| Causal | $y(t)$ depends only on $x(\tau),\ \tau\leq t$ |
| Stable (BIBO) | bounded input ⇒ bounded output |
| Time-invariant | input shift ⇒ equal output shift |
| Linear | $a_1x_1+a_2x_2\Rightarrow a_1y_1+a_2y_2$ |
| Invertible | distinct inputs give distinct outputs |

**LTI input-output ★**

$$y(t)=x(t)*h(t),\qquad y[n]=x[n]*h[n]$$

**BIBO stability ★**

$$\int_{-\infty}^{\infty}|h(t)|dt<\infty\ \text{(CT)},\qquad \sum_n|h[n]|<\infty\ \text{(DT)}$$

Equivalently all poles lie in the open LHP (CT) or satisfy $|z|<1$ (DT).

**Causality and memory**

- Causal: $h(t)=0$ for $t<0$, or $h[n]=0$ for $n<0$
- Memoryless: $h(t)=K\delta(t)$

**Step response**

$$s(t)=\int_{-\infty}^{t}h(\tau)\,d\tau,\qquad h(t)=\frac{ds}{dt}$$

**Conditions:** Establish linearity *and* time invariance before using convolution, transfer functions, or eigenfunction results. #signals #convolution

---

### 4. Continuous-Time Convolution

**Convolution integral ★**

$$y(t)=x(t)*h(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau$$

$$y(t)=\int_{-\infty}^{\infty}h(\tau)x(t-\tau)\,d\tau$$

![](https://www.youtube.com/watch?v=aMaw4EumwyE)

*Video: Convolution in 5 Easy Steps — Iain Explains Signals, Systems and Digital Comms, 14:02*

**Properties**

| Property | Statement |
|---|---|
| Commutative | $x*h=h*x$ |
| Associative | $(x*h_1)*h_2=x*(h_1*h_2)$ |
| Distributive | $x*(h_1+h_2)=x*h_1+x*h_2$ |
| Shift | $x(t-t_1)*h(t-t_2)=y(t-t_1-t_2)$ |
| Identity | $x*\delta=x$, and $x*\delta(t-t_0)=x(t-t_0)$ |
| Width | duration of $y$ = sum of durations |
| Causality | $y(t)=\int_0^t x(\tau)h(t-\tau)\,d\tau$ if both causal |

**Common convolution results ★**

| Pair | Result |
|---|---|
| $\mu(t)*\mu(t)$ | $t\mu(t)$ |
| $e^{-at}\mu(t)*e^{-bt}\mu(t)$ with $a\neq b$ | $\frac{e^{-at}-e^{-bt}}{b-a}\mu(t)$ |
| rect of widths $T_1$, $T_2$ | trapezoid of total width $T_1+T_2$ |
| Areas | $\text{area}(y)=\text{area}(x)\cdot\text{area}(h)$ |

**Transform shortcut**

$$y(t)=\mathcal{L}^{-1}\{X(s)H(s)\},\qquad Y(j\omega)=X(j\omega)H(j\omega)$$

> [!warning] Exam trap
> The limits come from the overlap of $x(\tau)$ with the flipped, shifted $h(t-\tau)$ — sketch both before integrating.

**Conditions:** Signals integrable or of bounded support so the integral converges. Hand work uses flip–shift–multiply–integrate. #convolution #laplace

---

### 5. Discrete-Time Convolution

![](https://www.youtube.com/watch?v=KAOJsqCyd5Y)

*Video: Discrete Time Convolution Example — Iain Explains, 10:10*

**Convolution sum ★**

$$y[n]=x[n]*h[n]=\sum_{k=-\infty}^{\infty}x[k]h[n-k]=\sum_{k=-\infty}^{\infty}h[k]x[n-k]$$

**Causal case**

$$y[n]=\sum_{k=0}^{n}x[k]h[n-k],\qquad L_y=L_x+L_h-1\ \text{samples}$$

**Geometric sums ★**

| Form | Closed value | Valid for |
|---|---|---|
| $\sum_{k=0}^{N-1}a^k$ | $\frac{1-a^N}{1-a}$ | $a\neq1$ |
| $\sum_{k=0}^{\infty}a^k$ | $\frac{1}{1-a}$ | $\lvert a\rvert<1$ |
| $\sum_{k=0}^{n}a^k$ | $\frac{1-a^{n+1}}{1-a}$ | — |

**Common pairs**

| Pair | Result |
|---|---|
| $x[n]*\delta[n]$ | $x[n]$ |
| $x[n]*\delta[n-k]$ | $x[n-k]$ |
| $\mu[n]*\mu[n]$ | $(n+1)\mu[n]$ |
| $a^n\mu[n]*a^n\mu[n]$ | $(n+1)a^n\mu[n]$ |
| $a^n\mu[n]*\mu[n]$ | $\frac{1-a^{n+1}}{1-a}\mu[n]$ |

**Transform shortcut**

$$y[n]=\mathcal{Z}^{-1}\{X(z)H(z)\},\qquad Y(e^{j\omega})=X(e^{j\omega})H(e^{j\omega})$$

$\omega$ is in rad/sample.

**Conditions:** Absolute convergence gives BIBO stability, and causal systems use the one-sided sum. #convolution #ztransform

---

## Part B — Transforms and System Analysis

### 6. Z Transform Definition and ROC

**Definition ★**

$$X(z)=\mathcal{Z}\{x[n]\}=\sum_{n=-\infty}^{\infty}x[n]z^{-n},\qquad z=re^{j\omega}$$

![](https://www.youtube.com/watch?v=uq_qv3Spzbs)

*Video: Z Transform Region of Convergence Explained — Iain Explains Signals, Systems and Digital Comms, 13:07*

**Common pairs and ROCs**

| Signal | $X(z)$ | ROC |
|---|---|---|
| $\delta[n]$ | $1$ | all $z$ |
| $\delta[n-k]$ | $z^{-k}$ | all $z$ ($z\neq0$ if $k>0$) |
| $\mu[n]$ | $\frac{1}{1-z^{-1}}=\frac{z}{z-1}$ | $\lvert z\rvert>1$ |
| $-\mu[-n-1]$ | $\frac{1}{1-z^{-1}}$ | $\lvert z\rvert<1$ |
| $a^n\mu[n]$ | $\frac{1}{1-az^{-1}}=\frac{z}{z-a}$ | $\lvert z\rvert>\lvert a\rvert$ |
| $-a^n\mu[-n-1]$ | $\frac{1}{1-az^{-1}}$ | $\lvert z\rvert<\lvert a\rvert$ |
| $n\mu[n]$ | $\frac{z^{-1}}{(1-z^{-1})^2}$ | $\lvert z\rvert>1$ |
| $na^n\mu[n]$ | $\frac{az^{-1}}{(1-az^{-1})^2}$ | $\lvert z\rvert>\lvert a\rvert$ |
| $\cos\omega_0n\,\mu[n]$ | $\frac{1-z^{-1}\cos\omega_0}{1-2z^{-1}\cos\omega_0+z^{-2}}$ | $\lvert z\rvert>1$ |
| $\sin\omega_0n\,\mu[n]$ | $\frac{z^{-1}\sin\omega_0}{1-2z^{-1}\cos\omega_0+z^{-2}}$ | $\lvert z\rvert>1$ |
| $r^n\cos\omega_0n\,\mu[n]$ | $\frac{1-rz^{-1}\cos\omega_0}{1-2rz^{-1}\cos\omega_0+r^2z^{-2}}$ | $\lvert z\rvert>\lvert r\rvert$ |
| $r^n\sin\omega_0n\,\mu[n]$ | $\frac{rz^{-1}\sin\omega_0}{1-2rz^{-1}\cos\omega_0+r^2z^{-2}}$ | $\lvert z\rvert>\lvert r\rvert$ |

**ROC rules ★**

- Right-sided → outside the outermost pole
- Left-sided → inside the innermost pole
- Two-sided → an annulus
- Finite duration → the entire plane, possibly except $0$ or $\infty$
- The ROC holds no poles and is bounded by poles or infinity

> [!warning] Exam trap
> A rational $X(z)$ alone does not fix $x[n]$ — the ROC decides right-sided vs. left-sided.
> Causal + stable ⇔ the ROC contains $|z|=1$ and every pole lies inside the unit circle.

**Logarithmic pair ★** — the standard route to $a^{n}/n$ sequences when the question gives a log.

$$-\ln\!\left(1-az^{-1}\right)=\sum_{n\ge1}\frac{a^{n}}{n}z^{-n}\ \longleftrightarrow\ x[n]=\frac{a^{n}}{n}u[n-1],\qquad \text{ROC }\lvert z\rvert>\lvert a\rvert$$

Expand the log as a power series and read the coefficient of $z^{-n}$; never attempt partial fractions on a logarithm.

**Conditions:** The ROC is always quoted with $X(z)$. Causal sequences need ROC $|z|>r_{max}$ with $X(z)$ finite as $z\to\infty$. #ztransform

---

### 7. Z Transform Theorems and Pairs

**Property table**

| Property | $x[n]$ | $X(z)$ | ROC |
|---|---|---|---|
| Linearity | $ax_1+bx_2$ | $aX_1+bX_2$ | contains $R_1\cap R_2$ |
| Time shift | $x[n-n_0]$ | $z^{-n_0}X(z)$ | $R$ (except $0,\infty$) |
| $z$-scaling | $a^nx[n]$ | $X(z/a)$ | $\lvert a\rvert R$ |
| Time reversal | $x[-n]$ | $X(1/z)$ | $1/R$ |
| Convolution | $x_1*x_2$ | $X_1(z)X_2(z)$ | contains $R_1\cap R_2$ |
| Accumulation | $\sum_{k=-\infty}^{n}x[k]$ | $\frac{X(z)}{1-z^{-1}}$ | $R\cap\lvert z\rvert>1$ |
| Differencing | $x[n]-x[n-1]$ | $(1-z^{-1})X(z)$ | contains $R$ |
| Multiply by $n$ | $nx[n]$ | $-z\frac{dX(z)}{dz}$ | $R$ |
| Initial value | $x[0]$ | $\lim_{z\to\infty}X(z)$ (causal) | — |
| Final value | $\lim_{n\to\infty}x[n]$ | $\lim_{z\to1}(z-1)X(z)$ | poles inside unit circle |

**Parseval ★**

$$\sum_n x[n]y^*[n]=\frac{1}{2\pi j}\oint X(z)Y^*(1/z^*)z^{-1}dz$$

$$\sum_n|x[n]|^2=\frac{1}{2\pi}\int_{-\pi}^{\pi}|X(e^{j\omega})|^2d\omega$$



**Conditions:** Convolution and Parseval need overlapping ROCs. Initial- and final-value theorems assume a causal $x[n]$ with rational $X(z)$; The final-value theorem also needs every pole inside the unit circle, except possibly a simple pole at $z=1$. #ztransform.

---

### 8. Inverse Z Transform

![](https://www.youtube.com/watch?v=RprzYUDKrrA)

*Video: Z-Transform Inversion by Partial Fraction Expansion — Adam Panagos, 11:17*

**Inversion formula ★**

$$x[n]=\frac{1}{2\pi j}\oint_C X(z)z^{n-1}dz=\sum_{\text{poles inside }C}\operatorname{Res}\big[X(z)z^{n-1}\big]$$

**Residues ★**

$$\text{simple pole } z=p:\quad \operatorname{Res}=\lim_{z\to p}(z-p)X(z)z^{n-1}$$

$$\text{order } m:\quad \operatorname{Res}=\frac{1}{(m-1)!}\lim_{z\to p}\frac{d^{m-1}}{dz^{m-1}}\big[(z-p)^mX(z)z^{n-1}\big]$$

**Inversion methods**

- Partial fractions: expand as $\frac{A_k}{1-p_kz^{-1}}$ and invert term by term under the ROC
- Long division: expand in powers of $z^{-1}$
- Power series: read the coefficients directly as sequence values

**ROC dependence ★**

$$\frac{1}{1-az^{-1}}\ \text{with}\ |z|>|a|\ \Rightarrow\ a^n\mu[n]$$

$$\frac{1}{1-az^{-1}}\ \text{with}\ |z|<|a|\ \Rightarrow\ -a^n\mu[-n-1]$$

> [!tip] High-yield ★
> Rewrite $X(z)$ as $N(z)/D(z)$ in positive powers of $z$ first — the roots of $D(z)$ fix both the ROC and the residue limits.

**Conditions:** $X(z)z^{n-1}$ has no pole on the contour $C$, and the ROC must match the required causality and stability. #ztransform

---

### 9. Difference Equations and Stability

![](https://www.youtube.com/watch?v=7eZ3p5RM89s)

*Video: Difference Equations and Z-Transforms — Professor Dave Explains, 10:34*

**Difference equation ★**

$$y[n]=\sum_{k=0}^{M}b_kx[n-k]-\sum_{k=1}^{N}a_ky[n-k]$$

**Transfer function ★**

$$H(z)=\frac{Y(z)}{X(z)}=\frac{\sum_{k=0}^{M}b_kz^{-k}}{1+\sum_{k=1}^{N}a_kz^{-k}}$$

**Poles and zeros** — poles solve $1+\sum_k a_kz^{-k}=0$ (that is, $D(z)$ in positive powers) and zeros solve $N(z)=0$.

**Realizations**

- Direct form I and direct form II
- Cascade: $H_1H_2$
- Parallel: $H_1+H_2$

**Stability of a causal LTI system**

| Stability | Condition |
|---|---|
| BIBO stable | all poles $\lvert p_i\rvert<1$, inside the unit circle |
| Marginally stable | simple poles on $\lvert z\rvert=1$ and none outside |
| Unstable | any pole $\lvert p_i\rvert>1$, or a repeated pole on $\lvert z\rvert=1$ |

**Jury test ★** — for $A(z)=a_Nz^N+\cdots+a_0$ with $a_N>0$:

- Need $A(1)>0$ and $(-1)^NA(-1)>0$
- Need $|a_0|<a_N$
- Then require every leading Jury-array entry to be positive

**Frequency response**

$$H(e^{j\omega})=H(z)\big|_{z=e^{j\omega}}$$

$\omega$ is in rad/sample with period $2\pi$.

**Conditions:** Causal LTI difference equation with real coefficients and the causal solution taken outside the outermost pole; Stability statements refer to that causal system. #ztransform #stability.

> [!tip] High-yield ★
> Stability depends on the poles alone. For a causal system the ROC lies outside the outermost pole, so $|p_i|<1$ is the whole test.



---

### 10. System Response and Step Response

**Response definitions**

| Response | Definition | Transform |
|---|---|---|
| Impulse | $h[n]=\mathcal{Z}^{-1}\{H(z)\}$ | $H(z)$ |
| Step | $s[n]=h[n]*\mu[n]$ | $\frac{H(z)}{1-z^{-1}}$ |
| Ramp | $r[n]=h[n]*n\mu[n]$ | $\frac{H(z)}{(1-z^{-1})^2}$ |

**Total response ★**

$$y[n]=y_{zi}[n]+x[n]*h[n]$$

$y_{zi}$ comes from the initial conditions, while $x[n]*h[n]$ is the zero-state term.

**Continuous-time analog**

$$s(t)=\int_0^t h(\tau)\,d\tau,\qquad h(t)=\frac{ds}{dt}$$

$$H(s)=\frac{S(s)}{1/s}\ \text{for zero initial conditions}$$

**Steady state** — for a stable causal system with a step input:

$$y_{ss}=\lim_{z\to1}(z-1)\frac{H(z)}{(z-1)}=H(1)$$

**First-order system** — $H(z)=\frac{1}{1-az^{-1}}$:

$$y[n]=(1-a^{n+1})\mu[n],\qquad \tau\approx\frac{1}{|\ln a|}\ \text{samples}$$

**Natural modes from the poles**

| Pole type | Mode |
|---|---|
| real pole | $p^n$ |
| complex pair | $r^n\cos(\omega_0n+\theta)$ |

$\theta$ is in rad.

**Conditions:** Zero initial conditions for the transfer-function (zero-state) part. A steady state exists only if the system is stable. #signals #ztransform

---

### 11. CT Fourier and Laplace as System Tools

![](https://www.youtube.com/watch?v=neZ1FvH9BCg)

*Video: Using Fourier Transforms to Find the Output of an LTI System — John Buck, 9:05*

**Transform definitions ★**

$$X(j\omega)=\int_{-\infty}^{\infty}x(t)e^{-j\omega t}dt,\qquad x(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}X(j\omega)e^{j\omega t}d\omega$$

$$X(s)=\int_{0^-}^{\infty}x(t)e^{-st}dt,\qquad s=\sigma+j\omega\ \text{s}^{-1}$$

**Common transform pairs**

| $x(t)$ | $X(j\omega)$ | $X(s)$ | ROC |
|---|---|---|---|
| $\delta(t)$ | $1$ | $1$ | all $s$ |
| $\mu(t)$ | $\pi\delta(\omega)+\frac{1}{j\omega}$ | $\frac{1}{s}$ | $\sigma>0$ |
| $e^{-at}\mu(t)$ | $\frac{1}{a+j\omega}$ | $\frac{1}{s+a}$ | $\sigma>-a$ |
| $t\mu(t)$ | $j\pi\delta'(\omega)-\frac{1}{\omega^2}$ | $\frac{1}{s^2}$ | $\sigma>0$ |
| $te^{-at}\mu(t)$ | $\frac{1}{(a+j\omega)^2}$ | $\frac{1}{(s+a)^2}$ | $\sigma>-a$ |
| $\cos\omega_0t\,\mu(t)$ | $\frac{\pi}{2}[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)]+\frac{j\omega}{\omega_0^2-\omega^2}$ | $\frac{s}{s^2+\omega_0^2}$ | $\sigma>0$ |
| $\sin\omega_0t\mu(t)$ | $\frac{\pi}{j2}[\delta(\omega-\omega_0)-\delta(\omega+\omega_0)]+\frac{\omega_0}{\omega_0^2-\omega^2}$ | $\frac{\omega_0}{s^2+\omega_0^2}$ | $\sigma>0$ |
| $e^{-at}\cos\omega_0t\,\mu(t)$ | $\frac{a+j\omega}{(a+j\omega)^2+\omega_0^2}$ | $\frac{s+a}{(s+a)^2+\omega_0^2}$ | $\sigma>-a$ |
| $e^{-at}\sin\omega_0t\,\mu(t)$ | $\frac{\omega_0}{(a+j\omega)^2+\omega_0^2}$ | $\frac{\omega_0}{(s+a)^2+\omega_0^2}$ | $\sigma>-a$ |

**LTI eigenfunction ★**

$$x(t)=e^{st}\ \Rightarrow\ y(t)=H(s)e^{st}$$

$$y_{ss}(t)=|H(j\omega)|A\cos\big(\omega t+\angle H(j\omega)\big),\qquad Y(j\omega)=X(j\omega)H(j\omega)$$

**Convergence ★**

- Fourier converges in the ordinary sense iff $\int|x(t)|dt<\infty$
- Otherwise it converges in the generalized impulse sense
- The one-sided Laplace ROC is $\sigma>\sigma_{max}$ of the poles

**Fourier properties**

| Property | Time | Frequency |
|---|---|---|
| Linearity | $ax_1+bx_2$ | $aX_1+bX_2$ |
| Time shift | $x(t-t_0)$ | $e^{-j\omega t_0}X(j\omega)$ |
| Scale | $x(at)$ | $\frac{1}{\lvert a\rvert}X(j\omega/a)$ |
| Modulation | $x(t)e^{j\omega_0t}$ | $X(j(\omega-\omega_0))$ |
| Differentiation | $\frac{dx}{dt}$ | $j\omega X(j\omega)$ |
| Integration | $\int_{-\infty}^{t}x\,d\tau$ | $\frac{X(j\omega)}{j\omega}+\pi X(0)\delta(\omega)$ |
| Duality | $X(t)$ | $2\pi x(-\omega)$ |

**Conditions:** Dirichlet conditions for ordinary Fourier work, and the ROC must include the $j\omega$ axis for $X(j\omega)$ to exist; One-sided Laplace assumes $x(t)=0$ for $t<0^-$. #fourier #laplace #signals.

> [!tip] High-yield ★
> The Fourier transform is the Laplace transform on the $j\omega$ axis — valid only when the ROC includes $\sigma=0$.



## Part C — Correlation, Spectral Density and Sampling

### 12. Correlation and Spectral Density

**Autocorrelation ★** — similarity of a signal to a shifted copy of itself; $\tau$ in s, $k$ in samples.

$$R_{xx}(\tau)=\lim_{T\to\infty}\frac1T\int_{-T/2}^{T/2}x(t)x(t+\tau)\,dt,\qquad R_{xx}[k]=\sum_{n=-\infty}^{\infty}x[n]x[n-k]$$

$$R_{xx}(0)=E\ \text{(energy)},\qquad R_{xx}(-\tau)=R_{xx}(\tau)\ \text{(even)},\qquad \lvert R_{xx}(\tau)\rvert\le R_{xx}(0)$$

**Cross-correlation and its parity ★**

$$R_{xy}(\tau)=\int_{-\infty}^{\infty}x(t)y(t+\tau)\,dt,\qquad R_{xy}[k]=R_{yx}[-k]$$

The parity identity is the single most-tested correlation fact; cross-correlation is **not** even unless $x=y$.

**Wiener-Khinchin theorem ★** — the power spectral density is the Fourier transform of the autocorrelation.

$$S_{xx}(\omega)=\int_{-\infty}^{\infty}R_{xx}(\tau)e^{-j\omega\tau}d\tau,\qquad R_{xx}(\tau)=\frac1{2\pi}\int_{-\infty}^{\infty}S_{xx}(\omega)e^{j\omega\tau}d\omega$$

White noise is the degenerate case: $R_{xx}(\tau)=\frac{N_0}{2}\delta(\tau)$ and flat $S_{xx}(\omega)=N_0/2$, so white noise correlates only with itself at zero shift.

**Matched filter ★** — the filter that maximises output SNR at the sampling instant $t=T$ is the time-reversed, shifted template.

$$h(t)=s(T-t)\ \Rightarrow\ y(T)=\int s(t)s(t)\,dt=E,\qquad \mathrm{SNR}_{max}=\frac{2E}{N_0}$$

The matched-filter output at $T$ is a **correlation**, not a convolution — this is the standard identification item.

**Conditions:** $x$ wide-sense stationary with $\int\lvert R_{xx}(\tau)\rvert d\tau<\infty$ for $S_{xx}$ to exist; $x,y$ jointly stationary for $R_{xy}$; $N_0$ in W/Hz and $\delta$ in s⁻¹, giving $S_{xx}$ in W/Hz and $R_{xx}$ in W. #correlation #psd

> [!tip] High-yield ★
> $R_{xx}(0)$ **is** the total energy — if a question asks for energy and hands you an autocorrelation, evaluate it at $\tau=0$ instead of integrating the signal.

---

### 13. Sampling and Circular Convolution

**Nyquist-Shannon sampling theorem ★** — $f_s$ in Hz, $f_{max}$ the highest baseband component in Hz.

$$f_s\ge2f_{max}\ \text{(Nyquist rate)},\qquad f_N=\frac{f_s}{2}\ \text{(folding frequency)},\qquad T_s=\frac1{f_s}$$

![](https://www.youtube.com/watch?v=Jv5FU8oUWEY)

*Video: The Intuition Behind the Nyquist–Shannon Sampling Theorem — Zach Star, 11:25*

Any component above $f_N$ aliases to $\lvert f-f_s\rvert$, so an anti-alias filter must cut off below $f_N$.

**Sampling a sinusoid** — $x(t)=\cos\omega_0t$ sampled every $T_s$ gives $x[n]=\cos(\Omega_0n)$ with $\Omega_0=\omega_0T_s$ in rad/sample; the discrete frequency repeats every $2\pi$.

**Circular versus linear convolution ★** — with an $N$-point DFT the convolution wraps around.

$$y[n]=\sum_{k=0}^{N-1}x[k]\,h\big[(n-k)\bmod N\big],\qquad \text{output length exactly }N$$

Linear convolution gives $L_y=L_x+L_h-1$ samples; zero-pad both sequences to $N\ge L_y$ so the circular result equals the linear one.

**DFT pair**

$$X[m]=\sum_{n=0}^{N-1}x[n]e^{-j2\pi mn/N},\qquad x[n]=\frac1N\sum_{m=0}^{N-1}X[m]e^{j2\pi mn/N}$$

**Conditions:** $x$ band-limited to $f_{max}$ and sampled uniformly for the sampling theorem to be exact; the circular-convolution identity needs both sequences padded to $N\ge L_y$, otherwise the tail wraps and corrupts the first samples; $N$ a positive integer, $m,n$ integers mod $N$. #sampling #dft

> [!warning] Exam trap
> Circular convolution returns **exactly $N$** samples, linear convolution returns $L_x+L_h-1$. Choosing the wrong length is the most common error on this item — pad first, then convolve.

---

---

→ Back to [[00_Index]]
