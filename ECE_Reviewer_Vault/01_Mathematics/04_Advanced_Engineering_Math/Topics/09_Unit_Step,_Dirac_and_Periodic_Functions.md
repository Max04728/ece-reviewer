---
id: MATH-04-09
title: "Unit Step, Dirac and Periodic Functions"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 9
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Laplace_Transform_Pairs]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Unit Step, Dirac and Periodic Functions

> [!abstract] Scope
> Represent switched and piecewise signals with unit step functions, use the Dirac impulse and its sifting property, and transform periodic waveforms.

## Core Concept

> [!tip] Intuition
> The unit step is a switch, so any piecewise signal is a sum of shifted steps; the impulse is the derivative of that switch, an infinitely tall, infinitely narrow spike of unit area that samples whatever it multiplies. Together they let one table entry cover every waveform an exam can draw.

**The unit step builds piecewise signals.** $u(t) = 0$ for $t<0$ and $1$ for $t>0$, so $u(t-a)$ switches a signal on at $t=a$ and $-u(t-b)$ switches it off at $t=b$. A rectangular pulse of height $A$ from $a$ to $b$ is $A\,[u(t-a)-u(t-b)]$. A ramp that starts at $t=a$ is $(t-a)u(t-a)$; a function that follows $f(t)$ after $a$ and is zero before is $f(t-a)u(t-a)$. Writing the signal in this form is always the first step, because the transform then follows from the step pair and the second shifting theorem.

**The Dirac impulse is a limit, not a function.** $\delta(t)$ is defined by its action: $\delta(t)=0$ for $t\neq0$. Its total area is:
$$\int_{-\infty}^{\infty}\delta(t)\,dt = 1$$
The sifting property is:
$$\int_{-\infty}^{\infty}f(t)\delta(t-a)\,dt = f(a)$$
for any $f$ continuous at $a$. It is the derivative of the unit step and the derivative of a jump discontinuity of size $K$ contributes $K\delta(t-a)$ to the derivative. Its units are $1/\mathrm{time}$: a scaled impulse $k\delta(t)$ has area $k$, which is why $\mathcal{L}\{k\delta(t)\} = k$ with no $s$ anywhere.

**Periodic waveforms and the geometric factor.** A signal that repeats with period $T$ need not be transformed from scratch:
$$\mathcal{L}\{f(t)\} = \frac{1}{1-e^{-sT}}\int_{0}^{T}f(t)e^{-st}\,dt$$
for $\mathrm{Re}\,s>0$. The integral handles one period and the geometric factor $\frac{1}{1-e^{-sT}}$ sums the infinite train of copies (it is $\sum_{n=0}^{\infty}e^{-nsT}$). Any periodic signal can also be written as a shifted-step superposition, which is often faster but produces the same result after geometric-series summation.

**Where the representation breaks.** A signal with a jump must be written with the step at the correct side of the jump; the value at the single point $t=a$ is immaterial for the transform, but the *direction* of the jump is not. Impulses in a derivative require the $0^-$ lower limit to be captured: with $\int_{0^-}$ the impulse at the origin is included and $\mathcal{L}\{\delta\}=1$; with $\int_{0^+}$ it is excluded and the answer becomes $0$. Finally, the periodic formula requires one full period in the integral — integrating over $T/2$ silently doubles or halves the answer.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Unit step definition | $u(t) = \begin{cases}0, & t<0\\ 1, & t>0\end{cases}$ | Value at exactly $t=0$ is irrelevant to the transform. |
| Delayed step | $u(t-a) = \begin{cases}0, & t<a\\ 1, & t>a\end{cases}$ | $a>0$ for a causal delay; negative $a$ advances the switch. |
| Step transform | $\mathcal{L}\{u(t)\} = \frac{1}{s}$ | $\mathrm{Re}\,s>0$; pole at the origin. |
| Delayed step transform | $\mathcal{L}\{u(t-a)\} = \frac{e^{-as}}{s}$ | $\mathrm{Re}\,s>0$. Dropping the $e^{-as}$ loses the whole delay. |
| Rectangular pulse | $f(t) = A\,[u(t-a)-u(t-b)] \;\longleftrightarrow\; \frac{A}{s}\left(e^{-as}-e^{-bs}\right)$ | Height $A$ from $a$ to $b$; the two steps must use the same height. |
| Impulse definition | $\delta(t)=0\ (t\neq0),\qquad \int_{-\infty}^{\infty}\delta(t)\,dt = 1$ | Units of $1/\mathrm{time}$; $k\delta(t)$ has area $k$. |
| Sifting property | $\int_{-\infty}^{\infty}f(t)\,\delta(t-a)\,dt = f(a)$ | Requires $f$ continuous at $t=a$. |
| Impulse transforms | $\mathcal{L}\{\delta(t)\} = 1,\qquad \mathcal{L}\{\delta(t-a)\} = e^{-as}$ | Valid for every $s$; these are entire functions with no poles. |
| Step–impulse relation | $\frac{d}{dt}u(t) = \delta(t)$ | A jump of size $K$ at $t=a$ contributes $K\delta(t-a)$ to the derivative. |
| Delayed function | $\mathcal{L}\{f(t-a)u(t-a)\} = e^{-as}F(s)$ | The argument must be delayed along with the step. |
| Periodic waveform | $\mathcal{L}\{f(t)\} = \frac{1}{1-e^{-sT}}\int_{0}^{T}f(t)e^{-st}\,dt$ | $T$ is the full period; the integral covers exactly one period. |
| Impulse train | $\sum_{n=0}^{\infty}\delta(t-nT) \;\longleftrightarrow\; \frac{1}{1-e^{-sT}}$ | $\mathrm{Re}\,s>0$; the sampling model behind the $z$-transform. |
| Square wave (period 2) | $f(t) = \pm1 \mathrm{\ on\ } (0,1),(1,2) \;\longleftrightarrow\; \frac{1}{s}\tanh\!\left(\frac{s}{2}\right)$ | Zero mean; $F(s)\to 1/2$ as $s\to0$. |
| Geometric expansion of the delay | $\frac{1}{1-e^{-sT}} = \sum_{n=0}^{\infty}e^{-nsT}$ | Valid for $\mathrm{Re}\,s>0$; this is how the periodic factor is derived. |

