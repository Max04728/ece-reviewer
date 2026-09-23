---
id: MATH-09-14
title: "ANOVA and DOE"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 14
tier: 3
depth: full
problem_count: 0
prereqs: ["[[12_Hypothesis_Testing,_Z,_t_and_p_Errors]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — ANOVA and DOE

> [!abstract] Scope
> Run and interpret a one-way ANOVA, read a two-way ANOVA table for main effects and interaction, and apply the principles of experimental design.

## Core Concept

> [!tip] Intuition
> ANOVA asks whether several group means differ by comparing the variation *between* groups with the variation *within* groups. If the groups are really different, the between-group spread is large relative to the noise inside each group.

**The variance decomposition.** Total variation splits exactly into two additive parts: $SS_T=SS_A+SS_W$, where $SS_A$ (between groups) measures how far each group mean sits from the grand mean and $SS_W$ (within groups, or error) measures the scatter inside each group. Degrees of freedom split the same way: $N-1=(a-1)+(N-a)$ with $a$ groups and $N$ total observations. This additive structure is the whole method.

**The F statistic.** $F=\frac{MS_A}{MS_W}$ where $MS_A=\frac{SS_A}{a-1}$ and $MS_W=\frac{SS_W}{N-a}$. Under the null hypothesis the two mean squares estimate the same error variance, so $F$ is near 1. Large $F$ means the group means are spread further apart than random noise would explain. Reject $H_0$ when $F>F_{\alpha}(a-1,\,N-a)$. The F distribution is right-skewed and defined only for positive values.

**Computational formulas that keep the arithmetic manageable.** With $T_i$ the total of group $i$ and $G$ the grand total, $CF=\frac{G^{2}}{N}$ (correction factor), $SS_T=\sum x^{2}-CF$ and $SS_A=\sum\frac{T_i^{2}}{n_i}-CF$, then $SS_W=SS_T-SS_A$. Computing $SS_W$ by subtraction rather than by summing squared deviations group by group is faster and gives the same answer.

**The assumptions.** Independent observations; normally distributed populations (or large samples, by the CLT); and *equal variances* across groups (homogeneity of variance). Equal group sizes make the test robust to mild departures from normality. If variances differ strongly, use Welch's ANOVA; if the data are ranks or clearly non-normal, use Kruskal-Wallis.

**Two-way ANOVA without replication and with interaction.** With two factors $A$ (levels $a$) and $B$ (levels $b$) and $r$ replicates per cell, the total variation splits four ways:
$$SS_T=SS_A+SS_B+SS_{AB}+SS_E$$
with degrees of freedom $(a-1)+(b-1)+(a-1)(b-1)+ab(r-1)$. The interaction term $SS_{AB}$ captures whether the effect of one factor *depends on* the level of the other. A significant interaction means main effects alone are misleading — interpret the cell means, not the marginal means.

**Two-way ANOVA without replication ($r=1$).** With one observation per cell there are no degrees of freedom left for error, so the interaction cannot be estimated: the analysis assumes no interaction and uses the residual as error. This is the standard randomised block design, where the second factor is a blocking variable.

**Design of experiments — the three principles.** *Randomisation* (assign treatments randomly to remove systematic bias and lurking variables), *replication* (repeat each treatment to obtain an independent error estimate — without replication there is no $MS_W$ and no test), and *blocking* (group experimental units that are similar so that nuisance variation is removed from the error term). A *factorial* design varies all factors together in every combination, which is what makes interaction detectable; a *one-factor-at-a-time* study cannot detect interaction at all.

**Interpreting an ANOVA result.** Rejecting $H_0$ says *at least one* mean differs — not which ones. Post-hoc procedures (Tukey HSD for all pairwise comparisons after a one-way ANOVA) are required to locate the difference, and they control the overall error rate for the many comparisons. For a two-way design, always test the interaction first: if it is significant, the main effects need qualification.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Correction factor | $CF = \frac{G^{2}}{N}$ | G = grand total, N = total number of observations. |
| Total sum of squares | $SS_T = \sum x_i^{2}-CF$ | Degrees of freedom N-1. |
| Between-groups sum of squares | $SS_A = \sum_{i=1}^{a}\frac{T_i^{2}}{n_i}-CF$ | T_i = total of group i, n_i = its size. df = a-1. |
| Within-groups sum of squares | $SS_W = SS_T-SS_A$ | Also called the error or residual sum of squares. df = N-a. |
| Mean squares | $MS_A = \frac{SS_A}{a-1}, \quad MS_W = \frac{SS_W}{N-a}$ | Variance estimates; both estimate sigma^2 when H0 is true. |
| F statistic (one-way) | $F = \frac{MS_A}{MS_W}$ | df = (a-1, N-a). Large F -> reject equal means. |
| Two-way sums of squares | $SS_T = SS_A+SS_B+SS_{AB}+SS_E$ | df: (a-1)+(b-1)+(a-1)(b-1)+ab(r-1). |
| Two-way F statistics | $F_A=\frac{MS_A}{MS_E},\quad F_B=\frac{MS_B}{MS_E},\quad F_{AB}=\frac{MS_{AB}}{MS_E}$ | Compare each with F_alpha at its own numerator df and the error df. |
| Critical F values (5%) | $F_{0.05}(2,12)=3.89,\ F_{0.05}(3,16)=3.24,\ F_{0.05}(1,8)=5.32$ | Critical values fall as either degrees of freedom rises. |
| Randomised block design (no replication) | $SS_E = SS_T-SS_{treatments}-SS_{blocks}$ | Interaction not estimable; the block effect is removed from the error. |

## Traps & Exam Notes

- **Using the wrong degrees of freedom for $MS_A$.** Between-groups df is $a-1$, error df is $N-a$. Dividing $SS_A$ by $N-1$ is the classic error and shrinks $F$ dramatically.
- **Forgetting that ANOVA tests all means at once.** Rejecting $H_0$ says 'at least one differs'. Pairwise conclusions require a post-hoc test such as Tukey HSD, which controls the family-wise error rate.
- **Ignoring a significant interaction.** When $A\times B$ is significant, the main effects are conditional and the marginal means are misleading. Report cell means.
- **Assuming equal variances without checking.** ANOVA's F test assumes homogeneous variances. If the largest variance is more than about four times the smallest, use Welch's ANOVA or a nonparametric alternative.
- **Sequential testing without correction.** Running many t tests instead of one ANOVA inflates the Type I error rate — at 5% each, ten comparisons have about a 40% chance of at least one false positive.
- **No replication and then computing error.** With one observation per cell in a two-way design the interaction is not estimable; the residual must be used as error and the no-interaction assumption stated. In a one-way design with one observation per group there is no error term at all and no test is possible.
- **Reporting the p-value without the effect size.** A significant F says the means differ, not that the difference matters. Report group means and the pooled standard deviation $\sqrt{MS_W}$ so the reader can judge practical significance.

## See Also

- [[12_Hypothesis_Testing,_Z,_t_and_p_Errors]]
- [[13_Linear_Regression_and_Pearson_r]]
- [[02_Dispersion,_Variance,_SD,_IQR_and_CV]]

---

[[13_Linear_Regression_and_Pearson_r|⬅ 13]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
