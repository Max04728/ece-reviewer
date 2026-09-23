---
id: MATH-09-05
title: "Binomial and Geometric Distributions"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Probability_Rules_and_Bayes]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Binomial and Geometric Distributions

> [!abstract] Scope
> Compute binomial and geometric probabilities, and use the mean, variance and memoryless property to shortcut exam questions.

## Core Concept

> [!tip] Intuition
> Binomial counts successes in a fixed number of independent trials. Geometric waits for the first success. One fixes the number of trials and counts successes; the other fixes the number of successes (one) and counts trials.

**The binomial setting — four conditions.** A fixed number $n$ of trials; each trial has two outcomes (success/failure); the success probability $p$ is the same every trial; trials are independent. Then $P(X=k)=\binom{n}{k}p^{k}(1-p)^{n-k}$. If any condition fails — sampling without replacement from a small population, or a changing $p$ — the binomial does not apply (use the hypergeometric instead).

**Mean, variance and shape.** $\mu=np$, $\sigma^{2}=np(1-p)=npq$, $\sigma=\sqrt{npq}$. For small $p$ the distribution is right-skewed; as $np$ grows it becomes symmetric and approximates the normal — the normal approximation to the binomial is valid roughly when $np\ge5$ and $n(1-p)\ge5$.

**Cumulative probabilities by complement.** The upper tail follows from the complement:
$$P(X\ge k)=1-P(X\le k-1)$$
The lower tail sums the pmf directly:
$$P(X\le k)=\sum_{j=0}^{k}\binom{n}{j}p^{j}q^{n-j}$$
'At least one' is the fastest case: $P(X\ge1)=1-q^{n}$ — a result worth recognising instantly because it appears constantly in reliability and quality questions.

**The geometric distribution counts trials to the first success.** $P(X=k)=q^{k-1}p$ for $k=1,2,\dots$, with $\mu=\frac{1}{p}$ and $\sigma^{2}=\frac{q}{p^{2}}$. The cumulative form telescopes: $P(X\le k)=1-q^{k}$, so $P(X>k)=q^{k}$. (Some texts count the number of *failures before* the first success; the mean then changes to $\frac{q}{p}$. Read what the variable is defined as.)

**The memoryless property.** $P(X>m+n\mid X>m)=P(X>n)=q^{n}$. Given that nothing has happened yet, past waiting is irrelevant — the process starts over. This is unique to the geometric (and exponential) distribution and is the conceptual heart of many exam questions.

**Recognising which distribution is being described.** 'In a sample of $n$, how many are defective?' → binomial. 'How many items must be inspected until the first defective is found?' → geometric. 'How many trials until the $r$-th success?' → negative binomial, $\binom{k-1}{r-1}p^{r}q^{k-r}$. The phrase decides the formula.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Binomial pmf | $P(X=k) = \binom{n}{k}p^{k}(1-p)^{n-k}$ | Fixed n, constant p, independent trials. k = 0..n. |
| Binomial mean | $\mu = np$ | Expected number of successes. |
| Binomial variance | $\sigma^{2} = np(1-p) = npq$ | Standard deviation is sqrt(npq). |
| Binomial 'at least one' | $P(X\ge 1) = 1-(1-p)^{n}$ | The complement of zero successes. Memorise. |
| Binomial cumulative | $P(X\le k) = \sum_{j=0}^{k}\binom{n}{j}p^{j}q^{n-j}$ | Sum the individual terms; there is no closed form. |
| Geometric pmf | $P(X=k) = (1-p)^{k-1}p$ | k = 1, 2, ... counts trials up to and including the first success. |
| Geometric cumulative | $P(X\le k) = 1-(1-p)^{k}; \quad P(X>k)=(1-p)^{k}$ | Follows from the telescoping sum of the pmf. |
| Geometric mean and variance | $\mu=\frac{1}{p}, \quad \sigma^{2}=\frac{1-p}{p^{2}}$ | Mean number of trials to the first success. |
| Memoryless property | $P(X>m+n\mid X>m) = (1-p)^{n}$ | Past failures carry no information about future ones. |
| Negative binomial (r-th success) | $P(X=k) = \binom{k-1}{r-1}p^{r}(1-p)^{k-r}$ | Trials needed to obtain r successes. Geometric is the case r = 1. |

## Worked Problems

### P1. A relay has a $10\%$ chance of failing to operate on any given actuation, independently. In 10 actuations, find the probability of exactly 2 failures and the mean and standard deviation of the number of failures.

**Given:** n = 10; p = P(failure) = 0.1

**Solution:**

