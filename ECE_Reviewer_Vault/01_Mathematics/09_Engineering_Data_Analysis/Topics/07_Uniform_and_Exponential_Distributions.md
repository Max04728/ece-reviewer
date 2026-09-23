---
id: MATH-09-07
title: "Uniform and Exponential Distributions"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[06_Poisson_and_Hypergeometric_Distributions]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Uniform and Exponential Distributions

> [!abstract] Scope
> Work with the uniform and exponential continuous distributions — density, cumulative probability, mean, variance, percentiles and the memoryless property.

## Core Concept

> [!tip] Intuition
> The uniform distribution spreads probability evenly over a fixed interval with no preferred value. The exponential is its waiting-time twin: it describes the time until a rare, memoryless event, so the chance of surviving the next minute is the same no matter how long you have already waited.

**Uniform distribution.** Over $[a,b]$ the density is the constant $f(x)=\frac{1}{b-a}$, and probability is simply length over total length:
$$P(c<X<d)=\frac{d-c}{b-a}$$
The mean is the interval midpoint $\frac{a+b}{2}$ and the variance is $\frac{(b-a)^{2}}{12}$. The $1/12$ catches people out — it is not $1/2$ or $1/4$.

**Exponential distribution.** With mean $\beta$, the density is $f(x)=\frac{1}{\beta}e^{-x/\beta}$ for $x\ge0$, or equivalently $f(x)=\lambda e^{-\lambda x}$ with rate $\lambda=\frac{1}{\beta}$. The CDF is $F(x)=1-e^{-x/\beta}$, so $P(X>x)=e^{-x/\beta}$ and the survival probability is the *only* thing you need to compute. Mean $=\beta$, variance $=\beta^{2}$, standard deviation $=\beta$ — the mean and standard deviation are equal, which is a quick identification test.

**The memoryless property.** $P(X>s+t\mid X>s)=P(X>t)=e^{-t/\beta}$. Used components are not 'due' for failure; the remaining life has the same distribution as a new component's life. This is exactly the geometric distribution translated to continuous time, and it is the reason exponential models are used for random (not wear-out) failures.

**Percentiles and the median.** Solve $F(x)=p$: $x_p=-\beta\ln(1-p)$. The median is $\beta\ln2\approx0.693\beta$, always below the mean — a signature of the right skew. The 90th percentile is $2.303\beta$, the 95th is $3.0\beta$, and the 63.2nd percentile is $\beta$ itself.

**Relation to the Poisson.** If events occur as a Poisson process with rate $\lambda$ events per unit time, the *count* in a fixed interval is Poisson$(\lambda t)$ and the *waiting time* between events is exponential with mean $1/\lambda$. The two distributions are the same process viewed two ways, and exam questions frequently mix them in one problem.

**Normalising a rate given in a different unit.** The parameter and the time unit must match. A mean lifetime of 1000 hours means $\beta=1000$ hours and $\lambda=0.001$ per hour. Asking for a probability over 30 minutes requires either converting the interval to 0.5 hours or converting $\beta$ to 30 minutes; the exponential's scale is not dimensionless.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Uniform density | $f(x) = \frac{1}{b-a}, \quad a\le x\le b$ | Zero outside the interval. Total area = 1. |
| Uniform probability | $P(c<X<d) = \frac{d-c}{b-a}$ | Length over length; no integration needed. |
| Uniform mean and variance | $\mu=\frac{a+b}{2}, \quad \sigma^{2}=\frac{(b-a)^{2}}{12}$ | Variance divisor is 12, not 2 or 4. |
| Uniform percentile | $x_p = a + p(b-a)$ | The inverse CDF is linear. |
| Exponential density | $f(x) = \frac{1}{\beta}e^{-x/\beta} = \lambda e^{-\lambda x}, \quad x\ge0$ | beta = mean, lambda = 1/beta = rate. |
| Exponential CDF | $F(x) = 1-e^{-x/\beta}$ | Probability of failure by time x. |
| Exponential survival | $P(X>x) = e^{-x/\beta} = e^{-\lambda x}$ | The complement; the most-used form. |
| Exponential mean and variance | $\mu=\beta, \quad \sigma^{2}=\beta^{2}, \quad \sigma=\beta$ | Mean equals standard deviation — the identification test. |
| Memoryless property | $P(X>s+t\mid X>s) = e^{-t/\beta}$ | Past waiting time is irrelevant. Fails for wear-out failures. |
| Exponential percentile | $x_p = -\beta\ln(1-p)$ | Median = 0.693 beta; 90th percentile = 2.303 beta. |

## Worked Problems

### P1. The voltage of a certain supply is uniformly distributed between 10 V and 20 V. Find $P(X>16)$, $P(12<X<17)$, the mean, the variance and the 35th percentile.

