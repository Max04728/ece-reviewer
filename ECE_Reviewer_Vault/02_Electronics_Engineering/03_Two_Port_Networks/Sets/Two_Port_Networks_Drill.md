---
title: "Two Port Networks — Drill"
type: drill
area: 03_Two_Port_Networks
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 45
updated: 2026-09-23
---

# Two Port Networks — Practice Drill

**8 problems** drawn from a pool of 45 across 9 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 03_Two_Port_Networks --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. **An extracted element comes out negative.** A reciprocal two-port has $z_{11} = 15\ \Omega$, $z_{12} = z_{21} = 20\ \Omega$, $z_{22} = 40\ \Omega$. Extract the T equivalent, then the pi equivalent, and explain what the negative elements mean.

**Given:** z11 = 15 ohm; z12 = z21 = 20 ohm; z22 = 40 ohm

> [!success]- Answer
> **T: Za = -5 ohm, Zb = 20 ohm, Zc = 20 ohm. Pi: Ra = 10 ohm, Rb = -40 ohm, Rc = 10 ohm. Not realisable with passive elements.**

> [!warning] Trap
> Discarding the negative sign and reporting Za = +5 ohm to make the network look physical. That equivalent reproduces z11 = 25 ohm instead of 15 ohm and every downstream answer is wrong; the negative element is the correct exam answer, and it is precisely the signal that the network needs active components.

<sub>from ECE-03-03</sub>

### 2. Convert $z_{11} = 50\ \Omega$, $z_{12} = 25\ \Omega$, $z_{21} = 10\ \Omega$, $z_{22} = 25\ \Omega$ to hybrid parameters.

**Given:** z11 = 50 ohm; z12 = 25 ohm; z21 = 10 ohm; z22 = 25 ohm

> [!success]- Answer
> **h11 = 40 ohm, h12 = 1.0, h21 = -0.4, h22 = 0.04 S (dh = 2.0).**

> [!warning] Trap
> Dropping the minus on h21 = -z21/z22 and then 'proving' reciprocity from h12 = -h21. Here z12 = 25 ohm and z21 = 10 ohm, so the network is NOT reciprocal, yet with the sign dropped h12 = 1 and h21 = 0.4 would look like a near-miss instead of an outright failure.

<sub>from ECE-03-06</sub>

### 3. **Current gain with a load, from the h parameters.** A CE amplifier has $h_{ie} = 1\ \mathrm{k\Omega}$, $h_{fe} = 50$, $h_{oe} = 25\ \mu\mathrm{S}$ and $h_{re}$ negligible. It drives a $2\ \mathrm{k\Omega}$ load. Find the current gain delivered to the load and the voltage gain across the load.

**Given:** hie = 1 kohm; hfe = 50; hoe = 25 uS; RL = 2 kohm; hre negligible

> [!success]- Answer
> **|A_i| = 47.62 (33.6 dB) delivered to the load, and |A_v| = 95.2 (39.6 dB), inverting.**

> [!warning] Trap
> Using A_i = hfe = 50 by ignoring hoe. The finite output conductance steals current from the load: only 1.9048/2 = 95.2 percent of the 50-unit gain reaches RL. Skipping the h22 term overstates the current gain by about 5 percent here and much more when RL is small.

<sub>from ECE-03-04</sub>

### 4. **Open-circuit input and output impedance.** For the two-port of the previous problem, find the impedance looking into port 1 with port 2 open and the impedance looking into port 2 with port 1 open, and state the general rule.

**Given:** z11 = 30 ohm; z12 = 10 ohm; z21 = 10 ohm; z22 = 35 ohm

> [!success]- Answer
> **Z_in,1 (port 2 open) = z11 = 30 ohm; Z_in,2 (port 1 open) = z22 = 35 ohm.**

> [!warning] Trap
> Quoting 1/y11 as the open-circuit input impedance. The open-circuit input impedance is z11 exactly; 1/y11 is the input impedance with the output SHORTED, and for this network the two differ by 2.86 ohm (about 10 percent).

<sub>from ECE-03-02</sub>

### 5. **Build the T equivalent from given z parameters.** A two-port has $z_{11} = 30\ \Omega$, $z_{12} = z_{21} = 12\ \Omega$, $z_{22} = 22\ \Omega$. Find its T equivalent and verify by recomputing the z parameters from the equivalent.

**Given:** z11 = 30 ohm; z12 = z21 = 12 ohm; z22 = 22 ohm

