---
id: ECE-02-03
title: "Series and Parallel AC Analysis"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Phasors_and_Complex_Impedance]]", "[[01_Complex_Numbers,_Euler_and_De_Moivre]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Series and Parallel AC Analysis

> [!abstract] Scope
> Reduce series and parallel AC networks in the phasor domain, find voltages and currents by complex division, and recognize resonance as the frequency where the reactances cancel.

## Core Concept

> [!tip] Intuition
> In the phasor domain an AC circuit behaves exactly like a DC resistor network, provided every element is replaced by a complex impedance and every source by a phasor. The one new idea is that impedances add as vectors: an inductor's $+jX_L$ and a capacitor's $-jX_C$ pull the total in opposite directions along the imaginary axis instead of simply adding like resistors.

**Everything is a DC problem in disguise.** Convert each source to a phasor:
$$\mathbf{V} = V_{rms}\angle\varphi$$
(or a peak phasor — pick one convention and never mix it). Then replace $R\to R$, $L\to j\omega L$, $C\to 1/(j\omega C) = -j/(\omega C)$, and apply the entire DC toolbox: series and parallel reduction, voltage and current division, KVL, KCL, nodal and mesh analysis. The only changes are that the arithmetic is complex, that the answers are phasors to be converted back with:
$$v(t) = \sqrt{2}\,V_{rms}\cos(\omega t + \varphi)$$
and that **every element must be at the same $\omega$.** Superposition and source transformation still work; what fails is the DC habit of treating an inductor as a short and a capacitor as an open, which is only true at $\omega = 0$.

**Rectangular for sums, polar for products.** Adding impedances in series is easiest in rectangular form:
$$Z = R + j(X_L - X_C)$$
with magnitude $|Z| = \sqrt{R^2 + X^2}$ and angle $\theta = \arctan(X/R)$ carrying the sign of $X$. Multiplying or dividing — which is what voltage division and Ohm's law phasor work always require — is easiest in polar form, because magnitudes multiply or divide and angles add or subtract. The impedance of an inductor is $X_L\angle +90^\circ$ and of a capacitor $X_C\angle -90^\circ$, so a current through an inductor produces a voltage that leads it by $90^\circ$, and through a capacitor a voltage that lags by $90^\circ$. Converting back and forth with a calculator's polar key is the single biggest time sink in an AC exam; do the addition in rectangular, immediately convert to polar, and stay there.

**Voltage division still holds, but the load must be included.** For two impedances in series the relation is:
$$\mathbf{V}_2 = \mathbf{V}_s\,\dfrac{Z_2}{Z_1+Z_2}$$
and current division is:
$$\mathbf{I}_1 = \mathbf{I}_s\,\dfrac{Z_2}{Z_1+Z_2}$$
— note the *opposite* impedance in the numerator for currents. The classic mistake is applying the divider to $Z_2$ alone when $Z_2$ actually sits in parallel with a load $Z_L$; the correct element is the parallel combination:
$$Z_2\|Z_L = \dfrac{Z_2Z_L}{Z_2+Z_L}$$
Always redraw and mark the actual two-port node pair whose voltage you want before writing the divider. A complex load also means the divider ratio is complex, so the output is *phase-shifted* as well as attenuated, and a resistive-only intuition will misjudge the magnitude by a wide margin.

**Resonance is the limiting case where the imaginary parts cancel.** Series resonance occurs when $X_L = X_C$, i.e.
$$\omega_0 = 1/\sqrt{LC}$$
the reactances do not become zero — they become equal and opposite, so $Z = R$ is purely real and *minimum*, the current is maximum, and $V_L$ and $V_C$ can individually be far larger than the source. Parallel resonance occurs when the susceptances cancel, $B_L = B_C$, which for an ideal parallel RLC also gives the same resonant frequency:
$$\omega_0 = 1/\sqrt{LC}$$
but there $Y = 1/R$ is real and *minimum*, so $Z$ is real and maximum and the total current is minimum. At resonance the inductor and capacitor trade energy back and forth while the source only supplies the resistor's losses, which is why the power factor is exactly 1 and the circuit looks purely resistive — and why the reactive powers $Q_L$ and $Q_C$ are equal and opposite and cancel.

**When the clean formulas stop applying.** The relation $\omega_0 = 1/\sqrt{LC}$ assumes a *simple* series or parallel connection of the three ideal elements. Add a second resistor, put the capacitor in parallel with only part of the network, or include winding resistance inside the inductor, and the resonant frequency shifts to the root of the imaginary part of the total admittance or impedance — you must derive it, not quote it. Also remember that the phasor method describes only the *steady-state* response at one frequency; it says nothing about what happens during the first few cycles after a switch. And because magnitudes are RMS values, series voltages like $V_R$ and $V_L$ never add arithmetically:
$$V_s = \sqrt{V_R^2 + (V_L - V_C)^2}$$
only when those three are in quadrature, and the general answer requires complex addition.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Inductive reactance and impedance | $X_L = \omega L, \qquad Z_L = jX_L = X_L\angle +90^\circ$ | omega in rad/s, L in henries, X_L in ohms. L scales with frequency, so an inductor blocks high frequencies and shorts DC. |
| Capacitive reactance and impedance | $X_C = \frac{1}{\omega C}, \qquad Z_C = -jX_C = X_C\angle -90^\circ$ | omega in rad/s, C in farads. X_C falls with frequency; the minus sign is the whole reason the capacitor current LEADS its voltage by 90 degrees. |
| Series impedance | $Z = R + j(X_L - X_C), \qquad \lvert Z \rvert = \sqrt{R^2 + X^2}$ | Add in rectangular form. theta = arctan(X/R) with the sign of X, so a capacitive net reactance gives a negative angle and a leading current. |
| Parallel impedance from admittances | $Y = \frac{1}{R} + j\left(\omega C - \frac{1}{\omega L}\right), \qquad Z = \frac{1}{Y}$ | Admittances add in parallel, which avoids the product-over-sum mess for three or more branches. The imaginary part is the net susceptance B. |
| Ohm's law in the phasor domain | $\mathbf{V} = \mathbf{I}Z, \qquad \mathbf{I} = \frac{\mathbf{V}}{Z} = \mathbf{V}Y$ | All quantities are phasors at one frequency; keep RMS-phasor and peak-phasor conventions consistent throughout a solution. |
| Voltage and current division | $\mathbf{V}_2 = \mathbf{V}_s\frac{Z_2}{Z_1+Z_2}, \qquad \mathbf{I}_1 = \mathbf{I}_s\frac{Z_2}{Z_1+Z_2}$ | Current division puts the *other* impedance in the numerator. For a loaded divider, replace Z_2 by Z_2 parallel Z_L first. |
| Series resonance | $\omega_0 = \frac{1}{\sqrt{LC}}, \qquad Z(\omega_0) = R$ | Impedance is real and minimum, current is maximum, and V_L and V_C can exceed the source by the quality factor Q. |
| Parallel resonance (ideal RLC) | $\omega_0 = \frac{1}{\sqrt{LC}}, \qquad Z(\omega_0) = R$ | Here R is the parallel resistance: admittance is real and minimum, so Z is real and maximum and the total current is minimum. |
| Quality factor and bandwidth | $Q = \frac{\omega_0 L}{R} = \frac{1}{\omega_0 C R}, \qquad BW = \frac{\omega_0}{Q} = \frac{R}{L}$ | Series RLC form. The resistor sets the loss: lower R means higher Q, a sharper peak and larger resonant voltage magnification. |
| Polar to rectangular conversion | $a + jb = \sqrt{a^2+b^2}\angle\arctan\!\left(\frac{b}{a}\right)$ | Watch the quadrant: for a negative real part add or subtract 180 degrees, since a plain arctan cannot distinguish 1-2j from -1+2j. |

## Worked Problems

### P1. A series circuit has $R = 30\ \Omega$, $L = 40\ \mathrm{mH}$ and $C = 25\ \mu\mathrm{F}$, driven by $120\ \mathrm{V}$ RMS at $60\ \mathrm{Hz}$. Find the total impedance, the current phasor, the voltage across each element, and the real power delivered.

**Given:** $R = 30\ \Omega$; $L = 40\ \mathrm{mH}$; $C = 25\ \mu\mathrm{F}$; $V_s = 120\ \mathrm{V}$ RMS; $f = 60\ \mathrm{Hz}$

**Solution:**

1. Angular frequency: $\omega = 2\pi(60) = 376.99\ \mathrm{rad/s}$.
2. $X_L = \omega L = 376.99(0.040) = 15.08\ \Omega$, so $Z_L = +j15.08\ \Omega$.
3. $X_C = \dfrac{1}{\omega C} = \dfrac{1}{376.99(25\times10^{-6})} = \dfrac{1}{9.4248\times10^{-3}} = 106.10\ \Omega$, so $Z_C = -j106.10\ \Omega$.
4. Series combination: $Z = 30 + j(15.08 - 106.10) = 30 - j91.02\ \Omega$.
5. Polar form: $|Z| = \sqrt{30^2 + 91.02^2} = \sqrt{900 + 8285} = \sqrt{9185} = 95.84\ \Omega$ and $\theta = \arctan(-91.02/30) = -71.77^\circ$.
6. Current: $\mathbf{I} = \dfrac{120\angle 0^\circ}{95.84\angle -71.77^\circ} = 1.252\angle +71.77^\circ\ \mathrm{A}$ (leading, as expected for a capacitive net reactance).
7. $\mathbf{V}_R = \mathbf{I}R = 1.252\angle 71.77^\circ(30) = 37.56\angle 71.77^\circ\ \mathrm{V}$.
8. $\mathbf{V}_L = \mathbf{I}Z_L = 1.252\angle 71.77^\circ \times 15.08\angle 90^\circ = 18.88\angle 161.77^\circ\ \mathrm{V}$.
9. $\mathbf{V}_C = \mathbf{I}Z_C = 1.252\angle 71.77^\circ \times 106.10\angle -90^\circ = 132.8\angle -18.23^\circ\ \mathrm{V}$.
10. KVL check in rectangular form: $\mathbf{V}_R + \mathbf{V}_L + \mathbf{V}_C = (11.74 + j35.68) + (-17.94 + j5.91) + (126.1 - j41.55) = 119.9 - j0.00\ \mathrm{V}$, recovering the $120\ \mathrm{V}$ source.
11. Real power: $P = I^2R = (1.252)^2(30) = 47.0\ \mathrm{W}$, and $P = V_sI\cos\theta = 120(1.252)\cos(-71.77^\circ) = 47.0\ \mathrm{W}$, matching.

> [!success]- Answer
> **$Z = 95.84\angle -71.77^\circ\ \Omega$; $\mathbf{I} = 1.25\angle 71.8^\circ\ \mathrm{A}$; $\mathbf{V}_R = 37.6\angle 71.8^\circ\ \mathrm{V}$, $\mathbf{V}_L = 18.9\angle 161.8^\circ\ \mathrm{V}$, $\mathbf{V}_C = 132.8\angle -18.2^\circ\ \mathrm{V}$; $P = 47.0\ \mathrm{W}$**

> [!warning] Trap
> Adding the element voltages as magnitudes, $37.56 + 18.88 + 132.8 = 189\ \mathrm{V}$, and declaring KVL violated. The phasors add as vectors, and $V_L$ and $V_C$ are $180^\circ$ apart, so they largely cancel. The capacitor voltage exceeding the $120\ \mathrm{V}$ source is not an error either — KVL holds on the phasors, and one element of a series branch can carry a larger voltage than the source whenever the reactive voltages nearly cancel.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×60 : Ans×0.04 : 1÷(376.991×25E-6)` → $\omega$ = **376.99** rad/s → $X_L$ = **15.08** Ω → $X_C$ = **106.10** Ω.
> 2. `SHIFT` `Pol(` `30` `,` `15.08−106.1` `)` → $\lvert \mathbf{Z} \rvert$ = **95.84** Ω in `X`, $\theta$ = **−71.77**° in `Y`.
> 3. `120÷95.84 : Ans²×30` → $\lvert \mathbf{I} \rvert$ = **1.252** A → $P$ = **47.0** W; the current angle is $0-(-71.77^\circ)$ = **+71.77**°, so $\mathbf{I} = 1.252\angle71.77^\circ$ A.
>
> One `Pol(` turns the series sum into polar form; the current angle is the source angle minus the impedance angle.

### P2. A $100\ \Omega$ resistor, a $50\ \mathrm{mH}$ inductor and a $20\ \mu\mathrm{F}$ capacitor are connected in parallel across a $10\ \mathrm{V}$ RMS source at $\omega = 1000\ \mathrm{rad/s}$. Find the total admittance and impedance, the source current, the three branch currents, and state whether the network is at resonance.

**Given:** $R = 100\ \Omega$; $L = 50\ \mathrm{mH}$; $C = 20\ \mu\mathrm{F}$; $V_s = 10\ \mathrm{V}$ RMS; $\omega = 1000\ \mathrm{rad/s}$; components in parallel

**Solution:**

1. Branch admittances, which add directly in parallel: $Y_R = \dfrac{1}{100} = 0.0100\ \mathrm{S}$.
2. $Y_L = \dfrac{1}{j\omega L} = -j\dfrac{1}{1000(0.050)} = -j0.0200\ \mathrm{S}$.
3. $Y_C = j\omega C = j(1000)(20\times10^{-6}) = +j0.0200\ \mathrm{S}$.
4. Total: $Y = 0.0100 + j(0.0200 - 0.0200) = 0.0100\ \mathrm{S}$, purely real, so the susceptance is zero.
5. $Z = 1/Y = 100\ \Omega$ at $0^\circ$ — real and equal to $R$ alone, which is the signature of parallel resonance at $\omega_0 = 1/\sqrt{LC} = 1/\sqrt{(0.05)(20\times10^{-6})} = 1000\ \mathrm{rad/s}$.
6. Source current: $\mathbf{I}_s = \mathbf{V}Y = 10(0.0100\angle 0^\circ) = 0.100\angle 0^\circ\ \mathrm{A}$, in phase with the source because the network is resistive.
7. Branch currents: $\mathbf{I}_R = \dfrac{10\angle 0^\circ}{100} = 0.100\angle 0^\circ\ \mathrm{A}$, $\mathbf{I}_L = \dfrac{10\angle 0^\circ}{50\angle 90^\circ} = 0.200\angle -90^\circ\ \mathrm{A}$, $\mathbf{I}_C = \dfrac{10\angle 0^\circ}{50\angle -90^\circ} = 0.200\angle +90^\circ\ \mathrm{A}$.
8. KCL check: $0.100 + (-j0.200) + (+j0.200) = 0.100\ \mathrm{A}$, exactly the source current, so the reactive currents circulate between $L$ and $C$ and never reach the source.
9. Power check: $P = V^2/R = 10^2/100 = 1.00\ \mathrm{W}$, $Q_L = I_L^2X_L = (0.2)^2(50) = 2.00\ \mathrm{VAR}$ inductive and $Q_C = 2.00\ \mathrm{VAR}$ capacitive, cancelling to $Q_{net} = 0$.

> [!success]- Answer
> **$Y = 0.0100\ \mathrm{S}$, $Z = 100\ \Omega\angle 0^\circ$; $\mathbf{I}_s = 0.100\angle 0^\circ\ \mathrm{A}$ with $\mathbf{I}_R = 0.100\ \mathrm{A}$, $\mathbf{I}_L = 0.200\angle -90^\circ\ \mathrm{A}$, $\mathbf{I}_C = 0.200\angle +90^\circ\ \mathrm{A}$; the network is at parallel resonance with $\omega_0 = 1000\ \mathrm{rad/s}$**

> [!warning] Trap
> Computing $|Y| = 0.01 + 0.02 + 0.02 = 0.05\ \mathrm{S}$ by adding magnitudes, which gives $|Z| = 20\ \Omega$ and a source current of $0.5\ \mathrm{A}$ — five times too large. Susceptances are signed: the capacitor's $+jB$ cancels the inductor's $-jB$, leaving only the conductance.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷100 : 1÷(1000×0.05) : 1000×20E-6 : 0.02−0.02` → $Y_R$ = **0.0100** S → $Y_L$ = **0.0200** S → $Y_C$ = **0.0200** S → net susceptance **0**.
> 2. `1÷0.01 : 10÷100 : 10÷50` → $\mathbf{Z}$ = **100** Ω at **0**° → $\mathbf{I}_R$ = **0.100** A → $\mathbf{I}_L = \mathbf{I}_C$ = **0.200** A.
>
> The susceptance collapsing to exactly 0 in the chain is the resonance test, and it pins $\omega_0 = 1000$ rad/s.

### P3. A source of $20\ \mathrm{V}$ RMS with an internal impedance of $50\ \Omega$ feeds a series $200\ \Omega$ resistor, which in turn connects to a load $Z_L = 100 + j50\ \Omega$. Find the phasor voltage across the load, its RMS magnitude, and the real power delivered to the load.

**Given:** $V_s = 20\ \mathrm{V}$ RMS at $0^\circ$; $Z_s = 50\ \Omega$; $R_1 = 200\ \Omega$; $Z_L = 100 + j50\ \Omega$

**Solution:**

1. Total series impedance: $Z_{tot} = 50 + 200 + (100 + j50) = 350 + j50\ \Omega$.
2. Polar form: $|Z_{tot}| = \sqrt{350^2 + 50^2} = \sqrt{122500 + 2500} = \sqrt{125000} = 353.55\ \Omega$, $\theta = \arctan(50/350) = 8.130^\circ$.
3. This is where the loaded divider bites: the load voltage is $\mathbf{V}_L = \mathbf{V}_s\dfrac{Z_L}{Z_s + R_1 + Z_L}$, not $\mathbf{V}_s\dfrac{Z_L}{R_1 + Z_L}$ — the source resistance also drops voltage.
4. Complex division: $\dfrac{Z_L}{Z_{tot}} = \dfrac{100 + j50}{350 + j50} = \dfrac{(100+j50)(350-j50)}{350^2+50^2} = \dfrac{37500 + j12500}{125000} = 0.3000 + j0.1000$.
5. Convert to polar: $|0.3 + j0.1| = \sqrt{0.09 + 0.01} = \sqrt{0.10} = 0.3162$ and $\angle = \arctan(0.1/0.3) = 18.435^\circ$.
6. $\mathbf{V}_L = 20(0.3162\angle 18.435^\circ) = 6.325\angle 18.43^\circ\ \mathrm{V}$ RMS, so $|\mathbf{V}_L| = 6.33\ \mathrm{V}$.
7. Load current: $\mathbf{I} = \dfrac{\mathbf{V}_L}{Z_L} = \dfrac{6.325\angle 18.435^\circ}{111.80\angle 26.565^\circ} = 0.05657\angle -8.13^\circ\ \mathrm{A}$.
8. Real power in the load: $P = I^2R_L = (0.05657)^2(100) = 0.3200\ \mathrm{W}$.
9. Cross-check by the divider shortcut $P = V_s^2\dfrac{R_L}{|Z_{tot}|^2} = \dfrac{400(100)}{125000} = 0.320\ \mathrm{W}$ — identical, confirming both the ratio and the power.

> [!success]- Answer
> **$\mathbf{V}_L = 6.33\angle 18.4^\circ\ \mathrm{V}$ RMS, and the load absorbs $P = 0.320\ \mathrm{W}$**

> [!warning] Trap
> Ignoring the $50\ \Omega$ source resistance and computing $20\cdot\frac{100+j50}{300+j50}$, which gives $7.35\angle 17.1^\circ\ \mathrm{V}$ and $P = V_s^2R_L/|300+j50|^2 = 0.432\ \mathrm{W}$ — $35\%$ more than the correct $0.320\ \mathrm{W}$. Every impedance between the source and the load belongs in the denominator of the divider, and the load voltage is complex even though the source phase is zero.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(100×350+50×50)÷(350²+50²) : (50×350−100×50)÷(350²+50²)` → **0.3000** → **0.1000**, the complex ratio $\mathbf{Z}_L/\mathbf{Z}_{tot}$.
> 2. `20×0.3 : 20×0.1` → $\mathbf{V}_L = 6.00 + j2.00$ V rms.
> 3. `SHIFT` `Pol(` `6` `,` `2` `)` → $\lvert \mathbf{V}_L \rvert$ = **6.325** V at **18.43**°; `400×100÷(350²+50²)` → $P$ = **0.3200** W.
>
> `(ac+bd)÷(c²+d²)` and `(bc−ad)÷(c²+d²)` is complex division on one line, and $\lvert \mathbf{Z}_{tot} \rvert^2 = 125000$ is the same denominator the power shortcut needs.

### P4. Reduce the network $Z_1 = 30\ \Omega$ in series with the parallel combination of $Z_2 = 40\ \Omega$ and $Z_3 = 80 + j60\ \Omega$. The whole combination is driven by $215\ \mathrm{V}$ RMS. Find the equivalent impedance, the source current, the voltage across the parallel pair, and the real power in $Z_2$.

**Given:** $Z_1 = 30\ \Omega$; $Z_2 = 40\ \Omega$; $Z_3 = 80 + j60\ \Omega$; $V_s = 215\ \mathrm{V}$ RMS; $Z_1$ series with $(Z_2 \parallel Z_3)$

**Solution:**

1. Convert the polar-ready value: $Z_3 = 80 + j60 = 100\angle 36.87^\circ\ \Omega$ (a 3-4-5 triangle).
2. Parallel combination: $Z_{2\|3} = \dfrac{(40)(100\angle 36.87^\circ)}{40 + 80 + j60} = \dfrac{4000\angle 36.87^\circ}{120 + j60}$.
3. Denominator in polar: $|120 + j60| = \sqrt{14400 + 3600} = \sqrt{18000} = 134.16\ \Omega$ at $\arctan(60/120) = 26.565^\circ$.
4. $Z_{2\|3} = \dfrac{4000}{134.16}\angle(36.87^\circ - 26.565^\circ) = 29.81\angle 10.305^\circ\ \Omega$.
5. Back to rectangular: $29.81\cos 10.305^\circ + j29.81\sin 10.305^\circ = 29.33 + j5.33\ \Omega$.
6. Total: $Z_{eq} = 30 + 29.33 + j5.33 = 59.33 + j5.33\ \Omega$, with $|Z_{eq}| = \sqrt{3520 + 28.4} = \sqrt{3548} = 59.57\ \Omega$ and $\angle = \arctan(5.33/59.33) = 5.13^\circ$.
7. Source current: $\mathbf{I}_s = \dfrac{215\angle 0^\circ}{59.57\angle 5.13^\circ} = 3.609\angle -5.13^\circ\ \mathrm{A}$.
8. Voltage across the pair: $\mathbf{V}_p = \mathbf{I}_s Z_{2\|3} = 3.609\angle -5.13^\circ \times 29.81\angle 10.305^\circ = 107.6\angle 5.17^\circ\ \mathrm{V}$.
9. Current through $Z_2$: $\mathbf{I}_2 = \dfrac{\mathbf{V}_p}{Z_2} = \dfrac{107.6\angle 5.17^\circ}{40\angle 0^\circ} = 2.690\angle 5.17^\circ\ \mathrm{A}$.
10. Real power in $Z_2$: $P = I_2^2R_2 = (2.690)^2(40) = 289.4\ \mathrm{W}$.
11. Check by voltage division instead: $\mathbf{V}_p = 215\cdot\dfrac{29.81\angle 10.305^\circ}{59.57\angle 5.13^\circ} = 215(0.5004\angle 5.17^\circ) = 107.6\angle 5.17^\circ\ \mathrm{V}$, matching, and dividing out the source current confirms $|\mathbf{V}_p|/|Z_{2\|3}| = 107.6/29.81 = 3.610\ \mathrm{A} = |\mathbf{I}_s|$.

> [!success]- Answer
> **$Z_{eq} = 59.57\angle 5.13^\circ\ \Omega$; $\mathbf{I}_s = 3.61\angle -5.13^\circ\ \mathrm{A}$; $\mathbf{V}_p = 107.6\angle 5.2^\circ\ \mathrm{V}$; $P_{Z_2} = 289\ \mathrm{W}$**

> [!warning] Trap
> Forming the parallel combination as $\dfrac{Z_2Z_3}{Z_2+Z_3}$ but adding the *magnitudes* in the denominator, $40 + 100 = 140\ \Omega$, instead of the complex sum $120 + j60$. That error gives $Z_{2\|3} = 28.6\angle 36.9^\circ$, which is badly wrong in phase, so the final voltage angle and every downstream division are wrong even though the magnitude looks plausible.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(3200×120+2400×60)÷(120²+60²) : (2400×120−3200×60)÷(120²+60²)` → **29.33** → **5.333**, so $\mathbf{Z}_2 \parallel \mathbf{Z}_3 = 29.33 + j5.33$ Ω.
> 2. `SHIFT` `Pol(` `59.33` `,` `5.333` `)` → $\lvert \mathbf{Z}_{eq} \rvert$ = **59.57** Ω, $\theta$ = **5.13**°; then `215÷X` → $\lvert \mathbf{I}_s \rvert$ = **3.609** A.
> 3. `3.6093×29.81 : Ans÷40 : Ans²×40` → $\lvert \mathbf{V}_p \rvert$ = **107.6** V → $I_2$ = **2.690** A → $P_{Z_2}$ = **289.4** W.
>
> `215÷X` reads the magnitude `Pol(` left in `X`; the pair voltage is $\lvert \mathbf{I}_s \rvert$ times 29.81, not the source current times 40.

### P5. A series circuit has $R = 10\ \Omega$, $L = 100\ \mathrm{mH}$ and $C = 10\ \mu\mathrm{F}$, driven by $12\ \mathrm{V}$ RMS. Find the resonant frequency, the current at resonance, the quality factor and bandwidth, and the inductor voltage at $\omega = 800\ \mathrm{rad/s}$.

**Given:** $R = 10\ \Omega$; $L = 100\ \mathrm{mH}$; $C = 10\ \mu\mathrm{F}$; $V_s = 12\ \mathrm{V}$ RMS; second frequency: $\omega = 800\ \mathrm{rad/s}$

**Solution:**

1. $LC = (0.100)(10\times10^{-6}) = 1.0\times10^{-6}\ \mathrm{s}^2$, so $\omega_0 = \dfrac{1}{\sqrt{1.0\times10^{-6}}} = 1000\ \mathrm{rad/s}$.
2. At $\omega_0$ the reactances are $X_L = 1000(0.100) = 100\ \Omega$ and $X_C = \dfrac{1}{1000(10^{-5})} = 100\ \Omega$; they cancel exactly, leaving $Z = R = 10\ \Omega$ at $0^\circ$.
3. Current at resonance: $\mathbf{I} = \dfrac{12\angle 0^\circ}{10} = 1.200\angle 0^\circ\ \mathrm{A}$, real and maximum.
4. Quality factor: $Q = \dfrac{\omega_0 L}{R} = \dfrac{100}{10} = 10.0$ (equivalently $\dfrac{1}{\omega_0CR} = \dfrac{1}{1000(10^{-5})(10)} = 10$).
5. Bandwidth: $BW = \dfrac{\omega_0}{Q} = \dfrac{1000}{10} = 100\ \mathrm{rad/s}$, so the half-power points sit at 950 and 1050 rad/s.
6. Voltage magnification check: $V_L = V_C = QV_s = 10(12) = 120\ \mathrm{V}$, ten times the source voltage, with $Q_L$ and $Q_C$ cancelling.
7. Now at $\omega = 800\ \mathrm{rad/s}$: $X_L = 80\ \Omega$ and $X_C = \dfrac{1}{800(10^{-5})} = 125\ \Omega$, so $Z = 10 + j(80 - 125) = 10 - j45\ \Omega$.
8. Off-resonance current: $|Z| = \sqrt{100 + 2025} = 46.10\ \Omega$ at $-77.47^\circ$, so $\mathbf{I} = \dfrac{12}{46.10\angle -77.47^\circ} = 0.2603\angle 77.47^\circ\ \mathrm{A}$.
9. Inductor voltage: $|\mathbf{V}_L| = |\mathbf{I}|X_L = 0.2603(80) = 20.83\ \mathrm{V}$ at angle $77.47^\circ + 90^\circ = 167.47^\circ$, i.e. $\mathbf{V}_L = 20.8\angle 167.5^\circ\ \mathrm{V}$.
10. Note that the current fell from $1.200\ \mathrm{A}$ to $0.260\ \mathrm{A}$ for only a $20\%$ move in frequency — the signature of a high-Q resonant circuit.

> [!success]- Answer
> **$\omega_0 = 1000\ \mathrm{rad/s}$ ($f_0 = 159.2\ \mathrm{Hz}$), $\mathbf{I}_0 = 1.20\ \mathrm{A}$, $Q = 10.0$, $BW = 100\ \mathrm{rad/s}$; at $\omega = 800\ \mathrm{rad/s}$, $\mathbf{I} = 0.260\angle 77.5^\circ\ \mathrm{A}$ and $\mathbf{V}_L = 20.8\angle 167.5^\circ\ \mathrm{V}$**

> [!warning] Trap
> Claiming $X_L$ and $X_C$ must be zero at resonance, or that a resonant circuit has maximum impedance. In a *series* circuit the reactances are equal but $100\ \Omega$ each, they cancel as vectors, and the impedance is *minimum* and purely resistive — which is why the current peaks and why $V_L$ and $V_C$ reach $Q$ times the source voltage.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(1÷(0.1×10E-6)) : 1000×0.1÷10 : 1000÷10` → $\omega_0$ = **1000** rad/s → $Q$ = **10.0** → $BW$ = **100** rad/s.
> 2. `800×0.1 : 1÷(800×10E-6)` → $X_L$ = **80** Ω → $X_C$ = **125** Ω; `SHIFT` `Pol(` `10` `,` `80−125` `)` → $\lvert \mathbf{Z} \rvert$ = **46.10** Ω at **−77.47**°.
> 3. `12÷46.10 : Ans×80` → $\lvert \mathbf{I} \rvert$ = **0.2603** A → $\lvert \mathbf{V}_L \rvert$ = **20.83** V, at $77.47^\circ + 90^\circ$ = **167.5**°.
>
> The current angle is $-(-77.47^\circ) = +77.47^\circ$, and multiplying by $jX_L$ adds another $90^\circ$.

## Traps & Exam Notes

- **Adding magnitudes instead of phasors.** Series element voltages and parallel branch currents are phasors: $37.6\ \mathrm{V}$, $18.9\ \mathrm{V}$ and $132.8\ \mathrm{V}$ across a series RLC do not sum to the $120\ \mathrm{V}$ source, and $0.1\ \mathrm{A}$, $0.2\ \mathrm{A}$, $0.2\ \mathrm{A}$ of parallel branch current do not sum to the source current unless the $90^\circ$ signs are carried. Convert to rectangular, add, then convert back.
- **Using a voltage divider while ignoring the load or source impedance.** The divider is $\mathbf{V}_{out} = \mathbf{V}_{s}Z_{out}/(Z_1+Z_{out})$ with $Z_{out}$ the *actual* impedance at the output node — usually the load in parallel with a divider resistor. Omitting the source resistance or the paralleled load produces a plausible magnitude with the wrong phase.
- **Dropping the minus sign on $Z_C$, or using $X_L = L/\omega$.** The capacitor's impedance is $-j/(\omega C)$ and its reactance is $1/(\omega C)$; a positive $X_C$ flips the sign of the net reactance, which converts a lagging circuit into a leading one and ruins every angle in the answer.
- **Treating DC intuition as still valid at $\omega \ne 0$.** An inductor is not a short and a capacitor is not an open except at DC. Their impedances at $377\ \mathrm{rad/s}$ are $377L$ and $1/(377C)$, which are often comparable to the resistances and always in quadrature with them.
- **Mixing RMS and peak phasor conventions.** A phasor of $120\angle 0^\circ$ means $120\ \mathrm{V}$ RMS only if every other phasor in the solution is RMS too. Mixing the two scales arbitrary factors of $\sqrt{2}$ into currents, powers and impedances simultaneously.
- **Quoting $\omega_0 = 1/\sqrt{LC}$ for any network containing $L$ and $C$.** That formula is exact only for the simple series loop or the single-node parallel combination. Add a series resistance to a parallel tank or a second branch, and the true resonance is where the total susceptance (or reactance) vanishes — derive it instead of quoting it.
- **Reporting a phasor as the final answer.** A phasor is a frozen snapshot at one frequency; $\mathbf{I} = 1.25\angle 71.8^\circ\ \mathrm{A}$ is only meaningful once converted to $i(t) = 1.77\cos(377t + 71.8^\circ)\ \mathrm{A}$ in the peak convention or $1.25\sqrt{2}\cos(\cdot)$ from the RMS convention. The phase must also be stated in the units the question expects.
- **Forgetting the $j$ when multiplying into an element.** $\mathbf{V}_L = \mathbf{I}Z_L$ with $Z_L = j\omega L$ carries a $+90^\circ$ rotation that $\mathbf{V}_R = \mathbf{I}R$ does not. Multiplying by the bare reactance number and dropping the $j$ keeps the magnitude right and the angle wrong, which is the hardest kind of error to spot.

## See Also

- [[02_Phasors_and_Complex_Impedance]]
- [[07_Series_Resonance]]
- [[04_AC_Thevenin,_Norton_and_Max_Power]]
- [[05_AC_Power,_PQS_and_Triangle]]

---

[[02_Phasors_and_Complex_Impedance|⬅ 02]] · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[04_AC_Thevenin,_Norton_and_Max_Power|04 ➡]]
