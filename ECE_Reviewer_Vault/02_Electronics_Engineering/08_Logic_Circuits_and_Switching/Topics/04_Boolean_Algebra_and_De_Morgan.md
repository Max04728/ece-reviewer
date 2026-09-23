---
id: ECE-08-04
title: "Boolean Algebra and De Morgan"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Number_Systems_and_Base_Conversion]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Boolean Algebra and De Morgan

> [!abstract] Scope
> Simplify switching expressions with Boolean identities, apply De Morgan's theorems, and convert logic to NAND-only or NOR-only form.

## Core Concept

> [!tip] Intuition
> Boolean algebra is ordinary algebra with the constraint that every variable is 0 or 1. De Morgan is the tool that lets a bubble slide through a gate while the operator flips, which is exactly how NAND-NAND becomes AND-OR.

**The postulates do all the work.** AND behaves like multiplication and OR like addition, with the special rules $1+1=1$ and $1\cdot1=1$. From this come the identities you actually use: $A+0=A$, $A\cdot1=A$, $A+1=1$, $A\cdot0=0$, $A+A=A$, $A\cdot A=A$, and the complements $A+\bar A=1$, $A\bar A=0$. Involution says $\overline{\bar A}=A$. Nothing exotic is ever needed — every simplification problem is a chain of these identities plus distribution.

**De Morgan's two theorems.** $\overline{A+B} = \bar A\,\bar B$ and $\overline{A\,B} = \bar A + \bar B$. In words: break the bar and change the operator. The generalized form extends to any number of variables and to mixed expressions: complement each variable, exchange AND with OR, and complement the whole. This is the single most-used theorem in digital design because it converts between the AND-OR world you minimise in and the NAND-NAND or NOR-NOR world you build in.

**Duality is not complementation.** The dual of an expression is formed by swapping AND with OR and swapping the constants 0 and 1, while leaving every variable **uncomplemented**. The dual of $A + BC = (A+B)(A+C)$ is $A(B+C) = AB + AC$, which is true. De Morgan, by contrast, complements variables. Confusing the two is the classic algebra error:
$$\overline{A+B} \neq \bar A + \bar B$$

**Absorption and consensus remove redundant terms.** Absorption: $A + AB = A$ and $A(A+B) = A$, because the term $AB$ can never be true when $A$ is false. Consensus:
$$AB + \bar A C + BC = AB + \bar A C$$
— the consensus term $BC$ is covered by the other two whenever it matters. Redundancy removal matters because it removes a gate and a race hazard. Consensus terms are legal to *add* (they do not change the function) but they are the first thing a K-map eliminates.

**Bubble pushing and universal gates.** NAND and NOR are functionally complete: any expression can be built from either alone. The practical recipe is (1) minimise in SOP, (2) draw the AND-OR circuit, (3) convert to NAND-NAND by De Morgan and double negation:
$$F = AB + CD = \overline{\overline{AB}\cdot\overline{CD}}$$
exactly three NAND gates. For NOR-only, minimise in POS and apply the mirror image:
$$F = (A+B)(C+D) = \overline{\overline{A+B}+\overline{C+D}}$$
A bubble on a gate input is a complement, so pushing a bubble through a gate flips its operator — that is De Morgan performed graphically.

