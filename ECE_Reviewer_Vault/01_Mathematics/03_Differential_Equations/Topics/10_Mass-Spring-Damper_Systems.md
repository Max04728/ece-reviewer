---
id: MATH-03-10
title: "Mass-Spring-Damper Systems"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_Variation_of_Parameters]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Mass-Spring-Damper Systems

> [!abstract] Scope
> Model a mass on a spring with viscous damping as a second-order ODE, classify the damping case, and solve the free and driven responses.

## Core Concept

> [!tip] Intuition
> Three competing effects act on one mass: inertia (mass) wants to keep moving, the spring pulls it back toward equilibrium, and the dashpot removes energy in proportion to speed. Whichever of the last two wins decides whether the mass oscillates, crawls back, or returns as fast as possible without overshooting.

**The model.** A mass $m$ attached to a spring of stiffness $k$ with a viscous damper of coefficient $c$, driven by an external force $F(t)$, obeys $m\ddot{x}+c\dot{x}+kx = F(t)$, where $x$ is displacement from the equilibrium position. The equation is linear with constant coefficients, so the solution is $x = x_h + x_p$: the transient $x_h$ (the source-free motion, fixed by the initial displacement and velocity) plus the steady-state $x_p$ (forced by $F(t)$).

**Reading the auxiliary equation as a physical classification.** From $mr^2+cr+k=0$, the discriminant $c^2-4mk$ decides everything. Define the natural frequency $\omega_n = \sqrt{k/m}$ and the damping ratio $\zeta = c/(2\sqrt{mk})$. Then $\zeta>1$ (equivalently $c>2\sqrt{mk}=c_c$) is **overdamped**: two distinct real negative roots, no oscillation, a slow creeping return. $\zeta = 1$ is **critically damped**: a repeated root, the fastest non-oscillatory return, and the design target for door closers and meter movements. $0<\zeta<1$ is **underdamped**: complex roots $-\zeta\omega_n \pm i\omega_d$, an exponentially decaying oscillation at the damped frequency $\omega_d = \omega_n\sqrt{1-\zeta^2}$, which is always slightly *below* $\omega_n$. Only the undamped case $\zeta=0$ oscillates forever at exactly $\omega_n$.

**Why the damping ratio is the right parameter.** Dividing the ODE by $m$ gives the standard form:
$$\ddot{x}+2\zeta\omega_n\dot{x}+\omega_n^2 x = F/m$$
A system's qualitative behaviour therefore depends on the single dimensionless number $\zeta$ and the time scale $1/\omega_n$, not on $m$, $c$, $k$ individually — which is why exam problems state three numbers but ask one behavioural question.

**The driven response.** For $F(t) = F_0\cos\omega t$ the steady state is $x_p = X\cos(\omega t-\phi)$, whose amplitude is:
$$X = F_0/\sqrt{(k-m\omega^2)^2+(c\omega)^2}$$
with a phase set by $\tan\phi = c\omega/(k-m\omega^2)$. The $c\omega$ term is what keeps the amplitude finite: at $\omega=\omega_n$ the denominator is $c\omega$, not zero, so an underdamped system resonates at a large but finite amplitude. The displacement peak actually occurs at $\omega_r = \omega_n\sqrt{1-2\zeta^2}$, below $\omega_n$, and no peak exists at all for $\zeta\ge 1/\sqrt{2}\approx0.707$. Infinite amplitude requires $c=0$.

