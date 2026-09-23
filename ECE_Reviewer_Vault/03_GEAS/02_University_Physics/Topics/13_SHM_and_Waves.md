---
id: GEAS-02-13
title: "SHM and Waves"
part: "03_GEAS"
area: "02_University_Physics"
topic: 13
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Work,_Energy_and_Conservation]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — SHM and Waves

> [!abstract] Scope
> Describe oscillation with amplitude, frequency and phase, track the energy sloshing between kinetic and potential forms, and find wave speed, wavelength and the harmonic series of a standing wave.

## Core Concept

> [!tip] Intuition
> SHM is what you get whenever a restoring force is proportional to displacement — the motion repeats because the force always points home and grows with how far you strayed. A travelling wave is that same oscillation handed from one piece of the medium to the next, so the medium never moves along with the wave; it only oscillates in place.

**The single defining condition.** SHM occurs exactly when the net restoring force is $F = -kx$, which by Newton's second law gives $a = -\omega^2 x$ with $\omega^2 = k/m$. This is why the method generalises far beyond springs: any small displacement from a stable equilibrium has a linear restoring force, so a pendulum, a floating block or an $LC$ circuit all obey the same equation. If the force grows faster than linearly, or if friction is large, the motion is periodic but not simple harmonic and $T = 2\pi\sqrt{m/k}$ no longer applies.

**$\omega$, $f$ and $T$ are three names for one number.** $\omega = 2\pi f = 2\pi/T$ in $\mathrm{rad/s}$; $f$ is in hertz and $T$ in seconds. The board deliberately mixes them — a stem giving $f = 2\ \mathrm{Hz}$ and asking for the period or the angular frequency is testing only this conversion, and using $f$ where $\omega$ belongs understates every velocity and acceleration by a factor of $2\pi$.

**The amplitude-independent period is the payoff.** For a spring, $T = 2\pi\sqrt{m/k}$ contains no $A$; for a small-angle pendulum, $T = 2\pi\sqrt{L/g}$ contains no mass and no amplitude. Doubling the swing of a pendulum leaves the period unchanged — Galileo's observation and the basis of clock escapements. The pendulum formula also hides an assumption: it comes from $\sin\theta\approx\theta$, so it is good to roughly $1\%$ only up to about $15^\circ$.

**Energy oscillates but the total does not.** $E = \frac{1}{2}kA^2$ is constant, while $KE = \frac{1}{2}k(A^2 - x^2)$ and $PE = \frac{1}{2}kx^2$ trade off. The two are equal at $x = A/\sqrt{2}$, not at $x = A/2$, which is the exact distinction a 'where is $KE = PE$' item is built on. Maximum speed occurs at the equilibrium point and maximum acceleration at the extremes — the two are never at the same place.

**Wave speed is a property of the medium; frequency is a property of the source.** For a stretched string $v = \sqrt{T/\mu}$ with $\mu$ in $\mathrm{kg/m}$, so tightening a string or using a thinner one raises the pitch while plucking harder only raises the amplitude. For sound, $v$ depends on the medium and its temperature. The universal link is $v = f\lambda$: when a wave enters a new medium, $f$ is unchanged and $\lambda$ adjusts, which is why refraction shifts direction but never colour.

