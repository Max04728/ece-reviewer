---
id: ECE-04-06
title: "Filters, Ripple Factor and PIV"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge]]", "[[10_Inductors,_Capacitors_and_Energy]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Filters, Ripple Factor and PIV

> [!abstract] Scope
> Size the capacitor and inductor of a rectifier filter for a required ripple, and pick the diode PIV rating that a capacitor-input supply actually demands.

## Core Concept

> [!tip] Intuition
> The capacitor is a charge bucket: the load drains it steadily all cycle while the rectifier can only top it up during a brief conduction spike near each peak. Ripple is therefore set by how much charge the load steals between peaks, which is why the ripple frequency — not just the capacitance — decides the answer.

**The capacitor-input filter as a charge balance.** The diode conducts only while the secondary voltage exceeds the capacitor voltage, so the conduction angle is small (tens of degrees) and the capacitor supplies the load for the rest of the cycle. The load removes charge $Q = I_{dc}T_r$ per ripple period, and that charge must be replaced while the cap voltage sags, so $V_{r(pp)} = Q/C = I_{dc}/(f_rC)$. Since $I_{dc} \approx V_{dc}/R_L \approx V_m/R_L$, this becomes $V_{r(pp)} = V_m/(f_rR_LC)$: **ripple is inversely proportional to the ripple frequency**. That single fact explains the whole half-wave versus full-wave comparison — for the same C and R_L, a bridge at $f_r = 2f$ halves the ripple, halves nothing else, and is why full-wave is standard. The approximation assumes the discharge is linear (a sawtooth) and the conduction angle is negligible; it degrades when the ripple grows past about 10-20% of $V_m$, where the true waveform is more nearly sinusoidal.

**Ripple factor and the dc level.** The ripple factor is the ratio of the ripple's rms value to the dc output, $r = V_{r(rms)}/V_{dc}$. For a symmetric sawtooth, $V_{r(rms)} = V_{r(pp)}/(2\sqrt{3})$, so $r = I_{dc}/(f_rC\cdot2\sqrt{3}\,V_{dc}) = 1/(2\sqrt{3}f_rR_LC)$, and for a full-wave rectifier this is the familiar $r \approx 1/(4\sqrt{3}fR_LC)$. Notice what is missing: $V_m$ and the transformer. Ripple factor depends only on the ripple frequency, the load resistance and the capacitance, so a 12 V and a 24 V supply built from the same C and R_L have identical r. The dc output is slightly below the peak because the sawtooth's average is below its maximum:
$$V_{dc} = V_m - V_{r(pp)}/2$$
which is also the correct value to use in $I_{dc} = V_{dc}/R_L$. Strictly, $r = V_{r(rms)}/V_{dc}$ then differs a little from the textbook formula, which quietly divides by $V_m$.

**PIV is where the capacitor filter bites.** With no filter, a diode only has to block the peak secondary voltage $V_m$. Add the capacitor and the story changes: the cap holds $+V_m$ while the secondary swings to $-V_m$, so the reverse voltage across an off diode reaches **$2V_m$** in a half-wave rectifier and in each leg of a center-tapped one. A bridge is the exception — each conducting path has two diodes in series and each sees only $V_m$ — which is why bridges are preferred at high voltage even though they cost four diodes and two diode drops. A second capacitor-filter penalty is surge current: at the instant of switch-on the capacitor is a short circuit, so the first-cycle current is limited only by the transformer winding resistance and the diode's bulk resistance, and it can reach tens of amperes. Rectifiers are therefore rated for a non-repetitive surge current $I_{FSM}$ (30 A for a 1N400x) that is what actually sizes the part, not the average current.

**LC and pi filters, and the bleeder.** If a capacitor-input filter still leaves too much ripple, put an inductor in series: it opposes the change in ripple current, and the ripple divides between $X_L$ and $X_C$ so the output ripple is $V_{r(out)} = V_{r(in)}X_C/(X_L - X_C)$, with $X_L = 2\pi f_rL$ and $X_C = 1/(2\pi f_rC)$. At the ripple frequency $X_L \gg X_C$ by design, so the attenuation factor is roughly $X_C/X_L$, which improves as $f_r^{2}$ — another argument for full-wave. The C-L-C pi filter is just a capacitor-input filter followed by an LC section: the first C does the heavy lifting and the LC section mops up by 2-3 orders of magnitude. The inductor must be large enough to keep its current continuous (the classical critical-inductance condition; textbooks quote $L_{min} \approx R_L/1130\ \mathrm{H}$ for 60 Hz full-wave with $R_L$ in ohms), or the output rises toward $V_m$ at light load. A **bleeder resistor** across the output draws 10-25% of the full-load current: it discharges the capacitor for safety, keeps the LC filter in continuous conduction at no load, and stabilises the output — at the cost of extra ripple and dissipation. Beyond the filter, the ripple that remains is what the regulator must reject; see [[09_Linear_Voltage_Regulators]].

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Peak-to-peak ripple (charge balance) | $V_{r(pp)} = \frac{I_{dc}}{f_r C}$ | I_dc in A, C in F, f_r in Hz. Assumes a small conduction angle and a linear (sawtooth) discharge. |
| Ripple in terms of the load | $V_{r(pp)} = \frac{V_{dc}}{f_r R_L C} \approx \frac{V_m}{f_r R_L C}$ | Doubling C, R_L or f_r halves the ripple. Note V_m cancels out of the ripple factor but not out of the ripple voltage. |
| Ripple frequency | $f_r = f \ (\mathrm{half-wave}); \qquad f_r = 2f \ (\mathrm{full-wave})$ | 60 Hz mains gives 60 Hz half-wave and 120 Hz full-wave. Using f instead of 2f doubles the predicted ripple. |
| Average dc output | $V_{dc} = V_m - \frac{V_{r(pp)}}{2}$ | The sawtooth average. Use this V_dc in I_dc = V_dc/R_L; the approximation is poor above ~20% ripple. |
| Ripple factor | $r = \frac{V_{r(rms)}}{V_{dc}} = \frac{1}{2\sqrt{3}\, f_r R_L C}$ | Independent of V_m and of the transformer. Compare with r = 1.21 (half-wave) and 0.482 (full-wave) for an unfiltered rectifier. |
| Full-wave ripple factor | $r \approx \frac{1}{4\sqrt{3}\, f R_L C}$ | The 60 Hz form. Half-wave is exactly 2x this, which is the same as saying its ripple frequency is half. |
| Ripple rms from peak-to-peak | $V_{r(rms)} = \frac{V_{r(pp)}}{2\sqrt{3}} \approx \frac{V_{r(pp)}}{3.46}$ | Sawtooth approximation only. Do not use V_r(pp)/2 or V_r(pp)/sqrt(2); those belong to other waveforms. |
| PIV with a capacitor-input filter | $\mathrm{PIV} = 2V_m \ (\mathrm{half-wave,\ center-tap}); \qquad \mathrm{PIV} = V_m \ (\mathrm{bridge})$ | The cap holds +V_m while the source swings to -V_m. Without the filter, half-wave PIV is only V_m. |
| Reactances at the ripple frequency | $X_L = 2\pi f_r L, \qquad X_C = \frac{1}{2\pi f_r C}$ | Evaluate both at f_r, not at the 60 Hz line frequency. The LC section works only because X_L >> X_C. |
| LC (and pi) ripple attenuation | $V_{r(out)} = V_{r(in)}\frac{X_C}{X_L - X_C} \approx V_{r(in)}\frac{X_C}{X_L}$ | Valid for a continuous inductor current. At light load the inductor current goes discontinuous and the output creeps up toward V_m; add a bleeder to prevent it. |
| Bleeder resistor | $R_B \approx \frac{V_{dc}}{I_B}, \qquad I_B \approx (0.1\!-\!0.25)\, I_L$ | Bleeds the capacitor for safety, holds the LC filter in continuous conduction and stabilises the no-load output; it also adds to I_dc, so the ripple increases slightly. |

## Interactive Widget

**Rectifier Ripple Waveform**

![[Rectifier_Ripple_Waveform.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A bridge rectifier is fed by a $12\ \mathrm{V}$ rms, $60\ \mathrm{Hz}$ secondary and uses a $100\ \mu\mathrm{F}$ capacitor-input filter with $R_L = 1\ \mathrm{k\Omega}$. Find the peak-to-peak ripple, the rms ripple, the dc output and the ripple factor (ideal diodes).

**Given:** V_rms = 12 V; f = 60 Hz; C = 100 uF; R_L = 1 kohm; Bridge, so f_r = 120 Hz

**Solution:**

1. Peak secondary voltage: $V_m = 12\sqrt{2} = 16.97\ \mathrm{V}$.
2. Load current: $I_{dc} \approx V_m/R_L = 16.97/1000 = 16.97\ \mathrm{mA}$.
3. $V_{r(pp)} = I_{dc}/(f_rC) = 16.97\times10^{-3}/(120 \times 100\times10^{-6}) = 16.97\times10^{-3}/0.012 = 1.41\ \mathrm{V}$.
4. $V_{r(rms)} = V_{r(pp)}/(2\sqrt{3}) = 1.41/3.464 = 0.408\ \mathrm{V}$.
5. $V_{dc} = V_m - V_{r(pp)}/2 = 16.97 - 0.707 = 16.26\ \mathrm{V}$.
6. Ripple factor: $r = 1/(2\sqrt{3}f_rR_LC) = 1/(3.464 \times 120 \times 1000 \times 10^{-4}) = 1/41.6 = 0.0241$.

> [!success]- Answer
> **V_r = 1.41 V pp (0.408 V rms), V_dc = 16.26 V, r = 2.41%.**

> [!warning] Trap
> Using f = 60 Hz for a bridge. The ripple frequency is 120 Hz, so mixing them doubles the predicted ripple. Also note that r is unchanged if you use real diodes: a bridge drops 1.4 V, so V_m(eff) = 15.57 V, V_r falls to 1.30 V and V_dc to 15.57 - 0.65 = 14.92 V — but r stays 2.41% because it does not contain V_m.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `12√2` → **16.971** V = $V_m$; `Ans÷1000` → **16.97** mA = $I_{dc}$.
> 2. `Ans÷(120×100E-6)` → **1.414** V pp; `÷(2√3)` → **0.408** V rms; `16.971−1.414÷2` → **16.26** V dc.
> 3. `1÷(2√3×120×1000×100E-6)` → **0.02406** = **2.41** %.
>
> A bridge ripples at 120 Hz; r contains no $V_m$, so diode drops leave it unchanged.

### P2. A full-wave bridge with a $60\ \mathrm{Hz}$ input must deliver a dc output with no more than $0.5\ \mathrm{V}$ peak-to-peak ripple into $R_L = 2\ \mathrm{k\Omega}$, from the same $12\ \mathrm{V}$ rms secondary. Find the required capacitance and the resulting ripple factor with the nearest standard value.

**Given:** V_m = 16.97 V; f_r = 120 Hz; R_L = 2 kohm; V_r target = 0.5 V pp

**Solution:**

1. $I_{dc} \approx V_m/R_L = 16.97/2000 = 8.49\ \mathrm{mA}$.
2. Solve $V_{r(pp)} = I_{dc}/(f_rC)$ for C: $C = I_{dc}/(f_rV_r) = 8.49\times10^{-3}/(120 \times 0.5)$.
3. $C = 8.49\times10^{-3}/60 = 1.41\times10^{-4}\ \mathrm{F} = 141\ \mu\mathrm{F}$; choose the next standard value, $150\ \mu\mathrm{F}$.
4. Actual ripple with 150 uF: $V_r = 8.49\times10^{-3}/(120 \times 150\times10^{-6}) = 0.471\ \mathrm{V}$ pp.
5. Ripple factor: $r = 1/(2\sqrt{3} \times 120 \times 2000 \times 150\times10^{-6}) = 1/124.7 = 0.00802$; $V_{dc} = 16.97 - 0.236 = 16.73\ \mathrm{V}$.

> [!success]- Answer
> **C = 141 uF required, use 150 uF; resulting V_r = 0.471 V pp, V_dc = 16.73 V and r = 0.80%.**

> [!warning] Trap
> Rounding the capacitance *down* to a standard value (100 uF) because the calculation gave 141 uF. Ripple is inversely proportional to C, so a 100 uF part would deliver 0.707 V — 41% over the specification. Always round capacitance up; also budget for the capacitor's tolerance (electrolytics are commonly -20%/+80%), so 220 uF is the robust choice.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `16.971÷2000` → **8.485e-3** A; `÷(120×0.5)` → **1.414e-4** F = **141** µF, round UP to **150** µF.
> 2. `8.485E-3÷(120×150E-6)` → **0.4714** V pp; `1÷(2√3×120×2000×150E-6)` → **0.00802** = **0.80** %.
>
> Ripple is inversely proportional to C; rounding to 100 µF gives 0.707 V, 41 % over spec.

### P3. Repeat the first problem for a half-wave rectifier with the same $C = 100\ \mu\mathrm{F}$, $R_L = 1\ \mathrm{k\Omega}$ and a $12\ \mathrm{V}$ rms, $60\ \mathrm{Hz}$ source, and compare the ripple with the bridge.

**Given:** V_m = 16.97 V; f_r = 60 Hz (half-wave); C = 100 uF; R_L = 1 kohm

**Solution:**

1. $I_{dc} = V_m/R_L = 16.97\ \mathrm{mA}$ (same load and peak voltage).
2. $V_{r(pp)} = I_{dc}/(fC) = 16.97\times10^{-3}/(60 \times 10^{-4}) = 2.83\ \mathrm{V}$.
3. $V_{r(rms)} = 2.83/3.464 = 0.816\ \mathrm{V}$; $V_{dc} = 16.97 - 1.414 = 15.56\ \mathrm{V}$.
4. $r = 1/(2\sqrt{3} \times 60 \times 1000 \times 10^{-4}) = 1/20.78 = 0.0481$.
5. Comparison: $2.83/1.41 = 2$ and $4.81/2.41 = 2$ — halving the ripple frequency exactly doubles both the ripple voltage and the ripple factor.

> [!success]- Answer
> **Half-wave: V_r = 2.83 V pp (0.816 V rms), V_dc = 15.56 V, r = 4.81% — exactly twice the bridge values.**

> [!warning] Trap
> Using 120 Hz because the circuit 'is a rectifier'. The half-wave conduction happens once per line cycle, so f_r = f = 60 Hz. The other classic error is assuming a center-tapped full-wave circuit behaves like a half-wave one: it does not — its ripple frequency is 2f, like a bridge.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `16.971÷1000` → **16.97** mA; `÷(60×100E-6)` → **2.828** V pp with $f_r = 60$ Hz.
> 2. `2.828÷(2√3)` → **0.8165** V rms; `16.971−2.828÷2` → **15.56** V; `1÷(2√3×60×1000×100E-6)` → **0.04811** = **4.81** %.
> 3. Compare: `2.828÷1.414` → **2** and `4.81÷2.41` → **2** — half the frequency, double the ripple.
>
> A half-wave filter ripples at the 60 Hz line frequency, not at 120 Hz.

### P4. A half-wave capacitor-input supply runs from a $24\ \mathrm{V}$ rms, $60\ \mathrm{Hz}$ secondary. (i) Find the PIV each diode must block. (ii) Select a rating for a 1N400x family part. (iii) Give the PIV if the circuit were changed to a bridge, and (iv) estimate the first-cycle surge current if the secondary and wiring present $1.5\ \Omega$.

**Given:** V_rms = 24 V; V_m = 33.94 V; C = 100 uF; R_winding = 1.5 ohm; 1N4001 = 50 V, 1N4002 = 100 V, 1N4004 = 400 V, I_FSM = 30 A

**Solution:**

1. (i) With the capacitor holding $+V_m$ while the secondary swings to $-V_m$, the off diode sees $\mathrm{PIV} = 2V_m = 2(33.94) = 67.9\ \mathrm{V}$.
2. (ii) The 1N4001 (50 V) is under-rated and will fail; choose at least 100 V (1N4002), giving a 1.5x margin, or 1N4004 (400 V) for margin against line transients.
3. (iii) In a bridge each leg has two diodes in series with the capacitor, so each diode blocks only $V_m = 33.9\ \mathrm{V}$ — the bridge is the low-PIV topology.
4. (iv) At switch-on the uncharged capacitor is a short, so the first-cycle peak is $V_m/R_{winding} = 33.94/1.5 = 22.6\ \mathrm{A}$.
5. That 22.6 A is only 25% below the 30 A $I_{FSM}$ rating of a 1N400x, so surge rating — not the 1 A average — is what sizes this diode.

> [!success]- Answer
> **PIV = 67.9 V for the half-wave filter (2V_m); use 1N4002 (100 V) or better. A bridge needs only 33.9 V per diode. First-cycle surge ≈ 22.6 A against a 30 A I_FSM.**

> [!warning] Trap
> Quoting $\mathrm{PIV} = V_m$ from an unfiltered half-wave rectifier. The capacitor is what doubles it, and that is precisely why a half-wave filtered supply destroys diodes chosen for the unfiltered case. A related trap is forgetting the center-tapped circuit: each diode there also blocks $2V_m$, because the other half-winding contributes the second $V_m$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `24√2` → **33.94** V = $V_m$; `2×Ans` → **67.88** V = PIV for the half-wave filter.
> 2. Bridge case: **33.94** V per diode; surge `33.94÷1.5` → **22.63** A against the 30 A $I_{FSM}$.
>
> The capacitor doubles the half-wave PIV to $2V_m$; the unfiltered $V_m$ rating burns the diode.

### P5. A C-L-C pi filter follows the bridge of problem 1: $C_1 = 100\ \mu\mathrm{F}$, $L = 5\ \mathrm{H}$, $C_2 = 100\ \mu\mathrm{F}$, with $R_L = 1\ \mathrm{k\Omega}$ and $f_r = 120\ \mathrm{Hz}$. Find the output ripple and the ripple factor, and size a bleeder resistor that draws 10% of the load current.

**Given:** V_m = 16.97 V; C1 = C2 = 100 uF; L = 5 H; R_L = 1 kohm; f_r = 120 Hz; I_dc = 16.97 mA

**Solution:**

1. Ripple at C1 (the capacitor-input stage): $V_{r1} = I_{dc}/(f_rC_1) = 16.97\times10^{-3}/(120 \times 10^{-4}) = 1.41\ \mathrm{V}$ pp.
2. Reactances at 120 Hz: $X_L = 2\pi(120)(5) = 3770\ \Omega$ and $X_{C2} = 1/(2\pi(120)(100\times10^{-6})) = 13.26\ \Omega$.
3. Attenuation of the LC section: $X_{C2}/(X_L - X_{C2}) = 13.26/(3770 - 13.26) = 3.53\times10^{-3}$.
4. Output ripple: $V_{r(out)} = 1.41 \times 3.53\times10^{-3} = 4.99\times10^{-3}\ \mathrm{V}$ pp, i.e. 4.99 mV.
5. Ripple factor: $r = (4.99\times10^{-3}/3.464)/16.97 = 8.5\times10^{-5} = 0.0085\%$ — about 283x better than the 2.41% of C1 alone.
6. Bleeder: $I_B = 0.10(16.97\ \mathrm{mA}) = 1.70\ \mathrm{mA}$, so $R_B = 16.97/1.70\times10^{-3} = 10.0\ \mathrm{k\Omega}$ dissipating $16.97^{2}/10^{4} = 29\ \mathrm{mW}$.

> [!success]- Answer
> **V_r(out) = 4.99 mV pp with r = 0.0085%; bleeder R_B = 10 kohm (1.7 mA, 29 mW), which raises I_dc and therefore the ripple by about 10%.**

> [!warning] Trap
> Evaluating $X_L$ and $X_C$ at the 60 Hz line frequency instead of the 120 Hz ripple frequency — that halves $X_L$ and doubles $X_C$, making the attenuation look 4x worse than it is. Also, the inductor must carry the full dc load current without saturating: a 5 H inductor rated 100 mA will not work in a 1 A supply, and once it saturates the filter reduces to a plain capacitor-input filter.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `16.971E-3÷(120×100E-6)` → **1.414** V pp at $C_1$; `2π×120×5` → **3769.9** $\Omega$ = $X_L$.
> 2. `1÷(2π×120×100E-6)` → **13.26** $\Omega$ = $X_{C2}$; `Ans÷(3769.9−Ans)` → **3.531e-3** attenuation; `1.414×Ans` → **4.99e-3** V pp.
> 3. Bleeder: `16.971÷(0.1×16.971E-3)` → **10.0** k$\Omega$.
>
> Evaluate both reactances at $f_r = 120$ Hz; at 60 Hz the attenuation looks 4x worse.

## Traps & Exam Notes

- **Using f instead of f_r.** Half-wave ripple frequency is f, full-wave is 2f. Writing 60 Hz into a bridge calculation doubles the answer; forgetting the doubling is the single most common error in this topic.
- **Assuming the unfiltered PIV.** For an unfiltered half-wave rectifier $\mathrm{PIV} = V_m$, but *with* a capacitor-input filter it is $2V_m$ (half-wave and center-tap), because the capacitor holds the peak while the source reverses. Selecting a diode on the unfiltered number burns it out on the first negative peak.
- **Rounding the capacitor down.** Ripple is inversely proportional to C, so a design that needs 141 uF must use 150 uF or more, never 100 uF. Electrolytic tolerances (often -20%/+80%) and end-of-life capacitance loss argue for the next size up again.
- **Ignoring the turn-on surge.** The uncharged capacitor looks like a short, so the first-cycle current is limited only by the winding and bulk resistances and can reach tens of amperes at 22-68 A even for a modest 24 V secondary. The relevant diode rating is $I_{FSM}$ (30 A for a 1N400x), not the 1 A average current.
- **Dividing the peak-to-peak ripple by 2 or by $\sqrt{2}$.** For the sawtooth of a capacitor-input filter $V_{r(rms)} = V_{r(pp)}/(2\sqrt{3}) = V_{r(pp)}/3.46$. Using $V_{r(pp)}/2$ overstates r by 73%, and using $V_{r(pp)}/\sqrt{2}$ overstates it by 145%.
- **Forgetting that a large filter capacitor worsens the diode's stress.** Adding capacitance lowers ripple but raises both the PIV (up to $2V_m$) and the repetitive peak current, because the conduction angle narrows while the same charge must be delivered in less time. Extra capacitance is not free.

## See Also

- [[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge]]
- [[08_Zener_Diodes_and_Shunt_Regulators]]
- [[09_Linear_Voltage_Regulators]]

---

[[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge|⬅ 05]] · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Clippers,_Clampers_and_Multipliers|07 ➡]]
