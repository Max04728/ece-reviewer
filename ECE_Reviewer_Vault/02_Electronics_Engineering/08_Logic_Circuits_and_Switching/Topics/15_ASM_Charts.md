---
id: ECE-08-15
title: "ASM Charts"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 15
tier: 2
depth: full
problem_count: 5
prereqs: ["[[14_Finite_State_Machines]]", "[[10_Latches_and_Flip-Flops]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 15 — ASM Charts

> [!abstract] Scope
> Read and write algorithmic state machine charts, and convert them into state tables and register-transfer logic.

## Core Concept

> [!tip] Intuition
> An ASM chart is a flowchart for a synchronous machine: each rectangular block is one state and one clock cycle, and the diamonds inside it are the conditions that decide which block comes next.

**Three symbols carry the whole notation.** A **state box** is a rectangle holding the state name and any outputs that are asserted for the whole cycle (registered, Moore-style outputs). A **decision box** is a diamond with one input and two exits, labelled with a Boolean condition; it does not consume a clock. A **conditional output box** is an oval, always attached below a decision box, holding outputs that depend on inputs (Mealy-style). The rule that trips people up is that conditional output boxes never stand alone — they must follow a decision, because a Mealy output is only meaningful for a specific branch.

**The ASM block is the unit of time.** An ASM block is one state box together with the decision tree and conditional outputs hanging from it. It contains exactly **one** state box, and every path through the block terminates at exactly one next-state box. The machine spends exactly one clock period in each ASM block, so the number of blocks a computation traverses is the number of clock cycles it takes. This one-block-one-cycle property is what makes an ASM chart directly implementable, unlike a free-form flowchart.

**Relationship to the state diagram and to RTL.** An ASM chart and a state diagram carry the same information; the ASM chart simply spells out the decision order and the output conditions that a state diagram would have to write on its arcs. Register-transfer (RTL) notation is the line-by-line equivalent: a conditional output box becomes `register <- expression` guarded by the path condition, and a state box's registered output becomes an unconditional assignment inside that state. Reading an ASM chart downwards along a path gives the RTL statements executed in that cycle.

**From ASM chart to logic.** Enumerate every path through each block and you have a state table: the present state is the state box, the path condition is the input combination, the destination is the next-state box, and the outputs are whatever the state box and the conditional boxes on that path assert. Minimise the next-state and output equations from that table exactly as for any FSM. The number of paths through a decision tree is at most $2^k$ for $k$ independent binary decisions, which is also the number of rows one ASM block contributes to the state table.

**Datapath and controller.** An ASM chart describes only the **controller** — the state register, the next-state logic and the output logic. The **datapath** is everything the controller commands: registers, counters, adders, multiplexers and memory. The partition matters because the controller decides when and the datapath does what; an ASM chart is preferred over a plain state diagram exactly when a sequential algorithm performs conditional operations on a datapath (multiply, divide, serial transmit), because the decision tree then mirrors the algorithm's branching without the state-explosion of drawing every condition on an arc.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| State box contents | $S_i:\ \mathrm{name},\ \mathrm{registered\ outputs}\ (\mathrm{asserted\ for\ the\ whole\ cycle})$ | Exactly one state box per ASM block. Its outputs are Moore-type: valid from the clock edge until the next one. |
| Decision box | $\mathrm{diamond}:\ \mathrm{one\ input},\ \mathrm{two\ exits},\ \mathrm{guarded\ by\ a\ Boolean\ condition}$ | Consumes no clock. Conditions may be datapath flags such as Carry, Zero or Count = Max. |
| Conditional output box | $\mathrm{oval}:\ \mathrm{output} = f(\mathrm{inputs}),\ \mathrm{always\ after\ a\ decision}$ | Mealy-style: asserted only while the path condition holds, so it can change within the cycle. |
| One ASM block = one clock | $\mathrm{cycles\ per\ path} = \mathrm{number\ of\ state\ boxes\ traversed}$ | A loop through four blocks takes four clocks per iteration, regardless of how many decision boxes it contains. |
| Maximum paths through a block | $\mathrm{paths} \le 2^k$ | k independent binary decisions. Every path must terminate in exactly one next-state box. |
| RTL assignment | $Q^+ \leftarrow \mathrm{expression}\ \mathrm{guarded\ by\ the\ path\ condition}$ | The line executed in the cycle whose state box and path the chart specifies. |
| ASM block to state table | $(\mathrm{present\ state},\ \mathrm{path\ condition}) \to (\mathrm{next\ state},\ \mathrm{outputs})$ | One table row per path. Minimise the next-state and output equations from that table. |
| Controller size | $n = \lceil \log_2 (\mathrm{state\ boxes}) \rceil$ | Number of flip-flops in the controller's state register for binary encoding. |
| Datapath/controller split | $\mathrm{controller}: \mathrm{state\ register},\ \mathrm{next\!-\!state\ logic},\ \mathrm{output\ logic}$ | Everything else (registers, ALU, muxes, counters) is datapath, driven by the controller's control signals. |
| Throughput of a looped ASM | $T_{total} = (\mathrm{cycles\ per\ iteration} \times \mathrm{iterations} + \mathrm{overhead})/f_{clk}$ | Multiply by the period, not the frequency. Eight iterations of five cycles at 20 MHz is 42 clocks and 2.1 microseconds. |

## Worked Problems

### P1. An ASM chart shows a rectangle labelled $S_2$ containing '$Z \leftarrow 1$', and beneath it a diamond labelled $X=1$ with one branch going to a rectangle $S_3$. Identify each symbol and the machine type implied by the output.

**Given:** rectangle S2 with Z <- 1; diamond labelled X=1; branch to rectangle S3

**Solution:**

1. The rectangle is a state box: it holds the state name and outputs asserted for the whole cycle
2. An output written inside the state box is unconditional for that state, so it is a Moore-type output
3. The diamond is a decision box: one entry, two exits, guarded by the condition X = 1
4. The second rectangle is the next-state box, S3, reached when X = 1
5. The other exit of the diamond must lead to a different state box

> [!success]- Answer
> **State box, decision box and next-state box; the output is Moore-type because it is written in the state box**

> [!warning] Trap
> Calling the output Mealy because a decision box is nearby. Outputs inside a state box are unconditional for that cycle; only an oval conditional-output box after a decision is Mealy.

### P2. State $S_1$ has a decision on $X$: the $X=1$ branch sets $A \leftarrow 1$ and goes to $S_2$, while the $X=0$ branch goes to $S_3$. Write the two state-table rows this ASM block produces.

**Given:** state S1; decision on X; conditional output A on the X=1 branch

**Solution:**

1. Present state S1, input X = 0: next state S3, output A = 0 (the conditional box is not on this path)
2. Present state S1, input X = 1: next state S2, output A = 1
3. The conditional output box makes A a Mealy output, so it is a function of X as well as the state
4. The block contributes exactly two rows because there is one binary decision

> [!success]- Answer
> **$S_1$: $X=0\to S_3$, $A=0$; $X=1\to S_2$, $A=1$**

> [!warning] Trap
> Listing A as 1 for both rows because it appears somewhere in the block. A conditional output box applies only to the path that passes through it.

### P3. A serial multiplier's ASM chart has 8 state boxes; the multiply loop passes through 5 of them for each of 8 iterations, plus 2 overhead states in total. How many clock cycles and how long at 20 MHz?

**Given:** 8 state boxes; loop = 5 blocks; 8 iterations; 2 overhead states; f = 20 MHz

**Solution:**

1. Each ASM block consumes one clock cycle
2. Loop cycles = 5 blocks x 8 iterations = 40 clocks
3. Total = 40 + 2 overhead = 42 clocks
4. Period = 1 / 20 MHz = 50 ns
5. Time = 42 x 50 ns = 2100 ns = 2.1 microseconds

> [!success]- Answer
> **42 clock cycles, $2.1\ \mu\mathrm{s}$ at 20 MHz**

> [!warning] Trap
> Counting decision boxes as clock cycles. Decisions inside a block are combinational and take no clock; only state boxes advance time.

### P4. An ASM block contains three independent binary decisions in sequence before reaching a state box. How many paths are there at most, and how many state boxes does the block contain?

**Given:** 3 sequential binary decisions; one ASM block

**Solution:**

1. Each binary decision doubles the number of paths
2. Maximum paths = 2^3 = 8
3. Each path must terminate at exactly one next-state box
4. The block contains exactly one state box, the one it started from
5. So the block contributes up to 8 rows to the state table but only one state

> [!success]- Answer
> **Up to 8 paths, but exactly 1 state box in the block**

> [!warning] Trap
> Concluding that eight paths mean eight states. Paths are next-state possibilities; the block still holds a single present state and consumes a single clock cycle.

### P5. Classify each element as controller or datapath: state register, 8-bit accumulator, next-state logic, ALU, output logic, shift register, multiplexer selecting the ALU input.

**Given:** 7 elements to classify

**Solution:**

1. Controller: the state register, the next-state logic and the output logic - these are the FSM described by the ASM chart
2. Datapath: the accumulator, the ALU, the shift register and the input multiplexer - these perform the operations
3. The controller asserts control signals (load, shift, select, add/subtract) that steer the datapath
4. The datapath returns status flags (zero, carry, overflow) that the controller's decision boxes read

> [!success]- Answer
> **Controller: state register, next-state logic, output logic. Datapath: accumulator, ALU, shift register, input multiplexer**

> [!warning] Trap
> Putting the accumulator or ALU in the controller because the ASM chart mentions them. The chart commands the datapath; it does not contain it. Control signals flow one way and status flags the other.

## Traps & Exam Notes

- **Attaching a conditional output box directly to a state box.** A conditional output must be guarded by a decision; without one there is no condition for it to depend on, and it degrades into an unconditional output.
- **Counting decision boxes as clock cycles.** Decisions are combinational. Only state boxes advance the clock, so a loop's cycle count equals its state-box count, not its diamond count.
- **Putting more than one state box in an ASM block.** Each block has exactly one, which is what guarantees one clock per block and makes the chart implementable as a synchronous FSM.
- **Reading an output inside a state box as Mealy.** Outputs written in the state box are Moore outputs, valid for the whole cycle. Only the oval conditional output box is Mealy.
- **Assuming every path through a decision tree is reachable.** Conditions may be mutually exclusive, so the state table may have fewer rows than $2^k$; unreachable combinations become don't-cares.
- **Confusing the ASM chart with the datapath.** The chart specifies the controller only. Registers, adders and multiplexers appear in the chart solely as control signals and status flags.
- **Forgetting the reset path.** An ASM chart must show how the machine enters its initial state; a chart without a reset is not fully specified and its unused states may lock up.

## See Also

- [[14_Finite_State_Machines]]
- [[10_Latches_and_Flip-Flops]]
- [[09_Multiplexers_and_Demultiplexers]]
- [[12_Shift_Registers]]

---

[[14_Finite_State_Machines|⬅ 14]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[16_Logic_Families_TTL_vs_CMOS_and_Interfacing|16 ➡]]
