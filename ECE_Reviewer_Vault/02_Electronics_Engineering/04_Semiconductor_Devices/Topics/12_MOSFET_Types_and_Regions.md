---
id: ECE-04-12
title: "MOSFET Types and Regions"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_PN_Junction_and_Depletion_Region]]", "[[11_JFET_Characteristics_and_Pinch-Off]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — MOSFET Types and Regions

> [!abstract] Scope
> Classify a MOSFET as cutoff, triode or saturation from its terminal voltages, then compute drain current, k, V_DS(sat) and transconductance from the square-law model.

## Core Concept

> [!tip] Intuition
> The MOSFET gate is a metal plate separated from the channel by a glass-thin oxide, so it is a capacitor, not a diode: no DC current can flow into it. Voltage on that plate attracts minority carriers under the oxide and creates a conducting channel out of nothing, which is why an enhancement device is off until the gate passes the threshold.

**Four flavours, one idea.** A MOSFET is a source and drain of one doping type separated by a body (substrate) of the opposite type, with a gate electrode sitting on a thin silicon-dioxide layer over the gap. Because the gate is **insulated** by an oxide, its DC input resistance is set by the oxide leakage and is of the order $10^{12}\ \Omega$ or higher — effectively infinite compared with the JFET's megohms and the BJT's kilohms, and the reason MOSFET gates are destroyed by static charge but draw no bias current. The four types are n-channel and p-channel, each in **enhancement** (normally off, needs $|V_{GS}|$ beyond a threshold to create the channel) and **depletion** (normally on, a channel is built in during manufacture and a gate voltage of the opposite polarity is needed to turn it off). For an n-channel enhancement device the threshold $V_T=V_{GS(th)}$ is positive; for an n-channel depletion device it is negative. Induction of the channel is the mechanism: a gate voltage above $V_T$ attracts electrons to the surface and inverts the p-type body into a thin n-type conduction layer whose charge density is proportional to $V_{GS}-V_T$. That excess charge, times the drift velocity, is the drain current.

**The three regions follow directly from the channel charge.** If $V_{GS}<V_T$ there is no inversion layer at all: **cutoff**, $I_D\approx0$ apart from subthreshold leakage. Once $V_{GS}>V_T$, a small $V_{DS}$ makes the channel behave as a gate-controlled resistor whose resistance is set by $V_{GS}-V_T$, giving the **triode (linear or ohmic) region**, which holds while $V_{DS}<V_{GS}-V_T$. As $V_{DS}$ rises, the channel potential near the drain rises with it, so the local gate-to-channel voltage $V_{GD}=V_{GS}-V_{DS}$ falls. When $V_{DS}$ reaches $V_{GS}-V_T$ the channel is pinched off at the drain end, and beyond that point the extra drain voltage is dropped across a short high-field region rather than across the channel. The current is then set only by the inverted charge, which depends on $V_{GS}$: **saturation**, with $I_D=k(V_{GS}-V_T)^2$ virtually independent of $V_{DS}$. The boundary is $V_{DS(sat)}=V_{GS}-V_T$, and the two region equations must agree exactly there — which is a good arithmetic check on any answer.

**The equations and the factor-of-two convention.** With $k=\frac{1}{2}\mu_nC_{ox}\frac{W}{L}$, the triode current is $I_D=k\left[2(V_{GS}-V_T)V_{DS}-V_{DS}^{2}\right]$ and the saturation current is $I_D=k(V_{GS}-V_T)^{2}$. Many books instead define $K=\mu_nC_{ox}\frac{W}{L}$ and write $I_D=\frac{K}{2}(V_{GS}-V_T)^{2}$; the physics is identical and only the definition of the constant differs. The exam-safe habit is to write down your definition of $k$ next to every calculation. Note the structure of the triode bracket: for small $V_{DS}$ the $V_{DS}^{2}$ term vanishes and $I_D\approx2k(V_{GS}-V_T)V_{DS}$, so the on-resistance is $r_{DS(on)}=1/\left[2k(V_{GS}-V_T)\right]$, which falls as the gate is driven harder. That is why a MOSFET used as a switch is driven to the largest gate voltage the process allows: it lowers $r_{DS(on)}$ and therefore the conduction loss $I_D^{2}r_{DS(on)}$.

**Second-order effects and why CMOS wins.** The simple square law assumes the threshold is fixed and the saturation current is perfectly flat. Two corrections matter on the board exam. First, the **body effect**: if the source is not tied to the body, a reverse source-body voltage $V_{SB}$ widens the depletion charge and raises the threshold, $V_T=V_{T0}+\gamma\left(\sqrt{2\phi_F+V_{SB}}-\sqrt{2\phi_F}\right)$, so a stacked device in a logic gate is weaker than the same device with its source grounded. Second, **channel-length modulation**, a slight rise of $I_D$ with $V_{DS}$ in saturation, giving the device a finite output resistance $r_{ds}$ analogous to the BJT's Early effect. The transconductance is $g_m=2k(V_{GS}-V_T)=2\sqrt{kI_D}$, so — exactly as with the JFET — gain falls off as the square root of current, and a MOSFET biased at low current has poor $g_m$ no matter how large the device is. CMOS logic combines complementary n- and p-channel enhancement transistors so that one is always off in steady state, which is why static power is essentially leakage only; but the gate is a capacitor, so all the switching power is $CV^{2}f$ and rises with frequency.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Transconductance parameter k | $k = \frac{1}{2}\mu_n C_{ox}\frac{W}{L}$ | Units A/V^2. Some texts define K = mu_n*C_ox*W/L without the 1/2 and write I_D = (K/2)(V_GS - V_T)^2. State which definition you are using; the factor of 2 is the single most common arithmetic error in this topic. |
| Oxide capacitance per unit area | $C_{ox} = \frac{\varepsilon_{ox}}{t_{ox}}, \qquad \varepsilon_{ox} = 3.9\varepsilon_0 = 3.45\times10^{-11}\ \mathrm{F/m}$ | A thinner oxide gives a larger C_ox and therefore a larger k. Example: t_ox = 4 nm gives C_ox = 8.63 mF/m^2 = 8.63 fF/um^2. |
| Triode (linear) region drain current | $I_D = k\left[2\left(V_{GS}-V_T\right)V_{DS} - V_{DS}^{2}\right]$ | Valid only for V_DS < V_GS - V_T and V_GS > V_T. At V_DS = V_DS(sat) this reduces exactly to the saturation expression. |
| Saturation region drain current | $I_D = k\left(V_{GS}-V_T\right)^{2}$ | Valid for V_DS >= V_GS - V_T. Current depends on the gate overdrive only, so the output curves are flat to first order. |
| Saturation boundary voltage | $V_{DS(sat)} = V_{GS} - V_T$ | The gate overdrive itself. If the circuit cannot supply this much V_DS the device is in triode and the square law overestimates the current. |
| Region conditions | $\mathrm{cutoff:\ } V_{GS} < V_T \qquad \mathrm{triode:\ } V_{GS} > V_T,\ V_{DS} < V_{GS}-V_T \qquad \mathrm{saturation:\ } V_{GS} > V_T,\ V_{DS} \ge V_{GS}-V_T$ | Written for an n-channel enhancement device with V_T > 0. For p-channel reverse every voltage polarity and use \|V_GS\|, \|V_T\|, \|V_DS\|. |
| Depletion-mode n-channel square law | $I_D = I_{DSS}\left(1 - \frac{V_{GS}}{V_{GS(off)}}\right)^{2}, \qquad V_{GS(off)} < 0$ | A depletion device conducts at V_GS = 0 with I_D = I_DSS; the gate must go negative to turn it off. Enhancement devices have no I_DSS because I_D = 0 at V_GS = 0. |
| Small-signal transconductance | $g_m = 2k\left(V_{GS}-V_T\right) = 2\sqrt{k I_D}$ | Grows only as the square root of drain current, so low-current MOSFET stages have low gain. In siemens (A/V). |
| On-resistance in the triode region | $r_{DS(on)} = \frac{1}{2k\left(V_{GS}-V_T\right)}$ | Small-V_DS limit; decreases as the gate overdrive increases. Multiplying by I_D^2 gives the conduction loss of a MOSFET switch. |
| Body effect on the threshold | $V_T = V_{T0} + \gamma\left(\sqrt{2\phi_F + V_{SB}} - \sqrt{2\phi_F}\right)$ | Applies when the source is above the body for an n-channel device (V_SB > 0). gamma is typically 0.3-0.8 V^1/2 and 2*phi_F about 0.6-0.7 V, so a few volts of V_SB can raise V_T by hundreds of millivolts. |

## Interactive Widget

**MOSFET Output Characteristic**

![[MOSFET_Output_Characteristic.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An n-channel enhancement MOSFET has $V_T=2\ \mathrm{V}$. Name the region for: (a) $V_{GS}=1.5\ \mathrm{V}$, $V_{DS}=5\ \mathrm{V}$; (b) $V_{GS}=4\ \mathrm{V}$, $V_{DS}=1\ \mathrm{V}$; (c) $V_{GS}=4\ \mathrm{V}$, $V_{DS}=3\ \mathrm{V}$.

**Given:** V_T = 2 V; Case a: V_GS = 1.5 V, V_DS = 5 V; Case b: V_GS = 4 V, V_DS = 1 V; Case c: V_GS = 4 V, V_DS = 3 V

**Solution:**

1. Case a: V_GS = 1.5 V < V_T = 2 V, so no inversion layer exists: cutoff, I_D is approximately zero no matter how large V_DS is
2. Case b: V_GS - V_T = 4 - 2 = 2 V and V_DS = 1 V < 2 V: triode (linear) region
3. Case c: V_GS - V_T = 2 V and V_DS = 3 V >= 2 V: saturation region
4. Always compare V_DS with the overdrive V_GS - V_T, not with V_T itself

> [!success]- Answer
> **a) cutoff; b) triode; c) saturation.**

