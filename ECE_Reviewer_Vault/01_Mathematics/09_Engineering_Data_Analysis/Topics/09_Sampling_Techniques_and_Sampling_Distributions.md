---
id: MATH-09-09
title: "Sampling Techniques and Sampling Distributions"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 9
tier: 3
depth: full
problem_count: 0
prereqs: ["[[01_Central_Tendency]]", "[[02_Dispersion,_Variance,_SD,_IQR_and_CV]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Sampling Techniques and Sampling Distributions

> [!abstract] Scope
> Choose a sampling method, distinguish probability from non-probability designs, and describe the sampling distribution of the mean and proportion.

## Core Concept

> [!tip] Intuition
> A sample is only useful if every member of the population had a known, non-zero chance of being chosen. The sampling distribution is what you get by imagining the sample repeated many times and plotting the statistic each time.

**Probability sampling designs.** *Simple random sampling* (SRS) gives every subset of size $n$ the same chance — the reference design. *Systematic sampling* takes every $k$-th item after a random start, with $k=\frac{N}{n}$; it is easy on a production line but dangerous when the list has a periodic pattern that matches $k$. *Stratified sampling* splits the population into homogeneous strata and samples within each, always giving a smaller variance than SRS for the same $n$ when the strata differ. *Cluster sampling* selects whole groups (schools, lots, towns) and surveys all or a sample within them — cheaper, but with larger variance because clusters are internally similar.

**Non-probability designs and their bias.** *Convenience* sampling uses whoever is at hand; *purposive/judgement* sampling picks what the researcher thinks is representative; *quota* sampling fills fixed categories by convenience; *voluntary response* sampling lets people opt in. Each breaks the randomness assumption, so no valid margin of error or confidence interval can be attached. Exam items usually ask you to *name* the design from a scenario — the phrase 'every 10th item on the production line' is systematic, 'divide by shift and sample within each' is stratified.

**The sampling distribution of the mean.** Repeated sampling gives a distribution of $\bar X$ with $E[\bar X]=\mu$ (unbiased) and standard error $\sigma_{\bar X}=\frac{\sigma}{\sqrt{n}}$, called the *standard error of the mean*. If the population is normal, $\bar X$ is exactly normal for any $n$; otherwise the Central Limit Theorem makes it approximately normal for $n\ge30$. The $\sqrt n$ in the denominator is what makes precision improve slowly — quadrupling the sample only halves the error.

**Finite population correction.** When sampling without replacement from a finite population of size $N$, the standard error becomes the corrected form:
$$\sigma_{\bar X}=\frac{\sigma}{\sqrt{n}}\sqrt{\frac{N-n}{N-1}}$$
The correction factor is below 1, so it *reduces* the standard error, and it matters when the sampling fraction $\frac{n}{N}$ exceeds about 5%. Ignoring it when it applies overstates the uncertainty.

**Sampling distribution of a proportion.** For a proportion, $E[\hat p]=p$ and $\sigma_{\hat p}=\sqrt{\frac{p(1-p)}{n}}$, again with a finite-population factor if needed. The normal approximation for $\hat p$ is acceptable when $np\ge5$ and $n(1-p)\ge5$. Here the standard error depends on the unknown $p$; its maximum is at $p=0.5$, which is why sample-size formulas use $p=0.5$ when no prior estimate exists.

**Bias versus variance.** Bias is a systematic offset that does not shrink with more data; variance shrinks as $\frac{1}{\sqrt n}$. A badly designed sample of a million people can be worse than a well-designed sample of a thousand, because no amount of $n$ removes a selection bias. This is the concept most often tested in words rather than numbers.

**Why stratification wins.** If the population separates into strata with different means, the total variance decomposes into between-stratum and within-stratum parts. Stratified sampling removes the between-stratum component from the error, so for a fixed $n$ it is more precise than SRS whenever the stratum means differ. Proportional allocation assigns $n_i=n\frac{N_i}{N}$; Neyman allocation assigns more to strata with larger standard deviations.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Standard error of the mean | $\sigma_{\bar X} = \frac{\sigma}{\sqrt{n}}$ | Infinite population or with replacement. s replaces sigma when sigma is unknown. |
| Finite population correction | $\sigma_{\bar X} = \frac{\sigma}{\sqrt{n}}\sqrt{\frac{N-n}{N-1}}$ | Sampling without replacement. Matters when n/N > 5%. |
| Standard error of a proportion | $\sigma_{\hat p} = \sqrt{\frac{p(1-p)}{n}}$ | Maximum at p = 0.5; use p = 0.5 when no estimate exists. |
| Sample size for a target error (mean) | $n = \left(\frac{z\sigma}{E}\right)^{2}$ | Round UP to the next integer. |
| Sample size for a target error (proportion) | $n = \frac{z^{2}p(1-p)}{E^{2}}$ | Use p = 0.5 for the conservative maximum. |
| Systematic sampling interval | $k = \frac{N}{n}$ | Random start in 1..k, then every k-th item. |
| Proportional (stratified) allocation | $n_i = n\,\frac{N_i}{N}$ | Sample size in stratum i; sums to n. |
| Unbiasedness of the sample mean | $E[\bar X] = \mu$ | The mean is unbiased for any design that gives each unit equal selection probability. |
| Standard error from a sample | $s_{\bar X} = \frac{s}{\sqrt{n}}$ | Used with the t distribution when sigma is unknown. |

## Traps & Exam Notes

- **Dividing by $n$ instead of $\sqrt n$ in the standard error.** The single most common numerical error in the topic. The standard error of a mean is $\frac{\sigma}{\sqrt n}$; quadrupling $n$ halves it.
- **Omitting the finite population correction whenever sampling is without replacement.** It is required when $n/N$ exceeds about 5%. Its absence inflates the standard error and every confidence interval built on it.
- **Using the sample proportion in the standard error when the population proportion is given.** The sampling distribution is centred on $p$, not $\hat p$.
- **Confusing stratified with cluster sampling.** Stratified samples *within* every group (groups are homogeneous internally, different from each other); cluster sampling selects *whole* groups and samples few of them. The first reduces variance, the second usually increases it.
- **Believing a bigger sample fixes a biased design.** Selection bias does not shrink as $\frac{1}{\sqrt n}$; a voluntary online poll of a million respondents is still biased. Only randomisation addresses bias.
- **Forgetting to round the sample size up.** $n$ must be an integer large enough to meet the target; rounding 25.3 down to 25 misses the specification. Always round up.
- **Applying the normal approximation to $\hat p$ when $np$ or $n(1-p)$ is below 5.** The distribution of a proportion is skewed for small counts; the normal-based probability will be noticeably wrong.

## See Also

- [[10_Central_Limit_Theorem]]
- [[11_Confidence_Intervals]]
- [[01_Central_Tendency]]
- [[02_Dispersion,_Variance,_SD,_IQR_and_CV]]

---

[[08_Normal_Distribution_and_Z_Scores|⬅ 08]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Central_Limit_Theorem|10 ➡]]
