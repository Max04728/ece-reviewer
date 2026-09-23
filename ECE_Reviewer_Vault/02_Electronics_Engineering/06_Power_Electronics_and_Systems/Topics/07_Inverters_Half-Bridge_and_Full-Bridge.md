---
id: ECE-06-07
title: "Inverters: Half-Bridge and Full-Bridge"
part: "02_Electronics_Engineering"
area: "06_Power_Electronics_and_Systems"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Power_Switches_MOSFET,_IGBT,_GTO,_TRIAC]]", "[[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge]]", "[[05_AC_Power,_PQS_and_Triangle]]"]
tags: ["ece", "electronics_engineering", "power_electronics_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Inverters: Half-Bridge and Full-Bridge

> [!abstract] Scope
> Derive the load waveform, fundamental amplitude, harmonic content, output power and device stress of half-bridge and full-bridge single-phase inverters, then extend the six-step result to a three-phase bridge.

## Core Concept

> [!tip] Intuition
> An inverter is a bridge that reverses the polarity of the DC bus across the load. The load therefore sees a rectangle whose average over one switching cycle can be steered by PWM, and whose fundamental is what the LC filter or the motor actually uses.

**The bridge is a polarity switch.** A half-bridge has two switches in series across the DC bus, with the load taken from the midpoint to the bus midpoint - that midpoint is either a split supply or two equal capacitors. Each switch conducts for half a period, so the load sees a square wave of peak $V_{dc}/2$ (peak-to-peak $V_{dc}$, total rms $V_{dc}/2$). A full bridge (H-bridge) has two legs and the load between the leg midpoints; the diagonal pairs conduct alternately, so the load sees $\pm V_{dc}$ - twice the amplitude and therefore *four times* the power of the half-bridge on the same bus and the same load. Both circuits need freewheel diodes for inductive loads, and both must never have the two switches of one leg on together. Replacing the square-wave gate pattern with a sine-triangle comparison (PWM) leaves the power stage untouched: it only moves the harmonics out to the carrier frequency where a small LC filter can remove them.

**Fourier and the numbers to memorise.** A $\pm V_{dc}$ square wave contains only odd harmonics with amplitudes falling as $1/n$: $$v_o = \frac{4V_{dc}}{\pi}\left(\sin\omega t + \frac{1}{3}\sin 3\omega t + \frac{1}{5}\sin 5\omega t + \cdots\right).$$ The fundamental peak is therefore $4V_{dc}/\pi = 1.273V_{dc}$ and the fundamental rms is $$V_{o1,rms} = \frac{2\sqrt{2}}{\pi}V_{dc} = 0.900V_{dc},$$ while the *total* rms is $V_{dc}$ because $|v_o| = V_{dc}$ at every instant. The half-bridge produces exactly half of these numbers ($0.450V_{dc}$ fundamental rms, $V_{dc}/2$ total rms) because its square wave has amplitude $V_{dc}/2$. Total harmonic distortion is the leftover: $$THD = \frac{\sqrt{V_{rms}^2 - V_{o1,rms}^2}}{V_{o1,rms}} = \sqrt{\frac{\pi^2}{8} - 1} = 0.4834,$$ that is 48.3% for any square-wave inverter. If the load is inductive the *current* distortion is far smaller than 48%, because each harmonic current is attenuated by $1/(n\omega L)$.

**PWM synthesis, the modulation index and dead time.** In sinusoidal PWM each leg's duty follows a 60 Hz reference and the carrier is a triangle at $f_c = m_f f_m$, with $m_a = V_m/V_c \le 1$. **Convention used here:** $V_{dc}$ is the whole bus, the load is switched between $+V_{dc}$ and $-V_{dc}$, and $m_a$ is referenced to the carrier peak, so the fundamental peak of the output is $V_{o1,peak} = m_a V_{dc}$ in the linear region (some texts take the half-bus instead and write $m_a V_{dc}/2$ for the same waveform - always state which one a problem uses). At $m_a = 1$ the fundamental peak equals $V_{dc}$, and the absolute two-level ceiling is the square-wave value $4V_{dc}/\pi = 1.273V_{dc}$, so overmodulation buys at most 27% more fundamental while pushing the 5th and 7th harmonics back into the output. Unipolar PWM drives one leg with the reference and the other with its inverse, producing $+V_{dc}$, $0$ and $-V_{dc}$ levels: the first harmonic group moves to $2f_c$, so the filter is smaller and dead-time distortion is lower than in bipolar PWM. Dead time is the blanking interval between turning one switch off and the other on; without it both switches of a leg conduct together (shoot-through) and the bus is shorted through two on-resistances - 300 V across 0.2 ohm is 1500 A. Dead time costs a voltage error of about $V_{dc}t_d/T_s$ per switching instant, which distorts the output and caps the usable duty.

**Power, device stress and the three-phase extension.** For a resistive load the full-bridge square-wave output power is $P_o = V_{rms}^2/R = V_{dc}^2/R$ and the half-bridge only $V_{dc}^2/(4R)$; with an RL or motor load the useful power is carried by the fundamental, $P = V_{o1,rms}I_{o1,rms}\cos\varphi$, and the harmonic currents are limited by the load inductance. A switch in either topology must block the whole bus $V_{dc}$ and carry the peak load current including ripple. Extending to three phases, a six-switch bridge with 120-degree conduction produces a six-step line-to-line waveform with $V_{LL,rms} = \sqrt{2/3}\,V_{dc} = 0.8165V_{dc}$ and a fundamental rms of $\sqrt{6}V_{dc}/\pi = 0.7797V_{dc}$ line-to-line ($0.4502V_{dc}$ line-to-neutral, the same figure as the single-phase half-bridge); its harmonics are the $6k \pm 1$ orders (5th, 7th, 11th, 13th) because the triplens cancel between lines, giving a line-to-line THD of 31.1%.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Fourier series of a square-wave inverter output | $v_o = \frac{4V_{dc}}{\pi}\left(\sin\omega t + \frac{1}{3}\sin 3\omega t + \frac{1}{5}\sin 5\omega t + \cdots\right)$ | Full bridge switching between +V_dc and -V_dc. Odd harmonics only, amplitudes falling as 1/n; the half-bridge series is the same with V_dc replaced by V_dc/2. |
| Full-bridge fundamental rms | $V_{o1,rms} = \frac{2\sqrt{2}}{\pi}V_{dc} \approx 0.900V_{dc}$ | Fundamental component only. This is the number a 60 Hz transformer, filter or motor sees, not the total rms. |
| Half-bridge fundamental rms | $V_{o1,rms} = \frac{\sqrt{2}}{\pi}V_{dc} \approx 0.450V_{dc}$ | V_dc is the TOTAL bus; the load square wave has amplitude V_dc/2. Exactly half the full-bridge value. |
| Full-bridge square-wave total rms and power | $V_{o,rms} = V_{dc}, \qquad P_o = \frac{V_{dc}^2}{R}$ | The load is across +V_dc or -V_dc at all times, so the mean square is V_dc^2. Resistive load; for RL loads use the fundamental with cos phi. |
| Half-bridge square-wave total rms and power | $V_{o,rms} = \frac{V_{dc}}{2}, \qquad P_o = \frac{V_{dc}^2}{4R}$ | Amplitude V_dc/2, so the power is one quarter of the full bridge on the same bus and load. |
| Total harmonic distortion of the square wave | $THD = \sqrt{\frac{\pi^2}{8} - 1} = 0.4834$ | 48.3% for any square-wave inverter, full or half bridge. It is a voltage figure; an inductive load draws far less current distortion. |
| Fundamental peak under sinusoidal PWM | $V_{o1,peak} = m_a V_{dc} \qquad (m_a \le 1)$ | Convention: V_dc is the whole bus, the load swings between +V_dc and -V_dc, and m_a = V_m/V_c is referenced to the carrier peak. Under the half-bus convention the same result reads m_a V_dc/2. |
| Three-phase six-step fundamental, line to line | $V_{LL1,rms} = \frac{\sqrt{6}}{\pi}V_{dc} = 0.7797V_{dc}$ | 120-degree conduction. Line-to-neutral fundamental is 0.4502 V_dc; the total line-to-line rms is 0.8165 V_dc and the THD is 31.1%. |

## Worked Problems

### P1. A full-bridge inverter with $V_{dc} = 200\ \mathrm{V}$ is switched as a 60 Hz square wave into a 10 ohm resistive load. Find the output rms, the fundamental peak and rms, the THD and the output power.

**Given:** V_dc = 200 V; R = 10 ohm; square-wave switching; f = 60 Hz

**Solution:**

1. V_o,rms = V_dc = 200 V (the load is across +/-200 V at every instant)
2. Fundamental peak = 4 V_dc/pi = 4(200)/3.1416 = 254.6 V
3. V_o1,rms = 254.6/sqrt(2) = 180.1 V, which is 0.9003(200) as the formula promises
4. THD = sqrt((V_rms/V_o1,rms)^2 - 1) = sqrt((200/180.1)^2 - 1) = sqrt(0.2337) = 0.4834 -> 48.3%
5. P_o = V_rms^2/R = (200)^2/10 = 4.00 kW
6. Power in the fundamental alone = (180.1)^2/10 = 3.24 kW, so 0.76 kW rides in the harmonics

> [!success]- Answer
> **$V_{o,rms} = 200\ \mathrm{V}$, $V_{o1,peak} = 254.6\ \mathrm{V}$, $V_{o1,rms} = 180.1\ \mathrm{V}$, $THD = 48.3\%$, $P_o = 4.00\ \mathrm{kW}$ (3.24 kW in the fundamental).**

> [!warning] Trap
> Answering $V_{o1,rms} = 200\ \mathrm{V}$ by quoting the total rms as the fundamental. The fundamental is only $0.900V_{dc} = 180.1\ \mathrm{V}$, so a filter or transformer sized for 200 V runs 11% high on flux and the 0.76 kW of harmonic power heats the load instead of doing useful work.

### P2. The same 200 V bus and 10 ohm load are driven by a half-bridge with a split supply. Find the load voltage amplitude, the total and fundamental rms, the output power, and compare with the full bridge.

**Given:** V_dc = 200 V (total bus); split supply or capacitor divider; R = 10 ohm

**Solution:**

1. The midpoint square wave has amplitude V_dc/2 = 100 V
2. V_o,rms = V_dc/2 = 100 V
3. Fundamental peak = 4(100)/pi = 127.3 V, so V_o1,rms = 127.3/sqrt(2) = 90.0 V = 0.4502(200)
4. P_o = (100)^2/10 = 1.00 kW, exactly one quarter of the full bridge's 4.00 kW
5. Each switch still blocks the full bus: when the top switch is on, the bottom switch holds 200 V, not 100 V

> [!success]- Answer
> **$V_{o,peak} = 100\ \mathrm{V}$, $V_{o,rms} = 100\ \mathrm{V}$, $V_{o1,rms} = 90.0\ \mathrm{V}$, $P_o = 1.00\ \mathrm{kW}$; each switch blocks $200\ \mathrm{V}$.**

> [!warning] Trap
> Saying each switch blocks $V_{dc}/2 = 100\ \mathrm{V}$. The load amplitude is halved, but the off switch holds the entire 200 V bus, so a 100 V device is destroyed on the first cycle.

### P3. A full bridge with $V_{dc} = 300\ \mathrm{V}$ uses sinusoidal PWM with $m_a = 0.8$, $m_f = 21$ and a 60 Hz reference. Find the carrier frequency, the fundamental peak and rms, the lowest harmonic sidebands and check that the inverter is in the linear region.

**Given:** V_dc = 300 V; m_a = 0.8; m_f = 21; f_m = 60 Hz; carrier peak = m_a reference

**Solution:**

1. Carrier frequency f_c = m_f f_m = 21(60) = 1260 Hz
2. Fundamental peak = m_a V_dc = 0.8(300) = 240 V
3. V_o1,rms = 240/sqrt(2) = 169.7 V
4. Sidebands at f_c +/- k f_m: 1260 +/- 60 = 1200 Hz and 1320 Hz, then 1260 +/- 120 = 1140 Hz and 1380 Hz
5. m_a = 0.8 <= 1, so the output is in the linear region and the 60 Hz component is proportional to m_a

> [!success]- Answer
> **$f_c = 1260\ \mathrm{Hz}$, $V_{o1,peak} = 240\ \mathrm{V}$, $V_{o1,rms} = 169.7\ \mathrm{V}$, first sidebands at 1200 Hz and 1320 Hz.**

> [!warning] Trap
> Reporting $V_{o1,rms} = m_a V_{dc} = 240\ \mathrm{V}$ by forgetting the $\sqrt{2}$. The 240 V is a peak; the rms is 169.7 V, so the lazy answer oversizes the 60 Hz output by 41%.

### P4. A 300 V bridge runs at $f_s = 20\ \mathrm{kHz}$ with a dead time of $t_d = 1.5\ \mu\mathrm{s}$ and switches of $R_{DS(on)} = 0.1\ \Omega$. Find the switching period, the maximum duty, the dead-time voltage error, and the shoot-through current if dead time were omitted.

**Given:** V_dc = 300 V; f_s = 20 kHz; t_d = 1.5 us; R_DS(on) = 0.1 ohm

**Solution:**

1. T_s = 1/f_s = 1/20000 = 50.0 us
2. Dead time as a fraction of the period: 1.5/50 = 3.0%, and there are two dead times per period, so D_max = 1 - 2(0.03) = 0.94
3. Dead-time voltage error per switching instant = V_dc t_d/T_s = 300(0.03) = 9.0 V
4. As a fraction of a 240 V fundamental peak that error is 9.0/240 = 3.75%
5. Shoot-through: the two on-resistances in series give about 0.2 ohm, so the current would approach 300/0.2 = 1500 A

> [!success]- Answer
> **$T_s = 50.0\ \mu\mathrm{s}$, $D_{max} = 0.94$, dead-time error $9.0\ \mathrm{V}$ per switching instant (3.75% of a 240 V fundamental peak), shoot-through about 1.5 kA.**

> [!warning] Trap
> Leaving dead time out of the duty budget. A design that needs $D = 0.97$ at the bottom of the input range can never reach it once 3% dead time is inserted, so the output sags even though the error amplifier is saturated.

### P5. A three-phase bridge with $V_{dc} = 400\ \mathrm{V}$ runs in 120-degree conduction at 60 Hz. Find the line-to-line rms, the fundamental line-to-line and line-to-neutral rms, and the line-to-line THD.

**Given:** V_dc = 400 V; f_out = 60 Hz; 120 degree conduction; six-step waveform

**Solution:**

1. Total line-to-line rms of the six-step waveform: V_LL,rms = 0.8165 V_dc = 0.8165(400) = 326.6 V
2. Fundamental line-to-line rms = sqrt(6) V_dc/pi = 2.4495(400)/3.1416 = 311.9 V = 0.7797 V_dc
3. Fundamental line-to-neutral rms = 311.9/sqrt(3) = 180.1 V = 0.4502 V_dc
4. THD = sqrt((326.6/311.9)^2 - 1) = sqrt(1.0965 - 1) = sqrt(0.0965) = 0.311 -> 31.1%
5. Lowest harmonics are the 5th (300 Hz) and 7th (420 Hz); the triplen harmonics cancel in the line-to-line voltage

> [!success]- Answer
> **$V_{LL,rms} = 326.6\ \mathrm{V}$, $V_{LL1,rms} = 311.9\ \mathrm{V}$, $V_{ph1,rms} = 180.1\ \mathrm{V}$, $THD = 31.1\%$, first harmonics at 300 Hz and 420 Hz.**

> [!warning] Trap
> Using the single-phase square-wave figures for the three-phase bridge. The fundamental here is $0.7797V_{dc}$ line-to-line - not $0.900V_{dc}$ - and the 3rd harmonic is absent from the line-to-line voltage, so including it inflates both the THD and the filter design.

## Traps & Exam Notes

- **Using $V_{dc}$ as the fundamental rms.** For a 200 V bus the square-wave fundamental is $0.9003(200) = 180.1\ \mathrm{V}$, not 200 V; a 60 Hz filter or transformer sized for the total rms runs 11% high on flux.
- **Forgetting the half-bridge factor of 2.** The midpoint square wave has amplitude $V_{dc}/2$, so its fundamental rms is $0.4502V_{dc} = 90.0\ \mathrm{V}$ on a 200 V bus and the power is $V_{dc}^2/(4R) = 1.00\ \mathrm{kW}$ - a quarter of the full bridge's 4.00 kW.
- **Thinking the half-bridge switch blocks $V_{dc}/2$.** Only the load voltage is halved; the off switch holds the whole bus (200 V on a 200 V bus), so a half-rated device fails immediately.
- **Omitting dead time.** With both switches of a leg on, a 300 V bus through about 0.2 ohm of on-resistance draws roughly 1500 A - the devices fail long before protection acts - and dead time also caps the duty at $D_{max} = 1 - 2t_df_s = 0.94$ at 20 kHz with 1.5 us.
- **Applying the 48.3% voltage THD to the current.** An inductive load attenuates the n-th harmonic current by $1/(n\omega L)$, so the current is nearly sinusoidal while the voltage is not; quoting 48.3% current distortion over-specifies the filter.
- **Believing overmodulation raises the fundamental without limit.** The linear law $V_{o1,peak} = m_aV_{dc}$ stops at $m_a = 1$; the absolute ceiling is the square-wave value $4V_{dc}/\pi = 1.273V_{dc}$ (only 27% more) and beyond $m_a = 1$ the 5th and 7th harmonics reappear.
- **Adding triplen harmonics to a three-phase line-to-line output.** The 3rd, 9th and 15th cancel between lines, so including them inflates the predicted THD and the filter size.
- **Assuming a capacitor divider can feed an unbalanced load.** Any DC component of load current charges one capacitor and discharges the other, walking the midpoint away from $V_{dc}/2$ and clipping one half of the output waveform.

## See Also

- [[08_PWM_Techniques]]
- [[01_Power_Switches_MOSFET,_IGBT,_GTO,_TRIAC]]
- [[15_Power_Amplifiers_Classes_A,_B,_AB,_C]]
- [[02_Thermal_Resistance_and_Heat_Sinking]]

---

[[06_Buck-Boost_Converter|⬅ 06]] · [[_MOC_Power_Electronics_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[08_PWM_Techniques|08 ➡]]
