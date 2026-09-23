---
id: MATH-09-06
title: "Poisson and Hypergeometric Distributions"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Binomial_and_Geometric_Distributions]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Poisson and Hypergeometric Distributions

> [!abstract] Scope
> Model rare-event counts with the Poisson distribution and sampling-without-replacement counts with the hypergeometric, and know when the Poisson approximates the binomial.

## Core Concept

> [!tip] Intuition
> The Poisson counts how many events land in a fixed interval when the events are independent and the rate is constant — defects per metre, calls per hour, particles per second. The hypergeometric counts successes in a sample drawn from a *finite* lot without replacement.

**The Poisson pmf and its single parameter.** For a rate $\lambda$ the pmf is:
$$P(X=k)=\frac{e^{-\lambda}\lambda^{k}}{k!}$$
It applies for $k=0,1,2,\dots$, with $\mu=\sigma^{2}=\lambda$. That mean equals variance property is the distribution's signature, and it is why over-dispersion (variance greater than the mean in observed count data) indicates the Poisson model is wrong. The parameter $\lambda$ must be scaled with the interval: 3 calls per hour is $\lambda=6$ over two hours.

**What makes a Poisson process.** Events occur independently; the rate is constant in time or space; two events cannot occur at exactly the same instant (no clumping); and the probability of an event in a short interval is proportional to its length. Under those conditions the count in any interval of length $t$ is Poisson with $\lambda=rt$, where $r$ is the rate per unit.

**Cumulative work is by complement.** There is no closed-form CDF, so the tail is computed by complement:
$$P(X\ge k)=1-\sum_{j=0}^{k-1}\frac{e^{-\lambda}\lambda^{j}}{j!}$$
For 'at least one', $P(X\ge1)=1-e^{-\lambda}$, which is the fastest form and appears constantly in reliability questions.

**Poisson as the limit of the binomial.** When $n$ is large and $p$ is small with $np=\lambda$ moderate, the binomial pmf converges to:
$$\binom{n}{k}p^{k}q^{n-k}\to\frac{e^{-\lambda}\lambda^{k}}{k!}$$
The usual rule of thumb is $n\ge20$ and $p\le0.05$ (some texts say $n\ge100$, $np\le10$). The approximation is excellent for small $k$ and is the standard exam shortcut when $\binom{n}{k}$ becomes unwieldy.

**Hypergeometric — sampling without replacement.** With $N$ items, $K$ successes (defectives), and a sample of $n$, the pmf is:
$$P(X=k)=\frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}$$
The mean is $n\frac{K}{N}$ and the variance is:
$$n\frac{K}{N}\left(1-\frac{K}{N}\right)\frac{N-n}{N-1}$$
The last factor $\frac{N-n}{N-1}$ is the *finite population correction*: it is what makes the hypergeometric variance smaller than the binomial variance with $p=K/N$.

**Choosing between them.** If the sample is drawn without replacement from a finite lot, the hypergeometric is exact — the trials are dependent. The binomial is an approximation that becomes accurate when the sample is a small fraction of the lot (the common $n\le0.05N$ rule). On the exam, phrases like 'from a box of 20, five are drawn' signal hypergeometric; 'each item is independently defective with probability 0.05' signals binomial.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Poisson pmf | $P(X=k) = \frac{e^{-\lambda}\lambda^{k}}{k!}$ | lambda = mean count in the interval. k = 0, 1, 2, ... |
| Poisson mean and variance | $\mu = \sigma^{2} = \lambda$ | Equality of mean and variance is the model's signature. |
| Rate scaling | $\lambda = r\,t$ | r = rate per unit; t = interval length. Scale before substituting. |
| Poisson 'at least one' | $P(X\ge 1) = 1-e^{-\lambda}$ | Complement of zero events. |
| Poisson cumulative (upper tail) | $P(X\ge k) = 1-\sum_{j=0}^{k-1}\frac{e^{-\lambda}\lambda^{j}}{j!}$ | No closed form; sum the terms below k. |
| Poisson approximation to binomial | $\binom{n}{k}p^{k}q^{n-k} \approx \frac{e^{-np}(np)^{k}}{k!}$ | Valid for large n and small p (say n >= 20, p <= 0.05). |
| Hypergeometric pmf | $P(X=k) = \frac{\binom{K}{k}\binom{N-K}{n-k}}{\binom{N}{n}}$ | Sampling without replacement. k ranges over max(0, n-(N-K)) to min(n, K). |
| Hypergeometric mean | $\mu = n\frac{K}{N}$ | Same as the binomial mean with p = K/N. |
| Hypergeometric variance | $\sigma^{2} = n\frac{K}{N}\left(1-\frac{K}{N}\right)\frac{N-n}{N-1}$ | Finite population correction (N-n)/(N-1) makes it smaller than the binomial variance. |
| Binomial approximation to hypergeometric | $\mathrm{use\ binomial\ with\ } p=\frac{K}{N} \mathrm{\ when\ } n \le 0.05N$ | Otherwise use the exact hypergeometric formula. |

