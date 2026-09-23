---
id: MATH-06-13
title: "Lead-Lag Compensator Design"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 13
tier: 2
depth: full
problem_count: 5
prereqs: ["[[10_Bode_Plots_and_Margins]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — Lead-Lag Compensator Design

> [!abstract] Scope
> Design a lead or lag network to add phase margin or low-frequency gain, using the maximum-phase-lead formulas and the placement rules for each.

## Core Concept

> [!tip] Intuition
> A lead network is a frequency-dependent gain boost with a phase peak: it lifts the magnitude where the loop crosses over and pushes the phase up with it. A lag network is the opposite trade — it keeps the low-frequency gain high for accuracy while cutting the gain at crossover so the existing phase margin survives.

**Lead network.** $G_c(s)=\dfrac{1+\tau s}{1+\alpha\tau s}$ with $0<\alpha<1$: a zero at $-1/\tau$ and a pole at $-1/(\alpha\tau)$, so the zero comes first and the magnitude rises. Its maximum phase is:
$$\phi_m=\arcsin\dfrac{1-\alpha}{1+\alpha}$$
The peak occurs at the geometric mean of the two break frequencies, $\omega_m=\dfrac{1}{\tau\sqrt{\alpha}}$, and at that frequency the network contributes a magnitude boost of $\dfrac{1}{\sqrt{\alpha}}$ (that is $10\log_{10}(1/\alpha)$ dB).

**The lead design procedure.** (1) From the uncompensated system, read the existing phase margin at its gain crossover. (2) Decide the additional phase required:
$$\phi_m = PM_{required} - PM_{existing} + \phi_{margin}$$
where the $5^\circ$-$10^\circ$ safety margin covers the fact that adding a lead raises the crossover frequency, where the uncompensated phase is already worse. (3) Convert:
$$\alpha=\dfrac{1-\sin\phi_m}{1+\sin\phi_m}$$
(4) Because the lead adds $10\log_{10}(1/\alpha)$ dB at $\omega_m$, place $\omega_m$ at the frequency where the uncompensated magnitude is $-10\log_{10}(1/\alpha)$ dB — then the compensated gain crossover lands exactly at $\omega_m$ and realises the designed phase. (5) Set $\tau=\dfrac{1}{\omega_m\sqrt{\alpha}}$, add the compensator gain needed to restore the original low-frequency gain, and verify.

**Lag network.** $G_c(s)=\dfrac{1+\tau s}{1+\beta\tau s}$ with $\beta>1$: a pole at $-1/(\beta\tau)$ and a zero at $-1/\tau$, so the pole comes first and the magnitude falls, reaching an attenuation of $1/\beta$ at high frequency. Its DC gain is 1, so a lag network by itself improves nothing — the design trick is to *multiply the loop gain by $\beta$* and let the lag network cancel that increase above the crossover. Net effect: low-frequency (and hence $K_v$) gain up by $\beta$, crossover and phase margin essentially unchanged.

**Placing the lag.** Put the zero at least a decade below the compensated gain crossover ($\omega_z\approx0.1\,\omega_c$) and the pole a decade below the zero ($\omega_p=\omega_z/\beta$). That keeps the network's own phase lag (worst case about $-5^\circ$ near the zero) far from the crossover, so the existing phase margin survives. A lag network placed too close to crossover is just a badly designed lead.

**Choosing between them.** Poor transient response (low phase margin, large overshoot) with acceptable steady-state error calls for a **lead**. Acceptable transient response with excessive steady-state error calls for a **lag** (or its controller form, PI). Both at once usually needs lead-lag. The cost of lead is a wider bandwidth — more noise transmission and more excitation of unmodelled high-frequency dynamics. The cost of lag is slower settling and sensitivity to low-frequency drift.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Lead compensator | $G_c(s) = \frac{1+\tau s}{1+\alpha\tau s},\quad 0<\alpha<1$ | Zero before pole. DC gain 1, high-frequency gain 1/alpha. |
| Lag compensator | $G_c(s) = \frac{1+\tau s}{1+\beta\tau s},\quad \beta>1$ | Pole before zero. DC gain 1, high-frequency gain 1/beta. |
| Maximum lead phase | $\phi_m = \arcsin\frac{1-\alpha}{1+\alpha}$ | Less than 90 degrees; a 60-degree lead needs alpha = 0.072. |
| Alpha from required phase | $\alpha = \frac{1-\sin\phi_m}{1+\sin\phi_m}$ | Design equation: phase requirement in, alpha out. |
| Frequency of maximum lead | $\omega_m = \frac{1}{\tau\sqrt{\alpha}}$ | Geometric mean of the zero at 1/tau and the pole at 1/(alpha tau). |
| Magnitude at maximum lead | $\lvert G_c(j\omega_m) \rvert = \frac{1}{\sqrt{\alpha}}$ | Equals 10log10(1/alpha) dB; this is the boost that moves the crossover. |
| Lead phase at any frequency | $\phi(\omega) = \arctan(\omega\tau) - \arctan(\alpha\omega\tau)$ | Zero phase minus pole phase; positive everywhere for alpha < 1. |
| Lag attenuation at high frequency | $\frac{1}{\beta}\ \mathrm{at}\ \omega\gg 1/\tau$ | Compensate by multiplying the loop gain by beta to preserve Kv. |
| Lag pole and zero placement | $\omega_z = \frac{1}{\tau} \approx 0.1\,\omega_c,\quad \omega_p = \frac{1}{\beta\tau}$ | Zero a decade below crossover, pole a decade below the zero. |
| Required maximum lead phase | $\phi_m = PM_{req} - PM_{existing} + (5^\circ\ \mathrm{to}\ 10^\circ)$ | The margin covers the crossover shift caused by the lead's own magnitude boost. |
| Gain adjustment | $K_c = \frac{1}{\lvert G_c(j\omega_c) \rvert}$ | Restore the loop gain after the compensator changes the magnitude. |

## Worked Problems

### P1. A lead compensator must supply a maximum phase of $40^\circ$. Find $\alpha$ and the magnitude boost it provides at $\omega_m$.

**Given:** phi_m = 40 degrees

**Solution:**

1. $\sin 40^\circ = 0.6428$
2. $\alpha = \dfrac{1-0.6428}{1+0.6428} = \dfrac{0.3572}{1.6428} = 0.2174$
3. $\lvert G_c(j\omega_m) \rvert = 1/\sqrt{0.2174} = 1/0.4663 = 2.145$
4. In dB: $20\log_{10}2.145 = 6.63\ \mathrm{dB}$

> [!success]- Answer
> **$\alpha = 0.217$, boost $2.145$ (6.63 dB) at $\omega_m$.**

> [!warning] Trap
> Using $\alpha = \dfrac{1+\sin\phi_m}{1-\sin\phi_m} = 4.60$, which is the lag form ($\beta>1$). A lead requires $\alpha<1$; if your answer is greater than one, you inverted the ratio.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Deg: `sin(40)` → **0.6428**, then `(1−Ans)÷(1+Ans)` → $\alpha=$ **0.2174** — below 1, which is what makes it the lead form.
> 2. `1÷√0.2174` → the boost **2.145** → `20×log(Ans)` → **6.63** dB at $\omega_m$.

### P2. An uncompensated loop has a phase margin of $20^\circ$ at its gain crossover and the specification is $PM\ge50^\circ$. Find the required maximum lead phase, $\alpha$, the boost, and the frequency at which to place $\omega_m$.

**Given:** PM existing = 20 degrees; PM required = 50 degrees; 5 degree safety margin

**Solution:**

1. $\phi_m = 50^\circ - 20^\circ + 5^\circ = 35^\circ$
2. $\sin35^\circ = 0.5736$
3. $\alpha = \dfrac{1-0.5736}{1+0.5736} = \dfrac{0.4264}{1.5736} = 0.271$
4. Boost $= 1/\sqrt{0.271} = 1.921$
5. In dB: $20\log_{10}1.921 = 5.67\ \mathrm{dB}$
6. Place $\omega_m$ where the uncompensated magnitude is $-5.67\ \mathrm{dB}$; after the boost the new crossover sits at $\omega_m$ and the designed $35^\circ$ is realised there

> [!success]- Answer
> **$\phi_m = 35^\circ$, $\alpha = 0.271$, boost $5.67\ \mathrm{dB}$, with $\omega_m$ at the uncompensated $-5.67\ \mathrm{dB}$ point.**

> [!warning] Trap
> Designing for exactly $30^\circ$ and ignoring the crossover shift. The lead raises the crossover into a region of greater uncompensated phase lag, so the achieved phase margin falls short of $20^\circ+30^\circ$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `50−20+5 : sin(Ans)` → $\phi_m=$ **35°** → **0.5736**, then `(1−Ans)÷(1+Ans)` → $\alpha=$ **0.271**.
> 2. `1÷√0.271` → the boost **1.921** → `20×log(Ans)` → **5.67** dB, so $\omega_m$ is placed where the uncompensated magnitude is **-5.67** dB.

### P3. A compensator is $G_c(s)=\dfrac{1+0.5s}{1+0.05s}$. Identify its type, find $\alpha$ or $\beta$, $\omega_m$, the maximum phase and the magnitude there.

**Given:** Gc(s) = (1+0.5s)/(1+0.05s)

**Solution:**

1. Match to $\dfrac{1+\tau s}{1+\alpha\tau s}$: $\tau = 0.5$ and $\alpha\tau = 0.05$
2. $\alpha = 0.05/0.5 = 0.1 < 1$, so this is a lead network
3. $\omega_m = \dfrac{1}{\tau\sqrt{\alpha}} = \dfrac{1}{0.5(0.3162)} = \dfrac{1}{0.1581} = 6.32\ \mathrm{rad/s}$
4. $\phi_m = \arcsin\dfrac{1-0.1}{1+0.1} = \arcsin0.8182 = 54.9^\circ$
5. $\lvert G_c(j\omega_m) \rvert = 1/\sqrt{0.1} = 3.162$, i.e. $10\ \mathrm{dB}$

> [!success]- Answer
> **Lead network, $\alpha=0.1$, $\omega_m = 6.32\ \mathrm{rad/s}$, $\phi_m = 54.9^\circ$, boost $3.162$ (10 dB).**

> [!warning] Trap
> Reporting $\omega_m$ as the geometric mean of 2 and 20 (the break frequencies $1/\tau$ and $1/(\alpha\tau)$) without converting: the geometric mean is indeed $\sqrt{2\times20} = 6.32$, but students who average them arithmetically get 11 rad/s.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.05÷0.5` → $\alpha=$ **0.1** — below 1, so this is a lead network; `1÷(0.5×√0.1)` → $\omega_m=$ **6.32** rad/s.
> 2. Deg: `sin⁻¹((1−0.1)÷(1+0.1))` → $\phi_m=$ **54.9°**; `1÷√0.1` → the boost **3.162** → `20×log(Ans)` → **10.0** dB.

### P4. A type-0 plant has acceptable transient response but $K_v$ is a factor of 10 too small. Design a lag compensator with the crossover at $\omega_c = 2\ \mathrm{rad/s}$ that multiplies $K_v$ by 10 without disturbing the phase margin.

**Given:** crossover = 2 rad/s; need Kv x10; transient response acceptable

**Solution:**

1. Requirement: $\beta = 10$ (the lag will attenuate by 20 dB above the zero, so multiply the loop gain by 10 to keep the crossover where it is)
2. Zero: one decade below crossover $\Rightarrow \omega_z = 0.2\ \mathrm{rad/s}$, so $\tau = 1/0.2 = 5\ \mathrm{s}$
3. Pole: $\omega_p = \omega_z/\beta = 0.02\ \mathrm{rad/s}$, so $\beta\tau = 1/0.02 = 50\ \mathrm{s}$
4. $G_c(s) = \dfrac{1+5s}{1+50s}$
5. The network's own phase lag at 2 rad/s is $\arctan(10) - \arctan(100) = 84.3^\circ - 89.4^\circ = -5.1^\circ$, small enough to leave the margin essentially intact
6. Loop gain is multiplied by 10, restoring the original crossover

> [!success]- Answer
> **$G_c(s)=\dfrac{1+5s}{1+50s}$ with the loop gain raised by 10; $K_v$ rises by 10 while the crossover stays near 2 rad/s.**

> [!warning] Trap
> Fitting the lag without raising the loop gain. The lag's DC gain is 1, so on its own it *reduces* $K_v$ at crossover and buys nothing; the gain must be multiplied by $\beta$ separately.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2÷10 : 1÷Ans : 10×Ans` → $\omega_z=$ **0.2** rad/s → $\tau=$ **5** s → $\beta\tau=$ **50** s, so $G_c(s)=\dfrac{1+5s}{1+50s}$ with the loop gain raised by **10**.
> 2. Deg: `tan⁻¹(2×5)−tan⁻¹(2×50)` → $84.29°-89.43°=$ **-5.14°**, the network's own phase at the 2 rad/s crossover — small enough to leave the margin intact.

### P5. A plant has a steady-state error specification it fails badly, but its step response is well damped. Another plant meets its error specification but overshoots $45\%$. Which compensator for each, and what is the main cost in each case?

**Given:** plant 1: error too large, transient fine; plant 2: transient poor, error fine

**Solution:**

1. Plant 1: raise the low-frequency gain without moving the crossover $\Rightarrow$ lag compensator (or PI)
2. Cost for plant 1: slower settling and greater sensitivity to low-frequency drift; the lag adds a little phase lag near the zero
3. Plant 2: add phase at the crossover to raise the phase margin $\Rightarrow$ lead compensator
4. Cost for plant 2: a wider bandwidth, so more sensor noise passes to the actuator and unmodelled high-frequency dynamics are excited

> [!success]- Answer
> **Plant 1 needs a lag (accuracy without disturbing the margin); plant 2 needs a lead (phase margin, at the price of bandwidth).**

> [!warning] Trap
> Reaching for a lead whenever the response is bad. A lead raises the crossover frequency, which *worsens* the steady-state error for a given loop gain — it fixes damping, not accuracy.

## Traps & Exam Notes

- **Inverting the alpha/beta formula.** Lead needs $\alpha=\dfrac{1-\sin\phi_m}{1+\sin\phi_m}<1$; lag needs $\beta>1$. If the computed value is on the wrong side of 1, you used the wrong branch.
- **Forgetting the crossover shift.** The lead's own $10\log(1/\alpha)$ dB boost makes the compensated phase margin smaller than designed unless a $5^\circ$-$10^\circ$ safety margin is built in and $\omega_m$ is placed at the uncompensated $-10\log(1/\alpha)$ dB point.
- **Designing a lag without multiplying the loop gain by beta.** The lag network has unity DC gain; the accuracy improvement comes from the restored gain, not from the network.
- **Placing the lag zero near the crossover.** Lag phase lag near crossover destroys the margin. Keep the zero at least a decade below $\omega_c$.
- **Using $\omega_m$ as the arithmetic mean of the break frequencies.** It is the geometric mean, $1/(\tau\sqrt{\alpha})$.
- **Asking a single lead for more than about $60^\circ$.** $\alpha$ becomes very small, the boost becomes very large and the crossover shift makes the design self-defeating; use two cascaded leads or a lead-lag.
- **Confusing the zero and pole order.** Lead: zero at $-1/\tau$ before the pole at $-1/(\alpha\tau)$. Lag: pole before zero. Reversing the order turns one into the other.
- **Ignoring the bandwidth cost of lead.** A higher crossover means more noise, more actuator activity and more sensitivity to unmodelled dynamics — the compensator is not free.

## See Also

- [[10_Bode_Plots_and_Margins]]
- [[12_PID_Controllers_and_Tuning]]
- [[09_Root_Locus_Techniques]]

---

[[12_PID_Controllers_and_Tuning|⬅ 12]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[14_State_Space_Representation_Basics|14 ➡]]
