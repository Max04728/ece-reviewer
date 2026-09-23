---
id: GEAS-01-08
title: "pH, pOH and Buffers"
part: "03_GEAS"
area: "01_General_Chemistry"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Mole_Concept_and_Stoichiometry]]", "[[07_Chemical_Equilibrium_and_Le_Chatelier]]"]
tags: ["ece", "geas", "general_chemistry"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — pH, pOH and Buffers

> [!abstract] Scope
> Move between hydrogen-ion concentration, pH and pOH for strong and weak acids, then size up a buffer and predict how its pH responds to added acid or base.

## Core Concept

> [!tip] Intuition
> pH is a logarithmic ruler for $[\mathrm{H^+}]$. Strong acids hand you the concentration directly; weak acids make you solve a small equilibrium first; and a buffer is a weak acid with its conjugate base already present in quantity, so whatever you add is absorbed by the pair instead of moving the pH.

**The logarithmic bookkeeping.** $\mathrm{pH} = -\log[\mathrm{H^+}]$ with the concentration in mol/L, and $\mathrm{pOH} = -\log[\mathrm{OH^-}]$. The two are linked by $\mathrm{pH}+\mathrm{pOH} = 14.00$ — but only at $25\ ^\circ\mathrm{C}$, because that sum is $\mathrm{p}K_w$ and $K_w$ is temperature dependent. Each factor of ten in concentration is one pH unit: $0.100\ \mathrm{M}\ \mathrm{HCl}$ is pH 1.00, $0.0100\ \mathrm{M}$ is pH 2.00. For a strong monoprotic acid or base no equilibrium is needed, which is why these items are free marks provided the acid is genuinely strong and not too dilute.

**Weak acids need an equilibrium, then a validity check.** Write $K_a = [\mathrm{H^+}][\mathrm{A^-}]/[\mathrm{HA}]$, assume $[\mathrm{H^+}] = [\mathrm{A^-}] = x$ and $[\mathrm{HA}] \approx C$, then $x \approx \sqrt{K_aC}$. Then check the assumption: if $x/C$ exceeds 5% the neglected $x$ matters and you must solve $x^2 + K_a x - K_a C = 0$. Percent ionisation $= (x/C)\times100$ is itself a common question, so compute it rather than discard it. For a weak base use $K_b$ to get $[\mathrm{OH^-}]$ first, convert to pOH, and only then to pH — taking $-\log$ of the base concentration directly is the classic wrong turn.

**Conjugate pairs couple $K_a$ and $K_b$.** For a conjugate acid-base pair in water, $K_aK_b = K_w = 1.0\times10^{-14}$ at 25 °C. A strong acid has a vanishingly weak conjugate base and vice versa; a salt of a weak acid with a strong base (sodium acetate) hydrolyses to give a basic solution, and a salt of a weak base with a strong acid (ammonium chloride) gives an acidic one. A salt of a strong acid and a strong base (NaCl) is neutral. Polygon items usually hand you a list of salts and ask for the pH ranking, and the rule is always 'look at which ion hydrolyses'.

**Buffers: the ratio, not the amounts, sets the pH.** Henderson-Hasselbalch, $\mathrm{pH} = \mathrm{p}K_a + \log([\mathrm{A^-}]/[\mathrm{HA}])$, is the whole topic. Equal concentrations give $\mathrm{pH} = \mathrm{p}K_a$ exactly, which is why the half-equivalence point of a weak-acid titration reads off the $\mathrm{p}K_a$ directly. Because only the ratio appears, diluting a buffer barely moves its pH — but it does lower the buffer capacity, which is the total moles of acid or base the buffer can absorb before the ratio is destroyed. The useful window is $\mathrm{p}K_a \pm 1$, where the ratio stays between 1:10 and 10:1, and capacity is greatest when the ratio is nearest 1.

**Adding strong acid or base to a buffer is a stoichiometry step, not an equilibrium step.** Assume the added $\mathrm{H^+}$ converts an equal number of moles of $\mathrm{A^-}$ into $\mathrm{HA}$ quantitatively, update the two moles, then apply Henderson-Hasselbalch once. Reserve the ICE treatment for the initial weak-acid solution and for the equivalence point of a titration, where the only species left is the salt and the problem becomes a hydrolysis calculation. Recognising which of the two situations you are in is most of the work in this topic.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Ion product of water | $K_w = [\mathrm{H^+}][\mathrm{OH^-}] = 1.0\times10^{-14} \mathrm{\ at\ } 25\ ^\circ\mathrm{C}$ | Temperature dependent: about 9x10^-14 at 60 C, so neutral pH there is below 7. Using 14 at other temperatures is the trap. |
| pH and pOH | $\mathrm{pH} = -\log[\mathrm{H^+}], \quad \mathrm{pOH} = -\log[\mathrm{OH^-}]$ | Concentration in mol/L. One decade of concentration is one pH unit; 0.0100 M strong acid is pH 2.00, not 1.00. |
| pH plus pOH | $\mathrm{pH} + \mathrm{pOH} = 14.00 \mathrm{\ at\ } 25\ ^\circ\mathrm{C}$ | Equals pKw, so it is a temperature-dependent identity rather than a constant of nature. |
| Strong monoprotic acid | $\mathrm{pH} = -\log C_{acid}$ | Complete dissociation assumed. For H2SO4 only the first proton is strong, so its pH is NOT -log(2C). |
| Weak acid constant | $K_a = \frac{[\mathrm{H^+}][\mathrm{A^-}]}{[\mathrm{HA}]}$ | Ignore the water contribution unless C is below about 10^-6 M, where autoionisation dominates. |
| Weak-acid approximation | $[\mathrm{H^+}] \approx \sqrt{K_a C}$ | Valid only while ionisation is under 5%. Otherwise solve x^2 + K_a x - K_a C = 0. |
| Percent ionisation | $\%\ \mathrm{ionised} = \frac{[\mathrm{H^+}]}{C} \times 100$ | Also the validity test for the square-root approximation; report it when asked. |
| Conjugate pair relation | $K_a K_b = K_w$ | For a conjugate acid/base pair in water. A larger Ka always means a weaker conjugate base. |
| Henderson-Hasselbalch | $\mathrm{pH} = \mathrm{p}K_a + \log\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}$ | Base over acid. Inverting the ratio flips the sign of the log term; equal concentrations give pH = pKa. |
| Buffer capacity window | $\mathrm{effective\ range} \approx \mathrm{p}K_a \pm 1$ | Outside it the ratio is worse than 1:10 and the buffer barely resists. Capacity peaks when the ratio is 1. |
| pH to concentration | $[\mathrm{H^+}] = 10^{-\mathrm{pH}}$ | Use for the reverse direction. A pH change of 0.30 is a factor of two in concentration, which is worth remembering. |

