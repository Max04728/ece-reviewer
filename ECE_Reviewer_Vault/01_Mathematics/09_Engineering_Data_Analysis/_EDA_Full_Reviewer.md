---
title: "Engineering Data Analysis — Full Reviewer"
type: review
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
scope: "Formulas and concepts only — every section of the EDA scope, no worked examples"
source: "Excel First Review Center decks (Oct 2026 ECE board) + vault topics MATH-09-01…14"
updated: 2026-10-16
tags: [ece, math, eda, statistics, probability, hypothesis, regression, anova, formula-sheet, review]
---

# Engineering Data Analysis — Full Reviewer

> [!info] How to use this note
> **Formulas and concept rules only — no worked examples, no numbers to chase.** Each section is
> structured as *concept → formula → trap*. Section numbering matches the vault's EDA topics
> (MATH-09-01 … MATH-09-14) so it can be read alongside them.
>
> Read a section, cover it, and state its formulas from memory. Anything you cannot state is your
> revision target — not the whole note.

---

## 0. Notation and symbols

| Symbol | Meaning |
| --- | --- |
| $n$, $N$ | sample size, population size |
| $\bar{x}$, $\mu$ | sample mean, population mean |
| $s$, $\sigma$ | sample standard deviation, population standard deviation |
| $s^2$, $\sigma^2$ | sample variance (÷ $n-1$), population variance (÷ $N$) |
| $\hat{p}$ | sample proportion = successes ÷ total |
| $\lambda$ | Poisson mean (events per interval) |
| $k$ | number of groups/treatments (ANOVA, DOE) |
| $H_0$, $H_a$ | null hypothesis, alternative hypothesis |
| $\alpha$, $\beta$ | Type I error probability, Type II error probability |
| $z$, $t$, $F$, $\chi^2$ | standard normal, Student's t, F (variance ratio), chi-square statistics |
| $r$, $r^2$ | Pearson correlation, coefficient of determination |
| $SE$ | standard error (spread of a *sampling distribution*) |
| $ME$ | margin of error (how far the interval extends) |
| $A$, $B$ | regression **intercept** $A$, regression **slope** $B$ |

> [!warning] The two pairs that get confused on every paper
> **$\sigma$ vs $s$** — $\sigma$ is the population's (given in the stem); $s$ is computed from the sample. This decides Z-test vs t-test, and which denominator the variance uses.
> **$SE$ vs $ME$** — the standard error is a property of *your data*; the margin of error is $z \times SE$ and depends on *how confident* you want to be. They are never the same number unless $z = 1$.

---

## 1. Central Tendency

**Concept.** A single value that represents "the centre" of a dataset. The mean uses every value (so it is pulled by outliers); the median uses position (so it resists them); the mode uses frequency.

**Unweighted means**

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i, \qquad \mu = \frac{1}{N}\sum_{i=1}^{N} x_i$$

**Weighted and grouped means** (with $w_i$ weights, $f_i$ class frequencies, $m_i$ class midpoints)

$$\bar{x}_w = \frac{\sum w_i x_i}{\sum w_i}, \qquad \bar{x} = \frac{\sum f_i m_i}{n}$$

**Median.** Position of the middle value in ranked data $= \dfrac{n+1}{2}$. Grouped form, with $L$ = lower class boundary, $F$ = cumulative frequency before the class, $f_m$ = class frequency, $w$ = class width:

$$\tilde{x} = L + \frac{n/2 - F}{f_m}\,w$$

**Mode.** The most frequently occurring value. Grouped form, with $d_1, d_2$ the gaps to the adjacent classes:

$$\hat{x} = L + \frac{d_1}{d_1+d_2}\,w$$

**Empirical relation** (valid for moderately skewed unimodal data)

$$\text{Mode} \approx 3\,\text{Median} - 2\,\text{Mean}$$

**Other means**

$$GM = \sqrt[n]{\prod x_i}, \qquad HM = \frac{n}{\sum 1/x_i}$$

**Measures of position** — the rank of a value rather than its size:

$$P_k = \frac{k}{100}(n+1), \qquad Q_k = \frac{k}{4}(n+1), \qquad D_k = \frac{k}{10}(n+1)$$

