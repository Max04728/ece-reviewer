---
id: MATH-09-01
title: "Central Tendency"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 1
tier: 2
depth: full
problem_count: 5
prereqs: []
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Central Tendency

> [!abstract] Scope
> Compute and choose among the mean, median and mode, and know which one the exam expects for symmetric, skewed and grouped data.

## Core Concept

> [!tip] Intuition
> Central tendency answers 'where is the middle of the data?'. The mean is the balance point, the median is the positional middle, and the mode is the most frequently observed value — they agree only when the distribution is symmetric.

**The three averages and what each measures.** The arithmetic mean $\bar x=\frac{1}{n}\sum x_i$ is the balance point and uses every observation. The median is the middle value of the *sorted* data (the average of the two middle values when $n$ is even) and depends only on position. The mode is the most frequent value, and a data set may have no mode or several. For a symmetric, unimodal distribution the three coincide; skew moves them apart.

**Skew pulls the mean, not the median.** In a right-skewed (positively skewed) distribution a few large values drag the mean above the median: mean > median > mode. In a left-skewed distribution the few small values pull the mean below the median: mean < median < mode. The median is *resistant* to outliers; the mean is not. That single fact decides which average a question wants when it says 'typical' for income, house prices, or failure times.

**Weighted and grouped data.** When observations carry different weights or arrive as a frequency table, the mean becomes $\bar x=\frac{\sum f_i x_i}{\sum f_i}$, where $x_i$ is the class midpoint for grouped data. The shortcut mean, with $d_i=x_i-A$ for a convenient assumed mean $A$, keeps the arithmetic small and is the form most textbooks present:
$$\bar x = A + \frac{\sum f_i d_i}{\sum f_i}$$

**Median and mode for grouped data.** For grouped data the median is found by interpolation in the median class:
$$\mathrm{median}=L+\frac{\frac{n}{2}-F}{f_m}\,c$$
where $L$ is the lower boundary of the median class, $F$ the cumulative frequency before it, $f_m$ its frequency and $c$ its width. The modal class gives the mode by $\mathrm{mode}=L+\frac{d_1}{d_1+d_2}\,c$, with $d_1$ and $d_2$ the frequency differences against the preceding and following classes.

**Which average to report.** Symmetric data with no outliers: mean (it uses all the information and is the basis of variance, regression and every later topic in this area). Skewed data or open-ended classes: median. Categorical data (favourite component, preferred supplier): mode, because the mean of labels is meaningless. Board questions usually test the *reason* for the choice as much as the arithmetic.

**Notation and the estimator subtlety.** For a sample, the mean is written $\bar x$ and for a population $\mu$. When the same data are treated as a population rather than a sample, the mean and median are unchanged — only the variance changes (divided by $n$ versus $n-1$). Do not let that distinction leak into the mean.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Sample arithmetic mean | $\bar x = \frac{1}{n}\sum_{i=1}^{n} x_i$ | Uses every value; not resistant to outliers. |
| Weighted mean | $\bar x_w = \frac{\sum w_i x_i}{\sum w_i}$ | Use for unequal credits, grades, mixture problems. |
| Grouped-data mean | $\bar x = \frac{\sum f_i x_i}{\sum f_i}$ | x_i is the class midpoint. Using class limits instead of midpoints is a standard error. |
| Assumed-mean shortcut | $\bar x = A + \frac{\sum f_i d_i}{\sum f_i}, \quad d_i = x_i - A$ | Same answer, smaller numbers. A may be any convenient midpoint. |
| Median, ungrouped | $\tilde x = x_{(\frac{n+1}{2})} \ (n \mathrm{\ odd}); \quad \tilde x = \frac{x_{(n/2)}+x_{(n/2+1)}}{2} \ (n \mathrm{\ even})$ | Data must be sorted first. Positions are 1-based. |
| Median, grouped (interpolation) | $\tilde x = L + \frac{\frac{n}{2}-F}{f_m}\,c$ | L = lower boundary of the median class, F = cumulative frequency below it, c = class width. |
| Mode, grouped | $\mathrm{mode} = L + \frac{d_1}{d_1+d_2}\,c$ | L = lower boundary of the modal class; d1, d2 = frequency differences to the neighbouring classes. |
| Empirical skew relation | $\mathrm{mean} - \mathrm{mode} \approx 3(\mathrm{mean} - \mathrm{median})$ | Approximate, for moderately skewed unimodal data. Use to recover one average from the other two. |
| Skew ordering | $\mathrm{right\ skew:\ mean} > \mathrm{median} > \mathrm{mode}; \quad \mathrm{left\ skew:\ mean} < \mathrm{median} < \mathrm{mode}$ | The quickest way to answer a conceptual question about shape. |

## Worked Problems

