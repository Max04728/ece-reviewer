---
id: EST-02-05
title: "FM and PM Fundamentals"
part: "04_EST"
area: "02_Principles_of_Communications"
topic: 5
tier: 1
depth: full
problem_count: 9
prereqs: ["[[01_AM_Fundamentals_and_Modulation_Index]]", "[[01_Time_vs_Frequency_and_Line_Spectra]]"]
tags: ["ece", "est", "principles_of_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — FM and PM Fundamentals

> [!abstract] Scope
> Set up FM and PM waveforms, compute deviation, modulation index and carrier swing, and use the relationship between the two forms of angle modulation.

## Core Concept

> [!tip] Intuition
> Angle modulation puts the message in the *timing* of the carrier rather than its height. FM speeds the carrier up and slows it down; PM nudges its phase. Because the timing swing is independent of amplitude, the envelope stays constant and the transmitter can run in efficient class C.

**The general angle-modulated signal.** Both FM and PM are special cases of one general form:
$$s(t) = A_c\cos\theta(t) = A_c\cos\left[\omega_c t + \varphi(t)\right]$$
Here $\varphi(t)$ is the *phase deviation*, and the instantaneous frequency is as follows:
$$f_i(t) = \dfrac{1}{2\pi}\dfrac{d\theta}{dt} = f_c + \dfrac{1}{2\pi}\dfrac{d\varphi}{dt}$$
The amplitude $A_c$ is constant regardless of the message, which is the defining feature of angle modulation: the information lives entirely in the zero crossings, and no information is carried in the envelope.

**FM and PM differ only in where the message enters.** In FM the message drives the instantaneous *frequency*, with deviation sensitivity $k_f$ in $\mathrm{Hz/V}$:
$$f_i(t) = f_c + k_f m(t)$$
Integrating the message gives the phase:
$$\varphi(t) = 2\pi k_f\int_0^t m(\tau)d\tau$$
Since the message drives the *phase* directly in PM:
$$\varphi(t) = k_p m(t)$$
Differentiating the message gives the frequency:
$$f_i(t) = f_c + \dfrac{k_p}{2\pi}\dfrac{dm}{dt}$$
$k_p$ has units of $\mathrm{rad/V}$. The two are related by a calculus operation and nothing else: **FM with a message is PM with its integral, and PM with a message is FM with its derivative.** That is why an FM transmitter can be built from a phase modulator preceded by an integrator, and why textbooks treat them together.

**The single-tone case, where the indices live.** For $m(t) = A_m\cos\omega_m t$, FM gives this:
$$s(t) = A_c\cos\left(\omega_c t + \beta\sin\omega_m t\right)$$
Its **modulation index** is defined as:
$$\beta = \dfrac{k_f A_m}{f_m} = \dfrac{\Delta f}{f_m}$$
Here $\Delta f = k_f A_m$ is the **peak frequency deviation**. PM gives this:
$$s(t) = A_c\cos\left(\omega_c t + m_p\cos\omega_m t\right)$$
With $m_p = k_p A_m$ radians, its equivalent peak deviation is $\Delta f = m_p f_m$. Both indices equal the peak phase deviation in radians (for FM, $\beta$ is literally the peak of the $\sin$ term), and both are dimensionless. For FM the deviation depends only on the message *amplitude*; for PM the deviation grows in proportion to message *frequency* as well.

**The distinction that exam questions exploit.** Feed the same tone through an FM and a PM transmitter at two different message frequencies and the difference is stark. FM holds $\Delta f$ constant, so $\beta = \Delta f/f_m$ falls as the tone rises: at a low tone the index is large (wideband) and at a high tone it is small (narrowband). PM holds the index constant, so $\Delta f = m_p f_m$ *rises* with the tone. Consequently FM's bandwidth is roughly constant for a constant-amplitude message while PM's bandwidth grows with the derivative of the message. This is why FM is the practical choice for high-fidelity audio and why a phase modulator used for FM must be preceded by an integrator to correct the frequency response.

**Deviation, swing and percent modulation.** The **carrier swing** is twice the peak deviation, $2\Delta f$: the instantaneous carrier frequency travels from $f_c-\Delta f$ to $f_c+\Delta f$, so at $\Delta f = 75\ \mathrm{kHz}$ (FM broadcast) the carrier swings over a $150\ \mathrm{kHz}$ range. Commercial FM limits the peak deviation to $75\ \mathrm{kHz}$ and the highest audio frequency to $15\ \mathrm{kHz}$, giving a maximum **deviation ratio** of:
$$D = \Delta f_{max}/f_{m(max)} = 75/15 = 5$$
The percent modulation is the same ratio in percent:
$$\Delta f_{actual}/\Delta f_{max}\times100$$
In practice a $60\ \mathrm{kHz}$ deviation is 80 percent modulation. Exceeding the limit causes adjacent-channel interference, so broadcast FM transmitters include a deviation limiter (clipper) and a lowpass filter ahead of the modulator.

**Constant envelope and the amplifier consequence.** Since $|s(t)| = A_c$ for all $t$, an angle-modulated signal can be amplified by a **nonlinear class C** stage without distorting the information, at efficiencies approaching 70 percent or more. Linear modulation (AM, DSB, SSB) requires class A or AB linear amplification because any amplitude nonlinearity shows up directly as distortion. This is the single biggest practical advantage of FM for high-power transmitters: not noise performance alone, but the ability to run the final amplifier in a regime that AM cannot use. The price is bandwidth — an angle-modulated signal occupies far more spectrum than the message, as the Bessel analysis in [[06_FM_Sidebands_and_Bessel_Functions]] shows.

**Where each form is used and what breaks.** FM is used for broadcast (88–108 MHz), two-way land mobile, satellite links and audio subcarriers, always with a limiter and a discriminator that converts frequency excursions to amplitude. PM is found where phase coherence matters (PSK-derived digital schemes, some telemetry) and inside indirect FM transmitters. Both are vulnerable to *phase* errors in the receiver's local oscillator, and both require care with deviation limits. Neither carries any amplitude information, so an AM envelope detector or an amplitude-derived AGC cannot recover or track an FM message — an FM receiver needs a limiter, a discriminator and — because the carrier may vanish at some modulation instants — either a high-index signal or a separate path to keep the local oscillator locked.

## Derivation

**FM from the angle-modulated definition.** Let $f_i(t) = f_c + k_f m(t)$ with $m(t) = A_m\cos\omega_m t$. The phase is the integral of the instantaneous frequency: $\theta(t) = 2\pi\int_0^t f_i(\tau)d\tau = \omega_c t + 2\pi k_f\int_0^t A_m\cos\omega_m\tau\,d\tau = \omega_c t + \frac{2\pi k_f A_m}{\omega_m}\sin\omega_m t$. Identifying the peak phase term gives $\beta = \dfrac{2\pi k_f A_m}{2\pi f_m} = \dfrac{k_f A_m}{f_m} = \dfrac{\Delta f}{f_m}$, so the FM signal is $s(t) = A_c\cos(\omega_c t + \beta\sin\omega_m t)$.

**PM and its equivalent deviation.** For PM, $\theta(t) = \omega_c t + k_p m(t) = \omega_c t + m_p\cos\omega_m t$ with $m_p = k_p A_m$ radians, so $s(t) = A_c\cos(\omega_c t + m_p\cos\omega_m t)$. Differentiating to get the instantaneous frequency, $f_i(t) = f_c + \frac{1}{2\pi}\frac{d\varphi}{dt} = f_c - m_p f_m\sin\omega_m t$, whose peak magnitude is $m_p f_m$. Hence the equivalent peak deviation of a PM signal with a single tone is $\Delta f = m_p f_m$, which grows linearly with the modulating frequency.

**The duality between FM and PM.** Compare the two phase functions: FM gives $\varphi(t) = 2\pi k_f\int m\,dt$ while PM gives $\varphi(t) = k_p m(t)$. Setting the PM message equal to the integral of the FM message makes the two phases identical, so an FM signal with message $m(t)$ *is* a PM signal with message $\int m\,dt$; conversely a PM signal with message $m(t)$ is an FM signal with message $dm/dt$. This is the standard route to an indirect FM transmitter: a crystal-controlled oscillator is phase-modulated by the *integrated* audio, which gives a stable carrier frequency with the correct FM deviation-versus-frequency behaviour.

**Percent modulation and carrier swing.** Define the peak deviation $\Delta f = k_f A_m$ and the maximum permitted deviation $\Delta f_{max}$. Percent modulation is the ratio $100\,\Delta f/\Delta f_{max}$, exactly analogous to the AM index. The instantaneous carrier frequency ranges over $[f_c-\Delta f, f_c+\Delta f]$, so the **carrier swing** — the total frequency excursion — is $2\Delta f$. For a tone that reaches full deviation at $75\ \mathrm{kHz}$ the carrier sweeps 150 kHz, and the required transmission bandwidth follows from Carson's rule, $BW = 2(\Delta f + f_m)$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| General angle-modulated signal | $s(t) = A_c\cos\left[\omega_c t + \varphi(t)\right]$ | Constant envelope; no amplitude information. Applies to both FM and PM. |
| Instantaneous frequency | $f_i(t) = f_c + \frac{1}{2\pi}\frac{d\varphi}{dt}$ | The message appears in the derivative of the phase. |
| FM instantaneous frequency | $f_i(t) = f_c + k_f\, m(t)$ | kf in Hz/V. The message drives frequency directly. |
| FM phase deviation | $\varphi(t) = 2\pi k_f \int_0^{t} m(\tau)\, d\tau$ | The integral is why FM is PM of the integrated message. |
| PM phase deviation | $\varphi(t) = k_p\, m(t), \qquad f_i(t) = f_c + \frac{k_p}{2\pi}\frac{dm}{dt}$ | kp in rad/V. PM's deviation grows with the message's slope. |
| Single-tone FM signal | $s(t) = A_c\cos\left(\omega_c t + \beta\sin\omega_m t\right), \quad \beta = \frac{\Delta f}{f_m}$ | beta is also the peak phase deviation in radians. Dimensionless. |
| Single-tone PM signal | $s(t) = A_c\cos\left(\omega_c t + m_p\cos\omega_m t\right), \quad m_p = k_p A_m$ | mp in radians; the equivalent deviation is mp fm. |
| Peak frequency deviation | $\Delta f = k_f A_m \ \mathrm{(FM)}, \qquad \Delta f = m_p f_m \ \mathrm{(PM,\ tone)}$ | FM: independent of fm. PM: proportional to fm. |
| Carrier swing | $\mathrm{swing} = 2\Delta f$ | Total excursion from fc - df to fc + df; 150 kHz at the 75 kHz broadcast limit. |
| Percent modulation | $\% = 100\,\frac{\Delta f}{\Delta f_{max}}$ | Analogous to the AM index; 60 kHz against a 75 kHz limit is 80 percent. |
| Deviation ratio | $D = \frac{\Delta f_{max}}{f_{m(max)}}$ | 5 for FM broadcast (75 kHz / 15 kHz); 2.5 for TV sound. Sets the maximum index. |
| Bandwidth (Carson, preview) | $BW = 2(\Delta f + f_m) = 2f_m(1+\beta)$ | Full treatment in Carson's rule; NBFM gives 2fm, WBFM gives about 2 df. |
| FM/PM duality | $\mathrm{FM}[m] = \mathrm{PM}\!\left[\int m\,dt\right], \qquad \mathrm{PM}[m] = \mathrm{FM}\!\left[\frac{dm}{dt}\right]$ | The basis of indirect FM transmitters using an integrator plus phase modulator. |
| Amplifier class | $\mathrm{constant\ envelope} \Rightarrow \mathrm{class\ C\ possible\ (high\ efficiency)}$ | Linear modulation needs class A/AB. FM's practical advantage at high power. |

## Worked Problems

### P1. An FM modulator has a deviation sensitivity of $5\ \mathrm{kHz/V}$ and is driven by a $3\ \mathrm{V}$ peak, $1\ \mathrm{kHz}$ tone. Find the peak deviation and the modulation index.

**Given:** kf = 5 kHz/V; Am = 3 V; fm = 1 kHz

**Solution:**

1. Peak deviation: df = kf Am = (5 kHz/V)(3 V) = 15 kHz
2. Modulation index: beta = df/fm = 15/1 = 15
3. The signal is wideband (beta >> 1), so its bandwidth will be close to 2 df = 30 kHz

> [!success]- Answer
> **df = 15 kHz; beta = 15.**

> [!warning] Trap
> Using the RMS value of the message instead of its peak. Deviation is defined for the peak message amplitude, so a 3 V peak gives 15 kHz even if the tone is stated as 2.12 V rms.

### P2. An FM signal has a modulation index of $5$ and a peak deviation of $20\ \mathrm{kHz}$. Find the modulating frequency and the carrier swing.

**Given:** beta = 5; df = 20 kHz

**Solution:**

1. beta = df/fm, so fm = df/beta = 20/5 = 4 kHz
2. Carrier swing = 2 df = 40 kHz
3. The carrier moves from fc - 20 kHz to fc + 20 kHz

> [!success]- Answer
> **fm = 4 kHz; carrier swing = 40 kHz.**

> [!warning] Trap
> Reporting the carrier swing as 20 kHz. The deviation is the one-sided excursion; the swing is twice it. Also note beta is the ratio df/fm, so fm = df/beta, not beta/df.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20÷5 : 2×20`
> 2. `=` down the chain: $f_m$ = **4** kHz → carrier swing **40** kHz, running $f_c-20$ to $f_c+20$ kHz.
>
> The swing is TWICE the deviation (`2×20` = **40** kHz), and $f_m = \Delta f/\beta$, not $\beta/\Delta f$ — both traps sit here.

### P3. A $2\ \mathrm{rad/V}$ phase modulator is driven by a $1.5\ \mathrm{V}$ peak tone at $2\ \mathrm{kHz}$. Find the phase deviation, the equivalent peak frequency deviation and the carrier swing.

**Given:** kp = 2 rad/V; Am = 1.5 V; fm = 2 kHz

**Solution:**

1. Phase deviation: mp = kp Am = 2(1.5) = 3 rad
2. Equivalent peak deviation: df = mp fm = 3 x 2 kHz = 6 kHz
3. Carrier swing = 2 df = 12 kHz

> [!success]- Answer
> **mp = 3 rad; df = 6 kHz; swing = 12 kHz.**

> [!warning] Trap
> Treating kp as a frequency sensitivity and answering df = 3 kHz. For PM the phase deviation is kp Am (radians) and the frequency deviation is that times fm.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×1.5 : Ans×2 : Ans×2`
> 2. `=` down the chain: $m_p$ = **3** rad → $\Delta f$ = **6** kHz → swing = **12** kHz.
>
> $k_p$ is rad/V, so `2×1.5` = **3** rad is a PHASE; the deviation needs the extra `×f_m` — `3×2` = **6** kHz.

### P4. The same FM transmitter is limited to a peak deviation of $75\ \mathrm{kHz}$ and is currently deviating $60\ \mathrm{kHz}$. Find the percent modulation and the maximum modulating frequency that keeps the deviation ratio at 5.

**Given:** df = 60 kHz; df_max = 75 kHz; D = 5

**Solution:**

1. Percent modulation = 100 x 60/75 = 80 percent
2. Deviation ratio D = df_max/fm(max), so fm(max) = 75/5 = 15 kHz
3. At 15 kHz the index is beta = 75/15 = 5, the maximum for the service

> [!success]- Answer
> **80 percent modulation; fm(max) = 15 kHz (beta_max = 5).**

> [!warning] Trap
> Computing percent modulation as 60/75 of the index rather than of the deviation, or assuming any audio frequency can reach full deviation. Full deviation at a high audio frequency would require an index above the service limit.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100×60÷75 : 75÷5`
> 2. `=` down the chain: percent modulation **80** % → $f_{m(max)}$ = **15** kHz, at which $\beta$ = `75÷15` = **5**.
>
> Percent modulation compares DEVIATIONS (`60÷75`), not indices; and $f_{m(max)}$ comes from $\Delta f_{max}/D$ — **15** kHz.

### P5. An FM broadcast transmitter runs the standard $75\ \mathrm{kHz}$ peak deviation with a $15\ \mathrm{kHz}$ maximum audio frequency. Find the modulation index and the carrier swing.

**Given:** df = 75 kHz; fm = 15 kHz

**Solution:**

1. beta = df/fm = 75/15 = 5
2. Carrier swing = 2(75) = 150 kHz
3. This is the maximum index (deviation ratio) for FM broadcast

> [!success]- Answer
> **beta = 5; carrier swing = 150 kHz.**

> [!warning] Trap
> Using beta = 15 or the swing as 75 kHz. The index uses the *highest* audio frequency for the worst case and the swing is twice the deviation.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `75÷15 : 2×75`
> 2. `=` down the chain: $\beta$ = **5** → carrier swing **150** kHz, which is the maximum deviation ratio for FM broadcast.
>
> $\beta$ takes the HIGHEST audio frequency for the worst case, and the swing is `2×75` = **150** kHz, not 75 kHz.

### P6. Compare FM and PM for a $1\ \mathrm{V}$ peak tone at $1\ \mathrm{kHz}$ and then at $5\ \mathrm{kHz}$, given $k_f = 2\ \mathrm{kHz/V}$ and $k_p = 2\ \mathrm{rad/V}$.

**Given:** Am = 1 V; kf = 2 kHz/V; kp = 2 rad/V; fm = 1 kHz then 5 kHz

**Solution:**

1. FM: df = kf Am = 2 kHz at BOTH frequencies
2. FM index: beta = 2/1 = 2 at 1 kHz, and 2/5 = 0.4 at 5 kHz
3. PM: mp = kp Am = 2 rad at BOTH frequencies
4. PM deviation: df = mp fm = 2 kHz at 1 kHz, and 10 kHz at 5 kHz
5. So FM's deviation is constant while PM's deviation grows with fm; PM's index is constant while FM's falls with fm

> [!success]- Answer
> **FM: df = 2 kHz always (beta = 2 then 0.4). PM: mp = 2 rad always (df = 2 kHz then 10 kHz).**

> [!warning] Trap
> Assuming both behave the same because they are 'angle modulation'. FM's deviation is set by amplitude alone; PM's deviation is proportional to fm, which is exactly why an indirect FM transmitter needs an audio integrator before the phase modulator.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2÷1 : 2÷5 : 2×1 : 2×5` — with FM $\Delta f$ = `2×1` = **2** kHz throughout and PM $m_p$ = `2×1` = **2** rad throughout.
> 2. `=` down the chain: FM $\beta$ = **2** at 1 kHz → **0.4** at 5 kHz → PM $\Delta f$ = **2** kHz at 1 kHz → **10** kHz at 5 kHz.
>
> FM holds $\Delta f$ and loses index; PM holds the index and gains deviation — `2÷5` = **0.4** against `2×5` = **10** kHz is the whole difference.

### P7. A PM signal has a phase deviation of $2.5\ \mathrm{rad}$ at a modulating frequency of $4\ \mathrm{kHz}$. Find the equivalent peak deviation and estimate the transmission bandwidth with Carson's rule.

**Given:** mp = 2.5 rad; fm = 4 kHz

**Solution:**

1. df = mp fm = 2.5 x 4 = 10 kHz
2. Carson: BW = 2(df + fm) = 2(10 + 4) = 28 kHz
3. Equivalently BW = 2 fm (1 + mp) = 2(4)(3.5) = 28 kHz

> [!success]- Answer
> **df = 10 kHz; BW ≈ 28 kHz.**

> [!warning] Trap
> Reporting BW = 2 df = 20 kHz by treating the phase deviation as a frequency deviation. For a single tone the PM index mp and the FM index beta are numerically equal, so the bandwidth comes out the same either way (28 kHz) — but only if you convert with df = mp fm first. Omit that conversion and every bandwidth featuring PM is wrong.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.5×4 : 2×(Ans+4) : 2×4×(1+2.5)`
> 2. `=` down the chain: $\Delta f$ = **10** kHz → $BW$ = **28** kHz by Carson → **28** kHz again as $2f_m(1+m_p)$.
>
> For PM the deviation is $m_pf_m$ = **10** kHz, not the 2.5 rad figure; Carson then adds the $f_m$ back through `2×(10+4)`.

### P8. Two tones of equal amplitude, $1\ \mathrm{kHz}$ and $10\ \mathrm{kHz}$, drive an FM modulator with $k_f = 10\ \mathrm{kHz/V}$ at a combined peak of $2\ \mathrm{V}$. Find the peak deviation and the transmission bandwidth.

**Given:** kf = 10 kHz/V; peak message = 2 V; tones at 1 and 10 kHz

**Solution:**

1. Peak deviation depends on the peak message amplitude: df = kf x 2 = 20 kHz
2. For bandwidth, use the HIGHEST modulating frequency: fm = 10 kHz
3. Carson: BW = 2(df + fm) = 2(20 + 10) = 60 kHz
4. The index relative to the highest tone is beta = 20/10 = 2

> [!success]- Answer
> **df = 20 kHz; BW ≈ 60 kHz.**

> [!warning] Trap
> Using the 1 kHz tone for the bandwidth because its index is larger (beta = 20). Bandwidth follows the highest modulating frequency, while the deviation follows the peak amplitude; the two are independent measurements of the message.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10×2 : 2×(Ans+10) : Ans÷10`
> 2. `=` down the chain: $\Delta f$ = **20** kHz → $BW$ = **60** kHz using the 10 kHz tone → $\beta$ = **2** there, against `20÷1` = **20** for the 1 kHz tone.
>
> Deviation follows the PEAK amplitude (`10×2` = **20** kHz); bandwidth follows the HIGHEST tone, `2×(20+10)` = **60** kHz.

### P9. An FM signal is observed to sweep between $99.925\ \mathrm{MHz}$ and $100.075\ \mathrm{MHz}$. Find the carrier frequency, the peak deviation and the percent modulation against a $75\ \mathrm{kHz}$ limit.

**Given:** f range = 99.925 to 100.075 MHz; df_max = 75 kHz

**Solution:**

1. Carrier = midpoint = (99.925 + 100.075)/2 = 100.000 MHz
2. Swing = 100.075 - 99.925 = 0.150 MHz = 150 kHz
3. Peak deviation = swing/2 = 75 kHz
4. Percent modulation = 100 x 75/75 = 100 percent

> [!success]- Answer
> **fc = 100 MHz; df = 75 kHz; 100 percent modulation.**

> [!warning] Trap
> Reporting the deviation as 150 kHz from the total sweep. The observed frequency range is the carrier swing, which is twice the peak deviation — a 150 kHz swing is exactly full deviation, not 200 percent modulation.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(99.925+100.075)÷2 : (100.075−99.925)×1000 : Ans÷2 : 100×Ans÷75`
> 2. `=` down the chain: $f_c$ = **100.000** MHz → swing **150** kHz → $\Delta f$ = **75** kHz → **100** % modulation.
>
> The observed range is the SWING: `÷2` gives $\Delta f$ = **75** kHz, and a 150 kHz sweep is not 200 % modulation.

## Traps & Exam Notes

- **Calling the total frequency range the deviation.** The carrier swing is $2\Delta f$; the deviation is half the swing. A spectrum display showing a 150 kHz total excursion is a 75 kHz deviation, i.e. exactly 100 percent modulation for FM broadcast.
- **Using RMS instead of peak message amplitude.** $\Delta f = k_f A_m$ uses the *peak* voltage. Substituting an rms value (for a sine, 0.707 of peak) understates the deviation by 3 dB and is the usual cause of a wrong modulation index.
- **Confusing $k_f$ and $k_p$ units.** $k_f$ is in Hz/V (sometimes rad/s/V) and $k_p$ in rad/V. Using a rad/V figure as if it were Hz/V gives a deviation that is wrong by a factor of $2\pi$ or by $f_m$, depending on the text's convention.
- **Applying FM behaviour to PM.** FM has constant $\Delta f$ and an index that falls as $1/f_m$; PM has constant index and a deviation $\Delta f = m_p f_m$ that *grows* with modulating frequency. Any problem that changes $f_m$ while keeping the message amplitude fixed is testing exactly this difference.
- **Forgetting that only the peak message amplitude sets $\Delta f$, while only the highest $f_m$ sets the bandwidth.** With several tones the two answers come from different tones, so both must be identified explicitly.
- **Assuming an FM signal's bandwidth is $2\Delta f$.** That is the wideband approximation; the correct general result is Carson's rule $BW = 2(\Delta f+f_m)$, which reduces to $2f_m$ for narrowband FM.
- **Believing the constant envelope means the receiver can ignore amplitude.** Constant envelope helps the *transmitter* (class C) and gives FM its noise advantage, but the receiver still needs a limiter to strip amplitude noise and a discriminator whose output must be de-emphasised; the envelope carries no information to recover.
- **Exceeding the deviation limit without consequence.** Over-deviation splatters into adjacent channels; broadcast and land-mobile services specify a maximum deviation and a maximum audio frequency, and real transmitters use a clipper plus lowpass filter (and often a deviation limiter in a feedback loop) to guarantee compliance.

## See Also

- [[06_FM_Sidebands_and_Bessel_Functions]]
- [[07_Carson’s_Rule_and_FM_Bandwidth]]
- [[08_NBFM_vs_WBFM]]
- [[01_AM_Fundamentals_and_Modulation_Index]]
- [[09_FM_Noise_and_Threshold_Effect]]

---

[[04_VSB_and_AM_Variants_Comparison|⬅ 04]] · [[_MOC_Principles_of_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[06_FM_Sidebands_and_Bessel_Functions|06 ➡]]
