---
title: University Physics
part: GEAS
tags: [ece, geas, formula-sheet]
topics: 20
---

## Part A — Mechanics

### 1. Kinematics 1D and 2D

![](https://www.youtube.com/watch?v=aY8z2qO44WA)

*Video: Kinematics Part 3: Projectile Motion — Professor Dave Explains, 7:06*

**Constant-acceleration equations ★** — $v$ in m/s, $a$ in m/s², $t$ in s, $x$ in m.

$$v = v_0 + at,\qquad x = x_0 + v_0t + \tfrac12 at^2,\qquad v^2 = v_0^2 + 2a(x-x_0)$$

$$\bar{v} = \frac{x-x_0}{t} = \frac{v_0+v}{2}\ \text{(constant } a\text{ only)}$$

**Projectile motion** — $g = 9.81$ m/s², $v_0$ in m/s, $\theta$ in rad or °.

$$R = \frac{v_0^2\sin 2\theta}{g},\qquad H = \frac{v_0^2\sin^2\theta}{2g},\qquad T = \frac{2v_0\sin\theta}{g}$$

$$x(t) = v_0\cos\theta\,t,\qquad y(t) = v_0\sin\theta\,t - \tfrac12 gt^2$$

**Variable acceleration and relative motion** — $\vec{v}$ in m/s, $\vec{a}$ in m/s².

$$v = \frac{dx}{dt},\quad a = \frac{dv}{dt} = v\frac{dv}{dx},\qquad \vec{v}_{AB} = \vec{v}_{AC} - \vec{v}_{BC}$$

**Conditions:** constant $a$ for the four kinematic equations; projectile results assume flat ground, no air drag, launch and landing at the same height.

> [!warning] Exam trap
> Maximum range occurs at $\theta = 45°$ **only** when launch and landing heights are equal; complementary angles $\theta$ and $90°-\theta$ give equal range, not equal time of flight.

---

### 2. Newton's Laws, Friction and Circular Motion

![](https://www.youtube.com/watch?v=dMgyy95uJUg)

*Video: Static Friction, Centripetal Force and Circular Motion — The Organic Chemistry Tutor, 14:56*

**Newton's laws ★** — $\vec{F}$ in N, $m$ in kg, $\vec{a}$ in m/s².

$$\sum\vec{F} = m\vec{a},\qquad \vec{F}_{AB} = -\vec{F}_{BA},\qquad \vec{F} = \frac{d\vec{p}}{dt}$$

**Weight, friction and incline** — $g = 9.81$ m/s², $\mu$ dimensionless, $\theta$ = incline angle.

$$W = mg,\qquad f_s \le \mu_s N,\qquad f_k = \mu_k N,\qquad N = mg\cos\theta,\qquad a = g(\sin\theta - \mu_k\cos\theta)$$

**Circular motion ★** — $v$ in m/s, $r$ in m, $\omega$ in rad/s, $T$ in s.

$$a_c = \frac{v^2}{r} = \omega^2 r,\qquad F_c = \frac{mv^2}{r},\qquad v = \frac{2\pi r}{T},\qquad v_{\max} = \sqrt{\mu_s g r}\ \text{(flat curve)}$$

**Banked curve and conical pendulum**

$$\tan\theta = \frac{v^2}{rg}\ \text{(frictionless bank)},\qquad T = 2\pi\sqrt{\frac{L\cos\theta}{g}}$$

**Conditions:** static friction takes any value up to $\mu_sN$; $a_c$ is always directed to the center; $\mu_k < \mu_s$ always, and kinetic friction opposes relative sliding, not motion.

> [!tip] High-yield ★
> On a banked curve with friction, $v_{\max} = \sqrt{rg\,\frac{\tan\theta+\mu_s}{1-\mu_s\tan\theta}}$ and $v_{\min} = \sqrt{rg\,\frac{\tan\theta-\mu_s}{1+\mu_s\tan\theta}}$ — the pair is the full answer, not just $v_{\max}$.

---

### 3. Work, Energy and Conservation

![](https://www.youtube.com/watch?v=LjijcG-IbR4)

*Video: Conservation of Energy: Learn to Solve Any Problem — Question Solutions, 11:56*

**Work and power ★** — $F$ in N, $d$ in m, $W$ in J, $P$ in W.

$$W = Fd\cos\theta = \int \vec{F}\cdot d\vec{r},\qquad P = \frac{W}{t} = \vec{F}\cdot\vec{v}$$

**Kinetic and potential energy** — $m$ in kg, $v$ in m/s, $h$ in m, $k$ in N/m, $x$ in m.

$$K = \tfrac12 mv^2,\qquad U_g = mgh,\qquad U_s = \tfrac12 kx^2,\qquad W_{\text{net}} = \Delta K$$

**Conservation of energy ★**

$$K_1 + U_1 + W_{\text{nc}} = K_2 + U_2,\qquad E_{\text{mech}} = K + U = \text{constant (no non-conservative forces)}$$

**Spring and variable force work**

$$W_s = \tfrac12 k(x_2^2 - x_1^2),\qquad F_s = -kx,\qquad P_{\text{avg}} = \frac{\Delta W}{\Delta t}$$

**Conditions:** $U_g = mgh$ holds near Earth's surface where $g$ is constant; the mechanical-energy conservation statement excludes friction, drag and applied non-conservative work.

> [!warning] Exam trap
> Work can be negative (friction) while energy stays positive. The sign in $W = Fd\cos\theta$ comes from the angle, not from the motion direction.

---

### 4. Momentum and Collisions

![](https://www.youtube.com/watch?v=M2xnGcaaAi4)

*Video: Elastic and Inelastic Collisions — Professor Dave Explains, 5:14*

**Impulse–momentum ★** — $\vec{p}$ in kg·m/s, $\vec{J}$ in N·s, $\vec{F}$ in N, $t$ in s.

$$\vec{p} = m\vec{v},\qquad \vec{J} = \int\vec{F}\,dt = \Delta\vec{p},\qquad \sum\vec{p}_{\text{before}} = \sum\vec{p}_{\text{after}}$$

**Collision types** — $e$ = coefficient of restitution (dimensionless, $0\le e\le1$).

$$e = \frac{v_2'-v_1'}{v_1-v_2},\qquad e = 1\ \text{elastic},\quad e = 0\ \text{perfectly inelastic}$$

**Elastic and inelastic results**

$$v_1' = \frac{m_1-m_2}{m_1+m_2}v_1,\qquad v_2' = \frac{2m_1}{m_1+m_2}v_1\ \text{(target at rest, elastic)}$$

$$v' = \frac{m_1v_1+m_2v_2}{m_1+m_2}\ \text{(perfectly inelastic)},\qquad K_{\text{lost}} = \tfrac12\frac{m_1m_2}{m_1+m_2}(v_1-v_2)^2(1-e^2)$$

**Center of mass and rocket**

$$\vec{r}_{\text{cm}} = \frac{\sum m_i\vec{r}_i}{\sum m_i},\qquad F_{\text{thrust}} = v_{\text{ex}}\frac{dm}{dt}$$

**Conditions:** momentum is conserved when net external force is zero (gravity is negligible during short collisions); elastic collisions conserve both $p$ and $K$.

> [!tip] High-yield ★
> Equal masses in a head-on elastic collision simply **swap velocities**. Use this before grinding through the general formulas.

---

### 5. Rotational Kinematics and Torque

![](https://www.youtube.com/watch?v=WQ9AH2S8B6Y)

*Video: Rotational Motion: Angular Velocity and Tangential Acceleration — The Organic Chemistry Tutor, 11:28*

**Angular kinematics ★** — $\theta$ in rad, $\omega$ in rad/s, $\alpha$ in rad/s², $t$ in s.

$$\omega = \omega_0 + \alpha t,\qquad \theta = \omega_0 t + \tfrac12\alpha t^2,\qquad \omega^2 = \omega_0^2 + 2\alpha\theta$$

$$v = r\omega,\qquad a_t = r\alpha,\qquad a_c = r\omega^2$$

**Torque and rotational Newton's law** — $\tau$ in N·m, $I$ in kg·m².

$$\tau = rF\sin\theta = I\alpha,\qquad I = \sum m_ir_i^2 = \int r^2\,dm$$

**Rotational kinetic energy and work** — $K_{\text{rot}}$ in J.

$$K_{\text{rot}} = \tfrac12 I\omega^2,\qquad W = \tau\theta,\qquad P = \tau\omega$$

**Common moments of inertia**

| Body (axis through center) | $I$ |
|---|---|
| Point mass at $r$ | $mr^2$ |
| Rod, center, length $L$ | $\frac{1}{12}mL^2$ |
| Rod, end | $\frac13 mL^2$ |
| Solid cylinder / disk | $\frac12 mR^2$ |
| Hoop / thin ring | $mR^2$ |
| Solid sphere | $\frac25 mR^2$ |
| Hollow sphere | $\frac23 mR^2$ |

**Conditions:** rigid body, fixed axis; $\theta$ in radian measure for every $s = r\theta$ conversion; use the parallel-axis theorem $I = I_{\text{cm}} + md^2$ for off-center axes.

> [!warning] Exam trap
> Torque is zero when the force line passes through the pivot ($\theta = 0$ or $180°$) — a force applied at the pivot contributes nothing, no matter how large it is.

---

### 6. Angular Momentum and Rigid Bodies

![](https://www.youtube.com/watch?v=WzjIMuf-yuo)

*Video: Angular Momentum, Torque, Inertia and Conservation — The Organic Chemistry Tutor, 6:20*

**Angular momentum ★** — $L$ in kg·m²/s, $\vec{r}$ in m, $\vec{p}$ in kg·m/s.

$$\vec{L} = \vec{r}\times\vec{p} = I\vec{\omega},\qquad \tau = \frac{dL}{dt},\qquad L = \text{constant if } \sum\tau_{\text{ext}} = 0$$

**Conservation and collisions**

$$I_1\omega_1 = I_2\omega_2,\qquad K_{\text{rot}} = \frac{L^2}{2I},\qquad \Delta K = \tfrac12 L^2\!\left(\frac{1}{I_2}-\frac{1}{I_1}\right)$$

**Rolling without slipping** — $v_{\text{cm}}$ in m/s, $R$ in m, $\omega$ in rad/s.

$$v_{\text{cm}} = R\omega,\qquad K_{\text{total}} = \tfrac12 mv_{\text{cm}}^2 + \tfrac12 I_{\text{cm}}\omega^2$$

$$K_{\text{total}} = \tfrac12 mv_{\text{cm}}^2\!\left(1+\frac{I_{\text{cm}}}{mR^2}\right)$$

$$a = \frac{g\sin\theta}{1+\frac{I_{\text{cm}}}{mR^2}}\ \text{(rolling down an incline)}$$

**Rolling order down an incline (fastest first):** solid sphere → solid cylinder → hollow sphere → hoop, because the $\frac{I}{mR^2}$ ratio rises 0.4 → 0.5 → 0.67 → 1.0.
**Conditions:** fixed or moving principal axis for $L = I\omega$; rolling results require static friction with no slipping and no energy loss.

> [!tip] High-yield ★
> The skater problem is pure conservation: arms pulled in lowers $I$, so $\omega$ rises and $K_{\text{rot}}$ **increases** — the extra energy comes from the work done pulling the arms inward.

---

## Part B — Fluids and Thermal Physics

### 7. Fluid Statics: Pascal and Archimedes

![](https://www.youtube.com/watch?v=16HDJNoXQII)

*Video: Fluids, Buoyancy and Archimedes' Principle — Professor Dave Explains, 4:16*

**Pressure and Pascal's principle ★** — $P$ in Pa (N/m²), $\rho$ in kg/m³, $h$ in m, $g = 9.81$ m/s².

$$P = \frac{F}{A},\qquad P = P_0 + \rho gh,\qquad \frac{F_1}{A_1} = \frac{F_2}{A_2}\ \text{(hydraulic press)}$$

**Archimedes' principle ★** — $V_d$ = displaced volume in m³, buoyant force $F_b$ in N.

$$F_b = \rho_{\text{fluid}}gV_d,\qquad \%\text{submerged} = \frac{\rho_{\text{body}}}{\rho_{\text{fluid}}}\times100$$

**Gauge, absolute and manometer**

$$P_{\text{abs}} = P_{\text{gauge}} + P_{\text{atm}},\qquad P_{\text{gauge}} = \rho gh,\qquad P_{\text{atm}} = 101.325\ \text{kPa} = 760\ \text{mmHg}$$

**Floating condition:** $F_b = W \Rightarrow \rho_f V_d = \rho_b V_b$; apparent weight $= W - F_b = \rho_bV_bg - \rho_fV_dg$.
**Conditions:** incompressible fluid at rest, uniform density; $P = \rho gh$ is gauge pressure only, and $P_{\text{atm}}$ adds unless the problem states otherwise.

> [!warning] Exam trap
> Hydraulic press multiplies **force** by the area ratio and divides **distance** by the same ratio. $F_1d_1 = F_2d_2$ — energy is conserved, force is not created.

---

### 8. Fluid Dynamics: Continuity and Bernoulli

![](https://www.youtube.com/watch?v=DW4rItB20h4)

*Video: Understanding Bernoulli's Equation — The Efficient Engineer, 13:44*

**Continuity equation ★** — $A$ in m², $v$ in m/s, $Q$ in m³/s.

$$A_1v_1 = A_2v_2,\qquad Q = Av = \frac{\Delta V}{\Delta t}\ \text{(m}^3\text{/s)}$$

**Bernoulli's equation ★** — $P$ in Pa, $\rho$ in kg/m³, $v$ in m/s, $h$ in m.

$$P_1 + \tfrac12\rho v_1^2 + \rho gy_1 = P_2 + \tfrac12\rho v_2^2 + \rho gy_2$$

$$v = \sqrt{2g(h_1-h_2)}\ \text{(Torricelli)},\qquad P + \tfrac12\rho v^2 = \text{constant (horizontal pipe)}$$

**Viscous flow and Reynolds number**

$$Q = \frac{\pi r^4\Delta P}{8\eta L}\ \text{(Poiseuille)},\qquad Re = \frac{\rho vD}{\eta}\ \text{(dimensionless)}$$

$Re < 2000$ laminar, $2000 < Re < 4000$ transitional, $Re > 4000$ turbulent; $\eta$ in Pa·s.

**Terminal velocity ★** — $m$ in kg, $g = 9.81$ m/s², $\rho$ = fluid density in kg/m³, $C_d$ = drag coefficient (dimensionless), $A$ in m².

$$v_t = \sqrt{\frac{2mg}{\rho C_dA}}$$

Reached when drag balances weight, so the net acceleration is zero and the speed is constant.

**Conditions:** steady, incompressible, non-viscous, irrotational flow along a streamline for Bernoulli; Poiseuille requires laminar flow in a uniform circular pipe; terminal velocity assumes constant $\rho$, $C_d$ and $A$, with buoyancy neglected.

> [!tip] High-yield ★
> Faster flow ⇒ lower pressure. In a Venturi meter, $v_2 = A_1\sqrt{\frac{2\Delta P}{\rho(A_1^2-A_2^2)}}$ — the throat reads a lower pressure, which is why the manometer fluid rises there.

---

### 9. Thermal Expansion and Calorimetry

![](https://www.youtube.com/watch?v=yhNHJ7WdT8A)

*Video: Heat Capacity, Specific Heat and Calorimetry — Professor Dave Explains, 4:14*

**Thermal expansion ★** — $\alpha$ in K⁻¹, $L$ in m, $A$ in m², $V$ in m³, $\Delta T$ in K.

$$\Delta L = \alpha L_0\Delta T,\qquad \Delta A = 2\alpha A_0\Delta T,\qquad \Delta V = \beta V_0\Delta T,\quad \beta \approx 3\alpha$$

**Heat and specific heat** — $Q$ in J, $c$ in J/(kg·K), $C$ in J/K, $L_f, L_v$ in J/kg.

$$Q = mc\Delta T = C\Delta T,\qquad Q = mL_f\ \text{(fusion)},\qquad Q = mL_v\ \text{(vaporization)}$$

**Calorimetry and gas laws ★**

$$\sum Q = 0 \Rightarrow m_1c_1(T_f-T_1) + m_2c_2(T_f-T_2) = 0,\qquad \frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}$$

**Water constants:** $c = 4186$ J/(kg·K), $L_f = 3.34\times10^5$ J/kg, $L_v = 2.26\times10^6$ J/kg.
**Conditions:** $\beta = 3\alpha$ for isotropic solids; calorimetry assumes an insulated system losing no heat to the surroundings, and $T$ in Kelvin for every gas-law ratio.

> [!warning] Exam trap
> Ice problems need **three** heat terms: warming the ice to 0 °C, melting it, then warming the melt water. Dropping the latent-heat term is the classic lost point.

---

### 10. Heat Transfer

![](https://www.youtube.com/watch?v=bRZwzy0xvhM)

*Video: Heat Transfer: Conduction, Convection and Radiation — The Organic Chemistry Tutor, 11:09*

**Conduction ★** — $k$ in W/(m·K), $A$ in m², $L$ in m, $\Delta T$ in K.

$$H = \frac{dQ}{dt} = \frac{kA\Delta T}{L} = \frac{\Delta T}{R},\qquad R = \frac{L}{kA}\ \text{(K/W)}$$

**Series and parallel thermal resistance**

$$R_{\text{series}} = R_1+R_2+\cdots,\qquad \frac{1}{R_{\text{parallel}}} = \frac1{R_1}+\frac1{R_2}+\cdots$$

**Radiation (Stefan–Boltzmann) ★** — $\sigma = 5.67\times10^{-8}$ W/(m²·K⁴), $e$ = emissivity (dimensionless), $T$ in K.

$$P = e\sigma A T^4,\qquad P_{\text{net}} = e\sigma A\!\left(T^4 - T_{\text{surr}}^4\right)$$

**Convection and Newton's law of cooling**

$$H = hA\Delta T,\qquad \frac{dT}{dt} = -k(T - T_{\text{env}}) \Rightarrow T(t) = T_{\text{env}} + (T_0-T_{\text{env}})e^{-kt}$$

$h$ in W/(m²·K); a matte black surface has $e\approx1$, a polished reflector $e\approx0.05$.
**Conditions:** conduction needs a steady state and constant $k$; radiation law requires the body to be a grey body with the surroundings as an enclosure; $T$ must be absolute (K).

> [!tip] High-yield ★
> Doubling the absolute temperature multiplies radiated power by $2^4 = 16$. Thermal questions love that fourth power — and it never applies to the Celsius value.

---

### 11. First Law and Processes

![](https://www.youtube.com/watch?v=O7HwhkYt6YU)

*Video: The First Law of Thermodynamics: Internal Energy, Heat and Work — Professor Dave Explains, 5:44*

**First law of thermodynamics ★** — $Q,\Delta U,W$ in J; sign convention: $Q$ in positive, $W$ out positive.

$$\Delta U = Q - W,\qquad W = \int P\,dV,\qquad \Delta U = nC_V\Delta T$$

**Ideal gas relations** — $n$ in mol, $R = 8.314$ J/(mol·K), $T$ in K.

$$PV = nRT,\qquad C_P - C_V = R,\qquad \gamma = \frac{C_P}{C_V},\quad U = \tfrac32 nRT\ \text{(monatomic)}$$

**Process table ★**

| Process | Condition | $W$ | $Q$ | $\Delta U$ |
|---|---|---|---|---|
| Isothermal | $T$ const | $nRT\ln\frac{V_2}{V_1}$ | $=W$ | 0 |
| Isobaric | $P$ const | $P\Delta V$ | $nC_P\Delta T$ | $nC_V\Delta T$ |
| Isochoric | $V$ const | 0 | $nC_V\Delta T$ | $=Q$ |
| Adiabatic | $Q=0$ | $\frac{P_1V_1-P_2V_2}{\gamma-1}$ | 0 | $=-W$ |

**Adiabatic relations:** $PV^\gamma = \text{constant}$, $TV^{\gamma-1} = \text{constant}$, $P^{1-\gamma}T^\gamma = \text{constant}$.
**Conditions:** closed system of an ideal gas; adiabatic equations require a reversible, quasi-static process with constant $\gamma$ ($\gamma = 1.67$ monatomic, 1.40 diatomic).

> [!warning] Exam trap
> Free expansion into a vacuum has $W = 0$, $Q = 0$ and $\Delta U = 0$ but is **irreversible** — the adiabatic $PV^\gamma$ relation does not apply to it.

---

### 12. Second Law, Entropy and Carnot

![](https://www.youtube.com/watch?v=0wn0R9qWbiQ)

*Video: The Carnot Cycle Animated — Question Solutions, 11:52*

**Entropy ★** — $S$ in J/K, $T$ in K, $Q$ in J.

$$\Delta S = \int\frac{dQ_{\text{rev}}}{T},\qquad \Delta S_{\text{universe}} \ge 0,\qquad \Delta S = nR\ln\frac{V_2}{V_1}\ \text{(isothermal)}$$

**Heat engines and efficiency** — $W$ in J, $Q_H,Q_C$ in J, $\eta$ dimensionless.

$$\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H} = \frac{T_H-T_C}{T_H}\ \text{(Carnot)} \qquad COP_{\text{ref}} = \frac{Q_C}{W}$$

**Carnot and Kelvin statement:** $T$ in K; no engine between two reservoirs can exceed the Carnot efficiency.

$$\eta_{\text{Carnot}} = 1-\frac{T_C}{T_H},\qquad COP_{\text{HP}} = \frac{Q_H}{W} = COP_{\text{ref}}+1,\qquad \eta_{\text{actual}} \le \eta_{\text{Carnot}}$$

**Entropy change for common processes:** isochoric $\Delta S = nC_V\ln(T_2/T_1)$; isobaric $\Delta S = nC_P\ln(T_2/T_1)$; fusion/vaporization $\Delta S = \frac{mL}{T}$.
**Conditions:** entropy integrals require a **reversible** path even when the actual process is irreversible; all temperatures absolute.

> [!tip] High-yield ★
> 100% efficiency needs $T_C = 0$ K. If a question offers $\eta = 1$, it is a trap — check whether the given $T$ values are Celsius and must first be converted to Kelvin.

---

## Part C — Waves and Optics

### 13. SHM and Waves

![](https://www.youtube.com/watch?v=gZ_KnZHCn4M)

*Video: Simple Harmonic Motion: Hooke's Law — Professor Dave Explains, 4:49*

**Simple harmonic motion ★** — $x$ in m, $A$ in m, $\omega$ in rad/s, $t$ in s, $\phi$ in rad.

$$x = A\cos(\omega t+\phi),\qquad v = -A\omega\sin(\omega t+\phi),\qquad a = -\omega^2x$$

$$\omega = 2\pi f = \frac{2\pi}{T},\qquad v_{\max} = A\omega,\qquad a_{\max} = A\omega^2,\qquad E = \tfrac12 kA^2$$

**Oscillator periods** — $k$ in N/m, $m$ in kg, $L$ in m, $g = 9.81$ m/s².

$$T_{\text{spring}} = 2\pi\sqrt{\frac{m}{k}},\qquad T_{\text{pendulum}} = 2\pi\sqrt{\frac{L}{g}}$$

**Wave relations ★** — $\lambda$ in m, $f$ in Hz, $v$ in m/s, $\mu$ in kg/m, $T_{\text{tension}}$ in N.

$$v = f\lambda = \frac{\omega}{k},\qquad v_{\text{string}} = \sqrt{\frac{T_{\text{tension}}}{\mu}},\qquad y = A\sin(kx-\omega t)$$

**Symbols**

- $k$ — angular wavenumber, $k = 2\pi/\lambda$, in rad/m

**Interference:** path difference $\Delta = m\lambda$ constructive, $\Delta = (m+\tfrac12)\lambda$ destructive.

**Symbols**

- $\Delta$ — path difference between the two interfering waves, in m
- $m$ — interference order (integer, dimensionless)

**Standing waves** — $n = 1,2,3,\ldots$ and $L$ = length in m:

$$f_n = \frac{nv}{2L}\ \text{(string both ends fixed; pipe open both ends)},\qquad f_n = \frac{(2n-1)v}{4L}\ \text{(pipe closed at one end)}$$

**Damped harmonic oscillator ★** — $m$ in kg, $b$ in N·s/m, $k$ in N/m, $\zeta$ dimensionless, $\omega_n,\omega_d$ in rad/s.

$$m\ddot x + b\dot x + kx = 0,\qquad \zeta = \frac{b}{2\sqrt{km}},\qquad \omega_n = \sqrt{\frac{k}{m}},\qquad \omega_d = \omega_n\sqrt{1-\zeta^2}$$

$$A(t) = A_0e^{-\zeta\omega_nt}\ \text{(envelope)}$$

| Case | $\zeta$ | Behavior |
|---|---|---|
| Undamped | $0$ | constant-amplitude oscillation at $\omega_n$ |
| Underdamped | $0<\zeta<1$ | decaying oscillation at $\omega_d$ |
| Critically damped | $1$ | fastest return with no oscillation |
| Overdamped | $>1$ | slow return, no oscillation |

**Conditions:** small-angle pendulum ($\theta < 15°$, $\sin\theta\approx\theta$); ideal string with negligible stiffness; $v_{\text{string}}$ assumes uniform linear density; the damped model is linear viscous damping, and $\omega_d$ is defined only for $0 \le \zeta < 1$.

> [!warning] Exam trap
> Period of a pendulum is independent of mass; period of a spring oscillator is independent of $g$. Mixing those two is the standard SHM distractor.

---

### 14. Sound and Doppler

![](https://www.youtube.com/watch?v=msjRsmnKjuU)

*Video: Doppler Effect for Sound Waves — Andrey K, 9:41*

**Sound intensity and level ★** — $I$ in W/m², $I_0 = 10^{-12}$ W/m², $\beta$ in dB.

$$\beta = 10\log_{10}\frac{I}{I_0}\ \text{(dB)},\qquad I = \frac{P}{4\pi r^2}\ \text{(point source)},\qquad I \propto \frac{1}{r^2}$$

$$\beta_2-\beta_1 = 10\log\frac{I_2}{I_1},\qquad \text{doubling }I \Rightarrow +3\ \text{dB},\qquad 10\times I \Rightarrow +10\ \text{dB}$$

**Doppler effect ★** — $v$ in m/s, $v_s$ = source speed, $v_o$ = observer speed.

$$f' = f\left(\frac{v \pm v_o}{v \mp v_s}\right),\qquad v_{\text{sound}} \approx 343\ \text{m/s at }20\ ^\circ\text{C}$$

**Approach/Recession signs:** observer moving toward source $+v_o$; source moving toward observer $-v_s$; top signs = approaching, bottom = receding.
**Beats and Mach:** $f_{\text{beat}} = \lvert f_1-f_2\rvert$; Mach number $M = v_s/v$; shock cone $\sin\theta = \frac{1}{M}$.
**Conditions:** Doppler formula holds for a stationary medium with $v_o,v_s < v$; intensity inverse-square assumes a free field with no absorption or reflection.

> [!tip] High-yield ★
> 85 dB is the common hearing-damage action level; a jump of 20 dB means $I$ rose 100×, and a source at twice the distance is 6 dB quieter.

---

### 15. Reflection and Refraction

![](https://www.youtube.com/watch?v=ON1QGqB6vxg)

*Video: Refraction of Light — The Organic Chemistry Tutor, 11:10*

**Reflection ★** — angles in rad or °, measured from the normal.

$$\theta_i = \theta_r,\qquad f = \frac{R}{2}\ \text{(spherical mirror)},\qquad \frac{1}{f} = \frac{1}{d_o}+\frac{1}{d_i}$$

$$m = -\frac{d_i}{d_o} = \frac{h_i}{h_o},\qquad \text{concave } f>0,\quad \text{convex } f<0$$

**Refraction and Snell's law ★** — $n$ = refractive index (dimensionless, $n = c/v$).

$$n_1\sin\theta_1 = n_2\sin\theta_2,\qquad v = \frac{c}{n},\qquad \lambda_n = \frac{\lambda_0}{n}$$

**Total internal reflection and dispersion**

$$\theta_c = \sin^{-1}\!\left(\frac{n_2}{n_1}\right),\ n_1 > n_2,\qquad \Delta = (n_{\text{violet}}-n_{\text{red}})A\ \text{(prism)}$$

**Symbols**

- $\Delta$ — angular dispersion (angle between the violet and red rays), in rad
- $A$ — prism apex angle, in rad

**Indices:** air 1.000, water 1.333, crown glass 1.52, diamond 2.42.
**Conditions:** Snell's law requires a flat interface between isotropic media; total internal reflection requires travel from the denser to the rarer medium with $\theta_1 > \theta_c$.

> [!warning] Exam trap
> In mirror/lens sign conventions, a **positive** magnification means an upright image (virtual for a single lens), a negative one means inverted. The minus sign in $m = -d_i/d_o$ is the whole convention.

---

### 16. Lenses and Mirrors

![](https://www.youtube.com/watch?v=7GV1UZSTNJg)

*Video: Thin Lens Equation and Problem Solving — Khan Academy Medicine, 12:56*

**Thin-lens and mirror equation ★** — $f,d_o,d_i$ in m (or cm, consistently); $R$ = radius of curvature.

$$\frac{1}{f} = \frac{1}{d_o}+\frac{1}{d_i},\qquad \frac{1}{f} = (n-1)\!\left(\frac{1}{R_1}-\frac{1}{R_2}\right)\ \text{(lensmaker)}$$

$$m = -\frac{d_i}{d_o},\qquad P = \frac{1}{f\ \text{(m)}}\ \text{(diopters, D)}$$

**Sign conventions**

| Quantity | Positive | Negative |
|---|---|---|
| $f$ (lens) | converging | diverging |
| $f$ (mirror) | concave | convex |
| $d_o$ | real object | virtual object |
| $d_i$ | real image (same side as outgoing) | virtual image |
| $m$ | upright | inverted |

**Two-lens and magnification chains:** $d_{o2} = s - d_{i1}$, $m_{\text{total}} = m_1m_2$, $P_{\text{total}} = P_1+P_2$ (thin lenses in contact).

**Symbols**

- $s$ — separation between the two lenses, in m

**Conditions:** paraxial rays only (small angles, near the optical axis); lensmaker's equation assumes a thin lens in air with $n$ relative to the surroundings.

> [!tip] High-yield ★
> Object at $2f$ ⇒ image at $2f$, same size, inverted. Object inside $f$ ⇒ virtual, upright, enlarged ($m>1$) — the magnifier case, always a board favorite.

---

## Part D — Electricity, Magnetism and Nuclear Physics

### 17. Electrostatics

![](https://www.youtube.com/watch?v=VFbyDCG_j18)

*Video: Electric Charge and Electric Fields — Professor Dave Explains, 6:41*

**Coulomb's law ★** — $F$ in N, $q$ in C, $r$ in m, $k = 8.99\times10^9$ N·m²/C².

$$F = \frac{kq_1q_2}{r^2} = \frac{q_1q_2}{4\pi\varepsilon_0r^2},\qquad \varepsilon_0 = 8.854\times10^{-12}\ \text{F/m}$$

**Electric field ★** — $E$ in N/C, identical to V/m; $q_0$ = positive test charge in C.

$$E = \frac{F}{q_0}\ (\text{N/C} \equiv \text{V/m}),\qquad E = \frac{kq}{r^2}\ \text{(point charge)}$$

**Capacitance ★** — $C$ in F, $A$ in m², $d$ in m, $\varepsilon_r$ dimensionless.

$$C = \frac{\varepsilon_r\varepsilon_0A}{d},\qquad \frac1{C_{eq}} = \sum_i\frac1{C_i}\ \text{(series)},\qquad C_{eq} = \sum_iC_i\ \text{(parallel)}$$

**Stored energy**

$$U = \tfrac12CV^2 = \frac{Q^2}{2C} = \tfrac12QV\ \text{(J)}$$

**Symbols**

- $Q$ — charge stored on the capacitor, in C
- $V$ — potential difference across the capacitor, in V

**Conditions:** point charges at rest in vacuum or air; series capacitors carry the same charge and parallel capacitors share the same voltage; the parallel-plate result assumes a uniform field with no fringing.

---

### 18. AC Circuits

**Impedance ★** — $Z,R,X$ in Ω, $\omega = 2\pi f$ in rad/s, $L$ in H, $C$ in F.

$$Z = \sqrt{R^2+(X_L-X_C)^2},\qquad X_L = \omega L,\qquad X_C = \frac1{\omega C}$$

**Series resonance ★**

$$X_L = X_C \Rightarrow f_0 = \frac1{2\pi\sqrt{LC}},\qquad Z = R\ \text{(minimum)},\quad \text{voltage and current in phase}$$

**Power factor and transformers**

$$P = VI\cos\theta,\qquad \cos\theta = \frac{R}{Z},\qquad \frac{V_s}{V_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}$$

**Symbols**

- $\theta$ — power-factor angle (phase angle between voltage and current), in rad

**Inductor continuity:** the current through an inductor cannot jump, so $i(0^+) = i(0^-)$.
**Conditions:** $V$ and $I$ are rms values (or consistent peak values); ideal components and an ideal transformer (no loss, no leakage, infinite $\mu_r$); resonance results assume a series RLC loop driven at steady state.

---

### 19. Magnetism

![](https://www.youtube.com/watch?v=7MBawzone30)

*Video: Magnetic Force on a Moving Charge — The Organic Chemistry Tutor, 12:21*

**Magnetic force ★** — $F$ in N, $q$ in C, $v$ in m/s, $B$ in T, $I$ in A, $L$ in m; $\theta$ measured between $\vec{v}$ (or $\vec{L}$) and $\vec{B}$.

$$F = qvB\sin\theta,\qquad F = ILB\sin\theta$$

**Field of a long straight wire ★** — $r$ in m, $\mu_0 = 4\pi\times10^{-7}$ T·m/A.

$$B = \frac{\mu_0I}{2\pi r}\ \text{(T)}$$

**Rules:** right-hand grip rule — thumb along the current, fingers curl with $\vec{B}$; outside a magnet the field lines run N → S.
**Faraday and Lenz ★** — $\Phi$ = magnetic flux in Wb, $N$ = turns, $E$ in V.

$$\lvert E\rvert = N\frac{d\Phi}{dt}\ \text{(V)}$$

Lenz's law: the induced effect always opposes the change in flux that produced it.
**Force between parallel currents:** currents in the same direction attract; opposite directions repel.
**Conditions:** the $\sin\theta$ force vanishes for a charge or wire parallel to $\vec{B}$; Faraday's law needs a changing flux linkage, and Lenz's law fixes only the sign of the induced effect, not its magnitude.

---

### 20. Nuclear Physics

![](https://www.youtube.com/watch?v=cPRFF-eCGT8)

*Video: Alpha, Beta and Gamma Decay — The Organic Chemistry Tutor, 10:25*

**Radioactive decay ★** — $N$ = number of nuclei, $\lambda$ in s⁻¹, $T_{1/2}$ and $t$ in s.

$$N = N_0\left(\frac12\right)^{t/T_{1/2}} = N_0e^{-\lambda t},\qquad \lambda = \frac{\ln 2}{T_{1/2}},\qquad A = \lambda N\ \text{(Bq)}$$

**Decay modes ★**

| Mode | $\Delta A$ | $\Delta Z$ | Emitted |
|---|---|---|---|
| Alpha | $-4$ | $-2$ | helium nucleus (${}^4_2\text{He}$) |
| Beta-minus | $0$ | $+1$ | electron (neutron → proton + electron) |
| Beta-plus / positron | $0$ | $-1$ | positron |
| Gamma | $0$ | $0$ | photon |

**Mass defect and binding energy ★** — $\Delta m$ = mass defect in kg, $c = 3.00\times10^8$ m/s, $\Delta E$ in J.

$$\Delta E = \Delta m\,c^2,\qquad 1\ \text{u} \equiv 931.5\ \text{MeV}$$

**Fission:** a moderator slows the fission neutrons, and a chain reaction needs the assembly to exceed the critical mass.
**Conditions:** the decay law assumes many independent nuclei and a constant $\lambda$; the binding-energy conversion uses the mass defect, with 1 u ≡ 931.5 MeV of energy equivalent.

→ Back to [[00_Index]]
