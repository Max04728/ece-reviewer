---
id: MATH-09-12
title: "Hypothesis Testing, Z, t and p Errors"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[11_Confidence_Intervals]]", "[[10_Central_Limit_Theorem]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Hypothesis Testing, Z, t and p Errors

> [!abstract] Scope
> Set up a hypothesis test, choose between z and t, compute the test statistic and p-value, and interpret Type I and Type II errors.

## Core Concept

> [!tip] Intuition
> A hypothesis test asks how surprising the data would be if the null hypothesis were true. If the sample mean is many standard errors away from the claimed value, the null becomes implausible and we reject it.

**The hypotheses come in pairs.** $H_0$ is the status quo, always stated with an equality ($\mu=\mu_0$). $H_a$ carries the research claim and is either two-sided ($\mu\neq\mu_0$) or one-sided ($\mu>\mu_0$ or $\mu<\mu_0$). The direction of $H_a$ is what makes the test one-tailed or two-tailed, and it must be fixed *before* looking at the data. All the evidence against $H_0$ is measured by the test statistic.

**The test statistic.** Every test has the same skeleton:
$$\mathrm{statistic}=\frac{\mathrm{estimate}-\mathrm{hypothesised\ value}}{\mathrm{standard\ error}}$$
For a mean with known $\sigma$, $z=\frac{\bar x-\mu_0}{\sigma/\sqrt n}$; with unknown $\sigma$, $t=\frac{\bar x-\mu_0}{s/\sqrt n}$ on $n-1$ degrees of freedom. For a proportion the statistic is:
$$z=\frac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}$$
The standard error uses the **hypothesised** $p_0$.

**The p-value and the decision rule.** The p-value is the probability, *assuming $H_0$ is true*, of observing a test statistic at least as extreme as the one computed. Reject $H_0$ when $p\le\alpha$. The two-tailed p-value doubles the one-tailed area, which is why the same $z=1.96$ gives $p=0.05$ two-sided but $p=0.025$ one-sided. Report the p-value with the decision; a bare 'reject' or 'fail to reject' without the number is incomplete.

**Type I and Type II errors.** A Type I error rejects a true $H_0$; its probability is $\alpha$, the significance level, chosen in advance (typically 0.05). A Type II error fails to reject a false $H_0$; its probability is $\beta$, and $1-\beta$ is the *power* — the chance of detecting a real effect. Reducing $\alpha$ (stricter evidence) increases $\beta$ for a fixed $n$; the only way to reduce both is to increase the sample size or reduce variability. Power also rises with a larger effect size.

**One-tailed versus two-tailed.** A two-tailed test splits $\alpha$ across both tails; a one-tailed test puts all of $\alpha$ in one tail and is therefore more powerful *in that direction* but blind to effects in the opposite direction. Halving the p-value by switching to a one-tailed test *after* seeing the data is a serious error — the tail must be justified by the research question, in advance.

**The link to confidence intervals.** A two-sided test at level $\alpha$ rejects $H_0:\mu=\mu_0$ exactly when $\mu_0$ falls outside the $100(1-\alpha)\%$ confidence interval. This gives a fast cross-check: if the 95% CI for the mean contains the hypothesised value, the two-sided test at $\alpha=0.05$ cannot reject. The interval also conveys the effect size, which a p-value does not.

