---
title: "Power Electronics and Systems — Drill"
type: drill
area: 06_Power_Electronics_and_Systems
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 45
updated: 2026-09-23
---

# Power Electronics and Systems — Practice Drill

**8 problems** drawn from a pool of 45 across 9 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 06_Power_Electronics_and_Systems --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A full bridge with $V_{dc} = 300\ \mathrm{V}$ uses sinusoidal PWM with $m_a = 0.8$, $m_f = 21$ and a 60 Hz reference. Find the carrier frequency, the fundamental peak and rms, the lowest harmonic sidebands and check that the inverter is in the linear region.

**Given:** V_dc = 300 V; m_a = 0.8; m_f = 21; f_m = 60 Hz; carrier peak = m_a reference

> [!success]- Answer
> **$f_c = 1260\ \mathrm{Hz}$, $V_{o1,peak} = 240\ \mathrm{V}$, $V_{o1,rms} = 169.7\ \mathrm{V}$, first sidebands at 1200 Hz and 1320 Hz.**

> [!warning] Trap
> Reporting $V_{o1,rms} = m_a V_{dc} = 240\ \mathrm{V}$ by forgetting the $\sqrt{2}$. The 240 V is a peak; the rms is 169.7 V, so the lazy answer oversizes the 60 Hz output by 41%.

<sub>from ECE-06-07</sub>

### 2. A single-phase half-wave controlled rectifier must deliver $V_{o,avg}=60\ \mathrm{V}$ to a resistive load from a $230\ \mathrm{V}$ rms, 50 Hz supply. Find the required firing angle and the extinction angle if the load becomes inductive and the current stays continuous.

**Given:** V_s,rms = 230 V; V_o,avg required = 60 V; R_L resistive (then inductive)

> [!success]- Answer
> **$\alpha\approx80.9^\circ$; extinction stays at $180^\circ$ for a resistive load but moves past it for an inductive one, which lowers the delivered average.**

> [!warning] Trap
> Solving for $\alpha$ in radians and reporting $1.41$ instead of $80.9^\circ$, or forgetting to double-check the answer against the uncontrolled value $V_m/\pi=103.5\ \mathrm{V}$ — a firing angle of $80.9^\circ$ should give roughly 58 percent of full output, and $60/103.5=0.58$ confirms it.

<sub>from ECE-06-03</sub>

### 3. A MOSFET switches $V_{ds} = 300\ \mathrm{V}$ at $I_o = 10\ \mathrm{A}$ with $t_r = 100\ \mathrm{ns}$ and $t_f = 150\ \mathrm{ns}$ at $f_s = 20\ \mathrm{kHz}$; its gate charge is $Q_g = 60\ \mathrm{nC}$ driven from 12 V, and $R_{DS(on)} = 0.1\ \Omega$ at $D = 0.5$. Find the switching loss, the gate-drive power and the conduction loss.

**Given:** V_ds = 300 V; I_o = 10 A; t_r = 100 ns; t_f = 150 ns; f_s = 20 kHz; Q_g = 60 nC; V_gs = 12 V; R_DS(on) = 0.1 ohm; D = 0.5

> [!success]- Answer
> **$P_{sw} = 7.50\ \mathrm{W}$ ($E_{sw} = 375\ \mu\mathrm{J}$ per cycle), $P_g = 14.4\ \mathrm{mW}$, conduction $5.00\ \mathrm{W}$, total about $12.5\ \mathrm{W}$.**

> [!warning] Trap
> Dropping the factor 1/2 or using the wrong frequency. Without the 1/2 the answer doubles to 15.0 W, and substituting the 60 Hz output frequency for $f_s = 20\ \mathrm{kHz}$ gives 22.5 mW - both mistakes make a thermally impossible design look comfortable.

<sub>from ECE-06-08</sub>

### 4. A full bridge with $V_{dc} = 200\ \mathrm{V}$ is driven by single-pulse PWM with a 120-degree pulse in each half cycle (total width $2d = 120^\circ$). Find the fundamental peak and rms and the 3rd and 5th harmonic amplitudes.

**Given:** V_dc = 200 V; single-pulse PWM; pulse width 2d = 120 deg per half cycle; f_out = 60 Hz

> [!success]- Answer
> **$V_{1,peak} = 220.5\ \mathrm{V}$ ($V_{1,rms} = 155.9\ \mathrm{V}$), $V_3 = 0$, $V_5 = 44.1\ \mathrm{V}$ peak.**

> [!warning] Trap
> Using the square-wave fundamental $4V_{dc}/\pi = 254.6\ \mathrm{V}$ because the pulse looks 'wide'. The $\sin d$ factor costs 13.4% of the fundamental at $d = 60^\circ$ and is exactly what buys the 3rd-harmonic cancellation, so ignoring it hides the design intent.

<sub>from ECE-06-08</sub>

### 5. A boost converter runs from $V_{in}=12\ \mathrm{V}$, $D=0.5$, $f_s=50\ \mathrm{kHz}$, $L=100\ \mu\mathrm{H}$, $C=470\ \mu\mathrm{F}$ into $R=20\ \Omega$. Find $V_o$, $I_o$, the average inductor current, the ripple and peak current, and the output ripple.

