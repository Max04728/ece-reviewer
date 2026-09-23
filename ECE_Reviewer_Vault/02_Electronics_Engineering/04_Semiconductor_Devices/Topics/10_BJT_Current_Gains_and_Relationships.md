---
id: ECE-04-10
title: "BJT Current Gains and Relationships"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[09_BJT_Structure_and_Operating_Regions]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — BJT Current Gains and Relationships

> [!abstract] Scope
> Convert between alpha and beta, compute the three terminal currents from any one of them, and fold junction leakage into the exact DC current relations.

## Core Concept

> [!tip] Intuition
> Think of the emitter current as a stream of carriers crossing the base. About 99 of every 100 reach the collector (that fraction is alpha), and the one that recombines in the base is the base current. Since the base current is the small leftover, the ratio beta = alpha/(1-alpha) is huge and extremely sensitive to tiny changes in alpha.

**Two gains describe the same device.** Because $I_E=I_C+I_B$, only two of the three terminal currents are independent, so there are two ways to express how much of the input current reaches the output. **Alpha** is the common-base current gain, $\alpha=I_C/I_E$: the fraction of injected emitter carriers that arrive at the collector. It is always slightly less than 1, typically $0.95$ to $0.998$. **Beta** is the common-emitter current gain, $\beta=I_C/I_B$: how many units of collector current you get per unit of base current. It is much larger than 1, typically $20$ to $500$, and it is the parameter quoted on every data sheet as $h_{FE}$.

**Why beta is large, and why that makes it unreliable.** During forward-active operation the forward-biased emitter junction injects carriers into the base. Only about 1 percent of them recombine with majority carriers in the thin, lightly doped base region, and that recombination current is $I_B$. Separation of the algebra gives $\beta=\alpha/(1-\alpha)$ and $\alpha=\beta/(1+\beta)$, so the whole size of $\beta$ lives in the tiny quantity $1-\alpha$. For $\alpha=0.99$, $1-\alpha=0.01$ and $\beta=99$; nudge $\alpha$ to $0.995$ and $\beta$ doubles to $199$. A 0.5 percent change in the physical structure therefore doubles the current gain, which is why two transistors of the same part number can have $\beta$ values differing by a factor of 3 to 5. Board-exam design questions always specify a **minimum** $\beta$ (or a range) for exactly this reason, and a good bias network is deliberately made insensitive to $\beta$.

**Exact DC relations carry the leakage terms.** The ideal relations $I_C=\beta I_B$ and $I_C=\alpha I_E$ ignore the reverse saturation current of the collector-base junction. The exact forms are $I_C=\alpha I_E+I_{CBO}$ and $I_E=I_C+I_B$, where $I_{CBO}$ is the collector-base leakage measured with the emitter **o**pen and $I_{CEO}=(1+\beta)I_{CBO}$ is the collector-emitter leakage measured with the **b**ase open. The $(1+\beta)$ factor is not a fudge: leakage crossing the collector-base junction acts as base current, so the transistor amplifies it just like any other base current. This is why $I_{CEO}$ is the number you actually see as the cutoff current, and why it is about $100$ times larger than $I_{CBO}$ at $\beta=100$. Both leakages roughly double for every $10\ \mathrm{^\circ C}$ rise, so a germanium device with $I_{CBO}$ in the microamp range is unusable at high temperature while a silicon device with $I_{CBO}$ in the nanoamp range is not.

