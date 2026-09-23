---
id: MATH-07-11
title: "CT Fourier and Laplace as System Tools"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Laplace_Transform_Pairs]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — CT Fourier and Laplace as System Tools

> [!abstract] Scope
> Use Laplace for transients and stability, Fourier for the steady-state sinusoidal response, and know exactly when each transform exists.

## Core Concept

> [!tip] Intuition
> Laplace evaluates the system along a vertical line in the $s$-plane that you are free to choose; Fourier is the special case where that line is the imaginary axis. If the system is stable the axis is inside the region of convergence and the frequency response is just $H(j\omega)$.

**Two tools, one object.** $H(s)=C(sI-A)^{-1}B+D$ or $Y(s)/X(s)$ describes the system for *all* complex $s$ in its ROC, including the transient behaviour and the stability information carried by the pole locations. The Fourier transform is the restriction to the imaginary axis, $H(j\omega)=H(s)\big\rvert_{s=j\omega}$, and describes only the steady-state sinusoidal response. The restriction is legitimate **iff the ROC includes the $j\omega$ axis**, which for a causal system means all poles strictly in the left half plane.

**Steady-state sinusoidal response.** An LTI system driven by $x(t)=A\cos(\omega_0t)$ settles into this steady state:
$$y_{ss}(t)=A\lvert H(j\omega_0)\rvert\cos\left(\omega_0t+\angle H(j\omega_0)\right)$$
— same frequency, amplitude scaled by the magnitude, phase shifted by the angle. Evaluate at the *input* frequency, and evaluate a complex number properly: a factor $\dfrac{1}{a+jb}$ has magnitude $\dfrac{1}{\sqrt{a^2+b^2}}$ and phase $-\arctan(b/a)$.

