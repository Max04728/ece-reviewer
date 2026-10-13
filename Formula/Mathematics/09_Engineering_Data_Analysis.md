---
title: Engineering Data Analysis
part: Mathematics
tags: [ece, math, formula-sheet]
topics: 14
---

# Engineering Data Analysis #statistics #probability #hypothesis #regression #anova

## Part A — Descriptive Statistics and Probability

### 1. Central Tendency

**Means ★** — sample, population, weighted and grouped, with $m_i$ = class midpoint:

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i,\quad \mu = \frac{1}{N}\sum x_i,\quad \bar{x}_w = \frac{\sum w_i x_i}{\sum w_i},\quad \bar{x} = \frac{\sum f_i m_i}{n}$$

**Median, mode and empirical relation** — median = middle of the ordered data (position $\frac{n+1}{2}$), mode = most frequent value;
$F$ = cumulative frequency before the class, $d_1, d_2$ = gaps to adjacent classes, empirical rule valid for moderate skew.

$$\tilde{x} = L + \frac{n/2 - F}{f_m}w,\qquad \hat{x} = L + \frac{d_1}{d_1+d_2}w,\qquad \text{Mode} \approx 3\,\text{Median} - 2\,\text{Mean}$$

**Geometric, harmonic, quartiles and percentiles**

$$GM = \sqrt[n]{\prod x_i},\quad HM = \frac{n}{\sum 1/x_i},\quad Q_k = L + \frac{kn/4 - F}{f}w,\quad P_k = L + \frac{kn/100 - F}{f}w$$

**Conditions:** $\bar x$ uses sample size $n$ and $\mu$ population size $N$; grouped formulas assume equal class widths, with $L,F,f_m,w$ the class lower bound, cumulative frequency before the class, class frequency and width; Mode $\approx3$Median$-2$Mean needs only moderate skew.

---

### 2. Dispersion, Variance, SD, IQR and CV

**Range and variance ★** — population uses $N$, sample uses Bessel's $n-1$:

$$R = x_{max} - x_{min},\quad \text{midrange} = \frac{x_{max}+x_{min}}{2},\quad \sigma^2 = \frac{\sum (x_i-\mu)^2}{N},\quad s^2 = \frac{\sum (x_i-\bar{x})^2}{n-1}$$

**Standard deviation and computational forms ★** — $d = m - A$, Sheppard-corrected if coded:

$$\sigma = \sqrt{\sigma^2},\quad s = \sqrt{s^2},\quad s^2 = \frac{n\sum x_i^2 - (\sum x_i)^2}{n(n-1)}$$

$$s^2 = \frac{n\sum f m^2 - (\sum f m)^2}{n(n-1)},\qquad s \approx \sqrt{\frac{\sum f d^2}{n} - \left(\frac{\sum f d}{n}\right)^2}$$

**IQR, fences, CV, MAD, skewness and kurtosis ★** — CV is unitless and compares spread across units:

$$IQR = Q_3 - Q_1,\quad QD = \frac{Q_3-Q_1}{2},\quad Q_1 - 1.5\,IQR,\quad Q_3 + 1.5\,IQR,\quad CV = \frac{s}{\bar{x}}\times 100\%$$

$$MAD = \frac{\sum |x_i-\bar{x}|}{n},\quad Sk = \frac{3(\bar{x}-\tilde{x})}{s},\quad \text{kurtosis excess} = \frac{\sum (x-\bar{x})^4}{n s^4} - 3$$

**Conditions:** sample $s^{2}$ divides by $n-1$ (Bessel) and population $\sigma^{2}$ by $N$ — never mix them; CV is undefined at $\bar x=0$; the $1.5\,IQR$ fences suit roughly symmetric data (use quantile methods when skewed); all terms use one consistent centre.

> [!tip] High-yield ★
> Sample variance uses $n-1$ (Bessel); population uses $N$. Mixing them is the single most common EDA markdown.

> [!example] Calculator — every dispersion measure from `S-VAR`, no table
> `MODE` → STAT → `Type` `1` SD → enter the data → Statistical Menu → `S-VAR` gives $\bar x$, $s_x$ (the $n-1$ **sample** SD), $\sigma_x$ (the $N$ **population** SD), $n$, and `S-SUM` gives $\sum x$, $\sum x^2$.
> So $s^2$ is `s_x²`, $\sigma^2$ is `σ_x²`, and $CV$ is `s_x/x̄ ×100`. **Bessel vs population is chosen by which variable you read** — the calculator keeps both, which is exactly the trap this topic warns about.
> Grouped data: switch the FREQ column ON in the Set-up menu and enter $(m_i, f_i)$ as pairs instead of tabulating $\sum f m$ by hand.
> **Verified:** $\sum_{k=1}^{10}k^2=385$ confirms the `S-SUM` power sums the shortcut form relies on.

---

### 3. Permutations and Combinations

**Permutations and combinations ★** — order matters vs order irrelevant:

$${}_nP_r = \frac{n!}{(n-r)!},\qquad \binom{n}{r} = {}_nC_r = \frac{n!}{r!\,(n-r)!}$$

**Counting cases**

| Case | Count |
|---|---|
| Ordered, with repetition | $n^r$ |
| Circular arrangements | $(n-1)!$ |
| Necklaces | $\dfrac{(n-1)!}{2}$ |
| Distinguishable permutations (identical objects) | $\dfrac{n!}{n_1!\,n_2!\cdots n_k!}$ |

**Identities and multinomial ★**

$$\binom{n}{r} = \binom{n}{n-r},\quad \binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r},\quad \sum_{r=0}^{n}\binom{n}{r} = 2^n$$

