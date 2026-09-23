---
id: ECE-03-07
title: "Reciprocity and Symmetry Conditions"
part: "02_Electronics_Engineering"
area: "03_Two_Port_Networks"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Two-Port_Variables_and_Conventions]]", "[[02_Z_and_Y_Parameters]]"]
tags: ["ece", "electronics_engineering", "two_port_networks"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Reciprocity and Symmetry Conditions

> [!abstract] Scope
> Decide whether a two-port is reciprocal or symmetric from its parameter matrix or its schematic, and know which components destroy each property.

## Core Concept

> [!tip] Intuition
> Reciprocity means the ports can trade roles: drive port 1 and measure port 2, or drive port 2 and measure port 1, and the same transfer ratio appears. Symmetry is stronger and purely geometric in the electrical sense: the network behaves identically when the two ports are exchanged, so its input and output sides are indistinguishable.

**Reciprocity is a property of the components, not of the wiring.** A network built only from resistors, inductors, capacitors, mutual inductance and ideal transformers is reciprocal — this is the reciprocity theorem for linear bilateral elements, and it holds no matter how those elements are wired. In the z-set the test is $z_{12} = z_{21}$: the open-circuit transfer impedance from port 1 to port 2 equals the one from port 2 to port 1. In the y-set it is $y_{12} = y_{21}$, and in the transmission set it is $AD - BC = 1$. The moment a controlled source appears — a transistor, an op-amp, a gyrator, an isolator — the network can become non-reciprocal, and it usually does, because a controlled source is a one-way device by construction ([[05_BJT_Small-Signal_h-Parameter_Model]]).

**Why h and g carry a minus sign in their reciprocity test.** The h-set measures a voltage at port 1 against a voltage at port 2 and a current at port 2 against a current at port 1, and $I_2$ is defined leaving the network. Substituting the conversion formulas $h_{12} = z_{12}/z_{22}$ and $h_{21} = -z_{21}/z_{22}$ into $z_{12} = z_{21}$ gives $h_{12}z_{22} = -h_{21}z_{22}$, that is $h_{12} = -h_{21}$. The minus is a bookkeeping consequence of the current direction, not a physical asymmetry. The same reasoning gives $g_{12} = -g_{21}$, and for the transmission set:
$$AD - BC = z_{12}/z_{21} = -h_{12}/h_{21}$$
([[06_Parameter_Conversions_and_Determinants]]). A quick dimensional sanity check: $h_{12}$ and $h_{21}$ are both dimensionless, so a test like $h_{12} = -h_{21}$ is at least unit-consistent, whereas comparing $h_{12}$ with $z_{21}$ is not.

**Symmetry: mirror image about the ports, and it implies reciprocity.** A two-port is symmetric when interchanging the two ports leaves the network unchanged. Electrically that means the z-matrix is unchanged by swapping the port labels, so $z_{11} = z_{22}$ AND $z_{12} = z_{21}$ — the port-equality condition plus reciprocity. The port-equality condition can be written in any set, and all of these forms are the same test: $z_{11} = z_{22}$, $y_{11} = y_{22}$, $A = D$, $\Delta_h = 1$, $\Delta_g = 1$ (they are equivalent because $z_{11} = \Delta_h/h_{22}$ and $z_{22} = 1/h_{22}$, and because $y_{11} = D/B$ and $y_{22} = A/B$). Symmetry implies reciprocity, since a mirror-symmetric network must have $z_{12} = z_{21}$; reciprocity does not imply symmetry. Example: the T-network with series arms $Z_a = 5\ \Omega$, $Z_b = 10\ \Omega$ and shunt $Z_c = 5\ \Omega$ has $z_{11} = 10\ \Omega$, $z_{12} = z_{21} = 5\ \Omega$, $z_{22} = 15\ \Omega$ — clearly reciprocal, clearly not symmetric.

**How to test a circuit fast, and what breaks it.** By inspection: list the components. Only R, L, C, M and ideal transformers means reciprocal — no test needed. Any controlled source means run the test, because it may or may not be reciprocal. Then read the set that the schematic gives for free: for a T or pi network, read $z$ or $y$ and compare $z_{12}$ with $z_{21}$ and $z_{11}$ with $z_{22}$; for a transistor, read $h$ and test $h_{12} = -h_{21}$. A CE stage with $h_{ie} = 1.1\ \text{k}\Omega$, $h_{re} = 2.5\times10^{-4}$, $h_{fe} = 50$, $h_{oe} = 25\ \mu\text{S}$ fails badly: reciprocity would need $2.5\times10^{-4} = -50$. The ratio $|h_{12}/h_{21}| = 5\times10^{-6}$ is a measure of how nearly unilateral the device is. Finally, watch the direction of the claim: a small $h_{12}$ does not by itself prove reciprocity, and a symmetric-looking sketch does not prove symmetry — the numbers decide.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Reciprocity in z | $z_{12} = z_{21}$ | Units ohm. The primary test for a T/pi network read by inspection. Equal open-circuit transfer impedances in both directions. |
| Reciprocity in y | $y_{12} = y_{21}$ | Units S. The natural test for a pi network or any parallel interconnection. |
| Reciprocity in h | $h_{12} = -h_{21}$ | Both dimensionless. The minus is required by I2 leaving port 2. A CE transistor with hre = 2.5e-4 and hfe = 50 fails by a factor of 2e5. |
| Reciprocity in g | $g_{12} = -g_{21}$ | Both dimensionless. Same minus-sign origin as the h-set. |
| Reciprocity in ABCD | $AD - BC = 1$ | Dimensionless. Equivalent to z12 = z21 via AD - BC = z12/z21. Non-reciprocal active networks can give any value (0 for unilateral, -1 for a gyrator). |
| Symmetry: port equality in z and y | $z_{11} = z_{22}, \qquad y_{11} = y_{22}$ | Port-equality half of symmetry. On a reciprocal network either one settles symmetry; on an active network it does not. |
| Symmetry in ABCD | $A = D$ | Equivalent to z11 = z22, since A = z11/z21 and D = z22/z21. Dimensionless and the fastest test after a cascade. |
| Symmetry in h | $\Delta_h = h_{11}h_{22} - h_{12}h_{21} = 1$ | dh = z11/z22, so dh = 1 is the same statement as z11 = z22. It is NOT a reciprocity test. |
| T-network parameters | $z_{11} = Z_a + Z_c,\quad z_{12} = z_{21} = Z_c,\quad z_{22} = Z_b + Z_c$ | Za is the series arm at port 1 and Zb at port 2. Symmetry of a T needs Za = Zb; every T is reciprocal because z12 = z21 = Zc. |
| Pi-network parameters | $y_{11} = Y_a + Y_c,\quad y_{12} = y_{21} = -Y_c,\quad y_{22} = Y_b + Y_c$ | Ya is the shunt at port 1 and Yb at port 2, Yc the series element. Symmetry of a pi needs Ya = Yb; every pi is reciprocal. |

## Worked Problems

### P1. A two-port measured with open-circuited ports gives $z_{11} = 12\ \Omega$, $z_{12} = 4\ \Omega$, $z_{21} = 4\ \Omega$, $z_{22} = 9\ \Omega$. Is it reciprocal? Is it symmetric? Confirm both answers in the ABCD set.

**Given:** z11 = 12 ohm; z12 = 4 ohm; z21 = 4 ohm; z22 = 9 ohm

**Solution:**

1. Reciprocity: z12 = 4 ohm and z21 = 4 ohm, so z12 = z21 — reciprocal (consistent with a passive RLC network)
2. Symmetry: z11 = 12 ohm but z22 = 9 ohm, so z11 != z22 — not symmetric
3. ABCD cross-check: dz = (12)(9) - (4)(4) = 92 ohm^2, so A = z11/z21 = 12/4 = 3, D = z22/z21 = 9/4 = 2.25, B = dz/z21 = 23 ohm, C = 1/z21 = 0.25 S
4. A = 3 != D = 2.25 confirms asymmetry, while AD - BC = (3)(2.25) - (23)(0.25) = 6.75 - 5.75 = 1 confirms reciprocity

> [!success]- Answer
> **Reciprocal (z12 = z21 = 4 ohm, AD - BC = 1) but not symmetric (z11 = 12 ohm != z22 = 9 ohm, A = 3 != D = 2.25).**

> [!warning] Trap
> Declaring it symmetric after seeing a symmetric-looking z-matrix (the off-diagonal entries match each other). Matching off-diagonals prove reciprocity only; symmetry also needs the two diagonal entries to match.

### P2. A BJT common-emitter stage is characterized by $h_{11} = 1.1\ \mathrm{k}\Omega$, $h_{12} = 2.5\times10^{-4}$, $h_{21} = 50$, $h_{22} = 25\ \mu\mathrm{S}$. Test it for reciprocity and for symmetry.

**Given:** h11 = 1.1 kohm; h12 = 2.5e-4; h21 = 50; h22 = 25 uS

**Solution:**

1. Reciprocity needs h12 = -h21: here h12 = 2.5e-4 while -h21 = -50, so the test fails by a factor of 2e5 — non-reciprocal
2. Express it in z to see the same failure: z12 = h12/h22 = 2.5e-4/2.5e-5 = 10 ohm, and z21 = -h21/h22 = -50/2.5e-5 = -2 000 000 ohm = -2 Mohm, so z12 != z21
3. Symmetry needs dh = 1: dh = (1100)(2.5e-5) - (2.5e-4)(50) = 0.0275 - 0.0125 = 0.015, so dh != 1 and z11 = dh/h22 = 0.015/2.5e-5 = 600 ohm != z22 = 1/h22 = 40 kohm
4. The device is nearly unilateral: |h12/h21| = 2.5e-4/50 = 5e-6, i.e. only about 5 parts per million of the forward transmission comes back

> [!success]- Answer
> **Non-reciprocal (h12 = 2.5e-4 != -h21 = -50, z12 = 10 ohm != z21 = -2 Mohm) and not symmetric (dh = 0.015 != 1).**

> [!warning] Trap
> Testing reciprocity with h12 = h21 instead of h12 = -h21. Both h12 and h21 being 'small-ish' numbers invites the wrong comparison; with h21 = 50 > 0 the correct test is against -50, which fails just as loudly as it should.

### P3. Test two passive networks for symmetry. Network A is a T with series arms $Z_a = Z_b = 10\ \Omega$ and shunt $Z_c = 5\ \Omega$. Network B is a pi with shunt elements $Y_a = Y_b = 0.05\ \mathrm{S}$ and series element $Y_c = 0.1\ \mathrm{S}$.

**Given:** T: Za = Zb = 10 ohm, Zc = 5 ohm; Pi: Ya = Yb = 0.05 S, Yc = 0.1 S

**Solution:**

1. T: z11 = Za + Zc = 15 ohm, z22 = Zb + Zc = 15 ohm, z12 = z21 = Zc = 5 ohm, so z11 = z22 and z12 = z21 — symmetric (and therefore reciprocal)
2. T in ABCD: dz = (15)(15) - (5)(5) = 200 ohm^2, A = 15/5 = 3, D = 15/5 = 3 (A = D), B = 200/5 = 40 ohm, C = 1/5 = 0.2 S, so AD - BC = 9 - 8 = 1
3. T in h: h11 = dz/z22 = 200/15 = 13.33 ohm, h12 = 5/15 = 0.3333, h21 = -0.3333, h22 = 1/15 = 0.0667 S, so dh = (13.333)(0.06667) - (0.3333)(-0.3333) = 0.8889 + 0.1111 = 1.0
4. Pi: y11 = Ya + Yc = 0.15 S, y22 = Yb + Yc = 0.15 S, y12 = y21 = -Yc = -0.1 S, so y11 = y22 and y12 = y21 — symmetric
5. Pi in ABCD: A = 1 + Ya/Yc = 1 + 0.05/0.1 = 1.5 and D = 1 + Yb/Yc = 1.5 (A = D), B = 1/Yc = 10 ohm, C = Ya + Yb + YaYb/Yc = 0.05 + 0.05 + 0.025 = 0.125 S, so AD - BC = 2.25 - 1.25 = 1

> [!success]- Answer
> **Both symmetric: T with z11 = z22 = 15 ohm, A = D = 3, dh = 1; pi with y11 = y22 = 0.15 S, A = D = 1.5.**

> [!warning] Trap
> Judging the T symmetric from the sketch because the two series arms 'look equal'. Za is the arm between port 1 and the shunt and Zb the arm between the shunt and port 2; if you swap the labels the test flips. Always substitute into z11 = Za + Zc and z22 = Zb + Zc.

### P4. Show that a network containing a dependent source is non-reciprocal. The network is a unilateral stage: its h-matrix is $h_{11} = 1\ \mathrm{k}\Omega$, $h_{12} = 0$, $h_{21} = 50$, $h_{22} = 25\ \mu\mathrm{S}$ (a 1 k$\Omega$ input resistance, a 40 k$\Omega$ output resistance and a current-controlled current source of value $50I_1$ delivering current out of port 2, with no feedback).

**Given:** h11 = 1 kohm; h12 = 0; h21 = 50; h22 = 25 uS

**Solution:**

1. Read the schematic into h-parameters: V1 = 1000 I1 + 0 V2 gives h11 = 1 kohm and h12 = 0 (no feedback path), while I2 = 50 I1 + V2/40000 gives h21 = 50 and h22 = 1/40000 = 25 uS
2. Reciprocity test in h: h12 = -h21 means 0 = -50, which is false — non-reciprocal
3. Same conclusion in z: dh = (1000)(25e-6) - (0)(50) = 0.025, z12 = h12/h22 = 0 and z21 = -h21/h22 = -50/25e-6 = -2 Mohm, so z12 != z21
4. ABCD check: AD - BC = z12/z21 = 0, nowhere near 1, which is the signature of a perfectly unilateral network
5. Contrast with a passive T-network, where the controlled source is absent: there z12 = z21 = Zc exactly, and AD - BC = 1

> [!success]- Answer
> **h12 = 0 while -h21 = -50, and z12 = 0 while z21 = -2 Mohm: non-reciprocal, with AD - BC = 0 (unilateral).**

> [!warning] Trap
> Assuming a small-signal model drawn with resistors is reciprocal because resistors are bilateral. The controlled source is the part that counts; the z12 = 0 result says the reverse transmission is literally zero, which no combination of R, L and C can produce.

### P5. A T-network with $Z_a = 5\ \Omega$, $Z_b = 20\ \Omega$, $Z_c = 10\ \Omega$ has ABCD matrix $A = 1.5$, $B = 35\ \Omega$, $C = 0.1\ \mathrm{S}$, $D = 3$. Use $AD - BC$ as a check, then use it to find the error in the reported values $A = 1.5$, $B = 35\ \Omega$, $C = 0.1\ \mathrm{S}$, $D = 3.2$.

**Given:** T: Za = 5 ohm, Zb = 20 ohm, Zc = 10 ohm; suspect D = 3.2

**Solution:**

1. z of the T: z11 = Za + Zc = 15 ohm, z12 = z21 = Zc = 10 ohm, z22 = Zb + Zc = 30 ohm, so dz = (15)(30) - (10)(10) = 350 ohm^2
2. ABCD: A = z11/z21 = 15/10 = 1.5, D = z22/z21 = 30/10 = 3, B = dz/z21 = 350/10 = 35 ohm, C = 1/z21 = 0.1 S
3. Check: AD - BC = (1.5)(3) - (35)(0.1) = 4.5 - 3.5 = 1, so the network is reciprocal, as any T of R, L and C must be
4. With the reported D = 3.2 the check gives AD - BC = (1.5)(3.2) - 3.5 = 4.8 - 3.5 = 1.3 != 1, so D is wrong and the correct value is D = z22/z21 = 3
5. Symmetry is also settled by the same matrix: A = 1.5 != D = 3 (equivalently dh = z11/z22 = 15/30 = 0.5 != 1), so this T is not symmetric because Za != Zb

> [!success]- Answer
> **A = 1.5, B = 35 ohm, C = 0.1 S, D = 3; AD - BC = 1 (reciprocal), A != D (not symmetric). The reported D = 3.2 is an arithmetic error.**

> [!warning] Trap
> Using AD - BC = 1 as a symmetry test. It settles reciprocity only; symmetry additionally needs A = D. Here AD - BC = 1 correctly passes while the network is plainly asymmetric.

## Traps & Exam Notes

- Writing h12 = h21 or g12 = g21 for reciprocity. Those two sets carry a minus sign, h12 = -h21 and g12 = -g21, because I2 is defined leaving port 2. A missed minus flips the verdict on almost every h-parameter network.
- Proving symmetry from one matching pair of numbers. Full symmetry needs z11 = z22 AND z12 = z21; the single condition A = D (equivalently z11 = z22, y11 = y22, dh = 1) is only the port-equality half. On a reciprocal network A = D is sufficient; on a network with a dependent source it is not.
- Declaring a circuit reciprocal because it is drawn with resistor, inductor and capacitor symbols. A controlled source hidden in a small-signal model (transistor, op-amp, gyrator) destroys reciprocity: a CE stage has h12 = 2.5e-4 while -h21 = -50, a factor of 2e5 apart.
- Reading dh = 1 as 'reciprocal' or z12 = z21 as 'symmetric'. The first is the port-equality test and the second is reciprocity; neither implies the other on an active network, and only together do they define symmetry.
- Assuming a left-right symmetric sketch is symmetric. Symmetry is an electrical mirror about the numbered ports with the stated current directions, so a symmetric drawing still fails if the port numbering or the reference direction of I2 is taken the other way.

## See Also

- [[02_Z_and_Y_Parameters]]
- [[06_Parameter_Conversions_and_Determinants]]
- [[05_BJT_Small-Signal_h-Parameter_Model]]

---

[[06_Parameter_Conversions_and_Determinants|⬅ 06]] · [[_MOC_Two_Port_Networks|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Interconnections_Series,_Parallel,_Cascade|08 ➡]]
