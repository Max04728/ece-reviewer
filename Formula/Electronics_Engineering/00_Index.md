---
title: Electronics Engineering Index
part: Electronics Engineering
tags: [ece, elecs, formula-sheet, moc]
topics: 120
---

# Electronics Engineering — PRC ECE Board Formula Vault

## How to use this vault

1. Start at the Map of Content; every subject note holds all of its topics as `###` sections in board order.
2. Each topic is formula-only: symbols with SI units inline, a one-line **Conditions:** statement, and ★ on high-yield formulas.
3. Read the `> [!warning] Exam trap` callouts last — they mark the exact mistakes that cost board points.
4. Cross-links use numbered anchors, e.g. `[[05_Circuit_Analysis_and_Design#5. BJT Small-Signal h-Parameter Model|h-Parameter Model]]`.
5. Filter with tags: #bjt #mosfet #opamp #kmap #network #filter #oscillator #power #plc #embedded.

## Map of Content

| # | Subject | Topics | Sections |
|---|---|---|---|
| 1 | [[01_DC_Circuits\|DC Circuits]] | 13 | Part A Resistive Network Analysis · Part B Energy Storage & Transients · Part C Magnetics |
| 2 | [[02_AC_Circuits\|AC Circuits]] | 10 | Part A Sinusoidal Steady State · Part B Resonance & Three-Phase |
| 3 | [[03_Two_Port_Networks\|Two Port Networks]] | 9 | Part A Parameter Sets · Part B Conditions, Interconnections & Termination |
| 4 | [[04_Semiconductor_Devices\|Semiconductor Devices]] | 15 | **Part A** Physics, Junction & Diodes · **Part B** Rectifiers, Filters & Waveshaping · **Part C** Transistors & Optoelectronics |
| 5 | [[05_Circuit_Analysis_and_Design\|Circuit Analysis and Design]] | 18 | **Part A** Biasing · **Part B** Small Signal & Multistage · **Part C** Frequency, Feedback, Power & Oscillators · **Part D** Current Sources |
| 6 | [[06_Power_Electronics_and_Systems\|Power Electronics and Systems]] | 9 | Part A Switches & Thermal · Part B DC-DC Converters · Part C Regulation |
| 7 | [[07_Industrial_Automation_and_Sensors\|Industrial Automation and Sensors]] | 19 | Part A Op-Amp Circuits · Part B Sensors, Data Conversion & PLCs · Part C Instrumentation and Systems Integration |
| 8 | [[08_Logic_Circuits_and_Switching\|Logic Circuits and Switching]] | 17 | **Part A** Number Systems & Boolean Algebra · **Part B** Combinational Logic · **Part C** Sequential Logic & Families · **Part D** Asynchronous Logic |
| 9 | [[09_Microprocessors_and_Embedded\|Microprocessors and Embedded]] | 10 | Part A Architecture & Memory · Part B Peripherals & Interfacing |

**Total: 120 topics** across 9 subjects.

> [!tip] High-yield ★
> **Most heavily tested subjects:** [[01_DC_Circuits|DC Circuits]] · [[02_AC_Circuits|AC Circuits]] · [[04_Semiconductor_Devices|Semiconductor Devices]] · [[05_Circuit_Analysis_and_Design|Circuit Analysis and Design]] · [[08_Logic_Circuits_and_Switching|Logic Circuits and Switching]]
> Drill these five first — they carry the bulk of the Electronics Engineering items. Add [[03_Two_Port_Networks|Two Port Networks]] for the parameter-conversion cluster and [[07_Industrial_Automation_and_Sensors|Industrial Automation and Sensors]] for the op-amp and sensor cluster.

> [!tip] Sibling vaults
> **Control systems, electromagnetics and transmission lines are NOT in this vault.** The ELECS paper examines them regularly, but they are held in the `Mathematics` vault (`06_Control_Systems.md`, `05_Electromagnetics.md`) and the `EST` vault (`05_Transmission_Lines_and_Waveguides.md`). These are separate Obsidian vaults, so nothing here can link to them — open those folders directly when an item strays outside circuits, devices and logic.

> [!warning] Exam trap
> The brief's original headline count of **104** matched only subjects 1–8 of the first list and omitted Microprocessors; the true count at the time was 114. A later corpus-coverage pass added 5 topics (mutual inductance, current mirrors, measurements and instrumentation, building/AV integration, asynchronous logic), so the authoritative total is now **119**.

## Split notes

- **[[04_Semiconductor_Devices]]**, **[[05_Circuit_Analysis_and_Design]]**, **[[06_Power_Electronics_and_Systems]]** and **[[08_Logic_Circuits_and_Switching]]** are the longest notes, so each is split into **Part A / Part B / Part C** segments **inside the same file** (no separate files, per the vault spec). Topic numbering is continuous across parts.
- Topics now run 1–18 (Circuit Analysis and Design), 1–19 (Industrial Automation and Sensors), 1–17 (Logic Circuits and Switching), 1–15 (Semiconductor Devices) and 1–13 (DC Circuits). Parts D/C added by the corpus-coverage pass carry counts 13, 17, 18 and 18 respectively. #split

