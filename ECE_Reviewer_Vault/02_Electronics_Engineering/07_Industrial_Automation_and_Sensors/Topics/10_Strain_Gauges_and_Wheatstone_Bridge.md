---
id: ECE-07-10
title: "Strain Gauges and Wheatstone Bridge"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Thevenin_and_Norton_Equivalents]]", "[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Strain Gauges and Wheatstone Bridge

> [!abstract] Scope
> Convert mechanical strain into a bridge output voltage, choose the quarter, half or full bridge configuration, and account for the nonlinearity, lead resistance and temperature errors that limit the measurement.

## Core Concept

> [!tip] Intuition
> A bonded foil gauge stretches with the surface it is glued to, and stretching a conductor makes it longer and thinner, so its resistance rises. One gauge in a bridge produces a millivolt-level imbalance; two or four gauges wired so that their changes add quadruple the signal and cancel temperature drift at the same time.

**The gauge and its factor.** A metallic foil strain gauge is a conductor whose resistance changes when it is strained: the gauge factor is $GF = (\Delta R/R)/\varepsilon$, where $\varepsilon$ is the fractional length change. Foil gauges have $GF \approx 2.0$ (the value is dominated by the change in geometry rather than in resistivity), while semiconductor gauges reach 100-200 at the cost of enormous temperature sensitivity and fragility. Because $\varepsilon$ is small — a typical measurement is 1000 microstrain, $\varepsilon = 0.001$ — a 350 Ω gauge changes by only $350 \times 2 \times 0.001 = 0.7\ \mathrm{\Omega}$, which is why the bridge and a high-gain differential amplifier are inseparable from the gauge.

**The Wheatstone bridge.** Two dividers driven from the same excitation produce $V_o = V_{ex}\left(\frac{R_3}{R_3+R_4} - \frac{R_2}{R_1+R_2}\right)$, which is zero when $R_1R_4 = R_2R_3$. A single active gauge in the bridge — the quarter-bridge configuration — unbalances it by $\Delta R$ and produces $V_o = V_{ex}\Delta R/(4R + 2\Delta R) \approx \frac{V_{ex}}{4}GF\varepsilon$. The factor of four is the first thing an exam punishes: the bridge divides the gauge's fractional change by four, so a 1000 µε strain on a 10 V bridge gives only 5 mV. Adding gauges multiplies the signal: two gauges in adjacent arms strained oppositely (half bridge) give $\frac{V_{ex}}{2}GF\varepsilon$, and four gauges, two in tension and two in compression (full bridge), give $V_{ex}GF\varepsilon$ — four times the quarter-bridge output for the same strain.

**Why the extra gauges are worth it.** A half or full bridge does more than quadruple the sensitivity. Temperature changes the gauge resistance and the test piece's dimensions, producing *apparent strain*; if a dummy gauge is mounted on an unstrained piece of the same material in the adjacent bridge arm, the temperature-driven resistance changes cancel in the bridge subtraction. A full bridge built from four active gauges also cancels the axial-versus-bending and Poisson effects in the intended way, and it cancels the bridge's own temperature coefficient of sensitivity, because all four elements drift together. The cost is mechanical: four gauges must be bonded and wired correctly, and one misoriented gauge turns a bending measurement into a tension measurement.

**Lead wires, excitation and nonlinearity.** Two-wire connection puts the lead resistance in series with the gauge: 1 Ω of lead against a 120 Ω gauge is $\Delta R/R = 0.0083$, which with $GF = 2$ appears as 4167 µε of strain — thousands of times the real signal. Three-wire connection puts one lead in each bridge arm so the drops cancel, and four-wire (Kelvin) connection removes them entirely, which is why industrial transmitters specify the wiring scheme. Excitation must be chosen against self-heating: a 120 Ω gauge on a 10 V bridge would dissipate 0.83 W and destroy itself, so 2-5 V (or a pulsed excitation) is normal for 120 Ω gauges and 5-10 V for 350 Ω. Finally, the linearized $V_{ex}GF\varepsilon/4$ is the first-order term of $V_{ex}\Delta R/(4R+2\Delta R)$: it is 0.1% low at 1000 µε but 1% low at 10 000 µε, so large-strain work needs the exact expression or the nonlinearity correction built into the instrument.

**From bridge to reading.** A 5 mV full-scale bridge output must be amplified to the ADC's full scale, so a gain of 1000 is typical, and that amplifier must be a differential or instrumentation amplifier — measuring the bridge output single-ended against ground includes the $V_{ex}/2$ common-mode pedestal and the ground noise. Shunt calibration verifies the whole chain: a precision resistor placed across one bridge arm changes the arm resistance by a known amount, which corresponds to a known equivalent strain, and the instrument should read that value. The complete error budget then combines gauge factor tolerance (typically 1%), bridge nonlinearity, lead resistance, amplifier offset and drift (which appear as offset strain), excitation accuracy and ADC quantization — and in a quarter bridge with no dummy gauge, thermal apparent strain usually dominates them all.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Gauge factor | $GF = \frac{\Delta R/R}{\varepsilon}$ | Foil gauges are about 2.0, semiconductor 100-200. Strain eps = (delta R/R)/GF; microstrain means 1e-6, so 1000 microstrain = 0.001. |
| Wheatstone bridge output | $V_o = V_{ex}\left(\frac{R_3}{R_3+R_4} - \frac{R_2}{R_1+R_2}\right)$ | General form for any bridge. Null when R1 R4 = R2 R3; the output is differential and sits on a V_ex/2 common-mode pedestal. |
| Quarter-bridge output | $V_o \approx \frac{V_{ex}}{4}GF\varepsilon$ | One active gauge. The bridge divides the gauge change by 4, so 1000 microstrain on 10 V gives only 5 mV. |
| Half-bridge output | $V_o \approx \frac{V_{ex}}{2}GF\varepsilon$ | Two active gauges in adjacent arms strained oppositely (one in tension, one in compression). Twice the quarter-bridge signal. |
| Full-bridge output | $V_o \approx V_{ex}\,GF\varepsilon$ | Four active gauges, two in tension and two in compression: four times the quarter-bridge signal and full temperature compensation. |
| Bridge nonlinearity (exact quarter bridge) | $V_o = V_{ex}\frac{\Delta R}{4R + 2\Delta R}$ | The exact expression. The linear form is 0.1% low at 1000 microstrain and about 1% low at 10000 microstrain. |
| Shunt-calibration resistance change | $\Delta R = -\frac{R^2}{R+R_{sh}}$ | A shunt across one arm lowers that arm's resistance. For R = 350 ohm and R_sh = 350 kohm, delta R = -0.3497 ohm. |
| Equivalent strain from a shunt | $\varepsilon_{eq} = \frac{\lvert\Delta R\rvert/R}{GF}$ | Verifies the whole signal chain without loading the specimen; 350 kohm across a 350 ohm, GF = 2 arm simulates 499 microstrain. |
| Lead-resistance error | $\varepsilon_{err} = \frac{R_{lead}}{R\,GF}$ | 1 ohm of lead in series with a 120 ohm, GF = 2 gauge is 4167 microstrain of apparent strain - hence three-wire or four-wire connection. |
| Amplifier gain for full scale | $G = \frac{V_{ADC,FS}}{V_{ex}\,GF\varepsilon_{FS}}$ | For a 5 mV full-scale bridge and a 5 V ADC the required gain is 1000, which makes offset drift a first-order error. |

## Worked Problems

### P1. A quarter-bridge strain gauge has $R = 350\ \mathrm{\Omega}$, $GF = 2.0$, and the bridge is excited with $10\ \mathrm{V}$. The strain is $1000\ \mu\varepsilon$. Find the resistance change, the approximate output, and the exact output.

**Given:** R = 350 ohm; GF = 2.0; V_ex = 10 V; strain = 1000 microstrain

**Solution:**

1. Delta R = R x GF x eps = 350 x 2 x 0.001 = 0.700 ohm
2. Approximate: V_o = (V_ex/4) GF eps = (10/4) x 2 x 0.001 = 5.000 mV
3. Exact: V_o = 10 x 0.7/(4 x 350 + 2 x 0.7) = 10 x 0.7/1401.4
4. V_o = 10 x 4.9950e-4 = 4.9950 mV
5. The linear approximation is 0.1% high

> [!success]- Answer
> **$\Delta R = 0.700\ \mathrm{\Omega}$, $V_o \approx 5.00\ \mathrm{mV}$ and exactly $4.995\ \mathrm{mV}$.**

> [!warning] Trap
> Using $V_o = V_{ex}GF\varepsilon$ and forgetting the quarter-bridge factor of 4. That mistake multiplies the answer by four and makes every downstream gain calculation wrong.

### P2. The same $GF = 2.0$ gauge system is excited at $5\ \mathrm{V}$ with $1000\ \mu\varepsilon$ strain. Compare the output for quarter, half and full bridge configurations.

**Given:** GF = 2.0; V_ex = 5 V; strain = 1000 microstrain

**Solution:**

1. Quarter bridge: V_o = (5/4) x 2 x 0.001 = 2.500 mV
2. Half bridge (two gauges, opposite strain): V_o = (5/2) x 2 x 0.001 = 5.000 mV
3. Full bridge (four gauges): V_o = 5 x 2 x 0.001 = 10.00 mV
4. Each additional pair of active arms doubles the signal

> [!success]- Answer
> **$2.50\ \mathrm{mV}$ (quarter), $5.00\ \mathrm{mV}$ (half), $10.0\ \mathrm{mV}$ (full).**

> [!warning] Trap
> Assuming a half bridge gives half of a full bridge's output *and* the same temperature compensation. The signal doubles, but the half bridge only cancels the effects of the two gauges it contains, so a dummy gauge must be placed to cancel thermal apparent strain.

### P3. A $120\ \mathrm{\Omega}$ foil gauge with $GF = 2.4$ changes resistance by $0.288\ \mathrm{\Omega}$ under load. Find the strain, and the stress if the material is steel with $E = 200\ \mathrm{GPa}$.

**Given:** R = 120 ohm; GF = 2.4; Delta R = 0.288 ohm; E = 200 GPa

**Solution:**

1. Delta R/R = 0.288/120 = 0.0024
2. eps = (Delta R/R)/GF = 0.0024/2.4 = 0.0010 = 1000 microstrain
3. sigma = E eps = 200e9 x 0.001
4. sigma = 200e6 Pa = 200 MPa

> [!success]- Answer
> **$\varepsilon = 1000\ \mu\varepsilon$ and $\sigma = 200\ \mathrm{MPa}$.**

> [!warning] Trap
> Reporting the strain as 0.0024 because the gauge factor was not divided out, or reporting microstrain as if it were the raw strain (1000 instead of 0.001) when computing stress.

### P4. A $350\ \mathrm{k\Omega}$ precision resistor is connected across one $350\ \mathrm{\Omega}$ bridge arm to simulate strain. The gauges have $GF = 2.0$ and the bridge is excited at $10\ \mathrm{V}$ in the quarter-bridge configuration. Find the equivalent strain and the output voltage produced.

**Given:** R = 350 ohm; R_sh = 350 kohm; GF = 2.0; V_ex = 10 V

**Solution:**

1. Shunted arm value = 350 x 350000/(350 + 350000) = 349.6503 ohm
2. Delta R = 349.6503 - 350 = -0.34965 ohm
3. |Delta R|/R = 0.34965/350 = 9.990e-4
4. eps_eq = 9.990e-4/2.0 = 4.995e-4 = 499.5 microstrain
5. V_o = (10/4) x 2.0 x 4.995e-4 = 2.4975 mV

> [!success]- Answer
> **$\varepsilon_{eq} = 499.5\ \mu\varepsilon$ producing $V_o = 2.498\ \mathrm{mV}$.**

> [!warning] Trap
> Adding the shunt resistor in parallel and treating the new value as $R - R_{sh}$. A $350\ \mathrm{k\Omega}$ shunt across a $350\ \mathrm{\Omega}$ arm changes it by only $0.35\ \mathrm{\Omega}$, a 0.1% change — which is exactly why shunt calibration is a delicate check of the full-scale chain.

### P5. A quarter-bridge load cell produces $5\ \mathrm{mV}$ at $1000\ \mu\varepsilon$ and must drive a 12-bit ADC with a $5\ \mathrm{V}$ reference at full scale. Find the required amplifier gain and the strain resolution per LSB.

**Given:** V_bridge = 5 mV at 1000 microstrain; ADC = 12-bit, 5 V reference; full scale = 5 V

**Solution:**

1. Required gain = 5 V/5 mV = 1000
2. 12-bit LSB = 5/4096 = 1.2207 mV at the ADC input
3. Referred to the bridge: 1.2207 mV/1000 = 1.2207 uV
4. 1 microstrain corresponds to 5 uV at the bridge
5. Resolution = 1.2207 uV / 5 uV per microstrain = 0.244 microstrain

> [!success]- Answer
> **A gain of 1000 gives $0.244\ \mu\varepsilon$ per LSB at 12 bits.**

> [!warning] Trap
> Imagining that a gain of 1000 makes the measurement easy. The same gain multiplies the amplifier's input offset: $50\ \mu\mathrm{V}$ of offset is 50 mV at the output, equal to 10 LSB and 10 microstrain of apparent load.

## Traps & Exam Notes

- **Forgetting the bridge factor.** Quarter is $V_{ex}GF\varepsilon/4$, half is $/2$ and full is $/1$. Using the quarter-bridge factor on a full bridge understates the output fourfold and makes the required gain four times too large.
- **Measuring the bridge single-ended.** The bridge output is a differential millivolt signal riding on a $V_{ex}/2$ common-mode pedestal, so a single-ended measurement includes the pedestal, the ground noise and any ground-loop voltage; a differential or instrumentation amplifier is mandatory.
- **Ignoring lead-wire resistance.** 1 Ω of copper in series with a 120 Ω, $GF = 2$ gauge appears as 4167 microstrain of apparent strain. Use three-wire connection (which cancels the lead drops in the adjacent arms) or four-wire Kelvin connection.
- **Using the linearized output at large strain.** $V_{ex}GF\varepsilon/4$ is 0.1% low at 1000 microstrain but about 1% low at 10 000 microstrain, because the exact expression carries $2\Delta R$ in the denominator.
- **Over-exciting a low-resistance bridge.** A 120 Ω gauge on a 10 V bridge would dissipate $V^2/R = 0.83\ \mathrm{W}$ and destroy itself; 2-5 V (or pulsed excitation) is normal for 120 Ω gauges and 5-10 V for 350 Ω gauges.
- **Running a quarter bridge with no dummy gauge.** Thermal apparent strain then appears directly in the output; a dummy gauge on an unstrained piece of the same material in the adjacent arm cancels it.
- **Treating microstrain as a raw number.** 1000 µε is 0.001, and the gauge's resistance change is correspondingly small: $350 \times 2 \times 0.001 = 0.7\ \mathrm{\Omega}$, which is why the whole measurement depends on a high-gain differential front end.

## See Also

- [[03_Instrumentation_and_Difference_Amplifiers]]
- [[12_Signal_Conditioning_and_DAQ]]
- [[09_Temperature_Sensors]]
- [[07_Thevenin_and_Norton_Equivalents]]

---

[[09_Temperature_Sensors|⬅ 09]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Position_Sensors_LVDT,_Hall,_Encoders|11 ➡]]
