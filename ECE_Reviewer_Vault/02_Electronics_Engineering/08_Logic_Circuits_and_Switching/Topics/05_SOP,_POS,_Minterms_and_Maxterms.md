---
id: ECE-08-05
title: "SOP, POS, Minterms and Maxterms"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Boolean_Algebra_and_De_Morgan]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — SOP, POS, Minterms and Maxterms

> [!abstract] Scope
> Write a function in canonical sum-of-products or product-of-sums form from a truth table, and convert between the two.

## Core Concept

> [!tip] Intuition
> Every truth table row where the output is 1 is one product term (a minterm); every row where it is 0 is one sum term (a maxterm). Canonical forms are the mechanical, unminimised transcriptions of the table.

**Minterms are the 1s.** A minterm of $n$ variables is a product containing every variable exactly once, complemented where the variable is 0 in that row. For row $A=0,B=1,C=1$ the minterm is $\bar A B C$, and its index is the binary value of the row, $011 = 3$, written $m_3$. A minterm is 1 for exactly one row of the truth table and 0 everywhere else, so ORing the minterms of the 1-rows reproduces the function exactly: $F = \sum m(1,3,5,7)$. This is the canonical **SOP** form.

**Maxterms are the 0s.** A maxterm of $n$ variables is a sum containing every variable exactly once, complemented where the variable is **1** in that row. For row $A=0,B=1,C=1$ the maxterm is $A + \bar B + \bar C$, index 3, written $M_3$. A maxterm is 0 for exactly one row, so ANDing the maxterms of the 0-rows reproduces the function:
$$F = \prod M(0,2,4,6)$$
This is the canonical **POS** form. Note the index rule is inverted with respect to minterms — that inversion is the single most common source of error in this topic.

**The two forms are complements of each other at each index.** For the same index, $M_i = \overline{m_i}$ and $m_i = \overline{M_i}$. So $m_3\cdot M_3 = 0$ and $m_3 + M_3 = 1$ always. It follows that the list of indices used by the SOP form and the list used by the POS form partition the $2^n$ rows: if $F = \sum m(1,3,5,7)$ then $F = \prod M(0,2,4,6)$, and $\bar F = \sum m(0,2,4,6)$. Reading the zeros off the truth table gives both the POS form of $F$ and the SOP form of $\bar F$ at once.

**Converting between the forms is De Morgan at work.** Given $F = \sum m(\mathrm{list})$, complement twice:
$$F = \overline{\overline{F}} = \overline{\sum m(\mathrm{complement\ row\ set})}$$
then apply De Morgan to turn the complemented sum of products into a product of sums. In practice you convert by listing the missing indices: the POS index list is the complement of the SOP index list. A three-variable function with ones at $\{0,3,6\}$ has $F = \sum m(0,3,6) = \prod M(1,2,4,5,7)$.

**Cost, and when each form wins.** Canonical SOP for $k$ ones over $n$ variables costs $k$ AND gates of $n$ inputs each plus one $k$-input OR — that is $k\,n$ literals. Canonical POS costs $(2^n-k)$ OR gates plus one AND, i.e. $(2^n-k)n$ literals. Canonical forms are therefore never built directly; they are the starting point for minimisation (see the K-map note). Choose SOP when the function has few 1s, POS when it has few 0s, and note that a POS expression maps naturally onto NOR-NOR hardware while SOP maps onto NAND-NAND.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Minterm (product term) | $m_i = \prod_{k=0}^{n-1} (\mathrm{variable}_k\ \mathrm{if\ bit}=1,\ \mathrm{complement\ if\ bit}=0)$ | One minterm per truth-table row; it is 1 for that row only. Index i is the row's binary value. |
| Maxterm (sum term) | $M_i = \sum_{k=0}^{n-1} (\mathrm{variable}_k\ \mathrm{if\ bit}=0,\ \mathrm{complement\ if\ bit}=1)$ | Complement rule is inverted relative to minterms: a 0 in the row keeps the variable uncomplemented. |
| Canonical SOP | $F = \sum m(i_1, i_2, \ldots) = m_{i_1} + m_{i_2} + \cdots$ | List exactly the rows where F = 1. |
| Canonical POS | $F = \prod M(j_1, j_2, \ldots) = M_{j_1} \cdot M_{j_2} \cdots$ | List exactly the rows where F = 0. The index sets of the two forms do not overlap. |
| Minterm-maxterm complement | $M_i = \overline{m_i},\quad m_i + M_i = 1,\quad m_i M_i = 0$ | Same index means the two terms are logical complements, not the same term. |
| Complement function | $\bar F = \sum m(\mathrm{rows\ where}\ F = 0)$ | The zeros of F are the ones of F-bar. Useful for building the function with a NOR or active-low output. |
| SOP to POS index conversion | $F = \sum m(S) \iff F = \prod M(\{0,\ldots,2^n-1\} \setminus S)$ | The POS list is the complement of the SOP list. Works in both directions. |
| Canonical SOP cost | $\mathrm{literals} = k\,n,\quad \mathrm{gates} = k + 1$ | k minterms over n variables: k n-input ANDs plus one k-input OR, before any minimisation. |
| All minterms sum to one | $\sum_{i=0}^{2^n-1} m_i = 1$ | Exactly one row of a truth table is true at a time, which is why minterms partition the space. |

