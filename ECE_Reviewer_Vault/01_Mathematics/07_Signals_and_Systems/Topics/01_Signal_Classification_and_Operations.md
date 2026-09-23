---
id: MATH-07-01
title: "Signal Classification and Operations"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: []
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Signal Classification and Operations

> [!abstract] Scope
> Classify a signal by domain, periodicity, causality and boundedness, and apply the shift, scale and reversal operations correctly.

## Core Concept

> [!tip] Intuition
> A signal is just a function of time with a story attached: is it defined on a continuum or on ticks, does it repeat, does it start at some point or extend both ways, and how do transformations of the time axis move it around.

**Continuous vs discrete, analog vs digital.** A continuous-time (CT) signal $x(t)$ is defined for every real $t$; a discrete-time (DT) signal $x[n]$ only at integer $n$. Amplitude is a separate axis: analog signals take a continuum of values, quantised/digital ones a finite set. Sampling converts CT to DT by $x[n]=x(nT_s)$; the sampling interval $T_s$ and the CT frequency $\omega$ combine into the discrete frequency $\Omega=\omega T_s$.

**Periodicity.** CT: $x(t)$ is periodic iff $x(t)=x(t+T)$ for some $T>0$, and the *fundamental* period is the smallest such $T$; then $f_0=1/T$ and $\omega_0=2\pi/T$. A sum of sinusoids is periodic only if their frequencies are commensurate (all integer multiples of a common $\omega_0$), and the fundamental period is the LCM of the individual periods. DT: $x[n]$ is periodic iff $x[n]=x[n+N]$ with integer $N$. **The condition is not automatic:** $e^{j\Omega n}$ is periodic iff $\Omega/2\pi$ is rational, and then $N=\dfrac{2\pi k}{\Omega}$ with $k$ the smallest integer making $N$ an integer.

**DT frequency is unique only modulo $2\pi$.** Because $e^{j\Omega n}$ is unchanged when $\Omega\to\Omega+2\pi k$, all DT frequencies live in one interval of length $2\pi$, conventionally $-\pi<\Omega\le\pi$ (or $0\le\Omega<2\pi$). Consequently $\cos(0.3\pi n)$ and $\cos(2.7\pi n)$ are the *same signal*, and a DT sinusoid at $\Omega=0.1$ looks identical to one at $\Omega=0.1+2\pi$. CT has no such aliasing because $\omega$ is unbounded.

**The three time-axis operations.** *Shift*: $x(t-t_0)$ delays (moves right) by $t_0>0$; $x(t+t_0)$ advances (moves left). *Scale*: $x(at)$ with $a>1$ compresses by $a$, with $0<a<1$ stretches by $1/a$; a signal of period $T$ becomes one of period $T/\lvert a\rvert$. *Reverse*: $x(-t)$ mirrors about the origin. Order matters: $x(2t-4)$ is $x(2(t-2))$ — a compression by 2 **then** a delay of 2, not a delay of 4. Amplitude operations (add, multiply, scale, clip) never change the period.

**Other classification axes.** Causal ($x(t)=0$ for $t<0$), anti-causal, or two-sided. Bounded if $\lvert x(t)\rvert\le M$ for all $t$ (note $t\,u(t)$ is unbounded). Deterministic or random. Real or complex — a complex signal's magnitude and phase are separate signals. These labels decide which tool applies: Fourier transforms need finite energy, Laplace and $z$ need a region of convergence, and convolutions need absolute integrability for BIBO stability.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Periodicity of a sum | $T = \mathrm{LCM}(T_1,T_2),\ \mathrm{frequencies\ must\ be\ commensurate}$ | Only if every frequency is an integer multiple of a common omega_0. |
| Fundamental frequency | $\omega_0 = 2\pi/T,\quad f_0 = 1/T$ | T is the smallest positive period, not any period. |
| DT periodicity condition | $x[n]\ \mathrm{periodic} \iff \frac{\Omega}{2\pi} = \frac{k}{N}\ \mathrm{rational}$ | Then N is the smallest integer period; cos(3n) is aperiodic. |
| DT fundamental period | $N = \frac{2\pi k}{\Omega}$ | k is the smallest positive integer making N an integer. |
| Time shift | $x(t-t_0)\ \mathrm{delays\ by}\ t_0>0$ | x(t+t_0) advances. Sign confusion here costs a whole problem. |
| Time scaling | $x(at)\ \mathrm{has\ period}\ T/\lvert a \rvert$ | a > 1 compresses; 0 < a < 1 stretches. |
| Combined shift and scale | $x(at-b) = x\left(a\left(t-\frac{b}{a}\right)\right)$ | Scale first, then shift by b/a. Ordering matters. |
| Time reversal | $x(-t)\ \mathrm{mirrors\ about}\ t=0$ | Period is unchanged by reversal. |
| Sampling relation | $\Omega = \omega T_s = \frac{2\pi\omega}{\omega_s}$ | DT frequency per sample; only the value modulo 2pi is observable. |
| Boundedness | $\lvert x(t) \rvert \le M < \infty\ \mathrm{for\ all}\ t$ | t u(t) is unbounded; sin(t) is bounded. |

