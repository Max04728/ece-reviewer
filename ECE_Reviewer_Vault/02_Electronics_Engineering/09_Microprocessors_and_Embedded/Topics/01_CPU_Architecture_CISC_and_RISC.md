---
id: ECE-09-01
title: "CPU Architecture: CISC and RISC"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Registers,_Buses_and_Memory_Organization]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — CPU Architecture: CISC and RISC

> [!abstract] Scope
> Distinguish CISC from RISC architectures and compute CPU execution time from instruction count, CPI and clock rate.

## Core Concept

> [!tip] Intuition
> A CPU is a fetch-decode-execute loop. CISC spends silicon making each instruction do more work; RISC spends silicon making each instruction finish faster and lets the compiler do the rest.

**The CPU as a loop.** Every processor runs the same cycle: fetch the instruction at the program counter, decode it, execute it, write the result back, repeat. An *architecture* is the set of decisions about what an instruction looks like and how the datapath is wired to that loop. The von Neumann model shares one memory for code and data; the Harvard model splits them so an instruction fetch and a data access can proceed in the same clock.

**CISC — Complex Instruction Set Computer.** Variable-length instructions (1 to 15 bytes on x86), many addressing modes, memory operands permitted inside arithmetic instructions, and a microcode ROM that expands one machine instruction into several internal micro-operations. The design goal is *code density*: fewer instructions per program, therefore less instruction fetch traffic. Because lengths vary, the decoder is complex, the fetch unit does not know where the next instruction starts until it decodes the current one, and deep pipelining is harder. x86 and the 8051 are CISC.

**RISC — Reduced Instruction Set Computer.** Fixed-length instructions (usually 32 bits), a load/store architecture in which only `LW`/`SW`-style instructions touch memory, a large uniform register file (typically 32 general-purpose registers) and a three-operand format. Decode is trivial because format and length are uniform, so the pipeline can be deep and the clock fast. MIPS, ARM, RISC-V and PowerPC are RISC.

**What actually decides speed.** The label does not;
$$T_{CPU} = IC \times CPI \times T_{clk}$$
does. CISC attacks $IC$; RISC attacks $CPI$ and $T_{clk}$. A RISC program usually executes *more* instructions than the equivalent CISC program and still wins, because its CPI is closer to 1 and its clock is faster. Modern x86 parts are CISC on the outside and RISC-like micro-ops on the inside, so the boundary has blurred.

**Where the trade-off bites.** CISC wins where code density saves memory or instruction-cache misses (embedded 8051, large x86 binaries). RISC wins where a compiler can keep the pipeline full and register pressure is manageable (ARM in handsets, RISC-V in embedded control). Superscalar and out-of-order execution push CPI below 1 for both, and once that happens memory stalls, not instruction style, dominate the run time.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| CPU execution time | $T_{CPU} = IC \times CPI \times T_{clk}$ | IC = instructions executed by the program; CPI = average clocks per instruction; T_clk = clock period. The three factors multiply, so improving only one has limited effect. |
| CPU time from clock frequency | $T_{CPU} = \frac{IC \times CPI}{f_{clk}}$ | f_clk in Hz. Halving the clock period halves run time only if CPI is unchanged; memory stalls usually raise CPI when the clock rises. |
| Average CPI | $CPI_{avg} = \sum_i f_i \, CPI_i$ | f_i is the fraction of *executed* instructions of class i. Use dynamic counts, not the static counts in a program listing. |
| MIPS rating | $\mathrm{MIPS} = \frac{IC}{T_{CPU} \times 10^{6}} = \frac{f_{clk}}{CPI \times 10^{6}}$ | A throughput figure, not a work figure. Only comparable between machines running the same ISA and the same instruction mix. |
| Speedup | $S = \frac{T_{old}}{T_{new}}$ | Dimensionless. Always state the baseline program; speedup on one benchmark does not generalise to another. |
| Ideal pipeline speedup | $S_{ideal} = \frac{N k}{k + (N - 1)}$ | N instructions in a k-stage pipeline with no stalls. Approaches k as N grows and collapses to 1 when N = 1. |
| Clock scaling with a CPI penalty | $S = \frac{CPI_{old}}{CPI_{new}} \times \frac{f_{new}}{f_{old}}$ | A faster clock that raises CPI does not deliver the full frequency ratio. Compare 1.4x clock with 1.1 -> 1.3 CPI gives only 1.18x. |
| Address space from address width | $N_{locations} = 2^{n}$ | n = number of address lines. A 32-bit address bus addresses 4 Gi locations regardless of the data bus width. |

## Worked Problems

### P1. A 2 GHz processor executes $5 \times 10^{9}$ instructions with an average CPI of 1.5. Find the execution time and the MIPS rating.

**Given:** $f_{clk} = 2$ GHz; $IC = 5 \times 10^{9}$; $CPI = 1.5$

**Solution:**

1. $T_{CPU} = \dfrac{IC \times CPI}{f_{clk}} = \dfrac{5 \times 10^{9} \times 1.5}{2 \times 10^{9}}$
2. $= \dfrac{7.5 \times 10^{9}}{2 \times 10^{9}} = 3.75$ s
3. $\mathrm{MIPS} = \dfrac{f_{clk}}{CPI \times 10^{6}} = \dfrac{2 \times 10^{9}}{1.5 \times 10^{6}}$
4. $= 1333$ MIPS

> [!success]- Answer
> **$T_{CPU} = 3.75$ s; $1333$ MIPS.**

> [!warning] Trap
> Dividing by $CPI$ twice, or using $IC/f_{clk}$ and forgetting that CPI multiplies the time. $IC/CPI$ is the common inversion — a larger CPI makes the machine slower.

