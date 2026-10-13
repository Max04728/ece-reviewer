---
title: Logic Circuits and Switching
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 17
---

# Logic Circuits and Switching

## Part A — Number Systems and Boolean Algebra

### 1. Number Systems and Base Conversion

**Positional value ★**

$$N=\sum_{k=-m}^{n-1}d_kb^k,\qquad N\ \text{in base }b$$

$d_k$ = digit, $0\le d_k\le b-1$; $b$ = radix; dimensionless.

**Conversions between bases**

$$N_{10}\to N_b:\ \text{repeated division by }b,\ \text{remainders read upward}$$

$$N_b\to N_{10}:\ \text{sum of }d_kb^k\ \text{terms}$$

**Binary, octal and hex shortcuts**

$$(1101)_2=(13)_{10}=(15)_8=(D)_{16}$$

$$1\ \text{hex digit}=4\ \text{bits},\qquad 1\ \text{octal digit}=3\ \text{bits}$$

**Fractional conversion**

$$0.d_1d_2d_3\ (\text{base }b)=\frac{d_1}{b}+\frac{d_2}{b^2}+\frac{d_3}{b^3},\qquad \text{multiply by }b\ \text{and take the integer part}$$

**Powers and ranges**

$$2^n=\text{number of states for }n\ \text{bits},\qquad \text{range }0\ \text{to }2^n-1\ \text{(unsigned)}$$

**Common bases**

| Base | Name | Digits |
|---|---|---|
| 2 | binary | 0, 1 |
| 8 | octal | 0–7 |
| 10 | decimal | 0–9 |
| 16 | hexadecimal | 0–9, A–F |

**Conditions:** radix point separates integer and fractional parts; conversion errors arise only from truncating a repeating fraction; base conversion preserves the value, not the digit count. #logic

---

### 2. Signed Arithmetic and Two's Complement