## Worked Problems

### P1. Find the fundamental period and fundamental frequency of $x(t)=3\cos(4\pi t)+2\sin(6\pi t)$.

**Given:** x(t) = 3cos(4 pi t) + 2 sin(6 pi t)

**Solution:**

1. First term: $\omega_1 = 4\pi \Rightarrow T_1 = 2\pi/4\pi = 0.5\ \mathrm{s}$
2. Second term: $\omega_2 = 6\pi \Rightarrow T_2 = 2\pi/6\pi = 1/3\ \mathrm{s}$
3. Both frequencies are integer multiples of $2\pi$: $4\pi = 2(2\pi)$ and $6\pi = 3(2\pi)$
4. Fundamental period is the LCM of $1/2$ and $1/3$: $T_0 = \mathrm{LCM}(1,1)/\mathrm{GCD}(2,3) = 1\ \mathrm{s}$
5. $f_0 = 1/T_0 = 1\ \mathrm{Hz}$ and $\omega_0 = 2\pi\ \mathrm{rad/s}$
6. Check: at $t+1$ both arguments advance by $4\pi$ and $6\pi$, i.e. whole cycles

> [!success]- Answer
> **$T_0 = 1\ \mathrm{s}$, $f_0 = 1\ \mathrm{Hz}$, $\omega_0 = 2\pi\ \mathrm{rad/s}$.**

> [!warning] Trap
> Adding the periods ($0.5+0.33 = 0.83\ \mathrm{s}$) or taking the smaller period. A sum is periodic at the LCM of the periods, and the LCM of fractions is not their sum.

### P2. Is $x[n]=\cos(0.3\pi n)$ periodic? If so, give the fundamental period.

**Given:** x[n] = cos(0.3 pi n)

**Solution:**

1. $\Omega = 0.3\pi$
2. $\dfrac{\Omega}{2\pi} = \dfrac{0.3\pi}{2\pi} = 0.15 = \dfrac{3}{20}$, which is rational
3. $N = \dfrac{2\pi k}{\Omega} = \dfrac{2\pi k}{0.3\pi} = \dfrac{20k}{3}$
4. Smallest $k$ making $N$ an integer: $k = 3$
5. $N = 20$ samples
6. Check: $\cos(0.3\pi(n+20)) = \cos(0.3\pi n + 6\pi) = \cos(0.3\pi n)$ ✓

> [!success]- Answer
> **Periodic with fundamental period $N = 20$ samples.**

> [!warning] Trap
> Reporting $N = 20/3$ as the period. A DT period must be an integer number of samples; the fraction $2\pi/\Omega$ only becomes the period after multiplying by the right $k$.

### P3. Is $x[n]=\cos(3n)$ periodic? Explain.

**Given:** x[n] = cos(3n)

**Solution:**

1. $\Omega = 3\ \mathrm{rad/sample}$
2. $\dfrac{\Omega}{2\pi} = \dfrac{3}{2\pi} = 0.4775\dots$
3. $\pi$ is irrational, so this ratio is irrational and cannot equal $k/N$
4. No integer $N$ satisfies $\cos(3(n+N)) = \cos(3n)$
5. The signal is aperiodic

> [!success]- Answer
> **Aperiodic: $\Omega/2\pi = 3/(2\pi)$ is irrational.**