> [!warning] Placement rule after computing $L$
> If $L$ lands on a **whole number**, average the $L$th and $(L+1)$th terms. If $L$ is a **decimal**, **always round up** and take that term. (The deck's rule is *round up*, never round-to-nearest.)

---

## 2. Dispersion, Variance, SD, IQR and CV

**Concept.** Central tendency says *where* the data sit; dispersion says *how spread out* they are. Two datasets can share a mean and behave completely differently.

**Range and interquartile range**

$$R = \max(x) - \min(x), \qquad IQR = Q_3 - Q_1$$

**Variance and standard deviation**

$$\sigma^2 = \frac{\sum (x_i-\mu)^2}{N}, \qquad s^2 = \frac{\sum (x_i-\bar{x})^2}{n-1}, \qquad \sigma = \sqrt{\sigma^2}, \quad s = \sqrt{s^2}$$

**Coefficient of variation** — the unitless, relative measure of spread:

$$CV = \frac{s}{\bar{x}} \quad(\times 100\% \text{ if expressed as a percentage})$$

**Linear transformation rule** — shifts move the centre, scale moves the spread *squared*:

$$E(aX+b) = aE(X) + b, \qquad \text{Var}(aX+b) = a^2\,\text{Var}(X)$$

Consequences: adding a constant changes no measure of spread; multiplying multiplies the SD by $|a|$ and the variance by $a^2$; a **variance can never be negative** regardless of the sign of $a$.

**Chebyshev's inequality** — a guaranteed lower bound on the data within $k$ standard deviations, for **any** distribution shape ($k \neq 1$):

$$P\!\left(|X-\mu| < k\sigma\right) \ \ge\ 1 - \frac{1}{k^2}$$

**Empirical (68–95–99.7) rule** — the same statement for **bell-shaped** data only:

$$\mu \pm 1\sigma \approx 68\%, \qquad \mu \pm 2\sigma \approx 95\%, \qquad \mu \pm 3\sigma \approx 99.7\%$$

> [!warning] Robustness is the tested idea
> **IQR and median resist outliers.** Mean, variance, standard deviation, range and $CV$ do **not**. A stem that injects extreme values and asks which metric is unaffected is asking for the IQR (or median).

---

## 3. Permutations and Combinations

**Concept.** Counting outcomes without listing them. Two rules underpin everything:

$$N = m \times n \quad\text{(one task after another)}, \qquad N = m + n \quad\text{(either task)}$$

**Factorial.** $n! = n(n-1)\cdots 1$, and $0! = 1$.

**Permutation** — order **matters**:

$${}_nP_r = \frac{n!}{(n-r)!}$$

**Combination** — order is **irrelevant**:

$${}_nC_r = \binom{n}{r} = \frac{n!}{r!\,(n-r)!}$$

**The three special permutation forms**

| Situation | Formula |
| --- | --- |
| Repetition allowed, $r$ from $n$ | $n^r$ |
| Some objects identical ($p, q, \dots$ repeats) | $\dfrac{n!}{p!\,q!\cdots}$ |
| Circular arrangement of $n$ distinct objects | $(n-1)!$ |

**The together / not-together pair**

$$n_{\text{together}} = (n-1)!\times(\text{internal arrangements}), \qquad n_{\text{not together}} = n! - n_{\text{together}}$$

**Group selections across separate pools**

$$\text{"}a\text{ from pool 1 \textbf{and} }b\text{ from pool 2"} = {}_{n_1}C_a \times {}_{n_2}C_b, \qquad \text{"from pool 1 \textbf{or} pool 2"} = {}_{n_1}C_a + {}_{n_2}C_b$$

> [!warning] The discriminator is never the verb
> "Select", "choose", "chosen" do **not** imply combination. The test is: **do the chosen people receive distinct roles/positions/ranks?** Yes → permutation. No, they form one group → combination. (Reference check: ${}_nC_r \times r! = {}_nP_r$.)
>
> Second trap: identical objects **divide**, distinct internal orders **multiply**. Re-shuffling the copies of one letter makes no new word (divide); swapping two people inside a block makes a new lineup (multiply).

---

## 4. Probability Rules

**Concept.** A probability is a number in $[0,1]$ measuring how likely an event is, built on a **sample space** $S$ (all possible outcomes) and **events** (subsets of $S$).

$$P(E) = \frac{\text{number of favourable outcomes}}{\text{total outcomes}} \qquad\text{(valid only when outcomes are equally likely)}$$

**Kolmogorov's axioms**

$$P(A) \ge 0, \qquad P(S) = 1, \qquad P(A \cup B) = P(A) + P(B) \ \ (A, B \text{ mutually exclusive})$$

**Complement**

$$P(A^c) = 1 - P(A), \qquad P(A^c) + P(A) = 1$$

**Addition rule (union, "or")**

$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

Reduces to $P(A) + P(B)$ when $A$ and $B$ are **mutually exclusive** (their intersection is empty).

**Multiplication rule (intersection, "and")**

$$P(A \cap B) = P(A)\,P(B) \quad\text{(independent)}, \qquad P(A \cap B) = P(A)\,P(B \mid A) \quad\text{(dependent)}$$

**Conditional probability**

$$P(B \mid A) = \frac{P(A \cap B)}{P(A)}, \qquad P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$

**Total probability and Bayes' theorem** (with $\{B_i\}$ a partition of $S$)

$$P(A) = \sum_i P(A \mid B_i)\,P(B_i), \qquad P(B_j \mid A) = \frac{P(A \mid B_j)\,P(B_j)}{\sum_i P(A \mid B_i)\,P(B_i)}$$

**Mutual exclusivity vs independence** — opposites, not synonyms:

| | Mutually exclusive | Independent |
| --- | --- | --- |
| Meaning | cannot happen together | one happening does not change the other's chance |
| Statement | $P(A \cap B) = 0$ | $P(A \cap B) = P(A)\,P(B)$ |
| Consequence | union $=$ sum | union $=$ sum $-$ product |

> [!warning] The two combined questions you will be asked
> **Given $P(A \cup B)$, asked for the value making them independent**: equate the two expressions for the intersection, $P(A)P(B) = P(A) + P(B) - P(A \cup B)$.
>
> **Never carry a result between parts.** The givens are fixed; changing the *assumption* changes the unknown. (Mutually-exclusive $k$ and independent $k$ are different numbers.)
>
> **Words → symbols:** "or" = $\cup$, "and" = $\cap$, "not / at least / refuses" = complement.

---

## 5. Binomial and Geometric Distributions

**Concept.** Both count **trials** with two outcomes per trial (success/failure), a constant probability $p$, and independence.

### Binomial — number of successes in a fixed number of trials

$$P(X = r) = {}_nC_r\, p^{\,r}\, q^{\,n-r}, \qquad q = 1-p$$

$$\mu = np, \qquad \sigma^2 = np(1-p)$$

**Shortcuts:** $P(0) = q^n$, $P(1) = n\,p\,q^{\,n-1}$, $P(n) = p^n$ (since ${}_nC_0 = {}_nC_n = 1$).

### Geometric — number of trials until the first success

$$P(X = x) = q^{\,x-1}\,p, \qquad E(X) = \frac{1}{p}, \qquad \text{Var}(X) = \frac{q}{p^2}$$

### The phrase → set mapping (applies to **every** discrete distribution)

| Stem wording | Event set | Route |
| --- | --- | --- |
| exactly $r$ | $\{r\}$ | one term |
| at most $r$ / no more than $r$ | $\{0,1,\dots,r\}$ | sum from the bottom |
| fewer than $r$ | $\{0,1,\dots,r-1\}$ | sum from the bottom |
| at least $r$ / no fewer than $r$ | $\{r,\dots,n\}$ | $1 - P(\le r-1)$ |
| more than $r$ | $\{r+1,\dots,n\}$ | $1 - P(\le r)$ |

> [!warning] Boundary rule
> **The boundary value belongs to whichever side keeps it.** "At least 2" *includes* 2, so the complement is $\{0,1\}$. "More than 2" *excludes* 2, so 2 goes **into** the complement: $\{0,1,2\}$.
> Complementary phrasings must **sum to 1** — use that as a free check whenever a question has parts.

---

## 6. Poisson and Hypergeometric Distributions

### Poisson — counts of rare events over a continuous interval

$$P(X = x) = \frac{\lambda^x\,e^{-\lambda}}{x!}, \qquad \mu = \sigma^2 = \lambda$$

**Origin.** The limiting case of the binomial as $n \to \infty$ and $p \to 0$ with $\lambda = np$ fixed. The deck's working conditions: if $n \ge 20$ then $p \le 0.05$; if $n \ge 100$ then $np \le 10$.

**Trigger words.** *average of λ per minute / per square metre / per unit*, arrivals, breakdowns, defects in a continuous medium.

> [!warning] λ belongs to the question's interval, not to the rate
> Scale $\lambda$ **before** using the formula: $\lambda_{\text{question}} = (\text{rate per unit}) \times (\text{units in the question})$. A rate quoted per minute and a question about a two-minute window require $\lambda$ doubled.

### Hypergeometric — sampling WITHOUT replacement from a finite lot

$$P(X = k) = \frac{{}_KC_k \times {}_{N-K}C_{\,n-k}}{{}_NC_n}$$

| Symbol | Meaning |
| --- | --- |
| $N$ | total population (the lot) |
| $K$ | number of "successes" in the lot |
| $n$ | number drawn |
| $k$ | successes required **in the draw** |

**Trigger words.** *without replacement*, *shipment of N containing K defective*, *batch / lot with a known number of marked items*.

**Choosing between them**

| | Binomial | Hypergeometric | Poisson |
| --- | --- | --- | --- |
| Replacement | with / independent | **without** | n/a |
| Parameters | $n, p$ | $N, K, n$ | $\lambda$ |
| Population | large / undefined | finite and known | infinite or undefined |
| Mean | $np$ | — | $\lambda$ |

> [!warning] The two hypergeometric traps
> The **denominator is always ${}_NC_n$** (all ways to draw your sample), and the two numerators **multiply**. The good-item count in the second numerator is $N-K$ choosing $n-k$.

---

## 7. Uniform and Exponential Distributions

### Discrete uniform — $n$ equally likely values

$$P(X = x) = \frac{1}{n}, \qquad E(X) = \frac{a+b}{2}, \qquad \text{Var}(X) = \frac{(b-a)(b-a+2)}{12}$$

### Continuous uniform on $[a,b]$

$$f(x) = \frac{1}{b-a}, \qquad E(X) = \frac{a+b}{2}, \qquad \text{Var}(X) = \frac{(b-a)^2}{12}$$

### Exponential — waiting time between Poisson events, rate $\lambda$

$$f(x) = \lambda e^{-\lambda x}\ (x \ge 0), \qquad E(X) = \frac{1}{\lambda}, \qquad \text{Var}(X) = \frac{1}{\lambda^2}$$

$$P(X > x) = e^{-\lambda x}, \qquad P(X \le x) = 1 - e^{-\lambda x}$$

**Memorylessness** — the defining property:

$$P(X > s + t \mid X > s) = P(X > t)$$

> [!tip] Continuous distributions and single points
> For any continuous random variable, $P(X = c) = 0$: probability is **area under the curve**, so it requires an interval. Also $\int f(x)\,dx = 1$ over the support, and $P(X = c)$ cannot be read off a density value.

---

## 8. Normal Distribution and Z Scores

**Concept.** The bell-shaped continuous distribution of a mean $\mu$ and standard deviation $\sigma$; the foundation of sampling theory and every interval/test that follows.

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$$

**Standardizing (X → Z)**

$$z = \frac{x - \mu}{\sigma} \qquad\text{(}z = \text{the number of standard deviations } x \text{ lies from the mean)}$$

**Standard normal:** $f(z) = \dfrac{1}{\sqrt{2\pi}}e^{-z^2/2}$, mean 0, variance 1.

**Symmetry identities**

$$P(z) = 1 - P(-z), \qquad Q(z) = Q(-z), \qquad P(z) + R(z) = 1$$

**The three calculator areas** (F-789SGA names; $\Phi$ = standard normal CDF)

| Key | Area returned |
| --- | --- |
| `P(z)` | $-\infty \to z$ — the **left tail** |
| `Q(z)` | $0 \to z$ — the **middle chunk** from the centre, always positive |
| `R(z)` | $z \to +\infty$ — the **right tail** |

with the relations $Q(z) = P(z) - 0.5 = 0.5 - R(z)$ for $z \ge 0$.

**Interval assemblies**

| Interval | Expression |
| --- | --- |
| $P(0 < Z < a)$ | `Q(a)` |
| $P(a < Z < b)$, both **same sign** | `Q(|larger|) − Q(|smaller|)` |
| $P(a < Z < b)$, **straddling 0** | `Q(|a|) + Q(|b|)` |
| $P(Z < z)$ | `P(z)` |
| $P(Z > z)$ | `R(z)` |
| $P(Z < -a)$ | `R(a)` (by symmetry) |

**Reverse direction (Z → X)**

$$x = \mu + z\sigma$$

| Stem says | Tail | Sign of $z$ |
| --- | --- | --- |
| "…% fail **below / less than** $x$" | left | **negative** |
| "…% **exceed / above / greater than** $x$" | right | **positive** |

> [!warning] Sketch before you key
> Decide **which side of the mean** the answer must lie on *before* entering the calculator. A left-tail problem answered with a positive $z$ yields a plausible, wrong number. When a question asks for both tails at the same $|z|$, the two values must **average to $\mu$** — a free check.

---

## 9. Sampling Techniques and Sampling Distributions

### Sample size — Slovin's formula

$$n = \frac{N}{1 + Ne^2}$$

with $N$ = population size and $e$ = margin of error.

### Sampling methods

| Probability sampling | Definition |
| --- | --- |
| Simple random | every element has an equal chance of selection |
| Systematic | random only for the first item, then every $n$-th item |
| Stratified | random selection **within** predefined groups (heterogeneous groups) |
| Cluster | whole **groups** are selected at random, then all units inside are used |

| Non-probability sampling | Definition |
| --- | --- |
| Convenience | selected on accessibility/availability |
| Quota | fills specified proportions across groups |
| Purposive (judgement) | chosen consciously from the researcher's knowledge |
| Snowball (networking) | recruits refer further participants |

### Accuracy vs precision

| Term | Meaning | Killed by |
| --- | --- | --- |
| Accuracy | closeness to the **true** value | **systematic** error (a constant offset) |
| Precision | repeatability / low spread | **random** error (variance) |

A constant offset degrades **accuracy only**; variance is untouched.

### Sampling distribution of the mean

$$\mu_{\bar{x}} = \mu, \qquad \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}} \ \ (\text{the standard error})$$

