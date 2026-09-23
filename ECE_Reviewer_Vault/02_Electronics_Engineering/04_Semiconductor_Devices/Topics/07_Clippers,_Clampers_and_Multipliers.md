---
id: ECE-04-07
title: "Clippers, Clampers and Multipliers"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Diode_Models_and_Load_Line]]", "[[10_Inductors,_Capacitors_and_Energy]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Clippers, Clampers and Multipliers

> [!abstract] Scope
> Predict the output waveform of clippers and clampers from the diode orientation, bias level and diode drop, and compute the output voltage and diode ratings of voltage multipliers.

## Core Concept

> [!tip] Intuition
> A clipper is a ceiling: the diode turns on at a set level and translates everything above it into a flat line, so it changes the waveform's peak-to-peak value. A clamper is a shift: the capacitor charges to the peak during one half cycle and then adds a fixed dc offset forever after, so it changes where the waveform sits but never its peak-to-peak value.

**Clippers: shunt and series, biased and unbiased.** A *shunt* clipper puts the diode across the output (a resistor in series with the source, diode to ground); a *series* clipper puts the diode in the signal path with a load resistor to ground. Either way, one half cycle is passed and the other is removed or flattened. In the **unbiased** shunt clipper the diode's orientation decides which peak survives: diode anode to the output node and cathode to ground conducts when the output tries to exceed $+V_D$, so the positive peaks are flattened at $+0.7\ \mathrm{V}$ for silicon; flip the diode and the negative peaks flatten at $-0.7\ \mathrm{V}$. Adding a battery in series with the diode (**biased** or slicer clipper) moves the ceiling to $V_{clip} = V_B + V_D$, which is how a slicer produces two independently chosen levels — one diode branch per level, and the output is whichever branch conducts first. Note the asymmetry: the clipping level is offset by the diode drop, so a 5 V battery with a silicon diode clips at 5.7 V, not 5.0 V, and a germanium or Schottky diode clips 0.4 V lower.

**Clampers: the capacitor that remembers the peak.** A clamper is a capacitor in series with the signal plus a diode that gives the capacitor a one-way charging path. During the first cycles the diode conducts near one peak and charges C to the peak voltage minus the diode drop; afterwards the diode stays off and the capacitor simply adds that dc level to everything. The result for a symmetric $\pm V_m$ input with a silicon diode: a **positive clamper** (diode conducting on the positive peak) clamps the top of the waveform to $+0.7\ \mathrm{V}$, so the output runs from $+0.7\ \mathrm{V}$ down to $-2V_m + 0.7\ \mathrm{V}$ — with $V_m = 10\ \mathrm{V}$, that is $+0.7$ to $-19.3\ \mathrm{V}$. A **negative clamper** clamps the bottom to $-0.7\ \mathrm{V}$ and the output runs from $-0.7\ \mathrm{V}$ up to $+2V_m - 0.7\ \mathrm{V}$. Both preserve the exact peak-to-peak swing of $2V_m$; only the dc level moved, which is why this circuit is also called a DC restorer or level shifter.

**Why RC must be long, and how it fails.** The capacitor must hold its charge between peaks, so the discharge time constant has to be far longer than the signal period: design for $RC \ge 10T$ (some texts use $RC \ge 100T$ for low droop). If RC is not long enough, C bleeds down through the resistor during the non-conducting interval and the clamp level sags — the output looks like a tilted, partly restored waveform rather than a clean dc-shifted copy. Two further limits are worth remembering: the clamper responds to the *extreme* value of the input, so a waveform with a changing amplitude or an asymmetrical duty cycle retimes the clamp level each cycle, and the diode drop biases the whole result (a 0.7 V drop shifts the clamp level by 0.7 V and therefore shifts every other point by the same 0.7 V). Practical clampers use the load resistor as the discharge path, so the load must be high enough impedance not to spoil $RC$.

**Voltage multipliers: clamps and rectifiers stacked.** A voltage multiplier combines both ideas — each stage is a clamp that charges a capacitor to a peak and a rectifier that dumps that charge into the next capacitor in additive fashion. The half-wave (Villard cascade) doubler charges one capacitor to $V_m$ during one half cycle and stacks the source on top of it during the other, so the second capacitor charges to about $2V_m$; the full-wave (bridge-type) doubler charges two capacitors on alternate half cycles and adds them, $V_{out} \approx 2(V_m - V_D) = 2V_m - 2V_D$. Extending the cascade adds $2V_m$ per stage (or $V_m$ per stage in the simpler half-wave forms), giving triplers, quadruplers and beyond, with the output reduced by one diode drop per conducting diode:
$$V_{out} \approx nV_m - nV_D$$
The critical rating is the diode **peak inverse voltage, which is $2V_m$ for each diode** in a multiplier — the capacitor voltage adds to the source voltage, so a diode in a 12 V-peak quadrupler must block 24 V even though the output is 45 V. Multipliers are also poorly regulated: the equivalent source resistance is roughly $n^{3}/(fC)$-like (it grows steeply with the number of stages), so the no-load output collapses under any real load, and they are used for CRT supplies, photomultipliers and electrostatic devices rather than for power.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Unbiased shunt clipper level | $V_{clip} = V_D \ (0.7\ \mathrm{V} \mathrm{\ for\ Si})$ | The diode drop itself is the ceiling: a silicon shunt clipper does not clip at 0 V, it clips at 0.7 V. |
| Biased (slicer) clipper level | $V_{clip} = V_B + V_D$ | V_B is the battery in series with the diode; its polarity chooses which peak is sliced. Levels add, so a 5 V battery plus a Si diode gives 5.7 V. |
| Shunt clipper output | $V_{out} = V_{in} \ (V_{in} < V_{clip}); \qquad V_{out} = V_{clip} \ (V_{in} \ge V_{clip})$ | Ideal-source case. The current at the clipping instant is I = (V_{in} - V_{clip})/R, which sets the diode's forward-current requirement. |
| Clamper capacitor voltage | $V_C = V_m - V_D$ | The capacitor charges to the peak minus one diode drop through the conducting diode; that dc level is then added to the whole waveform. |
| Positive clamper output extremes | $V_{out,max} = +V_D, \qquad V_{out,min} = -\left(2V_m - V_D\right)$ | Top clamped to +0.7 V for Si. Peak-to-peak is preserved at 2V_m; only the dc level shifts. |
| Negative clamper output extremes | $V_{out,min} = -V_D, \qquad V_{out,max} = +\left(2V_m - V_D\right)$ | Bottom clamped to -0.7 V for Si. Use +0.3 V for Ge/Schottky, which raises every level by 0.4 V. |
| Clamper time-constant rule | $RC \ge 10T = \frac{10}{f}$ | R is the discharge path (usually the load). Shorten RC and the clamp level droops during the non-conducting interval. |
| Half-wave doubler output | $V_{out} \approx 2V_m - 2V_D$ | One drop on the clamping capacitor and one on the rectifying diode. No-load value; it sags badly with load. |
| n-stage multiplier output | $V_{out} \approx nV_m - nV_D$ | n = number of stages (2 for a doubler, 4 for a quadrupler). Count the drops consistently with the model you declare. |
| Multiplier diode PIV | $\mathrm{PIV} = 2V_m$ | Per diode, in every stage: the charged capacitor adds to the source peak. This is the number that destroys under-rated diodes. |
| Multiplier source resistance | $R_{out} \approx \frac{n^{3}}{f C} \mathrm{\ (order\ of\ magnitude)}$ | Grows steeply with stage count, which is why a quadrupler's output collapses under a few mA of load. Treat multiplier outputs as no-load voltages. |

## Worked Problems

### P1. A $\pm10\ \mathrm{V}$ square wave drives a positive clamper built with a silicon diode and $RC \gg T$. Find the output maximum, minimum, peak-to-peak value and dc level.

**Given:** V_m = 10 V; Si diode, V_D = 0.7 V; RC >> T

**Solution:**

1. The diode conducts on the positive excursion and clamps the top of the output to $+V_D$: $V_{out,max} = +0.7\ \mathrm{V}$.
2. The capacitor charges to $V_C = V_m - V_D = 10 - 0.7 = 9.3\ \mathrm{V}$ and then acts as a dc source in series with the input, so $V_{out} = V_{in} - 9.3\ \mathrm{V}$.
3. At the negative peak: $V_{out,min} = -10 - 9.3 = -19.3\ \mathrm{V}$, which is $-2V_m + V_D$.
4. Peak-to-peak: $0.7 - (-19.3) = 20.0\ \mathrm{V} = 2V_m$, unchanged from the input.
5. Average (dc) level: the waveform now swings from +0.7 to -19.3, so its mean is $(0.7 - 19.3)/2 = -9.3\ \mathrm{V}$ — precisely $-V_C$.

> [!success]- Answer
> **V_out: +0.7 V to -19.3 V (20 V peak-to-peak), dc level -9.3 V.**

> [!warning] Trap
> Clamping the top to 0 V by using the ideal-diode model. A real silicon clamper clamps to +0.7 V, and that 0.7 V shifts the *entire* waveform — the negative peak becomes -19.3 V, not -20 V, and the dc level becomes -9.3 V instead of -10 V. Also do not claim the peak-to-peak changed: a clamper never changes peak-to-peak, only dc level.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10−0.7` → **9.3** V = $V_C$, and the top clamps at **+0.7** V.
> 2. `−10−9.3` → **−19.3** V = the minimum; `0.7−(−19.3)` → **20.0** V peak-to-peak.
> 3. `(0.7−19.3)÷2` → **−9.3** V dc, which is exactly $-V_C$.
>
> A clamper never changes peak-to-peak; the 0.7 V shifts the whole waveform.

### P2. The same $\pm10\ \mathrm{V}$ square wave drives a negative clamper (silicon diode). Find the output extremes and the dc level.

**Given:** V_m = 10 V; Si diode, V_D = 0.7 V; negative clamper

**Solution:**

1. Now the diode conducts on the negative excursion, so the bottom of the waveform is clamped: $V_{out,min} = -0.7\ \mathrm{V}$.
2. The capacitor charges to $V_C = V_m - V_D = 9.3\ \mathrm{V}$, but this time it adds to the signal: $V_{out} = V_{in} + 9.3\ \mathrm{V}$.
3. At the positive peak: $V_{out,max} = 10 + 9.3 = 19.3\ \mathrm{V} = 2V_m - V_D$.
4. Peak-to-peak is still $19.3 - (-0.7) = 20\ \mathrm{V}$.
5. Dc level: $(19.3 - 0.7)/2 = +9.3\ \mathrm{V}$.

> [!success]- Answer
> **V_out: -0.7 V to +19.3 V (20 V peak-to-peak), dc level +9.3 V.**

> [!warning] Trap
> Reversing the diode without re-deriving the capacitor polarity — the two clampers are mirror images, and a sign slip turns a -9.3 V dc shift into +9.3 V. Also, if the diode were germanium (0.3 V) the extremes become -0.3 V and +19.7 V; using 0.7 V for every diode misplaces every level by 0.4 V.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10−0.7` → **9.3** V = $V_C$, and the bottom clamps at **−0.7** V.
> 2. `10+9.3` → **+19.3** V = the maximum; `19.3−(−0.7)` → **20.0** V peak-to-peak.
> 3. `(19.3−0.7)÷2` → **+9.3** V dc, the mirror of the positive clamper.
>
> Reversing the diode reverses the dc shift; a sign slip turns −9.3 V into +9.3 V.

### P3. A biased shunt clipper has $R = 1\ \mathrm{k\Omega}$, a silicon diode in series with a $5\ \mathrm{V}$ battery arranged so the diode conducts when the output tries to exceed $+5\ \mathrm{V}$. The input is a $\pm12\ \mathrm{V}$ sine. Find the clipped level, the output at the positive peak, the current at that instant and the reverse voltage the diode must block at the negative peak.

**Given:** R = 1 kohm; V_B = 5 V; Si diode, V_D = 0.7 V; V_in = +/-12 V sine

**Solution:**

1. Clipping level: $V_{clip} = V_B + V_D = 5 + 0.7 = 5.7\ \mathrm{V}$.
2. For all inputs above 5.7 V the output is held at $+5.7\ \mathrm{V}$; below that the diode is off and the output follows the input, so the negative half passes through untouched to $-12\ \mathrm{V}$.
3. At the instant the input reaches its +12 V peak the diode is conducting and the resistor drops the difference: $V_R = 12 - 5.7 = 6.3\ \mathrm{V}$.
4. $I = V_R/R = 6.3/1000 = 6.3\ \mathrm{mA}$ through the diode.
5. At the -12 V trough the diode is off and its anode sits at $V_B = 5\ \mathrm{V}$ relative to the output node, so the reverse voltage is $5 - (-12) = 17\ \mathrm{V}$.

> [!success]- Answer
> **Clipped at +5.7 V, negative half passes to -12 V; diode current 6.3 mA at the positive peak, and the diode must block about 17 V at the negative peak.**

> [!warning] Trap
> Clipping at the battery voltage (5 V) and ignoring the diode drop, which shifts the level by 0.7 V — for a slicer, that 0.7 V is the whole point of the question. The second trap is forgetting the diode's reverse voltage: the battery keeps the anode at +5 V while the input swings to -12 V, so the diode needs a 17 V rating even though the clipping level is only 5.7 V.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5+0.7` → **5.7** V = $V_{clip}$, the battery plus the diode drop.
> 2. `(12−5.7)÷1000` → **6.3** mA through the diode at the positive peak.
> 3. Reverse stress: `5−(−12)` → **17** V at the negative peak.
>
> Clipping at the bare 5 V battery ignores the 0.7 V drop, and the battery sets the 17 V stress.

### P4. A full-wave (bridge-type) voltage doubler is fed by a $10\ \mathrm{V}$ peak sine and uses silicon diodes. Find the no-load output voltage and the PIV rating required of each diode.

**Given:** V_m = 10 V; Si diodes, V_D = 0.7 V; full-wave doubler

**Solution:**

1. Each capacitor charges to $V_m - V_D = 10 - 0.7 = 9.3\ \mathrm{V}$ on its own half cycle.
2. The output is the sum of the two capacitor voltages: $V_{out} = 2(V_m - V_D) = 2(9.3)$.
3. $V_{out} = 18.6\ \mathrm{V} = 2V_m - 2V_D = 20 - 1.4$.
4. Each diode must block the charged capacitor plus the source peak: $\mathrm{PIV} = 2V_m = 20\ \mathrm{V}$.
5. Selection: a 50 V part (1N4001) gives a 2.5x margin and is the sensible minimum.

> [!success]- Answer
> **V_out = 18.6 V at no load (2V_m - 2V_D); each diode needs PIV = 2V_m = 20 V, so a 50 V or better rectifier.**

> [!warning] Trap
> Reporting 20 V by ignoring the diode drops. Two diodes conduct in the doubler's charging paths, so the practical output is 18.6 V, not 20 V, and expecting exactly 2V_m from real hardware is a 7% error. The reverse trap is under-rating the diodes at $V_m = 10\ \mathrm{V}$: the capacitor holds its 9.3 V while the source swings the other way, so the real stress is 20 V.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10−0.7` → **9.3** V per capacitor; `2×Ans` → **18.6** V = $2V_m-2V_D$ at no load.
> 2. PIV: `2×10` → **20** V per diode, so a 50 V part gives 2.5x margin.
>
> The charged capacitor adds its 9.3 V to the opposite source peak; rating at $V_m = 10$ V destroys it.

### P5. A quadrupler is built from a $12\ \mathrm{V}$ peak source with silicon diodes. Find the no-load output, the required diode PIV and explain why the output collapses when a 1 mA load is drawn.

**Given:** V_m = 12 V; n = 4 stages; Si diodes, V_D = 0.7 V; C = 0.1 uF; f = 60 Hz

**Solution:**

1. Output with drops: $V_{out} = nV_m - nV_D = 4(12) - 4(0.7) = 48 - 2.8$.
2. $V_{out} = 45.2\ \mathrm{V}$ at no load (against the ideal $4V_m = 48\ \mathrm{V}$).
3. Each diode blocks $\mathrm{PIV} = 2V_m = 24\ \mathrm{V}$; use a 100 V part (1N4002) for margin, since transients add to the dc stress.
4. Output resistance scales roughly as $n^{3}/(fC) = 64/(60 \times 0.1\times10^{-6}) = 10.7\ \mathrm{M\Omega}$ for this small-capacitance cascade.
5. The multiplier is a charge pump: each stage can deliver only the charge its capacitor can pass per cycle, so the output holds up only while the droop is small. One milliamp through 10.7 Mohm would demand 10.7 kV, which the 45.2 V no-load source cannot supply — the linear source resistance has already run out of validity at that current, and the output does not sag gracefully but collapses toward zero. A larger C scales the source resistance down directly: 10 uF gives about 107 kohm, which is why practical multipliers use big capacitors.

> [!success]- Answer
> **V_out = 45.2 V at no load (4V_m - 4V_D); each diode needs PIV = 2V_m = 24 V, use 100 V. Output resistance ~1e7 ohm for 0.1 uF at 60 Hz, so the output sags badly under load.**

> [!warning] Trap
> Treating a multiplier like a transformer secondary that can supply current. Its output is a no-load voltage: the source resistance falls only as $1/(fC)$, so raising the stage count raises the voltage while making the regulation worse. The other trap is rating diodes at the *output* voltage; the PIV per diode is only $2V_m = 24\ \mathrm{V}$, which is why multipliers can be built from modest rectifiers — but a 50 V part gives less than 2.1x margin against line transients.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4×12−4×0.7` → **45.2** V at no load against the ideal 48 V.
> 2. `2×12` → **24** V PIV per diode.
> 3. `4³÷(60×0.1E-6)` → **1.07e7** $\Omega$ of source resistance; 1 mA through it would demand **1.07e4** V, so at that current the model is invalid and the output collapses.
>
> No-load output with megohms of source resistance: treat a multiplier as a voltage, not a supply.

## Traps & Exam Notes

- **Using the ideal-diode model for clampers and slicers.** The 0.7 V drop is not a detail here — it *sets* the clamp level. A positive clamper clamps to +0.7 V and its negative peak becomes -19.3 V rather than -20 V; getting this wrong shifts the entire waveform and the dc level.
- **Confusing a clipper with a clamper.** A clipper changes the peak-to-peak value (it flattens a peak), while a clamper leaves peak-to-peak exactly the same and only moves the dc level. Any answer in which a clamper alters the amplitude, or a clipper leaves it untouched, has the two circuits swapped.
- **Designing the clamper RC as if it were a coupling network.** The rule is $RC \ge 10T$ (often 100T), where R is the discharge path including the load. Too short and the capacitor bleeds down between peaks, so the clamp level sags and the output looks like a tilted, partially restored waveform rather than a clean dc shift.
- **Under-rating diode PIV in a filter or multiplier.** Every diode in a multiplier sees $2V_m$, and a half-wave or center-tapped capacitor-input filter also sees $2V_m$, because a charged capacitor adds its voltage to the opposite source peak. Rating the diode at $V_m$ or at the output voltage destroys it on the first cycle.
- **Assuming a clamper works on any waveform.** It responds to the extreme excursion: change the amplitude, the duty cycle or the dc content and the capacitor re-charges to a new level. For a pulse train with a low duty cycle the 'peak' may be present for microseconds, so the charging time constant must be short enough to catch it and long enough to hold it — a genuine design constraint, not an afterthought.
- **Expecting a multiplier to regulate.** The output is a charge-pump no-load value with a source resistance that grows about as $n^{3}/(fC)$. Drawing even a milliamp from a small-capacitance cascade collapses the output; multipliers are for high-voltage, low-current loads such as CRTs and photomultipliers.

## See Also

- [[03_Diode_Characteristics_and_Shockley]]
- [[06_Filters,_Ripple_Factor_and_PIV]]
- [[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge]]

---

[[06_Filters,_Ripple_Factor_and_PIV|⬅ 06]] · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Zener_Diodes_and_Shunt_Regulators|08 ➡]]
