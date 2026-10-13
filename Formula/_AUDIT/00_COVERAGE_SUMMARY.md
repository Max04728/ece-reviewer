---
title: PB Corpus vs Formula-Sheet Vaults — Coverage Assessment
part: _AUDIT
tags: [ece, formula-sheet, audit, coverage]
audited: 2026
---

# Are the formula sheets adequate for the PB board-exam corpus?

**Short answer: no — not as they stand.** Aggregate coverage is roughly **80 %** of the
concepts actually examined. The shortfall is not diffuse noise; it clusters into a
handful of identifiable subjects and several dozen specific formulas. Everything below is
evidence-backed by the four detailed audits in this folder.

---

## 1. What is actually in the `PB` folder

The four PDFs are **not** one 100-question reviewer each. Each PDF is a merge of several
complete 100-item reviewer sets:

| PDF | Pages | Reviewer sets | Question blocks |
|---|---|---|---|
| `PB FINAL ELECS-merged.pdf` | 186 | 7 — PB EXAM (18), Set 2, Set 4, Set 5, SET 7, SET 9, SET 11 | ~700 |
| `PB FINAL GEAS-merged.pdf` | 131 | 6 — PB EXAM (20), PB-11, Set 4, PB EXAMS (11)_3, Set 5, PB EXAMS (13) | ~600 |
| `PB FINAL PB MATH-merged.pdf` | 166 | 6 — flagship, Set 3, Set 4, Set 6, SET 8, SET 10 | ~600 |
| `PB5 EST NEW VERSION-merged.pdf` | 199 | 7 — PB EXAMS (19) and (21)…(26) | ~700 |
| **Total** | **682** | **~26 sets** | **~2,600 questions** |

Each set carries its own **Part II terms**, **Part III formula sheet**, **Part IV answer
key/traps** and **Part V cram sheet**. Those built-in synthesis sections were extracted in
full and used as the primary "what the setter considers examinable" signal.

**Extraction caveat.** The audits worked from digests that captured ~1,970 of the ~2,600
blocks (ELECS 552, GEAS 200, MATH 520, EST 702). GEAS later sets use an `Item n:` /
`ITEM #nnn / 100` layout the first extractor missed; the GEAS report compensated with a
dedicated §3.3 covering those four sets, and the **formula/terms/cram sheets of every set
were captured in full regardless**. Later ELECS and MATH sets are under-represented in the
per-question tallies, so any true gap count is a *lower bound*.

---

## 2. The structural finding that dominates everything else

The four vaults are **four separate Obsidian vaults** — by design, nothing in one is
linkable from another (see `FORMULA_SHEET_STYLE_GUIDE.md` §1 and its warning callout).

The PB corpora **do not respect that boundary**. The ELECS paper tests control systems and
electromagnetics; the MATH paper tests sampling and PSD; the GEAS paper tests electrostatics
and magnetism; the EST paper tests instrumentation and PLCs. Each of those is filed in a
*different* vault from the one a student reviewing that paper would have open.

Consequence: **a vault-scoped audit reports large "missing subjects" that the set already
contains.** Verified examples:

| Reported as missing from… | Actually lives in… |
|---|---|
| `Electronics_Engineering` — control systems (~40 Q) | `Mathematics/06_Control_Systems.md`, 14 topics: Routh, root locus, Nyquist, margins, ζ/%OS, settling time, error constants, Mason, PID, state space |
| `Electronics_Engineering` — electromagnetics & magnetic circuits (~30 Q) | `Mathematics/05_Electromagnetics.md`, 22 topics: Gauss, Biot–Savart, Ampère, Faraday, Poynting, boundary conditions, vector potential |
| `Mathematics` — correlation / PSD / Wiener–Khinchin (~8 Q) | `EST/01_Signals_Spectra_and_Noise.md ### 2. Power Spectral Density` — states $S_x(f)=\int R_x(\tau)e^{-j2\pi f\tau}d\tau$ |
| `Mathematics` — Nyquist sampling (~1 Q) | `EST/01`, `Electronics/07 ### 12`, `Electronics/09 ### 3` |
| `Mathematics` — DFT / circular convolution | `EST/01 ### 10. DFT and FFT` |
| `GEAS` — electrostatics, circuits, magnetism | `Mathematics/05_Electromagnetics.md` |
| `EST` — industrial instrumentation, PLCs, thermocouples | `Electronics_Engineering/07_Industrial_Automation_and_Sensors.md` |
| `EST` — Poynting vector (4 Q) | `Mathematics/05_Electromagnetics.md ### 22` |

