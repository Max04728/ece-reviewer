---
id: EST-05-03
title: "Lossless and Distortionless Lines"
part: "04_EST"
area: "05_Transmission_Lines_and_Waveguides"
topic: 3
tier: 2
depth: full
problem_count: 4
prereqs: ["[[02_Secondary_Constants_Z0_and_Gamma]]"]
tags: ["ece", "est", "transmission_lines_and_waveguides"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Lossless and Distortionless Lines

> [!abstract] Scope
> Decide whether a line preserves the shape of a pulse — the lossless idealisation and the Heaviside $R/L = G/C$ condition — and compute the attenuation, phase constant and velocity that follow.

## Core Concept

> [!tip] Intuition
> Shape survives when every frequency component travels at the same speed and is attenuated by the same amount per metre. The lossless line is the extreme case (no attenuation at all); the distortionless line is the realistic one, and it is a *condition on the ratios* of the primary constants, not on their sizes.

**Lossless: the clean idealisation.** Setting $R = G = 0$ gives $Z_0 = \sqrt{L/C}$ (real), $\gamma = j\omega\sqrt{LC}$, hence $\alpha = 0$ and $\beta = \omega\sqrt{LC}$. Because $\beta$ is exactly proportional to $\omega$, the group delay per metre $d\beta/d\omega = \sqrt{LC}$ is a constant and $v = 1/\sqrt{LC}$ for every component. A pulse therefore arrives attenuated not at all and smeared not at all. This model is exact enough for computing $Z_{\mathrm{in}}$, reflection coefficients and stub lengths on short, low-loss runs, but it silently throws away the level budget.

**Distortionless: preserving shape while losing power.** Heaviside's condition is $R/L = G/C$. Write $k = R/L = G/C$; then $R + j\omega L = L(k + j\omega)$ and $G + j\omega C = C(k + j\omega)$, so $zy = LC(k+j\omega)^{2}$ and the propagation constant becomes:
$$\gamma = \sqrt{LC}\,(k + j\omega) = \sqrt{RG} + j\omega\sqrt{LC}$$
Both constants come out clean: $\alpha = \sqrt{RG}$ is **independent of frequency**, $\beta = \omega\sqrt{LC}$ stays linear, and $Z_0 = \sqrt{L/C}$ stays real and frequency-flat. Uniform attenuation plus linear phase is exactly what a distortionless channel needs — amplitude scaling without dispersion.

**Why the condition is a ratio, and how it is repaired.** $R/L$ and $G/C$ both have units of $\mathrm{s}^{-1}$, so the condition compares two *rates*, not two components: a line with $R = 10\ \Omega/\mathrm{m}$ and $G = 40\ \mu\mathrm{S/m}$ is not thereby distortionless, since $R/L = 4\times10^{7}\ \mathrm{s^{-1}}$ while $G/C = 4\times10^{5}\ \mathrm{s^{-1}}$. Two repairs exist: raise $G$ to $CR/L$, or raise $L$ to $RC/G$. The second is what real loading coils do, and it is the only one used in practice — adding series inductance *reduces* loss, whereas raising $G$ increases it. The classic result for the attenuation is:
$$\alpha^{2} = \tfrac{1}{2}[\sqrt{(R^{2}+\omega^{2}L^{2})(G^{2}+\omega^{2}C^{2})} + RG - \omega^{2}LC]$$
which has its minimum over $L$ exactly at $L = RC/G$, confirming the Heaviside condition is also the minimum-attenuation condition, not merely a phase condition.

**The price of loading, and what dispersion looks like.** Making a line distortionless by raising $L$ changes everything else: $Z_0 = \sqrt{L/C}$ rises with $L$ and $v = 1/\sqrt{LC}$ falls. Raising $L$ from 250 nH/m to 25 $\mu$H/m, for instance, cuts $\alpha$ from about 0.10 Np/m to 0.02 Np/m at 100 MHz but moves $Z_0$ from 50 $\Omega$ to 500 $\Omega$ and slows the line from $2\times10^{8}$ to $2\times10^{7}$ m/s. A line that is neither lossless nor distortionless has $\beta$ that is *not* linear in $\omega$: for the un-repaired example above, $\beta = 0.0590$ rad/m at 1 MHz and $3.143$ rad/m at 100 MHz, so the implied velocity rises from $1.065\times10^{8}$ to $1.999\times10^{8}$ m/s. Low frequencies crawl, high frequencies race ahead, and a rectangular pulse acquires a rounded, trailing edge.

**When to use which model.** Use the lossless model whenever the question is about impedance, reflection or matching on a short line — the error in $\beta$ is negligible and the algebra is far simpler. Use the distortionless model when the question is about pulse shape, group delay or why telephone companies wound loading coils onto their pairs. Use the exact complex $\gamma$ when the question gives you all four primary constants and asks for $\alpha$; and never mix the two, because the lossless $\alpha = 0$ and the distortionless $\alpha = \sqrt{RG}$ are answers to different questions.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Heaviside distortionless condition | $\frac{R}{L} = \frac{G}{C}$ | Both sides are $\mathrm{s^{-1}}$. Test the ratios, never $R$ against $G$ or $L$ against $C$. |
| Distortionless propagation constant | $\gamma = \sqrt{RG} + j\omega\sqrt{LC}$ | Per metre. $\alpha$ is constant in $f$; $\beta$ is still exactly linear in $\omega$. |
| Distortionless attenuation | $\alpha = \sqrt{RG} = \frac{R}{Z_0} = G Z_0$ | Np/m, frequency independent. Non-zero — distortionless is not lossless. |
| Distortionless characteristic impedance | $Z_0 = \sqrt{\frac{L}{C}} = \sqrt{\frac{R}{G}}$ | Real and constant in $f$; equal to both expressions only under the Heaviside condition. |
| Lossless line | $R = 0,\ G = 0$ | The $\alpha = 0$ special case: no loss mechanism at all. |
| Lossless propagation constant | $\gamma = j\beta = j\omega\sqrt{LC}, \qquad \alpha = 0$ | Nothing decays, so the line only rotates phase. |
| Phase constant | $\beta = \omega\sqrt{LC} = \frac{2\pi}{\lambda}$ | rad/m. Linear in $\omega$ is the whole point: it makes $v$ constant. |
| Velocity and group delay | $v = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{\mu\varepsilon}}, \qquad \frac{d\beta}{d\omega} = \sqrt{LC}$ | Equal in the lossless and distortionless cases, so a pulse keeps its shape. |
| Electrical length from wavelength | $\lambda = \frac{v}{f} = \frac{2\pi}{\beta}$ | Use $v$, not $c$, when the dielectric is not air. |
| General attenuation constant | $\alpha^{2} = \tfrac{1}{2}\left[\sqrt{(R^{2}+\omega^{2}L^{2})(G^{2}+\omega^{2}C^{2})} + RG - \omega^{2}LC\right]$ | Exact for any line; use it when $R$ is not small compared with $\omega L$. |
| Minimum-attenuation (loading) condition | $L = \frac{RC}{G}, \qquad \alpha_{\min} = \sqrt{RG}$ | Minimises $\alpha$ at the operating frequency. Raises $Z_0 = \sqrt{L/C}$ and lowers $v$. |

