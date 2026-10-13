# ELECS corpus vs Electronics_Engineering vault — coverage audit

Audit of the 10-file vault at `C:\Users\Admin\Desktop\Formula\Electronics_Engineering\` against
`PB FINAL ELECS-merged` (186 pp, 9 sub-reviewers) and its own P2/P3/P4/P5 sections.

---

## 1. Corpus summary

| Property | Value |
|---|---|
| Source PDF | `PB FINAL ELECS-merged.pdf`, 186 pages |
| Question blocks extracted | **552** (task estimate ~540) |
| Sub-reviewers / DOC groups | **9** — DOC1 (100), DOC2 (100), DOC3 (100), DOC4 (21), DOC5 (28), DOC6 (3), DOC7 (2), DOC8 (98), DOC9 (100) |
| Own formula sheet | `PB FINAL ELECS-merged.P3_FORMULAS.txt` — 3 concatenated tables + 8 per-set tables |
| Own terms sheet | `PB FINAL ELECS-merged.P2_TERMS.txt` — 4 sections: DC/AC, Devices, Digital/µP, **Control Systems & Industrial Automation** |
| Own traps/cram | `P4_TRAPS.txt` (100-row topic-tagged key) + `P5_CRAM.txt` (large, skimmed) |

**Topic clusters observed (approximate question counts; blocks overlap when a question tests two areas):**

| # | Cluster | ≈ Q | Vault home |
|---|---|---|---|
| 1 | DC circuits, network theorems, transients | 110 | 01, 03 |
| 2 | Semiconductor devices, rectifiers, waveshaping, thyristors, opto | 85 | 04 |
| 3 | Logic / digital / FSM / ASM / hazards | 75 | 08 |
| 4 | AC, resonance, 3-phase, power factor | 70 | 02 |
| 5 | Amplifiers, biasing, feedback, oscillators, frequency response | 70 | 05 |
| 6 | Microprocessors, memory, DMA, timers, serial, assembly | 55 | 09 |
| 7 | **Control systems (Routh, root locus, Nyquist, margins, ζ/%OS, error constants, Mason, state space, PID)** | **40** | — none — |
| 8 | **Electromagnetics, magnetic circuits, transmission lines** | **30** | — none — |
| 9 | Op-amp / mixed-signal (ADC, DAC, filters) | 30 | 07 |
| 10 | Industrial automation, sensors, instrumentation, BMS/AV | 25 | 07 (partial) |
| 11 | Two-port networks | 20 | 03 |
| 12 | Power electronics converters, VFD | 15 | 06 |

Cluster 7 and cluster 8 are the corpus's `Control Systems` and `Electromagnetics` topic tags in
`P4_TRAPS.txt` (e.g. rows 8, 17, 27, 34, 61, 77, 88, 99 / rows 30, 55, 56, 59, 63, 79, 80, 92) —
both are wholly absent from the vault.

---

## 2. Coverage scorecard

| Vault file | Topics in vault | Examined clusters it covers | Verdict |
|---|---|---|---|
| `00_Index.md` | MOC, 114 topics claimed | — | **Adequate as MOC**; its "high-yield" list omits control systems and electromagnetics entirely |
| `01_DC_Circuits.md` | 12 | Clusters 1 (VDR/CDR, KCL/KVL, Δ-Y, mesh/nodal, superposition, Thévenin/Norton, max power, Millman, Tellegen, RC/RL transient, RLC 2nd-order) | **Strong**; missing equation-count rules, inductive/coupled-coil magnetics, wire R(T) |
| `02_AC_Circuits.md` | 10 | Cluster 4 (phasors, Z/Y, resonance, PQS, pf correction, 3-phase, two-wattmeter) | **Strong**; missing transmission-line Z₀, L-section matching, octave conversion |
| `03_Two_Port_Networks.md` | 9 | Cluster 11 (Z/Y/h/ABCD, conversion, reciprocity/symmetry, interconnections, termination) | **Strong**; g-parameters and T/Π synthesis never exercised |
| `04_Semiconductor_Devices.md` | 15 | Cluster 2 (physics, PN, diode models, rectifiers, ripple/PIV, clippers/clampers, multipliers, Zener, BJT, JFET, MOSFET, thyristors, opto, special diodes) | **Strong**; missing circuit-level blocks (current mirrors), clamper V_γ level, thermal-runaway naming |
| `05_Circuit_Analysis_and_Design.md` | 17 | Cluster 5 (biasing, load lines, stability factors, small-signal, hybrid-π, FET amps, multistage, Darlington, Bode, Miller, GBW, feedback, power amps, oscillators) | **Strong**; missing unbypassed-emitter CE gain, current mirrors, control-system-adjacent items |
| `06_Power_Electronics_and_Systems.md` | 9 | Switch losses, thermal, SCR phase control, DC-DC, inverters, PWM, linear regulators | **Adequate**; converters/L_min/C_min are over-covered vs corpus; GTO turn-off detail absent |
| `07_Industrial_Automation_and_Sensors.md` | 16 | Cluster 9 + most of 10 (op-amps, filters, sensors, ADC/DAC, PLC, ladder/timers) | **Strong but blind to instrumentation and BMS**: no voltmeter multiplier, ammeter shunt, pot resolution, humidity sensor, KNX/DMX/Modbus/SCADA/HVAC/VFD |
| `08_Logic_Circuits_and_Switching.md` | 16 | Cluster 3 (bases, codes, Boolean, K-map, adders, encoders/MUX, FFs, timing, shift regs, counters, FSM, ASM, families) | **Strong**; hazards/races, Boolean-function count, flash-comparator count, majority gate absent |
| `09_Microprocessors_and_Embedded.md` | 10 | Cluster 6 (CPU/bus/memory, cache, decode, cycles, pipeline, addressing, interrupts, DMA, GPIO/timer, serial) | **Strong**; MMU, PLL, watchdog-reset, stack push/pop semantics, LIFO, assembly directives/mnemonics absent |

---

## 3. MISSING items

### 3.1 Formula-level gaps

| # | Examined formula / law | Where it is tested | Evidence it is absent from the vault | Suggested vault home |
|---|---|---|---|---|
| 1 | Faraday's law $\lvert E\rvert = N\,d\Phi/dt = NA\,dB/dt$ | DOC1 Q56, Q63, Q79; DOC3 Q40 (`E = A·dB/dt`) | `grep -i "faraday"` over the vault: **0 matches**. `01_DC_Circuits.md ### 10` has only $W_L=\tfrac12Li^2$ and $\lambda$ | new `###` in 01 Part B (Magnetics) |
| 2 | Magnetomotive force, reluctance $R=\ell/\mu_0\mu_rA$ | DOC1 Q92 (198,943 A·t/Wb); DOC9 Q38 | 0 matches for `reluctance`, `magnetomotive`, `permeability`, `tesla`, `weber`. `01_DC_Circuits.md ### 9` stops at Tellegen | 01 Part B, new `### Magnetic Circuits` |
| 3 | Hopkinson's law $\mathcal F=NI=\Phi R$; flux density $B=\Phi/A$ | DOC3 Q90 (2.0 mWb); DOC3 Q61 (4.0 T) | 0 matches for `Hopkinson`, `flux density` | same as #2 |
| 4 | Mutual inductance $M=k\sqrt{L_1L_2}$; coupling coefficient $k$ | DOC1 Q55 (3.0 H); DOC8 Q30, Q50 (k max = 1) | 0 matches for `mutual induct`, `coupling` outside 05's "coupling capacitors". `01_DC_Circuits.md ### 10` has no $M$ | 01 Part B, new `### Mutual Inductance` |
| 5 | Coupled-coil energy $W=\tfrac12L_1i_1^2+\tfrac12L_2i_2^2\pm Mi_1i_2$ | DOC9 Q59 (1.4 J) | 0 matches; `### 10` gives only the isolated energy terms | 01 Part B |
| 6 | Ampere's circuital law $\oint H\cdot dl=I_{enc}$; $H=I/2\pi r$ | DOC2 Q18; DOC3 Q35; DOC5 Q29 | 0 matches for `ampere` (case-insensitive) except the unit word; no $H$ field anywhere | 01 Part B or new EM note |
| 7 | Biot–Savart $d\vec B=\frac{\mu_0I}{4\pi}\frac{d\vec\ell\times\hat a_r}{r^2}$ | DOC1 Q59; DOC3 Q73 | 0 matches for `Biot` | new EM note |
| 8 | Gauss's law for electricity $\nabla\!\cdot\!D=\rho_v$ and for magnetism $\nabla\!\cdot\!B=0$ | DOC3 Q75, Q86; DOC5 Q19; DOC8 Q61 | 0 matches for `Gauss`, `Maxwell`, `charge density` | new EM note |
| 9 | Displacement current $I_d=A\,dD/dt$ | DOC8 Q7; DOC8 Q54; DOC9 Q95 | 0 matches for `displacement current` | new EM note |
| 10 | Poynting vector $\vec S=\vec E\times\vec H$, $S_{avg}=E_m^2/2\eta_0$, $\eta_0=377\ \Omega$ | DOC2 Q67; DOC9 Q24 (13.3 W/m²) | 0 matches for `Poynting`, `377`, `free space`, `permittivity` | new EM note |
| 11 | Boundary condition $E_{t1}=E_{t2}$ | DOC1 Q80 | 0 matches for `boundar`; no EM at all | new EM note |
| 12 | Hysteresis loss $W_h=\oint B\,dH$ (J/m³·cycle) | DOC1 Q30; DOC5 Q11; DOC8 Q90 | 0 matches for `hysteresis` | new EM note |
| 13 | Motional EMF $e=BLv\sin\theta$ | DOC8 Q67 (75 mA) | 0 matches; no motional-EMF form | new EM note |
| 14 | Magnetic vector potential $B=\nabla\times A$ | DOC8 Q22 | 0 matches | new EM note |
| 15 | $E=-\nabla V$ | DOC9 Q3 | not present; 01 §1 has only static $V=IR$ relations | new EM note |
| 16 | Characteristic impedance of a lossless line $Z_0=\sqrt{L/C}$ | DOC2 Q8 (200 Ω); DOC1 Q64 (matching) | 0 matches for `characteristic impedance`, `transmission line` | 02 Part B, new `### Transmission Lines` |
| 17 | Wave velocity $v=c/\sqrt{\varepsilon_r\mu_r}$ | DOC3 Q69 ($\varepsilon_r=4$) | 0 matches for `velocity`, `permittivity` | 02 Part B |
| 18 | Routh–Hurwitz first-column sign-change test | DOC1 Q34; DOC8 Q35; DOC9 Q19 (K = 240) | 0 matches for `Routh` | new `10_Control_Systems.md` |
| 19 | Root locus: branches start at open-loop poles; RHP crossing ⇒ instability | DOC1 Q8; DOC2 Q75; DOC6 Q3 | 0 matches for `root locus` | new control-systems note |
| 20 | Nyquist criterion, $N=Z-P$ | DOC2 Q56; DOC3 Q37 | 0 matches for `Nyquist` outside `09`'s *sampling* Nyquist (line 332) | new control-systems note |
| 21 | Gain margin / phase margin, gain- and phase-crossover | DOC1 Q61; DOC2 Q21; DOC9 Q25 | 0 matches for `gain margin`, `phase margin`, `crossover` | new control-systems note |
| 22 | Percent overshoot $\%OS=100e^{-\zeta\pi/\sqrt{1-\zeta^2}}$ | DOC1 Q99 (16.3%) | 0 matches for `overshoot` except 07 §8's "Q > 0.707 gives overshoot" (qualitative) | new control-systems note |
| 23 | 2 % settling time $T_s=4/\zeta\omega_n$ (and 5 % → $3/\zeta\omega_n$) | DOC9 Q17 (0.8 s) | 0 matches for `settling time` outside `07 ### 14` DAC settling | new control-systems note |
| 24 | Damping ratio from coefficients $\zeta=a_1/(2\sqrt{a_0})$ | DOC1 Q77 (0.50); DOC3 Q41 (0.8); DOC8 Q69 | `01_DC_Circuits.md ### 12` gives only $\zeta=\alpha/\omega_0$; no $a_1,a_0$ coefficient form | new control-systems note |
| 25 | Steady-state error constants $K_p,K_v,K_a$; $e_{ss}=1/K_v$ for Type 1 ramp | DOC1 Q88; DOC2 Q57; DOC3 Q94; DOC9 Q62, Q70 | 0 matches for `steady-state error`, `type 0/1/2` | new control-systems note |
| 26 | Closed-loop transfer function $G/(1+GH)$; cascade $\prod G_i$ | DOC1 Q17; DOC3 Q60; DOC5 Q1; DOC9 Q27 | 0 matches for `closed-loop transfer`, `block diagram`, `open-loop transfer` | new control-systems note |
| 27 | Mason's gain formula $T=\frac{1}{\Delta}\sum P_k\Delta_k$ | DOC8 Q42 | 0 matches for `Mason` | new control-systems note |
| 28 | State-space $\dot x=Ax+Bu$, $G(s)=C(sI-A)^{-1}B+D$, $\det(sI-A)=0$ | DOC1 Q27; DOC8 Q78 | 0 matches for `state-space` | new control-systems note |
| 29 | PID terms; integral term kills steady-state error | DOC2 Q52; DOC8 Q6 (PD raises noise) | 0 matches for `PID`, `integral term` | new control-systems note |
| 30 | Voltmeter multiplier $R_s=V_{max}/I_m-R_m$ | DOC3 Q66 (9,950 Ω) | 0 matches for `voltmeter`, `multiplier resistance` | `07 ### 17 Measurements` |
| 31 | Ammeter shunt $R_{sh}=I_mR_m/(I_{total}-I_m)$ | DOC3 Q98 (1.01 Ω) | 0 matches for `ammeter`, `shunt` (only Zener *shunt regulator*, 04 §8) | `07 ### 17 Measurements` |
| 32 | Potentiometer resolution $=V_{total}/\text{turns}$ | DOC3 Q43 (1.0 V/turn) | Potentiometer appears only as a row in `07 ### 11`'s sensor table (line 385) — no formula | `07 ### 11` |
| 33 | Resistor/wire $R=\rho L/A$ and $R_2=R_1[1+\alpha(T_2-T_1)]$ | DOC5 Q49, Q95 | 0 matches for `resistivity`, `temperature coefficient` (only 04 §3's *diode* tempco) | `01 ### 1` |
| 34 | Flash ADC comparators $N_c=2^n-1$ | DOC8 Q73 (255 for 8-bit) | `07 ### 13` gives SAR `comparison steps = n` only; no $2^n-1$ anywhere | `07 ### 13` |
| 35 | Distinct Boolean functions $N=2^{2^n}$ | DOC8 Q18 (65,536 for n = 4) | `08 ### 5` gives only $2^n$ minterms/maxterms (line 202) | `08 ### 5` |
| 36 | L-section matching $Q=\sqrt{R_{high}/R_{low}-1}$ | DOC3 Q78 (1.73) | 0 matches for `matching network`, `L-section` | `02 ### 11` |
| 37 | Mesh equation count $m=B-N+1$; node equation count | DOC1 Q2; DOC2 Q35 | `01 ### 4` gives the mesh matrix but no $B-N+1$; `01 ### 5` no $N-1$ rule | `01 ### 4`/`### 5` |
| 38 | Majority gate $F=AB+BC+AC$ | DOC9 Q74 | 0 matches for `majority` | `08 ### 7` |
| 39 | VFD affinity laws $P\propto N^3$ | DOC9 Q67 (48.8 %) | 0 matches for `affinity` | `06` or `07` |
| 40 | HVAC sensible heat $\text{CFM}=Q_s/(1.08\,\Delta T)$ | DOC3 Q44 (1,000 CFM) | 0 matches for `HVAC`, `CFM` | `07` |
| 41 | 70 V distributed-line amplifier sizing with headroom | DOC3 Q32 (72 W) | 0 matches for `speaker`, `headroom` | `07` |
| 42 | Inductor s-domain impedance $sL$ (zero IC) | DOC3 Q26 | `03 ### 1` mentions $\mathbf Z(s)$ generically; no element $s$-domain table | `01 ### 10` |
| 43 | Octave frequency scaling (2× per octave) | DOC3 Q82 (500 Hz → 2 kHz) | 0 matches for `octave` | `05 ### 11` |
| 44 | Free-space constant $\mu_0=4\pi\times10^{-7}$ H/m | DOC2 Q81 | 0 matches | EM note |

### 3.2 Concept-level gaps

| # | Examined concept | Q numbers | Suggested vault home |
|---|---|---|---|
| 1 | Static-1/static-0 **logic hazard** and its elimination by *adding* consensus terms | DOC1 Q89; DOC9 Q35, Q99, Q55; DOC8 Q10 | `08 ### 4` (add a hazards block) |
| 2 | **Race condition / critical race** in asynchronous logic; primitive flow table **stable state** | DOC2 Q50; DOC3 Q47, Q71; DOC8 Q10, Q71 | `08 ### 14`/new `### Asynchronous Sequential` |
| 3 | Frequency **octave** as a 2× ratio | DOC3 Q82 | `05 ### 11` |
| 4 | **Thermal runaway** as a named positive-feedback failure mechanism | DOC8 Q49 | `05 ### 3` |
| 5 | **Current mirror** operation and **Widlar / Wilson** variants | DOC1 Q85; DOC5 Q6, Q14; DOC8 Q14; DOC9 Q53 | `05 ### 18` |
| 6 | **MMU** virtual→physical translation | DOC8 Q40 | `09 ### 2` |
| 7 | **PLL** clock multiplier (fast core, slow bus) | DOC2 Q85 | `09 ### 4` |
| 8 | **Watchdog timer** forcing a reset of hung MCU software | DOC2 Q88; DOC3 Q88 | `09` (07 §15 covers only the PLC scan watchdog, line 512) |
| 9 | **Stack semantics**: LIFO; descending stack; CALL pushes 2-byte return address | DOC2 Q60, Q76 | `09 ### 2` (SP listed, no push/pop behaviour) |
| 10 | **Assembly directives/mnemonics**: `ORG`, `DAS`, `MOV`, `MOV AL,[1000h]` direct | DOC5 Q2, Q16; DOC8 Q20, Q66; DOC3 Q23 | `09 ### 5` |
| 11 | **Memory hierarchy** ranking (registers < cache < DRAM < flash) | DOC8 Q81; DOC9 Q100 | `09 ### 3` |
| 12 | `CMP` sets Carry on borrow, resets Zero when A < B (8085) | DOC8 Q65 | `09 ### 2` |
| 13 | **Interrupt vector table** as the ISR-address source | DOC1 Q69 | `09 ### 6` |
| 14 | **Von Neumann vs Harvard** (named) | DOC1 Q40; DOC3 Q99; terms §2.3 | `09 ### 1` |
| 15 | **Memory-mapped I/O** (named) and program- vs interrupt-driven I/O | DOC2 Q87; DOC3 Q57; DOC9 Q40 | `09 ### 2` |
| 16 | **Data hazard** as a named pipeline dependency | DOC3 Q56; DOC9 Q76 | `09 ### 4` |
| 17 | **VHDL concurrency** execution model | DOC5 Q9 | `08` or `09` (new) |
| 18 | **Arduino `pinMode()`** API | DOC4 Q3 | `09 ### 8` |
| 19 | **Building/AV integration protocols**: KNX, DMX512, Modbus, SCADA, BACnet, IoT, API | DOC1 Q91; DOC8 Q47, Q83, Q39, Q75; DOC9 Q28, Q68 | `07 ### 17` |
| 20 | **Fail-safe vs fail-secure** door locks (de-energise to open) | DOC1 Q84; DOC1 Q94 (PLC input short diagnostics) | `07 ### 17` |
| 21 | **Humidity sensor** | DOC5 Q15 | `07 ### 9` |
| 22 | **Seebeck effect** named as the thermocouple mechanism | DOC1 Q50; DOC3 Q52 | `07 ### 9` |
| 23 | LED **material** selection (GaAsP for red) | DOC2 Q63 | `04 ### 14` |
| 24 | **Skin effect**, conductivity $\sigma=1/\rho$, dielectric polarisation & loss tangent | DOC2 Q68, Q72; DOC8 Q41; DOC9 Q47 | EM note |
| 25 | **E = −∇V**, equipotential surfaces, field lines of a point charge | DOC2 Q24; DOC9 Q3, Q80 | EM note |
| 26 | **Mechanical/thermal system analogy** (spring stores potential energy) | DOC8 Q17 | `07` or control-systems note |
| 27 | Laplace-transform rationale / impulse response of an LTI system | DOC4 Q1; DOC8 Q45 | control-systems note |

---

## 4. PARTIAL / incorrect coverage

| # | Item | What the vault says | What the exam needs | Fix |
|---|---|---|---|---|
| 1 | **Unbypassed emitter resistor** | `05_Circuit_Analysis_and_Design.md ### 6. Small-Signal re Model: CE, CB, CC` gives only the bypassed CE gain $A_v=-\frac{R_C\parallel R_L}{r_e}$ (line 191). The unbypassed form appears only for the *FET* ($A_v=-\frac{R_D\parallel R_L}{1/g_m+R_S\parallel R_D}$, §8 line 250) | DOC1 Q19 and DOC3 Q72 ask what removing the CE emitter bypass capacitor does: **midband gain falls and the lower cutoff moves**. Needs $A_v=-\frac{R_C\parallel R_L}{r_e+R_E}$ | add the unbypassed CE gain + bypass-removal effect to `05 ### 6` |
| 2 | **Consensus theorem framing** | `08_Logic_Circuits_and_Switching.md ### 4` states $AB+\bar AC+BC=AB+\bar AC$ and its **Conditions** line (165) says "the consensus theorem **removes a redundant term**" | DOC9 Q35/Q99, DOC1 Q89 require **adding** $BC$ to kill a static-1 hazard. The identity is present but the vault frames it as deletion, which is the exam's named trap | keep the identity, add a hazard callout in `08 ### 4` |
| 3 | **Clamper levels with a real diode** | `04_Semiconductor_Devices.md ### 7. Clippers, Clampers and Multipliers` gives $v_o=v_i\pm2V_m$ and $v_{o,max}=2V_m$ (lines 248–252), i.e. ideal diodes | DOC3 Q81 (silicon, −5/+5 V square wave) gives +4.3 V — needs $v_{o,peak}=V_m+V_\gamma$ | add the $V_\gamma$-shifted clamp level to `04 ### 7` |
| 4 | **TRIAC full-wave RMS vs firing angle** | `06_Power_Electronics_and_Systems.md ### 3` gives the **half-wave** RMS $V_{rms}=V_m\sqrt{\frac1{2\pi}(\pi-\alpha+\frac{\sin2\alpha}{2})}$ (line 103) | DOC4 Q13 applies the RMS/firing-angle relation to a TRIAC across both half-cycles | state the ωt-integration limits for the full-wave AC controller explicitly |
| 5 | **GTO turn-off** | `06 ### 1` lists GTO drive as "current pulse" and "complex gate drive" (line 40); no turn-off mechanism | DOC2 Q99 requires a **high-magnitude brief reverse gate current** | add the negative-gate-pulse turn-off to `06 ### 1` |
| 6 | **Zener dynamic resistance** | `04 ### 8` has $V_Z=V_{Z0}+I_Zr_Z$ and $r_Z$ | DOC8 Q11 asks which element models output variation with load — answer is the series dynamic resistance. Vault has it but only as a modelling equation, never tied to regulation error | one line in `04 ### 8` |
| 7 | **Cascade bandwidth / dominant corner** | `05 ### 9` gives $f_{2,total}=f_2\sqrt{2^{1/n}-1}$ (line 294); `05 ### 11` gives $BW=f_H-f_L$ | DOC3 Q59 asks conceptually that the **highest** $f_L$ and **lowest** $f_H$ govern; DOC5 Q10 asks the same for $f_L$ | add the "highest low-cutoff / lowest high-cutoff dominates" rule |
| 8 | **SCR latching/holding vs GTO** | `04 ### 13` states $I_L>I_H$ and gate loses control after latch (line 429), which is correct for an SCR | DOC2 Q78 (turn off by dropping $I_A$ below $I_H$) is **covered**; DOC8 Q98 (gate + forward bias to turn on) is **covered** | none — verified, no change |
| 9 | **Miller capacitance sign** | `05 ### 12` gives $C_{in}=C_f(1+\lvert A_v\rvert)$ and `05 ### 7` the same | DOC1 Q96 uses $C_{in}=C_f(1-A_v)$ with $A_v<0$; algebraically identical, so **covered** | none — verified |
| 10 | **Series-resonance Q vs R** | `02 ### 7` gives $Q=\frac1R\sqrt{L/C}$ and $BW=R/L$ | DOC1 Q83, DOC2 Q84 (doubling R doubles BW) and DOC6 Q1 (doubling R, L, C halves Q) are all derivable but require manipulating two formulas the vault states separately | add one worked-ratio callout in `02 ### 7` |
| 11 | **h-parameter justification** | `03 ### 4` lists the h-parameter units and meanings | DOC9 Q30 asks *why* h-parameters are preferred for BJTs (low-impedance current-driven input, high-impedance voltage output) — the mixed-unit note in the **Conditions** line is the closest, but the rationale is not stated | one sentence in `03 ### 4` |
| 12 | **Two-port symmetric condition** | `03 ### 7` gives $z_{11}=z_{22}$, $y_{11}=y_{22}$, $A=D$, $\Delta_h=1$ | DOC9 Q96 asks for "equal diagonal terms in the chosen parameter set" — **covered** | none — verified |
| 13 | **Address-line count from capacity** | `09 ### 3` gives capacity $=2^{n}\times w$ and "remaining lines → chip select" | DOC5 Q93 (90 GB → 37 lines) needs $n=\lceil\log_2(\text{bytes})\rceil$; the inverse is derivable but never stated | add $n=\lceil\log_2 N\rceil$ to `09 ### 3` |
| 14 | **Zener vs Zener-breakdown mechanism** | `04 ### 8` covers regulation; `04 ### 3` gives $V_{BR}\propto1/N$ | DOC2 Q38 asks specifically that sub-5 V Zener breakdown is **quantum tunnelling** (vs avalanche above ~6 V) | add the tunnelling/avalanche split to `04 ### 3` |
| 15 | **Tellegen** | `01 ### 9` gives $\sum v_ki_k=0$ and the power form | DOC3 Q46 and DOC8 Q53 require it as a *topology-only* law holding for any KCL/KVL network — the **Conditions** line says exactly that | none — verified |

---

## 5. Over-coverage

Vault topics this corpus never exercises (candidate pruning / redistribution targets):

- `03_Two_Port_Networks.md ### 4` g-parameter (inverse hybrid) block; `### 3` T/Π equivalent synthesis; `### 9` insertion loss, image/matched conditions; `### 8` Brune test.
- `04_Semiconductor_Devices.md ### 12` body-effect equation; `### 15` varactor tuning-ratio / sensitivity derivation; tunnel-diode figure of merit; `### 14` solar-cell fill-factor and efficiency arithmetic.
- `05_Circuit_Analysis_and_Design.md` — Hartley/Colpitts feedback-fraction formulas, crystal $f_s/f_p$ and $Q$, Clapp; Miller split impedances $Z_1,Z_2$; Darlington output-impedance and $V_{BE}$-stack details beyond $V_{BE}\approx1.4$ V; class-AB/C efficiency numbers; RC phase-shift $f_0=1/2\pi RC\sqrt6$ (no numeric item).
- `06_Power_Electronics_and_Systems.md` — buck/boost/buck-boost $L_{min}$, $C_{min}$, $\Delta I_L$ design equations; inverter THD and harmonic sidebands; PWM $m_f$ sideband table; $Z_{\theta JC}$ derating. The corpus tests phase control, thermal resistance, and device selection, not converter magnetics design.
- `07_Industrial_Automation_and_Sensors.md ### 8` Sallen-Key $Q$/component-ratio design; `### 12` anti-alias filter-order formula; `### 11` absolute-encoder $n=\log_2$ bit sizing; `### 10` quarter-bridge nonlinearity error.
- `08_Logic_Circuits_and_Switching.md` — Excess-3/2421 self-complementing codes, Gray↔binary conversion algorithm, parity, D-flip-flop excitation columns, logic-family noise-margin/fan-out/PDP arithmetic, two's-complement overflow-detection XOR.
- `09_Microprocessors_and_Embedded.md ### 1` Amdahl's law and the full CISC/RISC table; `### 3` DRAM refresh interval; `### 7` arbitration-scheme comparison.
- `01_DC_Circuits.md ### 3` full Wye→Delta algebra (only the balanced $R_\Delta=3R_Y$ case appears).
- `02_AC_Circuits.md ### 1` form-factor/crest-factor waveform table.

---

## 6. Top 12 edits to make, ranked by likely board-point value

1. **Create `10_Control_Systems.md`** (new file) — Routh–Hurwitz, root locus, Nyquist, gain/phase margin, $\zeta$ from coefficients, %OS, settling time, error constants, closed-loop/block algebra, Mason, state space, PID. Recovers ~40 questions (DOC1 Q8/17/27/34/61/77/88/99, DOC2 Q21/29/40/52/56/57/62/75, DOC3 Q37/41/42/60/94/95, DOC8 Q4/6/35/42/69/78/82, DOC9 Q17/19/25/26/27/62/70/72/77).
2. **Create `11_Electromagnetics_and_Magnetic_Circuits.md`** — Maxwell's four equations, Faraday, Ampere, Biot–Savart, $B=\Phi/A$, reluctance, Hopkinson, hysteresis loop area, $E_{t1}=E_{t2}$, $E=-\nabla V$, $B=\nabla\times A$, displacement current, Poynting, $\mu_0$, $\eta_0=377\ \Omega$. Recovers ~30 questions.
3. **Add `### Transmission Lines and Wave Propagation` to `02_AC_Circuits.md`** — $Z_0=\sqrt{L/C}$, $\Gamma$, and $v=c/\sqrt{\varepsilon_r\mu_r}$ (DOC2 Q8, DOC3 Q69).
4. **Add `### 17 Measurements and Instrumentation` to `07_Industrial_Automation_and_Sensors.md`** — $R_s=V_{max}/I_m-R_m$, $R_{sh}=I_mR_m/(I_{tot}-I_m)$, potentiometer V/turn (DOC3 Q43, Q66, Q98).
5. **Add `### Mutual Inductance and Coupled Coils` to `01_DC_Circuits.md`** — $M=k\sqrt{L_1L_2}$, $W=\tfrac12L_1i_1^2+\tfrac12L_2i_2^2+Mi_1i_2$ (DOC1 Q55, DOC9 Q59, DOC8 Q30/Q50).
6. **Add wire resistance and temperature correction to `01_DC_Circuits.md ### 1`** — $R=\rho L/A$, $R_2=R_1[1+\alpha(T_2-T_1)]$ (DOC5 Q49, Q95, DOC2 Q28).
7. **Add `### 18 Current Mirrors` to `05_Circuit_Analysis_and_Design.md`** — basic mirror, Widlar (µA with small R), Wilson (base-current error, output impedance) (DOC1 Q85, DOC5 Q6/Q14, DOC8 Q14, DOC9 Q53).
8. **Add `### 11 Impedance Matching (L-Section)` to `02_AC_Circuits.md`** — $Q=\sqrt{R_{hi}/R_{lo}-1}$ and resonance matching (DOC3 Q78, DOC1 Q64).
9. **Add `### Asynchronous Logic, Hazards and Races` to `08_Logic_Circuits_and_Switching.md`** — static-0/1 hazard, consensus-term **addition**, critical race, primitive flow table stable state (DOC1 Q89, DOC2 Q50, DOC3 Q47/Q71, DOC8 Q10/Q71, DOC9 Q35/Q55/Q99).
10. **Add the missing counts to `08 ### 5` and `07 ### 13`** — distinct Boolean functions $N=2^{2^n}$, flash-ADC comparators $N_c=2^n-1$ (DOC8 Q18, Q73).
11. **Add `### 17 Building, AV and Industrial Integration` to `07_Industrial_Automation_and_Sensors.md`** — KNX/DMX512/Modbus/SCADA/BACnet/IoT/API naming, fail-safe door locks, 70 V distributed audio headroom, HVAC sensible-heat CFM, VFD affinity laws $P\propto N^3$, humidity sensor (≈14 concept questions).
12. **Patch three small formula gaps**: unbypassed-emitter CE gain $A_v=-(R_C\parallel R_L)/(r_e+R_E)$ in `05 ### 6`; $n=\lceil\log_2 N\rceil$ address lines in `09 ### 3`; $v_{o,peak}=V_m+V_\gamma$ in `04 ### 7`.

---

## 7. Verdict

The vault is **strong where it is strong and blind in two whole subjects**. For clusters 1–6 and 9–11
(DC/AC/networks, devices, amplifiers, logic, microprocessors, power electronics, two-ports, op-amps
and sensors) it states essentially every formula the corpus needs, correctly, and its
**Conditions**/**Exam trap** lines repeatedly pre-empt the corpus's own P4 traps — this is genuine,
high-quality coverage of roughly **340 of 552 questions**.

Against the full corpus it is **not adequate**: roughly **60 % of distinct examined concepts are
fully covered, ~75 % at least partially**, and the residue is not scattered trivia but two entire
named subjects. The corpus's own `P2_TERMS.txt` §2.4 (Control Systems) and its `P4_TRAPS.txt` topic
tags `ControlSystems/*`, `Electromagnetics/*`, `MagneticCircuits/*`, `Instrumentation/*`,
`PowerSystems/*` and `RF Circuits/Matching Networks` map onto **nothing** in the vault — no Routh,
no root locus, no Nyquist, no margins, no error constants, no Maxwell, no Faraday, no reluctance, no
mutual inductance, no transmission line, no meters.

**Single biggest hole:** the complete absence of **control systems (~40 questions)**, just ahead of
**electromagnetics and magnetic circuits (~30 questions)**. Adding those two notes plus the
transmission-line, instrumentation and matching-network sections (items 1–4 of §6) would lift
coverage from ~60 % to roughly **90 %** of examined concepts with no change to the existing nine files.
