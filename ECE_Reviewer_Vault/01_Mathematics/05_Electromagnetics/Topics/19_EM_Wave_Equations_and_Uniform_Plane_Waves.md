---
id: MATH-05-19
title: "EM Wave Equations and Uniform Plane Waves"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 19
tier: 2
depth: full
problem_count: 4
prereqs: ["[[18_Maxwell’s_Equations_and_Displacement_Current]]", "[[02_Gradient,_Divergence,_Curl_and_Laplacian]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 19 — EM Wave Equations and Uniform Plane Waves

> [!abstract] Scope
> Reduce the source-free Maxwell curl equations to a second-order wave equation, then extract the phase velocity, propagation constant, wavelength and magnetic field of a uniform plane wave from its electric field, and identify the polarization.

## Core Concept

> [!tip] Intuition
> Take the curl of Faraday's law and substitute Ampere's law into it: the two coupled first-order equations collapse into one second-order wave equation whose solutions travel at $1/\sqrt{\mu\varepsilon}$. In a uniform plane wave the field vectors are locked into a mutually perpendicular triad with the propagation direction, so a single amplitude ratio — the intrinsic impedance — converts E into H.

**Where the wave equation comes from.** In a source-free, lossless, uniform medium the sources vanish ($\rho=0$, $\mathbf{J}=0$) and $\sigma=0$, so Maxwell's two curl equations read:
$$\nabla\times\mathbf{E} = -\mu\,\partial\mathbf{H}/\partial t$$
and:
$$\nabla\times\mathbf{H} = \varepsilon\,\partial\mathbf{E}/\partial t$$
Take the curl of the first and substitute the second:
$$\nabla\times\nabla\times\mathbf{E} = -\mu\,\partial(\nabla\times\mathbf{H})/\partial t = -\mu\varepsilon\,\partial^{2}\mathbf{E}/\partial t^{2}$$
The vector identity that reduces the double curl is:
$$\nabla\times\nabla\times\mathbf{E} = \nabla(\nabla\cdot\mathbf{E}) - \nabla^{2}\mathbf{E}$$
The divergence condition collapses that identity, and in a source-free medium it reads:
$$\nabla\cdot\mathbf{E} = \rho/\varepsilon = 0$$
which leaves the wave equation for the electric field:
$$\nabla^{2}\mathbf{E} = \mu\varepsilon\,\partial^{2}\mathbf{E}/\partial t^{2}$$
and the identical equation falls out for $\mathbf{H}$. The coupling is the whole trick: it is the *time derivative* of one curl equation that turns the other into a second-order equation, which is why a static field ($\partial/\partial t = 0$) reduces to Laplace's equation instead. The derivation fails the moment $\sigma\neq0$ or $\rho\neq0$: a conductor adds a first-derivative loss term and the wave acquires an exponential decay factor (see the lossy-media topic).

**Phase velocity, propagation constant and wavelength.** The one-dimensional solution $E = E_0\cos(\omega t - \beta z)$ satisfies the wave equation only if $\beta^{2} = \omega^{2}\mu\varepsilon$, because the two derivatives contribute $-\beta^{2}$ and $-\omega^{2}$. Points of constant phase satisfy $\omega t - \beta z = \mathrm{constant}$, so the speed at which they move is:
$$dz/dt = \omega/\beta = 1/\sqrt{\mu\varepsilon} \equiv v_p$$
In vacuum this phase velocity takes the value:
$$1/\sqrt{\mu_0\varepsilon_0} = 3\times10^{8}$$
m/s, the number that defines the metre; in any material $v_p \le c$. The propagation constant $\beta = \omega\sqrt{\mu\varepsilon}$ is measured in radians per metre, and $\beta z$ must be substituted in radians — degrees are the classic silent error. Wavelength follows as $\lambda = 2\pi/\beta = v_p/f$. Two invariants matter at an interface: the *frequency* is fixed by the source and never changes, while the wavelength shrinks by $\sqrt{\varepsilon_r}$ inside a denser medium. Carrying air's $\lambda = 3$ m into a dielectric is therefore wrong even though the frequency is unchanged.

**Uniform plane waves and the TEM condition.** A uniform plane wave has $\mathbf{E}$ and $\mathbf{H}$ of constant magnitude and fixed direction over every plane perpendicular to the direction of travel, and neither field has a component along that direction. Those two facts are the definition, and they make the wave *transverse electromagnetic* (TEM):
$$\mathbf{E}\cdot\mathbf{a}_k = 0$$
$\mathbf{H}\cdot\mathbf{a}_k = 0$, and $\mathbf{E}\times\mathbf{H}$ points along $\mathbf{a}_k$. The transversality is forced, not assumed: the divergence condition $\nabla\cdot\mathbf{E} = 0$ applied to a wave depending only on $z$ gives $\partial E_z/\partial z = 0$, and a non-zero uniform $E_z$ would be a static field, not a wave. A uniform plane wave in unbounded space is always TEM; guided waves in a hollow waveguide are not (they are TE or TM, with a longitudinal component), which is why waveguide impedance depends on frequency while a plane wave's intrinsic impedance does not.

**Orthogonality, the H field and the intrinsic impedance.** Maxwell's curl equations force the triad: for propagation along $+\mathbf{a}_z$ with $\mathbf{E} = E_0\mathbf{a}_x$, Faraday's law gives $\mathbf{H} = (E_0/\eta)\mathbf{a}_y$, where $\eta = \sqrt{\mu/\varepsilon}$ is the intrinsic impedance. In general the magnetic field follows from the propagation direction:
$$\mathbf{H} = (1/\eta)\,\mathbf{a}_k\times\mathbf{E}$$
and the magnitudes are related by $E_0 = \eta H_0$. The cross product is doing real work:
$$\mathbf{a}_z\times\mathbf{a}_x = \mathbf{a}_y$$
so a sign slip puts H parallel to E and $\mathbf{E}\times\mathbf{H} = 0$ — a wave that carries no power, which is physically impossible. Free space has an intrinsic impedance of:
$$\eta_0 = \sqrt{\mu_0/\varepsilon_0} = 120\pi = 377\ \Omega$$
a dielectric with $\mu_r = 1$ has $\eta = \eta_0/\sqrt{\varepsilon_r}$, so the same E produces a *larger* H in a denser medium.

**Polarization.** The polarization is the figure traced by the tip of $\mathbf{E}$ in a fixed transverse plane as time advances — equivalently the shape of the curve $\mathbf{E}(t)$ at constant $z$. Write the two transverse components as $E_{x0}\cos(\omega t - \beta z)$ and $E_{y0}\cos(\omega t - \beta z + \phi)$. If $\phi = 0$ or $180^\circ$ the two components stay in a fixed ratio and the tip moves along a straight line — *linear* polarization, tilted by an angle that follows from the amplitudes: $\arctan(E_{y0}/E_{x0})$. If $E_{x0} = E_{y0}$ and $\phi = \pm90^\circ$ the magnitude $\sqrt{E_{x0}^{2}\cos^{2} + E_{x0}^{2}\sin^{2}}$ is constant and the tip traces a circle — *circular* polarization. Any other combination of unequal amplitudes and/or a phase other than $0$, $90^\circ$ or $180^\circ$ traces an ellipse — *elliptical* polarization, the general case of which the other two are degenerate limits. Because the sense of rotation is stated differently in different texts, the safe exam answer names the rotation direction explicitly (for example, from $\mathbf{a}_x$ toward $\mathbf{a}_y$) instead of relying on a right-hand or left-hand label alone.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Wave equation for E | $\nabla^{2}\mathbf{E} = \mu\varepsilon\frac{\partial^{2}\mathbf{E}}{\partial t^{2}}$ | Source-free, lossless, uniform medium: $\rho=0$, $\mathbf{J}=0$, $\sigma=0$. A conductor adds a first-derivative loss term. |
| Wave equation for H | $\nabla^{2}\mathbf{H} = \mu\varepsilon\frac{\partial^{2}\mathbf{H}}{\partial t^{2}}$ | The same equation, because both fields obey the same coupled curls. In a plane wave the two travel together. |
| Phase velocity | $v_p = \frac{\omega}{\beta} = \frac{1}{\sqrt{\mu\varepsilon}}$ | Lossless media only. In a conductor $v_p = \omega/\beta$ still holds but $1/\sqrt{\mu\varepsilon}$ does not. |
| Free-space speed | $c = \frac{1}{\sqrt{\mu_0\varepsilon_0}} = 3\times10^{8}\ \mathrm{m/s}$ | Exact as a definition of the metre; the exam value is the rounded $3\times10^{8}$ m/s. |
| Propagation constant | $\beta = \omega\sqrt{\mu\varepsilon} = \frac{2\pi}{\lambda}$ | Radians per metre. $\beta z$ must enter a cosine in radians; degrees silently corrupt the field value. |
| Wavelength | $\lambda = \frac{2\pi}{\beta} = \frac{v_p}{f}$ | The source fixes $f$ across a boundary; $\lambda$ and $\beta$ change with the medium. |
| Refractive index | $n = \frac{c}{v_p} = \sqrt{\varepsilon_r\mu_r}$ | Non-magnetic dielectrics reduce this to $n=\sqrt{\varepsilon_r}$, so $\varepsilon_r = n^{2}$. |
| Uniform plane wave in the time domain | $\mathbf{E}(z,t) = E_0\cos(\omega t - \beta z)\,\mathbf{a}_x$ | Travels along $+\mathbf{a}_z$. Reversing the sign of $\beta z$ reverses the direction of travel. |
| Intrinsic impedance | $\eta = \sqrt{\frac{\mu}{\varepsilon}} = \frac{E_0}{H_0}$ | Ohms. Free space $\eta_0 = 120\pi = 377\ \Omega$; with $\mu_r=1$, $\eta = \eta_0/\sqrt{\varepsilon_r}$. |
| Magnetic field from E | $\mathbf{H} = \frac{1}{\eta}\,\mathbf{a}_k\times\mathbf{E}$ | $\mathbf{a}_k$ is the unit vector along propagation. For $+\mathbf{a}_z$, $\mathbf{a}_z\times\mathbf{a}_x = \mathbf{a}_y$. |
| TEM conditions | $\mathbf{E}\cdot\mathbf{a}_k = 0,\qquad \mathbf{H}\cdot\mathbf{a}_k = 0$ | Always true for a uniform plane wave in unbounded space; a hollow waveguide supports TE and TM modes instead. |
| Elliptical polarization (general case) | $\mathbf{E} = E_{x0}\cos(\omega t-\beta z)\,\mathbf{a}_x + E_{y0}\cos(\omega t-\beta z+\phi)\,\mathbf{a}_y$ | $\phi = 0$ or $180^\circ$ gives linear; $E_{x0}=E_{y0}$ with $\phi=\pm90^\circ$ gives circular; everything else is elliptical. |

## Worked Problems

### P1. A uniform plane wave in air at $100$ MHz has an electric field amplitude of $10$ V/m directed along $\mathbf{a}_x$ and propagates along $+\mathbf{a}_z$. Find the wavelength, the propagation constant, and the amplitude and direction of the magnetic field.

**Given:** f = 100 MHz = 1e8 Hz; E0 = 10 V/m along a_x; propagation along +a_z; air: eps_r = mu_r = 1

**Solution:**

1. lambda = c/f = (3e8)/(1e8) = 3 m
2. beta = 2 pi/lambda = 2 pi/3 = 2.094 rad/m; check omega sqrt(mu0 eps0) = 2 pi (1e8)/(3e8) = 2.094 rad/m
3. eta0 = 120 pi = 377 ohm
4. H0 = E0/eta0 = 10/377 = 0.02653 A/m = 26.5 mA/m
5. Direction from H = (1/eta) a_k x E with a_k = a_z: a_z x a_x = a_y, so H = 26.5 mA/m along +a_y
6. Check the triad: E x H = a_x x a_y = a_z, the propagation direction, as required

> [!success]- Answer
> **$\lambda = 3$ m; $\beta = 2.09$ rad/m; $H_0 = 26.5$ mA/m along $+\mathbf{a}_y$.**

> [!warning] Trap
> Putting $\mathbf{H}$ parallel to $\mathbf{E}$. The cross product in $\mathbf{H} = (1/\eta)\mathbf{a}_k\times\mathbf{E}$ is not decoration: taking $\mathbf{H} = 26.5\,\mathbf{a}_x$ mA/m gives $\mathbf{E}\times\mathbf{H} = 0$, a wave carrying no power at all.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3E8÷1E8=` → $\lambda$ = **3** m; `2\pi÷Ans=` → $\beta$ = **2.094** rad/m.
> 2. `10÷` `SHIFT` `CVALUE` `37` `=` → $H_0$ = **0.0265** A/m = **26.5** mA/m, with code `37` = $Z_0$.
> 3. Direction: $\mathbf{a}_z\times\mathbf{a}_x=\mathbf{a}_y$, so $\mathbf{H}$ is along $+\mathbf{a}_y$ at **26.5** mA/m.
>
> `SHIFT` `CVALUE` `28` is the exact $c_0=2.9979\times10^{8}$ m/s; $Z_0$ = 376.73 ohm against the 377 shorthand.

### P2. A uniform plane wave propagates in a lossless dielectric with $\varepsilon_r = 4$ and $\mu_r = 1$. Find the phase velocity and the intrinsic impedance, and state the wavelength at $100$ MHz.

**Given:** eps_r = 4; mu_r = 1; f = 100 MHz; eta0 = 377 ohm, c = 3e8 m/s

**Solution:**

1. v_p = c/sqrt(eps_r mu_r) = (3e8)/sqrt(4) = 1.5e8 m/s
2. eta = eta0/sqrt(eps_r mu_r) = 377/2 = 188.5 ohm
3. lambda = v_p/f = (1.5e8)/(1e8) = 1.5 m
4. Cross-check through beta = omega/v_p = 2 pi (1e8)/(1.5e8) = 4.189 rad/m, then lambda = 2 pi/beta = 1.5 m

> [!success]- Answer
> **$v_p = 1.5\times10^{8}$ m/s; $\eta = 188.5\ \Omega$; $\lambda = 1.5$ m.**

> [!warning] Trap
> Dividing by $\varepsilon_r$ instead of $\sqrt{\varepsilon_r}$. Using $v_p = c/4 = 0.75\times10^{8}$ m/s gives a wavelength of 0.75 m instead of 1.5 m, and the same slip in the impedance gives $377/4 = 94.2\ \Omega$ instead of 188.5.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3E8÷√(4×1)=` → $v_p$ = **1.5E8** m/s; `÷1E8=` → $\lambda$ = **1.5** m.
> 2. `377÷√4=` → $\eta$ = **188.5** ohm, exactly $\eta_0/2$.
> 3. The square root is the whole point: `377÷4=` → **94.25** ohm is the trap answer.
>
> `SHIFT` `CVALUE` `37` returns the exact 376.73 ohm, giving 188.4 ohm.

### P3. Determine the polarization of the plane wave $\mathbf{E}(z,t) = 5\cos(\omega t-\beta z)\,\mathbf{a}_x + 5\cos(\omega t-\beta z-90^\circ)\,\mathbf{a}_y$ V/m, and give the magnitude of the field at any instant.

**Given:** Ex0 = Ey0 = 5 V/m; the y component lags the x component by 90 degrees; propagation along +a_z

**Solution:**

1. Rewrite the y component: 5 cos(wt - beta z - 90 deg) = 5 sin(wt - beta z)
2. Evaluate in a fixed plane, beta z = 0: E = 5 cos(wt) a_x + 5 sin(wt) a_y
3. Magnitude = sqrt(25 cos^2 + 25 sin^2) = 5 V/m at every instant, so the tip traces a circle
4. At wt = 0 the field lies along +a_x; at wt = 90 deg it lies along +a_y, so it rotates from a_x toward a_y as time advances — a right-hand rotation about +a_z, since a_x x a_y = a_z

> [!success]- Answer
> **Circularly polarized, rotating from $\mathbf{a}_x$ toward $\mathbf{a}_y$; $\lvert\mathbf{E}\rvert = 5$ V/m at every instant.**

> [!warning] Trap
> Reading equal amplitudes as automatically circular. Equal components *in phase* are linear at $45^\circ$ with amplitude $5\sqrt{2} = 7.07$ V/m; equal components at $90^\circ$ give the constant 5 V/m circle here; unequal amplitudes give an ellipse even when the phase difference is $90^\circ$.

### P4. A uniform plane wave in air must have an electric field amplitude of $377$ V/m. Find the required magnetic field amplitude, and the value it would have if the same $E_0$ appeared in a dielectric with $\varepsilon_r = 4$.

**Given:** E0 = 377 V/m; medium 1: air (eta0 = 377 ohm); medium 2: eps_r = 4, mu_r = 1

**Solution:**

1. Air: eta0 = 120 pi = 377 ohm
2. H0 = E0/eta0 = 377/377 = 1.00 A/m
3. Dielectric: eta = eta0/sqrt(4) = 188.5 ohm
4. H0 = 377/188.5 = 2.00 A/m — the same E needs twice the H because eta halved
5. Shortcut check: H0 scales as sqrt(eps_r), so 1.00 x 2 = 2.00 A/m

> [!success]- Answer
> **$H_0 = 1.00$ A/m in air and $2.00$ A/m in the $\varepsilon_r = 4$ dielectric.**

> [!warning] Trap
> Multiplying by $\eta$ instead of dividing. Taking $H_0 = E_0\eta_0 = 377\times377 = 1.42\times10^{5}$ is dimensionally absurd; since $\eta = E_0/H_0$ carries units of ohms, H must be E divided by eta.

## Traps & Exam Notes

- **Putting $\mathbf{H}$ parallel to $\mathbf{E}$.** For propagation along $+\mathbf{a}_z$ with $\mathbf{E} = E_0\mathbf{a}_x$ the magnetic field must lie along $\mathbf{a}_y$. Choosing $\mathbf{a}_x$ gives $\mathbf{E}\times\mathbf{H} = 0$ and a wave that transports no power.
- **Dividing by $\varepsilon_r$ instead of $\sqrt{\varepsilon_r}$.** $v_p = c/\sqrt{\varepsilon_r}$, so $\varepsilon_r = 4$ gives $1.5\times10^{8}$ m/s and $\lambda = 1.5$ m, not $0.75\times10^{8}$ m/s and 0.75 m. The same square root sits in $\eta = \eta_0/\sqrt{\varepsilon_r}$.
- **Multiplying by $\varepsilon_r$ for the impedance.** $\eta$ falls as the medium gets denser: $\eta = \eta_0/\sqrt{\varepsilon_r} = 188.5\ \Omega$ for $\varepsilon_r = 4$. Using $\eta_0\varepsilon_r = 1508\ \Omega$ makes every $H_0$ four times too small.
- **Assuming the wavelength is fixed at an interface.** The source fixes the frequency only. A 100 MHz wave has $\lambda = 3$ m in air and 1.5 m inside $\varepsilon_r = 4$; keeping 3 m leaves $\beta$ and every phase calculation wrong.
- **Reading equal amplitudes as circular polarization.** Equal $E_x$ and $E_y$ amplitudes with $\phi = 0^\circ$ give *linear* polarization at $45^\circ$ with amplitude $\sqrt{2}E_0$; circular polarization needs a $\pm90^\circ$ phase difference as well.
- **Feeding degrees into $\cos(\omega t-\beta z)$.** Both $\omega t$ and $\beta z$ are in radians. Substituting $\beta z$ in degrees shifts the phase by a factor $180/\pi$ and returns a field value that is wrong even though the formula looks right.

## See Also

- [[18_Maxwell’s_Equations_and_Displacement_Current]]
- [[20_Waves_in_Lossy_Media_and_Skin_Depth]]
- [[22_Intrinsic_Impedance_and_Poynting_Vector]]

---

[[18_Maxwell’s_Equations_and_Displacement_Current|⬅ 18]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[20_Waves_in_Lossy_Media_and_Skin_Depth|20 ➡]]
