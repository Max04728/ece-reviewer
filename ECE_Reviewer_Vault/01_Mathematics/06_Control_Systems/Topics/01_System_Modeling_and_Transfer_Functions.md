---
id: MATH-06-01
title: "System Modeling and Transfer Functions"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Laplace_Transform_Pairs]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — System Modeling and Transfer Functions

> [!abstract] Scope
> Convert a physical system or differential equation into a Laplace-domain ratio of output to input, and read off its poles, zeros and DC gain.

## Core Concept

> [!tip] Intuition
> Laplace turns calculus into algebra. A differential equation becomes a polynomial ratio, and the shape of that ratio — where its denominator vanishes, where its numerator vanishes — tells you everything about how the system responds.

**Definition.** For a linear time-invariant system at rest (all initial conditions zero), the transfer function is:
$$G(s)=\dfrac{Y(s)}{X(s)}=\dfrac{\mathcal{L}\{y(t)\}}{\mathcal{L}\{x(t)\}}$$
The 'zero initial conditions' clause is part of the definition, not a convenience: with nonzero initial conditions the Laplace transform of the derivative carries extra terms and no single $Y/X$ ratio exists.

**Why it works.** Start from the ODE:
$$a_n\frac{d^ny}{dt^n}+\dots+a_0y=b_m\frac{d^mx}{dt^m}+\dots+b_0x$$
Transform term by term with zero ICs. Each $\frac{d^k}{dt^k}$ becomes $s^k$, so the whole ODE collapses to the algebraic relation:
$$\left(a_ns^n+\dots+a_0\right)Y(s)=\left(b_ms^m+\dots+b_0\right)X(s)$$
Dividing gives $G(s)$ directly from the coefficients — no solving required.

**Poles, zeros, characteristic equation.** Write it in factored form:
$$G(s)=K\dfrac{(s-z_1)\cdots(s-z_m)}{(s-p_1)\cdots(s-p_n)}$$
The **poles** $p_i$ are the roots of the denominator and are the natural modes of the system: a pole at $-\sigma$ gives a decaying $e^{-\sigma t}$ term, a complex pair $-\sigma\pm j\omega_d$ gives a damped sinusoid. The **zeros** $z_i$ shape the amplitudes and can cancel a mode entirely. The denominator set to zero is the **characteristic equation**, and its roots are exactly the closed-loop poles once feedback is applied.

**Properness.** If $m\le n$ the transfer function is *proper* (realizable); if $m<n$ it is *strictly proper*, which means $G(\infty)=0$ and the step response is continuous from zero. If $m>n$ it is *improper* — it would differentiate the input, which is unrealizable with finite hardware, so an exam answer that comes out improper signals an algebra error.

