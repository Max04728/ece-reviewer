---
id: ECE-02-10
title: "Three-Phase Power and Two-Wattmeter"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 10
tier: 1
depth: full
problem_count: 9
prereqs: ["[[05_AC_Power,_PQS_and_Triangle]]", "[[09_Balanced_Wye_and_Delta_Systems]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Three-Phase Power and Two-Wattmeter

> [!abstract] Scope
> Compute total power, reactive power and power factor in a balanced three-phase system, and recover them from two wattmeter readings.

## Core Concept

> [!tip] Intuition
> Three equal sinusoids 120 degrees apart deliver a total instantaneous power that is constant in time, not pulsating. Two wattmeters placed in any two of the three lines capture everything, because the third line's current is the negative sum of the other two.

**Why three-phase power is smooth.** For a balanced load the instantaneous powers of the three phases are equal-amplitude cosines at $2\omega t$ displaced by $120^\circ$; their sum is identically constant. That is why three-phase motors run without the twice-line-frequency torque pulsation of a single-phase machine, and why the total power can be computed from RMS quantities alone.

**Total power.** The total real power is:
$$P_{3\phi} = 3V_{ph}I_{ph}\cos\theta$$
where $\theta$ is the angle of the per-phase load impedance. Substituting the wye relations $V_{ph} = V_L/\sqrt{3}$, $I_{ph} = I_L$, or the delta relations $V_{ph} = V_L$, $I_{ph} = I_L/\sqrt{3}$, gives the same compact result in either connection:
$$P_{3\phi} = \sqrt{3}\,V_LI_L\cos\theta$$
The $\sqrt{3}$ is not a property of the load — it is the exchange rate between line and phase quantities.

**The same $\sqrt{3}$ carries reactive and apparent power.** The three-phase powers are:
$$Q_{3\phi} = \sqrt{3}\,V_LI_L\sin\theta$$
and the apparent power is:
$$S_{3\phi} = \sqrt{3}\,V_LI_L$$
so the power triangle $S^2 = P^2+Q^2$ and $\mathrm{pf} = \cos\theta$ hold at the three-phase level exactly as they do per phase. The per-phase power is one third of each.

**The two-wattmeter method.** Insert a wattmeter in line A and another in line C (or any two lines), with both voltage coils returned to the third line B. The wattmeter readings are:
$$W_1 = V_LI_L\cos(30^\circ-\theta)$$
The second reading is:
$$W_2 = V_LI_L\cos(30^\circ+\theta)$$
Here $\theta$ is the load impedance angle and the signs assume a lagging load with the usual phase sequence. Their **sum** is the total real power:
$$W_1+W_2 = \sqrt{3}V_LI_L\cos\theta = P_{3\phi}$$
Their **difference** gives the total reactive power:
$$Q_{3\phi} = \sqrt{3}\,(W_1-W_2)$$

**Power factor straight from the meters.** Dividing the two combinations gives the load angle:
$$\tan\theta = \sqrt{3}\,\dfrac{W_1-W_2}{W_1+W_2}$$
so the power factor is $\cos\theta$ with no need for the voltage or the current. This is the fastest three-phase exam route when only two readings are given.

**The $0.5$ power-factor boundary.** At $\mathrm{pf} = 1$, $\theta = 0$ and both meters read the same value. As the load becomes more inductive, $W_1$ grows and $W_2$ shrinks; exactly at $\theta = 60^\circ$, i.e. $\mathrm{pf} = 0.5$ lagging, $\cos(30^\circ+60^\circ) = 0$ so $W_2$ reads zero. Below 0.5 lagging, $W_2$ reads **negative** and must be subtracted from $W_1$ — the meter has to be reversed to read it at all. Any total power assembled by adding the magnitudes in that region is wrong.

**Total reactive power in a balanced system can be reconstructed from the two readings, but the two meters are not each measuring a phase.** They measure line-quantity combinations, so a single reading has no independent physical meaning as 'the power of phase A'. Only their sum and difference are useful.

**Where the method fails.** Three-wattmeter (or the two-wattmeter with a neutral) is required for an unbalanced four-wire system, because a neutral current can flow. The two-wattmeter method as stated is valid for any three-wire load, balanced or not, for the *total* power — but the two identities for reactive power and power factor require balance: $W_1+W_2$ and $Q = \sqrt{3}(W_1-W_2)$.

## Derivation

**Total power from per-phase quantities.** For a balanced load, $P_{3\phi} = 3V_{ph}I_{ph}\cos\theta$. In wye, $V_{ph} = V_L/\sqrt{3}$ and $I_{ph} = I_L$, so $P_{3\phi} = 3\dfrac{V_L}{\sqrt{3}}I_L\cos\theta = \sqrt{3}V_LI_L\cos\theta$. In delta, $V_{ph} = V_L$ and $I_{ph} = I_L/\sqrt{3}$, so $P_{3\phi} = 3V_L\dfrac{I_L}{\sqrt{3}}\cos\theta$ — identical. The line quantity formula is connection-independent.

**Wattmeter reading derivation.** Take lines A, B, C with phase voltages $V\angle0^\circ$, $V\angle{-120^\circ}$, $V\angle{120^\circ}$ and a balanced lagging load of angle $\theta$. The wattmeter in line A sees the line voltage $\mathbf{V}_{AB} = \mathbf{V}_{AN}-\mathbf{V}_{BN} = \sqrt{3}V\angle{30^\circ}$ and the line current $\mathbf{I}_A = I\angle{-\theta}$, so the angle between them is $30^\circ+\theta$ in the line-voltage frame and the reading is $W_1 = V_LI_L\cos(30^\circ-\theta)$ after the phase convention is applied. The line-C wattmeter uses $\mathbf{V}_{CB}$ and $\mathbf{I}_C$, whose angle relation is reversed:

$$W_1 = V_LI_L\cos(30^\circ-\theta), \qquad W_2 = V_LI_L\cos(30^\circ+\theta)$$

**Sum and difference.** Using the product-to-sum identities, $\cos(30^\circ-\theta)+\cos(30^\circ+\theta) = 2\cos30^\circ\cos\theta = \sqrt{3}\cos\theta$, so $W_1+W_2 = \sqrt{3}V_LI_L\cos\theta = P_{3\phi}$. Likewise $\cos(30^\circ-\theta)-\cos(30^\circ+\theta) = 2\sin30^\circ\sin\theta = \sin\theta$, so $W_1-W_2 = V_LI_L\sin\theta$ and $\sqrt{3}(W_1-W_2) = \sqrt{3}V_LI_L\sin\theta = Q_{3\phi}$.

**Power factor from the readings.** Dividing, $\dfrac{W_1-W_2}{W_1+W_2} = \dfrac{\sin\theta}{\sqrt{3}\cos\theta} = \dfrac{\tan\theta}{\sqrt{3}}$, hence $\tan\theta = \sqrt{3}\dfrac{W_1-W_2}{W_1+W_2}$ and $\mathrm{pf} = \cos\theta$.

**Sign of the second reading.** $W_2 = V_LI_L\cos(30^\circ+\theta)$ changes sign when $30^\circ+\theta > 90^\circ$, i.e. $\theta > 60^\circ$, i.e. $\mathrm{pf} < 0.5$ lagging. The physical reading on the meter is negative, so it must be reversed; algebraically it stays negative in the sum.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Three-phase real power | $P_{3\phi} = \sqrt{3}\,V_L I_L\cos\theta$ | Balanced load, any connection. V_L and I_L are line (not phase) RMS values. |
| Three-phase reactive power | $Q_{3\phi} = \sqrt{3}\,V_L I_L\sin\theta$ | var. Positive for an inductive load. Requires a balanced load. |
| Three-phase apparent power | $S_{3\phi} = \sqrt{3}\,V_L I_L = 3 V_{ph}I_{ph}$ | VA. Sizes the transformer and the switchgear. |
| Per-phase power | $P_{ph} = V_{ph}I_{ph}\cos\theta = \frac{P_{3\phi}}{3}$ | Each phase carries exactly one third of the total in a balanced system. |
| Wye relations | $V_L = \sqrt{3}\,V_{ph}, \qquad I_L = I_{ph}$ | The line voltage leads its phase voltage by 30 degrees. |
| Delta relations | $V_L = V_{ph}, \qquad I_L = \sqrt{3}\,I_{ph}$ | The line current lags its phase current by 30 degrees. |
| Wattmeter 1 | $W_1 = V_L I_L\cos(30^\circ - \theta)$ | Line A meter with its voltage coil returned to line B. The larger reading for a lagging load. |
| Wattmeter 2 | $W_2 = V_L I_L\cos(30^\circ + \theta)$ | Reaches zero at pf = 0.5 lagging and reads negative below it; reverse the meter to take the reading. |
| Total power from the meters | $P_{3\phi} = W_1 + W_2$ | Algebraic sum, including the sign of a negative W_2. Valid for any three-wire load. |
| Reactive power from the meters | $Q_{3\phi} = \sqrt{3}\,(W_1 - W_2)$ | Requires a balanced load. Positive difference means inductive. |
| Power factor from the meters | $\tan\theta = \sqrt{3}\,\frac{W_1 - W_2}{W_1 + W_2}$ | No voltage or current measurement needed. State lagging or leading separately. |
| Equal-reading condition | $W_1 = W_2 = \frac{P_{3\phi}}{2} \quad \mathrm{when\ pf} = 1$ | Both meters read half the total at unity power factor. |
| Line current from total power | $I_L = \frac{P_{3\phi}}{\sqrt{3}\,V_L\cos\theta}$ | The three-phase counterpart of I = P/(V pf). Uses line voltage and line current. |

## Worked Problems

### P1. A balanced wye-connected load has $\mathbf{Z}_{ph} = 10\angle30^\circ\,\Omega$ per phase on a $400\,\mathrm{V}$ (line-to-line) supply. Find the phase voltage, the line current, and the total real, reactive and apparent power.

**Given:** V_L = 400 V; Z_ph = 10∠30° Ω; wye connection

**Solution:**

1. V_ph = V_L/sqrt(3) = 400/1.7320508 = 230.94 V
2. For a wye load I_L = I_ph = V_ph/|Z| = 230.94/10 = 23.094 A
3. theta = 30 degrees, so cos theta = 0.86603 and sin theta = 0.5
4. P = sqrt(3) V_L I_L cos theta = (1.7320508)(400)(23.094)(0.86603)
5. P = 692.82 x 23.094 x 0.86603 = 16000 x 0.86603 = 13856 W
6. Q = 16000 x 0.5 = 8000 var; S = sqrt(3)(400)(23.094) = 16000 VA

> [!success]- Answer
> **$V_{ph} = 230.94\,\mathrm{V}$, $I_L = 23.09\,\mathrm{A}$, $P = 13.86\,\mathrm{kW}$, $Q = 8.0\,\mathrm{kvar}$, $S = 16.0\,\mathrm{kVA}$**

> [!warning] Trap
> Using the 400 V line voltage as the phase voltage (giving I = 40 A and a power nearly double). In a wye system $V_{ph} = V_L/\sqrt{3}$; the $\sqrt{3}$ in the power formula already accounts for it, so never apply it twice.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `400÷√3 : Ans÷10` → $V_{ph}$ = **230.94** V → $I_L = I_{ph}$ = **23.094** A.
> 2. `√3×400×23.094 : 16000cos(30) : 16000sin(30)` → $S$ = **16000** VA → $P$ = **13856** W → $Q$ = **8000** var.
>
> The $\sqrt{3}$ already inside the power formula is the same one that relates 400 V to 230.9 V — do not divide again.

### P2. A balanced delta-connected load of $30\angle0^\circ\,\Omega$ per phase is connected to a $230\,\mathrm{V}$ three-phase line. Find the phase current, the line current and the total power.

**Given:** V_L = 230 V; Z_delta = 30∠0° Ω; delta connection

**Solution:**

1. For delta, V_ph = V_L = 230 V
2. I_ph = 230/30 = 7.667 A
3. I_L = sqrt(3) I_ph = 1.7320508 x 7.667 = 13.279 A
4. P = 3 I_ph^2 R = 3 (7.667^2)(30) = 3 x 58.78 x 30 = 5290 W
5. Check with line quantities: P = sqrt(3)(230)(13.279)(1) = 5290 W ✓

> [!success]- Answer
> **$I_{ph} = 7.667\,\mathrm{A}$, $I_L = 13.28\,\mathrm{A}$, $P = 5290\,\mathrm{W}$**

> [!warning] Trap
> Assigning $I_L = I_{ph}$ because the load is purely resistive. The $\sqrt{3}$ between line and phase current in delta comes from KCL at the node, not from the load angle.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `230÷30 : Ans×√3` → $I_{ph}$ = **7.667** A → $I_L$ = **13.279** A.
> 2. `3×7.667²×30 : √3×230×13.279` → $P$ = **5290** W → line-form check **5290** W.

### P3. Two wattmeters connected in lines A and C of a balanced three-phase load read $W_1 = 5000\,\mathrm{W}$ and $W_2 = 2000\,\mathrm{W}$. Find the total power, the reactive power and the power factor.

**Given:** W1 = 5000 W; W2 = 2000 W; balanced load

**Solution:**

1. P = W1 + W2 = 5000 + 2000 = 7000 W
2. Q = sqrt(3)(W1 - W2) = 1.7320508 x 3000 = 5196 var
3. tan theta = sqrt(3)(W1 - W2)/(W1 + W2) = 5196/7000 = 0.7423
4. theta = arctan(0.7423) = 36.59 degrees
5. pf = cos(36.59 degrees) = 0.803 lagging

> [!success]- Answer
> **$P = 7.0\,\mathrm{kW}$, $Q = 5.196\,\mathrm{kvar}$, $\mathrm{pf} = 0.803$ lagging**

> [!warning] Trap
> Computing $Q = \sqrt{3}(W_2-W_1)$ and reporting a leading power factor. The larger reading is $W_1$ for a lagging load, so the difference must be taken in that order to keep Q positive.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5000+2000 : √3×(5000−2000)` → $P$ = **7000** W → $Q$ = **5196** var.
> 2. `5196÷7000 : tan⁻¹(Ans) : cos(Ans)` → $\tan\theta$ = **0.7423** → $\theta$ = **36.59**° → $\mathrm{pf}$ = **0.803** lagging.

### P4. Two wattmeters on a balanced load read $W_1 = 4000\,\mathrm{W}$ and $W_2 = -1000\,\mathrm{W}$. Find the total power, the reactive power and the power factor.

**Given:** W1 = 4000 W; W2 = -1000 W; balanced inductive load

**Solution:**

1. The negative reading means the meter had to be reversed; it stays negative algebraically
2. P = W1 + W2 = 4000 - 1000 = 3000 W
3. Q = sqrt(3)(W1 - W2) = 1.7320508 x 5000 = 8660 var
4. tan theta = 8660/3000 = 2.887
5. theta = arctan(2.887) = 70.89 degrees, and pf = cos(70.89) = 0.327 lagging

> [!success]- Answer
> **$P = 3.0\,\mathrm{kW}$, $Q = 8.66\,\mathrm{kvar}$, $\mathrm{pf} = 0.327$ lagging**

> [!warning] Trap
> Adding the magnitudes to get 5000 W. A negative wattmeter reading is subtracted. Note also that a power factor below 0.5 is the signal that one meter will reverse — here pf = 0.327.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4000+(−1000) : √3×(4000−(−1000))` → $P$ = **3000** W → $Q$ = **8660** var.
> 2. `8660÷3000 : tan⁻¹(Ans) : cos(Ans)` → $\tan\theta$ = **2.887** → $\theta$ = **70.89**° → $\mathrm{pf}$ = **0.327** lagging.
>
> A reversed meter stays negative in the sum: $4000 + (-1000) = 3000$ W, never 5000 W.

### P5. A balanced three-phase load takes $20\,\mathrm{A}$ per line at $400\,\mathrm{V}$ with a power factor of $0.8$ lagging. Find the two wattmeter readings and check their sum and difference.

**Given:** V_L = 400 V; I_L = 20 A; pf = 0.8 lagging

**Solution:**

1. theta = arccos(0.8) = 36.87 degrees
2. W1 = V_L I_L cos(30 - theta) = (400)(20) cos(-6.87) = 8000 x 0.99282 = 7943 W
3. W2 = V_L I_L cos(30 + theta) = 8000 cos(66.87) = 8000 x 0.39282 = 3143 W
4. Sum check: 7943 + 3143 = 11085 W, and sqrt(3)(400)(20)(0.8) = 11085 W ✓
5. Difference check: sqrt(3)(7943 - 3143) = 1.7320508 x 4800 = 8314 var, and sqrt(3)(400)(20)(0.6) = 8314 var ✓

> [!success]- Answer
> **$W_1 = 7943\,\mathrm{W}$, $W_2 = 3143\,\mathrm{W}$; total $P = 11.09\,\mathrm{kW}$ at $Q = 8.31\,\mathrm{kvar}$**

> [!warning] Trap
> Using $W = V_LI_L\cos\theta$ for each meter, which would give 6400 W twice. The $30^\circ$ offset from the line-to-line voltage is the whole point of the method.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `cos⁻¹(0.8)` → $\theta$ = **36.87**°.
> 2. `8000cos(30−36.87) : 8000cos(30+36.87)` → $W_1$ = **7943** W → $W_2$ = **3143** W.
> 3. `√3×400×20×0.8 : √3×(7943−3143)` → $P$ = **11085** W → $Q$ = **8314** var, so both the sum and the difference check.

### P6. A balanced wye load of $20 + j15\,\Omega$ per phase is supplied at $400\,\mathrm{V}$ line-to-line. Find the line current and the total real, reactive and apparent power.

**Given:** Z_ph = 20 + j15 Ω; V_L = 400 V; wye

**Solution:**

1. |Z| = sqrt(400 + 225) = 25 Ω
2. V_ph = 400/sqrt(3) = 230.94 V, so I_L = I_ph = 230.94/25 = 9.238 A
3. P = 3 I^2 R = 3 (9.238^2)(20) = 3 x 85.33 x 20 = 5120 W
4. Q = 3 I^2 X = 3 x 85.33 x 15 = 3840 var
5. S = 3 I^2 |Z| = 3 x 85.33 x 25 = 6400 VA (check sqrt(3)(400)(9.238) = 6400 VA ✓)
6. pf = R/|Z| = 20/25 = 0.8 lagging

> [!success]- Answer
> **$I_L = 9.24\,\mathrm{A}$, $P = 5.12\,\mathrm{kW}$, $Q = 3.84\,\mathrm{kvar}$, $S = 6.40\,\mathrm{kVA}$, $\mathrm{pf} = 0.8$ lagging**

> [!warning] Trap
> Reading $|\mathbf{Z}| = 20 + 15 = 35\,\Omega$ by adding the resistance and reactance arithmetically. They are perpendicular legs: $|\mathbf{Z}| = \sqrt{20^2+15^2} = 25\,\Omega$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(20²+15²) : 400÷√3 : Ans÷25` → $\lvert \mathbf{Z} \rvert$ = **25** Ω → $V_{ph}$ = **230.94** V → $I_L$ = **9.238** A.
> 2. `3×9.238²×20 : 3×9.238²×15 : 3×9.238²×25 : 20÷25` → $P$ = **5120** W → $Q$ = **3840** var → $S$ = **6400** VA → $\mathrm{pf}$ = **0.8** lagging.

### P7. A balanced load draws $10\,\mathrm{kW}$ at $400\,\mathrm{V}$ line-to-line with a power factor of $0.9$ lagging. Find the line current and the two wattmeter readings.

**Given:** P = 10 kW; V_L = 400 V; pf = 0.9 lagging

**Solution:**

1. I_L = P/(sqrt(3) V_L pf) = 10000/(1.7320508 x 400 x 0.9) = 10000/623.54 = 16.038 A
2. theta = arccos(0.9) = 25.84 degrees
3. W1 = (400)(16.038) cos(30 - 25.84) = 6415 x cos(4.16) = 6415 x 0.99737 = 6398 W
4. W2 = 6415 x cos(55.84) = 6415 x 0.56148 = 3602 W
5. Sum check: 6398 + 3602 = 10000 W, matching sqrt(3)(400)(16.038)(0.9) = 10000 W ✓

> [!success]- Answer
> **$I_L = 16.04\,\mathrm{A}$, $W_1 = 6398\,\mathrm{W}$, $W_2 = 3602\,\mathrm{W}$**

> [!warning] Trap
> Computing $I_L = P/(V_L\cos\theta) = 10000/(400 \times 0.9) = 27.8\,\mathrm{A}$, dropping the $\sqrt{3}$. Line current in a three-phase system carries the factor $\sqrt{3}$ in the denominator.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10000÷(√3×400×0.9) : cos⁻¹(0.9)` → $I_L$ = **16.038** A → $\theta$ = **25.84**°.
> 2. `6415cos(30−25.84) : 6415cos(30+25.84)` → $W_1$ = **6398** W → $W_2$ = **3602** W, with $V_LI_L = 6415$ VA.
> 3. `6398+3602` → **10000** W, matching $\sqrt{3}(400)(16.038)(0.9)$.
>
> The $\sqrt{3}$ sits in the denominator of $I_L = P/(\sqrt{3}V_L\mathrm{pf})$; dropping it gives the trap 27.8 A.

### P8. At what power factor does one wattmeter of a two-wattmeter pair read exactly zero, and what happens below that value?

**Given:** two-wattmeter method; balanced load; W2 = 0 required

**Solution:**

1. W2 = V_L I_L cos(30 + theta) = 0 requires cos(30 + theta) = 0
2. 30 + theta = 90 degrees → theta = 60 degrees
3. pf = cos(60 degrees) = 0.5
4. For theta > 60 degrees (pf < 0.5 lagging), 30 + theta > 90 degrees, so cos(30 + theta) < 0 and W2 reads negative

> [!success]- Answer
> **$W_2 = 0$ at $\mathrm{pf} = 0.5$ lagging; below 0.5 the meter reverses and reads negative**

> [!warning] Trap
> Assuming both wattmeters always read positive and adding their magnitudes. Below 0.5 lagging the second reading is negative and must be subtracted; ignoring the sign makes the total power too large.

### P9. Three identical $10\,\mathrm{kW}$ resistive heating elements are connected in delta across a $400\,\mathrm{V}$ three-phase line. Find the total power, the phase current, the line current and the two wattmeter readings.

**Given:** three 10 kW resistive elements; delta; V_L = 400 V; pf = 1

**Solution:**

1. Total power P = 3 x 10 kW = 30 kW
2. Delta: V_ph = V_L = 400 V, so I_ph = 10000/400 = 25 A
3. I_L = sqrt(3)(25) = 43.30 A
4. Check: P = sqrt(3)(400)(43.30)(1) = 30000 W ✓
5. At unity power factor both meters read the same: W1 = W2 = P/2 = 15000 W

> [!success]- Answer
> **$P = 30\,\mathrm{kW}$, $I_{ph} = 25\,\mathrm{A}$, $I_L = 43.3\,\mathrm{A}$, $W_1 = W_2 = 15\,\mathrm{kW}$**

> [!warning] Trap
> Reporting the element power per phase as $V_LI_L = 400 \times 43.3 = 17.3\,\mathrm{kW}$. Each element sees the full 400 V and carries 25 A, so it dissipates 10 kW; the line current is $\sqrt{3}$ times the element current.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10000÷400 : Ans×√3` → $I_{ph}$ = **25** A → $I_L$ = **43.30** A.
> 2. `3×10000 : 30000÷2 : √3×400×43.30` → $P$ = **30000** W → $W_1 = W_2$ = **15000** W → check **30000** W.
>
> At unity pf the meters split the total exactly; each element still sees the full 400 V and 25 A.

## Traps & Exam Notes

- **Applying $\sqrt{3}$ twice.** In wye, $V_{ph} = V_L/\sqrt{3}$; the power formula $\sqrt{3}V_LI_L\cos\theta$ already contains that factor. Dividing again (or using $V_{ph}$ inside the line formula) gives an answer off by $\sqrt{3}$ or 3.
- **Using line values as phase values in delta.** Delta loads see the full line voltage but only $I_L/\sqrt{3}$ per element — the opposite of the wye case for current.
- **Sign of the second wattmeter below pf = 0.5.** $W_2$ becomes negative and must be subtracted. Adding $|W_2|$ overstates the total power, and the resulting power factor comes out too high.
- **Taking $Q = \sqrt{3}(W_2-W_1)$.** For a lagging load $W_1>W_2$; reversing the order flips the sign and mislabels the load as capacitive.
- **Assuming both wattmeters read half the total.** That is true only at unity power factor. At any other pf the meters read unequal values that differ by up to the full total.
- **Summing the phase powers with the wrong $I_{ph}$.** Delta phase current is $I_L/\sqrt{3}$, not $I_L$; using the line current in $3I_{ph}^2R$ overstates the power by a factor of 3.
- **Adding $|\mathbf{Z}|$ from $R$ and $X$ arithmetically.** $|\mathbf{Z}| = \sqrt{R^2+X^2}$, and $\cos\theta = R/|\mathbf{Z}|$ is what feeds the power formula.
- **Using the two-wattmeter reactive-power identity on an unbalanced load.** $P = W_1+W_2$ holds for any three-wire load, but $Q = \sqrt{3}(W_1-W_2)$ and the $\tan\theta$ formula require a balanced load.

## See Also

- [[09_Balanced_Wye_and_Delta_Systems]]
- [[05_AC_Power,_PQS_and_Triangle]]
- [[06_Power_Factor_and_Correction]]
- [[03_Delta-Wye_Transformations]]

---

[[09_Balanced_Wye_and_Delta_Systems|⬅ 09]] · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