**So there are two different answers to "is it adequate?"**

- **As one combined reference set:** ~80 % coverage, and most headline holes close.
- **Per paper, using the vault that matches it:** materially worse, because the paper's
  own vault is silent on subjects the paper examines.

That second number is the one that matters for reviewing for a specific part.

---

## 3. Genuine set-wide gaps (absent from all four vaults)

These were grep-verified as returning **zero** real matches (substring false positives such
as `ortho`clase, `ATM`osphere, `PRI`mary were individually excluded) across the whole set.

### 3.1 Whole subjects missing

| Subject | ≈ Q | Where examined |
|---|---|---|
| **OOP / programming / UML / CAD** — encapsulation, polymorphism, inheritance, abstract vs interface, try/catch/finally, listeners, Java `awt`/BorderLayout, `CreateWindow()`, functional programming, UML class/use-case/multiplicity, CHAMFER/PAN/ortho/model-paper space | ~36 | GEAS D1+D2 |
| **Obligations & contracts** — mora solvendi/accipiendi, Civil Code Arts. 1165/1170/1174, fortuitous event vs legal delay | ~4 | GEAS D1-Q8, D2-Q6 |
| **Decision analysis** — EMV, decision/chance nodes, maximin, minimax regret (Savage), Hurwicz, risk aversion | ~6 | GEAS |
| **Classical management & leadership theory** — Herzberg, Weber, Taylor/Fayol, laissez-faire, feedforward/concurrent/feedback control, Gantt | ~8 | GEAS |
| **Competitive strategy vocabulary** — Porter (generic + 5 Forces), Blue Ocean, PEST, adoption-life-cycle chasm, Lean Canvas / Value-Proposition Canvas blocks, razor-and-blade, CSR | ~12 | GEAS |
| **Nuclear physics** — half-life, α/β/γ decay identities, mass defect $\Delta E=\Delta mc^2$, moderator | ~8 | GEAS |
| **Analytic geometry / conic sections** — ellipse, hyperbola, parabola, circle from implicit/parametric form | ~8 | MATH |
| **Network-security & telecom-service detail** — RSA, Diffie–Hellman, hashing, password space, ATM 53-byte cell, ISDN BRI 2B+D / PRI 23B+D, STP, 2-wire/4-wire hybrids | ~30 | EST |
| **BMS / life-safety / building integration** — KNX, DMX512, BACnet, DALI, smoke obscuration, fail-safe locks, HVAC CFM | ~15 | ELECS + EST |

### 3.2 High-value specific formula gaps

Ordered by the number of questions they unlock. Each is a 1–3 line addition.

