---
id: ECE-01-02
title: "KCL, KVL, Series and Parallel Reduction"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 2
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Circuit_Variables,_Ohm’s_Law_and_Signs]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — KCL, KVL, Series and Parallel Reduction

> [!abstract] Scope
> Apply Kirchhoff's current and voltage laws at any node or loop, and collapse series and parallel branches into a single equivalent resistance.

## Core Concept

> [!tip] Intuition
> KCL is charge conservation at a junction: charge cannot pile up at a node, so whatever flows in must flow out. KVL is energy conservation around a closed path: you return to the same potential, so the signed voltage rises and drops must cancel.

**KCL — the node law.** At any node, $\sum i_{\mathrm{in}} = \sum i_{\mathrm{out}}$, or equivalently $\sum i = 0$ with entering currents taken positive. It is charge conservation under the lumped-circuit assumption: no node stores charge. KCL holds for *every* node and for any closed surface (a supernode) drawn through the circuit, which is exactly why nodal analysis and supernodes work.

**KVL — the loop law.** Around any closed path, $\sum v = 0$, where a rise is positive and a drop is negative (or the reverse, consistently). It is energy conservation: the work done moving a unit charge around a closed loop is zero. The loop does not have to be a physical mesh — any closed path through the network gives a valid equation.

**Series and parallel reduction.** Two elements are in *series* when the same current passes through both and nothing else taps the junction between them; then $R_{eq} = R_1 + R_2$ because KVL adds the drops at a common current. They are in *parallel* when they share the same two nodes and therefore the same voltage; then $1/R_{eq} = 1/R_1 + 1/R_2$ because KCL adds the branch currents at a common voltage. For two resistors the parallel rule collapses to the product-over-sum form $R_{eq} = R_1R_2/(R_1+R_2)$. Reduction is applied repeatedly, innermost pair first.

**The divider rules come straight out of KCL and KVL.** For series elements the current is common, so voltage divides in proportion to resistance:
$$v_k = v_s R_k/R_{eq}$$
For parallel elements the voltage is common, so current divides in inverse proportion to resistance (directly with conductance):
$$i_k = i_s G_k/G_{eq}$$
and for two resistors $i_1 = i_s R_2/(R_1+R_2)$ — the *other* resistor appears in the numerator.

**When reduction fails.** Series-parallel reduction only terminates for networks that are genuinely series-parallel. A bridge (such as a $\Delta$ embedded between two nodes) or any network with a dependent source bridging two branches cannot be reduced by pairing alone; those need $\Delta$–Y conversion, mesh or nodal analysis. KCL and KVL themselves never fail on a lumped network.

**Sources combine like elements.** Ideal voltage sources in series add algebraically with their polarity signs: a $12\,\mathrm{V}$ and a $5\,\mathrm{V}$ source aiding give $17\,\mathrm{V}$, bucking give $7\,\mathrm{V}$. Ideal current sources in parallel add algebraically. Voltage sources must never be placed in parallel unless they are identical, and current sources never in series.

## Derivation

**Series equivalent.** Let $n$ resistors carry the same current $i$. KVL around the single loop gives

$$v_s = v_1 + v_2 + \cdots + v_n = i\left(R_1 + R_2 + \cdots + R_n\right)$$

Dividing by the common current $i$ gives $R_{eq} = \sum_k R_k$.

**Parallel equivalent.** Let $n$ resistors share the same voltage $v$. KCL at the top node gives $i_s = i_1 + \cdots + i_n = v/R_1 + \cdots + v/R_n = v\sum_k G_k$. Since $R_{eq} = v/i_s$, $1/R_{eq} = \sum_k G_k$, i.e. $1/R_{eq} = \sum_k 1/R_k$.

**Voltage divider.** With $n$ resistors in series, $i = v_s/R_{eq}$ is common, so $v_k = iR_k = v_s\dfrac{R_k}{R_{eq}}$. The largest resistor drops the largest voltage — the opposite of the current-divider intuition.