**Statistical versus practical significance.** A tiny effect can be statistically significant with a large enough sample; a large effect can fail to reach significance with a small one. Always report the estimate and its interval alongside the p-value, and let the engineering context decide whether the difference matters.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| z-test for a mean (sigma known) | $z = \frac{\bar x-\mu_0}{\sigma/\sqrt n}$ | Normal population or large n. Two-sided critical values +/-1.96 at 5%. |
| t-test for a mean (sigma unknown) | $t = \frac{\bar x-\mu_0}{s/\sqrt n}, \quad \nu=n-1$ | Small sample from an approximately normal population. |
| z-test for a proportion | $z = \frac{\hat p-p_0}{\sqrt{p_0(1-p_0)/n}}$ | Use the HYPOTHESISED p0 in the standard error, not p-hat. |
| Rejection rule | $\mathrm{reject\ } H_0 \mathrm{\ if\ } p\le\alpha \ \mathrm{\ or\ } \lvert z_{\mathrm{calc}} \rvert>z_{\mathrm{crit}}$ | The p-value and critical-value routes always agree. |
| Two-tailed p-value from z | $p = 2\left[1-\Phi(\lvert z \rvert)\right]$ | One-tailed: p = 1 - Phi(\|z\|) in the direction of Ha. |
| Type I error | $\alpha = P(\mathrm{reject\ } H_0 \mid H_0 \mathrm{\ true})$ | The significance level; set in advance. |
| Type II error and power | $\beta = P(\mathrm{fail\ to\ reject\ } H_0 \mid H_a \mathrm{\ true}); \quad \mathrm{power}=1-\beta$ | Power rises with n, effect size, and alpha. |
| Sample size for a z-test | $n = \frac{(z_{\alpha/2}+z_\beta)^{2}\sigma^{2}}{(\mu_0-\mu_a)^{2}}$ | Two-sided. Round up; z_beta = 1.282 for 90% power. |
| CI-test correspondence | $\mathrm{reject\ } H_0 \iff \mu_0 \notin 100(1-\alpha)\%\ \mathrm{CI}$ | Two-sided test only. A fast cross-check. |
| One-sample t critical values (5%, two-tailed) | $t_{0.025,8}=2.306,\ t_{0.025,14}=2.145,\ t_{0.025,24}=2.064,\ t_{0.025,29}=2.045$ | Always larger than the z value 1.96. |

## Worked Problems

### P1. A manufacturer claims resistors average $100\ \Omega$. A sample of 36 gives $\bar x = 102\ \Omega$; $\sigma = 15\ \Omega$ is known. Test at $\alpha=0.05$ with a two-sided alternative.

**Given:** mu0 = 100; xbar = 102; sigma = 15; n = 36; alpha = 0.05

**Solution:**

1. Hypotheses: H0: mu = 100; Ha: mu != 100
2. Standard error: 15/sqrt(36) = 2.5
3. z = (102 - 100)/2.5 = 0.800
4. Two-tailed p-value = 2[1 - Phi(0.800)] = 2(1 - 0.788145) = 2(0.211855) = 0.423710
5. Critical value for alpha = 0.05 two-sided is 1.960; |0.800| < 1.960, so fail to reject
6. Conclusion: the data are consistent with a mean of 100 ohm at the 5% level

> [!success]- Answer
> **$z = 0.80$, $p = 0.424$; fail to reject $H_0$.**

> [!warning] Trap
> Dividing by $\sigma$ instead of the standard error, giving $z=0.133$ and a p-value of 0.89. The test statistic always contains the standard error $\frac{\sigma}{\sqrt n}$.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. SE = `15÷√36` → **2.5**; z = `(102−100)÷2.5` → **0.800**.
> 2. Two-tailed p from `Distr`: `2×R(0.8)` → **0.4237** (each tail is `R(0.8)` = **0.2119**).
> 3. The critical value 1.960 exceeds 0.800, so fail to reject H0 — the data are consistent with 100 Ω.

### P2. Nine measurements of a dimension give $\bar x = 9.2$ with $s = 2.5$; the specification mean is 10. Test at $\alpha=0.05$, two-sided.

**Given:** mu0 = 10; xbar = 9.2; s = 2.5; n = 9; alpha = 0.05

**Solution:**

1. Hypotheses: H0: mu = 10; Ha: mu != 10
2. Standard error: 2.5/sqrt(9) = 0.833333
3. t = (9.2 - 10)/0.833333 = -0.800/0.833333 = -0.960
4. Degrees of freedom: nu = 8; t(0.025, 8) = 2.306
5. |t| = 0.960 < 2.306, so fail to reject H0
6. 95% CI cross-check: 9.2 +/- 2.306(0.833333) = 9.2 +/- 1.922 = (7.28, 11.12), which contains 10 — the same conclusion

