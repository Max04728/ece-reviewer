---
id: MATH-09-08
title: "Normal Distribution and Z Scores"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 8
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Central_Tendency]]", "[[02_Dispersion,_Variance,_SD,_IQR_and_CV]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Normal Distribution and Z Scores

> [!abstract] Scope
> Standardise any normal variable to a z-score, read probabilities off the standard normal table, and invert the table to find percentiles and specification limits.

## Core Concept

> [!tip] Intuition
> Every normal curve is the same bell after a shift and a stretch. The z-score says how many standard deviations a value sits from the mean, which turns an infinite family of tables into one.

**The standardisation formula and why it works.** $z=\frac{x-\mu}{\sigma}$ measures the distance from the mean in standard-deviation units. Subtracting $\mu$ centres the distribution at 0; dividing by $\sigma$ rescales the width to 1. Because the transformation is linear, areas (probabilities) are preserved:
$$P(a<X<b)=P\left(\frac{a-\mu}{\sigma}<Z<\frac{b-\mu}{\sigma}\right)$$

**The empirical rule as a fast approximation.** About $68.3\%$ of a normal population lies within $\pm1\sigma$, $95.4\%$ within $\pm2\sigma$ and $99.7\%$ within $\pm3\sigma$. This answers many qualitative questions instantly: a result $3\sigma$ from the mean has probability about $0.3\%$ of occurring — the basis of both control charts and the 'six sigma' quality target. The precise table values are 0.6827, 0.9545 and 0.9973.

**Using the table correctly.** The standard normal table gives $\Phi(z)=P(Z\le z)$, the area to the *left*. For a right-tail question use $1-\Phi(z)$; for between two values use $\Phi(z_2)-\Phi(z_1)$; for 'greater than' with a negative $z$ use symmetry, $P(Z> -a)=P(Z<a)$. Draw the curve and shade the region before touching the table — most errors are shading errors, not arithmetic.

**Common critical values worth memorising.** $z_{0.90}=1.282$, $z_{0.95}=1.645$, $z_{0.975}=1.960$, $z_{0.99}=2.326$, $z_{0.995}=2.576$. The 1.96 figure is the reason 95% confidence intervals use that multiplier, and 1.645 is the one-tailed 5% value.

**Inverse normal — finding a value from a probability.** For a percentile, invert: $x=\mu+z_p\sigma$ where $z_p$ is the table value with area $p$ to its left. For a *top* 10% cut-off, $p=0.90$ so $z=1.282$; for a bottom 5% limit, $z=-1.645$. Reading $p$ from the wrong tail is the standard mistake — the table's $z$ always has area $p$ to the **left**.

**Linear combinations stay normal.** If $X\sim N(\mu,\sigma^{2})$ then $aX+b\sim N(a\mu+b,\ a^{2}\sigma^{2})$ — the *variance* is multiplied by $a^{2}$. Sums of independent normals are normal with means and variances added. This is what makes the sample mean normal and underpins the confidence intervals in the next topics.

**When the normal model is invalid.** The normal is continuous and symmetric. It is a poor model for heavily skewed data, for small counts (use Poisson or binomial) and for bounded quantities near their limits. The rule of thumb for the binomial approximation is $np\ge5$ and $n(1-p)\ge5$.

## Derivation

**Where the density comes from.** The normal density is $f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/(2\sigma^2)}$. Taking its logarithm gives $g(x)=\ln f(x) = -\frac{(x-\mu)^2}{2\sigma^2} - \ln(\sigma\sqrt{2\pi})$, which is a downward-opening parabola in $x$. Solving $g'(x)=-\frac{x-\mu}{\sigma^2}=0$ puts the mode at $x=\mu$; then $g''(x)=-\frac{1}{\sigma^2}<0$ confirms a maximum and shows the curvature is governed entirely by $\sigma$. The inflection points, where $g''$ changes sign, satisfy $(x-\mu)^2=\sigma^2$, i.e. $x=\mu\pm\sigma$ — so the standard deviation is exactly the half-width at the inflection point. That is a genuinely examinable structural fact, not just a definition.

