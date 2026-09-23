---
id: ECE-05-05
title: "BJT Small-Signal h-Parameter Model"
part: "02_Electronics_Engineering"
area: "05_Circuit_Analysis_and_Design"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_BJT_DC_Biasing_Configurations]]", "[[10_BJT_Current_Gains_and_Relationships]]", "[[03_Bias_Stability_and_Stability_Factors]]"]
tags: ["ece", "electronics_engineering", "circuit_analysis_and_design"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — BJT Small-Signal h-Parameter Model

> [!abstract] Scope
> Replace a biased bipolar transistor with its two-port hybrid equivalent, then compute the current gain, input resistance and voltage gain of a common-emitter stage from the four h-parameters, exactly and with the usual approximations.

## Core Concept

> [!tip] Intuition
> The h-parameter model freezes the transistor at its quiescent point and replaces the curves with straight lines: a resistor at the input, a tiny voltage source that leaks a fraction of the output back to the input, a current source that copies the base current into the collector, and an output conductance. Four numbers then predict the gain of any stage the device is dropped into.

**The two-port idea.** At a fixed quiescent point a transistor is a linear two-port, so its small-signal behaviour is fully described by two equations:
$$v_{be} = h_{ie}i_b + h_{re}v_{ce}$$
and $i_c = h_{fe}i_b + h_{oe}v_{ce}$. The four coefficients are the h-parameters, and each is defined by measuring one port while the other is AC-short-circuited or AC-open-circuited: $h_{ie} = v_{be}/i_b$ with the output shorted (input resistance, in ohms), $h_{re} = v_{be}/v_{ce}$ with the input open (reverse voltage feedback, dimensionless), $h_{fe} = i_c/i_b$ with the output shorted (forward current gain, dimensionless), and $h_{oe} = i_c/v_{ce}$ with the input open (output admittance, in siemens). The name hybrid is exactly this mix of units. The equivalent circuit is read straight off the equations: $h_{ie}$ in series in the base loop, a controlled source $h_{re}v_{ce}$ in that same loop, a current source $h_{fe}i_b$ in parallel with $h_{oe}$ at the output. For a CE stage typical values are $h_{ie} \approx 1\ \mathrm{k\Omega}$, $h_{fe} \approx 100$, $h_{oe} \approx 25\ \mu\mathrm{S}$ and $h_{re} \approx 2.5\times10^{-4}$ — note that $h_{oe}$ corresponds to an output resistance $1/h_{oe} = 40\ \mathrm{k\Omega}$, large but not infinite.

**What the external load does to the current source.** The current source $h_{fe}i_b$ feeds the parallel combination of $h_{oe}$ and the AC collector load. That load is $R_L = R_C \parallel R_L'$ — the collector resistor in parallel with whatever is coupled in — and because $i_c$ is the current INTO the collector, the signal voltage is $v_{ce} = -i_c R_L$. Substituting that constraint into the output equation gives $i_c = h_{fe}i_b + h_{oe}(-i_cR_L)$, hence $A_i = i_c/i_b = h_{fe}/(1+h_{oe}R_L)$. The $h_{oe}R_L$ term is the fraction of the copied current that is stolen by the output conductance instead of reaching the load: with $h_{oe} = 25\ \mu\mathrm{S}$ and $R_L = 1.5\ \mathrm{k\Omega}$ it is only 0.037, so $A_i$ is 3.6 % below $h_{fe}$. The same constraint applied to the input equation gives the exact input impedance:
$$Z_i = (h_{ie}+\Delta h\,R_L)/(1+h_{oe}R_L)$$
and the exact voltage gain follows as $A_v = -h_{fe}R_L/(h_{ie}+\Delta h\,R_L)$, where $\Delta h = h_{ie}h_{oe} - h_{fe}h_{re}$ is the determinant of the h matrix. Note the consistency check that always holds: $A_v = -A_iR_L/Z_i$.

**The sign convention behind the input impedance.** Expanding the closed form gives $Z_i = h_{ie} - h_{re}A_iR_L$: because $A_v$ is negative for a CE stage (the output is inverted), the feedback voltage $h_{re}v_{ce}$ adds to the base loop in the direction that REDUCES the input impedance — positive feedback through $h_{re}$. Textbooks that define the current gain with the load current rather than the collector current (so $A_i$ itself is negative) write the same result as $Z_i = h_{ie} + h_{re}A_iR_L$; the physics is identical and the sign of the $h_{re}$ term only tracks which direction was called positive. Substituting the typical numbers gives a feedback term of:
$$h_{re}A_iR_L = 2.5\times10^{-4}(96.4)(1499) = 36\ \Omega$$
The exact $Z_i$ is then 964 Ω against $h_{ie} = 1\ \mathrm{k\Omega}$ — a 3.6 % correction that is worth stating but rarely worth computing under exam time pressure.

**Why the approximations are so good, and when they are not.** Setting $h_{re}\approx 0$ and $h_{oe}\approx 0$ gives $A_i \approx h_{fe}$, $Z_i \approx h_{ie}$ and $A_v \approx -h_{fe}R_L/h_{ie}$, which is what almost every exam question wants. Two separate smallness arguments support it:
$$h_{re} = 2.5\times10^{-4}$$
makes the feedback voltage negligible, and $h_{oe}R_L \approx 0.04$ makes the shunting of the current source negligible. There is also a happy cancellation: with the usual CE numbers $h_{ie}h_{oe} = 0.025$ and $h_{fe}h_{re} = 0.025$, so $\Delta h \approx 0$ and the exact voltage gain collapses to the approximate one even though $A_i$ and $Z_i$ each shift by several per cent. The approximation degrades when $R_L$ grows (a 10 kohm AC load with $h_{oe} = 30\ \mu\mathrm{S}$ gives $h_{oe}R_L = 0.3$ and $\Delta hR_L = 60\ \Omega$, worth 5 % of gain) or when the device is a high-$h_{oe}$ type. Finally, h-parameters are specified at a stated $I_C$, $V_{CE}$ and frequency, usually 1 kHz. The current gain tracks beta, and the input resistance is given by the bias current:
$$h_{ie}\approx\beta r_e = \beta(26\ \mathrm{mV})/I_{CQ}$$
both change with bias, and above a few kilohertz they become complex and the hybrid-pi model takes over.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| h-parameter two-port equations (CE) | $v_{be} = h_{ie}i_b + h_{re}v_{ce},\qquad i_c = h_{fe}i_b + h_{oe}v_{ce}$ | Small-signal, low-frequency, valid only near the quiescent point. i_b and i_c both flow into the device, so a load resistor forces v_ce = -i_c R_L. |
| h-parameter definitions | $h_{ie} = \frac{v_{be}}{i_b}\Big\lvert _{v_{ce}=0},\quad h_{re} = \frac{v_{be}}{v_{ce}}\Big \rvert_{i_b=0},\quad h_{fe} = \frac{i_c}{i_b}\Big\lvert _{v_{ce}=0},\quad h_{oe} = \frac{i_c}{v_{ce}}\Big \rvert_{i_b=0}$ | Units: ohm, dimensionless, dimensionless, siemens. The mixed units are why these are called hybrid parameters. |
| Exact current gain | $A_i = \frac{i_c}{i_b} = \frac{h_{fe}}{1+h_{oe}R_L}$ | R_L here is the AC collector load R_C \|\| R_L, not the physical load resistor. 1/h_oe is the device output resistance in parallel with it. |
| Exact input impedance | $Z_i = \frac{h_{ie}+\Delta h\,R_L}{1+h_{oe}R_L} = h_{ie}-h_{re}A_iR_L$ | Delta h = h_ie h_oe - h_fe h_re. The feedback term lowers Z_i for the inverting CE stage; with the opposite current-direction convention the last term is written +h_re A_i R_L. |
| Exact voltage gain | $A_v = \frac{-h_{fe}R_L}{h_{ie}+\Delta h\,R_L} = -\frac{A_iR_L}{Z_i}$ | The minus sign is the CE phase inversion. Both forms are identical; the second is the quickest consistency check on a worked answer. |
| Small-signal approximations | $h_{re}\approx0,\ h_{oe}\approx0:\quad A_i\approx h_{fe},\quad Z_i\approx h_{ie},\quad A_v\approx-\frac{h_{fe}R_L}{h_{ie}}$ | Valid when h_oe R_L is much less than 1 (0.037 for R_L = 1.5 kohm and h_oe = 25 uS) and when Delta h R_L is negligible against h_ie. |
| Link to the r_e model | $h_{fe}\approx\beta,\qquad h_{ie}\approx\beta r_e = \frac{\beta V_T}{I_{CQ}}$ | V_T = 26 mV at room temperature. h_ie scales as 1/I_CQ, so a data-sheet value of 1 kohm is only correct at its stated bias current. |
| Unbypassed emitter resistor | $Z_i = h_{ie}+(1+h_{fe})R_E,\qquad A_v = -\frac{h_{fe}R_L}{h_{ie}+(1+h_{fe})R_E}$ | Emitter degeneration: R_E carries the emitter current, so it enters multiplied by (1+h_fe). Assumes h_re = h_oe = 0. |

## Worked Problems

### P1. A CE stage uses a transistor with $h_{ie} = 1\ \mathrm{k\Omega}$, $h_{fe} = 100$, $h_{oe} = 25\ \mu\mathrm{S}$ and $h_{re} = 2.5\times10^{-4}$, with $R_C = 2.2\ \mathrm{k\Omega}$ and a coupled load $R_L = 4.7\ \mathrm{k\Omega}$. Find the AC load, the current gain, the input impedance and the voltage gain using the usual approximations.

**Given:** h_ie = 1 kohm; h_fe = 100; h_oe = 25 uS; h_re = 2.5e-4; R_C = 2.2 kohm; R_L = 4.7 kohm

**Solution:**

1. $R_L = R_C \parallel R_L' = \dfrac{(2.2)(4.7)}{2.2+4.7} = \dfrac{10.34}{6.9} = 1.499\ \mathrm{k\Omega}$
2. With $h_{oe} = 25\ \mu\mathrm{S}$, $1/h_{oe} = 40\ \mathrm{k\Omega}$, far larger than 1.499 kohm, so the current source is effectively unshunted: $A_i \approx h_{fe} = 100$
3. $A_v = -\dfrac{h_{fe}R_L}{h_{ie}} = -\dfrac{100(1.499\ \mathrm{k\Omega})}{1\ \mathrm{k\Omega}} = -149.9$
4. $Z_i \approx h_{ie} = 1\ \mathrm{k\Omega}$

> [!success]- Answer
> **$R_L = 1.50\ \mathrm{k\Omega}$, $A_i \approx 100$, $Z_i \approx 1\ \mathrm{k\Omega}$, $A_v \approx -150$ (inverting).**

> [!warning] Trap
> Using R_C = 2.2 kohm as the AC collector load. That gives A_v = -220 instead of -150, a 47 % overstatement, because the coupled load sits in parallel with the collector resistor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.2 × 4.7 ÷ (2.2 + 4.7)` → $R_L$ = **1.499** k$\Omega$.
> 2. `25E-6 × 1.499E3` → $h_{oe}R_L$ = **0.0375**, so $A_i \approx h_{fe}$ = **100** and $Z_i \approx h_{ie}$ = **1** k$\Omega$.
> 3. `−100 × 1.499` → $A_v$ = **−149.9** (inverting).

### P2. For the same stage ($h_{ie} = 1\ \mathrm{k\Omega}$, $h_{fe} = 100$, $h_{oe} = 25\ \mu\mathrm{S}$, $h_{re} = 2.5\times10^{-4}$) with an AC collector load of 1.499 kohm, find the EXACT current gain and input impedance, and check the exact voltage gain.

**Given:** h_ie = 1 kohm; h_fe = 100; h_oe = 25 uS; h_re = 2.5e-4; R_L = 1.499 kohm

**Solution:**

1. $h_{oe}R_L = (25\ \mu\mathrm{S})(1.499\ \mathrm{k\Omega}) = 0.0375$
2. $A_i = \dfrac{h_{fe}}{1+h_{oe}R_L} = \dfrac{100}{1.0375} = 96.4$
3. $Z_i = h_{ie} - h_{re}A_iR_L = 1000 - (2.5\times10^{-4})(96.4)(1499) = 1000 - 36.1 = 964\ \Omega$
4. Closed-form check: $\Delta h = h_{ie}h_{oe} - h_{fe}h_{re} = 0.025 - 0.025 = 0$, so $Z_i = \dfrac{1000+0}{1.0375} = 964\ \Omega$
5. $A_v = -\dfrac{A_iR_L}{Z_i} = -\dfrac{(96.4)(1499)}{964} = -149.9$, identical to the approximate value

> [!success]- Answer
> **$A_i = 96.4$ and $Z_i = 964\ \Omega$ (both 3.6 % below the approximations), yet $A_v = -149.9$ is unchanged.**

> [!warning] Trap
> Claiming A_i = h_fe = 100 and Z_i = 1 kohm while calling the answer exact. With h_oe = 25 uS and R_L = 1.5 kohm the current gain is 3.6 % lower and the input resistance 36 ohm lower; note that A_v is unaffected because Delta h = 0.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`: MatA = `1000 2.5E-4 100 25E-6` (that is $h_{ie}$, $h_{re}$ in the first row and $h_{fe}$, $h_{oe}$ in the second); `Apps` `▼` `1` `Det` → $\Delta h$ = **0**.
> 2. `25E-6 × 1.499E3` → **0.0375**, so `100 ÷ 1.0375` → $A_i$ = **96.4**.
> 3. `1000 − 2.5E-4 × 96.4 × 1499` → $Z_i$ = **964** $\Omega$; `−96.4 × 1499 ÷ 964` → $A_v$ = **−149.9**, the same as the approximation.

### P3. A transistor has $h_{ie} = 1.2\ \mathrm{k\Omega}$, $h_{fe} = 120$, $h_{oe} = 30\ \mu\mathrm{S}$ and $h_{re} = 2.5\times10^{-4}$, working into a heavy AC load of $10\ \mathrm{k\Omega}$. Find $\Delta h$, $A_i$, $Z_i$ and the exact voltage gain, and compare with the approximation.

**Given:** h_ie = 1.2 kohm; h_fe = 120; h_oe = 30 uS; h_re = 2.5e-4; R_L = 10 kohm

**Solution:**

1. $\Delta h = h_{ie}h_{oe} - h_{fe}h_{re} = (1200)(30\times10^{-6}) - (120)(2.5\times10^{-4}) = 0.036 - 0.030 = 0.006$
2. $h_{oe}R_L = (30\ \mu\mathrm{S})(10\ \mathrm{k\Omega}) = 0.30$
3. $A_i = \dfrac{h_{fe}}{1+h_{oe}R_L} = \dfrac{120}{1.30} = 92.3$
4. $Z_i = \dfrac{h_{ie}+\Delta hR_L}{1+h_{oe}R_L} = \dfrac{1200 + 0.006(10000)}{1.30} = \dfrac{1260}{1.30} = 969\ \Omega$
5. $A_v = -\dfrac{h_{fe}R_L}{h_{ie}+\Delta hR_L} = -\dfrac{(120)(10000)}{1260} = -952$
6. Approximation: $-h_{fe}R_L/h_{ie} = -(120)(10000)/1200 = -1000$, so the approximation is 5.0 % high at this load

> [!success]- Answer
> **$\Delta h = 0.006$, $A_i = 92.3$, $Z_i = 969\ \Omega$, $A_v = -952$ (approximation $-1000$, 5 % high).**

> [!warning] Trap
> Writing Delta h = h_ie h_oe + h_fe h_re = 0.036 + 0.030 = 0.066. The denominator becomes 1200 + 660 = 1860 and A_v comes out -645, 32 % away from the correct -952; the sign inside the h-parameter determinant matters.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`: MatA = `1200 2.5E-4 120 30E-6`; `Det` → $\Delta h$ = **0.006** — a subtraction, not a sum.
> 2. `30E-6 × 1E4` → $h_{oe}R_L$ = **0.30**; `120 ÷ 1.30` → $A_i$ = **92.3**.
> 3. `(1200 + 0.006 × 1E4) ÷ 1.30` → $Z_i$ = **969** $\Omega$; `−120 × 1E4 ÷ 1260` → $A_v$ = **−952** against the approximation **−1000**, 5 % high.

### P4. A CE stage is biased at $I_{CQ} = 1\ \mathrm{mA}$ with $\beta = 100$ and $R_C = 2.6\ \mathrm{k\Omega}$, unloaded. Find $r_e$, $h_{ie}$, $h_{fe}$ and the voltage gain, then repeat the gain with a $2.6\ \mathrm{k\Omega}$ load coupled in.

**Given:** I_CQ = 1 mA; beta = 100; R_C = 2.6 kohm; V_T = 26 mV; R_L = infinity (unloaded); R_L = 2.6 kohm (part b)

**Solution:**

1. $r_e = \dfrac{V_T}{I_{CQ}} = \dfrac{26\ \mathrm{mV}}{1\ \mathrm{mA}} = 26\ \Omega$
2. $h_{ie} = \beta r_e = 100(26) = 2.6\ \mathrm{k\Omega}$ and $h_{fe} = \beta = 100$
3. Unloaded, $R_L = R_C = 2.6\ \mathrm{k\Omega}$: $A_v = -\dfrac{h_{fe}R_L}{h_{ie}} = -\dfrac{100(2600)}{2600} = -100$; the same answer comes from $A_v = -R_L/r_e = -2600/26$ because beta cancels
4. With $R_L = 2.6\ \mathrm{k\Omega}$ coupled in: $R_L = 2.6 \parallel 2.6 = 1.3\ \mathrm{k\Omega}$
5. $A_v = -\dfrac{1300}{26} = -50$, exactly half the unloaded gain

> [!success]- Answer
> **$r_e = 26\ \Omega$; $h_{ie} = 2.6\ \mathrm{k\Omega}$; $A_v = -100$ unloaded and $-50$ with a 2.6 kohm load.**

> [!warning] Trap
> Using a data-sheet h_ie = 1 kohm for a stage biased at 1 mA. The correct value is beta r_e = 2.6 kohm, so the stale figure predicts A_v = -260 instead of -100. h_ie = 1 kohm is right only near I_CQ = 2.6 mA with beta = 100.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `26E-3 ÷ 1E-3` → $r_e$ = **26** $\Omega$; `× 100` → $h_{ie}$ = **2.6** k$\Omega$, with $h_{fe} = \beta$ = **100**.
> 2. Unloaded: `2600 ÷ 26` → $\lvert A_v \rvert$ = **100**, the same as $R_C/r_e$ because $\beta$ cancels.
> 3. Loaded: `2.6 × 2.6 ÷ 5.2` → $R_L$ = **1.3** k$\Omega$, so `1300 ÷ 26` → $\lvert A_v \rvert$ = **50**, exactly half.

### P5. A CE stage has $h_{ie} = 1\ \mathrm{k\Omega}$, $h_{fe} = 100$, an AC load of $2\ \mathrm{k\Omega}$ and an UNBYPASSED emitter resistor $R_E = 100\ \Omega$. Find the input impedance and the voltage gain, and state what bypassing the emitter resistor would change.

**Given:** h_ie = 1 kohm; h_fe = 100; R_L = 2 kohm; R_E = 100 ohm (unbypassed)

**Solution:**

1. The emitter resistor carries the emitter current $(1+h_{fe})i_b$, so it appears in the input loop as $(1+h_{fe})R_E = 101(100) = 10.1\ \mathrm{k\Omega}$
2. $Z_i = h_{ie} + (1+h_{fe})R_E = 1000 + 10100 = 11.1\ \mathrm{k\Omega}$
3. $A_v = -\dfrac{h_{fe}R_L}{Z_i} = -\dfrac{100(2000)}{11100} = -18.0$
4. If R_E were bypassed the input impedance would be 1 kohm and $A_v = -200$, a factor of 11 larger

> [!success]- Answer
> **$Z_i = 11.1\ \mathrm{k\Omega}$ and $A_v = -18.0$; bypassing $R_E$ would give $Z_i = 1\ \mathrm{k\Omega}$ and $A_v = -200$.**

> [!warning] Trap
> Ignoring the unbypassed emitter resistor, which is the expensive version of this mistake: A_v = -200 instead of -18.0 (11 times too high) and Z_i = 1 kohm instead of 11.1 kohm. Using h_fe R_E = 10 kohm rather than (1+h_fe)R_E = 10.1 kohm is a much smaller 1 % slip.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `101 × 100` → $(1 + h_{fe})R_E$ = **10.1** k$\Omega$; `+ 1000` → $Z_i$ = **11.1** k$\Omega$.
> 2. `−100 × 2000 ÷ 11100` → $A_v$ = **−18.0**.
> 3. Bypassed for comparison: `−100 × 2000 ÷ 1000` → **−200** with $Z_i$ = **1** k$\Omega$, a factor of 11.

## Traps & Exam Notes

- **Using $R_C$ instead of $R_C \parallel R_L$.** With $R_C = 2.2\ \mathrm{k\Omega}$ and $R_L = 4.7\ \mathrm{k\Omega}$ the AC load is 1.50 kohm; using 2.2 kohm gives $A_v = -220$ instead of -150, 47 % high.
- **Sign error in the $\Delta h$ determinant.** $\Delta h = h_{ie}h_{oe} - h_{fe}h_{re}$: with $h_{ie} = 1.2\ \mathrm{k\Omega}$, $h_{oe} = 30\ \mu\mathrm{S}$, $h_{fe} = 120$ and $h_{re} = 2.5\times10^{-4}$ it is 0.006, not 0.066; adding the products makes $A_v = -645$ instead of -952, a 32 % error.
- **Treating $h_{ie}$ as a constant.** $h_{ie}\approx\beta r_e = \beta(26\ \mathrm{mV})/I_{CQ}$, so the data-sheet 1 kohm holds only near $I_{CQ} = 2.6\ \mathrm{mA}$ with $\beta = 100$. At 1 mA the true value is 2.6 kohm and a fixed 1 kohm predicts $A_v = -260$ instead of -100.
- **Reporting a positive $A_v$ for a CE stage.** $A_v = -h_{fe}R_L/h_{ie}$ is inverting: writing 150 instead of -150 flips the phase of every stage in a cascade and reverses the sign of the feedback in an oscillator loop.
- **Forgetting $(1+h_{fe})R_E$ for an unbypassed emitter resistor.** Ignoring $R_E = 100\ \Omega$ gives $A_v = -200$ rather than -18.0 and $Z_i = 1\ \mathrm{k\Omega}$ rather than 11.1 kohm.
- **Assuming $h_{oe}$ is negligible for the output resistance.** $1/h_{oe} = 40\ \mathrm{k\Omega}$ in parallel with $R_C = 2.2\ \mathrm{k\Omega}$ gives $Z_o = 2.09\ \mathrm{k\Omega}$, 5 % below $R_C$; across a three-stage cascade that 5 % compounds with the loading of each following stage.
- **Using the model outside its frequency range.** Data-sheet h-parameters are quoted at a stated $I_C$, $V_{CE}$ and frequency, often 1 kHz. An $h_{fe}$ of 100 at 1 kHz can fall to about 50 by 100 kHz, and $h_{ie}$ becomes complex, so a low-frequency gain calculation is an upper bound.

## See Also

- [[06_Small-Signal_re_Model_CE,_CB,_CC]]
- [[07_Hybrid-Pi_Model]]
- [[11_Frequency_Response_and_Bode_Plots]]
- [[04_Hybrid_and_Inverse_Hybrid_Parameters]]
- [[10_BJT_Current_Gains_and_Relationships]]

---

[[04_FET_Biasing_Configurations|⬅ 04]] · [[_MOC_Circuit_Analysis_and_Design|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Small-Signal_re_Model_CE,_CB,_CC|06 ➡]]
