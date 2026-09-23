---
title: "Environmental Sci and PH Laws — Drill"
type: drill
area: 04_Environmental_Sci_and_PH_Laws
part: 03_GEAS
seed: 1
count: 8
pool: 20
updated: 2026-09-23
---

# Environmental Sci and PH Laws — Practice Drill

**8 problems** drawn from a pool of 20 across 4 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 04_Environmental_Sci_and_PH_Laws --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. For a river with $k_1 = 0.25\ \mathrm{day^{-1}}$, $k_2 = 0.45\ \mathrm{day^{-1}}$, an initial deficit $D_0 = 2.0\ \mathrm{mg/L}$ and an ultimate BOD $L_0 = 20\ \mathrm{mg/L}$, find the critical time and the maximum deficit.

**Given:** k1 = 0.25 /day; k2 = 0.45 /day; D0 = 2.0 mg/L; L0 = 20 mg/L

> [!success]- Answer
> **$t_c = 2.5$ days, $D_{max} = 5.9\ \mathrm{mg/L}$, minimum $\mathrm{DO} = 3.2\ \mathrm{mg/L}$ — below the Class C minimum of 5 mg/L.**

> [!warning] Trap
> Reporting $D_{max}$ as the dissolved oxygen, and using the saturation deficit $k_1 L_0/k_2 = 11.1$ mg/L instead of evaluating the sag at $t_c$. The asymptote 11.1 exceeds DO_sat and is not the answer; the deficit is 5.9 mg/L, leaving 3.2 mg/L of DO.

<sub>from GEAS-04-05</sub>

### 2. A Class C river has a low flow of $0.60\ \mathrm{m^3/s}$ and an upstream BOD5 of $2.0\ \mathrm{mg/L}$. A slaughterhouse wants to discharge $15\ \mathrm{L/s}$ of effluent at $400\ \mathrm{mg/L}$ BOD5. Find the downstream BOD5 and state whether the 20 mg/L Class C guideline is met.

**Given:** Qr = 0.60 m3/s; BODr = 2.0 mg/L; Qw = 15 L/s = 0.015 m3/s; BODw = 400 mg/L; Class C guideline = 20 mg/L BOD5

> [!success]- Answer
> **Downstream $\mathrm{BOD_5} = 11.7\ \mathrm{mg/L}$ — inside the Class C guideline of 20 mg/L.**

> [!warning] Trap
> Mixing units: taking 15 L/s as 15 m3/s gives about 385 mg/L downstream, and taking it as 0.15 m3/s gives 82 mg/L and a false violation. Convert L/s to m3/s by dividing by 1000 before anything else.

<sub>from GEAS-04-05</sub>

### 3. Atmospheric $\mathrm{CO_2}$ rises from 280 ppm (pre-industrial) to 420 ppm. Using $\Delta F = 5.35\ln(C/C_0)$, find the radiative forcing in $\mathrm{W/m^2}$.

**Given:** C0 = 280 ppm; C = 420 ppm; coefficient = 5.35 W/m2

> [!success]- Answer
> **About $2.17\ \mathrm{W/m^2}$.**

> [!warning] Trap
> Using log base 10 instead of the natural log: log10(1.5) = 0.176 gives 0.94 W/m2, less than half the correct value. The formula is written with ln and must be evaluated with ln.

<sub>from GEAS-04-04</sub>

### 4. A cement kiln exhausts $50{,}000\ \mathrm{Ncm/h}$ of gas carrying $1500\ \mathrm{mg/Ncm}$ of particulate matter. A baghouse is guaranteed 99.2% collection efficiency. Find the dust emitted per hour and the outlet concentration.

**Given:** Q = 50,000 Ncm/h; inlet = 1500 mg/Ncm; efficiency = 99.2%

> [!success]- Answer
> **0.60 kg/h emitted, giving an outlet concentration of $12.0\ \mathrm{mg/Ncm}$.**

