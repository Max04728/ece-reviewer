---
id: MATH-06-03
title: "Mason’s Gain Formula"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Block_Diagram_Reduction]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Mason’s Gain Formula

> [!abstract] Scope
> Compute the input-output gain of a signal-flow graph directly from its forward paths, loops and non-touching combinations.

## Core Concept

> [!tip] Intuition
> Mason's formula is a bookkeeper's shortcut: every forward path from input to output is weighted by how much of the graph's feedback it escapes, then the whole thing is divided by the graph's total feedback denominator.

**The formula.** Mason's gain is:
$$T=\dfrac{1}{\Delta}\displaystyle\sum_k P_k\Delta_k$$
Here $P_k$ is the gain of the $k$-th forward path (input to output with no node visited twice). The graph determinant is:
$$\Delta=1-\sum L_i+\sum L_iL_j-\sum L_iL_jL_k+\dots$$
The cofactor $\Delta_k$ is then $\Delta$ restricted to the loops that **do not touch** path $k$.

**What 'loop' and 'touching' mean.** A loop is a closed path with no node repeated; its gain is the product of its branch gains, sign included. Two loops *touch* if they share at least one node. Only **mutually non-touching** sets appear in $\Delta$: the second-order term sums products of every pair of non-touching loops, the third-order term every triple that are pairwise non-touching, and so on. If two loops touch, their product never appears.

**The cofactor $\Delta_k$ is the part students forget.** For a path that touches every loop in the graph, $\Delta_k=1$. For a path that escapes a loop, that loop re-enters the cofactor with exactly the same $1-\sum L+\sum LL'$ structure, using only the loops the path misses. A path that avoids all loops gets the full $\Delta$.

**Signs.** Write each loop gain with its own sign (a negative-feedback loop contributes a negative $L$). Then $\Delta=1-\sum L$ *adds* the magnitude of a negative loop gain. The single most common arithmetic error is to write $\Delta=1+\sum L$ because the loop 'looks like' negative feedback — the sign is already in $L$.

**When to use Mason over block reduction.** Mason shines when a graph has two or more forward paths, or when loops do not nest. It needs no diagram moves, so it cannot accumulate move-errors. Use block reduction for a simple single-loop or nicely nested diagram, and Mason for anything with a bypass path.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Mason's gain formula | $T = \frac{1}{\Delta}\sum_k P_k \Delta_k$ | P_k is the k-th forward path gain; sum over every forward path from input to output. |
| Graph determinant | $\Delta = 1 - \sum_i L_i + \sum_{i,j} L_i L_j - \sum_{i,j,k} L_i L_j L_k + \dots$ | Second and higher sums run over mutually NON-touching loops only. |
| Path cofactor | $\Delta_k = 1 - \sum L_{(k)} + \sum L_{(k)}L_{(k)}' - \dots$ | Only loops that do not touch path k appear. If path k touches every loop, Delta_k = 1. |
| Single loop, single path | $T = \frac{P_1}{1 - L_1}$ | With P_1 = G and L_1 = -GH this is G/(1+GH), matching block reduction. |
| Two touching loops | $\Delta = 1 - L_1 - L_2$ | No product term: touching loops never contribute L1*L2. |
| Two non-touching loops | $\Delta = 1 - L_1 - L_2 + L_1 L_2$ | The product term is mandatory; dropping it is the classic non-touching error. |
| Three loops, one non-touching pair | $\Delta = 1 - (L_1+L_2+L_3) + L_1 L_2$ | Only the pair that shares no node contributes; L3 touches both. |
| Forward path gain | $P_k = \prod \mathrm{branch\ gains\ along\ the\ path}$ | A valid path never revisits a node. Multiply, never add, branch gains. |
| Loop gain | $L_i = \prod \mathrm{branch\ gains\ around\ the\ loop}$ | Keep the algebraic sign of each branch; a negative-feedback loop gives a negative L. |
| Touching test | $L_i, L_j \ \mathrm{touch} \iff \mathrm{node\ sets\ intersect}$ | Sharing a node is enough; sharing a branch always implies sharing two nodes. |

## Worked Problems