### Sampling distribution of a proportion

$$\mu_{\hat{p}} = p, \qquad \sigma_{\hat{p}} = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}, \qquad \hat{p} = \frac{\text{successes}}{\text{total}}$$

**The universal standardizing form**

$$z = \frac{\bar{x} - \mu}{\sigma/\sqrt{n}}$$

> [!warning] Two recurring errors
> **The $\sqrt{n}$ disappears.** Using $\sigma$ itself as the standard error is the most common miss in the whole subject; if your standard error equals the population SD, you have not started.
> **A proportion has no $\sigma$.** Its variance comes from the data, $\hat{p}(1-\hat{p})$, not from a given deviation — that is a Bernoulli variance: outcomes are 0/1.

---

## 10. Central Limit Theorem

**Statement.** For random samples of size $n$ drawn from **any** population with mean $\mu$ and finite variance $\sigma^2$, the sampling distribution of $\bar{x}$ approaches normality as $n$ grows:

$$\bar{x} \ \dot\sim\ N\!\left(\mu,\ \frac{\sigma^2}{n}\right)$$

**Working threshold:** $n \ge 30$ is the usual "large sample" convention.

**Consequences**

- The **centre** of the sampling distribution equals the population mean, whatever the population's shape.
- The **variance shrinks as $1/n$**: quadrupling the sample size halves the standard error.
- If the **population is already normal**, the sampling distribution is normal for *any* $n$ (no threshold needed).
- If $n$ is small and the population is skewed, the sampling distribution mirrors that skew — the theorem has not kicked in yet.

