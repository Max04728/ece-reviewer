---
id: MATH-05-21
title: "Reflection and Transmission at Boundaries"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 21
tier: 2
depth: full
problem_count: 5
prereqs: ["[[19_EM_Wave_Equations_and_Uniform_Plane_Waves]]", "[[22_Intrinsic_Impedance_and_Poynting_Vector]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 21 — Reflection and Transmission at Boundaries

> [!abstract] Scope
> Compute how much of a wave reflects at a boundary and how much crosses it — at normal and oblique incidence — using the impedance mismatch, the standing-wave ratio, Snell's law and the Brewster and critical angles.

## Core Concept

> [!tip] Intuition
> A boundary reflects because the two media demand different $E$-to-$H$ ratios. The incident wave splits into a reflected and a transmitted wave precisely so that the tangential fields stay continuous at the interface, and the mismatch $\eta_2/\eta_1$ alone fixes the split. At oblique incidence the geometry of the ray modifies that mismatch through the cosines of the incidence and refraction angles.

**Normal incidence: where the coefficients come from.** The tangential components of $\mathbf{E}$ and $\mathbf{H}$ must be continuous across the interface. Writing the total field in medium 1 as incident plus reflected and the field in medium 2 as transmitted, continuity at $z=0$ gives two equations whose solution is the reflection coefficient:
$$\Gamma = (\eta_2-\eta_1)/(\eta_2+\eta_1)$$
The transmitted field follows as:
$$\tau = 1+\Gamma = 2\eta_2/(\eta_1+\eta_2)$$
Note that $\tau = 1+\Gamma$ is not an independent result: it *is* tangential-E continuity rewritten. The form is identical to a transmission line, with $\eta$ playing the role of the characteristic impedance, which is why matching intuition transfers directly. The sign of $\Gamma$ carries physics: $\Gamma<0$ when the wave enters the denser medium ($\eta_2<\eta_1$, for example air into glass with $\Gamma=-1/3$), meaning the reflected E is inverted by $180^\circ$, while $\Gamma>0$ means no phase reversal. At a perfect conductor $\eta_2 = 0$ and $\Gamma = -1$: the reflected wave cancels the incident tangential E exactly, as it must.

**Power, and the $\lvert\tau\rvert^{2}$ trap.** The transmitted power fraction is $1-\lvert\Gamma\rvert^{2}$, *not* $\lvert\tau\rvert^{2}$. Power density is $E^{2}/(2\eta)$, so a change of medium changes the power for the same field amplitude; the exact bookkeeping is an energy balance across the boundary:
$$1 = \lvert\Gamma\rvert^{2} + (\eta_1/\eta_2)\lvert\tau\rvert^{2}$$
For air into $\varepsilon_r = 4$:
$$\eta_2 = 188.5\ \Omega$$
$\Gamma = (188.5-377)/(188.5+377) = -1/3$, so $11.1\%$ of the power reflects and $88.9\%$ is transmitted — even though $\tau = 2/3$ and $\lvert\tau\rvert^{2} = 44.4\%$. The medium is lossless, so the two fractions must add to exactly 1; that check catches the error immediately, because $1/9 + 4/9$ does not.

**Standing waves and what SWR does and does not tell you.** The incident and reflected waves interfere, giving a field pattern with maxima $\lvert E_i\rvert(1+\lvert\Gamma\rvert)$ and minima $\lvert E_i\rvert(1-\lvert\Gamma\rvert)$, so the standing-wave ratio follows from those two levels:
$$s = (1+\lvert\Gamma\rvert)/(1-\lvert\Gamma\rvert)$$
Inverted, it gives the reflection magnitude back:
$$\lvert\Gamma\rvert = (s-1)/(s+1)$$
SWR measures the *magnitude* of the reflection only, never its phase: $\Gamma = +1/3$ and $\Gamma = -1/3$ both give $s = 2$, and the two differ physically (the position of the first minimum shifts by $\lambda/4$). Because $\lvert\Gamma\rvert$ lies between 0 and 1, SWR is bounded below by 1 and unbounded above, so an answer such as 0.5 is impossible and an answer of 2 means one-ninth of the power reflected, not one-half.

**Impedance matching in practice.** Zero reflection needs $\eta_2 = \eta_1$ — but you rarely get to choose the medium. The standard fix is a quarter-wave transformer: a slab of thickness $d = \lambda_s/4$ (measured *inside the slab*) with intrinsic impedance $\eta_s = \sqrt{\eta_1\eta_3}$ between medium 1 and medium 3. The slab inverts the load, $Z_{\mathrm{in}} = \eta_s^{2}/Z_L$, and choosing $\eta_s$ as the geometric mean makes $Z_{\mathrm{in}} = \eta_1$, so the reflection vanishes. Two limitations are examinable: the match holds exactly at the design frequency (and its odd multiples) because the $\lambda/4$ thickness is frequency-dependent, and a slab with the wrong permittivity leaves a residual reflection however thick it is.

**Oblique incidence: Snell, critical angle, Brewster angle.** Continuity of the tangential phase along the interface requires the tangential wavenumbers to match:
$$\beta_1\sin\theta_i = \beta_2\sin\theta_t$$
which for non-magnetic media is Snell's law $n_1\sin\theta_i = n_2\sin\theta_t$ with $n = \sqrt{\varepsilon_r}$. Entering a denser medium ($n_2>n_1$) always gives $\theta_t<\theta_i$ and no critical angle. Entering a rarer medium ($n_1>n_2$) makes $\theta_t$ reach $90^\circ$ at $\sin\theta_c = n_2/n_1$; beyond that $\sin\theta_t>1$ has no real solution and the wave is *totally internally reflected*, though an evanescent field still penetrates a fraction of a wavelength (the basis of the prism coupler and of frustrated TIR). The Brewster angle is a different phenomenon: for *parallel* (TM) polarization, reflection vanishes when the reflected and refracted rays are perpendicular, $\theta_i+\theta_t = 90^\circ$, which reduces to $\tan\theta_B = n_2/n_1$. At that angle the dipoles driven by the refracted wave radiate along the reflection direction and cannot launch a reflected wave. Perpendicular (TE) polarization never vanishes at any real angle, so the two polarizations must always be treated separately.

**E versus H, and the oblique coefficients.** For a wave travelling in $+\mathbf{a}_z$ the reflected wave travels in $-\mathbf{a}_z$, so its $\mathbf{H}$ picks up an extra minus sign from $\mathbf{a}_k\times\mathbf{E}$: the magnetic reflection coefficient is $\Gamma_H = -\Gamma_E$. Tangential-H continuity then gives the magnetic transmission coefficient:
$$\tau_H = 1-\Gamma = 2\eta_1/(\eta_1+\eta_2)$$
At normal incidence, therefore, the H reflection and transmission coefficients are the E coefficients with $\eta_1$ and $\eta_2$ interchanged. At oblique incidence the tangential fields are the transverse components, which brings in the cosines. For perpendicular (TE) polarization the reflection coefficient is:
$$\Gamma_{\perp} = (\eta_2\cos\theta_i-\eta_1\cos\theta_t)/(\eta_2\cos\theta_i+\eta_1\cos\theta_t)$$
and for parallel (TM) polarization it is:
$$\Gamma_{\parallel} = (\eta_2\cos\theta_t-\eta_1\cos\theta_i)/(\eta_2\cos\theta_t+\eta_1\cos\theta_i)$$
Both reduce to the normal-incidence result at $\theta_i = 0$, and only the parallel one can cross zero.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Reflection coefficient at normal incidence | $\Gamma = \frac{\eta_2-\eta_1}{\eta_2+\eta_1}$ | Field ratio. Negative when entering a denser medium; $\Gamma=-1$ at a perfect conductor. |
| Transmission coefficient for E | $\tau = 1+\Gamma = \frac{2\eta_2}{\eta_1+\eta_2}$ | Follows from tangential-E continuity. Values above 1 are possible; $\tau$ is a field ratio, not power. |
| Reflection and transmission for H | $\Gamma_H = -\Gamma_E,\qquad \tau_H = 1-\Gamma = \frac{2\eta_1}{\eta_1+\eta_2}$ | The minus sign comes from the reversed propagation direction in $\mathbf{a}_k\times\mathbf{E}$. |
| Transmitted power fraction | $\frac{P_t}{P_i} = 1-\lvert\Gamma\rvert^{2}$ | Not $\lvert\tau\rvert^{2}$. The exact identity is $\lvert\Gamma\rvert^{2}+(\eta_1/\eta_2)\lvert\tau\rvert^{2}=1$. |
| Standing-wave ratio | $s = \frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert},\qquad \lvert\Gamma\rvert = \frac{s-1}{s+1}$ | A field ratio, bounded below by 1. Carries no phase information. |
| Matched condition | $\Gamma = 0 \iff \eta_2 = \eta_1$ | Zero reflection needs equal intrinsic impedances, so $\varepsilon_{r2} = \varepsilon_{r1}$ for non-magnetic media. |
| Quarter-wave transformer | $\eta_s = \sqrt{\eta_1\eta_3},\qquad d = \frac{\lambda_s}{4}$ | Thickness measured inside the slab: $\lambda_s = \lambda_0/\sqrt{\varepsilon_{rs}}$. Exact only at the design frequency. |
| Snell's law | $n_1\sin\theta_i = n_2\sin\theta_t,\qquad n = \sqrt{\varepsilon_r\mu_r}$ | Angles from the normal. For non-magnetic media use $\sqrt{\varepsilon_r}\sin\theta$. |
| Critical angle | $\sin\theta_c = \frac{n_2}{n_1} = \sqrt{\frac{\varepsilon_{r2}}{\varepsilon_{r1}}},\qquad n_1>n_2$ | Exists only going into the rarer medium. No solution (sine above 1) means no total internal reflection. |
| Brewster angle (parallel polarization) | $\tan\theta_B = \frac{n_2}{n_1} = \sqrt{\frac{\varepsilon_{r2}}{\varepsilon_{r1}}}$ | Measured in the incident medium. At $\theta_B$ the parallel reflection is zero; perpendicular polarization still reflects. |
| Perpendicular (TE) reflection coefficient | $\Gamma_{\perp} = \frac{\eta_2\cos\theta_i-\eta_1\cos\theta_t}{\eta_2\cos\theta_i+\eta_1\cos\theta_t}$ | E perpendicular to the plane of incidence. Never zero at a real angle. |
| Parallel (TM) reflection coefficient | $\Gamma_{\parallel} = \frac{\eta_2\cos\theta_t-\eta_1\cos\theta_i}{\eta_2\cos\theta_t+\eta_1\cos\theta_i}$ | The cosines are interchanged relative to TE. This is the coefficient that vanishes at the Brewster angle. |