| Formula / item | Needed by | Target |
|---|---|---|
| Noise bandwidth $B_n=\tfrac{\pi}{2}B_{3\text{dB}}\approx1.57B_{3\text{dB}}$; tuned $B_n=1/(RC)$ | EST ~2 Q + ELECS | `EST/01 ### 4` |
| Hartley capacity $C=2B\log_2 M$ | EST ~4 Q | `EST/03 ### 15` (only Shannon present) |
| Coax $Z_0=\frac{138}{\sqrt{\varepsilon_r}}\log_{10}\frac{D}{d}$; twin-lead $\frac{276}{\sqrt{\varepsilon_r}}\log_{10}\frac{2D}{d}$ | EST 2 Q | `EST/05 ### 1` (only L/C/R/G closed forms present) |
| Friis cascade in $F$-form $F=F_1+\frac{F_2-1}{G_1}+\dots$ | EST ~4 Q | `EST/01 ### 6` (only $T$-form, buried in Conditions) |
| Antenna array factor, tapered/phased arrays, polarization loss factor $\text{PLF}=\cos^2\theta$ | EST ~5 Q | `EST/06 ### 8` |
| Horn $\theta_E\approx56\lambda/d_E$; helix $C\approx\lambda$, $S\approx0.25\lambda$; cavity-resonator $Q$ | EST 3 Q | `EST/06 ### 9/12` |
| Mesh topology link count $L=N(N-1)/2$; topology family | EST ~14 Q | `EST/04 ### 2` |
| AM antenna current $I_t=I_c\sqrt{1+m^2/2}$; multi-tone AM/FM | EST 3 Q | `EST/02 ### 2` |
| 850 nm fiber window; Rayleigh scattering $1/\lambda^4$ | EST 3 Q | `EST/06 ### 16` |
| Wallis' formula $\int_0^{\pi/2}\sin^m\!\cos^n$ | MATH 1 Q (in its own terms sheet) | `Mathematics/02 ### 5` |
| Green's theorem $\oint(P\,dx+Q\,dy)=\iint(\partial_xQ-\partial_yP)dA$ | MATH 4 Q | `Mathematics/05 ### 3` |
| Numerical differentiation (forward/central, $O(h)$ vs $O(h^2)$) | MATH 2 Q | `Mathematics/08` — no such topic |
| Iterated/double integrals, mass of a lamina $M=\iint\rho\,dA$ | MATH ~7 Q | `Mathematics/02` — single integrals only |
| Area moment of inertia $I_x=\int y^2dA$ | MATH 1 Q | `Mathematics/02 ### 14` (first moments only) |
| Z-transform log pair $-\ln(1-az^{-1})\leftrightarrow \frac{a^n}{n}u[n-1]$ | MATH 1 Q | `Mathematics/07 ### 6` |
| PDE discriminant $B^2-4AC$ classification | MATH 2 Q | `Mathematics/03 ### 14` |
| DOE design block: blocking/RCBD, fractional-factorial aliasing $I=ABC$, interaction contrast, two-way ANOVA df, Taguchi nominal-is-best, orthogonal arrays | MATH ~6 Q | `Mathematics/09 ### 14` |
| Jacobi / Gauss–Seidel + strict diagonal dominance | MATH 1 Q | `Mathematics/08` |
| 2-variable Hessian / $D$-test | MATH 2 Q | `Mathematics/01 ### 6` |
| MLE | MATH 1 Q | `Mathematics/09` |
| Circular/DFT convolution $y[n]=\sum_{k=0}^{N-1}x[k]h[(n-k)\bmod N]$; discrete autocorrelation; $R_{xy}(k)=R_{yx}(-k)$ | MATH ~6 Q | `Mathematics/07 ### 5` |
| Voltmeter multiplier $R_s=V_{max}/I_m-R_m$; ammeter shunt $R_{sh}=\frac{I_mR_m}{I_{tot}-I_m}$; pot resolution | ELECS 3 Q | `Electronics/07 ### 17` |
| Current mirrors — basic, Widlar, Wilson | ELECS 5 Q | `Electronics/05 ### 18` |
| L-section matching $Q=\sqrt{R_{hi}/R_{lo}-1}$ | ELECS 1 Q | `Electronics/02 ### 11` |
| Wire $R=\rho L/A$ and $R_2=R_1[1+\alpha(T_2-T_1)]$ | ELECS 3 Q | `Electronics/01 ### 1` |
| Asynchronous hazards/races — static-0/1 hazard, consensus-term **addition**, critical race | ELECS ~8 Q | `Electronics/08 ### 4` |
| Distinct Boolean functions $2^{2^n}$; flash-ADC comparators $2^n-1$; majority $AB+BC+AC$ | ELECS 3 Q | `Electronics/08 ### 5/7`, `07 ### 13` |
| Mesh/node equation counts $B-N+1$, $N-1$ | ELECS 2 Q | `Electronics/01 ### 4/5` |
| $F=ILB\sin\theta$; Coulomb $F=kq_1q_2/r^2$; series/parallel capacitors; series RLC resonance; ideal transformer ratio; inductor at $t=0^+$ | GEAS ~10 Q | `GEAS/02` — no electricity/magnetism part |
| Photoelectric $K_{max}=hc/\lambda-\Phi$, threshold $f_0=\Phi/h$ | GEAS 2 Q | `GEAS/01 ### 1` |
| Fick's first and second laws | GEAS 3 Q | `GEAS/03` — no diffusion topic |
| Curie and Néel temperatures | GEAS 2 Q | `GEAS/03 ### 10` |
| Nanomaterials 1–100 nm, SA:V, top-down vs bottom-up, quantum dots | GEAS 3 Q | `GEAS/03` |
| Fracture toughness $K_{Ic}=Y\sigma\sqrt{\pi a}$ | GEAS 1 Q | `GEAS/03 ### 5` |
| Polymers, piezoelectricity, Hume-Rothery rules, isotope definition | GEAS ~6 Q | `GEAS/03`, `GEAS/01` |
| Damped harmonic oscillator; terminal velocity; moment of inertia | GEAS ~3 Q | `GEAS/02 ### 13/8` |
| Management/economy: EMV and decision trees, financial ratios (current, quick/acid-test), sensitivity analysis, marginal cost $\Delta TC/\Delta Q$, bulk modulus definition, depreciation as non-cash | GEAS ~12 Q | `GEAS/05/06` |
| Ecology/sustainability: carrying capacity & logistic growth, abiotic/biotic, biosphere, primary succession, biomagnification, Brundtland, Triple Bottom Line, carbon footprint, renewable/wind $P=\frac12\rho Av^3$ | GEAS ~8 Q | `GEAS/04` |
| RA 9292 Sec. 8 (10-yr Board qualification), Sec. 17 (15-day results), Sec. 24 (2-yr reinstatement), Sec. 3(a) verbatim definition; RA 8293 IP Code; PEC hazardous locations | GEAS ~6 Q | `GEAS/07 ### 3/9` |
| Unbypassed-emitter CE gain $A_v=-\frac{R_C\parallel R_L}{r_e+R_E}$ | ELECS 2 Q | `Electronics/05 ### 6` — bypassed form only |
| Clamper level with real diode $v_{o,peak}=V_m+V_\gamma$ | ELECS 1 Q | `Electronics/04 ### 7` — ideal levels only |
| In-vault $n=\lceil\log_2 N\rceil$ address lines; VFD affinity $P\propto N^3$; instrumentation/BMS protocols | ELECS ~15 Q | `Electronics/09 ### 3`, `06`, `07 ### 17` |

