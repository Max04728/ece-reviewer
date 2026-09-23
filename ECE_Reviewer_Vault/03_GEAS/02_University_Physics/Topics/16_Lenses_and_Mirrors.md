---
id: GEAS-02-16
title: "Lenses and Mirrors"
part: "03_GEAS"
area: "02_University_Physics"
topic: 16
tier: 2
depth: full
problem_count: 5
prereqs: ["[[15_Reflection_and_Refraction]]"]
tags: ["ece", "geas", "university_physics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 16 — Lenses and Mirrors

> [!abstract] Scope
> Locate the image a curved mirror or thin lens forms, describe it, and pick a corrective lens from a stated near point or far point.

## Core Concept

> [!tip] Intuition
> A mirror or lens does not decide where the image goes; the object decides. Every ray leaving one object point must arrive at one image point, so a single ray drawn with the right rule — parallel, through the focus, or through the vertex — locates the whole image and the sign convention tells you what kind of image it is.

**Commit to the convention before substituting.** This note uses the real-is-positive convention, which is the one the board expects: distances are positive on the real side (in front of a mirror, or opposite the outgoing light for a lens), object distance $d_o$ is positive, and the focal length is positive for a converging element (concave mirror, convex lens) and negative for a diverging one (convex mirror, concave lens). Image distance comes out **positive for a real image** and negative for a virtual image. If you instead treat all distances as positive magnitudes and add signs by rules of thumb, an item that mixes a mirror and a lens will defeat you.

**One equation does both devices.** $1/f = 1/d_o + 1/d_i$, plus mirror focal length $f = R/2$ and magnification $M = h_i/h_o = -d_i/d_o$. The negative sign in $M$ is not decoration: $M<0$ means the image is inverted, $|M|>1$ means enlarged, $|M|<1$ means reduced. A real image from a single mirror or lens is *always* inverted, which is why a positive $d_i$ and a negative $M$ always arrive together.

**Read the answer off the signs before doing any ray diagram.** $d_i>0$: real, inverted, on the same side as the outgoing light. $d_i<0$: virtual, upright. For a concave mirror or convex lens the object must sit outside the focal point to give a real image; inside $f$ it gives an enlarged upright virtual image — which is exactly how a shaving mirror and a magnifying glass work. For a convex mirror or concave lens the focal length is negative and the image is *always* virtual, upright and reduced, whatever the object distance.

**The thin-lens maker equation is what links geometry to material.** $1/f = (n-1)\left(1/R_1 - 1/R_2\right)$ shows directly why a lens in water has a longer focal length: the factor $(n-1)$ falls from $0.50$ for glass in air to about $0.13$ for glass in water, roughly quadrupling $f$ and flattening the lens's power. The same equation explains why a biconvex lens becomes weakly diverging if it is immersed in a liquid of higher index than the glass.

**Diopters are reciprocal metres, and they add for stacked lenses.** $P = 1/f$ with $f$ in **metres**, so $f = 40\ \mathrm{cm}$ is $P = +2.5\ \mathrm{D}$. For thin lenses in contact, $P_{total} = P_1 + P_2$, and for two separated by distance $d$, $P = P_1 + P_2 - dP_1P_2$. Correction items are solved by demanding that the lens map the desired object distance onto the defective near or far point, then converting to diopters.

**Correction has a direction.** A myopic (nearsighted) eye focuses objects in front of the retina and cannot focus far things, so it needs a diverging lens with **negative** power. A hyperopic (farsighted) eye cannot focus nearby things and needs a converging lens with **positive** power. Getting the sign of the required power backwards is the classic lost mark, and it is detectable before any arithmetic: read the patient's complaint, decide diverging or converging, and check that your $P$ has the matching sign.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Mirror or lens equation | $\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i}$ | Real-is-positive convention. Solve for 1/d_i by subtraction, not by inverting f and d_o separately. |
| Magnification | $M = \frac{h_i}{h_o} = -\frac{d_i}{d_o}$ | Negative M means inverted, positive means upright. \|M\| gives the size ratio. |
| Mirror focal length | $f = \frac{R}{2}$ | R is the radius of curvature, so f is half of it. Concave mirrors have f > 0; convex mirrors f < 0. |
| Lens power in diopters | $P = \frac{1}{f(\mathrm{m})}$ | f must be in metres: a 50 cm focal length is +2.0 D, not +0.02 D. Converging positive, diverging negative. |
| Lenses in contact | $P_{total} = P_1 + P_2$ | Valid only when the lenses touch. Separated lenses need the d*P1*P2 correction term. |
| Lens maker equation | $\frac{1}{f} = (n-1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right)$ | R1 and R2 carry signs from the convention. The (n-1) factor is why f lengthens in water. |
| Sign convention summary | $f>0 \mathrm{\ concave\ mirror\ /\ convex\ lens},\ f<0 \mathrm{\ convex\ mirror\ /\ concave\ lens}$ | d_i > 0 real and inverted; d_i < 0 virtual and upright. d_o is always positive here. |
| Image type from object position | $d_o > 2f \Rightarrow \mathrm{real,\ inverted,\ reduced}$ | For a converging element. f < d_o < 2f gives real, inverted, enlarged; d_o < f gives virtual, upright, enlarged. |
| Corrective lens for a near point | $\frac{1}{f} = \frac{1}{d_{desired}} - \frac{1}{d_{near}}$ | The image must land at the patient's near point, so d_i is negative there. Solve, then take 1/f in metres for diopters. |

## Interactive Widget

**Lens Ray Diagram Tool**

![[Lens_Ray_Diagram_Tool.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An object is placed $45.0\ \mathrm{cm}$ from a convex lens of focal length $18.0\ \mathrm{cm}$. Find the image distance and the magnification, and describe the image.

**Given:** $f = +18.0\ \mathrm{cm}$; $d_o = 45.0\ \mathrm{cm}$

**Solution:**

1. $1/d_i = 1/f - 1/d_o = 1/18.0 - 1/45.0$
2. $1/18.0 = 0.05556$ and $1/45.0 = 0.02222$, so $1/d_i = 0.03333\ \mathrm{cm^{-1}}$
3. $d_i = 30.0\ \mathrm{cm}$ (positive, so the image is real, on the far side of the lens)
4. $M = -d_i/d_o = -30.0/45.0 = -0.667$

> [!success]- Answer
> **$d_i = +30.0\ \mathrm{cm}$ and $M = -0.667$: a real, inverted image two-thirds the object's size.**

> [!warning] Trap
> Inverting the equation and writing $d_i = 1/18 - 1/45$ as if it equalled $d_i$ directly. $1/d_i = 0.0333$ gives $d_i = 30\ \mathrm{cm}$; forgetting the reciprocal gives $0.0333\ \mathrm{cm}$, off by a factor of 900.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷(1÷18.0−1÷45.0)` → $d_i$ = **30.0** cm; reporting the reciprocal 0.0333 is the classic slip.
> 2. `−30.0÷45.0` → $M$ = **−0.667**: real, inverted, two-thirds the object's size.

### P2. A concave mirror has a radius of curvature of $20.0\ \mathrm{cm}$. An object $6.00\ \mathrm{cm}$ tall is placed $30.0\ \mathrm{cm}$ from the mirror. Find the image position, the image height, and describe the image.

**Given:** $R = 20.0\ \mathrm{cm}$; $d_o = 30.0\ \mathrm{cm}$; $h_o = 6.00\ \mathrm{cm}$

**Solution:**

1. Mirror focal length: $f = R/2 = +10.0\ \mathrm{cm}$ (concave, so positive)
2. $1/d_i = 1/f - 1/d_o = 1/10.0 - 1/30.0 = 0.1000 - 0.0333 = 0.06667\ \mathrm{cm^{-1}}$
3. $d_i = 15.0\ \mathrm{cm}$ in front of the mirror — a real image
4. $M = -d_i/d_o = -15.0/30.0 = -0.500$
5. $h_i = M h_o = (-0.500)(6.00) = -3.00\ \mathrm{cm}$, so the image is $3.00\ \mathrm{cm}$ tall and inverted

> [!success]- Answer
> **$d_i = +15.0\ \mathrm{cm}$ (real, in front of the mirror) and $h_i = 3.00\ \mathrm{cm}$ inverted.**

> [!warning] Trap
> Using $f = R = 20.0\ \mathrm{cm}$ and forgetting the factor of 2. That gives $d_i = 60\ \mathrm{cm}$ and $M = -2$, a completely different image, and it also flips the item from 'reduced' to 'enlarged'.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `20.0÷2` → $f$ = **+10.0** cm; `1÷(1÷10.0−1÷30.0)` → $d_i$ = **15.0** cm.
> 2. `−15.0÷30.0×6.00` → $h_i$ = **−3.00** cm: real, inverted, half size.

### P3. A hyperopic patient has a near point of $75.0\ \mathrm{cm}$ and wants to read at $25.0\ \mathrm{cm}$. Find the focal length and the power of the corrective contact lens in diopters.

**Given:** $d_{object} = 25.0\ \mathrm{cm}$; image must land at the near point, $75.0\ \mathrm{cm}$

**Solution:**

1. The lens must take an object at $25.0\ \mathrm{cm}$ and produce an image at the patient's near point, $d_i = -75.0\ \mathrm{cm}$ (virtual, on the object side)
2. $1/f = 1/d_o + 1/d_i = 1/25.0 + 1/(-75.0) = 0.04000 - 0.01333 = 0.02667\ \mathrm{cm^{-1}}$
3. $f = 37.5\ \mathrm{cm} = 0.375\ \mathrm{m}$ (positive, so converging — correct for hyperopia)
4. $P = 1/f = 1/0.375 = +2.67\ \mathrm{D}$

> [!success]- Answer
> **$f = +37.5\ \mathrm{cm}$ and $P = +2.67\ \mathrm{D}$ (a converging lens).**

> [!warning] Trap
> Entering the near point as $d_i = +75.0\ \mathrm{cm}$. The lens never puts a real image behind the eye here; the image is virtual and must carry a negative sign, and the sign error alone changes the power from $+2.67\ \mathrm{D}$ to $+5.33\ \mathrm{D}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷(1÷25.0+1÷(−75.0))` → $f$ = **+37.5** cm, with the image virtual at the near point.
> 2. `1÷0.375` → $P$ = **+2.67** D; entering $d_i$ as +75.0 gives **+5.33** D, the sign trap.

### P4. A diverging lens has a focal length of $-20.0\ \mathrm{cm}$ and an object is placed $30.0\ \mathrm{cm}$ in front of it. Find the image distance, the magnification, and describe the image.

**Given:** $f = -20.0\ \mathrm{cm}$; $d_o = 30.0\ \mathrm{cm}$

**Solution:**

1. $1/d_i = 1/f - 1/d_o = 1/(-20.0) - 1/30.0 = -0.05000 - 0.03333 = -0.08333\ \mathrm{cm^{-1}}$
2. $d_i = -12.0\ \mathrm{cm}$ (negative, so the image is virtual and on the object side)
3. $M = -d_i/d_o = -(-12.0)/30.0 = +0.400$

> [!success]- Answer
> **$d_i = -12.0\ \mathrm{cm}$ and $M = +0.400$: a virtual, upright image $40\%$ of the object's size.**

> [!warning] Trap
> Reporting the image as real because $30\ \mathrm{cm}$ is outside the focal length. For a *diverging* element the image is virtual for every object position; 'outside $f$' is a real-image rule only for converging mirrors and lenses.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷(−1÷20.0−1÷30.0)` → $d_i$ = **−12.0** cm, virtual and on the object side.
> 2. `12.0÷30.0` → $M$ = **+0.400**: virtual, upright, 40% of the object's size.

### P5. A biconvex lens of glass ($n = 1.52$) has surface radii $R_1 = +10.0\ \mathrm{cm}$ and $R_2 = -12.0\ \mathrm{cm}$. Find its focal length in air and its power in diopters.

**Given:** $n = 1.52$; $R_1 = +10.0\ \mathrm{cm}$, $R_2 = -12.0\ \mathrm{cm}$

**Solution:**

1. $1/f = (n-1)(1/R_1 - 1/R_2) = (0.52)(1/10.0 - 1/(-12.0))$
2. $1/10.0 = 0.1000$ and $-1/R_2 = +1/12.0 = 0.08333$, so the bracket is $0.18333\ \mathrm{cm^{-1}}$
3. $1/f = (0.52)(0.18333) = 0.09533\ \mathrm{cm^{-1}}$
4. $f = 10.5\ \mathrm{cm} = 0.105\ \mathrm{m}$, so $P = 1/0.105 = +9.53\ \mathrm{D}$

> [!success]- Answer
> **$f \approx +10.5\ \mathrm{cm}$ and $P \approx +9.5\ \mathrm{D}$.**

> [!warning] Trap
> Using $1/R_1 + 1/R_2$ because both surfaces look 'convex'. In the lens maker convention the second radius is subtracted, and a biconvex lens has $R_1 > 0$ with $R_2 < 0$; adding the magnitudes gives a focal length about $45\%$ too short.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.52×(1÷10.0+1÷12.0)` → $1/f$ = **0.09533** cm⁻¹, the second radius entering subtracted since $R_2$ = −12.0.
> 2. `1÷Ans` → $f$ = **10.5** cm = **0.105** m; `1÷0.105` → $P$ = **+9.53** D.

## Traps & Exam Notes

- **Forgetting $f = R/2$ for a spherical mirror.** Using the radius as the focal length doubles every image distance and halves the magnification, and it is the most common single error in mirror items.
- **Dropping the reciprocal when solving the lens equation.** $1/d_i = 0.0333\ \mathrm{cm^{-1}}$ means $d_i = 30\ \mathrm{cm}$, not $0.0333\ \mathrm{cm}$. Answers under 1 cm are a red flag.
- **Sign errors on a virtual image.** A virtual image has $d_i < 0$ and therefore positive magnification (upright). Reporting it as real and inverted contradicts the geometry the diagram shows.
- **Applying the 'outside $f$ gives a real image' rule to a diverging element.** A convex mirror or concave lens gives a virtual, upright, reduced image for every object distance, including objects far beyond $|f|$.
- **Mixing centimetres and metres in the power.** $P = 1/f$ needs $f$ in metres. A $20\ \mathrm{cm}$ focal length used raw gives $0.05\ \mathrm{D}$ instead of $+5.0\ \mathrm{D}$, a factor of 100.
- **Sign of the corrective power.** A myopic eye needs a diverging lens ($P<0$) and a hyperopic eye a converging one ($P>0$). Treating the near point as a positive image distance flips the sign and prescribes the wrong lens.
- **Assuming magnification is always a reduction.** $|M|>1$ is perfectly normal: an object inside the focal point of a convex lens gives an enlarged virtual image, which is exactly how a magnifier works.
- **Treating a lens in water as unchanged.** The $(n-1)$ factor governs the power, so a glass lens in water loses roughly three quarters of its power in air. Ignoring this overstates the focal length reduction and the resulting image size.

## See Also

- [[15_Reflection_and_Refraction]]
- [[14_Sound_and_Doppler]]
- [[13_SHM_and_Waves]]
- [[_MOC_University_Physics]]
- [[_MOC_GEAS]]

---

[[15_Reflection_and_Refraction|⬅ 15]] · [[_MOC_University_Physics|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
