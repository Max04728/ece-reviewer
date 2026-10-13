---
title: Signals Spectra and Noise
part: EST
tags: [ece, est, formula-sheet]
topics: 12
---

# Signals Spectra and Noise

## Part A — Signal Analysis and Noise

### 1. Time vs Frequency and Line Spectra

**Fourier series and line spectrum ★**

$$x(t)=\sum_{n=-\infty}^{\infty}c_ne^{jn\omega_0t},\qquad c_n=\frac{1}{T}\int_0^Tx(t)e^{-jn\omega_0t}dt,\qquad \omega_0=2\pi f_0=\frac{2\pi}{T}$$

**Symbols**

- $x(t)$ — periodic signal, in V or A
- $c_n$ — complex Fourier coefficient (line amplitude at $nf_0$), in V or A
- $T$ — period, in s
- $f_0=1/T$ — fundamental frequency, in Hz
- $\omega_0=2\pi f_0$ — fundamental angular frequency, in rad/s
- $n$ — harmonic index (integer, $-\infty$ to $+\infty$, dimensionless)

Discrete lines exist only at $nf_0$.

**Trigonometric form, RMS and Parseval ★**

$$x=a_0+\sum_{n\ge1}\bigl(a_n\cos n\omega_0t+b_n\sin n\omega_0t\bigr),\qquad X_{rms}=\sqrt{a_0^2+\sum_{n\ge1}\frac{a_n^2+b_n^2}{2}},\qquad P=\sum_{n}\lvert c_n\rvert^2$$

**Symbols**

- $a_0$ — DC (average) term, in V
- $a_n,b_n$ — cosine and sine amplitudes of the $n$th harmonic, in V
- $X_{rms}$ — total RMS value, in V
- $P$ — average power into a 1 $\Omega$ reference, in W

**Pulse-train envelope (sinc)**

$$\lvert c_n\rvert=\frac{2A\tau}{T}\lvert\mathrm{sinc}(n\tau f_0)\rvert,\qquad \mathrm{sinc}\,u=\frac{\sin\pi u}{\pi u},\qquad \text{first null at } f=\frac{1}{\tau}$$

**Symbols**

- $A$ — pulse amplitude, in V
- $\tau$ — pulse width, in s
- $\lvert c_n\rvert$ — magnitude of the $n$th spectral line, in V
- $\mathrm{sinc}\,u=\sin(\pi u)/(\pi u)$ — normalised sinc ($u$ dimensionless)

**Conditions:** $x(t)$ periodic and finite-power, satisfying Dirichlet conditions (single-valued, finite extrema, finite discontinuities per period). #fourier

---

### 2. Power Spectral Density