---

## 4. Correctness and consistency defects found

These are not coverage gaps — they are wrong or self-contradictory as written.

| # | Defect | Where | Impact |
|---|---|---|---|
| 1 | $\theta=\arg z=\tan^{-1}(y/x)$ with **no quadrant correction** | `Mathematics/04_Advanced_Engineering_Math.md ### 1` | Gives a Quadrant-IV value for Quadrant-II/III inputs — a **wrong answer**, not a missing one. Fix with `atan2` / $+180^\circ$ when $x<0$. |
| 2 | Two incompatible **sinc conventions** coexist: $\sin x/x$ vs $\sin\pi x/\pi x$ | `Mathematics/04 ### 13` vs `Mathematics/07 ### 1` | Same question yields two different-looking answers. Pick one and cross-note it. |
| 3 | **Two `Conditions:` conventions**: inline `**Label ★** — Conditions: …` vs standalone `**Conditions:** …` | Mathematics `01,02,03,04,08,09` use inline; `05,06,07` and **all** of Electronics/GEAS/EST use standalone | Violates the style guide's mandatory standalone line; makes the set inconsistent and defeats scripted checks |
| 4 | **19 topics carry no Conditions statement at all** | `Mathematics/03` (2), `04` (7), `08` (1), `09` (9) | Violates style guide §4.3 |
| 5 | Consensus theorem framed only as *removing* a redundant term | `Electronics/08 ### 4` Conditions line | The exam asks the reverse — **adding** $BC$ to kill a static-1 hazard. The vault states the identity but frames it as the exam's named trap. |
| 6 | `Electronics/05 ### 6` gives only the **bypassed** CE gain; `04 ### 7` gives only **ideal** clamper levels; `06 ### 3` gives the **half-wave** RMS applied to a TRIAC | see §3.2 | Partial coverage that produces wrong numbers if used directly |

