---
id: ECE-07-07
title: "Active Filter Responses"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Phasors_and_Complex_Impedance]]", "[[11_First_Order_RC_and_RL_Transients]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Active Filter Responses

> [!abstract] Scope
> Read a filter's transfer function and predict its cutoff frequency, roll-off slope, damping, peaking and phase from the pole positions rather than from the component list.

## Core Concept

> [!tip] Intuition
> Every active filter is a set of poles placed in the s-plane. The pole distance from the origin sets the corner frequency, the angle sets the damping, and the number of poles sets how fast the response falls away. Once you can read a denominator, you can predict the Bode plot without simulating anything.

**First-order shapes.** One resistor and one capacitor produce a single pole, and every first-order filter is the same response moved around the frequency axis: a low-pass is $H(s) = K/(1+s/\omega_c)$ with $\omega_c = 1/(RC)$, and a high-pass is $H(s) = K(s/\omega_c)/(1+s/\omega_c)$. At $f_c$ the magnitude is $0.707K$ — the famous $\mathrm{-3\ \mathrm{dB}}$ point — and the phase is $-45^\circ$ for the low-pass, approaching $0^\circ$ and $-90^\circ$ at the extremes. One pole means a roll-off of 20 dB per decade, which is 6 dB per octave; the two figures are often confused, and a factor of 3.3 error follows.

**Second-order and the meaning of Q.** Two poles give the standard form $H(s) = K\omega_0^2/(s^2 + (\omega_0/Q)s + \omega_0^2)$. The damping ratio is $\zeta = 1/(2Q)$, so the same circuit can be described two ways and mixing them up is a classic error: Butterworth is $Q = 0.707$ *and* $\zeta = 0.707$, not $\zeta = 1.414$. The response at $f_0$ depends entirely on Q: for $Q = 0.5$ the magnitude is $Q = 0.5$ (that is $-6\ \mathrm{dB}$, well below the $-3\ \mathrm{dB}$ point), for $Q = 0.707$ it is exactly $-3\ \mathrm{dB}$, and for $Q > 0.707$ it *peaks* above the passband level.

**Peaking and ringing.** The peak exists only for $Q > 1/\sqrt2$, occurs at $f_p = f_0\sqrt{1-1/(2Q^2)}$ — slightly below $f_0$ — and has magnitude $M_p = Q/\sqrt{1-1/(4Q^2)}$, which is about $Q$ for large Q. A second-order low-pass with $Q = 5$ therefore peaks $14\ \mathrm{dB}$ above the DC gain at 0.99 $f_0$, and the same high Q produces a ringing step response with an overshoot of $\exp(-\pi\zeta/\sqrt{1-\zeta^2})$. Filter tables specify Q for exactly this reason: Butterworth is maximally flat in magnitude ($Q = 0.7071$), Bessel gives the flattest group delay but a slower transition ($Q = 0.5774$), and Chebyshev trades ripple for a steeper skirt (Q rising with ripple, 0.86 at 0.5 dB and 1.31 at 3 dB).

**Band-pass, band-stop and the Bode picture.** A band-pass is described by its two $-3\ \mathrm{dB}$ edges: $f_0 = \sqrt{f_Lf_H}$ (the geometric, not arithmetic, centre), $BW = f_H - f_L$ and $Q = f_0/BW$. A narrow filter therefore has a high Q and a long settling time, and the standard band-pass has a peak gain of exactly K at $f_0$ — the Q formula that gives peak gain does not apply to it, only to the low-pass. A notch is the complement: the numerator zero pair $s^2+\omega_0^2$ cancels almost all of the response at $f_0$, and a high-Q notch is very narrow but takes many cycles to settle. On a Bode plot, magnitude slopes and phase shifts are linked: a first-order section contributes $0^\circ$ to $-90^\circ$ with $-45^\circ$ at $f_c$, and an $n$-pole filter approaches $-90n^\circ$.

**What the ideal response ignores.** An op-amp's finite gain-bandwidth moves both $f_0$ and Q: the feedback that sets Q is itself frequency-dependent, so a Sallen-Key stage designed for $Q = 5$ can realize $Q = 3$ or $Q = 9$ depending on the op-amp. A practical design rule is $GBW \ge 100f_0Q$, which for a 10 kHz, $Q = 5$ stage demands 5 MHz — well beyond a 741. Component tolerance matters far more at high Q, because the sensitivity of Q to the gain-setting resistors grows with Q itself. And a filter designed from the asymptotes alone will be wrong at the corner: the $\mathrm{-3\ \mathrm{dB}}$ point of two cascaded buffered first-order sections is $0.6436f_c$, not $f_c$, and the cascade is already $-6\ \mathrm{dB}$ at $f_c$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| First-order low-pass | $H(s) = \frac{K}{1 + s/\omega_c},\quad \omega_c = \frac{1}{RC}$ | One pole. Passband gain K, corner f_c = 1/(2 pi RC). |
| Magnitude and phase at cutoff | $\lvert H(f_c)\rvert = \frac{K}{\sqrt2} = 0.707K,\quad \phi = -45^\circ$ | The -3 dB point of a first-order section; the asymptotes cross at f_c but the real curve is 3 dB down there. |
| Roll-off per pole | $-20\ \mathrm{dB/decade} = -6\ \mathrm{dB/octave}$ | Both describe one pole. A second-order filter falls at 40 dB/decade; writing 6 dB/decade understates by 3.3x. |
| First-order high-pass | $H(s) = \frac{K\,s/\omega_c}{1 + s/\omega_c}$ | Same corner and slope as the low-pass, mirrored about f_c; DC gain is zero. |
| Second-order standard form | $H(s) = \frac{K\omega_0^2}{s^2 + (\omega_0/Q)s + \omega_0^2}$ | The canonical two-pole low-pass; f_0 and Q fully describe the shape. Second-order high-pass and band-pass use the same denominator. |
| Second-order low-pass magnitude | $\lvert H\rvert = \frac{K}{\sqrt{(1-(f/f_0)^2)^2 + (f/(Qf_0))^2}}$ | At f = f_0 the magnitude simplifies to exactly QK, which is why Q = 0.5 gives -6 dB. |
| Damping ratio | $\zeta = \frac{1}{2Q}$ | Q = 1/(2 zeta). Butterworth has Q = 0.7071 and zeta = 0.7071 - the two are not reciprocal. |
| Peaking frequency and magnitude | $f_p = f_0\sqrt{1-\frac{1}{2Q^2}},\quad M_p = \frac{Q}{\sqrt{1-\frac{1}{4Q^2}}}$ | Exists only for Q > 0.7071. For high Q, M_p is approximately Q, and the peak sits just below f_0. |
| Band-pass parameters | $f_0 = \sqrt{f_Lf_H},\quad BW = f_H - f_L,\quad Q = \frac{f_0}{BW}$ | f_0 is the geometric mean of the -3 dB edges, not the arithmetic mean; a narrow band means a high Q and slow settling. |
| Band-stop (notch) | $H(s) = K\frac{s^2+\omega_0^2}{s^2+(\omega_0/Q)s+\omega_0^2}$ | Ideal null at f_0, with width set by Q. A high-Q notch is very narrow but rings for many cycles after a transient. |

## Worked Problems

### P1. A first-order active low-pass filter uses $R = 1.59\ \mathrm{k\Omega}$ and $C = 0.1\ \mu\mathrm{F}$ with a passband gain of 1. Find its cutoff frequency and its gain at $10\ \mathrm{kHz}$.

**Given:** R = 1.59 kohm; C = 0.1 uF; K = 1; f = 10 kHz

**Solution:**

1. RC = 1.59e3 x 1e-7 = 1.59e-4 s
2. f_c = 1/(2 pi RC) = 1/(2 pi x 1.59e-4) = 1001 Hz
3. At 10 kHz: f/f_c = 10000/1001 = 9.990
4. |H| = 1/sqrt(1 + 99.80) = 1/10.04 = 0.0996
5. Gain in dB = 20 log(0.0996) = -20.0 dB

> [!success]- Answer
> **$f_c \approx 1.00\ \mathrm{kHz}$; the gain at $10\ \mathrm{kHz}$ is $-20.0\ \mathrm{dB}$, one decade of roll-off.**

> [!warning] Trap
> Reading the asymptote instead of the curve at the corner. At exactly $f_c$ the response is $-3\ \mathrm{dB}$, not $0\ \mathrm{dB}$, and at $10f_c$ it is $-20\ \mathrm{dB}$, not $-20$ times anything.

### P2. A second-order Butterworth low-pass has $f_0 = 1\ \mathrm{kHz}$ and unity passband gain. Find its attenuation at $3\ \mathrm{kHz}$ and at $10\ \mathrm{kHz}$, and compare the $3\ \mathrm{kHz}$ figure with a first-order filter of the same cutoff.

**Given:** f_0 = 1 kHz; Q = 0.7071; K = 1; f = 3 kHz and 10 kHz

**Solution:**

1. At f = 10 kHz: f/f_0 = 10, so |H| = 1/sqrt(1 + 10^4) = 1/100.005 = 0.0099995, that is -40.0 dB
2. At f = 3 kHz: f/f_0 = 3, so |H| = 1/sqrt(1 + 81) = 1/9.0554 = 0.11043, that is -19.1 dB
3. First-order at 3 kHz: |H| = 1/sqrt(1 + 9) = 0.3162, that is -10.0 dB
4. The second pole adds about 9 dB of attenuation at 3 kHz and 20 dB at 10 kHz

> [!success]- Answer
> **$-19.1\ \mathrm{dB}$ at $3\ \mathrm{kHz}$ and $-40.0\ \mathrm{dB}$ at $10\ \mathrm{kHz}$; the first-order filter gives only $-10.0\ \mathrm{dB}$ at $3\ \mathrm{kHz}$.**

> [!warning] Trap
> Scaling a single-pole answer by the number of poles. The 40 dB/decade figure is asymptotic; at $3f_0$ a two-pole Butterworth is only 19 dB down, not 29 dB, because the response has not reached its asymptote.

### P3. A band-pass filter has $-3\ \mathrm{dB}$ edges at $900\ \mathrm{Hz}$ and $1100\ \mathrm{Hz}$. Find its centre frequency, bandwidth, Q and damping ratio.

**Given:** f_L = 900 Hz; f_H = 1100 Hz

**Solution:**

1. Geometric centre: f_0 = sqrt(900 x 1100) = sqrt(990000) = 994.99 Hz
2. Bandwidth: BW = 1100 - 900 = 200 Hz
3. Q = f_0/BW = 994.99/200 = 4.975
4. zeta = 1/(2Q) = 1/9.9499 = 0.1005

> [!success]- Answer
> **$f_0 = 995\ \mathrm{Hz}$, $BW = 200\ \mathrm{Hz}$, $Q = 4.97$, $\zeta = 0.100$.**

> [!warning] Trap
> Using the arithmetic mean $(900+1100)/2 = 1000\ \mathrm{Hz}$ as the centre. The $-3\ \mathrm{dB}$ edges are geometrically symmetric, so the true centre is 995 Hz, and for wide-band filters the arithmetic mean is badly wrong.

### P4. A second-order low-pass has $f_0 = 1\ \mathrm{kHz}$ and $Q = 5$. Find the peak frequency, the peak magnitude in dB, and the response at DC and at $f_0$.

**Given:** f_0 = 1 kHz; Q = 5; K = 1

**Solution:**

1. Peak frequency: f_p = f_0 sqrt(1 - 1/(2Q^2)) = 1000 x sqrt(1 - 0.02) = 989.9 Hz
2. Peak magnitude: M_p = Q/sqrt(1 - 1/(4Q^2)) = 5/sqrt(0.99) = 5.025
3. In dB: 20 log(5.025) = +14.0 dB
4. At DC the gain is 1 (0 dB); at f_0 the magnitude is exactly Q = 5, which is +14.0 dB as well

> [!success]- Answer
> **$f_p = 990\ \mathrm{Hz}$ with a peak of $+14.0\ \mathrm{dB}$; the DC gain is $0\ \mathrm{dB}$ and the response at $f_0$ is also $+14\ \mathrm{dB}$.**

> [!warning] Trap
> Assuming a second-order low-pass is monotonic. Any $Q > 0.7071$ peaks, and at $Q = 5$ the output at 990 Hz is five times the DC gain — an amplifier, not an attenuator, over that band.

### P5. A first-order active high-pass filter uses $R = 10\ \mathrm{k\Omega}$ and $C = 0.01\ \mu\mathrm{F}$ with unit passband gain. Find $f_c$ and the gain one decade below and one decade above it.

**Given:** R = 10 kohm; C = 0.01 uF; K = 1

**Solution:**

1. RC = 1e4 x 1e-8 = 1e-4 s
2. f_c = 1/(2 pi x 1e-4) = 1591.5 Hz
3. One decade below (159.15 Hz): |H| = 0.1/sqrt(1 + 0.01) = 0.0995, that is -20.0 dB
4. One decade above (15.915 kHz): |H| = 10/sqrt(1 + 100) = 0.9950, that is -0.04 dB

> [!success]- Answer
> **$f_c = 1.59\ \mathrm{kHz}$; $-20.0\ \mathrm{dB}$ a decade below and $-0.04\ \mathrm{dB}$ a decade above.**

> [!warning] Trap
> Applying the low-pass formula $1/\sqrt{1+(f/f_c)^2}$ to a high-pass. The high-pass magnitude is $(f/f_c)/\sqrt{1+(f/f_c)^2}$, which tends to 1 at high frequency instead of to 0.

## Traps & Exam Notes

- **Assuming cascaded first-order sections keep the same cutoff.** Two buffered identical RC sections have their $-3\ \mathrm{dB}$ point at $0.6436f_c$ and are already $-6\ \mathrm{dB}$ at $f_c$; the corner moves because the magnitudes multiply, not add.
- **Treating $\zeta$ and $Q$ as reciprocals.** $Q = 1/(2\zeta)$, so Butterworth is $Q = 0.7071$ and $\zeta = 0.7071$. Writing $\zeta = 1.414$ for Butterworth describes an overdamped filter that is 3 dB down far below $f_0$.
- **Assuming a second-order low-pass is monotonic.** Any $Q$ above 0.7071 peaks: at $Q = 5$ the peak is $+14\ \mathrm{dB}$ at 0.99 $f_0$, which is a gain, not an attenuation.
- **Confusing 6 dB/decade with 6 dB/octave.** One pole is 20 dB/decade *or* 6 dB/octave; quoting 6 dB/decade understates the roll-off by a factor of 3.3.
- **Reading the Bode asymptotes at the corner.** The asymptotes cross at $f_c$ but the real response is $-3\ \mathrm{dB}$ there for a first-order section and depends on Q for a second-order one.
- **Using the arithmetic mean for a band-pass centre.** $f_0 = \sqrt{f_Lf_H}$, not $(f_L+f_H)/2$; the two differ by 0.5% for a narrow filter but by tens of percent for an octave-wide one.
- **Ignoring the op-amp's finite gain-bandwidth.** The feedback network that sets Q is frequency-dependent, so a stage designed for $Q = 5$ can realize a very different Q; the working rule is $GBW \ge 100f_0Q$.

## See Also

- [[08_Sallen-Key_Filter_Design]]
- [[11_Frequency_Response_and_Bode_Plots]]
- [[07_Series_Resonance]]
- [[06_Filters,_Ripple_Factor_and_PIV]]

---

[[06_Precision_Rectifiers|⬅ 06]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Sallen-Key_Filter_Design|08 ➡]]
