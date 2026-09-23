---
id: ECE-03-08
title: "Interconnections: Series, Parallel, Cascade"
part: "02_Electronics_Engineering"
area: "03_Two_Port_Networks"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Z_and_Y_Parameters]]", "[[05_Transmission_ABCD_Parameters]]"]
tags: ["ece", "electronics_engineering", "two_port_networks"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Interconnections: Series, Parallel, Cascade

> [!abstract] Scope
> Combine two-ports by series, parallel, cascade, series-parallel or parallel-series connection, using the parameter set that adds or multiplies for that connection, and know when the combination is physically valid.

## Core Concept

> [!tip] Intuition
> The connection dictates the parameter set. Two networks in series carry the same port currents, so their voltages add — that is exactly how z-matrices combine. Two networks in parallel share the port voltages, so currents add — that is exactly how y-matrices combine. A cascade feeds one stage's output into the next stage's input, so the transmission (ABCD) matrices multiply along the signal path.

**One connection, one parameter set.** The pairing is not a convention to memorize blindly; it falls out of KVL and KCL. In the series connection the two networks are in the same two loops, so $I_{1a} = I_{1b}$ and $I_{2a} = I_{2b}$, the port voltages add, and $[z] = [z]_a + [z]_b$. In the parallel connection the two networks sit across the same node pairs, so $V_{1a} = V_{1b}$ and $V_{2a} = V_{2b}$, the port currents add, and $[y] = [y]_a + [y]_b$. The mixed connections follow the same logic: series at the input and parallel at the output (series-parallel) adds $[h]$, while parallel at the input and series at the output adds $[g]$. A cascade is different in kind — it does not add anything, it multiplies the transmission matrix, and $[z]$ and $[y]$ do NOT multiply for a cascade. That last statement is the single most examined point in this topic.

**Cascade mechanics and the element matrices.** With the convention $V_1 = AV_2 - BI_2$ and $I_1 = CV_2 - DI_2$, the output of stage a is the input of stage b, so $[ABCD] = [ABCD]_a[ABCD]_b$ with stage a nearest the source. Written out: $A = A_aA_b + B_aC_b$, $B = A_aB_b + B_aD_b$, $C = C_aA_b + D_aC_b$, $D = C_aB_b + D_aD_b$. Since $\det(AB) = \det(A)\det(B)$, the reciprocity index multiplies too: a cascade of reciprocal stages is reciprocal, and one non-reciprocal stage (an amplifier, a gyrator, an isolator) makes the whole chain non-reciprocal ([[07_Reciprocity_and_Symmetry_Conditions]]). Any ladder network can be built from two one-line matrices: a series impedance is $\begin{bmatrix} 1 & Z \\ 0 & 1\end{bmatrix}$ and a shunt admittance is $\begin{bmatrix} 1 & 0 \\ Y & 1\end{bmatrix}$, multiplied in signal order from the source to the load. A T or pi section, a transmission-line length, an attenuator pad and a filter section are all just such products ([[05_Transmission_ABCD_Parameters]]).

**Brune's validity condition: the interconnection must not disturb the ports.** Adding matrices assumes the port currents (series) or port voltages (parallel) really are common to both networks. If the two networks share an internal node — in practice a common ground lead inside both — the shared lead carries part of the current and the assumption fails: for a parallel connection $V_{1a} \ne V_{1b}$, and adding the y-matrices gives an answer that describes a different circuit. This is Brune's condition, and the usual exam form is: series is valid only if $I_{1a} = I_{1b}$ and $I_{2a} = I_{2b}$; parallel is valid only if $V_{1a} = V_{1b}$ and $V_{2a} = V_{2b}$. Two grounded amplifiers cannot simply be paralleled at their input and output ports. If a circuit is drawn that way, the fix is to isolate the common leads (transformers, or a different topology) or to analyse the whole network directly rather than combining port matrices.

**What the combination does to the properties, and where it is used.** Series and parallel connections preserve reciprocity (adding symmetric z or y matrices keeps the off-diagonals equal), but they do not preserve symmetry unless both parts have the same port-equality property. A cascade of reciprocal sections is reciprocal, and a cascade of symmetric sections stays symmetric, which is what makes filter design practical: identical symmetric pi or T sections are cascaded and the whole chain is analysed with one matrix product. Practical uses: cascading ABCD to evaluate ladder filters, attenuator pads, cable lengths and amplifier stages; adding z for series elements in a loop; adding y for parallel loads across a bus. In every case, finish with the checks: $AD - BC = 1$ for a reciprocal cascade (it catches a mis-ordered or mis-multiplied product), and $A = D$ if the cascade is meant to be symmetric.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Series connection | $[z] = [z]_a + [z]_b$ | Valid only if I1a = I1b and I2a = I2b (Brune). Each entry is in ohm; a shared internal node breaks the assumption. |
| Parallel connection | $[y] = [y]_a + [y]_b$ | Valid only if V1a = V1b and V2a = V2b. A common internal ground lead makes it invalid. |
| Cascade connection | $[ABCD] = [ABCD]_a\,[ABCD]_b$ | a is the stage nearest the source. Only ABCD (or transmission T) matrices multiply for a cascade; z and y do not. |
| Cascade product, written out | $A = A_aA_b + B_aC_b,\quad B = A_aB_b + B_aD_b,\quad C = C_aA_b + D_aC_b,\quad D = C_aB_b + D_aD_b$ | Note the cross terms: A and D pick up a B*C product (dimensionless), while B stays in ohm and C stays in S. |
| Series input, parallel output (series-parallel) | $[h] = [h]_a + [h]_b$ | Validity: I1a = I1b (series input) and V2a = V2b (parallel output). h11 adds in ohm, h22 in S, h12 and h21 are dimensionless. |
| Parallel input, series output (parallel-series) | $[g] = [g]_a + [g]_b$ | Validity: V1a = V1b and I2a = I2b. g11 is in S and g22 in ohm. |
| Series element matrix | $[ABCD]_{ser} = \begin{bmatrix} 1 & Z \\ 0 & 1 \end{bmatrix}$ | An impedance in the signal path. B = Z in ohm; AD - BC = 1, so it is reciprocal and (trivially) symmetric in the sense A = D. |
| Shunt element matrix | $[ABCD]_{sh} = \begin{bmatrix} 1 & 0 \\ Y & 1 \end{bmatrix}$ | An admittance to the common return. C = Y in S. Convert mS to S before multiplying. |
| Cascade determinant / reciprocity | $A D - B C = (A_aD_a - B_aC_a)(A_bD_b - B_bC_b)$ | det of a product. A chain of reciprocal stages (each det = 1) is reciprocal; one active stage makes the product non-reciprocal. |
| Convert before cascading | $[ABCD] = \begin{bmatrix} z_{11}/z_{21} & \Delta_z/z_{21} \\ 1/z_{21} & z_{22}/z_{21} \end{bmatrix}$ | Use this when the stages are given as z (or convert y-stages with the y-to-ABCD forms) before multiplying. |

## Worked Problems

### P1. Two T-networks with $[z]_a = \begin{bmatrix} 10 & 5 \\ 5 & 8\end{bmatrix}\ \Omega$ and $[z]_b = \begin{bmatrix} 20 & 4 \\ 4 & 12\end{bmatrix}\ \Omega$ are connected in series at both ports. Find the overall $[z]$ and its determinant.

**Given:** z_a = [10, 5; 5, 8] ohm; z_b = [20, 4; 4, 12] ohm; series at both ports

**Solution:**

1. Series connection adds z-matrices entry by entry: z11 = 10 + 20 = 30 ohm and z22 = 8 + 12 = 20 ohm
2. Off-diagonals: z12 = 5 + 4 = 9 ohm and z21 = 5 + 4 = 9 ohm
3. Both parts are reciprocal (5 = 5 and 4 = 4), and the sum is reciprocal too (z12 = z21 = 9 ohm)
4. Determinant of the sum: dz = (30)(20) - (9)(9) = 600 - 81 = 519 ohm^2
5. Note the determinant does not add: dz_a + dz_b = [(10)(8) - 25] + [(20)(12) - 16] = 55 + 224 = 279 ohm^2, nowhere near 519 ohm^2

> [!success]- Answer
> **[z] = [30, 9; 9, 20] ohm, dz = 519 ohm^2 (not 279 ohm^2).**

> [!warning] Trap
> Adding the determinants along with the matrices. Only the matrix entries add; det(A + B) is not det(A) + det(B). Recompute dz from the summed matrix, and use it only after the addition.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`: MatA = `10 5 5 8`, MatB = `20 4 4 12`. Series at BOTH ports means the z matrices simply ADD.
> 2. `MatA+MatB` → $[z]$ = **30, 9, 9, 20** $\Omega$; `Det` → **519** $\Omega^2$.
> 3. The trap: the z-determinants are 55 and 224, and $55+224 = 279$ — determinants do NOT add.

### P2. Two networks with $[y]_a = \begin{bmatrix} 0.10 & -0.02 \\ -0.02 & 0.08\end{bmatrix}\ \mathrm{S}$ and $[y]_b = \begin{bmatrix} 0.05 & -0.01 \\ -0.01 & 0.06\end{bmatrix}\ \mathrm{S}$ are placed in parallel at both ports. Find the overall $[y]$, its determinant, and the equivalent z-parameters.

**Given:** y_a = [0.10, -0.02; -0.02, 0.08] S; y_b = [0.05, -0.01; -0.01, 0.06] S; parallel at both ports

**Solution:**

1. Parallel connection adds y-matrices: y11 = 0.10 + 0.05 = 0.15 S and y22 = 0.08 + 0.06 = 0.14 S
2. Off-diagonals: y12 = -0.02 - 0.01 = -0.03 S and y21 = -0.03 S, so the result is still reciprocal
3. dy = (0.15)(0.14) - (-0.03)^2 = 0.0210 - 0.0009 = 0.0201 S^2
4. Equivalent z by inversion: dz = 1/dy = 49.75 ohm^2, z11 = y22/dy = 0.14/0.0201 = 6.97 ohm and z22 = y11/dy = 0.15/0.0201 = 7.46 ohm
5. Validity (Brune): the parallel connection is valid only because both ports see common voltages, V1a = V1b and V2a = V2b — no shared internal ground lead may bypass either network

> [!success]- Answer
> **[y] = [0.15, -0.03; -0.03, 0.14] S, dy = 20.1 mS^2, equivalent z11 = 6.97 ohm and z22 = 7.46 ohm.**

> [!warning] Trap
> Using z-matrices for a parallel connection because the two networks were originally specified by z. Parallel pairs with y, series pairs with z; convert first (z to y), add, then convert back if a z answer is wanted.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`: MatA = `0.10 -0.02 -0.02 0.08`, MatB = `0.05 -0.01 -0.01 0.06`. Parallel at both ports means the y matrices ADD.
> 2. `MatA+MatB` → $[y]$ = **0.15, -0.03, -0.03, 0.14** S; `Det` → **20.1 mS**$^2$; `Inv` → $[z]$ with **6.97** and **7.46** $\Omega$ on the diagonal.

### P3. Cascade two identical symmetric T-sections, each with $Z_a = Z_b = 5\ \Omega$ and $Z_c = 10\ \Omega$. Find the ABCD matrix of the cascade and verify it.

**Given:** two identical T sections; Za = Zb = 5 ohm; Zc = 10 ohm; cascade

**Solution:**

1. Per section: z11 = z22 = Za + Zc = 15 ohm, z21 = Zc = 10 ohm, dz = (15)(15) - (10)(10) = 125 ohm^2, so A = 15/10 = 1.5, B = 125/10 = 12.5 ohm, C = 1/10 = 0.1 S, D = 1.5
2. A_total = A1A2 + B1C2 = (1.5)(1.5) + (12.5)(0.1) = 2.25 + 1.25 = 3.5, and D_total = C1B2 + D1D2 = (0.1)(12.5) + (1.5)(1.5) = 1.25 + 2.25 = 3.5
3. B_total = A1B2 + B1D2 = (1.5)(12.5) + (12.5)(1.5) = 18.75 + 18.75 = 37.5 ohm
4. C_total = C1A2 + D1C2 = (0.1)(1.5) + (1.5)(0.1) = 0.15 + 0.15 = 0.3 S
5. Check: A D - B C = (3.5)(3.5) - (37.5)(0.3) = 12.25 - 11.25 = 1 (reciprocal) and A = D = 3.5, so the cascade of two identical symmetric sections is symmetric, as expected

> [!success]- Answer
> **[ABCD] = [3.5, 37.5 ohm; 0.3 S, 3.5]; A = D = 3.5 and AD - BC = 1.**

> [!warning] Trap
> Multiplying the matrices in the wrong order. For two identical sections the product looks the same either way, so this problem hides the error; with different stages the reversed product swaps A with D and gives a different circuit. Stage nearest the source goes on the left.

### P4. A $100\ \Omega$ series resistor is followed in the signal path by a $200\ \Omega$ shunt resistor (admittance $0.005\ \mathrm{S}$). Build the cascade ABCD by multiplying the element matrices, then confirm the result from the equivalent T-network.

**Given:** series Z = 100 ohm; shunt Y = 0.005 S (200 ohm); Z first, then Y

**Solution:**

1. Element matrices: series Z gives [1, 100; 0, 1] and shunt Y gives [1, 0; 0.005, 1]
2. Product, series first: A = (1)(1) + (100)(0.005) = 1.5 and B = (1)(0) + (100)(1) = 100 ohm
3. C = (0)(1) + (1)(0.005) = 0.005 S and D = (0)(0) + (1)(1) = 1
4. Direct T analysis of the same circuit: Za = 100 ohm, Zb = 0, Zc = 200 ohm, so z11 = Za + Zc = 300 ohm, z12 = z21 = 200 ohm, z22 = 200 ohm and dz = (300)(200) - (200)^2 = 20 000 ohm^2
5. ABCD from z: A = z11/z21 = 300/200 = 1.5, B = dz/z21 = 20000/200 = 100 ohm, C = 1/z21 = 0.005 S, D = z22/z21 = 200/200 = 1 — identical to the product, and AD - BC = 1.5 - 0.5 = 1

> [!success]- Answer
> **[ABCD] = [1.5, 100 ohm; 0.005 S, 1]; AD - BC = 1 (reciprocal).**

> [!warning] Trap
> Reversing the multiplication order. Shunt first gives [1, 100; 0.005, 1.5], which still satisfies AD - BC = 1, so the determinant check cannot catch the reversal — only comparing A = 1.5, D = 1 against the direct circuit analysis does.

### P5. Two networks are connected with their inputs in series and their outputs in parallel. Network A is a T with $Z_a = 10\ \Omega$, $Z_b = 20\ \Omega$, $Z_c = 10\ \Omega$; network B is a T with $Z_a = 10\ \Omega$, $Z_b = 10\ \Omega$, $Z_c = 20\ \Omega$. Find the combined $[h]$ and check the validity of the connection.

**Given:** A: T with Za = 10, Zb = 20, Zc = 10 ohm; B: T with Za = 10, Zb = 10, Zc = 20 ohm; series input, parallel output

**Solution:**

1. Network A: z11 = 20, z12 = z21 = 10, z22 = 30 ohm, dz = (20)(30) - 100 = 500 ohm^2, so h11 = dz/z22 = 16.67 ohm, h12 = 10/30 = 0.3333, h21 = -0.3333, h22 = 1/30 = 0.03333 S
2. Network B: z11 = 30, z12 = z21 = 20, z22 = 30 ohm, dz = (30)(30) - 400 = 500 ohm^2, so h11 = 500/30 = 16.67 ohm, h12 = 20/30 = 0.6667, h21 = -0.6667, h22 = 0.03333 S
3. Series-parallel connection adds h-matrices: h11 = 16.67 + 16.67 = 33.33 ohm, h12 = 0.3333 + 0.6667 = 1.0, h21 = -0.3333 - 0.6667 = -1.0, h22 = 0.03333 + 0.03333 = 0.06667 S
4. Check: h12 = -h21 = 1.0, so the combination is still reciprocal, as it must be for two passive networks; but dh = (33.333)(0.06667) - (1.0)(-1.0) = 2.222 + 1.0 = 3.222 != 1, so it is not symmetric (the two sections differ)
5. Validity (Brune): the series input forces I1a = I1b and the parallel output forces V2a = V2b, which hold only if neither network has an internal common-ground lead that lets current bypass a port

> [!success]- Answer
> **h11 = 33.33 ohm, h12 = 1.0, h21 = -1.0, h22 = 66.67 mS; reciprocal (h12 = -h21) but not symmetric (dh = 3.22).**

> [!warning] Trap
> Adding z or y matrices for a series-parallel connection because those sets are more familiar. The matching set is h for series input / parallel output and g for parallel input / series output; the connection, not convenience, chooses the set.

## Traps & Exam Notes

- Multiplying [z] or [y] matrices to cascade two stages. Only ABCD (or the transmission T matrix) cascades by multiplication; to cascade networks given as z or y, convert each stage to ABCD, multiply, then convert back.
- Reversing the order of the ABCD product. The stage nearest the source sits on the LEFT. The determinant check cannot catch this: series-then-shunt gives A = 1.5, D = 1 while shunt-then-series gives A = 1, D = 1.5, and both give AD - BC = 1.
- Adding the wrong matrices. Series connection adds z, parallel adds y, series input/parallel output adds h, parallel input/series output adds g. Mixing the pairing gives an answer with plausible-looking units and a completely wrong circuit.
- Ignoring Brune's validity condition. Two two-ports that share an internal ground (or any internal node pair) cannot simply be paralleled: the shared lead shunts current around the ports, so V1a != V1b and the y-addition is invalid. The same applies to a series connection whose input loops share a common node.
- Adding the determinants along with the entries. Series adding of two z-matrices gave dz = 519 ohm^2 while dz_a + dz_b = 279 ohm^2. Recompute the determinant from the summed matrix; never add, multiply or average the parts' determinants.
- Cascading without checking reciprocity. If every stage is reciprocal the product must give AD - BC = 1; if a computed product gives something else, either a stage is active or the multiplication is wrong. This is the fastest single check on a ladder calculation.

## See Also

- [[05_Transmission_ABCD_Parameters]]
- [[03_T_and_Pi_Equivalent_Networks]]
- [[06_Parameter_Conversions_and_Determinants]]

---

[[07_Reciprocity_and_Symmetry_Conditions|⬅ 07]] · [[_MOC_Two_Port_Networks|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Terminated_Networks_and_Gains|09 ➡]]
