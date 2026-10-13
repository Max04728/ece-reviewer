---
title: Integral Calculus
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 16
---

## Part A — Techniques of Integration

### 1. Antiderivatives and Standard Forms

**Definition ★**

$$\int f(x)\,dx = F(x)+C \iff F'(x)=f(x)$$

**Conditions:** $F' = f$ on an interval.

**Linearity and FTC link**

$$\int \big[af(x)\pm bg(x)\big]dx = a\!\int\! f\,dx \pm b\!\int\! g\,dx,\qquad \frac{d}{dx}\int f(x)\,dx = f(x)$$

**Standard forms ★**

| Integral | Result |
|---|---|
| $\int x^{n}dx$ | $\frac{x^{n+1}}{n+1}+C,\ n\neq-1$ |
| $\int \frac{dx}{x}$ | $\ln\lvert x\rvert+C$ |
| $\int e^{x}dx$ | $e^{x}+C$ |
| $\int a^{x}dx$ | $\frac{a^{x}}{\ln a}+C$ |
| $\int \sin x\,dx$ | $-\cos x+C$ |
| $\int \cos x\,dx$ | $\sin x+C$ |
| $\int \sec^2 x\,dx$ | $\tan x+C$ |
| $\int \csc^2 x\,dx$ | $-\cot x+C$ |
| $\int \sec x\tan x\,dx$ | $\sec x+C$ |
| $\int \tan x\,dx$ | $\ln\lvert\sec x\rvert+C$ |
| $\int \sec x\,dx$ | $\ln\lvert\sec x+\tan x\rvert+C$ |
| $\int \sinh x\,dx$ | $\cosh x+C$ |
| $\int \frac{dx}{\sqrt{1-x^2}}$ | $\sin^{-1}x+C$ |
| $\int \frac{dx}{1+x^2}$ | $\tan^{-1}x+C$ |
| $\int \frac{dx}{x\sqrt{x^2-1}}$ | $\sec^{-1}\lvert x\rvert+C$ |
| $\int \frac{dx}{\sqrt{a^2-x^2}}$ | $\sin^{-1}\frac{x}{a}+C$ |
| $\int \frac{dx}{a^2+x^2}$ | $\frac1a\tan^{-1}\frac{x}{a}+C$ |
| $\int \frac{dx}{x^2-a^2}$ | $\frac{1}{2a}\ln\left\lvert\frac{x-a}{x+a}\right\rvert+C$ |
| $\int \frac{dx}{\sqrt{x^2\pm a^2}}$ | $\ln\left\lvert x+\sqrt{x^2\pm a^2}\right\rvert+C$ |
| $\int \ln x\,dx$ | $x\ln x - x + C$ |

> [!tip] High-yield ★
> The $a^2\pm x^2$ and $x^2-a^2$ forms appear in nearly every board integral item. Memorize the $\frac1a$ and $\frac{1}{2a}$ prefactors — dropping them is the standard trap.

---

### 2. Algebraic Substitution

**Substitution rule ★**

$$\int f\big(g(x)\big)g'(x)\,dx=\int f(u)\,du,\qquad du=g'(x)\,dx$$


**Definite version**

$$\int_a^b f\big(g(x)\big)g'(x)\,dx=\int_{g(a)}^{g(b)} f(u)\,du$$

**Common substitutions**

| Integrand feature | Substitution |
|---|---|
| $\sqrt{a^2-x^2}$ | $x=a\sin\theta$ |
| $\sqrt{a^2+x^2}$ | $x=a\tan\theta$ |
| $\sqrt{x^2-a^2}$ | $x=a\sec\theta$ |
| $\sqrt{ax+b}$ | $u=\sqrt{ax+b}$ |
| Rational in $e^{x}$ | $u=e^{x}$ |
| Rational in $\sin x,\cos x$ | $t=\tan\frac{x}{2}$ |

**Tangent half-angle forms** — $t=\tan\frac{x}{2}$

$$\sin x=\frac{2t}{1+t^2},\qquad \cos x=\frac{1-t^2}{1+t^2},\qquad dx=\frac{2\,dt}{1+t^2}$$

**Symmetry shortcut**

$$\int_{-a}^{a} f(x)dx=2\int_0^a f(x)dx\ (f\text{ even}),\qquad \int_{-a}^{a} f(x)dx=0\ (f\text{ odd})$$


