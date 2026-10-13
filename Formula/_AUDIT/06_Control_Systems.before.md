---
title: Control Systems
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 14
---

## Part A — Modeling and Time Response

### 1. System Modeling and Transfer Functions

**Transfer function ★**

$$H(s)=\frac{Y(s)}{X(s)}=\frac{b_ms^m+\cdots+b_0}{a_ns^n+\cdots+a_0}=\frac{N(s)}{D(s)}$$

**ODE to transfer function ★**

$$\sum_{k=0}^{n}a_k\frac{d^ky}{dt^k}=\sum_{k=0}^{m}b_k\frac{d^kx}{dt^k}\ \Rightarrow\ H(s)=\frac{\sum_k b_ks^k}{\sum_k a_ks^k}$$

$y$ and $x$ are in the same units, and $s$ is in rad/s.

**Element laws**

| Element | Time domain | s-domain | Units |
|---|---|---|---|
| Resistance | $v=Ri$ | $V=RI$ | $R$ in $\Omega$ |
| Capacitance | $i=C\frac{dv}{dt}$ | $I=CsV$ | $C$ in F |
| Inductance | $v=L\frac{di}{dt}$ | $V=LsI$ | $L$ in H |
| Mass | $f=M\ddot{x}$ | $F=Ms^2X$ | $M$ in kg |
| Damper | $f=B\dot{x}$ | $F=BsX$ | $B$ in N·s/m |
| Spring | $f=Kx$ | $F=KX$ | $K$ in N/m |

**Impedance divider and series RLC ★**

$$H(s)=\frac{Z_2}{Z_1+Z_2},\qquad H(s)=\frac{1/LC}{s^2+(R/L)s+1/LC}$$

$$\omega_n=\frac{1}{\sqrt{LC}}\ \text{rad/s},\qquad \zeta=\frac{R}{2}\sqrt{\frac{C}{L}}$$

**DC motor (armature-controlled)**

$$\frac{\theta(s)}{V_a(s)}=\frac{K_t}{s\big[(Ls+R)(Js+b)+K_tK_e\big]}$$

$K_t$ in N·m/A, $K_e$ in V·s/rad, $J$ in kg·m², $b$ in N·m·s.

**Conditions:** LTI, zero initial conditions, lumped linear time-invariant elements. #control

---

### 2. Block Diagram Reduction

