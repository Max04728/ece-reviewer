---
id: ECE-04-03
title: "Diode Characteristics and Shockley"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Intrinsic,_Extrinsic_and_Carrier_Transport]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Diode Characteristics and Shockley

> [!abstract] Scope
> Compute diode current and voltage from the Shockley equation, and account for temperature, ideality factor, dynamic resistance and bulk resistance.

## Core Concept

> [!tip] Intuition
> A diode is an exponential valve: the current is set by how many carriers have enough thermal energy to climb the junction barrier, so the voltage needed grows only logarithmically with current. That single exponential explains the 60 mV per decade rule, the -2 mV per degree C drift and why a diode's small-signal resistance has nothing to do with V/I.

**Where the exponential comes from.** Forward bias lowers the junction barrier, so the density of carriers able to diffuse across it grows as the Boltzmann factor $e^{V_D/V_T}$; the resulting diffusion current is $I_D = I_S\left(e^{V_D/(nV_T)} - 1\right)$. The reverse saturation current $I_S$ is the tiny drift current of minority carriers that the field sweeps across, and it is proportional to junction area and to $n_i^{2}$, so it is strongly temperature dependent (roughly doubles per $10\ \mathrm{^\circ C}$) and much larger for power diodes ($\mathrm{nA}$ to $\mu\mathrm{A}$) than for small-signal diodes ($\sim10^{-12}\ \mathrm{A}$). The ideality factor $n$ measures which mechanism dominates: $n = 1$ for pure diffusion in the neutral regions, $n = 2$ when recombination inside the depletion region dominates (low currents, small forward bias), and intermediate values at high injection levels. See [[02_PN_Junction_and_Depletion_Region]] for where the barrier comes from.

**Reading the exponential like an exam-taker.** At forward bias the $-1$ is negligible, so $V_D = nV_T\ln(I_D/I_S)$: the voltage is logarithmic in current. One decade of current costs only $2.3\,nV_T = 60\ \mathrm{mV}$ at $n = 1$ (120 mV at $n = 2$). Practical consequences: a diode is a very poor current limiter (a 60 mV error in $V_D$ is a 10x error in $I_D$), the 0.7 V figure is just the drop near 10 mA and falls to about 0.55 V at 1 mA, and the operating point is extremely sensitive to temperature. In reverse bias the exponential term dies and $I_D \approx -I_S$, which is why a reverse-biased diode looks like an open circuit until breakdown.

**Temperature: two rules with two different jobs.** The reverse saturation current doubles every $10\ \mathrm{^\circ C}$ of heating, so at a *fixed* $V_D$ the forward current also roughly doubles per 10 C. At a *fixed* current the forward voltage falls instead — the measured coefficient is about $-2\ \mathrm{mV/^\circ C}$ (a negative temperature coefficient), contributed by the bandgap term in $I_S(T)$ and the rise of $V_T$. That is why paralleled diodes share current badly (the hotter one hogs more), why a diode works as a temperature sensor, and why the temperature of a power rectifier must be pinned down before quoting a forward drop. Do not try to derive the $-2\ \mathrm{mV/^\circ C}$ from the doubling rule alone inside the plain Shockley equation: the doubling plus $V_T \propto T$ nearly cancel and yield only about $-0.2\ \mathrm{mV/^\circ C}$.

