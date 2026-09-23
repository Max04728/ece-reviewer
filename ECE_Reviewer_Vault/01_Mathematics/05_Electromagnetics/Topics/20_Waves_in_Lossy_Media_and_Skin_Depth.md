---
id: MATH-05-20
title: "Waves in Lossy Media and Skin Depth"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 20
tier: 2
depth: full
problem_count: 4
prereqs: ["[[19_EM_Wave_Equations_and_Uniform_Plane_Waves]]", "[[18_Maxwell’s_Equations_and_Displacement_Current]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 20 — Waves in Lossy Media and Skin Depth

> [!abstract] Scope
> Classify a conducting or lossy medium by its loss tangent, then compute the attenuation and phase constants, the skin depth, the surface resistance and the complex intrinsic impedance, with copper as the reference metal.

## Core Concept

> [!tip] Intuition
> A conductor cannot carry a travelling wave without loss: the conduction current is in phase with $\mathbf{E}$, so energy is dissipated as the wave advances and the amplitude decays like $e^{-\alpha z}$. The loss tangent $\sigma/(\omega\varepsilon)$ decides which of three regimes you are in, and each regime has its own shortcut — using the wrong one is the main way this topic is failed.

**The complex propagation constant.** In a medium with conductivity $\sigma$ Ampere's law carries both a conduction and a displacement current, and it reads:
$$\nabla\times\mathbf{H} = (\sigma + j\omega\varepsilon)\mathbf{E}$$
The same curl-curl manipulation as in the lossless case gives the lossy wave equation:
$$\nabla^{2}\mathbf{E} = j\omega\mu(\sigma + j\omega\varepsilon)\mathbf{E}$$
A travelling solution must therefore be $e^{-\gamma z}$, with the complex propagation constant defined by:
$$\gamma = \alpha + j\beta = \sqrt{j\omega\mu(\sigma+j\omega\varepsilon)}$$
The field is then $E_0e^{-\alpha z}\cos(\omega t-\beta z)$: $\alpha$ is the decay rate in nepers per metre and $\beta$ the phase rate in radians per metre. Setting $\sigma = 0$ returns $\gamma = j\omega\sqrt{\mu\varepsilon}$, that is $\alpha = 0$ and $\beta = \omega\sqrt{\mu\varepsilon}$ — the lossless result is the special case. The essential structure is that $\alpha$ and $\beta$ are *not independent* in a conductor: one conductivity fixes both, which is why you cannot choose the attenuation and the phase velocity separately.

**The loss tangent as the classifier.** Everything hinges on the ratio of conduction current density to displacement current density, $\sigma/(\omega\varepsilon) = \tan\delta$. When $\tan\delta \gg 1$ the medium is a *good conductor*; when $\tan\delta \ll 1$ it is a *good dielectric* (low-loss); when $\tan\delta$ is of order unity it is a *quasi-conductor*, where neither shortcut is trustworthy and only the exact square-root formulas are safe. The exam-critical point is the frequency dependence: $\omega\varepsilon$ grows with frequency, so almost every material becomes more dielectric-like as $f$ rises. Seawater with $\sigma = 4$ S/m, $\varepsilon_r = 81$ has $\tan\delta = 888$ at 1 MHz (a good conductor, which is why submarines use very low frequencies) but behaves as a low-loss dielectric in the visible. Copper at 1 MHz has $\tan\delta = 1.04\times10^{12}$ — so far inside the conductor regime that the exact formula and the shortcut agree to twelve figures.

**Skin depth: the depth, not the wavelength.** Because the amplitude decays as $e^{-\alpha z}$, it falls to $1/e = 36.8\%$ at $z = 1/\alpha$, which is defined as the skin depth $\delta_s$. At $2\delta_s$ only 13.5% remains and at $5\delta_s$ just 0.67% — effectively nothing, which is why current crowds into a thin surface layer and why a wire's ac resistance exceeds its dc value for a radius much larger than the skin depth:
$$R_{\mathrm{ac}}/R_{\mathrm{dc}} \approx a/(2\delta)$$
In a good conductor $\alpha = \beta$, so one skin depth is also exactly one radian ($57.3^\circ$) of phase delay: the wave inside metal is both strongly attenuated *and* strongly retarded. That is why the wavelength inside copper at 1 MHz is $2\pi\delta_s \approx 415\ \mu$m while the skin depth is only 66 $\mu$m — confusing the two is a standard exam trap.

**The good-conductor approximations and the metal numbers.** For $\sigma \gg \omega\varepsilon$ the propagation constant simplifies to:
$$\gamma \approx \sqrt{j\omega\mu\sigma} = (1+j)\sqrt{\omega\mu\sigma/2} = (1+j)/\delta_s$$
so $\alpha = \beta = \sqrt{\pi f\mu\sigma}$ and $\delta_s = 1/\sqrt{\pi f\mu\sigma}$. The skin depth falls as $1/\sqrt{f}$: to halve it you quadruple the frequency. The intrinsic impedance becomes a small number at an angle of exactly $45^\circ$:
$$\eta = (1+j)\sqrt{\omega\mu/(2\sigma)} = (1+j)/(\sigma\delta_s)$$
Its real part is the surface resistance, the ac resistance of any square patch of that surface:
$$R_s = 1/(\sigma\delta_s) = \sqrt{\pi f\mu/\sigma}$$
(the *ohms per square* that makes conductor loss independent of the patch size). For copper, $\sigma = 5.8\times10^{7}$ S/m and $\mu = 4\pi\times10^{-7}$ H/m give $\delta_s = 66.1\ \mu$m and $R_s = 0.261$ m$\Omega$ per square at 1 MHz, rising to 6.61 $\mu$m and 2.61 m$\Omega$ at 100 MHz. At the other extreme, a low-loss dielectric ($\tan\delta \ll 1$) attenuates weakly according to:
$$\alpha \approx (\sigma/2)\sqrt{\mu/\varepsilon}$$
while $\beta$ stays essentially the lossless $\omega\sqrt{\mu\varepsilon}$, so the wave travels at nearly $1/\sqrt{\mu\varepsilon}$ but slowly fades.

**Where the shortcuts break.** Two failures recur. First, the phase velocity: in a conductor it collapses to a dispersion-limited value:
$$v_p = \omega/\beta = \sqrt{2\omega/(\mu\sigma)} = \sqrt{4\pi f/(\mu\sigma)}$$
which for copper at 1 MHz is 415 m/s — six orders of magnitude below $c$. Quoting $1/\sqrt{\mu\varepsilon} = 3\times10^{8}$ m/s inside metal is not a rounding error, it is a different physical regime, because the conductor is strongly dispersive and the phase velocity has no relation to the dielectric constant. Second, the good-conductor shortcut applied outside its range: at $\tan\delta = 1$ the approximation $\alpha = \sqrt{\pi f\mu\sigma}$ is $1.55$ times the exact value, which is:
$$\alpha = 0.455\,\omega\sqrt{\mu\varepsilon}$$
and it makes $\beta$ (exactly $1.099\,\omega\sqrt{\mu\varepsilon}$) $36\%$ too small. Any material whose $\tan\delta$ is not comfortably above 10 should be pushed through the exact square-root formulas.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Complex propagation constant | $\gamma = \alpha + j\beta = \sqrt{j\omega\mu(\sigma+j\omega\varepsilon)}$ | Conducting medium. Setting $\sigma=0$ returns the lossless $\gamma=j\omega\sqrt{\mu\varepsilon}$. |
| Attenuation constant (exact) | $\alpha = \omega\sqrt{\frac{\mu\varepsilon}{2}}\left[\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^{2}}-1\right]^{1/2}$ | Nepers per metre. The whole bracket sits under a square root; dropping that outer root is a common and large error. |
| Phase constant (exact) | $\beta = \omega\sqrt{\frac{\mu\varepsilon}{2}}\left[\sqrt{1+\left(\frac{\sigma}{\omega\varepsilon}\right)^{2}}+1\right]^{1/2}$ | Radians per metre. Only the sign inside the bracket differs from alpha. |
| Loss tangent | $\tan\delta = \frac{\sigma}{\omega\varepsilon}$ | Greater than 10 is a good conductor, less than 0.1 is a good dielectric, in between is a quasi-conductor: use the exact formulas. |
| Skin depth | $\delta_s = \frac{1}{\alpha}$ | Depth where the amplitude falls to 1/e = 36.8%. It is a depth, not a wavelength. |
| Good conductor: alpha and beta | $\alpha = \beta = \sqrt{\pi f\mu\sigma}$ | Valid only for $\tan\delta \gg 1$. Also means one skin depth equals one radian of phase. |
| Good conductor: skin depth | $\delta_s = \frac{1}{\sqrt{\pi f\mu\sigma}} = \sqrt{\frac{2}{\omega\mu\sigma}}$ | Falls as $1/\sqrt{f}$. Copper at 1 MHz: 66.1 micrometre. |
| Low-loss dielectric attenuation | $\alpha \approx \frac{\sigma}{2}\sqrt{\frac{\mu}{\varepsilon}}$ | For $\tan\delta \ll 1$, with $\beta \approx \omega\sqrt{\mu\varepsilon}$ unchanged. Nepers per metre. |
| Surface resistance | $R_s = \frac{1}{\sigma\delta_s} = \sqrt{\frac{\pi f\mu}{\sigma}}$ | Ohms per square of surface, independent of the patch size. Copper at 100 MHz: 2.61 milliohm. |
| Complex impedance of a good conductor | $\eta = (1+j)\sqrt{\frac{\omega\mu}{2\sigma}} = \frac{1+j}{\sigma\delta_s} = (1+j)R_s$ | Magnitude $\sqrt{2}R_s$ at an angle of exactly $45^\circ$: E leads H by 45 degrees. |
| Phase velocity in a good conductor | $v_p = \frac{\omega}{\beta} = \sqrt{\frac{2\omega}{\mu\sigma}} = \sqrt{\frac{4\pi f}{\mu\sigma}}$ | Not $1/\sqrt{\mu\varepsilon}$. Copper at 1 MHz: about 415 m/s. |
| Nepers to decibels | $\alpha_{\mathrm{dB}} = 8.686\,\alpha_{\mathrm{Np}}$ | Amplitude ratio: 1 Np = 20 log10(e) = 8.686 dB. Using 10 instead of 20 halves every dB answer. |

