---
id: ECE-06-01
title: "Power Switches: MOSFET, IGBT, GTO, TRIAC"
part: "02_Electronics_Engineering"
area: "06_Power_Electronics_and_Systems"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[12_MOSFET_Types_and_Regions]]", "[[04_Diode_Models_and_Load_Line]]"]
tags: ["ece", "electronics_engineering", "power_electronics_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Power Switches: MOSFET, IGBT, GTO, TRIAC

> [!abstract] Scope
> Choose and rate the four workhorse power switches by drive method, conduction and switching loss, latching behaviour, maximum frequency and safe-operating-area limits.

## Core Concept

> [!tip] Intuition
> Every power switch is a valve that must hold off the full bus voltage when off and carry the full load current when on, and it pays a toll in heat for every microsecond spent crossing between those two states. The four devices are simply four different trades between how cheaply you can drive the valve and how fast you can move it.

**Drive: voltage-controlled versus current-controlled.** The MOSFET is a *majority-carrier*, voltage-driven device: a gate charge $Q_g$ is pushed in once and the channel stays on, so the DC gate current is essentially zero and the drive power is only the capacitive $P_{gate}=Q_g V_{GS} f_{sw}$. The IGBT takes the same insulated MOS gate but conducts through a $p^{+}$ collector region, so driving it is equally easy while its conduction follows a BJT. The GTO and the TRIAC are *current-driven* thyristor structures: the GTO needs a continuous gate current while on, and turning it off requires a large **negative** gate pulse (turn-off gain only about 3 to 5), while the TRIAC needs only a short gate trigger pulse and then latches on by itself until the current falls below the holding value $I_H$. A drive circuit that works for a MOSFET will not turn off a GTO.

**Conduction loss: a resistance or a fixed drop — and it decides paralleling.** A MOSFET is an ON-state *resistor*, so $P_{cond}=I_D^2R_{DS(on)}$ and the loss falls as $I^2$ and rises with temperature ($R_{DS(on)}$ roughly doubles from $25\ ^\circ\mathrm{C}$ to $150\ ^\circ\mathrm{C}$). An IGBT (like a BJT) has an ON-state *offset*, so $P_{cond}=V_{CE(sat)}I_C$ — linear in current, nearly independent of temperature, and with a fixed floor of about $1$ to $2\ \mathrm{V}$ that ruins efficiency at low current. That is the whole selection rule: for low-voltage, high-current work the MOSFET's $I^2R$ wins; above roughly $600\ \mathrm{V}$ the MOSFET's $R_{DS(on)}$ grows so fast (about $R\propto BV^{2.5}$) that the IGBT's constant $V_{CE(sat)}$ wins. For paralleling, the IGBT shares current well because $V_{CE(sat)}$ has a gentle temperature coefficient, whereas MOSFETs need matched parts, symmetric layout and a small source ballast resistor.

**Switching speed and the SOA.** The MOSFET is the fastest of the four (tens of nanoseconds, easily $100\ \mathrm{kHz}$ to $\mathrm{MHz}$) because it has no minority-carrier storage; the IGBT is next (about $1$ to $5\ \mu\mathrm{s}$ tail from stored charge, so $20$ to $50\ \mathrm{kHz}$); the GTO switches in tens of microseconds but its turn-off is limited by the *tail* current and by the snubber needed to hold $dv/dt$ down (a few hundred hertz); the TRIAC is line-frequency only because it **naturally commutates** at the AC zero crossing. Every device has a safe operating area (SOA) bounded by current, voltage, power and time, and every one has a $dv/dt$ and $di/dt$ limit: a phase-control thyristor can be false-triggered by the displacement current $C\,dv/dt$ through its junction capacitance (an RC snubber diverts it), and an uncontrolled $di/dt$ at turn-on concentrates the current in a small area near the gate and burns the die. Because the MOSFET has an inherent body diode across drain-source, it blocks only one polarity and that body diode is a slow, lossy rectifier during dead time; an IGBT has no internal body diode and needs an external fast free-wheeling rectifier (or a co-packaged one).

**Latching: why one conducts and another cannot be turned off.** The GTO is a *latching* thyristor like the SCR, so once fired it stays on by internal regeneration without any gate signal; the difference is that the GTO's interdigitated cathode lets a negative gate current of roughly $I_A/3$ to $I_A/5$ divert the regenerative current and break the latch, which is why the GTO can be used in a voltage-source inverter while an SCR cannot. The TRIAC is two SCRs connected anti-parallel on one die, so it conducts **both** AC half-cycles and gives full-wave phase control of an AC load from a single gate. Its caveat is the quadrant problem: the trigger sensitivity differs between quadrants I ($+V$, $+I_g$), II ($+V$, $-I_g$), III ($-V$, $-I_g$) and IV ($-V$, $+I_g$), with quadrant IV being the least sensitive and the most likely to misfire; practical drivers therefore fire in quadrants I and III (or I and II) and designers must check the specific quadrant sensitivity, $I_{GT}$ and $V_{GT}$, at the actual operating temperature and load current.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| MOSFET conduction loss | $P_{cond}=I_D^2\,R_{DS(on)}$ | Use the RMS on-state current, not the average. Use R_DS(on) at the hot junction (about 1.8-2.2x the 25 C datasheet value); a DC value of 0.05 ohm at 3 A gives 0.45 W, not the 0.14 W you would get by accidentally using the 0.8 A average. |
| BJT / IGBT conduction loss | $P_{cond}=V_{CE(sat)}\,I_C$ | Linear in current with a fixed offset of about 1-2 V. Use RMS current for a chopped waveform; a 1.5 V device at 10 A burns 15 W no matter how good the gate drive is. |
| MOSFET gate drive power | $P_{gate}=Q_g\,V_{GS}\,f_{sw}$ | The only steady drive power for a voltage-driven gate; Q_g in coulombs from the datasheet at the actual V_GS. Quoted per device, and it grows linearly with switching frequency. |
| Switching loss per transition | $P_{sw}=\tfrac12\,V_{ds}\,I_D\,(t_r+t_f)\,f_{sw}$ | Idealised triangular overlap of voltage and current. Doubling f_sw doubles this term; that is the practical ceiling on frequency long before the gate drive gives up. |
| dv/dt false turn-on (snubber duty) | $i_{disp}=C_j\,\frac{dv}{dt}$ | Displacement current injected into the gate of a thyristor by a fast rising anode voltage; keep C_j dv/dt below the datasheet critical value with an RC snubber. |
| TRIAC RMS load current | $I_{rms}=\frac{V_{rms}}{R_{L}}$ | Full-wave conduction, so the load sees the whole sine. The TRIAC die carries about 10-15 A rms while the average magnitude is roughly 0.9 of that; the on-state loss is I_rms^2 R_on shared across the two anti-parallel halves. |
| TRIAC phase-control power | $P_L=\frac{V_{rms}^2}{R_L}\,\frac{2\pi-2\alpha+\sin 2\alpha}{2\pi}$ | alpha in radians, conduction over the remaining (pi - alpha) of each half-cycle. At alpha = 0 the fraction is 1 (full power); at alpha = 90 deg it is 0.5. |
| R_DS(on) temperature scaling | $R_{DS(on)}(T_j)\approx R_{DS(on),25}\,\left(\frac{T_j+273}{298}\right)^{1.6}$ | Engineering fit for silicon; gives about 2x at 150 C. Always size the heatsink with the hot resistance or the loss is under-predicted by a factor of two. |
| Paralleled-device current sharing | $I_1=\frac{R_2}{R_1+R_2}\,I_{tot}$ | Current divides inversely with hot R_DS(on). If one device is 20 percent cooler it takes about 55 percent of the current and heats further, so add 0.1-0.5 ohm source ballast or derate to about 70 percent. |

## Worked Problems

### P1. A MOSFET with hot $R_{DS(on)}=80\ \mathrm{m}\Omega$ carries a trapezoidal drain current of $3\ \mathrm{A}$ RMS in a switching cell with $V_{ds}=48\ \mathrm{V}$, $t_r+t_f=120\ \mathrm{ns}$ and $f_{sw}=100\ \mathrm{kHz}$. The gate charge is $Q_g=40\ \mathrm{nC}$ at $V_{GS}=10\ \mathrm{V}$. Find the total loss and the junction temperature for $T_a=40\ ^\circ\mathrm{C}$, $\theta_{JA}=62\ ^\circ\mathrm{C/W}$.

**Given:** R_DS(on) hot = 80 mOhm; I_D,rms = 3 A; V_ds = 48 V; t_r + t_f = 120 ns; f_sw = 100 kHz; Q_g = 40 nC; V_GS = 10 V; T_a = 40 C; theta_JA = 62 C/W

**Solution:**

1. Conduction: $P_{cond}=I_D^2R_{DS(on)}=(3)^2(0.080)=0.72\ \mathrm{W}$.
2. Switching: $P_{sw}=\tfrac12(48)(3)(120\times10^{-9})(100\times10^{3})=0.864\ \mathrm{W}$.
3. Gate drive: $P_{gate}=Q_gV_{GS}f_{sw}=(40\times10^{-9})(10)(100\times10^{3})=0.040\ \mathrm{W}$.
4. Total: $P_D=0.72+0.864+0.040=1.624\ \mathrm{W}$.
5. Junction: $T_j=40+(1.624)(62)=40+100.7=140.7\ ^\circ\mathrm{C}$ — inside the 150 C limit but with only 9 C of margin.

> [!success]- Answer
> **$P_D\approx1.62\ \mathrm{W}$ and $T_j\approx140.7\ ^\circ\mathrm{C}$, which is a fail in practice: no margin for a hot day or a poor layout.**

> [!warning] Trap
> Using the 25 C datasheet $R_{DS(on)}$ (say 40 mOhm) gives 0.36 W and $T_j=88\ ^\circ\mathrm{C}$ — an apparently safe design that overheats. The hot resistance is roughly double the 25 C value.

### P2. An IGBT with $V_{CE(sat)}=1.8\ \mathrm{V}$ switches $I_C=15\ \mathrm{A}$ (flat) at the same $f_{sw}=20\ \mathrm{kHz}$ with $t_r+t_f=2\ \mu\mathrm{s}$ from a $600\ \mathrm{V}$ bus. Compare its conduction and switching losses and comment.

**Given:** V_CE(sat) = 1.8 V; I_C = 15 A; V_bus = 600 V; t_r + t_f = 2 us; f_sw = 20 kHz

**Solution:**

1. Conduction: $P_{cond}=V_{CE(sat)}I_C=(1.8)(15)=27.0\ \mathrm{W}$.
2. Switching: $P_{sw}=\tfrac12(600)(15)(2\times10^{-6})(20\times10^{3})=(0.5)(600)(15)(0.04)=180\ \mathrm{W}$.
3. Total $P_D\approx207\ \mathrm{W}$; the switching term is 87 percent of the loss.
4. Dropping to $f_{sw}=5\ \mathrm{kHz}$ scales only the switching part: $P_{sw}=45\ \mathrm{W}$, $P_D=72\ \mathrm{W}$.

> [!success]- Answer
> **$P_{cond}=27\ \mathrm{W}$, $P_{sw}=180\ \mathrm{W}$ at 20 kHz ($207\ \mathrm{W}$ total); the IGBT is switching-limited, so reduce frequency or add soft switching.**

> [!warning] Trap
> Comparing the 27 W conduction loss with a MOSFET's $I^2R$ at the same current without also comparing switching loss. At 600 V the IGBT's fixed drop is cheap but its 2 us transitions at 20 kHz are not — the frequency capability is the binding constraint.

### P3. A TRIAC with $R_{on}=0.12\ \Omega$ (two anti-parallel halves, each conducting one half-cycle) feeds a $20\ \Omega$ resistive heater from $230\ \mathrm{V}$ rms, 60 Hz, fired at $\alpha$. Find the load power at $\alpha=0^\circ$ and $\alpha=90^\circ$, and the TRIAC on-state dissipation at $\alpha=0^\circ$.

**Given:** V_rms = 230 V; R_L = 20 Ohm; R_on = 0.12 Ohm; alpha = 0 deg and 90 deg

**Solution:**

1. Full conduction at $\alpha=0$: $P_L=V_{rms}^2/R_L=(230)^2/20=2645\ \mathrm{W}$.
2. Load current: $I_{rms}=230/20=11.5\ \mathrm{A}$.
3. Dissipation: $P_{TRIAC}=I_{rms}^2R_{on}=(11.5)^2(0.12)=15.87\ \mathrm{W}$ on a device that may have $\theta_{JC}\approx1.5\ ^\circ\mathrm{C/W}$ — it needs a real heatsink.
4. At $\alpha=90^\circ$, the conduction fraction is $\frac{2\pi-2\alpha+\sin2\alpha}{2\pi}=\frac{2\pi-\pi+0}{2\pi}=0.5$, so $P_L=1322.5\ \mathrm{W}$.

> [!success]- Answer
> **$2645\ \mathrm{W}$ at $\alpha=0^\circ$ and $1322.5\ \mathrm{W}$ at $\alpha=90^\circ$; the TRIAC itself burns $15.9\ \mathrm{W}$ at full conduction.**

> [!warning] Trap
> Forgetting that the TRIAC conducts both half-cycles and using a half-wave fraction, or forgetting the series $R_{on}$ when the load is small (a 20 ohm load is already 0.6 percent error, but a 2 ohm load would be 6 percent).

### P4. Two MOSFETs are paralleled to carry $I_{tot}=20\ \mathrm{A}$. Their hot on-resistances are $50\ \mathrm{m}\Omega$ and $65\ \mathrm{m}\Omega$ because of unequal airflow. Find the current in each and the total loss, then state the derating rule.

**Given:** I_tot = 20 A; R_1 = 50 mOhm; R_2 = 65 mOhm

**Solution:**

1. Parallel division: $I_1=I_{tot}\dfrac{R_2}{R_1+R_2}=20\dfrac{65}{115}=11.30\ \mathrm{A}$ and $I_2=20-11.30=8.70\ \mathrm{A}$.
2. Losses: $P_1=(11.30)^2(0.050)=6.39\ \mathrm{W}$, $P_2=(8.70)^2(0.065)=4.92\ \mathrm{W}$.
3. Total $P=11.31\ \mathrm{W}$ versus the ideal $I^2R_{par}=400\times0.02826=11.30\ \mathrm{W}$ — almost the same loss, but one die is 30 percent hotter.
4. Because hot $R_{DS(on)}$ rises and pulls more current into the cooler device, asymmetry is self-limiting for MOSFETs at fixed $V_{GS}$; it is the *threshold mismatch* (one device turning on earlier) that is dangerous, so keep $\ge 0.1\ \Omega$ source ballast or derate to about 70 percent.

> [!success]- Answer
> **$I_1=11.3\ \mathrm{A}$, $I_2=8.7\ \mathrm{A}$; $P_{tot}=11.3\ \mathrm{W}$; derate paralleled MOSFETs to about 70 percent of their sum rating.**

> [!warning] Trap
> Assuming perfect sharing and sizing the heatsink for 10 A per device. Device 1 runs 13 percent above its share and its junction runs about 30 percent hotter, which is exactly how one of the two fails first.

### P5. A 600 V GTO interrupts $I_A=100\ \mathrm{A}$ with turn-off gain $\beta_{off}=4$ and a snubber that limits $dv/dt$ to $300\ \mathrm{V}/\mu\mathrm{s}$. Find the required peak negative gate current and the value of the $C_s$ in an RC snubber that keeps the anode $dv/dt$ at that level if the load current is 100 A.

**Given:** I_A = 100 A; beta_off = 4; dv/dt limit = 300 V/us

**Solution:**

1. Turn-off gain definition: $\beta_{off}=I_A/|I_{GK}|$, so $|I_{GK}|=100/4=25\ \mathrm{A}$ of negative gate pulse.
2. The snubber capacitor takes the load current while the anode voltage rises: $\frac{dv}{dt}=\frac{I_A}{C_s}$.
3. Solve for the capacitor: $C_s=\frac{I_A}{dv/dt}=\frac{100}{300\times10^{6}}=0.333\ \mu\mathrm{F}$.
4. The series resistor is then chosen so $R_sC_s$ is short compared with the off interval but long enough to damp the ring, typically $R_s\approx10$ to $50\ \Omega$.

> [!success]- Answer
> **$|I_{GK}|=25\ \mathrm{A}$ negative; $C_s\approx0.33\ \mu\mathrm{F}$ with a $10$ to $50\ \Omega$ damping resistor.**

> [!warning] Trap
> Driving the GTO like an SCR — a positive gate pulse only, with no negative turn-off source. A GTO that cannot be pulled out of latch by its negative gate current stays on until something else (usually the device itself) opens the circuit.

## Traps & Exam Notes

- **Rating a MOSFET with the 25 $^\circ$C $R_{DS(on)}$.** A $80\ \mathrm{m}\Omega$ hot value must be used; the datasheet's 40 mOhm at 25 C gives $0.36\ \mathrm{W}$ instead of $0.72\ \mathrm{W}$ and predicts $T_j=88\ ^\circ\mathrm{C}$ where the real junction reaches $141\ ^\circ\mathrm{C}$.
- **Forgetting that the IGBT has no body diode.** The MOSFET's intrinsic body diode free-wheels an inductive load automatically (badly, but it does); an IGBT left without a co-packaged or external fast rectifier will be destroyed by the inductive kick, and the rectifier's reverse recovery then sets the turn-on $di/dt$.
- **Firing a TRIAC in quadrant IV.** The $(-V,+I_g)$ quadrant has the highest $I_{GT}$ and the poorest $dv/dt$ immunity; a driver designed for quadrant IV misfires or drops out at high temperature, so trigger in quadrants I and III and check $(I_{GT},V_{GT})$ at the cold and hot extremes.
- **Adding a gate resistor to a GTO and expecting turn-off.** The turn-off gain is only about 3 to 5, so $100\ \mathrm{A}$ of anode current demands a $25\ \mathrm{A}$ negative pulse; a logic-level gate driver cannot break the latch and the GTO stays on.
- **Treating a thyristor's average current rating as an RMS rating.** The average rating assumes the free-wheeling or resistive waveform; a full-wave TRIAC carrying $11.5\ \mathrm{A}$ rms burns $15.9\ \mathrm{W}$ in a 0.12 ohm die, which is far above what a bare TO-220 can shed without a heatsink.
- **Ignoring $dv/dt$ as a false trigger.** A snubberless thyristor in a circuit with $300\ \mathrm{V}/\mu\mathrm{s}$ edges can be turned on by $C_j\,dv/dt$ through its own junction capacitance even with the gate grounded; the RC snubber is not optional decoration.

## See Also

- [[02_Thermal_Resistance_and_Heat_Sinking]]
- [[13_Thyristors_UJT,_SCR,_DIAC,_TRIAC]]
- [[03_SCR_Phase-Controlled_Rectifiers]]
- [[12_MOSFET_Types_and_Regions]]
- [[09_BJT_Structure_and_Operating_Regions]]
- [[07_Inverters_Half-Bridge_and_Full-Bridge]]
- [[15_Power_Amplifiers_Classes_A,_B,_AB,_C]]

---

⬅ *start* · [[_MOC_Power_Electronics_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Thermal_Resistance_and_Heat_Sinking|02 ➡]]
