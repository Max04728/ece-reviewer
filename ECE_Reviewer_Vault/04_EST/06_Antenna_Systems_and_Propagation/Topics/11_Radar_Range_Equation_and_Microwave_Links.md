---
id: EST-06-11
title: "Radar Range Equation and Microwave Links"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 11
tier: 2
depth: full
problem_count: 4
prereqs: ["[[06_FSPL_and_Friis_Transmission_Equation]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Radar Range Equation and Microwave Links

> [!abstract] Scope
> Size a radar's detection range from transmitted power, antenna gain, wavelength and target cross-section, and close a line-of-sight microwave link budget.

## Core Concept

> [!tip] Intuition
> Radar power makes two trips. It thins out as $1/R^{2}$ on the way to the target and again as $1/R^{2}$ on the way back, so the echo falls as $1/R^{4}$ - which is why radar range is won in painfully small steps and lost very easily.

**Where the fourth power comes from.** A transmitter of peak power $P_t$ and gain $G$ illuminates the target with a power density $S = P_tG/(4\pi R^{2})$. The target intercepts $\sigma S$ watts, where $\sigma$ is its radar cross-section, and re-radiates it isotropically by definition of $\sigma$, so the density arriving back at the radar is $\sigma S/(4\pi R^{2})$. The antenna collects that with an effective area $A_e = G\lambda^{2}/4\pi$, so the received power is:
$$P_r = P_tG^{2}\lambda^{2}\sigma/[(4\pi)^{3}R^{4}]$$
The gain appears squared because in a monostatic radar one antenna does both jobs; the range appears to the fourth power because the path is travelled twice; and the wavelength appears because a larger aperture for the same gain collects more of the returning wave.

**What $R^{4}$ costs you.** Since $P_r \propto R^{-4}$, doubling the range needs $2^{4} = 16$ times the power; and range scales as $R_{\max} \propto P_t^{1/4}$, $\propto G^{1/2}$, $\propto \lambda^{1/2}$ and $\propto \sigma^{1/4}$. The fourth root is a blunt instrument: doubling the peak power buys only $2^{1/4} = 1.19$, a 19 per cent range gain, and quadrupling the antenna gain buys a factor of two. The cheapest route to range is almost always lowering the minimum detectable power - a quieter receiver, a narrower bandwidth, or a longer integration time.

**Minimum detectable power.** The echo is usable when $P_r \ge P_{\min} = kT_0BF(S/N)_{\min}$, where $k = 1.38\times10^{-23}\ \mathrm{J/K}$, $T_0$ is the reference temperature (290 K by convention), $B$ is the receiver bandwidth, $F$ the noise figure as a ratio and $(S/N)_{\min}$ the detection threshold. At $T_0 = 290\ \mathrm{K}$ the thermal noise density is:
$$kT_0 = 4.0\times10^{-21}\ \mathrm{W/Hz} = -174\ \mathrm{dBm/Hz}$$
so the whole expression collapses to:
$$P_{\min}(\mathrm{dBm}) = -114 + 10\log_{10}B_{\mathrm{MHz}} + NF_{\mathrm{dB}} + (S/N)_{\min,\mathrm{dB}}$$
Narrowing $B$ lowers $P_{\min}$ and extends range as $B^{-1/4}$ - but a narrower matched filter means a longer pulse, which coarsens range resolution. That trade is the central design conflict in radar.

**Timing: PRF, pulse width and average power.** A pulsed radar cannot tell which transmitted pulse an echo belongs to, so echoes from beyond the **unambiguous range** $R_{un} = c/(2\,\mathrm{PRF})$ arrive after the next pulse has already gone out and are displayed at a false short range. The pulse width sets **range resolution**: two targets are separable when their echoes do not overlap, giving $\Delta R = c\tau/2$, again halved by the round trip. Duty cycle is $\tau\,\mathrm{PRF}$ and average power is $P_{av} = P_{peak}\tau\,\mathrm{PRF}$, so a long pulse is good for average power and reach but bad for resolution, and a high PRF is good for unambiguous velocity but bad for unambiguous range.

**Line-of-sight microwave links.** The link budget is the radar equation's one-way cousin:
$$P_{rx} = P_{tx} + G_t + G_r - \mathrm{FSPL} - L_{\mathrm{misc}}$$
where the path loss is:
$$\mathrm{FSPL}(\mathrm{dB}) = 32.44 + 20\log_{10}d_{\mathrm{km}} + 20\log_{10}f_{\mathrm{MHz}}$$
The design closes when the received level stands above the receiver sensitivity by the **fade margin** wanted for the availability target - typically 20 to 30 dB for a carrier-grade hop. The budget assumes free-space spreading with clear first-Fresnel-zone clearance, so it must always be paired with the horizon and clearance checks from the propagation notes; a budget that closes on paper but grazes a rooftop does not close in the field.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Radar equation | $P_r = \dfrac{P_t G^{2} \lambda^{2} \sigma}{(4\pi)^{3} R^{4}}$ | Received echo power in W. Valid for a monostatic radar, target in the main beam, free space, no system losses. |
| Maximum radar range | $R_{\max} = \left[\dfrac{P_t G^{2} \lambda^{2} \sigma}{(4\pi)^{3} P_{\min}}\right]^{1/4}$ | Set P_r = P_min and solve. Note the fourth root: R^4 is not R. |
| Minimum detectable power | $P_{\min} = k T_0 B F (S/N)_{\min}$ | k = 1.38e-23 J/K, T_0 = 290 K, B in Hz, F as a ratio, S/N as a ratio. |
| Minimum detectable power in dBm | $P_{\min}(\mathrm{dBm}) = -114 + 10\log_{10}B_{\mathrm{MHz}} + NF_{\mathrm{dB}} + (S/N)_{\min,\mathrm{dB}}$ | The -114 already contains kT0 for a 1 MHz bandwidth at 290 K with 0 dB NF and 0 dB SNR. B must be in MHz. |
| Unambiguous range | $R_{un} = \dfrac{c}{2\,\mathrm{PRF}}$ | Set by the PRF alone. Raising the PRF shortens it, so more pulses per second means more range ambiguity. |
| Range resolution | $\Delta R = \dfrac{c\,\tau}{2}$ | tau is the pulse width. The factor 2 is the round trip; using c*tau doubles the resolution cell. |
| Average power and duty cycle | $P_{av} = P_{peak}\,\tau\,\mathrm{PRF}, \quad \mathrm{duty} = \tau\,\mathrm{PRF}$ | Duty cycle is dimensionless and always well below 1 for a pulsed radar - typically 0.1 per cent. |
| Free-space path loss | $\mathrm{FSPL}(\mathrm{dB}) = 32.44 + 20\log_{10}d_{\mathrm{km}} + 20\log_{10}f_{\mathrm{MHz}}$ | The constant 32.44 wants km and MHz. The alternative constant 92.45 wants km and GHz. |
| Microwave link budget | $P_{rx} = P_{tx} + G_t + G_r - \mathrm{FSPL} - L_{\mathrm{misc}}$ | Every term in dB or dBm; never mix dBm with dBW. Add a fade margin on top of the receiver sensitivity. |
| Range scaling laws | $R_{\max} \propto P_t^{1/4} \propto G^{1/2} \propto \lambda^{1/2} \propto \sigma^{1/4}$ | Doubling range costs 16x the power. Every exponent is a fourth or a half, never 1. |

## Interactive Widget

**Radar Range Slider**

![[Radar_Range_Slider.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A monostatic radar transmits $P_t = 100\ \mathrm{kW}$ with an antenna gain of $G = 30\ \mathrm{dBi}$ at $\lambda = 0.03\ \mathrm{m}$ (10 GHz). It must detect a target of cross-section $\sigma = 1\ \mathrm{m^{2}}$ whose echo exceeds $P_{\min} = 1\times10^{-13}\ \mathrm{W}$. Find the maximum range.

**Given:** P_t = 100 kW; G = 30 dBi = 1000; lambda = 0.03 m; sigma = 1 m^2; P_min = 1e-13 W

**Solution:**

1. Numerator: $P_tG^{2}\lambda^{2}\sigma = (10^{5})(10^{3})^{2}(0.03)^{2}(1) = 10^{5} \times 10^{6} \times 9\times10^{-4} = 9\times10^{7}$
2. Constant: $(4\pi)^{3} = 1984.4$, so the denominator is $1984.4 \times 10^{-13} = 1.9844\times10^{-10}$
3. $R^{4} = \dfrac{9\times10^{7}}{1.9844\times10^{-10}} = 4.535\times10^{17}$
4. $R_{\max} = (4.535\times10^{17})^{1/4} = 2.595\times10^{4}\ \mathrm{m} = 25.95\ \mathrm{km}$

> [!success]- Answer
> **$R_{\max} \approx 26.0\ \mathrm{km}$.**

> [!warning] Trap
> Stopping at $R^{4}$. The bracket evaluates to $4.535\times10^{17}$; taking only the square root gives $6.73\times10^{8}\ \mathrm{m}$, a range of 673,000 km - larger than the earth-to-moon distance, which is the giveaway that the fourth root was never taken.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(30÷10)` → $G$ = **1000** linear; `10^5×Ans²×0.03²` → **9×10^7**.
> 2. `Ans÷((4π)³×10^-13)` → $R^4$ = **4.535×10^17**.
> 3. `Ans^(1÷4)` → **25 951** m = **25.95** km. `Ans^(1÷2)` would give 6.7×10^8 m, the tell-tale of stopping at the square root.

### P2. The same radar is rebuilt with a 10 MHz receiver bandwidth, a 10 dB noise figure and a 13 dB detection threshold. Find $P_{\min}$ and the new maximum range, given that the original $P_{\min}$ was $1\times10^{-13}\ \mathrm{W}$ with $R_{\max} = 25.95\ \mathrm{km}$.

**Given:** B = 10 MHz; NF = 10 dB; SNR_min = 13 dB; reference P_min = 1e-13 W = -100 dBm; reference R_max = 25.95 km

**Solution:**

1. $P_{\min}(\mathrm{dBm}) = -114 + 10\log_{10}(10) + 10 + 13 = -114 + 10 + 10 + 13 = -81\ \mathrm{dBm}$
2. Convert: $-81\ \mathrm{dBm} = 10^{-8.1}\ \mathrm{mW} = 7.94\times10^{-12}\ \mathrm{W}$
3. Sensitivity ratio to the reference: $\dfrac{7.94\times10^{-12}}{1\times10^{-13}} = 79.4$ (the 19 dB difference)
4. Since $R_{\max} \propto P_{\min}^{-1/4}$: factor $= 79.4^{-0.25} = 0.335$
5. $R_{\max} = 25.95 \times 0.335 = 8.69\ \mathrm{km}$

> [!success]- Answer
> **$P_{\min} = -81\ \mathrm{dBm}$, and $R_{\max}$ falls to $8.7\ \mathrm{km}$ - about 33 per cent of the original.**

> [!warning] Trap
> Applying the 19 dB sensitivity loss directly to range. Power ratios enter through the fourth root: 19 dB is a 79x power penalty but only a $79^{1/4} = 2.99$ range penalty. Conversely, do not dismiss the change as negligible - a third of the range is a serious loss.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 25 (k) `×290×10×10^6` → **4.004×10^-14** W; `10log(Ans×10^3)` → **-103.98** dBm.
> 2. `+10+13` → $P_\min$ = **-81.0** dBm, matching the -114 dBm shortcut.
> 3. `10^(-81÷10)×10^-3÷10^-13` → ratio **79.4**; `Ans^(-0.25)×25.95` → $R_\max$ = **8.69** km.

### P3. A pulse radar runs at $\mathrm{PRF} = 1\ \mathrm{kHz}$ with a pulse width of $\tau = 1\ \mathrm{\mu s}$ and a peak power of 100 kW. Find the unambiguous range, the range resolution, the duty cycle and the average power.

**Given:** PRF = 1 kHz; tau = 1 microsecond; P_peak = 100 kW

**Solution:**

1. $R_{un} = \dfrac{c}{2\,\mathrm{PRF}} = \dfrac{3\times10^{8}}{2(1000)} = 1.5\times10^{5}\ \mathrm{m} = 150\ \mathrm{km}$
2. $\Delta R = \dfrac{c\tau}{2} = \dfrac{(3\times10^{8})(10^{-6})}{2} = 150\ \mathrm{m}$
3. Duty cycle: $\tau\,\mathrm{PRF} = (10^{-6})(10^{3}) = 10^{-3} = 0.1$ per cent
4. $P_{av} = P_{peak}\,\mathrm{duty} = 10^{5} \times 10^{-3} = 100\ \mathrm{W}$

> [!success]- Answer
> **$R_{un} = 150\ \mathrm{km}$, $\Delta R = 150\ \mathrm{m}$, duty cycle 0.1 per cent, $P_{av} = 100\ \mathrm{W}$.**

> [!warning] Trap
> Dropping the factor 2 in either place: $c/\mathrm{PRF}$ gives 300 km and $c\tau$ gives 300 m. Both quantities are round-trip measurements, so both halve. Note also that 150 km is the *unambiguous* range, not the detection range - they are set by different physics.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷(2×1000)` → $R_{un}$ = **1.5×10^5** m = **150** km.
> 2. `10^-6×10^3` → duty cycle **10^-3** = **0.1** %.
> 3. `150×10^3×10^-3` → $\Delta R$ = **150** m (= $R_{un}$ × duty, which is $c\tau/2$); `10^5×10^-3` → $P_{av}$ = **100** W.

### P4. A 6 GHz line-of-sight link runs 30 km with $P_{tx} = 1\ \mathrm{W}$, and identical 30 dBi antennas at each end. The receiver sensitivity is $-80\ \mathrm{dBm}$. Find the free-space path loss, the received power and the fade margin.

**Given:** P_tx = 1 W = 30 dBm; G_t = G_r = 30 dBi; d = 30 km; f = 6 GHz = 6000 MHz; receiver sensitivity = -80 dBm; no feeder or atmospheric loss

**Solution:**

1. $\mathrm{FSPL} = 32.44 + 20\log_{10}(30) + 20\log_{10}(6000) = 32.44 + 29.54 + 75.56 = 137.54\ \mathrm{dB}$
2. $P_{rx} = P_{tx} + G_t + G_r - \mathrm{FSPL} = 30 + 30 + 30 - 137.54$
3. $P_{rx} = -47.54\ \mathrm{dBm}$
4. Fade margin $= -47.54 - (-80) = 32.46\ \mathrm{dB}$

> [!success]- Answer
> **$\mathrm{FSPL} = 137.5\ \mathrm{dB}$, $P_{rx} = -47.5\ \mathrm{dBm}$, fade margin $\approx 32.5\ \mathrm{dB}$.**

> [!warning] Trap
> Feeding the frequency in GHz into the 32.44 constant: $20\log_{10}(6) = 15.6\ \mathrm{dB}$ instead of $75.6\ \mathrm{dB}$, making the link look 60 dB better than it is. Use 32.44 with km and MHz, or 92.45 with km and GHz - never mix them. Also check that the 30 km hop actually clears its first Fresnel zone.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `32.44+20log(30)+20log(6000)` → FSPL = **137.5** dB.
> 2. `10log(1000)` → **30** dBm for the 1 W input; `30+30+30-137.545` → $P_{rx}$ = **-47.5** dBm.
> 3. `-47.545+80` → fade margin **32.5** dB.

## Traps & Exam Notes

- **Solving for R when the equation hands back $R^{4}$.** With $P_t = 100\ \mathrm{kW}$, $G = 30\ \mathrm{dBi}$, $\lambda = 0.03\ \mathrm{m}$, $\sigma = 1\ \mathrm{m^{2}}$ and $P_{\min} = 10^{-13}\ \mathrm{W}$ the bracket is $4.54\times10^{17}$; its square root is $6.7\times10^{8}\ \mathrm{m}$, an answer no radar could have. Always sanity-check range against the horizon.
- **Using $G$ once instead of $G^{2}$.** A monostatic radar transmits and receives through the same antenna, so the gain enters squared. Dropping one factor understates $R_{\max}$ by $G^{1/4}$: for $G = 1000$ that is a factor of 5.6, which is the difference between 26 km and 4.6 km.
- **Believing range scales with the square root of power.** It is the fourth root. Doubling the range costs 16x the peak power, and doubling the peak power gains only $2^{1/4} = 1.19$, a 19 per cent range improvement - never the 41 per cent that $\sqrt{2}$ would suggest.
- **Mixing dBm and dBW inside one budget.** $P_t = 100\ \mathrm{kW}$ is 80 dBm or 50 dBW. Adding a 30 dB antenna gain to 50 dBW and then comparing the total against a dBm sensitivity is a 30 dB error that looks like a working link.
- **Confusing unambiguous range with maximum detection range.** The PRF fixes $R_{un} = c/(2\,\mathrm{PRF})$ and the radar equation fixes $R_{\max}$. Raising the PRF to get more energy on target *shortens* the unambiguous range, so a target at 200 km can be painted at a false 50 km.
- **Using $c\tau$ as the range resolution.** $\Delta R = c\tau/2$: at $\tau = 1\ \mathrm{\mu s}$ the resolution is 150 m, not 300 m. Two targets 150 m apart are only just separated, because their echo pulses abut exactly.

## See Also

- [[06_FSPL_and_Friis_Transmission_Equation]]
- [[08_Space_Wave_and_Radio_Horizon]]
- [[03_Thermal_and_Johnson_Noise]]
- [[05_SNR,_Noise_Factor_and_Noise_Figure]]

---

[[10_Critical_Frequency,_MUF_and_Skip_Distance|⬅ 10]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Television_Systems_and_ISDB-T|12 ➡]]
