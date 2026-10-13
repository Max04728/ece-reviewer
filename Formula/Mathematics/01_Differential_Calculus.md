---
title: Differential Calculus
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 8
---

## Part A — Limits and Differentiation

### 1. Limits, Continuity and L'Hôpital

**Limit definitions ★**

$$\lim_{x\to a} f(x) = L \iff \forall \varepsilon > 0,\ \exists \delta > 0 : 0 < |x-a| < \delta \Rightarrow |f(x)-L| < \varepsilon$$

$$\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = L \quad \text{(two-sided limit exists)}$$

**Continuity at $x=a$ ★** — $f$ is continuous iff all three hold:

$$\lim_{x\to a} f(x) \ \text{exists},\qquad f(a)\ \text{is defined},\qquad \lim_{x\to a} f(x) = f(a)$$

**Infinite limits and asymptotes**

$$\lim_{x\to a}\frac{1}{(x-a)^2} = +\infty,\qquad \text{vertical asymptote } x=a \iff \lim_{x\to a^{\pm}} f(x) = \pm\infty$$

$$\lim_{x\to\infty} f(x) = L \iff y = L \ \text{is a horizontal asymptote}$$

**Squeeze theorem** — if $g(x) \le f(x) \le h(x)$ near $a$ and $\lim g = \lim h = L$, then $\lim f = L$.

**Indeterminate forms:** $\frac{0}{0},\ \frac{\infty}{\infty},\ 0\cdot\infty,\ \infty-\infty,\ 0^0,\ 1^\infty,\ \infty^0$.

**L'Hôpital's rule ★**

$$\lim_{x\to a}\frac{f(x)}{g(x)} = \lim_{x\to a}\frac{f'(x)}{g'(x)} \qquad (g'(x)\neq 0)$$

**Conditions:** $f,g$ differentiable near $a$, form is $\frac{0}{0}$ or $\frac{\infty}{\infty}$.

![](https://www.youtube.com/watch?v=g45quDrSA6g)

*Video: Understanding Limits and L'Hospital's Rule — Professor Dave Explains, 9:12*

**Indeterminate products / powers**

$$f\cdot g = \frac{f}{1/g} \Rightarrow \frac{\infty}{\infty};\qquad f^g = e^{g\ln f}\quad (0^0,1^\infty,\infty^0)$$

**Standard limits ★**

| Limit | Value |
|---|---|
| $\lim\limits_{x\to0}\frac{\sin ax}{x}$ | $a$ |
| $\lim\limits_{x\to0}\frac{1-\cos x}{x^2}$ | $\tfrac12$ |
| $\lim\limits_{x\to0}\frac{\tan x}{x}$ | $1$ |
| $\lim\limits_{x\to0}\frac{e^{x}-1}{x}$ | $1$ |
| $\lim\limits_{x\to0}\frac{\ln(1+x)}{x}$ | $1$ |
| $\lim\limits_{x\to\infty}\left(1+\frac{1}{x}\right)^{x}$ | $e \approx 2.71828$ |
| $\lim\limits_{x\to0}(1+x)^{1/x}$ | $e$ |

> [!tip] High-yield ★
> $\frac{0}{0}$ from a trigonometric ratio: try the standard limits first, then L'Hôpital. Differentiate numerator and denominator **separately** — never apply the quotient rule here.

---

### 2. Differentiation Rules

**Definition ★**

$$f'(x) = \lim_{h\to 0}\frac{f(x+h)-f(x)}{h} = \lim_{\Delta x\to0}\frac{\Delta y}{\Delta x}$$

**Basic rules**

$$\frac{d}{dx}(c)=0,\quad \frac{d}{dx}(x^n)=nx^{n-1},\quad \frac{d}{dx}\big[c\,f\big]=c\,f'$$

$$(fg)' = f'g + fg' \qquad \left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2},\ g\neq0$$

$$\text{Chain: } \frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx} \qquad \text{Leibniz: } (fg)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}f^{(k)}g^{(n-k)}$$

**Differentiability versus continuity ★**

$$\text{differentiable at }a\ \Rightarrow\ \text{continuous at }a,\qquad \text{continuous}\ \nRightarrow\ \text{differentiable}$$

A corner, cusp or vertical tangent breaks the converse: $y=\lvert x\rvert$ is continuous at $0$ but not differentiable there.

**Conditions:** all derivatives exist.

**Elementary derivatives ★**

