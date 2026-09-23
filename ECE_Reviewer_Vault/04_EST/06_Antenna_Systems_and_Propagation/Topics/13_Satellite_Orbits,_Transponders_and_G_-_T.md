---
id: EST-06-13
title: "Satellite Orbits, Transponders and G/T"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 13
tier: 2
depth: full
problem_count: 4
prereqs: ["[[06_FSPL_and_Friis_Transmission_Equation]]", "[[05_Parabolic_Reflector_Antennas]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — Satellite Orbits, Transponders and G/T

> [!abstract] Scope
> Pick the right orbit from Kepler's third law, explain how a bent-pipe transponder reuses spectrum, and compute the G/T and C/N0 that set a satellite link's margin.

## Core Concept

> [!tip] Intuition
> A satellite is a repeater in free fall: gravity alone fixes its period and therefore its radius, so "where the satellite sits" is a single equation, not a design choice. Everything else in the link is bookkeeping — a huge free-space loss on both hops, a receive antenna characterised by G/T, and a noisy receiver that ultimately decides whether the link closes.

**Kepler's third law fixes the orbit radius from the period.** Equating gravity to the centripetal requirement, $GMm/a^2 = m(2\pi/T)^2 a$, rearranges to $T = 2\pi\sqrt{a^3/\mu}$, where for Earth the gravitational parameter is:
$$\mu = GM = 3.986\times10^{5}\ \mathrm{km^3/s^2}$$
Inverted, $a = \left(\mu (T/2\pi)^2\right)^{1/3}$. Because $T^2 \propto a^3$, the radius is extremely insensitive to period error but the altitude is not: at geostationary radius a 0.3% period error moves the satellite of order a hundred kilometres. All orbit questions reduce to: know $\mu$, convert the period to seconds, cube-root. Higher orbits are slower: LEO at $a \approx 6700\ \mathrm{km}$ takes about 90 min, MEO at $a = 26\,610\ \mathrm{km}$ takes 12 h (GPS), and GEO at $a = 42\,164\ \mathrm{km}$ takes one sidereal day.

**The orbit classes and what each is for.** *LEO* (160–2000 km altitude) has a ~90 min period and about 7.8 km/s orbital velocity: low latency (a few ms), low path loss, but each satellite is visible for only minutes, so a constellation and handover are mandatory and Doppler shift is significant. *MEO* (2000 km up to GEO radius) is the GPS/GLONASS navigation regime — $a = 26\,610\ \mathrm{km}$ gives exactly 12 h, so the ground track repeats twice a day. *GEO* sits at $a = 42\,164\ \mathrm{km}$, i.e. an altitude above the equator of:
$$h = 42\,164 - 6378 = 35\,786\ \mathrm{km}$$
with orbital velocity $v = 2\pi a/T = 3.07\ \mathrm{km/s}$: three or four satellites give near-global coverage, the antennas are fixed (no tracking), but the round-trip propagation delay is about 250 ms and coverage above roughly 70° latitude is poor because the elevation angle collapses. *HEO* (Molniya, $T = 12\ \mathrm{h}$, high eccentricity, critical inclination) loiters over high latitudes where GEO cannot reach.

**Look angles and slant range.** A ground station is specified by elevation (above the local horizon), azimuth (compass bearing) and slant range. From the plane triangle formed by the Earth's centre, the sub-satellite point and the station, the slant range is:
$$d = \sqrt{(h+R_e)^2 + R_e^2 - 2R_e(h+R_e)\cos\psi}$$
where $\psi$ is the central angle between the station and the sub-satellite point. The minimum slant range to a GEO satellite is the altitude itself, 35 786 km, straight up from the sub-satellite point; at the edge of a usable coverage zone ($\psi = 60^\circ$) it has grown to about 39 400 km. Elevation and slant range are what feed the free-space loss of the downlink.

**The transponder is a receiver–translator–transmitter.** A *bent-pipe* transponder receives the uplink band, shifts it in frequency to the downlink band and amplifies it — it does not demodulate. Band pairs are 6/4 GHz (C-band, classic 36 MHz transponder bandwidth), 14/12 GHz (Ku, often 54 or 72 MHz) and 30/20 GHz (Ka). Spectrum is reused by transmitting orthogonal (horizontal/vertical or left/right circular) polarisations on the same frequency and by shaping spot beams that illuminate disjoint patches of Earth. The output stage is a TWTA (or SSPA) whose saturation point is the design dilemma: drive it hard for maximum downlink EIRP and intermodulation products between multiple carriers splatter into neighbouring channels, so multi-carrier operation backs the tube off several dB from saturation, trading power for linearity.

**G/T and the link equation are the figure of merit and the budget.** The receive side is summarised by $G/T = G_r - 10\log_{10}T_{sys}$ in dB/K — a big dish is worth nothing if its system temperature is high, and G/T, not gain alone, appears in the link. The carrier-to-noise-density ratio follows from $C/N_0 = EIRP - L_{fs} + G/T + 228.6$ (the constant is $-10\log_{10}k$ with $k = 1.38\times10^{-23}\ \mathrm{J/K}$), and dividing by the noise bandwidth gives $C/N = C/N_0 - 10\log_{10}B$. A link closes when the computed $C/N$ (or $E_b/N_0$) exceeds the modem threshold with margin; uplink and downlink degrade together, so they are combined reciprocally rather than added in dB.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Kepler's third law (circular) | $T = 2\pi\sqrt{\dfrac{a^3}{\mu}},\quad \mu = 3.986\times10^{5}\ \mathrm{km^3/s^2}$ | a measured from the Earth's CENTRE, not the altitude. T in seconds. Sidereal day = 86164 s, not 86400 s. |
| Orbit radius from period | $a = \left(\mu\left(\dfrac{T}{2\pi}\right)^2\right)^{1/3}$ | Altitude is then h = a - R_e with R_e = 6378 km. Cube-root of a quantity in km^3 gives km. |
| Kepler ratio form | $\dfrac{T_1^2}{T_2^2} = \dfrac{a_1^3}{a_2^3}$ | Use for relative questions ('what period at twice the radius?') without touching mu: doubling a multiplies T by 2^{3/2} = 2.83. |
| Geostationary radius and altitude | $T = 86164\ \mathrm{s}\ \Rightarrow\ a = 42164\ \mathrm{km},\ h = 35786\ \mathrm{km}$ | Requires an equatorial, prograde (eastward) circular orbit. Any inclination or retrograde motion gives a geosynchronous but NOT geostationary satellite. |
| Circular orbital velocity | $v = \dfrac{2\pi a}{T} = \sqrt{\dfrac{\mu}{a}}$ | GEO: 3.07 km/s. LEO (a = 6700 km): 7.71 km/s. Independent of satellite mass. |
| Slant range to the satellite | $d = \sqrt{(h+R_e)^2 + R_e^2 - 2R_e(h+R_e)\cos\psi}$ | psi = central angle station-to-sub-satellite-point. psi = 0 gives 35 786 km; psi = 60 deg gives 39 364 km. |
| Elevation angle | $El = \arctan\!\left(\dfrac{\cos\psi - R_e/(R_e+h)}{\sin\psi}\right)$ | El = 90 deg at the sub-satellite point and falls to 0 deg at the horizon, which bounds GEO coverage to roughly 70 deg latitude. |
| Parabolic antenna gain | $G = \eta\left(\dfrac{\pi D}{\lambda}\right)^2$ | D is the dish DIAMETER in metres, lambda in metres, eta the aperture efficiency (0.55-0.70). 3 m at 4 GHz with eta = 0.55 gives 39.4 dBi. |
| G/T figure of merit | $G/T = G_r(\mathrm{dB}) - 10\log_{10} T_{sys}$ | Units dB/K. T_sys in kelvin, NOT in dB: 100 K contributes 20 dB. Higher G/T is better; it is what appears in the link equation. |
| Downlink C/N0 | $C/N_0 = EIRP - L_{fs} + G/T + 228.6$ | EIRP in dBW, L_fs in dB, G/T in dB/K, result in dBHz. 228.6 = -10 log10(k), k = 1.38e-23 J/K. |
| C/N in a bandwidth | $C/N = C/N_0 - 10\log_{10} B$ | B in Hz. A 36 MHz transponder contributes 75.6 dB: the wider the noise bandwidth, the worse the C/N for the same C/N0. |
| Uplink and downlink combined | $(C/N_0)_{tot} = \left[(C/N_0)_u^{-1} + (C/N_0)_d^{-1}\right]^{-1}$ | Noise powers add, so the ratios combine reciprocally. The weaker hop dominates; improving the stronger hop alone buys almost nothing. |

## Worked Problems

### P1. Find the orbital radius and altitude of a geostationary satellite, given that it must match the Earth's rotation.

**Given:** T = 86164 s (one sidereal day); \mu = 3.986\times10^{5}\ \mathrm{km^3/s^2}; R_e = 6378 km

**Solution:**

1. Use $a = (\mu (T/2\pi)^2)^{1/3}$; first form $T/2\pi = 86164/6.2832 = 13712\ \mathrm{s}$
2. Square it: $(13712)^2 = 1.8802\times10^{8}\ \mathrm{s^2}$
3. Multiply by $\mu$: $3.986\times10^{5} \times 1.8802\times10^{8} = 7.4946\times10^{13}\ \mathrm{km^3}$
4. Cube-root: $a = (7.4946\times10^{13})^{1/3} = 42164\ \mathrm{km}$ from the Earth's centre
5. Altitude: $h = 42164 - 6378 = 35786\ \mathrm{km}$

> [!success]- Answer
> **$a = 42\,164\ \mathrm{km}$; $h = 35\,786\ \mathrm{km}$ above the equator.**

> [!warning] Trap
> Substituting the 24 h solar day (86 400 s) instead of the 86 164 s sidereal day. That gives $a = 42\,241\ \mathrm{km}$ and $h = 35\,863\ \mathrm{km}$ — 77 km too high, because the orbit must track the stars' apparent rotation, not the Sun's.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(3.986×10^5×(86164÷(2π))²)^(1÷3)` → $a$ = **42 164** km; `-6378` → $h$ = **35 786** km.
> 2. `×86400` instead of `86164`: the same line returns **42 241** km — the 77 km solar-day trap.

### P2. A navigation satellite has a 12-hour orbital period. Find its orbital radius and altitude and state which orbit class it is in.

**Given:** T = 12 h; \mu = 3.986\times10^{5}\ \mathrm{km^3/s^2}; R_e = 6378 km

**Solution:**

1. Convert: $T = 12 \times 3600 = 43\,200\ \mathrm{s}$, so $T/2\pi = 6875.5\ \mathrm{s}$
2. $(T/2\pi)^2 = 4.727\times10^{7}\ \mathrm{s^2}$
3. $\mu (T/2\pi)^2 = 3.986\times10^{5} \times 4.727\times10^{7} = 1.8842\times10^{13}\ \mathrm{km^3}$
4. $a = (1.8842\times10^{13})^{1/3} = 26\,610\ \mathrm{km}$
5. Altitude: $h = 26\,610 - 6378 = 20\,232\ \mathrm{km}$ — a MEO orbit, the GPS regime

> [!success]- Answer
> **$a = 26\,610\ \mathrm{km}$, $h \approx 20\,232\ \mathrm{km}$: MEO.**

> [!warning] Trap
> Quoting GPS at $a = 26\,560\ \mathrm{km}$ and then computing the period from it: that radius belongs to the 11 h 58 min sidereal half-day (43 078 s), not to a neat 12 h. Pick one convention and stay inside it — do not mix $a = 26\,560\ \mathrm{km}$ with $T = 43\,200\ \mathrm{s}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(3.986×10^5×(43200÷(2π))²)^(1÷3)` → $a$ = **26 610** km.
> 2. `-6378` → $h$ = **20 232** km, a MEO (GPS) orbit.

### P3. A 3 m parabolic receive dish with aperture efficiency 0.55 views a C-band downlink at 4 GHz into a receiver whose system noise temperature is 100 K. Find its gain and G/T, then the C/N0 for an EIRP of 50 dBW over a 38 000 km path, and the C/N in the 36 MHz transponder.

**Given:** D = 3 m; \eta = 0.55; f = 4 GHz; T_{sys} = 100 K; EIRP = 50 dBW; d = 38000 km; B = 36 MHz

**Solution:**

1. $\lambda = c/f = 0.075\ \mathrm{m}$
2. $G = \eta(\pi D/\lambda)^2 = 0.55(\pi \times 3/0.075)^2 = 0.55 \times 15\,791 = 8685$; $G = 10\log_{10}8685 = 39.4\ \mathrm{dBi}$
3. $G/T = 39.4 - 10\log_{10}(100) = 39.4 - 20 = 19.4\ \mathrm{dB/K}$
4. $L_{fs} = 32.44 + 20\log_{10}(4000) + 20\log_{10}(38\,000) = 92.45 + 12.04 + 91.60 = 196.1\ \mathrm{dB}$
5. $C/N_0 = 50 - 196.1 + 19.4 + 228.6 = 101.9\ \mathrm{dBHz}$
6. $C/N = 101.9 - 10\log_{10}(36\times10^{6}) = 101.9 - 75.6 = 26.3\ \mathrm{dB}$

> [!success]- Answer
> **$G = 39.4\ \mathrm{dBi}$, $G/T = 19.4\ \mathrm{dB/K}$, $C/N_0 = 101.9\ \mathrm{dBHz}$, $C/N = 26.3\ \mathrm{dB}$.**

> [!warning] Trap
> Dividing gain by the noise temperature in linear form — $8685/100$ — instead of using the dB form $G - 10\log_{10}T$. The dB/K figure is a difference of two dB quantities, so the 100 K enters as 20 dB, not as 100.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷4×10^9` → $\lambda$ = **0.075** m; `0.55×(π×3÷Ans)² : 10log(Ans)-10log(100)` → $G$ = **8685** → $G/T$ = **19.39** dB/K.
> 2. `32.44+20log(4000)+20log(38000)` → $L_{fs}$ = **196.08** dB.
> 3. `50-196.08+19.39+228.6` → $C/N_0$ = **101.9** dBHz; `-10log(36×10^6)` → $C/N$ = **26.3** dB.

### P4. A ground station sees a GEO satellite at a central angle of 60° from the sub-satellite point. Find the slant range and explain why it exceeds the 35 786 km altitude.

**Given:** h = 35786 km; a = h + R_e = 42164 km; R_e = 6378 km; \psi = 60^\circ

**Solution:**

1. Law of cosines: $d = \sqrt{a^2 + R_e^2 - 2R_e a\cos\psi}$ with $a = h + R_e = 42\,164\ \mathrm{km}$
2. $a^2 = 1.7778\times10^{9}$; $R_e^2 = 4.068\times10^{7}$; $2R_e a\cos60^\circ = 42\,164 \times 6378 = 2.689\times10^{8}$
3. $d^2 = 1.7778\times10^{9} + 0.0407\times10^{9} - 0.2689\times10^{9} = 1.5496\times10^{9}\ \mathrm{km^2}$
4. $d = \sqrt{1.5496\times10^{9}} = 39\,364\ \mathrm{km}$

> [!success]- Answer
> **$d \approx 39\,364\ \mathrm{km}$; about 3 580 km more than 35 786 km.**

> [!warning] Trap
> Reporting 35 786 km as "the" slant range. That number is the ALTITUDE, and equals the slant range only for a station directly under the satellite ($\psi = 0$, elevation 90°). At any real elevation angle the path is longer, which directly increases the downlink $L_{fs}$ and shrinks the link margin.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(42164²+6378²-2×6378×42164×cos(60))` in Deg mode → $d$ = **39 364** km.
> 2. `-35786` → **3 578** km beyond the altitude, which is the slant range only at $\psi$ = 0.

## Traps & Exam Notes

- **Using 24 h instead of the sidereal day for GEO.** $T = 86\,400\ \mathrm{s}$ gives $a = 42\,241\ \mathrm{km}$ and $h = 35\,863\ \mathrm{km}$, about 77 km above the true 35 786 km. The correct period is 86 164 s (23 h 56 min 4 s).
- **Believing any 24-hour orbit is geostationary.** A 24-hour orbit that is inclined or retrograde is *geosynchronous* (it traces a figure-eight or drifts) but not *geostationary*. Stationary requires circular, equatorial AND prograde — matching the direction of the Earth's rotation.
- **Treating 35 786 km as the slant range from any ground station.** It is the altitude, valid as a path length only for elevation 90°. At $\psi = 60^\circ$ the range is 39 364 km, roughly 0.8 dB more loss, and beyond the horizon the satellite is simply not visible.
- **Sign error on the +228.6 constant.** It is $-10\log_{10}k$ with $k = 1.38\times10^{-23}\ \mathrm{J/K}$, so it is ADDED to obtain $C/N_0$ in dBHz. Subtracting it loses 457 dB and makes every link look impossible.
- **Dividing gain by the noise temperature in linear units.** $G/T$ is $G(\mathrm{dB}) - 10\log_{10}T(\mathrm{K})$. A 100 K receiver contributes a 20 dB penalty; writing '8685/100 = 86.85 dB/K' is dimensionally meaningless.
- **Adding uplink and downlink C/N in dB.** Noise temperatures/powers add, so the ratios combine as $\left[(C/N_0)_u^{-1} + (C/N_0)_d^{-1}\right]^{-1}$; the worse hop dominates. '50 dB plus 50 dB' is not 100 dB and not 25 dB — it is 47 dB.
- **Driving a multi-carrier transponder to saturation.** Saturation maximises downlink EIRP for a single carrier, but with several carriers the TWTA intermodulation products land in-band; the tube must be backed off several dB, so the design EIRP is well below the saturated value.
- **Measuring the orbit radius from the Earth's surface.** $a$ in Kepler's law is centre-to-centre. Substituting the 35 786 km altitude for $a$ returns a period of about 20 h, not 23 h 56 min.

## See Also

- [[05_Parabolic_Reflector_Antennas]]
- [[06_FSPL_and_Friis_Transmission_Equation]]
- [[01_Antenna_Parameters_Directivity,_Gain,_EIRP]]
- [[06_Equivalent_Noise_Temperature]]
- [[05_SNR,_Noise_Factor_and_Noise_Figure]]
- [[08_Space_Wave_and_Radio_Horizon]]
- [[11_Radar_Range_Equation_and_Microwave_Links]]

---

[[12_Television_Systems_and_ISDB-T|⬅ 12]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[14_Optical_Fiber_NA,_V_Number_and_Modes|14 ➡]]
