---
id: EST-03-05
title: "Delta Modulation and ADM"
part: "04_EST"
area: "03_Digital_Communications"
topic: 5
tier: 2
depth: full
problem_count: 4
prereqs: ["[[02_PCM_Sampling,_Quantizing,_Encoding]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Delta Modulation and ADM

> [!abstract] Scope
> Encode a waveform as a 1-bit up/down staircase: find the step size that avoids slope overload, the sampling rate that a given step demands, and the granular-noise penalty that comes with it.

## Core Concept

> [!tip] Intuition
> Delta modulation sends only one bit per sample: step up or step down. The receiver is just an integrator. Tracking works only while the staircase can climb as fast as the waveform does.

**The scheme.** Delta modulation (DM) is the simplest differential coder. The transmitter holds a staircase approximation $\hat{x}(t)$ built by an integrator. At each sampling instant it compares the incoming sample with the current staircase value and sends a single bit: 1 means *step up by $\delta$*, 0 means *step down by $\delta$*. The receiver runs an identical integrator driven by the received bits, so it reconstructs the staircase without ever needing the original amplitude. The transmitted rate is therefore $R = f_s$ bits per second — one bit per sample, independent of the signal's dynamic range.

**Slope overload: the failure that defines the design.** The staircase can change by at most $\delta$ per sampling period, so its maximum slope is $\delta f_s$. A sinusoid $A\sin(2\pi f_m t)$ has maximum slope $2\pi f_m A$. If $2\pi f_m A > \delta f_s$ the staircase cannot keep up, lags the signal, and produces large errors that look like clipping — this is *slope overload distortion*, and it is the dominant impairment in DM. The design condition is therefore $\delta f_s \geq 2\pi f_m A$, or equivalently a maximum trackable amplitude $A_{max} = \dfrac{\delta f_s}{2\pi f_m}$.

**Granular noise: the price of a large step.** Making $\delta$ large enough to avoid overload guarantees that for small or slowly varying signals the staircase hunts up and down around the input, producing a small oscillation called *granular noise* (or hunting). Its power grows with $\delta$, so the two impairments pull in opposite directions: $\delta$ too small gives slope overload, $\delta$ too large gives granular noise. Uniform DM has one fixed $\delta$, so it can only be optimized for one amplitude at one frequency.

**Adaptive delta modulation (ADM).** ADM breaks the compromise by making the step size track the signal. The standard rule (Jayant) compares the current bit with the previous one: if they agree (two 1s or two 0s) the staircase is falling behind and $\delta$ is multiplied up; if they alternate (1 then 0) the staircase is hunting and $\delta$ is multiplied down. A typical scheme uses $\delta_{k+1} = \delta_k \times 1.5$ on agreement and $\delta_k / 1.5$ on alternation. This gives DM a dynamic range comparable to 8–12 bit PCM while keeping the 1-bit channel.

**Bandwidth and comparison with PCM.** With $R = f_s$ bits per second and binary baseband signalling, the minimum bandwidth is $B_{min} = f_s/2$. Because DM must sample far above Nyquist to track the waveform's slope, $f_s$ for DM is typically 8–16 times $f_m$ — for example 32–64 kbps for a 4 kHz voice channel, comparable to 64 kbps PCM but with much simpler hardware. DM's attraction is implementation cost, not bandwidth efficiency: a comparator, an integrator and a flip-flop replace a full analog-to-digital converter.

**Two more practical effects.** *Idle-channel noise*: with no input, DM keeps hunting around zero because the integrator drifts, so a silent channel transmits a continuous bit pattern. *Start-up and DC tracking*: the integrator cannot follow a step change faster than $\delta f_s$ either, so a sudden DC shift also overloads the loop until it climbs. Both are why practical DM codecs use ADM with a minimum step floor.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Slope-overload condition | $\delta f_s \geq 2\pi f_m A$ | The core design inequality. Violating it produces distortion far larger than granular noise. |
| Maximum trackable amplitude | $A_{max} = \frac{\delta f_s}{2\pi f_m}$ | For a sinusoid of frequency fm at sampling rate fs with step delta. |
| Minimum step size | $\delta_{min} = \frac{2\pi f_m A}{f_s}$ | Rearrange the overload condition. Note delta scales inversely with fs. |
| Minimum sampling rate | $f_s \geq \frac{2\pi f_m A}{\delta}$ | For a given step and peak amplitude. Always well above the Nyquist rate 2fm. |
| DM bit rate | $R = f_s$ | One bit per sample. Independent of amplitude, unlike PCM where R = n fs. |
| DM minimum bandwidth | $B_{min} = \frac{f_s}{2}$ | Binary baseband Nyquist minimum. Practical links use B approx fs. |
| Maximum staircase slope | $\left.\frac{d\hat{x}}{dt}\right\lvert _{max} = \delta f_s$ | The physical limit that causes slope overload when exceeded by the signal. |
| Oversampling ratio | $\mathrm{OSR} = \frac{f_s}{2 f_m}$ | DM typically runs OSR in the 4 to 8 range, which is why its bit rate rivals PCM's. |
| Adaptive step update | $\delta_{k+1} = \delta_k \times 1.5 \ (\mathrm{agree}), \quad \delta_k / 1.5 \ (\mathrm{alternate})$ | Jayant-style ADM rule. Agreement means the loop is lagging; alternation means it is hunting. |
| Granular noise power | $P_g \propto \delta^2$ | Grows with step size, opposing slope overload. DM's fixed trade-off. |

## Worked Problems

### P1. A delta modulator uses a step size of $100\ \mathrm{mV}$ and a sampling rate of $100\ \mathrm{kHz}$. Find the largest $1\ \mathrm{kHz}$ sinusoid it can track without slope overload.

**Given:** delta = 100 mV; fs = 100 kHz; fm = 1 kHz

**Solution:**

1. A_max = delta fs / (2 pi fm)
2. = (0.1 x 100 000)/(2 pi x 1000)
3. = 10 000/6283.2
4. = 1.591 V

> [!success]- Answer
> **$A_{max} = 1.59\ \mathrm{V}$ peak**

> [!warning] Trap
> Using the peak-to-peak amplitude instead of the peak. The maximum *slope* of $A\sin$ is $2\pi f_m A$ with $A$ the peak value; a 3.18 V peak-to-peak signal overloads this loop.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.1×100000` → **10 000** V/s, the maximum staircase slope $\delta f_s$.
> 2. `Ans÷(2π×1000)` → $A_{max}$ = **1.5915** V ≈ **1.59** V peak.
>
> $A$ here is the peak amplitude, so a 3.18 V peak-to-peak sine overloads this loop.

### P2. A delta modulator must track a $2\ \mathrm{V}$ peak, $1\ \mathrm{kHz}$ sinusoid with a step size of $50\ \mathrm{mV}$. Find the minimum sampling rate.

**Given:** A = 2 V peak; fm = 1 kHz; delta = 50 mV

**Solution:**

1. fs >= 2 pi fm A / delta
2. = (2 pi x 1000 x 2)/0.05
3. = 12 566/0.05
4. = 251 327 Hz

> [!success]- Answer
> **$f_s \geq 251.3\ \mathrm{kHz}$**

> [!warning] Trap
> Comparing against the Nyquist rate $2f_m = 2\ \mathrm{kHz}$ and declaring $f_s = 2\ \mathrm{kHz}$ adequate. DM's sampling rate is set by the *slope* condition, not by Nyquist, and here it is over 100 times larger.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×1000×2` → **12 566.4** V/s, the slope the staircase must reach.
> 2. `Ans÷0.05` → $f_s \geq$ **251 327** Hz ≈ **251.3** kHz — over 100× the 2 kHz Nyquist rate.
>
> The sample rate is set by the slope condition $2\pi f_m A/\delta$, never by $2f_m$.

### P3. A delta modulator samples at $64\ \mathrm{kHz}$. Find its bit rate and minimum transmission bandwidth, and compare with 8-bit PCM at the same sampling rate.

**Given:** fs = 64 kHz; DM = 1 bit/sample; PCM = 8 bits/sample

**Solution:**

1. DM: R = fs = 64 000 bps
2. DM: B_min = fs/2 = 32 000 Hz
3. PCM: R = 8 x 64 000 = 512 000 bps
4. PCM: B_min = 256 000 Hz
5. DM is 8 times more bandwidth-efficient here, at the cost of granular noise and slope overload

> [!success]- Answer
> **DM: $64\ \mathrm{kbps}$, $32\ \mathrm{kHz}$; PCM: $512\ \mathrm{kbps}$, $256\ \mathrm{kHz}$**

> [!warning] Trap
> Applying $R = n f_s$ to DM with some assumed $n$. DM is defined by $n = 1$; its resolution comes from oversampling and feedback, not from bits per sample.

### P4. A $1\ \mathrm{kHz}$, $4\ \mathrm{V}$ peak sinusoid is to be tracked by a delta modulator running at $100\ \mathrm{kHz}$. Find the minimum step size, and state what happens to granular noise if the step is doubled.

**Given:** fm = 1 kHz; A = 4 V peak; fs = 100 kHz

**Solution:**

1. delta_min = 2 pi fm A / fs
2. = (2 pi x 1000 x 4)/100 000
3. = 25 133/100 000
4. = 0.2513 V
5. Doubling delta to 0.503 V doubles the staircase slope limit but quadruples granular noise power, since P_g scales with delta^2

> [!success]- Answer
> **$\delta_{min} = 251\ \mathrm{mV}$; doubling it quadruples granular noise power**

> [!warning] Trap
> Assuming a larger step is always safer. It removes slope overload but raises granular noise by $\delta^2$, so an oversized step degrades a quiet channel badly — the trade-off ADM exists to manage.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×1000×4` → **25 132.7** V/s required slope.
> 2. `Ans÷100000` → $\delta_{min}$ = **0.25133** V ≈ **251** mV.
> 3. Doubling $\delta$ multiplies the granular noise power by **4**: `2^2` → **4**, since $P_g \propto \delta^{2}$.

## Traps & Exam Notes

- **Setting $f_s$ from Nyquist instead of the slope condition.** Delta modulation needs $f_s \gg 2f_m$; the entire point of the 1-bit channel is that the sample rate is high. A Nyquist-rate DM would overload on almost any real signal.
- **Using peak-to-peak amplitude in $2\pi f_m A$.** The derivative of $A\sin(2\pi f_m t)$ uses the *peak* amplitude. Substituting peak-to-peak doubles the required step or sampling rate.
- **Thinking a bigger step always helps.** Large $\delta$ prevents slope overload but increases granular noise in proportion to $\delta^2$; uniform DM can only be optimized for one amplitude and frequency. This is precisely the motivation for ADM.
- **Confusing delta modulation with delta-sigma modulation.** DM integrates the *reconstructed* signal in the feedback path and sends the raw comparator decision; delta-sigma puts the integrator *before* the comparator and uses noise shaping. Their SQNR versus oversampling slopes differ (roughly 9 dB/octave for DM, 15 dB/octave for second-order delta-sigma).
- **Forgetting idle-channel hunting.** With no input, DM continues to transmit an alternating pattern because the integrator cannot settle. Silence is not a quiet channel in DM; it is a full-rate bit stream.
- **Quoting a DM bit rate without the sampling rate.** Because $R = f_s$, the bit rate *is* the sampling rate. Reporting 64 kbps and then also claiming a 64 kHz *and* 8 kHz sampling rate is self-contradictory.

## See Also

- [[02_PCM_Sampling,_Quantizing,_Encoding]]
- [[03_Quantization_Noise_and_SQNR]]
- [[04_Companding_Mu-Law_and_A-Law]]

---

[[04_Companding_Mu-Law_and_A-Law|⬅ 04]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Line_Coding_Schemes|06 ➡]]
