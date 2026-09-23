---
id: ECE-08-07
title: "Adders and Subtractors"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Signed_Arithmetic_and_Two’s_Complement]]", "[[04_Boolean_Algebra_and_De_Morgan]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Adders and Subtractors

> [!abstract] Scope
> Add and subtract binary words with half and full adders, compute carry-look-ahead chains, and detect signed overflow.

## Core Concept

> [!tip] Intuition
> Addition is the only arithmetic a digital system really needs. Subtraction, comparison and multiplication are all built from the same adder once negative numbers are stored in 2's complement. The design question is only how fast the carry can travel.

**Half adder and full adder.** A half adder adds two bits and produces $S = A\oplus B$ and $C = AB$, with no carry input. A full adder adds three bits (two operands plus a carry-in) and is the real building block:
$$S = A\oplus B\oplus C_{in}$$
and $C_{out} = AB + C_{in}(A\oplus B)$. The carry equation is the useful form because it reads as 'a carry is generated locally by $AB$, or propagated from below when $A\oplus B$ is true'. That generate/propagate reading is exactly what carry look-ahead exploits.

**Ripple-carry adders are simple but slow.** An $n$-bit adder chains $n$ full adders, each carry-out feeding the next carry-in. The worst case is a carry generated at the least significant bit that propagates the whole length: the carry-out of an $n$-bit adder is valid only after roughly $n$ carry delays, and each sum bit is valid one XOR delay later. For 8 bits and 12 ns per carry stage that is about 96 ns. Speed matters because the adder sits inside the critical path of every ALU.

**Carry look-ahead removes the ripple.** Each bit declares a **generate** $G_i = A_iB_i$ and a **propagate** $P_i = A_i\oplus B_i$. Both depend only on the operand bits, never on an incoming carry, so they can be computed in one gate delay. Then $C_{i+1} = G_i + P_iC_i$ can be expanded into a flat two-level expression for each carry, and all carries settle in a fixed number of gate delays independent of $n$. The price is fan-in and gate count: the expression for $C_4$ has five product terms, so wide adders use look-ahead in 4-bit blocks that are themselves rippled or grouped.

**Subtraction is addition of the 2's complement.** $A - B = A + \bar B + 1$, so a single adder with inverters on the $B$ inputs and a 1 injected at the LSB performs both operations. A control line called $\mathrm{SUB}$ can drive both the XOR inverters and the carry-in: $B_i\oplus \mathrm{SUB}$ inverts $B$ when $\mathrm{SUB}=1$. This is why processors have an add/subtract unit rather than two arithmetic units, and why the carry-in of the LSB is tied high during subtraction.

**Overflow is not carry-out.** An unsigned carry-out means the sum exceeded $2^n-1$. Signed overflow means the result fell outside $-(2^{n-1})$ to $+(2^{n-1}-1)$, and it is detected by $OV = C_{n-1}\oplus C_n$, the carry into the MSB XORed with the carry out of the MSB. Equivalently, overflow occurs exactly when both operands have the same sign and the result has the opposite sign. In the 4-bit sum $7 + 7$ the result pattern is $1110$ (which reads as $-2$) and the carry-in/carry-out pair is $1$ and $0$, so the XOR flags overflow. A subtractor can also overflow: $-8 - 1$ cannot be represented in 4 bits.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Half-adder sum and carry | $S = A \oplus B,\quad C = AB$ | Two operand bits only; no carry input. Used for the LSB or as a building block for a full adder. |
| Full-adder sum | $S = A \oplus B \oplus C_{in}$ | Three-input XOR. The order of the XORs does not matter. |
| Full-adder carry-out | $C_{out} = AB + C_{in}(A \oplus B)$ | Written as generate + propagate x carry-in; this form leads directly to look-ahead. |
| Ripple-carry delay | $t_{carry}(n) \approx n\,t_{carry,FA}$ | Worst case: a carry born at bit 0 propagates through every stage. Add one XOR delay for the final sum bit. |
| Generate and propagate | $G_i = A_i B_i,\quad P_i = A_i \oplus B_i$ | Both depend only on the operand bits, so they are available immediately. |
| Carry recurrence | $C_{i+1} = G_i + P_i C_i$ | Recursive form (that is a ripple). Expanding it flat gives the look-ahead network. |
| Look-ahead carry expansion | $C_4 = G_3 + P_3G_2 + P_3P_2G_1 + P_3P_2P_1G_0 + P_3P_2P_1P_0C_0$ | Flat two-level AND-OR. Fan-in grows with i, which is why blocks of 4 are used. |
| Subtraction with an adder | $A - B = A + \bar B + 1$ | Invert B and set the LSB carry-in to 1. Forgetting the +1 gives 1's complement subtraction, off by one. |
| Signed overflow flag | $OV = C_{n-1} \oplus C_n$ | Carry into the MSB XOR carry out of the MSB. Carry-out alone is unsigned overflow only. |
| n-bit full adder size | $n\ \mathrm{full\ adders},\ 2n\ \mathrm{operand\ bits}$ | A 4-bit adder needs 4 full adders; the LSB stage may use a half adder since its carry-in is fixed. |

## Worked Problems

### P1. A full adder receives $A=1$, $B=1$, $C_{in}=1$. Find $S$ and $C_{out}$.

**Given:** A = 1; B = 1; Cin = 1

**Solution:**

1. S = A XOR B XOR Cin = 1 XOR 1 XOR Cin
2. 1 XOR 1 = 0, then 0 XOR 1 = 1, so S = 1
3. A XOR B = 0, so the propagate term contributes nothing to the carry
4. Cout = AB + Cin(A XOR B) = 1 . 1 + 1 . 0 = 1
5. Check as arithmetic: 1 + 1 + 1 = 3 = 11 binary, so S = 1 and Cout = 1

> [!success]- Answer
> **$S = 1$, $C_{out} = 1$ (the sum is $11_2 = 3$)**

> [!warning] Trap
> Computing $C_{out} = AB + C_{in}$ and answering 1 for the wrong reason, or treating the sum as 2 and giving $C_{out}=0$. Three input bits can sum to 3, which needs a carry.

### P2. Perform $1011_2 + 0110_2$ with a 4-bit ripple-carry adder. Give the sum bits and the carry-out.

**Given:** A = 1011; B = 0110; unsigned, 4-bit adder

**Solution:**

1. Bit 0: 1 + 0 = 1, carry 0
2. Bit 1: 1 + 1 = 0 with carry 1 (C2 = 1)
3. Bit 2: 0 + 1 + carry 1 = 0 with carry 1 (C3 = 1)
4. Bit 3: 1 + 0 + carry 1 = 0 with carry 1 (C4 = 1)
5. Sum bits (S3 S2 S1 S0) = 0001, carry-out = 1
6. Check in decimal: 11 + 6 = 17 = 10001 binary

> [!success]- Answer
> **Sum $= 0001$ with $C_{out} = 1$ (17 in decimal)**

> [!warning] Trap
> Dropping the carry-out and reporting the sum as 1. For an unsigned interpretation the carry-out is the fifth bit; for a signed interpretation this same case has no overflow (a positive plus a positive that yields a negative would be needed).

### P3. Compute $6 - 9$ with a 4-bit adder using 2's complement, and state the result in decimal.

**Given:** A = 6 (0110); B = 9 (1001); 4-bit 2's complement

**Solution:**

1. Invert B: NOT 1001 = 0110
2. Add 1 to the inverted value: 0110 + 1 = 0111, which is -9 in 4-bit 2's complement
3. Add: 0110 + 0111 = 1101 with carry-out 0
4. Decode 1101: -8 + 4 + 0 + 1 = -3
5. Check: 6 - 9 = -3, and -3 is inside the 4-bit range -8 to +7, so no overflow

> [!success]- Answer
> **$6 - 9 = 1101_2 = -3$**

> [!warning] Trap
> Using 1's complement (invert only, no +1), which gives $0110 + 0110 = 1100 = -4$ and an end-around carry that must be added back. The subtractor is only correct with the +1 at the LSB carry-in.

### P4. A 4-bit signed adder computes $7 + 7$. Give the result bits and prove the overflow flag is asserted.

**Given:** A = 0111 (+7); B = 0111 (+7); 4-bit signed

**Solution:**

1. Bit 0: 1+1 = 0 carry 1; bit 1: 1+1+1 = 1 carry 1; bit 2: 1+1+1 = 1 carry 1
2. Bit 3 (MSB): 0+0+1 = 1 with carry-out 0
3. So S = 1110 and C4 = 0
4. Carry into the MSB, C3 = 1 (produced by bit 2), carry out of the MSB, C4 = 0
5. OV = C3 XOR C4 = 1 XOR 0 = 1
6. Sanity check by sign: both operands positive, result has MSB 1 (negative), so overflow
7. 1110 reads as -2, and the true sum 14 exceeds the 4-bit signed maximum of +7

> [!success]- Answer
> **$S = 1110$ with $OV = 1$; the true sum 14 is not representable**

> [!warning] Trap
> Concluding 'no overflow' because the carry-out is 0, or 'overflow' merely because the MSB is 1. In 2's complement a negative result with a 1 in the MSB is perfectly normal; overflow needs the sign-violation test.

### P5. For the addition $1011 + 0110$ with $C_0 = 0$, compute the generate and propagate bits and all four look-ahead carries. Compare with the ripple-carry delay if each stage carry costs 12 ns.

**Given:** A = 1011; B = 0110; C0 = 0; t_carry = 12 ns per stage

**Solution:**

1. Bit 0: G0 = 1.0 = 0, P0 = 1 XOR 0 = 1
2. Bit 1: G1 = 1.1 = 1, P1 = 1 XOR 1 = 0
3. Bit 2: G2 = 0.1 = 0, P2 = 0 XOR 1 = 1
4. Bit 3: G3 = 1.0 = 0, P3 = 1 XOR 0 = 1
5. C1 = G0 + P0C0 = 0 + 0 = 0
6. C2 = G1 + P1C1 = 1 + 0 = 1
7. C3 = G2 + P2C2 = 0 + 1 = 1
8. C4 = G3 + P3C3 = 0 + 1 = 1, matching the ripple result
9. Ripple-carry comparison: the carry-out of a 4-bit ripple adder waits about 4 x 12 ns = 48 ns, while look-ahead forms every carry in 2 gate levels after G and P, roughly 36 ns here and independent of word length

> [!success]- Answer
> **$G_3G_2G_1G_0 = 0010$, $P_3P_2P_1P_0 = 1101$, carries $C_1C_2C_3C_4 = 0,1,1,1$**

> [!warning] Trap
> Using $P_i = A_i + B_i$ (OR) instead of XOR. With OR, a bit that generates a carry also claims to propagate one, and the look-ahead equations produce a carry where none exists. Also note $G$ and $P$ never depend on the incoming carry.

## Traps & Exam Notes

- **Omitting the +1 in 2's complement subtraction.** Invert-and-add is required. Inverting alone performs 1's complement subtraction and is off by one unless an end-around carry is added back.
- **Confusing carry-out with overflow.** Carry-out is an unsigned event. Signed overflow is $C_{in}\oplus C_{out}$ of the MSB, or equivalently same-sign operands with an opposite-sign result.
- **Assuming a full adder can be replaced by two half adders without the OR gate.** Two half adders plus an OR of their carries make a full adder; omitting the OR drops the case where both stages generate a carry.
- **Using OR instead of XOR for propagate.** $P_i = A_i\oplus B_i$; with OR, generate bits are double-counted and the look-ahead carry is wrong for inputs such as $A_i=B_i=1$.
- **Forgetting the final sum XOR delay.** Ripple delay is quoted for the *carry*; each sum bit needs one more XOR after its carry arrives, so the true critical path is a little longer than $n\,t_{carry}$.
- **Subtractor overflow at the negative extreme.** In 4 bits, $-8 - 1$ and $+7 + 1$ both overflow. Check the sign rule rather than trusting the magnitude.
- **Reading $C_4$ as the MSB of the sum in a signed system.** For unsigned arithmetic the carry-out is the extra bit; for signed arithmetic it is discarded and the flag of interest is $OV$.

## See Also

- [[02_Signed_Arithmetic_and_Two’s_Complement]]
- [[06_Karnaugh_Maps]]
- [[09_Multiplexers_and_Demultiplexers]]
- [[13_Asynchronous_and_Synchronous_Counters]]

---

[[06_Karnaugh_Maps|⬅ 06]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Encoders_and_Decoders|08 ➡]]
