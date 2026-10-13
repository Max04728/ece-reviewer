---
title: Electronics Systems and Technologies Index
part: EST
tags: [ece, est, formula-sheet, moc]
topics: 99
---

# Electronics Systems and Technologies — PRC ECE Board Formula Vault

## How to use this vault

1. Start here at the Map of Content; each subject note holds every topic as a `###` section in board order.
2. Every topic is formula-only: symbols with SI units inline, one **Conditions:** line, ★ on high-yield formulas.
3. Read the `> [!warning] Exam trap` callouts last — they mark the mistakes that cost board points.
4. Cross-links use numbered anchors, e.g. `[[02_Principles_of_Communications#7. Carson's Rule and FM Bandwidth|Carson's Rule]]`.
5. Filter with tags: #noise #sampling #am #fm #pcm #linecoding #qam #shannon #hamming #osi #tcpip #subnetting #vswr #smithchart #waveguide #antenna #fiber #radar #satellite.

## Map of Content

| # | Subject | Topics | Sections |
|---|---|---|---|
| 1 | [[01_Signals_Spectra_and_Noise\|Signals Spectra and Noise]] | 12 | Part A Signal Analysis and Noise · Part B Sampling and Discrete Processing |
| 2 | [[02_Principles_of_Communications\|Principles of Communications]] | 15 | Part A Amplitude Modulation · Part B Angle Modulation · Part C FM Circuits and Receivers · Part D Transmission Levels |
| 3 | [[03_Digital_Communications\|Digital Communications]] | 16 | Part A Pulse and PCM · Part B Line Coding and Bandpass · Part C Detection and Coding |
| 4 | [[04_Data_Communications_and_Networking\|Data Communications and Networking]] | 21 | Part A Layered Models, Framing and ARQ · Part B IP Addressing, Routing and Transport · Part C Multiplexing, Multiple Access and Cellular · Part D Topologies and Security |
| 5 | [[05_Transmission_Lines_and_Waveguides\|Transmission Lines and Waveguides]] | 10 | Part A Line Constants and Reflection · Part B Matching and Waveguides |
| 6 | [[06_Antenna_Systems_and_Propagation\|Antenna Systems and Propagation]] | 17 | Part A Antenna Fundamentals · Part B Radio Wave Propagation · Part C Radar, Satellite and Optical Systems · Part D Arrays and Polarization |
| 7 | [[07_Industrial_Automation_and_Instrumentation\|Industrial Automation and Instrumentation]] | 8 | Part A Process Instrumentation · Part B PLC, Ladder Logic and Industrial Networks · Part C Building Automation and Life Safety |

**Total: 99 topics** across 7 subjects (12 + 15 + 16 + 21 + 10 + 17 + 8 = 99).

> [!tip] High-yield ★
> **Most heavily tested subjects — drill these five first:**
> 1. [[02_Principles_of_Communications|Principles of Communications]]
> 2. [[03_Digital_Communications|Digital Communications]]
> 3. [[04_Data_Communications_and_Networking|Data Communications and Networking]]
> 4. [[05_Transmission_Lines_and_Waveguides|Transmission Lines and Waveguides]]
> 5. [[06_Antenna_Systems_and_Propagation|Antenna Systems and Propagation]]
> They carry the bulk of the EST items. Use [[01_Signals_Spectra_and_Noise|Signals Spectra and Noise]] as the tool-box subject that feeds every other one (noise figure, sampling, bandwidth).

> [!warning] Exam trap
> The original headline count 87 matched the first six subjects (12 + 14 + 16 + 19 + 10 + 16 = 87). A later corpus-coverage pass added 12 topics and one new subject — noise bandwidth and Friis-cascade forms, autocorrelation parity and the DC-block property, multi-tone AM/FM, the 600 Ω telephony reference, Hartley's capacity law, high-frequency coax/twin-lead $Z_0$, horn/helix/fibre-window forms, network topologies, network security, antenna arrays and polarization, and the 8-topic industrial-automation file — for a true total of **99**.

