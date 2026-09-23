---
id: GEAS-03-06
title: "Hardness Testing"
part: "03_GEAS"
area: "03_Materials_Science"
topic: 6
tier: 3
depth: full
problem_count: 0
prereqs: ["[[05_Stress,_Strain_and_Mechanical_Properties]]"]
tags: ["ece", "geas", "materials_science"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Hardness Testing

> [!abstract] Scope
> Pick the right hardness scale for a given material and load, compute the hardness number from an indentation, and know when a scale conversion is invalid.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Brinell hardness number | $HB = \frac{2F}{\pi D\left(D-\sqrt{D^2-d^2}\right)}$ | F in kgf, D = ball diameter in mm (standard 10 mm), d = measured indentation diameter in mm, so HB is in kgf/mm^2 and is written without units. Standard conditions: 3000 kgf for steel and cast iron (HB 3000/10), 500 kgf for aluminium, copper and brass (HB 500/10), 1500 kgf for the softer bearing alloys. |
| Brinell mean pressure (approximation) | $HB \approx \frac{4F}{\pi d^2} = \frac{F}{A_{indent}}$ | Projected-area version that ignores the ball curvature. Because the spherical cap is larger than the projected circle, it reads HIGH: about 2% high at d/D = 0.25 and about 7% high at d/D = 0.5. Use it only for a rough check — the exact form has the D - sqrt(D^2 - d^2) term. |
| Vickers hardness number | $HV = 1.854\frac{F}{d^2}$ | F in kgf, d = MEAN of the two indentation diagonals in mm. The 136-degree diamond pyramid makes HV nearly independent of load, so the load must still be quoted (HV 30, HV 1). A d entered in micrometres instead of millimetres is 1000x too big numerically, so HV comes out 10^6 times too SMALL. |
| Knoop hardness number | $HK = 14.2\frac{F}{l^2}$ | F in kgf and l = LONG diagonal in mm; the rhombohedral Knoop indenter makes an elongated impression roughly 7 times longer than it is wide, so the long diagonal is the one to measure. |
| Rockwell hardness number | $HR = N - \frac{h}{0.002\ \mathrm{mm}}$ | h is the permanent depth increase after removing the major load; N = 130 for the B scale (1/16 in ball, 100 kgf) and N = 100 for the C scale (120-degree diamond cone, 150 kgf). The 0.002 mm unit is what makes HR a dimensionless dial number — swapping the two dial constants gives nonsense such as HRB 90 for a 0.02 mm indentation. |
| Rockwell load ratios | $HRC: 150\ \mathrm{kgf\ diamond\ cone},\qquad HRB: 100\ \mathrm{kgf\ 1/16\ in\ ball}$ | Rockwell uses a 10 kgf minor load plus the major load. Calling HRC a 100 kgf test or swapping the indenters are the two most common scale errors. |
| Hardness to tensile strength (steel) | $\sigma_{UTS}\ [\mathrm{MPa}] \approx 3.4\,HB$ | Empirical and valid only for steels, and only up to about HB 400. Applying 3.4 to a Brinell number for aluminium or a Vickers number for a ceramic produces a meaningless strength. |
| Vickers to Brinell equivalence | $HV \approx HB\ \mathrm{for\ HB < 350}$ | Close only in that range. Above roughly 350 the Brinell ball itself deforms and HB becomes unreliable, so HV must be used for hard materials. |
| Rockwell C to Vickers (approximate) | $HV \approx 10\,HRC - 20\ \ (\mathrm{rough}),\ \mathrm{use\ tables\ instead}$ | The C scale is deliberately non-linear: 5 HRC points span only about 28 HV near 20 HRC but about 135 HV near 60 HRC (ASTM E140). Never interpolate HRC linearly. |
| Recommended Brinell load | $F = 30D^2\ (\mathrm{steel}),\ 10D^2\ (\mathrm{Al,\ Cu}),\ 5D^2\ (\mathrm{soft\ alloys})$ | Keeps d/D between 0.25 and 0.5 so the indentation stays a valid spherical cap. With the standard 10 mm ball this gives 3000, 1000 and 500 kgf. |
| Mohs scratch hardness | $\mathrm{talc\ 1 < gypsum\ 2 < calcite\ 3 < fluorite\ 4 < apatite\ 5 < orthoclase\ 6 < quartz\ 7 < topaz\ 8 < corundum\ 9 < diamond\ 10}$ | An ordinal scratch scale, not a ratio scale. On the absolute hardness scale talc is 1 and corundum 400 — corundum is 400 times harder than talc, not 9 times — while diamond (1600) is only about 4 times harder than corundum. Fingerprint is about 5, a steel file about 6.5. |
| Indenter geometry summary | $HB: 10\ \mathrm{mm\ ball},\quad HV: 136^\circ\ \mathrm{diamond\ pyramid},\quad HK: \mathrm{elongated\ pyramid},\quad HRC: 120^\circ\ \mathrm{cone},\quad HRB: 1/16\ \mathrm{in\ ball}$ | The indenters are not interchangeable; each scale is defined by its indenter, its load and its dwell time, usually 10-15 s. |

## Traps & Exam Notes

- **Using F in newtons in $HV = 1.854F/d^2$.** The constant 1.854 is calibrated for F in kilogram-force and d in millimetres. Feeding in 294 N instead of 30 kgf inflates the hardness 9.81 times, turning an HV of 315 into 3090.
- **Measuring only one Vickers diagonal.** HV is defined with the mean of the two diagonals. On an anisotropic or slightly tilted specimen the two diagonals can differ by 5%, and since HV goes as $1/d^2$ that is a 10% hardness error.
- **Quoting a Rockwell number without its scale letter.** '48 hardness' is meaningless: 48 on the C scale is a hardened tool steel at roughly 1580 MPa UTS, while 48 on the B scale is soft annealed copper. HRC and HRB use different indenters, different loads and different dial constants.
- **Interpolating between hardness scales linearly.** The conversions are non-linear and material-dependent. On ASTM E140, a step of 5 HRC spans only about 28 HV near 20 HRC but about 135 HV near 60 HRC, so a single straight-line rule $HV \approx 10\,HRC - 20$ is wrong by a factor of four at the top of the scale.
- **Applying $\sigma_{UTS} \approx 3.4\,HB$ to a non-steel.** The constant is empirical for steels up to about HB 400. On a ceramic it is meaningless, because the material does not yield plastically under the indenter — the impression reflects fracture and the 'strength' it predicts can be off by an order of magnitude.
- **Using the Brinell ball on a very hard steel.** Above roughly HB 400 the 10 mm ball itself deforms elastically, so the measured impression is too large and the reported hardness too low. Hardened steels must be tested with Vickers or Rockwell C.
- **Forgetting the dwell time and the 10 kgf minor load.** Brinell and Vickers are read after a dwell of 10-15 s, and Rockwell readings are relative to the minor-load seating depth. Comparing a 5 s reading with a 15 s reading on a soft metal can differ by several points because of creep under the indenter.
- **Reading a Rockwell dial number directly as a depth.** The dial is inverted and scaled in 0.002 mm increments: HRC = 150 - h/0.002 mm. Larger dial numbers mean shallower indentation and harder material.

## See Also

- [[05_Stress,_Strain_and_Mechanical_Properties]]
- [[04_Crystal_Imperfections]]
- [[01_Crystal_Structures_and_Unit_Cells]]

---

[[05_Stress,_Strain_and_Mechanical_Properties|⬅ 05]] · [[_MOC_Materials_Science|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Energy_Bands_and_Classification|07 ➡]]
