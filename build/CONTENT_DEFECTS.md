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