**Standing waves are just superposition with boundary conditions.** A string fixed at both ends must have nodes there, so its allowed wavelengths are $\lambda_n = 2L/n$ and its frequencies $f_n = nv/(2L)$ — the harmonic series, all integer multiples of $f_1 = v/(2L)$. Superposition also produces beats between two close frequencies at $f_{beat} = |f_1 - f_2|$, and the same mathematics explains why a wave reflecting off a boundary can form a standing pattern only at those special frequencies.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Angular frequency of a spring-mass system | $\omega = \sqrt{\frac{k}{m}}$ | k in N/m, m in kg. Independent of amplitude, so doubling A changes nothing about omega. |
| Period and frequency | $T = \frac{2\pi}{\omega} = \frac{1}{f},\quad \omega = 2\pi f$ | Mixing f with omega understates v_max and a_max by a factor of 2pi, about 6.28. |
| Simple pendulum period | $T = 2\pi\sqrt{\frac{L}{g}}$ | Small angles only (under about 15 degrees) and a point mass on a massless string. Independent of the bob mass. |
| Physical pendulum period | $T = 2\pi\sqrt{\frac{I}{mgd}}$ | Rigid body about a pivot; d is pivot-to-centre-of-mass distance, I about the pivot. The simple formula fails for a rod or a hoop. |
| Position and velocity in SHM | $x = A\cos(\omega t + \phi),\quad v = -A\omega\sin(\omega t + \phi)$ | Phase phi is fixed by initial conditions. Amplitude A must be in metres. |
| Maximum speed and acceleration | $v_{max} = A\omega,\quad a_{max} = A\omega^{2}$ | v_max at x = 0, a_max at x = A. Neither occurs at the ends of the motion together with the other. |
| Total mechanical energy in SHM | $E = \frac{1}{2}kA^{2} = \frac{1}{2}mv_{max}^{2}$ | Constant. KE = PE at x = A/sqrt(2), not at A/2. |
| Speed of a wave on a string | $v = \sqrt{\frac{T_{tension}}{\mu}}$ | mu is mass per unit length in kg/m: g/m must be divided by 1000. Independent of frequency. |
| Universal wave relation | $v = f\lambda$ | Frequency is set by the source and does not change on entering a new medium; wavelength does. |
| Harmonics of a string fixed at both ends | $f_n = \frac{nv}{2L},\quad \lambda_n = \frac{2L}{n}$ | n = 1, 2, 3, ... gives all integer multiples. A pipe open at both ends follows the same series. |
| Beat frequency | $f_{beat} = \lvert f_1 - f_2 \rvert$ | Two superposed tones of close frequency. Beats are the difference, never the sum. |

## Worked Problems

### P1. A $0.500\ \mathrm{kg}$ block on a frictionless surface is attached to a spring of constant $200\ \mathrm{N/m}$. Find the angular frequency, the period, and the total energy if the amplitude is $4.00\ \mathrm{cm}$.

**Given:** $m = 0.500\ \mathrm{kg}$; $k = 200\ \mathrm{N/m}$; $A = 4.00\ \mathrm{cm}$

**Solution:**

1. $\omega = \sqrt{k/m} = \sqrt{200/0.500} = \sqrt{400} = 20.0\ \mathrm{rad/s}$
2. $T = 2\pi/\omega = 6.283/20.0 = 0.314\ \mathrm{s}$
3. Convert amplitude: $A = 4.00\ \mathrm{cm} = 0.0400\ \mathrm{m}$
4. $E = \frac{1}{2}kA^2 = (0.5)(200)(0.0400)^2 = (100)(1.60\times10^{-3}) = 0.160\ \mathrm{J}$

> [!success]- Answer
> **$\omega = 20.0\ \mathrm{rad/s}$, $T = 0.314\ \mathrm{s}$, $E = 0.160\ \mathrm{J}$.**

> [!warning] Trap
> Leaving the amplitude in centimetres in $E = \frac{1}{2}kA^2$. The energy then comes out $10^{4}$ times too large ($1600\ \mathrm{J}$ instead of $0.160\ \mathrm{J}$), because the amplitude is squared.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(200÷0.500)` → $\omega$ = **20.0** rad/s; `2π÷Ans` → $T$ = **0.314** s.
> 2. `0.5×200×0.0400²` → $E$ = **0.160** J; feeding 4.00 cm instead of 0.0400 m inflates it to **1600** J.

### P2. An object oscillates in SHM with amplitude $4.00\ \mathrm{cm}$ and frequency $2.00\ \mathrm{Hz}$. Find its maximum speed and maximum acceleration.

**Given:** $A = 4.00\ \mathrm{cm}$; $f = 2.00\ \mathrm{Hz}$

**Solution:**

1. Convert: $A = 0.0400\ \mathrm{m}$
2. $\omega = 2\pi f = 2\pi(2.00) = 12.57\ \mathrm{rad/s}$
3. $v_{max} = A\omega = (0.0400)(12.57) = 0.503\ \mathrm{m/s}$
4. $a_{max} = A\omega^{2} = (0.0400)(12.57)^2 = (0.0400)(158.0) = 6.32\ \mathrm{m/s^2}$

> [!success]- Answer
> **$v_{max} = 0.503\ \mathrm{m/s}$ and $a_{max} = 6.32\ \mathrm{m/s^2}$.**

> [!warning] Trap
> Using $f$ directly in $v_{max} = Af = 0.0800\ \mathrm{m/s}$. The correct factor is $\omega = 2\pi f$, so the mistake understates both answers by about 6.28 times.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×2.00` → $\omega$ = **12.57** rad/s; `0.0400×Ans` → $v_{max}$ = **0.503** m/s.
> 2. `0.0400×12.57²` → $a_{max}$ = **6.32** m/s²; using $f$ for $\omega$ gives **0.0800** m/s, 2π times too small.