## Worked Problems

### P1. A signal is $f(t) = 2$ for $0<t<3$ and $0$ elsewhere. Express it with unit steps and find its Laplace transform.

**Given:** height 2; on-interval (0, 3)

**Solution:**

1. Switch on at $t=0$ and off at $t=3$: $f(t) = 2u(t) - 2u(t-3)$
2. $\mathcal{L}\{2u(t)\} = \frac{2}{s}$
3. Second shifting: $\mathcal{L}\{2u(t-3)\} = \frac{2e^{-3s}}{s}$
4. $F(s) = \frac{2}{s} - \frac{2e^{-3s}}{s} = \frac{2}{s}\left(1-e^{-3s}\right)$

> [!success]- Answer
> **$F(s) = \dfrac{2}{s}\left(1-e^{-3s}\right)$, ROC $\mathrm{Re}\,s>0$**

> [!warning] Trap
> Writing the pulse as a single delayed step $2u(t-3)$, which switches the signal on at $t=3$ instead of off. A finite pulse always needs two steps with opposite signs.

### P2. Find $\mathcal{L}\{t\,u(t-1)\}$.

**Given:** g(t) = t; switch at a = 1

**Solution:**

1. Rewrite with the delayed argument: $t = (t-1) + 1$
2. $f(t) = (t-1)u(t-1) + u(t-1)$
3. $\mathcal{L}\{(t-1)u(t-1)\} = e^{-s}\mathcal{L}\{t\} = \frac{e^{-s}}{s^{2}}$
4. $\mathcal{L}\{u(t-1)\} = \frac{e^{-s}}{s}$
5. $F(s) = e^{-s}\left(\frac{1}{s^{2}} + \frac{1}{s}\right)$

> [!success]- Answer
> **$F(s) = e^{-s}\left(\dfrac{1}{s^{2}}+\dfrac{1}{s}\right)$**

> [!warning] Trap
> Answering $\frac{e^{-s}}{s^{2}}$ by treating the function as $(t-1)u(t-1)$. The ramp is $t$, so after the delay it carries the extra $+1$, which contributes the $e^{-s}/s$ term.

### P3. A square wave has period $T=2$ with $f(t)=+1$ on $(0,1)$ and $f(t)=-1$ on $(1,2)$. Find its Laplace transform.

**Given:** T = 2 s; f = +1 then -1

**Solution:**

1. Periodic formula: $F(s) = \frac{1}{1-e^{-2s}}\int_{0}^{2}f(t)e^{-st}dt$
2. $\int_{0}^{1}e^{-st}dt = \frac{1-e^{-s}}{s}$
3. $\int_{1}^{2}e^{-st}dt = \frac{e^{-s}-e^{-2s}}{s}$
4. Difference: $\frac{1-2e^{-s}+e^{-2s}}{s} = \frac{(1-e^{-s})^{2}}{s}$
5. $F(s) = \frac{(1-e^{-s})^{2}}{s(1-e^{-2s})} = \frac{(1-e^{-s})^{2}}{s(1-e^{-s})(1+e^{-s})} = \frac{1-e^{-s}}{s(1+e^{-s})}$
6. Recognise the hyperbolic tangent: $F(s) = \frac{1}{s}\tanh\!\left(\frac{s}{2}\right)$

