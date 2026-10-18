---
title: Test Equipment — Deep Treatment
type: topic
updated: 2026-10-18
---

# 02 — Test Equipment (deep)

Meter internals and loading, DMM architecture and specifications, oscilloscope operation including **XY mode and Lissajous figures**, counters, generators, spectrum analysis, component testers, bridges, TDR, and calibration. Every number below is either a standard value or worked out from the circuit.

## 0. Measurement fundamentals

| Term | Meaning |
| --- | --- |
| **True value** | Never known; only approached |
| **Accuracy** | Closeness of a reading to the true value — a *bias* quality |
| **Precision** | Repeatability of readings — a *scatter* quality |
| **Resolution** | Smallest change the instrument can display |
| **Error** | Reading − true value; the **correction** is the negative of it |

A reading can be precise and wrong (an offset meter), or accurate but noisy. The spec sheet states accuracy; the display states resolution; neither implies the other.

**Systematic vs random error.** Systematic error (calibration offset, meter loading) is reproducible and can be **computed and corrected** — that is why the loading error in §1 is predictable before you connect the probe. Random error (thermal noise, contact resistance, quantisation) is treated statistically and shrinks only by averaging.

**Averaging.** Averaging $n$ readings of a random-noise-limited measurement improves the uncertainty by $\sqrt{n}$: 100 readings buy a factor of 10, and no more. That is the whole basis of the "average" key.

**Significant figures.** A display of `12.34 V` claims 0.01 V resolution; writing `12.3437 V` invents precision that does not exist. Round to the tolerance, not to the calculator.

## 1. Analog meters — how the scale and its resistance are built

The classical movement is the **d'Arsonval** (permanent-magnet moving-coil) galvanometer: a coil in a magnetic field, deflected by the **average (DC)** current through it. An analog AC meter therefore **rectifies first** and reads the average of the rectified wave scaled by 1.11 — correct for a sine only (§2).

Typical movement: $I_{fs}$ = **50 µA**, $R_m$ = **100 Ω**, so full-scale voltage is just **5 mV**. Everything else on the meter face is shunts and multipliers built around that movement.

### Ammeter ranges — the shunt

The shunt carries the current the movement cannot:

$$R_{sh} = \frac{I_m R_m}{I - I_m}$$

**P1 — Extending a movement to a 10 mA range.**
A moving-coil movement has a full-scale current of 1 mA and a coil resistance of 100 Ω. It is to be used as an ammeter reading full scale when 10 mA flows through the instrument.

**Given:** movement current $I_m = 1\ \text{mA}$; movement resistance $R_m = 100\ \Omega$; required full-scale current $I = 10\ \text{mA}$
**Find:** the shunt resistance $R_{sh}$, in ohms
**Solution:** the shunt carries the excess current, $I - I_m = 9\ \text{mA}$, and the voltage across it equals the voltage across the movement, $I_mR_m = 100\ \text{mV}$:

$$R_{sh} = \frac{I_m R_m}{I - I_m} = \frac{(1\ \text{mA})(100\ \Omega)}{10\ \text{mA} - 1\ \text{mA}} = \frac{100\ \text{mV}}{9\ \text{mA}} = 11.1\ \Omega$$

**Answer:** $R_{sh} = 11.1\ \Omega$ — at 10 mA the movement takes its 1 mA and the remaining 8.9 mA passes through the shunt.

A multi-range meter uses an **Ayrton (universal) shunt** — a tapped resistor chain so that switching ranges never opens the movement circuit and the pointer cannot slam.

### Voltmeter ranges — the multiplier

$$R_{mult} = \frac{V_{range}}{I_{fs}} - R_m$$

**P2 — Extending a movement to a 10 V range.**
A movement has a full-scale current of 50 µA and a coil resistance of 100 Ω. It is to be used as a voltmeter reading full scale at 10 V.

**Given:** $I_{fs} = 50\ \mu\text{A}$; $R_m = 100\ \Omega$; required full-scale voltage $V = 10\ \text{V}$
**Find:** the series multiplier resistance $R_{mult}$, in ohms
**Solution:** the whole string must carry $I_{fs}$ at 10 V, so the total resistance is $V/I_{fs}$; the multiplier is that total less the movement's own 100 Ω:

