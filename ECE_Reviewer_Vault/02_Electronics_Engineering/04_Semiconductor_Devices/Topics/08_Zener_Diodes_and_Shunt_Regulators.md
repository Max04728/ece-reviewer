---
id: ECE-04-08
title: "Zener Diodes and Shunt Regulators"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Diode_Models_and_Load_Line]]", "[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Zener Diodes and Shunt Regulators

> [!abstract] Scope
> Design the series resistor of a Zener shunt regulator for a stated line and load range, and compute Zener current, dissipation and the resulting output change.

## Core Concept

> [!tip] Intuition
> A Zener holds its voltage only while it is breaking down, so the design problem is to guarantee it stays in breakdown everywhere in the operating box: enough current at the worst case (low line, full load) and not too much at the opposite corner (high line, no load). Everything else — Rs, the power rating, the load range — falls out of those two inequalities.

**Breakdown is the mechanism, not a failure.** Above a specified reverse voltage the junction enters Zener (below about 5 V, a field-emission process) or avalanche breakdown (above about 6 V, impact ionisation). The current rises almost vertically while the voltage barely moves — a few tens of ohms of dynamic resistance $r_Z$ against a nearly vertical curve — and the device is completely undamaged as long as the *power* $P_Z = V_Z I_Z$ stays within rating. That near-vertical curve is the regulator: the Zener absorbs whatever current the series resistor does not give to the load, and the output voltage stays put. The temperature coefficient depends on which mechanism dominates: below roughly 5 V the Zener effect gives a *negative* TC (about $-2\ \mathrm{mV/^\circ C}$), above 6 V avalanche gives a *positive* TC (a few $\mathrm{mV/^\circ C}$), and around 5.6 V the two cancel, which is why 5.6 V and 6.2 V Zeners are the standard references.

**Two currents define the design.** *I_ZK*, the knee current, is the minimum current at which the Zener still regulates — typically 1-10 mA for small parts and a few tens of mA for power Zeners. Below it the voltage collapses toward zero along the exponential forward-like part of the curve and the regulator simply stops regulating. *I_ZM*, the maximum current, comes straight from the power rating, $I_{ZM} = P_Z/V_Z$ — for a 1 W, 6.2 V Zener that is 161 mA. Between these two limits the Zener is a usable shunt element. The series resistor carries the total current $I_T = I_Z + I_L$, so $R_s = (V_{in} - V_Z)/(I_Z + I_L)$ is the nominal design equation; the choice of the nominal $I_Z$ (a good default is roughly half of $I_{ZM}$, or 10-20% of the full-load current) is just picking an operating point inside the window.

**The worst case is a pair of corners, and they are opposite.** At *minimum* input voltage with *maximum* load current the Zener gets the least current, so that corner bounds $R_s$ from above:
$$R_{s,max} = (V_{in,min} - V_Z)/(I_{ZK} + I_{L,max})$$
At *maximum* input with *minimum* load the Zener takes everything, so that corner bounds $R_s$ from below, through the dissipation limit:
$$R_{s,min} = (V_{in,max} - V_Z)/(I_{ZM} + I_{L,min})$$
Any value between those two numbers works; the standard-value resistor nearest the geometric middle, or the smaller value when in doubt, is the practical pick. Note the pairing: if you swap $I_{L,max}$ and $I_{L,min}$ between the two formulas you design a regulator that drops out at full load or burns up at no load, and the arithmetic will still look perfectly tidy.

**What the regulator actually does to ripple, line and load.** Because the Zener looks like a small resistance $r_Z$ (often 5-30 ohm) in series with a fixed voltage, the small-signal behaviour is a voltage divider: input changes are attenuated by $r_Z/(R_s + r_Z)$, so a 10 ohm Zener behind a 150 ohm resistor rejects about 94% of a line step or of the rectifier ripple — this is why a Zener after a capacitor filter ([[06_Filters,_Ripple_Factor_and_PIV]]) is a cheap way to clean up a supply. Load changes see the regulator's output resistance $R_{out} = R_s\parallel r_Z$, so a load step $\Delta I_L$ moves the output by $R_{out}\Delta I_L$. Both effects are small-signal only: they assume the Zener stays in breakdown, which is precisely why the worst-case current inequalities above must be satisfied before any of this applies. For anything better than a few percent regulation, the Zener is followed by a transistor or replaced by a linear regulator ([[09_Linear_Voltage_Regulators]]) — the Zener's real advantages are simplicity and the fact that it also protects against overvoltage.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Series resistor (nominal design) | $R_s = \frac{V_{in} - V_Z}{I_Z + I_L}$ | Pick I_Z first — a typical choice is 10-50% of I_ZM, or roughly the full-load current. Then round to a standard value. |
| Total current split | $I_T = \frac{V_{in} - V_Z}{R_s} = I_Z + I_L, \qquad I_L = \frac{V_Z}{R_L}$ | The Zener takes whatever the load leaves. I_Z must never be assumed constant — it swings over the whole operating box. |
| Worst case for R_s (maximum) | $R_{s,max} = \frac{V_{in,min} - V_Z}{I_{ZK} + I_{L,max}}$ | Low line with full load — the least current into the Zener. R_s larger than this drops the Zener out of regulation. |
| Worst case for R_s (minimum) | $R_{s,min} = \frac{V_{in,max} - V_Z}{I_{ZM} + I_{L,min}}$ | High line with no load — the Zener takes everything. R_s smaller than this exceeds the power rating. |
| Maximum Zener current | $I_{ZM} = \frac{P_Z}{V_Z}$ | From the power rating, and it must be derated for ambient temperature above 25 C (typically 1 W parts lose ~10 mW/degree C). |
| Zener dissipation | $P_Z = V_Z I_Z$ | Worst case is high line with the load removed. Choose the rating with at least a 2x margin, then derate for temperature. |
| Maximum load current | $I_{L,max} = \frac{V_{in,min} - V_Z}{R_s} - I_{ZK}$ | At minimum line voltage. Beyond this the Zener drops out and the output sags as an unregulated divider. |
| Line regulation (small signal) | $\frac{\Delta V_{out}}{\Delta V_{in}} = \frac{r_Z}{R_s + r_Z}$ | Assumes the Zener stays in breakdown. Also the ripple-rejection ratio, and it applies to ripple as well as to slow line changes. |
| Load regulation (small signal) | $R_{out} = R_s \parallel r_Z, \qquad \Delta V_{out} = R_{out}\,\Delta I_L$ | A few ohms for typical values; this is why a bare Zener regulates to a few percent, not to millivolts. |
| Temperature drift of V_Z | $\Delta V_Z = \mathrm{TC} \times \Delta T \times V_Z$ | TC is negative below ~5 V and positive above ~6 V, crossing zero near 5.6 V. Reliability of the 5.6/6.2 V references comes from this. |

## Worked Problems

### P1. A shunt regulator uses a $6.2\ \mathrm{V}$ Zener ($I_{ZK} = 5\ \mathrm{mA}$) from a $12\ \mathrm{V}$ supply feeding $R_L = 1\ \mathrm{k\Omega}$. Choose a standard $R_s$ that gives about $10\ \mathrm{mA}$ of Zener current, then find the actual Zener current and dissipation.

**Given:** V_in = 12 V; V_Z = 6.2 V; R_L = 1 kohm; I_ZK = 5 mA; target I_Z = 10 mA

**Solution:**

1. Load current: $I_L = V_Z/R_L = 6.2/1000 = 6.2\ \mathrm{mA}$.
2. Total current for the target: $I_T = I_Z + I_L = 10 + 6.2 = 16.2\ \mathrm{mA}$.
3. $R_s = (V_{in} - V_Z)/I_T = (12 - 6.2)/16.2\times10^{-3} = 5.8/0.0162 = 358\ \Omega$; the nearest standard value is 360 ohm.
4. With 360 ohm: $I_T = 5.8/360 = 16.11\ \mathrm{mA}$, so $I_Z = 16.11 - 6.2 = 9.91\ \mathrm{mA}$ — comfortably above the 5 mA knee.
5. $P_Z = V_Z I_Z = (6.2)(9.91\times10^{-3}) = 61.4\ \mathrm{mW}$; a 0.5 W Zener has an 8x margin.

> [!success]- Answer
> **R_s = 360 ohm (calculated 358), I_Z = 9.91 mA, P_Z = 61.4 mW.**

> [!warning] Trap
> Forgetting $I_L$ in the resistor equation and using $R_s = (V_{in} - V_Z)/I_Z = 5.8/0.01 = 580\ \Omega$. That resistor would supply only 10 mA total, leaving just 3.8 mA for the Zener — below its 5 mA knee, so the output would fall out of regulation at full load.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `6.2÷1000` → **6.2** mA = $I_L$; `+10E-3` → **16.2** mA = $I_T$.
> 2. `(12−6.2)÷Ans` → **358** $\Omega$, so use **360** $\Omega$: `(12−6.2)÷360` → **16.11** mA.
> 3. `Ans−6.2` → **9.91** mA = $I_Z$; `6.2×9.911E-3` → **61.4** mW.
>
> $R_s = (V_{in}-V_Z)/(I_Z+I_L)$; omitting $I_L$ gives 580 $\Omega$ and starves the Zener.

### P2. Design $R_s$ for a $6.2\ \mathrm{V}$ Zener regulator with $V_{in} = 15\ \mathrm{V} \pm 10\%$, a load current ranging from 0 to $20\ \mathrm{mA}$, $I_{ZK} = 5\ \mathrm{mA}$ and a 1 W Zener. Give the allowable range and pick a standard value, then verify both corners.

**Given:** V_Z = 6.2 V; V_in = 13.5 to 16.5 V; I_L = 0 to 20 mA; I_ZK = 5 mA; P_Z = 1 W

**Solution:**

1. $I_{ZM} = P_Z/V_Z = 1/6.2 = 161.3\ \mathrm{mA}$.
2. Worst case for the maximum: low line with full load, $R_{s,max} = (13.5 - 6.2)/(0.005 + 0.020) = 7.3/0.025 = 292\ \Omega$.
3. Worst case for the minimum: high line with no load, $R_{s,min} = (16.5 - 6.2)/(0.1613 + 0) = 10.3/0.1613 = 63.9\ \Omega$.
4. Any standard value in 63.9-292 ohm works; pick 150 ohm (comfortably central, and a common value).
5. Verify the low corner: $I_T = (13.5 - 6.2)/150 = 48.67\ \mathrm{mA}$, so $I_Z = 48.67 - 20 = 28.67\ \mathrm{mA} > 5\ \mathrm{mA}$ — still regulating.
6. Verify the high corner: $I_T = (16.5 - 6.2)/150 = 68.67\ \mathrm{mA}$, all of it through the Zener, giving $P_Z = 6.2 \times 0.06867 = 0.426\ \mathrm{W}$ — under the 1 W rating.

> [!success]- Answer
> **R_s must lie between 63.9 and 292 ohm; use 150 ohm. I_Z swings from 28.7 mA (low line, full load) to 68.7 mA (high line, no load) with P_Z,max = 0.43 W, so a 1 W Zener is adequate.**

> [!warning] Trap
> Swapping the load-current extremes between the two inequalities. $I_{L,max}$ belongs with $V_{in,min}$ (the Zener's worst shortage) and $I_{L,min}$ with $V_{in,max}$ (the Zener's worst excess). Reversing them gives 187 ohm and 96 ohm, a range that looks plausible but leaves the Zener below its knee at full load or over its rating at no load.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷6.2` → **161.3** mA = $I_{ZM}$.
> 2. `(13.5−6.2)÷(5E-3+20E-3)` → **292** $\Omega$ = $R_{s,max}$ at low line with full load.
> 3. `(16.5−6.2)÷161.3E-3` → **63.9** $\Omega$ = $R_{s,min}$; pick 150 $\Omega$ and check `(16.5−6.2)÷150` → **68.67** mA.
>
> Pair $I_{L,max}$ with $V_{in,min}$ and $I_{L,min}$ with $V_{in,max}$; swapping them fails both corners.

### P3. For the regulator just designed ($R_s = 150\ \Omega$, $V_Z = 6.2\ \mathrm{V}$, $V_{in,min} = 13.5\ \mathrm{V}$, $I_{ZK} = 5\ \mathrm{mA}$), find the maximum load current that still keeps the Zener in regulation at minimum line voltage.

**Given:** R_s = 150 ohm; V_in,min = 13.5 V; V_Z = 6.2 V; I_ZK = 5 mA

**Solution:**

1. Total current available at minimum line: $I_T = (V_{in,min} - V_Z)/R_s = 7.3/150$.
2. $I_T = 48.67\ \mathrm{mA}$.
3. Reserve the knee current for the Zener: $I_{L,max} = I_T - I_{ZK} = 48.67 - 5$.
4. $I_{L,max} = 43.67\ \mathrm{mA}$, which corresponds to a minimum load resistance of $R_{L,min} = 6.2/0.04367 = 142\ \Omega$.

> [!success]- Answer
> **I_L,max = 43.7 mA (R_L,min = 142 ohm) at the minimum line voltage of 13.5 V.**

> [!warning] Trap
> Quoting $I_T = 48.7\ \mathrm{mA}$ as the maximum load current. The Zener needs its 5 mA knee current to regulate at all, so the usable load current is 43.7 mA; draw more and the Zener drops out of breakdown, at which point the output is no longer 6.2 V but the unregulated divider value $V_{in}R_L/(R_s + R_L)$. At 13.5 V with a 100 ohm load that divider gives 5.4 V — a 13% output drop that no amount of 'Zener action' prevents.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(13.5−6.2)÷150` → **48.67** mA = $I_T$.
> 2. `Ans−5E-3` → **43.67** mA = $I_{L,max}$; `6.2÷Ans` → **142** $\Omega$ = $R_{L,min}$.
>
> The full 48.7 mA is not the load limit — the Zener needs its 5 mA knee current.

### P4. For the same regulator, find the worst-case Zener power dissipation and state the required power rating and a suitable device. Include a derating check at 50 C ambient if the part loses 10 mW per degree above 25 C.

**Given:** R_s = 150 ohm; V_in,max = 16.5 V; V_Z = 6.2 V; I_L,min = 0; derating = 10 mW/C above 25 C

**Solution:**

1. Worst case is maximum line voltage with the load disconnected: $I_T = (16.5 - 6.2)/150 = 68.67\ \mathrm{mA}$, all of which flows in the Zener.
2. $P_Z = V_Z I_Z = (6.2)(0.06867) = 0.426\ \mathrm{W}$ at 25 C.
3. A 0.5 W part would be running at 85% of rating — too close. Choose a 1 W Zener for a 2.3x margin.
4. Derating at 50 C: allowable $= 1\ \mathrm{W} - (10\ \mathrm{mW/^\circ C})(25\ \mathrm{^\circ C}) = 1 - 0.25 = 0.75\ \mathrm{W}$.
5. $P_Z = 0.426\ \mathrm{W} < 0.75\ \mathrm{W}$, so the 1 W part still has a 1.8x margin at 50 C ambient.

> [!success]- Answer
> **P_Z,worst = 0.426 W (high line, no load); use a 1 W Zener (0.5 W is marginal), which derates to 0.75 W at 50 C and still passes.**

> [!warning] Trap
> Computing dissipation at the nominal input voltage with a nominal load. The Zener is hottest when the load goes away and the line goes high, because it then absorbs the entire $I_T$ — check the maximum-input, minimum-load corner, not the operating point you designed for. A second trap is ignoring ambient derating: a 1 W part at 50 C inside an enclosure is really a 0.75 W part.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Worst corner first: `(16.5−6.2)÷150` → **68.67** mA with the load disconnected.
> 2. `6.2×Ans` → **0.426** W at 25 °C, so a 0.5 W part is marginal.
> 3. Derating: `1−10E-3×25` → **0.75** W allowable at 50 °C, still 1.8x margin.
>
> Dissipation peaks at high line with no load, never at the nominal design point.

### P5. The regulator has $r_Z = 10\ \Omega$ and $R_s = 150\ \Omega$. Find the line regulation and the load regulation for a load swing from 0 to the 43.7 mA maximum, and comment on how much input ripple reaches the output.

**Given:** R_s = 150 ohm; r_Z = 10 ohm; V_Z = 6.2 V; delta I_L = 43.7 mA; delta V_in = 3 V (13.5 to 16.5 V)

**Solution:**

1. Line regulation: $\Delta V_{out}/\Delta V_{in} = r_Z/(R_s + r_Z) = 10/160 = 0.0625$, i.e. 6.25% (62.5 mV per volt of input change).
2. Over the 3 V line swing that is $\Delta V_{out} = 0.0625 \times 3 = 0.188\ \mathrm{V}$.
3. Load regulation: $R_{out} = R_s \parallel r_Z = (150)(10)/160 = 9.375\ \Omega$.
4. $\Delta V_{out} = R_{out}\Delta I_L = 9.375 \times 0.0437 = 0.410\ \mathrm{V}$ from no load to full load — about 6.6% of 6.2 V, or 9.4 mV per mA.
5. Ripple rejection: 1 V of input ripple becomes 62.5 mV at the output, so the Zener removes about 94% of it — useful, but not a substitute for a good filter capacitor.

> [!success]- Answer
> **Line regulation = 6.25% (0.188 V for a 3 V line change); load regulation: R_out = 9.375 ohm, giving a 0.410 V output change over the 43.7 mA load swing; input ripple is attenuated to 6.25%.**

> [!warning] Trap
> Using $r_Z$ alone as the output resistance (that would give 0.437 V only by coincidence here) or using $R_s$ alone (6.55 V — absurd). The output resistance is the parallel combination; and both figures assume the Zener stays in breakdown, so they are meaningless outside the current window computed in the design step.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10÷(150+10)` → **0.0625**, i.e. 6.25 % line regulation; `×3` → **0.188** V over the 3 V swing.
> 2. `150×10÷160` → **9.375** $\Omega$ = $R_{out}$; `×43.7E-3` → **0.410** V over the load swing.
>
> The output resistance is $R_s\parallel r_Z$, not $r_Z$ or $R_s$ alone.

## Traps & Exam Notes

- **Using the ideal-diode model for a Zener regulator.** Treating $V_Z$ as a perfect constant ignores $I_{ZK}$ entirely, so the model cheerfully regulates at any load and overestimates the usable load range — the real Zener needs its knee current (often 5-10 mA) before it regulates at all, and without it the output collapses to the unregulated divider value.
- **Omitting $I_L$ from the resistor equation.** $R_s = (V_{in} - V_Z)/(I_Z + I_L)$, not $(V_{in} - V_Z)/I_Z$. Designing from $I_Z$ alone leaves the Zener below its knee at full load, and the failure appears only at the worst-case corner.
- **Pairing the wrong load extreme with the wrong line extreme.** $I_{L,max}$ goes with $V_{in,min}$ (Zener starved) and $I_{L,min}$ goes with $V_{in,max}$ (Zener overloaded). Swapping them produces a tidy-looking resistor range that fails at both corners.
- **Sizing the Zener at the nominal operating point.** Dissipation peaks when the line is high and the load is disconnected, because the Zener absorbs the entire series current. A part chosen for the design-point current can be at 3 or 4 times its rating at the no-load corner.
- **Ignoring temperature.** Zener power ratings derate with ambient (roughly 10 mW/degree C above 25 C for a 1 W part), so a 1 W device in a 50 C enclosure is a 0.75 W device. Separately, $V_Z$ itself drifts with temperature — negative below about 5 V, positive above 6 V — so a 3.3 V Zener is a poor voltage reference while a 5.6 V one is excellent.
- **Assuming the Zener can regulate when the input is too low.** If $V_{in}$ falls within a diode drop or so of $V_Z$ the Zener never reaches breakdown, $I_Z$ is zero, and the 'regulator' is just two resistors in series. Always check that $V_{in,min} > V_Z$ with enough headroom to supply $I_{ZK} + I_{L,max}$ through $R_s$.
- **Using a Zener as a load-current source.** The whole load current must pass through $R_s$ first, so the efficiency is no better than $V_Z/V_{in}$ — for 6.2 V out of 12 V that is 52%, and worse at light load because the Zener burns the difference.

## See Also

- [[06_Filters,_Ripple_Factor_and_PIV]]
- [[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge]]
- [[09_Linear_Voltage_Regulators]]

---

[[07_Clippers,_Clampers_and_Multipliers|⬅ 07]] · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[09_BJT_Structure_and_Operating_Regions|09 ➡]]