> [!warning] Trap
> Comparing V_DS with V_T instead of with V_GS - V_T. Case (c) passes V_T easily but that is not the test; the boundary is the gate overdrive, which here is 2 V. Also do not call case (a) triode just because V_DS is large.

### P2. For a device with $k=0.5\ \mathrm{mA/V^{2}}$ and $V_T=1.5\ \mathrm{V}$ biased at $V_{GS}=4\ \mathrm{V}$, find $I_D$ in saturation and the $V_{DS}$ required to reach it.

**Given:** k = 0.5 mA/V^2; V_T = 1.5 V; V_GS = 4 V

**Solution:**

1. Overdrive: V_GS - V_T = 4 - 1.5 = 2.5 V
2. I_D = k(V_GS - V_T)^2 = 0.5 mA/V^2 * (2.5 V)^2 = 0.5 * 6.25 = 3.125 mA
3. V_DS(sat) = V_GS - V_T = 2.5 V, so the drain supply must allow at least 2.5 V across the device
4. Check by the triode equation at the boundary: I_D = 0.5[2(2.5)(2.5) - 6.25] = 0.5(6.25) = 3.125 mA, which agrees

> [!success]- Answer
> **I_D = 3.125 mA in saturation, which requires V_DS >= 2.5 V.**

> [!warning] Trap
> Using V_GS in place of the overdrive: 0.5*(4)^2 = 8 mA, more than twice the correct value. The threshold is subtracted before squaring, every time.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4−1.5` → **2.5** V = the overdrive $V_{GS}-V_T$.
> 2. `0.5E-3×Ans²` → **3.125** mA in saturation; that same 2.5 V is $V_{DS(sat)}$.
>
> Squaring $V_{GS}$ instead of the overdrive gives 8 mA, more than twice the right answer.

### P3. The same device ($k=0.5\ \mathrm{mA/V^{2}}$, $V_T=1.5\ \mathrm{V}$, $V_{GS}=4\ \mathrm{V}$) is operated at $V_{DS}=1\ \mathrm{V}$. Find $I_D$ and explain the difference from the saturation value.

**Given:** k = 0.5 mA/V^2; V_T = 1.5 V; V_GS = 4 V; V_DS = 1 V

**Solution:**

1. Region check: V_DS = 1 V < V_GS - V_T = 2.5 V, so the device is in the triode region
2. I_D = k[2(V_GS - V_T)V_DS - V_DS^2] = 0.5[2(2.5)(1) - 1^2]
3. Inside the bracket: 5 - 1 = 4, so I_D = 0.5 * 4 = 2.00 mA
4. Compare with saturation at the same V_GS: 3.125 mA. The triode current is lower because the channel is not pinched off, so part of V_DS is dropped along the channel instead of across a fixed pinch region

> [!success]- Answer
> **I_D = 2.00 mA in the triode region, against 3.125 mA if the device were in saturation at the same gate voltage.**

> [!warning] Trap
> Forgetting the V_DS^2 term and using the small-signal approximation I_D = 2k(V_GS - V_T)V_DS = 2.5 mA. That linearization is only valid for V_DS well below the overdrive; at V_DS = 1 V out of 2.5 V it is 25 percent high.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5E-3×(2×2.5×1−1²)` → **2.00** mA in the triode region.
> 2. Compare with the saturation value **3.125** mA at the same gate voltage.
>
> Dropping the $V_{DS}^2$ term gives 2.5 mA, 25 % high at this $V_{DS}$.