## Interactive Widget

**Titration Curve Builder**

![[Titration_Curve_Builder.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find the pH of $0.0100\ \mathrm{M}\ \mathrm{HCl}$ and of $0.0100\ \mathrm{M}\ \mathrm{NaOH}$ at $25\ ^\circ\mathrm{C}$.

**Given:** C(HCl) = 0.0100 M; C(NaOH) = 0.0100 M

**Solution:**

1. $\mathrm{HCl}$ is a strong monoprotic acid, so $[\mathrm{H^+}] = 0.0100\ \mathrm{M}$
2. $\mathrm{pH} = -\log(0.0100) = 2.00$
3. For the base, $[\mathrm{OH^-}] = 0.0100\ \mathrm{M}$, so $\mathrm{pOH} = 2.00$
4. $\mathrm{pH} = 14.00 - 2.00 = 12.00$

> [!success]- Answer
> **pH 2.00 for the acid and pH 12.00 for the base.**

> [!warning] Trap
> Reporting pH 2.00 for the NaOH as well, or forgetting to subtract the pOH from 14. A strong BASE gives pOH directly; the pH conversion is a separate step.

### P2. Find the pH and the percent ionisation of $0.100\ \mathrm{M}$ acetic acid, $K_a = 1.8\times10^{-5}$.

**Given:** C = 0.100 M; K_a = 1.8×10⁻⁵

**Solution:**

1. Let $x = [\mathrm{H^+}] = [\mathrm{CH_3COO^-}]$; then $K_a = x^2/(0.100 - x)$
2. Assume $x \ll 0.100$: $x \approx \sqrt{K_aC} = \sqrt{(1.8\times10^{-5})(0.100)} = \sqrt{1.8\times10^{-6}} = 1.34\times10^{-3}$
3. Check: $x/C = 0.0134 = 1.34\% < 5\%$, so the approximation is valid
4. $\mathrm{pH} = -\log(1.34\times10^{-3}) = 2.87$

> [!success]- Answer
> **pH $= 2.87$ with $1.34\%$ ionisation.**

> [!warning] Trap
> Using $\mathrm{pH} = -\log(0.100) = 1.00$ as if acetic acid were strong. The weak acid is only 1.3% ionised, so the true pH is nearly two units higher.

### P3. Find the pH of $0.100\ \mathrm{M}$ ammonia solution, $K_b = 1.8\times10^{-5}$.

**Given:** C(NH3) = 0.100 M; K_b = 1.8×10⁻⁵

**Solution:**

1. $[\mathrm{OH^-}] \approx \sqrt{K_bC} = \sqrt{1.8\times10^{-6}} = 1.34\times10^{-3}\ \mathrm{M}$
2. $\mathrm{pOH} = -\log(1.34\times10^{-3}) = 2.87$
3. $\mathrm{pH} = 14.00 - 2.87 = 11.13$

> [!success]- Answer
> **pH $= 11.13$.**

> [!warning] Trap
> Computing $-\log(0.100) = 1.00$ and reporting pH 1.00, or forgetting the final subtraction and answering 2.87. A weak base gives pOH; the pH needs the 14.00 step.

### P4. A buffer is $0.250\ \mathrm{M}$ in acetic acid and $0.100\ \mathrm{M}$ in sodium acetate. Find its pH. ($\mathrm{p}K_a = 4.74$)

**Given:** [HA] = 0.250 M; [A-] = 0.100 M; pKa = 4.74

**Solution:**

1. $\mathrm{pH} = \mathrm{p}K_a + \log([\mathrm{A^-}]/[\mathrm{HA}])$
2. $= 4.74 + \log(0.100/0.250) = 4.74 + \log(0.400)$
3. $= 4.74 - 0.398 = 4.34$

> [!success]- Answer
> **pH $= 4.34$.**

> [!warning] Trap
> Inverting the ratio and answering $4.74 + 0.398 = 5.14$. The conjugate BASE goes in the numerator; the sign of the log term flips with the inversion.

### P5. $1.00\ \mathrm{L}$ of a buffer that is $0.100\ \mathrm{M}$ in acetic acid and $0.100\ \mathrm{M}$ in sodium acetate ($\mathrm{p}K_a = 4.74$) has $0.0100\ \mathrm{mol}$ of $\mathrm{HCl}$ added. Find the new pH and compare it with the unbuffered case.

**Given:** V = 1.00 L; [HA] = [A-] = 0.100 M; n(HCl) added = 0.0100 mol; pKa = 4.74

**Solution:**

1. Initial pH: equal concentrations give $\mathrm{pH} = \mathrm{p}K_a = 4.74$
2. The added acid converts $\mathrm{A^-}$ to $\mathrm{HA}$ quantitatively: $n(\mathrm{HA}) = 0.100 + 0.0100 = 0.110\ \mathrm{mol}$ and $n(\mathrm{A^-}) = 0.100 - 0.0100 = 0.0900\ \mathrm{mol}$ in 1.00 L
3. $\mathrm{pH} = 4.74 + \log(0.0900/0.110) = 4.74 - 0.087 = 4.65$
4. For comparison, adding the same acid to 1.00 L of pure water gives $[\mathrm{H^+}] = 0.0100\ \mathrm{M}$ and pH 2.00

> [!success]- Answer
> **The buffer moves from pH 4.74 to 4.65 (a change of 0.09); the same acid in pure water gives pH 2.00.**

> [!warning] Trap
> Setting up an ICE table with $K_a$ against the added acid instead of treating it as a stoichiometric neutralisation. Strong acid added to a buffer is a limiting-reagent step; only the updated ratio goes into Henderson-Hasselbalch.

## Traps & Exam Notes

- **Using pH + pOH = 14 at any temperature.** The sum is $\mathrm{p}K_w$, which is 14.00 only at 25 °C; at 60 °C it is about 13.0 and neutral water has pH 6.5. Applying 14 elsewhere shifts every answer.
- **Treating a weak acid as strong.** Acetic acid at 0.100 M has pH 2.87, not 1.00, because only 1.3% is ionised. The error grows as $K_a$ shrinks and can exceed two pH units.
- **Skipping the 5% validity check.** Dropping $x$ from the denominator is only legitimate when $x/C < 0.05$; at 30% ionisation the approximated pH is off by more than the effect the question is measuring.
- **Inverting the Henderson-Hasselbalch ratio.** Base over acid, always. Swapping them flips the sign of the log term, so a buffer that should read pH 4.34 comes out 5.14 — on the wrong side of $\mathrm{p}K_a$.
- **Assuming a weak acid–strong base titration ends at pH 7.** At equivalence the solution contains only the conjugate base of the weak acid, so it is basic; the equivalence pH is above 7 and only a strong acid–strong base titration lands on 7.
- **Running an equilibrium calculation when stoichiometry is what is needed.** Adding strong acid or base to a buffer consumes the pair completely; setting up $K_a$ against the added amount produces a wrong answer and a spurious ICE table.

## See Also

- [[07_Chemical_Equilibrium_and_Le_Chatelier]]
- [[06_Solutions_and_Concentration_Units]]
- [[09_Redox_and_Galvanic_Cells]]

---

[[07_Chemical_Equilibrium_and_Le_Chatelier|⬅ 07]] · [[_MOC_General_Chemistry|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Redox_and_Galvanic_Cells|09 ➡]]
