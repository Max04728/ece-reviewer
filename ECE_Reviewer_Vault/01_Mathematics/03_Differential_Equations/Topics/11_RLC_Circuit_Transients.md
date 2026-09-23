---
id: MATH-03-11
title: "RLC Circuit Transients"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[10_Mass-Spring-Damper_Systems]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — RLC Circuit Transients

> [!abstract] Scope
> Write and solve the transient (natural) response of series and parallel RLC circuits, and classify the damping from the element values.

## Core Concept

> [!tip] Intuition
> An RLC circuit is the electrical twin of a mass-spring-damper: the inductor stores kinetic-like energy in current, the capacitor stores potential-like energy in voltage, and the resistor burns energy away. Swap $m\to L$, $c\to R$, $k\to 1/C$ and every result transfers unchanged.

**The circuit equation.** For a series RLC loop the KVL equation is:
$$L\frac{di}{dt}+Ri+\frac{1}{C}\int i\,dt = v_s(t)$$
Differentiating, or working in capacitor charge $q$ (with $i = dq/dt$), gives the same second-order constant-coefficient ODE:
$$Lq''+Rq'+\frac{1}{C}q = v_s(t)$$
Dividing by $L$ produces the standard form $q''+2\alpha q'+\omega_0^2q = v_s/L$, with $\alpha = R/(2L)$ the neper frequency and $\omega_0 = 1/\sqrt{LC}$ the resonant radian frequency. The characteristic roots are:
$$s = -\alpha \pm \sqrt{\alpha^2-\omega_0^2}$$

**Damping classification.** The circuit is **overdamped** when $\alpha>\omega_0$, that is $R>2\sqrt{L/C}$; **critically damped** when $R = 2\sqrt{L/C}$, exactly one repeated real root and the fastest non-oscillatory settling; **underdamped** when $R<2\sqrt{L/C}$, giving complex roots $-\alpha\pm i\omega_d$ with $\omega_d = \sqrt{\omega_0^2-\alpha^2}$ and a decaying oscillation. In ratio form the series circuit has $\zeta = \frac{R}{2}\sqrt{\frac{C}{L}}$. Note what is *not* in the criterion: neither $R$ nor $C$ alone decides it, only the combination $R$ versus $2\sqrt{L/C}$.

**Parallel is the dual, and its criterion is different.** For a parallel RLC driven by a current source, the characteristic equation is $s^2+\frac{1}{RC}s+\frac{1}{LC} = 0$, so $\alpha = \frac{1}{2RC}$ and $\omega_0 = \frac{1}{\sqrt{LC}}$ as before. Hence a parallel circuit is critically damped at $R = \frac{1}{2}\sqrt{L/C}$ — the reciprocal-shaped criterion. Applying the series rule $R = 2\sqrt{L/C}$ to a parallel circuit misclassifies damping by a factor of four in $R$.

**Why the natural response looks the way it does.** The source-free solution is built exactly like the mechanical one:
$$q_h = A_1e^{s_1t}+A_2e^{s_2t}$$
(overdamped), $q_h = (A_1+A_2t)e^{-\alpha t}$ (critical), or, for the underdamped case:
$$q_h = e^{-\alpha t}(A_1\cos\omega_d t + A_2\sin\omega_d t)$$
The two constants come from the two stored-energy conditions at $t = 0^+$, and those conditions are physical laws, not free choices: capacitor voltage cannot jump, $v_C(0^+) = v_C(0^-)$, so $q(0^+) = q(0^-)$; inductor current cannot jump, $i_L(0^+) = i_L(0^-)$, so $q'(0^+) = i(0^-)$. This is why a switching problem always begins by writing down the pre-switch capacitor voltage and inductor current.

