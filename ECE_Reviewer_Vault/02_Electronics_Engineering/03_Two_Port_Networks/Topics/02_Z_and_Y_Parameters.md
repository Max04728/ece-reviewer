---
id: ECE-03-02
title: "Z and Y Parameters"
part: "02_Electronics_Engineering"
area: "03_Two_Port_Networks"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Two-Port_Variables_and_Conventions]]", "[[03_Series_and_Parallel_AC_Analysis]]"]
tags: ["ece", "electronics_engineering", "two_port_networks"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Z and Y Parameters

> [!abstract] Scope
> How to measure, compute and convert the open-circuit impedance and short-circuit admittance parameters, including the T and pi network shortcuts and the matrix inverse that links them.

## Core Concept

> [!tip] Intuition
> The z parameters ask: drive one port with a current, look at the voltages with the other port left open. The y parameters ask the dual question: drive one port with a voltage, look at the currents with the other port shorted. They carry the same information in reciprocal units, so converting between them is nothing more than inverting a 2x2 matrix — and for a T or pi network the six measurements can be read off the schematic by inspection.

**Every z entry is an open-circuit measurement, and every y entry a short-circuit one.** Fix the independent pair as $(I_1, I_2)$ and the network responds with $V_1 = z_{11}I_1 + z_{12}I_2$ and $V_2 = z_{21}I_1 + z_{22}I_2$. Setting $I_2 = 0$ means opening port 2, so $z_{11} = V_1/I_1$ is the driving-point impedance looking into port 1 with the output open, and $z_{21} = V_2/I_1$ is the transfer impedance measuring how much open-circuit output voltage one ampere at the input produces. Setting $I_1 = 0$ (output driven, input open) gives $z_{22} = V_2/I_2$ and $z_{12} = V_1/I_2$. All four are in ohms. Fix the independent pair instead as $(V_1, V_2)$ and you get the dual set: $y_{11} = I_1/V_1$ at $V_2 = 0$ (output shorted), $y_{21} = I_2/V_1$ at $V_2 = 0$, $y_{22} = I_2/V_2$ at $V_1 = 0$, $y_{12} = I_1/V_2$ at $V_1 = 0$, all in siemens. The names *driving-point* and *transfer* matter: $z_{11}$ and $z_{22}$ are impedances you could measure with an ohmmeter across one port, while $z_{12}$ and $z_{21}$ require injecting into one port and metering the other.

**The T network hands you the z parameters by inspection.** For a T (Y) network with series arms $Z_a$ at the input, $Z_b$ in the shunt leg and $Z_c$ at the output, opening port 2 leaves $Z_a + Z_b$ in series across port 1, so $z_{11} = Z_a + Z_b$; opening the input across port 2 gives $z_{22} = Z_b + Z_c$. Driving port 1 with the output open, all of $I_1$ must return through the shunt arm, so $V_2 = Z_b I_1$ and $z_{21} = Z_b$; by the same argument from the other side $z_{12} = Z_b$. The shunt arm therefore *is* the transfer impedance, which is why a passive T network is automatically reciprocal, $z_{12} = z_{21} = Z_b$. Inverting that reading gives the extraction recipe $Z_a = z_{11} - z_{12}$, $Z_b = z_{12}$, $Z_c = z_{22} - z_{12}$ used in [[03_T_and_Pi_Equivalent_Networks]]. The pi network is the exact dual: $\pi$ arms $Y_a$ (input shunt), $Y_b$ (series), $Y_c$ (output shunt) give $y_{11} = Y_a + Y_b$, $y_{12} = y_{21} = -Y_b$, $y_{22} = Y_b + Y_c$, so the series arm appears with a negative sign. That minus sign is the single most common source of a wrong pi network.

**Converting between the sets is matrix inversion, and the reciprocal case is worth memorising.** Since $[V] = [z][I]$ and $[I] = [y][V]$, substituting gives $[y] = [z]^{-1}$. For a 2x2 matrix the inverse is the adjugate over the determinant, so with $d_z = z_{11}z_{22} - z_{12}z_{21}$, the conversion is $y_{11} = z_{22}/d_z$, $y_{12} = -z_{12}/d_z$, $y_{21} = -z_{21}/d_z$, $y_{22} = z_{11}/d_z$. Read carefully: the *diagonal* entries swap places and the *off-diagonal* entries keep their magnitude but flip sign. Inverting the other way gives $z_{11} = y_{22}/d_y$, $z_{12} = -y_{12}/d_y$, $z_{21} = -y_{21}/d_y$, $z_{22} = y_{11}/d_y$, with the determinant:
$$d_y = y_{11}y_{22} - y_{12}y_{21} = 1/d_z$$
Two consequences are exam favourites. First, if $d_z = 0$ the y set does not exist at all; that is exactly what happens for an ideal transformer, whose $[z]$ is the zero matrix. Second, the determinant is not invariant, it inverts, so a network with small $d_z$ has enormous y parameters.

**Reciprocity and symmetry, read straight off the matrix.** A network built only from R, L, C and mutual inductance satisfies $z_{12} = z_{21}$ and $y_{12} = y_{21}$, so its matrices are symmetric about the main diagonal; equivalently $d_z$ enters the conversion as a common scale and the signs work out consistently. A network is *symmetrical* when its two ports are interchangeable, which in the z set means $z_{11} = z_{22}$ and in the y set $y_{11} = y_{22}$. Symmetry is a stronger statement than reciprocity and requires the actual network to be physically mirrored, not merely passive. A dependent source inside the box normally destroys reciprocity: adding a transresistance amplifier of value $r_m$ to an output branch changes $z_{21}$ by $r_m$ without touching $z_{12}$, so the matrix becomes asymmetric even though every resistor in it is passive. When the exam asks 'is this network reciprocal?', the fastest test is to compare the two off-diagonal entries — never to reason about whether the parts look passive.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Open-circuit input impedance | $z_{11} = \left.\frac{V_1}{I_1}\right vert_{I_2=0}$ | Output open. Driving-point impedance of port 1, in ohm. |
| Open-circuit reverse transfer impedance | $z_{12} = \left.\frac{V_1}{I_2}\right vert_{I_1=0}$ | Input open, drive port 2. In ohm; equals z21 for any reciprocal network. |
| Open-circuit forward transfer impedance | $z_{21} = \left.\frac{V_2}{I_1}\right vert_{I_2=0}$ | Output open. Note the output voltmeter must not load the port, or I2 is not really zero. |
| Open-circuit output impedance | $z_{22} = \left.\frac{V_2}{I_2}\right vert_{I_1=0}$ | Input open. Driving-point impedance of port 2, in ohm. |
| Short-circuit input admittance | $y_{11} = \left.\frac{I_1}{V_1}\right vert_{V_2=0}$ | Output shorted. In siemens; the dual of z11 but NOT its reciprocal. |
| Short-circuit forward transfer admittance | $y_{21} = \left.\frac{I_2}{V_1}\right vert_{V_2=0}$ | Output shorted, input driven by a voltage source. In siemens. |
| Short-circuit output admittance | $y_{22} = \left.\frac{I_2}{V_2}\right vert_{V_1=0}$ | Input shorted. In siemens. |
| Short-circuit reverse transfer admittance | $y_{12} = \left.\frac{I_1}{V_2}\right vert_{V_1=0}$ | Input shorted, drive port 2. In siemens; y12 = y21 for a reciprocal network. |
| T network z parameters | $z_{11} = Z_a + Z_b, \quad z_{12} = z_{21} = Z_b, \quad z_{22} = Z_b + Z_c$ | Za input series arm, Zb shunt leg, Zc output series arm. The shunt leg is the transfer impedance. |
| Pi network y parameters | $y_{11} = Y_a + Y_b, \quad y_{12} = y_{21} = -Y_b, \quad y_{22} = Y_b + Y_c$ | Ya and Yc are the shunt arms, Yb the series arm. The series arm enters NEGATIVELY. |
| Z to Y conversion | $y_{11} = \frac{z_{22}}{d_z}, \quad y_{12} = \frac{-z_{12}}{d_z}, \quad y_{21} = \frac{-z_{21}}{d_z}, \quad y_{22} = \frac{z_{11}}{d_z}$ | dz = z11 z22 - z12 z21. Diagonals swap, off-diagonals keep magnitude and flip sign. |
| Y to Z conversion | $z_{11} = \frac{y_{22}}{d_y}, \quad z_{12} = \frac{-y_{12}}{d_y}, \quad z_{21} = \frac{-y_{21}}{d_y}, \quad z_{22} = \frac{y_{11}}{d_y}$ | dy = y11 y22 - y12 y21 and dy = 1/dz. If dz = 0 the y set does not exist. |

## Worked Problems

### P1. **Find the z parameters of a T network.** A T network has a $20\ \Omega$ series arm at port 1, a $10\ \Omega$ shunt leg, and a $20\ \Omega$ series arm at port 2. Find all four z parameters and check reciprocity.

**Given:** Za = 20 ohm (input series arm); Zb = 10 ohm (shunt leg); Zc = 20 ohm (output series arm)

**Solution:**

1. z11 with the output open: Za and Zb are in series, z11 = 20 + 10 = 30 ohm
2. z21 with the output open: the whole I1 returns through the shunt leg, so z21 = Zb = 10 ohm
3. z22 with the input open: Zc and Zb are in series, z22 = 20 + 10 = 30 ohm
4. z12 by the same argument from port 2: z12 = Zb = 10 ohm. The matrix is [30, 10; 10, 30] ohm
5. Reciprocity check: z12 = 10 = z21, so the network is reciprocal; symmetry check: z11 = 30 = z22, so it is also symmetric

> [!success]- Answer
> **[z] = [30, 10; 10, 30] ohm: z11 = 30 ohm, z12 = z21 = 10 ohm, z22 = 30 ohm; reciprocal and symmetric.**

> [!warning] Trap
> Writing z11 = Za = 20 ohm by forgetting that the shunt leg is still in the current path when port 2 is open. With I2 = 0 nothing can flow in the Zc branch, but Zb still carries all of I1, so it must be included.

### P2. **Find the y parameters of a pi network.** A pi network has shunt arms of $20\ \Omega$ and $33.33\ \Omega$ with a $100\ \Omega$ series arm. Find all four y parameters.

**Given:** Ra = 20 ohm (input shunt); Rb = 100 ohm (series arm); Rc = 33.33 ohm (output shunt)

**Solution:**

1. Convert to admittances: Ya = 1/20 = 0.05 S, Yb = 1/100 = 0.01 S, Yc = 1/33.33 = 0.03 S
2. With the output shorted (V2 = 0) the output shunt is bypassed: y11 = Ya + Yb = 0.05 + 0.01 = 0.06 S
3. Still with the output shorted, a drive of 1 V forces 0.01 A through the series arm out of the shorted port with the I2 reference leaving: y21 = -Yb = -0.01 S
4. With the input shorted (V1 = 0): y22 = Yb + Yc = 0.01 + 0.03 = 0.04 S and y12 = -Yb = -0.01 S
5. The matrix is [0.06, -0.01; -0.01, 0.04] S, symmetric, so the network is reciprocal; verify dy = 0.06(0.04) - 0.01 = 0.0014

> [!success]- Answer
> **[y] = [0.06, -0.01; -0.01, 0.04] S: y11 = 60 mS, y12 = y21 = -10 mS, y22 = 40 mS.**

> [!warning] Trap
> Making the series arm's contribution positive in y12 and y21. Because the transfer current is measured with the reference I2 leaving port 2, a positive series admittance between the ports produces a NEGATIVE off-diagonal entry. A pi network always has y12 = y21 < 0.

### P3. **Convert a given [z] to [y].** A two-port has $z_{11} = 30\ \Omega$, $z_{12} = 10\ \Omega$, $z_{21} = 10\ \Omega$, $z_{22} = 35\ \Omega$. Find $[y]$ and verify one entry by an independent calculation.

**Given:** z11 = 30 ohm; z12 = 10 ohm; z21 = 10 ohm; z22 = 35 ohm

**Solution:**

1. Determinant: dz = z11 z22 - z12 z21 = (30)(35) - (10)(10) = 1050 - 100 = 950 ohm^2
2. y11 = z22/dz = 35/950 = 0.03684 S (36.84 mS); y22 = z11/dz = 30/950 = 0.03158 S (31.58 mS)
3. y12 = -z12/dz = -10/950 = -0.01053 S (-10.53 mS); y21 = -z21/dz = -10/950 = -0.01053 S
4. Verify y12 independently on the T equivalent (Za = 20 ohm, Zb = 10 ohm, Zc = 25 ohm): short port 1 so V1 = 0, apply V2 = 1 V, and use the node at the top of Zb. That node sits at 1 x Zb/(Zb + Zc) = 10/35 = 0.28571 V, so 0.28571/20 = 14.286 mA flows through Za into the short, giving I1 = -14.286 mA
5. So the true y12 is -10.53 mS, and the determinant check confirms it: dy = y11 y22 - y12 y21 = 0.03684 x 0.03158 - (0.01053)^2 = 1.1634e-3 - 1.1088e-4 = 1.0526e-3 S^2, which is exactly 1/dz = 1/950

> [!success]- Answer
> **[y] = [36.84, -10.53; -10.53, 31.58] mS; verified by dy = 1/dz = 1.0526 mS^2 per ohm^2.**

> [!warning] Trap
> Writing y11 = 1/z11 = 1/30 = 33.33 mS. The correct y11 = z22/dz = 36.84 mS because z11 is measured with port 2 OPEN while y11 is measured with port 2 SHORTED — different experiments, so they are not reciprocals.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`: `Apps` `1` `Dim` sets MatA to 2x2, then `Apps` `2` `Data` to key in `30 10 10 35`.
> 2. `Apps` `▼` `1` `Det` → **950** $\Omega^2$; `Apps` `▼` `5` `Inv` → the inverse IS $[y]$: **36.84, -10.53, -10.53, 31.58** mS.
> 3. Identity check: `1÷950` → **1.0526** mS$^2$ per $\Omega^2$, which is $\Delta_y$.

### P4. **Open-circuit input and output impedance.** For the two-port of the previous problem, find the impedance looking into port 1 with port 2 open and the impedance looking into port 2 with port 1 open, and state the general rule.

**Given:** z11 = 30 ohm; z12 = 10 ohm; z21 = 10 ohm; z22 = 35 ohm

**Solution:**

1. By definition, with I2 = 0 the impedance seen at port 1 is V1/I1 = z11 = 30 ohm
2. By definition, with I1 = 0 the impedance seen at port 2 is V2/I2 = z22 = 35 ohm
3. These are the single-port driving-point measurements; no matrix inversion is needed because the open-circuit condition is exactly the definition of the diagonal entries
4. Contrast with the short-circuit admittances: 1/y11 = 1/0.03684 = 27.14 ohm, which is a different number because the output is shorted in that measurement

> [!success]- Answer
> **Z_in,1 (port 2 open) = z11 = 30 ohm; Z_in,2 (port 1 open) = z22 = 35 ohm.**

> [!warning] Trap
> Quoting 1/y11 as the open-circuit input impedance. The open-circuit input impedance is z11 exactly; 1/y11 is the input impedance with the output SHORTED, and for this network the two differ by 2.86 ohm (about 10 percent).

### P5. **A network with a dependent source is not reciprocal.** A two-port has $z_{11} = 20\ \Omega$ and $z_{22} = 30\ \Omega$, with $z_{12} = 5\ \Omega$. An amplifier inside the box senses $I_1$ and injects into the output branch so that $z_{21}$ is raised to $15\ \Omega$. Find the full matrix, the determinant, and prove non-reciprocity through the hybrid parameters.

**Given:** z11 = 20 ohm; z12 = 5 ohm; z21 = 15 ohm (raised by the transresistance dependent source); z22 = 30 ohm

**Solution:**

1. Assemble [z] = [20, 5; 15, 30] ohm. It is not symmetric about the main diagonal, so the network is not reciprocal
2. dz = (20)(30) - (5)(15) = 600 - 75 = 525 ohm^2
3. h12 = z12/z22 = 5/30 = 0.1667; h21 = -z21/z22 = -15/30 = -0.5. The reciprocity condition h12 = -h21 requires 0.1667 = +0.5, which fails
4. Cross-check in the y set: y12 = -z12/dz = -5/525 = -9.524 mS and y21 = -z21/dz = -15/525 = -28.57 mS; reciprocity would require y12 = y21, and it does not hold
5. Conclude: a passive network with these diagonal values would have had z21 = 5 ohm and been reciprocal; the extra 10 ohm of transfer impedance comes entirely from the dependent source, which is one-way and therefore breaks reciprocity

> [!success]- Answer
> **[z] = [20, 5; 15, 30] ohm, dz = 525 ohm^2, non-reciprocal (z12 = 5 ohm vs z21 = 15 ohm; h12 = 0.1667 vs -h21 = +0.5).**

> [!warning] Trap
> Concluding the network is reciprocal because the parts list only resistors and the diagonal entries look ordinary. Non-reciprocity lives entirely in the off-diagonal entries; a dependent source raises z21 without touching z12, and only a direct comparison of the two off-diagonals (or of h12 with -h21) reveals it.

## Traps & Exam Notes

- **Treating y11 as 1/z11 or z11 as 1/y11.** They are different experiments on the same network: z11 opens the far port, y11 shorts it. They are reciprocals only for a one-port or for a network whose transfer terms vanish. The exact relations are y11 = z22/dz and z11 = y22/dy.
- **Sign and placement errors in the T and pi shortcuts.** For the T network, z12 = z21 = +Zb (the shunt leg, positive). For the pi network, y12 = y21 = -Yb (the series arm, negative). Writing the pi transfer term as +Yb flips the sign of every converted answer and destroys the determinant check.
- **Dropping the diag/off-diag swap in the conversion.** y11 takes z22, not z11, and y22 takes z11. Putting them the right way round but forgetting the minus on the off-diagonals is equally fatal: it makes the determinant come out wrong and hides non-reciprocity.
- **Assuming dz is always positive, or that it can be zero and nothing happens.** A network with a dependent source can easily have dz <= 0, and if dz = 0 the y set does not exist at all (the ideal transformer is the standard example). Always compute dz before dividing by it.
- **Believing reciprocity implies symmetry.** Every symmetric network is reciprocal, but the converse fails: z11 = 20 ohm and z22 = 50 ohm with z12 = z21 = 10 ohm is perfectly reciprocal yet its ports are not interchangeable. Symmetry needs z11 = z22 as well.
- **Measuring z11 with a voltmeter that loads the port.** The definition requires I2 = 0. A real meter draws current, so a measured z11 is contaminated by the load; use a high-impedance meter or compensate by treating the meter as part of the load and applying the loaded-input formula.

## See Also

- [[03_T_and_Pi_Equivalent_Networks]]
- [[06_Parameter_Conversions_and_Determinants]]
- [[07_Reciprocity_and_Symmetry_Conditions]]

---

[[01_Two-Port_Variables_and_Conventions|⬅ 01]] · [[_MOC_Two_Port_Networks|MOC]] · [[00_Dashboard|Dashboard]] · [[03_T_and_Pi_Equivalent_Networks|03 ➡]]
