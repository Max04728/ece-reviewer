---
id: MATH-09-13
title: "Linear Regression and Pearson r"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 13
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Dispersion,_Variance,_SD,_IQR_and_CV]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 13 — Linear Regression and Pearson r

> [!abstract] Scope
> Fit a least-squares line, compute Pearson's correlation coefficient, and interpret slope, r and r-squared correctly.

## Core Concept

> [!tip] Intuition
> The regression line is the straight line that minimises the total squared vertical distance to the data. Correlation measures how tightly the points hug *some* line; regression tells you which line and lets you predict.

**Least squares.** The fitted line $\hat y=a+bx$ minimises $\sum(y_i-\hat y_i)^{2}$, the sum of squared *vertical* residuals. The normal equations give the slope:
$$b=\frac{n\sum xy-\sum x\sum y}{n\sum x^{2}-(\sum x)^{2}}$$
The intercept then follows as $a=\bar y-b\bar x$. The line always passes through $(\bar x,\bar y)$ — a free check on the arithmetic.

**Slope versus correlation — the number-one confusion.** The slope $b$ carries units and tells you the predicted change in $y$ per unit of $x$. Those units are:
$$\frac{\mathrm{units\ of\ }y}{\mathrm{units\ of\ }x}$$
Pearson's $r$ is unitless, lies in $[-1,1]$, and measures the strength and direction of the *linear* association. They are related by $b=r\frac{s_y}{s_x}$, so they share a sign but not a magnitude. An answer of $r=1.9$ is immediately wrong: $|r|$ can never exceed 1.

**Computing r.** The formula is:
$$r=\frac{n\sum xy-\sum x\sum y}{\sqrt{\left[n\sum x^{2}-(\sum x)^{2}\right]\left[n\sum y^{2}-(\sum y)^{2}\right]}}$$
The sign comes entirely from the numerator; the denominator is always positive. Equivalently, $r=\frac{\mathrm{cov}(x,y)}{s_xs_y}$.

**Coefficient of determination.** $r^{2}$ is the proportion of the variation in $y$ explained by the linear relationship with $x$. If $r=0.90$ then $r^{2}=0.81$: 81% of the variability in $y$ is accounted for, and 19% is due to other factors and noise. Never report $r^{2}$ as a correlation strength — $r=0.7$ ($r^{2}=0.49$) is a much weaker statement than it sounds.

**Interpreting strength.** Rough guidelines for $|r|$: below 0.3 weak, 0.3 to 0.7 moderate, above 0.7 strong. The sign gives the direction. But $r$ measures only *linear* association: a perfect parabola can produce $r\approx0$. Always plot the data.

**Correlation is not causation, and not prediction outside the range.** A high $r$ does not prove that $x$ causes $y$ — a lurking variable may drive both. And the fitted line is only validated over the observed range of $x$; extrapolating beyond it (or to $x$ values where the relationship must change, such as a study-hours-versus-score model evaluated at 20 hours) produces meaningless predictions. Outliers are also disproportionately influential: a single point far out in $x$ can swing both $b$ and $r$.

**Residuals and assumptions.** The least-squares line is the best *linear* unbiased predictor when the residuals have constant variance, are independent, and are roughly normal. A curved residual plot means a straight line is the wrong model even if $r$ looks respectable.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Least-squares slope | $b = \frac{n\sum x_i y_i-\sum x_i\sum y_i}{n\sum x_i^{2}-(\sum x_i)^{2}}$ | Units of y per unit of x. Same sign as r. |
| Least-squares intercept | $a = \bar y-b\bar x$ | The line passes through the point (xbar, ybar). |
| Prediction | $\hat y = a+bx$ | Valid only within (or near) the observed range of x. |
| Pearson correlation | $r = \frac{n\sum xy-\sum x\sum y}{\sqrt{\left[n\sum x^{2}-(\sum x)^{2}\right]\left[n\sum y^{2}-(\sum y)^{2}\right]}}$ | -1 <= r <= 1. Unitless. |
| Correlation from covariance | $r = \frac{\mathrm{cov}(x,y)}{s_x s_y}$ | Standard deviations cancel, which is why r is unitless. |
| Slope-correlation relation | $b = r\,\frac{s_y}{s_x}$ | Explains why b can be large while r is only moderate. |
| Coefficient of determination | $r^{2} = \frac{\mathrm{explained\ variation}}{\mathrm{total\ variation}}$ | Proportion of variance in y explained by x. 0 to 1. |
| Residual | $e_i = y_i-\hat y_i$ | Vertical distance from the point to the line; least squares minimises the sum of their squares. |
| Standard error of the estimate | $s_e = \sqrt{\frac{\sum(y_i-\hat y_i)^{2}}{n-2}}$ | Degrees of freedom n-2 for a simple linear fit. |
| Strength guidelines | $\lvert r \rvert<0.3 \mathrm{\ weak},\ 0.3\mathrm{-}0.7 \mathrm{\ moderate},\ >0.7 \mathrm{\ strong}$ | Only for LINEAR association; inspect the scatter plot first. |

