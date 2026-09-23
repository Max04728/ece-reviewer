---
id: EST-01-02
title: "Power Spectral Density"
part: "04_EST"
area: "01_Signals_Spectra_and_Noise"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Time_vs_Frequency_and_Line_Spectra]]"]
tags: ["ece", "est", "signals_spectra_and_noise"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Power Spectral Density

> [!abstract] Scope
> Use power spectral density to compute the noise or signal power that actually lands in a given bandwidth, including the two-sided versus one-sided factor of 2.

## Core Concept

> [!tip] Intuition
> A line spectrum works for signals that repeat; noise never repeats, so instead of spikes we get a continuous distribution of power across frequency. The PSD is that distribution's height — power per hertz — so the power you collect is the area under the curve over your bandwidth, not the height itself.

**PSD is a density, so it always needs a bandwidth.** The power spectral density $S_x(f)$ (or $G_x(f)$ for the one-sided version) says how much average power sits in each hertz, with units of $\mathrm{W/Hz}$ (equivalently $\mathrm{V^2/Hz}$ for a voltage density). A statement like 'the noise density is $4\ \mathrm{pW/Hz}$' is not yet a power. The power is $P = \int_B S_x(f)\,df$, which for a flat density collapses to the multiply-by-bandwidth rule $P = \mathrm{PSD}\times B$. This is why receiver noise power is always quoted together with a bandwidth: $-174\ \mathrm{dBm/Hz}$ is a density, $-114\ \mathrm{dBm}$ is the power you actually get in a $1\ \mathrm{MHz}$ channel.

**Two-sided versus one-sided, the perpetual factor of 2.** The mathematically natural PSD is two-sided: it includes negative frequencies and is even in $f$. Instrumentation and datasheets use the one-sided PSD defined only for $f \ge 0$, which folds the negative-frequency half onto the positive axis. For white noise the two-sided height is $N_0/2$ and the one-sided height is $N_0$; the total power in a band $B$ is $P = N_0 B$ either way. Both conventions are correct, so the exam can hand you either one. If the density you are given is $N_0/2$ and you integrate it from $0$ to $\infty$, you must double it or you lose exactly half the power (a 3 dB error).

**Where PSDs come from: the Wiener-Khinchin theorem.** For a stationary random process the PSD is the Fourier transform of the autocorrelation function, $S_x(f) = \int R_x(\tau)e^{-j2\pi f\tau}d\tau$. This formalises the intuition that a signal that is 'uncorrelated with itself except at zero lag' is flat in frequency: white noise has $R_x(\tau) = \frac{N_0}{2}\delta(\tau)$, whose transform is a constant. It also explains why filtering reshapes a PSD by $|H(f)|^{2}$: the filter squares the magnitude response because power, not amplitude, is being transmitted.

**Signals, not just noise.** A periodic signal has a 'line PSD' made of Dirac impulses, $S(f) = \sum_n |c_n|^{2}\delta(f - nf_0)$, which is the bridge back to the line-spectrum picture of [[01_Time_vs_Frequency_and_Line_Spectra]]. A finite-energy (non-periodic) pulse does not have a PSD in $\mathrm{W/Hz}$ at all — it has an energy spectral density in $\mathrm{J/Hz}$, the squared magnitude of its Fourier transform. Same shape, different units and a different normalisation; naming the wrong one is a favourite distractor.

**When the white model fails.** 'White' means the density is constant at all frequencies, which would imply infinite total power. Real noise is white only over a band of interest: thermal noise rolls off in the quantum regime near $kT/h$ (about $6\ \mathrm{THz}$ at $290\ \mathrm{K}$), and most devices show a $1/f$ rise at low frequencies. Treating a $1/f$ region as white over a wide band badly overestimates the low-frequency noise power, which is why the corner frequency matters in low-frequency amplifier design.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Power from a spectral density | $P = \int_{B} S_x(f)\, df$ | The fundamental rule. Units are W if S is in W/Hz and B in Hz; a density alone is not a power. |
| Flat (white) density over a band | $P = (\mathrm{PSD}) \times B$ | Valid only while the density is constant across B. Otherwise integrate piecewise. |
| Wiener-Khinchin theorem | $S_x(f) = \int_{-\infty}^{\infty} R_x(\tau) e^{-j 2\pi f \tau}\, d\tau$ | Relates PSD to autocorrelation for a stationary process; inverse transform gives R from S. |
| Two-sided white noise density | $S_n(f) = \frac{N_0}{2}, \quad -\infty < f < \infty$ | The theoretical convention. Integrating this from -inf to +inf over B gives N0 B. |
| One-sided white noise density | $S_n^{+}(f) = N_0 = 2\left(\frac{N_0}{2}\right), \quad f \ge 0$ | Instrument/datasheet convention. Dropping the factor 2 between the two forms halves or doubles the computed power. |
| Noise power in bandwidth B | $P_n = N_0 B$ | B is the noise bandwidth in Hz. Centre frequency is irrelevant for white noise. |
| Line PSD of a periodic signal | $S(f) = \sum_{n=-\infty}^{\infty} \lvert c_n \rvert^{2} \delta(f - n f_0)$ | Impulses, not a continuous curve. Total power from Parseval = sum of impulse strengths. |
| Resistor thermal voltage density | $S_v(f) = 4 k T R \quad \mathrm{V^2/Hz}$ | One-sided, white. Multiply by B and take the square root to get the rms noise voltage. |
| Filtering a density | $S_{out}(f) = \lvert H(f) \rvert^{2} S_{in}(f)$ | Magnitude squared, because PSD carries power. Equivalent noise bandwidth of the filter replaces B. |
| dBm/Hz to W/Hz | $S\,(\mathrm{W/Hz}) = 10^{\,S(\mathrm{dBm/Hz})/10} \times 10^{-3}$ | The 1e-3 converts mW to W. -174 dBm/Hz becomes 3.98e-21 W/Hz. |

## Worked Problems

### P1. White noise has a two-sided PSD of $10^{-20}\ \mathrm{W/Hz}$. Find the one-sided density $N_0$ and the noise power in a $1\ \mathrm{MHz}$ bandwidth.

**Given:** two-sided PSD = 1e-20 W/Hz; B = 1 MHz

**Solution:**

1. One-sided density N0 = 2 x (1e-20) = 2e-20 W/Hz
2. P = N0 B = (2e-20)(1e6)
3. = 2e-14 W = 20 fW

> [!success]- Answer
> **N0 = 2e-20 W/Hz; P = 2e-14 W (20 fW).**

> [!warning] Trap
> Using the two-sided height 1e-20 directly as N0 and getting 10 fW — exactly half. Whenever the problem says 'two-sided', double it before multiplying by B.

### P2. A $10\ \mathrm{k\Omega}$ resistor at $290\ \mathrm{K}$ feeds a receiver of bandwidth $20\ \mathrm{kHz}$. Find the rms open-circuit noise voltage, its voltage PSD, and the available noise power.

**Given:** R = 10 kohm; T = 290 K; B = 20 kHz

**Solution:**

1. Voltage density Sv = 4kTR = 4(1.38e-23)(290)(1e4) = 1.6008e-16 V^2/Hz
2. Vn = sqrt(Sv B) = sqrt(1.6008e-16 x 2e4) = sqrt(3.2016e-12)
3. Vn = 1.789e-6 V = 1.79 uV rms
4. Available power Pn = kTB = (1.38e-23)(290)(2e4) = 8.00e-17 W
5. Check: Vn^2/(4R) = 3.2016e-12/(4e4) = 8.004e-17 W

> [!success]- Answer
> **Sv = 1.60e-16 V^2/Hz, Vn = 1.79 uV rms, Pn = 8.00e-17 W (80 aW).**

> [!warning] Trap
> Computing the delivered power as Vn^2/R = 3.2e-16 W. The open-circuit EMF delivers only Vn^2/(4R) into a matched load, so Vn^2/R is 4 times too large.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4×k×290×1E4` with $k$ = `SHIFT` `CVALUE` `25` → **1.6016E-16** V²/Hz = $S_v$; store with `SHIFT` `STO` `A`.
> 2. `√(A×2E4)` → **1.790E-6** V = **1.79** µV rms open-circuit.
> 3. `k×290×2E4` → **8.008E-17** W = **80** aW available; the $V_n^2/(4R)$ check `1.790E-6²÷4E4` → **8.008E-17** W agrees.
>
> `SHIFT` `CVALUE` 25 is $k = 1.380649\times10^{-23}$; the note's rounded $1.38\times10^{-23}$ gives 8.00e-17 W — the same 80 aW.

### P3. A spectrum analyzer quotes a noise floor of $-174\ \mathrm{dBm/Hz}$ at $290\ \mathrm{K}$. Express this as a one-sided density in W/Hz and as a two-sided density, then find the noise power in a $100\ \mathrm{kHz}$ bandwidth.

**Given:** floor = -174 dBm/Hz; B = 100 kHz

**Solution:**

1. Convert: S = 10^(-174/10) mW/Hz = 10^(-17.4) mW/Hz = 3.98e-18 mW/Hz
2. In watts: 3.98e-18 x 1e-3 = 3.98e-21 W/Hz (this is the one-sided N0)
3. Two-sided height = N0/2 = 1.99e-21 W/Hz
4. P = N0 B = (3.98e-21)(1e5) = 3.98e-16 W
5. In dBm: -174 + 10 log10(1e5) = -174 + 50 = -124 dBm

> [!success]- Answer
> **N0 = 3.98e-21 W/Hz one-sided (1.99e-21 two-sided); P = 3.98e-16 W = -124 dBm.**

> [!warning] Trap
> Adding 10 log10(B) to -174 dBm/Hz and forgetting that the quoted figure is a density. Also: a 100 kHz bandwidth adds 50 dB, not 100 dB — the rule is 10 log10 of the bandwidth ratio, not 20 log10.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(-174÷10) : Ans×1E-3 : Ans÷2` → **3.981E-18** mW/Hz → **3.981E-21** W/Hz (one-sided $N_0$) → **1.991E-21** W/Hz (two-sided).
> 2. `3.981E-21×1E5` → $P$ = **3.981E-16** W.
> 3. `-174+10log(1E5)` → **-124** dBm.
>
> `log` is base 10 and `10^x` is `SHIFT` `log`; the `×1E-3` is the mW→W step, so missing it leaves every power 1000x low.

### P4. A periodic waveform has $c_0 = 2\ \mathrm{V}$ and $|c_1| = 1.871\ \mathrm{V}$, with all higher harmonics negligible. Write its PSD as impulses and compute the total average power across $1\ \Omega$.

**Given:** c0 = 2 V; |c1| = 1.871 V; all other cn negligible

**Solution:**

1. Line PSD: impulses of strength |c0|^2 = 4 V^2 at f = 0, and |c1|^2 = 3.50 V^2 at f = +/- f0
2. Parseval: P = c0^2 + 2|c1|^2
3. = 4 + 2(3.50) = 11.0 W

> [!success]- Answer
> **S(f) = 4 delta(f) + 3.50 delta(f - f0) + 3.50 delta(f + f0); P = 11.0 W.**

> [!warning] Trap
> Forgetting the negative-frequency impulse, which contributes the second 3.50 W. Using |c1| once gives 7.5 W instead of 11.0 W.

### P5. A $1/f$ (flicker) noise density is $20\ \mathrm{nV^2/Hz}$ at $1\ \mathrm{kHz}$, falling as $1/f$. Find the noise power contributed between $10\ \mathrm{Hz}$ and $1\ \mathrm{kHz}$ and compare it with what a flat $20\ \mathrm{nV^2/Hz}$ density would predict.

**Given:** Sv(1 kHz) = 20 nV^2/Hz; Sv proportional to 1/f; band = 10 Hz to 1 kHz

**Solution:**

1. Write Sv(f) = K/f with K = Sv(1 kHz) x 1 kHz = (20e-18)(1000) = 2e-14 V^2
2. Integrate: P = integral of K/f df from 10 to 1000 = K ln(1000/10) = K ln(100)
3. ln(100) = 4.605, so P = (2e-14)(4.605) = 9.21e-14 V^2
4. Flat-density estimate: Sv x B = (20e-18)(990) = 1.98e-14 V^2
5. The 1/f result is 4.65 times larger (6.7 dB)

> [!success]- Answer
> **P = 9.21e-14 V^2 for the true 1/f density versus 1.98e-14 V^2 for a flat approximation — a 6.7 dB underestimate.**

> [!warning] Trap
> Multiplying a 1/f density at the top of the band by the bandwidth. A density quoted at one frequency only equals a power after it is integrated; over a decade the 1/f integral is K ln(10) per decade, not K times the bandwidth.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20E-18×1000` → **2E-14** V² = $K$ in $S_v = K/f$; store it with `SHIFT` `STO` `A`.
> 2. `A×ln(100)` → **9.210E-14** V² from 10 Hz to 1 kHz; the `∫dx` route, integrating `A÷x` from 10 to 1000, gives the same.
> 3. `20E-18×990` → **1.980E-14** V² for a flat density; `10log(9.210E-14÷Ans)` → **6.68** dB underestimate.
>
> `ln`, not `log`: one decade of $1/f$ contributes $K\ln 10 = 2.303K$, not $K$ times the bandwidth.

## Traps & Exam Notes

- **Quoting or using a density as if it were a power.** PSD is W/Hz; every answer needs a multiplication by B (or an integral). A PSD quoted without a bandwidth describes a measurement setup, not a signal.
- **The two-sided to one-sided factor of 2.** $N_0/2$ over $-\infty<f<\infty$ and $N_0$ over $0\le f<\infty$ describe the same noise. Mixing them costs exactly 3 dB — the commonest single error in receiver noise problems.
- **Adding PSDs instead of combining voltages.** Uncorrelated noise *powers* add, so densities add; rms voltages add in quadrature, $V = \sqrt{V_1^2+V_2^2}$, which is only $\sqrt{2}\,V_1$ for two equal sources, not $2V_1$.
- **Assuming noise is white where it is not.** Below the $1/f$ corner the density is not flat, so $\mathrm{PSD}\times B$ underestimates the power; the integral gives the extra factor of $\ln(f_2/f_1)$.
- **Confusing PSD (W/Hz) with ESD (J/Hz).** Random and periodic signals carry spectral *power* density; a single finite-energy pulse carries spectral *energy* density. The two differ by a factor of time, and their units are the giveaway.
- **Believing the centre frequency changes white-noise power.** For a flat density the power is $N_0B$ whether the channel sits at 1 MHz or 1 GHz. Only the bandwidth and the density matter — until the density stops being flat.

## See Also

- [[01_Time_vs_Frequency_and_Line_Spectra]]
- [[03_Thermal_and_Johnson_Noise]]
- [[05_SNR,_Noise_Factor_and_Noise_Figure]]
- [[11_DFT_and_FFT]]

---

[[01_Time_vs_Frequency_and_Line_Spectra|⬅ 01]] · [[_MOC_Signals_Spectra_and_Noise|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Thermal_and_Johnson_Noise|03 ➡]]