### P2. A program's instruction mix is 30 % load/store with $CPI = 2$, 50 % ALU with $CPI = 1$ and 20 % branches with $CPI = 3$. Find the average CPI and the time to run $10^{7}$ instructions at 2.5 GHz.

**Given:** 30 % L/S, CPI 2; 50 % ALU, CPI 1; 20 % branch, CPI 3; $IC = 10^{7}$, $f_{clk} = 2.5$ GHz

**Solution:**

1. $CPI_{avg} = 0.30(2) + 0.50(1) + 0.20(3)$
2. $= 0.60 + 0.50 + 0.60 = 1.7$
3. $T_{CPU} = \dfrac{10^{7} \times 1.7}{2.5 \times 10^{9}}$
4. $= \dfrac{1.7 \times 10^{7}}{2.5 \times 10^{9}} = 6.8 \times 10^{-3}$ s

> [!success]- Answer
> **$CPI_{avg} = 1.7$; $T_{CPU} = 6.8$ ms.**

> [!warning] Trap
> Averaging the four CPI values by simply dividing by the number of classes. The average CPI is a *weighted* mean by dynamic instruction frequency, not an arithmetic mean.

### P3. A CISC machine runs a benchmark in $8 \times 10^{6}$ instructions at $CPI = 3.0$ and 1.5 GHz. A RISC machine needs $12 \times 10^{6}$ instructions at $CPI = 1.4$ and 2.5 GHz. Which is faster, and by how much?

**Given:** CISC: $IC = 8 \times 10^{6}$, CPI 3.0, 1.5 GHz; RISC: $IC = 12 \times 10^{6}$, CPI 1.4, 2.5 GHz

**Solution:**

1. CISC: $T = \dfrac{8 \times 10^{6} \times 3.0}{1.5 \times 10^{9}} = 16$ ms
2. RISC: $T = \dfrac{12 \times 10^{6} \times 1.4}{2.5 \times 10^{9}} = 6.72$ ms
3. $S = \dfrac{16}{6.72} = 2.38$

> [!success]- Answer
> **RISC is faster by a factor of $2.38$.**

> [!warning] Trap
> Picking the CISC machine because it executes fewer instructions. Instruction count is only one of three factors — the RISC machine executes 50 % more instructions and still finishes less than half as late.

### P4. A 4-stage pipeline with a 2.5 ns clock runs 200 instructions with no stalls. Compare it with a non-pipelined machine having $CPI = 4$.

**Given:** $k = 4$ stages; $T_{clk} = 2.5$ ns; $N = 200$

**Solution:**

1. Non-pipelined: $200 \times 4 \times 2.5\ \mathrm{ns} = 2000\ \mathrm{ns}$
2. Pipelined clocks: $k + N - 1 = 4 + 199 = 203$
3. Pipelined: $203 \times 2.5\ \mathrm{ns} = 507.5$ ns
4. $S = 2000/507.5 = 3.94$

> [!success]- Answer
> **$507.5$ ns versus $2\ \mu s$; speedup $3.94$.**

> [!warning] Trap
> Reporting a speedup of exactly 4 (the stage count). The fill and drain of the pipeline cost $k - 1 = 3$ extra clocks, which is a visible loss for only 200 instructions.

### P5. A design raises the clock from 1.0 GHz to 1.4 GHz, but memory stalls push the average CPI from 1.1 to 1.3. Find the real speedup and compare it with the naive frequency ratio.

**Given:** $f$: 1.0 GHz to 1.4 GHz; CPI: 1.1 to 1.3

**Solution:**

1. $T_{old} = IC \times 1.1/10^{9}$
2. $T_{new} = IC \times 1.3/(1.4 \times 10^{9})$
3. $S = \dfrac{1.1/10^{9}}{1.3/(1.4 \times 10^{9})} = \dfrac{1.1 \times 1.4}{1.3}$
4. $= 1.18$

> [!success]- Answer
> **Real speedup $1.18\times$, not the naive $1.4\times$.**

> [!warning] Trap
> Quoting the frequency ratio as the speedup. A faster clock that exposes memory stalls raises CPI, and the two effects partly cancel.

## Traps & Exam Notes

- **Quoting MIPS across architectures.** MIPS counts instructions per second, not work done. A machine that executes more, simpler instructions can post a higher MIPS and still finish the same job later.
- **Assuming a RISC program executes fewer instructions.** It normally executes more, because each instruction does less. RISC wins on CPI and clock rate, not on instruction count.
- **Averaging CPI without weighting.** The average CPI is weighted by how often each class is *executed*, so an arithmetic mean of the class CPIs is wrong whenever the instruction mix is uneven.
- **Treating CPI below 1 as impossible.** A superscalar CPU retires several instructions per clock, so $CPI < 1$ is normal and is not an arithmetic error.
- **Scaling run time by the clock alone.** Doubling the clock does not halve run time when the faster clock starves the pipeline; memory stalls raise the effective CPI and eat the gain.
- **Equating CISC with microcode and RISC with no microcode.** Modern x86 decodes to micro-ops and several ARM cores use microcode for complex operations. The label describes the instruction set style, not the internal implementation.

## See Also

- [[02_Registers,_Buses_and_Memory_Organization]]
- [[04_Instruction_and_Machine_Cycles]]
- [[05_Addressing_Modes_and_Instruction_Sets]]
- [[03_Memory_Technologies_and_Address_Decoding]]

---

⬅ *start* · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Registers,_Buses_and_Memory_Organization|02 ➡]]