## Interactive Widget

**Skin Depth vs Frequency**

![[Skin_Depth_vs_Frequency.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find the skin depth and the attenuation constant of copper at $1$ MHz. Use $\sigma = 5.8\times10^{7}$ S/m and $\mu = 4\pi\times10^{-7}$ H/m.

**Given:** f = 1 MHz = 1e6 Hz; sigma = 5.8e7 S/m; mu = mu0 = 4 pi e-7 H/m; copper, non-magnetic

**Solution:**

1. Check the regime: tan delta = sigma/(omega eps0) = 5.8e7/(6.2832e6 x 8.854e-12) = 1.04e12, so the good-conductor branch applies
2. Compute the product: pi f mu sigma = (3.14159e6)(1.256637e-6)(5.8e7) = 2.2897e8
3. delta = 1/sqrt(2.2897e8) = 6.609e-5 m = 66.1 micrometre
4. alpha = 1/delta = 1.513e4 Np/m
5. Check with alpha = sqrt(pi f mu sigma) = sqrt(2.2897e8) = 1.513e4 Np/m, identical

> [!success]- Answer
> **$\delta_s = 66.1\ \mu$m and $\alpha = 1.51\times10^{4}$ Np/m.**

> [!warning] Trap
> Treating the permeability as 1 H/m instead of $\mu_0 = 4\pi\times10^{-7}$ H/m. The wrong form $\delta = 1/\sqrt{\pi f\sigma}$ gives 74 nm instead of 66 $\mu$m — a factor of 892 too small, and the result no longer matches the handbook value for copper.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5.8E7÷(2\pi×1E6×` `SHIFT` `CVALUE` `32` `)=` → $\tan\delta$ = **1.04E12**, far above 1, so the conductor branch applies.
> 2. `1÷√(\pi×1E6×` `SHIFT` `CVALUE` `33` `×5.8E7)=` → $\delta$ = **6.609E-5** m = **66.1** um.
> 3. `1÷Ans=` → $\alpha$ = **1.513E4** Np/m, identical to $\sqrt{\pi f\mu\sigma}$.
>
> Codes `32` and `33` are $\varepsilon_0$ and $\mu_0$; treating $\mu_r=1$ as $\mu=1$ H/m gives 74 nm instead of 66 um.

### P2. A material has $\sigma = 2\times10^{-4}$ S/m, $\varepsilon_r = 2.25$ and $\mu_r = 1$ at $f = 100$ MHz. Classify it by loss tangent, choose the correct branch, and find the attenuation constant.

**Given:** sigma = 2e-4 S/m; eps_r = 2.25; mu_r = 1; f = 100 MHz

**Solution:**

1. omega = 2 pi f = 6.2832e8 rad/s and eps = 2.25 eps0 = 1.9922e-11 F/m
2. omega eps = (6.2832e8)(1.9922e-11) = 1.2517e-2 S/m
3. tan delta = sigma/(omega eps) = 2e-4/1.2517e-2 = 1.60e-2, far less than 0.1, so it is a good dielectric (low-loss)
4. Low-loss branch: alpha = (sigma/2) sqrt(mu/eps) = (1e-4) sqrt(1.2566e-6/1.9922e-11) = (1e-4)(251.2)
5. alpha = 2.512e-2 Np/m; the exact formula gives 2.5115e-2 Np/m, confirming the shortcut to three figures

> [!success]- Answer
> **Low-loss dielectric with $\tan\delta = 0.016$; $\alpha = 2.51\times10^{-2}$ Np/m (25.1 mNp/m).**

> [!warning] Trap
> Using the good-conductor shortcut. $\alpha = \sqrt{\pi f\mu\sigma} = \sqrt{(3.14159e8)(1.256637e-6)(2\times10^{-4})} = 0.281$ Np/m — 11 times too large. The shortcut requires $\tan\delta \gg 1$, and here $\tan\delta = 0.016$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2E-4÷(2\pi×1E8×2.25×` `SHIFT` `CVALUE` `32` `)=` → $\tan\delta$ = **0.0160**, a low-loss dielectric.
> 2. Low-loss branch: `(2E-4÷2)×√(` `SHIFT` `CVALUE` `33` `÷(2.25×` `SHIFT` `CVALUE` `32` `))=` → $\alpha$ = **2.512E-2** Np/m.
> 3. The conductor shortcut `√(\pi×1E8×` `SHIFT` `CVALUE` `33` `×2E-4)=` → **0.281** Np/m, 11 times too large.

### P3. A 1 MHz wave penetrates copper ($\sigma = 5.8\times10^{7}$ S/m, $\mu = 4\pi\times10^{-7}$ H/m) to a depth of three skin depths. Find the total attenuation in nepers and in decibels, and the fraction of the surface amplitude remaining.

**Given:** f = 1 MHz; copper: sigma = 5.8e7 S/m, mu = 4 pi e-7 H/m; depth z = 3 skin depths

**Solution:**

1. From the same material data, delta = 6.609e-5 m
2. z = 3 delta = 1.983e-4 m
3. Attenuation = alpha z = z/delta = 3.000 Np exactly, since alpha = 1/delta
4. Decibels: 3 Np x 8.686 = 26.06 dB
5. Remaining amplitude = e^-3 = 0.0498, i.e. 4.98% of the surface value

> [!success]- Answer
> **$3.00$ Np $= 26.1$ dB; 4.98% of the surface amplitude remains.**

> [!warning] Trap
> Converting nepers with the power factor 10 log10 instead of the amplitude factor 20 log10. One neper is 8.686 dB for an amplitude ratio, so 3 Np is 26.1 dB; using 4.343 dB per neper gives 13.0 dB, and 3 Np reported directly as 3 dB is wrong by a factor of 8.7.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Three skin depths is $\alpha z$ = **3.000** Np by definition, since $\alpha=1/\delta$.
> 2. `3×8.686=` → **26.06** dB.
> 3. `SHIFT` `ln` `(-)3=` → **0.0498**, so **4.98 %** of the surface amplitude remains.
>
> One neper is $20\log_{10}e=8.686$ dB for an amplitude; the 4.343 dB/Np figure gives 13 dB.

### P4. Find the surface resistance and the complex intrinsic impedance of copper at $100$ MHz. Use $\sigma = 5.8\times10^{7}$ S/m and $\mu = 4\pi\times10^{-7}$ H/m.

**Given:** f = 100 MHz = 1e8 Hz; sigma = 5.8e7 S/m; mu = 4 pi e-7 H/m

**Solution:**

1. pi f mu sigma = (3.14159e8)(1.256637e-6)(5.8e7) = 2.2897e10
2. delta = 1/sqrt(2.2897e10) = 6.609e-6 m = 6.61 micrometre
3. R_s = 1/(sigma delta) = 1/((5.8e7)(6.609e-6)) = 1/383.3 = 2.609e-3 ohm per square
4. Check with R_s = sqrt(pi f mu/sigma) = sqrt(3.9478e8/5.8e7) = sqrt(6.807) = 2.609e-3 ohm, identical
5. Complex impedance: eta = (1+j)R_s = (1+j) 2.609e-3, so the magnitude is sqrt(2) x 2.609e-3 = 3.690e-3 ohm at an angle of 45 degrees

> [!success]- Answer
> **$R_s = 2.61$ m$\Omega$ per square; $\eta = (1+j)2.61$ m$\Omega$, magnitude $3.69$ m$\Omega$ at $45^\circ$.**

> [!warning] Trap
> Scaling the skin depth and the surface resistance by the same factor. From 1 MHz to 100 MHz ($\times100$) the skin depth shrinks by 10 to 6.61 $\mu$m, but $R_s$ grows by only $\sqrt{100} = 10$, from 0.261 to 2.61 m$\Omega$. Reporting $R_s$ 100 times larger overstates the conductor loss by 10.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `1÷√(\pi×1E8×` `SHIFT` `CVALUE` `33` `×5.8E7)=` → $\delta$ = **6.609E-6** m = **6.61** um, with code `33` = $\mu_0$.
> 2. `1÷(5.8E7×Ans)=` → $R_s$ = **2.609E-3** ohm per square.
> 3. Enter `(1+i)×2.609E-3` then `Apps` `▶r∠θ` → **3.690E-3** ohm at **45°**.
>
> From 1 MHz to 100 MHz $\delta$ shrinks 10x but $R_s$ grows only $\sqrt{100}=10$; the 45° phase is fixed by $(1+j)$.

## Traps & Exam Notes

- **Applying the good-conductor shortcut at moderate loss.** At $\tan\delta = 1$ the exact coefficients are $\alpha = 0.455\,\omega\sqrt{\mu\varepsilon}$ and $\beta = 1.099\,\omega\sqrt{\mu\varepsilon}$, while the shortcut gives $0.707\,\omega\sqrt{\mu\varepsilon}$ for both — $\alpha$ 55% too large and $\beta$ 36% too small.
- **Quoting $v_p = 1/\sqrt{\mu\varepsilon}$ inside a conductor.** Copper at 1 MHz has $v_p = \omega/\beta = \sqrt{4\pi f/(\mu\sigma)} = 415$ m/s. Using $3\times10^{8}$ m/s is off by a factor of $7\times10^{5}$, because a good conductor is strongly dispersive.
- **Confusing skin depth with wavelength.** $\delta_s$ is the $1/e$ amplitude depth; in a good conductor $\beta = \alpha$, so the wavelength is $2\pi\delta_s$. At 1 MHz in copper that is 415 $\mu$m, not 66 $\mu$m, and a phase-shift question answered with 66 $\mu$m is wrong by $2\pi$.
- **Dropping $\mu_0$ from the metal formulas.** Writing $\delta_s = 1/\sqrt{\pi f\sigma}$ treats $\mu_r = 1$ as $\mu = 1$ H/m. Copper at 1 MHz then gives 74 nm instead of 66 $\mu$m, a factor of 892 error.
- **Classifying a material by $\varepsilon_r$ or by $\sigma$ alone.** The classifier is $\sigma/(\omega\varepsilon)$ and it moves with frequency. Seawater ($\sigma = 4$ S/m, $\varepsilon_r = 81$) has $\tan\delta = 888$ at 1 MHz — a good conductor — yet behaves as a low-loss dielectric in the visible, despite the same $\sigma$ and $\varepsilon_r$.
- **Reporting nepers as decibels.** $\alpha z = 3$ Np is 26.1 dB, not 3 dB and not 13 dB. One neper equals $20\log_{10}e = 8.686$ dB for a field amplitude.

## See Also

- [[19_EM_Wave_Equations_and_Uniform_Plane_Waves]]
- [[22_Intrinsic_Impedance_and_Poynting_Vector]]
- [[21_Reflection_and_Transmission_at_Boundaries]]

---

[[19_EM_Wave_Equations_and_Uniform_Plane_Waves|⬅ 19]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[21_Reflection_and_Transmission_at_Boundaries|21 ➡]]
