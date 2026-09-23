---
id: EST-06-04
title: "Marconi, Folded Dipole, Yagi-Uda"
part: "04_EST"
area: "06_Antenna_Systems_and_Propagation"
topic: 4
tier: 2
depth: full
problem_count: 4
prereqs: ["[[03_Hertzian_and_Half-Wave_Dipoles]]", "[[02_Radiation_Resistance,_Efficiency_and_Capture_Area]]"]
tags: ["ece", "est", "antenna_systems_and_propagation"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Marconi, Folded Dipole, Yagi-Uda

> [!abstract] Scope
> Analyse the quarter-wave Marconi monopole, the folded dipole's impedance step-up, and Yagi-Uda gain, element spacing, boom-length tradeoff and matching.

## Core Concept

> [!tip] Intuition
> Three ways of cheating the plain half-wave dipole. The Marconi monopole stands it on a ground plane and keeps only the top half, so it radiates into a hemisphere and its resistance halves. The folded dipole wires two elements in parallel but feeds only one, so the currents split and the impedance steps up to a convenient $300\ \Omega$. The Yagi adds parasitic elements that re-radiate with the right phase delay, steering energy forward and buying gain with boom length.

**Marconi (quarter-wave monopole): image theory does the work.** A vertical element of height $l$ over a conducting ground has an image below it, and the pair behaves exactly like a centre-fed dipole of length $2l$ in free space. Cut an ideal half-wave dipole in half through its centre and discard the bottom half: what remains is a $\lambda/4$ monopole whose feed sees *half* the impedance, $R_\mathrm{rad} = 73/2 = 36.5\ \Omega$. Nothing is lost in radiation, because the image supplies the missing half — but all of it is now confined to the upper hemisphere, so by the definition $D = 4\pi U_\mathrm{max}/P_\mathrm{rad}$ the directivity *doubles*:
$$D = 2(1.64) = 3.28 = 5.15\ \mathrm{dBi}$$
Notice the pattern: the resistance halves, the directivity doubles, and the product $R_\mathrm{rad}D$ is unchanged. The practical length is $0.24\lambda$ to $0.25\lambda$, a quarter wave minus the same end-effect correction that shortens a dipole.

**Why a real ground spoils the ideal number.** Image theory assumes a perfect conductor, but real earth is lossy and its reflection coefficient is not $-1$. A poor ground both absorbs power and tilts the pattern upward (the maximum lifts above the horizon), and it raises the apparent feed resistance toward $50\ \Omega$ and beyond. That is why AM broadcast monopoles are always specified *with* their ground screen: a buried radial wire mat restores something close to a perfect ground over the region that matters. This is also why a monopole in an exam is quoted at $36.5\ \Omega$ only when the ground is stated to be perfect; with an imperfect ground the honest answer is 'higher, and the pattern is tilted'.

**The folded dipole: an impedance transformer made of wire.** Two parallel half-wave elements are joined at both ends, but only one is fed. In the standard equal-radius two-wire case the currents in the two arms are equal, so the input current is half the total loop current while the total radiated power is unchanged — hence the input resistance is four times that of a single dipole:
$$R_\mathrm{in} = 4(73) = 292\ \Omega \approx 300\ \Omega$$
The general rule is a step-up of $(1+n)^2$, where $n$ is the number of extra (unfed, parasitic) elements. The directivity stays at $1.64 = 2.15\ \mathrm{dBi}$, because the current distribution and the physical aperture are essentially those of a half-wave dipole. What you actually buy is bandwidth: the two conductors in parallel present a much thicker effective conductor, which lowers the $Q$ and flattens the impedance-versus-frequency curve. Its natural companion is $300\ \Omega$ twin-lead; feeding a $75\ \Omega$ coaxial line needs a $4{:}1$ balun, and the balun is not optional, because the balanced folded dipole must not be connected directly to an unbalanced coax without one.

**The Yagi-Uda: parasitic elements and the gain-versus-size trade.** One element is driven; the others carry currents induced by mutual coupling and re-radiate them. A **reflector** placed behind the driven element is made about $5\%$ *longer*, so it is inductive and its re-radiated field lags in a way that cancels radiation backwards; **directors** in front are about $5\%$ *shorter*, so they are capacitive and their re-radiated field adds in the forward direction. Spacings matter as much as lengths: reflector at roughly $0.15\lambda$ to $0.25\lambda$, directors at $0.1\lambda$ to $0.2\lambda$ diminishing along the boom. Gain grows with boom length in a sub-linear, saturating way — roughly $7\ \mathrm{dBi}$ for 3 elements ($0.4\lambda$ boom), about $12\ \mathrm{dBi}$ for 6, and $16\ \mathrm{dBi}$ or more only for a long 10-plus-element boom. Two consequences are exam favourites: the **front-to-back ratio** is the real specification for a TV or point-to-point Yagi, not gain alone; and the input impedance of the driven element *falls* as directors are added, which is exactly why practical Yagis use a folded dipole or a gamma match at the feed rather than a plain $73\ \Omega$ dipole.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Monopole radiation resistance (perfect ground) | $R_\mathrm{rad} = \frac{73}{2} = 36.5\ \Omega$ | Quarter-wave element over a perfect ground only. A lossy real ground raises this toward 50 ohm and above. |
| Monopole directivity | $D = 2\times1.64 = 3.28 = 5.15\ \mathrm{dBi}$ | Radiation is confined to the upper hemisphere, so D doubles. R_rad halves and D doubles: the product is unchanged. |
| Monopole physical height | $l = 0.25\lambda = \frac{0.25c}{f}$ | Practically 0.24 lambda to 0.25 lambda after the end-effect correction. At 100 MHz, 0.75 m. |
| Folded dipole input resistance | $R_\mathrm{in} = (1+n)^2 R_\mathrm{rad}$ | n = number of extra (unfed) elements. Standard 2-wire folded dipole: n = 1, R_in = 4(73) = 292 ohm. Unequal radii change the factor. |
| Folded dipole directivity | $D = 1.64 = 2.15\ \mathrm{dBi}$ | Unchanged from a plain half-wave dipole. The folded dipole buys bandwidth and impedance, not gain. |
| Balun ratio needed | $\mathrm{ratio} = \frac{R_\mathrm{in}}{R_\mathrm{line}}$ | 300 ohm folded dipole into 75 ohm coax needs 4:1. Into 300 ohm twin-lead, no balun ratio is needed at all. |
| Yagi effective aperture | $A_e = \frac{G\lambda^2}{4\pi}$ | G linear, not dBi. Sanity check on a claimed gain: D must be physically plausible for the boom length. |
| Efficiency and gain of a matched antenna | $\eta = \frac{R_\mathrm{rad}}{R_\mathrm{rad}+R_\mathrm{loss}}, \qquad G = \eta D$ | Folded dipole with 7 ohm loss: eta = 292/299. Directivity is unchanged; gain is not. |
| Reflector and director lengths | $l_\mathrm{refl} \approx 1.05\,l_\mathrm{driven}, \qquad l_\mathrm{dir} \approx 0.95\,l_\mathrm{driven}$ | Reflector longer (inductive, cancels backward radiation), director shorter (capacitive, adds forward). Roughly +-5 percent. |
| Typical element spacings | $s_\mathrm{refl} \approx 0.15\lambda-0.25\lambda, \qquad s_\mathrm{dir} \approx 0.1\lambda-0.2\lambda$ | Decreasing along the boom. Spacing is as critical as element length for gain and front-to-back ratio. |
| Yagi gain versus element count | $G \approx 7\ \mathrm{dBi}\ (3\ \mathrm{el}),\ 12\ \mathrm{dBi}\ (6\ \mathrm{el}),\ 16\ \mathrm{dBi}\ (10+\ \mathrm{el})$ | Rules of thumb, increasing with boom length. Gain saturates: doubling elements late in the boom buys far less than the first few. |

## Worked Problems

### P1. A quarter-wave Marconi monopole is operated at $100\ \mathrm{MHz}$ over a perfect ground. Find its physical height, its radiation resistance, and its directivity in dBi.

**Given:** f = 100 MHz, lambda = 3 m; perfect ground; half-wave dipole R_rad = 73 ohm, D = 1.64

**Solution:**

1. $\lambda = c/f = (3\times10^{8})/(100\times10^{6}) = 3\ \mathrm{m}$
2. Height: $l = 0.25\lambda = 0.25(3) = 0.75\ \mathrm{m}$ (practically $0.24\lambda = 0.72\ \mathrm{m}$ after end effect)
3. Image theory makes the element plus its image a half-wave dipole, so the feed sees half the resistance: $R_\mathrm{rad} = 73/2 = 36.5\ \Omega$
4. Radiation is confined to the upper hemisphere, so directivity doubles: $D = 2(1.64) = 3.28$
5. In dBi: $10\log_{10}(3.28) = 5.15\ \mathrm{dBi}$

> [!success]- Answer
> **$l = 0.75\ \mathrm{m}$, $R_\mathrm{rad} = 36.5\ \Omega$, $D = 3.28 = 5.15\ \mathrm{dBi}$.**

> [!warning] Trap
> Quoting $73\ \Omega$ and $2.15\ \mathrm{dBi}$ for the monopole because it is 'half a dipole'. Both figures must change: the resistance halves because the current is shared with the image, and the directivity doubles because the lower hemisphere is cut off.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷100×10^6` → $\lambda$ = **3** m; `Ans×0.25` → $l$ = **0.75** m.
> 2. `73÷2` → $R_\mathrm{rad}$ = **36.5** Ω; `2×1.64` → $D$ = **3.28**.
> 3. `10log(3.28)` → **5.16** dBi.
>
> Fast check on the monopole: doubling the dipole's $D$ adds 3.01 dB, so 2.15 + 3.01 = 5.16 dBi.

### P2. A centre-fed folded dipole has two equal arms ($n = 1$, $R_\mathrm{rad} = 73\ \Omega$ per element) and must feed a $75\ \Omega$ coaxial line. Find the input resistance and the balun transformation ratio required.

**Given:** folded dipole, 2 equal parallel elements; single-dipole R_rad = 73 ohm; coax Z_0 = 75 ohm

**Solution:**

1. For a two-wire folded dipole, $n = 1$ unfed element
2. $R_\mathrm{in} = (1+n)^2 R_\mathrm{rad} = (1+1)^2(73) = 4(73)$
3. $R_\mathrm{in} = 292\ \Omega \approx 300\ \Omega$
4. Balun ratio $= R_\mathrm{in}/R_\mathrm{line} = 292/75 = 3.89 \approx 4$
5. So a $4{:}1$ balun steps $292\ \Omega$ down to $73\ \Omega$, which is also close enough to $75\ \Omega$ for a VSWR of about $1.03$

> [!success]- Answer
> **$R_\mathrm{in} = 292\ \Omega \approx 300\ \Omega$; a $4{:}1$ balun is required.**

> [!warning] Trap
> Feeding the folded dipole straight from coax and expecting a match, or applying $2\times$ instead of $4\times$. The step-up is $(1+n)^2$, so two equal arms give $4\times$, not $2\times$, and the balanced-to-unbalanced conversion still needs a balun.

### P3. A 3-element Yagi is designed at $100\ \mathrm{MHz}$ with a resonant half-wave driven element of $1.425\ \mathrm{m}$. Find the reflector length, the director length, and the directivity figure you should expect at the pattern maximum.

**Given:** f = 100 MHz, lambda = 3 m; driven element = 1.425 m; reflector 5% longer, director 5% shorter

**Solution:**

1. $\lambda = 3\ \mathrm{m}$; driven element $l_d = 1.425\ \mathrm{m}$ (a resonant half-wave element)
2. Reflector: $l_\mathrm{refl} = 1.05(1.425) = 1.496\ \mathrm{m}$, i.e. $0.071\ \mathrm{m}$ longer than the driven element
3. Director: $l_\mathrm{dir} = 0.95(1.425) = 1.354\ \mathrm{m}$, i.e. $0.071\ \mathrm{m}$ shorter
4. Interpretation check: the reflector is *longer* than resonance (inductive, cancels backward radiation) and the director *shorter* (capacitive, reinforces forward radiation)
5. Directivity for a 3-element Yagi is about $7\ \mathrm{dBi}$, over $4.8\ \mathrm{dB}$ more than a single dipole's $2.15\ \mathrm{dBi}$

> [!success]- Answer
> **Reflector $\approx 1.50\ \mathrm{m}$, director $\approx 1.35\ \mathrm{m}$, $D \approx 7\ \mathrm{dBi}$.**

> [!warning] Trap
> Reversing the lengths — making the reflector shorter and the director longer. That inverts the phase of the re-radiated fields and steers the beam *backwards*, turning a Yagi into a very inefficient backfire array.

### P4. A 6-element Yagi at $200\ \mathrm{MHz}$ is claimed to have $G = 12\ \mathrm{dBi}$. Find its effective aperture, and the front-to-back ratio in dB if the backward field is $1/16$ of the forward field.

**Given:** f = 200 MHz; G = 12 dBi; backward field = 1/16 of forward field

**Solution:**

1. $\lambda = c/f = (3\times10^{8})/(200\times10^{6}) = 1.5\ \mathrm{m}$
2. Convert gain: $G = 10^{12/10} = 15.85$
3. $A_e = G\lambda^2/(4\pi) = 15.85(1.5)^2/(4\pi) = 15.85(2.25)/12.566$
4. $A_e = 35.66/12.566 = 2.838\ \mathrm{m^2}$
5. Front-to-back from fields: power ratio $= (16)^2 = 256$; $10\log_{10}(256) = 24.1\ \mathrm{dB}$

> [!success]- Answer
> **$A_e = 2.84\ \mathrm{m^2}$; front-to-back ratio $= 24.1\ \mathrm{dB}$.**

> [!warning] Trap
> Squaring the front-to-back *field* ratio and forgetting the log, or using the field ratio itself as dB. A front-to-back ratio is a *power* ratio: $20\log_{10}(E_f/E_b)$ for fields equals $10\log_{10}(P_f/P_b)$, and $1/16$ in field is $24.1\ \mathrm{dB}$, not $12.5\ \mathrm{dB}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` 28 (c0) `÷200×10^6` → $\lambda$ = **1.5** m; `10^(12÷10)` → $G$ = **15.85**.
> 2. `Ans×1.5²÷(4π)` → $A_e$ = **2.838** m².
> 3. `20log(16)` → **24.1** dB front-to-back: a field ratio takes 20log, not 10log.

## Traps & Exam Notes

- **Keeping $73\ \Omega$ and $2.15\ \mathrm{dBi}$ for a Marconi monopole.** Image theory halves the radiation resistance to $36.5\ \Omega$ and doubles the directivity to $5.15\ \mathrm{dBi}$ because only the upper hemisphere is illuminated.
- **Using $(1+n)$ instead of $(1+n)^2$ for the folded dipole.** The step-up is the *square* of the conductor count ratio, so the standard two-wire folded dipole is $4(73) = 292\ \Omega$, close to $300\ \Omega$, not $146\ \Omega$.
- **Connecting a folded dipole directly to coax.** The folded dipole is a balanced structure and coax is unbalanced; a current flows on the outside of the shield, the pattern skews and the match degrades. A balun is required, and the ratio is $R_\mathrm{in}/R_\mathrm{line}$, typically $4{:}1$ into $75\ \Omega$.
- **Swapping reflector and director lengths.** The reflector must be about $5\%$ *longer* than the driven element and the director about $5\%$ *shorter*. Reversing them flips the beam direction.
- **Treating Yagi gain as linear in element count.** Gain grows sub-linearly and saturates; a 10-element Yagi gives maybe $16\ \mathrm{dBi}$, not the $16\ \mathrm{dBi}$ scaled from 6 elements. Long-boom claims should be checked against $A_e = G\lambda^2/4\pi$ for physical plausibility.
- **Assuming the driven element stays at $73\ \Omega$ as directors are added.** Mutual coupling lowers the input impedance steadily with element count, which is precisely why production Yagis use a folded dipole or gamma match rather than a plain centre feed.
- **Judging a Yagi by gain alone.** Front-to-back ratio is usually the governing specification for TV and point-to-point links; a high-gain Yagi with poor front-to-back picks up interference from behind and fails in service.
- **Using a monopole's $36.5\ \Omega$ over real ground.** Lossy earth raises the apparent feed resistance toward $50\ \Omega$ or more and tilts the pattern upward. The clean numbers apply only to a perfect ground with a ground screen.

## See Also

- [[03_Hertzian_and_Half-Wave_Dipoles]]
- [[01_Antenna_Parameters_Directivity,_Gain,_EIRP]]
- [[06_FSPL_and_Friis_Transmission_Equation]]

---

[[03_Hertzian_and_Half-Wave_Dipoles|⬅ 03]] · [[_MOC_Antenna_Systems_and_Propagation|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Parabolic_Reflector_Antennas|05 ➡]]