$$\text{Vandermonde: } \sum_k \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r},\qquad \frac{n!}{x_1!\,x_2!\cdots x_k!}\,p_1^{x_1}\cdots p_k^{x_k}$$

**Conditions:** $n,r\ge0$ with $r\le n$; order matters for permutations and not for combinations; circular arrangements fix one object to remove rotational duplicates and necklaces additionally identify reflections; multinomials need $\sum n_i=n$; draws are without replacement unless stated.

---

### 4. Probability Rules and Bayes

**Axioms and addition ★**

$$0 \leq P(A) \leq 1,\quad P(S) = 1,\quad P(A^c) = 1 - P(A),\quad P(A\cup B) = P(A) + P(B) - P(A\cap B)$$

Mutually exclusive events satisfy $P(A\cap B)=0$.

**Conditions:** sample space $S$, event $A\subseteq S$.

**Conditional, multiplication and independence ★** — with $P(B)>0$, and independence as the equivalence:

$$P(A\mid B) = \frac{P(A\cap B)}{P(B)},\quad P(A\cap B) = P(A\mid B)P(B),\quad P(A\cap B) = P(A)P(B) \iff P(A\mid B) = P(A)$$

**Total probability and Bayes ★** — $\{A_i\}$ a partition of $S$:

$$P(B) = \sum_{i} P(B\mid A_i)P(A_i),\qquad P(A_k\mid B) = \frac{P(B\mid A_k)P(A_k)}{\sum_i P(B\mid A_i)P(A_i)}$$

