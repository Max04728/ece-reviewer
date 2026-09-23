---
id: ECE-01-03
title: "Delta-Wye Transformations"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Circuit_Variables,_Ohm’s_Law_and_Signs]]", "[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Delta-Wye Transformations

> [!abstract] Scope
> How to swap a three-terminal delta for its equivalent wye (and back) so a network that no series or parallel reduction can touch collapses to a single resistance.

## Core Concept

> [!tip] Intuition
> A delta (pi) and a wye (T) are two ways to wire three resistors between the same three terminals; because nothing outside can reach the wye's internal node, one specific set of values makes the two boxes electrically identical from the outside. The conversion is the price you pay for turning a triangle that contains no series or parallel pair into a star that does.

**Why two different networks can be identical.** A three-terminal resistor box is completely described to the outside world by three numbers — the resistance measured between each pair of terminals with the third terminal left open. A delta has three resistors and a wye has three resistors, so each has exactly three degrees of freedom, and the delta-to-wye formulas are simply the solution of the three equations that equate the pairwise terminal resistances. The wye's central node is internal: no external meter can reach it, which is why the two topologies are indistinguishable at the terminals even though one of them has an extra node. Because the equivalence is at the terminals only, the substitution is valid anywhere inside a larger network — the rest of the circuit connects to those three nodes and nothing else.

**The formulas and their asymmetry.** Delta to wye: each wye leg is the product of the *two* delta resistors touching that node, divided by the sum of all three delta resistors, so $R_a = \frac{R_{ab}R_{ca}}{R_{ab}+R_{bc}+R_{ca}}$ with the other two legs by cyclic rotation; the common denominator is a computational convenience worth exploiting, and every wye leg comes out smaller than the delta resistors that produced it. Wye to delta: each delta resistor is the sum of all three pairwise products of the wye legs divided by the wye leg *opposite* it, $R_{ab} = \frac{R_aR_b+R_bR_c+R_cR_a}{R_c}$ — the denominator is the leg that is not part of the pair being built, and every delta resistor comes out larger than the wye legs. In the balanced case $R_a = R_b = R_c = R_Y$ and $R_{ab} = R_{bc} = R_{ca} = R_{\Delta}$ these collapse to $R_Y = R_{\Delta}/3$ and $R_{\Delta} = 3R_Y$.

**When to reach for it, and when it is wasted effort.** Convert only when the three nodes of the delta (or wye) each carry at least one other connection, so that no two resistors share both terminals — that is exactly the situation in an unbalanced bridge. If one node of the delta is left dangling, the network is already a two-terminal series-parallel combination and the conversion route is longer; it must still give the same answer, which makes it a free self-check, since the equivalence guarantees $R_a + R_b = R_{ab} \parallel (R_{bc}+R_{ca})$. The arithmetic usually gets uglier after conversion (thirds, products over sums), so convert the delta whose nodes have the fewest external branches. Nothing in the derivation used the word 'resistor': replacing $R$ by $Z$ at a single frequency makes every formula valid for AC impedances, and the balanced result $Z_Y = Z_{\Delta}/3$ is what three-phase analysis leans on.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Delta to wye, leg at node a | $R_a = \frac{R_{ab}\,R_{ca}}{R_{ab}+R_{bc}+R_{ca}}$ | The numerator is the product of the two delta resistors that touch node a; the denominator is the sum of all three and is identical for the other legs. |
| Delta to wye, cyclic partners | $R_b = \frac{R_{ab}\,R_{bc}}{R_{ab}+R_{bc}+R_{ca}}, \qquad R_c = \frac{R_{bc}\,R_{ca}}{R_{ab}+R_{bc}+R_{ca}}$ | The subscript of a wye leg names the delta node it lands on, and the numerator holds the two delta resistors meeting at that node. |
| Wye to delta, resistor between a and b | $R_{ab} = \frac{R_aR_b + R_bR_c + R_cR_a}{R_c}$ | The numerator is the sum of all three pairwise products (the same for every leg); the denominator is the wye leg opposite the pair. |
| Wye to delta, cyclic partners | $R_{bc} = \frac{R_aR_b+R_bR_c+R_cR_a}{R_a}, \qquad R_{ca} = \frac{R_aR_b+R_bR_c+R_cR_a}{R_b}$ | The denominator is the wye leg not in the pair: R_ab divides by R_c, R_bc by R_a, R_ca by R_b. This is the single most common slip. |
| Balanced delta to wye | $R_Y = \frac{R_{\Delta}}{3}$ | Only when all three delta resistors are equal, as in a balanced three-phase load reduced to its wye equivalent. |
| Balanced wye to delta | $R_{\Delta} = 3R_Y$ | Only for a balanced wye; never apply this factor to an unbalanced network. |
| Two-terminal resistance of a delta | $R_{eq,ab} = R_{ab} \parallel (R_{bc}+R_{ca})$ | Node c open. Use it as the correctness check on any conversion: it must equal R_a + R_b in the wye. |
| Two-terminal resistance of a wye | $R_{eq,ab} = R_a + R_b$ | Node c open, so the third leg carries no current and drops no voltage; it can be ignored, but it is not removed from the network. |
| Conductance form of delta to wye | $G_a = \frac{G_{ab}G_{bc} + G_{bc}G_{ca} + G_{ca}G_{ab}}{G_{bc}}$ | Useful when the resistors are given as conductances or in millisiemens; it is the dual of the wye-to-delta resistance form, so the roles of numerator and denominator swap. |

## Interactive Widget

**Delta Wye Converter**

![[Delta_Wye_Converter.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A delta-connected set of resistors has $R_{ab} = 30\ \Omega$, $R_{bc} = 60\ \Omega$, and $R_{ca} = 90\ \Omega$. Find the three wye legs and verify the conversion.

**Given:** R_ab = 30 Ω; R_bc = 60 Ω; R_ca = 90 Ω

**Solution:**

1. Sum of the delta resistors: $R_{ab}+R_{bc}+R_{ca} = 30+60+90 = 180\ \Omega$; this denominator is common to all three legs.
2. $R_a = \frac{R_{ab}R_{ca}}{180} = \frac{(30)(90)}{180} = 15\ \Omega$.
3. $R_b = \frac{R_{ab}R_{bc}}{180} = \frac{(30)(60)}{180} = 10\ \Omega$.
4. $R_c = \frac{R_{bc}R_{ca}}{180} = \frac{(60)(90)}{180} = 30\ \Omega$.
5. Verify with terminal c open: the delta gives $30 \parallel (60+90) = \frac{(30)(150)}{180} = 25\ \Omega$ and the wye gives $R_a + R_b = 15+10 = 25\ \Omega$. They agree, so the substitution is invisible from the terminals.

> [!success]- Answer
> **$R_a = 15\ \Omega$, $R_b = 10\ \Omega$, $R_c = 30\ \Omega$, checked by the matching $25\ \Omega$ reading between nodes a and b with c open.**

> [!warning] Trap
> Pairing the wrong delta resistors with a wye leg: $R_a$ uses the two resistors that touch node a, namely $R_{ab}$ and $R_{ca}$ — not $R_{ab}$ and $R_{bc}$. The leg sitting on node a can never contain the resistor that does not touch a, which here is $R_{bc}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Common denominator first, then chain with `ALPHA` `:` — `30+60+90 : 30×90÷Ans : 30×60÷Ans : 60×90÷Ans`
> 2. $\Sigma$ = **180** Ω → $R_a$ = **15** Ω → $R_b$ = **10** Ω → $R_c$ = **30** Ω, and `30×150÷180` returns the **25** Ω check.

### P2. A wye network has $R_a = 10\ \Omega$, $R_b = 20\ \Omega$, and $R_c = 30\ \Omega$. Find the three equivalent delta resistors.

**Given:** R_a = 10 Ω; R_b = 20 Ω; R_c = 30 Ω

**Solution:**

1. Sum of pairwise products: $R_aR_b + R_bR_c + R_cR_a = 200 + 600 + 300 = 1100\ \Omega^2$.
2. $R_{ab} = 1100/R_c = 1100/30 = 36.67\ \Omega$.
3. $R_{bc} = 1100/R_a = 1100/10 = 110\ \Omega$.
4. $R_{ca} = 1100/R_b = 1100/20 = 55\ \Omega$.
5. Verify with terminal c open: $36.67 \parallel (110+55) = \frac{(36.67)(165)}{201.67} = 30\ \Omega$, which equals $R_a + R_b = 10 + 20 = 30\ \Omega$.

> [!success]- Answer
> **$R_{ab} = 36.67\ \Omega$, $R_{bc} = 110\ \Omega$, $R_{ca} = 55\ \Omega$.**

> [!warning] Trap
> Dividing by the wrong wye leg. $R_{ab}$ divides by $R_c$, the leg opposite the a-b pair; dividing all three by the same value (as in the delta-to-wye direction) produces a set that fails the $R_a + R_b$ check.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Numerator once, then chain with `ALPHA` `:` — `10×20+20×30+30×10 : Ans÷30 : Ans×30÷10 : Ans×10÷20`
> 2. $\Sigma RR$ = **1100** Ω² → $R_{ab}$ = **36.67** Ω → $R_{bc}$ = **110** Ω → $R_{ca}$ = **55** Ω.
>
> Each delta resistor divides by the wye leg OPPOSITE it: $R_{ab}$ uses $R_c$. Dividing by the adjacent leg is the classic slip.

### P3. Reduce the two-terminal network between A and B to a single $R_{eq}$: terminal A reaches node X through a $5\ \Omega$ resistor; a delta of $R_{Xb} = 30\ \Omega$, $R_{bc} = 60\ \Omega$, $R_{cX} = 90\ \Omega$ links nodes X, b and c; node b returns to terminal B through $40\ \Omega$, and node c returns through $20\ \Omega$. Then find the current drawn from a $9$ V source connected across A and B.

**Given:** R_AX = 5 Ω; delta: R_Xb = 30 Ω, R_bc = 60 Ω, R_cX = 90 Ω; R_bB = 40 Ω; R_cB = 20 Ω; Vs = 9 V across A and B

**Solution:**

1. The delta has three external connections — the 5 Ω at X, the 40 Ω at b and the 20 Ω at c — so no two of its resistors are in series or in parallel and the delta must be converted to a wye.
2. Using the common sum $180\ \Omega$: $R_X = \frac{(30)(90)}{180} = 15\ \Omega$, $R_b = \frac{(30)(60)}{180} = 10\ \Omega$, $R_c = \frac{(60)(90)}{180} = 30\ \Omega$.
3. The external resistor at each node is now in series with that node's wye leg: $R_X + R_{AX} = 15+5 = 20\ \Omega$ on the input side, $R_b + R_{bB} = 10+40 = 50\ \Omega$, and $R_c + R_{cB} = 30+20 = 50\ \Omega$.
4. The two 50 Ω branches are in parallel: $50 \parallel 50 = 25\ \Omega$.
5. $R_{eq} = 20 + 25 = 45\ \Omega$, so the source current is $I = V_s/R_{eq} = 9/45 = 0.2$ A.

> [!success]- Answer
> **$R_{eq} = 45\ \Omega$ and the $9$ V source supplies $I = 0.2$ A.**

> [!warning] Trap
> Adding the 5 Ω input resistor after the parallel combination instead of in series with the X leg, which gives $5 + 25 = 30\ \Omega$, or trying to reduce the delta's 30 Ω and 90 Ω arms first: X-b and X-c are not in parallel, because b and c are different nodes held apart by the 60 Ω resistor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Convert the delta with the shared sum, chained with `ALPHA` `:` — `30+60+90 : 30×90÷Ans : 30×60÷Ans : 60×90÷Ans`
> 2. $\Sigma$ = **180** Ω → wye legs **15**, **10**, **30** Ω. Add each external resistor into its own arm, then reduce the two arms in parallel: `(10+40)×(30+20)÷(10+40+30+20)+15+5`
> 3. **25** Ω → $R_{eq}$ = **45** Ω, so `9÷45` gives $I$ = **0.2** A from the 9 V source.
>
> MODE 7 MATX is the fallback when the converted network needs a 3×3 nodal system; the delta-wye reduction itself is pure COMP.

### P4. A balanced delta load has three $90\ \Omega$ resistors. (a) Find the equivalent wye. (b) Confirm the equivalence by the two-terminal resistance with the third terminal open. (c) A balanced wye of three $12\ \Omega$ resistors is to be replaced by a delta — find it and check it the same way.

**Given:** balanced delta: 90 Ω each; balanced wye: 12 Ω each

**Solution:**

1. (a) Balanced, so the shortcut applies: $R_Y = R_{\Delta}/3 = 90/3 = 30\ \Omega$ per leg.
2. (b) Delta with the third terminal open: $90 \parallel (90+90) = 90 \parallel 180 = \frac{(90)(180)}{270} = 60\ \Omega$. Wye: $30 + 30 = 60\ \Omega$. The readings agree.
3. (c) Reverse direction: $R_{\Delta} = 3R_Y = 3(12) = 36\ \Omega$, so three $36\ \Omega$ resistors.
4. Check (c): the wye gives $12 + 12 = 24\ \Omega$ and the delta gives $36 \parallel 72 = \frac{(36)(72)}{108} = 24\ \Omega$, so the two-terminal resistances agree again.

> [!success]- Answer
> **(a) $R_Y = 30\ \Omega$ per leg; (b) both networks read $60\ \Omega$; (c) $R_{\Delta} = 36\ \Omega$ per leg, checked at $24\ \Omega$.**

> [!warning] Trap
> Using $R_Y = R_{\Delta}/3$ as if it were general. The division by 3 is a balanced-only shortcut: for the $30/60/90$ delta the legs are $15/10/30$, not $10/20/30$, and the two-terminal check exposes the error immediately.

### P5. Between terminals A and B: terminal A reaches node X through $5\ \Omega$; a **balanced** delta of three $30\ \Omega$ resistors links nodes X, b and c; node b goes to B through $10\ \Omega$ and node c goes to B through $20\ \Omega$. A classmate claims the two 30 Ω arms at X are in parallel, computes $30 \parallel 30 = 15\ \Omega$ and reports $R_{eq} = 5 + 15 + 12 = 32\ \Omega$. Find the correct $R_{eq}$.

**Given:** R_AX = 5 Ω; balanced delta: 30 Ω each between X, b, c; R_bB = 10 Ω; R_cB = 20 Ω; classmate's claim: Req = 32 Ω

**Solution:**

1. The two 30 Ω arms are not in parallel: they end at different nodes, b and c, which are separated by the third 30 Ω resistor. A parallel pair must share *both* terminals, so the delta must be converted rather than partially reduced.
2. Balanced conversion: $R_Y = 30/3 = 10\ \Omega$ at each of X, b and c.
3. After conversion, X joins the new internal node n through 10 Ω, and b and c each join n through 10 Ω, so the two external branches hang off n: $n \to b \to B$ is $10+10 = 20\ \Omega$ and $n \to c \to B$ is $10+20 = 30\ \Omega$.
4. Those two branches are in parallel: $20 \parallel 30 = \frac{(20)(30)}{50} = 12\ \Omega$.
5. $R_{eq} = 5 + 10 + 12 = 27\ \Omega$, so the classmate's $32\ \Omega$ overstates the input resistance by 5 Ω.

> [!success]- Answer
> **$R_{eq} = 27\ \Omega$ (the claimed $32\ \Omega$ is wrong), made up of $5\ \Omega + 10\ \Omega + (20 \parallel 30)\,\Omega$.**

> [!warning] Trap
> Paralleling two resistors that merely share a node. Sharing a node does not make a parallel pair — both terminals must be common — and b and c are held apart by the third 30 Ω resistor, which is precisely why the delta must be converted first.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Balanced delta to wye is one division: `30÷3` → **10** Ω at each of X, b and c.
> 2. Each converted arm absorbs its external resistor, giving **20** Ω (through b) and **30** Ω (through c); one chain with `ALPHA` `:` — `20×30÷(20+30) : 5+10+Ans`
> 3. **12** Ω → $R_{eq}$ = **27** Ω, 5 Ω below the classmate's claimed **32** Ω.

## Traps & Exam Notes

- **Pairing the wrong resistors.** In delta-to-wye the numerator for a leg is the product of the two delta resistors *meeting at that node*; using two that do not meet there gives a plausible-looking but wrong leg. Sanity check: every wye leg must be smaller than either delta resistor it came from.
- **Using $R_Y = R_{\Delta}/3$ on an unbalanced network.** The divide-by-3 and multiply-by-3 shortcuts are balanced-only. With $30/60/90$ the wye is $15/10/30$; forcing $10/20/30$ breaks the two-terminal check and every current computed downstream of it.
- **Calling a shared-node pair parallel (or series).** Two resistors hanging on the same node with a third resistor between their far ends are neither in series nor in parallel — that is the bridge geometry the conversion exists for. Attempting a partial reduction here returns a resistance that is too large.
- **Losing the external branches during the conversion.** A delta-to-wye conversion introduces a new internal node, so the branch attached to each delta node must be re-attached in series with the corresponding wye leg. Paralleling the wye legs first and adding the external resistor afterwards changes the answer.

## See Also

- [[02_KCL,_KVL,_Series_and_Parallel_Reduction]]
- [[04_Mesh_Analysis_and_Supermesh]]
- [[05_Nodal_Analysis_and_Supernodes]]
- [[07_Thevenin_and_Norton_Equivalents]]

---

[[02_KCL,_KVL,_Series_and_Parallel_Reduction|⬅ 02]] · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Mesh_Analysis_and_Supermesh|04 ➡]]