> [!tip] Sibling vaults
> These are separate Obsidian vaults, so nothing here links out. **Electromagnetics** (Maxwell, Poynting, plane waves) is in the `Mathematics` vault (`05_Electromagnetics.md`), **signals and sampling** fundamentals in `Mathematics/07_Signals_and_Systems.md`, and **industrial automation / PLC / SCADA** overlaps `Electronics_Engineering/07_Industrial_Automation_and_Sensors.md`. Open those folders directly when an EST item strays outside communications.

## Split notes

- **One file per subject.** Topics run with continuous numbering across parts, and the file count is 1 index + 7 subject notes. [[07_Industrial_Automation_and_Instrumentation|Industrial Automation and Instrumentation]] was added by the corpus-coverage pass and is not part of the original six-subject syllabus list.
- **Line count:** the brief's ≤150-line guidance is not applied, because it cannot coexist with the style guide's 12–25 lines per topic plus the mandatory `**Conditions:**` line, inline SI units, tags and callouts. The style guide governs.
- These notes run 281–575 lines at 40–45 characters per line — the same density as the finished `Mathematics/` and `Electronics_Engineering/` vaults.
- **Original batches 1–3:** `01` (12), `02` (14), `03` (16), `04` (19), `05` (10), `06` (16). The coverage pass brought `02` to 15, `04` to 21 and `06` to 17, and added `07` (8). #split

## Cross-topic jump table