### P1. A signal-flow graph has forward paths $P_1=G_1G_2G_3$ and $P_2=G_4$, and loops $L_1=G_2H_2$, $L_2=G_3H_1$ which touch each other. $P_1$ touches both loops; $P_2$ touches neither. With $G_1=1$, $G_2=2$, $G_3=3$, $G_4=4$, $H_1=0.1$, $H_2=0.2$, find $T$.

**Given:** P1 = G1G2G3; P2 = G4; L1 = G2H2; L2 = G3H1; loops touch each other

**Solution:**

1. $L_1 = 2(0.2) = 0.4$ and $L_2 = 3(0.1) = 0.3$
2. Loops touch, so no product term: $\Delta = 1 - 0.4 - 0.3 = 0.3$
3. $P_1 = 1\cdot2\cdot3 = 6$ and $P_1$ touches both loops, so $\Delta_1 = 1$
4. $P_2 = G_4 = 4$ and touches neither loop, so $\Delta_2 = 1 - 0.4 - 0.3 = 0.3$
5. $T = \dfrac{6(1) + 4(0.3)}{0.3} = \dfrac{6 + 1.2}{0.3} = \dfrac{7.2}{0.3} = 24$

> [!success]- Answer
> **$T = 24$.**

> [!warning] Trap
> Setting $\Delta_2 = 1$ because the path 'is not in the loop'. The cofactor removes only the loops that touch the path — here $P_2$ touches none, so both loops appear and $\Delta_2 = 0.3$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×0.2` `SHIFT` `STO` `A` `ALPHA` `:` `3×0.1` `SHIFT` `STO` `B` `ALPHA` `:` `1−A−B` → $L_1=$ **0.4** → $L_2=$ **0.3** → $\Delta=$ **0.3** (touching loops, so no $L_1L_2$ term).
> 2. Continue the chain: `ALPHA` `:` `(1×2×3+4×Ans)÷Ans` → $T=(6+4\Delta)/\Delta=$ **24**.

### P2. A graph has one forward path $P_1 = 4$ and two loops $L_1=-0.5$, $L_2=-0.4$ which are non-touching. $P_1$ touches $L_1$ but not $L_2$. Find $T$.

**Given:** P1 = 4; L1 = -0.5; L2 = -0.4; L1 and L2 non-touching; P1 touches L1 only

**Solution:**

1. $\Delta = 1 - (L_1+L_2) + L_1L_2$
2. $L_1+L_2 = -0.9$, so $-\sum L = +0.9$
3. $L_1L_2 = (-0.5)(-0.4) = +0.2$
4. $\Delta = 1 + 0.9 + 0.2 = 2.1$
5. $\Delta_1 = 1 - L_2 = 1 - (-0.4) = 1.4$ (only the non-touching loop survives)
6. $T = \dfrac{4(1.4)}{2.1} = \dfrac{5.6}{2.1} = 2.667$

> [!success]- Answer
> **$T = 5.6/2.1 = 2.667$ (exactly $8/3$).**

> [!warning] Trap
> Writing $\Delta = 1 - 0.5 - 0.4 = 0.1$ by dropping the signs of the loop gains, or forgetting the $L_1L_2$ product. Both mistakes converge on a wildly small denominator.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1−(−0.5−0.4)+(−0.5)(−0.4)` → $\Delta=$ **2.1** — key the signed loop gains, not their magnitudes.
> 2. `4×(1+0.4)÷Ans` → $\Delta_1=1-(-0.4)=$ **1.4** (only the non-touching loop survives) → $T=$ **2.667**, that is $8/3$.

### P3. A graph has three loops $L_1=-0.2$, $L_2=-0.3$, $L_3=-0.1$. $L_1$ and $L_2$ are non-touching; $L_3$ touches both. Find $\Delta$.

**Given:** L1 = -0.2; L2 = -0.3; L3 = -0.1; only L1 and L2 are non-touching

**Solution:**

1. $\sum L_i = -0.2-0.3-0.1 = -0.6$
2. So $-\sum L_i = +0.6$
3. Non-touching pairs: only $L_1L_2 = (-0.2)(-0.3) = +0.06$
4. $L_3$ touches both, so $L_1L_3$, $L_2L_3$ and any triple are excluded
5. $\Delta = 1 + 0.6 + 0.06 = 1.66$

