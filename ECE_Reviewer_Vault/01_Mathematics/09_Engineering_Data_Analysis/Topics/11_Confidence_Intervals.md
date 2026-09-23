---
id: MATH-09-11
title: "Confidence Intervals"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[10_Central_Limit_Theorem]]", "[[08_Normal_Distribution_and_Z_Scores]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Confidence Intervals

> [!abstract] Scope
> Construct and interpret confidence intervals for a mean (z or t) and a proportion, and determine the sample size needed for a target margin of error.

## Core Concept

> [!tip] Intuition
> A confidence interval is the estimate plus a stated allowance for sampling error. It converts a single number into a range that the method has a known long-run success rate of covering the truth.

**The general form.** Every interval is built as:
$$\mathrm{estimate}\ \pm\ (\mathrm{critical\ value})\times(\mathrm{standard\ error})$$
The estimate is $\bar x$ or $\hat p$; the standard error is $\frac{\sigma}{\sqrt n}$, $\frac{s}{\sqrt n}$ or $\sqrt{\frac{\hat p(1-\hat p)}{n}}$; the critical value comes from the sampling distribution. The half-width is called the *margin of error*.

**What '95% confident' actually means.** If you repeated the sampling procedure many times and built an interval each time, 95% of those intervals would contain the true parameter. It is **not** 'there is a 95% probability that $\mu$ lies in this interval' — once computed, the interval either contains $\mu$ or it does not. This interpretation is a favourite conceptual question and the wording matters.

**z versus t — the decision rule.** Use $z$ when $\sigma$ is *known* (rare in practice, common in textbook problems) or when $n$ is large enough that $s\approx\sigma$; use $t$ when $\sigma$ is unknown and estimated by $s$ from a **small** sample with an approximately normal population. The t distribution is symmetric and bell-shaped but heavier-tailed; as the degrees of freedom $\nu=n-1$ grow, $t\to z$. Using $z$ where $t$ is required makes the interval too narrow and is the standard small-sample error.

**Critical values to memorise.** $z$: 1.645 for 90%, 1.960 for 95%, 2.576 for 99% (two-sided). $t$ with $\nu$ degrees of freedom: for 95%, $t_{0.025,\nu}$ is 2.306 at $\nu=8$, 2.262 at 9, 2.228 at 10, 2.145 at 14, 2.064 at 24, 2.045 at 29, 2.042 at 30. Above 30 the t values sit within about 5% of 1.96.

**Proportion intervals.** The proportion interval is:
$$\hat p\pm z\sqrt{\frac{\hat p(1-\hat p)}{n}}$$
It is valid when $np\ge5$ and $n(1-p)\ge5$. The width is largest when $\hat p=0.5$: this is why the conservative sample-size formula uses $p=0.5$, giving the largest (safest) $n$.

**Sample size for a target margin of error.** Mean:
$$n=\left(\frac{z\sigma}{E}\right)^{2}$$
Proportion:
$$n=\frac{z^{2}p(1-p)}{E^{2}}$$
Both must be rounded **up**. Notice the trade-offs from the formulas directly: quadrupling precision costs four times the sample; going from 90% to 99% confidence increases $z$ from 1.645 to 2.576, so the sample grows by a factor of $(2.576/1.645)^{2}=2.45$.

**What changes the width.** The width shrinks with larger $n$ (as $\frac{1}{\sqrt n}$), with smaller variability, and with lower confidence. It cannot be reduced by wishing; only $n$, the confidence level and the measurement precision are under your control. Reporting an interval also means reporting the confidence level — an interval without one is meaningless.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| CI for a mean, sigma known | $\bar x \pm z_{\alpha/2}\,\frac{\sigma}{\sqrt n}$ | Use z = 1.96 for 95%, 1.645 for 90%, 2.576 for 99% (two-sided). |
| CI for a mean, sigma unknown | $\bar x \pm t_{\alpha/2,\,n-1}\,\frac{s}{\sqrt n}$ | t with n-1 degrees of freedom. Requires an approximately normal population. |
| CI for a proportion | $\hat p \pm z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}}$ | Valid when np-hat >= 5 and n(1-p-hat) >= 5. |
| Margin of error | $E = (\mathrm{critical\ value})\times(\mathrm{standard\ error})$ | The half-width of the interval. |
| Sample size for a mean | $n = \left(\frac{z\sigma}{E}\right)^{2}$ | Round UP. Uses sigma, so a pilot estimate is needed. |
| Sample size for a proportion | $n = \frac{z^{2}p(1-p)}{E^{2}}$ | Use p = 0.5 when no prior estimate exists (maximum n). |
| Critical values (z, two-sided) | $z_{0.10}=1.645, \quad z_{0.05}=1.960, \quad z_{0.01}=2.576$ | Subscript is the total tail area (alpha), split between both tails. |
| t critical values (95%, two-sided) | $t_{0.025,8}=2.306,\ t_{0.025,14}=2.145,\ t_{0.025,24}=2.064,\ t_{0.025,29}=2.045$ | Degrees of freedom nu = n-1. Always larger than 1.96. |
| Width versus confidence | $\mathrm{width} \propto \frac{z_{\alpha/2}}{\sqrt n}$ | Higher confidence needs a wider interval for the same n. |
| Finite population correction | $\sigma_{\bar x} = \frac{\sigma}{\sqrt n}\sqrt{\frac{N-n}{N-1}}$ | Apply when sampling without replacement and n/N > 5%. |

