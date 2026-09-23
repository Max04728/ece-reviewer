---
id: ECE-05-09
title: "Multistage, Cascade and Cascode"
part: "02_Electronics_Engineering"
area: "05_Circuit_Analysis_and_Design"
topic: 9
tier: 2
depth: full
problem_count: 4
prereqs: ["[[05_BJT_Small-Signal_h-Parameter_Model]]", "[[06_Small-Signal_re_Model_CE,_CB,_CC]]"]
tags: ["ece", "electronics_engineering", "circuit_analysis_and_design"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Multistage, Cascade and Cascode

> [!abstract] Scope
> Compute the composite gain of cascaded stages in volts per volt and in decibels, account for interstage loading, and explain why the cascode trades a CB stage for a large reduction in Miller capacitance.

## Core Concept

> [!tip] Intuition
> Stages multiply. But a following stage is not a passive observer: its input resistance sits in parallel with the previous stage's collector or drain resistor and quietly steals gain. The cascode exists to stop one particular thief, the Miller capacitance.

**Gain multiplies because each stage is a voltage-to-voltage block.** If stage 1 turns a 10 mV input into 100 mV and stage 2 turns 100 mV into 2 V, the cascade turns 10 mV into 2 V:
$$A_{v(total)} = A_{v1}A_{v2}\cdots A_{vn}$$
In decibels the multiplication becomes addition. The rule is:
$$20\log_{10}(A_1A_2) = 20\log_{10}A_1 + 20\log_{10}A_2$$
Two stages of 40 dB each give 80 dB, which is $10^4$ in voltage ratio — this is why dB is the working unit for multistage work, and why a 3 dB loss in one stage is worth fighting for while a 3 dB loss in a 60 dB chain is sometimes just accepted.

**The decibel definition and the sign habit.** $A_v(\mathrm{dB}) = 20\log_{10}|A_v|$ for a voltage ratio and $10\log_{10}|A_p|$ for a power ratio; the factor 20 for voltage comes from power being proportional to voltage squared. The useful anchors: a voltage ratio of 10 is 20 dB, 100 is 40 dB, 1000 is 60 dB, 2 is 6.02 dB, and 0.707 is $-3.01$ dB. A common-emitter stage with $|A_v| = 123$ is $41.8$ dB. **The sign is not part of the dB value** — a 41.8 dB inverting stage and a 41.8 dB non-inverting stage have the same magnitude in dB and differ only in phase, so carry the $180^\circ$ separately when a problem asks for phase.

**Interstage loading is the whole difficulty.** When you connect stage 2 to stage 1, stage 2's input resistance $R_{in2}$ appears in parallel with stage 1's collector (or drain) resistor. The fix is mechanical: compute stage 1 first, but replace $R_{C1}$ by $R_{L(eff)1} = R_{C1} \parallel R_{in2}$, and only then apply $A_{v1} = -g_{m1}R_{L(eff)1}$. Stage 2 in turn sees its own load $R_{C2} \parallel R_L$. Working backwards from the load is the reliable order: find the last stage's gain with the real load, then the second-to-last with the last stage's input resistance as its load, and so on. **Never compute the unloaded gain of every stage and multiply** — that is the classic way to overstate a two-stage gain by 6 dB.

**The cascode: why the second stage's low input resistance is a feature, not a bug.** A cascode is a CE (or CS) stage whose collector (drain) feeds the emitter (source) of a CB (or CG) stage, with the CB base held at AC ground. Loading rule from the paragraph above would suggest disaster: the CB input resistance is $\approx 1/g_m$, a few tens of ohms, so the CE stage's collector load is tiny and its voltage gain collapses to about $A_{v1} \approx -g_m(1/g_m) = -1$. But that is exactly what is wanted. The Miller capacitance at the CE input is $C_{bc}(1 + |A_{v1}|)$, so with $|A_{v1}| \approx 1$ it becomes $C_{bc}(1+1) = 2C_{bc}$ instead of $C_{bc}(1 + g_mR_C)$, which at $g_mR_C = 114$ is $115C_{bc}$. The CE stage gives up almost all its gain, the CB stage (whose gain is $+g_mR_C$ and which suffers no Miller multiplication because its input is the low-resistance emitter) supplies it back, and the overall gain is essentially unchanged:
$$A_{v(cascode)} \approx -g_m R_C$$
What you bought is bandwidth, and in an integrated circuit also the elimination of the feedback from output to input that would otherwise cause instability.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Voltage gain in decibels | $A_v(\mathrm{dB}) = 20\log_{10}\lvert A_v \rvert$ | Voltage ratio, not power. A ratio of 10 is 20 dB and a ratio of 2 is 6.02 dB. The sign of the gain is dropped; phase is tracked separately. |
| Cascaded gain in volts per volt | $A_{v(total)} = A_{v1} A_{v2} \cdots A_{vn}$ | Each stage's gain must already include the loading of the next stage. Input and output resistances do not multiply through - the composite input resistance is the first stage's and the composite output resistance the last stage's. |
| Cascaded gain in decibels | $A_{v(total)}(\mathrm{dB}) = A_{v1}(\mathrm{dB}) + A_{v2}(\mathrm{dB}) + \cdots$ | Logarithms turn the product into a sum. A chain of a +40 dB and a -3 dB stage is 37 dB. A 6 dB loss is a factor of 2 in voltage, not a small penalty. |
| Effective load of a stage driving another stage | $R_{L(eff)} = R_{C1} \parallel R_{in2}$ | The interstage loading rule. Using R_C1 alone overstates the first stage gain whenever R_in2 is comparable to R_C1 - at R_C1 = 4.7 kohm and R_in2 = 2.2 kohm the error is 3.4 dB. |
| CE stage driving a CB stage (cascode first stage) | $A_{v1} \approx -g_m\left(\frac{1}{g_m}\right) = -1$ | Because the CB input resistance is about 1/g_m. This near-unity magnitude is deliberate: it is what keeps the Miller multiplication factor at 2. |
| Overall cascode gain | $A_{v(cascode)} \approx -g_m R_C$ | Essentially the same magnitude as a single CE stage with the same collector resistor, but with far less input capacitance. The minus sign survives from the CE input stage. |
| Input capacitance of a cascode | $C_{in} \approx C_\pi + C_{bc}(1 + 1) = C_\pi + 2C_{bc}$ | The '(1+1)' is the Miller factor with \|A_v1\| = 1. Compare with a plain CE stage: C_pi + C_bc(1 + g_m R_C), which at g_m R_C = 114 is 29 times larger. |
| Miller multiplication of the feedback capacitance | $C_{Mi} = C_{bc}(1 + \lvert A_v \rvert)$ | Applies to the stage whose input the capacitance bridges. Its size is why the cascode exists; C_bc is only 1-5 pF but gets multiplied into the hundreds of picofarads. |

## Worked Problems

### P1. Two identical CE stages are cascaded. Each has $g_m = 40\ \mathrm{mS}$ and $R_C = 3\ \mathrm{k\Omega}$; the input resistance of each stage is $R_{in} = 2.7\ \mathrm{k\Omega}$, and the final load is $R_L = 10\ \mathrm{k\Omega}$. Find each stage's loaded gain, the total gain in V/V and in dB.

**Given:** g_m = 40 mS per stage; R_C = 3 kohm per stage; R_in = 2.7 kohm per stage; R_L = 10 kohm; r_o = infinity

**Solution:**

1. Stage 2 sees the external load only: R_L(eff)2 = R_C || R_L = (3)(10)/(13) = 2.308 kohm
2. A_v2 = -g_m R_L(eff)2 = -(40 mS)(2.308 kohm) = -92.3 V/V
3. Stage 1 is loaded by stage 2's input resistance: R_L(eff)1 = R_C || R_in2 = (3)(2.7)/(5.7) = 1.421 kohm
4. A_v1 = -g_m R_L(eff)1 = -(40 mS)(1.421 kohm) = -56.8 V/V
5. A_v(total) = (-56.8)(-92.3) = +5.24E3 V/V, positive because two inversions cancel
6. In dB: 20 log10(56.8) = 35.1 dB and 20 log10(92.3) = 39.3 dB, so total = 35.1 + 39.3 = 74.4 dB, and 20 log10(5240) = 74.4 dB confirms it

> [!success]- Answer
> **A_v1 = -56.8, A_v2 = -92.3, A_v(total) = +5240 V/V = 74.4 dB (overall non-inverting).**

> [!warning] Trap
> Computing both stages with R_C = 3 kohm and multiplying to get -(120)(120) = 14,400 (83.2 dB), which is 8.8 dB too high. Stage 1's collector resistor is shunted by stage 2's 2.7 kohm input resistance; ignoring that is the standard two-stage error.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3 × 10 ÷ 13` → $R_{L(eff)2}$ = **2.308** k$\Omega$; `−40 × 2.308` → $A_{v2}$ = **−92.3**.
> 2. `3 × 2.7 ÷ 5.7` → $R_{L(eff)1}$ = **1.421** k$\Omega$; `−40 × 1.421` → $A_{v1}$ = **−56.8**.
> 3. `56.8 × 92.3` → $A_{v(total)}$ = **5243** V/V, positive because two inversions cancel; `20 log(Ans)` → **74.4** dB.

### P2. For the same two-stage amplifier, the first stage has $R_{C1}=4.7\ \mathrm{k\Omega}$ and drives a second stage with $R_{in2}=2.2\ \mathrm{k\Omega}$ and $A_{v2}=-150$. Find $A_{v1}$, the total gain, and the dB lost to interstage loading alone.

**Given:** R_C1 = 4.7 kohm; R_in2 = 2.2 kohm; A_v2 = -150; g_m1 = 40 mS; r_o = infinity

**Solution:**

1. Loaded value: R_L(eff)1 = R_C1 || R_in2 = (4.7)(2.2)/(6.9) = 1.499 kohm
2. A_v1 = -g_m1 * 1.499 kohm = -(40 mS)(1.499 kohm) = -59.9 V/V
3. A_v(total) = (-59.9)(-150) = +8.99E3 V/V, i.e. 20 log10(8990) = 79.1 dB
4. Unloaded comparison: A_v1(unloaded) = -(40 mS)(4.7 kohm) = -188 V/V, which would give +2.82E4 V/V = 89.0 dB
5. Loading loss = 89.0 - 79.1 = 9.9 dB (voltage ratio 188/59.9 = 3.14, which is 9.9 dB)

> [!success]- Answer
> **A_v1 = -59.9 (loaded) against -188 unloaded; A_v(total) = 8990 V/V = 79.1 dB, so interstage loading costs 9.9 dB.**

> [!warning] Trap
> Treating the second stage as a perfect voltmeter with infinite input resistance. Here R_in2 = 2.2 kohm is less than half of R_C1 = 4.7 kohm, so it destroys 9.9 dB - a factor of 3.1 in voltage. Any answer near 89 dB for this amplifier means the interstage loading was skipped.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4.7 × 2.2 ÷ 6.9` → $R_{L(eff)1}$ = **1.499** k$\Omega$; `−40 × 1.499` → $A_{v1}$ = **−59.9**.
> 2. `59.9 × 150` → $A_{v(total)}$ = **8985**; `20 log(Ans)` → **79.1** dB.
> 3. Unloaded `−40 × 4.7` → **−188**, so `20 log(188 × 150)` → **89.0** dB and the loading costs **9.9** dB.

### P3. A cascode is built from a CE stage ($g_m = 40\ \mathrm{mS}$) driving a CB stage, with $R_C = 3\ \mathrm{k\Omega}$, $C_\pi = 20\ \mathrm{pF}$ and $C_{bc} = 2\ \mathrm{pF}$. Find the CE-stage gain, the input capacitance of the cascode, and compare it with the same transistor used as a plain CE stage.

**Given:** g_m = 40 mS; R_C = 3 kohm; C_pi = 20 pF; C_bc = 2 pF; CB input resistance = 1/g_m

**Solution:**

1. Cascode CE-stage load = 1/g_m = 1/(40 mS) = 25 ohm
2. A_v1 = -g_m(25 ohm) = -(40 mS)(25 ohm) = -1.0 V/V
3. Cascode input capacitance: C_in = C_pi + C_bc(1 + |A_v1|) = 20 pF + 2 pF(2) = 24 pF
4. Plain CE stage: A_v = -g_m R_C = -(40 mS)(3 kohm) = -120 V/V
5. Plain CE input capacitance: C_in = 20 pF + 2 pF(1 + 120) = 20 + 242 = 262 pF
6. Ratio = 262/24 = 10.9, so the cascode input capacitance is about 11 times smaller

> [!success]- Answer
> **Cascode: A_v1 = -1.0, C_in = 24 pF. Plain CE with the same R_C: A_v = -120, C_in = 262 pF, so the cascode reduces input capacitance by 10.9 times.**

> [!warning] Trap
> Applying the full common-emitter gain of -120 to the cascode's first stage and then computing C_bc(1 + 120) = 242 pF. The CB stage's 25 ohm input resistance is precisely what clamps the first-stage gain to -1; missing that turns the cascode's whole advantage into nothing.

### P4. A three-stage amplifier has stage gains of 40 dB, 34 dB and 20 dB, with a 3 dB loss in the interstage network between stages 1 and 2. Find the total gain in dB and as a voltage ratio, and the input voltage needed for a 5 V output.

**Given:** Stage 1 = 40 dB; Stage 2 = 34 dB; Stage 3 = 20 dB; Interstage loss = 3 dB; Required output = 5 V

**Solution:**

1. In dB the stage gains add: 40 + 34 + 20 = 94 dB before loading
2. Subtract the interstage loss: 94 - 3 = 91 dB total
3. Voltage ratio: 91 dB = 20 log10(A), so log10(A) = 4.55 and A = 10^4.55 = 3.55E4 V/V
4. Required input: v_in = 5 V / 3.55E4 = 141 uV
5. Cross-check by parts: 40 dB = 100, 34 dB = 50.1, 20 dB = 10, and 3 dB loss = 0.708, so A = 100*50.1*10*0.708 = 3.55E4

> [!success]- Answer
> **Total = 91 dB = 3.55E4 V/V, requiring v_in = 141 uV for a 5 V output.**

> [!warning] Trap
> Adding the 3 dB loss as +3 dB because the stage gains are positive numbers. A loss always subtracts. The related error is treating 91 dB as 10^9.1; the voltage ratio is 10^(91/20) = 10^4.55, and mixing up the factor of 20 and 10 gives an answer wrong by a factor of about 10^4.5.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `40 + 34 + 20 − 3` → **91** dB total; a loss always subtracts.
> 2. `10^(91 ÷ 20)` → $A$ = **3.548e4** V/V (voltage ratio, so the divisor is 20, not 10).
> 3. `5 ÷ 3.548E4` → $v_{in}$ = **141** $\mu$V for a 5 V output.

## Traps & Exam Notes

- **Multiplying unloaded stage gains.** With $R_{C1} = 3\ \mathrm{k\Omega}$ and a second stage whose $R_{in} = 2.7\ \mathrm{k\Omega}$, the first stage's real load is $1.42\ \mathrm{k\Omega}$, so its gain falls from $-120$ to $-56.8$ (a $6.5\ \mathrm{dB}$ loss). The composite answer from unloaded gains is overstated by roughly 6 to 10 dB in a typical two-stage design.
- **Using $10\log_{10}$ for a voltage ratio.** $A_v(\mathrm{dB}) = 20\log_{10}|A_v|$. A voltage gain of 100 is 40 dB, not 20 dB. Doubling the wrong factor halves every answer in a multistage sum.
- **Reporting the cascode as a high-gain stage.** The cascode's $A_v \approx -g_mR_C$ is only equal to a single CE stage's gain. Its advantage is a 10 to 30 times smaller input capacitance (24 pF against 262 pF in the worked example), not extra gain. Claiming a cascode doubles the gain is a fail.
- **Forgetting that two CE stages cancel their inversion.** Two inverting stages give a positive overall gain; the answer to a two-stage CE problem that keeps the minus sign is wrong on sign even when the magnitude is right. Three CE stages invert again - the overall sign is $(-1)^n$ for $n$ inverting stages.
- **Computing capacitance at the wrong node.** $C_{bc}(1+|A_v|)$ is the capacitance seen *looking into the input* of the stage whose output is loaded. Applying the Miller factor at the output node, or applying it to $C_\pi$, misplaces a 200 pF capacitor and gives a $f_H$ that is wrong by more than a decade.

## See Also

- [[07_Hybrid-Pi_Model]]
- [[08_FET_Amplifiers_CS,_CD,_CG]]
- [[12_Miller’s_Theorem_and_High-Frequency_Effects]]
- [[13_Gain-Bandwidth_Product_and_fT]]

---

[[08_FET_Amplifiers_CS,_CD,_CG|⬅ 08]] · [[_MOC_Circuit_Analysis_and_Design|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Darlington_and_Feedback_Pairs|10 ➡]]
