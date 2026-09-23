---
id: EST-06-10
title: "Critical Frequency, MUF and Skip Distance"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 10
tier: 2
depth: full
problem_count: 4
prereqs: ["[[09_Sky_Wave_and_Ionospheric_Layers]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Critical Frequency, MUF and Skip Distance

> [!abstract] Scope
> Choose a sky-wave frequency that actually closes a given circuit, from critical frequency through MUF and OWF to the skip distance they imply.

## Core Concept

> [!tip] Intuition
> The critical frequency is the ceiling for a signal sent straight up. Tilt the beam and the same layer will turn back a higher frequency, because the wave meets the ionisation at a slant and the density it effectively sees is reduced by the cosine of the angle.

**Critical frequency is a vertical-incidence ceiling.** Each layer has a maximum electron density $N_{\max}$ and therefore a critical frequency $f_c = 9\sqrt{N_{\max}}$, the highest frequency the layer returns to a transmitter directly below it. Ionosondes report it per layer as $f_oF2$, $f_oF1$ and $f_oE$. The value is a property of the layer at the reflection point, not of the circuit: two different paths that share an F2 reflection point share the same $f_c$, and the layer with the highest $f_c$ sets the ceiling for the whole circuit. Frequencies above $f_c$ sent vertically are not returned at all - they penetrate the layer and are lost to space.

**The secant law: obliquity buys frequency.** A vertical ray reflects where the plasma frequency reaches $f$. A ray tilted by $\theta_i$ from the vertical travels a longer slant path, and a Snell's-law argument in a horizontally stratified plasma shows that it turns over where $f\cos\theta_i = f_p$. So the highest frequency the layer can return at that incidence angle is $\mathrm{MUF} = f_c\sec\theta_i$. Everything about MUF follows from this one relation: at vertical incidence ($\theta_i = 0$) the MUF collapses to $f_c$; as the ray becomes shallower the secant grows without bound, which is why long DX paths support higher frequencies than short ones. The derivation assumes a flat, horizontally uniform, isotropic layer, so it degrades near the magnetic equator, on very long paths where earth curvature matters, and wherever the geomagnetic field splits the wave into ordinary and extraordinary components (the extraordinary critical frequency $f_xF2$ is the higher of the two).

**Skip distance.** With virtual height $h'$ and incidence angle $\theta_i$, the ray rises a horizontal distance $h'\tan\theta_i$ and descends the same amount, so the ground range of one hop is $D = 2h'\tan\theta_i$. For a fixed working frequency, the layer returns only those rays with $\cos\theta_i \le f_c/f$, that is $\theta_i \ge \arccos(f_c/f)$; steeper (more vertical) rays penetrate. Since range grows with $\theta_i$, the *smallest* returning distance comes from the smallest permitted angle:
$$D_{\mathrm{skip}} = 2h'\sqrt{(f/f_c)^{2}-1}$$
Everything closer than that - but beyond the reach of the ground wave - is the silent **skip zone**. Raising the frequency at fixed $h'$ pushes the skip distance out; lowering it to $f_c$ collapses the skip distance to zero so the sky wave returns everywhere, which is the short-skip condition.

**OWF, LUF and the working window.** A circuit is usable only between the LUF, set at the low end by D-layer absorption and receiver noise, and the MUF at the high end. Because the MUF breathes with the sun through the day and the sunspot cycle, operators do not work it: they work the **optimum working frequency**, $\mathrm{OWF} \approx 0.85\,\mathrm{MUF}$, which leaves roughly a 15 per cent margin against a fading MUF. Choose the MUF itself and the first dip in ionisation drops the circuit silent; choose a frequency far below the OWF and daytime absorption eats the signal before it ever reaches the layer.

**Hops and take-off angle.** A single hop spans $D_{\mathrm{hop}} = 2h'\tan\theta_i$ and requires a take-off angle $\Delta = 90^{\circ}-\theta_i$ above the horizontal, so a high MUF (shallow ray, large $\theta_i$) demands a *low* take-off angle and produces a long hop. A circuit of length $D$ then needs $D/D_{\mathrm{hop}}$ hops, rounded up. Each additional hop costs a ground reflection, adds multipath fading and narrows the usable bandwidth, so real circuits are held to one to four hops and the antenna's vertical pattern - not the ionosphere - usually decides how far a single hop can reach.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Critical frequency | $f_c = 9\sqrt{N_{\max}}$ | Vertical incidence ceiling of one layer, in Hz, with N_max in electrons per cubic metre. Reported as f_oE, f_oF1, f_oF2. |
| Secant law / MUF | $\mathrm{MUF} = f_c\sec\theta_i = \dfrac{f_c}{\cos\theta_i}$ | theta_i is measured from the vertical at the layer. The MUF always exceeds f_c for an oblique path. |
| MUF from take-off angle | $\mathrm{MUF} = \dfrac{f_c}{\sin\Delta}$ | Delta is the take-off angle above the horizontal. A low take-off angle gives a high MUF and a long hop. |
| Angles are complementary | $\Delta = 90^{\circ} - \theta_i$ | Mixing these two angles up inverts the geometry: a 'high angle of incidence' from the vertical is a *low* take-off angle from the ground. |
| Smallest returning incidence angle | $\cos\theta_i = \dfrac{f_c}{f}$ | Frequency f returns only for theta_i at least this large; steeper rays penetrate the layer. |
| Skip distance | $D_{\mathrm{skip}} = 2h'\tan\theta_i$ | Flat-earth one-hop geometry with virtual height h'. The factor 2 is the up and down legs. |
| Skip distance from frequencies | $D_{\mathrm{skip}} = 2h'\sqrt{\left(\dfrac{f}{f_c}\right)^{2}-1}$ | Same result with theta_i eliminated. Requires f > f_c; below f_c there is no skip distance at all. |
| Optimum working frequency | $\mathrm{OWF} \approx 0.85\,\mathrm{MUF}$ | About 15 per cent of margin so the circuit survives the normal day-to-day dip in ionisation. |
| Number of hops | $N_{\mathrm{hops}} = \dfrac{D}{D_{\mathrm{hop}}}, \quad D_{\mathrm{hop}} = 2h'\tan\theta_i$ | Round up: a partial hop still has to be flown, and it must fit the antenna's take-off angle. |

## Worked Problems

### P1. An F2 layer has $f_c = 9.86\ \mathrm{MHz}$ and a virtual height of $300\ \mathrm{km}$. A 12 MHz signal is launched at the shallowest angle the layer will return. Find the angle of incidence and the skip distance.

**Given:** f_c = 9.86 MHz; f = 12 MHz; h' = 300 km

**Solution:**

1. The smallest returning angle satisfies $\cos\theta_i = \dfrac{f_c}{f} = \dfrac{9.86}{12} = 0.8217$
2. $\theta_i = \arccos(0.8217) = 34.75^{\circ}$ from the vertical, so the take-off angle is $\Delta = 55.25^{\circ}$
3. $\tan 34.75^{\circ} = 0.6937$
4. $D_{\mathrm{skip}} = 2h'\tan\theta_i = 2(300)(0.6937) = 416\ \mathrm{km}$

> [!success]- Answer
> **$\theta_i = 34.7^{\circ}$ and $D_{\mathrm{skip}} \approx 416\ \mathrm{km}$.**

> [!warning] Trap
> Inverting the ratio inside the closed form. $2h'\sqrt{(f/f_c)^{2}-1} = 600\sqrt{0.4815} = 416\ \mathrm{km}$ agrees with the tangent form, but $2h'\sqrt{(f_c/f)^{2}-1}$ is the square root of a negative number, and the flipped $2h'/\sqrt{(f/f_c)^{2}-1}$ gives 865 km - 2.1 times too long.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `9.86÷12` → $\cos\theta_i$ = **0.82167**.
> 2. `SHIFT` `cos`(Ans) in Deg mode → $\theta_i$ = **34.75°** from the vertical; `tan(Ans)` → **0.6937**.
> 3. `2×300×Ans` → $D_\mathrm{skip}$ = **416.2** km; the closed form `600×√((12÷9.86)²-1)` agrees.

### P2. At solar maximum the F2 peak density reaches $N_{\max} = 2.5\times10^{12}$ electrons per cubic metre. Find the critical frequency, the MUF for a path whose incidence angle is $45^{\circ}$, and the optimum working frequency.

**Given:** N_max = 2.5e12 electrons/m^3; theta_i = 45 degrees; OWF factor 0.85

**Solution:**

1. $f_c = 9\sqrt{2.5\times10^{12}} = 9(1.5811\times10^{6}) = 14.23\ \mathrm{MHz}$
2. $\mathrm{MUF} = \dfrac{f_c}{\cos 45^{\circ}} = \dfrac{14.23}{0.7071} = 20.12\ \mathrm{MHz}$
3. $\mathrm{OWF} = 0.85(20.12) = 17.11\ \mathrm{MHz}$
4. So the circuit should be worked near 17 MHz, not at the 20.1 MHz ceiling

> [!success]- Answer
> **$f_c = 14.2\ \mathrm{MHz}$, $\mathrm{MUF} = 20.1\ \mathrm{MHz}$, $\mathrm{OWF} \approx 17.1\ \mathrm{MHz}$.**

> [!warning] Trap
> Reporting the MUF as the frequency to use. The MUF is an instantaneous ceiling that falls whenever ionisation dips; working at 20.1 MHz means the circuit dies the moment $N_{\max}$ drops 10 per cent, while 17.1 MHz keeps roughly 15 per cent of margin.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `9×√(2.5×10^12)÷10^6` → $f_c$ = **14.23** MHz.
> 2. `Ans÷cos(45)` in Deg mode → MUF = **20.12** MHz.
> 3. `Ans×0.85` → OWF = **17.1** MHz — the frequency to work, not the 20.12 MHz ceiling.

### P3. Using the same layer ($f_c = 14.23\ \mathrm{MHz}$, $h' = 300\ \mathrm{km}$), find the skip distance at 20 MHz and compare it with the 416 km skip at 12 MHz.

**Given:** f_c = 14.23 MHz; f = 20 MHz; h' = 300 km

**Solution:**

1. Frequency ratio: $\dfrac{f}{f_c} = \dfrac{20}{14.23} = 1.4055$
2. Square and subtract one: $1.4055^{2} - 1 = 1.9754 - 1 = 0.9754$
3. $\sqrt{0.9754} = 0.9876$
4. $D_{\mathrm{skip}} = 2(300)(0.9876) = 592.6\ \mathrm{km}$

> [!success]- Answer
> **$D_{\mathrm{skip}} \approx 593\ \mathrm{km}$, versus 416 km at 12 MHz - the higher frequency skips *further*.**

> [!warning] Trap
> Assuming a higher frequency shortens the skip. It lengthens it, because a higher frequency needs a shallower ray and shallow rays travel further before returning. Frequencies at or below $f_c$ have no skip distance at all - the layer returns them even straight up.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20÷14.23` → ratio **1.4055**.
> 2. `Ans²-1 : √Ans` → **0.9754** → **0.9876**.
> 3. `2×300×Ans` → **592.6** km; as a single line, `600×√((20÷14.23)²-1)`.

### P4. A 2000 km HF circuit is worked at 12 MHz on a layer with $f_c = 9.86\ \mathrm{MHz}$ and $h' = 300\ \mathrm{km}$. The antenna launches at the take-off angle of the maximum single hop. How many hops are needed?

**Given:** D = 2000 km; f = 12 MHz; f_c = 9.86 MHz; h' = 300 km

**Solution:**

1. Maximum single hop from the previous geometry: $D_{\mathrm{hop}} = 2h'\tan\theta_i = 416\ \mathrm{km}$
2. $N_{\mathrm{hops}} = \dfrac{2000}{416.2} = 4.81$
3. A partial hop still has to be flown, so round up: 5 hops
4. Check: 4 hops of 416 km span only 1665 km, leaving the last 335 km unlit

> [!success]- Answer
> **$N_{\mathrm{hops}} = 5$ (4.81 rounded up).**

> [!warning] Trap
> Rounding 4.81 down to 4 hops. Each hop is capped by the launch angle the antenna actually produces, so half a hop cannot be ignored. In practice the last hop is shortened by steepening the ray, which raises the MUF but adds a ground reflection and its loss.

## Traps & Exam Notes

- **Inverting the ratio in the skip-distance closed form.** $D = 2h'\sqrt{(f/f_c)^{2}-1}$ gives 416 km for $f = 12\ \mathrm{MHz}$ and $f_c = 9.86\ \mathrm{MHz}$; the flipped $2h'/\sqrt{(f/f_c)^{2}-1}$ returns 865 km, and $2h'\sqrt{(f_c/f)^{2}-1}$ is imaginary because $f_c < f$.
- **Forgetting the factor 2 in $D = 2h'\tan\theta_i$.** One tangent is the outbound leg only; the returning leg doubles it. Dropping the 2 halves every skip distance and every hop length.
- **Quoting a MUF without an angle.** $f_c$ is the vertical-incidence ceiling for one layer, but the MUF depends entirely on the path's take-off angle. A MUF figure with no angle attached is meaningless, and the MUF of a short path is much lower than the MUF of a DX path using the same layer.
- **Working at the MUF instead of the OWF.** The MUF is a ceiling that moves with solar zenith angle and the sunspot cycle, so operating at 1.0 MUF means the circuit drops out on the first dip; operating at roughly 0.85 MUF is what makes an HF assignment survivable.
- **Treating the skip distance as a maximum range.** It is the *minimum* distance that returns signal. Beyond it the same frequency still arrives, from shallower rays and from multiple hops; the silent region is the annulus between the ground-wave limit and $D_{\mathrm{skip}}$.
- **Feeding per-cm3 density into $f_c = 9\sqrt{N}$.** The constant 9 assumes electrons per cubic metre. A density of $2.5\times10^{6}\ \mathrm{cm^{-3}}$ entered raw returns 14.2 kHz, so always convert (multiply by $10^{6}$) before taking the root.

## See Also

- [[09_Sky_Wave_and_Ionospheric_Layers]]
- [[07_Ground_Wave_Propagation]]
- [[08_Space_Wave_and_Radio_Horizon]]

---

[[09_Sky_Wave_and_Ionospheric_Layers|⬅ 09]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Radar_Range_Equation_and_Microwave_Links|11 ➡]]
