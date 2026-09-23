---
id: ECE-09-05
title: "Addressing Modes and Instruction Sets"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Instruction_and_Machine_Cycles]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Addressing Modes and Instruction Sets

> [!abstract] Scope
> Compute effective addresses for each addressing mode and read an instruction format to size the opcode space and the instruction stream.

## Core Concept

> [!tip] Intuition
> An addressing mode is an answer to one question: where is the operand? The answer may be in the instruction itself, in a register, at an address spelled out in the instruction, or at an address the CPU has to compute.

**The modes, in order of indirection.** *Implied* — the operand is understood (the accumulator, or the stack top). *Immediate* — the operand is a constant embedded in the instruction. *Register* — the operand is in a named register. *Direct/absolute* — the instruction holds the operand's memory address. *Register indirect* — the instruction names a register that holds the address. *Indexed/based* — the address is a base register plus an index register plus a displacement field. *Relative* — the address is the program counter plus a signed offset. *Autoincrement/autodecrement* — register indirect that updates the register as a side effect, which is how array walks and stack pushes are coded.

**Effective address is the whole computation.** For indexed addressing the effective address is:
$$EA = \mathrm{base} + \mathrm{index} + \mathrm{displacement}$$
For relative addressing, $EA = PC_{next} + \mathrm{offset}$. The arithmetic is done in the address-generation unit with a fixed width, so a 16-bit EA wraps at 64 KiB and can alias a different physical location. Indirect modes cost extra memory accesses: direct costs one data access, register indirect one, and pointer-to-pointer two.

**Instruction format trades space for flexibility.** An instruction is an opcode field plus operand fields. Every addressing-mode bit you add shrinks the opcode field, so a machine with many modes has fewer distinct opcodes or longer instructions. RISC resolves this by keeping instructions fixed at 32 bits and restricting memory operands to explicit load and store instructions; CISC allows memory operands inside arithmetic instructions and pays with variable, harder-to-decode formats.

**Immediate operands are sign-extended or zero-extended.** An 8-bit immediate of $0x9C$ is 156 when the field is unsigned and $-100$ when the field is two's-complement. Getting the extension wrong turns a small negative constant into a large positive one, which is a favourite exam error. The same field also has a fixed range: a signed $n$-bit immediate covers $-2^{n-1}$ to $+2^{n-1}-1$, so an 8-bit signed field cannot hold 200.

**Instruction length drives everything downstream.** A fixed 3-byte instruction stream of 4096 instructions occupies 12 KiB, and the PC advances by exactly 3 each time. In a variable-length ISA the PC advance depends on the instruction, which is why relative branches, disassemblers and instruction caches all become harder — and why RISC machines keep length uniform.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Immediate addressing | $EA = \mathrm{address\ of\ the\ operand\ field}$ | No data memory access: the constant travels with the instruction. It cannot be a variable. |
| Direct (absolute) addressing | $EA = \mathrm{operand\ field}$ | One extra data memory access. The address is fixed at assembly time unless self-modifying code is used. |
| Register indirect | $EA = [R]$ | Register R holds the address. One data access; autoincrement forms add the operand size to R. |
| Indexed / based addressing | $EA = \mathrm{base} + \mathrm{index} + \mathrm{displacement}$ | Any term may be zero. The sum is truncated to the address width, so a 16-bit EA wraps at 64 KiB. |
| PC-relative addressing | $EA = PC_{next} + \mathrm{offset}$ | PC_next is the address of the following instruction, already incremented during fetch. |
| Signed offset range | $-2^{n-1} \leq \mathrm{offset} \leq 2^{n-1} - 1$ | For an 8-bit offset: -128 to +127. A displacement outside this range needs a longer field or a two-instruction sequence. |
| Instruction length | $L = n_{opcode} + m \, n_{reg} + n_{imm}$ | m = number of register operand fields. Round up to a whole number of bytes when the ISA is byte-aligned. |
| Data memory accesses per instruction | $N_{mem} = 1 + \mathrm{indirections}$ | One fetch always; add one per level of indirection plus one for each memory operand. |

## Worked Problems

### P1. A 2-byte branch at address $0x1000$ carries the 8-bit offset $0xEC$. Find the branch target.

**Given:** branch at 0x1000; 2-byte instruction; offset = 0xEC

**Solution:**

1. $PC_{next} = 0x1000 + 2 = 0x1002$
2. Offset is two's complement: $0xEC = 236 - 256 = -20$
3. Target $= 0x1002 - 20$
4. $0x1002 = 4098$, and $4098 - 20 = 4078 = 0x0FEE$