> [!warning] Trap
> Assuming every DT sinusoid is periodic because CT sinusoids are. Periodicity in DT requires the frequency ratio to be rational; $\cos(3n)$ never repeats.

### P4. $x(t)$ has period $T=4\ \mathrm{s}$. Find the period of $y(t)=x(2t)$ and of $z(t)=x(-t/2)$.

**Given:** x(t) period 4 s; y = x(2t); z = x(-t/2)

**Solution:**

1. Scaling rule: $x(at)$ has period $T/\lvert a\rvert$
2. $y$: $a = 2$, so $T_y = 4/2 = 2\ \mathrm{s}$ (compressed)
3. $z$: $a = -1/2$, and $\lvert a\rvert = 0.5$, so $T_z = 4/0.5 = 8\ \mathrm{s}$ (stretched)
4. Reversal alone would not change the period; only the magnitude of the scale factor matters

> [!success]- Answer
> **$T_y = 2\ \mathrm{s}$; $T_z = 8\ \mathrm{s}$.**

> [!warning] Trap
> Using the signed scale factor and getting $T_z = -8\ \mathrm{s}$. Period is a positive duration; use $\lvert a\rvert$.

### P5. Reduce $x[n]=\cos(2.7\pi n)$ to its equivalent frequency in $[0,2\pi)$, and state whether it is the same signal as $\cos(0.3\pi n)$.

**Given:** x[n] = cos(2.7 pi n); compare with cos(0.3 pi n)

**Solution:**

1. DT frequencies are unique only modulo $2\pi$: $e^{j(\Omega+2\pi)n}=e^{j\Omega n}$ for integer $n$
2. $2.7\pi - 2\pi = 0.7\pi$, which lies in $[0,2\pi)$
3. So $\cos(2.7\pi n) = \cos(0.7\pi n + 2\pi n) = \cos(0.7\pi n)$
4. Compare with $0.3\pi$: the difference is $0.4\pi$, not a multiple of $2\pi$, so they differ
5. Sanity check by plotting one period: $\cos(0.7\pi n)$ oscillates faster than $\cos(0.3\pi n)$
6. The genuine alias of $0.3\pi$ is $2\pi-0.3\pi = 1.7\pi$, since $\cos(1.7\pi n)=\cos(2\pi n-0.3\pi n)=\cos(0.3\pi n)$

> [!success]- Answer
> **$\cos(2.7\pi n)=\cos(0.7\pi n)$, which is *not* $\cos(0.3\pi n)$; the aliased partner of $0.3\pi$ is $1.7\pi$.**

> [!warning] Trap
> Assuming $2.7\pi$ folds onto $0.3\pi$ because the two look like mirror images. The difference $2.4\pi$ is not a multiple of $2\pi$; the alias of $\Omega$ is $2\pi-\Omega$, i.e. $1.7\pi$.

## Traps & Exam Notes

- **Assuming all DT sinusoids are periodic.** Periodicity needs $\Omega/2\pi$ rational; $\cos(3n)$ and $\cos(n)$ never repeat.
- **Reporting a non-integer DT period.** $N$ is a sample count; $2\pi/\Omega = 20/3$ is not a period until multiplied by the right integer.
- **Adding periods instead of taking the LCM.** For a sum of sinusoids the fundamental period is the LCM of the component periods, defined only when the frequencies are commensurate.
- **Confusing $\omega$ with $\Omega$.** $\omega$ is rad/s and unbounded; $\Omega$ is rad/sample and unique only modulo $2\pi$. Mixing them is the root of every aliasing error.
- **Sign errors on the shift.** $x(t+2)$ moves the waveform *left*; $x(t-2)$ moves it right.
- **Applying the shift before the scale.** For $x(2t-4)$, factor as $x(2(t-2))$: compress by 2, then delay by 2 — not delay by 4.
- **Using a signed scale factor for the period.** Period becomes $T/\lvert a\rvert$; the sign only reverses the waveform.
- **Calling $t\,u(t)$ bounded.** It grows without limit; boundedness requires a finite bound for all time.

## See Also

- [[02_Energy,_Power,_Even_and_Odd]]
- [[03_System_Properties_and_LTI]]
- [[11_Fourier_Series_Trigonometric_and_Exponential]]

---

⬅ *start* · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Energy,_Power,_Even_and_Odd|02 ➡]]