**Why a single table suffices.** Let $Z=\frac{X-\mu}{\sigma}$ for $X\sim N(\mu,\sigma^2)$. Then for any $x$,

$$P(X\le x)=P\!\left(\frac{X-\mu}{\sigma}\le\frac{x-\mu}{\sigma}\right)=P(Z\le z)=\Phi(z).$$

The step that makes this work is that dividing by the positive constant $\sigma$ does not reverse the inequality, and subtracting $\mu$ shifts both sides equally. The normal family is therefore closed under linear transformation: there is only one normal distribution, expressed in different units. Every table entry serves every problem.

**The empirical rule from three table values.** The symmetry $\Phi(-z)=1-\Phi(z)$ together with $\Phi(1)=0.8413$, $\Phi(2)=0.9772$ and $\Phi(3)=0.9987$ gives the familiar bands: $P(\lvert Z\rvert\le1)=2(0.8413)-1=0.6827$, $P(\lvert Z\rvert\le2)=0.9545$ and $P(\lvert Z\rvert\le3)=0.9973$. Recognising a question that lands on these values lets you answer without a table, which is usually faster and less error-prone.

**Inverting the table.** For a percentile question, the table must be read backwards. Because the table gives the area to the *left*, a request for the top $10\%$ requires $z$ with $\Phi(z)=0.90$, giving $z=1.282$, and then $x=\mu+z\sigma$. A request for the bottom $10\%$ uses $z=-1.282$. Mixing these two up — using $0.10$ where $0.90$ was needed — is the single most common error in percentile problems.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Standard score | $z = \frac{x-\mu}{\sigma}$ | Units are standard deviations from the mean; z is dimensionless. |
| Back-transform | $x = \mu + z\sigma$ | Used for percentiles and specification limits. |
| Probability between two values | $P(a<X<b) = \Phi\!\left(\frac{b-\mu}{\sigma}\right) - \Phi\!\left(\frac{a-\mu}{\sigma}\right)$ | Phi is the standard normal CDF (area to the left). |
| Right tail | $P(X>x) = 1-\Phi(z)$ | For 'greater than' questions. |
| Symmetry | $\Phi(-z) = 1-\Phi(z)$ | Turns negative z-values into table lookups. |
| Empirical rule | $P(\mu\pm\sigma)=0.6827, \quad P(\mu\pm2\sigma)=0.9545, \quad P(\mu\pm3\sigma)=0.9973$ | Useful approximations; the table gives exact values. |
| Critical values | $z_{0.90}=1.282,\ z_{0.95}=1.645,\ z_{0.975}=1.960,\ z_{0.99}=2.326,\ z_{0.995}=2.576$ | Subscript is the area to the LEFT. |
| Percentile | $x_p = \mu + z_p\sigma$ | Match the tail: a top-10% cut uses z with area 0.90 to its left. |
| Linear transformation | $aX+b \sim N(a\mu+b,\ a^{2}\sigma^{2})$ | Variance scales by a^2, not a. |
| Sum of independent normals | $X+Y \sim N(\mu_X+\mu_Y,\ \sigma_X^{2}+\sigma_Y^{2})$ | Variances add; standard deviations do not. |

## Interactive Widget

**Normal Curve Z Table**