> [!success]- Answer
> **$0x0FEE$.**

> [!warning] Trap
> Subtracting from $0x1000$ instead of $0x1002$. PC-relative offsets are counted from the next instruction, so the answer is short by the instruction length.

### P2. An indexed instruction uses base register $= 0x2000$, index register $= 0x0034$ and a displacement field of $-8$. Find the effective address.

**Given:** base = 0x2000; index = 0x0034; displacement = -8

**Solution:**

1. $EA = \mathrm{base} + \mathrm{index} + \mathrm{displacement}$
2. $= 0x2000 + 0x0034 - 8$
3. $= 0x2034 - 0x0008$
4. $= 0x202C$

> [!success]- Answer
> **$0x202C$.**

> [!warning] Trap
> Adding the magnitude of a negative displacement. A displacement of $-8$ subtracts; treating it as $+8$ gives $0x203C$.

### P3. An ISA uses a 6-bit opcode, two register operands selected from 32 registers, and an 8-bit immediate. How long is one instruction, and how much memory do 4096 of them occupy?

**Given:** opcode = 6 bits; 2 register fields from 32 registers; immediate = 8 bits

**Solution:**

1. Selecting one of 32 registers needs $\log_2 32 = 5$ bits, so $2 \times 5 = 10$ bits
2. Total $= 6 + 10 + 8 = 24$ bits
3. Byte-aligned, that is exactly 3 bytes
4. $4096 \times 3 = 12{,}288$ bytes

> [!success]- Answer
> **24 bits (3 bytes) per instruction; 12 KiB for 4096 instructions.**

> [!warning] Trap
> Using 4 bits for the register field because '16 registers is usual'. The register count fixes the field width: 32 registers needs 5 bits, and forgetting it undersizes the instruction by 1 bit per field.

### P4. A register-indirect instruction with post-increment, `LD R0, (R1)+`, accesses a 4-byte operand with $R1 = 0x3000$. What address is read and what is $R1$ afterwards?

**Given:** $R1 = 0x3000$; operand size = 4 bytes; post-increment

**Solution:**

1. Post-increment uses the current value first: $EA = 0x3000$
2. Then $R1$ advances by the operand size
3. $R1 = 0x3000 + 4 = 0x3004$
4. Addresses read: $0x3000$–$0x3003$

> [!success]- Answer
> **Reads $0x3000$–$0x3003$; $R1$ becomes $0x3004$.**

> [!warning] Trap
> Pre-incrementing. That would read from $0x3004$ and leave the first four bytes of the array unread — the classic off-by-one-operand error.

### P5. An 8-bit immediate field contains $0x9C$. Give its value as an unsigned number and as a signed two's-complement number, and state the range a signed 8-bit immediate can represent.

**Given:** field = 0x9C; 8 bits

**Solution:**

1. Unsigned: $0x9C = 9 \times 16 + 12 = 156$
2. Signed: the top bit is set, so value $= 156 - 256 = -100$
3. Signed 8-bit range: $-2^{7}$ to $2^{7} - 1$
4. $= -128$ to $+127$

> [!success]- Answer
> **Unsigned 156, signed $-100$; range $-128$ to $+127$.**

> [!warning] Trap
> Zero-extending instead of sign-extending when the immediate is used in a wider operation. Zero-extending $0x9C$ gives $+156$, a 256-off error that silently changes the sign of the result.

## Traps & Exam Notes

- **Measuring a PC-relative offset from the branch instruction.** The offset is added to the address of the *next* instruction, so the answer is short by the branch's own length.
- **Adding the magnitude of a negative displacement.** Displacement fields are signed; $-8$ subtracts from the base and index.
- **Sizing the register field from habit.** The field width is $\log_2(\mathrm{number\ of\ registers})$, so 32 registers need 5 bits and 64 need 6.
- **Treating an immediate as a memory address.** Immediate mode embeds the constant in the instruction stream; it never costs a data memory access.
- **Ignoring address-width truncation.** Effective-address arithmetic is done in a fixed-width adder, so a 16-bit EA wraps at 64 KiB and can alias a different physical address with no error flag.
- **Using the same register as both autoincrement target and operand base.** The read value and the updated value depend on the implementation; most ISAs leave it undefined.

## See Also

- [[04_Instruction_and_Machine_Cycles]]
- [[02_Registers,_Buses_and_Memory_Organization]]
- [[01_CPU_Architecture_CISC_and_RISC]]
- [[03_Memory_Technologies_and_Address_Decoding]]

---

[[04_Instruction_and_Machine_Cycles|⬅ 04]] · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Interrupts_and_ISRs|06 ➡]]
