---
title: "Signals Spectra and Noise — Drill"
type: drill
area: 01_Signals_Spectra_and_Noise
part: 04_EST
seed: 1
count: 8
pool: 66
updated: 2026-09-23
---

# Signals Spectra and Noise — Practice Drill

**8 problems** drawn from a pool of 66 across 12 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 01_Signals_Spectra_and_Noise --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A signal has components at $1, 3, 5$ and $7\ \mathrm{kHz}$ and is sampled at $8\ \mathrm{kHz}$. Which components survive at their own frequency and which alias onto each other?

**Given:** components 1, 3, 5, 7 kHz; fs = 8 kHz

> [!success]- Answer
> **1 and 3 kHz survive; 5 kHz folds onto 3 kHz and 7 kHz folds onto 1 kHz.**

> [!warning] Trap
> Expecting four distinct lines in the sampled spectrum. Two pairs collapsed; the total energy is conserved but the frequency information is lost.

<sub>from EST-01-08</sub>

### 2. An rms noise voltage of $10\ \mu\mathrm{V}$ is measured across a $10\ \mathrm{k\Omega}$ resistor at $290\ \mathrm{K}$. What bandwidth was the measurement made over?

**Given:** Vn = 10 uV; R = 10 kohm; T = 290 K

> [!success]- Answer
> **B = 625 kHz.**

> [!warning] Trap
> Forming the ratio 1e-10/(4kTR) after forgetting to square Vn, or dividing by 4kTRB with B still in kHz. The density 4kTR is the V^2/Hz quantity; the measurement bandwidth is what is missing.

<sub>from EST-01-03</sub>

### 3. A $4\ \mathrm{MHz}$ signal with $1\ \mathrm{V}$ peak amplitude is sampled by a clock with $20\ \mathrm{ps}$ rms jitter. Find the rms voltage error and the jitter-limited SNR.

**Given:** f = 4 MHz; A = 1 V; dt = 20 ps rms

> [!success]- Answer
> **Error = 0.503 mV rms; jitter-limited SNR = 66.0 dB.**

> [!warning] Trap
> Multiplying the error by the number of bits or comparing it with a 16-bit LSB (15.3 uV at 1 V full scale). Jitter sets an absolute SNR ceiling that no extra bits can beat: 66 dB is worse than a 12-bit converter's ideal 74 dB.

<sub>from EST-01-09</sub>

### 4. For a $60\ \mathrm{dB}$ stopband attenuation with a transition ratio $f_{stop}/f_{pass} = 1.2$, estimate the order needed by (a) a Butterworth IIR and (b) the FIR rule of thumb above with $f_s$ chosen so the normalised transition width is 0.02. Compare.

**Given:** A = 60 dB; fstop/fpass = 1.2; FIR: df/fs = 0.02

> [!success]- Answer
> **Butterworth IIR ≈ 38th order; FIR ≈ 136 taps — about 3.6x more coefficients (and an elliptic IIR would need only a handful).**

> [!warning] Trap
> Assuming the IIR is always cheaper in *every* sense. It is cheaper in multiplies, but it has frequency-dependent group delay, is sensitive to coefficient rounding at 38th order, and must be implemented as cascaded biquads. If linear phase is required, the FIR is the only option.

<sub>from EST-01-12</sub>

### 5. A 4th-order Butterworth anti-alias filter has its 3 dB cutoff at $f_c = 5\ \mathrm{kHz}$. How much attenuation does it provide at $20\ \mathrm{kHz}$, and would that be enough for a 12-bit converter?

**Given:** n = 4; fc = 5 kHz; f = 20 kHz; 12-bit converter

> [!success]- Answer
> **48.2 dB of attenuation at 20 kHz — not enough for 12 bits.**

> [!warning] Trap
> Applying the asymptotic 80 dB/decade rule directly: from 5 kHz to 20 kHz is 0.602 decades, predicting 48.2 dB here, but the asymptote overestimates attenuation when f is only 4x fc. Use the exact Butterworth expression, then round the order up until the requirement is met.

<sub>from EST-01-10</sub>

### 6. A voice channel is band-limited to $4\ \mathrm{kHz}$. Find the Nyquist rate and the Nyquist interval.

**Given:** fm = 4 kHz

> [!success]- Answer
> **fs(min) = 8 kHz; T(max) = 125 us.**

> [!warning] Trap
> Reporting 4 kHz as the minimum sampling rate. The rate must be twice the highest frequency; a 4 kHz sampler would fold everything between 2 and 4 kHz.

<sub>from EST-01-08</sub>

### 7. A diode carries a DC current of $1\ \mathrm{mA}$ and feeds a load through a $10\ \mathrm{kHz}$ bandwidth. Find the rms shot noise current.

**Given:** I0 = 1 mA; B = 10 kHz; q = 1.6e-19 C

> [!success]- Answer
> **In = 1.79 nA rms.**

> [!warning] Trap
> Scaling the answer with temperature or with the diode's series resistance. Shot noise depends only on q, I0 and B; not on T and not on R.

<sub>from EST-01-04</sub>

### 8. A digital audio system runs at $f_s = 44.1\ \mathrm{kHz}$ with a $20\ \mathrm{kHz}$ passband. Find the reconstruction filter's stopband edge and comment on why this transition band is difficult.

**Given:** fs = 44.1 kHz; fp = 20 kHz

> [!success]- Answer
> **Stopband edge = 24.1 kHz; the 1.205 transition ratio needs an impractically high order, which is why oversampling is used.**

> [!warning] Trap
> Assuming the reconstruction filter only needs to pass 0-20 kHz and ignoring the images. Images at fs - fp = 24.1 kHz and above must be suppressed, and the very narrow gap between 20 and 24.1 kHz is what makes the analog part hard.

<sub>from EST-01-10</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| EST-01-01 | Time vs Frequency and Line Spectra | 5 |
| EST-01-02 | Power Spectral Density | 5 |
| EST-01-03 | Thermal and Johnson Noise | 5 |
| EST-01-04 | Shot, Flicker and Transit-Time Noise | 4 |
| EST-01-05 | SNR, Noise Factor and Noise Figure | 9 |
| EST-01-06 | Equivalent Noise Temperature | 5 |
| EST-01-07 | Friis Cascaded Noise Formula | 5 |
| EST-01-08 | Sampling Theorem and Aliasing | 9 |
| EST-01-09 | Sampling Types and Aperture Effect | 5 |
| EST-01-10 | Anti-Aliasing Filters | 4 |
| EST-01-11 | DFT and FFT | 5 |
| EST-01-12 | FIR vs IIR Filters | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