$$R_{total} = \frac{10\ \text{V}}{50\ \mu\text{A}} = 200\ \text{k}\Omega \qquad R_{mult} = 200\ \text{k}\Omega - 100\ \Omega \approx 199.9\ \text{k}\Omega$$

**Answer:** $R_{mult} \approx 199.9\ \text{k}\Omega$ — a 200 kΩ/10 V instrument, i.e. **20 000 Ω/V**.

### Sensitivity and input resistance

$$\text{sensitivity} = \frac{1}{I_{fs}}\ [\Omega/\text{V}] \qquad R_{in} = \text{sensitivity} \times V_{range}$$

A 50 µA movement gives **20 000 Ω/V** — the familiar "20k ohms per volt" meter. On the 10 V range: **200 kΩ**. On the 50 V range: **1 MΩ**.

### The loading effect, derived

Model any node as a Thevenin source $V_{th}$ behind $R_{th}$; connect a meter of resistance $R_m$:

$$V_{read} = V_{th}\frac{R_m}{R_{th}+R_m} \qquad \text{fractional error} = -\frac{R_{th}}{R_{th}+R_m}$$

| $R_{th}$ at the node | Meter | $R_m$ | Reads, for a true 10 V | Error |
| ---: | --- | ---: | ---: | ---: |
| 100 kΩ | Analog 20 kΩ/V, 10 V range | 200 kΩ | 6.67 V | **−33%** |
| 100 kΩ | Analog, 50 V range | 1 MΩ | 9.09 V | −9% |
| 100 kΩ | DMM | 10 MΩ | 9.90 V | −1% |
| 1 MΩ | DMM | 10 MΩ | 9.09 V | **−9%** |

Two consequences:

1. On an **analog** meter the error depends on the **range selected** — use the highest range that still deflects past mid-scale.
2. A 10 MΩ DMM is **not high impedance** on a megohm node. Above roughly 100 kΩ of source resistance, work out what the meter does to the circuit before believing the number.

> [!warning] Trap
> "The meter reads low, so the circuit is faulty." Compute the loading error first — a reading 33% low on a 100 kΩ node from a 20 kΩ/V meter is the **meter's** fault.

### Burden voltage — the ammeter's cost

An ammeter is a resistor in series. On a 1 A range with 0.1 Ω of shunt it drops **0.1 V** and burns 0.1 W. In a 3.3 V logic rail that drop can brown the circuit out and change the current you were measuring. Hence a clamp for load current, and why a µA range has a far larger burden than a mA range.

## 2. Digital multimeters

### Architecture

**Input → divider/ranging → ADC → display**, plus a constant-current source for ohms, a comparator for diode/continuity, and a true-RMS converter on better models.

| ADC type | Principle | Character |
| --- | --- | --- |
| **Dual-slope integrating** | Integrate the unknown for a fixed time, de-integrate against a reference, count the de-integration time | Slow but **rejects mains hum**; superb linearity; the bench-DMM standard |
| Successive approximation | Binary search against a DAC | Fast; cheap handhelds and scopes |
| Sigma-delta | Oversampling and decimation | High resolution, low noise; 6½-digit instruments |

**Why dual-slope rejects hum:** when the integration window equals one whole mains cycle (20 ms at 50 Hz, 16.67 ms at 60 Hz), the positive and negative halves of the superimposed hum integrate to zero. The hum is averaged out, not filtered.

### Counts, digits and resolution

| Display | Counts | Largest reading | On the 4 V range |
| --- | ---: | ---: | --- |
| 3½ digit | 2000 | 1999 | 10 mV |
| 3¾ digit | 4000 | 3999 | 1 mV |
| 4½ digit | 20 000 | 19 999 | 100 µV |

$$\text{resolution} = \frac{\text{full-scale range}}{\text{counts}}$$

### Accuracy arithmetic

**P3 — Converting a specification into an error band.**
A DMM specified `±(0.5% of reading + 2 digits)` displays **12.34 V** on its 20 V range, where one digit is 0.01 V.