![[Normal_Curve_Z_Table.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Resistors have a mean of $100\ \Omega$ and a standard deviation of $2\ \Omega$, normally distributed. Find $P(98<X<103)$ and the probability that a resistor exceeds $103\ \Omega$.

**Given:** mu = 100 ohm; sigma = 2 ohm

**Solution:**

1. Standardise both limits: z1 = (98-100)/2 = -1.00; z2 = (103-100)/2 = 1.50
2. P(98<X<103) = Phi(1.50) - Phi(-1.00)
3. Phi(1.50) = 0.933193; Phi(-1.00) = 0.158655
4. P = 0.933193 - 0.158655 = 0.774538
5. P(X>103) = 1 - Phi(1.50) = 1 - 0.933193 = 0.066807
6. Note that P(X>103) is the area above one and a half standard deviations — about 6.7%, far more than a 3-sigma event

> [!success]- Answer
> **$P(98<X<103) = 0.7745$; $P(X>103) = 0.0668$.**

> [!warning] Trap
> Reading the table value for $z=1.50$ as the probability directly (0.9332) instead of as the cumulative area to the left. The question asks for an interval or a right tail, so the table entry must be combined with $\Phi(-1)$ or subtracted from 1.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` STAT, then `Apps` → `Distr` → `R(` — no z-table: `R(1.5)` → **0.066807** = P(X > 103).
> 2. Interval from the same key: `R(−1)−R(1.5)` → **0.774538** = P(98 < X < 103).
> 3. The two table entries explicitly: Φ(−1) = `1−R(−1)` = **0.158655** and Φ(1.5) = **0.933193**.
>
> `R(` is the machine's upper tail, so P(a < X < b) = R(za) − R(zb); here z = (x − 100)/2.

### P2. Bolt diameters are normal with $\mu=2.50\ \mathrm{cm}$ and $\sigma=0.01\ \mathrm{cm}$. The specification is $2.48$ to $2.52\ \mathrm{cm}$. What fraction of bolts is acceptable?

**Given:** USL = 2.52, LSL = 2.48; mu = 2.50, sigma = 0.01

**Solution:**

1. z_lower = (2.48-2.50)/0.01 = -2.00
2. z_upper = (2.52-2.50)/0.01 = +2.00
3. P(acceptable) = Phi(2.00) - Phi(-2.00)
4. = 0.977250 - 0.022750 = 0.954500
5. So about 4.55% of bolts fall outside the specification, split equally between too small and too large
6. The specification limits sit at mu +/- 2 sigma, matching the empirical rule's 95.4%

> [!success]- Answer
> **$95.45\%$ acceptable ($4.55\%$ rejected).**

> [!warning] Trap
> Computing only one tail and reporting 2.28% rejection. Both tails are outside the specification, and for a symmetric two-sided limit the total is twice the one-tail probability.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. z for the lower limit: `(2.48−2.50)÷0.01` → **−2.00**, and for the upper limit **+2.00**.
> 2. `Apps` → `Distr` → `R(`: `R(−2)−R(2)` → **0.954500**, so **95.45%** of bolts are acceptable.
> 3. Rejection = 1 − 0.9545 = **0.0455**, split into 2.275% undersized and 2.275% oversized.
>
> Both tails count; one tail alone (2.28%) is the trap answer.

### P3. A machine fills packages with a mean of $500\ \mathrm{g}$ and a standard deviation of $10\ \mathrm{g}$, normally distributed. The label requires at least $480\ \mathrm{g}$. What percentage of packages is underfilled? What limits capture the middle $95\%$?

**Given:** mu = 500, sigma = 10; lower limit 480

**Solution:**

1. z = (480-500)/10 = -2.00
2. P(X<480) = Phi(-2.00) = 0.022750, so 2.28% are underfilled
3. Middle 95% leaves 5% in the two tails combined, so 2.5% in each tail
4. Critical value: z = 1.960 (area 0.975 to the left)
5. Limits: 500 +/- 1.960(10) = 500 +/- 19.6 = 480.4 to 519.6 g
6. Check: the lower end of the central 95% (480.4) is essentially the legal limit of 480, so the process just barely meets it

> [!success]- Answer
> **$2.28\%$ underfilled; the middle $95\%$ spans $480.4$ to $519.6\ \mathrm{g}$.**

> [!warning] Trap
> Using $z=1.645$ for the middle 95%. The 1.645 value corresponds to 5% in *one* tail (a one-sided 95%); a two-sided 95% interval uses $z=1.96$ because the remaining 5% is split between both tails.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. z(480) = `(480−500)÷10` → **−2.00**, so underfilled = `1−R(−2)` → **0.022750**, i.e. **2.28%**.
> 2. The central 95% leaves 2.5% in each tail, so the multiplier is z = **1.960** (there is no inverse-normal key).
> 3. Limits: `500−1.96×10` → **480.4** g to `500+1.96×10` → **519.6** g.
>
> A two-sided 95% interval uses 1.96; 1.645 is the one-sided 95% value with 5% in a single tail.

### P4. Scores are normal with $\mu=70$ and $\sigma=8$. Find the score that separates the top $10\%$, and the probability that a score is below 64.

**Given:** mu = 70, sigma = 8

**Solution:**

1. Top 10% means 90% of the area lies to the left, so use z with left area 0.90
2. z = 1.282 (from z_0.90)
3. x = mu + z sigma = 70 + 1.282(8) = 70 + 10.25 = 80.25
4. P(X<64): z = (64-70)/8 = -0.75; Phi(-0.75) = 0.226627
5. So about 22.7% of scores fall below 64
6. Cross-check with the empirical rule: 64 is 0.75 sigma below the mean, so the lower tail should be between the 16% (one sigma) and 50% figures — 22.7% is consistent

> [!success]- Answer
> **Top-$10\%$ cut-off $= 80.25$; $P(X<64) = 0.2266$.**

> [!warning] Trap
> Using $z=1.282$ with the area in the right tail for the top-10% cut. Tables give the area to the left, so the top 10% needs left area 0.90; confusing the two tails gives 60.6 instead of 80.25.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. Top 10% means 0.90 of the area to the left, so the multiplier is the memorised z = **1.282**.
> 2. Cut-off: `70+1.282×8` → **80.256**, about **80.3**.
> 3. Below 64 from `Distr`: `1−R(−0.75)` → **0.226627**, so about **22.7%** of scores fall below 64.
>
> The table's z always carries area to its left, so a top-10% cut reads 0.90 — reading 0.10 puts the cut below the mean.

### P5. The lifetime of a device is normal with a mean of 5 years and a standard deviation of 0.5 years. The warranty is 4 years. What fraction of devices is returned under warranty, and what warranty period would limit returns to $2.5\%$?

**Given:** mu = 5, sigma = 0.5; warranty = 4 years

**Solution:**

1. z for 4 years: (4-5)/0.5 = -2.00
2. P(failure before 4 years) = Phi(-2.00) = 0.022750, so 2.28% are returned
3. For 2.5% returns, use z = -1.960 (2.5% in the lower tail)
4. w = mu + z sigma = 5 + (-1.960)(0.5) = 5 - 0.980 = 4.02 years
5. So shortening the warranty from 4.00 to 4.02 years is not the issue: the current 4-year warranty is already very close to a 2.5% return rate
6. Marginal accuracy matters: the difference between 4.00 and 4.02 years is 0.02/0.5 = 0.04 sigma, which changes the tail probability by less than 0.15 percentage points

> [!success]- Answer
> **$2.28\%$ returned under a 4-year warranty; a 4.02-year warranty limits returns to $2.5\%$.**

> [!warning] Trap
> Using $z=+1.96$ for a lower-tail warranty calculation. A warranty loss is a *low* lifetime, so the z-score must be negative; dropping the sign places the cut-off above the mean and produces a nonsensical warranty longer than the device's average life.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. z(4) = `(4−5)÷0.5` → **−2.00**, so returned = `1−R(−2)` → **0.022750**, i.e. **2.28%**.
> 2. For 2.5% in the lower tail the multiplier is z = **−1.960**.
> 3. Warranty: `5−1.96×0.5` → **4.02** years.
>
> A warranty loss is a *low* lifetime, so z is negative; dropping the sign puts the warranty above the mean life.

### P6. Two independent components have lifetimes $X\sim N(100, 10^{2})$ and $Y\sim N(150, 15^{2})$ hours. Find the mean and standard deviation of the total lifetime $X+Y$, and $P(X+Y>280)$.

**Given:** X ~ N(100, 100); Y ~ N(150, 225); independent

**Solution:**

1. Means add: mu = 100 + 150 = 250 hours
2. Variances add (not standard deviations): sigma^2 = 100 + 225 = 325
3. sigma = sqrt(325) = 18.028 hours
4. z = (280-250)/18.028 = 1.664
5. P(X+Y>280) = 1 - Phi(1.664) = 1 - 0.9519 = 0.0481
6. Note the wrong route: adding standard deviations gives 25 hours and z = 1.2, a probability of 0.115 — more than double the correct value

> [!success]- Answer
> **$\mu = 250$ h, $\sigma = 18.03$ h; $P(X+Y>280) = 0.048$.**

> [!warning] Trap
> Adding standard deviations, $10+15=25$, instead of variances. For independent normal variables variances add; the standard deviation of the sum is always less than the sum of the standard deviations.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. Variances add: `10²+15²` → **325**, so σ = `√325` → **18.0278** h against a mean of `100+150` = **250** h.
> 2. z = `(280−250)÷18.0278` → **1.6641**.
> 3. `Apps` → `Distr` → `R(1.6641)` → **0.0480**; the note's 0.0481 is a 4-digit table interpolation.
>
> Adding the standard deviations gives 25 h and z = 1.2, a tail of 0.115 — more than double the correct probability.

### P7. A process produces shafts with diameters normal, $\mu = 25.00$ mm and $\sigma = 0.04$ mm. Specifications are $25.00 \pm 0.10$ mm. What fraction of shafts meet specification, and what fraction must be scrapped?

**Given:** mu = 25.00 mm; sigma = 0.04 mm; limits 24.90 to 25.10 mm

**Solution:**

1. Standardise both limits: z_low = (24.90 - 25.00)/0.04 = -2.50
2. z_high = (25.10 - 25.00)/0.04 = +2.50
3. P(within) = Phi(2.50) - Phi(-2.50) = 2(0.99379) - 1 = 0.98758
4. Scrap fraction = 1 - 0.98758 = 0.01242

> [!success]- Answer
> **About $98.76\%$ conform; about $1.24\%$ are scrapped.**

> [!warning] Trap
> Reporting only one tail. The specification is two-sided, so both tails must be counted — here the scrap splits into 0.62% oversized and 0.62% undersized.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. Standardise both limits: `(24.90−25.00)÷0.04` → **−2.50** and `(25.10−25.00)÷0.04` → **+2.50**.
> 2. `Apps` → `Distr` → `R(`: `R(−2.5)−R(2.5)` → **0.987581**, so about **98.76%** conform.
> 3. Scrap = 1 − 0.987581 = **0.012419**, splitting into 0.62% oversize and 0.62% undersize.

### P8. Incomes in a region are approximately normal with $\mu = 30{,}000$ and $\sigma = 6{,}000$. What income is exceeded by only $5\%$ of the population?

**Given:** mu = 30000; sigma = 6000; top 5 percent

**Solution:**

1. The top 5 percent corresponds to Phi(z) = 0.95, so z = 1.645
2. Invert the standardisation: x = mu + z sigma
3. x = 30000 + 1.645(6000) = 30000 + 9870

> [!success]- Answer
> **$x \approx 39{,}870$.**

> [!warning] Trap
> Using $z$ for $\Phi(z)=0.05$ (which gives $-1.645$) and then reporting a cut-off below the mean. The wording 'exceeded by only 5 percent' defines a right-tail area, so the table must be read for 0.95.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. 'Exceeded by only 5%' is a right-tail area of 0.05, so the left area is 0.95 and z = **1.645**.
> 2. Invert the standardisation: `30000+1.645×6000` → **39870**.
>
> Φ(z) = 0.05 would give z = −1.645 and a cut-off below the mean — the tail must match the wording.

### P9. Show that the normal density has inflection points at $x = \mu \pm \sigma$, and explain why this makes the standard deviation a geometric property of the curve rather than only a measure of spread.

**Given:** analytic derivation requested

**Solution:**

1. Write ln f(x) = -(x - mu)^2/(2 sigma^2) - ln(sigma sqrt(2 pi))
2. First derivative: g'(x) = -(x - mu)/sigma^2, which is zero at x = mu
3. Second derivative: g''(x) = -1/sigma^2, constant and negative, so x = mu is a maximum
4. The inflection condition is on f itself: f''(x) = 0 gives (x - mu)^2 = sigma^2
5. So x = mu ± sigma

> [!success]- Answer
> **Inflections at $x=\mu\pm\sigma$; the bell's half-width at the point where it stops bending inward is exactly one standard deviation.**

> [!warning] Trap
> Finding the inflection from the inflection of $\ln f$ instead of $f$. The logarithm of the density is a parabola with no inflection at all — the curvature change is a property of the density itself, so $f''=0$ must be solved directly.

### P10. Two normal populations: $A \sim N(50, 5^2)$ and $B \sim N(60, 10^2)$. Compare the probability that a randomly chosen item exceeds 70 in each case.

**Given:** two populations; same threshold, different spreads

**Solution:**

1. For A: z = (70 - 50)/5 = 4.00, so P(X > 70) = 1 - Phi(4.00) = 1 - 0.999968 = 3.2 x 10^-5
2. For B: z = (70 - 60)/10 = 1.00
3. P(X > 70) for B = 1 - Phi(1.00) = 1 - 0.8413 = 0.1587
4. Compare: B is about 5000 times more likely to exceed 70

> [!success]- Answer
> **A: $\approx 3.2\times10^{-5}$; B: $\approx 0.159$ — B exceeds the threshold far more often despite the higher mean.**

> [!warning] Trap
> Concluding that the population with the larger mean always exceeds a threshold more often by a fixed margin. The spread dominates in the tails: a 4-sigma excursion is vanishingly rare, while a 1-sigma one is common.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. Population A: z = `(70−50)÷5` → **4.00**, and `Distr` `R(4)` → **3.1686×10⁻⁵**.
> 2. Population B: z = `(70−60)÷10` → **1.00**, and `R(1)` → **0.158655**.
> 3. Ratio: `0.158655÷(3.1686×10⁻⁵)` → **5007**, so B is about 5000 times as likely to exceed 70.

## Traps & Exam Notes

- **Using $\sigma$ instead of $\sigma^{2}$ in sums.** Variances add for independent variables; standard deviations do not. This single error changes the answer by tens of percent whenever two components are combined.
- **Reading the table as the right tail.** $\Phi(z)$ is always the area to the *left*. Answering a 'greater than' question with the table value directly inverts the answer.
- **Forgetting to standardise before using the table.** A raw value of 103 cannot be looked up; it must become $z=(103-\mu)/\sigma$ first. Table entries are only for the standard normal.
- **Using $z=1.645$ for a two-sided 95% interval.** Two-sided 95% uses 1.96; 1.645 is the one-sided 5% value. The distinction decides the width of every confidence interval in the next topic.
- **Shading both tails when the question asks for one.** For a two-sided specification, failure probability is the sum of two tails; for a one-sided limit it is one tail. Drawing the picture prevents the error.
- **Mixing up the cut-off direction for percentiles.** A top-10% cut-off uses $z=+1.282$ (left area 0.90), a bottom-5% limit uses $z=-1.645$. Reversing the sign puts the limit on the wrong side of the mean entirely.
- **Applying the normal to small counts or heavily skewed data.** With $np<5$ the binomial's normal approximation is poor — use the exact binomial or the Poisson, and remember the continuity correction when a discrete variable is approximated by a continuous one.

## See Also

- [[10_Central_Limit_Theorem]]
- [[11_Confidence_Intervals]]
- [[12_Hypothesis_Testing,_Z,_t_and_p_Errors]]
- [[07_Uniform_and_Exponential_Distributions]]

---

[[07_Uniform_and_Exponential_Distributions|⬅ 07]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Sampling_Techniques_and_Sampling_Distributions|09 ➡]]
