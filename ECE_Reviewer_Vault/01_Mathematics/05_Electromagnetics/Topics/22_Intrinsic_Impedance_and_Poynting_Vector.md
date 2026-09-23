---
id: MATH-05-22
title: "Intrinsic Impedance and Poynting Vector"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 22
tier: 2
depth: full
problem_count: 4
prereqs: ["[[19_EM_Wave_Equations_and_Uniform_Plane_Waves]]", "[[18_Maxwell’s_Equations_and_Displacement_Current]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 22 — Intrinsic Impedance and Poynting Vector

> [!abstract] Scope
> Convert between the electric and magnetic amplitudes of a wave through the intrinsic impedance, then compute power density, total power through an aperture, radiation pressure, and the energy balance stated by the Poynting theorem.

## Core Concept

> [!tip] Intuition
> The Poynting vector $\mathbf{E}\times\mathbf{H}$ is electromagnetic power flow per unit area: its magnitude is watts per square metre and its direction is the direction the wave carries energy. In a uniform plane wave all of that power is fixed by just two numbers, the field amplitude $E_0$ and the intrinsic impedance $\eta$ of the medium.

**The intrinsic impedance sets the E-to-H ratio.** In a uniform plane wave the two field amplitudes are locked together by $\eta = E_0/H_0 = \sqrt{\mu/\varepsilon}$, a property of the *medium* alone — independent of the wave's amplitude, its frequency and (in a lossless dielectric) its direction. Free space gives the familiar:
$$\eta_0 = \sqrt{\mu_0/\varepsilon_0} = 120\pi = 377\ \Omega$$
and for a non-magnetic dielectric $\eta = \eta_0/\sqrt{\varepsilon_r}$, so a denser medium lowers $\eta$ and raises $H_0$ for the same $E_0$. Because $\eta$ has units of ohms, the relation reads exactly like Ohm's law for a wave, and it is what makes transmission-line matching intuition transfer to waves at a boundary. In a lossy medium $\eta$ becomes complex and E and H are no longer in phase — the impedance angle is the phase by which E leads H. Do not confuse $\eta$ with a transmission line's characteristic impedance or a waveguide's wave impedance: only $\eta$ is a property of the medium by itself.

**The Poynting vector and why it is a cross product.** The instantaneous power flow density is $\mathbf{S} = \mathbf{E}\times\mathbf{H}$, in W/m². Its direction is the direction of energy transport. Take the standard plane wave, with its electric field along $x$:
$$\mathbf{E} = E_0\cos(\omega t-\beta z)\mathbf{a}_x$$
The magnetic field is then along $y$:
$$\mathbf{H} = (E_0/\eta)\cos(\omega t-\beta z)\mathbf{a}_y$$
Their cross product evaluates to the power flow density:
$$\mathbf{S} = (E_0^{2}/\eta)\cos^{2}(\omega t-\beta z)\,\mathbf{a}_z$$
Two features deserve attention. First, $\mathbf{S}$ never points backwards even though both fields oscillate through zero: the product of two quantities that change sign together stays positive. Second, the magnitude pulses between 0 and $E_0^{2}/\eta$ at *twice* the field frequency, which is why every practical question asks for the time average rather than the instantaneous value. The expression comes out of energy bookkeeping: the work done on charges per unit volume is $\mathbf{J}\cdot\mathbf{E}$, and a vector identity converts that work into the divergence of the power flow:
$$\nabla\cdot(\mathbf{E}\times\mathbf{H}) = \mathbf{H}\cdot(\nabla\times\mathbf{E}) - \mathbf{E}\cdot(\nabla\times\mathbf{H})$$

**Time average and the factor one half.** Averaging $\cos^{2}$ over a period gives $1/2$, so a sinusoidal plane wave carries a time-averaged power density of:
$$\langle S\rangle = E_0^{2}/(2\eta) = \eta H_0^{2}/2 = E_0H_0/2$$
W/m² along the propagation direction. In phasor notation with *peak* amplitudes the same statement is the complex Poynting vector:
$$\langle\mathbf{S}\rangle = \frac{1}{2}\mathrm{Re}(\mathbf{E}\times\mathbf{H}^{*})$$
the conjugate is what makes it real, and a lossy medium's phase angle then shows up as a $\cos\theta_\eta$ factor. If the amplitudes are already rms, the $\frac{1}{2}$ disappears and the average simplifies to:
$$\langle S\rangle = E_{\mathrm{rms}}^{2}/\eta = E_{\mathrm{rms}}H_{\mathrm{rms}}$$
Mixing the two conventions is the single most common numerical error in this topic, and it always costs a factor of exactly 2. As a physical check, the average energy density of the wave splits equally between the two fields:
$$\frac{1}{2}\varepsilon E_0^{2} = \frac{1}{4}\varepsilon E_0^{2} + \frac{1}{4}\mu H_0^{2}$$
the electric and magnetic halves are equal, and the ratio of power flow to energy density is the phase velocity:
$$\langle S\rangle/u = 1/\sqrt{\mu\varepsilon} = v_p$$
— energy is delivered at that speed.

**Total power, radiation pressure and the Poynting theorem.** Power is a *flux*, meaning the total crossing a surface is a closed-surface integral:
$$P = \oint\langle\mathbf{S}\rangle\cdot d\mathbf{A}$$
which for a uniform wave normally incident on a flat aperture of area $A$ is simply $\langle S\rangle A$; if the aperture is tilted by $\theta$ to the wave, only the projected area intercepts power, $\langle S\rangle A\cos\theta$. A wave also carries momentum, so it pushes: a perfectly absorbing surface feels a radiation pressure $p = \langle S\rangle/c$, and a perfect reflector feels $2\langle S\rangle/c$ because the momentum reverses instead of being absorbed. Sunlight at 1.36 kW/m² gives only 4.5 $\mu$Pa, yet that is enough to be the design driver for solar sails and a real perturbation on satellite attitude. The bookkeeping behind all of it is the Poynting theorem:
$$\oint\mathbf{S}\cdot d\mathbf{A} = -\frac{\partial}{\partial t}\int(\frac{1}{2}\varepsilon E^{2}+\frac{1}{2}\mu H^{2})\,dv - \int\sigma E^{2}\,dv$$
The power flowing *out* of a closed surface equals the rate of decrease of the stored electric and magnetic energy inside, minus the ohmic loss. Every term is a power. For a lossless volume with steady fields both right-hand terms vanish and the net outflow is zero — energy that leaves must have been stored somewhere first, which is the sanity check that catches a sign error in $\mathbf{E}\times\mathbf{H}$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Intrinsic impedance | $\eta = \sqrt{\frac{\mu}{\varepsilon}},\qquad \eta_0 = 120\pi = 377\ \Omega$ | A property of the medium only, independent of frequency and amplitude in a lossless dielectric. |
| E-to-H ratio | $\frac{E_0}{H_0} = \eta$ | Peak to peak or rms to rms, but never mixed. Reads like Ohm's law for a wave. |
| Impedance of a dielectric | $\eta = \frac{\eta_0}{\sqrt{\varepsilon_r\mu_r}} \approx \frac{377}{\sqrt{\varepsilon_r}}$ | Non-magnetic case. Divide by the square root, never multiply by $\varepsilon_r$. |
| Poynting vector | $\mathbf{S} = \mathbf{E}\times\mathbf{H}$ | W/m², instantaneous. Direction is the direction of energy flow; magnitude pulses at twice the field frequency. |
| Instantaneous power density of a plane wave | $S = \frac{E_0^{2}}{\eta}\cos^{2}(\omega t-\beta z)$ | Always positive, so energy flows one way only. Peak value $E_0^{2}/\eta$. |
| Time-average Poynting vector | $\langle\mathbf{S}\rangle = \frac{1}{2}\mathrm{Re}\left(\mathbf{E}\times\mathbf{H}^{*}\right)$ | Phasor form with peak amplitudes. The conjugate makes the result real. |
| Average power density of a plane wave | $\langle S\rangle = \frac{E_0^{2}}{2\eta} = \frac{\eta H_0^{2}}{2} = \frac{E_0H_0}{2}$ | W/m². The $\frac{1}{2}$ is the time average of $\cos^{2}$, and is present only for peak amplitudes. |
| rms amplitudes | $\langle S\rangle = \frac{E_{\mathrm{rms}}^{2}}{\eta} = E_{\mathrm{rms}}H_{\mathrm{rms}}$ | Use this form whenever the amplitudes are rms; adding another $\frac{1}{2}$ halves the power. |
| Total power through a surface | $P = \oint\langle\mathbf{S}\rangle\cdot d\mathbf{A}$ | Watts. For a uniform wave on a flat aperture of area A at normal incidence, $P = \langle S\rangle A$. |
| Radiation pressure | $p = \frac{\langle S\rangle}{c}\ (\mathrm{absorbed}),\qquad p = \frac{2\langle S\rangle}{c}\ (\mathrm{reflected})$ | Pa. The factor 2 belongs to a perfect reflector only; multiply by the area for the force. |
| Poynting theorem | $\oint\mathbf{S}\cdot d\mathbf{A} = -\frac{\partial}{\partial t}\int\left(\frac{1}{2}\varepsilon E^{2}+\frac{1}{2}\mu H^{2}\right)dv - \int\sigma E^{2}\,dv$ | Outflow equals the decrease of stored energy minus the ohmic loss. Every term is a power. |
| Energy densities and their ratio | $w_e = \frac{1}{2}\varepsilon E^{2},\qquad w_m = \frac{1}{2}\mu H^{2},\qquad w_e = w_m$ | The equality holds for a plane wave because $\eta^{2} = \mu/\varepsilon$. Total average density is $\frac{1}{2}\varepsilon E_0^{2}$. |

## Worked Problems

### P1. A uniform plane wave in air has an electric field amplitude of $100$ V/m. Find the magnetic field amplitude and the average power density carried by the wave.

**Given:** E0 = 100 V/m; air: eta0 = 377 ohm; sinusoidal steady state

**Solution:**

1. H0 = E0/eta0 = 100/377 = 0.2653 A/m = 265 mA/m
2. Average power density: <S> = E0^2/(2 eta0) = (100)^2/(2 x 376.99)
3. Denominator: 2 x 376.99 = 753.98
4. <S> = 10000/753.98 = 13.26 W/m^2
5. Check with the product form: E0 H0/2 = (100)(0.2653)/2 = 13.26 W/m^2, agreeing

> [!success]- Answer
> **$H_0 = 265$ mA/m; $\langle S\rangle = 13.3$ W/m².**

> [!warning] Trap
> Dropping the $\frac{1}{2}$ and reporting $E_0^{2}/\eta_0 = 26.5$ W/m², exactly double the correct answer. The $\frac{1}{2}$ is the time average of $\cos^{2}(\omega t-\beta z)$ and disappears only if the amplitude is already an rms value.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100÷` `SHIFT` `CVALUE` `37` `=` → $H_0$ = **0.2654** A/m = **265** mA/m, with code `37` = $Z_0$.
> 2. `100²÷(2×` `SHIFT` `CVALUE` `37` `)=` → $\langle S\rangle$ = **13.27** W/m².
> 3. Product check: `100×0.2654÷2=` → **13.27** W/m², agreeing.
>
> $Z_0$ is 376.73 ohm; the 377 shorthand gives 13.26 W/m², and dropping the half gives 26.5 W/m².

### P2. The same wave with $\langle S\rangle = 13.26$ W/m² passes normally through a $0.5$ m² aperture. Find the total power crossing it.

**Given:** <S> = 13.26 W/m2; A = 0.5 m2; aperture facing the wave (normal incidence)

**Solution:**

1. The wave is uniform, so the flux integral reduces to a product: P = <S> A
2. P = (13.26)(0.5)
3. P = 6.63 W

> [!success]- Answer
> **$P = 6.63$ W.**

> [!warning] Trap
> Carrying the doubled 26.5 W/m² into this step and answering 13.3 W. Also note that a 0.5 m² aperture only intercepts the full power if it faces the wave: at $60^\circ$ to the normal the projected area is $0.5\cos60^\circ = 0.25$ m² and the power falls to 3.32 W.

### P3. Find the radiation pressure this wave exerts on a perfectly absorbing surface, and the total force on a $0.5$ m² absorbing panel. What would the pressure be if the surface were a perfect reflector instead?

**Given:** <S> = 13.26 W/m2; A = 0.5 m2; perfect absorber (black surface)

**Solution:**

1. Absorbing surface: p = <S>/c = 13.26/(3e8)
2. p = 4.42e-8 Pa = 44.2 nPa
3. Force on the panel: F = pA = (4.42e-8)(0.5) = 2.21e-8 N
4. Perfect reflector: the momentum reverses, so p = 2<S>/c = 2(4.42e-8) = 8.84e-8 Pa = 88.4 nPa, double the absorbing case

> [!success]- Answer
> **$p = 4.42\times10^{-8}$ Pa (44.2 nPa) and $F = 2.21\times10^{-8}$ N on the absorber; 88.4 nPa if the surface were a perfect reflector.**

> [!warning] Trap
> Using $2\langle S\rangle/c$ for the absorber. The factor 2 applies only when the wave is reflected back, because only then is the momentum change twice the incident momentum. Reporting 88 nPa for a black surface doubles the answer.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `13.26÷` `SHIFT` `CVALUE` `28` `=` → $p$ = **4.42E-8** Pa = **44.2** nPa on the absorber, with code `28` = $c_0$.
> 2. `×0.5=` → $F$ = **2.21E-8** N on the 0.5 m² panel.
> 3. Perfect reflector: `13.26÷3E8×2=` → **8.84E-8** Pa = **88.4** nPa, exactly double.
>
> The factor 2 is for reversed momentum; applying it to a black surface is the doubling trap.

### P4. A uniform plane wave with $E_0 = 100$ V/m travels in a lossless dielectric with $\varepsilon_r = 2.25$ and $\mu_r = 1$. Find the intrinsic impedance and the average power density, and compare with the same field in air.

**Given:** E0 = 100 V/m; eps_r = 2.25, mu_r = 1; air comparison: eta0 = 377 ohm, <S> = 13.26 W/m2

**Solution:**

1. eta = eta0/sqrt(eps_r) = 377/sqrt(2.25) = 377/1.5 = 251.3 ohm
2. H0 = E0/eta = 100/251.3 = 0.3979 A/m, up from 0.2653 A/m in air
3. <S> = E0^2/(2 eta) = 10000/(2 x 251.3) = 10000/502.7 = 19.89 W/m^2
4. Check with the product form: E0 H0/2 = (100)(0.3979)/2 = 19.89 W/m^2, agreeing
5. So the same E0 carries more power in the dielectric (19.9 against 13.3 W/m^2) because a smaller eta demands a larger H

> [!success]- Answer
> **$\eta = 251\ \Omega$; $\langle S\rangle = 19.9$ W/m² — more than the 13.3 W/m² of the same $E_0$ in air.**

> [!warning] Trap
> Multiplying by $\varepsilon_r$ for the impedance and expecting the denser medium to carry less power. $\eta = 377\varepsilon_r = 848\ \Omega$ gives 5.89 W/m², wrong in both direction and magnitude; since $\eta$ falls, $H_0$ rises and the power density increases.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `377÷√2.25=` → $\eta$ = **251.3** ohm, the $\eta_0/\sqrt{\varepsilon_r}$ form.
> 2. `100÷Ans=` → $H_0$ = **0.3979** A/m, up from **0.2653** A/m in air.
> 3. `10000÷(2×Ans)=` → $\langle S\rangle$ = **19.89** W/m², against **13.26** W/m² for the same $E_0$ in air.
>
> $377\varepsilon_r=848$ ohm is the trap, and it predicts less power: $\eta$ falls, so $H_0$ rises.

## Traps & Exam Notes

- **Forgetting or double-counting the $\frac{1}{2}$.** For peak amplitudes $\langle S\rangle = E_0^{2}/(2\eta)$; for rms amplitudes $\langle S\rangle = E_{\mathrm{rms}}^{2}/\eta$. Applying the peak form to an rms number halves the power, and dropping the $\frac{1}{2}$ for a peak number doubles it — a factor of 4 between the two possible errors.
- **Using $2\langle S\rangle/c$ for an absorbing surface.** Radiation pressure is $\langle S\rangle/c$ for a perfect absorber and $2\langle S\rangle/c$ for a perfect reflector. Reporting 88 nPa where the surface is black doubles the correct 44 nPa.
- **Getting the direction of $\mathbf{S}$ from the magnitudes alone.** $\mathbf{S} = \mathbf{E}\times\mathbf{H}$: for $\mathbf{E} = E_0\mathbf{a}_x$ in a $+\mathbf{a}_z$ wave, $\mathbf{H}$ must be along $+\mathbf{a}_y$. Taking $-\mathbf{a}_y$ reverses the Poynting vector and predicts power flowing back into the source.
- **Multiplying by $\varepsilon_r$ instead of dividing by $\sqrt{\varepsilon_r}$.** $\eta = \eta_0/\sqrt{\varepsilon_r} = 251\ \Omega$ for $\varepsilon_r = 2.25$; using $377\varepsilon_r = 848\ \Omega$ changes $\langle S\rangle$ from 19.9 to 5.9 W/m².
- **Treating the aperture area as always fully intercepting.** Total power is the *flux* $\oint\langle\mathbf{S}\rangle\cdot d\mathbf{A}$. A plane tilted by $\theta$ to the wave intercepts $\langle S\rangle A\cos\theta$; at $60^\circ$ that is half the power, not all of it.
- **Confusing $\eta$ with a guide or line impedance.** $\eta = \sqrt{\mu/\varepsilon}$ is a property of the medium alone. A rectangular waveguide's wave impedance depends on frequency and mode, and for TE modes it is larger than $\eta$ — so a matched guide is not a matched medium.

## See Also

- [[19_EM_Wave_Equations_and_Uniform_Plane_Waves]]
- [[20_Waves_in_Lossy_Media_and_Skin_Depth]]
- [[21_Reflection_and_Transmission_at_Boundaries]]
- [[18_Maxwell’s_Equations_and_Displacement_Current]]

---

[[21_Reflection_and_Transmission_at_Boundaries|⬅ 21]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
