---
id: ECE-03-04
title: "Hybrid and Inverse Hybrid Parameters"
part: "02_Electronics_Engineering"
area: "03_Two_Port_Networks"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Two-Port_Variables_and_Conventions]]", "[[07_Thevenin_and_Norton_Equivalents]]"]
tags: ["ece", "electronics_engineering", "two_port_networks"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Hybrid and Inverse Hybrid Parameters

> [!abstract] Scope
> The mixed-unit hybrid set used for transistor models, its inverse-hybrid dual, and the two-way conversion between them.

## Core Concept

> [!tip] Intuition
> A transistor parameter table never gives you four impedances or four admittances; it gives an input impedance, a reverse voltage ratio, a forward current gain and an output admittance. That mixture exists because a transistor is driven by a current at the input and loaded by a voltage at the output, so the natural independent pair is (I1, V2). The inverse hybrid set simply swaps the roles, taking (V1, I2) as independent, and the two matrices are exact inverses of each other.

**The four hybrid definitions each correspond to one bench measurement.** With the independent pair chosen as $(I_1, V_2)$ the network is described by $V_1 = h_{11}I_1 + h_{12}V_2$ and $I_2 = h_{21}I_1 + h_{22}V_2$. Short the output ($V_2 = 0$) and drive the input with a current: $h_{11} = V_1/I_1$ is the short-circuit input impedance and $h_{21} = I_2/I_1$ is the short-circuit forward current gain. Open the input ($I_1 = 0$) and drive the output with a voltage: $h_{22} = I_2/V_2$ is the open-circuit output admittance and $h_{12} = V_1/V_2$ is the open-circuit reverse voltage ratio. The units give away the mixture — $h_{11}$ in ohms, $h_{22}$ in siemens, $h_{12}$ and $h_{21}$ dimensionless — which is exactly why the set is called *hybrid*. Always write the matrix in the order $\begin{bmatrix} h_{11} & h_{12} \\ h_{21} & h_{22} \end{bmatrix}$ and keep the row/column meaning straight: row 1 is the input equation, row 2 the output equation.

**Why the BJT data sheet is written in h.** A common-emitter transistor is normally driven from a signal source through a coupling network that fixes the input *current*, and its output drives a load that fixes the output *voltage* swing. That is precisely the $(I_1, V_2)$ independent pair, so the four $h$ parameters fall straight out of the measurement setup, and the small-signal equivalent circuit — a series $h_{ie}$, a controlled current source $h_{fe}I_b$, a reverse-feedback voltage source $h_{re}V_{ce}$ and a shunt $1/h_{oe}$ — is drawn without any algebraic conversion. The standard notation is $h_{ie}$ (input impedance, ohm), $h_{re}$ (reverse voltage ratio, dimensionless), $h_{fe}$ (forward current gain, dimensionless) and $h_{oe}$ (output admittance, siemens), which are exactly $h_{11}, h_{12}, h_{21}, h_{22}$ for the common-emitter connection. See [[05_BJT_Small-Signal_h-Parameter_Model]] for the amplifier-level use of the same four numbers. Typical silicon values are $h_{ie}$ of a few kilohm, $h_{re}$ of order $10^{-4}$, $h_{fe}$ of order 100 and $h_{oe}$ of order tens of microsiemens.

**The inverse hybrid (g) set is the transpose of the choice, not the reciprocal of each entry.** Define $I_1 = g_{11}V_1 + g_{12}I_2$ and $V_2 = g_{21}V_1 + g_{22}I_2$; the independent pair is now $(V_1, I_2)$. Its definitions are $g_{11} = I_1/V_1$ at $I_2 = 0$ (open-circuit input admittance, siemens), $g_{12} = I_1/I_2$ at $V_1 = 0$ (short-circuit reverse current ratio, dimensionless), $g_{21} = V_2/V_1$ at $I_2 = 0$ (open-circuit forward voltage ratio, dimensionless) and $g_{22} = V_2/I_2$ at $V_1 = 0$ (short-circuit output impedance, ohm). Because the independent pair of $g$ is the dependent pair of $h$, the two matrices are exact inverses: $[g] = [h]^{-1}$ and $[h] = [g]^{-1}$. Writing out the 2x2 inversion gives the conversion in one line each: $h_{11} = 1/g_{11}$, $h_{12} = -g_{12}/g_{11}$, $h_{21} = g_{21}/g_{11}$, and finally:
$$h_{22} = (g_{11}g_{22} - g_{12}g_{21})/g_{11}$$
The diagonal entries invert as $h_{11} = 1/g_{11}$ and $g_{22} = 1/h_{22}$, but the off-diagonal entries pick up a MINUS sign and a division by $g_{11}$ — the commonest conversion error is to write $h_{12} = g_{12}/g_{11}$ or $g_{12} = h_{12}/h_{11}$ without it.

**Reciprocity and non-reciprocity are visible in the h matrix.** For a network of R, L, C and mutual inductance the reciprocity condition is $h_{12} = -h_{21}$ — note the MINUS, which is a direct consequence of writing the output equation for $I_2$ entering port 2. The same condition appears in the inverse hybrid set as $g_{12} = g_{21}$ (no minus, because the $g$ equations are the transposed choice), and in the z set as $z_{12} = z_{21}$. A transistor is emphatically non-reciprocal: $h_{fe} \approx 100$ while $h_{re} \approx 10^{-4}$, so $h_{12} = -h_{21}$ fails by many orders of magnitude. The physical reading is that $h_{21}$ measures forward current gain through the controlled source while $h_{12}$ measures how much output voltage leaks back to the input; a one-way device has plenty of the first and almost none of the second. When a problem asks whether a two-port is reciprocal, do not look at whether the parts are passive — test the numbers.

**Converting h to z (or y) and back, with the traps that go with it.** Setting $I_2 = 0$ in $I_2 = h_{21}I_1 + h_{22}V_2$ gives $V_2 = -(h_{21}/h_{22})I_1$, so the open-circuit forward transfer impedance is $z_{21} = -h_{21}/h_{22}$ — negative for a positive-gain device in this convention. Substituting the same relation back into $V_1 = h_{11}I_1 + h_{12}V_2$ and collecting terms gives $z_{11} = h_{11}/h_{22}$, $z_{12} = h_{12}/h_{22}$ and $z_{22} = \Delta_h/h_{22}^{2}$, where $\Delta_h = h_{11}h_{22} - h_{12}h_{21}$. Because these are the entries of $[h]^{-1}$, the safest exam procedure is to write the two h equations as a matrix, invert the 2x2 by the adjugate rule, and read off $[z] = [h]^{-1}$ — that route cannot go wrong on signs, whereas memorised formulas frequently do. For the same reason the h-to-g conversion should be taken from the adjugate:
$$[g] = (1/\Delta_h)\begin{bmatrix} h_{22} & -h_{12} \\ -h_{21} & h_{11} \end{bmatrix}$$
The popular short forms $g_{11} = 1/h_{11}$ and $g_{22} = \Delta_h/h_{11}$ are only the leading terms and mislead whenever the feedback product is significant.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Hybrid defining equations | $V_1 = h_{11}I_1 + h_{12}V_2, \qquad I_2 = h_{21}I_1 + h_{22}V_2$ | Independent pair (I1, V2). h11 in ohm, h22 in siemens, h12 and h21 dimensionless. |
| Short-circuit input impedance | $h_{11} = \left.\frac{V_1}{I_1}\right\rvert_{V_2 = 0}$ | Output shorted with a capacitor at the signal frequency. Called hie for common emitter. |
| Open-circuit reverse voltage ratio | $h_{12} = \left.\frac{V_1}{V_2}\right\rvert_{I_1 = 0}$ | Input open. Dimensionless and very small for a transistor (order 1e-4); called hre. |
| Short-circuit forward current gain | $h_{21} = \left.\frac{I_2}{I_1}\right\rvert_{V_2 = 0}$ | Dimensionless. NEGATIVE for a device with positive gain because I2 is defined entering port 2; the datasheet hfe is its magnitude. |
| Open-circuit output admittance | $h_{22} = \left.\frac{I_2}{V_2}\right\rvert_{I_1 = 0}$ | Input open. In siemens; called hoe and usually quoted in microsiemens. |
| Inverse hybrid defining equations | $I_1 = g_{11}V_1 + g_{12}I_2, \qquad V_2 = g_{21}V_1 + g_{22}I_2$ | Independent pair (V1, I2). g11 in siemens, g22 in ohm, g12 and g21 dimensionless. |
| Matrix inverse relations | $[g] = [h]^{-1}, \qquad [h] = [g]^{-1}$ | Exact inverses because each set's independent pair is the other's dependent pair; Delta_h x Delta_g = 1. |
| H to G conversion | $g_{11} = \frac{h_{22}}{\Delta_h}, \quad g_{12} = \frac{-h_{12}}{\Delta_h}, \quad g_{21} = \frac{-h_{21}}{\Delta_h}, \quad g_{22} = \frac{h_{11}}{\Delta_h}$ | The adjugate form, always correct. Delta_h = h11 h22 - h12 h21, and Delta_g = 1/Delta_h. Equivalent exact short forms: g11 = 1/h11, g12 = -h12/h11, g21 = -h21/h11, g22 = Delta_h/h11. |
| G to H conversion | $h_{11} = \frac{1}{g_{11}}, \quad h_{12} = \frac{-g_{12}}{g_{11}}, \quad h_{21} = \frac{-g_{21}}{g_{11}}, \quad h_{22} = \frac{\Delta_g}{g_{11}}$ | Delta_g = g11 g22 - g12 g21. Note h21 and g21 carry OPPOSITE signs. |
| H to Z conversion | $z_{11} = \frac{h_{11}}{h_{22}}, \quad z_{12} = \frac{h_{12}}{h_{22}}, \quad z_{21} = \frac{-h_{21}}{h_{22}}, \quad z_{22} = \frac{\Delta_h}{h_{22}^{2}}$ | Read straight off [z] = [h]^-1 with Delta_h = h11 h22 - h12 h21; the minus lands on z21. Check z11 z22 - z12 z21 = Delta_h/h22^2. |
| Reciprocity in the h and g sets | $h_{12} = -h_{21} \quad \Longleftrightarrow \quad g_{12} = g_{21}$ | The minus in the h form comes from I2 being defined into port 2. A transistor violates this by orders of magnitude. |
| Z to H conversion | $h_{11} = \frac{\Delta_z}{z_{22}}, \quad h_{12} = \frac{z_{12}}{z_{22}}, \quad h_{21} = \frac{-z_{21}}{z_{22}}, \quad h_{22} = \frac{1}{z_{22}}$ | The inverse of the h-to-z set, with Delta_z = z11 z22 - z12 z21. Note the minus lands on h21. |
| Current gain with a load resistance | $\left\lvert A_i\right\rvert = \left\lvert\frac{I_L}{I_1}\right\rvert = \frac{h_{21}}{1 + h_{22}R_L}$ | RL is the actual load across port 2. Uses the full h22, and magnitude is taken because the sign follows the I2 convention. |

## Worked Problems

### P1. **Find the h parameters from the definitions.** A T network has a $10\ \Omega$ series arm at port 1, a $15\ \Omega$ shunt leg and a $20\ \Omega$ series arm at port 2. Compute $h_{11}$, $h_{12}$, $h_{21}$ and $h_{22}$ from their defining tests, and state $\Delta_h$.

**Given:** Za = 10 ohm (input series arm); Zb = 15 ohm (shunt leg); Zc = 20 ohm (output series arm)

**Solution:**

1. h11 = V1/I1 with V2 = 0 (output shorted): the short puts Zb in parallel with Zc, so h11 = Za + (Zb || Zc) = 10 + (15 x 20)/35 = 10 + 8.5714 = 18.571 ohm
2. h21 = I2/I1 with V2 = 0: the current through the Zc branch is -I2, and it divides from I1 by Zb/(Zb + Zc), so -I2 = I1 x 15/35 = 0.42857 I1 and h21 = -0.42857
3. h12 = V1/V2 with I1 = 0 (input open): a voltage divider of Zb and Zc gives V1/V2 = 15/35 = 0.42857
4. h22 = I2/V2 with I1 = 0: looking into port 2 the impedance is Zc + Zb = 35 ohm, so h22 = 1/35 = 0.028571 S = 28.57 mS
5. Delta_h = h11 h22 - h12 h21 = (18.571)(0.028571) - (0.42857)(-0.42857) = 0.53061 + 0.18367 = 0.71429

> [!success]- Answer
> **[h] = [[18.571 ohm, 0.42857], [-0.42857, 28.571 mS]]; Delta_h = 0.71429 (dimensionless, since h11 h22 and h12 h21 share units).**

> [!warning] Trap
> Reporting h21 = +0.42857. Because I2 is defined entering port 2, the current that actually flows through the Zc branch toward port 2 is -I2, so the short-circuit current gain of a passive T network comes out NEGATIVE in this convention. Only the magnitude is the familiar datasheet number.

### P2. **Convert an h matrix to a g matrix.** For the network of the previous problem, find $[g]$ by inverting $[h]$, then verify two entries against their physical definitions.

**Given:** h11 = 18.571 ohm; h12 = 0.42857; h21 = -0.42857; h22 = 0.028571 S; Delta_h = 0.71429

**Solution:**

1. Invert the 2x2 by the adjugate rule rather than by a memorised formula: [g] = [h]^-1 = (1/Delta_h) x [[h22, -h12], [-h21, h11]] with Delta_h = h11 h22 - h12 h21 = (18.571)(0.028571) - (0.42857)(-0.42857) = 0.53061 + 0.18367 = 0.71429
2. g11 = h22/Delta_h = 0.028571/0.71429 = 0.04 S and g22 = h11/Delta_h = 18.571/0.71429 = 26.0 ohm
3. g12 = -h12/Delta_h = -0.42857/0.71429 = -0.6 and g21 = -h21/Delta_h = +0.42857/0.71429 = +0.6
4. Verify Delta_g = g11 g22 - g12 g21 = (0.04)(26.0) - (-0.6)(0.6) = 1.04 + 0.36 = 1.4 = 1/Delta_h, confirming the identity Delta_h x Delta_g = 1
5. Check g11 and g21 against their definitions by solving the h equations with I2 = 0: the output equation gives V2 = -h21 I1/h22 = +0.42857 I1/0.028571 = 15 I1. Substituting into V1 = h11 I1 + h12 V2 gives V1 = 18.571 I1 + 0.42857(15 I1) = 25.0 I1, so I1/V1 = 0.04 = g11 S and V2/V1 = 0.6 = g21
6. Check g12 and g22 with V1 = 0: V1 = 0 gives 0 = h11 I1 + h12 V2, so I1 = -h12 V2/h11 = -0.023077 V2, and I2 = h21 I1 + h22 V2 = -0.42857(-0.023077 V2) + 0.028571 V2 = 0.038462 V2, so I1/I2 = g12 = -0.023077/0.038462 = -0.6 and V2/I2 = g22 = 26.0 ohm, both matching the inversion

> [!success]- Answer
> **[g] = [[40 mS, -0.6], [0.6, 26.0 ohm]]: g11 = 0.04 S, g12 = -0.6, g21 = +0.6, g22 = 26.0 ohm; verified by Delta_h x Delta_g = 1 and by the two physical open/short tests.**

> [!warning] Trap
> Using the reciprocal of the diagonal as the diagonal of the inverse: g11 is 0.04 S, not 1/h11 = 0.0538 S, because g11 is measured with the output OPEN while h11 is measured with it SHORTED. The diagonal entries of [h] invert only when h12 h21 is negligible; the safe rule is the adjugate, checked by Delta_h x Delta_g = 1.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`: MatA = `18.571 0.42857 -0.42857 0.028571` — the h matrix as it stands, ohms and siemens mixed.
> 2. `Det` → **0.71429**; `Inv` → $[g]$ = **40 mS, -0.6, +0.6, 26.0** $\Omega$. Inverting the matrix does the whole conversion.
> 3. Reciprocal check: `1÷0.71429` → **1.4**, and $\Delta_h\,\Delta_g = 1$.

### P3. **Convert h to z for a transistor.** A BJT in common-emitter connection has $h_{ie} = 1\ \mathrm{k\Omega}$, $h_{re} = 2.5\times10^{-4}$, $h_{fe} = 50$ and $h_{oe} = 25\ \mu\mathrm{S}$. Taking $h_{21} = -h_{fe}$ under the $I_2$-into-port-2 convention, find the full $[z]$ matrix.

**Given:** h11 = 1000 ohm; h12 = 2.5e-4; h21 = -50; h22 = 25e-6 S

**Solution:**

1. Delta_h = h11 h22 - h12 h21 = (1000)(25e-6) - (2.5e-4)(-50) = 0.025 + 0.0125 = 0.0375
2. z11 = Delta_h/h22 = 0.0375/25e-6 = 1500 ohm (the open-circuit input impedance, larger than h11 because h11 is measured with the output shorted)
3. z12 = h12/h22 = 2.5e-4/25e-6 = 10 ohm (the reverse transfer impedance; tiny, as expected of a one-way device)
4. z21 = -h21/h22 = -(-50)/25e-6 = +2.0e6 ohm = 2.0 Mohm (the forward transfer impedance, huge because h22 is tiny)
5. z22 = h11/h22 = 1000/25e-6 = 40e6 ohm = 40 Mohm, then check reciprocity: z12 = 10 ohm vs z21 = 2.0 Mohm, wildly unequal, so the transistor is not reciprocal

> [!success]- Answer
> **[z] = [[1.5 kohm, 10 ohm], [2.0 Mohm, 40 Mohm]]; Delta_h = 0.0375, strongly non-reciprocal.**

> [!warning] Trap
> Using z21 = +h21/h22 with the datasheet's positive hfe. The correct relation is z21 = -h21/h22, and h21 itself is -hfe under this convention, so the two minus signs cancel to give a POSITIVE 2.0 Mohm forward transresistance. Mishandling the two signs gives -2.0 Mohm and a physically wrong equivalent circuit.

### P4. **Current gain with a load, from the h parameters.** A CE amplifier has $h_{ie} = 1\ \mathrm{k\Omega}$, $h_{fe} = 50$, $h_{oe} = 25\ \mu\mathrm{S}$ and $h_{re}$ negligible. It drives a $2\ \mathrm{k\Omega}$ load. Find the current gain delivered to the load and the voltage gain across the load.

**Given:** hie = 1 kohm; hfe = 50; hoe = 25 uS; RL = 2 kohm; hre negligible

**Solution:**

1. The controlled source hfe I1 divides at the output node between the internal output conductance hoe and the load conductance 1/RL, so the current reaching the load is hfe I1 times the divider ratio (1/hoe)/((1/hoe) + RL)
2. 1/hoe = 1/25e-6 = 40 kohm; the parallel combination with RL = 2 kohm is 40 || 2 = 40(2)/42 = 1.9048 kohm
3. So the magnitude of the load current is 50 I1 x (1.9048/2) = 50 I1 x 0.95238 = 47.62 I1, giving a current gain of 47.62 (33.6 dB)
4. Voltage gain: v_L = 47.62 I1 x 2000 = 95238 I1 volts, and v_in = hie I1 = 1000 I1 volts, so the magnitude is |A_v| = 95.2 (39.6 dB) with a 180 degree CE polarity inversion
5. Cross-check with the standard textbook form A_v = -hfe R_L' / hie where R_L' = RL || (1/hoe) = 1.9048 kohm: A_v = -50(1904.8)/1000 = -95.2, a match

> [!success]- Answer
> **|A_i| = 47.62 (33.6 dB) delivered to the load, and |A_v| = 95.2 (39.6 dB), inverting.**

> [!warning] Trap
> Using A_i = hfe = 50 by ignoring hoe. The finite output conductance steals current from the load: only 1.9048/2 = 95.2 percent of the 50-unit gain reaches RL. Skipping the h22 term overstates the current gain by about 5 percent here and much more when RL is small.

### P5. **Identify a non-reciprocal network from h parameters.** A 2 kohm-input, 1 kohm-output amplifier contains a voltage-controlled current source $I_{out} = 40\ \mathrm{mS}\times V_1$ across the output port. Find its h parameters and decide whether it is reciprocal.

**Given:** R1 = 2 kohm (input series resistance); R2 = 1 kohm (output shunt resistance); dependent source: I_out = 40 mS x V1 across the output; I2 is defined entering port 2

**Solution:**

1. Input loop: V1 = I1 R1 = 2000 I1, so with the output shorted h11 = V1/I1 = 2000 ohm, and with the input open the dependent source is zero, so no current is fed back: h12 = V1/V2 at I1 = 0 = 0
2. Output node with V2 = 0: the dependent source delivers 40 mS x V1 = 40 mS x 2000 I1 = 80 I1 into the output node, and that current must leave through port 2 as the defined current I2, so h21 = I2/I1 = +80 (dimensionless)
3. Check h11 independently: with the output shorted the input is still V1 = 2000 I1, so h11 = 2000 ohm, consistent with the value used in the previous step
4. Output node with V2 applied and I1 = 0: the dependent source is dead, so I2 = V2/R2 = V2/1000 and h22 = 1/1000 = 1 mS
5. Reciprocity test: h12 = -h21 requires 0 = +80, which fails, so the network is non-reciprocal
6. Confirm in another set with Delta_h = h11 h22 - h12 h21 = (2000)(0.001) - (0)(+80) = 2.0, giving z12 = h12/h22 = 0 and z21 = -h21/h22 = -80/0.001 = -80 kohm; z12 is not z21, so the one-way dependent source has created a one-way network

> [!success]- Answer
> **[h] = [[2 kohm, 0], [+80, 1 mS]], non-reciprocal since h12 = 0 but -h21 = -80; equivalently z12 = 0 vs z21 = -80 kohm.**

> [!warning] Trap
> Judging reciprocity from the presence of only resistors in the input branch. The dependent source makes h21 = +80 while h12 stays at zero, so the reciprocity test h12 = -h21 fails; the network is a one-way amplifier masquerading as an ordinary resistive network. Always compare h12 numerically with -h21.

## Traps & Exam Notes

- **Dropping the minus sign in the h-to-g and h-to-z conversions.** $g_{12} = -h_{12}/\Delta_h$, $g_{21} = -h_{21}/\Delta_h$ and $z_{21} = -h_{21}/h_{22}$ all carry a minus, and the equivalent short forms $g_{12} = -h_{12}/h_{11}$, $g_{21} = -h_{21}/h_{11}$ do too. Omitting it flips the direction of the controlled source in the equivalent circuit and reverses the sign of every gain computed from it.
- **Assuming the diagonal entries simply invert.** $g_{22} = 1/h_{22}$ and $g_{11} = 1/h_{11}$ are the wrong shortcuts: the exact relations are $g_{11} = h_{22}/\Delta_h$ and $g_{22} = h_{11}/\Delta_h$. (The true reciprocal pair is $h_{11} = 1/g_{11}$ and $h_{22} = \Delta_g/g_{11}$, which is a different statement.) For the T network of this note $1/h_{11} = 53.8\ \mathrm{mS}$ while the correct $g_{11} = 40\ \mathrm{mS}$ — a 35 percent error.
- **Expecting a transistor's $h_{21}$ to be positive like the datasheet $h_{fe}$.** Under the standard convention with $I_2$ defined INTO port 2, a positive-gain device has $h_{21} = -h_{fe}$. Datasheets, which use the current LEAVING convention for the output, quote the positive number. State which convention you are using before quoting a sign.
- **Testing reciprocity with $h_{12} = h_{21}$ (no minus).** The condition is $h_{12} = -h_{21}$ because the output equation is written for $I_2$ entering port 2. In the inverse hybrid set the same condition becomes the minus-free $g_{12} = g_{21}$; mixing the two forms produces a spurious 'reciprocal' verdict for an amplifier.
- **Treating $g_{22}$ as $1/h_{22}$ and $h_{11}$ as $1/g_{11}$ interchangeably.** The diagonal pair $h_{11} = 1/g_{11}$ and $g_{22} = 1/h_{22}$ are true, but $h_{22}$ is NOT $1/g_{22}$; the correct relation is $h_{22} = \Delta_g/g_{11}$, which involves both off-diagonals. Networks with significant feedback expose the error immediately.
- **Ignoring $h_{oe}$ when it dominates.** In the current-gain step the load sees $1/h_{22}$ in parallel with $R_L$. When $R_L$ is comparable to or smaller than $1/h_{oe}$ the loss is severe — with $R_L = 200\ \Omega$ and $1/h_{oe} = 40\ \mathrm{k\Omega}$ the gain is 49.75 rather than 50, but with $R_L = 200\ \Omega$ and $1/h_{oe} = 1\ \mathrm{k\Omega}$ it falls to 41.7, a 17 percent error.
- **Treating the h and g determinants as unrelated.** The correct identity is $\Delta_h \times \Delta_g = 1$, so $[h]$ and $[g]$ are genuine matrix inverses of each other. If your converted matrix gives a product other than 1, an entry or a sign is wrong; a determinant product of 0.002 or 384 signals a mixed-up adjugate.

## See Also

- [[05_BJT_Small-Signal_h-Parameter_Model]]
- [[06_Parameter_Conversions_and_Determinants]]
- [[02_Z_and_Y_Parameters]]

---

[[03_T_and_Pi_Equivalent_Networks|⬅ 03]] · [[_MOC_Two_Port_Networks|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Transmission_ABCD_Parameters|05 ➡]]
