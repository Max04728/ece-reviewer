---
title: "Logic Circuits and Switching — Drill"
type: drill
area: 08_Logic_Circuits_and_Switching
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 89
updated: 2026-09-23
---

# Logic Circuits and Switching — Practice Drill

**8 problems** drawn from a pool of 89 across 16 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 08_Logic_Circuits_and_Switching --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. Minimise $F(A,B,C) = \sum m(0,1,4,5)$ with a K-map.

**Given:** F = sum m(0,1,4,5); 3-variable map

> [!success]- Answer
> **$F = \bar B$ (one literal, one 4-cell group)**

> [!warning] Trap
> Drawing two separate 2-cell groups and writing $\bar A\bar B + A\bar B$, which is correct but not minimal. Two adjacent pairs that form a rectangle of four must be merged into one group.

<sub>from ECE-08-06</sub>

### 2. Minimise $F(A,B,C,D) = \sum m(0,1,2,3,8,9,10,11)$.

**Given:** F = sum m(0,1,2,3,8,9,10,11)

> [!success]- Answer
> **$F = \bar B\bar C$**

> [!warning] Trap
> Reporting two terms such as $\bar A\bar B\bar C + A\bar B\bar C$ instead of merging the halves. An 8-cell group is one term; failing to merge doubles the gate count for no benefit.

<sub>from ECE-08-06</sub>

### 3. Convert $156_{10}$ to binary, octal and hexadecimal.

**Given:** N = 156; targets = base 2, 8, 16

> [!success]- Answer
> **$156_{10} = 10011100_2 = 234_8 = \mathrm{9C}_{16}$**

> [!warning] Trap
> Reading the remainders top-down gives the bit-reversed word 10011001 = 153. Also note the groupings start at the radix point, not at the left edge.

<sub>from ECE-08-01</sub>

### 4. An ASM chart shows a rectangle labelled $S_2$ containing '$Z \leftarrow 1$', and beneath it a diamond labelled $X=1$ with one branch going to a rectangle $S_3$. Identify each symbol and the machine type implied by the output.

**Given:** rectangle S2 with Z <- 1; diamond labelled X=1; branch to rectangle S3

> [!success]- Answer
> **State box, decision box and next-state box; the output is Moore-type because it is written in the state box**

> [!warning] Trap
> Calling the output Mealy because a decision box is nearby. Outputs inside a state box are unconditional for that cycle; only an oval conditional-output box after a decision is Mealy.

<sub>from ECE-08-15</sub>

### 5. For three variables, state $m_3$ and $M_3$ and verify the two complement identities.

**Given:** index i = 3; variables A, B, C

> [!success]- Answer
> **$m_3 = \bar A B C$, $M_3 = A + \bar B + \bar C$, with $m_3 M_3 = 0$ and $m_3 + M_3 = 1$**

> [!warning] Trap
> Believing $M_3$ is the same term with every literal complemented, i.e. $A + \bar B + \bar C$ written as $\bar A + B + C$. The maxterm index is the row where the maxterm is 0, so its literals follow the inverted rule.

<sub>from ECE-08-05</sub>

### 6. A 4-bit signed adder computes $7 + 7$. Give the result bits and prove the overflow flag is asserted.

**Given:** A = 0111 (+7); B = 0111 (+7); 4-bit signed

> [!success]- Answer
> **$S = 1110$ with $OV = 1$; the true sum 14 is not representable**

> [!warning] Trap
> Concluding 'no overflow' because the carry-out is 0, or 'overflow' merely because the MSB is 1. In 2's complement a negative result with a 1 in the MSB is perfectly normal; overflow needs the sign-violation test.

<sub>from ECE-08-07</sub>

### 7. Find the Hamming distance between $1011010$ and $1110010$, and state what a code of minimum distance 3 can do.

**Given:** A = 1011010; B = 1110010

> [!success]- Answer
> **$d = 2$; a $d_{min}=3$ code corrects 1 error and detects 2**

> [!warning] Trap
> Reporting the number of differing 0s, or assuming any two codewords of a parity-checked code are at distance 1. Distance counts differing positions of either value.

<sub>from ECE-08-03</sub>

### 8. An open-collector output with $V_{CC}=5$ V must sink 8 mA at $V_{OL}=0.4$ V, and drives four inputs each drawing $I_{IH}=20\ \mu\mathrm{A}$ with $V_{IH}=2.0$ V. Find the allowable pull-up resistor range.

**Given:** V_CC = 5 V; I_OL = 8 mA; V_OL = 0.4 V; 4 loads at 20 uA; V_IH = 2.0 V

> [!success]- Answer
> **$575\ \Omega \le R \le 37.5\ \mathrm{k}\Omega$; 4.7 k$\Omega$ is a safe choice**

> [!warning] Trap
> Omitting the pull-up entirely. An open-collector output can only pull low, so without a resistor the line can never reach a valid high; and choosing too large a resistor lets leakage pull the high level below $V_{IH}$.

<sub>from ECE-08-16</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-08-01 | Number Systems and Base Conversion | 5 |
| ECE-08-02 | Signed Arithmetic and Two’s Complement | 5 |
| ECE-08-03 | Codes: BCD, Gray, ASCII, Parity | 5 |
| ECE-08-04 | Boolean Algebra and De Morgan | 5 |
| ECE-08-05 | SOP, POS, Minterms and Maxterms | 5 |
| ECE-08-06 | Karnaugh Maps | 10 |
| ECE-08-07 | Adders and Subtractors | 5 |
| ECE-08-08 | Encoders and Decoders | 5 |
| ECE-08-09 | Multiplexers and Demultiplexers | 5 |
| ECE-08-10 | Latches and Flip-Flops | 5 |
| ECE-08-11 | Flip-Flop Timing, Setup and Hold | 5 |
| ECE-08-12 | Shift Registers | 5 |
| ECE-08-13 | Asynchronous and Synchronous Counters | 5 |
| ECE-08-14 | Finite State Machines | 9 |
| ECE-08-15 | ASM Charts | 5 |
| ECE-08-16 | Logic Families: TTL vs CMOS and Interfacing | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
