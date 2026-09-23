---
id: EST-05-09
title: "Cutoff Frequency and Guide Wavelength"
part: "04_EST"
area: "05_Transmission_Lines_and_Waveguides"
topic: 9
tier: 2
depth: full
problem_count: 4
prereqs: ["[[08_Waveguide_TE_and_TM_Modes]]"]
tags: ["ece", "est", "transmission_lines_and_waveguides"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Cutoff Frequency and Guide Wavelength

> [!abstract] Scope
> Compute the cutoff wavelength and the guide wavelength of a propagating mode, and explain why the wavelength measured inside a guide is always longer than in free space.

## Core Concept

> [!tip] Intuition
> Inside a guide the wave zig-zags between the walls instead of running straight down the axis. Its axial progress per cycle is therefore longer than one free-space wavelength — the guide stretches the wavelength, and the closer you operate to cutoff the more it stretches.

**Two wavelengths, and they are never equal.** The **cutoff wavelength** $\lambda_c$ is a property of the guide's cross-section and the mode indices alone:
$$\lambda_c = 2/\sqrt{(m/a)^2+(n/b)^2}$$
which for the dominant $\mathrm{TE}_{10}$ mode is simply $\lambda_c = 2a$. The **guide wavelength** $\lambda_g$ is the axial distance between two points of equal phase at the operating frequency. Because the wave must travel obliquely to satisfy the wall boundary conditions, it advances less than one free-space wavelength along $z$ for every free-space wavelength of path length, so $\lambda_g > \lambda_0$ always. The first equivalent form uses the cutoff wavelength:
$$\lambda_g = \lambda_0/\sqrt{1-(\lambda_0/\lambda_c)^2}$$
The second uses the cutoff frequency:
$$\lambda_g = \lambda_0/\sqrt{1-(f_c/f)^2}$$

**Where the formula comes from.** Write the phase constant as a vector:
$$k_0^2 = k_c^2 + \beta^2$$
where $k_0 = 2\pi/\lambda_0$ is the free-space wavenumber, $k_c = 2\pi/\lambda_c$ is the transverse (cutoff) wavenumber, and $\beta = 2\pi/\lambda_g$ is the axial wavenumber. Dividing through gives the cleanest memory aid in the topic:
$$\frac{1}{\lambda_0^2} = \frac{1}{\lambda_c^2} + \frac{1}{\lambda_g^2}$$
Propagation requires $\lambda_0 < \lambda_c$: if the free-space wavelength is longer than the cutoff wavelength, the mode cannot fit and $\beta$ becomes imaginary. Right at cutoff $\lambda_0 = \lambda_c$ and $\lambda_g \to \infty$ — the wave bounces straight across the guide with no axial progress at all.

**The propagating and evanescent regimes.** For $f > f_c$ the square root is real and less than one, so $\lambda_g$ is finite and greater than $\lambda_0$, and the axial phase constant is real:
$$\beta_g = 2\pi/\lambda_g = (2\pi/\lambda_0)\sqrt{1-(f_c/f)^2}$$
so the mode propagates. For $f < f_c$ the square root becomes imaginary: there is no guide wavelength, no $\beta_g$, and the field decays as $e^{-\alpha z}$ with the attenuation constant:
$$\alpha = (2\pi/\lambda_0)\sqrt{(f_c/f)^2-1}$$
A guide can therefore be used below cutoff as a deliberate attenuator, but never as a transmission line. The rate of change of $\lambda_g$ with frequency is the dispersion of the guide: near cutoff $\lambda_g$ changes extremely fast and a modulated signal is badly distorted, which is why practical systems operate at least 20–30 % above $f_c$.

**Everything scales with the filling dielectric.** Filling the guide with a dielectric of relative permittivity $\varepsilon_r$ slows the wave, so the free-space wavelength that appears in the formulas becomes $\lambda_0/\sqrt{\varepsilon_r}$ while $\lambda_c$ (a pure geometry quantity) is untouched. The guide wavelength therefore shrinks by $\sqrt{\varepsilon_r}$ as well. The same substitution changes the cutoff frequency to $f_c/\sqrt{\varepsilon_r}$ but leaves the cutoff *wavelength* alone — a distinction exam questions exploit, since the two statements sound contradictory but are not.

**Why $\lambda_g$ matters practically.** Every impedance calculation inside a guide — a matching stub, a sliding short, a resonator — is expressed in guide wavelengths, not free-space wavelengths. A shorting plunger placed $\lambda_g/4$ from a load presents an open circuit; placed $\lambda_g/2$ it repeats the load impedance. If you substitute $c/f$ instead of $\lambda_g$, the stub lands in the wrong place by a factor that grows without bound as you approach cutoff, which is the classic field failure of this topic.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Cutoff wavelength, general | $\lambda_c = \frac{2}{\sqrt{(m/a)^2 + (n/b)^2}}$ | Geometry only — unaffected by the filling dielectric. |
| Cutoff wavelength, TE10 | $\lambda_c = 2a$ | Broad-wall dimension doubled. The number to remember for WR-90: 4.572 cm. |
| Guide wavelength from wavelengths | $\lambda_g = \frac{\lambda_0}{\sqrt{1-(\lambda_0/\lambda_c)^2}}$ | Valid only when lambda_0 < lambda_c. The denominator must be real. |
| Guide wavelength from frequencies | $\lambda_g = \frac{\lambda_0}{\sqrt{1-(f_c/f)^2}}$ | Equivalent form; often faster when the problem gives GHz. |
| Reciprocal-wavelength identity | $\frac{1}{\lambda_0^2} = \frac{1}{\lambda_c^2} + \frac{1}{\lambda_g^2}$ | One-line check on any answer. If it fails, an arithmetic slip occurred. |
| Axial phase constant | $\beta_g = \frac{2\pi}{\lambda_g} = \frac{2\pi}{\lambda_0}\sqrt{1-(f_c/f)^2}$ | Radians per metre. Real only above cutoff. |
| Phase velocity in the guide | $v_p = \frac{\omega}{\beta_g} = \frac{c}{\sqrt{1-(f_c/f)^2}}$ | Greater than c. Phase, not information, so relativity is not violated. |
| Group velocity in the guide | $v_g = c\sqrt{1-(f_c/f)^2}$ | Less than c. This is the speed of the envelope, energy and information. |
| Velocity product | $v_p\,v_g = c^2$ | Always, for a lossless guide. A quick consistency check on both answers. |
| Evanescent decay below cutoff | $\alpha = \frac{2\pi}{\lambda_0}\sqrt{(\lambda_0/\lambda_c)^2 - 1}$ | Np/m, for f < f_c. No lambda_g exists in this regime. |
| Guide wavelength in a dielectric | $\lambda_g = \frac{\lambda_0/\sqrt{\varepsilon_r}}{\sqrt{1-(f_c/f)^2}}$ | lambda_c is unchanged; only the free-space term shrinks. |
| Quarter-wave stub spacing | $d = \frac{\lambda_g}{4}$ | Use lambda_g, never lambda_0, for any in-guide dimension. |

## Interactive Widget

**Waveguide Cutoff Calculator**

![[Waveguide_Cutoff_Calculator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. WR-90 waveguide ($a = 2.286\ \mathrm{cm}$) carries $\mathrm{TE}_{10}$ at $10\ \mathrm{GHz}$. Find $\lambda_0$, $\lambda_c$, $\lambda_g$ and $\beta_g$.

**Given:** a = 2.286 cm = 0.02286 m; f = 10 GHz; c = 3e8 m/s; TE10: f_c = 6.5617 GHz, lambda_c = 2a = 4.572 cm

**Solution:**

1. Free-space wavelength: $\lambda_0 = c/f = 3\times10^{8}/10^{10} = 0.03\ \mathrm{m} = 3.000\ \mathrm{cm}$
2. Cutoff wavelength: $\lambda_c = 2a = 2(0.02286) = 0.04572\ \mathrm{m} = 4.572\ \mathrm{cm}$
3. Check propagation: $\lambda_0 = 3.000 < \lambda_c = 4.572$, so $\mathrm{TE}_{10}$ propagates
4. Denominator: $\sqrt{1-(\lambda_0/\lambda_c)^2} = \sqrt{1-(3.000/4.572)^2} = \sqrt{1-0.43051} = \sqrt{0.56949} = 0.75461$
5. $\lambda_g = 3.000/0.75461 = 3.976\ \mathrm{cm}$ — longer than $\lambda_0$, as it must be
6. $\beta_g = 2\pi/\lambda_g = 2\pi/0.03976 = 158.0\ \mathrm{rad/m}$
7. Identity check: $1/3.000^2 = 0.11111$ and $1/4.572^2 + 1/3.976^2 = 0.04784 + 0.06327 = 0.11111$

> [!success]- Answer
> **$\lambda_0 = 3.000\ \mathrm{cm}$, $\lambda_c = 4.572\ \mathrm{cm}$, $\lambda_g = 3.976\ \mathrm{cm}$, $\beta_g = 158.0\ \mathrm{rad/m}$.**

> [!warning] Trap
> Reporting $\lambda_g = \lambda_0 = 3\ \mathrm{cm}$ because 'wavelength is c over f'. Inside a guide the axial wavelength is stretched by $1/\sqrt{1-(f_c/f)^2}$, here by 33 %.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `3E8÷1E10 : 2×0.02286 : 0.03÷√(1−(6.5617÷10)²) : 2π÷Ans`
> 2. `=` down the chain: $\lambda_0$ = **0.0300** m → $\lambda_c$ = **0.04572** m → $\lambda_g$ = **0.03976** m → $\beta_g$ = **158.0** rad/m.
>
> `3E8` is `SHIFT` `CVALUE` `28` for $c_0$; the `0.03` in the third statement is $\lambda_0$ from the first.

### P2. The same WR-90 guide operates at $8\ \mathrm{GHz}$. Find $\lambda_0$, $\lambda_g$, $v_p$ and $v_g$.

**Given:** f = 8 GHz; lambda_c = 4.572 cm; f_c = 6.5617 GHz; c = 3e8 m/s

**Solution:**

1. $\lambda_0 = c/f = 3\times10^{8}/8\times10^{9} = 0.0375\ \mathrm{m} = 3.75\ \mathrm{cm}$
2. Denominator: $\sqrt{1-(6.5617/8)^2} = \sqrt{1-0.67284} = \sqrt{0.32716} = 0.57206$
3. $\lambda_g = 3.75/0.57206 = 6.555\ \mathrm{cm}$ — 75 % longer than $\lambda_0$ because 8 GHz is close to the 6.56 GHz cutoff
4. $v_p = c/0.57206 = 5.244\times10^{8}\ \mathrm{m/s}$
5. $v_g = c(0.57206) = 1.716\times10^{8}\ \mathrm{m/s}$
6. Check: $v_p v_g = 5.244\times10^{8} \times 1.716\times10^{8} = 9.00\times10^{16} = c^2$

> [!success]- Answer
> **$\lambda_0 = 3.75\ \mathrm{cm}$, $\lambda_g = 6.56\ \mathrm{cm}$, $v_p = 5.24\times10^{8}\ \mathrm{m/s}$, $v_g = 1.72\times10^{8}\ \mathrm{m/s}$.**

> [!warning] Trap
> Expecting $\lambda_g$ to stay near $\lambda_0$ at every frequency. The stretching factor is strongly frequency-dependent: 1.33 at 10 GHz but 1.75 at 8 GHz in the same guide.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `3E8÷8E9 : √(1−(6.5617÷8)²) : 3E8÷Ans : Ans÷8E9 : 3E8×0.57206`
> 2. `=` down the chain: $\lambda_0$ = **0.0375** m → stretch factor **0.5721** → $v_p$ = **5.244e8** m/s → $\lambda_g$ = **0.06555** m → $v_g$ = **1.716e8** m/s.
>
> The fourth statement is $\lambda_g = v_p/f$; the check is $v_pv_g$ = **9.00e16** = $c^{2}$.

### P3. A guide with $a = 3.00\ \mathrm{cm}$ and $b = 1.50\ \mathrm{cm}$ is fed at $6\ \mathrm{GHz}$. Find the $\mathrm{TE}_{10}$ cutoff frequency, $\lambda_c$, $\lambda_0$ and $\lambda_g$, and state what happens if the frequency is lowered to $4\ \mathrm{GHz}$.

**Given:** a = 0.03 m; b = 0.015 m; f = 6 GHz; c = 3e8 m/s

**Solution:**

1. $\mathrm{TE}_{10}$ cutoff: $f_c = c/(2a) = 3\times10^{8}/0.06 = 5.00\ \mathrm{GHz}$
2. Cutoff wavelength: $\lambda_c = 2a = 6.00\ \mathrm{cm}$
3. Free-space wavelength at 6 GHz: $\lambda_0 = 3\times10^{8}/6\times10^{9} = 5.00\ \mathrm{cm}$
4. Denominator: $\sqrt{1-(5/6)^2} = \sqrt{1-0.69444} = \sqrt{0.30556} = 0.55277$
5. $\lambda_g = 5.00/0.55277 = 9.045\ \mathrm{cm}$; identity check $1/5^2 = 0.04$ and $1/6^2+1/9.045^2 = 0.027778+0.012223 = 0.040001$
6. At 4 GHz, $\lambda_0 = 7.50\ \mathrm{cm} > \lambda_c = 6.00\ \mathrm{cm}$, so $\mathrm{TE}_{10}$ is below cutoff: no propagation, no $\lambda_g$, and the field decays as $e^{-\alpha z}$

> [!success]- Answer
> **$f_c = 5.00\ \mathrm{GHz}$, $\lambda_c = 6.00\ \mathrm{cm}$, $\lambda_0 = 5.00\ \mathrm{cm}$, $\lambda_g = 9.05\ \mathrm{cm}$; at 4 GHz the mode is evanescent (no propagation).**

> [!warning] Trap
> Substituting $f = 4\ \mathrm{GHz}$ into the $\lambda_g$ formula anyway and getting an imaginary or negative-root answer. Below cutoff there is no guide wavelength — the correct answer is 'evanescent'.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `3E8÷0.06 : 2×0.03 : 3E8÷6E9 : 0.05÷√(1−(5÷6)²) : 2π÷Ans`
> 2. `=` down the chain: $f_c$ = **5.00** GHz → $\lambda_c$ = **0.0600** m → $\lambda_0$ = **0.0500** m → $\lambda_g$ = **0.09045** m → $\beta_g$ = **69.5** rad/m.
> 3. The follow-up: `3E8÷4E9` → **0.0750** m, longer than $\lambda_c$ = 0.060 m, so at 4 GHz the mode is evanescent and no $\lambda_g$ exists.

### P4. For WR-90 ($a = 2.286\ \mathrm{cm}$, $b = 1.016\ \mathrm{cm}$) at $12\ \mathrm{GHz}$: find the $\mathrm{TE}_{10}$ guide wavelength, confirm that $\mathrm{TE}_{20}$ cannot propagate, and give $\lambda_c$ for $\mathrm{TE}_{20}$.

**Given:** f = 12 GHz; a = 0.02286 m; b = 0.01016 m; TE10 f_c = 6.5617 GHz

**Solution:**

1. $\lambda_0 = c/f = 3\times10^{8}/12\times10^{9} = 0.025\ \mathrm{m} = 2.500\ \mathrm{cm}$
2. $\mathrm{TE}_{10}$: $\sqrt{1-(6.5617/12)^2} = \sqrt{1-0.29898} = \sqrt{0.70102} = 0.83726$
3. $\lambda_g = 2.500/0.83726 = 2.986\ \mathrm{cm}$ (only 19 % longer than free space — well above cutoff)
4. $\mathrm{TE}_{20}$ cutoff wavelength: $\lambda_c = 2/\sqrt{(2/a)^2} = a = 2.286\ \mathrm{cm}$, giving $f_c = c/a = 13.12\ \mathrm{GHz}$
5. Since 12 GHz $<$ 13.12 GHz, $\mathrm{TE}_{20}$ is below its cutoff and does not propagate; the guide is still single-mode at 12 GHz

> [!success]- Answer
> **$\lambda_g = 2.986\ \mathrm{cm}$ for $\mathrm{TE}_{10}$; $\lambda_{c,\mathrm{TE}_{20}} = a = 2.286\ \mathrm{cm}$ with $f_c = 13.12\ \mathrm{GHz}$, so $\mathrm{TE}_{20}$ does not propagate at 12 GHz.**

> [!warning] Trap
> Using $\lambda_c = 2a$ for $\mathrm{TE}_{20}$. The factor 2 belongs to $\mathrm{TE}_{10}$ only; for $\mathrm{TE}_{20}$ the cutoff wavelength collapses to $a$, which is why the single-mode band tops out at $c/a$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `3E8÷12E9 : √(1−(6.5617÷12)²) : 0.025÷Ans : 3E8÷0.02286`
> 2. `=` down the chain: $\lambda_0$ = **0.0250** m → stretch factor **0.8373** → $\lambda_g$ = **0.02986** m = **2.986** cm → $f_{c,\mathrm{TE}_{20}}$ = **13.12** GHz.
>
> For $\mathrm{TE}_{20}$ the cutoff wavelength is $a = 2.286$ cm, not $2a$; 12 GHz is below its 13.12 GHz cutoff.

## Traps & Exam Notes

- **Using $\lambda_0 = c/f$ as the in-guide wavelength.** This is the single most common waveguide error. Any distance measured *along* a guide — stub spacing, resonator length, phase shift — must use $\lambda_g = \lambda_0/\sqrt{1-(f_c/f)^2}$, which is always larger than $\lambda_0$.
- **Applying the $\lambda_g$ formula below cutoff.** When $\lambda_0 > \lambda_c$ the square root is imaginary: there is no propagating wave and no guide wavelength. Reporting a complex $\lambda_g$ as a distance is a category error; the correct statement is that the mode is evanescent and decays as $e^{-\alpha z}$.
- **Using $\lambda_c = 2a$ for modes other than $\mathrm{TE}_{10}$.** $\lambda_{c,\mathrm{TE}_{20}} = a$ and $\lambda_{c,\mathrm{TE}_{01}} = 2b$. Plugging $2a$ into a higher mode underestimates its cutoff frequency by half and hides the fact that the guide has gone multimode.
- **Mixing wavelength and frequency forms of the denominator.** $\sqrt{1-(\lambda_0/\lambda_c)^2}$ and $\sqrt{1-(f_c/f)^2}$ are the same number only if both ratios are formed consistently. Writing $\sqrt{1-(\lambda_0/\lambda_c)}$ (no square) or $\sqrt{1-(f_c/f)}$ gives a wrong stretch factor that still looks numeric.
- **Forgetting that $\lambda_c$ does not change with the dielectric.** Filling the guide with $\varepsilon_r$ divides the *frequency* cutoffs by $\sqrt{\varepsilon_r}$ but leaves every cutoff wavelength untouched. Applying the $\sqrt{\varepsilon_r}$ factor to $\lambda_c$ in the $\lambda_g$ formula double-counts the dielectric.
- **Assuming $\beta_g = 2\pi f/c$.** The in-guide phase constant is smaller than the free-space one by exactly the stretch factor, $\beta_g = (2\pi/\lambda_0)\sqrt{1-(f_c/f)^2}$. Using $2\pi f/c$ makes $v_p$ come out equal to $c$, which contradicts $v_p > c$.
- **Rounding $f_c$ too early.** Using $f_c = 6.5\ \mathrm{GHz}$ instead of 6.5617 GHz shifts the 8 GHz stretch factor from 0.5721 to 0.5830 and moves $\lambda_g$ from 6.56 cm to 6.43 cm — a 2 % error that is exactly the width of a multiple-choice distractor.

## See Also

- [[08_Waveguide_TE_and_TM_Modes]]
- [[10_Phase_and_Group_Velocity]]
- [[07_Stub_Matching]]

---

[[08_Waveguide_TE_and_TM_Modes|⬅ 08]] · [[_MOC_Transmission_Lines_and_Waveguides|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Phase_and_Group_Velocity|10 ➡]]
