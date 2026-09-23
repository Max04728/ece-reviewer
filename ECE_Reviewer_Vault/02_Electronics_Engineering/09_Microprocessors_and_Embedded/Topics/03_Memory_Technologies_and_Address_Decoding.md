---
id: ECE-09-03
title: "Memory Technologies and Address Decoding"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Registers,_Buses_and_Memory_Organization]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Memory Technologies and Address Decoding

> [!abstract] Scope
> Choose between SRAM, DRAM and the ROM/Flash family, and design the address decoding that maps chips into a memory map.

## Core Concept

> [!tip] Intuition
> A memory chip is a rectangular array of cells; the address decoder is the switchboard that decides which rectangle — and which row inside it — is allowed to answer.

**The hierarchy and the technology behind it.** Registers sit at the top, then SRAM cache, then DRAM main memory, then Flash or disk. Each level down is larger, cheaper per bit and slower. Volatility splits the family in two: SRAM and DRAM lose their contents when power is removed; mask ROM, PROM, EPROM, EEPROM and Flash keep theirs.

**SRAM versus DRAM.** An SRAM cell is a six-transistor latch — it holds a bit as long as power is applied and needs no refreshing, which makes it fast but bulky and expensive. A DRAM cell is one transistor plus one capacitor; the charge leaks away, so every row must be refreshed periodically (typically every 64 ms for the whole array), and a read is destructive and must be followed by a write-back. DRAM therefore delivers far more bits per die at lower cost, but slower and with refresh overhead stealing bus cycles. SRAM is cache; DRAM is main memory.

**The ROM family.** Mask ROM is programmed at fabrication. PROM is field-programmable once, by blowing fuses. EPROM is erased with ultraviolet light through a quartz window. EEPROM is erased electrically, byte by byte. Flash is EEPROM with block or sector erase: NOR Flash offers random access and is used for boot code, NAND Flash offers page access, higher density and lower cost, and is used for bulk storage. All of them are non-volatile, and Flash has a finite erase endurance.

**Full versus partial decoding.** *Full decoding* uses every high-order address line, so each physical location answers at exactly one address and the map has no aliases. *Partial decoding* ignores some high-order lines, usually to save a decoder. The ignored lines become don't-cares, and the device reappears — *folds back* — at $2^{k}$ addresses, where $k$ is the number of ignored lines. That is why a 16 KiB RAM selected by one address line answers at two different 16 KiB windows.

**Expanding capacity and word width.** Capacity expansion puts identical chips in a bank and uses a decoder on the high-order lines to select one chip at a time. Word-width expansion wires several chips in parallel, all selected together, each driving a different slice of the data bus. Real systems do both: two banks of four byte-wide chips gives a 32-bit-wide 2-bank memory. Every chip needs its chip select from the decoder and its output enable from the read strobe; asserting chip select alone does not put data on the bus.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Address lines for a chip | $n = \log_2(\mathrm{capacity\ in\ bytes})$ | A 16 KiB chip needs 14 lines (A0–A13). The remaining high-order lines go to the chip-select decoder. |
| Number of chips to expand capacity | $N_{chips} = \frac{\mathrm{system\ capacity}}{\mathrm{chip\ capacity}}$ | Assumes identical chips and byte-wide organisation. A 64 KiB system built from 16 KiB chips needs 4. |
| Address range of a mapped device | $\mathrm{range} = [\,B,\ B + 2^{n} - 1\,]$ | B = base address, n = lines the device decodes. 4 KiB at 0x8000 covers 0x8000–0x8FFF. |
| Foldback images under partial decoding | $\mathrm{images} = 2^{k}$ | k = number of address lines ignored by the chip select. Each image is a full copy of the chip's address window. |
| DRAM refresh interval | $t_{ref} = \frac{t_{refresh\ period}}{\mathrm{rows}}$ | 8192 rows refreshed within 64 ms means one row every 7.81 us; each refresh steals bus cycles from the CPU. |
| Memory bandwidth | $BW = \frac{w}{8} \times f_{access}$ | w = data width in bits, f_access = completed accesses per second including wait states and refresh. |
| Access time versus cycle time | $t_{cycle} = t_{access} + t_{recovery}$ | DRAM read is destructive, so the write-back recovery time is part of the cycle time; only the access time appears in a datasheet's speed grade. |

## Worked Problems

### P1. A 64 KiB memory space must be built from 16 KiB SRAM chips. How many chips are needed, how many address lines reach each chip, and how are they selected?

**Given:** system capacity = 64 KiB; chip capacity = 16 KiB; 16 address lines

**Solution:**

1. $N = 64\ \mathrm{KiB}/16\ \mathrm{KiB} = 4$ chips
2. Each chip is $16\ \mathrm{KiB} = 2^{14}$ bytes, so it needs 14 lines: $A_0$–$A_{13}$
3. The remaining lines $A_{14}$ and $A_{15}$ drive a 2-to-4 decoder
4. Decoder outputs become the four chip selects: 0x0000, 0x4000, 0x8000, 0xC000

> [!success]- Answer
> **4 chips, $A_0$–$A_{13}$ to each, $A_{14}$–$A_{15}$ through a 2-to-4 decoder for chip select.**