**Conditions:** $u=g(x)$ differentiable, $f$ continuous on the range of $g$; integrand even/odd on $[-a,a]$.

> [!warning] Exam trap
> For a definite integral through substitution, **change the limits**. Back-substituting to $x$ and forgetting to restore the original bounds is the most frequent mechanical error.

---

### 3. Definite Integrals and FTC

**Fundamental Theorem of Calculus ★**

$$\int_a^b f(x)\,dx = F(b)-F(a) \qquad \text{(Part 2)}$$

$$\frac{d}{dx}\int_a^x f(t)\,dt=f(x)\qquad \text{(Part 1)}$$


**General Leibniz rule**

$$\frac{d}{dx}\int_{u(x)}^{v(x)} f(t)\,dt = f\big(v(x)\big)v'(x)-f\big(u(x)\big)u'(x)\quad \text{(★)}$$


**Properties**

$$\int_a^b f=-\int_b^a f,\qquad \int_a^a f=0,\qquad \int_a^b f=\int_a^c f+\int_c^b f$$

$$\left|\int_a^b f\right|\le \int_a^b |f|,\qquad \int_a^b c\,dx = c(b-a)$$

**Average integrand identity**

$$\int_a^b f(x)dx = f(c)(b-a)\quad \text{for some } c\in[a,b]$$

**Conditions:** $f$ continuous on $[a,b]$, $F'=f$; $f$ continuous, $u,v$ differentiable.

> [!tip] High-yield ★
> If an item gives $\frac{d}{dx}\int_{x^2}^{3x} f(t)dt$, apply the general Leibniz rule directly: $f(3x)\cdot3 - f(x^2)\cdot 2x$. No integration required.

---

### 4. Integration by Parts and Tabular

**By parts ★**

$$\int u\,dv = uv-\int v\,du,\qquad \int_a^b u\,dv=\big[uv\big]_a^b-\int_a^b v\,du$$

**Conditions:** $u,v$ differentiable; choose $u$ by **LIATE** (Log, Inverse trig, Algebraic, Trig, Exponential).

