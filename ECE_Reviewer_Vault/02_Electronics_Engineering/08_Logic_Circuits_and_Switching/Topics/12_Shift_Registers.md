---
id: ECE-08-12
title: "Shift Registers"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[10_Latches_and_Flip-Flops]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Shift Registers

> [!abstract] Scope
> Classify shift registers by their input and output ports, and use them for serial transfer, delay, ring and Johnson counting.

## Core Concept

> [!tip] Intuition
> A shift register is a row of flip-flops sharing one clock, each passing its stored bit to its neighbour. Data walks through one stage per clock, which converts between serial and parallel form and turns the register into a controllable delay line.

**The four configurations.** The names describe the two ports. **SISO** (serial in, serial out) is a pure delay line: after $N$ clocks the input bit emerges at the far end. **SIPO** (serial in, parallel out) is the receiver of a serial link; after $N$ clocks a whole word is available at once. **PISO** (parallel in, serial out) is the transmitter; a load signal captures the word and then the bits are shifted out one per clock. **PIPO** (parallel in, parallel out) is a plain register used for temporary storage and pipeline stages. A universal shift register supports all of them plus hold, selected by two mode lines.

**Direction and feedback define the applications.** A right shift moves each bit toward the LSB ($Q_i^+ = Q_{i-1}$); a left shift moves toward the MSB ($Q_i^+ = Q_{i+1}$). The serial input fills the vacated end. If the serial input is the register's own output, the register becomes a counter: feeding back $Q_{n-1}$ into $Q_0$ gives a **ring counter**, and feeding back $\overline{Q_{n-1}}$ gives a **twisted-ring** or **Johnson counter**.

**Ring and Johnson counters.** A ring counter with one 1 circulating has modulus $N$ for $N$ flip-flops and produces $N$ one-hot states — valuable because decoding a one-hot state needs a single gate. It must be initialised, because an all-zero state recirculates zeros forever. A Johnson counter inverts the feedback, so it runs through $2N$ states for $N$ flip-flops: starting from all zeros, the register fills with ones from one end and then empties from the other. That doubles the modulus for the same hardware and its decoded states are inherently free of the wide glitches that plague binary decoders, though a decoder must still tolerate two bits changing at once.

**Serial-parallel conversion arithmetic.** Serial loading takes one clock per bit, so an $N$-bit word needs $N$ clock periods: at 1 MHz, 8 bits take 8 microseconds. A serial link is chosen when wires are expensive (long backplanes, optical links) and parallel when latency matters. The throughput of the shift path is the clock rate divided by the word length: an 8-bit word at 10 MHz carries 1.25 megawords per second. A SISO register also acts as a delay line whose delay is exactly $N$ clock periods, which is how pipelines align data and how edge detectors and pulse stretchers are built.

**Practical details.** Every stage is a flip-flop, so a shift register is also the standard example of a synchronous sequential circuit with no combinational feedback. The parallel-load input must honour the flip-flops' setup and hold times, and the serial input must be synchronised to the shift clock or metastability can be shifted down the chain. When a shift register drives a bus, its outputs are usually tri-stated so several registers can share the same lines.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Right shift (toward LSB) | $Q_i^+ = Q_{i-1},\quad Q_0^+ = SI$ | Serial input enters the LSB end; the MSB bit is lost each clock unless captured. |
| Left shift (toward MSB) | $Q_i^+ = Q_{i+1},\quad Q_{n-1}^+ = SI$ | Serial input enters the MSB end. Multiply by two when zero is shifted in. |
| Parallel load | $Q_i^+ = D_i\ \mathrm{when}\ LOAD = 1$ | Overrides shifting for one clock. The load pulse must meet setup and hold. |
| Serial load time | $T = \frac{N}{f_{clk}}$ | One clock per bit. 8 bits at 1 MHz = 8 microseconds, not 7 or 9. |
| SISO delay line | $t_{delay} = \frac{N}{f_{clk}}$ | A bit entering stage 0 appears at stage N-1 after exactly N clock periods. |
| Ring counter modulus | $M = N$ | One circulating 1 in N flip-flops. Requires initialisation; an all-zero state is a lock-up. |
| Johnson counter modulus | $M = 2N$ | Twisted-ring feedback of Q-bar. 4 flip-flops give 8 states, not 4. |
| Flip-flops for a target modulus | $\mathrm{ring}: N = M,\quad \mathrm{Johnson}: N = M/2$ | A ring needs M stages for modulus M; a Johnson counter needs half as many. |
| Serial word throughput | $R = \frac{f_{clk}}{N}\ \mathrm{words/s}$ | An 8-bit word at 10 MHz gives 1.25 megawords per second. |
| Universal shift register modes | $\mathrm{HOLD},\ \mathrm{SHIFT\ L},\ \mathrm{SHIFT\ R},\ \mathrm{LOAD}$ | Selected by two mode bits; the mode decode itself must not glitch into a load. |

## Worked Problems

### P1. A 4-bit SISO register holds $1011$ and is shifted right with serial input 0. Give the contents after one clock.

**Given:** contents = 1011 (Q3 Q2 Q1 Q0); shift right; SI = 0

**Solution:**

1. Right shift: each bit moves one position toward Q0
2. Q3 <- Q2 = 0; Q2 <- Q1 = 1; Q1 <- Q0 = 1; Q0 <- SI = 0
3. New contents: Q3=0, Q2=1, Q1=1, Q0=0, that is 0110
4. The old Q0 value (1) has been shifted out and lost

