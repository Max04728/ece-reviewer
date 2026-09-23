---
id: MATH-07-04
title: "Continuous-Time Convolution"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_System_Properties_and_LTI]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Continuous-Time Convolution

> [!abstract] Scope
> Evaluate the convolution integral of two continuous-time signals using the graphical flip-and-slide method and the standard convolution pairs.

## Core Concept

> [!tip] Intuition
> Convolution asks: at each instant $t$, how much of the input's history still matters, weighted by how the system responds to it. Flipping one signal and sliding it is just a systematic way to add up that overlap.

**The integral and what it means.** The convolution of two signals is defined as:
$$y(t)=\displaystyle\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,d\tau$$
Each value of $\tau$ contributes the input at time $\tau$ multiplied by the impulse response evaluated at the *age* $t-\tau$ of that input. An LTI system is entirely described by this operation, which is why convolution is the central computation of the subject.

**The graphical procedure.** (1) Keep $x(\tau)$ as drawn. (2) Flip $h(\tau)$ to get $h(-\tau)$. (3) Slide it right by $t$ to get $h(t-\tau)$. (4) Multiply the two and integrate the overlap. (5) Repeat as $t$ moves; the answer changes form each time an edge of one signal crosses an edge of the other. The integration limits are always the overlap — never assume they are $0$ to $t$ unless both signals are causal.

**Support and duration rules.** If $x$ is supported on $[a,b]$ and $h$ on $[c,d]$, then $y$ is supported on $[a+c,\,b+d]$ and its duration is the *sum* of the durations. This is the fastest sanity check available: a three-second input convolved with a four-second impulse response can neither start before $a+c$ nor end after $b+d$, and cannot be shorter than seven seconds. Convolution with $\delta(t-t_0)$ simply shifts:
$$x(t)*\delta(t-t_0)=x(t-t_0)$$
with no scaling.

**Standard pairs worth memorising.** $u(t)*u(t)=t\,u(t)$.
$$e^{-at}u(t)*e^{-bt}u(t)=\dfrac{e^{-at}-e^{-bt}}{b-a}u(t)$$
for $a\neq b$, and $te^{-at}u(t)$ when $a=b$. A rectangular pulse convolved with a rectangular pulse of the *same* width gives a triangle; of different widths gives a trapezoid. Convolution with $u(t)$ is integration:
$$x(t)*u(t)=\int_{-\infty}^{t}x(\tau)d\tau$$

**Algebraic properties.** Convolution is commutative ($x*h=h*x$), associative ($(x*h_1)*h_2=x*(h_1*h_2)$) and distributive over addition ($x*(h_1+h_2)=x*h_1+x*h_2$). Commutativity lets you flip whichever signal is easier; associativity means cascaded LTI blocks can be combined in any order; distributivity matches the parallel-block rule. The output of a causal system with a causal input uses limits $0$ to $t$, because both signals vanish outside that range — that special case is widely over-generalised.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Convolution integral | $y(t) = x(t) * h(t) = \int_{-\infty}^{\infty} x(\tau) h(t-\tau)\,d\tau$ | Flip and slide h; integrate the overlap only. |
| Commutativity | $x * h = h * x$ | Flip whichever signal is easier to slide. |
| Shift with an impulse | $x(t) * \delta(t-t_0) = x(t-t_0)$ | Pure shift, no scaling. Area of the impulse is 1. |
| Convolution with a step | $x(t) * u(t) = \int_{-\infty}^{t} x(\tau)\,d\tau$ | Running integral of the input. |
| Step with step | $u(t) * u(t) = t\,u(t)$ | A ramp, not a step. Unbounded, so it grows without limit. |
| Distinct exponentials | $e^{-at}u(t) * e^{-bt}u(t) = \frac{e^{-at}-e^{-bt}}{b-a}u(t)$ | Valid for a not equal to b; note the denominator b - a. |
| Repeated exponential | $e^{-at}u(t) * e^{-at}u(t) = t e^{-at}u(t)$ | The degenerate case a = b gives a linear-times-exponential. |
| Rectangles of equal width | $\mathrm{rect} * \mathrm{rect} = \mathrm{triangle}$ | Peak = width times height squared; total width doubles. |
| Rectangles of unequal width | $\mathrm{rect} * \mathrm{rect} = \mathrm{trapezoid}$ | Flat top lasts the difference of the two widths. |
| Duration rule | $T_y = T_x + T_h,\quad \mathrm{support} = [a+c,\ b+d]$ | Use it to reject an answer before doing any integration. |
| Causal limits | $y(t) = \int_0^{t} x(\tau)h(t-\tau)\,d\tau$ | Only when both x and h are causal (zero for t < 0). |

