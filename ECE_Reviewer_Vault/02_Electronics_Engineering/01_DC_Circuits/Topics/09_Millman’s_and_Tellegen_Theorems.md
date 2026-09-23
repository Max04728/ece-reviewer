---
id: ECE-01-09
title: "Millman’s and Tellegen Theorems"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 9
tier: 2
depth: full
problem_count: 4
prereqs: ["[[05_Nodal_Analysis_and_Supernodes]]", "[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Millman’s and Tellegen Theorems

> [!abstract] Scope
> Evaluate the voltage at one node fed by several source branches in a single line, and audit a finished solution by checking that the total power balances to zero.

## Core Concept

> [!tip] Intuition
> Millman's theorem is a weighted average in disguise: every branch pulls the node toward its own source voltage with a strength equal to its conductance $G_k = 1/R_k$, and the node settles where those pulls cancel. Tellegen's theorem is the accounting rule behind every check — if the voltages and currents really solve the network, everything produced is consumed.

**Millman's theorem is KCL at a single node, pre-solved for the voltage.** Suppose $n$ branches each consist of a voltage source $V_k$ in series with a resistance $R_k$, and all $n$ branches are connected between the same node $A$ and the same reference rail. Writing KCL at $A$ with each branch current expressed as $(V_k - V_A)/R_k$ and solving for $V_A$ yields $V_A = \sum V_k G_k / \sum G_k$. The numerator is a sum of *currents* (volts times siemens) and the denominator a sum of conductances, so the quotient is a voltage, and it must lie between the smallest and largest source voltage once polarity signs are respected. That bracketing property is a free check: any Millman answer outside the range of the source voltages is wrong.

**Signs and stragglers are where the marks are lost.** A branch whose source is reversed enters the numerator as $-V_k G_k$ while keeping $G_k$ positive — reversal changes the sign of the source, never the sign of the resistance. Any branch that contains a current source contributes its current $I_j$ directly to the numerator, positive when injected into the node, plus its parallel conductance to the denominator. Any bare resistor from the node to the reference contributes $G_k$ to the denominator with no numerator term at all; omitting it is the most common arithmetic slip. Millman does not extend to a network with more than one unknown node, nor to branches that do not share the same two endpoints — those need the full nodal matrix. It also assumes each voltage source has its resistance truly in series, so a source already in parallel with its resistor must be converted first.

**Tellegen's theorem is the power audit.** For any network, summing $v_k i_k$ over every element with the passive sign convention (current entering the terminal taken as positive) gives exactly zero: $\sum_k v_k i_k = 0$. The result follows from KVL and KCL alone, so it holds for linear and nonlinear, time-invariant and time-varying networks alike, and it is what justifies writing $\sum P_{delivered} = \sum P_{absorbed}$. In practice you compute the node voltages, derive each branch current, then verify that sources signed as producers exactly cover resistors signed as consumers. The theorem is *necessary but not sufficient*: because it follows from KVL and KCL only, a set of node voltages that satisfies KVL and branch currents that satisfy KCL will pass the balance even if some element violates Ohm's law — a wrong solution can survive the audit. A *failed* balance therefore proves an error, but a passing balance must still be backed by checking $v = iR$ on every resistor.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Millman's theorem (voltage-source branches) | $V_A = \frac{\sum_k V_k G_k}{\sum_k G_k}$ | All branches must connect the same node A to the same reference; G_k = 1/R_k is the resistance in series with the k-th source. |
| Two-branch closed form | $V_A = \frac{V_1 R_2 + V_2 R_1}{R_1 + R_2}$ | The two-branch rearrangement of Millman. V's carry their polarity signs; R's stay positive. |
| Conductance | $G_k = \frac{1}{R_k}$ | Units siemens. Convert every branch to conductance before summing so that the numerator and denominator are dimensionally consistent. |
| Generalised Millman with current sources | $V_A = \frac{\sum_k V_k G_k + \sum_j I_j}{\sum_k G_k}$ | I_j counts positive when injected into the node. A bare resistor appears only in the denominator. |
| Tellegen's theorem | $\sum_k v_k i_k = 0$ | Summed over every element, with v_k and i_k in the passive sign convention (current entering the + terminal). |
| Tellegen in power form | $\sum P_{delivered} = \sum P_{absorbed}$ | The same statement after moving source terms to the other side; a source delivering power contributes a negative v i. |
| Resistor power | $P_R = I^{2} R = \frac{V^{2}}{R}$ | Always positive. A resistor can never deliver power, so a negative resistor term in an audit always means a sign or arithmetic error. |
| Source power | $P_S = v_S i_S$ | With the passive convention, positive means the source is absorbing (being charged) and negative means it is delivering. |

## Worked Problems

### P1. Two branches are connected across the same pair of terminals. Branch 1 is a $12\ \mathrm{V}$ source in series with $4\ \Omega$; branch 2 is a $6\ \mathrm{V}$ source in series with $2\ \Omega$. Both sources are oriented with their $+$ terminals toward the upper node. Find the voltage across the pair, and state the power absorbed or delivered by each source.

**Given:** V1 = 12 V, R1 = 4 Ω; V2 = 6 V, R2 = 2 Ω; Both + terminals toward the upper node

**Solution:**

1. Write both branches as conductances: G1 = 1/4 = 0.25 S, G2 = 1/2 = 0.5 S.
2. Numerator: V1 G1 + V2 G2 = 12(0.25) + 6(0.5) = 3 + 3 = 6 A.
3. Denominator: G1 + G2 = 0.25 + 0.5 = 0.75 S.
4. V = 6/0.75 = 8 V. Cross-check with the two-branch form: (12 x 2 + 6 x 4)/(4 + 2) = (24 + 24)/6 = 48/6 = 8 V.
5. Branch currents into the upper node: I1 = (12 - 8)/4 = 1 A and I2 = (6 - 8)/2 = -1 A, i.e. 1 A in from the 12 V branch and 1 A out through the 6 V branch. KCL at the node: 1 - 1 = 0.
6. The 12 V source pushes 1 A out of its + terminal, so it delivers 12 x 1 = 12 W. The 6 V source has 1 A forced into its + terminal, so it absorbs 6 x 1 = 6 W.
7. Balance: delivered 12 W equals absorbed 6 W in the 6 V source + 1^2 x 4 = 4 W in R1 + 1^2 x 2 = 2 W in R2.

> [!success]- Answer
> **$V = 8\ \mathrm{V}$; the $12\ \mathrm{V}$ source delivers $12\ \mathrm{W}$ and the $6\ \mathrm{V}$ source absorbs $6\ \mathrm{W}$.**

> [!warning] Trap
> Sign errors of two kinds. Writing the numerator as $|12 - 6|$ in some combination assumes both sources drive the same way, but here both are positive so the terms *add* to $6\ \mathrm{A}$, not subtract. Conversely, if the $6\ \mathrm{V}$ source were reversed its term would become $-6(0.5) = -3\ \mathrm{A}$ while $G_2$ stays positive; making the conductance negative instead is the classic Millman mistake.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Millman is one chain: `(12÷4+6÷2)÷(1÷4+1÷2)` → $V$ = **8** V.
> 2. Branch currents out of the node: `(8−12)÷4` = **−1** A and `(8−6)÷2` = **1** A, which sum to **0** A.
> 3. Source verdict: the 12 V source delivers 12×1 = **12** W while the 6 V source absorbs 6×1 = **6** W, the balance closing with 1²×4 + 1²×2 = **6** W.

### P2. Three branches share a common upper node $A$ and a common ground rail. Branch 1: $12\ \mathrm{V}$ in series with $4\ \Omega$, $+$ up. Branch 2: $6\ \mathrm{V}$ in series with $6\ \Omega$, polarity reversed so its $+$ terminal faces the ground rail. Branch 3: $12\ \mathrm{V}$ in series with $12\ \Omega$, $+$ up. Find $V_A$ and every branch current defined as flowing out of $A$ through its branch.

**Given:** Branch 1: 12 V, 4 Ω, + up; Branch 2: 6 V, 6 Ω, reversed (+ toward ground); Branch 3: 12 V, 12 Ω, + up

**Solution:**

1. Conductances: G1 = 1/4, G2 = 1/6, G3 = 1/12.
2. Numerator with the reversal carried as a negative source: V1 G1 + V2 G2 + V3 G3 = 12(1/4) + (-6)(1/6) + 12(1/12) = 3 - 1 + 1 = 3 A.
3. Denominator: 1/4 + 1/6 + 1/12 = 3/12 + 2/12 + 1/12 = 6/12 = 0.5 S.
4. V_A = 3/0.5 = 6 V, which lies between -6 V and +12 V, so the bracketing check passes.
5. Branch currents out of A: I1 = (6 - 12)/4 = -1.5 A; for the reversed branch the source reference is -6 V, so I2 = (6 - (-6))/6 = 12/6 = +2 A; I3 = (6 - 12)/12 = -0.5 A.
6. KCL check: -1.5 + 2 - 0.5 = 0 A.
7. Interpretation: branch 1 delivers 1.5 A into node A, branch 2 draws 2 A out of node A, and branch 3 delivers 0.5 A into node A.

> [!success]- Answer
> **$V_A = 6\ \mathrm{V}$; the branch currents out of $A$ are $-1.5\ \mathrm{A}$, $+2\ \mathrm{A}$ and $-0.5\ \mathrm{A}$, summing to zero.**

> [!warning] Trap
> Forgetting the reversal, which gives the numerator $3 + 1 + 1 = 5\ \mathrm{A}$ and $V_A = 5/0.5 = 10\ \mathrm{V}$ — a plausible-looking wrong answer. The reversal changes only the numerator sign of that branch; its conductance stays $+1/6\ \mathrm{S}$, and no conductance is ever negative in a passive network.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Carry the reversed source as −6 V: `(12÷4−6÷6+12÷12)÷(1÷4+1÷6+1÷12)` → numerator **3** A, denominator **0.5** S, $V_A$ = **6** V.
> 2. Branch currents out of A with `ALPHA` `:` — `(6−12)÷4 : (6+6)÷6 : (6−12)÷12` → **−1.5** A, **+2** A, **−0.5** A, summing to **0** A.

### P3. Show that Millman's theorem is nothing more than KCL written at one node, then use it to find $V_A$. Node $A$ connects to ground in three ways: a $30\ \mathrm{V}$ source in series with $6\ \Omega$; a $2.5\ \mathrm{A}$ current source in parallel with $12\ \Omega$, with the current source injecting into $A$; and a bare $6\ \Omega$ resistor.

**Given:** Branch 1: 30 V in series with 6 Ω; Branch 2: 2.5 A injected into A, in parallel with 12 Ω; Branch 3: bare 6 Ω to ground

**Solution:**

1. Direct KCL at A, with every branch current written as (V_source - V_A)/R or as an injected current: (30 - V_A)/6 + 2.5 = V_A/12 + V_A/6.
2. Multiply through by 12: 2(30 - V_A) + 30 = V_A + 2V_A.
3. Expand and collect: 60 - 2V_A + 30 = 3V_A, so 90 = 5V_A and V_A = 18 V.
4. Now read the same equation as Millman. Numerator: V1 G1 + I2 = 30(1/6) + 2.5 = 5 + 2.5 = 7.5 A.
5. Denominator: G1 + G2 + G3 = 1/6 + 1/12 + 1/6 = 2/12 + 1/12 + 2/12 = 5/12 S.
6. V_A = 7.5/(5/12) = 7.5 x 12/5 = 18 V, identical to the KCL result, which is the point: the formula is the KCL equation already solved for the unknown node voltage.
7. Verify the currents: (30 - 18)/6 = 2 A into A, plus 2.5 A injected, gives 4.5 A entering; leaving, 18/12 = 1.5 A and 18/6 = 3 A, totalling 4.5 A.

> [!success]- Answer
> **$V_A = 18\ \mathrm{V}$, the same value from direct KCL and from the Millman formula.**

> [!warning] Trap
> Dropping the bare $6\ \Omega$ resistor when forming the denominator, usually because it has no source attached. Every resistor from the node to the reference adds $G_k$ with no numerator term; leaving it out gives $V_A = 7.5/(1/4) = 30\ \mathrm{V}$, which happens to equal the source voltage and looks suspiciously tidy.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Mixed sources go straight into Millman: `(30÷6+2.5)÷(1÷6+1÷12+1÷6)` → $V_A$ = **18** V.
> 2. Current audit: `(30−18)÷6+2.5` = **4.5** A in, and `18÷12` + `18÷6` = **4.5** A out.

### P4. A $24\ \mathrm{V}$ source in series with $6\ \Omega$ feeds node $A$; a $12\ \Omega$ resistor and a $1\ \mathrm{A}$ current source that injects into $A$ both connect $A$ to ground. A solution claims $V_A = 18\ \mathrm{V}$. Use Tellegen's theorem to show that claim is impossible, then find the correct $V_A$ and confirm the balance.

**Given:** Vs = 24 V, Rs = 6 Ω; R2 = 12 Ω from A to ground; Is = 1 A injected into A; Claimed solution: V_A = 18 V

**Solution:**

1. Correct solution first. KCL at A: (24 - V_A)/6 + 1 = V_A/12. Multiply by 12: 2(24 - V_A) + 12 = V_A, so 60 = 3V_A and V_A = 20 V.
2. Currents at V_A = 20 V: I_6 = (24 - 20)/6 = 2/3 A into A; I_12 = 20/12 = 5/3 A out of A; the source injects 1 A. KCL: 2/3 + 1 = 5/3.
3. Test the claim with Tellegen, passive convention on every element. At V_A = 18 V the implied currents are I_6 = (24 - 18)/6 = 1 A, I_12 = 18/12 = 1.5 A, source = 1 A.
4. Sum v_k i_k for the claim: (6)(1) + (18)(1.5) + (24)(-1) + (18)(-1) = 6 + 27 - 24 - 18 = -9 W, which is not zero. The claim violates Tellegen's theorem and is therefore impossible.
5. The equivalent power view of the failure: the claim has the sources producing 24(1) + 18(1) = 42 W while the resistors consume only 6 + 27 = 33 W. 42 does not equal 33.
6. Sum v_k i_k for the correct solution: (4)(2/3) + (20)(5/3) + (24)(-2/3) + (20)(-1) = 8/3 + 100/3 - 16 - 20 = 36 - 36 = 0 W.
7. Power form: the 24 V source delivers 24 x 2/3 = 16 W and the 1 A source delivers 20 x 1 = 20 W, total 36 W; the resistors absorb 4^2/6 = 8/3 W and 20^2/12 = 100/3 W, total 36 W.

> [!success]- Answer
> **The claim $V_A = 18\ \mathrm{V}$ fails the power check by $9\ \mathrm{W}$; the correct value is $V_A = 20\ \mathrm{V}$, where $\sum v_k i_k = 0$ and delivered $=$ absorbed $= 36\ \mathrm{W}$.**

> [!warning] Trap
> Signing every element positively in the audit. Use the passive convention consistently: an element whose current actually leaves its positive terminal contributes a negative $v_k i_k$. Adding all four terms as positive gives $6 + 27 + 24 + 18 = 75\ \mathrm{W}$, which is not zero even for a correct solution, and the audit becomes worthless.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Solve the node properly: `(24÷6+1)÷(1÷6+1÷12)` → $V_A$ = **20** V, with currents `(24−20)÷6` = **0.667** A in and `20÷12` = **1.667** A out.
> 2. Tellegen audit of the claim: `(24−18)÷6` = **1** A and `18÷12` = **1.5** A, so the element sum `6×1+18×1.5−24×1−18×1` = **−9** W ≠ 0.
> 3. The correct solution balances: `4×(2÷3)+20×(5÷3)−24×(2÷3)−20×1` = **0** W, i.e. 16 + 20 = **36** W delivered = **36** W absorbed.

## Traps & Exam Notes

- Reversing a branch by making its conductance negative. A flipped source contributes $-V_k G_k$ to the numerator while $G_k$ stays positive; a negative conductance in the denominator is always a sign that the polarity was misplaced.
- Omitting a resistor from $\sum G_k$ because it has no source in its branch. A bare resistor from the node to the reference belongs in the denominator with a zero numerator term; leaving it out inflates $V_A$ by exactly the conductance you dropped.
- Using Millman on a network that does not fit it — more than one unknown node, branches that do not share the same two endpoints, or a voltage source whose resistance is not actually in series with it. In those cases you must either convert the source first or fall back to full nodal analysis with a conductance matrix.
- Treating a passed power balance as proof of correctness. Tellegen's theorem follows from KVL and KCL alone, so any node voltages satisfying KVL paired with any branch currents satisfying KCL balance to zero even when some element breaks Ohm's law. A failed balance proves an error; a passed balance must still be backed by checking $v = iR$ on every resistor.

## See Also

- [[05_Nodal_Analysis_and_Supernodes]]
- [[07_Thevenin_and_Norton_Equivalents]]
- [[02_KCL,_KVL,_Series_and_Parallel_Reduction]]
- [[08_Maximum_Power_Transfer_and_Source_Transformation]]

---

[[08_Maximum_Power_Transfer_and_Source_Transformation|⬅ 08]] · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Inductors,_Capacitors_and_Energy|10 ➡]]
