---
id: ECE-05-02
title: "Load Lines and Q Point"
part: "02_Electronics_Engineering"
area: "05_Circuit_Analysis_and_Design"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_BJT_DC_Biasing_Configurations]]", "[[09_BJT_Structure_and_Operating_Regions]]", "[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]"]
tags: ["ece", "electronics_engineering", "circuit_analysis_and_design"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Load Lines and Q Point

> [!abstract] Scope
> Locate the quiescent operating point of a bipolar stage by intersecting the device characteristic with the DC and AC load lines, then quantify the largest undistorted output swing that point permits.

## Core Concept

> [!tip] Intuition
> A load line is just KVL drawn on the output characteristic: every (v_CE, i_C) pair the external circuit can produce. The transistor contributes its own curve, and where the two cross is the only place the stage can actually sit with no signal applied.

**The DC load line comes from KVL, not from the transistor.** Write the collector-emitter loop of a CE stage:
$$V_{CC} = I_C R_C + V_{CE} + I_E R_E$$
With $I_E \approx I_C$ this is $V_{CE} = V_{CC} - I_C(R_C + R_E)$ — a straight line on the $i_C$–$v_{CE}$ plane with slope $-1/(R_C+R_E)$. Its two easy points are the axis intercepts: set $V_{CE}=0$ to get the saturation current $I_{C(sat)} = V_{CC}/(R_C+R_E)$, and set $I_C=0$ to get the cutoff voltage $V_{CE(cutoff)} = V_{CC}$. Note that $R_E$ stays in this line even when a bypass capacitor is fitted: a capacitor is an AC short, but the DC bias current still flows through $R_E$, so the DC line always uses the total $R_C + R_E$.

**The quiescent point is where the line meets the device.** The external circuit can be anywhere on the line and the device can be anywhere on its characteristic $i_C = f(v_{CE}, i_B)$; the operating point is the single intersection with the curve for the base current $I_{BQ}$ that the bias network actually supplies. It can be found graphically (draw the line, take the curve for $I_{BQ}$) or analytically (compute $I_{CQ}$ from the base circuit, then $V_{CEQ} = V_{CC} - I_{CQ}(R_C+R_E)$ and read the point off the line). The analytic route is faster and is what the exam expects; the graphical route is the sanity check. A point is well placed when it sits near the middle of the DC line, far enough from both saturation and cutoff that a signal has room to move.

**The AC load line has a different slope and always passes through the quiescent point.** With a signal applied, coupling and bypass capacitors look like short circuits. The collector now sees $R_C$ in parallel with the coupled load $R_L$, so $r_{ac} = R_C \parallel R_L$; if the emitter resistor is left unbypassed it stays in the signal path and $r_{ac} = R_C \parallel R_L + R_E$. The AC line is the line of slope $-1/r_{ac}$ through the quiescent point, which fixes its intercepts: at $v_{ce}=0$, $i_{c,max} = I_{CQ} + V_{CEQ}/r_{ac}$, and at $i_c=0$, $v_{ce,max} = V_{CEQ} + I_{CQ}r_{ac}$. Because $r_{ac}$ is smaller than $R_C + R_E$ in any capacitively coupled stage, the AC line is always steeper than the DC line, and the signal slides up and down the steeper line about the same point.

**Maximum symmetrical swing.** The largest peak the output can reach before the waveform flattens is the smaller of the two distances from the quiescent point to the AC intercepts:
$$V_{opp} = \min(I_{CQ}r_{ac},\ V_{CEQ})$$
The term $V_{CEQ}$ is the room available toward cutoff (voltage clipping) and $I_{CQ}r_{ac}$ is the room toward saturation (current clipping, where the transistor runs out of current gain and the top of the sine flattens). With a light load $r_{ac} \to R_C$ and placing the DC point near $V_{CEQ} \approx V_{CC}/2$ nearly maximises swing; a heavy load makes the AC line steeper and the current limit usually bites first. The peak-to-peak swing is $2V_{opp}$ only for a perfectly centred point — otherwise one side clips first and the usable symmetric swing is the smaller number.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| DC load line (collector-emitter loop) | $V_{CE} = V_{CC} - I_C(R_C + R_E)$ | KVL round the output loop with I_E approx I_C. R_E remains in this line even when a bypass capacitor removes it from the signal path. |
| DC load line endpoints | $I_{C(sat)} = \frac{V_{CC}}{R_C + R_E},\qquad V_{CE(cutoff)} = V_{CC}$ | The axis intercepts: two points are enough to draw the line, whose slope is -1/(R_C+R_E). |
| Q point from the bias network | $V_{CEQ} = V_{CC} - I_{CQ}(R_C + R_E)$ | Get I_CQ from the base circuit first, then evaluate this on the DC load line. Applies to any CE stage with a collector and emitter resistor. |
| AC load line through Q | $i_c - I_{CQ} = -\frac{1}{r_{ac}}\left(v_{ce} - V_{CEQ}\right)$ | The AC line must pass through the quiescent point; only its slope changes when a load is coupled in. |
| AC resistance, bypassed emitter | $r_{ac} = R_C \parallel R_L = \frac{R_C R_L}{R_C + R_L}$ | Valid when the emitter bypass capacitor shorts R_E at signal frequency. r_ac is smaller than R_C, so the AC line is steeper than the DC line. |
| AC resistance, unbypassed emitter | $r_{ac} = R_C \parallel R_L + R_E$ | An unbypassed R_E sits in series in the collector-emitter signal path. Leaving it out of r_ac understates the available swing. |
| AC load line intercepts | $i_{c,max} = I_{CQ} + \frac{V_{CEQ}}{r_{ac}},\qquad v_{ce,max} = V_{CEQ} + I_{CQ}r_{ac}$ | Current intercept at v_ce = 0 and voltage intercept at i_c = 0. Both are measured from the quiescent point, not from the DC intercepts. |
| Maximum symmetrical output swing | $V_{opp} = \min\left(I_{CQ}r_{ac},\ V_{CEQ}\right)$ | Peak value. The first term is the saturation (current) limit, the second the cutoff (voltage) limit; peak-to-peak is 2V_opp only for a perfectly centred point. |

## Interactive Widget

**Load Line and Q Point**

![[Load_Line_and_Q_Point.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A fixed-bias CE stage has $V_{CC} = 12\ \mathrm{V}$, $R_C = 2.2\ \mathrm{k\Omega}$, $R_B = 470\ \mathrm{k\Omega}$, $R_E = 0$, $\beta = 100$ and $V_{BE} = 0.7\ \mathrm{V}$. Find the DC load line endpoints and the quiescent point.

**Given:** V_CC = 12 V; R_C = 2.2 kohm; R_B = 470 kohm; beta = 100; V_BE = 0.7 V; R_E = 0

**Solution:**

1. $I_{BQ} = \dfrac{V_{CC} - V_{BE}}{R_B} = \dfrac{12 - 0.7}{470\ \mathrm{k\Omega}} = 24.04\ \mu\mathrm{A}$
2. $I_{CQ} = \beta I_{BQ} = 100(24.04\ \mu\mathrm{A}) = 2.404\ \mathrm{mA}$
3. DC load line endpoints: $I_{C(sat)} = 12/2200 = 5.455\ \mathrm{mA}$ and $V_{CE(cutoff)} = V_{CC} = 12\ \mathrm{V}$
4. $V_{CEQ} = V_{CC} - I_{CQ}R_C = 12 - (2.404\ \mathrm{mA})(2.2\ \mathrm{k\Omega}) = 12 - 5.289 = 6.711\ \mathrm{V}$

> [!success]- Answer
> **$I_{CQ} = 2.40\ \mathrm{mA}$ and $V_{CEQ} = 6.71\ \mathrm{V}$; the DC load line runs from $(0,\ 5.45\ \mathrm{mA})$ to $(12\ \mathrm{V},\ 0)$.**

> [!warning] Trap
> Reporting $I_{CQ} = V_{CC}/R_C = 5.45\ \mathrm{mA}$. That is the saturation endpoint of the load line, not the operating point: it ignores R_B completely and places the transistor hard into saturation with V_CE = 0.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(12 − 0.7) ÷ 470E3` → $I_{BQ}$ = **24.04** $\mu$A; `× 100` → $I_{CQ}$ = **2.404** mA.
> 2. `12 ÷ 2.2E3` → the DC-line endpoint $I_{C(sat)}$ = **5.455** mA; `12 − 2.404E-3 × 2.2E3` → $V_{CEQ}$ = **6.711** V.

### P2. The stage of the previous problem is capacitively coupled to a load $R_L = 4.7\ \mathrm{k\Omega}$, and its emitter is bypassed. Find the AC load line intercepts and the maximum symmetrical output swing.

**Given:** V_CC = 12 V; R_C = 2.2 kohm; R_L = 4.7 kohm; I_CQ = 2.404 mA; V_CEQ = 6.711 V; R_E bypassed

**Solution:**

1. $r_{ac} = R_C \parallel R_L = \dfrac{(2.2)(4.7)}{2.2 + 4.7} = \dfrac{10.34}{6.9} = 1.499\ \mathrm{k\Omega}$
2. AC saturation intercept: $i_{c,max} = I_{CQ} + \dfrac{V_{CEQ}}{r_{ac}} = 2.404 + \dfrac{6.711}{1.499} = 2.404 + 4.478 = 6.882\ \mathrm{mA}$
3. AC cutoff intercept: $v_{ce,max} = V_{CEQ} + I_{CQ}r_{ac} = 6.711 + (2.404)(1.499) = 6.711 + 3.604 = 10.31\ \mathrm{V}$
4. $V_{opp} = \min(3.604\ \mathrm{V},\ 6.711\ \mathrm{V}) = 3.60\ \mathrm{V}$ peak, i.e. $7.21\ \mathrm{V}$ peak-to-peak

> [!success]- Answer
> **AC line from $(0,\ 6.88\ \mathrm{mA})$ to $(10.31\ \mathrm{V},\ 0)$; $V_{opp} = 3.60\ \mathrm{V}$ peak.**

> [!warning] Trap
> Assuming the swing is limited by V_CEQ = 6.71 V. The current side runs out first: I_CQ r_ac = 3.60 V, so the output clips at 3.60 V peak and the other 3.11 V of headroom is unusable.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.2 × 4.7 ÷ (2.2 + 4.7)` → $r_{ac}$ = **1.499** k$\Omega$.
> 2. `2.404 + 6.711 ÷ 1.499` → $i_{c,max}$ = **6.882** mA; `6.711 + 2.404 × 1.499` → $v_{ce,max}$ = **10.31** V.
> 3. `2.404 × 1.499` → $I_{CQ}r_{ac}$ = **3.604** V, so the smaller of 3.604 and 6.711 gives $V_{opp}$ = **3.60** V peak (7.21 V peak-to-peak).

### P3. A CE stage with an UNBYPASSED emitter resistor has $V_{CC} = 15\ \mathrm{V}$, $R_C = 3.3\ \mathrm{k\Omega}$, $R_E = 1\ \mathrm{k\Omega}$, $R_L = 10\ \mathrm{k\Omega}$ and $I_{CQ} = 2\ \mathrm{mA}$. Find $r_{ac}$, $V_{CEQ}$ and the maximum symmetrical swing.

**Given:** V_CC = 15 V; R_C = 3.3 kohm; R_E = 1 kohm (unbypassed); R_L = 10 kohm; I_CQ = 2 mA

**Solution:**

1. $V_{CEQ} = V_{CC} - I_{CQ}(R_C+R_E) = 15 - (2\ \mathrm{mA})(4.3\ \mathrm{k\Omega}) = 15 - 8.6 = 6.4\ \mathrm{V}$
2. $R_C \parallel R_L = \dfrac{(3.3)(10)}{13.3} = 2.481\ \mathrm{k\Omega}$
3. $r_{ac} = R_C \parallel R_L + R_E = 2.481 + 1 = 3.481\ \mathrm{k\Omega}$
4. $I_{CQ}r_{ac} = (2\ \mathrm{mA})(3.481\ \mathrm{k\Omega}) = 6.962\ \mathrm{V}$
5. $V_{opp} = \min(6.962,\ 6.4) = 6.4\ \mathrm{V}$ peak — the cutoff side is the binding limit

> [!success]- Answer
> **$r_{ac} = 3.48\ \mathrm{k\Omega}$, $V_{CEQ} = 6.4\ \mathrm{V}$, $V_{opp} = 6.40\ \mathrm{V}$ peak.**

> [!warning] Trap
> Dropping R_E from r_ac because the emitter resistor is assumed to be bypassed. Here it is not: omitting the 1 kohm gives r_ac = 2.48 kohm and a predicted swing of 4.96 V, 23 % below the correct 6.40 V.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3.3 × 10 ÷ 13.3` → $R_C \parallel R_L$ = **2.481** k$\Omega$; `+ 1` → $r_{ac}$ = **3.481** k$\Omega$.
> 2. `15 − 2 × 4.3` → $V_{CEQ}$ = **6.4** V.
> 3. `2 × 3.481` → $I_{CQ}r_{ac}$ = **6.962** V, so the binding limit is the 6.4 V cutoff side: $V_{opp}$ = **6.40** V peak.

### P4. For a stage the DC load line has intercepts $I_{C(sat)} = 8\ \mathrm{mA}$ and $V_{CE(cutoff)} = 16\ \mathrm{V}$, and the AC load line passes through $(0,\ 10\ \mathrm{mA})$ and $(15\ \mathrm{V},\ 0)$. Find the quiescent point, $R_C + R_E$, $r_{ac}$ and the maximum symmetrical swing.

**Given:** I_C(sat) = 8 mA; V_CE(cutoff) = 16 V; AC line through (0, 10 mA); AC line through (15 V, 0)

**Solution:**

1. DC line: $i_C = 8 - \dfrac{8}{16}v_{CE} = 8 - 0.5\,v_{CE}$ (i_C in mA, v_CE in V)
2. AC line: $i_C = 10 - \dfrac{10}{15}v_{CE} = 10 - 0.6667\,v_{CE}$
3. Intersection: $8 - 0.5v = 10 - 0.6667v \Rightarrow 0.1667v = 2 \Rightarrow v_{CE} = 12.0\ \mathrm{V}$
4. $I_{CQ} = 8 - 0.5(12) = 2.0\ \mathrm{mA}$
5. $V_{CC} = V_{CE(cutoff)} = 16\ \mathrm{V}$, so $R_C + R_E = 16/8\ \mathrm{mA} = 2\ \mathrm{k\Omega}$, and $r_{ac} = 15/10\ \mathrm{mA} = 1.5\ \mathrm{k\Omega}$
6. $V_{opp} = \min\left((2\ \mathrm{mA})(1.5\ \mathrm{k\Omega}),\ 12\ \mathrm{V}\right) = \min(3.0,\ 12) = 3.0\ \mathrm{V}$ peak

> [!success]- Answer
> **Quiescent point $(12.0\ \mathrm{V},\ 2.0\ \mathrm{mA})$; $R_C + R_E = 2\ \mathrm{k\Omega}$; $r_{ac} = 1.5\ \mathrm{k\Omega}$; $V_{opp} = 3.0\ \mathrm{V}$ peak.**

> [!warning] Trap
> Taking the quiescent point as the midpoint of the DC load line, (8 V, 4 mA). The AC line is steeper, so the true intersection is at 12 V and 2 mA; the midpoint answer overstates the peak swing by a factor of 2 (6.0 V instead of 3.0 V).

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Slopes: `8 ÷ 16` → **0.5** mA/V and `10 ÷ 15` → **0.6667** mA/V.
> 2. `SHIFT` `SOLVE` on `8 − 0.5X = 10 − 0.6667X` (the inner equals is `ALPHA` `=`), guess 1 → $v_{CE}$ = **12.0** V.
> 3. `8 − 0.5 × 12` → $I_{CQ}$ = **2.0** mA; `16 ÷ 8` → $R_C + R_E$ = **2** k$\Omega$; `15 ÷ 10` → $r_{ac}$ = **1.5** k$\Omega$; `2 × 1.5` → $V_{opp}$ = **3.0** V.

### P5. A stage has $V_{CC} = 12\ \mathrm{V}$, $R_C = 2\ \mathrm{k\Omega}$, $I_{CQ} = 3\ \mathrm{mA}$ and a bypassed emitter. Find the maximum symmetrical swing (a) with no load and (b) with $R_L = 2\ \mathrm{k\Omega}$ coupled in.

**Given:** V_CC = 12 V; R_C = 2 kohm; I_CQ = 3 mA; R_E bypassed; R_L = 2 kohm in part (b)

**Solution:**

1. $V_{CEQ} = V_{CC} - I_{CQ}R_C = 12 - (3\ \mathrm{mA})(2\ \mathrm{k\Omega}) = 6.0\ \mathrm{V}$, so Q is centred on the DC line
2. (a) No load: $r_{ac} = R_C = 2\ \mathrm{k\Omega}$
3. (a) $V_{opp} = \min\left((3\ \mathrm{mA})(2\ \mathrm{k\Omega}),\ 6.0\ \mathrm{V}\right) = \min(6.0,\ 6.0) = 6.0\ \mathrm{V}$ peak
4. (b) $R_L = 2\ \mathrm{k\Omega}$: $r_{ac} = 2 \parallel 2 = 1\ \mathrm{k\Omega}$
5. (b) $V_{opp} = \min\left((3\ \mathrm{mA})(1\ \mathrm{k\Omega}),\ 6.0\ \mathrm{V}\right) = \min(3.0,\ 6.0) = 3.0\ \mathrm{V}$ peak

> [!success]- Answer
> **(a) $6.0\ \mathrm{V}$ peak; (b) $3.0\ \mathrm{V}$ peak — the load halves the swing and makes the current limit, not the voltage limit, the binding constraint.**

> [!warning] Trap
> Reusing the unloaded load line for the loaded stage. With R_L = 2 kohm the AC line is twice as steep as the DC line, so the swing falls from 6.0 V to 3.0 V even though the quiescent point never moved.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `12 − 3 × 2` → $V_{CEQ}$ = **6.0** V, so Q sits at the centre of the DC line.
> 2. (a) no load means $r_{ac} = R_C$: `3 × 2` → **6.0** V, equal to $V_{CEQ}$, so $V_{opp}$ = **6.0** V peak.
> 3. (b) `2 × 2 ÷ (2 + 2)` → $r_{ac}$ = **1.0** k$\Omega$, so `3 × 1` → **3.0** V peak — the current limit binds first.

## Traps & Exam Notes

- **Using $R_C + R_E$ as the AC load.** The DC line uses $R_C + R_E$ (2.2 kohm here) while the AC line uses $R_C \parallel R_L$ (1.50 kohm) — a 47 % steeper line. Swapping them misplaces every intercept.
- **Reading $V_{CC}/R_C$ as the quiescent current.** In a fixed-bias stage with $R_B = 470\ \mathrm{k\Omega}$ the collector current is $2.40\ \mathrm{mA}$, not the $5.45\ \mathrm{mA}$ saturation endpoint; the larger number is a load-line intercept, not an operating point.
- **Forgetting $R_L$ in $r_{ac}$.** With $R_C = 2.2\ \mathrm{k\Omega}$ and $R_L = 4.7\ \mathrm{k\Omega}$ the AC resistance is 1.50 kohm, not 2.2 kohm; ignoring the coupled load overstates the available swing by 47 %.
- **Assuming the swing is $V_{CEQ}$.** The maximum symmetrical peak is $\min(I_{CQ}r_{ac}, V_{CEQ})$: 3.60 V here, not 6.71 V, so a design that targets 6 V clips on the current side.
- **Drawing the AC load line through the DC intercepts.** The AC line must pass through the quiescent point; the endpoints $(0,\ 5.45\ \mathrm{mA})$ and $(12\ \mathrm{V},\ 0)$ belong to the DC line alone, and the AC intercepts are $(0,\ 6.88\ \mathrm{mA})$ and $(10.31\ \mathrm{V},\ 0)$.
- **Dropping $R_E$ from the AC path when it is not bypassed.** An unbypassed $1\ \mathrm{k\Omega}$ emitter resistor raises $r_{ac}$ from 2.48 kohm to 3.48 kohm and the swing from 4.96 V to 6.40 V in a 15 V stage.
- **Confusing peak and peak-to-peak.** $V_{opp} = 3.60\ \mathrm{V}$ peak is $7.21\ \mathrm{V}$ peak-to-peak; quoting 3.60 V as the peak-to-peak swing halves the calculated design margin.

## See Also

- [[01_BJT_DC_Biasing_Configurations]]
- [[06_Small-Signal_re_Model_CE,_CB,_CC]]
- [[09_BJT_Structure_and_Operating_Regions]]
- [[04_Diode_Models_and_Load_Line]]

---

[[01_BJT_DC_Biasing_Configurations|⬅ 01]] · [[_MOC_Circuit_Analysis_and_Design|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Bias_Stability_and_Stability_Factors|03 ➡]]
