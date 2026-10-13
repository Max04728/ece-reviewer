---
title: Power Electronics and Systems
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 9
---

# Power Electronics and Systems

## Part A — Switches and Thermal Design

### 1. Power Switches: MOSFET, IGBT, GTO, TRIAC

![](https://www.youtube.com/watch?v=sB33RdVyZ9E)

*Video: MOSFET vs IGBT: Which One to Use and Why — Modern-Day Edison, 6:15*

**Conduction losses ★**

$$P_{cond}=I_{rms}^2R_{DS(on)}\ \text{(MOSFET)},\qquad P_{cond}=V_{CE(sat)}I_C\ \text{(IGBT/BJT)}$$

$$P_{cond}=V_FI_{avg}+r_dI_{rms}^2\ \text{(diode/thyristor)}$$

$P$ in W, $I$ in A, $R$ in $\Omega$, $V$ in V.

**Switching losses ★**

$$P_{sw}=\frac{1}{2}V_{DS}I_D(t_{on}+t_{off})f_{sw}\ \text{(MOSFET)}$$

$$P_{sw}=f_{sw}\int v(t)i(t)\,dt\approx\frac{1}{2}V_{CE}I_C(t_{on}+t_{off})f_{sw}$$

$f_{sw}$ in Hz, $t_{on},t_{off}$ in s.

**Total loss and junction temperature**

$$P_{total}=P_{cond}+P_{sw}+P_{gate}+P_{leak},\qquad T_J=T_C+P_{total}\theta_{JC}$$

**Device comparison ★**

| Device | Drive | Best for | Limitation |
|---|---|---|---|
| Power MOSFET | voltage, $>10$ V | high $f_{sw}$, low $V$ | $R_{DS(on)}$ rises with $V$ |
| IGBT | voltage, gate | medium $f_{sw}$, high $V$ | tail current on turn-off |
| GTO | current pulse | very high power | complex gate drive |
| TRIAC | gate pulse | AC phase control | one-quadrant commutation |
| BJT | base current | legacy | low $h_{FE}$, second breakdown |

**GTO turn-off ★**

$$I_{G,off}\ \text{is negative (reverse gate current)},\qquad \lvert I_{G,off}\rvert\approx\frac{I_A}{\beta_{off}}$$

A GTO latches like an SCR but is turned off by a brief, high-magnitude **reverse gate current** pulse instead of by natural commutation.

**Safe operating area**

$$P_{SOA}=V_{CE}I_C\ \text{at a given pulse width},\qquad E_{sw}=P_{sw}t\ \text{(J)}$$

**Conditions:** switching loss scales linearly with $f_{sw}$, so high-frequency designs must minimize $t_{on}+t_{off}$; $P_{gate}=Q_gV_gf_{sw}$ in W is usually small but not negligible at MHz; GTO turn-off needs a reverse gate current pulse of magnitude $\lvert I_{G,off}\rvert\approx I_A/\beta_{off}$. #power

---

### 2. Thermal Resistance and Heat Sinking

**Thermal Ohm's law ★**

$$T_J=T_A+P_D(\theta_{JC}+\theta_{CS}+\theta_{SA})$$

$$T_J=T_A+P_D\theta_{JA}\ \text{(no heatsink)}$$

$T$ in °C, $P_D$ in W, $\theta$ in °C/W.

**Thermal network**

$$P_D=\frac{T_J-T_A}{\theta_{JC}+\theta_{CS}+\theta_{SA}}=\frac{\Delta T}{\sum\theta}$$

**Required heatsink ★**

$$\theta_{SA}=\frac{T_J-T_A}{P_D}-\theta_{JC}-\theta_{CS}$$

**Thermal analogy**

| Electrical | Thermal | Unit |
|---|---|---|
| Voltage | temperature difference | °C |
| Current | power | W |
| Resistance | thermal resistance | °C/W |
| Capacitance | thermal capacitance | J/°C |
| Time constant | $\tau=\theta C_{th}$ | s |

**Transient and derating**

$$Z_{\theta JC}(t)\ \text{used for pulses},\qquad P_{D,derated}=P_{D,25^\circ C}\frac{T_{J,max}-T_A}{T_{J,max}-25^\circ C}$$

**Conditions:** steady-state thermal analysis; $\theta_{CS}\approx1$ °C/W with a mica insulator and compound, $\approx0.5$ °C/W with a direct metal contact; $T_J\le T_{J,max}$ is the design constraint. #power

> [!tip] High-yield ★
> Thermal design is Ohm's law with $P$ as the current source: $T_J$ = ambient + (power × total thermal resistance). Just make sure all three $\theta$ terms are in series — forgetting $\theta_{CS}$ is the usual error.

---

### 3. SCR Phase-Controlled Rectifiers

![](https://www.youtube.com/watch?v=osE9hFOI78k)

*Video: SCR Phase Control Circuit and Working Principle — EC Academy, 5:28*

**Average output voltage ★**

$$V_{dc}=\frac{V_m}{2\pi}(1+\cos\alpha)\ \text{(half-wave, resistive load)}$$

$$V_{dc}=\frac{V_m}{\pi}(1+\cos\alpha)\ \text{(full-wave, resistive load)}$$

$V_m$ in V (peak), $\alpha$ = firing angle in degrees or rad.

**RMS and power**

$$V_{rms}=V_m\sqrt{\frac{1}{2\pi}\left(\pi-\alpha+\frac{\sin2\alpha}{2}\right)}\ \text{(half-wave)}$$

**Full-wave AC controller / TRIAC ★**

$$V_{rms}=V_m\sqrt{\frac{1}{\pi}\left(\pi-\alpha+\frac{\sin2\alpha}{2}\right)}=\sqrt2\,V_{rms}\text{(half-wave)}$$

Conduction spans both half-cycles, so the integral runs over $\alpha$ to $\pi$ in each half-cycle and averages over one full period — $\sqrt2$ times the half-wave form.

$$P_{out}=\frac{V_{rms}^2}{R_L}\ \text{(W)},\qquad I_{dc}=\frac{V_{dc}}{R_L}\ \text{(A)}$$

**Firing angle control**

$$\alpha_{max}=180^\circ\ \text{(resistive load)},\qquad \alpha_{max}<\alpha\ \text{with an inductive load}$$

**Firing angle ranges**

| Load | Control range | Extinction angle |
|---|---|---|
| Resistive | $0^\circ$–$180^\circ$ | $\beta=180^\circ$ |
| Inductive | $0^\circ$–$90^\circ$ for control | $\beta>180^\circ$ |
| With freewheel diode | $0^\circ$–$180^\circ$ | $\beta=180^\circ$ |

**Power factor**

$$pf=\frac{P}{V_{rms}I_{rms}},\qquad \text{displacement }pf=\cos\frac{\alpha}{2}\ \text{(half-wave approximation)}$$

**Conditions:** firing angle $\alpha$ measured from the zero crossing of the anode voltage; resistive load assumed unless stated; inductive loads need a freewheeling path or the output can go negative; a full-wave controller / TRIAC conducts in both half-cycles, so its rms is $\sqrt2$ times the half-wave value. #power #thyristor

## Part B — DC-DC Converters

### 4. Buck Converter

![](https://www.youtube.com/watch?v=rfChSvb8FX0)

*Video: Buck Converter — The Organic Chemistry Tutor, 11:41*

**Voltage conversion ratio ★**

$$\frac{V_o}{V_{in}}=D=\frac{t_{on}}{T},\qquad V_o=DV_{in}$$

$D$ dimensionless ($0<D<1$), $T=1/f_{sw}$ in s, $V$ in V.

**Inductor current ★**

$$\Delta I_L=\frac{(V_{in}-V_o)D}{Lf_{sw}}=\frac{V_o(1-D)}{Lf_{sw}}\ \text{(A)}$$

$$I_L=I_o=\frac{V_o}{R}\ \text{(A)},\qquad \Delta I_L=2I_o\ \text{at CCM boundary}$$

**Inductor and capacitor selection**

$$L_{min}=\frac{V_o(1-D)}{2I_o f_{sw}}\ \text{(H)},\qquad C_{min}=\frac{\Delta I_L}{8f_{sw}\Delta V_o}\ \text{(F)}$$

$$\Delta V_o=\frac{\Delta I_L}{8f_{sw}C}\ \text{(V)},\qquad V_o=D\,V_{in}\ \text{ideal}$$

**Duty cycle from voltages**

$$D=\frac{V_o}{V_{in}},\qquad D_{max}=\frac{V_o}{V_{in,min}}$$

**Conduction mode**

| Mode | Condition | Behavior |
|---|---|---|
| CCM | $I_L>\Delta I_L/2$ | $V_o=DV_{in}$ |
| DCM | $I_L<\Delta I_L/2$ | $V_o>DV_{in}$ |
| Boundary | $I_L=\Delta I_L/2$ | $L=L_{min}$ |

**Conditions:** ideal switch and inductor (lossless), CCM unless stated; $\Delta V_o$ formula assumes small ripple and linear inductor current. #power

---

### 5. Boost Converter

![](https://www.youtube.com/watch?v=vmNpsofY4-U)

*Video: How Boost Converters Work (DC-DC Step-Up) — Simply Electronics, 6:43*

**Voltage conversion ratio ★**

$$\frac{V_o}{V_{in}}=\frac{1}{1-D},\qquad V_o=\frac{V_{in}}{1-D}$$

**Inductor current and ripple ★**

$$I_L=\frac{I_o}{1-D}=\frac{V_{in}}{R(1-D)^2}\ \text{(A)},\qquad \Delta I_L=\frac{V_{in}D}{Lf_{sw}}\ \text{(A)}$$

**Inductor and capacitor**

$$L_{min}=\frac{V_{in}D(1-D)}{2I_o f_{sw}}\ \text{(H)},\qquad C_{min}=\frac{I_oD}{f_{sw}\Delta V_o}\ \text{(F)}$$

$$\Delta V_o=\frac{I_oD}{f_{sw}C}\ \text{(V)}$$

**Duty cycle from voltages**

$$D=1-\frac{V_{in}}{V_o},\qquad D\to1\ \text{as }V_o\to\infty$$

**Comparison with buck**

| Quantity | Buck | Boost |
|---|---|---|
| $V_o/V_{in}$ | $D$ | $1/(1-D)$ |
| $I_L$ | $I_o$ | $I_o/(1-D)$ |
| Switch current | $I_o$ | $I_L$ |
| Output current | continuous | discontinuous |

**Conditions:** ideal components, CCM; a boost cannot protect against a shorted switch — $V_{in}$ appears directly across the load; input current is continuous, output current is not. #power

> [!warning] Exam trap
> Boost duty cycle is $D=1-V_{in}/V_o$, **not** $V_{in}/V_o$. As $D\to1$ the ideal gain goes to infinity, so a shorted switch passes the input straight to the output.

---

### 6. Buck-Boost Converter

![](https://www.youtube.com/watch?v=zNfbbPobtus)

*Video: How Does a Buck-Boost Converter Work? — Foolish Engineer, 9:39*

**Voltage conversion ratio ★**

$$\frac{V_o}{V_{in}}=\frac{D}{1-D},\qquad \lvert V_o\rvert=\frac{D}{1-D}V_{in}$$

Output polarity is **inverted** relative to the input.

**Duty cycle and reversal**

$$D=\frac{\lvert V_o\rvert}{\lvert V_o\rvert+V_{in}},\qquad D=0.5\ \Rightarrow\ \lvert V_o\rvert=V_{in}$$

**Inductor current and ripple**

$$I_L=\frac{I_o}{1-D}\ \text{(A)},\qquad \Delta I_L=\frac{V_{in}D}{Lf_{sw}}\ \text{(A)}$$

**Inductor and capacitor**

$$L_{min}=\frac{V_{in}D}{2I_Lf_{sw}}=\frac{(1-D)^2R}{2f_{sw}}\ \text{(H)},\qquad C_{min}=\frac{I_oD}{f_{sw}\Delta V_o}\ \text{(F)}$$

**Converter summary ★**

| Converter | Gain | Polarity | $D$ range |
|---|---|---|---|
| Buck | $D$ | non-inverting | $0<D<1$ |
| Boost | $1/(1-D)$ | non-inverting | $0<D<1$ |
| Buck-boost | $D/(1-D)$ | inverting | $0<D<1$ |
| Cuk | $D/(1-D)$ | inverting | $0<D<1$ |

**Conditions:** ideal components; CCM; the switch sees $V_{in}+\lvert V_o\rvert$ when off; average inductor current is the sum of input and output currents. #power

---

### 7. Inverters: Half-Bridge and Full-Bridge

![](https://www.youtube.com/watch?v=Nl3saO5AG4A)

*Video: Single-Phase Full-Bridge Inverter — Electronics Maddy, 6:43*

**Half-bridge output ★**

$$V_{o,rms}=\frac{V_{dc}}{2}\ \text{(square wave)},\qquad V_{o,1}=\frac{V_{dc}}{\pi}\ \text{(peak fundamental)}$$

$$V_{o,rms,1}=\frac{\sqrt2V_{dc}}{\pi}\approx0.450V_{dc}\ \text{(fundamental only)}$$

**Full-bridge output ★**

$$V_{o,rms}=V_{dc}\ \text{(square wave)},\qquad V_{o,1}=\frac{2V_{dc}}{\pi}\ \text{(peak fundamental)}$$

$$V_{o,rms,1}=\frac{2\sqrt2V_{dc}}{\pi}\approx0.900V_{dc}$$

**THD and harmonics**

$$THD=\frac{\sqrt{V_{rms}^2-V_{1,rms}^2}}{V_{1,rms}},\qquad V_{rms}^2=V_{1}^2+V_{3}^2+V_{5}^2+\cdots$$

$$V_n=\frac{4V_{dc}}{n\pi}\ \text{(odd }n\text{, full bridge)}$$

**Device ratings**

$$V_{switch,peak}=V_{dc}\ \text{(full bridge)},\qquad V_{switch,peak}=\frac{V_{dc}}{1}\ \text{(half bridge, each device)}$$

$$P_{out}=\frac{V_{o,rms}^2}{R_L}\ \text{(W)}$$

**Conditions:** $180^\circ$ square-wave (six-step) operation, $V_{dc}$ in V; only odd harmonics are present with quarter-wave symmetry; inductive loads need freewheeling diodes. #power

---

### 8. PWM Techniques

![](https://www.youtube.com/watch?v=Ii1P-BmPRSQ)

*Video: Sinusoidal PWM for a Single-Phase Inverter — Read Electric Vehicle, 16:49*

**Duty cycle and average voltage ★**

$$D=\frac{t_{on}}{T},\qquad V_{avg}=DV_{dc}\ \text{(V)},\qquad V_{rms}=V_{dc}\sqrt D$$

$T$ in s, $f_{sw}=1/T$ in Hz.

**Modulation index ★**

$$m_a=\frac{V_{control}}{V_{tri}}\ \text{(linear range }0\le m_a\le1\text{)}$$

$$m_f=\frac{f_{sw}}{f_{fundamental}}\ \text{(frequency ratio)}$$

**Output of a PWM inverter**

$$V_{o,1}=m_a\frac{V_{dc}}{2}\ \text{(half bridge, peak fundamental)}$$

$$V_{o,1}=m_aV_{dc}\ \text{(full bridge, peak fundamental, }m_a\le1\text{)}$$

**Harmonic content**

$$m_f+2,\ m_f\pm4,\ \ldots\ \text{sidebands};\qquad f_{harmonic}=(jm_f\pm k)f_1$$

**PWM variants**

| Technique | Feature |
|---|---|
| Single-pulse | one pulse per half-cycle; poor THD |
| Sinusoidal PWM | compares sine to triangle; standard |
| Overmodulation | $m_a>1$; higher fundamental, more THD |
| Space-vector | 15% higher $V_{dc}$ utilization |
| Hysteresis | variable $f_{sw}$, simple current control |

**Conditions:** $f_{sw}\gg f_1$ so the switching ripple is easily filtered; $m_a\le1$ for linear modulation; overmodulation produces harmonics at the fundamental frequency. #power #pwm

## Part C — Regulation

### 9. Linear Voltage Regulators

![](https://www.youtube.com/watch?v=GSzVs7_aW-Y)

*Video: Voltage Regulator Tutorial — Afrotechmods, 6:28*

**Regulator relations ★**

$$V_o=V_{ref}\left(1+\frac{R_1}{R_2}\right)\ \text{(adjustable)},\qquad V_o=V_{fixed}\ \text{(three-terminal)}$$

$V$ in V, $R_1,R_2$ in $\Omega$.

**Dissipation and efficiency ★**

$$P_D=(V_{in}-V_o)I_o+V_{in}I_Q\ \text{(W)}$$

$$\eta=\frac{P_o}{P_{in}}=\frac{V_oI_o}{V_{in}I_{in}}\times100\%,\qquad P_o=V_oI_o$$

**Thermal requirement**

$$T_J=T_A+P_D\theta_{JA},\qquad \theta_{JA,max}=\frac{T_{J,max}-T_A}{P_D}\ (^\circ\text{C/W})$$

**Regulation and ripple rejection**

$$\text{Line reg}=\frac{\Delta V_o}{\Delta V_{in}}\times100\%,\qquad \text{Load reg}=\frac{\Delta V_o}{\Delta I_o}\times100\%$$

$$PSRR=20\log_{10}\frac{\Delta V_{in}}{\Delta V_o}\ \text{(dB)}$$

**Linear vs switching**

| Property | Linear | Switching |
|---|---|---|
| Efficiency | 30–60% | 70–95% |
| Noise | very low | switching ripple |
| $P_D$ | $(V_{in}-V_o)I_o$ | small |
| Complexity | minimal | magnetics + control |
| Best for | low dropout, low noise | high current, wide range |

**Conditions:** dropout voltage $V_{in}-V_o>V_{DO}$ must be maintained; headroom is dissipated as heat, so efficiency falls as $(V_{in}-V_o)$ grows larger. #power

> [!warning] Exam trap
> Increasing the input voltage to a linear regulator **raises**, not lowers, its dissipation — the extra volts become heat. This is why a linear post-regulator after a buck converter must still be heatsinked.

→ Back to [[00_Index]]