**What Laplace adds that Fourier cannot.** Initial conditions.
$$\mathcal{L}\{y'\}=sY(s)-y(0)$$
and $\mathcal{L}\{y''\}=s^2Y(s)-sy(0)-y'(0)$ carry the state into the algebra, so the full response (zero-input plus zero-state) comes out of one partial-fraction inversion. Dropping those terms silently computes the zero-state response only. Fourier has no comparable facility — it assumes the transform exists and the system is at rest.

**Distortionless transmission.** A system passes a signal without distortion iff $H(j\omega)=Ke^{-j\omega t_d}$: constant magnitude $K$ (no amplitude distortion) and linear phase $-\omega t_d$ (no phase distortion, since linear phase is exactly a pure delay). Any frequency-dependent magnitude or non-linear phase reshapes a broadband input even if each individual sinusoid passes through unchanged. An ideal low-pass filter is distortionless inside its passband and infinitely attenuating outside it — and it is non-causal, which is why real filters approximate it.

**Energy bookkeeping.** Parseval's relation is:
$$\displaystyle\int_{-\infty}^{\infty}\lvert x(t)\rvert^2dt=\dfrac{1}{2\pi}\int_{-\infty}^{\infty}\lvert X(j\omega)\rvert^2d\omega$$
ends in a check that an energy computed in one domain agrees with the other. For a first-order low-pass with $H(s)=\dfrac{1}{1+\tau s}$, the $-3$ dB bandwidth is $\omega_c=1/\tau$ and the impulse response energy is:
$$\int_0^\infty e^{-2t/\tau}dt/\tau^2 = 1/(2\tau)$$

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Frequency response | $H(j\omega) = H(s)\big\rvert_{s=j\omega}$ | Valid only if the ROC of H(s) includes the j-omega axis (stable system). |
| Sinusoidal steady state | $y_{ss}(t) = A\lvert H(j\omega_0) \rvert \cos\left(\omega_0 t + \angle H(j\omega_0)\right)$ | Same frequency as the input; evaluate at omega_0, the input frequency. |
| First-order lag magnitude and phase | $\lvert H \rvert = \frac{1}{\sqrt{1+\omega^2\tau^2}},\quad \angle H = -\arctan(\omega\tau)$ | For H = 1/(1+j omega tau). |
| Complex reciprocal | $\frac{1}{a+jb} = \frac{a-jb}{a^2+b^2}$ | Magnitude 1/sqrt(a^2+b^2), phase -arctan(b/a). |
| Laplace of derivatives | $\mathcal{L}\{y'\} = sY(s)-y(0),\quad \mathcal{L}\{y''\} = s^2Y(s)-sy(0)-y'(0)$ | Omitting the initial-condition terms gives the zero-state response only. |
| Distortionless transmission | $H(j\omega) = K e^{-j\omega t_d}$ | Constant magnitude, linear phase; the output is K x(t - t_d). |
| 3 dB bandwidth, first order | $\omega_c = 1/\tau$ | Frequency at which the magnitude falls to 0.707 (-3 dB). |
| Parseval (CT) | $\int_{-\infty}^{\infty} \lvert x(t) \rvert^2 dt = \frac{1}{2\pi}\int_{-\infty}^{\infty} \lvert X(j\omega) \rvert^2 d\omega$ | Energy computed in either domain must agree. |
| Existence of the Fourier transform | $\mathrm{ROC}\ \mathrm{includes}\ \mathrm{Re}\{s\}=0$ | For a causal system: all poles strictly in the left half plane. |
| Impulse response energy, first order | $E = \frac{1}{2\tau}\ \mathrm{for}\ H(s)=\frac{1}{1+\tau s}$ | From h(t) = (1/tau)e^{-t/tau}u(t). |

## Worked Problems

### P1. A system has $H(s)=\dfrac{10}{s+2}$. Find the steady-state response to $x(t)=3\cos(4t)$.

**Given:** H(s) = 10/(s+2); x(t) = 3 cos(4t)

**Solution:**

1. Pole at $s=-2$ is in the left half plane, so the Fourier transform exists and the steady state is meaningful
2. $H(j4) = \dfrac{10}{2+j4}$
3. Rationalise: $\dfrac{10(2-j4)}{(2)^2+(4)^2} = \dfrac{20-j40}{20} = 1-j2$
4. $\lvert H(j4)\rvert = \sqrt{1+4} = \sqrt5 = 2.236$
5. $\angle H(j4) = -\arctan(40/20) = -\arctan2 = -63.43^\circ$
6. Amplitude out: $3(2.236) = 6.708$; so $y_{ss}(t)=6.708\cos(4t-63.43^\circ)$

> [!success]- Answer
> **$y_{ss}(t)=6.708\cos(4t-63.43^\circ)$.**

> [!warning] Trap
> Evaluating $H$ at the pole frequency or at the natural frequency $-2$ instead of the input frequency 4 rad/s. The frequency response is always evaluated at the frequency of the driving sinusoid.

### P2. $H(s)=\dfrac{1}{s-1}$. Does the system have a Fourier transform? Explain, and compare with $H(s)=\dfrac{1}{s+1}$.

**Given:** H1(s) = 1/(s-1); H2(s) = 1/(s+1)

**Solution:**

1. $H_1$ has a pole at $s=+1$; the causal ROC is $\mathrm{Re}\{s\}>1$
2. The $j\omega$ axis ($\mathrm{Re}\{s\}=0$) does not lie in that ROC
3. So $H_1$ has no Fourier transform; setting $s=j\omega$ gives $1/(j\omega-1)$, which corresponds to $h(t)=e^{t}u(t)$, an unbounded impulse response
4. $H_2$ has a pole at $s=-1$ with causal ROC $\mathrm{Re}\{s\}>-1$, which contains the $j\omega$ axis
5. So $H_2(j\omega)=\dfrac{1}{1+j\omega}$ is a valid frequency response, and the system is BIBO stable

> [!success]- Answer
> **$H_1$ has no Fourier transform (unstable, pole in the right half plane); $H_2$ does, with $H_2(j\omega)=\dfrac{1}{1+j\omega}$.**

> [!warning] Trap
> Substituting $s=j\omega$ mechanically into any transfer function. That substitution is only legal when the ROC contains the imaginary axis; for an unstable system it produces a formula for a frequency response that does not exist.

### P3. A first-order low-pass is $H(s)=\dfrac{1}{1+0.05s}$. Find its time constant, its $-3$ dB bandwidth, and the magnitude and phase at the bandwidth frequency.

**Given:** H(s) = 1/(1+0.05s)

**Solution:**

1. Standard form: $\tau = 0.05\ \mathrm{s}$
2. $\omega_c = 1/\tau = 20\ \mathrm{rad/s}$
3. At $\omega=20$: $\omega\tau = 1$, so $\lvert H\rvert = \dfrac{1}{\sqrt{1+1}} = 0.7071$
4. In dB: $20\log_{10}0.7071 = -3.01\ \mathrm{dB}$
5. $\angle H = -\arctan(1) = -45^\circ$

> [!success]- Answer
> **$\tau=0.05\ \mathrm{s}$, $\omega_c=20\ \mathrm{rad/s}$; at $\omega_c$, $\lvert H\rvert = 0.707$ ($-3$ dB) and $\angle H = -45^\circ$.**

> [!warning] Trap
> Calling $\omega_c = \tau = 0.05$ the bandwidth. The bandwidth is $1/\tau$, and the $-45^\circ$ phase point is always exactly at the $-3$ dB frequency for a first-order lag — a useful check.

### P4. A channel has $H(j\omega)=5e^{-j0.002\omega}$. If $x(t)$ is a broadband signal, what is the output, and is the transmission distortionless?

**Given:** H(jw) = 5 exp(-j 0.002 w)

**Solution:**

1. Magnitude: $\lvert H\rvert = 5$ for every $\omega$ — no amplitude distortion
2. Phase: $\angle H = -0.002\omega$, which is linear in $\omega$ (zero phase intercept)
3. A linear phase with slope $-t_d$ is a pure delay: $y(t) = 5\,x(t-0.002)$
4. Both distortionless conditions hold (constant magnitude, linear phase)
5. The delay is 0.002 s = 2 ms and the gain is 5

> [!success]- Answer
> **$y(t)=5x(t-0.002)$: distortionless, with gain 5 and a 2 ms delay.**

> [!warning] Trap
> Treating any phase shift as distortion. A linear phase is exactly a delay and preserves the waveform; only curvature in the phase (or variation in the magnitude) reshapes a broadband signal.

### P5. Solve $y''+3y'+2y=0$ with $y(0)=1$, $y'(0)=0$ using Laplace, and verify both initial conditions.

**Given:** y'' + 3y' + 2y = 0; y(0) = 1; y'(0) = 0

**Solution:**

1. $\mathcal{L}\{y''\}=s^2Y-s(1)-0$ and $\mathcal{L}\{y'\}=sY-1$
2. $(s^2Y-s)+3(sY-1)+2Y = 0$
3. $Y(s^2+3s+2) = s+3$
4. $Y = \dfrac{s+3}{(s+1)(s+2)} = \dfrac{2}{s+1}-\dfrac{1}{s+2}$
5. $y(t)=\left(2e^{-t}-e^{-2t}\right)u(t)$
6. Check $y(0)=2-1=1$ ✓; $y'(t)=-2e^{-t}+2e^{-2t}$, so $y'(0)=-2+2=0$ ✓

> [!success]- Answer
> **$y(t)=\left(2e^{-t}-e^{-2t}\right)u(t)$.**

> [!warning] Trap
> Transforming $y''$ as $s^2Y$ and $y'$ as $sY$, which silently sets both initial conditions to zero and gives $Y=0$. The initial-condition terms are the whole content of the problem.

## Traps & Exam Notes

- **Setting $s=j\omega$ for an unstable system.** The substitution requires the ROC to contain the $j\omega$ axis; otherwise the frequency response does not exist and the resulting formula is meaningless.
- **Evaluating $H(j\omega)$ at the wrong frequency.** Use the frequency of the input sinusoid, not the pole location or the natural frequency.
- **Forgetting the initial-condition terms in the Laplace of derivatives.** $\mathcal{L}\{y'\}=sY-y(0)$; dropping it computes only the zero-state response.
- **Treating any phase shift as distortion.** Linear phase is a pure delay; only nonlinear phase or frequency-dependent magnitude distorts a broadband signal.
- **Confusing the time constant with the bandwidth.** For a first-order lag, $\tau$ is in seconds and $\omega_c=1/\tau$ in rad/s; at $\omega_c$ the phase is $-45^\circ$ and the gain is $-3$ dB.
- **Assuming steady state exists immediately after a switch.** The transient must decay first; the sinusoidal steady-state formula requires an asymptotically stable system.
- **Using Fourier to carry initial conditions.** Fourier has no initial-condition terms; that is what Laplace is for.
- **Reading $\lvert H\rvert$ as a power ratio.** Magnitude ratios are voltage-like quantities: dB is $20\log\lvert H\rvert$, not $10\log\lvert H\rvert$.

## See Also

- [[04_Continuous-Time_Convolution]]
- [[03_System_Properties_and_LTI]]
- [[10_Bode_Plots_and_Margins]]

---

[[10_System_Response_and_Step_Response|⬅ 10]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