## Worked Problems

### P1. A three-variable function $F(A,B,C)$ is 1 for rows 1, 3, 5 and 7. Write the canonical SOP and minimise it.

**Given:** F = 1 at rows 1, 3, 5, 7; variables A, B, C (A is the MSB)

**Solution:**

1. Row 1 = 001 -> (NOT A)(NOT B)C; row 3 = 011 -> (NOT A)BC; row 5 = 101 -> A(NOT B)C; row 7 = 111 -> ABC
2. Canonical SOP: (NOT A)(NOT B)C + (NOT A)BC + A(NOT B)C + ABC
3. Factor the first two: (NOT A)C(NOT B + B) = (NOT A)C
4. Factor the last two: AC(NOT B + B) = AC
5. (NOT A)C + AC = C(NOT A + A) = C

> [!success]- Answer
> **$F = \sum m(1,3,5,7) = \bar A\bar B C + \bar A B C + A\bar B C + ABC = C$**

> [!warning] Trap
> Building each minterm by complementing the variables that are 1 rather than the variables that are 0. Row 1 (001) gives $\bar A\bar B C$, not $AB\bar C$.

### P2. Write both the canonical SOP and the canonical POS for the same function $F = \sum m(1,3,5,7)$.

**Given:** F = 1 at rows 1, 3, 5, 7; three variables

**Solution:**

1. The SOP form uses the 1-rows: F = sum m(1,3,5,7)
2. The 0-rows are 0, 2, 4, 6
3. Row 0 = 000 -> A + B + C; row 2 = 010 -> A + (NOT B) + C
4. Row 4 = 100 -> (NOT A) + B + C; row 6 = 110 -> (NOT A) + (NOT B) + C
5. POS: F = (A+B+C)(A+(NOT B)+C)((NOT A)+B+C)((NOT A)+(NOT B)+C)
6. Check the product reduces to C, matching the SOP result

> [!success]- Answer
> **$F = \prod M(0,2,4,6) = (A+B+C)(A+\bar B+C)(\bar A+B+C)(\bar A+\bar B+C) = C$**

> [!warning] Trap
> Writing the maxterm for row 2 as $\bar A + B + \bar C$. In a maxterm a 0 in the row keeps the variable **uncomplemented** and a 1 complements it — the opposite of the minterm rule.

### P3. Given $F(A,B,C) = \bar A\bar B\bar C + \bar A B C + A B\bar C$, write the compact $\sum m$ and $\prod M$ notations.

**Given:** F = NOT A NOT B NOT C + NOT A B C + A B NOT C

**Solution:**

1. Index each term by reading A, B, C as a binary number (A is the MSB)
2. (NOT A)(NOT B)(NOT C) = 000 = m0
3. (NOT A)BC = 011 = m3
4. AB(NOT C) = 110 = m6
5. SOP: F = sum m(0,3,6)
6. The remaining rows 1, 2, 4, 5, 7 are the zeros, so POS: F = product M(1,2,4,5,7)