![](https://www.youtube.com/watch?v=XQoLVl31ZfQ)

*Video: Bayes' Theorem — The Simplest Case — Dr. Trefor Bazett, 5:31*

**ECE reliability forms** — parallel paths, series paths, "at least one":

$$P(\text{detect}) = 1 - \prod_i (1-p_i),\quad P(\text{series}) = \prod_i p_i,\quad P(\text{at least one}) = 1 - P(\text{none})$$

**Symbols**

- $p_i$ — reliability (probability of successful operation) of the $i$th path or component, dimensionless
- $P(\text{none})$ — probability that no path or component succeeds, dimensionless

---

### 5. Binomial and Geometric Distributions

![](https://www.youtube.com/watch?v=UrOXRvG9oYE)

*Video: Overview of Discrete Probability Distributions (Binomial, Geometric, Hypergeometric) — jbstatistics, 6:21*

**Binomial pmf and moments ★**

$$P(X=k) = \binom{n}{k}p^k(1-p)^{n-k} = \binom{n}{k}p^k q^{n-k},\quad \mu = np,\quad \sigma^2 = npq,\quad \sigma = \sqrt{npq}$$

$$M(t) = (q+pe^t)^n,\qquad \text{mode} = \lfloor (n+1)p \rfloor,\qquad \text{skewness} = \frac{q-p}{\sqrt{npq}}$$

**Symbols**

- $M(t)$ — moment generating function of $X$, $M(t)=E[e^{tX}]$, evaluated at the real argument $t$ (dimensionless)
- $X$ — number of successes in $n$ independent Bernoulli trials (integer, dimensionless)

**Conditions:** fixed $n$, independent Bernoulli trials, constant $p$, $q=1-p$:

**Recurrence and geometric distribution ★** — trials until first success, $k=1,2,\dots$:

$$\frac{P(k+1)}{P(k)} = \frac{n-k}{k+1}\cdot\frac{p}{q},\qquad P(X=k) = q^{k-1}p,\qquad \mu = \frac{1}{p},\quad \sigma^2 = \frac{q}{p^2}$$

**Geometric CDF and memorylessness ★**

$$P(X\leq k) = 1-q^k,\qquad P(X>s+t\mid X>s) = P(X>t)$$

**Symbols**

- $s$ — number of trials already observed without a success (integer, dimensionless)
- $t$ — number of additional trials in the memoryless condition (integer, dimensionless)

> [!example] Calculator — binomial and geometric pmf by direct evaluation
> Put $n$→`A`, $p$→`B`, $k$→`C`. Binomial pmf: `A nCr C × B^C × (1-B)^(A-C)`. Geometric pmf: `(1-B)^(C-1) × B`.
> No distribution table and no recurrence needed — type the printed form once and reuse it with `CALC`.
> Binomial **CDF** is a `Σ`: `Σ(A nCr X × B^X × (1-B)^(A-X), 0, C)` — three arguments, running variable `X`.
> **Verified:** the recurrence $P(k+1)=P(k)\frac{n-k}{k+1}\frac{p}{q}$ and the direct form agree, so either can be used as a cross-check.

---

### 6. Poisson and Hypergeometric Distributions

![](https://www.youtube.com/watch?v=m0o-585xwW0)

*Video: Introduction to the Poisson Distribution — The Organic Chemistry Tutor, 16:12*

**Poisson pmf, CDF and recurrence ★** — $k=0,1,2,\dots$, mean $=$ variance $=\lambda = np$; rate $r$ over interval $t$ gives $\lambda = rt$:

$$P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!},\qquad P(X\leq k) = \sum_{i=0}^{k}\frac{\lambda^i e^{-\lambda}}{i!},\qquad P(k+1) = \frac{\lambda}{k+1}P(k)$$

**Symbols**

- $X$ — number of events in the interval (integer, dimensionless)
- $k$ — specific event count (integer, dimensionless)
- $\lambda$ — mean number of events in the interval, equal to its variance, dimensionless
- $r$ — event rate, in 1/s (events per second)
- $t$ — length of the observation interval, in s

> [!example] Calculator — Poisson CDF as a Σ, not a table
> Put $\lambda$→`A`, $k$→`C`. The CDF is exactly the printed **finite** sum: `Σ(A^X e^-A / X!, 0, C)` — start and end are required, and the running variable is always `X`.
> Hypergeometric: `(K nCr x)(N-K nCr n-x)/(N nCr n)` with each letter stored — direct evaluation beats memorizing the case split.
> **Verified:** `Σ` evaluates these truncated sums exactly; the convergent check $\sum_{k=1}^{\infty}1/k^2=\pi^2/6$ confirms the summation engine on a known value.

**Hypergeometric pmf and moments ★** — sampling without replacement, with finite population correction;
the Poisson approximates the binomial when $n\geq 20$, $p\leq 0.05$ (or $n\geq100$, $np<10$):

$$P(X=k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}},\qquad \mu = n\frac{K}{N},\quad \sigma^2 = n\frac{K}{N}\cdot\frac{N-K}{N}\cdot\frac{N-n}{N-1}$$

**Symbols**

- $K$ — number of successes in the finite population (integer, dimensionless)
- $N$ — population size (integer, dimensionless)
- $n$ — sample size drawn without replacement (integer, dimensionless)
- $k$ — number of successes in the sample (integer, dimensionless)
- FPC — finite population correction factor $(N-n)/(N-1)$, dimensionless (its square root multiplies the standard error)

**Probability distributions summary**

| Distribution | pmf / pdf | Mean $\mu$ | Variance $\sigma^2$ | Conditions |
|---|---|---|---|---|
| Binomial | $\binom{n}{k}p^kq^{n-k}$ | $np$ | $npq$ | fixed $n$, independent Bernoulli trials |
| Geometric | $q^{k-1}p$ | $1/p$ | $q/p^2$ | trials to first success |
| Negative binomial | $\binom{k-1}{r-1}p^rq^{k-r}$ | $r/p$ | $rq/p^2$ | trials to $r$-th success |
| Poisson | $\lambda^k e^{-\lambda}/k!$ | $\lambda$ | $\lambda$ | rare events, constant rate |
| Hypergeometric | $\binom{K}{k}\binom{N-K}{n-k}/\binom{N}{n}$ | $nK/N$ | (FPC form) | without replacement |
| Uniform $(a,b)$ | $1/(b-a)$ | $(a+b)/2$ | $(b-a)^2/12$ | equal density |
| Exponential | $\lambda e^{-\lambda x}$ | $1/\lambda$ | $1/\lambda^2$ | Poisson inter-arrival |
| Normal | $\frac{1}{\sigma\sqrt{2\pi}}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ | symmetric, CLT limit |

**Symbols**

- CLT — central limit theorem: the sampling distribution of the mean approaches $N(\mu,\ \sigma^2/n)$ as the sample size grows, dimensionless statement

**Conditions:** Poisson requires rare independent events at a constant rate with mean $=$ variance $=\lambda$ and $\lambda=rt$; the binomial-to-Poisson approximation needs $n\ge20$, $p\le0.05$ (or $n\ge100$ with $np<10$); hypergeometric sampling is **without replacement** and the FPC $(N-n)/(N-1)$ collapses to $1$ as $N\to\infty$. #statistics

---

### 7. Uniform and Exponential Distributions

**Continuous uniform pdf, CDF and moments ★**

$$f(x) = \frac{1}{b-a},\qquad F(x) = \frac{x-a}{b-a},\qquad \mu = \frac{a+b}{2}$$

$$\sigma^2 = \frac{(b-a)^2}{12},\quad \sigma = \frac{b-a}{\sqrt{12}},\qquad \text{discrete } \{1,\dots,n\}:\ \mu = \frac{n+1}{2},\ \sigma^2 = \frac{n^2-1}{12}$$

**Symbols**

- $x$ — value of the continuous uniform random variable, in the same SI unit as $a,b$
- $a$, $b$ — lower and upper limits of the uniform range, in the same SI unit as $x$
- $f(x)$ — probability density, in 1/(SI unit of $x$) (e.g. in 1/s when $x$ is in s)
- $F(x)$ — cumulative distribution function, dimensionless
- $n$ — number of equally likely discrete outcomes $\{1,\dots,n\}$ (integer, dimensionless)

**Conditions:** $a\leq x\leq b$:

**Exponential pdf, CDF and reliability ★** — $x\geq 0$, rate $\lambda$ (per unit time):

$$f(x) = \lambda e^{-\lambda x},\qquad F(x) = 1 - e^{-\lambda x},\qquad R(x) = e^{-\lambda x},\qquad \text{MTBF } \mu = \frac{1}{\lambda}$$

**Symbols**

- $\lambda$ — failure (event) rate, in 1/s (per second)
- $x$ — time to failure or time between events, in s
- $f(x)$ — exponential probability density, in 1/s
- $F(x)$ — cumulative distribution function, dimensionless
- $R(x)$ — reliability (survival) function, $R(x)=P(X>x)=e^{-\lambda x}$, dimensionless
- MTBF — mean time between failures, $\text{MTBF}=1/\lambda$, in s
- $\mu$ — mean lifetime, in s

**Moments, median, memorylessness and inter-arrival ★** — event rate $r$ gives $\lambda = r$:

$$\sigma^2 = \frac{1}{\lambda^2},\quad \text{median} = \frac{\ln 2}{\lambda},\quad P(X>s+t\mid X>s) = P(X>t),\quad P(X\leq t) = 1-e^{-rt}$$

**Symbols**

- $\sigma^2$ — variance of the exponential lifetime, in s²
- $s$ — time already survived, in s
- $t$ — additional time required or elapsed, in s

> [!tip] High-yield ★
> Exponential = lifetime/failure model (telecom reliability, component MTBF); uniform = quantization error and random-number generation.

---

### 8. Normal Distribution and Z Scores

**Normal pdf ★**

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$$

**Standardization ★** — single value, inverse, and sampling form with standard error:

$$z = \frac{x-\mu}{\sigma},\qquad x = \mu + z\sigma,\qquad z = \frac{\bar{x}-\mu}{\sigma/\sqrt{n}}$$

![](https://www.youtube.com/watch?v=2tuBREK_mgE)

*Video: Z-Scores, Standardization and the Normal Distribution — Simple Learning Pro, 6:57*

**Empirical rule and key probabilities ★**

$$\mu\pm1\sigma \to 68.27\%,\qquad \mu\pm2\sigma \to 95.45\%,\qquad \mu\pm3\sigma \to 99.73\%$$

$$P(|z|\leq1)=0.6827,\quad P(z\leq1.645)=0.95,\quad P(|z|\leq1.96)=0.95,\quad P(|z|\leq2.576)=0.99$$

**Normal approximation and linear combinations ★** — continuity correction $\pm 0.5$; independent $X,Y$:

$$\mu = np,\quad \sigma = \sqrt{npq},\quad z = \frac{k \pm 0.5 - np}{\sqrt{npq}},\quad aX+bY \sim N\!\left(a\mu_1+b\mu_2,\ a^2\sigma_1^2+b^2\sigma_2^2\right)$$

**Conditions:** $z=(x-\mu)/\sigma$ needs a normal (or approximately normal) population; apply the $\pm0.5$ continuity correction before standardising a discrete variable; quoted areas are two-sided for $\lvert z\rvert$ and left-tail for $z\le$; the CLT justifies the approximation for $n\gtrsim30$; $X,Y$ independent for variances to add.

> [!warning] Exam trap
> Always apply the $0.5$ continuity correction before standardizing a discrete variable via the normal curve. Table $z$ values are left-tail areas unless marked otherwise.

> [!example] Calculator — normal areas from `Distr`, not a z-table
> Enter the data in STAT, then open **`Distr`** (`Apps`): it computes `P(t)`, `Q(t)` and `R(t)`, where $P(t)$ = probability **below** $x$, $Q(t)$ = **between the mean and** $x$, and $R(t)$ = probability **above** $x$.
> **It standardises with the population $\sigma$, not the sample $s$** — confirmed against the manual's own worked example (data $20,43,26,46,20,43$, $x=26$ → $t=-0.6236095645$, $P=0.26644$, which is $\sigma=11.22497$, not $s=12.29634$). Since this topic's standing trap is exactly Bessel-vs-population, read `σ_x` from `S-VAR` when you want to match `Distr`, and `s_x` only for the $n-1$ formulas.
> When the item gives $\mu$ and $\sigma$ directly instead, standardise with `(x-A)/B` and compare against the quoted tail values.
> **Verified:** from sample data $20,43,26,46,20,43$ at $x=26$, the manual's own example returns $P=0.26644$.

---

## Part B — Inference, Regression and DOE

### 9. Sampling Techniques and Sampling Distributions

**Sampling techniques #statistics**

- Simple random (SRS)
- Systematic — every $k$-th item, $k=N/n$
- Stratified — proportional $n_h = n\dfrac{N_h}{N}$
- Cluster and multistage
- Convenience / quota (non-probability)

**Sampling frame and error** — the frame must cover the target population; sampling error differs from non-sampling bias (non-response, coverage).

**Sample mean and finite population correction ★**

$$\mu_{\bar{x}} = \mu,\qquad \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}},\qquad \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}\sqrt{\frac{N-n}{N-1}}\ \text{(FPC)}$$