**Where the method fails.** The linear model assumes a linear spring, linear (viscous) damping and constant coefficients. Real suspensions have Coulomb friction (constant-magnitude damping, which is nonlinear and produces a linearly shrinking amplitude envelope) or quadratic drag, and a spring pulled far enough becomes nonlinear. The method also gives no answer unless the initial conditions or the complete forcing are specified: a second-order ODE needs two conditions, and a statement like 'the mass is displaced and released' must be translated into $x(0)$ and $\dot{x}(0)$ before any constant can be evaluated.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Equation of motion | $m\ddot{x} + c\dot{x} + kx = F(t)$ | SI: m in kg, c in N.s/m, k in N/m, F in N, x in m. Convert grams, N/mm and mm before substituting. |
| Natural frequency | $\omega_n = \sqrt{\frac{k}{m}}$ | Radians per second, not hertz. Divide by 2*pi for Hz. |
| Critical damping | $c_c = 2\sqrt{mk} = 2m\omega_n$ | The factor 2 is not optional: comparing c against sqrt(mk) misclassifies every borderline case. |
| Damping ratio | $\zeta = \frac{c}{2\sqrt{mk}} = \frac{c}{2m\omega_n}$ | Dimensionless. zeta > 1 overdamped, zeta = 1 critical, 0 < zeta < 1 underdamped. |
| Characteristic roots | $r = \frac{-c \pm \sqrt{c^2-4mk}}{2m}$ | The discriminant c^2 - 4mk decides the case; roots always lie in the left half-plane for positive m, c, k. |
| Damped frequency | $\omega_d = \omega_n\sqrt{1-\zeta^2}$ | Always below omega_n. Undefined (not imaginary) for zeta >= 1, which is the non-oscillatory regime. |
| Underdamped solution | $x(t) = e^{-\zeta\omega_n t}\left(c_1\cos\omega_d t + c_2\sin\omega_d t\right)$ | Use with initial conditions on x and x-dot; the exponential is the envelope, the bracket is the oscillation. |
| Amplitude-phase form | $x(t) = A e^{-\zeta\omega_n t}\cos(\omega_d t - \phi)$ | A = sqrt(c1^2 + c2^2) and tan(phi) = c2/c1; the phase must be in the quadrant of (c1, c2). |
| Steady-state amplitude | $X = \frac{F_0}{\sqrt{(k-m\omega^2)^2 + (c\omega)^2}}$ | Driven by F_0 cos(omega t). Note c*omega, not c alone; use the magnitude of k - m*omega^2, never m*omega^2 - k. |
| Steady-state phase | $\tan\phi = \frac{c\omega}{k-m\omega^2}$ | At resonance the denominator is zero and phi = 90 degrees exactly. |
| Resonant frequency | $\omega_r = \omega_n\sqrt{1-2\zeta^2}$ | Peak displacement amplitude, valid only for zeta < 0.707; it is not omega_n. |
| Logarithmic decrement | $\delta = \ln\frac{x(t)}{x(t+T_d)} = \frac{2\pi\zeta}{\sqrt{1-\zeta^2}}$ | T_d = 2*pi/omega_d. Used to measure zeta from a recorded decay. |

## Interactive Widget

**Damped Oscillator Regimes**

