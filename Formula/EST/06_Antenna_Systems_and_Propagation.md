---
title: Antenna Systems and Propagation
part: EST
tags: [ece, est, formula-sheet]
topics: 17
---

# Antenna Systems and Propagation

## Part A — Antenna Fundamentals

### 1. Antenna Parameters: Directivity, Gain, EIRP

![](https://www.youtube.com/watch?v=mHo2-f5V8V4)

*Video: Antenna Gain, EIRP and the Friis Equation — Iain Explains, 13:51*

**Beam solid angle and directivity ★**

$$D=\frac{4\pi}{\Omega_A}=\frac{4\pi}{\iint_{4\pi}\lvert F(\theta,\phi)\rvert^2\,d\Omega}\ \text{(dimensionless)},\qquad D_{dB}=10\log_{10}D\ \text{(dBi)}$$

$$D\approx\frac{41253}{\theta_E\theta_H}\ \text{(degrees)}=\frac{4\pi}{\theta_E\theta_H}\ \text{(rad}^2\text{)},\qquad D_{max}=1.64\ (2.15\ \text{dBi, half-wave dipole})$$

$\Omega_A$ in sr (beam solid angle), $F$ dimensionless (normalized field pattern), $\theta_E,\theta_H$ in degrees (E- and H-plane half-power beamwidths), $D$ dimensionless, $D_{dB}$ in dBi.

**Gain, efficiency and aperture ★**

$$G=e_{cd}D\ \text{(dimensionless)},\qquad G_{dB}=10\log_{10}G\ \text{(dBi)},\qquad A_e=\frac{\lambda^2G}{4\pi}\ \text{(m}^2\text{)},\qquad G=\frac{4\pi A_e}{\lambda^2}$$

$e_{cd}$ dimensionless (radiation efficiency), $G$ dimensionless gain, $A_e$ in m² (effective aperture), $\lambda$ in m; dBi is referenced to an isotropic radiator, dBd to a half-wave dipole ($0\ \text{dBd}=2.15\ \text{dBi}$).

**EIRP and field strength ★**

$$EIRP=P_tG_t\ \text{(W)},\qquad EIRP_{dBm}=P_{t,dBm}+G_{t,dBi},\qquad E=\frac{\sqrt{30P_tG_t}}{d}\ \text{(V/m)},\qquad S=\frac{P_tG_t}{4\pi d^2}\ \text{(W/m}^2\text{)}$$

$P_t$ in W or dBm (referenced to 1 mW), $G_t$ dimensionless or dBi, $d$ in m, $E$ in V/m, $S$ in W/m²; ERP (dBd reference) is $2.15$ dB below EIRP for the same antenna.

| Quantity | Reference | Unit |
|---|---|---|
| $P_{dBm}$ | 1 mW | dBm |
| $P_{dBW}$ | 1 W | dBW |
| $G_{dBi}$ | isotropic radiator | dBi |
| $G_{dBd}$ | half-wave dipole | dBd |
| $EIRP$ | isotropic (product $P_tG_t$) | dBW or dBm |

**Conditions:** far-field ($d>2D_a^2/\lambda$, with $D_a$ the antenna's largest dimension in m) and matched polarization; gain includes losses through $e_{cd}$, directivity does not. #antenna

---

### 2. Radiation Resistance, Efficiency and Capture Area

![](https://www.youtube.com/watch?v=WBe0yhpdpcw)

*Video: Antenna Radiation Efficiency — Engineering Funda, 9:21*

**Radiation resistance and efficiency ★**

$$R_r=\frac{2P_{rad}}{\lvert I\rvert^2}\ \text{(}\Omega\text{)},\qquad e_{cd}=\frac{R_r}{R_r+R_L}=\frac{P_{rad}}{P_{in}},\qquad P_{rad}=\frac{1}{2}\lvert I\rvert^2R_r\ \text{(W)}$$

$R_r$ in $\Omega$ (radiation resistance), $R_L$ in $\Omega$ (loss resistance), $I$ in A (RMS or peak, consistently), $P$ in W, $e_{cd}$ dimensionless.

**Efficiency in dB and input impedance**

$$e_{cd,dB}=10\log_{10}e_{cd}\ \text{(dB)},\qquad Z_{in}=R_{in}+jX_{in}\ \text{(}\Omega\text{)},\qquad \text{resonance}\Rightarrow X_{in}=0,\ R_{in}=R_r+R_L$$

$Z_{in}$ in $\Omega$, $X_{in}$ in $\Omega$ (reactance, 0 at resonance); conjugate match gives $Z_{in}=Z_0^*$ for maximum power transfer.

**Capture area and aperture efficiency ★**

$$A_e=\frac{\lambda^2D}{4\pi}\ \text{(m}^2\text{)},\qquad A_{phys}=\pi\Bigl(\frac{D_a}{2}\Bigr)^2\ \text{(m}^2\text{)},\qquad \eta_{ap}=\frac{A_e}{A_{phys}},\qquad A_e=\eta_{ap}A_{phys}$$

$A_e$ in m² (effective aperture), $A_{phys}$ in m² (physical aperture), $D_a$ in m (dish diameter), $\eta_{ap}$ dimensionless (aperture efficiency, typically 0.55–0.70 for a dish).

**Conditions:** $R_r$ refers to the current maximum; short antennas have small $R_r$ so $e_{cd}$ collapses, while an aperture antenna's efficiency is dominated by illumination taper and spillover. #antenna

---

### 3. Hertzian and Half-Wave Dipoles

![](https://www.youtube.com/watch?v=Uiu4m-nupPE)

*Video: Current Structure on a Half-Wave Dipole — EMViso, 4:59*

**Hertzian (short) dipole ★**

$$R_r=80\pi^2\Bigl(\frac{\ell}{\lambda}\Bigr)^2\ \text{(}\Omega\text{)},\qquad D=1.5\ (1.76\ \text{dBi}),\qquad A_e=\frac{3\lambda^2}{8\pi}\ \text{(m}^2\text{)},\qquad \ell\ll\lambda$$

$\ell$ in m (dipole length), $\lambda$ in m (wavelength), $R_r$ in $\Omega$, $D$ dimensionless, $A_e$ in m².

**Half-wave dipole ★**

$$R_r=73\ \Omega,\qquad D=1.64\ (2.15\ \text{dBi}),\qquad A_e=0.13\lambda^2\ \text{(m}^2\text{)},\qquad Z_{in}\approx73+j42.5\ \Omega\ \text{(resonant: }73\ \Omega\text{)}$$

$$I(z)=I_0\cos\beta z,\qquad E_\theta=\frac{60I_0}{r}\cdot\frac{\cos\bigl(\frac{\pi}{2}\cos\theta\bigr)}{\sin\theta}\ \text{(V/m)}$$

$\beta$ in rad/m, $z$ in m (position along the dipole), $r$ in m (distance), $I_0$ in A (current maximum), $E_\theta$ in V/m; the $\cos(\frac{\pi}{2}\cos\theta)/\sin\theta$ factor is the half-wave element pattern.

**Length and bandwidth rules**

$$\ell=\frac{\lambda}{2}\ \text{(resonant dipole)},\qquad \ell_{practical}\approx0.47\text{–}0.48\lambda\ \text{(end effect)},\qquad BW_{dipole}\approx10\%\ \text{of }f_0,\qquad Q\approx\frac{f_0}{BW}$$

$\ell$ in m, $\lambda$ in m, $BW$ in Hz, $f_0$ in Hz, $Q$ dimensionless.

**Conditions:** thin cylindrical dipole in free space, sinusoidal current distribution, far field; the practical 0.47–0.48$\lambda$ length corrects for the finite-diameter end effect. #antenna #dipole

---

### 4. Marconi, Folded Dipole, Yagi-Uda

![](https://www.youtube.com/watch?v=NiDCgM2f5ww)

*Video: The Yagi-Uda Antenna — EMViso, 3:22*

**Marconi (monopole over ground) ★**

$$\ell=\frac{\lambda}{4},\qquad R_r=\frac{73}{2}=36.5\ \Omega,\qquad D=3.28\ (5.15\ \text{dBi}),\qquad \text{image theory: monopole}=2\times\text{dipole in half-space}$$

$\ell$ in m (monopole height), $\lambda$ in m, $R_r$ in $\Omega$, $D$ dimensionless; a quarter-wave monopole over a perfect ground has twice the directivity of a half-wave dipole and half its radiation resistance.

**Folded dipole and Yagi-Uda ★**

$$R_{r,folded}=n^2R_{r,dipole}=4\times73=292\ \Omega\ (2\ \text{conductors}),\qquad BW_{folded}>BW_{dipole}$$

$$Yagi:\ D\approx\frac{4\pi}{\Omega_A},\qquad \text{element spacing}\approx0.15\text{–}0.25\lambda,\qquad \text{boom length }\uparrow\Rightarrow D\uparrow$$

$n$ dimensionless (number of conductors), $R_r$ in $\Omega$, $\lambda$ in m, $D$ dimensionless; the reflector sits behind the driven element ($\approx0.15\lambda$) and directors in front ($\approx0.2\lambda$ spacing).

| Antenna | Typical $D$ | $Z_{in}$ ($\Omega$) | Use |
|---|---|---|---|
| Hertzian dipole | 1.5 | very low ($\sim$1–10) | theory, probes |
| Half-wave dipole | 1.64 | 73 | reference, FM/TV receive |
| Quarter-wave monopole | 3.28 | 36.5 | mobile, broadcast |
| Folded dipole | 1.64 | 292 | FM/TV receive (300 $\Omega$ balanced) |
| Yagi-Uda (5 el.) | $\approx$10 (10 dBi) | $\approx$20–50 | TV, point-to-point |

**Axial-mode helix ★**

$$C\approx\lambda,\qquad S\approx0.25\lambda,\qquad d_{helix}=\frac{C}{\pi}\ \text{(m)},\qquad \text{axial mode}\Rightarrow\text{circular polarisation}$$

$C$ in m (circumference), $S$ in m (turn spacing), $d_{helix}$ in m (diameter), $\lambda$ in m; $C\approx\lambda$ and $S\approx0.25\lambda$ give circular polarisation.

**Conditions:** image theory needs a perfectly conducting infinite ground plane; a real ground degrades monopole gain and raises the elevation angle of maximum radiation; an axial-mode helix needs $C\approx\lambda$ and $S\approx0.25\lambda$ to launch a circularly polarised end-fire beam. #antenna #yagi

---

### 5. Parabolic Reflector Antennas

![](https://www.youtube.com/watch?v=EbaTnH2GbdA)

*Video: How Parabolic Antennas Work — Data Alliance, 2:46*

**Dish geometry and gain ★**

$$G=\eta_{ap}\Bigl(\frac{\pi D_a}{\lambda}\Bigr)^2\ \text{(dimensionless)},\qquad G_{dBi}=10\log_{10}\Bigl[\eta_{ap}\Bigl(\frac{\pi D_a}{\lambda}\Bigr)^2\Bigr],\qquad A_e=\eta_{ap}\frac{\pi D_a^2}{4}\ \text{(m}^2\text{)}$$

$D_a$ in m (dish diameter), $\lambda$ in m, $\eta_{ap}$ dimensionless (0.55–0.70), $G$ dimensionless, $A_e$ in m²; gain grows as the square of the electrical diameter $D_a/\lambda$.

**Beamwidth, focal length and feed**

$$\theta_{3dB}\approx\frac{70\lambda}{D_a}\ \text{(degrees)},\qquad \theta_{3dB}\approx\frac{58\lambda}{D_a}\ \text{(degrees, some texts)},\qquad f=\frac{D_a^2}{16c_{depth}}\ \text{(m)},\qquad F/D\approx0.25\text{–}0.5$$

$\theta_{3dB}$ in degrees, $\lambda$ in m, $D_a$ in m, $f$ in m (focal length), $c_{depth}$ in m (depth of dish), $F/D$ dimensionless.

**Spillover, taper and efficiency budget**

$$\eta_{ap}=\eta_{spill}\cdot\eta_{taper}\cdot\eta_{block}\cdot\eta_{phase},\qquad \text{edge taper}\approx-10\ \text{dB optimum},\qquad P_r=\frac{P_tG_tG_r\lambda^2}{(4\pi d)^2}\ \text{(W)}$$

$\eta$ terms dimensionless (sub-efficiencies), edge taper in dB, $P$ in W, $d$ in m; typical total aperture efficiency is 55–70%.

**Pyramidal horn E-plane beamwidth ★**

$$\theta_E\approx\frac{56\lambda}{d_E}\ \text{(degrees)}$$

$\theta_E$ in degrees (E-plane half-power beamwidth), $\lambda$ in m, $d_E$ in m (E-plane aperture dimension); a larger $d_E/\lambda$ narrows the beam, as for the dish.

**Conditions:** far field ($d\gg2D_a^2/\lambda$) and a feed at the focus; Cassegrain and Gregorian dual-reflector feeds reduce spillover and move the feed out of the aperture; the $56\lambda/d_E$ horn rule is the aperture companion of the dish's $70\lambda/D_a$ approximation. #antenna

---

### 6. FSPL and Friis Transmission Equation

![](https://www.youtube.com/watch?v=Op7bBz6qbwY)

*Video: The Friis Transmission Formula — Engineering Funda, 8:53*

**Friis transmission equation ★**

$$P_r=P_tG_tG_r\Bigl(\frac{\lambda}{4\pi d}\Bigr)^2\ \text{(W)},\qquad P_{r,dBm}=P_{t,dBm}+G_{t,dBi}+G_{r,dBi}-FSPL_{dB}$$

$P_r,P_t$ in W or dBm (1 mW reference), $G_t,G_r$ dimensionless or dBi, $\lambda$ in m, $d$ in m (far-field separation), $FSPL$ in dB.

**Free-space path loss ★**

$$\Bigl(\frac{P_t}{P_r}\Bigr)_{dB}=FSPL_{dB}=20\log_{10}\Bigl(\frac{4\pi d}{\lambda}\Bigr)=32.44+20\log_{10}f_{MHz}+20\log_{10}d_{km}\ \text{(dB)}$$

$$=92.45+20\log_{10}f_{GHz}+20\log_{10}d_{km}\ \text{(dB)},\qquad FSPL_{dB}=20\log_{10}d+20\log_{10}f-147.55\ \text{(m, Hz)}$$

$f$ in MHz, GHz or Hz as indicated by the constant, $d$ in km or m, $FSPL$ in dB (a power ratio, not dBm); FSPL rises 6 dB per doubling of distance or frequency.

**Link budget additions**

$$P_{r,dBm}=EIRP_{dBm}+G_{r,dBi}-FSPL_{dB}-L_{misc},\qquad Fade\ margin=10\log_{10}\Bigl(\frac{P_{r,avail}}{P_{r,required}}\Bigr)\ \text{(dB)}$$

$L_{misc}$ in dB (cable, atmospheric, pointing), fade margin in dB; the Friis equation assumes matched antennas, polarization alignment and far-field operation.

**Conditions:** free space with no ground reflections, absorbers or multipath; at $d=1$ m at 1 GHz the FSPL is about 32.4 dB, which is why dB constants are worth memorizing. #fspl

> [!tip] High-yield ★
> Friis in dB is pure addition: $P_{r,dBm}=P_{t,dBm}+G_t+G_r-32.44-20\log f_{MHz}-20\log d_{km}$. Every term is dB, and the only subtraction is the path loss.

> [!warning] Exam trap
> FSPL is a power ratio in dB, never a power in dBm. Mixing dBm and dB in the link equation — adding FSPL to a dBm level and reporting the result as dBm — is the classic error.

---

## Part B — Radio Wave Propagation

### 7. Ground Wave Propagation

![](https://www.youtube.com/watch?v=mZIFBoK-dlw)

*Video: Ground Wave Propagation — Engineering Funda, 9:39*

**Ground wave field and attenuation ★**

$$E=\frac{\sqrt{30P_tG_t}}{d}\cdot A\ \text{(V/m)},\qquad A\approx\text{attenuation factor},\qquad \sigma\ \text{(S/m)},\ \epsilon_r\ \text{(dimensionless)}$$

$P_t$ in W, $G_t$ dimensionless, $d$ in m or km (consistently with $E$), $E$ in V/m, $A$ dimensionless (ground-loss factor), $\sigma$ in S/m, $\epsilon_r$ dimensionless.

**Attenuation factor regimes**

$$A\approx1\ \text{(perfect ground)},\qquad A\propto\frac{1}{d}\ \text{(plane earth, large }d\text{)},\qquad p=\frac{\pi d}{\lambda}\cdot\frac{\sqrt{(\epsilon_r-1)^2+(\sigma/\omega\epsilon_0)^2}}{\epsilon_r}\ \text{(numerical distance)}$$

$p$ dimensionless (Sommerfeld numerical distance), $\omega$ in rad/s, $\lambda$ in m; larger $p$ (poor ground, high frequency, long distance) means faster attenuation.

**Surface impedance and skin depth**

$$Z_s=\sqrt{\frac{j\omega\mu}{\sigma+j\omega\epsilon}}\ \text{(}\Omega\text{)},\qquad \delta=\frac{1}{\sqrt{\pi f\mu\sigma}}\ \text{(m)},\qquad \text{vertical polarization preferred over ground}$$

$Z_s$ in $\Omega$, $\delta$ in m (skin depth), $f$ in Hz, $\mu$ in H/m, $\sigma$ in S/m; loss increases as frequency rises and as ground conductivity falls.

| Ground type | $\sigma$ (S/m) | $\epsilon_r$ | Behaviour |
|---|---|---|---|
| Sea water | 4–5 | 80 | lowest loss |
| Fresh water | 0.001–0.01 | 80 | moderate |
| Wet soil | 0.01–0.03 | 10–30 | moderate |
| Dry soil / sand | 0.001–0.005 | 3–6 | high loss |
| City / rocky | 0.0001–0.001 | 3–5 | highest loss |

**Conditions:** ground wave (surface wave) dominates below about 2 MHz and needs vertical polarization; it follows the earth's curvature and is used for AM broadcast and maritime communications. #propagation

---

### 8. Space Wave and Radio Horizon

![](https://www.youtube.com/watch?v=eNF7aIt4B6g)

*Video: Space Wave Propagation and the Radio Horizon — Engineering Funda, 12:30*

**Line-of-sight and radio horizon ★**

$$d_{LOS}=3.57\bigl(\sqrt{h_t}+\sqrt{h_r}\bigr)\ \text{(km, }h\text{ in m)},\qquad d_{LOS}\approx4.12\bigl(\sqrt{h_t}+\sqrt{h_r}\bigr)\ \text{(km, }4/3\text{ earth)}$$

$h_t,h_r$ in m (transmit and receive heights), $d$ in km; the $4/3$ earth-radius model accounts for atmospheric refraction.

**Fresnel zones and clearance ★**

$$r_n=\sqrt{\frac{n\lambda d_1d_2}{d_1+d_2}}\ \text{(m)},\qquad \text{obstruction loss}\approx6\ \text{dB at }0.6r_1,\qquad 20\ \text{dB at }r_1\ \text{edge}$$

$r_n$ in m ($n$-th Fresnel radius), $\lambda$ in m, $d_1,d_2$ in m (distances to the obstruction), $n$ dimensionless; clearance of 60% of the first Fresnel zone keeps loss near free space.

**Two-ray and path-loss exponent**

$$P_r=P_tG_tG_r\Bigl(\frac{h_th_r}{d^2}\Bigr)^2\ \text{(W, plane earth, large }d\text{)},\qquad P_r\propto d^{-n},\ n=2\ \text{(free space)},\ 4\ \text{(plane earth)}$$

$P_r$ in W, $h_t,h_r$ in m, $d$ in m, $n$ dimensionless (path-loss exponent, 2–5 in practice); plane-earth loss grows as $d^4$, i.e. 12 dB per doubling.

**Conditions:** space wave covers line-of-sight and ground-reflected rays, dominant above about 30 MHz; ducting and anomalous propagation can extend the range well beyond the geometric horizon. #propagation

---

### 9. Sky Wave and Ionospheric Layers

![](https://www.youtube.com/watch?v=AhgFZBQLLxA)

*Video: Sky Wave Propagation and the Ionospheric Layers — Engineering Funda, 12:51*

**Ionospheric layers and electron density ★**

$$f_p=\sqrt{\frac{Ne^2}{\pi m_e\epsilon_0}}\approx9\sqrt{N}\ \text{(Hz, }N\text{ in m}^{-3}\text{)},\qquad \text{reflection when } f_p>f\cos\theta_i$$

$N$ in electrons per cubic metre, $e$ in C, $m_e$ in kg, $\epsilon_0$ in F/m, $f_p$ in Hz (plasma frequency), $\theta_i$ in rad (angle of incidence); the $\approx9\sqrt{N}$ form is the working version.

| Layer | Height (km) | Peak electron density (m$^{-3}$) | Character |
|---|---|---|---|
| D | 60–90 | $10^8$–$10^9$ | absorbs HF by day, disappears at night |
| E | 90–120 | $10^{10}$–$10^{11}$ | sporadic-E, daytime |
| $F_1$ | 150–250 | $10^{11}$ | daytime only |
| $F_2$ | 250–400 | $10^{11}$–$10^{12}$ | main HF reflection, day and night |

**Virtual height and MUF ★**

$$h'=\frac{ct}{2}\ \text{(m)},\qquad \sec\theta_0=\frac{f_{MUF}}{f_c},\qquad f_c=9\sqrt{N_{max}}\ \text{(Hz)}$$

$h'$ in m (virtual height), $c$ in m/s, $t$ in s (round-trip), $f_{MUF}$ and $f_c$ in Hz, $\theta_0$ in rad (angle of incidence at the layer); the secant law is the bridge from vertical to oblique sounding.

**Ionospheric loss and absorption**

$$L_{abs}\propto\frac{1}{f^2}\ \text{(nondeviative absorption, D layer)},\qquad \text{day high absorption, night low},\qquad LUF<f_{MUF}\Rightarrow\text{best frequency}\approx0.85f_{MUF}$$

$L_{abs}$ in dB or Np, $f$ in Hz; absorption falls as frequency squared, so higher frequencies penetrate the D layer with less loss.

**Conditions:** sky wave applies to 3–30 MHz (HF); the ionosphere is dispersive and time-varying, so frequency planning uses the MUF/LUF window hour by hour. #propagation

---

### 10. Critical Frequency, MUF and Skip Distance

![](https://www.youtube.com/watch?v=VqgcHBtYorM)

*Video: Critical Frequency, MUF and Skip Distance — Dopamine, 11:05*

**Critical frequency and MUF ★**

$$f_c=9\sqrt{N_{max}}\ \text{(Hz)},\qquad f_{MUF}=f_c\sec\theta_0,\qquad f_{MUF(daily)}\approx f_c\sqrt{1+\Bigl(\frac{d}{2h'}\Bigr)^2}$$

$f_c$ in Hz (vertical-incidence critical frequency), $N_{max}$ in m$^{-3}$, $\theta_0$ in rad, $d$ in km or m (skip distance, consistent with $h'$), $h'$ in m or km.

**Skip distance and take-off angle ★**

$$d_{skip}=2h'\tan\theta_0\ \text{(m or km)},\qquad \sin\theta_0=\sqrt{1-\Bigl(\frac{f_c}{f}\Bigr)^2},\qquad d_{max}=2h'\sqrt{\Bigl(\frac{f}{f_c}\Bigr)^2-1}$$

$d_{skip}$ in m or km, $h'$ in the same length unit, $\theta_0$ in rad, $f$ and $f_c$ in Hz; the skip zone (dead zone) lies between the ground-wave limit and $d_{skip}$.

**Usable frequency window**

$$LUF<f_{opt}<f_{MUF},\qquad f_{opt}\approx0.85f_{MUF},\qquad f_{OTF}=f_{MUF}-0.1f_{MUF}\ \text{(operating frequency)},\qquad \text{absorption}\propto f^{-2}$$

$f_{LUF}$ in Hz (lowest usable frequency), $f_{MUF}$ in Hz, $f_{opt}$ in Hz (optimum working frequency); LUF rises when absorption or noise increases.

| Quantity | Depends on | Typical day | Typical night |
|---|---|---|---|
| $f_c$ ($F_2$) | $N_{max}$ | 8–15 MHz | 3–8 MHz |
| $f_{MUF}$ | $f_c$ and path geometry | 20–35 MHz | 8–15 MHz |
| $h'$ ($F_2$) | layer height | 250–350 km | 300–400 km |
| $d_{skip}$ | $h'$ and take-off | 500–2000 km | 1000–3000 km |

**Conditions:** single-hop $F_2$ propagation over a smooth earth; multi-hop paths raise the effective distance but each hop doubles the loss on the ground. #propagation #satellite

> [!tip] High-yield ★
> The secant law $f_{MUF}=f_c\sec\theta_0$ is the whole topic: once you know the critical frequency and the incidence angle, both the MUF and the skip distance follow.

---

## Part C — Radar, Satellite and Optical Systems

### 11. Radar Range Equation and Microwave Links

![](https://www.youtube.com/watch?v=ix_cx_M-uwg)

*Video: The Radar Range Equation — Engineering Funda, 9:30*

**Radar range equation ★**

$$P_r=\frac{P_tG^2\lambda^2\sigma}{(4\pi)^3R^4}\ \text{(W)},\qquad R_{max}=\Bigl[\frac{P_tG^2\lambda^2\sigma}{(4\pi)^3P_{min}}\Bigr]^{1/4}\ \text{(m)},\qquad \sigma\ \text{(m}^2\text{)}$$

$P_t$ in W, $G$ dimensionless (same antenna transmit and receive), $\lambda$ in m, $\sigma$ in m² (radar cross section), $R$ in m, $P_r,P_{min}$ in W (minimum detectable signal).

**Range resolution, PRF and Doppler ★**

$$\Delta R=\frac{c\tau}{2}\ \text{(m)},\qquad R_{unamb}=\frac{c}{2\,PRF}\ \text{(m)},\qquad f_d=\frac{2v_r}{\lambda}=\frac{2v_rf_c}{c}\ \text{(Hz)},\qquad v_r=\frac{f_d\lambda}{2}\ \text{(m/s)}$$

$\tau$ in s (pulse width), $c$ in m/s, $PRF$ in Hz, $v_r$ in m/s (radial velocity, positive approaching), $f_d$ in Hz; a shorter pulse improves range resolution but costs average power.

**Radar equation in dB and microwave link budget**

$$P_{r,dBm}=P_{t,dBm}+2G_{dBi}+20\log_{10}\lambda+10\log_{10}\sigma-30\log_{10}(4\pi)-40\log_{10}R$$

$$P_{r,dBm}=P_{t,dBm}+G_{t,dBi}+G_{r,dBi}-92.45-20\log_{10}f_{GHz}-20\log_{10}d_{km}+Fade\ margin_{dB}$$

$P$ in dBm, $G$ in dBi, $\lambda$ in m, $\sigma$ in m², $R$ and $d$ in m or km (matching the constant); the $1/R^4$ law means doubling range costs 12 dB.

**Conditions:** monostatic radar, far-field target in the main beam with $\sigma$ on the radar line of sight; the $R_{max}$ form assumes a fixed minimum detectable signal and no propagation loss. #radar

---

### 12. Television Systems and ISDB-T

**Analog TV signal and bandwidth ★**

$$BW_{video}=4.2\ \text{MHz (NTSC)},\qquad BW_{channel}=6\ \text{MHz},\qquad f_{sc}\approx3.579545\ \text{MHz},\qquad \text{intercarrier }4.5\ \text{MHz}$$

$$f_{video}=1.25\ \text{MHz above channel edge},\qquad f_{audio}=f_{video}+4.5\ \text{MHz},\qquad \text{vestigial sideband }0.75\ \text{MHz}$$

Frequencies in MHz; the 6 MHz channel carries VSB video, an FM audio subcarrier and a colour subcarrier.

**Scanning and resolution**

$$f_{line}=\frac{N_{lines}}{2}\cdot f_{frame}\cdot\frac{1}{1-v}\ \text{(Hz)},\qquad N_{lines}=525\ \text{(NTSC)},\ 625\ \text{(PAL)},\qquad f_{frame}=30\ \text{or}\ 25\ \text{Hz}$$

$f_{line}$ in Hz (horizontal line rate), $N_{lines}$ dimensionless, $f_{frame}$ in Hz, $v$ dimensionless (vertical blanking fraction); NTSC line rate is 15 734 Hz and PAL is 15 625 Hz.

**Digital television and ISDB-T ★**

$$BW_{ISDB\text{-}T}=6\ \text{MHz},\qquad 13\ \text{segments of }429\ \text{kHz},\qquad \text{OFDM with }QPSK/16QAM/64QAM,\qquad \text{guard interval }1/8\ \text{or}\ 1/16$$

$$R_b\approx\frac{N_{carriers}\cdot b_{subcarrier}}{T_s}\ \text{(bit/s)},\qquad \text{one-segment (1seg) service for mobile},\qquad \text{Brazil/Japan/Philippines standard}$$

Segments dimensionless (13 per channel), subcarrier spacing 429 kHz/segment relationship as defined by the standard, $T_s$ in s (OFDM symbol), $R_b$ in bit/s; ISDB-T is the Philippine DTV standard (ISDB-Tb for Brazil).

**Conditions:** ISDB-T is a hierarchical OFDM system, so one 6 MHz channel carries fixed, mobile and one-segment services simultaneously with different modulation per layer. #satellite

---

### 13. Satellite Orbits, Transponders and G/T

![](https://www.youtube.com/watch?v=NFc3oU_wq7I)

*Video: LEO, MEO and GEO Orbits Explained — Global Invacom, 4:03*

**Orbital period, altitude and velocity ★**

$$T=2\pi\sqrt{\frac{a^3}{\mu}}\ \text{(s)},\qquad \mu=GM=3.986\times10^{14}\ \text{m}^3/\text{s}^2,\qquad a=R_E+h\ \text{(m)},\qquad R_E=6378\ \text{km}$$

$$v=\sqrt{\frac{\mu}{a}}\ \text{(m/s)},\qquad GEO: h\approx35\,786\ \text{km},\ T=23\ \text{h }56\ \text{min},\ v\approx3.07\ \text{km/s},\qquad \text{LEO}: h\approx500\text{–}2000\ \text{km}$$

$a$ in m (semi-major axis), $h$ in m (altitude), $\mu$ in m³/s², $T$ in s, $v$ in m/s; the geostationary orbit is equatorial, circular and prograde.

**Link budget, EIRP and G/T ★**

$$P_{r,dBW}=EIRP_{dBW}+G_{r,dBi}-FSPL_{dB}-L_{misc},\qquad FSPL_{dB}=92.45+20\log_{10}f_{GHz}+20\log_{10}d_{km}$$

$$\Bigl(\frac{C}{N_0}\Bigr)_{dBHz}=EIRP_{dBW}+G/T_{dB/K}-FSPL_{dB}+228.6\ \text{(dBW/K/Hz constant)},\qquad \frac{G}{T}=\frac{G_{r}}{T_{sys}}\ \text{(K}^{-1}\text{)}$$

$\frac{G}{T}$ in K$^{-1}$ or dB/K (referenced to 1 K$^{-1}$), $T_{sys}$ in K, $C/N_0$ in dBHz, $k=-228.6$ dBW/K/Hz; $\frac{G}{T}$ is the satellite or earth-station figure of merit.

**Transponder and multiple access**

$$G_{xp}=G_rG_tL_{xp}\ \text{(dB)},\qquad BW_{xp}=36\ \text{or}\ 54\ \text{MHz typical},\qquad \text{FDMA/TDMA/CDMA user access},\qquad \text{bent-pipe vs regenerative}$$

$G_{xp}$ in dB (transponder gain), $L_{xp}$ in dB (transponder loss), $BW_{xp}$ in Hz; a bent-pipe transponder translates frequency and amplifies, a regenerative one demodulates and remodulates.

| Orbit | Altitude | Period | Round-trip delay | Use |
|---|---|---|---|---|
| LEO | 500–2000 km | 90–130 min | 3–15 ms | imaging, Starlink |
| MEO | 5000–20 000 km | 4–12 h | 30–130 ms | GPS (20 200 km) |
| GEO | 35 786 km | 23 h 56 min | $\approx$239–250 ms | broadcast, VSAT |
| HEO | elliptical | 12 h | varies | high-latitude coverage |

**Conditions:** circular Keplerian orbit with $T^2\propto a^3$; GEO suffers roughly 240 ms of round-trip delay, which matters for voice and TCP, while LEO constellations need handover between satellites. #satellite

---

### 14. Optical Fiber NA, V Number and Modes

![](https://www.youtube.com/watch?v=q37CpocWZyw)

*Video: Acceptance Angle and Numerical Aperture (NA) — Engineering Funda, 18:15*

**Numerical aperture and acceptance angle ★**

$$NA=\sqrt{n_1^2-n_2^2}=n_1\sqrt{2\Delta}\approx\sin\theta_a,\qquad \Delta=\frac{n_1-n_2}{n_1},\qquad \theta_a=\arcsin(NA)$$

$n_1$ dimensionless (core index), $n_2$ dimensionless (cladding index), $\Delta$ dimensionless (relative index difference), $NA$ dimensionless, $\theta_a$ in rad or degrees (acceptance half-angle).

**V number and single-mode condition ★**

$$V=\frac{2\pi a}{\lambda}NA=\frac{2\pi a}{\lambda}\sqrt{n_1^2-n_2^2},\qquad \text{single mode}\iff V<2.405,\qquad \lambda_c=\frac{2\pi a\,NA}{2.405}\ \text{(m)}$$

$a$ in m (core radius), $\lambda$ in m, $V$ dimensionless (normalized frequency), $\lambda_c$ in m (cutoff wavelength); $V$ also scales the number of guided modes.

**Mode count and propagation angles**

$$M\approx\frac{V^2}{2}\ \text{(step-index multimode)},\qquad M\approx\frac{V^2}{4}\ \text{(parabolic graded-index)},\qquad \sin\theta_i>\frac{n_2}{n_1}\ \text{(total internal reflection)}$$

$M$ dimensionless (mode count), $V$ dimensionless, $\theta_i$ in rad (angle of incidence at the core–cladding boundary); the critical angle is $\theta_c=\arcsin(n_2/n_1)$.

**Conditions:** step-index fiber with $n_1>n_2$ and total internal reflection at the boundary; single-mode operation needs $V<2.405$, which is achieved with a small core and a short wavelength. #fiber

---

### 15. Fiber Attenuation and Dispersion

![](https://www.youtube.com/watch?v=llhxmeg4MrU)

*Video: Fiber Dispersion, Attenuation and Absorption — Dr. Shobha Nikam, 11:56*

**Attenuation and loss budget ★**

$$\alpha_{dB/km}=\frac{10}{L_{km}}\log_{10}\Bigl(\frac{P_{in}}{P_{out}}\Bigr)\ \text{(dB/km)},\qquad P_{out}=P_{in}10^{-\alpha L/10}\ \text{(W)},\qquad L_{max}=\frac{P_{tx}-P_{sens}-M}{\alpha}\ \text{(km)}$$

$\alpha$ in dB/km, $L$ in km, $P$ in W or dBm, $M$ in dB (margin), $P_{tx}$ and $P_{sens}$ in dBm; 1310 nm and 1550 nm are the low-loss windows (0.35 and 0.2 dB/km typical).

**Dispersion types and budget ★**

$$\sigma_{total}=\sqrt{\sigma_{modal}^2+\sigma_{chromatic}^2+\sigma_{PMD}^2}\ \text{(s)},\qquad \sigma_{chromatic}=D(\lambda)\cdot\Delta\lambda\cdot L\ \text{(s)}$$

$$BW_{max}\approx\frac{0.187}{\sigma_{modal}}\ \text{(Hz)}\ \text{(step index)},\qquad \sigma_{modal}=\frac{n_1L}{2n_2c}\Bigl(\frac{NA}{n_1}\Bigr)^2\ \text{(s, step index)}$$

$\sigma$ in s (RMS pulse broadening), $D(\lambda)$ in ps/(nm·km) (chromatic dispersion coefficient), $\Delta\lambda$ in nm (source spectral width), $L$ in km, $c$ in m/s, $NA$ dimensionless; intermodal dispersion dominates multimode, chromatic dominates single-mode.

| Fiber | Core | $\alpha$ (dB/km) | Dispersion | Bandwidth |
|---|---|---|---|---|
| Multimode step-index | 50–100 $\mu$m | 3–10 | high intermodal | 10–50 MHz·km |
| Multimode graded-index | 50–62.5 $\mu$m | 1–3 | low intermodal | 500 MHz–2 GHz·km |
| Single-mode (SMF-28) | 8–10 $\mu$m | 0.2–0.35 | chromatic only | very high |
| Dispersion-shifted | 8–10 $\mu$m | 0.2 | zero at 1550 nm | high, DWDM |

**Windows and Rayleigh scattering ★**

$$\text{first window: }850\ \text{nm},\qquad \text{low-loss windows: }1310\ \text{nm},\ 1550\ \text{nm},\qquad \alpha_R\propto\frac{1}{\lambda^{4}}$$

$$\alpha_{850}\approx3\ \text{dB/km},\qquad \alpha_{1310}\approx0.35\ \text{dB/km},\qquad \alpha_{1550}\approx0.2\ \text{dB/km}$$

$\lambda$ in nm or m (consistently), $\alpha_R$ in dB/km (Rayleigh loss); $\alpha_R\propto\lambda^{-4}$ is why the 850 nm first window is far lossier than 1310 nm or 1550 nm.

**Conditions:** attenuation is measured in dB/km at a stated wavelength; zero-dispersion wavelength is about 1310 nm in standard SMF, so 1550 nm needs dispersion-compensating fiber or modules; Rayleigh scattering falls as $\lambda^{-4}$, which is why the 1310 nm and 1550 nm windows attenuate far less than the 850 nm first window. #fiber

---

### 16. Optical Sources, Detectors and Power Budget

![](https://www.youtube.com/watch?v=xa10iWnCVPI)

*Video: Optical Sources and Detectors — Pravisha candideyes, 20:22*

**Sources and detectors ★**

$$P_{out}=I_{drive}\cdot\eta_{slope}\ \text{(W)},\qquad \eta_{ext}=\frac{P_{out}}{I\cdot E_{ph}}\ \text{(dimensionless)},\qquad \lambda_{peak}=\frac{hc}{E_g}\ \text{(m)},\qquad \text{LED: }BW\approx20\text{–}100\ \text{nm spectral width}$$

$$R=\frac{I_p}{P_{in}}\ \text{(A/W)},\qquad I_p=RP_{in},\qquad APD\ gain\ M\uparrow\Rightarrow SNR\uparrow,\ noise\uparrow$$

$P_{out}$ in W, $I_{drive}$ in A, $\eta_{slope}$ in W/A, $\eta_{ext}$ dimensionless, $E_{ph}$ in J, $E_g$ in J (bandgap), $\lambda_{peak}$ in m, $R$ in A/W (responsivity), $I_p$ in A, $M$ dimensionless (avalanche gain); LED is broadband and cheap, laser is narrowband and fast.

**Power budget and margin ★**

$$P_{rx}=P_{tx}-L_{fiber}-L_{connectors}-L_{splices}-M\ \text{(dBm)},\qquad P_{rx}\ge P_{sens},\qquad M=P_{rx}-P_{sens}\ \text{(dB)}$$

$$L_{fiber}=\alpha L\ \text{(dB)},\qquad L_{connector}\approx0.5\ \text{dB each},\qquad L_{splice}\approx0.1\ \text{dB each}$$

$P$ in dBm (1 mW reference), $L$ in dB, $\alpha$ in dB/km, $L$ in km, $M$ in dB (system margin, 3–6 dB typical); a budget passes when received power exceeds receiver sensitivity.

**Rise time and bandwidth budget**

$$t_{rise,total}=\sqrt{t_{tx}^2+t_{fiber}^2+t_{rx}^2}\ \text{(s)},\qquad BW_{system}\approx\frac{0.35}{t_{rise,total}}\ \text{(Hz)},\qquad \text{NRZ: }BW\approx\frac{R_b}{2}$$

$t$ in s (10–90% rise times), $BW$ in Hz, $R_b$ in bit/s (bit rate); the 0.35 constant is the Gaussian-response approximation.

| Detector | Responsivity | Gain | Noise | Use |
|---|---|---|---|---|
| PIN photodiode | 0.8–1.0 A/W | 1 | low | most links |
| APD | 0.8–1.0 A/W | 10–100 | higher (excess noise) | long haul |
| MSM / phototransistor | lower | — | — | low-cost short links |

**Conditions:** the λ of peak responsivity must match the source wavelength; LEDs suit multimode short links, lasers suit single-mode long haul, and APD helps only when the receiver is noise-limited, not when it is bandwidth-limited. #fiber

> [!warning] Exam trap
> In a fiber power budget, all terms are dB except the transmitter output and receiver sensitivity, which are dBm. Subtracting dB from dBm gives dBm; subtracting dBm from dBm gives dB (the margin).

> [!tip] High-yield ★
> Two fiber formulas carry most exam items: $NA=\sqrt{n_1^2-n_2^2}$ and $V=\frac{2\pi a}{\lambda}NA$ with the single-mode condition $V<2.405$.

---

## Part D — Arrays and Polarization

### 17. Antenna Arrays and Polarization

![](https://www.youtube.com/watch?v=vuz5zwbruTQ)

*Video: Antenna Arrays — RF elements, 3:19*

**Two-element array factor ★**

$$AF=2\cos\frac{\psi}{2},\qquad \psi=kd\cos\theta+\beta,\qquad k=\frac{2\pi}{\lambda}\ \text{(rad/m)}$$

$$\text{broadside }\beta=0\Rightarrow\max\text{ at }\theta=90^\circ,\qquad \text{end-fire }\beta=-kd\Rightarrow\max\text{ at }\theta=0^\circ$$

$AF$ dimensionless (relative field), $k$ in rad/m (wavenumber), $d$ in m (spacing), $\theta$ in rad (angle from the array axis), $\beta$ in rad (progressive element phase).

**N-element uniform linear array ★**

$$AF_N=\frac{\sin(N\psi/2)}{\sin(\psi/2)},\qquad \text{main-lobe width}\downarrow\ \text{as}\ N\uparrow,\qquad D_{array}\approx N D_{element}\ \text{(broadside)}$$

$$\text{steering}:\ \beta=-kd\cos\theta_0\Rightarrow\text{main beam at }\theta_0,\qquad \text{taper}\uparrow\Rightarrow\text{sidelobes}\downarrow,\ \text{main lobe}\uparrow$$

$N$ dimensionless (elements), $\theta_0$ in rad (steered beam direction), $D$ dimensionless (directivity); steering changes only the per-element phase, hence phased array.

| Excitation taper | First sidelobe | Main-lobe width |
|---|---|---|
| Uniform | $-13$ dB | narrowest |
| Triangular | $-27$ dB | wider |
| Binomial | very low | widest |
| Dolph-Chebyshev | preset equal-ripple level | widest for that level |

**Polarization loss factor ★**

$$PLF=\cos^{2}\theta,\qquad P_r=P_tG_tG_r\Bigl(\frac{\lambda}{4\pi d}\Bigr)^2PLF,\qquad PLF=1\ (0^\circ),\ 0.5\ (45^\circ),\ 0\ (90^\circ)$$

$PLF$ dimensionless, $\theta$ in rad (angle between the two linear polarisations), $P_r,P_t$ in W; circular-to-linear pairs lose 3 dB regardless of orientation.

**Conditions:** identical equally spaced elements with no mutual coupling, observed in the far field; the array factor multiplies the single-element pattern, and the PLF assumes a purely linearly polarised incident wave with no depolarisation along the path. #antenna

---

→ Back to [[00_Index]]