**When algebra stops being practical.** Identities give no guarantee of a minimal answer, and choosing which theorem to apply next is guesswork on anything past four variables. Algebra is best used for local cleanup (absorbing a redundant literal, pushing a bubble) while K-maps or tabulation methods handle global minimisation. On an exam, if an expression has three or four variables and the algebra gets ugly, switch to a K-map.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Identity and null elements | $A + 0 = A,\quad A \cdot 1 = A,\quad A + 1 = 1,\quad A \cdot 0 = 0$ | The base cases for every simplification chain. |
| Idempotence and involution | $A + A = A,\quad A \cdot A = A,\quad \overline{\bar A} = A$ | Duplicating a term or a bar changes nothing. |
| Complement law | $A + \bar A = 1,\quad A\,\bar A = 0$ | Used to eliminate a variable from a product or sum pair. |
| Distributive law | $A(B+C) = AB + AC,\quad A + BC = (A+B)(A+C)$ | The second form is valid only in Boolean algebra, not in ordinary arithmetic. |
| De Morgan, theorem 1 | $\overline{A + B} = \bar A\,\bar B$ | Break the bar and change OR to AND. Extends to any number of inputs. |
| De Morgan, theorem 2 | $\overline{A\,B} = \bar A + \bar B$ | Break the bar and change AND to OR. This is the theorem that converts AND-OR to NAND-NAND. |
| Generalized De Morgan | $\overline{A + B + C + \cdots} = \bar A \bar B \bar C \cdots$ | Each variable is complemented and the operator is exchanged, for any number of terms. |
| Absorption | $A + AB = A,\quad A(A+B) = A$ | Removes a term that is covered everywhere by a single literal. |
| Consensus theorem | $AB + \bar A C + BC = AB + \bar A C$ | The consensus term BC is redundant. Adding it is harmless; deleting it saves a gate. |
| NAND-NAND realisation | $F = AB + CD = \overline{\overline{AB} \cdot \overline{CD}}$ | Two-input NANDs cost 3 gates. Any SOP maps to NAND-NAND with one gate per product plus one. |

## Worked Problems

### P1. Simplify $F = \overline{AB + \bar A C}$ to a minimum sum of products.

**Given:** F = NOT(AB + (NOT A)C)

**Solution:**

1. Apply De Morgan to the outer bar: F = NOT(AB) . NOT((NOT A)C)
2. Apply De Morgan to each factor: NOT(AB) = (NOT A) + (NOT B); NOT((NOT A)C) = A + (NOT C)
3. F = (NOT A + NOT B)(A + NOT C)
4. Expand: NOT A . A + NOT A . NOT C + NOT B . A + NOT B . NOT C
5. NOT A . A = 0, leaving NOT A . NOT C + A . NOT B + NOT B . NOT C
6. The term NOT B . NOT C is the consensus of the other two (consensus in A gives NOT C . NOT B), so it is redundant
7. F = (NOT A)(NOT C) + A(NOT B)

> [!success]- Answer
> **$F = \bar A\bar C + A\bar B$**

> [!warning] Trap
> Writing $\overline{AB + \bar A C} = \overline{AB} + \overline{\bar A C}$ — that is not De Morgan. Breaking the bar also changes the operator, and dropping the operator change is what leaves a wrong (and non-equivalent) expression behind.

### P2. Prove the identity $A + \bar A B = A + B$ and give the circuit saving.

**Given:** identity to prove

**Solution:**

1. Start with A + (NOT A)B
2. Use the second distributive form with X = A: A + (NOT A)B = (A + NOT A)(A + B)
3. A + NOT A = 1, so the expression is 1 . (A + B)
4. Therefore A + (NOT A)B = A + B
5. Circuit saving: a two-input AND plus an inverter collapses into a single OR gate

> [!success]- Answer
> **$A + \bar A B = A + B$**

> [!warning] Trap
> Using the first distributive form and expanding to $A + \bar A B = A(1 + B) + \bar A B$, which goes nowhere. The useful direction is the OR-distributive form $A + BC = (A+B)(A+C)$.

### P3. Implement $F = AB + CD$ using only 2-input NAND gates. State the gate count.

**Given:** F = AB + CD; NAND gates only, 2-input

**Solution:**

1. Double-complement the whole expression: F = NOT( NOT(AB + CD) )
2. De Morgan on the inner bar: NOT(AB + CD) = NOT(AB) . NOT(CD)
3. So F = NOT( NOT(AB) . NOT(CD) )
4. Gate 1 computes NOT(AB); gate 2 computes NOT(CD)
5. Gate 3 NANDs those two outputs, giving AB + CD
6. Total: 3 two-input NAND gates

> [!success]- Answer
> **$F = \overline{\overline{AB}\cdot\overline{CD}}$ using 3 NAND gates**

> [!warning] Trap
> Drawing an AND gate to form $AB$ and calling the NAND that follows it a NAND-only solution. A NAND with both inputs tied is an inverter, so any AND costs two NAND gates; the direct double-complement form avoids that.

