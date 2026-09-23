---
id: EST-06-16
title: "Optical Sources, Detectors and Power Budget"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 16
tier: 2
depth: full
problem_count: 4
prereqs: ["[[15_Fiber_Attenuation_and_Dispersion]]", "[[14_Optical_Fiber_NA,_V_Number_and_Modes]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 16 — Optical Sources, Detectors and Power Budget

> [!abstract] Scope
> Choose between an LED and a laser for a span, compute detector responsivity and photocurrent, and close a fiber link budget against receiver sensitivity and rise-time limits.

## Core Concept

> [!tip] Intuition
> A fiber link is a power-budget problem with a time-budget problem stapled to it. The source must put enough light through the fiber that the detector still sees a specified current, and the whole chain must be fast enough that the pulse arriving at the detector has not spread into its neighbours. Either failure — too little power or too much broadening — closes the link.

**The source choice is a linewidth-versus-reach question.** An LED emits incoherent light over a wide spectrum (30–60 nm at 850 nm) and couples poorly into a fiber, but it is cheap, robust and needs no bias-control loop; it is the right choice for short-reach multimode links at 850 nm. A laser diode (ILD, or a distributed-feedback DFB laser for single-mode long haul) is coherent with a linewidth of 0.1–1 nm, couples efficiently, and can be modulated at gigabits per second. The trade is that a laser has a threshold current and a kink in its L–I curve, so it requires a bias-control circuit and thermoelectric cooling to hold wavelength and output power — and because its linewidth is still finite, it still suffers chromatic dispersion via $\Delta\tau = D L \Delta\lambda$. A 50 nm LED linewidth over 10 km at $D = 17\ \mathrm{ps/(nm\,km)}$ broadens a pulse by 8.5 ns, which would cap the link at tens of Mb/s; the same link with a 1 nm laser broadens by 170 ps and runs at gigabits.

**Responsivity converts optical power to current, and it is wavelength-dependent.** The photocurrent is $I_p = R P_{opt}$, where the responsivity is:
$$R = \eta q\lambda/(hc) = \eta\lambda(\mu\mathrm{m})/1.24\ \mathrm{A/W}$$
Here $\eta$ is the quantum efficiency (fraction of incident photons that produce a collected electron–hole pair). Because $R$ scales with $\lambda$, the same detector is more sensitive at 1550 nm than at 850 nm — and with $\eta = 1$ the responsivity reaches 1.25 A/W at 1550 nm, which is why a responsivity above 1 A/W is perfectly normal and does not violate energy conservation. The 1.24 constant is the photon energy in eV·µm. In electronvolts the photon energy is:
$$E = 1.24/\lambda(\mu\mathrm{m})$$
so a 1.3 µm photon carries 0.95 eV and cannot be detected by a silicon detector (bandgap 1.12 eV) — the reason 1310/1550 nm systems use InGaAs or germanium. Quantum efficiency from a measurement is $\eta = (I_p/q)/(P_{opt}/h\nu)$, the ratio of electron rate to photon rate, and no detector can exceed $\eta = 1$ even though $R$ can exceed 1 A/W.

**PIN versus APD.** A PIN photodiode has no internal gain: it is fast, linear and low-noise, but the photocurrent must be large enough that the receiver's thermal noise does not dominate, which is why PIN receivers are paired with low-noise preamplifiers. An APD multiplies the photocurrent by an internal avalanche gain $M$ (typically 10–100), which lifts the signal above the preamplifier noise — but the multiplication is a random process with an excess noise factor $F(M)$ that grows with $M$, and the avalanche breakdown voltage drifts with temperature, so an APD needs a temperature-compensated bias supply. The optimum $M$ balances multiplied shot noise against fixed thermal noise; cranking $M$ up to its maximum is a classic error. The choice also depends on wavelength: silicon APDs work to about 1 µm, InGaAs APDs cover 1310/1550 nm.

**The power budget and the rise-time budget.** Every element between transmitter and receiver is a dB loss: fiber ($\alpha L$), splices (~0.1 dB each), connectors (~0.5 dB each), and any passive splitter or WDM. The received power is $P_{rx} = P_{tx} - \sum \mathrm{losses}$, and the link closes when $P_{rx}$ exceeds the receiver sensitivity by the design margin (typically 3–6 dB for ageing, temperature, repair splices and measurement tolerance). The same link must also pass the time budget: the system rise time is the root-sum-square of the source, fiber (dispersion) and detector/preamp contributions:
$$t_{sys} = \sqrt{t_{tx}^2 + t_{fiber}^2 + t_{rx}^2}$$
NRZ transmission then needs roughly $B \le 0.35/t_{sys}$. Because the contributions add in quadrature, a single dominant term sets the limit — spending money on a faster detector when the fiber dispersion already dominates buys nothing.

**Where the simple budgets fail.** The linear power budget above assumes the only noise is at the receiver; in a long-haul amplified system the optical signal-to-noise ratio (OSNR) from accumulated amplifier spontaneous emission becomes the limit, not the received power. Receiver sensitivity itself is specified at a given bit rate and BER and is worsened by extinction-ratio degradation and by relative intensity noise; a laser with a poor extinction ratio can lose several dB. And the rise-time rule $B \le 0.35/t_{sys}$ is a Gaussian, non-return-to-zero rule of thumb: it does not apply to dispersion-broadened pulses that are not Gaussian, for which $B \le 1/(2\Delta\tau)$ from `[[15_Fiber_Attenuation_and_Dispersion]]` is the appropriate limit.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Responsivity | $R = \dfrac{\eta q\lambda}{hc} = \dfrac{\eta\,\lambda(\mu\mathrm{m})}{1.24}\ \mathrm{A/W}$ | lambda in MICROMETRES in the second form. R can exceed 1 A/W (1.25 A/W at 1550 nm with eta = 1) because it is amps per watt, not a quantum efficiency. |
| Photocurrent | $I_p = R\,P_{opt}$ | R in A/W, P_opt in W (or R in A/mW with P in mW). A 0.84 A/W detector with 10 uW gives 8.4 uA — microamps, which is why preamplifier noise matters. |
| Quantum efficiency from measurement | $\eta = \dfrac{I_p/q}{P_{opt}/(h\nu)} = \dfrac{R\,h\,c}{q\lambda}$ | Ratio of electron rate to photon rate; must be <= 1 (typically 0.6-0.9). A computed eta above 1 means the wavelength was entered in nm instead of um. |
| Photon energy | $E = \dfrac{hc}{\lambda} = \dfrac{1.24}{\lambda(\mu\mathrm{m})}\ \mathrm{eV}$ | 1.3 um -> 0.95 eV, 1.55 um -> 0.80 eV, 0.85 um -> 1.46 eV. The detector material bandgap must be below this energy to absorb. |
| APD multiplied photocurrent | $I_p = M\,R\,P_{opt}$ | M = 10-100. Gain multiplies the signal AND the shot noise (excess noise factor F(M)), and the bias is temperature sensitive; optimum M is not the maximum M. |
| System rise time | $t_{sys} = \sqrt{t_{tx}^2 + t_{fiber}^2 + t_{rx}^2}$ | Independent contributions add in QUADRATURE, not linearly. 0.1, 0.5 and 0.3 ns give 0.59 ns, not 0.90 ns. |
| NRZ bandwidth from rise time | $B \le \dfrac{0.35}{t_{sys}}$ | Gaussian NRZ rule of thumb; t_sys in seconds. For a dispersion-broadened (non-Gaussian) pulse use B <= 1/(2 Delta-tau) instead. |
| Received power | $P_{rx}(\mathrm{dBm}) = P_{tx}(\mathrm{dBm}) - \alpha L - N_c L_c - N_s L_s - L_{split}$ | All terms in dB. Connector ~0.5 dB, splice ~0.1 dB, a 1:2 splitter 3.5 dB (not 3 dB - it has excess loss). |
| System margin | $M = P_{rx} - P_{sens}$ | Both in dBm, so the difference is in dB. Must exceed the design margin (3-6 dB); a positive but 1 dB margin is a link that fails in service. |
| Maximum allowable loss budget | $L_{allow} = P_{tx} - P_{sens} - M$ | The dB envelope that fiber, splices, connectors and splitters must fit inside. Solve it first, then allocate. |

## Worked Problems

### P1. An InGaAs photodiode has quantum efficiency 0.8 at 1.3 µm. Find its responsivity and the photocurrent produced by 10 µW of incident optical power.

**Given:** \eta = 0.8; \lambda = 1.3\ \mu m; P_{opt} = 10\ \mu W

**Solution:**

1. $R = \eta\lambda(\mu\mathrm{m})/1.24 = 0.8 \times 1.3/1.24$
2. $= 1.04/1.24 = 0.839\ \mathrm{A/W}$
3. $I_p = R P_{opt} = 0.839 \times 10\times10^{-6}$
4. $I_p = 8.39\times10^{-6}\ \mathrm{A} = 8.39\ \mu\mathrm{A}$

> [!success]- Answer
> **$R = 0.839\ \mathrm{A/W}$; $I_p = 8.39\ \mu\mathrm{A}$.**

> [!warning] Trap
> Substituting $\lambda = 1300\ \mathrm{nm}$ into $\eta\lambda/1.24$. The 1.24 constant is calibrated for micrometres, so 1300 nm must be entered as 1.3 — using 1300 gives 839 A/W, a thousand times too large.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.8×1.3÷1.24` → $R$ = **0.8387** A/W. The 1.24 is eV·µm, so $\lambda$ enters as 1.3 and not 1300.
> 2. `Ans×10×10^-6` → $I_p$ = **8.387×10^-6** A = **8.39** µA.

### P2. A 10 km link runs at 0.35 dB/km with a 0 dBm transmitter, 2 connectors at 0.5 dB and 5 splices at 0.1 dB. Find the received power, and the margin if the receiver sensitivity is -28 dBm and the design margin requirement is 3 dB.

**Given:** P_{tx} = 0\ \mathrm{dBm}; L = 10 km; \alpha = 0.35\ \mathrm{dB/km}; 2 connectors \times 0.5 dB; 5 splices \times 0.1 dB; P_{sens} = -28\ \mathrm{dBm}; required margin = 3 dB

**Solution:**

1. Fiber loss: $0.35 \times 10 = 3.5\ \mathrm{dB}$
2. Fixed losses: connectors $2 \times 0.5 = 1.0\ \mathrm{dB}$; splices $5 \times 0.1 = 0.5\ \mathrm{dB}$
3. Total: $3.5 + 1.0 + 0.5 = 5.0\ \mathrm{dB}$ of loss; add the 3 dB design margin to get an 8 dB working budget
4. $P_{rx} = 0 - 5.0 = -5.0\ \mathrm{dBm}$
5. System margin against sensitivity: $M = -5.0 - (-28) = 23\ \mathrm{dB}$, of which 3 dB is reserved, leaving 20 dB of excess margin

> [!success]- Answer
> **$P_{rx} = -5.0\ \mathrm{dBm}$; margin against sensitivity $= 23\ \mathrm{dB}$, i.e. 20 dB after reserving the 3 dB design margin. The link closes.**

> [!warning] Trap
> Comparing $P_{rx}$ with the sensitivity without noticing the units: both are dBm, so the difference is in dB. Also common is adding the 3 dB design margin to the received power instead of subtracting it from the allowable budget, which makes a marginal link look comfortable.

### P3. A transmitter has 0.1 ns rise time, the fiber contributes 0.5 ns of broadening and the receiver 0.3 ns. Find the system rise time and the maximum NRZ bit rate.

**Given:** t_{tx} = 0.1\ \mathrm{ns}; t_{fiber} = 0.5\ \mathrm{ns}; t_{rx} = 0.3\ \mathrm{ns}

**Solution:**

1. $t_{sys} = \sqrt{t_{tx}^2 + t_{fiber}^2 + t_{rx}^2}$
2. $= \sqrt{0.01 + 0.25 + 0.09} = \sqrt{0.35}$
3. $t_{sys} = 0.5916\ \mathrm{ns} = 5.916\times10^{-10}\ \mathrm{s}$
4. $B \le 0.35/t_{sys} = 0.35/(5.916\times10^{-10})$
5. $B \le 5.92\times10^{8}\ \mathrm{Hz} \approx 592\ \mathrm{MHz}$

> [!success]- Answer
> **$t_{sys} = 0.592\ \mathrm{ns}$, so $B \le 592\ \mathrm{Mb/s}$ (NRZ, 0.35 rule).**

> [!warning] Trap
> Adding the rise times linearly to get 0.9 ns and therefore 389 MHz. Independent rise-time contributions combine in quadrature, and the answer differs by more than 50%. Note the fiber term dominates, so upgrading the 0.3 ns receiver barely helps.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(0.1²+0.5²+0.3²)` → $t_{sys}$ = **0.5916** ns. Quadrature, not the 0.9 ns linear sum.
> 2. `0.35÷(Ans×10^-9)` → $B$ = **5.92×10^8** Hz ≈ **592** MHz; the 0.5 ns fiber term dominates.

### P4. A photodiode delivers 10 µA of photocurrent when 15 µW at 1.3 µm is incident. Find its responsivity and quantum efficiency, and state whether the operating wavelength is compatible with a silicon detector.

**Given:** I_p = 10\ \mu A; P_{opt} = 15\ \mu W; \lambda = 1.3\ \mu m

**Solution:**

1. $R = I_p/P_{opt} = 10\ \mu\mathrm{A}/15\ \mu\mathrm{W} = 0.667\ \mathrm{A/W}$
2. $\eta = R\,h\,c/(q\lambda) = R \times 1.24/\lambda(\mu\mathrm{m})$
3. $\eta = 0.667 \times 1.24/1.3 = 0.827/1.3 = 0.636$ (63.6%)
4. The result is below 1, so it is physically consistent
5. Photon energy: $E = 1.24/1.3 = 0.95\ \mathrm{eV}$, below silicon's 1.12 eV bandgap, so silicon cannot detect 1.3 µm — an InGaAs or Ge detector is required

> [!success]- Answer
> **$R = 0.667\ \mathrm{A/W}$, $\eta = 0.64$; 1.3 µm needs InGaAs/Ge, not silicon.**

> [!warning] Trap
> Mixing the two directions of the responsivity formula: $R = \eta\lambda/1.24$ converts efficiency to responsivity, while $\eta = 1.24 R/\lambda$ goes the other way. Swapping them gives $\eta = 0.667 \times 1.3/1.24 = 0.70$ — plausible-looking and wrong. Also, do not reject an $\eta$ below 1 as an error while forgetting that $R$ can legitimately exceed 1 A/W.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10÷15` → $R$ = **0.667** A/W.
> 2. `Ans×1.24÷1.3` → $\eta$ = **0.636** (63.6 %); the inverted form gives the plausible-but-wrong 0.70.
> 3. `1.24÷1.3` → the photon energy **0.954** eV, below silicon's 1.12 eV gap, so 1.3 µm needs InGaAs or Ge.

## Traps & Exam Notes

- **Using nanometres in $R = \eta\lambda/1.24$.** The 1.24 constant is photon energy in eV·µm, so $\lambda$ must be in micrometres. Entering 1300 instead of 1.3 inflates the responsivity by $10^{3}$ and the photocurrent with it.
- **Confusing responsivity with quantum efficiency.** $R$ has units A/W and CAN exceed 1 (1.25 A/W at 1550 nm with $\eta = 1$); $\eta$ is dimensionless and can never exceed 1. Quoting $\eta = 1.2$ or rejecting $R = 1.1\ \mathrm{A/W}$ as impossible are both unit errors.
- **Adding rise times linearly instead of in quadrature.** $t_{sys} = \sqrt{t_{tx}^2+t_{fiber}^2+t_{rx}^2}$. Summing 0.1, 0.5 and 0.3 ns to 0.9 ns gives 389 MHz instead of 592 MHz — and hides the useful conclusion that the fiber term dominates the budget.
- **Using the 0.35 rise-time rule on a dispersion-broadened pulse.** $B \le 0.35/t_{sys}$ assumes a Gaussian NRZ pulse; a fiber-broadened pulse is not Gaussian, and the appropriate dispersion limit is $B \le 1/(2\Delta\tau)$ from `[[15_Fiber_Attenuation_and_Dispersion]]`.
- **Omitting the design margin, or applying it twice.** A 3–6 dB margin covers ageing, temperature, repair splices and connector degradation. It is subtracted from the allowable loss budget once; subtracting it from $P_{rx}$ and then again when comparing to sensitivity double-counts it.
- **Assuming maximum APD gain is best.** Shot noise and the excess noise factor $F(M)$ grow faster than $M^2$ at high gain, so there is an optimum $M$ set by the preamplifier's thermal noise. Beyond it the SNR degrades while the bias circuit becomes more temperature-critical.
- **Choosing an LED for a long single-mode span because it is cheap.** A 30–60 nm linewidth produces $\Delta\tau = D L \Delta\lambda$ of many nanoseconds over tens of kilometres, and the LED's low launched power and poor single-mode coupling make the power budget hopeless as well.
- **Using a silicon detector at 1310/1550 nm.** Silicon's 1.12 eV bandgap corresponds to about 1.1 µm, so 1.3 µm photons (0.95 eV) pass straight through. This is a material bandgap limit, not a sensitivity or bias problem.

## See Also

- [[15_Fiber_Attenuation_and_Dispersion]]
- [[14_Optical_Fiber_NA,_V_Number_and_Modes]]
- [[03_Thermal_and_Johnson_Noise]]
- [[05_SNR,_Noise_Factor_and_Noise_Figure]]

---

[[15_Fiber_Attenuation_and_Dispersion|⬅ 15]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