## Worked Problems

### P1. A call centre receives an average of 3 calls per hour, Poisson distributed. Find the probability of (a) exactly 2 calls in an hour, (b) at least one call in an hour, (c) exactly 4 calls in a two-hour period.

**Given:** rate r = 3 per hour

**Solution:**

1. (a) lambda = 3: P(X=2) = e^{-3}(3^2)/2! = 0.0497871 x 9/2 = 0.0497871 x 4.5
2. = 0.224042
3. (b) P(X >= 1) = 1 - P(X=0) = 1 - e^{-3} = 1 - 0.0497871
4. = 0.950213
5. (c) Two hours means lambda = r t = 3 x 2 = 6
6. P(X=4) = e^{-6}(6^4)/4! = 0.00247875 x 1296/24 = 0.00247875 x 54
7. = 0.133853

> [!success]- Answer
> **(a) $0.2240$; (b) $0.9502$; (c) $0.1339$.**

> [!warning] Trap
> Using $\lambda=3$ for the two-hour window in part (c). The Poisson parameter scales with the interval: $\lambda=rt$. Substituting 3 gives $e^{-3}3^{4}/24=0.1680$, a 25% error.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. (a) `e^(−3)×3²÷2!` → **0.224042**; (b) `1−e^(−3)` → **0.950213**.
> 2. (c) Scale the rate with the interval first: λ = `3×2` = **6**, then `e^(−6)×6⁴÷4!` → **0.133853**.
> 3. Keeping λ = 3 for the two-hour window instead gives **0.1680** — a 25% error.
>
> λ = rt must be recomputed for every window; the pmf divides by k!, not by (n − k)!.

### P2. A fibre-optic cable has an average of 2 faults per kilometre, Poisson distributed. Find the probability that a 1 km section has at least 2 faults, and the probability that a 500 m section has none.

**Given:** r = 2 per km

**Solution:**

1. For 1 km: lambda = 2. P(X >= 2) = 1 - P(X=0) - P(X=1)
2. P(X=0) = e^{-2} = 0.135335
3. P(X=1) = e^{-2}(2)/1! = 0.270671
4. P(X >= 2) = 1 - 0.135335 - 0.270671 = 0.593994
5. For 500 m: lambda = 2(0.5) = 1; P(X=0) = e^{-1} = 0.367879
6. Mean and variance for the 1 km section are both 2

> [!success]- Answer
> **$P(X\ge2) = 0.5940$ per km; $P(X=0) = 0.3679$ per 500 m.**

> [!warning] Trap
> Halving the wrong quantity. For 500 m the rate must be halved too ($\lambda=1$), not kept at 2. Alternatively, treating 'at least 2' as $1-e^{-2}$ (which is 'at least 1') — the complement must include both the zero and one terms.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. 1 km: `1−e^(−2)−2×e^(−2)` → **0.593994** = P(X ≥ 2), both the 0 and 1 terms removed.
> 2. 500 m: λ = `2×0.5` = **1**, so `e^(−1)` → **0.367879** = P(X = 0).
> 3. For the 1 km section the mean and the variance are both λ = **2**.

### P3. A chip has a $0.5\%$ chance of being defective, independently. In a lot of 400, use the Poisson approximation to find the probability that none is defective and that at least two are defective.

**Given:** n = 400; p = 0.005; lambda = np = 2

**Solution:**

1. Poisson parameter: lambda = np = 400(0.005) = 2
2. P(X=0) = e^{-2} = 0.135335
3. P(X=1) = e^{-2}(2) = 0.270671
4. P(X >= 2) = 1 - 0.135335 - 0.270671 = 0.593994
5. Exact binomial for comparison: P(X=0) = (0.995)^400 = 0.134658, so the approximation is good to about 0.0007
6. The conditions n >= 20 and p <= 0.05 are satisfied

> [!success]- Answer
> **$P(X=0) = 0.1353$; $P(X\ge2) = 0.5940$.**

> [!warning] Trap
> Using $\lambda = np$ but then computing $P(X=0)$ as $1-\lambda$ or as $e^{-np}$ with the wrong sign. Also common: forgetting to check that $P(X\ge2)$ must subtract both the 0 and 1 terms, not just the zero term.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. λ = `400×0.005` = **2**; `e^(−2)` → **0.135335** = P(X = 0).
> 2. `1−e^(−2)−2×e^(−2)` → **0.593994** = P(X ≥ 2).
> 3. Exact binomial for comparison: `0.995^400` → **0.134658**, agreeing with the Poisson value to 0.0007.
>
> The note's cross-check quotes `0.995^400` = **0.134658**, matching this chain; the Poisson value is **0.0007** high.

### P4. A shipment of 20 components contains 4 defectives. Five are drawn at random without replacement. Find the probability that exactly 1 is defective, and compare with the binomial approximation.

**Given:** N = 20, K = 4, n = 5

**Solution:**