**Given:** reading = 12.34 V; gain error = 0.5% of reading; offset error = 2 digits; 1 digit = 0.01 V
**Find:** the total uncertainty, in volts
**Solution:** the two error terms are independent and add directly:

$$0.005(12.34\ \text{V}) = 0.062\ \text{V} \qquad 2(0.01\ \text{V}) = 0.020\ \text{V}$$

$$U = 0.062 + 0.020 = 0.082\ \text{V}$$

**Answer:** **12.34 V ± 0.08 V** (true value between 12.26 V and 12.42 V). The two-digit term outweighs the percentage term at the bottom of a range — down-range a small reading to shrink it.

The "+2 digits" is a **constant offset in volts**, so it dominates at the bottom of a range and vanishes at the top. That is the argument for down-ranging a small reading.

### True RMS and crest factor

$$V_{rms} = \sqrt{\frac{1}{T}\int_0^T v^2(t)\,dt}$$

- **Average-responding**: mean of the rectified wave × **1.11**. Exactly right for a sine, wrong for everything else.
- **True RMS**: the integral, computed digitally or thermally — correct for any shape *within its crest-factor rating*, typically 3:1, sometimes 7:1.

$$\text{crest factor} = \frac{V_{peak}}{V_{rms}}$$

Sine 1.414 · square 1.0 · triangle 1.732 · SCR/dimmer output often above 4, which exceeds a cheap TRMS meter's rating and quietly produces a wrong answer.

| Waveform | $V_{rms}$ | Average-responding reads | Error |
| --- | ---: | ---: | ---: |
| Sine | $0.707V_p$ | $0.707V_p$ | 0 |
| Square | $1.000V_p$ | $0.900V_p$ | **−10%** |
| Triangle | $0.577V_p$ | $0.555V_p$ | −3.8% |

On a **phase-controlled (dimmer/SCR)** output the average-responding meter can read **30–50% low** — the exam's favourite way of testing whether you know which meter you are holding.

### Function details

| Function | Implementation | Caution |
| --- | --- | --- |
| Ohms | Known current, measure the drop | Live circuit or a parallel path gives a wrong answer |
| Continuity | Comparator, beeps below ~30–50 Ω | A beep does not prove the conductor carries load |
| Diode test | ~1 mA drive, forward drop in mV | In-circuit readings mislead |
| Capacitance | Charges with known current, times the ramp | Discharge the part first |
| Min/max/peak | Captures extremes **between samples** | A spot reading can miss a 2 ms glitch completely |
| Autorange | Re-selects each reading | Slower; use manual range for stability |

## 3. Clamp meters and current sensing

| Type | Sensor | Works on |
| --- | --- | --- |
| AC clamp | **Current transformer** | AC only |
| **Hall-effect** clamp | Hall sensor in the core gap | **DC and AC** |
| Rogowski coil | Air-core, integrates $di/dt$ | AC, very high current, wide bandwidth |
| Leakage clamp | High-resolution core | mA earth leakage — finds a fault without disconnecting |

The jaws respond to the **net** current enclosed. Clamp a two-wire cord and go and return cancel — **zero**. Clamp a three-phase bundle and you read only the residual, which is precisely the leakage current. Clamp **one conductor**.

> [!warning] Trap
> Reporting zero as a broken meter. Zero is the correct answer for a two-wire cord, and also for a balanced three-phase bundle.

## 4. Oscilloscope

### Analog vs digital storage

| | Analog | DSO |
| --- | --- | --- |
| Trace | Phosphor, fades | Digital memory, freezable |
| Single events | Missed | **Captured** |
| Measurement | By eye, graticule | Cursors, automatic |
| Artefacts | None | **Aliasing, interpolation, low sample rate** |

### Sampling, Nyquist, aliasing

$f_s \ge 2f_{max}$ is the Nyquist minimum; practical instruments use **2.5–10× bandwidth**. Sample too slowly and a fast sine folds down into a slow one — **aliasing** — which looks like a perfectly real signal. Symptoms: the displayed frequency changes in steps as the timebase changes, or no trigger setting gives a stable trace.

