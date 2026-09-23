---
id: ECE-09-02
title: "Registers, Buses and Memory Organization"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_CPU_Architecture_CISC_and_RISC]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Registers, Buses and Memory Organization

> [!abstract] Scope
> Identify the CPU registers and bus signals that carry out a transfer, and size a memory from its address lines, data width and timing.

## Core Concept

> [!tip] Intuition
> The CPU never touches memory directly. Every access travels one road — the address bus out, the data bus back — and the control bus says which direction and when.

**The registers that run the fetch cycle.** The *program counter* (PC) holds the address of the next instruction. The *memory address register* (MAR) holds the address currently on the address bus; the *memory data register* (MDR) holds the value currently on the data bus. The *instruction register* (IR) holds the opcode being decoded, the *stack pointer* (SP) points at the top of the stack, the *accumulator* or general-purpose registers hold operands, and the *flags/status register* holds carry, zero, sign, overflow and interrupt-enable bits. A fetch is the sequence PC → MAR, memory read, MDR → IR, PC + 1. Keeping MAR and MDR straight is the whole trick: MAR is an address, MDR is data.

**The three buses.** The *address bus* is unidirectional, sourced by the CPU or a bus master, and its width fixes the address space as $2^{n}$ locations. The *data bus* is bidirectional and its width fixes the transfer granule — an 8-bit data bus moves one byte per cycle, a 32-bit bus moves four. The *control bus* carries the read/write strobes, the clock, interrupt request lines, and the bus request/grant pair used for DMA arbitration. Address width and data width are independent: a 16-bit address bus with a 32-bit data bus is perfectly ordinary.

**Memory organization.** A *byte-addressable* machine gives every byte its own address; a *word-addressable* machine gives one address per word, so an address of $k$ means byte $k \times w/8$. Endianness fixes how a multi-byte value is laid out: big-endian puts the most significant byte at the lowest address, little-endian puts the least significant byte there. In a byte-wide memory dump of $0x12345678$ stored at $0x2000$, little-endian reads $78\ 56\ 34\ 12$ from $0x2000$ upward and big-endian reads $12\ 34\ 56\ 78$.

**The memory map and chip select.** The full address space is not memory. Boot ROM, RAM, memory-mapped peripherals, and often unmapped holes are carved out by the address decoder, which asserts a chip select only when the high-order address lines match that device's region. Memory-mapped I/O gives a peripheral register an ordinary address, so `LD` and `ST` reach it; isolated (port-mapped) I/O uses a separate address space and separate `IN`/`OUT` instructions.

**Bus timing and bandwidth.** A bus cycle costs a whole number of clock periods. Slow memory inserts *wait states*, each adding one clock. Bandwidth is the transfer granule times the transfer rate, $BW = w \times f_{bus}$, so a 16-bit bus at 8 MHz peaks at 128 Mbit/s = 16 MB/s. Any wait state or arbitration gap divides that down. Cache exists precisely because the CPU's appetite exceeds affordable memory bandwidth.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Addressable locations | $N = 2^{n}$ | n = number of address lines. On a byte-addressable machine this is a number of *bytes*, whatever the data bus width. |
| Address lines needed | $n = \lceil \log_2 N \rceil$ | N = required number of addressable units. 512 KiB needs 19 lines because 2^{19} = 524288. |
| Memory capacity | $C = 2^{n} \times w$ | Total bits, w = data bus width in bits. Divide by 8 for bytes. |
| Address range of a device | $\mathrm{range} = [\,B,\ B + 2^{n} - 1\,]$ | B = base address, n = address lines decoded by that device. A 4 KiB block spans 0x1000 addresses and ends at B + 0x0FFF. |
| Bus bandwidth | $BW = w \times f_{bus}$ | w in bits gives bit/s; divide by 8 for bytes/s. Assumes one transfer every bus clock with no wait states. |
| Bus cycle with wait states | $t_{cyc} = (T_{base} + WS) \times T_{clk}$ | T_base = clocks in the nominal cycle, WS = wait states inserted. Each wait state is one whole clock, never a fraction. |
| Address space with mapped windows | $\mathrm{Unmapped\ hole} = 2^{n} - \sum_i \mathrm{size}_i$ | Holes respond to nothing; reading one returns floating-bus data, which is why firmware vectors are placed away from them. |

## Worked Problems

### P1. A byte-addressable CPU has 16 address lines $A_0$–$A_{15}$ and a 16-bit data bus. How much memory can it address, and what is the full address range?

**Given:** 16 address lines; byte addressable; 16-bit data bus

**Solution:**

1. Number of locations: $N = 2^{16} = 65{,}536$
2. Byte-addressable, so that is $65{,}536$ bytes $= 64$ KiB
3. Range: $0x0000$ to $0xFFFF$ inclusive
4. The 16-bit data bus does not change the count — it changes how many bytes move per cycle

