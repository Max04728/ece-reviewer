---
id: GEAS-04-05
title: "Water Quality: BOD, COD, DO, TDS"
part: "03_GEAS"
area: "04_Environmental_Sci_and_PH_Laws"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Biogeochemical_Cycles]]"]
tags: ["ece", "geas", "environmental_sci_and_ph_laws"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Water Quality: BOD, COD, DO, TDS

> [!abstract] Scope
> Compute oxygen demand and dissolved-oxygen depletion in a river — BOD5, ultimate BOD, CBOD/NBOD, k temperature correction, mass-balance dilution and the Streeter-Phelps sag — and match the result against the Philippine water body classes.

## Core Concept

> [!tip] Intuition
> A river has an oxygen bank account. Wastewater deposits a debt of biodegradable organic matter; bacteria withdraw oxygen to pay it down while the surface simultaneously re-aerates the account. The DO sag curve is the running balance, and the critical point is where withdrawals finally stop outrunning deposits.

**The oxygen-demand family.** **BOD** (biochemical oxygen demand) is the dissolved oxygen consumed by microorganisms oxidising organic matter, measured at 20 degrees C in the dark over 5 days — hence **BOD5**, reported in mg/L. **Ultimate BOD** ($L_0$, also written $\mathrm{BOD_u}$ or UBOD) is the total demand if incubation ran to completion, roughly 20 days; BOD5 is typically 60-70% of it. **CBOD** is the carbonaceous demand (organic carbon oxidised to $\mathrm{CO_2}$) and **NBOD** is the nitrogenous demand (ammonia oxidised to nitrate by *Nitrosomonas* and *Nitrobacter*), so $L_0 = \mathrm{CBOD} + \mathrm{NBOD}$. The 5-day test suppresses nitrification with an inhibitor, so a standard BOD5 is essentially CBOD; the nitrogenous demand appears after about 8-10 days. **COD** (chemical oxygen demand) is the oxygen equivalent of everything oxidisable by a strong chemical oxidant (dichromate, acid, heat) and includes non-biodegradable material, so $\mathrm{COD} \geq \mathrm{BOD_u}$ always, and the ratio BOD/COD indicates biodegradability — above about 0.5 the waste is readily treatable biologically, below about 0.3 it is not. **DO** (dissolved oxygen) is the actual oxygen present; saturation at 20 degrees C and 1 atm is about 9.1 mg/L, falling as temperature and salinity rise and as altitude rises.

**The BOD exertion model and its temperature dependence.** First-order decay gives the oxygen still demanded at time $t$ as $L_t = L_0 e^{-kt}$ and the oxygen already exerted as $y_t = L_0(1 - e^{-kt})$; BOD5 is $y_5$. The rate constant is temperature-dependent by the van't Hoff-Arrhenius relation $k_T = k_{20}\theta^{\,T-20}$ with $\theta = 1.047$ for the deoxygenation constant between 20 and 30 degrees C (and about 1.024 for the reaeration constant $k_2$ over the same range — using 1.047 for $k_2$ is a classic error). Both $k$ and $k_2$ increase with temperature, but $k$ increases faster, so warm rivers sag deeper.

**Mixing, dilution and the Streeter-Phelps sag.** Where a waste discharge meets a river, the conservative parameters mix by mass balance:
$$C_{mix} = (Q_r C_r + Q_w C_w)/(Q_r + Q_w)$$
and temperature mixes the same way. Downstream, the **Streeter-Phelps** equation combines deoxygenation at rate $k_1$ with reaeration at rate $k_2$ against the saturation deficit $D = DO_{sat} - DO$:
$$D_t = \frac{k_1 L_0}{k_2 - k_1}(e^{-k_1 t} - e^{-k_2 t}) + D_0 e^{-k_2 t}$$
The deficit peaks at the critical time:
$$t_c = \frac{1}{k_2 - k_1}\ln\!\left[\frac{k_2}{k_1}\left(1 - \frac{D_0(k_2-k_1)}{k_1 L_0}\right)\right]$$
The minimum DO is then $DO_{sat} - D_{max}$. Upstream of the outfall the river is clean, the DO falls to a minimum at $t_c$, then recovers as reaeration wins — the classic sag curve. Where the deficit is zero at the outfall and $k_1 L_0/k_2$ is the asymptote, $D_{max}$ approaches $k_1 L_0 / k_2$.

**Other parameters and the Philippine classes.** **TDS** (total dissolved solids) is the filterable residue — minerals in solution, measured by evaporating a filtered sample; **TSS** (total suspended solids, or non-filterable residue) is the material caught on the filter, and it is TSS that causes turbidity, siltation and smothering of spawning beds. **Turbidity** (NTU) is an optical surrogate for suspended matter and a red flag for pathogens. **Coliform** bacteria are the indicator organisms for faecal contamination; the standard test is the multiple-tube fermentation most probable number (MPN per 100 mL). Under RA 9275 §5 and DAO 2016-08, water bodies are classified by best beneficial use: **Class AA** — public water supply requiring only disinfection; **Class A** — public water supply requiring treatment, plus primary contact recreation; **Class B** — secondary contact recreation and fishery for propagation; **Class C** — fishery for propagation and growth, recreation, and industrial supply after treatment; **Class D** — agriculture, irrigation, livestock, and industrial cooling. Marine waters use the parallel series **SA** (protected, coral-reef and mariculture), **SB** (shellfish and bathing), **SC** (fishery, recreation, shipping) and **SD** (navigation and industrial). Class C is the class cited most often in ECC and discharge cases: BOD5 not more than 20 mg/L, DO at least 5 mg/L, total coliform not more than 5,000 MPN/100 mL, and pH in the range 6.5-8.5.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| BOD remaining at time t | $L_t = L_0 e^{-kt}$ | First-order depletion of the remaining demand. L_0 is the ultimate BOD; k is the deoxygenation constant in day^-1, at 20 C unless stated. |
| BOD exerted at time t | $y_t = L_0\left(1 - e^{-kt}\right)$ | y_5 is what a BOD5 test reports. Note y_5 = L_0 - L_5; conflating the two is the most common BOD error. |
| Five-day BOD fraction | $\frac{\mathrm{BOD_5}}{L_0} = 1 - e^{-5k}$ | At k = 0.20/day this is 63%; the usual textbook range is 60-70%. A high ratio means fast, easily degraded waste. |
| Ultimate BOD from BOD5 | $L_0 = \frac{\mathrm{BOD_5}}{1 - e^{-5k}}$ | Requires k. Using BOD5 = L0 (ignoring the 5-day fraction) overstates the ultimate demand that drives the sag curve. |
| Carbonaceous vs nitrogenous demand | $L_0 = \mathrm{CBOD} + \mathrm{NBOD}$ | Standard BOD5 is carbonaceous because nitrification is inhibited; the nitrogenous stage begins around day 8-10. |
| COD relationship | $\mathrm{COD} \geq \mathrm{BOD_u};\quad \mathrm{biodegradability} = \frac{\mathrm{BOD_5}}{\mathrm{COD}}$ | Ratio above about 0.5 = readily biodegradable; below about 0.3 = poorly biodegradable. COD covers non-biodegradable matter that BOD never will. |
| Temperature correction of k | $k_T = k_{20}\,\theta^{\,T-20},\quad \theta = 1.047$ | For the deoxygenation constant between 20 and 30 C. Multiply, do not add: k20 = 0.20 gives k25 = 0.20 x 1.047^5 = 0.251/day. |
| Temperature correction of k2 | $k_{2,T} = k_{2,20}\,\theta^{\,T-20},\quad \theta \approx 1.024$ | The reaeration constant uses a smaller coefficient than deoxygenation. Using 1.047 for both is a standard exam trap. |
| Dilution mass balance | $C_{mix} = \frac{Q_r C_r + Q_w C_w}{Q_r + Q_w}$ | Conservative mixing only (BOD, TDS, most metals). Divide by total flow, never by the river flow alone. For BOD this is the initial condition, not the downstream value. |
| Temperature mixing | $T_{mix} = \frac{Q_r T_r + Q_w T_w}{Q_r + Q_w}$ | Flow-weighted, same form as concentration. The mixed temperature then resets k and the DO saturation value. |
| DO saturation deficit | $D = DO_{sat} - DO$ | DO_sat is about 9.1 mg/L at 20 C, 1 atm, fresh water; lower at higher temperature, salinity or altitude. All Streeter-Phelps terms are deficits, not DO values. |
| Streeter-Phelps sag | $D_t = \frac{k_1 L_0}{k_2 - k_1}\left(e^{-k_1 t} - e^{-k_2 t}\right) + D_0 e^{-k_2 t}$ | k1 = deoxygenation, k2 = reaeration, both day^-1. Requires k1 != k2; for the singular case use the limiting form D = (k L0 t + D0)e^{-kt}. |
| Critical time | $t_c = \frac{1}{k_2 - k_1}\ln\!\left[\frac{k_2}{k_1}\left(1 - \frac{D_0(k_2-k_1)}{k_1 L_0}\right)\right]$ | Time of maximum deficit (minimum DO). If D0 = 0 the bracket reduces to k2/k1. |
| Maximum deficit at D0 = 0 | $D_{max} \to \frac{k_1 L_0}{k_2}$ | Asymptotic ceiling. If k1 L0/k2 is small the river never sags below the standard; if it exceeds the allowable deficit, treatment is mandatory. |
| Minimum dissolved oxygen | $\mathrm{DO}_{min} = \mathrm{DO}_{sat} - D_{max}$ | Compare against the class limit (Class C: DO at least 5 mg/L). A negative value is physically impossible and signals an arithmetic or unit error. |
| Mass emission load | $\mathrm{load} = Q\,C$ | Watch units: m3/s x mg/L = g/s; multiply by 86.4 to get kg/day. This is how a discharge limit converts into a permit condition. |
| Water body classes | $AA,\ A,\ B,\ C,\ D\ (\mathrm{fresh});\ SA,\ SB,\ SC,\ SD\ (\mathrm{marine})$ | DAO 2016-08 classification by best beneficial use. AA = public supply with disinfection only; A = public supply with treatment plus primary contact; B = secondary contact and fishery propagation; C = fishery, recreation, industrial after treatment; D = agriculture, irrigation, cooling. |
| Class C guideline (fishery) | $\mathrm{BOD_5} \leq 20\ \mathrm{mg/L};\ \mathrm{DO} \geq 5\ \mathrm{mg/L};\ \mathrm{pH}\ 6.5-8.5$ | The class most cited in ECC and discharge cases; also total coliform <= 5,000 MPN/100 mL. Class AA/A are stricter on BOD and coliform. |
| General effluent standard (BOD5) | $\mathrm{BOD_5}\ \mathrm{limit:}\ 50\ \mathrm{mg/L}\ (\mathrm{Class\ A\ receiving\ water})$ | General Effluent Standards under DAO 2016-08 (amended by DAO 2021-19): limits are set by the class of the receiving water, not by the discharger. Verify the current table before quoting Class B/C numbers. |
| General effluent standard (pH and temperature) | $\mathrm{pH}\ 6.0-9.0;\ \Delta T \leq 3\ ^\circ\mathrm{C}\ \mathrm{rise}$ | Applies to all effluent classes. The pH window for effluent (6.0-9.0) is wider than the Class C in-stream window (6.5-8.5); do not swap them. |
| Discharge permit requirement | $RA\ 9275\ (2004)\ \S 27(c)\ \mathrm{and}\ (i)$ | DENR-EMB issues the discharge permit; LLDA administers the Laguna de Bay management area. Fines run P10,000 to P200,000 per day of violation under Section 28. |

## Worked Problems

### P1. A wastewater sample has an ultimate BOD of $40.0\ \mathrm{mg/L}$ and a deoxygenation constant $k = 0.20\ \mathrm{day^{-1}}$ at 20 degrees C. Find BOD5 and the BOD remaining after 5 days.

**Given:** L0 = 40.0 mg/L; k = 0.20 /day at 20 C; t = 5 days

**Solution:**

1. Compute the exponential: e^(-kt) = e^(-0.20 x 5) = e^(-1.0) = 0.3679
2. BOD remaining: L5 = L0 x 0.3679 = 40.0 x 0.3679 = 14.7 mg/L
3. BOD exerted (this is BOD5): y5 = L0 - L5 = 40.0 - 14.7 = 25.3 mg/L
4. Check with the other form: y5 = 40.0 x (1 - 0.3679) = 40.0 x 0.6321 = 25.3 mg/L

> [!success]- Answer
> **$\mathrm{BOD_5} = 25.3\ \mathrm{mg/L}$; $14.7\ \mathrm{mg/L}$ of demand remains.**

> [!warning] Trap
> Reporting the remaining 14.7 mg/L as BOD5. BOD5 is the oxygen *consumed*, so it is the exerted part (25.3 mg/L), not what is left. The two sum to 40.0 mg/L.

### P2. A river has a flow of $2.0\ \mathrm{m^3/s}$ with BOD5 of $20\ \mathrm{mg/L}$ at $25\ ^\circ\mathrm{C}$ and DO of $6.5\ \mathrm{mg/L}$. A plant discharges $0.05\ \mathrm{m^3/s}$ of treated effluent with BOD5 of $1500\ \mathrm{mg/L}$ at $30\ ^\circ\mathrm{C}$. Find the downstream BOD5 and the mixed temperature (assume conservative mixing).

**Given:** Qr = 2.0 m3/s; BODr = 20 mg/L; Tr = 25 C; DO_r = 6.5 mg/L; Qw = 0.05 m3/s; BODw = 1500 mg/L; Tw = 30 C

**Solution:**

1. Total flow = 2.0 + 0.05 = 2.05 m3/s
2. BOD numerator = (2.0 x 20) + (0.05 x 1500) = 40 + 75 = 115 (mg/L)(m3/s)
3. Downstream BOD5 = 115 / 2.05 = 56.1 mg/L
4. Temperature numerator = (2.0 x 25) + (0.05 x 30) = 50.0 + 1.5 = 51.5
5. Mixed temperature = 51.5 / 2.05 = 25.1 C

> [!success]- Answer
> **Downstream $\mathrm{BOD_5} = 56.1\ \mathrm{mg/L}$ and mixed temperature $25.1\ ^\circ\mathrm{C}$.**

> [!warning] Trap
> Dividing by the river flow of 2.0 m3/s instead of the total 2.05 m3/s, and reporting 57.5 mg/L. It looks harmless at 2.5% effluent, but the same slip on a small stream with a large discharge can swing the answer by 50%.

### P3. A Class C river has a low flow of $0.60\ \mathrm{m^3/s}$ and an upstream BOD5 of $2.0\ \mathrm{mg/L}$. A slaughterhouse wants to discharge $15\ \mathrm{L/s}$ of effluent at $400\ \mathrm{mg/L}$ BOD5. Find the downstream BOD5 and state whether the 20 mg/L Class C guideline is met.

**Given:** Qr = 0.60 m3/s; BODr = 2.0 mg/L; Qw = 15 L/s = 0.015 m3/s; BODw = 400 mg/L; Class C guideline = 20 mg/L BOD5

**Solution:**

1. Convert the effluent flow: 15 L/s = 0.015 m3/s
2. Total flow = 0.60 + 0.015 = 0.615 m3/s
3. BOD numerator = (0.60 x 2.0) + (0.015 x 400) = 1.2 + 6.0 = 7.2 (mg/L)(m3/s)
4. Downstream BOD5 = 7.2 / 0.615 = 11.7 mg/L
5. Compare with 20 mg/L: 11.7 < 20, so the guideline is met

> [!success]- Answer
> **Downstream $\mathrm{BOD_5} = 11.7\ \mathrm{mg/L}$ — inside the Class C guideline of 20 mg/L.**

> [!warning] Trap
> Mixing units: taking 15 L/s as 15 m3/s gives about 385 mg/L downstream, and taking it as 0.15 m3/s gives 82 mg/L and a false violation. Convert L/s to m3/s by dividing by 1000 before anything else.

### P4. For a river with $k_1 = 0.25\ \mathrm{day^{-1}}$, $k_2 = 0.45\ \mathrm{day^{-1}}$, an initial deficit $D_0 = 2.0\ \mathrm{mg/L}$ and an ultimate BOD $L_0 = 20\ \mathrm{mg/L}$, find the critical time and the maximum deficit.

**Given:** k1 = 0.25 /day; k2 = 0.45 /day; D0 = 2.0 mg/L; L0 = 20 mg/L

**Solution:**

1. k2 - k1 = 0.20 /day
2. Inside the log: (k2/k1) x (1 - D0(k2-k1)/(k1 L0)) = (0.45/0.25) x (1 - (2.0 x 0.20)/(0.25 x 20))
3. = 1.80 x (1 - 0.4/5.0) = 1.80 x (1 - 0.08) = 1.80 x 0.92 = 1.656
4. t_c = (1/0.20) x ln(1.656) = 5 x 0.5045 = 2.52 days
5. Deficit: D = (k1 L0/(k2-k1))(e^(-k1 t) - e^(-k2 t)) + D0 e^(-k2 t)
6. = (0.25 x 20/0.20)(e^(-0.630) - e^(-1.134)) + 2.0 e^(-1.134)
7. = 25 x (0.5326 - 0.3218) + 2.0 x 0.3218 = 25 x 0.2108 + 0.644 = 5.27 + 0.64
8. D_max = 5.91 mg/L; with DO_sat = 9.1 mg/L, DO_min = 9.1 - 5.91 = 3.2 mg/L

> [!success]- Answer
> **$t_c = 2.5$ days, $D_{max} = 5.9\ \mathrm{mg/L}$, minimum $\mathrm{DO} = 3.2\ \mathrm{mg/L}$ — below the Class C minimum of 5 mg/L.**

> [!warning] Trap
> Reporting $D_{max}$ as the dissolved oxygen, and using the saturation deficit $k_1 L_0/k_2 = 11.1$ mg/L instead of evaluating the sag at $t_c$. The asymptote 11.1 exceeds DO_sat and is not the answer; the deficit is 5.9 mg/L, leaving 3.2 mg/L of DO.

### P5. A discharge with ultimate BOD $L_0 = 45\ \mathrm{mg/L}$ at 20 degrees C is being modelled in a river at 25 degrees C. If $k_{20} = 0.23\ \mathrm{day^{-1}}$, find the deoxygenation constant at 25 degrees C and the BOD5 that would be measured at that temperature.

**Given:** L0 = 45 mg/L; k20 = 0.23 /day; theta = 1.047; T = 25 C

**Solution:**

1. Temperature correction: k25 = k20 x theta^(T-20) = 0.23 x 1.047^5
2. 1.047^5 = 1.258
3. k25 = 0.23 x 1.258 = 0.289 /day
4. BOD5 at 25 C: y5 = 45 x (1 - e^(-0.289 x 5)) = 45 x (1 - e^(-1.445))
5. e^(-1.445) = 0.2357, so y5 = 45 x 0.7643 = 34.4 mg/L
6. For comparison at 20 C: y5 = 45 x (1 - e^(-1.15)) = 45 x 0.6834 = 30.8 mg/L

> [!success]- Answer
> **$k_{25} = 0.289\ \mathrm{day^{-1}}$ and $\mathrm{BOD_5} = 34.4\ \mathrm{mg/L}$ at 25 degrees C (against 30.8 mg/L at 20 degrees C).**

> [!warning] Trap
> Converting the measured BOD5 itself rather than the rate constant, or using theta = 1.024 (the reaeration coefficient) for deoxygenation. The BOD5 value changes only because k changes; applying 1.047 directly to 30.8 mg/L is wrong.

## Traps & Exam Notes

- Calling BOD a measure of the organic matter present. BOD measures the **oxygen consumed** by bacteria oxidising that matter; the same organic load gives a different BOD at a different temperature or with a different seed.
- Reading BOD5 as the ultimate BOD. BOD5 is only 60-70% of $L_0$; using it as $L_0$ in a Streeter-Phelps calculation understates the sag by a third or more.
- Mixing the two temperature-coefficient values. $\theta = 1.047$ applies to the deoxygenation constant $k_1$ and $\theta \approx 1.024$ to the reaeration constant $k_2$; using 1.047 for both makes reaeration appear to speed up faster than it does.
- Reporting the DO deficit as the DO. Streeter-Phelps computes $D = DO_{sat} - DO$; the answer is $DO_{min} = DO_{sat} - D_{max}$, and a deficit that exceeds DO_sat (or a negative DO) means the arithmetic or the units have gone wrong.
- Treating COD as interchangeable with BOD. $\mathrm{COD} \geq \mathrm{BOD_u}$ always, because COD also oxidises non-biodegradable matter; a BOD/COD ratio below about 0.3 tells you biological treatment will not work well, not that the waste is weak.
- Dividing a dilution mass balance by the river flow only. The denominator is $Q_r + Q_w$; at low dilution ratios the error is small, at high effluent fractions it is severe.
- Quoting effluent limits by the wrong criterion. General Effluent Standards under DAO 2016-08 are keyed to the class of the **receiving water**, while the class guideline (Class C: BOD5 <= 20 mg/L, DO >= 5 mg/L, pH 6.5-8.5) applies **in-stream**; the effluent pH window is 6.0-9.0, which is wider than the in-stream window.
- Forgetting that the 5-day BOD test is run in the dark. Light would let algae photosynthesise and add oxygen, corrupting the oxygen-consumption measurement.

## See Also

- [[09_RA_9275_Clean_Water_Act]]
- [[06_Solid,_Hazardous_and_E-Waste]]
- [[02_Biogeochemical_Cycles]]
- [[03_Air_Pollution_and_Criteria_Pollutants]]

---

[[04_Greenhouse_Effect,_Ozone_and_Acid_Rain|⬅ 04]] · [[_MOC_Environmental_Sci_and_PH_Laws|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Solid,_Hazardous_and_E-Waste|06 ➡]]
