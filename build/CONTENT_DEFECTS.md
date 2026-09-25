# Content defects found during the calculator-technique rollout

Found by workers reading the notes closely and **independently re-checked by the orchestrator**
before being acted on. This list is the only record of genuine mathematical errors in the vault —
`verify.mjs` covers structure, links, widgets, payload validity and calc-block contract compliance,
but nothing checks whether the numbers in a note are right.

All items below were fixed on the owner's instruction (round 4 follow-up). After the fixes:
`node build/build-notes.mjs` renders 408 notes and `node build/verify.mjs` reports
**ALL CHECKS PASSED**.

| # | Payload | Problem | Was | Now | Status |
|---|---------|---------|-----|-----|--------|
| 1 | `02_EE/04_Semiconductor_Devices/05_Rectifiers_…` | P2 | `19.3/pi = 6.144 V` and `P_dc = 37.8 mW` (which `6.144^2/1000` does not give) | `6.143 V` and `37.7 mW` | fixed |
| 2 | `02_EE/04_Semiconductor_Devices/07_Clippers,_Clampers_and_Multipliers` | P5 step 4 | applied the linear `R_out = n^3/(fC) = 10.7 Mohm` at 1 mA, implying 10.7 kV from a 45.2 V source | states that 1 mA would demand 10.7 kV, so the model is already invalid there and the output collapses | fixed |
| 3 | `02_EE/04_Semiconductor_Devices/04_Diode_Models_and_Load_Line` | P3 | crossing quoted at `0.597 V` with 9.38 mA against 9.40 mA | `0.5971 V`, both sides 9.403 mA | fixed |
| 4 | `02_EE/05_Circuit_Analysis_and_Design/08_FET_Amplifiers_CS,_CD,_CG` | P1 | sign flip gave `10 mA(1 + I_D/4)^2`, which has no real root; the printed `I_D = 1.528 mA` satisfied neither Shockley nor the bias line | `2.147 mA`, `V_GS = -2.147 V`, `g_m = 2.32 mS`, `A_v = -3.79` | fixed |
| 5 | same | P2 | inherited `g_m = 3.09 mS`; `A_v = 0.848`, `R_out = 282 ohm` | `g_m = 2.32 mS`, `A_v = 0.807`, `R_out = 360 ohm` | fixed |
| 6 | same | P4 | `k = 2 mA/V^2` keyed as 2: `g_m = 178.9 mS`, overdrive `44.7 mV`, `A_v = -226` | `5.66 mS`, `1.41 V`, `A_v = -7.15` (`R_out = 1.72 kohm` was already right) | fixed |
| 7 | `02_EE/05_Circuit_Analysis_and_Design/10_Darlington_and_Feedback_Pairs` | P5 | `beta_D ~ 127,600`, and its own step (`50^3 + 2500 = 127,500`) did not match the quoted figure | exact `(beta+1)^3 - 1 = 132,650`, so `I_E = 1.327 A`, `R_in = 62.3 Mohm` | fixed |
| 8 | `04_EST/02_Principles_of_Communications/09_FM_Noise_and_Threshold_Effect` | P3, trap, ans | bandwidth `6fm -> 10fm` called `+4.4 dB` (`20log`), contradicting the note's own `10log` convention; the trap also called the exchange "unfavourable" | `+2.2 dB` by `10log`; trap now says the exchange is **favourable** (~3 dB of SNR per dB of bandwidth) and that the real price is the threshold | fixed |
| 9 | `04_EST/02_Principles_of_Communications/13_Image_Frequency_and_IRR` | P5 step 3 | `910 kHz` called "91 times the filter's half-bandwidth" | `182x` the 5 kHz half-bandwidth, or `91x` the full 10 kHz width | fixed |
| 10 | `04_EST/02_Principles_of_Communications/03_DSB-SC_and_SSB-SC` | P3 step 3 | "`-20 dBW` relative to the original carrier" (mixes an absolute level with a relative one) | `-20 dBW` absolute against 1 W, which is `40 dB` below the 100 W carrier | fixed |
| 11 | `03_GEAS/05_Engineering_Economy/04_Deferred_Annuities_and_Perpetuities` | P5 step 4 | perpetuity gap called "about 9% of the finite option's value" | `10.2%` of the finite option's ₱907,704 (= the 9.2% shortfall against the perpetuity) | fixed |
| 12 | `03_GEAS/05_Engineering_Economy/06_Capitalized_Cost` | P2 | factor printed to 7 figures (`0.0569842`) but continued at full precision, so keying the printed factor gives a different last digit | factor printed to 8 figures (`0.05698416`); trap figure `237434.2 -> 237434.0` and `₱23,744 -> ₱23,743` | fixed |
| 13 | `03_GEAS/05_Engineering_Economy/07_PW,_FW_and_AW_Methods` | P3 | `(A/P,12%,6)` printed `0.2432259`; the true 7-figure value is `0.2432257`, so `AW` was `67742.1` and the check `67741.9` | `0.2432257`, `AW = 67742.0`, check `67742.0` | fixed |
| 14 | `01_Mathematics/09_Engineering_Data_Analysis/06_Poisson_and_Hypergeometric_Distributions` | P3 step 5 | `(0.995)^400 = 0.134776`, agreement "good to about 0.0006" | `0.134658`, agreement `0.0007` | fixed |