> [!success]- Answer
> **$64$ KiB, range $0x0000$–$0xFFFF$.**

> [!warning] Trap
> Multiplying by the data bus width. On a byte-addressable machine $n$ address lines give $2^{n}$ *bytes*; the 16-bit bus only means two of those bytes can be fetched at once.

### P2. A system needs 512 KiB of RAM. How many address lines must the decoder provide, and how wide must the MAR be?

**Given:** capacity = 512 KiB; byte addressable

**Solution:**

1. $512\ \mathrm{KiB} = 512 \times 1024 = 524{,}288$ bytes
2. $524{,}288 = 2^{19}$
3. So 19 address lines $A_0$–$A_{18}$ are required
4. The MAR must be at least 19 bits wide

> [!success]- Answer
> **$19$ address lines; MAR $\geq 19$ bits.**

> [!warning] Trap
> Using $512 \times 1000 = 512{,}000$, which is not a power of two and gives $\log_2 512000 = 18.97$, rounded wrongly to 18. Binary capacities are multiples of 1024.

### P3. A bus runs at 8 MHz with a 16-bit data bus and transfers one word per clock. Find the peak bandwidth in Mbit/s and MB/s.

**Given:** $f_{bus} = 8$ MHz; $w = 16$ bits; one transfer per clock

**Solution:**

1. $BW = w \times f_{bus} = 16 \times 8 \times 10^{6}$
2. $= 1.28 \times 10^{8}$ bit/s $= 128$ Mbit/s
3. Convert: $128/8 = 16$ MB/s

> [!success]- Answer
> **$128$ Mbit/s $= 16$ MB/s.**

> [!warning] Trap
> Quoting 128 MB/s by forgetting the bit-to-byte conversion. Bus bandwidth is quoted in both units and the factor of 8 is the usual lost mark.

### P4. The same 8 MHz bus inserts 2 wait states on every 16-bit transfer. What is the real bandwidth?

**Given:** $f_{bus} = 8$ MHz; $w = 16$ bits; 2 wait states

**Solution:**

1. Nominal cycle = 1 clock, plus 2 wait states = 3 clocks per transfer
2. Transfer rate $= 8 \times 10^{6}/3 = 2.667 \times 10^{6}$ transfers/s
3. Bandwidth $= 2.667 \times 10^{6} \times 2$ bytes
4. $= 5.33$ MB/s

> [!success]- Answer
> **$5.33$ MB/s — one third of the peak.**

> [!warning] Trap
> Subtracting a fixed time instead of whole clocks. Wait states are counted in clock periods, so 2 wait states divides the rate by 3, not by 1.25.

### P5. A program stores the 32-bit value $0x12345678$ to byte address $0x2000$. Give the memory contents from $0x2000$ upward for a little-endian and a big-endian machine.

**Given:** value = 0x12345678; address = 0x2000; byte-wide memory

**Solution:**

1. Little-endian: least significant byte at the lowest address
2. $0x2000 = 0x78$, $0x2001 = 0x56$, $0x2002 = 0x34$, $0x2003 = 0x12$
3. Big-endian: most significant byte at the lowest address
4. $0x2000 = 0x12$, $0x2001 = 0x34$, $0x2002 = 0x56$, $0x2003 = 0x78$

> [!success]- Answer
> **Little-endian: $78\ 56\ 34\ 12$. Big-endian: $12\ 34\ 56\ 78$ (ascending addresses).**

> [!warning] Trap
> Reversing the whole 4-byte word for little-endian. Only the byte *order* reverses; the bit order inside each byte is unchanged.

## Traps & Exam Notes

- **Using the data bus width when sizing memory.** $n$ address lines on a byte-addressable machine give $2^{n}$ bytes no matter whether the data bus is 8, 16 or 32 bits wide.
- **Computing a device's last address as base + size.** A 4 KiB block starting at $0x8000$ ends at $0x8FFF$, not $0x9000$; the range is base to base + size − 1.
- **Mixing up MAR and MDR.** MAR carries the address out of the CPU, MDR carries data in or out. Swapping them is the standard distractor in register-transfer questions.
- **Confusing Mbit/s with MB/s.** Bus bandwidth differs by a factor of 8 between the two units; state which one the answer is in.
- **Assuming every address in the map is memory.** Regions assigned to ROM, peripherals or nothing at all sit in the same $2^{n}$ space, so an unmapped address returns floating-bus data rather than an error.

## See Also

- [[01_CPU_Architecture_CISC_and_RISC]]
- [[03_Memory_Technologies_and_Address_Decoding]]
- [[04_Instruction_and_Machine_Cycles]]
- [[07_DMA_and_Bus_Arbitration]]

---

[[01_CPU_Architecture_CISC_and_RISC|⬅ 01]] · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Memory_Technologies_and_Address_Decoding|03 ➡]]
