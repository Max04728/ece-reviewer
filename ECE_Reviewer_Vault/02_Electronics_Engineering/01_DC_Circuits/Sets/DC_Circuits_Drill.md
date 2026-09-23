---
title: "DC Circuits — Drill"
type: drill
area: 01_DC_Circuits
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 77
updated: 2026-09-23
---

# DC Circuits — Practice Drill

**8 problems** drawn from a pool of 77 across 12 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 01_DC_Circuits --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. Two meshes share a $2\,\Omega$ resistor. Mesh 1 contains a $16\,\mathrm{V}$ source and a $4\,\Omega$ resistor; mesh 2 contains a $4\,\mathrm{V}$ source and an $8\,\Omega$ resistor. Both sources aid their clockwise mesh current. Find $i_1$, $i_2$ and the current through the shared resistor.

**Given:** V1 = 16 V; R1 = 4 Ω; R2 = 2 Ω (shared); R3 = 8 Ω; V2 = 4 V

> [!success]- Answer
> **$i_1 = 3\,\mathrm{A}$, $i_2 = 1\,\mathrm{A}$, and $2\,\mathrm{A}$ through the shared $2\,\Omega$**

> [!warning] Trap
> Writing the shared term in mesh 2 as $+R_2(i_1 - i_2)$ instead of $-R_2(i_1 - i_2)$. Travelling clockwise in mesh 2 you go *up* through the shared resistor while $i_1$ drives current *down* it, so the two currents oppose.

<sub>from ECE-01-04</sub>

### 2. A $24\,\mathrm{V}$ source drives $8\,\Omega$ and $4\,\Omega$ in series. Find the voltage across the $8\,\Omega$ resistor and the current through it.

**Given:** V_s = 24 V; R1 = 8 Ω; R2 = 4 Ω, series

> [!success]- Answer
> **$v_{8\Omega} = 16\,\mathrm{V}$ with $i = 2\,\mathrm{A}$**

> [!warning] Trap
> Dividing 24 V evenly between the two resistors. The divider is proportional to resistance: v_8 = 24 x 8/12 = 16 V, and the 4 Ω gets only 8 V.

<sub>from ECE-01-02</sub>

### 3. Mesh 1 has a $12\,\mathrm{V}$ source and a $3\,\Omega$ resistor; it shares a $4\,\Omega$ resistor with mesh 2, which also contains a $4\,\Omega$ resistor and a current-controlled voltage source of value $2i_x$ that aids $i_2$, where $i_x$ is the mesh current $i_1$. Find $i_1$ and $i_2$.

**Given:** V = 12 V; R1 = 3 Ω; R2 = 4 Ω (shared); R3 = 4 Ω; CCVS = 2 i_x, i_x = i_1

> [!success]- Answer
> **$i_1 = 2\,\mathrm{A}$, $i_2 = 0.5\,\mathrm{A}$**

> [!warning] Trap
> Substituting the dependent-source value after solving. The controlling current $i_x$ is an unknown mesh current, so $2i_x$ must be replaced by $2i_1$ inside the KVL equation, which couples the two equations.

<sub>from ECE-01-04</sub>

### 4. A $4.7\ \text{k}\Omega$ resistor discharges a $2.2\ \mu\text{F}$ capacitor that was charged to $25\ \text{V}$. The switch opens at $t = 0$, leaving only the resistor across the capacitor. Find $v_C$ and the energy remaining at $t = 20\ \text{ms}$, plus the total energy delivered to the resistor from $t = 0$ onward.

**Given:** $R = 4.7\ \text{k}\Omega$; $C = 2.2\ \mu\text{F}$; $v_C(0^+) = 25\ \text{V}$; $t = 20\ \text{ms}$

> [!success]- Answer
> **$v_C(20\ \text{ms}) = 3.62\ \text{V}$, $w_C = 14.4\ \mu\text{J}$ remaining, with $673\ \mu\text{J}$ dissipated in the resistor**

> [!warning] Trap
> Solving the discharge with $x(\infty) = 0$ but leaving the initial value out of the exponent, i.e. writing $v_C = 25e^{-t}$ with $t$ in seconds. Because $\tau = 10.34\ \text{ms}$, the correct exponent at 20 ms is about $-1.93$, not $-20$; the error gives $v_C \approx 0$ and hides the fact that about $14.5\%$ of the initial voltage — and of the stored energy, since $w_C \propto v_C^2$ — is still there.

<sub>from ECE-01-11</sub>

### 5. A $24\,\mathrm{V}$ ideal source holds node A at $24\,\mathrm{V}$. A $6\,\Omega$ resistor is connected from node A to ground in parallel with that source. A $3\,\Omega$ resistor runs from node A to node B, and a $6\,\Omega$ resistor runs from node B to ground. Find the Thévenin equivalent at node B with respect to ground.

**Given:** V = 24 V (node A fixed); R_parallel = 6 Ω at node A; R1 = 3 Ω (A to B); R2 = 6 Ω (B to ground)

> [!success]- Answer
> **$V_{Th} = 16\,\mathrm{V}$, $R_{Th} = 2\,\Omega$**