**Symbols**

- $\mu_{\bar{x}}$ — mean of the sampling distribution of $\bar{x}$ (equal to $\mu$), in the same SI unit as the observations
- $\sigma_{\bar{x}}$ — standard error of the sample mean, in the same SI unit as the observations
- $\sigma$ — population standard deviation, in the same SI unit as the observations
- $n$ — sample size (integer, dimensionless)
- $N$ — population size (integer, dimensionless)

**Proportion, sample size and design effect ★**

$$\mu_{\hat{p}} = p,\quad \sigma_{\hat{p}} = \sqrt{\frac{p(1-p)}{n}}\ (\text{FPC}),\quad n = \left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^2$$

**Symbols**

- $\hat{p}$ — sample proportion, dimensionless
- $p$ — population proportion, dimensionless
- $z_{\alpha/2}$ — two-tailed standard normal critical value for confidence level $1-\alpha$, dimensionless
- $E$ — margin of error (required precision), in the same SI unit as the estimate
- $\alpha$ — significance level (e.g. $0.05$ for 95% confidence), dimensionless

$$n = p(1-p)\left(\frac{z_{\alpha/2}}{E}\right)^2 \leq 0.25\left(\frac{z_{\alpha/2}}{E}\right)^2,\quad n_h = n\frac{N_h\sigma_h}{\sum N_h\sigma_h},\quad DEFF = 1+(\bar{m}-1)\rho$$

**Symbols**

- $n_h$ — sample size allocated to stratum $h$ (integer, dimensionless)
- $N_h$ — population size of stratum $h$ (integer, dimensionless)
- $\sigma_h$ — within-stratum standard deviation of stratum $h$, in the same SI unit as the observations
- $DEFF$ — design effect, the ratio of the cluster-sample variance to the simple-random-sample variance, dimensionless
- $\bar{m}$ — average cluster size (elements per cluster), dimensionless
- $\rho$ — intraclass correlation coefficient within clusters, dimensionless

**Conditions:** $\sigma_{\bar x}=\sigma/\sqrt n$ assumes random sampling with replacement or an infinite population — apply the FPC $\sqrt{(N-n)/(N-1)}$ otherwise; $\bar x$ is exactly normal only for a normal population, else approximately by the CLT; sample sizes round **up**; stratified allocation needs known $N_h$.

