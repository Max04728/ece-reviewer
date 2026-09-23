---
id: MATH-04-13
title: "Fourier Transform Properties"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 13
tier: 2
depth: full
problem_count: 5
prereqs: ["[[11_Fourier_Series_Trigonometric_and_Exponential]]", "[[09_Unit_Step,_Dirac_and_Periodic_Functions]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — Fourier Transform Properties

> [!abstract] Scope
> Use the transform's shift, scale, derivative and convolution rules to get a spectrum without integrating, and read standard signal shapes straight off a pair table.

## Core Concept

> [!tip] Intuition
> The transform trades a differential equation in time for an algebraic equation in frequency, so every operation that is hard in one domain (convolution, differentiation) becomes easy in the other.

**Definitions and the $2\pi$ bookkeeping.** In the angular-frequency convention the forward transform is:
$$F(\omega) = \int_{-\infty}^{\infty} f(t)e^{-j\omega t}dt$$
The inverse transform is:
$$f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} F(\omega)e^{j\omega t}d\omega$$
That single $1/2\pi$ is the entire bookkeeping: it appears in front of the inverse transform and again in Parseval, and nowhere else. If the transform is instead defined with ordinary frequency $f$ in hertz, $F(f) = \int f(t)e^{-j2\pi ft}dt$, the $1/2\pi$ disappears from the inverse and the rectangular-pulse pair becomes $\tau\,\mathrm{sinc}(\pi f\tau)$ with nulls at $f = k/\tau$. Mixing the two conventions is the fastest way to lose or gain a factor of $2\pi$ in a spectrum sketch, so read the definition given in the question before using any property row.

**The properties are all consequences of one substitution.** A time shift $t\to t-t_0$ takes the exponential factor outside the integral as $e^{-j\omega t_0}$, which changes the phase and nothing else, so a delay is invisible in the magnitude spectrum — this is why a magnitude-only measurement can never locate a signal in time. Frequency shift is the dual statement, with $e^{j\omega_0 t}$ sliding the spectrum to $\omega_0$, and it is what turns a baseband pulse into a modulated carrier; a cosine carrier therefore splits a spectrum into two half-amplitude copies at $\pm\omega_0$. Time scaling puts $\lvert a\rvert$ in the denominator outside and $\omega/a$ inside, which is the analytic statement of the uncertainty trade: compressing a pulse in time by a factor of two doubles the width of its spectrum and halves its peak. Differentiation multiplies by $j\omega$, converting a linear constant-coefficient differential equation into a rational algebraic equation — the reason the Fourier and Laplace transforms solve circuits at all.

