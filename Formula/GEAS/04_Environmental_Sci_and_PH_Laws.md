---
title: Environmental Sci and PH Laws
part: GEAS
tags: [ece, geas, formula-sheet]
topics: 13
---

## Part A — Ecology and Pollution Science

### 1. Ecosystems and Energy Flow

**Trophic transfer ★** — $E$ in J or kcal·m⁻²·yr⁻¹; about 10% of energy passes to the next level.

$$E_{n+1} = 0.10\,E_n,\qquad \text{Ecological efficiency} = \frac{E_{n+1}}{E_n}\times100\ (\%),\qquad N_t = N_0e^{rt}$$

**Productivity and growth** — $r$ in s⁻¹, $t$ in s, biomass in g·m⁻²·day⁻¹.

$$GPP = NPP + R,\qquad NPP = GPP - R,\qquad r = \frac{\Delta N}{N\Delta t},\qquad t_{\text{double}} = \frac{\ln 2}{r}$$

$$\text{Primary productivity} = \frac{\text{biomass produced}}{\text{area}\times\text{time}}$$

**Trophic pyramid:** producers → primary consumers → secondary → tertiary consumers.
Biomass and numbers shrink at each level through respiratory loss, not only consumption.

**Abiotic vs biotic factors ★**

| Factor type | Definition | Examples |
|---|---|---|
| Abiotic | non-living physical and chemical components | light, temperature, water, pH, salinity, nutrients |
| Biotic | living components of the ecosystem | predators, competitors, decomposers, food supply |

**Biosphere ★** — the global zone of life: the land, water and lower atmosphere where organisms live.

**Primary vs secondary succession ★** — primary succession colonises newly formed barren substrate (bare rock, lava, glacial till) that carries no soil.
Secondary succession re-colonises a disturbed site where soil and a seed bank remain.

**Carrying capacity and logistic growth ★** — $N$ = population size, $K$ = carrying capacity (maximum sustainable population), $r$ = intrinsic rate of increase in s⁻¹.

$$\frac{dN}{dt} = rN\left(1-\frac{N}{K}\right),\qquad N(t) = \frac{K}{1+\left(\frac{K-N_0}{N_0}\right)e^{-rt}}$$

**Conditions:** the 10% rule is a terrestrial average; upwelling and aquatic chains can reach 15–20%; logistic growth assumes constant $K$, no immigration and no age structure.

> [!tip] High-yield ★
> If producers fix 10,000 kcal, the tertiary consumer gets about $10{,}000(0.1)^3 = 10$ kcal. Count the transfers, not the levels.

---

### 2. Biogeochemical Cycles

**Carbon cycle:** $\text{CO}_2 + \text{H}_2\text{O} \rightleftharpoons \text{CH}_2\text{O} + \text{O}_2$ — photosynthesis releases O$_2$, respiration and combustion return CO$_2$.
**Nitrogen steps ★:** fixation → ammonification → nitrification → denitrification → assimilation.

$$2\text{NH}_4^+ + 3\text{O}_2 \to 2\text{NO}_2^- + 4\text{H}^+ + 2\text{H}_2\text{O}\ \text{(nitrification)}$$

$$\text{NO}_3^- \to \text{NO}_2^- \to \text{NO} \to \text{N}_2\text{O} \to \text{N}_2\ \text{(denitrification)}$$

**Phosphorus cycle:** rock → soil → biota → sediment; it has **no gas phase**.

| Cycle | Main reservoir | Often limiting in | Human impact |
|---|---|---|---|
| Carbon | atmosphere, ocean | — | CO$_2$ warming |
| Nitrogen | atmosphere (78%) | marine | fertilizer, N$_2$O, eutrophication |
| Phosphorus | rock, sediment | freshwater | detergents, runoff, algal blooms |
| Sulfur | rock, atmosphere | — | acid deposition |
| Water | ocean, ice | arid regions | irrigation, dams |

**Conditions:** residence time $\tau = \frac{\text{amount in reservoir}}{\text{flux}}$ (yr); phosphorus has no atmospheric step, so it limits freshwater productivity.

> [!warning] Exam trap
> Nitrogen limits **marine** systems; phosphorus limits **freshwater**. Reversing that pair is the standard distractor.

---

### 3. Air Pollution and Criteria Pollutants

