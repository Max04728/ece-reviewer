---
title: Microprocessors and Embedded
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 10
---

# Microprocessors and Embedded

## Part A — Architecture and Memory

### 1. CPU Architecture: CISC and RISC

![](https://www.youtube.com/watch?v=6Rxade2nEjk)

*Video: RISC versus CISC — Computer Science Lessons, 12:40*

**Performance equation ★**

$$T_{exec}=IC\times CPI\times T_{clk}=\frac{IC\times CPI}{f_{clk}}\ \text{(s)}$$

**Symbols**

- $T_{exec}$ — program execution time, in s

$IC$ = instruction count (dimensionless), $CPI$ = cycles per instruction, $T_{clk}$ in s, $f_{clk}$ in Hz.

**MIPS and CPI**

$$MIPS=\frac{f_{clk}}{CPI\times10^6},\qquad CPI=\frac{\text{total cycles}}{\text{instruction count}}$$

**Symbols**

- $MIPS$ — millions of instructions per second, a throughput rating, in $10^6$ instructions/s

$$Speedup=\frac{T_{old}}{T_{new}}=\frac{CPI_{old}f_{new}}{CPI_{new}f_{old}}$$

**Symbols**

- $Speedup$ — speed-up of the new version relative to the old, dimensionless
- $T_{old}$, $T_{new}$ — execution times of the old and new versions, in s
- $CPI_{old}$, $CPI_{new}$ — cycles per instruction of the old and new versions, dimensionless
- $f_{old}$, $f_{new}$ — clock frequencies of the old and new versions, in Hz

**Amdahl's law ★**

$$S_{overall}=\frac{1}{(1-P)+\frac{P}{S_{part}}},\qquad P=\text{fraction enhanced (dimensionless)}$$

**Symbols**

- $S_{overall}$ — overall speed-up of the whole program, dimensionless
- $S_{part}$ — speed-up of the enhanced (optimized) part alone, dimensionless
- $P$ — fraction of the work that is enhanced, dimensionless

**CISC vs RISC**

| Feature | CISC | RISC |
|---|---|---|
| Instructions | many, complex | few, simple |
| Length | variable | fixed |
| Cycles/instruction | multi-cycle | mostly 1 |
| Addressing modes | many | few (load/store) |
| Pipelining | harder | easier |
| Example | x86 | ARM, MIPS, RISC-V |

**Condition summary**

$$CPI_{RISC}\approx1\ \text{(pipelined)},\qquad CPI_{CISC}>1\ \text{(microcoded)}$$

**Symbols**

- $CISC$ — complex instruction set computer: many complex, variable-length instructions, usually multi-cycle (architecture class, dimensionless)
- $RISC$ — reduced instruction set computer: few simple, fixed-length instructions, mostly single-cycle (architecture class, dimensionless)

**Conditions:** $T_{clk}$ is the reciprocal of the clock frequency; Amdahl's law assumes only the enhanced fraction speeds up; MIPS is a misleading metric across different instruction sets. #embedded #cpu

> [!tip] High-yield ★
> $T=IC\times CPI/f$ is the master performance equation. If a change cuts CPI by half but doubles instruction count, there is **no** speedup — always check all three factors.

---

### 2. Registers, Buses and Memory Organization

**Address space ★**

$$N_{addresses}=2^{n}\ \text{for }n\ \text{address lines},\qquad \text{capacity}=2^n\times w\ \text{bits}$$

**Symbols**

- $N_{addresses}$ — number of distinct addressable locations, dimensionless

$n$ = address lines (dimensionless), $w$ = word width in bits.

**Bus width and bandwidth**

$$BW=\frac{w}{8}\times f_{bus}\ \text{(bytes/s)},\qquad T_{transfer}=\frac{1}{BW}\ \text{(s/byte)}$$

**Symbols**

- $BW$ — bus bandwidth, in bytes/s
- $T_{transfer}$ — time to transfer one byte, in s/byte
- $f_{bus}$ — bus clock frequency, in Hz

$$w=8,16,32,64\ \text{bits (data bus)},\qquad \text{Address bus decides capacity, data bus decides speed.}$$

**Memory map and alignment**

$$\text{Address range}=2^n\ \text{locations},\qquad \text{Ending address}=\text{starting}+2^n-1$$

$$k\ \text{KB}=2^{10}\ \text{bytes},\qquad 1\ \text{MB}=2^{20},\qquad 1\ \text{GB}=2^{30}$$

**Register set**

| Register | Function |
|---|---|
| PC / IP | next instruction address |
| IR | current instruction opcode |
| SP | top of stack |
| MAR / AR | address being accessed |
| MDR / DR | data being transferred |
| ACC | arithmetic accumulator |
| Status / flags | Z, C, N, V bits |

**Symbols**

- $Z$ — zero flag: set when the ALU result is zero (1 bit, dimensionless)
- $C$ — carry/borrow flag: set by a carry out or borrow (1 bit, dimensionless)
- $N$ — negative flag: copy of the sign bit of the result (1 bit, dimensionless)
- $V$ — overflow flag: set when a signed result overflows (1 bit, dimensionless)

**Condition note**

$$T_{cycle}=T_{fetch}+T_{decode}+T_{execute}+T_{store}\ \text{(pipeline stages)}$$

**Symbols**

- $T_{cycle}$ — time for one pass through the fetch–decode–execute–store stages, in s
- $T_{fetch}$, $T_{decode}$, $T_{execute}$, $T_{store}$ — time spent in each stage, in s

**Conditions:** $2^n$ counts both program and data space when the architecture uses a unified memory map; bus bandwidth assumes one transfer per clock and ignores wait states. #embedded #memory

---

### 3. Memory Technologies and Address Decoding

![](https://www.youtube.com/watch?v=5VKsnXSqzZA)

*Video: How Memory Address Decoding Works — STEM Explorati Odyssey, 10:22*

**Capacity and organization**

$$\text{Capacity}=2^{n}\times w\ \text{bits},\qquad \text{chips needed}=\frac{C_{total}}{C_{chip}}\ \text{(dimensionless)}$$

**Symbols**

- $C_{total}$ — total memory capacity required by the system, in bits
- $C_{chip}$ — capacity of one memory chip, in bits

$$N_{chips}=\frac{\text{word depth}_{total}}{\text{word depth}_{chip}}\times\frac{\text{width}_{total}}{\text{width}_{chip}}$$

**Symbols**

- $N_{chips}$ — number of memory chips needed, dimensionless
- word depth — number of addressable words, dimensionless
- width — data width of the memory, in bits

**Address decoding ★**

$$2^{n_{chip}}\ \text{locations need }n_{chip}\ \text{address lines},\qquad \text{remaining lines}\to\text{chip select logic}$$

$$A_{start}\ \text{to}\ A_{end}=A_{start}+2^{n_{chip}}-1\ \text{(hex)}$$

**Decoder-based chip select**

$$Y_k\ \text{active when the upper address bits equal }k,\qquad \text{one output per chip}$$

**Memory comparison ★**

| Type | Volatile | Write | Speed | Use |
|---|---|---|---|---|
| SRAM | yes | easy | very fast | cache |
| DRAM | yes | refresh needed | fast | main memory |
| ROM | no | mask | fast | firmware |
| PROM | no | once | fast | prototypes |
| EPROM | no | UV erase | fast | legacy |
| EEPROM | no | byte erase | slow | config |
| Flash | no | block erase | fast read | code storage |

**Refresh and timing**

$$t_{refresh,interval}=\frac{t_{RC}}{N_{rows}}\ \text{(s)},\qquad \text{DRAM must be refreshed every few ms}$$

**Symbols**

- $t_{refresh,interval}$ — time allowed between successive refresh operations, in s
- $t_{RC}$ — DRAM row cycle time (activate-to-precharge delay of one row), in s
- $N_{rows}$ — number of DRAM rows that must be refreshed, dimensionless

**Inverse address-line count ★**

$$n=\lceil\log_2N\rceil\ \text{lines for }N\ \text{addressable locations},\qquad n=\lceil\log_2(\text{bytes})\rceil\ \text{for byte-organized memory}$$

**Symbols**

- $n$ — number of address lines required, dimensionless
- $N$ — number of addressable locations, dimensionless

$$64\ \text{KiB}=65{,}536\ \text{bytes}=2^{16}\ \Rightarrow\ n=16\ \text{address lines}$$

**Conditions:** decoding must avoid gaps and overlaps in the memory map; flash writes are block-erased, so a byte update requires a read-modify-write of the whole block. #memory #embedded

---

### 4. Instruction and Machine Cycles

![](https://www.youtube.com/watch?v=Z5JC9Ve1sfI)

*Video: The Fetch-Execute Cycle — Tom Scott, 9:04*

**Machine cycle timing ★**

$$T_{machine}=k\,T_{clk}\ \text{(s)},\qquad T_{instruction}=CPI\times T_{clk}$$

$$f_{clk}=\frac{1}{T_{clk}}\ \text{(Hz)},\qquad \text{clock cycles per machine cycle }k\ \text{(dimensionless)}$$

**Fetch-decode-execute**

$$T_{instr}=T_{fetch}+T_{decode}+T_{execute}+T_{writeback}\ \text{(s)}$$

$$CPI=\frac{T_{instr}}{T_{clk}}=\text{cycles per instruction}$$

**Pipelining ★**

$$T_{pipe}=\frac{T_{instr}}{n_{stages}}+T_{clk}\ \text{(throughput form)},\qquad Speedup\approx n_{stages}$$

$$T_{pipe,exact}=(k+n-1)T_{clk}\ \text{for }n\ \text{instructions, }k\ \text{stages}$$

**Throughput and latency**

$$Throughput=\frac{n}{T_{pipe}}\ \text{(instructions/s)},\qquad Latency=kT_{clk}\ \text{(s)}$$

**Hazards**

$$\text{stall cycles}=\text{pipeline bubbles},\qquad CPI_{eff}=CPI_{ideal}+\text{stall rate}$$

**Conditions:** ideal pipelining assumes no stalls, hazards, or branch penalties; adding stages raises throughput but also raises latency and hazard risk. #embedded #cpu

---

### 5. Addressing Modes and Instruction Sets

**Effective address ★**

$$EA=\text{address computed by the addressing mode},\qquad Operand=M[EA]$$

**Symbols**

- $EA$ — effective address produced by the addressing mode (a memory address/index, dimensionless)
- $M[\,]$ — memory-content operator: $M[A]$ is the word stored at address $A$ (address-indexed, dimensionless)

**Mode formulas**

$$\begin{aligned}
\text{Immediate:}\quad & operand=\#data\\
\text{Direct:}\quad & EA=A\\
\text{Indirect:}\quad & EA=M[A]\\
\text{Register indirect:}\quad & EA=R\\
\text{Indexed:}\quad & EA=A+R\\
\text{Relative:}\quad & EA=PC+offset\\
\text{Base+offset:}\quad & EA=R_b+\text{disp}
\end{aligned}$$

**Symbols**

- $\#$ — immediate-operand prefix: $\#data$ carries the literal data inside the instruction (notation prefix, not a quantity)
- $M[\,]$ — memory-content operator: $M[A]$ is the word stored at address $A$ (address-indexed, dimensionless)
- $R_b$ — content of the base register used as the base address, dimensionless
- $PC$ — program counter content, the address of the next instruction, dimensionless

$A$ = address field, $R$ = register content, $\text{disp}$ = displacement; all addresses in the native word size.

**Addressing-mode comparison ★**

| Mode | Data location | Typical use |
|---|---|---|
| Immediate | in instruction | constants |
| Direct | memory at $A$ | globals |
| Indirect | memory at $M[A]$ | pointers |
| Register | in a register | fastest |
| Indexed | $A+R$ | arrays |
| Relative | $PC+$offset | branches |
| Stack | $SP$-based | push/pop, calls |

**Instruction classes**

$$\text{data transfer},\quad \text{arithmetic/logic},\quad \text{control transfer},\quad \text{I/O}$$

**Conditions:** immediate mode is the fastest (no memory access for the operand); relative addressing makes position-independent code; each memory access costs at least one extra machine cycle. #embedded

## Part B — Peripherals and Interfacing

### 6. Interrupts and ISRs

![](https://www.youtube.com/watch?v=G7bqvpAw7HE)

*Video: How Interrupts Work in Modern Computers — BitLemon, 9:52*

**Interrupt latency ★**

$$t_{latency}=t_{finish\ current\ instruction}+t_{context\ save}+t_{vector\ fetch}\ \text{(s)}$$

**Symbols**

- $t_{latency}$ — interrupt latency: from the request to the first ISR instruction, in s
- $ISR$ — interrupt service routine, the handler code that services the interrupt (dimensionless label, not a physical quantity)
- $t_{finish\ current\ instruction}$ — time to complete the instruction already in progress, in s
- $t_{context\ save}$ — time to save the CPU context, in s
- $t_{vector\ fetch}$ — time to fetch the interrupt vector (the ISR entry address), in s

$$t_{response}=t_{latency}+t_{ISR,first\ useful\ action}\ \text{(s)}$$

**Symbols**

- $t_{response}$ — total interrupt response time up to the first useful ISR action, in s
- $t_{ISR,first\ useful\ action}$ — time from ISR entry to its first useful action, in s

**Overhead and throughput**

$$\text{Overhead}=\frac{t_{context}+t_{return}}{t_{period}}\times100\%,\qquad f_{max}=\frac{1}{t_{ISR}+t_{context}}$$

**Symbols**

- $\text{Overhead}$ — processor time spent on interrupt entry and exit, in %
- $t_{context}$ — context save/restore time per interrupt, in s
- $t_{return}$ — interrupt return time, in s
- $t_{period}$ — time between successive interrupts, in s
- $f_{max}$ — maximum sustainable interrupt rate, in Hz
- $t_{ISR}$ — ISR execution time, in s

**Nested and priority interrupts**

$$\text{Priority: higher vector number = higher priority (or per-configuration)}$$

$$t_{nested}=t_{ISR1}+t_{ISR2}\ \text{when ISR2 preempts ISR1}$$

**Symbols**

- $t_{nested}$ — total time spent serving the nested interrupts, in s
- $t_{ISR1}$, $t_{ISR2}$ — execution times of the two interrupt service routines, in s

**Polling vs interrupts**

| Aspect | Polling | Interrupt |
|---|---|---|
| CPU load | constant | on-demand |
| Latency | bounded by loop | bounded by ISR entry |
| Complexity | simple | vectors, priorities |
| Best for | fast, frequent events | rare, urgent events |

**Interrupt sources**

$$\text{maskable},\quad \text{non-maskable (NMI)},\quad \text{software (trap)},\quad \text{reset}$$

**Conditions:** the ISR must clear the interrupt flag or the interrupt re-triggers immediately; shared variables between ISR and main code must be declared volatile or protected. #embedded #interrupts

> [!warning] Exam trap
> Forgetting to **clear the interrupt flag** inside the ISR makes the processor re-enter the same ISR forever. Forgetting `volatile` on shared variables makes the compiler cache a stale value.

---

### 7. DMA and Bus Arbitration

![](https://www.youtube.com/watch?v=s8RGHggL7ws)

*Video: DMA Controller: How Data Moves from Peripherals to RAM — BitLemon, 8:20*

**DMA transfer time ★**

$$t_{DMA}=\frac{N_{bytes}\times t_{cycle}}{w_{transfer}}\ \text{(s)},\qquad N_{bytes}\ \text{in bytes}$$

$$\%\ CPU\ offload=\left(1-\frac{t_{DMA,CPU\ held}}{t_{programmed}}\right)\times100\%$$

**Bus bandwidth and cycle stealing**

$$BW=\frac{w_{bus}}{8}f_{bus}\ \text{(bytes/s)},\qquad \text{steal fraction}=\frac{n_{steal}}{n_{total}}$$

**Arbitration schemes**

$$t_{grant}=t_{request}+t_{arbitrate}\ \text{(s)},\qquad \text{fairness}\to\text{no starvation}$$

**Arbitration comparison ★**

| Method | Speed | Fairness | Notes |
|---|---|---|---|
| Daisy chain | fast grant, slow settle | poor | proximity priority |
| Polling | moderate | good | address overhead |
| Independent request | fastest | best | most wires |
| Fixed priority | simple | poor | can starve |
| Rotating priority | moderate | fair | round-robin |

**DMA modes**

$$\text{burst: whole block},\quad \text{cycle stealing: one transfer at a time},\quad \text{transparent: only idle cycles}$$

**Conditions:** DMA frees the CPU during the transfer but still steals bus cycles, so it does not create bandwidth; burst mode maximizes throughput but adds bus latency to the CPU. #embedded #dma

---

### 8. GPIO and Timer Peripherals

**GPIO current and drive**

$$I_{OH}\le I_{OH,max},\qquad I_{OL}\le I_{OL,max}\ \text{(A)},\qquad V_{OH}\ge V_{IH}\ \text{of the load}$$

$$R_{series}=\frac{V_{DD}-V_F}{I_F}\ \text{(}\Omega\text{ for an LED driver)}$$

**Timer basics ★**

$$f_{timer}=\frac{f_{clk}}{N_{prescaler}}\ \text{(Hz)},\qquad T_{tick}=\frac{1}{f_{timer}}\ \text{(s)}$$

$$t_{period}=(ARR+1)\frac{N_{prescaler}}{f_{clk}}\ \text{(s)},\qquad f_{out}=\frac{f_{clk}}{N_{prescaler}(ARR+1)}$$

$ARR$ = auto-reload value (dimensionless), $N_{prescaler}$ = prescaler divisor.

**Counter modes and input capture**

$$CCR=\frac{t_{pulse}f_{clk}}{N_{prescaler}}\ \text{(compare value)},\qquad Duty=\frac{CCR}{ARR+1}$$

$$\Delta t=N_{capture}T_{tick}\ \text{(s)},\qquad f_{measured}=\frac{f_{timer}}{\Delta N}$$

**Timer feature table**

| Feature | Register | Typical use |
|---|---|---|
| Prescaler | PSC | scale the clock |
| Period | ARR | set the frequency |
| Compare | CCR | duty, delays |
| Input capture | CCR | measure period |
| Output compare | CCR | generate pulses |

**Conditions:** the prescaler and auto-reload are 16-bit registers on most MCUs, which caps the single-stage period; input capture resolves the timer resolution as the measurement accuracy limit. #embedded #timer

---

### 9. PWM and ADC/DAC Modules

**PWM parameters ★**

$$f_{PWM}=\frac{f_{clk}}{N_{prescaler}\cdot(ARR+1)}\ \text{(Hz)},\qquad Duty=\frac{CCR}{ARR+1}\times100\%$$

**Symbols**

- $f_{PWM}$ — PWM output frequency, in Hz
- $f_{clk}$ — timer clock frequency, in Hz
- $N_{prescaler}$ — prescaler divisor applied to the timer clock, dimensionless
- $ARR$ — auto-reload register value (timer period in ticks), dimensionless
- $Duty$ — duty cycle, in %
- $CCR$ — capture/compare register value (compare count in timer ticks), dimensionless

$$V_{avg}=D\cdot V_{DD}\ \text{(V)},\qquad D=\frac{t_{on}}{T}$$

**Symbols**

- $V_{avg}$ — average output voltage of the PWM waveform, in V
- $D$ — duty cycle as a fraction ($0$ to $1$), dimensionless
- $V_{DD}$ — supply voltage, in V
- $t_{on}$ — on-time of the pulse, in s
- $T$ — PWM period, in s

**PWM resolution**

$$n_{bits}=\log_2(ARR+1)\ \text{bits},\qquad \Delta V=\frac{V_{DD}}{2^{n_{bits}}-1}\ \text{(V)}$$

**Symbols**

- $n_{bits}$ — PWM resolution, in bits
- $\Delta V$ — voltage change per duty-cycle step, in V

$$Duty\ resolution=\frac{1}{ARR+1}\times100\%\ \text{per step}$$

**ADC parameters ★**

$$Resolution=\frac{V_{ref}}{2^n}\ \text{(V/LSB)},\qquad Digital=\left\lfloor\frac{V_{in}}{V_{ref}}\times2^n\right\rfloor\ \text{(max code }2^n-1\text{)}$$

**Symbols**

- $Resolution$ — ADC step size (voltage per LSB), in V
- $V_{ref}$ — ADC reference voltage, in V
- $n$ — ADC resolution, in bits
- $V_{in}$ — analog input voltage, in V
- $Digital$ — ADC output code, dimensionless

$$t_{conv}=\frac{1}{f_{ADC}}\ \text{(s)},\qquad f_{ADC}=\frac{f_{clk}}{N_{cycles}}$$

**Symbols**

- $t_{conv}$ — ADC conversion time, in s
- $f_{ADC}$ — ADC clock frequency, in Hz
- $N_{cycles}$ — number of ADC clock cycles per conversion, dimensionless

**Sampling and filtering**

$$f_s\ge2f_{max}\ \text{(Nyquist)},\qquad \tau=RC\ \text{(anti-alias, s)}$$

**Symbols**

- $f_s$ — sampling frequency, in Hz
- $f_{max}$ — highest frequency present in the input signal, in Hz
- $\tau$ — anti-alias filter time constant, in s
- $R$ — filter resistance, in $\Omega$
- $C$ — filter capacitance, in F

$$SNR_{ideal}=6.02n+1.76\ \text{(dB)}$$

**Symbols**

- $SNR_{ideal}$ — ideal signal-to-noise ratio of a full-scale sine input, in dB

**Conditions:** duty cycle is quantized to $1/(ARR+1)$ steps, so a low ARR limits resolution; ADC conversion needs a stable $V_{ref}$ and a source impedance below the datasheet limit. #embedded #pwm #adc

---

### 10. Serial Interfaces: UART, SPI, I2C

![](https://www.youtube.com/watch?v=IyGwvGzrqp8)

*Video: Serial Communications Explained: UART, I2C and SPI — Electronoobs, 11:58*

**UART baud and frame ★**

$$T_{bit}=\frac{1}{Baud}\ \text{(s)},\qquad \text{frame}=1\ \text{start}+8\ \text{data}+\text{parity}+1\ \text{stop}$$

$$Throughput=Baud\times\frac{n_{data}}{n_{frame}}\ \text{(bits/s of payload)}$$

$$\%\ error=\frac{Baud_{actual}-Baud_{desired}}{Baud_{desired}}\times100\%$$

**SPI**

$$Throughput=f_{SCLK}\times\frac{n_{bits}}{n_{frame}}\ \text{(bits/s)},\qquad \text{devices}=N_{CS}\ \text{lines}$$

$$t_{transfer}=\frac{8n_{bytes}}{f_{SCLK}}\ \text{(s)},\qquad \text{MOSI, MISO, SCLK, CS}$$

**I²C**

$$SDA,\ SCL,\ pull\text{-}up\ R_p=\frac{V_{DD}-V_{OL}}{I_{OL}}\ \text{(}\Omega\text{)}$$

$$f_{SCL}=100\ \text{kHz (standard)},\ 400\ \text{kHz (fast)},\ 1\ \text{MHz (fast+)}$$

$$N_{addresses}=2^{7}-16=112\ \text{usable 7-bit addresses}$$

**Interface comparison ★**

| Feature | UART | SPI | I²C |
|---|---|---|---|
| Wires | 2 (+GND) | 4 (+GND) | 2 (+GND) |
| Duplex | full | full | half |
| Clock | asynchronous | synchronous | synchronous |
| Speed | to ~1 Mbps | tens of Mbps | 100 kHz–1 MHz |
| Addressing | none (point-to-point) | CS per device | 7/10-bit address |
| Multi-master | no | no | yes |

**Conditions:** UART endpoints must agree on baud within about ±2–3%; SPI needs one chip-select per device; I²C is open-drain and requires pull-up resistors whose value is set by bus capacitance and speed. #embedded #serial

> [!tip] High-yield ★
> UART is **asynchronous** (both sides must match baud), SPI is **fast and CS-per-device**, I²C is **two-wire, addressed and multi-master**. Matching the protocol to the pin count and speed requirement answers most interface questions.

→ Back to [[00_Index]]