**What to use in practice.** For hand analysis at moderate temperatures the leakage terms are negligible and $I_C=\beta I_B$, $I_E=(1+\beta)I_B$, $I_E=I_C+I_B$ are all you need. Use the exact forms when the problem hands you $I_{CBO}$, when the device is germanium, when the temperature is elevated, or when the question asks for the error introduced by neglecting leakage. Remember three practical facts: $\beta$ is not a constant but a function of $I_C$, $V_{CE}$ and temperature (it rises roughly 0.5 to 1 percent per degree C and falls off at very low and very high currents); the DC gain $h_{FE}$ and the small-signal gain $h_{fe}=\Delta I_C/\Delta I_B$ are different numbers for the same device; and in saturation the ratio $I_C/I_B$ collapses to $\beta_{forced}$, typically 10 to 50, because the collector current is set by the external circuit, not by the transistor.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Exact current law at the device | $I_E = I_C + I_B$ | Exact for NPN and PNP in every region, and the check that validates any three measured currents. Never assume I_E = I_C unless beta is stated as very large. |
| Common-base current gain | $\alpha = \frac{I_C}{I_E}$ | Always slightly less than 1 for a good device (0.95 to 0.998). Dimensionless; alpha = 1 would mean zero base current, which is impossible. |
| Common-emitter current gain | $\beta = \frac{I_C}{I_B}$ | The data-sheet h_FE. Typical 20-500 and strongly dependent on I_C, V_CE and temperature. In saturation the measured I_C/I_B is beta_forced, not beta. |
| Beta from alpha | $\beta = \frac{\alpha}{1 - \alpha}$ | The denominator is the whole story: a 1 percent error in alpha changes beta by roughly 100 percent. Do not write alpha/(1+alpha). |
| Alpha from beta | $\alpha = \frac{\beta}{1 + \beta}$ | Check: beta = 100 gives alpha = 100/101 = 0.9901. Use this whenever a problem gives beta but an equation needs alpha. |
| Ideal collector current | $I_C = \beta I_B = \alpha I_E$ | Forward-active only, leakage neglected. Valid for silicon at room temperature when the problem does not mention I_CBO. |
| Emitter current in terms of base current | $I_E = (1+\beta) I_B$ | Follows from the two relations above. Handy when I_B is given and the answer needs I_E. |
| Exact collector current with leakage | $I_C = \alpha I_E + I_{CBO}$ | I_CBO is the collector-base leakage with the emitter open, in the nanoamp range for silicon and the microamp range for germanium. Note the alpha multiplies I_E, not I_C. |
| Leakage amplified by the transistor | $I_{CEO} = (1+\beta) I_{CBO}$ | Collector-emitter leakage with the base open. The (1+beta) factor is the trap: I_CEO is about 100x I_CBO at beta = 100, not equal to it. |
| Forced beta in saturation | $\beta_{forced} = \frac{I_{C(sat)}}{I_B} < \beta$ | Used to describe an overdriven switch. A ratio of 10-50 guarantees saturation despite beta spread, temperature and load variation. |

## Worked Problems

### P1. Convert both ways: (a) a transistor has $\beta=100$ and another has $\beta=250$; find each $\alpha$. (b) A device is measured with $\alpha=0.99$ and another with $\alpha=0.995$; find each $\beta$.

**Given:** Case a: beta = 100 and beta = 250; Case b: alpha = 0.99 and alpha = 0.995

**Solution:**

1. alpha = beta/(1+beta): for beta = 100, alpha = 100/101 = 0.99010
2. For beta = 250, alpha = 250/251 = 0.99602
3. beta = alpha/(1-alpha): for alpha = 0.99, beta = 0.99/0.01 = 99
4. For alpha = 0.995, beta = 0.995/0.005 = 199

> [!success]- Answer
> **beta = 100 gives alpha = 0.9901; beta = 250 gives alpha = 0.9960; alpha = 0.99 gives beta = 99; alpha = 0.995 gives beta = 199.**

> [!warning] Trap
> Assuming alpha and beta are interchangeable or that alpha = 0.99 means beta = 99 always. The point of part (b) is the sensitivity: raising alpha by half a percent doubles beta from 99 to 199, so a device-to-device spread in alpha of a fraction of a percent becomes a 2:1 spread in beta.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line separated by `ALPHA` `:` — `100÷(1+100) : 250÷(1+250) : 0.99÷(1−0.99) : 0.995÷(1−0.995)`.
> 2. `=` down the chain: $\alpha$ = **0.99010** → **0.99602** → $\beta$ = **99** → **199**.
>
> The whole size of $\beta$ lives in $1-\alpha$: half a percent in $\alpha$ doubles $\beta$.

### P2. An NPN transistor in forward-active mode has $I_B=25\ \mu\mathrm{A}$ and $\beta=180$. Find $I_C$, $I_E$ and $\alpha$.