$$t_{capture} = \frac{\text{memory depth}}{\text{sample rate}}$$

### Bandwidth and rise time

$$t_r \approx \frac{0.35}{BW} \qquad BW \approx \frac{0.35}{t_r}$$

**P4 — Can this scope show this edge?**
A **100 MHz** oscilloscope is used to observe a logic pulse whose true rise time is **1 ns**.

**Given:** oscilloscope bandwidth $BW = 100\ \text{MHz}$; signal rise time $t_{sig} = 1\ \text{ns}$
**Find:** (a) the scope's own rise time; (b) the rise time actually displayed
**Solution:** bandwidth and rise time are inverse, $BW \approx 0.35/t_r$; independent rise times combine in quadrature:

$$t_{scope} = \frac{0.35}{100\ \text{MHz}} = 3.5\ \text{ns} \qquad t_{disp} = \sqrt{t_{sig}^2 + t_{scope}^2} = \sqrt{(1\ \text{ns})^2 + (3.5\ \text{ns})^2} = 3.64\ \text{ns}$$

**Answer:** the scope shows **3.64 ns** — nearly all of it its own. To trust a 1 ns edge the scope needs roughly 3–5× the bandwidth that $0.35/t_r$ gives, i.e. 350–500 MHz, not 100 MHz.

### Probes

| Probe | Division | Input R | Input C | Use |
| --- | --- | ---: | ---: | --- |
| ×1 | 1 | ~1 MΩ | ~100 pF | Low frequency; **loads heavily** |
| **×10** | 10 | **10 MΩ** | ~10–15 pF | Default; multiply the screen reading by 10 |
| ×100 | 100 | 100 MΩ | few pF | High voltage, minimal loading |

The ×10 probe's real gift is **10× lower capacitance**, not the division — that moves the loading roll-off a decade higher. Its **compensation trimmer** is set on the scope's own ~1 kHz square wave: under-compensated = rounded corners, over-compensated = overshoot and spikes, correct = **flat top**. Recompensate whenever a probe changes channel.

**Ground-lead inductance** is why fast-edge measurements ring: the clip lead plus probe capacitance forms a resonant loop. Use the shortest ground lead or a ground-spring tip.

> [!warning] Trap
> Reading a ×10 probe as ×1. At 2 V/div with a ×10 probe, a 5-division sine is 10 V on screen → **100 V peak-to-peak**, i.e. **35.4 V RMS** — not 7.07 V RMS. The most-missed scope item on the paper.

### Controls

| Control | Effect |
| --- | --- |
| V/div | Amplitude scale |
| Time/div | Time scale |
| Position | Moves the trace; does not change the reading |
| **Trigger level** | Voltage the sweep starts at — the trace stands still only if crossed every cycle |
| Trigger source | CH1, CH2, external, line |
| **AC coupling** | Blocks DC — the setting for **ripple on a rail** |
| **DC coupling** | Shows DC level plus signal |
| **GND** | Shows the zero reference; use it to set the reference line |
| Invert / add / A−B | CH2 inversion, sum, difference |
| Math / FFT | Arithmetic and spectrum, subject to the same sample-rate limits |

### Reading the graticule

| Quantity | Expression |
| --- | --- |
| Peak-to-peak | vertical divisions × V/div |
| Peak | $V_{pp}/2$ |
| RMS (sine) | $0.354V_{pp}$ |
| Period | horizontal divisions × time/div |
| Frequency | $f = 1/T$ |
| Phase | $\phi = (\Delta t/T)\times360^\circ$ |
| Rise time | 10% → 90% crossing time |
| Duty cycle | pulse width / period |

**P5 — Amplitude from the graticule.**
A sine wave spans **6 vertical divisions** on a scope set to **0.5 V/div**, with a **×10** probe. The input is DC-coupled and the trace is centred.

**Given:** vertical deflection = 6 div; sensitivity = 0.5 V/div; probe attenuation = 10×
**Find:** the peak-to-peak and RMS voltage at the probe tip
**Solution:** screen volts, then multiply out the probe division:

$$V_{pp} = 6\ \text{div} \times 0.5\ \frac{\text{V}}{\text{div}} \times 10 = 30\ \text{V}_{pp} \qquad V_{pk} = 15\ \text{V} \qquad V_{rms} = 0.707(15\ \text{V}) = 10.6\ \text{V}$$

**Answer:** **30 V peak-to-peak**, i.e. **10.6 V RMS**.
**P6 — Frequency from the graticule.**
One complete cycle of a waveform occupies **4 horizontal divisions** at a timebase setting of **0.2 ms/div**.

**Given:** cycle length = 4 div; timebase = 0.2 ms/div
**Find:** the period and frequency
**Solution:** period = divisions × time/div; frequency is its reciprocal:

$$T = 4\ \text{div} \times 0.2\ \frac{\text{ms}}{\text{div}} = 0.8\ \text{ms} \qquad f = \frac{1}{0.8\times10^{-3}\ \text{s}} = 1250\ \text{Hz}$$

**Answer:** **T = 0.8 ms, f = 1.25 kHz**.
**P7 — Phase difference from two traces.**
Two **1 kHz** sine waves are displayed on the two channels; the second crosses its positive-going zero 0.1 ms after the first.

**Given:** frequency = 1 kHz; time displacement between zero crossings $\Delta t = 0.1\ \text{ms}$
**Find:** the phase difference in degrees
**Solution:** one full cycle is 360°, so the phase fraction equals the time fraction:

$$T = \frac{1}{1000\ \text{Hz}} = 1\ \text{ms} \qquad \phi = \frac{0.1\ \text{ms}}{1\ \text{ms}} \times 360^\circ = 36^\circ$$

**Answer:** the second signal **lags by 36°**. In XY mode the same 36° appears as an ellipse with $\sin 36^\circ$ = 0.59, i.e. its vertical intercept is 0.59 of the peak amplitude.

### XY mode and Lissajous figures

**XY mode bypasses the timebase.** CH1 drives the beam horizontally (X), CH2 vertically (Y), and the spot plots the *relationship between two signals* rather than one signal against time.

**Setup checklist:** both channels DC-coupled, **V/div identical on both**, both traces centred, amplitudes on-screen, trigger off or on either channel.

#### Same frequency — phase from the shape

| Phase | 1:1 pattern |
| --- | --- |
| **0°** | Straight line, **positive** slope |
| **90°** | Circle (equal amplitudes), or an ellipse with axes on the graticule |
| **180°** | Straight line, **negative** slope |
| Other | Tilted ellipse |

With equal amplitudes $A$:

$$\sin\phi = \frac{y_0}{A}$$

where $y_0$ is the ellipse's intercept on the **vertical axis** through the centre. 0.5$A$ → 30°; 0.707$A$ → 45°; full amplitude → 90°; zero → 0° or 180°, and the slope sign decides which.

#### Different frequencies — ratio from tangencies

The figure stands still only when the frequencies are in a small integer ratio. Read it by counting **touches on the top** against **touches on a side**, over one complete closed pattern:

$$\frac{f_Y}{f_X} = \frac{\text{touches on top (or bottom)}}{\text{touches on the right (or left)}} = \frac{\text{horizontal tangencies}}{\text{vertical tangencies}}$$

Both forms agree — counting all horizontal tangencies doubles both counts. Verified against generated patterns: 1:1 → 2/2; 2:1 → 4/2; 3:1 → 6/2; 1:2 → 2/4; 3:2 → 6/4; 2:3 → 4/6; 3:4 → 6/8.

| $f_Y : f_X$ | Pattern |
| --- | --- |
| 1:1 | Line or ellipse |
| **2:1** | Two lobes stacked vertically — the figure-8 on its side |
| 1:2 | Two lobes side by side |
| 3:1 | Three lobes stacked |
| 3:2 | Closed loop with 3 top touches and 2 side touches |
| 4:3 | Multi-loop rosette |

**Why it is used.** The Lissajous method compares a signal against a **standard** — a generator whose frequency a counter knows — so it measures a **frequency ratio** to a fraction of a percent without any accurate timebase. Classical uses: calibrating a generator against an oscillator; measuring the phase shift of an amplifier, filter or transformer; checking whether two channels or probes are matched; tuning a resonant circuit to a reference.