> [!success]- Answer
> **$\Delta = 1.66$.**

> [!warning] Trap
> Including all three pairs ($0.06+0.02+0.03$) because all three were listed. A pair only enters if the two loops share no node.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `−0.2−0.3−0.1` → $\sum L_i=$ **-0.6**, so $-\sum L_i=$ **+0.6**.
> 2. `1−Ans` → **1.6**, then `+(-0.2×-0.3)` → $\Delta=$ **1.66**; the $L_1L_3$ and $L_2L_3$ pairs stay out because $L_3$ touches both.

### P4. A graph has $P_1=9$, which touches the only loop $L_1=-0.5$, and $P_2=3$, which touches no loop. Find $T$.

**Given:** P1 = 9 (touches L1); P2 = 3 (touches nothing); L1 = -0.5

**Solution:**

1. $\Delta = 1 - L_1 = 1 + 0.5 = 1.5$
2. $\Delta_1 = 1$ because $P_1$ touches the only loop
3. $\Delta_2 = 1 - L_1 = 1.5$ because $P_2$ touches no loop
4. $T = \dfrac{P_1\Delta_1 + P_2\Delta_2}{\Delta} = \dfrac{9(1) + 3(1.5)}{1.5}$
5. $T = \dfrac{9 + 4.5}{1.5} = \dfrac{13.5}{1.5} = 9$

> [!success]- Answer
> **$T = 9$.**

> [!warning] Trap
> Using a single $\Delta$ for every path. Each path carries its own cofactor; applying $\Delta$ twice gives $(9+3)/1.5 = 8$, which is wrong.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1−(−0.5)` → $\Delta=$ **1.5**, and since $P_2$ escapes the loop $\Delta_2=$ **1.5** while $\Delta_1=$ **1**.
> 2. `(9+3×Ans)÷Ans` → $T=(9(1)+3(1.5))/1.5=$ **9**.

### P5. Derive $T=G/(1+GH)$ from a two-node graph with forward path $P_1=G$ and loop $L_1=-GH$, and confirm Mason agrees with block reduction.

**Given:** P1 = G; L1 = -GH; one loop, one path

**Solution:**

1. $\Delta = 1 - L_1 = 1 - (-GH) = 1 + GH$
2. $P_1$ touches the only loop, so $\Delta_1 = 1$
3. $T = \dfrac{P_1\Delta_1}{\Delta} = \dfrac{G}{1+GH}$
4. This matches the negative-feedback block-reduction rule exactly

> [!success]- Answer
> **$T = \dfrac{G}{1+GH}$, identical to the feedback reduction rule.**

> [!warning] Trap
> Writing the loop gain as $+GH$ for 'unity feedback'. The loop gain is the product *around* the loop, which for negative feedback is $-GH$.

## Traps & Exam Notes

- **Forgetting the cofactor $\Delta_k$.** A forward path that escapes a loop must have that loop removed from its cofactor. This is the single largest source of wrong answers in Mason problems.
- **Sign of the loop gain.** $\Delta = 1-\sum L$ with the signed loop gains; a negative-feedback loop therefore *increases* $\Delta$. Writing $1+\sum|L|$ double-counts the sign.
- **Including touching loops in the product terms.** $L_iL_j$ appears only when the two loops share no node; sharing one node is enough to kill the term.
- **Stopping at second-order terms when a valid triple exists.** Three pairwise non-touching loops contribute $-L_1L_2L_3$; if any two of the three touch, the triple is excluded.
- **Counting an invalid forward path.** A path that revisits a node is not a forward path; it contains a loop and must be decomposed differently.
- **Adding branch gains along a path.** Both path gains and loop gains are products, never sums.
- **Cancelling a pole-zero pair before applying Mason.** Only after $T$ is assembled as a single rational expression can common factors be cancelled.

## See Also

- [[02_Block_Diagram_Reduction]]
- [[01_System_Modeling_and_Transfer_Functions]]
- [[09_Root_Locus_Techniques]]

---

[[02_Block_Diagram_Reduction|⬅ 02]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Test_Signals_and_First_Order_Response|04 ➡]]
