---
title: Differential Equations
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 14
---

## Part A — First Order Equations

### 1. Separation of Variables

**Form ★**

$$\frac{dy}{dx}=f(x)g(y)\ \Longrightarrow\ \int\frac{dy}{g(y)}=\int f(x)\,dx+C,\qquad g(y)\neq0$$

**Conditions:** $M$ depends on $x$ only, $N$ on $y$ only.

**LEGACY separable forms**

$$M(x)\,dx+N(y)\,dy=0 \Rightarrow \int M\,dx+\int N\,dy=C$$

**General solution vs particular solution** — apply $y(x_0)=y_0$ to evaluate $C$.

**Typical separable ODEs**

$$\frac{dy}{dx}=ky \Rightarrow y=Ce^{kx};\qquad \frac{dy}{dx}=\frac{x}{y}\Rightarrow y^2-x^2=C$$

> [!tip] High-yield ★
> If the ODE can be written $y'=f(x)g(y)$, separation always works. Rearrange **before** integrating — a missed algebraic split is the usual lost point.

---

### 2. Linear First Order and Bernoulli

![](https://www.youtube.com/watch?v=iCN8nGXE29o)

*Video: The Bernoulli Equation — Substitutions in Differential Equations — Dr. Trefor Bazett, 9:19*

**Standard linear form ★**

$$\frac{dy}{dx}+P(x)y=Q(x)$$

**Conditions:** $P,Q$ continuous on the interval.

**Integrating factor ★**

$$\mu(x)=e^{\int P(x)\,dx},\qquad \frac{d}{dx}\big[\mu y\big]=\mu Q$$

$$y=\frac{1}{\mu(x)}\left[\int \mu(x)Q(x)\,dx+C\right] \quad \text{(★)}$$

**Bernoulli equation** — $n\neq0,1$

$$\frac{dy}{dx}+P(x)y=Q(x)y^{n}\ \xrightarrow{\ v=y^{1-n}\ }\ \frac{dv}{dx}+(1-n)Pv=(1-n)Q$$

**Solution after substitution**

$$v=e^{(n-1)\int P dx}\left[\int (1-n)Q\,e^{(1-n)\int P dx}dx+C\right],\qquad y=v^{1/(1-n)}$$

**First-order linear with constant coefficients**

$$y'+ay=b \Rightarrow y=Ce^{-ax}+\frac{b}{a}\quad \text{(steady state } b/a\text{)}$$

> [!warning] Exam trap
> Bernoulli substitution is $v=y^{1-n}$, **not** $y^{n}$. Also divide by $y^{n}$ first so the $Q$ term is free of $y$; and check the singular solution $y=0$ when $n>0$.

---

### 3. Exact Equations and Integrating Factors

**Exactness test ★**

$$M(x,y)dx+N(x,y)dy=0 \ \text{is exact} \iff \frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}$$

**Conditions:** $M,N$ continuous with continuous first partials on a simply connected region.