**Given:** a = 10, b = 20

**Solution:**

1. Density: f(x) = 1/(20-10) = 0.1 per volt
2. P(X>16) = (20-16)/10 = 4/10 = 0.40
3. P(12<X<17) = (17-12)/10 = 5/10 = 0.50
4. Mean = (10+20)/2 = 15 V
5. Variance = (20-10)^2/12 = 100/12 = 8.333; sd = 2.887 V
6. 35th percentile = 10 + 0.35(10) = 13.5 V

> [!success]- Answer
> **$P(X>16)=0.40$; $P(12<X<17)=0.50$; $\mu=15\ \mathrm{V}$, $\sigma^{2}=8.33$; $x_{35}=13.5\ \mathrm{V}$.**

> [!warning] Trap
> Computing the variance as $(b-a)^{2}/2=50$ or $(b-a)^{2}/4=25$. The uniform variance divisor is 12; the wrong divisor inflates the spread by a factor of 3 to 6 and propagates into every later confidence interval.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Length over length: `(20−16)÷10` → **0.40** and `(17−12)÷10` → **0.50**.
> 2. Mean and variance: `(10+20)÷2` → **15** V and `(20−10)²÷12` → **8.3333**, sd `√Ans` → **2.887** V.
> 3. 35th percentile, the linear inverse CDF: `10+0.35×10` → **13.5** V.
>
> The uniform variance divisor is 12 — (b−a)²/2 = 50 and (b−a)²/4 = 25 are the distractors.

### P2. The lifetime of a component is exponential with a mean of 1000 hours. Find the probability that it lasts more than 500 hours, that it fails within 1500 hours, and its median lifetime.

**Given:** beta = 1000 hours; lambda = 0.001 per hour

**Solution:**

1. P(X>500) = e^{-500/1000} = e^{-0.5} = 0.606531
2. P(X <= 1500) = 1 - e^{-1500/1000} = 1 - e^{-1.5} = 1 - 0.223130 = 0.776870
3. Median: solve 1 - e^{-x/1000} = 0.5, so e^{-x/1000} = 0.5
4. x = -1000 ln(0.5) = 1000(0.693147) = 693.15 hours
5. Variance = 1000^2 = 1,000,000, so the standard deviation is 1000 hours — equal to the mean

> [!success]- Answer
> **$P(X>500) = 0.6065$; $P(X\le1500) = 0.7769$; median $= 693$ hours.**

> [!warning] Trap
> Using $e^{-x/\beta}$ for a 'fails within' question. $P(X\le x)=1-e^{-x/\beta}$; the bare exponential is the survival probability $P(X>x)$. Reversing them gives 0.393 instead of 0.777.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `e^(−500÷1000)` → **0.606531** = P(X > 500); the bare exponential is the survival probability.
> 2. `1−e^(−1500÷1000)` → **0.776870** = P(X ≤ 1500); 'fails within' needs the complement.
> 3. Median `−1000×ln(0.5)` → **693.15** hours; variance `1000²` → **1E6**, sd **1000** = the mean.
>
> Swap the two forms and you answer 0.393 where 0.777 was wanted — read 'more than' versus 'within' first.

### P3. For the same component (mean 1000 hours), what is the probability that it fails between 500 and 1500 hours?

**Given:** beta = 1000

**Solution:**

1. P(500 < X < 1500) = P(X>500) - P(X>1500)
2. = e^{-0.5} - e^{-1.5}
3. = 0.606531 - 0.223130
4. = 0.383401
5. Check by the CDF route: F(1500) - F(500) = (1 - e^{-1.5}) - (1 - e^{-0.5}) = 0.776870 - 0.393469 = 0.383401
6. This is about a 38% chance — the exponential spreads probability widely because of its long right tail

> [!success]- Answer
> **$P(500<X<1500) = 0.3834$.**

> [!warning] Trap
> Subtracting the survival probabilities the wrong way round ($e^{-1.5}-e^{-0.5}$ is negative). Order them as larger survival time minus smaller, which mirrors $F(b)-F(a)$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Survival at each end: `e^(−0.5)` → **0.606531** and `e^(−1.5)` → **0.223130**.
> 2. One line: `e^(−0.5)−e^(−1.5)` → **0.383401** = P(500 < X < 1500).
> 3. CDF route as a check: `(1−e^(−1.5))−(1−e^(−0.5))` → the same **0.383401**.

### P4. A repair time is exponential with a mean of 8 minutes. Find $P(X<12\mid X>4)$ and the 90th percentile of the repair time.

**Given:** beta = 8 minutes

**Solution:**

