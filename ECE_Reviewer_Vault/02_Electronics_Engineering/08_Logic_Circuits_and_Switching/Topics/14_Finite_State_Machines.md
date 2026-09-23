---
id: ECE-08-14
title: "Finite State Machines"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 14
tier: 1
depth: full
problem_count: 9
prereqs: ["[[10_Latches_and_Flip-Flops]]", "[[06_Karnaugh_Maps]]", "[[05_SOP,_POS,_Minterms_and_Maxterms]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — Finite State Machines

> [!abstract] Scope
> Model sequential behaviour with Moore and Mealy state machines, reduce and encode the states, and derive the next-state and output logic.

## Core Concept

> [!tip] Intuition
> A finite state machine is a memory plus a decision rule: the state summarises everything the circuit needs to know about its past inputs, and the next state depends only on that summary and the present input. Moore machines attach the output to the state; Mealy machines attach it to the transition.

**States as history.** An FSM is defined by a finite set of states, an input alphabet, a next-state function and an output function. The state is a sufficient statistic of the input history: two different input sequences that leave the machine in the same state must produce identical future behaviour. That is precisely why the number of states can be minimised, and why a sequence detector needs one state per distinct prefix it has matched so far.

**Moore versus Mealy.** A **Moore** machine's output depends only on the present state, $Z = f(\mathrm{state})$, so its output is a registered signal that changes only at clock edges and is glitch-free. A **Mealy** machine's output depends on present state and present input, $Z = f(\mathrm{state}, X)$, so it can respond in the same clock cycle as the input that completes a pattern — one clock earlier than Moore — but the output is combinational and can glitch or change asynchronously with the input. Mealy designs usually need one fewer state, because the detecting transition can carry the output instead of requiring a dedicated final state.

**State diagrams and state tables.** A state diagram draws states as circles and transitions as labelled arcs, always showing the input that causes the transition and (for Mealy) the output produced. A state table is the same information as a truth table, with one row per state and columns for the next state and output under each input combination. Both are written against a defined reset state, reached from anywhere by an asynchronous or synchronous reset. The transition out of the detecting state is where overlap decisions are encoded: returning to an intermediate state allows overlapping detections, returning to reset forbids them.

**Design flow with D or JK flip-flops.** First write the state table, then choose a **state assignment** (binary, Gray or one-hot) that maps each state to a flip-flop code. Binary encoding of $m$ states uses $n = \lceil \log_2 m\rceil$ flip-flops and leaves $2^n - m$ unused codes; one-hot uses $m$ flip-flops and gives simpler next-state equations at the cost of more storage. With D flip-flops the excitation is $D = Q^+$, so the next-state equations *are* the input equations and can be minimised directly by K-map. With JK flip-flops, an excitation table converts each transition into required J and K values, and the no-change cases become don't-cares that often reduce the logic further.

**State reduction.** Two states are equivalent if, for every input, they produce the same output and their next states are also equivalent. Equivalence is therefore computed by iterative partition refinement (or an implication table): start by grouping states with identical outputs, then split any group whose members transition to different groups, and repeat until the partition stops changing. Equivalent states are merged, which can cut the flip-flop count. The recursion is the part candidates miss — comparing outputs alone merges states that later turn out to differ.

**Unused states and output timing.** A binary encoding leaves unused codes, and the next-state logic must be checked on them: if two unused codes map to each other the machine can lock up after a glitch or a power-up, exactly as in a truncated counter. Finally, remember the timing contract. Moore outputs appear with the state, so they are one clock later than the input that caused them; Mealy outputs appear during the same cycle, which shortens latency but makes the output combinational and hazards a real concern in asynchronous interfaces.

## Derivation

Target: a Mealy FSM with a single input $X$ and output $Z$ that asserts $Z=1$ in the cycle when the last four input bits were 1011, allowing overlapping detections. The state must record the longest suffix of the input seen so far that is a prefix of 1011.

Define four states: $S_0$ = no useful suffix, $S_1$ = the last bit was 1, $S_2$ = the last two bits were 10, $S_3$ = the last three bits were 101. Overlap is enforced by sending the machine from $S_3$ back to $S_1$ on $X=1$, because the input just read ends in 1.

Write the Mealy state table: $S_0$: $0\to S_0/0$, $1\to S_1/0$; $S_1$: $0\to S_2/0$, $1\to S_1/0$; $S_2$: $0\to S_0/0$, $1\to S_3/0$; $S_3$: $0\to S_2/0$, $1\to S_1/1$. Nothing overlaps awkwardly, and the single output 1 sits on the $S_3 \to S_1$ transition under $X=1$.

Assign binary codes so that all four states are used: $S_0=00$, $S_1=01$, $S_2=10$, $S_3=11$ on flip-flop outputs $Q_1Q_0$. There are no unused codes, so no lock-up state exists and no don't-cares are needed.

Read the next-state equations as minterms over $(Q_1,Q_0,X)$. $Q_1^+=1$ when the next state is $S_2$ or $S_3$, which happens from $(S_1,X=0)$, $(S_3,X=0)$ and $(S_2,X=1)$: $D_1 = \bar Q_1Q_0\bar X + Q_1Q_0\bar X + Q_1\bar Q_0X$. $Q_0^+=1$ whenever $X=1$ (every 1-transition lands in a state with $Q_0=1$), so $D_0 = X$. The output is 1 only on the $(S_3, X=1)$ cell, so $Z = Q_1Q_0X$.

Minimise with a three-variable K-map. The two cells $\bar Q_1Q_0\bar X$ and $Q_1Q_0\bar X$ merge into $Q_0\bar X$, and $Q_1\bar Q_0X$ is a single cell that cannot pair. So $D_1 = Q_0\bar X + Q_1\bar Q_0X$, $D_0 = X$ and $Z = Q_1Q_0X$: two flip-flops, one inverter and a handful of gates.

Verify by tracing $X = 1,0,1,1$. Clock 1: state $S_0=00$, $X=1 \Rightarrow Z=0$, next $D_1 = 0$, $D_0=1$ so $S_1$. Clock 2: $S_1$, $X=0 \Rightarrow Z=0$, $D_1 = Q_0\bar X = 1$, $D_0=0$ so $S_2$. Clock 3: $S_2$, $X=1 \Rightarrow Z = Q_1Q_0X = 1\cdot0\cdot1 = 0$, next $D_1 = 0 + 1 = 1$, $D_0=1$ so $S_3$. Clock 4: $S_3$, $X=1 \Rightarrow Z = 1\cdot1\cdot1 = 1$: the pattern is flagged in the same cycle as the fourth bit, and the next state is $S_1$ so a following 011 also detects.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Moore output | $Z = f(\mathrm{state})$ | Registered output: changes only at a clock edge and is free of input glitches, but appears one clock after the causing input. |
| Mealy output | $Z = f(\mathrm{state}, X)$ | Combinational output: responds in the same cycle as the input, so it can glitch if the input does. |
| Next-state function | $Q^+ = f(\mathrm{state}, X)$ | Same form for both machine types; only the output function differs. |
| D flip-flop excitation | $D = Q^+$ | The next-state equation is the input equation. Simplest route from a state table to hardware. |
| JK flip-flop excitation | $0\to0: J=0,K=X;\ 0\to1: J=1,K=X;\ 1\to0: J=X,K=1;\ 1\to1: J=X,K=0$ | X entries become don't-cares, so JK designs often minimise to fewer gates than D designs. |
| Binary state encoding | $n = \lceil \log_2 m \rceil$ | m states need n flip-flops. Five states need 3 flip-flops and leave 3 unused codes. |
| One-hot state encoding | $n = m\ \mathrm{flip\!-\!flops}$ | One flip-flop per state: simpler next-state logic, more storage, and unused codes are all-zero or multi-bit. |
| Unused state count | $\mathrm{unused} = 2^n - m$ | Each unused code must be checked for lock-up, or covered with a recovery term or reset. |
| State equivalence | $S_i \equiv S_j \iff Z_i = Z_j\ \mathrm{and}\ Q_i^+ \equiv Q_j^+\ \mathrm{for\ every\ input}$ | Recursive: compare outputs first, then next states. Applied iteratively until the partition is stable. |
| States in a sequence detector | $\mathrm{Moore}: L+1,\quad \mathrm{Mealy}: L$ | For a pattern of length L. Mealy saves the final state because the transition carries the output. |

## Worked Problems

### P1. Build the Mealy state table for a detector that asserts $Z=1$ when the input stream ends in 1101, allowing overlap.

**Given:** pattern = 1101; overlap allowed; Mealy machine

**Solution:**

1. States are the useful prefixes: S0 (nothing), S1 (1), S2 (11), S3 (110)
2. S0: X=0 -> S0/0, X=1 -> S1/0
3. S1: X=0 -> S0/0 (11 was broken), X=1 -> S2/0
4. S2: X=0 -> S3/0, X=1 -> S2/0 (the run of 1s continues)
5. S3: X=0 -> S0/0, X=1 -> S1/1 (pattern complete; the final 1 starts a new pattern)
6. Four states, no fifth state needed because the output rides on the transition

> [!success]- Answer
> **Four-state Mealy machine with $Z=1$ only on the transition $S_3\to S_1$ under $X=1$**

> [!warning] Trap
> Sending $S_3$ to $S_0$ on the completed pattern. That forbids overlap: after detecting 1101 the trailing 1 must be reused, so the machine returns to $S_1$, not $S_0$.

### P2. Apply the 1101 Mealy detector to the input stream $1101101$ and give the output sequence.

**Given:** X = 1,1,0,1,1,0,1; Mealy 1101 detector

**Solution:**

1. Clock 1: S0, X=1 -> Z=0, next S1
2. Clock 2: S1, X=1 -> Z=0, next S2
3. Clock 3: S2, X=0 -> Z=0, next S3
4. Clock 4: S3, X=1 -> Z=1 (pattern 1101 detected), next S1
5. Clock 5: S1, X=1 -> Z=0, next S2
6. Clock 6: S2, X=0 -> Z=0, next S3
7. Clock 7: S3, X=1 -> Z=1 (second, overlapping detection)
8. Z = 0,0,0,1,0,0,1

> [!success]- Answer
> **$Z = 0,0,0,1,0,0,1$; detections at clocks 4 and 7**

> [!warning] Trap
> Missing the second detection and reporting a single pulse. Overlap lets the input window that closed at clock 4 reopen at clock 5; the trailing 1 of the first pattern is the leading 1 of the second.

### P3. A 1011 sequence detector is to be built as a Moore machine and as a Mealy machine. Compare the state counts and the output timing.

**Given:** pattern = 1011; Moore versus Mealy

**Solution:**

1. Mealy states are the prefixes: S0, S1(1), S2(10), S3(101) -> 4 states
2. Moore adds a state whose output is 1, because the output depends on the state alone
3. Moore states: S0, S1, S2, S3, S4(1011) -> 5 states
4. For input 1011 the Mealy output rises with the fourth bit; the Moore machine enters S4 at that same edge and its output appears during the following cycle
5. So the Moore flag is one clock later, at the cost of one extra state

> [!success]- Answer
> **Mealy 4 states (same-cycle output); Moore 5 states (output one clock later)**

> [!warning] Trap
> Assuming Moore and Mealy need the same number of states. The extra Moore state is what stores the detection, and it shifts the output one clock later.

### P4. Reduce the following Mealy state table: $A$: $0\to B/0$, $1\to C/0$; $B$: $0\to A/0$, $1\to D/0$; $C$: $0\to A/0$, $1\to D/0$; $D$: $0\to A/0$, $1\to A/1$.

**Given:** 4 states A, B, C, D; Mealy table with one input X

**Solution:**

1. Partition by output first: A, B, C output 0 for every input; D outputs 1 for X=1, so D is in its own group
2. Compare B and C: for X=0 both go to A with output 0; for X=1 both go to D with output 0
3. B and C have identical next states and outputs, so they are equivalent and merge
4. Compare A with the merged B: A on X=0 goes to B, while B on X=0 goes to A. The next states differ, so they are not equivalent
5. Result: 3 states {A, BC, D}

> [!success]- Answer
> **B and C merge; the machine reduces from 4 states to 3**

> [!warning] Trap
> Merging states because their outputs agree without comparing next states, or merging A with B because both output 0 everywhere. A's next state under X=0 is B while B's is A — different groups, so they stay separate.

### P5. How many flip-flops are needed for a 5-state FSM and for a 9-state FSM in binary encoding, and how many with one-hot encoding?

**Given:** m = 5 and m = 9; binary and one-hot encoding

**Solution:**

1. Binary needs n = ceil(log2 m) flip-flops
2. m = 5: ceil(log2 5) = 3 flip-flops, leaving 2^3 - 5 = 3 unused codes
3. m = 9: ceil(log2 9) = 4 flip-flops, leaving 16 - 9 = 7 unused codes
4. One-hot uses one flip-flop per state: 5 and 9 respectively

> [!success]- Answer
> **5 states: 3 binary or 5 one-hot; 9 states: 4 binary or 9 one-hot**

> [!warning] Trap
> Confusing the number of states with the number of flip-flops, or forgetting the unused codes. Three flip-flops hold eight codes, so a 5-state machine must define behaviour (or a reset) for the three it never uses.

### P6. A JK flip-flop is in state $Q=1$ and must go to $Q^+=0$ at the next clock. Give the required $J$ and $K$, and compare with the D flip-flop requirement.

**Given:** transition 1 -> 0; JK and D flip-flops

**Solution:**

1. The JK characteristic equation is Q+ = J(NOT Q) + (NOT K)Q
2. With Q=1 the first term drops out: Q+ = (NOT K)
3. For Q+ = 0 we need K = 1; J is a don't-care because Q=0 makes its term vanish
4. Excitation entry for 1->0 is J = X, K = 1
5. For a D flip-flop, D = Q+ = 0

> [!success]- Answer
> **$J = X$ (don't-care), $K = 1$; for a D flip-flop $D = 0$**

> [!warning] Trap
> Setting $J=0$ and treating it as required. With $Q=1$ the $J$ input is masked by $\bar Q$, so it is a don't-care — and that don't-care is exactly what lets a JK design minimise to fewer gates than a D design.

### P7. A two-flip-flop machine has $D_1 = Q_1\oplus Q_0$ and $D_0 = \bar Q_0$. Build its state table and identify the machine.

**Given:** D1 = Q1 XOR Q0; D0 = NOT Q0

**Solution:**

1. State 00: D1 = 0 XOR 0 = 0, D0 = 1 -> next state 01
2. State 01: D1 = 0 XOR 1 = 1, D0 = 0 -> next state 10
3. State 10: D1 = 1 XOR 0 = 1, D0 = 1 -> next state 11
4. State 11: D1 = 1 XOR 1 = 0, D0 = 0 -> next state 00
5. The sequence 00,01,10,11 is binary counting, so this is a mod-4 up counter

> [!success]- Answer
> **State table $00\to01\to10\to11\to00$: a synchronous mod-4 binary up counter**

> [!warning] Trap
> Computing $D_1$ from the *current* $Q_1$ instead of the XOR of the two present bits, or assuming the sequence counts in reflected order. Only the Gray encoding would step 00,01,11,10.

### P8. Design a two-bit Gray-code counter (sequence $00\to01\to11\to10\to00$) with D flip-flops and give the input equations.

**Given:** Gray sequence 00,01,11,10; D flip-flops

**Solution:**

1. List Q1+ for each present state: 00->0, 01->1, 11->1, 10->0
2. Q1+ equals Q0 in all four rows, so D1 = Q0
3. List Q0+: 00->1, 01->1, 11->0, 10->0
4. Q0+ equals (NOT Q1) in all four rows, so D0 = (NOT Q1)
5. Verify state 11: D1 = Q0 = 1, D0 = (NOT 1) = 0, giving 10 as required

> [!success]- Answer
> **$D_1 = Q_0$, $D_0 = \bar Q_1$**

> [!warning] Trap
> Assuming a Gray counter needs a K-map with don't-cares. With all four codes used there are no don't-cares, and the equations come straight from the transition table. Also do not swap the equations: $D_1 = Q_0$ and $D_0 = \bar Q_1$ are not symmetric.

### P9. The 1011 Mealy detector of the derivation is changed so that overlapping detections are not allowed. Which state-table entry changes, and what is the effect on the input stream $1011011$?

**Given:** original: overlap allowed; change: no overlap

**Solution:**

1. In the overlapping machine, S3 with X=1 outputs 1 and returns to S1 so the trailing 1 can start a new match
2. Forbidding overlap means discarding the tail of a completed pattern
3. So the (S3, X=1) transition changes from S1/1 to S0/1
4. Re-trace 1011011: clock 4 detects (1011) and resets to S0
5. Clock 5 reads 0 -> S0; clock 6 reads 1 -> S1; clock 7 reads 1 -> S2; no second detection
6. Output becomes 0,0,0,1,0,0,0 instead of 0,0,0,1,0,0,1

> [!success]- Answer
> **$S_3$ under $X=1$ goes to $S_0$ instead of $S_1$; the stream $1011011$ now produces only one detection**

> [!warning] Trap
> Thinking the change costs an extra state. Only one transition entry changes; the state set is unchanged. The choice between overlap and non-overlap lives entirely in that one arc.

## Traps & Exam Notes

- **Believing Moore and Mealy need the same states.** A Mealy sequence detector needs L states for a length-L pattern; a Moore detector needs L+1 because the detection must be held in a state. The Moore output also appears one clock later.
- **Forgetting overlap in the terminal transition.** Sending the detecting state back to reset breaks overlap. Whether the machine returns to reset or to an intermediate prefix is a specification decision, and exam questions usually state it explicitly.
- **Comparing outputs only during state reduction.** Equivalence requires equal outputs *and* equivalent next states, applied iteratively. Two states with matching outputs can still differ after one input.
- **Leaving unused states to lock up.** A binary-encoded 5-state machine has 3 unused codes; if two of them map to each other the FSM hangs after a glitch. Either show where they go or add a recovery term.
- **Assuming a Mealy output is glitch-free.** Its output is a combinational function of the input, so it changes within a cycle and can produce hazards. Register it if the output drives an asynchronous load or a clock.
- **Forgetting the input in a Mealy output equation.** A Mealy output is a function of state *and* input; dropping $X$ turns it into a Moore output and silently changes the timing.
- **Counting states and flip-flops as the same thing.** m states need $\lceil\log_2 m\rceil$ flip-flops in binary encoding, and one per state in one-hot encoding. Unused codes always exist in the binary case.

## See Also

- [[15_ASM_Charts]]
- [[10_Latches_and_Flip-Flops]]
- [[13_Asynchronous_and_Synchronous_Counters]]
- [[06_Karnaugh_Maps]]

---

[[13_Asynchronous_and_Synchronous_Counters|⬅ 13]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[15_ASM_Charts|15 ➡]]