1. P(X=2) = C(10,2)(0.1)^2(0.9)^8
2. C(10,2) = 45; (0.1)^2 = 0.01; (0.9)^8 = 0.43046721
3. P(X=2) = 45 x 0.01 x 0.43046721 = 0.193710
4. Mean: mu = np = 10(0.1) = 1.0 failure
5. Variance: npq = 10(0.1)(0.9) = 0.9; standard deviation = sqrt(0.9) = 0.9487
6. Complement check: P(X >= 1) = 1 - (0.9)^10 = 1 - 0.348678 = 0.651322

> [!success]- Answer
> **$P(X=2) = 0.1937$; $\mu = 1.0$, $\sigma = 0.949$.**

> [!warning] Trap
> Using $\binom{n}{k}p^{k}$ and dropping the $q^{n-k}$ factor, which gives 0.45 instead of 0.1937. Both the success and failure exponents are required.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10 nCr 2×0.1²×0.9⁸` → **0.193710** = P(X = 2); both exponents, 2 and 8, must be there.
> 2. Mean and spread: `10×0.1` → **1.0** failure and `√(10×0.1×0.9)` → **0.9487**.
> 3. Complement check: `1−0.9^10` → **0.651322** = P(X ≥ 1).
>
> The coefficient alone is 45, and dropping the 0.9⁸ leaves 0.45 — the trap answer this problem plants.

### P2. A production line produces $5\%$ defective items. In a sample of 20, find the probability that at least 2 are defective.

**Given:** n = 20; p = 0.05

**Solution:**

1. P(X >= 2) = 1 - P(X=0) - P(X=1)
2. P(X=0) = (0.95)^20 = 0.358486
3. P(X=1) = C(20,1)(0.05)(0.95)^19 = 20(0.05)(0.377354) = 0.377354
4. P(X >= 2) = 1 - 0.358486 - 0.377354 = 0.264160
5. Mean = 20(0.05) = 1 defective; sd = sqrt(20 x 0.05 x 0.95) = sqrt(0.95) = 0.9747

> [!success]- Answer
> **$P(X\ge2) = 0.2642$; expected defectives $= 1.0$, $\sigma = 0.975$.**

> [!warning] Trap
> Subtracting only $P(X=0)$ and answering 0.6415. 'At least 2' excludes both zero and one; the complement is the union of those two cases.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1−0.95^20−20 nCr 1×0.05×0.95^19` → **0.264160** = P(X ≥ 2) on one line.
> 2. The two removed terms: P(0) = `0.95^20` = **0.358486** and P(1) = **0.377354**.
> 3. Mean and sd of the sample count: `20×0.05` → **1.0** and `√(20×0.05×0.95)` → **0.9747**.
>
> 'At least 2' removes both the zero and the one term; subtracting P(0) alone answers 0.6415.

### P3. A data packet is transmitted through 6 independent links, each with a $90\%$ success probability. Find the probability that at most 4 links succeed.

**Given:** n = 6; p = 0.9

**Solution:**

1. Use the complement: P(X <= 4) = 1 - P(X=5) - P(X=6)
2. P(X=6) = (0.9)^6 = 0.531441
3. P(X=5) = C(6,5)(0.9)^5(0.1) = 6(0.59049)(0.1) = 0.354294
4. P(X <= 4) = 1 - 0.354294 - 0.531441 = 0.114265
5. Direct check by summing k = 0 to 4: 0.000001 + 0.000054 + 0.001215 + 0.014580 + 0.098415 = 0.114265

> [!success]- Answer
> **$P(X\le4) = 0.1143$ (about $11.4\%$).**

> [!warning] Trap
> Applying the complement to the wrong tail: computing $1-P(X\le4)$ when the question says 'at most 4'. 'At most 4' is itself the lower tail — here it is easier to use the complement 'fewer than 5' means the upper tail is 5 or 6.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Complement the upper tail, two terms instead of five: `1−6 nCr 5×0.9^5×0.1−0.9^6` → **0.114265** = P(X ≤ 4).
> 2. The upper terms: P(5) = `6 nCr 5×0.9^5×0.1` → **0.354294** and P(6) = `0.9^6` → **0.531441**.
> 3. Summing the lower tail k = 0 to 4 instead returns the same **0.114265**, so the complement is the shorter route.
>
> 'At most 4' is the lower tail; complement P(5) + P(6), never P(X ≤ 4) itself.

### P4. A test has a $98\%$ chance of passing on any independent attempt. Five units are tested. If at least one test passes, what is the probability that exactly two passed?

**Given:** n = 5; p = 0.98; condition: X >= 1

**Solution:**

1. P(X=2) = C(5,2)(0.98)^2(0.02)^3 = 10(0.9604)(0.000008) = 0.000076832
2. P(X >= 1) = 1 - (0.02)^5 = 1 - 0.0000000032 = 0.9999999968
3. P(X=2 | X>=1) = 0.000076832/0.9999999968 = 0.000076832
4. Since P(X=0) is about 3.2e-9, conditioning on X>=1 changes the answer only in the ninth decimal
5. Interpretation: the conditional probability is numerically the same as the unconditional one here, but the conditional formula is still the correct route

