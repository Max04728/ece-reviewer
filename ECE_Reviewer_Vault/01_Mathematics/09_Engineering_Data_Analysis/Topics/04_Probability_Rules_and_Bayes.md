---
id: MATH-09-04
title: "Probability Rules and Bayes"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Permutations_and_Combinations]]"]
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Probability Rules and Bayes

> [!abstract] Scope
> Combine event probabilities with the addition, multiplication and complement rules, condition on partial information, and invert a conditional with Bayes' theorem.

## Core Concept

> [!tip] Intuition
> Probability rules are a bookkeeping system for 'or' (add, but remove the overlap), 'and' (multiply, adjusted for dependence) and 'not' (one minus). Bayes flips a conditional around: given the evidence, how likely is the cause?

**Sample spaces and the basic axioms.** For equally likely outcomes $P(A)=\frac{n(A)}{n(S)}$. Probabilities lie in $[0,1]$, $P(S)=1$, and for mutually exclusive events the probabilities add. Most numerical work reduces to careful counting of $n(A)$ and $n(S)$ with the formulas from permutations and combinations.

**Addition rule — the 'or' rule.** $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. The subtraction is essential: adding two probabilities counts the overlap twice. For *mutually exclusive* events the intersection is empty and the rule collapses to $P(A)+P(B)$. For three events the inclusion-exclusion expansion continues, but board questions rarely go beyond two plus a complement.