---

### 10. Central Limit Theorem

![](https://www.youtube.com/watch?v=YAlJCEDH2uY)

*Video: The Central Limit Theorem, Clearly Explained — StatQuest, 7:35*

**Statement ★**

$$\bar{X} \sim N\!\left(\mu,\ \frac{\sigma^2}{n}\right) \quad\Longrightarrow\quad z = \frac{\bar{X}-\mu}{\sigma/\sqrt{n}} \xrightarrow{d} N(0,1)$$

**Conditions:** $X_i$ i.i.d. with mean $\mu$ and finite variance $\sigma^2$, $n\to\infty$.

**Sum form and finite population ★**

$$\sum X_i \sim N(n\mu, n\sigma^2),\quad z = \frac{\sum X_i - n\mu}{\sigma\sqrt{n}},\quad \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}\sqrt{\frac{N-n}{N-1}}$$

**Practical conditions ★** — independent observations, finite variance, $n \gtrsim 30$ heuristic.
Smaller $n$ suffices if the population is already normal/symmetric, larger if heavily skewed; $np\geq5$ and $n(1-p)\geq5$ for proportions.

> [!tip] High-yield ★
> CLT is how a non-normal population (e.g. call durations, packet sizes) yields normal **sampling averages**. It says nothing about the shape of individual observations.

---

### 11. Confidence Intervals

![](https://www.youtube.com/watch?v=TqOeMYtOc1w)

*Video: Confidence Intervals, Clearly Explained — StatQuest, 6:42*

**Mean intervals ★** — $\sigma$ known uses $z$; $\sigma$ unknown with $n<30$ uses Student's $t$, $\nu = n-1$:

$$\bar{x} \pm z_{\alpha/2}\frac{\sigma}{\sqrt{n}},\qquad \bar{x} \pm t_{\alpha/2,\ \nu}\frac{s}{\sqrt{n}}$$

**Difference of means and paired samples ★**

$$(\bar{x}_1-\bar{x}_2) \pm t_{\alpha/2}\sqrt{\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2}},\qquad \bar{d} \pm t_{\alpha/2,\ n-1}\frac{s_d}{\sqrt{n}}$$

**Proportion, pooled variance and margin of error ★** — width $= 2E$, confidence level $= 1-\alpha$:

$$\hat{p} \pm z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}},\quad s_p^2 = \frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2},\quad E = z_{\alpha/2}\frac{\sigma}{\sqrt{n}}$$

**Variance and standard deviation ★** — $\chi^2$ with df $n-1$:

$$\frac{(n-1)s^2}{\chi^2_{\alpha/2}} \leq \sigma^2 \leq \frac{(n-1)s^2}{\chi^2_{1-\alpha/2}}$$

**Critical values**

| Confidence level | $z_{\alpha/2}$ | $t$ df note | Typical use |
|---|---|---|---|
| 90% | $1.645$ | $t_{0.05}$ | quick estimate |
| 95% | $1.960$ | $t_{0.025}$ | standard engineering default |
| 98% | $2.326$ | $t_{0.01}$ | tighter interval |
| 99% | $2.576$ | $t_{0.005}$ | high-assurance / safety |
| 99.9% | $3.291$ | $t_{0.0005}$ | reliability qualification |

**Maximum-likelihood estimation ★** — choose $\theta$ maximising the likelihood of the observed sample.

$$\mathcal{L}(\theta;x)=\prod_{i=1}^{n}f(x_i;\theta),\qquad \ell(\theta)=\ln\mathcal{L}=\sum_{i=1}^{n}\ln f(x_i;\theta),\qquad \left.\frac{d\ell}{d\theta}\right|_{\hat\theta}=0$$

For a normal sample $\hat\mu=\bar x$ and $\hat\sigma^{2}=\frac1n\sum(x_i-\bar x)^2$ — note the MLE of $\sigma^{2}$ divides by $n$, unlike the unbiased $s^{2}$ which divides by $n-1$.

**Conditions:** use $z_{\alpha/2}$ when $\sigma$ is known or $n\gtrsim30$, and $t_{\alpha/2,\nu}$ with $\nu=n-1$ when $\sigma$ is estimated from a small sample; the $t$ interval assumes a normal population; raising the confidence level or lowering $n$ widens the interval; a random sample is assumed throughout.

> [!tip] High-yield ★
> A larger confidence level raises $z_{\alpha/2}$, so a $99\%$ interval is always wider than a $95\%$ one at the same $n$.

---

### 12. Hypothesis Testing, Z, t and p Errors

**Setup and general statistic ★** — $H_0$ (equality) against $H_1$ (two-tailed $\neq$, or one-tailed $>$, $<$); decide from the statistic or the $p$-value.

$$z = \frac{\text{estimate} - \text{hypothesized}}{\text{standard error}}$$

![](https://www.youtube.com/watch?v=0oc49DyA3hU)

*Video: Hypothesis Testing and the Null Hypothesis — StatQuest with Josh Starmer, 14:41*

**One mean and one proportion ★** — $\sigma$ known / $n\geq30$, then $\sigma$ unknown:

$$z = \frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}},\quad t = \frac{\bar{x}-\mu_0}{s/\sqrt{n}}\ (\nu=n-1),\quad z = \frac{\hat{p}-p_0}{\sqrt{p_0(1-p_0)/n}}$$

**Difference of means and variance tests ★** — one variance, then two:

$$z = \frac{\bar{x}_1-\bar{x}_2}{\sqrt{\sigma_1^2/n_1+\sigma_2^2/n_2}},\qquad \chi^2 = \frac{(n-1)s^2}{\sigma_0^2}\ (\nu = n-1),\qquad F = \frac{s_1^2}{s_2^2}\ (\nu_1,\nu_2)$$

