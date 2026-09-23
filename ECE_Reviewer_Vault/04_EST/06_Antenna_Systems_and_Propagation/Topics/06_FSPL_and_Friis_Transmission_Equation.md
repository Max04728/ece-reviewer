---
id: EST-06-06
title: "FSPL and Friis Transmission Equation"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 6
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Antenna_Parameters_Directivity,_Gain,_EIRP]]", "[[02_Radiation_Resistance,_Efficiency_and_Capture_Area]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — FSPL and Friis Transmission Equation

> [!abstract] Scope
> Compute free-space path loss and use the Friis transmission equation to find received power, antenna gain or maximum line-of-sight range, and to read and build a link budget.

## Core Concept

> [!tip] Intuition
> A transmitting antenna spreads its power over an ever-growing sphere, and the receiving antenna captures only the small patch of that sphere its effective aperture covers. Path loss is that geometric spreading — nothing is absorbed, the power is simply spread thinner.

**From radiated power to received power.** An antenna radiating $P_t$ with gain $G_t$ produces a power density at distance $d$ of $$S = \frac{P_t G_t}{4\pi d^2} \quad \mathrm{W/m^2}.$$ The receiving antenna does not collect power in proportion to its physical size but in proportion to its **effective aperture** $A_e = G_r\lambda^2/(4\pi)$. Multiplying the two gives the Friis transmission equation: $$P_r = S\,A_e = P_t G_t G_r \left(\frac{\lambda}{4\pi d}\right)^2.$$ Everything else in this note is a rearrangement of that one line. Note that the equation is symmetric — swapping the two antennas changes nothing, which is the reciprocity theorem showing through.

**What free-space path loss really is.** Define the free-space path loss as the reciprocal of the geometric factor, $$\mathrm{FSPL} = \left(\frac{4\pi d}{\lambda}\right)^2 = \left(\frac{4\pi d f}{c}\right)^2.$$ It is a *spreading* factor, not a dissipative loss: no energy disappears, and if the receiving aperture were large enough all of the transmitted power would be recovered. Two consequences are worth memorising as rates: FSPL rises $6.02$ dB every time the distance doubles, and $6.02$ dB every time the frequency doubles. That second rule holds only for antennas of fixed *gain*; if instead the physical aperture is fixed, $G$ itself rises as $f^2$ and the received power rises as $f^2$ — see the derivation below, because this is the most misquoted statement in the topic.

**The working dB form and where 32.44 comes from.** Converting the definition with $d$ in kilometres and $f$ in megahertz gives $$\mathrm{FSPL(dB)} = 32.44 + 20\log_{10} d_{km} + 20\log_{10} f_{MHz}.$$ Equivalent constants for other unit pairs are $92.44$ with $d$ in km and $f$ in GHz, and $36.6$ with $d$ in statute miles and $f$ in MHz. The constant is not empirical: it is $20\log_{10}(4\pi \times 10^{9}/c)$, which is the $4\pi d/\lambda$ factor with the $10^3$ (km) and $10^6$ (MHz) conversions folded in. The practical content is that path loss grows $20$ dB per decade of distance — a $10\times$ range increase costs $20$ dB, and recovering $20$ dB needs $100\times$ the power.

**The link budget.** Turning Friis into a bookkeeping equation, $$P_r(\mathrm{dBm}) = P_t(\mathrm{dBm}) + G_t(\mathrm{dBi}) + G_r(\mathrm{dBi}) - \mathrm{FSPL(dB)} - L_{misc},$$ where $L_{misc}$ collects feed-line loss, pointing loss, atmospheric absorption, rain and polarization mismatch. The combined $P_t + G_t$ is the **EIRP**, the power an isotropic radiator would need to produce the same density in the wanted direction; a closely related figure is the **ERP**, referenced to a half-wave dipole instead of an isotropic radiator, and because a dipole has $G = 1.64 = 2.15$ dBi, $\mathrm{EIRP} = 1.64\,\mathrm{ERP}$ and $\mathrm{dBi} = \mathrm{dBd} + 2.15$. A link closes when the received power exceeds the receiver sensitivity; the difference between the two is the **fade margin**.

**Do not confuse this Friis with the other Friis.** This note's equation, $P_r = P_t G_t G_r (\lambda/4\pi d)^2$, answers *how much signal arrives* — it is a power-transfer, or link-budget, relation. The **Friis cascaded noise formula** in `[[07_Friis_Cascaded_Noise_Formula]]` reads:
$$F = F_1 + (F_2-1)/G_1 + (F_3-1)/(G_1G_2) + \cdots$$
It answers a completely different question: *how noisy is a chain of stages*, and it is governed by the first stage because later stages are diluted by the gain ahead of them. Both are credited to Harald Friis, both are used in the same receiver, and no term of one appears in the other. A question quoting noise figures and stage gains wants the second; a question quoting distance, frequency and antenna gains wants the first.

**When Friis does not apply.** The equation assumes far-field, free-space, line-of-sight propagation with polarization-matched antennas and no obstructions. Far field starts at the Fraunhofer distance $R_{ff} = 2D^2/\lambda$ measured from the largest aperture $D$; closer than that the antenna pattern is not yet formed and both $G$ and $A_e$ are meaningless. Ground reflections make the two-ray model apply instead, where the received field falls off as $1/d^2$ in power (a $40\log_{10}d$ loss) beyond the breakpoint — much faster than free space. Atmospheric gases, rain and foliage add real absorption that FSPL does not contain, and a polarization mismatch costs a factor $\cos^2\psi$ in power. Finally, the formula has no horizon: it will happily predict a usable signal far beyond the radio horizon computed in `[[08_Space_Wave_and_Radio_Horizon]]`, so the shorter of the two always governs.

## Derivation

**Friis from power density and effective aperture.** Isotropic radiation from $P_t$ spreads uniformly over the surface of a sphere, so $S = P_t/(4\pi d^2)$. A transmit antenna with gain $G_t$ concentrates that by a factor $G_t$ in the wanted direction, giving $S = P_t G_t/(4\pi d^2)$. The receiving antenna intercepts an effective area $A_e$, and the power it delivers to a matched load is $P_r = S A_e$. Substituting the aperture–gain relation $A_e = G_r\lambda^2/(4\pi)$: $$P_r = \frac{P_t G_t}{4\pi d^2} \cdot \frac{G_r \lambda^2}{4\pi} = P_t G_t G_r \left(\frac{\lambda}{4\pi d}\right)^2.$$ Nothing in this derivation requires the aperture to be a physical dish; $A_e$ is a bookkeeping area that makes the gain relation exact.

**The 32.44 constant.** Start from $\mathrm{FSPL} = (4\pi d/\lambda)^2$ and take $20\log_{10}$: $$\mathrm{FSPL(dB)} = 20\log_{10}\left(\frac{4\pi}{c}\right) + 20\log_{10} d_{(m)} + 20\log_{10} f_{(Hz)}.$$ Now substitute the mixed units $d = 10^3 d_{km}$ and $f = 10^6 f_{MHz}$: $$20\log_{10}\left(\frac{4\pi \cdot 10^3 \cdot 10^6}{c}\right) = 20\log_{10}\left(\frac{4\pi \times 10^9}{3\times10^8}\right) = 20\log_{10}(41.888) = 32.44.$$ The remaining two terms become $20\log_{10} d_{km} + 120$ and $20\log_{10} f_{MHz} + 120$, and it is the sum of those $+120$s and the $-87.56$ base term that collapses into the single $32.44$. Using GHz instead of MHz removes another $60$ dB of offset, giving $92.44$.

**The two 6 dB rules, and the fixed-aperture exception.** Doubling $d$ multiplies the bracket $(\lambda/4\pi d)^2$ by $1/4$, i.e. $-6.02$ dB, so at fixed gains the received power falls $6$ dB per octave of distance. Doubling $f$ shortens $\lambda$, so FSPL *rises* $6.02$ dB — but only if the antenna gains are held constant. If instead the *physical* apertures are held constant, substitute $G_t = 4\pi A_t/\lambda^2$ and $G_r = 4\pi A_r/\lambda^2$ into Friis: $$P_r = P_t \frac{4\pi A_t}{\lambda^2}\cdot\frac{4\pi A_r}{\lambda^2}\cdot\frac{\lambda^2}{16\pi^2 d^2} = \frac{P_t A_t A_r}{\lambda^2 d^2}.$$ Now $P_r \propto 1/\lambda^2 \propto f^2$: with fixed dishes, raising the frequency *increases* the received power. Both statements are correct statements about different constraints, and a question is only answerable if you know which one is being held fixed.

**Converting between received power units.** $\mathrm{dBm}$ is referenced to $1\ \mathrm{mW}$, so $P(\mathrm{dBm}) = 10\log_{10}\left[P(\mathrm{mW})\right]$ and $P(\mathrm{mW}) = 10^{P(\mathrm{dBm})/10}$. Hence $-66.5\ \mathrm{dBm} = 2.23\times10^{-7}\ \mathrm{mW} = 2.23\times10^{-10}\ \mathrm{W} = 223\ \mathrm{pW}$. The conversion is the step where most link-budget marks are lost, because the answer must be stated in whichever unit the question asked for, and because a sign slip in the exponent moves the answer by orders of magnitude rather than by a few percent.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Power density at distance d | $S = \frac{P_t G_t}{4\pi d^2}$ | Far-field only. Isotropic case is G_t = 1; multiply by the transmit gain for a directive antenna. |
| Effective aperture | $A_e = \frac{G \lambda^2}{4\pi} = \frac{D \lambda^2}{4\pi} \ (\mathrm{lossless})$ | A bookkeeping area. Falls as frequency rises for a fixed gain. |
| Friis transmission equation | $P_r = P_t G_t G_r \left(\frac{\lambda}{4\pi d}\right)^2$ | Both antennas matched in polarization, far-field, no obstructions. Symmetric in the two antennas. |
| Free-space path loss | $\mathrm{FSPL} = \left(\frac{4\pi d}{\lambda}\right)^2 = \left(\frac{4\pi d f}{c}\right)^2$ | A spreading factor, not absorption. Dimensionless ratio, quoted in dB. |
| FSPL, km and MHz | $\mathrm{FSPL(dB)} = 32.44 + 20\log_{10} d_{km} + 20\log_{10} f_{MHz}$ | The board-exam form. 6 dB per doubling of either distance or frequency. |
| FSPL, km and GHz | $\mathrm{FSPL(dB)} = 92.44 + 20\log_{10} d_{km} + 20\log_{10} f_{GHz}$ | Same physics, 60 dB offset in the constant. |
| FSPL, statute miles and MHz | $\mathrm{FSPL(dB)} = 36.6 + 20\log_{10} d_{mi} + 20\log_{10} f_{MHz}$ | Use only if the distance is given in miles; the constants are not interchangeable. |
| Link budget | $P_r = P_t + G_t + G_r - \mathrm{FSPL} - L_{misc}$ | All terms in dB, powers in dBm or dBW. L_misc covers feed, pointing, rain and polarization. |
| EIRP | $\mathrm{EIRP} = P_t G_t, \qquad \mathrm{EIRP(dBm)} = P_t(\mathrm{dBm}) + G_t(\mathrm{dBi})$ | What an isotropic radiator would need to match the wanted-direction density. |
| ERP and the dBd/dBi offset | $\mathrm{ERP} = \frac{\mathrm{EIRP}}{1.64}, \qquad \mathrm{dBi} = \mathrm{dBd} + 2.15$ | ERP is referenced to a half-wave dipole. Mixing dBd and dBi shifts every answer by 2.15 dB. |
| Fixed-aperture form | $P_r = \frac{P_t A_t A_r}{\lambda^2 d^2}$ | Use when the physical apertures are fixed, not the gains; then P_r rises as f-squared. |
| Far-field (Fraunhofer) distance | $R_{ff} = \frac{2D^2}{\lambda}$ | D is the largest aperture dimension. Closer than this, G and A_e are not defined. |
| Polarization mismatch loss | $\frac{P_r}{P_{r,max}} = \cos^2\psi$ | psi is the angle between the polarization vectors. 45 degrees costs 3 dB; cross-polar is total loss. |
| Two-ray (flat earth) falloff | $P_r \propto \frac{1}{d^4} \ \Rightarrow \ 40\log_{10} d \ \mathrm{loss}$ | Applies beyond the breakpoint when a strong ground reflection exists; steeper than free space. |

## Worked Problems

### P1. Find the free-space path loss for a $30$ km link at $6$ GHz.

**Given:** $d = 30\ \mathrm{km}$; $f = 6000\ \mathrm{MHz}$

**Solution:**

1. $20\log_{10}(30) = 20(1.4771) = 29.54\ \mathrm{dB}$
2. $20\log_{10}(6000) = 20(3.7782) = 75.56\ \mathrm{dB}$
3. $\mathrm{FSPL} = 32.44 + 29.54 + 75.56$
4. $\mathrm{FSPL} = 137.54\ \mathrm{dB}$

> [!success]- Answer
> **$\mathrm{FSPL} = 137.5\ \mathrm{dB}$.**

> [!warning] Trap
> Substituting $f = 6$ for "6 GHz". The constant $32.44$ is tied to MHz, so either use $6000$ MHz or switch to the $92.44$ constant with $f = 6$ GHz — never mix the two.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `32.44+20log(30)+20log(6000)` → FSPL = **137.5** dB.
> 2. `20log(30)` = **29.54** and `20log(6000)` = **75.56** if you prefer the note's three-term split.
>
> Key the whole line: it returns 137.5455 dB, while adding the pre-rounded 29.54 + 75.56 drifts to the note's 137.54.

### P2. A 2.4 GHz Wi-Fi link spans $10$ km of clear line of sight. Find the path loss.

**Given:** $d = 10\ \mathrm{km}$; $f = 2400\ \mathrm{MHz}$

**Solution:**

1. $20\log_{10}(10) = 20\ \mathrm{dB}$
2. $20\log_{10}(2400) = 20(3.3802) = 67.60\ \mathrm{dB}$
3. $\mathrm{FSPL} = 32.44 + 20 + 67.60$
4. $\mathrm{FSPL} = 120.04\ \mathrm{dB}$

> [!success]- Answer
> **$\mathrm{FSPL} = 120.0\ \mathrm{dB}$.**

> [!warning] Trap
> Assuming a licence-free band is somehow exempt from path loss, or subtracting a "free-space" discount. The formula is frequency-blind to regulation; only the constants change when you change units.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `32.44+20log(10)+20log(2400)` → FSPL = **120.0** dB.
> 2. `92.44+20log(10)+20log(2.4)` → the same **120.0** dB with the km/GHz constant. The two constants are interchangeable, never mixable.

### P3. A $20$ dBm transmitter feeds a $30$ dBi antenna, and the receiver uses a $20$ dBi antenna $40$ km away at $4$ GHz. Find the received power in dBm.

**Given:** $P_t = 20\ \mathrm{dBm}$; $G_t = 30\ \mathrm{dBi}$; $G_r = 20\ \mathrm{dBi}$; $d = 40\ \mathrm{km}$; $f = 4000\ \mathrm{MHz}$

**Solution:**

1. $20\log_{10}(40) = 20(1.6021) = 32.04\ \mathrm{dB}$
2. $20\log_{10}(4000) = 20(3.6021) = 72.04\ \mathrm{dB}$
3. $\mathrm{FSPL} = 32.44 + 32.04 + 72.04 = 136.52\ \mathrm{dB}$
4. $P_r = P_t + G_t + G_r - \mathrm{FSPL} = 20 + 30 + 20 - 136.52$
5. $P_r = -66.52\ \mathrm{dBm}$

> [!success]- Answer
> **$P_r = -66.5\ \mathrm{dBm}$.**

> [!warning] Trap
> Subtracting the antenna gains instead of adding them. Gains reduce the path loss experienced by the link; only FSPL and $L_{misc}$ are subtracted.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `32.44+20log(40)+20log(4000)` → FSPL = **136.52** dB.
> 2. `20+30+20-Ans` → $P_r$ = **-66.52** dBm: every gain is added, only FSPL and $L_\mathrm{misc}$ are subtracted.

### P4. Express the received power of the previous problem in watts, and state whether a receiver with $-85$ dBm sensitivity closes the link.

**Given:** $P_r = -66.52\ \mathrm{dBm}$; receiver sensitivity $= -85\ \mathrm{dBm}$

**Solution:**

1. $P_r(\mathrm{mW}) = 10^{-66.52/10} = 10^{-6.652}$
2. $10^{-6.652} = 10^{-7}\times10^{0.348} = 2.23\times10^{-7}\ \mathrm{mW}$
3. $P_r = 2.23\times10^{-7}\ \mathrm{mW} \times 10^{-3} = 2.23\times10^{-10}\ \mathrm{W} = 223\ \mathrm{pW}$
4. Fade margin $= -66.52 - (-85) = 18.48\ \mathrm{dB} > 0$, so the link closes

> [!success]- Answer
> **$P_r = 2.23\times10^{-10}\ \mathrm{W} = 223\ \mathrm{pW}$; the link closes with $18.5$ dB of margin.**

> [!warning] Trap
> Dropping a factor of $1000$ between dBm and watts. dBm is referenced to a milliwatt, so $-66.52$ dBm is $2.2\times10^{-10}$ W, not $2.2\times10^{-7}$ W.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(-66.52÷10)` → **2.228×10^-7** mW — dBm is referenced to a milliwatt.
> 2. `Ans÷1000` → **2.23×10^-10** W = **223** pW.
> 3. `-66.52+85` → fade margin **18.5** dB > 0, so the link closes.

### P5. A 5.8 GHz link uses $20$ dBm transmitters and $24$ dBi antennas at both ends. The receiver needs $-80$ dBm. Find the maximum free-space range.

**Given:** $P_t = 20\ \mathrm{dBm}$; $G_t = G_r = 24\ \mathrm{dBi}$; $f = 5800\ \mathrm{MHz}$; sensitivity $= -80\ \mathrm{dBm}$

**Solution:**

1. Available path loss: $\mathrm{FSPL} = P_t + G_t + G_r - P_{min} = 20 + 24 + 24 - (-80) = 148\ \mathrm{dB}$
2. $20\log_{10}(5800) = 20(3.7634) = 75.27\ \mathrm{dB}$
3. $20\log_{10} d = 148 - 32.44 - 75.27 = 40.29\ \mathrm{dB}$
4. $d = 10^{40.29/20} = 10^{2.0145} = 103.4\ \mathrm{km}$
5. Sanity check against the radio horizon: a $103$ km path needs both antennas very high, so the horizon usually governs first

> [!success]- Answer
> **$d_{max} = 103\ \mathrm{km}$ from the loss budget alone — but the line-of-sight horizon will normally be the binding limit.**

> [!warning] Trap
> Reporting the free-space answer as the achievable range without checking the horizon. Friis has no horizon term; a $103$ km hop at 5.8 GHz needs roughly $800$ m of antenna height at each end, so the real answer is far shorter.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20+24+24-(-80)` → allowable FSPL = **148** dB.
> 2. `(148-32.44-20log(5800))÷20` → **2.0146**; `10^Ans` → $d$ = **103.4** km.
> 3. Or solve it in place: `32.44+20log(X)+20log(5800)` `ALPHA` `=` `148`, then `SHIFT` `SOLVE` with X near 100.

### P6. A link is closing with a comfortable margin. How much extra transmit power is needed to double the range, assuming the antennas and frequency are unchanged?

**Given:** free-space, line-of-sight link; antennas and frequency fixed

**Solution:**

1. FSPL depends on distance as $20\log_{10} d$, so doubling $d$ adds $20\log_{10} 2 = 6.02\ \mathrm{dB}$
2. The extra transmit power must make up exactly that deficit
3. $\Delta P(\mathrm{dB}) = 6.02\ \mathrm{dB}$
4. Convert to a power ratio: $10^{6.02/10} = 4.0$

> [!success]- Answer
> **An extra $6$ dB — that is, **four times** the transmit power to double the range.**

> [!warning] Trap
> Answering "twice the power". The $6$ dB is a power-ratio of $4$, not $2$; a mental shortcut of "double the distance, double the power" is wrong by a factor of two and gets worse for larger range increases.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20log(2)` → **6.02** dB of extra loss when $d$ doubles.
> 2. `10^(Ans÷10)` → **4.00** times the transmit power, not twice.

### P7. Two identical antennas each present $1\ \mathrm{m^2}$ of effective aperture at a separation of $10$ km. With $P_t = 1$ W, compare the received power at $1$ GHz and at $2$ GHz.

**Given:** $A_t = A_r = 1\ \mathrm{m^2}$; $d = 10\ \mathrm{km}$; $P_t = 1\ \mathrm{W}$; $f = 1$ GHz and $2$ GHz

**Solution:**

1. With fixed physical apertures, Friis collapses to $P_r = \dfrac{P_t A_t A_r}{\lambda^2 d^2}$
2. At $1$ GHz: $\lambda = 0.3$ m, $P_r = \dfrac{1 \times 1 \times 1}{0.3^2 \times (10^4)^2} = \dfrac{1}{0.09 \times 10^8} = 1.11\times10^{-7}\ \mathrm{W}$
3. At $2$ GHz: $\lambda = 0.15$ m, $P_r = \dfrac{1}{0.0225 \times 10^8} = 4.44\times10^{-7}\ \mathrm{W}$
4. Ratio $= 4$, and indeed $P_r \propto f^2$ for fixed apertures $(2^2 = 4)$
5. Check the alternative reading: if the *gains* had been held fixed instead, the higher frequency would have lost $6$ dB rather than gained it

> [!success]- Answer
> **$P_r = 1.11\times10^{-7}$ W at 1 GHz and $4.44\times10^{-7}$ W at 2 GHz — a $6$ dB *improvement* at the higher frequency.**

> [!warning] Trap
> Quoting "higher frequency means more path loss" and predicting a $6$ dB loss. FSPL does rise with frequency, but a fixed physical aperture has a gain that rises as $f^2$, which more than cancels it. The answer depends entirely on whether gain or aperture is held constant.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷(0.3²×(10^4)²)` → $P_r$ = **1.111×10^-7** W at 1 GHz, with $d$ entered as 10^4 m.
> 2. `Ans×4` → **4.444×10^-7** W at 2 GHz: fixed apertures halve $\lambda$, so $P_r$ rises 6 dB.

### P8. A $500$ W transmitter drives an antenna rated $12$ dBd. Find the ERP and the EIRP in both watts and dBW.

**Given:** $P_t = 500\ \mathrm{W}$; $G = 12\ \mathrm{dBd}$

**Solution:**

1. $P_t = 10\log_{10}(500) = 26.99\ \mathrm{dBW}$
2. Convert the gain: $G = 12 + 2.15 = 14.15\ \mathrm{dBi}$
3. $\mathrm{ERP(dBW)} = 26.99 + 12 = 38.99\ \mathrm{dBW} \Rightarrow \mathrm{ERP} = 10^{3.899} = 7.92\ \mathrm{kW}$
4. $\mathrm{EIRP(dBW)} = 26.99 + 14.15 = 41.14\ \mathrm{dBW} \Rightarrow \mathrm{EIRP} = 10^{4.114} = 13.0\ \mathrm{kW}$
5. Check the ratio: $13.0/7.92 = 1.64 = 2.15\ \mathrm{dB}$ ✓

> [!success]- Answer
> **$\mathrm{ERP} = 7.92\ \mathrm{kW} = 38.99\ \mathrm{dBW}$; $\mathrm{EIRP} = 13.0\ \mathrm{kW} = 41.14\ \mathrm{dBW}$.**

> [!warning] Trap
> Treating dBd and dBi as interchangeable. A $12$ dBd antenna is $14.15$ dBi, so EIRP and ERP differ by $2.15$ dB — a silent error that survives every other step of a link budget.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10log(500)` → $P_t$ = **26.99** dBW; `12+2.15` → $G$ = **14.15** dBi.
> 2. `26.99+12 : 10^(Ans÷10)` → ERP = **38.99** dBW → **7925** W = **7.92** kW.
> 3. `26.99+14.15 : 10^(Ans÷10)` → EIRP = **41.14** dBW → **13 002** W = **13.0** kW. The ratio is 13.0/7.92 = **1.64**.

### P9. A $6$ GHz microwave link runs $50$ km with $30$ dBm transmitters and $35$ dBi antennas at each end. The receiver threshold is $-75$ dBm. Find the received power and the fade margin.

**Given:** $P_t = 30\ \mathrm{dBm}$; $G_t = G_r = 35\ \mathrm{dBi}$; $d = 50\ \mathrm{km}$; $f = 6000\ \mathrm{MHz}$; threshold $= -75\ \mathrm{dBm}$

**Solution:**

1. $20\log_{10}(50) = 20(1.6990) = 33.98\ \mathrm{dB}$
2. $20\log_{10}(6000) = 75.56\ \mathrm{dB}$
3. $\mathrm{FSPL} = 32.44 + 33.98 + 75.56 = 141.98\ \mathrm{dB}$
4. $P_r = 30 + 35 + 35 - 141.98 = -41.98\ \mathrm{dBm}$
5. Fade margin $= P_r - P_{threshold} = -41.98 - (-75) = 33.02\ \mathrm{dB}$

> [!success]- Answer
> **$P_r = -41.98\ \mathrm{dBm}$; fade margin $= 33.0\ \mathrm{dB}$.**

> [!warning] Trap
> Reporting the fade margin as $P_r + P_{threshold}$ or forgetting the sign of the threshold. Margin is always $P_r$ minus the *negative* threshold, so the two magnitudes add: $41.98 + 75$ would be wrong, but $75 - 41.98 = 33.02$ is right.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `32.44+20log(50)+20log(6000)` → FSPL = **141.98** dB.
> 2. `30+35+35-Ans` → $P_r$ = **-41.98** dBm.
> 3. `-41.98+75` → fade margin **33.0** dB: 75 - 41.98, not 75 + 41.98.

### P10. Two isotropic antennas are $1$ km apart at $1$ GHz with $P_t = 1$ W. Find the received power two ways: from the Friis bracket and from the FSPL in dB.

**Given:** $G_t = G_r = 1$ (isotropic); $d = 1\ \mathrm{km}$; $f = 1000\ \mathrm{MHz}$; $P_t = 1\ \mathrm{W}$

**Solution:**

1. $\lambda = c/f = 0.3\ \mathrm{m}$
2. Friis bracket: $\left(\dfrac{\lambda}{4\pi d}\right)^2 = \left(\dfrac{0.3}{4\pi \times 1000}\right)^2 = (2.387\times10^{-5})^2 = 5.70\times10^{-10}$
3. $P_r = 1 \times 1 \times 1 \times 5.70\times10^{-10} = 5.70\times10^{-10}\ \mathrm{W} = 570\ \mathrm{pW}$
4. In dB: $\mathrm{FSPL} = 32.44 + 20\log_{10}(1) + 20\log_{10}(1000) = 32.44 + 0 + 60 = 92.44\ \mathrm{dB}$
5. $P_r = 10\log_{10}(1\ \mathrm{W}) = 0\ \mathrm{dBW}$, so $P_r = 0 - 92.44 = -92.44\ \mathrm{dBW} = 10^{-9.244} = 5.70\times10^{-10}\ \mathrm{W}$ ✓

> [!success]- Answer
> **$P_r = 5.70\times10^{-10}\ \mathrm{W} = 570\ \mathrm{pW} = -92.44\ \mathrm{dBW}$.**

> [!warning] Trap
> Forgetting that the bracket already contains the $4\pi$ and then applying FSPL on top of it — that double-counts the spreading by $92$ dB. Use either the bracket or the dB formula, never both.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷1×10^9` → $\lambda$ = **0.3** m; `(Ans÷(4π×1000))²` → **5.699×10^-10**.
> 2. `32.44+20log(1)+20log(1000)` → FSPL = **92.44** dB; `10^(-Ans÷10)` → **5.70×10^-10** W (dBW, 1 W reference).
> 3. Both paths agree, which is the point: the bracket already carries the $4\pi$, so FSPL is never applied on top of it.

## Traps & Exam Notes

- **Friis transmission versus Friis cascaded noise.** This note's equation gives *received power* from $P_t$, gains, $\lambda$ and $d$. `[[07_Friis_Cascaded_Noise_Formula]]` gives the *overall noise factor* of a receiver chain, $F = F_1 + (F_2-1)/G_1 + \cdots$. A question about distance and antennas is never answered with noise figures, and vice versa; the shared name is the only overlap.
- **Mixing the FSPL constants.** $32.44$ needs km with MHz, $92.44$ needs km with GHz, $36.6$ needs miles with MHz. Using $f = 6$ (GHz) with the $32.44$ constant understates the loss by $60$ dB.
- **Treating FSPL as absorbed power.** Free-space path loss is geometric spreading; it is a ratio between isotropic apertures, not dissipation. This is why adding a bigger receiving antenna recovers the "lost" power, and why FSPL alone never explains a real fade.
- **"Higher frequency means more loss" without saying what is fixed.** At constant *gain*, $f$ doubling costs $6$ dB. At constant *physical aperture*, $f$ doubling *gains* $6$ dB because $G \propto f^2$. Both are standard results, and the question must be read to see which quantity is being held constant.
- **Forgetting that the gains add.** In the dB link budget every gain is added and only FSPL and the miscellaneous losses are subtracted. Subtracting antenna gain is a frequent sign error that shows up as an impossibly strong received signal.
- **Confusing dBd with dBi.** A $12$ dBd antenna is $14.15$ dBi; every EIRP, ERP and link-budget answer shifts by $2.15$ dB if the two are used interchangeably. ERP is referenced to a dipole, EIRP to an isotropic radiator, and $\mathrm{EIRP} = 1.64\,\mathrm{ERP}$.
- **dBm to watts slips of $10^3$.** $\mathrm{dBm}$ is referenced to a milliwatt, so $-66.5\ \mathrm{dBm} = 2.23\times10^{-10}\ \mathrm{W}$, not $2.23\times10^{-7}\ \mathrm{W}$. State the unit the question asked for and convert once, at the end.
- **Applying Friis inside the near field.** The equation presumes far field, at least $R_{ff} = 2D^2/\lambda$ from the antenna. Closer than that the gain and effective aperture do not exist, and the answer is meaningless however carefully it is computed.
- **Using Friis past the radio horizon.** Friis contains no horizon term and will return a healthy received power for a path that is physically blocked by the curvature of the earth. Always check $d$ against $3.57(\sqrt{h_t} + \sqrt{h_r})$ km in `[[08_Space_Wave_and_Radio_Horizon]]` and take the smaller range.
- **Assuming free space when the ground reflection dominates.** Over a flat, reflective path the two-ray model applies and the loss grows as $40\log_{10}d$ — the received power falls $12$ dB per doubling of distance, not $6$ dB. Free-space predictions are optimistic by an increasing margin with range.
- **Ignoring polarization mismatch.** A $45^\circ$ polarization error costs $3$ dB, and a cross-polarized link loses essentially everything. None of that appears in FSPL, so it must be entered as an explicit $L_{misc}$ term.

## See Also

- [[01_Antenna_Parameters_Directivity,_Gain,_EIRP]]
- [[02_Radiation_Resistance,_Efficiency_and_Capture_Area]]
- [[05_Parabolic_Reflector_Antennas]]
- [[08_Space_Wave_and_Radio_Horizon]]
- [[11_Radar_Range_Equation_and_Microwave_Links]]
- [[07_Friis_Cascaded_Noise_Formula]]

---

[[05_Parabolic_Reflector_Antennas|⬅ 05]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Ground_Wave_Propagation|07 ➡]]
