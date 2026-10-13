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

$c_n$ in V (or A), $T$ in s (period), $f_0$ in Hz, $\omega_0$ in rad/s, $n$ integer. Discrete lines exist only at $nf_0$.

**Trigonometric form, RMS and Parseval ★**

$$x=a_0+\sum_{n\ge1}\bigl(a_n\cos n\omega_0t+b_n\sin n\omega_0t\bigr),\qquad X_{rms}=\sqrt{a_0^2+\sum_{n\ge1}\frac{a_n^2+b_n^2}{2}},\qquad P=\sum_{n}\lvert c_n\rvert^2$$

$a_n,b_n$ in V, $X_{rms}$ in V (RMS), $P$ in W (average power into 1 $\Omega$).

**Pulse-train envelope (sinc)**

$$\lvert c_n\rvert=\frac{2A\tau}{T}\lvert\mathrm{sinc}(n\tau f_0)\rvert,\qquad \mathrm{sinc}\,u=\frac{\sin\pi u}{\pi u},\qquad \text{first null at } f=\frac{1}{\tau}$$

$A$ in V (pulse amplitude), $\tau$ in s (pulse width), $\lvert c_n\rvert$ in V.

**Conditions:** $x(t)$ periodic and finite-power, satisfying Dirichlet conditions (single-valued, finite extrema, finite discontinuities per period). #fourier

---

### 2. Power Spectral Density

