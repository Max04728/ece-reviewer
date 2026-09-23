---
id: ECE-08-08
title: "Encoders and Decoders"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_SOP,_POS,_Minterms_and_Maxterms]]", "[[04_Boolean_Algebra_and_De_Morgan]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Encoders and Decoders

> [!abstract] Scope
> Use binary decoders to select one of 2^n lines and to generate minterms, and use priority encoders to convert a request pattern into a binary index.

## Core Concept

> [!tip] Intuition
> A decoder is a binary-to-one-of-many translator: it turns a code into a single active wire. An encoder runs the mirror image, turning whichever input is active into its binary code. Together they are the address decoders and interrupt controllers of every processor.

**The decoder.** An $n$-to-$2^n$ decoder asserts exactly one output, the one whose index equals the binary value on the select inputs. With an enable input the behaviour generalises: $Y_i = E\cdot m_i$, where $m_i$ is the minterm of the select variables. The 2-to-4 and 3-to-8 decoders are the standard sizes; the 3-to-8 74LS138 is the classic part. Its outputs are **active-low**, so the selected output goes to 0 and the rest stay at 1, and it has three enables (two active-low, one active-high) which makes it easy to expand by combining decoders.

**A decoder plus an OR gate is a function generator.** Because output $i$ is exactly the minterm $m_i$ of the select variables, ORing the outputs listed in $\sum m(\cdot)$ realises any function of those variables in one gate level:
$$F = \sum_{i\in S} Y_i$$
This is the hardware form of canonical SOP and it is why 'implement this function with a decoder and gates' is a standard exam question. When the decoder outputs are active-low, replace the OR with a NAND, by De Morgan:
$$\overline{\overline{Y_1}\cdot\overline{Y_5}} = Y_1 + Y_5$$

**Enlarging a decoder.** Cascading works through the enable pins: the high-order select bits drive a decoder whose outputs enable a bank of lower-order decoders. A 4-to-16 decoder is built from five 2-to-4 decoders — one to decode the two high bits into four enables, and four to decode the two low bits within each enabled bank. Only the enabled bank responds, so the 16 outputs are mutually exclusive.

**The encoder, and why priority is needed.** A $2^n$-to-$n$ encoder is the reverse: it outputs the binary index of its active input. A plain encoder assumes exactly one input is active, so two simultaneous inputs produce a meaningless OR of both indices. A **priority encoder** fixes this by defining a rank: the highest-priority active input wins and all lower inputs are ignored. It reports validity with an output (called $V$ on the 74LS148, or $\mathrm{GS}$/group select on some parts). The 74LS148 is an 8-to-3 priority encoder whose inputs are active-low and whose outputs are the complement of the selected index, with an enable-in and enable-out pair so several can be chained into a wider encoder.

**Practical points.** Decoder outputs are mutually exclusive by construction, which makes them ideal as chip-select and address-decode lines. Unused decoder outputs are simply left unconnected (they are driven, not floating). Encoder inputs that are unused must be tied to the inactive level, not left floating, because a floating TTL input reads as a high and an active-low input would appear asserted. When reading a datasheet, always check whether the active level is high or low before assuming a '1' means selected.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Decoder output (active-high) | $Y_i = E \cdot m_i$ | Exactly one output is 1 for each select code when enabled. m_i is the minterm of the select lines. |
| Decoder output (active-low) | $\bar Y_i = \overline{E \cdot m_i}$ | The selected output is 0. Typical of the 74LS138; unused outputs sit at 1. |
| Decoder size | $n\ \mathrm{select\ lines} \rightarrow 2^n\ \mathrm{outputs}$ | 3-to-8, 4-to-16. Adding one select line doubles the output count. |
| Function from a decoder | $F = \sum_{i \in S} Y_i = \sum m(S)$ | OR the active-high outputs listed by the minterm indices. Any function of the select variables is possible. |
| Function from an active-low decoder | $F = \overline{\bar Y_{i_1} \cdot \bar Y_{i_2} \cdots}$ | Use a NAND instead of an OR. De Morgan converts the AND of inverted outputs into the required sum. |
| Priority encoder equations (4-to-2) | $A_1 = D_3 + D_2,\quad A_0 = D_3 + \bar D_2 D_1$ | D3 has the highest priority. Lower active inputs are masked, which is what removes the encoder ambiguity. |
| Encoder valid indicator | $V = D_3 + D_2 + D_1 + D_0$ | V = 0 means no input is active, which is indistinguishable from 'input D0 active' without this output. |
| Encoder size | $2^n\ \mathrm{inputs} \rightarrow n\ \mathrm{outputs}$ | An 8-to-3 encoder needs 3 bits; the 74LS148 adds GS and EO for cascading. |
| Decoder expansion count (4-to-16) | $1 + 4 = 5\ \mathrm{2\!-\!to\!-\!4\ decoders}$ | One decodes the two high bits into enables; four serve the banks. General: 1 + 2^{n/2} blocks. |
| Active-low input assertion | $\mathrm{asserted} \iff D_i = 0$ | On the 74LS148 an input is a request when it is LOW; the outputs are the complemented index. |

## Worked Problems

### P1. A 3-to-8 decoder with an active-high enable receives $A_2A_1A_0 = 101$ and $E = 1$. Which output is asserted, and what are the states of the other outputs?

**Given:** select = 101; E = 1; active-high outputs

**Solution:**

1. The decoder asserts the output whose index equals the select code
2. 101 binary = 5 decimal
3. With E = 1 the decoder is enabled, so Y5 = 1
4. All other outputs are 0 because exactly one minterm is true for a given code

> [!success]- Answer
> **$Y_5 = 1$; $Y_0$ through $Y_4$ and $Y_6, Y_7$ are 0**

> [!warning] Trap
> Reading the select word as decimal digits (one hundred one) or indexing from 1. The output index is the binary value, so 101 selects the sixth output, Y5.

### P2. Implement $F(A,B,C) = \sum m(1,2,5,7)$ with a 3-to-8 decoder and one gate. Which outputs feed the gate?

**Given:** F = sum m(1,2,5,7); 3-to-8 decoder available

**Solution:**

1. Each decoder output equals one minterm of A, B, C
2. F is the OR of the minterms whose index is in the list
3. Connect Y1, Y2, Y5, Y7 to a 4-input OR gate
4. Check one term in isolation: code 010 asserts Y2 only, so F = 1 as required

> [!success]- Answer
> **OR the outputs $Y_1, Y_2, Y_5, Y_7$; $F = Y_1 + Y_2 + Y_5 + Y_7$**

> [!warning] Trap
> Connecting the outputs listed in the POS index set, or ANDing the four outputs. The decoder gives minterms, so the function is the OR of the selected ones — an AND would be 0 for every input.

### P3. Repeat the previous implementation using a 74LS138, whose outputs are active-low. What gate replaces the OR?

**Given:** F = sum m(1,2,5,7); 74LS138, active-low outputs

**Solution:**

1. Output Y-bar i is 0 exactly when the select code equals i and the device is enabled
2. F must be 1 when any of 1, 2, 5, 7 is selected
3. A NAND of those four inverted outputs is 1 when at least one input is 0
4. By De Morgan: NAND(Y-bar1, Y-bar2, Y-bar5, Y-bar7) = Y1 + Y2 + Y5 + Y7
5. For a code not in the set, all four NAND inputs are 1, so F = 0

> [!success]- Answer
> **$F = \overline{\bar Y_1\cdot\bar Y_2\cdot\bar Y_5\cdot\bar Y_7}$ using a 4-input NAND**

> [!warning] Trap
> Feeding active-low outputs into an OR gate. That produces the complement of the intended function, since the selected line is the one that is 0.

### P4. A 4-to-2 priority encoder has active-high inputs $D_3$ (highest) down to $D_0$. Find the outputs for the input pattern $0110$ and explain what the priority rule does here.

**Given:** D3 D2 D1 D0 = 0 1 1 0; D3 has highest priority

**Solution:**

1. Use A1 = D3 + D2 = 0 + 1 = 1
2. Use A0 = D3 + (NOT D2)D1 = 0 + (0)(1) = 0
3. So A1A0 = 10, the index of D2
4. D1 is also active but is masked because D2 outranks it
5. V = D3+D2+D1+D0 = 1, so the output is valid

> [!success]- Answer
> **$A_1A_0 = 10$ (index 2) with $V = 1$; D1 is ignored**

> [!warning] Trap
> ORing the active inputs into a plain encoder, which would give 10 XOR 01 = 11 and point at the wrong input. Priority is a masking operation, not addition.

### P5. How many 2-to-4 decoders with enable pins are needed to build a 4-to-16 decoder, and how are they wired?

**Given:** target = 4-to-16 decoder; building block = 2-to-4 with enable

**Solution:**

1. Split the 4 select bits into high pair A3A2 and low pair A1A0
2. One 2-to-4 decoder decodes A3A2 into four mutually exclusive enable signals
3. Each enable drives the E input of one of four 2-to-4 decoders that decode A1A0
4. Only one bank is enabled, so exactly one of the 16 outputs is asserted
5. Total: 1 + 4 = 5 decoders

> [!success]- Answer
> **5 decoders (1 for the high bits plus 4 banks)**

> [!warning] Trap
> Using 8 decoders or trying to OR outputs together. Cascading must go through the enable pins; ORing decoder outputs destroys the one-hot property and can assert two lines at once.

## Traps & Exam Notes

- **Confusing the direction of the parts.** A decoder goes from $n$ bits to $2^n$ lines; an encoder goes from $2^n$ lines to $n$ bits. The 74LS138 is a decoder, the 74LS148 is an encoder.
- **Ignoring an active-low output.** With a 74LS138 the selected line is 0. Feeding those outputs into an OR gate returns the complement of the wanted function — use a NAND.
- **Forgetting the enable.** A decoder with $E = 0$ asserts nothing, so every output sits at its inactive level. Address decoders that appear dead are usually disabled by a chip-select.
- **Assuming a plain encoder resolves multiple inputs.** Two simultaneous active inputs produce the OR of their indices, which may be a third, non-active index. Only a priority encoder is well defined.
- **Leaving encoder inputs floating.** An unconnected TTL input floats high, which on an active-low encoder looks like an asserted request. Tie unused inputs to the inactive level.
- **Reading a 74LS148 output as a plain binary index.** Its inputs are active-low and its outputs are the complemented index, so the datasheet's high-priority input 7 appears as 000, not 111.
- **Using OR gates on minterm outputs when the function is specified in POS.** A POS function needs the AND of the complementary decoder outputs (or a NOR), not the OR of the 1-rows.

## See Also

- [[05_SOP,_POS,_Minterms_and_Maxterms]]
- [[06_Karnaugh_Maps]]
- [[09_Multiplexers_and_Demultiplexers]]
- [[15_ASM_Charts]]

---

[[07_Adders_and_Subtractors|⬅ 07]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Multiplexers_and_Demultiplexers|09 ➡]]
