---
id: MATH-07-02
title: "Energy, Power, Even and Odd"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Signal_Classification_and_Operations]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Energy, Power, Even and Odd

> [!abstract] Scope
> Decide whether a signal carries finite energy or finite average power, and split any signal into its even and odd parts.

## Core Concept

> [!tip] Intuition
> Energy asks 'how much total stuff is there'; power asks 'how much stuff per unit time, forever'. A pulse has finite energy and zero average power; a sinusoid has infinite energy but finite average power; a ramp has neither.

**The two definitions.** Energy is:
$$E=\displaystyle\int_{-\infty}^{\infty}\lvert x(t)\rvert^2dt$$
(CT) or $\sum_n\lvert x[n]\rvert^2$ (DT). Average power is:
$$P=\lim_{T\to\infty}\dfrac{1}{2T}\displaystyle\int_{-T}^{T}\lvert x\rvert^2dt$$
(CT); in discrete time:
$$\lim_{N\to\infty}\dfrac{1}{2N+1}\sum_{-N}^{N}\lvert x[n]\rvert^2$$
(DT). **Energy signals** have $0<E<\infty$ (and then $P=0$); **power signals** have $0<P<\infty$ (and then $E=\infty$). A signal cannot be both unless it is identically zero, and a signal such as $tu(t)$ or $e^{t}u(t)$ is neither.

**Why the classification matters.** Every transform tool has a domain. Finite-energy signals have Fourier transforms in the ordinary sense; periodic signals need the power-based Fourier *series* (or impulses in the transform); growing signals need Laplace or $z$ with an explicit region of convergence. Choosing the wrong class is choosing the wrong tool.

**Average power of a sinusoid.** For $x(t)=A\cos(\omega_0t+\theta)$, $P=\dfrac{A^2}{2}$ regardless of frequency and phase, because the mean of $\cos^2$ is $1/2$. For a sum of sinusoids at distinct nonzero frequencies the cross terms average to zero, so the powers add: $P=\sum A_i^2/2$. The same holds in DT for distinct frequencies, with the caveat that distinct DT frequencies must not be aliases of one another.

**Even and odd parts.** Every signal splits uniquely:
$$x_e(t)=\dfrac{x(t)+x(-t)}{2}$$
and $x_o(t)=\dfrac{x(t)-x(-t)}{2}$, with $x=x_e+x_o$. The decomposition is only meaningful over a symmetric domain, so for a causal signal you must write the mirrored half explicitly: $x(t)=e^{-t}u(t)$ has mirror $e^{t}u(-t)$. Products follow sign rules: even$\times$even and odd$\times$odd are even, even$\times$odd is odd. The practical payoff is that the integral of an odd function over symmetric limits is exactly zero, which kills half the terms in Fourier and convolution problems.

**Useful standard results.** $e^{-at}u(t)$ has $E=1/(2a)$ for $a>0$. $a^{n}u[n]$ has $E=1/(1-\lvert a\rvert^2)$ for $\lvert a\rvert<1$. The unit step is a power signal with $P=1/2$ and $E=\infty$. A rectangular pulse of height $A$ and width $W$ has $E=A^2W$ and $P=0$. A constant $A$ over all time has $P=A^2$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Energy (CT) | $E = \int_{-\infty}^{\infty} \lvert x(t) \rvert^2 dt$ | Use the magnitude for complex signals: \|x\|^2 = x x*. |
| Power (CT) | $P = \lim_{T\to\infty} \frac{1}{2T}\int_{-T}^{T} \lvert x(t) \rvert^2 dt$ | Averaged over the symmetric window from -T to T. |
| Energy (DT) | $E = \sum_{n=-\infty}^{\infty} \lvert x[n] \rvert^2$ | Absolute square, summed over all integers. |
| Power (DT) | $P = \lim_{N\to\infty} \frac{1}{2N+1}\sum_{n=-N}^{N} \lvert x[n] \rvert^2$ | The normalisation is 2N+1 samples, not N. |
| Even part | $x_e(t) = \frac{x(t)+x(-t)}{2}$ | For a causal signal write the mirrored half with u(-t) explicitly. |
| Odd part | $x_o(t) = \frac{x(t)-x(-t)}{2}$ | x = xe + xo, and the split is unique. |
| Parity of products | $\mathrm{even}\times\mathrm{odd} = \mathrm{odd},\ \mathrm{odd}\times\mathrm{odd} = \mathrm{even}$ | An odd integrand over symmetric limits integrates to zero. |
| Sinusoid power | $P = \frac{A^2}{2}$ | Independent of frequency and phase; the mean of cos^2 is 1/2. |
| Exponential energy | $E = \frac{1}{2a}\ \mathrm{for}\ e^{-at}u(t),\ a>0$ | Because the integrand is e^{-2at}. |
| Geometric energy | $E = \frac{1}{1-\lvert a \rvert^2}\ \mathrm{for}\ a^n u[n]$ | Converges only when \|a\| < 1; otherwise E = infinity. |
| Unit step | $P = \frac{1}{2},\ E = \infty$ | A power signal, not an energy signal, despite being bounded. |

## Worked Problems

### P1. Classify $x(t)=5\cos(10t)$ as an energy or power signal and compute the relevant quantity.

**Given:** x(t) = 5 cos(10t)

**Solution:**

1. This is a sinusoid of amplitude $A=5$, so it never decays
2. Average power: $P = A^2/2 = 25/2 = 12.5\ \mathrm{W}$
3. Energy: $\int_{-\infty}^{\infty}25\cos^2(10t)\,dt$ diverges, so $E=\infty$
4. A finite, non-zero $P$ with infinite $E$ means it is a power signal