### Found during the Core Concept spacing pass (round 5)

| # | Payload | Where | Was | Now | Status |
|---|---------|-------|-----|-----|--------|
| 20 | `01_Mathematics/09_Engineering_Data_Analysis/02_Dispersion,_Variance,_SD,_IQR_and_CV` | P4 `trap` | says computing quartiles "by including the median in both halves" gives `Q1=50`, `Q3=68`, fence `95`, "landing exactly on the data value and making the outlier test ambiguous" | the named convention actually gives `Q1=52`, `Q3=65`, `IQR=13`, fence `84.5` — so `95` is still an unambiguous outlier and the punchline fails. `50` and `68` are the 3rd and 8th data values, a different rule from the one named. The trap's method label, its numbers and its conclusion are mutually inconsistent. The problem's own solution (`Q1=51`, `Q3=66.5`, fences `[27.75, 89.75]`) is correct | **open — needs a decision** |

### Found during the Core Concept spacing pass (round 5) — Control Systems batch

| # | Payload | Where | Was | Should be | Status |
|---|---------|-------|-----|-----------|--------|
| 21 | `01_Mathematics/06_Control_Systems/12_PID_Controllers_and_Tuning` | concept 4 | PID gain is `K_c = (1.2/K)(T/L)` (correct) but the PI parenthetical reads `0.9 T/L` | `0.9 T/(K L)` — the `1/K` factor is missing, and `T/L` alone is dimensional nonsense for a gain. (The classic reaction-curve table is `K_c = 0.9/(R L)` with `R = K/T`.) | **open — needs a decision** |
| 22 | `01_Mathematics/06_Control_Systems/14_State_Space_Representation_Basics` | concept 5 heading | "**Why singular values of A alone are not enough.**" | the paragraph is entirely about eigenvalues and the rank tests; "singular values" is a mislabel | **open — needs a decision** |
| 23 | `01_Mathematics/06_Control_Systems/06_Steady_State_Error_and_Error_Constants` | concept 6 vs `traps[8]` | concept 6: an integrator *upstream* of the disturbance entry point zeroes the steady output contribution. `traps[8]`: "only an integrator between the disturbance and the output does" | these contradict each other — an integrator "between the disturbance and the output" *is* after the entry point. One of the two needs rewording | **open — needs a decision** |

### Found during the Core Concept spacing pass (round 5) — earlier batch

| # | Payload | Where | Was | Now | Status |
|---|---------|-------|-----|-----|--------|
| 15 | `01_Mathematics/03_Differential_Equations/07_Higher_Order_Homogeneous_Auxiliary_Equation` | P1 step 4 | `Check: $y'-5y'+6y$ terms cancel` — first term missing a prime | `$y''-5y'+6y$` | fixed |
| 16 | `04_EST/06_Antenna_Systems_and_Propagation/12_Television_Systems_and_ISDB-T` | concept 2 | "vestigial sideband (VSBF)" | `(VSB)` | fixed |
| 17 | same | concept 1 and 4 | "the analog NTSC-M switch-off (ASO) completed in 2023" | the year is gone: the ASO "has been repeatedly rescheduled rather than completed on its original target". **The date was never verifiable here** (web search is broken), so no replacement date was invented | fixed |
| 18 | `04_EST/06_Antenna_Systems_and_Propagation/13_Satellite_Orbits,_Transponders_and_G_-_T` | concept 1 | "a 0.3% period error moves the satellite tens of kilometres" | "of order a hundred kilometres" (`a ∝ T^{2/3}`; 0.3% of 42 164 km ≈ 84 km) | fixed |
| 19 | `04_EST/06_Antenna_Systems_and_Propagation/11_Radar_Range_Equation_and_Microwave_Links` | concept 5 | "typically 20 to 40 dB" fade margin | "20 to 30 dB" | fixed |

