---
id: EST-05-10
title: "Phase and Group Velocity"
part: "04_EST"
area: "05_Transmission_Lines_and_Waveguides"
topic: 10
tier: 2
depth: full
problem_count: 4
prereqs: ["[[09_Cutoff_Frequency_and_Guide_Wavelength]]"]
tags: ["ece", "est", "transmission_lines_and_waveguides"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Phase and Group Velocity

> [!abstract] Scope
> Distinguish phase velocity from group velocity, compute both on a TEM line and inside a rectangular guide, and use the group velocity to find pulse delay.

## Core Concept

> [!tip] Intuition
> A pure sine wave has only a phase velocity — the speed at which a crest slides along. A real signal is a packet of many frequencies, and the packet itself travels at the group velocity, which is also the speed of energy and information. In free space the two coincide; in a waveguide they do not.

**Two definitions, two different questions.** The phase velocity is the speed at which a point of constant phase moves: $v_p = \omega/\beta$, where $\beta$ is the phase constant in radians per metre. The group velocity is the speed at which the *envelope* of a modulated wave moves:
$$v_g = d\omega/d\beta$$
The distinction only becomes visible when $\beta$ is a nonlinear function of $\omega$. If $\beta$ is proportional to $\omega$ — a straight line through the origin — then $d\omega/d\beta = \omega/\beta$ and the two velocities are identical. That is precisely the TEM case.

**TEM lines are non-dispersive.** On a coaxial cable or twin-lead, the primary constants fix both the phase constant and the velocity (using $\mu_r = 1$). The phase constant is the first:
$$\beta = \omega\sqrt{LC}$$
The velocity follows from it:
$$v_p = v_g = 1/\sqrt{LC} = c/\sqrt{\varepsilon_r}$$
Because the velocity is the same for every frequency, a pulse made of many frequencies keeps its shape as it travels — the line is **non-dispersive**. This is the practical reason coax is preferred for wideband pulse work while waveguide is preferred for high-power narrowband work.

**A rectangular guide is dispersive, and that is the whole point.** Inside a guide $\beta_g = (\omega/c)\sqrt{1-(f_c/f)^2}$, which is decidedly not proportional to $\omega$. Differentiating gives a group velocity below $c$ while the phase velocity rises above it:
$$v_p = c/\sqrt{1-(f_c/f)^2} > c$$
and $v_g = c\sqrt{1-(f_c/f)^2} < c$, with the beautiful and exam-critical product $v_p v_g = c^2$. A pure sinusoid really does have a phase velocity above the speed of light, and nothing is violated: the phase velocity describes the motion of a mathematical point of constant phase, not of energy, matter or information. The energy always travels at $v_g < c$.

**Behaviour near and below cutoff.** As $f \to f_c^{+}$ the factor $\sqrt{1-(f_c/f)^2} \to 0$, so $v_g \to 0$ and $v_p \to \infty$. The guide becomes infinitely dispersive: a pulse spread across even a modest bandwidth arrives smeared beyond recognition, and the group delay per metre $1/v_g$ blows up. For $f < f_c$ there is no propagation at all — the mode is evanescent and $\beta$ is imaginary, so neither velocity is meaningful (the field simply decays as $e^{-\alpha z}$). Practical systems therefore operate well clear of cutoff, typically 20 % or more above $f_c$, which is exactly where $v_g$ is still close to $c$.

**Useful equivalent forms and the delay budget.** Since $v_p v_g = c^2$ you can always get the group velocity from the phase velocity, $v_g = c^2/v_p$. Substituting the guide-wavelength expression gives $v_g = c\,\lambda_0/\lambda_g$, which is the form to use when a problem hands you wavelengths. The group delay per unit length is $\tau' = 1/v_g$, always larger inside a guide than the free-space value $1/c$. For WR-90 at 10 GHz, $v_g = 2.264\times10^{8}\ \mathrm{m/s}$ so a 10 m run delays a pulse by 44.2 ns against 33.3 ns in free space — an extra 10.8 ns, equivalent to 3.25 m of extra free-space path. That difference is not negligible in a timing or ranging budget.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Phase velocity, definition | $v_p = \frac{\omega}{\beta}$ | Speed of a point of constant phase. Can exceed c; carries no information. |
| Group velocity, definition | $v_g = \frac{d\omega}{d\beta}$ | Speed of the envelope, of energy and of information. Never exceeds c. |
| TEM line velocity | $v_p = v_g = \frac{1}{\sqrt{LC}}$ | From the primary constants; independent of frequency, so a TEM line is non-dispersive. |
| TEM line with dielectric | $v_p = v_g = \frac{c}{\sqrt{\varepsilon_r}}$ | For polyethylene eps_r = 2.25 this gives 2e8 m/s. Add mu_r if the problem supplies it. |
| Guide phase velocity | $v_p = \frac{c}{\sqrt{1-(f_c/f)^2}}$ | Greater than c. Approaches infinity as f approaches f_c from above. |
| Guide group velocity | $v_g = c\sqrt{1-(f_c/f)^2}$ | Less than c. Zero at cutoff. Use this for delay, energy and pulse timing. |
| Velocity product | $v_p\,v_g = c^2$ | Lossless guide, any mode. The fastest consistency check on both answers. |
| Group velocity from phase velocity | $v_g = \frac{c^2}{v_p}$ | Follows from the product. Handy when v_p was computed first. |
| Group velocity from wavelengths | $v_g = c\,\frac{\lambda_0}{\lambda_g}$ | Since lambda_0/lambda_g < 1, this is automatically below c. |
| Group delay per unit length | $\tau' = \frac{1}{v_g} = \frac{1}{c\sqrt{1-(f_c/f)^2}}$ | Seconds per metre. Always larger in a guide than the free-space 1/c. |
| Total group delay | $t_d = \frac{L}{v_g}$ | For a guide of physical length L. Free-space comparison is L/c. |
| Near-cutoff limits | $f\to f_c^{+}: \quad v_g\to 0, \quad v_p\to\infty$ | Infinite dispersion. Below f_c there is no propagation and no velocity. |

## Worked Problems

### P1. WR-90 waveguide ($a = 2.286\ \mathrm{cm}$, $f_{c,\mathrm{TE}_{10}} = 6.5617\ \mathrm{GHz}$) operates at $10\ \mathrm{GHz}$. Find $v_p$, $v_g$ and verify their product.

**Given:** f = 10 GHz; f_c = 6.5617 GHz; c = 3e8 m/s; TE10 mode

**Solution:**

1. Compute the stretch factor: $\sqrt{1-(f_c/f)^2} = \sqrt{1-(6.5617/10)^2} = \sqrt{1-0.43056} = \sqrt{0.56944}$
2. $= 0.75462$
3. Phase velocity: $v_p = c/0.75462 = 3\times10^{8}/0.75462 = 3.976\times10^{8}\ \mathrm{m/s}$ (greater than $c$)
4. Group velocity: $v_g = c \times 0.75462 = 2.264\times10^{8}\ \mathrm{m/s}$ (less than $c$)
5. Product: $v_p v_g = 3.976\times10^{8} \times 2.264\times10^{8} = 9.00\times10^{16} = c^2$ — checks out
6. Cross-check with the alternative form: $\lambda_0 = 3\ \mathrm{cm}$, $\lambda_g = 3/0.75462 = 3.976\ \mathrm{cm}$, $v_g = c\lambda_0/\lambda_g = 3\times10^{8}(3/3.976) = 2.264\times10^{8}\ \mathrm{m/s}$

> [!success]- Answer
> **$v_p = 3.98\times10^{8}\ \mathrm{m/s}$, $v_g = 2.26\times10^{8}\ \mathrm{m/s}$, and $v_p v_g = 9.00\times10^{16} = c^2$.**

> [!warning] Trap
> Reporting $v_p$ as the signal speed. The phase velocity exceeds $c$ by 33 % here and would suggest superluminal communication; the information travels at $v_g = 0.755c$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(1−(6.5617÷10)²) : 3E8÷Ans : 9E16÷Ans`
> 2. `=`: stretch factor **0.7546** → $v_p$ = **3.976e8** m/s → $v_g$ = **2.264e8** m/s, the second obtained from $v_g = c^{2}/v_p$.
>
> `3E8` is `SHIFT` `CVALUE` `28` for $c_0$; the `9E16` is the $v_pv_g = c^{2}$ check built into the chain.

### P2. A 10 m length of the same WR-90 guide carries a pulse at $10\ \mathrm{GHz}$. Find the group delay, compare it with the free-space delay over the same distance, and express the excess as an equivalent free-space length.

**Given:** L = 10 m; v_g = 2.264e8 m/s; c = 3e8 m/s; f = 10 GHz, f_c = 6.5617 GHz

**Solution:**

1. Group delay in the guide: $t_d = L/v_g = 10/2.264\times10^{8} = 4.417\times10^{-8}\ \mathrm{s} = 44.2\ \mathrm{ns}$
2. Free-space delay: $t_0 = L/c = 10/3\times10^{8} = 3.333\times10^{-8}\ \mathrm{s} = 33.3\ \mathrm{ns}$
3. Excess delay: $44.2 - 33.3 = 10.8\ \mathrm{ns}$
4. Equivalent extra free-space path: $\Delta L = c\,\Delta t = 3\times10^{8} \times 10.8\times10^{-9} = 3.25\ \mathrm{m}$
5. Per unit length the guide costs $1/v_g = 4.417\ \mathrm{ns/m}$ against $3.333\ \mathrm{ns/m}$ in free space

> [!success]- Answer
> **Guide delay $44.2\ \mathrm{ns}$ vs free-space $33.3\ \mathrm{ns}$ — an excess of $10.8\ \mathrm{ns}$, equivalent to $3.25\ \mathrm{m}$ of extra free-space path.**

> [!warning] Trap
> Using $L/c$ for the in-guide delay. The pulse travels at the group velocity, which is 24.5 % slower than $c$ at 10 GHz in WR-90; the error is 10.8 ns over just 10 m.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10÷2.264E8 : 10÷3E8` → **44.17** ns in the guide → **33.33** ns in free space.
> 2. `10÷2.264E8−10÷3E8 : Ans×1E9 : Ans×1E-9×3E8` → **1.084e-8** s → **10.84** ns → **3.25** m of extra free-space path.
>
> Group delay uses $v_g$ — never $v_p$, and never $c$, inside a guide.

### P3. A coaxial cable has polyethylene dielectric with $\varepsilon_r = 2.25$ and is $10\ \mathrm{m}$ long. Find $v_p$ and $v_g$, the delay for a pulse, the wavelength at $1\ \mathrm{GHz}$, and say whether a pulse is distorted.

**Given:** eps_r = 2.25; L = 10 m; f = 1 GHz; c = 3e8 m/s; mu_r = 1

**Solution:**

1. TEM line: $v_p = v_g = c/\sqrt{\varepsilon_r} = 3\times10^{8}/\sqrt{2.25} = 3\times10^{8}/1.5 = 2.00\times10^{8}\ \mathrm{m/s}$
2. Delay: $t_d = L/v = 10/2\times10^{8} = 5.0\times10^{-8}\ \mathrm{s} = 50.0\ \mathrm{ns}$
3. Wavelength on the line: $\lambda = v/f = 2\times10^{8}/1\times10^{9} = 0.20\ \mathrm{m} = 20\ \mathrm{cm}$
4. Because $\beta = \omega\sqrt{LC}$ is linear in $\omega$, $v_p$ is the same at every frequency: the line is non-dispersive
5. So a pulse of any reasonable bandwidth keeps its shape; only amplitude loss and a fixed 50 ns delay are added
6. Contrast: an air-filled coax would give $v = 3\times10^{8}$ and 33.3 ns, while a $\mathrm{TE}_{10}$ guide at 10 GHz would give a frequency-dependent delay

> [!success]- Answer
> **$v_p = v_g = 2.00\times10^{8}\ \mathrm{m/s}$, delay $50.0\ \mathrm{ns}$, $\lambda = 20\ \mathrm{cm}$; the line is non-dispersive, so the pulse shape is preserved.**

> [!warning] Trap
> Using $c = 3\times10^{8}\ \mathrm{m/s}$ on a dielectric-filled line and reporting 33.3 ns. The velocity is reduced by $\sqrt{\varepsilon_r} = 1.5$, a 50 % error in delay.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3E8÷√2.25` → **2.00e8** m/s: on a TEM line $v_p = v_g = c/\sqrt{\varepsilon_r}$, the same at every frequency.
> 2. `10÷Ans` → **5.00e-8** s = **50.0** ns for the 10 m run (an air line would give 33.3 ns).
> 3. `2.00E8÷1E9` → **0.200** m = **20.0** cm wavelength on the line; $\beta$ linear in $\omega$ means no dispersion, so the pulse keeps its shape.

### P4. The same WR-90 guide is now driven at $7\ \mathrm{GHz}$, close to its $6.5617\ \mathrm{GHz}$ cutoff. Find $v_g$, $v_p$, $\lambda_g$ and the group delay per metre, and contrast with the 10 GHz values.

**Given:** f = 7 GHz; f_c = 6.5617 GHz; c = 3e8 m/s; 10 GHz reference: v_g = 2.264e8 m/s, v_p = 3.976e8 m/s

**Solution:**

1. Stretch factor: $\sqrt{1-(6.5617/7)^2} = \sqrt{1-0.87869} = \sqrt{0.12131} = 0.34829$
2. Group velocity: $v_g = 3\times10^{8} \times 0.34829 = 1.045\times10^{8}\ \mathrm{m/s}$ — less than half the 10 GHz value
3. Phase velocity: $v_p = c/0.34829 = 8.613\times10^{8}\ \mathrm{m/s}$ — nearly three times $c$
4. Product check: $8.613\times10^{8} \times 1.045\times10^{8} = 9.00\times10^{16} = c^2$
5. Guide wavelength: $\lambda_0 = 3\times10^{8}/7\times10^{9} = 4.286\ \mathrm{cm}$, $\lambda_g = 4.286/0.34829 = 12.31\ \mathrm{cm}$; equivalently $v_g = c\lambda_0/\lambda_g$ gives the same result
6. Group delay per metre: $1/v_g = 1/1.045\times10^{8} = 9.57\ \mathrm{ns/m}$ against 4.42 ns/m at 10 GHz — over twice the delay for the same hardware

> [!success]- Answer
> **$v_g = 1.04\times10^{8}\ \mathrm{m/s}$, $v_p = 8.61\times10^{8}\ \mathrm{m/s}$, $\lambda_g = 12.3\ \mathrm{cm}$, group delay $9.57\ \mathrm{ns/m}$; the guide is highly dispersive this close to cutoff.**

> [!warning] Trap
> Assuming the guide delays a pulse by the same amount at every frequency above cutoff. Delay per metre rises from 4.42 ns at 10 GHz to 9.57 ns at 7 GHz — the stretch factor, not the physical length, sets the delay.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(1−(6.5617÷7)²) : Ans×3E8 : 1E9÷Ans`
> 2. `=`: stretch factor **0.3483** → $v_g$ = **1.045e8** m/s → group delay **9.57** ns/m — more than double the 4.42 ns/m at 10 GHz.
> 3. `9E16÷(3E8×0.34829)` → **8.61e8** m/s ($v_p = c^{2}/v_g$); `Ans÷7E9` → **0.1230** m = **12.3** cm ($\lambda_g = v_p/f$, against $\lambda_0$ = 4.286 cm).

## Traps & Exam Notes

- **Concluding that $v_p > c$ violates relativity.** The phase velocity is the speed of a mathematical point of constant phase and carries no energy or information. The group velocity, which does carry the signal, obeys $v_g = c^2/v_p < c$ in a guide. Only $v_g$ (and the front velocity) is bounded by $c$.
- **Using $v_p$ for delay or pulse timing.** Group delay is $L/v_g$, never $L/v_p$. At 10 GHz in WR-90 $v_p = 3.98\times10^{8}\ \mathrm{m/s}$ but $v_g = 2.26\times10^{8}\ \mathrm{m/s}$; using the phase velocity under-reports the delay by 25 %.
- **Treating a rectangular guide as non-dispersive.** Because $\beta_g = (\omega/c)\sqrt{1-(f_c/f)^2}$ is not linear in $\omega$, different frequencies travel at different group velocities. A wideband pulse in a long guide smears; the effect explodes as $f \to f_c$.
- **Forgetting $\sqrt{\varepsilon_r}$ on a dielectric-filled TEM line.** $v = c$ is the vacuum value. Polyethylene gives $c/1.5 = 2\times10^{8}\ \mathrm{m/s}$, so every delay and wavelength on the line is off by 50 % if you use $c$.
- **Quoting a group velocity at or below cutoff.** At $f = f_c$, $v_g = 0$ and $v_p$ diverges; below $f_c$ neither velocity exists because there is no propagating wave. The physical statement is that the mode is evanescent with decay constant $\alpha$.
- **Mixing up which velocity belongs to the guide and which to the line.** A TEM line has $v_p = v_g$; a guide has $v_p > c > v_g$. Writing $v_g = c/\sqrt{1-(f_c/f)^2}$ for a guide inverts the answer and produces a superluminal signal speed.
- **Ignoring the dispersion when comparing two guides.** Two runs of the same physical length but different frequencies do not have equal delay. At 7 GHz WR-90 costs 9.57 ns/m versus 4.42 ns/m at 10 GHz — more than double for the same pipe.

## See Also

- [[09_Cutoff_Frequency_and_Guide_Wavelength]]
- [[08_Waveguide_TE_and_TM_Modes]]
- [[03_Lossless_and_Distortionless_Lines]]

---

[[09_Cutoff_Frequency_and_Guide_Wavelength|⬅ 09]] · [[_MOC_Transmission_Lines_and_Waveguides|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
