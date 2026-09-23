---
id: ECE-02-05
title: "AC Power, PQS and Triangle"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 5
tier: 1
depth: full
problem_count: 9
prereqs: ["[[02_Phasors_and_Complex_Impedance]]", "[[01_Sinusoid,_RMS,_Average,_Form_and_Crest]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — AC Power, PQS and Triangle

> [!abstract] Scope
> Compute real, reactive and apparent power from phasor voltages and currents, and read the power triangle and power factor off the result.

## Core Concept

> [!tip] Intuition
> Only the component of current in phase with the voltage does net work; the quadrature component shuttles energy back and forth between the source and the reactive elements without ever being consumed. Real power is the in-phase product, reactive power is the quadrature product, and apparent power is the plain product of the two RMS magnitudes.

**Instantaneous power in a sinusoidal circuit.** With $v = V_m\cos\omega t$ and $i = I_m\cos(\omega t-\theta)$, the product $p = vi$ expands to $VI\cos\theta\,(1+\cos2\omega t) + VI\sin\theta\,\sin2\omega t$ (with $V, I$ RMS). The first term is always positive and has a non-zero average; the second oscillates symmetrically about zero and averages to nothing. Averaging over a cycle kills the $2\omega t$ terms and leaves $P = VI\cos\theta$.

**The three powers.** Real (average) power $P = V_{rms}I_{rms}\cos\theta$ in watts is the rate of energy conversion — the only power that heats, lights or turns a shaft. Reactive power $Q = V_{rms}I_{rms}\sin\theta$ in volt-amperes-reactive is the amplitude of the energy that sloshes into and out of inductance and capacitance each half cycle. Apparent power $S = V_{rms}I_{rms}$ in volt-amperes is the product of the two meter readings; it is what sizes transformers and switchgear, because the conductors must carry the full current whatever its phase.

**Complex power is the compact form.** It is defined as:
$$\mathbf{S} = \mathbf{V}\mathbf{I}^* = P + jQ$$
where the conjugate is essential: it makes the angle of $\mathbf{S}$ equal to $\theta_v - \theta_i$, the impedance angle. The power triangle $\mathbf{S} = P+jQ$ has $S^2 = P^2+Q^2$ and $\tan\theta = Q/P$, and the power factor is:
$$\mathrm{pf} = \cos\theta = P/S$$

**Sign conventions decide leading and lagging.** With the standard passive convention, $\theta = \theta_v-\theta_i$ is the angle of the load impedance. An inductive load ($X>0$) has $\theta>0$, hence $Q>0$, and the current lags the voltage — described as a **lagging** power factor. A capacitive load has $\theta<0$, $Q<0$, current leading, and a **leading** power factor. The phrase on a nameplate always refers to the current relative to the voltage.

**Power from impedance in one step.** Because $\theta$ is the impedance angle, $P = I^2R$, $Q = I^2X$ and $S = I^2|\mathbf{Z}|$ for a series current, or $P = V^2G$, $Q = -V^2B$ and $S = V^2|\mathbf{Y}|$ for a common voltage. Both routes must give the same triangle — that is the fastest self-check available.

**Power adds, but only as P and Q separately.** Several loads on the same bus: add the real powers and add the reactive powers algebraically, keeping the sign of each. Never add the apparent powers and never add the power factors; a 0.8 lagging load combined with a 0.9 leading load does not produce a 0.85 power factor. This is the single most punished idea in the topic.

**Why engineers care.** A low power factor means a larger current for the same real power, hence larger $I^2R$ losses in the feeders, larger voltage drops and a bigger transformer. Utilities therefore bill reactive power, and the fix — adding a capacitor to supply $Q$ locally — is the subject of the next note.

**Where it fails.** These expressions assume sinusoidal steady state at a single frequency. With harmonics the real power is still a straight sum:
$$P = \sum V_nI_n\cos\theta_n$$
but the apparent power is no longer the triangle hypotenuse:
$$S \neq \sqrt{P^2+Q^2}$$
The shortfall is distortion power and the naive power triangle no longer closes.

## Derivation

**From the instantaneous product to the average.** With $v = V_m\cos\omega t$ and $i = I_m\cos(\omega t-\theta)$, the product-to-sum identity gives

$$p(t) = \frac{V_mI_m}{2}\left[\cos\theta + \cos(2\omega t - \theta)\right]$$

The second term averages to zero over a full period because a cosine over a complete cycle has zero mean, leaving $P = \dfrac{V_mI_m}{2}\cos\theta = V_{rms}I_{rms}\cos\theta$.

**Splitting the oscillating term.** Expand $\cos(2\omega t-\theta) = \cos\theta\cos2\omega t + \sin\theta\sin2\omega t$ to write $p = VI\cos\theta(1+\cos2\omega t) + VI\sin\theta\,\sin2\omega t$. The $\cos\theta$ group is a positive-pulsing power at twice line frequency with average $VI\cos\theta$; the $\sin\theta$ group is the purely oscillating reactive exchange whose amplitude defines $Q$.

**Complex power.** For $\mathbf{V} = V\angle\theta_v$ and $\mathbf{I} = I\angle\theta_i$, $\mathbf{S} = \mathbf{V}\mathbf{I}^* = VI\angle(\theta_v-\theta_i) = VI\cos\theta + jVI\sin\theta$. Hence $\mathrm{Re}\{\mathbf{S}\} = P$, $\mathrm{Im}\{\mathbf{S}\} = Q$ and $|\mathbf{S}| = S$. Taking the conjugate rather than multiplying $\mathbf{V}\mathbf{I}$ directly is what makes the imaginary part come out with the load's own sign.

**Power triangle identities.** From $\mathbf{S} = P+jQ$: $S = \sqrt{P^2+Q^2}$, $\theta = \tan^{-1}(Q/P)$, $P = S\cos\theta$, $Q = S\sin\theta$. The triangle is similar to the impedance triangle divided by $|\mathbf{Z}|$ scaled by $I^2$, which is why $P = I^2R$ and $Q = I^2X$.

**Combining loads.** Since $P = \sum P_k$ and $Q = \sum Q_k$ are separately additive (energy and reactive exchange are conserved), the combined $S = \sqrt{(\sum P_k)^2 + (\sum Q_k)^2}$ and the combined pf is $(\sum P_k)/S$. Any method that adds $S_k$ directly is wrong unless every load shares the same angle.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Instantaneous power | $p(t) = VI\cos\theta\,(1+\cos 2\omega t) + VI\sin\theta\,\sin 2\omega t$ | V and I are RMS. The first group is the real power pulsation, the second the reactive exchange. |
| Real (average) power | $P = V_{rms} I_{rms}\cos\theta$ | Watts. The only power that does useful work. Requires RMS values. |
| Reactive power | $Q = V_{rms} I_{rms}\sin\theta$ | var. Positive for an inductive (lagging) load, negative for a capacitive one. |
| Apparent power | $S = V_{rms} I_{rms}$ | VA. Sizes transformers and conductors; always positive. |
| Complex power | $\mathbf{S} = \mathbf{V}\mathbf{I}^* = P + jQ$ | The conjugate is mandatory. Using VI without it flips the sign of Q. |
| Power triangle | $S^2 = P^2 + Q^2, \qquad \tan\theta = \frac{Q}{P}$ | Valid only for a single frequency. Harmonics break it. |
| Power factor | $\mathrm{pf} = \cos\theta = \frac{P}{S}$ | Dimensionless, between 0 and 1. Always state lagging or leading. |
| Power factor angle | $\theta = \theta_v - \theta_i = \angle\mathbf{Z}$ | The impedance angle. Positive means inductive and lagging. |
| Power from series current | $P = I^2 R, \quad Q = I^2 X, \quad S = I^2\lvert \mathbf{Z} \rvert$ | Fastest route when the current is already known. X carries its own sign. |
| Power from a common voltage | $P = V^2 G, \quad Q = -V^2 B, \quad S = V^2\lvert \mathbf{Y} \rvert$ | Note the minus sign on B, because Y = G + jB has the opposite angle sign to Z. |
| Combining loads | $P_{tot} = \sum P_k, \quad Q_{tot} = \sum Q_k, \quad S_{tot} = \sqrt{P_{tot}^2+Q_{tot}^2}$ | Add P and Q separately and algebraically. Never add the S values or the power factors. |
| Load voltage and current from S | $I = \frac{S}{V}, \qquad \mathbf{Z} = \frac{V^2}{\mathbf{S}^*}$ | Handy when only the nameplate kVA and the supply voltage are given. |

## Interactive Widget

**Power Triangle Interactive**

![[Power_Triangle_Interactive.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A series circuit with $R = 6\,\Omega$ and $X_L = 8\,\Omega$ carries $10\,\mathrm{A\,rms}$ from a $100\,\mathrm{V\,rms}$ source. Find $P$, $Q$ and $S$, then the power factor.

**Given:** R = 6 Ω; X_L = 8 Ω; I = 10 A rms; V = 100 V rms; series

**Solution:**

1. P = I^2 R = (100)(6) = 600 W
2. Q = I^2 X_L = (100)(8) = +800 var (inductive)
3. S = I^2 |Z| = (100)(10) = 1000 VA
4. Check with S = VI = (100)(10) = 1000 VA ✓ and S^2 = P^2 + Q^2: 600^2 + 800^2 = 1,000,000 ✓
5. pf = P/S = 600/1000 = 0.6, lagging because the reactance is inductive

> [!success]- Answer
> **$P = 600\,\mathrm{W}$, $Q = +800\,\mathrm{var}$, $S = 1000\,\mathrm{VA}$, $\mathrm{pf} = 0.6$ lagging**

> [!warning] Trap
> Computing $P = VI = 1000\,\mathrm{W}$. The product of RMS volts and RMS amperes is apparent power; real power needs the $\cos\theta$ factor, here 0.6.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10²×6 : 10²×8 : √(600²+800²) : 100×10` → $P$ = **600** W → $Q$ = **+800** var → $S$ = **1000** VA → $VI$ check **1000** VA.
> 2. `600÷1000 : cos⁻¹(Ans)` → $\mathrm{pf}$ = **0.6** → $\theta$ = **53.13**° lagging, since $Q > 0$.

### P2. A load consumes $800\,\mathrm{W}$ and $600\,\mathrm{var}$ inductive. Find the apparent power, the power factor and the power-factor angle.

**Given:** P = 800 W; Q = +600 var

**Solution:**

1. S = sqrt(P^2 + Q^2) = sqrt(640000 + 360000) = sqrt(1000000) = 1000 VA
2. pf = P/S = 800/1000 = 0.8
3. theta = arctan(Q/P) = arctan(0.75) = 36.87 degrees
4. Check: cos(36.87) = 0.8 ✓; Q positive means lagging

> [!success]- Answer
> **$S = 1000\,\mathrm{VA}$, $\mathrm{pf} = 0.8$ lagging, $\theta = 36.87^\circ$**

> [!warning] Trap
> Adding P and Q to get 1400 VA. They are the two legs of a right triangle, not scalars on the same axis; S is the hypotenuse at 1000 VA.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(800²+600²) : 800÷1000` → $S$ = **1000** VA → $\mathrm{pf}$ = **0.8** lagging.
> 2. `tan⁻¹(600÷800) : cos(Ans)` → $\theta$ = **36.87**° → **0.8** again, so the triangle closes.

### P3. A load has $\mathbf{V} = 120\angle0^\circ\,\mathrm{V\,rms}$ and $\mathbf{I} = 10\angle{-30^\circ}\,\mathrm{A\,rms}$. Find the complex power and the power factor.

**Given:** V = 120∠0° V rms; I = 10∠-30° A rms

**Solution:**

1. Take the conjugate of the current: I* = 10 angle +30 A
2. S = V I* = (120)(10) angle 30 = 1200 angle 30 VA
3. Rectangular form: P = 1200 cos30 = 1039.2 W; Q = 1200 sin30 = 600 var
4. S = 1039.2 + j600 VA
5. pf = cos(30 degrees) = 0.866 lagging (current lags the voltage)

> [!success]- Answer
> **$\mathbf{S} = 1039.2 + j600\,\mathrm{VA}$, $\mathrm{pf} = 0.866$ lagging**

> [!warning] Trap
> Multiplying $\mathbf{V}\mathbf{I}$ without conjugating, which gives an angle of $-30^\circ$ and therefore $Q = -600\,\mathrm{var}$ — the load would be reported as capacitive when it is inductive.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `120×10 : 0−(−30)` → $\lvert \mathbf{S} \rvert$ = **1200** VA at **+30**°, the conjugate $\mathbf{I}^* = 10\angle+30^\circ$ A.
> 2. `1200cos(30) : 1200sin(30)` → $P$ = **1039.2** W → $Q$ = **+600** var, so $\mathbf{S} = 1039.2 + j600$ VA.
> 3. `cos(30)` → $\mathrm{pf}$ = **0.866** lagging.

### P4. For $v(t) = 311\sin(377t)\,\mathrm{V}$ and $i(t) = 14.14\sin(377t-45^\circ)\,\mathrm{A}$, find $P$, $Q$ and $S$.

**Given:** v(t) = 311 sin(377t) V; i(t) = 14.14 sin(377t - 45°) A

**Solution:**

1. V_rms = 311/sqrt(2) = 219.9 V (approximately 220 V)
2. I_rms = 14.14/sqrt(2) = 10.0 A
3. theta = 45 degrees (current lags)
4. S = VI = (219.9)(10) = 2199 VA
5. P = S cos45 = 2199(0.7071) = 1555 W; Q = S sin45 = 1555 var

> [!success]- Answer
> **$S = 2199\,\mathrm{VA}$, $P = 1555\,\mathrm{W}$, $Q = +1555\,\mathrm{var}$**

> [!warning] Trap
> Using the peak values 311 V and 14.14 A directly in $P = VI\cos\theta$, which doubles every power. All power formulas take RMS values.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `311÷√2 : 14.14÷√2 : 219.9×10` → $V_{rms}$ = **219.9** V → $I_{rms}$ = **10.00** A → $S$ = **2199** VA.
> 2. `2199cos(45) : 2199sin(45)` → $P$ = **1555** W → $Q$ = **+1555** var, with $\theta = 45^\circ$ read straight off the phase difference.
>
> 311 V and 14.14 A are peaks — divide each by $\sqrt{2}$ before the power formulas, never after.

### P5. Load 1 draws $1000\,\mathrm{W}$ at 0.8 power factor lagging; load 2 draws $500\,\mathrm{W}$ at 0.9 power factor leading. Find the total real power, reactive power, apparent power and overall power factor.

**Given:** Load 1: P = 1000 W, pf = 0.8 lagging; Load 2: P = 500 W, pf = 0.9 leading

**Solution:**

1. Load 1: S1 = 1000/0.8 = 1250 VA; theta1 = 36.87 degrees; Q1 = 1250 sin(36.87) = +750 var
2. Load 2: S2 = 500/0.9 = 555.6 VA; theta2 = 25.84 degrees; Q2 = -555.6 sin(25.84) = -242.2 var
3. P_total = 1000 + 500 = 1500 W
4. Q_total = 750 - 242.2 = +507.8 var (net inductive)
5. S_total = sqrt(1500^2 + 507.8^2) = sqrt(2250000 + 257861) = sqrt(2507861) = 1583.6 VA
6. pf = 1500/1583.6 = 0.947 lagging

> [!success]- Answer
> **$P = 1500\,\mathrm{W}$, $Q = +507.8\,\mathrm{var}$, $S = 1583.6\,\mathrm{VA}$, $\mathrm{pf} = 0.947$ lagging**

> [!warning] Trap
> Averaging the power factors to get 0.85. Power factors do not add or average; the leading load cancels part of the lagging load's reactive power, and the correct overall pf is 0.947.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000÷0.8 : Ans×sin(cos⁻¹(0.8)) : 500÷0.9 : Ans×sin(cos⁻¹(0.9))` → $S_1$ = **1250** VA → $Q_1$ = **+750** var → $S_2$ = **555.6** VA → $Q_2$ = **242.2** var, leading, so take it as $-242.2$.
> 2. `1000+500 : 750−242.2 : √(1500²+507.8²) : 1500÷1583.6` → $P$ = **1500** W → $Q$ = **+507.8** var → $S$ = **1583.6** VA → $\mathrm{pf}$ = **0.947** lagging.
>
> Never average the power factors; the leading load subtracts from $Q$, not from $P$.

### P6. A load $\mathbf{Z} = 3 + j4\,\Omega$ carries $20\,\mathrm{A\,rms}$. Find $P$, $Q$, $S$, the terminal voltage and the power factor.

**Given:** Z = 3 + j4 Ω; I = 20 A rms

**Solution:**

1. |Z| = sqrt(9 + 16) = 5 Ω, so V = I|Z| = (20)(5) = 100 V rms
2. P = I^2 R = (400)(3) = 1200 W
3. Q = I^2 X = (400)(4) = +1600 var
4. S = I^2 |Z| = (400)(5) = 2000 VA (check: VI = 100 x 20 = 2000 VA ✓)
5. pf = cos(arctan(4/3)) = cos(53.13 degrees) = 0.6 lagging

> [!success]- Answer
> **$V = 100\,\mathrm{V}$, $P = 1200\,\mathrm{W}$, $Q = +1600\,\mathrm{var}$, $S = 2000\,\mathrm{VA}$, $\mathrm{pf} = 0.6$ lagging**

> [!warning] Trap
> Computing $P = V^2/R = 100^2/3 = 3333\,\mathrm{W}$ by treating the 3 Ω as the whole load. $V^2/R$ is only valid when $V$ is the voltage across that resistor alone, which here is $IR = 60\,\mathrm{V}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(3²+4²) : 20×Ans` → $\lvert \mathbf{Z} \rvert$ = **5** Ω → $V$ = **100** V rms.
> 2. `20²×3 : 20²×4 : 20²×5 : 3÷5` → $P$ = **1200** W → $Q$ = **+1600** var → $S$ = **2000** VA → $\mathrm{pf}$ = **0.6** lagging.

### P7. A load nameplate reads $5\,\mathrm{kVA}$ at $0.8$ power factor lagging on a $230\,\mathrm{V\,rms}$ supply. Find the real power, the reactive power and the line current.

**Given:** S = 5 kVA; pf = 0.8 lagging; V = 230 V rms

**Solution:**

1. P = S cos theta = 5000 x 0.8 = 4000 W
2. Q = S sin theta, with theta = 36.87 degrees: Q = 5000 x 0.6 = 3000 var
3. I = S/V = 5000/230 = 21.74 A rms
4. Check: P = VI cos theta = (230)(21.74)(0.8) = 4000 W ✓

> [!success]- Answer
> **$P = 4000\,\mathrm{W}$, $Q = +3000\,\mathrm{var}$, $I = 21.74\,\mathrm{A}$**

> [!warning] Trap
> Dividing the real power by the voltage to get current (4000/230 = 17.4 A). The conductor carries the apparent-power current $S/V$, which is larger because of the reactive component.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5000×0.8 : 5000×0.6` → $P$ = **4000** W → $Q$ = **+3000** var, since $\cos\theta = 0.8$ forces $\sin\theta = 0.6$.
> 2. `5000÷230` → $I$ = **21.74** A rms, the apparent-power current, not $P/V$.

### P8. A load draws $12\,\mathrm{A\,rms}$ at $230\,\mathrm{V\,rms}$ with a power factor of $0.75$ lagging. Find $S$, $P$, $Q$ and the load impedance.

**Given:** I = 12 A rms; V = 230 V rms; pf = 0.75 lagging

**Solution:**

1. S = VI = (230)(12) = 2760 VA
2. P = S pf = 2760 x 0.75 = 2070 W
3. theta = arccos(0.75) = 41.41 degrees; sin theta = 0.6614
4. Q = S sin theta = 2760 x 0.6614 = 1825 var
5. |Z| = V/I = 230/12 = 19.17 Ω; Z = 19.17 angle 41.41 = 14.38 + j12.68 Ω

> [!success]- Answer
> **$S = 2760\,\mathrm{VA}$, $P = 2070\,\mathrm{W}$, $Q = +1825\,\mathrm{var}$, $\mathbf{Z} = 14.38 + j12.68\,\Omega$**

> [!warning] Trap
> Using $\theta = \arccos(0.75) = 41.41^\circ$ and then computing $Q = S\cos\theta$ again. Once $\theta$ is in hand, the real part uses $\cos$ and the reactive part uses $\sin$; reusing $\cos$ gives $Q = P$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `230×12 : Ans×0.75 : cos⁻¹(0.75)` → $S$ = **2760** VA → $P$ = **2070** W → $\theta$ = **41.41**°.
> 2. `2760×0.6614 : 230÷12` → $Q$ = **1825** var, with $\sin 41.41^\circ = 0.6614$ → $\lvert \mathbf{Z} \rvert$ = **19.17** Ω.
> 3. `SHIFT` `Rec(` `19.17` `,` `41.41` `)` → $X$ = **14.38**, $Y$ = **12.68**, so $\mathbf{Z} = 14.38 + j12.68$ Ω.
>
> Once $\theta$ is known the real part uses $\cos$ and the reactive part uses $\sin$; reusing $\cos$ gives $Q = P$.

### P9. A load $\mathbf{Z} = 8 - j6\,\Omega$ is connected across a $100\,\mathrm{V\,rms}$ source. Find the current, $P$, $Q$, $S$ and the power factor, and state whether it leads or lags.

**Given:** Z = 8 - j6 Ω; V = 100 V rms

**Solution:**

1. |Z| = sqrt(64 + 36) = 10 Ω, so I = 100/10 = 10 A rms
2. P = I^2 R = (100)(8) = 800 W
3. Q = I^2 X = (100)(-6) = -600 var
4. S = I^2 |Z| = (100)(10) = 1000 VA (check: VI = 1000 VA ✓)
5. theta = arctan(-6/8) = -36.87 degrees, so pf = 0.8 leading

> [!success]- Answer
> **$I = 10\,\mathrm{A}$, $P = 800\,\mathrm{W}$, $Q = -600\,\mathrm{var}$, $S = 1000\,\mathrm{VA}$, $\mathrm{pf} = 0.8$ leading**

> [!warning] Trap
> Reporting $Q = +600\,\mathrm{var}$ because the magnitude was used. The negative reactance forces a negative Q, and a negative Q under the standard convention is what makes the power factor leading.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(8²+6²) : 100÷Ans` → $\lvert \mathbf{Z} \rvert$ = **10** Ω → $I$ = **10.00** A rms.
> 2. `10²×8 : 10²×−6 : 10²×10 : 8÷10` → $P$ = **800** W → $Q$ = **−600** var → $S$ = **1000** VA → $\mathrm{pf}$ = **0.8** leading.
>
> Keep the sign on $X$: the $-6$ is what makes $Q$ negative, and a negative $Q$ is what makes the factor leading.

## Traps & Exam Notes

- **Reporting $VI$ as real power.** $S = V_{rms}I_{rms}$ is apparent power. Real power requires the $\cos\theta$ factor, and confusing the two makes every efficiency and energy-cost answer too large.
- **Using peak values in power formulas.** $P = V_{rms}I_{rms}\cos\theta$ needs RMS. Substituting peak values doubles the result (a factor of 4 in the product, halved back by the definition).
- **Forgetting to conjugate the current in $\mathbf{S} = \mathbf{V}\mathbf{I}^*$.** Without the conjugate the imaginary part changes sign and an inductive load is reported as capacitive.
- **Adding apparent powers or averaging power factors.** Only P and Q add separately. Two loads of 1000 VA each at different angles do not make 2000 VA, and 0.8 lagging combined with 0.9 leading is not 0.85.
- **Dropping the sign of Q.** Q < 0 means a capacitive, leading load under the standard convention; reporting it as a magnitude loses the leading/lagging distinction the exam is testing.
- **Using $V^2/R$ with the terminal voltage when R is one element of a series load.** $V^2/R$ requires the voltage across that resistor only; use $I^2R$ with the actual branch current instead.
- **Computing line current from real power.** The current is $S/V$, not $P/V$. The reactive component still flows through the conductors.
- **Applying the power triangle to a distorted waveform.** With harmonics $S \neq \sqrt{P^2+Q^2}$; the residual is distortion power and the triangle does not close.

## See Also

- [[06_Power_Factor_and_Correction]]
- [[02_Phasors_and_Complex_Impedance]]
- [[10_Three-Phase_Power_and_Two-Wattmeter]]
- [[03_Series_and_Parallel_AC_Analysis]]

---

[[04_AC_Thevenin,_Norton_and_Max_Power|⬅ 04]] · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Power_Factor_and_Correction|06 ➡]]
