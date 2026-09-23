---
id: MATH-06-05
title: "Second Order Specifications"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Test_Signals_and_First_Order_Response]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Second Order Specifications

> [!abstract] Scope
> Read percent overshoot, peak time, rise time and settling time out of a standard second-order denominator, and invert those specifications back into pole locations.

## Core Concept

> [!tip] Intuition
> On the s-plane, $\zeta$ fixes the angle of the poles and $\omega_n$ fixes their distance. The angle controls the overshoot; the real part $-\zeta\omega_n$ controls how fast the ringing dies. Every time-domain specification is one of those two geometric ideas wearing a formula.

**Standard form and how to reach it.** For a unity-DC-gain second-order loop the standard form is:
$$T(s)=\dfrac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}$$
With a DC gain $K$ present, the numerator is instead $\dfrac{K\omega_n^2}{\dots}$. Compare the denominator to $s^2+2\zeta\omega_n s+\omega_n^2$: the constant term is $\omega_n^2$ (so take a square root) and the middle coefficient is $2\zeta\omega_n$. If the $s^2$ coefficient is not 1, divide it out first — $s^2+6s+25$ gives $\omega_n=5$, $\zeta=0.6$, but $2s^2+12s+50$ gives the same pair only after dividing by 2.

**The four regimes.** $\zeta=0$: undamped, poles on the $j\omega$ axis, sustained oscillation at $\omega_n$. $0<\zeta<1$: underdamped, complex poles $-\zeta\omega_n\pm j\omega_d$ with $\omega_d=\omega_n\sqrt{1-\zeta^2}$, damped ringing. $\zeta=1$: critically damped, a repeated real pole at $-\omega_n$, the fastest response with no overshoot. $\zeta>1$: overdamped, two real poles, sluggish and monotone. Only the underdamped case has the closed-form overshoot/peak-time results.

**Percent overshoot depends only on $\zeta$.** The peak occurs at the first zero of the derivative, $t_p=\pi/\omega_d$, and the overshoot is $M_p=e^{-\pi\zeta/\sqrt{1-\zeta^2}}$. Note what is *absent*: $\omega_n$. Two systems with $\zeta=0.5$ and $\omega_n=2$ or $\omega_n=200$ have identical percent overshoot; they differ only in how fast they get there. This is the most exam-exploitable fact in the topic.

**Peak time and rise time use $\omega_d$, not $\omega_n$.** $t_p=\pi/\omega_d$. The $10$-$90\%$ rise time is well approximated by $t_r\approx\dfrac{\pi-\beta}{\omega_d}$ with $\beta=\arccos\zeta$ (radians), and the common short form $t_r\approx\dfrac{1.8}{\omega_n}$ is accurate only near $\zeta=0.5$.

**Settling time uses the real part.** Envelope decay is governed by $e^{-\zeta\omega_n t}$, so $t_s=\dfrac{4}{\zeta\omega_n}$ for the $2\%$ band and $\dfrac{3}{\zeta\omega_n}$ for $5\%$. The product $\zeta\omega_n$ is the distance of the pole from the imaginary axis, which is why settling time is a vertical-line specification: constant settling time is a vertical line in the s-plane.

