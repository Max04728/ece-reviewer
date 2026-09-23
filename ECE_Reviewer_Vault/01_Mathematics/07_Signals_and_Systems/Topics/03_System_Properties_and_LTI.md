---
id: MATH-07-03
title: "System Properties and LTI"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Signal_Classification_and_Operations]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — System Properties and LTI

> [!abstract] Scope
> Test a system for memory, causality, linearity, time invariance and BIBO stability, and use the impulse response to decide stability and causality.

## Core Concept

> [!tip] Intuition
> Linear time-invariant systems are completely characterised by one signal — the impulse response. Everything else (step response, frequency response, stability, causality) is a property of that single function.

**The properties.** *Memoryless*: the output at time $t$ depends only on the input at time $t$. *Causal*: the output depends only on present and past inputs (no peeking ahead). *Linear*: superposition holds — scaling the input scales the output, and the response to a sum is the sum of responses. *Time-invariant*: a shift of the input produces the same shift of the output. *Stable* (BIBO): every bounded input produces a bounded output.

**Testing linearity and time invariance.** Linearity is two checks: additivity $T\{x_1+x_2\}=T\{x_1\}+T\{x_2\}$ and homogeneity $T\{ax\}=aT\{x\}$. Time invariance is one check: let $y(t)=T\{x(t)\}$; then the system is TI iff $T\{x(t-t_0)\}=y(t-t_0)$ for every $t_0$. Any system containing an explicit $t$ (such as $y(t)=tx(t)$ or $y(t)=x(2t)$) fails the shift test even when it is perfectly linear.

**Why LTI is the whole game.** For an LTI system the output is the convolution of the input with the impulse response: $y=h*x$. That single fact is what makes Laplace, Fourier and $z$ transforms useful — they turn convolution into multiplication. Non-LTI systems have no transfer function at all, so almost every board problem begins by asking you to confirm LTI.

**BIBO stability from the impulse response.** An LTI system is BIBO stable iff its impulse response is absolutely integrable (CT) or absolutely summable (DT):
$$\int\lvert h(t)\rvert dt<\infty$$
or $\sum\lvert h[n]\rvert<\infty$. This is exactly the condition that a bounded input cannot accumulate. It is *not* the condition $h\to0$:
$$h(t)=\dfrac{1}{t+1}u(t)$$
decays to zero yet is not absolutely integrable, so that system is unstable.

**Causality from the impulse response.** A CT LTI system is causal iff $h(t)=0$ for $t<0$; a DT LTI system is causal iff $h[n]=0$ for $n<0$. Causal and stable are independent: $h(t)=e^{2t}u(-t)$ has finite area $1/2$ and is therefore stable, but it is nonzero for negative time and therefore non-causal. Equally, $h[n]=u[n]$ is causal and unstable.

**Step response and interconnections.** The step response is the running integral (CT) or running sum (DT) of the impulse response:
$$g(t)=\int_{-\infty}^{t}h(\tau)d\tau$$
$g[n]=\sum_{k=-\infty}^{n}h[k]$; conversely $h=dg/dt$ (CT) or $h[n]=g[n]-g[n-1]$ (DT). In cascade, impulse responses convolve ($h_1*h_2$); in parallel they add ($h_1+h_2$). A system with impulse response $K\delta(t)$ is memoryless with gain $K$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Convolution (CT) | $y(t) = \int_{-\infty}^{\infty} h(\tau) x(t-\tau)\,d\tau$ | The defining property of an LTI system. |
| Convolution (DT) | $y[n] = \sum_{k=-\infty}^{\infty} h[k] x[n-k]$ | Same operation, sum instead of integral. |
| BIBO stability (CT) | $\int_{-\infty}^{\infty} \lvert h(t) \rvert dt < \infty$ | Absolute integrability. h(t) -> 0 is not enough. |
| BIBO stability (DT) | $\sum_{n=-\infty}^{\infty} \lvert h[n] \rvert < \infty$ | Absolute summability; fails for h[n] = u[n]. |
| Causality (CT) | $h(t) = 0\ \mathrm{for}\ t<0$ | Causality and stability are independent properties. |
| Causality (DT) | $h[n] = 0\ \mathrm{for}\ n<0$ | The impulse response must be right-sided from n = 0. |
| Memoryless LTI | $h(t) = K\delta(t),\quad h[n] = K\delta[n]$ | The output depends on the input only at the same instant. |
| Step response (CT) | $g(t) = \int_{-\infty}^{t} h(\tau)\,d\tau,\quad h(t) = \frac{dg}{dt}$ | The step response is the running integral of h. |
| Step response (DT) | $g[n] = \sum_{k=-\infty}^{n} h[k],\quad h[n] = g[n]-g[n-1]$ | Running sum and first difference. |
| Cascade and parallel | $h_{cas} = h_1 * h_2,\quad h_{par} = h_1 + h_2$ | Series convolves, parallel adds. Convolution commutes, so the order does not matter. |
| Time-invariance test | $T\{x(t-t_0)\} = y(t-t_0)\ \mathrm{for\ all}\ t_0$ | Fails whenever t appears explicitly in the system equation. |

## Worked Problems

### P1. For $h(t)=e^{-3t}u(t)$, determine whether the system is causal, BIBO stable, and whether it has memory.

**Given:** h(t) = e^{-3t}u(t)

**Solution:**

1. Causality: $h(t)=0$ for $t<0$ because of the $u(t)$, so the system is causal
2. Stability: $\int_{-\infty}^{\infty}\lvert h(t)\rvert dt = \int_0^{\infty}e^{-3t}dt = \dfrac{1}{3} < \infty$, so BIBO stable
3. Memory: $h(t)$ is not a scaled impulse, so the output depends on past inputs — the system has memory