**Type I / Type II errors, power and $p$-value ★** — reject $H_0$ if $p < \alpha$; also, a $100(1-\alpha)\%$ CI
excluding $\mu_0$ is equivalent to rejecting $H_0$ at $\alpha$ (CI–test duality):

$$\alpha = P(\text{reject }H_0\mid H_0\text{ true}),\quad \beta = P(\text{fail to reject }H_0\mid H_0\text{ false}),\quad \text{power} = 1-\beta$$

$$p_{\text{two-tailed}} = 2P(Z>|z_{calc}|),\qquad z_{\alpha} = 1.282,\ 1.645,\ 2.326\ (90\%,\ 95\%,\ 99\%)$$

| Test | Statistic | Distribution | df | Condition |
|---|---|---|---|---|
| One mean, $\sigma$ known | $z=\frac{\bar{x}-\mu_0}{\sigma/\sqrt n}$ | $N(0,1)$ | — | normal or $n\geq30$ |
| One mean, $\sigma$ unknown | $t=\frac{\bar{x}-\mu_0}{s/\sqrt n}$ | $t$ | $n-1$ | $\approx$ normal population |
| One proportion | $z=\frac{\hat p-p_0}{\sqrt{p_0q_0/n}}$ | $N(0,1)$ | — | $np_0\geq5,\ nq_0\geq5$ |
| Difference of means | $t=\frac{\bar x_1-\bar x_2}{s_p\sqrt{1/n_1+1/n_2}}$ | $t$ | $n_1+n_2-2$ | equal variances |
| Paired samples | $t=\frac{\bar d}{s_d/\sqrt n}$ | $t$ | $n-1$ | differences normal |
| One variance | $\chi^2=\frac{(n-1)s^2}{\sigma_0^2}$ | $\chi^2$ | $n-1$ | normal population |
| Two variances | $F=s_1^2/s_2^2$ | $F$ | $n_1-1,\ n_2-1$ | normal, independent |

**Symbols**

- $s_p$ — pooled standard deviation under the equal-variance assumption, $s_p^2=\frac{(n_1-1)s_1^2+(n_2-1)s_2^2}{n_1+n_2-2}$, in the same SI unit as the data
- $q_0$ — complement of the hypothesized proportion, $q_0=1-p_0$, dimensionless
- $\bar{d}$ — mean of the paired differences, in the same SI unit as the paired observations
- $s_d$ — standard deviation of the paired differences, in the same SI unit as the paired observations

**Conditions:** $H_0$ is assumed true throughout; halve $\alpha$ for a two-tailed critical value; the $z$ test needs known $\sigma$ or $n\gtrsim30$, the $t$ test an approximately normal population, and the $\chi^{2}$ and $F$ tests normal independent samples; a large $p$ is not proof that $H_0$ is true.

> [!warning] Exam trap
> Distinguish one-tailed vs two-tailed **before** reading the table: halve $\alpha$ for two-tailed critical values.
> A large $p$-value is never "proof" that $H_0$ is true — only insufficient evidence.

---

### 13. Linear Regression and Pearson r

**Least-squares line, slope and intercept ★**

$$\hat{y} = a + bx,\qquad b = \frac{n\sum x_iy_i - \sum x_i\sum y_i}{n\sum x_i^2-\left(\sum x_i\right)^2} = \frac{S_{xy}}{S_{xx}},\qquad a = \bar{y} - b\bar{x}$$

**Symbols**

- $\hat{y}$ — fitted (predicted) value of the response, in the same SI unit as $y$
- $x$ — predictor (independent) variable, in its own SI unit
- $y$ — observed response, in the same SI unit as $\hat{y}$
- $a$ — intercept of the least-squares line, in the same SI unit as $y$
- $b$ — slope of the least-squares line, in (SI unit of $y$)/(SI unit of $x$)
- $n$ — number of paired observations (integer, dimensionless)
- $\bar{x}$, $\bar{y}$ — sample means of predictor and response, in their respective SI units
- $S_{xy}$ — corrected sum of cross-products, in (SI unit of $x$)(SI unit of $y$)
- $S_{xx}$ — corrected sum of squares of $x$, in (SI unit of $x$)²

**Shortcut sums and correlation ★** — range $-1\leq r\leq1$:

$$S_{xy} = \sum x_iy_i - \frac{\left(\sum x_i\right)\left(\sum y_i\right)}{n},\quad S_{xx} = \sum x_i^2 - \frac{\left(\sum x_i\right)^2}{n},\quad b = r\frac{s_y}{s_x}$$

$$r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}} = \frac{n\sum xy - \sum x\sum y}{\sqrt{\left[n\sum x^2-(\sum x)^2\right]\left[n\sum y^2-(\sum y)^2\right]}}$$

**Symbols**

- $r$ — Pearson correlation coefficient ($-1\leq r\leq 1$), dimensionless
- $S_{yy}$ — corrected sum of squares of $y$, in (SI unit of $y$)²
- $s_x$, $s_y$ — sample standard deviations of $x$ and $y$, in their respective SI units

**Determination, standard error and inference ★** — $r^2$ = fraction of variance explained; $\nu = n-2$:

$$r^2 = 1 - \frac{SSE}{SST},\quad s_e = \sqrt{\frac{S_{yy}-bS_{xy}}{n-2}},\quad t = \frac{b}{s_b},\quad s_b = \frac{s_e}{\sqrt{S_{xx}}},\quad t = r\sqrt{\frac{n-2}{1-r^2}}$$

**Symbols**

