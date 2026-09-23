---
id: ECE-08-02
title: "Signed Arithmetic and Two’s Complement"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Number_Systems_and_Base_Conversion]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Signed Arithmetic and Two’s Complement

> [!abstract] Scope
> Represent negative integers in a fixed-width binary word, negate them, add them, and detect signed overflow.

## Core Concept

> [!tip] Intuition
> Two's complement turns subtraction into addition by making the most significant bit worth $-2^{n-1}$ instead of $+2^{n-1}$. The hardware never needs a subtractor — one adder and some inverters do everything.

**Three signed representations, one survivor.** In *sign-magnitude* the MSB is a sign flag and the remaining bits are the magnitude, so $+5 = 00101$ and $-5 = 10101$. In *1's complement* a negative number is the bitwise NOT of its positive form. In *2's complement* it is the bitwise NOT plus 1. Only 2's complement survived in hardware because it has a single zero, needs no correction on addition, and lets subtraction reuse the adder.

**The defining relation.** For an $n$-bit word, the negative value $-N$ is stored as $2^n - N$. Equivalently the MSB carries weight $-2^{n-1}$ and all other bits carry their usual positive weights, so $11010011$ means $-128 + 64 + 16 + 2 + 1 = -45$. This negative-weight reading is the fastest way to decode a 2's complement word back to decimal and it never needs a separate sign check.

**Range is asymmetric.** An $n$-bit 2's complement word spans $-(2^{n-1})$ to $+(2^{n-1}-1)$: 8 bits give $-128\ldots+127$, 12 bits give $-2048\ldots+2047$. There is one more negative code than positive because zero occupies a single code (positive) and the leftover pattern $1000\ldots0$ is $-2^{n-1}$. Negating $-2^{n-1}$ is impossible: the result does not fit, and invert-and-add-1 returns the same pattern.

**Negation is invert-and-add-1.** To find $-45$ in 8 bits: $45 = 00101101$, invert to $11010010$, add 1 to get $11010011$ ($\mathrm{D3}_{16}$). The same operation converts a negative back to positive, because two's complementing twice returns the original. A shortcut for exam speed: scan the word from the LSB, copy bits up to and including the first 1, then invert every remaining bit.

**Signed addition and overflow.** Add bit patterns with an ordinary binary adder and discard the final carry-out; the result is correct in 2's complement. Overflow is a different event from carry-out. It occurs only when both operands share a sign and the result has the opposite sign, and it is detected in hardware by XORing the carry **into** the MSB with the carry **out of** the MSB: overflow $= C_{n-1}\oplus C_n$. In the 8-bit sum $100 + 50 = 150$, both operands are positive but the result $10010110$ has MSB 1 and reads as $-106$; the carry-in is 1 and the carry-out is 0, so the XOR flags the overflow.

**Sign extension preserves value.** Copying the sign bit into every new high-order position extends an $n$-bit word to $m$ bits without changing its value: $11110011_8 = -13$ extends to $1111111111110011_{16} = -13$. Zero extension instead would turn a negative number into a large positive one. Sign extension matters when a byte-wide result feeds a 16-bit adder or when a smaller immediate is used in a wider datapath.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Two's complement value of a negative | $-N \equiv 2^n - N$ | n-bit word, 1 <= N <= 2^{n-1}. The stored pattern is the same bits as the unsigned value 2^n - N. |
| Weighted decoding of a signed word | $N = -b_{n-1}2^{n-1} + \sum_{i=0}^{n-2} b_i 2^i$ | The MSB carries a negative weight. Fastest hand method for reading a 2's complement pattern. |
| Signed range | $-(2^{n-1}) \le N \le +(2^{n-1}-1)$ | 8 bits: -128 to +127. The range is asymmetric because there is only one zero. |
| Negation (invert and add one) | $-N = \overline{N} + 1$ | Two's complement of the whole word. Applying it twice returns the original pattern. |
| One's complement | $N_{1c} = (2^n - 1) - N$ | Pure bit inversion. Has two zeros (0000 and 1111 in 4 bits) and needs an end-around carry. |
| Signed overflow detection | $OV = C_{n-1} \oplus C_n$ | Carry INTO the MSB XORed with carry OUT of the MSB. Not the same as carry-out alone. |
| Sign extension | $b_{n-1}\ldots b_0 \to b_{n-1}\ldots b_{n-1}\,b_{n-1}\ldots b_0$ | Replicate the MSB into all new high positions; value is unchanged. Zero extension only works for unsigned. |
| Subtraction as addition | $A - B = A + \overline{B} + 1$ | One adder plus inverters. The +1 is injected at the carry-in of the LSB. |
| Number of signed codes | $2^{n-1}\ \mathrm{negative},\ 2^{n-1}-1\ \mathrm{positive},\ 1\ \mathrm{zero}$ | Counts exclude the negative-weight MSB pattern -2^{n-1}, which has no positive twin. |

## Worked Problems

### P1. Represent $-45$ as an 8-bit 2's complement word, in binary and hexadecimal.

**Given:** N = -45; word length = 8 bits

**Solution:**

