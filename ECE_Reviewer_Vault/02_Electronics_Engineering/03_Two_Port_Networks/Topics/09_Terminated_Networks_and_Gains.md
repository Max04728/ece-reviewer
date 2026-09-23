---
id: ECE-03-09
title: "Terminated Networks and Gains"
part: "02_Electronics_Engineering"
area: "03_Two_Port_Networks"
topic: 9
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Thevenin_and_Norton_Equivalents]]", "[[08_Maximum_Power_Transfer_and_Source_Transformation]]"]
tags: ["ece", "electronics_engineering", "two_port_networks"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Terminated Networks and Gains

> [!abstract] Scope
> Find the input and output impedance, the voltage, current and power gain, and the matching (image) condition of a two-port once a source impedance and a load are attached to it.

## Core Concept

> [!tip] Intuition
> The load is part of the circuit, so it changes what the source sees: the two-port transforms Z_L into Z_in and, looking the other way, transforms Z_S into Z_out. Once those two impedances are known the gains are ordinary divider problems, because the ABCD matrix already encodes how V2 and I2 relate to V1 and I1.

**The terminated two-port and the two impedance transformations.** Attach a source $(V_S, Z_S)$ at port 1 and a load $Z_L$ at port 2, and the network becomes a Thevenin problem at each port ([[07_Thevenin_and_Norton_Equivalents]]). Substituting the load relation $V_2 = -Z_L I_2$ into $V_1 = AV_2 - BI_2$ and $I_1 = CV_2 - DI_2$ gives $V_1 = -I_2(AZ_L + B)$ and $I_1 = -I_2(CZ_L + D)$, so the input impedance is:
$$Z_{in} = V_1/I_1 = (AZ_L + B)/(CZ_L + D)$$
The output side is the same calculation with the ports exchanged, which swaps $A$ with $D$ and the load with the source:
$$Z_{out} = (DZ_S + B)/(CZ_S + A)$$
The same results appear in the older parameter sets:
$$Z_{in} = h_{11} - h_{12}h_{21}Z_L/(1 + h_{22}Z_L)$$
from the h-set. From the z-set the input impedance is:
$$Z_{in} = z_{11} - z_{12}z_{21}/(z_{22} + Z_L)$$
and the output impedance is:
$$Z_{out} = z_{22} - z_{12}z_{21}/(z_{11} + Z_S)$$
Use whichever set the circuit handed you; they must agree, which makes them a good cross-check ([[06_Parameter_Conversions_and_Determinants]]).

**Gains from the ABCD matrix.** With $V_2 = -Z_L I_2$, the voltage gain is $A_v = V_2/V_1 = Z_L/(AZ_L + B)$ and the current gain is $A_i = I_2/I_1 = -1/(CZ_L + D)$ ([[05_Transmission_ABCD_Parameters]]). The minus sign is not an error: $I_2$ is defined leaving the network at port 2, so the current actually entering the load is $-I_2$, and the voltage gain and current gain of a passive network are therefore of opposite sign (the output voltage rises while the output current leaves). Note what each gain depends on: $A_v$ and $A_i$ depend only on the load, not on the source, because they compare port quantities of the two-port itself. The power delivered to the load is $P_L = |V_2|^{2}R_L/(2|Z_L|^{2})$ for a general complex load and simply $V_2^{2}/R_L$ for a resistive one, while the power entering the network is $P_{in} = |I_1|^{2}R_{in}/2$. For resistive terminations the operating power gain collapses to the memorable form:
$$G_p = P_L/P_{in} = \lvert A_v\rvert^{2}R_{in}/R_L = |A_vA_i|$$

**Matching: two different questions with two different answers.** Maximum power transfer from the source needs the conjugate match $Z_{in} = Z_S^{*}$, and getting power out into the load needs $Z_L = Z_{out}^{*}$; on a passive two-port both cannot usually be satisfied at once. A symmetric two-port has a third, structural notion: its image impedance $Z_0 = \sqrt{B/C}$, the impedance that the section itself presents at both ports when terminated in $Z_0$, so that $Z_{in} = Z_{out} = Z_0$ and identical sections can be chained with no reflection at any junction. That is exactly how filter and transmission-line sections are designed. For an asymmetric section the two image impedances differ, $Z_{01} = \sqrt{AB/CD}$ at port 1 and $Z_{02} = \sqrt{DB/CA}$ at port 2, and only a symmetric section has a single $Z_0$. Keep the units straight: $B$ is in ohms and $C$ in siemens, so $B/C$ is in $\Omega^{2}$ and only the square root returns an impedance.

**Insertion loss and why matching keeps the response flat.** The insertion loss of a two-port compares the power delivered to the load with the network inserted against the power delivered with the network removed, $IL = 10\log_{10}(P_{ref}/P_{with})$ dB; a matched network has the flattest insertion-loss response and no reflection ripple, which is why attenuator pads are designed with equal image impedances at both ports. Two cautions that the exam uses repeatedly. First, a matched input guarantees only that the source delivers its available power $P_{avail} = V_S^{2}/(4R_S)$ to the network — the network may still pass only a fraction of it to the load. Second, in a cascade the overall voltage gain is not simply the product of the individually terminated stage gains; the stages load one another, so you must recompute each stage's load or cascade the ABCD matrices and derive the gain once at the end ([[08_Interconnections_Series,_Parallel,_Cascade]]).

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Input impedance from ABCD | $Z_{in} = \frac{A Z_L + B}{C Z_L + D}$ | Depends on the load. Open-circuit limit A/C; short-circuit limit B/D. Complex Z_L gives a complex Z_in. |
| Output impedance from ABCD | $Z_{out} = \frac{D Z_S + B}{C Z_S + A}$ | Looking back into port 2 with the source Z_S connected. Note the A and D trade places relative to Z_in. |
| Input impedance from h | $Z_{in} = h_{11} - \frac{h_{12}h_{21}Z_L}{1 + h_{22}Z_L}$ | h11 and h22 in ohm and S. The subtracted term is the loading/feedback correction; with Z_L = 0 it gives Z_in = h11. |
| Input and output impedance from z | $Z_{in} = z_{11} - \frac{z_{12}z_{21}}{z_{22} + Z_L},\qquad Z_{out} = z_{22} - \frac{z_{12}z_{21}}{z_{11} + Z_S}$ | Equivalent to the ABCD forms. Open-circuit Z_L gives Z_in = z11; adding Z_L pulls Z_in down by the coupling term. |
| Voltage gain from ABCD | $A_v = \frac{V_2}{V_1} = \frac{Z_L}{A Z_L + B}$ | Independent of the source. For a resistive divider network it is just the usual divider ratio; complex loads give a complex A_v. |
| Current gain from ABCD | $A_i = \frac{I_2}{I_1} = -\frac{1}{C Z_L + D}$ | The minus sign is required because I2 leaves port 2; the current entering the load is -I2. Magnitude may be checked alone, but the 180 deg offset is real. |
| Power gain (operating) | $G_p = \frac{P_L}{P_{in}} = \lvert A_v\rvert^{2}\frac{R_{in}}{R_L} = \lvert A_v A_i\rvert$ | The last two forms are for resistive terminations. With reactive loads use P_L = \|V2\|^2 R_L/(2\|Z_L\|^2) and P_in = \|I1\|^2 R_in/2. |
| Image impedance (symmetric network) | $Z_0 = \sqrt{\frac{B}{C}}$ | Symmetric means A = D. When Z_S = Z_L = Z0 then Z_in = Z_out = Z0 and identical sections chain without reflection. Units: ohm/siemens under the root. |
| Conjugate (maximum power) match | $Z_{in} = Z_S^{*}, \qquad Z_L = Z_{out}^{*}, \qquad P_{avail} = \frac{\lvert V_S\rvert^{2}}{4 R_S}$ | Conjugate, not equal, for complex impedances. Matching the input only maximises the power handed to the two-port, not the power reaching the load. |
| Insertion loss | $IL = 10\log_{10}\!\left(\frac{P_{ref}}{P_{with}}\right)\ \mathrm{dB}$ | P_ref is the power delivered with the two-port removed (source straight into the load). A matched, symmetric network gives the flattest IL versus frequency. |

## Worked Problems

### P1. A two-port has $A = 1.5$, $B = 100\ \Omega$, $C = 0.005\ \mathrm{S}$, $D = 1$ and is terminated by $Z_L = 300\ \Omega$. Find $Z_{in}$.

**Given:** A = 1.5; B = 100 ohm; C = 0.005 S; D = 1; Z_L = 300 ohm

**Solution:**

1. Z_in = (A Z_L + B)/(C Z_L + D) = (1.5(300) + 100)/(0.005(300) + 1)
2. Numerator = 450 + 100 = 550 ohm; denominator = 1.5 + 1 = 2.5 (dimensionless)
3. Z_in = 550/2.5 = 220 ohm
4. Direct circuit check: this ABCD is a 100 ohm series resistor followed by a 200 ohm shunt resistor, so Z_in = 100 + (200 || 300) = 100 + 120 = 220 ohm

> [!success]- Answer
> **Z_in = 220 ohm (purely resistive).**

> [!warning] Trap
> Quoting an 'input impedance' from the matrix alone. A/C = 1.5/0.005 = 300 ohm is the open-circuit value and B/D = 100/1 = 100 ohm is the short-circuit value; the terminated answer depends on Z_L and is 220 ohm here.

### P2. For the same two-port ($A = 1.5$, $B = 100\ \Omega$, $C = 0.005\ \mathrm{S}$, $D = 1$), find $Z_{out}$ when it is driven by a source with $Z_S = 100\ \Omega$.

**Given:** A = 1.5; B = 100 ohm; C = 0.005 S; D = 1; Z_S = 100 ohm

**Solution:**

1. Z_out = (D Z_S + B)/(C Z_S + A) = (1(100) + 100)/(0.005(100) + 1.5)
2. Numerator = 200 ohm; denominator = 0.5 + 1.5 = 2.0
3. Z_out = 200/2.0 = 100 ohm
4. Direct circuit check: looking back from port 2, the 200 ohm shunt sits across the 100 ohm series resistor plus the 100 ohm source, i.e. 200 || (100 + 100) = 200 || 200 = 100 ohm

> [!success]- Answer
> **Z_out = 100 ohm.**

> [!warning] Trap
> Reusing the input formula and writing (A Z_S + B)/(C Z_S + D). The port-2 form is (D Z_S + B)/(C Z_S + A): the source replaces the load and D and A swap places, so a coincidental A = 1.5 versus D = 1 slip produces a wrong but plausible number.

### P3. The two-port ($A = 1.5$, $B = 100\ \Omega$, $C = 0.005\ \mathrm{S}$, $D = 1$) now drives $Z_L = 300 + j400\ \Omega$. Find the voltage gain $V_2/V_1$ and the current gain $I_2/I_1$ in rectangular and polar form.

**Given:** A = 1.5; B = 100 ohm; C = 0.005 S; D = 1; Z_L = 300 + j400 ohm

**Solution:**

1. A Z_L + B = 1.5(300 + j400) + 100 = 450 + j600 + 100 = 550 + j600 ohm
2. A_v = (300 + j400)/(550 + j600): multiply by the conjugate to get (300+j400)(550-j600) = 165000 + 240000 + j(220000 - 180000) = 405000 + j40000, over |550+j600|^2 = 302500 + 360000 = 662500
3. A_v = (405000 + j40000)/662500 = 0.6113 + j0.0604 = 0.6143 angle 5.64 deg (check: |Z_L|/|A Z_L + B| = 500/813.9 = 0.6143; 53.13 - 47.49 = 5.64 deg)
4. C Z_L + D = 0.005(300 + j400) + 1 = 2.5 + j2, so A_i = -1/(2.5 + j2) = -(2.5 - j2)/10.25
5. A_i = -0.2439 + j0.1951 = 0.3124 angle 141.3 deg (the angle is 180 - 38.66 deg, the 180 deg coming from the minus sign)

> [!success]- Answer
> **A_v = 0.6113 + j0.0604 = 0.6143 angle 5.64 deg; A_i = -0.2439 + j0.1951 = 0.3124 angle 141.3 deg.**

> [!warning] Trap
> Dropping the minus in A_i = -1/(C Z_L + D) and answering 0.3124 angle -38.7 deg. The magnitude is identical, so a magnitude-only check passes; only the phase (or the sign in a feedback loop or a cascaded cascade) exposes it.

### P4. A symmetric T-section has $Z_a = Z_b = 5\ \Omega$ and $Z_c = 10\ \Omega$, giving $A = D = 1.5$, $B = 12.5\ \Omega$, $C = 0.1\ \mathrm{S}$. Find its image impedance, show that a load equal to it makes $Z_{in}$ equal it, and confirm with the h-parameter formula.

**Given:** A = D = 1.5; B = 12.5 ohm; C = 0.1 S; symmetric T: Za = Zb = 5 ohm, Zc = 10 ohm

**Solution:**

1. Z0 = sqrt(B/C) = sqrt(12.5/0.1) = sqrt(125) = 11.18 ohm
2. Z_in with Z_L = Z0: (1.5(11.18) + 12.5)/(0.1(11.18) + 1.5) = (16.77 + 12.5)/(1.118 + 1.5) = 29.27/2.618 = 11.18 ohm, which matches Z0
3. Because A = D, the same substitution at port 2 with Z_S = Z0 gives Z_out = 11.18 ohm, so both ports are matched at once
4. h-parameters: z11 = z22 = Za + Zc = 15 ohm, z12 = Zc = 10 ohm, dz = (15)(15) - (10)(10) = 125 ohm^2, so h11 = dz/z22 = 8.333 ohm, h12 = 10/15 = 0.6667, h21 = -0.6667, h22 = 1/15 = 0.06667 S
5. Z_in = h11 - h12 h21 Z_L/(1 + h22 Z_L) = 8.333 - (0.6667)(-0.6667)(11.18)/(1 + (0.06667)(11.18)) = 8.333 + 4.969/1.745 = 8.333 + 2.847 = 11.18 ohm

> [!success]- Answer
> **Z0 = 11.18 ohm; with Z_L = Z_S = 11.18 ohm the section gives Z_in = Z_out = 11.18 ohm (both ports matched).**

> [!warning] Trap
> Confusing image matching with maximum power transfer, and squaring instead of rooting. Z0 = sqrt(B/C) needs a symmetric network (A = D) and only makes the section look like Z0; pulling maximum power from the source still needs Z_in = Z_S*. Unit slip matters too: C must be in siemens, so 0.1 S gives B/C = 125 ohm^2, while entering C = 0.1 mS would give 125 000 ohm^2 and Z0 = 354 ohm.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(12.5÷0.1)` → $Z_0$ = **11.18** $\Omega$.
> 2. With $Z_L = Z_0$: `(1.5×11.18+12.5)÷(0.1×11.18+1.5)` → **11.18** $\Omega$ — the port is matched.
> 3. Note the denominator uses $D = 1.5$, the same as $A$. Using 1 there is the usual slip and gives 13.8 instead.

### P5. A source of $V_S = 10\ \mathrm{V\ rms}$ with $Z_S = 220\ \Omega$ drives the network of P1 ($A = 1.5$, $B = 100\ \Omega$, $C = 0.005\ \mathrm{S}$, $D = 1$) terminated by $Z_L = 300\ \Omega$. Find the power delivered to the load, the power entering the two-port and the power gain.

**Given:** V_S = 10 V rms; Z_S = 220 ohm; Z_L = 300 ohm; A = 1.5, B = 100 ohm, C = 0.005 S, D = 1

**Solution:**

1. Z_in = 220 ohm from P1, equal to Z_S, so the source is matched and V1 = V_S/2 = 5.000 V rms
2. A_v = Z_L/(A Z_L + B) = 300/550 = 0.54545, so V2 = 0.54545(5.000) = 2.727 V rms
3. P_L = V2^2/R_L = (2.727)^2/300 = 7.438/300 = 0.02479 W = 24.79 mW
4. P_in = V1^2/R_in = 25/220 = 0.11364 W = 113.6 mW, which equals the available source power V_S^2/(4 R_S) = 100/880 = 0.11364 W, as it must for a matched input
5. Power gain G = P_L/P_in = 0.02479/0.11364 = 0.2182 (21.8%, i.e. -6.61 dB); check with \lvert A_v A_i\rvert where A_i = -1/(0.005(300) + 1) = -0.4, giving 0.54545(0.4) = 0.2182

> [!success]- Answer
> **P_L = 24.79 mW, P_in = 113.6 mW, and the power gain is 0.2182 (21.8%, -6.61 dB).**

> [!warning] Trap
> Concluding that a matched input means maximum power reaches the load. Z_in = Z_S only makes the source deliver its available power to the two-port; the network passes just 21.8% of it, so the load sees -6.61 dB relative to the input power.

## Traps & Exam Notes

- Treating Z_in as a fixed property of the two-port. It depends on the load: A/C is only the open-circuit value (300 ohm in P1) and B/D the short-circuit value (100 ohm there), while the terminated answer is 220 ohm.
- Using the input formula at the output port. Z_out = (D Z_S + B)/(C Z_S + A): the source replaces the load and D and A trade places. A coincidental A = 1.5, D = 1 makes the wrong substitution produce a plausible number.
- Dropping the minus in A_i = I2/I1 = -1/(C Z_L + D). I2 leaves port 2, so the current gain carries a 180 deg offset; a magnitude check will not catch it, but the phase and the sign of any feedback term will.
- Squaring the voltage gain to get the power gain when R_in != R_L. G = |A_v|^2 R_in/R_L = \lvert A_v A_i\rvert; |A_v|^2 alone is the power gain only when the input and output resistances happen to be equal.
- Using Z_0 = sqrt(B/C) as the maximum-power-transfer condition, or using it on an asymmetric network. Image matching needs a symmetric section (A = D) and only makes that section look like Z_0; conjugate matching at port 1 needs Z_in = Z_S*.
- Unit slip inside sqrt(B/C). B is in ohms and C in siemens, so the quotient is in ohm^2; entering B in kilohms or C in millisiemens shifts Z_0 by the square root of the conversion factor, not by the factor itself (12.5 ohm with 0.1 mS gives 354 ohm instead of 11.18 ohm).

## See Also

- [[05_Transmission_ABCD_Parameters]]
- [[06_Parameter_Conversions_and_Determinants]]
- [[08_Interconnections_Series,_Parallel,_Cascade]]

---

[[08_Interconnections_Series,_Parallel,_Cascade|⬅ 08]] · [[_MOC_Two_Port_Networks|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