## Worked Problems

### P1. A sample of 36 measurements has $\bar x = 50$ and the population standard deviation is known to be $\sigma = 12$. Construct a 95% confidence interval for $\mu$, and state how the interval changes at 99%.

**Given:** n = 36; xbar = 50; sigma = 12 (known)

**Solution:**

1. Standard error: 12/sqrt(36) = 12/6 = 2.0
2. 95% critical value: z = 1.960
3. Margin of error: 1.960 x 2.0 = 3.92
4. Interval: 50 +/- 3.92 = (46.08, 53.92)
5. At 99%: z = 2.576, margin = 2.576 x 2.0 = 5.152, interval = (44.85, 55.15)
6. The 99% interval is 31% wider because higher confidence demands a larger allowance

> [!success]- Answer
> **$95\%$: $(46.08,\ 53.92)$. At $99\%$: $(44.85,\ 55.15)$.**

> [!warning] Trap
> Using $z=1.645$ for a 95% interval. The 1.645 value is for 90% two-sided (or 95% one-sided); the two-sided 95% value is 1.96. The resulting interval is about 16% too narrow.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. SE = `12÷√36` → **2.0**; 95% margin = `1.96×2` → **3.92**.
> 2. 95% interval: `50−3.92` → **46.08** to `50+3.92` → **53.92**.
> 3. 99%: `50−2.576×2` → **44.848** to `50+2.576×2` → **55.152**, roughly 31% wider.
>
> The 95% multiplier is 1.96; 1.645 is the 90% two-sided value and makes the interval about 16% too narrow.

### P2. Nine tensile-strength measurements give $\bar x = 25\ \mathrm{MPa}$ and $s = 3\ \mathrm{MPa}$. Construct a 95% confidence interval. Why is $t$ used rather than $z$?

**Given:** n = 9; xbar = 25; s = 3; population assumed approximately normal

**Solution:**

1. Degrees of freedom: nu = n - 1 = 8
2. Critical value: t(0.025, 8) = 2.306
3. Standard error: 3/sqrt(9) = 1.0
4. Margin of error: 2.306 x 1.0 = 2.306
5. Interval: 25 +/- 2.306 = (22.694, 27.306)
6. t is used because sigma is unknown and estimated by s from a small sample; using z = 1.960 would give (23.04, 26.96), which is too narrow

> [!success]- Answer
> **$95\%$ CI $= (22.69,\ 27.31)$ using $t_{0.025,8}=2.306$.**

> [!warning] Trap
> Using $z=1.96$ because the sample mean is 'normal enough'. With $n=9$ and unknown $\sigma$, the extra uncertainty in $s$ must be absorbed by the heavier t tail — the interval is 18% wider than the z version.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. ν = n − 1 = **8**, so the multiplier is the memorised t(0.025, 8) = **2.306**.
> 2. SE = `3÷√9` → **1.0**, so the margin is `2.306×1.0` → **2.306**.
> 3. Interval: `25−2.306` → **22.694** to `25+2.306` → **27.306**; the z = 1.96 version (23.04, 26.96) is 18% too narrow.

### P3. In a sample of 400 items, 120 are defective. Construct a 95% confidence interval for the true proportion.

**Given:** x = 120; n = 400; p-hat = 0.30

**Solution:**

1. Point estimate: phat = 120/400 = 0.30
2. Standard error: sqrt[(0.30)(0.70)/400] = sqrt(0.000525) = 0.022913
3. Margin of error: 1.960(0.022913) = 0.044909
4. Interval: 0.30 +/- 0.0449 = (0.2551, 0.3449)
5. As a percentage: 25.5% to 34.5% defective
6. Conditions check: n phat = 120 >= 5 and n(1-phat) = 280 >= 5, so the normal approximation is valid

> [!success]- Answer
> **$95\%$ CI $= (0.2551,\ 0.3449)$, i.e. $25.5\%$ to $34.5\%$.**

> [!warning] Trap
> Using $p=0.5$ in the standard error because 'we do not know $p$'. For a confidence interval the estimate $\hat p=0.30$ is used; $p=0.5$ belongs only in the *planning* formula when no data exist yet. The interval computed with 0.5 is about 59% too wide.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Point estimate `120÷400` → **0.30**; SE = `√(0.30×0.70÷400)` → **0.022913**.
> 2. Margin = `1.96×0.022913` → **0.044909**.
> 3. Interval: `0.30−0.044909` → **0.2551** to `0.30+0.044909` → **0.3449**, that is 25.5% to 34.5%.
>
> The interval uses the data-based p-hat = 0.30; p = 0.5 belongs only in sample-size planning.