> [!warning] Standard deviation vs standard error
> The **SD of the sample** describes individual observations. The **standard error** describes the *estimate* (the sample mean) and is smaller by $\sqrt{n}$. A stem asking for "the standard deviation of the sampling distribution" wants $\sigma/\sqrt{n}$.

---

## 11. Confidence Intervals

**Concept.** Because a point estimate is a single value from one sample, we report a **range** built so that a specified proportion of such ranges would contain the true parameter.

- **Point estimate** — a single value (a statistic used as the best guess).
- **Point estimator** — the *rule/statistic*; the **point estimate** is the number it produces for a given sample.
- **Interval estimate** — a range of plausible values for the parameter.

**Mean, σ known (or $n \ge 30$)**

$$CI = \bar{x} \pm z\left(\frac{\sigma}{\sqrt{n}}\right)$$

**Mean, σ unknown and $n < 30$** — use Student's $t$ with $df = n-1$:

$$CI = \bar{x} \pm t\left(\frac{s}{\sqrt{n}}\right)$$

**Proportion (large sample)**

$$CI = \hat{p} \pm z\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$

**Critical values for two-tailed intervals**

| Confidence | 80% | 90% | 95% | 98% | 99% | 99.8% | 99.9% |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $z$ | 1.28 | 1.645 | 1.96 | 2.33 | 2.58 | 3.08 | 3.27 |

