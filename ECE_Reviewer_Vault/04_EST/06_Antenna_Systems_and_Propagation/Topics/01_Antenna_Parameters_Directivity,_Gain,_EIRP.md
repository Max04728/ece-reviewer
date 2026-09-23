---
id: EST-06-01
title: "Antenna Parameters: Directivity, Gain, EIRP"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 1
tier: 2
depth: full
problem_count: 4
prereqs: ["[[04_Reflection_Coefficient_and_VSWR]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Antenna Parameters: Directivity, Gain, EIRP

> [!abstract] Scope
> Compute directivity from beamwidths or effective aperture, convert between directivity and gain, and express radiated power as EIRP or ERP in watts and dBm.

## Core Concept

> [!tip] Intuition
> Directivity answers 'how tightly does this antenna focus?'; gain answers the same question after subtracting the power the antenna wastes as heat. EIRP turns that number into the one figure a link budget actually cares about: the power an ideal isotropic radiator would have to transmit to match this antenna.

**Directivity is a pure pattern property.** Directivity compares the peak radiation intensity of the antenna with the intensity an isotropic radiator would produce from the same total radiated power:
$$D = 4\pi U_{\max}/P_{\mathrm{rad}}$$
dimensionless. It says nothing about losses — an antenna with a perfect pattern but a lossy conductor has exactly the same $D$ as its lossless twin. The isotropic radiator is the reference, $D = 1$ ($0\ \mathrm{dBi}$). A short dipole has $D = 1.5$ ($1.76\ \mathrm{dBi}$) and a half-wave dipole $D = 1.64$ ($2.15\ \mathrm{dBi}$) — two numbers worth memorising, because they are the reference against which every dBd figure is defined.

**Beamwidth gives a fast, approximate directivity.** For a narrow-beam antenna the solid angle of the main lobe is roughly the product of the two half-power beamwidths, so $D \approx 41253/(\theta_E\theta_H)$ with both beamwidths in **degrees** ($41253$ is the number of square degrees in a sphere, $4\pi$ steradians converted). The formula assumes all the radiated power is inside the main lobe — that is, no sidelobes and no spillover — so the true directivity is always slightly *lower* than this estimate. It is nevertheless the standard exam shortcut, and being able to say why the estimate is optimistic is worth marks.

**Gain = efficiency × directivity, and aperture ties it to physics.** $G = kD$, where the radiation efficiency in the range 0 to 1 is given by:
$$k = R_{\mathrm{rad}}/(R_{\mathrm{rad}} + R_{\mathrm{loss}})$$
Gain is what actually gets radiated; directivity is what the pattern promises. Any antenna, lossy or not, obeys $G = 4\pi A_e/\lambda^2$ only when it is lossless — with losses you must write $G = 4\pi A_e\eta/\lambda^2$ if $A_e$ is defined from the physical aperture. The reciprocal relation $A_e = G\lambda^2/(4\pi)$ is the bridge between the pattern world and the physical world, and it is also the receiving-side quantity that appears in the Friis equation.

**EIRP is the number a link budget uses.** $\mathrm{EIRP} = P_t G_t$, the product of transmitted power and transmitting-antenna gain — equivalently the power an isotropic radiator would need to produce the same power density in the peak direction. If gain is quoted in **dBd** (relative to a half-wave dipole) the arithmetic still works, but you must add $2.15\ \mathrm{dB}$ first, because $\mathrm{ERP}$ is defined against the dipole and $\mathrm{EIRP}$ against the isotropic:
$$\mathrm{EIRP} = \mathrm{ERP} \times 1.64$$
and $\mathrm{dBi} = \mathrm{dBd} + 2.15$. Mixing the two references is the most common source of a 2.15 dB error in an otherwise correct budget.

**Working in decibels.** Because EIRP is a product it becomes a sum in dB:
$$\mathrm{EIRP}(\mathrm{dBm}) = P_t(\mathrm{dBm}) + G_t(\mathrm{dBi})$$
and likewise in dBW. The unit of the input power fixes the unit of the answer, because the isotropic reference is carried in the 'i' of dBi: $\mathrm{dBm}$ in gives $\mathrm{dBm}$ out. Power density at a distance then follows from the isotropic picture directly, $S = \mathrm{EIRP}/(4\pi R^2)$, which is the front half of every link budget. Keep three anchors handy:
$$1\ \mathrm{W} = 30\ \mathrm{dBm} = 0\ \mathrm{dBW}$$
a $10\ \mathrm{dB}$ gain multiplies power by ten, and a $3\ \mathrm{dB}$ gain doubles it.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Directivity from radiation intensity | $D = \frac{4\pi U_{\max}}{P_{\mathrm{rad}}}$ | Dimensionless. Uses total radiated power, so it ignores ohmic loss entirely. |
| Directivity from effective aperture | $D = \frac{4\pi A_e}{\lambda^2}$ | A_e in m^2 and lambda in m. Holds for any lossless antenna. |
| Beamwidth estimate of directivity | $D \approx \frac{41253}{\theta_E\,\theta_H}$ | Both half-power beamwidths in degrees. Assumes no sidelobes, so it overestimates D. |
| Gain from directivity | $G = k D$ | k is the radiation efficiency, 0 <= k <= 1. Loss reduces gain, never directivity. |
| Radiation efficiency | $k = \frac{R_{\mathrm{rad}}}{R_{\mathrm{rad}} + R_{\mathrm{loss}}}$ | Resistances in ohms. Includes conductor, dielectric and matching losses. |
| Effective aperture from gain | $A_e = \frac{G\lambda^2}{4\pi} = \frac{D k \lambda^2}{4\pi}$ | The receiving-side area. For a lossless antenna set k = 1. |
| EIRP | $\mathrm{EIRP} = P_t G_t = P_t D_t$ | Second form only for a lossless antenna. Watts, or dBm/dBW in log form. |
| ERP versus EIRP | $\mathrm{ERP} = \frac{\mathrm{EIRP}}{1.64}, \qquad \mathrm{dBi} = \mathrm{dBd} + 2.15$ | ERP references a half-wave dipole, G = 1.64 = 2.15 dBi. Mixing the references costs 2.15 dB. |
| Gain in decibels | $G(\mathrm{dBi}) = 10\log_{10} G$ | G is the dimensionless power ratio. A gain below 1 gives a negative dBi. |
| EIRP in decibels | $\mathrm{EIRP}(\mathrm{dBm}) = P_t(\mathrm{dBm}) + G_t(\mathrm{dBi})$ | A product becomes a sum. dBm in, dBm out; dBW in, dBW out. |
| Power flux density | $S = \frac{\mathrm{EIRP}}{4\pi R^2}$ | W/m^2 at distance R from the antenna, in the peak direction. |
| Reference conversions | $1\ \mathrm{W} = 30\ \mathrm{dBm} = 0\ \mathrm{dBW}$ | Also 3 dB doubles, 10 dB multiplies by ten. Use these to sanity-check every dB answer. |

## Interactive Widget

**Antenna Radiation Pattern Polar**

![[Antenna_Radiation_Pattern_Polar.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An antenna has half-power beamwidths of $20^\circ$ in the E-plane and $25^\circ$ in the H-plane. Estimate its directivity and express it in dBi.

**Given:** theta_E = 20 degrees; theta_H = 25 degrees; narrow-beam antenna

**Solution:**

1. Use the beamwidth estimate: $D \approx 41253/(\theta_E\theta_H)$
2. Product of beamwidths: $\theta_E\theta_H = 20 \times 25 = 500\ \mathrm{deg^2}$
3. $D \approx 41253/500 = 82.51$ (dimensionless)
4. Convert: $D(\mathrm{dBi}) = 10\log_{10}82.51 = 10(1.9165)$
5. $= 19.16\ \mathrm{dBi}$
6. The true directivity is slightly lower than 82.5 because the estimate ignores sidelobes and assumes all power is in the main lobe

> [!success]- Answer
> **$D \approx 82.5$ (dimensionless), or $19.2\ \mathrm{dBi}$ as an upper estimate.**

> [!warning] Trap
> Entering beamwidths in radians. 41253 is the number of square degrees on a sphere, so both beamwidths must be in degrees; using radians gives an answer too small by a factor of about 3283.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `41253÷20÷25` → $D$ = **82.51** (dimensionless; both beamwidths in degrees).
> 2. `10log(Ans)` → **19.16** dBi. Chain them on one line as `41253÷20÷25 : 10log(Ans)` with `ALPHA` `:` between the statements.

### P2. A $100\ \mathrm{W}$ transmitter feeds an antenna with a gain of $20\ \mathrm{dBi}$. Find the input power in dBm, the EIRP in dBm and in kilowatts, and the ERP in dBm and in kilowatts.

**Given:** P_t = 100 W; G_t = 20 dBi; dipole reference factor 1.64 = 2.15 dB

**Solution:**

1. Convert the input power: $P_t = 10\log_{10}(100\times10^{3}) = 10\log_{10}(10^{5}) = 50.00\ \mathrm{dBm}$
2. EIRP is a sum in dB: $\mathrm{EIRP} = 50.00 + 20 = 70.00\ \mathrm{dBm}$
3. Convert back to absolute power: $10^{70/10}\ \mathrm{mW} = 10^{7}\ \mathrm{mW} = 10^{4}\ \mathrm{W} = 10.0\ \mathrm{kW}$
4. ERP references a half-wave dipole, which has $G = 2.15\ \mathrm{dBi}$: $\mathrm{ERP} = 70.00 - 2.15 = 67.85\ \mathrm{dBm}$
5. Convert: $10^{6.785}\ \mathrm{mW} = 6.10\times10^{3}\ \mathrm{W} = 6.10\ \mathrm{kW}$
6. Cross-check in absolute units: $10\ \mathrm{kW}/1.64 = 6.10\ \mathrm{kW}$ — agrees

> [!success]- Answer
> **$P_t = 50.0\ \mathrm{dBm}$; $\mathrm{EIRP} = 70.0\ \mathrm{dBm} = 10.0\ \mathrm{kW}$; $\mathrm{ERP} = 67.85\ \mathrm{dBm} = 6.10\ \mathrm{kW}$.**

> [!warning] Trap
> Quoting 10 kW as the ERP. The same hardware gives 10 kW EIRP but only 6.10 kW ERP, because ERP is measured against a half-wave dipole that already concentrates power by 1.64. Labelling the wrong reference is a 2.15 dB (64 %) error.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10log(100×10^3) : Ans+20 : 10^(Ans÷10) : Ans÷1000` — chain with `ALPHA` `:`: $P_t$ = **50.00** dBm → EIRP = **70.00** dBm → **10.0** kW.
> 2. `70-2.15 : 10^(Ans÷10)÷1000` → ERP = **67.85** dBm → **6.10** kW (the absolute check $10/1.64$ agrees).

### P3. A $50\ \mathrm{W}$ transmitter drives an antenna rated at $13\ \mathrm{dBd}$. Find the gain in dBi, the EIRP in dBm, and the resulting power flux density at $10\ \mathrm{km}$.

**Given:** P_t = 50 W; G_t = 13 dBd; R = 10 km; 1 W = 30 dBm

**Solution:**

1. Convert the reference first: $G_t = 13 + 2.15 = 15.15\ \mathrm{dBi}$
2. Input power: $P_t = 10\log_{10}(50\times10^{3}) = 10(4.69897) = 46.99\ \mathrm{dBm}$
3. $\mathrm{EIRP} = P_t + G_t = 46.99 + 15.15 = 62.14\ \mathrm{dBm}$
4. Convert to watts: $10^{62.14/10}\ \mathrm{mW} = 1.637\times10^{6}\ \mathrm{mW} = 1.637\ \mathrm{kW}$
5. Flux density: $S = \mathrm{EIRP}/(4\pi R^2) = 1637/(4\pi (10^{4})^2)$
6. $= 1637/(1.2566\times10^{9}) = 1.303\times10^{-6}\ \mathrm{W/m^2} = 1.30\ \mathrm{\mu W/m^2}$

> [!success]- Answer
> **$G_t = 15.15\ \mathrm{dBi}$; $\mathrm{EIRP} = 62.14\ \mathrm{dBm} = 1.64\ \mathrm{kW}$; $S = 1.30\ \mathrm{\mu W/m^2}$ at 10 km.**

> [!warning] Trap
> Adding 13 dBd directly to dBm and calling the result EIRP. dBd is referenced to a dipole, so it must be converted to dBi (+2.15 dB) before it can be summed with a power in dBm referenced to an isotropic radiator.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `13+2.15 : 10log(50×10^3) : Ans+15.15 : 10^(Ans÷10)÷1000` → $G_t$ = **15.15** dBi → $P_t$ = **46.99** dBm → EIRP = **62.14** dBm → **1.637** kW.
> 2. `Ans÷(4π×(10^4)^2)` → $S$ = **1.303×10^-6** W/m² = **1.30** µW/m².
>
> 10 km enters as `(10^4)^2` metres. Squaring the kilometres instead costs a factor of 10^6.

### P4. A dish antenna has an effective aperture of $1.00\ \mathrm{m^2}$ at $10\ \mathrm{GHz}$. Find its directivity, express it in dBi, and estimate the product of its two half-power beamwidths.

**Given:** A_e = 1.00 m^2; f = 10 GHz; c = 3e8 m/s; lossless antenna

**Solution:**

1. Wavelength: $\lambda = c/f = 3\times10^{8}/10^{10} = 0.03\ \mathrm{m}$
2. Directivity: $D = 4\pi A_e/\lambda^2 = 4\pi(1.00)/(0.03)^2$
3. $= 12.566/9\times10^{-4} = 1.396\times10^{4}$ (about 13 963)
4. Convert: $D(\mathrm{dBi}) = 10\log_{10}(1.396\times10^{4}) = 10(4.1449) = 41.45\ \mathrm{dBi}$
5. Beamwidth product from the estimate: $\theta_E\theta_H \approx 41253/D = 41253/13963 = 2.96\ \mathrm{deg^2}$
6. So the beam is roughly $1.5^\circ \times 2^\circ$ — and the real directivity will be marginally below 41.45 dBi because the estimate ignores sidelobes

> [!success]- Answer
> **$D = 1.40\times10^{4} = 41.5\ \mathrm{dBi}$, with $\theta_E\theta_H \approx 2.96\ \mathrm{deg^2}$.**

> [!warning] Trap
> Treating the physical dish area as $A_e$. The effective aperture is always smaller than the physical aperture because illumination tapers toward the rim; for a dish $A_{\mathrm{phys}} = A_e/\eta_{ap}$ with $\eta_{ap}$ typically 0.5–0.7, so this 1 m² effective dish needs roughly 1.5–2 m² of metal.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷10×10^9` → $\lambda$ = **0.03** m.
> 2. `4π×1÷Ans²` → $D$ = **13 963**; `10log(Ans)` → **41.45** dBi.
> 3. `41253÷13963` → $\theta_E\theta_H$ = **2.95** deg², i.e. a beam near $1.5^\circ\times2^\circ$.

## Traps & Exam Notes

- **Confusing EIRP with ERP.** EIRP references an isotropic radiator, ERP references a half-wave dipole with $G = 1.64 = 2.15\ \mathrm{dBi}$. Using $P_t D$ when the question asked for ERP overstates the answer by 2.15 dB, and using $P_t G/1.64$ when it asked for EIRP understates it.
- **Adding dBd to dBm without converting.** $\mathrm{dBd} + 2.15 = \mathrm{dBi}$ must happen *before* any sum with a power in dBm or dBW. Skipping it is the single most common EIRP arithmetic error.
- **Feeding beamwidths in radians to 41253.** The constant is in square degrees. Radians give a directivity low by a factor of $(180/\pi)^2 \approx 3283$, which usually looks absurd but is sometimes mistaken for a genuine narrow-beam result.
- **Forgetting that the beamwidth estimate overestimates directivity.** Sidelobes carry real power that the formula assigns to the main lobe. If an exam offers both the estimate and a measured value, the measured one is the lower.
- **Thinking a lossy antenna has lower directivity.** Loss reduces gain through $G = kD$ but leaves the pattern and hence $D$ untouched. Only the radiation efficiency changes.
- **Applying $G = 4\pi A_e/\lambda^2$ to a lossy antenna.** That form is the *lossless* relation. With loss you need $G = 4\pi A_e\eta/\lambda^2$ or, equivalently, $A_e = G\lambda^2/(4\pi)$ where $G$ already includes the efficiency.
- **Mixing power units inside one dB sum.** $P_t$ in dBm plus $G$ in dBi gives dBm; dBW plus dBi gives dBW. Adding a dBW to a dBm silently introduces a 30 dB error.
- **Assuming $A_e$ is frequency-independent.** $A_e = G\lambda^2/(4\pi)$ shrinks as $\lambda^2$ at fixed gain. A dipole's effective area at 100 MHz is nine times its value at 300 MHz.

## See Also

- [[02_Radiation_Resistance,_Efficiency_and_Capture_Area]]
- [[03_Hertzian_and_Half-Wave_Dipoles]]
- [[06_FSPL_and_Friis_Transmission_Equation]]

---

⬅ *start* · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Radiation_Resistance,_Efficiency_and_Capture_Area|02 ➡]]
