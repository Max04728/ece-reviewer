---
id: EST-06-09
title: "Sky Wave and Ionospheric Layers"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 9
tier: 2
depth: full
problem_count: 4
prereqs: ["[[07_Ground_Wave_Propagation]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Sky Wave and Ionospheric Layers

> [!abstract] Scope
> How the ionosphere bends an HF wave back to earth, which layer does the work at a given hour, and why there is a frequency ceiling.

## Core Concept

> [!tip] Intuition
> The ionosphere is a gas of free electrons, and a gas of free electrons has a refractive index below 1 - so a radio wave entering it bends away from the vertical, and enough bending turns the ray back to earth with no mirror involved anywhere.

**Refraction, not reflection.** Solar ultraviolet and X-ray photons strip electrons from atoms in the upper atmosphere and leave a weakly ionised plasma. For a wave of frequency $f$ in a plasma of $N$ electrons per cubic metre the refractive index is $n = \sqrt{1-81N/f^{2}}$. Because $N>0$ the index is below unity, so the wave speeds up inside the plasma and bends *away from the vertical*; the bending accumulates as the ray climbs into denser ionisation until the ray turns over where $n \to 0$. The ionosphere is therefore a graded refracting medium with a frequency-dependent turning height, not a reflecting surface. Setting $n = 0$ defines the **plasma frequency** $f_p = 9\sqrt{N}$, and a wave of frequency $f$ sent straight up is returned only if $f \le f_p$ at the top of its trajectory. That last statement is the origin of the whole idea of a critical frequency, and later of the MUF.

**The layers, from the bottom up.** **D** sits at about 60-90 km, exists only in daylight, and is far too thin to return HF - but its electrons collide constantly with neutral molecules, so it *absorbs* medium and high frequencies. That absorption is why AM broadcast sky wave is a night-time mode. **E** occupies roughly 100-120 km, is present by day, and returns HF over medium hops; dense sporadic-E patches can occasionally return VHF. **F1** at about 180-240 km appears only in daylight and is strongest in summer, while **F2** at 250-400 km carries the highest electron density and is the workhorse for long-haul HF. After sunset F1 disappears and the F region merges into a single layer whose height rises, leaving F2 as the only refracting layer on a night circuit.

**Diurnal, seasonal and solar-cycle control.** Ionisation follows the solar zenith angle, so it peaks at local noon, is weak just before dawn, and changes with season as the sub-solar point migrates. The D layer vanishes completely at night while F2 merely thins and lifts. Over 11 years the sunspot number swings the F2 density by roughly a factor of three or four, which drags the usable frequency band up and down with it; a frequency that closed a circuit at solar minimum may be far below the absorption-limited floor at solar maximum, and frequencies that worked at maximum fail at minimum. This is why frequency planning for HF is a prediction problem, not a fixed assignment.

**Virtual height.** An ionosonde does not measure height directly - it measures the echo delay $t$ and reports the **virtual height** $h' = ct/2$. The pulse slows as it enters the plasma (group velocity is $c\,n$), so the round trip takes longer than a free-space trip to the same altitude, and $h'$ always exceeds the true height $h$; the difference is the group retardation, tens of kilometres in the F region. Virtual height is a useful fiction rather than a lie: it is exactly the height that a triangular ray path of straight segments would have to reach to explain the measured delay, so it is the correct height to use in the flat-earth skip geometry.

**Absorption, fading and the skip zone.** Non-deviative absorption scales as the electron density times the collision frequency divided by $f^{2}$, so it falls as the *square* of frequency: high frequencies punch through the daytime D layer while low ones are swallowed. Remove the D layer at night and the low bands open. Fading comes from multipath - the ordinary and extraordinary magneto-ionic modes, two or more hops, and interference between them - and from the polarisation rotation the magnetic field imposes on the wave. Finally, the ground wave from a transmitter fades out within tens or hundreds of kilometres, and the first sky wave returns at the skip distance; the silent annulus between them is the **skip zone**, and it is a normal feature of every HF circuit, not a fault.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Refractive index of the ionosphere | $n = \sqrt{1 - \dfrac{81N}{f^{2}}}$ | N in electrons per cubic metre, f in hertz. The index is always below 1, and negative-in-the-formula means the wave does not propagate (it turns). |
| Plasma frequency | $f_p = 9\sqrt{N}$ | The density at which n = 0. Hz when N is per cubic metre; per-cm3 data must be multiplied by 10^6 first. |
| Critical frequency of a layer | $f_c = 9\sqrt{N_{\max}}$ | The highest frequency returned at vertical incidence. Reported per layer as f_oF2, f_oE, f_oF1. |
| Electron density from a critical frequency | $N_{\max} = \left(\dfrac{f_c}{9}\right)^{2}$ | Inverse of the critical-frequency relation; N comes out in electrons per cubic metre when f_c is in Hz. |
| Secant law (MUF) | $\mathrm{MUF} = f_c\sec\theta_i = \dfrac{f_c}{\cos\theta_i}$ | theta_i is the angle of incidence measured from the vertical at the layer. Oblique incidence raises the usable frequency above f_c. |
| MUF in terms of take-off angle | $\mathrm{MUF} = \dfrac{f_c}{\sin\Delta}$ | Delta is the transmitter take-off angle from the horizontal, so Delta = 90 - theta_i. Low take-off angles give high MUFs and long hops. |
| Virtual height | $h' = \dfrac{c\,t}{2}$ | Echo delay t in seconds. Always greater than the true height because the pulse is retarded inside the plasma. |
| D-layer absorption | $L \propto \dfrac{1}{f^{2}}$ | Absorption in dB scales inversely with the square of frequency on a fixed path: tripling f cuts the loss by a factor of nine. |

## Worked Problems

### P1. An ionosonde reports a maximum F2 electron density of $N_{\max} = 1.2\times10^{12}$ electrons per cubic metre. Find the critical frequency of the layer.

**Given:** N_max = 1.2e12 electrons/m^3; vertical incidence

**Solution:**

1. $f_c = 9\sqrt{N_{\max}}$
2. $\sqrt{1.2\times10^{12}} = 1.0954\times10^{6}$
3. $f_c = 9 \times 1.0954\times10^{6} = 9.859\times10^{6}\ \mathrm{Hz}$
4. $f_c \approx 9.86\ \mathrm{MHz}$

> [!success]- Answer
> **$f_c \approx 9.86\ \mathrm{MHz}$**

> [!warning] Trap
> Using a density quoted per cubic centimetre without converting. For $N = 1.2\times10^{6}\ \mathrm{cm^{-3}}$ the formula returns 9.86 kHz - three orders of magnitude low - because 9 is calibrated for electrons per cubic metre.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `9×√(1.2×10^12)` → $f_c$ = **9.859×10^6** Hz.
> 2. `Ans÷10^6` → **9.86** MHz. A density quoted per cm³ needs `×10^6` before the root.

### P2. The F2 layer has $f_c = 9.86\ \mathrm{MHz}$ and a signal reaches it at an angle of incidence of $30^{\circ}$ measured from the vertical. Find the maximum usable frequency and the transmitter take-off angle.

**Given:** f_c = 9.86 MHz; theta_i = 30 degrees from the vertical

**Solution:**

1. Secant law: $\mathrm{MUF} = \dfrac{f_c}{\cos\theta_i}$
2. $\cos 30^{\circ} = 0.8660$
3. $\mathrm{MUF} = \dfrac{9.86}{0.8660} = 11.38\ \mathrm{MHz}$
4. Take-off angle: $\Delta = 90^{\circ} - 30^{\circ} = 60^{\circ}$ above the horizontal

> [!success]- Answer
> **$\mathrm{MUF} \approx 11.4\ \mathrm{MHz}$, launched at $60^{\circ}$ take-off.**

> [!warning] Trap
> Multiplying by the cosine instead of dividing: $9.86 \times 0.866 = 8.54\ \mathrm{MHz}$. Oblique incidence can only *raise* the returned frequency above $f_c$; a value below $f_c$ means the ratio was inverted.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `9.86÷cos(30)` in Deg mode → MUF = **11.4** MHz (11.385 exact).
> 2. `90-30` → take-off $\Delta$ = **60°**; `9.86×cos(30)` = **8.54** MHz is the inverted-ratio trap.

### P3. A pulse transmitted vertically returns after $t = 2\ \mathrm{ms}$. Find the virtual height of reflection, and use the layer's $f_c = 9.86\ \mathrm{MHz}$ to find the peak electron density.

**Given:** t = 2 ms round-trip delay; f_c = 9.86 MHz; vertical incidence

**Solution:**

1. $h' = \dfrac{c\,t}{2} = \dfrac{(3\times10^{8})(2\times10^{-3})}{2}$
2. $h' = 3\times10^{5}\ \mathrm{m} = 300\ \mathrm{km}$
3. Invert the critical-frequency relation: $N_{\max} = \left(\dfrac{f_c}{9}\right)^{2}$
4. $N_{\max} = \left(\dfrac{9.86\times10^{6}}{9}\right)^{2} = (1.0956\times10^{6})^{2} = 1.20\times10^{12}$ electrons per cubic metre

> [!success]- Answer
> **$h' = 300\ \mathrm{km}$ and $N_{\max} \approx 1.2\times10^{12}\ \mathrm{m^{-3}}$.**

> [!warning] Trap
> Reporting $h' = ct = 600\ \mathrm{km}$ by dropping the factor 2 - the pulse went up *and* came back. Also note that 300 km is the virtual height: the true reflection height is lower, because the pulse spent part of the delay crawling through the plasma.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `×2×10^-3÷2` → $h'$ = **3.00×10^5** m = **300** km.
> 2. `(9.86×10^6÷9)²` → $N_\max$ = **1.200×10^12** electrons/m³.

### P4. A 3 MHz signal suffers 18 dB of D-layer absorption on a daytime path. What absorption would a 9 MHz signal suffer over the same path, and why does the higher frequency get through?

**Given:** L(3 MHz) = 18 dB; same path, same layer, same time

**Solution:**

1. Absorption obeys $L \propto 1/f^{2}$
2. Frequency ratio: $\dfrac{3}{9} = \dfrac{1}{3}$, and $\left(\dfrac{1}{3}\right)^{2} = \dfrac{1}{9}$
3. $L(9\ \mathrm{MHz}) = 18 \times \dfrac{1}{9} = 2\ \mathrm{dB}$
4. The 9 MHz signal therefore arrives 16 dB stronger through the D layer than the 3 MHz signal

> [!success]- Answer
> **$L = 2\ \mathrm{dB}$ at 9 MHz - a 16 dB improvement over 3 MHz.**

> [!warning] Trap
> Scaling absorption linearly with frequency ($18/3 = 6\ \mathrm{dB}$) or as $1/f$ instead of $1/f^{2}$. The square is the whole reason daytime HF operators move *up* the band, and it is the single most examinable consequence of the D layer.

## Traps & Exam Notes

- **Entering megahertz into $n = \sqrt{1-81N/f^{2}}$.** The constant 81 assumes $f$ in hertz and $N$ per cubic metre. With $f = 10\ \mathrm{MHz}$ typed as 10, the fraction is $10^{12}$ times too large and the refractive index becomes imaginary - a sure sign of the unit slip.
- **Calling the mechanism reflection.** The ionosphere refracts, with a turning height that depends on frequency. A mirror picture cannot explain why the MUF exists, why a higher frequency reflects from higher up, or why above the MUF the wave escapes through the layer entirely.
- **Expecting the D layer to return signals.** D does not refract HF usefully; it absorbs it, and it exists only in daylight. The night-time disappearance of D is exactly why 40 m, 80 m and the AM broadcast band open after dark and why 160 m is a night band.
- **Forgetting that only F2 survives the night.** F1 is a daytime, mostly summer layer, and it merges into F2 after sunset. A night path has one refracting layer, so the same circuit needs a different frequency and a different hop geometry after dark.
- **Treating virtual height as a physical height.** $h' = ct/2$ includes group retardation, so the true reflection height is always lower. Plotting $h'$ as the layer altitude puts the ionosphere tens of kilometres too high and skews every skip-distance calculation that uses it.

## See Also

- [[10_Critical_Frequency,_MUF_and_Skip_Distance]]
- [[07_Ground_Wave_Propagation]]
- [[08_Space_Wave_and_Radio_Horizon]]

---

[[08_Space_Wave_and_Radio_Horizon|⬅ 08]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Critical_Frequency,_MUF_and_Skip_Distance|10 ➡]]