**Structural facts**

- The **centre of the interval is $\bar{x}$** (or $\hat{p}$), never $\mu$ — the parameter is what you are hunting, not what you are centring on.
- $ME = z \times SE$; the **margin of error** is the standard error **scaled by the confidence level**.
- $ME \propto 1/\sqrt{n}$: to **halve** the margin of error you need **four times** the sample size (not double).
- Confidence level (two-tailed) $= 1 - \alpha$, and the critical value sits where **each** tail is $\alpha/2$: $R(z) = \alpha/2$.

> [!warning] Reading the confidence level off `R(`
> For a two-tailed interval, $1 - R(z)$ is the area **below** $+z$ — the middle **plus one tail** — not the confidence level. The confidence level is $1 - 2R(z)$. A one-tailed 99% value (all α in one tail) is **not** the two-tailed 99% value used for intervals.

> [!warning] What a CI does *not* say
> The interval is about the **procedure's** long-run coverage. Its endpoints are random; the parameter is fixed. Do not read it as "the probability that $\mu$ is in this interval".

---

## 12. Hypothesis Testing, Z, t and p Errors

**Concept.** A decision procedure: assume $H_0$, measure how surprising the sample is under that assumption, and reject $H_0$ only if the data are sufficiently unlikely.

- $H_0$ (null) — the claim to be tested; contains $=$, $\ge$, or $\le$. "No effect / no difference."
- $H_a$ (alternative) — what the researcher wants to establish; contains $\ne$, $<$, or $>$.

