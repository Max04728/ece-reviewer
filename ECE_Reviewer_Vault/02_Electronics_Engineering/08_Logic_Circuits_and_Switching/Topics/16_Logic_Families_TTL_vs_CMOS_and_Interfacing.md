---
id: ECE-08-16
title: "Logic Families: TTL vs CMOS and Interfacing"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 16
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]", "[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 16 — Logic Families: TTL vs CMOS and Interfacing

> [!abstract] Scope
> Compare TTL and CMOS logic levels, noise margins, fan-out, power and output types, and interface families with different supplies.

## Core Concept

> [!tip] Intuition
> A logic family is a contract: the driver promises a voltage window it will produce, and the receiver promises a wider window it will accept. The gap between the two is the noise margin, and every interfacing question is about whether the gap survives.

**Logic levels and noise margins.** A driver guarantees $V_{OH}$ (minimum output high) and $V_{OL}$ (maximum output low); a receiver requires $V_{IH}$ (minimum input recognised as high) and $V_{IL}$ (maximum input recognised as low). The gaps are the noise margins:
$$NM_H = V_{OH} - V_{IH}$$
and $NM_L = V_{IL} - V_{OL}$. For standard 5 V TTL, $V_{OH}=2.4$ V, $V_{IH}=2.0$ V, $V_{IL}=0.8$ V and $V_{OL}=0.4$ V give $NM_H = NM_L = 0.4$ V. The region between 0.8 V and 2.0 V is the indeterminate guard band: an input there is not guaranteed to be read either way, and a TTL gate switches at about 1.4 V.

**Fan-out is a current budget in both directions.** TTL inputs source current out of the driving gate when held low ($I_{IL}$, typically 0.4 mA for an LS input) and draw a small current when high ($I_{IH}$, typically 20 $\mu$A). The driver can sink $I_{OL}$ (about 8 mA) and source $I_{OH}$ (about 400 $\mu$A). The DC fan-out is the smaller of the two ratios, $\min(I_{OH}/I_{IH},\,I_{OL}/I_{IL})$, and because the HIGH-side current is so much smaller it is usually the binding constraint. CMOS inputs are high-impedance (about 1 $\mu$A of leakage plus a capacitive load), so one TTL output can drive dozens of CMOS inputs but pays for it in switching current at speed.

**Input behaviour when nothing is connected.** A floating TTL input behaves as a logic HIGH, because the input transistor needs current pulled out of it to be read as low. That is convenient but dangerous. A floating CMOS input is genuinely indeterminate: it can sit near the threshold, draw cross-conduction (shoot-through) current, oscillate and destroy the device. Unused CMOS inputs must therefore be tied to $V_{DD}$ or ground, and unused TTL inputs are usually tied high or left unconnected by convention rather than by design.

**Output structures.** Totem-pole (push-pull) outputs drive both directions and are the default. **Open-collector** (TTL) and **open-drain** (CMOS) outputs can only pull low, so they need an external pull-up resistor and can be wired together to form a wired-AND — one common line shared by several devices, which is how interrupt and bus-request lines work. Choosing the resistor is a two-sided calculation: small enough to sink the required current within $V_{OL}$, large enough that leakage currents do not drag the high level below $V_{IH}$. **Tri-state** outputs add a high-impedance state for bus sharing, with the enable signal deciding which device drives.

**Speed, power and level shifting.** Standard TTL burns a few milliwatts per gate almost independently of frequency, while CMOS burns almost nothing statically and its dynamic power rises with clock rate: $P = CV^2f$, where $C$ is the total load capacitance being charged. Multiplying propagation delay by power dissipation gives the speed-power product in picojoules, the standard figure of merit at around 10 pJ for LSTTL and much less for HC CMOS. Mixing families needs care with supply voltages: a 5 V TTL output at $V_{OH}=2.4$ V against a 3.3 V CMOS input that needs $0.7\times3.3 = 2.31$ V leaves only 0.09 V of margin, which is why 5 V-tolerant inputs or dedicated level shifters (or a series resistor with a tolerant input) are used rather than a direct connection.

**Interfacing rules of thumb.** TTL driving CMOS works on levels and current, since CMOS inputs draw almost nothing. CMOS driving TTL needs real sinking current, which the 4000-series at 5 V does not have — use 74HCT or a buffer. CMOS driving CMOS at different supplies needs a level shifter or an HCT-style input. Never drive a 3.3 V non-tolerant CMOS input from a 5 V TTL totem-pole output, because the upper output transistor can present a damaging voltage; and always check whether an input is 5 V tolerant before relying on the levels alone.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| High-level noise margin | $NM_H = V_{OH(min)} - V_{IH(min)}$ | Standard TTL: 2.4 - 2.0 = 0.4 V. Use guaranteed worst-case limits, never typical values. |
| Low-level noise margin | $NM_L = V_{IL(max)} - V_{OL(max)}$ | Standard TTL: 0.8 - 0.4 = 0.4 V. Subtract in this order so the margin is positive. |
| DC fan-out | $N \le \min\left(\frac{I_{OH}}{I_{IH}},\ \frac{I_{OL}}{I_{IL}}\right)$ | Take the smaller ratio. For LSTTL-style numbers, 400/40 = 10 and 8 mA/0.4 mA = 20, so the fan-out is 10. |
| CMOS dynamic power | $P = C V^2 f$ | C is the total switched load capacitance, V the supply swing, f the switching frequency. 50 pF at 5 V and 1 MHz gives 1.25 mW. |
| Speed-power product | $\mathrm{SPP} = t_{pd} \times P_D$ | Figure of merit in joules (picojoules). 10 ns x 1.25 mW = 12.5 pJ. |
| Open-collector pull-up, minimum | $R_{min} = \frac{V_{CC} - V_{OL(max)}}{I_{OL(max)}}$ | Keeps the low level within $V_{OL}$ when the output sinks the full load current. 5 V, 8 mA, 0.4 V gives 575 ohms. |
| Open-collector pull-up, maximum | $R_{max} = \frac{V_{CC} - V_{IH(min)}}{N\,I_{IH} + I_{leak}}$ | Keeps the high level above $V_{IH}$ despite leakage. 5 V, $V_{IH}=2$ V, four 20 uA loads gives 37.5 kilohms. |
| CMOS input threshold | $V_{IH} \approx 0.7\,V_{DD},\quad V_{IL} \approx 0.3\,V_{DD}$ | At 3.3 V that is 2.31 V and 0.99 V. A 5 V TTL high of 2.4 V barely clears 2.31 V. |
| Charge per transition | $Q = C V,\quad I_{avg} = C V f$ | The average supply current a CMOS gate draws while charging its load; scales linearly with frequency. |
| TTL static power | $P_{TTL} \approx V_{CC} \times I_{CC}\ (\mathrm{per\ gate,\ frequency\ independent})$ | About 1-10 mW per gate for standard TTL regardless of clock rate, unlike CMOS. |

## Worked Problems

### P1. Compute the high-level and low-level noise margins for a standard TTL gate with $V_{OH}=2.4$ V, $V_{IH}=2.0$ V, $V_{IL}=0.8$ V and $V_{OL}=0.4$ V.

**Given:** V_OH = 2.4 V; V_IH = 2.0 V; V_IL = 0.8 V; V_OL = 0.4 V

**Solution:**

1. NM_H = V_OH - V_IH = 2.4 V - 2.0 V
2. NM_H = 0.4 V
3. NM_L = V_IL - V_OL = 0.8 V - 0.4 V
4. NM_L = 0.4 V
5. So the family tolerates 0.4 V of noise on either level

> [!success]- Answer
> **$NM_H = 0.4$ V and $NM_L = 0.4$ V**

> [!warning] Trap
> Subtracting in the wrong order (V_IH - V_OH) and reporting a negative margin, or using typical values instead of the guaranteed worst-case limits. Noise margins are always quoted at the specified limits.

### P2. A driver has $I_{OH}=400\ \mu\mathrm{A}$, $I_{OL}=8\ \mathrm{mA}$. Each load draws $I_{IH}=40\ \mu\mathrm{A}$ and $I_{IL}=0.4\ \mathrm{mA}$. Find the DC fan-out.

**Given:** I_OH = 400 uA; I_OL = 8 mA; I_IH = 40 uA; I_IL = 0.4 mA

**Solution:**

1. High-side ratio: I_OH / I_IH = 400 uA / 40 uA = 10 loads
2. Low-side ratio: I_OL / I_IL = 8 mA / 0.4 mA = 20 loads
3. Fan-out is the smaller of the two: min(10, 20) = 10
4. Check total current with 10 loads: 10 x 40 uA = 400 uA exactly at the limit, and 10 x 0.4 mA = 4 mA well within 8 mA

> [!success]- Answer
> **Fan-out $= 10$ loads, limited by the HIGH-side sourcing current**

> [!warning] Trap
> Quoting 20 from the sinking calculation alone. The HIGH-side current is usually the smaller, and using only $I_{OL}/I_{IL}$ overstates the fan-out by two to five times in TTL families.

### P3. A CMOS gate drives a 50 pF load from a 5 V supply at 1 MHz. Find its dynamic power and, with $t_{pd}=10$ ns, the speed-power product.

**Given:** C = 50 pF; V = 5 V; f = 1 MHz; t_pd = 10 ns

**Solution:**

1. P = C V^2 f = (50e-12)(5^2)(1e6)
2. V^2 = 25, so P = 50e-12 x 25 x 1e6
3. P = 1.25e-3 W = 1.25 mW
4. Speed-power product = t_pd x P = 10 ns x 1.25 mW
5. = 1.25e-11 J = 12.5 pJ

> [!success]- Answer
> **$P = 1.25$ mW; speed-power product $= 12.5$ pJ**

> [!warning] Trap
> Forgetting to square the supply voltage, or treating the power as frequency-independent. CMOS dynamic power is proportional to $V^2$ and to $f$, so halving the supply cuts the power to a quarter.

### P4. An open-collector output with $V_{CC}=5$ V must sink 8 mA at $V_{OL}=0.4$ V, and drives four inputs each drawing $I_{IH}=20\ \mu\mathrm{A}$ with $V_{IH}=2.0$ V. Find the allowable pull-up resistor range.

**Given:** V_CC = 5 V; I_OL = 8 mA; V_OL = 0.4 V; 4 loads at 20 uA; V_IH = 2.0 V

**Solution:**

1. Minimum resistance (output low): R_min = (V_CC - V_OL)/I_OL = (5 - 0.4)/8 mA
2. R_min = 4.6/0.008 = 575 ohms
3. Maximum resistance (output high): total load current = 4 x 20 uA = 80 uA
4. R_max = (V_CC - V_IH)/I_total = (5 - 2.0)/80 uA
5. R_max = 3/80e-6 = 37 500 ohms = 37.5 kilohms
6. A standard 4.7 kilohm resistor lies comfortably inside the range

> [!success]- Answer
> **$575\ \Omega \le R \le 37.5\ \mathrm{k}\Omega$; 4.7 k$\Omega$ is a safe choice**

> [!warning] Trap
> Omitting the pull-up entirely. An open-collector output can only pull low, so without a resistor the line can never reach a valid high; and choosing too large a resistor lets leakage pull the high level below $V_{IH}$.

### P5. A 5 V TTL output with $V_{OH}=2.4$ V drives a 3.3 V CMOS input with $V_{IH}=0.7\,V_{DD}$. Is the connection safe, and what is the noise margin?

**Given:** driver V_OH = 2.4 V (5 V TTL); receiver V_DD = 3.3 V; V_IH = 0.7 V_DD

**Solution:**

1. Receiver threshold: V_IH = 0.7 x 3.3 V = 2.31 V
2. Driver guarantees only V_OH = 2.4 V
3. NM_H = 2.4 V - 2.31 V = 0.09 V
4. A 0.09 V margin is far below the 0.4 V a same-family interface provides, so the levels are marginal
5. Also check 5 V tolerance: if the 3.3 V input is not 5 V tolerant, the 5 V driver can damage it
6. Fix: use an HCT-style input, a dedicated level shifter, or a series resistor with a tolerant input

> [!success]- Answer
> **$NM_H = 0.09$ V: technically above threshold but too thin to rely on; use a level shifter or HCT input**

> [!warning] Trap
> Connecting the families because 5 V logic 'is usually compatible'. The guaranteed high level of TTL (2.4 V) barely exceeds a 3.3 V CMOS threshold (2.31 V), and a non-5 V-tolerant input can be destroyed by the driver voltage.

## Traps & Exam Notes

- **Subtracting the noise-margin terms in the wrong order.** $NM_H = V_{OH}-V_{IH}$ and $NM_L = V_{IL}-V_{OL}$. Reversing either gives a negative margin and a false incompatibility.
- **Taking only the sinking ratio for fan-out.** The correct value is $\min(I_{OH}/I_{IH},\,I_{OL}/I_{IL})$; the sourcing side usually binds, so quoting $I_{OL}/I_{IL}$ overstates the fan-out badly.
- **Leaving CMOS inputs floating.** A floating CMOS input sits near the threshold, draws cross-conduction current and can oscillate or latch up. Unused CMOS inputs must be tied to a supply rail — unlike TTL, where a floating input reads as a high.
- **Expecting an open-collector output to drive high.** It cannot; it needs a pull-up. Wired-AND buses work precisely because several such outputs share one resistor without ever fighting each other.
- **Assuming CMOS uses no power.** Static power is tiny, but $P = CV^2f$ grows linearly with frequency and quadratically with supply voltage. At high clock rates CMOS can dissipate more than TTL.
- **Driving TTL with unbuffered 4000-series CMOS.** At 5 V a 4000-series output cannot sink the 0.4-1.6 mA a TTL input demands. Use 74HCT or a buffer.
- **Plugging a 5 V driver into a 3.3 V non-tolerant input.** Logic-level compatibility is not the same as voltage tolerance; the input's absolute maximum rating must be respected, not just its $V_{IH}$.

## See Also

- [[12_MOSFET_Types_and_Regions]]
- [[09_BJT_Structure_and_Operating_Regions]]
- [[11_Flip-Flop_Timing,_Setup_and_Hold]]
- [[09_Multiplexers_and_Demultiplexers]]

---

[[15_ASM_Charts|⬅ 15]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
