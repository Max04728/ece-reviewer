---
title: Semiconductor Devices
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 15
---

# Semiconductor Devices

## Part A — Physics, Junction and Diodes

### 1. Intrinsic, Extrinsic and Carrier Transport

**Intrinsic carrier concentration ★**

$$n_i^2=n_0p_0=BT^3e^{-E_g/kT}$$

$n_i$ in cm⁻³; $E_g$ in eV; $k=8.62\times10^{-5}$ eV/K; $T$ in K.

**Mass action and charge neutrality**

$$n_0p_0=n_i^2,\qquad p_0-n_0+N_D^+-N_A^-=0$$

**Extrinsic carrier concentrations ★**

$$n_0\approx N_D\ \text{(n-type)},\qquad p_0\approx N_A\ \text{(p-type)}$$

$$n_0=\frac{N_D}{2}+\sqrt{\left(\frac{N_D}{2}\right)^2+n_i^2}\ \text{(exact n-type)}$$

**Fermi levels ★**

$$E_F-E_{Fi}=kT\ln\frac{n_0}{n_i}=kT\ln\frac{p_0}{n_i}\ \text{(reverse sign for p-type)}$$

$E_F$, $E_{Fi}$ in eV; $E_{Fi}$ = intrinsic Fermi level.

**Transport mechanisms**

$$J_{drift}=q(n\mu_n+p\mu_p)E\ \text{(A/cm}^2\text{)},\qquad J_{diff}=q\left(D_n\frac{dn}{dx}-D_p\frac{dp}{dx}\right)$$

**Einstein relation ★**

$$D_n=\mu_nV_T,\qquad D_p=\mu_pV_T,\qquad V_T=\frac{kT}{q}$$

$\mu$ in cm²/(V·s), $D$ in cm²/s, $V_T=25.85$ mV at 300 K.

**Conditions:** nondegenerate semiconductor in thermal equilibrium; Boltzmann approximation valid for $n_0,n_i\ll N_c,N_v$. #semiconductor

---

### 2. PN Junction and Depletion Region