### P4. A MOSFET with $k=0.4\ \mathrm{mA/V^{2}}$ and $V_T=2\ \mathrm{V}$ must carry $I_D=3.6\ \mathrm{mA}$ in saturation. Find the required $V_{GS}$, the boundary $V_{DS(sat)}$, and $g_m$ at that bias.

**Given:** k = 0.4 mA/V^2; V_T = 2 V; Target I_D = 3.6 mA

**Solution:**

1. (V_GS - V_T)^2 = I_D/k = 3.6 mA / 0.4 mA/V^2 = 9 V^2
2. V_GS - V_T = sqrt(9) = 3 V, so V_GS = 3 + 2 = 5 V
3. V_DS(sat) = V_GS - V_T = 3 V, so the circuit must keep V_DS at or above 3 V
4. g_m = 2k(V_GS - V_T) = 2(0.4 mA/V^2)(3 V) = 2.4 mS; check with g_m = 2*sqrt(k*I_D) = 2*sqrt(0.4 mA/V^2 * 3.6 mA) = 2*sqrt(1.44e-6) = 2(1.2 mS) = 2.4 mS

> [!success]- Answer
> **V_GS = 5 V, V_DS(sat) = 3 V, and g_m = 2.4 mS.**

> [!warning] Trap
> Solving I_D = k*V_GS^2 and getting V_GS = 3 V by dropping the threshold. That value is below V_T plus overdrive and would put the device in cutoff in a real circuit; the threshold must be added back after the square root.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3.6E-3÷0.4E-3` → **9.0** V², so `√Ans` → **3.0** V overdrive and `+2` → **5.0** V = $V_{GS}$.
> 2. The overdrive 3 V is also $V_{DS(sat)}$.
> 3. `2×0.4E-3×3` → **2.4** mS; check `2√(0.4E-3×3.6E-3)` → **2.4** mS.
>
> Add the threshold back after the square root; $V_{GS} = 3$ V would be cutoff in a real circuit.

### P5. A process has $t_{ox}=4\ \mathrm{nm}$, $\mu_n=500\ \mathrm{cm^{2}/(V\cdot s)}$ and $\varepsilon_{ox}=3.9\varepsilon_0$. Find $C_{ox}$ and $k'=\mu_nC_{ox}$, then the $W/L$ needed for $k=1\ \mathrm{mA/V^{2}}$. With $V_T=1\ \mathrm{V}$ and $V_{GS}=3\ \mathrm{V}$, find $I_D$ and $r_{DS(on)}$.

**Given:** t_ox = 4 nm; mu_n = 500 cm^2/(V s); eps_ox = 3.9 eps_0 = 3.45e-11 F/m; Target k = 1 mA/V^2; V_T = 1 V; V_GS = 3 V

**Solution:**

1. C_ox = eps_ox/t_ox = 3.45e-11 F/m / 4e-9 m = 8.63e-3 F/m^2, i.e. 8.63 fF/um^2
2. Convert mobility: 500 cm^2/(V s) = 500e-4 m^2/(V s) = 0.05 m^2/(V s)
3. k' = mu_n*C_ox = 0.05 * 8.63e-3 = 4.32e-4 A/V^2 = 432 uA/V^2
4. k = (1/2)k'(W/L), so W/L = 2k/k' = 2(1e-3)/4.32e-4 = 4.63
5. Overdrive = 3 - 1 = 2 V, so I_D = k(V_GS - V_T)^2 = 1 mA/V^2 * 4 = 4.00 mA at V_DS >= 2 V
6. r_DS(on) = 1/[2k(V_GS - V_T)] = 1/[2(1e-3)(2)] = 1/(4e-3) = 250 ohm

> [!success]- Answer
> **C_ox = 8.63 fF/um^2, k' = 432 uA/V^2, W/L = 4.63, I_D = 4.00 mA in saturation, and r_DS(on) = 250 ohm.**

> [!warning] Trap
> Forgetting the 1/2 in k = (1/2)k'(W/L) and getting W/L = 2.31, half the required width. Equally common is leaving the mobility in cm^2/(V s) while C_ox is in F/m^2; mixing the two unit systems changes k' by 10^4 and the width by the same factor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3.45E-11÷4E-9` → **8.625e-3** F/m² = **8.63** fF/µm².
> 2. `0.05×Ans` → **4.3125e-4** = $k'$ = **432** µA/V²; `2×1E-3÷Ans` → **4.64** = W/L.
> 3. `1E-3×2²` → **4.00** mA; `1÷(2×1E-3×2)` → **250** $\Omega$ = $r_{DS(on)}$.
>
> Convert mobility to m²/(V·s) (500 becomes 0.05) first; $k = \frac{1}{2}k'(W/L)$ carries the half.