**Test type is set by $H_a$**

| $H_a$ | Test | Rejection region |
| --- | --- | --- |
| $\mu \ne$ value | two-tailed | $\alpha/2$ in each tail |
| $\mu >$ value | one-tailed (right) | all $\alpha$ in the right tail |
| $\mu <$ value | one-tailed (left) | all $\alpha$ in the left tail |

**Test selection**

| Condition | Test |
| --- | --- |
| $n \ge 30$ (any σ) | Z-test |
| $n < 30$, $\sigma$ **known** | Z-test |
| $n < 30$, $\sigma$ **unknown** (only $s$) | **t-test**, $df = n-1$ |
| Comparing **three or more** means | **ANOVA (F-test)** |
| Goodness of fit of a distribution | **χ²-test** |

**Test statistics**

$$z = \frac{\bar{x} - \mu}{\sigma/\sqrt{n}}, \qquad t = \frac{\bar{x} - \mu}{s/\sqrt{n}}, \qquad z_{\hat{p}} = \frac{\hat{p} - p}{\sqrt{p(1-p)/n}}$$

**p-value**

$$p = P\big(\text{data at least this extreme} \mid H_0 \text{ true}\big)$$

Reading the calculator: for a **positive** $z$, the tail is `R(z)`; for a **negative** $z$, the tail is `P(z)`.

$$\text{one-tailed: } p = P \qquad\qquad \text{two-tailed: } p = 2P$$

**Decision rules (equivalent)**

$$\text{reject } H_0 \iff p < \alpha \qquad\Longleftrightarrow\qquad \text{reject } H_0 \iff |z_{calc}| > z_{crit}$$

**The error grid** — every cell conditions on the **row** (reality)

| | Reject $H_0$ | Fail to reject $H_0$ |
| --- | --- | --- |
| **$H_0$ true** | Type I error — false positive, probability $\alpha$ | Correct decision (true negative), probability $1-\alpha$ |
| **$H_0$ false** | Correct decision (true positive), probability $1-\beta$ = **power** | Type II error — false negative, probability $\beta$ |

- $\alpha$ is chosen by the researcher (the significance level); $\beta$ is not directly controlled.
- **Power** $= 1-\beta$ — the ability to detect a real effect. It rises with larger $n$, a larger true effect, and a larger $\alpha$.

> [!warning] Four wording traps that cost marks
> 1. **"Fail to reject" ≠ "the claim is true."** Write *insufficient evidence to overturn the claim*.
> 2. **A p-value is not $P(H_0 \text{ is true})$.** It is computed *assuming* $H_0$ is true. Any choice phrased as "the probability that $H_0$ is true" is wrong.
> 3. **Never "proven."** Tests weigh evidence; they do not prove.
> 4. **Doubling is only for $H_a{:}\ \ne$.** "At least / at most / more than" are one-tailed.

---

## 13. Linear Regression and Pearson r

**Concept.** Fitting a straight line to **bivariate** data $(x, y)$ — one independent ($x$) and one dependent ($y$) variable — to describe and predict.

**Least-squares line**

$$\hat{y} = A + Bx$$

$$B = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{\sum (x_i-\bar{x})^2}, \qquad A = \bar{y} - B\bar{x}$$

**Covariance** — do the variables move together?

$$s_{xy} = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{n-1}, \qquad \sigma_{xy} = \frac{\sum (x_i-\mu_x)(y_i-\mu_y)}{N}$$

$$\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$$

**Pearson correlation coefficient**

$$r = \frac{s_{xy}}{s_x s_y}, \qquad -1 \le r \le +1$$

| $r$ | Meaning |
| --- | --- |
| $+1$ | perfect positive linear relation |
| $0$ | no **linear** relation |
| $-1$ | perfect negative linear relation |

**Coefficient of determination**

$$r^2 = \frac{\text{variation in } y \text{ explained by } x}{\text{total variation in } y}, \qquad 0 \le r^2 \le 1$$

**Linearising non-linear models** (apply the transform, then fit a straight line)

| Model | Transform | Linear form |
| --- | --- | --- |
| $y = ae^{bx}$ | $\ln y$ vs $x$ | $\ln y = \ln a + bx$ |
| $y = ax^b$ | $\ln y$ vs $\ln x$ | $\ln y = \ln a + b\ln x$ |
| $y = a + \dfrac{b}{x}$ | $y$ vs $1/x$ | $y = a + b(1/x)$ |

