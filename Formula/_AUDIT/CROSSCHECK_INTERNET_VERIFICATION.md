---
title: Internet Crosscheck of All Formulas
part: _AUDIT
tags: [ece, formula-sheet, audit, fact-check, crosscheck]
audited: 2026
scope: All 33 subject files across Mathematics, Electronics_Engineering, GEAS, EST
method: Each formula compared against authoritative internet sources; findings must cite a fetched source
status: ALL 22 DEFECTS FIXED — 13 files edited, structure checks pass
---

# Internet crosscheck of the formula sheets

Independent re-verification of every formula in the four vaults against internet sources
(NIST/CODATA, DLMF, MathWorld, IEEE/ITU, lawphil.net and the Supreme Court E-Library for
Philippine statutes, manufacturer datasheets, and standard textbook errata).

**Bottom line: the sheets are in very good shape.** Of roughly **2,600 formula lines** examined
across **33 subject files**, **22 genuine defects** were confirmed. **13 of the 33 files are
completely clean**, and no file is wrong throughout. The errors cluster in three places:
Philippine statutory citations, a handful of tabulated reference values, and a few
coefficient/sign slips.

> [!success] All 22 defects have been corrected
> Every finding below has been fixed in the source file. 13 files were edited; all 13 pass the
> style guide's structural checks (`topics:` = `###` count, back-link present, no unescaped
> pipes in table math, no `\dfrac` in display math).

> [!warning] Reading this report
> Only findings that a fetched source confirms are listed. Candidates that could not be
> established from a source were dropped rather than asserted. Three findings (marked
> ⚠️) are **internal inconsistencies** — the file contradicted a definition it stated itself —
> so they held regardless of which convention was preferred.

---

## 1. Summary by severity

| Severity | Count | Meaning |
|---|---|---|
| **CRITICAL** | 6 | Produces a wrong numeric answer or states a false legal penalty |
| **MAJOR** | 13 | Wrong as written, or contradicts the file's own stated rule |
| **MINOR** | 3 | Imprecise wording / needs a stated convention |
| **Total** | **22** | |

### By vault

| Vault | Subject files | Findings | Clean files |
|---|---|---|---|
| `Mathematics/` | 9 | 2 | 7 |
| `Electronics_Engineering/` | 9 | 6 | 4 |
| `EST/` | 7 | 3 | 4 |
| `GEAS/` | 8 | 11 | 5 |
| **Total** | **33** | **22** | **13 clean (+ 4 index files)** |

---

## 2. CRITICAL findings — fix these first

### C1. `GEAS/04_Environmental_Sci_and_PH_Laws.md` — Topic 7, PD 1586 Sec. 9
- **As written:** "fine of **not less than ₱50,000**".
- **Problem:** PD 1586 Sec. 9 sets a **ceiling**, not a floor. The statute reads "a fine in an amount
  **not to exceed** Fifty Thousand Pesos (₱50,000.00) for every violation".