**Current divider.** With $n$ conductances in parallel, $v = i_s/G_{eq}$ is common, so $i_k = vG_k = i_s\dfrac{G_k}{G_{eq}} = i_s\dfrac{1/R_k}{\sum 1/R_j}$. For two resistors this reduces to $i_1 = i_s\dfrac{R_2}{R_1+R_2}$.

**Power balance is the audit.** Every result must satisfy $\sum p_{\mathrm{delivered}} = \sum p_{\mathrm{absorbed}}$. Resistors always absorb ($p = i^2R \ge 0$); an ideal source absorbs when $p = vi < 0$ under the passive sign convention.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Kirchhoff's current law (node) | $\sum_{k} i_k = 0$ | Algebraic sum of all currents at a node. Entering positive (or leaving positive) — pick one convention and keep it. |
| Kirchhoff's current law (supernode) | $\sum i_{\mathrm{in}} = \sum i_{\mathrm{out}}$ | Valid for any closed surface cut through the network, not just a single node. |
| Kirchhoff's voltage law (loop) | $\sum_{k} v_k = 0$ | Around any closed path. Drops negative, rises positive along the chosen traversal direction. |
| Series resistance | $R_{eq} = R_1 + R_2 + \cdots + R_n$ | Valid only when the same current passes through every element with no tap between them. |
| Parallel resistance | $\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots + \frac{1}{R_n}$ | Shared nodes, common voltage. R_eq is always smaller than the smallest branch. |
| Two resistors in parallel | $R_{eq} = \frac{R_1 R_2}{R_1 + R_2}$ | Product over sum. Do not extend this shortcut to three or more resistors. |
| Conductance | $G = \frac{1}{R}$ | Siemens. Conductances add in parallel: G_eq = sum G_k. |
| Series inductors / parallel capacitors | $L_{eq} = \sum L_k, \qquad C_{eq} = \sum C_k \mathrm{\ (parallel)}$ | Opposite of resistors — inductors add in series, capacitors add in parallel. |
| Voltage divider | $v_k = v_s\,\frac{R_k}{R_{eq}}$ | Series elements sharing one current. Largest R takes the largest share of voltage. |
| Current divider (two branches) | $i_1 = i_s\,\frac{R_2}{R_1 + R_2}$ | The OTHER resistor goes in the numerator. Compare with the voltage divider. |
| Power balance check | $\sum_k p_k = 0, \qquad p_R = i^2 R = \frac{v^2}{R}$ | Resistors absorb positive power, so the sources must deliver exactly that much. Use as an arithmetic audit. |

## Worked Problems

### P1. Reduce the network to a single equivalent resistance: a $4\,\Omega$ resistor in series with the parallel combination of $12\,\Omega$ and $6\,\Omega$.

**Given:** R1 = 4 Ω (series); R2 = 12 Ω ∥ R3 = 6 Ω

**Solution:**

1. Start with the innermost pair, which shares both nodes: R_p = (12)(6)/(12+6)
2. R_p = 72/18 = 4 Ω
3. Now the 4 Ω sits in series with R_p because the same current passes through both
4. R_eq = 4 + 4 = 8 Ω

> [!success]- Answer
> **$R_{eq} = 8\,\Omega$**

> [!warning] Trap
> Adding the 4 Ω to the 12 Ω or the 6 Ω because the parallel pair was not reduced first. Always collapse the innermost parallel or series group before combining outward.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `12×6÷(12+6) : 4+Ans`
> 2. $R_p$ = **4** Ω → $R_{eq}$ = **8** Ω.

### P2. A $24\,\mathrm{V}$ source drives $8\,\Omega$ and $4\,\Omega$ in series. Find the voltage across the $8\,\Omega$ resistor and the current through it.

**Given:** V_s = 24 V; R1 = 8 Ω; R2 = 4 Ω, series

**Solution:**

1. R_eq = 8 + 4 = 12 Ω
2. i = V_s/R_eq = 24/12 = 2 A (common to both resistors)
3. v_8 = i R1 = (2)(8) = 16 V
4. Check with KVL: 16 + (2)(4) = 16 + 8 = 24 V ✓