**Convolution and multiplication are duals, and Parseval is the energy statement.** The rule $f*g \leftrightarrow FG$ is what makes an LTI system a multiplication in the frequency domain, while the reverse rule $f\,g \leftrightarrow \frac{1}{2\pi}F*G$ carries the $1/2\pi$ that multiplication in time always introduces — and it is the reason windowing a signal broadens its spectrum instead of merely truncating it. Parseval's theorem is:
$$\int\lvert f\rvert^{2}dt = \frac{1}{2\pi}\int\lvert F\rvert^{2}d\omega$$
It says the energy computed from the waveform must equal the energy computed from the spectral density, which makes it the strongest available arithmetic check on any transform pair, and the fastest route to integrals of squared sinc-type functions. Existence is not automatic: a constant, a step and a sinusoid all fail absolute integrability and are admitted only as generalized transforms involving $\delta(\omega)$, which is exactly why periodic signals have line spectra rather than continuous ones, and why the time-integration rule carries an extra $\pi F(0)\delta(\omega)$ term.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Forward transform | $F(\omega) = \int_{-\infty}^{\infty} f(t)\,e^{-j\omega t}\,dt$ | Angular frequency $\omega$ in rad/s. Exists in the ordinary sense only if $f$ is absolutely integrable (Dirichlet conditions). |
| Inverse transform | $f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} F(\omega)\,e^{j\omega t}\,d\omega$ | This is where the $2\pi$ lives in the angular convention; moving it to the forward transform defines the hertz convention instead. |
| Linearity | $a\,f_1(t) + b\,f_2(t) \;\leftrightarrow\; a\,F_1(\omega) + b\,F_2(\omega)$ | No $2\pi$ factor appears; any stray constant here means a convention was mixed in. |
| Time shift | $f(t-t_0) \;\leftrightarrow\; F(\omega)\,e^{-j\omega t_0}$ | Phase only: $\lvert F\rvert$ is unchanged by a delay, and the phase slope in rad/s equals the delay. |
| Frequency shift (modulation) | $f(t)\,e^{j\omega_0 t} \;\leftrightarrow\; F(\omega-\omega_0)$ | Moves the spectrum up by $\omega_0$ rad/s, so multiplying by $\cos\omega_0 t$ splits it into two half-amplitude copies at $\pm\omega_0$. |
| Time scaling | $f(at) \;\leftrightarrow\; \frac{1}{\lvert a\rvert}F\!\left(\frac{\omega}{a}\right)$ | Absolute value in the denominator; $a = 2$ halves the peak and doubles the bandwidth, preserving energy. |
| Differentiation | $\frac{d^{n}f}{dt^{n}} \;\leftrightarrow\; (j\omega)^{n}F(\omega),\qquad t\,f(t) \;\leftrightarrow\; j\frac{dF}{d\omega}$ | Time derivatives need $f$ and its first $n-1$ derivatives to vanish at infinity, otherwise jump terms add impulse components. |
| Integration in time | $\int_{-\infty}^{t} f(\tau)\,d\tau \;\leftrightarrow\; \frac{F(\omega)}{j\omega} + \pi F(0)\,\delta(\omega)$ | The $\delta(\omega)$ term carries the DC value; dropping it gives zero average for a signal with nonzero area, such as a step. |
| Convolution and multiplication | $f(t)*g(t) \;\leftrightarrow\; F(\omega)G(\omega),\qquad f(t)\,g(t) \;\leftrightarrow\; \frac{1}{2\pi}\left(F*G\right)(\omega)$ | Convolution in time is free of $2\pi$; multiplication in time pays the $1/2\pi$, which is why windowing smears the spectrum. |
| Parseval energy theorem | $\int_{-\infty}^{\infty}\lvert f(t)\rvert^{2}\,dt = \frac{1}{2\pi}\int_{-\infty}^{\infty}\lvert F(\omega)\rvert^{2}\,d\omega$ | Energy in joules when $f$ is a voltage across 1 ohm; omitting the $1/2\pi$ makes the two sides differ by 6.283. |
| Rectangular pulse pair | $\mathrm{rect}\!\left(\frac{t}{\tau}\right) \;\leftrightarrow\; \tau\,\mathrm{sinc}\!\left(\frac{\omega\tau}{2}\right),\qquad \mathrm{sinc}(u) = \frac{\sin u}{u}$ | $\mathrm{rect}$ is 1 for $\lvert t\rvert<\tau/2$; the first null is at $\omega = 2\pi/\tau$ and $F(0) = \tau$ is the pulse area. |
| Standard pairs | $e^{-at}u(t) \leftrightarrow \frac{1}{a+j\omega},\qquad \delta(t) \leftrightarrow 1,\qquad e^{-at^{2}} \leftrightarrow \sqrt{\frac{\pi}{a}}\,e^{-\omega^{2}/(4a)},\qquad \cos\omega_0 t \leftrightarrow \pi\left[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)\right]$ | $a>0$ for the exponential; the Gaussian is the only function that transforms into its own shape, and the cosine pair needs both impulses to describe a real signal. |

## Worked Problems

### P1. Find the Fourier transform of the unit-amplitude rectangular pulse $f(t) = 1$ V for $\lvert t\rvert < 1$ ms and $f(t) = 0$ otherwise, and give the location of its first spectral null.

**Given:** amplitude 1 V; total width tau = 2 ms; centred at t = 0

**Solution:**

