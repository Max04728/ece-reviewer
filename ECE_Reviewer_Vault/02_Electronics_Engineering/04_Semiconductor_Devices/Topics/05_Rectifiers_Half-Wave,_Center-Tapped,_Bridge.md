---
id: ECE-04-05
title: "Rectifiers: Half-Wave, Center-Tapped, Bridge"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 5
tier: 1
depth: full
problem_count: 10
prereqs: ["[[02_PN_Junction_and_Depletion_Region]]", "[[04_Diode_Models_and_Load_Line]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Rectifiers: Half-Wave, Center-Tapped, Bridge

> [!abstract] Scope
> Analyse half-wave, center-tapped full-wave and bridge rectifiers: derive and apply V_dc, V_rms, ripple factor, form factor, efficiency and PIV for each topology, with and without diode drops.

## Core Concept

> [!tip] Intuition
> A rectifier is a one-way valve followed by a load. The diode passes one half of the sine (or steers both halves the same way through the load), so the load sees a pulsating DC whose average you compute by integrating one hump. Everything else — ripple, form factor, efficiency — is bookkeeping on that same hump.

**The three topologies and what the load sees.** A *half-wave* rectifier passes one half-cycle and blocks the other, so the load voltage is $v_L = V_m\sin\omega t$ for $0<\omega t<\pi$ and zero otherwise. A *center-tapped full-wave* rectifier uses a transformer with a grounded center tap and two diodes; each diode conducts on alternate half-cycles through half of the secondary, so the load receives both humps and the peak applied to the load is the center-tap-to-end peak $V_m$ (half the total secondary peak). A *bridge* rectifier uses four diodes and no center tap; two diodes conduct on each half-cycle and the full secondary drives the load, so again the load sees both humps with peak $V_m$. The difference between the two full-wave circuits is not the load waveform — that is identical — but the diode count, the transformer, and the PIV.

**The averages that matter.** For a sine hump of peak $V_m$, the average over a whole cycle is $V_{dc} = V_m/\pi = 0.318V_m$ for half-wave and $V_{dc} = 2V_m/\pi = 0.636V_m$ for full-wave. The rms values differ for a subtler reason: the half-wave load carries current only half the time, so $V_{rms} = V_m/2$; the full-wave load always carries current, so $V_{rms} = V_m/\sqrt{2}$ exactly as for an ordinary sinusoid. Notice that the full-wave $V_{rms}$ is $\sqrt{2}$ times its $V_{dc}$-to-$V_m$ ratio partner while the half-wave is not — this is the whole origin of the different ripple factors.

**Ripple factor and form factor.** Ripple factor is defined as $r = V_{ac}/V_{dc}$ where $V_{ac}$ is the rms of the AC component only. Since $V_{rms}^2 = V_{dc}^2 + V_{ac}^2$, this becomes $r = \sqrt{(V_{rms}/V_{dc})^2 - 1} = \sqrt{F^2 - 1}$, where $F = V_{rms}/V_{dc}$ is the form factor. Half-wave: $F = \pi/2 = 1.571$, so $r = 1.21$. Full-wave:
$$F = \pi/(2\sqrt{2}) = 1.111$$
so $r = 0.482$. The full-wave circuit is not marginally better — its ripple is less than half the half-wave ripple for the same peak voltage, which is why every practical supply is full-wave.

**Efficiency and PIV.** Rectifier efficiency is the ratio of DC power delivered to the load to the total power (DC plus ripple) in that same load:
$$\eta = P_{dc}/P_{ac} = (V_{dc}/V_{rms})^2 = 1/F^2$$
That gives a maximum of $4/\pi^2 = 40.6\%$ for half-wave and $8/\pi^2 = 81.2\%$ for full-wave with ideal diodes. Peak inverse voltage is a *rating* question, not a performance one: it is the largest reverse voltage that appears across a non-conducting diode. Half-wave: the diode blocks the full secondary, so $PIV = V_m$. Center-tap: when one diode conducts, the other sits at the far end of the *whole* secondary while its own cathode is held at the conducting peak, so it must block $2V_m$. Bridge: two diodes conduct in series and each non-conducting diode blocks only $V_m$. Underestimating PIV is how a rectifier works on the bench and dies in the field.

**Real diodes and the filter capacitor.** A conducting silicon diode drops about 0.7 V, so replace $V_m$ by $V_m - V_D$ for a half-wave or center-tap circuit and by $V_m - 2V_D$ for a bridge, which has two diodes in the conduction path. A capacitor-input filter then holds the load up between humps: the ripple is $V_r \approx I_{dc}/(f_r C)$ with $f_r = f$ for half-wave and $f_r = 2f$ for full-wave, and the DC output is $V_m - V_r/2$, not $V_m$. Adding the capacitor also changes the PIV of a half-wave rectifier to $2V_m$, because the capacitor holds the cathode at $+V_m$ while the source swings to $-V_m$.

## Derivation

**Half-wave average and rms by direct integration.** The load voltage is $v_L = V_m\sin\theta$ for $0<\theta<\pi$ and zero for the rest of the $2\pi$ cycle. Average: $$V_{dc} = \frac{1}{2\pi}\int_0^{\pi} V_m\sin\theta\,d\theta = \frac{V_m}{2\pi}\Big[-\cos\theta\Big]_0^{\pi} = \frac{V_m}{2\pi}(1+1) = \frac{V_m}{\pi} = 0.318V_m.$$ Mean square: $$V_{rms}^2 = \frac{1}{2\pi}\int_0^{\pi} V_m^2\sin^2\theta\,d\theta = \frac{V_m^2}{2\pi}\int_0^{\pi}\frac{1-\cos2\theta}{2}d\theta = \frac{V_m^2}{2\pi}\cdot\frac{\pi}{2} = \frac{V_m^2}{4},$$ so $V_{rms} = V_m/2$. Note the factor $2\pi$ in the denominator: the diode is off for half the cycle, and that idle half-cycle is what drags the rms down to $V_m/2$ instead of $V_m/\sqrt{2}$.

**Full-wave average, rms, form factor and ripple factor.** The load sees $|V_m\sin\theta|$, which is the same hump repeated twice per cycle, so average over one hump of width $\pi$: $$V_{dc} = \frac{1}{\pi}\int_0^{\pi}V_m\sin\theta\,d\theta = \frac{2V_m}{\pi} = 0.636V_m.$$ The mean square is the same as for a full sinusoid, $V_{rms}^2 = V_m^2/2$, so $V_{rms} = V_m/\sqrt{2}$. Form factor: $$F = \frac{V_{rms}}{V_{dc}} = \frac{V_m/\sqrt{2}}{2V_m/\pi} = \frac{\pi}{2\sqrt{2}} = 1.111.$$ Ripple factor: $$r = \sqrt{F^2-1} = \sqrt{\frac{\pi^2}{8}-1} = \sqrt{1.2337-1} = 0.482.$$ For the half-wave case the same steps with $F = \pi/2$ give $r = \sqrt{\pi^2/4 - 1} = \sqrt{1.4674} = 1.21$.

**Maximum efficiency.** With ideal diodes and a resistive load, all the power delivered to the load is the mean square of the load voltage divided by $R_L$: $P_{ac} = V_{rms}^2/R_L$ and $P_{dc} = V_{dc}^2/R_L$. Therefore $$\eta = \frac{P_{dc}}{P_{ac}} = \frac{V_{dc}^2}{V_{rms}^2} = \frac{1}{F^2}.$$ Half-wave: $\eta = 4/\pi^2 = 0.406$. Full-wave: $\eta = 8/\pi^2 = 0.812$. These are *maximum* values — they assume zero diode drop, zero transformer loss, and a purely resistive load. A constant diode drop scales $V_{dc}$ and $V_{rms}$ by the same factor, so it does not change $1/F^2$; it lowers the *real* efficiency through the extra diode dissipation, which this formula does not model.

**Peak inverse voltage, circuit by circuit.** Half-wave: during the blocked half-cycle the source is at $-V_m$ and the capacitor-free load is at 0, so the diode holds off $V_m$ (with a capacitor filter it holds $2V_m$). Center-tap: label the secondary ends A, B and the tap C, with $v_{AC} = V_m\sin\theta$ and $v_{BC} = -V_m\sin\theta$. When D1 (fed from A) conducts, its cathode is at $+V_m$; the other diode's anode is at $-V_m$, so that diode sees $+V_m - (-V_m) = 2V_m$ in reverse. Bridge: when D1 and D2 conduct, the reverse diodes D3 and D4 have their anodes at the conducting output node ($\approx +V_m$) or at the source return, and each holds off only the source peak $V_m$. This is why the bridge trades one extra diode drop for half the PIV of the center-tap circuit.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Half-wave DC output | $V_{dc} = \frac{V_m}{\pi} = 0.318V_m$ | Ideal diode, resistive load. With a silicon diode use V_m - V_D in place of V_m. |
| Half-wave rms output | $V_{rms} = \frac{V_m}{2}$ | The diode is off half the cycle, so this is NOT V_m/sqrt(2). |
| Half-wave ripple factor | $r = 1.21$ | Ideal diode. r = sqrt(F^2 - 1) with F = pi/2. |
| Half-wave form factor | $F = \frac{V_{rms}}{V_{dc}} = \frac{\pi}{2} = 1.571$ | Definition F = rms/average; use it to convert between the two. |
| Full-wave DC output | $V_{dc} = \frac{2V_m}{\pi} = 0.636V_m$ | Center-tap and bridge alike. Double the half-wave result. |
| Full-wave rms output | $V_{rms} = \frac{V_m}{\sqrt{2}}$ | The load carries current every half-cycle, so the waveform is a full rectified sine. |
| Full-wave ripple factor | $r = 0.482$ | Same for center-tap and bridge. Follows from F = pi/(2 sqrt 2). |
| Full-wave form factor | $F = \frac{\pi}{2\sqrt{2}} = 1.111$ | Ideal diode, resistive load. |
| Rectifier efficiency | $\eta = \frac{P_{dc}}{P_{ac}} = \frac{1}{F^2}$ | Maximum values: 40.6% half-wave, 81.2% full-wave, with ideal diodes and a resistive load. |
| Peak inverse voltage, half-wave | $PIV = V_m$ | Rises to 2V_m once a capacitor-input filter is added. |
| Peak inverse voltage, center-tap | $PIV = 2V_m$ | V_m is the center-tap-to-one-end peak, i.e. half the total secondary. |
| Peak inverse voltage, bridge | $PIV = V_m$ | Two diodes conduct in series; each reverse diode blocks only the source peak. |
| Ripple frequency, half-wave | $f_r = f$ | 60 Hz input gives 60 Hz ripple. |
| Ripple frequency, full-wave | $f_r = 2f$ | Center-tap and bridge both give 120 Hz ripple from a 60 Hz line. |
| Average diode current, half-wave | $I_{D,avg} = I_{dc}$ | The single diode carries the whole load current, half the time. |
| Average diode current, full-wave | $I_{D,avg} = \frac{I_{dc}}{2}$ | In the bridge the current splits between two diode pairs, so each diode averages half. |
| Secondary rms for a required DC output, bridge | $V_{s,rms} = \frac{\pi V_{dc}/2 + 2V_D}{\sqrt{2}}$ | Design form. Two diode drops because two diodes conduct in series. |
| Secondary rms for a required DC output, center-tap | $V_{s,rms} = \frac{\pi V_{dc}/2 + V_D}{\sqrt{2}}$ | This is the center-tap-to-one-end winding voltage, not the full secondary. |
| Transformer utilization factor | $TUF = \frac{P_{dc}}{V_{s,rms}I_{s,rms}}$ | 0.287 half-wave, 0.812 bridge. Lower TUF means a bigger, more expensive transformer for the same DC power. |

## Interactive Widget

**Rectifier Ripple Waveform**

![[Rectifier_Ripple_Waveform.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A half-wave rectifier with an ideal diode is fed from a transformer secondary whose peak voltage is $V_m = 20\ \mathrm{V}$ and drives $R_L = 1\ \mathrm{k\Omega}$. Find $V_{dc}$, $V_{rms}$, the form factor and the ripple factor.

**Given:** V_m = 20 V; R_L = 1 kohm; ideal diode

**Solution:**

1. V_dc = V_m/pi = 20/3.1416 = 6.366 V
2. V_rms = V_m/2 = 10.0 V
3. F = V_rms/V_dc = 10.0/6.366 = 1.571
4. r = sqrt(F^2 - 1) = sqrt(2.4674 - 1) = sqrt(1.4674) = 1.211

> [!success]- Answer
> **$V_{dc} = 6.37\ \mathrm{V}$, $V_{rms} = 10.0\ \mathrm{V}$, $F = 1.571$, $r = 1.21$.**

> [!warning] Trap
> Using V_rms = V_m/sqrt(2) = 14.1 V for the half-wave output. The diode blocks half the cycle, so the correct rms is V_m/2 = 10 V, and the wrong choice drops the ripple factor to 0.84.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20÷π` → **6.366** V = $V_{dc}$ and `20÷2` → **10.0** V = $V_{rms}$, in one `ALPHA` `:` line.
> 2. `10÷6.366` → **1.571** = F, then `√(Ans²−1)` → **1.211** = r.
>
> Half-wave rms is $V_m/2$, not $V_m/\sqrt{2}$; the wrong choice reports r = 0.84.

### P2. The same circuit uses a real silicon diode with a 0.7 V drop. Find $V_{dc}$, the DC load current and the DC power in the load.

**Given:** V_m = 20 V; V_D = 0.7 V; R_L = 1 kohm

**Solution:**

1. Effective peak: V_m - V_D = 20 - 0.7 = 19.3 V
2. V_dc = 19.3/pi = 6.143 V
3. I_dc = V_dc/R_L = 6.143/1000 = 6.14 mA
4. P_dc = V_dc^2/R_L = (6.143)^2/1000 = 37.7 mW

> [!success]- Answer
> **$V_{dc} = 6.14\ \mathrm{V}$, $I_{dc} = 6.14\ \mathrm{mA}$, $P_{dc} = 37.7\ \mathrm{mW}$.**

> [!warning] Trap
> Subtracting the diode drop AFTER computing V_dc (6.366 - 0.7 = 5.67 V). The drop reduces the peak that is integrated, so it must be subtracted before dividing by pi.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20−0.7` → **19.3** V, the peak that actually gets integrated.
> 2. `Ans÷π` → **6.143** V = $V_{dc}$.
> 3. `Ans÷1000` → **6.14** mA = $I_{dc}$; `6.143²÷1000` → **37.7** mW = $P_{dc}$.
>
> Subtracting the drop after the $/\pi$ gives 5.67 V; the drop reduces the peak, not the average.

### P3. A center-tapped full-wave rectifier is fed by a transformer rated 24 V rms across the full secondary (a 12-0-12 winding) with ideal diodes and $R_L = 100\ \Omega$. Find $V_{dc}$, the ripple frequency and the PIV each diode must withstand.

**Given:** secondary = 12-0-12 V rms (24 V total); R_L = 100 ohm; f = 60 Hz; ideal diodes

**Solution:**

1. Peak from the center tap to one end: V_m = 12*sqrt(2) = 16.97 V
2. V_dc = 2V_m/pi = 2(16.97)/3.1416 = 10.80 V
3. Ripple frequency = 2f = 120 Hz
4. PIV = 2V_m = 2(16.97) = 33.9 V

> [!success]- Answer
> **$V_{dc} = 10.80\ \mathrm{V}$, $f_r = 120\ \mathrm{Hz}$, $PIV = 33.9\ \mathrm{V}$.**

> [!warning] Trap
> Taking V_m = 24*sqrt(2) = 33.9 V by using the full secondary voltage. In a center-tapped circuit V_m is measured from the center tap to ONE end, so V_dc and PIV both come out 2x too large.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `12√2` → **16.971** V, the centre-tap-to-one-end peak.
> 2. `2×Ans÷π` → **10.80** V = $V_{dc}$; `2×16.971` → **33.94** V = PIV; ripple is 2f = **120** Hz.
>
> $V_m$ is half the 24 V secondary; entering $24\sqrt{2}$ doubles both $V_{dc}$ and the PIV.

### P4. A bridge rectifier is fed from a 120 V rms secondary with real silicon diodes and $R_L = 1\ \mathrm{k\Omega}$. Find $V_{dc}$ and the required diode PIV rating.

**Given:** V_s,rms = 120 V; V_D = 0.7 V per diode; R_L = 1 kohm

**Solution:**

1. V_m = 120*sqrt(2) = 169.7 V
2. Two diodes conduct in series, so the effective peak is V_m - 2V_D = 169.7 - 1.4 = 168.3 V
3. V_dc = 2(168.3)/pi = 107.1 V (ideal-diode result would be 108.0 V)
4. PIV = V_m = 169.7 V, so specify at least 400 V diodes for margin

> [!success]- Answer
> **$V_{dc} = 107.1\ \mathrm{V}$; $PIV = 169.7\ \mathrm{V}$ (use a 400 V rating).**

> [!warning] Trap
> Subtracting only 0.7 V in a bridge. Current always passes through TWO diodes, so the drop is 1.4 V — a small error in V_dc but a large error in the diode dissipation estimate.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `120√2` → **169.71** V = $V_m$.
> 2. `(Ans−1.4)×2÷π` → **107.1** V = $V_{dc}$ (two diodes conduct, so 1.4 V not 0.7 V).
> 3. PIV is $V_m$ itself: **169.7** V, so specify **400** V parts for margin.
>
> In a bridge the current always crosses two diodes; the drop is $2V_D$.

### P5. A rectifier's output is measured as $V_{dc} = 9.00\ \mathrm{V}$ and $V_{rms} = 10.00\ \mathrm{V}$ across a resistive load. Identify the topology and find the ripple factor.

**Given:** V_dc = 9.00 V; V_rms = 10.00 V

**Solution:**

1. F = V_rms/V_dc = 10.00/9.00 = 1.111
2. The half-wave form factor is 1.571 and the full-wave form factor is 1.111
3. So the circuit is full-wave (center-tap or bridge)
4. r = sqrt(F^2 - 1) = sqrt(1.2346 - 1) = sqrt(0.2346) = 0.484

> [!success]- Answer
> **Full-wave; $r = 0.484$ (the ideal value is 0.482).**

> [!warning] Trap
> Computing r = V_ac/V_dc from V_rms - V_dc = 1.00 V. Ripple is the rms of the AC component, so it must come from the square-root-of-difference-of-squares relation, not from a plain subtraction.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10÷9` → **1.111** = F, which is the full-wave value (half-wave would be 1.571).
> 2. `√(Ans²−1)` → **0.4843** = r.
>
> Ripple is the rms of the AC part: never $V_{rms}-V_{dc} = 1.00$ V.

### P6. Design a bridge rectifier that delivers $V_{dc} = 12\ \mathrm{V}$ at $I_{dc} = 0.5\ \mathrm{A}$ into a resistive load, using silicon diodes. Find the required secondary rms voltage, the load resistance, the average diode current and the PIV.

**Given:** V_dc = 12 V; I_dc = 0.5 A; V_D = 0.7 V per diode

**Solution:**

1. Required peak: V_m = (pi*V_dc)/2 + 2V_D = 18.85 + 1.40 = 20.25 V
2. Secondary rms: V_s,rms = 20.25/sqrt(2) = 14.3 V
3. R_L = V_dc/I_dc = 12/0.5 = 24 ohm
4. Each diode carries half the load current on average: I_D,avg = 0.25 A
5. PIV = V_m = 20.25 V

> [!success]- Answer
> **$V_{s,rms} = 14.3\ \mathrm{V}$, $R_L = 24\ \Omega$, $I_{D,avg} = 0.25\ \mathrm{A}$, $PIV = 20.25\ \mathrm{V}$.**

> [!warning] Trap
> Forgetting the two diode drops and specifying V_s,rms = 12*pi/(2*sqrt(2)) = 13.3 V. The delivered V_dc would then be only 11.0 V.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `π×12÷2+1.4` → **20.25** V = $V_m$, the peak the secondary must supply.
> 2. `Ans÷√2` → **14.32** V rms; `12÷0.5` → **24** $\Omega$; `0.5÷2` → **0.25** A per diode; PIV = **20.25** V.
>
> Dropping the two diode drops specifies 13.3 V rms and delivers only 11.0 V.

### P7. A bridge rectifier with a 100 uF capacitor-input filter is fed from a secondary with $V_m = 20\ \mathrm{V}$ at 60 Hz and drives $R_L = 1\ \mathrm{k\Omega}$. Find the peak-to-peak ripple, the DC output and the ripple factor.

**Given:** V_m = 20 V; C = 100 uF; R_L = 1 kohm; f = 60 Hz; bridge (full-wave)

**Solution:**

1. Ripple frequency f_r = 2f = 120 Hz
2. Solve V_dc = V_m - V_dc/(2 f_r R_L C), i.e. V_dc(1 + 1/(2*120*1000*100e-6)) = 20
3. 1/(2*12) = 0.04167, so V_dc = 20/1.04167 = 19.20 V
4. V_r = V_dc/(f_r R_L C) = 19.20/(120*1000*100e-6) = 1.60 V pp
5. r = V_r/(2*sqrt(3)*V_dc) = 1.60/(3.464*19.20) = 1.60/66.5 = 0.0241

> [!success]- Answer
> **$V_r = 1.60\ \mathrm{V}$ peak-to-peak, $V_{dc} = 19.2\ \mathrm{V}$, $r = 2.41\%$.**

> [!warning] Trap
> Reporting V_dc = V_m = 20 V. A capacitor-input filter sits V_r/2 below the peak on average, and that 0.8 V is exactly the difference between a passing and a failing regulation answer.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷(2×120×1000×100E-6)` → **0.041667**, then `20÷(1+Ans)` → **19.20** V = $V_{dc}$.
> 2. `Ans÷(120×1000×100E-6)` → **1.60** V pp = $V_r$.
> 3. `1.60÷(2√3×19.20)` → **0.02406** = **2.41** % ripple factor.
>
> The filtered average is $V_m-V_r/2$, never $V_m$; the 0.8 V decides pass or fail.

### P8. A half-wave rectifier and a bridge rectifier both use a capacitor-input filter. Both secondaries have $V_m = 20\ \mathrm{V}$. Find the PIV rating each diode needs.

**Given:** V_m = 20 V; capacitor-input filter; ideal diodes

**Solution:**

1. Bridge: the capacitor holds the output near +V_m while each reverse diode blocks the source peak, so PIV = V_m = 20 V
2. Half-wave: the capacitor holds the diode cathode at +V_m while the source swings to -V_m
3. PIV = V_m + V_m = 2V_m = 40 V
4. Specify at least 40 V for the half-wave diode and 20 V for each bridge diode

> [!success]- Answer
> **Half-wave: $PIV = 40\ \mathrm{V}$; bridge: $PIV = 20\ \mathrm{V}$.**

> [!warning] Trap
> Using the no-capacitor PIV (V_m) for a filtered half-wave rectifier. The capacitor roughly doubles the reverse stress, and this is the single most common way a beginner-built supply destroys its diode.

### P9. A center-tapped full-wave rectifier with $V_m = 16.97\ \mathrm{V}$ feeds $R_L = 100\ \Omega$. Find $P_{dc}$, $P_{ac}$ in the load and the efficiency, and compare with the theoretical maximum.

**Given:** V_m = 16.97 V; R_L = 100 ohm; ideal diodes

**Solution:**

1. V_dc = 2V_m/pi = 10.80 V; V_rms = V_m/sqrt(2) = 12.0 V
2. P_dc = V_dc^2/R_L = (10.80)^2/100 = 1.166 W
3. P_ac = V_rms^2/R_L = (12.0)^2/100 = 1.440 W
4. eta = P_dc/P_ac = 1.166/1.440 = 0.810
5. Theoretical maximum is 1/F^2 = 8/pi^2 = 0.812

> [!success]- Answer
> **$P_{dc} = 1.166\ \mathrm{W}$, $P_{ac} = 1.440\ \mathrm{W}$, $\eta = 81.0\%$ against a theoretical maximum of 81.2%.**

> [!warning] Trap
> Using V_dc = 0.318V_m or V_rms = V_m/2 for the full-wave circuit (half-wave values). That gives eta = 40.6% and makes a correct full-wave design look impossible to build.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×16.97÷π` → **10.80** V and `16.97÷√2` → **12.00** V rms.
> 2. `10.80²÷100` → **1.166** W = $P_{dc}$ and `12²÷100` → **1.440** W = $P_{ac}$.
> 3. `1.166÷1.440` → **0.810** against the $8/\pi^2$ maximum of **0.812**.
>
> Half-wave constants here would report 40.6 % and make a correct design look impossible.

### P10. A supply must deliver $I_{dc} = 100\ \mathrm{mA}$ with a peak-to-peak ripple no greater than 1 V from a 60 Hz source. Find the required filter capacitance for (a) a half-wave rectifier and (b) a bridge rectifier.

**Given:** I_dc = 100 mA; V_r <= 1 V pp; f = 60 Hz

**Solution:**

1. V_r = I_dc/(f_r C), so C = I_dc/(f_r V_r)
2. (a) Half-wave: f_r = 60 Hz, C = 0.100/(60*1) = 1.667e-3 F
3. (b) Bridge: f_r = 120 Hz, C = 0.100/(120*1) = 8.33e-4 F
4. The full-wave circuit needs exactly half the capacitance for the same ripple

> [!success]- Answer
> **(a) $C = 1667\ \mu\mathrm{F}$; (b) $C = 833\ \mu\mathrm{F}$.**

> [!warning] Trap
> Using 60 Hz for the bridge ripple frequency. The capacitor is recharged twice per cycle by a full-wave rectifier, so the required capacitance is halved — using 60 Hz doubles the capacitor and the cost.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. (a) `0.1÷60` → **1.667e-3** F = **1667** µF, since $f_r = f$ for half-wave.
> 2. (b) `0.1÷120` → **8.333e-4** F = **833** µF, since $f_r = 2f$ for a bridge.
>
> Using 60 Hz for the bridge doubles the capacitor and the cost.

## Traps & Exam Notes

- **Mixing the half-wave and full-wave DC constants.** $V_{dc} = 0.318V_m$ for half-wave and $0.636V_m$ for full-wave. Choosing the wrong one is a factor-of-2 error that still 'looks reasonable' on the page.
- **Using $V_{rms} = V_m/\sqrt{2}$ for half-wave.** The half-wave load is idle for half the cycle, so $V_{rms} = V_m/2$ and $F = 1.571$. Using $V_m/\sqrt{2}$ yields $r = 0.84$ instead of the correct 1.21.
- **Taking $V_m$ as the full secondary in a center-tap circuit.** The load peak is center-tap-to-one-end, i.e. half the total secondary peak. Doubling it doubles $V_{dc}$ and doubles the PIV.
- **Forgetting that center-tap PIV is $2V_m$.** While one diode conducts, the other holds off the conducting half plus the opposite half in series. A diode rated at $V_m$ will fail.
- **Ignoring the capacitor in a half-wave PIV calculation.** With a capacitor-input filter the half-wave PIV is $2V_m$, not $V_m$. The bridge keeps $PIV = V_m$ even with the filter.
- **Subtracting one diode drop in a bridge.** The bridge conduction path contains two diodes in series, so the effective peak is $V_m - 1.4\ \mathrm{V}$, not $V_m - 0.7\ \mathrm{V}$.
- **Using $f$ instead of $2f$ in a full-wave filter formula.** Both full-wave topologies produce 120 Hz ripple from a 60 Hz line; using 60 Hz doubles the calculated capacitance.
- **Assuming the filtered output equals $V_m$.** A capacitor-input filter averages $V_r/2$ below the peak, so $V_{dc} = V_m - V_r/2$ — the correction is small at light ripple but grows quickly as the load current rises.
- **Applying the 40.6%/81.2% efficiency figures to a real circuit as a promise.** They are maxima for ideal diodes into a resistive load. Real efficiency is reduced by diode conduction loss, transformer winding resistance and leakage inductance; the ratio $1/F^2$ itself is unchanged by a constant diode drop.

## See Also

- [[04_Diode_Models_and_Load_Line]]
- [[06_Filters,_Ripple_Factor_and_PIV]]
- [[08_Zener_Diodes_and_Shunt_Regulators]]
- [[01_Sinusoid,_RMS,_Average,_Form_and_Crest]]

---

[[04_Diode_Models_and_Load_Line|⬅ 04]] · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Filters,_Ripple_Factor_and_PIV|06 ➡]]
