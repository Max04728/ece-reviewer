---
id: ECE-03-06
title: "Parameter Conversions and Determinants"
part: "02_Electronics_Engineering"
area: "03_Two_Port_Networks"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Two-Port_Variables_and_Conventions]]", "[[02_Z_and_Y_Parameters]]"]
tags: ["ece", "electronics_engineering", "two_port_networks"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Parameter Conversions and Determinants

> [!abstract] Scope
> Convert any measured or computed two-port parameter set (z, y, h, g, ABCD) into any other set, and use the determinants as reciprocity and arithmetic checks.

## Core Concept

> [!tip] Intuition
> Every parameter set is the same pair of linear port equations solved for a different pair of unknowns, so a conversion is only a re-solve of a 2x2 system. That re-solve is why the combination z11 z22 - z12 z21 keeps appearing: it is the 2x2 determinant, the coupling term the algebra cannot avoid.

**Five descriptions, one network.** A linear two-port is fixed by two equations, and which two port quantities you treat as independent decides the set: the currents give $[z]$, the voltages give $[y]$, the mixed pairs give $[h]$ and $[g]$, and the transmission pair $(V_2, -I_2)$ gives $[ABCD]$ (see [[01_Two-Port_Variables_and_Conventions]]). Every conversion is therefore an elimination: write the defining equations with the convention's current directions, solve for the new independent variables, and read the coefficients off. No new physics enters the calculation, which is why a conversion can never repair a wrong measurement — it only propagates it faithfully.

**The structure of the inverse (z to y and back).** In matrix form $[y] = [z]^{-1}$ and $[z] = [y]^{-1}$, and the 2x2 inverse always has the pattern:
$$\frac{1}{\Delta}\begin{bmatrix} d & -b \\ -c & a\end{bmatrix}$$
So $y_{11} = z_{22}/\Delta_z$, $y_{12} = -z_{12}/\Delta_z$, $y_{21} = -z_{21}/\Delta_z$ and $y_{22} = z_{11}/\Delta_z$: the diagonals swap and both off-diagonals change sign. The determinants invert too, $\Delta_y = 1/\Delta_z$, so $\Delta_z \Delta_y = 1$ is a free arithmetic check on any hand conversion. The z-to-h conversions look asymmetric but come from the same idea applied to the h definitions: because $h_{22} = 1/z_{22}$ and $I_2$ is defined leaving port 2, the forward term picks up a minus sign, $h_{21} = -z_{21}/z_{22}$. That single sign is the most common source of a wrong final answer in this topic.

**Why the determinant is everywhere.** $\Delta_z = z_{11}z_{22} - z_{12}z_{21}$ is the coupling term of the network: $z_{11}z_{22}$ is the behaviour with the ports independent, and the subtracted product is the internal path that couples them. A reciprocal network has $z_{12} = z_{21}$, so $\Delta_z = z_{11}z_{22} - z_{12}^{2}$, and every open-circuit transfer function ends up with $\Delta_z$ in its denominator — exactly as the solution of any 2x2 system divides by its determinant. The determinant also moves between sets in a fixed pattern. The y and g sets invert it:
$$\Delta_y = 1/\Delta_z$$
and $\Delta_g = 1/\Delta_h$; the h set scales it:
$$\Delta_h = \Delta_z/z_{22} = z_{11}/z_{22}$$
For the transmission set $AD - BC = z_{12}/z_{21}$, which equals $1$ precisely when the network is reciprocal ([[07_Reciprocity_and_Symmetry_Conditions]]).

**Unit bookkeeping and conversion strategy.** The sets are not unit-compatible: $[z]$ is entirely ohms, $[y]$ entirely siemens, $[ABCD]$ has dimensionless $A$ and $D$ with ohms in $B$ and siemens in $C$, and $[h]$ and $[g]$ mix units ($h_{11}$ in ohms, $h_{12}$ and $h_{21}$ dimensionless, $h_{22}$ in siemens). Never compare or add entries across sets. The exam strategy is to obtain the set the circuit hands you for free and convert once: a T or pi of series and shunt elements gives $[z]$ or $[y]$ by inspection, a transistor stage gives $[h]$, and a chain of stages gives $[ABCD]$ ([[05_Transmission_ABCD_Parameters]]). Then (1) convert, (2) check $\Delta_y = 1/\Delta_z$ or $\Delta_h = z_{11}/z_{22}$, and (3) check $AD - BC = z_{12}/z_{21}$. Two independent checks catch nearly every sign and arithmetic slip. Finally, note that a conversion can fail to exist: if $\Delta_z = 0$ the z-matrix is singular and no finite $[y]$ exists, and a pure series element has $h_{22} = 0$, making $z_{22} = 1/h_{22}$ infinite, so the z-set simply does not describe that network.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| z determinant | $\Delta_z = z_{11} z_{22} - z_{12} z_{21}$ | Units ohm^2. Delta_z = 0 means the z-matrix is singular (a shunt-only path or an ideal through connection) and no finite y-set exists. |
| y from z (inverse matrix) | $[y] = \frac{1}{\Delta_z}\begin{bmatrix} z_{22} & -z_{12} \\ -z_{21} & z_{11} \end{bmatrix}$ | Diagonals swap, both off-diagonals change sign. Units 1/ohm = S. Check with Delta_y = 1/Delta_z. |
| z from y (inverse matrix) | $[z] = \frac{1}{\Delta_y}\begin{bmatrix} y_{22} & -y_{12} \\ -y_{21} & y_{11} \end{bmatrix}$ | Same pattern. Delta_y is in S^2, so z comes out in ohm. Useful when a parallel network gives y by inspection. |
| h from z | $h_{11} = \frac{\Delta_z}{z_{22}},\quad h_{12} = \frac{z_{12}}{z_{22}},\quad h_{21} = -\frac{z_{21}}{z_{22}},\quad h_{22} = \frac{1}{z_{22}}$ | h11 in ohm, h12 and h21 dimensionless, h22 in S. The minus on h21 comes from I2 being defined leaving port 2. Requires z22 finite and nonzero. |
| z from h | $z_{11} = \frac{\Delta_h}{h_{22}},\quad z_{12} = \frac{h_{12}}{h_{22}},\quad z_{21} = -\frac{h_{21}}{h_{22}},\quad z_{22} = \frac{1}{h_{22}}$ | dh = h11 h22 - h12 h21 is dimensionless. Fails when h22 = 0 (a pure series element): then z22 is infinite and the z-set does not exist. |
| g from h | $g_{11} = \frac{h_{22}}{\Delta_h},\quad g_{12} = -\frac{h_{12}}{\Delta_h},\quad g_{21} = -\frac{h_{21}}{\Delta_h},\quad g_{22} = \frac{h_{11}}{\Delta_h}$ | g is the inverse-hybrid set (I1 = g11 V1 + g12 I2; V2 = g21 V1 + g22 I2). Note g11 = h22/dh, NOT dh/h22. |
| ABCD from z | $A = \frac{z_{11}}{z_{21}},\quad B = \frac{\Delta_z}{z_{21}},\quad C = \frac{1}{z_{21}},\quad D = \frac{z_{22}}{z_{21}}$ | A and D dimensionless, B in ohm, C in S. Requires z21 nonzero; for a unilateral network (z21 = 0) no ABCD exists. |
| z from ABCD | $z_{11} = \frac{A}{C},\quad z_{12} = \frac{AD - BC}{C},\quad z_{21} = \frac{1}{C},\quad z_{22} = \frac{D}{C}$ | Requires C nonzero. Use (AD - BC) = z12/z21 as the reciprocity check after converting. |
| Determinant identities | $\Delta_y = \frac{1}{\Delta_z},\qquad \Delta_h = \frac{\Delta_z}{z_{22}} = \frac{z_{11}}{z_{22}},\qquad \Delta_g = \frac{1}{\Delta_h}$ | Use these as instant checks on a hand conversion. dz dy = 1 and dh dg = 1. |
| Transmission determinant | $AD - BC = \frac{z_{12}}{z_{21}} = \frac{y_{12}}{y_{21}} = -\frac{h_{12}}{h_{21}}$ | Dimensionless. Equals 1 only for a reciprocal network; it is a test, not an identity. A gyrator gives -1 and a unilateral amplifier gives 0. |

## Interactive Widget

**Two Port Matrix Calculator**

![[Two_Port_Matrix_Calculator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A two-port has $z_{11} = 10\ \Omega$, $z_{12} = z_{21} = 5\ \Omega$ and $z_{22} = 15\ \Omega$. Find its $[y]$ matrix and confirm the answer with the determinant identity.

**Given:** z11 = 10 ohm; z12 = z21 = 5 ohm; z22 = 15 ohm

**Solution:**

1. Determinant: dz = z11 z22 - z12 z21 = (10)(15) - (5)(5) = 150 - 25 = 125 ohm^2
2. Diagonals: y11 = z22/dz = 15/125 = 0.12 S and y22 = z11/dz = 10/125 = 0.08 S
3. Off-diagonals: y12 = -z12/dz = -5/125 = -0.04 S and y21 = -z21/dz = -0.04 S
4. Check: dy = y11 y22 - y12 y21 = (0.12)(0.08) - (-0.04)^2 = 0.0096 - 0.0016 = 0.0080 S^2 = 1/125 ohm^-2, so dy = 1/dz

> [!success]- Answer
> **y11 = 0.12 S, y12 = y21 = -0.04 S, y22 = 0.08 S (dz = 125 ohm^2, dy = 8.0 mS^2).**

> [!warning] Trap
> Writing y11 = z11/dz. The 2x2 inverse swaps the diagonals: y11 takes z22 and y22 takes z11. Swapping them still gives a symmetric-looking matrix, so only the dy = 1/dz check exposes it.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`: MatA = `10 5 5 15`.
> 2. `Det` → **125** $\Omega^2$; `Inv` → $[y]$ = **0.12, -0.04, -0.04, 0.08** S.
> 3. Determinant identity: `1÷125` → **8.0 mS**$^2$ = $\Delta_y$.

### P2. Convert $z_{11} = 50\ \Omega$, $z_{12} = 25\ \Omega$, $z_{21} = 10\ \Omega$, $z_{22} = 25\ \Omega$ to hybrid parameters.

**Given:** z11 = 50 ohm; z12 = 25 ohm; z21 = 10 ohm; z22 = 25 ohm

**Solution:**

1. dz = (50)(25) - (25)(10) = 1250 - 250 = 1000 ohm^2
2. h11 = dz/z22 = 1000/25 = 40 ohm
3. h12 = z12/z22 = 25/25 = 1.0 (dimensionless) and h21 = -z21/z22 = -10/25 = -0.4
4. h22 = 1/z22 = 1/25 = 0.04 S
5. Check with dh = z11/z22 = 50/25 = 2.0: h11 h22 - h12 h21 = 40(0.04) - (1.0)(-0.4) = 1.6 + 0.4 = 2.0

> [!success]- Answer
> **h11 = 40 ohm, h12 = 1.0, h21 = -0.4, h22 = 0.04 S (dh = 2.0).**

> [!warning] Trap
> Dropping the minus on h21 = -z21/z22 and then 'proving' reciprocity from h12 = -h21. Here z12 = 25 ohm and z21 = 10 ohm, so the network is NOT reciprocal, yet with the sign dropped h12 = 1 and h21 = 0.4 would look like a near-miss instead of an outright failure.

### P3. A transistor stage is measured as $h_{11} = 1000\ \Omega$, $h_{12} = 10^{-3}$, $h_{21} = 50$, $h_{22} = 10^{-4}\ \mathrm{S}$. Convert to $[z]$ and verify $z_{11}$ and $z_{21}$ by converting back.

**Given:** h11 = 1000 ohm; h12 = 1e-3; h21 = 50; h22 = 1e-4 S

**Solution:**

1. dh = h11 h22 - h12 h21 = (1000)(1e-4) - (1e-3)(50) = 0.1 - 0.05 = 0.05 (dimensionless)
2. z11 = dh/h22 = 0.05/1e-4 = 500 ohm and z22 = 1/h22 = 1/1e-4 = 10 000 ohm = 10 kohm
3. z12 = h12/h22 = 1e-3/1e-4 = 10 ohm and z21 = -h21/h22 = -50/1e-4 = -500 000 ohm = -500 kohm
4. Re-convert z21: h21 = -z21/z22 = -(-500000)/10000 = +50, which matches the given h21
5. Re-convert z11: dz = (500)(10000) - (10)(-500000) = 5e6 + 5e6 = 1e7 ohm^2, so h11 = dz/z22 = 1e7/1e4 = 1000 ohm, which matches

> [!success]- Answer
> **z11 = 500 ohm, z12 = 10 ohm, z21 = -500 kohm, z22 = 10 kohm.**

> [!warning] Trap
> Treating the negative z21 as an arithmetic slip and 'fixing' it to +500 kohm. A forward current gain h21 = +50 (an hfe) converts to z21 = -h21/h22 < 0 because I2 is defined leaving port 2; the sign is a consequence of the convention and the round-trip check confirms it.

### P4. An active two-port has $z_{11} = 20\ \Omega$, $z_{12} = 10\ \Omega$, $z_{21} = 5\ \Omega$, $z_{22} = 10\ \Omega$. Convert it to $[ABCD]$, evaluate $AD - BC$, and convert back to check.

**Given:** z11 = 20 ohm; z12 = 10 ohm; z21 = 5 ohm; z22 = 10 ohm

**Solution:**

1. dz = (20)(10) - (10)(5) = 200 - 50 = 150 ohm^2
2. A = z11/z21 = 20/5 = 4 and D = z22/z21 = 10/5 = 2
3. B = dz/z21 = 150/5 = 30 ohm and C = 1/z21 = 1/5 = 0.2 S
4. AD - BC = (4)(2) - (30)(0.2) = 8 - 6 = 2, which equals z12/z21 = 10/5 = 2 and is not 1, so the network is non-reciprocal
5. Convert back: z11 = A/C = 4/0.2 = 20 ohm, z12 = (AD-BC)/C = 2/0.2 = 10 ohm, z21 = 1/C = 5 ohm, z22 = D/C = 2/0.2 = 10 ohm — all four match

> [!success]- Answer
> **A = 4, B = 30 ohm, C = 0.2 S, D = 2; AD - BC = 2 (non-reciprocal, z12 = 10 ohm != z21 = 5 ohm).**

> [!warning] Trap
> Assuming every ABCD matrix built from a z-matrix satisfies AD - BC = 1. It equals z12/z21, so it is 1 only for a reciprocal network; a dependent source gives any value. Using '1' as a hard check here would falsely reject a correct conversion.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20÷5` → **A = 4**; `20×10−10×5` → $\Delta_z$ = **150** $\Omega^2$; `150÷5` → **B = 30** $\Omega$.
> 2. `1÷5` → **C = 0.2 S**; `10÷5` → **D = 2**.
> 3. `4×2−30×0.2` → **2**, not 1, so the network is non-reciprocal — as $z_{12} \neq z_{21}$ warned.

### P5. For the passive two-port $z_{11} = 12\ \Omega$, $z_{12} = z_{21} = 4\ \Omega$, $z_{22} = 9\ \Omega$, compute $\Delta_z$, $\Delta_y$, $\Delta_h$, $\Delta_g$ and $AD - BC$, then state whether the network is reciprocal and whether it is symmetric.

**Given:** z11 = 12 ohm; z12 = z21 = 4 ohm; z22 = 9 ohm

**Solution:**

1. dz = (12)(9) - (4)(4) = 108 - 16 = 92 ohm^2, so dy = 1/dz = 1/92 = 0.01087 S^2
2. h11 = dz/z22 = 92/9 = 10.22 ohm, h12 = 4/9 = 0.4444, h21 = -4/9 = -0.4444, h22 = 1/9 = 0.1111 S
3. dh = h11 h22 - h12 h21 = (10.222)(0.1111) - (0.4444)(-0.4444) = 1.1358 + 0.1975 = 1.333 = z11/z22 = 12/9, and dg = 1/dh = 0.75
4. ABCD: A = 12/4 = 3, B = 92/4 = 23 ohm, C = 1/4 = 0.25 S, D = 9/4 = 2.25, so AD - BC = 6.75 - 5.75 = 1
5. Reciprocity: z12 = z21 = 4 ohm and AD - BC = 1. Symmetry: z11 = 12 ohm != z22 = 9 ohm and A = 3 != D = 2.25, so it is reciprocal but not symmetric

> [!success]- Answer
> **dz = 92 ohm^2, dy = 10.87 mS^2, dh = 1.333, dg = 0.75, AD - BC = 1; reciprocal but not symmetric.**

> [!warning] Trap
> Calling the network symmetric because z12 = z21. That equality is the reciprocity test (or equivalently AD - BC = 1). Symmetry needs the port-equality test as well: z11 = z22, or A = D, or dh = 1. Here all three of those fail.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `12×9−4²` → $\Delta_z$ = **92** $\Omega^2$; `1÷Ans` → $\Delta_y$ = **10.87 mS**$^2$.
> 2. `(92+4×4)÷9²` → $\Delta_h$ = **1.333**; `1÷Ans` → $\Delta_g$ = **0.75**. The last two multiply to 1.
> 3. `4−4` → **0** so $AD - BC = 1$: reciprocal. `12−9` → **3** $\Omega \neq 0$: not symmetric.

## Traps & Exam Notes

- Inverting a 2x2 by hand without swapping the diagonals: y11 = z22/dz, not z11/dz, and z11 = y22/dy, not y11/dy. The inverse exchanges a11 with a22.
- Sign slips on the off-diagonal conversions. Both z<->y off-diagonals keep a minus, and the h/g forward-gain terms carry one too (h21 = -z21/z22, g12 = -h12/dh) because I2 leaves port 2. A missed minus usually surfaces as a bogus 'h12 = +h21, therefore reciprocal' conclusion.
- Treating AD - BC = 1 as an identity rather than the reciprocity condition. It equals z12/z21, so an active network can give 2 (the P4 example), -1 (a gyrator) or 0 (a unilateral amplifier).
- Mixing units before converting: dz is in ohm^2, dy in S^2, dh and dg are dimensionless, B is in ohm and C in siemens. Feeding millisiemens into h22 = 1/z22, or reading B as an admittance, is the standard 1000x error.
- Converting a set that does not exist. dz = 0 (a shunt-only or ideal through network) leaves the z-set with no inverse; h22 = 0 (a pure series element) makes z22 = 1/h22 infinite. The formula dividing by zero is the signal that the network has no description in the target set, not that you mis-substituted.

## See Also

- [[02_Z_and_Y_Parameters]]
- [[05_Transmission_ABCD_Parameters]]
- [[07_Reciprocity_and_Symmetry_Conditions]]

---

[[05_Transmission_ABCD_Parameters|⬅ 05]] · [[_MOC_Two_Port_Networks|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Reciprocity_and_Symmetry_Conditions|07 ➡]]