**Source-free versus driven.** The natural response above describes a circuit with no source after $t=0$, where the stored energy decays to zero. If a DC source remains connected, the full solution is $q = q_h+q_p$, and the particular solution comes from the DC steady state: the capacitor behaves as an open circuit and the inductor as a short, so the final current is $v_s/R$ (series) and the final capacitor voltage is $v_s$. The transient then carries the circuit from its initial stored energy to that DC final state. Reading off the final state first is the fastest route to $q_p$ and the most common place to lose marks.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Series RLC equation | $L\frac{di}{dt} + Ri + \frac{1}{C}\int i\,dt = v_s(t)$ | KVL around the series loop. Differentiate once if the forcing is not differentiable, or work in charge q. |
| Charge form | $L q'' + R q' + \frac{1}{C}q = v_s(t)$ | Standard form after dividing by L: q'' + 2*alpha*q' + omega_0^2*q = v_s/L. |
| Neper frequency (series) | $\alpha = \frac{R}{2L}$ | Units Np/s. It is R/(2L), not R/L: the factor 2 comes from dividing through by L. |
| Resonant frequency | $\omega_0 = \frac{1}{\sqrt{LC}}$ | Same for series and parallel. Convert mH and uF before substituting. |
| Characteristic roots | $s = -\alpha \pm \sqrt{\alpha^2-\omega_0^2}$ | Real and distinct, repeated, or complex conjugate depending on alpha versus omega_0. |
| Series critical resistance | $R_{crit} = 2\sqrt{\frac{L}{C}}$ | Not sqrt(L/C). Overdamped for R > R_crit, underdamped for R < R_crit. |
| Parallel neper frequency | $\alpha = \frac{1}{2RC}$ | Parallel RLC. Critical damping at R = (1/2)*sqrt(L/C), the dual of the series case. |
| Damping ratio (series) | $\zeta = \frac{R}{2}\sqrt{\frac{C}{L}}$ | Dimensionless. zeta = 1 at critical damping; zeta < 1 gives an oscillatory transient. |
| Damped frequency | $\omega_d = \sqrt{\omega_0^2-\alpha^2} = \omega_0\sqrt{1-\zeta^2}$ | Defined only for the underdamped case; the oscillation frequency of the transient in rad/s. |
| Underdamped charge response | $q(t) = e^{-\alpha t}\left(A_1\cos\omega_d t + A_2\sin\omega_d t\right)$ | A_1 and A_2 follow from q(0) and i(0); the envelope decays as e^{-alpha t} with time constant 1/alpha. |
| Critical damping response | $q(t) = (A_1 + A_2 t)e^{-\alpha t}$ | Repeated root; the t e^{-alpha t} term is essential to meet both initial conditions. |
| Overdamped response | $q(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}$ | Both roots real and negative; no oscillation and no sign change for a single initial displacement. |
| DC steady state | $i(\infty) = \frac{v_s}{R}, \quad v_C(\infty) = v_s$ | Series circuit with a DC source: inductor is a short, capacitor is an open. Used for the particular solution. |

## Interactive Widget

**RLC Transient Step Response**

