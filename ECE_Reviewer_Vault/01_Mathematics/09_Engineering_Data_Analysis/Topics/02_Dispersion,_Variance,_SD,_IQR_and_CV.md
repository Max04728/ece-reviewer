---
id: MATH-09-02
title: "Dispersion, Variance, SD, IQR and CV"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Central_Tendency]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Dispersion, Variance, SD, IQR and CV

> [!abstract] Scope
> Measure spread with range, variance, standard deviation, quartiles, IQR and coefficient of variation, and choose the right one for the data at hand.

## Core Concept

> [!tip] Intuition
> Two instruments can have the same average reading and very different reliability. Dispersion is the second number that makes a mean meaningful — it says how far a typical observation sits from the centre.

**Range, variance and standard deviation.** The range is $\max-\min$, trivially easy and entirely determined by two observations. The variance averages the squared deviations from the mean:
$$s^{2}=\frac{\sum(x_i-\bar x)^{2}}{n-1}$$
for a sample, $\sigma^{2}=\frac{\sum(x_i-\mu)^{2}}{N}$ for a population. The standard deviation is its square root and carries the same units as the data, which is why it, not the variance, is quoted alongside a mean.

**Why $n-1$.** Dividing by $n-1$ (Bessel's correction) makes $s^{2}$ an unbiased estimator of $\sigma^{2}$: the sample mean $\bar x$ sits closer to the data than the unknown $\mu$ does, so the raw sum of squares is systematically too small. The exam usually says *sample* or *population* explicitly; with a sample of measurements, use $n-1$. Note that $s$ itself is still slightly biased — negligible at board-exam precision.

**The computational shortcut.** This form avoids passing through the mean and is much faster by hand and on a calculator:
$$s^{2}=\frac{\sum x_i^{2}-\frac{(\sum x_i)^{2}}{n}}{n-1}$$
It is also numerically dangerous for large values with small spread (catastrophic cancellation) — keep several guard digits.

**Quartiles, IQR and the five-number summary.** The first and third quartiles cut off the lowest and highest 25%. With the median they give the five-number summary $(\min,Q_1,\tilde x,Q_3,\max)$, which is the entire content of a box plot. The interquartile range $\mathrm{IQR}=Q_3-Q_1$ contains the middle 50% and is *resistant* to outliers, unlike the range or the standard deviation.

**Outlier fences.** By the 1.5-IQR rule, an observation is a potential outlier if it lies below $Q_1-1.5\,\mathrm{IQR}$ or above $Q_3+1.5\,\mathrm{IQR}$. This is the rule behind box-plot whiskers and it is a standard exam item because it forces you to compute the quartiles in the correct order.

**Coefficient of variation compares relative spread.** $CV=\frac{s}{\bar x}\times100\%$ is unitless, so it can compare a measurement in grams with one in volts, or decide which of two instruments is more precise. It is only meaningful for ratio-scale data with a positive mean: for temperatures in $^\circ\mathrm{C}$ (an interval scale) the CV is meaningless because the zero is arbitrary.

**What changes and what does not.** Adding a constant $c$ to every observation shifts the mean by $c$ and leaves $s$, the range and the IQR unchanged. Multiplying every observation by $k$ multiplies the mean, $s$, the range and the IQR by $k$, and the variance by $k^{2}$; the CV is unchanged by either operation. These rules answer whole exam questions in one line.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Sample variance | $s^{2} = \frac{\sum (x_i-\bar x)^{2}}{n-1}$ | Unbiased estimator. Use n-1 for a sample. |
| Population variance | $\sigma^{2} = \frac{\sum (x_i-\mu)^{2}}{N}$ | Use only when the data are the entire population. |
| Computational form | $s^{2} = \frac{\sum x_i^{2} - \frac{(\sum x_i)^{2}}{n}}{n-1}$ | Faster by hand. Keep guard digits to avoid cancellation. |
| Sample standard deviation | $s = \sqrt{s^{2}}$ | Same units as the data; the number to report with the mean. |
| Range | $R = x_{\max}-x_{\min}$ | Uses only two observations; extremely sensitive to outliers. |
| Interquartile range | $\mathrm{IQR} = Q_3-Q_1$ | Middle 50%. Resistant to outliers. |
| Outlier fences (1.5-IQR rule) | $\mathrm{lower} = Q_1-1.5\,\mathrm{IQR}, \quad \mathrm{upper} = Q_3+1.5\,\mathrm{IQR}$ | Values outside the fences are flagged as potential outliers. |
| Coefficient of variation | $CV = \frac{s}{\bar x}\times100\%$ | Unitless. Only meaningful for ratio data with a positive mean. |
| Coefficient of quartile deviation | $\mathrm{CQD} = \frac{Q_3-Q_1}{Q_3+Q_1}$ | A resistant relative measure; sometimes asked instead of the CV. |
| Shift and scale rules | $x \to x+c: \bar x \to \bar x + c,\ s \mathrm{\ unchanged}; \quad x \to kx: \bar x \to k\bar x,\ s \to ks,\ s^{2} \to k^{2}s^{2}$ | CV is unchanged by either transformation. |

## Worked Problems

### P1. For the sample $12, 15, 18, 20, 24, 30, 45$, compute the range, the sample variance, the sample standard deviation, the quartiles, the IQR and the CV.

**Given:** n = 7; sorted data

**Solution:**

1. Sum = 164, so the mean = 164/7 = 23.4286
2. Deviations squared: (12-23.4286)^2 = 130.61; (15-23.4286)^2 = 71.04; (18-23.4286)^2 = 29.47; (20-23.4286)^2 = 11.76; (24-23.4286)^2 = 0.33; (30-23.4286)^2 = 43.18; (45-23.4286)^2 = 465.33
3. Sum of squares = 130.61 + 71.04 + 29.47 + 11.76 + 0.33 + 43.18 + 465.33 = 751.72
4. Sample variance: s^2 = 751.72/6 = 125.29
5. Sample standard deviation: s = sqrt(125.29) = 11.193
6. Range: 45 - 12 = 33
7. Median = 20 (4th of 7). Lower half {12, 15, 18}: Q1 = 15. Upper half {24, 30, 45}: Q3 = 30
8. IQR = 30 - 15 = 15
9. CV = (11.193/23.4286) x 100% = 47.8%

> [!success]- Answer
> **$R = 33$, $s^{2} = 125.29$, $s = 11.19$, $Q_1 = 15$, $Q_3 = 30$, $\mathrm{IQR} = 15$, $CV = 47.8\%$.**

> [!warning] Trap
> Splitting the halves with the median *included* on both sides. With $n=7$ the median (20) is excluded, so each half has 3 values; including it gives halves of 4 and Q1 = 16.5, Q3 = 27 — a different IQR from the same data.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` `1:SD`, enter the seven values; `Apps` → `S-VAR`: n = **7**, $\bar x$ = **23.4286**, xσn-1 = **11.1931**, so $s^2$ = **125.29**.
> 2. `Apps` → `S-PTS`: Q1 = **15**, Q3 = **30**, minX = 12, maxX = 45 → $R$ = 45 − 12 = **33** and IQR = 30 − 15 = **15**.
> 3. CV = `11.1931÷23.4286×100` → **47.78%**.
>
> xσn-1 is the sample s (n − 1); xσn = 10.3628 gives s² = 107.39, the population answer the question did not ask for. `S-PTS` excludes the median from both halves, as the note's trap requires.

### P2. Two instruments measure a $100\ \Omega$ standard. Method A: $100.2, 98.5, 101.3, 99.4, 100.6$. Method B: $25.1, 24.2, 26.3, 24.7, 24.8$ on a $25\ \Omega$ standard. Which method is relatively more precise?

**Given:** Method A mean = 100.0; Method B mean = 25.02

**Solution:**

1. Method A: deviations -0.2, +1.5, -1.3, +0.6, -0.6; squares 0.04 + 2.25 + 1.69 + 0.36 + 0.36 = 4.70
2. s_A^2 = 4.70/4 = 1.175; s_A = 1.084 ohm; CV_A = (1.084/100.0) x 100% = 1.08%
3. Method B: deviations 0.08, -0.82, 1.28, -0.32, -0.22; squares 0.0064 + 0.6724 + 1.6384 + 0.1024 + 0.0484 = 2.4680
4. s_B^2 = 2.4680/4 = 0.617; s_B = 0.785 ohm; CV_B = (0.785/25.02) x 100% = 3.14%
5. Method A has the larger absolute standard deviation (1.084 vs 0.785) but the smaller relative spread
6. Relative precision is judged by the CV, not by s alone

> [!success]- Answer
> **Method A (CV $1.08\%$) is relatively more precise than Method B (CV $3.14\%$), despite the larger absolute $s$.**

> [!warning] Trap
> Choosing Method B because $s_B < s_A$. Comparing standard deviations across different magnitudes is what the CV exists to prevent — 0.785 ohm on 25 ohm is a much bigger relative error than 1.084 ohm on 100 ohm.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. Method A: `MODE` `3` `1:SD`, enter 100.2, 98.5, 101.3, 99.4, 100.6 → `S-VAR`: $\bar x$ = **100.0**, xσn-1 = **1.0840** → CV = `Ans÷100×100` = **1.08%**.
> 2. Method B: re-enter 25.1, 24.2, 26.3, 24.7, 24.8 → $\bar x$ = **25.02**, xσn-1 = **0.7855** → CV = **3.14%**.
> 3. B has the smaller s (0.785 vs 1.084) yet three times the relative spread, so A is the relatively more precise method.
>
> Divide each s by its own mean before comparing — the two s values alone name the wrong winner.

### P3. For the sample $68, 72, 75, 79, 83, 88$, find the mean, sample standard deviation, and the new mean and standard deviation if 5 is added to every observation.

**Given:** n = 6

**Solution:**

1. Sum = 465; mean = 465/6 = 77.5
2. Deviations: -9.5, -5.5, -2.5, 1.5, 5.5, 10.5; squares 90.25 + 30.25 + 6.25 + 2.25 + 30.25 + 110.25 = 269.50
3. s^2 = 269.50/5 = 53.90; s = sqrt(53.90) = 7.342
4. Add 5: new data 73, 77, 80, 84, 88, 93; new sum = 495, new mean = 82.5 = 77.5 + 5
5. Deviations from the new mean are identical (-9.5, -5.5, ...), so the sum of squares is unchanged
6. New s = 7.342 — unchanged, as the shift rule requires

> [!success]- Answer
> **Original: $\bar x = 77.5$, $s = 7.34$. After adding 5: $\bar x = 82.5$, $s = 7.34$.**

> [!warning] Trap
> Adding 5 to the standard deviation as well as the mean. A shift changes the location only; $s$, the range and the IQR are all invariant under a translation.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` `1:SD`, enter the six values; `Apps` → `S-VAR`: $\bar x$ = **77.5**, xσn-1 = **7.3417**.
> 2. Apply the shift rule instead of re-keying: $\bar x$ → 77.5 + 5 = **82.5** while xσn-1 stays **7.3417**.
> 3. Confirm on the machine by entering 73, 77, 80, 84, 88, 93 into a fresh SD set: $\bar x$ = **82.5**, xσn-1 still **7.3417**.

### P4. Using the 1.5-IQR rule, test whether any value in $45, 47, 50, 52, 55, 58, 60, 62, 65, 68, 70, 95$ is an outlier.

**Given:** n = 12; sorted data

**Solution:**

1. Median position: the average of the 6th and 7th values = (58 + 60)/2 = 59
2. Lower half {45, 47, 50, 52, 55, 58}: Q1 = (50 + 52)/2 = 51
3. Upper half {60, 62, 65, 68, 70, 95}: Q3 = (65 + 68)/2 = 66.5
4. IQR = 66.5 - 51 = 15.5
5. Upper fence: 66.5 + 1.5(15.5) = 66.5 + 23.25 = 89.75
6. Lower fence: 51 - 1.5(15.5) = 51 - 23.25 = 27.75
7. 95 > 89.75, so 95 is a potential outlier (and the minimum 45 is above the lower fence, so no low outlier)

> [!success]- Answer
> **$Q_1 = 51$, $Q_3 = 66.5$, $\mathrm{IQR} = 15.5$, fences $[27.75,\ 89.75]$; the value $95$ is flagged as an outlier.**

> [!warning] Trap
> Using $Q_3+1.5(Q_3-Q_1)$ but computing the quartiles by including the median in both halves. That gives $Q_1=50$, $Q_3=68$ and a fence of 95 — landing exactly on the data value and making the outlier test ambiguous. Exclude the median for even $n$ halves.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` `1:SD`, enter all twelve values; `Apps` → `S-PTS`: Q1 = **51**, Q3 = **66.5**, minX = 45, maxX = 95 → IQR = **15.5**.
> 2. Fences chained with `ALPHA` `:` — `51−1.5×15.5` → **27.75** and `66.5+1.5×15.5` → **89.75**.
> 3. Only 95 lies outside [27.75, 89.75], so **95 is the outlier**; the minimum 45 sits inside the lower fence.
>
> The machine sorts twelve values for you and excludes the median from both halves, which is why Q1 = 51 and not 50.

### P5. A batch has a mean of $500\ \mathrm{g}$ and a standard deviation of $10\ \mathrm{g}$. A second batch has a mean of $50\ \mathrm{g}$ with the same standard deviation. Which batch has more variability, and what happens to the CV if every mass in the first batch is doubled?

**Given:** batch 1: mean 500, s = 10; batch 2: mean 50, s = 10

**Solution:**

1. CV1 = (10/500) x 100% = 2.0%
2. CV2 = (10/50) x 100% = 20.0%
3. Batch 2 is far more variable in relative terms despite the identical absolute standard deviation
4. Doubling batch 1: new mean = 1000, new s = 2(10) = 20, new s^2 = 4(100) = 400
5. New CV = (20/1000) x 100% = 2.0% — unchanged
6. The CV is scale invariant, which is exactly why it is the right statistic for comparing the two batches

> [!success]- Answer
> **Batch 2 (CV $20\%$ versus $2\%$). Doubling every value leaves the CV at $2\%$ while $s$ doubles and $s^{2}$ quadruples.**

> [!warning] Trap
> Reporting that multiplication leaves the variance unchanged, or that it multiplies both $s$ and $s^{2}$ by the same factor. The rules are $s\to ks$ but $s^{2}\to k^{2}s^{2}$; mixing them up is the standard exam slip in this topic.

## Traps & Exam Notes

- **Using $n$ instead of $n-1$ for a sample.** The sample variance divides by $n-1$; the population variance divides by $N$. On the same data the two answers differ by a factor of $n/(n-1)$, which is 12.5% for $n=8$ — large enough to change a multiple-choice answer.
- **Subtracting a constant from every observation and expecting $s$ to change.** Shifts move the mean only. Only multiplication (or any rescaling) changes $s$, the range and the IQR.
- **Squaring then taking the square root of the variance in the wrong order, or forgetting the square root.** A reported standard deviation of 125.29 where $s^{2}=125.29$ is a factor-of-11 error that is easy to award zero for.
- **Quartile convention inconsistency.** With $n$ even, exclude the median when splitting into halves; with $n$ odd, exclude the middle value. Including it on both sides is a different (also published) convention — but it must be used consistently, and the standard exam convention excludes it.
- **Using the CV on interval-scale data.** Temperatures in $^\circ\mathrm{C}$ or $^\circ\mathrm{F}$ have an arbitrary zero, so a ratio of standard deviation to mean is meaningless. Convert to kelvin first if a relative measure is genuinely required.
- **Calling every large value an outlier.** Outliers are defined by a *rule* (the 1.5-IQR fences, or a $z$-score threshold). A value inside the fences is not an outlier no matter how unusual it looks.
- **Rounding the mean before computing deviations.** Using a rounded $\bar x$ in $\sum(x_i-\bar x)^{2}$ biases the variance. Carry full precision through the deviations and round only the final answer.

## See Also

- [[01_Central_Tendency]]
- [[08_Normal_Distribution_and_Z_Scores]]
- [[09_Sampling_Techniques_and_Sampling_Distributions]]
- [[11_Confidence_Intervals]]

---

[[01_Central_Tendency|⬅ 01]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Permutations_and_Combinations|03 ➡]]