> [!success]- Answer
> **$F = \sum m(0,3,6) = \prod M(1,2,4,5,7)$**

> [!warning] Trap
> Reading the term order as C, B, A. The index is formed from the declared variable order with the **first** variable as the MSB; reversing the order permutes every index and silently breaks the answer.

### P4. Compare the cost of the canonical SOP and the minimised SOP for $F(A,B,C) = \sum m(0,1,2,3,4,5)$.

**Given:** F = 1 at rows 0,1,2,3,4,5; gate/literal cost

**Solution:**

1. Canonical SOP has 6 minterms, each of 3 literals: 6 x 3 = 18 literals, 6 three-input AND gates plus one 6-input OR
2. Group the 1s directly in Boolean algebra: rows 0-3 have A = 0, so (NOT A) covers them
3. Rows 0,1,4,5 have B = 0, so (NOT B) covers them
4. Union of the two covers 0,1,2,3,4,5 and nothing else
5. Minimised: F = (NOT A) + (NOT B), which is 2 literals and one 2-input OR

> [!success]- Answer
> **Canonical: 18 literals and 7 gates; minimised: $F = \bar A + \bar B$, 2 literals and 1 gate**

> [!warning] Trap
> Assuming the canonical form is the answer to a cost question. Canonical SOP is correct but never minimal; a cost or gate-count question always expects the minimised expression.

### P5. For three variables, state $m_3$ and $M_3$ and verify the two complement identities.

**Given:** index i = 3; variables A, B, C

**Solution:**

1. 3 = 011, so A = 0, B = 1, C = 1
2. Minterm: complement the 0 bits -> m3 = (NOT A)BC
3. Maxterm: complement the 1 bits -> M3 = A + (NOT B) + (NOT C)
4. Product m3.M3 = (NOT A)BC(A + (NOT B) + (NOT C)): the factor A contradicts (NOT A), and the factors (NOT B), (NOT C) contradict B and C, so the product is 0
5. Sum m3 + M3 = 1 because M3 = NOT(m3) by De Morgan

> [!success]- Answer
> **$m_3 = \bar A B C$, $M_3 = A + \bar B + \bar C$, with $m_3 M_3 = 0$ and $m_3 + M_3 = 1$**

> [!warning] Trap
> Believing $M_3$ is the same term with every literal complemented, i.e. $A + \bar B + \bar C$ written as $\bar A + B + C$. The maxterm index is the row where the maxterm is 0, so its literals follow the inverted rule.

## Traps & Exam Notes

- **Inverting the maxterm rule.** A minterm complements the 0 bits of its row; a maxterm complements the 1 bits. Row 2 (010) is the minterm $\bar A B\bar C$ but the maxterm $A + \bar B + C$.
- **Using the same index set for both forms.** $F = \sum m(1,3,5,7)$ is $F = \prod M(0,2,4,6)$, not $\prod M(1,3,5,7)$. The two index sets are complements of each other.
- **Reversing the variable order.** $\sum m(0,3,6)$ for variables $A,B,C$ becomes a different set if read as $C,B,A$. The first declared variable is always the MSB of the index.
- **Quoting the canonical form as minimal.** Canonical SOP uses one $n$-literal product per 1-row. Cost questions want the minimised expression, typically obtained from a K-map.
- **Forgetting that the zero rows still define the function.** A POS question is answered from the 0-rows of the same truth table, so a table with only its 1-rows listed is incomplete.
- **Confusing $\bar F$ with $F$ in POS.** $\bar F = \sum m(\mathrm{zero\ rows})$, while $F = \prod M(\mathrm{zero\ rows})$. One is a sum of the missing minterms, the other a product of their maxterms.
- **Assuming SOP is always cheaper.** With only two 0-rows out of sixteen, the POS form may have far fewer terms than the SOP form. Count both before choosing a form.

## See Also

- [[04_Boolean_Algebra_and_De_Morgan]]
- [[06_Karnaugh_Maps]]
- [[08_Encoders_and_Decoders]]

---

[[04_Boolean_Algebra_and_De_Morgan|⬅ 04]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Karnaugh_Maps|06 ➡]]