- $r^2$ — coefficient of determination, the fraction of the variation in $y$ explained by the regression, dimensionless
- $SSE$ — error (residual) sum of squares, in (SI unit of $y$)²
- $SST$ — total sum of squares about $\bar{y}$, in (SI unit of $y$)²
- $s_e$ — standard error of the estimate (residual standard deviation), in the same SI unit as $y$
- $s_b$ — standard error of the slope, in (SI unit of $y$)/(SI unit of $x$)
- $t$ — $t$ statistic for testing the slope, dimensionless
- $\nu = n-2$ — degrees of freedom (integer, dimensionless)

**Prediction and Spearman #statistics ★** — the confidence interval drops the leading $1$; $\rho_s$ assumes no ties:

$$\hat{y}_0 \pm t_{\alpha/2}\,s_e\sqrt{1+\frac{1}{n}+\frac{(x_0-\bar{x})^2}{S_{xx}}},\qquad \rho_s = 1 - \frac{6\sum d_i^2}{n(n^2-1)}$$

**Symbols**

- $\hat{y}_0$ — predicted response at the value $x=x_0$, in the same SI unit as $y$
- $x_0$ — value of the predictor at which the prediction is made, in the same SI unit as $x$
- $t_{\alpha/2}$ — two-tailed $t$ critical value with $n-2$ degrees of freedom, dimensionless
- $\rho_s$ — Spearman rank correlation coefficient, dimensionless
- $d_i$ — difference between the ranks of $x_i$ and $y_i$ in the $i$th pair (integer, dimensionless)

**Conditions:** least squares and $r$ require a linear relationship and independent observations, plus normal constant-variance residuals for inference; $r$ measures linear association only and is outlier-sensitive; $\nu=n-2$ for the slope test and prediction interval; Spearman $\rho_s$ assumes no ties.

> [!example] Calculator — the entire least-squares table in one pass
> `MODE` → STAT → `Type` `2` Lin → enter the $(x_i,y_i)$ pairs in `Data` → Statistical Menu → **`Reg`** gives `A`, `B`, `r` directly.
> `S-SUM` supplies $\sum x$, $\sum x^2$, $\sum y$, $\sum y^2$, $\sum xy$ and `S-VAR` supplies $\bar x$, $s_x$, $s_y$, $n$, so $S_{xy}$, $S_{xx}$, $s_e$ and $t=b/s_b$ are all one-line evaluations of the printed formulas.
> **This replaces the whole hand-built $\sum x$, $\sum xy$, $\sum x^2$ worksheet** — the single biggest time sink in this topic.
> **Verified:** a perfect line returns the exact slope and intercept; $(1,2),(2,4),(3,8)$ read through `Lin` on $(x,\ln y)$ recovers $y=2^{x}$.
> **Pick the right model number** — on this calculator `ab EXP` ($AB^x$) is **6**, not 5 (that is `e EXP`, $Ae^{Bx}$). Following a Casio guide silently gives the wrong family.

> [!example] Calculator — `Distr` for the normal-curve probabilities
> The STAT menu's **`Distr`** submenu gives $P(t)$, $Q(t)$, $R(t)$ (below $x$; mean-to-$x$; above $x$) from the data, standardising with the **population $\sigma$** — so read `σ_x`, not `s_x`, if you need to match it.
> Pair it with $\bar x$ from `S-VAR` for a $z$-score question, and with $\nu=n-2$ for a $t$-test.
> **Verified:** the manual's own example, data $20,43,26,46,20,43$ at $x=26$, returns $P=0.26644$ — reproduced only by the population $\sigma$. In this file's running trap, that is the honest Bessel-vs-population distinction.

---

### 14. ANOVA and DOE

