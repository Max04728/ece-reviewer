---
title: AC Circuits
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 10
---

# AC Circuits

## Part A — Sinusoidal Steady State

### 1. Sinusoid, RMS, Average, Form and Crest

**General sinusoid ★**

$$v(t)=V_m\sin(\omega t+\phi)=V_m\cos(\omega t+\phi-90^\circ)$$

$V_m$ in V (peak), $\omega=2\pi f$ in rad/s, $f$ in Hz, $\phi$ in degrees or rad, $t$ in s.

**RMS and average ★**

$$V_{rms}=\sqrt{\frac{1}{T}\int_0^T v^2(t)\,dt},\qquad V_{avg}=\frac{1}{T}\int_0^T v(t)\,dt$$

Pure sinusoid: $V_{rms}=\frac{V_m}{\sqrt{2}}=0.7071V_m$ and $V_{avg}=0$ over a full period.

**Form factor, crest factor, peak**

$$FF=\frac{V_{rms}}{V_{avg}},\qquad CF=\frac{V_m}{V_{rms}},\qquad V_m=\sqrt{2}\,V_{rms}$$

**Waveform constants**

| Waveform | $V_{rms}$ | $V_{avg}$ | $FF$ | $CF$ |
|---|---|---|---|---|
| Sine | $0.7071V_m$ | $0.6366V_m$ | 1.111 | 1.414 |
| Full-wave rectified | $0.7071V_m$ | $0.6366V_m$ | 1.111 | 1.414 |
| Half-wave rectified | $0.5V_m$ | $0.3183V_m$ | 1.571 | 2.000 |
| Square | $V_m$ | $V_m$ | 1.000 | 1.000 |
| Triangle | $0.5774V_m$ | $0.5000V_m$ | 1.155 | 1.732 |

**Conditions:** $v(t)$ periodic with period $T=1/f$; $FF$ and $CF$ are dimensionless; $V_{avg}$ of a pure sine is zero over a full period. #ac

---

### 2. Phasors and Complex Impedance

