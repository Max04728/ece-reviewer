---
title: Digital Communications
part: EST
tags: [ece, est, formula-sheet]
topics: 16
---

# Digital Communications

## Part A — Pulse Modulation and PCM

### 1. Pulse Modulation: PAM, PWM, PPM

![](https://www.youtube.com/watch?v=BWEhihKVgYs)

*Video: Pulse Modulation: PAM, PWM and PPM — khalid subhi, 21:55*

**PAM, PWM and PPM definitions ★**

$$v_{PAM}(t)=\sum_n m(nT_s)\,\mathrm{rect}\Bigl(\frac{t-nT_s}{\tau}\Bigr),\qquad \text{PWM: } \tau_n=\tau_0+k_pm(nT_s),\qquad \text{PPM: } \Delta t_n=k_pm(nT_s)$$

$m(nT_s)$ in V (sample), $T_s$ in s (sampling interval), $\tau$ in s (pulse width), $k_p$ in s/V, $\Delta t_n$ in s (pulse position shift).

**Bandwidth and SNR comparison**

$$BW_{PAM}\approx\frac{1}{2\tau}\ \text{(Hz)},\qquad BW_{PWM}\approx\frac{1}{2\tau_{min}}\ \text{(Hz)},\qquad SNR_{PPM}\approx SNR_{PWM}\cdot\frac{BW_{PWM}}{BW_{PPM}}$$

$\tau_{min}$ in s (narrowest pulse), $BW$ in Hz, SNR dimensionless (power ratio).

| Scheme | Information in | Bandwidth | Noise immunity |
|---|---|---|---|
| PAM | pulse amplitude | lowest | poor (amplitude noise) |
| PWM | pulse width/duty | medium | good (limiter-friendly) |
| PPM | pulse position | highest | best ($\approx$ PWM + BW trade) |

**Conditions:** sampling obeys $f_s\ge2f_{max}$; PAM is the only scheme that is not constant-envelope, so it is the most noise-sensitive. #pcm

---

### 2. PCM: Sampling, Quantizing, Encoding

![](https://www.youtube.com/watch?v=g3eG3nJxOp4)

*Video: PCM: Sampling, Quantization and Encoding — Technically Explained, 7:22*

**PCM chain and bit rate ★**

$$R_b=f_s\cdot n\ \text{(bit/s)},\qquad n=\log_2L\ \text{(bits/sample)},\qquad R_s=\frac{R_b}{n}=f_s\ \text{(baud)},\qquad L=2^n$$

$f_s$ in Hz (sampling rate), $n$ dimensionless (bits per sample), $L$ dimensionless (quantization levels), $R_b$ in bit/s, $R_s$ in symbols/s (baud).

**Signal-to-quantization-noise and dynamic range ★**

$$\Delta=\frac{V_{pp}}{L}=\frac{2V_m}{2^n},\qquad \mathrm{SQNR}_{max}=1.76+6.02n\ \text{dB},\qquad DR=6.02n\ \text{dB}$$

$\Delta$ in V (step size), $V_{pp}$ in V (peak-to-peak full scale), $V_m$ in V (peak), $\mathrm{SQNR}$ in dB, $DR$ in dB.

**Bandwidth and companding-free assumptions**

$$BW_{PCM}=\frac{1}{2}R_b\ \text{(Hz, polar NRZ)},\qquad T_b=\frac{1}{R_b}\ \text{(s)},\qquad f_s\ge2f_{max}$$

**Symbols**

- NRZ — non-return-to-zero line code, in which the signal level is held for the whole bit interval with no return to zero between bits (a code label, not a quantity; dimensionless)

$T_b$ in s (bit duration), $BW$ in Hz; standard voice PCM is 8 kHz sampling with 8 bits, giving 64 kbit/s.

**Conditions:** uniform (linear) quantizer, full-scale sinusoid input, $f_s\ge2f_{max}$; the 6 dB per bit rule and the 1.76 dB offset both require that full-scale condition. #pcm

---

### 3. Quantization Noise and SQNR

![](https://www.youtube.com/watch?v=3jZC-6U1Ygo)

*Video: Quantization Noise and SQNR — Engineering Funda, 18:57*

**Quantization error and noise power ★**

$$e_q=x_q-x,\qquad \lvert e_q\rvert\le\frac{\Delta}{2},\qquad N_q=\frac{\Delta^2}{12}\ \text{(W)},\qquad \Delta=\frac{2V_m}{L}$$

$e_q$ in V (error), $\Delta$ in V, $N_q$ in W, $V_m$ in V, $L$ dimensionless; the flat-error assumption gives uniform error density.

**SQNR for uniform quantizer ★**

$$\mathrm{SQNR}=\frac{P_s}{N_q}=\frac{3L^2P_s}{V_m^2},\qquad \mathrm{SQNR}_{dB}=10\log_{10}\Bigl(\frac{3L^2P_s}{V_m^2}\Bigr)=4.77+20\log_{10}L+10\log_{10}\frac{P_s}{V_m^2}$$

$P_s$ in W (signal power), $V_m$ in V, $L$ dimensionless, SQNR in dB.

| Input | SQNR (dB) | Rule |
|---|---|---|
| Full-scale sinusoid | $1.76+6.02n$ | classic PCM result |
| Full-scale sawtooth/triangle | $6.02n$ | 1.76 dB lower |
| Any signal, small vs full scale | $-20\log_{10}\frac{V_m}{V_{rms}}$ | 6 dB per halving of level |

**Conditions:** uniform quantizer with $\Delta$ much smaller than signal excursions and no overload (no clipping); below full scale SQNR falls 6 dB per halving of signal amplitude. #pcm #noise

---

### 4. Companding: Mu-Law and A-Law

![](https://www.youtube.com/watch?v=ByMoziFuKVI)

*Video: μ-Law Companding in Non-Uniform Quantization — Engineering Funda, 10:41*

**$\mu$-law (North America, Japan) — $\mu=255$ ★**

$$y=\frac{\mathrm{sgn}(x)\ln(1+\mu\lvert x\rvert)}{\ln(1+\mu)}$$

**A-law (Europe, ITU-T) — $A=87.6$ ★**

$$y=\frac{\mathrm{sgn}(x)\bigl(1+\ln(A\lvert x\rvert)\bigr)}{1+\ln A}$$

$x$ dimensionless (normalized input, $\lvert x\rvert\le1$), $y$ dimensionless (compressed output), $\mu$ and $A$ dimensionless compression parameters.

**Quantization SNR with companding**

$$\mathrm{SQNR}_{\mu\text{-law}}\approx6.02n+4.77-20\log_{10}\bigl[\ln(1+\mu)\bigr]\ \text{dB}$$

$$\mathrm{SQNR}_{A\text{-law}}\approx6.02n+4.77-20\log_{10}(1+\ln A)\ \text{dB}$$

$n$ dimensionless (bits/sample), SQNR in dB; for small inputs companding raises SNR well above uniform quantization.

| Segment | Input range | Step behavior |
|---|---|---|
| $\mu$-law, 8 bit | 15 chords × 16 steps | logarithmic; smallest step $\Delta/2^{7}$ |
| A-law, 8 bit | 13 segments | 2 segments linear, 11 logarithmic |
| Uniform PCM | full range | constant $\Delta$ |

**Conditions:** companding raises small-signal SNR at the cost of slightly lower peak SNR; $\mu=255$ with 8 bits is the G.711 voice standard (64 kbit/s). #pcm

---

### 5. Delta Modulation and ADM

![](https://www.youtube.com/watch?v=LOI3ZsM9soQ)

*Video: Delta Modulation and Adaptive Delta Modulation — Engineering Made Easy, 13:13*

**DM step, slope overload and granular noise ★**

$$\text{DM output: } \hat{x}(n)=\hat{x}(n-1)\pm\Delta,\qquad \text{step condition: } \frac{dx}{dt}\Bigr\rvert_{max}\le\frac{\Delta}{T_s}=2\pi f_mA_m$$

$T_s$ in s (sampling interval), $\Delta$ in V (step size), $f_m$ in Hz (highest modulating frequency), $A_m$ in V (amplitude), $\hat{x}(n)$ in V (reconstructed sample).

**SQNR and adaptive step**

$$\mathrm{SQNR}_{DM}=\frac{3f_s^3}{8\pi^2f_m^2f_b}\ \text{(dimensionless)},\qquad \Delta_{ADM}(n)=\Delta(n-1)\cdot K^{\pm1},\qquad \text{slope overload}\Rightarrow\Delta\uparrow$$

$f_s$ in Hz, $f_m$ in Hz, $f_b$ in Hz (baseband bandwidth), $K$ dimensionless ($\approx1.5$), $\Delta$ in V.

**Comparison with PCM**

| Property | DM | ADM | PCM |
|---|---|---|---|
| Bits/sample | 1 | 1 + overhead | $n$ |
| Overload limit | slope of $x(t)$ | adaptive slope | amplitude (clip) |
| Granular noise | when slope small | reduced | quantization noise |
| Typical rate (voice) | 32–56 kbit/s | 16–32 kbit/s | 64 kbit/s |

**Conditions:** DM needs $f_s$ well above the Nyquist rate (typically 8–16×$f_{max}$); slope overload comes from too-small $\Delta$ and granular noise from too-large $\Delta$. #pcm #delta

---

### 6. Line Coding Schemes

![](https://www.youtube.com/watch?v=daf9F9NC7zQ)

*Video: Line Coding: RZ, NRZ, Unipolar, Polar, Bipolar and Manchester — Engineering Funda, 12:54*

**Common line codes ★**

$$\text{NRZ-L: } +V\Rightarrow1,\ -V\Rightarrow0$$

$$\text{NRZ-I: transition}\Rightarrow1,\ \text{no transition}\Rightarrow0$$

$$\text{Manchester: } s(t)=\pm V\ \text{with a guaranteed mid-bit transition}$$

$$B8ZS:\ 00000000\Rightarrow000VB0VB,\qquad HDB3:\ 0000\Rightarrow000V\ \text{or}\ B00V$$

$V$ in V (voltage level), bit interval $T_b$ in s; $V$ and $B$ are violation and bipolar pulses (bipolar with 8-zero/4-zero substitution for synchronization).

**Bandwidth, DC and efficiency**

$$BW_{NRZ}=\frac{R_b}{2}\ \text{(Hz)},\qquad BW_{RZ}=R_b\ \text{(Hz)},\qquad BW_{Manchester}=R_b\ \text{(Hz)},\qquad BW_{AMI}\approx\frac{R_b}{2}$$

**Symbols**

- RZ — return-to-zero line code, in which the pulse returns to zero for part of every bit interval (a code label, not a quantity; dimensionless)
- AMI — alternate mark inversion (bipolar) line code, which sends each 1 as a pulse of alternating polarity and each 0 as no pulse (a code label, not a quantity; dimensionless)
- 2B1Q — two-binary-one-quaternary line code, which maps each pair of bits onto one of four signal levels (a code label, not a quantity; dimensionless)

$R_b$ in bit/s, $BW$ in Hz; Manchester and RZ are self-clocking (guaranteed transitions), NRZ-L and NRZ-I are not.

| Code | DC component | Self-clocking | Notes |
|---|---|---|---|
| NRZ-L | high (long runs) | no | simplest, poor sync |
| NRZ-I | low | no | differential, tolerates inversion |
| Polar RZ | none | yes | 2× bandwidth |
| Manchester | none | yes | IEEE 802.3 Ethernet baseband |
| AMI | none | no (long zero runs) | needs B8ZS/HDB3 scramble |
| 2B1Q | low | partially | 2 bits per symbol, ISDN U-interface |

**Conditions:** ${R_b}$ in bit/s equals $R_s\log_2M$ for $M$-ary codes; scrambling (B8ZS for T1, HDB3 for E1) restores timing on long zero runs. #linecoding

---

### 7. Inter-Symbol Interference and Nyquist Criterion

![](https://www.youtube.com/watch?v=sgyTlI9BsKc)

*Video: Avoiding ISI: The Nyquist Zero-ISI Theorem — Iain Explains, 17:42*

**Nyquist zero-ISI criterion ★**

$$\sum_k H\Bigl(f+\frac{k}{T_s}\Bigr)=T_s\quad\forall f,\qquad h(nT_s)=\begin{cases}1,&n=0\\0,&n\ne0\end{cases},\qquad R_s=\frac{1}{T_s}\le2B$$

$H(f)$ dimensionless (channel response), $T_s$ in s (symbol interval), $R_s$ in baud, $B$ in Hz; binary Nyquist minimum is $R_s=2B$.

**Raised cosine and roll-off ★**

$$H_{RC}(f)=\begin{cases}T_s,&\lvert f\rvert\le\frac{1-\alpha}{2T_s}\\[1pt]
\frac{T_s}{2}\Bigl[1+\cos\Bigl(\frac{\pi T_s}{\alpha}\bigl(\lvert f\rvert-\frac{1-\alpha}{2T_s}\bigr)\Bigr)\Bigr],&\frac{1-\alpha}{2T_s}<\lvert f\rvert\le\frac{1+\alpha}{2T_s}\\[1pt]
0,&\lvert f\rvert>\frac{1+\alpha}{2T_s}\end{cases}$$

$$BW=\frac{R_s}{2}(1+\alpha)\ \text{(Hz)}$$

$\alpha$ dimensionless (roll-off factor, $0\le\alpha\le1$), $BW$ in Hz, $R_s$ in baud; $\alpha=0$ is the ideal sinc (infinite delay), $\alpha=1$ is the full raised cosine.

**Eye diagram and jitter**

$$\text{eye width}=\frac{1}{R_s}-2j_{pp},\qquad \text{eye height}=2(A_{min}-V_{noise}),\qquad \text{ISI penalty}\approx20\log_{10}\Bigl(1+\frac{\alpha}{2}\Bigr)$$

$j_{pp}$ in s (peak-to-peak jitter), $A_{min}$ in V, $V_{noise}$ in V, eye width in s, eye height in V.

**Conditions:** Nyquist applies to a flat (distortionless) channel with linear phase; in practice a raised-cosine filter split equally between TX and RX achieves zero ISI at sampling instants. #isi

---

### 8. Eye Diagrams and Equalization

![](https://www.youtube.com/watch?v=tZiKRfH2yZ4)

*Video: What Is an Eye Diagram? — Texas Instruments, 14:29*

**Eye mask metrics and SNR penalty**

$$E_{open}=A_{top}-A_{bottom}\ \text{(V)},\qquad E_{width}=\frac{1}{R_s}-\Delta j\ \text{(s)},\qquad Q=\frac{A_{top}-A_{bottom}}{2(\sigma_{top}+\sigma_{bottom})}$$

$A$ in V (logic levels), $\sigma$ in V (RMS noise per level), $Q$ dimensionless (quality factor), $E_{open}$ in V, $E_{width}$ in s.

**Equalizers and zero-forcing solution ★**

$$H_{eq}(f)=\frac{1}{H_c(f)}\ \text{(zero forcing)},\qquad MSE=E\Bigl[\bigl(y_n-\hat{a}_n\bigr)^2\Bigr],\qquad \text{DFE: } y_n=\sum_ic_ir_{n-i}-\sum_jd_j\hat{a}_{n-j}$$

**Symbols**

- MSE — mean squared error between the equalizer output and the transmitted symbol, in V²
- ZF — zero-forcing equalizer, which inverts the channel with $H_{eq}(f)=1/H_c(f)$ to null amplitude and delay distortion (dimensionless)
- MMSE — minimum mean squared error equalizer, which minimizes the MSE in the presence of noise (dimensionless)
- DFE — decision-feedback equalizer, which cancels post-cursor ISI with a feedback filter driven by past symbol decisions (dimensionless)
- LMS — least mean squares algorithm, which updates the tap weights once per symbol to track a time-varying channel (dimensionless)

$H_c(f)$ dimensionless (channel response), $c_i,d_j$ dimensionless (tap weights), $y_n,\hat{a}_n,r_n$ in V, MSE in V².

| Equalizer | Structure | Best for |
|---|---|---|
| Transversal (ZF) | FIR, $1/H_c$ | mild, known channel |
| MMSE | FIR, minimizes MSE | noisy channels |
| DFE | feedback cancels post-cursor | severe ISI |
| Adaptive (LMS) | taps updated per symbol | time-varying channel |

**Conditions:** equalizers compensate amplitude and delay distortion only; they cannot recover a signal once noise closes the eye, and DFE feedback makes error propagation possible. #isi

---

## Part B — Bandpass Digital Modulation

### 9. ASK, OOK and FSK

![](https://www.youtube.com/watch?v=qGwUOvErR8Q)

*Video: Digital Modulation: ASK, FSK and PSK — Sunny Classroom, 5:30*

**ASK/OOK and FSK waveforms ★**

$$v_{ASK}(t)=A_cm(t)\cos\omega_ct,\qquad m(t)\in\{0,1\},\qquad v_{FSK}(t)=A_c\cos\Bigl[2\pi\Bigl(f_c\pm\frac{\Delta f}{2}\Bigr)t\Bigr]$$

$A_c$ in V, $m(t)$ dimensionless (binary data), $f_c$ in Hz, $\Delta f$ in Hz (FSK tone spacing), $v(t)$ in V.

**Bandwidth and BER**

$$BW_{ASK}=BW_{OOK}=2R_b\ \text{(Hz)},\qquad BW_{FSK}\approx2(\Delta f+R_b)\ \text{(Hz)},\qquad P_e=\frac{1}{2}e^{-E_b/(4N_0)}$$

**Symbols**

- AWGN — additive white Gaussian noise channel model, with flat two-sided noise density $N_0/2$ and Gaussian amplitude statistics (a channel label, not a quantity; dimensionless)
- $Q(\cdot)$ — Gaussian tail (complementary error) function, $Q(u)=\frac{1}{\sqrt{2\pi}}\int_u^{\infty}e^{-x^2/2}dx$, dimensionless

$R_b$ in bit/s, $E_b$ in J (energy per bit), $N_0$ in W/Hz, $P_e$ dimensionless; coherent ASK is $Q(\sqrt{E_b/N_0})$ and coherent FSK is $Q(\sqrt{E_b/N_0})$ as well.

| Scheme | Coherent $P_e$ | Noncoherent $P_e$ | BW (Hz) |
|---|---|---|---|
| OOK/ASK | $Q(\sqrt{E_b/N_0})$ | $\frac12e^{-E_b/(4N_0)}$ | $2R_b$ |
| BFSK | $Q(\sqrt{E_b/N_0})$ | $\frac12e^{-E_b/(2N_0)}$ | $2(\Delta f+R_b)$ |
| Optimum BFSK $\Delta f=R_b$ | $Q(\sqrt{E_b/N_0})$ | $\frac12e^{-E_b/(2N_0)}$ | $4R_b$ |

**Conditions:** AWGN channel, matched filtering, equally likely bits; noncoherent detection costs about 1 dB (BFSK) to 3 dB (ASK) relative to coherent. #ask #fsk

---

### 10. BPSK and QPSK

![](https://www.youtube.com/watch?v=O3-L9tvTvGg)

*Video: BPSK and QPSK Waveforms — Engineering Made Easy, 11:02*

**BPSK signal and BER ★**

$$s(t)=A_c\cos\bigl(\omega_ct+\pi(1-m(t))\bigr)=A_c(2m(t)-1)\cos\omega_ct,\qquad P_e=Q\Bigl(\sqrt{\frac{2E_b}{N_0}}\Bigr)$$

$A_c$ in V, $m(t)\in\{0,1\}$ dimensionless, $E_b$ in J, $N_0$ in W/Hz, $P_e$ dimensionless; BPSK carries 1 bit/symbol.

**QPSK and OQPSK ★**

$$s_{QPSK}(t)=\frac{A_c}{\sqrt2}\bigl[I(t)\cos\omega_ct-Q(t)\sin\omega_ct\bigr],\qquad P_e=Q\Bigl(\sqrt{\frac{2E_b}{N_0}}\Bigr),\qquad R_s=\frac{R_b}{2}$$

**Symbols**

- AWGN — additive white Gaussian noise channel model, with flat two-sided noise density $N_0/2$ and Gaussian amplitude statistics (a channel label, not a quantity; dimensionless)
- $Q(\cdot)$ — Gaussian tail (complementary error) function, $Q(u)=\frac{1}{\sqrt{2\pi}}\int_u^{\infty}e^{-x^2/2}dx$, dimensionless

$I,Q\in\{+1,-1\}$ dimensionless, $A_c$ in V, $R_s$ in baud, $R_b$ in bit/s; OQPSK offsets the Q channel by $T_b$ to cap phase jumps at 90° (no zero-crossing).

**Constellation and spectral efficiency**

| Scheme | Bits/symbol | $E_b/N_0$ for $P_e=10^{-5}$ | BW efficiency (bit/s/Hz) |
|---|---|---|---|
| BPSK | 1 | $\approx9.6$ dB | 1 |
| QPSK | 2 | $\approx9.6$ dB | 2 |
| OQPSK | 2 | $\approx9.6$ dB | 2 |
| 8-PSK | 3 | $\approx13$ dB | 3 |

**Conditions:** AWGN, coherent detection; QPSK and BPSK need the same $E_b/N_0$ for equal $P_e$ because QPSK sends two orthogonal BPSK streams. #psk

---

### 11. M-ary PSK and 16-QAM

![](https://www.youtube.com/watch?v=IbUflaeJcU8)

*Video: QAM (M-ary) Modulation Explained — RF elements, 3:10*

**M-ary PSK and QAM ★**

$$s_k(t)=A_c\cos\Bigl(\omega_ct+\frac{2\pi k}{M}\Bigr),\ k=0,\dots,M-1,\qquad d_{min,PSK}=2A_c\sin\frac{\pi}{M}$$

$$s_{QAM}(t)=A_i\cos\omega_ct+B_j\sin\omega_ct,\qquad A_i,B_j\in\{\pm1,\pm3\}\ \text{for 16-QAM},\qquad d_{min,QAM}=\frac{2A_c}{\sqrt{10}}$$

$M$ dimensionless (constellation size), $A_c$ in V, $d_{min}$ in V (minimum distance), $k$ integer; M-PSK is constant envelope, QAM is not.

**BER approximations and spectral efficiency ★**

$$P_{e,MPSK}\approx\frac{2}{\log_2M}Q\Bigl(\sqrt{\frac{2E_b\log_2M}{N_0}}\sin\frac{\pi}{M}\Bigr),\qquad P_{e,16QAM}\approx\frac{3}{4}Q\Bigl(\sqrt{\frac{4E_b}{5N_0}}\Bigr)$$

**Symbols**

- AWGN — additive white Gaussian noise channel model, with flat two-sided noise density $N_0/2$ and Gaussian amplitude statistics (a channel label, not a quantity; dimensionless)
- $Q(\cdot)$ — Gaussian tail (complementary error) function, $Q(u)=\frac{1}{\sqrt{2\pi}}\int_u^{\infty}e^{-x^2/2}dx$, dimensionless

$E_b$ in J, $N_0$ in W/Hz, $M$ dimensionless, $P_e$ dimensionless.

| Scheme | Bits/symbol | $d_{min}$ (norm.) | $E_b/N_0$ @ $P_e=10^{-5}$ |
|---|---|---|---|
| 8-PSK | 3 | 0.765 | $\approx13$ dB |
| 16-PSK | 4 | 0.390 | $\approx18$ dB |
| 16-QAM | 4 | 0.632 | $\approx13.4$ dB |
| 64-QAM | 6 | 0.309 | $\approx18.5$ dB |

**Conditions:** AWGN with Gray-coded symbols so adjacent constellation points differ by one bit; QAM beats M-PSK for $M\ge16$ because it packs points in two dimensions. #qam #psk

---

### 12. Constellation and BER Comparison

![](https://www.youtube.com/watch?v=8e4Sf6rL3zk)

*Video: Visualising ASK, FSK, BPSK, DPSK, QPSK and QAM Constellations — Iain Explains, 10:54*

**Distance, energy and union bound ★**

$$d_{min}=\min_{i\ne j}\lVert s_i-s_j\rVert,\qquad P_e\le\sum_{i\ne j}Q\Bigl(\frac{d_{ij}}{\sqrt{2N_0}}\Bigr),\qquad E_s=E_b\log_2M$$

**Symbols**

- AWGN — additive white Gaussian noise channel model, with flat two-sided noise density $N_0/2$ and Gaussian amplitude statistics (a channel label, not a quantity; dimensionless)
- $Q(\cdot)$ — Gaussian tail (complementary error) function, $Q(u)=\frac{1}{\sqrt{2\pi}}\int_u^{\infty}e^{-x^2/2}dx$, dimensionless

$s_i$ in V (constellation points), $d_{min}$ in V, $N_0$ in W/Hz, $E_s$ in J (energy per symbol), $E_b$ in J, $M$ dimensionless.

**Gray coding and symbol error**

$$P_{b}\approx\frac{P_s}{\log_2M}\ \text{(Gray)},\qquad P_s\approx N_{nearest}Q\Bigl(\frac{d_{min}}{\sqrt{2N_0}}\Bigr),\qquad \eta=\frac{R_b}{BW}\ \text{(bit/s/Hz)}$$

$P_b,P_s$ dimensionless, $N_{nearest}$ dimensionless (number of nearest neighbors), $\eta$ in bit/s/Hz.

| Modulation | Bits/sym | $N_{nearest}$ | Relative $E_b/N_0$ @ $10^{-5}$ | Typical use |
|---|---|---|---|---|
| BPSK/QPSK | 1 / 2 | 1 / 2 | 0 dB (reference) | satellite, WLAN 1–2 |
| 8-PSK | 3 | 2 | $+3.5$ dB | satellite, Bluetooth EDR |
| 16-QAM | 4 | 3 | $+3.8$ dB | WLAN 802.11a/g |
| 64-QAM | 6 | 3 | $+8.5$ dB | WLAN, DVB-C, LTE |
| 256-QAM | 8 | 3 | $+13.5$ dB | DVB-C2, LTE-A, DOCSIS |

**Conditions:** AWGN with Gray mapping; every added bit/symbol costs roughly 3–4 dB in $E_b/N_0$ at high SNR, which is the bandwidth-versus-power trade every link budget makes. #qam

---

### 13. Matched Filter and Optimum Detection

![](https://www.youtube.com/watch?v=Ci-EjiMJo3I)

*Video: What Is a Matched Filter? — Iain Explains, 10:07*

**Matched filter impulse response and output SNR ★**

$$h(t)=s(T-t),\qquad H(f)=S^*(f)e^{-j2\pi fT},\qquad \Bigl(\frac{S}{N}\Bigr)_{max}=\frac{2E}{N_0}=\frac{E_b}{N_0/2}$$

$s(t)$ in V (known pulse), $T$ in s (sampling instant), $E$ in J (pulse energy), $N_0$ in W/Hz, SNR dimensionless; the matched filter maximizes output SNR at $t=T$.

**Correlation receiver and error probability**

$$y(T)=\int_0^Ts(t)r(t)dt,\qquad P_e=Q\Bigl(\frac{d}{2\sigma}\Bigr)=Q\Bigl(\sqrt{\frac{E_d}{2N_0}}\Bigr),\qquad \sigma^2=\frac{N_0}{2}\int\lvert h\rvert^2dt$$

**Symbols**

- AWGN — additive white Gaussian noise channel model, with flat two-sided noise density $N_0/2$ and Gaussian amplitude statistics (a channel label, not a quantity; dimensionless)
- $Q(\cdot)$ — Gaussian tail (complementary error) function, $Q(u)=\frac{1}{\sqrt{2\pi}}\int_u^{\infty}e^{-x^2/2}dx$, dimensionless
- MAP — maximum a posteriori detector, which decides the symbol with the largest posterior probability given the observation (dimensionless)
- ML — maximum likelihood detector, which decides the symbol whose likelihood is largest under the assumed noise model (dimensionless)

$r(t)$ in V (received signal + noise), $d$ in V (distance between signals), $\sigma$ in V, $E_d$ in J (distance energy), $P_e$ dimensionless.

| Detector | Rule | Note |
|---|---|---|
| Matched filter | convolve with $s(T-t)$ | maximum SNR, optimal in AWGN |
| Correlator | multiply and integrate | mathematically equivalent to matched filter |
| Integrate-and-dump | integrate over $T_b$ | rectangular pulses only |
| Threshold (MAP) | compare to $\frac{s_1+s_2}{2}$ | for equal priors |

**Conditions:** additive white Gaussian noise with a known signal shape; the matched filter is optimal for SNR but a MAP/ML detector is optimal for error probability. #isi

---

### 14. Information Theory and Entropy

![](https://www.youtube.com/watch?v=R4OlXb9aTvQ)

*Video: Shannon's Information Entropy — Art of the Problem, 7:05*

**Entropy, joint and conditional entropy ★**

$$H(X)=-\sum_ip_i\log_2p_i\ \text{(bits/symbol)},\qquad H(X,Y)=H(X)+H(Y\lvert X),\qquad I(X;Y)=H(X)-H(X\lvert Y)$$

$p_i$ dimensionless (symbol probability), $H$ in bits/symbol, $I$ in bits/symbol (mutual information).

**Source coding and efficiency ★**

$$L_{avg}=\sum_ip_il_i\ \text{(bits/symbol)},\qquad H(X)\le L_{avg}<H(X)+1,\qquad \eta=\frac{H(X)}{L_{avg}},\qquad CR=\frac{n}{L_{avg}}$$

$l_i$ dimensionless (codeword length), $L_{avg}$ in bits/symbol, $\eta$ dimensionless (efficiency), $CR$ and $n$ dimensionless.

| Concept | Formula | Meaning |
|---|---|---|
| Entropy | $H=-\sum p_i\log_2p_i$ | average self-information |
| Mutual information | $I(X;Y)=H(X)-H(X\lvert Y)$ | bits gained about $X$ from $Y$ |
| Channel capacity | $C=\max_{p(x)}I(X;Y)$ | maximum reliable rate |
| Redundancy | $R=1-\eta$ | wasted bits |

**Conditions:** discrete memoryless source with independent symbols; entropy is maximized when all $p_i$ are equal ($H_{max}=\log_2M$ bits/symbol). #shannon

---

### 15. Shannon-Hartley Capacity

![](https://www.youtube.com/watch?v=3ekWsXeZ8TM)

*Video: Channel Capacity by Shannon-Hartley — Engineering Funda, 10:23*

**Shannon-Hartley capacity ★**

$$C=B\log_2\Bigl(1+\frac{S}{N}\Bigr)\ \text{(bit/s)},\qquad C=B\log_2\Bigl(1+\frac{E_bR_b}{N_0B}\Bigr),\qquad \lim_{B\to\infty}C=\frac{S}{N_0}\log_2e\approx1.44\frac{S}{N_0}$$

$C$ in bit/s, $B$ in Hz (channel bandwidth), $S$ in W (signal power), $N$ in W (noise power), $S/N$ dimensionless, $N_0$ in W/Hz.

**Spectral efficiency and Shannon limit ★**

$$\eta=\frac{C}{B}=\log_2\Bigl(1+\frac{S}{N}\Bigr)\ \text{(bit/s/Hz)},\qquad \frac{E_b}{N_0}\ge\frac{2^\eta-1}{\eta},\qquad \Bigl(\frac{E_b}{N_0}\Bigr)_{min}=-1.59\ \text{dB}$$

$\eta$ in bit/s/Hz, $E_b$ in J, $N_0$ in W/Hz; the $-1.59$ dB limit is approached as $\eta\to0$ (infinite bandwidth).

| $\eta$ (bit/s/Hz) | Min $E_b/N_0$ (dB) | Min SNR (dB) |
|---|---|---|
| 0.5 | $-0.8$ | $-3.8$ |
| 1 | 0 | 0 |
| 2 | 1.8 | 4.8 |
| 4 | 5.7 | 11.8 |
| 8 | 15.0 | 24.1 |

**Hartley's law (noiseless channel) ★**

$$C=2B\log_2M\ \text{(bit/s)}$$

$C$ in bit/s, $B$ in Hz (bandwidth), $M$ dimensionless (number of signalling levels).

Hartley is noise-free and depends on the signal alphabet; Shannon is noise-limited and depends on $S/N$.

**Conditions:** band-limited AWGN channel, arbitrarily long codewords and ideal coding; capacity is an upper bound that practical codes approach within a few dB (turbo/LDPC). #shannon

> [!tip] High-yield ★
> Capacity rises linearly with $B$ but only logarithmically with $S/N$ — so if the exam asks for the cheapest way to raise $C$ at low SNR, the answer is more bandwidth, not more power.

---

### 16. Error Control: Hamming and CRC

![](https://www.youtube.com/watch?v=1A_NcXxdoCc)

*Video: Hamming Code: Error Detection — Neso Academy, 12:20*

**Hamming code and minimum distance ★**

$$n=k+r,\qquad 2^r\ge n+1,\qquad d_{min}=3\ \text{(SEC)},\qquad t=\Bigl\lfloor\frac{d_{min}-1}{2}\Bigr\rfloor,\qquad s=2^r-1$$

$n$ total, $k$ data and $r$ parity bits, $d_{min}$ minimum distance, $t$ correctable errors, $s$ syndromes — all dimensionless.

**Coding gain, redundancy and error detection**

$$R_c=\frac{k}{n}\ \text{(code rate)},\qquad P_{block}\approx1-(1-P_e)^n,\qquad CRC:n-k\ \text{bits},\qquad P_{undetected}\approx2^{-(n-k)}$$

**Symbols**

- CRC — cyclic redundancy check, a polynomial-division error-detecting code that appends $n-k$ check bits (a code label, not a quantity; dimensionless)
- SEC — single-error correcting, the capability of a code whose $d_{min}=3$ (a capability label, dimensionless)
- FCS — frame check sequence, the CRC remainder carried in a frame for error detection (a field label, not a quantity; dimensionless)

$R_c$ dimensionless, $P_e$ dimensionless, $n,k$ dimensionsless, $P_{undetected}$ dimensionless; CRC detects any burst shorter than the generator degree.

| Code | $(n,k)$ | $d_{min}$ | Capability |
|---|---|---|---|
| Hamming (7,4) | 7,4 | 3 | single-error correct |
| Extended Hamming (8,4) | 8,4 | 4 | SEC + double-error detect |
| CRC-16 | $n$,$n-16$ | — | detects bursts $<16$ bits |
| CRC-32 | $n$,$n-32$ | — | Ethernet FCS |

**Conditions:** Hamming bounds assume bit errors are independent; a code with $d_{min}$ corrects $t$ errors and detects $d_{min}-1$ errors, and CRC polynomials must have a nonzero constant term. #hamming #fec

> [!warning] Exam trap
> Hamming encodes $k$ data bits into $n=k+r$ with $2^r\ge n+1$, so (7,4) uses 3 parity bits. Do not confuse $r$ (parity) with $n-k$ in a CRC, where the same expression is the check length but there is no error correction.

> [!warning] Exam trap
> Minimum bandwidth for binary transmission is $R_s=2B$ (Nyquist), and with raised-cosine roll-off it becomes $BW=\frac{R_s}{2}(1+\alpha)$ — roll-off costs bandwidth, never gains it.

> [!tip] High-yield ★
> For PCM, one extra bit buys 6.02 dB of SQNR; for capacity, halving bandwidth costs 3 dB under the square-law SNR trade — keep the two rules apart on the exam.

---

→ Back to [[00_Index]]