## Claims checked and rejected (no change made)

- **"`11_Frequency_Response_and_Bode_Plots` P2 gives 274.9 Hz where it should be 275.1 Hz."**
  Not a defect. `1/(2*pi*57.9*10e-6) = 274.88 Hz`, so the note's **274.9 Hz is correct** and the
  worker's 275.1 Hz was its own arithmetic slip. Confirmed twice before rejecting.
- **"`01_Mathematics/05_Electromagnetics/21_Reflection_and_Transmission_at_Boundaries` concept 5
  transposes the perpendicular/parallel Fresnel labels."** Not a defect — the labels are correct.
  With `Gamma = tangential-E reflected/incident`, the perpendicular (TE) coefficient is
  `(eta2 cos(theta_i) - eta1 cos(theta_t)) / (eta2 cos(theta_i) + eta1 cos(theta_t))` and the
  parallel (TM) coefficient is `(eta2 cos(theta_t) - eta1 cos(theta_i)) / (eta2 cos(theta_t) + eta1 cos(theta_i))`,
  which is exactly what the payload has. Two independent checks confirm it: both reduce to the
  correct normal-incidence value `(eta2 - eta1)/(eta2 + eta1)`, and only the parallel form vanishes
  at Brewster's angle (`tan(theta_B) = n2/n1`, derived from `eta2 cos(theta_t) = eta1 cos(theta_i)`
  with Snell's law). The sign of the TM coefficient differs between textbooks because the reflected
  E direction is defined oppositely for p-polarisation; this note uses the convention whose
  normal-incidence limit is consistent, so there is nothing to fix.
- **"The audit regex undercounts — it skips adjacent inline formulas, and it hid a 62-character
  equation in Parallel Resonance."** Not true, and worth recording because it would have cast doubt
  on every area already signed off. Tested directly: on the worker's own cited string
  (`while $I_C = V\omega_0 C = Q I_s$ and $|I_L| = V/\sqrt{R^{2}+\omega_0^{2}L^{2}} = V/Z_0 \approx Q I_s$`)
  the regex matches **2** formulas, including the 62-character one. The pattern
  `(?<!\$)\$(?!\$)` skips only the pathological `$A$$B$` — formulas with no separator at all —
  which does not occur in the corpus. Replaced the regex with an explicit `scanInline()` state walk
  anyway, and the audit now reports the discrepancy: **0** formulas skipped across all 11,417.
- **"`12_Miller's_Theorem_and_High-Frequency_Effects` concept 5 is wrong by 10^3: `1/(2*pi*1e3*1e-12)`
  is 1.59155e5 Hz, not 1.59155e8 Hz."** The note is right and the worker's arithmetic is wrong.
  `1/(2*pi*1e3*1e-12) = 1.59154943e8 Hz`, exactly as printed.
- **"`05_AC_Power,_PQS_and_Triangle` should use `Q = I^2|X|`, because `Q = I^2X` goes negative for
  capacitive loads."** No — that sign is the point. `Q = I^2X` with signed `X` is the standard
  definition (positive inductive, negative capacitive), and the same note already writes the
  admittance form as `Q = -V^2B`, so it is sign-aware throughout. Using `|X|` would destroy the
  leading/lagging information. No change.
- **"The two FM notes use the de-emphasis gain inconsistently — `10_AM_vs_FM_Noise_Comparison`
  says ~29 dB while `11_Pre-Emphasis_and_De-Emphasis` says 13.2 dB, a 7 dB disagreement."** No
  disagreement: 20.9 is the *linear* de-emphasis factor and 13.2 dB is that same factor in dB
  (`10log(20.9) = 13.2`). The chain is `1.5 beta^2 = 37.5 = 15.7 dB`, plus 13.2 dB of de-emphasis,
  giving 28.9 dB — which is the "closer to 29 dB" in the first note. The worker compared a linear
  factor against a decibel figure. Both notes are correct and consistent.