**Real diodes: dc versus small-signal resistance, and breakdown.** At higher currents the neutral silicon and the contacts add a linear bulk (ohmic) resistance $r_B$, usually a few ohms for a small signal diode and a fraction of an ohm for a power rectifier, so the terminal voltage becomes $V_D = V_{junction} + I_Dr_B$. This makes the I-V curve bend over and the 0.7 V model progressively worse: at 20 mA a 10 ohm bulk resistance alone costs 200 mV. Two resistances are then quoted and they must never be interchanged: the dc resistance $R_{dc} = V_D/I_D$ (hundreds of ohms, used for bias) and the ac or dynamic resistance $r_d = nV_T/I_D$ (a few ohms, used for signals) — they differ by the factor $V_D/(nV_T) \approx 20$ to 40. The dynamic resistance is only valid for signal swings of a few millivolts; large swings need the piecewise-linear model of [[04_Diode_Models_and_Load_Line]]. Beyond a rated reverse voltage the junction avalanches and the diode conducts hard in reverse, which sets the peak inverse voltage rating every rectifier diode must meet ([[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge]]).

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Shockley diode equation | $I_D = I_S\left(e^{V_D/(nV_T)} - 1\right)$ | The full equation, valid in both directions. Use +V_D for forward, -V_D for reverse. |
| Thermal voltage | $V_T = \frac{kT}{q} \approx 26\ \mathrm{mV} \mathrm{\ at\ } 300\ \mathrm{K}$ | nV_T is what multiplies the log. At 300 K it is 25.85 mV exactly; the 26 mV convention is standard for hand work. |
| Forward-bias approximation | $I_D \approx I_S e^{V_D/(nV_T)}$ | Valid whenever V_D > ~4nV_T (about 100 mV), where the -1 term is under 2%. |
| Voltage for a given forward current | $V_D = nV_T \ln\left(1 + \frac{I_D}{I_S}\right)$ | The argument is the dimensionless ratio I_D/I_S. Note it is logarithmic, so the answer barely moves with current. |
| Decade rule | $\Delta V_D = 2.3\, n V_T \approx 60\ \mathrm{mV} \mathrm{\ per\ decade\ of\ } I_D$ | n = 1 gives 60 mV/decade; n = 2 gives 120 mV/decade. This is the fastest sanity check on any diode answer. |
| Reverse saturation current vs temperature | $I_S(T_2) = I_S(T_1)\, 2^{(T_2 - T_1)/10}$ | Approximate doubling per 10 C rise. Applies to the leakage current, and at fixed V_D to the forward current too. |
| Forward voltage temperature coefficient | $\frac{dV_D}{dT} \approx -2\ \mathrm{mV/^\circ C} \mathrm{\ at\ fixed\ } I_D$ | Empirical. Negative: the drop falls as the diode heats. Do not confuse it with the +TC of a Zener. |
| dc (static) resistance | $R_{dc} = \frac{V_D}{I_D}$ | Bias calculations only. It is not the resistance an ac signal sees. |
| ac (dynamic) resistance | $r_d = \frac{nV_T}{I_D} = \frac{1}{g_m}$ | Small-signal use only, for swings of a few mV. Falls as 1/I_D: 26 ohm at 1 mA, 2.6 ohm at 10 mA. |
| Terminal voltage with bulk resistance | $V_D = nV_T\ln\left(1 + \frac{I_D}{I_S}\right) + I_D r_B$ | r_B is linear, not a small-signal resistance, and it dominates above ~10 mA in most small diodes. |

## Worked Problems

### P1. A silicon diode has $I_S = 1\times10^{-12}\ \mathrm{A}$ and $n = 1$. Find $I_D$ at $V_D = 0.6\ \mathrm{V}$ at room temperature.

**Given:** I_S = 1e-12 A; V_D = 0.6 V; n = 1; V_T = 26 mV

**Solution:**

1. Exponent: $V_D/(nV_T) = 0.6/0.026 = 23.08$.
2. Evaluate: $e^{23.08} = e^{23}\cdot e^{0.08} = (9.74\times10^{9})(1.080) = 1.05\times10^{10}$. (Base-10 check: $10^{23.08/2.303} = 10^{10.02}$.)
3. $I_D = I_S e^{V_D/(nV_T)} = (1\times10^{-12})(1.05\times10^{10})$.
4. $I_D = 1.05\times10^{-2}\ \mathrm{A} = 10.5\ \mathrm{mA}$.

> [!success]- Answer
> **I_D = 10.5 mA.**

> [!warning] Trap
> Evaluating $e^{23}$ by punching it straight into a calculator that overflows, or mis-entering 0.6/0.026. The reliable route is the decade form: $e^{x} = 10^{x/2.303}$, so $23.08/2.303 = 10.02$ decades, giving $1.05\times10^{10}$. Note how brutal the sensitivity is — 0.66 V rather than 0.6 V would give 105 mA, not 10.5 mA.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.6÷0.026` → **23.077**, the exponent $V_D/(nV_T)$.
> 2. `1E-12×e^(Ans)` → **1.0524e-2** A = **10.5** mA.
>
> If a calculator overflows on $e^{23}$, use `1E-12×10^(23.077÷ln(10))` — identical to four figures.

### P2. For the same diode ($I_S = 1\times10^{-12}\ \mathrm{A}$, $n = 1$), what forward voltage produces $I_D = 2\ \mathrm{mA}$?

**Given:** I_S = 1e-12 A; I_D = 2 mA; n = 1; V_T = 26 mV

**Solution:**

1. Invert the Shockley equation: $V_D = nV_T\ln(1 + I_D/I_S)$.
2. $I_D/I_S = 2\times10^{-3}/1\times10^{-12} = 2\times10^{9}$.
3. $\ln(2\times10^{9}) = \ln 2 + 9\ln 10 = 0.693 + 20.72 = 21.42$.
4. $V_D = 0.026 \times 21.42 = 0.557\ \mathrm{V}$.

> [!success]- Answer
> **V_D = 0.557 V (about 0.56 V).**

> [!warning] Trap
> Quoting 0.7 V out of habit. The 0.7 V figure belongs near 10 mA and above; at 2 mA the true drop is closer to 0.56 V, and the whole span from 1 mA to 100 mA is only about 120 mV. Also, taking $\ln$ of $I_D$ alone instead of the dimensionless ratio $I_D/I_S$ produces a meaningless number.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2E-3÷1E-12` → **2.0e9**, the dimensionless ratio (never $I_D$ alone).
> 2. `0.026×ln(1+Ans)` → **0.5568** V.
>
> The 0.7 V habit is 25 % high at 2 mA; the whole 1 mA to 100 mA span is only 120 mV.

