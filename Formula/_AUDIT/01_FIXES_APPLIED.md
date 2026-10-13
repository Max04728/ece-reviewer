---
title: Fixes and Additions Applied
part: _AUDIT
tags: [ece, formula-sheet, audit, changelog]
---

# Fixes and additions applied to the four vaults

Follow-up to `00_COVERAGE_SUMMARY.md`. Everything below is **on disk and verified**.

## Topic totals

| Vault | Before | After | Added |
|---|---|---|---|
| `Mathematics/` | 126 | **132** | +6 |
| `Electronics_Engineering/` | 114 | **119** | +5 |
| `GEAS/` | 81 | **102** | +21 (incl. 1 new subject file) |
| `EST/` | 87 | **99** | +12 (incl. 1 new subject file) |
| **Total** | **408** | **452** | **+44** |

## Later additions

| Vault | Change | Effect |
|---|---|---|
| `Electronics_Engineering/` | New topic `07 ### 6. The 555 Timer` (monostable, astable, duty cycle, internal divider) | 119 → **120** |
| `Electronics_Engineering/` | `08 ### 13` expanded from "Asynchronous and Synchronous Counters" to **"Counters: Types, Modulus and Design"** — adds ring/Johnson, decade, up/down, presettable, taxonomy and IC tables, cascading | topic count unchanged (17) |
| All vaults | 22 factual/citation defects corrected — see `CROSSCHECK_INTERNET_VERIFICATION.md` | formulas verified |

## 1. Correctness repairs

| # | Defect | Fix |
|---|---|---|
| 1 | `Mathematics/04 ### 1` defined $\theta=\arg z=\tan^{-1}(y/x)$ with **no quadrant correction** — a wrong answer for Quadrant II/III | Replaced with $\operatorname{atan2}(y,x)$ plus an explicit quadrant-correction block and principal-value range |
| 2 | Two incompatible **sinc conventions** coexisted (`Mathematics/04 ### 13` unnormalized vs `07 ### 1` normalized) | Both now state their convention explicitly and cross-reference each other |
| 3 | **69 `Conditions:` lines used an inline `— Conditions:` style** in `Mathematics/01, 02, 03, 04, 08, 09`, against the style guide and inconsistent with the other 26 files | Converted to standalone `**Conditions:**` lines placed at the end of each formula group |
| 4 | **19 topics had no Conditions statement at all** (`Mathematics/03` ×2, `04` ×7, `08` ×1, `09` ×9) | Authored and inserted one per topic |
| 5 | `Mathematics/04 ### 17` carried a conditions clause mid-sentence after a comma | Split into a proper standalone Conditions line |
| 6 | `Mathematics/09 ### 6` had no Conditions line (only a table column) | Added one |
| 7 | `GEAS/01 ### 1` used an inline Conditions line | Converted and merged |
| 8 | 12 topics ended up with 2–3 `**Conditions:**` lines after the conversion | Merged into a single line per topic, all wording preserved |
| 9 | `\dfrac` appeared inside `$$…$$` display math across all four vaults (against the guide) | Replaced with `\frac` — visually identical in display mode, so 1662 blocks changed with no rendering impact |
| 10 | `Electronics/05 ### 6` gave only the **bypassed** CE gain | Added the unbypassed form $A_v=-\frac{R_C\parallel R_L}{r_e+R_E}$ and the bypass-removal effect |
| 11 | `Electronics/08 ### 4` framed the consensus theorem only as *removing* a redundant term — the exam's trap is the reverse | Added the static-1-hazard **addition** rule, plus a full hazards/races topic |
| 12 | `Electronics/04 ### 7` gave only ideal-diode clamp levels | Added the real-diode level $v_{o,peak}=V_m+V_\gamma$ |
| 13 | `Electronics/06 ### 3` gave the half-wave RMS form only | Added the full-wave TRIAC/controller form and its integration limits |
| 14 | `GEAS/05 ### 13` "marginal cost" was the replacement-analysis cost | Added the production form $MC=\Delta TC/\Delta Q$ |
| 15 | `GEAS/03 ### 5` bulk modulus existed only as $E/[3(1-2\nu)]$ | Added the definitional $K=-V\,\Delta P/\Delta V$ |

## 2. Formula and concept additions

**Mathematics (+6 topics)** — Wallis' formula; area moment of inertia; PDE discriminant classification; Hessian $D$-test; differentiability ⇒ continuity; Bessel $Y_\nu$ divergence; Green's theorem; directional derivative; solenoidal/irrotational vocabulary; cylindrical and spherical **curl** (the tables were asymmetric — divergence and Laplacian were given in all three systems but curl only in Cartesian); scalar triple-product geometry; dominant pole and LHP-zero effect; logarithmic $z$-pair; two-way ANOVA source table; $2^2$ interaction contrasts; blocking/RCBD; fractional-factorial aliasing; Taguchi nominal-is-best; orthogonal arrays; MLE; oscillatory-divergence note; Euler exactness.
New topics: **Iterated and Double Integrals**, **Analytic Geometry and Conic Sections**, **Correlation, PSD and Sampling**, **Numerical Differentiation**, **Iterative Linear Solvers**.

