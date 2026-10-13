# EST corpus vs EST vault — coverage audit

Source corpus: `PB5 EST NEW VERSION-merged.pdf` (199 pages) → `PB5 EST NEW VERSION-merged.txt`,
digest, and its own Part II/V/III/IV sections.
Vault audited: `C:\Users\Admin\Desktop\Formula\EST\` (7 files, 87 topics, all read in full).

---

## 1. Corpus summary

| Property | Value |
|---|---|
| Pages | 199 (text run ends at `===== PAGE 195 =====`) |
| Merged sub-reviewers | 9 DOC blocks (DOC 1–9) |
| Question blocks | **702** (DOC1=99, DOC2=100, DOC3=1, DOC4=100, DOC5=2, DOC6=100, DOC7=100, DOC8=100, DOC9=100) |
| DOC 3 / DOC 5 | Fragments (front-matter boilerplate and a one-line index, not real items) |
| Questions carrying an explicit `Topic:` label | 533 occurrences, ~250 distinct labels |
| Exam's own formula sheet | `P3_FORMULAS.txt` — 213 lines, ~60 named laws |
| Exam's own terms sheet | `P2_TERMS.txt` — 222 lines |

### Frequency table — top examined clusters

Clusters overlap (a question on FM Carson's rule counts in "Angle modulation"), so counts are **approximate**.

| Cluster | Approx. Q count | TOPIC labels seen |
|---|---|---|
| Data comms: OSI/TCP-IP, LAN/WAN, IP & subnetting, routing, security | ~87 | `DataCommunications/*`, `DataNetworks/*`, `NetworkSecurity/*`, `Networking/IPv4Subnetting` |
| Antennas: dipoles, monopoles, Yagi, arrays, dishes, horn, helix, EIRP | ~68 | `AntennaEngineering/*`, `Antennas/*` |
| Digital modulation & BER: ASK/FSK/PSK/QAM, ISI, equalizers | ~50 | `DigitalCommunications/*`, `DigitalModulation/*` |
| Sampling / PCM / quantization / companding / DM / PAM-PWM-PPM | ~40 | `PulseModulation/*`, `DigitalCommunications/PCM*` |
| Multiplexing, telephony carriers, switching, ISDN/ATM | ~38 | `Telecommunications/*`, `Telephony/*`, `DataCommunications/ATMNetworks` |
| Transmission lines: constants, VSWR, Smith chart, stubs | ~36 | `TransmissionLines/*` |
| Industrial automation, instrumentation, BMS, life-safety | ~29 | `IndustrialAutomation/*`, `IndustrialElectronics/*`, `IndustrialInstrumentation/*`, `IndustrialBuildingAutomation/HVAC`, `LifeSafetySystems/*` |
| DSP: FIR/IIR, Z-transform, ROC, filter design, convolution | ~30 | `DigitalSignalProcessing/*`, `DSP/*` |
| Information theory & error-control coding | ~30 | `InformationTheory/*`, `DataLinkLayer/ErrorControl` |
| Noise: thermal/shot/flicker, NF, noise temperature, noise bandwidth | ~27 | `NoiseAnalysis/*`, `RFAmplifiers/NoiseFigureAnalysis`, `ThermalNoise/*` |
| Propagation: ground/sky/space, ionosphere, MUF, Fresnel, fading | ~24 | `WavePropagation/*`, `RadioWavePropagation/*` |
| Waveguides, microwave, cavity resonators | ~23 | `MicrowaveEngineering/*`, `Microwaves/*` |
| Signals & systems: classification, symmetry, convolution, Parseval | ~20 | `Signals&Systems/*`, `CommunicationsFundamentals/*` |
| Angle modulation: Bessel, Carson, deviation, FM receivers | ~18 | `AngleModulation/*`, `RFReceivers/*`, `FMReceivers/*` |
| Cellular & multiple access / spread spectrum | ~17 | `CellularSystems/*`, `CellularCommunications/*`, `SpreadSpectrum/*` |
| Fiber optics & optoelectronics | ~17 | `FiberOptics/*`, `Optoelectronics/*`, `OpticalCommunications/WDM` |
| Network security / cryptography | ~16 | `NetworkSecurity/*`, `Cybersecurity/*` |
| Superheterodyne & IF design | ~11 | `RFReceivers/Superheterodyne*`, `RFReceivers/ImageRejection` |
| Satellite & radar | ~5 | `SatelliteCommunications/*`, `SatelliteLinks/*` |
| TV / broadcast / CATV | ~2 | — |

---

## 2. Coverage scorecard

| Vault file | Topics in vault | Examined clusters it covers | Verdict |
|---|---|---|---|
| `01_Signals_Spectra_and_Noise.md` | 12 | Noise (§3–§6), sampling (§7–§8), PSD/Parseval (§1–§2), DSP filters (§10–§12) | **Good core, two gaps**: no noise-bandwidth formula, no signal-classification / Fourier-symmetry layer |
| `02_Principles_of_Communications.md` | 14 | AM/DSB/SSB (§1–§3), FM/PM (§5–§9), superhet & image (§12–§13), AGC/sensitivity (§14) | **Strong**, but missing AM current relations, multi-tone AM/FM, freq. multipliers, FM demodulator circuits, oscillator/PLL |
| `03_Digital_Communications.md` | 16 | PCM/quantization (§2–§3), companding (§4), DM (§5), line coding (§6), ISI (§7), PSK/QAM (§9–§12), Shannon (§14–§15), Hamming/CRC (§16) | **Strong**, but **Hartley/Nyquist `C=2B log2 M` absent**, no ROC, no zero-placement |
| `04_Data_Communications_and_Networking.md` | 19 | OSI/TCP-IP (§1–§2), framing/ARQ (§3–§5), MAC/Ethernet/WLAN (§6–§7), IP/subnet/CIDR/IPv6 (§9–§11), routing (§12), TCP/UDP (§13), TDM/FDM/T1/E1 (§14), WDM (§15), CDMA/OFDM (§16–§17), cellular (§18–§19) | **Broad but structurally incomplete**: no network topologies, no ATM, no ISDN channel structure, no crypto, no STP |
| `05_Transmission_Lines_and_Waveguides.md` | 10 | Primary/secondary constants (§1–§2), distortionless (§3), VSWR (§4), Z_in/QWT (§5), Smith chart (§6), stubs (§7), waveguide modes/cutoff/λg (§8–§10) | **Good**, but **coax/twin-lead 138/276 log10 impedance forms absent**, no cavity resonator |
| `06_Antenna_Systems_and_Propagation.md` | 16 | Antenna parameters/dipoles/Yagi/dishes (§1–§5), Friis/FSPL (§6), ground/sky/space wave (§7–§10), radar (§11), TV/ISDB-T (§12), satellite (§13), fiber (§14–§16) | **Good**, but **no horn, no helix, no array-factor/phased-array, no polarization-loss-factor** |
| `00_Index.md` | (MOC) | — | Accurate map, but its jump table has no entry for industrial/instrumentation, topologies, ATM/ISDN, horn/helix/array, or noise bandwidth — i.e. it mirrors the blind spots |

---

## 3. MISSING items

### 3.1 Formula-level gaps

| # | Examined formula / law | Where it is tested (Q numbers / sub-reviewer) | Evidence it is absent from the vault | Suggested vault home (file + topic) |
|---|---|---|---|---|
| 1 | Noise bandwidth of a single-tuned circuit `Bn = (π/2)·B3dB ≈ 1.57·B3dB`; tuned-circuit `Bn = 1/(RC)` | D7Q25 (B3dB = 10 MHz → **15.7 MHz**); D7Q39 (C = 25 pF, R = 1.6 kΩ → **25 MHz**) | `grep "noise band|1\.57|B_n|1/RC|tuned circuit"` over `EST\` returns **no formula**. The phrase appears exactly once, as prose in `02_Principles_of_Communications.md` §14 **Conditions**: "*noise-limited sensitivity uses $B$ as the receiver noise bandwidth and $SNR_{min}$ as the required detector threshold*" — the value of that $B$ is never defined; `05_Transmission_Lines_and_Waveguides.md` has 0 matches for all of these terms | `01_Signals_Spectra_and_Noise.md` — new `### 13. Noise Bandwidth of Tuned Circuits` (or add to §9) |
| 2 | Coaxial characteristic impedance `Z0 = (138/√εr)·log10(D/d)` | D7Q6 (D = 0.2 in, d = 0.06 in, polyethylene → **48 Ω**) | `05_Transmission_Lines_and_Waveguides.md` §1 has only `L=μ/2π·ln(b/a)`, `C=2πε/ln(b/a)`, `R`, `G`; `grep "138|276"` over `EST\` returns nothing | `05_Transmission_Lines_and_Waveguides.md` — `### 1. Primary Constants R, L, G, C` |
| 3 | Twin-lead / parallel-wire impedance `Z0 = (276/√εr)·log10(2D/d)` | D7Q52 (d = 0.023 in, D = 0.5 in, PVC → **249 Ω**) | Same grep as #2; §1 only shows `L_2wire`/`C_2wire` and `εeff` for microstrip | `05_Transmission_Lines_and_Waveguides.md` — `### 1. Primary Constants R, L, G, C` |
| 4 | Hartley / Nyquist noiseless capacity `C = 2B·log2(M)` | D8Q1 (`H = C·T = 2BT·log2 M`), D8Q38 (3 kHz, 8 levels → 18 kbit/s), D1Q99, D2Q79 | `03_Digital_Communications.md` §15 covers **only** `C = B log2(1+S/N)`; §7 gives `R_s = 1/T_s ≤ 2B` but never `C = 2B log2 M`. `grep -i hartley` over `EST\` returns nothing | `03_Digital_Communications.md` — `### 15. Shannon-Hartley Capacity` |
| 5 | Poynting vector `S = E × H`, `|S| = E²/η0 = E²/377` | D4Q34, D4Q79, D7Q51 (E = 10 V/m → **0.265 W/m²**), D9Q8 | `grep -i poynting` over `EST\` = 0 hits; §1 of `06_…` gives `S = PtGt/(4πd²)` only | `06_Antenna_Systems_and_Propagation.md` — `### 1. Antenna Parameters` (or a new propagation/EM topic in `05`) |
| 6 | Pyramidal horn beamwidth `θE ≈ 56λ/dE` (and `θH ≈ 67λ/dH`) | D6Q35 (dE = 58 mm @ 10 GHz → **29°**), D2Q64 | `grep -i horn` over `EST\` = 0 hits; `06_…` §5 covers parabolic dishes only | `06_Antenna_Systems_and_Propagation.md` — `### 5. Parabolic Reflector Antennas` (extend to apertures/horns) |
| 7 | Axial-mode helix: `C ≈ λ`, `S ≈ 0.25λ`, `f = c/λ` | D4Q77 (S = 4 cm → **1.875 GHz**) | `grep -i "helix|helical"` over `EST\` = 0 hits | `06_Antenna_Systems_and_Propagation.md` — `### 4. Marconi, Folded Dipole, Yagi-Uda` |
| 8 | Cavity-resonator quality factor (cubical copper cavity at 15 GHz) | D9Q54 (σ = 5.8×10⁷ S/m, 15 GHz → **Q ≈ 8736**) | `05_…` has §8–§10 on modes/cutoff/velocities but **no cavity/resonator topic**; `grep -i "cavity|resonator"` over `EST\` = 0 hits | `05_Transmission_Lines_and_Waveguides.md` — new `### 11. Cavity Resonators` |
| 9 | AM antenna-current relation `It = Ic·√(1 + m²/2)` ⇒ `m = √(2[(It/Ic)² − 1])` | D1Q69 (Ic = 10 A → It = 11.5 A ⇒ **m ≈ 0.81**) | `02_…` §2 "Power relations" gives `Pt = Pc(1+m²/2)` only — no current form | `02_Principles_of_Communications.md` — `### 2. AM Spectrum, Bandwidth and Power` |
| 10 | Multi-tone AM: `mt = √(m1²+m2²+…)`, `Pt = Pc(1+mt²/2)` | D6Q57 (`m(t)=½cos ω1t − ½sin ω2t` on a carrier); stated in the exam's own `P2_TERMS` §2.1 | `02_…` §1–§2 are explicitly single-tone ("**Conditions:** single-tone modulation…") | `02_Principles_of_Communications.md` — `### 2. AM Spectrum, Bandwidth and Power` |
| 11 | FM multi-tone peak deviation `Δf = Σ βi·fi` | D6Q41 (`β1f1 + β2f2`), D6Q71 | `02_…` §5 defines `Δf = kf·Am` and `β = Δf/fm` for one tone; exam `P3_FORMULAS` lists "FM Multitone Deviation" explicitly | `02_Principles_of_Communications.md` — `### 5. FM and PM Fundamentals` |
| 12 | Friis cascade in **noise-factor** form `F = F1 + (F2−1)/G1 + (F3−1)/(G1G2) + …` | D1Q93, D2Q69, D9Q1, D9Q24; exam `P3_FORMULAS` line 51 | `01_…` §6 states the cascade **only** as a `**Conditions:**` tail: "*$T_{sys}=T_a+T_{e1}+T_{e2}/G_1+T_{e3}/(G_1G_2)+\cdots$*" — the F-form used by the exam is absent | `01_Signals_Spectra_and_Noise.md` — `### 6. Equivalent Noise Temperature` |
| 13 | Polarization loss factor `PLF = |ρ̂w·ρ̂a|² = cos²θ` | D2Q90 (cross-polarized ⇒ **PLF = 0**), D2Q29, D7Q10 | `06_…` §1 `**Conditions:**` says "*matched polarization*" but gives no PLF; `grep -i polariz` over `EST\` returns only prose Conditions lines and the ground-wave note | `06_Antenna_Systems_and_Propagation.md` — `### 1. Antenna Parameters` |
| 14 | Fourier symmetry & scaling: even ⇒ `bn = 0`; odd time signal ⇒ imaginary spectrum; conjugate-symmetric ⇒ real even; `E_{f(at)} = E_{f(t)}/a` | D6Q15, D6Q56, D8Q8, D8Q34, D6Q80 (`f(2t)` ⇒ **E/2**) | `01_…` §1 has the complex/trig series and Parseval **only**; `grep -i symmetr` over `EST\` matches only FIR "symmetric taps" (lines 265, 278, 309) | `01_Signals_Spectra_and_Noise.md` — `### 1. Time vs Frequency and Line Spectra` |
| 15 | SSB speech average-to-peak ratio (average power ≈ ¼–⅓ of PEP) | D7Q45 (PEP = 500 W → **125–167 W**) | `02_…` §3 gives `P_SSB = (Ac²/4)Pm` but never relates speech average power to PEP; `P2_TERMS` §2.1 states it as a fact | `02_Principles_of_Communications.md` — `### 3. DSB-SC and SSB-SC` |
| 16 | Full-mesh link count `L = N(N−1)/2`, star/bus/ring reliability rules | D8Q41 (N = 8 → **28**), D9Q99 (N = 6 → **15**), D1Q33, D1Q47, D2Q9, D2Q13, D2Q96, D9Q10, D9Q57, D7Q56, D7Q67, D8Q17, D8Q60, D8Q80, D4Q57 | `04_…` has **no topology section**; the word "topology" appears only inside §12 routing (lines 354, 361) | `04_Data_Communications_and_Networking.md` — `### 8. Switching: Circuit vs Packet` (or new §20) |
| 17 | ATM cell payload efficiency `48/53 = 90.6 %` (overhead 9.43 %), 53-byte fixed cell | D2Q1, D8Q79, D1Q59, D7Q24 | `grep -i "ATM"` over `EST\` returns **zero** hits (the seven files never contain the string; the "ATM inside atmosphere" false positive the brief warned about does not even arise because the term is simply absent) | `04_Data_Communications_and_Networking.md` — `### 8. Switching: Circuit vs Packet` |
| 18 | ISDN channel structure: BRI `2B+D` = 2×64 + 16 = 144 kbit/s; PRI (NA) `23B+D` on T1 | D1Q18, D2Q80, D7Q87, D8Q53, D7Q24 | `grep -i ISDN` over `EST\` matches only two passing table rows: `03_…` line 168 (`| 2B1Q | … | ISDN U-interface |`) and `04_…` line 242 (`| Example | PSTN, ISDN | …`) | `04_Data_Communications_and_Networking.md` — `### 14. Multiplexing: FDM, TDM, T1 and E1` |
| 19 | Varactor-tuned / LC oscillator `f = 1/(2π√(LC))` | D9Q27 (25 µH, 45 pF), D6Q63 | No oscillator topic exists in `02_…` (Part C ends at §14 AGC); `grep -i "varactor|Colpitts"` over `EST\` = 0 hits | `02_Principles_of_Communications.md` — new `### 15. Oscillators and PLL` |
| 20 | PLL capture range vs lock range | D8Q74 | Same as #19 — no PLL content anywhere in `EST\` | `02_Principles_of_Communications.md` — new `### 15. Oscillators and PLL` |
| 21 | Frequency-multiplier rule (×N multiplies **both** carrier and deviation by N) | D6Q27 (20 MHz → 120 MHz with ×2 and ×3) | `02_…` §7 covers Carson/deviation ratio but no multiplier stage | `02_Principles_of_Communications.md` — `### 7. Carson's Rule and FM Bandwidth` |
| 22 | Snell's law / refraction at a dielectric interface | D2Q42 (30° into εr = 4.0) | `grep -i "refract|Snell"` over `EST\` returns only one prose hit, `06_Antenna_Systems_and_Propagation.md` line 220 ("*the 4/3 earth-radius model accounts for atmospheric refraction*"); no Snell-type relation exists anywhere | `06_Antenna_Systems_and_Propagation.md` — `### 7. Ground Wave Propagation` (or a new EM topic) |
| 23 | Telephony dB reference: **600 Ω** audio reference, `dBm0`, `dBrn` | D1Q84 (600 Ω), related `Telephony/DecibelStandards` items D2Q46, D7Q39, D8Q28, D9Q5 | `01_…` §3 defines only `P_dBm = 10 log10(P/1 mW)` with a 1 mW reference; no 600 Ω / dBm0 | `01_Signals_Spectra_and_Noise.md` — `### 3. Thermal and Johnson Noise` (or new decibel topic) |
| 24 | Half-duplex line-turnaround / effective throughput | D2Q46 (9600 bps, 20 ms turnaround), D8Q100 | `04_…` §3 has `U = T_frame/(T_frame+2T_prop+T_ack)` — an ACK *transmission* term, not a fixed device turnaround | `04_Data_Communications_and_Networking.md` — `### 3. Framing and Flow Control` |
| 25 | Rayleigh scattering `α ∝ 1/λ⁴` and the **850 nm** first window | D6Q28 (850 nm popular), D6Q66 (850/1300/1550 nm), D7Q57 (Rayleigh scattering loss) | `06_…` §15 `**Conditions:**` states only "*1310 nm and 1550 nm are the low-loss windows (0.35 and 0.2 dB/km typical)*"; no 850 nm, no λ⁻⁴ law | `06_Antenna_Systems_and_Propagation.md` — `### 15. Fiber Attenuation and Dispersion` |

### 3.2 Concept-level gaps

| # | Examined concept | Q numbers | Suggested vault home |
|---|---|---|---|
| 1 | **Industrial automation, instrumentation, BMS and life-safety** (~29 Qs — an entire missing subject): 4–20 mA loop scaling, Seebeck/thermocouple, strain gauges, PLC scan cycle, ladder-logic symbols, SCADA/HMI, HVAC demand-controlled ventilation, DALI lighting, PID tuning, smoke-detector obscuration, ADC signal conditioning, opto-isolators, relay vs PLC capability | D1Q9, D1Q39, D1Q54, D1Q62, D1Q82, D1Q96, D2Q85, D4Q2, D4Q17, D4Q23, D4Q46, D4Q80, D4Q87, D6Q21, D7Q16, D7Q30, D7Q43, D7Q83, D8Q12, D8Q26, D8Q36, D8Q44, D8Q91, D8Q97, D9Q4, D9Q58, D9Q85, D9Q91, D9Q92 | New file, e.g. `07_Industrial_Instrumentation_and_Control.md` (out of scope for the 6 comms notes) — or at minimum an appendix topic in `04_…` |
| 2 | **Network security / cryptography**: asymmetric vs symmetric (RSA), public/private key use, cryptographic hashing, Diffie-Hellman MITM, VPN policy centralisation, password space `62⁸`, session-cookie flags | D1Q61, D2Q10, D2Q31, D2Q70, D4Q22, D4Q39, D6Q53, D6Q54, D6Q76, D6Q100, D7Q41, D8Q30, D8Q69, D9Q100 | `04_Data_Communications_and_Networking.md` — new `### 20. Network Security` |
| 3 | **Network topologies** — bus/star/ring/mesh, terminator function, single point of failure, scalability, redundancy | D1Q33, D1Q47, D2Q9, D2Q13, D2Q96, D4Q57, D7Q56, D7Q67, D8Q17, D8Q60, D8Q80, D9Q10, D9Q57 | `04_Data_Communications_and_Networking.md` — new `### 20.`/append to `### 6. MAC Protocols and Ethernet` |
| 4 | Spanning Tree Protocol (802.1D) loop blocking | D8Q45 | `04_Data_Communications_and_Networking.md` — `### 6. MAC Protocols and Ethernet` |
| 5 | Wireless PAN / IoT radio selection: Bluetooth vs Zigbee vs Wi-Fi vs LoRa, low-power/noisy-environment choice | D4Q6, D4Q16, D4Q30, D4Q82, D6Q43, D7Q64 | `04_Data_Communications_and_Networking.md` — `### 7. Wireless LAN and CSMA/CA` |
| 6 | Telephony 2-wire vs 4-wire circuits and hybrids | D1Q52, D2Q38, D2Q94, D7Q60, D7Q78, D7Q85, D9Q23, D9Q49 | `04_Data_Communications_and_Networking.md` — `### 14. Multiplexing: FDM, TDM, T1 and E1` |
| 7 | FM demodulator circuits: slope detector vs **phase discriminator/ratio detector**, quadrature detector, limiter action, capture effect | D2Q97, D6Q26, D7Q13, D9Q64 | `02_Principles_of_Communications.md` — Part C, new `### 15. FM Demodulators` |
| 8 | Superheterodyne practical effects: double spotting, variable sensitivity, IF-bandwidth ↔ sensitivity trade, IF amplifier overload | D1Q44, D2Q18, D6Q18, D8Q42, D9Q11 | `02_Principles_of_Communications.md` — `### 12. Superheterodyne Receiver` / `### 14. AGC and Receiver Characteristics` |
| 9 | AGC dynamics: delayed AGC, too-short time constant ("pumping"/breathing) | D4Q74, D6Q49 | `02_Principles_of_Communications.md` — `### 14. AGC and Receiver Characteristics` |
| 10 | Intermodulation / cross-modulation from 3rd-order mixer nonlinearity | D2Q88 | `02_Principles_of_Communications.md` — `### 12. Superheterodyne Receiver` |
| 11 | Cable/medium practice: UTP twist pitch vs crosstalk & EMI, AMI's advantage over NRZ, remote-power/DC balance | D4Q84, D8Q23 | `03_Digital_Communications.md` — `### 6. Line Coding Schemes` |
| 12 | Fiber physical layer: polishing/scratch defects, connector alignment & spot-size matching, skew vs meridional rays | D6Q1, D4Q3, D4Q85 | `06_Antenna_Systems_and_Propagation.md` — `### 16. Optical Sources, Detectors and Power Budget` |
| 13 | Signal-classification vocabulary: energy vs power signal, deterministic vs random, continuous-time definition, causal signal, "band-limited" requirement | D1Q46, D2Q72, D2Q73, D2Q78, D7Q32, D9Q32, D9Q80, D9Q48 | `01_Signals_Spectra_and_Noise.md` — new `### 13. Signal Classification and Basic Properties` |
| 14 | Region of Convergence for causal/stable LTI | D1Q91, D8Q19 | `01_Signals_Spectra_and_Noise.md` — `### 12. IIR Filters` |
| 15 | Sampling at exactly `2fm` with a phase offset — reconstruction failure mode | D2Q91 | `01_Signals_Spectra_and_Noise.md` — `### 7. Sampling Theorem and Aliasing` |
| 16 | 8-PSK phase-increment conversion (`360°/M = 45°`) and QAM-vs-PSK robustness reasoning | D8Q62, D8Q90, D4Q40, D6Q98 | `03_Digital_Communications.md` — `### 11. M-ary PSK and 16-QAM` |
| 17 | Antenna array **tapering** (edge-element amplitude reduction ⇒ lower sidelobes, wider beam) and phased-array beam steering | D4Q9, D9Q35, D9Q65, D2Q49 | `06_Antenna_Systems_and_Propagation.md` — `### 4. Marconi, Folded Dipole, Yagi-Uda` |
| 18 | Ground-plane antenna with sloping radials (36.5 Ω → ≈50 Ω) | D6Q34 | `06_Antenna_Systems_and_Propagation.md` — `### 4. Marconi, Folded Dipole, Yagi-Uda` |
| 19 | Microstrip patch design practice (feed-point placement, patch dimensions) | D2Q24 | `05_Transmission_Lines_and_Waveguides.md` — `### 1. Primary Constants R, L, G, C` (εeff) |
| 20 | Data-link protocol miscellany: character-oriented vs bit-oriented, BISYNC control characters, LCU, multipoint/multidrop configuration | D7Q22, D7Q33, D7Q44, D7Q46, D9Q38, D9Q68, D9Q95, D6Q96 | `04_Data_Communications_and_Networking.md` — `### 5. HDLC and PPP` |

### 3.3 Constant / value gaps

| # | Needed constant or standard value | Q numbers | Suggested vault home |
|---|---|---|---|
| 1 | **850 nm** first optical window (plus 1300 nm) — the vault's fiber table names only 1310/1550 nm | D6Q28, D6Q66 | `06_Antenna_Systems_and_Propagation.md` — `### 15. Fiber Attenuation and Dispersion` |
| 2 | Dielectric constants used by the line-impedance formulas: polyethylene `εr ≈ 2.3`, PVC `εr ≈ 3.0–3.3` | D7Q6, D7Q52 | `05_Transmission_Lines_and_Waveguides.md` — `### 1. Primary Constants R, L, G, C` |
| 3 | Telephony audio reference impedance **600 Ω** | D1Q84 | `01_Signals_Spectra_and_Noise.md` — `### 3. Thermal and Johnson Noise` |
| 4 | Complete FM carrier-null ladder `β = 2.4, 5.52, 8.65, 11.79` (vault's Bessel table stops at 2.405) | D1Q1 board-exam tip, D2Q53 | `02_Principles_of_Communications.md` — `### 6. FM Sidebands and Bessel Functions` |
| 5 | FM voice quieting threshold as a voltage ratio `(S/N)_v ≈ 3.49` (≈10.86 dB), and the resulting peak noise deviation | D7Q28 (→ **859 Hz**) | `02_Principles_of_Communications.md` — `### 9. FM Noise and Threshold Effect` |

Checked and **not** gaps (recorded so they are not re-flagged): free-space intrinsic impedance `η0 = 120π ≈ 377 Ω` (covered in `05_…` §8; D7Q70, D9Q7); T1/E1 rates, DS0 = 64 kbit/s, 125 µs frame, 193/256 bits (covered in `04_…` §14; D1Q18, D1Q19); 4.5 MHz TV intercarrier and VSB vestige width (covered in `06_…` §12, though unexamined).

---

## 4. PARTIAL / incorrect coverage

| # | Item | What the vault says (file + `###` topic) | What the exam needs | Fix |
|---|---|---|---|---|
| 1 | Receiver cascade noise | `01_Signals_Spectra_and_Noise.md` §6 `**Conditions:**` — "in a cascade, $T_{sys}=T_a+T_{e1}+T_{e2}/G_1+T_{e3}/(G_1G_2)+\cdots$" | The **F-form** `F = F1 + (F2−1)/G1 + …` used by D1Q93 (F1 = 2, G1 = 10 dB, F2 = 11), D2Q69, D9Q1, D9Q24 and printed in the exam's own `P3_FORMULAS` line 51 | Promote the F-form to a display formula next to the T-form |
| 2 | Coax / twin-lead `Z0` | `05_…` §1 "Coaxial cable closed forms" (`L = μ/2π·ln(b/a)`, `C = 2πε/ln(b/a)`, `R`, `G`) + §2 `Z0 = √(L/C)` | The two engineering forms `138/√εr·log10(D/d)` (D7Q6) and `276/√εr·log10(2D/d)` (D7Q52) — the exam never asks the L/C route for these | Add both log10 forms as ★ lines in §1 |
| 3 | Directivity ↔ beamwidth | `06_…` §1 — `D ≈ 41253/(θE·θH)` (degrees) | D7Q15 asks the single-plane form: G = 30 dB ⇒ `θ ≈ √(41253/g)` = 6.4°; D1Q86 asks the qualitative inverse relation | Add `θ_HPBW ≈ √(41253/G) ≈ 200/√G` for a symmetrical aperture |
| 4 | Antenna noise temperature through a lossy feed | `01_…` §5 "Noise figure of a lossy (passive) block" gives `T_loss = T0(L−1)`; §6 gives `T_sys = T_a + T_e` — but never combines them | D6Q13: 40 dBi antenna, T_sky = 15 K, feed loss 0.4 dB, LNA T_e = 40 K ⇒ **G/T = 20.6 dB/K**. Requires `T_ant = T_sky/L_f + T_f(1−1/L_f)` before adding `T_e` | Add a worked lossy-feed block to §6 (or §5) |
| 5 | Bessel sideband table | `02_…` §6 table has four rows (β = 0, 1.0, 2.405, 5.0) and a single null at 2.405 | D1Q1's tip lists four nulls; D2Q53 asks about "β ≈ 2.4"; several items need `A_n = Ac|Jn(β)|` at a *given* β | Extend the table to the full first-null ladder and add J1/J2 magnitudes |
| 6 | FM noise output | `02_…` §9 gives the noise triangle `S_n(f) ∝ f²` and an integral form | D7Q28 needs a *peak noise deviation* result (→ 859 Hz) from the voice S/N threshold | Add the noise-deviation result to §9 |
| 7 | Z-plane zero/pole reading | `01_…` §11/§12 give `H(z)`, `stable ⟺ |p_k| < 1`, "peaks near the poles" | D1Q35 wants "zero at z = 1 removes DC offset"; D2Q89 the same; D4Q76 wants zeros/poles read off `H(z) = K(1−0.5z⁻¹)/(1−0.8z⁻¹)`; D7Q61 the pole-zero-gain form | Add an explicit zero-placement bullet (`z = 1` blocks DC, `z = −1` blocks Nyquist) |
| 8 | Region of convergence | `01_…` §12 states stability as `stable ⟺ |p_k| < 1` with no ROC | D1Q91 and D8Q19 ask the ROC for a causal/stable LTI | Add "for a causal sequence the ROC is `|z| > r_max`; stability requires it to include `|z| = 1`" |
| 9 | Fiber attenuation table | `06_…` §15 `**Conditions:**` — "1310 nm and 1550 nm are the low-loss windows (0.35 and 0.2 dB/km typical)"; the table in §15 lists MF step-index / graded-index / SMF-28 / DSF | D6Q28 and D6Q66 require the **850 nm** window and D7Q57 the Rayleigh `1/λ⁴` mechanism | Add the 850 nm row and the Rayleigh coefficient |
| 10 | Nyquist criterion → capacity | `03_…` §7 gives `R_s = 1/T_s ≤ 2B` and an M-ary bit/symbol table, but no capacity law | D8Q38 (3 kHz, 8 levels) needs `C = 2B log2 M`; D8Q1 states it as Hartley's Law | Add the noiseless-capacity formula in §15 and cross-link from §7 |
| 11 | Image rejection ratio | `02_…` §13 gives `IRR = √(1+Q²ρ²)` and, under "Dual-conversion receiver", "*total IRR = IRR_1·IRR_2*" | D9Q72 cascades **two tuned circuits before the mixer** (Q = 75 each, fs = 100.1 MHz, fIF = 10.7 MHz) and expects **58.6 dB** — i.e. `10log10(IRR²)` | Generalise the product rule from "dual conversion" to "n cascaded selective stages" |
| 12 | Receiver sensitivity | `02_…` §14 — `Sensitivity (dBm) = −174 + NF + 10log10 B + SNR_min` | D8Q42 and D6Q18 ask *why* narrowing the IF improves sensitivity — the answer requires $B$ to be the **noise bandwidth** `Bn`, which the vault never defines (gap 3.1 #1) | Cross-link §14 to the new noise-bandwidth topic |
| 13 | Antenna arrays | `06_…` §4 gives Yagi element spacing and `D ≈ 4π/ΩA`; there is no array-factor or taper rule | D4Q9 (taper ⇒ lower sidelobes), D9Q65, D2Q49, D9Q35 | Add an array-factor / taper / beam-steering note |
| 14 | Monopole impedance | `06_…` §4 gives `R_r = 73/2 = 36.5 Ω` for a λ/4 monopole over a perfect ground | D6Q34 needs the sloping-radial variant (≈50 Ω) | Append the sloping-radial fact |
| 15 | Parallel-wire line "distortionless" check | `05_…` §3 gives the Heaviside condition `R/L = G/C` | D9Q72-style items aside, this is fine; but D7Q52 needs the εr-dependent impedance that §1 never provides (gap 3.1 #3) | See fix #2 |
| 16 | Antenna "gain vs isotropic" wording | `06_…` §1 table gives `G_dBd` and "0 dBd = 2.15 dBi" | D1Q32 ("theoretical gain of an isotropic radiator" = 0 dB / unity) and D7Q23 | Already derivable — add an explicit "isotropic ⇒ 0 dBi" bullet |

---

## 5. Over-coverage

Vault topics carrying no (or ≤2) corpus items — they cost space but no board points here:

- `02_Principles_of_Communications.md` §11 **Pre-Emphasis and De-Emphasis** — 0 corpus matches for "pre-emphasis/de-emphasis".
- `02_Principles_of_Communications.md` §4 **VSB and AM Variants Comparison** — 0 corpus matches for "vestigial/VSB".
- `03_Digital_Communications.md` §5 **Adaptive DM (ADM)** — 0 matches; only fixed-step DM is examined (D1Q3, D8Q54, D8Q56).
- `06_Antenna_Systems_and_Propagation.md` §12 **Television Systems and ISDB-T** — 0 matches for "ISDB/NTSC/PAL"; only 2 broadcast-adjacent items (D7Q53 CATV uses FDM, D6Q40).
- `06_Antenna_Systems_and_Propagation.md` §11 **Radar Range Equation, PRF, Doppler** — radar appears in exactly 1 item (D8Q87, the trivial `R = cΔt/2`); σ, PRF and Doppler shift are never examined.
- `01_Signals_Spectra_and_Noise.md` §9 **Anti-Aliasing Filters** (Butterworth minimum order, Chebyshev/elliptic tables) — 0 matches for "anti-alias/Butterworth/Chebyshev".
- `01_Signals_Spectra_and_Noise.md` §10 **DFT and FFT** (window table, FFT cost) — the corpus tests the Z-transform, not the DFT/FFT.
- `05_Transmission_Lines_and_Waveguides.md` §9 **Standard rectangular guide (WR) table** — no item selects a guide from the table; only `fc = c/2a` is used (D1Q56).
- `04_Data_Communications_and_Networking.md` §15 **WDM/DWDM band table (O/E/S/C/L/U)** — WDM items are conceptual (D1Q37, D8Q4, D6Q66).
- `04_Data_Communications_and_Networking.md` §19 **2G–5G generation table** — only D4Q73 (adaptive QAM) touches it.
- `03_Digital_Communications.md` §12 **Union-bound / nearest-neighbour BER table** — no corpus item uses the union bound.
- `03_Digital_Communications.md` §8 **Equalizer taxonomy (ZF/MMSE/DFE/LMS)** — only D2Q16 touches equalisation, qualitatively.

For consistency: the brief asked about **Huffman** coding — neither the vault nor the corpus contains it (0 matches in both). It is not a gap.

---

## 6. Top 15 edits to make, ranked by likely board-point value

1. **Add a Noise-Bandwidth topic** to `01_Signals_Spectra_and_Noise.md` (§9 or new §13): `Bn = (π/2)B3dB ≈ 1.57 B3dB` and tuned-circuit `Bn = 1/(RC)` — 2 direct numeric items, plus it unlocks the sensitivity items.
2. **Add the coax/twin-lead impedance forms** `138/√εr·log10(D/d)` and `276/√εr·log10(2D/d)` with εr for PE and PVC to `05_Transmission_Lines_and_Waveguides.md` §1 — 2 direct numeric items plus all line-design reasoning.
3. **Add `C = 2B log2 M` (Hartley/Nyquist noiseless capacity)** to `03_Digital_Communications.md` §15 and cross-link from §7 — 4 items (D8Q1, D8Q38, D1Q99, D2Q79).
4. **Add the Friis cascade in noise-factor form** `F = F1 + (F2−1)/G1 + …` as a display formula in `01_Signals_Spectra_and_Noise.md` §6 — 4 items plus it reinforces the whole receiver-noise cluster.
5. **Create the industrial/instrumentation topic** (4–20 mA scaling, Seebeck, PLC scan cycle, ladder symbols, SCADA/HMI, HVAC/DALI, PID, obscuration) — the single largest wholly-missing cluster at ~29 items.
6. **Add a Network Topologies topic** to `04_Data_Communications_and_Networking.md` (bus/star/ring/mesh, `L = N(N−1)/2`, terminators, single point of failure, STP) — ~14 items including one numeric mesh calculation (D8Q41).
7. **Add the AM current-relation formula** `It = Ic√(1+m²/2)` to `02_Principles_of_Communications.md` §2, plus multi-tone `mt` and `Pt = Pc(1+mt²/2)` — 3+ items.
8. **Add the FM multi-tone deviation `Δf = Σβifi` and the frequency-multiplier rule (×N on both fc and Δf)** to `02_Principles_of_Communications.md` §5/§7 — 3 items.
9. **Add a horn + helix antenna block** (`θE ≈ 56λ/dE`, `θH ≈ 67λ/dH`; helix `C ≈ λ`, `S ≈ 0.25λ`) to `06_Antenna_Systems_and_Propagation.md` §4–§5 — 3 numeric items (D6Q35, D4Q77, D2Q64).
10. **Add the Poynting vector** `S = E×H = E²/377` to `06_Antenna_Systems_and_Propagation.md` §1 — 4 items.
11. **Add ISDN (BRI `2B+D` = 144 kbit/s, PRI `23B+D`) and ATM (53-byte cell, 48/53 = 90.6 % efficiency)** to `04_Data_Communications_and_Networking.md` §8/§14 — ~6 items.
12. **Add a Network Security topic** (RSA/PKI, hashing, Diffie-Hellman MITM, VPN policy, password-space combinatorics) to `04_Data_Communications_and_Networking.md` — ~10–16 items.
13. **Add array-factor / taper / beam-steering and the polarization loss factor `PLF = cos²θ`** to `06_Antenna_Systems_and_Propagation.md` §1/§4 — ~6 items.
14. **Add signal classification, Fourier symmetry (`even ⇒ bn = 0`, `odd ⇒ imaginary spectrum`) and `E_{f(at)} = E_{f(t)}/a`** to `01_Signals_Spectra_and_Noise.md` §1 — 5 items.
15. **Add the z-plane zero-placement rule (zero at `z = 1` blocks DC) and the ROC statement** to `01_Signals_Spectra_and_Noise.md` §11/§12, plus a voice-band/dB-reference note (600 Ω) — 4–6 items.

---

## 7. Verdict

This vault is a genuinely strong, correct reference for the **communications core** of this corpus — angle modulation, PCM/quantization, digital modulation and BER, line coding, ISI, Shannon, VSWR/Smith-chart/stubs, waveguide modes and velocities, Friis/FSPL, ionospheric propagation and fiber NA/V are all stated accurately and match the exam's own `P3_FORMULAS` sheet. It is nevertheless **not adequate on its own**: roughly **80–85 %** of the ~702 examined items are answerable from it, but the residual is concentrated in a few hard holes rather than spread thin.

Two structural failures dominate. First, an **entire examined subject is absent**: industrial automation, instrumentation, BMS and life-safety accounts for ~29 questions (4–20 mA loops, Seebeck/thermocouples, PLC scan cycles, ladder logic, SCADA/HMI, HVAC/DALI, PID, smoke obscuration) and no vault file mentions any of it. Second, the vault omits several **standard engineering forms that the corpus asks for directly rather than derivably** — the 138/276 `log10` coaxial/twin-lead impedance formulas, the tuned-circuit noise bandwidth `Bn = (π/2)B3dB = 1/(RC)`, Hartley's `C = 2B log2 M`, the Friis `F`-cascade, and the horn/helix/array/polarization antenna results — each of which is a cheap two-line fix with immediate numeric pay-off. Beyond those, `04_…` is missing topologies, ATM, ISDN channel structure and network security, which together account for another ~30 items. The single biggest hole is the **missing industrial/instrumentation subject**; the highest-value per-line fixes are the noise-bandwidth and transmission-line impedance formulas.