![](https://www.youtube.com/watch?v=t_k7oRICmWo)

*Video: Block Diagram Reduction Rules — Part 1 — Neso Academy, 10:07*

**Closed-loop forms ★**

$$G_{cl}=\frac{G}{1+GH}\ \text{(negative feedback)},\qquad \frac{G}{1-GH}\ \text{(positive feedback)}$$

$$T=\frac{G}{1+G}\ \text{(unity feedback)}$$

**Cascade and parallel**

$$G_{\text{cascade}}=G_1G_2,\qquad G_{\text{parallel}}=G_1\pm G_2$$

**Error ratio ★**

$$\frac{E(s)}{R(s)}=\frac{1}{1+GH}\ \text{(at the summing junction)}$$

$$\frac{E(s)}{R(s)}=\frac{G}{1+GH}\ \text{(before a disturbance)}$$

**Block-move equivalences**

| Original | Equivalent move |
|---|---|
| $G$ before summing point | move after: insert $G$ in each input |
| $G$ after takeoff point | move before: insert $1/G$ |
| Summing point after $G$ | move before: insert $1/G$ |
| Takeoff before $G$ | move after: insert $1/G$ |

**Sensitivity ★**

$$S_G^T=\frac{\partial T/T}{\partial G/G}=\frac{1}{1+GH}$$

**Conditions:** SISO, linear blocks, all initial conditions zero. #control

---

### 3. Mason's Gain Formula

**Gain formula ★**

$$T=\frac{1}{\Delta}\sum_{k=1}^{N}P_k\Delta_k$$

$$\Delta=1-\sum L_i+\sum L_iL_j-\sum L_iL_jL_k+\cdots$$

![](https://www.youtube.com/watch?v=k0zeegbCa38)

*Video: Mason's Gain Rule — Neso Academy, 13:21*

**Symbols**

- $P_k$ — gain of the $k$th forward path
- $\Delta_k$ — cofactor: delete every loop touching $P_k$
- $L_i$ — individual loop gain, with higher-order sums keeping non-touching products only
- $N$ — number of forward paths
- $\Delta_k=1$ when the path touches every loop

**Touch test** — two loops touch if they share a node.

**Conditions:** Linear signal-flow graph, no node repeated in a path, every path runs input node to output node. #control

---

### 4. Test Signals and First Order Response

**Standard test signals**

| Signal | $x(t)$ | $X(s)$ | Notes |
|---|---|---|---|
| Impulse | $\delta(t)$ | $1$ | unit area |
| Step | $A\mu(t)$ | $A/s$ | $A$ = final value unit |
| Ramp | $At\mu(t)$ | $A/s^2$ | $A$ in units/s |
| Parabolic | $\frac{A}{2}t^2\mu(t)$ | $A/s^3$ | $A$ in units/s² |
| Sinusoid | $A\sin\omega t$ | $\frac{A\omega}{s^2+\omega^2}$ | $\omega$ in rad/s |

**First-order step response ★**

$$G(s)=\frac{K}{\tau s+1}\ \ (\tau \text{ in s},\ K \text{ the DC gain}),\qquad y(t)=K(1-e^{-t/\tau})\mu(t)$$

**Response landmarks**

| Landmark | Value |
|---|---|
| Value at $t=\tau$ | 63.2% of final |
| Value at $t=3\tau$ | 95% of final |
| Value at $t=4\tau$ | 98% of final |
| Rise time | $t_r\approx2.2\tau$ |
| Settling time (2%) | $t_s\approx4\tau$ |
| Settling time (5%) | $t_s\approx3\tau$ |
| Slope at the origin | $K/\tau$ |
| Bandwidth | $\omega_{BW}=1/\tau$ rad/s |

**Closed-loop first order**

$$\frac{K}{\tau s+1+K}\ \Rightarrow\ \tau_{cl}=\frac{\tau}{1+K}$$

**Conditions:** Single real pole at $s=-1/\tau$, zero initial conditions. #control

---

### 5. Second Order Specifications

![](https://www.youtube.com/watch?v=pzRTyxf31fw)

*Video: Second Order System: Damping and Natural Frequency — Engineering with Prof. Kim, 9:58*

**Canonical second-order form ★**

$$G(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}$$

$$\omega_n=\sqrt{K/J}\ \text{rad/s},\qquad \zeta=\frac{B}{2\sqrt{KJ}}$$

**Damped frequency and poles ★**

$$\omega_d=\omega_n\sqrt{1-\zeta^2}\ \text{rad/s},\qquad s=-\zeta\omega_n\pm j\omega_d$$

**Damping cases**

| Case | $\zeta$ | Poles | Response |
|---|---|---|---|
| Undamped | $0$ | $\pm j\omega_n$ | sustained oscillation |
| Underdamped | $0<\zeta<1$ | complex LHP | decaying sinusoid |
| Critically damped | $1$ | double real $-\omega_n$ | fastest, no overshoot |
| Overdamped | $>1$ | two real | slow, no overshoot |
| Unstable | $<0$ | RHP | growing |

**Peak overshoot ★**

$$M_p=e^{-\pi\zeta/\sqrt{1-\zeta^2}}\times100\%$$

$$\zeta=\frac{|\ln M_p|}{\sqrt{\pi^2+\ln^2M_p}}\ \text{(fraction form)}$$

**Time specifications**

$$t_p=\frac{\pi}{\omega_d},\qquad t_r\approx\frac{1.8}{\omega_n}$$

$$t_s=\frac{4}{\zeta\omega_n}\ (2\%\ \text{band}),\qquad t_s=\frac{3}{\zeta\omega_n}\ (5\%\ \text{band})$$

> [!tip] High-yield ★
> $M_p$ depends only on $\zeta$, and speed depends only on $\zeta\omega_n$ (real-part magnitude). Peak value $=1+M_p$, and $\zeta\approx PM/100$.

**Dominant pole ★** — the pole (or complex-conjugate pair) closest to the $j\omega$ axis; it has the smallest $\lvert\sigma\rvert$, decays slowest, and dictates settling time and the transient shape.

$$\text{Poles at }s=-\sigma\pm j\omega_d\ \Rightarrow\ \text{decay } e^{-\sigma t};\qquad \text{poles farther left decay faster and are neglected in order reduction}$$

Adding a **left-half-plane zero** raises percent overshoot and shortens rise time; a **right-half-plane zero** gives a non-minimum-phase system that initially moves the wrong way.

**Conditions:** Canonical underdamped second-order loop, no zeros, unit step input. #control

---

### 6. Steady State Error and Error Constants

**Final value theorem ★**

$$e_{ss}=\lim_{t\to\infty}e(t)=\lim_{s\to0}sE(s)$$

$$e_{ss}=\lim_{s\to0}\frac{sR(s)}{1+G(s)H(s)}$$

**Error constants and steady-state error**

| Constant | Definition | Step $A/s$ | Ramp $A/s^2$ | Parabola $A/s^3$ |
|---|---|---|---|---|
| $K_p$ | $\lim_{s\to0}GH$ | $\frac{A}{1+K_p}$ | $\infty$ | $\infty$ |
| $K_v$ | $\lim_{s\to0}sGH$ | $0$ | $\frac{A}{K_v}$ | $\infty$ |
| $K_a$ | $\lim_{s\to0}s^2GH$ | $0$ | $0$ | $\frac{A}{K_a}$ |

**Reading the table ★** — a finite nonzero $e_{ss}$ needs the error constant of matching order to exist. $K_v$ is in s⁻¹ and $K_a$ is in s⁻².

**Conditions:** Stable closed loop, unity-feedback comparison at the summing junction, input applied until transients decay. #control #stability

---

### 7. System Types and Error Analysis

**System type ★** — the type number $n$ is the number of poles of $G(s)H(s)$ at the origin.

**Error constants by type**

| Type $n$ | $K_p$ | $K_v$ | $K_a$ | Step | Ramp | Parabola |
|---|---|---|---|---|---|---|
| 0 | $K$ | $0$ | $0$ | $\frac{A}{1+K}$ | $\infty$ | $\infty$ |
| 1 | $\infty$ | $K$ | $0$ | $0$ | $\frac{A}{K}$ | $\infty$ |
| 2 | $\infty$ | $\infty$ | $K$ | $0$ | $0$ | $\frac{A}{K}$ |
| 3 | $\infty$ | $\infty$ | $\infty$ | $0$ | $0$ | $0$ |

**Non-unity feedback**

$$e_{ss}=\lim_{s\to0}\frac{sR(s)}{1+GH}$$

A disturbance instead uses $D(s)$ as the input.

> [!warning] Exam trap
> Type number is read from the *open-loop* denominator, not the closed-loop one. A type-1 system still shows steady error to a ramp — only the integrator removes it.

**Conditions:** Closed loop stable, origin poles counted with multiplicity, $K$ found after cancelling common factors. #control #stability

---

## Part B — Stability, Frequency Response and Design

### 8. Routh-Hurwitz Criterion

![](https://www.youtube.com/watch?v=WBCZBOB3LCA)

*Video: Routh-Hurwitz Criterion, An Introduction — Brian Douglas, 12:57*

**Characteristic equation** — $\Delta(s)=a_ns^n+a_{n-1}s^{n-1}+\cdots+a_0=0$ with $a_n>0$.

**Routh array**

$$
\begin{aligned}
s^n &: a_n \quad a_{n-2} \quad a_{n-4}\\
s^{n-1} &: a_{n-1} \quad a_{n-3} \quad a_{n-5}\\
s^{n-2} &: b_1 \quad b_2 \quad b_3\\
s^{n-3} &: c_1 \quad c_2 \quad c_3\\
\vdots &: \vdots\\
s^0 &: g_1
\end{aligned}
$$

**Array entries**

$$b_1=\frac{a_{n-1}a_{n-2}-a_na_{n-3}}{a_{n-1}},\qquad b_2=\frac{a_{n-1}a_{n-4}-a_na_{n-5}}{a_{n-1}}$$

$$c_1=\frac{b_1a_{n-3}-a_{n-1}b_2}{b_1}$$

**Interpretation**

- RHP poles = number of sign changes in column 1
- A zero entry in column 1 is replaced by $\epsilon\to0^+$
- An all-zero row gives an auxiliary polynomial from the row above, with roots on the $j\omega$ axis

> [!warning] Exam trap
> Multiply a row only by a *positive* constant — a negative one flips the sign-change count.

**Conditions:** Real coefficients, $a_n>0$, no pole-zero cancellation in $N(s)/D(s)$. #stability

---

### 9. Root Locus Techniques

**Magnitude and angle conditions ★**

$$1+GH=0\ \Rightarrow\ |GH|=1,\qquad \angle GH=180^\circ(2k+1)$$

**Angle and gain for $G(s)H(s)=K\frac{\prod(s+z_i)}{\prod(s+p_j)}$**

$$\sum\angle(s+z_i)-\sum\angle(s+p_j)=180^\circ(2k+1)$$

$$K=\frac{\prod|s+p_j|}{\prod|s+z_i|}$$

![](https://www.youtube.com/watch?v=CRvVDoQJjYI)

*Video: The Root Locus Method — Introduction — Brian Douglas, 13:10*

**Construction rules**

| Rule | Statement |
|---|---|
| Start/end | OL poles at $K=0$, zeros or $\infty$ at $K\to\infty$ |
| Branches | $n$ branches, with $n$ = number of poles |
| Symmetry | symmetric about the real axis |
| Real axis | locus left of an odd number of real poles plus zeros |
| Asymptotes | $n-m$ branches, $\frac{(2k+1)180^\circ}{n-m}$, centroid $\sigma_a=\frac{\sum p_j-\sum z_i}{n-m}$ |
| Breakaway | $\frac{dK}{ds}=0$ with $K=-\frac{1}{GH}$ |
| $j\omega$ crossing | Routh, or $s=j\omega$ in $\Delta(s)=0$ |
| Departure angle | $\phi_d=180^\circ+\sum\angle\text{zeros}-\sum\angle\text{other poles}$ |

**Conditions:** $K\geq0$, poles and zeros known, no cancellation. #control #stability

---

### 10. Bode Plots and Margins

**Logarithmic gain ★**

$$G(j\omega)=|G(j\omega)|\angle G(j\omega),\qquad 20\log_{10}|G|\ \text{dB}$$

$\omega$ is in rad/s.

**Bode factors**

| Factor | Magnitude slope | Phase |
|---|---|---|
| $K$ | $20\log K$ flat | $0^\circ$ |
| $s$ | $+20$ dB/dec | $+90^\circ$ |
| $1/s$ | $-20$ dB/dec | $-90^\circ$ |
| $(1+s/\omega_z)$ | $+20$ dB/dec above $\omega_z$ | $0\to+90^\circ$ |
| $1/(1+s/\omega_p)$ | $-20$ dB/dec above $\omega_p$ | $0\to-90^\circ$ |
| $1+2\zeta s/\omega_n+s^2/\omega_n^2$ | $\pm40$ dB/dec | $0\to\pm180^\circ$ |

**Resonance ★**

$$M_r=\frac{1}{2\zeta\sqrt{1-\zeta^2}},\qquad \omega_r=\omega_n\sqrt{1-2\zeta^2}\ \text{rad/s}\ \ (\zeta<0.707)$$

**Crossover frequencies ★** — gain crossover $\omega_{gc}$ satisfies $|G(j\omega_{gc})|=1$, and phase crossover $\omega_{pc}$ satisfies $\angle G(j\omega_{pc})=-180^\circ$.

$$PM=180^\circ+\angle G(j\omega_{gc}),\qquad GM=-20\log_{10}|G(j\omega_{pc})|\ \text{dB}$$

![](https://www.youtube.com/watch?v=ThoA4amCAX4)

*Video: Gain and Phase Margins Explained! — Brian Douglas, 13:54*

> [!tip] High-yield ★
> $\zeta\approx PM/100$ and $t_s\approx\frac{4}{\omega_{gc}\tan PM}$. A stable minimum-phase loop needs $GM>0$ dB and $PM>0^\circ$.

**Conditions:** Minimum-phase open loop, asymptotic straight-line approximation, one decade = factor of 10 in $\omega$. #control #stability

---

### 11. Nyquist Stability Criterion

**Encirclement criterion ★**

$$Z=N+P$$

![](https://www.youtube.com/watch?v=sof3meN96MA)

*Video: Nyquist Stability Criterion, Part 1 — Brian Douglas, 16:40*

**Symbols**

- $Z$ — closed-loop RHP poles
- $P$ — open-loop RHP poles
- $N$ — net clockwise encirclements of $-1+j0$

**Stability readings**

- Stable iff $Z=0$
- If $P=0$, stable iff $N=0$
- A counterclockwise encirclement counts negative
- A stable system with $P$ RHP poles encircles $-1$ clockwise $P$ times

> [!warning] Exam trap
> With $P>0$ a curve that never reaches $-1$ is not automatically stable — count encirclements, do not eyeball it.

**Conditions:** Rational $G(s)H(s)$ with $P$ known from Routh, contour indents poles on the $j\omega$ axis by $\epsilon\to0$. #control #stability

---

### 12. PID Controllers and Tuning

**PID controller ★**

$$G_c(s)=K_p+\frac{K_i}{s}+K_ds=K_p\Big(1+\frac{1}{T_is}+T_ds\Big)$$

![](https://www.youtube.com/watch?v=UR0hOmjaHp0)

*Video: PID Control — A brief introduction — Brian Douglas, 7:44*

**Gain units**

- $K_p$ — dimensionless
- $K_i$ — in s⁻¹·gain
- $K_d$ — in s·gain
- $T_i$ — integral time in s
- $T_d$ — derivative time in s

**Variants**

$$G_{\text{filtered}}=K_p+\frac{K_i}{s}+\frac{K_ds}{\tau_fs+1}$$

$$G_{PI}=K_p+\frac{K_i}{s},\qquad G_{PD}=K_p+K_ds$$

**Effect of raising each gain**

| Gain | Effect |
|---|---|
| $K_p\uparrow$ | faster response with less error, but more overshoot |
| $K_i\uparrow$ | kills $e_{ss}$, adds oscillation, raises the type by 1 |
| $K_d\uparrow$ | more damping and less overshoot, but noise-sensitive |

**Ziegler-Nichols ultimate gain ★** — from the ultimate gain $K_u$, the ultimate frequency $\omega_u$, and the period $P_u=2\pi/\omega_u$ in s:

| Controller | $K_p$ | $T_i$ | $T_d$ |
|---|---|---|---|
| P | $0.5K_u$ | — | — |
| PI | $0.45K_u$ | $P_u/1.2$ | — |
| PID | $0.6K_u$ | $P_u/2$ | $P_u/8$ |

**Reaction-curve method ★** — with delay $L$ in s, time constant $T$ in s, and $R=A/L$:

$$K_p=\frac{1.2T}{RL},\qquad T_i=2L,\qquad T_d=0.5L$$

**Conditions:** Reaction-curve method needs a stable monotonic plant, ultimate-gain needs sustained oscillation at $K_u$, integral action adds a pole at the origin. #control

---

### 13. Lead-Lag Compensator Design

![](https://www.youtube.com/watch?v=xLhvil5sDcU)

*Video: What Are Lead-Lag Compensators? An Introduction — Brian Douglas, 11:00*

**Compensator form ★**

$$G_c(s)=K_c\frac{s+z_c}{s+p_c}$$

**Lead vs. lag**

| Type | Placement | Primary effect |
|---|---|---|
| Lead | $\lvert z_c\rvert<\lvert p_c\rvert$ | phase increases |
| Lag | $\lvert z_c\rvert>\lvert p_c\rvert$ | gain decreases |

**Lead network**

$$G_c(j\omega)=\frac{1+j\omega\tau}{1+j\omega\alpha\tau},\qquad \alpha=\frac{z_c}{p_c}<1$$

$$\omega_{max}=\frac{1}{\tau\sqrt{\alpha}}\ \text{rad/s},\qquad \phi_{max}=\arcsin\frac{1-\alpha}{1+\alpha}$$

$$\alpha=\frac{1-\sin\phi_{max}}{1+\sin\phi_{max}}$$

**Lag network** — $\beta=\frac{p_c}{z_c}>1$, unity high-frequency gain and DC gain $\beta$.

- Place $z_c$ one decade below $\omega_{gc}$
- Place $p_c$ one decade below $z_c$

**Design consequences**

- Lead raises crossover and bandwidth, adds $PM$, shortens $t_r$
- Lag lowers high-frequency gain, cuts $e_{ss}$, narrows bandwidth
- Lag-lead cascades both effects

**Conditions:** Minimum-phase plant with $\phi_{max}$ kept under about $60^\circ$. Lead compensates phase, lag compensates steady-state error. #control

---

### 14. State Space Representation Basics

**State and output equations ★**

$$\dot{\mathbf{x}}=A\mathbf{x}+B\mathbf{u},\qquad \mathbf{y}=C\mathbf{x}+D\mathbf{u}$$

![](https://www.youtube.com/watch?v=hpeKrMG-WP0)

*Video: Introduction to State-Space Equations — MATLAB, 14:12*

**Symbols**

- $\mathbf{x}\in\mathbb{R}^n$ — state vector
- $\mathbf{u}\in\mathbb{R}^m$ — input in V
- $\mathbf{y}\in\mathbb{R}^p$ — output
- $A$ — $n\times n$ in s⁻¹
- $B$ — $n\times m$
- $C$ — $p\times n$
- $D$ — $p\times m$

**Transfer function from state space ★**

$$G(s)=C(sI-A)^{-1}B+D,\qquad \det(sI-A)=0\ \text{gives the poles}$$

**State transition**

$$\Phi(t)=e^{At}=\mathcal{L}^{-1}[(sI-A)^{-1}]$$

$$\mathbf{x}(t)=e^{At}\mathbf{x}(0)+\int_0^t e^{A(t-\tau)}B\mathbf{u}(\tau)\,d\tau$$

**Controllability and observability ★**

$$\mathcal{C}=[B\ AB\ \cdots\ A^{n-1}B],\qquad \operatorname{rank}(\mathcal{C})=n$$

$$\mathcal{O}=\begin{bmatrix}C\\CA\\\vdots\\CA^{n-1}\end{bmatrix},\qquad \operatorname{rank}(\mathcal{O})=n$$

**Companion (controllable canonical) form ★**

For $\frac{Y}{U}=\frac{b_{n-1}s^{n-1}+\cdots+b_0}{s^n+a_{n-1}s^{n-1}+\cdots+a_0}$:

$$A=\begin{bmatrix}0&1&0&\cdots&0\\0&0&1&\cdots&0\\\vdots&&&\ddots&\vdots\\-a_0&-a_1&-a_2&\cdots&-a_{n-1}\end{bmatrix}$$

$$B=\begin{bmatrix}0\\0\\\vdots\\1\end{bmatrix}$$

> [!tip] High-yield ★
> $\det(sI-A)$ of the companion form reproduces the denominator of $G(s)$ — a fast sanity check.

**Conditions:** LTI system with minimal state dimension $n$, and $D=0$ for strictly proper transfer functions. #control

---

→ Back to [[00_Index]]