### P3. For the same diode biased at $I_D = 2\ \mathrm{mA}$ with $V_D = 0.557\ \mathrm{V}$, find the dc resistance and the dynamic resistance, and compare them.

**Given:** I_D = 2 mA; V_D = 0.557 V; n = 1; V_T = 26 mV

**Solution:**

1. $R_{dc} = V_D/I_D = 0.557/2\times10^{-3}$.
2. $R_{dc} = 278.5\ \Omega$.
3. $r_d = nV_T/I_D = 0.026/2\times10^{-3} = 13\ \Omega$.
4. Ratio: $R_{dc}/r_d = 278.5/13 = 21.4$, which equals $V_D/(nV_T) = 0.557/0.026$ as expected.

> [!success]- Answer
> **R_dc = 278.5 ohm (bias), r_d = 13 ohm (small signal); they differ by 21x.**

> [!warning] Trap
> Using $R_{dc} = V_D/I_D$ as the resistance seen by an ac signal. A 10 mV signal about this Q point sees 13 ohm, not 278 ohm — a 20x error in every gain calculation. The converse error is trusting $r_d = nV_T/I_D$ for a 100 mV swing: over that swing the exponential changes by $e^{0.1/0.026} = 47$, so r_d is no longer a constant.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.557÷2E-3` → **278.5** $\Omega$ = $R_{dc}$ and `0.026÷2E-3` → **13.0** $\Omega$ = $r_d$, both in one line with `ALPHA` `:`.
> 2. `278.5÷13` → **21.4**, which is $V_D/(nV_T)$ as the note predicts.
>
> $R_{dc}$ is for bias and $r_d = nV_T/I_D$ for signals; interchanging them is a 21x error.

### P4. A silicon diode has $I_S = 1\times10^{-12}\ \mathrm{A}$ at $25\ \mathrm{^\circ C}$, $n = 1$. (i) Find $I_D$ at a fixed $V_D = 0.6\ \mathrm{V}$ after heating to $35\ \mathrm{^\circ C}$. (ii) Find the forward voltage needed for 10.5 mA at $35\ \mathrm{^\circ C}$.

**Given:** I_S(25 C) = 1e-12 A; 10 C temperature rise; V_D = 0.6 V held fixed in (i); I_D = 10.5 mA held fixed in (ii)

**Solution:**

1. The leakage doubles per 10 C: $I_S(35\ \mathrm{^\circ C}) = 2\times10^{-12}\ \mathrm{A}$.
2. (i) At fixed $V_D$ the current is proportional to $I_S$, so $I_D = 2\times(10.5\ \mathrm{mA}) = 21.0\ \mathrm{mA}$.
3. (ii) At fixed current, use the empirical forward-voltage coefficient $-2\ \mathrm{mV/^\circ C}$: $\Delta V_D = (-2\ \mathrm{mV/^\circ C})(10\ \mathrm{^\circ C}) = -20\ \mathrm{mV}$.
4. New drop: $V_D = 0.600 - 0.020 = 0.580\ \mathrm{V}$ at the same 10.5 mA.

> [!success]- Answer
> **(i) I_D doubles to 21.0 mA at fixed 0.6 V; (ii) V_D falls to 0.580 V at fixed 10.5 mA, a -20 mV shift for a 10 C rise.**

> [!warning] Trap
> Using one rule for both parts, or getting the sign backwards. Heating raises the current at fixed voltage but *lowers* the voltage at fixed current — the forward drop has a negative temperature coefficient. Do not try to derive the -2 mV/°C from the doubling rule alone inside the plain Shockley equation: with $V_T$ held at 26 mV the doubling gives -18 mV, and if you also let $V_T$ rise with T the two effects nearly cancel (about -2 mV). The measured coefficient comes from the bandgap and $T^{3}$ terms hiding in $I_S(T)$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. (i) `1E-12×2` → **2e-12** A of leakage at 35 °C, so the fixed-voltage current doubles: **21.0** mA.
> 2. (ii) `0.026×ln(1+10.5E-3÷2E-12)` → **0.5819** V straight from the Shockley curve.
> 3. The empirical rule `0.600−2E-3×10` → **0.580** V — the two routes agree to 2 mV.
>
> Heating raises current at fixed V but lowers V at fixed current; check the sign of the shift.

### P5. A silicon diode with $I_S = 1\times10^{-12}\ \mathrm{A}$, $n = 1$ and a bulk resistance $r_B = 10\ \Omega$ carries $I_D = 20\ \mathrm{mA}$. Find the junction voltage, the bulk drop and the total terminal voltage, and state the error in the 0.7 V constant-drop model.

**Given:** I_S = 1e-12 A; n = 1; I_D = 20 mA; r_B = 10 ohm

**Solution:**

1. Junction: $V_j = nV_T\ln(1 + I_D/I_S) = 0.026\ln(2\times10^{10})$.
2. $\ln(2\times10^{10}) = 0.693 + 23.03 = 23.72$, so $V_j = 0.026 \times 23.72 = 0.617\ \mathrm{V}$.
3. Bulk: $V_{rB} = I_D r_B = (20\times10^{-3})(10) = 0.200\ \mathrm{V}$.
4. Terminal: $V_D = 0.617 + 0.200 = 0.817\ \mathrm{V}$.
5. Error of the 0.7 V model: $(0.817 - 0.700)/0.817 = 14\%$ low.

> [!success]- Answer
> **V_j = 0.617 V, bulk drop = 0.200 V, V_D = 0.817 V; the 0.7 V model is 14% too low at 20 mA.**

> [!warning] Trap
> Computing the current as $(V_{source} - 0.7)/R$ and then subtracting $I r_B$ from the diode drop — that double-counts. In the piecewise-linear model the bulk resistance belongs in the denominator: $I = (V_{source} - V_{knee})/(R + r_B)$. At 20 mA, 10 ohm is worth 200 mV, more than the whole 0.6-to-0.7 V knee debate students worry about.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.026×ln(1+20E-3÷1E-12)` → **0.6167** V = $V_j$.
> 2. `20E-3×10` → **0.200** V of bulk drop; `0.6167+Ans` → **0.817** V terminal.
> 3. `(0.817−0.7)÷0.817` → **0.143**, i.e. the 0.7 V model is **14**% low.
>
> $r_B$ belongs in the series denominator $R_L+r_B$, never as a post-hoc subtraction.

