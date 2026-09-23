---
id: EST-05-04
title: "Reflection Coefficient and VSWR"
part: "04_EST"
area: "05_Transmission_Lines_and_Waveguides"
topic: 4
tier: 1
depth: full
problem_count: 9
prereqs: ["[[02_Secondary_Constants_Z0_and_Gamma]]"]
tags: ["ece", "est", "transmission_lines_and_waveguides"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Reflection Coefficient and VSWR

> [!abstract] Scope
> Compute the load reflection coefficient, VSWR, return loss and mismatch loss for a terminated line, recover the load from a measured VSWR, and rotate the reflection coefficient along the line.

## Core Concept

> [!tip] Intuition
> At any impedance discontinuity the incident wave cannot hand over all of its power, so the surplus travels back. The reflection coefficient says how much comes back and with what phase; VSWR is the standing-wave pattern that amount of reflection paints on the line.

**The reflection coefficient is the load's answer to the line.** Whenever the load impedance differs from $Z_0$ the incident wave cannot deliver all its power, and the surplus must travel back toward the generator. The load reflection coefficient is the complex ratio of the reflected voltage wave to the incident voltage wave: $$\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}.$$ It is a *complex* quantity with a magnitude and an angle, not merely a number to be made small. For any passive load ($\mathrm{Re}\,Z_L \ge 0$) its magnitude satisfies $0 \le |\Gamma| \le 1$: $\Gamma = 0$ is a perfect match, $\Gamma = -1$ is a short circuit, $\Gamma = +1$ is an open circuit. Because $Z_0$ is real on a practical line, only a purely reactive load can give $|\Gamma| = 1$.

**VSWR is the standing-wave picture of the same fact.** The incident and reflected waves interfere, producing a fixed spatial pattern of voltage maxima and minima. The voltage standing-wave ratio is the ratio of a maximum to the adjacent minimum: $$\mathrm{VSWR} = \frac{1 + |\Gamma|}{1 - |\Gamma|}, \qquad |\Gamma| = \frac{\mathrm{VSWR} - 1}{\mathrm{VSWR} + 1}.$$ Three consequences follow immediately. VSWR is a ratio of magnitudes, so it is **real and can never be less than 1** ($\mathrm{VSWR} = 1$ is a perfect match, $\mathrm{VSWR} \to \infty$ is total reflection). VSWR carries no phase information, so one VSWR value corresponds to an entire circle of possible loads. And the pattern repeats every $\lambda/2$, with each maximum exactly $\lambda/4$ from the neighbouring minimum.

**Power, return loss and mismatch loss are three different numbers.** With $P_i$ the incident power, the reflected power is $|\Gamma|^2 P_i$ and the power actually delivered to the load is $(1 - |\Gamma|^2)P_i$. Return loss quantifies the *reflected* wave, $\mathrm{RL} = -20\log_{10}|\Gamma|$ dB — a positive dB number for any real mismatch, so $|\Gamma| = 0.1$ is $20$ dB of return loss. The penalty on the *forward* power is:
$$\mathrm{ML} = -10\log_{10}(1 - |\Gamma|^2)\ \mathrm{dB}$$
A VSWR of $2$ gives $|\Gamma| = 1/3$, a return loss of $9.54$ dB, a reflected-power fraction of $11.1\%$ and a mismatch loss of only $0.51$ dB. Keep the three apart: they answer different questions.

**The reflection coefficient rotates as you walk down the line.** On a lossless line its magnitude is the same at every plane and only the phase changes: $$\Gamma(l) = \Gamma_L\,e^{-2j\beta l},$$ with $l$ measured from the load toward the generator and $\beta = 2\pi/\lambda$. The impedance at any plane then follows from $$Z(l) = Z_0\,\frac{1 + \Gamma(l)}{1 - \Gamma(l)}.$$ This one pair of relations is the entire basis of the Smith chart: the chart *is* the $\Gamma$ plane with an impedance grid drawn over it, and moving along the line is rotation about the centre. Note the factor of $2$ in the exponent — a full $360^\circ$ revolution corresponds to $\lambda/2$, not $\lambda$.

**Where the simple picture fails.** These relations assume a single discontinuity on a uniform, lossless line with a real $Z_0$. On a lossy line $|\Gamma|$ decays as $e^{-2\alpha l}$, so the VSWR measured at the generator is optimistic and says nothing directly about the load — the load-side value must be recovered by rotating the loss back in. With several discontinuities the reflections re-reflect and a single VSWR no longer describes the line at all. Complex $Z_0$ (a lossy line at low frequency) makes the load formula itself awkward. And VSWR is not an efficiency: $\mathrm{VSWR} = 1.5$ wastes only $4\%$ of the power, yet the standing wave can still raise the voltage at a transmitter output stage past its breakdown rating.

## Derivation

**Start from the boundary condition at the load.** Let the line have characteristic impedance $Z_0$ and the load $Z_L$. At the load plane write the total voltage and current as the sum of an incident and a reflected travelling wave: $$V = V^+ + V^-, \qquad I = \frac{V^+}{Z_0} - \frac{V^-}{Z_0}.$$ The minus sign on the current wave is not optional — the reflected wave travels the other way, so its current is negative with respect to the reference direction. The load demands $V/I = Z_L$, so $$\frac{V^+ + V^-}{V^+ - V^-}\,Z_0 = Z_L \;\Rightarrow\; Z_0(V^+ + V^-) = Z_L(V^+ - V^-).$$ Collecting terms, $V^-(Z_0 + Z_L) = V^+(Z_L - Z_0)$, hence $$\Gamma_L = \frac{V^-}{V^+} = \frac{Z_L - Z_0}{Z_L + Z_0}.$$

**Superpose the two waves to obtain VSWR.** At a distance $l$ from the load toward the generator the reflected wave has accumulated phase $-2\beta l$, so $$V(l) = V^+\left(e^{-j\beta l} + \Gamma_L\,e^{+j\beta l}\right).$$ The magnitude is largest where the two terms add in phase and smallest where they cancel: $$V_{max} = |V^+|\left(1 + |\Gamma|\right), \qquad V_{min} = |V^+|\left(1 - |\Gamma|\right).$$ Dividing one by the other, $$\mathrm{VSWR} = \frac{V_{max}}{V_{min}} = \frac{1 + |\Gamma|}{1 - |\Gamma|}.$$ Only $|\Gamma|$ survives, which is exactly why VSWR cannot distinguish $Z_L = 100\ \Omega$ from $Z_L = 25\ \Omega$ on a $50\ \Omega$ line.

**Split the power and define the two loss figures.** The incident power is $P_i = |V^+|^2/(2Z_0)$ and the reflected power is $P_r = |V^-|^2/(2Z_0) = |\Gamma|^2 P_i$. The fraction delivered to the load is therefore $1 - |\Gamma|^2$, so the mismatch loss is $$\mathrm{ML} = -10\log_{10}\left(1 - |\Gamma|^2\right).$$ Expressed as a wave ratio rather than a power ratio, the same shortfall is the return loss $$\mathrm{RL} = -20\log_{10}|\Gamma|.$$ The two differ by more than a factor of two in form and by much more in value: at $\mathrm{VSWR} = 2$ the return loss is $9.54$ dB while the actual power penalty is $0.51$ dB.

**Rotation reproduces the transmission-line impedance equation.** Substituting $\Gamma(l) = \Gamma_L e^{-2j\beta l}$ into $Z = Z_0(1+\Gamma)/(1-\Gamma)$ and clearing fractions gives $$Z(l) = Z_0\,\frac{Z_L + jZ_0\tan\beta l}{Z_0 + jZ_L\tan\beta l},$$ the standard input-impedance relation. This is the consistency check that proves the chart method and the algebraic method are the same method. It also explains the chart's wavelength scales: since the exponent contains $2\beta l = 4\pi l/\lambda$, a full $2\pi$ revolution needs $l = \lambda/2$, and every $\lambda/8$ of line moves the point by $90^\circ$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Load reflection coefficient | $\Gamma_L = \frac{Z_L - Z_0}{Z_L + Z_0}$ | Complex. Z_0 real for a practical line; passive loads give \|Gamma\| <= 1. |
| VSWR from reflection coefficient | $\mathrm{VSWR} = \frac{1 + \lvert \Gamma \rvert}{1 - \lvert \Gamma \rvert}$ | Uses \|Gamma\| only. Real, and never less than 1. Infinite at total reflection. |
| Reflection coefficient from VSWR | $\lvert \Gamma \rvert = \frac{\mathrm{VSWR} - 1}{\mathrm{VSWR} + 1}$ | Gives magnitude only; the angle must come from the position of a maximum or minimum. |
| Reflection coefficient at distance l | $\Gamma(l) = \Gamma_L e^{-2j\beta l}$ | l measured from the load toward the generator. Full turn per lambda/2, not per lambda. |
| Impedance from reflection coefficient | $Z(l) = Z_0 \frac{1 + \Gamma(l)}{1 - \Gamma(l)}$ | Exact for a lossless line of real Z_0. |
| Return loss | $\mathrm{RL} = -20\log_{10}\lvert \Gamma \rvert$ | Voltage ratio, so 20 log. Positive dB for any mismatch; 0 dB at total reflection. |
| Reflected power fraction | $\frac{P_r}{P_i} = \lvert \Gamma \rvert^2$ | Power goes as the square of the voltage ratio. 11.1% at VSWR = 2. |
| Mismatch loss | $\mathrm{ML} = -10\log_{10}\left(1 - \lvert \Gamma \rvert^2\right)$ | Power ratio, so 10 log. Only 0.51 dB at VSWR = 2 - do not confuse with return loss. |
| Standing-wave extremes | $V_{max} = \lvert V^+ \rvert(1 + \lvert \Gamma \rvert), \quad V_{min} = \lvert V^+ \rvert(1 - \lvert \Gamma \rvert)$ | Maxima every lambda/2; a maximum and the adjacent minimum are lambda/4 apart. |
| Distances to the extremes | $l_{max} = \frac{\lambda}{4\pi}\theta_\Gamma, \qquad l_{min} = l_{max} \pm \frac{\lambda}{4}$ | theta_Gamma is the angle of Gamma_L in radians, measured from the positive real axis. |
| Terminal extremes of Gamma | $\Gamma = -1 \ (\mathrm{short}), \quad \Gamma = +1 \ (\mathrm{open}), \quad \Gamma = 0 \ (\mathrm{matched})$ | Short and open both give VSWR = infinity and 0 dB return loss; only the sign separates them. |
| Lossy-line decay | $\lvert \Gamma(l) \rvert = \lvert \Gamma_L \rvert e^{-2\alpha l}$ | Generator-side VSWR is lower than load-side. alpha in Np/m. |

## Interactive Widget

**VSWR and Gamma Explorer**

![[VSWR_and_Gamma_Explorer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A $50\ \Omega$ lossless line is terminated in a $100\ \Omega$ resistor. Find $\Gamma_L$, the VSWR, the return loss and the mismatch loss.

**Given:** $Z_0 = 50\ \Omega$; $Z_L = 100\ \Omega$, purely resistive; lossless line

**Solution:**

1. $\Gamma_L = \dfrac{Z_L - Z_0}{Z_L + Z_0} = \dfrac{100 - 50}{100 + 50}$
2. $= \dfrac{50}{150} = +0.3333$. The result is positive and real, so the voltage is maximum at the load
3. $\mathrm{VSWR} = \dfrac{1 + 0.3333}{1 - 0.3333} = \dfrac{1.3333}{0.6667} = 2.00$
4. $\mathrm{RL} = -20\log_{10}(0.3333) = 9.54\ \mathrm{dB}$
5. $\mathrm{ML} = -10\log_{10}\left(1 - 0.3333^2\right) = -10\log_{10}(0.8889) = 0.51\ \mathrm{dB}$

> [!success]- Answer
> **$\Gamma_L = +0.333$; $\mathrm{VSWR} = 2.00$; return loss $9.54$ dB; mismatch loss $0.51$ dB.**

> [!warning] Trap
> Reporting the power penalty as $9.54$ dB. Return loss is the *reflected* wave in dB; the actual loss of forward power is only $0.51$ dB.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(100−50)÷(100+50)` → **0.33333** — positive and real, so the voltage maximum sits at the load.
> 2. `(1+Ans)÷(1−Ans) : −20log(0.33333) : −10log(1−0.33333²)`
> 3. `=`: $\mathrm{VSWR}$ = **2.000** → return loss = **9.542** dB → mismatch loss = **0.512** dB.

### P2. The same $50\ \Omega$ line is now terminated in a $25\ \Omega$ resistor. Find $\Gamma_L$ and the VSWR, and explain why the answer looks familiar.

**Given:** $Z_0 = 50\ \Omega$; $Z_L = 25\ \Omega$

**Solution:**

1. $\Gamma_L = \dfrac{25 - 50}{25 + 50} = \dfrac{-25}{75} = -0.3333$
2. Take the magnitude: $|\Gamma| = 0.3333$
3. $\mathrm{VSWR} = \dfrac{1 + 0.3333}{1 - 0.3333} = 2.00$
4. The negative sign means the reflected voltage is inverted at the load, so a voltage *minimum* sits at the load rather than a maximum

> [!success]- Answer
> **$\Gamma_L = -0.333$; $\mathrm{VSWR} = 2.00$ — identical to the $100\ \Omega$ case, because VSWR depends only on $|\Gamma|$.**

> [!warning] Trap
> Carrying the sign into the VSWR formula and writing $(1-0.333)/(1+0.333) = 0.5$. VSWR is a ratio of magnitudes, so a value below $1$ is impossible and signals this exact mistake.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(25−50)÷(25+50)` → **−0.33333**.
> 2. Take the magnitude inside the formula: `(1+Abs(Ans))÷(1−Abs(Ans))` → **2.000** — identical to the 100 Ω load.
>
> Carrying the sign in gives 0.5, and a VSWR below 1 is the tell that $\lvert\Gamma\rvert$ was skipped.

### P3. A $50\ \Omega$ line is short-circuited at its far end. Find $\Gamma$, the VSWR and the return loss.

**Given:** $Z_0 = 50\ \Omega$; $Z_L = 0$ (short circuit)

**Solution:**

1. $\Gamma_L = \dfrac{0 - 50}{0 + 50} = -1.0$
2. $|\Gamma| = 1$
3. $\mathrm{VSWR} = \dfrac{1 + 1}{1 - 1} \to \infty$
4. $\mathrm{RL} = -20\log_{10}(1) = 0\ \mathrm{dB}$

> [!success]- Answer
> **$\Gamma = -1$; $\mathrm{VSWR} = \infty$; return loss $= 0$ dB (all incident power is reflected).**

> [!warning] Trap
> Writing the return loss as infinite because the VSWR is infinite. Return loss depends on $|\Gamma|$, and $|\Gamma| = 1$ gives $0$ dB — a *worse* return loss, not a better one.

### P4. A $50\ \Omega$ line feeds a purely reactive load $Z_L = j50\ \Omega$. Find $\Gamma$ and the VSWR, and state how much power the load absorbs.

**Given:** $Z_0 = 50\ \Omega$; $Z_L = j50\ \Omega$ (lossless reactance)

**Solution:**

1. $\Gamma_L = \dfrac{j50 - 50}{j50 + 50} = \dfrac{j - 1}{j + 1}$
2. Multiply numerator and denominator by the conjugate $(1 - j)$: $\dfrac{(j-1)(1-j)}{(1+j)(1-j)} = \dfrac{2j}{2}$
3. $\Gamma_L = +j1.0$, so $|\Gamma| = 1$ and $\angle\Gamma = +90^\circ$
4. $\mathrm{VSWR} \to \infty$, return loss $= 0$ dB, and the load absorbs $1 - |\Gamma|^2 = 0$ of the incident power

> [!success]- Answer
> **$\Gamma_L = +j1.0$; $\mathrm{VSWR} = \infty$; the load absorbs no power at all.**

> [!warning] Trap
> Expecting a finite VSWR because the reactance is "only" $50\ \Omega$ — numerically equal to $Z_0$. A purely reactive load gives $|\Gamma| = 1$ for *any* reactance value, since the numerator and denominator always have equal magnitude.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `MODE` `2`: `(i50−50)÷(i50+50)` → **0 + i1**, i.e. $\Gamma = +j1$ — its `Abs` is 1 and its `Arg` is **+90°** in Degree mode.
> 2. `Abs(Ans) : 1−Ans²` → **1** → **0**: the load absorbs none of the incident power, so $\mathrm{VSWR}$ → ∞ and the return loss = **0** dB.
>
> `i` is the `MODE` `2` imaginary unit (the note writes $j$). Any purely reactive load gives $\lvert\Gamma\rvert = 1$.

### P5. A $50\ \Omega$ line measures $\mathrm{VSWR} = 3$, and a voltage maximum is found right at the load terminals. Find $Z_L$.

**Given:** $Z_0 = 50\ \Omega$; $\mathrm{VSWR} = 3$; voltage maximum at the load plane

**Solution:**

1. $|\Gamma| = \dfrac{\mathrm{VSWR} - 1}{\mathrm{VSWR} + 1} = \dfrac{3 - 1}{3 + 1} = 0.5$
2. A maximum at the load means the incident and reflected voltages add in phase there, so $\Gamma$ is real and positive: $\Gamma_L = +0.5$
3. $Z_L = Z_0\dfrac{1 + \Gamma}{1 - \Gamma} = 50\dfrac{1.5}{0.5}$
4. $Z_L = 150\ \Omega$

> [!success]- Answer
> **$Z_L = 150\ \Omega$ (resistive).**

> [!warning] Trap
> Choosing $\Gamma = -0.5$ and answering $16.7\ \Omega$. VSWR fixes only the magnitude; the location of the maximum (or minimum) is what fixes the sign.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(3−1)÷(3+1)` → **0.5000**; a maximum at the load makes $\Gamma$ real and positive.
> 2. `50×(1+Ans)÷(1−Ans)` → **150** Ω.

### P6. A $50\ \Omega$ line measures $\mathrm{VSWR} = 3$ with a voltage *minimum* at the load. Find $Z_L$.

**Given:** $Z_0 = 50\ \Omega$; $\mathrm{VSWR} = 3$; voltage minimum at the load plane

**Solution:**

1. $|\Gamma| = \dfrac{3 - 1}{3 + 1} = 0.5$
2. A minimum at the load means the two waves cancel there, so $\Gamma_L = -0.5$
3. $Z_L = 50\dfrac{1 + (-0.5)}{1 - (-0.5)} = 50\dfrac{0.5}{1.5}$
4. $Z_L = 16.67\ \Omega$

> [!success]- Answer
> **$Z_L = 16.67\ \Omega$ (resistive).**

> [!warning] Trap
> Using the maximum formula and reporting $150\ \Omega$. Both loads give $\mathrm{VSWR} = 3$; the maximum/minimum statement is the only disambiguator, so read it carefully.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(3−1)÷(3+1)` → **0.5000**; a minimum at the load inverts the phasor, so $\Gamma = -0.5$.
> 2. `50×(1−Ans)÷(1+Ans)` → **16.67** Ω.

### P7. A load on a $50\ \Omega$ line measures a return loss of $20$ dB. Find $|\Gamma|$, the VSWR and the fraction of power reflected.

**Given:** $Z_0 = 50\ \Omega$; $\mathrm{RL} = 20\ \mathrm{dB}$

**Solution:**

1. $\mathrm{RL} = -20\log_{10}|\Gamma| = 20$, so $\log_{10}|\Gamma| = -1$
2. $|\Gamma| = 10^{-1} = 0.1$
3. $\mathrm{VSWR} = \dfrac{1 + 0.1}{1 - 0.1} = \dfrac{1.1}{0.9} = 1.222$
4. Reflected power fraction $= |\Gamma|^2 = 0.01 = 1\%$

> [!success]- Answer
> **$|\Gamma| = 0.1$; $\mathrm{VSWR} = 1.22$; $1\%$ of the power is reflected.**

> [!warning] Trap
> Reading $20$ dB as a power ratio of $100$, giving $|\Gamma| = 0.01$ and VSWR $= 1.02$. Return loss is a *voltage* ratio: it uses $20\log_{10}$, so $20$ dB means the voltage ratio is $0.1$, not $0.01$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(−20÷20)` → **0.1000** — return loss is a voltage ratio, so 20 log. Store with `SHIFT` `STO` `A`.
> 2. `(1+A)÷(1−A) : A²` → **1.222** → **0.0100**, i.e. 1 % of the power reflected.
>
> Reading 20 dB as a power ratio gives $\lvert\Gamma\rvert = 0.01$ and VSWR 1.02.

### P8. A load on a $50\ \Omega$ line has $\Gamma_L = 0.5\angle 0^\circ$. Find the reflection coefficient and the input impedance at a distance of $\lambda/8$ from the load.

**Given:** $Z_0 = 50\ \Omega$; $\Gamma_L = 0.5\angle 0^\circ$; $l = \lambda/8$

**Solution:**

1. Phase rotation: $2\beta l = 2\left(\dfrac{2\pi}{\lambda}\right)\left(\dfrac{\lambda}{8}\right) = \dfrac{\pi}{2} = 90^\circ$
2. $\Gamma(l) = 0.5\angle 0^\circ \cdot e^{-j90^\circ} = 0.5\angle -90^\circ = -j0.5$
3. $Z(l) = 50\dfrac{1 + (-j0.5)}{1 - (-j0.5)} = 50\dfrac{1 - j0.5}{1 + j0.5}$
4. $\dfrac{1 - j0.5}{1 + j0.5} = 0.6 - j0.8$, so $Z(l) = 30 - j40\ \Omega$
5. Check: $\Gamma_L = 0.5$ corresponds to $Z_L = 50(1.5/0.5) = 150\ \Omega$, and the line equation with $\tan 45^\circ = 1$ gives $50(150 + j50)/(50 + j150) = 30 - j40\ \Omega$

> [!success]- Answer
> **$\Gamma = 0.5\angle -90^\circ$; $Z = 30 - j40\ \Omega$.**

> [!warning] Trap
> Using $e^{-j\beta l}$ instead of $e^{-2j\beta l}$ and rotating only $45^\circ$. That gives $\Gamma = 0.354 - j0.354$ and a completely different impedance; the factor of $2$ is the most commonly dropped term in the topic.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. Degree, `MODE` `2`: `0.5×(cos(90)−i sin(90))` → **0 − i0.5** (a λ/8 line rotates $\Gamma$ by $2\beta l = 90°$).
> 2. `50×(1+Ans)÷(1−Ans)` → **30 − i40** Ω, matching the $\tan$ route with $\tan 45° = 1$.
>
> The rotation is $e^{-2j\beta l}$: a quarter turn of $\Gamma$ is λ/8, not λ/4.

### P9. A $50\ \Omega$ line is terminated in $100\ \Omega$. How far from the load is the *first* voltage minimum, and what is the impedance there?

**Given:** $Z_0 = 50\ \Omega$; $Z_L = 100\ \Omega$

**Solution:**

1. $\Gamma_L = \dfrac{100 - 50}{100 + 50} = +0.333\angle 0^\circ$, so the voltage is *maximum* at the load
2. A minimum occurs where $\Gamma(l)$ is real and negative, i.e. after the phasor has rotated $180^\circ$
3. $\Gamma$ rotates $360^\circ$ per $\lambda/2$, so $180^\circ$ corresponds to $l = \lambda/4$
4. Check with the line equation: at $l = \lambda/4$, $Z = Z_0^2/Z_L = 2500/100 = 25\ \Omega$
5. Check against the standing wave: $Z_{min} = Z_0/\mathrm{VSWR} = 50/2 = 25\ \Omega$, which agrees

> [!success]- Answer
> **The first minimum is at $l = \lambda/4$ from the load, and $Z = 25\ \Omega$ there.**

> [!warning] Trap
> Answering $\lambda/2$. That is the spacing between *successive* minima, not the distance from the load to the first one; a maximum and the adjacent minimum are always $\lambda/4$ apart.

## Traps & Exam Notes

- **A VSWR below 1 (or negative) is impossible.** $\mathrm{VSWR} = (1+|\Gamma|)/(1-|\Gamma|)$ is a ratio of magnitudes, so the smallest value it can take is $1$. An answer of $0.5$ means a signed or complex $\Gamma$ was substituted directly into the formula — take $|\Gamma|$ first.
- **VSWR has no sign; $\Gamma$ does.** $Z_L = 100\ \Omega$ and $Z_L = 25\ \Omega$ on a $50\ \Omega$ line both give $\mathrm{VSWR} = 2$. If a question asks which load it is, it must also state where the voltage maximum or minimum lies; without that the question is under-determined.
- **Return loss is never negative, and it is not the power penalty.** $\mathrm{RL} = -20\log_{10}|\Gamma|$ is positive for any mismatch, and $\mathrm{ML} = -10\log_{10}(1-|\Gamma|^2)$ is a different, much smaller number. At $\mathrm{VSWR} = 2$ they are $9.54$ dB and $0.51$ dB respectively.
- **Mismatch loss uses $10\log_{10}$, not $20\log_{10}$.** The quantity inside the log is already a power ratio $(1-|\Gamma|^2)$; doubling it to $20\log_{10}$ doubles the answer in dB and is a common one-mark error.
- **The exponent is $-2j\beta l$, not $-j\beta l$.** The reflection coefficient rotates twice as fast as the wave phase, so one full revolution takes $\lambda/2$. Using $-j\beta l$ halves every distance computed from a chart or a phasor.
- **A purely reactive load reflects everything.** $Z_L = j50\ \Omega$ on a $50\ \Omega$ line gives $\Gamma = +j$, $|\Gamma| = 1$ and $\mathrm{VSWR} = \infty$ even though the load burns no power. An infinite VSWR means no power is *delivered*, not that power is being destroyed.
- **Infinite VSWR does not identify the termination.** A short gives $\Gamma = -1$ and an open gives $\Gamma = +1$; both show $\mathrm{VSWR} = \infty$ and $0$ dB return loss. The sign of $\Gamma$, or the position of the first minimum relative to the load, is the only thing that separates them.
- **On a lossy line the generator-side VSWR is not the load VSWR.** $|\Gamma|$ decays as $e^{-2\alpha l}$, so a load with $\mathrm{VSWR} = 3$ can look like $\mathrm{VSWR} = 1.5$ at the transmitter. Every VSWR a problem quotes must be tied to a plane on the line.
- **Reflected power goes as $|\Gamma|^2$, not $|\Gamma|$.** For $|\Gamma| = 1/3$ the reflected power fraction is $1/9 = 11.1\%$, not $33.3\%$. Power ratios are the square of voltage ratios.

## See Also

- [[02_Secondary_Constants_Z0_and_Gamma]]
- [[05_Input_Impedance_and_Quarter-Wave_Transformer]]
- [[06_Smith_Chart]]
- [[07_Stub_Matching]]

---

[[03_Lossless_and_Distortionless_Lines|⬅ 03]] · [[_MOC_Transmission_Lines_and_Waveguides|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Input_Impedance_and_Quarter-Wave_Transformer|05 ➡]]