1. $F(\omega) = \int_{-10^{-3}}^{10^{-3}} e^{-j\omega t}dt = \left[\frac{e^{-j\omega t}}{-j\omega}\right]_{-10^{-3}}^{10^{-3}}$
2. $= \frac{e^{j\omega 10^{-3}} - e^{-j\omega 10^{-3}}}{j\omega} = \frac{2\sin(\omega\cdot10^{-3})}{\omega}$
3. Write it as a sinc: $F(\omega) = 2\times10^{-3}\,\mathrm{sinc}(10^{-3}\omega)$ with $\mathrm{sinc}(u) = \frac{\sin u}{u}$
4. $F(0) = \tau = 2\times10^{-3}$ V$\cdot$s, the pulse area, and $\lvert F\rvert = 0$ when $10^{-3}\omega = \pi$
5. First null at $\omega = \pi/10^{-3} = 3141.6$ rad/s, that is $f = 1/\tau = 500$ Hz

> [!success]- Answer
> **$F(\omega) = 2\times10^{-3}\,\mathrm{sinc}(10^{-3}\omega)$ V$\cdot$s, DC value $2\times10^{-3}$ V$\cdot$s, first null at $3141.6$ rad/s $= 500$ Hz**

> [!warning] Trap
> Putting the first null at $\omega = 1/\tau$ instead of $2\pi/\tau$. With $\tau = 2$ ms the correct null is $3141.6$ rad/s $= 500$ Hz, so answering $500$ rad/s is off by $2\pi$ — the usual cost of mixing the hertz and angular conventions.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. First null from $10^{-3}\omega = \pi$: `π ÷ 1E-3` → **3141.5927** rad/s.
> 2. In hertz: `1 ÷ 2E-3` → **500** Hz, with the DC value `2E-3` as the pulse area in front of the sinc.
>
> **500 rad/s** is the trap; the null sits at $2\pi/\tau$, which `π ÷ 1E-3` keeps visible.

### P2. Find the Fourier transform of $f(t) = e^{-4t}u(t)$ and evaluate its magnitude and phase at $\omega = 3$ rad/s.

**Given:** a = 4 s^-1; right-sided (causal) exponential; omega = 3 rad/s

**Solution:**

1. $F(\omega) = \int_0^{\infty} e^{-4t}e^{-j\omega t}dt = \int_0^{\infty} e^{-(4+j\omega)t}dt$
2. $= \left[\frac{e^{-(4+j\omega)t}}{-(4+j\omega)}\right]_0^{\infty} = \frac{1}{4+j\omega}$ because the real part of the exponent is negative
3. At $\omega = 3$: $F(3) = \frac{1}{4+j3}$
4. $\lvert F(3)\rvert = \frac{1}{\sqrt{4^{2}+3^{2}}} = \frac{1}{5} = 0.2$ V$\cdot$s
5. $\angle F(3) = -\arctan\frac{3}{4} = -36.87^{\circ}$

> [!success]- Answer
> **$F(\omega) = \dfrac{1}{4+j\omega}$ V$\cdot$s; at $\omega = 3$ rad/s, $\lvert F\rvert = 0.2$ V$\cdot$s and $\angle F = -36.87^{\circ}$**

> [!warning] Trap
> Adding the components before squaring, as in $\sqrt{4^{2}}+3 = 7$ or $4+3 = 7$. The magnitude is $1/\sqrt{4^{2}+3^{2}} = 0.2$; the sloppy route gives $0.143$ and the phase is then also wrong.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `MODE` `2`: `1 ÷ (4+3j)` → **0.16-0.12j**.
> 2. `Apps` `▶r∠θ` → $\lvert F(3) \rvert$ = **0.2** (in `X`), and `Apps` `Arg` → **-36.87°** at $\omega = 3$ rad/s.
>
> The magnitude is $1/\sqrt{4^2+3^2} = 1/5$; the sloppy $\sqrt{4^2}+3$ route returns 0.1429.

### P3. The pulse of the first problem is delayed so that it now occupies $0 < t < 2$ ms. Write its transform and give its magnitude and phase at $\omega = 1000$ rad/s.

**Given:** same 2 ms unit-amplitude pulse; delay t_0 = 1 ms; omega = 1000 rad/s

