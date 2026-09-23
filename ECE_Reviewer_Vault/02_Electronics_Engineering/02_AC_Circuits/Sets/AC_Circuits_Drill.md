---
title: "AC Circuits — Drill"
type: drill
area: 02_AC_Circuits
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 60
updated: 2026-09-23
---

# AC Circuits — Practice Drill

**8 problems** drawn from a pool of 60 across 10 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 02_AC_Circuits --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A series circuit has $R = 30\ \Omega$, $L = 40\ \text{mH}$ and $C = 25\ \mu\text{F}$, driven by $120\ \text{V}$ RMS at $60\ \text{Hz}$. Find the total impedance, the current phasor, the voltage across each element, and the real power delivered.

**Given:** $R = 30\ \Omega$; $L = 40\ \text{mH}$; $C = 25\ \mu\text{F}$; $V_s = 120\ \text{V}$ RMS; $f = 60\ \text{Hz}$

> [!success]- Answer
> **$Z = 95.84\angle -71.77^\circ\ \Omega$; $\mathbf{I} = 1.25\angle 71.8^\circ\ \text{A}$; $\mathbf{V}_R = 37.6\angle 71.8^\circ\ \text{V}$, $\mathbf{V}_L = 18.9\angle 161.8^\circ\ \text{V}$, $\mathbf{V}_C = 132.8\angle -18.2^\circ\ \text{V}$; $P = 47.0\ \text{W}$**

> [!warning] Trap
> Adding the element voltages as magnitudes, $37.56 + 18.88 + 132.8 = 189\ \text{V}$, and declaring KVL violated. The phasors add as vectors, and $V_L$ and $V_C$ are $180^\circ$ apart, so they largely cancel. The capacitor voltage exceeding the $120\ \text{V}$ source is not an error either — KVL holds on the phasors, and one element of a series branch can carry a larger voltage than the source whenever the reactive voltages nearly cancel.

<sub>from ECE-02-03</sub>

### 2. A source of $20\ \text{V}$ RMS with an internal impedance of $50\ \Omega$ feeds a series $200\ \Omega$ resistor, which in turn connects to a load $Z_L = 100 + j50\ \Omega$. Find the phasor voltage across the load, its RMS magnitude, and the real power delivered to the load.

**Given:** $V_s = 20\ \text{V}$ RMS at $0^\circ$; $Z_s = 50\ \Omega$; $R_1 = 200\ \Omega$; $Z_L = 100 + j50\ \Omega$

> [!success]- Answer
> **$\mathbf{V}_L = 6.33\angle 18.4^\circ\ \text{V}$ RMS, and the load absorbs $P = 0.320\ \text{W}$**

> [!warning] Trap
> Ignoring the $50\ \Omega$ source resistance and computing $20\cdot\frac{100+j50}{300+j50}$, which gives $7.35\angle 17.1^\circ\ \text{V}$ and $P = V_s^2R_L/|300+j50|^2 = 0.432\ \text{W}$ — $35\%$ more than the correct $0.320\ \text{W}$. Every impedance between the source and the load belongs in the denominator of the divider, and the load voltage is complex even though the source phase is zero.

<sub>from ECE-02-03</sub>

### 3. A series circuit with $R = 4\ \Omega$, $L = 2$ mH and $C = 0.5\ \mu$F is driven at resonance by $V_s = 12$ V rms. Find $f_0$, $Q_0$, the voltages across $L$ and $C$, and the minimum peak voltage rating for the capacitor.

**Given:** R = 4 ohm; L = 2 mH; C = 0.5 uF; V_s = 12 V rms at resonance

> [!success]- Answer
> **$f_0 = 5032.9$ Hz, $Q_0 = 15.81$, $V_L = V_C = 189.7$ V rms (268.3 V peak) from a 12 V rms source**

> [!warning] Trap
> Rating the capacitor from the source voltage, or from $Q_0V_s$ rms without the peak margin. Here the reactive voltage is 189.7 V rms, i.e. 268.3 V peak across a capacitor in a circuit fed by 12 V rms; a 200 V part fails in service, and even the rms figure of 189.7 V exceeds a 150 V rating. Adding $V_L+V_C = 379$ V and expecting it across the source is the mirror-image error, since those two phasors cancel.

<sub>from ECE-02-07</sub>

### 4. A single-phase 230 V, 60 Hz motor winding has $R = 8\ \Omega$ and $L = 20$ mH in series. Find the power factor, the real power, the reactive power, and the capacitance in $\mu$F that would bring the combination to unity power factor.

**Given:** R = 8 ohm; L = 20 mH; V = 230 V rms, f = 60 Hz; Target PF = 1.0

> [!success]- Answer
> **$PF = 0.7277$ lagging, $P = 3.502$ kW, $Q = 3.300$ kvar, $C = 165.5\ \mu$F for unity power factor**

> [!warning] Trap
> Computing the power factor as $R/X_L = 8/7.540 = 1.06$. Power factor is the cosine of the *impedance* angle, $R/|\mathbf{Z}| = 0.7277$, where $|\mathbf{Z}|$ includes both $R$ and $X_L$. A calculated power factor greater than 1 is the immediate tell that the wrong ratio was used.