| $f(x)$ | $f'(x)$ |
|---|---|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\cot x$ | $-\csc^2 x$ |
| $\sec x$ | $\sec x\tan x$ |
| $\csc x$ | $-\csc x\cot x$ |
| $\ln x$ | $\frac1x$ |
| $\log_a x$ | $\frac{1}{x\ln a}$ |
| $e^{x}$ | $e^{x}$ |
| $a^{x}$ | $a^{x}\ln a$ |
| $\sinh x$ | $\cosh x$ |
| $\cosh x$ | $\sinh x$ |

**Inverse trigonometric ★**

$$\frac{d}{dx}\sin^{-1}x=\frac{1}{\sqrt{1-x^2}},\qquad \frac{d}{dx}\cos^{-1}x=\frac{-1}{\sqrt{1-x^2}},\qquad |x|<1$$

$$\frac{d}{dx}\tan^{-1}x=\frac{1}{1+x^2},\qquad \frac{d}{dx}\cot^{-1}x=\frac{-1}{1+x^2}$$

$$\frac{d}{dx}\sec^{-1}x=\frac{1}{|x|\sqrt{x^2-1}},\qquad \frac{d}{dx}\csc^{-1}x=\frac{-1}{|x|\sqrt{x^2-1}},\qquad |x|>1$$

**General power / log forms** — $u=u(x)$

$$\frac{d}{dx}u^{n}=nu^{n-1}u',\qquad \frac{d}{dx}\ln u=\frac{u'}{u},\qquad \frac{d}{dx}e^{u}=e^{u}u'$$

> [!warning] Exam trap
> $\frac{d}{dx}\sec^{-1}x$ and $\frac{d}{dx}\csc^{-1}x$ carry $|x|$, not $x$. Sign errors here are the most common single-point loss in this topic.

---

### 3. Implicit, Parametric and Logarithmic Differentiation

![](https://www.youtube.com/watch?v=LGY-DjFsALc)

*Video: Implicit Differentiation Explained — The Organic Chemistry Tutor, 12:48*

**Implicit differentiation ★**

$$\frac{dy}{dx} = -\frac{F_x}{F_y},\qquad F_y \neq 0$$


**Parametric curves** — $x=x(t),\ y=y(t)$

$$\frac{dy}{dx}=\frac{dy/dt}{dx/dt},\qquad \frac{d^2y}{dx^2}=\frac{\frac{d}{dt}\!\left(\frac{dy}{dx}\right)}{dx/dt}$$

**Arc slope/polar form** — $r=r(\theta)$

$$x=r\cos\theta,\quad y=r\sin\theta,\qquad \frac{dy}{dx}=\frac{r'\sin\theta + r\cos\theta}{r'\cos\theta - r\sin\theta}$$

**Logarithmic differentiation ★**

$$\ln y = v\ln u \ \Rightarrow\ \frac{1}{y}\frac{dy}{dx}=v'\ln u + v\frac{u'}{u}\ \Rightarrow\ \frac{dy}{dx}=y\left(v'\ln u + \frac{vu'}{u}\right)$$


**Conditions:** $F(x,y)=0$ defines $y$ locally as a differentiable function of $x$; $y>0$; use for $y=u^{v}$, long products or quotients.

> [!tip] High-yield ★
> For $y=x^{x}$ or $y=(\sin x)^{x}$, always take $\ln$ first: $\frac{dy}{dx}=x^{x}(1+\ln x)$. Do not reach for the power rule — the exponent is variable.

---

### 4. Related Rates

**Chain-rule setup ★**

$$\frac{dA}{dt}=\frac{dA}{dx}\cdot\frac{dx}{dt},\qquad \frac{dV}{dt}=\frac{dV}{dr}\cdot\frac{dr}{dt}$$

**Conditions:** all quantities differentiable in time $t$.