## Worked Problems

### P1. Fit a least-squares line to $(1,2), (2,4), (3,5), (4,8)$ and predict $y$ at $x=5$.

**Given:** n = 4 pairs

**Solution:**

1. Sums: sum x = 10, sum y = 19, sum xy = 1(2)+2(4)+3(5)+4(8) = 57, sum x^2 = 1+4+9+16 = 30, sum y^2 = 4+16+25+64 = 109
2. Slope: b = [4(57) - 10(19)]/[4(30) - 100] = (228 - 190)/(120 - 100) = 38/20 = 1.900
3. Intercept: a = ybar - b xbar = 19/4 - 1.9(10/4) = 4.75 - 4.75 = 0.000
4. Line: yhat = 1.9x (passes through the origin here)
5. Check the centroid: at x = 2.5, yhat = 4.75 = ybar — the line passes through (xbar, ybar) as required
6. Predict at x = 5: yhat = 1.9(5) = 9.50
7. Residual check: predictions are 1.9, 3.8, 5.7, 7.6 against actual 2, 4, 5, 8 — residuals +0.1, +0.2, -0.7, +0.4, which sum to 0

> [!success]- Answer
> **$\hat y = 1.9x$; prediction at $x=5$ is $9.5$.**

> [!warning] Trap
> Reporting the slope 1.9 as the correlation coefficient. $|r|\le1$ always; the slope here is 1.9 and the correlation is 0.981. The two numbers answer different questions.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` `2:Lin`, enter (1,2), (2,4), (3,5), (4,8); `Apps` → `Reg`: B = **1.9**, A = **0.000**, r = **0.9812**.
> 2. Prediction at x = 5 straight from the fitted line: `1.9×5` → **9.5**.
> 3. Centroid check is free: A = 0 with B = 1.9 puts $\bar x$ = 2.5 and $\bar y$ = 4.75 exactly on the line.
>
> B = 1.9 is the slope; r = 0.9812 is the correlation. Reporting 1.9 as r is the trap this problem sets.

### P2. For the same data, compute Pearson's $r$ and the coefficient of determination.

**Given:** sum x = 10, sum y = 19, sum xy = 57; sum x^2 = 30, sum y^2 = 109, n = 4

**Solution:**

1. Numerator: n sum xy - sum x sum y = 4(57) - 10(19) = 228 - 190 = 38
2. First bracket: n sum x^2 - (sum x)^2 = 4(30) - 100 = 20
3. Second bracket: n sum y^2 - (sum y)^2 = 4(109) - 361 = 436 - 361 = 75
4. r = 38/sqrt(20 x 75) = 38/sqrt(1500) = 38/38.7298
5. = 0.981156
6. r^2 = (0.981156)^2 = 0.9627, so about 96.3% of the variation in y is explained by the linear fit
7. Cross-check with the slope relation: b = r s_y/s_x = 0.981156(sqrt(18.75)/sqrt(5)) = 0.981156(1.9365) = 1.900

> [!success]- Answer
> **$r = 0.9812$ (very strong positive); $r^{2} = 0.9627$.**

> [!warning] Trap
> Using $(\sum x)^{2}$ where $\sum x^{2}$ belongs (or vice versa) inside the brackets. For this data $\sum x^{2}=30$ while $(\sum x)^{2}=100$ — swapping them flips the sign of the first bracket and the whole expression breaks.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. The four pairs are still in `MODE` `3` `2:Lin`, so `Apps` → `Reg` returns r = **0.981156** with no sums at all.
> 2. $r^2$ = `0.981156²` → **0.962667**, so about **96.3%** of the variation in y is explained.
> 3. Hand-route check: `38÷√(20×75)` → **0.981156**, i.e. 38/√1500.
>
> `Reg` gives r directly; the two brackets nΣx² − (Σx)² = 20 and nΣy² − (Σy)² = 75 matter only for the hand route.

### P3. A study records hours studied $x$ and exam score $y$ for five students: $(1,2), (2,3), (3,5), (4,4), (5,6)$. Find the regression line and $r$, then predict the score at 6 hours. Comment on the prediction.

**Given:** n = 5 pairs

**Solution:**

1. Sums: sum x = 15, sum y = 20, sum xy = 1(2)+2(3)+3(5)+4(4)+5(6) = 69, sum x^2 = 1+4+9+16+25 = 55, sum y^2 = 4+9+25+16+36 = 90
2. Slope: b = [5(69) - 15(20)]/[5(55) - 225] = (345 - 300)/(275 - 225) = 45/50 = 0.900
3. Intercept: a = 20/5 - 0.9(15/5) = 4 - 2.7 = 1.300
4. Line: yhat = 1.3 + 0.9x, which passes through (3, 4) = (xbar, ybar)
5. r = [5(69) - 15(20)]/sqrt[(275-225)(450-400)] = 45/sqrt(50 x 50) = 45/50 = 0.900
6. r^2 = 0.81, so 81% of the score variation is explained and 19% is not
7. Prediction at x = 6: yhat = 1.3 + 0.9(6) = 6.7, just outside the observed range of x (1 to 5)

> [!success]- Answer
> **$\hat y = 1.3+0.9x$, $r = 0.90$; predicted score at 6 hours is $6.7$ (a mild extrapolation).**

> [!warning] Trap
> Concluding that studying more *causes* higher scores, or predicting at 20 hours. A correlation of 0.90 does not establish causation, and a straight line fitted over 1-5 hours cannot be trusted far outside that range — scores are bounded by 10 and the relationship must flatten.

> [!tip]- Calculator technique (Canon F-789SGA) — STAT
> 1. `MODE` `3` `2:Lin`, enter the five pairs; `Apps` → `Reg`: B = **0.9**, A = **1.3**, r = **0.9**.
> 2. Line $\hat y$ = **1.3 + 0.9x**; at x = 6, `1.3+0.9×6` → **6.7**, a mild extrapolation past x = 1 to 5.
> 3. $r^2$ = `0.9²` → **0.81**, so 81% of the score variation is explained and 19% is not.

### P4. For each of the following, state what is wrong: (a) $r = -1.24$; (b) $r = 0.02$ and the conclusion 'no relationship exists'; (c) $r = 0.90$ so the slope is 0.90.

**Given:** three common errors

**Solution:**

1. (a) r = -1.24 is impossible: the correlation coefficient is bounded by -1 <= r <= 1. The value must be an arithmetic error or a mislabelled slope
2. (b) r = 0.02 means no LINEAR relationship. A strong curved relationship (a parabola, a sine wave) can give r near 0, so the data must be plotted before concluding independence
3. (c) The slope and the correlation are different quantities with different units. b = r s_y/s_x; here b could be 0.90 only if s_y/s_x = 1. If the units differ, the slope is not 0.90
4. General rule: r is unitless, b carries units, and r^2 is the proportion of variance explained

> [!success]- Answer
> **(a) $|r|>1$ is impossible; (b) $r\approx0$ rules out only *linear* association; (c) $r$ and the slope $b=r\frac{s_y}{s_x}$ are not interchangeable.**

> [!warning] Trap
> Treating the three as the same kind of number. Each error comes from collapsing correlation, slope and determination into one concept — the most frequently tested misconception in this topic.

### P5. A data set of eight points has $r = 0.95$. One point with an extreme $x$ value is added and $r$ drops to 0.70. Explain.

**Given:** n = 8, r = 0.95; after one leveraged point, r = 0.70

**Solution:**

1. The new point lies far from the line through the original eight points, in the x direction
2. Because the least-squares fit minimises squared vertical residuals, a point with a large x-deviation exerts strong leverage on both slope and intercept
3. The single point pulled the line toward itself, reducing the correlation for the whole set
4. r is not a resistant statistic: it is computed from sums of squares, so one extreme observation can dominate
5. Correct responses: plot the data, report the correlation with and without the point, consider whether it is a recording error or a genuine observation, and if genuine consider a robust regression
6. Note that r would move far less if the same point had an average x value but a large y residual — leverage depends on the x position, not the y distance alone

> [!success]- Answer
> **The added point has high leverage; least squares is sensitive to extreme $x$ values, so a single influential point moved $r$ from 0.95 to 0.70.**

> [!warning] Trap
> Deleting the point without justification. Removing data to improve $r$ is fabrication; the point must be investigated and the decision reported, with the analysis shown both ways.

## Traps & Exam Notes

- **Reporting the slope as $r$.** $|r|\le1$ always; a slope may be any number. If a computed 'correlation' exceeds 1, the wrong quantity has been reported.
- **Swapping $\sum x^{2}$ with $(\sum x)^{2}$.** They are different: $\sum x^{2}$ for 1,2,3,4 is 30 while $(\sum x)^{2}$ is 100. The error changes the sign of the bracket and corrupts $r$ completely.
- **Concluding causation from a high $r$.** Two variables can move together because a third variable drives both. Correlation establishes association only.
- **Extrapolating the regression line.** Predictions outside the observed range of $x$ assume the linear relationship continues indefinitely, which is rarely true and often physically impossible.
- **Claiming independence because $r\approx0$.** $r$ measures only linear association. A perfect $U$-shaped relationship has $r\approx0$; always plot.
- **Confusing $r^{2}$ with $r$.** $r=0.7$ gives $r^{2}=0.49$: only 49% of the variation explained. Quoting '70% of the variation' from $r=0.7$ overstates the fit by a wide margin.
- **Ignoring the sample size when judging significance.** An $r$ of 0.30 based on 100 pairs can be statistically significant; an $r$ of 0.80 based on 4 pairs may not be. Correlation strength and statistical significance are separate questions.

## See Also

- [[14_ANOVA_and_DOE]]
- [[02_Dispersion,_Variance,_SD,_IQR_and_CV]]
- [[12_Hypothesis_Testing,_Z,_t_and_p_Errors]]

---

[[12_Hypothesis_Testing,_Z,_t_and_p_Errors|⬅ 12]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[14_ANOVA_and_DOE|14 ➡]]
