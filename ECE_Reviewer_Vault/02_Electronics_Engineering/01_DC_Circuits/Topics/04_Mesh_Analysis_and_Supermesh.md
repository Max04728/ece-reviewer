---
id: ECE-01-04
title: "Mesh Analysis and Supermesh"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 4
tier: 1
depth: full
problem_count: 8
prereqs: ["[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]", "[[01_Circuit_Variables,_Ohm’s_Law_and_Signs]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Mesh Analysis and Supermesh

> [!abstract] Scope
> Solve a planar network for every branch current by writing one KVL equation per mesh, and handle shared current sources with a supermesh.

## Core Concept

> [!tip] Intuition
> Instead of tracking a separate current in every branch, mesh analysis invents one circulating current per window of the circuit. Those window currents are not physical, but every real branch current is just a difference of two neighbours — and KCL is satisfied automatically by construction.

**The mesh current idea.** Draw a clockwise loop current in each window (mesh) of a planar network. Because each invented current leaves any node it enters, KCL is satisfied at every node *automatically* — the only equations left to write are KVL around each mesh. A network with $n$ meshes therefore needs exactly $n$ simultaneous equations, one unknown each.

**Writing the equations.** Around mesh $k$, the current $i_k$ drops $\left(\sum R_{\mathrm{own}}\right) i_k$ in its own resistors, and each shared resistor contributes $-R_{\mathrm{shared}} i_{j}$ because the neighbour's current opposes the traversal. Voltage sources contribute $+V$ if the clockwise path enters the $-$ terminal first (a rise) and $-V$ otherwise. This gives the standard form $R_{kk} i_k - \sum_{j\neq k} R_{kj} i_j = \sum v_k$, which is symmetric: $R_{kj} = R_{jk}$.

**From mesh currents to branch currents.** A branch that belongs to only one mesh carries that mesh current. A shared branch carries the *difference*, $i_{\mathrm{branch}} = i_k - i_j$, in the direction of $i_k$. This difference is where most sign errors appear: a positive difference means the current flows the way the first mesh circulates.

**The supermesh.** A current source shared by two meshes has an unknown voltage across it, which would add an unknown to KVL. The fix is to merge the two meshes into one *supermesh*: write a single KVL equation around the **outer boundary**, deliberately excluding the branch that contains the current source, and then add the constraint equation supplied by the source itself, $i_2 - i_1 = I_s$ (or $i_1 - i_2 = I_s$, depending on the source's arrow relative to the chosen clockwise directions). Two equations replace the two mesh equations you gave up.

**A current source on the outer boundary is not a supermesh.** If the source lies in a branch that belongs to only one mesh, it simply *fixes* that mesh current: $i_k = \pm I_s$. Do not build a supermesh for it.

**When mesh analysis is the wrong tool.** Mesh analysis needs a planar network — one that can be drawn with no crossing branches. It is also clumsy when the circuit has many parallel branches or when you need a single node voltage, where nodal analysis gives fewer equations. Conversely, mesh wins when the network is a chain of series-ish loops or when most sources are voltage sources.

**Dependent sources.** Write the controlling quantity in terms of the mesh currents first, then substitute it into the KVL equation. A dependent source is never turned off and is never a reason to abandon the method — it just makes the coefficient matrix non-symmetric.

## Derivation

**Two-mesh standard form.** For the left mesh $i_1$ and the right mesh $i_2$ sharing $R_2$, KVL in mesh 1 gives $V_1 - R_1i_1 - R_2(i_1 - i_2) = 0$ and KVL in mesh 2 gives $V_2 - R_2(i_2 - i_1) - R_3i_2 = 0$. Collecting terms:

$$\begin{aligned}(R_1+R_2)\,i_1 - R_2\,i_2 &= V_1 \\ -R_2\,i_1 + (R_2+R_3)\,i_2 &= V_2\end{aligned}$$

**Symmetry check.** The coefficient matrix $\begin{pmatrix} R_1+R_2 & -R_2 \\ -R_2 & R_2+R_3\end{pmatrix}$ is symmetric with a positive diagonal. Any asymmetric matrix (other than from a dependent source) signals a sign mistake in the shared term.

**Supermesh derivation.** Add the two mesh equations when a current source replaces the shared resistor. The shared term $-R_2i_2$ from mesh 1 and $+R_2i_1$ from mesh 2 do not cancel unless the branch has no resistance — which is exactly the case with an ideal current source. The sum therefore degenerates into a single KVL around the outer boundary: $V_1 - R_1i_1 - R_3i_2 = 0$, with the source branch excluded because its voltage drop is unknown and cancels out of the sum.

**Constraint equation.** The shared current source forces the difference of the two mesh currents through that branch. With both mesh currents drawn clockwise and the source arrow pointing down the shared branch (the direction of $i_2$), the branch current is $i_2 - i_1$, so $i_2 - i_1 = I_s$. Reverse the arrow and the sign reverses.

**Solving.** Two equations, two unknowns. Substitute the constraint into the supermesh KVL to get a single equation in one unknown, then back-substitute for the other. Audit the answer by computing $\sum p$ across the network.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Mesh KVL, standard form | $\left(\sum R_{\mathrm{own}}\right) i_k - \sum_{j \neq k} R_{kj}\, i_j = \sum v_k$ | One equation per mesh. Shared resistances appear with a minus sign; i_j are the neighbours' clockwise currents. |
| Branch current from mesh currents | $i_{\mathrm{branch}} = i_k - i_j$ | For a branch shared by meshes k and j. The sign is positive in the direction of i_k. |
| Supermesh KVL | $\sum v = 0 \ \mathrm{around\ the\ outer\ boundary}$ | Excludes the branch containing the shared current source, whose voltage is unknown. |
| Supermesh constraint | $i_2 - i_1 = I_s$ | Sign follows the source arrow relative to the clockwise mesh directions. Reverse the arrow and it becomes i_1 - i_2 = I_s. |
| Boundary current source | $i_k = \pm I_s$ | A current source in an unshared branch fixes that mesh current outright; no supermesh is needed. |
| Dependent source term | $v_{\mathrm{dep}} = k\, i_x$ | Express i_x in terms of mesh currents BEFORE writing KVL, then substitute. |
| Power delivered by a source | $p = v_s\, i_s$ | Use the mesh current that actually passes through the source, with the passive sign convention. |
| Matrix form | $\mathbf{R}\,\mathbf{i} = \mathbf{v}$ | For independent sources R is symmetric. Solve by Cramer's rule or substitution for 2-3 meshes. |

## Worked Problems

### P1. Two meshes share a $2\,\Omega$ resistor. Mesh 1 contains a $16\,\mathrm{V}$ source and a $4\,\Omega$ resistor; mesh 2 contains a $4\,\mathrm{V}$ source and an $8\,\Omega$ resistor. Both sources aid their clockwise mesh current. Find $i_1$, $i_2$ and the current through the shared resistor.

**Given:** V1 = 16 V; R1 = 4 Ω; R2 = 2 Ω (shared); R3 = 8 Ω; V2 = 4 V

**Solution:**

1. Mesh 1 KVL: 16 = 4 i1 + 2(i1 - i2) → 6 i1 - 2 i2 = 16 → 3 i1 - i2 = 8
2. Mesh 2 KVL: 4 = 2(i2 - i1) + 8 i2 → -2 i1 + 10 i2 = 4 → -i1 + 5 i2 = 2
3. From the second equation i1 = 5 i2 - 2; substitute: 3(5 i2 - 2) - i2 = 8
4. 14 i2 - 6 = 8 → i2 = 1 A, so i1 = 5(1) - 2 = 3 A
5. Shared branch: i1 - i2 = 3 - 1 = 2 A flowing in the direction of i1

> [!success]- Answer
> **$i_1 = 3\,\mathrm{A}$, $i_2 = 1\,\mathrm{A}$, and $2\,\mathrm{A}$ through the shared $2\,\Omega$**

> [!warning] Trap
> Writing the shared term in mesh 2 as $+R_2(i_1 - i_2)$ instead of $-R_2(i_1 - i_2)$. Travelling clockwise in mesh 2 you go *up* through the shared resistor while $i_1$ drives current *down* it, so the two currents oppose.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` `1` (two unknowns) and type the coefficients only: 3, −1, 8 then −1, 5, 2 for $3i_1-i_2=8$ and $-i_1+5i_2=2$.
> 2. $\rightarrow$ $i_1$ = **3** A (Cramer: $(8\times5-(-1)\times2)\div14$ = 42/14), $i_2$ = **1** A, so $i_1-i_2$ = **2** A in the shared $2\,\Omega$.

### P2. Two meshes share a branch containing only a $2\,\mathrm{A}$ current source whose arrow points in the direction of $i_2$. Mesh 1 contains a $12\,\mathrm{V}$ source and a $3\,\Omega$ resistor; mesh 2 contains a $3\,\Omega$ resistor. Find both mesh currents.

**Given:** V = 12 V; R1 = 3 Ω; R2 = 3 Ω; I_s = 2 A with i2 - i1 = 2 A

**Solution:**

1. The shared branch has no resistor, so use a supermesh around the outer boundary: 12 - 3 i1 - 3 i2 = 0
2. That gives i1 + i2 = 4
3. Constraint from the current source: i2 - i1 = 2
4. Adding the two equations: 2 i2 = 6 → i2 = 3 A, and i1 = 4 - 3 = 1 A

> [!success]- Answer
> **$i_1 = 1\,\mathrm{A}$, $i_2 = 3\,\mathrm{A}$**

> [!warning] Trap
> Including the current-source branch in the supermesh KVL. That branch has no known resistance, so it must be left out of the loop; its effect enters only through the constraint equation.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. Substitute the constraint $i_2=i_1+2$ into the supermesh KVL $12-3i_1-3i_2=0$ to get $i_1+i_2=4$; enter `MODE` `5` `1` with 1, 1, 4 then −1, 1, 2.
> 2. $\rightarrow$ $i_1$ = **1** A, $i_2$ = **3** A. The constraint difference is the device itself, so the system stays 2×2.

### P3. Mesh 1 has a $10\,\mathrm{V}$ source and a $4\,\Omega$ resistor. It shares a $2\,\mathrm{A}$ current source (arrow in the direction of $i_2$) with mesh 2, which contains $6\,\Omega$ and $2\,\Omega$ resistors. Find both mesh currents and the voltage across the current source.

**Given:** V = 10 V; R1 = 4 Ω; I_s = 2 A; mesh 2 resistors: 6 Ω and 2 Ω

**Solution:**

1. Constraint: i2 - i1 = 2, so i1 = i2 - 2
2. Supermesh KVL (outer boundary, source branch excluded): 10 = 4 i1 + (6 + 2) i2
3. Substitute: 10 = 4(i2 - 2) + 8 i2 = 12 i2 - 8 → 12 i2 = 18
4. i2 = 1.5 A and i1 = 1.5 - 2 = -0.5 A
5. KVL in mesh 1 alone: 10 - 4 i1 - v_cs = 0 → v_cs = 10 - 4(-0.5) = 12 V
6. Check mesh 2: 12 - 6(1.5) - 2(1.5) = 12 - 9 - 3 = 0 ✓

> [!success]- Answer
> **$i_1 = -0.5\,\mathrm{A}$, $i_2 = 1.5\,\mathrm{A}$, $v_{cs} = 12\,\mathrm{V}$ across the current source**

> [!warning] Trap
> Discarding the negative mesh current as impossible. A negative mesh current simply means the real current in that window circulates counter-clockwise; it is not an error, and it is exactly what makes the source voltage come out to 12 V.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. Bake in $i_1=i_2-2$, so the supermesh $10=4i_1+8i_2$ becomes $12i_2=18$; enter `MODE` `5` `1` with 1, −1, −2 for $i_1-i_2=-2$ and 0, 12, 18.
> 2. $\rightarrow$ $i_1$ = **−0.5** A, $i_2$ = **1.5** A; the source voltage is $10-4i_1$ = **12** V.

### P4. Mesh 1 has a $12\,\mathrm{V}$ source and a $3\,\Omega$ resistor; it shares a $4\,\Omega$ resistor with mesh 2, which also contains a $4\,\Omega$ resistor and a current-controlled voltage source of value $2i_x$ that aids $i_2$, where $i_x$ is the mesh current $i_1$. Find $i_1$ and $i_2$.

**Given:** V = 12 V; R1 = 3 Ω; R2 = 4 Ω (shared); R3 = 4 Ω; CCVS = 2 i_x, i_x = i_1

**Solution:**

1. Mesh 1: 12 = 3 i1 + 4(i1 - i2) → 7 i1 - 4 i2 = 12
2. Mesh 2: the dependent source aids i2, so it is a rise: 4(i2 - i1) + 4 i2 + 2 i1 = 0
3. Collect: (2 - 4) i1 + 8 i2 = 0 → -2 i1 + 8 i2 = 0 → i1 = 4 i2
4. Substitute: 7(4 i2) - 4 i2 = 12 → 24 i2 = 12 → i2 = 0.5 A, i1 = 2 A
5. Check mesh 2 numerically: 4(0.5 - 2) + 4(0.5) + 2(2) = -6 + 2 + 4 = 0 ✓

> [!success]- Answer
> **$i_1 = 2\,\mathrm{A}$, $i_2 = 0.5\,\mathrm{A}$**

> [!warning] Trap
> Substituting the dependent-source value after solving. The controlling current $i_x$ is an unknown mesh current, so $2i_x$ must be replaced by $2i_1$ inside the KVL equation, which couples the two equations.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. Fold the dependent source into the coefficients first: mesh 2 is $4(i_2-i_1)+4i_2+2i_1=0 \rightarrow -2i_1+8i_2=0$. Enter `MODE` `5` `1`: 7, −4, 12 then −2, 8, 0.
> 2. $\rightarrow$ $i_1$ = **2** A, $i_2$ = **0.5** A. Verify in `COMP`: `4×(0.5−2)+4×0.5+2×2` = **0**, so $i_x=i_1$ closed the loop.

### P5. Mesh 1 is bounded on its outer left branch by a $3\,\mathrm{A}$ current source circulating clockwise. It shares a $4\,\Omega$ resistor with mesh 2, whose outer branch contains an $18\,\mathrm{V}$ source and a $2\,\Omega$ resistor. Find both mesh currents and the current in the shared resistor.

**Given:** I_s = 3 A on mesh 1's outer branch; R_shared = 4 Ω; V = 18 V; R3 = 2 Ω

**Solution:**

1. The current source is unshared, so it fixes the mesh current directly: i1 = 3 A
2. Mesh 2 KVL: 18 = 4(i2 - i1) + 2 i2 = 4(i2 - 3) + 2 i2
3. 18 = 6 i2 - 12 → 6 i2 = 30 → i2 = 5 A
4. Shared resistor current: i2 - i1 = 2 A in the direction of i2
5. Check: 4(2) + 2(5) = 8 + 10 = 18 V ✓

> [!success]- Answer
> **$i_1 = 3\,\mathrm{A}$ (forced), $i_2 = 5\,\mathrm{A}$, and $2\,\mathrm{A}$ through the $4\,\Omega$**

> [!warning] Trap
> Building a supermesh for a current source that lies on the outer boundary. A supermesh is only needed when the source is shared by two meshes; here the source simply sets $i_1 = 3\,\mathrm{A}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. The boundary source fixes the current, so there is no system: `3` → $i_1$ = **3** A.
> 2. Mesh 2 is the single equation $18=4(i_2-3)+2i_2=6i_2-12$; chain `(18+12)÷6` → $i_2$ = **5** A, then `Ans−3` → **2** A in the shared $4\,\Omega$.

### P6. A three-mesh chain: a $20\,\mathrm{V}$ source with a $3\,\Omega$ resistor in mesh 1, a $4\,\Omega$ resistor shared by meshes 1 and 2, an $8\,\Omega$ resistor shared by meshes 2 and 3, and an $8\,\Omega$ resistor closing mesh 3. Find all three mesh currents.

**Given:** V = 20 V; R1 = 3 Ω; R12 = 4 Ω; R23 = 8 Ω; R3 = 8 Ω

**Solution:**

1. Mesh 1: 20 = 3 i1 + 4(i1 - i2) → 7 i1 - 4 i2 = 20
2. Mesh 2: 4(i2 - i1) + 8(i2 - i3) = 0 → -4 i1 + 12 i2 - 8 i3 = 0 → -i1 + 3 i2 - 2 i3 = 0
3. Mesh 3: 8(i3 - i2) + 8 i3 = 0 → -8 i2 + 16 i3 = 0 → i3 = i2/2
4. Substitute i3: -i1 + 3 i2 - i2 = 0 → i1 = 2 i2
5. Then 7(2 i2) - 4 i2 = 20 → 10 i2 = 20 → i2 = 2 A, i1 = 4 A, i3 = 1 A
6. Check mesh 3: 8(1 - 2) + 8(1) = -8 + 8 = 0 ✓

> [!success]- Answer
> **$i_1 = 4\,\mathrm{A}$, $i_2 = 2\,\mathrm{A}$, $i_3 = 1\,\mathrm{A}$**

> [!warning] Trap
> Writing mesh 2's shared terms with a plus sign for both neighbours. Each shared resistor contributes a negative coefficient, so mesh 2 is $-4i_1 + 12i_2 - 8i_3 = 0$; flipping either sign breaks the symmetry of the matrix and the answer.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` `2` (three unknowns), coefficients only: 7, −4, 0, 20 then −1, 3, −2, 0 then 0, −8, 16, 0.
> 2. $\rightarrow$ $i_1$ = **4** A, $i_2$ = **2** A, $i_3$ = **1** A; mesh 3 checks as `8×(1−2)+8×1` = **0**.

### P7. A $24\,\mathrm{V}$ source with a $4\,\Omega$ resistor forms mesh 1. A $4\,\Omega$ resistor is shared by meshes 1 and 2. Meshes 2 and 3 share a $2\,\mathrm{A}$ current source whose arrow points in the direction of $i_3$, and mesh 3 contains a $2\,\Omega$ resistor. Find the current delivered by the $24\,\mathrm{V}$ source.

**Given:** V = 24 V; R1 = 4 Ω; R12 = 4 Ω; I_s = 2 A shared by meshes 2 and 3; R3 = 2 Ω

**Solution:**

1. Mesh 1 (no supermesh involved): 24 = 4 i1 + 4(i1 - i2) → 8 i1 - 4 i2 = 24 → 2 i1 - i2 = 6
2. Meshes 2 and 3 form a supermesh: 4(i2 - i1) + 2 i3 = 0
3. Constraint: i3 - i2 = 2, so i2 = i3 - 2
4. Substitute: 4(i3 - 2 - i1) + 2 i3 = 0 → -4 i1 + 6 i3 = 8 → -2 i1 + 3 i3 = 4
5. From mesh 1, i1 = 3 + i2/2 = 3 + (i3 - 2)/2 = 2 + i3/2
6. Substitute: -2(2 + i3/2) + 3 i3 = 4 → -4 - i3 + 3 i3 = 4 → 2 i3 = 8 → i3 = 4 A
7. i2 = 2 A and i1 = 2 + 2 = 4 A
8. The 24 V source carries i1, so it delivers 4 A

> [!success]- Answer
> **$i_1 = 4\,\mathrm{A}$ delivered by the $24\,\mathrm{V}$ source ($96\,\mathrm{W}$)**

> [!warning] Trap
> Treating the whole circuit as one supermesh. Only meshes 2 and 3 are merged; mesh 1 still has its own ordinary KVL equation, because no current source is shared between mesh 1 and mesh 2.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. Write the constraint into row 3 and the supermesh without it: 2, −1, 0, 6 then −4, 4, 2, 0 then 0, −1, 1, 2. Enter with `MODE` `5` `2`.
> 2. $\rightarrow$ $i_1$ = **4** A, $i_2$ = **2** A, $i_3$ = **4** A, so the 24 V source delivers **4** A (96 W).

### P8. Mesh analysis of a network gives $i_1 = 4\,\mathrm{A}$, $i_2 = 2\,\mathrm{A}$ and $i_3 = 1\,\mathrm{A}$, all clockwise. The branch shared by meshes 2 and 3 contains an $8\,\Omega$ resistor. Find the current through that resistor, its direction, and the voltage across it.

**Given:** i1 = 4 A; i2 = 2 A; i3 = 1 A; shared resistor = 8 Ω between meshes 2 and 3

**Solution:**

1. The branch is shared only by meshes 2 and 3, so the physical current is the difference i2 - i3
2. i = 2 - 1 = 1 A, flowing in the direction of i2 (clockwise in mesh 2, i.e. downward through the shared branch)
3. v = i R = (1)(8) = 8 V, positive at the terminal the current enters

> [!success]- Answer
> **$i = 1\,\mathrm{A}$ in the direction of $i_2$, and $v = 8\,\mathrm{V}$ across the $8\,\Omega$**

> [!warning] Trap
> Adding the mesh currents (2 + 1 = 3 A) on the shared branch. Shared branches carry a difference, never a sum, because the two window currents flow in opposite directions through that branch.

## Traps & Exam Notes

- **Sign of the shared-resistor term.** If both mesh currents are clockwise, every shared resistor appears as $-R(i_k - i_j)$ in mesh $k$. Writing $+R(i_k - i_j)$ flips the coupling and usually produces a plausible-looking but wrong answer.
- **Including the current-source branch in a supermesh KVL.** The supermesh loop must exclude the branch that holds the shared current source, because its voltage is unknown. Including it silently assumes a zero drop.
- **Getting the supermesh constraint backwards.** With clockwise mesh currents, an arrow pointing down the shared branch (the direction of $i_2$) gives $i_2 - i_1 = I_s$. Reverse the arrow and the equation reverses; guessing the sign is the single most common supermesh error.
- **Building a supermesh for a boundary current source.** If the source is not shared, it simply fixes that mesh current: $i_k = \pm I_s$. Only shared current sources require a supermesh.
- **Substituting a dependent source only after solving.** $v_{dep} = k i_x$ must be rewritten in terms of mesh currents *inside* the KVL equation, otherwise the equations stay uncoupled and the answer is wrong.
- **Adding mesh currents on a shared branch.** The physical branch current is $i_k - i_j$, not $i_k + i_j$.
- **Forgetting that mesh analysis needs a planar circuit.** Once two branches must cross with no shared node, mesh analysis as taught does not apply — use nodal analysis instead.
- **Ignoring a negative mesh current.** A negative result is a direction, not an error. Discarding the sign throws away the answer to any follow-up question about a source's voltage or power.

## See Also

- [[05_Nodal_Analysis_and_Supernodes]]
- [[02_KCL,_KVL,_Series_and_Parallel_Reduction]]
- [[06_Superposition_Theorem]]
- [[17_Cramer’s_Rule_and_Linear_Systems]]

---

[[03_Delta-Wye_Transformations|⬅ 03]] · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Nodal_Analysis_and_Supernodes|05 ➡]]
