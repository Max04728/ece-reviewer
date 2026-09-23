---
id: ECE-06-02
title: "Thermal Resistance and Heat Sinking"
part: "02_Electronics_Engineering"
area: "06_Power_Electronics_and_Systems"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]", "[[12_MOSFET_Types_and_Regions]]"]
tags: ["ece", "electronics_engineering", "power_electronics_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Thermal Resistance and Heat Sinking

> [!abstract] Scope
> Predict junction temperature from device loss and thermal resistances, and size the heat sink that keeps the junction below its maximum rating.

## Core Concept

> [!tip] Intuition
> Heat flows from the tiny silicon die to the case, through an insulating washer and grease film into the metal sink, and finally into the air — exactly like current flowing through series resistors from a temperature source to ambient. Each stage is a thermal resistor measured in degrees Celsius per watt.

**The thermal circuit is Ohm's law with new units.** Heat is current, temperature difference is voltage, and thermal resistance $\theta$ (degrees Celsius per watt) is resistance. The junction sits at the top of this ladder, so the steady-state rise is $T_j-T_a=P_D\,\theta_{JA}$ where the total path splits into three series pieces:
$$\theta_{JA}=\theta_{JC}+\theta_{CS}+\theta_{SA}$$
$\theta_{JC}$ is fixed by the package and its die attach and is quoted in the datasheet (a TO-220 power MOSFET is typically $1.0$ to $1.5\ ^\circ\mathrm{C/W}$, a TO-247 about $0.5\ ^\circ\mathrm{C/W}$, a bare die or a large IGBT module lower still). $\theta_{CS}$ is the case-to-sink interface, set by the mounting hardware and the thermal interface material: about $0.5\ ^\circ\mathrm{C/W}$ for a mica washer with silicone compound, $0.3$ to $0.4\ ^\circ\mathrm{C/W}$ for a thin greased metal or silicone pad, and $1.0$ to $1.5\ ^\circ\mathrm{C/W}$ for a dry pad. $\theta_{SA}$ belongs to the heat sink and its airflow, and it is the one number the designer gets to choose. Because the pieces are in series, the largest one dominates — bolting a 1 C/W sink onto a device whose interface is 1.5 C/W wastes the sink.

**Sizing the sink is a single algebraic inversion.** Start from $T_j=T_a+P_D\theta_{JA}$ with $\theta_{JA}=\theta_{JC}+\theta_{CS}+\theta_{SA}$, solve for the sink, and require the junction not to exceed its maximum:
$$\theta_{SA}=\dfrac{T_{j(max)}-T_a}{P_D}-\theta_{JC}-\theta_{CS}$$
Every term must be a worst case, because a single optimistic input destroys the result. Use the maximum expected ambient (inside a closed cabinet, not the air-conditioned bench), the maximum loss at the hot junction temperature, and the maximum $T_{j(max)}$ — which is $150\ ^\circ\mathrm{C}$ for most silicon, $175\ ^\circ\mathrm{C}$ for some MOSFETs, and must be derated for reliability. Note the sign of the answer: a negative $\theta_{SA}$ is not a small sink, it is proof that the loss or the ambient is already fatal with no sink at all. Push the same algebra forward and you get the other exam question: given the sink, find $T_j$ by simply adding up the series drops, $T_j=T_a+P_D(\theta_{JC}+\theta_{CS}+\theta_{SA})$.

**Derating and the maximum-power curve.** Datasheets plot a maximum power dissipation derating curve: the rated $P_D$ at $25\ ^\circ\mathrm{C}$ case, falling linearly to zero at $T_{j(max)}$. The line is the reciprocal of $\theta_{JC}$ — $P_{D(max)}=\dfrac{T_{j(max)}-T_C}{\theta_{JC}}$ — so a device rated $50\ \mathrm{W}$ at $T_C=25\ ^\circ\mathrm{C}$ with $T_{j(max)}=150\ ^\circ\mathrm{C}$ has $\theta_{JC}=2.5\ ^\circ\mathrm{C/W}$ and only $10\ \mathrm{W}$ at $T_C=125\ ^\circ\mathrm{C}$. That curve, not the headline number, is the real rating. The same logic says something important for paralleled devices: MOSFETs share current in proportion to their hot $R_{DS(on)}$, and the device that runs hotter takes *less* current, which is self-correcting; but a BJT or IGBT carrying a constant current at a temperature above the point where its $V_{CE(sat)}$ has a negative temperature coefficient will take *more* current as it heats, which is thermal runaway. Any paralleled current-driven device therefore needs an emitter ballast resistor, matched mounting torque and identical sink coupling.

**Transients and the traps.** The steady-state ladder ignores heat capacity, so it is the *safe* answer for continuous operation; for pulses shorter than the thermal time constant (typically $1$ to $100\ \mathrm{ms}$) the transient thermal impedance $Z_{th}(t)$ — the datasheet's single-pulse curve — is much smaller than $\theta_{JC}$ and using it gives a far smaller rise, so do not use $Z_{th}$ for a DC rating or $\theta_{JC}$ for a 10 microsecond pulse. The recurring exam failures are unit and endpoint errors: mica washes with two interfaces, so $\theta_{CS}$ counts the washer *and* both grease films; the sink's $\theta_{SA}$ collapses if you forget the fan curve (natural convection can be ten times worse than forced air); and multiplying $P_D$ by $\theta$ in the wrong direction, or adding $T_a$ to the loss instead of to the rise.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Junction temperature | $T_j=T_a+P_D\,\theta_{JA}$ | Steady state only. P_D in watts, theta in C/W, so the product is a temperature rise in C added to ambient. |
| Series thermal path | $\theta_{JA}=\theta_{JC}+\theta_{CS}+\theta_{SA}$ | Junction-to-case + case-to-sink + sink-to-ambient. All three must be present; the datasheet gives only the first. |
| Required heat sink | $\theta_{SA}=\frac{T_{j(max)}-T_a}{P_D}-\theta_{JC}-\theta_{CS}$ | The sizing formula. Must come out positive; a negative value means the design cannot work with any sink. |
| Max dissipation from case temp | $P_{D(max)}=\frac{T_{j(max)}-T_C}{\theta_{JC}}$ | The derating line: it is the reciprocal-slope straight line on the datasheet power-derating curve. |
| Max dissipation from ambient | $P_{D(max)}=\frac{T_{j(max)}-T_a}{\theta_{JC}+\theta_{CS}+\theta_{SA}}$ | Worst-case ambient, and only valid for the airflow the sink curve was measured at. |
| Transient rise | $T_j=T_a+P_D\,Z_{th}(t)$ | Z_th(t) is the transient thermal impedance from the pulse curve; use it only for pulses shorter than the thermal time constant, never for DC. |
| Thermal ohm's law (analogy) | $\Delta T=P_D\,\theta$ | Heat flow is current, temperature difference is voltage, theta is resistance. Series paths add; parallel paths combine as reciprocal sums. |
| MOSFET loss at the hot junction | $P_D=I_D^2\,R_{DS(on)}(T_j)+P_{sw}$ | P must be evaluated at the temperature it produces; iterate once or twice because R_DS(on) roughly doubles by 150 C. |

## Worked Problems

### P1. A power MOSFET dissipates $3\ \mathrm{W}$ and is bolted through a mica washer and compound to a heat sink of $\theta_{SA}=8\ ^\circ\mathrm{C/W}$. The device has $\theta_{JC}=1.5\ ^\circ\mathrm{C/W}$ and the interface is $\theta_{CS}=0.5\ ^\circ\mathrm{C/W}$. Ambient is $40\ ^\circ\mathrm{C}$. Find the junction temperature and say whether it passes a $150\ ^\circ\mathrm{C}$ limit.

**Given:** P_D = 3 W; theta_SA = 8 C/W; theta_JC = 1.5 C/W; theta_CS = 0.5 C/W; T_a = 40 C; T_j,max = 150 C

**Solution:**

1. Total path: $\theta_{JA}=1.5+0.5+8.0=10.0\ ^\circ\mathrm{C/W}$.
2. Rise: $\Delta T=P_D\theta_{JA}=(3)(10.0)=30\ ^\circ\mathrm{C}$.
3. Junction: $T_j=40+30=70\ ^\circ\mathrm{C}$.
4. Margin: $150-70=80\ ^\circ\mathrm{C}$ of headroom, so at 3 W the sink could be much smaller.

> [!success]- Answer
> **$T_j=70\ ^\circ\mathrm{C}$, comfortably inside the $150\ ^\circ\mathrm{C}$ limit with an $80\ ^\circ\mathrm{C}$ margin.**

> [!warning] Trap
> Adding $T_a$ to the sink's temperature instead of to the rise, or using $\theta_{JC}$ alone as if the package touched ambient. With $\theta_{JC}=1.5$ only, the naive answer would be $T_j=44.5\ ^\circ\mathrm{C}$ — 25 C optimistic.

### P2. The same device must dissipate $25\ \mathrm{W}$ with $T_a=40\ ^\circ\mathrm{C}$, $\theta_{JC}=1.5\ ^\circ\mathrm{C/W}$, $\theta_{CS}=0.5\ ^\circ\mathrm{C/W}$ and $T_{j(max)}=150\ ^\circ\mathrm{C}$. What heat sink is required, and is it available?

**Given:** P_D = 25 W; T_j,max = 150 C; T_a = 40 C; theta_JC = 1.5 C/W; theta_CS = 0.5 C/W

**Solution:**

1. Allowed rise: $T_{j(max)}-T_a=150-40=110\ ^\circ\mathrm{C}$.
2. Total allowed resistance: $110/25=4.4\ ^\circ\mathrm{C/W}$.
3. Subtract the fixed drops: $\theta_{SA}=4.4-1.5-0.5=2.4\ ^\circ\mathrm{C/W}$.
4. A $2.4\ ^\circ\mathrm{C/W}$ natural-convection sink is a large extruded fin block; if only a $6\ ^\circ\mathrm{C/W}$ sink is on hand, forced air or a larger package is required.

> [!success]- Answer
> **$\theta_{SA}\le2.4\ ^\circ\mathrm{C/W}$, which needs a substantial (roughly 100 mm finned, natural convection) heat sink — a small clip-on tab sink of $10\ ^\circ\mathrm{C/W}$ fails.**

> [!warning] Trap
> Computing $110/25=4.4\ ^\circ\mathrm{C/W}$ and ordering a 4.4 C/W sink. The interface and junction resistances are already inside that budget, so the sink itself may only be 2.4 C/W.

### P3. A device has $T_{j(max)}=150\ ^\circ\mathrm{C}$ and is rated $P_D=50\ \mathrm{W}$ at $T_C=25\ ^\circ\mathrm{C}$. Find $\theta_{JC}$, the derating slope, and the allowed dissipation at $T_C=100\ ^\circ\mathrm{C}$.

**Given:** P_D(25 C) = 50 W; T_j,max = 150 C; T_C = 100 C

**Solution:**

1. From $P_{D(max)}=(T_{j(max)}-T_C)/\theta_{JC}$: $\theta_{JC}=(150-25)/50=2.5\ ^\circ\mathrm{C/W}$.
2. The derating curve is a straight line from 50 W at 25 C to 0 W at 150 C, slope $-50/125=-0.4\ \mathrm{W}/^\circ\mathrm{C}$.
3. At $T_C=100\ ^\circ\mathrm{C}$: $P_{D(max)}=(150-100)/2.5=20\ \mathrm{W}$.
4. Check with the slope: $50-0.4(100-25)=50-30=20\ \mathrm{W}$.

> [!success]- Answer
> **$\theta_{JC}=2.5\ ^\circ\mathrm{C/W}$ and $P_{D(max)}=20\ \mathrm{W}$ at $T_C=100\ ^\circ\mathrm{C}$ — 40 percent of the headline rating.**

> [!warning] Trap
> Quoting the 50 W rating at an actual case temperature of 100 C. The headline number only holds with the case held at 25 C, which in a real design needs an enormous sink or a cold plate.

### P4. Two IGBTs are paralleled, each carrying $5\ \mathrm{A}$ nominally, with an emitter ballast of $0.1\ \Omega$ each and $V_{CE(sat)}$ that falls $2\ \mathrm{mV}$ per $^\circ\mathrm{C}$. If one die is $20\ ^\circ\mathrm{C}$ hotter, estimate the current imbalance before and after ballasting, and explain thermal runaway.

**Given:** I per device = 5 A; R_ballast = 0.1 Ohm; dV_CE/dT = -2 mV/C; delta T = 20 C

**Solution:**

1. Unballasted, at a fixed $V_{CE}$ the hotter device's drop falls by $(2\ \mathrm{mV}/^\circ\mathrm{C})(20\ ^\circ\mathrm{C})=40\ \mathrm{mV}$, so it demands more current instead of less — positive feedback.
2. With $0.1\ \Omega$ ballast, an extra $1\ \mathrm{A}$ of hogging adds $0.1\ \mathrm{V}=100\ \mathrm{mV}$ of drop, which is 2.5 times the $40\ \mathrm{mV}$ the temperature coefficient gave away.
3. The ballast therefore overrides the negative coefficient and restores stable sharing; the residual imbalance is roughly $40\ \mathrm{mV}/0.1\ \Omega=0.4\ \mathrm{A}$, about 8 percent.
4. Dissipation check: $5.4^2(0.1)=2.92\ \mathrm{W}$ in the ballast resistor alone, which must itself be rated for it.

> [!success]- Answer
> **Unballasted the hot device runs away; with $0.1\ \Omega$ per emitter the imbalance is held to about $0.4\ \mathrm{A}$ (8 percent) at a cost of about $2.9\ \mathrm{W}$ per ballast resistor.**

> [!warning] Trap
> Assuming a negative $V_{CE(sat)}$ temperature coefficient makes paralleling safe by itself. Negative coefficient means the hotter die takes *more* current, which is positive feedback; the ballast resistor, not the device, is what stops it.

### P5. A MOSFET carries a 100 microsecond current pulse of $30\ \mathrm{A}$ through hot $R_{DS(on)}=60\ \mathrm{m}\Omega$. The single-pulse transient thermal impedance at $100\ \mu\mathrm{s}$ is $Z_{th}=0.05\ ^\circ\mathrm{C/W}$ and $\theta_{JC}=1.5\ ^\circ\mathrm{C/W}$. Compare the predicted rise with the DC calculation and state which is valid.

**Given:** I_D = 30 A; R_DS(on) = 60 mOhm; t_pulse = 100 us; Z_th(100us) = 0.05 C/W; theta_JC = 1.5 C/W

**Solution:**

1. Energy per pulse: $P_D=I^2R=(30)^2(0.060)=54\ \mathrm{W}$ during the pulse.
2. Transient rise into the die: $\Delta T=54\times0.05=2.7\ ^\circ\mathrm{C}$ per pulse.
3. Same 54 W treated as DC into the die: $\Delta T=54\times1.5=81\ ^\circ\mathrm{C}$ — a 30-fold overestimate of the per-pulse rise.
4. The transient value is valid only because the pulse (100 us) is far shorter than the thermal time constant; at 1 percent duty the average loss is $0.54\ \mathrm{W}$ and the steady-state rise is $0.54(1.5+0.5+\theta_{SA})$, which governs the heatsink.

> [!success]- Answer
> **Per-pulse rise is only $2.7\ ^\circ\mathrm{C}$ using $Z_{th}$, but the *average* 0.54 W still sets the steady junction temperature through the full $\theta_{JA}$ ladder.**

> [!warning] Trap
> Using $\theta_{JC}$ for a short pulse (predicting 81 C of rise and rejecting a perfectly good design) or using $Z_{th}$ for the DC average (predicting a cold junction and undersizing the sink).

## Traps & Exam Notes

- **Forgetting $\theta_{CS}$ exists.** A mica washer plus compound is about $0.5\ ^\circ\mathrm{C/W}$, a dry pad $1.0$ to $1.5\ ^\circ\mathrm{C/W}$; omitting it from a $25\ \mathrm{W}$ design makes the predicted junction $12.5$ to $37.5\ ^\circ\mathrm{C}$ cooler than reality.
- **Using the 25 $^\circ$C power rating.** A $50\ \mathrm{W}$ device at $T_C=25\ ^\circ\mathrm{C}$ with $\theta_{JC}=2.5\ ^\circ\mathrm{C/W}$ is only $20\ \mathrm{W}$ at $T_C=100\ ^\circ\mathrm{C}$; the derating line, not the headline number, is the rating.
- **Quoting a sink's $\theta_{SA}$ without its airflow.** A $2\ ^\circ\mathrm{C/W}$ forced-air sink can be $15$ to $20\ ^\circ\mathrm{C/W}$ in still air, so a design checked on the bench passes and fails inside a sealed cabinet at $50\ ^\circ\mathrm{C}$ ambient.
- **Using $\theta_{JC}$ for a microsecond pulse.** For a $100\ \mu\mathrm{s}$, $54\ \mathrm{W}$ pulse the transient impedance is $0.05\ ^\circ\mathrm{C/W}$ giving a $2.7\ ^\circ\mathrm{C}$ rise; using $1.5\ ^\circ\mathrm{C/W}$ predicts $81\ ^\circ\mathrm{C}$ and wrongly condemns the design.
- **Paralleling current-driven devices without ballast.** With $dV_{CE(sat)}/dT=-2\ \mathrm{mV}/^\circ\mathrm{C}$ a die $20\ ^\circ\mathrm{C}$ hotter gives away $40\ \mathrm{mV}$ and hogs current — positive feedback that only a $0.1\ \Omega$ emitter resistor (worth $100\ \mathrm{mV}$ per amp) can break.
- **Sizing the sink from a loss computed at 25 $^\circ$C.** MOSFET conduction loss uses $R_{DS(on)}$ at the hot junction, which is roughly double the 25 C value; a $3\ \mathrm{W}$ cold loss becomes about $5.4\ \mathrm{W}$ hot and needs $\theta_{SA}$ recalculated.

## See Also

- [[01_Power_Switches_MOSFET,_IGBT,_GTO,_TRIAC]]
- [[09_Temperature_Sensors]]
- [[09_Linear_Voltage_Regulators]]
- [[15_Power_Amplifiers_Classes_A,_B,_AB,_C]]

---

[[01_Power_Switches_MOSFET,_IGBT,_GTO,_TRIAC|⬅ 01]] · [[_MOC_Power_Electronics_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[03_SCR_Phase-Controlled_Rectifiers|03 ➡]]