> [!success]- Answer
> **$v_{8\Omega} = 16\,\mathrm{V}$ with $i = 2\,\mathrm{A}$**

> [!warning] Trap
> Dividing 24 V evenly between the two resistors. The divider is proportional to resistance: v_8 = 24 x 8/12 = 16 V, and the 4 Ω gets only 8 V.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain with `ALPHA` `:` — `24÷(8+4) : Ans×8`
> 2. $i$ = **2** A → $v_{8\Omega}$ = **16** V. KVL closes because `2×4` gives the remaining **8** V of the 24 V.

### P3. A total current of $6\,\mathrm{A}$ enters a parallel pair of $3\,\Omega$ and $6\,\Omega$. Find the current in each branch.

**Given:** i_s = 6 A; R1 = 3 Ω ∥ R2 = 6 Ω

**Solution:**

1. The smaller resistor takes the larger share: i_1 = i_s R2/(R1+R2) = 6(6)/(3+6)
2. i_1 = 36/9 = 4 A through the 3 Ω branch
3. i_2 = 6 - 4 = 2 A through the 6 Ω branch
4. Check the shared voltage: (4)(3) = 12 V and (2)(6) = 12 V ✓

> [!success]- Answer
> **$i_{3\Omega} = 4\,\mathrm{A}$, $i_{6\Omega} = 2\,\mathrm{A}$**

> [!warning] Trap
> Putting the resistor's own value in the numerator and getting 2 A for the 3 Ω branch. In the two-branch current divider the other resistance goes on top.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain with `ALPHA` `:` — `6×6÷(3+6) : 6−Ans`
> 2. $i_{3\Omega}$ = **4** A → $i_{6\Omega}$ = **2** A (the divider gives the larger share to the smaller resistance).

### P4. At a node, $5\,\mathrm{A}$ enters from one branch and $2\,\mathrm{A}$ leaves through a second. What current leaves through the third branch?

**Given:** i_in = 5 A; one outgoing branch = 2 A

**Solution:**

1. KCL: sum of currents entering = sum of currents leaving
2. 5 = 2 + i_3
3. i_3 = 5 - 2 = 3 A

> [!success]- Answer
> **$i_3 = 3\,\mathrm{A}$ leaving the node**

> [!warning] Trap
> Reporting -3 A because the direction was assumed and the sign convention was not stated. Fix a convention first: entering positive means the answer comes out positive when it truly enters.

### P5. Traversing a loop you record a $12\,\mathrm{V}$ rise, then a $4\,\mathrm{V}$ drop and a $5\,\mathrm{V}$ drop across two resistors. What is the voltage across the final element, and is it a rise or a drop?

**Given:** rise = 12 V; drops = 4 V, 5 V

**Solution:**

1. KVL: +12 - 4 - 5 + v_x = 0
2. v_x = 4 + 5 - 12 = -3 V
3. A negative result under the rise-positive convention means the element drops 3 V

> [!success]- Answer
> **$v_x = 3\,\mathrm{V}$ drop (i.e. $-3\,\mathrm{V}$ as a rise)**

> [!warning] Trap
> Forcing the last element to equal the source (12 V) by ignoring the two drops already accounted for, or losing the sign of the unknown because the traversal direction was not written down.

### P6. A $30\,\mathrm{V}$ source feeds $R_1 = 5\,\Omega$ in series with the parallel combination of $R_2 = 20\,\Omega$ and the series pair $R_3 = 10\,\Omega$, $R_4 = 10\,\Omega$. Find the source current and the voltage at the junction.

**Given:** V_s = 30 V; R1 = 5 Ω; R2 = 20 Ω; R3 = 10 Ω + R4 = 10 Ω

**Solution:**

1. Reduce R3 + R4 = 20 Ω (series)
2. Parallel with R2: 20 ∥ 20 = (20)(20)/40 = 10 Ω
3. R_eq = 5 + 10 = 15 Ω, so i = 30/15 = 2 A
4. v_junction = 30 - i R1 = 30 - (2)(5) = 20 V
5. Branch currents: 20/20 = 1 A in R2; 20/20 = 1 A in the R3+R4 branch