![](https://www.youtube.com/watch?v=Yyic5aaXGaw)

*Video: Integration By Parts — Tabular Method — The Organic Chemistry Tutor, 18:10*

**Repeated parts (recursive)**

$$\int x^{n}e^{ax}dx=\frac{x^{n}e^{ax}}{a}-\frac{n}{a}\int x^{n-1}e^{ax}dx$$

$$\int e^{ax}\sin bx\,dx=\frac{e^{ax}\big(a\sin bx-b\cos bx\big)}{a^2+b^2}+C \quad \text{(★)}$$

$$\int e^{ax}\cos bx\,dx=\frac{e^{ax}\big(a\cos bx+b\sin bx\big)}{a^2+b^2}+C \quad \text{(★)}$$

$$\int \ln x\,dx=x\ln x-x+C,\qquad \int \tan^{-1}x\,dx=x\tan^{-1}x-\tfrac12\ln(1+x^2)+C$$

**Tabular parts** — for $\int x^{n}\,g(x)\,dx$: differentiate $x^{n}$ to zero, integrate $g$ repeatedly, alternate signs $+,-,+,-,\dots$

| Sign | $D$ (differentiate) | $I$ (integrate) |
|---|---|---|
| $+$ | $x^2$ | $e^{2x}$ |
| $-$ | $2x$ | $\frac12 e^{2x}$ |
| $+$ | $2$ | $\frac14 e^{2x}$ |
| $-$ | $0$ | $\frac18 e^{2x}$ |

**Cyclic parts** — for $\int e^{ax}\sin bx\,dx$, apply parts twice and solve algebraically for the integral.

> [!warning] Exam trap
> $\int \ln x\,dx$ and $\int \sin^{-1}x\,dx$ have **no** elementary antiderivative by inspection — set $u=\ln x$ or $u=\sin^{-1}x$ and $dv=dx$.

---

### 5. Trigonometric Integrals and Substitution

**Odd power of sine/cosine ★**

$$\int \sin^{m}x\cos^{n}x\,dx:\ \text{keep one factor, convert with } \sin^2x+\cos^2x=1,\ \text{let } u=\text{the other}$$

![](https://www.youtube.com/watch?v=ocgjfF2AboA)

*Video: Trigonometric Substitution — The Organic Chemistry Tutor, 19:50*

**Wallis' formula ★** — $m,n$ non-negative integers, double factorial $n!!=n(n-2)(n-4)\cdots$ down to $1$ or $2$.

$$\int_0^{\pi/2}\sin^{m}x\cos^{n}x\,dx=\frac{(m-1)!!\,(n-1)!!}{(m+n)!!}\,\alpha,\qquad \alpha=\begin{cases}\frac{\pi}{2}, & m,n\ \text{both even}\\[2pt] 1, & \text{otherwise}\end{cases}$$

**Conditions:** at least one exponent odd.

**Even powers — power reduction ★**

$$\sin^2x=\frac{1-\cos 2x}{2},\qquad \cos^2x=\frac{1+\cos 2x}{2},\qquad \sin x\cos x=\frac{\sin 2x}{2}$$

$$\sin^3x=\frac{3\sin x-\sin 3x}{4},\qquad \cos^3x=\frac{3\cos x+\cos 3x}{4}$$

**Products**

$$\sin A\cos B=\tfrac12\big[\sin(A+B)+\sin(A-B)\big]$$

$$\sin A\sin B=\tfrac12\big[\cos(A-B)-\cos(A+B)\big],\qquad \cos A\cos B=\tfrac12\big[\cos(A-B)+\cos(A+B)\big]$$

**Tangents and secants** — $u=\tan x$ or $u=\sec x$

$$\int \tan^{m}x\sec^{n}x\,dx:\ \sec^2x=1+\tan^2x,\qquad d(\tan x)=\sec^2x\,dx,\qquad d(\sec x)=\sec x\tan x\,dx$$

**Trigonometric substitution ★**

$$\sqrt{a^2-x^2}: x=a\sin\theta,\quad \sqrt{a^2-x^2}=a\cos\theta$$

$$\sqrt{a^2+x^2}: x=a\tan\theta,\quad \sqrt{a^2+x^2}=a\sec\theta$$

$$\sqrt{x^2-a^2}: x=a\sec\theta,\quad \sqrt{x^2-a^2}=a\tan\theta$$

**Resulting arc integrals**

$$\int\frac{dx}{\sqrt{a^2-x^2}}=\sin^{-1}\frac{x}{a}+C,\qquad \int\sqrt{a^2-x^2}\,dx=\frac{x}{2}\sqrt{a^2-x^2}+\frac{a^2}{2}\sin^{-1}\frac{x}{a}+C$$

> [!tip] High-yield ★
> Even–even powers ⇒ power-reduction identities. Odd power ⇒ peel one factor and substitute. This decision tree answers every $\int\sin^m\cos^n$ item in under 30 seconds.

---

### 6. Partial Fractions

![](https://www.youtube.com/watch?v=rYQSO8D2-cc)

*Video: Integration by Partial Fractions — enginerdmath, 18:07*

**Setup ★**

**Conditions:** rational function, degree of numerator < degree of denominator (else divide first).

**Factor cases**

| Denominator factor | Partial fraction form |
|---|---|
| $(x-a)$ linear | $\frac{A}{x-a}$ |
| $(x-a)^{k}$ repeated | $\frac{A_1}{x-a}+\dots+\frac{A_k}{(x-a)^{k}}$ |
| $x^2+bx+c$ irreducible | $\frac{Ax+B}{x^2+bx+c}$ |
| $(x^2+bx+c)^{k}$ | $\sum_{i=1}^{k}\frac{A_ix+B_i}{(x^2+bx+c)^{i}}$ |

**Cover-up (Heaviside) rule** — for a distinct linear factor:

$$A=\lim_{x\to a}(x-a)\frac{N(x)}{D(x)}=\frac{N(a)}{D'(a)}$$

**Resulting integrals**

$$\int\frac{dx}{x-a}=\ln|x-a|+C,\qquad \int\frac{Ax+B}{x^2+bx+c}dx=\frac{A}{2}\ln|x^2+bx+c|+\frac{2B-Ab}{\sqrt{4c-b^2}}\tan^{-1}\frac{2x+b}{\sqrt{4c-b^2}}+C$$

**Improper rational function** — if $\deg N\ge\deg D$, first perform polynomial division $N=D\,Q+R$.

> [!warning] Exam trap
> Repeated linear factors need **every** power: $\frac{1}{x(x-1)^2}=\frac{A}{x}+\frac{B}{x-1}+\frac{C}{(x-1)^2}$. Omitting the lower power makes the system unsolvable.

---

### 7. Improper Integrals

![](https://www.youtube.com/watch?v=ND9cEdfCFr0)

*Video: Improper Integrals — Convergence and Divergence — The Organic Chemistry Tutor, 13:56*

**Infinite interval ★**

$$\int_a^{\infty} f(x)dx=\lim_{t\to\infty}\int_a^t f(x)dx,\qquad \int_{-\infty}^{\infty} f = \int_{-\infty}^{c} f + \int_{c}^{\infty} f$$

**Oscillatory divergence ★**

$$\int_a^{\infty}\sin x\,dx\quad\text{and}\quad\int_a^{\infty}\cos x\,dx\ \text{diverge by oscillation, not by the }p\text{-test}$$

The $p$-test covers only $\int_1^{\infty}x^{-p}dx$, which converges iff $p>1$; it says nothing about a non-decaying oscillating integrand.

**Conditions:** integrand continuous on the stated interval.

**Infinite discontinuity**

$$\int_a^b f(x)dx=\lim_{t\to b^-}\int_a^t f(x)dx \quad \text{(singularity at } b)$$

**p-integral test ★**

$$\int_1^{\infty}\frac{dx}{x^{p}} \begin{cases} \text{converges}, & p>1\\ \text{diverges}, & p\le 1\end{cases}\qquad \int_0^{1}\frac{dx}{x^{p}} \begin{cases} \text{converges}, & p<1\\ \text{diverges}, & p\ge 1\end{cases}$$

**Gaussian integral ★**

$$\int_0^{\infty} e^{-x^2}dx=\frac{\sqrt{\pi}}{2},\qquad \int_{-\infty}^{\infty}e^{-ax^2}dx=\sqrt{\frac{\pi}{a}},\ a>0$$

**Gamma function**

$$\Gamma(n)=\int_0^{\infty} x^{n-1}e^{-x}dx,\quad \Gamma(n+1)=n!,\quad \Gamma\!\left(\tfrac12\right)=\sqrt{\pi}$$

**Comparison test** — if $0\le f\le g$ and $\int g$ converges, then $\int f$ converges; if $\int f$ diverges and $f\le g$, then $\int g$ diverges.

> [!tip] High-yield ★
> $\int_1^\infty x^{-p}$ converges only for $p>1$, but $\int_0^1 x^{-p}$ converges only for $p<1$. The inequalities are **opposite** — a favourite board trap.

---

### 8. Average Value and MVT for Integrals

**Average value of a function ★**

$$f_{\text{ave}}=\frac{1}{b-a}\int_a^b f(x)\,dx$$

**Conditions:** $f$ continuous on $[a,b]$.

**Mean Value Theorem for Integrals ★**

$$\int_a^b f(x)dx = f(c)(b-a)\quad \text{for some } c\in[a,b]$$

**Root-mean-square (RMS) value ★**

$$f_{\text{rms}}=\sqrt{\frac{1}{b-a}\int_a^b \big[f(x)\big]^2dx}$$

**Periodic signals** — period $T$, full-cycle average

$$f_{\text{ave}}=\frac1T\int_0^T f(t)\,dt,\qquad f_{\text{rms}}=\sqrt{\frac1T\int_0^T f^2(t)\,dt}$$

**Sinusoid benchmarks ★**

$$v(t)=V_m\sin\omega t:\quad V_{\text{ave}}=\frac{2V_m}{\pi},\qquad V_{\text{rms}}=\frac{V_m}{\sqrt2}\approx0.707V_m$$

**Double-subscript / total distance**

$$x_{\text{ave}}=\frac{1}{t_2-t_1}\int_{t_1}^{t_2}v(t)\,dt$$

> [!warning] Exam trap
> Average value is $\frac{1}{b-a}\int f$, **not** $f$ at the midpoint. RMS requires squaring *before* integrating — never average first and square after.

---

## Part B — Applications of Integration

### 9. Plane Areas Cartesian

**Area between curves ★**

$$A=\int_a^b\big[f(x)-g(x)\big]dx$$

**Conditions:** $f(x)\ge g(x)$ on $[a,b]$ (or split into subintervals).

**Vertical vs horizontal strips**

$$A=\int_a^b \big[y_{\text{upper}}-y_{\text{lower}}\big]dx \qquad\text{or}\qquad A=\int_c^d \big[x_{\text{right}}-x_{\text{left}}\big]dy$$

**Area with axis crossings** — split at roots of $f$:

$$A=\int_a^b |f(x)-g(x)|\,dx = \sum_i \int_{x_i}^{x_{i+1}} (\text{top}-\text{bottom})\,dx$$

**Signed vs geometric area**

$$\text{Net area}=\int_a^b f(x)dx,\qquad \text{Total area}=\int_a^b|f(x)|dx$$

> [!tip] High-yield ★
> Sketch first, then decide orientation. Horizontal strips ($dy$) turn many two-integral $dx$ problems into a single integral — the classic time-saver.

---

### 10. Plane Areas Polar

**Area in polar coordinates ★**

$$A=\frac12\int_{\alpha}^{\beta} r^2\,d\theta$$

**Conditions:** $r(\theta)$ continuous, region swept once.

**Area between two polar curves**

$$A=\frac12\int_{\alpha}^{\beta}\big(r_{\text{outer}}^2-r_{\text{inner}}^2\big)d\theta$$

**Polar–Cartesian conversion**

$$x=r\cos\theta,\quad y=r\sin\theta,\quad r^2=x^2+y^2,\quad dA=r\,dr\,d\theta$$

**Common polar areas**

| Curve | Area |
|---|---|
| Circle $r=a$ | $\pi a^2$ |
| Cardioid $r=a(1+\cos\theta)$ | $\frac32\pi a^2$ |
| One petal of $r=a\cos n\theta$ ($n$ odd) | $\frac{\pi a^2}{4n}$ |
| Rose $r=a\cos 2\theta$ (one leaf) | $\frac{\pi a^2}{8}$ |
| Lemiscate $r^2=a^2\cos2\theta$ (one loop) | $\frac{a^2}{2}$ |

**Intersection angles** — set $r_1=r_2$ to find $\theta$ limits; verify the region is traced exactly once.

> [!warning] Exam trap
> The polar area factor is $\frac12$, and $\theta$ must be in **radians**. Using degrees is the single most common error in this topic.

---

### 11. Volumes by Slicing, Disk and Washer

![](https://www.youtube.com/watch?v=QLHJl2_aM5Q)

*Video: Volume of a Solid of Revolution by Integration — Professor Dave Explains, 11:20*

**General slicing ★**

$$V=\int_a^b A(x)\,dx$$

**Conditions:** $A(x)$ continuous cross-sectional area.

**Disk method** — rotation about a coordinate axis

$$V=\pi\int_a^b\big[f(x)\big]^2dx \quad\text{(about x-axis)},\qquad V=\pi\int_c^d\big[g(y)\big]^2dy \quad\text{(about y-axis)}$$

**Washer method ★** — rotation with a hole about the x-axis:

$$V=\pi\int_a^b\Big(\big[R(x)\big]^2-\big[r(x)\big]^2\Big)dx$$

**Off-axis rotation (shifted axis $y=k$)**

$$V=\pi\int_a^b\Big(\big[R(x)-k\big]^2-\big[r(x)-k\big]^2\Big)dx$$

**Known solids**

$$V_{\text{sphere}}=\frac43\pi a^3,\qquad V_{\text{cone}}=\frac13\pi r^2h,\qquad V_{\text{torus}}=\pi r^2(2\pi R)$$

**Prismoid formula (average end areas)**

$$V=\frac{L}{6}\big(A_1+4A_m+A_2\big) \quad \text{(★)}$$

> [!tip] High-yield ★
> Locate the **axis of rotation** before choosing disk vs washer. Strip perpendicular to the axis ⇒ disk/washer; strip parallel to the axis ⇒ shells ([[02_Integral_Calculus#12. Volumes by Cylindrical Shells|Volumes by Cylindrical Shells]]).

---

### 12. Volumes by Cylindrical Shells

![](https://www.youtube.com/watch?v=D5sT1br9soI)

*Video: Shell Method — Volume of Revolution — The Organic Chemistry Tutor, 12:20*

**Shell method ★**

$$V=2\pi\int_a^b x\,h(x)\,dx = 2\pi\int_a^b (\text{radius})(\text{height})\,dx$$

**Conditions:** rotation about the y-axis, shell radius $x$, height $h(x)$.

**General shell element**

$$dV = 2\pi\,\rho\,h\,d\rho,\qquad V=2\pi\int \rho\,h\,d\rho$$

**Rotation about $x=k$** — radius $\rho=|x-k|$:

$$V=2\pi\int_a^b |x-k|\,h(x)\,dx$$

**Rotation about $y=k$** (horizontal strips, height $w(y)$):

$$V=2\pi\int_c^d |y-k|\,w(y)\,dy$$

**Choice guide ★**

| Situation | Prefer |
|---|---|
| Strip ⊥ to axis, easy $R,r$ | Disk / washer |
| Strip ∥ to axis, $y=f(x)$ hard to invert | Shells |
| Rotation about y-axis with $y=f(x)$ given | Shells |

> [!warning] Exam trap
> Shell volume carries $2\pi$, washer volume carries $\pi$ with squared radii. Mixing the two factors is the classic sign of a rushed solution.

---

### 13. Arc Length and Surface Area

**Arc length — Cartesian ★**

$$L=\int_a^b\sqrt{1+\big[f'(x)\big]^2}\,dx$$

**Conditions:** $f'$ continuous on $[a,b]$.

**Arc length — parametric**

$$L=\int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt$$

**Arc length — polar ★**

$$L=\int_{\alpha}^{\beta}\sqrt{r^2+\left(\frac{dr}{d\theta}\right)^2}\,d\theta$$

**Arc length — $x=g(y)$**

$$L=\int_c^d\sqrt{1+\big[g'(y)\big]^2}\,dy$$

**Surface of revolution ★**

$$S=2\pi\int_a^b f(x)\sqrt{1+\big[f'(x)\big]^2}\,dx \quad\text{(about x-axis: radius }=f(x))$$

$$S=2\pi\int_a^b x\sqrt{1+\big[f'(x)\big]^2}\,dx \quad\text{(about y-axis: radius }=x)$$

**Parametric surface**

$$S=2\pi\int y(t)\sqrt{(x')^2+(y')^2}\,dt$$

**Differential forms**

$$ds=\sqrt{1+(y')^2}\,dx=\sqrt{dx^2+dy^2}=r\,d\theta\sqrt{1+\left(\frac{r'}{r}\right)^2}$$

> [!tip] High-yield ★
> Surface area always carries the multiplier $2\pi(\text{radius})$. The radius comes from the **axis of rotation**, not from the curve's own coordinate.

---

### 14. Centroids and Pappus-Guldinus

![](https://www.youtube.com/watch?v=Jba_BxxDw94)

*Video: The Theorem of Pappus-Guldinus: Surface Area and Volume — Jeff Hanson, 18:43*

**Centroid formulas ★**

$$\bar{x}=\frac{\displaystyle\int_a^b x\,dA}{\displaystyle\int_a^b dA}=\frac{\int x\big[f(x)-g(x)\big]dx}{A},\qquad \bar{y}=\frac{1}{A}\int_a^b \frac{f(x)+g(x)}{2}\big[f(x)-g(x)\big]dx$$

**Area moment of inertia (second moment) ★** — $I$ in m⁴ for a plane area.

$$I_x=\int_A y^2\,dA=\int \tfrac13 y^3\,dx\ \text{(area between curve and the }x\text{-axis)},\qquad I_y=\int_A x^2\,dA$$

$$\text{Parallel-axis shift: } I_x=I_{\bar x}+A\bar y^{2},\qquad I_y=I_{\bar y}+A\bar x^{2}$$

$I_{\bar x},I_{\bar y}$ are the centroidal second moments, $A$ in m², $(\bar x,\bar y)$ the centroid in m.

**Conditions:** uniform density, planar lamina.

**General area/moment relations**

$$A=\int dA,\qquad Q_y=\int x\,dA=A\bar{x},\qquad Q_x=\int y\,dA=A\bar{y}$$

**Composite bodies**

$$\bar{x}=\frac{\sum A_i\bar{x}_i}{\sum A_i},\qquad \bar{y}=\frac{\sum A_i\bar{y}_i}{\sum A_i},\qquad \bar{z}=\frac{\sum V_i\bar{z}_i}{\sum V_i}$$

**Centroid by integration over a volume**

$$\bar{x}=\frac{1}{V}\int x\,dV,\qquad V=\int dV$$

**Pappus–Guldinus theorems ★**

$$\text{Volume: } V = 2\pi \bar{r}\,A \qquad \text{(area revolved about a non-intersecting axis)}$$

$$\text{Surface: } S = 2\pi \bar{r}\,L \qquad \text{(curve length } L\text{ revolved)}$$

where $\bar{r}$ = perpendicular distance from centroid to the axis of revolution.

**Standard centroid table ★**

| Shape | $\bar{x}$ from base/centre |
|---|---|
| Triangle (height $h$) | $h/3$ from base |
| Semicircle (radius $r$) | $\frac{4r}{3\pi}$ from diameter |
| Quarter circle | $\frac{4r}{3\pi}$ from each straight edge |
| Semicircular arc | $\frac{2r}{\pi}$ from centre |
| Parabolic segment (base $b$, height $h$) | $\frac{3b}{8}$, centroid at $\frac{3h}{5}$ |
| Right cone (height $h$) | $h/4$ from base |

> [!warning] Exam trap
> Pappus applies only when the axis **does not cut** the region. If the axis intersects the area, the theorem is invalid — integrate directly instead.

---

### 15. Work and Hydrostatic Force

![](https://www.youtube.com/watch?v=3jG-hWgUJko)

*Video: Hydrostatic Force Problems — The Organic Chemistry Tutor, 20:59*

**Work — variable force ★**

$$W=\int_a^b F(x)\,dx \qquad \text{(units: N·m = J)}$$


**Work — pumping fluids**

$$W=\rho g\int_a^b A(y)\,\big(\text{lift distance}\big)\,dy,\qquad \rho g = 9810\ \text{N/m}^3\ \text{(water)}$$

$$W=\int_a^b (\gamma)\,(A(y))\,(d-y)\,dy \quad \text{(★)}$$

**Hooke's law**

$$F=kx\ (k\ \text{in N/m}),\qquad W=\int_0^{x_1}kx\,dx=\frac12kx_1^2$$

**Spring work between positions**

$$W=\frac{k}{2}\big(x_2^2-x_1^2\big)$$

**Hydrostatic force on a plate ★**

$$F=\int_a^b \rho g\,h(y)\,w(y)\,dy = \gamma\int_a^b h\,w\,dy \qquad \text{(N)}$$


**Centre of pressure**

$$y_{cp}=\frac{\displaystyle\int y\,dF}{\displaystyle\int dF}=\bar{y}+\frac{I_{xc}}{A\bar{y}} \quad \text{(★)}$$

**Work–energy forms**

$$W=\Delta KE=\tfrac12m\big(v_2^2-v_1^2\big),\qquad W=\int P\,dt \quad (P\ \text{in W})$$

**Conditions:** force $F(x)$ continuous along the path; plate vertical, fluid of density $\rho$.

> [!tip] High-yield ★
> In both work and hydrostatic items, put the origin at the **surface** and let $y$ measure depth. Every distance term then becomes a clean $(d-y)$ or $y$, eliminating sign errors.

## Part C — Multiple Integrals

### 16. Iterated and Double Integrals

**Fubini: evaluate one variable at a time ★** — $R$ a plane region, $dA$ in m².

$$\iint_R f(x,y)\,dA=\int_a^b\!\!\int_{g_1(x)}^{g_2(x)}f(x,y)\,dy\,dx=\int_c^d\!\!\int_{h_1(y)}^{h_2(y)}f(x,y)\,dx\,dy$$

![](https://www.youtube.com/watch?v=UubU3U2C8WM)

*Video: Double and Triple Integrals — Professor Dave Explains, 15:29*

**Reversing the order of integration** — sketch $R$, restate the bounds for the other variable, then swap $dy\,dx$ to $dx\,dy$; the value is unchanged but the work often collapses.

**Area, mass and average value ★**

$$A=\iint_R dA,\qquad M=\iint_R \rho(x,y)\,dA,\qquad \bar f=\frac1A\iint_R f\,dA$$

$$\bar x=\frac1M\iint_R x\rho\,dA,\qquad \bar y=\frac1M\iint_R y\rho\,dA$$

$A$ in m², $\rho$ in kg/m², $M$ in kg, $\bar f$ in the unit of $f$, $(\bar x,\bar y)$ the lamina centroid in m.

**Conditions:** $f$ continuous on the closed bounded region $R$; inner limits may depend on the outer variable but the outer limits must be constants; a uniform lamina takes $\rho=1$ so $M=A$. #integral

> [!tip] High-yield ★
> If the inner integral cannot be evaluated, the order of integration is wrong — reverse it first. A region bounded by $y=x^2$ and $y=x$ is far easier as $dy\,dx$.

---

---

→ Back to [[00_Index]]
