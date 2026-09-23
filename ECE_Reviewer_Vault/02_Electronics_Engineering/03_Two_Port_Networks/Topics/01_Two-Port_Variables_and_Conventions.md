---
id: ECE-03-01
title: "Two-Port Variables and Conventions"
part: "02_Electronics_Engineering"
area: "03_Two_Port_Networks"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Phasors_and_Complex_Impedance]]", "[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "two_port_networks"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Two-Port Variables and Conventions

> [!abstract] Scope
> Defines what qualifies as a two-port, names the four port variables, and explains how the six parameter sets differ in which pair is treated as the cause and which as the effect.

## Core Concept

> [!tip] Intuition
> A two-port is a black box with two doors. Push a current in one door and a voltage appears at both: the network only tells you how the four port quantities are tied together. Which two you fix and which two you solve for is a free choice, and each choice is one of the six parameter sets. The port condition is the price of entry: whatever current goes in one terminal of a pair must come back out its partner, so the pair acts like a single wire loop.

**The port condition is what makes four terminals into two ports.** A general four-terminal network has four terminal currents and four terminal voltages, and with no constraint the relationships between them need $4\times 4 = 16$ numbers. A *port* is a terminal pair carrying equal and opposite currents: the current entering terminal $a$ equals the current leaving its partner $b$, $I_a = -I_b$. When both pairs satisfy that, the four terminal currents collapse to two port currents and only $2\times 2 = 4$ parameters are needed. This is the entire reason two-port theory is tractable. A pair fails the port condition whenever an extra path taps the return current — a shared ground that also carries another stage's current, a tap to a third terminal, an unbalanced connection to a coaxial shield. Then no two-port model exists, no matter how many parameters you are willing to compute; the correct fix is to redraw so the shared branch is outside the box.

**Four variables, six ways to choose cause and effect.** Label port 1 (input) and port 2 (output), with $I_1$ entering the positive terminal of port 1 and $I_2$ entering the positive terminal of port 2 — so under a normal load, $I_2$ is the current *leaving* the network at port 2, and the current through the load is $-I_2$. Of the four quantities $V_1, I_1, V_2, I_2$, choose any two as independent; the network's linearity then determines the other two uniquely. That is $\binom{4}{2} = 6$ choices, and they are exactly the six standard sets: $[z]$ ($I_1, I_2$ in), $[y]$ ($V_1, V_2$ in), $[h]$ ($I_1, V_2$ in), $[g]$ ($V_1, I_2$ in), $[ABCD]$ ($V_2, I_2$ in), and the inverse transmission set ($V_1, I_1$ in). No set is more fundamental than another; each is the natural description of one physical experiment.

**Why each set is natural for a different measurement.** If you can measure voltages while holding currents at zero, you want $[z]$: setting $I_2 = 0$ is nothing more than leaving the output *open-circuited*, and setting $I_1 = 0$ means opening the input. Every $z$ parameter is therefore an open-circuit measurement in ohms. If instead you can measure currents while holding voltages at zero, you want $[y]$: $V_2 = 0$ is a *short circuit* at the output and $V_1 = 0$ a short at the input, and every $y$ parameter is a short-circuit measurement in siemens. When one port is awkward to drive and the other awkward to short, $[h]$ mixes the two: $h_{11}$ and $h_{22}$ are short-circuit measurements but $h_{12}$ and $h_{21}$ are open-circuit ones, which is why the four $h$ parameters do not share a unit. $[ABCD]$ is built for signals travelling one way through a chain: it takes the output as the cause, which is what a transmission line or a filter does, and it has the unique property that cascaded blocks multiply as matrices. The inverse transmission set (sometimes written $[b]$ or $[a']$) reverses that: it takes port 1 as the cause.

**Existence conditions: the network must be linear, source-free and initially relaxed.** The constant parameters above only exist if three things hold. First, the network is *linear*: if doubling $I_1$ did not double $V_2$, no constant $z_{21}$ could describe it. Second, it contains no *independent* sources. An independent source inside makes a port quantity nonzero with no external excitation, so the relations acquire constant offsets, $V_1 = z_{11}I_1 + z_{12}I_2 + V_{oc}$, and the 2x2 matrix is no longer the whole story. Third, the network is *initially relaxed* — no energy already stored in capacitors or inductors from earlier switching — because a pre-charged capacitor also produces an output from zero input. Dependent sources are permitted and in fact essential: a transistor amplifier is a two-port containing a controlled source, and such a network is generally *non-reciprocal*. If a set's defining excitation pair is not independent (for example a network whose $\Det[z] = 0$, such as an ideal transformer, or an ideal short at a port) then that particular set simply does not exist and another one must be used.

**The parameters are driving-point and transfer functions, not just table entries.** Read each entry as a measured ratio. $z_{11}$ and $z_{22}$ are *driving-point* impedances: the impedance looking into a port while the other is open. $z_{12}$ and $z_{21}$ are *transfer* impedances: how much voltage appears at the far port per ampere forced in at the near one. $y_{11}$ and $y_{22}$ are driving-point admittances with the other port shorted, and $y_{12}, y_{21}$ are transfer admittances. In the hybrid set, $h_{11}$ is a driving-point impedance, $h_{22}$ a driving-point admittance, while $h_{12}$ is a dimensionless reverse voltage ratio and $h_{21}$ a dimensionless forward current gain. This is why $h$ is the language of the BJT data sheet and of [[05_BJT_Small-Signal_h-Parameter_Model]]: $h_{ie}, h_{re}, h_{fe}, h_{oe}$ are exactly a short-circuit input impedance, an open-circuit reverse voltage ratio, a short-circuit forward current gain and an open-circuit output admittance.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Port condition | $I_a = -I_b \quad \mathrm{and} \quad I_c = -I_d$ | Terminal a/b are one pair, c/d the other. If any external branch taps the return path, no two-port model exists. |
| Z-parameter (open-circuit) definitions | $V_1 = z_{11}I_1 + z_{12}I_2, \qquad V_2 = z_{21}I_1 + z_{22}I_2$ | I1 and I2 are the independent variables; each z is measured with one port open-circuited. Units: ohm. |
| Y-parameter (short-circuit) definitions | $I_1 = y_{11}V_1 + y_{12}V_2, \qquad I_2 = y_{21}V_1 + y_{22}V_2$ | V1 and V2 are independent; each y is measured with one port short-circuited. Units: siemens. |
| H-parameter (hybrid) definitions | $V_1 = h_{11}I_1 + h_{12}V_2, \qquad I_2 = h_{21}I_1 + h_{22}V_2$ | Mixed units: h11 in ohm, h22 in siemens, h12 and h21 dimensionless. The BJT small-signal set. |
| Inverse hybrid (g) definitions | $I_1 = g_{11}V_1 + g_{12}I_2, \qquad V_2 = g_{21}V_1 + g_{22}I_2$ | The exact transpose of the h choice: V1 and I2 are independent. g11 in siemens, g22 in ohm. |
| Transmission (ABCD) definitions | $V_1 = AV_2 - BI_2, \qquad I_1 = CV_2 - DI_2$ | I2 is defined LEAVING port 2, hence the minus signs. A and D dimensionless, B in ohm, C in siemens. |
| Open-circuit driving-point impedance | $z_{11} = \left.\frac{V_1}{I_1}\right\rvert_{I_2 = 0}$ | The bar means 'evaluate with I2 = 0', i.e. the output left open. Use it whenever a load is disconnected. |
| Open-circuit transfer impedance | $z_{21} = \left.\frac{V_2}{I_1}\right\rvert_{I_2 = 0}$ | Measured with the output open, so the output voltmeter draws no current. Sign follows the declared I1 direction. |
| Reciprocity in the z set | $z_{12} = z_{21}$ | Holds for every network of R, L, C and mutual inductance only. A dependent source normally destroys it. |
| Ideal-transformer z matrix | $[z] = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} \;\mathrm{for}\; V_1 = nV_2,\; I_1 = -\frac{1}{n}I_2$ | Det[z] = 0, so the z set does not exist for an ideal transformer; use ABCD instead. A favourite conceptual trap. |

## Worked Problems

### P1. **Which set is defined by short-circuit measurements?** A network is tested with its output terminals short-circuited and its input driven by a current source of known value. Which parameter set is being measured directly, what are the units of each entry, and why is the output short-circuited rather than left open?

**Given:** output short-circuited (V2 = 0); input driven by a current source; measured quantities: input voltage V1, output current I2

**Solution:**

1. Setting V2 = 0 in the general relations eliminates the terms in V2 and leaves the y set as the only one whose defining excitation is a voltage pair: I1 = y11 V1 + y12 V2 and I2 = y21 V1 + y22 V2 reduce to I1 = y11 V1 and I2 = y21 V1
2. With V2 = 0: y11 = I1/V1 (a driving-point admittance, unit siemens) and y21 = I2/V1 (a transfer admittance, also siemens). Driving V2 and shorting the input gives y22 = I2/V2 and y12 = I1/V2, both siemens
3. The short circuit is what forces the V2 column to vanish. Leaving the output open (I2 = 0) instead selects the z set, whose entries are ohms; the experiment and the units both change
4. Units: every y entry is in siemens (A/V). Contrast z (ohm), h (mixed) and ABCD (mixed)

> [!success]- Answer
> **The y (admittance) set, all four entries in siemens: y11 = 0.02 S, y21 = 0.01 S for the drive test, plus y22 = 0.04 S, y12 = 0.01 S for the reverse test.**

> [!warning] Trap
> Answering 'z parameters measured with a short circuit'. z is the OPEN-circuit set; a short at the output is precisely the condition I2 = 0's opposite. Mixing the two gives every z entry the wrong unit and the wrong sign of experiment.

### P2. **Identify the parameter set from a measurement table.** A linear resistive two-port was tested three times. Identify which parameter set the table measures, name each measured parameter with its unit, and give the full parameter matrix.

**Given:** Test 1: I1 = 0 with V2 = 6 V gives V1 = 2.4 V; Test 2: V2 = 0 with I1 = 2 mA gives V1 = 12 mV and I2 = -1.333 mA; Test 3: I1 = 0 with V2 = 9 V gives I2 = 0.6 mA

**Solution:**

1. Tests 1 and 3 both hold I1 = 0 and drive V2, so the independent pair is (I1, V2): this is the hybrid (h) set, read from V1 = h11 I1 + h12 V2 and I2 = h21 I1 + h22 V2
2. Test 1 gives the reverse voltage ratio h12 = V1/V2 at I1 = 0 = 2.4/6 = 0.4 (dimensionless)
3. Test 2 short-circuits the output (V2 = 0), so h11 = V1/I1 = 12 mV / 2 mA = 6 ohm and h21 = I2/I1 = -1.333 mA / 2 mA = -0.6667 (dimensionless)
4. Test 3 opens the input (I1 = 0), so h22 = I2/V2 = 0.6 mA / 9 V = 0.06667 S = 66.67 mS
5. Assemble the matrix in the order [[h11, h12], [h21, h22]] = [[6 ohm, 0.4], [-0.6667, 0.06667 S]]

> [!success]- Answer
> **[h] = [[6 ohm, 0.4], [-0.6667, 0.06667 S]]: h11 = 6 ohm, h12 = 0.4, h21 = -0.6667, h22 = 66.67 mS.**

> [!warning] Trap
> Assuming all four h entries share one unit because the table lists them together. h11 is in ohm and h22 in siemens while h12 and h21 are pure ratios; writing h21 = -0.6667 ohm is the classic slip. Also note the negative h21 comes purely from the I2-enters-port-2 convention, not from a faulty measurement.

### P3. **Does this network satisfy the port condition?** A PCB trace pair carries a 1 mA signal into terminal a; the return reaches terminal b but 0.4 mA of it leaves through a via to chassis while 0.6 mA continues to b. The output pair is c/d with 1 mA in at c and 1 mA out at d. Is the board layout a valid two-port, and if not what must be changed?

**Given:** input pair a/b: 1 mA in at a, 0.6 mA out at b, 0.4 mA diverted to chassis; output pair c/d: 1 mA in at c, 1 mA out at d; signal frequency low enough that displacement current is negligible

**Solution:**

1. Check the port condition for the input pair: current entering a is 1 mA, current leaving b is 0.6 mA, so Ia + Ib = 1 - 0.6 = 0.4 mA, not zero
2. The 0.4 mA deficit means the chassis branch carries the balance, so terminals a/b do not form a port: the return current has an external path
3. Check the output pair: 1 mA in at c and 1 mA out at d gives Ic + Id = 0, so c/d does satisfy the port condition
4. The network therefore has only one genuine port plus a shared chassis connection. Any 2x2 parameter matrix computed from terminal measurements would absorb the second stage's ground current into the box and give parameters that change with the rest of the system
5. Fix: reroute so the signal return is a dedicated conductor fully contained in the box, or redraw the model with the shared chassis branch explicitly outside the two-port, as a common lead of a three-terminal model

> [!success]- Answer
> **No. The input pair fails: I_a + I_b = +0.4 mA instead of 0, so the network is not a two-port until the chassis branch is moved outside the box.**

> [!warning] Trap
> Judging the port condition by whether terminals come in pairs on a schematic. The test is arithmetic — current into one terminal must equal current out of its partner. A shared ground carrying another stage's current breaks it even though the drawing looks like two neat pairs.

### P4. **Driving-point impedance from the defining equation.** A two-port has $z_{11} = 22\ \Omega$, $z_{12} = 8\ \Omega$, $z_{21} = 8\ \Omega$, $z_{22} = 15\ \Omega$. Find the resistance seen looking into port 1 when port 2 is loaded by $Z_L = 60\ \Omega$, correct to two decimals. Verify the answer a second way.

**Given:** z11 = 22 ohm; z12 = 8 ohm; z21 = 8 ohm; z22 = 15 ohm; ZL = 60 ohm

**Solution:**

1. Apply the load: V2 = -I2 ZL, since I2 leaves port 2 and the load current is -I2
2. Substitute into the output equation V2 = z21 I1 + z22 I2: -60 I2 = 8 I1 + 15 I2, so 75 I2 = -8 I1 and I2 = -0.1067 I1
3. Substitute into the input equation: V1 = 22 I1 + 8 I2 = 22 I1 + 8(-0.1067 I1) = 22 - 0.8533 = 21.1467 I1
4. Zin1 = 21.15 ohm; cross-check with Zin1 = z11 - z12 z21/(z22 + ZL) = 22 - 64/75 = 22 - 0.8533 = 21.1467 ohm

> [!success]- Answer
> **Z_in,1 = 21.15 ohm (21.1467 ohm before rounding).**

> [!warning] Trap
> Substituting V2 = +I2 ZL. Because I2 is defined entering port 2 while the load current flows out of it, the load relation carries a minus sign; getting it wrong gives Zin1 = 22 + 0.8533 = 22.85 ohm and a completely different (and wrong) answer.

### P5. **Why the ideal transformer has no z matrix, and what to use instead.** An ideal transformer has a 4:1 turns ratio, $V_1 = 4V_2$ and $I_1 = -0.25I_2$. Attempt to write a $[z]$ matrix, state what goes wrong, and give the parameter set that does describe it.

**Given:** turns ratio n = N1/N2 = 4; V1 = 4 V2; I1 = -0.25 I2

**Solution:**

1. The z form must read V1 = z11 I1 + z12 I2 and V2 = z21 I1 + z22 I2. The transformer equations contain no I1 in the V1 expression and no I2 in the V2 expression
2. Matching coefficients forces z11 = 0, z12 = 0, z21 = 0, z22 = 0, so [z] = [[0,0],[0,0]]; every entry vanishes
3. This matrix cannot be inverted, so [y] = [z]^-1 does not exist either, and the transformer cannot be modelled as a Thevenin/Norton pair driving port 1
4. The natural set is transmission: rewriting V1 = 4V2 and I1 = -0.25I2 in the form V1 = A V2 - B I2, I1 = C V2 - D I2 gives A = 4 V/V, B = 0 ohm, C = 0 S, D = 0.25 A/A
5. Check reciprocity: AD - BC = 4(0.25) = 1, confirmed, and A is not equal to D so the transformer is reciprocal but not symmetric

> [!success]- Answer
> **[z] = [[0, 0], [0, 0]] with Det = 0, so no z or y description exists; the ABCD set is [A B; C D] = [[4, 0], [0, 0.25]].**

> [!warning] Trap
> Reporting z11 = 4 or z11 = infinity for the ideal transformer by misreading V1 = 4V2 as V1 = 4I1. The transformer constrains voltage to voltage and current to current, so all four z entries are zero — the failure is a singular matrix, not an infinite one.

## Traps & Exam Notes

- **Calling any four-terminal box a two-port.** The port condition is an equation, not a shape: current into terminal a must equal current out of its partner b. A shared ground that also carries another stage's current violates it, and then the 2x2 parameters you compute change whenever the rest of the circuit changes.
- **Forgetting which set uses open circuits and which uses short circuits.** $z$ is the OPEN-circuit set (I = 0 enforced), $y$ is the SHORT-circuit set (V = 0 enforced). Swapping them inverts every unit: ohms become siemens and every numeric answer is wrong by a square.
- **Using a two-port model for a network with an independent source inside.** The presence of an independent source adds constant terms such as $V_{oc}$ to the port equations, so the 2x2 matrix is not the complete description. Either kill the source and add its contribution by superposition, or use a Thevenin equivalent at the port.
- **Ignoring stored energy at t = 0.** The parameters assume an initially relaxed network. If a capacitor already holds a charge, port quantities are nonzero for zero excitation and the measured ratios are contaminated by the transient; take the measurement after the transient has decayed or use Laplace-domain parameters.
- **Assuming a two-port containing a dependent source is reciprocal.** Dependent sources break reciprocity: the transistor amplifier is the standard two-port whose $z_{12} \neq z_{21}$ and $h_{12} \neq -h_{21}$. Reciprocity is a property of R, L, C and mutual inductance only.
- **Treating the I2 sign convention as harmless bookkeeping.** Textbooks differ: some take $I_2$ entering port 2 (used here), some take it leaving. The two choices give sign-flipped $z_{12}, z_{21}, h_{21}$ and $ABCD$'s B and D. Always state the convention before quoting a sign.

## See Also

- [[02_Z_and_Y_Parameters]]
- [[04_Hybrid_and_Inverse_Hybrid_Parameters]]
- [[05_Transmission_ABCD_Parameters]]

---

⬅ *start* · [[_MOC_Two_Port_Networks|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Z_and_Y_Parameters|02 ➡]]