**Complement rule — the 'not' rule.** The complement rule reads: $P(A')=1-P(A)$. The 'at least one' case is the workhorse:
$$P(\mathrm{at\ least\ one})=1-P(\mathrm{none})$$
This is the single most useful shortcut in the topic: 'at least one' problems are almost always faster by complement, because the direct route requires summing many disjoint cases.

**Conditional probability.** $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$ with $P(B)>0$: the sample space shrinks to $B$, and the numerator counts the part of $A$ inside $B$. Rearranged, this gives the multiplication rule $P(A\cap B)=P(B)P(A\mid B)$ — the 'and' rule for dependent events.

**Independence.** $A$ and $B$ are independent when $P(A\mid B)=P(A)$, equivalently $P(A\cap B)=P(A)P(B)$. Independence is a mathematical property, not a physical one: do not assume two events are independent because they 'seem unrelated', and never infer independence from $P(A\cap B)=0$ (that is mutual exclusivity, the opposite extreme).

**Total probability and Bayes' theorem.** If $B_1,\dots,B_k$ partition the sample space, then total probability gives:
$$P(A)=\sum P(B_i)P(A\mid B_i)$$
Bayes' theorem then inverts it:
$$P(B_j\mid A)=\frac{P(B_j)P(A\mid B_j)}{\sum_i P(B_i)P(A\mid B_i)}$$
The denominator is the total probability of the evidence. Bayes' theorem is *the* board favourite: the classic form is a two-supplier or disease-screening problem, and the answer is often surprisingly small because the base rate dominates.

**Why Bayes surprises.** When the prior $P(B_j)$ is small, even a highly sensitive test produces mostly false positives: with $1\%$ prevalence, $95\%$ sensitivity and $95\%$ specificity the posterior is only about $16\%$. The exam trap is to report the sensitivity ($95\%$) as the answer instead of the posterior.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Classical probability | $P(A) = \frac{n(A)}{n(S)}$ | Equally likely outcomes only. |
| Complement rule | $P(A') = 1 - P(A)$ | Also: P(at least one) = 1 - P(none). |
| Addition rule | $P(A\cup B) = P(A)+P(B)-P(A\cap B)$ | Drop the intersection term only if A and B are mutually exclusive. |
| Mutually exclusive events | $P(A\cap B)=0 \Rightarrow P(A\cup B)=P(A)+P(B)$ | Exclusive means they cannot occur together — it does NOT mean independent. |
| Conditional probability | $P(A\mid B) = \frac{P(A\cap B)}{P(B)}$ | Requires P(B) > 0. The sample space is restricted to B. |
| Multiplication rule | $P(A\cap B) = P(B)\,P(A\mid B) = P(A)\,P(B\mid A)$ | Use the second form when the conditional given is the other way round. |
| Independence | $P(A\cap B) = P(A)P(B) \iff P(A\mid B)=P(A)$ | Independent and mutually exclusive are different properties; exclusive events with positive probability are dependent. |
| Total probability | $P(A) = \sum_i P(B_i)\,P(A\mid B_i)$ | B_i must partition the sample space (disjoint and exhaustive). |
| Bayes' theorem | $P(B_j\mid A) = \frac{P(B_j)P(A\mid B_j)}{\sum_i P(B_i)P(A\mid B_i)}$ | Posterior = prior x likelihood / evidence. The denominator is the total probability of A. |
| Independence of complements | $A \perp B \Rightarrow A' \perp B, \ A \perp B'$ | Handy when a question asks about 'neither' or 'not the first'. |

## Worked Problems

### P1. Two cards are drawn without replacement from a standard 52-card deck. Find the probability that at least one is an ace.

**Given:** 52 cards, 4 aces; draw of 2, no replacement

**Solution:**

1. Use the complement: P(at least one ace) = 1 - P(no ace)
2. Number of 2-card hands with no ace: C(48,2) = (48 x 47)/2 = 1128
3. Total hands: C(52,2) = (52 x 51)/2 = 1326
4. P(no ace) = 1128/1326 = 0.850679
5. P(at least one ace) = 1 - 0.850679 = 0.149321
6. Check by the addition rule: P(first ace) + P(second ace) - P(both) = 4/52 + 4/52 - (4/52)(3/51) = 0.076923 + 0.076923 - 0.004525 = 0.149321

> [!success]- Answer
> **$P \approx 0.1493$ (about $14.9\%$).**

> [!warning] Trap
> Adding $4/52 + 4/52 = 0.1538$ and forgetting to subtract the double-counted case where both cards are aces. The overlap is small but the rule is exact; using $4/52+3/51$ is also wrong because the two draws are not independent.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Complement route in one line: `1−48 nCr 2÷52 nCr 2` → **0.149321**.
> 2. The counts behind it: `48 nCr 2` = **1128** ace-free hands out of `52 nCr 2` = **1326**, so P(no ace) = **0.850679**.
> 3. Addition-rule check: `4÷52+4÷52−(4÷52)×(3÷51)` → **0.149321**, matching the complement.
>
> The draws are not independent — the overlap uses (4/52)(3/51) and must be subtracted.

### P2. Two fair dice are rolled. Find the probability that the sum is 8 given that the first die shows 3.

**Given:** fair dice, faces 1-6

**Solution:**

1. Restrict the sample space to the first die = 3: outcomes (3,1), (3,2), (3,3), (3,4), (3,5), (3,6), so |B| = 6
2. Sum equal to 8 requires the second die to be 5: the single outcome (3,5)
3. P(sum = 8 | first = 3) = 1/6
4. Check with the formula: P(sum = 8 AND first = 3) = 1/36; P(first = 3) = 6/36 = 1/6
5. P = (1/36)/(6/36) = 1/6
6. Compare the unconditional P(sum = 8) = 5/36 = 0.1389 — conditioning changed the answer

> [!success]- Answer
> **$1/6 \approx 0.1667$.**

> [!warning] Trap
> Reporting the unconditional probability $5/36$. Conditioning shrinks the sample space to six outcomes; using the original 36-outcome space is the definitional error this question is designed to catch.

### P3. A system has two components in parallel redundancy. Component A fails with probability 0.02 and Component B fails with probability 0.05, independently. Find the probability that the system works, if it works when at least one component works.

**Given:** P(A fails) = 0.02; P(B fails) = 0.05; failures independent

**Solution:**

1. System works = at least one component works = not both fail
2. P(both fail) = 0.02 x 0.05 = 0.001 (independence permits direct multiplication)
3. P(system works) = 1 - 0.001 = 0.999
4. Alternatively, component reliabilities are 0.98 and 0.95, so P(at least one works) = 1 - (0.02)(0.05) = 0.999
5. A common wrong route: 1 - (0.02 + 0.05) = 0.93, which would be the answer only if the failures were mutually exclusive

> [!success]- Answer
> **$P = 0.999$ (a $0.1\%$ chance of total failure).**

> [!warning] Trap
> Adding the failure probabilities, $0.02+0.05=0.07$, giving $0.93$. The addition rule without the intersection term applies only to mutually exclusive events; two independent failures can and do occur together.

### P4. Machine A produces $60\%$ of a factory's output with a $2\%$ defect rate; Machine B produces $40\%$ with a $5\%$ defect rate. A part chosen at random is defective. What is the probability it came from Machine A?

**Given:** P(A) = 0.6, P(D|A) = 0.02; P(B) = 0.4, P(D|B) = 0.05

**Solution:**

1. Total probability of a defect: P(D) = 0.6(0.02) + 0.4(0.05)
2. = 0.012 + 0.020 = 0.032
3. Bayes: P(A|D) = P(A)P(D|A)/P(D)
4. = 0.012/0.032 = 0.375
5. Check: P(B|D) = 0.020/0.032 = 0.625, and 0.375 + 0.625 = 1 (the posteriors must sum to 1)

> [!success]- Answer
> **$P(A\mid D) = 0.375$ (the defect is more likely to have come from Machine B).**

> [!warning] Trap
> Answering $0.02/0.05$ or $0.6$, or dividing by $P(A)$ instead of $P(D)$. The posterior must be computed against the *evidence* probability $0.032$, and the two posteriors must add to 1 — that sum is the free check.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Bayes in one line, no intermediate rounding: `0.6×0.02÷(0.6×0.02+0.4×0.05)` → **0.375** for $P(A\mid D)$.
> 2. Evidence and the other branch: `0.6×0.02+0.4×0.05` → **0.032**, and `0.4×0.05÷0.032` → **0.625** for $P(B\mid D)$.
> 3. Free check: 0.375 + 0.625 = **1.000**, as two posteriors over an exhaustive partition must.
>
> Divide by the total probability of the evidence, 0.032 — never by P(A) = 0.6.

### P5. A test for a disease has $95\%$ sensitivity and $95\%$ specificity. The disease affects $1\%$ of the population. A person tests positive. What is the probability that the person actually has the disease?

**Given:** P(D) = 0.01; P(+|D) = 0.95; P(+|no D) = 0.05

**Solution:**

1. True positives: P(D and +) = 0.01 x 0.95 = 0.0095
2. False positives: P(no D and +) = 0.99 x 0.05 = 0.0495
3. Total probability of a positive: 0.0095 + 0.0495 = 0.0590
4. Bayes: P(D|+) = 0.0095/0.0590 = 0.161017
5. So about 16% of positives are true positives — the false positives outnumber them by more than 5 to 1
6. Note the answer is far from the 95% sensitivity, because the disease is rare (a small prior multiplies a large likelihood)

> [!success]- Answer
> **$P(D\mid +) \approx 0.161$ (about $16.1\%$).**

> [!warning] Trap
> Answering $95\%$ by reporting the sensitivity. Sensitivity is $P(+\mid D)$, the reverse conditional; the question asks $P(D\mid +)$, which requires Bayes and a large correction for the low base rate.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. True and false positives first: `0.01×0.95` → **0.0095** and `0.99×0.05` → **0.0495**.
> 2. Bayes in one line: `0.0095÷(0.0095+0.0495)` → **0.161017**, about **16.1%**.
> 3. Evidence total **0.0590**, so false positives outnumber true positives by 5.2 to 1.
>
> 0.95 is the likelihood P(+ given D), not the answer; the question asks the reverse conditional.

## Traps & Exam Notes

- **Adding probabilities of overlapping events.** $P(A\cup B)=P(A)+P(B)-P(A\cap B)$. Dropping the intersection term is only legal for mutually exclusive events.
- **Confusing independent with mutually exclusive.** Mutually exclusive events with positive probability are strongly *dependent* ($P(A\cap B)=0\neq P(A)P(B)$). The two concepts sit at opposite ends of the dependence scale.
- **Using Bayes' denominator as $P(B_j)$.** The denominator is the total probability of the observed evidence, $\sum P(B_i)P(A\mid B_i)$ — not the prior of the branch you are interested in.
- **Answering a posterior question with a likelihood.** 'Probability of disease given a positive test' is $P(D\mid +)$, not the sensitivity $P(+\mid D)$. The base rate makes the two very different.
- **Multiplying without adjusting for sampling without replacement.** After drawing one ball from 9 the next draw is from 8; using $5/9$ twice treats the draws as independent when they are not.
- **Forgetting to add the two orders in a 'different colours' or 'one of each' question.** Both orders are disjoint events and each contributes.
- **Computing $P(\mathrm{at\ least\ one})$ by summing cases.** The complement $1-P(\mathrm{none})$ is shorter and avoids the double-counting error that case-splitting invites.

## See Also

- [[03_Permutations_and_Combinations]]
- [[05_Binomial_and_Geometric_Distributions]]
- [[06_Poisson_and_Hypergeometric_Distributions]]

---

[[03_Permutations_and_Combinations|⬅ 03]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Binomial_and_Geometric_Distributions|05 ➡]]
