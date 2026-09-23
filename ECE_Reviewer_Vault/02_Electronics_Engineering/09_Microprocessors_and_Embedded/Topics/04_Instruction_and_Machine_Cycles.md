---
id: ECE-09-04
title: "Instruction and Machine Cycles"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Registers,_Buses_and_Memory_Organization]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Instruction and Machine Cycles

> [!abstract] Scope
> Break an instruction into its machine cycles and T-states, and compute execution time, CPI, branch penalty and pipeline speedup.

## Core Concept

> [!tip] Intuition
> One instruction is not one clock. The CPU walks through fetch, decode, execute and write-back, and each step is a counted number of clock periods on the bus.

**The instruction cycle.** Every instruction passes through *fetch*, *decode* and *execute*, and instructions with a memory operand add further memory read or write cycles. Fetch is a register-transfer sequence: the PC drives the MAR, the read strobe goes out, memory returns the byte into the MDR, the MDR is copied to the IR, and the PC is incremented. Decode then steers the datapath, and execute performs the operation and writes back.

**Machine cycle versus clock cycle.** A *T-state* is one clock period, $T = 1/f$. A *machine cycle* is the number of T-states needed for one bus operation: on the 8085 an opcode fetch takes 4 T-states while a memory read or write takes 3. Counting machine cycles instead of T-states therefore understates the time by a factor of 3 to 6, which is exactly the error a timing question is built to catch.

**Program counter behaviour.** The PC is incremented during the fetch, before decode, so by the time execute runs it already points at the *next* instruction. Every relative branch must therefore compute its target from the address of the following instruction, not the branch itself. On an 8085 a 3-byte instruction at $0x2050$ leaves the PC at $0x2053$ when the branch executes.

**Pipelining.** Instead of finishing one instruction before starting the next, a $k$-stage pipeline overlaps them. Once the pipe is full it retires one instruction per clock, so $N$ instructions take $k + (N - 1)$ clocks instead of $Nk$. The clock period is set by the *slowest* stage plus latch overhead, not by the sum of the stages, so the ideal speedup is the number of stages — and it is never reached, because of hazards. Structural hazards are resource conflicts, data hazards are a result needed before it is ready (fixed by forwarding or a stall), and control hazards are branches that invalidate already-fetched instructions.

**Performance bookkeeping.** Execution time is $T_{CPU} = IC \times CPI \times T_{clk}$. A pipelined CPU has an ideal $CPI = 1$, but branch penalties, load-use stalls and cache misses push the measured CPI well above 1. Slow memory inserts *wait states*, each one adding a whole clock to the bus cycle, so a 150 ns access on a 50 ns clock costs three clocks (150 ns), not two and a half.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Instruction execution time | $T_{inst} = N_{T} \times T_{clk}$ | N_T = total T-states (clock periods) for the instruction, summed over every machine cycle it uses. |
| Clock period | $T_{clk} = \frac{1}{f_{clk}}$ | A 3 MHz 8085 has T = 333.3 ns; a 10 T-state instruction takes 3.33 us. |
| CPU execution time | $T_{CPU} = IC \times CPI \times T_{clk}$ | IC = instructions executed. For a pipeline, use the measured CPI, which includes all stall cycles. |
| CPI with a branch penalty | $CPI = 1 + f_{branch} \times \mathrm{penalty}$ | f_branch = fraction of executed instructions that are taken branches; penalty in clocks. Assumes an otherwise stall-free pipeline. |
| Pipelined completion time | $T = (k + N - 1) \times T_{clk}$ | N instructions in a k-stage pipeline with no stalls. Reverts to N x T_clk when N = 1. |
| Pipeline speedup | $S = \frac{N k}{k + N - 1}$ | Ideal, stall-free. Approaches k as N grows and is bounded by the slowest stage, not by the stage count. |
| Bus cycle with wait states | $t_{cyc} = (T_{base} + WS) \times T_{clk}$ | WS = ceil((t_access - T_base T_clk)/T_clk). Wait states are whole clocks. |
| Maximum pipeline clock | $f_{max} = \frac{1}{t_{stage,max} + t_{latch}}$ | Set by the slowest stage plus latch setup and propagation. Adding stages adds latch overhead and can lower f_max. |

## Interactive Widget

**Fetch Decode Execute Animator**