> [!success]- Answer
> **Za = 18 ohm, Zb = 12 ohm, Zc = 10 ohm, all positive; the equivalent reproduces z11 = 30, z12 = z21 = 12, z22 = 22 ohm.**

> [!warning] Trap
> Placing 12 ohm in the middle but then also subtracting it from the wrong diagonal. Za comes from z11 and Zc from z22: getting them the wrong way round gives Za = 10 and Zc = 18, which still reproduces z11 and z22 only if the network happens to be symmetric — here it is not, so the swap is detectable and wrong.

<sub>from ECE-03-03</sub>

### 6. **A network with a dependent source is not reciprocal.** A two-port has $z_{11} = 20\ \Omega$ and $z_{22} = 30\ \Omega$, with $z_{12} = 5\ \Omega$. An amplifier inside the box senses $I_1$ and injects into the output branch so that $z_{21}$ is raised to $15\ \Omega$. Find the full matrix, the determinant, and prove non-reciprocity through the hybrid parameters.

**Given:** z11 = 20 ohm; z12 = 5 ohm; z21 = 15 ohm (raised by the transresistance dependent source); z22 = 30 ohm

> [!success]- Answer
> **[z] = [20, 5; 15, 30] ohm, dz = 525 ohm^2, non-reciprocal (z12 = 5 ohm vs z21 = 15 ohm; h12 = 0.1667 vs -h21 = +0.5).**

> [!warning] Trap
> Concluding the network is reciprocal because the parts list only resistors and the diagonal entries look ordinary. Non-reciprocity lives entirely in the off-diagonal entries; a dependent source raises z21 without touching z12, and only a direct comparison of the two off-diagonals (or of h12 with -h21) reveals it.

<sub>from ECE-03-02</sub>

### 7. **Find the h parameters from the definitions.** A T network has a $10\ \Omega$ series arm at port 1, a $15\ \Omega$ shunt leg and a $20\ \Omega$ series arm at port 2. Compute $h_{11}$, $h_{12}$, $h_{21}$ and $h_{22}$ from their defining tests, and state $\Delta_h$.

**Given:** Za = 10 ohm (input series arm); Zb = 15 ohm (shunt leg); Zc = 20 ohm (output series arm)

> [!success]- Answer
> **[h] = [[18.571 ohm, 0.42857], [-0.42857, 28.571 mS]]; Delta_h = 0.71429 (dimensionless, since h11 h22 and h12 h21 share units).**

> [!warning] Trap
> Reporting h21 = +0.42857. Because I2 is defined entering port 2, the current that actually flows through the Zc branch toward port 2 is -I2, so the short-circuit current gain of a passive T network comes out NEGATIVE in this convention. Only the magnitude is the familiar datasheet number.

<sub>from ECE-03-04</sub>

### 8. Two networks are connected with their inputs in series and their outputs in parallel. Network A is a T with $Z_a = 10\ \Omega$, $Z_b = 20\ \Omega$, $Z_c = 10\ \Omega$; network B is a T with $Z_a = 10\ \Omega$, $Z_b = 10\ \Omega$, $Z_c = 20\ \Omega$. Find the combined $[h]$ and check the validity of the connection.

**Given:** A: T with Za = 10, Zb = 20, Zc = 10 ohm; B: T with Za = 10, Zb = 10, Zc = 20 ohm; series input, parallel output

> [!success]- Answer
> **h11 = 33.33 ohm, h12 = 1.0, h21 = -1.0, h22 = 66.67 mS; reciprocal (h12 = -h21) but not symmetric (dh = 3.22).**

> [!warning] Trap
> Adding z or y matrices for a series-parallel connection because those sets are more familiar. The matching set is h for series input / parallel output and g for parallel input / series output; the connection, not convenience, chooses the set.

<sub>from ECE-03-08</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-03-01 | Two-Port Variables and Conventions | 5 |
| ECE-03-02 | Z and Y Parameters | 5 |
| ECE-03-03 | T and Pi Equivalent Networks | 5 |
| ECE-03-04 | Hybrid and Inverse Hybrid Parameters | 5 |
| ECE-03-05 | Transmission ABCD Parameters | 5 |
| ECE-03-06 | Parameter Conversions and Determinants | 5 |
| ECE-03-07 | Reciprocity and Symmetry Conditions | 5 |
| ECE-03-08 | Interconnections: Series, Parallel, Cascade | 5 |
| ECE-03-09 | Terminated Networks and Gains | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