![](https://www.youtube.com/watch?v=bfJJjVNh_D4)

*Video: Exact Equations with an Integrating Factor — The Lazy Engineer, 8:38*

**Solution by potential function**

$$F(x,y)=\int M(x,y)\,dx+g(y),\qquad \frac{\partial F}{\partial y}=N \Rightarrow g'(y)=N-\frac{\partial}{\partial y}\int M\,dx$$

$$F(x,y)=C \quad \text{(implicit general solution)}$$

**Integrating factor $\mu(x)$**

$$\mu(x)=e^{\int \frac{M_y-N_x}{N}dx}\quad \text{if the exponent depends on } x \text{ alone}$$

$$\mu(y)=e^{\int \frac{N_x-M_y}{M}dy}\quad \text{if it depends on } y \text{ alone}$$

**Special integrating factors**

$$\mu=\frac{1}{x^2+y^2},\qquad \mu=x^{a}y^{b},\qquad \mu=\frac{1}{xy}\ \text{for homogeneous equations}$$

> [!tip] High-yield ★
> Test exactness **first** on any $M\,dx+N\,dy=0$. If $M_y=N_x$ it is a two-line solution — no substitution, no integrating factor.

---

### 4. Homogeneous Equations and Substitutions

**Homogeneous degree $n$**

$$\frac{dy}{dx}=F\!\left(\frac{y}{x}\right)\ \xrightarrow{\ v=y/x\ }\ v+x\frac{dv}{dx}=F(v)$$

$$\int\frac{dv}{F(v)-v}=\int\frac{dx}{x}+C \quad \text{(★)}$$

**Conditions:** $f(tx,ty)=t^{n}f(x,y)$.

**Alternative substitution** — for $M,N$ homogeneous of the same degree, use $y=vx$ or $x=vy$ (whichever simplifies).

**$G(ax+by+c)$ form** — let $u=ax+by+c$:

$$\frac{dy}{dx}=G(ax+by+c)\Rightarrow \frac{du}{dx}=a+bG(u)$$

**Shift to remove constants** — for $\frac{dy}{dx}=\frac{a_1x+b_1y+c_1}{a_2x+b_2y+c_2}$, translate the origin to the intersection of the two lines.

**Isobaric / Clairaut**

$$y=px+f(p),\ p=\frac{dy}{dx}\ \Rightarrow\ \text{Clairaut: general } y=Cx+f(C),\ \text{singular } y=xp+f(p)$$

> [!warning] Exam trap
> After integrating with $v=y/x$, **back-substitute** $v=y/x$ to return to $x,y$. A solution left in $v$ is marked wrong even if the integration is correct.

---

### 5. Growth, Decay and Newton's Cooling

**Exponential law ★**

$$\frac{dP}{dt}=kP,\qquad P(t)=P_0e^{kt}$$

$$k>0\ \text{growth},\quad k<0\ \text{decay};\qquad t_{1/2}=\frac{\ln 2}{\lvert k\rvert}=\frac{0.693}{\lvert k\rvert}$$

**Symbols**

- $P(t)$ — amount present at time $t$ (population, mass or value), in the same units as $P_0$
- $P_0$ — initial amount at $t=0$, in the same units as $P$
- $k$ — growth/decay rate constant, in s$^{-1}$ (positive for growth, negative for decay)
- $t$ — elapsed time, in s
- $t_{1/2}$ — half-life, in s

**Radioactive decay**

$$A(t)=A_0e^{-\lambda t},\qquad \lambda=\frac{\ln 2}{t_{1/2}}\ \text{(s}^{-1}),\qquad N(t)=N_0e^{-\lambda t}$$

**Symbols**

- $A(t)$ — activity of the radioactive sample at time $t$, in Bq (decays per second)
- $A_0$ — initial activity at $t=0$, in Bq
- $N(t)$ — number of undecayed nuclei at time $t$, dimensionless
- $N_0$ — initial number of undecayed nuclei, dimensionless
- $\lambda$ — decay constant, in s$^{-1}$

**Newton's law of cooling ★**

$$\frac{dT}{dt}=-k\big(T-T_m\big),\qquad T(t)=T_m+\big(T_0-T_m\big)e^{-kt}$$

$$k=\frac{1}{t}\ln\frac{T_0-T_m}{T(t)-T_m} \quad \text{(★)}$$

**Symbols**

- $T(t)$ — temperature of the body at time $t$, in °C or K
- $T_0$ — initial temperature of the body at $t=0$, in °C or K
- $T_m$ — ambient (surrounding medium) temperature, in °C or K

**Continuous compounding / logistic contrast**

$$P=Pe^{rt};\qquad \frac{dP}{dt}=kP\!\left(1-\frac{P}{L}\right)\Rightarrow P(t)=\frac{L}{1+\left(\frac{L-P_0}{P_0}\right)e^{-kt}}$$

**Symbols**

- $r$ — continuous compounding rate, in s$^{-1}$ (usually quoted per year)
- $L$ — carrying capacity of the logistic model, in the same units as $P$ (dimensionless for a population count)

**Conditions:** rate of change proportional to present amount; ambient temperature $T_m$ constant.

> [!tip] High-yield ★
> Newton's cooling uses the **difference** $T-T_m$, not $T$ alone. In board items $T_m$ is often hidden in the wording — "room temperature", "surrounding air".

---

### 6. Mixtures and Orthogonal Trajectories

**Mixing (salt) problem ★**

$$\frac{dA}{dt}=\big(\text{rate in}\big)-\big(\text{rate out}\big)=c_{in}r_{in}-\frac{A(t)}{V(t)}r_{out}$$

$$V(t)=V_0+(r_{in}-r_{out})t,\qquad \text{concentration } c(t)=\frac{A(t)}{V(t)}\ (\text{kg/m}^3)$$


**Constant-volume case**

$$V\ \text{constant}:\ \frac{dA}{dt}=c_{in}r-\frac{A}{V}r \Rightarrow A(t)=c_{in}V+\big(A_0-c_{in}V\big)e^{-rt/V}$$

**Orthogonal trajectories ★**

$$\text{Given } \frac{dy}{dx}=f(x,y)\ \Rightarrow\ \text{trajectory slope } = -\frac{1}{f(x,y)}$$


**Steps**

1. Differentiate the family, eliminate the parameter to get $dy/dx=F(x,y)$.
2. Replace $dy/dx \to -1/(dy/dx)$.
3. Solve the new ODE.

**Example (circles → lines)**

$$x^2+y^2=c^2 \Rightarrow \frac{dy}{dx}=-\frac{x}{y}\ \Rightarrow\ \frac{dy}{dx}=\frac{y}{x}\Rightarrow y=kx$$

**Conditions:** well-stirred tank, uniform concentration, volume $V(t)$; families cross at right angles.

> [!warning] Exam trap
> In mixture problems the outflow concentration is $A/V$ at the **instant** $t$. If inflow ≠ outflow the volume $V(t)$ is time-varying and must be substituted before solving.

---

## Part B — Higher Order Linear ODEs

### 7. Higher Order Homogeneous Auxiliary Equation

![](https://www.youtube.com/watch?v=K--gHEn2byU)

*Video: Higher-Order Homogeneous Linear DE via the Auxiliary Equation — blackpenredpen, 11:03*

**Linear homogeneous ODE with constant coefficients ★**

$$a_ny^{(n)}+\dots+a_1y'+a_0y=0 \Rightarrow \text{auxiliary } a_nm^{n}+\dots+a_1m+a_0=0$$

**Root cases ★** — the general solution $y_c$:

| Roots of auxiliary equation | Complementary solution |
|---|---|
| Real, distinct $m_1\neq m_2$ | $y=c_1e^{m_1x}+c_2e^{m_2x}$ |
| Real, repeated $m$ (twice) | $y=(c_1+c_2x)e^{mx}$ |
| Real, repeated $k$ times | $y=(c_1+c_2x+\dots+c_kx^{k-1})e^{mx}$ |
| Complex $\alpha\pm j\beta$ | $y=e^{\alpha x}\big(c_1\cos\beta x+c_2\sin\beta x\big)$ |
| Complex repeated | $y=e^{\alpha x}\big[(c_1+c_2x)\cos\beta x+(c_3+c_4x)\sin\beta x\big]$ |

**Cauchy–Euler (equidimensional)** — $ax^2y''+bxy'+cy=0$, substitute $x=e^{t}$:

$$am(m-1)+bm+c=0,\qquad y=x^{m}\ \text{trial solution}$$

**Wronskian (independence check)**

$$W(y_1,y_2)=\begin{vmatrix} y_1 & y_2\\ y_1' & y_2'\end{vmatrix}=y_1y_2'-y_2y_1'\neq0 \Rightarrow \text{independent}$$

**Conditions:** constant coefficients for the auxiliary equation $am^2+bm+c=0$ (extend to degree $n$); roots may be distinct real, repeated or complex; the Cauchy-Euler form needs $x>0$ before substituting $x=e^{t}$; $W\neq0$ certifies linear independence.

> [!tip] High-yield ★
> Repeated real roots require the $x$ multiplier: $(c_1+c_2x)e^{mx}$. Forgetting $x$ is the single most common error in this topic.

---

### 8. Undetermined Coefficients

![](https://www.youtube.com/watch?v=AgyeJEO2a-k)

*Video: Undetermined Coefficients — Solving Non-Homogeneous ODEs — Dr. Trefor Bazett, 12:44*

**Setup ★** — $y=y_c+y_p$; guess $y_p$ from the form of $R(x)$.

| $R(x)$ | Trial $y_p$ |
|---|---|
| $k$ (constant) | $A$ |
| $ax+b$ | $Ax+B$ |
| $ax^2+bx+c$ | $Ax^2+Bx+C$ |
| $ke^{ax}$ | $Ae^{ax}$ |
| $k\cos bx$ or $k\sin bx$ | $A\cos bx+B\sin bx$ |
| $e^{ax}(A\cos bx+B\sin bx)$ | $e^{ax}(C\cos bx+D\sin bx)$ |
| $x^{n}e^{ax}$ | $(A_nx^{n}+\dots+A_0)e^{ax}$ |

**Symbols**

- $R(x)$ — non-homogeneous (forcing) term of the ODE, in the units of $y$
- $y_c$ — complementary solution of the associated homogeneous equation (carries the arbitrary constants)
- $y_p$ — particular integral, one solution of the non-homogeneous ODE, in the units of $y$
- $A,B,C,D,A_n$ — undetermined coefficients found by substitution, in the units of $y$

**Duplication rule ★** — If a term of the trial already appears in $y_c$, multiply the whole trial by $x^{s}$, where $s$ = multiplicity of that root.

$$y_p=x^{s}\big(\text{trial}\big)$$

**Superposition for mixed $R(x)$**

$$R(x)=R_1+R_2 \Rightarrow y_p=y_{p_1}+y_{p_2}$$

**Particular integral shortcut (constant coefficients)** — for $R=ke^{ax}$:

$$y_p=\frac{ke^{ax}}{F(a)},\qquad F(a)\neq0;\ \text{else use } x^{s}\frac{ke^{ax}}{F^{(s)}(a)}$$

**Symbols**

- $F(a)$ — the characteristic (auxiliary) polynomial $F(m)=a_nm^{n}+\dots+a_0$ evaluated at $m=a$
- $F^{(s)}(a)$ — the $s$-th derivative of $F(m)$ evaluated at $m=a$
- $a$ — exponent rate in the trial $e^{ax}$, in (units of $x$)$^{-1}$

**Conditions:** $R(x)$ limited to polynomials, exponentials, sines/cosines or finite products and sums of these; the method fails for $\ln x$, $1/x$ or $\tan x$ (use variation of parameters); multiply the trial by $x^{s}$ where $s$ is the multiplicity of the root in the complementary solution.

> [!warning] Exam trap
> For $R(x)=\sin bx$ the trial must contain **both** $\cos bx$ and $\sin bx$, even if the right-hand side shows only one. Derivatives mix the pair.

---

### 9. Variation of Parameters

**Standard form**

$$y_p=u_1y_1+u_2y_2$$

$$u_1=-\int\frac{y_2R}{W}dx,\qquad u_2=\int\frac{y_1R}{W}dx \quad \text{(★)}$$

$$W=y_1y_2'-y_2y_1'\neq0$$

**Symbols**

- $y_1,y_2$ — two linearly independent solutions of the homogeneous equation $y''+P(x)y'+Q(x)y=0$
- $y_p$ — particular integral of the non-homogeneous equation, in the units of $y$
- $u_1,u_2$ — unknown functions that replace the constants $c_1,c_2$, in the units of $y$
- $W$ — Wronskian of $y_1$ and $y_2$, in (units of $y$)$^2$ per unit of $x$
- $R(x)$ — non-homogeneous (forcing) term, in the units of $y$

**Conditions:** written as $y''+P(x)y'+Q(x)y=R(x)$.

![](https://www.youtube.com/watch?v=Ik3YW1JGr_A)

*Video: Variation of Parameters — The Organic Chemistry Tutor, 11:36*

**Third order extension**

$$y_p=y_1\!\int\!\frac{W_1}{W}R\,dx+y_2\!\int\!\frac{W_2}{W}R\,dx+y_3\!\int\!\frac{W_3}{W}R\,dx,\qquad W=\begin{vmatrix}y_1&y_2&y_3\\ y_1'&y_2'&y_3'\\ y_1''&y_2''&y_3''\end{vmatrix}$$

**Symbols**

- $W_1,W_2,W_3$ — Wronskian determinants with column $k$ replaced by the column $(0,1,0)$; for the second-order case $W_1=-y_2$ and $W_2=y_1$, in the units of $y$
- $y_3$ — third linearly independent solution of the homogeneous equation

**General solution**

$$y=c_1y_1+c_2y_2+u_1y_1+u_2y_2$$

**Wronskian alternatives**

$$W_1=\begin{vmatrix}0&y_2\\ 1&y_2'\end{vmatrix}=-y_2,\qquad W_2=\begin{vmatrix}y_1&0\\ y_1'&1\end{vmatrix}=y_1$$

> [!tip] High-yield ★
> Use variation of parameters only when the right-hand side does not fit the undetermined-coefficient table ($\ln x$, $\tan x$, $1/x$, $e^{x}/x$). Otherwise the table is faster and less error-prone.

---

## Part C — Applications and PDEs

### 10. Mass-Spring-Damper Systems

![](https://www.youtube.com/watch?v=CTd1uVq5-l8)

*Video: Mechanical Vibrations: Underdamped, Overdamped, Critically Damped — Dr. Trefor Bazett, 11:16*

**Equation of motion ★**

$$m\frac{d^2x}{dt^2}+c\frac{dx}{dt}+kx=F(t)$$

$m$ in kg, $c$ in N·s/m, $k$ in N/m, $x$ in m, $F$ in N.

**Conditions:** linear spring, viscous damping.

**Natural frequency and damping ratio ★**

$$\omega_n=\sqrt{\frac{k}{m}}\ \text{(rad/s)},\qquad \zeta=\frac{c}{2\sqrt{mk}}=\frac{c}{2m\omega_n}$$

**Characteristic roots**

$$r_{1,2}=-\zeta\omega_n\pm\omega_n\sqrt{\zeta^2-1}$$

**Case classification ★**

| Case | Condition | Response |
|---|---|---|
| Overdamped | $\zeta>1$ | $x=c_1e^{r_1t}+c_2e^{r_2t}$ |
| Critically damped | $\zeta=1$ | $x=(c_1+c_2t)e^{-\omega_nt}$ |
| Underdamped | $0<\zeta<1$ | $x=e^{-\zeta\omega_nt}\big(c_1\cos\omega_dt+c_2\sin\omega_dt\big)$ |
| Undamped | $\zeta=0$ | $x=c_1\cos\omega_nt+c_2\sin\omega_nt$ |

**Damped frequency and envelope**

$$\omega_d=\omega_n\sqrt{1-\zeta^2},\qquad T_d=\frac{2\pi}{\omega_d},\qquad x_{\max}=Ae^{-\zeta\omega_nt}$$

**Logarithmic decrement**

$$\delta=\ln\frac{x_1}{x_2}=\frac{2\pi\zeta}{\sqrt{1-\zeta^2}},\qquad \zeta=\frac{\delta}{\sqrt{4\pi^2+\delta^2}}$$

**Static deflection / resonance**

$$\delta_{st}=\frac{mg}{k},\qquad \omega_{\text{res}}=\omega_n\sqrt{1-2\zeta^2}$$

> [!warning] Exam trap
> Units: convert mass to **kg** (weight/9.81) before computing $\omega_n$. Using kilograms-force or pounds directly is the most common error in this topic.

---

### 11. RLC Circuit Transients

![](https://www.youtube.com/watch?v=B4TezoTORYA)

*Video: Transient Analysis of the RLC Circuit — ALL ABOUT ELECTRONICS, 29:41*

**Series RLC ★**

$$L\frac{di}{dt}+Ri+\frac1C\int i\,dt=V(t)\ \Longrightarrow\ L\frac{d^2q}{dt^2}+R\frac{dq}{dt}+\frac{q}{C}=V(t)$$

$L$ in H, $R$ in Ω, $C$ in F, $q$ in C, $i=dq/dt$ in A.

**Conditions:** series loop, KVL applied.

**Characteristic equation and parameters ★**

$$Ls^2+Rs+\frac1C=0,\qquad \alpha=\frac{R}{2L}\ \text{(neper/s)},\qquad \omega_0=\frac{1}{\sqrt{LC}}\ \text{(rad/s)}$$

$$s_{1,2}=-\alpha\pm\sqrt{\alpha^2-\omega_0^2},\qquad \zeta=\frac{R}{2}\sqrt{\frac{C}{L}}$$

**Damping cases**

| Case | Condition | Current form |
|---|---|---|
| Overdamped | $R>2\sqrt{L/C}$ | $i=Ae^{s_1t}+Be^{s_2t}$ |
| Critically damped | $R=2\sqrt{L/C}$ | $i=(A+Bt)e^{-\alpha t}$ |
| Underdamped | $R<2\sqrt{L/C}$ | $i=e^{-\alpha t}\big(A\cos\omega_dt+B\sin\omega_dt\big)$ |

**Damped frequency, parallel RLC and Q**

$$\omega_d=\sqrt{\omega_0^2-\alpha^2},\qquad \text{parallel: } \alpha=\frac{1}{2RC},\ \omega_0=\frac{1}{\sqrt{LC}}$$

$$Q=\frac{\omega_0}{2\alpha}=\frac{1}{R}\sqrt{\frac{L}{C}}\ \text{(series)},\qquad BW=\frac{\omega_0}{Q}=\frac{R}{L}\ \text{(rad/s)}$$

See also [[04_Advanced_Engineering_Math#7. Laplace Transform Pairs|Laplace Transform Pairs]] and [[05_Electromagnetics#18. Maxwell's Equations and Displacement Current|Maxwell's Equations and Displacement Current]].

> [!tip] High-yield ★
> Identify $\alpha$ vs $\omega_0$ **first**; the comparison $R \lessgtr 2\sqrt{L/C}$ picks the form immediately — no need to solve the full quadratic.

---

### 12. PDE Wave Equation 1D

![](https://www.youtube.com/watch?v=EJLympg3XMM)

*Video: The Wave Equation by Separation of Variables — commutant, 19:08*

**Wave equation ★**

$$\frac{\partial^2u}{\partial t^2}=c^2\frac{\partial^2u}{\partial x^2},\qquad c=\sqrt{\frac{T}{\rho}}\ \text{(m/s)}$$

$T$ = tension (N), $\rho$ = linear mass density (kg/m), $u$ in m.

**Conditions:** uniform string, small vibrations, no damping.

**Separation of variables** — $u(x,t)=X(x)T(t)$:

$$X''+\lambda X=0,\qquad T''+c^2\lambda T=0$$

**Fixed–fixed string solution**

$$u(x,t)=\sum_{n=1}^{\infty}\sin\frac{n\pi x}{L}\left(A_n\cos\frac{n\pi ct}{L}+B_n\sin\frac{n\pi ct}{L}\right)$$

$$A_n=\frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}dx,\qquad B_n=\frac{2}{n\pi c}\int_0^L g(x)\sin\frac{n\pi x}{L}dx$$

**Symbols**

- $L$ — length of the string, in m
- $A_n$ — coefficient of the cosine (initial-displacement) mode $n$, in m
- $B_n$ — coefficient of the sine (initial-velocity) mode $n$, in m
- $f(x)$ — initial displacement of the string at $t=0$, in m
- $g(x)$ — initial transverse velocity of the string at $t=0$, in m/s
- $n$ — mode index (integer $\ge1$, dimensionless)

**D'Alembert solution**

$$u(x,t)=\frac{f(x-ct)+f(x+ct)}{2}+\frac{1}{2c}\int_{x-ct}^{x+ct}g(s)\,ds$$

**Natural frequencies and mode shapes**

$$f_n=\frac{nc}{2L}\ \text{(Hz)},\qquad \lambda_n=\frac{2L}{n},\qquad \omega_n=\frac{n\pi c}{L}$$

> [!warning] Exam trap
> Boundary conditions decide the eigenfunctions. Simply supported/fixed ends give $\sin(n\pi x/L)$; free ends give $\cos$. Choosing the wrong family invalidates the whole series.

---

### 13. PDE Heat Equation 1D

**Heat equation ★**

$$\frac{\partial u}{\partial t}=\alpha\frac{\partial^2u}{\partial x^2},\qquad \alpha=\frac{k}{\rho c_p}\ \text{(m}^2\text{/s)}$$

$u$ = temperature (°C or K), $k$ = thermal conductivity (W/m·K), $\rho$ = density (kg/m³), $c_p$ = specific heat (J/kg·K).

**Conditions:** homogeneous rod, constant $k$, no internal heat source.

![](https://www.youtube.com/watch?v=ToIXSwZ1pJU)

*Video: Solving the Heat Equation — 3Blue1Brown, 14:13*

**Separation** — $u=X(x)T(t)$:

$$X''+\lambda X=0,\qquad T'+\alpha\lambda T=0 \Rightarrow T=Ce^{-\alpha\lambda t}$$

**Symbols**

- $\lambda$ — separation constant, in m$^{-2}$ (positive for the sine/cosine eigenfunctions)

**Rod with both ends at zero ★**

$$u(x,t)=\sum_{n=1}^{\infty}B_n\sin\frac{n\pi x}{L}e^{-n^2\pi^2\alpha t/L^2},\qquad B_n=\frac{2}{L}\int_0^L f(x)\sin\frac{n\pi x}{L}dx$$

**Symbols**

- $L$ — length of the rod, in m
- $B_n$ — Fourier-sine coefficient of mode $n$ of the initial temperature profile, in °C or K
- $f(x)$ — initial temperature distribution $u(x,0)$, in °C or K
- $n$ — mode index (integer $\ge1$, dimensionless)

**Steady-state with fixed end temperatures**

$$u_{ss}(x)=T_1+\frac{T_2-T_1}{L}x,\qquad u(x,t)=u_{ss}(x)+u_{transient}(x,t)$$

**Symbols**

- $T_1$ — fixed temperature at the end $x=0$, in °C or K
- $T_2$ — fixed temperature at the end $x=L$, in °C or K
- $u_{ss}(x)$ — steady-state (linear) temperature profile, in °C or K
- $x$ — position along the rod, in m

**Insulated ends (zero flux)**

$$u(x,t)=\frac{A_0}{2}+\sum_{n=1}^{\infty}A_n\cos\frac{n\pi x}{L}e^{-n^2\pi^2\alpha t/L^2}$$

**Symbols**

- $A_0$ — mean (DC) temperature term of the cosine series, in °C or K
- $A_n$ — cosine-series coefficient of mode $n$, in °C or K

**Newton's law of cooling BC** and **time constant** for the $n$-th mode:

$$\tau_n=\frac{L^2}{n^2\pi^2\alpha}\ \text{(s)}$$

> [!warning] Exam trap
> Insulated ends give **cosine** eigenfunctions and a nonzero steady state (the average temperature). Fixed-temperature ends give sine terms only.

---

### 14. PDE Laplace Equation 2D

**Laplace and Poisson ★**

$$\nabla^2u=\frac{\partial^2u}{\partial x^2}+\frac{\partial^2u}{\partial y^2}=0,\qquad \nabla^2u=-\frac{\rho}{\varepsilon}\ \text{(Poisson, 2D charge free)}$$

**Symbols**

- $u$ — potential (dependent field variable), in V
- $\rho$ — volume charge density of the source distribution, in C/m$^3$
- $\varepsilon$ — permittivity of the medium, in F/m

**Classification of second-order PDEs ★** — for $Au_{xx}+Bu_{xy}+Cu_{yy}+Du_x+Eu_y+Fu=G$ with $A,B,C$ functions of $(x,y)$.

$$\Delta=B^{2}-4AC>0\ \text{(hyperbolic)},\qquad \Delta=0\ \text{(parabolic)},\qquad \Delta<0\ \text{(elliptic)}$$

Wave and telegrapher equations are hyperbolic, the heat equation is parabolic, and Laplace/Poisson are elliptic.

**Conditions:** steady state, no time dependence.

**Cartesian separation** — $u=X(x)Y(y)$:

$$\frac{X''}{X}=-\frac{Y''}{Y}=\lambda\ \Rightarrow\ \begin{cases}X''-\lambda X=0\\ Y''+\lambda Y=0\end{cases}$$

**Symbols**

- $\lambda$ — separation constant, in m$^{-2}$ (its sign selects the trigonometric or the hyperbolic solution form)

**Solution forms**

$$u(x,y)=\big(A\cos kx+B\sin kx\big)\big(Ce^{ky}+De^{-ky}\big)$$

$$u(x,y)=\big(A\cosh kx+B\sinh kx\big)\big(C\cos ky+D\sin ky\big)$$

**Symbols**

- $k$ — separation (wavenumber) constant, in m$^{-1}$, with $k^2=\lvert\lambda\rvert$
- $A,B,C,D$ — arbitrary constants fixed by the boundary conditions, in the units of $u$

**Rectangle with three sides grounded, top side $f(x)$ ★**

$$u(x,y)=\sum_{n=1}^{\infty}B_n\sin\frac{n\pi x}{a}\sinh\frac{n\pi y}{a},\qquad B_n=\frac{2}{a\sinh\frac{n\pi b}{a}}\int_0^a f(x)\sin\frac{n\pi x}{a}dx$$

**Symbols**

- $a$ — width of the rectangle along $x$ (from $0$ to $a$), in m
- $b$ — height of the rectangle along $y$ (from $0$ to $b$), in m
- $B_n$ — Fourier-sine coefficient of mode $n$ for the top boundary, in V
- $f(x)$ — prescribed potential on the top side $y=b$, in V
- $n$ — mode index (integer $\ge1$, dimensionless)

**Polar form (2D)**

$$\nabla^2u=\frac{1}{r}\frac{\partial}{\partial r}\!\left(r\frac{\partial u}{\partial r}\right)+\frac{1}{r^2}\frac{\partial^2u}{\partial\theta^2}=0,\qquad u(r,\theta)=A_0+B_0\ln r+\sum_{n\ge1}r^{n}\big(A_n\cos n\theta+B_n\sin n\theta\big)$$

**Symbols**

- $A_0,B_0$ — constant and logarithmic terms of the polar series, in V
- $A_n,B_n$ — cosine and sine coefficients of the $n$th polar harmonic, in V
- $r$ — radial distance from the origin, in m
- $\theta$ — polar angle, in rad

**Uniqueness / mean value** — the value at any interior point equals the average over any circle centred there (no interior extrema).

> [!tip] High-yield ★
> Laplace steady-state solutions **never** have interior maxima or minima; boundary values determine everything. Use this to eliminate impossible answer choices instantly.

---

→ Back to [[00_Index]]