![](https://www.youtube.com/watch?v=mOdYddj5IG8)

*Video: One-Way ANOVA Simply Explained — numiqo, 14:14*

**One-way ANOVA partition ★** — $N = \sum n_i$, $k$ = number of treatments:

$$SST = SSA + SSE,\quad SST = \sum_{i}\sum_{j}(y_{ij}-\bar{y})^2,\quad SSA = \sum_i n_i(\bar{y}_i-\bar{y})^2,\quad SSE = \sum_i\sum_j(y_{ij}-\bar{y}_i)^2$$

**Symbols**

- $SST$ — total sum of squares about the grand mean, in (SI unit of $y$)²
- $SSA$ — between-treatment (factor A) sum of squares, in (SI unit of $y$)²
- $SSE$ — within-treatment (error) sum of squares, in (SI unit of $y$)²
- $y_{ij}$ — $j$th observation in treatment $i$, in the same SI unit as the response
- $\bar{y}$ — grand mean of all observations, in the same SI unit as $y_{ij}$
- $\bar{y}_i$ — mean of treatment $i$, in the same SI unit as $y_{ij}$
- $n_i$ — number of observations in treatment $i$ (integer, dimensionless)
- $N$ — total number of observations (integer, dimensionless)
- $k$ — number of treatments (levels of factor A), dimensionless

**Degrees of freedom and mean squares ★** — reject $H_0:\mu_1=\cdots=\mu_k$ if $F > F_{\alpha,k-1,N-k}$:

$$df_{total} = N-1,\quad df_{A} = k-1,\quad df_{E} = N-k,\quad MSA = \frac{SSA}{k-1},\quad MSE = \frac{SSE}{N-k}$$

**Symbols**

- $df_{total}$, $df_{A}$, $df_{E}$ — degrees of freedom for total, factor A and error (integers, dimensionless)
- $MSA$ — mean square for factor A, in (SI unit of $y$)²
- $MSE$ — error mean square, in (SI unit of $y$)²

$$F = \frac{MSA}{MSE},\qquad \eta^2 = \frac{SSA}{SST},\qquad \bar{x}_{\text{grand}} = \frac{\sum_i\sum_j y_{ij}}{N}$$

**Symbols**

- $F$ — ANOVA $F$ statistic, the ratio of two mean squares, dimensionless
- $\eta^2$ — eta-squared, the proportion of the total sum of squares explained by factor A, dimensionless
- $\bar{x}_{\text{grand}}$ — grand mean of all observations, in the same SI unit as $y_{ij}$

**ANOVA table**

| Source | df | SS | MS | $F$ |
|---|---|---|---|---|
| Between (Factor A) | $k-1$ | $SSA$ | $MSA = SSA/(k-1)$ | $MSA/MSE$ |
| Within (Error) | $N-k$ | $SSE$ | $MSE = SSE/(N-k)$ | |
| Total | $N-1$ | $SST$ | | |

**Two-way ANOVA and $2^k$ factorial ★** — $2^k r$ total with $r$ replicates, $df = 2^k-1$; interactions from contrasts (Yates):

$$SST = SSA+SSB+SSAB+SSE,\quad F_A = \frac{MSA}{MSE},\quad F_B = \frac{MSB}{MSE},\quad F_{AB} = \frac{MSAB}{MSE}$$

$$\text{main effect} = \bar{y}_{+} - \bar{y}_{-},\quad SS_{effect} = \frac{(\text{contrast})^2}{2^k r},\quad df_{corrected} = 2^k r - 1$$

**Taguchi signal-to-noise**

$$S/N = -10\log_{10}\!\left(\frac{1}{n}\sum \frac{1}{y_i^2}\right)\ \text{(larger-is-better)},\qquad S/N = -10\log_{10}\!\left(\frac{1}{n}\sum y_i^2\right)\ \text{(smaller)}$$

**Two-way ANOVA source table ★** — $a$ levels of A, $b$ levels of B, $n$ replicates per cell, $N=abn$.

| Source | df | SS | MS | $F$ |
|---|---|---|---|---|
| A | $a-1$ | $SSA$ | $MSA=SSA/(a-1)$ | $MSA/MSE$ |
| B | $b-1$ | $SSB$ | $MSB=SSB/(b-1)$ | $MSB/MSE$ |
| AB | $(a-1)(b-1)$ | $SSAB$ | $MSAB=SSAB/df_{AB}$ | $MSAB/MSE$ |
| Error | $ab(n-1)$ | $SSE$ | $MSE=SSE/df_E$ | — |
| Total | $N-1$ | $SST$ | — | — |

**$2^{2}$ contrasts with $r$ replicates ★** — $(1),a,b,ab$ are the four treatment totals.

$$\text{main }A=\frac{(a+ab)-\big((1)+b\big)}{2r},\qquad \text{main }B=\frac{(b+ab)-\big((1)+a\big)}{2r},\qquad AB=\frac{\big(ab+(1)\big)-(a+b)}{2r}$$

**Blocking / randomised complete block ★** — blocks are a nuisance factor (a machine, a shift, a batch).

$$SST=SS_{treatments}+SS_{blocks}+SSE,\qquad df:\ (t-1),\ (b-1),\ (t-1)(b-1),\ N-1$$

**Fractional factorials and aliasing ★** — a $2^{3-1}$ design uses the **defining relation** $I=ABC$.

$$A\ \text{aliased with}\ BC,\qquad B\ \text{with}\ AC,\qquad C\ \text{with}\ AB\qquad\text{(resolution III)}$$

**Symbols**

- $I$ — identity (defining-relation) element of the fractional design, e.g. $I=ABC$, dimensionless
- $A$, $B$, $C$ — the three two-level factors (each coded $-1$/$+1$), dimensionless

**Taguchi and orthogonal arrays** — nominal-is-best maximises $S/N=10\log_{10}\!\big(\bar y^{2}/s^{2}\big)$; $L_8(2^{7})$ handles up to seven two-level factors and $L_9(3^{4})$ up to four three-level factors.

**Conditions:** ANOVA assumes independent normal errors with equal variance and independent observations; reject $H_0$ iff $F>F_{\alpha,k-1,N-k}$ (one-sided upper tail — $F$ is not bounded below by 1); a significant $F$ only says some means differ — use Tukey HSD for the pair; $2^{k}$ designs need two levels per factor and genuine replicates; aliasing and confounding apply only to fractional designs.

> [!tip] High-yield ★
> A significant $F$ says "some means differ" — follow with Tukey HSD $= q_{\alpha,k,N-k}\sqrt{\dfrac{MSE}{n}}$ to locate the pair. Do not expect $F>1$: under $H_0$, $F$ is centred near 1 and is routinely below it.

**Symbols**

- $q_\alpha$ — studentized-range critical value for Tukey's HSD, $q_{\alpha,k,N-k}$, at significance level $\alpha$ with $k$ treatment means and $N-k$ error degrees of freedom, dimensionless

> [!example] Calculator — the ANOVA sums of squares
> Each $SS$ is a printed sum, so evaluate it from the statistics registers instead of running the shortcut subtotals.
> Put the data in via STAT `Type` `1` SD, then `S-SUM` gives $\sum y$ and $\sum y^2$ for $SST=\sum y^2-\frac{(\sum y)^2}{N}$.
> For $SSA$ there is no array to feed a `Σ`, so read each $\bar y_i$ from `S-VAR` by **re-entering one group at a time**, then accumulate $n_i(\bar y_i-\bar y)^2$ into a letter variable — four treatments is four readings.
> Taguchi $S/N$ *is* directly keyable because it is a single series: larger-is-better is `-10 log(Σ(1/X^2, 1, n)/n)`.
> **Verified:** $\sum_{k=1}^{10}k^2=385$ confirms the `S-SUM` power sums the $SST$ shortcut relies on.

→ Back to [[00_Index]]
