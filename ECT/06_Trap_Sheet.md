---
title: Trap Sheet — Read Immediately Before Entering
type: checklist
updated: 2026-10-18
---

# 06 — Trap Sheet

Last 30 minutes. Nothing new here — only the things that cost points.

## Read the marking, not the component

- **Resistor:** last band = multiplier, digits are digits. `brown black red` = **10 ×100 = 1 kΩ**, not 102 Ω.
- **5-band:** third band is a **digit**, not the multiplier.
- **SMD:** last digit = **number of zeros**. `103` = 10 kΩ, `223` = 22 kΩ.
- **Capacitor:** 3 digits are **pF**: `104` = 0.1 µF, `103` = 10 nF, `474` = 0.47 µF.
- **Capacitors add in parallel** — the reverse of resistors. Series caps combine product-over-sum.
- **Diode band = CATHODE.** Current flows anode → cathode, i.e. *towards* the band.
- **Zener** conducts normally in **reverse** at $V_Z$; it is not a rectifier.

## Polarity and pinouts

- **NPN arrow points out** ("Not Pointing iN"). **PNP arrow points in.**
- **2N3904 (TO-92) = E B C**; **BC547 (TO-92) = C B E**; **TO-220 = B C E**, tab = collector.
- **Electrolytic:** stripe = **negative**.
- **DIP pin 1** = notch/dot, then **counter-clockwise**.

## Instruments

- Voltmeter **parallel**, ammeter **series** (in parallel it is a short — it kills the meter).
- Ohmmeter and megger only on a **dead, discharged** circuit.
- Meter loading: an **analog** 20 000 Ω/V meter on a 10 V range is only 200 kΩ — it pulls a high-impedance node down. DMM is 10 MΩ.
- **×10 probe**: multiply the screen reading by **10**.
- Scope: $V = \text{div} \times \text{V/div}$, $T = \text{div} \times \text{time/div}$, $f = 1/T$.
- **XY / Lissajous:** $f_Y/f_X$ = (touches on top) : (touches on side). Straight line **negative** slope = **180°**; positive = 0°; circle = 90°. Phase from an ellipse: $\sin\phi = \dfrac{\text{vertical intercept}}{\text{amplitude}}$.
- **Average-responding** meters read **10% low on a square wave**, 4% low on a triangle. Only a sine is correct.
- **ESR meter**, not a capacitance meter, finds a dried electrolytic.

## Machines

- $N_s = 120f/P$. $f = 60$ Hz, $P = 4$ → **1800 rpm**; it runs slower — slip is normal, never zero.
- **Series DC motor never runs unloaded** — it overspeeds to destruction.
- Induction torque ∝ **V²**: a 10% voltage sag costs ~19% torque.
- Transformer: voltage steps **down** when turns step down; **current steps up**. $V_p/V_s = N_p/N_s = I_s/I_p$.
- **Never open a CT's secondary** while energised.
- VFD keeps **V/f constant**; star-delta cuts starting current and torque to **1/3**.
- Full-wave ripple frequency = **2f** = 120 Hz on 60 Hz.
- Motor hums, will not start → **start capacitor**, then centrifugal switch.

## Services and safety

- **Good joint** = bright **concave fillet** wetting both surfaces. Cold = dull, grainy, intermittent.
- 60/40 solder melts **183 °C**; lead-free **~217 °C**.
- Wrist strap = **1 MΩ**, not zero.
- **Let-go** current 10–16 mA; **fibrillation** 50–100 mA.
- Microwave HV capacitor and CRT flyback hold charge **after unplugging** — discharge through a resistor.
- Half-split: 16 stages need **4** measurements.

## Laws — the free points

- **PEC (Electrical Code)** → Board of **Electrical** Engineering.
- **Philippine Electronics Code** → Board of **Electronics** Engineering, under **RA 9292 §§7 and 39**, effective **15 days** after publication.
- **PECE only** signs and seals. Not ECE, not ECT, not the most senior person present.
- ECT scope is the word **non-engineering** — no design, no consulting, no sealing, no matter the experience.
- Passing **70%**; removal **60–70%** if the majority was passed; results within **15 days**.
- Penalty: **₱100,000–₱1,000,000**, or **6 months–6 years**, or both.
- A **corporation cannot be licensed** — the licence is personal.
- **GFCI ≈ 5 mA**. Voltage drop **3%** branch / **5%** total. **#12 = 20 A**.

## Paper discipline

- **Answer every item.** No penalty for a wrong guess; a blank is a guaranteed zero.
- Check the **prefix in the answer choices** — half the traps are correct number, wrong unit.
- Skip anything over 90 seconds and come back. Mark it, do not agonise.
- Do the **Laws items first** if they appear — they are recall, finish them while fresh, then spend the time on computation.