**Drift is information.** A crawling or rotating figure means the frequencies are close but unequal, and the direction of rotation tells you which signal is **higher**. A slowly closing 1:1 ellipse is a small frequency offset; lobes that slide are a small ratio error.

> [!warning] Traps in XY mode
> 1. **Swapped channels** invert the ratio — 2:1 becomes 1:2, lobes in the wrong plane.
> 2. **Unequal V/div** turns a would-be circle into an ellipse and corrupts every phase reading.
> 3. A **×1 / ×10 probe mix** does the same electrically: a 10× amplitude mismatch that reads as a phase or ratio error.
> 4. **No time measurement exists** in XY mode — the ramp is gone, so period and rise time are unreadable.
> 5. A **DC offset** shifts the pattern off-centre and hides tangencies; centre with the position controls.
> 6. A **drifting** ellipse is a frequency difference, not a phase — never report a phase from a figure that will not stand still.

### Floating and differential measurements

The scope's ground clip is bonded to **earth** through the mains lead. Clip it to a node that is not at earth potential and you create a **short through the instrument** — the standard way to destroy a scope and a circuit together. A variac or isolation transformer does **not** make this safe: isolating the device floats the *device*, and floating the scope makes its chassis live.

Safe routes: a **differential probe**, the **A−B math function** (limited by common-mode range and gain match), or measuring each node to ground in turn. For current, a **current probe** never needs the circuit broken.

## 5. Frequency counters

$$\text{count} = f\, t_{gate} \qquad \text{relative error} = \pm\frac{1}{f\,t_{gate}}$$

| Signal | Gate | Resolution | Relative error |
| --- | ---: | ---: | ---: |
| 1 MHz | 1 s | 1 Hz | **1 ppm** |
| 1 MHz | 10 s | 0.1 Hz | 0.1 ppm |
| 100 Hz | 1 s | 1 Hz | **1%** |
| 100 Hz | 10 s | 0.1 Hz | 0.1% |

The ±1 count is why a fixed-gate counter is poor at low frequency; good counters switch to **reciprocal (period) counting** there, timing one period against a fast internal clock. Absolute accuracy then rests on the **timebase** (±1 ppm TCXO typical, better for OCXO).

Other modes: **prescaler** division for microwave inputs, **ratio A/B**, **totalise**, and an input low-pass filter so hum does not cause false triggering.

## 6. Signal sources

| Instrument | Output | Use |
| --- | --- | --- |
| **Function generator** | Sine, square, triangle, pulse; Hz–MHz | Amplifiers, filters |
| **RF signal generator** | Modulated carrier (AM/FM) | Receiver sensitivity and alignment |
| **Sweep generator** | Frequency swept over a band | Filter/IF alignment on a scope |
| Arbitrary waveform (AWG) | Any stored waveform | Digital and modem testing |

Specifications that matter: frequency accuracy, **output impedance (normally 50 Ω)**, amplitude flatness, harmonic distortion, square-wave rise time, maximum attenuation.

**Source-impedance arithmetic** — the classic trap. A generator set to 1 V into 50 Ω delivers:

| Load | Delivered |
| --- | --- |
| 50 Ω (matched) | 1 V |
| Open / high-Z scope input | **2 V** |
| 50 Ω scope input via a 50 Ω through-terminator | 0.5 V |

"The generator says 1 V" means nothing until the load is known.

## 7. Spectrum analyser and RF measurement

A scope shows one signal against time and cannot resolve a harmonic riding on a carrier; the analyser plots **amplitude against frequency** for exactly that.

| Parameter | Meaning |
| --- | --- |
| Span | Total frequency range displayed |
| **RBW** | Resolution bandwidth — the ability to separate close components |
| Sweep time | Must be long enough for the RBW filter to settle; too fast distorts the response |
| **DANL** | Displayed average noise level — the sensitivity floor |
| Reference level | Top graticule line |

Uses: harmonic and **THD** measurement, spurious and intermodulation products, occupied bandwidth, modulation depth, and — with a **tracking generator** — filter response and return loss.