![](https://www.youtube.com/watch?v=btOIDQeMrMg)

*Video: How a PN Junction Works, with Animation — CircuitBread, 5:03*

**Built-in potential ★**

$$V_0=V_T\ln\frac{N_AN_D}{n_i^2}\ \text{(V)}$$

$V_T$ in V; $N_A,N_D$ in cm⁻³; $n_i$ in cm⁻³.

**Depletion width ★**

$$W=x_n+x_p=\sqrt{\frac{2\varepsilon_s}{q}\left(\frac{1}{N_A}+\frac{1}{N_D}\right)(V_0-V_D)}$$

$\varepsilon_s$ in F/cm; $W$ in cm; $V_D$ = applied voltage (V), positive for forward bias.

**Junction capacitance (transition) ★**

$$C_j=\frac{\varepsilon_sA}{W}=\frac{C_{j0}}{\left(1-\frac{V_D}{V_0}\right)^m}\ \text{(F)}$$

$A$ in cm²; $m=1/2$ (abrupt), $1/3$ (graded), $0$ (heavily doped).

**Charge neutrality in the depletion region**

$$N_Ax_p=N_Dx_n,\qquad \frac{x_n}{x_p}=\frac{N_A}{N_D}$$

**Depletion and diffusion capacitances**

$$C_j=A\sqrt{\frac{q\varepsilon_sN_AN_D}{2(N_A+N_D)(V_0-V_D)}},\qquad C_d=\frac{\tau_T I_D}{V_T}=\frac{I_D\tau_T}{V_T}$$

**Contact potential from doping ratio**

$$V_0=\frac{kT}{q}\ln\frac{N_AN_D}{n_i^2},\qquad E_{max}=\frac{2(V_0-V_D)}{W}\ \text{(V/cm)}$$

**Conditions:** abrupt junction approximation; $V_D<V_0$ for reverse bias validity; depletion approximation ignores mobile carriers inside $W$. #semiconductor

---

### 3. Diode Characteristics and Shockley

![](https://www.youtube.com/watch?v=YpGDuvBlL40)

*Video: Diode Current Equation (Shockley) — EnggClasses, 7:21*

**Shockley diode equation ★**

$$I_D=I_S\left(e^{V_D/nV_T}-1\right)$$

$I_D$ in A, $I_S$ in A, $V_D$ in V, $V_T$ in V, $n=1$ (Ge, ideal) to $2$ (Si, low current).

**Reverse saturation and temperature ★**

$$I_S\propto n_i^2\propto T^{3}e^{-E_g/kT},\qquad I_S\ \text{doubles every}\approx10^\circ\text{C (Si)}$$

**Thermal voltage**

$$V_T=\frac{kT}{q}\approx25.85\ \text{mV at }300\ \text{K},\qquad \frac{dV_T}{dT}=+0.085\ \text{mV/K}$$

**Dynamic (AC) resistance ★**

$$r_d=\frac{nV_T}{I_D}\ \text{(}\Omega\text{)},\qquad r_{d,T}=r_d+\text{bulk resistance }r_B$$

**Reverse breakdown**

$$V_{BR}\propto\frac{1}{N}\ \text{(lighter doping}\Rightarrow\text{higher }V_{BR}\text{)}$$

**Diode temperature coefficient**

$$\frac{dV_D}{dT}\approx-2.0\ \text{mV/}^\circ\text{C at constant }I_D$$

**Zener breakdown mechanism split ★**

| Zener voltage | Dominant mechanism | Temperature coefficient |
|---|---|---|
| $V_Z<5$ V | quantum tunnelling (field emission) | negative |
| $5$–$6$ V | both mechanisms comparable | smallest, near zero |
| $V_Z>6$ V | avalanche multiplication | positive |

Below about 5 V tunnelling dominates and $V_Z$ falls as $T$ rises; above about 6 V avalanche multiplication dominates and $V_Z$ rises with $T$; near 5–6 V both contribute, so $\lvert dV_Z/dT\rvert$ is smallest there.

**Conditions:** $V_T$ in V and $I_D$ in A; forward bias $V_D>0$; the $-1$ term matters only for reverse bias ($I_D\to-I_S$); the Zener mechanism split assumes a normal breakdown junction rather than a heavily doped tunnelling reference. #diode

---

### 4. Diode Models and Load Line

**Three models ★**

$$\begin{aligned}
\text{ideal:}\quad & V_D=0,\ r_d=0\\
\text{constant drop:}\quad & V_D=0.7\ \text{V (Si)},\ 0.3\ \text{V (Ge)}\\
\text{piecewise:}\quad & V_D=V_\gamma+I_Dr_d
\end{aligned}$$

**Load line ★**

$$I_D=\frac{V_{SS}-V_D}{R_L}\ \text{(load line)},\qquad V_D=V_{SS}-I_DR_L$$

**Operating point**

$$I_S\left(e^{V_D/nV_T}-1\right)=\frac{V_{SS}-V_D}{R_L},\qquad r_d=\frac{nV_T}{I_{DQ}}$$

**Load line intercepts**

| Intercept | Condition | Value |
|---|---|---|
| $I_D$ axis | $V_D=0$ | $V_{SS}/R_L$ |
| $V_D$ axis | $I_D=0$ | $V_{SS}$ |
| Q point | both satisfied | $(V_{DQ},I_{DQ})$ |

**Voltage and current swing**

$$\Delta V_D=\Delta I_Dr_d,\qquad \Delta I_D=\frac{\Delta V_{SS}}{R_L+r_d}$$

**Conditions:** DC supply $V_{SS}$ and series $R_L$; small-signal $\Delta V_{SS}\ll nV_T$ for validity of $r_d$; a silicon diode needs $V_{SS}>0.7$ V to conduct. #diode

> [!tip] High-yield ★
> Check conduction first: if $V_{SS}<0.7$ V for silicon, the diode is OFF, $I_D=0$ and the whole load line collapses to the $V_D$ axis. Solving the loop blindly gives a false current.

---

## Part B — Rectifiers, Filters and Waveshaping

### 5. Rectifiers: Half-Wave, Center-Tapped, Bridge

![](https://www.youtube.com/watch?v=RiRyzLl4Y8U)

*Video: Half-Wave and Full-Wave Bridge Rectifiers with Capacitor Filters — The Engineering Mindset, 18:59*

**Output DC voltage ★**

$$V_{dc}=\frac{V_m}{\pi}=0.318V_m\ \text{(half-wave)},\qquad V_{dc}=\frac{2V_m}{\pi}=0.636V_m\ \text{(full-wave)}$$

$V_m$ = peak secondary voltage (V) referred to the conducting path.

**Secondary requirement**

$$V_m=\sqrt2V_{rms}\ \text{(each half secondary)},\qquad V_m=\sqrt2V_{rms}\ \text{(bridge)}$$

**Peak inverse voltage ★**

| Rectifier | PIV per diode |
|---|---|
| Half-wave | $V_m$ |
| Center-tapped | $2V_m$ |
| Bridge | $V_m$ |

**Conduction angle and frequency**

$$\theta_{cond}=180^\circ\ \text{(half-wave)},\qquad 180^\circ\ \text{per diode (full-wave)}$$

$$f_{out}=f_{in}\ \text{(half-wave)},\qquad f_{out}=2f_{in}\ \text{(full-wave)}$$

**Currents and diode ratings**

$$I_{dc}=\frac{V_{dc}}{R_L},\qquad I_{rms}=\frac{I_m}{2}\ \text{(half-wave)},\qquad I_{rms}=\frac{I_m}{\sqrt2}\ \text{(full-wave)}$$

$$I_{surge}=\frac{V_m}{R_L+r_B}\ \text{(first-cycle inrush)}$$

**Conditions:** ideal diodes (no forward drop) unless $0.7$ V/diode is subtracted; resistive load; $V_m$ is the peak of the voltage actually applied to the conducting diode path. #rectifier

---

### 6. Filters, Ripple Factor and PIV

![](https://www.youtube.com/watch?v=MQenzjOrr_Q)

*Video: Ripple Factor of a Capacitor Filter — Usha Rani, 4:40*

**Ripple factor ★**

$$r=\frac{V_{r,rms}}{V_{dc}}=\frac{1}{4\sqrt3 fC R_L}\ \text{(capacitor filter)}$$

$r$ dimensionless; $f$ in Hz, $C$ in F, $R_L$ in $\Omega$.

**Capacitor filter approximation ★**

$$V_r=\frac{I_{dc}}{fC}=\frac{V_{dc}}{fCR_L}\ \text{(peak-to-peak ripple, full-wave)}$$

$$V_r=\frac{I_{dc}}{2fC}\ \text{(half-wave)},\qquad V_{dc}\approx V_m-\frac{V_r}{2}$$

**With diode drop**

$$V_{dc}=V_m-\frac{V_r}{2}-V_\gamma\ \text{(Si: }V_\gamma\approx0.7\text{ V)}$$

**Ripple of unfiltered rectifiers**

| Rectifier | Ripple factor $r$ |
|---|---|
| Half-wave | 1.21 |
| Full-wave / bridge | 0.482 |
| With large capacitor | $\frac{1}{4\sqrt3fCR_L}$ |

**Filter comparison**

| Filter | Effect on ripple |
|---|---|
| Shunt capacitor | attenuates by $1/\omega CR_L$ |
| Series inductor (choke) | attenuates by $R_L/\omega L$ |
| LC ($\pi$) | product of both; sharpest |

**Conditions:** large-$C$ approximation ($\omega CR_L\gg1$); full-wave uses $2f$ in the ripple expression; $r=1.21$ for half-wave with no filter. #rectifier #filter

> [!warning] Exam trap
> Use $f$ (not $2f$) for half-wave ripple and $2f$ for full-wave. Also PIV for a **center-tapped** rectifier is $2V_m$, twice the bridge's $V_m$ — the most frequently swapped pair of numbers.

---

### 7. Clippers, Clampers and Multipliers

![](https://www.youtube.com/watch?v=PRzrS6NOyAY)

*Video: Clamper Circuits — The Organic Chemistry Tutor, 19:24*

**Clipper output levels ★**

$$v_o=\begin{cases}v_i,& v_i<V_{ref}\\V_{ref},& v_i\ge V_{ref}\end{cases}\ \text{(positive clipper)}$$

$$v_o=\begin{cases}V_{ref},& v_i\le V_{ref}\\v_i,& v_i>V_{ref}\end{cases}\ \text{(negative clipper)}$$

**Clipping levels with a biased diode**

$$V_{clip,top}=V_{ref}+V_\gamma\ \text{(V)},\qquad V_{clip,bot}=V_{ref}-V_\gamma$$

**Clamper shift ★**

$$v_o=v_i+2V_m\ \text{(positive clamper)},\qquad v_o=v_i-2V_m\ \text{(negative clamper)}$$

**Real-diode clamp level ★**

$$v_{o,peak}=V_m+V_\gamma\ \text{with }V_\gamma\approx0.7\ \text{V (Si)}$$

The ideal levels $v_o=v_i\pm2V_m$ are the limiting case $V_\gamma\to0$.

**Clamper peak values**

$$v_{o,max}=2V_m,\qquad v_{o,min}=0\ \text{(positive clamper)}$$

**Voltage multipliers ★**

$$V_{out}=nV_m\ \text{(half-wave, }n\text{ stages)},\qquad V_{out}=2nV_m\ \text{(full-wave)}$$

**Multiplier ratings**

| Multiplier | Output | PIV per diode |
|---|---|---|
| Doubler | $2V_m$ | $2V_m$ |
| Tripler | $3V_m$ | $2V_m$ |
| $n$-stage CW | $nV_m$ | $2V_m$ |

**Conditions:** ideal diodes unless $V_\gamma$ is added; clamps require $RC\gg T$ so the capacitor does not discharge during a cycle; multiplier loading reduces output; real-diode clamp levels shift up by $V_\gamma\approx0.7$ V for silicon, with the ideal levels as $V_\gamma\to0$. #diode

---

### 8. Zener Diodes and Shunt Regulators

![](https://www.youtube.com/watch?v=mmiHX_IzvDw)

*Video: Zener Diodes — The Organic Chemistry Tutor, 11:10*

**Zener regulator relations ★**

$$V_L=V_Z\ \text{(regulation region)},\qquad I_S=\frac{V_S-V_Z}{R_S}$$

$$I_Z=I_S-I_L,\qquad I_L=\frac{V_Z}{R_L}$$

**Series resistor bounds ★**

$$R_{S,max}=\frac{V_{S,min}-V_Z}{I_{Z,min}+I_{L,max}},\qquad R_{S,min}=\frac{V_{S,max}-V_Z}{I_{Z,max}+I_{L,min}}$$

$V$ in V, $I$ in A, $R_S$ in $\Omega$.

**Line and load regulation**

$$\text{Line reg}=\frac{\Delta V_L}{\Delta V_S},\qquad \text{Load reg}=\frac{\Delta V_L}{\Delta I_L}$$

**Zener model**

$$V_Z=V_{Z0}+I_Zr_Z,\qquad r_Z=\frac{\Delta V_Z}{\Delta I_Z}\ \text{(}\Omega\text{)}$$

**Dissipation and temperature**

$$P_Z=V_ZI_Z\ \text{(W)},\qquad P_{Z,max}=V_ZI_{Z,max},\qquad \text{TC}\approx+0.1\%/^\circ\text{C}$$

**Conditions:** Zener must remain reverse-biased in breakdown: $I_{Z,min}\le I_Z\le I_{Z,max}$; if the load is removed, all of $I_S$ flows through the Zener. #diode

## Part C — Transistors and Optoelectronics

### 9. BJT Structure and Operating Regions

![](https://www.youtube.com/watch?v=VuxAz0fvMnA)

*Video: Operating Regions of Bipolar Junction Transistors — CircuitBread, 7:30*

**Terminal currents ★**

$$I_E=I_C+I_B$$

$I_E,I_C,I_B$ in A (or mA/µA); emitter is the most heavily doped, base the thinnest and lightest.

**Operating regions ★**

| Region | Base-emitter | Base-collector | Application |
|---|---|---|---|
| Cutoff | reverse | reverse | open switch |
| Active | forward | reverse | amplifier |
| Saturation | forward | forward | closed switch |
| Inverse active | reverse | forward | rarely used |

**Region voltages**

$$V_{BE}\approx0.7\ \text{V (Si, active)},\qquad V_{CE,sat}\approx0.2\ \text{V},\qquad V_{BE,cutoff}<0.5\ \text{V}$$

**Bias summary**

$$V_{BE}>0,\ V_{BC}<0\ \Rightarrow\ \text{active};\qquad V_{BE}>0,\ V_{BC}>0\ \Rightarrow\ \text{saturation}$$

**Conditions:** Si device at room temperature; $V_{CE,sat}$ and $V_{BE}$ are approximations that shift $-2$ mV/°C; active region requires $V_{CE}>V_{CE,sat}$. #bjt

---

### 10. BJT Current Gains and Relationships

**Gain definitions ★**

$$\alpha=\frac{I_C}{I_E},\qquad \beta=\frac{I_C}{I_B},\qquad \gamma=1+\beta=\frac{I_E}{I_B}$$

$\alpha,\beta,\gamma$ dimensionless; $\alpha<1$ (typically 0.98–0.998), $\beta$ typically 50–300.

**Conversion relations ★**

$$\beta=\frac{\alpha}{1-\alpha},\qquad \alpha=\frac{\beta}{1+\beta},\qquad \gamma=1+\beta=\frac{1}{1-\alpha}$$

**Leakage current**

$$I_{CEO}=\frac{I_{CBO}}{1-\alpha}=(1+\beta)I_{CBO},\qquad I_C=\alpha I_E+I_{CBO}$$

**Current division**

$$I_B=\frac{I_C}{\beta}=\frac{I_E}{1+\beta},\qquad I_E=\frac{I_C}{\alpha}=(\beta+1)I_B$$

**Power and thermal**

$$P_D=V_{CE}I_C+V_{BE}I_B\approx V_{CE}I_C\ \text{(W)},\qquad \beta\ \text{rises}\approx0.5\%/^\circ\text{C}$$

**Conditions:** active region; $\alpha$, $\beta$ are DC (h_FE) at the Q point and differ slightly from AC values (h_fe); $I_{CBO}$ is the reverse leakage of the reverse-biased collector junction. #bjt

> [!tip] High-yield ★
> $\beta=\alpha/(1-\alpha)$ and $\alpha=\beta/(1+\beta)$ are asked almost every exam. Memorize the pair, plus $\gamma=1+\beta$.

---

### 11. JFET Characteristics and Pinch-Off

**Shockley JFET equation ★**

$$I_D=I_{DSS}\left(1-\frac{V_{GS}}{V_P}\right)^2\ \text{(saturation region)}$$

$I_{DSS}$ in A (at $V_{GS}=0$), $V_P$ in V (negative for n-channel), $V_{GS}$ in V.

**Pinch-off and saturation conditions ★**

$$V_{DS}=V_{GS}-V_P\ \text{(pinch-off boundary)},\qquad V_{DS}>V_{GS}-V_P\ \text{(saturation)}$$

**Transconductance ★**

$$g_m=\frac{dI_D}{dV_{GS}}=\frac{2I_{DSS}}{\lvert V_P\rvert}\left(1-\frac{V_{GS}}{V_P}\right)=\frac{2I_D}{V_{GS}-V_P}$$

$$g_m=g_{m0}\left(1-\frac{V_{GS}}{V_P}\right),\qquad g_{m0}=\frac{2I_{DSS}}{\lvert V_P\rvert}\ \text{(S)}$$

**Output resistance and parameter relations**

$$r_d=\frac{\Delta V_{DS}}{\Delta I_D}\ \text{(}\Omega\text{)},\qquad \mu=g_mr_d\ \text{(dimensionless)}$$

**Regions**

| Region | Condition | Behavior |
|---|---|---|
| Ohmic | $V_{DS}<V_{GS}-V_P$ | voltage-controlled resistor |
| Saturation | $V_{DS}\ge V_{GS}-V_P$ | constant-current amplifier |
| Cutoff | $V_{GS}<V_P$ | $I_D\approx0$ |

**Conditions:** n-channel JFET; $V_{GS}$ between $V_P$ and 0; gate current is negligible ($I_G\approx0$) so the gate is a high-impedance input. #fet

---

### 12. MOSFET Types and Regions

![](https://www.youtube.com/watch?v=o3M2sOCGCKs)

*Video: Regions of Operation for a FET — CircuitBread, 4:50*

**Drain current in saturation ★**

$$I_D=\frac{k_n'}{2}\frac{W}{L}\left(V_{GS}-V_{th}\right)^2\ \text{(enhancement)},\qquad I_D=I_{DSS}\left(1-\frac{V_{GS}}{V_P}\right)^2\ \text{(depletion)}$$

$k_n'=\mu_nC_{ox}$ in A/V²; $W,L$ in µm; $V_{th}$ in V.

**Triode (ohmic) region**

$$I_D=k_n'\frac{W}{L}\left[(V_{GS}-V_{th})V_{DS}-\frac{V_{DS}^2}{2}\right]$$

**Boundary and transconductance ★**

$$V_{DS}=V_{GS}-V_{th}\ \text{(saturation boundary)},\qquad g_m=k_n'\frac{W}{L}(V_{GS}-V_{th})=\frac{2I_D}{V_{GS}-V_{th}}$$

**MOSFET types**

| Type | $V_{th}$ (n-ch) | $I_D$ at $V_{GS}=0$ | Turn-on |
|---|---|---|---|
| Enhancement | $>0$ | 0 | $V_{GS}>V_{th}$ |
| Depletion | $<0$ | $I_{DSS}$ | $V_{GS}>V_P$ |

**Body effect**

$$V_{th}=V_{th0}+\gamma\left(\sqrt{2\phi_F+V_{SB}}-\sqrt{2\phi_F}\right)$$

**Conditions:** n-channel enhancement MOSFET; saturation requires $V_{DS}\ge V_{GS}-V_{th}$; $I_G=0$, and $C_{ox}$ in F/cm² makes $k_n'$ in A/V². #mosfet

---

### 13. Thyristors: UJT, SCR, DIAC, TRIAC

![](https://www.youtube.com/watch?v=hNRzK9SiqQA)

*Video: What Is a Thyristor? SCR, DIAC and TRIAC — Electronic Applications, 4:06*

**SCR latching and holding ★**

$$I_L\ \text{(latching, A)}>I_H\ \text{(holding, A)},\qquad I_A>I_L\ \text{to stay on}$$

Once latched, the gate loses control; the SCR turns off only when $I_A<I_H$.

**SCR power and firing**

$$P=V_{AK}I_A\ \text{(W)},\qquad \text{conduction angle }\theta=\pi-\alpha\ \text{(rad)}$$

**UJT intrinsic standoff ratio ★**

$$\eta=\frac{R_{B1}}{R_{B1}+R_{B2}},\qquad V_P=\eta V_{BB}+V_D$$

$\eta$ dimensionless (typ. 0.5–0.8); $V_P$ = peak voltage (V); $V_D\approx0.7$ V.

**UJT oscillation frequency**

$$f=\frac{1}{RC\ln\frac{1}{1-\eta}}\ \text{(Hz)}$$

**DIAC and TRIAC**

$$V_{BO}\ \text{(DIAC breakover, V)},\qquad \text{TRIAC conducts both half-cycles}$$

**Device comparison ★**

| Device | Terminals | Control | Conducts |
|---|---|---|---|
| SCR | 3 (A, K, G) | gate pulse | one direction |
| TRIAC | 3 (MT1, MT2, G) | gate pulse | both directions |
| DIAC | 2 | breakover voltage | both directions |
| UJT | 3 (E, B1, B2) | emitter peak | relaxation oscillator |

**Conditions:** SCR/TRIAC require $I_A>I_L$ to latch after the gate pulse; UJT timing assumes $R$ large enough that the emitter does not load the base divider. #thyristor

---

### 14. Optoelectronics and Solar Cells

**Photon energy ★**

$$E_{ph}=\frac{hc}{\lambda}=\frac{1.24}{\lambda}\ \text{eV with }\lambda\ \text{in }\mu\text{m}$$

$h=6.626\times10^{-34}$ J·s, $c=3\times10^8$ m/s, $\lambda$ in m.

**LED and photodiode relations**

$$\lambda=\frac{hc}{E_g}\ \text{(emission wavelength)},\qquad I_{ph}=R_\lambda P_{opt}$$

$R_\lambda$ = responsivity in A/W, $P_{opt}$ in W, $I_{ph}$ in A.

**Solar cell ★**

$$I=I_L-I_0\left(e^{V/nV_T}-1\right),\qquad V_{oc}=nV_T\ln\left(\frac{I_L}{I_0}+1\right)$$

$$P_{max}=V_{mp}I_{mp},\qquad FF=\frac{V_{mp}I_{mp}}{V_{oc}I_{sc}}=\frac{P_{max}}{V_{oc}I_{sc}}$$

**Efficiency**

$$\eta=\frac{P_{max}}{P_{in}}=\frac{V_{oc}I_{sc}FF}{P_{in}},\qquad P_{in}=1000\ \text{W/m}^2\ \text{(STC)}$$

**Optoelectronic device table**

| Device | Bias | Function |
|---|---|---|
| LED | forward | emits light at $E_g$ |
| Photodiode | reverse | light to current |
| Phototransistor | active | light to amplified current |
| Solar cell | none | light to power |
| Optocoupler | — | isolation |

**Conditions:** photons must have $E_{ph}\ge E_g$ to generate carriers; $FF$ dimensionless, typically 0.7–0.85; STC at 25 °C and AM1.5. #optoelectronics

---

### 15. Special Diodes: Varactor, Schottky, Tunnel

**Varactor tuning ★**

$$C_j=\frac{C_0}{(1+V_R/V_0)^m},\qquad f_r=\frac{1}{2\pi\sqrt{LC_j}}$$

$C_j$ in F, $V_R$ in V (reverse), $m=1/2$ abrupt, $f_r$ in Hz.

**Varactor sensitivity**

$$\frac{C_{max}}{C_{min}}=\left(\frac{1+V_{R,max}/V_0}{1+V_{R,min}/V_0}\right)^{-m},\qquad \text{tuning ratio }=\sqrt{\frac{C_{max}}{C_{min}}}$$

**Schottky diode**

$$V_F\approx0.3\ \text{V (Si Schottky)},\qquad t_{rr}\approx0\ \text{(no stored minority charge)}$$

Metal-semiconductor junction; low forward drop and very fast switching.

**Tunnel diode ★**

$$I_{peak}>I_{valley}\ \text{for negative resistance},\qquad \text{NDR region between }V_P\ \text{and}\ V_V$$

$$\text{Figure of merit}=\frac{I_P}{I_V}\ \text{(typ. 5–10)}$$

**Special-diode comparison ★**

| Diode | Key property | Primary use |
|---|---|---|
| Varactor | voltage-variable $C_j$ | tuning, VCO |
| Schottky | low $V_F$, fast | RF, switching, clamps |
| Tunnel | negative resistance | microwave oscillators |
| Zener | breakdown reference | regulation |
| LED | photon emission | display, lighting |

**Conditions:** varactor always reverse-biased; tunnel diode biased in the NDR region for oscillation or amplification; Schottky has higher reverse leakage than a PN junction. #diode

> [!warning] Exam trap
> The tunnel diode needs its **DC bias inside the negative-resistance region** — between peak and valley. Reverse-bias or over-bias puts it in a normal positive-resistance region and no oscillation occurs.

→ Back to [[00_Index]]