> [!success]- Answer
> **$F(s) = \dfrac{1}{s}\tanh\!\left(\dfrac{s}{2}\right)$**

> [!warning] Trap
> Dropping the $1/(1-e^{-sT})$ factor and reporting only the single-period integral. Without it the answer is the transform of one period, not of the periodic signal.

### P4. Evaluate $\displaystyle\int_{0}^{\infty}e^{-3t}\delta(t-2)\,dt$.

**Given:** f(t) = e^{-3t}; impulse at t = 2

**Solution:**

1. The sifting property states $\int f(t)\delta(t-a)dt = f(a)$
2. Here $f(t) = e^{-3t}$ and $a = 2$, and $a$ lies inside the range of integration
3. $= e^{-3(2)} = e^{-6}$
4. $e^{-6} = 2.479\times10^{-3}$

> [!success]- Answer
> **$e^{-6} \approx 2.48\times10^{-3}$**

> [!warning] Trap
> Substituting $t = 0$ because the integral starts there, or integrating $e^{-3t}$ and then evaluating the antiderivative. The impulse samples the integrand at $t=2$, not at the lower limit.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. The impulse samples the integrand at $t = 2$, so the integral is one evaluation: `e^(-3×2)` → **2.479E-3** ($e^{-6}$).
> 2. Sampling at the lower limit instead: `e^(-3×0)` → **1**, wrong by a factor of about 400.
>
> The sifting property evaluates the *other* factor at $t=2$; there is no antiderivative in the working.

### P5. Find $\mathcal{L}\{t^{2}u(t-2)\}$.

**Given:** g(t) = t^2; switch at a = 2

**Solution:**

1. Use $\mathcal{L}\{g(t)u(t-a)\} = e^{-as}\mathcal{L}\{g(t+a)\}$
2. $g(t+2) = (t+2)^{2} = t^{2}+4t+4$
3. $\mathcal{L}\{t^{2}+4t+4\} = \frac{2}{s^{3}} + \frac{4}{s^{2}} + \frac{4}{s}$
4. $F(s) = e^{-2s}\left(\frac{2}{s^{3}} + \frac{4}{s^{2}} + \frac{4}{s}\right)$

> [!success]- Answer
> **$F(s) = e^{-2s}\left(\dfrac{2}{s^{3}}+\dfrac{4}{s^{2}}+\dfrac{4}{s}\right)$**

> [!warning] Trap
> Writing $e^{-2s}\cdot\frac{2}{s^{3}}$ by treating the function as already delayed. It is not: the delayed form $f(t-2) = (t-2)^{2}$ is a different signal, and its transform is exactly $2e^{-2s}/s^{3}$.

## Traps & Exam Notes

- **Starting a delayed signal with the unshifted function.** For $t>a$ a signal that follows $f$ must be written $f(t-a)u(t-a)$. Writing $f(t)u(t-a)$ gives a different waveform (the extra $a$ of evolution is included) and a different transform.
- **Omitting the $e^{-as}$ on the step pair.** $\mathcal{L}\{u(t-a)\} = e^{-as}/s$; answering $1/s$ is the transform of the switch that was already on at $t=0$.
- **Building a pulse from two identical steps.** A pulse must be $A[u(t-a)-u(t-b)]$ with the second step subtracted. Adding the second step produces a signal that never switches off.
- **Treating $\delta$ as an ordinary function and plugging in $t=0$.** The sifting property evaluates the *other* factor at $t=a$; $\delta(t-a)$ is zero everywhere except at $a$, and at $a$ it is not a finite value.
- **Forgetting that $\delta$ carries units of $1/\mathrm{time}$.** $\mathcal{L}\{k\delta(t)\}=k$ and $\mathcal{L}\{k\delta(t-a)\}=ke^{-as}$; leaving the impulse scale inside a step term produces a magnitude error by the factor $k$.
- **Using the wrong period in the periodic formula.** The integral must cover exactly one full period $T$ and the geometric factor must use that same $T$. Integrating over $T/2$ or using the half-period in $e^{-sT}$ scales the answer.
- **Ignoring the lower limit when an impulse sits at the origin.** With $\int_{0^-}$ the impulse at $t=0$ is included and $\mathcal{L}\{\delta\}=1$; with $\int_{0^+}$ it is excluded and the transform of a pure impulse is $0$. Which convention is in force changes the answer.

## See Also

- [[07_Laplace_Transform_Pairs]]
- [[08_Shifting_Theorems_and_Properties]]
- [[10_Inverse_Laplace_and_Partial_Fractions]]
- [[11_RLC_Circuit_Transients]]
- [[03_Sequences_and_Convergence_Tests]]

---

[[08_Shifting_Theorems_and_Properties|⬅ 08]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Inverse_Laplace_and_Partial_Fractions|10 ➡]]
