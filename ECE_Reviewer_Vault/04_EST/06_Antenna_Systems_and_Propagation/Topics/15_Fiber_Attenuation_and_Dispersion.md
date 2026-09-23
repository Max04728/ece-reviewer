---
id: EST-06-15
title: "Fiber Attenuation and Dispersion"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 15
tier: 2
depth: full
problem_count: 4
prereqs: ["[[14_Optical_Fiber_NA,_V_Number_and_Modes]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 15 — Fiber Attenuation and Dispersion

> [!abstract] Scope
> Convert fiber attenuation between dB, dBm and mW, and compute how chromatic and modal dispersion cap the bit rate over a given length.

## Core Concept

> [!tip] Intuition
> Two independent mechanisms limit a fiber span: attenuation steals optical power exponentially, so losses add in dB while powers multiply; dispersion smears each pulse in time, so a pulse that was 1 ns wide leaves 1.7 ns wide and sooner or later overlaps its neighbour. Loss tells you whether the detector sees the signal; dispersion tells you how fast you may send it.

**Attenuation is a logarithmic bookkeeping system, and that is the point.** Optical power falls exponentially with length, $P_{out} = P_{in}10^{-\alpha L/10}$, so the loss in dB is simply $\alpha L$ and cascaded elements ADD: a 10 km spool at 0.2 dB/km is 2 dB, and putting two of them in series is 4 dB regardless of the input power. This is why every fiber loss is quoted in dB (or dB/km) and every source/detector level in dBm. Converting back to linear power needs the inverse, $P_{out}/P_{in} = 10^{-\alpha L/10}$, so 2 dB leaves 63.1% of the power, not 98%. Typical single-mode silica is about 0.35 dB/km at 1310 nm and 0.2 dB/km at 1550 nm; multimode at 850 nm is 2–5 dB/km. Splices add roughly 0.1 dB each and connectors roughly 0.5 dB each, and in a real budget those small numbers matter because there may be dozens of them.

**The three windows and what each is for.** The 850 nm window is the original multimode/LED window (cheap sources, high loss). The 1310 nm window is where material dispersion of silica passes through zero, so it is the low-dispersion window. The 1550 nm window is the attenuation minimum (0.2 dB/km) and, crucially, is where erbium-doped fiber amplifiers (EDFAs) operate — which is why long-haul and submarine systems live at 1550 nm and accept a small non-zero chromatic dispersion that is then compensated. A 1625 nm window is used for maintenance and OTDR testing, and the OH-absorption peak at 1383 nm is the reason the low-loss spectrum is split into separate bands rather than one wide window. The 1383 nm peak is also the reason "allwave" or low-water-peak fiber exists.

**Dispersion is pulse broadening, and it comes in three kinds.** *Intermodal (modal)* dispersion is the spread of transit times between different guided modes — it exists only in multimode fiber, and for a step-index profile it contributes about $n_1\Delta/c$ per unit length (roughly 50 ns/km for $n_1 = 1.5$, $\Delta = 0.01$, which limits a kilometre to about 10 MHz). *Chromatic* dispersion is the combined material and waveguide effect within a single mode: different wavelengths travel at different group velocities, so a source with linewidth $\Delta\lambda$ broadens a pulse by $\Delta\tau = D L \Delta\lambda$ with $D$ in ps/(nm·km). It is the dominant limit in single-mode fiber, and it is why 1310 nm (where $D \approx 0$) is attractive for directly modulated lasers. *Polarization-mode dispersion* (PMD) splits the two polarisations of the fundamental mode by a small random amount; it is negligible at low bit rates but becomes the ultimate limit for very long spans and very high rates, and it is not compensable because it drifts with temperature and stress.

**Turning dispersion into a bit-rate limit.** A pulse broadened to $\Delta\tau$ cannot be sent faster than roughly $B \le 1/(2\Delta\tau)$ (so that successive pulses do not overlap); some texts use the more conservative $B \le 1/(4\Delta\tau)$. The two conventions differ by a factor of two, so an exam answer must state which it uses. For a given fiber the product $B\,L$ is approximately constant — dispersion-limited bandwidth trades linearly against distance — which is why fiber is specified as, say, 500 MHz·km. Independent broadening mechanisms add in quadrature:
$$\Delta\tau_{tot} = \sqrt{\Delta\tau_{modal}^2 + \Delta\tau_{chrom}^2}$$
not linearly, because they are independent random processes. Finally, a graded-index profile reduces the mode count (see `[[14_Optical_Fiber_NA,_V_Number_and_Modes]]`) and equalises path lengths, raising the $B\,L$ product from tens of MHz·km to GHz·km with no change in attenuation.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Attenuation from power ratio | $\alpha = -\dfrac{10}{L}\log_{10}\!\left(\dfrac{P_{out}}{P_{in}}\right)$ | Gives dB per unit length with L in km. A 50% power ratio over 1 km is 3.01 dB/km, not 0.5 dB/km. |
| Output power from loss | $P_{out} = P_{in}\,10^{-\alpha L/10}$ | alpha in dB/km, L in km. Because it is 10^(...), a 3 dB loss halves the power; a 10 dB loss divides it by ten. |
| Total attenuation | $L_{tot} = \alpha L + N_c L_c + N_s L_s$ | dB values add. Connector ~0.5 dB each, splice ~0.1 dB each. Never average dB/km with a count of connectors. |
| Power in dBm | $P(\mathrm{dBm}) = 10\log_{10}\!\left(\dfrac{P}{1\ \mathrm{mW}}\right)$ | 1 mW = 0 dBm, 0.5 mW = -3.01 dBm, 10 uW = -20 dBm. The reference is 1 mW, not 1 W. |
| Chromatic pulse broadening | $\Delta\tau = D\,L\,\Delta\lambda$ | D in ps/(nm km), L in km, source linewidth Delta-lambda in nm. Typical D = 17 ps/(nm km) at 1550 nm, near 0 at 1310 nm. |
| Modal broadening, step index | $\dfrac{\Delta\tau}{L} \approx \dfrac{n_1\Delta}{c}$ | Multimode only. n1 = 1.5, Delta = 0.01 gives 50 ns/km. Zero in a true single-mode fiber, where only chromatic dispersion and PMD remain. |
| Combined broadening | $\Delta\tau_{tot} = \sqrt{\Delta\tau_{modal}^2 + \Delta\tau_{chrom}^2}$ | Independent mechanisms add in QUADRATURE. Adding 1.7 ns and 0.5 ns linearly gives 2.2 ns; correctly it is 1.77 ns. |
| Bit-rate limit from broadening | $B \le \dfrac{1}{2\Delta\tau}$ | The 1/2 convention (pulses must not overlap). Some texts use 1/(4*Delta-tau) — state which one, since the answer differs by a factor of two. |
| Bandwidth-length product | $B\,L = \mathrm{constant}$ | Dispersion-limited fiber: doubling the reach halves the bit rate. Quoted as MHz km or GHz km; do not add the dB loss budget into it. |
| Rise time and bandwidth | $B \approx \dfrac{0.35}{t_{rise}}$ | NRZ Gaussian-pulse rule of thumb. It converts a measured or budgeted rise time into an approximate bandwidth; for dispersion-limited design use 1/(2 Delta-tau) instead. |
| Maximum fiber length in a budget | $L_{max} = \dfrac{P_{tx} - P_{sens} - L_{conn} - L_{splice} - M}{\alpha}$ | P in dBm. M is the design margin (3-6 dB). At 0 dBm transmit, -30 dBm sensitivity, 2 connectors, 4 splices and 3 dB margin, 0.2 dB/km allows 128 km. |

## Worked Problems

### P1. 1 mW is launched into a 10 km single-mode fiber with 0.2 dB/km attenuation. Find the total loss, the output power in mW and the output level in dBm.

**Given:** P_{in} = 1\ \mathrm{mW} = 0\ \mathrm{dBm}; L = 10 km; \alpha = 0.2\ \mathrm{dB/km}

**Solution:**

1. Total loss: $L_{tot} = \alpha L = 0.2 \times 10 = 2\ \mathrm{dB}$
2. Output level: $P_{out} = 0 - 2 = -2\ \mathrm{dBm}$
3. Linear power: $P_{out} = 1\ \mathrm{mW} \times 10^{-2/10} = 1 \times 0.63096 = 0.631\ \mathrm{mW}$
4. Check: $10\log_{10}(0.631) = -2.0\ \mathrm{dBm}$

> [!success]- Answer
> **$L_{tot} = 2\ \mathrm{dB}$; $P_{out} = 0.631\ \mathrm{mW} = -2\ \mathrm{dBm}$.**

> [!warning] Trap
> Subtracting 2 mW instead of 2 dB, or computing $1 - 2/10 = 0.8\ \mathrm{mW}$. The loss is logarithmic: 2 dB removes 37% of the power, leaving 63%.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.2×10` → loss **2.00** dB; `0-2` → $P_\mathrm{out}$ = **-2.00** dBm.
> 2. `10^(-2÷10)` → **0.6310** mW; `10log(Ans)` → **-2.00** dBm, the round trip back.

### P2. A 100 km single-mode link at 1550 nm uses a laser with 1 nm spectral width in fiber with $D = 17\ \mathrm{ps/(nm\,km)}$. Find the pulse broadening and the maximum NRZ bit rate under the $B \le 1/(2\Delta\tau)$ rule.

**Given:** D = 17\ \mathrm{ps/(nm\,km)}; L = 100 km; \Delta\lambda = 1\ \mathrm{nm}

**Solution:**

1. $\Delta\tau = D L \Delta\lambda = 17 \times 100 \times 1 = 1700\ \mathrm{ps}$
2. Convert: $\Delta\tau = 1700\ \mathrm{ps} = 1.7\ \mathrm{ns}$
3. $B \le 1/(2 \times 1.7\times10^{-9}) = 1/(3.4\times10^{-9})$
4. $B \le 2.94\times10^{8}\ \mathrm{Hz} \approx 294\ \mathrm{Mb/s}$

> [!success]- Answer
> **$\Delta\tau = 1.7\ \mathrm{ns}$, so $B \le 294\ \mathrm{Mb/s}$.**

> [!warning] Trap
> Using 1310 nm's $D \approx 0$ value at 1550 nm. The zero-material-dispersion wavelength is about 1310 nm; at 1550 nm $D$ is around 17 ps/(nm·km), so the same link at 1310 nm would be dispersion-free but 0.35 dB/km lossy instead of 0.2.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `17×100×1` → $\Delta\tau$ = **1700** ps = **1.70** ns.
> 2. `1÷(2×1.7×10^-9)` → $B$ = **2.94×10^8** Hz = **294** Mb/s. Halve it if you adopt the $1/4\Delta\tau$ convention.

### P3. A 1 km step-index multimode fiber has $n_1 = 1.5$ and $\Delta = 0.01$. Find the modal pulse broadening and the resulting bit-rate limit, and express the result as a bandwidth-length product.

**Given:** n_1 = 1.5; \Delta = 0.01; L = 1 km; c = 3\times10^{8}\ \mathrm{m/s}

**Solution:**

1. Delay spread per unit length: $\Delta\tau/L \approx n_1\Delta/c = (1.5 \times 0.01)/(3\times10^{8})$
2. $= 0.015/3\times10^{8} = 5\times10^{-11}\ \mathrm{s/m} = 50\ \mathrm{ns/km}$
3. Over 1 km: $\Delta\tau = 50\ \mathrm{ns}$
4. $B \le 1/(2 \times 50\times10^{-9}) = 10\ \mathrm{MHz}$
5. $B\,L = 10\ \mathrm{MHz} \times 1\ \mathrm{km} = 10\ \mathrm{MHz\,km}$

> [!success]- Answer
> **$\Delta\tau = 50\ \mathrm{ns}$ over 1 km, $B \le 10\ \mathrm{MHz}$, $B L \approx 10\ \mathrm{MHz\,km}$.**

> [!warning] Trap
> Reporting the per-metre figure as the answer. The formula gives 50 ns PER KILOMETRE; quoting 50 ns/km as the total broadening is only correct because L happens to be exactly 1 km. At 10 km the broadening is 500 ns and the bit rate falls to 1 MHz.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1.5×0.01÷(SHIFT CVALUE 28)` → **5.00×10^-11** s/m, i.e. **50.0** ns/km with c0.
> 2. `×10^3` → $\Delta\tau$ = **5.00×10^-8** s over the 1 km span.
> 3. `1÷(2×Ans)` → $B$ = **10.0** MHz, so the product $BL$ ≈ **10.0** MHz·km.

### P4. A point-to-point link uses a 0 dBm transmitter and a receiver with -30 dBm sensitivity. There are 2 connectors at 0.5 dB each, 4 splices at 0.1 dB each and a required 3 dB system margin, over 0.2 dB/km fiber. Find the maximum fiber length.

**Given:** P_{tx} = 0\ \mathrm{dBm}; P_{sens} = -30\ \mathrm{dBm}; 2 connectors \times 0.5 dB; 4 splices \times 0.1 dB; margin = 3 dB; \alpha = 0.2\ \mathrm{dB/km}

**Solution:**

1. Total allowable loss: $P_{tx} - P_{sens} = 0 - (-30) = 30\ \mathrm{dB}$
2. Subtract the fixed items: connectors $2 \times 0.5 = 1.0\ \mathrm{dB}$, splices $4 \times 0.1 = 0.4\ \mathrm{dB}$, margin $3\ \mathrm{dB}$
3. Loss available to the fiber: $30 - 1.0 - 0.4 - 3 = 25.6\ \mathrm{dB}$
4. Length: $L = 25.6/0.2 = 128\ \mathrm{km}$

> [!success]- Answer
> **$L_{max} = 128\ \mathrm{km}$ of fiber at 0.2 dB/km.**

> [!warning] Trap
> Forgetting the design margin, or double-counting the sensitivity by also subtracting it from a received-power figure. The 30 dB is the WHOLE budget: connectors, splices, margin and fiber must all fit inside it, and the margin is not optional — it absorbs ageing, temperature and repair splices.

## Traps & Exam Notes

- **Treating dB as linear power.** A 3 dB loss leaves 50% of the power, not 97%. Converting with $10^{-\alpha L/10}$ requires the division by 10; using $10^{-\alpha L}$ for a 2 dB loss returns 1% of the power instead of 63%.
- **Using the 1310 nm attenuation at 1550 nm, or vice versa.** 1550 nm is the attenuation minimum (0.2 dB/km) but has $D \approx 17\ \mathrm{ps/(nm\,km)}$; 1310 nm has $D \approx 0$ (zero material dispersion) but 0.35 dB/km. Quoting 0.2 dB/km AND zero dispersion for the same link is a contradiction.
- **Unit mismatch in $\Delta\tau = D L \Delta\lambda$.** $D$ is in ps/(nm·km) and $\Delta\lambda$ is in nm. Substituting the source linewidth in µm (0.001 instead of 1) understates the broadening by $10^{3}$; substituting L in metres overstates it by the same factor.
- **Mixing the $1/(2\Delta\tau)$ and $1/(4\Delta\tau)$ bit-rate rules.** The two conventions differ by a factor of two, so the same link is quoted as 294 Mb/s or 147 Mb/s depending on the text. State the rule you use; the examiner is testing whether you know which one you applied.
- **Applying the modal-dispersion formula to a single-mode fiber.** $\Delta\tau/L = n_1\Delta/c$ describes intermodal spread, which by definition does not exist when only one mode is guided. In SMF the limit is chromatic dispersion plus PMD.
- **Adding broadening mechanisms linearly.** Independent contributions combine as $\sqrt{\Delta\tau_1^2 + \Delta\tau_2^2}$; adding 1.7 ns of chromatic and 1.0 ns of modal linearly gives 2.7 ns where the correct value is 1.97 ns — a 37% error in $\Delta\tau$ and therefore in the bit rate.
- **Forgetting that splices and connectors live inside the budget.** A 100 km span with a splice every 2 km is 50 splices at 0.1 dB = 5 dB, which is 25 km of fiber at 0.2 dB/km. Ignoring them makes the link look far longer than it is.
- **Reading the 1383 nm OH-absorption peak as a usable window.** The water peak is a loss spike between the 1310 and 1550 nm windows; the low-loss bands are separated by it, not centred on it.

## See Also

- [[14_Optical_Fiber_NA,_V_Number_and_Modes]]
- [[16_Optical_Sources,_Detectors_and_Power_Budget]]
- [[06_FSPL_and_Friis_Transmission_Equation]]

---

[[14_Optical_Fiber_NA,_V_Number_and_Modes|⬅ 14]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[16_Optical_Sources,_Detectors_and_Power_Budget|16 ➡]]