![](https://www.youtube.com/watch?v=ZSDpIpnlTbY)

*Video: Introduction to Phasors, Impedance and AC Circuits — Charles Clayton, 3:53*

**Phasor transform ★**

$$v(t)=V_m\cos(\omega t+\phi)\ \Longleftrightarrow\ \mathbf{V}=V_{rms}\angle\phi=\frac{V_m}{\sqrt2}\angle\phi$$

$\mathbf{V}$ in V (RMS phasor), $\phi$ in degrees.

**Complex impedance and admittance ★**

$$\mathbf{Z}=R+jX=\lvert Z\rvert\angle\theta,\qquad \mathbf{Y}=\frac{1}{\mathbf{Z}}=G+jB$$

$$\lvert Z\rvert=\sqrt{R^2+X^2},\qquad \theta=\tan^{-1}\frac{X}{R}$$

$\mathbf{Z}$ in $\Omega$; reactance $X$ in $\Omega$; $\mathbf{Y}$ in S; $G$ in S; susceptance $B$ in S.

**Element impedances**

| Element | Time domain | $\mathbf{Z}$ | $\mathbf{Y}$ |
|---|---|---|---|
| Resistor $R$ | $v=Ri$ | $R$ | $1/R$ |
| Inductor $L$ | $v=L\frac{di}{dt}$ | $j\omega L$ | $1/j\omega L$ |
| Capacitor $C$ | $i=C\frac{dv}{dt}$ | $1/j\omega C$ | $j\omega C$ |

**Equivalent series/parallel forms**

$$R_s=\lvert Z\rvert\cos\theta,\qquad X_s=\lvert Z\rvert\sin\theta,\qquad R_p=\frac{\lvert Z\rvert^2}{R_s},\qquad X_p=\frac{\lvert Z\rvert^2}{X_s}$$

**Conditions:** single-frequency steady state only; phasors add like complex numbers but do not multiply power directly — use $\mathbf{S}=\mathbf{VI}^*$ for power. #ac

> [!warning] Exam trap
> Phasor magnitude is normally **RMS**, not peak. Mixing $V_m$ into $\mathbf{S}=\mathbf{VI}^*$ inflates power by exactly 2×.

---

### 3. Series and Parallel AC Analysis

**Series circuit ★**

$$\mathbf{Z}_{eq}=\sum_k\mathbf{Z}_k,\qquad \mathbf{I}=\frac{\mathbf{V}}{\mathbf{Z}_{eq}},\qquad \mathbf{V}_k=\mathbf{V}\frac{\mathbf{Z}_k}{\mathbf{Z}_{eq}}$$

**Parallel circuit ★**

$$\mathbf{Y}_{eq}=\sum_k\mathbf{Y}_k,\qquad \mathbf{I}_k=\mathbf{I}\frac{\mathbf{Y}_k}{\mathbf{Y}_{eq}}$$

**Two-branch parallel admittance**

$$\mathbf{Z}_{eq}=\frac{\mathbf{Z}_1\mathbf{Z}_2}{\mathbf{Z}_1+\mathbf{Z}_2},\qquad \mathbf{I}_1=\mathbf{I}\frac{\mathbf{Z}_2}{\mathbf{Z}_1+\mathbf{Z}_2}$$

**Series RLC results ★**

$$\lvert Z\rvert=\sqrt{R^2+(\omega L-1/\omega C)^2},\qquad \theta=\tan^{-1}\frac{\omega L-1/\omega C}{R}$$

$$V_R=IR,\qquad V_L=IX_L,\qquad V_C=IX_C$$

**Phase behavior**

| Condition | $\theta$ | Circuit |
|---|---|---|
| $X_L>X_C$ | $\theta>0$ | inductive, $I$ lags $V$ |
| $X_L<X_C$ | $\theta<0$ | capacitive, $I$ leads $V$ |
| $X_L=X_C$ | $\theta=0$ | resistive, resonant |

**Conditions:** linear elements at one frequency; $\lvert Z\rvert$ in $\Omega$, $\theta$ in degrees; use RMS phasors consistently for $\mathbf{V}$ and $\mathbf{I}$. #ac

---

### 4. AC Thevenin, Norton and Max Power

**AC Thevenin and Norton ★**

$$\mathbf{V}_{Th}=\mathbf{V}_{oc},\qquad \mathbf{Z}_{Th}=\frac{\mathbf{V}_{oc}}{\mathbf{I}_{sc}},\qquad \mathbf{I}_N=\mathbf{I}_{sc}=\frac{\mathbf{V}_{Th}}{\mathbf{Z}_{Th}}$$

$\mathbf{V}_{Th}$ in V (RMS), $\mathbf{Z}_{Th}$ in $\Omega$, $\mathbf{I}_N$ in A (RMS).

**Maximum power transfer ★**

$$\mathbf{Z}_L=\mathbf{Z}_{Th}^*\ \Rightarrow\ \mathbf{Z}_L=R_{Th}-jX_{Th}$$

$$P_{max}=\frac{\lvert\mathbf{V}_{Th}\rvert^2}{4R_{Th}}\ \text{(W, RMS phasors)}$$

**Load with fixed reactance**

$$R_L=\sqrt{R_{Th}^2+(X_{Th}+X_L)^2}\ \text{for maximum power}$$

**General load power**

$$P_L=\lvert\mathbf{I}\rvert^2R_L=\frac{\lvert\mathbf{V}_{Th}\rvert^2R_L}{(R_{Th}+R_L)^2+(X_{Th}+X_L)^2}$$

**L-section matching ★**

$$Q=\sqrt{\frac{R_{hi}}{R_{lo}}-1},\qquad X_s=QR_{lo},\qquad X_p=\frac{R_{hi}}{Q}$$

Put the **shunt** element across the larger resistance $R_{hi}$ and the **series** element toward the smaller resistance $R_{lo}$; $X_s$ in $\Omega$, $X_p$ in $\Omega$, $Q$ dimensionless.

$$L=\frac{X_s}{\omega}\ \text{(series)},\qquad C=\frac{1}{\omega X_p}\ \text{(shunt)}$$

**Octave scaling**

$$\frac{f_2}{f_1}=2\ \Leftrightarrow\ +1\ \text{octave},\qquad N_{oct}=\log_2\frac{f_2}{f_1}=\frac{\log_{10}(f_2/f_1)}{\log_{10}2}$$

| Ratio | Result |
|---|---|
| $2\times$ | $+1$ octave |
| $0.5\times$ | $-1$ octave |
| $10\times$ | $\approx3.32$ octaves = 1 decade |
| One-pole roll-off | $-6$ dB/octave = $-20$ dB/decade |

**Conditions:** maximum power needs a **complex-conjugate** match; a purely resistive match on a reactive source gives less than $P_{max}$; the L-section formula needs $R_{hi}>R_{lo}$ and applies at a single frequency. #ac

---

### 5. AC Power, PQS and Triangle

![](https://www.youtube.com/watch?v=_ebsZf9RpT8)

*Video: Apparent Power and Power Factor — Neso Academy, 6:58*

**Instantaneous and average power ★**

$$p(t)=v(t)i(t),\qquad P=\frac{1}{T}\int_0^T p\,dt=V_{rms}I_{rms}\cos\theta\ \text{(W)}$$

**The three powers ★**

$$P=\lvert\mathbf{V}\rvert\lvert\mathbf{I}\rvert\cos\theta\ \text{(W)},\qquad Q=\lvert\mathbf{V}\rvert\lvert\mathbf{I}\rvert\sin\theta\ \text{(VAR)},\qquad S=\lvert\mathbf{V}\rvert\lvert\mathbf{I}\rvert\ \text{(VA)}$$

$\theta=\theta_v-\theta_i$ in degrees; $P$ in W, $Q$ in VAR, $S$ in VA.

**Complex power and power triangle**

$$\mathbf{S}=\mathbf{VI}^*=P+jQ,\qquad S=\sqrt{P^2+Q^2},\qquad pf=\cos\theta=\frac{P}{S}$$

$$P=S\cos\theta,\qquad Q=S\sin\theta,\qquad \theta=\tan^{-1}\frac{Q}{P}$$

**Sign convention and element values**

| Element | $P$ | $Q$ | Interpretation |
|---|---|---|---|
| Resistor | $I^2R$ | 0 | consumes only real power |
| Inductor | 0 | $+I^2X_L$ | absorbs lagging VAR |
| Capacitor | 0 | $-I^2X_C$ | delivers leading VAR |

**Conditions:** RMS phasors throughout; $pf$ is dimensionless and always $0\le pf\le1$; $Q>0$ marks an inductive (lagging) load. #power

> [!tip] High-yield ★
> $\mathbf{S}=\mathbf{VI}^*$ is the master formula: one complex multiply yields $P$, $Q$, $S$ and the power factor at once — no separate triangles needed.

---

### 6. Power Factor and Correction

![](https://www.youtube.com/watch?v=WdJVXbyTwP4)

*Video: Power Factor Correction Calculations — Prof MAD, 5:09*

**Power factor ★**

$$pf=\cos\theta=\frac{P}{S}=\frac{P}{\sqrt{P^2+Q^2}},\qquad \theta=\cos^{-1}(pf)$$

**Capacitor for correction to target $pf_2$ ★**

$$Q_C=P\big(\tan\theta_1-\tan\theta_2\big)$$

$$C=\frac{Q_C}{\omega V_{rms}^2}=\frac{P(\tan\theta_1-\tan\theta_2)}{\omega V_{rms}^2}\ \text{(F)}$$

$\theta_1$ = original angle, $\theta_2$ = target angle, both in degrees; $P$ in W; $Q_C$ in VAR.

**Correction table**

| Load type | $pf$ | $\theta$ | Correction |
|---|---|---|---|
| Inductive | lagging | $>0$ | add capacitor in parallel |
| Capacitive | leading | $<0$ | add inductor in parallel |
| Unity | 1.0 | $0^\circ$ | no correction |

**Resulting current and savings**

$$I_1=\frac{P}{V_{rms}pf_1},\qquad I_2=\frac{P}{V_{rms}pf_2},\qquad \Delta I=I_1-I_2\ \text{(A)}$$

**Conditions:** single-phase sinusoidal load at one frequency; $C$ in F with $\omega=2\pi f$ rad/s; correction never changes the real power $P$. #power

## Part B — Resonance and Three-Phase

### 7. Series Resonance

![](https://www.youtube.com/watch?v=2Kqa9c7eQ8I)

*Video: Series Resonant Circuits — Zack Hartle, 7:40*

**Resonant frequency ★**

$$\omega_0=\frac{1}{\sqrt{LC}}\ \text{rad/s},\qquad f_0=\frac{1}{2\pi\sqrt{LC}}\ \text{Hz}$$

$L$ in H, $C$ in F.

**At resonance $X_L=X_C$ ★**

$$Z_{eq}=R\ \text{(minimum, purely resistive)},\qquad \lvert\mathbf{I}\rvert_{max}=\frac{V_{rms}}{R}$$

$$V_L=V_C=\frac{V_{rms}}{\omega_0RC}=QV_{rms}\ \text{(voltage magnification)}$$

**Quality factor, bandwidth, selectivity ★**

$$Q=\frac{\omega_0L}{R}=\frac{1}{\omega_0RC}=\frac{1}{R}\sqrt{\frac{L}{C}}$$

$$BW=\frac{\omega_0}{Q}=\frac{R}{L}\ \text{(rad/s)},\qquad Q=\frac{\omega_0}{BW}=\frac{f_0}{\Delta f}$$

**Half-power frequencies**

$$\omega_{1,2}=\mp\frac{R}{2L}+\sqrt{\left(\frac{R}{2L}\right)^2+\frac{1}{LC}},\qquad \omega_0=\sqrt{\omega_1\omega_2}$$

**Bandwidth from cutoffs**

$$BW=\omega_2-\omega_1=\frac{R}{L},\qquad f_{1,2}=f_0\pm\frac{BW}{2}\ \text{for }Q\ge10$$

**Conditions:** series RLC with $Q\ge1$ for narrow-band approximations; at resonance $V_L$ and $V_C$ may be far above the source voltage. #ac

> [!warning] Exam trap
> At series resonance the inductor and capacitor voltages are **$Q$ times** the source voltage, not equal to it. They cancel in the loop sum but each individually can exceed the source.

---

### 8. Parallel Resonance and Anti-Resonance

![](https://www.youtube.com/watch?v=mt3WwcQuJSE)

*Video: Resonance in a Parallel RLC Circuit Explained — ALL ABOUT ELECTRONICS, 20:02*

**Ideal parallel LC (lossless) ★**

$$\omega_0=\frac{1}{\sqrt{LC}},\qquad Z\to\infty,\qquad I_{line}\to0\ \text{(anti-resonance)}$$

**Real parallel RLC ★**

$$Y=\frac{1}{R}+j\left(\omega C-\frac{1}{\omega L}\right),\qquad Z_{max}=R_0=\frac{L}{RC}\ \text{(at resonance)}$$

$$Q=\frac{R_0}{\omega_0L}=\omega_0CR_0=R_0\sqrt{\frac{C}{L}},\qquad BW=\frac{\omega_0}{Q}=\frac{1}{RC}$$

**Resonance with coil resistance ($R_s$ in series with $L$)**

$$\omega_0=\sqrt{\frac{1}{LC}-\frac{R_s^2}{L^2}},\qquad R_0=\frac{L}{R_sC}\ \text{(tank impedance)}$$

$$Q=\frac{\omega_0L}{R_s}$$

**Series vs parallel comparison ★**

| Feature | Series resonance | Parallel resonance |
|---|---|---|
| At $f_0$ | $Z$ minimum $=R$ | $Z$ maximum $=R_0$ |
| $BW$ | $R/L$ | $1/RC$ |
| $Q$ | $\frac{1}{R}\sqrt{\frac{L}{C}}$ | $R_0\sqrt{\frac{C}{L}}$ |
| Line current | maximum | minimum |

**Conditions:** parallel tank at anti-resonance presents maximum impedance; $R_s$ shifts $\omega_0$ below the lossless value $1/\sqrt{LC}$. #ac #filter

---

### 9. Balanced Wye and Delta Systems

![](https://www.youtube.com/watch?v=0ZuoBTd7STk)

*Video: What's the Difference Between Wye and Delta? — Zack Hartle, 7:08*

**Wye (Y) relations ★**

$$V_L=\sqrt{3}V_\phi\angle+30^\circ,\qquad I_L=I_\phi$$

**Delta ($\Delta$) relations ★**

$$V_L=V_\phi,\qquad I_L=\sqrt{3}I_\phi\angle-30^\circ$$

$V_L$ in V (line-to-line), $V_\phi$ in V (phase/line-to-neutral), $I_L$ in A, $I_\phi$ in A.

**Phase sequence**

$$V_{an}=V_\phi\angle0^\circ,\qquad V_{bn}=V_\phi\angle-120^\circ,\qquad V_{cn}=V_\phi\angle+120^\circ\ \text{(abc)}$$

**Delta load impedance from line quantities**

$$\mathbf{Z}_\Delta=3\mathbf{Z}_Y\ \text{for an equivalent Y load}$$

**Per-phase analysis**

$$\mathbf{I}_\phi=\frac{\mathbf{V}_\phi}{\mathbf{Z}_\phi},\qquad \mathbf{I}_L=\mathbf{I}_\phi\ \text{(Y)},\qquad \mathbf{I}_L=\sqrt3\,\mathbf{I}_\phi\angle-30^\circ\ (\Delta)$$

**Conditions:** balanced source and balanced load; neutral current is zero in a balanced Y system, so the neutral may be omitted. #power

---

### 10. Three-Phase Power and Two-Wattmeter

![](https://www.youtube.com/watch?v=oMFPK2JDp8g)

*Video: Three-Phase Power Measurement: Two-Wattmeter Method — EzEd Channel, 2:49*

**Total three-phase power ★**

$$P_{3\phi}=3V_\phi I_\phi\cos\theta=\sqrt{3}\,V_LI_L\cos\theta\ \text{(W)}$$

$$Q_{3\phi}=\sqrt3\,V_LI_L\sin\theta\ \text{(VAR)},\qquad S_{3\phi}=\sqrt3\,V_LI_L\ \text{(VA)}$$

$\theta$ = load impedance angle per phase, in degrees; $V_L$ in V; $I_L$ in A.

**Per-phase and wye/delta power**

$$P_{3\phi}=3I_L^2R_\phi\ \text{(Y)},\qquad P_{3\phi}=3\frac{V_L^2}{R_\Delta}\ \text{(balanced }\Delta\text{, resistive)}$$

**Two-wattmeter method ★**

$$P_{total}=P_1+P_2,\qquad Q_{total}=\sqrt3\,(P_1-P_2)$$

$$P_1=V_LI_L\cos(30^\circ+\theta),\qquad P_2=V_LI_L\cos(30^\circ-\theta)$$

**Power factor from the wattmeters**

$$\tan\theta=\sqrt3\,\frac{P_1-P_2}{P_1+P_2},\qquad pf=\cos\theta$$

**Conditions:** two-wattmeter method requires a balanced (or at least three-wire) load; if $pf<0.5$ one reading goes negative and must be subtracted algebraically. #power

> [!warning] Exam trap
> In the two-wattmeter method $P_{total}=P_1+P_2$ **algebraically**. When $\lvert\theta\rvert>60^\circ$ ($pf<0.5$) one wattmeter reads negative — adding magnitudes gives a wrong total.

→ Back to [[00_Index]]
