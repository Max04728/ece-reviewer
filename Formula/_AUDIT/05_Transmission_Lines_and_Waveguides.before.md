---
title: Transmission Lines and Waveguides
part: EST
tags: [ece, est, formula-sheet]
topics: 10
---

# Transmission Lines and Waveguides

## Part A — Transmission Line Fundamentals

### 1. Primary Constants R, L, G, C

![](https://www.youtube.com/watch?v=yezmCNGTVYU)

*Video: Transmission Lines: An Introduction (R, L, G, C) — TheSiGuy, 10:15*

**Primary line constants ★**

$$R\ \text{(}\Omega\text{/m)},\qquad L\ \text{(H/m)},\qquad G\ \text{(S/m)},\qquad C\ \text{(F/m)}$$

$R$ in ohms per metre, $L$ in henries per metre, $G$ in siemens per metre, $C$ in farads per metre; $R$ and $G$ are loss terms, $L$ and $C$ are storage terms.

**Coaxial cable closed forms ★**

$$L=\frac{\mu}{2\pi}\ln\frac{b}{a}\ \text{(H/m)},\qquad C=\frac{2\pi\epsilon}{\ln(b/a)}\ \text{(F/m)},\qquad R_s=\sqrt{\frac{\pi f\mu}{\sigma}}\ \text{(}\Omega\text{/sq)}$$

$$R=\frac{R_s}{2\pi}\Bigl(\frac{1}{a}+\frac{1}{b}\Bigr)\ \text{(}\Omega\text{/m)},\qquad G=\frac{2\pi\sigma_d}{\ln(b/a)}\ \text{(S/m)}$$

$a$ in m (inner conductor radius), $b$ in m (outer conductor radius), $\mu$ in H/m, $\epsilon$ in F/m, $\sigma$ in S/m (conductor), $\sigma_d$ in S/m (dielectric), $f$ in Hz, $R_s$ in $\Omega$ per square.

**Two-wire and microstrip**

$$L_{2wire}=\frac{\mu}{\pi}\ln\frac{D}{a}\ \text{(H/m)},\qquad C_{2wire}=\frac{\pi\epsilon}{\ln(D/a)}\ \text{(F/m)},\qquad \epsilon_{eff}=\frac{\epsilon_r+1}{2}+\frac{\epsilon_r-1}{2}\frac{1}{\sqrt{1+12h/w}}$$

$D$ in m (wire separation), $a$ in m (wire radius), $\epsilon_r$ dimensionless (relative permittivity), $h$ in m (substrate height), $w$ in m (trace width), $\epsilon_{eff}$ dimensionless.

**High-frequency characteristic impedance ★**

| Line | $Z_0$ ($\Omega$) |
|---|---|
| Coaxial | $Z_0=\frac{138}{\sqrt{\epsilon_r}}\log_{10}\frac{D}{d}$ |
| Twin-lead / open-wire | $Z_0=\frac{276}{\sqrt{\epsilon_r}}\log_{10}\frac{2D}{d}$ |

$D$ in m (coax outer-conductor inner diameter, or twin-lead wire separation), $d$ in m (inner conductor or wire diameter), $\epsilon_r$ dimensionless.

**Conditions:** TEM propagation with a uniform cross-section and $R\ll\omega L$, $G\ll\omega C$ at the frequency of interest; $R_s\propto\sqrt{f}$ gives the $\sqrt{f}$ loss growth of copper lines; the 138/276 impedance forms assume a high-frequency line with the same length unit for $D$ and $d$. #transmission

---

### 2. Secondary Constants Z0 and Gamma

![](https://www.youtube.com/watch?v=EzyksI0ow3E)

*Video: Propagation Constant and Characteristic Impedance — RTU Wallah, 9:29*

**Characteristic impedance and propagation constant ★**

$$Z_0=\sqrt{\frac{R+j\omega L}{G+j\omega C}}\ \text{(}\Omega\text{)},\qquad \gamma=\alpha+j\beta=\sqrt{(R+j\omega L)(G+j\omega C)}\ \text{(m}^{-1}\text{)}$$

$Z_0$ in ohms, $\gamma$ in m$^{-1}$, $\alpha$ in Np/m, $\beta$ in rad/m, $\omega$ in rad/s, $R,L,G,C$ per metre.

**Lossless special case ★**

$$Z_0=\sqrt{\frac{L}{C}}\ \text{(}\Omega\text{)},\qquad \alpha=0,\qquad \beta=\omega\sqrt{LC}\ \text{(rad/m)},\qquad v_p=\frac{1}{\sqrt{LC}}=\frac{c}{\sqrt{\epsilon_r}}\ \text{(m/s)}$$

$L$ in H/m, $C$ in F/m, $c=3\times10^8$ m/s in vacuum, $\epsilon_r$ dimensionless, $v_p$ in m/s.

**Low-loss and voltage factor**

$$\alpha_c=\frac{R}{2Z_0}\ \text{(Np/m)},\qquad \alpha_d=\frac{GZ_0}{2}\ \text{(Np/m)},\qquad \alpha_{dB}=8.686\,\alpha_{Np}\ \text{(dB/m)},\qquad VF=\frac{v_p}{c}=\frac{1}{\sqrt{\epsilon_r}}$$

$\alpha_c,\alpha_d$ in Np/m, $\alpha_{dB}$ in dB/m (1 Np $=8.686$ dB), $VF$ dimensionless.

**Conditions:** $\gamma$ and $Z_0$ are complex for a general line; the lossless forms apply when $\omega L\gg R$ and $\omega C\gg G$, and $\alpha$ adds in Np/m while dB/m adds directly. #transmission

---

### 3. Lossless and Distortionless Lines

![](https://www.youtube.com/watch?v=lg4uzQnhfmc)

*Video: Distortionless Transmission Line — TutorialsPoint, 5:49*

**Lossless line conditions ★**

$$R=G=0\Rightarrow Z_0=\sqrt{\frac{L}{C}},\ \alpha=0,\ \beta=\omega\sqrt{LC},\ v_p=\frac{1}{\sqrt{LC}}$$

$Z_0$ in $\Omega$, $\beta$ in rad/m, $v_p$ in m/s; on a lossless line the impedance is real, frequency-independent and the wave travels without attenuation.

**Distortionless (Heaviside) condition ★**

$$\frac{R}{L}=\frac{G}{C}\iff RC=GL\Rightarrow Z_0=\sqrt{\frac{L}{C}},\qquad \alpha=R\sqrt{\frac{C}{L}}=G\sqrt{\frac{L}{C}}\ \text{(Np/m)},\qquad \beta=\omega\sqrt{LC}$$

$R/L$ and $G/C$ in s$^{-1}$, $\alpha$ in Np/m, $\beta$ in rad/m; when $R/L=G/C$ the attenuation is flat and $\beta$ is linear in $\omega$, so all frequencies travel at the same $v_p$.

| Line type | Condition | $\alpha$ | $v_p$ | Waveform |
|---|---|---|---|---|
| Ideal/lossless | $R=G=0$ | 0 | $1/\sqrt{LC}$ | undistorted |
| Distortionless | $R/L=G/C$ | $R\sqrt{C/L}$ | $1/\sqrt{LC}$ | undistorted |
| General lossy | any | $f(\omega)$ | $f(\omega)$ | distorted |

**Conditions:** the distortionless line needs no loading network when $RC=GL$ holds; real cables often satisfy it approximately by adding series inductance (Pupin loading) to raise $L$. #transmission

---

### 4. Reflection Coefficient and VSWR

![](https://www.youtube.com/watch?v=BijMGKbT0Wk)

*Video: Understanding VSWR and Return Loss — Rohde & Schwarz, 10:10*

**Reflection coefficient and impedance relation ★**

$$\Gamma_L=\frac{Z_L-Z_0}{Z_L+Z_0}=\lvert\Gamma\rvert\angle\theta_\Gamma,\qquad \Gamma(d)=\Gamma_Le^{-j2\beta d},\qquad \frac{Z(d)}{Z_0}=\frac{1+\Gamma(d)}{1-\Gamma(d)}$$

$\Gamma$ dimensionless (complex), $Z_L$ and $Z_0$ in $\Omega$, $d$ in m (distance from load toward generator), $\beta$ in rad/m.

**VSWR, return loss and mismatch loss ★**

$$VSWR=\frac{V_{max}}{V_{min}}=\frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert},\qquad \lvert\Gamma\rvert=\frac{VSWR-1}{VSWR+1},\qquad RL=-20\log_{10}\lvert\Gamma\rvert\ \text{(dB)}$$

$$Mismatch\ loss=-10\log_{10}\bigl(1-\lvert\Gamma\rvert^2\bigr)\ \text{(dB)},\qquad \frac{P_{ref}}{P_{inc}}=\lvert\Gamma\rvert^2,\qquad \frac{P_L}{P_{inc}}=1-\lvert\Gamma\rvert^2$$

$VSWR$ dimensionless, $RL$ in dB (reference: ratio of incident to reflected power), mismatch loss in dB, $P$ in W.

| Load | $\Gamma$ | VSWR | Return loss |
|---|---|---|---|
| Matched ($Z_L=Z_0$) | 0 | 1 | $\infty$ dB |
| Short / open | $\mp1$ | $\infty$ | 0 dB |
| $Z_L=2Z_0$ | 1/3 | 2.0 | 9.5 dB |
| $Z_L=1.5Z_0$ | 0.2 | 1.5 | 14 dB |

**Conditions:** real reference impedance $Z_0$ and a lossless line; VSWR is a magnitude-only measure, so it cannot distinguish an inductive from a capacitive mismatch. #vswr

> [!tip] High-yield ★
> $VSWR=\frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$ and $\lvert\Gamma\rvert=\frac{VSWR-1}{VSWR+1}$ are inverses — memorize one and derive the other; a VSWR of 2.0 means 11% of the power reflects.

---

### 5. Input Impedance and Quarter-Wave Transformer

![](https://www.youtube.com/watch?v=wVOE2j-I0rE)

*Video: The Quarter-Wave Transformer — EMViso, 4:08*

**Input impedance (lossless line) ★**

$$Z_{in}=Z_0\frac{Z_L+jZ_0\tan\beta d}{Z_0+jZ_L\tan\beta d}\ \text{(}\Omega\text{)},\qquad d=\text{distance from load to the input plane}$$

$Z_{in},Z_L,Z_0$ in $\Omega$, $\beta$ in rad/m, $d$ in m; the same formula with $-\tan$ gives the load end when moving the other way.

**Special lengths ★**

$$Z_{in}(d=\lambda/4)=\frac{Z_0^2}{Z_L},\qquad Z_{in}(d=\lambda/2)=Z_L,\qquad Z_{in}(d=\lambda/8)=Z_0\frac{Z_L+jZ_0}{Z_0+jZ_L}$$

$\lambda$ in m (guide wavelength on the line), $d$ in m; a quarter-wave line inverts the impedance, a half-wave line repeats it.

**Quarter-wave transformer and matching bandwidth**

$$Z_{0,\lambda/4}=\sqrt{Z_{in}Z_L}\ \text{(}\Omega\text{)},\qquad BW\propto\frac{1}{Q},\qquad \Gamma_{max}\ \text{rises as }f\ \text{leaves }f_0,\qquad \frac{\Delta f}{f_0}\approx\frac{2}{\pi}\arccos\Bigl(\frac{2\lvert\Gamma\rvert_{max}\sqrt{Z_L/Z_{in}}}{\lvert 1-Z_L/Z_{in}\rvert}\Bigr)$$

$Z_{0,\lambda/4}$ in $\Omega$ (geometric mean), $BW$ in Hz, $\Delta f$ in Hz, $\lvert\Gamma\rvert_{max}$ dimensionless.

**Conditions:** lossless line, single-frequency matching; the quarter-wave transformer is narrowband because its impedance is exact only at $f_0=\frac{v_p}{4\ell}$ where $\ell$ is its physical length. #transmission

---

### 6. Smith Chart

![](https://www.youtube.com/watch?v=rUDMo7hwihs)

*Video: Understanding the Smith Chart — Rohde & Schwarz, 10:19*

**Normalized impedance and chart coordinates ★**

$$z=\frac{Z}{Z_0}=r+jx,\qquad \Gamma=\frac{z-1}{z+1},\qquad \lvert\Gamma\rvert=\Bigl\lvert\frac{z-1}{z+1}\Bigr\rvert,\qquad \rho_{\Gamma}=\frac{VSWR-1}{VSWR+1}$$

$z$ dimensionless (normalized), $r$ dimensionless (normalized resistance), $x$ dimensionless (normalized reactance), $\Gamma$ dimensionless, VSWR dimensionless.

**Constant-resistance and constant-reactance circles**

$$\Bigl(u-\frac{r}{1+r}\Bigr)^2+v^2=\Bigl(\frac{1}{1+r}\Bigr)^2,\qquad (u-1)^2+\Bigl(v-\frac{1}{x}\Bigr)^2=\Bigl(\frac{1}{x}\Bigr)^2$$

$u,v$ dimensionless (real and imaginary parts of $\Gamma$); these are the two orthogonal circle families that make up the chart.

**Rotation, landmarks and scales**

$$d=\frac{\theta}{2\beta}=\frac{\theta\lambda}{4\pi}\ \text{(m, toward generator)},\qquad \lambda/4\Rightarrow180^\circ,\qquad \lambda/2\Rightarrow360^\circ$$

$$z=0\ (\text{short})\Rightarrow\Gamma=-1,\qquad z=\infty\ (\text{open})\Rightarrow\Gamma=+1,\qquad z=1\ (\text{matched})\Rightarrow\Gamma=0$$

$d$ in m, $\theta$ in rad, $\lambda$ in m, $\beta$ in rad/m; the wavelengths-toward-generator scale on the rim reads the rotation directly.

**Conditions:** the chart assumes a lossless line and a real $Z_0$; one full turn is $\lambda/2$, so a rotation to the left (clockwise) is toward the generator. #smithchart

> [!warning] Exam trap
> Moving toward the generator rotates **clockwise** on the Smith chart, and one complete revolution is $\lambda/2$, not $\lambda$. Reading the wrong direction turns an inductive load into a capacitive one.

---

### 7. Stub Matching

![](https://www.youtube.com/watch?v=FPa2pozZ-AU)

*Video: Single-Stub Tuning — EMViso, 5:48*

**Shunt stub matching (admittance form) ★**

$$y_L=\frac{1}{z_L}=g+jb,\qquad Y_{in}=Y_0+jB_{stub},\qquad d_{stub}:\ \mathrm{Re}\{y(d)\}=1,\qquad b(d)+b_{stub}=0$$

$y$ dimensionless (normalized admittance), $Y$ in S, $B_{stub}$ in S (stub susceptance), $d_{stub}$ in m (distance from load to stub), $g$ and $b$ dimensionless.

**Stub lengths ★**

$$\text{Short-circuited stub}:\ \ell_{stub}=\frac{\lambda}{2\pi}\arctan\Bigl(\frac{1}{b_{stub}}\Bigr)\ \text{(m)},\qquad \text{Open stub}:\ \ell_{stub}=\frac{\lambda}{2\pi}\arctan(b_{stub})\ \text{(m)}$$

$\ell_{stub}$ in m, $\lambda$ in m (line wavelength), $b_{stub}$ dimensionless; a shorted stub presents pure susceptance $B=-Y_0\cot\beta\ell$.

**Series stub and transformer alternatives**

$$\text{Series stub}:\ \mathrm{Re}\{z(d)\}=1,\ \mathrm{Im}\{z(d)\}+X_{stub}=0,\qquad Z_{0,\lambda/4}=\sqrt{Z_{in}Z_L},\qquad \text{lumped L-network}: Q=\sqrt{\frac{R_{high}}{R_{low}}-1}$$

$X_{stub}$ in $\Omega$, $Z_{0,\lambda/4}$ in $\Omega$, $Q$ dimensionless (network quality factor), $R$ in $\Omega$.

**Conditions:** lossless line and a single-frequency match; two solutions exist (the two intersection points of the $g=1$ circle), and series stubs suit balanced/coaxial lines while shunt stubs suit microstrip. #stub #smithchart

---

## Part B — Waveguides

### 8. Waveguide TE and TM Modes

![](https://www.youtube.com/watch?v=dYKGsJGPsDo)

*Video: Origin of TE and TM Modes — Jordan Edmunds, 11:58*

**Mode cutoff and dominant mode ★**

$$f_{c,mn}=\frac{c}{2}\sqrt{\Bigl(\frac{m}{a}\Bigr)^2+\Bigl(\frac{n}{b}\Bigr)^2}\ \text{(Hz)},\qquad f_{c,10}=\frac{c}{2a},\qquad \lambda_{c,mn}=\frac{2}{\sqrt{(m/a)^2+(n/b)^2}}\ \text{(m)}$$

$a$ in m (broad dimension), $b$ in m (narrow dimension), $m,n$ nonnegative integers (mode indices), $c$ in m/s, $f_c$ in Hz, $\lambda_c$ in m.

**TE and TM field character**

$$TE_{mn}:\ E_z=0,\ H_z\ne0;\qquad TM_{mn}:\ H_z=0,\ E_z\ne0;\qquad \text{lowest TM: } TM_{11}\ (a>b);\qquad \text{no }TM_{m0},TE_{m0}$$

$E_z$ in V/m, $H_z$ in A/m; a rectangular guide supports no TEM mode because a single-conductor hollow pipe cannot carry a TEM field.

**Wave impedance and guide properties ★**

$$Z_{TE}=\frac{\eta}{\sqrt{1-(f_c/f)^2}}\ \text{(}\Omega\text{)},\qquad Z_{TM}=\eta\sqrt{1-(f_c/f)^2}\ \text{(}\Omega\text{)},\qquad \eta=\sqrt{\frac{\mu}{\epsilon}}=377\ \Omega\ \text{(air)}$$

$\eta$ in $\Omega$ (intrinsic impedance), $f$ in Hz, $Z$ in $\Omega$; TE and TM impedances diverge in opposite directions as $f\to f_c$.

**Conditions:** perfectly conducting walls with a lossless dielectric filling; propagation requires $f>f_{c}$ for the mode, and $TE_{10}$ is dominant when $a>b$ so only $a$ sets the single-mode band. #waveguide

---

### 9. Cutoff Frequency and Guide Wavelength

![](https://www.youtube.com/watch?v=eE5YiM0t-C0)

*Video: Guide Wavelength in a Waveguide — Education 4u, 11:43*

**Guide wavelength and propagation ★**

$$\lambda_g=\frac{\lambda_0}{\sqrt{1-(f_c/f)^2}}=\frac{\lambda_0}{\sqrt{1-(\lambda_0/\lambda_c)^2}}\ \text{(m)},\qquad \beta_g=\frac{2\pi}{\lambda_g}\ \text{(rad/m)},\qquad \lambda_g>\lambda_0\ \text{always}$$

$\lambda_0$ in m (free-space wavelength), $\lambda_g$ in m (guide wavelength), $f_c$ in Hz, $\beta_g$ in rad/m; in a guide the wavelength is stretched, never shortened.

**Cutoff relations and single-mode operation ★**

$$f_c=\frac{v_p}{\lambda_c},\qquad \lambda_c=\frac{v_p}{f_c},\qquad f_{c,10}=\frac{1}{2a\sqrt{\mu\epsilon}}\ \text{(Hz)},\qquad TE_{10}\ \text{band}:\ \frac{c}{2a}<f<\frac{c}{a}$$

$v_p$ in m/s (phase velocity in the filling medium), $\mu$ in H/m, $\epsilon$ in F/m; the upper limit $c/a$ is where $TE_{20}$ starts, so single-mode bandwidth is one octave.

**Standard rectangular guides**

| Band | Guide | $a$ (mm) | $b$ (mm) | $f_{c,10}$ (GHz) | Useful range (GHz) |
|---|---|---|---|---|---|
| L | WR-650 | 165.1 | 82.55 | 0.908 | 1.12–1.70 |
| S | WR-284 | 72.14 | 34.04 | 2.078 | 2.60–3.95 |
| C | WR-159 | 40.39 | 20.19 | 3.712 | 4.90–7.05 |
| X | WR-90 | 22.86 | 10.16 | 6.557 | 8.20–12.4 |
| Ku | WR-62 | 15.80 | 7.90 | 9.488 | 12.4–18.0 |
| K | WR-42 | 10.67 | 4.32 | 14.05 | 18.0–26.5 |
| Ka | WR-28 | 7.11 | 3.56 | 21.08 | 26.5–40.0 |

**Conditions:** air-filled guide ($\mu=\mu_0$, $\epsilon=\epsilon_0$) with $a=2b$ in standard sizes; below $f_{c,10}$ the mode is evanescent and the guide attenuates instead of propagating. #waveguide #cutoff

---

### 10. Phase and Group Velocity

![](https://www.youtube.com/watch?v=EIqKG5TiSYs)

*Video: Phase Velocity versus Group Velocity — Eugene Khutoryansky, 3:18*

**Phase and group velocity ★**

$$v_p=\frac{\omega}{\beta_g}=\frac{c}{\sqrt{\epsilon_r}\sqrt{1-(f_c/f)^2}}\ \text{(m/s)},\qquad v_g=\frac{d\omega}{d\beta_g}=c\sqrt{\epsilon_r}\sqrt{1-(f_c/f)^2}\ \text{(m/s)}$$

$$v_p\cdot v_g=v^2=\frac{c^2}{\epsilon_r},\qquad v_p>v,\qquad v_g<v,\qquad \lambda_g=\frac{v_p}{f}=\frac{v_g}{f}\cdot\frac{v_p^2}{v^2}$$

$v_p,v_g$ in m/s, $\omega$ in rad/s, $\beta_g$ in rad/m, $f_c$ in Hz, $\epsilon_r$ dimensionless, $v$ in m/s (velocity in the unbounded medium).

**Phase and group delay**

$$\tau_p=\frac{\ell}{v_p}\ \text{(s)},\qquad \tau_g=\frac{\ell}{v_g}\ \text{(s)},\qquad \tau_g>\tau_p,\qquad \text{dispersive}:\ v_g=f(\omega)$$

$\ell$ in m (guide length), $\tau_p,\tau_g$ in s; group delay is the one that governs information arrival.

**Maximum theoretical data rate (waveguide dispersion)**

$$B_{max}\approx\frac{1}{4\tau_g}\ \text{(bit/s, rough)}, \qquad v_g\to0\ \text{as}\ f\to f_c,\qquad v_g\to v\ \text{as}\ f\gg f_c$$

$B_{max}$ in bit/s, $\tau_g$ in s; well above cutoff the guide behaves almost like free space and dispersion vanishes.

**Conditions:** single propagating mode in a lossless guide; $v_p$ is a phase (not energy) velocity so it may exceed $c$, while $v_g$ always stays below $c$ and carries the energy. #waveguide

> [!warning] Exam trap
> $v_p>c$ in a waveguide is not a relativity violation — it is the phase velocity, not the energy velocity. Group velocity $v_g<c$ carries the signal, and $v_pv_g=c^2/\epsilon_r$ always holds.

> [!tip] High-yield ★
> The guide chain to memorize: $f_c=\frac{c}{2a}$ for $TE_{10}$, then $\lambda_g=\lambda_0/\sqrt{1-(f_c/f)^2}$, then $v_p=c/\sqrt{1-(f_c/f)^2}$ and $v_g=c\sqrt{1-(f_c/f)^2}$.

---

→ Back to [[00_Index]]
