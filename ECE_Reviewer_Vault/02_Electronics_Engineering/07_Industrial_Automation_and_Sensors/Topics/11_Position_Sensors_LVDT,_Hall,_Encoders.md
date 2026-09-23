---
id: ECE-07-11
title: "Position Sensors: LVDT, Hall, Encoders"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Instrumentation_and_Difference_Amplifiers]]", "[[02_Phasors_and_Complex_Impedance]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Position Sensors: LVDT, Hall, Encoders

> [!abstract] Scope
> Measure linear and rotary displacement with LVDTs, Hall-effect devices and optical encoders, and convert each sensor's native output into a position, a direction and a resolution figure.

## Core Concept

> [!tip] Intuition
> Every position sensor converts a mechanical displacement into something electrical: a differential transformer moves a core and unbalances two secondary windings, a Hall plate senses the flux of a moving magnet, and an encoder interrupts a light beam with a slotted disk. The exam question is the arithmetic that turns counts, millivolts or flux density into millimetres and degrees.

**LVDT: a displacement-to-AC transformer.** A linear variable differential transformer has a primary winding driven by an AC excitation (typically 1-10 kHz) and two secondary windings connected in opposition. A movable iron core couples the primary to each secondary; at the null position the couplings are equal and the output is zero, and as the core moves the coupling becomes unequal so the output rises in proportion to displacement. The output is an AC amplitude proportional to $x$ in the linear range, with a sensitivity quoted in mV per millimetre per volt of excitation, and the phase reverses by $180^\circ$ as the core crosses the null. That phase reversal is the whole reason the signal conditioning is not a simple diode detector: a magnitude-only detector produces the same voltage for $+x$ and $-x$, so a *phase-sensitive demodulator* — one that multiplies the secondary signal by the excitation and averages — is required to recover the sign. The linearity is excellent (0.1-0.5% of full scale), the resolution is effectively infinite, and the core never touches the windings, so the LVDT is rugged and frictionless.

**Hall-effect sensors.** A current $I$ through a thin plate in a magnetic flux density $B$ deflects the charge carriers, and the resulting transverse voltage is $V_H = IB/(ntq)$, or $V_H = R_HIB/t$ with the Hall coefficient $R_H = 1/(nq)$. The sensitivity is set by the carrier concentration and the thickness: a thin, lightly doped semiconductor gives tens of millivolts, which is why Hall elements are made in InSb, GaAs or silicon with an on-chip amplifier. As a position sensor the Hall element is usually combined with a moving permanent magnet, so it measures flux density rather than displacement directly; air-gap variation, magnet temperature drift and the device's own threshold spread all appear as position error, and a ratiometric supply or a differential pair of elements is used to cancel them. Their great strengths are that they are non-contact, work at high speed and are cheap, which makes them the standard choice for gear-tooth speed sensing and end-of-travel detection.

**Incremental encoders and quadrature.** An incremental optical encoder has a slotted disk, a light source and a photodetector, and produces a pulse train whose frequency is proportional to speed; a second channel displaced by $90^\circ$ gives direction, and decoding both edges of both channels (×4 quadrature) multiplies the resolution by four. An encoder specified at 1000 pulses per revolution (PPR) therefore yields $CPR = 4 \times 1000 = 4000$ counts per revolution with a ×4 decoder, and $360/4000 = 0.09^\circ$ per count. Mounted on a 5 mm-pitch leadscrew, one count is $5\ \mathrm{mm}/4000 = 1.25\ \mu\mathrm{m}$ of linear travel. The ×4 trick multiplies the count rate as well as the resolution, so the counter's maximum input frequency can become the limiting specification at high speed, and an incremental encoder has no memory: after a power loss the position is unknown and a homing sequence is required.

**Absolute encoders and Gray code.** An absolute encoder puts a unique code pattern on the disk, so its output is the position itself and no homing is needed. A single-turn 12-bit absolute encoder resolves $360/2^{12} = 0.088^\circ$; adding turns-counting bits makes it multi-turn. The code is Gray rather than binary because only one bit changes between adjacent positions: reading a binary disk mid-transition (0111 to 1000, where four bits change) can produce a completely wrong value, while a Gray-coded disk can be at most one count in error. Encoder accuracy and resolution are separate specifications — resolution is the smallest step the electronics can report, while accuracy is how close the reported position is to the true one, and mechanical errors such as disk eccentricity, coupling runout and interpolation error set the latter.

**Comparing and specifying.** LVDTs give high accuracy and effectively infinite resolution over a limited stroke (a few millimetres to a few hundred millimetres), need AC excitation and a demodulator, and are used for hydraulic valve position, gauging and materials testing. Hall sensors give a coarse but very rugged non-contact measurement and dominate speed and proximity sensing. Encoders give digital output, high resolution and easy interfacing, but need a mechanical coupling and careful mounting. For all three, the practical questions are the same: what resolution does the application need, what is the repeatability (usually better than the accuracy), how does the sensor behave at power-up, and what error does temperature, mounting and cable length add. A measurement chain's resolution is set by the *combination* — a 12-bit absolute encoder reporting to a controller that reads it over a slow serial link has the resolution of the encoder but the update rate of the link.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Hall voltage | $V_H = \frac{I\,B}{n\,t\,q}$ | I is the bias current, B the flux density, n the carrier concentration, t the plate thickness, q = 1.602e-19 C. Thinner, lightly doped plates give larger output. |
| Hall coefficient form | $R_H = \frac{1}{nq},\quad V_H = \frac{R_H\,I\,B}{t}$ | R_H is a material property. A typical semiconductor Hall element produces tens of millivolts at 0.1-0.5 T. |
| Hall sensitivity | $V_H = K_H\,I\,B$ | K_H is quoted in V/(A T). Output is linear in B, which is why a Hall sensor measures flux density, not position directly. |
| LVDT transfer characteristic | $V_o = k\,V_{ex}\,x$ | Valid within the linear stroke, typically +/-0.1% to 0.5% of full scale. x = 0 is the null, where the two secondary couplings are equal. |
| LVDT phase-sensitive demodulation | $V_{out} = \lvert V\rvert\cos\phi$ | phi is the phase of the secondary relative to the excitation. The 180 degree phase reversal at the null is what encodes the sign of the displacement. |
| Incremental encoder resolution | $\Delta\theta = \frac{360^\circ}{PPR \times m}$ | m = 1 for single-edge counting and m = 4 for full quadrature decoding. A 1000 PPR encoder gives 0.09 degrees per count at x4. |
| Quadrature counts per revolution | $CPR = 4\,PPR$ | Two channels in quadrature, both edges counted. Quoting PPR as CPR understates the resolution by four. |
| Linear resolution from a leadscrew | $\Delta x = \frac{pitch}{CPR}$ | A 5 mm pitch with 4000 counts per revolution gives 1.25 um per count. Also check the maximum count frequency against the counter's rating. |
| Absolute encoder resolution | $\Delta\theta = \frac{360^\circ}{2^n}$ | n bits per turn: 12 bits gives 0.088 degrees, 17 bits gives 0.0027 degrees. Resolution is not the same as accuracy. |
| Velocity from pulse rate | $n_{rpm} = \frac{60\,f_{pulse}}{PPR}$ | Use CPR instead of PPR if the controller counts in x4 quadrature. A 500 PPR encoder at 25 kHz is 3000 rpm. |

## Worked Problems

### P1. A Hall element is biased with $I = 10\ \mathrm{mA}$, has a thickness $t = 0.2\ \mathrm{mm}$ and a carrier concentration $n = 1\times10^{22}\ \mathrm{m^{-3}}$, and sits in a flux density of $0.5\ \mathrm{T}$. Find the Hall voltage.

**Given:** I = 10 mA; B = 0.5 T; t = 0.2 mm; n = 1e22 m^-3; q = 1.602e-19 C

**Solution:**

1. V_H = I B/(n t q)
2. Numerator: 0.01 x 0.5 = 5.0e-3
3. Denominator: 1e22 x 2e-4 x 1.602e-19 = 1e22 x 3.204e-23 = 0.3204
4. V_H = 5.0e-3/0.3204 = 1.561e-2 V

> [!success]- Answer
> **$V_H = 15.6\ \mathrm{mV}$.**

> [!warning] Trap
> Leaving $t$ in millimetres. The thickness enters the denominator, so using 0.2 instead of $2\times10^{-4}\ \mathrm{m}$ makes the answer 1000 times too small.

### P2. A 1000 PPR incremental encoder is read with ×4 quadrature decoding and is mounted on a leadscrew with a 5 mm pitch. Find the counts per revolution and the angular and linear resolution.

**Given:** PPR = 1000; decoding = x4 quadrature; leadscrew pitch = 5 mm

**Solution:**

1. CPR = 4 x PPR = 4 x 1000 = 4000 counts per revolution
2. Angular resolution = 360/4000 = 0.09 degrees per count
3. Linear resolution = pitch/CPR = 5 mm/4000
4. = 1.25e-3 mm = 1.25 um per count

> [!success]- Answer
> **4000 counts/rev, $0.09^\circ$ per count, and $1.25\ \mu\mathrm{m}$ of linear travel per count.**

> [!warning] Trap
> Using 1000 counts per revolution because that is the encoder's part number. A quadrature decoder counts four edges per pulse, so the effective resolution is four times finer — and the count frequency is four times higher.

### P3. A single-turn absolute encoder produces a 12-bit Gray-coded word. Find its resolution in degrees, and compare it with a 17-bit absolute encoder.

**Given:** 12-bit absolute; also 17-bit; Gray code

**Solution:**

1. 12-bit: 2^12 = 4096 positions, so resolution = 360/4096 = 0.0879 degrees
2. 17-bit: 2^17 = 131072 positions, so resolution = 360/131072 = 0.00275 degrees
3. Gray coding changes only one bit per step, so a read taken during a transition is at most one count in error
4. A binary-coded disk crossing 0111 -> 1000 could be misread as any value between 0 and 15

> [!success]- Answer
> **$0.088^\circ$ per step at 12 bits and $0.0027^\circ$ at 17 bits.**

> [!warning] Trap
> Confusing resolution with accuracy. A 17-bit encoder resolves $0.0027^\circ$ but its *accuracy* is limited by disk eccentricity, coupling runout and interpolation error, which are usually tens of counts.

### P4. A 500 PPR incremental encoder produces a pulse frequency of $25\ \mathrm{kHz}$ on one channel. Find the shaft speed in rpm, and confirm the result using ×4 quadrature decoding.

**Given:** PPR = 500; f_pulse = 25 kHz (one channel)

**Solution:**

1. Single-channel counting: rev/s = 25000/500 = 50
2. Speed = 50 x 60 = 3000 rpm
3. With x4 decoding the controller counts 4 x 25 kHz = 100 kHz and uses CPR = 2000
4. 100000/2000 = 50 rev/s = 3000 rpm, confirming the same speed

> [!success]- Answer
> **$3000\ \mathrm{rpm}$ from either counting scheme.**

> [!warning] Trap
> Mixing PPR with a ×4 pulse frequency. 100 kHz divided by 500 PPR gives 200 rev/s, an answer four times too fast; the decoder's 100 kHz must be divided by the 2000-count CPR.

### P5. An LVDT with $5\ \mathrm{V}$ rms excitation has a sensitivity of $20\ \mathrm{mV/mm}$ and a stroke of $\pm25\ \mathrm{mm}$. The signal is amplified by 10 and digitized by a 12-bit ADC with a $\pm5\ \mathrm{V}$ range. Find the displacement resolution.

**Given:** sensitivity = 20 mV/mm; stroke = +/-25 mm; gain = 10; ADC = 12-bit, +/-5 V

**Solution:**

1. Full-scale LVDT output = 20 mV/mm x 25 mm = 500 mV
2. Amplified = 500 mV x 10 = 5 V, matching the full-scale range
3. ADC LSB = (5 - (-5))/4096 = 10/4096 = 2.4414 mV
4. Referred to the LVDT: 2.4414 mV/10 = 0.24414 mV
5. Displacement per LSB = 0.24414 mV / 20 mV/mm = 0.012207 mm = 12.2 um

> [!success]- Answer
> **$12.2\ \mu\mathrm{m}$ per LSB.**

> [!warning] Trap
> Forgetting the amplifier when converting LSBs to displacement, or using a 5 V full scale for a bipolar $\pm5\ \mathrm{V}$ converter. The span is 10 V, so the LSB is $10/4096$, not $5/4096$.

## Traps & Exam Notes

- **Detecting the LVDT output with a diode or a magnitude circuit.** The output phase reverses $180^\circ$ at the null, so magnitude alone cannot distinguish $+x$ from $-x$; a phase-sensitive (synchronous) demodulator referenced to the excitation is required.
- **Treating the LVDT null as an exact zero.** A real LVDT has a residual null voltage of a few millivolts from winding asymmetry and harmonics, so using the null as a precise position trigger gives a deadband and a repeatability error.
- **Forgetting that ×4 quadrature multiplies the count rate too.** Four times the resolution means four times the edge frequency; at high speed the counter's maximum input frequency, not the encoder, becomes the limit.
- **Confusing PPR and CPR.** A 1000 PPR encoder gives 4000 counts per revolution with ×4 decoding, so quoting 1000 as the count resolution is four times too coarse — and the reverse mistake makes the speed four times too fast.
- **Assuming an incremental encoder knows where it is.** It counts edges from an arbitrary power-up state, so the position is unknown until a homing or index sequence runs; only an absolute encoder reports true position immediately.
- **Reading a binary absolute disk mid-transition.** Between 0111 and 1000 four bits change at once, so a single misread transition can report any value in between; Gray code changes exactly one bit per step and bounds the error to one count.
- **Treating a Hall sensor as a displacement sensor.** It measures flux density, so air-gap variation, magnet temperature drift and threshold spread all appear as position error; ratiometric or differential operation and hysteresis are needed for repeatability.

## See Also

- [[12_Signal_Conditioning_and_DAQ]]
- [[10_Strain_Gauges_and_Wheatstone_Bridge]]
- [[13_ADC_Architectures_and_Quantization]]

---

[[10_Strain_Gauges_and_Wheatstone_Bridge|⬅ 10]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Signal_Conditioning_and_DAQ|12 ➡]]