### P3. A block of mass $0.900\ \mathrm{kg}$ on a spring oscillates with a period of $0.400\ \mathrm{s}$. Find the spring constant, then the new period when $0.500\ \mathrm{kg}$ is added.

**Given:** $m_1 = 0.900\ \mathrm{kg}$; $T_1 = 0.400\ \mathrm{s}$; $m_2 = 1.400\ \mathrm{kg}$

**Solution:**

1. Square the period relation: $T^2 = 4\pi^2 m/k$, so $k = 4\pi^2 m_1/T_1^{2}$
2. $k = 4\pi^2(0.900)/(0.400)^2 = 35.53/0.160 = 222\ \mathrm{N/m}$
3. With the added mass, $m_2 = 0.900 + 0.500 = 1.400\ \mathrm{kg}$
4. $T_2 = 2\pi\sqrt{m_2/k} = 2\pi\sqrt{1.400/222} = 2\pi(0.0794) = 0.499\ \mathrm{s}$
5. Cross-check by ratio: $T_2 = T_1\sqrt{m_2/m_1} = 0.400\sqrt{1.556} = 0.499\ \mathrm{s}$

> [!success]- Answer
> **$k \approx 2.22\times10^{2}\ \mathrm{N/m}$ and $T_2 \approx 0.499\ \mathrm{s}$.**

> [!warning] Trap
> Scaling the period linearly with mass and answering $T_2 = 0.400(1.556) = 0.622\ \mathrm{s}$. The period goes as the square root of mass, so a $56\%$ mass increase costs only about $25\%$ in period.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4π²×0.900÷0.400²` → $k$ = **222** N/m, from the squared period relation $T^2 = 4\pi^2 m/k$.
> 2. `2π×√(1.400÷222)` → $T_2$ = **0.499** s; the ratio check `0.400×√(1.400÷0.900)` agrees.

### P4. A steel guitar wire is $0.800\ \mathrm{m}$ long with a mass of $2.00\ \mathrm{g}$ and is under a tension of $400\ \mathrm{N}$. Find the speed of a transverse wave on it and the frequency of its fundamental mode.

**Given:** $L = 0.800\ \mathrm{m}$; $m = 2.00\ \mathrm{g}$; $T_{tension} = 400\ \mathrm{N}$

**Solution:**

1. Linear density: $\mu = m/L = (2.00\times10^{-3}\ \mathrm{kg})/(0.800\ \mathrm{m}) = 2.50\times10^{-3}\ \mathrm{kg/m}$
2. $v = \sqrt{T/\mu} = \sqrt{400/2.50\times10^{-3}} = \sqrt{1.60\times10^{5}}$
3. $v = 400\ \mathrm{m/s}$
4. Fundamental: $f_1 = v/(2L) = 400/(2\times0.800) = 250\ \mathrm{Hz}$

> [!success]- Answer
> **$v = 4.00\times10^{2}\ \mathrm{m/s}$ and $f_1 = 250\ \mathrm{Hz}$.**

> [!warning] Trap
> Substituting the mass in grams for $\mu$ without dividing by the length, or using $\mu = 2.00\ \mathrm{g/m}$. Mixing grams with newtons gives a wave speed too small by $\sqrt{1000}\approx32$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.00E-3÷0.800` → $\mu$ = **2.50E-3** kg/m — grams to kilograms before dividing by the length.
> 2. `√(400÷2.50E-3)` → $v$ = **400** m/s; `Ans÷(2×0.800)` → $f_1$ = **250** Hz.