> [!success]- Answer
> **$t = -0.96$, $\nu=8$; fail to reject $H_0$ (the 95% CI $(7.28, 11.12)$ contains 10).**

> [!warning] Trap
> Using $z=1.96$ instead of $t=2.306$ as the critical value with $n=9$ and unknown $\sigma$. Even so the conclusion is unchanged here, but on a borderline result the wrong critical value flips the decision.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. SE = `2.5÷√9` → **0.833333**; t = `(9.2−10)÷0.833333` → **−0.960**.
> 2. ν = **8**, so the memorised critical value is t(0.025, 8) = **2.306**; 0.960 is well inside it, so fail to reject.
> 3. CI cross-check: `2.306×0.833333` → **1.9217**, so `9.2−1.9217` = **7.278** to `9.2+1.9217` = **11.122**, which contains 10.
>
> The t critical values come from the printed table — the machine's `Distr` menu covers the normal only.

### P3. In a sample of 400 parts, 212 are defective; the process standard is $p_0=0.50$. Test at $\alpha=0.05$ whether the true defect rate differs from 0.50.

**Given:** x = 212; n = 400; p0 = 0.50; p-hat = 0.53

**Solution:**

1. Hypotheses: H0: p = 0.50; Ha: p != 0.50
2. Standard error uses p0: sqrt[0.50(0.50)/400] = sqrt(0.000625) = 0.025
3. z = (0.53 - 0.50)/0.025 = 0.03/0.025 = 1.200
4. Two-tailed p-value = 2[1 - Phi(1.200)] = 2(0.115070) = 0.230140
5. Critical value 1.960; |1.200| < 1.960, so fail to reject H0
6. 95% CI for p (using p-hat): 0.53 +/- 1.960(0.024956) = (0.4811, 0.5789), which contains 0.50

> [!success]- Answer
> **$z = 1.20$, $p = 0.230$; fail to reject $H_0$.**

> [!warning] Trap
> Using $\hat p=0.53$ in the standard error of a *test*. The test assumes $H_0$ is true, so the standard error uses $p_0=0.50$; substituting 0.53 gives 0.024956 and a slightly different z. (Confidence intervals, by contrast, do use $\hat p$.)

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. The test SE uses the hypothesised value: `√(0.5×0.5÷400)` → **0.025**.
> 2. z = `(0.53−0.50)÷0.025` → **1.200**; two-tailed p = `2×R(1.2)` → **0.2301**.
> 3. Fail to reject; the interval route instead uses p-hat = 0.53, so `1.96×√(0.53×0.47÷400)` → **0.024956**.
>
> Tests standardise with p0 = 0.50; confidence intervals use p-hat — mixing them is the usual error.

### P4. A supplier claims a mean strength of $3.0\ \mathrm{MPa}$. In 25 tests the mean is $3.4\ \mathrm{MPa}$ with $s=1.2\ \mathrm{MPa}$. Test at $\alpha=0.05$ with a one-sided alternative that the mean is greater, and comment on the margin of the decision.

**Given:** mu0 = 3.0; xbar = 3.4; s = 1.2; n = 25; alpha = 0.05 one-tailed

**Solution:**

1. Hypotheses: H0: mu = 3.0; Ha: mu > 3.0
2. Standard error: 1.2/sqrt(25) = 1.2/5 = 0.24
3. t = (3.4 - 3.0)/0.24 = 0.4/0.24 = 1.667
4. Degrees of freedom 24; one-tailed critical value t(0.05, 24) = 1.711
5. Since 1.667 < 1.711, fail to reject H0 at alpha = 0.05
6. The one-tailed p-value is between 0.05 and 0.10 (about 0.054), so the result is marginal: at alpha = 0.10 we would reject

> [!success]- Answer
> **$t = 1.667$, $\nu = 24$, one-tailed $p\approx0.054$; fail to reject at $\alpha=0.05$ but close to the boundary.**