![](https://www.youtube.com/watch?v=DoSLMEEo1Y0)

*Video: What Is Power Spectral Density (PSD)? — Iain Explains, 10:19*

**Density and total power ★**

$$S_x(f)=\int_{-\infty}^{\infty}R_x(\tau)e^{-j2\pi f\tau}d\tau,\qquad R_x(\tau)=\int_{-\infty}^{\infty}S_x(f)e^{j2\pi f\tau}df,\qquad P=\int_{-\infty}^{\infty}S_x(f)\,df$$

$S_x(f)$ in W/Hz (two-sided density), $R_x(\tau)$ in W (autocorrelation), $\tau$ in s, $f$ in Hz, $P$ in W.

**One-sided density and discrete lines**

$$S_1(f)=2S_x(f)\ (f\ge0),\qquad P=\int_0^\infty S_1(f)df,\qquad P_{dc}=S_x(0)B,\qquad S_x(f)=\frac{V_{rms}^2}{RB}$$

$S_1(f)$ in W/Hz, $B$ in Hz, $R$ in $\Omega$, $V_{rms}$ in V; white noise has flat $S_x(f)=N_0/2$ in W/Hz.

**Discrete autocorrelation and cross-correlation ★**

$$R_{xx}[k]=\sum_{n=-\infty}^{\infty}x[n]x[n-k],\qquad R_{xy}[k]=R_{yx}[-k]$$

$R_{xx}[k]$ in V² (autocorrelation), $k$ integer (lag, dimensionless), $R_{xy},R_{yx}$ in V²; order matters since $R_{xy}\ne R_{yx}$ in general.

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

$k=1.38\times10^{-23}$ J/K, $T$ in K, $B$ in Hz, $R$ in $\Omega$, $V_n$ in V (RMS), $I_n$ in A (RMS), $P_n$ in W, $N_0$ in W/Hz.

**Standard reference values ★**

| $T$ | $kT$ (J) | $kT$ per Hz |
|---|---|---|
| 290 K (17 °C, standard) | $4.00\times10^{-21}$ | $-174$ dBm/Hz |
| 300 K | $4.14\times10^{-21}$ | $-173.8$ dBm/Hz |

dBm is referenced to 1 mW, dBW to 1 W: $P_{dBm}=10\log_{10}\frac{P}{1\,\mathrm{mW}}$.

**Equivalent noise bandwidth ★**

$$B_n=\frac{\pi}{2}B_{3\text{dB}}\approx1.57\,B_{3\text{dB}}\ \text{(single-tuned)},\qquad B_n=\frac{1}{RC}\ \text{(parallel RLC)}$$

$B_n$ in Hz is the bandwidth of an ideal rectangular filter passing the same total noise power; $B_{3\text{dB}}$ in Hz.

$R$ in $\Omega$, $C$ in F, $P_n$ in W; the receiver noise power is $P_n=kTB_n$.

**Conditions:** Nyquist result for a resistor in thermal equilibrium at uniform $T$; a matched load extracts $kTB$; white while $hf\ll kT$ (below about $10^{12}$ Hz). #noise

---

### 4. Shot, Flicker and Transit-Time Noise

![](https://www.youtube.com/watch?v=VEjw-i1JhrY)

*Video: Shot, Flicker and Johnson Noise Characteristics — PASSIONATE PROFESSOR, 11:35*

**Shot noise ★**

$$I_{sh}=\sqrt{2qI_{dc}B},\qquad P_{sh}=2qI_{dc}BR,\qquad q=1.602\times10^{-19}\ \text{C}$$

$I_{dc}$ in A, $B$ in Hz, $R$ in $\Omega$, $I_{sh}$ in A (RMS), $P_{sh}$ in W.

**Flicker ($1/f$) and transit-time noise**

$$V_f^2=\frac{KI_{dc}}{f^{\alpha}}B,\qquad \alpha\approx1,\qquad f_{ce}=\frac{KI_{dc}}{2q},\qquad f_{tt}\propto\frac{1}{2\pi\tau_t}$$

$K$ in $\mathrm{A\cdot\Omega^2}$, $f$ in Hz, $\alpha$ dimensionless (0.8–1.3), $f_{ce}$ in Hz (corner where flicker = shot), $\tau_t$ in s (transit time).

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

$P_s,P_n,S_i,S_o,N_i,N_o$ in W, $V_s,V_n$ in V (RMS), $F$ dimensionless (linear power ratio).

**dB forms — always state the reference ★**

$$NF_{dB}=10\log_{10}F,\qquad F=1+\frac{T_e}{T_0},\qquad T_0=290\ \text{K},\qquad F_{loss}=L$$

$NF_{dB}$ in dB (a dimensionless ratio, not dBm); $T_e$ in K; $L\ge1$ dimensionless loss factor, so a passive attenuator's $F$ equals its loss.

**Noise figure of a lossy (passive) block**

$$NF_{dB}=10\log_{10}L,\qquad T_{loss}=T_0(L-1)\ \text{(K)}$$

**Friis cascade in noise-factor form ★**

$$F=F_1+\frac{F_2-1}{G_1}+\frac{F_3-1}{G_1G_2}+\cdots$$

$F_i$ dimensionless (noise factor of stage $i$), $G_i$ dimensionless (available power gain of stage $i$).

The first stage dominates because each later term is divided by the preceding available gains.

**Conditions:** matched source held at $T_0=290$ K and narrowband (spot) measurement; $F\ge1$ always, hence $NF_{dB}\ge0$ dB. #noise

---

### 6. Equivalent Noise Temperature

![](https://www.youtube.com/watch?v=DPywBl-3Aew)

*Video: Noise Temperature: Definition, Formula and Units — Engineering Funda, 4:58*

**Linear conversion ★**

$$T_e=(F-1)T_0,\qquad F=1+\frac{T_e}{T_0},\qquad T_0=290\ \text{K}\ (17\ ^\circ\text{C})$$

$T_e$ in K, $F$ dimensionless, $T_0$ in K.

**System temperature and noise power**

$$T_{sys}=T_a+T_e,\qquad N=kT_{sys}B,\qquad N_{dBm}=10\log_{10}\frac{kT_{sys}B}{1\ \text{mW}}$$

$T_a$ in K (antenna noise temperature), $T_{sys}$ in K, $N$ in W or dBm (referenced to 1 mW), $B$ in Hz, $k=1.38\times10^{-23}$ J/K.

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

$f_s$ in Hz, $f_{max}$ in Hz (highest baseband component), $T_s$ in s, $f_N$ in Hz (Nyquist/folding frequency); $f_s>2f_{max}$ leaves a guard band.

**Aliased frequency and sampled spectrum ★**

$$f_a=\lvert f-nf_s\rvert\ \text{for the } n \text{ giving } 0\le f_a\le f_N,\qquad X_s(f)=f_s\sum_{n=-\infty}^{\infty}X(f-nf_s)$$

$f$ in Hz (true frequency), $f_a$ in Hz (observed/alias frequency), $X_s(f)$ in V/Hz, $n$ integer.

**Ideal reconstruction and resolution floor**

$$x(t)=\sum_n x(nT_s)\,\mathrm{sinc}\Bigl(\frac{t-nT_s}{T_s}\Bigr),\qquad \mathrm{SQNR}_{ideal}=6.02N_q+1.76\ \text{dB}$$

$x(nT_s)$ in V (samples), $N_q$ dimensionless (bits), SQNR in dB.

**Conditions:** $x(t)$ strictly band-limited to $f_{max}$; any component above $f_N$ folds to $f_s-f$ and is unrecoverable afterwards. #sampling

---

### 8. Sampling Types and Aperture Effect

![](https://www.youtube.com/watch?v=sFiCgEVpTWs)

*Video: Ideal, Natural and Flat-Top Sampling (Aperture Effect) — Electronics Subjectified, 5:45*

**Ideal vs flat-top sampling ★**

$$x_n=x(nT_s)\ \text{(ideal)},\qquad X_{ft}(f)=\bigl[X(f)H_a(f)\bigr]*f_s\!\!\sum_n\delta(f-nf_s)$$

$x_n$ in V, $H_a(f)$ dimensionless, $f_s$ in Hz, $*$ convolution; natural sampling multiplies $x(t)$ by the pulse train instead.

**Aperture (hold) response and first null ★**

$$H_a(f)=\tau\,\mathrm{sinc}(f\tau)e^{-j\pi f\tau},\qquad \lvert H_a(f)\rvert=\tau\lvert\mathrm{sinc}(f\tau)\rvert,\qquad \text{null at } f=\frac{1}{\tau}$$

$\tau$ in s (aperture/hold time), $\mathrm{sinc}\,u=\frac{\sin\pi u}{\pi u}$ with $u=f\tau$ dimensionless.

**Aperture error, cutoff and droop**

$$\Delta V\le\frac{dV}{dt}\Bigr\rvert_{max}\tau,\qquad f_{-3dB}\approx\frac{0.443}{\tau},\qquad \text{droop}=\frac{\Delta V}{V}$$

$dV/dt$ in V/s, $\Delta V$ in V, $f_{-3dB}$ in Hz, droop dimensionless.

**Conditions:** flat-top sampling distorts by $\mathrm{sinc}(f\tau)$ — equalize with an inverse-sinc filter or shrink $\tau$; require $f_s\tau\ll1$. #sampling

---

### 9. Anti-Aliasing Filters

**Butterworth magnitude and minimum order ★**

$$\lvert H(f)\rvert^2=\frac{1}{1+\bigl(\frac{f}{f_c}\bigr)^{2n}},\qquad n\ge\frac{\log_{10}\bigl(10^{A_s/10}-1\bigr)}{2\log_{10}\bigl(\frac{f_s-f_{max}}{f_{max}}\bigr)},\qquad f_c\ge f_{max}$$

$f_c$ in Hz (cutoff), $f$ in Hz, $n$ integer (order), $A_s$ in dB (stopband attenuation required at $f_s-f_{max}$), $\lvert H(f)\rvert$ dimensionless.

**Chebyshev and Bessel responses**

$$\lvert H(f)\rvert^2=\frac{1}{1+\epsilon^2T_n^2\!\bigl(\frac{f}{f_c}\bigr)}\ \text{(type I)},\qquad \epsilon^2=10^{A_p/10}-1,\qquad \tau_g\approx\text{flat (Bessel)}$$

$\epsilon$ dimensionless (ripple factor), $T_n$ = $n$-th order Chebyshev polynomial, $A_p$ in dB (passband ripple), $\tau_g$ in s (group delay).

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

$x(n)$ in V (samples), $X(k)$ in V, $N$ dimensionless (points), $n,k=0,1,\dots,N-1$.

**Bin spacing, record length and resolution ★**

$$\Delta f=\frac{f_s}{N}=\frac{1}{T_0},\qquad T_0=NT_s,\qquad f_{bin}=k\Delta f,\qquad \frac{k}{N}=\frac{f}{f_s}$$

$\Delta f$ in Hz (bin spacing), $T_0$ in s (record length), $f_s$ in Hz; resolution is set by $T_0$, not by $N$ alone.

**FFT cost, windows and leakage**

$$C_{DFT}=N^2,\qquad C_{FFT}=\frac{N}{2}\log_2N\ \text{complex MACs},\qquad \text{speedup}=\frac{2N}{\log_2N}$$

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

$h(n)$ dimensionless coefficients, $z$ dimensionless (complex frequency variable), $M$ dimensionless (taps), $x,y$ in V (samples), $n$ dimensionless (sample index).

**FIR linear phase and window design ★**

$$\text{symmetric }h(n)\Rightarrow\tau_g=\frac{M-1}{2}T_s\ \text{(s)},\qquad h(n)=h_d(n)w(n),\qquad \Delta f\approx\frac{c}{MT_s}\ \text{(Hz)}$$

$\phi$ in rad, $\omega$ in rad/s, $\tau_g$ in s, $T_s$ in s, $h_d(n),w(n)$ dimensionless (ideal response, window), $\Delta f$ in Hz, $c$ dimensionless ($\approx0.9$ rectangular, 3.1 Hamming).

**IIR transfer function, stability and bilinear warp ★**

$$H(z)=\frac{\sum_{k=0}^{M}b_kz^{-k}}{1+\sum_{k=1}^{N}a_kz^{-k}},\qquad \text{stable}\iff\lvert p_k\rvert<1,\qquad \omega_a=\frac{2}{T}\tan\frac{\omega_dT}{2}$$

$a_k,b_k$ dimensionless coefficients, $N$ dimensionless (poles), $M$ dimensionless (zeros), $p_k$ dimensionless (poles), $\omega_a$ in rad/s (analog), $\omega_d$ in rad/s (digital), $T$ in s.

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

$a_k,b_k$ dimensionless coefficients, $N$ dimensionless (poles), $M$ dimensionless (zeros), $x,y$ in V (samples), $p_k$ dimensionless (poles in the $z$-plane).

**Analog prototype mapping ★**

$$s=\frac{2}{T}\frac{1-z^{-1}}{1+z^{-1}}\ \text{(bilinear)},\qquad \omega_a=\frac{2}{T}\tan\frac{\omega_dT}{2},\qquad \omega_d=2\arctan\frac{\omega_aT}{2}$$

$\omega_a$ in rad/s (analog), $\omega_d$ in rad/s (digital), $T$ in s; the warp squeezes the infinite analog axis into $0\le\omega_d\le\pi/T$.

**Cost and sensitivity versus FIR**

$$MAC_{IIR}\approx M+N,\qquad MAC_{FIR}\approx N_{FIR}\gg N_{IIR},\qquad \lvert H(e^{j\omega})\rvert\ \text{peaks near the poles}$$

$MAC$ dimensionless (multiply-accumulates per sample), $N_{FIR}$ dimensionless (taps needed for the same spec), $\omega$ in rad/s.

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