**Geometry and the inverse problem.** Constant $\zeta$ rays from the origin, constant $\omega_n$ circles about the origin, constant $t_s$ vertical lines and constant $t_p$ horizontal lines. Board problems usually give two of {$\zeta,\omega_n,t_s,t_p,M_p$} and ask for the rest; converting $M_p$ to $\zeta$ needs the inverse relation:
$$\zeta=\dfrac{\lvert\ln M_p\rvert}{\sqrt{\pi^2+\ln^2 M_p}}$$
Here $M_p$ is a fraction, not a percentage.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Standard second-order form | $T(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$ | DC gain 1. Divide by the s^2 coefficient before comparing. |
| Damped frequency | $\omega_d = \omega_n\sqrt{1-\zeta^2}$ | Underdamped only (0 < zeta < 1). |
| Percent overshoot | $M_p = e^{-\pi\zeta/\sqrt{1-\zeta^2}}$ | Fractional value; multiply by 100 for percent. Independent of wn. |
| Zeta from overshoot | $\zeta = \frac{\lvert \ln M_p \rvert}{\sqrt{\pi^2 + \ln^2 M_p}}$ | Insert M_p as a fraction (0.163), not 16.3. |
| Peak time | $t_p = \frac{\pi}{\omega_d} = \frac{\pi}{\omega_n\sqrt{1-\zeta^2}}$ | First peak. Use omega_d, never omega_n. |
| 10-90% rise time | $t_r \approx \frac{\pi - \arccos\zeta}{\omega_d}$ | Beta = arccos(zeta) in radians. The short form 1.8/wn is only good near zeta = 0.5. |
| 2% settling time | $t_s = \frac{4}{\zeta\omega_n}$ | Four time constants of the exponential envelope. |
| 5% settling time | $t_s = \frac{3}{\zeta\omega_n}$ | Same envelope, wider band. State the band with the answer. |
| Poles from specs | $s = -\zeta\omega_n \pm j\omega_n\sqrt{1-\zeta^2}$ | Real part sets settling, imaginary part sets peak time. |
| Phase margin estimate | $\zeta \approx \frac{PM}{100} \ \mathrm{(degrees)}$ | Only for zeta below about 0.6-0.7; rough exam approximation. |

## Interactive Widget

**Second Order Zeta Wn Explorer**

![[Second_Order_Zeta_Wn_Explorer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. For $T(s)=\dfrac{25}{s^2+6s+25}$, find $\omega_n$, $\zeta$, $\omega_d$, percent overshoot, peak time and the $2\%$ settling time.

**Given:** T(s) = 25/(s^2+6s+25)

**Solution:**

1. Compare with $s^2+2\zeta\omega_n s+\omega_n^2$: $\omega_n^2 = 25 \Rightarrow \omega_n = 5\ \mathrm{rad/s}$
2. $2\zeta\omega_n = 6 \Rightarrow \zeta = 6/(2\cdot5) = 0.6$
3. $\omega_d = 5\sqrt{1-0.36} = 5(0.8) = 4\ \mathrm{rad/s}$
4. $M_p = e^{-\pi(0.6)/0.8} = e^{-2.356} = 0.0948$
5. $t_p = \pi/4 = 0.785\ \mathrm{s}$
6. $t_s = 4/(\zeta\omega_n) = 4/(0.6\cdot5) = 4/3 = 1.333\ \mathrm{s}$

> [!success]- Answer
> **$\omega_n=5\ \mathrm{rad/s}$, $\zeta=0.6$, $\omega_d=4\ \mathrm{rad/s}$, $M_p = 9.48\%$, $t_p = 0.785\ \mathrm{s}$, $t_s = 1.33\ \mathrm{s}$.**

> [!warning] Trap
> Reporting $M_p = 9.48$ as a percent when the formula returns a fraction, or using $\omega_n$ instead of $\omega_d$ in $t_p = \pi/\omega_d$ (which would give $0.628\ \mathrm{s}$).

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `1` with `1`, `6`, `25` → $x=-3\pm j4$; `SHIFT` `Pol(` `-3` `,` `4` `)` → $r=$ **5** rad/s $=\omega_n$, $\theta=$ **126.87°** so $\zeta=\cos 53.13°=$ **0.6** and $\omega_d=$ **4** rad/s.
> 2. `e^(−π×0.6÷√(1−0.6²))` → $M_p=$ **0.0948**, i.e. **9.48 %**.
> 3. `π÷4 : 4÷3` → $t_p=$ **0.785** s → $t_s=$ **1.333** s (2 % band).

### P2. A unity-feedback second-order system shows $16.3\%$ overshoot to a step. Find $\zeta$.

**Given:** Mp = 16.3%

**Solution:**

1. Convert: $M_p = 0.163$
2. $\lvert \ln 0.163 \rvert = 1.814$
3. $\ln^2 M_p = 3.291$; $\pi^2 = 9.870$
4. $\zeta = \dfrac{1.814}{\sqrt{9.870+3.291}} = \dfrac{1.814}{3.628}$
5. $\zeta = 0.500$

> [!success]- Answer
> **$\zeta = 0.5$ exactly (16.3% overshoot is the canonical $\zeta=0.5$ value).**

> [!warning] Trap
> Substituting $M_p = 16.3$ instead of $0.163$. The logarithm of a number greater than 1 is positive and the resulting $\zeta$ is meaningless.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `−ln(0.163)` → $\lvert\ln M_p\rvert=$ **1.814** — key the fraction 0.163, never the percentage 16.3.
> 2. `Ans÷√(π²+Ans²)` → $\zeta=$ **0.5000**, the canonical $\zeta=0.5$ value for 16.3 % overshoot.

### P3. A second-order unity-feedback system must have $\zeta=0.5$ and a $2\%$ settling time of $2\ \mathrm{s}$. Find $\omega_n$ and write $T(s)$.

**Given:** zeta = 0.5; ts (2%) = 2 s

**Solution:**

1. $t_s = \dfrac{4}{\zeta\omega_n} = 2 \Rightarrow \zeta\omega_n = 2$
2. $\omega_n = 2/0.5 = 4\ \mathrm{rad/s}$
3. $\omega_n^2 = 16$ and $2\zeta\omega_n = 2(0.5)(4) = 4$
4. $T(s) = \dfrac{16}{s^2+4s+16}$
5. Check peak time: $\omega_d = 4(0.866) = 3.464$, $t_p = \pi/3.464 = 0.907\ \mathrm{s}$

> [!success]- Answer
> **$\omega_n = 4\ \mathrm{rad/s}$, $T(s)=\dfrac{16}{s^2+4s+16}$ ($t_p = 0.907\ \mathrm{s}$).**

> [!warning] Trap
> Solving $4/(\zeta\omega_n)=2$ as $\omega_n = 4/(2\zeta)$ instead of $2/\zeta$. The equation contains the product $\zeta\omega_n$, not $\omega_n$ alone.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4÷2 : Ans÷0.5` → $\zeta\omega_n=$ **2** → $\omega_n=$ **4** rad/s, so $\omega_n^2=$ **16** and $2\zeta\omega_n=$ **4** give $T(s)=\dfrac{16}{s^2+4s+16}$.
> 2. `4×√(1−0.5²) : π÷Ans` → $\omega_d=$ **3.464** rad/s → $t_p=$ **0.907** s.

### P4. A closed-loop pair of poles sits at $s=-3\pm j4$. Find $\omega_n$, $\zeta$, $M_p$, $t_p$ and $t_s$.

**Given:** poles at -3 +/- j4

**Solution:**

1. $\omega_n = \sqrt{3^2+4^2} = \sqrt{25} = 5\ \mathrm{rad/s}$
2. $\zeta = \lvert \mathrm{Re}\rvert/\omega_n = 3/5 = 0.6$
3. $\omega_d = 4\ \mathrm{rad/s}$ (read directly as the imaginary part)
4. $M_p = e^{-\pi(0.6)/0.8} = 0.0948$, i.e. $9.48\%$
5. $t_p = \pi/4 = 0.785\ \mathrm{s}$
6. $t_s = 4/3 = 1.333\ \mathrm{s}$

> [!success]- Answer
> **$\omega_n=5\ \mathrm{rad/s}$, $\zeta=0.6$, $M_p=9.48\%$, $t_p=0.785\ \mathrm{s}$, $t_s=1.33\ \mathrm{s}$.**

> [!warning] Trap
> Taking $\zeta = 3/4$ (the ratio of the real to imaginary part) or $\zeta = 4/5$. $\zeta$ is the cosine of the pole angle measured from the *negative real axis*, so $\zeta=\lvert\mathrm{Re}\rvert/\omega_n = 3/5$.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `SHIFT` `Pol(` `-3` `,` `4` `)` → $r=$ **5** rad/s $=\omega_n$, $\theta=$ **126.87°**; the imaginary part is $\omega_d=$ **4** rad/s and $\zeta=\lvert\mathrm{Re}\rvert/\omega_n=3/5=$ **0.6**.
> 2. `e^(−π×0.6÷√(1−0.6²)) : π÷4 : 4÷3` → $M_p=$ **0.0948** (9.48 %) → $t_p=$ **0.785** s → $t_s=$ **1.333** s.

### P5. A system has $\zeta = 0.707$. Find its percent overshoot and describe the response.

**Given:** zeta = 0.707

**Solution:**

1. $\sqrt{1-\zeta^2} = \sqrt{1-0.5} = 0.7071$
2. Exponent: $-\pi\zeta/\sqrt{1-\zeta^2} = -\pi(0.7071)/0.7071 = -\pi$
3. $M_p = e^{-\pi} = 0.0432$
4. $M_p = 4.32\%$: a small, well-damped overshoot

> [!success]- Answer
> **$M_p = 4.32\%$; $\zeta = 0.707$ is the 'maximally flat' Butterworth damping.**

> [!warning] Trap
> Assuming $\zeta=1$ is the usual design target because it has no overshoot. Critically damped is the fastest *without* overshoot, but real designs usually accept $\zeta\approx0.7$ because it is faster overall.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.7071² : √(1−Ans)` → **0.5** → $\sqrt{1-\zeta^2}=$ **0.7071** $=\zeta$, so the poles sit on the $45°$ ray and $\omega_d=\omega_n$.
> 2. `e^(−π×0.7071÷0.7071)` → $M_p=$ **0.0432**, i.e. **4.32 %**; the exponent is exactly $-\pi$.

## Traps & Exam Notes

- **Using $\omega_n$ in place of $\omega_d$ for $t_p$ and $t_r$.** $t_p=\pi/\omega_d$; $\omega_d=\omega_n\sqrt{1-\zeta^2}$ is always smaller, so $t_p$ is always longer than $\pi/\omega_n$.
- **Feeding a percentage into the overshoot formula.** $\zeta = \lvert\ln M_p\rvert/\sqrt{\pi^2+\ln^2M_p}$ needs the fraction 0.163.
- **Believing $M_p$ depends on $\omega_n$.** It depends only on $\zeta$. Changing $\omega_n$ at fixed $\zeta$ rescales time, not overshoot.
- **Mixing the settling-time bands.** $4/(\zeta\omega_n)$ is 2%, $3/(\zeta\omega_n)$ is 5%. Using 4 when the question specifies 5% (or vice versa) is a 25-33% error.
- **Reading $\zeta$ as the real/imaginary ratio.** $\zeta=\cos\theta$ where $\theta$ is measured from the negative real axis, i.e. $\zeta=\lvert\mathrm{Re}\rvert/\omega_n$.
- **Comparing an un-normalised denominator.** $s^2+6s+25$ has $\omega_n=5$; $2s^2+12s+50$ has the same poles but you must divide by 2 before comparing coefficients.
- **Applying these formulas to a non-unity numerator or an overdamped system.** $M_p$ and $t_p$ are underdamped-only results; an overdamped system has no overshoot and no peak to time.
- **Ignoring a closed-loop zero.** A left-half-plane zero increases overshoot well beyond the $\zeta$-implied value, and the second-order formulas then under-predict it.

## See Also

- [[04_Test_Signals_and_First_Order_Response]]
- [[09_Root_Locus_Techniques]]
- [[10_Bode_Plots_and_Margins]]

---

[[04_Test_Signals_and_First_Order_Response|⬅ 04]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Steady_State_Error_and_Error_Constants|06 ➡]]
