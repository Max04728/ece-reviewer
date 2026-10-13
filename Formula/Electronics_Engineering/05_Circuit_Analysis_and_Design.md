---
title: Circuit Analysis and Design
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 18
---

# Circuit Analysis and Design

## Part A — Biasing

### 1. BJT DC Biasing Configurations

![](https://www.youtube.com/watch?v=VKr9SB3cULc)

*Video: Voltage Divider Bias — Neso Academy, 11:42*

**Fixed bias (base bias) ★**

$$I_B=\frac{V_{CC}-V_{BE}}{R_B},\qquad I_C=\beta I_B,\qquad V_{CE}=V_{CC}-I_CR_C$$

$V$ in V, $I$ in A, $R$ in $\Omega$.

**Emitter-stabilized bias ★**

$$I_B=\frac{V_{CC}-V_{BE}}{R_B+(\beta+1)R_E},\qquad V_{CE}=V_{CC}-I_C(R_C+R_E)$$

**Voltage-divider bias ★**

$$V_{TH}=\frac{R_2}{R_1+R_2}V_{CC},\qquad R_{TH}=R_1\parallel R_2$$

$$I_B=\frac{V_{TH}-V_{BE}-I_ER_E}{R_{TH}},\qquad I_E=\frac{V_{TH}-V_{BE}}{R_E+\frac{R_{TH}}{\beta+1}}$$

**Collector-feedback bias**

$$I_B=\frac{V_{CC}-V_{BE}}{R_B+(\beta+1)(R_C+R_E)},\qquad V_{CE}=V_{CC}-I_C(R_C+R_E)$$

**Configuration comparison ★**

| Configuration | Stability | Notes |
|---|---|---|
| Fixed bias | poor | $I_C$ tracks $\beta$ directly |
| Emitter-stabilized | good | $R_E$ provides DC feedback |
| Voltage-divider | best | $R_{TH}$ small, $I_E$ set by $R_E$ |
| Collector-feedback | good | $R_B$ from collector |

**Approximate divider rule**

$$V_B=\frac{R_2}{R_1+R_2}V_{CC},\ V_E=V_B-V_{BE},\ I_E=\frac{V_E}{R_E}\ \text{if }\beta R_E\ge10R_{TH}$$

**Conditions:** active region assumed; $V_{BE}\approx0.7$ V (Si); approximate divider analysis valid only when $\beta R_E\ge10R_{TH}$. #bjt

> [!tip] High-yield ★
> In voltage-divider bias, if $\beta R_E\ge10R_{TH}$ the base current is negligible and $I_E\approx(V_B-0.7)/R_E$ — independent of $\beta$. This approximation is the fastest, most-tested route.

---

### 2. Load Lines and Q Point

![](https://www.youtube.com/watch?v=5T84Jzcgj7M)

*Video: Q-Point and Load Line in Transistor Biasing — ALL ABOUT ELECTRONICS, 15:02*

**DC load line ★**

$$I_C=\frac{V_{CC}-V_{CE}}{R_{DC}},\qquad V_{CE}=V_{CC}-I_CR_{DC}$$

$R_{DC}$ = total DC collector-emitter resistance in $\Omega$.

**AC load line ★**

$$I_C=I_{CQ}+\frac{V_{CEQ}-V_{CE}}{r_{ac}},\qquad r_{ac}=R_C\parallel R_L$$

**Intercepts**

| Line | $I_C$ intercept | $V_{CE}$ intercept | Slope magnitude |
|---|---|---|---|
| DC | $V_{CC}/R_{DC}$ | $V_{CC}$ | $1/R_{DC}$ |
| AC | $I_{CQ}+V_{CEQ}/r_{ac}$ | $V_{CEQ}+I_{CQ}r_{ac}$ | $1/r_{ac}$ |

**Maximum unclipped output**

$$V_{pp}=2\min\big(I_{CQ}r_{ac},\ V_{CEQ}-V_{CE,sat}\big)$$

$$V_{o,max}=\min\big(I_{CQ}r_{ac},V_{CEQ}\big)\ \text{(peak, V)}$$

**Q point and power**

$$P_{DQ}=V_{CEQ}I_{CQ}\ \text{(W)},\qquad I_{CQ}=\frac{V_{CC}-V_{CEQ}}{R_{DC}}$$

**Conditions:** AC load line passes through the **same Q point** as the DC line with a steeper slope $1/r_{ac}$; clipping is symmetric only if both limits match. #bjt

---

### 3. Bias Stability and Stability Factors

**Stability factor ★**

$$S_{I_{CO}}=\frac{\partial I_C}{\partial I_{CO}},\qquad S_{V_{BE}}=\frac{\partial I_C}{\partial V_{BE}},\qquad S_\beta=\frac{\partial I_C}{\partial\beta}$$

**Symbols**

- $S_{I_{CO}}$ — stability factor relating collector current to collector leakage current, dimensionless
- $S_{V_{BE}}$ — stability factor relating collector current to base-emitter voltage, in S
- $S_\beta$ — stability factor relating collector current to current gain, dimensionless
- $I_C$ — collector current, in A
- $I_{CO}$ — collector-base leakage current with the emitter open, in A
- $V_{BE}$ — base-emitter voltage, in V
- $\beta$ — forward current gain, dimensionless

All dimensionless except $S_{V_{BE}}$ in S.

**Ideal and practical values ★**

$$S_{I_{CO}}\ \text{ideal}=1\ \text{(lowest, most stable)},\qquad S_\beta\ \text{ideal}=0$$

**Common configurations**

$$S_{I_{CO}}=1+\beta\ \text{(fixed bias)},\qquad S_{I_{CO}}=\frac{1+\beta}{1+\beta\frac{R_E}{R_E+R_B}}\ \text{(emitter-stabilized)}$$

$$S_{I_{CO}}=\frac{(\beta+1)(R_E+R_B)}{R_E(\beta+1)+R_B}\ \text{(general)}$$

**Symbols**

- $R_E$ — emitter resistance, in $\Omega$
- $R_B$ — base resistance, in $\Omega$

**Stability relations**

$$S_\beta=\frac{I_{C1}}{\beta_1}S_{I_{CO}}\ \text{(for }\beta\text{ change)}\qquad \Delta I_C=S_\beta\Delta\beta+S_{V_{BE}}\Delta V_{BE}+S_{I_{CO}}\Delta I_{CO}$$

**Symbols**

- $I_{C1}$ — collector current at the initial (pre-change) operating point, in A
- $\beta_1$ — forward current gain at the initial operating point, dimensionless
- $\Delta I_C$ — change in collector current from the initial operating point, in A
- $\Delta\beta$ — change in forward current gain from the initial operating point, dimensionless
- $\Delta V_{BE}$ — change in base-emitter voltage from the initial operating point, in V
- $\Delta I_{CO}$ — change in collector leakage current from the initial operating point, in A

**Thermal stability**

$$P_D=V_{CE}I_C,\qquad \frac{dP_D}{dT}\ \text{must stay below the derated }P_{D,max}$$

**Symbols**

- $P_D$ — device power dissipation, in W
- $V_{CE}$ — collector-emitter voltage, in V
- $T$ — device junction temperature, in °C
- $P_{D,max}$ — maximum (derated) allowable device power dissipation, in W

**Conditions:** $S_{I_{CO}}$ as close to 1 as possible for the best thermal stability; larger $R_E$ lowers both $S_{I_{CO}}$ and $S_\beta$ but costs headroom. #bjt

---

### 4. FET Biasing Configurations

**Self-bias (JFET) ★**

$$I_D=I_{DSS}\left(1-\frac{V_{GS}}{V_P}\right)^2,\qquad V_{GS}=-I_DR_S$$

**Voltage-divider bias (JFET)**

$$V_G=\frac{R_2}{R_1+R_2}V_{DD},\qquad V_{GS}=V_G-I_DR_S$$

**Fixed bias (JFET)**

$$V_{GS}=-V_{GG},\qquad I_D=I_{DSS}\left(1+\frac{V_{GG}}{V_P}\right)^2$$

**Enhancement MOSFET feedback bias**

$$V_{GS}=V_{DD}-I_DR_D,\qquad V_{DS}=V_{DD}-I_D(R_D+R_S)$$

**Summary of FET configurations**

| Configuration | $V_{GS}$ relation | Device |
|---|---|---|
| Self-bias | $V_{GS}=-I_DR_S$ | JFET / depletion |
| Voltage divider | $V_{GS}=V_G-I_DR_S$ | JFET / depletion |
| Fixed | $V_{GS}=-V_{GG}$ | JFET |
| Feedback | $V_{GS}=V_{DD}-I_DR_D$ | enhancement MOSFET |

**Conditions:** JFET in saturation with $V_{DS}\ge V_{GS}-V_P$; MOSFET must have $V_{GS}>V_{th}$; $I_G\approx0$ so the gate divider is unloaded. #fet

## Part B — Small Signal and Multistage

### 5. BJT Small-Signal h-Parameter Model

![](https://www.youtube.com/watch?v=jZ-pD8nVD6s)

*Video: Transistor Amplifier Analysis Using h-Parameters — Neso Academy, 8:31*

**h-parameter equations ★**

$$\mathbf{V}_{be}=h_{ie}\mathbf{I}_b+h_{re}\mathbf{V}_{ce},\qquad \mathbf{I}_c=h_{fe}\mathbf{I}_b+h_{oe}\mathbf{V}_{ce}$$

**Symbols**

- $\mathbf{V}_{be}$ — small-signal base-emitter voltage phasor, in V
- $\mathbf{I}_b$ — small-signal base current phasor, in A
- $\mathbf{V}_{ce}$ — small-signal collector-emitter voltage phasor, in V
- $\mathbf{I}_c$ — small-signal collector current phasor, in A
- $h_{ie}$ — input impedance (hybrid parameter), in $\Omega$
- $h_{re}$ — reverse voltage feedback ratio (hybrid parameter), dimensionless
- $h_{fe}$ — forward current gain (hybrid parameter), dimensionless
- $h_{oe}$ — output admittance (hybrid parameter), in S
- $r_\pi=h_{ie}$ — small-signal base-emitter input resistance, in $\Omega$
- $r_o=1/h_{oe}$ — small-signal output resistance of the transistor, in $\Omega$

**Parameter meanings and units ★**

| Parameter | Value | Unit | Meaning |
|---|---|---|---|
| $h_{ie}$ | $r_\pi$ | $\Omega$ | input impedance |
| $h_{re}$ | $\approx10^{-4}$ | — | reverse voltage ratio |
| $h_{fe}$ | $\beta$ | — | forward current gain |
| $h_{oe}$ | $1/r_o$ | S | output admittance |

**Typical CE values**

$$h_{ie}\approx1\ \text{k}\Omega,\qquad h_{fe}\approx100,\qquad h_{re}\approx2\times10^{-4},\qquad h_{oe}\approx25\ \mu\text{S}$$

**Gain expressions ★**

$$A_v=\frac{-h_{fe}R_L'}{h_{ie}},\qquad A_i=\frac{h_{fe}}{1+h_{oe}R_L'},\qquad R_{in}=h_{ie}$$

$$R_{out}=\frac{1}{h_{oe}}\ \text{(open-source approximation)}$$

**Symbols**

- $A_v$ — mid-band small-signal voltage gain, dimensionless
- $A_i$ — mid-band small-signal current gain, dimensionless
- $R_L'$ — effective AC load resistance ($R_C\parallel R_L$), in $\Omega$
- $R_{in}$ — amplifier input resistance, in $\Omega$
- $R_{out}$ — amplifier output resistance, in $\Omega$

**Approximate analysis rules**

$$h_{re}\mathbf{V}_{ce}\approx0,\qquad h_{oe}\approx0\ \text{when }R_L'\ll r_o$$

**Conditions:** small-signal linearization about the Q point; $h_{re}$ is usually neglected; all four h parameters are measured at the Q point. #bjt

---

### 6. Small-Signal re Model: CE, CB, CC

![](https://www.youtube.com/watch?v=ZUXG9eZfSlw)

*Video: Common Emitter Amplifier — The Organic Chemistry Tutor, 11:25*

**Base-emitter dynamic resistance ★**

$$r_e=\frac{V_T}{I_E}=\frac{26\ \text{mV}}{I_E}\ \text{(}\Omega\text{ with }I_E\text{ in mA)}$$

$$r_\pi=\beta r_e,\qquad g_m=\frac{I_C}{V_T}=\frac{1}{r_e}\ \text{(S)}$$

**Symbols**

- $r_e$ — base-emitter dynamic (AC) resistance, in $\Omega$
- $V_T$ — thermal voltage ($\approx26$ mV at room temperature), in V
- $I_E$ — DC emitter current, in A
- $I_C$ — DC collector current, in A
- $\beta$ — forward current gain, dimensionless
- $r_\pi=\beta r_e$ — small-signal base-emitter input resistance, in $\Omega$
- $g_m=I_C/V_T=1/r_e$ — small-signal transconductance, in S

**CE amplifier ★**

$$A_v=-\frac{R_C\parallel R_L}{r_e},\qquad A_i=\beta,\qquad R_{in}=\beta r_e,\qquad R_{out}=R_C$$

**CE with unbypassed emitter ★**

$$A_v=-\frac{R_C\parallel R_L}{r_e+R_E},\qquad R_{in}=\beta\big[r_e+(1+\beta)R_E\big]$$

**Symbols**

- $R_E$ — emitter resistance, in $\Omega$
- $f_L$ — lower cutoff (low-corner) frequency of the amplifier, in Hz

Removing the emitter bypass capacitor lowers the midband gain, raises the input impedance, and lowers the lower cutoff frequency $f_L$.

**CB amplifier**

$$A_v=+\frac{R_C\parallel R_L}{r_e},\qquad A_i\approx1,\qquad R_{in}=r_e,\qquad R_{out}=R_C$$

**CC (emitter follower) ★**

$$A_v=\frac{R_E\parallel R_L}{R_E\parallel R_L+r_e}\approx1,\qquad A_i=\beta+1,\qquad R_{in}=\beta(R_E\parallel R_L)$$

$$R_{out}=R_E\parallel\left(r_e+\frac{R_{in,source}}{\beta}\right)$$

**Symbols**

- $R_{in,source}$ — source (generator) resistance driving the amplifier input, in $\Omega$

**Comparison of the three configurations ★**

| Config | $A_v$ | $A_i$ | $R_{in}$ | $R_{out}$ | Phase |
|---|---|---|---|---|---|
| CE | $-g_mR_L'$ | $\beta$ | $\beta r_e$ | $R_C$ | 180° |
| CB | $+g_mR_L'$ | $\approx1$ | $r_e$ | $R_C$ | 0° |
| CC | $\approx1$ | $\beta+1$ | high | low | 0° |

**Conditions:** active region, mid-band (coupling and bypass capacitors are AC shorts); $V_T\approx26$ mV at room temperature; unbypassing $R_E$ lowers the midband gain, raises the input impedance, and lowers $f_L$. #bjt

> [!warning] Exam trap
> CE output is **inverted** (180°) and CC output is **in phase** (0°). Swapping the sign of $A_v$ in a CE stage cascades into a wrong overall phase or polarity for the whole amplifier.

---

### 7. Hybrid-Pi Model

![](https://www.youtube.com/watch?v=yUEss0Dl6ww)

*Video: Hybrid-π Model — Neso Academy, 11:27*

**Model parameters ★**

$$g_m=\frac{I_C}{V_T}\ \text{(S)},\qquad r_\pi=\frac{\beta}{g_m}=\frac{\beta V_T}{I_C}\ \text{(}\Omega\text{)},\qquad r_o=\frac{V_A}{I_C}\ \text{(}\Omega\text{)}$$

$$r_e=\frac{\alpha}{g_m},\qquad g_m=\frac{\beta}{r_\pi}$$

$V_A$ = Early voltage in V; 1 S = 1 A/V.

**High-frequency capacitances**

$$f_T=\frac{g_m}{2\pi(C_\pi+C_\mu)},\qquad C_\pi=\frac{g_m}{2\pi f_T}-C_\mu$$

$f_T$ = unity-gain bandwidth in Hz; $C_\pi,C_\mu$ in F.

**Voltage gain and Miller capacitance ★**

$$A_v=-g_m(r_o\parallel R_C\parallel R_L),\qquad C_{in}=C_\pi+C_\mu(1+\lvert A_v\rvert)$$

**Early voltage and output resistance**

$$r_o=\frac{V_A+V_{CE}}{I_C}\approx\frac{V_A}{I_C},\qquad \lambda=\frac{1}{V_A}\ \text{(V}^{-1}\text{)}$$

**Conditions:** small-signal mid-band unless capacitances are included; constant $I_C$ for $C_\pi$ extraction; $r_o$ is neglected when $R_L'\ll r_o$. #bjt

---

### 8. FET Amplifiers: CS, CD, CG

![](https://www.youtube.com/watch?v=QGNA5i-2Dig)

*Video: Comparison of CS, CG and CD Amplifiers — Inderjit Singh Dhanjal, 5:00*

**Common source ★**

$$A_v=-g_m(r_d\parallel R_D\parallel R_L),\qquad A_v=-\frac{R_D\parallel R_L}{1/g_m+R_S\parallel R_D},\ \text{with }R_S\text{ unbypassed}$$

$$R_{in}=R_G,\qquad R_{out}=R_D\parallel r_d$$

**Symbols**

- $A_v$ — mid-band voltage gain, dimensionless
- $g_m$ — small-signal transconductance, in S
- $r_d$ — small-signal drain (output) resistance of the FET, in $\Omega$
- $R_D$ — drain resistance, in $\Omega$
- $R_L$ — load resistance, in $\Omega$
- $R_S$ — source resistance, in $\Omega$
- $R_G$ — gate resistance, in $\Omega$
- $R_{in}$ — amplifier input resistance, in $\Omega$
- $R_{out}$ — amplifier output resistance, in $\Omega$
- $R_D'=r_d\parallel R_D\parallel R_L$ — effective AC drain load, in $\Omega$

**Common drain (source follower) ★**

$$A_v=\frac{g_m(r_d\parallel R_S\parallel R_L)}{1+g_m(r_d\parallel R_S\parallel R_L)}\approx\frac{g_mR_S'}{1+g_mR_S'}$$

$$R_{in}=R_G,\qquad R_{out}=\frac{1}{g_m}\parallel R_S$$

**Symbols**

- $R_S'=r_d\parallel R_S\parallel R_L$ — effective AC source load, in $\Omega$

**Common gate**

$$A_v=+g_m(r_d\parallel R_D\parallel R_L),\qquad A_i\approx1,\qquad R_{in}=\frac{1}{g_m},\qquad R_{out}\approx R_D$$

**Symbols**

- $A_i$ — mid-band current gain, dimensionless

**Comparison ★**

| Config | $A_v$ | $R_{in}$ | $R_{out}$ | Phase |
|---|---|---|---|---|
| CS | $-g_mR_D'$ | very high | $R_D$ | 180° |
| CD | $<1$ | very high | $1/g_m$ (low) | 0° |
| CG | $+g_mR_D'$ | $1/g_m$ (low) | $R_D$ | 0° |

**Conditions:** saturation region; $r_d$ often neglected when $r_d\gg R_D$; CD is used as a buffer because of its low output impedance. #fet #mosfet

---

### 9. Multistage, Cascade and Cascode

![](https://www.youtube.com/watch?v=QjwNm421v7Y)

*Video: Cascode Amplifier (BJT): DC Analysis — Ekeeda, 14:33*

**Overall gain ★**

$$A_{v,total}=A_{v1}A_{v2}\cdots A_{vn},\qquad A_{v,total}(\text{dB})=20\log_{10}\lvert A_{v,total}\rvert$$

**Loading and impedances**

$$R_{in}=R_{in1},\qquad R_{out}=R_{out,n},\qquad A_{v,k}\ \text{uses the load of stage }k+1$$

**Cascode gain and bandwidth**

$$A_v=-g_mR_C\ \text{(approximately, single-stage value)}$$

$$BW_{cascode}\gg BW_{CE}\ \text{(reduced Miller effect on }C_\mu)$$

**Bandwidth of a cascade ★**

$$f_{2,total}=f_2\sqrt{2^{1/n}-1}\ \text{for the corner of the whole chain}$$

**Cascade corner rule ★**

$$BW\approx f_H(\text{lowest})-f_L(\text{highest})$$

$f_H$ in Hz, $f_L$ in Hz; the highest low-cutoff and the lowest high-cutoff dominate, so adding stages always narrows the overall bandwidth.

**Gain-bandwidth trade**

$$A_{v,total}\cdot f_{2,total}\approx\text{constant for a given device}$$

**Conditions:** each stage loaded by the input impedance of the next; direct-coupled stages shift DC levels, so offset must be tracked; identical-stage bandwidth formula assumes equal single-pole corners; in a cascade the highest $f_L$ and the lowest $f_H$ set the overall bandwidth. #bjt

---

### 10. Darlington and Feedback Pairs

![](https://www.youtube.com/watch?v=hC57Pclhk3A)

*Video: Darlington Pair — Neso Academy, 9:36*

**Darlington current gain ★**

$$\beta_D=\beta_1\beta_2+\beta_1+\beta_2\approx\beta_1\beta_2$$

**Darlington input and output impedance**

$$R_{in,D}=\beta_D R_E,\qquad R_{out,D}\approx\frac{r_{e1}+R_{source}/\beta_1}{\beta_2}+r_{e2}$$

**Base-emitter voltage stack**

$$V_{BE,D}=V_{BE1}+V_{BE2}\approx1.4\ \text{V (Si)}$$

**Feedback pair (complementary)**

$$\beta_{pair}\approx\beta_1\beta_2,\qquad V_{BE,pair}\approx0.7\ \text{V (single junction)}$$

**Comparison**

| Property | Darlington | Feedback pair |
|---|---|---|
| $\beta$ | $\approx\beta_1\beta_2$ | $\approx\beta_1\beta_2$ |
| $V_{BE}$ drop | $\approx1.4$ V | $\approx0.7$ V |
| Devices | same type | complementary |
| Use | buffer, high $Z_{in}$ | better headroom |

**Conditions:** both transistors in the active region; Darlington needs $\approx1.4$ V of headroom, which limits low-voltage swing; leakage is multiplied by $\beta$. #bjt

> [!warning] Exam trap
> A Darlington pair drops **two** base-emitter junctions ($\approx1.4$ V), not one. Using $0.7$ V in the bias loop misplaces the Q point by roughly $0.7/R_E$ amperes.

---

## Part C — Frequency Response, Feedback, Power and Oscillators

### 11. Frequency Response and Bode Plots

![](https://www.youtube.com/watch?v=6CShc4qIDZc)

*Video: Frequency Response and Bode Plot — YSAG, 22:37*

**Low- and high-frequency response ★**

$$A_v(f)=\frac{A_{v,mid}}{\sqrt{1+(f_L/f)^2}\sqrt{1+(f/f_H)^2}}$$

**Symbols**

- $A_v(f)$ — voltage gain magnitude at frequency $f$, dimensionless
- $A_{v,mid}$ — mid-band (maximum) voltage gain, dimensionless
- $f$ — signal frequency, in Hz
- $f_L$ — lower cutoff (corner) frequency, in Hz
- $f_H$ — upper cutoff (corner) frequency, in Hz

**Corner frequencies from RC**

$$f_L=\frac{1}{2\pi R_CC_C}\ \text{(coupling/bypass)},\qquad f_H=\frac{1}{2\pi R_{Th}C_{in}}\ \text{(stray/internal)}$$

**Symbols**

- $R_C$ — resistance seen by the coupling or bypass capacitor, in $\Omega$
- $C_C$ — coupling (or bypass) capacitance, in F
- $R_{Th}$ — Thévenin resistance seen by the input capacitance, in $\Omega$
- $C_{in}$ — input (stray/internal) capacitance, in F

**Decibel definitions ★**

$$A(\text{dB})=20\log_{10}\lvert A_v\rvert\ \text{(voltage)},\qquad A(\text{dB})=10\log_{10}A_P\ \text{(power)}$$

**Symbols**

- $A(\text{dB})$ — voltage or power gain expressed in decibels, in dB
- $A_v$ — voltage gain, dimensionless
- $A_P$ — power gain, dimensionless

**Bode slopes**

| Element | Slope | Phase shift |
|---|---|---|
| One pole | $-20$ dB/decade | $-90^\circ$ |
| One zero | $+20$ dB/decade | $+90^\circ$ |
| $n$ poles | $-20n$ dB/decade | $-90n^\circ$ |
| Single pole at $f_c$ | $-3$ dB point | $-45^\circ$ |

**Bandwidth and cutoff**

$$BW=f_H-f_L\approx f_H\ \text{(when }f_H\gg f_L\text{)},\qquad \lvert A_v(f_c)\rvert=\frac{A_{v,mid}}{\sqrt2}=-3\ \text{dB}$$

**Symbols**

- $BW$ — bandwidth, in Hz
- $f_c$ — cutoff (corner) frequency, in Hz

**Conditions:** single-pole (dominant-pole) approximation; $-3$ dB = 70.7% of mid-band gain; decibel values add where stages cascade. #frequency

---

### 12. Miller's Theorem and High-Frequency Effects

![](https://www.youtube.com/watch?v=EVhuDJW2DVs)

*Video: Miller's Theorem and Feedback Capacitance — Lantertronics, 10:01*

**Miller's theorem ★**

$$Z_1=\frac{Z}{1-A_v},\qquad Z_2=\frac{Z}{1-1/A_v}=\frac{A_vZ}{A_v-1}$$

$Z$ = bridging impedance in $\Omega$; $A_v$ dimensionless; for large negative $A_v$, $Z_1$ becomes small.

**Miller capacitance ★**

$$C_{in}=C_f(1+\lvert A_v\rvert),\qquad C_{out}=C_f\left(1+\frac{1}{\lvert A_v\rvert}\right)$$

$C_f$ = feedback (base-collector) capacitance in F; $C_{in}$ is the dominant high-frequency limiter.

**Resulting high-frequency pole**

$$f_H=\frac{1}{2\pi R_s'C_{in}},\qquad R_s'=R_s\parallel R_1\parallel R_2\parallel r_\pi$$

**Gain-bandwidth degradation**

$$\lvert A_v\rvert f_H\approx\frac{1}{2\pi R_s'C_f}=\text{constant}$$

**Conditions:** $A_v$ is the mid-band gain with the bridging element removed; Miller's theorem requires a unilateral (non-feedback) $A_v$; the approximation overestimates $C_{in}$ when $A_v$ has phase shift. #frequency #bjt

> [!tip] High-yield ★
> Miller multiplies the feedback capacitance by $(1+\lvert A_v\rvert)$ — a stage with $A_v=-100$ turns a 2 pF $C_{bc}$ into a 202 pF input capacitance. That single number usually sets $f_H$.

---

### 13. Gain-Bandwidth Product and fT

**Unity-gain and corner relations ★**

$$GBW=\lvert A_{v,mid}\rvert\cdot BW=f_T\ \text{(for a single-pole op-amp)}$$

$$f_T=\lvert A_{v,mid}\rvert f_H\ \text{(Hz)},\qquad A_v(f)=\frac{f_T}{f}\ \text{(above the corner)}$$

**Symbols**

- $GBW$ — gain-bandwidth product, in Hz
- $A_{v,mid}$ — mid-band voltage gain, dimensionless
- $BW$ — bandwidth, in Hz
- $f_T$ — unity-gain (transition) frequency, in Hz
- $f_H$ — upper cutoff frequency, in Hz
- $A_v(f)$ — voltage gain at frequency $f$, dimensionless

**Closed-loop bandwidth ★**

$$f_{CL}=\frac{f_T}{1+R_f/R_i}=\frac{GBW}{A_{CL}}$$

**Symbols**

- $f_{CL}$ — closed-loop bandwidth, in Hz
- $R_f$ — feedback resistance, in $\Omega$
- $R_i$ — input (gain-setting) resistance, in $\Omega$

$f_T$ in Hz, $A_{CL}$ dimensionless.

**BJT transition frequency**

$$f_T=\frac{g_m}{2\pi(C_\pi+C_\mu)},\qquad f_\beta=\frac{f_T}{\beta}$$

$$f_{max}=\sqrt{\frac{f_T}{8\pi r_bC_\mu}}\ \text{(maximum oscillation frequency)}$$

**Symbols**

- $g_m$ — small-signal transconductance, in S
- $C_\pi$ — base-emitter (diffusion) capacitance, in F
- $C_\mu$ — base-collector (feedback) capacitance, in F
- $f_\beta$ — beta cutoff frequency (where the current gain falls by 3 dB), in Hz
- $r_b$ — base spreading resistance, in $\Omega$
- $f_{max}$ — maximum oscillation frequency, in Hz

**Slew-rate limit**

$$SR=2\pi f_{max,full}V_{op}\ \text{(V/}\mu\text{s)},\qquad f_{max,full}=\frac{SR}{2\pi V_{op}}$$

**Symbols**

- $SR$ — slew rate, in V/µs
- $f_{max,full}$ — full-power (maximum) output frequency, in Hz
- $V_{op}$ — output peak voltage, in V

**Conditions:** single-pole op-amp or transistor; above $f_c$ the gain falls at $-20$ dB/decade, so $A_vf=$ constant; slew rate is a large-signal limit independent of $GBW$. #frequency #opamp

---

### 14. Feedback Amplifier Topologies

![](https://www.youtube.com/watch?v=OoNluE5RLNg)

*Video: Feedback Topologies in Amplifiers Explained — ALL ABOUT ELECTRONICS, 15:01*

**General feedback relations ★**

$$A_f=\frac{A}{1+\beta A},\qquad A_f\approx\frac{1}{\beta}\ \text{for }\beta A\gg1$$

$A$ = open-loop gain, $\beta$ = feedback factor (dimensionless), $A_f$ = closed-loop gain.

**Desensitization and distortion**

$$S_A^{A_f}=\frac{1}{1+\beta A},\qquad \text{THD}_f=\frac{\text{THD}}{1+\beta A}$$

$$f_{Hf}=f_H(1+\beta A),\qquad f_{Lf}=\frac{f_L}{1+\beta A}$$

**Symbols**

- $S_A^{A_f}$ — sensitivity of the closed-loop gain to changes in the open-loop gain, dimensionless
- $\text{THD}$ — total harmonic distortion of the open-loop amplifier, dimensionless
- $\text{THD}_f$ — total harmonic distortion with feedback, dimensionless
- $f_H$ — open-loop upper cutoff frequency, in Hz
- $f_L$ — open-loop lower cutoff frequency, in Hz
- $f_{Hf}$ — upper cutoff frequency with feedback, in Hz
- $f_{Lf}$ — lower cutoff frequency with feedback, in Hz

**The four topologies ★**

| Topology | Sampled | Mixed | Stabilizes |
|---|---|---|---|
| Series-shunt (voltage amp) | voltage | voltage | $A_v$, lowers $R_{out}$ |
| Shunt-shunt (transresistance) | voltage | current | $R_m$, lowers $R_{in}$, $R_{out}$ |
| Series-series (transconductance) | current | voltage | $G_m$, raises $R_{out}$ |
| Shunt-series (current amp) | current | current | $A_i$, raises $R_{in}$, $R_{out}$ |

**Symbols**

- $R_m$ — transresistance (mutual resistance) gain, in $\Omega$
- $G_m$ — transconductance gain, in S

**Impedance effects**

$$R_{in,f}=R_{in}(1+\beta A)\ \text{(series mixing)},\qquad R_{in,f}=\frac{R_{in}}{1+\beta A}\ \text{(shunt mixing)}$$

$$R_{out,f}=\frac{R_{out}}{1+\beta A}\ \text{(voltage sampling)},\qquad R_{out,f}=R_{out}(1+\beta A)\ \text{(current sampling)}$$

**Symbols**

- $R_{in,f}$ — input resistance with feedback, in $\Omega$
- $R_{out,f}$ — output resistance with feedback, in $\Omega$
- $R_{in}$ — open-loop input resistance, in $\Omega$
- $R_{out}$ — open-loop output resistance, in $\Omega$

**Conditions:** negative feedback ($1+\beta A>0$); if $\beta A=-1$ the loop oscillates (Barkhausen); gain-bandwidth product is preserved. #feedback

---

### 15. Power Amplifiers: Classes A, B, AB, C

![](https://www.youtube.com/watch?v=0e_OUyGCaBs)

*Video: Transistor Amplifiers: Class A, AB, B and C — The Organic Chemistry Tutor, 17:47*

**Class A ★**

$$P_{out,max}=\frac{V_{CC}^2}{8R_L}\ \text{(series-fed)},\qquad \eta_{max}=25\%$$

$$P_{out,max}=\frac{V_{CC}^2}{2R_L}\ \text{(transformer-coupled)},\qquad \eta_{max}=50\%$$

**Symbols**

- $P_{out,max}$ — maximum output power delivered to the load, in W
- $V_{CC}$ — DC supply voltage, in V
- $R_L$ — load resistance, in $\Omega$
- $\eta_{max}$ — maximum conversion efficiency, dimensionless (in %)

**Class B push-pull ★**

$$P_{out,max}=\frac{V_{CC}^2}{2R_L},\qquad \eta_{max}=\frac{\pi}{4}=78.5\%$$

$$P_{supply}=\frac{2V_{CC}V_{op}}{\pi R_L},\qquad P_D=P_{supply}-P_{out}$$

**Symbols**

- $P_{supply}$ — DC power drawn from the supply, in W
- $V_{op}$ — output peak voltage, in V
- $P_D$ — transistor power dissipation, in W
- $P_{out}$ — output power delivered to the load, in W

**Class AB and C**

$$\eta_{AB}\approx60\text{–}70\%,\qquad \eta_C\ \text{can exceed }80\%\ \text{with high tank }Q$$

**Symbols**

- $\eta_{AB}$ — maximum conversion efficiency of class AB, dimensionless (in %)
- $\eta_C$ — maximum conversion efficiency of class C, dimensionless (in %)
- $Q$ — quality factor of the resonant tank load, dimensionless

**Crossover and efficiency comparison ★**

| Class | Conduction angle | $\eta_{max}$ | Distortion |
|---|---|---|---|
| A | 360° | 25% (50% xfmr) | lowest |
| B | 180° | 78.5% | crossover |
| AB | 180°–360° | 60–70% | low |
| C | $<180^\circ$ | 80%+ | high (tuned load) |

**Thermal dissipation**

$$P_{D,max}=\frac{2V_{CC}^2}{\pi^2R_L}=\frac{4}{\pi^2}P_{o,max}\ \text{(class B, at }V_{op}=2V_{CC}/\pi\text{)}$$

$$T_J=P_D\theta_{JA}+T_A\ \text{(}^\circ\text{C)}$$

**Symbols**

- $P_{D,max}$ — maximum transistor power dissipation, in W
- $T_J$ — junction temperature, in °C
- $T_A$ — ambient temperature, in °C
- $\theta_{JA}$ — junction-to-ambient thermal resistance, in °C/W

**Conditions:** $V_{op}$ = output peak voltage (V); class B ignores $V_{BE}$ drops and $V_{CE,sat}$; worst-case class B dissipation occurs at about 63.7% of maximum output, not at full output. #power

> [!warning] Exam trap
> Maximum class-B **dissipation** does not occur at maximum output — it peaks near $V_{op}=2V_{CC}/\pi$ (≈63.7% of full swing). Selecting a heatsink for full-output dissipation under-sizes it.

---

### 16. Oscillators: RC Phase Shift and Wien Bridge

**Barkhausen criterion ★**

$$\lvert\beta A\rvert=1,\qquad \angle\beta A=0^\circ\ \text{or }360^\circ\ \text{(at }f_0\text{)}$$

**Symbols**

- $\beta$ — feedback fraction of the feedback network, dimensionless
- $A$ — amplifier (forward) gain, dimensionless
- $f_0$ — frequency of oscillation, in Hz

**RC phase-shift oscillator ★**

$$f_0=\frac{1}{2\pi RC\sqrt6}\ \text{(three identical sections)},\qquad \beta=\frac{1}{29}\ \Rightarrow\ \lvert A\rvert\ge29$$

**Symbols**

- $R$ — resistance in each phase-shift section, in $\Omega$
- $C$ — capacitance in each phase-shift section, in F

**Wien bridge oscillator ★**

$$f_0=\frac{1}{2\pi RC}\ \text{(}R_1=R_2=R,\ C_1=C_2=C\text{)}$$

$$\frac{R_f}{R_i}=2\ \Rightarrow\ \lvert A\rvert=3,\qquad \beta=\frac{1}{3}$$

**Symbols**

- $R_1,R_2$ — resistances of the Wien network ($R_1=R_2=R$), in $\Omega$
- $C_1,C_2$ — capacitances of the Wien network ($C_1=C_2=C$), in F
- $R_f$ — feedback resistance of the non-inverting gain network, in $\Omega$
- $R_i$ — input (gain-setting) resistance of the non-inverting gain network, in $\Omega$

**General RC phase-shift form**

$$f_0=\frac{1}{2\pi RC\sqrt{2n}}\ \text{(n identical sections for }180^\circ\text{)}$$

**Symbols**

- $n$ — number of identical RC sections, dimensionless (integer)

**Amplitude stabilization**

$$A_{loop}=A\beta\ \text{slightly}>1\ \text{to start},\ =1\ \text{to sustain}$$

**Symbols**

- $A_{loop}=A\beta$ — loop gain (forward gain times feedback fraction), dimensionless

**Conditions:** loop gain of exactly $1$ at $f_0$ for sustained oscillation; $A\beta>1$ gives growing amplitude until clipping, so an AGC or thermistor is needed; $n=3$ sections give the $180^\circ$ needed with an inverting amplifier. #oscillator

---

### 17. Oscillators: Hartley, Colpitts, Crystal

![](https://www.youtube.com/watch?v=bb5MMgNZ-OU)

*Video: Colpitts and Hartley Oscillators — Vocademy, 15:39*

**Hartley and Colpitts frequency ★**

$$f_0=\frac{1}{2\pi\sqrt{(L_1+L_2)C}}\ \text{(Hartley)},\qquad f_0=\frac{1}{2\pi\sqrt{L\frac{C_1C_2}{C_1+C_2}}}\ \text{(Colpitts)}$$

**Feedback fraction**

$$\beta=\frac{L_1}{L_2}\ \text{(Hartley)},\qquad \beta=\frac{C_2}{C_1}\ \text{(Colpitts)}$$

$\beta$ dimensionless; $\lvert A\beta\rvert=1$ at $f_0$.

**Clapp and crystal**

$$f_0=\frac{1}{2\pi\sqrt{L\frac{C_1C_2}{C_1+C_2}}}\ \text{(Clapp adds }C_3\text{ in series)}$$

$$f_s=\frac{1}{2\pi\sqrt{L_1C_1}}\ \text{(series resonance)},\qquad f_p=f_s\sqrt{1+\frac{C_1}{C_0}}$$

**Crystal parameters and Q**

$$Q=\frac{\omega_sL_1}{R_1}\ \text{(typ. }10^4\text{–}10^6\text{)},\qquad \frac{f_p-f_s}{f_s}\approx\frac{C_1}{2C_0}\ll1$$

**Oscillator comparison ★**

| Oscillator | Frequency range | Tank | Stability |
|---|---|---|---|
| RC phase shift | audio | RC | moderate |
| Wien bridge | audio | RC | good, low THD |
| Hartley | RF | $L_1,L_2,C$ | good |
| Colpitts | RF | $L,C_1,C_2$ | very good |
| Crystal | fixed RF | quartz | best |

**Conditions:** $\beta A=1$ and $360^\circ$ total phase at $f_0$; crystal operates between $f_s$ and $f_p$ where it looks inductive; $C_1$ = motional, $C_0$ = static capacitance, both in F. #oscillator

## Part D — Current Sources

### 18. Current Mirrors

**Basic mirror ★**

$$I_{out}=\frac{I_{ref}}{1+2/\beta}\approx I_{ref},\qquad I_{ref}=\frac{V_{CC}-V_{BE}}{R}$$

**Symbols**

- $I_{out}$ — output (mirrored) current, in A
- $I_{ref}$ — reference current, in A
- $\beta$ — forward current gain of each matched transistor, dimensionless
- $V_{CC}$ — DC supply voltage, in V
- $V_{BE}$ — base-emitter voltage of the diode-connected transistor, in V
- $R$ — reference-setting resistor, in $\Omega$
- $I_S$ — transistor saturation (scale) current, matched for both devices, in A

The $2/\beta$ term is the base-current error of the two matched transistors.

**Widlar mirror ★**

$$I_{out}R_E=V_T\ln\frac{I_{ref}}{I_{out}}\ \text{(µA output)}$$

**Symbols**

- $R_E$ — emitter degeneration resistance of the output transistor, in $\Omega$
- $V_T$ — thermal voltage ($\approx26$ mV at 300 K), in V

$V_T\approx26$ mV at 300 K; $R_E$ in $\Omega$; the logarithmic relation gives a small output from a much larger reference.

**Wilson mirror**

The Wilson mirror cancels the base-current error and raises the output impedance.

**Conditions:** matched transistors in the active region with equal $V_{BE}$ ($\beta$ and $I_S$ matched); $V_T\approx26$ mV at 300 K; the Widlar form needs $I_{out}\ll I_{ref}$ and enough headroom for $I_{out}R_E$.

→ Back to [[00_Index]]