![](https://www.youtube.com/watch?v=4qH4unVtJkE)

*Video: Two's Complement: Negative Numbers in Binary — Ben Eater, 13:49*

**Sign-magnitude and ranges ★**

$$\text{range}_{signed}=-(2^{n-1}-1)\ \text{to}\ +(2^{n-1}-1)\ \text{(sign-magnitude)}$$

$$\text{range}_{2's}=-(2^{n-1})\ \text{to}\ +(2^{n-1}-1),\qquad n\ \text{bits}$$

**Two's complement conversion ★**

$$-A=\bar{A}+1\ \text{(invert all bits, add 1)}$$

$$A_{2's}=2^n-A\ \text{for }A>0,\qquad A_{2's}=A\ \text{for }A\ge0$$

**Subtraction and overflow**

$$A-B=A+\bar{B}+1\ \text{(subtract via complement)}$$

$$\text{overflow if}\ C_n\oplus C_{n-1}=1,\qquad C_n,C_{n-1}\ \text{carry bits (dimensionless)}$$

**Value of a two's-complement word**

$$N=-b_{n-1}2^{n-1}+\sum_{k=0}^{n-2}b_k2^k,\qquad N\ \text{in decimal}$$

**Signed range table**

| Bits | Unsigned max | Signed range |
|---|---|---|
| 4 | 15 | $-8$ to $+7$ |
| 8 | 255 | $-128$ to $+127$ |
| 12 | 4095 | $-2048$ to $+2047$ |
| 16 | 65535 | $-32768$ to $+32767$ |

**Conditions:** two's complement is the standard for ALU arithmetic; overflow is detected by the XOR of the carry into and out of the sign bit; the negation of the minimum value overflows. #logic

> [!warning] Exam trap
> Two's-complement negation is invert-then-add-one, so negating $1000\ (=-8$ in 4 bits$)$ returns $1000$ again — the most-negative value has no positive counterpart.

---

### 3. Codes: BCD, Gray, ASCII, Parity

**BCD ★**

$$\text{BCD digit}=4\ \text{bits},\qquad 0\le N\le9\ \text{per digit}$$

$$(259)_{10}=(0010\ 0101\ 1001)_{BCD}$$

**Gray code ★**

$$G_k=b_k\oplus b_{k+1},\qquad \text{MSB: }G_{n-1}=b_{n-1}$$

$$b_{n-1}=G_{n-1},\qquad b_k=G_k\oplus b_{k+1}\ \text{(Gray to binary)}$$

**Excess-3, 2421 and ASCII**

$$\text{Excess-3}=\text{BCD}+0011,\qquad \text{self-complementing for 2421 and XS-3}$$

$$\text{ASCII: }7\ \text{bits}\ (128\ \text{characters}),\ \text{extended}\ 8\ \text{bits}\ (256)$$

**Parity ★**

$$P_{even}=b_1\oplus b_2\oplus\cdots\oplus b_n,\qquad P_{odd}=\overline{P_{even}}=\overline{b_1\oplus\cdots\oplus b_n}$$

**Code comparison**

| Code | Bits/digit | Self-complementing | Use |
|---|---|---|---|
| BCD 8421 | 4 | no | displays |
| Excess-3 | 4 | yes | arithmetic |
| 2421 | 4 | yes | arithmetic |
| Gray | 4 | — | position encoding |
| ASCII | 7–8 | — | text |

**Conditions:** Gray code changes only one bit between adjacent values, so it prevents race errors in encoders; parity detects an odd number of bit errors only and cannot correct. #logic #codes

---

### 4. Boolean Algebra and De Morgan

**Basic laws ★**

$$A+0=A,\quad A\cdot1=A,\quad A+1=1,\quad A\cdot0=0$$

$$A+A=A,\quad A\cdot A=A,\quad A+\bar{A}=1,\quad A\cdot\bar{A}=0$$

**De Morgan's theorems ★**

$$\overline{A\cdot B}=\bar{A}+\bar{B},\qquad \overline{A+B}=\bar{A}\cdot\bar{B}$$

Generalized form:

$$\overline{A_1A_2\cdots A_n}=\bar{A}_1+\bar{A}_2+\cdots+\bar{A}_n,\qquad \overline{A_1+A_2+\cdots+A_n}=\bar{A}_1\bar{A}_2\cdots\bar{A}_n$$

**Useful identities**

$$A+AB=A,\qquad A(A+B)=A\ \text{(absorption)}$$

$$A+\bar{A}B=A+B,\qquad (A+B)(A+\bar{A}+C)=A+B\ \text{(consensus)}$$

$$AB+\bar{A}C+BC=AB+\bar{A}C\ \text{(consensus theorem)}$$

**XOR and XNOR**

$$A\oplus B=A\bar{B}+\bar{A}B,\qquad A\odot B=AB+\bar{A}\bar{B},\qquad A\oplus B=\overline{A\odot B}$$

$$A\oplus A=0,\qquad A\oplus\bar{A}=1,\qquad A\oplus1=\bar{A},\qquad A\oplus0=A$$

**Duality**

$$\text{swap }(+,\cdot)\ \text{and }(0,1)\ \text{to get the dual; dual of a valid identity is valid}$$

**Conditions:** single-bit variables; the consensus theorem removes a redundant term; De Morgan converts between AND-NOT and OR-NOT forms. #logic

---

### 5. SOP, POS, Minterms and Maxterms

**Canonical forms ★**

$$F=\sum m_i\ \text{(SOP)},\qquad F=\prod M_j\ \text{(POS)}$$

$$F=\overline{\sum m_k}\ \text{where }m_k\ \text{are the zero minterms}$$

**Minterm and maxterm definitions**

$$m_i=\text{AND term that is }1\ \text{only for row }i,\qquad M_i=\bar{m}_i=\text{OR term that is }0\ \text{only for row }i$$

$$M_i=\overline{m_i},\qquad m_i=\overline{M_i}$$

**SOP and POS construction**

$$F=\sum_i m_i\ \text{(use rows where }F=1\text{)},\qquad F=\prod_i M_i\ \text{(use rows where }F=0\text{)}$$

**Standard to canonical expansion**

$$F=A+BC\ \Rightarrow\ F=A\bar{B}\bar{C}+A\bar{B}C+AB\bar{C}+ABC+ABC\ \text{(expand every term)}$$

$$F=A(B+\bar{B})(C+\bar{C})+BC(A+\bar{A})$$

**Truth-table correspondence**

| $A$ | $B$ | $F$ | Minterm | Maxterm |
|---|---|---|---|---|
| 0 | 0 | 0 | $m_0=\bar{A}\bar{B}$ | $M_0=A+B$ |
| 0 | 1 | 1 | $m_1=\bar{A}B$ | $M_1=A+\bar{B}$ |
| 1 | 0 | 1 | $m_2=A\bar{B}$ | $M_2=\bar{A}+B$ |
| 1 | 1 | 1 | $m_3=AB$ | $M_3=\bar{A}+\bar{B}$ |

**Number of distinct Boolean functions ★**

$$N=2^{2^n}\ \text{functions of }n\ \text{variables}:\quad n=2\Rightarrow16,\ n=3\Rightarrow256,\ n=4\Rightarrow65{,}536$$

**Conditions:** for $n$ variables there are $2^n$ minterms and $2^n$ maxterms; $F=\Sigma m$ equals $\Pi M$ of the complementary index set; a minterm index reads the binary row as a number. #logic

## Part B — Combinational Logic

### 6. Karnaugh Maps

![](https://www.youtube.com/watch?v=A_LFVBWYZME)

*Video: Karnaugh Map (K-map) Rules for Simplification — ALL ABOUT ELECTRONICS, 7:38*

**K-map group rules ★**

$$\text{group size}=2^k\ (k=0,1,2,\dots),\qquad \text{each 1 must be covered at least once}$$

$$\text{number of groups}\ge\text{number of prime implicants needed}$$

**Cell adjacency**

$$\text{adjacent cells differ in exactly }1\ \text{variable},\qquad \text{wraparound at edges and corners}$$

**Simplification result**

$$F=\sum(\text{prime implicants}),\qquad \text{each group removes }k\ \text{variables for }2^k\ \text{cells}$$

**Don't-care conditions**

$$d=\Sigma m(\text{don't-care indices}),\qquad \text{include a don't-care if and only if it enlarges a group}$$

**Map sizes and literals removed**

| Variables | Cells | Group size | Literals per term |
|---|---|---|---|
| 2 | 4 | 2 | 1 |
| 3 | 8 | 4 | 1 |
| 4 | 16 | 8 | 1 |
| 5 | 32 | 16 | 1 |

**Conditions:** group only in powers of two, groups may overlap, and use the fewest groups with the largest possible size; don't-cares may be treated as $1$ or $0$ as convenient. #kmap #logic

> [!tip] High-yield ★
> Largest groups first, fewest groups total. A 4-cell group kills 2 variables and a full 8-cell wrap kills 3 — reading a K-map starts by hunting for the biggest legal group, not the first one.

---

### 7. Adders and Subtractors

![](https://www.youtube.com/watch?v=5XbRIVWFRIw)

*Video: Half Adder and Full Adder Explained — ALL ABOUT ELECTRONICS, 14:20*

**Half adder ★**

$$S=A\oplus B,\qquad C=AB$$

**Full adder ★**

$$S=A\oplus B\oplus C_{in},\qquad C_{out}=AB+C_{in}(A\oplus B)=AB+BC_{in}+AC_{in}$$

**Ripple carry delay**

$$t_{delay}=n\cdot t_{FA}\ \text{(s)},\qquad t_{FA}=t_{carry}\ \text{per stage}$$

**Full subtractor**

$$D=A\oplus B\oplus B_{in},\qquad B_{out}=\bar{A}B+AB_{in}+\bar{A}B_{in}$$

**Parallel adder/subtractor**

$$A-B=A+\bar{B}+1\ \text{(controlled by a mode bit on the B inputs and }C_{in}\text{)}$$

**Adder truth and hierarchy**

| $A$ | $B$ | $C_{in}$ | $S$ | $C_{out}$ |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

**Majority gate ★**

$$F=AB+BC+AC\ \text{(output }1\text{ when two or more of }A,B,C\text{ are }1\text{)}$$

**Conditions:** all variables are single bits; ripple carry delay grows linearly with $n$, which carry-lookahead adder logic reduces to $\log n$ levels. #logic

---

### 8. Encoders and Decoders

**Decoder outputs ★**

$$n\ \text{inputs}\to2^n\ \text{outputs},\qquad Y_i=m_i\ \text{(one output high per input code)}$$

$$2^n\ \text{decoder needs }n\times2^n\ \text{crosspoints (diode matrix)}$$

**Encoder**

$$2^n\ \text{inputs}\to n\ \text{outputs},\qquad \text{only one input active at a time}$$

**Priority encoder**

$$A_1=\sum(\text{all input codes with that bit}=1),\qquad \text{output}=n\ \text{bits (dimensionless)}$$

**Cascading**

$$\text{total outputs}=2^{n_1}+2^{n_2}\ \text{with an enable chain},\qquad \text{address bits add}$$

**Function and size comparison ★**

| Circuit | Inputs | Outputs | Function |
|---|---|---|---|
| Decoder 2-to-4 | 2 | 4 | code to line |
| Encoder 4-to-2 | 4 | 2 | line to code |
| Priority encoder | $2^n$ | $n$ | highest active line |
| BCD-to-7-segment | 4 | 7 | display drive |
| Multiplexer $2^n$-to-1 | $2^n+$sel | 1 | select data |

**Conditions:** a plain encoder assumes exactly one active input; valid-line and priority logic are required when multiple inputs may be active; decoders are commonly used with OR gates to synthesize SOP functions. #logic

---

### 9. Multiplexers and Demultiplexers

![](https://www.youtube.com/watch?v=FKvnmxte98A)

*Video: Introduction to Multiplexers (MUX Basics) — Neso Academy, 12:27*

**Multiplexer output ★**

$$Y=\sum_{k=0}^{2^n-1}m_kD_k,\qquad m_k=\text{minterm of the select inputs}$$

$D_k$ = data input for code $k$; $n$ select lines choose $2^n$ channels.

**MUX as a logic element**

$$F(A,B,C)=\sum m_i\ \text{implemented by a }8{:}1\ \text{MUX with }D_i=F_i$$

$$F(A,B)\ \text{via a }4{:}1\ \text{MUX with }n-1\ \text{select lines and data constants}$$

**Demultiplexer**

$$Y_k=\begin{cases}D,& k=\text{select code}\\0,& \text{otherwise}\end{cases}$$

**Expansion**

$$N\ \text{channels need }\log_2N\ \text{select lines},\qquad 2^n{:}1\ \text{MUX has }2^n\ \text{data inputs}$$

**Size comparison**

| Device | Select lines | Data lines | Notes |
|---|---|---|---|
| 2:1 MUX | 1 | 2 | basic cell |
| 4:1 MUX | 2 | 4 | universal logic |
| 8:1 MUX | 3 | 8 | mux tree leaf |
| 1:4 DEMUX | 2 | 4 | decoder with data |

**Conditions:** exactly one select code is active; unused data inputs must be tied to a defined level; a $2^n{:}1$ MUX implements any $n$-variable function with the truth-table bits on the data lines. #logic

> [!warning] Exam trap
> On a MUX, the **select inputs carry the minterm index** while the data inputs hold the function value. Swapping which lines are select versus data is the usual MUX implementation error.

---

### 10. Latches and Flip-Flops

![](https://www.youtube.com/watch?v=LTtuYeSmJ2g)

*Video: Latch and Flip-Flop Explained — ALL ABOUT ELECTRONICS, 9:50*

**SR latch ★**

$$Q_{next}=S+\bar{R}Q,\qquad \text{invalid when }S=R=1\ \text{(NOR latch)}$$

**D and JK flip-flops ★**

$$D:\ Q_{next}=D,\qquad JK:\ Q_{next}=J\bar{Q}+\bar{K}Q$$

$$JK\ \text{with }J=K=1\ \Rightarrow\ Q_{next}=\bar{Q}\ \text{(toggle)}$$

**T flip-flop**

$$T:\ Q_{next}=T\bar{Q}+\bar{T}Q=T\oplus Q$$

**Characteristic table ★**

| $J$ | $K$ | $Q_{next}$ | Action |
|---|---|---|---|
| 0 | 0 | $Q$ | hold |
| 0 | 1 | 0 | reset |
| 1 | 0 | 1 | set |
| 1 | 1 | $\bar{Q}$ | toggle |

**Excitation table**

| Transition | $D$ | $J$ | $K$ | $T$ |
|---|---|---|---|---|
| $0\to0$ | 0 | 0 | X | 0 |
| $0\to1$ | 1 | 1 | X | 1 |
| $1\to0$ | 0 | X | 1 | 1 |
| $1\to1$ | 1 | X | 0 | 0 |

**Conditions:** level-sensitive latches are transparent while enabled; edge-triggered flip-flops sample only at the clock edge; the $S=R=1$ state is invalid for a NOR SR latch because both outputs go low. #logic #flipflop

## Part C — Sequential Logic and Families

### 11. Flip-Flop Timing, Setup and Hold

![](https://www.youtube.com/watch?v=3t8ndX2hqHA)

*Video: Setup Time and Hold Time of a Flip-Flop — ALL ABOUT ELECTRONICS, 17:37*

**Timing constraints ★**

$$t_{setup}+t_{hold}\le T_{clk},\qquad T_{clk}\ge t_{cq}+t_{logic}+t_{setup}$$

**Maximum clock frequency ★**

$$f_{max}=\frac{1}{t_{cq}+t_{logic,comb}+t_{setup}+t_{skew}}\ \text{(Hz)}$$

$t$ terms in s; $t_{cq}$ = clock-to-Q delay.

**Hold-time check**

$$t_{hold}\le t_{cq}+t_{logic,min}\ \text{(no skew)},\qquad t_{hold}\le t_{cq}+t_{logic,min}-t_{skew}$$

**Propagation delay and skew**

$$t_{pd}=t_{PHL}\ \text{or}\ t_{PLH},\qquad t_{skew}=t_{clk2}-t_{clk1}\ \text{(s)}$$

**Setup slack**

$$\text{slack}=T_{clk}-t_{cq}-t_{logic}-t_{setup}-t_{skew}$$

**Conditions:** positive slack is required for reliable capture; skew is positive when the destination clock arrives later; hold violations cannot be fixed by slowing the clock. #logic #flipflop

> [!warning] Exam trap
> A **hold** violation is independent of clock period. Slowing the clock fixes setup problems but never a hold problem — that requires added delay or a shorter logic path.

---

### 12. Shift Registers

**Shift and storage ★**

$$Q_i(t+1)=Q_{i-1}(t)\ \text{(shift right)},\qquad Q_{i-1}(t+1)=Q_i(t)\ \text{(shift left)}$$

**Serial-in serial-out**

$$n\ \text{bits need }n\ \text{clock pulses},\qquad t_{delay}=nT_{clk}\ \text{(s)}$$

**Parallel load and serial input**

$$D_i=Q_i\ \text{when LOAD}=1,\qquad D_i=\text{serial in when LOAD}=0$$

**Ring and Johnson counters ★**

$$\text{ring: modulus}=n,\qquad \text{Johnson: modulus}=2n$$

$$f_{out,ring}=\frac{f_{clk}}{n},\qquad f_{out,Johnson}=\frac{f_{clk}}{2n}\ \text{(Hz)}$$

**Shift register types**

| Type | Input | Output | Use |
|---|---|---|---|
| SISO | serial | serial | delay line |
| SIPO | serial | parallel | deserializer |
| PISO | parallel | serial | serializer |
| PIPO | parallel | parallel | buffer, register |
| Ring | — | — | one-hot sequencing |
| Johnson | — | — | $2n$ states |

**Conditions:** all stages share one clock; a ring counter must be initialized to a single 1 (self-correcting versions use feedback logic); a Johnson counter needs $2n$ states and decodes with 2-input gates. #logic #shiftregister

---

### 13. Asynchronous and Synchronous Counters

![](https://www.youtube.com/watch?v=imblQB_ZxBs)

*Video: Synchronous vs Asynchronous Counters Explained — Bits&Facts, 8:46*

**Modulus and division ★**

$$M=2^n\ \text{for an }n\text{-bit binary counter},\qquad f_{out}=\frac{f_{clk}}{M}\ \text{(Hz)}$$

$$M=2^n\ \text{when the full count is used},\qquad \text{truncated: }M=N_{reset}$$

**Asynchronous (ripple) counter**

$$f_{MSB}=\frac{f_{clk}}{2^n},\qquad t_{settle}=n\cdot t_{FF}\ \text{(s)}$$

$$Q_i=\frac{f_{clk}}{2^{i+1}}\ \text{(each stage divides by 2)}$$

**Synchronous counter**

$$f_{max}=\frac{1}{t_{cq}+t_{logic}+t_{setup}}\ \text{(all stages clocked together)}$$

$$J_i=K_i=\prod_{k<i}Q_k\ \text{(count-enable terms)}$$

**Counter comparison ★**

| Feature | Asynchronous | Synchronous |
|---|---|---|
| Clock | rippled | common |
| Speed | slow ($n t_{FF}$) | fast |
| Decoding | glitchy | clean |
| Logic | minimal | more gates |
| Use | dividers | controllers |

**Conditions:** ripple counters accumulate propagation delay, so decoded outputs can glitch; synchronous counters are preferred whenever decoded states drive logic; modulus $M$ needs $n\ge\log_2M$ flip-flops. #logic #counter

---

### 14. Finite State Machines

![](https://www.youtube.com/watch?v=kb-Ww8HaHuE)

*Video: Finite State Machine Explained: Mealy and Moore Machines — ALL ABOUT ELECTRONICS, 15:11*

**State transition model ★**

$$Q(t+1)=\delta\big(Q(t),X(t)\big),\qquad Z(t)=\lambda\big(Q(t),X(t)\big)\ \text{(Mealy)}$$

$$Z(t)=\lambda\big(Q(t)\big)\ \text{(Moore)}$$

$\delta$ = next-state function, $\lambda$ = output function.

**State and flip-flop counts**

$$n_{FF}=\lceil\log_2S\rceil\ \text{for }S\ \text{states},\qquad \text{one-hot: }n_{FF}=S$$

$$2^{n_{FF}}\ge S\ \Rightarrow\ \text{unused states}=2^{n_{FF}}-S$$

**Next-state and excitation design**

$$Q^+=\sum(Q\cdot X)\ \text{minimized per flip-flop},\qquad J,K\ \text{from the excitation table}$$

**Mealy vs Moore**

| Aspect | Mealy | Moore |
|---|---|---|
| Output depends on | state + input | state only |
| Output timing | responds within the cycle | one clock later |
| States needed | fewer | more |
| Glitch risk | higher | lower |

**Conditions:** Mealy outputs can change asynchronously with the input, so they need care in glitch-free designs; Moore outputs are registered and inherently cleaner; unused states must be given explicit transitions. #logic #fsm

---

### 15. ASM Charts

**ASM block types ★**

$$\text{state box}\to\text{decision box}\to\text{conditional output box}$$

$$\text{ASM block}=\text{one state box}+\text{its attached decision and output boxes}$$

**Timing and transitions**

$$1\ \text{ASM block}=1\ \text{clock},\qquad \text{one active block per clock cycle}$$

$$t_{state}=T_{clk}\ \text{(s)},\qquad \text{transitions are unconditional or conditional on }X$$

**Equivalence with state diagrams**

$$\text{ASM block}\equiv\text{state}\ \text{with the outputs of that state and its branches}$$

$$\text{number of states}=\text{number of state boxes}=\text{number of ASM blocks}$$

**Output assignment**

$$Z\ \text{in a conditional output box is asserted only when that branch is taken}$$

$$Z=\sum(\text{state}\cdot\text{conditions})\ \text{(Mealy output in ASM form)}$$

**Comparison with flowcharts**

| Feature | Flowchart | ASM chart |
|---|---|---|
| Clock | implicit | explicit per block |
| States | not defined | one box per state |
| Outputs | — | Moore (state box) or Mealy (conditional) |
| Hardware mapping | indirect | direct |

**Conditions:** every ASM block occupies exactly one clock period; a state box with attached decision boxes forms a single block; the ASM chart maps directly to the FSM's next-state and output logic. #logic #fsm

---

### 16. Logic Families: TTL vs CMOS and Interfacing

![](https://www.youtube.com/watch?v=MnmYoCO2LFA)

*Video: TTL vs CMOS Logic Families Explained — Blueprint IoT, 13:06*

**Noise margins ★**

$$NM_H=V_{OH,min}-V_{IH,min},\qquad NM_L=V_{IL,max}-V_{OL,max}$$

All in V; voltage values are the worst-case guaranteed limits.

**Fan-out ★**

$$Fan\text{-}out=\frac{I_{OH}}{I_{IH}}\ \text{(logic HIGH)},\qquad Fan\text{-}out=\frac{I_{OL}}{I_{IL}}\ \text{(logic LOW)}$$

$$Fan\text{-}out=\min(\text{high, low})\ \text{(dimensionless count)}$$

**Power and speed**

$$P_{avg}=V_{CC}I_{CC,avg}\ \text{(W)},\qquad PDP=P_{avg}\cdot t_{pd}\ \text{(J)}$$

$$P_{dynamic,CMOS}=C_LV_{DD}^2f\ \text{(W)}$$

**Logic level table ★**

| Parameter | TTL (74LS) | CMOS (4000B) | 74HC |
|---|---|---|---|
| $V_{CC}$ range | 4.75–5.25 V | 3–15 V | 2–6 V |
| $V_{IH,min}$ | 2.0 V | $0.7V_{DD}$ | 3.5 V |
| $V_{IL,max}$ | 0.8 V | $0.3V_{DD}$ | 1.0 V |
| $V_{OH,min}$ | 2.7 V | $V_{DD}-0.05$ | $V_{CC}-0.1$ |
| $V_{OL,max}$ | 0.5 V | 0.05 V | 0.1 V |

**Interfacing**

$$5\ \text{V TTL}\to\text{CMOS}:\ \text{direct};\qquad \text{CMOS}\to\text{TTL}:\ \text{buffer (}I_{OH}\text{ insufficient)}$$

$$3.3\ \text{V}\to5\ \text{V}:\ \text{level shifter},\qquad \text{unused CMOS inputs must be tied (never float)}$$

**Conditions:** CMOS inputs must never float (they oscillate and draw current); TTL inputs float HIGH; $PDP$ (J) is the standard figure of merit for comparing families. #logic #families

> [!tip] High-yield ★
> $NM=V_{OH,min}-V_{IH,min}$ for the high side and $V_{IL,max}-V_{OL,max}$ for the low side — subtract **guaranteed worst-case** limits, never typical values.

## Part D — Asynchronous Logic

### 17. Asynchronous Logic, Hazards and Races

![](https://www.youtube.com/watch?v=yXioU6_Dd7Y)

*Video: Recognizing and Addressing Static Hazards — Dr. Shane Oberloier, 6:02*

**Hazard types ★**

| Hazard | Condition | Result |
|---|---|---|
| Static-1 | two paths of different delay both hold 1 | momentary 0 glitch |
| Static-0 | two paths of different delay both hold 0 | momentary 1 glitch |
| Dynamic | output should change once | multiple transitions |
| Function | inherent to the function itself | cannot be removed by extra terms |
| Logic | caused by unequal path delays | removable by adding terms |

**Eliminating a static-1 hazard by the consensus term ★**

$$F=AB+\bar{A}C\ \Rightarrow\ F=AB+\bar{A}C+BC\ \text{(ADD the consensus term }BC\text{)}$$

$$\text{This is the REVERSE of the consensus theorem, which REMOVES }BC\ \text{as a redundant term in static operation.}$$

**Races in state assignment**

$$\text{race: two or more state variables change together},\qquad \text{critical race: final state depends on which one wins}$$

**Primitive flow table**

$$\text{stable state: }Q_{next}=Q,\qquad \text{unstable state: }Q_{next}\neq Q\ \text{(transient)}$$

**Essential hazard**

$$\text{essential hazard: one input change must be applied three times to reach the correct stable state}$$

**Conditions:** hazards are delay-dependent, so adding $BC$ closes the static-1 hazard in two-level SOP while a static-0 hazard needs the dual product-of-sums closure; a critical race is cured by a race-free state assignment in which only one variable changes per transition. #logic #async

→ Back to [[00_Index]]
