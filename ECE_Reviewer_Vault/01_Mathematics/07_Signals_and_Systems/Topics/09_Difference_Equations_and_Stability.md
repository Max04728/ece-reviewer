---
id: MATH-07-09
title: "Difference Equations and Stability"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 9
tier: 2
depth: full
problem_count: 5
prereqs: ["[[08_Inverse_Z_Transform]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Difference Equations and Stability

> [!abstract] Scope
> Solve a linear constant-coefficient difference equation by recursion or $z$-transforms, and decide stability from the characteristic roots.

## Core Concept

> [!tip] Intuition
> A difference equation is a rule for computing the next sample from the last few. Its homogeneous solution is set by the characteristic roots; the input adds a particular solution, and the total is the sum of the two.

**The form and the two solutions.** A linear constant-coefficient difference equation (LCCDE) has the form:
$$\sum_{k=0}^{N}a_k y[n-k]=\sum_{m=0}^{M}b_m x[n-m]$$
Its solution splits into the **zero-input** (natural, homogeneous) response driven by the initial conditions $y[-1],y[-2],\dots$ and the **zero-state** (forced) response driven by the input with zero initial rest. The total response is their sum. Do not confuse the zero-input response with the 'natural response' of the *forced* system: with a nonzero input the initial conditions of the particular solution also matter, and the zero-input/zero-state split is the one that is unambiguous.

**Recursion.** Given the initial conditions, solve for $y[n]$ directly:
$$y[n]=\dfrac{1}{a_0}\left(\sum b_m x[n-m]-\sum_{k\ge1}a_k y[n-k]\right)$$
This is exact and fast for the first few samples, and it is the best way to check any closed form you derive. It works for any input, including ones with no closed form.

**$z$-transform method.** Transform with initial conditions included. For a delay:
$$\mathcal{Z}\{y[n-k]\}=z^{-k}Y(z)+\sum_{m=1}^{k}y[-m]z^{-(k-m)}$$
for $k\ge1$ — then solve algebraically and invert. The transfer function is:
$$H(z)=\dfrac{\sum b_mz^{-m}}{\sum a_kz^{-k}}$$
It is what remains when all initial conditions are zero, and its ROC tells you the causality/stability story.

**Stability from the characteristic roots.** The characteristic equation comes from setting the input to zero: $\sum a_kz^{-k}=0$, which after multiplying by $z^{N}$ is a polynomial in $z$ whose roots are the poles. For a **causal** system, BIBO stability requires every pole strictly inside the unit circle, $\lvert p_i\rvert<1$. Poles on $\lvert z\rvert=1$ give marginal behaviour (a bounded natural response but an unbounded response to a resonant input); poles outside give an exponentially growing impulse response.

**Second-order shortcut (Jury/triangle test).** For $z^2+a_1z+a_2=0$ the roots are both inside the unit circle iff $\lvert a_2\rvert<1$ **and** $\lvert a_1\rvert<1+a_2$. This is the DT mirror of the Routh condition for a second-order polynomial, and it is what board questions use for a symbolic coefficient. Complex-conjugate poles are stable whenever their radius $\sqrt{a_2}$ is less than 1, which is why $a_2$ alone is a *necessary* but not sufficient condition — the $a_1$ inequality rules out a pair of real poles straddling the unit circle.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| General LCCDE | $\sum_{k=0}^{N} a_k y[n-k] = \sum_{m=0}^{M} b_m x[n-m]$ | Constant coefficients; the system is LTI and causal when the recursion is in y[n-k], k>=1. |
| Transfer function | $H(z) = \frac{\sum_{m=0}^{M} b_m z^{-m}}{\sum_{k=0}^{N} a_k z^{-k}}$ | Obtained with zero initial conditions. |
| Recursion form | $y[n] = \frac{1}{a_0}\left(\sum_m b_m x[n-m] - \sum_{k\ge1} a_k y[n-k]\right)$ | Use it to generate samples and to check a closed form. |
| Zero-input response | $y_{zi}[n] = \sum_i C_i p_i^{\,n}$ | C_i from the initial conditions y[-1], y[-2], ...; p_i are the characteristic roots. |
| Characteristic equation | $\sum_{k=0}^{N} a_k z^{N-k} = 0$ | Multiply by z^N so the roots are the poles in z (not their reciprocals). |
| Causal stability condition | $\lvert p_i \rvert < 1\ \mathrm{for\ every\ pole}$ | Causal systems only; for a non-causal ROC, stability means the ROC contains \|z\| = 1. |
| Second-order Jury conditions | $\lvert a_2 \rvert < 1\ \mathrm{and}\ \lvert a_1 \rvert < 1+a_2$ | For z^2 + a1 z + a2 = 0. Both are needed. |
| First-order recursion | $y[n] = a y[n-1] + x[n] \Rightarrow p = a$ | Stable iff \|a\| < 1; time constant -1/ln\|a\| samples. |
| Step response of a first-order recursion | $y[n] = \frac{b}{1-a}\left(1-a^{n+1}\right)u[n]$ | For y[n] = a y[n-1] + b x[n] with x = u[n] and zero initial rest. |
| Impulse response | $h[n] = \mathcal{Z}^{-1}\{H(z)\}$ | Zero-state response to delta[n]; the recursion with x = delta generates it sample by sample. |

## Worked Problems

### P1. Solve $y[n]-0.5y[n-1]=x[n]$ with $y[-1]=2$ and $x[n]=0$ for $n\ge0$.

**Given:** y[n] - 0.5 y[n-1] = x[n]; y[-1] = 2; x[n] = 0

**Solution:**

1. Zero input, so this is the zero-input response: $y[n]=0.5y[n-1]$ for $n\ge0$
2. $y[0]=0.5y[-1]=0.5(2)=1$
3. $y[1]=0.5(1)=0.5$, $y[2]=0.5(0.5)=0.25$
4. General form: $y[n]=(0.5)^{n}y[0]=(0.5)^{n}$ for $n\ge0$
5. So $y[n]=(0.5)^{n}u[n]$, or equivalently $2(0.5)^{n+1}u[n]$

> [!success]- Answer
> **$y[n]=(0.5)^{n}u[n]$ — a decaying natural response set by the single pole at $z=0.5$.**

> [!warning] Trap
> Answering $y[n]=2(0.5)^{n}u[n]$ by propagating the initial condition directly. The state at $n=-1$ decays once *before* $n=0$: $y[0]=0.5y[-1]=1$.

### P2. Find the unit-step response of $y[n]-0.5y[n-1]=x[n]$ with zero initial rest.

**Given:** y[n] - 0.5 y[n-1] = x[n]; x[n] = u[n]; y[-1] = 0

**Solution:**

1. With zero initial rest, $H(z)=\dfrac{1}{1-0.5z^{-1}}$
2. For a step, $Y(z)=\dfrac{1}{(1-0.5z^{-1})(1-z^{-1})}$
3. Partial fractions: $Y(z)=\dfrac{2}{1-z^{-1}}-\dfrac{1}{1-0.5z^{-1}}$
4. Both poles are inside the unit circle, so both terms are causal: $y[n]=\left(2-(0.5)^{n}\right)u[n]$
5. Check $n=0$: $y[0]=2-1=1$; recursion gives $0.5(0)+1=1$ ✓
6. Check $n=1$: $2-0.5=1.5$; recursion gives $0.5(1)+1=1.5$ ✓; the final value is $H(1)=2$

> [!success]- Answer
> **$y[n]=\left(2-(0.5)^{n}\right)u[n]$, settling to 2.**

> [!warning] Trap
> Ignoring $y[-1]$ and using it anyway. With zero initial rest the recursion starts from $y[-1]=0$; if the problem gave $y[-1]\neq0$ you would need the extra zero-input term added to this answer.

### P3. Determine the stability of $y[n]=1.2y[n-1]-0.32y[n-2]+x[n]$.

**Given:** y[n] = 1.2 y[n-1] - 0.32 y[n-2] + x[n]

**Solution:**

1. Characteristic equation: $z^2-1.2z+0.32=0$
2. Discriminant: $1.44-4(0.32) = 1.44-1.28 = 0.16$, $\sqrt{0.16}=0.4$
3. $z = \dfrac{1.2\pm0.4}{2} \Rightarrow z_1 = 0.8,\ z_2 = 0.4$
4. Both magnitudes are less than 1, so the system is BIBO stable
5. Cross-check with the Jury conditions: $\lvert a_2\rvert = 0.32 < 1$ ✓ and $\lvert a_1\rvert = 1.2 < 1+0.32 = 1.32$ ✓

> [!success]- Answer
> **Stable: poles at $z=0.8$ and $z=0.4$, both inside the unit circle.**

> [!warning] Trap
> Reading the characteristic polynomial off the recursion without the sign flip. The recursion has $-1.2y[n-1]$, so the polynomial is $z^2-1.2z+0.32$, with roots $+0.8$ and $+0.4$ — not $-0.8$ and $-0.4$.

### P4. For $z^2-1\cdot z+0.5=0$, use the Jury conditions to decide stability and confirm with the pole positions.

**Given:** z^2 - z + 0.5 = 0; a1 = -1, a2 = 0.5

**Solution:**

1. Condition 1: $\lvert a_2\rvert = 0.5 < 1$ ✓
2. Condition 2: $\lvert a_1\rvert = 1 < 1+a_2 = 1.5$ ✓
3. Both conditions hold, so the poles are inside the unit circle
4. Explicit roots: $z = \dfrac{1\pm\sqrt{1-2}}{2} = 0.5\pm j0.5$
5. Magnitudes: $\lvert z\rvert = \sqrt{0.25+0.25} = \sqrt{0.5} = 0.707 < 1$ ✓ stable

> [!success]- Answer
> **Stable; poles at $0.5\pm j0.5$ with $\lvert z\rvert=0.707$.**

> [!warning] Trap
> Checking only $\lvert a_2\rvert<1$. That condition alone is satisfied by $z^2-1.9z+0.9$, whose roots 1.0 and 0.9 include a pole on the unit circle. The $\lvert a_1\rvert<1+a_2$ condition is what catches it.

### P5. Find the impulse response of $y[n]=2y[n-1]+x[n]$ and use it to decide stability.

**Given:** y[n] = 2 y[n-1] + x[n]

**Solution:**

1. With zero initial rest, $H(z)=\dfrac{1}{1-2z^{-1}}$, pole at $z=2$
2. $h[n]=(2)^{n}u[n]$
3. Absolute summability test: $\sum_{n=0}^{\infty}\lvert 2\rvert^{n} = \infty$
4. The system is not BIBO stable; the pole lies outside the unit circle
5. Equivalently, the natural response grows without bound for any nonzero initial condition

> [!success]- Answer
> **$h[n]=2^{n}u[n]$ — unstable, because the pole at $z=2$ is outside the unit circle.**

> [!warning] Trap
> Concluding stability because the ROC $\lvert z\rvert>2$ is 'outside a pole'. A causal ROC outside the outermost pole includes the unit circle only if that pole radius is less than 1; here the unit circle is excluded.

## Traps & Exam Notes

- **Dropping the initial-condition terms when transforming.** $\mathcal{Z}\{y[n-1]\}=z^{-1}Y(z)+y[-1]$; omitting $y[-1]$ silently computes the zero-state response only.
- **Reporting the zero-state answer when initial conditions were given.** For a first-order system, $y[-1]$ contributes $a^{n+1}y[-1]$, which can dominate the early samples.
- **Sign errors building the characteristic polynomial.** A recursion with $-ay[n-1]$ gives $z-a=0$, not $z+a=0$.
- **Testing stability with the $z^{-1}$ polynomial.** Roots of $\sum a_kz^{-k}=0$ are the reciprocals of the poles; multiply by $z^N$ first.
- **Treating a pole on the unit circle as stable.** A pole at $z=1$ gives a bounded natural response to a step but an unbounded response to a ramp, so the system is not BIBO stable.
- **Applying the causal stability rule to a non-causal ROC.** Stability is always 'the ROC contains $\lvert z\rvert=1$'; 'all poles inside the unit circle' is only the causal special case.
- **Trusting the Jury conditions for orders above two.** $\lvert a_2\rvert<1$ and $\lvert a_1\rvert<1+a_2$ apply to a quadratic only; higher orders need the full Jury array.
- **Confusing the natural response with the zero-input response.** With a nonzero input the forced particular solution also contains the characteristic modes; only the zero-input/zero-state split is unambiguous.

## See Also

- [[08_Inverse_Z_Transform]]
- [[10_System_Response_and_Step_Response]]
- [[06_Z_Transform_Definition_and_ROC]]

---

[[08_Inverse_Z_Transform|⬅ 08]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[10_System_Response_and_Step_Response|10 ➡]]