![[RLC_Transient_Step_Response.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A series RLC circuit has $L = 1$ H, $C = 0.25$ F and $R = 5\ \Omega$. The capacitor starts uncharged and the initial current is 1 A. Classify the damping and find $q(t)$ and $i(t)$.

**Given:** $L = 1$ H; $C = 0.25$ F; $R = 5\ \Omega$; $q(0) = 0$; $i(0) = 1$ A; source-free for $t>0$

**Solution:**

1. Source-free series RLC in charge form: $q''+(R/L)q'+(1/LC)q=0\Rightarrow q''+5q'+4q=0$
2. Critical resistance: $R_{crit}=2\sqrt{L/C}=2\sqrt{4}=4\ \Omega$; since $R=5>4$ the circuit is overdamped
3. Roots: $s^2+5s+4=(s+1)(s+4)=0\Rightarrow s=-1,\,-4$
4. $q(t)=A_1e^{-t}+A_2e^{-4t}$
5. Apply $q(0)=0$: $A_1+A_2=0\Rightarrow A_1=-A_2$
6. $i(t)=q'(t)=-A_1e^{-t}-4A_2e^{-4t}$; apply $i(0)=1$: $-A_1-4A_2=1$
7. Substitute $A_1=-A_2$: $A_2-4A_2=-3A_2=1\Rightarrow A_2=-1/3$, $A_1=1/3$
8. Check: $q(0)=1/3-1/3=0$ and $i(0)=-1/3+4/3=1$ A
9. Peak charge occurs when $i=0$: $4e^{-4t}=e^{-t}\Rightarrow t=(\ln 4)/3=0.462$ s, giving $q_{max}=0.158$ C

> [!success]- Answer
> **$q(t) = \frac{1}{3}\left(e^{-t}-e^{-4t}\right)$ C, $i(t) = \frac{1}{3}\left(4e^{-4t}-e^{-t}\right)$ A, overdamped**

> [!warning] Trap
> Using $i(0)$ as a condition on $q(0)$ instead of on $q'(0)$, which forces $A_1 = A_2 = 0$. The inductor current is the derivative of the capacitor charge, so an initial current fixes $q'(0)$.

### P2. A series RLC circuit has $L = 1$ H, $C = 0.1$ F and $R = 2\ \Omega$. Initially $q(0) = 0.1$ C with $i(0) = 0$. Find the damped frequency, the damping ratio, and $q(t)$.

**Given:** $L = 1$ H; $C = 0.1$ F; $R = 2\ \Omega$; $q(0) = 0.1$ C; $i(0) = 0$

**Solution:**

1. Resonant frequency: $\omega_0=1/\sqrt{LC}=1/\sqrt{0.1}=3.162$ rad/s
2. Neper frequency: $\alpha=R/(2L)=2/2=1$ Np/s
3. $R_{crit}=2\sqrt{L/C}=2\sqrt{10}=6.32\ \Omega$ and $R=2<R_{crit}$, so the circuit is underdamped
4. Damped frequency: $\omega_d=\sqrt{\omega_0^2-\alpha^2}=\sqrt{10-1}=3$ rad/s
5. Roots: $s^2+2s+10=0\Rightarrow s=-1\pm 3i$, confirming $\alpha=1$ and $\omega_d=3$
6. Solution form: $q=e^{-t}(A_1\cos 3t+A_2\sin 3t)$; $q(0)=0.1\Rightarrow A_1=0.1$
7. $i=q'=e^{-t}\left[(-A_1+3A_2)\cos 3t+(-3A_1-A_2)\sin 3t\right]$; $i(0)=0\Rightarrow -0.1+3A_2=0\Rightarrow A_2=0.0333$
8. Damping ratio: $\zeta=\alpha/\omega_0=1/3.162=0.316$, matching $(R/2)\sqrt{C/L}=1(0.316)$
9. Oscillation frequency: $f_d=\omega_d/(2\pi)=3/6.283=0.477$ Hz

> [!success]- Answer
> **$q(t) = e^{-t}(0.1\cos 3t + 0.0333\sin 3t)$ C, $\omega_d = 3$ rad/s, $\zeta = 0.316$**

> [!warning] Trap
> Computing $\omega_d$ as $\omega_0-\alpha = 3.162-1 = 2.162$ rad/s. The relation is $\omega_d=\sqrt{\omega_0^2-\alpha^2}$ — a Pythagorean subtraction of the squares, not of the frequencies.

### P3. A series RLC circuit uses $L = 40$ mH and $C = 10\ \mu$F. Find the resistance for critical damping, and the resulting resonant frequency in Hz.

**Given:** $L = 40$ mH; $C = 10\ \mu$F; critical damping required

**Solution:**

1. Convert first: $L=40$ mH $=0.04$ H and $C=10\ \mu$F $=10^{-5}$ F
2. $L/C=0.04/10^{-5}=4000$
3. $R_{crit}=2\sqrt{L/C}=2\sqrt{4000}=2(63.25)=126.5\ \Omega$
4. Resonant frequency: $\omega_0=1/\sqrt{LC}=1/\sqrt{(0.04)(10^{-5})}=1/\sqrt{4\times10^{-7}}$
5. $\sqrt{4\times10^{-7}}=6.325\times10^{-4}$ s, so $\omega_0=1581$ rad/s
6. $f_0=\omega_0/(2\pi)=1581/6.283=251.6$ Hz
7. Check: at critical damping $\alpha=\omega_0$, so $R/(2L)=1581\Rightarrow R=2(0.04)(1581)=126.5\ \Omega$

> [!success]- Answer
> **$R_{crit} = 126.5\ \Omega$, with $f_0 = 251.6$ Hz**

> [!warning] Trap
> Substituting millihenries and microfarads directly. $\sqrt{40/10}$ gives 2, an answer off by a factor of 63. Every inductance must be in henries and every capacitance in farads before the square root.

### P4. A parallel RLC circuit has $R = 1$ k$\Omega$, $L = 1$ H and $C = 1\ \mu$F. Classify the damping and find the damped frequency.

**Given:** $R = 1$ k$\Omega$; $L = 1$ H; $C = 1\ \mu$F; parallel configuration

**Solution:**

1. Convert: $R=1000\ \Omega$ and $C=10^{-6}$ F
2. $\omega_0=1/\sqrt{LC}=1/\sqrt{10^{-6}}=1000$ rad/s
3. Parallel neper frequency: $\alpha=1/(2RC)=1/(2\cdot 1000\cdot 10^{-6})=1/0.002=500$ Np/s
4. $\alpha=500<\omega_0=1000$, so the parallel circuit is underdamped
5. Damping ratio: $\zeta=\alpha/\omega_0=0.5$, matching the parallel form $(1/(2R))\sqrt{L/C}=(1/2000)(1000)=0.5$
6. $\omega_d=\sqrt{\omega_0^2-\alpha^2}=\sqrt{10^6-250000}=\sqrt{750000}=866$ rad/s
7. Consistency check: $\omega_d=\omega_0\sqrt{1-\zeta^2}=1000\sqrt{0.75}=866$ rad/s

> [!success]- Answer
> **Underdamped, $\zeta = 0.5$, $\omega_d = 866$ rad/s**

> [!warning] Trap
> Applying the series criterion $R_{crit}=2\sqrt{L/C}=2000\ \Omega$ and concluding the circuit is underdamped for the wrong reason — or worse, using the series $\alpha = R/(2L) = 500$ Np/s and getting the right number by coincidence. For a *parallel* network the critical resistance is $\frac{1}{2}\sqrt{L/C} = 500\ \Omega$ and $\alpha = 1/(2RC)$.

### P5. A series RLC circuit with $L = 1$ H, $C = 0.25$ F, $R = 5\ \Omega$ is connected to a 10 V DC source at $t = 0$ with $q(0) = 0$ and $i(0) = 0$. Find $q(t)$ and the final capacitor voltage.

**Given:** $L = 1$ H; $C = 0.25$ F; $R = 5\ \Omega$; $v_s = 10$ V DC; $q(0) = 0$, $i(0) = 0$

**Solution:**

1. Driven equation: $q''+5q'+4q=v_s/L=10$
2. DC steady state (particular solution): the capacitor is an open circuit, so $i(\infty)=0$ and $q_p=Cv_s=0.25(10)=2.5$ C
3. Homogeneous roots from the earlier work: $s=-1,\,-4$, so $q_h=A_1e^{-t}+A_2e^{-4t}$
4. $q(t)=A_1e^{-t}+A_2e^{-4t}+2.5$
5. Apply $q(0)=0$: $A_1+A_2+2.5=0\Rightarrow A_1+A_2=-2.5$
6. Apply $i(0)=0$ with $i=-A_1e^{-t}-4A_2e^{-4t}$: $-A_1-4A_2=0\Rightarrow A_1=-4A_2$
7. Substitute: $-4A_2+A_2=-2.5\Rightarrow A_2=0.8333$ and $A_1=-3.333$
8. $v_C=q/C=4q=-13.33e^{-t}+3.333e^{-4t}+10$ V
9. Check: $v_C(0)=-13.33+3.33+10=0$ V and $v_C(\infty)=10$ V

> [!success]- Answer
> **$q(t) = -3.333e^{-t} + 0.833e^{-4t} + 2.5$ C, so $v_C(\infty) = 10$ V and $i(\infty) = 0$**

> [!warning] Trap
> Solving the homogeneous equation and reporting that as the whole answer, which forces $v_C(\infty) = 0$ and violates the source. With a DC source the particular solution is nonzero: the capacitor charges to $v_s$, it does not discharge to zero.

## Traps & Exam Notes

- **Using $R_{crit} = \sqrt{L/C}$.** The criterion is $R = 2\sqrt{L/C}$ for a series circuit; dropping the 2 makes a circuit that is actually overdamped look underdamped.
- **Applying the series criterion to a parallel circuit.** A parallel RLC is critically damped at $R = \frac{1}{2}\sqrt{L/C}$ and has $\alpha = 1/(2RC)$. The two configurations are duals, and their $R$ criteria are reciprocal.
- **Not converting mH and $\mu$F.** $\omega_0 = 1/\sqrt{LC}$ is only correct in henries and farads; leaving $L$ in mH inflates $\omega_0$ by $\sqrt{1000}$.
- **Writing $\alpha = R/L$.** Dividing $Lq''+Rq'+q/C = 0$ by $L$ gives $q''+(R/L)q'+q/(LC) = 0$, so the coefficient of $q'$ is $2\alpha$ and $\alpha = R/(2L)$.
- **Confusing $q(0)$ with $i(0)$ as initial conditions.** $i(0) = q'(0)$, so an initial current is a condition on the derivative. Treating it as a value of $q$ makes the system inconsistent.
- **Imposing the wrong continuity law.** Capacitor *voltage* and inductor *current* cannot jump; capacitor current and inductor voltage can. Starting from $i_C(0^+)=i_C(0^-)$ instead of $v_C(0^+)=v_C(0^-)$ is a common switch-problem error.
- **Forgetting the DC particular solution.** With a source still connected the transient decays to the DC steady state ($C$ open, $L$ short), not to zero.
- **Reporting $\omega_d$ below critical damping.** For $\zeta\ge1$ there is no oscillation; $\sqrt{\omega_0^2-\alpha^2}$ becomes imaginary, which is the signal that the overdamped form $A_1e^{s_1t}+A_2e^{s_2t}$ is required.

## See Also

- [[10_Mass-Spring-Damper_Systems]]
- [[07_Laplace_Transform_Pairs]]
- [[10_Inverse_Laplace_and_Partial_Fractions]]
- [[12_Second_Order_RLC_Natural_Response]]

---

[[10_Mass-Spring-Damper_Systems|⬅ 10]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[12_PDE_Wave_Equation_1D|12 ➡]]
