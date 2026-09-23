---
id: MATH-05-15
title: "Inductance from Geometry and Materials"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 15
tier: 1
depth: full
problem_count: 10
prereqs: ["[[13_Ampere’s_Circuital_Law]]", "[[08_Dielectrics_and_Boundary_Conditions]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 15 — Inductance from Geometry and Materials

> [!abstract] Scope
> Compute inductance from geometry and material properties: solenoid, toroid, coaxial cable and two-wire line, plus energy storage and the effect of a magnetic core.

## Core Concept

> [!tip] Intuition
> Inductance measures how much flux a current links, per unit current. Geometry decides how much flux a given current produces; the core material decides how much more flux that same current can drive. So every inductance formula is a flux calculation divided by current.

**Definition and the flux-linkage picture.** Inductance is flux linkage per unit current:
$$L = \frac{N\Phi_B}{i} = \frac{\lambda}{i}$$
where $\Phi_B$ is the flux through one turn, $N$ the number of turns, and $\lambda = N\Phi_B$ the flux linkage. The procedure is always the same: assume a current $i$, find $\mathbf{B}$ from Ampere's law or Biot-Savart, integrate $\mathbf{B}$ over the cross-section to get $\Phi_B$, multiply by $N$, and divide by $i$. Every closed-form $L$ below is that recipe carried out for a specific geometry.

**Ampere's law does the heavy lifting.** For the solenoid and the toroid, symmetry makes $\oint \mathbf{H}\cdot d\mathbf{l} = NI$ trivially evaluable, which is why those two have the cleanest formulas. The coaxial cable needs the field of a single conductor, $B = \frac{\mu I}{2\pi\rho}$, integrated from the inner to the outer radius — and because the field varies as $1/\rho$, the result carries a **logarithm**, not a simple ratio. Recognising which integral the geometry forces is what makes these formulas memorable rather than arbitrary.

**The core multiplies, and can saturate.** Replacing air with a material of relative permeability $\mu_r$ multiplies the inductance by $\mu_r$ — the same current now drives far more flux. This is why ferrite-cored inductors are compact. The catch is saturation: beyond a material-dependent flux density the permeability collapses toward that of free space, so the inductance falls sharply and the device becomes nonlinear. A real inductor is therefore specified both by its small-signal inductance and by its saturation current.

**Energy storage and the $\frac{1}{2}Li^2$ result.** An inductor stores energy in its magnetic field, $W = \frac{1}{2}Li^2$, which can also be computed by integrating the field energy density $\frac{B^2}{2\mu}$ over the volume. The two agree exactly, and the second route is the derivation of $L$ when the first is awkward. This dual view is examinable: a question may ask for either the inductance or the stored energy, and the energy form also gives the force in an air gap by differentiating with respect to the gap length.

**Why inductance matters in circuits and machines.** The induced voltage $v = L\frac{di}{dt}$ opposes any change in current, which is the origin of the transient behaviour in RL circuits and of the $L/R$ time constant. Mutual inductance extends this to coupled coils, $v_2 = M\frac{di_1}{dt}$ with $M = k\sqrt{L_1L_2}$ and $0 \le k \le 1$; the coupling coefficient is where a transformer's efficiency and a wireless power link's feasibility both live.

## Derivation

**Recipe.** (1) Assume current $i$. (2) Find $\mathbf{B}$ by symmetry (Ampere) or superposition (Biot-Savart). (3) Integrate over the cross-section for $\Phi_B$. (4) Form $\lambda = N\Phi_B$. (5) $L = \lambda/i$. The current cancels at the last step — a useful check, because any surviving $i$ means an algebra error.

**Long solenoid.** Ampere's law on a rectangular loop gives $H = \frac{NI}{l}$ inside and zero outside. Then $\Phi_B = \mu H A = \mu\frac{NI}{l}A$ per turn, and $\lambda = N\Phi_B = \frac{\mu N^2 A I}{l}$. Dividing by $i$: $L = \frac{\mu N^2 A}{l}$. The $N^2$ is the key feature — adding turns increases the flux per turn *and* the number of turns collecting it.

**Toroid.** Ampere's law on a circular path of radius $\rho$ inside the core gives $H = \frac{NI}{2\pi\rho}$, so $B$ varies as $1/\rho$ across the core. The flux is $\Phi_B = \int_a^b \mu\frac{NI}{2\pi\rho}\,h\,d\rho = \frac{\mu NIh}{2\pi}\ln\frac{b}{a}$ for a rectangular cross-section of height $h$. With $\lambda = N\Phi_B$, this gives $L = \frac{\mu N^2 h}{2\pi}\ln\frac{b}{a}$. The logarithm appears for exactly the same reason as in the coaxial cable: a $1/\rho$ field.

**Coaxial cable.** The field between the conductors is $B = \frac{\mu I}{2\pi\rho}$. Flux through a longitudinal strip of length $l$ is $\Phi_B = \int_a^b \frac{\mu I}{2\pi\rho}l\,d\rho = \frac{\mu Il}{2\pi}\ln\frac{b}{a}$. With $N = 1$, $L = \frac{\mu l}{2\pi}\ln\frac{b}{a}$, usually quoted per metre as $\frac{\mu}{2\pi}\ln\frac{b}{a}$. Note the ratio $b/a$, so diameters give the same answer as radii — a fact worth using as a check.

**Energy method, and the air-gap force.** Since $W = \frac{1}{2}Li^2 = \int\frac{B^2}{2\mu}dV$, an inductor with a gap of length $g$ and core path length $l_c$ has $H_c l_c + H_g g = Ni$; with flux continuity $B_c = B_g = B$, the stored energy is dominated by the gap because $\frac{B^2}{2\mu_0}$ in the gap dwarfs $\frac{B^2}{2\mu}$ in the core when $\mu_r \gg 1$. Differentiating $W$ with respect to $g$ gives the attractive force $F = \frac{B^2A}{2\mu_0}$, which is why gapped cores hold their inductance stable against current but develop strong mechanical pull.

**Series and parallel combinations.** Inductors combine like resistors: $L_{series} = L_1 + L_2 + \cdots$ and $\frac{1}{L_{parallel}} = \frac{1}{L_1} + \frac{1}{L_2} + \cdots$ — **provided the coils are not magnetically coupled**. With coupling the mutual term appears, $L_{series} = L_1 + L_2 \pm 2M$, with the sign set by whether the fields aid or oppose. Ignoring coupling is the most common error in combination questions.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Definition | $L = \frac{N\Phi_B}{i} = \frac{\lambda}{i}$ | Flux linkage per unit current. The current cancels in every closed form. |
| Long solenoid | $L = \frac{\mu N^2 A}{l}$ | A is the cross-sectional area, l the length. Requires l >> radius for the uniform-field assumption. |
| Solenoid, per unit length | $\frac{L}{l} = \mu n^2 A, \quad n = \frac{N}{l}$ | n is turns per metre. Useful when a problem gives winding density. |
| Toroid, rectangular section | $L = \frac{\mu N^2 h}{2\pi}\ln\frac{b}{a}$ | a, b inner and outer radii, h the axial height. Ratio b/a, so diameters work too. |
| Coaxial cable | $L = \frac{\mu l}{2\pi}\ln\frac{b}{a}$ | Per metre: mu/(2 pi) ln(b/a). Independent of the conductor radii except through the ratio. |
| Two-wire line | $L = \frac{\mu l}{\pi}\ln\frac{D}{a}$ | D centre-to-centre spacing, a conductor radius, D >> a. No 2 in the denominator - there are two conductors. |
| Energy stored | $W = \frac{1}{2}Li^2$ | Joules. Equals the field integral, which is the alternative derivation route. |
| Field energy density | $w = \frac{B^2}{2\mu}$ | J/m^3. Integrate over volume to get W without knowing L first. |
| Induced voltage | $v = L\frac{di}{dt}$ | Opposes the change in current (Lenz). Basis of RL transients and the L/R time constant. |
| Mutual inductance | $M = k\sqrt{L_1L_2}, \quad 0 \le k \le 1$ | k is the coupling coefficient. k = 1 is ideal coupling, achievable only with a shared closed core. |
| Series with coupling | $L_{series} = L_1 + L_2 \pm 2M$ | Plus when fields aid, minus when they oppose. The formula without 2M is only valid for uncoupled coils. |
| Parallel (uncoupled) | $\frac{1}{L_{par}} = \frac{1}{L_1} + \frac{1}{L_2}$ | Valid only with no mutual coupling. Coupled parallel coils need the full network solution. |
| Air-gap force | $F = \frac{B^2A}{2\mu_0}$ | Attractive pull across a gap of area A. Derived from dW/dg. |
| RL time constant | $\tau = \frac{L}{R}$ | Seconds. Current reaches 63.2 percent of final value in one tau. |
| Solenoid field | $B = \mu\frac{Ni}{l}$ | Inside, away from the ends. Multiply by mu_r for a core. |

## Interactive Widget

**Inductance Gap Core Calculator**

![[Inductance_Gap_Core_Calculator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A solenoid has 500 turns, length 25 cm, and cross-sectional area $4\ \mathrm{cm^2}$ in air. Find its inductance.

**Given:** N = 500; l = 0.25 m; A = 4e-4 m^2; mu0 = 4pi x 10^-7

**Solution:**

1. Use L = mu0 N^2 A / l
2. N^2 = 250000
3. mu0 N^2 = 4pi x 10^-7 x 250000 = 0.31416
4. L = 0.31416 x 4e-4 / 0.25 = 5.0265e-4 H

> [!success]- Answer
> **$L \approx 0.503$ mH**

> [!warning] Trap
> Using the cross-sectional area in cm^2 without converting. 4 cm^2 is 4 x 10^-4 m^2, a factor of 10^4 that turns a millihenry into a hundredth of a henry.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `33` `×500²×4E-4÷0.25=` → $L$ = **5.0265E-4** H = **0.503** mH, with code `33` = $\mu_0$.
> 2. Area slip: keying `4` instead of `4E-4` returns **5.03** H, a factor of $10^{4}$.
> 3. The $N^2$ matters: `×500=` instead of `×500²` returns **1.005E-6** H.
>
> `CONVT` Area converts $4$ cm² to `4E-4` m² directly.

### P2. The solenoid of the previous problem is now wound on a ferrite core of relative permeability 2000. Find the new inductance and the stored energy at 100 mA.

**Given:** same geometry; mu_r = 2000; i = 0.1 A

**Solution:**

1. The core multiplies the inductance by mu_r: L = 2000 x 5.0265e-4 = 1.0053 H
2. Energy: W = (1/2)L i^2
3. = 0.5 x 1.0053 x 0.01 = 5.0265e-3 J

> [!success]- Answer
> **$L \approx 1.01$ H, $W \approx 5.03$ mJ**

> [!warning] Trap
> Assuming the mu_r gain is available at any current. At 100 mA this core is likely near saturation, where mu_r collapses and the real inductance is far below 1 H.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. With $L$ = **5.0265E-4** H in `Ans`: `×2000=` → $L$ = **1.0053** H.
> 2. `0.5×Ans×0.1²=` → $W$ = **5.0265E-3** J = **5.03** mJ.
> 3. The core multiplies $L$ once: `1.0053×0.1²÷2=` → **5.0265E-3** J, against **2.513E-3** J air-cored.

### P3. A toroid has 200 turns, rectangular cross-section with inner radius 2 cm, outer radius 3 cm and height 1 cm, on a core with $\mu_r = 1000$. Find the inductance.

**Given:** N = 200; a = 0.02 m; b = 0.03 m; h = 0.01 m; mu_r = 1000

**Solution:**

1. mu = mu_r mu0 = 1000 x 4pi x 10^-7 = 1.2566e-3 H/m
2. L = mu N^2 h / (2 pi) x ln(b/a)
3. N^2 = 40000, so mu N^2 h = 1.2566e-3 x 40000 x 0.01 = 0.50265
4. ln(0.03/0.02) = ln 1.5 = 0.405465
5. L = 0.50265 x 0.405465 / (2 pi) = 0.20381 / 6.28319 = 0.032438 H

> [!success]- Answer
> **$L \approx 32.4$ mH**

> [!warning] Trap
> Using (b - a) instead of ln(b/a). The field falls as 1/rho across the core, so the flux integral produces a logarithm, not a linear width.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `33` `×1000×200²×0.01×\ln(1.5)÷(2\pi)=` → $L$ = **0.03244** H = **32.4** mH.
> 2. `\ln(1.5)=` → **0.4055** is the geometry factor.
> 3. Using $(b-a)=0.01$ m instead of the log returns **0.80** mH, a factor of 40 out.

### P4. A coaxial cable has an inner conductor radius of 1 mm and an inner radius of the outer conductor of 4 mm. Find its inductance per metre in air.

**Given:** a = 1e-3 m; b = 4e-3 m

**Solution:**

1. L/l = (mu0/(2 pi)) ln(b/a)
2. mu0/(2pi) = 4pi x 10^-7/(2pi) = 2 x 10^-7
3. ln(4) = 1.386294
4. L/l = 2e-7 x 1.386294 = 2.7726e-7 H/m

> [!success]- Answer
> **$L \approx 277$ nH/m**

> [!warning] Trap
> Using diameters instead of radii in a way that changes the ratio, or forgetting that only the ratio b/a matters - doubling both radii leaves the inductance unchanged.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `33` `÷(2\pi)×\ln(4)=` → $L/l$ = **2.7726E-7** H/m = **277** nH/m.
> 2. Only two numbers are needed: `\ln(4)=` → **1.3863** and $\mu_0/2\pi$ = **2E-7**.
> 3. The ratio $b/a$ = **4.00** is unchanged if both radii are doubled, so the inductance is too.

### P5. A two-wire transmission line has conductors of radius 1 mm separated by 20 cm centre to centre. Find the inductance per metre.

**Given:** a = 1e-3 m; D = 0.2 m

**Solution:**

1. L/l = (mu0/pi) ln(D/a)
2. mu0/pi = 4 x 10^-7
3. ln(0.2/0.001) = ln(200) = 5.298317
4. L/l = 4e-7 x 5.298317 = 2.1193e-6 H/m

> [!success]- Answer
> **$L \approx 2.12\ \mu$H/m**

> [!warning] Trap
> Using mu0/(2pi) as for a coaxial cable. The two-wire line has two conductors each contributing a mu0/(2pi) ln term that doubles to mu0/pi, so the denominator is pi, not 2pi.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `33` `÷\pi×\ln(200)=` → $L/l$ = **2.1193E-6** H/m = **2.12** uH/m.
> 2. `\ln(200)=` → **5.2983**, and the ratio $D/a$ = **200** is unit-independent.
> 3. Using $2\pi$ in place of $\pi$ in the denominator returns **1.06E-6** H/m, exactly half.
>
> Both conductors contribute a $\mu_0/2\pi$ log term, so the denominator is $\pi$.

### P6. Two coils of 4 mH and 9 mH are connected in series with a coupling coefficient $k = 0.5$. Find the maximum and minimum possible total inductance.

**Given:** L1 = 4 mH; L2 = 9 mH; k = 0.5

**Solution:**

1. M = k sqrt(L1 L2) = 0.5 sqrt(4 x 9) = 0.5 x 6 = 3 mH
2. Fields aiding: L = L1 + L2 + 2M = 4 + 9 + 6 = 19 mH
3. Fields opposing: L = L1 + L2 - 2M = 4 + 9 - 6 = 7 mH

> [!success]- Answer
> **Maximum $19$ mH, minimum $7$ mH.**

> [!warning] Trap
> Reporting 13 mH (the uncoupled sum) or using M = k L1 L2 without the square root. The 2M term is what makes coupling matter.

### P7. An inductor of 50 mH carries a current that increases linearly from 0 to 2 A in 5 ms. Find the induced voltage and the energy stored at the end.

**Given:** L = 0.05 H; di = 2 A; dt = 5e-3 s

**Solution:**

1. di/dt = 2/5e-3 = 400 A/s
2. v = L di/dt = 0.05 x 400 = 20 V
3. W = (1/2)L i^2 = 0.5 x 0.05 x 4 = 0.1 J

> [!success]- Answer
> **$v = 20$ V (opposing the increase), $W = 0.1$ J**

> [!warning] Trap
> Dropping the sign meaning of the induced voltage. Lenz's law makes it oppose the rise, so the terminal voltage of the source must overcome it - the polarity matters in circuit questions.

### P8. A magnetic circuit has a core of cross-sectional area $5\ \mathrm{cm^2}$ with a 1 mm air gap, and the flux density in the gap is 0.8 T. Find the force pulling the pole faces together.

**Given:** A = 5e-4 m^2; B = 0.8 T; mu0 = 4pi x 10^-7

**Solution:**

1. F = B^2 A/(2 mu0)
2. B^2 = 0.64
3. 2 mu0 = 2 x 4pi x 10^-7 = 2.5133e-6
4. F = 0.64 x 5e-4 / 2.5133e-6 = 3.2e-4 / 2.5133e-6 = 127.3

> [!success]- Answer
> **$F \approx 127$ N**

> [!warning] Trap
> Assuming the force scales with the gap length. It does not - the force depends only on B and the pole area, while the gap length sets the reluctance and hence the current needed to establish that B.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.8²×5E-4÷(2×` `SHIFT` `CVALUE` `33` `)=` → $F$ = **127.3** N, with code `33` = $\mu_0$.
> 2. `5E-4` m² is the $5$ cm², and the 1 mm gap never enters $F=B^2A/2\mu_0$.
> 3. Forgetting the half returns **254.6** N, exactly double.

### P9. A solenoid of 1000 turns and length 30 cm carries 2 A in air. Find the flux density inside and the total flux through the cross-section if the area is $6\ \mathrm{cm^2}$.

**Given:** N = 1000; l = 0.3 m; i = 2 A; A = 6e-4 m^2

**Solution:**

1. B = mu0 N i / l = 4pi x 10^-7 x 1000 x 2 / 0.3
2. = 2.5133e-3 / 0.3 = 8.3776e-3 T
3. Phi_B = B A = 8.3776e-3 x 6e-4 = 5.0265e-6 Wb

> [!success]- Answer
> **$B \approx 8.38$ mT, $\Phi_B \approx 5.03\ \mu$Wb**

> [!warning] Trap
> Reporting the flux linkage rather than the flux. The question asks for the flux through one cross-section; the linkage is N times larger and is a different quantity.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `33` `×1000×2÷0.3=` → $B$ = **8.3776E-3** T = **8.38** mT.
> 2. `×6E-4=` → $\Phi_B$ = **5.0265E-6** Wb = **5.03** uWb through one cross-section.
> 3. The flux linkage is $N$ times larger: `×1000=` → **5.0265E-3** Wb-turns.

### P10. Verify the solenoid formula $L = \mu N^2A/l$ for the previous problem by computing the flux linkage per unit current, and compare with the direct formula.

**Given:** N = 1000; l = 0.3 m; A = 6e-4 m^2

**Solution:**

1. Flux per turn from the previous problem: Phi_B/i = 5.0265e-6/2 = 2.5133e-6 Wb/A
2. Linkage per unit current: lambda/i = N Phi_B/i = 1000 x 2.5133e-6 = 2.5133e-3 H
3. Direct formula: L = mu0 N^2 A/l = 4pi x 10^-7 x 10^6 x 6e-4/0.3
4. = 4pi x 10^-7 x 10^6 = 1.25664; times 6e-4 = 7.5398e-4; divided by 0.3 = 2.5133e-3 H
5. Both routes agree

> [!success]- Answer
> **$L = 2.51$ mH by both routes.**

> [!warning] Trap
> Computing lambda/i as Phi_B/i times N but forgetting that the flux must be multiplied by N *because each turn links it* - the N^2 in the closed form is not two separate factors by accident.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Linkage route: `1000×5.0265E-6÷2=` → $L$ = **2.5133E-3** H = **2.51** mH.
> 2. Direct route: `SHIFT` `CVALUE` `33` `×1000²×6E-4÷0.3=` → **2.5133E-3** H, identical.
> 3. The routes agree only because of the $N^2$: `×1000×6E-4÷0.3=` → **2.513E-6** H is the single-$N$ slip.

## Traps & Exam Notes

- **Forgetting the $N^2$.** Inductance depends on the *square* of the turn count: $N$ turns produce $N$ times the flux and each of the $N$ turns links it. Using a single $N$ understates the inductance by a factor of $N$.
- **Unit-conversion slips in area.** Solenoid problems habitually give $A$ in cm². $1\ \mathrm{cm^2} = 10^{-4}\ \mathrm{m^2}$, and forgetting this is a factor of $10^4$ error — enough to change the order of magnitude.
- **Assuming $\mu_r$ applies regardless of current.** Every ferromagnetic core saturates. Above the saturation flux density the effective permeability collapses and the inductance falls, so a formula-derived value is an upper bound unless the operating point is stated.
- **Ignoring mutual coupling in combinations.** $L_{series} = L_1 + L_2$ holds only for magnetically isolated coils. With coupling the total is $L_1+L_2\pm2M$; the sign ambiguity is resolved by whether the fields aid or oppose.
- **Using $b-a$ where a logarithm belongs.** The toroid and coaxial cable have $1/\rho$ fields, so the flux integral produces $\ln(b/a)$. Linear widths appear only for uniform fields.
- **The two-wire line denominator.** It is $\mu/\pi$, not $\mu/2\pi$, because both conductors contribute. The coaxial cable, with its field confined between the conductors, uses $\mu/2\pi$.
- **Confusing flux with flux linkage.** $\Phi_B$ is the flux through one turn; $\lambda = N\Phi_B$ is the linkage. Inductance uses the linkage.
- **Treating the air-gap force as gap-dependent.** $F = B^2A/(2\mu_0)$ contains no $g$. The gap affects the current required to reach that $B$, not the force at that $B$.
- **Ignoring the internal inductance of a conductor.** The standard coaxial formula $\frac{\mu}{2\pi}\ln(b/a)$ neglects flux *inside* the inner conductor, which adds $\frac{\mu}{8\pi}$ per metre. Textbooks vary on whether to include it, so state the assumption.

## See Also

- [[13_Ampere’s_Circuital_Law]]
- [[12_Biot-Savart_Law]]
- [[09_Capacitance_from_Geometry]]
- [[16_Magnetic_Forces,_Torque_and_Lorentz]]

---

[[14_Magnetic_Boundary_Conditions_and_Vector_Potential|⬅ 14]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[16_Magnetic_Forces,_Torque_and_Lorentz|16 ➡]]