> [!warning] Four regression traps
> 1. **$A$ is the intercept, $B$ is the slope** — reading them in the wrong order is a designed distractor.
> 2. **$r^2$ is always positive**; the sign of the relationship comes from the **slope**, so $R^2 = 0.81$ with a negative slope gives $r = -\sqrt{0.81}$.
> 3. **Extrapolation** — predicting outside the observed range of $x$ — is unjustified even with a high $r^2$.
> 4. **Correlation does not imply causation.** A high $r$ between two variables may reflect a shared lurking cause.

---

## 14. ANOVA and Design of Experiments

### One-way ANOVA

**Concept.** Test whether **three or more** population means are equal, by comparing variance **between** groups to variance **within** groups. Testing pairs with t-tests instead would inflate the overall error rate.

$$H_0: \mu_1 = \mu_2 = \dots = \mu_k, \qquad H_a: \text{at least one mean differs}$$

$$F = \frac{MS_{Tr}}{MSE} = \frac{\text{variance between groups}}{\text{variance within groups}}$$

**The ANOVA table**

| Source | Sum of squares | df | Mean square | F |
| --- | --- | --- | --- | --- |
| Treatment (between) | $SS_{Tr} = \sum n_i(\bar{x}_i - \bar{x})^2$ | $k-1$ | $MS_{Tr} = SS_{Tr}/df_{Tr}$ | $MS_{Tr}/MSE$ |
| Error (within) | $SSE = SST - SS_{Tr}$ | $N-k$ | $MSE = SSE/df_E$ | |
| Total | $SST = \sum x_i^2 - \dfrac{(\sum x_i)^2}{N}$ | $N-1$ | | |

**Structural relations**

$$SS = MS \times df, \qquad (k-1) + (N-k) = N-1, \qquad k = df_{Tr} + 1$$

**Interpretation of the two mean squares**

- $MS_{Tr}$ — the variance **between the sample means** (large when the treatments differ).
- $MSE$ — the **pooled within-group variance** (pure noise; also used as the error estimate in post-hoc comparisons, $SE = \sqrt{MSE}$).

If $H_0$ is true both estimate the same noise and $F \approx 1$; a real effect makes $F \gg 1$.

**Assumptions.** Independent observations, normally distributed errors, and **homoscedasticity** — equal population variances across groups ($\sigma_1^2 = \sigma_2^2 = \dots$).

**After a rejection.** ANOVA says *some* mean differs, not which; that requires a **post-hoc multiple comparison** procedure (Tukey, etc.).

**Two-way ANOVA** adds the interaction term $SS_{AB}$: whether the effect of factor A depends on the level of factor B (non-additivity).

### Design of Experiments

**Concept.** Deliberately varying factors to measure their effects, while defending against confounding.

**The three principles**

| Principle | Purpose | Trigger in a stem |
| --- | --- | --- |
| **Randomization** | averages out the effects of **unknown** (lurking) factors, including time order | units assigned blindly rather than in production order |
| **Blocking** | controls a **known** nuisance factor by grouping homogeneous units | each treatment tested equally on every machine/rig |
| **Replication** | repeats the treatment on **different** units → reduces chance variation | the whole setup repeated independently |

**Replication vs repetition** — repetition is measuring the **same** unit again without resetting it (not independent information); replication repeats the **entire** setup on fresh units.

**Terminology**

| Term | Meaning |
| --- | --- |
| Factor | the variable being varied |
| Level | a value/setting of a factor |
| Response | the measured outcome |
| Block | a group of homogeneous experimental units |
| Confounding | an effect entangled with another factor |
| OFAT | one-factor-at-a-time experimentation |

**OFAT's flaw:** varying one factor at a time never tests combinations, so it **cannot detect interactions**.

**$2^k$ factorial designs**

$$\text{runs} = 2^k \qquad (k \text{ factors, each at two levels})$$

- All factors are varied **simultaneously**, so the final run is a **combination** — that is what makes interactions visible.
- **Main effect** of a factor $=$ (average response at the high level) $-$ (average response at the low level).
- Compare factors by their **sums of squares**, not by the raw contrast totals.

**Sum of squares for a factor in a $2^k$ design** (with $n$ replicates)

$$SS_{\text{factor}} = \frac{\left(\text{Sum at } +\ - \ \text{Sum at } -\right)^2}{2^k\,n}$$

**Randomized complete block design (RCBD).** Each treatment appears once in each block. Interpretation: a block F that is **large** means the blocking factor mattered (blocking was worthwhile — it removed real nuisance variability); a treatment F that is **small** means the treatments do not differ.

### Taguchi methods

**Concept.** Robust parameter design: choose control-factor settings that make a response **insensitive to noise** (uncontrollable variation).

- **Orthogonal array** — a balanced **fractional** design: it examines many factors in **far fewer runs** than a full factorial, while keeping every factor level balanced against every other. Its stated purpose is *minimise runs while balancing factor effects*.
- **P-diagram terms:** signal factor (the target/input), control factors (design variables you set), noise factors (uncontrollable), response.