## Traps & Exam Notes

- **The factor of 2 in the definition of k.** With $k=\frac{1}{2}\mu_nC_{ox}W/L$, the triode equation carries the $2$ inside the bracket and saturation is $I_D=k(V_{GS}-V_T)^2$. If your text writes $K=\mu_nC_{ox}W/L$, then $I_D=\frac{K}{2}(V_{GS}-V_T)^2$. Mixing the two conventions makes every current wrong by a factor of 2.
- **Applying the saturation equation when $V_{DS}<V_{GS}-V_T$.** In the triode region the same gate voltage gives less current because the channel is not pinched off. The tell-tale sign is a computed $I_D$ that, multiplied by the load resistance, would need more $V_{DS}$ than the supply provides.
- **Using $V_T$ where the overdrive $V_{GS}-V_T$ belongs.** Squaring $V_{GS}$ or subtracting the threshold after squaring both appear regularly, and both inflate the current by 2x or more at typical overdrives.
- **Assuming the gate draws a small bias current.** The oxide is an insulator: DC gate current is leakage, often picoamps, so a gate resistor drops no DC voltage. It does, however, form an RC time constant with the gate capacitance, which is what limits switching speed — and the same thin oxide is why an ungrounded gate is destroyed by static discharge.
- **Mixing up enhancement and depletion thresholds, or n and p channel signs.** An n-channel enhancement device has $V_T>0$ and is off at $V_{GS}=0$; an n-channel depletion device has $V_T<0$ and conducts $I_{DSS}$ at $V_{GS}=0$. A p-channel device reverses every polarity, so all its voltages are negative in a circuit referenced to its source.
- **Ignoring the body effect and channel-length modulation.** Tying the source above the body raises $V_T$ and cuts the current in stacked logic devices, while the finite output resistance from channel-length modulation makes the real saturation current rise slightly with $V_{DS}$ — which is why cascode stages exist.

## See Also

- [[11_JFET_Characteristics_and_Pinch-Off]]
- [[04_FET_Biasing_Configurations]]
- [[05_BJT_Small-Signal_h-Parameter_Model]]

---

[[11_JFET_Characteristics_and_Pinch-Off|⬅ 11]] · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Thyristors_UJT,_SCR,_DIAC,_TRIAC|13 ➡]]
