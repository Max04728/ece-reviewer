# GEAS corpus vs GEAS vault — coverage audit

Audited corpus: `C:\Users\Admin\AppData\Local\Temp\pb_text\PB FINAL GEAS-merged.txt` (131 pages).
Audited vault: `C:\Users\Admin\Desktop\Formula\GEAS\` (8 files, 81 topics, read in full).
Nothing outside this report was modified.

**Question notation used below:** `D1-Qn` = digest DOC 1 (pages 3–22, Questions 1–100); `D2-Qn` = digest DOC 2 (pages 30–49, QUESTIONs 001–100); `S4-In`, `P11-In`, `S5-In`, `P13-In` = the four further 100-item sets in the same file (pages 50–69, 70–99, 99–109, 110–131) that the supplied digest did not include. §3.1 and §3.2 cover D1+D2 exhaustively; §3.3 records items found only in S4/P11/S5/P13.

---

## 1. Corpus summary

| Fact | Value |
|---|---|
| Pages | 131 |
| Sub-reviewers / question sets | **6** question sets (2 in the digest + 4 more in the same file) |
| Question blocks in the file | **600** (`Question 1–100`, `QUESTION 001–100`, then 4 × 100 `Item`/`ITEM #` sets) |
| Question blocks in the supplied digest | 200 (D1 + D2) — audited exhaustively below |
| Extra sets (not digested) | S4 (p.50–69), P11 (p.70–99), S5 (p.99–109), P13 (p.110–131) |

Topic clusters in **D1 (100 items)**, approximate: management / PM / technopreneurship **26** · physics (mechanics, fluids, thermo, waves, optics, EM) **27** · OOP / ICT / CAD **12** · materials science **12** · environmental science **11** · chemistry **11** · ECE law & ethics **9** · nuclear/atomic **3**.

Topic clusters in **D2 (100 items)**, approximate: OOP / UML / Java / CAD **24** · management / startup finance / engineering economy **22** · applied physics **20** · environmental / climate **18** · materials & nano **13** · law & ethics **10** · chemistry & atomic **8** · nuclear **3**.

The corpus is **term-heavy**: roughly 45 % of D2 and ~35 % of D1 are pure definition/recall items (named laws, statutory sections, management theories, OOP/CAD vocabulary) rather than computations. A formula-only vault is therefore structurally disadvantaged here.

---

## 2. Coverage scorecard

| Vault file | Topics in vault | Examined clusters it covers | Verdict |
|---|---|---|---|
| `01_General_Chemistry.md` | 11 | Periodic trends (D1-Q94), covalent/ionic bonding (D2-Q61, Q92), oxidation at anode (D2-Q66), enthalpy-exothermic (D1-Q88, partial), photon energy `E=hf` (D1-Q20, partial) | **Good but partial** — solid on trends/equilibrium/electrochem; no isotope definitions, no intermolecular forces, no thermochemistry definitions, no photoelectric equation, and Faraday's *electrolysis* law is a false friend for induction questions |
| `02_University_Physics.md` | 16 | Kinematics/projectile (D2-Q73), circular & banked curves (D1-Q24, D2-Q22), momentum/impulse/restitution (D1-Q78, D2-Q90), SHM mass-spring & pendulum (D1-Q6, Q97, D2-Q35), work–energy (D2-Q70), fluids/Bernoulli/Archimedes (D1-Q53, D2-Q8), Carnot & 1st law (D1-Q42, Q43, D2-Q71, Q79), refraction/TIR/dispersion (D1-Q12, Q51, Q99, D2-Q57) | **Strongest file** — but it has **no electricity/electromagnetism part at all** and no damping/terminal velocity |
| `03_Materials_Science.md` | 10 | Crystal unit cells & APF (D1-Q19, D2-Q23), defects & edge dislocation (D1-Q25, D2-Q86), stress–strain/yield (D1-Q81, D2-Q83), band gap (D2-Q52), dielectric constant (D2-Q16), ferromagnetism & coercivity (D1-Q9, D2-Q40), capacitive energy (D2-Q89) | **Partial** — misses Curie/Néel, all of diffusion (Fick), fracture toughness, nanomaterials, polymers and piezoelectricity |
| `04_Environmental_Sci_and_PH_Laws.md` | 11 | Denitrification & N cycle (D1-Q30), eutrophication (D1-Q74, term only), photochemical smog/NO_x (D1-Q91), greenhouse effect & GWP (D1-Q23, D2-Q21, Q61), CFC/ozone chemistry (D2-Q81), RA 8749/9275/9003/6969, PD 1586 EIS/ECC (D1-Q75, D2-Q17) | **Partial** — the pollution *chemistry* is good; ecology vocabulary and climate-governance terms are largely absent |
| `05_Engineering_Economy.md` | 13 | Capitalized cost (D1-Q39, Q72), IRR (D1-Q50), annuity/PW factors (D2-Q78), compound interest (D2-Q37), break-even, depreciation, replacement | **Good for classic economy, silent on the corpus's decision-analysis and finance vocabulary** (EMV, decision trees, regret, ratios, sunk cost, sensitivity) |
| `06_Engineering_Management_and_PM.md` | 10 | CPM zero float (D1-Q1), matrix structure (D1-Q45), unity of command (D1-Q46), span of control (D2-Q49), SWOT (D2-Q62), TAM/SAM/SOM, runway (D1-Q29), dilution (D1-Q36), MVP/Lean Startup (D2-Q94) | **Partial** — PM/startup *quant* is good; classical management theory, control types, leadership, Gantt, Lean/Value-Proposition Canvas and financial ratios are missing |
| `07_ECE_Laws_and_Professional_Ethics.md` | 10 | RA 9292 scope/titles/PECE seal (D1-Q15, Q57, D2-Q68), Sec. 6 composition (D1-Q62, D2-Q67), Sec. 35 penalties (D2-Q45), ethics/advertising/unlicensed practice (D1-Q85, Q98, D2-Q82), RA 7925 interconnection (D2-Q75), IECEP code | **Best-aligned law file** but has **no obligations & contracts**, no IP/RA 8293, no PEC hazardous-location rules, and omits RA 9292 Secs. 8/17/24 numbers that are directly examined |
| `00_Index.md` | — | MOC only | Accurate index of what exists; it inherits every gap above |