> [!warning] Trap
> Sending all 16 address lines to every chip. A 14-line chip cannot use A14/A15; those lines belong to the decoder, which is the whole point of expansion.

### P2. A 4 KiB RAM chip is mapped with base address $0x8000$. What is its address range, and which address lines must the decoder check?

**Given:** capacity = 4 KiB; base = 0x8000; byte addressable

**Solution:**

1. $4\ \mathrm{KiB} = 4096 = 2^{12}$, so the chip uses $A_0$–$A_{11}$
2. The block spans $0x1000$ addresses: $0x8000$ to $0x8000 + 0x0FFF$
3. Decoder must assert chip select when $A_{15}A_{14}A_{13}A_{12} = 1000$
4. Range: $0x8000$–$0x8FFF$

> [!success]- Answer
> **Range $0x8000$–$0x8FFF$; decode the top four lines $A_{12}$–$A_{15}$.**

> [!warning] Trap
> Writing the end address as $0x9000$. The block contains 0x1000 addresses, so it ends at base + 0x0FFF.

### P3. An 8 KiB EPROM is mapped at $0x0000$ and an 8 KiB RAM at $0x2000$. How many address lines does each device decode, and does the decode use all the high-order lines?

**Given:** EPROM 8 KiB at 0x0000; RAM 8 KiB at 0x2000; 16 address lines

**Solution:**

1. $8\ \mathrm{KiB} = 8192 = 2^{13}$, so each device decodes $A_0$–$A_{12}$
2. EPROM window: $0x0000$–$0x1FFF$
3. RAM window: $0x2000$–$0x3FFF$
4. The EPROM is selected by $A_{15}A_{14}A_{13} = 000$ and the RAM by $A_{15}A_{14}A_{13} = 001$; $A_{13}$–$A_{15}$ are decoded, so this is full decoding of the used region

> [!success]- Answer
> **13 lines each ($A_0$–$A_{12}$); EPROM $0x0000$–$0x1FFF$, RAM $0x2000$–$0x3FFF$.**

> [!warning] Trap
> Giving the RAM 8 KiB but starting it at $0x2000$ and calling the pair 8 KiB + 8 KiB = 16 KiB of contiguous memory. The two windows are contiguous only up to $0x3FFF$; the space above is unmapped.

### P4. A 16 KiB SRAM (decoding $A_0$–$A_{13}$) is selected by $\overline{A_{15}}$ alone on a 16-bit address bus. What addresses does it answer at?

**Given:** chip = 16 KiB, uses $A_0$–$A_{13}$; chip select = $\overline{A_{15}}$; $A_{14}$ ignored

**Solution:**

1. The chip needs only $A_0$–$A_{13}$; the select ignores $A_{14}$
2. Ignored lines $k = 1$, so the number of images is $2^{1} = 2$
3. Chip select requires $A_{15} = 0$, i.e. the lower half $0x0000$–$0x7FFF$
4. Within that half the chip appears twice: $0x0000$–$0x3FFF$ and $0x4000$–$0x7FFF$

> [!success]- Answer
> **Two images: $0x0000$–$0x3FFF$ and $0x4000$–$0x7FFF$.**

> [!warning] Trap
> Concluding the RAM occupies $0x0000$–$0x7FFF$ once. Partial decoding makes the same 16 KiB of cells answer at two windows, so a write to $0x4000$ overwrites data held at $0x0000$.

### P5. A DRAM array has 8192 rows and must have every row refreshed within 64 ms. What is the required interval between refresh cycles?

**Given:** 8192 rows; refresh period = 64 ms

**Solution:**

1. $t_{ref} = 64\ \mathrm{ms}/8192$
2. $= 7.8125 \times 10^{-6}$ s
3. $= 7.81\ \mu s$

> [!success]- Answer
> **One row every $7.81\ \mu s$.**

> [!warning] Trap
> Dividing 64 ms by the number of columns or by the total cell count. Refresh is per *row*, so the row count is the divisor.

## Traps & Exam Notes

- **Partial decoding creates aliases.** A device whose chip select ignores a high-order line answers at several addresses; a stray pointer into an alias silently corrupts the real data, and the bug looks like random memory corruption.
- **Treating 4 KiB as 0x4000.** 4 KiB = 0x1000 addresses, 8 KiB = 0x2000, 16 KiB = 0x4000. Using the wrong power of two shifts the whole memory map.
- **Forgetting that DRAM needs refresh and SRAM does not.** Refresh cycles steal bandwidth, so a DRAM system's usable bandwidth is below its raw $w \times f$ figure.
- **Assuming Flash can be rewritten in place.** NOR Flash is byte-readable but erased per sector; NAND Flash is erased per block and read per page, so a single-byte update needs a read-modify-erase-rewrite cycle.
- **Asserting chip select without output enable.** Chip select chooses the device; output enable gates its drivers onto the data bus. Without the read strobe the bus floats or two devices fight.

## See Also

- [[02_Registers,_Buses_and_Memory_Organization]]
- [[04_Instruction_and_Machine_Cycles]]
- [[07_DMA_and_Bus_Arbitration]]
- [[01_CPU_Architecture_CISC_and_RISC]]

---

[[02_Registers,_Buses_and_Memory_Organization|⬅ 02]] · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Instruction_and_Machine_Cycles|04 ➡]]