<sub>from ECE-02-06</sub>

### 5. A load draws $12\,\mathrm{A\,rms}$ at $230\,\mathrm{V\,rms}$ with a power factor of $0.75$ lagging. Find $S$, $P$, $Q$ and the load impedance.

**Given:** I = 12 A rms; V = 230 V rms; pf = 0.75 lagging

> [!success]- Answer
> **$S = 2760\,\mathrm{VA}$, $P = 2070\,\mathrm{W}$, $Q = +1825\,\mathrm{var}$, $\mathbf{Z} = 14.38 + j12.68\,\Omega$**

> [!warning] Trap
> Using $\theta = \arccos(0.75) = 41.41^\circ$ and then computing $Q = S\cos\theta$ again. Once $\theta$ is in hand, the real part uses $\cos$ and the reactive part uses $\sin$; reusing $\cos$ gives $Q = P$.

<sub>from ECE-02-05</sub>

### 6. A practical tank has $L = 100\ \text{mH}$ and $C = 10\ \mu\text{F}$, wound as a coil whose resistance is $R = 10\ \Omega$ in series with $L$. Find the characteristic impedance, the exact anti-resonant frequency, the approximate value $1/\sqrt{LC}$, $Q$ and the dynamic impedance.

**Given:** L = 100 mH; C = 10 uF; R = 10 ohm (coil, in series with L)

> [!success]- Answer
> **$Z_0 = 100\ \Omega$; $\omega_0 = 994.99\ \text{rad/s}$ ($f_0 = 158.4\ \text{Hz}$) against $1/\sqrt{LC} = 1000\ \text{rad/s}$; $Q = 9.95$; $Z_{dyn} = 1000\ \Omega$**

> [!warning] Trap
> Using $Z_{dyn} = Q^{2}R$ as if it were exact and answering $990\ \Omega$. $Q^{2}R$ subtracts the $R^{2}/L^{2}$ term twice and is 1 % low at $Q = 10$; the gap explodes for a lossier coil. $Z_{dyn} = L/(RC) = 1000\ \Omega$ is the exact value.

<sub>from ECE-02-08</sub>

### 7. The same tank ($L = 100\ \text{mH}$, $C = 10\ \mu\text{F}$, $R = 10\ \Omega$, $Z_{dyn} = 1000\ \Omega$, $\omega_0 = 994.99\ \text{rad/s}$, $Q = 9.95$) is driven by a $120\ \text{V rms}$ source at its exact anti-resonant frequency. Find the source current, the capacitor current, the coil-branch current, and the bandwidth in rad/s and in Hz.

**Given:** V_s = 120 V rms at omega_0; L = 100 mH; C = 10 uF; R = 10 ohm; omega_0 = 994.99 rad/s; Z_dyn = 1000 ohm; Q = 9.95

> [!success]- Answer
> **$I_s = 120\ \text{mA rms}$, $I_C = 1.194\ \text{A rms}$, $|I_L| = 1.200\ \text{A rms}$, $BW = 100\ \text{rad/s} = 15.9\ \text{Hz}$**

> [!warning] Trap
> Concluding that the tank is a low-stress circuit because the source current is only $120\ \text{mA}$. The capacitor and coil each carry about $1.19\ \text{A}$ — roughly $Q = 10$ times the source current — so their current and reactive-power ratings, not the supply current, size the components.

<sub>from ECE-02-08</sub>

### 8. Load 1 draws $1000\,\mathrm{W}$ at 0.8 power factor lagging; load 2 draws $500\,\mathrm{W}$ at 0.9 power factor leading. Find the total real power, reactive power, apparent power and overall power factor.

**Given:** Load 1: P = 1000 W, pf = 0.8 lagging; Load 2: P = 500 W, pf = 0.9 leading

> [!success]- Answer
> **$P = 1500\,\mathrm{W}$, $Q = +507.8\,\mathrm{var}$, $S = 1583.6\,\mathrm{VA}$, $\text{pf} = 0.947$ lagging**

> [!warning] Trap
> Averaging the power factors to get 0.85. Power factors do not add or average; the leading load cancels part of the lagging load's reactive power, and the correct overall pf is 0.947.

<sub>from ECE-02-05</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-02-01 | Sinusoid, RMS, Average, Form and Crest | 5 |
| ECE-02-02 | Phasors and Complex Impedance | 9 |
| ECE-02-03 | Series and Parallel AC Analysis | 5 |
| ECE-02-04 | AC Thevenin, Norton and Max Power | 4 |
| ECE-02-05 | AC Power, PQS and Triangle | 9 |
| ECE-02-06 | Power Factor and Correction | 5 |
| ECE-02-07 | Series Resonance | 5 |
| ECE-02-08 | Parallel Resonance and Anti-Resonance | 4 |
| ECE-02-09 | Balanced Wye and Delta Systems | 5 |
| ECE-02-10 | Three-Phase Power and Two-Wattmeter | 9 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