> [!warning] Trap
> Applying the efficiency to the concentration backwards — reporting 1500 x 0.992 = 1488 mg/Ncm as the outlet. The outlet is the *uncollected* fraction: 1500 x (1 - 0.992) = 12 mg/Ncm.

<sub>from GEAS-04-03</sub>

### 5. A generator produces $3.5\ \mathrm{t/month}$ of spent pickling liquor (acidic). A hazardous-waste treater can solidify it at a 30% waste-to-feed ratio, so that the resulting monolithic blocks are 30% waste by mass. What mass of solidified product must be landfilled per month, and what mass of cementitious feed is added?

**Given:** waste = 3.5 t/month; waste fraction of product = 30% by mass

> [!success]- Answer
> **About $11.7\ \mathrm{t/month}$ of solidified product, made up with about $8.2\ \mathrm{t/month}$ of cementitious feed.**

> [!warning] Trap
> Reading the 30% as an additive fraction and reporting 3.5 x 0.30 = 1.05 t of product (which is smaller than the waste — physically impossible). Solidification increases mass, so the product must exceed the waste mass.

<sub>from GEAS-04-06</sub>

### 6. A wastewater sample has an ultimate BOD of $40.0\ \mathrm{mg/L}$ and a deoxygenation constant $k = 0.20\ \mathrm{day^{-1}}$ at 20 degrees C. Find BOD5 and the BOD remaining after 5 days.

**Given:** L0 = 40.0 mg/L; k = 0.20 /day at 20 C; t = 5 days

> [!success]- Answer
> **$\mathrm{BOD_5} = 25.3\ \mathrm{mg/L}$; $14.7\ \mathrm{mg/L}$ of demand remains.**

> [!warning] Trap
> Reporting the remaining 14.7 mg/L as BOD5. BOD5 is the oxygen *consumed*, so it is the exerted part (25.3 mg/L), not what is left. The two sum to 40.0 mg/L.

<sub>from GEAS-04-05</sub>

### 7. A stack releases $\mathrm{SO_2}$ at $60\ \mathrm{g/s}$ from an effective height of $50\ \mathrm{m}$. The wind is steady at $4.0\ \mathrm{m/s}$ and at the receptor distance the dispersion coefficients are $\sigma_y = 55\ \mathrm{m}$ and $\sigma_z = 30\ \mathrm{m}$. Find the ground-level centreline concentration.

**Given:** Q = 60 g/s; H = 50 m; u = 4.0 m/s; sigma_y = 55 m; sigma_z = 30 m

> [!success]- Answer
> **About $722\ \mu\mathrm{g/m^3}$ of $\mathrm{SO_2}$ at ground level.**

> [!warning] Trap
> Reporting g/m3 (7.2e-4) when the standard is in µg/m3, or omitting the exponential entirely and reporting 2,894 µg/m3. The exponential is the ground-level reflection term; dropping it overstates the concentration about fourfold.

<sub>from GEAS-04-03</sub>

### 8. A power plant burns coal containing 1.5% sulfur at a rate of $200\ \mathrm{t/day}$, and 70% of the sulfur is converted to sulfuric acid in the plume. What mass of $\mathrm{H_2SO_4}$ is formed per day?

**Given:** coal = 200 t/day; S = 1.5% by mass; M(S) = 32.07 g/mol; M(H2SO4) = 98.08 g/mol; 70% conversion

> [!success]- Answer
> **About $6.42\ \mathrm{t}$ of $\mathrm{H_2SO_4}$ per day.**

> [!warning] Trap
> Treating sulfur and sulfuric acid as equal masses and reporting 2.1 t/day. The molar mass ratio 98.08/32.07 = 3.06 nearly triples the answer, and the 70% conversion applies to the sulfur, not to the acid.

<sub>from GEAS-04-04</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| GEAS-04-03 | Air Pollution and Criteria Pollutants | 5 |
| GEAS-04-04 | Greenhouse Effect, Ozone and Acid Rain | 5 |
| GEAS-04-05 | Water Quality: BOD, COD, DO, TDS | 5 |
| GEAS-04-06 | Solid, Hazardous and E-Waste | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