![[Fetch_Decode_Execute_Animator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An 8085 running at 3 MHz executes an instruction made of an opcode fetch (4 T-states), a memory read (3 T-states) and a memory write (3 T-states). Find the execution time.

**Given:** $f_{clk} = 3$ MHz; 4 T + 3 T + 3 T

**Solution:**

1. Total T-states $= 4 + 3 + 3 = 10$
2. $T_{clk} = 1/(3 \times 10^{6}) = 333.3$ ns
3. $T_{inst} = 10 \times 333.3\ \mathrm{ns} = 3333$ ns

> [!success]- Answer
> **$3.33\ \mu s$.**

> [!warning] Trap
> Counting 3 machine cycles as 3 clock periods. Machine cycles contain 3–6 T-states each, so the answer would come out roughly three times too small.

### P2. A 5-stage pipeline runs at a 2 ns clock. Compare the time to execute 1000 instructions against a non-pipelined machine with $CPI = 5$.

**Given:** 5 stages; $T_{clk} = 2$ ns; $N = 1000$; non-pipelined CPI = 5

**Solution:**

1. Non-pipelined: $1000 \times 5 \times 2\ \mathrm{ns} = 10\ \mu s$
2. Pipelined clocks: $k + N - 1 = 5 + 999 = 1004$
3. Pipelined time: $1004 \times 2\ \mathrm{ns} = 2.008\ \mu s$
4. Speedup $= 10/2.008 = 4.98$

> [!success]- Answer
> **$2.008\ \mu s$ pipelined versus $10\ \mu s$ non-pipelined; speedup $4.98\approx$ the 5 stages.**

> [!warning] Trap
> Computing the pipelined time as $N \times T_{clk}/k$ or as $Nk$ clocks. The fill and drain of the pipeline cost $k - 1$ extra clocks, which matters a lot for small $N$.

### P3. In an otherwise ideal pipeline, 20 % of executed instructions are taken branches with a 3-clock penalty. Find the CPI and the time to run $10^{6}$ instructions at 500 MHz.

**Given:** $f_{branch} = 0.20$; penalty = 3 clocks; $IC = 10^{6}$; $f_{clk} = 500$ MHz

**Solution:**

1. $CPI = 1 + 0.20 \times 3 = 1.6$
2. $T_{clk} = 1/(500 \times 10^{6}) = 2$ ns
3. $T_{CPU} = 10^{6} \times 1.6 \times 2\ \mathrm{ns}$
4. $= 3.2 \times 10^{-3}$ s

> [!success]- Answer
> **$CPI = 1.6$; $T_{CPU} = 3.2$ ms.**

> [!warning] Trap
> Using $CPI = 1$ because the pipeline has 5 stages. Branch penalties add stall cycles that are counted in the measured CPI.

### P4. A memory device has a 150 ns access time. The bus clock is 20 MHz and the nominal read cycle is 2 clocks. How many wait states are needed, and what is the resulting cycle time?

**Given:** $t_{access} = 150$ ns; $f_{bus} = 20$ MHz; nominal cycle = 2 clocks

**Solution:**

1. $T_{clk} = 1/(20 \times 10^{6}) = 50$ ns
2. Nominal cycle $= 2 \times 50 = 100$ ns — shorter than the 150 ns the memory needs
3. $WS = \lceil (150 - 100)/50 \rceil = \lceil 1 \rceil = 1$
4. Resulting cycle $= (2 + 1) \times 50 = 150$ ns

> [!success]- Answer
> **1 wait state, giving a 150 ns cycle.**

> [!warning] Trap
> Computing $150/50 = 3$ and calling the nominal cycle 3 clocks without subtracting the base 2. Wait states are the *extra* clocks, not the total.

### P5. A 3-byte instruction begins at address $0x2050$. What is the PC after the fetch, and where does an 8-bit relative branch with offset $0xEC$ go?

**Given:** instruction at 0x2050; 3 bytes long; offset byte = 0xEC

**Solution:**

1. After fetching 3 bytes the PC points at the next instruction: $0x2050 + 3 = 0x2053$
2. Offset is signed two's complement: $0xEC = -20$
3. Target $= PC_{next} + \mathrm{offset} = 0x2053 - 20$
4. $0x2053 = 8275$, and $8275 - 20 = 8255 = 0x203F$

> [!success]- Answer
> **PC = $0x2053$; branch target $= 0x203F$.**

> [!warning] Trap
> Computing the target from $0x2050$ instead of $0x2053$. The PC is already incremented during fetch, so a relative branch is off by the instruction length.

## Traps & Exam Notes

- **Confusing machine cycles with clock cycles.** An 8085 machine cycle spans 3–6 T-states, so timing an instruction by machine-cycle count gives an answer 3–6 times too small.
- **Branching from the branch's own address.** The PC increments during fetch, so a relative target is measured from the instruction that *follows* the branch.
- **Assuming speedup equals the number of stages.** The pipeline clock is set by the slowest stage, and hazards, branch penalties and cache misses all add stall cycles; 5 stages typically yields 3–4x, not 5x.
- **Forgetting that wait states are whole clocks.** A memory needing 150 ns with 50 ns clocks costs 3 clocks, and a memory needing 101 ns still costs 3 clocks — the wasted time is real.
- **Re-using the ideal $CPI = 1$ in a timing calculation.** Measured CPI on a pipelined CPU includes every stall cycle and is usually above 1.

## See Also

- [[02_Registers,_Buses_and_Memory_Organization]]
- [[05_Addressing_Modes_and_Instruction_Sets]]
- [[06_Interrupts_and_ISRs]]
- [[01_CPU_Architecture_CISC_and_RISC]]

---

[[03_Memory_Technologies_and_Address_Decoding|⬅ 03]] · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Addressing_Modes_and_Instruction_Sets|05 ➡]]
