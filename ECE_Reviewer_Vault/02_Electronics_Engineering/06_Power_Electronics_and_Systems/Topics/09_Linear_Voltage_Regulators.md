---
id: ECE-06-09
title: "Linear Voltage Regulators"
part: "02_Electronics_Engineering"
area: "06_Power_Electronics_and_Systems"
topic: 9
tier: 2
depth: full
problem_count: 5
prereqs: ["[[08_Zener_Diodes_and_Shunt_Regulators]]", "[[02_Linear_Op-Amp_Circuits]]", "[[02_Thermal_Resistance_and_Heat_Sinking]]"]
tags: ["ece", "electronics_engineering", "power_electronics_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Linear Voltage Regulators

> [!abstract] Scope
> Design series-pass linear regulators: set the output with the feedback divider, compute dissipation, efficiency and junction temperature, apply the heatsink calculation, and use line/load regulation, ripple rejection and dropout specifications.

## Core Concept

> [!tip] Intuition
> A linear regulator is a controllable resistor in series with the load, told what to do by a feedback loop. It is quiet and simple, but every volt it drops is multiplied by the load current and turned into heat inside the pass device.

**The series-pass idea.** A reference (bandgap or zener, about 1.25 V) is compared with a fraction of the output, and the error amplifier drives a pass transistor so that the divider node equals the reference. Because the loop gain is high, the output is set by resistor ratios and the reference rather than by the input: with $R_1$ from OUT to the feedback node and $R_2$ from that node to ground, $$V_o = V_{ref}\left(1 + \frac{R_2}{R_1}\right).$$ Everything the regulator does not pass to the load is burned in the pass device, so the topology is quiet and fast but only as efficient as the voltage ratio allows. Unlike a shunt (zener) regulator, the series element carries only the load current, which is why a linear series regulator always beats a zener shunt at high current.

**Adjustable and fixed three-terminal parts.** The LM317-style adjustable regulator holds $V_{ref} = 1.25\ \mathrm{V}$ between its OUT and ADJ pins, so $R_1$ goes from OUT to ADJ and $R_2$ from ADJ to ground:
$$V_o = 1.25(1 + R_2/R_1)$$
With $R_1 = 240\ \Omega$, $R_2 = 720\ \Omega$ gives exactly 5.00 V, and $R_2 = 1.5\ \mathrm{k\Omega}$ gives 9.06 V. The ADJ pin also sources $I_{ADJ} \approx 50\ \mu\mathrm{A}$, which adds the error term $I_{ADJ}R_2$ - 75 mV for $R_2 = 1.5\ \mathrm{k\Omega}$, larger than the 1% reference tolerance, and always in the direction that makes the output read high. The datasheet minimum load current (a few mA) must be respected or the output drifts up at no load. Fixed regulators (7805, 7812 positive; 7905, 7912 negative) embed the divider and add current limiting and thermal shutdown; the price is the dropout voltage, the minimum $V_{in} - V_o$ needed to stay in regulation - about 2 V for a classic 78xx and 0.3-1.5 V for an LDO. Below dropout the pass device saturates and the output simply follows the input minus $V_{do}$, so a 7805 fed from 6 V delivers about 4 V, not 5 V.

**Loss, efficiency and heat.** With $I_{in} \approx I_o + I_Q$, the pass-device dissipation is $P_D = (V_{in} - V_o)I_o + V_{in}I_Q \approx (V_{in} - V_o)I_o$, and the efficiency is $$\eta = \frac{P_o}{P_{in}} = \frac{V_oI_o}{V_{in}(I_o + I_Q)} \approx \frac{V_o}{V_{in}}.$$ The efficiency depends on the voltage ratio only, not on the load current: 12 V in, 5 V out at 1 A delivers 5 W while burning $7(1) = 7\ \mathrm{W}$, an efficiency of 41.7% (41.5% once $I_Q = 5\ \mathrm{mA}$ is counted). That 7 W is the real design limit, and it is a thermal problem: $$T_j = T_a + P_D\theta_{JA}, \qquad \theta_{JA} = \theta_{JC} + \theta_{CS} + \theta_{SA}.$$ A bare TO-220 has $\theta_{JA} \approx 65\ ^\circ\mathrm{C/W}$, so 7 W would push the junction 455 C above ambient and the thermal shutdown (about 150-175 C) trips within seconds. The design move is to solve for the heatsink instead: $\theta_{SA} \le (T_{j,max} - T_a)/P_D - \theta_{JC} - \theta_{CS}$, which for $T_{j,max} = 125\ ^\circ\mathrm{C}$, $T_a = 40\ ^\circ\mathrm{C}$, $\theta_{JC} = 5$ and $\theta_{CS} = 1.5\ ^\circ\mathrm{C/W}$ demands $\theta_{SA} \le 5.6\ ^\circ\mathrm{C/W}$ for the 12 V to 5 V case.

**Specifications, capacitors and the switching preregulator.** *Line regulation* is $\Delta V_o/\Delta V_{in}$, quoted in mV/V or %/V, so a 0.01%/V part shifts only $0.01\%\times12\ \mathrm{V}\times3\ \mathrm{V} = 3.6\ \mathrm{mV}$ for a 3 V input change on a 12 V output. *Load regulation* is $\Delta V_o/\Delta I_o$, often mV/A over a stated current range; 25 mV/A over a 1 A swing is 25 mV of DC shift, not 25 mV per mA. *Ripple rejection* is a dB figure at a stated frequency, and 80 dB at 120 Hz means $10^4$ of attenuation, turning 1 V rms of input ripple into 100 uV at the output. Stability needs capacitors: an input bypass (0.33 uF) when the regulator is far from the rectifier, 0.1-1 uF at the output, and for an LM317 also $C_{out} \ge 1\ \mu\mathrm{F}$ plus an ADJ bypass; if the output capacitor is large, protection diodes are required so that it cannot back-feed and reverse-bias the pass device when the input collapses. When the input-to-output drop is large, the answer is a **switching preregulator**: a buck stage drops 12 V to about 6.5 V at 90% efficiency, after which the linear stage burns only $(6.5 - 5)(1) = 1.5\ \mathrm{W}$. The pair then delivers 5 W from 7.22 W (69.2%) instead of 12 W (41.7%), with the same clean output - the heat in the pass device falls from 7 W to 1.5 W.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Adjustable three-terminal output | $V_o = V_{ref}\left(1 + \frac{R_2}{R_1}\right)$ | R_1 from OUT to ADJ, R_2 from ADJ to ground. LM317/LM338 style with V_ref = 1.25 V; solve R_2 = R_1(V_o/V_ref - 1) and add the I_ADJ R_2 term for exact work. |
| ADJ-pin current error | $\Delta V_o = I_{ADJ}R_2$ | I_ADJ is about 50 uA on an LM317. With R_2 = 1.5 kohm the error is 75 mV - more than the 1% reference tolerance, and it always raises the output. |
| Efficiency | $\eta = \frac{P_o}{P_{in}} = \frac{V_oI_o}{V_{in}(I_o + I_Q)} \approx \frac{V_o}{V_{in}}$ | Set by the voltage ratio alone, independent of load current. 12 V to 5 V is 41.7% (41.5% with I_Q = 5 mA). |
| Pass-device dissipation | $P_D = (V_{in} - V_o)I_o + V_{in}I_Q \approx (V_{in} - V_o)I_o$ | The dominant design limit. 12 V in, 5 V out at 1 A gives 7 W; the quiescent term adds only 60 mW at 5 mA. |
| Junction temperature | $T_j = T_a + P_D(\theta_{JC} + \theta_{CS} + \theta_{SA})$ | Keep T_j at or below 125 C (150 C absolute). A bare TO-220 has theta_JA about 65 C/W; theta_CS is 1-2 C/W with grease. |
| Required heatsink | $\theta_{SA} \le \frac{T_{j,max} - T_a}{P_D} - \theta_{JC} - \theta_{CS}$ | Find P_D first, then the allowable heatsink. 7 W with T_j,max = 125 C at T_a = 40 C allows 12.1 C/W total, i.e. about 5.6 C/W for the sink. |
| Minimum input for regulation (dropout) | $V_{in,min} = V_o + V_{do}$ | About 2 V for a classic 7805, 0.3-1.5 V for an LDO. Add the input ripple trough, or the output drops out at 120 Hz. |
| Ripple rejection | $V_{ripple,o} = \frac{V_{ripple,in}}{10^{RR/20}}$ | RR in dB at a stated frequency (usually 120 Hz). 80 dB turns 1 V rms of input ripple into 100 uV rms at the output. |

## Worked Problems

### P1. A 5 V fixed regulator runs from 12 V and delivers 1 A with a quiescent current of 5 mA. Find the output power, the input power, the efficiency, and the dissipation in the pass device.

**Given:** V_in = 12 V; V_o = 5 V; I_o = 1 A; I_Q = 5 mA

**Solution:**

1. P_o = V_o I_o = 5(1) = 5.00 W
2. I_in = I_o + I_Q = 1.000 + 0.005 = 1.005 A, so P_in = V_in I_in = 12(1.005) = 12.06 W
3. Efficiency eta = P_o/P_in = 5.00/12.06 = 0.4146 = 41.5% (the ideal V_o/V_in = 5/12 = 41.7%)
4. Pass-device dissipation P_D = (V_in - V_o) I_o = (12 - 5)(1) = 7.00 W
5. Adding the quiescent term V_in I_Q = 12(0.005) = 0.060 W gives 7.06 W total removed as heat

> [!success]- Answer
> **$P_o = 5.00\ \mathrm{W}$, $P_{in} = 12.06\ \mathrm{W}$, $\eta = 41.5\%$, $P_D = 7.00\ \mathrm{W}$ (7.06 W including the quiescent term).**

> [!warning] Trap
> Quoting 41.7% and 7.00 W as exact. The quiescent current adds 60 mW here, but the same mistake is decisive at low load: with $I_o = 10\ \mathrm{mA}$ and $I_Q = 5\ \mathrm{mA}$ a third of the input current goes to the regulator itself and the real efficiency is nowhere near $V_o/V_{in}$.

### P2. An LM317-style regulator must supply 9.00 V with $R_1 = 240\ \Omega$. Find $R_2$ for the exact value, the output when the standard 1.5 kohm resistor is used, the shift caused by $I_{ADJ} = 50\ \mu\mathrm{A}$, and the dissipation when $V_{in} = 12\ \mathrm{V}$ and $I_o = 0.5\ \mathrm{A}$.

**Given:** V_ref = 1.25 V; V_o = 9.00 V; R_1 = 240 ohm; I_ADJ = 50 uA; V_in = 12 V; I_o = 0.5 A

**Solution:**

1. R_2 = R_1(V_o/V_ref - 1) = 240(9.00/1.25 - 1) = 240(7.20 - 1) = 240(6.20) = 1488 ohm
2. With the standard 1.5 kohm: V_o = 1.25(1 + 1500/240) = 1.25(1 + 6.25) = 1.25(7.25) = 9.06 V
3. ADJ current term: I_ADJ R_2 = 50e-6(1500) = 0.075 V, so the real output is about 9.06 + 0.08 = 9.14 V
4. Dissipation: P_D = (V_in - V_o) I_o = (12 - 9.06)(0.5) = 2.94(0.5) = 1.47 W
5. With theta_JA = 50 C/W for a small tab, the rise is 1.47(50) = 73.5 C above ambient, so a heatsink is needed above roughly 40 C ambient

> [!success]- Answer
> **$R_2 = 1488\ \Omega$ (use 1.5 kohm giving 9.06 V, or 9.14 V once the 75 mV ADJ term is included); $P_D = 1.47\ \mathrm{W}$, rising 73.5 C on a 50 C/W path.**

> [!warning] Trap
> Swapping the divider: $V_o = 1.25(1 + R_1/R_2) = 1.25(1 + 240/1500) = 1.45\ \mathrm{V}$ - a 6x error. $R_1$ is the resistor that carries the 1.25 V reference (OUT to ADJ) and $R_2$ goes from ADJ to ground.

### P3. A 7805 dissipates 5.25 W from 12 V in at 0.75 A. With $T_a = 35\ ^\circ\mathrm{C}$, $T_{j,max} = 125\ ^\circ\mathrm{C}$, $\theta_{JC} = 5\ ^\circ\mathrm{C/W}$ and $\theta_{CS} = 1.5\ ^\circ\mathrm{C/W}$, find the required heatsink and show what happens with no heatsink.

**Given:** V_in = 12 V; V_o = 5 V; I_o = 0.75 A; T_a = 35 C; T_j,max = 125 C; theta_JC = 5 C/W; theta_CS = 1.5 C/W; bare theta_JA = 65 C/W

**Solution:**

1. P_D = (V_in - V_o) I_o = (12 - 5)(0.75) = 5.25 W
2. Allowable rise: T_j,max - T_a = 125 - 35 = 90 C, so theta_JA <= 90/5.25 = 17.1 C/W
3. Heatsink: theta_SA <= 17.1 - 5 - 1.5 = 10.6 C/W, so pick a sink rated 10 C/W or better
4. With no heatsink (theta_JA = 65 C/W): T_j = 35 + 5.25(65) = 35 + 341 = 376 C
5. The junction limit is 125 C absolute, and the thermal shutdown trips near 150 C, so the bare package cannot survive 5.25 W

> [!success]- Answer
> **$P_D = 5.25\ \mathrm{W}$, $\theta_{JA} \le 17.1\ ^\circ\mathrm{C/W}$, so choose $\theta_{SA} \le 10.6\ ^\circ\mathrm{C/W}$; a bare TO-220 would compute to $T_j = 376\ ^\circ\mathrm{C}$.**

> [!warning] Trap
> Designing against $\theta_{JC} = 5\ ^\circ\mathrm{C/W}$ instead of the full junction-to-ambient path. That gives only a 26 C rise and 'passes' with no heatsink, but the real $\theta_{JA}$ of a bare package is about 65 C/W and the regulator shuts down.

### P4. A 12 V rail must supply 5 V at 1 A. Compare a plain linear regulator with the same regulator preceded by a buck preregulator that produces 6.5 V at 90% efficiency. Find the total efficiency, the input current and the heat in the pass device for both.

**Given:** V_in = 12 V; V_pre = 6.5 V; V_o = 5 V; I_o = 1 A; preregulator efficiency = 90%

**Solution:**

1. Buck input power = V_pre I_o/eta_sw = 6.5(1)/0.90 = 7.22 W, so the current drawn from 12 V is 7.22/12 = 0.602 A
2. Linear stage dissipation = (V_pre - V_o) I_o = (6.5 - 5)(1) = 1.50 W instead of (12 - 5)(1) = 7.00 W
3. Total efficiency = P_o/P_in = 5.00/7.22 = 0.692 = 69.2%
4. Formula check: eta_total = eta_sw x V_o/V_pre = 0.90 x 5/6.5 = 0.692
5. Heat removed from the pass device: 7.00 - 1.50 = 5.50 W, and the 12 V input current falls from 1.00 A to 0.602 A

> [!success]- Answer
> **$\eta_{total} = 69.2\%$; the pass device burns 1.50 W instead of 7.00 W and the supply draws 0.602 A instead of 1.00 A from the 12 V rail.**

> [!warning] Trap
> Adding the efficiencies (0.90 + 0.417) or multiplying the regulator's $V_o/V_{in}$ by the preregulator's efficiency ($0.90 \times 0.417 = 37.5\%$). The linear stage sees 6.5 V, not 12 V, so the correct combination is $\eta_{sw}V_o/V_{pre} = 0.9 \times 5/6.5$.

### P5. A 7805 has $V_{do} = 2\ \mathrm{V}$ and $I_Q = 5\ \mathrm{mA}$. Find the minimum input voltage, the dissipation and efficiency at that input for a 1 A load, and compare with running from 12 V. What happens at 6 V in?

**Given:** V_o = 5 V; V_do = 2 V; I_o = 1 A; I_Q = 5 mA; V_in = 12 V

**Solution:**

1. Minimum input: V_in,min = V_o + V_do = 5 + 2 = 7.0 V
2. At V_in = 7 V: I_in = 1.005 A, P_in = 7(1.005) = 7.035 W, eta = 5.00/7.035 = 0.711 = 71.1%
3. Dissipation at 7 V: P_D = (7 - 5)(1) = 2.00 W (plus V_in I_Q = 35 mW)
4. At V_in = 12 V: P_D = (12 - 5)(1) = 7.00 W and eta = 5.00/12.06 = 0.415 = 41.5%
5. Running at the dropout limit therefore saves 5.00 W of heat and raises efficiency from 41.5% to 71.1%
6. At V_in = 6 V the pass device leaves regulation and the output falls to about V_o = V_in - V_do = 4 V, with the input ripple passing straight through

> [!success]- Answer
> **$V_{in,min} = 7.0\ \mathrm{V}$; at 7 V in the dissipation is 2.00 W and $\eta = 71.1\%$, against 7.00 W and 41.5% at 12 V. At 6 V in the output collapses to about 4 V.**

> [!warning] Trap
> Assuming a 7805 regulates from any input above 5 V. With 2 V of dropout a 6 V input gives about 4 V out, and a supply designed with exactly 7 V of input must add headroom for the 120 Hz ripple trough or the output drops out twice per cycle.

## Traps & Exam Notes

- **Expecting more than $V_o/V_{in}$ efficiency.** A 12 V to 5 V linear regulator cannot beat 41.7%, so 1 A at 5 V always means at least 7 W of heat; an 80%-efficient requirement means the topology has to change to a switching preregulator.
- **Swapping $R_1$ and $R_2$ in the adjustable formula.** $1.25(1 + 240/1500) = 1.45\ \mathrm{V}$ instead of $1.25(1 + 1500/240) = 9.06\ \mathrm{V}$ - a 6x error that no amount of trimming recovers.
- **Ignoring the $I_{ADJ}R_2$ term.** 50 uA through 1.5 kohm is 75 mV, larger than the 1% tolerance on a 9 V output, and it always pushes the output high.
- **Sizing the heatsink from $\theta_{JC}$ alone.** 5 C/W looks safe for 7 W (a 35 C rise), but a bare TO-220 has $\theta_{JA}$ near 65 C/W, giving $T_j = T_a + 455\ ^\circ\mathrm{C}$ and an immediate thermal shutdown.
- **Treating the dropout voltage as zero.** A 7805 with $V_{do} = 2\ \mathrm{V}$ fed from 6 V delivers about 4 V, and an LDO with 1.5 V of dropout cannot hold 5 V from a 7 V rail that carries 1 V of ripple.
- **Forgetting the capacitors.** An LM317 without $C_{out} \ge 1\ \mu\mathrm{F}$, or with an unbypassed ADJ pin, oscillates; a large output capacitor also needs a protection diode to ground so it cannot reverse-bias the pass device when the input collapses.
- **Using a zener shunt regulator for a 1 A load.** The zener must sink the load current plus its own bias current, so its efficiency is at best $V_o/V_{in}$ and at its worst at no load, where all the current goes into the zener.
- **Reading load regulation in the wrong units.** 25 mV/A over a 1 A swing is 25 mV of DC shift; treating it as 25 mV/mA predicts a 25 V error and hides the real problem, which is usually the wiring resistance between the regulator and the load.

## See Also

- [[08_Zener_Diodes_and_Shunt_Regulators]]
- [[02_Linear_Op-Amp_Circuits]]
- [[02_Thermal_Resistance_and_Heat_Sinking]]
- [[04_Buck_Converter]]
- [[06_Filters,_Ripple_Factor_and_PIV]]

---

[[08_PWM_Techniques|⬅ 08]] · [[_MOC_Power_Electronics_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
