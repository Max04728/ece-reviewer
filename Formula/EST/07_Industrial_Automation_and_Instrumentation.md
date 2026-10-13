---
title: Industrial Automation and Instrumentation
part: EST
tags: [ece, est, formula-sheet]
topics: 8
---

# Industrial Automation and Instrumentation

## Part A — Process Instrumentation

### 1. The 4–20 mA Current Loop

![](https://www.youtube.com/watch?v=Qyl_dvbgG2Y)

*Video: 4-20 mA Current Loop: History, Advantages and Disadvantages — Instrumentation Tools, 14:52*

**Loop current scaling ★**

$$\frac{x-x_{min}}{x_{max}-x_{min}}=\frac{I-4}{16},\qquad I=4+16\,\frac{x-x_{min}}{x_{max}-x_{min}}\ \text{(mA)},\qquad x=x_{min}+(x_{max}-x_{min})\frac{I-4}{16}$$

$x$ = measured variable in engineering units, $x_{min},x_{max}$ = calibrated range limits, $I$ = loop current in mA (4–20 mA span = 16 mA).

**Live zero and fault detection ★**

| Current | % of span | Loop state |
|---|---|---|
| 4 mA | 0 % | live zero, valid minimum |
| 12 mA | 50 % | mid-scale |
| 20 mA | 100 % | full scale |
| 0 mA | — | broken wire / open loop / no supply |
| < 3.6 mA | fault | downscale burnout (diagnostic) |
| > 21 mA | fault | upscale burnout (diagnostic) |

**Loop supply, compliance and burden**

$$V_{supply}=I\,(R_{wire}+R_{burden})+V_{tx,min},\qquad R_{burden,max}=\frac{V_{supply,min}-V_{tx,min}}{20\ \text{mA}}-R_{wire}$$

$V_{supply}$ in V dc (24 V typical), $I$ in A, $R_{wire}$ in Ω for both conductors, $R_{burden}$ in Ω (receiver input, 250 Ω classic), $V_{tx,min}$ in V (2-wire compliance ≈ 12 V).

**Wiring styles**

| Item | 2-wire (loop-powered) | 4-wire (self-powered) |
|---|---|---|
| Supply | taken from the loop | separate mains or 24 V |
| Conductors | 2 (power + signal) | 4 (2 power, 2 signal) |
| Budget at 4 mA | must power the whole transmitter | no constraint |
| Digital overlay | HART on the same pair | signal pair only |

HART superimposes Bell-202 FSK (±0.5 mA, 1200 baud) on the dc loop; Profibus PA and Foundation Fieldbus replace the analogue value with a fully digital frame on the same cable.

**Symbols**

- HART — Highway Addressable Remote Transducer, the digital signal frequency-shift-keyed on top of the 4–20 mA loop (a protocol label, dimensionless)
- FSK — frequency-shift keying, the Bell-202 modulation (±0.5 mA, 1200 baud) that carries the HART digital data (dimensionless)
- Profibus PA — Profibus Process Automation, the intrinsically safe fieldbus variant that replaces the analogue value with a fully digital frame on the same cable (dimensionless)

> [!tip] High-yield ★
> 4 mA is not "no signal" — it is the live zero. A 0 mA reading always means an open loop or dead supply, never a valid 0 % measurement.

**Conditions:** current is immune to cable resistance and to induced voltage, so every series device carries the same value; valid over long runs while the supply exceeds the burden plus transmitter compliance. #instrumentation

---

### 2. Temperature Sensors: Thermocouples and RTDs

![](https://www.youtube.com/watch?v=v7NUi88Lxi8)

*Video: How Thermocouples Work, plus RTD Basics — The Engineering Mindset, 9:05*

**Seebeck effect (thermocouple) ★**

$$E=\int_{T_c}^{T_h}\big(S_A(T)-S_B(T)\big)\,dT\approx S\,(T_h-T_c),\qquad S_K\approx 41\ \mu V/^\circ C$$

$E$ in V (mV in practice), $S$ = Seebeck coefficient in µV/°C, $T_h$ = hot junction in °C, $T_c$ = cold junction (reference) in °C; the voltage tracks the difference, so cold-junction compensation adds $T_c$ back.

**Standard letter types**

| Type | Materials (+ / −) | Range (°C) | Sensitivity |
|---|---|---|---|
| K | Chromel / Alumel | −200 to 1260 | 41 µV/°C |
| J | Iron / Constantan | −40 to 750 | 52 µV/°C |
| T | Copper / Constantan | −200 to 350 | 43 µV/°C |
| E | Chromel / Constantan | −200 to 900 | 68 µV/°C |
| N | Nicrosil / Nisil | −200 to 1300 | 39 µV/°C |
| R, S | Pt-13%Rh, Pt-10%Rh / Pt | 0 to 1600 | 10 µV/°C |
| B | Pt-30%Rh / Pt-6%Rh | 600 to 1700 | 8 µV/°C |

**RTD and thermistor laws**

$$R_T=R_0(1+\alpha T),\qquad R_T=R_0\big[1+AT+BT^2\big],\qquad R_T=R_0\,e^{\beta(1/T-1/T_0)}$$

$R_0$ in Ω at 0 °C (PT100 = 100 Ω, PT1000 = 1000 Ω), $\alpha=0.385\ \Omega/(\Omega\cdot^\circ C)$ for platinum, $A,B$ = Callendar–Van Dusen coefficients, $\beta$ = thermistor constant in K (3500–5000 K); PT100 reads 138.5 Ω at 100 °C.

**Sensor comparison ★**

| Sensor | Range | Linearity | Sensitivity | Cost |
|---|---|---|---|---|
| Thermocouple | −200 to 1700 °C (widest) | poor, needs a table | 8–68 µV/°C | low |
| RTD (PT100) | −200 to 850 °C | best, most stable | 0.385 Ω/°C | medium |
| Thermistor | −50 to 150 °C | worst (exponential) | −3 to −6 %/°C | low |

**Lead-wire effects**

| Connection | Error | Use |
|---|---|---|
| 2-wire | lead + contact resistance adds directly | short runs only |
| 3-wire | cancels equal lead resistance | standard industrial |
| 4-wire | removes lead resistance entirely | lab and precision |

> [!warning] Exam trap
> A PT100 with 10 Ω of lead resistance on a 2-wire hookup reports about +26 °C of error (10/0.385); a thermocouple reads the junction difference, so an uncompensated cold junction shifts the whole reading.

**Conditions:** thermocouples need cold-junction compensation and linearisation; RTDs need a low excitation current to limit self-heating; thermistors are the most sensitive but the least linear. #instrumentation

---

### 3. Humidity, Strain, Proximity and Switch Sensors

![](https://www.youtube.com/watch?v=Mts5Cr_BNCg)

*Video: Working of Strain Gauges and Their Applications — Skill Lync, 3:48*

**Capacitive humidity sensor**

$$C=\frac{\varepsilon_r\varepsilon_0A}{d},\qquad RH\propto C-C_{dry},\qquad T_d\approx T-\frac{100-RH}{5}$$

**Symbols**

- $C_{dry}$ — capacitance of the sensing element at the dry (0 % RH) reference state, in F

$C$ in F (pF range), $A$ in m², $d$ in m, $\varepsilon_r$ of the hygroscopic polymer rises as water is absorbed; $RH$ dimensionless in %, dew point $T_d$ in °C (approximation near 50 % RH).

**Strain gauge and bridge**

$$GF=\frac{\Delta R/R}{\varepsilon},\qquad \varepsilon=\frac{\Delta L}{L},\qquad V_o=V_{ex}\,\frac{GF\,\varepsilon}{4},\qquad V_o=V_{ex}\Big(\frac{R_3}{R_1+R_3}-\frac{R_4}{R_2+R_4}\Big)$$

$GF$ dimensionless (≈2.0 for metal foil), $\varepsilon$ dimensionless (µε = 10⁻⁶), $V_o,V_{ex}$ in V, $R_i$ in Ω; a quarter bridge gives one active arm, a full bridge four.

**Proximity and limit switches**

| Type | Detects | Range | Notes |
|---|---|---|---|
| Inductive | metal target | 1–20 mm | solid-state, no contact |
| Capacitive | any dielectric, liquids | 5–40 mm | level and presence |
| Photoelectric | beam break or reflection | 0.1–50 m | diffuse, retro, through-beam |
| Reed / Hall | magnet | 5–30 mm | position, cylinder sensing |
| Mechanical limit | physical contact | — | SPDT contact, needs force |

**Symbols**

- SPDT — single-pole double-throw, a contact set with one common terminal and two selectable positions (one normally open, one normally closed); a switch label, dimensionless

Output stage and speed:

$$PNP\ \text{sources current to the load},\qquad NPN\ \text{sinks current to 0 V},\qquad f_{max}=\frac{1}{t_{on}+t_{off}}$$

**Symbols**

- PNP — PNP-transistor sourcing output stage, which switches the positive supply to the load; an output-stage type, dimensionless
- NPN — NPN-transistor sinking output stage, which switches the load to the 0 V return; an output-stage type, dimensionless

$f_{max}$ in Hz (switching frequency limit), $t_{on},t_{off}$ in s.

**Conditions:** the sensor output stage must match the PLC card's sinking/sourcing wiring; capacitive units need setpoint trimming for the target's dielectric constant, and inductive units only see metal. #instrumentation

---

## Part B — PLC, Ladder Logic and Industrial Networks

### 4. PLC Architecture and the Scan Cycle

![](https://www.youtube.com/watch?v=7yZpQwthfns)

*Video: What Is the PLC Scan Cycle? — Simplifyde, 2:54*

**Why the PLC replaced relay panels**

| Aspect | Relay panel | PLC |
|---|---|---|
| Logic change | rewire hardware | edit software |
| Timers/counters | one relay per function | CPU instructions |
| Diagnostics | none | trace, force, fault codes |
| Physical size | large, high power | compact |
| Reliability | contact wear | solid-state + watchdog |

**Scan cycle ★**

$$T_{scan}=T_{in}+T_{prog}+T_{out}+T_{house},\qquad T_{resp,max}\approx 2\,T_{scan}+T_{filter}$$

**Symbols**

- $T_{filter}$ — input filter (debounce) delay of each input circuit, which must elapse before a field change is latched, in ms

$T_{scan}$ in ms (1–50 ms typical), $T_{in}$ = input scan (read and latch every input), $T_{prog}$ = program scan (execute the ladder), $T_{out}$ = output scan (write every output), $T_{house}$ = housekeeping, comms and watchdog; a simple input→output path can need one scan to miss the input plus one scan to set the output.

**Watchdog timer**

$$T_{WD}>T_{scan,max}\ (\text{typically }3\times),\qquad \text{timeout}\Rightarrow \text{fault, outputs to safe state}$$

$T_{WD}$ in ms (100–500 ms typical).

**Modular PLC sections**

| Section | Function | Typical values |
|---|---|---|
| Power supply | mains to dc rails | 24 V dc out, 120/230 V ac in |
| CPU | scan, memory, program | 16–256 kB, 0.1–0.5 µs/instruction |
| I/O modules | field interface, isolation | 8–32 points per card |
| Backplane / bus | CPU–I/O transfer | parallel or serial remote I/O |
| Rack / chassis | mounting and power distribution | 4–16 slots |

**Analog resolution and I/O wiring**

$$\Delta x=\frac{x_{max}-x_{min}}{2^n-1}\ \text{per LSB},\qquad \text{12-bit over 0–10 V}\Rightarrow\Delta x=\frac{10}{4095}=2.44\ \text{mV}$$

**Symbols**

- LSB — least significant bit, the smallest step the converter resolves, i.e. one count of the $n$-bit code ($\Delta x$), dimensionless

$n$ = ADC bits (dimensionless), $x_{max}-x_{min}$ = input span in V or mA; a 12-bit card resolves 16 mA/4095 = 3.9 µA of loop current.

| I/O type | Module common | Required field device | Sensor output |
|---|---|---|---|
| Sinking input | +V dc | sources current into the card | PNP |
| Sourcing input | 0 V return | sinks current from the card | NPN |

> [!tip] High-yield ★
> Inputs are latched at the start of the scan and outputs are written at the end, so two changes inside one scan are invisible; worst-case response of a one-rung path is about two scan times.

**Conditions:** scan time is set by program length, instruction mix and I/O count; the watchdog reloads every successful scan and trips to the safe state if the program stalls. #plc #instrumentation

---

### 5. Ladder Logic Programming

![](https://www.youtube.com/watch?v=qaI48NCUvkA)

*Video: What Is Ladder Logic? — RealPars, 8:19*

**Boolean form ★**

$$Y=A\cdot B\ \text{(series = AND)},\qquad Y=A+B\ \text{(parallel = OR)},\qquad Y=\bar{A}\ \text{(normally closed)}$$

$A,B$ dimensionless logic states (0/1), $Y$ = coil state; a contact passes power when its condition is true.

**Rung symbols**

| Symbol | Name | Passes/writes when |
|---|---|---|
| `-| |-` | examine if closed (NO) | bit = 1 |
| `-|/|-` | examine if open (NC) | bit = 0 |
| `-( )-` | output coil | rung is true |
| `-(L)-` | latch coil | sets and holds the bit |
| `-(U)-` | unlatch coil | resets the bit |

**Seal-in and interlock**

$$M=(START+M)\cdot\overline{STOP},\qquad OUT=(RUN\cdot\overline{FAULT})\cdot PERMIT$$

$M$ = memory/output bit, $START$ = normally open pushbutton, $STOP$ = normally closed pushbutton; the parallel $M$ contact seals the rung after $START$ is released.

**Timers and counters ★**

| Instruction | Behaviour | Done when |
|---|---|---|
| TON | on-delay, times while the rung is true | $ACC\ge PRE$ |
| TOF | off-delay, times while the rung is false | $ACC\ge PRE$ |
| RTO | retentive on-delay, holds $ACC$ | $ACC\ge PRE$, cleared by RES |
| CTU | count-up on each false→true edge | $ACC\ge PRE$, cleared by RES |
| CTD | count-down | $ACC\le 0$ |

$$t_{delay}=PRE\times\text{time base},\qquad 150\times0.1\ \text{s}=15\ \text{s}$$

$PRE$ dimensionless (preset count), $t_{delay}$ in s.

**Scan evaluation**

$$\text{left to right along a rung},\qquad \text{top to bottom across rungs}$$

**Conditions:** contacts examine the process image, not the physical terminal, so a coil written by an earlier rung is already visible to a later rung in the same scan; use one coil per output bit, since the last rung wins. #plc

---

### 6. PID Control

![](https://www.youtube.com/watch?v=fv6dLTEvl74)

*Video: PID Controller Explained — RealPars, 9:25*

**Ideal and parallel forms ★**

$$u(t)=K_p\,e(t)+K_i\int_0^t e\,d\tau+K_d\,\frac{de}{dt},\qquad e=SP-PV,\qquad K_i=\frac{K_p}{T_i},\quad K_d=K_pT_d$$

$$u(t)=K_p\Big(e+\frac{1}{T_i}\int e\,dt+T_d\frac{de}{dt}\Big)$$

$u$ = controller output in % or mA, $e$ = error in engineering units, $K_p$ dimensionless gain, $T_i$ = integral (reset) time in s, $T_d$ = derivative (rate) time in s, $SP,PV$ in engineering units.

**Discrete position form**

$$u_k=K_p\,e_k+K_iT_s\sum_{j=1}^{k}e_j+\frac{K_d}{T_s}\big(e_k-e_{k-1}\big)$$

$T_s$ = sample/scan time in s; $T_s$ must be short against the process dead time or the loop becomes unstable.

**Action of each term**

| Term | Effect | Main penalty |
|---|---|---|
| P | fast rise, $u=K_pe$ | offset never reaches zero |
| I | ramps out the offset | overshoot, slower settling, windup |
| D | damping and anticipation | amplifies noise, kick on an SP step |
| PI | zero offset, robust | needs $T_i$ tuned to avoid overshoot |
| PID | best for slow high-order loops | derivative must be filtered |

**Ziegler–Nichols tuning**

| Mode | $K_p$ | $T_i$ | $T_d$ |
|---|---|---|---|
| P | $0.5K_u$ | — | — |
| PI | $0.45K_u$ | $P_u/1.2$ | — |
| PID | $0.6K_u$ | $P_u/2$ | $P_u/8$ |

$K_u$ = ultimate gain, $P_u$ = ultimate period in s with I and D off (sustained oscillation). Open-loop reaction curve: $K_p=1.2T/(KL)$, $T_i=2L$, $T_d=0.5L$ with process gain $K$, dead time $L$ in s and time constant $T$ in s.

**Symbols**

- $\tau_D$ — derivative filter time constant, the first-order lag applied to the derivative term ($\frac{K_d s}{\tau_D s+1}$), in s

**Conditions:** PI is the industrial default, derivative is used only on slow noise-free loops and is filtered as $\frac{K_d s}{\tau_Ds+1}$; anti-windup clamps the integral while the output saturates. #instrumentation

---

### 7. SCADA, HMI and Industrial Networks

![](https://www.youtube.com/watch?v=nlFM1q9QPJw)

*Video: What Is SCADA? — RealPars, 8:09*

**SCADA hierarchy ★**

| Level | Device | Role |
|---|---|---|
| 0 | sensors, actuators, drives | physical process |
| 1 | PLC / RTU / loop controller | local control, scan logic |
| 2 | fieldbus, industrial Ethernet | data transport |
| 3 | SCADA master, HMI servers | supervision, setpoints, alarms |
| 4 | historian, MES, ERP | trending, reporting, planning |

**Symbols**

- SCADA — supervisory control and data acquisition, the master-station system that supervises the process, sets setpoints and annunciates alarms; a system label, dimensionless
- HMI — human–machine interface, the operator display and control terminal of a controller or SCADA system; dimensionless
- RTU — remote terminal unit, a field device that acquires I/O and reports it to the master over a communications link; dimensionless
- MES — manufacturing execution system, the plant production and reporting layer above SCADA; dimensionless
- ERP — enterprise resource planning, the business planning layer above MES; dimensionless

Data path: field devices → RTU/PLC → communications → master station/HMI → historian.

**Polling and network load**

$$T_{poll}=N\,T_{resp},\qquad U=\frac{N\,L_{frame}}{B\,T_{poll}}$$

$N$ = number of slaves (dimensionless), $T_{resp}$ = slave response time in s, $L_{frame}$ in bits, $B$ = link bit rate in bit/s, $U$ = utilisation (dimensionless); keep $U$ well under 50 % so cyclic control traffic still meets its deadline.

**Protocol landscape ★**

| Protocol | Transport | Data model | Typical use |
|---|---|---|---|
| Modbus RTU / TCP | RS-485 / TCP | coils + 16-bit registers | meters, drives, PLC–PLC |
| Profibus DP / Profinet | RS-485 / Ethernet | cyclic I/O image | factory automation |
| EtherNet/IP | Ethernet (CIP) | objects and tags | drives, motion, Rockwell |
| DNP3 | serial / TCP | objects, time stamps | utilities, water, SCADA |
| MQTT | TCP publish/subscribe | topics via a broker | IIoT telemetry, cloud |
| HART | 4–20 mA FSK | command/response | transmitter configuration |

**Symbols**

- IIoT — industrial Internet of Things, the use of networked publish/subscribe telemetry (e.g. MQTT) to carry plant data to the cloud; dimensionless

Modbus addresses: coils (0x, read/write bits), discrete inputs (1x, read-only bits), input registers (3x, read-only 16-bit), holding registers (4x, read/write 16-bit); a 32-bit value occupies two registers.

**HMI and alarm functions**

| Function | Purpose |
|---|---|
| Operator display | mimic, trends, faceplates |
| Setpoint entry | remote adjustment, mode change |
| Alarm management | priority, acknowledge, first-out, shelving |
| Historian | time-stamped archive, regulatory reports |

> [!warning] Exam trap
> Determinism (bounded, repeatable latency and low jitter) is what control traffic needs; best-effort TCP or MQTT is fine outward to the enterprise, but cyclic fieldbus or EtherNet/IP belongs inside the cell.

**Conditions:** master/slave (Modbus, DNP3) polls and client/server (Modbus TCP, EtherNet/IP) is the same model on TCP, while MQTT is publish/subscribe through a broker; every remote setpoint must be range-checked in the PLC. #scada #plc

---

## Part C — Building Automation and Life Safety

### 8. Building Automation, HVAC and Life Safety

**Building automation and lighting protocols**

| Protocol | Medium | Addressing | Typical use |
|---|---|---|---|
| BACnet | RS-485, IP, MS/TP | device + object instance | HVAC, chillers, BAS |
| KNX | twisted pair, RF, IP | individual + group address | lighting, blinds, room control |
| LonWorks | twisted pair, power line, IP | Neuron ID, network variable | legacy BAS, meters |
| DALI | 2-wire bus, 1200 bit/s | 64 ballasts, 16 groups | digital dimming, lamp-failure report |
| 0–10 V | analogue pair | per driver | simple dimming, no feedback |
| Modbus | RS-485 / IP | registers | meters, VFDs |

**Symbols**

- BAS — building automation system, the supervisory system that controls HVAC, lighting and other building services; dimensionless
- MS/TP — Master-Slave/Token-Passing, the RS-485 BACnet data link used on the field bus; dimensionless
- VFD — variable-frequency drive, the power converter that varies the speed of an ac motor to match the load; dimensionless

**Sensible and latent HVAC load ★**

$$\text{CFM}=\frac{Q_s}{1.08\,\Delta T},\qquad Q_s=1.08\times\text{CFM}\times\Delta T,\qquad \text{CFM}=\frac{Q_t}{4.5\,\Delta h}$$

CFM in ft³/min, $Q_s$ = sensible load in Btu/h, $\Delta T$ = room-to-supply temperature difference in °F, $Q_t$ = total load in Btu/h, $\Delta h$ = enthalpy difference in Btu/lb; 1.08 = 60 min/h × 0.075 lb/ft³ × 0.24 Btu/(lb·°F).

Design example: 120 000 Btu/h sensible at $\Delta T=20\ ^\circ F$ gives CFM = 120000/(1.08 × 20) = 5556 ft³/min.

**VFD affinity laws ★**

$$\frac{Q_2}{Q_1}=\frac{N_2}{N_1},\qquad \frac{H_2}{H_1}=\Big(\frac{N_2}{N_1}\Big)^2,\qquad \frac{P_2}{P_1}=\Big(\frac{N_2}{N_1}\Big)^3,\qquad P=\frac{\rho gQH}{\eta}$$

$N$ in rpm, $Q$ in m³/s (or CFM), $H$ in m (or ft) of head, $P$ in W (or hp), $\rho$ in kg/m³, $\eta$ dimensionless; halving speed halves flow but leaves only 12.5 % of the power, which is why VFDs save energy on fans and pumps.

**Fire detection and alarm ★**

$$\text{obscuration}=\frac{\Delta I}{I_0\,L}\times100\ (\%/\text{m}),\qquad A_{det}=\frac{\text{coverage area}}{n}$$

$\Delta I/I_0$ dimensionless, $L$ = optical path length in m, $A_{det}$ = area per detector in m², $n$ = number of detectors (dimensionless); photoelectric detectors alarm around 1.5–3.5 %/m obscuration and ionisation types react to combustion aerosol.

| Device | Senses | Notes |
|---|---|---|
| Ionisation smoke | combustion aerosol | fast on flaming fires |
| Photoelectric smoke | light scattering | standard for smouldering fires |
| Heat (fixed / rate-of-rise) | temperature or its slope | fewer false alarms, slower |
| Sprinkler flow switch | water movement | confirms suppression |
| Notification appliance | horn / strobe | audible and visible evacuation |
| Manual call point | human action | pull station on the loop |

**Conventional vs addressable**

| Feature | Conventional zoned | Addressable |
|---|---|---|
| Wiring | zone circuit, many devices per zone | loop with individual device ID |
| Alarm location | zone only | exact device |
| Supervision | zone level | per device, open/short/fault |
| Fault tolerance | a zone can be lost | isolators keep the loop alive |

**Fail-safe hardware**

$$\text{energise to hold} \Rightarrow \text{release on power loss (fail-safe)},\qquad \text{energise to open (fail-secure)}$$

Magnetic locks and fire-door holders are fail-safe (they release on alarm or power loss); electric strikes may be fail-secure and then need a break-glass or battery-backed release.

> [!warning] Exam trap
> The cube law is the exam favourite: 80 % speed gives 51 % power, 50 % speed gives 12.5 % power. Mixing up the $N^2$ head law with the $N^3$ power law loses the item.

**Conditions:** the CFM relations assume standard air at 0.075 lb/ft³ and $c_p=0.24$ Btu/(lb·°F) at sea level; detector thresholds, spacing and sprinkler coverage follow NFPA 72/13 and the Philippine Fire Code (RA 9514). #hvac #lifesafety

→ Back to [[00_Index]]
