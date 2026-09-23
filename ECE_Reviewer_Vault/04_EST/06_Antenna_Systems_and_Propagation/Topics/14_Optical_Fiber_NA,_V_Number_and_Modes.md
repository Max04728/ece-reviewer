---
id: EST-06-14
title: "Optical Fiber NA, V Number and Modes"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 14
tier: 2
depth: full
problem_count: 4
prereqs: ["[[08_Waveguide_TE_and_TM_Modes]]", "[[09_Cutoff_Frequency_and_Guide_Wavelength]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — Optical Fiber NA, V Number and Modes

> [!abstract] Scope
> Compute a step-index fiber's numerical aperture, acceptance angle and V number, decide single-mode versus multimode, and count the guided modes.

## Core Concept

> [!tip] Intuition
> The core–cladding index step makes the fiber a light funnel: only rays arriving inside a cone of half-angle $\theta_a$ are trapped and guided. The V number is the same funnel geometry written as a dimensionless ratio of core size to wavelength, and it decides whether the fiber carries one mode or hundreds.

**Numerical aperture is the light-gathering cone.** A step-index fiber has core index $n_1$ and cladding index $n_2 < n_1$. A ray is guided by total internal reflection only if it strikes the core–cladding boundary above the critical angle, which — after Snell's law at the input face — means it must enter the core within a cone of half-angle $\theta_a = \arcsin(NA)$ from the axis. The numerical aperture itself follows from the index step, $NA = \sqrt{n_1^2 - n_2^2}$, and the full acceptance cone is $2\theta_a$. A larger NA collects more source power, which is why it matters for coupling an LED into a multimode fiber — but the same large $n_1 - n_2$ step is what creates hundreds of modes and hence heavy modal dispersion, so NA is a trade of coupling efficiency against bandwidth.

**The relative index difference $\Delta$ is the small parameter that simplifies everything.** With $\Delta = (n_1-n_2)/n_1$, typically 0.01 (1%) for a modern fiber, the exact form collapses to $NA \approx n_1\sqrt{2\Delta}$. Both forms are exam-worthy and they should agree: with $n_1 = 1.50$ and $n_2 = 1.485$, $\Delta = 0.01$, $NA = \sqrt{2.25 - 2.205225} = 0.2116$, while $1.50\sqrt{0.02} = 0.2121$ — a 0.25% difference that is pure small-$\Delta$ approximation error. Note that $\Delta$ must be used as a fraction (0.01), not as the percentage 1.

**The V number (normalized frequency) controls the mode count.** It is defined as $V = (2\pi a/\lambda)NA$, where $a$ is the **core radius**, not the diameter, and $\lambda$ is the **free-space** wavelength (not $\lambda/n_1$). V is dimensionless: it measures the core radius in units of wavelength scaled by the funnel's light-gathering power. A fat core, a short wavelength or a large NA all raise V. The single-mode condition is $V < 2.405$, the first zero of the Bessel function $J_0$: below that value only the fundamental $LP_{01}$ mode is guided. Turning the inequality around gives the single-mode cutoff wavelength $\lambda_c = 2\pi a NA/2.405$ — the fiber is single-mode for $\lambda > \lambda_c$ (longer wavelength, smaller V) and multimode below it. That is why 1310 nm and 1550 nm operation is single-mode in a standard 8–10 µm core while 850 nm operation in the same fiber would not be.

**Counting modes.** For a step-index fiber with V well above cutoff, the number of guided modes (counting both polarisations) is $M \approx V^2/2$; for a parabolic graded-index profile it is $M \approx V^2/4$, which is the general result $M \approx (V^2/2)\,\alpha/(\alpha+2)$ with $\alpha = 2$ for graded and $\alpha \to \infty$ for step. The count matters because each mode travels a slightly different path length and arrives at a different time: $M$ is the direct driver of modal dispersion, and cutting it by a factor of four (graded versus step index) is precisely why graded-index multimode fiber supports orders of magnitude more bandwidth over the same distance.

**Where the model breaks.** The V-number formulas assume a weakly guiding fiber ($n_1 \approx n_2$, small $\Delta$), a straight fiber and an infinite cladding. A large $\Delta$ (high-NA, hard-clad plastic fiber) invalidates the small-$\Delta$ NA approximation. Tight bends and microbends convert core modes to cladding/radiation modes, so a fiber can meet its V-number single-mode condition and still leak. And at $V$ just below 2.405 the fiber is not "single-mode with margin" — it is on the edge, where bend loss and splicing tolerances are worst.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Numerical aperture (exact) | $NA = \sqrt{n_1^2 - n_2^2}$ | Step-index fiber. Note it is the square root of the difference of SQUARES; n1 - n2 = 0.015 is not the NA. |
| Numerical aperture (small-Delta) | $NA \approx n_1\sqrt{2\Delta}$ | Valid for Delta << 1 (say under 0.02). Always agrees with the exact form to a fraction of a percent for standard silica fiber. |
| Relative index difference | $\Delta = \dfrac{n_1 - n_2}{n_1}$ | Use as a FRACTION: 1% means Delta = 0.01, not 1. Some texts define it relative to n2; the difference is negligible for small Delta. |
| Acceptance half-angle | $\theta_a = \arcsin(NA)$ | Half-angle of the cone in AIR. The full acceptance cone is 2*theta_a; inside the core the angle is smaller by Snell's law (theta_core = arcsin(NA/n1)). |
| Full acceptance cone | $2\theta_a = 2\arcsin(NA)$ | NA = 0.2116 gives theta_a = 12.2 deg, so the full cone is 24.4 deg. NA = 1 would give 90 deg, the theoretical maximum in air. |
| V number (normalized frequency) | $V = \dfrac{2\pi a}{\lambda}NA$ | a is the core RADIUS, lambda the FREE-SPACE wavelength. Using the 50 um diameter instead of the 25 um radius doubles V and can flip a single-mode design into multimode. |
| Single-mode condition | $V < 2.405$ | 2.405 is the first zero of J0. Above it the LP11 mode propagates and the fiber is multimode. At exactly 2.405 the LP11 mode is at cutoff. |
| Single-mode cutoff wavelength | $\lambda_c = \dfrac{2\pi a\,NA}{2.405}$ | Single-mode for lambda > lambda_c, multimode for lambda < lambda_c. A 25 um-radius, NA = 0.2116 fiber has lambda_c = 13.8 um, so it is multimode at every practical window. |
| Maximum core radius for single-mode | $a_{max} = \dfrac{2.405\lambda}{2\pi\,NA}$ | At lambda = 1.3 um with NA = 0.2116, a_max = 2.35 um (a 4.7 um core diameter). Standard SMF achieves the same by dropping NA to about 0.11. |
| Mode count, step index | $M \approx \dfrac{V^2}{2}$ | Counts both polarisations, valid for large V. V = 25.57 gives M = 327. A single-mode fiber has M = 1 (two polarisations of the same mode). |
| Mode count, graded index | $M \approx \dfrac{V^2}{4} = \dfrac{V^2}{2}\cdot\dfrac{\alpha}{\alpha+2}$ | alpha = 2 for a parabolic profile, alpha -> infinity for step index. Graded index carries half the modes AND equalises their path lengths. |
| Intermodal delay per unit length | $\dfrac{\Delta\tau}{L} \approx \dfrac{n_1\Delta}{c}$ | Step-index only. For n1 = 1.5, Delta = 0.01 this is 50 ns/km — the reason step-index multimode is limited to a few tens of MHz over a kilometre. |

## Interactive Widget

**Fiber NA and Modes**

![[Fiber_NA_and_Modes.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A step-index silica fiber has $n_1 = 1.50$ and $n_2 = 1.485$. Find its numerical aperture, the relative index difference and the acceptance angle in air.

**Given:** n_1 = 1.50; n_2 = 1.485; air input medium

**Solution:**

1. Exact: $NA = \sqrt{n_1^2 - n_2^2} = \sqrt{2.25 - 2.205225} = \sqrt{0.044775} = 0.2116$
2. Relative index difference: $\Delta = (1.50 - 1.485)/1.50 = 0.015/1.50 = 0.01$ (1%)
3. Check the small-$\Delta$ form: $NA \approx n_1\sqrt{2\Delta} = 1.50\sqrt{0.02} = 0.2121$ — agrees to 0.25%
4. Acceptance angle: $\theta_a = \arcsin(0.2116) = 12.2^\circ$, so the full cone is $24.4^\circ$

> [!success]- Answer
> **$NA = 0.2116$, $\Delta = 0.01$, $\theta_a = 12.2^\circ$ (full cone $24.4^\circ$).**

> [!warning] Trap
> Using $n_1 - n_2 = 0.015$ as the NA instead of $\sqrt{n_1^2-n_2^2} = 0.2116$. The NA is more than ten times larger — the index difference enters as a difference of squares.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(1.5²-1.485²)` → NA = **0.2116** — never $n_1-n_2$ = 0.015.
> 2. `(1.5-1.485)÷1.5` → $\Delta$ = **0.0100**; `1.5√(2×0.01)` → **0.2121**, the small-$\Delta$ check.
> 3. `SHIFT` `sin`(0.2116)` in Deg mode → $\theta_a$ = **12.22°**; `×2` → full cone **24.4°**.

### P2. The same fiber has a core radius of 25 µm and is operated at 1.3 µm. Find V and the number of guided modes, and comment on the result for a step-index profile.

**Given:** a = 25 \mu m (radius); \lambda = 1.3 \mu m; NA = 0.2116; step-index profile

**Solution:**

1. $V = (2\pi a/\lambda)NA = (2\pi \times 25/1.3) \times 0.2116$
2. $2\pi \times 25/1.3 = 120.83$, so $V = 120.83 \times 0.2116 = 25.57$
3. Since $V = 25.57 \gg 2.405$ the fiber is strongly multimode
4. Step index: $M \approx V^2/2 = 653.8/2 = 327$ guided modes
5. Graded index for comparison: $M \approx V^2/4 = 163$

> [!success]- Answer
> **$V = 25.57$, $M \approx 327$ modes (step index); $\approx 163$ if graded.**

> [!warning] Trap
> Substituting the 50 µm core diameter for the radius. That doubles V to 51.1, quadruples the mode count to about 1300, and destroys every downstream dispersion estimate.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×25÷1.3×0.2116` → $V$ = **25.57** (radius 25 µm, free-space $\lambda$ = 1.3 µm).
> 2. `Ans²÷2` → $M$ = **327** guided modes for a step-index profile; `÷2` → **163** if graded.

### P3. Design a single-mode fiber for 1.3 µm operation using a core–cladding combination with $NA = 0.2116$. Find the maximum core radius and the resulting cutoff wavelength.

**Given:** \lambda = 1.3 \mu m; NA = 0.2116; single-mode requires V < 2.405

**Solution:**

1. Set $V = 2.405$ at the design wavelength and solve for the radius
2. $a_{max} = 2.405\lambda/(2\pi NA) = (2.405 \times 1.3)/(2\pi \times 0.2116)$
3. Numerator $= 3.1265\ \mu\mathrm{m}$; denominator $= 1.3295$
4. $a_{max} = 2.35\ \mu\mathrm{m}$, i.e. a core diameter of about 4.7 µm
5. That same design has $\lambda_c = 2\pi a NA/2.405 = 1.3\ \mu\mathrm{m}$: single-mode for $\lambda > 1.3\ \mu\mathrm{m}$, multimode below

> [!success]- Answer
> **Core radius $a \le 2.35\ \mu\mathrm{m}$ ($\approx 4.7\ \mu\mathrm{m}$ diameter); $\lambda_c = 1.3\ \mu\mathrm{m}$.**

> [!warning] Trap
> Believing a standard 8–10 µm single-mode core satisfies this design. It does not with $NA = 0.2116$; real SMF reaches the same V by reducing NA to about 0.11, which is why the single-mode core is quoted as 8–10 µm rather than 4.7 µm.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.405×1.3÷(2π×0.2116)` → $a_{max}$ = **2.352** µm radius.
> 2. `×2` → **4.70** µm core diameter.
> 3. `2π×2.352×0.2116÷2.405` → $\lambda_c$ = **1.30** µm, so the design is single-mode only for longer wavelengths.

### P4. A short-reach multimode fiber has $NA = 0.20$ and a 4 µm core radius, and is driven by an 850 nm source. Determine whether it is single-mode or multimode and count the modes.

**Given:** NA = 0.20; a = 4 \mu m; \lambda = 0.85 \mu m

**Solution:**

1. $V = (2\pi a/\lambda)NA = (2\pi \times 4/0.85) \times 0.20$
2. $2\pi \times 4/0.85 = 29.57$, so $V = 29.57 \times 0.20 = 5.91$
3. Compare with the single-mode limit: $5.91 > 2.405$, so the fiber is multimode
4. Mode count: $M \approx V^2/2 = 34.97/2 = 17.5$, i.e. about 18 modes

> [!success]- Answer
> **$V = 5.91$: multimode, with $M \approx 18$ modes.**

> [!warning] Trap
> Declaring the fiber single-mode because the core is small (a 4 µm radius looks like an SMF core). The deciding quantity is V, and this fiber's high NA at a short 850 nm wavelength pushes V well past 2.405.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×4÷0.85×0.20` → $V$ = **5.91** > 2.405, so multimode despite the small 4 µm core.
> 2. `Ans²÷2` → $M$ = **17.5**, i.e. about **18** modes.

## Traps & Exam Notes

- **Using the core diameter instead of the radius in V.** $V = 2\pi a NA/\lambda$ with $a$ the radius. A 50 µm-diameter fiber entered as $a = 50\ \mu\mathrm{m}$ doubles V and quadruples $M = V^2/2$, so a design that should be near cutoff is reported as grossly multimode.
- **Taking $NA = n_1 - n_2$.** $NA = \sqrt{n_1^2-n_2^2}$. For $n_1 = 1.50$, $n_2 = 1.485$ the difference is 0.015 but the NA is 0.2116 — a factor of 14 error that propagates into every V number, mode count and coupling calculation.
- **Entering $\Delta$ as a percentage.** $\Delta = 1\%$ means 0.01 in $NA \approx n_1\sqrt{2\Delta}$. Substituting 1 gives $NA = 1.5\sqrt{2} = 2.12$, an impossible NA greater than 1.
- **Using the wavelength inside the fiber in V.** The definition uses the FREE-SPACE $\lambda$; dividing by $n_1$ first (giving 0.867 µm) inflates V by 50%.
- **Applying the single-mode rule with the wrong inequality direction.** The fiber is single-mode when $V < 2.405$, i.e. at wavelengths LONGER than the cutoff $\lambda_c = 2\pi a NA/2.405$. Longer wavelength → smaller V; confusing this makes a 1550 nm design look multimode and an 850 nm design look single-mode.
- **Using the step-index mode count for a graded-index fiber.** $M \approx V^2/2$ is step index; a parabolic profile carries $M \approx V^2/4$. Quoting 327 modes for a graded fiber that actually holds about 163 doubles the dispersion estimate.
- **Applying the small-$\Delta$ NA approximation outside its range.** $NA \approx n_1\sqrt{2\Delta}$ assumes $\Delta \ll 1$. At $\Delta = 0.05$ (high-NA or plastic fiber) the approximation is several percent off, and for $\Delta$ above about 0.1 it is unusable.
- **Assuming a fiber is effectively single-mode just because it passes the V test.** Bending, microbending and splicing stress convert core modes to radiation modes; a fiber at $V$ just under 2.405 leaks badly in service even though the ideal straight-fiber analysis says one mode.

## See Also

- [[15_Fiber_Attenuation_and_Dispersion]]
- [[16_Optical_Sources,_Detectors_and_Power_Budget]]
- [[09_Cutoff_Frequency_and_Guide_Wavelength]]
- [[08_Waveguide_TE_and_TM_Modes]]

---

[[13_Satellite_Orbits,_Transponders_and_G_-_T|⬅ 13]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[15_Fiber_Attenuation_and_Dispersion|15 ➡]]
