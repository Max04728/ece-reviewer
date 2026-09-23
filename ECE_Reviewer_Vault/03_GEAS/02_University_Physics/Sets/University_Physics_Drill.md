---
title: "University Physics — Drill"
type: drill
area: 02_University_Physics
part: 03_GEAS
seed: 1
count: 8
pool: 88
updated: 2026-09-23
---

# University Physics — Practice Drill

**8 problems** drawn from a pool of 88 across 16 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 02_University_Physics --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. Water flows at $Q = 0.50\ \mathrm{m^3/s}$ down a penstock and falls $40\ \mathrm{m}$ to a turbine. Find the ideal power available at the turbine, and the realistic output at 90% efficiency.

**Given:** Q = 0.50 m^3/s; h = 40 m; rho = 1000 kg/m^3; g = 9.81 m/s^2; efficiency = 90%

> [!success]- Answer
> **$P_{ideal} = 196\ \mathrm{kW}$; realistic output $= 177\ \mathrm{kW}$ (about $237\ \mathrm{hp}$).**

> [!warning] Trap
> Using $P = \frac{1}{2}\rho v^2$ and forgetting the flow rate, which leaves the answer in watts per cubic metre. Hydraulic power is a rate: energy per unit volume ($\rho gh$) times volume per unit time ($Q$).

<sub>from GEAS-02-08</sub>

### 2. A copper plate of area $0.500\ \mathrm{m^2}$ and thickness $2.00\ \mathrm{cm}$ is held with a $60.0\ ^\circ\mathrm{C}$ temperature difference across it. With $k_{Cu} = 401\ \mathrm{W/(m\cdot K)}$, find the rate of heat conduction.

**Given:** $A = 0.500\ \mathrm{m^2}$; $L = 2.00\ \mathrm{cm}$; $\Delta T = 60.0\ ^\circ\mathrm{C}$; $k = 401\ \mathrm{W/(m\cdot K)}$

> [!success]- Answer
> **$H = 6.02\times10^{5}\ \mathrm{W}$ ($602\ \mathrm{kW}$).**

> [!warning] Trap
> Substituting $L = 2.00$ instead of $0.0200\ \mathrm{m}$. A centimetre thickness left unconverted inflates the heat rate by a factor of 100, turning 602 kW into 60.2 MW.

<sub>from GEAS-02-10</sub>

### 3. A $20\ \mathrm{kg}$ crate on a horizontal floor is pulled by a rope that makes $30^\circ$ with the horizontal with tension $100\ \mathrm{N}$. The coefficient of kinetic friction is $0.20$. Find the normal force and the crate's acceleration.

**Given:** m = 20 kg; T = 100 N at 30 deg above horizontal; mu_k = 0.20; g = 9.81 m/s^2

> [!success]- Answer
> **$N = 146\ \mathrm{N}$; $a = 2.87\ \mathrm{m/s^2}$.**

> [!warning] Trap
> Setting $N = mg = 196.2\ \mathrm{N}$. That inflates friction to 39.2 N and drops the acceleration to $2.37\ \mathrm{m/s^2}$; worse, if the rope angle is steep enough that $T\sin\theta > mg$ the crate leaves the floor and friction vanishes entirely.

<sub>from GEAS-02-02</sub>

### 4. A diverging lens has a focal length of $-20.0\ \mathrm{cm}$ and an object is placed $30.0\ \mathrm{cm}$ in front of it. Find the image distance, the magnification, and describe the image.

**Given:** $f = -20.0\ \mathrm{cm}$; $d_o = 30.0\ \mathrm{cm}$

> [!success]- Answer
> **$d_i = -12.0\ \mathrm{cm}$ and $M = +0.400$: a virtual, upright image $40\%$ of the object's size.**

> [!warning] Trap
> Reporting the image as real because $30\ \mathrm{cm}$ is outside the focal length. For a *diverging* element the image is virtual for every object position; 'outside $f$' is a real-image rule only for converging mirrors and lenses.

<sub>from GEAS-02-16</sub>

### 5. A $0.16\ \mathrm{kg}$ billiard ball moving at $3.0\ \mathrm{m/s}$ strikes an identical stationary ball head-on in a perfectly elastic collision. Find both final velocities.

**Given:** m_1 = m_2 = 0.16 kg; v_1 = 3.0 m/s; v_2 = 0; elastic collision

