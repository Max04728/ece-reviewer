---
id: ECE-01-07
title: "Thevenin and Norton Equivalents"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 7
tier: 1
depth: full
problem_count: 10
prereqs: ["[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]", "[[05_Nodal_Analysis_and_Supernodes]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Thevenin and Norton Equivalents

> [!abstract] Scope
> Replace any linear two-terminal network by a single voltage source in series with one resistance, or the Norton dual, and use it to find a load current.

## Core Concept

> [!tip] Intuition
> Viewed from two terminals, a whole linear network behaves like one battery with one internal resistance. You never have to know what is inside — only its open-circuit voltage and how much the terminal voltage sags when you draw current.

**The theorem.** Any linear two-terminal network — resistors, independent sources and dependent sources, however arranged — is electrically identical, at its terminals, to a single voltage source $V_{Th}$ in series with a single resistance $R_{Th}$. 'Electrically identical' means that for every possible load, the terminal voltage and current are the same. Linear means the elements obey Ohm's law and superposition; a diode or a saturated transistor has no Thévenin equivalent.

**Finding $V_{Th}$.** $V_{Th}$ is exactly the open-circuit terminal voltage: remove the load, and solve the remaining network for the voltage between the two terminals. Any method works — series-parallel reduction, nodal analysis, mesh analysis, or superposition when there are several independent sources.

**Finding $R_{Th}$ — method 1, kill the sources.** Turn off every *independent* source (voltage source $\to$ short circuit, current source $\to$ open circuit), leave every dependent source in place, and reduce the dead network to a single resistance between the terminals. A resistor in parallel with an ideal voltage source, or in series with an ideal current source, contributes nothing to $R_{Th}$ once that source is killed.

**Finding $R_{Th}$ — method 2, the ratio test.** Compute the short-circuit current $I_{sc}$ and use $R_{Th} = V_{oc}/I_{sc}$. This is mandatory when the network contains a dependent source whose controlling quantity disappears when you kill the independent sources — the dead network is not passive and method 1 gives the wrong number. A third route is the test-source method: kill the independent sources, apply a 1 A test current (or 1 V test source) at the terminals, and take $R_{Th} = v_{test}/i_{test}$.

**The Norton dual.** The same network can be written as a current source $I_N = I_{sc}$ in parallel with $R_N = R_{Th}$. The two forms are related by source transformation, $V_{Th} = I_NR_N$, so either one can be converted into the other. A Thévenin source with $R_{Th}$ in series is transformed by moving the resistance into parallel and converting the source to $I_s = V_s/R$; the resistance value never changes.

**Why the method earns its keep.** Once the equivalent is in hand, any load question is one line:
$$i_L = V_{Th}/(R_{Th}+R_L)$$
and $v_L = V_{Th}R_L/(R_{Th}+R_L)$. It also makes the maximum-power condition obvious, and it is the standard way to reduce a messy bias network to something a textbook can analyse.

**Where it fails.** Only linear networks qualify, and the equivalent is valid only as seen from those two terminals — you cannot use it to reason about power dissipated inside the original network. Note also that $R_{Th}$ can be negative when dependent sources are present; that is legal in the model and simply means the port can deliver more power than a passive source.

## Derivation

**Why an equivalent exists at all.** For a linear network the port relation is a straight line, $v = V_{oc} - i R_{Th}$. Linearity means the terminal voltage is an affine function of the terminal current: driving the port with a current $i$ superposes the network's own response $V_{oc}$ (with the port open) and the response to $i$ (with all independent sources killed, giving $-iR_{Th}$). Any affine $v$-$i$ relation is exactly the terminal relation of a voltage source $V_{oc}$ behind a resistance $R_{Th}$.

**$R_{Th}$ from the two operating points.** The affine relation $v = V_{oc} - iR_{Th}$ passes through the open-circuit point $(i = 0,\ v = V_{oc})$ and the short-circuit point $(i = I_{sc},\ v = 0)$. Substituting the second gives $0 = V_{oc} - I_{sc}R_{Th}$, so $R_{Th} = V_{oc}/I_{sc}$. This is why the ratio test works even when dependent sources prevent a passive reduction.

**Source transformation.** A voltage source $V_s$ in series with $R$ has the terminal relation $v = V_s - iR$. A current source $I_s$ in parallel with $R$ has $i = I_s - v/R$, which rearranges to $v = I_sR - iR$. The two relations are identical when

$$I_s = \frac{V_s}{R} \qquad \Longleftrightarrow \qquad V_s = I_s R$$

so the pair may be swapped freely at any port — but only around that port; interior branch currents are not preserved.

**Load solution.** With $R_L$ across the terminals, KVL around the Thévenin loop gives $V_{Th} = i_L(R_{Th}+R_L)$, so $i_L = V_{Th}/(R_{Th}+R_L)$ and $v_L = i_LR_L$. The load power is $P_L = i_L^2R_L$, which peaks at $R_L = R_{Th}$.

**Norton to Thévenin.** Combining $I_N$ in parallel with $R_N$: the open-circuit voltage is $V_{oc} = I_NR_N$ and the short-circuit current is $I_N$ itself, so $V_{Th} = I_NR_N$ and $R_{Th} = R_N$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Thévenin voltage | $V_{Th} = v_{oc}$ | The open-circuit voltage between the terminals, load removed. Sign follows your chosen terminal polarity. |
| Thévenin resistance, sources killed | $R_{Th} = R_{eq} \mathrm{\ with\ independent\ sources\ off}$ | Voltage sources shorted, current sources opened. Dependent sources stay active. |
| Thévenin resistance from the ratio test | $R_{Th} = \frac{V_{oc}}{I_{sc}}$ | Mandatory when dependent sources are present, or the only independent source is inside the port. |
| Test-source method | $R_{Th} = \frac{v_{test}}{i_{test}}$ | Kill independent sources, apply 1 A or 1 V at the port, and read the other quantity. |
| Norton current | $I_N = I_{sc}$ | The current that flows when the terminals are shorted. |
| Norton resistance | $R_N = R_{Th}$ | Same number in both models; only the source form changes. |
| Thévenin-Norton conversion | $V_{Th} = I_N R_N, \qquad I_N = \frac{V_{Th}}{R_{Th}}$ | Source transformation. R is unchanged by the conversion. |
| Source transformation | $V_s \mathrm{\ in\ series\ with\ } R \;\equiv\; I_s = \frac{V_s}{R} \mathrm{\ in\ parallel\ with\ } R$ | Only valid around the port; it does not preserve internal branch currents. |
| Load current from the equivalent | $i_L = \frac{V_{Th}}{R_{Th} + R_L}$ | The single line that makes the whole method worth it. |
| Load voltage | $v_L = V_{Th}\,\frac{R_L}{R_{Th} + R_L}$ | A voltage-divider restatement; equals V_Th when R_L is infinite. |
| Load power | $P_L = i_L^2 R_L = \frac{V_{Th}^2 R_L}{(R_{Th}+R_L)^2}$ | Maximised at R_L = R_Th, where P_max = V_Th^2/(4R_Th). |

## Interactive Widget

**Thevenin Equivalent Builder**

![[Thevenin_Equivalent_Builder.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find the Thévenin equivalent at terminals a-b for a $12\,\mathrm{V}$ source in series with $4\,\Omega$ feeding a node, with $12\,\Omega$ from that node to terminal b (ground). Terminal a is the node.

**Given:** V_s = 12 V; R1 = 4 Ω (series); R2 = 12 Ω (node to ground); terminals a = node, b = ground

**Solution:**

1. Open circuit: the 12 Ω carries the full divider current, so V_Th = 12 x 12/(4 + 12)
2. V_Th = 144/16 = 9 V
3. Kill the 12 V source (short it) and look in at a-b: 4 Ω is now in parallel with 12 Ω
4. R_Th = (4)(12)/16 = 3 Ω

> [!success]- Answer
> **$V_{Th} = 9\,\mathrm{V}$ in series with $R_{Th} = 3\,\Omega$**

> [!warning] Trap
> Reporting R_Th = 4 + 12 = 16 Ω. With the source shorted the two resistors share the same two nodes, so they combine in parallel, not in series.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `12×12÷(4+12) : 4×12÷(4+12)`
> 2. $V_{Th}$ = **9** V → $R_{Th}$ = **3** Ω. Check with the short-circuit current `9÷3` = **3** A = `12÷4`.

### P2. A $24\,\mathrm{V}$ ideal source holds node A at $24\,\mathrm{V}$. A $6\,\Omega$ resistor is connected from node A to ground in parallel with that source. A $3\,\Omega$ resistor runs from node A to node B, and a $6\,\Omega$ resistor runs from node B to ground. Find the Thévenin equivalent at node B with respect to ground.

**Given:** V = 24 V (node A fixed); R_parallel = 6 Ω at node A; R1 = 3 Ω (A to B); R2 = 6 Ω (B to ground)

**Solution:**

1. Open circuit: node B draws no current, so KCL at B gives (v_B - 24)/3 + v_B/6 = 0
2. Multiply by 6: 2(v_B - 24) + v_B = 0 → 3 v_B = 48 → v_B = 16 V, so V_Th = 16 V
3. Kill the 24 V source by shorting it: node A is now ground, so the 6 Ω at node A is shorted out and contributes nothing
4. Looking into B: 3 Ω from B to the grounded A, in parallel with 6 Ω from B to ground → R_Th = 3 ∥ 6 = 2 Ω
5. Check the short-circuit current: B shorted to ground gives 24/3 = 8 A, and 16/2 = 8 A ✓

> [!success]- Answer
> **$V_{Th} = 16\,\mathrm{V}$, $R_{Th} = 2\,\Omega$**

> [!warning] Trap
> Carrying the 6 Ω at node A into the R_Th calculation. A resistor in parallel with an ideal voltage source is shorted out when that source is killed, and it also plays no role in V_oc — it is pure decoration.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Open circuit at B, one chain with `ALPHA` `:` — `24×6÷(3+6) : 3×6÷(3+6)`
> 2. $V_{Th}$ = **16** V → $R_{Th}$ = **2** Ω. The short-circuit check `24÷3` = **8** A = `16÷2` confirms it.
>
> The $6\,\Omega$ at node A is shorted out when the ideal source is killed, so it never reaches $R_{Th}$.

### P3. A $12\,\mathrm{V}$ source feeds node X through a $4\,\Omega$ resistor. From node X to ground there is a voltage-controlled current source of value $0.5v_X$. Terminals a-b are node X and ground. Find the Thévenin equivalent.

**Given:** V = 12 V; R1 = 4 Ω; VCCS = 0.5 v_X from X to ground; a = node X, b = ground

**Solution:**

1. Open circuit: KCL at X gives (v_X - 12)/4 + 0.5 v_X = 0
2. 0.25 v_X - 3 + 0.5 v_X = 0 → 0.75 v_X = 3 → v_X = 4 V, so V_Th = 4 V
3. For R_Th, kill the 12 V source and apply a 1 A test current into X
4. KCL at X: v_test/4 + 0.5 v_test = 1 → 0.75 v_test = 1 → v_test = 1.333 V
5. R_Th = v_test/i_test = 1.333/1 = 1.333 Ω

> [!success]- Answer
> **$V_{Th} = 4\,\mathrm{V}$ in series with $R_{Th} = 4/3\,\Omega \approx 1.33\,\Omega$**

> [!warning] Trap
> Killing the dependent source along with the independent one. Only independent sources are turned off; the VCCS stays in the dead network and is exactly what makes R_Th = 1.333 Ω instead of 4 Ω.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Both unknowns are single equations, so no mode change: `(12÷4)÷(0.25+0.5)` → $V_{Th}$ = **4** V.
> 2. Dead network with a 1 A test current: `1÷(0.25+0.5)` → $v_{test}$ = **1.333** V, so $R_{Th}$ = **1.333** Ω = **4/3** Ω.

### P4. A $20\,\mathrm{V}$ source in series with $5\,\Omega$ drives a load, and a $20\,\Omega$ resistor is connected directly across the load terminals. Find the Norton equivalent at those terminals, then convert it to Thévenin.

**Given:** V_s = 20 V; R1 = 5 Ω (series with the source); R2 = 20 Ω (across the terminals)

**Solution:**

1. Short the terminals: the 20 Ω is bypassed, so I_N = I_sc = 20/5 = 4 A
2. Kill the 20 V source: R_N = 5 ∥ 20 = (5)(20)/25 = 4 Ω
3. Convert: V_Th = I_N R_N = (4)(4) = 16 V
4. Check with the open-circuit voltage: 20 x 20/25 = 16 V ✓

> [!success]- Answer
> **$I_N = 4\,\mathrm{A}$ in parallel with $R_N = 4\,\Omega$, equivalently $V_{Th} = 16\,\mathrm{V}$ in series with $4\,\Omega$**

> [!warning] Trap
> Computing I_N with the 20 Ω included in series (20/(5+20) = 0.8 A). In the short-circuit test the parallel resistor is shorted out and carries no current.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `20÷5 : 5×20÷(5+20) : Ans×4`
> 2. $I_N$ = **4** A → $R_N$ = **4** Ω → $V_{Th}$ = **16** V, which the open-circuit voltage `20×20÷25` reproduces.

### P5. At node B, three branches meet: a $12\,\mathrm{V}$ source in series with $3\,\Omega$, a $6\,\mathrm{V}$ source in series with $6\,\Omega$, and a $6\,\Omega$ resistor to ground. Find the Thévenin equivalent at node B with respect to ground.

**Given:** V1 = 12 V with R1 = 3 Ω; V2 = 6 V with R2 = 6 Ω; R3 = 6 Ω to ground

**Solution:**

1. Open circuit, KCL at B: (v_B - 12)/3 + (v_B - 6)/6 + v_B/6 = 0
2. Multiply by 6: 2(v_B - 12) + (v_B - 6) + v_B = 0 → 4 v_B - 30 = 0
3. v_B = 7.5 V, so V_Th = 7.5 V
4. Kill both sources: R_Th = 3 ∥ 6 ∥ 6 = 2 ∥ 6 = (2)(6)/8 = 1.5 Ω
5. Check the short-circuit current: 12/3 + 6/6 = 4 + 1 = 5 A, and V_Th/R_Th = 7.5/1.5 = 5 A ✓

> [!success]- Answer
> **$V_{Th} = 7.5\,\mathrm{V}$ in series with $R_{Th} = 1.5\,\Omega$**

> [!warning] Trap
> Writing the second source's term as (6 - v_B)/6. The polarity convention must be the same for every branch; if the 6 V source drives current into B, its contribution is +(v_B - 6)/6 because a larger v_B pushes more current back into that source.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Open-circuit node voltage with `ALPHA` `:` — `12÷3+6÷6 : 1÷3+1÷6+1÷6 : Ans÷Ans` → numerator **5** A, denominator **0.8333** S, $V_{Th}$ = **7.5** V.
> 2. Kill both sources and chain `1÷(1÷3+1÷6+1÷6)` → $R_{Th}$ = **1.5** Ω; the short-circuit current `12÷3+6÷6` = **5** A matches `7.5÷1.5`.

### P6. A network has the Thévenin equivalent $V_{Th} = 16\,\mathrm{V}$, $R_{Th} = 2\,\Omega$. A $6\,\Omega$ load is connected. Find the load current, the load voltage and the load power.

**Given:** V_Th = 16 V; R_Th = 2 Ω; R_L = 6 Ω

**Solution:**

1. i_L = V_Th/(R_Th + R_L) = 16/(2 + 6) = 2 A
2. v_L = i_L R_L = (2)(6) = 12 V
3. P_L = i_L^2 R_L = (2^2)(6) = 24 W
4. Check: the source delivers 16 x 2 = 32 W; R_Th burns 2^2 x 2 = 8 W; 8 + 24 = 32 W ✓

> [!success]- Answer
> **$i_L = 2\,\mathrm{A}$, $v_L = 12\,\mathrm{V}$, $P_L = 24\,\mathrm{W}$**

> [!warning] Trap
> Connecting the full 16 V across the 6 Ω load (giving 42.7 W). The internal resistance takes part of the source voltage, and the harder you load the port the more it takes.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain with `ALPHA` `:` — `16÷(2+6) : Ans×6 : Ans×2`
> 2. $i_L$ = **2** A → $v_L$ = **12** V → $P_L$ = **24** W. The budget also closes: `16×2 : 2²×2 : Ans−Ans` gives 32 W − 8 W = **24** W.

### P7. A $4\,\mathrm{A}$ current source is in parallel with a $12\,\Omega$ resistor. From the top node, a $4\,\Omega$ resistor runs to terminal a; terminal b is the common bottom node. Find the Thévenin and Norton equivalents at a-b.

**Given:** I_s = 4 A; R1 = 12 Ω (parallel with the source); R2 = 4 Ω (top node to a); b = common node

**Solution:**

1. Open circuit: no current flows through R2, so v_top = I_s R1 = 4 x 12 = 48 V and V_Th = 48 V
2. Kill the current source (open it): the path from a to b is R2 in series with R1 → R_Th = 12 + 4 = 16 Ω
3. I_N = V_Th/R_Th = 48/16 = 3 A

> [!success]- Answer
> **$V_{Th} = 48\,\mathrm{V}$ with $R_{Th} = 16\,\Omega$; equivalently $I_N = 3\,\mathrm{A}$ with $R_N = 16\,\Omega$**

> [!warning] Trap
> Killing the current source and then treating the 12 Ω as parallel with the 4 Ω. With the source opened, the 12 Ω is left in the only remaining path, so the two resistors are in series.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `4×12 : 12+4 : Ans÷Ans`
> 2. $V_{Th}$ = **48** V → $R_{Th}$ = **16** Ω → $I_N$ = **3** A in parallel with the same $16\,\Omega$.

### P8. A $12\,\mathrm{V}$ source feeds node X through $4\,\Omega$. Node X has a voltage-controlled current source $0.25v_X$ to ground, and terminals a-b are node X and ground. Use the open-circuit / short-circuit ratio to find $R_{Th}$.

**Given:** V = 12 V; R1 = 4 Ω; VCCS = 0.25 v_X to ground; a = X, b = ground

**Solution:**

1. Open circuit: (v_X - 12)/4 + 0.25 v_X = 0 → 0.25 v_X - 3 + 0.25 v_X = 0 → v_X = 6 V, so V_oc = 6 V
2. Short circuit: v_X = 0, so the dependent source current is zero and I_sc = 12/4 = 3 A
3. R_Th = V_oc/I_sc = 6/3 = 2 Ω
4. Cross-check with a 1 A test source on the dead network: v/4 + 0.25 v = 1 → 0.5 v = 1 → v = 2 V → R_Th = 2 Ω ✓

> [!success]- Answer
> **$V_{Th} = 6\,\mathrm{V}$, $R_{Th} = 2\,\Omega$, $I_N = 3\,\mathrm{A}$**

> [!warning] Trap
> Assuming the short-circuit current equals the source current 12/4 = 3 A only by luck here — in general the dependent source may not vanish when the port is shorted, so I_sc must be re-solved, not guessed.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Open circuit: `(12÷4)÷(0.25+0.25)` → $V_{oc}$ = **6** V.
> 2. Short circuit kills the VCCS, so `12÷4` = $I_{sc}$ = **3** A; then `6÷3` → $R_{Th}$ = **2** Ω, matching the test-source cross-check `1÷(0.25+0.25)`.

### P9. With the load removed, a network's terminals read $12\,\mathrm{V}$. With a $4\,\Omega$ load attached, the terminal voltage falls to $8\,\mathrm{V}$. Find $R_{Th}$ and the short-circuit current.

**Given:** V_oc = 12 V; v_L = 8 V with R_L = 4 Ω

**Solution:**

1. Load current: i_L = v_L/R_L = 8/4 = 2 A
2. KVL around the Thévenin loop: 12 = i_L(R_Th + 4) → 12 = 2(R_Th + 4)
3. R_Th + 4 = 6 → R_Th = 2 Ω
4. I_sc = V_oc/R_Th = 12/2 = 6 A

> [!success]- Answer
> **$R_{Th} = 2\,\Omega$ and $I_{sc} = 6\,\mathrm{A}$**

> [!warning] Trap
> Dividing the terminal voltage by the load current to get R_Th (8/2 = 4 Ω). The 8 V is across the LOAD; the internal resistance sees only the difference 12 - 8 = 4 V, which gives R_Th = 4/2 = 2 Ω.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Load current divides out: `8÷4` → $i_L$ = **2** A, then `12÷2−4` → $R_{Th}$ = **2** Ω.
> 2. `12÷2` → $I_{sc}$ = **6** A, the same value the Thévenin resistance predicts.

### P10. A $12\,\mathrm{V}$ source with $3\,\Omega$, a $6\,\mathrm{V}$ source with $6\,\Omega$, and a $6\,\Omega$ resistor all meet at node B (the network whose equivalent is $V_{Th} = 7.5\,\mathrm{V}$, $R_{Th} = 1.5\,\Omega$). A $3\,\Omega$ resistor is now connected from node B to ground. Find the current through it.

**Given:** V_Th = 7.5 V; R_Th = 1.5 Ω; R_L = 3 Ω

**Solution:**

1. Replace everything except the load with its Thévenin equivalent
2. i_L = V_Th/(R_Th + R_L) = 7.5/(1.5 + 3) = 7.5/4.5
3. i_L = 1.667 A
4. Load voltage check: v_L = (1.667)(3) = 5 V

> [!success]- Answer
> **$i_L = 1.667\,\mathrm{A}$ through the $3\,\Omega$ load, with $5\,\mathrm{V}$ across it**

> [!warning] Trap
> Re-solving the whole network from scratch and mis-signing one of the two sources. The point of the equivalent is that the rest of the network has already been reduced; substituting the load into the one-line formula is the entire calculation.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain with `ALPHA` `:` — `7.5÷(1.5+3) : Ans×3`
> 2. $i_L$ = **1.667** A → $v_L$ = **5** V across the $3\,\Omega$ load.

## Traps & Exam Notes

- **Combining $R_{Th}$ in series when a killed source makes the resistors parallel.** Killing a voltage source shorts its two nodes, which usually puts the resistors that met at those nodes in parallel — the opposite of the series combination suggested by the original drawing.
- **Turning off dependent sources.** Only independent sources are killed. A dependent source stays active in the dead network and changes $R_{Th}$; if a controlling quantity disappears when the independent sources are killed, use $V_{oc}/I_{sc}$ or a test source instead.
- **Carrying a resistor that is in parallel with an ideal voltage source into $R_{Th}$.** When the source is shorted, that resistor is shorted too and contributes nothing.
- **Computing $I_{sc}$ with the parallel branch still in the circuit.** Shorting the terminals bypasses every element in parallel with the port, so those branches carry no current in the short-circuit test.
- **Using the Thévenin equivalent to reason about internal power.** The equivalent reproduces terminal behaviour only. Power dissipated in $R_{Th}$ is not the power dissipated inside the original network.
- **Applying the theorem to a nonlinear network.** Diodes, saturated transistors and lamps have no Thévenin equivalent; the port characteristic is a curve, not a straight line.
- **Forgetting that $V_{Th}$ needs a stated polarity.** Reversing the assumed terminal polarity flips the sign of $V_{Th}$ and of every downstream load current.
- **Confusing $R_{Th}$ with $R_N$.** They are numerically equal; only the source representation changes. Writing $R_N = 1/R_{Th}$ is a different (and wrong) operation.

## See Also

- [[08_Maximum_Power_Transfer_and_Source_Transformation]]
- [[06_Superposition_Theorem]]
- [[05_Nodal_Analysis_and_Supernodes]]
- [[02_KCL,_KVL,_Series_and_Parallel_Reduction]]

---

[[06_Superposition_Theorem|⬅ 06]] · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Maximum_Power_Transfer_and_Source_Transformation|08 ➡]]