| If you are solving… | Jump to |
|---|---|
| Noise figure or noise temperature of a receiver | [[01_Signals_Spectra_and_Noise#5. SNR, Noise Factor and Noise Figure\|Noise Figure]] |
| Cascade noise of a receiver front end | [[01_Signals_Spectra_and_Noise#6. Equivalent Noise Temperature\|Noise Temperature]] |
| Aliasing and anti-alias filter order | [[01_Signals_Spectra_and_Noise#9. Anti-Aliasing Filters\|Anti-Aliasing Filters]] |
| Modulation index or AM power efficiency | [[02_Principles_of_Communications#2. AM Spectrum, Bandwidth and Power\|AM Power]] |
| FM bandwidth from deviation | [[02_Principles_of_Communications#7. Carson's Rule and FM Bandwidth\|Carson's Rule]] |
| Image frequency of a superhet | [[02_Principles_of_Communications#13. Image Frequency and IRR\|Image Frequency]] |
| Receiver sensitivity in dBm | [[02_Principles_of_Communications#14. AGC and Receiver Characteristics\|AGC and Receiver Characteristics]] |
| PCM bit rate and SQNR from bits/sample | [[03_Digital_Communications#2. PCM: Sampling, Quantizing, Encoding\|PCM Chain]] |
| Quantization noise or SQNR vs bits | [[03_Digital_Communications#3. Quantization Noise and SQNR\|Quantization Noise]] |
| Maximum data rate of a noisy channel | [[03_Digital_Communications#15. Shannon-Hartley Capacity\|Shannon-Hartley]] |
| Hamming parity bits or CRC length | [[03_Digital_Communications#16. Error Control: Hamming and CRC\|Hamming and CRC]] |
| Layer of a protocol or a PDU name | [[04_Data_Communications_and_Networking#1. OSI Seven-Layer Model\|OSI Model]] |
| ARQ window size and link utilization | [[04_Data_Communications_and_Networking#4. ARQ: Stop-and-Wait, GBN, Selective Repeat\|ARQ Windows]] |
| Subnet mask, block size or host count | [[04_Data_Communications_and_Networking#10. Subnetting, CIDR and VLSM\|Subnetting]] |
| Port number of a common service | [[04_Data_Communications_and_Networking#13. TCP vs UDP and Port Numbers\|TCP vs UDP]] |
| T1/E1 rate or frame structure | [[04_Data_Communications_and_Networking#14. Multiplexing: FDM, TDM, T1 and E1\|T1 and E1]] |
| Frequency reuse cluster size or SIR | [[04_Data_Communications_and_Networking#18. Cellular Fundamentals, Reuse and Handoff\|Cellular Reuse]] |
| VSWR, return loss or reflection coefficient | [[05_Transmission_Lines_and_Waveguides#4. Reflection Coefficient and VSWR\|VSWR]] |
| Stub length or quarter-wave match | [[05_Transmission_Lines_and_Waveguides#7. Stub Matching\|Stub Matching]] |
| Waveguide cutoff, guide wavelength or $TE_{10}$ | [[05_Transmission_Lines_and_Waveguides#9. Cutoff Frequency and Guide Wavelength\|Cutoff Frequency]] |
| Directivity, gain or EIRP of an antenna | [[06_Antenna_Systems_and_Propagation#1. Antenna Parameters: Directivity, Gain, EIRP\|Antenna Parameters]] |
| Link budget, FSPL or Friis received power | [[06_Antenna_Systems_and_Propagation#6. FSPL and Friis Transmission Equation\|Friis and FSPL]] |
| MUF, critical frequency or skip distance | [[06_Antenna_Systems_and_Propagation#10. Critical Frequency, MUF and Skip Distance\|MUF and Skip]] |
| Radar maximum range | [[06_Antenna_Systems_and_Propagation#11. Radar Range Equation and Microwave Links\|Radar Range]] |
| Fiber NA, V number or link power budget | [[06_Antenna_Systems_and_Propagation#16. Optical Sources, Detectors and Power Budget\|Fiber Power Budget]] |
| Noise bandwidth from the 3 dB bandwidth | [[01_Signals_Spectra_and_Noise#3. Thermal and Johnson Noise\|Noise Bandwidth]] |
| Friis cascade noise factor of a chain | [[01_Signals_Spectra_and_Noise#5. SNR, Noise Factor and Noise Figure\|Noise Figure]] |
| Antenna current from modulation index | [[02_Principles_of_Communications#2. AM Spectrum, Bandwidth and Power\|AM Power]] |
| 600 Ω reference or dBm level | [[02_Principles_of_Communications#15. Signal Levels and the Telephony Reference\|Transmission Levels]] |
| Noiseless-channel data rate from levels | [[03_Digital_Communications#15. Shannon-Hartley Capacity\|Shannon-Hartley]] |
| Mesh link count or topology choice | [[04_Data_Communications_and_Networking#20. Network Topologies\|Network Topologies]] |
| RSA, Diffie-Hellman or password keyspace | [[04_Data_Communications_and_Networking#21. Network Security\|Network Security]] |
| Coax or twin-lead characteristic impedance | [[05_Transmission_Lines_and_Waveguides#1. Primary Constants R, L, G, C\|Primary Constants]] |
| Horn beamwidth, helical antenna or fibre window | [[06_Antenna_Systems_and_Propagation#5. Parabolic Reflector Antennas\|Parabolic Reflector Antennas]] |
| Array factor, phased array or polarization loss | [[06_Antenna_Systems_and_Propagation#17. Antenna Arrays and Polarization\|Arrays and Polarization]] |
| 4–20 mA loop scaling or live zero | [[07_Industrial_Automation_and_Instrumentation#1. The 4–20 mA Current Loop\|Current Loop]] |
| Thermocouple, RTD or Seebeck effect | [[07_Industrial_Automation_and_Instrumentation#2. Temperature Sensors: Thermocouples and RTDs\|Temperature Sensors]] |
| PLC scan cycle or ladder logic | [[07_Industrial_Automation_and_Instrumentation#4. PLC Architecture and the Scan Cycle\|PLC Scan Cycle]] |
| PID terms or tuning | [[07_Industrial_Automation_and_Instrumentation#6. PID Control\|PID Control]] |
| SCADA, HMI or Modbus | [[07_Industrial_Automation_and_Instrumentation#7. SCADA, HMI and Industrial Networks\|SCADA and HMI]] |
| HVAC airflow, DALI or smoke obscuration | [[07_Industrial_Automation_and_Instrumentation#8. Building Automation, HVAC and Life Safety\|Building and Life Safety]] |

## Tag index

#ece #est #formula-sheet · #fourier #psd #noise #sampling #filter #dft #fft
#am #fm #bessel #receiver #levels · #pcm #delta #linecoding #isi #qam #shannon #hamming #fec · #osi #tcpip #arq #ethernet #subnetting #routing #topology #security
#mux #wcdma #ofdma #cellular · #vswr #smithchart #stub #waveguide #cutoff · #antenna #dipole #yagi #fspl #radar #satellite #fiber #arrays #polarization · #instrumentation #plc #ladder #scada #pid #hvac #lifesafety #building