> [!warning] Trap
> Carrying the 6 Ω at node A into the R_Th calculation. A resistor in parallel with an ideal voltage source is shorted out when that source is killed, and it also plays no role in V_oc — it is pure decoration.

<sub>from ECE-01-07</sub>

### 6. A $6\,\mathrm{V}$ source floats between node 2 (positive terminal) and node 3. Node 1 has $4\,\Omega$ to ground and $2\,\Omega$ to node 2; node 2 has $6\,\Omega$ to ground; node 3 has $3\,\Omega$ to ground. A $4\,\mathrm{A}$ source injects at node 1 and a $2\,\mathrm{A}$ source injects at node 2. Find all three node voltages and the current through the $6\,\mathrm{V}$ source.

**Given:** R(1-gnd) = 4 Ω; R(1-2) = 2 Ω; R(2-gnd) = 6 Ω; R(3-gnd) = 3 Ω; I1 = 4 A; I2 = 2 A; V_s = 6 V between nodes 2 and 3

> [!success]- Answer
> **$v_1 = 12\,\mathrm{V}$, $v_2 = 10\,\mathrm{V}$, $v_3 = 4\,\mathrm{V}$, and $1.333\,\mathrm{A}$ through the $6\,\mathrm{V}$ source ($8\,\mathrm{W}$ delivered)**

> [!warning] Trap
> Writing the supernode KCL as if only node 2 existed. The surface encloses BOTH nodes, so every resistor attached to either node contributes a term — including the 6 Ω at node 2 and the 3 Ω at node 3.

<sub>from ECE-01-05</sub>

### 7. At $t = 0^-$ the switch has been closed a long time, connecting a $6\ \text{k}\Omega$ and a $3\ \text{k}\Omega$ resistor in series across an $18\ \text{V}$ source, with a $20\ \mu\text{F}$ capacitor in parallel with the $3\ \text{k}\Omega$ resistor. At $t = 0$ the switch opens and removes the $18\ \text{V}$ source and the $6\ \text{k}\Omega$ resistor from the loop, leaving only the $3\ \text{k}\Omega$ resistor in series with $C$. Find $v_C(t)$ for $t > 0$ and its value at $t = 90\ \text{ms}$.

**Given:** $R_1 = 6\ \text{k}\Omega$, $R_2 = 3\ \text{k}\Omega$; $C = 20\ \mu\text{F}$; $V_s = 18\ \text{V}$; $t = 90\ \text{ms}$

> [!success]- Answer
> **$v_C(t) = 6e^{-t/0.06}\ \text{V}$ for $t>0$, so $v_C(90\ \text{ms}) = 1.34\ \text{V}$**

> [!warning] Trap
> Taking $R_{Th} = R_1 + R_2 = 9\ \text{k}\Omega$ for the discharge because those were the two resistors in the original diagram. After the switch opens, $R_1$ is no longer in the capacitor's loop; using $9\ \text{k}\Omega$ inflates $\tau$ to $180\ \text{ms}$ and predicts $3.65\ \text{V}$ instead of $1.34\ \text{V}$.

<sub>from ECE-01-11</sub>

### 8. For the circuit of node A: $V_s = 12$ V in series with $R_1 = 3\ \Omega$ drives node A, a $2$ A current source also injects into node A, and $R_L = 6\ \Omega$ runs from node A to ground. (a) Find $I_L$ by superposition. (b) Find the total power in $R_L$. (c) Find the sum of the powers each source would produce alone, and account for the difference.

**Given:** Vs = 12 V in series with R1 = 3 Ω (feeding node A); Is = 2 A injecting into node A; RL = 6 Ω from node A to ground

> [!success]- Answer
> **$I_L = 2$ A and $P_L = 24$ W; the sum of the individual powers is only $13.33$ W, so power superposition under-predicts by $10.67$ W.**

> [!warning] Trap
> Adding $P^{(1)} + P^{(2)} = 13.33$ W and reporting it as the power in $R_L$. Power is quadratic, so it is the sum of the *currents* that must be squared; the cross term $2Ri_1i_2$ is exactly the part a naive power addition throws away.

<sub>from ECE-01-06</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-01-01 | Circuit Variables, Ohm’s Law and Signs | 4 |
| ECE-01-02 | KCL, KVL, Series and Parallel Reduction | 10 |
| ECE-01-03 | Delta-Wye Transformations | 5 |
| ECE-01-04 | Mesh Analysis and Supermesh | 8 |
| ECE-01-05 | Nodal Analysis and Supernodes | 8 |
| ECE-01-06 | Superposition Theorem | 4 |
| ECE-01-07 | Thevenin and Norton Equivalents | 10 |
| ECE-01-08 | Maximum Power Transfer and Source Transformation | 4 |
| ECE-01-09 | Millman’s and Tellegen Theorems | 4 |
| ECE-01-10 | Inductors, Capacitors and Energy | 5 |
| ECE-01-11 | First Order RC and RL Transients | 5 |
| ECE-01-12 | Second Order RLC Natural Response | 10 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