> [!success]- Answer
> **Cue ball stops ($v_1' = 0$); struck ball moves off at $3.0\ \mathrm{m/s}$.**

> [!warning] Trap
> Applying the perfectly inelastic formula $v' = \frac{m_1v_1}{m_1+m_2} = 1.5\ \mathrm{m/s}$ to a head-on billiard shot. Equal-mass elastic collisions transfer *all* the velocity; the sticking result loses half the KE and is the wrong model here.

<sub>from GEAS-02-04</sub>

### 6. Light in air strikes a flat glass surface ($n = 1.50$) at an angle of incidence of $60.0^\circ$. Find the angle of refraction and the angle of reflection.

**Given:** $n_1 = 1.00$, $n_2 = 1.50$; $\theta_1 = 60.0^\circ$

> [!success]- Answer
> **$\theta_2 = 35.3^\circ$ into the glass, $\theta_r = 60.0^\circ$ for the reflected ray.**

> [!warning] Trap
> Measuring both angles from the surface instead of the normal, so that $60^\circ$ becomes $30^\circ$ and the answer changes completely. Also wrong: predicting the refracted ray bends *away* from the normal on entering a denser medium.

<sub>from GEAS-02-15</sub>

### 7. Two tuning forks of frequency $440\ \mathrm{Hz}$ and $444\ \mathrm{Hz}$ are struck together. How many beats per second are heard, and what happens to the beat rate if a small piece of tape slows the $444\ \mathrm{Hz}$ fork?

**Given:** $f_1 = 440\ \mathrm{Hz}$; $f_2 = 444\ \mathrm{Hz}$

> [!success]- Answer
> **$4$ beats per second, and the beat rate decreases as the taped fork drops toward $440\ \mathrm{Hz}$.**

> [!warning] Trap
> Adding the frequencies and reporting $884\ \mathrm{Hz}$. Beats are the difference; the sum is present in the sound but is not what you hear pulsing. Also wrong: assuming tape raises the pitch.

<sub>from GEAS-02-14</sub>

### 8. Find the speed of sound in air at $0\ ^\circ\mathrm{C}$, at $20\ ^\circ\mathrm{C}$ and at $30\ ^\circ\mathrm{C}$ using $v \approx 331 + 0.6\,t$.

**Given:** $v \approx 331 + 0.6t$; $t = 0,\ 20,\ 30\ ^\circ\mathrm{C}$

> [!success]- Answer
> **$331\ \mathrm{m/s}$ at $0\ ^\circ\mathrm{C}$, $343\ \mathrm{m/s}$ at $20\ ^\circ\mathrm{C}$ (the standard exam value), and $349\ \mathrm{m/s}$ at $30\ ^\circ\mathrm{C}$.**

> [!warning] Trap
> Using $343\ \mathrm{m/s}$ for every item regardless of the stated temperature, or putting $t$ in kelvin. At $0\ ^\circ\mathrm{C}$ that is a $3.5\%$ error, which is enough to shift a Doppler answer by several hertz and to move a resonance wavelength off the given choices.

<sub>from GEAS-02-14</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| GEAS-02-01 | Kinematics 1D and 2D | 5 |
| GEAS-02-02 | Newton’s Laws, Friction and Circular Motion | 10 |
| GEAS-02-03 | Work, Energy and Conservation | 5 |
| GEAS-02-04 | Momentum and Collisions | 5 |
| GEAS-02-05 | Rotational Kinematics and Torque | 5 |
| GEAS-02-06 | Angular Momentum and Rigid Bodies | 5 |
| GEAS-02-07 | Fluid Statics: Pascal and Archimedes | 5 |
| GEAS-02-08 | Fluid Dynamics: Continuity and Bernoulli | 10 |
| GEAS-02-09 | Thermal Expansion and Calorimetry | 4 |
| GEAS-02-10 | Heat Transfer | 5 |
| GEAS-02-11 | First Law and Processes | 4 |
| GEAS-02-12 | Second Law, Entropy and Carnot | 5 |
| GEAS-02-13 | SHM and Waves | 5 |
| GEAS-02-14 | Sound and Doppler | 5 |
| GEAS-02-15 | Reflection and Refraction | 5 |
| GEAS-02-16 | Lenses and Mirrors | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
