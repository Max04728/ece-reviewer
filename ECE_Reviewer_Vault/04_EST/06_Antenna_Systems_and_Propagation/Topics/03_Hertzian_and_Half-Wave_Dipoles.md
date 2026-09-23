---
id: EST-06-03
title: "Hertzian and Half-Wave Dipoles"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 3
tier: 2
depth: full
problem_count: 4
prereqs: ["[[01_Antenna_Parameters_Directivity,_Gain,_EIRP]]", "[[02_Radiation_Resistance,_Efficiency_and_Capture_Area]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Hertzian and Half-Wave Dipoles

> [!abstract] Scope
> Compute radiation resistance, directivity, resonant length and far-field strength for the infinitesimal (Hertzian) dipole and the half-wave dipole, and explain why short antennas are lossy and narrowband.

## Core Concept

> [!tip] Intuition
> A dipole is a current on a wire, and the current distribution is what sets everything else. Assume the current is uniform and you get the Hertzian dipole: a fat doughnut pattern with $1.5$ directivity and a radiation resistance that collapses as the antenna shrinks. Let the current taper to zero at the ends the way it really does on a half-wave element, and the pattern tightens slightly while $R_\mathrm{rad}$ jumps to a workable $73\ \Omega$.

**The Hertzian dipole is the reference radiator.** An infinitesimal dipole is a straight wire of length $l \ll \lambda$ carrying a *uniform* current $I_0$. Uniform current is a fiction, but it makes the radiation integral trivial, and every real antenna can be built by stacking infinitesimal segments with the correct current weighting. The radiated power density goes as $\sin^2\theta$ with $\theta$ measured from the wire axis, so the pattern is a doughnut: maximum broadside to the wire, an exact null along the wire. There is no radiation off the ends because a charge moving along your line of sight has no transverse acceleration, and only transverse acceleration radiates.

**Why $R_\mathrm{rad}$ collapses for short antennas.** Integrating the $\sin^2\theta$ power pattern and dividing by $I_0^2/2$ gives the classic short-dipole result:
$$R_\mathrm{rad} = 80\pi^2 (l/\lambda)^2\ \Omega$$
The square is the whole story: halving the length quarters the radiation resistance. At $l = \lambda/50$ it is only $0.316\ \Omega$, and at $l = 0.01\lambda$ it is $0.079\ \Omega$. That is catastrophic in practice, because the same short wire still has ohmic loss and, worse, a large capacitive reactance. Efficiency is the ratio of radiation resistance to total series resistance:
$$\eta = R_\mathrm{rad}/(R_\mathrm{rad}+R_\mathrm{loss})$$
A resistance of a fraction of an ohm in series with even $1\ \Omega$ of conductor and coil loss therefore throws almost all the power away as heat. The same large reactance makes the element a high-$Q$ resonator, so the bandwidth is a sliver. This is why a Hertzian dipole is a *model*, never a practical antenna.

**The half-wave dipole and why $l = 0.475\lambda$, not $0.5\lambda$.** On a real centre-fed element the current must fall to zero at each open end, so it follows a half sinusoid and is maximum at the feed. Recomputing the radiation integral with that sinusoidal current changes the numbers:
$$R_\mathrm{rad} = 73\ \Omega$$
and $D = 1.64 = 2.15\ \mathrm{dBi}$, slightly more directive than the Hertzian $1.5$ because the tapered current effectively weights the middle of the element where the contributions add most usefully. The feed impedance is $Z = 73 + j42.5\ \Omega$ at *exactly* $\lambda/2$ — it is not resonant there, because a thick cylinder does not behave like an ideal thin wire. Resonance (zero reactance) occurs near $0.475\lambda$, so the practical cut length is about $0.48\lambda$. The rule of thumb: fatter wire or tubing pulls the resonant length down toward $0.47\lambda$, thinner wire pushes it up toward a full $0.5\lambda$.

**Getting the length from the frequency.** The design chain is fixed: $\lambda = c/f$, then $l = 0.475\lambda = 0.475c/f$ for a resonant half-wave element. At $100\ \mathrm{MHz}$, $\lambda = 3\ \mathrm{m}$ and the cut length is $1.425\ \mathrm{m}$ — a nominal half-wave of $1.5\ \mathrm{m}$ shortened by the end effect. Exam questions frequently quote the naive $\lambda/2 = 1.5\ \mathrm{m}$ and expect you to catch the $0.475$ factor; the acronym some reviewers use for it ($K$) is a memorisation aid, not physics.

**Far field, power density and the $377\ \Omega$ link.** The far field of any dipole is transverse, and in free space it is tied to the power density by $S = E^2/\eta_0$ with $\eta_0 = 377\ \Omega$. For a half-wave dipole the peak far field is $E = 60 I_0 F(\theta)/d$ with $I_0$ the *loop* (maximum) current; the pattern factor is:
$$F(\theta) = \cos(\tfrac{\pi}{2}\cos\theta)/\sin\theta$$
It peaks at $1$ — note there is **no** $\pi$ here, because $\eta_0/(2\pi) = 377/2\pi = 60$ exactly; for the Hertzian dipole it is $E = 60\pi I_0 l \sin\theta/(\lambda d)$, where the $\pi$ *does* appear because the short-dipole far field carries an extra $\beta = 2\pi/\lambda$. Use those when the problem *gives* a current. When it gives power instead, use $E = \sqrt{30 P_t D}/d$ — for a half-wave dipole, $E = \sqrt{60P_t}/d$ — since the current then has to be derived from the power relation:
$$P_\mathrm{rad} = \tfrac{1}{2}I_0^2R_\mathrm{rad}$$
A slip in that factor of two is the classic error. Every one of these must agree with $S = P_t D/(4\pi d^2)$; if it does not, you have mixed $I_0$ conventions. Finally, all of it is far-field only, roughly $d \gg \lambda$ and $d > 2D^2/\lambda$: the $73\ \Omega$ and $1.64$ figures themselves assume a *thin* element in free space, fed at the exact centre, with no ground plane or mast nearby — bring metal close and the mutual impedance shifts the resistance and reactance, and thicken the element and the resonance moves.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Wavelength from frequency | $\lambda = \frac{c}{f} = \frac{3\times10^{8}}{f}$ | Free space. At 100 MHz, lambda = 3 m. Use this before any length calculation. |
| Radiation resistance of a Hertzian dipole | $R_\mathrm{rad} = 80\pi^2\left(\frac{l}{\lambda}\right)^2$ | Uniform-current assumption, l << lambda. Scales as (l/lambda)^2, so a tenfold shortening costs a factor of 100. |
| Directivity of a dipole (both cases) | $D = 1.5 = 1.76\ \mathrm{dBi}\ \ (\mathrm{Hertzian}), \qquad D = 1.64 = 2.15\ \mathrm{dBi}\ \ (\mathrm{half-wave})$ | The Hertzian value is fixed for any l << lambda; the half-wave value is slightly higher because the sinusoidal current tapers and weights the element centre. |
| Power pattern of a Hertzian dipole | $U(\theta) \propto \sin^2\theta$ | theta measured from the wire axis. Maximum broadside, exact null off the ends — a doughnut, not a sphere. |
| Power-to-current relation for a half-wave dipole | $P_\mathrm{rad} = \tfrac{1}{2}I_0^2 R_\mathrm{rad}$ | I_0 is the peak (loop) current and 73 ohm the series resistance. Dropping the 1/2 inflates I_0 by sqrt(2) and breaks the E-S-P consistency. |
| Radiation resistance of a half-wave dipole | $R_\mathrm{rad} = 73\ \Omega$ | Sinusoidal current, thin element, free space. Half of this (36.5 ohm) if you define power as I_0^2 R, not I_0^2 R / 2. |
| Feed impedance at exactly lambda/2 | $Z_\mathrm{in} = 73 + j42.5\ \Omega$ | Not resonant. Inductive; resonance (X = 0) is near 0.475 lambda. |
| Resonant physical length | $l = 0.475\lambda = \frac{0.475c}{f}$ | End effect. Thick tubing -> closer to 0.47 lambda; thin wire -> closer to 0.5 lambda. At 100 MHz, 1.425 m. |
| Peak far field of a half-wave dipole | $E = \frac{60 I_0 F(\theta)}{d}, \quad F(\theta)=\frac{\cos(\frac{\pi}{2}\cos\theta)}{\sin\theta}$ | PEAK (amplitude) field, not rms. No pi: eta_0/(2 pi) = 60. I_0 is the maximum (loop) current; divide by sqrt(2) for the rms field. |
| Peak far field of a Hertzian dipole | $E = \frac{60\pi I_0 l \sin\theta}{\lambda d}$ | Uniform current I_0, l << lambda. Here pi DOES appear (the extra beta = 2 pi/lambda). Use sin theta = 1 for the peak. |
| Field from radiated power, and the 377 ohm link | $E = \frac{\sqrt{30 P_t D}}{d}, \qquad S = \frac{E^2}{\eta_0} = \frac{P_t D}{4\pi d^2}, \quad \eta_0 = 377\ \Omega$ | The convention-free form; no current needed. For a half-wave dipole D = 1.64, so E = sqrt(60 P_t)/d. If E, S and P_t disagree you mixed I_0 conventions. |
| Antenna efficiency | $\eta = \frac{R_\mathrm{rad}}{R_\mathrm{rad}+R_\mathrm{loss}}$ | A half-wave dipole with 1 ohm of loss gives 73/74 = 0.9865. A Hertzian dipole of 0.3 ohm with the same loss is hopeless. |

## Worked Problems

### P1. Find the physical length of a resonant half-wave dipole for $100\ \mathrm{MHz}$, and state the naive $\lambda/2$ value it is derived from.

**Given:** f = 100 MHz; c = 3e8 m/s; resonant-length factor K = 0.475

**Solution:**

1. $\lambda = c/f = (3\times10^{8})/(100\times10^{6}) = 3\ \mathrm{m}$
2. Naive half-wave: $\lambda/2 = 1.5\ \mathrm{m}$
3. Apply the end-effect factor: $l = 0.475\lambda = 0.475(3) = 1.425\ \mathrm{m}$
4. So the resonant element is $1.425\ \mathrm{m}$, i.e. $0.075\ \mathrm{m}$ shorter than $1.5\ \mathrm{m}$

> [!success]- Answer
> **$l = 1.425\ \mathrm{m}$ (from a nominal $\lambda/2 = 1.5\ \mathrm{m}$).**

> [!warning] Trap
> Answering $1.5\ \mathrm{m}$ by using $l = \lambda/2$ and ignoring the end effect. A cut dipole resonates at $\approx 0.475\lambda$, and $1.5\ \mathrm{m}$ would leave the antenna inductive and mismatched.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷100×10^6` → $\lambda$ = **3.00** m.
> 2. `Ans×0.475` → $l$ = **1.425** m; `3×0.5` → the naive **1.5** m it is trimmed from.

### P2. Two Hertzian dipoles are compared at $100\ \mathrm{MHz}$: one with $l = \lambda/50$ and one with $l = 0.01\lambda$. Find $R_\mathrm{rad}$ for each and their ratio.

**Given:** f = 100 MHz, lambda = 3 m; case A: l = lambda/50; case B: l = 0.01 lambda

**Solution:**

1. Case A: $l/\lambda = 1/50 = 0.02$
2. $R_\mathrm{rad} = 80\pi^2(0.02)^2 = 80(9.8696)(4\times10^{-4}) = 0.3158\ \Omega$
3. Case B: $l/\lambda = 0.01$, so $R_\mathrm{rad} = 80\pi^2(0.01)^2 = 80(9.8696)(1\times10^{-4}) = 0.07896\ \Omega$ (this is $l = 3\ \mathrm{cm}$)
4. Ratio: $0.3158/0.07896 = 4$ — exactly $(0.02/0.01)^2$, confirming the square law

> [!success]- Answer
> **$0.3158\ \Omega$ for $l=\lambda/50$; $0.07896\ \Omega$ for $l=0.01\lambda$; ratio $4$.**

> [!warning] Trap
> Scaling $R_\mathrm{rad}$ linearly with length. It goes as $(l/\lambda)^2$, so halving the length quarters the resistance — the reason electrically short antennas are so lossy.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `80π²×0.02² : 80π²×0.01²` — chain with `ALPHA` `:` → **0.3158** Ω → **0.07896** Ω.
> 2. `0.02²÷0.01²` → ratio **4.000** = $(l_A/l_B)^2$, so the square law alone fixes the 4 to 1 ratio.

### P3. A half-wave dipole at $100\ \mathrm{MHz}$ radiates $1\ \mathrm{kW}$. Find (a) the maximum current $I_0$, (b) the maximum far field at $1\ \mathrm{km}$, and (c) the power density there.

**Given:** P_t = 1 kW = 1000 W; R_rad = 73 ohm; D = 1.64; d = 1 km; eta_0 = 377 ohm

**Solution:**

1. Radiated power in terms of loop current: $P = \tfrac{1}{2}I_0^2 R_\mathrm{rad}$, so $I_0 = \sqrt{2(1000)/73} = \sqrt{27.397} = 5.234\ \mathrm{A}$
2. Power density from the directivity: $S = P_t D/(4\pi d^2) = 1000(1.64)/(4\pi(1000)^2) = 1.305\times10^{-4}\ \mathrm{W/m^2}$
3. Field: $E = \sqrt{S\eta_0} = \sqrt{(1.305\times10^{-4})(377)} = \sqrt{0.04920} = 0.2218\ \mathrm{V/m}$
4. Cross-check through the current form: the peak field is $E_\mathrm{pk} = 60 I_0 F_\mathrm{max}/d = 60(5.234)(1)/1000 = 0.314\ \mathrm{V/m}$
5. Convert to rms: $E_\mathrm{rms} = 0.314/\sqrt{2} = 0.222\ \mathrm{V/m}$, which matches the power form $E = \sqrt{30P_tD}/d = \sqrt{30(1000)(1.64)}/1000 = 0.2218\ \mathrm{V/m}$ ✓

> [!success]- Answer
> **$I_0 = 5.23\ \mathrm{A}$; $E = 0.2218\ \mathrm{V/m}$; $S = 1.305\times10^{-4}\ \mathrm{W/m^2}$.**

> [!warning] Trap
> Writing $P = I_0^2 R_\mathrm{rad}$ instead of $\tfrac{1}{2}I_0^2 R_\mathrm{rad}$ with a peak current. That halves $I_0^2$ and inflates the current by $\sqrt{2}$, and it silently breaks the agreement between $E$, $S$ and $P_t$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(2×1000÷73)` → $I_0$ = **5.234** A — the $\tfrac{1}{2}$ lives inside the root.
> 2. `1000×1.64÷(4π×(1000)^2)` → $S$ = **1.305×10^-4** W/m².
> 3. `√(Ans×376.73)` → $E$ = **0.2217** V/m, with `SHIFT` `CVALUE` 37 for $Z_0$ = 376.73 Ω. The note's rounded 377 Ω returns **0.2218** V/m.

### P4. A half-wave dipole has $R_\mathrm{rad} = 73\ \Omega$ and $1\ \Omega$ of total conductor and connection loss. Find the efficiency in percent, and the gain in dBi.

**Given:** R_rad = 73 ohm; R_loss = 1 ohm; D = 1.64 = 2.15 dBi

**Solution:**

1. $\eta = R_\mathrm{rad}/(R_\mathrm{rad}+R_\mathrm{loss}) = 73/(73+1) = 73/74$
2. $\eta = 0.98649 = 98.65\%$
3. Gain is directivity degraded by efficiency: $G = \eta D = 0.98649(1.64) = 1.6178$
4. In dBi: $G = 10\log_{10}(1.6178) = 2.09\ \mathrm{dBi}$, i.e. $0.06\ \mathrm{dB}$ below the $2.15\ \mathrm{dBi}$ ideal

> [!success]- Answer
> **$\eta = 98.65\%$; $G = 2.09\ \mathrm{dBi}$.**

> [!warning] Trap
> Reporting $2.15\ \mathrm{dBi}$ as the gain. $2.15\ \mathrm{dBi}$ is the *directivity* of a lossless dipole; gain is always $\eta D$ and must be lower whenever any loss resistance exists.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `73÷(73+1)` → $\eta$ = **0.98649** = **98.65** %.
> 2. `Ans×1.64 : 10log(Ans)` → $G$ = **1.6178** → **2.09** dBi, about 0.06 dB below the 2.15 dBi ideal.

## Traps & Exam Notes

- **Using $l = \lambda/2$ for a resonant dipole.** The element resonates near $0.475\lambda$ because of the end effect, so at $100\ \mathrm{MHz}$ the answer is $1.425\ \mathrm{m}$, not $1.5\ \mathrm{m}$. Fatter conductors shift the factor further toward $0.47$.
- **Scaling $R_\mathrm{rad}$ linearly with length.** The law is $R_\mathrm{rad} = 80\pi^2(l/\lambda)^2$; shortening a Hertzian dipole by $10\times$ drops its radiation resistance by $100\times$, which is why short antennas are dominated by loss resistance and have terrible efficiency and bandwidth.
- **Confusing directivity with gain.** A half-wave dipole is $2.15\ \mathrm{dBi}$ *directivity*, but any real $R_\mathrm{loss}$ reduces the gain to $\eta D$. Quoting $2.15\ \mathrm{dBi}$ for a lossy dipole overstates it.
- **Confusing the peak field with the rms field.** $E = 60I_0F(\theta)/d$ gives the **peak** (amplitude) field, while $E = \sqrt{30P_tD}/d$ gives the **rms** field; they differ by $\sqrt{2}$ and both are self-consistent with $S = E^2/\eta_0$ only if you keep the pair straight. Substituting a peak field into $S = E^2/377$ overstates the power density by a factor of two.
- **Putting a $\pi$ in the half-wave dipole field.** The constant is $60$, not $60\pi$: $\eta_0/(2\pi) = 377/2\pi = 60.0$. The $\pi$ appears in the *Hertzian* dipole formula, $E = 60\pi I_0 l\sin\theta/(\lambda d)$, because that expression still carries the $\beta = 2\pi/\lambda$ factor. Using $60\pi$ for a half-wave dipole inflates the field by $3.14$.
- **Mixing the two current conventions for $I_0$.** Some texts set $P = I_0^2 R_\mathrm{rad}$ and others $P = \tfrac{1}{2}I_0^2R_\mathrm{rad}$; a slip in that factor of two changes $I_0$ by $\sqrt{2}$ and the field with it. When the problem gives *power*, use $E=\sqrt{30P_tD}/d$ and avoid $I_0$ altogether; use the current form only when the problem hands you a current.
- **Forgetting that $Z_\mathrm{in} = 73 + j42.5\ \Omega$ at exactly $\lambda/2$.** The antenna is *not* resonant at half-wave; the $+j42.5\ \Omega$ must be tuned out or the length trimmed to $0.475\lambda$. Reporting a purely resistive $73\ \Omega$ at $\lambda/2$ is a standard exam error.
- **Applying the $1/d$ far-field law too close in.** These expressions are far-field only, roughly $d \gg \lambda$ and $d > 2D^2/\lambda$. Closer than that the reactive near field dominates and the computed $E$ is meaningless.
- **Expecting radiation along the wire.** The Hertzian pattern has an exact null on the axis, so a vertical dipole has no signal straight up. Candidates who sketch a sphere instead of a doughnut lose the pattern question.

## See Also

- [[01_Antenna_Parameters_Directivity,_Gain,_EIRP]]
- [[02_Radiation_Resistance,_Efficiency_and_Capture_Area]]
- [[06_FSPL_and_Friis_Transmission_Equation]]

---

[[02_Radiation_Resistance,_Efficiency_and_Capture_Area|⬅ 02]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Marconi,_Folded_Dipole,_Yagi-Uda|04 ➡]]
