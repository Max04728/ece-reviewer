---
id: MATH-07-10
title: "System Response and Step Response"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_Difference_Equations_and_Stability]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — System Response and Step Response

> [!abstract] Scope
> Relate the impulse response, step response and transient/steady-state behaviour of a system in both continuous and discrete time.

## Core Concept

> [!tip] Intuition
> The step response is just the running total of the impulse response. If you know how the system reacts to one kick, integrating those kicks gives the response to a switch being thrown — and the level it finally settles at is the DC gain.

**Step response from the impulse response.** In continuous time the step response is:
$$g(t)=\displaystyle\int_{-\infty}^{t}h(\tau)\,d\tau$$
In discrete time it is:
$$g[n]=\displaystyle\sum_{k=-\infty}^{n}h[k]$$
Inverting the relation gives $h=\dfrac{dg}{dt}$ (CT) or $h[n]=g[n]-g[n-1]$ (DT). The final value of the step response is the DC gain, $H(0)$ or $H(1)$, because the step is a constant input held for ever. That single fact is a free check on every step-response answer.

**First-order CT response.** For $G(s)=\dfrac{K}{\tau s+1}$, $y(t)=K(1-e^{-t/\tau})$ with $\tau=1/\lvert p\rvert$. The sample values 63.2%, 86.5%, 95.0% and 98.2% at $t=\tau,2\tau,3\tau,4\tau$ are the origin of the $2\%$ settling time $4\tau$ and the $10$-$90\%$ rise time $2.2\tau$. A first-order system has no overshoot and no ringing: with one real pole the response is monotone.

**First-order DT response.** For $y[n]=ay[n-1]+bx[n]$ the step response is:
$$y[n]=\dfrac{b}{1-a}\left(1-a^{n+1}\right)u[n]$$
settling at $\dfrac{b}{1-a}=H(1)$. Note the exponent $n+1$, not $n$: the running sum starts at $n=0$ and already contains one term. The **DT time constant** is $\tau=-\dfrac{1}{\ln\lvert a\rvert}$ samples — *not* $1/(1-a)$, which is the DC gain. The two agree only in the limit $a\to1$.

**Transient and steady state.** Any stable response decomposes into a transient part (the natural modes, decaying for a stable system) plus a steady-state part (the particular solution, which for a constant input is the DC gain). For a DT first-order system the transient is $\dfrac{b}{1-a}a^{n+1}$-shaped; the settling time to a $2\%$ band is the smallest $n$ with $\lvert a\rvert^{n+1}\le0.02$, i.e.
$$n\ge\dfrac{\ln0.02}{\ln\lvert a\rvert}-1$$

**Second-order responses, briefly.** A CT second-order system's step response overshoots only when $0<\zeta<1$, peaking at $t_p=\pi/\omega_d$ and settling in about $4/(\zeta\omega_n)$; a DT second-order system with complex poles $re^{\pm j\theta}$ rings at $\theta$ radians per sample with an envelope decaying like $r^{n}$. In both cases the envelope decay rate is set by the real part of the pole ($-\zeta\omega_n$ in CT, $\ln r$ in DT), which is why settling time is a vertical-line specification in either plane.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Step response from h (CT) | $g(t) = \int_{-\infty}^{t} h(\tau)\,d\tau$ | Running integral; for a causal h the lower limit is 0. |
| Impulse from step (CT) | $h(t) = \frac{dg}{dt}$ | Differentiate the step response to recover the impulse response. |
| Step response from h (DT) | $g[n] = \sum_{k=-\infty}^{n} h[k]$ | Running sum; for a causal h start at k = 0. |
| Impulse from step (DT) | $h[n] = g[n]-g[n-1]$ | First difference, not a derivative. |
| DC gain | $H(0) = \lim_{t\to\infty} g(t),\quad H(1) = \lim_{n\to\infty} g[n]$ | The final value of the step response; a free check on every answer. |
| CT first-order step | $y(t) = K\left(1-e^{-t/\tau}\right)u(t),\quad \tau = 1/\lvert p \rvert$ | No overshoot. 63.2% at t = tau, 98.2% at 4 tau. |
| DT first-order step | $y[n] = \frac{b}{1-a}\left(1-a^{n+1}\right)u[n]$ | Exponent n+1, not n. Settles at b/(1-a). |
| DT time constant | $\tau = -\frac{1}{\ln\lvert a \rvert}\ \mathrm{samples}$ | For \|a\| close to 1, tau is large; not equal to 1/(1-a). |
| DT 2% settling sample | $n \ge \frac{\ln 0.02}{\ln\lvert a \rvert}-1$ | Smallest integer satisfying the 2% band on the transient term. |
| CT second-order step specs | $M_p = e^{-\pi\zeta/\sqrt{1-\zeta^2}},\ t_p = \frac{\pi}{\omega_d},\ t_s = \frac{4}{\zeta\omega_n}$ | Underdamped case only; the settling figure is the 2% band. |