![](https://www.youtube.com/watch?v=DoSLMEEo1Y0)

*Video: What Is Power Spectral Density (PSD)? — Iain Explains, 10:19*

**Density and total power ★**

$$S_x(f)=\int_{-\infty}^{\infty}R_x(\tau)e^{-j2\pi f\tau}d\tau,\qquad R_x(\tau)=\int_{-\infty}^{\infty}S_x(f)e^{j2\pi f\tau}df,\qquad P=\int_{-\infty}^{\infty}S_x(f)\,df$$

**Symbols**

- $S_x(f)$ — two-sided power spectral density, in W/Hz
- $R_x(\tau)$ — autocorrelation function, in W
- $\tau$ — time lag, in s
- $f$ — frequency, in Hz
- $P$ — total average power, in W

**One-sided density and discrete lines**

$$S_1(f)=2S_x(f)\ (f\ge0),\qquad P=\int_0^\infty S_1(f)df,\qquad P_{dc}=S_x(0)B,\qquad S_x(f)=\frac{V_{rms}^2}{RB}$$

**Symbols**

- $S_1(f)$ — one-sided (physical) density, in W/Hz for $f\ge0$
- $S_x(0)$ — value of the two-sided density at DC, in W/Hz
- $P$ — total average power, in W
- $P_{dc}$ — DC power, in W
- $B$ — measurement bandwidth, in Hz
- $R$ — resistance, in $\Omega$
- $V_{rms}$ — RMS voltage across $R$, in V
- $N_0$ — white-noise density level, in W/Hz

White noise has flat $S_x(f)=N_0/2$ in W/Hz.

**Discrete autocorrelation and cross-correlation ★**

$$R_{xx}[k]=\sum_{n=-\infty}^{\infty}x[n]x[n-k],\qquad R_{xy}[k]=R_{yx}[-k]$$

**Symbols**

- $R_{xx}[k]$ — autocorrelation sequence, in V²
- $R_{xy}[k]$, $R_{yx}[k]$ — cross-correlation sequences, in V²
- $x[n]$ — discrete-time samples, in V
- $k$ — lag (integer, dimensionless)

Order matters, since $R_{xy}\ne R_{yx}$ in general.

**DC block, power signals and the unit circle**

$$\text{nonzero mean}\Rightarrow\text{pole at }z=1,\qquad \lvert z\rvert=1\notin ROC,\qquad \text{remove the mean}\Rightarrow\text{pole inside }\lvert z\rvert<1$$

Non-zero mean gives a pole at $z=1$ and a power (not energy) signal because the ROC excludes $\lvert z\rvert=1$; removing the mean pulls the pole inside the unit circle.

**Conditions:** wide-sense stationary process with $\int\lvert R_x(\tau)\rvert\,d\tau<\infty$; the one-sided form applies to physical positive-frequency measurements only. #psd #noise

---

### 3. Thermal and Johnson Noise

![](https://www.youtube.com/watch?v=LjHs5HJ-Kq8)

*Video: Introduction to Johnson-Nyquist Noise — Aaron Danner, 11:50*

**Available noise power at a matched load ★**

$$P_n=kTB,\qquad N_0=kT,\qquad V_n=\sqrt{4kTBR},\qquad I_n=\sqrt{\frac{4kTB}{R}}$$

**Symbols**

- $k$ — Boltzmann constant, $k=1.38\times10^{-23}$ J/K
- $T$ — absolute temperature, in K
- $B$ — noise bandwidth, in Hz
- $R$ — resistance, in $\Omega$
- $V_n$ — RMS noise voltage, in V
- $I_n$ — RMS noise current, in A
- $P_n=kTB$ — available noise power at a matched load, in W
- $N_0=kT$ — noise power spectral density, in W/Hz

**Standard reference values ★**

| $T$ | $kT$ (J) | $kT$ per Hz |
|---|---|---|
| 290 K (17 °C, standard) | $4.00\times10^{-21}$ | $-174$ dBm/Hz |
| 300 K | $4.14\times10^{-21}$ | $-173.8$ dBm/Hz |

dBm is referenced to 1 mW, dBW to 1 W: $P_{dBm}=10\log_{10}\frac{P}{1\,\mathrm{mW}}$.

**Equivalent noise bandwidth ★**

$$B_n=\frac{\pi}{2}B_{3\text{dB}}\approx1.57\,B_{3\text{dB}}\ \text{(single-tuned)},\qquad B_n=\frac{1}{RC}\ \text{(parallel RLC)}$$

**Symbols**

- $B_n$ — equivalent noise bandwidth, in Hz
- $B_{3\text{dB}}$ — 3 dB (half-power) bandwidth, in Hz
- $R$ — resistance, in $\Omega$
- $C$ — capacitance, in F

$B_n$ is the bandwidth of an ideal rectangular filter passing the same total noise power, and the receiver noise power is $P_n=kTB_n$.

$R$ in $\Omega$, $C$ in F, $P_n$ in W; the receiver noise power is $P_n=kTB_n$.

**Conditions:** Nyquist result for a resistor in thermal equilibrium at uniform $T$; a matched load extracts $kTB$; white while $hf\ll kT$ (below about $10^{12}$ Hz). #noise

---

### 4. Shot, Flicker and Transit-Time Noise

![](https://www.youtube.com/watch?v=VEjw-i1JhrY)

*Video: Shot, Flicker and Johnson Noise Characteristics — PASSIONATE PROFESSOR, 11:35*

**Shot noise ★**

$$I_{sh}=\sqrt{2qI_{dc}B},\qquad P_{sh}=2qI_{dc}BR,\qquad q=1.602\times10^{-19}\ \text{C}$$

**Symbols**

- $I_{sh}$ — RMS shot-noise current, in A
- $I_{dc}$ — DC bias current through the barrier, in A
- $P_{sh}$ — shot-noise power in $R$, in W
- $q$ — electron charge, $q=1.602\times10^{-19}$ C
- $B$ — noise bandwidth, in Hz
- $R$ — resistance, in $\Omega$

**Flicker ($1/f$) and transit-time noise**

$$V_f^2=\frac{KI_{dc}}{f^{\alpha}}B,\qquad \alpha\approx1,\qquad f_{ce}=\frac{KI_{dc}}{2q},\qquad f_{tt}\propto\frac{1}{2\pi\tau_t}$$

**Symbols**

- $K$ — flicker-noise empirical constant, in $\mathrm{A\cdot\Omega^2}$
- $I_{dc}$ — DC current, in A
- $f$ — frequency, in Hz
- $\alpha$ — flicker exponent, dimensionless (typically 0.8–1.3)
- $B$ — noise bandwidth, in Hz
- $f_{ce}$ — corner frequency where flicker noise equals shot noise, in Hz
- $\tau_t$ — carrier transit time, in s
- $f_{tt}$ — transit-time corner frequency, in Hz

| Noise | Physical origin | Spectrum |
|---|---|---|
| Thermal (Johnson) | random carrier motion in any resistor | flat (white) |
| Shot | discrete carriers crossing a barrier/junction | flat (white) |
| Flicker | surface and trap recombination | $1/f$ |
| Transit-time | finite carrier transit across a junction | rises above $f_{tt}$ |

**Conditions:** shot noise requires a DC current and a potential barrier; flicker dominates below $f_{ce}$, transit-time noise above $f_{tt}$. #noise

---

### 5. SNR, Noise Factor and Noise Figure

![](https://www.youtube.com/watch?v=oibmFc9uErM)

*Video: Noise Figure: Definition, Formula and Units — Engineering Funda, 4:55*

**SNR and noise factor ★**

$$\mathrm{SNR}=\frac{P_s}{P_n}=\frac{V_s^2}{V_n^2}\ \text{(matched)},\qquad F=\frac{\mathrm{SNR}_i}{\mathrm{SNR}_o}=\frac{S_i/N_i}{S_o/N_o}\ge1$$

**Symbols**

- $P_s,P_n$ — signal and noise power, in W
- $V_s,V_n$ — signal and noise RMS voltage, in V
- $S_i,S_o$ — input and output signal power, in W
- $N_i,N_o$ — input and output noise power, in W
- $F$ — noise factor, dimensionless (linear power ratio, $\ge1$)

**dB forms — always state the reference ★**

$$NF_{dB}=10\log_{10}F,\qquad F=1+\frac{T_e}{T_0},\qquad T_0=290\ \text{K},\qquad F_{loss}=L$$

**Symbols**

- $NF_{dB}=10\log_{10}F$ — noise figure, in dB (a dimensionless ratio, never dBm)
- $T_e$ — equivalent noise temperature, in K
- $T_0=290$ K — standard reference temperature
- $L\ge1$ — loss factor of a passive block, dimensionless, so $F_{loss}=L$

**Noise figure of a lossy (passive) block**

$$NF_{dB}=10\log_{10}L,\qquad T_{loss}=T_0(L-1)\ \text{(K)}$$

**Friis cascade in noise-factor form ★**

$$F=F_1+\frac{F_2-1}{G_1}+\frac{F_3-1}{G_1G_2}+\cdots$$

**Symbols**

- $F$ — overall noise factor of the cascade, dimensionless
- $F_i$ — noise factor of stage $i$, dimensionless
- $G_i$ — available power gain of stage $i$, dimensionless (a power ratio, not dB)

The first stage dominates because each later term is divided by the preceding available gains.

**Conditions:** matched source held at $T_0=290$ K and narrowband (spot) measurement; $F\ge1$ always, hence $NF_{dB}\ge0$ dB. #noise

---

### 6. Equivalent Noise Temperature

![](https://www.youtube.com/watch?v=DPywBl-3Aew)

*Video: Noise Temperature: Definition, Formula and Units — Engineering Funda, 4:58*

**Linear conversion ★**

$$T_e=(F-1)T_0,\qquad F=1+\frac{T_e}{T_0},\qquad T_0=290\ \text{K}\ (17\ ^\circ\text{C})$$

**Symbols**

- $T_e$ — equivalent noise temperature, in K
- $F$ — noise factor, dimensionless
- $T_0=290$ K — standard reference temperature (17 °C)

**System temperature and noise power**

$$T_{sys}=T_a+T_e,\qquad N=kT_{sys}B,\qquad N_{dBm}=10\log_{10}\frac{kT_{sys}B}{1\ \text{mW}}$$

**Symbols**

- $T_a$ — antenna noise temperature, in K
- $T_e$ — equivalent noise temperature of the receiver, in K
- $T_{sys}$ — system noise temperature, in K
- $N$ — noise power, in W or dBm (dBm referenced to 1 mW)
- $B$ — noise bandwidth, in Hz
- $k=1.38\times10^{-23}$ J/K — Boltzmann constant

**Conversion table**

| $F$ | $NF$ (dB) | $T_e$ (K) |
|---|---|---|
| 1.0 | 0 | 0 |
| 1.26 | 1 | 75.4 |
| 2.0 | 3 | 290 |
| 10 | 10 | 2610 |
| 100 | 20 | 28 710 |

**Conditions:** referenced to $T_0=290$ K; in a cascade, $T_{sys}=T_a+T_{e1}+T_{e2}/G_1+T_{e3}/(G_1G_2)+\cdots$. #noise

---

## Part B — Sampling and Discrete Processing

### 7. Sampling Theorem and Aliasing

![](https://www.youtube.com/watch?v=yWqrx08UeUs)

*Video: Sampling, Aliasing and the Nyquist Theorem — 0612 TV, 10:47*

**Nyquist rate, interval and folding frequency ★**

$$f_s\ge2f_{max},\qquad T_s=\frac{1}{f_s}\le\frac{1}{2f_{max}},\qquad f_N=\frac{f_s}{2}$$

**Symbols**

- $f_s$ — sampling rate, in Hz
- $f_{max}$ — highest baseband component of $x(t)$, in Hz
- $T_s=1/f_s$ — sampling interval, in s
- $f_N=f_s/2$ — Nyquist (folding) frequency, in Hz

Taking $f_s>2f_{max}$ leaves a guard band.

**Aliased frequency and sampled spectrum ★**

$$f_a=\lvert f-nf_s\rvert\ \text{for the } n \text{ giving } 0\le f_a\le f_N,\qquad X_s(f)=f_s\sum_{n=-\infty}^{\infty}X(f-nf_s)$$

**Symbols**

- $f$ — true frequency of the component, in Hz
- $f_a$ — observed (alias) frequency, in Hz
- $f_s$ — sampling rate, in Hz
- $X_s(f)$ — spectrum of the sampled signal, in V/Hz
- $n$ — integer chosen so that $0\le f_a\le f_N$

**Ideal reconstruction and resolution floor**

$$x(t)=\sum_n x(nT_s)\,\mathrm{sinc}\Bigl(\frac{t-nT_s}{T_s}\Bigr),\qquad \mathrm{SQNR}_{ideal}=6.02N_q+1.76\ \text{dB}$$

**Symbols**

- $x(nT_s)$ — signal samples, in V
- $T_s$ — sampling interval, in s
- $N_q$ — quantiser resolution, dimensionless (bits)
- $\mathrm{SQNR}_{ideal}$ — ideal signal-to-quantisation-noise ratio, in dB

**Conditions:** $x(t)$ strictly band-limited to $f_{max}$; any component above $f_N$ folds to $f_s-f$ and is unrecoverable afterwards. #sampling

---

### 8. Sampling Types and Aperture Effect

![](https://www.youtube.com/watch?v=sFiCgEVpTWs)

*Video: Ideal, Natural and Flat-Top Sampling (Aperture Effect) — Electronics Subjectified, 5:45*

**Ideal vs flat-top sampling ★**

$$x_n=x(nT_s)\ \text{(ideal)},\qquad X_{ft}(f)=\bigl[X(f)H_a(f)\bigr]*f_s\!\!\sum_n\delta(f-nf_s)$$

**Symbols**

- $x_n$ — ideal samples, in V
- $H_a(f)$ — aperture (hold) response, dimensionless
- $f_s$ — sampling rate, in Hz
- $\delta(f-nf_s)$ — impulse train at multiples of $f_s$
- $*$ — convolution

Natural sampling multiplies $x(t)$ by the pulse train instead.

**Aperture (hold) response and first null ★**

$$H_a(f)=\tau\,\mathrm{sinc}(f\tau)e^{-j\pi f\tau},\qquad \lvert H_a(f)\rvert=\tau\lvert\mathrm{sinc}(f\tau)\rvert,\qquad \text{null at } f=\frac{1}{\tau}$$

**Symbols**

- $\tau$ — aperture (hold) time, in s
- $\lvert H_a(f)\rvert$ — aperture magnitude response, dimensionless
- $\mathrm{sinc}\,u=\sin(\pi u)/(\pi u)$ with $u=f\tau$ dimensionless
- $f$ — frequency, in Hz

**Aperture error, cutoff and droop**

$$\Delta V\le\frac{dV}{dt}\Bigr\rvert_{max}\tau,\qquad f_{-3dB}\approx\frac{0.443}{\tau},\qquad \text{droop}=\frac{\Delta V}{V}$$

**Symbols**

- $dV/dt$ — maximum slope of the signal, in V/s
- $\Delta V$ — aperture error (voltage uncertainty), in V
- $\tau$ — aperture time, in s
- $f_{-3\text{dB}}$ — 3 dB cutoff frequency, in Hz
- droop — fractional voltage droop, dimensionless

**Conditions:** flat-top sampling distorts by $\mathrm{sinc}(f\tau)$ — equalize with an inverse-sinc filter or shrink $\tau$; require $f_s\tau\ll1$. #sampling

---

### 9. Anti-Aliasing Filters

**Butterworth magnitude and minimum order ★**

$$\lvert H(f)\rvert^2=\frac{1}{1+\bigl(\frac{f}{f_c}\bigr)^{2n}},\qquad n\ge\frac{\log_{10}\bigl(10^{A_s/10}-1\bigr)}{2\log_{10}\bigl(\frac{f_s-f_{max}}{f_{max}}\bigr)},\qquad f_c\ge f_{max}$$

**Symbols**

- $f$ — frequency, in Hz
- $f_c$ — cutoff frequency, in Hz
- $n$ — filter order, integer
- $A_s$ — required stopband attenuation at $f_s-f_{max}$, in dB
- $f_s$ — sampling rate, in Hz
- $f_{max}$ — highest signal frequency to preserve, in Hz
- $\lvert H(f)\rvert$ — magnitude response, dimensionless

**Chebyshev and Bessel responses**

$$\lvert H(f)\rvert^2=\frac{1}{1+\epsilon^2T_n^2\!\bigl(\frac{f}{f_c}\bigr)}\ \text{(type I)},\qquad \epsilon^2=10^{A_p/10}-1,\qquad \tau_g\approx\text{flat (Bessel)}$$

**Symbols**

- $\epsilon$ — ripple factor, dimensionless
- $T_n$ — $n$th-order Chebyshev polynomial
- $A_p$ — passband ripple, in dB
- $f_c$ — cutoff frequency, in Hz
- $\tau_g$ — group delay, in s

| Response | Passband | Stopband | Roll-off / phase |
|---|---|---|---|
| Butterworth | maximally flat | monotonic | $-20n$ dB/dec, moderate phase |
| Chebyshev I | equiripple | monotonic | steeper than Butterworth |
| Chebyshev II | maximally flat | equiripple | steep, low passband ripple |
| Bessel | flat $\tau_g$ | gentle | slowest, best pulse fidelity |
| Elliptic | equiripple | equiripple | steepest for a given order |

**Conditions:** analog prototypes with $f_{-3dB}=f_c$ for Butterworth (order-independent); set $f_c<f_s/2$ and accept passband ringing near $f_{max}$. #filter #sampling

---

### 10. DFT and FFT

![](https://www.youtube.com/watch?v=BPf_pw_1Mg4)

*Video: What Is a DFT and an FFT? — Iain Explains, 13:27*

**DFT pair ★**

$$X(k)=\sum_{n=0}^{N-1}x(n)e^{-j2\pi kn/N},\qquad x(n)=\frac{1}{N}\sum_{k=0}^{N-1}X(k)e^{j2\pi kn/N}$$

**Symbols**

- $x(n)$ — input samples, in V
- $X(k)$ — DFT output, in V
- $N$ — transform length (number of points), dimensionless
- $n,k$ — sample and bin indices, $0,1,\dots,N-1$
- $j=\sqrt{-1}$

**Bin spacing, record length and resolution ★**

$$\Delta f=\frac{f_s}{N}=\frac{1}{T_0},\qquad T_0=NT_s,\qquad f_{bin}=k\Delta f,\qquad \frac{k}{N}=\frac{f}{f_s}$$

**Symbols**

- $\Delta f$ — bin spacing, in Hz
- $T_0$ — record length, in s
- $f_s$ — sampling rate, in Hz
- $f_{bin}$ — frequency of bin $k$, in Hz
- $T_s$ — sampling interval, in s

Resolution is set by $T_0$, not by $N$ alone.

**FFT cost, windows and leakage**

$$C_{DFT}=N^2,\qquad C_{FFT}=\frac{N}{2}\log_2N\ \text{complex MACs},\qquad \text{speedup}=\frac{2N}{\log_2N}$$

**Symbols**

- $C_{DFT}$ — direct DFT cost, complex multiply-accumulates
- $C_{FFT}$ — radix-2 FFT cost, complex multiply-accumulates
- $N$ — transform length, dimensionless
- speedup — cost ratio $C_{DFT}/C_{FFT}$, dimensionless

| Window | Main-lobe width (bins) | Peak sidelobe (dB) |
|---|---|---|
| Rectangular | 2 | $-13$ |
| Hann | 4 | $-31$ |
| Hamming | 4 | $-43$ |
| Blackman | 6 | $-58$ |

**Conditions:** $N$ a power of 2 for radix-2 FFT; non-integer cycles in $T_0$ cause spectral leakage — apply a window or sample coherently. #dft #fft

---

### 11. FIR vs IIR Filters

![](https://www.youtube.com/watch?v=9yNQBWKRSs4)

*Video: Overview of FIR and IIR Filters — Barry Van Veen, 12:27*

**FIR transfer function and difference equation ★**

$$H(z)=\sum_{n=0}^{M-1}h(n)z^{-n},\qquad y(n)=\sum_{k=0}^{M-1}h(k)x(n-k)$$

**Symbols**

- $h(n)$ — impulse-response coefficients, dimensionless
- $H(z)$ — transfer function in $z$
- $z$ — complex frequency variable, dimensionless
- $M$ — number of taps, dimensionless
- $x(n),y(n)$ — input and output samples, in V
- $n,k$ — sample indices, dimensionless

**FIR linear phase and window design ★**

$$\text{symmetric }h(n)\Rightarrow\tau_g=\frac{M-1}{2}T_s\ \text{(s)},\qquad h(n)=h_d(n)w(n),\qquad \Delta f\approx\frac{c}{MT_s}\ \text{(Hz)}$$

**Symbols**

- $h(n)$ — designed impulse response, dimensionless
- $h_d(n)$ — ideal (truncated) response, dimensionless
- $w(n)$ — window function, dimensionless
- $\tau_g$ — group delay, in s
- $T_s$ — sampling interval, in s
- $M$ — number of taps, dimensionless
- $\Delta f$ — transition width, in Hz
- $c$ — window-dependent constant, dimensionless ($\approx0.9$ rectangular, 3.1 Hamming)

**IIR transfer function, stability and bilinear warp ★**

$$H(z)=\frac{\sum_{k=0}^{M}b_kz^{-k}}{1+\sum_{k=1}^{N}a_kz^{-k}},\qquad \text{stable}\iff\lvert p_k\rvert<1,\qquad \omega_a=\frac{2}{T}\tan\frac{\omega_dT}{2}$$

**Symbols**

- $a_k$ — feedback (denominator) coefficients, dimensionless
- $b_k$ — feedforward (numerator) coefficients, dimensionless
- $N$ — filter order (number of poles), dimensionless
- $M$ — number of zeros, dimensionless
- $p_k$ — poles in the $z$-plane, dimensionless
- $\omega_a$ — analog angular frequency, in rad/s
- $\omega_d$ — digital angular frequency, in rad/s
- $T$ — sampling interval, in s

| Property | FIR | IIR |
|---|---|---|
| Stability | always stable (no feedback) | stable iff all poles inside unit circle |
| Phase | exactly linear with symmetric taps | nonlinear unless all-pass equalized |
| Order for same spec | high | low |
| Sensitivity | robust to coefficient quantization | coefficient-sensitive |

**Conditions:** FIR is unconditionally stable with no feedback and needs $M-1$ delay taps; IIR needs far less order but its bilinear map warps frequency, so pre-warp critical frequencies. #filter

---

### 12. IIR Filters

![](https://www.youtube.com/watch?v=5wUfz_vlQRA)

*Video: Butterworth Low-Pass Filter Design — EC Academy, 12:20*

**Transfer function, difference equation and stability ★**

$$H(z)=\frac{\sum_{k=0}^{M}b_kz^{-k}}{1+\sum_{k=1}^{N}a_kz^{-k}},\qquad y(n)=-\sum_{k=1}^{N}a_ky(n-k)+\sum_{k=0}^{M}b_kx(n-k),\qquad \text{stable}\iff\lvert p_k\rvert<1$$

**Symbols**

- $H(z)$ — transfer function in $z$
- $a_k$ — feedback (denominator) coefficients, dimensionless
- $b_k$ — feedforward (numerator) coefficients, dimensionless
- $N$ — filter order (number of poles), dimensionless
- $M$ — number of zeros, dimensionless
- $p_k$ — poles in the $z$-plane, dimensionless
- $x(n),y(n)$ — input and output samples, in V

**Analog prototype mapping ★**

$$s=\frac{2}{T}\frac{1-z^{-1}}{1+z^{-1}}\ \text{(bilinear)},\qquad \omega_a=\frac{2}{T}\tan\frac{\omega_dT}{2},\qquad \omega_d=2\arctan\frac{\omega_aT}{2}$$

**Symbols**

- $s$ — Laplace variable
- $z$ — $z$-transform variable
- $T$ — sampling interval, in s
- $\omega_a$ — analog angular frequency, in rad/s
- $\omega_d$ — digital angular frequency, in rad/s
- $z^{-1}$ — unit delay

**Cost and sensitivity versus FIR**

$$MAC_{IIR}\approx M+N,\qquad MAC_{FIR}\approx N_{FIR}\gg N_{IIR},\qquad \lvert H(e^{j\omega})\rvert\ \text{peaks near the poles}$$

**Symbols**

- $MAC_{IIR}$ — multiply-accumulates per sample, dimensionless
- $M,N$ — zeros and poles of the IIR filter, dimensionless
- $N_{FIR}$ — taps needed by an FIR for the same specification, dimensionless
- $\omega$ — digital angular frequency, in rad/s
- $\lvert H(e^{j\omega})\rvert$ — magnitude response on the unit circle, dimensionless

| Property | IIR | FIR (reference) |
|---|---|---|
| Stability | only if all poles inside unit circle | unconditionally stable |
| Phase | nonlinear unless all-pass equalized | exactly linear with symmetric taps |
| Order for same spec | low | high |
| Sensitivity | coefficient quantization shifts poles | robust |

**Conditions:** few coefficients give a sharp response but quantizing them shifts poles; the bilinear map avoids aliasing yet warps frequency, so pre-warp the critical frequencies. #filter

> [!tip] High-yield ★
> Sampling: alias frequency is $\lvert f-nf_s\rvert$ folded into $0$–$f_N$, and SQNR rises 6.02 dB per added bit.

> [!warning] Exam trap
> Thermal noise power is $kTB$ (available power), not $kT$ — dividing by $B$ gives the density $N_0$. Noise figure is a ratio in dB, never dBm.

> [!tip] High-yield ★
> $F=1+T_e/T_0$ with $T_0=290$ K converts noise figure to noise temperature in one step; cascade $T_e$ divides by preceding gain.

> [!warning] Exam trap
> $T_e$ is not physical temperature. An ideal noiseless amplifier has $F=1$ (0 dB) and $T_e=0$ K, while a passive loss $L$ has $F=L$.

---

→ Back to [[00_Index]]