## Worked Problems

### P1. A line has $R = 10\ \Omega/\mathrm{m}$, $L = 250\ \mathrm{nH/m}$, $G = 40\ \mu\mathrm{S/m}$, $C = 100\ \mathrm{pF/m}$. Is it distortionless? If not, find the $G$ and the $L$ that would make it so.

**Given:** R = 10 Ω/m; L = 250 nH/m; G = 40 μS/m; C = 100 pF/m

**Solution:**

1. $R/L = 10/2.5\times10^{-7} = 4.0\times10^{7}\ \mathrm{s^{-1}}$
2. $G/C = 4.0\times10^{-5}/1.0\times10^{-10} = 4.0\times10^{5}\ \mathrm{s^{-1}}$ — a factor 100 smaller, so the line is **not** distortionless and a pulse will smear
3. Repair by raising $G$: $G = C\,R/L = (10^{-10})(4.0\times10^{7}) = 4.0\times10^{-3}\ \mathrm{S/m} = 4\ \mathrm{mS/m}$
4. Repair by raising $L$: $L = R\,C/G = (10)(10^{-10})/(4.0\times10^{-5}) = 2.5\times10^{-5}\ \mathrm{H/m} = 25\ \mathrm{\mu H/m}$

> [!success]- Answer
> **Not distortionless ($R/L$ exceeds $G/C$ by $100\times$). Either $G = 4\ \mathrm{mS/m}$ or $L = 25\ \mathrm{\mu H/m}$ satisfies the condition.**

