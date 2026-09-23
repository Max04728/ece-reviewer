---
id: ECE-02-06
title: "Power Factor and Correction"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_AC_Power,_PQS_and_Triangle]]", "[[02_Phasors_and_Complex_Impedance]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Power Factor and Correction

> [!abstract] Scope
> How do you compute a load's power factor, tell lagging from leading, and size the parallel capacitor that raises it to a target value?

## Core Concept

> [!tip] Intuition
> Only the component of current in phase with the voltage delivers net energy; the quadrature component merely shuttles energy in and out of the load's magnetic or electric field. Power factor is the fraction of the current phasor that does useful work, so a low power factor forces the utility to push a large current through the lines to deliver a modest real power. A parallel capacitor supplies the quadrature component locally, so the line current shrinks while the real power stays exactly where it was.

**Power factor as the cosine of the load angle.** For a sinusoidal single-phase load, $PF = \cos\theta$ where $\theta$ is the angle by which the current lags or leads the voltage, and equivalently $PF = P/S$ with $P$ the real power in watts and $S = V_{rms}I_{rms}$ the apparent power in volt-amperes. The current phasor splits into an in-phase component $I\cos\theta$, which is the only part that delivers net energy, and a quadrature component $I\sin\theta$, which is energy sloshing into and out of the load's inductance or capacitance twice per cycle. Multiplying those two projections by $V_{rms}$ produces the power triangle: $P = S\cos\theta$, $Q = S\sin\theta$, $S^{2} = P^{2}+Q^{2}$. A **lagging** power factor means the current lags the voltage, which for a passive load means the load is inductive and $Q > 0$ under the standard convention. A **leading** power factor means capacitive, with $Q < 0$. The magnitude of the power factor alone never tells you which one you have - the sign of $Q$, or the words lagging and leading, carry the entire orientation of the problem.

**Why a low power factor is penalised.** The real power $P$ is what the plant converts into heat, light, torque or chemical change, and it is set by the process, not by the electrical design. The current needed to move that power is:
$$I_{rms} = P/(V_{rms}\,PF)$$
so a 0.70 power factor draws $1/0.70 = 1.43$ times the current of a unity-power-factor load of the same wattage. Every element between the generator and the load - transformer, cable, switchgear - must be rated for that larger current, and the copper loss $I^{2}R$ grows with the square of it: dropping the power factor from 1.0 to 0.70 raises the line loss by $(1/0.70)^{2} = 2.04$, that is 104% more loss for the same delivered kilowatts. Utilities therefore meter apparent power in kVA or apply a reactive-demand penalty, and the Philippine Distribution Code obliges customers to keep the power factor at $0.85$ lagging or better at the point of connection — a floor that industrial supply contracts routinely tighten to $0.90$ or higher. Correcting it buys back feeder capacity and cuts losses; it does not reduce the kilowatt-hour energy charge, because the capacitor is lossless and the real power is unchanged.

**Correcting with a parallel capacitor.** A capacitor placed in parallel with the load draws a current that leads the voltage by $90^\circ$, exactly opposing the inductive quadrature current the load draws. The capacitor supplies the load's reactive power locally, so the reactive power the line must carry falls by $Q_C$ while the real power $P$ passing down the line is untouched: an ideal capacitor has zero average power. Writing the original reactive power as $P\tan\theta_1$ and the target as $P\tan\theta_2$ gives the required bank:
$$Q_C = P(\tan\theta_1-\tan\theta_2)$$
Since the bank relates to the voltage by:
$$Q_C = V_{rms}^{2}/X_C = \omega C V_{rms}^{2}$$
for a capacitor in parallel with the load at voltage $V_{rms}$ the capacitance is:
$$C = Q_C/(\omega V_{rms}^{2}) = Q_C/(2\pi f V_{rms}^{2})$$
A positive $Q_C$ means capacitance is needed; a **negative** $Q_C$ means the existing power factor is already better than the target, and forcing capacitance in anyway would drive the plant to a leading power factor, which brings over-voltage and the risk of parallel resonance with the supply inductance. The method also assumes a steady sinusoidal load: if the reactive demand swings, a fixed bank overcorrects at light load, which is why switched or automatically regulated steps are used in practice.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Power factor (definition) | $PF = \cos\theta = \frac{P}{S}$ | $\theta$ is the angle between voltage and current; $PF$ is dimensionless and lies between 0 and 1, so only the wording or the sign of $Q$ can tell lagging from leading. |
| Apparent power | $S = V_{rms}\,I_{rms} = \frac{P}{PF}$ | In VA. RMS values only; peak values inflate $S$ by a factor of 2. |
| Reactive power | $Q = S\sin\theta = P\tan\theta$ | In var. Positive $Q$ is inductive (lagging); negative $Q$ is capacitive (leading). |
| Power triangle | $S^{2} = P^{2} + Q^{2}, \qquad \tan\theta = \frac{Q}{P}$ | The first relation uses magnitudes only; the sign of $Q$ carries the lag or lead information. |
| Angle from power factor | $\theta = \cos^{-1}(PF)$ | A calculator returns $0^\circ$ to $90^\circ$ only, so the lagging or leading attribute must be taken from the problem statement, not from the arithmetic. |
| Required correcting kvar | $Q_C = P(\tan\theta_1 - \tan\theta_2)$ | $\theta_1$ from the original PF and $\theta_2$ from the target PF, both at the same $P$. A negative result means no capacitor is needed. |
| Capacitance for parallel correction | $C = \frac{Q_C}{\omega V_{rms}^{2}} = \frac{Q_C}{2\pi f V_{rms}^{2}}$ | $V_{rms}$ is the voltage actually across the capacitor, and $\omega$ is in rad/s, so a 60 Hz supply means $\omega = 376.99$ rad/s. |
| Capacitor reactive power | $Q_C = \frac{V_{rms}^{2}}{X_C} = \omega C V_{rms}^{2}$ | Exact for an ideal capacitor; $X_C = 1/(\omega C)$ decreases with frequency, so the same bank produces more kvar at higher frequency. |
| Line current after correction | $I_{rms} = \frac{P}{V_{rms}\,PF}$ | Shows the payoff directly: at fixed $P$ and $V$, current is inversely proportional to power factor. |

## Worked Problems

### P1. A single-phase 230 V, 60 Hz load draws 10 kW at a lagging power factor of 0.75. Find the apparent power, the line current, the reactive power, and state whether the load is inductive or capacitive.

**Given:** P = 10 kW; PF = 0.75 lagging; V = 230 V rms, f = 60 Hz

**Solution:**

1. $S = P/PF = 10000/0.75 = 13333$ VA $= 13.33$ kVA.
2. $I_{rms} = S/V_{rms} = 13333/230 = 57.97$ A rms.
3. $\theta = \cos^{-1}(0.75) = 41.41^\circ$, so $\tan\theta = 0.8819$.
4. $Q = P\tan\theta = 10000(0.8819) = 8819$ var $= 8.819$ kvar.
5. Check: $\sqrt{10^{2}+8.819^{2}} = \sqrt{100+77.77} = 13.33$ kVA, matching $S$.
6. The words lagging mean the current lags the voltage, so the quadrature current is magnetising current and the load is inductive with $Q > 0$.

> [!success]- Answer
> **$S = 13.33$ kVA, $I_{rms} = 57.97$ A, $Q = 8.819$ kvar inductive (lagging)**

> [!warning] Trap
> Reporting $Q$ as negative because a reactive load does no real work. Under the lagging-positive convention an inductive load has $Q > 0$; making it negative here would describe a capacitive load and send you shopping for an inductor instead of a capacitor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10000÷0.75 : Ans÷230` → $S$ = **13333** VA → $I$ = **57.97** A rms.
> 2. `10000×tan(cos⁻¹(0.75)) : √(10²+8.819²)` → $Q$ = **8819** var → **13.33** kVA, closing the triangle.
>
> `cos⁻¹` feeds `tan` directly, so $\tan\theta$ never has to be read off a displayed angle.

### P2. The 10 kW, 0.75 lagging load of the previous problem is to be corrected to 0.95 lagging at 230 V, 60 Hz by a capacitor in parallel with the load. Find the required reactive power, the capacitance in $\mu$F, and the new line current.

**Given:** P = 10 kW; PF_1 = 0.75 lagging; PF_2 = 0.95 lagging; V = 230 V rms, f = 60 Hz

**Solution:**

1. $\theta_1 = \cos^{-1}(0.75) = 41.41^\circ$ and $\tan\theta_1 = 0.88192$.
2. $\theta_2 = \cos^{-1}(0.95) = 18.195^\circ$ and $\tan\theta_2 = 0.32868$.
3. $Q_C = P(\tan\theta_1-\tan\theta_2) = 10000(0.88192-0.32868) = 10000(0.55324) = 5532$ var $= 5.532$ kvar.
4. $\omega = 2\pi(60) = 376.99$ rad/s and $V_{rms}^{2} = 230^{2} = 52900$ V$^{2}$.
5. $C = \frac{Q_C}{\omega V_{rms}^{2}} = \frac{5532}{376.99\cdot 52900} = \frac{5532}{1.9943\times10^{7}} = 2.774\times10^{-4}$ F $= 277.4\ \mu$F.
6. Check through the reactance: $X_C = V^{2}/Q_C = 52900/5532 = 9.562\ \Omega$ and $C = 1/(\omega X_C) = 1/(376.99\cdot 9.562) = 277.4\ \mu$F, which agrees.
7. New line current: $I_{new} = P/(V\,PF_2) = 10000/(230\cdot 0.95) = 45.77$ A rms, down from 57.97 A - a 12.2 A (21%) reduction at unchanged real power.

> [!success]- Answer
> **$Q_C = 5.532$ kvar, $C = 277.4\ \mu$F, $I_{new} = 45.77$ A rms (was 57.97 A)**

> [!warning] Trap
> Using $\sin\theta$ where $\tan\theta$ belongs in $Q_C = P(\tan\theta_1-\tan\theta_2)$. With sines the bank comes out $10000(0.6614-0.3122) = 3492$ var, i.e. $175\ \mu$F, which leaves $8819-3492 = 5327$ var and a corrected power factor of only 0.883 lagging instead of 0.95.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10000(tan(cos⁻¹(0.75))−tan(cos⁻¹(0.95)))` → $Q_C$ = **5532** var = **5.532** kvar.
> 2. `Ans÷(2π×60×230²)` → **2.774E-4** F = **277.4** µF.
> 3. `10000÷(230×0.95)` → $I_{new}$ = **45.77** A rms, down from 57.97 A.
>
> `Ans` carries $Q_C$ into the capacitance step, and $V$ there must be the RMS value actually across the bank.

### P3. A single-phase 230 V, 60 Hz motor winding has $R = 8\ \Omega$ and $L = 20$ mH in series. Find the power factor, the real power, the reactive power, and the capacitance in $\mu$F that would bring the combination to unity power factor.

**Given:** R = 8 ohm; L = 20 mH; V = 230 V rms, f = 60 Hz; Target PF = 1.0

**Solution:**

1. $\omega = 2\pi(60) = 376.99$ rad/s, so $X_L = \omega L = 376.99(0.020) = 7.540\ \Omega$.
2. $|\mathbf{Z}| = \sqrt{R^{2}+X_L^{2}} = \sqrt{64+56.85} = \sqrt{120.85} = 10.993\ \Omega$.
3. $PF = R/|\mathbf{Z}| = 8/10.993 = 0.7277$ lagging, with $\tan\theta = X_L/R = 0.9425$ and $\theta = 43.30^\circ$.
4. $I_{rms} = V/|\mathbf{Z}| = 230/10.993 = 20.92$ A rms.
5. $P = I^{2}R = (20.92)^{2}(8) = 3502$ W and $Q = I^{2}X_L = (20.92)^{2}(7.540) = 3300$ var.
6. Check: $S = VI = 230(20.92) = 4812$ VA and $\sqrt{3502^{2}+3300^{2}} = 4812$ VA, which agrees.
7. For unity power factor the capacitor must supply all of the reactive power, so $Q_C = 3300$ var and $C = \frac{Q_C}{\omega V^{2}} = \frac{3300}{376.99\cdot 52900} = 1.655\times10^{-4}$ F $= 165.5\ \mu$F.
8. Independent check from the parallel-resonance condition $\omega C = \omega L/(R^{2}+(\omega L)^{2})$: $C = L/(R^{2}+X_L^{2}) = 0.020/120.85 = 165.5\ \mu$F, which agrees.

> [!success]- Answer
> **$PF = 0.7277$ lagging, $P = 3.502$ kW, $Q = 3.300$ kvar, $C = 165.5\ \mu$F for unity power factor**

> [!warning] Trap
> Computing the power factor as $R/X_L = 8/7.540 = 1.06$. Power factor is the cosine of the *impedance* angle, $R/|\mathbf{Z}| = 0.7277$, where $|\mathbf{Z}|$ includes both $R$ and $X_L$. A calculated power factor greater than 1 is the immediate tell that the wrong ratio was used.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×60×0.02 : √(8²+Ans²) : 230÷Ans` → $X_L$ = **7.540** Ω → $\lvert \mathbf{Z} \rvert$ = **10.993** Ω → $I$ = **20.92** A rms.
> 2. `Ans²×8 : Ans×7.54÷8 : 8÷10.993` → $P$ = **3502** W → $Q$ = **3300** var ($= PX_L/R$) → $\mathrm{pf}$ = **0.7277** lagging.
> 3. `3300÷(2π×60×230²)` → **1.655E-4** F = **165.5** µF for unity power factor.
>
> For unity pf the bank supplies the whole $Q$; the parallel-resonance check $C = L/(R^2+X_L^2)$ gives the same 165.5 µF.

### P4. Two loads share a 230 V, 60 Hz bus. Load 1 is 15 kW at 0.80 lagging; load 2 is 10 kVA at 0.60 leading. Find the total real and reactive power, the overall power factor, and the capacitance needed to reach 0.95 lagging.

**Given:** Load 1: P = 15 kW at PF = 0.80 lagging; Load 2: S = 10 kVA at PF = 0.60 leading; V = 230 V rms, f = 60 Hz; Target: PF = 0.95 lagging

**Solution:**

1. Load 1: $\theta_1 = \cos^{-1}(0.80) = 36.87^\circ$, so $Q_1 = P_1\tan\theta_1 = 15(0.75) = +11.25$ kvar, positive because the load is inductive.
2. Load 2: $P_2 = S_2(PF_2) = 10(0.60) = 6.00$ kW; $\theta_2 = \cos^{-1}(0.60) = 53.13^\circ$, and because the load is *leading*, $Q_2 = -S_2\sin\theta_2 = -10(0.80) = -8.00$ kvar.
3. Totals: $P = 15+6 = 21.0$ kW and $Q = 11.25-8.00 = +3.25$ kvar.
4. $S = \sqrt{21^{2}+3.25^{2}} = \sqrt{441+10.5625} = \sqrt{451.5625} = 21.25$ kVA, so $PF = 21/21.25 = 0.9882$ lagging.
5. For 0.95 lagging the bus may carry $P\tan\theta_{target} = 21(0.32868) = 6.902$ kvar, which is *more* reactive power than the 3.25 kvar actually present.
6. $Q_C = 21(0.15476-0.32868) = -3.652$ kvar. The negative sign says no capacitor is required: the bus already runs at 0.9882 lagging, and adding 3.65 kvar of capacitance would overshoot it into a leading power factor.

> [!success]- Answer
> **$P = 21.0$ kW, $Q = +3.25$ kvar, $S = 21.25$ kVA, overall $PF = 0.9882$ lagging; no capacitor is needed for a 0.95 lagging target (a 3.65 kvar *inductive* addition would be required to land exactly on 0.95)**

> [!warning] Trap
> Adding the reactive powers as magnitudes, $11.25+8.00 = 19.25$ kvar, because both loads were read as inductive. The leading load contributes $Q = -8.00$ kvar, so the true total is 3.25 kvar; the magnitude error gives $S = 28.49$ kVA and $PF = 0.737$ lagging, and would have you specify a 12.35 kvar (619 $\mu$F) bank the plant does not need.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `15×tan(cos⁻¹(0.8)) : 10×0.6 : −10×sin(cos⁻¹(0.6))` → $Q_1$ = **+11.25** kvar → $P_2$ = **6.00** kW → $Q_2$ = **−8.00** kvar.
> 2. `15+6 : 11.25−8 : √(21²+3.25²) : 21÷21.25` → $P$ = **21.0** kW → $Q$ = **+3.25** kvar → $S$ = **21.25** kVA → $\mathrm{pf}$ = **0.9882** lagging.
> 3. `21×(3.25÷21−tan(cos⁻¹(0.95)))` → $Q_C$ = **−3.652** kvar, and the minus sign is the answer: no capacitor is needed.
>
> A kVA nameplate needs $P = S\,\mathrm{pf}$ first, and the leading load's $Q$ stays negative all the way through.

### P5. A 200 kW industrial plant operates at 0.70 power factor lagging on a 230 V, 60 Hz supply. The distribution utility's power-factor floor is 0.85 lagging, and the plant wants a margin, so it targets 0.90. Find the capacitor bank in kvar and in $\mu$F needed to reach exactly 0.90 lagging, and the resulting reduction in line current.

**Given:** P = 200 kW; PF_1 = 0.70 lagging; PF_2 = 0.90 lagging; V = 230 V rms, f = 60 Hz

**Solution:**

1. $\theta_1 = \cos^{-1}(0.70) = 45.573^\circ$ and $\tan\theta_1 = 1.02020$, so $Q_1 = 200(1.02020) = 204.04$ kvar.
2. $\theta_2 = \cos^{-1}(0.90) = 25.842^\circ$ and $\tan\theta_2 = 0.48432$, so the target reactive power is $200(0.48432) = 96.86$ kvar.
3. $Q_C = P(\tan\theta_1-\tan\theta_2) = 200000(1.02020-0.48432) = 200000(0.53588) = 107176$ var $= 107.2$ kvar.
4. $C = \frac{Q_C}{\omega V^{2}} = \frac{107176}{376.99\cdot 52900} = \frac{107176}{1.9943\times10^{7}} = 5.374\times10^{-3}$ F $= 5374\ \mu$F.
5. Before correction: $I_1 = P/(V\,PF_1) = 200000/(230\cdot 0.70) = 1242$ A rms.
6. After correction: $I_2 = P/(V\,PF_2) = 200000/(230\cdot 0.90) = 966.2$ A rms.
7. Reduction $= 1242-966 = 276$ A, a 22.2% drop. The capacitor branch itself carries $Q_C/V = 107176/230 = 466$ A, but that current circulates between the bank and the load instead of flowing back to the substation.

> [!success]- Answer
> **$Q_C = 107.2$ kvar, $C = 5374\ \mu$F, line current falls from 1242 A to 966.2 A (276 A, 22.2% less) at unchanged 200 kW**

> [!warning] Trap
> Sizing the bank as the difference between apparent and real power, that is "$285.7-200 = 85.7$ kvar". The real requirement is $Q_C = P(\tan\theta_1-\tan\theta_2) = 107.2$ kvar; an 85.7 kvar bank leaves $204.0-85.7 = 118.3$ kvar and a corrected power factor of only 0.861 lagging, still short of the 0.90 target.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `200000(tan(cos⁻¹(0.7))−tan(cos⁻¹(0.9)))` → $Q_C$ = **107176** var = **107.2** kvar.
> 2. `Ans÷(2π×60×230²)` → **5.374E-3** F = **5374** µF.
> 3. `200000÷(230×0.7) : 200000÷(230×0.9) : 1242−966.2` → $I_1$ = **1242** A → $I_2$ = **966.2** A → **276** A less, a 22.2 % drop.
>
> Size the bank from $\tan\theta_1-\tan\theta_2$; the apparent-power difference would under-size it to 85.7 kvar.

## Traps & Exam Notes

- **Reading a lagging power factor as leading because the reactive power came out negative.** With the lagging-positive convention $Q = -8.00$ kvar describes a *capacitive* load, not an inductive one. Summing the two bus loads as $11.25+8.00 = 19.25$ kvar yields $PF = 0.737$ for a bus whose true power factor is 0.9882, and produces a 12.35 kvar correction order for a plant that already beats the 0.95 target.
- **Using $\sin\theta$ instead of $\tan\theta$ in the correction formula.** $Q_C = P(\tan\theta_1-\tan\theta_2)$, never $P(\sin\theta_1-\sin\theta_2)$. For 10 kW going from 0.75 to 0.95 the sine form gives 3492 var ($175\ \mu$F) instead of 5532 var ($277.4\ \mu$F), leaving the plant at 0.883 lagging while every arithmetic step looks defensible.
- **Putting peak voltage into $C = Q_C/(\omega V^{2})$.** The formula needs $V_{rms}$. Substituting $230\sqrt{2} = 325.3$ V squares to about $105800$ (twice $52900$) and halves the answer to $139\ \mu$F for the 10 kW correction - a bank that delivers only half the kvar it was specified for.
- **Correcting past unity.** When the target power factor is lower than the existing one the formula returns a negative $Q_C$: for the 21 kW bus running at 0.9882 lagging, a 0.95 target gives $-3.652$ kvar. Installing a positive capacitor anyway drives the plant leading, raises the bus voltage, and can resonate with the supply inductance - and it never reduces the kWh charge, because the capacitor is lossless and the real power does not change.

## See Also

- [[05_AC_Power,_PQS_and_Triangle]]
- [[07_Series_Resonance]]
- [[08_Parallel_Resonance_and_Anti-Resonance]]

---

[[05_AC_Power,_PQS_and_Triangle|⬅ 05]] · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Series_Resonance|07 ➡]]
