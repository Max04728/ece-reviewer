---
title: "Microprocessors and Embedded — Drill"
type: drill
area: 09_Microprocessors_and_Embedded
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 50
updated: 2026-09-23
---

# Microprocessors and Embedded — Practice Drill

**8 problems** drawn from a pool of 50 across 10 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 09_Microprocessors_and_Embedded --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. In an otherwise ideal pipeline, 20 % of executed instructions are taken branches with a 3-clock penalty. Find the CPI and the time to run $10^{6}$ instructions at 500 MHz.

**Given:** $f_{branch} = 0.20$; penalty = 3 clocks; $IC = 10^{6}$; $f_{clk} = 500$ MHz

> [!success]- Answer
> **$CPI = 1.6$; $T_{CPU} = 3.2$ ms.**

> [!warning] Trap
> Using $CPI = 1$ because the pipeline has 5 stages. Branch penalties add stall cycles that are counted in the measured CPI.

<sub>from ECE-09-04</sub>

### 2. A 4-stage pipeline with a 2.5 ns clock runs 200 instructions with no stalls. Compare it with a non-pipelined machine having $CPI = 4$.

**Given:** $k = 4$ stages; $T_{clk} = 2.5$ ns; $N = 200$

> [!success]- Answer
> **$507.5$ ns versus $2\ \mu s$; speedup $3.94$.**

> [!warning] Trap
> Reporting a speedup of exactly 4 (the stage count). The fill and drain of the pipeline cost $k - 1 = 3$ extra clocks, which is a visible loss for only 200 instructions.

<sub>from ECE-09-01</sub>

### 3. A polling loop services 30 devices, spending 400 ns on each. Compare its worst-case response with the 2.8 us interrupt latency of the previous problem.

**Given:** 30 devices; 400 ns per device; interrupt latency = 2.8 us

> [!success]- Answer
> **Polling worst case $12\ \mu s$ versus $2.8\ \mu s$ for interrupts; interrupts are about 4.3 times faster to respond.**

> [!warning] Trap
> Comparing polling's *average* latency (half the loop) with the interrupt's *worst case*. Worst case against worst case is the only fair comparison.

<sub>from ECE-09-06</sub>

### 4. A PWM DAC runs at 20 kHz from a 5 V reference with $D = 0.5$, followed by $R = 10\ \mathrm{k\Omega}$ and $C = 1\ \mu F$. Find the average output and the peak-to-peak ripple.

**Given:** $V_{ref} = 5$ V; $D = 0.5$; $f_{PWM} = 20$ kHz; $R = 10$ kOhm; $C = 1\ \mu F$

> [!success]- Answer
> **$V_{avg} = 2.5$ V with $6.25$ mV peak-to-peak ripple.**

> [!warning] Trap
> Assuming $V_{avg} = D V_{ref}$ needs no justification. With a 1 kHz PWM and the same RC the ratio drops to 10 and the ripple becomes 125 mV, which swamps a 12-bit ADC's 1.2 mV LSB on a 5 V reference.

<sub>from ECE-09-09</sub>

### 5. A program stores the 32-bit value $0x12345678$ to byte address $0x2000$. Give the memory contents from $0x2000$ upward for a little-endian and a big-endian machine.

**Given:** value = 0x12345678; address = 0x2000; byte-wide memory

> [!success]- Answer
> **Little-endian: $78\ 56\ 34\ 12$. Big-endian: $12\ 34\ 56\ 78$ (ascending addresses).**

> [!warning] Trap
> Reversing the whole 4-byte word for little-endian. Only the byte *order* reverses; the bit order inside each byte is unchanged.

<sub>from ECE-09-02</sub>

### 6. The same DMA channel steals one bus cycle in every four. By how much does a 100 ms CPU-bound task stretch?

**Given:** cycle stealing 1 in 4; $T_{old} = 100$ ms

> [!success]- Answer
> **$133$ ms — a 33 % stretch.**

> [!warning] Trap
> Adding 25 % to the original time to get 125 ms. Losing 25 % of the cycles means the remaining 75 % must do all the work, so the stretch is $1/0.75 = 1.333$, not $1.25$.

<sub>from ECE-09-07</sub>

### 7. A 64 KiB memory space must be built from 16 KiB SRAM chips. How many chips are needed, how many address lines reach each chip, and how are they selected?

**Given:** system capacity = 64 KiB; chip capacity = 16 KiB; 16 address lines

> [!success]- Answer
> **4 chips, $A_0$–$A_{13}$ to each, $A_{14}$–$A_{15}$ through a 2-to-4 decoder for chip select.**

> [!warning] Trap
> Sending all 16 address lines to every chip. A 14-line chip cannot use A14/A15; those lines belong to the decoder, which is the whole point of expansion.

<sub>from ECE-09-03</sub>

### 8. A UART peripheral uses 16x oversampling and is clocked at 7.3728 MHz. Find the divisor for 9600 baud and the resulting actual baud rate.

**Given:** $f_{clk} = 7.3728$ MHz; 16x oversampling; target = 9600 baud

> [!success]- Answer
> **Divisor 48; actual baud 9600 (zero error).**

> [!warning] Trap
> Forgetting the 16x oversampling and using 7.3728e6/9600 = 768. That divisor produces 600 baud — the link fails completely and the symptom looks like a wiring fault.

<sub>from ECE-09-10</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-09-01 | CPU Architecture: CISC and RISC | 5 |
| ECE-09-02 | Registers, Buses and Memory Organization | 5 |
| ECE-09-03 | Memory Technologies and Address Decoding | 5 |
| ECE-09-04 | Instruction and Machine Cycles | 5 |
| ECE-09-05 | Addressing Modes and Instruction Sets | 5 |
| ECE-09-06 | Interrupts and ISRs | 5 |
| ECE-09-07 | DMA and Bus Arbitration | 5 |
| ECE-09-08 | GPIO and Timer Peripherals | 5 |
| ECE-09-09 | PWM and ADC/DAC Modules | 5 |
| ECE-09-10 | Serial Interfaces: UART, SPI, I2C | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
