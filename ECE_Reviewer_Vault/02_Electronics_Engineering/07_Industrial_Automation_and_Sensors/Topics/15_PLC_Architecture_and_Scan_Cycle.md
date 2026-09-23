---
id: ECE-07-15
title: "PLC Architecture and Scan Cycle"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 15
tier: 2
depth: full
problem_count: 4
prereqs: ["[[12_Signal_Conditioning_and_DAQ]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 15 — PLC Architecture and Scan Cycle

> [!abstract] Scope
> Describe how a programmable logic controller is built and how its cyclic scan makes I/O behaviour deterministic — and where that determinism costs response time.

## Core Concept

> [!tip] Intuition
> A PLC does not react to events; it looks at the world on a fixed schedule. Every pass it copies every input into memory, solves the whole program against that frozen picture, then copies the results out — which is why two rungs in the same scan see each other instantly but a real output takes a full scan to affect a real input.

**Architecture.** A PLC is a ruggedized industrial computer built from modules on a backplane: a power supply, a CPU module holding the processor, program memory and the retentive data area, and one or more I/O modules that convert field voltages to logic levels and back. Fixed (compact) PLCs put everything in one enclosure with a fixed point count and are cheap for small machines; modular PLCs let the point count, the I/O mix and often the network interfaces be expanded in the rack, and they dominate anything larger than a few dozen points. Remote I/O pushes the modules out to the machine over a fieldbus, which shortens analog runs, cuts wiring cost and lets a central CPU serve several panels. The CPU also carries the communication ports, the real-time clock and the battery or supercapacitor that backs up retentive memory.

**The scan cycle.** The classic scan has four phases in a fixed order. First the *input scan*: every physical input is read and copied into the input image table in memory. Then *program execution*: the CPU solves the ladder (or function block, or structured text) rung by rung, top to bottom, reading and writing the image tables — not the terminals. Then the *output scan*: the output image table is copied to the physical output modules. Finally *housekeeping*: communications, diagnostics, the watchdog, and any background tasks. The crucial consequence is that the program never reads a live terminal mid-scan. Every rung sees the input values captured at the start of the scan, and any output written in rung 5 does not reach the field until the output scan, so it cannot influence an input until the following input scan.

**Scan time and response time.** Total scan time is the input scan plus program execution plus the output scan plus overhead, typically 1-20 ms for a small to medium system, and it grows with program length and with the number of I/O modules. Response time follows directly and is usually quoted as about two scan times: an input that changes immediately after the input scan is not observed until the next scan, and the output it controls is written at the end of that scan. Add input filter times and output device delays and the total can reach tens of milliseconds. Two corollaries matter in practice: a pulse shorter than the scan time can be missed entirely unless a high-speed counter or interrupt input captures it, and a control loop's update rate is limited by the scan unless the loop runs in a timed interrupt task. The watchdog timer monitors the scan; if the program fails to complete within its timeout (typically 100-500 ms, set above the worst-case scan), the CPU faults and drives the outputs to their configured fault state. Note what that does and does not buy: it detects a hung processor, not a stuck output, a welded relay contact or a miswired sensor.

**I/O electrical conventions and standards.** Sinking and sourcing describe the direction of current at the interface. A sourcing (PNP) sensor supplies current to the input, which must therefore sink it to common; a sinking (NPN) sensor sinks current, so the input must source it. Mismatching them means the input never turns on (or the sensor is damaged), and the same convention question decides whether an output module's transistor switches the load to the positive rail or to common. Module types follow the field device: 24 V DC for sensors and solenoids, AC input modules for legacy pushbuttons and limit switches, relay outputs for AC loads and isolation, and analog modules (typically 4-20 mA or 0-10 V) for transmitters and variable-speed drives. Programming follows IEC 61131-3, which defines five languages — ladder diagram, function block diagram, structured text, instruction list and sequential function chart — plus a common data type and function block model, so a program is portable in principle between vendors even though the details differ. Safety functions are not implemented in the standard CPU: a safety PLC is certified to a functional-safety standard, uses redundant or diverse processing and dual-channel I/O, and is kept separate from the control PLC even when they share a network.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Scan cycle time | $T_{scan} = T_{in} + T_{exec} + T_{out} + T_{os}$ | Input scan, program execution, output scan and housekeeping overhead. Typical 1-20 ms; more program and more I/O modules both lengthen it. |
| Worst-case response time | $T_{resp,max} \approx 2\,T_{scan}$ | An input changing just after the input scan is not seen until the next scan, and its output is written at the end of that scan. |
| Minimum detectable pulse | $T_{pulse,min} > T_{scan}$ | A pulse shorter than the scan can fall entirely between two input scans. Use a high-speed counter or interrupt input for fast events. |
| Watchdog timeout | $T_{WD} > k\,T_{scan},\quad k = 2\ \mathrm{to}\ 3$ | Typically 100-500 ms. On timeout the CPU faults and forces outputs to the configured fault state; it detects a hung program, not a stuck output. |
| Scan frequency | $f_{scan} = \frac{1}{T_{scan}}$ | A 10 ms scan is 100 scans per second. A control loop needing a faster update must run in a timed interrupt task, not in the main scan. |
| I/O module count | $N_{modules} = \left\lceil \frac{N_{points}}{N_{per\ module}} \right\rceil$ | Rounded up. Each added module lengthens the I/O scan, so point count feeds back into response time. |
| Response time including field delays | $T_{resp} = T_{scan} + T_{filter} + T_{out,delay}$ | Input filters of 1-20 ms and relay output delays of about 10 ms can dominate a 5 ms scan time. |

## Worked Problems

### P1. A PLC has an input scan of $2\ \mathrm{ms}$, a program execution time of $8\ \mathrm{ms}$, an output scan of $1.5\ \mathrm{ms}$ and $0.5\ \mathrm{ms}$ of housekeeping. Find the scan time and the worst-case response time for a discrete input, and add a $10\ \mathrm{ms}$ input filter and a $10\ \mathrm{ms}$ relay output.

**Given:** T_in = 2 ms; T_exec = 8 ms; T_out = 1.5 ms; T_os = 0.5 ms; filter = 10 ms; relay delay = 10 ms

**Solution:**

1. T_scan = 2 + 8 + 1.5 + 0.5 = 12 ms
2. Worst case the input changes just after the input scan, so it is detected one scan later and its output is written at the end of the following scan
3. T_resp = 2 x 12 = 24 ms
4. Adding the field delays: 10 + 24 + 10 = 44 ms

> [!success]- Answer
> **$T_{scan} = 12\ \mathrm{ms}$, worst-case logic response $24\ \mathrm{ms}$, and $44\ \mathrm{ms}$ including the filter and the relay.**

> [!warning] Trap
> Quoting 12 ms as the response time. The scan time is the period, not the delay: the two-scan rule plus the filter and the output device commonly make the real response three to four times the scan time.

### P2. A shaft turns at $1800\ \mathrm{rpm}$ and carries a 500 PPR incremental encoder. Find the pulse frequency and period, and explain whether the standard input of a PLC with a $12\ \mathrm{ms}$ scan can count it.

**Given:** speed = 1800 rpm; PPR = 500; scan = 12 ms

**Solution:**

1. 1800 rpm = 1800/60 = 30 rev/s
2. Pulse frequency = 30 x 500 = 15000 pulses/s = 15 kHz
3. Pulse period = 1/15000 = 66.7 us
4. 66.7 us is far shorter than the 12 ms scan, so most pulses fall between input scans and are never seen
5. A high-speed counter module (rated 200 kHz or more) is required; with x4 quadrature the edge rate rises to 60 kHz

> [!success]- Answer
> **$15\ \mathrm{kHz}$ ($66.7\ \mu\mathrm{s}$ period) — far too fast for a $12\ \mathrm{ms}$ scan, so a high-speed counter module is mandatory.**

> [!warning] Trap
> Assuming the PLC counts pulses because the input is wired to a fast sensor. The scan samples the input image at $1/(12\ \mathrm{ms}) = 83\ \mathrm{Hz}$, so a 15 kHz pulse train is invisible to ordinary ladder logic.

### P3. A CPU's worst-case scan time is $18\ \mathrm{ms}$ and the watchdog must not trip during normal operation. Recommend a watchdog setting, and state what happens if a program change raises the scan to $120\ \mathrm{ms}$.

**Given:** worst-case scan = 18 ms; watchdog must exceed the worst case

**Solution:**

1. Set the watchdog two to three times the worst-case scan: 36-54 ms
2. Use a typical installed value of 100 ms, which is comfortably above 54 ms
3. If the scan grows to 120 ms the watchdog times out
4. The CPU then faults: it stops executing and drives the outputs to their configured fault state

> [!success]- Answer
> **Set the watchdog at about $100\ \mathrm{ms}$ (2-3 times the $18\ \mathrm{ms}$ worst-case scan); a $120\ \mathrm{ms}$ scan trips it and the CPU faults with outputs in their safe state.**

> [!warning] Trap
> Setting the watchdog equal to the nominal scan time. Normal scan jitter, communications bursts and diagnostic tasks make the worst-case scan much longer than the average, and a too-tight watchdog produces phantom faults on a healthy machine.

### P4. A machine must stop a dangerous motion within $50\ \mathrm{ms}$ of the operator releasing a hold-to-run button. The local chain is $10\ \mathrm{ms}$ of filter, $24\ \mathrm{ms}$ of scan response and $10\ \mathrm{ms}$ of contactor drop-out. Evaluate the design, and then the same design with remote I/O that adds $20\ \mathrm{ms}$ of network latency.

**Given:** required stop time = 50 ms; filter = 10 ms; scan response = 24 ms; contactor = 10 ms; remote I/O latency = 20 ms (second case)

**Solution:**

1. Local total = 10 + 24 + 10 = 44 ms, which meets the 50 ms requirement
2. With remote I/O: 44 + 20 = 64 ms, which exceeds 50 ms
3. The margin is only 6 ms even locally, so any scan growth breaks it too
4. Fix by putting the stop function in a local safety module or a hard-wired safety relay circuit, with the standard PLC only monitoring status

> [!success]- Answer
> **The local chain takes $44\ \mathrm{ms}$ and passes, but remote I/O pushes it to $64\ \mathrm{ms}$ and fails; the stop function must be local and safety-rated.**

> [!warning] Trap
> Adding network latency to the safety budget after the fact, and treating a software interlock as a safety function. A safety stop must be independent of the scan, the program and the network.

## Traps & Exam Notes

- **Assuming the program reads live inputs.** Every rung sees the input image captured at the start of the scan. Two rungs in the same scan do see each other's internal bits immediately, but a physical input changed by a physical output in the same scan does not update until the next input scan.
- **Ignoring the two-scan delay.** Worst-case response is about $2T_{scan}$ plus filter and output delays, so a 20 ms scan with a 10 ms input filter and a relay output can take 50 ms — a factor of ten worse than the scan time alone suggests.
- **Expecting a fast pulse to be counted.** Anything shorter than the scan time can be missed completely; pulse counting and registration must use a dedicated high-speed counter or interrupt module.
- **Treating the watchdog as a safety function.** It detects a program that overruns its scan budget. It does not detect a welded output relay, a shorted output transistor or a miswired sensor — those require a safety-rated PLC or hard-wired safety relays.
- **Mixing sinking and sourcing I/O.** A PNP (sourcing) sensor feeding an input module that also sources current never turns the input on, and in the worst case the sensor is damaged; the convention must be checked per channel group, not per rack.

## See Also

- [[16_Ladder_Logic,_Timers_and_Counters]]
- [[12_Signal_Conditioning_and_DAQ]]

---

[[14_DAC_Architectures|⬅ 14]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[16_Ladder_Logic,_Timers_and_Counters|16 ➡]]