**Given:** I_B = 25 uA; beta = 180; Forward-active, leakage negligible

**Solution:**

1. I_C = beta * I_B = 180 * 25 uA = 4500 uA = 4.50 mA
2. I_E = I_C + I_B = 4.50 mA + 0.025 mA = 4.525 mA
3. alpha = I_C/I_E = 4.50/4.525 = 0.99448
4. Check: alpha = beta/(1+beta) = 180/181 = 0.99448, which agrees

> [!success]- Answer
> **I_C = 4.50 mA, I_E = 4.525 mA, alpha = 0.9945.**

> [!warning] Trap
> Rounding I_E to 4.50 mA and then reporting alpha = 1.000. Keeping the base current in I_E is what makes alpha slightly under 1, and the examiner is usually checking exactly that.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `180×25E-6` → **4.50** mA = $I_C$.
> 2. `+25E-6` → **4.525** mA = $I_E$; `4.5÷4.525` → **0.99448**, matching `180÷181`.
>
> Keep the base current in $I_E$ — rounding it away reports $\alpha = 1.000$.

### P3. A silicon transistor has $I_{CBO}=200\ \mathrm{nA}$ and $\beta=100$. Find $I_{CEO}$, then the collector current when $I_B=50\ \mu\mathrm{A}$, and the percentage error if the leakage is neglected.

**Given:** I_CBO = 200 nA; beta = 100; I_B = 50 uA

**Solution:**

1. I_CEO = (1+beta)*I_CBO = 101 * 200 nA = 20200 nA = 20.2 uA
2. Ideal gain term: beta*I_B = 100 * 50 uA = 5000 uA = 5.000 mA
3. Including leakage: I_C = beta*I_B + I_CEO = 5.000 + 0.0202 = 5.0202 mA
4. Error from neglecting leakage = 0.0202/5.000 = 0.404 percent, about 0.4 percent

> [!success]- Answer
> **I_CEO = 20.2 uA; I_C = 5.0202 mA, so neglecting leakage underestimates I_C by 0.40 percent.**

> [!warning] Trap
> Writing I_CEO = beta*I_CBO = 20.0 uA instead of (1+beta)*I_CBO = 20.2 uA. The missing 1 is small here, but the same mistake at beta = 10 halves the leakage estimate, and leakage is what dominates the cutoff behaviour of the stage.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `101×200E-9` → **20.2** µA = $I_{CEO}$; store with `SHIFT` `STO` `A`.
> 2. `100×50E-6+A` → **5.0202** mA = $I_C$.
> 3. Error: `A÷5E-3` → **0.404** %.
>
> $I_{CEO} = (1+\beta)I_{CBO}$; at low $\beta$ the missing 1 is a large error.

### P4. A transistor is biased in the active region and the terminal currents are measured as $I_E=10.05\ \mathrm{mA}$ and $I_B=0.05\ \mathrm{mA}$. Find $I_C$, $\alpha$ and $\beta$, and verify that the three values are mutually consistent.

**Given:** I_E = 10.05 mA; I_B = 0.05 mA; Active region

**Solution:**

1. KCL: I_C = I_E - I_B = 10.05 - 0.05 = 10.00 mA
2. alpha = I_C/I_E = 10.00/10.05 = 0.995025
3. beta = I_C/I_B = 10.00/0.05 = 200
4. Consistency check: alpha = beta/(1+beta) = 200/201 = 0.995025, matching the measured alpha

> [!success]- Answer
> **I_C = 10.00 mA, alpha = 0.9950, beta = 200; the pair satisfies alpha = beta/(1+beta) exactly.**

