---
title: "Antenna Systems and Propagation — Drill"
type: drill
area: 06_Antenna_Systems_and_Propagation
part: 04_EST
seed: 1
count: 8
pool: 66
updated: 2026-09-23
---

# Antenna Systems and Propagation — Practice Drill

**8 problems** drawn from a pool of 66 across 15 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 06_Antenna_Systems_and_Propagation --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. Two Hertzian dipoles are compared at $100\ \mathrm{MHz}$: one with $l = \lambda/50$ and one with $l = 0.01\lambda$. Find $R_\mathrm{rad}$ for each and their ratio.

**Given:** f = 100 MHz, lambda = 3 m; case A: l = lambda/50; case B: l = 0.01 lambda

> [!success]- Answer
> **$0.3158\ \Omega$ for $l=\lambda/50$; $0.07896\ \Omega$ for $l=0.01\lambda$; ratio $4$.**

> [!warning] Trap
> Scaling $R_\mathrm{rad}$ linearly with length. It goes as $(l/\lambda)^2$, so halving the length quarters the resistance — the reason electrically short antennas are so lossy.

<sub>from EST-06-03</sub>

### 2. A 3 m parabolic receive dish with aperture efficiency 0.55 views a C-band downlink at 4 GHz into a receiver whose system noise temperature is 100 K. Find its gain and G/T, then the C/N0 for an EIRP of 50 dBW over a 38 000 km path, and the C/N in the 36 MHz transponder.

**Given:** D = 3 m; \eta = 0.55; f = 4 GHz; T_{sys} = 100 K; EIRP = 50 dBW; d = 38000 km; B = 36 MHz

> [!success]- Answer
> **$G = 39.4\ \mathrm{dBi}$, $G/T = 19.4\ \mathrm{dB/K}$, $C/N_0 = 101.9\ \mathrm{dBHz}$, $C/N = 26.3\ \mathrm{dB}$.**

> [!warning] Trap
> Dividing gain by the noise temperature in linear form — $8685/100$ — instead of using the dB form $G - 10\log_{10}T$. The dB/K figure is a difference of two dB quantities, so the 100 K enters as 20 dB, not as 100.

<sub>from EST-06-13</sub>

### 3. A half-wave dipole ($D = 1.64$) is used first at $300\ \mathrm{MHz}$ and then at $100\ \mathrm{MHz}$. Find its effective capture area at each frequency and explain the ratio.

**Given:** D = 1.64; f1 = 300 MHz; f2 = 100 MHz; lossless (eta = 1); c = 3e8 m/s

> [!success]- Answer
> **$A_e = 0.1305\ \mathrm{m^2}$ at 300 MHz and $1.175\ \mathrm{m^2}$ at 100 MHz — a factor of 9 from $\lambda^2$ scaling.**

> [!warning] Trap
> Assuming capture area is fixed by the antenna's physical size. $A_e$ depends on $\lambda^2$, not on metal area; the same dipole captures nine times more power at one third the frequency.

<sub>from EST-06-02</sub>

### 4. A half-wave dipole has $R_{\mathrm{rad}} = 73\ \Omega$ and a loss resistance of $2\ \Omega$. Find its radiation efficiency, its gain as a ratio and in dBi, and state what happens to its directivity.

**Given:** R_rad = 73 ohm; R_loss = 2 ohm; dipole directivity D = 1.64

> [!success]- Answer
> **$\eta = 0.9733 = -0.12\ \mathrm{dB}$, $G = 1.596 = 2.03\ \mathrm{dBi}$, while $D$ stays at $1.64 = 2.15\ \mathrm{dBi}$.**

> [!warning] Trap
> Concluding that the loss broadens the beam or reduces directivity. Loss reduces gain, never directivity — a lossy antenna radiates the same pattern with less power, so it is simply a weaker transmitter.

<sub>from EST-06-02</sub>

### 5. A $50\ \mathrm{kW}$ AM broadcast station uses a quarter-wave monopole ($D = 3.28$) over a perfect ground at $1\ \mathrm{MHz}$. Find the free-space field at $50\ \mathrm{km}$ and the actual field if the ground-wave attenuation factor there is $A = 0.5$.

**Given:** P_t = 50 kW; D = 3.28 (quarter-wave monopole); d = 50 km; A = 0.5

> [!success]- Answer
> **$E_0 = 44.3\ \mathrm{mV/m}$ free space; $E = 22.2\ \mathrm{mV/m}$ after attenuation.**

