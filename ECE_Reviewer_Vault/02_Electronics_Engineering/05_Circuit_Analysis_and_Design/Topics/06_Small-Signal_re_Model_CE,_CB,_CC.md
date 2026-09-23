---
id: ECE-05-06
title: "Small-Signal re Model: CE, CB, CC"
part: "02_Electronics_Engineering"
area: "05_Circuit_Analysis_and_Design"
topic: 6
tier: 1
depth: full
problem_count: 9
prereqs: ["[[01_BJT_DC_Biasing_Configurations]]", "[[09_BJT_Structure_and_Operating_Regions]]", "[[10_BJT_Current_Gains_and_Relationships]]"]
tags: ["ece", "electronics_engineering", "circuit_analysis_and_design"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Small-Signal re Model: CE, CB, CC

> [!abstract] Scope
> Reduce a biased BJT to its r_e small-signal model and read off the gain, input resistance and output resistance of the CE, CB and CC configurations.

## Core Concept

> [!tip] Intuition
> At the operating point the base-emitter junction behaves like a resistor whose value is set entirely by the DC emitter current — $r_e = 26\ \mathrm{mV}/I_E$ — and the collector behaves like a current source. Change the bias and every AC number in the circuit changes with it.

**The model in one line.** Replace the base-emitter junction by the dynamic resistance $r_e = V_T/I_E$ (with $V_T \approx 26\ \mathrm{mV}$ at 300 K) and the collector by a controlled source of value $\beta i_b$ (equivalently $g_m v_{be}$). Every other element — $R_C$, $R_L$, $R_E$, $r_o$ — is left exactly as it is in the schematic. This is a *small-signal linearisation* around the Q-point, so every element in the model is a function of the DC bias, not of the transistor's part number. Two devices with the same $I_E$ have the same $r_e$ regardless of beta.

**Why $r_e = V_T/I_E$ and not something else.** The diode equation $I_C = I_Se^{V_{BE}/V_T}$ differentiates to $g_m = dI_C/dV_{BE} = I_C/V_T$, so the emitter resistance is $r_e = 1/g_m$ to within the factor $\alpha = \beta/(\beta+1)$. Writing it with $I_E$ is the physically correct form; substituting $I_C$ is a 1 % error at $\beta = 100$, 4.8 % at $\beta = 20$, and it grows without bound as beta falls. The board convention for $V_T$ is $26\ \mathrm{mV}$, not $25\ \mathrm{mV}$.

**Common emitter (CE).** With $R_E$ bypassed, the midband results are as follows. The voltage gain is:
$$A_v = -g_m(r_o \parallel R_C \parallel R_L) \approx -(R_C \parallel R_L)/r_e$$
the input resistance is $Z_i = R_B \parallel \beta r_e$ and the output resistance is $Z_o \approx R_C$. It is the only inverting configuration (180° phase shift) and it provides both voltage gain and current gain, which is why it is the default. Its weakness is that the gain is inversely proportional to $r_e$, hence directly proportional to $I_C$ — raise the bias current to raise the gain and you also raise the dissipation and lower the input resistance.

**Emitter degeneration: $R_E$ unbypassed.** Leaving $R_E$ in the signal path makes the emitter follow the base, so $v_{be}$ shrinks and $A_v$ collapses to $-(R_C \parallel R_L)/(r_e + R_E)$ while $Z_i$ rises to $R_B \parallel [\beta r_e + (\beta+1)R_E]$. The payoff is that the gain now depends on resistors rather than on $r_e$ (which drifts with temperature at $+0.5\ \%/^{\circ}\mathrm{C}$), and the input resistance can be raised by orders of magnitude. Gain and input impedance trade against each other, and this resistor is the knob.

**Common base (CB).** The base is at AC ground and the signal enters the emitter, so $Z_i = r_e \parallel R_E \approx r_e$ — tens of ohms. The voltage gain is $A_v = +(R_C \parallel R_L)/r_e$, the same magnitude as CE but *non-inverting*, and the current gain is $A_i = -\alpha \approx -1$, so it is a current buffer, not a current amplifier. Its real value is frequency response: $C_{bc}$ sees the collector on one side and an AC ground on the other, so it is not Miller-multiplied, and the CB stage therefore has the widest bandwidth of the three. It is also the upper device of a cascode for exactly this reason.

**Common collector (CC, emitter follower).** The output is taken at the emitter, where the voltage gain is just below unity and non-inverting:
$$A_v = R_L'/(r_e + R_L') < 1$$
The input resistance is high:
$$Z_i = R_B \parallel [\beta r_e + (\beta+1)R_L']$$
The output resistance is very low, often tens of ohms:
$$Z_o = R_E \parallel [r_e + (R_s \parallel R_B)/(\beta+1)]$$
It has no voltage gain but a current gain of $\beta+1$ and it transforms a high source resistance into a low output resistance. It is the standard way to drive a low-resistance load without losing the signal in the source resistance.

**How to choose.** CE for voltage gain, CB for bandwidth or a low input impedance (and as the cascode's second stage), CC as a buffer between a high-impedance source and a low-impedance load. The three share one Q-point calculation: solve the DC bias first, compute $r_e = 26\ \mathrm{mV}/I_E$, then substitute into the configuration-specific formulas.

## Derivation

Transconductance and input resistance: differentiate $I_C = I_Se^{V_{BE}/V_T}$ to get $g_m = I_C/V_T$. Since $I_C = \alpha I_E$, $r_e = 1/g_m = V_T/I_E$ and $r_\pi = \beta r_e = \beta V_T/I_C$.

CE voltage gain: the emitter is AC ground, so $v_{be} = v_b$ and $i_b = v_b/r_\pi$. The collector current $g_mv_{be}$ flows into the parallel combination $r_o \parallel R_C \parallel R_L$, giving $v_c = -g_mv_{be}(r_o \parallel R_C \parallel R_L)$ and hence $A_v = -g_m(r_o \parallel R_C \parallel R_L) = -(r_o \parallel R_C \parallel R_L)/r_e$.

CE with $R_E$ unbypassed: the emitter voltage rises with the base, so the signal across the junction is reduced. The standard result is $A_v = -\beta R_L'/[r_\pi + (\beta+1)R_E] = -R_L'/(r_e + R_E)$, and the same denominator appears in the input resistance $Z_i = R_B \parallel [r_\pi + (\beta+1)R_E]$. The $(\beta+1)$ multiplier is the reflected emitter resistance seen from the base.

CC output resistance: the source resistance $R_s \parallel R_B$ is reflected into the emitter divided by $(\beta+1)$, giving an open-circuit emitter resistance of $r_e + (R_s \parallel R_B)/(\beta+1)$, which then appears in parallel with $R_E$.

CB: the base is grounded, so the input resistance seen at the emitter is $r_e \parallel R_E \approx r_e$ and the collector current is $\alpha i_e$, giving $A_v = +R_L'/r_e$ and $A_i = -\alpha$. The base-collector capacitance is grounded on its base side, so no Miller multiplication occurs and the bandwidth is the widest of the three.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Emitter dynamic resistance | $r_e = \frac{V_T}{I_E}, \quad V_T \approx 26\ \mathrm{mV}$ | The single most important number in the model. Board convention is 26 mV at 300 K; using 25 mV makes every gain 4 % high. |
| Transconductance | $g_m = \frac{I_C}{V_T} = \frac{1}{r_e}$ | The second form is the r_e-model convention (alpha = 1). Exact only when I_C = I_E. |
| Base input resistance | $r_\pi = \beta r_e = \frac{\beta V_T}{I_C}$ | Seen looking into the base with the emitter grounded; equals h_ie in the h-parameter model. |
| CE voltage gain | $A_v = -g_m(r_o \parallel R_C \parallel R_L) \approx -\frac{R_C \parallel R_L}{r_e}$ | R_E bypassed. The approximation drops r_o; including it costs about 6 % at r_o = 50 kohm. |
| CE input resistance | $Z_i = R_B \parallel \beta r_e$ | Bypassed R_E. Typically only a few kohm, which is why the source resistance loads the stage. |
| CE with unbypassed R_E | $A_v = -\frac{R_C \parallel R_L}{r_e + R_E}, \quad Z_i = R_B \parallel [\beta r_e + (\beta + 1)R_E]$ | Emitter degeneration. Gain falls sharply but becomes independent of r_e and Z_i rises by (beta+1)R_E. |
| CB parameters | $Z_i = r_e \parallel R_E \approx r_e, \quad A_v = +\frac{R_C \parallel R_L}{r_e}, \quad A_i = -\alpha$ | Non-inverting, very low Z_i, current gain below unity. No Miller effect, so it is the widest-band configuration. |
| Alpha-beta relationship | $\alpha = \frac{\beta}{\beta + 1}, \quad \beta = \frac{\alpha}{1 - \alpha}$ | Alpha is always slightly below 1, so the CB current gain magnitude is always below unity. |
| CC (emitter follower) | $A_v = \frac{R_L'}{r_e + R_L'}, \quad Z_i = R_B \parallel [\beta r_e + (\beta + 1)R_L'], \quad Z_o = R_E \parallel \left[r_e + \frac{R_s \parallel R_B}{\beta + 1}\right]$ | R_L' = R_E \|\| R_L. Voltage gain just below 1, high input resistance, very low output resistance. |
| Current gain from voltage gain | $A_i = -\frac{A_v Z_i}{R_L}$ | Definition-based relation; avoids re-deriving the current divider for each configuration. |

## Worked Problems

### P1. Find $r_e$, $g_m$ and $r_\pi$ for a BJT biased at $I_E = 2\ \mathrm{mA}$.

**Given:** $I_E = 2\ \mathrm{mA}$; $\beta = 150$; $V_T = 26\ \mathrm{mV}$

**Solution:**

1. $r_e = V_T/I_E = 26\ \mathrm{mV}/2\ \mathrm{mA}$
2. $r_e = 13.0\ \Omega$
3. $I_C = \alpha I_E = (150/151)(2\ \mathrm{mA}) = 1.987\ \mathrm{mA}$
4. $g_m = I_C/V_T = 1.987\ \mathrm{mA}/26\ \mathrm{mV} = 76.4\ \mathrm{mS}$ (equivalently $1/r_e = 76.9\ \mathrm{mS}$ in the r_e-model convention)
5. $r_\pi = \beta r_e = 150(13.0\ \Omega) = 1.95\ \mathrm{k}\Omega$

> [!success]- Answer
> **$r_e = 13\ \Omega$, $g_m = 76.4\ \mathrm{mS}$, $r_\pi = 1.95\ \mathrm{k}\Omega$.**

> [!warning] Trap
> Using $V_T = 25\ \mathrm{mV}$ gives $r_e = 12.5\ \Omega$, a 3.8 % error that propagates into every gain computed from it. The board figure is 26 mV.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `26 ÷ 2` → $r_e$ = **13** $\Omega$; `× 150` → $r_\pi$ = **1.95** k$\Omega$.
> 2. `(150 ÷ 151 × 2) ÷ 26` → $g_m$ = **76.4** mS; the $r_e$-model convention gives `1 ÷ 13` → **76.9** mS.

### P2. A CE amplifier has the Q-point of the previous problem and a bypassed emitter resistor. Find $A_v$, $Z_i$, $A_i$ and $Z_o$ (neglect $r_o$).

**Given:** $r_e = 13\ \Omega$ (from $I_E = 2\ \mathrm{mA}$); $\beta = 150$; $R_C = 4.7\ \mathrm{k}\Omega$; $R_L = 10\ \mathrm{k}\Omega$; $R_B = 220\ \mathrm{k}\Omega$

**Solution:**

1. AC collector load: $R_L' = R_C \parallel R_L = (4.7)(10)/(14.7) = 3.197\ \mathrm{k}\Omega$
2. $A_v = -R_L'/r_e = -3197/13 = -245.9$
3. $Z_i = R_B \parallel \beta r_e = 220\ \mathrm{k}\Omega \parallel 1.95\ \mathrm{k}\Omega = (220)(1.95)/221.95 = 1.933\ \mathrm{k}\Omega$
4. $A_i = -A_vZ_i/R_L' = (245.9)(1933)/3197 = 148.7$ (just under $\beta$, as expected)
5. $Z_o \approx R_C = 4.7\ \mathrm{k}\Omega$

> [!success]- Answer
> **$A_v = -246$ (inverting), $Z_i = 1.93\ \mathrm{k}\Omega$, $A_i = 148.7$, $Z_o = 4.7\ \mathrm{k}\Omega$.**

> [!warning] Trap
> Using $R_C$ instead of $R_C \parallel R_L$: $A_v = -4700/13 = -362$, which is 47 % higher than the correct -246. The AC load always includes $R_L$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4.7 × 10 ÷ 14.7` → $R_L'$ = **3.197** k$\Omega$; `−3197 ÷ 13` → $A_v$ = **−245.9**.
> 2. `220 × 1.95 ÷ 221.95` → $Z_i$ = **1.933** k$\Omega$.
> 3. `245.9 × 1933 ÷ 3197` → $A_i$ = **148.7**, just under $\beta$ as expected.

### P3. Repeat the previous problem but include the transistor output resistance $r_o = 50\ \mathrm{k}\Omega$. How large is the error from ignoring it?

**Given:** $r_e = 13\ \Omega$; $R_C = 4.7\ \mathrm{k}\Omega$; $R_L = 10\ \mathrm{k}\Omega$; $r_o = 50\ \mathrm{k}\Omega$

**Solution:**

1. Three resistances now appear in parallel at the collector: $r_o$, $R_C$ and $R_L$
2. $1/R_{ac} = 1/50\ \mathrm{k}\Omega + 1/4.7\ \mathrm{k}\Omega + 1/10\ \mathrm{k}\Omega$
3. $= 20 + 212.8 + 100\ \mu\mathrm{S} = 332.8\ \mu\mathrm{S}$, so $R_{ac} = 3.005\ \mathrm{k}\Omega$
4. $A_v = -3005/13 = -231.2$
5. Error of the $r_o$-free result: $(245.9 - 231.2)/231.2 = 6.4\%$ too high

> [!success]- Answer
> **$A_v = -231$; neglecting $r_o$ overstates the gain by 6.4 %.**

> [!warning] Trap
> Assuming $r_o$ is always negligible. Since $r_o = V_A/I_C$, it falls as the bias current rises — at $I_C = 5\ \mathrm{mA}$ with $V_A = 50\ \mathrm{V}$, $r_o = 10\ \mathrm{k}\Omega$ and the correction is much larger than 6 %.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1 ÷ (1 ÷ 50 + 1 ÷ 4.7 + 1 ÷ 10)` → $R_{ac}$ = **3.005** k$\Omega$ (the `x⁻¹` key is the fast route to a parallel set).
> 2. `−3005 ÷ 13` → $A_v$ = **−231.2**.
> 3. `(245.9 − 231.2) ÷ 231.2` → **+6.4** %, the error from dropping $r_o$.

### P4. The same stage is rebuilt with $R_E = 470\ \Omega$ left unbypassed. Find $A_v$ and $Z_i$, and compare with the bypassed case.

**Given:** $r_e = 13\ \Omega$; $R_E = 470\ \Omega$; $R_C = 4.7\ \mathrm{k}\Omega$; $R_L = 10\ \mathrm{k}\Omega$; $R_B = 220\ \mathrm{k}\Omega$; $\beta = 150$

**Solution:**

1. $R_L' = R_C \parallel R_L = 3.197\ \mathrm{k}\Omega$ as before
2. $A_v = -R_L'/(r_e + R_E) = -3197/(13 + 470) = -3197/483 = -6.62$
3. Input resistance denominator: $\beta r_e + (\beta+1)R_E = 1950 + 151(470) = 1950 + 70,970 = 72.92\ \mathrm{k}\Omega$
4. $Z_i = 220\ \mathrm{k}\Omega \parallel 72.92\ \mathrm{k}\Omega = (220)(72.92)/292.92 = 54.8\ \mathrm{k}\Omega$
5. Comparison: gain falls from -246 to -6.62 (a factor of 37) while $Z_i$ rises from 1.93 kohm to 54.8 kohm (a factor of 28)

> [!success]- Answer
> **$A_v = -6.62$, $Z_i = 54.8\ \mathrm{k}\Omega$ — gain traded for input resistance.**

> [!warning] Trap
> Adding $R_E$ to the input resistance but not to the gain denominator (or vice versa). Both the gain and $Z_i$ change, and the emitter resistance is reflected into the base multiplied by $(\beta+1)$, not by $\beta$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `13 + 470` → **483** $\Omega$; `−3197 ÷ 483` → $A_v$ = **−6.62**.
> 2. `1950 + 151 × 470` → **72.92** k$\Omega$; `220 × 72.92 ÷ 292.92` → $Z_i$ = **54.8** k$\Omega$.
> 3. The trade: the gain falls **37**× (246 to 6.62) while $Z_i$ rises **28**× (1.93 k to 54.8 k).

### P5. Find $Z_i$, $A_v$, $A_i$ and $Z_o$ for a common-base stage.

**Given:** $r_e = 13\ \Omega$; $\beta = 150$; $R_E = 2\ \mathrm{k}\Omega$; $R_C = 4.7\ \mathrm{k}\Omega$; $R_L = 10\ \mathrm{k}\Omega$

**Solution:**

1. $Z_i = r_e \parallel R_E = (13)(2000)/(2013) = 12.9\ \Omega$
2. $R_L' = R_C \parallel R_L = 3.197\ \mathrm{k}\Omega$ (unchanged)
3. $A_v = +R_L'/r_e = +3197/13 = +245.9$ — non-inverting
4. $\alpha = \beta/(\beta+1) = 150/151 = 0.9934$, so $A_i = -\alpha = -0.993$
5. $Z_o \approx R_C = 4.7\ \mathrm{k}\Omega$

> [!success]- Answer
> **$Z_i = 12.9\ \Omega$, $A_v = +246$, $A_i = -0.993$, $Z_o = 4.7\ \mathrm{k}\Omega$.**

> [!warning] Trap
> Quoting a current gain of 150 (or even 1.0) for the CB stage. The CB current gain is $-\alpha$, whose magnitude is always below unity — it is a current buffer, and the sign is negative because the output current is defined into the collector.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `13 × 2000 ÷ 2013` → $Z_i$ = **12.9** $\Omega$.
> 2. `3197 ÷ 13` → $A_v$ = **+245.9** — the same magnitude as the CE stage but non-inverting.
> 3. `150 ÷ 151` → $\alpha$ = **0.9934**, so $A_i = -\alpha$ = **−0.993**, and `Z_o` = **4.7** k$\Omega$ = $R_C$.

### P6. An emitter follower drives a load. Find $A_v$, $Z_i$ and $Z_o$.

**Given:** $r_e = 13\ \Omega$; $\beta = 150$; $R_E = 1\ \mathrm{k}\Omega$; $R_L = 2\ \mathrm{k}\Omega$; $R_B = 100\ \mathrm{k}\Omega$; $R_s = 600\ \Omega$

**Solution:**

1. AC emitter load: $R_L' = R_E \parallel R_L = (1)(2)/3\ \mathrm{k}\Omega = 666.7\ \Omega$
2. $A_v = R_L'/(r_e + R_L') = 666.7/(13 + 666.7) = 666.7/679.7 = 0.981$
3. $Z_i = R_B \parallel [\beta r_e + (\beta+1)R_L'] = 100\ \mathrm{k}\Omega \parallel [1950 + 151(666.7)] = 100\ \mathrm{k}\Omega \parallel 102.6\ \mathrm{k}\Omega$
4. $Z_i = (100)(102.6)/202.6 = 50.6\ \mathrm{k}\Omega$
5. $R_s \parallel R_B = 600 \parallel 100\ \mathrm{k}\Omega = 596.4\ \Omega$
6. $Z_o' = r_e + (R_s \parallel R_B)/(\beta+1) = 13 + 596.4/151 = 13 + 3.95 = 16.95\ \Omega$
7. $Z_o = R_E \parallel Z_o' = (1000)(16.95)/1016.95 = 16.7\ \Omega$

> [!success]- Answer
> **$A_v = 0.981$ (non-inverting), $Z_i = 50.6\ \mathrm{k}\Omega$, $Z_o = 16.7\ \Omega$.**

> [!warning] Trap
> Forgetting that $R_s$ lowers $Z_i$ and that $R_s \parallel R_B$, not $R_B$ alone, is reflected into the emitter. Ignoring $R_s$ gives a glossy $Z_o = 16.9\ \Omega$ here, but with $R_s = 10\ \mathrm{k}\Omega$ the real output resistance is nearly five times larger.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1 × 2 ÷ 3` → $R_L'$ = **666.7** $\Omega$; `666.7 ÷ (13 + 666.7)` → $A_v$ = **0.981**.
> 2. `1950 + 151 × 666.7` → **102.6** k$\Omega$; `100 × 102.6 ÷ 202.6` → $Z_i$ = **50.6** k$\Omega$.
> 3. `600 × 100 ÷ 100.6` → $R_s \parallel R_B$ = **596.4** $\Omega$, so `13 + 596.4 ÷ 151` → **16.95** $\Omega$ and `1000 × 16.95 ÷ 1016.95` → $Z_o$ = **16.7** $\Omega$.

### P7. Design the bias current for a CE stage that must deliver $|A_v| = 120$.

**Given:** $R_C = 3.9\ \mathrm{k}\Omega$; $R_L = 6.8\ \mathrm{k}\Omega$; $R_E$ bypassed, $r_o$ neglected; $V_T = 26\ \mathrm{mV}$

**Solution:**

1. $R_L' = R_C \parallel R_L = (3.9)(6.8)/(10.7) = 2.478\ \mathrm{k}\Omega$
2. Rearrange $|A_v| = R_L'/r_e$: $r_e = R_L'/|A_v| = 2478/120 = 20.65\ \Omega$
3. Invert the model relation: $I_E = V_T/r_e = 26\ \mathrm{mV}/20.65\ \Omega$
4. $I_E = 1.259\ \mathrm{mA}$

> [!success]- Answer
> **$I_E = 1.26\ \mathrm{mA}$ (giving $r_e = 20.7\ \Omega$).**

> [!warning] Trap
> Solving with $R_C$ alone: $r_e = 3900/120 = 32.5\ \Omega$ gives $I_E = 0.8\ \mathrm{mA}$, only 63 % of the required current, and the built amplifier then has $|A_v| = 76$ instead of 120.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3.9 × 6.8 ÷ 10.7` → $R_L'$ = **2.478** k$\Omega$.
> 2. `SHIFT` `SOLVE` on `120 = 2.478X ÷ 0.026` (the inner equals is `ALPHA` `=`), guess 1 → $I_E$ = **1.259** mA.
> 3. Check: `0.026 ÷ 1.259` → $r_e$ = **20.65** $\Omega$, and `2478 ÷ 20.65` → **120.0**.

### P8. The CE stage with $A_v = -246$ and $Z_i = 1.933\ \mathrm{k}\Omega$ is driven from a source with $R_s = 600\ \Omega$ and $v_s = 10\ \mathrm{mV}$ peak. Find the output voltage and the fraction of the source signal lost at the input.

**Given:** $A_v = -245.9$; $Z_i = 1.933\ \mathrm{k}\Omega$; $R_s = 600\ \Omega$; $v_s = 10\ \mathrm{mV}$ peak

**Solution:**

1. Voltage divider at the input: $v_b = v_s Z_i/(Z_i + R_s)$
2. $v_b = 10\ \mathrm{mV} \times 1933/(1933 + 600) = 10 \times 0.7631 = 7.63\ \mathrm{mV}$
3. Amplify: $v_o = |A_v| v_b = 245.9 \times 7.63\ \mathrm{mV} = 1.877\ \mathrm{V}$ peak
4. Signal lost at the input: $(10 - 7.63)/10 = 23.7\%$
5. Swing check: $I_C R_L' = (1.987\ \mathrm{mA})(3.197\ \mathrm{k}\Omega) = 6.35\ \mathrm{V}$ available, so 1.88 V peak does not clip

> [!success]- Answer
> **$v_b = 7.63\ \mathrm{mV}$, $v_o = 1.88\ \mathrm{V}$ peak; 23.7 % of the source signal is dropped across $R_s$.**

> [!warning] Trap
> Multiplying $A_v$ by $v_s$ directly and reporting 2.46 V. The source resistance and the low CE input resistance form a divider; with a 10 kohm source the same stage would lose 84 % of the signal.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10 × 1933 ÷ (1933 + 600)` → $v_b$ = **7.63** mV.
> 2. `245.9 × 7.63` → $v_o$ = **1.88** V peak.
> 3. `(10 − 7.63) ÷ 10` → **23.7** % of the source lost at the input; `1.987 × 3.197` → **6.35** V of swing available, so there is no clipping.

### P9. A 1 V source with $R_s = 10\ \mathrm{k}\Omega$ must drive a $1\ \mathrm{k}\Omega$ load. Compare the load voltage with a direct connection and with an emitter follower ($R_E = 1\ \mathrm{k}\Omega$, $R_B = 100\ \mathrm{k}\Omega$, $\beta = 150$, $r_e = 13\ \Omega$).

**Given:** $v_s = 1\ \mathrm{V}$, $R_s = 10\ \mathrm{k}\Omega$; $R_L = 1\ \mathrm{k}\Omega$; $R_E = 1\ \mathrm{k}\Omega$, $R_B = 100\ \mathrm{k}\Omega$; $\beta = 150$, $r_e = 13\ \Omega$

**Solution:**

1. Direct connection: $v_L = v_s R_L/(R_s + R_L) = 1(1000/11000) = 0.0909\ \mathrm{V}$
2. Emitter follower AC load: $R_L' = R_E \parallel R_L = 500\ \Omega$
3. $Z_i = 100\ \mathrm{k}\Omega \parallel [1950 + 151(500)] = 100\ \mathrm{k}\Omega \parallel 77.45\ \mathrm{k}\Omega = 43.6\ \mathrm{k}\Omega$
4. $v_b = 1 \times 43.6/(43.6 + 10) = 0.8136\ \mathrm{V}$
5. $A_v = R_L'/(r_e + R_L') = 500/513 = 0.9747$
6. $v_L = 0.8136 \times 0.9747 = 0.793\ \mathrm{V}$
7. Improvement: $0.793/0.0909 = 8.7$ times

> [!success]- Answer
> **$v_L = 0.793\ \mathrm{V}$ through the follower versus $0.0909\ \mathrm{V}$ direct — an 8.7x improvement.**

> [!warning] Trap
> Concluding that the follower is useless because $A_v < 1$. The voltage gain is 0.975, but the *system* gain improves by nearly 9x because the stage stops the source resistance from swallowing the signal.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1 × 1000 ÷ 11000` → the direct connection gives $v_L$ = **0.0909** V.
> 2. `1 × 1 ÷ 2` → $R_L'$ = **500** $\Omega$; `1950 + 151 × 500` → **77.45** k$\Omega$; `100 × 77.45 ÷ 177.45` → $Z_i$ = **43.6** k$\Omega$.
> 3. `43.6 ÷ 53.6` → $v_b$ = **0.8136** V, `500 ÷ 513` → $A_v$ = **0.9747**, so $v_L$ = **0.793** V; `0.793 ÷ 0.0909` → **8.7**× better.

## Traps & Exam Notes

- **Using $V_T = 25\ \mathrm{mV}$.** The board convention is $26\ \mathrm{mV}$; the substitution changes $r_e$, and therefore every gain in the circuit, by about 4 %.
- **Computing $r_e$ from $I_C$ when the circuit's $I_E$ is known.** The two differ by 1 % at $\beta = 100$ but 4.8 % at $\beta = 20$ — and the error always makes $r_e$ too small, so every gain comes out too high.
- **Ignoring $R_L$ in the AC load.** $A_v = -R_C/r_e = -362$ versus the correct $-246$ with $R_C = 4.7\ \mathrm{k}\Omega$ and $R_L = 10\ \mathrm{k}\Omega$: a 47 % overstatement.
- **Forgetting the degeneration arithmetic on $R_E$.** An unbypassed $470\ \Omega$ emitter resistor against $r_e = 13\ \Omega$ cuts the gain from -246 to -6.62 while raising $Z_i$ from 1.93 kohm to 54.8 kohm. Adding $R_E$ to only one of the two formulas is the classic half-correct answer.
- **Claiming a current gain above unity for CB.** $A_i = -\alpha = -\beta/(\beta+1) = -0.993$; the magnitude of the CB current gain is *always* below 1, and the negative sign comes from the output-current convention.
- **Sign and phase.** CE inverts (180°); CB and CC do not. Writing $A_v = +R_C/r_e$ for a CE stage or $-R_C/r_e$ for a CB stage produces a 180° phase error that the exam asks about explicitly.
- **Dropping $r_o$ unconditionally.** It is a 6 % correction at $r_o = 50\ \mathrm{k}\Omega$, but since $r_o = V_A/I_C$ the error grows with bias current — at $I_C = 5\ \mathrm{mA}$ and $V_A = 50\ \mathrm{V}$ the correction is roughly 30 %.

## See Also

- [[05_BJT_Small-Signal_h-Parameter_Model]]
- [[07_Hybrid-Pi_Model]]
- [[08_FET_Amplifiers_CS,_CD,_CG]]
- [[09_Multistage,_Cascade_and_Cascode]]
- [[13_Gain-Bandwidth_Product_and_fT]]
- [[01_BJT_DC_Biasing_Configurations]]

---

[[05_BJT_Small-Signal_h-Parameter_Model|⬅ 05]] · [[_MOC_Circuit_Analysis_and_Design|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Hybrid-Pi_Model|07 ➡]]
