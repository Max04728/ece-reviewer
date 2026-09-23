---
id: ECE-08-03
title: "Codes: BCD, Gray, ASCII, Parity"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Number_Systems_and_Base_Conversion]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Codes: BCD, Gray, ASCII, Parity

> [!abstract] Scope
> Encode decimal digits in BCD, convert between binary and Gray code, read ASCII codes, and apply parity and Hamming distance.

## Core Concept

> [!tip] Intuition
> A code is an agreed mapping from symbols to bit patterns. Some codes are weighted (BCD), some are built so neighbours differ by one bit (Gray), and some add a redundant bit so errors can be caught (parity).

**Weighted decimal codes.** BCD 8421 encodes each decimal digit separately in four bits whose weights are $8,4,2,1$:
$$74_{10} = 0111\,0100_{BCD}$$
Ten of the sixteen four-bit patterns are legal; $1010$ through $1111$ are **invalid BCD** and must never be produced by arithmetic. Because each digit is independent, BCD wastes codes and needs correction logic (add 6) after any addition whose nibble result exceeds 9. Two other weighted/adjusted codes appear on exams: **2421**, a self-complementing weighted code, and **excess-3**, which is simply BCD plus $0011$ — $74$ becomes $1010\,0111$, and its self-complementing property makes 9's complement a plain bit inversion.

**Gray code is unweighted and unit-distance.** Only one bit changes between consecutive codewords, so a mechanical or asynchronous transition can never produce a wildly wrong intermediate pattern. Binary $\to$ Gray is an XOR of adjacent bits:
$$g_i = b_i\oplus b_{i+1}$$
with the top bit copied, so $101101_2 \to 111011_{Gray}$. Gray $\to$ binary runs the same recurrence downward from the MSB: $b_{n-1}=g_{n-1}$ and $b_i = b_{i+1}\oplus g_i$, recovering $101101$. Gray code is used for rotary encoders, Karnaugh-map cell ordering, and asynchronous FIFO pointers. It is **not** a weighted code, so you cannot assign place values to its bits.

**ASCII essentials.** Standard ASCII is a 7-bit code giving 128 characters; the eighth bit is usually parity or zero. Three anchor values carry most exam questions: the digits start at $\mathrm{'0'} = 0\times30 = 48$, uppercase letters start at $\mathrm{'A'} = 0\times41 = 65$, and lowercase letters start at $\mathrm{'a'} = 0\times61 = 97$. The uppercase and lowercase alphabets are separated by exactly $0\times20 = 32$, i.e. bit 5, so case conversion is a single bit flip. Control characters occupy $0\times00$–$0\times1\mathrm{F}$.

**Parity adds one redundant bit.** An even-parity codeword has an even number of 1s; odd parity has an odd number. The parity bit is the XOR of the data bits (even parity) or its complement (odd parity). For 7-bit data $1011001$ there are four 1s, already even, so the even-parity bit is 0. Parity detects any **odd** number of bit errors and detects none of the even-numbered ones. It cannot locate an error, so it **cannot correct** anything — that requires a Hamming code.

**Hamming distance measures code strength.** The distance between two codewords is the number of bit positions in which they differ; $1011010$ and $1110010$ differ in two places, so $d = 2$. A code with minimum distance $d_{min}$ can detect up to $d_{min}-1$ errors and correct up to $\lfloor (d_{min}-1)/2\rfloor$ errors. Single parity has $d_{min}=2$: it detects one error but corrects none. A single-error-correcting Hamming code has $d_{min}=3$, which also lets it detect (but not correct) double errors. This distance bookkeeping is what separates detection from correction on a board question.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| BCD 8421 weights | $d = 8b_3 + 4b_2 + 2b_1 + 1b_0$ | Per decimal digit. Patterns 1010-1111 are invalid; only 0-9 are legal. |
| Excess-3 code | $E_3 = \mathrm{BCD}(d) + 0011$ | Applied digit by digit. Self-complementing: inverting the bits gives the 9's complement. |
| Binary to Gray | $g_i = b_i \oplus b_{i+1},\quad g_{n-1} = b_{n-1}$ | Top bit is copied unchanged. Same length as the input word. |
| Gray to binary | $b_{n-1} = g_{n-1},\quad b_i = b_{i+1} \oplus g_i$ | Must be computed from MSB downward; the previously computed binary bit is reused. |
| Even parity bit | $P = b_{n-1} \oplus \cdots \oplus b_1 \oplus b_0$ | Makes the total number of 1s even. Odd parity uses the complement of P. |
| Parity check | $\mathrm{error\ if}\ P \oplus b_{n-1} \oplus \cdots \oplus b_0 = 1$ | Detects any odd number of errors only; two flipped bits restore even parity and pass. |
| Error control from minimum distance | $\mathrm{detect}\ d_{min}-1,\quad \mathrm{correct}\ \lfloor (d_{min}-1)/2 \rfloor$ | Single parity has d_min = 2, so it detects 1 error and corrects 0. |
| ASCII case bit | $\mathrm{'a'} - \mathrm{'A'} = 0\times20 = 32$ | Bit 5 is the case bit; setting it converts uppercase to lowercase. |
| Number of BCD invalid codes | $2^4 - 10 = 6$ | 1010 to 1111. Arithmetic that produces them requires a +6 correction. |

## Worked Problems

### P1. Encode the decimal number 74 in BCD 8421 and in excess-3.

**Given:** N = 74; two code systems

**Solution:**

1. Digit 7: 8(0) + 4(1) + 2(1) + 1(1) = 0111; digit 4: 0100
2. BCD 8421 = 0111 0100
3. Excess-3 adds 0011 to each digit: 7 + 3 = 10 = 1010, 4 + 3 = 7 = 0111
4. Excess-3 = 1010 0111