**Solution:**

1. The delayed pulse is $g(t) = f(t-t_0)$ with $t_0 = 10^{-3}$ s
2. Time-shift theorem: $G(\omega) = F(\omega)e^{-j\omega t_0} = 2\times10^{-3}\mathrm{sinc}(10^{-3}\omega)\,e^{-j\omega 10^{-3}}$
3. The magnitude is unchanged by the shift: $\lvert G(\omega)\rvert = \lvert F(\omega)\rvert$
4. At $\omega = 1000$: $10^{-3}\omega = 1$ rad, so $\mathrm{sinc}(1) = \frac{\sin 1}{1} = 0.8415$
5. $\lvert G(1000)\rvert = 2\times10^{-3}(0.8415) = 1.683\times10^{-3}$ V$\cdot$s
6. The shift contributes phase $-\omega t_0 = -1000(10^{-3}) = -1$ rad $= -57.30^{\circ}$; the sinc factor is positive here, so the total phase is $-57.30^{\circ}$

> [!success]- Answer
> **$G(\omega) = 2\times10^{-3}\mathrm{sinc}(10^{-3}\omega)e^{-j\omega 10^{-3}}$; at $\omega = 1000$ rad/s, $\lvert G\rvert = 1.683\times10^{-3}$ V$\cdot$s and $\angle G = -57.30^{\circ}$**

> [!warning] Trap
> Treating the delay as a magnitude change, or using $\sin(1) = 1$ by assuming the argument is negligible. $\sin 1$ rad $= 0.8415$, so the magnitude is $1.683\times10^{-3}$ and not $2\times10^{-3}$; the sine argument is in radians, never degrees.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. In RAD: `sin(1) ÷ 1` → **0.8414710** — that is sinc(1), not 1.
> 2. $\lvert G(1000)\rvert$ = `2E-3 × 0.8414710` → **1.6829E-3** V·s (the shift leaves the magnitude alone).
> 3. Phase from the delay: `-1000 × 1E-3` → **-1** rad, and `×180÷π` → **-57.2958°**.
>
> `sin(1)` is radians; degree mode would return **0.01745** here.

### P4. Use Parseval's theorem to find the energy of $f(t) = e^{-4t}u(t)$, and verify it from the frequency-domain integral.

**Given:** f(t) = e^{-4t}u(t); F(omega) = 1/(4 + j omega)

**Solution:**

1. Time domain: $E = \int_0^{\infty}e^{-8t}dt = \left[\frac{-e^{-8t}}{8}\right]_0^{\infty} = \frac{1}{8}$
2. So $E = 0.125$ J, taking $f$ as a voltage across 1 ohm
3. Frequency domain: $E = \frac{1}{2\pi}\int_{-\infty}^{\infty}\frac{d\omega}{\lvert 4+j\omega\rvert^{2}} = \frac{1}{2\pi}\int_{-\infty}^{\infty}\frac{d\omega}{16+\omega^{2}}$
4. $\int_{-\infty}^{\infty}\frac{d\omega}{16+\omega^{2}} = \frac{1}{4}\left[\arctan\frac{\omega}{4}\right]_{-\infty}^{\infty} = \frac{1}{4}\left(\frac{\pi}{2}+\frac{\pi}{2}\right) = \frac{\pi}{4}$
5. $E = \frac{1}{2\pi}\cdot\frac{\pi}{4} = \frac{1}{8} = 0.125$ J, confirming the time-domain result

> [!success]- Answer
> **$E = \dfrac{1}{8} = 0.125$ J from both domains**

> [!warning] Trap
> Omitting the $1/2\pi$ from Parseval. The frequency integral by itself gives $\pi/4 = 0.7854$ J, which is $2\pi$ times the true energy; an energy larger than the total input is the signature of that slip.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Time domain: `∫dx` `∫(e^(-8X), 0, 10)` → **0.125** J (a volt across 1 Ω).
> 2. Frequency route: `1 ÷ 2π × ∫(1 ÷ (16+X²), -1E6, 1E6)` → **0.125** — the $1/2\pi$ is what makes the two sides agree.
>
> Without the $1/2\pi$ the frequency integral returns $\pi/4$ = **0.7854**, which is $2\pi$ times the true energy.