- **Three `01_Mathematics/07_Signals_and_Systems` claims, all false.** (a) "P3 step 4 contradicts
  its own given `x[n]=2(1/2)^n u[n]` by concluding `h[0]=0.5`" — no such text exists in that payload;
  P3 is `X(z)=1/(1-0.5z^{-1})^2`, solved as `x[n]=(n+1)(0.5)^n u[n]` with the checks `x[0]=1`,
  `x[1]=1`, `x[2]=0.75` all correct. (b) "the settling-time bound `n >= ln 0.02/ln|a| - 1` is not the
  correct inversion of `|a|^{n+1} <= 0.02`" — it is exactly the correct inversion: taking logs of
  `|a|^{n+1} <= 0.02` with `0<|a|<1` gives `(n+1)ln|a| <= ln 0.02`, and dividing by the negative
  `ln|a|` flips the inequality to `n+1 >= ln 0.02/ln|a|`. The note already writes `>=`. (c) "the
  impulse-response energy integral drops its square" — `int_0^inf e^{-2t/tau} dt / tau^2 = 1/(2 tau)`
  is precisely `int h^2 dt` for `h=(1/tau)e^{-t/tau}u(t)`, and it is numerically right.
- **"`10_Heat_Transfer` concept 5 has the wrong sign: `H_net = eps*sigma*A(T^4 - T_s^4)` reads as
  heat INTO the skin."** That is the standard signed net-exchange form. It is positive when the body
  is hotter than its surroundings (net loss) and negative when it is cooler — which is the physics,
  not an error. Only an unsigned magnitude form would need the `T_s^4 - T^4` ordering.
- **Valid catch, fixed by its worker:** `03_GEAS/02_University_Physics/04_Momentum_and_Collisions`
  concept 3 said `Delta KE = (1/2)(m1 m2/(m1+m2))(v1-v2)^2` "is always negative", but that
  expression is positive — it is the *magnitude* of the loss, and the payload's own `formulas[4]`
  carries the leading minus. The worker reworded it to "This is the magnitude, signed negative when
  it is written as an energy loss", which reconciles the prose with the table. Verified correct.
- **Worker file attributions are unreliable.** The `y'` typo above was reported against
  `12_PDE_Wave_Equation_1D.json`; it is actually in `07_Higher_Order_Homogeneous_Auxiliary_Equation.json`.
  The typo was real, the location was not — always locate before editing.

## Rendering quirks found, and what happened to them

- **Asymmetric formula lists — real, and fixed where it occurred.** When a lead-in ends in a colon
  and is followed by a list of formulas of which only some reach the renderer's 20-character
  promotion threshold, the renderer hoists those and leaves their siblings inline.
  `01_Mathematics/04_Advanced_Engineering_Math/14_Bessel_Functions` concept 2 was the genuine case
  ("the three standard recurrences:" — only the first got a display line). Fixed by giving each
  recurrence its own lead-in clause, so all four now have display lines.
- **The same claim about `04_Power_Series_Radius_of_Convergence` concept 2 was rejected.** The
  hoisted formula there is the ratio test; the formulas that follow it (`$L|x-a|<1$`, `$R = 1/L$`)
  are 9–12 characters and are *supposed* to stay inline. Reading the rendered note confirms it reads
  correctly, so nothing was changed.
