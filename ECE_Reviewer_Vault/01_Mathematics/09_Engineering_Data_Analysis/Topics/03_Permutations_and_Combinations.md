---
id: MATH-09-03
title: "Permutations and Combinations"
part: "01_Mathematics"
area: "09_Engineering_Data_Analysis"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: []
tags: ["ece", "mathematics", "engineering_data_analysis"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Permutations and Combinations

> [!abstract] Scope
> Count arrangements and selections with the multiplication principle, permutations, combinations and the repetition formulas.

## Core Concept

> [!tip] Intuition
> Permutations count ordered line-ups; combinations count unordered groups. Every counting question reduces to two decisions: does order matter, and may items repeat?

**The multiplication (fundamental counting) principle.** If a task has $n_1$ outcomes for the first stage, $n_2$ for the second, and so on, the total number of ways is $n_1n_2\cdots n_k$. This is the base rule; every permutation and combination formula is a shortcut for a product of this kind. With repetition allowed and $r$ independent choices from $n$ options the count is simply $n^{r}$ (PIN codes, binary strings, licence plates).

**Permutations: order matters.** For $r$ distinct items chosen from $n$ distinct items, the number of arrangements is:
$${}_nP_r=\frac{n!}{(n-r)!}=n(n-1)\cdots(n-r+1)$$
Setting $r=n$ gives $n!$, the number of orderings of the whole set. The numerator counts all $n!$ orderings; dividing by $(n-r)!$ removes the orderings of the items *not* chosen.

**Combinations: order does not matter.** The number of unordered selections is:
$${}_nC_r=\binom{n}{r}=\frac{n!}{r!(n-r)!}=\frac{{}_nP_r}{r!}$$
The extra $r!$ in the denominator divides out the orderings *within* the chosen group. Two properties earn marks:
$$\binom{n}{r}=\binom{n}{n-r}$$
(choosing is the same as leaving out) and $\binom{n}{0}=\binom{n}{n}=1$.

**Circular and repeated-item arrangements.** Arrangements around a circle are counted as $(n-1)!$ because rotations are identified — fix one person and arrange the rest. If a set contains repeated items (the letters of MISSISSIPPI), divide by the factorials of the repeat counts:
$$\frac{n!}{n_1!\,n_2!\cdots}$$
Both are common board variants of the plain permutation formula.

**Choosing with at least / at most.** 'At least one' is almost always fastest as $1-P(\mathrm{none})$. Problems that split a selection into classes (choose 3 from group A and 2 from group B) multiply the separate combinations. 'At least one from each class' is the complement of the two all-from-one-class cases added together.

**Independence of the method and the answer.** Counting is a means to a probability. When all outcomes are equally likely, the probability of an event is the fraction:
$$\frac{\mathrm{number\ of\ favourable\ outcomes}}{\mathrm{total\ outcomes}}$$
Most exam items pair a combination count in the numerator with one in the denominator. Keep the same convention (ordered or unordered) in both.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Multiplication principle | $N = n_1 n_2 \cdots n_k$ | Sequential independent stages. |
| With repetition allowed | $N = n^{r}$ | r independent choices from n options (PINs, bit strings). |
| Permutation (order matters) | ${}_nP_r = \frac{n!}{(n-r)!}$ | r distinct items chosen from n, arranged. r <= n. |
| Permutation of all n | ${}_nP_n = n!$ | Arrangements of a whole set. 0! = 1. |
| Combination (order ignored) | ${}_nC_r = \binom{n}{r} = \frac{n!}{r!(n-r)!}$ | Groups of r from n. Symmetric: C(n,r) = C(n,n-r). |
| Relationship | ${}_nC_r = \frac{{}_nP_r}{r!}$ | Why the combination is smaller by a factor of r!. |
| Circular arrangement | $N = (n-1)!$ | Rotations identified. Fix one item, arrange the rest. |
| Arrangements with repeats | $N = \frac{n!}{n_1!\,n_2!\cdots n_k!}$ | Distinct permutations of a multiset (MISSISSIPPI, repeated digits). |
| Complement for 'at least one' | $P(\mathrm{at\ least\ one}) = 1 - P(\mathrm{none})$ | Almost always faster than summing the cases. |
| Class split | $N = \binom{a}{r_1}\binom{b}{r_2}$ | Choose r1 from one class and r2 from another, independently. |

## Worked Problems

### P1. How many ways can a president, vice-president and secretary be chosen from 8 members of an organization?

**Given:** 8 candidates; 3 distinct offices

**Solution:**

1. The offices are distinct, so order matters: this is a permutation
2. 8P3 = 8!/(8-3)! = 8!/5! = 8 x 7 x 6
3. = 336
4. Check by the multiplication principle: 8 choices for president, 7 remaining for VP, 6 remaining for secretary
5. 8 x 7 x 6 = 336

> [!success]- Answer
> **$336$ ways.**

> [!warning] Trap
> Using $\binom{8}{3}=56$ because 'choosing people' sounds like a combination. The offices are different, so a change of office is a different outcome and the count is a permutation.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `8 nPr 3` → **336** ways.
> 2. Multiplication-principle check: `8×7×6` → the same **336**, confirming the offices are ordered.
> 3. The distractor: `8 nCr 3` = **56**, which is what 'choosing people' wrongly suggests.

### P2. How many ways can a committee of 3 be selected from 10 people? How many if one particular person must be on the committee?

**Given:** 10 people, committee of 3

**Solution:**

1. No restriction: order does not matter, so C(10,3)
2. C(10,3) = 10!/(3!7!) = (10 x 9 x 8)/(3 x 2 x 1) = 720/6 = 120
3. With one particular person required: that seat is fixed, so choose the other 2 from the remaining 9
4. C(9,2) = 9!/(2!7!) = (9 x 8)/2 = 36
5. Check with the complement: C(10,3) - C(9,3) = 120 - 84 = 36 (committees that exclude the person are C(9,3))

> [!success]- Answer
> **$120$ committees without restriction; $36$ with the specified person included.**

> [!warning] Trap
> Computing $\binom{9}{3}$ for the restricted case. Fixing one member leaves only 2 seats to fill from the remaining 9 people, so it is $\binom{9}{2}$, not $\binom{9}{3}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10 nCr 3` → **120** committees with no restriction.
> 2. Restricted case: the named person takes one seat, leaving two to fill — `9 nCr 2` → **36**.
> 3. Complement check: `9 nCr 3` = **84** committees exclude that person, and 120 − 84 = **36**.
>
> Fixing the required member leaves r − 1 = 2 seats from the remaining 9; `9 nCr 3` = 84 is the trap.

### P3. A 4-digit PIN is formed from the digits 0-9 with no repetition allowed and the first digit may not be zero. How many PINs are possible?

**Given:** digits 0-9, no repetition; first digit not zero

**Solution:**

1. First digit: 9 choices (1 through 9)
2. Second digit: 9 choices (the 9 remaining digits, now including 0)
3. Third digit: 8 choices; fourth digit: 7 choices
4. Multiplication principle: 9 x 9 x 8 x 7
5. = 4536
6. Compare with unrestricted 10P4 = 5040; the difference 504 is exactly the 9P3 = 504 PINs that would begin with 0

> [!success]- Answer
> **$4536$ PINs.**

> [!warning] Trap
> Computing $9\times8\times7\times6$ by treating the first digit as merely removing one digit from the pool. Zero is unavailable for the first position but *returns* for the second; the correct factors are 9, 9, 8, 7.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. First digit, then the rest, on one line: `9×9×8×7` → **4536** PINs.
> 2. Unrestricted count `10 nPr 4` = **5040**; the leading-zero PINs are `9 nPr 3` = **504**.
> 3. 5040 − 504 = **4536**, so both routes agree.
>
> Zero is barred only from position 1 and returns to the pool for positions 2-4, so the second factor is 9, not 8.

### P4. How many distinct arrangements are there of the letters of the word STATISTICS?

**Given:** 10 letters: S x3, T x3, A x1, I x2, C x1

**Solution:**

1. Total letters: 10
2. Repeated letters: S appears 3 times, T 3 times, I 2 times, and A and C once each
3. Number of distinct arrangements = 10!/(3! 3! 2!)
4. 10! = 3628800; 3! = 6, 3! = 6, 2! = 2; denominator = 6 x 6 x 2 = 72
5. 3628800/72 = 50400
6. Check the factorials of the counts sum to the total: 3 + 3 + 1 + 2 + 1 = 10

> [!success]- Answer
> **$50{,}400$ distinct arrangements.**

> [!warning] Trap
> Using $10!$ and ignoring the repeats, or dividing by $3!3!2!1!1!$ but omitting one of the repeated letters. Every letter whose count exceeds 1 contributes its own factorial to the denominator; A and C contribute $1!=1$ and change nothing.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line: `10!÷(3!×3!×2!)` → **50400** distinct arrangements.
> 2. Pieces: `10!` = **3628800** and the divisor `3!×3!×2!` = **72**.
> 3. Ignoring the repeats would give **3628800**, 72 times too many.
>
> Only letters with count above 1 contribute a factorial to the denominator — 3! for S, 3! for T, 2! for I.

### P5. From 6 men and 4 women, how many committees of 5 can be formed containing exactly 3 men and 2 women? How many contain at least one woman?

**Given:** 6 men, 4 women; committee size 5

**Solution:**

1. Exactly 3 men: C(6,3) = 20; exactly 2 women: C(4,2) = 6
2. Class-split multiplication: 20 x 6 = 120 committees
3. At least one woman: use the complement — committees with no women are all-male, C(6,5) = 6
4. Total committees: C(10,5) = 252
5. At least one woman = 252 - 6 = 246
6. Check by summing cases: C(4,1)C(6,4) + C(4,2)C(6,3) + C(4,3)C(6,2) + C(4,4)C(6,1) = 60 + 120 + 60 + 6 = 246

> [!success]- Answer
> **$120$ committees with exactly 3 men and 2 women; $246$ with at least one woman.**

> [!warning] Trap
> Counting 'at least one woman' as $\binom{4}{1}\binom{9}{4}=504$. That double-counts every committee with two or more women (each is counted once for each woman 'chosen first'), and it exceeds the total number of committees — a clear signal the answer is impossible.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Exactly 3 men and 2 women: `6 nCr 3×4 nCr 2` → **120** committees.
> 2. At least one woman by complement: `10 nCr 5` = **252** and `6 nCr 5` = **6** all-male, so `252−6` = **246**.
> 3. Case-sum check: `4 nCr 1×6 nCr 4+4 nCr 2×6 nCr 3+4 nCr 3×6 nCr 2+4 nCr 4×6 nCr 1` → **246**.

## Traps & Exam Notes

- **Using a permutation where order does not matter (or vice versa).** Committees, hands of cards and lottery draws are combinations; officers, PINs, finishing orders and seating are permutations. Read the question for the word 'arrange' before choosing.
- **Double-counting 'at least one'.** $\binom{k}{1}\binom{n-1}{r-1}$ over-counts every outcome containing two or more of the required class. Use $1-P(\mathrm{none})$ or sum the disjoint cases.
- **Forgetting that zero cannot lead a number.** In PIN and number-formation problems with digits, the first position has one fewer choice than the rest — and zero returns to the pool afterwards.
- **Ignoring repeated items.** Anagrams and multiset arrangements need the $\frac{n!}{n_1!n_2!\cdots}$ divisor. Using $n!$ inflates the answer by the product of the repeat factorials.
- **Treating a circular arrangement as linear.** $(n-1)!$, not $n!$. If clockwise and anticlockwise are distinguished, do not divide by 2; if the question says 'necklace' or 'bracelet', do.
- **Mixing ordered and unordered counting in a probability.** If the denominator is $\binom{52}{5}$, the numerator must also be a combination count. A permutation numerator over a combination denominator is off by $5!$.
- **Assuming '$\binom{n}{r}$ with $r>n$' equals zero automatically on the calculator without noticing.** The formula produces a factorial of a negative number; the count is 0 and the sign of the trap is that the calculator may error instead.

## See Also

- [[04_Probability_Rules_and_Bayes]]
- [[05_Binomial_and_Geometric_Distributions]]
- [[06_Poisson_and_Hypergeometric_Distributions]]

---

[[02_Dispersion,_Variance,_SD,_IQR_and_CV|⬅ 02]] · [[_MOC_Engineering_Data_Analysis|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Probability_Rules_and_Bayes|04 ➡]]