### P5. A 2 ms unit-amplitude rectangular pulse $p(t)$ has transform $P(\omega) = 2\times10^{-3}\mathrm{sinc}(10^{-3}\omega)$. Find the transform of $q(t) = p(2t)$ and state its DC value and first null.

**Given:** p(t) has width 2 ms and unit amplitude; q(t) = p(2t) therefore has width 1 ms

**Solution:**

1. Time-scaling theorem with $a = 2$: $Q(\omega) = \frac{1}{2}P\!\left(\frac{\omega}{2}\right)$
2. $Q(\omega) = \frac{1}{2}\left(2\times10^{-3}\right)\mathrm{sinc}\!\left(10^{-3}\cdot\frac{\omega}{2}\right) = 1\times10^{-3}\,\mathrm{sinc}(5\times10^{-4}\omega)$
3. $Q(0) = 1\times10^{-3}$ V$\cdot$s, half of $P(0)$, matching the halved pulse area
4. First null: $5\times10^{-4}\omega = \pi$, so $\omega = 6283.2$ rad/s
5. In hertz the null moved from $500$ Hz to $1000$ Hz, doubling as the pulse width halved

> [!success]- Answer
> **$Q(\omega) = 1\times10^{-3}\mathrm{sinc}(5\times10^{-4}\omega)$ V$\cdot$s, $Q(0) = 1\times10^{-3}$ V$\cdot$s, first null at $6283.2$ rad/s $= 1000$ Hz**

> [!warning] Trap
> Dropping the $1/\lvert a\rvert = 1/2$ factor. Without it the DC value stays $2\times10^{-3}$ and the energy computed by Parseval is four times too large, even though the null position still comes out right — so the null alone does not prove the answer correct.

## Traps & Exam Notes

- **Putting the $2\pi$ in the wrong place.** With $F(\omega)=\int f e^{-j\omega t}dt$ the $1/2\pi$ belongs to the inverse transform and to Parseval. Converting to hertz means converting the pair too: the pulse is $\tau\,\mathrm{sinc}(\pi f\tau)$, whose nulls sit at $f=k/\tau$. Keeping the angular table and merely substituting $f$ for $\omega$ gives $\tau\,\mathrm{sinc}(f\tau/2)$ and pushes every null out to $f=2\pi k/\tau$, a factor $2\pi$ too high.
- **Dropping $1/\lvert a\rvert$ in time scaling.** $f(2t)$ gives $\frac{1}{2}F(\omega/2)$, not $F(\omega/2)$; the missing half doubles the spectrum and quadruples the energy found from Parseval.
- **Adding a magnitude change to a delay.** A time shift changes only the phase, so $\lvert G(\omega)\rvert = \lvert F(\omega)\rvert$; sketching a different magnitude envelope for a delayed pulse contradicts the theorem and shows up as a wrong sinc amplitude.
- **Wrong sign for a left-sided exponential.** The causal $e^{-at}u(t)$ with $a>0$ transforms to $1/(a+j\omega)$, while the anticausal $e^{at}u(-t)$ gives $1/(a-j\omega)$. Using the first for the second flips the sign of the whole phase spectrum.
- **Dropping $\pi F(0)\delta(\omega)$ from the integration rule.** The transform of a unit step is $1/(j\omega)+\pi\delta(\omega)$; keeping only $1/(j\omega)$ makes the spectrum zero at DC even though the step has infinite area, and it breaks the final-value check on any circuit solution.

## See Also

- [[11_Fourier_Series_Trigonometric_and_Exponential]]
- [[12_Half-Range_Expansions_and_Symmetry]]
- [[09_Unit_Step,_Dirac_and_Periodic_Functions]]
- [[07_Laplace_Transform_Pairs]]

---

[[12_Half-Range_Expansions_and_Symmetry|⬅ 12]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[14_Bessel_Functions|14 ➡]]