> [!warning] Trap
> Feeding the bare transmitter power into $E_0 = 173\sqrt{P_t}/d$ and getting $24.5\ \mathrm{mV/m}$. The $173$ is the isotropic constant and takes EIRP; a monopole's $D = 3.28$ raises the field by $\sqrt{3.28} = 1.81$, and omitting it costs $5.15\ \mathrm{dB}$. The companion error is applying $A^2$ instead of $A$: $A$ is a *field* ratio, so it multiplies $E$ once.

<sub>from EST-06-07</sub>

### 6. Two identical antennas each present $1\ \mathrm{m^2}$ of effective aperture at a separation of $10$ km. With $P_t = 1$ W, compare the received power at $1$ GHz and at $2$ GHz.

**Given:** $A_t = A_r = 1\ \mathrm{m^2}$; $d = 10\ \mathrm{km}$; $P_t = 1\ \mathrm{W}$; $f = 1$ GHz and $2$ GHz

> [!success]- Answer
> **$P_r = 1.11\times10^{-7}$ W at 1 GHz and $4.44\times10^{-7}$ W at 2 GHz — a $6$ dB *improvement* at the higher frequency.**

> [!warning] Trap
> Quoting "higher frequency means more path loss" and predicting a $6$ dB loss. FSPL does rise with frequency, but a fixed physical aperture has a gain that rises as $f^2$, which more than cancels it. The answer depends entirely on whether gain or aperture is held constant.

<sub>from EST-06-06</sub>

### 7. A $6$ GHz microwave link runs $50$ km with $30$ dBm transmitters and $35$ dBi antennas at each end. The receiver threshold is $-75$ dBm. Find the received power and the fade margin.

**Given:** $P_t = 30\ \mathrm{dBm}$; $G_t = G_r = 35\ \mathrm{dBi}$; $d = 50\ \mathrm{km}$; $f = 6000\ \mathrm{MHz}$; threshold $= -75\ \mathrm{dBm}$

> [!success]- Answer
> **$P_r = -41.98\ \mathrm{dBm}$; fade margin $= 33.0\ \mathrm{dB}$.**

> [!warning] Trap
> Reporting the fade margin as $P_r + P_{threshold}$ or forgetting the sign of the threshold. Margin is always $P_r$ minus the *negative* threshold, so the two magnitudes add: $41.98 + 75$ would be wrong, but $75 - 41.98 = 33.02$ is right.

<sub>from EST-06-06</sub>

### 8. The F2 layer has $f_c = 9.86\ \mathrm{MHz}$ and a signal reaches it at an angle of incidence of $30^{\circ}$ measured from the vertical. Find the maximum usable frequency and the transmitter take-off angle.

**Given:** f_c = 9.86 MHz; theta_i = 30 degrees from the vertical

> [!success]- Answer
> **$\mathrm{MUF} \approx 11.4\ \mathrm{MHz}$, launched at $60^{\circ}$ take-off.**

> [!warning] Trap
> Multiplying by the cosine instead of dividing: $9.86 \times 0.866 = 8.54\ \mathrm{MHz}$. Oblique incidence can only *raise* the returned frequency above $f_c$; a value below $f_c$ means the ratio was inverted.

<sub>from EST-06-09</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| EST-06-01 | Antenna Parameters: Directivity, Gain, EIRP | 4 |
| EST-06-02 | Radiation Resistance, Efficiency and Capture Area | 4 |
| EST-06-03 | Hertzian and Half-Wave Dipoles | 4 |
| EST-06-04 | Marconi, Folded Dipole, Yagi-Uda | 4 |
| EST-06-05 | Parabolic Reflector Antennas | 4 |
| EST-06-06 | FSPL and Friis Transmission Equation | 10 |
| EST-06-07 | Ground Wave Propagation | 4 |
| EST-06-08 | Space Wave and Radio Horizon | 4 |
| EST-06-09 | Sky Wave and Ionospheric Layers | 4 |
| EST-06-10 | Critical Frequency, MUF and Skip Distance | 4 |
| EST-06-11 | Radar Range Equation and Microwave Links | 4 |
| EST-06-13 | Satellite Orbits, Transponders and G/T | 4 |
| EST-06-14 | Optical Fiber NA, V Number and Modes | 4 |
| EST-06-15 | Fiber Attenuation and Dispersion | 4 |
| EST-06-16 | Optical Sources, Detectors and Power Budget | 4 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