![](https://www.youtube.com/watch?v=j6I3EXiKB2A)

*Video: Related Rates in Calculus — Professor Dave Explains, 8:53*

**Common geometric rates**

| Quantity | Relation | Rate form |
|---|---|---|
| Circle area | $A=\pi r^2$ | $\frac{dA}{dt}=2\pi r\frac{dr}{dt}$ |
| Sphere volume | $V=\frac43\pi r^3$ | $\frac{dV}{dt}=4\pi r^2\frac{dr}{dt}$ |
| Cylinder volume | $V=\pi r^2h$ | $\frac{dV}{dt}=\pi\!\left(2rh\frac{dr}{dt}+r^2\frac{dh}{dt}\right)$ |
| Cone volume | $V=\frac13\pi r^2h$ | $\frac{dV}{dt}=\frac{\pi}{3}\!\left(2rh\frac{dr}{dt}+r^2\frac{dh}{dt}\right)$ |
| Right triangle | $x^2+y^2=s^2$ | $2x\frac{dx}{dt}+2y\frac{dy}{dt}=2s\frac{ds}{dt}$ |

**Pythagorean distance rate ★**

$$\frac{ds}{dt}=\frac{x\frac{dx}{dt}+y\frac{dy}{dt}}{s},\qquad s=\sqrt{x^2+y^2}$$

**Similar-triangle proportionality** (shadow, cone, ladder problems)

$$\frac{h_1}{d_1}=\frac{h_2}{d_2} \Rightarrow \text{differentiate both sides with respect to } t$$

> [!warning] Exam trap
> Substitute the *instantaneous* numerical values **after** differentiating. Plugging in $r=5$ too early turns a variable into a constant and silently deletes a term.

---

## Part B — Applications of the Derivative

### 5. Extrema, Concavity and Inflection

![](https://www.youtube.com/watch?v=OhqNbQi9QPk)

*Video: Concavity, Inflection Points and the Second Derivative — The Organic Chemistry Tutor, 12:49*

**Critical points ★** — $c$ is critical if $f'(c)=0$ or $f'(c)$ does not exist.

**First derivative test** — $f'$ changes $+ \to -$: local max; $- \to +$: local min; no sign change: neither.

**Second derivative test ★**

$$f''(c)<0 \Rightarrow \text{local max},\qquad f''(c)>0 \Rightarrow \text{local min},\qquad f''(c)=0 \Rightarrow \text{inconclusive}$$

**Conditions:** $f'(c)=0$ and $f''$ continuous at $c$.

**Concavity and inflection**

$$f''(x)>0 \Rightarrow \text{concave up }(\cup),\qquad f''(x)<0 \Rightarrow \text{concave down }(\cap)$$

$$\text{Inflection at } c:\ f''(c)=0 \ \text{or undefined, and } f'' \text{ changes sign}$$

**Vertical/horizontal tangent** — $\frac{dy}{dx}\to\infty$ gives a vertical tangent; $\frac{dy}{dx}=0$ gives a horizontal tangent.

> [!tip] High-yield ★
> $f''(c)=0$ is **necessary but not sufficient** for an inflection point. Always confirm the sign change of $f''$ — e.g. $y=x^4$ has $y''(0)=0$ but no inflection.

---

### 6. Optimization Problems

![](https://www.youtube.com/watch?v=cUMvwG7wvzM)

*Video: How to Solve ANY Optimization Problem [Calc 1] — STEM Support, 13:03*

**Procedure (closed interval)**

1. Solve $f'(x)=0$ for critical numbers in $(a,b)$.
2. Evaluate $f$ at each critical number and at $x=a,\ x=b$.
3. Largest value = absolute max; smallest = absolute min.

**Two-variable unconstrained optimum (Hessian test) ★** — $f$ twice differentiable, $D$ = discriminant.

$$\text{solve } f_x=f_y=0\ \text{first, then evaluate}\qquad D=f_{xx}f_{yy}-f_{xy}^{2}$$

$$D>0,\ f_{xx}>0\Rightarrow\text{local minimum};\qquad D>0,\ f_{xx}<0\Rightarrow\text{local maximum};\qquad D<0\Rightarrow\text{saddle point}$$


**Constrained optimum (single variable)**

$$\text{Maximize } A(x) \Rightarrow A'(x)=0,\quad A''(x)<0 \ \text{(max)};\quad A''(x)>0\ \text{(min)}$$


**Lagrange multipliers**

$$\nabla f = \lambda\,\nabla g,\qquad \mathcal{L}(x,y,\lambda)=f(x,y)-\lambda\big(g(x,y)-c\big)$$

$$\frac{\partial \mathcal{L}}{\partial x}=\frac{\partial \mathcal{L}}{\partial y}=\frac{\partial \mathcal{L}}{\partial \lambda}=0 \quad \text{(★)}$$


**Optimum of a quadratic** $y=ax^2+bx+c$

$$x^{\ast}=-\frac{b}{2a},\qquad y_{\min/\max}=c-\frac{b^2}{4a}$$

**Rectangle/distance cases**

$$A=xy \ \text{with } 2x+2y=P \Rightarrow A=x\!\left(\frac{P}{2}-x\right),\ x^{\ast}=\frac{P}{4}\ (\text{square})$$

**Minimum distance to a curve:** minimize $D^2=(x-x_0)^2+(y-y_0)^2$ instead of $D$.

**Conditions:** $f$ continuous on $[a,b]$; constraint solved for one variable; $\nabla g \neq \vec{0}$ on the constraint surface.

> [!warning] Exam trap
> Give the **physical** answer, not just $x^{\ast}$. Board items ask for the maximum volume / minimum cost — substitute back and state units (m³, ₱, s).

---

### 7. Differentials and Error Propagation

**Differential ★**

$$dy = f'(x)\,dx,\qquad \Delta y \approx dy,\qquad \Delta y = f(x+\Delta x)-f(x)$$

**Conditions:** $f$ differentiable, $\Delta x$ small.

**Relative and percentage error**

$$\text{Relative error}=\frac{dy}{y},\qquad \text{Percentage error}=\frac{dy}{y}\times 100\%$$

**Propagation rules ★** — $\delta x,\delta y$ are absolute errors

| Relation | Absolute error |
|---|---|
| $z=x\pm y$ | $\delta z=\delta x+\delta y$ |
| $z=xy$ | $\delta z = \lvert y\rvert\,\delta x + \lvert x\rvert\,\delta y$ |
| $z=\frac{x}{y}$ | $\frac{\delta z}{\lvert z\rvert}=\frac{\delta x}{\lvert x\rvert}+\frac{\delta y}{\lvert y\rvert}$ |
| $z=x^{n}$ | $\frac{\delta z}{\lvert z\rvert}=n\frac{\delta x}{\lvert x\rvert}$ |
| $z=\ln x$ | $\delta z=\frac{\delta x}{x}$ |

**Multi-variable ★**

$$dz=\frac{\partial z}{\partial x}dx+\frac{\partial z}{\partial y}dy,\qquad \delta z \approx \left|\frac{\partial z}{\partial x}\right|\delta x+\left|\frac{\partial z}{\partial y}\right|\delta y$$

**Resistance/product example** — $P=\frac{V^2}{R}$:

$$\frac{\delta P}{P}=2\frac{\delta V}{V}+\frac{\delta R}{R}$$

> [!tip] High-yield ★
> Relative errors of products, quotients and powers **add**; they never subtract. Memorize that one sentence before the exam.

---

### 8. Rolle's and Mean Value Theorems

![](https://www.youtube.com/watch?v=qW89xdGfSzw)

*Video: Rolle's Theorem and the Mean-Value Theorem — Professor Leonard, 6:36*

**Rolle's theorem ★**

$$\exists\, c \in (a,b):\quad f'(c)=0$$


**Mean Value Theorem ★**

$$f'(c)=\frac{f(b)-f(a)}{b-a}\quad \text{for some } c\in(a,b)$$


**Geometric reading** — the tangent at $x=c$ is parallel to the secant through $\big(a,f(a)\big)$ and $\big(b,f(b)\big)$:

$$\text{slope}_{\tan} = \text{slope}_{\sec} = \frac{\Delta y}{\Delta x}$$

**Speed interpretation** — if $s(t)$ is position, then for some $t^{\ast}$:

$$v(t^{\ast}) = \frac{s(b)-s(a)}{b-a}\qquad \text{(mean speed = instantaneous speed at } t^{\ast}\text{)}$$

**Cauchy (generalized) MVT**

$$\frac{f'(c)}{g'(c)}=\frac{f(b)-f(a)}{g(b)-g(a)}$$


**Extended MVT (Taylor remainder origin)**

$$f(b)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(b-a)^k+\frac{f^{(n+1)}(c)}{(n+1)!}(b-a)^{n+1}$$

**Conditions:** $f$ continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$; $f$ continuous on $[a,b]$, differentiable on $(a,b)$; $g'\neq0$ on $(a,b)$.

> [!warning] Exam trap
> Both theorems are **existence** statements. The exam asks for the value of $c$ — solve $f'(c)=\frac{f(b)-f(a)}{b-a}$ and reject any root outside the open interval $(a,b)$.

---

→ Back to [[00_Index]]
