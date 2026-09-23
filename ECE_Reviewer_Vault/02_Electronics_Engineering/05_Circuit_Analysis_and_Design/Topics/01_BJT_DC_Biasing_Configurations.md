---
id: ECE-05-01
title: "BJT DC Biasing Configurations"
part: "02_Electronics_Engineering"
area: "05_Circuit_Analysis_and_Design"
topic: 1
tier: 1
depth: full
problem_count: 9
prereqs: ["[[09_BJT_Structure_and_Operating_Regions]]", "[[10_BJT_Current_Gains_and_Relationships]]", "[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "circuit_analysis_and_design"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — BJT DC Biasing Configurations

> [!abstract] Scope
> Set the DC operating point of a BJT in the standard bias networks, and confirm the transistor really is in the active region.

## Core Concept

> [!tip] Intuition
> Biasing is one loop equation solved four ways: fix a base current (or a base voltage), let the transistor multiply it by beta, then check that the collector-emitter loop still has room left for $V_{CE}$. The design goal is not a particular $I_C$ — it is an $I_C$ that barely moves when beta changes from 100 to 300.

**What biasing is for.** An amplifier only works if the transistor sits in the active region with a defined quiescent collector current $I_{CQ}$ and collector-emitter voltage $V_{CEQ}$. Bias design therefore has two halves: solve the DC network for the Q-point, then prove the device is not saturated and not cut off. Every standard network — fixed (base) bias, emitter-stabilized bias, voltage-divider (self) bias, collector-feedback bias, and two-supply emitter bias — is just a different way of arranging the base circuit.

**The DC recipe.** Treat the base divider as a Thevenin source, write Kirchhoff's voltage law around the base-emitter loop for $I_B$, multiply by $\beta$ to get $I_C$, then close the collector-emitter loop. For voltage-divider bias the Thevenin source is $V_{TH} = R_2V_{CC}/(R_1+R_2)$ in series with $R_{TH} = R_1R_2/(R_1+R_2)$, which turns a two-resistor divider into the same one-loop problem as base bias. Almost every board problem on this topic is that one substitution plus a saturation check.

**Why the emitter resistor is the whole trick.** Without $R_E$, $I_C = \beta I_B$ inherits the full device-to-device spread of beta (easily 3:1) and its $+0.5\%$ per degree C temperature drift. Adding $R_E$ puts $(\beta+1)R_E$ in series with $R_{TH}$ in the base loop, so an increase in beta raises $I_E$, raises $V_E$, and *reduces* $V_{BE}$, which pulls the current back. That negative feedback is what makes voltage-divider bias with an unbypassed $R_E$ the workhorse configuration. Base bias has no such loop: doubling beta doubles $I_C$ directly.

**Ranking the configurations by beta sensitivity.** Base (fixed) bias is worst — $I_C$ is proportional to beta with no correction. Emitter-stabilized bias is better because $R_E$ appears in the loop, but $R_B$ is usually large ($200\ \mathrm{k}\Omega$ class), so the correction is weak. Collector-feedback bias puts $R_C$ in the base loop as well, which is a real improvement. Voltage-divider (self) bias with $\beta R_E \geq 10 R_2$ is the most stable, because then $V_B \approx V_{TH}$ is set by resistors alone and $I_E = (V_{TH}-V_{BE})/R_E$ does not contain beta at all.

**Always close the loop with the region check.** After solving linearly, test two things:
$$V_{CE} > V_{CE(sat)} \approx 0.2\ \mathrm{V}$$
and that the base-collector junction is reverse-biased ($V_{BC}<0$). If the linear answer gives a negative $V_{CE}$, the model has failed. The transistor is in saturation, so $V_{CE}$ clamps near $0.2\ \mathrm{V}$ and $I_C$ becomes the saturation current:
$$I_{C(sat)} = (V_{CC}-V_{CE(sat)})/(R_C+R_E)$$
That value is *less* than the linear prediction.

**PNP devices.** The equations are identical, but every supply polarity flips: the emitter is the more positive terminal, current leaves the base, $V_{EB} = 0.7\ \mathrm{V}$, and the collector sits below the emitter. Writing $-0.7\ \mathrm{V}$ into the same expression that worked for an NPN is the most common sign error in this topic.

## Derivation

Fixed bias: KVL around the base loop gives $V_{CC} - I_BR_B - V_{BE} = 0$, hence $I_B = (V_{CC}-V_{BE})/R_B$, and $I_C = \beta I_B$ in the active region.

Voltage-divider bias, step 1 — Thevenise the divider with the base disconnected: $V_{TH} = R_2V_{CC}/(R_1+R_2)$ and $R_{TH} = R_1R_2/(R_1+R_2)$.

Voltage-divider bias, step 2 — the base loop is now $V_{TH} - I_BR_{TH} - V_{BE} - I_ER_E = 0$. Substituting $I_E = (\beta+1)I_B$ and collecting $I_B$ gives $I_B = (V_{TH}-V_{BE})/[R_{TH} + (\beta+1)R_E]$.

The approximation: if $R_{TH} \ll (\beta+1)R_E$ then the $I_BR_{TH}$ drop is negligible, so $V_B \approx V_{TH}$, $I_E = (V_{TH}-V_{BE})/R_E$ and $I_C \approx I_E$. Beta has cancelled out of the answer — that is the design intent, and the usual statement of the condition is $\beta R_E \geq 10R_2$.

Collector-emitter loop for any of these networks: $V_{CC} - I_CR_C - V_{CE} - I_ER_E = 0$, so $V_{CE} = V_{CC} - I_CR_C - I_ER_E$. Note $I_E$, not $I_C$, multiplies $R_E$.

Collector-feedback bias: the base loop runs through $R_C$, and the current in $R_C$ is $I_C + I_B = (\beta+1)I_B$. Then $V_{CC} - (\beta+1)I_BR_C - I_BR_B - V_{BE} - (\beta+1)I_BR_E = 0$, giving $I_B = (V_{CC}-V_{BE})/[R_B + (\beta+1)(R_C+R_E)]$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Fixed-bias base current | $I_B = \frac{V_{CC} - V_{BE}}{R_B}$ | Base bias with a grounded emitter. Silicon V_BE is taken as 0.7 V, germanium 0.3 V. |
| Fixed-bias collector current | $I_C = \beta I_B$ | Active region only. If it yields V_CE < 0.2 V the device is saturated and I_C is set by the collector loop instead. |
| Collector-emitter loop | $V_{CE} = V_{CC} - I_C R_C - I_E R_E$ | The emitter term uses I_E, not I_C. With R_E = 0 it reduces to V_CE = V_CC - I_C R_C. |
| Thevenin equivalent of the base divider | $V_{TH} = \frac{R_2 V_{CC}}{R_1 + R_2}, \quad R_{TH} = \frac{R_1 R_2}{R_1 + R_2}$ | Taken with the base disconnected. R_TH is smaller than either divider resistor. |
| Exact voltage-divider base current | $I_B = \frac{V_{TH} - V_{BE}}{R_{TH} + (\beta + 1)R_E}$ | Exact for the Thevenised network. The (beta+1)R_E term is the beta-stabilising feedback. |
| Divider approximation | $V_B \approx V_{TH}, \quad I_E = \frac{V_{TH} - V_{BE}}{R_E}, \quad I_C \approx I_E$ | Valid when beta*R_E >= 10*R_2. When the condition fails the approximate I_C reads high by roughly 10 %. |
| Emitter-stabilized bias | $I_B = \frac{V_{CC} - V_{BE}}{R_B + (\beta + 1)R_E}, \quad I_C = \beta I_B$ | R_B returned to V_CC with an unbypassed R_E. R_E appears multiplied by (beta+1). |
| Collector-feedback bias | $I_B = \frac{V_{CC} - V_{BE}}{R_B + (\beta + 1)(R_C + R_E)}$ | R_B spans collector to base, so R_C enters the base loop. The current in R_C is I_C + I_B. |
| Two-supply emitter bias | $I_E = \frac{V_{EE} - V_{BE}}{R_E + R_B/(\beta + 1)}$ | Base at ground, emitter returned to a negative supply. Neglecting R_B/(beta+1) overstates I_E by 20 % at R_B/(beta+1) = 0.2*R_E. |
| Saturation current | $I_{C(sat)} = \frac{V_{CC} - V_{CE(sat)}}{R_C + R_E}$ | The collector-loop current limit with V_CE(sat) typically 0.2 V. Use it whenever the active solution gives a negative V_CE. |
| Active-region check | $V_{CE} > V_{CE(sat)} \quad \mathrm{and} \quad V_{BC} < 0$ | Failing either condition means the linear Q-point is invalid and the answer must be re-solved in saturation. |

## Interactive Widget

**BJT Bias Calculator**

![[BJT_Bias_Calculator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find $I_B$, $I_C$ and $V_{CE}$ for a fixed-bias (base-bias) NPN stage.

**Given:** $V_{CC} = 12\ \mathrm{V}$; $R_B = 240\ \mathrm{k}\Omega$; $R_C = 2.2\ \mathrm{k}\Omega$; $\beta = 100$; $V_{BE} = 0.7\ \mathrm{V}$

**Solution:**

1. Base loop: $I_B = (V_{CC} - V_{BE})/R_B = (12 - 0.7)/240\ \mathrm{k}\Omega$
2. Compute: $11.3/240\times10^{3} = 47.08\ \mu\mathrm{A}$
3. Current gain: $I_C = \beta I_B = 100 \times 47.08\ \mu\mathrm{A} = 4.708\ \mathrm{mA}$
4. Output loop: $V_{CE} = V_{CC} - I_C R_C = 12 - (4.708\ \mathrm{mA})(2.2\ \mathrm{k}\Omega)$
5. Compute: $12 - 10.358 = 1.642\ \mathrm{V}$, which is above $V_{CE(sat)}$, so the active-region assumption holds

> [!success]- Answer
> **$I_B = 47.1\ \mu\mathrm{A}$, $I_C = 4.71\ \mathrm{mA}$, $V_{CE} = 1.64\ \mathrm{V}$ (active region).**

> [!warning] Trap
> Dropping $V_{BE}$ and using $I_B = 12/240\ \mathrm{k}\Omega = 50\ \mu\mathrm{A}$. That is 6 % high here, and at $V_{CC} = 3.3\ \mathrm{V}$ the same omission is 21 % high.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(12 − 0.7) ÷ 240E3` → $I_B$ = **47.08** $\mu$A; `× 100` → $I_C$ = **4.708** mA.
> 2. `12 − Ans × 2.2E3` → $V_{CE}$ = **1.642** V, above $V_{CE(sat)}$, so the active-region assumption holds.

### P2. The fixed-bias stage above is built with a replacement transistor whose $\beta = 150$. Find the actual $I_C$ and $V_{CE}$. Is the linear answer usable?

**Given:** $V_{CC} = 12\ \mathrm{V}$; $R_B = 240\ \mathrm{k}\Omega$; $R_C = 2.2\ \mathrm{k}\Omega$; $\beta = 150$; $V_{CE(sat)} = 0.2\ \mathrm{V}$

**Solution:**

1. $I_B$ is set by $R_B$ alone and does not change: $I_B = 47.08\ \mu\mathrm{A}$
2. Linear prediction: $I_C = 150 \times 47.08\ \mu\mathrm{A} = 7.063\ \mathrm{mA}$
3. That would need $V_{CE} = 12 - (7.063\ \mathrm{mA})(2.2\ \mathrm{k}\Omega) = 12 - 15.54 = -3.54\ \mathrm{V}$, which is impossible
4. The transistor is therefore in saturation; clamp $V_{CE} = 0.2\ \mathrm{V}$
5. $I_{C(sat)} = (12 - 0.2)/2.2\ \mathrm{k}\Omega = 5.36\ \mathrm{mA}$

> [!success]- Answer
> **$I_C = 5.36\ \mathrm{mA}$, $V_{CE} = 0.2\ \mathrm{V}$ (saturated, not $I_C = 7.06\ \mathrm{mA}$).**

> [!warning] Trap
> Reporting $I_C = 7.06\ \mathrm{mA}$ with $V_{CE} = -3.54\ \mathrm{V}$. Base bias multiplies beta straight into $I_C$, so a 50 % beta increase pushes the stage into saturation — the linear answer is valid only after the $V_{CE}$ check.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `150 × (12 − 0.7) ÷ 240E3` → the linear $I_C$ = **7.063** mA; `12 − Ans × 2.2E3` → $V_{CE}$ = **−3.54** V, which is impossible.
> 2. So clamp and recompute: `(12 − 0.2) ÷ 2.2E3` → $I_{C(sat)}$ = **5.36** mA with $V_{CE}$ = **0.2** V.

### P3. Find $I_B$, $I_C$, $I_E$ and $V_{CE}$ for an emitter-stabilized bias network.

**Given:** $V_{CC} = 12\ \mathrm{V}$; $R_B = 240\ \mathrm{k}\Omega$; $R_C = 2.2\ \mathrm{k}\Omega$; $R_E = 1\ \mathrm{k}\Omega$; $\beta = 100$; $V_{BE} = 0.7\ \mathrm{V}$

**Solution:**

1. Base loop with the emitter resistor: $I_B = (V_{CC} - V_{BE})/[R_B + (\beta+1)R_E]$
2. Denominator: $240\ \mathrm{k}\Omega + 101(1\ \mathrm{k}\Omega) = 341\ \mathrm{k}\Omega$
3. $I_B = 11.3/341\ \mathrm{k}\Omega = 33.14\ \mu\mathrm{A}$
4. $I_C = 100(33.14\ \mu\mathrm{A}) = 3.314\ \mathrm{mA}$ and $I_E = (\beta+1)I_B = 3.347\ \mathrm{mA}$
5. Output loop: $V_{CE} = 12 - (3.314\ \mathrm{mA})(2.2\ \mathrm{k}\Omega) - (3.347\ \mathrm{mA})(1\ \mathrm{k}\Omega)$
6. Compute: $12 - 7.291 - 3.347 = 1.363\ \mathrm{V}$ (active)

> [!success]- Answer
> **$I_B = 33.1\ \mu\mathrm{A}$, $I_C = 3.31\ \mathrm{mA}$, $I_E = 3.35\ \mathrm{mA}$, $V_{CE} = 1.36\ \mathrm{V}$.**

> [!warning] Trap
> Using $R_B + \beta R_E = 240\ \mathrm{k}\Omega + 100\ \mathrm{k}\Omega$ instead of $R_B + (\beta+1)R_E$. The $1\ \mathrm{k}\Omega$ difference is only 0.3 % here, but the same substitution in a Darlington or low-beta stage is a large error.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(12 − 0.7) ÷ (240E3 + 101 × 1E3)` → $I_B$ = **33.14** $\mu$A.
> 2. `× 100` → $I_C$ = **3.314** mA; `÷ 100 × 101` → $I_E$ = **3.347** mA.
> 3. `12 − Ans × 1E3 − 3.314E-3 × 2.2E3` → $V_{CE}$ = **1.363** V ($I_E$ from `Ans`, $I_C$ typed).

### P4. For a voltage-divider (self) bias stage, compute $I_C$ and $V_{CE}$ both exactly and with the standard approximation, and state whether the approximation was justified.

**Given:** $V_{CC} = 20\ \mathrm{V}$; $R_1 = 82\ \mathrm{k}\Omega$; $R_2 = 22\ \mathrm{k}\Omega$; $R_C = 4.7\ \mathrm{k}\Omega$; $R_E = 1.5\ \mathrm{k}\Omega$; $\beta = 120$; $V_{BE} = 0.7\ \mathrm{V}$

**Solution:**

1. Thevenin source: $V_{TH} = (22\ \mathrm{k}\Omega)(20\ \mathrm{V})/(82 + 22)\ \mathrm{k}\Omega = 4.231\ \mathrm{V}$
2. Thevenin resistance: $R_{TH} = (82)(22)/104\ \mathrm{k}\Omega = 17.35\ \mathrm{k}\Omega$
3. Exact: $I_B = (4.231 - 0.7)/[17.35\ \mathrm{k}\Omega + 121(1.5\ \mathrm{k}\Omega)] = 3.531/198.85\ \mathrm{k}\Omega = 17.76\ \mu\mathrm{A}$
4. Exact: $I_C = 120(17.76\ \mu\mathrm{A}) = 2.131\ \mathrm{mA}$, $I_E = 2.149\ \mathrm{mA}$
5. Exact: $V_{CE} = 20 - (2.131\ \mathrm{mA})(4.7\ \mathrm{k}\Omega) - (2.149\ \mathrm{mA})(1.5\ \mathrm{k}\Omega) = 20 - 10.01 - 3.22 = 6.76\ \mathrm{V}$
6. Approximate: $V_B \approx 4.231\ \mathrm{V}$, $V_E = 3.531\ \mathrm{V}$, $I_E = 3.531/1.5\ \mathrm{k}\Omega = 2.354\ \mathrm{mA}$, $I_C \approx 2.354\ \mathrm{mA}$
7. Approximate: $V_{CE} = 20 - (2.354\ \mathrm{mA})(6.2\ \mathrm{k}\Omega) = 5.41\ \mathrm{V}$
8. The condition fails: $\beta R_E = 180\ \mathrm{k}\Omega$ is less than $10R_2 = 220\ \mathrm{k}\Omega$, and the approximate $I_C$ is indeed 10.5 % high

> [!success]- Answer
> **Exact: $I_C = 2.13\ \mathrm{mA}$, $V_{CE} = 6.76\ \mathrm{V}$. Approximate: $I_C = 2.35\ \mathrm{mA}$ (+10.5 %), $V_{CE} = 5.41\ \mathrm{V}$ — the approximation is not justified here.**

> [!warning] Trap
> Applying the divider rule to $V_B$ without testing $\beta R_E \geq 10R_2$. The loading error is 10 % in $I_C$ here, which is the difference between a mid-supply Q-point and one that clips asymmetrically.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `22 × 20 ÷ 104` → $V_{TH}$ = **4.231** V; `82 × 22 ÷ 104` → $R_{TH}$ = **17.35** k$\Omega$.
> 2. `MODE` `5` `1` (2 unknowns): coefficients `−120` `1` `0` then `18.85` `1.5` `3.531` `=` → $I_B$ = **0.01776** mA, $I_C$ = **2.131** mA (R in k$\Omega$, so the currents come out in mA).
> 3. `20 − 2.131 × 4.7 − 0.01776 × 121 × 1.5` → $V_{CE}$ = **6.76** V; the approximation `3.531 ÷ 1.5` → $I_E$ = **2.354** mA and `20 − 2.354 × 6.2` → **5.41** V.

### P5. Find $I_B$, $I_C$ and $V_{CE}$ for a collector-to-base (collector-feedback) bias stage with $R_E = 0$.

**Given:** $V_{CC} = 12\ \mathrm{V}$; $R_B = 220\ \mathrm{k}\Omega$ (collector to base); $R_C = 2.2\ \mathrm{k}\Omega$; $\beta = 100$; $V_{BE} = 0.7\ \mathrm{V}$

**Solution:**

1. The current through $R_C$ is $I_C + I_B = (\beta+1)I_B$, because $I_B$ is drawn from the collector node
2. Base loop: $I_B = (V_{CC} - V_{BE})/[R_B + (\beta+1)R_C]$
3. Denominator: $220\ \mathrm{k}\Omega + 101(2.2\ \mathrm{k}\Omega) = 220 + 222.2 = 442.2\ \mathrm{k}\Omega$
4. $I_B = 11.3/442.2\ \mathrm{k}\Omega = 25.55\ \mu\mathrm{A}$
5. $I_C = 100(25.55\ \mu\mathrm{A}) = 2.555\ \mathrm{mA}$
6. Collector voltage: $V_C = I_BR_B + V_{BE} = (25.55\ \mu\mathrm{A})(220\ \mathrm{k}\Omega) + 0.7 = 5.622 + 0.7 = 6.32\ \mathrm{V}$
7. With $R_E = 0$, $V_{CE} = V_C = 6.32\ \mathrm{V}$ (active)

> [!success]- Answer
> **$I_B = 25.6\ \mu\mathrm{A}$, $I_C = 2.56\ \mathrm{mA}$, $V_{CE} = 6.32\ \mathrm{V}$.**

> [!warning] Trap
> Writing $I_B = (V_{CC}-V_{BE})/(R_B + \beta R_C)$, which drops the $I_B$ that flows through $R_C$. The correct multiplier is $(\beta+1)R_C$; at $\beta = 100$ the error is about 0.5 %, but at $\beta = 20$ it exceeds 5 %.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(12 − 0.7) ÷ (220E3 + 101 × 2.2E3)` → $I_B$ = **25.55** $\mu$A.
> 2. `× 100` → $I_C$ = **2.555** mA; `× 220E3 + 0.7` → $V_{CE}$ = **6.32** V (the whole of $V_C$, since $R_E = 0$).

### P6. A two-supply emitter-bias stage returns the emitter to $-10\ \mathrm{V}$ and the base to ground. Find $I_E$ exactly and with the usual shortcut.

**Given:** $V_{EE} = 10\ \mathrm{V}$ (emitter supply magnitude); $R_E = 4.7\ \mathrm{k}\Omega$; $R_B = 100\ \mathrm{k}\Omega$; $\beta = 100$; $V_{BE} = 0.7\ \mathrm{V}$

**Solution:**

1. Base loop: $V_{EE} = I_BR_B + V_{BE} + I_ER_E$ with $I_B = I_E/(\beta+1)$
2. Exact form: $I_E = (V_{EE} - V_{BE})/[R_E + R_B/(\beta+1)]$
3. Compute the extra term: $R_B/(\beta+1) = 100\ \mathrm{k}\Omega/101 = 0.990\ \mathrm{k}\Omega$
4. $I_E = 9.3/(4.7 + 0.990)\ \mathrm{k}\Omega = 9.3/5.690\ \mathrm{k}\Omega = 1.634\ \mathrm{mA}$
5. Shortcut $I_E \approx 9.3/4.7\ \mathrm{k}\Omega = 1.979\ \mathrm{mA}$
6. Error: $(1.979 - 1.634)/1.634 = +21\%$ — the shortcut is not acceptable at this beta

> [!success]- Answer
> **$I_E = 1.63\ \mathrm{mA}$ exactly; the shortcut gives $1.98\ \mathrm{mA}$, 21 % high.**

> [!warning] Trap
> Dropping $R_B/(\beta+1)$ because it looks small next to $R_E$. It is 21 % of $R_E$ here, and the shortcut error grows as beta falls — at $\beta = 50$ it is over 40 %.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100E3 ÷ 101` → $R_B/(\beta+1)$ = **990.1** $\Omega$; `9.3 ÷ (4.7E3 + Ans)` → $I_E$ = **1.634** mA.
> 2. The shortcut, for comparison: `9.3 ÷ 4.7E3` → **1.979** mA, which is **+21.1** % high.

### P7. Design the voltage divider $R_1$, $R_2$ for a target Q-point of $I_C = 2\ \mathrm{mA}$, using a divider current of about $20I_B$.

**Given:** $V_{CC} = 12\ \mathrm{V}$; $R_C = 2.2\ \mathrm{k}\Omega$; $R_E = 1\ \mathrm{k}\Omega$; $\beta = 150$; $V_{BE} = 0.7\ \mathrm{V}$; target $I_C = 2\ \mathrm{mA}$

**Solution:**

1. $I_B = I_C/\beta = 2\ \mathrm{mA}/150 = 13.33\ \mu\mathrm{A}$; $I_E \approx I_C = 2.013\ \mathrm{mA}$
2. Required base voltage: $V_B = V_E + V_{BE} = I_ER_E + 0.7 = 2.013 + 0.7 = 2.713\ \mathrm{V}$
3. Choose divider current $I_2 = 20I_B = 266.7\ \mu\mathrm{A}$: $R_2 = V_B/I_2 = 2.713/266.7\ \mu\mathrm{A} = 10.17\ \mathrm{k}\Omega \to 10\ \mathrm{k}\Omega$
4. $I_1 = I_2 + I_B = 280.0\ \mu\mathrm{A}$: $R_1 = (V_{CC} - V_B)/I_1 = 9.287/280\ \mu\mathrm{A} = 33.17\ \mathrm{k}\Omega \to 33\ \mathrm{k}\Omega$
5. Verify with the exact equation: $V_{TH} = (10)(12)/43 = 2.791\ \mathrm{V}$, $R_{TH} = (33)(10)/43 = 7.674\ \mathrm{k}\Omega$
6. $I_B = (2.791 - 0.7)/(7.674 + 151)\ \mathrm{k}\Omega = 2.091/158.67\ \mathrm{k}\Omega = 13.18\ \mu\mathrm{A}$
7. $I_C = 150(13.18\ \mu\mathrm{A}) = 1.976\ \mathrm{mA}$; $V_{CE} = 12 - (1.976)(2.2) - (1.990)(1) = 5.66\ \mathrm{V}$

> [!success]- Answer
> **$R_1 = 33\ \mathrm{k}\Omega$, $R_2 = 10\ \mathrm{k}\Omega$, giving $I_C = 1.98\ \mathrm{mA}$ and $V_{CE} = 5.66\ \mathrm{V}$ (active).**

> [!warning] Trap
> Computing $R_1$ from the *unloaded* divider rule and stopping there. The base draws $13\ \mu\mathrm{A}$ out of the divider, so the built circuit gives $1.98\ \mathrm{mA}$ rather than exactly $2\ \mathrm{mA}$ — always re-solve the exact equation after choosing standard resistor values.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2E-3 ÷ 150 × 151` → $I_E$ = **2.013** mA; `× 1E3 + 0.7` → $V_B$ = **2.713** V.
> 2. `2.713 ÷ (20 × 2E-3 ÷ 150)` → $R_2$ = **10.17** k$\Omega$; `9.287 ÷ (21 × 2E-3 ÷ 150)` → $R_1$ = **33.17** k$\Omega$.
> 3. Re-solve with the standard values: `33 × 10 ÷ 43` → $R_{TH}$ = **7.674** k$\Omega$, `10 × 12 ÷ 43` → $V_{TH}$ = **2.791** V, then `(2.791 − 0.7) ÷ (7.674 + 151)` → $I_B$ = **13.18** $\mu$A and `× 150` → $I_C$ = **1.976** mA.

### P8. Complete DC analysis: find $I_B$, $I_C$, and the node voltages $V_E$, $V_B$, $V_C$, $V_{CE}$ for this voltage-divider bias stage.

**Given:** $V_{CC} = 18\ \mathrm{V}$; $R_1 = 39\ \mathrm{k}\Omega$; $R_2 = 8.2\ \mathrm{k}\Omega$; $R_C = 3.3\ \mathrm{k}\Omega$; $R_E = 1\ \mathrm{k}\Omega$; $\beta = 150$; $V_{BE} = 0.7\ \mathrm{V}$

**Solution:**

1. $V_{TH} = (8.2)(18)/(39 + 8.2) = 147.6/47.2 = 3.127\ \mathrm{V}$
2. $R_{TH} = (39)(8.2)/47.2 = 319.8/47.2 = 6.775\ \mathrm{k}\Omega$
3. $I_B = (3.127 - 0.7)/[6.775\ \mathrm{k}\Omega + 151(1\ \mathrm{k}\Omega)] = 2.427/157.78\ \mathrm{k}\Omega = 15.38\ \mu\mathrm{A}$
4. $I_C = 150(15.38\ \mu\mathrm{A}) = 2.308\ \mathrm{mA}$; $I_E = 151(15.38\ \mu\mathrm{A}) = 2.323\ \mathrm{mA}$
5. $V_E = I_ER_E = (2.323\ \mathrm{mA})(1\ \mathrm{k}\Omega) = 2.323\ \mathrm{V}$
6. $V_B = V_E + 0.7 = 3.023\ \mathrm{V}$ (also $V_{TH} - I_BR_{TH} = 3.127 - 0.104 = 3.023\ \mathrm{V}$, a consistent check)
7. $V_C = V_{CC} - I_CR_C = 18 - (2.308\ \mathrm{mA})(3.3\ \mathrm{k}\Omega) = 18 - 7.615 = 10.385\ \mathrm{V}$
8. $V_{CE} = V_C - V_E = 10.385 - 2.323 = 8.062\ \mathrm{V}$; $V_{BC} = V_B - V_C = -7.36\ \mathrm{V}$, so the collector junction is reverse-biased and the stage is active

> [!success]- Answer
> **$I_B = 15.4\ \mu\mathrm{A}$, $I_C = 2.31\ \mathrm{mA}$, $V_E = 2.32\ \mathrm{V}$, $V_B = 3.02\ \mathrm{V}$, $V_C = 10.39\ \mathrm{V}$, $V_{CE} = 8.06\ \mathrm{V}$.**

> [!warning] Trap
> Reporting $V_{CE} = 18 - 7.615 = 10.39\ \mathrm{V}$ by forgetting the $I_ER_E$ drop. That overstates $V_{CE}$ by $2.32\ \mathrm{V}$ — here 29 % — and would mislead any later large-signal swing calculation.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `8.2 × 18 ÷ 47.2` → $V_{TH}$ = **3.127** V; `39 × 8.2 ÷ 47.2` → $R_{TH}$ = **6.775** k$\Omega$.
> 2. `MODE` `5` `1`: coefficients `−150` `1` `0` then `7.775` `1` `2.427` `=` → $I_B$ = **0.01538** mA, $I_C$ = **2.308** mA.
> 3. `0.01538 × 151` → $I_E$ = **2.323** mA, so $V_E$ = **2.323** V and $V_B$ = **3.023** V; `18 − 2.308 × 3.3` → $V_C$ = **10.39** V, giving $V_{CE}$ = **8.06** V.

### P9. Using the voltage-divider stage of the previous problem (same resistors), find $I_C$ at $\beta = 100$ and at $\beta = 300$, and compare its sensitivity with fixed bias.

**Given:** $V_{TH} = 4.231\ \mathrm{V}$, $R_{TH} = 17.35\ \mathrm{k}\Omega$; $R_E = 1.5\ \mathrm{k}\Omega$; $R_C = 4.7\ \mathrm{k}\Omega$, $V_{CC} = 20\ \mathrm{V}$; $\beta = 100$ and $\beta = 300$; $V_{BE} = 0.7\ \mathrm{V}$

**Solution:**

1. At $\beta = 100$: $I_B = (4.231 - 0.7)/[17.35\ \mathrm{k}\Omega + 101(1.5\ \mathrm{k}\Omega)] = 3.531/168.85\ \mathrm{k}\Omega = 20.91\ \mu\mathrm{A}$
2. So $I_C = 100(20.91\ \mu\mathrm{A}) = 2.091\ \mathrm{mA}$
3. At $\beta = 300$: $I_B = 3.531/[17.35\ \mathrm{k}\Omega + 301(1.5\ \mathrm{k}\Omega)] = 3.531/468.85\ \mathrm{k}\Omega = 7.531\ \mu\mathrm{A}$
4. So $I_C = 300(7.531\ \mu\mathrm{A}) = 2.259\ \mathrm{mA}$
5. Change: $(2.259 - 2.091)/2.091 = +8.0\%$ for a 3x change in beta
6. The same 3x beta change in fixed bias would give $I_C = \beta I_B$ with $I_B$ fixed, i.e. +200 %

> [!success]- Answer
> **$I_C$ moves only 8.0 % (2.09 mA to 2.26 mA) for a 3x beta change, versus +200 % for fixed bias.**

> [!warning] Trap
> Concluding that voltage-divider bias is completely beta-independent. It is only *nearly* so, and only when $\beta R_E$ comfortably exceeds $10R_2$; the residual 8 % here comes entirely from the $I_BR_{TH}$ loading term.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3.531 ÷ (17.35 + 101 × 1.5)` → $I_B$ = **20.91** $\mu$A and `× 100` → $I_C$ = **2.091** mA at $\beta$ = 100.
> 2. `3.531 ÷ (17.35 + 301 × 1.5)` → $I_B$ = **7.531** $\mu$A and `× 300` → $I_C$ = **2.259** mA at $\beta$ = 300.
> 3. `(2.259 − 2.091) ÷ 2.091` → **+8.0** % for a 3× change in $\beta$, against +200 % for fixed bias.

## Traps & Exam Notes

- **Omitting $V_{BE}$ from the base loop.** Using $I_B = V_{CC}/R_B$ instead of $(V_{CC}-0.7)/R_B$ is 5.8 % high at $V_{CC} = 12\ \mathrm{V}$ but 21 % high at $V_{CC} = 3.3\ \mathrm{V}$, so the error is worst in the low-voltage designs the exam likes.
- **Trusting $I_C = \beta I_B$ into saturation.** At $\beta = 150$ in a base-bias stage the linear result is $V_{CE} = -3.54\ \mathrm{V}$. A negative computed $V_{CE}$ always means saturation: clamp to $V_{CE(sat)}$ and recompute $I_C = (V_{CC}-V_{CE(sat)})/(R_C+R_E)$.
- **Using $I_CR_E$ instead of $I_ER_E$ in the output loop.** The error in $V_{CE}$ is $I_BR_E$: only 47 mV at $\beta = 100$ and $R_E = 1\ \mathrm{k}\Omega$, but 0.24 V at $\beta = 20$ — and it is always a *positive* bias in the answer.
- **Applying the divider rule to $V_B$ without the loading test.** Skipping the $\beta R_E \geq 10R_2$ check produced $I_C$ 10.5 % high in the 82 k / 22 k example above.
- **Dropping $R_B/(\beta+1)$ in two-supply emitter bias.** At $R_B = 100\ \mathrm{k}\Omega$, $R_E = 4.7\ \mathrm{k}\Omega$ and $\beta = 100$, that term is 21 % of $R_E$, so the shortcut $I_E = (V_{EE}-V_{BE})/R_E$ overstates the current by 21 %.
- **Using $\beta$ instead of $\beta+1$ for the current through $R_C$ in collector-feedback bias.** The base current is stolen from the collector node, so $R_C$ carries $I_C + I_B$; the standard result is $R_B + (\beta+1)(R_C+R_E)$.
- **NPN equations on a PNP.** $V_{BE}$ becomes $V_{EB} = 0.7\ \mathrm{V}$ and every supply and node voltage changes sign; substituting $-0.7\ \mathrm{V}$ into the NPN expression gives a nonsensical current direction.

## See Also

- [[02_Load_Lines_and_Q_Point]]
- [[03_Bias_Stability_and_Stability_Factors]]
- [[04_FET_Biasing_Configurations]]
- [[06_Small-Signal_re_Model_CE,_CB,_CC]]
- [[10_BJT_Current_Gains_and_Relationships]]
- [[08_Zener_Diodes_and_Shunt_Regulators]]

---

⬅ *start* · [[_MOC_Circuit_Analysis_and_Design|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Load_Lines_and_Q_Point|02 ➡]]