## Traps & Exam Notes

- **Treating the diode as a fixed 0.7 V battery.** The drop is logarithmic in current and shifts about 60 mV per decade (120 mV when n = 2), so it is 0.55 V at 1 mA and 0.75 V at 100 mA. Any question that changes the current by more than a decade punishes the constant-drop answer.
- **Interchanging $R_{dc} = V_D/I_D$ and $r_d = nV_T/I_D$.** For a forward-biased diode they differ by the factor $V_D/(nV_T) \approx 20$ to 40. Using $R_{dc}$ in an ac analysis inflates the answer by that factor; using $r_d$ in a bias calculation does the reverse.
- **Ignoring $r_B$ above a few mA.** The exponential predicts 0.6 V at 10 mA and 0.63 V at 20 mA, but with $r_B = 10\ \Omega$ the second value is really 0.83 V. Bulk resistance is what makes the forward characteristic bend away from the exponential and what eventually sets the surge-current limit.
- **Assuming the 0.7 V knee for every diode.** Germanium and Schottky diodes sit near 0.3 V, LEDs range from 1.8 V (red) to 3.4 V (blue/white), and silicon power rectifiers can show 1 V or more at rated current. The knee voltage must match the material.
- **Forgetting the temperature coefficients.** Leakage doubles every $10\ \mathrm{^\circ C}$ (so a diode at $100\ \mathrm{^\circ C}$ leaks about $1000\times$ its 25 C value) and the forward drop falls about $-2\ \mathrm{mV/^\circ C}$. This is why paralleled diodes hog current into the hottest device and why thermal runaway is a real failure mode in high-current rectifiers.
- **Using $I_S$ as if it were a rating.** $I_S$ is a reverse *leakage* parameter, typically $10^{-12}\ \mathrm{A}$ for a small signal diode and $10^{-9}$ to $10^{-6}\ \mathrm{A}$ for a power rectifier — not the rated forward current. A larger $I_S$ shifts the whole curve to the left (a lower forward drop at the same current).

## See Also

- [[02_PN_Junction_and_Depletion_Region]]
- [[04_Diode_Models_and_Load_Line]]
- [[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge]]

---

[[02_PN_Junction_and_Depletion_Region|⬅ 02]] · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Diode_Models_and_Load_Line|04 ➡]]