Other RF instruments: **power meter** (thermistor or diode sensor, true average power), **directional coupler**, **VSWR / return-loss bridge**, fixed **attenuator pads**, **dummy load**. Never key a transmitter into an open port.

$$\mathrm{RL(dB)} = -20\log_{10}\lvert\Gamma\rvert \qquad VSWR = \frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$$

20 dB return loss is VSWR **1.22**; 10 dB is **1.93**; 0 dB is an open.

## 8. Component testers

| Instrument | Measures | Key point |
| --- | --- | --- |
| **LCR meter** | L, C, R at a selected frequency | The value is **frequency-dependent**: C at 120 Hz ≠ C at 1 kHz |
| Q/D meter | Q factor, dissipation factor | $Q = 1/D$; the loss angle |
| **ESR meter** | Equivalent series resistance | Finds a **dried electrolytic whose capacitance still reads normal** — the fault that actually explains the symptom |
| Capacitance meter | C only | Discharge first |
| Insulation tester (megger) | MΩ at 250/500/1000 V | **De-energised only** |
| Earth resistance tester | Ground electrode resistance | Three-point fall-of-potential |
| Transistor tester / curve tracer | hFE, junction drops, curves | Catches leakage a diode test misses |
| Cable tester / TDR | Continuity, mapping, fault distance | §9 |

**Two-wire vs four-wire (Kelvin) sensing.** Two-wire measurement adds lead resistance and lead inductance to the reading — irrelevant at 1 µF, fatal at 0.01 Ω. Four-wire puts the current and sense leads on separate contacts so lead resistance cancels. Precision low-ohm and milli-ohm work uses Kelvin clips.

**Series vs parallel loss models.** A lossy capacitor is modelled as C with series R (low impedance, large values) or parallel R (high impedance). The meter must use the same model as the specification, or the numbers cannot be compared.

### Insulation resistance in service

- Applies **DC** and reads leakage; DC rather than AC so the result is leakage, not capacitance.
- Voltage against the system: **250 V** for 120 V circuits, **500 V** for 440 V, **1000 V** for medium voltage.
- Practical floor ≈ **1 MΩ per kV plus 1 MΩ**; a winding near the floor is faulty.
- **Polarisation Index** = $R_{10\mathrm{min}}/R_{1\mathrm{min}}$; healthy **> 2**. **DAR** = $R_{60s}/R_{30s}$, healthy ≈ **1.4**.
- Insulation resistance roughly **halves per 10 °C** rise — correct for temperature before comparing.
- A **spot reading proves little**; the trend across months is the diagnostic. That is why the maintenance log exists.

> [!warning] Trap
> Meggering a board. It injects hundreds of volts into semiconductors. Isolate the electronics, disconnect the winding, discharge, then test.

### Bridges — measurement by null

Accuracy comes from the **ratio arms**, not from the detector:

| Bridge | Measures | Balance |
| --- | --- | --- |
| **Wheatstone** | Medium resistance | $R_1/R_2 = R_3/R_x$ |
| **Kelvin double** | Very low resistance | Four-terminal; cancels lead and contact resistance |
| **Wien** | Capacitance | Frequency-dependent; also the Wien oscillator |
| **Maxwell** | Inductance | Compares L against a known C |
| **Schering** | Capacitance and dissipation factor | High-voltage insulation testing |

## 9. Cables and fibre

**TDR:** sends a pulse, times the reflection, halves for the round trip:

$$d = \frac{v\,\Delta t}{2} \qquad v = \text{velocity factor}\times c$$

Velocity factor typically **0.66–0.80**. Signatures: an **open** reflects with the same polarity, a **short** reflects inverted, a correctly terminated cable reflects nothing.

**Fibre:**

| Instrument | Measures |
| --- | --- |
| Optical power meter | Received power in **dBm** |
| **OTDR** | Loss and distance of each splice, connector and break |
| Light source | Reference launch for a loss test |
| Visual fault locator | Red laser — finds a bend or a break |