> [!success]- Answer
> **$P(X=2\mid X\ge1) \approx 7.68\times10^{-5}$ (essentially the same as the unconditional value).**

> [!warning] Trap
> Dividing by $P(X\ge1)$ when the condition is 'at least one *passed*' but the question counts *failures*. Fix the definition of success first: with $p=0.98$ for a pass, 'exactly two passed' is $k=2$ on the pass scale, and the failure exponent is $5-2=3$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5 nCr 2×0.98²×0.02³` → **7.6832×10⁻⁵** = P(X = 2) on the pass scale.
> 2. Condition: `1−0.02^5` → **0.9999999968**, so the quotient differs only in the ninth decimal.
> 3. The conditional probability is therefore numerically **7.6832×10⁻⁵**, the same as the unconditional one here.
>
> Fix which outcome is 'success' first: with p = 0.98 a pass, k = 2 passes leaves 5 − 2 = 3 failures.

### P5. A component has a $5\%$ probability of failing each stress cycle, independently. Find (a) the probability that the first failure occurs on the third cycle, (b) the probability that it occurs within the first three cycles, and (c) the mean number of cycles to the first failure.

**Given:** p = 0.05; geometric distribution on the number of cycles

**Solution:**

1. (a) P(X=3) = (1-p)^2 p = (0.95)^2(0.05) = 0.9025 x 0.05 = 0.045125
2. (b) P(X <= 3) = 1 - (0.95)^3 = 1 - 0.857375 = 0.142625
3. (c) Mean = 1/p = 1/0.05 = 20 cycles
4. Variance = (1-p)/p^2 = 0.95/0.0025 = 380, so sd = 19.49 cycles
5. Check (a) against the cumulative: P(X=1) = 0.05, P(X=2) = 0.0475, P(X=3) = 0.045125; sum = 0.142625, matching (b)

> [!success]- Answer
> **(a) $0.0451$; (b) $0.1426$; (c) $20$ cycles on average.**

> [!warning] Trap
> Using $q^{k}p$ with $k=3$, which gives $0.95^{3}(0.05)=0.0429$. The geometric pmf has exactly $k-1$ failures *before* the success on trial $k$, so the exponent is $k-1=2$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. (a) `0.95²×0.05` → **0.045125**; the exponent is k − 1 = 2, which is the whole trap.
> 2. (b) `1−0.95³` → **0.142625** = P(X ≤ 3); (c) `1÷0.05` → **20** cycles and `√(0.95÷0.05²)` → **19.49** cycles sd.
> 3. Term check: `0.05+0.95×0.05+0.95²×0.05` → **0.142625**, matching (b).
>
> The geometric pmf is q^(k-1)p for the trial count; using k = 3 gives 0.0429.

## Traps & Exam Notes

- **Dropping the $q^{n-k}$ factor in the binomial pmf.** $\binom{n}{k}p^{k}$ alone is only the probability of one specific ordered sequence; the binomial coefficient counts the orderings and the $q$ power accounts for the failures.
- **Using the binomial when sampling is without replacement from a small lot.** The trials are then dependent and the hypergeometric distribution applies. The binomial is acceptable only when the lot is large (roughly $n\le0.05N$).
- **Complementing the wrong tail.** 'At least $k$' uses $1-P(X\le k-1)$; 'at most $k$' is the lower tail itself. Writing $1-P(X\le k)$ for 'at most $k$' answers the wrong question.
- **Off-by-one in the geometric exponent.** The pmf is $q^{k-1}p$ for the number of *trials*; if the variable counts *failures before* the first success the pmf is $q^{k}p$ and the mean is $q/p$. Confirm the definition before substituting.
- **Computing $\mu=np$ as the probability of exactly $np$ successes.** The mean is an expectation over the whole distribution and need not be an attainable value (with $n=10$, $p=0.1$ the mean is exactly 1, but that is a coincidence of the numbers).
- **Ignoring the independence requirement.** A changing success probability (wear-out, learning, finite population) breaks both the pmf and the variance formula $npq$.
- **Reporting the variance where the standard deviation is asked (or vice versa).** The binomial variance is $npq$; the standard deviation is $\sqrt{npq}$. Answers that differ by a square root are a common distractor pair in multiple choice.

## See Also

- [[04_Probability_Rules_and_Bayes]]
- [[06_Poisson_and_Hypergeometric_Distributions]]
- [[08_Normal_Distribution_and_Z_Scores]]
- [[03_Permutations_and_Combinations]]

---

[[04_Probability_Rules_and_Bayes|⬅ 04]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Poisson_and_Hypergeometric_Distributions|06 ➡]]
