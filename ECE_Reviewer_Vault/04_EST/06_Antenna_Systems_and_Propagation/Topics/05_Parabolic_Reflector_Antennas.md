---
id: EST-06-05
title: "Parabolic Reflector Antennas"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 5
tier: 2
depth: full
problem_count: 4
prereqs: ["[[01_Antenna_Parameters_Directivity,_Gain,_EIRP]]", "[[02_Radiation_Resistance,_Efficiency_and_Capture_Area]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Parabolic Reflector Antennas

> [!abstract] Scope
> Compute parabolic dish gain, effective aperture and beamwidth from diameter and aperture efficiency, and choose an f/D ratio and feed type for a given requirement.

## Core Concept

> [!tip] Intuition
> A dish is an aperture that converts a spherical wave from the feed into a nearly plane wave leaving the mouth, so its gain is set by how many square wavelengths fit across the mouth — which is why gain goes as $(\pi D/\lambda)^2$, and why doubling the frequency quadruples the gain of an unchanged dish. Beamwidth does the mirror image: a bigger aperture in wavelengths means a narrower beam.

**The gain formula, and the single most common notational trap in the topic.** A parabolic reflector has $G = \eta_\mathrm{ap}(\pi D/\lambda)^2$, where $D$ is the **dish diameter** in metres and $\eta_\mathrm{ap}$ is the aperture efficiency. The symbol $D$ collides violently with the $D$ used for *directivity* in the rest of antenna theory, and exam questions exploit that collision deliberately. Read every occurrence in context: if it multiplies $\lambda$, or is squared inside a diameter fraction, or is given in metres, it is the dish diameter; if it is dimensionless and compared against $1.64$ or converted to dBi, it is directivity. In dB the formula separates cleanly:
$$G_\mathrm{dBi} = 10\log_{10}\eta_\mathrm{ap} + 20\log_{10}(\pi D/\lambda)$$
The $20$ sits in front of the diameter term because it is squared. Typical aperture efficiency is $0.55$ to $0.70$, and $0.55$ to $0.65$ for a front-fed dish, because the feed blocks part of the aperture, spills some power past the rim, and the aperture is not uniformly illuminated.

**The physical aperture, the effective aperture, and the identity that ties them.** The geometric mouth area is $A_\mathrm{phys} = \pi D^2/4$, but the dish behaves like a smaller uniformly illuminated aperture of area $A_e = \eta_\mathrm{ap}\pi D^2/4$ — the *effective* aperture, which is the number that matters for the Friis transmission equation and for the radar range equation. Substituting $A_e$ into the universal relation $G = 4\pi A_e/\lambda^2$ reproduces the dish gain formula exactly, which is the cleanest way to remember it:
$$G = 4\pi A_e/\lambda^2$$
is the definition, and the dish simply tells you what $A_e$ is. It also gives the standard sanity check — if a claimed gain implies an effective aperture larger than the physical dish, the claim is wrong, since $\eta_\mathrm{ap} \le 1$ by construction. A useful exam shortcut falls straight out of the algebra:
$$A_e = G\lambda^2/4\pi$$
so you can go from a gain in dBi and a frequency to an area without ever touching the dish diameter.

**Beamwidth, and why the constant is worth stating.** The half-power beamwidth of a uniformly illuminated circular aperture is given in degrees by:
$$\theta_\mathrm{HPBW} \approx 70\lambda/D$$
The first-null beamwidth between nulls is $\approx 140\lambda/D$ — the nulls are exactly twice as far out as the half-power points, which is a useful consistency check. Different texts quote $70$, $70.5$ or $75$ depending on the assumed illumination taper, so state which one you used rather than agonising over the constant; the $\lambda/D$ scaling is the part that carries marks. The consequence for exam arithmetic is dramatic: at fixed frequency, doubling the dish diameter halves the beamwidth, and at fixed diameter, doubling the frequency also halves it, because $\lambda$ halves. This is why deep-space antennas are enormous and why the same dish gets sharper as you push to higher frequencies.

**$f/D$ and the feed: the mechanical trade behind every dish design.** The ratio of focal length to diameter sets the geometry. A *deep* dish (low $f/D$) is compact and easy to mount, but the feed sees a wide angle, so it spills more power past the rim and the cross-polar response degrades; $f/D = 0.25$ is the practical minimum because the focal point must lie outside the dish mouth for the feed to be physically placed without blocking the aperture, and most production dishes sit around $f/D = 0.3$ to $0.4$. A shallow dish (high $f/D$) has a focal point far out in front, which needs a long support structure and a feed that does not block the aperture. The three standard feed arrangements follow from this: the **focal-point feed**, simplest but its blockage and spillover cap efficiency at about $0.55$ to $0.65$; the **Cassegrain** system, which puts a small hyperbolic subreflector near the focus so the feed can sit at the dish vertex, shortening the feed run and cutting the spillover that misses the subreflector; and the **Gregorian**, which uses an *elliptical* subreflector and images the feed more cleanly at the cost of a larger subreflector and therefore more blockage.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Parabolic dish gain (linear) | $G = \eta_\mathrm{ap}\left(\frac{\pi D}{\lambda}\right)^2$ | D is the DISH DIAMETER in metres, not directivity. eta_ap is the aperture efficiency, typically 0.55-0.70 (0.55-0.65 front-fed). |
| Parabolic dish gain (dBi) | $G_\mathrm{dBi} = 10\log_{10}\eta_\mathrm{ap} + 20\log_{10}\!\left(\frac{\pi D}{\lambda}\right)$ | The factor 20 is on the diameter term because it is squared. Do not use 10 log for the whole product. |
| Geometric aperture area | $A_\mathrm{phys} = \frac{\pi D^2}{4}$ | The physical mouth. The power actually captured is set by A_e, not by this. |
| Effective aperture of a dish | $A_e = \eta_\mathrm{ap}\frac{\pi D^2}{4}$ | Always smaller than the physical area. Use it in Friis and in the radar range equation. |
| Universal gain-aperture identity | $G = \frac{4\pi A_e}{\lambda^2} \iff A_e = \frac{G\lambda^2}{4\pi}$ | G linear. Substituting the dish A_e reproduces the dish gain formula, so this is the definition and the dish is the special case. |
| Half-power beamwidth | $\theta_\mathrm{HPBW} \approx \frac{70\lambda}{D}\ \mathrm{degrees}$ | Some texts use 70.5 or 75 depending on illumination taper; state which. Scales as lambda/D. |
| First-null beamwidth | $\theta_\mathrm{null} \approx \frac{140\lambda}{D}\ \mathrm{degrees}$ | Exactly twice the HPBW for a uniform circular aperture. A fast consistency check on a stated HPBW. |
| Focal length from f/D | $f = \left(\frac{f}{D}\right)D$ | f/D = 0.25 is the minimum for the focus to sit outside the dish mouth; typical dishes run 0.3-0.4. |
| Aperture efficiency range | $\eta_\mathrm{ap} = 0.55-0.70, \qquad \eta_\mathrm{ap} \le 1$ | Front-fed dishes 0.55-0.65. Losses: feed blockage, spillover past the rim, illumination taper, surface roughness. |
| Gain ratio for a diameter or frequency change | $\frac{G_2}{G_1} = \left(\frac{D_2}{D_1}\right)^2\left(\frac{f_2}{f_1}\right)^2$ | At fixed efficiency. Doubling D or f quadruples the gain: +6 dB for either. |
| Dish diameter needed for a target gain | $D = \frac{\lambda}{\pi}\sqrt{\frac{G}{\eta_\mathrm{ap}}}$ | G linear. Rearranged from the gain formula; the design-inverse question. |

## Worked Problems

### P1. A front-fed parabolic dish of diameter $3\ \mathrm{m}$ operates at $4\ \mathrm{GHz}$ with an aperture efficiency of $0.55$. Find the gain in dBi, the effective aperture, and the half-power beamwidth.

**Given:** D = 3 m (dish diameter); f = 4 GHz, lambda = 0.075 m; eta_ap = 0.55

**Solution:**

1. $\lambda = c/f = (3\times10^{8})/(4\times10^{9}) = 0.075\ \mathrm{m}$
2. $\pi D/\lambda = \pi(3)/0.075 = 125.66$; squared $= 15{,}791$
3. $G = \eta_\mathrm{ap}(\pi D/\lambda)^2 = 0.55(15{,}791) = 8685$
4. In dBi: $10\log_{10}(8685) = 39.39\ \mathrm{dBi}$ (equivalently $10\log_{10}0.55 + 20\log_{10}125.66$)
5. Effective aperture: $A_e = \eta_\mathrm{ap}\pi D^2/4 = 0.55\pi(9)/4 = 3.888\ \mathrm{m^2}$; check $4\pi A_e/\lambda^2 = 4\pi(3.888)/0.005625 = 8685$
6. Beamwidth: $\theta_\mathrm{HPBW} = 70\lambda/D = 70(0.075)/3 = 1.75^\circ$

> [!success]- Answer
> **$G = 39.4\ \mathrm{dBi}$, $A_e = 3.89\ \mathrm{m^2}$, $\theta_\mathrm{HPBW} = 1.75^\circ$.**

> [!warning] Trap
> Substituting the dish diameter as $D$ in a directivity formula, or handling the square wrongly and using $10\log_{10}$ on the whole thing. The diameter term carries $20\log_{10}$ because $(\pi D/\lambda)^2$; using $10\log_{10}$ understates the gain by a factor of two in dB.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷4×10^9` → $\lambda$ = **0.075** m.
> 2. `(π×3÷Ans)² : Ans×0.55 : 10log(Ans)` → **15 791** → $G$ = **8685** → **39.39** dBi.
> 3. `0.55π×9÷4` → $A_e$ = **3.888** m²; `70×0.075÷3` → $\theta_\mathrm{HPBW}$ = **1.75°**.

### P2. A $10\ \mathrm{m}$ Cassegrain dish operates at $12\ \mathrm{GHz}$ with $\eta_\mathrm{ap} = 0.60$. Find the gain in dBi and the half-power beamwidth, and compare the gain with the $3\ \mathrm{m}$ dish above.

**Given:** D = 10 m; f = 12 GHz, lambda = 0.025 m; eta_ap = 0.60

**Solution:**

1. $\lambda = c/f = (3\times10^{8})/(12\times10^{9}) = 0.025\ \mathrm{m}$
2. $\pi D/\lambda = \pi(10)/0.025 = 1256.6$; squared $= 1.579\times10^{6}$
3. $G = 0.60(1.579\times10^{6}) = 9.475\times10^{5}$
4. In dBi: $10\log_{10}(9.475\times10^{5}) = 59.77\ \mathrm{dBi}$
5. Beamwidth: $\theta_\mathrm{HPBW} = 70(0.025)/10 = 0.175^\circ$
6. Comparison: $59.77 - 39.39 = 20.4\ \mathrm{dB}$ more gain. Scaling checks: $D$ up $3.33\times$ gives $+10.5\ \mathrm{dB}$ and $f$ up $3\times$ gives $+9.5\ \mathrm{dB}$, total about $+20\ \mathrm{dB}$

> [!success]- Answer
> **$G = 59.8\ \mathrm{dBi}$, $\theta_\mathrm{HPBW} = 0.175^\circ$, about $20.4\ \mathrm{dB}$ better than the $3\ \mathrm{m}$ dish.**

> [!warning] Trap
> Using the dish diameter for beamwidth after computing gain from the diameter and then reporting a beamwidth that does not scale as $\lambda/D$. A $0.175^\circ$ pencil beam is narrow enough that pointing error, not gain, becomes the limiting factor on a real link.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷12×10^9` → $\lambda$ = **0.025** m.
> 2. `(π×10÷Ans)² : Ans×0.6 : 10log(Ans)` → **1.579×10^6** → $G$ = **9.475×10^5** → **59.77** dBi.
> 3. `70×0.025÷10` → **0.175°**; the gain stands **59.77 - 39.39 = 20.38** dB above the 3 m dish.

### P3. A Ku-band uplink needs $G = 45\ \mathrm{dBi}$ at $6\ \mathrm{GHz}$ with $\eta_\mathrm{ap} = 0.55$. Find the required dish diameter, and state the resulting half-power beamwidth.

**Given:** G = 45 dBi; f = 6 GHz, lambda = 0.05 m; eta_ap = 0.55

**Solution:**

1. Convert the gain: $G = 10^{45/10} = 31{,}623$
2. Rearrange $G = \eta_\mathrm{ap}(\pi D/\lambda)^2$: $(\pi D/\lambda)^2 = G/\eta_\mathrm{ap} = 31{,}623/0.55 = 57{,}496$
3. $\pi D/\lambda = \sqrt{57{,}496} = 239.8$
4. $D = \lambda(239.8)/\pi = 0.05(239.8)/3.1416 = 3.816\ \mathrm{m}$
5. Check: $\pi D/\lambda = \pi(3.816)/0.05 = 239.8$, so $G = 0.55(239.8)^2 = 31{,}627 = 45.0\ \mathrm{dBi}$
6. Beamwidth: $\theta_\mathrm{HPBW} = 70(0.05)/3.816 = 0.917^\circ$

> [!success]- Answer
> **$D \approx 3.82\ \mathrm{m}$; $\theta_\mathrm{HPBW} \approx 0.92^\circ$.**

> [!warning] Trap
> Working in dB the whole way. The gain formula squares $(\pi D/\lambda)$, so the inversion must be done with $G$ linear — taking $\sqrt{45}$ or dividing the dBi value directly gives a nonsense diameter. Convert to linear, invert, then convert back.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(45÷10)` → $G$ = **31 623** linear — the square root forbids working in dBi.
> 2. `√(Ans÷0.55)` → **239.8** = $\pi D/\lambda$; with $\lambda$ = **0.05** m (`SHIFT` `CVALUE` 28 `÷6×10^9`), `239.8×0.05÷π` → $D$ = **3.816** m.
> 3. `70×0.05÷3.816` → $\theta_\mathrm{HPBW}$ = **0.917°**.

### P4. A $2\ \mathrm{m}$ dish at $6\ \mathrm{GHz}$ has $\eta_\mathrm{ap} = 0.60$. Find the gain in dBi, the effective aperture, and the first-null beamwidth, then compare the effective aperture with the physical mouth area.

**Given:** D = 2 m; f = 6 GHz, lambda = 0.05 m; eta_ap = 0.60

**Solution:**

1. $\lambda = 0.05\ \mathrm{m}$; $\pi D/\lambda = \pi(2)/0.05 = 125.66$; squared $= 15{,}791$
2. $G = 0.60(15{,}791) = 9475$; in dBi $10\log_{10}(9475) = 39.77\ \mathrm{dBi}$
3. $A_e = \eta_\mathrm{ap}\pi D^2/4 = 0.60\pi(4)/4 = 1.885\ \mathrm{m^2}$
4. Physical area: $A_\mathrm{phys} = \pi D^2/4 = \pi(4)/4 = 3.142\ \mathrm{m^2}$, so $A_e/A_\mathrm{phys} = \eta_\mathrm{ap} = 0.60$ as it must
5. Beamwidth: $\theta_\mathrm{HPBW} = 70(0.05)/2 = 1.75^\circ$; first null $= 2(1.75) = 3.5^\circ$

> [!success]- Answer
> **$G = 39.8\ \mathrm{dBi}$, $A_e = 1.885\ \mathrm{m^2}$ against $3.142\ \mathrm{m^2}$ physical, $\theta_\mathrm{HPBW} = 1.75^\circ$, first null $3.5^\circ$.**

> [!warning] Trap
> Reporting the physical area or $\pi D^2/4$ as the effective aperture. Only $\eta_\mathrm{ap}$ of the mouth is useful, and feeding $3.142\ \mathrm{m^2}$ into Friis or the radar equation overstates the received power by $2.2\ \mathrm{dB}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷6×10^9` → $\lambda$ = **0.05** m; `(π×2÷Ans)² : Ans×0.6` → **15 791** → $G$ = **9475**.
> 2. `10log(Ans)` → **39.77** dBi; `0.6π×4÷4` → $A_e$ = **1.885** m² against the **3.142** m² mouth.
> 3. `70×0.05÷2` → **1.75°**; `Ans×2` → first null **3.50°**.

## Traps & Exam Notes

- **Confusing dish diameter $D$ with directivity $D$.** The same letter means two different things within one topic. A diameter is in metres and appears inside $\pi D/\lambda$; a directivity is dimensionless and gets converted to dBi. Substituting $1.64$ for a diameter, or a diameter for a directivity, is the single most common error here.
- **Using $10\log_{10}$ on the whole gain expression.** Because $(\pi D/\lambda)$ is squared, the diameter term takes $20\log_{10}$. Using $10\log_{10}$ halves the dB answer — at $20\log_{10}(125.66) = 42.0\ \mathrm{dB}$ versus $21.0\ \mathrm{dB}$ for the diameter term alone.
- **Quoting the physical aperture area as $A_e$.** $A_e = \eta_\mathrm{ap}\pi D^2/4$ is always smaller than $\pi D^2/4$; using the physical area inflates received power by $10\log_{10}(1/\eta_\mathrm{ap})$, about $2.6\ \mathrm{dB}$ at $\eta_\mathrm{ap} = 0.55$.
- **Forgetting that gain scales as $f^2$ at fixed diameter.** Doubling the operating frequency of an unchanged dish adds $6\ \mathrm{dB}$, because $\lambda$ halves and $(\pi D/\lambda)^2$ quadruples. Candidates who 'correct for frequency' by $3\ \mathrm{dB}$ per octave lose the question.
- **Inverting the gain formula in dB.** $D = (\lambda/\pi)\sqrt{G/\eta_\mathrm{ap}}$ needs $G$ linear. Taking a square root of a dBi figure produces a physically absurd dish.
- **Assuming $\eta_\mathrm{ap} = 1$, or a value outside $0.55$-$0.70$.** Feed blockage, rim spillover and illumination taper guarantee the loss. An answer implying $\eta_\mathrm{ap} > 1$ (an effective aperture bigger than the dish) is self-checking and wrong.
- **Letting the beamwidth constant drift without declaring it.** $70\lambda/D$ versus $75\lambda/D$ is a $7\%$ difference; either is acceptable if you state the convention, but silently mixing constants between two parts of one question is not.
- **Designing a deep dish without checking the focus.** Below $f/D = 0.25$ the focal point falls inside the dish mouth and the feed cannot be placed without blocking the aperture; deep dishes also spill more past the rim and have worse cross-polar performance.

## See Also

- [[01_Antenna_Parameters_Directivity,_Gain,_EIRP]]
- [[06_FSPL_and_Friis_Transmission_Equation]]
- [[11_Radar_Range_Equation_and_Microwave_Links]]

---

[[04_Marconi,_Folded_Dipole,_Yagi-Uda|⬅ 04]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[06_FSPL_and_Friis_Transmission_Equation|06 ➡]]