### P4. A manufacturer wants to estimate the mean fill volume to within $3\ \mathrm{mL}$ at 95% confidence. From past data $\sigma = 15\ \mathrm{mL}$. What sample size is needed, and what if the tolerance were tightened to $1\ \mathrm{mL}$?

**Given:** E = 3 mL; sigma = 15 mL; z = 1.960

**Solution:**

1. n = (z sigma / E)^2 = (1.960 x 15/3)^2 = (9.80)^2
2. = 96.04, rounded up to 97
3. For E = 1 mL: n = (1.960 x 15/1)^2 = (29.40)^2 = 864.36, rounded up to 865
4. Tightening the tolerance by a factor of 3 multiplies the sample by 9 — the square law again
5. Always round up: n = 96 would give a margin slightly above 3 mL

> [!success]- Answer
> **$n = 97$ for $E=3\ \mathrm{mL}$; $n = 865$ for $E=1\ \mathrm{mL}$.**

> [!warning] Trap
> Rounding 96.04 down to 96, or forgetting the square and answering $n=10$. The formula has both a square and a division by $E$; a common wrong answer is $(z\sigma)/E$ without squaring — here 9.8 instead of 97.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(1.96×15÷3)²` → **96.04**, which must be rounded **up** to **97**.
> 2. For E = 1 mL: `(1.96×15÷1)²` → **864.36**, so n = **865**.
> 3. Tightening the tolerance threefold costs nine times the sample — the square in the formula does that.
>
> Rounding 96.04 down to 96 misses the stated margin; the formula produces a guarantee, not an estimate.

### P5. A sample of 15 measurements from a normal population gives $\bar x = 12$ and $s = 2$. Construct a 90% confidence interval. Does the interval contain 13?

**Given:** n = 15; xbar = 12; s = 2

**Solution:**

1. Degrees of freedom: nu = 14
2. Critical value: t(0.05, 14) = 1.761 (10% total tail area, 5% in each tail)
3. Standard error: 2/sqrt(15) = 0.516398
4. Margin of error: 1.761(0.516398) = 0.909
5. Interval: 12 +/- 0.909 = (11.09, 12.91)
6. 13 lies above the upper limit 12.91, so 13 is outside the 90% confidence interval

> [!success]- Answer
> **$90\%$ CI $= (11.09,\ 12.91)$; it does **not** contain 13 (though only just — the upper limit is 12.91).**

> [!warning] Trap
> Looking up $t$ with $\nu=n=15$ instead of $\nu=n-1=14$, which gives 1.753 rather than 1.761 — a small numerical error. The bigger trap is using $z=1.645$ for a 90% interval when $\sigma$ is unknown and $n$ is small; that gives $(11.15, 12.85)$ and is not justified here.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. ν = **14**, so t(0.05, 14) = **1.761** with 5% in each tail.
> 2. SE = `2÷√15` → **0.516398**; margin = `1.761×0.516398` → **0.9094**.
> 3. Interval: `12−0.9094` → **11.09** to `12+0.9094` → **12.91**; 13 lies above 12.91, so it is outside.

## Traps & Exam Notes

- **Using $z$ when $t$ is required.** With unknown $\sigma$ and a small sample, the t distribution is mandatory. The z-based interval is too narrow, which is the direction that produces false confidence.
- **The wrong critical value for the confidence level.** 95% two-sided is 1.960, not 1.645 (90%) and not 2.576 (99%). A mismatch changes the interval width by up to 57%.
- **Degrees of freedom off by one.** For a single sample, $\nu=n-1$. Using $n$ gives a slightly too-small $t$ and a slightly too-narrow interval.
- **Misinterpreting '95% confident'.** It is a statement about the long-run coverage of the *procedure*, not a probability that this particular interval contains $\mu$. Once computed, the interval is fixed.
- **Using $p=0.5$ in a confidence interval.** That belongs in sample-size planning only. Data-based intervals use $\hat p$ in the standard error.
- **Rounding the sample size down.** $n$ must satisfy the tolerance; 96.04 means 97. Rounding down silently violates the specification the question asked you to meet.
- **Ignoring the finite population correction.** Sampling without replacement from a finite population with $n/N>5\%$ requires $\sqrt{\frac{N-n}{N-1}}$; omitting it makes the interval wider than it needs to be — conservative, but wrong.
- **Building an interval for a proportion when the normal approximation fails.** With $n\hat p<5$ the symmetric interval can extend below 0 or above 1. Use exact (binomial) methods instead, or at least recognise that the quoted interval is unreliable.

## See Also

- [[10_Central_Limit_Theorem]]
- [[12_Hypothesis_Testing,_Z,_t_and_p_Errors]]
- [[09_Sampling_Techniques_and_Sampling_Distributions]]
- [[08_Normal_Distribution_and_Z_Scores]]

---

[[10_Central_Limit_Theorem|⬅ 10]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Hypothesis_Testing,_Z,_t_and_p_Errors|12 ➡]]