1. Memoryless property: P(X < 12 | X > 4) = P(X < 8) — the first 4 minutes are forgotten
2. = 1 - e^{-8/8} = 1 - e^{-1} = 1 - 0.367879
3. = 0.632121
4. Verify directly: P(4 < X < 12)/P(X > 4) = (e^{-0.5} - e^{-1.5})/e^{-0.5} = (0.606531 - 0.223130)/0.606531 = 0.383401/0.606531 = 0.632121
5. 90th percentile: x = -8 ln(0.10) = 8(2.302585) = 18.42 minutes

> [!success]- Answer
> **$P(X<12\mid X>4) = 0.6321$; $x_{90} = 18.42$ minutes.**

> [!warning] Trap
> Computing the conditional as $P(X<12)-P(X>4)$ or as $P(X<8)$ without justification. The memoryless property is what licenses discarding the 4 minutes; the direct conditional formula is the safe route if you are unsure.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Memoryless: the 4 minutes already waited drop out, so `1−e^(−8÷8)` → **0.632121** for $P(X<12 \mid X>4)$.
> 2. Direct conditional check: `(e^(−0.5)−e^(−1.5))÷e^(−0.5)` → **0.632121**, the same number.
> 3. 90th percentile: `−8×ln(0.10)` → **18.42** minutes.

### P5. Failures in a fibre occur as a Poisson process at 0.25 per kilometre. Find the probability that the distance to the first failure exceeds 6 km, and the mean distance between failures.

**Given:** rate lambda = 0.25 per km

**Solution:**

1. The waiting distance between Poisson events is exponential with mean beta = 1/lambda = 4 km
2. P(X > 6) = e^{-0.25(6)} = e^{-1.5}
3. = 0.223130
4. Equivalently, 'no failure in 6 km' is the Poisson probability of zero events with lambda t = 0.25(6) = 1.5: P(0) = e^{-1.5} = 0.223130
5. Mean distance between failures = 1/0.25 = 4 km; variance = 4^2 = 16, sd = 4 km

> [!success]- Answer
> **$P(X>6\mathrm{\ km}) = 0.2231$; mean spacing $= 4$ km.**

> [!warning] Trap
> Using $\lambda=0.25$ as the exponential *mean* instead of the rate. The exponential parameterisation matters: with mean $\beta=4$, $P(X>6)=e^{-6/4}=e^{-1.5}$; with rate $\lambda=0.25$, $P(X>6)=e^{-0.25(6)}=e^{-1.5}$ — the same number, but writing $e^{-6(0.25)^{2}}$ or $e^{-0.25/6}$ is not.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. The waiting distance is exponential: `e^(−0.25×6)` → **0.223130** = P(X > 6 km).
> 2. Same number from the Poisson side — 'no fault in 6 km' is `e^(−1.5)` → **0.223130**.
> 3. Mean spacing `1÷0.25` → **4** km; variance **16** and sd **4** km.
>
> 0.25 is the rate, not the mean: the mean spacing is 1/0.25 = 4 km, and both routes must give e^(−1.5).

## Traps & Exam Notes

- **Using the wrong variance divisor for the uniform.** $\sigma^{2}=\frac{(b-a)^{2}}{12}$. The values $\frac{(b-a)^{2}}{2}$ and $\frac{(b-a)^{2}}{4}$ are distractors that appear in multiple-choice options.
- **Swapping the exponential CDF and survival functions.** $F(x)=1-e^{-x/\beta}$ answers 'fails by $x$'; $e^{-x/\beta}$ answers 'survives past $x$'. Reading the question for 'within' versus 'more than' is the whole skill.
- **Forgetting that the exponential parameter may be a rate.** $\beta$ is the mean, $\lambda=1/\beta$ is the rate. Mixing them up gives $e^{-\mathrm{rate}\times\mathrm{rate}}$ style errors that are large, not subtle.
- **Applying the memoryless property to wear-out failures.** For a component with increasing failure rate the remaining life *decreases* with age — the memoryless shortcut would badly overstate reliability. The property belongs to the exponential model, not to reality.
- **Confusing the median with the mean.** For the exponential the median is $0.693\beta$, well below the mean $\beta$; the mean is dragged up by the long right tail. Answering 'median = mean' loses the point.
- **Using a negative or out-of-range bound.** The exponential is defined for $x\ge0$; a question quoting a negative lifetime is testing whether you notice, and $F$ is zero there.
- **Substituting a time given in different units.** A rate per hour with an interval in minutes must be converted first. A factor of 60 in the exponent changes the answer from 0.22 to essentially 0 or 1.

## See Also

- [[06_Poisson_and_Hypergeometric_Distributions]]
- [[08_Normal_Distribution_and_Z_Scores]]
- [[11_Confidence_Intervals]]

---

[[06_Poisson_and_Hypergeometric_Distributions|⬅ 06]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Normal_Distribution_and_Z_Scores|08 ➡]]