### P5. A string $0.800\ \mathrm{m}$ long is fixed at both ends and vibrates in its fundamental mode at $150\ \mathrm{Hz}$. Find the wave speed, the wavelength of the third harmonic, and the frequency of the third harmonic.

**Given:** $L = 0.800\ \mathrm{m}$; $f_1 = 150\ \mathrm{Hz}$; both ends fixed

**Solution:**

1. Fundamental wavelength: $\lambda_1 = 2L = 1.60\ \mathrm{m}$
2. Wave speed: $v = f_1\lambda_1 = (150)(1.60) = 240\ \mathrm{m/s}$
3. Third harmonic: $\lambda_3 = 2L/3 = 1.60/3 = 0.533\ \mathrm{m}$
4. $f_3 = 3f_1 = 3(150) = 450\ \mathrm{Hz}$; check with $v/\lambda_3 = 240/0.533 = 450\ \mathrm{Hz}$

> [!success]- Answer
> **$v = 240\ \mathrm{m/s}$, $\lambda_3 = 0.533\ \mathrm{m}$, $f_3 = 450\ \mathrm{Hz}$.**

> [!warning] Trap
> Using $\lambda_1 = L$ instead of $2L$. That treats the string as if only one end were fixed, which halves the wavelength and doubles the wave speed.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×0.800` → $\lambda_1$ = **1.60** m; `150×1.60` → $v$ = **240** m/s.
> 2. `1.60÷3` → $\lambda_3$ = **0.533** m; `3×150` → $f_3$ = **450** Hz, confirmed by `240÷0.533`.

## Traps & Exam Notes

- **Treating $\omega$ and $f$ as interchangeable.** $v_{max} = A\omega$, not $Af$. Every velocity and acceleration answer is off by $2\pi\approx6.28$.
- **Putting the amplitude into the period.** $T = 2\pi\sqrt{m/k}$ has no $A$; doubling the amplitude doubles the energy and quadruples the maximum acceleration, but leaves $T$ unchanged.
- **Using the simple pendulum formula on a rigid body.** A metre stick pivoted at one end has $T = 2\pi\sqrt{2L/3g}$, not $2\pi\sqrt{L/g}$; the point-mass assumption fails and the answer is wrong by about $18\%$.
- **Claiming $KE = PE$ at half the amplitude.** Energy is quadratic, so the crossover is at $x = A/\sqrt{2}\approx0.707A$; at $x = A/2$ the potential energy is only one quarter of the total.
- **Mixing $\mu$ in g/m with tension in N.** $v = \sqrt{T/\mu}$ needs $\mathrm{kg/m}$. A wire listed as $2.5\ \mathrm{g/m}$ used raw gives a wave speed about 32 times too small.
- **Assuming frequency changes with the medium.** Crossing into a new medium changes $v$ and $\lambda$ but never $f$; that invariance is why refraction does not change a light's colour.
- **Confusing harmonics with overtones.** Harmonics are all integer multiples $n = 1, 2, 3,\dots$; the first overtone is the second harmonic. Off-by-one errors here are the whole item.
- **Reporting the sum instead of the difference for beats.** Beats come from $|f_1 - f_2|$; two forks at $440$ and $444\ \mathrm{Hz}$ beat at $4\ \mathrm{Hz}$, not $884\ \mathrm{Hz}$.

## See Also

- [[14_Sound_and_Doppler]]
- [[03_Work,_Energy_and_Conservation]]
- [[15_Reflection_and_Refraction]]
- [[16_Lenses_and_Mirrors]]
- [[_MOC_University_Physics]]

---

[[12_Second_Law,_Entropy_and_Carnot|⬅ 12]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · [[14_Sound_and_Doppler|14 ➡]]