> [!success]- Answer
> **$74 = 0111\,0100_{BCD} = 1010\,0111_{\mathrm{excess-3}}$**

> [!warning] Trap
> Converting 74 as one binary number, which gives 1001010. BCD codes each decimal digit in its own nibble and never carries between nibbles.

### P2. Convert the binary word $101101$ to Gray code.

**Given:** binary = 101101; 6 bits

**Solution:**

1. Copy the MSB: g5 = b5 = 1
2. g4 = b5 XOR b4 = 1 XOR 0 = 1
3. g3 = b4 XOR b3 = 0 XOR 1 = 1
4. g2 = b3 XOR b2 = 1 XOR 1 = 0
5. g1 = b2 XOR b1 = 1 XOR 0 = 1
6. g0 = b1 XOR b0 = 0 XOR 1 = 1
7. Result: 111011
8. Reverse check with the Gray-to-binary recurrence: b5 = 1, b4 = 1 XOR 1 = 0, b3 = 0 XOR 1 = 1, b2 = 1 XOR 0 = 1, b1 = 1 XOR 1 = 0, b0 = 0 XOR 1 = 1
9. The reverse recurrence recovers 101101, the original word

> [!success]- Answer
> **$101101_2 \to 111011_{Gray}$**

> [!warning] Trap
> XORing with the wrong neighbour (the bit to the left instead of the right), or forgetting to copy the MSB untouched. Every Gray bit except the MSB is the XOR of a binary bit with the one to its left.

### P3. An ASCII system transmits the byte $\mathrm{0x41}$. What character is it, what is the code for lowercase 'a', and what single bit separates them?

**Given:** code = 0x41; 7-bit ASCII

**Solution:**

1. 0x41 = 65 decimal, which is the start of the uppercase alphabet -> 'A'
2. Lowercase 'a' is 0x61 = 97 decimal
3. Difference = 97 - 65 = 32 = 0x20
4. 0x20 is bit 5, so setting bit 5 maps uppercase to lowercase

> [!success]- Answer
> **$\mathrm{0x41} = $ 'A'; $\mathrm{0x61} = $ 'a'; the case bit is bit 5 ($0\times20 = 32$)**

> [!warning] Trap
> Assuming the codes are separated by 26 (the alphabet length). Case is a bit-field difference of 32, and the digit characters sit at a completely separate offset of 0x30.

### P4. Add an even-parity bit in the MSB position to the 7-bit data word $1011001$. How many bit errors can this code word detect and correct?

**Given:** data = 1011001; even parity, parity bit in the MSB

**Solution:**

1. Count the 1s in the data: 1+0+1+1+0+0+1 = 4
2. Four is already even, so the even-parity bit is 0
3. Codeword = 0 1011001
4. Single parity makes d_min = 2
5. Detects d_min - 1 = 1 error; corrects floor((2-1)/2) = 0 errors

> [!success]- Answer
> **Codeword $01011001$; detects one error, corrects none**

> [!warning] Trap
> Claiming parity can repair the bad bit. Parity gives one syndrome bit, which can only say that something is wrong; locating the bit needs a Hamming code with several check bits.

### P5. Find the Hamming distance between $1011010$ and $1110010$, and state what a code of minimum distance 3 can do.

**Given:** A = 1011010; B = 1110010

**Solution:**

1. Align and compare position by position: 1-1 same, 0-1 differ, 1-1 same, 1-0 differ, 0-0 same, 1-1 same, 0-0 same
2. Two positions differ, so d = 2
3. For a code with d_min = 3: detect d_min - 1 = 2 errors
4. Correct floor((3-1)/2) = 1 error

> [!success]- Answer
> **$d = 2$; a $d_{min}=3$ code corrects 1 error and detects 2**

> [!warning] Trap
> Reporting the number of differing 0s, or assuming any two codewords of a parity-checked code are at distance 1. Distance counts differing positions of either value.

## Traps & Exam Notes

- **Arithmetic on BCD without correction.** Nibble sums above 9 (for example $8+7 = 1111$) are invalid BCD and must be corrected by adding $0110$ and propagating a carry. A raw 4-bit add produces a legal-looking but wrong digit.
- **Treating Gray code as weighted.** Gray bits have no place values. Decoding $111011$ by weights gives nonsense; the only valid route is the cumulative XOR recurrence.
- **Mixing the two XOR recurrences.** Binary-to-Gray uses the binary bit to the left of each position; Gray-to-binary accumulates from the MSB downward. Applying the wrong one produces a plausible but wrong word.
- **Assuming parity corrects.** Parity detects an odd number of errors and corrects none. Two flipped bits leave parity correct and pass silently, which is why parity is avoided on long links.
- **Using the alphabet length as the case offset.** 'A' to 'a' is 32 ($0\times20$), a single bit, not 26. Digits are a separate block starting at $0\times30$.
- **Confusing BCD invalid codes with forbidden inputs.** $1010$–$1111$ are invalid *BCD digit codes*, but they are perfectly legal 4-bit binary numbers and legal hex digits.
- **Quoting detection and correction counts the same way.** A code with $d_{min}=3$ corrects 1 error and detects 2. Claiming it corrects 2 collapses two valid codewords into one decision region.

## See Also

- [[01_Number_Systems_and_Base_Conversion]]
- [[04_Boolean_Algebra_and_De_Morgan]]
- [[16_Error_Control_Hamming_and_CRC]]
- [[06_Line_Coding_Schemes]]

---

[[02_Signed_Arithmetic_and_Two’s_Complement|⬅ 02]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Boolean_Algebra_and_De_Morgan|04 ➡]]