## Worked Problems

### P1. A DT system obeys $y[n]=0.8y[n-1]+x[n]$ with zero initial rest. Find the unit-step response and its final value.

**Given:** y[n] = 0.8 y[n-1] + x[n]; x[n] = u[n]

**Solution:**

1. $H(z)=\dfrac{1}{1-0.8z^{-1}}$, so $a=0.8$, $b=1$
2. $y[n]=\dfrac{1}{1-0.8}\left(1-0.8^{n+1}\right)u[n] = 5\left(1-0.8^{n+1}\right)u[n]$
3. Check $n=0$: $5(1-0.8)=1$, matching the recursion $y[0]=0.8(0)+1=1$ ✓
4. Check $n=1$: $5(1-0.64)=1.8$; recursion gives $0.8(1)+1=1.8$ ✓
5. Final value: $5 = H(1) = \dfrac{1}{1-0.8}$ ✓

> [!success]- Answer
> **$y[n]=5\left(1-0.8^{n+1}\right)u[n]$, settling to 5.**

> [!warning] Trap
> Writing $5(1-0.8^{n})$, which gives $y[0]=0$ instead of 1. The running sum has $n+1$ terms, so the exponent is $n+1$.

### P2. For the system above, find the smallest sample index at which the response stays within $2\%$ of its final value.

**Given:** y[n] = 5(1 - 0.8^(n+1))u[n]; 2% band

**Solution:**

1. The error from the final value is $5(0.8)^{n+1}$
2. The $2\%$ band is $0.02\times5 = 0.1$
3. Require $5(0.8)^{n+1}\le0.1 \Rightarrow (0.8)^{n+1}\le0.02$
4. $n+1\ge\dfrac{\ln0.02}{\ln0.8} = \dfrac{-3.912}{-0.2231} = 17.53$
5. $n\ge16.53$, so $n=17$
6. Check: $5(0.8)^{18} = 5(0.01801) = 0.090\le0.1$ ✓; at $n=16$, $5(0.8)^{17} = 5(0.02252) = 0.113>0.1$ ✗

> [!success]- Answer
> **$n = 17$ samples (about $4\tau$ with $\tau = -1/\ln0.8 = 4.48$ samples).**

> [!warning] Trap
> Using the exponent $n$ instead of $n+1$ and answering $n=17$ from the wrong inequality. The transient term is $a^{n+1}$, so the count starts one higher.

### P3. A system has $h[n]=(0.5)^{n}u[n]$. Find its step response and its DC gain.

**Given:** h[n] = 0.5^n u[n]

**Solution:**

1. $g[n] = \sum_{k=0}^{n}(0.5)^{k}$ for $n\ge0$
2. Geometric sum with $n+1$ terms: $g[n]=\dfrac{1-0.5^{n+1}}{1-0.5} = 2\left(1-0.5^{n+1}\right)$
3. $g[n] = 2\left(1-0.5^{n+1}\right)u[n]$
4. DC gain: $H(1)=\dfrac{1}{1-0.5} = 2$, matching $g[\infty]=2$ ✓
5. Check $n=0$: $g[0]=h[0]=1$ and the formula gives $2(1-0.5)=1$ ✓

> [!success]- Answer
> **$g[n]=2\left(1-0.5^{n+1}\right)u[n]$, with DC gain 2.**

> [!warning] Trap
> Using $1/(1-a)$ as the time constant. $1/(1-a)=2$ is the DC *gain*; the time constant of this system is $-1/\ln0.5 = 1.44$ samples.