> [!success]- Answer
> **$i_s = 2\,\mathrm{A}$, $v_{junction} = 20\,\mathrm{V}$**

> [!warning] Trap
> Applying the voltage divider to get the junction voltage as 30 x 10/15 = 20 V by luck, then reusing 30 V instead of 20 V to find the branch currents. Once the junction voltage is known, re-apply Ohm's law branch by branch.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain with `ALPHA` `:` — `(10+10)×20÷(10+10+20) : 30÷(5+Ans) : 30−Ans×5 : Ans÷20 : Ans÷20`
> 2. $R_{eq}$ = **10** Ω → $i_s$ = **2** A → $v_{junc}$ = **20** V → $i_{R2}$ = **1** A → $i_{R3+R4}$ = **1** A.

### P7. A $12\,\mathrm{V}$ source and a $5\,\mathrm{V}$ source are placed in series but bucking (opposing polarities) in a loop with $R_1 = 1.5\,\Omega$ and $R_2 = 2\,\Omega$. Find the loop current and the drop across each resistor.

**Given:** V1 = 12 V; V2 = 5 V opposing; R_total = 3.5 Ω

**Solution:**

1. Net driving voltage = 12 - 5 = 7 V
2. i = 7/3.5 = 2 A
3. v_R1 = (2)(1.5) = 3 V; v_R2 = (2)(2) = 4 V
4. KVL check: 12 = 5 + 3 + 4 ✓

> [!success]- Answer
> **$i = 2\,\mathrm{A}$, with $3\,\mathrm{V}$ across $R_1$ and $4\,\mathrm{V}$ across $R_2$**

> [!warning] Trap
> Adding the sources to 17 V because the polarity marks were not traced. Two series sources buck when the loop traversal enters one at its + terminal and the other at its - terminal.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain with `ALPHA` `:` — `(12−5)÷3.5 : Ans×1.5 : Ans÷1.5×2`
> 2. $i$ = **2** A → $v_{R1}$ = **3** V → $v_{R2}$ = **4** V. The chain closes: 5 + 3 + 4 = **12** V.

### P8. A $6\,\mathrm{A}$ source and a $3\,\mathrm{A}$ source both feed the same node, which drives $4\,\Omega$ in parallel with $12\,\Omega$. Find the node voltage and both branch currents.

**Given:** i_s1 = 6 A; i_s2 = 3 A; R1 = 4 Ω ∥ R2 = 12 Ω

**Solution:**

1. KCL at the node: total injected current = 6 + 3 = 9 A
2. R_eq = (4)(12)/16 = 3 Ω
3. v = i R_eq = (9)(3) = 27 V
4. i_4 = 27/4 = 6.75 A; i_12 = 27/12 = 2.25 A; sum = 9 A ✓

> [!success]- Answer
> **$v = 27\,\mathrm{V}$, $i_{4\Omega} = 6.75\,\mathrm{A}$, $i_{12\Omega} = 2.25\,\mathrm{A}$**

> [!warning] Trap
> Subtracting the current sources because they are drawn on opposite sides of the node. Check whether each arrow points into or out of the node before assigning the sign.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain with `ALPHA` `:` — `(6+3)×4×12÷(4+12) : Ans÷4 : Ans×4÷12`
> 2. $v$ = **27** V → $i_{4\Omega}$ = **6.75** A → $i_{12\Omega}$ = **2.25** A, and 6.75 + 2.25 = **9** A returns the injected total.

### P9. Reduce to a single resistance: $10\,\Omega$ in parallel with the series combination of $10\,\Omega$ and $(10\,\Omega \parallel 10\,\Omega)$.

**Given:** R1 = 10 Ω (top-level parallel); R2 = 10 Ω (series); R3 = 10 Ω ∥ R4 = 10 Ω

**Solution:**

1. Innermost parallel pair: 10 ∥ 10 = 5 Ω
2. Series: 10 + 5 = 15 Ω
3. Parallel with the remaining 10 Ω: (10)(15)/(10+15) = 150/25 = 6 Ω

