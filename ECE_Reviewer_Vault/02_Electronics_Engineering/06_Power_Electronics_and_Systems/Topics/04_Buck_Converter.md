---
id: ECE-06-04
title: "Buck Converter"
part: "02_Electronics_Engineering"
area: "06_Power_Electronics_and_Systems"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[11_First_Order_RC_and_RL_Transients]]", "[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]"]
tags: ["ece", "electronics_engineering", "power_electronics_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Buck Converter

> [!abstract] Scope
> Design and analyse the step-down chopper: relate output to input through the duty ratio, size the inductor and capacitor from ripple specifications, and identify the continuous-conduction boundary and the device voltage and current stresses.

## Core Concept

> [!tip] Intuition
> The switch chops the input into rectangular pulses and the LC filter takes the *average* of those pulses. Because the inductor current must return to its starting value every cycle, its average voltage is zero — and that single balance is what fixes the output at $DV_{in}$, independent of the load.

**Volt-second balance is the whole derivation.** In continuous conduction the switch is on for $DT_s$ and off for $(1-D)T_s$; during the on-time the inductor sees $V_{in}-V_o$ and during the off-time it sees $-V_o$ (the diode free-wheels). Steady state means the inductor current at the end of a cycle equals its value at the start, so the net volt-seconds must vanish:
$$(V_{in}-V_o)DT_s+(-V_o)(1-D)T_s=0$$
which expands to $V_{in}D-V_oD-V_o+V_oD=0$ and leaves $V_o=DV_{in}$. The duty ratio $D=t_{on}/T_s=t_{on}f_s$ must lie between 0 and 1, so the buck converter's output is always less than its input — an unavoidable consequence of the switch being in series with the source.

**Ripple current comes from the on-time voltage across $L$.** While the switch is on the inductor voltage is $V_{in}-V_o=V_{in}(1-D)$, so the current ramps up linearly at $(V_{in}-V_o)/L$ for a time $DT_s$, giving $\Delta I_L=\dfrac{(V_{in}-V_o)D}{Lf_s}=\dfrac{V_o(1-D)}{Lf_s}$ — the two forms are identical because $V_{in}-V_o=V_o(1-D)/D$. Two consequences follow immediately: the ripple is *independent of load* (only $D$, $L$ and $f$ appear), and the inductor is chosen by the ripple specification, not by the average current. Raising $f_s$ or $L$ shrinks the ripple, which is why modern converters run at hundreds of kilohertz and use small ferrite-cored inductors.

**The output capacitor integrates the triangular ripple.** The capacitor carries the AC part of $i_L$; the charge it absorbs each half-cycle is the area of the triangular ripple above and below the average, which evaluates to $\Delta V_o=\dfrac{\Delta I_L}{8f_sC}$. The important structural point is that there is no $D$ here (unlike the boost), because in a buck the capacitor is fed by the inductor continuously — the switch only sets the average voltage, while the inductor delivers current to the output in both intervals. Substituting $\Delta I_L$ gives $\Delta V_o=\dfrac{V_o(1-D)}{8LCf_s^2}$, so the output ripple falls with the *square* of frequency, which is why a $100\ \mathrm{kHz}$ converter with a $100\ \mu\mathrm{H}$/ $100\ \mu\mathrm{F}$ filter reaches millivolt ripple.

**The CCM/DCM boundary, and where the ideal ratio fails.** The converter stays in CCM only while the inductor current never reaches zero, i.e. while the average inductor current $I_L=I_o=V_o/R$ exceeds half the ripple. Setting $I_o=\Delta I_L/2$ gives the boundary inductance $L_{min}=\dfrac{(1-D)R}{2f_s}$, and the boundary current for a fixed inductor is $I_{OB}=\dfrac{V_o(1-D)}{2Lf_s}$. Below that current (light load, or a high $D$ with a small $L$) the diode current reaches zero before the cycle ends, the inductor voltage is no longer clamped to $-V_o$ for the whole off-time, and $V_o$ rises *above* $DV_{in}$ — which is why a lightly loaded buck regulated by open-loop duty ratio will not hold its output down, and why real regulators close the loop on the output. Device stresses are simple and worth memorising: the off-state switch sees the full $V_{in}$, the diode blocks $V_{in}$ in reverse, the switch average current is $DI_o$, and the diode average current is $(1-D)I_o$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Ideal conversion ratio (CCM) | $V_o=D\,V_{in}$ | Unidirectional, step-down only. Use the hot on-state drops for real numbers: V_o = D(V_in - V_sw) - (1-D)V_F. |
| Duty ratio | $D=\frac{V_o}{V_{in}}=\frac{t_{on}}{T_s}=t_{on}f_s$ | Must be between 0 and 1. A calculated D above 1 means the spec is impossible with a buck; use a boost or a transformer. |
| Inductor volt-second balance | $(V_{in}-V_o)D\,T_s=V_o(1-D)T_s$ | The derivation, valid only in CCM. In DCM the off-time voltage is not V_o for the whole interval and this equality fails. |
| Inductor ripple current | $\Delta I_L=\frac{(V_{in}-V_o)D}{Lf_s}=\frac{V_o(1-D)}{Lf_s}$ | Peak-to-peak, independent of load. Sizing rule: 20-40 percent of the full-load DC current. |
| CCM/DCM boundary inductance | $L_{min}=\frac{(1-D)R}{2f_s}$ | R is the full-load resistance. Choose L above this or the output rises above D V_in at light load. |
| Boundary load current | $I_{OB}=\frac{V_o(1-D)}{2Lf_s}$ | Useful form: a converter drops out of CCM below this output current. Halving the inductance doubles the dropout current. |
| Output capacitor ripple | $\Delta V_o=\frac{\Delta I_L}{8f_sC}$ | No D in this expression (unlike the boost). The capacitor also has an ESR term I_L,ripple x ESR which dominates with electrolytics. |
| Switch and diode stresses | $V_{sw,off}=V_{in},\quad I_{sw,avg}=D\,I_o,\quad I_{D,avg}=(1-D)I_o$ | Off-state voltage equals the input for both devices; the diode's average current is the off-time share of the load current. |
| Peak inductor current | $I_{L,pk}=I_o+\frac{\Delta I_L}{2}$ | Sets the inductor saturation rating and the switch peak current. Use the maximum input voltage for the worst-case ripple. |
| Load current from duty | $I_o=\frac{V_o}{R}=\frac{D\,V_{in}}{R}$ | CCM only. In DCM this relation must be replaced by an energy-balance equation and the output is higher than D V_in. |

## Interactive Widget

**Buck Boost Duty Cycle Slider**

![[Buck_Boost_Duty_Cycle_Slider.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A buck converter runs from $V_{in}=24\ \mathrm{V}$ with $D=0.4$, $f_s=100\ \mathrm{kHz}$, $L=100\ \mu\mathrm{H}$, $C=100\ \mu\mathrm{F}$ and $R=10\ \Omega$. Find $V_o$, the inductor ripple, the peak inductor current and the output ripple.

**Given:** V_in = 24 V; D = 0.4; f_s = 100 kHz; L = 100 uH; C = 100 uF; R = 10 Ohm

**Solution:**

1. $V_o=DV_{in}=(0.4)(24)=9.6\ \mathrm{V}$.
2. $I_o=V_o/R=9.6/10=0.96\ \mathrm{A}$.
3. Ripple: $\Delta I_L=\dfrac{V_o(1-D)}{Lf_s}=\dfrac{9.6(0.6)}{(100\times10^{-6})(100\times10^{3})}=\dfrac{5.76}{10}=0.576\ \mathrm{A}$ peak-to-peak.
4. Peak: $I_{L,pk}=0.96+0.576/2=0.96+0.288=1.248\ \mathrm{A}$; minimum is $0.96-0.288=0.672\ \mathrm{A}>0$, so the converter is in CCM.
5. Output ripple: $\Delta V_o=\dfrac{\Delta I_L}{8f_sC}=\dfrac{0.576}{8(100\times10^{3})(100\times10^{-6})}=\dfrac{0.576}{80}=7.2\ \mathrm{mV}$.

> [!success]- Answer
> **$V_o=9.6\ \mathrm{V}$, $\Delta I_L=0.576\ \mathrm{A}$ p-p, $I_{L,pk}=1.25\ \mathrm{A}$, $\Delta V_o=7.2\ \mathrm{mV}$ (0.075 percent of $V_o$).**

> [!warning] Trap
> Using $V_{in}$ instead of $V_{in}-V_o$ in the on-time ripple formula: $24(0.4)/10=0.96\ \mathrm{A}$ doubles the ripple and gives $\Delta V_o=12\ \mathrm{mV}$. The inductor only sees the *difference* $V_{in}-V_o$ while the switch is closed.

### P2. For the same converter, find the boundary inductance $L_{min}$ and the output current at which it leaves CCM if the inductance is only $20\ \mu\mathrm{H}$.

**Given:** V_in = 24 V; D = 0.4; V_o = 9.6 V; R = 10 Ohm; f_s = 100 kHz; L = 20 uH

**Solution:**

1. Boundary inductance at full load: $L_{min}=\dfrac{(1-D)R}{2f_s}=\dfrac{(0.6)(10)}{2(100\times10^{3})}=\dfrac{6}{2\times10^{5}}=30\ \mu\mathrm{H}$.
2. The 100 uH design is above the boundary; the 20 uH design is below it, so that version is already in DCM at full load.
3. Boundary current for the 20 uH inductor: $I_{OB}=\dfrac{V_o(1-D)}{2Lf_s}=\dfrac{(9.6)(0.6)}{2(20\times10^{-6})(100\times10^{3})}=\dfrac{5.76}{4}=1.44\ \mathrm{A}$.
4. Since full-load current is only 0.96 A < 1.44 A, the 20 uH converter operates in DCM, and $V_o$ will be higher than the ideal $DV_{in}=9.6\ \mathrm{V}$.

> [!success]- Answer
> **$L_{min}=30\ \mu\mathrm{H}$ at full load; the 100 uH design stays in CCM, the 20 uH design has $I_{OB}=1.44\ \mathrm{A}$ and is in DCM at every load, so its output rises above 9.6 V.**

> [!warning] Trap
> Assuming $V_o=DV_{in}$ holds regardless of load and inductance. Below the boundary current the ideal ratio is invalid; a 20 uH inductor at this load gives an output noticeably above $DV_{in}$, and an open-loop bench test shows it immediately.

### P3. A buck converter must step $48\ \mathrm{V}$ down to $12\ \mathrm{V}$ at $2\ \mathrm{A}$ using $f_s=50\ \mathrm{kHz}$. Find $D$, the minimum inductance for CCM, the inductance that limits the ripple to $0.4\ \mathrm{A}$ peak-to-peak, and the capacitor for $50\ \mathrm{mV}$ output ripple.

**Given:** V_in = 48 V; V_o = 12 V; I_o = 2 A; f_s = 50 kHz; delta I_L target = 0.4 A p-p; delta V_o target = 50 mV

**Solution:**

1. $D=V_o/V_{in}=12/48=0.25$.
2. Load resistance $R=V_o/I_o=12/2=6\ \Omega$; CCM boundary $L_{min}=\dfrac{(1-0.25)(6)}{2(50\times10^{3})}=\dfrac{4.5}{10^{5}}=45\ \mu\mathrm{H}$.
3. Ripple-limited inductance: $L=\dfrac{V_o(1-D)}{\Delta I_Lf_s}=\dfrac{12(0.75)}{(0.4)(50\times10^{3})}=\dfrac{9}{20\,000}=450\ \mu\mathrm{H}$.
4. Capacitor: $C=\dfrac{\Delta I_L}{8f_s\Delta V_o}=\dfrac{0.4}{8(50\times10^{3})(0.050)}=\dfrac{0.4}{20\,000}=20\ \mu\mathrm{F}$.
5. Use the larger inductance (450 uH) because it satisfies both the ripple and the CCM requirement; the ripple target, not the CCM boundary, is the binding constraint.

> [!success]- Answer
> **$D=0.25$, $L_{min}=45\ \mu\mathrm{H}$ for CCM, $L=450\ \mu\mathrm{H}$ for 0.4 A ripple, $C=20\ \mu\mathrm{F}$ for 50 mV ripple.**

> [!warning] Trap
> Sizing the inductor for the CCM boundary only (45 uH) and then wondering why the ripple is $\Delta I_L=12(0.75)/(45\times10^{-6}\times50\times10^{3})=4\ \mathrm{A}$ — ten times the specification, and ten times the output ripple.

### P4. The buck in problem 1 uses a diode with $V_F=0.7\ \mathrm{V}$ and a MOSFET with $R_{DS(on)}=0.05\ \Omega$. Estimate the real output voltage at $D=0.4$ and the conduction losses in each device.

**Given:** V_in = 24 V; D = 0.4; I_o = 0.96 A; V_F = 0.7 V; R_DS(on) = 0.05 Ohm

**Solution:**

1. Switch drop: the MOSFET carries the inductor current during $DT_s$, so $V_{sw}=I_LR_{DS(on)}=(0.96)(0.05)=0.048\ \mathrm{V}$.
2. Average output: $V_o=D(V_{in}-V_{sw})-(1-D)V_F=0.4(24-0.048)-0.6(0.7)=9.581-0.42=9.16\ \mathrm{V}$.
3. So the real output is $9.16\ \mathrm{V}$ instead of the ideal $9.6\ \mathrm{V}$ — 4.6 percent low.
4. Losses: switch $P_{sw}=I_o^2R_{DS(on)}D=(0.96)^2(0.05)(0.4)=0.0184\ \mathrm{W}$; diode $P_D=V_FI_o(1-D)=(0.7)(0.96)(0.6)=0.403\ \mathrm{W}$.

> [!success]- Answer
> **$V_o\approx9.16\ \mathrm{V}$ (4.6 percent below ideal); the diode burns $0.403\ \mathrm{W}$ and the switch $0.018\ \mathrm{W}$ — the free-wheeling diode is by far the dominant loss, which is why synchronous rectification is used.**

> [!warning] Trap
> Reporting $V_o=9.6\ \mathrm{V}$ from the ideal formula and then being surprised by a shortfall. The diode drop is multiplied by $(1-D)$ and the switch drop by $D$, so at $D=0.4$ the 0.7 V diode costs 0.42 V while the MOSFET costs only 0.02 V.

### P5. A buck converter's load current falls to $0.1\ \mathrm{A}$ while $D$ stays fixed at 0.4 ($V_{in}=24\ \mathrm{V}$, $L=100\ \mu\mathrm{H}$, $f_s=100\ \mathrm{kHz}$). Determine whether it is in CCM and explain what happens to the output voltage.

**Given:** V_in = 24 V; D = 0.4; L = 100 uH; f_s = 100 kHz; I_o = 0.1 A; V_o ideal = 9.6 V

**Solution:**

1. Ripple is fixed by the passive components: $\Delta I_L=\dfrac{V_o(1-D)}{Lf_s}=0.576\ \mathrm{A}$ peak-to-peak, so half the ripple is 0.288 A.
2. The average inductor current equals the load current, 0.1 A, which is *less* than 0.288 A.
3. Therefore the current would have to go negative, which the diode prevents, so the converter is in DCM and the switch-off interval ends early.
4. In DCM the output capacitor holds the voltage up and $V_o$ rises above $DV_{in}$; with such a light load the output would climb toward $V_{in}$ if the loop did not intervene.
5. The fix is either a larger inductance, a lower switching frequency at light load (pulse skipping), or a closed voltage loop that reduces $D$.

> [!success]- Answer
> **DCM at 0.1 A ($I_{OB}=0.288\ \mathrm{A}$); the output rises above the ideal 9.6 V, so an open-loop duty-ratio design cannot regulate a light load.**

> [!warning] Trap
> Believing the ubiquitous claim that a buck's output is load-independent. That is true only in CCM; at light load the boundary current $I_{OB}=\Delta I_L/2$ is crossed and $V_o$ rises above $DV_{in}$ — a 0.1 A load on a design sized for 0.96 A is well inside DCM.

## Traps & Exam Notes

- **Using $V_{in}$ instead of $V_{in}-V_o$ for the on-time voltage.** At $D=0.4$, $V_o=9.6\ \mathrm{V}$, $L=100\ \mu\mathrm{H}$, $f=100\ \mathrm{kHz}$, the correct ripple is $0.576\ \mathrm{A}$; using $V_{in}D/(Lf)=0.96\ \mathrm{A}$ overstates it by 67 percent and doubles the predicted output ripple.
- **Claiming $V_o=DV_{in}$ at every load.** The ratio is load-independent only in CCM; below $I_{OB}=V_o(1-D)/(2Lf_s)$ the converter enters DCM and the output rises above $DV_{in}$.
- **Putting $D$ into the output-ripple formula.** For the buck $\Delta V_o=\Delta I_L/(8f_sC)$ with no $D$ factor — the boost converter is the one whose capacitor only charges during the off interval and therefore carries $D$.
- **Forgetting the free-wheeling diode drop scales with $(1-D)$.** At $D=0.4$ with a 0.7 V diode the output loses $0.42\ \mathrm{V}$ (4.4 percent), so a 24 V-to-9.6 V ideal design actually delivers about 9.16 V.
- **Sizing the inductor at the CCM boundary instead of the ripple spec.** $L_{min}=45\ \mu\mathrm{H}$ keeps a 48 V-to-12 V converter continuous at 2 A, but the ripple is then 4 A rather than the 0.4 A specified — the ripple requirement and the CCM requirement are separate checks.
- **Using the average output current for switch loss.** Conduction loss uses the RMS device current; the switch carries $I_o$ for $DT_s$, the diode for $(1-D)T_s$, and using $I_{avg}$ underestimates the loss.

## See Also

- [[05_Boost_Converter]]
- [[06_Buck-Boost_Converter]]
- [[08_PWM_Techniques]]
- [[01_Power_Switches_MOSFET,_IGBT,_GTO,_TRIAC]]
- [[07_Inverters_Half-Bridge_and_Full-Bridge]]
- [[09_Linear_Voltage_Regulators]]

---

[[03_SCR_Phase-Controlled_Rectifiers|⬅ 03]] · [[_MOC_Power_Electronics_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Boost_Converter|05 ➡]]