## Cross-topic jump table

| If you are solving… | Jump to |
|---|---|
| Transient time constant after a switch | [[01_DC_Circuits#11. First Order RC and RL Transients\|First Order RC and RL Transients]] |
| Damping case of an RLC loop | [[01_DC_Circuits#12. Second Order RLC Natural Response\|Second Order RLC Natural Response]] |
| Complex power and power factor | [[02_AC_Circuits#5. AC Power, PQS and Triangle\|AC Power, PQS and Triangle]] |
| Resonant frequency and bandwidth | [[02_AC_Circuits#7. Series Resonance\|Series Resonance]] |
| Two-port parameters from a transistor model | [[03_Two_Port_Networks#4. Hybrid and Inverse Hybrid Parameters\|Hybrid Parameters]] |
| Cascading two networks | [[03_Two_Port_Networks#8. Interconnections: Series, Parallel, Cascade\|Interconnections]] |
| Diode rectifier ripple and PIV | [[04_Semiconductor_Devices#6. Filters, Ripple Factor and PIV\|Filters and Ripple]] |
| BJT bias point and stability | [[05_Circuit_Analysis_and_Design#1. BJT DC Biasing Configurations\|BJT DC Biasing Configurations]] |
| Small-signal gain of a CE stage | [[05_Circuit_Analysis_and_Design#6. Small-Signal re Model: CE, CB, CC\|re Model]] |
| High-frequency roll-off and Miller effect | [[05_Circuit_Analysis_and_Design#12. Miller's Theorem and High-Frequency Effects\|Miller's Theorem]] |
| Buck / boost duty cycle | [[06_Power_Electronics_and_Systems#4. Buck Converter\|Buck Converter]] |
| Heatsink sizing | [[06_Power_Electronics_and_Systems#2. Thermal Resistance and Heat Sinking\|Thermal Resistance]] |
| Op-amp gain configurations | [[07_Industrial_Automation_and_Sensors#2. Linear Op-Amp Circuits\|Linear Op-Amp Circuits]] |
| ADC resolution and SNR | [[07_Industrial_Automation_and_Sensors#14. ADC Architectures and Quantization\|ADC Architectures]] |
| K-map simplification | [[08_Logic_Circuits_and_Switching#6. Karnaugh Maps\|Karnaugh Maps]] |
| Flip-flop setup and hold | [[08_Logic_Circuits_and_Switching#11. Flip-Flop Timing, Setup and Hold\|Flip-Flop Timing]] |
| Interrupt latency | [[09_Microprocessors_and_Embedded#6. Interrupts and ISRs\|Interrupts and ISRs]] |
| Serial protocol choice | [[09_Microprocessors_and_Embedded#10. Serial Interfaces: UART, SPI, I2C\|Serial Interfaces]] |
| Coupled coils, dot convention or mutual inductance | [[01_DC_Circuits#13. Mutual Inductance and Coupled Coils\|Mutual Inductance]] |
| Constant-current source or µA bias | [[05_Circuit_Analysis_and_Design#18. Current Mirrors\|Current Mirrors]] |
| Voltmeter multiplier or ammeter shunt | [[07_Industrial_Automation_and_Sensors#18. Measurements and Instrumentation\|Measurements]] |
| KNX, DMX512, Modbus, BACnet or HVAC sizing | [[07_Industrial_Automation_and_Sensors#19. Building, AV and Industrial Integration\|Building and AV]] |
| 555 monostable or astable timing | [[07_Industrial_Automation_and_Sensors#6. The 555 Timer\|The 555 Timer]] |
| Logic hazard, race or asynchronous FSM | [[08_Logic_Circuits_and_Switching#17. Asynchronous Logic, Hazards and Races\|Hazards and Races]] |
| Counter modulus, ring/Johnson or decade counter | [[08_Logic_Circuits_and_Switching#13. Counters: Types, Modulus and Design\|Counters]] |
| Flip-flop type, excitation or characteristic table | [[08_Logic_Circuits_and_Switching#10. Latches and Flip-Flops\|Latches and Flip-Flops]] |
| Shift register mode (SISO/SIPO/PISO/PIPO) | [[08_Logic_Circuits_and_Switching#12. Shift Registers\|Shift Registers]] |

## Tag index

#ece #elecs #formula-sheet · #dc #ac #network #power #filter #magnetics #transient · #semiconductor #diode #rectifier #bjt #fet #mosfet #thyristor #optoelectronics · #opamp #frequency #feedback #oscillator #currentsource · #pwm #adc #dac #sensors #daq #plc #instrumentation #hvac #lifesafety · #logic #kmap #codes #flipflop #shiftregister #counter #fsm #families #hazards · #embedded #cpu #memory #dma #timer #serial