### P1. For the sample $12, 15, 15, 18, 20, 21, 21, 21, 25, 32$, find the mean, median and mode.

**Given:** n = 10; data already listed unsorted

**Solution:**

1. Sum: 12 + 15 + 15 + 18 + 20 + 21 + 21 + 21 + 25 + 32 = 200
2. Mean: 200/10 = 20.0
3. Sort (already sorted): the two middle values are the 5th and 6th: 20 and 21
4. Median: (20 + 21)/2 = 20.5
5. Mode: 21 occurs three times (more than any other value)
6. Note mean (20.0) < median (20.5) < mode (21): this data set is slightly left-skewed

> [!success]- Answer
> **Mean $= 20.0$, median $= 20.5$, mode $= 21$.**

> [!warning] Trap
> Taking the median as the 5th value (20) and ignoring the even-$n$ rule. With $n=10$ there is no single middle observation; skipping the average of the two central values biases the median downward.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` `1:SD`, key the ten values; `Apps` → `S-VAR`: n = **10**, $\bar x$ = **20.0** → `Apps` → `S-PTS`: Med = **20.5**, minX = 12, maxX = 32.
> 2. The mode is the one statistic SD mode does not return — read it off the entered list: 21 appears **three** times, more than any other value.
> 3. Skew check: $\bar x$ = 20.0 < Med = 20.5 < mode = 21, so the set is slightly **left**-skewed.
>
> `S-PTS` sorts for you, which is the whole point of a ten-value median; only the mode still needs the eye.

### P2. The ten measurements of the previous problem become eleven when a 95 is added. Recompute the mean and median and describe the effect.

**Given:** original data plus x = 95; n = 11

**Solution:**

1. New sum: 200 + 95 = 295
2. New mean: 295/11 = 26.818
3. Sorted data: 12, 15, 15, 18, 20, 21, 21, 21, 25, 32, 95; the 6th of 11 values is the median
4. Median: 21 (unchanged)
5. Mean moved from 20.0 to 26.8 (+34%); the median moved from 20.5 to 21.0 (+2.4%)
6. The single large value is an outlier: it is 95 against a previous maximum of 32

> [!success]- Answer
> **Mean $= 26.82$ (up 34%), median $= 21.0$ (up 2.4%) — the mean is dragged by the outlier, the median is not.**

> [!warning] Trap
> Recounting the median position as $n/2=5.5$ and averaging the 5th and 6th values out of habit. With $n=11$ odd the median is the single $(n+1)/2=6$th value, 21.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. The ten values are still entered in `MODE` `3` `1:SD` — add `95`, press `=` once, then `Apps` → `S-VAR`: n = **11**, $\bar x$ = **26.8182**.
> 2. `Apps` → `S-PTS`: Med = **21** — the 6th of the eleven sorted values, exactly what the odd-$n$ rule demands.
> 3. So the outlier moved $\bar x$ from 20.0 to 26.8 (+34%) and the median only from 20.5 to 21.0 (+2.4%).
>
> Add to the existing list rather than re-keying it: one `=` and the machine re-sorts all eleven values for the new median.

### P3. A student's grades are 88 in a 5-unit course, 76 in a 4-unit course, 92 in a 3-unit course and 70 in a 2-unit course. Find the weighted mean grade.

**Given:** units are the weights: 5, 4, 3, 2; grades: 88, 76, 92, 70

**Solution:**

1. Weighted sum: 5(88) + 4(76) + 3(92) + 2(70) = 440 + 304 + 276 + 140 = 1160
2. Total weight: 5 + 4 + 3 + 2 = 14 units
3. Weighted mean: 1160/14 = 82.857
4. Unweighted mean for comparison: (88 + 76 + 92 + 70)/4 = 326/4 = 81.5
5. The weighted mean is higher because the best grade carries the largest weight

> [!success]- Answer
> **Weighted mean grade $= 82.86$ (versus the unweighted $81.5$).**

> [!warning] Trap
> Averaging the four grades equally. The units are the weights; treating a 5-unit course the same as a 2-unit course is exactly the mistake the weighted mean exists to prevent.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line in COMP: `(5×88+4×76+3×92+2×70)÷(5+4+3+2)` → **82.8571**, the weighted mean **82.86**.
> 2. Unweighted mean for contrast: `(88+76+92+70)÷4` → **81.5** — the weights gain 1.36 grade points because the best mark carries the largest unit load.
>
> The denominator is the total units (14), not the number of courses (4); using 4 is the equal-weighting trap.

### P4. Grouped data: class $10\mathrm{--}20$ frequency 4, $20\mathrm{--}30$ frequency 8, $30\mathrm{--}40$ frequency 12, $40\mathrm{--}50$ frequency 6. Estimate the mean.

**Given:** total n = 4 + 8 + 12 + 6 = 30; class width 10

**Solution:**

1. Midpoints: 15, 25, 35, 45
2. Use the assumed mean A = 35 with d = x - 35: -20, -10, 0, 10
3. Sum f d: 4(-20) + 8(-10) + 12(0) + 6(10) = -80 - 80 + 0 + 60 = -100
4. Mean = A + (sum f d)/n = 35 + (-100/30) = 35 - 3.333
5. = 31.667
6. Direct check: sum f x = 4(15) + 8(25) + 12(35) + 6(45) = 60 + 200 + 420 + 270 = 950; 950/30 = 31.667

> [!success]- Answer
> **$\bar x \approx 31.67$.**

> [!warning] Trap
> Using the class limits (10, 20, 30, 40) instead of the class midpoints. The midpoints are 15, 25, 35, 45 because each class spans 10 units with a boundary at each end; using the lower limits gives 25.0, an error of 6.7.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Midpoints 15, 25, 35, 45 with frequencies 4, 8, 12, 6 — one line: `(4×15+8×25+12×35+6×45)÷(4+8+12+6)` → **31.6667**, so $\bar x$ = **31.67**.
> 2. Assumed-mean check with A = 35: `35+(4×(15−35)+8×(25−35)+12×0+6×10)÷30` → the same **31.6667**.
> 3. The trap route, lower limits instead of midpoints: `(4×10+8×20+12×30+6×40)÷30` → **25.0**.

### P5. For the same grouped data, estimate the median and the mode.

**Given:** frequencies 4, 8, 12, 6; n = 30, class width c = 10

**Solution:**

1. Cumulative frequencies: 4, 12, 24, 30. The median position is n/2 = 15, which falls in the 30-40 class
2. Median class 30-40: L = 30, F = 12 (cumulative below), f_m = 12, c = 10
3. Median = 30 + [(15 - 12)/12](10) = 30 + (3/12)(10) = 30 + 2.5 = 32.5
4. Modal class is 30-40 (frequency 12, the largest); d1 = 12 - 8 = 4, d2 = 12 - 6 = 6
5. Mode = 30 + [4/(4+6)](10) = 30 + 4 = 34.0
6. Check the skew ordering: mean 31.67 < median 32.5 < mode 34.0 — a left-skewed set, consistent with the long lower tail caused by the small first class

> [!success]- Answer
> **Median $= 32.5$, mode $= 34.0$ (mean $= 31.67$).**

> [!warning] Trap
> Using $n/2 = 15$ as if it were the 15th value's class without the cumulative-frequency check, or subtracting the cumulative frequency from the wrong side. $F$ is the cumulative frequency in the classes *below* the median class, which is 4 + 8 = 12 here.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Median by interpolation, one line: `30+(15−12)÷12×10` → **32.5** (L = 30, F = 12, f_m = 12, c = 10).
> 2. Mode, chained with `ALPHA` `:` — `30+(12−8)÷((12−8)+(12−6))×10` → **34.0**.
> 3. Ordering check: mean 31.67 < median 32.5 < mode 34.0, the left-skew signature.
>
> F is the cumulative frequency *below* the class (4 + 8 = 12); it equals f_m = 12 here only by coincidence of these numbers.

## Traps & Exam Notes

- **Forgetting to sort before finding the median.** The median is a positional measure; on unsorted data the middle entry is meaningless. This is the most common single error in the topic.
- **Using the wrong median position for even $n$.** For $n$ even the median is the *average* of the $n/2$ and $n/2+1$ values; for $n$ odd it is the single $(n+1)/2$ value. Do not apply one rule to the other case.
- **Class limits instead of class midpoints.** Grouped-data means require the midpoints $\frac{\mathrm{lower}+\mathrm{upper}}{2}$. Using the lower limits systematically biases the mean toward the low end.
- **Assuming mean = median = mode.** That identity holds only for a symmetric unimodal distribution. In skewed data the ordering of the three is itself the answer to many conceptual questions.
- **Calling the largest frequency the mode for grouped data.** For grouped data the mode is a position *inside* the modal class obtained by interpolation with $d_1$ and $d_2$; the class boundary alone is not the mode.
- **Averaging grades without weights.** Course units, credit hours and mixture volumes are weights. The unweighted mean of the same numbers is a different (and wrong) statistic.
- **Confusing the mean with the median when a question says 'typical'.** For skewed data (income, failure time, house price) 'typical' means the median; the mean is pulled by the tail and is the trap answer.

## See Also

- [[02_Dispersion,_Variance,_SD,_IQR_and_CV]]
- [[08_Normal_Distribution_and_Z_Scores]]
- [[09_Sampling_Techniques_and_Sampling_Distributions]]

---

⬅ *start* · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Dispersion,_Variance,_SD,_IQR_and_CV|02 ➡]]