> [!warning] Trap
> Computing alpha as I_C/I_B = 200 or beta as I_E/I_B = 201. Alpha always has the emitter in the denominator and beta always has the base; swapping them produces values that fail the consistency check, which is the fastest way to catch the error in an exam.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10.05−0.05` → **10.00** mA = $I_C$ by KCL.
> 2. `10÷10.05` → **0.99502** = $\alpha$; `10÷0.05` → **200** = $\beta$.
> 3. Consistency: `200÷201` → **0.99502**, which matches the measured $\alpha$.
>
> $\alpha$ always divides by $I_E$ and $\beta$ by $I_B$; swapping gives 200 and 201.

### P5. A design needs $I_C=12\ \mathrm{mA}$ from a base drive of $I_B=60\ \mu\mathrm{A}$. What $\beta$ is required, and what $I_E$ results? If the guaranteed minimum $\beta$ for the part is only 150, what base current must the design supply instead?

**Given:** Target I_C = 12 mA; Available I_B = 60 uA; beta_min = 150

**Solution:**

1. Required beta = I_C/I_B = 12 mA / 60 uA = 200
2. alpha = beta/(1+beta) = 200/201 = 0.99502
3. I_E = I_C/alpha = 12 mA / 0.99502 = 12.06 mA, which also equals I_C + I_B
4. Worst case beta_min = 150: I_B = I_C/beta_min = 12 mA / 150 = 80 uA, so the drive must be raised from 60 uA to at least 80 uA

> [!success]- Answer
> **Required beta = 200, giving I_E = 12.06 mA; against beta_min = 150 the design must supply I_B = 80 uA.**

> [!warning] Trap
> Designing to the typical beta of 200 and stopping there. The part is only guaranteed to give 150, so the 60 uA drive would deliver I_C = 9 mA, 25 percent below target. Always size base drive from beta_min, and in a switching stage from beta_forced = 10 to 50 rather than beta at all.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `12E-3÷60E-6` → **200** = the required $\beta$.
> 2. `200÷201` → **0.99502**; `12E-3÷Ans` → **12.06** mA = $I_E$.
> 3. Worst case: `12E-3÷150` → **80** µA of base drive.
>
> Size the drive from $\beta_{min}$: at 60 µA and $\beta = 150$ the stage gives only 9 mA.

## Traps & Exam Notes

- **Treating $\alpha$ and $\beta$ as the same number.** $\alpha<1$ always (0.95 to 0.998) while $\beta$ is 20 to 500. A common wrong answer is $\alpha=\beta=100$, which violates $I_E=I_C+I_B$.
- **Using $\beta=\alpha/(1+\alpha)$ or $\alpha=\beta/(1-\beta)$.** The correct pair is $\beta=\alpha/(1-\alpha)$ and $\alpha=\beta/(1+\beta)$. Sanity-check any result: $\alpha$ must come out below 1 and $\beta$ above 1.
- **Using $I_C=\beta I_B$ for a saturated transistor.** In saturation $I_C/I_B=\beta_{forced}<\beta$ because the external resistor sets the current. The symptom is an $I_C$ greater than $(V_{CC}-V_{CE(sat)})/R_C$.
- **Forgetting the $(1+\beta)$ in $I_{CEO}$.** $I_{CEO}=(1+\beta)I_{CBO}$, not $\beta I_{CBO}$ and certainly not $I_{CBO}$. At $\beta=100$ the collector-emitter leakage is about 100 times the collector-base figure, and it is $I_{CEO}$ that appears as the cutoff current.
- **Designing to a typical $\beta$ instead of the guaranteed minimum.** $\beta$ varies 3:1 to 5:1 between parts of the same type, plus roughly 0.5 to 1 percent per degree C, so a design valid at typical gain can sit 25 percent low at minimum gain.
- **Ignoring that leakage doubles every $10\ \mathrm{^\circ C}$.** A germanium stage with $I_{CBO}=2\ \mu\mathrm{A}$ at $25\ \mathrm{^\circ C}$ has about $64\ \mu\mathrm{A}$ at $85\ \mathrm{^\circ C}$, which after the $(1+\beta)$ amplification can be milliamps and can drive the stage out of cutoff entirely.

## See Also

- [[09_BJT_Structure_and_Operating_Regions]]
- [[01_BJT_DC_Biasing_Configurations]]
- [[05_BJT_Small-Signal_h-Parameter_Model]]

---

[[09_BJT_Structure_and_Operating_Regions|⬅ 09]] · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[11_JFET_Characteristics_and_Pinch-Off|11 ➡]]