> [!warning] Trap
> Comparing $R = 10\ \Omega/\mathrm{m}$ with $G = 40\ \mu\mathrm{S/m}$ directly, or $L$ with $C$. The two sides of the condition are rates with units $\mathrm{s^{-1}}$; the raw components have different units and their ratio is meaningless. The condition is satisfied when $L$ is raised by $100\times$, not by 2.5.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10÷250E-9 : 40E-6÷100E-12` → **4.0e7** s⁻¹ → **4.0e5** s⁻¹: the ratio is **100**, so the line is not distortionless.
> 2. The two repairs: `10÷250E-9×1E-10` → **4.0e-3** S/m (= 4 mS/m); `10×1E-10÷40E-6` → **2.5e-5** H/m (= 25 µH/m).
>
> The condition compares the rates $R/L$ and $G/C$, never $R$ against $G$.

### P2. Make the line of the previous problem distortionless by increasing its inductance to $L = 25\ \mathrm{\mu H/m}$. Find $\alpha$, $Z_0$, $v$ and $\beta$ at 100 MHz, and state what the repair costs.

**Given:** R = 10 Ω/m; G = 40 μS/m; C = 100 pF/m; new L = 25 μH/m; f = 100 MHz

**Solution:**

1. Condition check: $R/L = 10/2.5\times10^{-5} = 4.0\times10^{5} = G/C$ ✓
2. $\alpha = \sqrt{RG} = \sqrt{(10)(4.0\times10^{-5})} = \sqrt{4.0\times10^{-4}} = 0.02\ \mathrm{Np/m} = 0.174\ \mathrm{dB/m}$
3. $Z_0 = \sqrt{L/C} = \sqrt{2.5\times10^{-5}/1.0\times10^{-10}} = \sqrt{2.5\times10^{5}} = 500\ \Omega$ — not the 50 $\Omega$ of the unloaded line
4. $v = 1/\sqrt{LC} = 1/\sqrt{(2.5\times10^{-5})(10^{-10})} = 2.0\times10^{7}\ \mathrm{m/s}$, i.e. $\mathrm{VF} = 0.067$
5. $\beta = \omega\sqrt{LC} = (6.283\times10^{8})(5.0\times10^{-8}) = 31.4\ \mathrm{rad/m}$

> [!success]- Answer
> **$\alpha = 0.02\ \mathrm{Np/m}$ ($0.174$ dB/m), $Z_0 = 500\ \Omega$, $v = 2.0\times10^{7}\ \mathrm{m/s}$, $\beta = 31.4\ \mathrm{rad/m}$. Shape is preserved, but the line is now a 500 $\Omega$ line running at 6.7% of $c$.**

> [!warning] Trap
> Reporting $Z_0 = 50\ \Omega$ and $v = 2\times10^{8}$ m/s out of habit. Both were computed with the *old* $L$; $Z_0 = \sqrt{L/C}$ grows as $\sqrt{L}$ and $v = 1/\sqrt{LC}$ falls as $1/\sqrt{L}$. Loading coils fix the shape but wreck the impedance match and the delay.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Condition check first: `10÷2.5E-5` → **4.0e5** s⁻¹, equal to `40E-6÷100E-12` = **4.0e5** ✓.
> 2. `√(10×40E-6) : √(2.5E-5÷1E-10) : 1÷√(2.5E-5×1E-10)` → $\alpha$ = **0.02** Np/m → $Z_0$ = **500** Ω → $v$ = **2.0e7** m/s.
> 3. `6.2832E8×√(2.5E-5×1E-10)` → **31.4** rad/m; `0.02×8.686` → **0.174** dB/m.

### P3. Make the same line distortionless by increasing its conductance to $G = 4\ \mathrm{mS/m}$ instead. Find $\alpha$ in Np/m and dB/m, and the loss over 100 m. Compare with the inductance repair.

**Given:** R = 10 Ω/m; L = 250 nH/m; C = 100 pF/m; new G = 4 mS/m

**Solution:**

1. Condition check: $G/C = 4\times10^{-3}/10^{-10} = 4.0\times10^{7} = R/L$ ✓
2. $\alpha = \sqrt{RG} = \sqrt{(10)(4.0\times10^{-3})} = \sqrt{0.04} = 0.2\ \mathrm{Np/m}$
3. In decibels: $0.2 \times 8.686 = 1.74\ \mathrm{dB/m}$
4. Over 100 m: $\alpha l = 20\ \mathrm{Np}$, i.e. $8.686 \times 20 = 173.7\ \mathrm{dB}$ — a power ratio of $10^{-17.4}$
5. The inductance repair gives $\alpha = \sqrt{(10)(4\times10^{-5})} = 0.02\ \mathrm{Np/m}$, ten times less

> [!success]- Answer
> **$\alpha = 0.2\ \mathrm{Np/m} = 1.74\ \mathrm{dB/m}$, so 173.7 dB over 100 m. Same pulse shape as the inductance repair, but ten times the attenuation.**

> [!warning] Trap
> Reading 'distortionless' as 'lossless' and answering $\alpha = 0$. The distortionless line has $\alpha = \sqrt{RG}$, which is non-zero by construction: 0.2 Np/m here is 1.74 dB/m, an entirely unusable line. Only $R = G = 0$ gives $\alpha = 0$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(10×4E-3) : Ans×8.686 : Ans×100`
> 2. `=`: $\alpha$ = **0.2** Np/m → **1.737** dB/m → **173.7** dB over 100 m.
> 3. Compare with the inductance repair: `√(10×40E-6)` → **0.02** Np/m, ten times less. `10^(-173.7÷10)` → **4.2e-18** of the input power.
>
> Distortionless is not lossless: only $R = G = 0$ makes $\alpha$ zero.