1. Hypergeometric: P(X=1) = C(4,1)C(16,4)/C(20,5)
2. C(4,1) = 4; C(16,4) = 1820; C(20,5) = 15504
3. P(X=1) = (4 x 1820)/15504 = 7280/15504 = 0.469556
4. Mean: nK/N = 5(4/20) = 1.0 defective
5. Variance: 5(0.2)(0.8)(20-5)/(20-1) = 0.8 x 0.789474 = 0.631579, sd = 0.7947
6. Binomial approximation with p = 0.2: C(5,1)(0.2)(0.8)^4 = 0.409600 — about 0.06 too low, because n/N = 25% exceeds the 5% guideline

> [!success]- Answer
> **$P(X=1) = 0.4696$ (hypergeometric); the binomial approximation gives $0.4096$.**

> [!warning] Trap
> Using the binomial on a 25%-of-the-lot sample. Without-replacement dependence matters at this sampling fraction; the binomial understates the probability of small defect counts and the error is large enough to matter.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Hypergeometric in one line: `4 nCr 1×16 nCr 4÷20 nCr 5` → **0.469556** = P(X = 1).
> 2. Mean `5×4÷20` → **1.0**; variance `5×0.2×0.8×15÷19` → **0.631579**, sd **0.7947**.
> 3. Binomial approximation for comparison: `5 nCr 1×0.2×0.8⁴` → **0.4096**, roughly 0.06 too low at a 25% sampling fraction.

### P5. A factory produces items with a $2\%$ defect rate. Fifty items are inspected. Use the Poisson approximation to the binomial to find the probability of exactly 1 defective and of at least 2 defectives.

**Given:** n = 50; p = 0.02; lambda = 1

**Solution:**

1. lambda = np = 50(0.02) = 1
2. P(X=1) = e^{-1}(1)/1! = 0.367879
3. P(X=0) = e^{-1} = 0.367879
4. P(X >= 2) = 1 - 0.367879 - 0.367879 = 0.264241
5. Exact binomial: P(X=0) = (0.98)^50 = 0.364170; P(X=1) = 50(0.02)(0.98)^49 = 0.371602; P(X>=2) = 1 - 0.364170 - 0.371602 = 0.264229
6. Agreement to 4 decimals — the approximation is excellent here

> [!success]- Answer
> **$P(X=1) = 0.3679$ (exact binomial $0.3716$); $P(X\ge2) = 0.2642$ (exact $0.2642$).**

> [!warning] Trap
> Using the Poisson approximation when the binomial can be evaluated directly — always back it up with the exact value when $n$ is only 50 and a calculator is available. Also: $\lambda=1$ makes $P(X=0)=P(X=1)$, which is a coincidence of this problem and not a general rule.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. λ = `50×0.02` = **1**; `e^(−1)` → **0.367879**, which is P(X = 1) here (and P(X = 0) too, since λ = 1).
> 2. `1−2×e^(−1)` → **0.264241** = P(X ≥ 2).
> 3. Exact binomial: `0.98^50` → **0.364170** and `50×0.02×0.98^49` → **0.371602**, so P(X ≥ 2) = **0.264229**, agreeing to 4 decimals.

## Traps & Exam Notes

- **Forgetting to scale $\lambda$ with the interval.** The rate is per unit time or distance; the parameter is the rate times the interval. A two-hour window with a 3-per-hour rate needs $\lambda=6$.
- **Using the binomial on a without-replacement sample.** Dependence is real whenever the sample is a sizeable fraction of the lot. The hypergeometric is exact; the binomial is an approximation valid only for small sampling fractions.
- **Omitting the finite population correction in the hypergeometric variance.** The factor $\frac{N-n}{N-1}$ is what makes the hypergeometric variance smaller than $npq$; leaving it out overstates the spread.
- **Confusing the mean and variance of the Poisson.** They are both $\lambda$. If a problem gives a variance and asks for the mean, no computation is needed — and if observed data show variance much greater than the mean, the Poisson model does not fit.
- **Applying the Poisson when the rate is not constant.** Clustering, wear-out, or rush-hour variation violates the constant-rate assumption. A variance far above the mean in the data is the diagnostic.
- **Dropping the $k!$ in the denominator or using $n!$.** The Poisson pmf divides by $k!$, not by $(n-k)!$. For $\lambda=3$ and $k=2$ the denominator is 2, so the answer is $4.5e^{-3}$, not $9e^{-3}$.
- **Adding the continuity correction in the wrong direction.** For $P(X\ge k)$ use $k-0.5$; for $P(X\le k)$ use $k+0.5$. Reversing them moves the estimate further from the exact value, not closer.

## See Also

- [[05_Binomial_and_Geometric_Distributions]]
- [[07_Uniform_and_Exponential_Distributions]]
- [[08_Normal_Distribution_and_Z_Scores]]
- [[04_Probability_Rules_and_Bayes]]

---

[[05_Binomial_and_Geometric_Distributions|⬅ 05]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Uniform_and_Exponential_Distributions|07 ➡]]