---

## 3. MISSING items

### 3.1 Definitional / legal / conceptual gaps (most important for this corpus)

| # | Examined item | Q numbers | Evidence it is absent from the vault | Suggested vault home (file + topic) |
|---|---|---|---|---|
| 1 | **Mora solvendi / mora accipiendi / compensatio morae; Civil Code Art. 1165, 1170, 1174; fortuitous event does not excuse an obligor already in delay** | D1-Q8; D2-Q6 | `grep mora|fortuitous|force majeure|obligation|Civil Code` over `GEAS\` returns only unrelated hits (07 line 127 "issuances", line 145 "damages", line 156 "contract… lawful basis"). No obligations content exists | `07_ECE_Laws_and_Professional_Ethics.md` → new `### 11. Civil Code Obligations and Contracts` |
| 2 | **Curie temperature $T_C$** (ferro→paramagnetic) | D1-Q3, D1-Q100 | `03_Materials_Science.md` §10 has the diamagnetic/paramagnetic/ferromagnetic/antiferromagnetic table and $B_r/H_c$, but `grep Curie|Néel` returns **no match** anywhere in the vault | `03_Materials_Science.md` `### 10. Magnetic Properties and Hysteresis` |
| 3 | **Néel temperature $T_N$** (antiferro→paramagnetic) | (corpus trap list, D1-Q3 tip) | Same grep — "Antiferromagnetic" appears only as a table row (03 line 266) | same as #2 |
| 4 | **Fick's first law $J=-D\,dC/dx$ and second law $\partial C/\partial t = D\,\partial^2C/\partial x^2$** | D1-Q32, Q66, Q96 | `grep Fick|diffusion` returns only the defect-effect table word "diffusion" (03 line 97) and "nanocrystalline" (line 108). No diffusion topic exists | `03_Materials_Science.md` → new `### 11. Diffusion (Fick's Laws)` |
| 5 | **Nanomaterial definition 1–100 nm; surface-area-to-volume ratio; top-down vs bottom-up fabrication; quantum dots** | D2-Q1, Q74; D1-Q13 | `grep nano` returns only "nanocrystalline regime" in a Conditions line (03 line 108). No nanoscale topic exists | `03_Materials_Science.md` → new `### 12. Nanomaterials` |
| 6 | **Hume-Rothery rules** (atomic-radius difference ≤ 15 %, same crystal structure, similar electronegativity) | D1-Q59 | `grep Hume` → no match | `03_Materials_Science.md` `### 4. Crystal Imperfections` (add solid-solution box) |
| 7 | **Polymers: thermoplastic vs thermoset vs elastomer** (cross-linking, char on reheat, rubber elasticity) | D2-Q43, Q53, Q96 | `grep thermoplast|thermoset|elastomer|polymer` → only the Li-poly battery row (01 line 338) and a battery-table cell | `03_Materials_Science.md` → new `### 13. Polymers` |
| 8 | **Inverse piezoelectric effect** (BaTiO₃: field → mechanical strain) | D1-Q83 | `grep piezoelectr` → no match; BaTiO₃ appears only as a dielectric-constant example (03 line 244) | `03_Materials_Science.md` `### 9. Dielectric Properties and Breakdown` |
| 9 | **Isotopes defined by neutron number** (C-12 vs C-14) | D1-Q60 | `grep isotope` → no match. 01 §1 covers Bohr/quantum numbers only | `01_General_Chemistry.md` `### 1. Atomic Structure and Configurations` |
| 10 | **Expected Monetary Value $\mathrm{EMV}=\sum p_iX_i$** | D1-Q10, Q89; D2-Q77 | `grep EMV|Expected Monetary` → **no match**. The corpus's own formula sheet lists EMV as formula #1 | `06_Engineering_Management_and_PM.md` → new `### 11. Decision Analysis under Risk` |
| 11 | **Decision trees / chance nodes / decision nodes** | D1-Q89; D2-Q77 | Same grep (no "decision tree", no "chance node") | same as #10 |
| 12 | **Decision under strict uncertainty: maximin, maximax, Laplace, Hurwicz, minimax regret (Savage)** | D1-Q47 | `grep regret|minimax|Maximax|Laplace|Hurwicz` → no match | same as #10 |
| 13 | **Risk aversion vs risk neutrality (behavioural economics)** | D1-Q68 | `grep risk-averse|risk neutral` → no match | `05_Engineering_Economy.md` → new `### 14. Decisions under Uncertainty` |
| 14 | **Quick ratio (acid-test) and current ratio** | D2-Q15 | `grep quick|acid-test|current ratio|liquidity` → only "acid deposition"/"lead–acid" (04, 01). The corpus's terms sheet defines Quick Ratio verbatim | `06_Engineering_Management_and_PM.md` → new `### 12. Financial Ratios` |
| 15 | **Sensitivity analysis** | D2-Q33 | `grep sensitivity` → no match | `05_Engineering_Economy.md` `### 7. PW, FW and AW Methods` |
| 16 | **Depreciation is a non-cash expense added back to operating cash flow** | D2-Q58 | 05 §10–11 give SLM/SYD/DB/DDB schedules only; no cash-flow or income-statement content | `05_Engineering_Economy.md` `### 11. Depreciation: DB and DDB` |
| 17 | **Gantt chart** | D1-Q54; P11-I91 | `grep Gantt` → no match | `06_Engineering_Management_and_PM.md` `### 5. Network Passes, Float and Critical Path` |
| 18 | **Feedforward / concurrent / feedback control** | D1-Q2 | `grep feedforward|concurrent control|feedback control` → no match; 06 §1 only names "controlling" inside PODSC | `06_Engineering_Management_and_PM.md` `### 1. Management Functions and Organizational Structures` |
| 19 | **Herzberg two-factor theory (hygiene vs motivator)** | D1-Q11 | `grep Herzberg|motivat|Maslow|McGregor` → no match | `06_Engineering_Management_and_PM.md` → new `### 13. Motivation and Leadership` |
| 20 | **Laissez-faire / autocratic / democratic leadership** | D1-Q95; P13-I9 | Same grep — no leadership theory in the vault | same as #19 |
| 21 | **Max Weber's bureaucratic theory** | D1-Q22 | `grep Weber|bureaucra|Taylor|Fayol|scientific management` → no match (Fayol appears nowhere) | `06_Engineering_Management_and_PM.md` `### 1.` (add classical-theory box) |
| 22 | **OOP: encapsulation, polymorphism, inheritance, abstract class vs interface, constructor, `char`, primitive types** | D2-Q7, Q10, Q11, Q20, Q55, Q89, Q99; D1-Q56 | `grep encapsulat|polymorph|inherit|abstract class|interface|constructor|Java` → **no match** anywhere in the vault. There is no programming section at all | `07_ECE_Laws_and_Professional_Ethics.md` → new Part D `### 11. OOP and Programming Fundamentals` (or a new vault note) |
| 23 | **UML class diagram, use-case actor, association multiplicity `1..*`/`0..1`** | D1-Q5, Q80, Q82; D2-Q18; P13-I87 | `grep UML|class diagram|multiplicity|actor` → no match | same as #22 |
| 24 | **Java/C++ runtime vocabulary: try/catch/finally, event listener, `java.awt`, BorderLayout, CreateWindow(), while-loop pre-test** | D1-Q7, Q28, Q48, Q73, Q76; D2-Q29, Q72 | grep for each term returns no match; the only "try" hits are the English word in prose | same as #22 |
| 25 | **Functional programming / immutable state and statelessness** | D1-Q16; P13-I80 | `grep functional program` → no match | same as #22 |
| 26 | **CAD: CHAMFER, PAN, ortho mode (F8), model space vs paper space** | D1-Q58, Q65; D2-Q13, Q97 | `grep CAD|chamfer|ortho|paper space` → the single hit is "**ortho**clase" in the Mohs scale (03 line 162) — a substring false positive. No CAD content | `07_ECE_Laws_and_Professional_Ethics.md` → new `### 14. CAD and Engineering Documentation` |
| 27 | **RA 9292 Sec. 24 — reinstatement of a revoked certificate after 2 years** | D1-Q33 | `grep Sec. 24` hits only RA 10175's Sec. 24 (07 line 180). The 07 §3 section table jumps Sec. 10 → 30 → 31; **Secs. 11–29 are absent** | `07_ECE_Laws_and_Professional_Ethics.md` `### 3. PRC and BEE Powers and Penal Provisions` (extend table) |
| 28 | **RA 9292 Sec. 8 — Board members must be PECEs with ≥ 10 years of active practice** | D1-Q40 | 07 §3 lists "Sec. 8 Qualifications of Board members" as a bare table row (line 61) with **no content**; `grep ten \(10\) years` → no match | same as #27 |
| 29 | **RA 9292 Sec. 17 — results released within 15 days** | D1-Q79 | `grep Sec. 17|fifteen` → no match (the only "Sec. 17" is RA 8749's PTO) | same as #27 |
| 30 | **Carrying capacity / logistic growth $dN/dt=rN(1-N/K)$** | D2-Q36 | `grep carrying capacity|logistic` → no match; 04 §1 has exponential growth $N_t=N_0e^{rt}$ only | `04_Environmental_Sci_and_PH_Laws.md` `### 1. Ecosystems and Energy Flow` |
| 31 | **Abiotic vs biotic factors** | D1-Q90 | `grep abiotic|biotic` → no match | `04_Environmental_Sci_and_PH_Laws.md` `### 1.` |
| 32 | **Biosphere definition** | D1-Q64 | grep → no match (only "atmosphere"/"ocean" in the cycle table) | `04_Environmental_Sci_and_PH_Laws.md` `### 1.` |
| 33 | **Primary succession** (newly formed barren substrate) | D1-Q63 | `grep succession` → no match | `04_Environmental_Sci_and_PH_Laws.md` `### 1.` |
| 34 | **Biomagnification** | D1-Q14 | `grep biomagnif` → no match | `04_Environmental_Sci_and_PH_Laws.md` `### 6. Solid, Hazardous and E-Waste` |
| 35 | **Sustainable development (Brundtland 1987)** | D2-Q30 | `grep sustainab|Brundtland` → no match | `04_Environmental_Sci_and_PH_Laws.md` → new `### 12. Sustainability Frameworks` |
| 36 | **Triple Bottom Line (People/Planet/Profit)** | D2-Q88 | grep → no match | same as #35 |
| 37 | **Renewable energy: wind power $P=\tfrac12\rho Av^3$, biogas/anaerobic digestion, non-renewables** | D1-Q18; D2-Q48; P13-I35 | `grep renewable|wind|biogas|anaerobic` → no match | `04_Environmental_Sci_and_PH_Laws.md` → new `### 13. Energy Resources` |
| 38 | **Blue Ocean Strategy** | D1-Q31; D2-Q84 | `grep blue ocean` → no match (case-insensitive check of the 06 file confirms) | `06_Engineering_Management_and_PM.md` → new `### 14. Competitive Strategy` |
| 39 | **Porter's generic strategies (focused differentiation) and Five Forces** | D1-Q77; P11-I78; P13-I12 | `grep Porter` → no match | same as #38 |
| 40 | **Razor-and-blade / bait-and-hook model** | D1-Q93 | `grep razor` → no match; 06 §8 lists "freemium" and "marketplace commission" but not razor/blade | `06_Engineering_Management_and_PM.md` `### 8. Business Model Canvas and SWOT` |
| 41 | **PEST macro-environmental analysis** | D2-Q26; P13-I7 | `grep PEST` → no match | same as #38 |
| 42 | **Technology Adoption Life Cycle / the "chasm" between Early Adopters and Early Majority** | D1-Q70 | `grep adoption|chasm` → no match | `06_Engineering_Management_and_PM.md` `### 9. Market Sizing` |
| 43 | **Lean Canvas "Existing Alternatives" block and Value Proposition Canvas "Pain Relievers"** | D1-Q37, Q44; D2-Q91 | 06 §8 gives the nine Business Model Canvas blocks only; `grep Lean Canvas|Value Proposition|Pain Reliever` → no match | `06_Engineering_Management_and_PM.md` `### 8.` |
| 44 | **CSR / ethical supply-chain action** | D1-Q84; D2-Q95 | `grep CSR|corporate social` → no match | `07_ECE_Laws_and_Professional_Ethics.md` `### 10. IECEP Code of Ethics` |
| 45 | **Intellectual property: patent, trademark, RA 8293 (IP Code)** | D2-Q76; S4-I49; P13-I93 | `grep patent|trademark|intellectual property|RA 8293` → no match | `07_ECE_Laws_and_Professional_Ethics.md` → new `### 15. Intellectual Property` |
| 46 | **PEC hazardous locations (Class I Division 1) and intrinsically safe design** | D2-Q85; P11-I6 | `grep Class I|hazardous location|intrinsic` → only "intrinsic level"/"intrinsic-material items" (03 lines 198, 208). No hazardous-location content | `07_ECE_Laws_and_Professional_Ethics.md` `### 9. Philippine Electronics Code Books` |
| 47 | **Coulomb's law $F=k q_1q_2/r^2$** | D2-Q19 | `grep Coulomb` → no match; 02 has no electrostatics part | `02_University_Physics.md` → new `### 17. Electrostatics` |
| 48 | **Electric field unit (N/C ≡ V/m)** | D2-Q24 | `grep electric field` → no match | same as #47 |
| 49 | **Capacitors in series and in parallel** | D1-Q21; D2-Q54 | `grep capacitor` → only the Index jump-table row (00 line 54) and $C=\varepsilon A/d$ (03 §9). No series/parallel combination rules | `02_University_Physics.md` `### 17.` or `03 §9` |
| 50 | **Series RLC resonance ($X_L=X_C$, voltage and current in phase)** | D2-Q32, Q65 | `grep resonan|RLC|impedance` → no match | `02_University_Physics.md` → new `### 18. AC Circuits` |
| 51 | **Faraday's law of induction and Lenz's law** | D2-Q93, Q98; D1-Q71; S4-I78 | `grep Faraday|Lenz|induction|magnetic flux` → only 01 §10 "Faraday's **laws of electrolysis**" (line 302). This is a dangerous false friend: the vault has the wrong Faraday | same as #50 |
| 52 | **Magnetic force on a conductor $F=ILB\sin\theta$** | D1-Q52 | `grep` → no match (03 §10 has $B=\mu H$ only) | `02_University_Physics.md` → new `### 19. Magnetism` |
| 53 | **Biot–Savart / right-hand grip rule; field lines run N→S outside a magnet** | D2-Q80; D1-Q49 | grep → no match | same as #52 |
| 54 | **Ideal transformer turns ratio $V_s/V_p=N_s/N_p$** | D1-Q87 | `grep transformer` → only "transformer cores want soft magnetic material" (03 line 274/278) | `02_University_Physics.md` `### 18` |
| 55 | **Inductor behaviour at $t=0^+$** | D1-Q27 | `grep inductor` → no match | same as #54 |
| 56 | **Radioactive decay law / half-life $N=N_0(1/2)^{t/T_{1/2}}$** | D1-Q51; P13-I4; S4-I31 | `grep radioactiv|half-life|decay` → only "nuclear waste" in 04 §11 and "cohort that decays" in 06 §7. No nuclear physics | `02_University_Physics.md` → new `### 20. Nuclear Physics` |
| 57 | **Mass defect → nuclear binding energy $\Delta E=\Delta m c^2$** | D1-Q69 | grep → no match | same as #56 |
| 58 | **Gamma / alpha / beta decay identities; reactor moderator** | D2-Q14, Q27 | grep → no match | same as #56 |
| 59 | **Damped harmonic oscillator** ($m\ddot x+b\dot x+kx=0$, $\zeta$, $A(t)=A_0e^{-\gamma t}$) | D1-Q4 | 02 §13 covers undamped SHM only; `grep damp` → no match beyond a literal usage | `02_University_Physics.md` `### 13. SHM and Waves` |
| 60 | **Terminal velocity $v_t=\sqrt{2mg/\rho C_dA}$** | D1-Q38 | `grep terminal velocity` → no match; no drag/air-resistance topic | `02_University_Physics.md` `### 8. Fluid Dynamics` (add drag regime) |

### 3.2 Formula-level gaps

| # | Examined formula | Q numbers | Evidence it is absent | Suggested vault home |
|---|---|---|---|---|
| 1 | Photoelectric equation $K_{\max}=\dfrac{hc}{\lambda}-\Phi \approx \dfrac{1240}{\lambda(\text{nm})}-\Phi$; threshold $f_0=\Phi/h$ | D1-Q20; D2-Q5 | 01 §1 gives $E=hf=hc/\lambda$ and the Rydberg relation only; no $\Phi$, no $K_{\max}$, no threshold condition (`grep photoelectric|work function` → no match) | `01_General_Chemistry.md` `### 1.` (or 02 Part C modern physics) |
| 2 | Fracture toughness $K_{Ic}=Y\sigma\sqrt{\pi a}$ | D2-Q4 | 03 §5 has $U_t=\int_0^{\varepsilon_f}\sigma\,d\varepsilon$ (energy toughness) and a tip mentioning "brittle", but no $K_{Ic}$, no $Y$, no crack length $a$ | `03_Materials_Science.md` `### 5. Stress, Strain and Mechanical Properties` |
| 3 | Bulk modulus $K=-V\,\dfrac{\Delta P}{\Delta V}$ | D1-Q46 | 03 §5 has only $K=E/[3(1-2\nu)]$; the definitional form is absent | `03_Materials_Science.md` `### 5.` |
| 4 | Marginal cost $MC=\Delta TC/\Delta Q=d(TC)/dQ$ | D1-Q34 | 05 §13 defines $MC_k=(S_{k-1}-S_k+A_k)$ — the *replacement-analysis* marginal cost, a different quantity, and never states the production-cost derivative | `05_Engineering_Economy.md` `### 12. Break-Even and Cost Analysis` |
| 5 | Marginal cost/cost-slope item in the corpus formula sheet (`MC = ΔTC/ΔQ`) | D1-Q34 | Same as above | same |
| 6 | Wind power $P=\tfrac12\rho Av^3$ | D2-Q48 | no match (see 3.1 #37) | `04_Environmental_Sci_and_PH_Laws.md` `### 13.` |
| 7 | Energy stored in a supercapacitor $E=\tfrac12CV^2$ | D2-Q89; S4-I89 | **Covered** (03 §9 line 232) — listed here only to record that this one *is* present | — |
| 8 | Logistic growth $dN/dt=rN(1-N/K)$ | D2-Q36 | Absent (see 3.1 #30) | `04 §1` |
| 9 | Ideal-gas work / isothermal work $W=nRT\ln(V_2/V_1)$ | P13-I3 | **Covered** (02 §11 process table) | — |
| 10 | Refrigerator COP $COP=Q_C/W$ | S4-I76, P13-I88 | **Covered** (02 §12 line 304/308) | — |
| 11 | Full RA 9292 numerical kit (10 yr / 15 days / 2 yr / ₱100 k–₱1 M / 6 mo–6 yr) | D1-Q33, Q40, Q79; D2-Q45 | Only the ₱100 k–₱1 M / 6 mo–6 yr pair is present (07 §3 line 75); the three period thresholds are absent | `07_ECE_Laws_and_Professional_Ethics.md` `### 3.` |

### 3.3 Gaps that surface only in the three extra sets (not in the digest)

These are real corpus items, labelled for traceability; they are secondary to §3.1/§3.2 but materially widen the hole.

| # | Examined item | Q numbers | Evidence | Suggested home |
|---|---|---|---|---|
| 1 | Units-of-production (service-output) depreciation $d_k=\frac{FC-SV}{Q_{total}}Q_k$ | S4-I2 | 05 §10–11 list SLM, SYD, DB, DDB only; `grep units of production` → no match | `05` `### 10.` |
| 2 | Sunk cost | S4-I68 | `grep sunk` → no match | `05` `### 8.` |
| 3 | Effective annual rate worked as the "EAR" term; Rule of 72 | S4-I86; P13-I33, I46 | EAR formula is present (05 §2); Rule of 72 present as a tip (05 line 28) — **covered** | — |
| 4 | Income statement, balance sheet, accounting equation, cash-flow statement | P11-I30, I47; P13-I19, I77 | `grep net income|COGS` → only the gross-margin line in 06 §8; no accounting statements | `06` → new `### 15. Accounting and Finance Statements` |
| 5 | Earned Value Management (CPI/SPI, controlling phase) | S4-I44 | `grep Earned Value|CPI|SPI` → no match | `06` `### 5.` |
| 6 | PM/PMBOK systems: planning, scheduling, budgeting, estimating, work authorization, cost control | P11-I79 | 06 Part B covers CPM/PERT/crashing only | `06` `### 4.` |
| 7 | Wiedemann–Franz / thermal-to-electrical conductivity ratio | P11-I2, I4 | `grep Wiedemann` → no match | `03` `### 7.` or `02 §10` |
| 8 | Thermal shock resistance / eutectoid steel / second most abundant metal / major classes of engineering materials | S4-I? / P11-I10, I95, I98, I54 | grep → no match for any | `03` `### 5.`/`### 6.` |
| 9 | Amorphous vs crystalline solids; Bravais lattice; coordination number recall | S4-I43; P13-I48, I83, P11-I35 | 03 §1 gives SC/BCC/FCC/HCP cells but never the words "Bravais" or "amorphous"; `grep amorphous|Bravais` → no match | `03` `### 1.` |
| 10 | Hydrogen bonding / intermolecular forces (why water boils high) | S4-I32 | `grep hydrogen bond|van der Waals|intermolecular` → no match | `01` `### 3. Chemical Bonding` |
| 11 | Engineering-economy decision methods: discounted decision trees, ERR, incremental comparison | P11-I47, I50, I51 | ERR and incremental analysis **are** in 05 §8; discounted decision trees are not | `05` §8 / new §14 |
| 12 | Safety: NFPA hazard-diamond colour codes, red = danger/stop, machine-guarding colours | P11-I48; P13-I58 | 07 §8 lists OSHS rules but no colour codes | `07` `### 8.` |
| 13 | Legal/contract recall: essential elements of a contract, contract types, liquidated damages, "motu proprio" | P11-I14, I49, I66; P13-I36 | No contracts/legal-procedure content in 07 | `07` `### 11.` (see 3.1 #1) |
| 14 | ICT: compiler vs interpreter, HTTP/HTTPS, garbage collection, hashing, dependent types, recursion, dynamic typing | S4-I34, I42, I60, I69, I88; P11-I86; P13-I11, I13, I95 | No programming content anywhere | `07` Part D (see 3.1 #22) |
| 15 | CAD: polar array, mirror, block, parametric/generative design, 2D axes | S4-I39, I93; P11-I15, I17; P13-I21, I37 | No CAD content (substring false positive only) | `07` `### 14.` |
| 16 | Ecology: biodiversity, supporting ecosystem services, keystone species, density-independent factors, habitat fragmentation | P13-I82; S4-I64, I67; P11-I93, I29 | `grep biodiversity` → no match; ecosystem-services vocabulary absent | `04` `### 1.`/new §12 |

---

## 4. PARTIAL / incorrect coverage

| # | Item | What the vault says (file + `###` topic) | What the exam needs | Fix |
|---|---|---|---|---|
| 1 | Bulk modulus | `03_Materials_Science.md` `### 5. Stress, Strain and Mechanical Properties`: "$G = E/[2(1+\nu)],\quad K = E/[3(1-2\nu)]$" | Definitional $K=-V\,\Delta P/\Delta V$ as a measure of resistance to **uniform volume compression** (D1-Q46) | Add the definitional form and the words "resistance to volumetric compression" |
| 2 | Photoelectric effect | `01_General_Chemistry.md` `### 1. Atomic Structure and Configurations`: "$E = hf = hc/\lambda$ (J)" | $K_{\max}=hf-\Phi$ and the threshold condition $f\ge f_0$; the fact that sub-threshold **intensity is irrelevant** (D2-Q5, D1-Q20) | Add a photoelectric line with $\Phi$, $f_0$ and the 1240 eV·nm shortcut |
| 3 | Marginal cost | `05_Engineering_Economy.md` `### 13. Replacement Analysis`: "$MC_k = \dfrac{S_{k-1}-S_k+A_k}{1}$ (cost of keeping one more year)" | Production marginal cost $MC=\Delta TC/\Delta Q$ (D1-Q34; named in the corpus's own formula sheet) | Add $MC=\Delta TC/\Delta Q$ under `### 12. Break-Even and Cost Analysis` and label the replacement one "marginal cost of keeping" |
| 4 | Opportunity cost | `05_Engineering_Economy.md` `### 13.` warning: "the defender's real cost is its **opportunity cost** (current market value × i) plus operating cost" | The named concept defined as the benefit forfeited by choosing one alternative over another, with its formula (D2-Q42, S4-I68 sunk-cost contrast) | Promote to a defined term in `### 12.` |
| 5 | Bootstrapping | `06_Engineering_Management_and_PM.md` `### 10. Funding, Burn Rate and Runway`: "**Sources:** bootstrapping, grants, angel, VC, …" — a bare list word | Definition: scaling on personal savings + reinvested revenue with **no external equity**, founders keep 100 % (D2-Q3) | Add a one-line definition |
| 6 | Seed funding | Same vault line: "**Funding stages:** pre-seed → seed → Series A/B/C …" | Definition: earliest capital from founders/family/angels used to prove concept and build a prototype (D2-Q100) | Add a one-line definition per stage |
| 7 | Freemium | `06` `### 8. Business Model Canvas and SWOT`: "**Revenue models:** subscription/SaaS, transaction fee, licensing, freemium, advertising, usage-based, marketplace commission" | Defined as free base tier + paid premium tier (D2-Q34) | Add a half-line definition |
| 8 | Exothermic reaction / enthalpy of reaction | `01_General_Chemistry.md` `### 7. Chemical Equilibrium and Le Chatelier`: $\Delta G^\circ=\Delta H^\circ-T\Delta S^\circ$ and a Le Chatelier row "Increase T (exothermic) ← left" | Definitional $\Delta H=H_{products}-H_{reactants}<0\Rightarrow$ exothermic (D1-Q88) | Add $\Delta H$ definition beside the Gibbs relation |
| 9 | Eutrophication | `04_Environmental_Sci_and_PH_Laws.md` `### 2. Biogeochemical Cycles`, table row: "Nitrogen … fertilizer, N₂O, **eutrophication**" | Cause (excess N and P runoff) and mechanism (algal bloom → O₂ depletion) (D1-Q74) | Add a definition line under `### 5. Water Quality` |
| 10 | Point source | `04` `### 9. RA 9275 Clean Water Act`: "**Discharge permit:** required for all point sources" and "covers point and non-point sources" | Definition: a discrete, identifiable effluent conveyance (a pipe) vs a diffuse source (D2-Q38) | Add the definition |
| 11 | Carbon footprint | `04` `### 4.`: "$\mathrm{CO_2e}=\sum m_i\,GWP_i$" | The named term "carbon footprint" $=\sum(\text{activity data}\times\text{emission factor})$ in tCO₂e (D2-Q41) | Rename/extend the CO₂e block |
| 12 | Ozone layer function | `04` `### 4.`: catalytic $\mathrm{Cl+O_3\to ClO+O_2}$ cycle, DU column, "CFCs destroy O₃" | The **protective function** (absorbs UV-B/UV-C in the stratosphere) and the Chapman cycle (D2-Q25; P11-I36, I90) | Add the shielding statement |
| 13 | RA 9292 Sec. 3 definitions | `07_ECE_Laws_and_Professional_Ethics.md` `### 1.`: "**Sec. 3:** definition and interpretation of terms (electronics, electronics engineering, PECE, ECE, ECT)" | The verbatim statutory definition of "electronics" — flow of electrons in vacuum, gaseous media, plasma or semiconductors (D2-Q9) | State the definition, not just the section |
| 14 | RA 9292 Sec. 8 | `07` `### 3.` table: "| Sec. 8 | Qualifications of Board members |" — heading with no content | ≥ 10 years of continuous active practice, PECE, etc. (D1-Q40) | Fill the row |
| 15 | Conservative force | `02_University_Physics.md` `### 3. Work, Energy and Conservation`: only "no non-conservative forces" | Definition: work is path-independent / $\oint\vec F\cdot d\vec r=0$ (D1-Q67) | Add a definition line |
| 16 | Circular economy | `04` `### 6. Solid, Hazardous and E-Waste`: "Management hierarchy: reduce → reuse → recycle → compost → energy recovery → landfill" | Named concept + product-as-a-service / closed-loop material retention (D1-Q41; S4-I57) | Add the term and the PaaS example |
| 17 | Shear modulus as "resistance to deformation" | `03` `### 5.` gives $G=E/[2(1+\nu)]$ | Exam items ask which modulus resists *shape* change vs *volume* change (D1-Q46; S4-I58) | Add a one-line modulus-role table |
| 18 | Simple/compound interest signs and factors | `05_Engineering_Economy.md` `### 1. Simple and Compound Interest`: "$F = P(1+i)^n$, $P=F(1+i)^{-n}$, simple discount $F=P/(1-dn)$" | Matches the corpus (D2-Q37, P13-I46); **no error found — recorded as checked-OK** | None |

---

## 5. Over-coverage (vault topics never exercised by this corpus)

- `01_General_Chemistry.md`: Slater $Z_{\text{eff}}$ and periodic-trend table beyond electronegativity; Born–Landé lattice energy and percent-ionic-character formula; VSEPR/hybridisation tables; all colligative properties; Raoult/Henry; $K_a/K_b$ buffers and Henderson–Hasselbalch; Nernst equation; Faraday's electrolysis laws; Peukert and C-rate; the battery-chemistry table except the Li-ion energy-density row.
- `02_University_Physics.md`: rolling-order table and $a=g\sin\theta/(1+I/mR^2)$; conical pendulum; series/parallel thermal resistance; Newton's law of cooling; Mach cone; two-lens/magnification chains; lensmaker's equation (used only indirectly); Carnot/COP diagrams; free-expansion and adiabatic-process tables beyond the single adiabatic-expansion item.
- `03_Materials_Science.md`: Miller indices, $d_{hkl}$, Bragg and Scherrer; allowed-reflection rules; Brinell/Vickers/Knoop/Rockwell and the Mohs scale; Hall–Petch; dislocation density values; the whole Fermi-level and carrier-statistics topic (only $E_g$ values were used); Steinmetz/eddy-loss coefficients; dielectric loss tangent and $E_{bd}$ tables.
- `04_Environmental_Sci_and_PH_Laws.md`: Gaussian plume model; AQI equation; all BOD/COD/DO kinetics; landfill-life and recycling-rate formulas; RA 9003 littering fine schedule; RA 6969 permit chain; GWP numeric table beyond "CO₂ warms"; acid-rain stoichiometry.
- `05_Engineering_Economy.md`: arithmetic and geometric gradients; perpetuities/growing perpetuities; benefit–cost ratio; ERR and incremental-return worked forms; replacement/EUAC and marginal-cost-of-keeping (see §4 #3); the SLM/SYD/DDB tables.
- `06_Engineering_Management_and_PM.md`: Graicunas formula (the *concept* span of control was asked, not $R$); ISO 9001 clause structure and sister standards; TQM names; all Six Sigma metrics ($C_p$, $C_{pk}$, DPMO, sigma level); LTV/CAC and Burn Multiple; the nine BMC blocks; rule of 40.
- `07_ECE_Laws_and_Professional_Ethics.md`: the entire Data Privacy Act topic; the entire Cybercrime topic; RA 7925 carrier/franchise/tax detail beyond interconnection; DOLE DO 13 rule-by-rule table; PEC cabling standards and 90/100 m lengths.

---

## 6. Top 12 edits to make, ranked by likely board-point value

1. **`07_ECE_Laws_and_Professional_Ethics.md` → new `### 11. Civil Code Obligations and Contracts`** — mora solvendi/accipiendi/compensatio morae, Arts. 1165/1170/1174, fortuitous-event exception, contract types and liquidated damages.
2. **`07_ECE_Laws_and_Professional_Ethics.md` → new Part D `### 11. OOP, UML and Programming Fundamentals`** — encapsulation, polymorphism, inheritance, abstract class vs interface, try/catch/finally, UML class diagram/actor/multiplicity, plus one CAD line (ortho/chamfer/pan/model-vs-paper space).
3. **`06_Engineering_Management_and_PM.md` → new `### 11. Decision Analysis`** — $\mathrm{EMV}=\sum p_iX_i$, decision/chance nodes, maximin/maximax/Laplace/Hurwicz, minimax regret, risk aversion.
4. **`03_Materials_Science.md` → new `### 11. Diffusion (Fick's Laws)`** — $J=-D\,dC/dx$, $\partial C/\partial t=D\,\partial^2C/\partial x^2$, negative sign meaning, temperature dependence.
5. **`03_Materials_Science.md` → new `### 12. Nanomaterials`** — 1–100 nm definition, surface-area-to-volume, top-down vs bottom-up, quantum dots, CNT/graphene in supercapacitors and transparent conductors.
6. **`07_ECE_Laws_and_Professional_Ethics.md` `### 3.`** — fill the RA 9292 section table: Sec. 8 (10 years, PECE), Sec. 17 (15 days), Sec. 24 (2 years), and the Sec. 3(a) definition of "electronics".
7. **`04_Environmental_Sci_and_PH_Laws.md` `### 1.`** — add the ecology vocabulary box: abiotic/biotic, biosphere, carrying capacity + logistic growth, primary succession, biodiversity, ecosystem services, biomagnification.
8. **`02_University_Physics.md` → new Part D (Electrostatics, Circuits, Magnetism, Nuclear)** — Coulomb's law, $E$ unit, capacitor series/parallel, RLC resonance, Faraday/Lenz induction, $F=ILB\sin\theta$, transformer ratio, decay law/half-life, $\Delta E=\Delta mc^2$, moderator.
9. **`03_Materials_Science.md` `### 10.`** — Curie $T_C$ and Néel $T_N$ definitions with the ferro→para and antiferro→para transitions; add $K_{Ic}=Y\sigma\sqrt{\pi a}$ and the bulk-modulus definition to `### 5.`.
10. **`06_Engineering_Management_and_PM.md` → new `### 13. Motivation, Leadership and Control`** — Herzberg hygiene/motivators, Theory X/Y, autocratic/democratic/laissez-faire, transactional vs transformational, feedforward/concurrent/feedback control, Weber/Taylor/Fayol schools.
11. **`06_Engineering_Management_and_PM.md` → new `### 12. Financial Ratios`** and `### 14. Competitive Strategy` — current ratio, quick/acid-test ratio, income statement/accounting equation, plus Blue Ocean, Porter's generic strategies and Five Forces, PEST, adoption-life-cycle chasm.
12. **`01_General_Chemistry.md` `### 1.` / `### 3.`** — photoelectric equation $K_{\max}=1240/\lambda(\text{nm})-\Phi$ with threshold behaviour, isotope definition (neutron count), and hydrogen bonding / intermolecular forces.

---

## 7. Verdict

The vault is **adequate for the classic GEAS computation core but not for this corpus as a whole**. Physics, general chemistry, crystal structure, basic materials and engineering economy are covered well enough to solve most numerical items — those clusters alone account for roughly 55–60 % of the 200 digested questions — and the RA 9292 material in `07` is the best-matched content in the vault.

However, the corpus is deliberately term-heavy, and whole examined clusters have **zero** vault presence: OOP/UML/Java/CAD vocabulary (~24 items in D2 alone), Civil Code obligations and contracts, classical management theory and leadership, decision analysis (EMV, decision trees, regret), financial ratios, nanomaterials, polymers and piezoelectricity, ecology vocabulary, and **the entire electrostatics/circuits/magnetism/nuclear-physics block** — the last of which is a genuine hazard because the vault's only "Faraday's law" is electrolysis, so a reader would be actively misled on induction questions.

Realistically the vault answers on the order of **half** of the examined items and would need all 12 edits above before it could be called a GEAS sheet for this corpus. **The single biggest hole is structural: there is no computer/ICT/CAD/law-of-obligations coverage at all**, which together with the missing decision-analysis block is where most of the lost points sit.