**Given:** V_in = 12 V; D = 0.5; f_s = 50 kHz; L = 100 uH; C = 470 uF; R = 20 Ohm

> [!success]- Answer
> **$V_o=24\ \mathrm{V}$, $I_o=1.2\ \mathrm{A}$, $I_L=2.4\ \mathrm{A}$, $\Delta I_L=1.2\ \mathrm{A}$ p-p, $I_{L,pk}=3.0\ \mathrm{A}$, $\Delta V_o=25.5\ \mathrm{mV}$.**

> [!warning] Trap
> Using $I_o=1.2\ \mathrm{A}$ as the inductor current. The inductor carries the *input* current $I_o/(1-D)=2.4\ \mathrm{A}$, so the switch and inductor must be rated for twice the load current at $D=0.5$.

<sub>from ECE-06-05</sub>

### 6. An LM317-style regulator must supply 9.00 V with $R_1 = 240\ \Omega$. Find $R_2$ for the exact value, the output when the standard 1.5 kohm resistor is used, the shift caused by $I_{ADJ} = 50\ \mu\mathrm{A}$, and the dissipation when $V_{in} = 12\ \mathrm{V}$ and $I_o = 0.5\ \mathrm{A}$.

**Given:** V_ref = 1.25 V; V_o = 9.00 V; R_1 = 240 ohm; I_ADJ = 50 uA; V_in = 12 V; I_o = 0.5 A

> [!success]- Answer
> **$R_2 = 1488\ \Omega$ (use 1.5 kohm giving 9.06 V, or 9.14 V once the 75 mV ADJ term is included); $P_D = 1.47\ \mathrm{W}$, rising 73.5 C on a 50 C/W path.**

> [!warning] Trap
> Swapping the divider: $V_o = 1.25(1 + R_1/R_2) = 1.25(1 + 240/1500) = 1.45\ \mathrm{V}$ - a 6x error. $R_1$ is the resistor that carries the 1.25 V reference (OUT to ADJ) and $R_2$ goes from ADJ to ground.

<sub>from ECE-06-09</sub>

### 7. A buck converter runs from $V_{in}=24\ \mathrm{V}$ with $D=0.4$, $f_s=100\ \mathrm{kHz}$, $L=100\ \mu\mathrm{H}$, $C=100\ \mu\mathrm{F}$ and $R=10\ \Omega$. Find $V_o$, the inductor ripple, the peak inductor current and the output ripple.

**Given:** V_in = 24 V; D = 0.4; f_s = 100 kHz; L = 100 uH; C = 100 uF; R = 10 Ohm

> [!success]- Answer
> **$V_o=9.6\ \mathrm{V}$, $\Delta I_L=0.576\ \mathrm{A}$ p-p, $I_{L,pk}=1.25\ \mathrm{A}$, $\Delta V_o=7.2\ \mathrm{mV}$ (0.075 percent of $V_o$).**

> [!warning] Trap
> Using $V_{in}$ instead of $V_{in}-V_o$ in the on-time ripple formula: $24(0.4)/10=0.96\ \mathrm{A}$ doubles the ripple and gives $\Delta V_o=12\ \mathrm{mV}$. The inductor only sees the *difference* $V_{in}-V_o$ while the switch is closed.

<sub>from ECE-06-04</sub>

### 8. A three-phase bridge with $V_{dc} = 400\ \mathrm{V}$ runs in 120-degree conduction at 60 Hz. Find the line-to-line rms, the fundamental line-to-line and line-to-neutral rms, and the line-to-line THD.

**Given:** V_dc = 400 V; f_out = 60 Hz; 120 degree conduction; six-step waveform

> [!success]- Answer
> **$V_{LL,rms} = 326.6\ \mathrm{V}$, $V_{LL1,rms} = 311.9\ \mathrm{V}$, $V_{ph1,rms} = 180.1\ \mathrm{V}$, $THD = 31.1\%$, first harmonics at 300 Hz and 420 Hz.**

> [!warning] Trap
> Using the single-phase square-wave figures for the three-phase bridge. The fundamental here is $0.7797V_{dc}$ line-to-line - not $0.900V_{dc}$ - and the 3rd harmonic is absent from the line-to-line voltage, so including it inflates both the THD and the filter design.

<sub>from ECE-06-07</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-06-01 | Power Switches: MOSFET, IGBT, GTO, TRIAC | 5 |
| ECE-06-02 | Thermal Resistance and Heat Sinking | 5 |
| ECE-06-03 | SCR Phase-Controlled Rectifiers | 5 |
| ECE-06-04 | Buck Converter | 5 |
| ECE-06-05 | Boost Converter | 5 |
| ECE-06-06 | Buck-Boost Converter | 5 |
| ECE-06-07 | Inverters: Half-Bridge and Full-Bridge | 5 |
| ECE-06-08 | PWM Techniques | 5 |
| ECE-06-09 | Linear Voltage Regulators | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