> [!warning] Trap
> Comparing $t=1.667$ with the two-tailed critical value 2.064. The alternative $\mu>3.0$ is one-sided, so the critical value is 1.711 — the whole 5% sits in the upper tail, and using the two-tailed value makes a correctly specified test look insignificant.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. SE = `1.2÷√25` → **0.24**; t = `(3.4−3.0)÷0.24` → **1.6667**.
> 2. One-tailed critical value t(0.05, 24) = **1.711**; since 1.6667 < 1.711, fail to reject at α = 0.05.
> 3. The p-value ≈ **0.054** must come from a t-table, so the critical-value comparison is the calculator route here.
>
> Compare with the one-tailed 1.711, not the two-tailed 2.064 — all 5% sits in the upper tail.

### P5. In the previous problem the engineer plans to repeat the study. Using $\sigma\approx1.2$, find the sample size needed to detect a true mean of 3.4 with 90% power at $\alpha=0.05$ (two-sided).

**Given:** sigma = 1.2; effect = 0.4; alpha = 0.05 two-sided, power 0.90

**Solution:**

1. Critical values: z(alpha/2) = 1.960 and z(beta) = z(0.10) = 1.282
2. n = (z_alpha/2 + z_beta)^2 sigma^2 / (mu0 - mu_a)^2
3. = (1.960 + 1.282)^2 (1.2)^2 / (0.4)^2
4. = (3.242)^2 (1.44)/0.16 = 10.5106 x 9.0
5. = 94.60, rounded up to 95
6. Cross-check: the effect size is 0.4/1.2 = 0.333 standard deviations; the standard rule for 80% power is about 9 per group per standard-deviation unit, and 90% power needs more

> [!success]- Answer
> **$n = 95$ measurements.**

> [!warning] Trap
> Using only $z_{\alpha/2}$ (1.96) and omitting the power term $z_\beta$, which gives $n=34.6\to35$ — far too small to have a 90% chance of detecting the effect. Both critical values belong in the formula.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Both multipliers are needed: z(α/2) = **1.960** for 5% two-sided and z(β) = **1.282** for 90% power.
> 2. `(1.96+1.282)²×1.2²÷0.4²` → **94.60**, so **95** measurements.
> 3. Dropping the power term gives `(1.96²×1.44)÷0.16` → **34.6** → 35, far short of 90% power.

## Traps & Exam Notes

- **Using $\hat p$ in the standard error of a proportion test.** Tests assume $H_0$, so the standard error uses $p_0$. Confidence intervals use $\hat p$. Mixing the two conventions is the most common numerical error in proportion testing.
- **Choosing the tail after seeing the data.** Deciding on a one-tailed test because the sample mean came out high doubles the effective $\alpha$ and invalidates the p-value. The alternative is fixed before the analysis.
- **Using $z$ where $t$ applies.** Unknown $\sigma$ with a small sample requires $t$ with $n-1$ degrees of freedom. The z-based critical value is too small and inflates the rejection rate.
- **Interpreting the p-value as $P(H_0\mathrm{\ is\ true})$.** The p-value is $P(\mathrm{data\ this\ extreme}\mid H_0)$, not the posterior probability of the null. A small p-value is evidence against $H_0$, not a probability that $H_0$ is false.
- **Saying 'accept $H_0$' after failing to reject.** Absence of evidence is not evidence of absence; the correct phrasing is 'fail to reject $H_0$', ideally with the confidence interval showing which effects remain plausible.
- **Confusing significance with importance.** With a large enough sample even a trivial difference is statistically significant. Report the estimated effect and its interval.
- **Ignoring the Type II error rate.** A study with 20% power will miss four out of five real effects. Quoting a non-significant p-value without a power or sample-size calculation hides the possibility that the study simply could not detect the difference.

## See Also

- [[11_Confidence_Intervals]]
- [[10_Central_Limit_Theorem]]
- [[14_ANOVA_and_DOE]]
- [[08_Normal_Distribution_and_Z_Scores]]

---

[[11_Confidence_Intervals|⬅ 11]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Linear_Regression_and_Pearson_r|13 ➡]]