**DC gain and the physical route.** $G(0)=b_0/a_0$ is the steady-state output per unit constant input (when the system is stable), because at $s=0$ every derivative term dies. For a physical system the fastest route is often the impedance/force balance: mass-spring-damper $m\ddot{x}+b\dot{x}+kx=F$ gives $G=1/(ms^2+bs+k)$; the series RLC with the capacitor voltage as output gives:
$$G=(1/LC)/\left(s^2+\frac{R}{L}s+\frac{1}{LC}\right)$$
Normalise the leading coefficient to 1 to read $\omega_n$ and $\zeta$ straight off.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Transfer function | $G(s) = \frac{Y(s)}{X(s)} = \frac{\mathcal{L}\{y(t)\}}{\mathcal{L}\{x(t)\}}$ | Requires a linear time-invariant system with all initial conditions zero. |
| ODE to transfer function | $G(s) = \frac{b_m s^m + \dots + b_1 s + b_0}{a_n s^n + \dots + a_1 s + a_0}$ | Read the coefficients straight off the ODE; valid only after setting ICs to zero. |
| Characteristic equation | $a_n s^n + \dots + a_1 s + a_0 = 0$ | Roots are the poles; for a feedback loop the CE is 1 + G(s)H(s) = 0. |
| Poles from the denominator | $\prod_i (s - p_i) = 0$ | Real pole at -sigma gives e^{-sigma t}; complex pair gives a damped sinusoid. |
| DC gain | $G(0) = \frac{b_0}{a_0}$ | Steady-state output per unit constant input. Meaningful only if the system is stable. |
| Impedance-form transfer function | $G(s) = \frac{Z_2(s)}{Z_1(s) + Z_2(s)}$ | Voltage divider with the output taken across Z2. Current divider and force balances follow the same pattern. |
| Mass-spring-damper | $G(s) = \frac{1}{m s^2 + b s + k} = \frac{1/m}{s^2 + (b/m)s + (k/m)}$ | Force input, displacement output. |
| Series RLC, capacitor voltage | $G(s) = \frac{1/LC}{s^2 + (R/L)s + 1/LC}$ | Input is the source voltage; divide numerator and denominator by LC to normalise. |
| Cascade of blocks | $G(s) = G_1(s) G_2(s)$ | Valid only if the second block does not load the first (no interaction). |
| Normalised second order | $G(s) = \frac{K\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$ | Compare the ODE coefficients to 2*zeta*wn and wn^2 to read the parameters. |

## Worked Problems

### P1. A system obeys $\dfrac{d^2y}{dt^2}+3\dfrac{dy}{dt}+2y=4\dfrac{dx}{dt}+x$ with zero initial conditions. Find $G(s)=Y(s)/X(s)$, its poles and zeros, and its DC gain.

**Given:** ODE with zero ICs; output y, input x

**Solution:**

1. Transform with zero ICs: $s^2Y + 3sY + 2Y = 4sX + X$
2. Factor: $Y(s^2+3s+2) = X(4s+1)$
3. $G(s) = \dfrac{4s+1}{s^2+3s+2} = \dfrac{4s+1}{(s+1)(s+2)}$
4. Denominator roots: $s=-1$ and $s=-2$ are the poles
5. Numerator root: $4s+1=0 \Rightarrow s=-0.25$ is the zero
6. DC gain: $G(0) = 1/2 = 0.5$

> [!success]- Answer
> **$G(s)=\dfrac{4s+1}{(s+1)(s+2)}$; poles at $-1$ and $-2$, zero at $-0.25$, DC gain $0.5$.**

> [!warning] Trap
> Reading the zeros off the numerator coefficients (calling $-3$ and $-2$ zeros) instead of the numerator roots. Zeros are roots of $4s+1$, i.e. $-0.25$; the coefficients $4$ and $1$ are not roots.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `1` (quadratic): $a=1$, $b=3$, $c=2$ from the denominator $s^2+3s+2$ → $x$ = **-1**, **-2** — the roots ARE the poles.
> 2. `COMP` chain with `ALPHA` `:`: `1÷4 : 1÷2` → the zero from $4s+1=0$ is at **-0.25** → the DC gain $G(0)=$ **0.5**.
>
> The page-2 keys take the coefficients highest power first, and the roots print as $x$ — they are the poles, not the zeros.

### P2. A series RLC circuit has $R=2\ \Omega$, $L=1\ \mathrm{H}$, $C=0.5\ \mathrm{F}$. With the source voltage as input and the capacitor voltage as output, find $G(s)$, $\omega_n$ and $\zeta$.

**Given:** R = 2 ohm; L = 1 H; C = 0.5 F

**Solution:**

1. $G(s) = \dfrac{1/LC}{s^2 + (R/L)s + 1/LC}$
2. $LC = (1)(0.5) = 0.5$, so $1/LC = 2$
3. $R/L = 2/1 = 2$
4. $G(s) = \dfrac{2}{s^2+2s+2}$
5. Match to $s^2+2\zeta\omega_n s+\omega_n^2$: $\omega_n^2 = 2 \Rightarrow \omega_n = 1.414\ \mathrm{rad/s}$
6. $2\zeta\omega_n = 2 \Rightarrow \zeta = \dfrac{2}{2(1.414)} = 0.707$

> [!success]- Answer
> **$G(s)=\dfrac{2}{s^2+2s+2}$, $\omega_n = 1.414\ \mathrm{rad/s}$, $\zeta = 0.707$ (underdamped, $\omega_d = 1.414\ \mathrm{rad/s}$).**

> [!warning] Trap
> Using $\omega_n = 2$ by reading the constant term without taking the square root. $\omega_n^2$ is the constant term, so $\omega_n=\sqrt{2}$.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. $LC=1(0.5)=0.5$ gives $\omega_n^2=1/LC=2$ and $2\zeta\omega_n=R/L=2$: `MODE` `5` page 2 `1` with `1`, `2`, `2` → $x=-1\pm j1$ — the complex poles.
> 2. `SHIFT` `Pol(` `-1` `,` `1` `)` → $r=$ **1.414** rad/s $=\omega_n$, $\theta=$ **135°**, so $\zeta=\cos(180°-135°)=$ **0.707** and $\omega_d=$ **1** rad/s.
>
> `Pol(` puts $r$ in `X` and the angle in `Y`; the angle is from the positive real axis, so $\zeta$ is the cosine of $180°-\theta$.

### P3. Two blocks $G_1=\dfrac{5}{s+2}$ and $G_2=\dfrac{1}{s+3}$ are cascaded, and a tachometer with gain $H=1$ closes the loop. Without reducing the diagram, find the poles of the cascade alone and its DC gain.

**Given:** G1 = 5/(s+2); G2 = 1/(s+3)

**Solution:**

1. Cascade: $G_1G_2 = \dfrac{5}{(s+2)(s+3)} = \dfrac{5}{s^2+5s+6}$
2. Poles: $s=-2$ and $s=-3$ (both in the left half plane, so stable)
3. DC gain: $\dfrac{5}{(0+2)(0+3)} = \dfrac{5}{6} = 0.833$

> [!success]- Answer
> **$\dfrac{5}{s^2+5s+6}$, poles at $-2$ and $-3$, DC gain $5/6 \approx 0.833$.**

> [!warning] Trap
> Adding the blocks ($G_1+G_2$) instead of multiplying. Cascade multiplies; only parallel blocks add.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `1`: $a=1$, $b=5$, $c=6$ from the cascade denominator $s^2+5s+6$ → $x$ = **-2**, **-3** — both cascade poles, both in the left half plane.
> 2. `5÷6` → the DC gain $G(0)=$ **0.8333**: at $s=0$ the denominator is $(0+2)(0+3)=6$, so the cascade multiplies to $5/6$.

### P4. A mass-spring-damper has $m=2\ \mathrm{kg}$, $b=4\ \mathrm{N\cdot s/m}$, $k=20\ \mathrm{N/m}$. Find the transfer function from force to displacement in normalised form and state $\omega_n$ and $\zeta$.

**Given:** m = 2 kg; b = 4 N.s/m; k = 20 N/m

**Solution:**

1. $m\ddot{x}+b\dot{x}+kx = F \Rightarrow G(s)=\dfrac{1}{ms^2+bs+k}$
2. $G(s) = \dfrac{1}{2s^2+4s+20}$
3. Divide numerator and denominator by 2: $G(s) = \dfrac{0.5}{s^2+2s+10}$
4. $\omega_n^2 = 10 \Rightarrow \omega_n = 3.162\ \mathrm{rad/s}$
5. $2\zeta\omega_n = 2 \Rightarrow \zeta = \dfrac{2}{2(3.162)} = 0.316$

> [!success]- Answer
> **$G(s)=\dfrac{0.5}{s^2+2s+10}$, $\omega_n = 3.162\ \mathrm{rad/s}$, $\zeta = 0.316$.**

> [!warning] Trap
> Reading $\omega_n = 10$ or $\zeta = 2$ from the un-normalised denominator $2s^2+4s+20$. The formulas assume the $s^2$ coefficient is exactly 1.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. Divide by 2 first, then `MODE` `5` page 2 `1` with `1`, `2`, `10` → $x=-1\pm j3$ — the poles; the constant term 10 is $\omega_n^2$, not $\omega_n$.
> 2. `SHIFT` `Pol(` `-1` `,` `3` `)` → $r=$ **3.162** rad/s $=\omega_n$, $\theta=$ **108.43°** → $\zeta=\cos(180°-108.43°)=$ **0.316**.

### P5. A stable system has $G(s)=\dfrac{10(s+2)}{(s+1)(s+5)}$. Find the steady-state output for a unit step input using the DC gain, and confirm with the final value theorem.

**Given:** G(s) = 10(s+2)/((s+1)(s+5)); input = unit step

**Solution:**

1. DC gain: $G(0) = \dfrac{10(2)}{(1)(5)} = \dfrac{20}{5} = 4$
2. For a unit step, $Y(s) = G(s)/s$
3. Final value theorem: $y(\infty) = \lim_{s\to0} sY(s) = \lim_{s\to0} G(s) = 4$
4. Both routes agree because all poles ($-1$, $-5$) lie in the left half plane

> [!success]- Answer
> **$y(\infty) = 4$.**

> [!warning] Trap
> Applying the final value theorem without checking stability. Every pole must be strictly in the left half plane, otherwise the limit is meaningless even though the algebra produces a finite number.

## Traps & Exam Notes

- **Dropping the zero-initial-condition assumption.** Transforming $\ddot{y}$ as $s^2Y$ silently discards $sy(0)+y'(0)$. The transfer function is only defined for a system at rest.
- **Calling numerator coefficients 'zeros'.** Zeros are the *roots* of the numerator, not its coefficients. In $4s+1$ the zero is $-0.25$.
- **Reading $\omega_n$ and $\zeta$ off an un-normalised denominator.** $\omega_n^2$ is the constant term only after the $s^2$ coefficient is 1. For $2s^2+4s+20$ you must divide by 2 first.
- **Confusing poles with stability of the closed loop.** $G(s)$'s poles describe the open-loop plant; once feedback is applied the characteristic equation becomes $1+G(s)H(s)=0$ and the poles move.
- **Adding cascaded blocks.** $G_1G_2$ in series, $G_1+G_2$ in parallel. Adding a cascade is the single most common modelling slip.
- **Accepting an improper transfer function.** If the numerator degree exceeds the denominator degree, the model differentiates the input; in a real plant that means the algebra is wrong or a fast parasitic pole was dropped.

## See Also

- [[02_Block_Diagram_Reduction]]
- [[04_Test_Signals_and_First_Order_Response]]
- [[14_State_Space_Representation_Basics]]

---

⬅ *start* · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Block_Diagram_Reduction|02 ➡]]