> [!success]- Answer
> **Power signal with $P = 12.5\ \mathrm{W}$ (energy is infinite).**

> [!warning] Trap
> Computing $E$ over one period and reporting that as the total energy. A periodic signal's energy over one period is finite, but the total energy over all time diverges — that is exactly why power is the right measure.

### P2. Find the total energy and average power of $x(t)=e^{-2t}u(t)$.

**Given:** x(t) = e^{-2t}u(t)

**Solution:**

1. $E = \int_0^{\infty}e^{-4t}dt$ (the square doubles the exponent)
2. $E = \left[-\dfrac{e^{-4t}}{4}\right]_0^{\infty} = 0 + \dfrac{1}{4} = 0.25$
3. Energy is finite, so $P = 0$
4. Cross-check with $E = 1/(2a)$ with $a=2$: $1/4$ ✓

> [!success]- Answer
> **$E = 0.25\ \mathrm{J}$, $P = 0$ — an energy signal.**

> [!warning] Trap
> Integrating $e^{-2t}$ instead of $e^{-4t}$ and reporting $E = 1/2$. The energy integrand is $\lvert x\rvert^2$, so the decay rate doubles.

### P3. Find the total energy of $x[n]=\left(\dfrac{1}{2}\right)^n u[n]$.

**Given:** x[n] = (1/2)^n u[n]

**Solution:**

1. $E = \sum_{n=0}^{\infty}\left(\dfrac{1}{4}\right)^n$
2. Geometric series with ratio $1/4 < 1$
3. $E = \dfrac{1}{1-1/4} = \dfrac{4}{3}$
4. $E \approx 1.333$; finite, so $P = 0$

> [!success]- Answer
> **$E = 4/3 \approx 1.333$; it is an energy signal.**

> [!warning] Trap
> Using the ratio $1/2$ instead of $1/4$ and getting $E=2$. Squaring the signal squares the ratio; the energy sum uses $\lvert a\rvert^2$.

### P4. Split $x(t)=e^{-t}u(t)$ into its even and odd parts.

**Given:** x(t) = e^{-t}u(t)

**Solution:**

1. The mirror is $x(-t) = e^{t}u(-t)$ (valid for $t<0$)
2. $x_e(t) = \dfrac{e^{-t}u(t)+e^{t}u(-t)}{2}$
3. For $t>0$: $x_e = \tfrac12 e^{-t}$; for $t<0$: $x_e = \tfrac12 e^{t}$; so $x_e(t) = \tfrac12 e^{-\lvert t\rvert}$
4. $x_o(t) = \dfrac{e^{-t}u(t)-e^{t}u(-t)}{2} = \tfrac12\mathrm{sgn}(t)e^{-\lvert t\rvert}$
5. Check: $x_e+x_o = e^{-\lvert t\rvert}$ for $t>0$, which equals $e^{-t}$ ✓

> [!success]- Answer
> **$x_e(t)=\tfrac12 e^{-\lvert t\rvert}$ and $x_o(t)=\tfrac12\mathrm{sgn}(t)e^{-\lvert t\rvert}$.**

> [!warning] Trap
> Writing $x(-t)=e^{t}$ for all $t$ and losing the $u(-t)$. The mirrored signal is only nonzero for negative time; dropping the step builds a divergent even part.

### P5. Classify the unit step $x(t)=u(t)$: find its energy and its average power.

**Given:** x(t) = u(t)

**Solution:**

1. $E = \int_0^{\infty}1\,dt = \infty$
2. $P = \lim_{T\to\infty}\dfrac{1}{2T}\displaystyle\int_{-T}^{T}u(t)\,dt = \lim_{T\to\infty}\dfrac{1}{2T}(T) = \dfrac12$
3. Finite non-zero power with infinite energy: a power signal

> [!success]- Answer
> **$E = \infty$, $P = 1/2$ — a power signal.**

> [!warning] Trap
> Calling $u(t)$ an energy signal because it is bounded (and eventually constant, so its 'energy' looks small). Boundedness does not imply finite energy; a constant has infinite energy and finite power.

## Traps & Exam Notes

- **Squaring only the amplitude, not the signal.** Energy uses $\lvert x\rvert^2$; every exponential decay rate and geometric ratio doubles under squaring.
- **Computing energy over one period for a periodic signal.** That number is finite and meaningless as a total; use average power instead.
- **Calling a bounded signal an energy signal.** $u(t)$ has $E=\infty$ and $P=1/2$.
- **Normalising the DT power by $N$ instead of $2N+1$.** The average is over the full window of $2N+1$ samples.
- **Forgetting the step in the mirrored signal.** The even/odd split of a causal signal needs $x(-t)=e^{t}u(-t)$, not $e^{t}$.
- **Assuming a signal must be either an energy or a power signal.** $tu(t)$ and $e^{t}u(t)$ are neither; the two categories do not exhaust the possibilities.
- **Using $\lvert x\rvert^2=x^2$ for a complex signal.** Use $x x^{*}$; for $e^{j\omega t}$ this gives 1, hence $P=1$.
- **Adding powers of correlated components.** $P=\sum A_i^2/2$ requires distinct frequencies so the cross terms average to zero; two identical sinusoids add coherently, giving $(2A)^2/2 = 2A^2$, not $A^2$.

## See Also

- [[01_Signal_Classification_and_Operations]]
- [[03_System_Properties_and_LTI]]
- [[11_CT_Fourier_and_Laplace_as_System_Tools]]

---

[[01_Signal_Classification_and_Operations|⬅ 01]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[03_System_Properties_and_LTI|03 ➡]]