### P4. Use the consensus theorem to minimise $F = AB + \bar A C + BC$.

**Given:** F = AB + (NOT A)C + BC

**Solution:**

1. Identify the consensus pair: AB and (NOT A)C share the variable A, with B and C as the other literals
2. The consensus term is B . C, produced by multiplying the two non-shared literals
3. The theorem states AB + (NOT A)C + BC = AB + (NOT A)C
4. Verify at A = 0, B = 1, C = 1: original = 0 + 1 + 1 = 1; minimised = 0 + 1 = 1, same
5. Verify at A = 1, B = 1, C = 1: original = 1 + 0 + 1 = 1; minimised = 1 + 0 = 1, same
6. Result: F = AB + (NOT A)C with one gate fewer

> [!success]- Answer
> **$F = AB + \bar A C$**

> [!warning] Trap
> Believing $BC$ can never be dropped. It is redundant here specifically because the other two terms already cover every case where $BC=1$; with a different surrounding expression the consensus term may be essential (for example $AB + \bar A C$ with no third term cannot be reduced further).

### P5. Simplify $F = (A+B)(A+\bar B)$ and also express $A+B$ using NOR gates only.

**Given:** F = (A+B)(A+NOT B)

**Solution:**

1. Expand: (A+B)(A+NOT B) = A.A + A.NOT B + B.A + B.NOT B
2. A.A = A, and B.NOT B = 0, leaving A + A.NOT B + AB
3. Factor A: A(1 + NOT B + B) = A . 1 = A
4. For the NOR form, double-complement: A + B = NOT( NOT(A+B) )
5. De Morgan inside: NOT(A+B) = (NOT A)(NOT B), so A + B = NOT( (NOT A)(NOT B) )
6. A product of two inverted inputs feeding a NOR gives A + B

> [!success]- Answer
> **$(A+B)(A+\bar B) = A$; and $A+B = \overline{\bar A + \bar B}$ built from one NOR**

> [!warning] Trap
> Cancelling $(A+B)(A+\bar B)$ to $A + B\bar B$ by the wrong distributive direction and then stopping at $A + 0$ without stating it equals $A$. Also, NOR-NOR needs POS input: $A+B$ maps to a single NOR with both inputs inverted, not to a two-level NOR-NOR tree.

## Traps & Exam Notes

- **Breaking a bar without changing the operator.** $\overline{A+B} \neq \bar A + \bar B$ and $\overline{AB} \neq \bar A\bar B$. De Morgan always exchanges AND with OR.
- **Confusing duality with complementation.** Duality swaps AND/OR and 0/1 but never complements a variable; De Morgan complements variables. Applying both at once gives a wrong answer.
- **Forgetting that a NAND with tied inputs is an inverter.** A NAND-NAND implementation of $AB + CD$ costs 3 gates; drawing an AND before a NAND costs 4 and is not NAND-only.
- **Using the arithmetic distributive law that does not exist.** $A + BC \neq (A+B)(A+C)$ in ordinary algebra but $=$ is exactly right here. Conversely $A(B+C) = AB+AC$ holds in both.
- **Dropping a consensus term that was load-bearing.** $BC$ is redundant in $AB + \bar A C + BC$, but the same literal pattern is essential in a different expression. Always re-verify with a truth table or K-map.
- **Minimising in SOP and then building with NOR.** NOR-NOR realises POS. Reduce the function in POS (or group the zeros) first, then apply $F = \overline{\overline{A+B}+\overline{C+D}}$.
- **Assuming an algebra chain is minimal.** Identities give a valid expression, not necessarily a minimum one. Verify the final literal count against a K-map.

## See Also

- [[05_SOP,_POS,_Minterms_and_Maxterms]]
- [[06_Karnaugh_Maps]]
- [[16_Logic_Families_TTL_vs_CMOS_and_Interfacing]]

---

[[03_Codes_BCD,_Gray,_ASCII,_Parity|⬅ 03]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[05_SOP,_POS,_Minterms_and_Maxterms|05 ➡]]