- **Stranded units after a display block.** Hoisting an equation out of "… `$EQ$` eV, so …" leaves
  the unit to open the next line. Now measured vault-wide by
  `build/audit-concept-formulas.mjs` ("display blocks with a STRANDED UNIT after them"). Exactly one
  case existed (`16_Optical_Sources,_Detectors_and_Power_Budget`: "… eV·µm: `$E=1.24/\lambda$` eV,
  so …") and it is fixed; a worker independently caught a second one in
  `04_EST/05_Transmission_Lines_and_Waveguides/04_Reflection_Coefficient_and_VSWR` (a stranded `dB`)
  and moved the unit inside the equation. The metric now reports **0** — but it needed one fix
  first: the token list originally included `in` (inches) and `us` (microseconds), so
  "… `$$EQ$$` in which the $A_c$ cancels" was flagged as a stranded unit. Those two ambiguous
  English words were removed; a checker that cries wolf is worse than no checker.

## Knock-on references also repaired

The FET values were quoted outside the problem that produced them, so fixing P1/P2 forced:
- `08_FET_Amplifiers_CS,_CD,_CG` `traps[1]`: "`g_m = 3 mS` ... gain is `0.848` ... 15 percent, 1.4 dB"
  -> `g_m = 2.32 mS` ... `0.807` ... 19 percent, 1.9 dB.
- `08_FET_Amplifiers_CS,_CD,_CG` `traps[4]`: the sign trap quoted `V_GS = -1.53 V`, ratio `0.382`,
  and "correct `3.09 mS`" -> `V_GS = -2.15 V`, ratio `0.537`, correct `2.32 mS` (the wrong-sign
  value becomes `7.7 mS`, not `6.9 mS`).
- `build/calc-patches/Circuit_Analysis_and_Design.json` (FET P2 block), `Semiconductor_Devices.json`
  (multiplier P5 block), `Principles_of_Communications.json` (FM P3 note),
  `Engineering_Economy.json` (AW P3 step), `Engineering_Data_Analysis.json` (Poisson P3 note) were
  edited in lockstep so a later `--apply` cannot silently restore the old figures.

## Still open (pre-existing, from the original handoff)

- `04_EST/02_Principles_of_Communications/09_FM_Noise_and_Threshold_Effect.json` **P2**: the note
  attaches `I = 1.5 beta^2` to the **input** CNR. Several standard texts give the FM improvement
  factor as `3 beta^2 (beta + 1)` for the IF-bandwidth-referenced CNR. Needs a textbook; no fix
  attempted. P2 is at least internally consistent (`10log(37.5) = 15.74 dB`).
- **Circular wording, no math error:** `09_FM_Noise_and_Threshold_Effect` concept 2 says the noise
  density "rises as f^2 ... (strictly parabolic, since the density goes as f^2)" — the parenthetical
  restates the claim it is meant to justify. Cosmetic.

## Conventions now settled

- A ratio of two **bandwidths** takes `10log` (bandwidth behaves like noise power, cf. processing
  gain). `20log` is reserved for voltage/amplitude ratios.
- `dBW`/`dBm` are absolute; a level relative to a stated reference is written `dB` (or `dBc` for a
  carrier reference), never `dBW ... relative to`.

---

## Found during the Math Crash Review pass (round 6)

Source: the five workers who wrote `ECE_Reviewer_Vault/01_Mathematics/_Math_Crash_Review.md`, plus a
manual read of every block's arithmetic by the orchestrator. **Every item below was recomputed
independently before being listed** — see `build/verify-worker-claims.mjs`, which is runnable and
prints the recomputation. Several worker claims from this round were **rejected** (listed at the end
of this section) exactly as `BUILD_STATE.md` §4 warns.

| # | Payload | Where | Was | Should be | Status |
|---|---------|-------|-----|-----------|--------|
| 24 | `01_Mathematics/06_Control_Systems/10_Bode_Plots_and_Margins` | P2 steps 2–3, `ans`, `calc`, `traps[2]` | factors `(s+5)` as `5(1+s/5)` but keeps numerator `50`, so computes `\|G(j2.236)\| = 50/6 = 8.333` and `GM = -18.4 dB` | direct evaluation gives `\|j\sqrt5\|=\sqrt5`, `\|1+j\sqrt5\|=\sqrt6`, `\|5+j\sqrt5\|=\sqrt{30}`, product `\sqrt{900}=30`, so `\|G\| = 50/30 = 1.6667` and `GM = -4.44 dB` (a factor of 5). The stability conclusion (unstable) and the Routh check `a_2a_1 = 5 < a_0 = 50` are unchanged | **open — needs a decision** |
| 25 | `01_Mathematics/09_Engineering_Data_Analysis/08_Normal_Distribution_and_Z_Scores` | P5 step 2 | "**shortening** the warranty from 4.00 to 4.02 years" | 4.02 > 4.00, so it **lengthens** the warranty. The arithmetic (`5 - 1.96(0.5) = 4.02`) is correct | **open — wording only** |
| 26 | same | P6 step 4 | `1 - \Phi(1.664) = 1 - 0.9519 = 0.0481` | exact tail is `0.048046` → `0.0480` to four decimals (the note's own `ans` already says `0.048`) | **open — 4th-decimal rounding** |
| 27 | `01_Mathematics/09_Engineering_Data_Analysis/10_Central_Limit_Theorem` | P4 | `0.483626` | recomputation of the central-area figure gives `0.483588` at most; the two differ in the 4th significant figure, which the table cannot resolve. **The block was written to avoid this number.** Flagged for a decision rather than asserted | **open — unproven** |
| 28 | `01_Mathematics/09_Engineering_Data_Analysis/01_Central_Tendency` | P1 | labels the sample "slightly left-skewed" while printing `mean < median < mode` | the payload contradicts itself: `mean(20) < median(20.5) < mode(21)` is the textbook signature of **negative (left)** skew, but the third moment is `\sum d^3 = +1086 > 0`, i.e. **positive (right)** skew, and the Pearson mode coefficient `(mean-mode)/sd = -0.186` is negative again. The data (a mild right tail at 32 plus a three-fold repeat at 21) genuinely straddles the two tests | **open — needs a decision** |
| 29 | `01_Mathematics/08_Numerical_Methods_and_Analysis/03_Newton-Raphson_and_Secant` | P7 | secant `x_3 = 2.081252`, `f = -0.14696`, `x_4 = 2.094791` | recomputation gives `x_3 = 2.081264`, `f = -0.147204`, `x_4 = 2.094824` (differences of ~1e-5, consistent with the payload rounding intermediate values) | **open — last-digit** |
| 30 | `01_Mathematics/02_Integral_Calculus/15_Work_and_Hydrostatic_Force` | P5 step 5 | `= 6540[y^3/3]_0^6 = 6540(72)` reads as if `(2/3)` were still outside the bracket | the arithmetic is **correct** (`6540 \times 216/3 = 470{,}880`), but the line is ambiguous enough that a careful reader mis-derived a competing answer of `313{,}920`. Rewriting as `= (6540/3)[y^3] = 2180(216)` removes the ambiguity | **open — clarity only** |

### Claims checked and REJECTED this round (no change made)

- **"Hydrostatic P5 is a real error; `6540(72)` should be `2180(216)`."** Rejected as an *error* —
  the two are equal and the final answer `470{,}880 N` is right (confirmed by Simpson integration).
  Kept only as the clarity item (#30) above.
- **"`13_PDE_Heat_Equation_1D` P4 has the Fourier coefficient sign backwards (`(-1)^n` should be
  `(-1)^{n+1}`)."** **Rejected.** Summing the series to `n = 4001` with `200(-1)^n/(n\pi)` reproduces
  `v(x,0) = -100x` to 4 significant figures at `x = 0.1 … 0.9`; the `(-1)^{n+1}` form gives `+100x`,
  which violates the stated initial condition. The payload is correct as written.
- **"`10_.../Central_Tendency` P1's skew has `\sum d^3 = -1086`."** Rejected on the number: the sum
  is `+1086`. The underlying self-contradiction is real and is recorded as #28.
- **"`10_Central_Limit_Theorem` P4 `0.483626` should be `0.483588`."** Rejected as unproven: the
  worker compared a central-area figure against a raw `\Phi` value and subtracted `0.5` twice.
- **"`08_Normal_..._Z_Scores` P6 `0.0481` should be `0.0480`"** — accepted only as the 4th-decimal
  item #26, not as a substantive error.
- **"`10_Bode_Plots_and_Margins` is correct and the worker mis-factored"** — this was the
  orchestrator's own first conclusion, and it was **wrong**. Direct complex evaluation
  (`\lvert a+j\omega\rvert = \mathrm{hypot}(a,\omega)`) settles it in the worker's favour: see #24.
  Recorded because a wrong *rejection* is as costly as a wrong defect.

### Method note

`build/verify-worker-claims.mjs` recomputes each of the above from closed forms. It caught three
false claims and one error in the orchestrator's own reasoning this round, which is the argument for
keeping the check rather than trusting a report.

---

## Found during the Electronics Crash Review pass (round 7)

Source: the five workers who wrote `ECE_Reviewer_Vault/02_Electronics_Engineering/_Electronics_Crash_Review.md`.
As before, **every item was recomputed independently before being listed**; verifications used
`build/verify-electronics-review.mjs` plus ad-hoc enumeration and matrix algebra. Two of the
orchestrator's own verification attempts were wrong and were corrected mid-pass, and one worker
claim was **rejected** — see below.

| # | Payload | Where | Was | Should be | Status |
|---|---------|-------|-----|-----------|--------|
| 31 | `02_EE/08_Logic_Circuits_and_Switching/06_Karnaugh_Maps` | problem `F(A,B,C,D,E)=Σm(0,1,2,3,16,17,18,19)`, `ans` | `F = ¬B·¬C·¬D` | **`F = ¬B·¬C`** (2 literals). D varies inside the group: the printed term mismatches the onset at rows **2, 3, 18, 19** (those have D=1). Verified by exhaustive 32-row enumeration; no single-literal term matches, so ¬B¬C is minimal. The payload's own step text already says "A, D and E all vary", so the file contradicts itself | **open — needs a decision** |
| 32 | same | problem `F(A,B,C,D)=Σm(1,3,7,11,15)`, `d(0,2,5)` | `¬AD + CD = D(¬A+C)` (5 literals) | **`¬A·¬B + CD`** (4 literals), using the don't-cares at 0 and 2 to complete the 4-cell block A=0,B=0. Verified by brute force over every subset of 17 prime implicants with don't-cares free: the true minimum is 4 literals. The printed form is *valid* but not minimal, so a minimality question is graded wrong | **open — needs a decision** |
| 33 | `02_EE/03_Two_Port_Networks/04_Hybrid_and_Inverse_Hybrid_Parameters` | concept 4, formula row, `traps[3]` | reciprocity stated as `g12 = g21` | **`g12 = -g21`**. Proved by matrix inverse: `g = h⁻¹` with `h12 = -h21` gives `g12 = -h12/Δh` and `g21 = -h21/Δh = +h12/Δh`. Confirmed numerically on a passive T (Za=10, Zb=15, Zc=20): `g12 = -0.6`, `g21 = +0.6` — which is exactly what the payload's **own P2** computes before the formula row contradicts it. `07_Reciprocity_and_Symmetry_Conditions` states it correctly, so file 07 and file 04 disagree | **open — needs a decision** |
| 34 | `02_EE/04_Semiconductor_Devices/03_Diode_Characteristics_and_Shockley` | `traps[4]` | "a diode at 100 °C leaks about 1000× its 25 °C value" | a 75 °C rise is 7.5 doublings = **181×**; 1000× needs a 100 °C rise. The same vault's `01_Intrinsic,…` `traps[3]` says 128× for ~7 doublings, so the two disagree | **open — needs a decision** |
| 35 | `02_EE/04_Semiconductor_Devices/10_BJT_Current_Gains_and_Relationships` | `traps[5]` | "2 µA at 25 °C has about 64 µA at 85 °C" | 6 doublings = **128 µA**; 64 µA is the 75 °C value (factor-of-2 error) | **open — needs a decision** |
| 36 | `02_EE/06_Power_Electronics_and_Systems/03_SCR_Phase-Controlled_Rectifiers` | P3 step 4 | "total SCR loss in the bridge is 4(0.232) = 0.93 W (or 2×0.232 if two devices share each conduction path)" | self-contradictory: a bridge has **2** devices conducting at any instant, each carrying the full load current, so the total is **2(0.232) = 0.464 W**. The 0.232 W per device and 0.810 A average are correct | **open — needs a decision** |
| 37 | `02_EE/09_Microprocessors_and_Embedded/08_GPIO_and_Timer_Peripherals` | timer problem, first step | "PSC+1 = 78.1 µs × 4 MHz = 312.5; round up to 314" | the intermediate is wrong: 20 ms/255 = **78.431 µs**, × 4 MHz = **313.73** → 314. (312.5 is 80000/256, a divisor the answer then does not use.) The final values — PSC=313, tick 78.5 µs, 255×78.5 µs = **20.0175 ms** — are correct | **open — intermediate only** |
| 38 | `02_EE/03_Two_Port_Networks/02_Z_and_Y_Parameters` | P3 step 4 | verifying check: node at `10/35 = 0.28571 V`, `14.286 mA`, "so y12 = -10.53 mS" | with V1 = 0 the correct divider is **Za‖Zb = 6.667 Ω in series with Zc = 25 Ω**, giving **0.21053 V / 10.526 mA**. The final `y12 = -10.53 mS` is right, so the "check" contradicts the line after it | **open — check line only** |
| 39 | `02_EE/05_Circuit_Analysis_and_Design/10_Darlington_and_Feedback_Pairs` | P5 step 1 | "`51³ − 1 = 132651 − 1 = 132650`, which is `125000 + 7500 + 150`" | `125000+7500+150 = 132650` = `51³ − 1`; the binomial omits its `+1` (the `132651` is used before subtracting). Final `β_D = 132650` and all downstream values are correct | **open — cosmetic** |
| 40 | `02_EE/07_Industrial_Automation_and_Sensors/11_Position_Sensors_LVDT,_Hall,_Encoders` | Hall-sensitivity formula row | implies `K_H ≈ 1.56×10⁵ V/(A·T)` for "tens of mV at 0.1–0.5 T" | from the payload's own P1 (I = 10 mA, B = 0.5 T, V_H = 15.6 mV), `K_H = V_H/(IB)` = **1.56×10³ V/(A·T)** — 100× smaller. That problem's first-principles `V_H = IB/(ntq) = 15.6 mV` is correct | **open — needs a decision** |
| 41 | `02_EE/04_Semiconductor_Devices/08_Zener_Diodes_and_Shunt_Regulators` | P2 `trap` | illustrative "reversing them gives 187 Ω and 96 Ω" | not reproducible from the payload's own numbers (V_Z=6.2 V, V_in 13.5–16.5 V, I_L 0–20 mA, I_ZK=5 mA, I_ZM=161.3 mA): every swapping of the corner formulas gives 292 / 1460 / 63.9 / 56.8 Ω, never 187 or 96. The trap's *advice* (pair I_L,max with V_in,min) is correct; only the example numbers are unsupported | **open — example numbers** |
| 42 | `02_EE/07_Industrial_Automation_and_Sensors/03_Instrumentation_and_Difference_Amplifiers` | concept + formula row vs P1/P5 | concept/formula say gain 10 with 1 % resistors gives "about 48 dB"; P1 computes **60.7 dB** for A_d=10 with one −1 % resistor; P5 quotes 68 dB for A_d=100 | all three are defensible but answer different questions: 48.8 dB is the **worst case** (`(1+A_d)/(4δ) = 275`), while 60.7 dB is a **specific single-resistor** case (verified: A_d=9.9954, A_cm=−0.009175, CMRR=1089.5). The ~20 dB spread for the same A_d reads as a contradiction; the fix is to label which condition each figure assumes | **open — wording** |

### Claims checked and REJECTED this round

- **"`16_Oscillators_RC_Phase_Shift_and_Wien_Bridge` concept 5 / `traps[5]` is wrong: the 649.7 Hz
  180° point should be 1591.55 Hz and |β| is 0.25, not 1/29."** **Rejected as stated.** Re-derived
  exactly: the 3-section ladder has `H = 1/(1 + 6jx − 5x² − jx³)` with `x = ωRC`; its imaginary part
  vanishes at `x = √3`, i.e. `f = 1/(2πRC√3)` where the real part is `1 + 5x² = 16` and the phase is
  `−180°`. So the 180° frequency is **918.9 Hz** — neither the payload's 649.7 Hz nor the worker's
  1591.55 Hz. At `x = √6` (the payload's 649.7 Hz) the exact-ABCD magnitude is **1/31**, not the
  textbook **1/29**; `1/(2πRC√6)` with `β = 1/29` is nonetheless the standard exam pairing, which is
  presumably why the payload uses it. The orchestrator's own two attempts at this disagreed with each
  other, so the modelling convention (which ladder, loaded or isolated) is genuinely unsettled.
  **Recorded as contested, not as a defect** — the owner should re-derive or re-source that paragraph.

### Method note

Two of the orchestrator's verification scripts were themselves wrong this round and had to be
corrected before their verdicts could be trusted (a conjugate-multiplication denominator, and a
`g`-matrix built with the wrong open/short conditions). Both would have produced false defect reports.
Separately, an over-permissive magnitude-normalisation regex very nearly **corrupted the already
delivered Mathematics note** by matching across table-cell separators; it was replaced with a
character-level state machine and the Mathematics course now reports zero normalisations, proving
that note is untouched. This is the third round in a row where the checker, not the content, was the
bug.
