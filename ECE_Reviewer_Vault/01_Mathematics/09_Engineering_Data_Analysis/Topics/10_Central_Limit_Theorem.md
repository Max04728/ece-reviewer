---
id: MATH-09-10
title: "Central Limit Theorem"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[08_Normal_Distribution_and_Z_Scores]]", "[[09_Sampling_Techniques_and_Sampling_Distributions]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Central Limit Theorem

> [!abstract] Scope
> Use the Central Limit Theorem to treat a sample mean or proportion as normal, and quantify how the standard error shrinks with sample size.

## Core Concept

> [!tip] Intuition
> No matter how oddly the population is shaped, the *average* of a large sample is nearly normal. Averaging washes out the shape: the extremes on both sides cancel, and the distribution of the mean collapses toward a bell centred on the population mean.

**Statement of the theorem.** If $X_1,\dots,X_n$ are independent observations from any population with mean $\mu$ and finite variance $\sigma^{2}$, then as $n$ grows the distribution of $\bar X$ approaches the normal:
$$N\!\left(\mu,\frac{\sigma^{2}}{n}\right)$$
The standardised version is:
$$\frac{\bar X-\mu}{\sigma/\sqrt n}\to N(0,1)$$
The result needs a *finite* variance and independent observations; it does not need the population to be normal.

**The two things the theorem gives you.** First, the *centre*: $E[\bar X]=\mu$, so the sample mean is an unbiased estimator of the population mean for any $n$. Second, the *spread*:
$$\sigma_{\bar X}=\frac{\sigma}{\sqrt n}$$
the standard error. Everything else (the normal shape) is what lets you use the z-table. Note carefully: the CLT describes the distribution of $\bar X$, **not** of the individual observations $X$.

**Sample size conventions.** The usual rule of thumb is $n\ge30$ for a moderately shaped population, while a strongly skewed population needs more ($n\ge50$ or more). If the population is already normal, the sampling distribution of $\bar X$ is exactly normal for *every* $n$, including $n=2$ — the CLT is then not even needed.

**Standard error and precision.** Because the standard error falls as $\frac{1}{\sqrt n}$, precision improves slowly: to halve the standard error you must quadruple the sample; to reduce it tenfold you need one hundred times the data. This square-root law is the reason large surveys are expensive and the reason an answer of 'increase $n$ by 10%' is essentially useless.

**CLT for proportions.** A count $X$ is binomial, and $\hat p=\frac{X}{n}$ satisfies $E[\hat p]=p$ and $\sigma_{\hat p}=\sqrt{\frac{p(1-p)}{n}}$. By the CLT the standardised $\frac{\hat p-p}{\sqrt{p(1-p)/n}}$ is approximately standard normal when $np\ge5$ and $n(1-p)\ge5$. Because $p$ is unknown in practice, the standard error is estimated with $\hat p$ for confidence intervals and with $p_0$ (the hypothesised value) for hypothesis tests.

**What the CLT does not do.** It does not make a biased estimator unbiased, it does not fix dependence between observations (cluster samples, time series), and it says nothing when the variance is infinite (heavy-tailed distributions). It also does not let you treat an individual observation as normal: the spread of $X$ is $\sigma$, not $\frac{\sigma}{\sqrt n}$, and mixing those two up is the classic exam error.

**A useful identity for total counts.** Since $\bar X=\frac{1}{n}\sum X_i$, the *sum* $S=\sum X_i$ is approximately normal with mean $n\mu$ and variance $n\sigma^{2}$. Problems about 'the total weight of a box of 40 items' are CLT problems about $S$, not about $\bar X$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| CLT statement | $\bar X \;\dot\sim\; N\!\left(\mu,\ \frac{\sigma^{2}}{n}\right) \mathrm{\ for\ large\ } n$ | Any population with finite variance. Exact for all n if the population is normal. |
| Standardised sample mean | $z = \frac{\bar X-\mu}{\sigma/\sqrt n}$ | Use s in place of sigma when sigma is unknown (then t, not z). |
| Standard error of the mean | $\sigma_{\bar X} = \frac{\sigma}{\sqrt n}$ | Falls as 1/sqrt(n): quadruple n to halve it. |
| Sum of n observations | $S \;\dot\sim\; N(n\mu,\ n\sigma^{2})$ | Use for total-weight and total-demand questions. |
| Sample proportion | $\hat p \;\dot\sim\; N\!\left(p,\ \frac{p(1-p)}{n}\right)$ | Valid when np >= 5 and n(1-p) >= 5. |
| Standardised proportion | $z = \frac{\hat p-p}{\sqrt{p(1-p)/n}}$ | Use p0 (hypothesised) in tests, p-hat in confidence intervals. |
| Sample size for a target standard error | $n = \left(\frac{\sigma}{\sigma_{\bar X}}\right)^{2}$ | Round up. From sigma_xbar = sigma/sqrt(n). |
| Rule of thumb | $n\ge30$ | For moderately skewed populations; more for strongly skewed ones. |
| Finite population correction | $\sigma_{\bar X} = \frac{\sigma}{\sqrt n}\sqrt{\frac{N-n}{N-1}}$ | Apply when sampling without replacement with n/N > 5%. (Finite population CLT.) |

## Interactive Widget

**CLT Sampling Simulator**

![[CLT_Sampling_Simulator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A voltage is uniformly distributed on $[0,10]\ \mathrm{V}$. A sample of 40 readings is averaged. Find the mean and standard error of $\bar X$ and $P(\bar X>5.5)$.

**Given:** uniform on [0,10]; mu = 5, sigma = 10/sqrt(12) = 2.8868; n = 40

**Solution:**

1. Uniform mean: (0+10)/2 = 5 V
2. Uniform standard deviation: sqrt[(10-0)^2/12] = 10/sqrt(12) = 2.886751 V
3. Standard error: sigma_xbar = 2.886751/sqrt(40) = 2.886751/6.324555 = 0.456435 V
4. z = (5.5 - 5)/0.456435 = 1.0954
5. P(xbar > 5.5) = 1 - Phi(1.0954) = 1 - 0.863339 = 0.136661
6. The population is flat, not normal, but n = 40 is enough for the CLT approximation to be reasonable
7. Contrast with a single reading: P(X > 5.5) = (10-5.5)/10 = 0.45 — averaging 40 readings cuts the tail probability from 45% to 13.7%

> [!success]- Answer
> **$\mu_{\bar X}=5\ \mathrm{V}$, $\sigma_{\bar X}=0.456\ \mathrm{V}$, $P(\bar X>5.5)=0.1367$.**

> [!warning] Trap
> Using the population standard deviation 2.8868 in the z-score instead of the standard error 0.4564. That gives $z=0.173$ and a probability of 0.431 — the probability for a *single* observation, which is a different question.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. Uniform spread first: `√((10−0)²÷12)` → **2.886751** V, so the population mean is `(0+10)÷2` = **5** V.
> 2. Standard error: `Ans÷√40` → **0.456435** V.
> 3. z = `(5.5−5)÷0.456435` → **1.0954**, then `Distr` `R(1.0954)` → **0.136661**.
>
> Divide by the standard error 0.4564, not by σ = 2.8868 — the latter answers for one reading (0.431).

### P2. A process produces shafts with $\mu=80\ \mathrm{mm}$ and $\sigma=15\ \mathrm{mm}$. A sample of 100 is taken. Find $P(\bar X>82.5)$ and the sample size needed for a standard error of $3\ \mathrm{mm}$.

**Given:** mu = 80; sigma = 15; n = 100

**Solution:**

1. Standard error: 15/sqrt(100) = 1.5 mm
2. z = (82.5 - 80)/1.5 = 2.5/1.5 = 1.6667
3. P(xbar > 82.5) = 1 - Phi(1.6667) = 1 - 0.952213 = 0.047787
4. For a standard error of 3: 15/sqrt(n) = 3 -> sqrt(n) = 5 -> n = 25
5. Note that the larger sample (100) has the smaller standard error (1.5), and a sample of 25 would give 3.0
6. The CLT applies because n = 100 exceeds 30, even without knowing the population's shape

> [!success]- Answer
> **$P(\bar X>82.5)=0.0478$; $n=25$ for a standard error of $3\ \mathrm{mm}$.**

> [!warning] Trap
> Rounding $z=1.6667$ to $1.67$ and then using the wrong table entry, or (more seriously) replacing $\sigma/\sqrt n$ with $\sigma$ and computing $z=0.167$, a probability of 0.43. The standard error is always the denominator.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. SE = `15÷√100` → **1.5** mm; z = `(82.5−80)÷1.5` → **1.6667**, then `Distr` `R(1.6667)` → **0.0478**.
> 2. Sample size for SE = 3 mm: `(15÷3)²` → **25**.
> 3. Check: with n = 25, `15÷√25` → **3.0** mm exactly as specified.

### P3. A population has $\sigma=20$. Compare the sampling distribution of $\bar X$ for $n=16$ and $n=64$ by computing $P(|\bar X-500|<10)$ for each.

**Given:** mu = 500; sigma = 20; n = 16 and n = 64

**Solution:**

1. n = 16: standard error = 20/4 = 5; z = 10/5 = 2.00
2. P(-2.00 < z < 2.00) = Phi(2.00) - Phi(-2.00) = 0.977250 - 0.022750 = 0.954500
3. n = 64: standard error = 20/8 = 2.5; z = 10/2.5 = 4.00
4. P(-4.00 < z < 4.00) = 0.999937 (essentially 1)
5. Quadrupling n halved the standard error from 5 to 2.5 and moved the same absolute tolerance from 2 to 4 standard errors
6. The probability of being within 10 units of the mean rose from 95.5% to 99.99%

> [!success]- Answer
> **$n=16$: $0.9545$; $n=64$: $0.9999$.**

> [!warning] Trap
> Assuming that quadrupling $n$ multiplies the probability by four, or that the standard error falls in proportion to $n$. The standard error falls as $\sqrt n$, so quadrupling $n$ only halves it — and the probability gain is a table-lookup consequence, not a linear one.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. n = 16: SE = `20÷√16` → **5.0**, z = `10÷5` → **2.00**, probability `R(−2)−R(2)` → **0.954500**.
> 2. n = 64: SE = `20÷√64` → **2.5**, z = `10÷2.5` → **4.00**, probability `R(−4)−R(4)` → **0.999937**.
> 3. Quadrupling n halved the SE from 5.0 to 2.5 and moved the same ±10 window from 2σ to 4σ.

### P4. A process is known to be $5\%$ defective. A sample of 200 items is inspected. Find the standard error of $\hat p$ and $P(0.04<\hat p<0.06)$.

**Given:** p = 0.05; n = 200; np = 10 and n(1-p) = 190

**Solution:**

1. Standard error: sqrt[p(1-p)/n] = sqrt[(0.05)(0.95)/200] = sqrt(0.0002375) = 0.015411
2. z_lower = (0.04 - 0.05)/0.015411 = -0.6489
3. z_upper = (0.06 - 0.05)/0.015411 = +0.6489
4. P = Phi(0.6489) - Phi(-0.6489) = 2(0.741813) - 1
5. = 0.483626
6. So roughly 48% of samples of 200 will show a defect rate between 4% and 6% — the sampling variability around a 5% rate is large at this sample size

> [!success]- Answer
> **$\sigma_{\hat p} = 0.0154$; $P(0.04<\hat p<0.06) = 0.4836$.**

> [!warning] Trap
> Using $\hat p$ (the observed value) in the standard error when testing or describing the distribution of $\hat p$ around a known $p$. The sampling distribution is centred on $p=0.05$; substituting an observed value changes both the centre and the spread.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. SE from the *known* p = 0.05: `√(0.05×0.95÷200)` → **0.015411**.
> 2. Either side of the mean: `0.01÷0.015411` → **0.6489**.
> 3. `Distr` `R(−0.6489)−R(0.6489)` → **0.4836**, so about 48% of samples of 200 land between 4% and 6%.
>
> The sampling distribution is centred on p = 0.05, so an observed p-hat must not be substituted into the SE.

### P5. Boxes of components have a mean weight of $500\ \mathrm{g}$ and a standard deviation of $20\ \mathrm{g}$. Find the probability that a box of 64 components weighs more than $32{,}320\ \mathrm{g}$.

**Given:** mu = 500, sigma = 20 per component; n = 64; threshold 32320 g = 505 g per component

**Solution:**

1. The threshold is a *total*, so convert to a mean: 32320/64 = 505 g
2. Standard error of the mean: 20/sqrt(64) = 2.5 g
3. z = (505 - 500)/2.5 = 2.000
4. P(total > 32320) = P(xbar > 505) = 1 - Phi(2.000) = 1 - 0.977250 = 0.022750
5. Equivalently via the total: S ~ N(64(500), 64(400)) = N(32000, 25600), sd = 160 g, z = (32320-32000)/160 = 2.000
6. Both routes agree, as they must

> [!success]- Answer
> **$P(\mathrm{total}>32{,}320\ \mathrm{g}) = 0.0228$.**

> [!warning] Trap
> Comparing the total 32320 directly with the per-item mean of 500, or using $\sigma=20$ for the total instead of the total's standard deviation 160 g. Convert the total to a mean (or vice versa) *before* standardising.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. Convert the total to a per-component mean: `32320÷64` → **505** g.
> 2. SE = `20÷√64` → **2.5** g; z = `(505−500)÷2.5` → **2.000**; `Distr` `R(2)` → **0.022750**.
> 3. Total route agrees: S ~ N(64×500, 64×400), sd `√25600` → **160** g, z = `(32320−32000)÷160` = **2.000**.

## Traps & Exam Notes

- **Using the population standard deviation instead of the standard error.** The CLT is about $\bar X$, whose spread is $\frac{\sigma}{\sqrt n}$. Using $\sigma$ answers a question about one observation, not about a sample mean.
- **Believing the CLT makes the *data* normal.** It makes the *sampling distribution of the mean* approximately normal. The population histogram can stay as skewed as it likes.
- **Applying the CLT to a strongly skewed population with a small sample.** $n\ge30$ is a rule of thumb, not a theorem. Heavy skew needs 50 or more, and heavy tails with infinite variance are outside the theorem entirely.
- **Ignoring dependence between observations.** Cluster samples and time-series data violate independence; the standard error $\frac{\sigma}{\sqrt n}$ is then too small and every interval built on it is too narrow.
- **Forgetting the finite population correction.** With $n/N$ above 5%, $\sqrt{\frac{N-n}{N-1}}$ must be applied. Omitting it overstates the uncertainty.
- **Using $\hat p$ in a hypothesis test's standard error.** Tests use the hypothesised $p_0$ from $H_0$; confidence intervals use $\hat p$. Swapping them is a standard distractor.
- **Treating a total as a mean.** A question about the weight of a whole box involves $S\sim N(n\mu, n\sigma^{2})$; the standard deviation scales by $\sqrt n$, not by $n$. Mixing up the two gives answers off by a factor of $\sqrt n$.

## See Also

- [[09_Sampling_Techniques_and_Sampling_Distributions]]
- [[11_Confidence_Intervals]]
- [[12_Hypothesis_Testing,_Z,_t_and_p_Errors]]
- [[08_Normal_Distribution_and_Z_Scores]]

---

[[09_Sampling_Techniques_and_Sampling_Distributions|⬅ 09]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Confidence_Intervals|11 ➡]]