![[Damped_Oscillator_Regimes.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A 2 kg mass is attached to a spring with $k = 6$ N/m and a damper with $c = 8$ N·s/m. It is displaced 0.1 m and released from rest. Classify the motion and find $x(t)$.

**Given:** $m = 2$ kg; $c = 8$ N·s/m; $k = 6$ N/m; $x(0) = 0.1$ m; $\dot{x}(0) = 0$

**Solution:**

1. Equation of motion: $2x''+8x'+6x=0$, divided by 2: $x''+4x'+3x=0$
2. Critical damping: $c_c=2\sqrt{mk}=2\sqrt{12}=6.93$ N·s/m; since $c=8>6.93$ the system is overdamped
3. Auxiliary equation: $r^2+4r+3=(r+1)(r+3)=0\Rightarrow r=-1,\,-3$
4. General solution: $x=c_1e^{-t}+c_2e^{-3t}$
5. Apply $x(0)=0.1$: $c_1+c_2=0.1$
6. Apply $x'(0)=0$ with $x'=-c_1e^{-t}-3c_2e^{-3t}$: $-c_1-3c_2=0\Rightarrow c_1=-3c_2$
7. Substitute: $-3c_2+c_2=0.1\Rightarrow c_2=-0.05$, so $c_1=0.15$
8. The displacement never changes sign: $x(t)=0.15e^{-t}-0.05e^{-3t}>0$ for all $t>0$, confirming no oscillation

> [!success]- Answer
> **$x(t) = 0.15e^{-t} - 0.05e^{-3t}$ m, overdamped ($\zeta = 1.15$)**

> [!warning] Trap
> Comparing $c$ to $\sqrt{mk} = 3.46$ instead of $c_c = 2\sqrt{mk} = 6.93$ and declaring the system underdamped. The factor 2 in $c_c$ decides this problem.

### P2. A 1 kg mass on a spring ($k = 10$ N/m) with $c = 2$ N·s/m is released from $x(0) = 0.05$ m with zero velocity. Find $x(t)$ and the damped frequency.

**Given:** $m = 1$ kg; $c = 2$ N·s/m; $k = 10$ N/m; $x(0) = 0.05$ m; $\dot{x}(0) = 0$

**Solution:**

1. Auxiliary equation: $r^2+2r+10=0\Rightarrow r=(-2\pm\sqrt{4-40})/2=-1\pm 3i$
2. Complex roots mean underdamped, with decay rate $\alpha=\zeta\omega_n=1$ Np/s and $\omega_d=3$ rad/s
3. Check: $\omega_n=\sqrt{k/m}=\sqrt{10}=3.162$ rad/s, $\zeta=2/(2\sqrt{10})=0.316$, $\omega_d=\sqrt{10-1}=3$ rad/s
4. Solution form: $x=e^{-t}(c_1\cos 3t+c_2\sin 3t)$
5. Apply $x(0)=0.05$: $c_1=0.05$
6. Differentiate: $x'=e^{-t}\left[(-c_1+3c_2)\cos 3t+(-3c_1-c_2)\sin 3t\right]$
7. Apply $x'(0)=0$: $-c_1+3c_2=0\Rightarrow c_2=c_1/3=0.01667$
8. Convert to amplitude-phase: $A=\sqrt{0.05^2+0.01667^2}=0.0527$ m and $\phi=\arctan(1/3)=18.43^\circ$

> [!success]- Answer
> **$x(t) = e^{-t}(0.05\cos 3t + 0.0167\sin 3t) = 0.0527\,e^{-t}\cos(3t - 18.43^\circ)$ m; $\omega_d = 3$ rad/s, $\zeta \approx 0.316$**

> [!warning] Trap
> Setting $c_2 = 0$ because the mass is 'released from rest'. Zero initial velocity constrains the *derivative*, and the derivative of $e^{-t}\cos 3t$ is not zero at $t=0$ — dropping $c_2$ leaves $x'(0) = -c_1 = -0.05$ m/s, not zero. Also $\omega_d = 3$, not $\omega_n = 3.162$.

### P3. For a 4 kg mass on a $k = 100$ N/m spring, find the damping coefficient that gives critical damping, and solve for $x(0) = 0.02$ m, $x'(0) = 0$.

**Given:** $m = 4$ kg; $k = 100$ N/m; critical damping; $x(0) = 0.02$ m; $\dot{x}(0) = 0$

**Solution:**

1. Critical damping requires $c=c_c=2\sqrt{mk}=2\sqrt{400}=40$ N·s/m
2. Then $\omega_n=\sqrt{k/m}=\sqrt{25}=5$ rad/s and the root is repeated: $r=-c/(2m)=-40/8=-5$
3. Critically damped solution: $x=(c_1+c_2t)e^{-5t}$
4. Apply $x(0)=0.02$: $c_1=0.02$
5. Differentiate: $x'=(c_2-5c_1-5c_2t)e^{-5t}$
6. Apply $x'(0)=0$: $c_2-5(0.02)=0\Rightarrow c_2=0.1$
7. Check: $x(0)=0.02$ m and $x'(0)=0.1-0.1=0$, and $x$ does not change sign

> [!success]- Answer
> **$c = c_c = 40$ N·s/m, and $x(t) = (0.02 + 0.1t)e^{-5t}$ m**

> [!warning] Trap
> Writing the critically damped solution as $c_1e^{-5t}+c_2e^{-5t}$, which is just one arbitrary constant and cannot satisfy two initial conditions. A repeated root requires the $t e^{rt}$ second solution.

### P4. A 1 kg mass with $c = 4$ N·s/m and $k = 25$ N/m is driven by $F(t) = 100\cos 3t$ N. Find the steady-state amplitude and phase, and the damping ratio.

**Given:** $m = 1$ kg; $c = 4$ N·s/m; $k = 25$ N/m; $F(t) = 100\cos 3t$ N

**Solution:**

1. $\omega=3$ rad/s, so $k-m\omega^2=25-9=16$ and $c\omega=12$
2. Denominator: $\sqrt{16^2+12^2}=\sqrt{256+144}=\sqrt{400}=20$
3. Steady-state amplitude: $X=F_0/20=100/20=5$ m
4. Phase: $\tan\phi=c\omega/(k-m\omega^2)=12/16=0.75\Rightarrow\phi=36.87^\circ$
5. Damping ratio: $\omega_n=\sqrt{25/1}=5$ rad/s, $\zeta=c/(2m\omega_n)=4/10=0.4$
6. Damped frequency: $\omega_d=5\sqrt{1-0.16}=4.58$ rad/s, and the transient decays as $e^{-2t}$

> [!success]- Answer
> **$x_p = 5\cos(3t - 36.87^\circ)$ m, with $\zeta = 0.4$ and $\omega_d = 4.58$ rad/s**

> [!warning] Trap
> Using $c = 4$ rather than $c\omega = 12$ in the denominator. At 3 rad/s the dashpot contributes $4(3) = 12$, and ignoring it gives $X = 100/16 = 6.25$ m — 25% too large. Note also that $\omega = 3$ is not the peak frequency $\omega_r = 4.12$ rad/s.

### P5. A 2 kg mass on a $k = 50$ N/m spring is required to have a damping ratio $\zeta = 0.5$. Find the damper coefficient and the frequency of the resulting oscillation.

**Given:** $m = 2$ kg; $k = 50$ N/m; target $\zeta = 0.5$

**Solution:**

1. $\omega_n=\sqrt{k/m}=\sqrt{25}=5$ rad/s
2. $\zeta=c/(2m\omega_n)\Rightarrow c=2\zeta m\omega_n=2(0.5)(2)(5)=10$ N·s/m
3. Check against critical damping: $c_c=2\sqrt{mk}=2\sqrt{100}=20$, and $10/20=0.5$ as required
4. Damped frequency: $\omega_d=\omega_n\sqrt{1-\zeta^2}=5\sqrt{0.75}=4.33$ rad/s
5. Period of oscillation: $T_d=2\pi/\omega_d=6.283/4.33=1.45$ s
6. Decay envelope: $e^{-\zeta\omega_n t}=e^{-2.5t}$, so the time constant is $0.4$ s

> [!success]- Answer
> **$c = 10$ N·s/m, oscillating at $\omega_d = 4.33$ rad/s ($T_d = 1.45$ s)**

> [!warning] Trap
> Computing $c = \zeta\sqrt{mk} = 0.5(10) = 5$ N·s/m by dropping the factor 2. That gives $\zeta = 0.25$, not 0.5, and a visibly different decay envelope.

## Traps & Exam Notes

- **Using $c_c = \sqrt{mk}$.** Critical damping is $2\sqrt{mk} = 2m\omega_n$; the missing factor 2 misclassifies any system within a factor of two of critical, which is most exam problems.
- **Unit mixing.** $k$ in N/mm, $m$ in grams or $c$ in N·s/cm changes $\omega_n$ by factors of $\sqrt{1000}$ or 10. Convert to kg, m and N before computing.
- **Dropping $\omega$ from the damping term.** The steady-state denominator is $(k-m\omega^2)^2+(c\omega)^2$; writing $c$ alone understates the damping at higher driving frequencies and overstates the amplitude.
- **Assuming resonance is at $\omega_n$.** Peak displacement amplitude occurs at $\omega_n\sqrt{1-2\zeta^2}$, and for $\zeta\ge0.707$ there is no peak at all. Driving at $\omega_n$ gives a finite amplitude $F_0/(c\omega_n)$.
- **Forcing $c_2 = 0$ for 'released from rest'.** Rest means $\dot{x}(0)=0$, which is one equation; the displacement condition supplies the other. Both constants are generally nonzero.
- **Writing a single exponential for the critically damped case.** A repeated root gives $(c_1+c_2t)e^{rt}$; $c_1e^{rt}+c_2e^{rt}$ collapses to one constant and cannot meet two initial conditions.
- **Ignoring the transient when asked for the steady state (or vice versa).** The steady-state amplitude $X$ is the amplitude *after* $e^{-\zeta\omega_n t}$ has died; at small $t$ the total response is the sum and can far exceed $X$.

## See Also

- [[09_Variation_of_Parameters]]
- [[08_Undetermined_Coefficients]]
- [[11_RLC_Circuit_Transients]]
- [[05_Second_Order_Specifications]]

---

[[09_Variation_of_Parameters|⬅ 09]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[11_RLC_Circuit_Transients|11 ➡]]