![](https://www.youtube.com/watch?v=_dTtvtlct9k)

*Video: Air Pollution — Bozeman Science, 9:25*

**Six criteria pollutants ★:** particulate matter (PM$_{10}$, PM$_{2.5}$), ground-level ozone (O$_3$), carbon monoxide (CO), sulfur dioxide (SO$_2$), nitrogen dioxide (NO$_2$), lead (Pb).
**Unit conversion ★** — $M$ = molar mass in g/mol, 24.45 L/mol at 25 °C and 1 atm.

$$\text{mg/m}^3 = \text{ppm}\times\frac{M}{24.45},\qquad \text{ppm} = \text{mg/m}^3\times\frac{24.45}{M}$$

**Air Quality Index**

$$AQI = \frac{I_{\text{hi}}-I_{\text{lo}}}{C_{\text{hi}}-C_{\text{lo}}}\left(C_p - C_{\text{lo}}\right) + I_{\text{lo}},\qquad \text{good} \le 50,\ \text{moderate}\ 51\text{–}100$$

**Gaussian plume** — $Q$ in g/s, $u$ in m/s, $\sigma_y,\sigma_z$ in m, $H$ = effective stack height in m.

$$C = \frac{Q}{2\pi u\sigma_y\sigma_z}\,e^{-y^2/2\sigma_y^2}\left(e^{-(z-H)^2/2\sigma_z^2}+e^{-(z+H)^2/2\sigma_z^2}\right)$$

**Main sources:** CO and NO$_x$ from vehicles; SO$_2$ from sulfur-bearing fuel; PM from combustion and dust; O$_3$ photochemical from NO$_x$ + VOC; Pb historically from leaded gasoline.
**Conditions:** 24.45 L/mol at 25 °C (22.41 L/mol at 0 °C); the plume model assumes steady state, flat terrain and no chemical reaction.

> [!tip] High-yield ★
> Ozone is a **secondary** pollutant — formed when NO$_x$ and VOCs react in sunlight, which is why smog peaks in the afternoon.

---

### 4. Greenhouse Effect, Ozone and Acid Rain

![](https://www.youtube.com/watch?v=SN5-DnOHQmE)

*Video: What Is the Greenhouse Effect? — NASA Space Place, 2:30*

**Global warming potential ★** — $m_i$ in mass units, GWP dimensionless relative to CO$_2$.

$$\text{CO}_2\text{e} = \sum m_i\,GWP_i,\qquad \lambda = \frac1S\ \text{(K per W/m}^2\text{)}$$

**GWPs (100-year):** CO$_2$ 1, CH$_4$ 28, N$_2$O 265, CFC-12 ≈10,900, SF$_6$ 23,500.

**Ozone destruction ★**

$$\text{Cl} + \text{O}_3 \to \text{ClO} + \text{O}_2,\qquad \text{ClO} + \text{O} \to \text{Cl} + \text{O}_2$$

$$1\ \text{DU} = 0.01\ \text{mm of O}_3\ \text{at STP},\qquad \text{total column} \approx 300\ \text{DU}$$

**Acid deposition** — clean rain pH ≈ 5.6, acid rain pH < 5.0.

$$\text{SO}_2 + \text{H}_2\text{O} + \tfrac12\text{O}_2 \to \text{H}_2\text{SO}_4,\qquad 3\text{NO}_2 + \text{H}_2\text{O} \to 2\text{HNO}_3 + \text{NO}$$

**Carbon footprint ★** — the total greenhouse gases attributable to an activity, product or population, expressed as CO₂-equivalent in tCO₂e.

**Ozone UV shielding ★** — stratospheric O₃ absorbs UV-B and most UV-C, protecting DNA; most UV-A is transmitted.

**Conditions:** GWP values are 100-year IPCC AR5 figures; the 5.6 "clean rain" value already includes dissolved CO$_2$; a carbon footprint is cradle-to-grave or operational only, so the scope must be stated.

> [!warning] Exam trap
> The greenhouse effect and the ozone hole are different problems with different gases: CO$_2$ warms, CFCs destroy O$_3$.

---

### 5. Water Quality: BOD, COD, DO, TDS

![](https://www.youtube.com/watch?v=VOTDUqlt9z8)

*Video: BOD / COD / TSS — NCASI, 5:43*

**Dissolved oxygen and BOD ★** — $BOD$ in mg/L, $t$ in days, $k$ in day⁻¹ (base $e$).

$$BOD_t = L_0\left(1-e^{-kt}\right),\qquad k_T = k_{20}(1.047)^{T-20}$$

$$\%\text{BOD removed} = \frac{BOD_{\text{in}}-BOD_{\text{out}}}{BOD_{\text{in}}}\times100$$

**COD and solids** — all concentrations in mg/L.

$$COD = \frac{(V_0-V_1)\times M\times 8000}{V_{\text{sample}}},\qquad \frac{BOD_5}{COD} \ge 0.5\ \text{is treatable}$$

$$TDS = TS - TSS,\qquad TSS = \frac{\text{dry residue (mg)}}{\text{volume (L)}},\qquad Q_s = \frac{Q_wC_w + Q_rC_r}{Q_w+Q_r}$$

**DO sag and saturation**

$$D = DO_{\text{sat}} - DO_{\text{actual}},\qquad DO_{\text{sat}} \approx 14.6 - 0.41T + 0.008T^2\ \text{(mg/L)}$$

**Benchmarks:** clean water DO > 7 mg/L; class C freshwater DO ≥ 5 mg/L; raw sewage BOD$_5$ 200–300 mg/L; drinking water TDS 500–1,000 mg/L.
**Conditions:** $BOD_t$ is first-order with no nitrification or settling; $k_{20} \approx 0.23$ day⁻¹ for domestic sewage; COD ≥ BOD$_5$ always.

> [!tip] High-yield ★
> BOD is biological and needs 5 days; COD is chemical and needs about 2 hours. A BOD$_5$/COD ratio near 1 means mostly biodegradable waste.

---

### 6. Solid, Hazardous and E-Waste

**Generation and landfill life ★** — $g$ = generation rate in kg/capita/day, $\rho$ in kg/m³.

$$W_{\text{total}} = P\times g,\qquad V_{\text{landfill}} = \frac{W_{\text{total}}\,t_{\text{life}}}{\rho},\qquad t_{\text{life}} = \frac{V\rho}{W_{\text{annual}}}$$

$$\text{Recycling rate} = \frac{\text{recycled}}{\text{generated}}\times100,\qquad \text{Diversion} = \frac{\text{recycled} + \text{composted}}{\text{generated}}\times100$$

**Hazardous waste characteristics (4) ★:** ignitability, corrosivity (pH ≤ 2 or ≥ 12.5), reactivity, toxicity (TCLP).
**E-waste conversion** — $m$ in kg, $HHV$ in kWh/kg, $\eta$ dimensionless.

$$E_{\text{waste}} = W_{\text{EEE}}\times\text{collection rate},\qquad E = m\times HHV\times\eta$$

**E-waste hazards:** Pb (CRT solder), Hg (lamps, displays), Cd (NiCd), Cr(VI), brominated flame retardants, beryllium.
**Management hierarchy:** reduce → reuse → recycle → compost → energy recovery → sanitary landfill.

**Bioaccumulation vs biomagnification ★**

| Term | Definition | Scope |
|---|---|---|
| Bioaccumulation | build-up of a pollutant within one organism over its lifetime | single organism |
| Biomagnification | concentration increases at each higher trophic level | food chain |

**Conditions:** landfill life assumes constant generation, uniform compaction and one site; hazardous waste is manifested to a DENR-accredited treater; biomagnification needs a persistent, fat-soluble pollutant that is not excreted.

> [!warning] Exam trap
> Open burning of solid waste is prohibited under RA 9003, even in a backyard. It is not an accepted volume-reduction method.

---

## Part B — Philippine Environmental Laws

### 7. PD 1586, EIS and ECC

**PD 1586 (1978) — Philippine Environmental Impact Statement System.**
- **Sec. 4:** no person or entity may undertake, and no agency may approve, an **ECP** or a project in an **ECA** without an **ECC**.
- **Proclamation No. 2146 (1981):** lists Environmentally Critical Projects — heavy industry, resource extraction, power, infrastructure.
- **Proclamation No. 803 (1996):** lists Environmentally Critical Areas — parks, watersheds, mangroves, reefs, caves, critical slopes, heritage and tourist sites.
- **Sec. 9 (penalty):** fine of not less than **₱50,000**, and/or suspension or cancellation of the permit or license, plus closure.
- **Documents:** EIS (full study), IEE (initial examination), ECC (approval), CNC (Certificate of Non-Coverage), ECC amendment, Environmental Guarantee Fund, Environmental Monitoring Fund.
- **Agency:** DENR through the Environmental Management Bureau and the EIA Review Committee.
- **Timing:** the ECC is secured **before** construction; it is project- and site-specific, and a change in scope needs an amendment or a new ECC.

**Conditions:** coverage depends on the ECP list and the ECA map, not on project cost alone; operating without an ECC is the most commonly prosecuted violation.

> [!tip] High-yield ★
> ECC = approval to proceed. CNC = certificate that the project is **not** covered. Do not confuse the two.

---

### 8. RA 8749 Clean Air Act

**RA 8749 (Philippine Clean Air Act of 1999).**
- **Sec. 5:** DENR sets **National Ambient Air Quality Guideline Values** for SO$_2$, NO$_2$, CO, O$_3$, PM$_{10}$/TSP and Pb.
- **Sec. 17:** **Permit to Operate (PTO)** is required for stationary sources of air pollution.
- **Sec. 19:** motor-vehicle emission testing linked to registration; anti-smoke belching enforcement.
- **Sec. 20:** bans **incineration** of municipal, biomedical and hazardous waste, subject only to the law's limited exceptions.
- **Sec. 25:** phase-out of **ozone-depleting substances** under the Montreal Protocol.
- **Sec. 45 (penalties):** fine of not less than **₱10,000** but not more than **₱100,000 per day of violation**, and/or imprisonment of **1 to 6 years**.
- **Other remedies:** Pollution Adjudication Board closure or suspension order; cleanup liability; citizen suits.
- **Agency:** DENR-EMB, PAB and the LGUs sharing air-quality management.

**Conditions:** emission limits bind stationary sources at the stack, ambient limits bind the airshed; the incineration ban has no general municipal waste exemption.

> [!warning] Exam trap
> The fine is **per day of violation**, not a one-time amount — ₱10,000 to ₱100,000 daily, plus 1 to 6 years imprisonment.

---

### 9. RA 9275 Clean Water Act

**RA 9275 (Philippine Clean Water Act of 2004).**
- **Sec. 5:** DENR designates **Water Quality Management Areas (WQMA)**, each with a governing board and an action plan.
- **Freshwater classes:** **AA** (no treatment beyond disinfection), **A** (conventional treatment), **B** (primary contact recreation), **C** (fishery, boating), **D** (agriculture, navigation).
- **Marine classes:** **SA**, **SB** (recreation), **SC** (fishery), **SD** (industrial, navigation).
- **Sec. 8:** domestic sewage and **septage management** — LGUs must provide septage treatment.
- **Sec. 12:** prohibited acts — discharging untreated waste, discharging without a permit, altering a water classification without authority.
- **Discharge permit:** required for all point sources; effluent limits follow **DENR Administrative Order No. 2016-08**.
- **Sec. 28 (penalties):** fine of not less than **₱10,000** but not more than **₱200,000 per day of violation**, and/or imprisonment, plus suspension or closure.
- **Agency:** DENR-EMB, the PAB and the WQMA governing boards with LGUs.

**Conditions:** the Act covers point and non-point sources, domestic, industrial and agricultural; compliance is measured at the discharge point against effluent standards.

> [!tip] High-yield ★
> Compare the daily fines: air (RA 8749) ₱10,000–₱100,000/day; water (RA 9275) ₱10,000–₱200,000/day. Water's ceiling is double the air ceiling.

---

### 10. RA 9003 Solid Waste Management

**RA 9003 (Ecological Solid Waste Management Act of 2001).**
- **Sec. 21:** **segregation at source** is mandatory for every household, commercial and industrial generator.
- **Sec. 22:** segregated **collection** — non-segregated waste shall **not** be collected.
- **MRF:** a **Materials Recovery Facility** is required for every barangay or cluster of barangays.
- **Sec. 37 (prohibited acts):** littering; open dumping; open burning of solid waste; squatting in disposal facilities; unauthorized transport or collection; waste importation.
- **Sec. 41:** closure of **open dumpsites** and conversion to **sanitary landfills** within the statutory period; open dumping is thereafter prohibited.
- **Sec. 48 (fines and penalties):**
  - **Littering:** fine of **₱300 to ₱1,000**, or community service of **1 to 15 days**, or both.
  - **Other prohibited acts:** the fine and/or imprisonment prescribed for the specific act, higher for repeat offenders and corporations.
- **Hierarchy:** reduce → reuse → recycle → compost → energy recovery → sanitary landfill.
- **Agency:** National Solid Waste Management Commission, DENR-EMB, LGUs and barangays.

**Conditions:** the law covers commercial, industrial and agricultural solid waste; segregation precedes collection, and refusing unsegregated waste is the LGU's right.

> [!warning] Exam trap
> The littering fine is small. The heavily tested numbers are **segregation at source**, the **barangay MRF** requirement, and the **open dumpsite closure** mandate.

---

### 11. RA 6969 Toxic Substances

**RA 6969 (Toxic Substances and Hazardous and Nuclear Waste Control Act of 1990).**
- **Scope:** importation, manufacture, processing, sale, distribution, use and disposal of toxic substances and hazardous or nuclear wastes.
- **Chemical Control Order (CCO):** bans or restricts specific substances such as lead, mercury, asbestos, cyanide and PCBs.
- **Priority Chemicals List** and **Inventory of Existing Chemical Substances:** reporting thresholds for manufacturers and importers.
- **Pre-Manufacture Notification** for new substances; **Small Quantity Importation** and **Importation Clearance** for restricted chemicals.
- **Hazardous waste chain:** generator registration → **Permit to Transport (PTT)** → **Hazardous Waste Manifest** → DENR-accredited treater.
- **Prohibition:** no importation, entry or transit of hazardous and nuclear waste into Philippine territory.
- **Sec. 14 (penalties):** the heaviest penalties cover illegal importation, transport or dumping of hazardous and nuclear waste — imprisonment of **6 years and 1 day to 12 years**, plus a fine and revocation of permits; lesser violations carry lower fines or shorter imprisonment.
- **Agency:** DENR-EMB, with DOH, DOST and the Philippine Nuclear Research Institute; the PAB may order cleanup.
- **Frameworks:** Basel Convention on transboundary hazardous waste movement; RA 8749 and RA 9275 for treatment emissions.

**Conditions:** the law binds anyone who generates, stores, transports, treats or disposes of hazardous waste; "hazardous" follows the DENR list and the four TCLP characteristics.

> [!tip] High-yield ★
> Memorize the permit chain: **generator registration → PTT → manifest → DENR-accredited treater**. A missing manifest is a violation even if the waste reached a legitimate facility.

---

## Part C — Sustainability and Energy Resources

### 12. Sustainability Frameworks

**Sustainable development (Brundtland) ★** — development that meets the needs of the present without compromising the ability of future generations to meet their own needs.

**Triple Bottom Line (3P) ★**

| Pillar | Also called | Typical indicators |
|---|---|---|
| People | social | equity, health, labour standards |
| Planet | environmental | emissions, resource use, biodiversity |
| Profit | economic | return, cost savings, market share |

**Environmental management system ★** — ISO 14001 gives the Plan–Do–Check–Act requirements for an EMS; certification is by an accredited third-party body.

**Conditions:** the Brundtland definition is qualitative, so no single index captures it; ISO 14001 certifies the management system, not the environmental performance of the organisation.

---

### 13. Energy Resources

![](https://www.youtube.com/watch?v=axCR3uIn3Vs)

*Video: Renewable and Non-renewable Resources — Next Generation Science, 4:01*

**Renewable vs non-renewable ★**

| Class | Examples | Basis |
|---|---|---|
| Renewable | solar, wind, hydro, geothermal, biomass, ocean | replenished on a human timescale |
| Non-renewable | coal, oil, natural gas, nuclear (uranium) | finite stock, not replenished |

**Wind power ★** — $\rho$ = air density in kg/m³, $A$ = swept rotor area in m², $v$ = wind speed in m/s, $C_p$ = power coefficient (dimensionless).

$$P = \frac12\rho Av^3,\qquad P_{\text{actual}} = C_p\frac12\rho Av^3,\qquad C_p \le \frac{16}{27}\ \text{(Betz limit)}$$

$$P_{\text{density}} = \frac PA = \frac12\rho v^3\ \text{(W/m}^2\text{)}$$

**Cubic dependence:** a 10% rise in $v$ raises the available power by about 33%, so wind power is far more sensitive to speed than to rotor area.

**Biogas from anaerobic digestion ★** — CH₄-rich gas from digesting manure, sewage sludge or food waste in the absence of oxygen.

$$\text{organic matter} \xrightarrow{\text{anaerobic}} \text{CH}_4 + \text{CO}_2$$

**Other renewables**

| Source | Conversion | Key relation | Notes |
|---|---|---|---|
| Solar PV | photons → DC electricity | $\eta = \frac{P_{\text{out}}}{GA}$ | $G$ = irradiance in W/m² |
| Hydro | potential energy of the head | $P = \rho gQH\eta$ | $Q$ = flow in m³/s, $H$ = head in m |
| Geothermal | steam or hot brine → turbine | $P = \dot m c_p\Delta T\eta$ | dry steam, flash and binary cycles |

**Conditions:** wind power assumes steady wind and constant air density; the tables list representative values, not statutory limits; biogas methane fraction and yield depend on feedstock and digester temperature.

→ Back to [[00_Index]]
