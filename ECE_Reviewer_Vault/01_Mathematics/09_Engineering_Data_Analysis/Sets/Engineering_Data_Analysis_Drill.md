---
title: "Engineering Data Analysis — Drill"
type: drill
area: 09_Engineering_Data_Analysis
part: 01_Mathematics
seed: 1
count: 8
pool: 82
updated: 2026-09-23
---

# Engineering Data Analysis — Practice Drill

**8 problems** drawn from a pool of 82 across 14 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 09_Engineering_Data_Analysis --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A supplier claims a mean strength of $3.0\ \mathrm{MPa}$. In 25 tests the mean is $3.4\ \mathrm{MPa}$ with $s=1.2\ \mathrm{MPa}$. Test at $\alpha=0.05$ with a one-sided alternative that the mean is greater, and comment on the margin of the decision.

**Given:** mu0 = 3.0; xbar = 3.4; s = 1.2; n = 25; alpha = 0.05 one-tailed

> [!success]- Answer
> **$t = 1.667$, $\nu = 24$, one-tailed $p\approx0.054$; fail to reject at $\alpha=0.05$ but close to the boundary.**

> [!warning] Trap
> Comparing $t=1.667$ with the two-tailed critical value 2.064. The alternative $\mu>3.0$ is one-sided, so the critical value is 1.711 — the whole 5% sits in the upper tail, and using the two-tailed value makes a correctly specified test look insignificant.

<sub>from MATH-09-12</sub>

### 2. A population has $\sigma=20$. Compare the sampling distribution of $\bar X$ for $n=16$ and $n=64$ by computing $P(|\bar X-500|<10)$ for each.

**Given:** mu = 500; sigma = 20; n = 16 and n = 64

> [!success]- Answer
> **$n=16$: $0.9545$; $n=64$: $0.9999$.**

> [!warning] Trap
> Assuming that quadrupling $n$ multiplies the probability by four, or that the standard error falls in proportion to $n$. The standard error falls as $\sqrt n$, so quadrupling $n$ only halves it — and the probability gain is a table-lookup consequence, not a linear one.

<sub>from MATH-09-10</sub>

### 3. Two normal populations: $A \sim N(50, 5^2)$ and $B \sim N(60, 10^2)$. Compare the probability that a randomly chosen item exceeds 70 in each case.

**Given:** two populations; same threshold, different spreads

> [!success]- Answer
> **A: $\approx 3.2\times10^{-5}$; B: $\approx 0.159$ — B exceeds the threshold far more often despite the higher mean.**

> [!warning] Trap
> Concluding that the population with the larger mean always exceeds a threshold more often by a fixed margin. The spread dominates in the tails: a 4-sigma excursion is vanishingly rare, while a 1-sigma one is common.

<sub>from MATH-09-08</sub>

### 4. A test for a disease has $95\%$ sensitivity and $95\%$ specificity. The disease affects $1\%$ of the population. A person tests positive. What is the probability that the person actually has the disease?

**Given:** P(D) = 0.01; P(+|D) = 0.95; P(+|no D) = 0.05

> [!success]- Answer
> **$P(D\mid +) \approx 0.161$ (about $16.1\%$).**

> [!warning] Trap
> Answering $95\%$ by reporting the sensitivity. Sensitivity is $P(+\mid D)$, the reverse conditional; the question asks $P(D\mid +)$, which requires Bayes and a large correction for the low base rate.

<sub>from MATH-09-04</sub>

### 5. Three processes are compared with five runs each. The data are Process 1: $10, 12, 11, 13, 14$; Process 2: $15, 17, 16, 18, 19$; Process 3: $22, 24, 21, 25, 28$. Test at $\alpha=0.05$ whether the process means differ.

**Given:** a = 3 groups, n = 5 each, N = 15; group totals 60, 85, 120; grand total G = 265

> [!success]- Answer
> **$F = 43.60$ with df $(2,12)$, $p\approx3.1\times10^{-6}$; reject $H_0$ — the process means differ.**

> [!warning] Trap
> Dividing $SS_A$ by $N-1=14$ instead of $a-1=2$. The between-groups mean square uses the number of *groups* minus one; using the wrong degrees of freedom gives $F=13.0$ instead of 43.6 and changes the p-value by orders of magnitude.

<sub>from MATH-09-14</sub>

### 6. A process produces shafts with diameters normal, $\mu = 25.00$ mm and $\sigma = 0.04$ mm. Specifications are $25.00 \pm 0.10$ mm. What fraction of shafts meet specification, and what fraction must be scrapped?

**Given:** mu = 25.00 mm; sigma = 0.04 mm; limits 24.90 to 25.10 mm

> [!success]- Answer
> **About $98.76\%$ conform; about $1.24\%$ are scrapped.**

> [!warning] Trap
> Reporting only one tail. The specification is two-sided, so both tails must be counted — here the scrap splits into 0.62% oversized and 0.62% undersized.

<sub>from MATH-09-08</sub>

### 7. A call centre receives an average of 3 calls per hour, Poisson distributed. Find the probability of (a) exactly 2 calls in an hour, (b) at least one call in an hour, (c) exactly 4 calls in a two-hour period.

**Given:** rate r = 3 per hour

> [!success]- Answer
> **(a) $0.2240$; (b) $0.9502$; (c) $0.1339$.**

> [!warning] Trap
> Using $\lambda=3$ for the two-hour window in part (c). The Poisson parameter scales with the interval: $\lambda=rt$. Substituting 3 gives $e^{-3}3^{4}/24=0.1680$, a 25% error.

<sub>from MATH-09-06</sub>

### 8. A data packet is transmitted through 6 independent links, each with a $90\%$ success probability. Find the probability that at most 4 links succeed.

**Given:** n = 6; p = 0.9

> [!success]- Answer
> **$P(X\le4) = 0.1143$ (about $11.4\%$).**

> [!warning] Trap
> Applying the complement to the wrong tail: computing $1-P(X\le4)$ when the question says 'at most 4'. 'At most 4' is itself the lower tail — here it is easier to use the complement 'fewer than 5' means the upper tail is 5 or 6.

<sub>from MATH-09-05</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| MATH-09-01 | Central Tendency | 5 |
| MATH-09-02 | Dispersion, Variance, SD, IQR and CV | 5 |
| MATH-09-03 | Permutations and Combinations | 6 |
| MATH-09-04 | Probability Rules and Bayes | 6 |
| MATH-09-05 | Binomial and Geometric Distributions | 6 |
| MATH-09-06 | Poisson and Hypergeometric Distributions | 6 |
| MATH-09-07 | Uniform and Exponential Distributions | 5 |
| MATH-09-08 | Normal Distribution and Z Scores | 10 |
| MATH-09-09 | Sampling Techniques and Sampling Distributions | 6 |
| MATH-09-10 | Central Limit Theorem | 5 |
| MATH-09-11 | Confidence Intervals | 6 |
| MATH-09-12 | Hypothesis Testing, Z, t and p Errors | 6 |
| MATH-09-13 | Linear Regression and Pearson r | 5 |
| MATH-09-14 | ANOVA and DOE | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