## Interactive Widget

**Convolution Flip and Slide**

![[Convolution_Flip_and_Slide.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Convolve $x(t)=u(t)-u(t-2)$ with $h(t)=u(t)$.

**Given:** x = unit pulse of width 2; h = u(t)

**Solution:**

1. Support: $x$ on $[0,2]$, $h$ on $[0,\infty)$, so $y$ is supported on $[0,\infty)$
2. For $0<t<2$: the overlap is $\tau\in[0,t]$, so $y(t)=\int_0^t 1\,d\tau = t$
3. For $t\ge2$: the overlap is $\tau\in[0,2]$, so $y(t)=\int_0^2 1\,d\tau = 2$
4. Write both pieces with unit steps: $y(t) = t\,u(t) - (t-2)u(t-2)$
5. Check at $t=3$: $3-1 = 2$ ✓; at $t=1$: $1-0 = 1$ ✓

> [!success]- Answer
> **$y(t)=t\,u(t)-(t-2)u(t-2)$ — a ramp for $0\le t\le2$, then a constant 2.**

> [!warning] Trap
> Using the limits $0$ to $t$ for all $t$ and reporting an ever-growing ramp. The input stops at $t=2$, so the overlap stops growing and the output flattens at 2.

### P2. Convolve $x(t)=e^{-t}u(t)$ with $h(t)=e^{-2t}u(t)$, and find the peak value of the result.

**Given:** x = e^{-t}u(t); h = e^{-2t}u(t)

**Solution:**

1. Both are causal, so $y(t)=\int_0^{t}e^{-\tau}e^{-2(t-\tau)}d\tau = e^{-2t}\int_0^{t}e^{\tau}d\tau$
2. $= e^{-2t}\left[e^{\tau}\right]_0^{t} = e^{-2t}(e^{t}-1) = e^{-t}-e^{-2t}$
3. Apply the standard pair with $a=1$, $b=2$: $y(t)=\dfrac{e^{-t}-e^{-2t}}{2-1}u(t)$ ✓
4. Peak: $\dfrac{dy}{dt} = -e^{-t}+2e^{-2t} = 0 \Rightarrow e^{t}=2 \Rightarrow t=\ln2 = 0.693\ \mathrm{s}$
5. $y(\ln2) = 0.5-0.25 = 0.25$

> [!success]- Answer
> **$y(t)=(e^{-t}-e^{-2t})u(t)$, peaking at $y=0.25$ at $t=\ln2\approx0.693\ \mathrm{s}$.**

> [!warning] Trap
> Writing the denominator as $a-b = -1$ and dropping the sign, which turns a positive response into a negative one. The pair is $\dfrac{e^{-at}-e^{-bt}}{b-a}$, and the output of two positive causal signals must be positive.

### P3. A rectangular pulse $x(t)$ (height 1, width 2, centred at the origin) is convolved with $h(t)=\mathrm{rect}(t)$ (height 1, width 1, centred at the origin). Describe the result and give its duration.

**Given:** x = rect(t/2); h = rect(t)

**Solution:**

1. This is a rectangle of width 2 convolved with one of width 1: unequal widths give a trapezoid
2. Duration rule: $T_y = 2+1 = 3$, so the result spans $t\in[-1.5,\,1.5]$
3. For $-1.5<t<-0.5$: the overlap grows linearly from 0 to 1
4. For $-0.5\le t\le0.5$: the narrower pulse sits fully inside the wider one, so $y=1$ (the flat top)
5. For $0.5<t<1.5$: the overlap falls linearly from 1 to 0
6. Peak value: the area of the narrower pulse $= 1\times1 = 1$

> [!success]- Answer
> **A trapezoid spanning $[-1.5,1.5]$, rising 0 to 1 over $[-1.5,-0.5]$, flat at 1 over $[-0.5,0.5]$, falling to 0 over $[0.5,1.5]$.**

> [!warning] Trap
> Drawing a triangle. Two rectangles give a triangle only when their widths are equal; with widths 2 and 1 the result has a flat top of length $2-1=1$.

### P4. Find the step response of the system with $h(t)=e^{-2t}u(t)$.

**Given:** h(t) = e^{-2t}u(t); input = unit step

**Solution:**

1. $y(t) = u(t)*h(t) = \int_0^{t}e^{-2\tau}d\tau$ for $t\ge0$
2. $= \left[-\dfrac{e^{-2\tau}}{2}\right]_0^{t} = \dfrac{1-e^{-2t}}{2}$
3. So $y(t) = \dfrac{1}{2}\left(1-e^{-2t}\right)u(t)$
4. Final value: $y(\infty) = 1/2$, and at $t=0.5$ (one time constant) $y = 0.5(1-e^{-1}) = 0.316$

> [!success]- Answer
> **$y(t)=\tfrac12(1-e^{-2t})u(t)$, settling to $0.5$.**

> [!warning] Trap
> Reporting $h(t)$ itself as the step response. The step response is the running integral of the impulse response — here it is finite and settles at $1/2$, whereas $h$ decays to zero.

### P5. $x(t)$ is nonzero only on $[0,3]$ and $h(t)$ only on $[1,5]$. Where is $y(t)=x*h$ nonzero, and what is its duration?

**Given:** x support [0,3]; h support [1,5]

**Solution:**

1. Convolution support is the Minkowski sum of the supports: $t=a+b$ with $a\in[0,3]$, $b\in[1,5]$
2. Minimum: $0+1 = 1$; maximum: $3+5 = 8$
3. So $y(t)$ is nonzero only on $[1,8]$
4. Duration: $8-1 = 7$, which equals $T_x+T_h = 3+4$ ✓

> [!success]- Answer
> **$y$ is supported on $[1,8]$, duration 7 s.**

> [!warning] Trap
> Assuming the output starts at $t=0$ because 'convolution starts at zero'. The supports add; a delay in either signal delays the output.

## Traps & Exam Notes

- **Forgetting to flip.** The integrand is $x(\tau)h(t-\tau)$, not $x(\tau)h(\tau)$ — the second form gives a constant times a product, which is a different operation entirely.
- **Using the limits $0$ to $t$ when the signals are not both causal.** Those limits are valid only for causal $x$ and $h$; otherwise integrate over the actual overlap.
- **Mixing up the duration rule.** Durations add, supports add: $T_y=T_x+T_h$ and support $[a+c,\,b+d]$.
- **Convolving with $\delta(t-t_0)$ and scaling.** $x(t)*\delta(t-t_0)=x(t-t_0)$: shift only, no amplitude change.
- **Reporting $u(t)*u(t)=u(t)$.** It is $t\,u(t)$, a ramp; the convolution of two bounded signals need not be bounded.
- **Expecting a triangle from unequal rectangles.** Equal widths give a triangle, unequal widths a trapezoid.
- **Dropping the sign in the exponential pair.** The denominator is $b-a$, not $a-b$; a negative result for two positive causal signals is the diagnostic.
- **Assuming convolution is multiplication pointwise.** $x(t)h(t)$ is a different operation with different properties; convolution is an integral transform of the pair.

## See Also

- [[05_Discrete-Time_Convolution]]
- [[03_System_Properties_and_LTI]]
- [[10_System_Response_and_Step_Response]]

---

[[03_System_Properties_and_LTI|⬅ 03]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Discrete-Time_Convolution|05 ➡]]
