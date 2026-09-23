---
id: GEAS-04-03
title: "Air Pollution and Criteria Pollutants"
part: "03_GEAS"
area: "04_Environmental_Sci_and_PH_Laws"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Ecosystems_and_Energy_Flow]]"]
tags: ["ece", "geas", "environmental_sci_and_ph_laws"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Air Pollution and Criteria Pollutants

> [!abstract] Scope
> Classify air pollutants, apply the Philippine ambient standards and AQI, compute stack and control-device emission numbers, and recognise the meteorology that turns a plume into a smog episode.

## Core Concept

> [!tip] Intuition
> Air pollution is a mass balance problem: whatever a stack or tailpipe releases is diluted by the wind and mixed by turbulence, and the concentration at your nose is that emission divided by the volume the atmosphere has spread it through. Control devices simply cut the numerator.

**Primary vs secondary pollutants.** A **primary** pollutant is emitted directly as such — $\mathrm{CO}$, $\mathrm{SO_2}$, $\mathrm{NO}$, most particulate matter, lead, hydrocarbons. A **secondary** pollutant is formed in the atmosphere from precursors — ozone ($\mathrm{O_3}$) from $\mathrm{NO_x}$ plus volatile organic compounds under sunlight, $\mathrm{NO_2}$ from oxidation of $\mathrm{NO}$, sulfuric and nitric acid from $\mathrm{SO_2}$ and $\mathrm{NO_x}$, and photochemical smog (PAN) as the end product. In the Philippines the **six criteria pollutants** are carbon monoxide, nitrogen dioxide, sulfur dioxide, ozone, lead and particulate matter (TSP, PM10, PM2.5); RA 8749 Section 12 sets the national ambient guideline values for them and the DENR may add hazardous air pollutants.

**Philippine ambient air quality guideline values (RA 8749 §12).** Short-term values are 230 µg/Ncm TSP (24 h), 150 µg/Ncm PM10 (24 h), 180 µg/Ncm or 0.07 ppm $\mathrm{SO_2}$ (24 h), 150 µg/Ncm or 0.08 ppm $\mathrm{NO_2}$ (24 h), 35 ppm CO (1 h), 0.16 mg/Ncm lead (3 months), and 140 µg/Ncm or 0.07 ppm photochemical oxidants as $\mathrm{O_3}$ (1 h). Long-term values are 90 µg/Ncm TSP, 60 µg/Ncm PM10, 80 µg/Ncm or 0.03 ppm $\mathrm{SO_2}$, 0.03 ppm $\mathrm{NO_2}$, 9 ppm CO (8 h) and 1.5 µg/Ncm lead, all on one-year averaging except lead (3 months). DAO 2016-08 adds a PM2.5 guideline of 25 µg/Ncm (24 h) and 15 µg/Ncm (annual). Concentrations in Philippine law are quoted per **normal cubic metre** — at 25 degrees C and 1 atm — not per cubic metre at stack temperature, and that is a standard unit trap.

**Sources and health effects.** The big three source categories are mobile (vehicles, the dominant source in Metro Manila), stationary/fuel combustion (power plants, boilers, furnaces), and area sources (open burning, fugitive dust, construction). Health effects follow particle size: PM10 reaches the thorax, PM2.5 reaches the alveoli and is the deadliest, carrying heavy metals and PAHs; $\mathrm{CO}$ binds haemoglobin about 210 times more strongly than oxygen, forming carboxyhaemoglobin; $\mathrm{SO_2}$ is a bronchoconstrictor and a precursor of acid aerosol; $\mathrm{NO_2}$ causes pulmonary oedema at high dose and is a smog precursor; $\mathrm{O_3}$ is a deep-lung irritant that damages crops as well; lead is a neurotoxin that is why leaded gasoline was banned under RA 8749 §29.

**Meteorology: inversions and dispersion.** Under a normal lapse rate, temperature falls with height and warm surface air rises, so a plume mixes and dilutes. A **temperature inversion** reverses that: a warm layer sits above cooler surface air and acts as a lid, so the mixing height collapses and pollutants accumulate. A **radiation inversion** forms on calm clear nights as the ground radiates heat away; a **subsidence inversion** forms aloft in a high-pressure system; **marine** inversions form when cool sea air slides under warm land air. The two classic plume behaviours are **looping** (unstable, strong convection, fumigation downwind) and **fanning** (stable, plume spreads horizontally and does not reach the ground) — a fanning plume under an inversion is the dangerous morning-after case.

**Control devices.** For particulate matter: **gravity settler** (large particles, 40-70% efficient), **cyclone** (centrifugal, low cost, fine-particle limited, roughly 70-90%), **baghouse / fabric filter** (99%+ on sub-micron dust, the workhorse, but temperature and moisture limited), **electrostatic precipitator** (99%+ collection from the electric field and corona charging, low pressure drop, high capital, sensitive to resistivity), and **wet scrubber** (contact with water, also removes soluble gases such as $\mathrm{SO_2}$, but produces a sludge and a visible plume). For gases: **absorption** (scrubbing into a liquid), **adsorption** (activated carbon, often for VOCs and dioxins), **condensation**, and **incineration/thermal oxidation** for combustibles. Device choice follows the Deutsch equation for ESPs and the overall efficiency relation for any device.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Collection / removal efficiency | $\eta = \frac{C_{in} - C_{out}}{C_{in}} \times 100\%$ | Both concentrations must be on the same basis (dry, same O2, same Ncm). Using raw stack m3 for one and Ncm for the other invalidates the result. |
| Mass emission rate | $\dot{m} = C \times Q$ | C in mass per volume, Q in volume per time; convert Q from m3/min to m3/h before reporting kg/h. Wet vs dry, actual vs normal, is where marks are lost. |
| Ideal-gas conversion of a volume | $V_2 = V_1\frac{P_1}{P_2}\frac{T_2}{T_1}$ | T must be absolute (kelvin). Stack gas at 200 C and 1 atm occupies about 1.6 times its normal volume — normalise before comparing with a standard. |
| ppm to mg/m3 at normal conditions | $\mathrm{mg/m^3} = \mathrm{ppm} \times \frac{M}{24.45}$ | 24.45 L/mol is the molar volume at 25 C, 1 atm — the value used by Philippine normal conditions. At 0 C the molar volume is 22.4 L/mol, giving a 9% difference. |
| Gaussian plume (ground level, centreline) | $C(x) = \frac{Q}{\pi u \sigma_y \sigma_z}\exp\!\left(-\frac{H^2}{2\sigma_z^{2}}\right)$ | Q in g/s, u in m/s, sigma in m gives g/m3. Multiply by 1e6 for µg/m3. H is effective release height (stack height plus plume rise). |
| Gaussian plume (ground level, off-centre) | $C(x,y,0) = \frac{Q}{\pi u \sigma_y \sigma_z}\exp\!\left(-\frac{y^2}{2\sigma_y^{2}}\right)\exp\!\left(-\frac{H^2}{2\sigma_z^{2}}\right)$ | Ground-level concentration is with reflection at z = 0; for an elevated receptor add a second exponential image term. |
| Deutsch equation (electrostatic precipitator) | $\eta = 1 - \exp\!\left(-\frac{w A}{Q}\right)$ | w = migration (drift) velocity, A = collecting plate area, Q = gas flow. A/Q is the specific collection area (SCA), in s/m. |
| Migration velocity (Stokes regime) | $w = \frac{q_p E}{3\pi \mu d_p}$ | Charged particle of diameter d_p in field E. Larger particles and higher field collect better; resistivity extremes spoil it. |
| Stokes settling velocity | $v_t = \frac{g d_p^{2}(\rho_p - \rho_g)}{18\mu}$ | Valid for particles below about 100 µm (Re < 1). Convert µm to m; a 10 µm particle settles about 100 times faster than a 1 µm particle. |
| Partition/cyclone cut diameter | $d_{50} \propto \sqrt{\frac{9\mu b}{2\pi N v_i (\rho_p-\rho_g)}}$ | Half the mass of particles of size d50 is collected. More turns N, higher inlet velocity or larger density lowers d50 (better collection). |
| AQI interpolation | $I = \frac{I_{hi}-I_{lo}}{BP_{hi}-BP_{lo}}(C - BP_{lo}) + I_{lo}$ | Use the correct breakpoint table first (PM2.5, PM10, O3, CO, SO2, NO2 differ). The AQI is the highest sub-index among the pollutants. |
| CO2 emission factor from fuel carbon | $EF_{CO_2} = \frac{44}{12}\times \mathrm{mass\ of\ C\ in\ fuel}$ | 44/12 = 3.667. This is for complete combustion; leaking CH4 or CO reduces CO2 but raises GWP-weighted emissions. |
| Acid formation stoichiometry | $\mathrm{SO_2 + \tfrac12 O_2 + H_2O \to H_2SO_4}$ | 1 mol SO2 (64 g) makes 1 mol H2SO4 (98 g). In practice the gas-phase and aqueous pathways both occur, catalysed by metals and soot. |
| RA 8749 lead agency | $DENR-EMB\ \mathrm{is\ the\ primary\ implementing\ agency}$ | The EMB was converted from a staff bureau to a line bureau under RA 8749 §34. Airsheds are governed by boards chaired by the DENR Secretary (§9). |
| RA 8749 incineration ban | $municipal,\ biomedical\ and\ hazardous\ waste\ incineration\ prohibited$ | Section 20 of RA 8749. This is not the same as the ban on open burning of solid waste under RA 9003 §48. |

## Worked Problems

### P1. A PM2.5 monitor reports $48.0\ \mu\mathrm{g/m^3}$ (24-hour average). Using the US EPA breakpoints for PM2.5 — 0-12.0 gives 0-50, 12.1-35.4 gives 51-100, 35.5-55.4 gives 101-150, 55.5-150.4 gives 151-200 — compute the AQI and state the category.

**Given:** C = 48.0 ug/m3 PM2.5 (24 h); breakpoints: 0-12.0 -> 0-50; 12.1-35.4 -> 51-100; 35.5-55.4 -> 101-150; 55.5-150.4 -> 151-200

**Solution:**

1. Locate the correct band: 48.0 falls in 35.5-55.4, so I_lo = 101, I_hi = 150, BP_lo = 35.5, BP_hi = 55.4
2. Apply the interpolation: I = (150 - 101)/(55.4 - 35.5) x (48.0 - 35.5) + 101
3. Compute the slope: 49 / 19.9 = 2.4623
4. I = 2.4623 x 12.5 + 101 = 30.8 + 101 = 131.8, which rounds to 132

> [!success]- Answer
> **AQI about 132 — 'Unhealthy for Sensitive Groups'.**

> [!warning] Trap
> Using the PM10 breakpoints (or the annual PM2.5 guideline of 15 µg/m3) with a 24-hour PM2.5 value. Each pollutant and each averaging time has its own breakpoint table; the AQI is the highest sub-index across all measured pollutants.

### P2. A stack releases $\mathrm{SO_2}$ at $60\ \mathrm{g/s}$ from an effective height of $50\ \mathrm{m}$. The wind is steady at $4.0\ \mathrm{m/s}$ and at the receptor distance the dispersion coefficients are $\sigma_y = 55\ \mathrm{m}$ and $\sigma_z = 30\ \mathrm{m}$. Find the ground-level centreline concentration.

**Given:** Q = 60 g/s; H = 50 m; u = 4.0 m/s; sigma_y = 55 m; sigma_z = 30 m

**Solution:**

1. Write the Gaussian plume equation: C = (Q / (pi u sigma_y sigma_z)) exp(-H^2 / (2 sigma_z^2))
2. Denominator: pi x 4.0 x 55 x 30 = 20,734 m3/s
3. Pre-exponential factor: 60 / 20,734 = 2.894e-3 g/m3
4. Exponent: -50^2 / (2 x 30^2) = -2500 / 1800 = -1.3889, so exp(-1.3889) = 0.2494
5. C = 2.894e-3 x 0.2494 = 7.218e-4 g/m3
6. Convert to µg/m3: 7.218e-4 x 1e6 = 722 µg/m3

> [!success]- Answer
> **About $722\ \mu\mathrm{g/m^3}$ of $\mathrm{SO_2}$ at ground level.**

> [!warning] Trap
> Reporting g/m3 (7.2e-4) when the standard is in µg/m3, or omitting the exponential entirely and reporting 2,894 µg/m3. The exponential is the ground-level reflection term; dropping it overstates the concentration about fourfold.

### P3. A coal-fired plant burns coal containing 1.5% sulfur at $200\ \mathrm{t/day}$, and 70% of the sulfur is oxidised to $\mathrm{H_2SO_4}$ in the plume. What mass of sulfuric acid is formed per day?

**Given:** coal = 200 t/day; S = 1.5% by mass; M(S) = 32.07 g/mol; M(H2SO4) = 98.08 g/mol; 70% conversion

**Solution:**

1. Mass of sulfur burned = 200 t/day x 0.015 = 3.0 t S/day
2. Moles: 3.0 t = 3000 kg; 3000 / 32.07 = 93.5 kmol S/day
3. S oxidises to SO2 then to H2SO4, 1 mol S giving 1 mol acid; 70% converts so acid = 0.70 x 93.5 = 65.5 kmol/day
4. Mass of acid = 65.5 kmol/day x 98.08 kg/kmol = 6,424 kg/day, i.e. about 6.4 t/day

> [!success]- Answer
> **About 6,420 kg of $\mathrm{H_2SO_4}$ per day (6.4 t/day).**

> [!warning] Trap
> Converting sulfur to acid mass 1:1 and getting 2.1 t/day. The molar mass ratio 98.08/32.07 = 3.06 must be applied, and the conversion fraction 70% applied once — not twice.

### P4. A cement kiln exhausts $50{,}000\ \mathrm{Ncm/h}$ of gas carrying $1500\ \mathrm{mg/Ncm}$ of particulate matter. A baghouse is guaranteed 99.2% collection efficiency. Find the dust emitted per hour and the outlet concentration.

**Given:** Q = 50,000 Ncm/h; inlet = 1500 mg/Ncm; efficiency = 99.2%

**Solution:**

1. Inlet mass rate = 1500 mg/Ncm x 50,000 Ncm/h = 7.5e7 mg/h = 75.0 kg/h
2. Collected = 0.992 x 75.0 = 74.4 kg/h
3. Emitted = 75.0 - 74.4 = 0.60 kg/h
4. Outlet concentration = 0.6 kg/h / 50,000 Ncm/h = 1.2e-5 kg/Ncm = 12.0 mg/Ncm

> [!success]- Answer
> **0.60 kg/h emitted, giving an outlet concentration of $12.0\ \mathrm{mg/Ncm}$.**

> [!warning] Trap
> Applying the efficiency to the concentration backwards — reporting 1500 x 0.992 = 1488 mg/Ncm as the outlet. The outlet is the *uncollected* fraction: 1500 x (1 - 0.992) = 12 mg/Ncm.

### P5. An electrostatic precipitator treats $20\ \mathrm{m^3/s}$ of gas with a migration velocity of $0.06\ \mathrm{m/s}$. What specific collection area and total plate area are needed for 98% efficiency?

**Given:** Q = 20 m3/s; w = 0.06 m/s; target efficiency = 98%

**Solution:**

1. Deutsch equation: eta = 1 - exp(-wA/Q), so exp(-wA/Q) = 1 - 0.98 = 0.02
2. Take natural logs: -wA/Q = ln(0.02) = -3.912
3. Specific collection area A/Q = 3.912 / 0.06 = 65.2 s/m
4. Total plate area A = 65.2 x 20 = 1304 m2

> [!success]- Answer
> **SCA = $65.2\ \mathrm{s/m}$ and a total collecting area of about $1.30\times10^{3}\ \mathrm{m^2}$.**

> [!warning] Trap
> Using log base 10 instead of the natural log: log10(0.02) = -1.699 gives SCA = 28 s/m and about 566 m2, less than half the correct area. The Deutsch equation contains e, so the inverse is ln.

## Traps & Exam Notes

- Quoting the Clean Air Act as RA 9003 — RA 9003 is the Ecological Solid Waste Management Act; RA 8749 is the Philippine Clean Air Act of 1999, signed 23 June 1999 and effective in 2000.
- Calling the EMB a 'staff bureau'. RA 8749 §34 converted the Environmental Management Bureau from a staff bureau into a **line** bureau under the DENR, and the DENR (through the EMB) is the lead agency; the Pollution Adjudication Board (PAB) is the body that imposes the fines.
- Treating ozone as a pollutant everywhere. Stratospheric ozone is protective and is what the Montreal Protocol protects; tropospheric (ground-level) ozone is a secondary criteria pollutant formed from $\mathrm{NO_x}$ + VOCs in sunlight.
- Reporting concentrations per stack cubic metre when the standard is per normal cubic metre (25 degrees C, 1 atm). Normalising a 200 C flue gas can move a value by tens of percent, and the whole compliance conclusion with it.
- Calling $\mathrm{CO_2}$ a criteria pollutant under RA 8749. Carbon dioxide is excluded from the statutory definition of 'air pollutant' in §5(a); the criteria pollutants are CO, $\mathrm{NO_2}$, $\mathrm{SO_2}$, $\mathrm{O_3}$, Pb and PM.
- Assigning the incineration ban to the wrong law. The ban on incinerating municipal, biomedical and hazardous waste is RA 8749 §20 (Clean Air Act); the ban on open burning of solid waste is RA 9003 §48.
- Assuming high removal efficiency means a clean stack regardless of particle size. A cyclone at 85% may still pass all the PM2.5; efficiency must be quoted against the size fraction the standard regulates.
- Reading a fanning plume as 'good dispersion'. Fanning indicates a stable atmosphere with the plume pinned aloft and no vertical mixing — the following morning's fumigation brings the whole plume to ground level at once.

## See Also

- [[08_RA_8749_Clean_Air_Act]]
- [[04_Greenhouse_Effect,_Ozone_and_Acid_Rain]]
- [[02_Biogeochemical_Cycles]]
- [[01_Ecosystems_and_Energy_Flow]]

---

[[02_Biogeochemical_Cycles|⬅ 02]] · [[_MOC_Environmental_Sci_and_PH_Laws|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Greenhouse_Effect,_Ozone_and_Acid_Rain|04 ➡]]
