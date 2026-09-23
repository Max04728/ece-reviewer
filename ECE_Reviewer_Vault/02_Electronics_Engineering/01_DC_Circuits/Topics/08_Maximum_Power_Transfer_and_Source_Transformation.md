---
id: ECE-01-08
title: "Maximum Power Transfer and Source Transformation"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 8
tier: 2
depth: full
problem_count: 4
prereqs: ["[[07_Thevenin_and_Norton_Equivalents]]", "[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Maximum Power Transfer and Source Transformation

> [!abstract] Scope
> Swap a source-plus-resistance branch for its terminal equivalent, and choose the load that extracts the largest possible power from a fixed resistive network.

## Core Concept

> [!tip] Intuition
> A source transformation is a change of costume: a voltage source in series with a resistor and a current source in parallel with that same resistor look identical from the outside, so you swap whichever one the algebra likes better. Maximum power transfer is the matching idea that follows from it — the load and the Thevenin resistance form a voltage divider, and the power peaks exactly when that divider splits the source voltage in half.

**Source transformation is terminal equivalence, nothing more.** Measure the open-circuit voltage $v_{oc}$ and the short-circuit current $i_{sc}$ at a port of a voltage source $V_s$ in series with $R_s$: you get $v_{oc} = V_s$ and $i_{sc} = V_s/R_s$. The current source $I_s = V_s/R_s$ in parallel with the same $R_s$ produces the identical pair. Since a one-port is completely described by that pair, the two subcircuits are interchangeable for anything connected downstream. The direction rule follows from the measurement: the arrow of $I_s$ points toward the node that the $+$ terminal of $V_s$ was connected to. The transformation is reversible, so $V_s = I_s R_p$ with $R_p$ moved from parallel to series.

**What a transformation does not preserve is internal power.** The equivalent reproduces the port voltage and the port current, so it is safe for finding load current, load voltage and load power. It is *not* safe for finding the power dissipated in the original source resistance or the actual source current. An extreme example makes the point: a $24\ \mathrm{V}$ source in series with $12\ \Omega$ shunted by $24\ \Omega$ has $V_{Th} = 16\ \mathrm{V}$ and $R_{Th} = 8\ \Omega$, but the Thevenin source is not the real source, and $8\ \mathrm{W}$ burned inside $R_{Th}$ bears no relation to the $24\ \mathrm{W}$ actually burned in the two real resistors. Equivalent-circuit power accounting applies only to the equivalent circuit.

**Maximum power transfer.** Substituting $R_L = R_{Th}$ into $P_L = R_L V_{Th}^2/(R_{Th}+R_L)^2$ gives $P_{max} = V_{Th}^2/(4R_{Th})$; equivalently, differentiate $P_L$ with respect to $R_L$ and set the numerator to zero. The matched condition is the geometric statement that the two halves of the divider are equal, so $v_L = V_{Th}/2$ and $i_L = V_{Th}/(2R_{Th})$. Two cautions that decide exam answers. First, the $4$ in the denominator is unavoidable — the load only sees half the source voltage, and the other half is lost in $R_{Th}$, so the transfer efficiency is exactly $50\%$ at the matched point. Matched is thus the right target for signal and RF work, where the available power matters, and the wrong target for power systems, where efficiency matters. Second, $R_{Th}$ here is the resistance *looking back* from the load terminals; it includes every resistor the load is connected across, so a shunt resistor at the port is part of $R_{Th}$, not an external loss.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Voltage source to current source | $I_s = \frac{V_s}{R_s}$ | The resistance keeps its value and moves from series to parallel. Valid only when R_s is genuinely in series with the source. |
| Current source to voltage source | $V_s = I_s R_p$ | R_p moves from parallel to series. An ideal source with no series/parallel resistance cannot be transformed. |
| Load power from a Thevenin equivalent | $P_L = \left(\frac{V_{Th}}{R_{Th}+R_L}\right)^{2} R_L$ | V_Th and R_Th fixed; valid for any R_L >= 0 and gives zero at both R_L = 0 and R_L -> infinity. |
| Maximum power transfer condition | $R_L = R_{Th}$ | Purely resistive Thevenin equivalents only. With reactance present the load must be the complex conjugate of Z_Th. |
| Maximum power | $P_{max} = \frac{V_{Th}^{2}}{4R_{Th}}$ | The 4 comes from the matched divider v_L = V_Th/2. Writing V_Th^2/R_Th is the classic wrong answer and is four times too large. |
| Load current at the matched point | $i_L = \frac{V_{Th}}{2R_{Th}}$ | Substitute R_L = R_Th into the divider; useful as a fast sanity check on P_max. |
| Transfer efficiency | $\eta = \frac{R_L}{R_{Th}+R_L}$ | At the matched point eta = 1/2, so half the power leaves the Thevenin source as heat. Efficiency is a property of the equivalent, not of the original network. |
| Terminal voltage | $V_L = \frac{R_L}{R_{Th}+R_L}\,V_{Th}$ | At match V_L = V_Th/2; as R_L grows the port approaches the open-circuit voltage. |

## Worked Problems

### P1. Two branches connect node $A$ to a common ground rail. Branch 1 is a $24\ \mathrm{V}$ source in series with $8\ \Omega$. Branch 2 is a $12\ \mathrm{V}$ source in series with $4\ \Omega$. Both sources are oriented with their $+$ terminal toward node $A$. Use source transformation to find the Norton equivalent seen at $A$, then state whether the $12\ \mathrm{V}$ source delivers or absorbs power.

**Given:** Vs1 = 24 V, R1 = 8 Ω (series branch 1); Vs2 = 12 V, R2 = 4 Ω (series branch 2); Both sources have + terminals toward node A

**Solution:**

1. Transform branch 1: I_s1 = 24/8 = 3 A, in parallel with 8 Ω, arrow pointing into node A.
2. Transform branch 2: I_s2 = 12/4 = 3 A, in parallel with 4 Ω, arrow pointing into node A as well.
3. The two resistances are now both across the same pair of nodes, so they combine in parallel: R_N = 8 || 4 = (8 x 4)/(8 + 4) = 32/12 = 8/3 Ω, about 2.67 Ω.
4. The two current sources are also in parallel and point the same way, so they add: I_N = 3 + 3 = 6 A.
5. Norton equivalent: 6 A in parallel with 8/3 Ω, giving V_A = I_N R_N = 6 x 8/3 = 16 V.
6. Check with KCL at A: (24 - 16)/8 + (12 - 16)/4 = 1 - 1 = 0, as required.
7. Branch 1 carries (24 - 16)/8 = 1 A away from the + terminal of the 24 V source, so that source delivers 24 x 1 = 24 W. Branch 2 carries (12 - 16)/4 = -1 A, meaning 1 A is forced into its + terminal, so the 12 V source absorbs 12 x 1 = 12 W.
8. Power balance on the real circuit: delivered 24 W = absorbed 12 W by the 12 V source + 1^2 x 8 = 8 W in the 8 Ω + 1^2 x 4 = 4 W in the 4 Ω.

> [!success]- Answer
> **$I_N = 6\ \mathrm{A}$ in parallel with $R_N = \frac{8}{3}\ \Omega \approx 2.67\ \Omega$, so $V_A = 16\ \mathrm{V}$; the $12\ \mathrm{V}$ source absorbs $12\ \mathrm{W}$ while the $24\ \mathrm{V}$ source delivers $24\ \mathrm{W}$.**

> [!warning] Trap
> Assuming a source with a positive value must deliver power. Two unequal voltage sources in parallel force current backwards through the weaker one: here (12 - 16)/4 = -1 A sends 1 A into the 12 V source's positive terminal, so it absorbs 12 W. Reading it as a 12 W delivery makes the balance read 36 W against 12 W.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Transform both branches, one line with `ALPHA` `:` — `24÷8 : 12÷4 : Ans+Ans : 8×4÷(8+4)`
> 2. $I_{s1}$ = **3** A, $I_{s2}$ = **3** A → $I_N$ = **6** A → $R_N$ = **2.667** Ω, so `6×Ans` gives $V_A$ = **16** V.
> 3. Power verdict: `(24−16)÷8` = **1** A out of the 24 V source (delivers 24 W) and `(12−16)÷4` = **−1** A into the 12 V source (absorbs **12** W).

### P2. A $24\ \mathrm{V}$ source in series with $12\ \Omega$ drives a $24\ \Omega$ shunt resistor, and a load $R_L$ is connected directly across that $24\ \Omega$ resistor. Choose $R_L$ for maximum power transfer, compute the maximum power, and state what fraction of the power produced by the real $24\ \mathrm{V}$ source reaches the load.

**Given:** Vs = 24 V, Rs = 12 Ω; Shunt resistor across the port = 24 Ω; Load RL connected across the 24 Ω resistor

**Solution:**

1. Open the load and find the port voltage: the 12 Ω and 24 Ω form a divider across 24 V, so V_Th = 24 x 24/(12 + 24) = 24 x 24/36 = 16 V.
2. Kill the source (replace it with a short) and look back into the port: R_Th = 12 || 24 = (12 x 24)/36 = 8 Ω.
3. Maximum power transfer requires R_L = R_Th = 8 Ω.
4. P_max = V_Th^2/(4 R_Th) = 256/(4 x 8) = 256/32 = 8 W.
5. Verify directly at the matched point: i_L = 16/(8 + 8) = 1 A, so P_L = 1^2 x 8 = 8 W.
6. Now check the real source. At match, R_L in parallel with the 24 Ω shunt gives 8 || 24 = 6 Ω, so the source current is 24/(12 + 6) = 4/3 A and the source produces 24 x 4/3 = 32 W.
7. Load fraction = 8/32 = 25%. The rest goes to the 12 Ω resistor (256/12 = 21.33 W) and the 24 Ω shunt (64/24 = 2.67 W), which sum with the load to 32 W.

> [!success]- Answer
> **$R_L = 8\ \Omega$, giving $P_{max} = 8\ \mathrm{W}$; the real $24\ \mathrm{V}$ source produces $32\ \mathrm{W}$, so only $25\%$ of it reaches the load even though the Thevenin equivalent runs at $50\%$.**

> [!warning] Trap
> Reporting $50\%$ efficiency at the source. The $50\%$ figure belongs to the Thevenin equivalent, where half of $V_{Th}$'s output is burned in $R_{Th}$; it says nothing about the real circuit, whose extra series and shunt resistances drop the source-to-load efficiency to $25\%$. The underlying reason is that an equivalent preserves terminal $v$ and $i$, never internal power.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `24×24÷(12+24) : 12×24÷(12+24) : Ans²÷(4×Ans)`
> 2. $V_{Th}$ = **16** V → $R_{Th}$ = **8** Ω → $P_{max}$ = **8** W at $R_L$ = $R_{Th}$ = **8** Ω.
> 3. Source budget: `8×24÷(8+24)` = **6** Ω, `24÷(12+6)` = **1.333** A, `24×Ans` = **32** W produced, so the load fraction is `8÷32` = **25** %.
>
> The Thévenin equivalent runs at 50 % only when the real source has no other loss path; here the shunt burns the rest.

### P3. A $6\ \mathrm{A}$ current source sits in parallel with a $10\ \Omega$ resistor. From the top of that parallel pair, a second $10\ \Omega$ resistor runs to terminal $a$; terminal $b$ is the common bottom node. Find the load $R_L$ between $a$ and $b$ that receives maximum power, and compute that maximum power.

**Given:** Is = 6 A in parallel with Rp = 10 Ω; Series resistor from the pair to terminal a = 10 Ω; Load connected between a and b

**Solution:**

1. Source transformation: 6 A in parallel with 10 Ω becomes 60 V in series with 10 Ω.
2. That 10 Ω is now in series with the 10 Ω already leading to terminal a, so V_Th = 60 V and R_Th = 10 + 10 = 20 Ω.
3. Independent check of V_Th: with a-b open, no current flows in the series 10 Ω, so the whole 6 A passes through the 10 Ω shunt and V_ab = 6 x 10 = 60 V.
4. Maximum power transfer: R_L = R_Th = 20 Ω.
5. P_max = V_Th^2/(4 R_Th) = 3600/80 = 45 W.
6. Verify directly: at match i_L = 60/(20 + 20) = 1.5 A, and P_L = 1.5^2 x 20 = 2.25 x 20 = 45 W.

> [!success]- Answer
> **$R_L = 20\ \Omega$ and $P_{max} = 45\ \mathrm{W}$.**

> [!warning] Trap
> Leaving the series $10\ \Omega$ out of $R_{Th}$. Once the current source is converted, that resistor is genuinely in series with the source resistance, so $R_{Th} = 20\ \Omega$; using $10\ \Omega$ gives the wrong load and an inflated $P_{max} = 3600/40 = 90\ \mathrm{W}$, exactly double.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Source transform, one line with `ALPHA` `:` — `6×10 : 10+10 : Ans²÷(4×Ans)`
> 2. $V_{Th}$ = **60** V → $R_{Th}$ = **20** Ω → $P_{max}$ = **45** W with $R_L$ = $R_{Th}$ = **20** Ω.
> 3. Direct check at the match point: `60÷(20+20)` = **1.5** A and `1.5²×20` = **45** W.

### P4. A $24\ \mathrm{V}$ source in series with $2\ \Omega$ feeds node $A$. A $6\ \Omega$ resistor and a $2\ \mathrm{A}$ current source that carries current from $A$ to ground both connect $A$ to ground. Use a source transformation to find $V_A$, then verify the result with a complete power balance.

**Given:** Vs = 24 V, Rs = 2 Ω; R2 = 6 Ω from A to ground; Is = 2 A from A to ground

**Solution:**

1. Transform the source branch: 24 V in series with 2 Ω becomes 12 A in parallel with 2 Ω, arrow into node A.
2. The 2 A source draws current out of A, so the net current injected at A is 12 - 2 = 10 A.
3. The resistances now both sit across A and ground: R_eq = 2 || 6 = (2 x 6)/8 = 1.5 Ω.
4. V_A = 10 x 1.5 = 15 V.
5. Branch currents at V_A = 15 V: through the 2 Ω, (24 - 15)/2 = 4.5 A out of the source; through the 6 Ω, 15/6 = 2.5 A; the current source removes 2 A. KCL: 4.5 = 2.5 + 2.
6. Power delivered: 24 V x 4.5 A = 108 W.
7. Power absorbed: 4.5^2 x 2 = 40.5 W in the 2 Ω, 2.5^2 x 6 = 37.5 W in the 6 Ω, and 15 V x 2 A = 30 W in the current source, since its current leaves node A at +15 V and therefore enters the source's positive terminal.
8. Total absorbed = 40.5 + 37.5 + 30 = 108 W, matching the 108 W delivered.

> [!success]- Answer
> **$V_A = 15\ \mathrm{V}$; delivered $= 108\ \mathrm{W}$ equals absorbed $= 40.5 + 37.5 + 30 = 108\ \mathrm{W}$, so $\sum P = 0$.**

> [!warning] Trap
> Booking the $2\ \mathrm{A}$ source as a producer. Its current leaves node $A$, which sits at $+15\ \mathrm{V}$, so the current flows into the source's positive terminal and the source absorbs $30\ \mathrm{W}$ (it is being driven). Listing it as a delivery makes the balance read $138\ \mathrm{W}$ against $78\ \mathrm{W}$ and sends you hunting for an arithmetic error that does not exist.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Transform and combine, one line with `ALPHA` `:` — `24÷2 : Ans−2 : 2×6÷(2+6) : Ans×Ans`
> 2. **12** A into node A − 2 A out = **10** A → $R_{eq}$ = **1.5** Ω → $V_A$ = **15** V.
> 3. Power audit: `(24−15)÷2` = **4.5** A, `15÷6` = **2.5** A, so `4.5²×2` + `2.5²×6` + `15×2` = **108** W absorbed = `24×4.5` delivered.

## Traps & Exam Notes

- Using $P = V_{Th}^2/R_{Th}$ instead of $P_{max} = V_{Th}^2/(4R_{Th})$. The matched load only sees $V_{Th}/2$, so the factor of 4 is structural; forgetting it makes the answer four times too large and is the single most common error on this topic.
- Expecting a source transformation or a Thevenin/Norton equivalent to preserve internal power. A $24\ \mathrm{V}$ source with $12\ \Omega$ and a $24\ \Omega$ shunt has a Thevenin equivalent that burns $8\ \mathrm{W}$ internally, while the real resistors burn $24\ \mathrm{W}$; only the port voltage and port current are equal.
- Treating maximum power transfer as maximum efficiency. At $R_L = R_{Th}$ the efficiency is exactly $50\%$ and never better, and if other resistors remain outside $R_{Th}$, the efficiency measured at the real source is lower still. Matched loads belong in signal and RF design, not in power delivery.
- Reversing the arrow of the transformed current source. The arrow must point toward the node the $+$ terminal of the original voltage source faced; flipping it silently flips the sign of every downstream current, and the error survives every later KCL check only if all branches were flipped together.

## See Also

- [[07_Thevenin_and_Norton_Equivalents]]
- [[02_KCL,_KVL,_Series_and_Parallel_Reduction]]
- [[09_Millman’s_and_Tellegen_Theorems]]
- [[04_AC_Thevenin,_Norton_and_Max_Power]]

---

[[07_Thevenin_and_Norton_Equivalents|⬅ 07]] · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Millman’s_and_Tellegen_Theorems|09 ➡]]