**Electronics (+5 topics)** — wire resistance $R=\rho L/A$ and temperature correction; mesh/node equation counts; L-section matching; octave scaling; inverse address-line count; flash-ADC comparator count $2^n-1$; distinct Boolean functions $2^{2^n}$; majority gate; Zener tunnelling/avalanche split; GTO turn-off; cascade corner rule.
New topics: **Mutual Inductance and Coupled Coils**, **Current Mirrors** (basic/Widlar/Wilson), **Measurements and Instrumentation**, **Building, AV and Industrial Integration**, **Asynchronous Logic, Hazards and Races**.

**GEAS (+21 topics)** — isotopes; photoelectric equation; terminal velocity; damped harmonic oscillator; Hume-Rothery rules; fracture toughness $K_{Ic}$; inverse piezoelectricity; Curie and Néel temperatures; Fick's laws; nanomaterials; polymers; electrostatics; AC circuits; magnetism; nuclear physics; abiotic/biotic, biosphere, succession, carrying capacity; carbon footprint; biomagnification; sustainability frameworks; energy resources; EMV and decision criteria; financial ratios; motivation and leadership; classical management schools and the three control types; Gantt chart; Lean/Value-Proposition Canvas blocks; sensitivity analysis; depreciation as a non-cash expense; risk aversion; RA 9292 Secs. 8/17/24 and Sec. 3(a); PEC hazardous locations; CSR; intellectual property.
New file: **`08_Computer_Systems_OOP_and_CAD.md`** (8 topics) — the ~36 OOP/UML/GUI/CAD questions that previously had no home.

**EST (+12 topics)** — equivalent noise bandwidth; Friis cascade in $F$-form; discrete autocorrelation and cross-correlation parity; DC-block property; AM antenna current; multi-tone AM/FM; 600 Ω telephony reference; Hartley's capacity law; high-frequency coax and twin-lead $Z_0$; STP loop prevention; horn beamwidth; helical antenna; 850 nm window and Rayleigh $\lambda^{-4}$ loss.
New topics: **Network Topologies**, **Network Security**, **Antenna Arrays and Polarization**, plus a new file **`07_Industrial_Automation_and_Instrumentation.md`** (8 topics) covering the ~29 instrumentation/PLC/SCADA/BMS/life-safety questions.

## 3. Verified-clean structural state

| Check | Result |
|---|---|
| `topics:` frontmatter equals `###` count, every file | **pass** (32 subject files) |
| `topics:` in `00_Index.md` equals the vault's real total | **pass** (132 / 119 / 102 / 99) |
| Exactly one standalone `**Conditions:**` line per topic | **pass** (0 missing, 0 duplicated, 0 inline) |
| Blank line before and after every heading | **pass** |
| `→ Back to [[00_Index]]` final line | **pass** |
| Unescaped `\|` inside table-cell math | **pass (0)** |
| `\dfrac` inside `$$…$$` | **pass (0)** |
| Wikilinks and numbered anchors resolve | **pass (0 broken of 400+)** |

**Known residual deviation:** 120 lines exceed the guide's 180-character preference (Mathematics 25, Electronics 12, GEAS 27, EST 56). These are overwhelmingly pre-existing — mostly `$variable$ in unit` definition lines and callout lines in `EST/06` and `EST/05`. The guide permits the occasional long line; none was introduced by the additions beyond a handful that were immediately wrapped.

## 4. Provenance caveats

- **RA 9292 Secs. 8 / 17 / 24 and Sec. 3(a)** were written from the review brief, **not verified against the primary statute**.
- **RA 8293 IP terms** (patent 20 years, utility model 7, industrial design 5×2, trademark 10, copyright life+50) are the standard figures but were **not verified against the current Code**, and the RA 10372 amendment was not cited.
- **PEC hazardous-location classes** are stated without article/section citations.
- These are marked with a `> [!warning] Unverified figures` callout in `GEAS/00_Index.md`. Confirm against the official texts before relying on them.

## 5. Cross-vault discoverability

Each `00_Index.md` now carries a `> [!tip] Sibling vaults` callout naming where the *other* vaults' material lives — control systems and electromagnetics for Electronics, sampling/PSD and instrumentation for Mathematics, management/law for the others. This is the cheap fix for the silo problem identified in the main summary; the four vaults remain separate Obsidian vaults and still cannot wikilink across.