$$\mathrm{dBm} = 10\log_{10}\frac{P}{1\,\mathrm{mW}} \qquad \mathrm{loss(dB)} = 10\log_{10}\frac{P_{in}}{P_{out}}$$

0 dBm = 1 mW; −3 dB halves the power; −10 dB is one tenth; 1 mW in and 1 µW out is **30 dB**.

## 10. Calibration, traceability, uncertainty

| Term | Meaning |
| --- | --- |
| **Calibration** | Comparing the instrument to a **traceable standard** and recording the result |
| **Adjustment** | Altering the instrument so it reads correctly — a separate act |
| **Verification** | Confirming it meets a specification (pass/fail) |
| **Traceability** | An unbroken chain of comparisons to a national standard |
| **Uncertainty** | The quantified doubt, with a coverage factor |
| **Decision rule** | The guard band applied when declaring pass/fail near a limit |

**Calibration is not adjustment.** The "as-found" record may show drift; the "as-left" record shows the correction. Typical interval **12 months**, shortened for harsh service. A lapsed calibration invalidates every measurement taken with the instrument — which is why the maintenance block demands the record.

**Guard banding:** a reading inside its uncertainty of the tolerance limit cannot be declared pass or fail without a stated decision rule. That is why the same instrument is "pass" in one lab and "conditional" in another.

## 11. Safety and the classic mistakes

| Mistake | Consequence |
| --- | --- |
| Ammeter in parallel with a supply | Near-short; fuse or meter destroyed |
| Ohmmeter on a live circuit | Wrong reading; damaged meter |
| Megger on electronics | Hundreds of volts into semiconductors |
| Scope ground on a live node | Short through the instrument |
| CAT II meter on a service entrance | Arc flash — the CAT rating is a safety claim |
| Probe left in the 10 A jack while measuring volts | Short through the current shunt |
| Wrong fuse fitted in the meter | Silently voids the safety rating |
| Trusting a spot reading | Misses a 2 ms intermittent |

**CAT ratings:** CAT II portable equipment and outlets; CAT III distribution and panelboards; CAT IV service entrance and utility side. Match the rating to the point of measurement.

---

## Recall test

1. A 50 µA, 100 Ω movement on the 10 V range: sensitivity and input resistance?
2. Shunt for a 1 mA movement (100 Ω) to read 10 mA?
3. Error of a 10 MΩ DMM on a 1 MΩ Thevenin source?
4. Why does a dual-slope ADC reject 60 Hz hum?
5. A 4000-count meter on the 4 V range: resolution?
6. `±(0.5% + 2 digits)` at a 20.00 V reading?
7. Average-responding meter on a triangle wave: high or low, by how much?
8. A 1 ns edge on a 100 MHz scope — displayed rise time?
9. Why does ×10 load less than ×1?
10. 5 divisions pp at 1 V/div with ×10: $V_{pp}$ and sine RMS?
11. XY mode, straight line with negative slope — phase?
12. Tangencies: 3 on top, 2 on the side — frequency ratio?
13. Equal-amplitude ellipse, vertical intercept 0.707$A$ — phase?
14. 1 MHz into a 1 s gate: absolute and relative resolution?
15. 20 dB return loss in VSWR?
16. Velocity factor 0.66, reflection after 1 µs: distance to the fault?

> [!success]- Answers
> 1. **20 000 Ω/V**; **200 kΩ**. 2. $(1\,\mathrm{mA}\times100)/(10-1)$ = **11.1 Ω**. 3. **−9%** ($10/11$). 4. The integration window spans whole mains cycles, so hum integrates to zero. 5. 4 V/4000 = **1 mV**. 6. 0.10 + 0.02 = **±0.12 V**. 7. **Low, about 3.8%**. 8. $\sqrt{1+3.5^2}$ = **3.64 ns**. 9. It divides the signal **and** presents 10 MΩ/10 pF instead of 1 MΩ/100 pF. 10. **50 V pp**; **17.7 V RMS**. 11. **180°**. 12. **3:2** ($f_Y:f_X$). 13. **45°**. 14. **1 Hz**; **1 ppm**. 15. **1.22**. 16. $(0.66\times3\times10^{8}\times10^{-6})/2$ = **99 m**.