> [!success]- Answer
> **Contents become $0110_2$; the old LSB 1 is shifted out**

> [!warning] Trap
> Shifting the wrong way (a left shift with the serial input entering Q3 gives 0101) or forgetting that the bit leaving the far end is discarded. Direction must be read from the diagram, not assumed.

### P2. A 4-flip-flop ring counter is initialised to $1000$. List its states and give the modulus.

**Given:** 4 flip-flops; initial state 1000; feedback Q3 into Q0

**Solution:**

1. Clock 1: the single 1 shifts right, giving 0100
2. Clock 2: 0010
3. Clock 3: 0001
4. Clock 4: the 1 in Q0 is fed back to Q3, giving 1000 again
5. Four distinct states before repeating, so the modulus is 4

> [!success]- Answer
> **States $1000 \to 0100 \to 0010 \to 0001 \to 1000$; modulus $M = 4$**

> [!warning] Trap
> Forgetting initialisation. If the register powers up all zeros, the feedback shifts zeros forever and the counter never runs; a preset or a self-correcting feedback term is required.

### P3. A 4-flip-flop Johnson (twisted-ring) counter starts at $0000$ with feedback $\overline{Q_0}$ into $Q_3$. List the states and give the modulus.

**Given:** 4 flip-flops; initial state 0000; feedback = NOT Q0

**Solution:**

1. 0000: Q0 = 0, so the inverted feedback is 1 -> 1000
2. 1000: Q0 = 0 -> feedback 1 -> 1100
3. 1100 -> 1110
4. 1110 -> 1111
5. 1111: Q0 = 1 -> feedback 0 -> 0111
6. 0111 -> 0011 -> 0001
7. 0001: Q0 = 1 -> feedback 0 -> 0000, back to the start
8. Eight distinct states, so M = 2N = 8

> [!success]- Answer
> **Eight states ($0000,1000,1100,1110,1111,0111,0011,0001$); modulus $M = 8$**

> [!warning] Trap
> Assuming a 4-flip-flop feedback counter has modulus 4. The twisted feedback doubles the count to $2N = 8$; only the untwisted ring gives $N$.

### P4. How long does it take to load 8 bits into a SIPO register with a 1 MHz shift clock, and what is the serial word throughput?

**Given:** 8 bits; f_clk = 1 MHz

**Solution:**

1. Serial loading takes one clock per bit
2. T = N / f = 8 / 1 MHz = 8 microseconds
3. Throughput = f / N = 1 MHz / 8 = 125 000 words per second

> [!success]- Answer
> **$T = 8\ \mu\mathrm{s}$; throughput $= 125$ kilowords/s**

> [!warning] Trap
> Using the input plus output clocks (16 microseconds) or $N-1$ clocks. The first bit needs one full clock to enter the first stage, and the last bit needs $N$ clocks to reach the last stage.

### P5. A PISO register is loaded with $1011$ and then shifted right, with the serial output taken from $Q_0$. Give the output bit sequence.

**Given:** parallel load = 1011; shift right; output from Q0

**Solution:**

1. Q0 initially holds the LSB = 1, which is the first output bit
2. Shift 1: contents become 0101 (serial 0 in), Q0 = 1, second output bit = 1
3. Shift 2: contents 0010, Q0 = 0, third output bit = 0
4. Shift 3: contents 0001, Q0 = 1, fourth output bit = 1
5. Output sequence 1, 1, 0, 1 is the word emitted LSB first

> [!success]- Answer
> **Output sequence $1,1,0,1$ (LSB first)**

> [!warning] Trap
> Reporting 1,0,1,1. Shifting right sends the LSB out first; taking the output from Q3 (a left shift) would emit the bits in the opposite order, and the receiving end must agree on the convention.

## Traps & Exam Notes

- **Assuming a Johnson counter has modulus $N$.** The twisted feedback doubles it: 4 flip-flops give 8 states, and $N$ stages give $2N$.
- **Powering up a ring counter without a preset.** The all-zero state is self-sustaining. Ring counters need a preset pulse or a self-starting feedback network.
- **Counting serial load time as $N-1$ clocks.** A serial word needs exactly $N$ clock periods to be fully shifted in.
- **Mixing shift directions between transmitter and receiver.** A PISO shifting right emits the LSB first; a SIPO that shifts in the opposite direction reconstructs a bit-reversed word.
- **Forgetting the last stage's output timing.** In a SISO register the input bit appears only after $N$ clocks; using the register as a delay line means designing for that exact delay.
- **Asynchronous serial input.** A serial data line that is not retimed to the shift clock violates setup and hold on the first stage, and the error is shifted down the whole register.
- **Loading while shifting.** If LOAD and SHIFT are decoded from the same glitchy control lines, a partial load can occur; use one mode register and a single clock edge.

## See Also

- [[10_Latches_and_Flip-Flops]]
- [[13_Asynchronous_and_Synchronous_Counters]]
- [[09_Multiplexers_and_Demultiplexers]]
- [[11_Flip-Flop_Timing,_Setup_and_Hold]]

---

[[11_Flip-Flop_Timing,_Setup_and_Hold|⬅ 11]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Asynchronous_and_Synchronous_Counters|13 ➡]]