## Interactive Widget

**Reflection Coefficient Explorer**

![[Reflection_Coefficient_Explorer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A uniform plane wave in air strikes a lossless dielectric with $\varepsilon_r = 4$ at normal incidence. Find the reflection coefficient, the standing-wave ratio in the air region, and the reflected and transmitted power fractions.

**Given:** medium 1: air, eta1 = 377 ohm; medium 2: eps_r = 4, mu_r = 1; normal incidence

**Solution:**

1. eta2 = eta0/sqrt(eps_r) = 377/2 = 188.5 ohm
2. Gamma = (eta2 - eta1)/(eta2 + eta1) = (188.5 - 377)/(188.5 + 377) = -188.5/565.5 = -0.3333
3. SWR: s = (1 + 0.3333)/(1 - 0.3333) = 1.3333/0.6667 = 2.00
4. Reflected power fraction = |Gamma|^2 = 1/9 = 0.1111, so 11.1%
5. Transmitted power fraction = 1 - 1/9 = 8/9 = 0.8889, so 88.9%
6. Check through tau: tau = 1 + Gamma = 2/3 and (eta1/eta2)|tau|^2 = 2(4/9) = 8/9, matching

> [!success]- Answer
> **$\Gamma = -0.333$; $s = 2.00$; 11.1% of the power reflected and 88.9% transmitted.**

> [!warning] Trap
> Reporting the transmitted power as $\lvert\tau\rvert^{2} = 4/9 = 44.4\%$. Power is not $\lvert\tau\rvert^{2}$ because the impedance change also enters; the fraction is $1-\lvert\Gamma\rvert^{2} = 8/9$. The consistency check is that the two fractions must add to 1, and $1/9 + 4/9$ does not.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `37` `÷√4=` → $\eta_2$ = **188.4** ohm, or 188.5 on the exam shorthand of 377.
> 2. `(Ans−` `SHIFT` `CVALUE` `37` `)÷(Ans+` `SHIFT` `CVALUE` `37` `)=` → $\Gamma$ = **-0.3333**.
> 3. `(1−Ans)÷(1+Ans)=` → $s$ = **2.00**; the power split is $\lvert\Gamma\rvert^2$ = **11.1 %** reflected, **88.9 %** transmitted.
>
> $\lvert\tau\rvert^2=4/9$ is not the transmitted power; the two fractions must add to 1.

### P2. Find the Brewster angle for light in air incident on a glass surface with $n = 1.5$, and state what happens to each polarization there.

**Given:** n1 = 1 (air); n2 = 1.5 (glass); incidence from the air side

**Solution:**

1. tan(theta_B) = n2/n1 = 1.5, so theta_B = arctan(1.5) = 56.31 degrees
2. Refracted angle at Brewster incidence: Snell gives sin(theta_t) = sin(56.31)/1.5 = 0.8320/1.5 = 0.5547, so theta_t = 33.69 degrees
3. Check the perpendicular-ray condition: 56.31 + 33.69 = 90.00 degrees, as Brewster requires
4. At this angle Gamma_parallel = 0, so the parallel (TM) component is fully transmitted
5. The perpendicular (TE) component still reflects: Gamma_perp = (251.3 cos56.31 - 377 cos33.69)/(251.3 cos56.31 + 377 cos33.69) = (139.4 - 313.7)/(139.4 + 313.7) = -0.385

> [!success]- Answer
> **$\theta_B = 56.3^\circ$; the parallel (TM) reflection vanishes while the perpendicular (TE) component still reflects with $\Gamma_{\perp} = -0.385$ (SWR 2.25).**

> [!warning] Trap
> Using $\theta_B = \arctan(n_1/n_2)$. The Brewster angle is measured in the incident medium and equals $\arctan(n_2/n_1) = 56.3^\circ$ for air into glass; the reciprocal $33.7^\circ$ is the *refracted* angle at Brewster incidence, not the Brewster angle.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `\tan⁻¹(1.5)=` → $\theta_B$ = **56.31°**; `SHIFT` `\sin⁻¹(\sin(Ans)÷1.5)=` → $\theta_t$ = **33.69°**.
> 2. `56.31+33.69=` → **90.00°**, the perpendicular-ray condition that defines Brewster incidence.
> 3. `(251.3×\cos56.31−377×\cos33.69)÷(251.3×\cos56.31+377×\cos33.69)=` → $\Gamma_\perp$ = **-0.385**.
>
> `arctan(n1/n2)` returns 33.69°, which is the refracted angle, not the Brewster angle.

### P3. Find the critical angle for total internal reflection at a glass-air interface with $n = 1.5$, and explain why no such angle exists for the reverse direction.

**Given:** n1 = 1.5 (glass); n2 = 1 (air); incidence from the glass side

**Solution:**

1. Total internal reflection needs n1 > n2, which holds here (1.5 > 1)
2. sin(theta_c) = n2/n1 = 1/1.5 = 0.6667
3. theta_c = arcsin(0.6667) = 41.81 degrees
4. For incidence angles above 41.81 degrees sin(theta_t) would exceed 1, so there is no real refracted direction and all the power reflects
5. Reversed (air into glass) Snell gives sin(theta_t) = sin(theta_i)/1.5, which is below 1 for every theta_i, so no critical angle exists

> [!success]- Answer
> **$\theta_c = 41.8^\circ$ from the glass side; no critical angle exists going from air into glass.**

> [!warning] Trap
> Expecting total internal reflection in either direction. The condition $n_1>n_2$ is mandatory; for air into glass the equation $\sin\theta_c = 1.5$ has no real solution, and that impossibility is the signal that the phenomenon is absent.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `\sin⁻¹(1÷1.5)=` → $\theta_c$ = **41.81°** from the glass side.
> 2. `SHIFT` `\sin⁻¹(1.5)=` → **Math ERROR**, because $\sin\theta_t>1$ has no real solution.
> 3. That error is the answer for the reverse direction: it fails at every one of the 0-90° incidences, so no critical angle exists.

### P4. A 3 GHz wave in air must cross into a dielectric half-space with $\varepsilon_r = 4$ without reflection, using a quarter-wave matching layer. Find the intrinsic impedance and relative permittivity of the layer, and its physical thickness.

**Given:** f = 3 GHz = 3e9 Hz; medium 1: air, eta1 = 377 ohm; medium 3: eps_r = 4, so eta3 = 188.5 ohm; quarter-wave matching layer between them

**Solution:**

1. eta_s = sqrt(eta1 eta3) = sqrt(377 x 188.5) = sqrt(71082) = 266.6 ohm
2. For mu_r = 1: eps_rs = (eta0/eta_s)^2 = (377/266.6)^2 = 2.00
3. Free-space wavelength: lambda0 = c/f = (3e8)/(3e9) = 0.1 m
4. Wavelength inside the layer: lambda_s = lambda0/sqrt(eps_rs) = 0.1/1.4142 = 0.07071 m
5. Thickness: d = lambda_s/4 = 0.07071/4 = 0.01768 m = 17.7 mm

> [!success]- Answer
> **$\eta_s = 266.6\ \Omega$, $\varepsilon_{rs} = 2.00$, $d = 17.7$ mm.**

> [!warning] Trap
> Using $\lambda_0/4 = 25$ mm. The quarter-wave thickness is a quarter of the wavelength *inside the layer*, $\lambda_s = \lambda_0/\sqrt{\varepsilon_{rs}} = 70.7$ mm, giving 17.7 mm. A 25 mm layer is not a quarter wave in the slab and leaves a residual reflection.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(377×188.5)=` → $\eta_s$ = **266.6** ohm; `(377÷Ans)²=` → $\varepsilon_{rs}$ = **2.00**.
> 2. `3E8÷3E9÷√2÷4=` → $d$ = **0.01768** m = **17.7** mm.
> 3. $\lambda_s$ = **0.07071** m inside the layer, against $\lambda_0$ = **0.1** m in air.
>
> Codes `28` and `37` hold the exact $c_0$ and $Z_0$; the $\lambda_0/4=25$ mm thickness is the trap.

### P5. A wave in air is incident on glass ($n = 1.5$) at $30^\circ$ from the normal. Find the reflection coefficient for perpendicular and for parallel polarization, and the SWR of each.

**Given:** theta_i = 30 degrees; air to glass, n2 = 1.5; eta1 = 377 ohm, eta2 = 251.3 ohm

**Solution:**

1. Snell: sin(theta_t) = sin(30)/1.5 = 0.5/1.5 = 0.3333, so theta_t = 19.47 degrees
2. cos(theta_i) = 0.8660 and cos(theta_t) = 0.9428
3. eta2 cos(theta_i) = 251.3 x 0.8660 = 217.6; eta1 cos(theta_t) = 377 x 0.9428 = 355.4
4. Gamma_perp = (217.6 - 355.4)/(217.6 + 355.4) = -137.8/573.0 = -0.2404, so SWR = 1.2404/0.7596 = 1.63
5. For parallel: Gamma_par = (eta2 cos(theta_t) - eta1 cos(theta_i))/(eta2 cos(theta_t) + eta1 cos(theta_i)) = (236.9 - 326.5)/(236.9 + 326.5) = -89.6/563.4 = -0.1590, so SWR = 1.3778
6. The parallel reflection is the smaller of the two, and it falls to zero at the Brewster angle 56.31 degrees

> [!success]- Answer
> **$\Gamma_{\perp} = -0.240$ (SWR 1.63) and $\Gamma_{\parallel} = -0.159$ (SWR 1.38).**

> [!warning] Trap
> Swapping the two expressions. Perpendicular has $\eta_2\cos\theta_i-\eta_1\cos\theta_t$; parallel has the cosines interchanged, $\eta_2\cos\theta_t-\eta_1\cos\theta_i$. Falling back on the normal-incidence form gives $-0.200$ for both and hides the polarization difference the question is testing.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `\sin⁻¹(\sin30÷1.5)=` → $\theta_t$ = **19.47°**; `\cos(Ans)` `SHIFT` `STO` `B` → **0.9428**, `\cos30` `SHIFT` `STO` `A` → **0.8660**.
> 2. `(251.3×A−377×B)÷(251.3×A+377×B)=` → $\Gamma_\perp$ = **-0.2405**; `(1−Ans)÷(1+Ans)=` → SWR = **1.63**.
> 3. `(251.3×B−377×A)÷(251.3×B+377×A)=` → $\Gamma_\parallel$ = **-0.1590**; SWR = **1.38**.
>
> Storing $\cos\theta_i$ in `A` and $\cos\theta_t$ in `B` makes the parallel case a one-key cosine swap.

## Traps & Exam Notes

- **Transmitted power as $\lvert\tau\rvert^{2}$.** Air into $\varepsilon_r=4$ gives $\tau = 2/3$, so $\lvert\tau\rvert^{2} = 44.4\%$ — wrong. The transmitted fraction is $1-\lvert\Gamma\rvert^{2} = 88.9\%$, because $\lvert\Gamma\rvert^{2}+\lvert\tau\rvert^{2}\neq1$ whenever $\eta_1\neq\eta_2$.
- **Reversing the sign of $\Gamma$.** $(\eta_2-\eta_1)/(\eta_2+\eta_1)$ is negative when the wave enters a denser medium, meaning the reflected E is inverted. Writing $(\eta_1-\eta_2)/(\eta_1+\eta_2)$ gives $+1/3$; SWR and power are unchanged, so only a phase question exposes the error.
- **Using $\theta_B = \arctan(n_1/n_2)$.** For air into glass the Brewster angle is $56.3^\circ$ from $\tan\theta_B = 1.5$. The reciprocal $33.7^\circ$ is the refracted angle at that incidence, not the Brewster angle, and quoting it is wrong by $22.6^\circ$.
- **Expecting total internal reflection in either direction.** TIR requires $n_1>n_2$. For air into glass $\sin\theta_c = 1.5$ has no real solution, and the wave always refracts however grazing the incidence.
- **Measuring the quarter-wave thickness in free space.** The slab thickness is $\lambda_s/4$ with $\lambda_s = \lambda_0/\sqrt{\varepsilon_{rs}}$: for $\varepsilon_{rs}=2$ at 3 GHz that is 17.7 mm, not $\lambda_0/4 = 25$ mm.
- **Treating SWR as a power ratio.** $s = 2$ means $\lvert\Gamma\rvert = 1/3$ and 11.1% of the power reflected, not 50%. SWR is a field ratio, and its minimum possible value is 1, so an answer below 1 is a guaranteed error.

## See Also

- [[19_EM_Wave_Equations_and_Uniform_Plane_Waves]]
- [[20_Waves_in_Lossy_Media_and_Skin_Depth]]
- [[22_Intrinsic_Impedance_and_Poynting_Vector]]
- [[08_Dielectrics_and_Boundary_Conditions]]

---

[[20_Waves_in_Lossy_Media_and_Skin_Depth|⬅ 20]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[22_Intrinsic_Impedance_and_Poynting_Vector|22 ➡]]