### P4. For the un-repaired line ($R = 10\ \Omega/\mathrm{m}$, $L = 250\ \mathrm{nH/m}$, $G = 40\ \mu\mathrm{S/m}$, $C = 100\ \mathrm{pF/m}$), compute the exact $\beta$ and the implied phase velocity at 1 MHz and at 100 MHz, and explain the pulse-shape consequence.

**Given:** R = 10 Ω/m; L = 250 nH/m; G = 40 μS/m; C = 100 pF/m; f = 1 MHz and 100 MHz

**Solution:**

1. $\gamma = \sqrt{(R+j\omega L)(G+j\omega C)}$; at 1 MHz $\omega L = 1.571\ \Omega/\mathrm{m}$ and $\omega C = 6.283\times10^{-4}\ \mathrm{S/m}$
2. At 1 MHz: $\gamma = 0.0538 + j0.0590$ per metre, so $v = \omega/\beta = 6.283\times10^{6}/0.0590 = 1.07\times10^{8}\ \mathrm{m/s}$
3. At 100 MHz: $\omega L = 157.1\ \Omega/\mathrm{m}$, $\omega C = 0.06283\ \mathrm{S/m}$, and $\gamma = 0.101 + j3.143$ per metre, so $v = 6.283\times10^{8}/3.143 = 2.00\times10^{8}\ \mathrm{m/s}$
4. The lossless formula would predict $v = 1/\sqrt{LC} = 2.0\times10^{8}\ \mathrm{m/s}$ at *every* frequency; the actual spread is nearly a factor of two
5. Because $\beta$ is not proportional to $\omega$, the low-frequency components of a pulse arrive later than the high-frequency ones — the pulse spreads