1. +45 in 8-bit binary = 00101101
2. Invert every bit: 11010010 (1's complement)
3. Add 1: 11010011
4. Group for hex: 1101 0011 = D3
5. Check with the MSB weight: -128 + 64 + 16 + 2 + 1 = -45

> [!success]- Answer
> **$-45 = 11010011_2 = \mathrm{D3}_{16}$**

> [!warning] Trap
> Stopping after the inversion and answering $11010010$ ($\mathrm{D2}_{16} = -46$). The invert step gives 1's complement, not 2's complement.

### P2. Add $-37$ and $-52$ using 8-bit 2's complement and verify the result is $-89$.

**Given:** A = -37; B = -52; 8-bit 2's complement

**Solution:**

1. +37 = 00100101, so -37 = 11011011
2. +52 = 00110100, so -52 = 11001100
3. Add: 11011011 + 11001100 = 1 10100111
4. Discard the carry-out: 10100111
5. Decode: -128 + 32 + 4 + 2 + 1 = -89
6. Overflow check: carry into MSB = 1, carry out of MSB = 1, XOR = 0, no overflow

> [!success]- Answer
> **$-37 + (-52) = 10100111_2 = -89$**

> [!warning] Trap
> Reporting overflow because a carry-out appeared. Carry-out is discarded in 2's complement; only carry-in XOR carry-out of the MSB signals signed overflow.

### P3. An 8-bit adder computes $100 + 50$ in 2's complement. Show the result and detect the overflow.

**Given:** A = +100; B = +50; 8-bit signed

**Solution:**

1. +100 = 01100100, +50 = 00110010
2. Add: 01100100 + 00110010 = 10010110
3. Decode the sum: 10010110 = -128 + 16 + 4 + 2 = -106, which is wrong
4. Carry into the MSB: bit 6 produced a carry (1), so C_(n-1) = 1
5. Carry out of the MSB: 0 + 0 + 1 = 1 with no carry out, so C_n = 0
6. OV = 1 XOR 0 = 1, confirming signed overflow

> [!success]- Answer
> **$10010110_2$ with overflow asserted ($C_{in}=1$, $C_{out}=0$)**

> [!warning] Trap
> Answering 150. The 8-bit signed range stops at 127, so the true sum cannot be represented; the pattern present is -106. Also detect via the shortcut: both operands positive, result negative.

### P4. Sign-extend the 8-bit word $11110011$ to 16 bits and give its decimal value.

**Given:** word = 11110011; 8 bits, signed

**Solution:**

1. The MSB is 1, so the number is negative
2. Replicate the sign bit into bits 15 down to 8: 11111111, keeping the low byte 11110011
3. 16-bit result: 1111111111110011
4. Decimal by negation: invert 11110011 -> 00001100, add 1 -> 00001101 = 13, so the value is -13

> [!success]- Answer
> **$1111111111110011_2 = -13_{10}$, unchanged in value**

> [!warning] Trap
> Zero-extending to 0000000011110011, which reads as +243. Extension must copy the sign bit, not pad with zeros.

### P5. What is the 2's complement negation of the most negative 8-bit value, $-128$?

**Given:** N = -128; n = 8

**Solution:**

1. -128 in 8 bits is 10000000
2. Invert: 01111111
3. Add 1: 10000000
4. The result is again 10000000, i.e. -128
5. The true answer +128 needs 9 bits and does not fit

> [!success]- Answer
> **Negation returns $-128$; $+128$ is not representable in 8 bits**

> [!warning] Trap
> Reporting $+128$. The asymmetric range means $-2^{n-1}$ is its own negation in the same word length; sign-extend to 9 bits before negating.

## Traps & Exam Notes

- **Forgetting the +1.** Inverting the bits yields 1's complement. Forgetting the add gives a result that is off by one and decodes as $-46$ instead of $-45$.
- **Treating carry-out as overflow.** Discarding the carry-out is required for 2's complement addition; signed overflow is $C_{in}\oplus C_{out}$ of the MSB. A carry-out with equal carry-in is normal.
- **Negating the most negative value.** $-2^{n-1}$ has no positive counterpart in $n$ bits, so invert-and-add-1 returns the same pattern. Widen the word first.
- **Sign-magnitude habits.** Complementing only the MSB is sign-magnitude, not 2's complement, and it destroys the addition property. All $n$ bits must be inverted.
- **Assuming 1's complement has one zero.** It has two: $0000\ldots0$ and $1111\ldots1$ both mean zero, which is exactly why 2's complement replaced it.
- **Zero-extending a negative number.** Padding the top with 0s turns a negative byte into a large positive halfword; the sign bit must be replicated.
- **Reading the MSB as a pure sign flag.** At the extremes the sign rule and the negative-weight rule agree, so the shortcut works, but $10000000$ is $-128$, not $-0$. Decoding by weights never fails.

## See Also

- [[01_Number_Systems_and_Base_Conversion]]
- [[07_Adders_and_Subtractors]]
- [[03_Codes_BCD,_Gray,_ASCII,_Parity]]

---

[[01_Number_Systems_and_Base_Conversion|⬅ 01]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Codes_BCD,_Gray,_ASCII,_Parity|03 ➡]]