**Signal-to-noise ratio objectives**

| Objective | Use when | Aim |
| --- | --- | --- |
| **Nominal-the-best** | a **specific target value** is required | hit the target, minimise scatter |
| **Smaller-the-better** | lower is always better (noise, wear, emissions) | minimise the response |
| **Larger-the-better** | higher is always better (strength, gain, efficiency) | maximise the response |

> [!warning] The S/N decision rule
> A stem that **specifies a target** (a nominal voltage, a nominal resistance) is **nominal-the-best**, even when the wording emphasises a noise factor. Smaller/larger-the-better apply only when *any* value in one direction is an improvement.

---

## Appendix A — Reference values to know cold

**Two-tailed confidence / critical values**

| Confidence | 80% | 90% | 95% | 98% | 99% | 99.8% | 99.9% |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $z$ | 1.28 | 1.645 | 1.96 | 2.33 | 2.58 | 3.08 | 3.27 |

**Common tails**

| Area | Statement |
| --- | --- |
| $R(1) = 0.1587$ | $P(-1) = 0.1587$ |
| $R(2) = 0.0228$ | $P(-2) = 0.0228$ |
| $R(1.96) = 0.025$ | $P(-1.96) = 0.025$ |
| $R(2.58) = 0.005$ | the two-tailed 99% tail |
| $P(0) = Q(0) = 0$ | $R(0) = 0.5$ |

**Shape conventions**

| Shape | Ordering |
| --- | --- |
| Positively (right) skewed | Mean > Median > Mode |
| Symmetric / normal | Mean = Median = Mode |
| Negatively (left) skewed | Mean < Median < Mode |

| Kurtosis | Excess / value |
| --- | --- |
| Leptokurtic | positive excess, $k > 3$ (sharp peak, heavy tails) |
| Mesokurtic | zero excess, $k = 3$ (normal) |
| Platykurtic | negative excess, $k < 3$ (flat) |

---

## Appendix B — Calculator routes (Canon F-789SGA)

**Counting**

| Task | Route |
| --- | --- |
| Permutation ${}_nP_r$ | `n` `SHIFT` `×` `r` |
| Combination ${}_nC_r$ | `n` `SHIFT` `÷` `r` |
| Factorial (no `x!` key needed) | ${}_nP_n = n!$ — use `n` `SHIFT` `×` `n` |

**Statistics**

| Task | Route |
| --- | --- |
| Enter one-variable data | `MODE` `3` `1`, fill the table, then `CA` |
| Mean, SD, range | `Apps` `5` `S-VAR` (`x̄`, `xσn` population, `xσn−1` sample) · `Apps` `6` `S-PTS` (min, max, `med`, `mode`, `Q1`, `Q3`, `R`) |
| Enter paired data | `MODE` `3` `2` (Lin), fill both columns, `CA` |
| Regression outputs | `Apps` `8` `Reg`: `1` = A (intercept), `2` = B (slope), `3` = r |
| **Covariance without a formula** | $s_{xy} = B \times (x\sigma_{n-1})^2$ · $\sigma_{xy} = B \times (x\sigma_n)^2$ |
| Normal areas | `MODE` `3` `1` → `CA` → `Apps` `7` `Distr`: `1` `P(` left tail ($-\infty \to z$), `2` `Q(` centre-to-$z$ ($0 \to z$), `3` `R(` right tail ($z \to +\infty$), `4` `▶t` standardise with population σ |

> [!warning] Two hard limits on this model
> **There is no inverse-normal.** `Distr` converts *z → area* only; to obtain a critical $z$ from a confidence level you must carry the reference values or search using `R(`.
> **There is no `σxy` key** in the `S-VAR` list — use the slope × variance route above.

**Setup and housekeeping**

| Task | Route |
| --- | --- |
| Modes | `MODE` `1` COMP · `2` CPLX · `3` STAT · `4` BASE · `5` EQN · `6` TABLE · `7` MATX · `8` VCTR |
| Fraction ↔ decimal | `F-D` |
| Chain expressions on one line | `ALPHA` `:` (expressions only — no assignment inside a chain) |
| Clear memory / full reset | `SHIFT` `CLR` `2` MCL · `SHIFT` `CLR` `3` All |
| Radian for trig calculus | `SHIFT` `SET-UP` `4` |

---

## Cross-references

- Formulas-only sheet: `Formula/Mathematics/09_Engineering_Data_Analysis.md`
- Topic notes: `01_Mathematics/09_Engineering_Data_Analysis/Topics/`
- Related meta: `_meta/CALCULATOR_TECHNIQUES.md`, `_meta/CONVENTIONS.md`