### P4. A CT first-order system is $G(s)=\dfrac{4}{0.2s+1}$. Find $\tau$, the $63.2\%$ time, the $10$-$90\%$ rise time and the $2\%$ settling time.

**Given:** G(s) = 4/(0.2s+1); step input

**Solution:**

1. Standard form gives $K=4$ and $\tau=0.2\ \mathrm{s}$ (pole at $s=-5$)
2. $y(t)=4\left(1-e^{-5t}\right)$
3. $63.2\%$ of 4 is 2.528, reached at $t=\tau=0.2\ \mathrm{s}$
4. $10\%$: $e^{-5t}=0.9 \Rightarrow t=0.0211\ \mathrm{s}$; $90\%$: $e^{-5t}=0.1 \Rightarrow t=0.4605\ \mathrm{s}$
5. Rise time $= 0.4605-0.0211 = 0.439\approx0.44\ \mathrm{s} = 2.2\tau$ ✓
6. Settling time (2%): $t_s=4\tau = 0.8\ \mathrm{s}$

> [!success]- Answer
> **$\tau=0.2\ \mathrm{s}$, $t_{63.2\%}=0.2\ \mathrm{s}$, $t_r=0.44\ \mathrm{s}$, $t_s=0.8\ \mathrm{s}$, final value 4.**

> [!warning] Trap
> Reporting $\tau=5$ from the pole magnitude. The pole is at $s=-5$, so $\tau=1/5=0.2\ \mathrm{s}$, and every time answer scales with it.

### P5. A DT system is $y[n]=0.9y[n-1]+2x[n]$. Find its DC gain, its time constant in samples, and the $63.2\%$ rise point.

**Given:** y[n] = 0.9 y[n-1] + 2 x[n]

**Solution:**

1. DC gain: $H(1)=\dfrac{b}{1-a} = \dfrac{2}{1-0.9} = 20$
2. Step response: $y[n]=20\left(1-0.9^{n+1}\right)u[n]$
3. DT time constant: $\tau = -\dfrac{1}{\ln0.9} = \dfrac{1}{0.10536} = 9.49\ \mathrm{samples}$
4. $63.2\%$ of 20 is 12.64; solving $20(1-0.9^{n+1})=12.64$ gives $0.9^{n+1}=0.368$
5. $n+1 = \dfrac{\ln0.368}{\ln0.9} = 9.49$, so $n = 8.49$ — the response is $63.2\%$ complete between the 8th and 9th samples

> [!success]- Answer
> **DC gain 20; $\tau\approx9.5$ samples, so $63.2\%$ completion at $n\approx8.5$ (between samples 8 and 9).**

> [!warning] Trap
> Using $1/(1-a) = 10$ samples as the time constant. $1/(1-a)$ is the DC gain; the DT time constant is $-1/\ln\lvert a\rvert = 9.49$ samples. The two happen to be close here, which is exactly why the error survives unnoticed.

## Traps & Exam Notes

- **Using the CT time constant in DT.** $\tau=-1/\ln\lvert a\rvert$ samples, not $1/(1-a)$ which is the DC gain.
- **Writing $a^{n}$ instead of $a^{n+1}$ in the DT step response.** The running sum to $n$ has $n+1$ terms; the $n$ form makes $y[0]=0$.
- **Taking the step response's final value as 1.** It is the DC gain $H(0)$ or $H(1)$, which need not be 1.
- **Differentiating when you should difference.** In DT, $h[n]=g[n]-g[n-1]$; in CT, $h=dg/dt$.
- **Assuming a first-order system can overshoot.** A single real pole gives a monotone response; any overshoot means either a zero or a second-order pole pair is present.
- **Quoting a settling time without its band.** $4\tau$ is the $2\%$ figure, $3\tau$ the $5\%$ figure.
- **Reading $t_p=\pi/\omega_n$ for a second-order system.** It is $\pi/\omega_d$; the damped frequency is always lower than the natural frequency.
- **Forgetting that convolution assumes initial rest.** With stored energy the zero-input response adds to the step response computed here.

## See Also

- [[09_Difference_Equations_and_Stability]]
- [[04_Continuous-Time_Convolution]]
- [[05_Second_Order_Specifications]]

---

[[09_Difference_Equations_and_Stability|⬅ 09]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[11_CT_Fourier_and_Laplace_as_System_Tools|11 ➡]]