Structural health is otherwise good: **every** file's declared `topics:` count equals its
`###` count (126 / 114 / 81 / 87), every subject file ends with `→ Back to [[00_Index]]`,
callout counts are in range, and the unescaped-pipe-in-table-math check returns **0** across
all 32 subject files.

---

## 5. Over-coverage (low yield for this corpus)

Candidate pruning targets — these cost lines but earn few points here:

- `Electronics/03` g-parameters, T/Π synthesis, insertion loss, Brune test
- `Electronics/06` converter magnetics design ($L_{min}$, $C_{min}$, $\Delta I_L$), inverter THD — the corpus tests phase control and thermal resistance instead
- `Electronics/08` Excess-3/2421 codes, Gray conversion, full logic-family arithmetic
- `Mathematics/05` — the corpus exercises it only through vector calculus, Coulomb and Maxwell; most of Part B/C is untested *by the MATH paper* (it is tested by the ELECS paper)
- `Mathematics/06` Ziegler–Nichols, lead-lag, controllability/observability
- `EST/02` §11 pre-emphasis, §4 VSB; `EST/03` §5 ADM; `EST/06` §12 TV/ISDB-T; `EST/01` §10 DFT/FFT, §9 anti-alias filters
- `GEAS/01` heavier electrochemistry than examined

> [!warning] Exam trap
> Do not delete over-covered material on this evidence. Several "over-covered" topics are
> the *reason* the set survives cross-paper bleed (e.g. `Mathematics/05` looks wasted against
> the MATH paper and is essential to the ELECS and GEAS papers).

---

## 6. Verdict

| Question | Answer |
|---|---|
| Do the sheets cover the corpus completely? | **No.** ~80 % of examined concepts; ~20 % missing or partial. |
| Are they accurate where they do cover? | **Yes** — no incorrect formulas were found in the EST or GEAS audits; the exceptions are the six defects in §4 (one of which, `arg z`, produces a wrong answer). |
| Is the gap diffuse trivia? | **No.** It concentrates in ~9 whole subjects plus ~40 named formulas, all listed above. |
| Would fixing it be expensive? | **No.** The §3.2 table is mostly 1–3 line insertions into existing `###` topics; §3.1 needs roughly six new topics and one new file. |

**Estimated effect of the fix list:** coverage rises from ~80 % to roughly **93–95 %** of
examined concepts, with no changes to the existing correct content other than the §4 repairs.

**Highest-leverage single action:** resolve the cross-vault silo (§2) — at minimum add a
cross-paper jump table to each `00_Index.md` naming the sister vault for control systems,
electromagnetics, sampling/PSD, and instrumentation. That is cheap and recovers a large
share of what each vault-scoped audit flagged.

---

## 7. Detailed audits

| Report | Scope |
|---|---|
| `ELECS_coverage.md` | `Electronics_Engineering/` vs `PB FINAL ELECS-merged.pdf` |
| `GEAS_coverage.md` | `GEAS/` vs `PB FINAL GEAS-merged.pdf` |
| `MATH_coverage.md` | `Mathematics/` vs `PB FINAL PB MATH-merged.pdf` |
| `EST_coverage.md` | `EST/` vs `PB5 EST NEW VERSION-merged.pdf` |

Each contains a per-file scorecard, per-question citations, an over-coverage list and a
ranked top-12/15 edit list.

> [!note] Method note
> The four audits are **vault-scoped** by construction — each was pointed at the single vault
> matching its PDF. Their "missing subject" headlines therefore overstate set-wide absence;
> §2 above is the correction, derived by grepping each claimed absence across all four vaults.
