---
title: Principles of Communications
part: EST
tags: [ece, est, formula-sheet]
topics: 15
---

# Principles of Communications

## Part A — Amplitude Modulation

### 1. AM Fundamentals and Modulation Index

![](https://www.youtube.com/watch?v=rzznMfag2Fk)

*Video: Modulation Index in Amplitude Modulation — Ekeeda, 9:03*

**AM waveform and modulation index ★**

$$v_{AM}(t)=A_c\bigl[1+m\cos\omega_mt\bigr]\cos\omega_ct,\qquad m=\frac{A_m}{A_c}=\frac{V_{max}-V_{min}}{V_{max}+V_{min}}$$

$A_c,A_m$ in V (carrier, modulating peak), $m$ dimensionless, $\omega_c,\omega_m$ in rad/s, $v_{AM}$ in V.

**Overmodulation and envelope limits**

$$V_{max}=A_c(1+m),\qquad V_{min}=A_c(1-m),\qquad \text{no distortion}\iff m\le1,\qquad \text{envelope}=A_c\lvert1+m\cos\omega_mt\rvert$$

$V_{max},V_{min}$ in V; $m>1$ clips the envelope and splatters sidebands.

**Modulating (intelligence) signal**

$$v_m(t)=A_m\cos\omega_mt,\qquad f_m\ \text{in Hz},\qquad m_{peak}=\frac{A_m}{A_c},\qquad m_{rms}=\frac{m}{\sqrt2}$$

$m_{rms}$ dimensionless (RMS modulation index), $f_m$ in Hz (modulating frequency).

**Conditions:** single-tone modulation of an ideal analog multiplier; envelope detection valid only while $m\le1$ and $f_c\gg f_m$. #am

---

### 2. AM Spectrum, Bandwidth and Power

![](https://www.youtube.com/watch?v=ibhBiC47yAQ)

*Video: Frequency Spectrum, Bandwidth and Power of an AM Wave — Sugandh Gupta, 12:34*

**Spectrum and bandwidth ★**

$$v_{AM}=A_c\cos\omega_ct+\frac{mA_c}{2}\cos(\omega_c+\omega_m)t+\frac{mA_c}{2}\cos(\omega_c-\omega_m)t,\qquad BW=2f_m$$

Sidebands at $f_c\pm f_m$ in Hz, each of amplitude $\frac{mA_c}{2}$ in V; $BW$ in Hz.

**Power relations ★**

$$P_c=\frac{A_c^2}{2R},\qquad P_{USB}=P_{LSB}=\frac{m^2}{4}P_c,\qquad P_t=P_c\Bigl(1+\frac{m^2}{2}\Bigr)$$

$P_c,P_t,P_{SB}$ in W, $R$ in $\Omega$ (usually $R=1\ \Omega$), $m$ dimensionless.

**Efficiency and peak envelope power**

$$\eta=\frac{P_{SB}}{P_t}=\frac{m^2}{2+m^2},\qquad \eta_{max}=\frac{1}{3}\ (m=1),\qquad PEP=\frac{A_c^2(1+m)^2}{2R}$$

$\eta$ dimensionless, $PEP$ in W (peak envelope power at 100% modulation).

**Antenna current and modulation index ★**

$$I_t=I_c\sqrt{1+\frac{m^2}{2}},\qquad m=\sqrt{2\Bigl(\frac{I_t^2}{I_c^2}-1\Bigr)}$$

$I_c$ in A (unmodulated antenna current), $I_t$ in A (modulated antenna current at the same antenna resistance), $m$ dimensionless.

**Multi-tone AM power**

$$P_t=P_c\Bigl(1+\frac{m_1^2+m_2^2+\cdots}{2}\Bigr)$$

$m_1,m_2,\dots$ dimensionless (per-tone modulation indices), $P_t$ in W (total), $P_c$ in W (carrier).

**Conditions:** single-tone AM with $R=1\ \Omega$; maximum efficiency is 33.3% at $m=1$, so AM wastes at least two-thirds of the power in the carrier. #am

---

### 3. DSB-SC and SSB-SC

![](https://www.youtube.com/watch?v=3wBlB-TFwkQ)

*Video: DSB-SC and SSB-SC Modulation — ALL ABOUT ELECTRONICS, 15:15*

**DSB-SC and SSB waveforms ★**

$$v_{DSB}(t)=A_c\,m(t)\cos\omega_ct,\qquad v_{SSB}(t)=\frac{A_c}{2}\bigl[m(t)\cos\omega_ct\mp\hat{m}(t)\sin\omega_ct\bigr]$$

$m(t)$ in V (modulating signal), $\hat{m}(t)$ in V (Hilbert transform of $m(t)$), $A_c$ in V, $\omega_c$ in rad/s.

**Bandwidth and power ★**

$$BW_{DSB}=2f_m,\qquad BW_{SSB}=f_m,\qquad P_{DSB}=\frac{A_c^2}{2}P_m,\qquad P_{SSB}=\frac{A_c^2}{4}P_m$$

$P_m$ in W (modulating power), $P_{DSB},P_{SSB}$ in W, $f_m$ in Hz; DSB-SC efficiency is 100% (no carrier).

**Coherent detection and quadrature null**

$$v_o(t)=\bigl[A_cm(t)\cos\omega_ct\bigr]\cos\omega_ct=\frac{A_c}{2}m(t)+\frac{A_c}{2}m(t)\cos2\omega_ct,\qquad \text{LPF}\Rightarrow\frac{A_c}{2}m(t)$$

Local oscillator must be phase- and frequency-coherent; any phase error $\phi$ scales the output by $\cos\phi$.

**Conditions:** SSB uses the filter method (sharp $f_c$ cutoff) or phasing method; DSB-SC and SSB-SC both require synchronous (coherent) detection, unlike plain AM. #am

---

### 4. VSB and AM Variants Comparison

![](https://www.youtube.com/watch?v=poYG4yNGlEk)

*Video: Vestigial Sideband (VSB) Modulation Explained — ALL ABOUT ELECTRONICS, 14:42*

**VSB spectrum shaping**

$$v_{VSB}(t)=A_cm(t)\cos\omega_ct+A_c\,m'(t)\sin\omega_ct,\qquad BW=f_m+f_v\ \text{(Hz)}$$

$m'(t)$ in V (filtered quadrature component), $f_v$ in Hz (vestigial sideband width), $BW$ in Hz; VSB keeps one full sideband plus a vestige of the other.

**Vestigial filter symmetry condition ★**

$$H(f_c+f)+H(f_c-f)=\text{constant},\qquad 0\le f\le f_v$$

$H(f)$ dimensionless (vestigial filter response), $f$ in Hz; this Nyquist-type symmetry removes crosstalk after envelope detection.

**AM variant comparison**

| Variant | Bandwidth | Carrier | Power efficiency | Detector |
|---|---|---|---|---|
| AM (DSB-FC) | $2f_m$ | full | $\le33.3\%$ | envelope |
| DSB-SC | $2f_m$ | suppressed | $100\%$ | coherent |
| SSB-SC | $f_m$ | suppressed | $100\%$ | coherent |
| VSB | $f_m+f_v$ | reduced/pilot | $\sim$ high | envelope (with symmetry) |
| FM | $2(\Delta f+f_m)$ | constant | constant power | limiter-discriminator |

**Conditions:** VSB is the standard for analog TV video; the vestige width $f_v$ is traded against filter realizability at $f_c$. #am

---

## Part B — Angle Modulation

### 5. FM and PM Fundamentals

![](https://www.youtube.com/watch?v=6Y9n8dMYL-o)

*Video: Frequency Modulation: Definition, Formula and Waveforms — Engineering Funda, 16:05*

**Phase and instantaneous frequency ★**

$$\phi(t)=\omega_ct+k_pm(t),\qquad \omega_i(t)=\frac{d\phi}{dt}=\omega_c+k_fm(t),\qquad f_i(t)=f_c+k_fm(t)$$

$k_p$ in rad/V (phase sensitivity), $k_f$ in Hz/V (frequency sensitivity), $m(t)$ in V, $\phi$ in rad, $\omega_i$ in rad/s, $f_i$ in Hz.

**FM and PM waveforms ★**

$$v_{FM}(t)=A_c\cos\Bigl[\omega_ct+k_f\!\!\int_0^tm(\tau)d\tau\Bigr],\qquad v_{PM}(t)=A_c\cos\bigl[\omega_ct+k_pm(t)\bigr]$$

$A_c$ in V (constant envelope), $\tau$ in s (integration variable).

**Deviation and modulation index**

$$\Delta f=k_fA_m\ \text{(Hz)},\qquad \Delta\phi=k_pA_m\ \text{(rad)},\qquad \beta=\frac{\Delta f}{f_m}=\frac{k_fA_m}{f_m}\ \text{(FM)},\qquad \beta_p=k_pA_m\ \text{(PM)}$$

$\Delta f$ in Hz (peak deviation), $\Delta\phi$ in rad, $\beta,\beta_p$ dimensionless; FM is the integral of PM and PM is the derivative of FM.

**Conditions:** constant-amplitude carrier with no envelope information; FM deviation is proportional to modulating amplitude and independent of $f_m$, PM deviation is independent of $f_m$. #fm

---

### 6. FM Sidebands and Bessel Functions

![](https://www.youtube.com/watch?v=8gVXtFuigFI)

*Video: Bessel Functions and the Spectrum of FM Signals — Engg. & Math Insights, 12:30*

**FM spectrum via Bessel functions ★**

$$v_{FM}(t)=A_c\!\!\sum_{n=-\infty}^{\infty}\!\!J_n(\beta)\cos\bigl[(\omega_c+n\omega_m)t\bigr],\qquad A_n=A_c\lvert J_n(\beta)\rvert$$

$J_n(\beta)$ dimensionless (Bessel function of the first kind, order $n$), $A_n$ in V (sideband amplitude), $n$ integer; infinite sidebands spaced $f_m$ apart.

**Bessel properties and power ★**

$$J_{-n}(\beta)=(-1)^nJ_n(\beta),\qquad J_0(0)=1,\qquad \sum_{n=-\infty}^{\infty}J_n^2(\beta)=1,\qquad P_t=\frac{A_c^2}{2R}$$

$P_t$ in W, $R$ in $\Omega$; total power is constant and independent of $\beta$, so FM trades bandwidth for noise immunity.

**Carrier nulls and bandwidth estimate**

| $\beta$ | $J_0(\beta)$ | Practical bandwidth |
|---|---|---|
| 0 | 1.00 | $2f_m$ |
| 1.0 | 0.765 | $\approx4f_m$ |
| 2.405 | 0 (first carrier null) | $\approx6f_m$ |
| 5.0 | $-0.178$ | $\approx12f_m$ |

**Conditions:** single-tone FM with $\beta=\Delta f/f_m$; sidebands beyond $n\approx\beta+1$ are negligible, which motivates Carson's rule. #fm #bessel

---

### 7. Carson's Rule and FM Bandwidth

**Carson's rule ★**

$$BW\approx2(\Delta f+f_m)=2f_m(\beta+1)\ \text{(Hz)},\qquad BW_{98\%}\approx2(\Delta f+2f_m)$$

$\Delta f$ in Hz (peak deviation), $f_m$ in Hz (highest modulating frequency), $\beta$ dimensionless; contains about 98% of the power.

**Wideband and narrowband limits**

$$BW_{WBFM}\approx2\Delta f\ (\beta\gg1),\qquad BW_{NBFM}\approx2f_m\ (\beta\ll1),\qquad \beta=\frac{\Delta f}{f_m}$$

**Deviation ratio and bandwidth efficiency**

$$D=\frac{\Delta f}{f_{m(max)}},\qquad \eta_{BW}=\frac{2f_m}{BW}=\frac{1}{\beta+1},\qquad \Delta f_{max}=D\,f_{m(max)}$$

$D$ dimensionless (deviation ratio), $\eta_{BW}$ dimensionless (bandwidth efficiency); broadcast FM uses $\Delta f=75$ kHz, $f_{m(max)}=15$ kHz, $D=5$, $BW\approx180$ kHz.

**Multi-tone peak deviation ★**

$$\Delta f_{max}=\sum_i\beta_if_i\ \text{(Hz)}$$

$\beta_i$ dimensionless (modulation index of tone $i$), $f_i$ in Hz (frequency of tone $i$), $\Delta f_{max}$ in Hz (worst-case peak deviation used in Carson's rule).

**Conditions:** $f_m$ is the highest modulating frequency, not the instantaneous one; Carson's rule is an engineering approximation, exact only for small numbers of sidebands. #fm

> [!warning] Exam trap
> In Carson's rule use the highest modulating frequency $f_{m(max)}$, never the instantaneous $f_m$ — this is the most common lost mark in FM bandwidth items.

---

### 8. NBFM vs WBFM

**Narrowband FM approximation ★**

$$v_{NBFM}(t)\approx A_c\cos\omega_ct-\frac{A_c\,k_f}{2}\Bigl[\cos(\omega_c-\omega_m)t-\cos(\omega_c+\omega_m)t\Bigr],\qquad \beta\ll1$$

$A_c$ in V, $k_f$ in Hz/V, $\beta$ dimensionless; NBFM has two sidebands like AM but opposite phase.

**Wideband FM**

$$BW_{WBFM}=2(\Delta f+f_m)\approx2\Delta f,\qquad \beta=\frac{\Delta f}{f_m}\gg1,\qquad \text{SNR gain}\propto\beta^2$$

**Comparison**

| Property | NBFM | WBFM |
|---|---|---|
| Modulation index $\beta$ | $\ll1$ | $\gg1$ |
| Bandwidth | $\approx2f_m$ | $\approx2\Delta f$ |
| Sidebands | 1 pair | many ($\approx\beta+1$) |
| Noise improvement | $\sim$ AM | large ($\beta^2$ law) |
| Use | land mobile, two-way | broadcast FM, TV sound |

**Conditions:** NBFM bandwidth equals AM bandwidth, so its noise advantage is small; WBFM gains noise immunity strictly by spending bandwidth. #fm

---

### 9. FM Noise and Threshold Effect

![](https://www.youtube.com/watch?v=VNCdBxNCK4Q)

*Video: Capture Effect and Threshold Effect in FM — EC Academy, 3:18*

**Output SNR and FM improvement factor ★**

$$\mathrm{SNR}_o=\frac{3}{2}\beta^2\frac{A_c^2/2}{2N_0f_m}\ \text{(W)},\qquad \mathrm{SNR}_{FM,o}=3\beta^2\mathrm{SNR}_{AM,o},\qquad \mathrm{SNR}_{FM,i}=\frac{A_c^2}{2N_0BW}$$

$N_0$ in W/Hz (one-sided density), $A_c$ in V, $f_m$ in Hz, $BW$ in Hz, $\beta$ dimensionless; SNR in dB is $10\log_{10}$ of these power ratios.

**Threshold and capture effect**

$$SNR_{th}\approx10\ \text{dB}\ (10:1\ \text{in power}),\qquad A_c\ge4V_n\ \text{for quieting},\qquad \text{capture}\iff A_1>A_2+\Delta$$

$A_c,V_n,A_1,A_2$ in V (carrier and noise/interferer amplitudes), $\Delta$ in V (capture margin); below threshold output SNR falls faster than input SNR.

**Noise triangle and pre-emphasis gain**

$$S_n(f)\propto f^2\ \text{(discriminator output)},\qquad P_n=\int_0^{f_m}S_n(f)df=\frac{2N_0f_m^3}{3A_c^2}\times\ \text{const}$$

**Conditions:** above threshold with a bandpass limiter; below threshold the "click" noise dominates and FM loses to AM — never quote the $3\beta^2$ law below threshold. #fm #noise

---

### 10. AM vs FM Noise Comparison

![](https://www.youtube.com/watch?v=BqYqgUGQVc8)

*Video: AM vs FM Noise Performance — Technologies Discussion, 14:35*

**Figure of merit (SNR at the detector output per input) ★**

$$FOM_{AM}=\frac{m^2}{2+m^2}\le\frac{1}{3},\qquad FOM_{FM}=\frac{3}{2}\beta^2,\qquad FOM_{PM}=\frac{1}{2}\beta_p^2$$

$m,\beta,\beta_p$ dimensionless; FOM is the ratio of output SNR to input SNR in the same bandwidth (both in dB).

**Output-to-input SNR ratio in dB form**

$$(SNR_o/SNR_i)_{dB}=10\log_{10}FOM,\qquad \text{AM @ }m=1:\ -4.8\ \text{dB},\qquad \text{FM }\beta=5:\ +18.8\ \text{dB}$$

**Comparison table**

| Property | AM | FM |
|---|---|---|
| Bandwidth | $2f_m$ | $2(\Delta f+f_m)$ |
| FOM (detector) | $m^2/(2+m^2)$ | $1.5\beta^2$ |
| Amplitude noise immunity | poor | excellent (limiter) |
| Threshold behaviour | none (linear) | sharp at $\approx10$ dB |
| Constant envelope | no | yes |

**Conditions:** both compared at equal input carrier power and equal message bandwidth; FM's advantage exists only above threshold. #fm #noise

> [!tip] High-yield ★
> Memorize the two figures of merit: AM gives at most $\frac13$ ($-4.8$ dB) while FM gives $\frac32\beta^2$ — that factor is where FM's noise advantage comes from.

---

## Part C — FM Circuits and Receivers

### 11. Pre-Emphasis and De-Emphasis

![](https://www.youtube.com/watch?v=ZjcMZ0ORTTM)

*Video: Pre-Emphasis and De-Emphasis in FM — EC Academy, 6:14*

**Pre-emphasis and de-emphasis response ★**

$$H_{pe}(f)=1+j\frac{f}{f_1},\qquad H_{de}(f)=\frac{1}{1+j\frac{f}{f_1}},\qquad H_{pe}(f)H_{de}(f)=1$$

$f_1$ in Hz (3 dB corner: 2122 Hz for 75 $\mu$s, 3183 Hz for 50 $\mu$s), $H(f)$ dimensionless voltage transfer.

**Time constants**

$$\tau=R_1C_1=\frac{1}{2\pi f_1},\qquad \tau=75\ \mu\text{s}\Rightarrow f_1=2122\ \text{Hz},\qquad \tau=50\ \mu\text{s}\Rightarrow f_1=3183\ \text{Hz}$$

$\tau$ in s, $R_1$ in $\Omega$, $C_1$ in F, $f_1$ in Hz (US/Europe: 75 $\mu$s; ITU-1/EU: 50 $\mu$s).

**Improvement from emphasis**

$$G_{emp}=\frac{\int_0^{f_m}f^2\,df}{\int_0^{f_m}\frac{f^2}{1+(f/f_1)^2}df}\ \text{(dimensionless)},\qquad SNR_{improve}=10\log_{10}G_{emp}\ \text{(dB)}$$

$f$ in Hz, $f_m$ in Hz (top of baseband), $f_1$ in Hz (emphasis corner), $G_{emp}$ dimensionless; typical dB improvement is 10–13 dB for $f_1=2122$ Hz.

**Conditions:** pre-emphasis must exactly complement de-emphasis at the receiver; FM broadcast pairs 75 $\mu$s with 15 kHz baseband and 75 kHz deviation. #fm #noise

---

### 12. Superheterodyne Receiver

![](https://www.youtube.com/watch?v=i7IFqCTL_rQ)

*Video: The Superheterodyne Receiver — EzEd Channel, 4:23*

**Mixer and intermediate frequency ★**

$$f_{IF}=\lvert f_{RF}-f_{LO}\rvert,\qquad f_{LO}=f_{RF}\pm f_{IF},\qquad f_{Image}=f_{RF}\pm2f_{IF}$$

$f_{RF},f_{LO},f_{IF},f_{Image}$ in Hz; high-side injection uses $f_{LO}=f_{RF}+f_{IF}$.

**Standard IF values**

| Service | RF band | IF | Image spacing |
|---|---|---|---|
| AM broadcast | 535–1605 kHz | 455 kHz | 910 kHz |
| FM broadcast | 88–108 MHz | 10.7 MHz | 21.4 MHz |
| TV (analog) | VHF/UHF | 45.75 MHz (video) | 91.5 MHz |

**Conversion gain and spurious response**

$$G_c=10\log_{10}\frac{P_{IF}}{P_{RF}}\ \text{(dB)},\qquad f_{spur}=\lvert mf_{LO}\pm nf_{RF}\rvert=f_{IF},\qquad m,n\ \text{integers}$$

$P_{IF},P_{RF}$ in W, $G_c$ in dB, $f_{spur}$ in Hz.

**Conditions:** square-law or multiplicative mixing; the preselector must reject the image frequency $f_{Image}$ before the mixer or the image response ruins selectivity. #receiver

---

### 13. Image Frequency and IRR

![](https://www.youtube.com/watch?v=O2GqyJxWOGE)

*Video: Heterodyne Receiver and Image Rejection — Prof. David S. Ricketts, 9:10*

**Image frequency and image rejection ratio ★**

$$f_{Image}=f_{RF}+2f_{IF}\ \text{(high-side)},\qquad f_{Image}=f_{RF}-2f_{IF}\ \text{(low-side)}$$

$$IRR=\sqrt{1+Q^2\rho^2},\qquad \rho=\frac{f_{Image}}{f_{RF}}-\frac{f_{RF}}{f_{Image}},\qquad IRR_{dB}=20\log_{10}IRR$$

$f_{IF}$ in Hz, $Q$ dimensionless (preselector quality factor), $\rho$ dimensionless (image ratio), $IRR$ dimensionless voltage ratio, $IRR_{dB}$ in dB (a voltage ratio, not dBm).

**Dual-conversion receiver**

$$f_{Image1}=f_{RF}+2f_{IF1},\qquad f_{IF2}\ \text{chosen to move the image far from } f_{RF},\qquad \text{total } IRR=IRR_1\cdot IRR_2$$

**Sampling (direct-conversion / software radio) alternative**

$$f_s\ge2f_{RF(max)},\qquad \text{no image if } f_{RF}\ \text{band-pass sampled correctly}$$

$f_s$ in Hz; a high first IF and a high-$Q$ front end both raise $IRR$.

**Conditions:** image rejection improves with higher $f_{IF}$ and higher preselector $Q$; $IRR$ in dB is a voltage ratio (a power IRR would be $20\log_{10}$ here only for equal impedances). #receiver

> [!warning] Exam trap
> The image is offset by $2f_{IF}$, not $f_{IF}$, from the RF — doubling the offset is the standard board mistake when computing $IRR$.

---

### 14. AGC and Receiver Characteristics

**Sensitivity, selectivity and dynamic range ★**

$$Sensitivity\ (dBm)=-174+NF_{dB}+10\log_{10}B+SNR_{min},\qquad Selectivity=10\log_{10}\frac{P_{f_0}}{P_{f_{\pm\Delta}}}\ \text{(dB)}$$

$$DR=10\log_{10}\frac{P_{max}}{P_{min}}\ \text{(dB)}$$

$NF_{dB}$ in dB, $B$ in Hz, $SNR_{min}$ in dB, $P$ in W or dBm (referenced to 1 mW), $DR$ in dB (spurious-free dynamic range).

**AGC loop relation**

$$A_{out}=A_{in}G_{AGC},\qquad G_{AGC}=\frac{G_0}{1+\beta A_{out}},\qquad \text{loop gain }T=\beta A$$

$A_{in},A_{out}$ in V (or dB), $G_0$ dimensionless (open-loop gain), $\beta$ dimensionless (feedback factor), $T$ dimensionless.

**Receiver characteristics**

| Characteristic | Definition | Typical value |
|---|---|---|
| Sensitivity | minimum detectable signal for rated SNR | $-120$ dBm (FM), $-100$ dBm (AM) |
| Selectivity | adjacent-channel rejection | 60 dB at $\pm10$ kHz |
| Fidelity | output waveform accuracy | total harmonic distortion in % |
| Dynamic range | overload-to-threshold spread | 80–100 dB |
| Image rejection | $IRR_{dB}$ | $>60$ dB |
| AGC range | input span held at constant output | 60–100 dB |

**Conditions:** noise-limited sensitivity uses $B$ as the receiver noise bandwidth and $SNR_{min}$ as the required detector threshold; AGC keeps $A_{out}$ nearly constant while $A_{in}$ varies over its range. #receiver

> [!tip] High-yield ★
> Sensitivity in dBm starts from $-174$ dBm/Hz and adds $NF_{dB}+10\log_{10}B+SNR_{min}$ — three additions, no multiplication.

---

## Part D — Transmission Levels

### 15. Signal Levels and the Telephony Reference

**600 Ω telephony reference ★**

$$1\ \text{mW into }600\ \Omega=0\ \text{dBm},\qquad V=\sqrt{PR}=\sqrt{0.001\times600}\approx0.775\ \text{V rms}$$

$P$ in W, $R$ in $\Omega$, $V$ in V (RMS); 0 dBm is the absolute power level reference, and 0.775 V rms is its 600 $\Omega$ voltage equivalent.

**dBm0 and the transmission level point**

$$dBm0=L_{dBm}-TLP\ \text{(dB)},\qquad TLP=0\ \text{dBr}\ \text{(zero transmission level point)}$$

$L_{dBm}$ in dBm (level measured at the point), $TLP$ in dB (relative level of that point), dBm0 in dBm referred to a zero transmission level point.

**Conditions:** 600 $\Omega$ balanced telephony reference; dBm0 is a power level referred to a zero transmission level point (0 dBr), so it is independent of the impedance at the measuring point. #levels

---

→ Back to [[00_Index]]