> [!success]- Answer
> **$v = 1.07\times10^{8}\ \mathrm{m/s}$ at 1 MHz but $2.00\times10^{8}\ \mathrm{m/s}$ at 100 MHz. $\beta$ is not linear in $\omega$, so the line is dispersive and a pulse smears.**

> [!warning] Trap
> Applying $v = 1/\sqrt{LC}$ and $\beta = \omega\sqrt{LC}$ — those hold only when $R = G = 0$ (lossless) or $R/L = G/C$ (distortionless). At 1 MHz this line has $R > \omega L$ ($10 > 1.57$), which is the audio-band regime where the lossless model fails completely.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. `MODE` `2`: `√((10+i1.571)(4E-5+i6.283E-4))` → **0.05379 + i0.05899** — $\alpha$ + $j\beta$ at 1 MHz.
> 2. `6.2832E6÷Imag(Ans)` → **1.065e8** m/s (the group of the two velocities that matters: $v = \omega/\beta$).
> 3. At 100 MHz: `√((10+i157.1)(4E-5+i0.06283))` → **0.1010 + i3.1432**, then `6.2832E8÷Imag(Ans)` → **2.00e8** m/s — the spread is a factor of two, so the line is dispersive.
>
> `Imag` is angle-mode independent, unlike `Arg` — use it for $\beta$.

## Traps & Exam Notes

- **Equating distortionless with lossless.** Heaviside's line has $\alpha = \sqrt{RG}$, not zero: 0.2 Np/m = 1.74 dB/m in the worked example. Only $R = G = 0$ removes attenuation; the Heaviside condition only makes it frequency-flat.
- **Comparing the components instead of the ratios.** The condition is $R/L = G/C$, both in $\mathrm{s^{-1}}$. A line with $R = 10\ \Omega/\mathrm{m}$ and $G = 40\ \mu\mathrm{S/m}$ looks 'resistive-dominant' by raw numbers but needs a $100\times$ inductance increase, which the ratio test shows immediately.
- **Forgetting that loading changes $Z_0$ and $v$.** Raising $L$ from 250 nH/m to 25 $\mu$H/m to satisfy $R/L = G/C$ takes $Z_0$ from 50 $\Omega$ to 500 $\Omega$ and $v$ from $2.0\times10^{8}$ to $2.0\times10^{7}$ m/s. A student who repairs the shape and then quotes the old $Z_0$ produces a matching network that is wrong by $10\times$.
- **Using $\beta = \omega\sqrt{LC}$ on a dispersive line.** At 1 MHz the un-repaired example has $\beta = 0.0590$ rad/m, not the $0.0314$ rad/m that $\omega\sqrt{LC}$ predicts — a factor 1.88 — because $R = 10\ \Omega/\mathrm{m}$ exceeds $\omega L = 1.57\ \Omega/\mathrm{m}$. The lossless formula is only accurate where $R \ll \omega L$; at 100 MHz the same line gives 3.143 against the predicted 3.142.
- **Believing $\alpha$ can be reduced by adding $G$.** Raising $G$ to satisfy Heaviside multiplies the loss by ten in the example ($0.02 \to 0.2$ Np/m); the real fix is series inductance, which is why loaded telephone pairs are inductive and not leaky.
- **Assuming the lossless $\alpha = 0$ is 'close enough' for a long run.** At 0.0388 dB/m a 100 m coax loses 3.9 dB; at 1.74 dB/m the distortionless example loses 174 dB over the same distance — a thousand times more than the lossless model predicts.

## See Also

- [[01_Primary_Constants_R,_L,_G,_C]]
- [[02_Secondary_Constants_Z0_and_Gamma]]
- [[04_Reflection_Coefficient_and_VSWR]]

---

[[02_Secondary_Constants_Z0_and_Gamma|⬅ 02]] · [[_MOC_Transmission_Lines_and_Waveguides|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Reflection_Coefficient_and_VSWR|04 ➡]]