> [!success]- Answer
> **Causal, BIBO stable (area $1/3$), with memory.**

> [!warning] Trap
> Concluding stability from '$h(t)\to0$ as $t\to\infty$'. The test is absolute integrability; that happens to hold here, but the two criteria are not the same.

### P2. For $h[n]=(1.1)^{n}u[n]$, determine causality and BIBO stability.

**Given:** h[n] = (1.1)^n u[n]

**Solution:**

1. Causality: $h[n]=0$ for $n<0$, so the system is causal
2. $\sum_{n=0}^{\infty}\lvert 1.1 \rvert^{n}$ is a geometric series with ratio $1.1>1$
3. The series diverges, so $\sum\lvert h[n]\rvert = \infty$
4. The system is not BIBO stable

> [!success]- Answer
> **Causal but unstable — the geometric ratio exceeds 1.**

> [!warning] Trap
> Judging a DT geometric by its continuous analogue. $0.9^n$ decays but $1.1^n$ grows without bound; the boundary is exactly $\lvert a\rvert=1$.

### P3. For $h(t)=e^{2t}u(-t)$, determine causality and BIBO stability.

**Given:** h(t) = e^{2t}u(-t)

**Solution:**

1. The $u(-t)$ makes $h$ nonzero only for $t<0$, so $h(t)\neq0$ for negative time
2. The system is non-causal (it responds before the input arrives)
3. Stability: $\int_{-\infty}^{0}e^{2t}dt = \left[\dfrac{e^{2t}}{2}\right]_{-\infty}^{0} = \dfrac12 < \infty$
4. The area is finite, so the system is BIBO stable

> [!success]- Answer
> **Non-causal but BIBO stable (area $1/2$).**

> [!warning] Trap
> Assuming an exponentially growing factor means instability. Under the reversed time direction the exponential *decays* as $t\to-\infty$, so the area is finite; causality and stability are separate tests.

### P4. A DT system is $y[n]=x[n]+x[n-1]$. Find its impulse response, and test causality, memory and stability.

**Given:** y[n] = x[n] + x[n-1]

**Solution:**

1. Impulse response: $h[n]=\delta[n]+\delta[n-1]$, i.e. $h[0]=1$, $h[1]=1$, zero elsewhere
2. Causality: $h[n]=0$ for $n<0$ ✓ causal
3. Memory: the output uses $x[n-1]$, so the system has memory (it is a two-tap FIR filter, not memoryless)
4. Stability: $\sum\lvert h[n]\rvert = 1+1 = 2 < \infty$ ✓ BIBO stable
5. This is a two-point moving-average difference, an FIR filter of length 2

> [!success]- Answer
> **$h[n]=\delta[n]+\delta[n-1]$; causal, stable, with memory (FIR filter).**

> [!warning] Trap
> Calling it memoryless because no feedback or accumulator appears. Any dependence on $x[n-1]$ is memory; memoryless means $y[n]=Kx[n]$ only.

### P5. Is $y(t)=x(2t)$ linear? Is it time-invariant? Justify both answers.

**Given:** y(t) = x(2t)

**Solution:**

1. Linearity: $T\{ax_1+bx_2\} = ax_1(2t)+bx_2(2t) = aT\{x_1\}+bT\{x_2\}$ ✓ linear
2. Time invariance: let $y(t)=x(2t)$ and shift the input by $t_0$
3. $T\{x(t-t_0)\} = x(2t-t_0)$
4. The shifted output is $y(t-t_0) = x(2(t-t_0)) = x(2t-2t_0)$
5. $x(2t-t_0) \neq x(2t-2t_0)$ in general, so the system is time-varying

> [!success]- Answer
> **Linear but time-varying (time compression is not a shift-invariant operation).**

> [!warning] Trap
> Assuming 'linear' implies 'LTI'. Time scaling, amplitude modulation $y=tx(t)$, and sampling are all linear but time-varying — and none of them has a transfer function.

## Traps & Exam Notes

- **Equating stability with '$h$ decays to zero'.** $h(t)=\dfrac{1}{t+1}u(t)$ decays yet $\int\lvert h\rvert=\infty$, so the system is unstable. Absolute integrability is the test.
- **Equating causality with the presence of $u(t)$.** $e^{2t}u(-t)$ contains a unit step and is anti-causal.
- **Assuming linear implies time-invariant.** $y(t)=x(2t)$ and $y(t)=tx(t)$ are both linear and both time-varying.
- **Confusing the impulse response with the step response.** $h$ and $g$ differ by an integration (or a first difference in DT); reporting $g$ where $h$ is asked shifts every number.
- **Adding impulse responses in cascade.** Cascade convolves, parallel adds.
- **Testing BIBO stability on the wrong signal.** Use $\sum\lvert h[n]\rvert$, not $\lvert \sum h[n]\rvert$ — a response with alternating signs can sum to a small number while its absolute sum diverges.
- **Forgetting that non-LTI systems have no impulse-response characterisation.** $y=h*x$ is an LTI result; do not apply it after the system fails the time-invariance test.
- **Ignoring initial rest.** Convolution assumes the system starts at rest; with stored energy the zero-input response must be added separately.

## See Also

- [[02_Energy,_Power,_Even_and_Odd]]
- [[04_Continuous-Time_Convolution]]
- [[05_Discrete-Time_Convolution]]

---

[[02_Energy,_Power,_Even_and_Odd|⬅ 02]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Continuous-Time_Convolution|04 ➡]]