> [!success]- Answer
> **$R_{eq} = 6\,\Omega$**

> [!warning] Trap
> Reducing left to right instead of working from the innermost pair outward. The nesting order, not the drawing order, decides which rule applies first.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `10×10÷(10+10) : 10+Ans : 10×Ans÷(10+Ans)`
> 2. 10 ∥ 10 = **5** Ω → series **15** Ω → $R_{eq}$ = **6** Ω.

### P10. A $12\,\mathrm{V}$ source drives $2\,\Omega$ in series with the parallel pair $6\,\Omega \parallel 3\,\Omega$. Verify the solution by a full power balance.

**Given:** V_s = 12 V; R1 = 2 Ω (series); R2 = 6 Ω ∥ R3 = 3 Ω

**Solution:**

1. 6 ∥ 3 = (6)(3)/9 = 2 Ω; R_eq = 2 + 2 = 4 Ω
2. i_s = 12/4 = 3 A; v_node = 12 - (3)(2) = 6 V
3. Branch currents: 6/6 = 1 A and 6/3 = 2 A, summing to the 3 A source current ✓
4. P_source = (12)(3) = 36 W delivered
5. P_absorbed = (3^2)(2) + (1^2)(6) + (2^2)(3) = 18 + 6 + 12 = 36 W ✓

> [!success]- Answer
> **Power balance closes at $36\,\mathrm{W}$: the source delivers $36\,\mathrm{W}$ and the resistors absorb $18 + 6 + 12 = 36\,\mathrm{W}$**

> [!warning] Trap
> Computing branch power from the source voltage (12 V) instead of the node voltage (6 V). Each branch sees the node voltage, not the supply.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain with `ALPHA` `:` — `6×3÷(6+3) : 12÷(2+Ans) : 12−Ans×2 : Ans÷6 : Ans×3`
> 2. $R_{eq}$ = **2** Ω → $i_s$ = **3** A → $v_{node}$ = **6** V → $i_{6\Omega}$ = **1** A → $i_{3\Omega}$ = **2** A, which sums to the 3 A source current.
>
> Power audit on one line: `3²×2 : 1²×6 : 2²×3` → 18 + 6 + 12 = **36** W = 12×3, so the balance closes.

## Traps & Exam Notes

- **Calling two resistors 'in parallel' when only one end is shared.** Parallel requires both nodes in common, so the voltage across each is identical. If a resistor sits between them in one path, they are not in parallel and the product-over-sum rule does not apply.
- **Extending product-over-sum to three resistors.** $R_1R_2R_3/(R_1+R_2+R_3)$ is wrong. Use $1/R_{eq} = \sum 1/R_k$ for three or more, or reduce them two at a time.
- **Reversing the current divider.** $i_1 = i_s R_1/(R_1+R_2)$ is the common error; the correct two-branch form puts $R_2$ in the numerator because the smaller resistance carries the larger current.
- **Signs in KVL with bucking sources.** Two series sources add only when their polarities agree around the loop. Trace the traversal and assign each source $+V$ or $-V$ from the terminal you enter.
- **Adding voltages across parallel branches.** Elements in parallel share one voltage; their *currents* add. Elements in series share one current; their *voltages* add. Swapping these is the single most common reduction error.
- **Using the source voltage for branch power after a series resistor.** The parallel group sees the node voltage $v_s - iR_{series}$, not $v_s$.
- **Scaling a reduction result with the wrong element count.** After collapsing a parallel group to $R_p$, the original branches still each see the full node voltage — the *current* splits, not the resistance.

## See Also

- [[01_Circuit_Variables,_Ohm’s_Law_and_Signs]]
- [[03_Delta-Wye_Transformations]]
- [[05_Nodal_Analysis_and_Supernodes]]
- [[04_Mesh_Analysis_and_Supermesh]]

---

[[01_Circuit_Variables,_Ohm’s_Law_and_Signs|⬅ 01]] · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Delta-Wye_Transformations|03 ➡]]