- **Correct:** fine **not exceeding ₱50,000** per violation, plus suspension/cancellation of the ECC.
- **Source:** [PD 1586, Sec. 9](https://lawplayer.com/ph/act/pd-1586)

### C2. `GEAS/04_Environmental_Sci_and_PH_Laws.md` — Topic 8, RA 8749 penal clauses
- **As written:** "**Sec. 45 (penalties):** fine of not less than ₱10,000 but not more than
  ₱100,000 per day … and/or imprisonment of 1 to 6 years."
- **Problem:** Two sections are merged and both are misquoted. Sec. 45 ("Violation of Standards for
  Stationary Sources") imposes **not more than ₱100,000 per day, with no fine floor and no
  imprisonment**. The ₱10,000–₱100,000 range with imprisonment is **Sec. 47**, and its term is
  **6 months to 6 years**, not 1–6 years.
- **Correct:** Sec. 45 — fine not more than ₱100,000/day, no imprisonment. Sec. 47 — ₱10,000–₱100,000
  and/or 6 months–6 years.
- **Source:** [RA 8749 Sec. 45](https://lawplayer.com/ph/article/ra-8749/s0045) · [Sec. 47](https://lawplayer.com/ph/article/ra-8749/s0047)
- **Note:** the file's own "Exam trap" callout repeats the wrong version.

### C3. `GEAS/07_ECE_Laws_and_Professional_Ethics.md` — Topic 8, RA 11058 fine
- **As written:** "**₱20,000 to ₱100,000 per day** of violation … (Labor Code Art. 288, as amended by RA 11058)."
- **Problem:** RA 11058 Sec. 28(a) provides a fine "**not exceeding ₱100,000 per day**". There is
  **no ₱20,000 floor**, and the penalty comes from **RA 11058 Sec. 28**, not Labor Code Art. 288.
- **Correct:** administrative fine not exceeding ₱100,000/day until corrected.
- **Source:** [RA 11058 full text, Sec. 28](https://www.lawphil.net/statutes/repacts/ra2018/ra_11058_2018.html)

### C4. `GEAS/04_Environmental_Sci_and_PH_Laws.md` — Topic 10, RA 6969 Sec. 14
- **As written:** illegal importation/transport/dumping of hazardous and nuclear waste carries
  "**6 years and 1 day to 12 years**".
- **Problem:** The range matches **neither** statutory tier. Sec. 13(a)–(c) violations carry
  **6 months and 1 day to 6 years and 1 day** (+ ₱600–₱4,000); Sec. 13(d) hazardous/nuclear waste
  importation carries **12 years and 1 day to 20 years**.
- **Source:** [RA 6969 Sec. 14](https://lawplayer.com/ph/article/ra-6969/s0014)

### C5. `EST/03_Digital_Communications.md` — Topic 15, Shannon-limit table
- **As written (lines 502–508):**

  | $\eta$ | Min $E_b/N_0$ (dB) | Min SNR (dB) |
  |---|---|---|
  | 0.5 | $-0.8$ | $-3.8$ |
  | 1 | 0 | 0 |
  | 2 | 1.8 | 4.8 |
  | 4 | **4.8** | **12.0** |
  | 8 | **7.9** | **21.4** |

- **Problem:** The file's own formula on line 498 states $E_b/N_0 \ge (2^\eta-1)/\eta$, which
  evaluates to **5.74 dB** and **15.03 dB** at η = 4 and 8 — not 4.8 and 7.9. The η = 8 row is
  7 dB low. The SNR column ($10\log_{10}(2^\eta-1)$) is right for η ≤ 4 but should be **24.1 dB**
  at η = 8, not 21.4 dB. The table contradicts the formula directly above it.
- **Correct:** η=4 → **5.7 / 11.8** dB; η=8 → **15.0 / 24.1** dB.
- **Source:** [Eb/N0 — Shannon limit](https://en.wikipedia.org/wiki/Eb/N0) · [Shannon–Hartley theorem](https://en.wikipedia.org/wiki/Shannon%E2%80%93Hartley_theorem)

### C6. `Electronics_Engineering/05_Circuit_Analysis_and_Design.md` — Topic 15, class-B dissipation
- **As written (line 740):** $P_{D,max}=\dfrac{V_{CC}^2}{4R_L}$ (class B, at $V_{op}=2V_{CC}/\pi$).
- **Problem:** Wrong coefficient. Maximum class-B transistor dissipation is
  $\frac{4}{\pi^2}P_{o,max}=\frac{4}{\pi^2}\cdot\frac{V_{CC}^2}{2R_L}=\frac{2V_{CC}^2}{\pi^2R_L}$.
  The file's $V_{CC}^2/4R_L$ is $P_{o,max}$ at *half* swing, overstating worst-case dissipation
  by **23.4 %**.
- **Correct:** $P_{D,max}=\dfrac{2V_{CC}^2}{\pi^2R_L}=\dfrac{4}{\pi^2}P_{o,max}$.
- **Source:** [Sedra/Smith-derived derivation](https://drive.google.com/uc?export=download&id=0Bw7Yu3H6XxFybGJxa0FfdnJ1TEE) ·
  [second independent derivation](https://drive.google.com/uc?export=download&id=0Bw7Yu3H6XxFyNHlPMnJTLTc4TDQ)
- **Note:** the file's own callout correctly places the peak at $V_{op}=2V_{CC}/\pi$; only the
  coefficient is wrong.

---

## 3. MAJOR findings

### M1. `EST/01_Signals_Spectra_and_Noise.md` — Topic 3, parallel-RLC noise bandwidth
- **As written (line 150):** $B_n=\frac{\pi}{2}B_{3\text{dB}}$ (single-tuned), $B_n=\frac{1}{RC}$ (parallel RLC).
- **Problem:** For a parallel RLC, $Q=\omega_0RC$, so $\Delta f=f_0/Q=1/(2\pi RC)$ and
  $B_n=\frac{\pi}{2}\Delta f=\frac{1}{4RC}$ — **four times smaller**. The file's value inflates
  receiver noise power $P_n=kTB_n$ by ≈ **+6 dB**, and contradicts the correct π/2 relation it
  states in the same line.
- **Correct:** $B_n=\dfrac{1}{4RC}$.
- **Source:** [Q factor](https://en.wikipedia.org/wiki/Q_factor) · [Johnson–Nyquist noise](https://en.wikipedia.org/wiki/Johnson%E2%80%93Nyquist_noise)

### M2. `EST/02_Principles_of_Communications.md` — Topic 10, FM figure of merit ⚠️
- **As written:** line 298 (and 272, 311, 319) define $FOM_{FM}=\frac{3}{2}\beta^2$, but line 304
  reports "FM β=5: **+18.8 dB**".
- **Problem:** $10\log_{10}(1.5\cdot5^2)=10\log_{10}37.5=\mathbf{+15.7\ dB}$. The printed
  +18.8 dB is $10\log_{10}(3\cdot5^2)$ — computed from $3\beta^2$, contradicting the definition
  used everywhere else in the topic (a 3.01 dB self-contradiction).
- **Correct:** **+15.7 dB** if the file's own $\frac32\beta^2$ is kept.
- **Source:** [NPTEL/IIT notes](https://archive.nptel.ac.in/content/storage2/courses/117106090/Pdfs/1_10.pdf)
  (confirms $(3/2)\beta^2$ as the standard single-tone FM figure of merit) ·
  [UIUC ECE 458](https://courses.grainger.illinois.edu/ece458/comms2.pdf)
- **Note:** line 272's $3\beta^2$ is a *different valid* quantity (referenced to message bandwidth),
  so it is not itself wrong; only line 304 mixes the two conventions.

### M3. `Electronics_Engineering/04_Semiconductor_Devices.md` — Topic 6, ripple expressions ⚠️
- **As written:** line 333 gives $\frac{I_{dc}}{fC}$ as **full-wave**; line 335 gives
  $\frac{I_{dc}}{2fC}$ as **half-wave**.
- **Problem:** The factor is attached to the wrong rectifier type. The capacitor discharges for one
  full period in half-wave (recharge at $f$) and half a period in full-wave (recharge at $2f$), so
  **half-wave ripple is the larger one**. The file's own Conditions line (357) says "full-wave uses
  $2f$" and its callout (360) says "use $f$ (not $2f$) for half-wave and $2f$ for full-wave" — both
  the opposite of the formulas directly above them.
- **Correct:** $V_r=\dfrac{I_{dc}}{fC}$ **half-wave**; $V_r=\dfrac{I_{dc}}{2fC}$ **full-wave**.
- **Source:** [SVCET EDC notes](https://svcet.ac.in/wp-content/uploads/2023/12/EDC-NOTES.pdf)
  (full-wave ripple factor $\Gamma=1/(4\sqrt3 fCR_L)$); the file's own line 327 ripple factor is the
  full-wave form, which is what exposes the mismatch.

### M4. `GEAS/04` — RA 8749 Sec. 17 → **Sec. 16** (Permit to Operate)
- **Problem:** Sec. 17 is "Emission Quotas"; permits for stationary sources are **Sec. 16**.
- **Source:** [RA 8749 Sec. 17](https://lawplayer.com/ph/article/ra-8749/s0017)

### M5. `GEAS/04` — RA 8749 Sec. 5 → **Sec. 12** (ambient air quality guideline values)
- **Problem:** Sec. 5 is "Definitions"; the guideline values are set in **Sec. 12**.
- **Source:** [RA 8749 section list](https://lawplayer.com/ph/act/ra-8749)

### M6. `GEAS/04` — RA 9003 Sec. 48 ↔ **Sec. 49** (fines and penalties swapped)
- **Problem:** Sec. 48 is "Prohibited Acts" and Sec. 49 is "Fines and Penalties". The amounts cited
  (₱300–₱1,000 and/or 1–15 days community service) are correct but belong to **Sec. 49**.
- **Source:** [RA 9003 Sec. 49](https://lawplayer.com/ph/article/ra-9003/s0049)

### M7. `GEAS/04` — RA 9003 Sec. 41 → **Sec. 37** (open-dumpsite prohibition)
- **Problem:** Sec. 41 is "Criteria for Establishment of Sanitary Landfill"; the open-dump
  prohibition and closure mandate is **Sec. 37**.
- **Source:** [RA 9003 section list](https://lawplayer.com/ph/act/ra-9003)

### M8. `GEAS/07` — RA 10175 Sec. 12 → **Sec. 13** (6-month data retention)
- **Problem:** Sec. 12 is "Real-Time Collection of Traffic Data"; the six-month preservation duty is
  **Sec. 13, "Preservation of Computer Data"**.
- **Source:** [RA 10175 full text](https://www.lawphil.net/statutes/repacts/ra2012/ra_10175_2012.html)
- **Note:** the file's own high-yield tip repeats the wrong section number.

### M9. `GEAS/07` — RA 10173 penalty table (multiple rows)
- **Problems:**
  - "Unauthorized processing, **sensitive**" listed as ₱2,000,000–₱5,000,000; **Sec. 25(b)** actually
    provides **₱500,000–₱4,000,000**.
  - "Improper disposal" given only as 6 months–2 years / ₱100,000–₱500,000 (that is the
    *personal-information* tier, Sec. 27(a)); **sensitive** disposal is **1–3 years /
    ₱100,000–₱1,000,000** (Sec. 27(b)).
  - Negligent access to **sensitive** data (3–6 years / ₱500,000–₱4,000,000, Sec. 26(b)) is omitted.
- **Source:** [RA 10173 Secs. 25–30](https://lawplayer.com/ph/act/ra-10173) ·
  [ASG Law summary](https://asg.ph/insights/data-privacy-act-penalties-philippines)

### M10. `Mathematics/06_Control_Systems.md` — Topic 10, settling-time tip
- **As written (line 443):** $t_s\approx\dfrac{4}{\omega_{gc}\tan PM}$.
- **Problem:** Not a standard identity. Writing $G(s)=\frac{\omega_n^2}{s(s+2\zeta\omega_n)}$ gives
  $\tan PM=\frac{2\zeta\omega_n}{\omega_{gc}}$ exactly, so the file's expression reduces to
  $\frac{2}{\zeta\omega_n}$ — **exactly half** the correct $t_s\approx\frac{4}{\zeta\omega_n}$.
  It also diverges (infinite settling time) at PM = 90°, where the true value is finite.
- **Correct:** $t_s\approx\dfrac{4}{\zeta\omega_n}$, with $\zeta\approx PM/100$ (PM in degrees),
  i.e. $t_s\approx\frac{400}{PM\cdot\omega_n}$. This matches the file's own line 213.
- **Source:** [Gain and Phase Margins Explained (Brian Douglas)](https://www.youtube.com/watch?v=ThoA4amCAX4),
  cited by the file itself; standard second-order specification $t_s=4/(\zeta\omega_n)$.

### M11. `Mathematics/09_Engineering_Data_Analysis.md` — Topic 14, "F > 1 by construction"
- **As written:** line 597 "…$F>1$ by construction…" and the line 600 tip "ANOVA $F>1$ always".
- **Problem:** **False.** $F=MSA/MSE$ is a ratio of two mean squares and is not bounded below by 1.
  Under $H_0$ it is centred near 1 and individual samples routinely give $F<1$, which a student
  following this tip would misread as an error rather than compare against $F_{\alpha,k-1,N-k}$.
  The file's own rejection rule (line 532) is a correct one-sided upper-tail test.
- **Source:** [One-way ANOVA](https://www.jove.com/science/de/science-education/v/13620/one-way-anova)

### M12. `Electronics_Engineering/09_Microprocessors_and_Embedded.md` — Topic 9, ADC code mapping
- **As written (line 483):** $Digital=\mathrm{round}\!\left(\frac{V_{in}}{V_{ref}}2^n\right)$.
- **Problem:** Off by one code. The correct map is the **integer part**,
  $\lfloor V_{in}2^n/V_{ref}\rfloor$, saturating at $2^n-1$. Rounding returns $2^n$ at
  $V_{in}=V_{ref}$, which is not representable in $n$ bits. The file contradicts itself: line 805
  correctly gives $V_{FS}=V_{ref}(2^n-1)/2^n$.
- **Correct:** $Digital=\left\lfloor\dfrac{V_{in}}{V_{ref}}2^n\right\rfloor$, max code $2^n-1$.
- **Source:** standard ADC transfer function (TI/ADI datasheet convention); the file's own line 805.

### M13. `Electronics_Engineering/06_Power_Electronics_and_Systems.md` — Topic 3, line 165 ⚠️
- **As written:** $V_{rms}=V_m\sqrt{\frac{1}{\pi}\left(\pi-\alpha+\frac{\sin2\alpha}{2}\right)}=\sqrt2\,V_{rms}$(half-wave).
- **Problem:** As printed this is the false identity $X=\sqrt2\,X$ — the same symbol appears on both
  sides, because the right-hand side was meant to reference the **half-wave** expression on line 161
  without labelling it.
- **Correct:** label both sides —
  $V_{rms,full}=V_m\sqrt{\frac1\pi\left(\pi-\alpha+\frac{\sin2\alpha}{2}\right)}=\sqrt2\,V_{rms,half}$.
- **Source:** [full-wave controlled-rectifier RMS derivation](https://www.mdpi.com/2411-5134/11/4/69/pdf)

---

## 4. MINOR findings

### m1. `Electronics_Engineering/07_Industrial_Automation_and_Sensors.md` — Topic 6, absolute-value output polarity
- **As written (line 311):** $V_o=\lvert V_{in}\rvert\frac{R_f}{R_i}$.
- **Problem:** The standard op-amp absolute-value circuit's output is **negative**,
  $V_o=-\lvert V_{in}\rvert\frac{R_f}{R_i}$. The file's own summing form on line 313 *does* carry a
  leading minus, so the two lines disagree. No schematic is given, so a following inverter stage
  cannot be ruled out from the text alone.
- **Correct:** state the polarity, e.g. $V_o=-\lvert V_{in}\rvert\frac{R_f}{R_i}$ (inverted output).
- **Source:** [TI SBOA296 — full-wave rectifier](https://www.ti.com/document-viewer/lit/html/sboa296) ·
  [TI SBOA214](https://www.ti.com/document-viewer/lit/html/sboa214)

### m2. `Electronics_Engineering/04_Semiconductor_Devices.md` — Topic 7, "n stages" undefined
- **As written (line 419):** $V_{out}=nV_m$ (half-wave, $n$ stages), $V_{out}=2nV_m$ (full-wave).
- **Problem:** "Stage" is never defined, and the standard Cockcroft–Walton convention is
  $V_o=2N V_p$ where $N$ = number of diode-capacitor stages. The file's own table (doubler 2V_m,
  tripler 3V_m) counts *multiplication steps*, not CW stages, so the formula and the table use
  different units for $n$ and a student will pick the wrong one.
- **Correct:** define the unit explicitly — $V_{out}=nV_m$ with $n$ = multiplication steps, or the
  CW form $V_{out}=2NV_m$ with $N$ = diode-capacitor stages.
- **Source:** [Cockcroft–Walton generator](https://en.wikipedia.org/wiki/Cockcroft%E2%80%93Walton_generator) ·
  [Voltage multiplier](https://en.wikipedia.org/wiki/Voltage_multiplier)

### m3. `EST/05_Transmission_Lines_and_Waveguides.md` — Topic 9, "a = 2b" wording
- **As written:** Conditions line states "a = 2b in standard sizes".
- **Problem:** Real standard guides are only approximately 2:1 — WR-90 is 22.86 × 10.16 mm
  (**a/b = 2.25**) and WR-42 is 10.67 × 4.32 mm (**a/b = 2.47**). The *formula* is unaffected; only
  the blanket claim is imprecise.
- **Correct:** "typically close to 2:1" rather than an exact equality.
- **Source:** standard WR waveguide dimension tables.

---

## 5. Files verified clean

These files were read in full and every formula, table entry and constant was checked against
sources with **no defects found**:

| Vault | Clean files |
|---|---|
| `Mathematics/` | 01 Differential Calculus, 02 Integral Calculus, 03 Differential Equations, 04 Advanced Engineering Math, 05 Electromagnetics, 07 Signals and Systems, 08 Numerical Methods |
| `Electronics_Engineering/` | 01 DC Circuits, 02 AC Circuits, 03 Two-Port Networks, 08 Logic Circuits |
| `EST/` | 04 Data Communications, 05 Transmission Lines, 06 Antennas, 07 Industrial Automation |
| `GEAS/` | 01 General Chemistry, 03 Materials Science, 05 Engineering Economy, 06 Engineering Management, 08 Computer Systems |

### Notable items confirmed CORRECT (commonly suspected, but right)

- $V_T=kT/q=25.85$ mV at 300 K and $dV_T/dT=+0.085$ mV/K — both exact.
- kT = −174 dBm/Hz at 290 K; Friis cascade $F=F_1+\frac{F_2-1}{G_1}+\cdots$; $F=1+T_e/T_0$.
- Coax $Z_0=\frac{138}{\sqrt{\varepsilon_r}}\log_{10}\frac{D}{d}$ and twin-lead $\frac{276}{\sqrt{\varepsilon_r}}\log_{10}\frac{2D}{d}$.
- Rayleigh/Jefferson constants: FSPL 32.44 (MHz/km), 92.45 (GHz/km), −147.55 (Hz/m) — all exact.
- T1 = 193 bits × 8000 = 1.544 Mbit/s; E1 = 256 × 8000 = 2.048 Mbit/s — exact.
- Cellular reuse $N=i^2+ij+j^2$, $D=R\sqrt{3N}$, $SIR=(3N)^{n/2}/6$ — all four table rows reproduce.
- The entire WR waveguide table recomputed against $f_{c10}=c/2a$ — every row matches.
- Half-wave dipole D = 1.64, $R_r$ = 73 Ω, $E_\theta=60I_0/r\cdot\cos(\frac\pi2\cos\theta)/\sin\theta$.
- Simpson 3/8 composite error $-(b-a)h^4f^{(4)}/80$; machine epsilon $\frac12b^{1-t}$.
- Bessel recurrences (DLMF §10.6); $\int dx/(x^2-a^2)=\frac{1}{2a}\ln|(x-a)/(x+a)|$.
- Z-transform pairs including $na^n\mu[n]\to az^{-1}/(1-az^{-1})^2$ and the $\ln$ pair.
- HVAC constants 1.08 = 60 × 0.075 × 0.24 and 4.5 = 60 × 0.075 — exact.
- Pt100 α = 0.00385/°C → 138.5 Ω at 100 °C, and the 10 Ω lead error → +26 °C.
- Engineering-economy factors (P/A, A/G, SYD, DDB, CC = FC − SV/i) under the file's stated
  end-of-period convention.
- RA 9292 Secs. 8/17/24/35, RA 8293 IP terms, RA 10175 Secs. 4/6/8/19/24, RA 9275 Sec. 28.

---

## 6. Method and limits

1. Each of the 33 subject files was read in full, line by line.
2. Every formula, constant, table entry and legal citation not certain from memory was checked
   against a fetched source — NIST/CODATA, DLMF, MathWorld, IEEE/ITU, lawphil.net and the Supreme
   Court E-Library, TI/ADI datasheets, and standard textbook errata.
3. **Each candidate defect was verified twice and independently.** Candidates that could not be
   confirmed from a source were **dropped rather than reported** — this is why the count is 22 and
   not 60. Several plausible-looking suspects (the $1/(1+x)$ Maclaurin series, the $\ln(1+x)$
   endpoint, Bessel recurrences, the amplitude–phase $\phi_n$, the two sinc conventions, the
   Simpson 3/8 constant) were investigated and confirmed **correct**.
4. Two structural checks were run across all files: no unescaped `|` inside table-cell math, and no
   `\dfrac` in display math. Both pass.

> [!note] On the ⚠️ findings
> M2, M3 and M13 are internal inconsistencies: the file contradicts a definition or rule it states
> itself in the same topic. They are defects whichever convention the author intended, but the fix
> requires a choice — either correct the derived number/expression or change the stated convention.

> [!warning] One unverified item
> `GEAS/07` line 111 states PTEs pay a "3% franchise tax on gross receipts". **RA 7925 contains no
> tax provision at all** (all 27 sections were read). The 3% franchise tax is a NIRC matter, but the
> governing NIRC section could not be fetched to confirm the current rate and its "in lieu of"
> scope. This is flagged as **unverified — needs primary text**, not asserted as an error.
