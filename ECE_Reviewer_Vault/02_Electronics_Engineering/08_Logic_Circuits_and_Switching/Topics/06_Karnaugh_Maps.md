---
id: ECE-08-06
title: "Karnaugh Maps"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 6
tier: 1
depth: full
problem_count: 10
prereqs: ["[[05_SOP,_POS,_Minterms_and_Maxterms]]", "[[04_Boolean_Algebra_and_De_Morgan]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Karnaugh Maps

> [!abstract] Scope
> Minimise switching functions with Karnaugh maps: group cells correctly, read the eliminated literals, and choose SOP or POS form.

## Core Concept

> [!tip] Intuition
> A Karnaugh map folds the truth table into a grid where geometrically adjacent cells differ in exactly one variable. Two adjacent 1s can be merged into one term with a variable cancelled, so minimisation becomes a game of drawing the largest legal rectangles of 1s.

**The layout is Gray-ordered and that is the whole point.** An $n$-variable map has $2^n$ cells, one per minterm. Rows and columns are labelled in Gray order ($00, 01, 11, 10$) so that any two cells sharing an edge differ in exactly one variable. That single-variable difference is what permits cancellation: neighbouring cells represent minterms that are identical except for one literal, and $X\bar Y + XY = X$. A 3-variable map is a $2\times4$ grid, a 4-variable map is $4\times4$, and a 5-variable map is drawn as two 4-variable maps side by side, one for each value of the fifth variable. Each variable's 1-region is always half the map: one row band, one column band, or one half-map.

**Grouping rules.** A legal group is a rectangle (including a strip or the whole map) containing exactly $2^k$ cells: 1, 2, 4, 8 or 16. Groups may **overlap** — sharing cells is not only allowed but usually necessary to cover every 1 with the fewest terms. Groups may **wrap around** the edges, because the map is topologically a torus: the leftmost and rightmost columns are adjacent, as are the top and bottom rows, and in a 4-variable map the four corner cells form one valid group of four. Every 1 must be covered by at least one group, groups should be as large as possible, and the number of groups should be as small as possible. Three cells, six cells, or two diagonal cells are not legal groups.

**Reading a group's term.** Only the variables that are **constant** across the group survive; the variables that change are eliminated. A constant 1 keeps the literal uncomplemented, a constant 0 gives the complemented literal. A 2-cell group cancels one variable, a 4-cell group cancels two, an 8-cell group cancels three, and a group of 16 is the constant 1. If the group lies entirely inside the $A=0$ half and entirely inside the $C=1$ half, the term is $\bar A C$ regardless of how many cells it contains. Each surviving group contributes one product term, and the minimised SOP is the OR of those terms.

**Prime implicants and essentials.** A **prime implicant** is a legal group that cannot be made any larger. The minimum SOP is a cover of all 1s by prime implicants. A prime implicant that covers at least one 1 which no other prime implicant covers is **essential** and must appear in every minimum solution. The procedure is: find all prime implicants, take every essential one, then cover the remaining 1s with as few (and as large) additional prime implicants as possible. There can be several equally minimal solutions when no essential prime implicant resolves a cell; any of them is a correct answer.

**Don't-cares are free.** An $X$ in the map marks an input combination that cannot occur or whose output does not matter. You may treat it as 1 to enlarge a group, or as 0 and ignore it — whichever gives the simpler expression. A don't-care never has to be covered. Physically this is real: unused codes of a BCD counter or impossible sensor states are exactly the $X$ entries, and using them is how the decoder logic gets cheaper.

**POS comes from grouping the zeros.** Group the 0-cells instead of the 1-cells, read each group as a sum term (a variable that is constant 1 becomes complemented in the sum, constant 0 stays uncomplemented), and AND the sums together. Equivalently, the grouped zeros give $\bar F$ in SOP, and $F = \overline{\bar F}$ converts it. Group the zeros when the function has few 0s, when a POS expression maps onto NOR-NOR hardware, or when the SOP cover has more terms. Mixing the two readings — grouping zeros but writing product terms — is the classic POS error.

**Five and six variables.** A 5-variable map is two 4-variable maps: the left half holds $A=0$, the right half $A=1$, and the two halves are adjacent cell-for-cell in mirrored position. Groups may span the halves, which is how a variable gets eliminated across the split. Adjacency inside each half still wraps at its own edges, so a corner group can include cells from corresponding corners of both halves.

## Derivation

Start with two adjacent minterms that differ only in $B$: $F = \bar A\bar B C + \bar A B C$. These are two neighbouring cells in the $A=0$ row band with $C=1$.

Factor out everything the two terms share: $\bar A C(\bar B + B)$.

Apply the complement law $\bar B + B = 1$, giving $\bar A C \cdot 1 = \bar A C$. Exactly one literal vanished, so a 2-cell group eliminates one variable.

Now take a 4-cell group, the block of cells where $A=0$ and $B=1$: $\bar A B\bar C\bar D + \bar A B\bar C D + \bar A B C\bar D + \bar A B C D$.

Factor the shared literals: $\bar A B(\bar C\bar D + \bar C D + C\bar D + CD)$. The bracket lists all four combinations of $C$ and $D$, so it equals 1.

Therefore the whole block equals $\bar A B$: two literals were eliminated, one for each doubling of the group.

Generalising: a group of $2^k$ cells covers both values of $k$ different variables, so $k$ variables cancel and the term keeps $n-k$ literals. A 2-cell group in a 3-variable map leaves 2 literals; an 8-cell group in a 4-variable map leaves 1; a 16-cell group leaves the constant 1.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Cells in an n-variable map | $\mathrm{cells} = 2^n$ | 3 variables: 8 cells; 4 variables: 16; 5 variables: two 4-variable maps of 16 each. |
| Legal group sizes | $\mathrm{size} = 2^k,\quad k = 0,1,2,\ldots,n$ | 1, 2, 4, 8, 16 cells. Groups of 3 or 6 cells are illegal even if they look rectangular. |
| Literals eliminated by a group | $\mathrm{literals\ remaining} = n - k$ | A group of 2^k cells cancels k variables. 8 cells in a 4-variable map leaves one literal. |
| Cell adjacency | $\mathrm{adjacent} \iff \mathrm{Hamming\ distance} = 1$ | Adjacency includes wrap-around at all four edges and the four corners of a 4-variable map. |
| Minimised SOP from groups | $F = T_1 + T_2 + \cdots + T_m$ | One product term per group. Every 1-cell must lie in at least one group; overlap is allowed. |
| Group term construction | $T = (\mathrm{variable\ if\ constant\ }1,\ \mathrm{complement\ if\ constant\ }0)$ | Variables that change value inside the group are dropped from the term. |
| Minimum-SOP condition | $F = \sum (\mathrm{essential\ prime\ implicants}) + (\mathrm{cover\ of\ remaining\ 1s})$ | An essential prime implicant covers a 1 that no other prime implicant covers, so it is mandatory. |
| POS by grouping zeros | $F = \overline{\bar F},\quad \bar F = \sum (\mathrm{zero-cell\ groups})$ | Read the zero groups as SOP, then complement. Directly, each group becomes a sum term ANDed with the others. |
| Don't-care usage | $X\ \mathrm{may\ be\ read\ as}\ 0\ \mathrm{or}\ 1$ | Use an X only when it enlarges a group; an X never has to be covered by any group. |

## Interactive Widget

**KMap Solver Interactive**

![[KMap_Solver_Interactive.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Minimise $F(A,B,C) = \sum m(0,1,4,5)$ with a K-map.

**Given:** F = sum m(0,1,4,5); 3-variable map

**Solution:**

1. Plot the 1s: cells 000, 001, 100, 101
2. Cells 0 and 1 sit in the A=0, B=0 corner; cells 4 and 5 in the A=1, B=0 corner
3. Together they form a 4-cell strip across both A values with B = 0 and C free
4. Group of 4 = 2^2 cells, so k = 2 variables cancel, leaving n - k = 1 literal
5. B is constant 0 across the group, so the term is (NOT B)

> [!success]- Answer
> **$F = \bar B$ (one literal, one 4-cell group)**

> [!warning] Trap
> Drawing two separate 2-cell groups and writing $\bar A\bar B + A\bar B$, which is correct but not minimal. Two adjacent pairs that form a rectangle of four must be merged into one group.

### P2. Minimise $F(A,B,C) = \sum m(0,1,2,3,7)$.

**Given:** F = sum m(0,1,2,3,7); 3-variable map

**Solution:**

1. Cells 0,1,2,3 all have A = 0: one 4-cell group covering the entire A=0 row band
2. That group reads (NOT A)
3. Cell 7 (111) is isolated from most cells, but cells 3 (011) and 7 (111) are adjacent
4. Group 3 and 7: both have B = 1 and C = 1, A changes -> term BC
5. Cell 3 is already covered by (NOT A); overlapping is allowed and here it is free
6. Cover = (NOT A) + BC, and both terms are essential (cell 0 only in the first, cell 7 only in the second)

> [!success]- Answer
> **$F = \bar A + BC$**

> [!warning] Trap
> Refusing to reuse cell 3 in the second group and instead writing a 1-cell group for cell 7 as $ABC$. Single-cell groups are legal but keep every literal, which is never minimal when the cell can pair.

### P3. Minimise $F(A,B,C,D) = \sum m(0,2,8,10)$.

**Given:** F = sum m(0,2,8,10); 4-variable map

**Solution:**

1. Locate the four cells: 0000, 0010, 1000, 1010
2. They sit at the four corners of the 4-variable map
3. Corners are adjacent by wrap-around in both directions
4. All four have B = 0 and D = 0; A and C take every combination
5. Group of 4 cancels A and C, leaving (NOT B)(NOT D)

> [!success]- Answer
> **$F = \bar B\bar D$**

> [!warning] Trap
> Declaring the corners non-adjacent because they do not touch on the page. A 4-variable map wraps at the top/bottom and left/right edges, so the four corners form one legal group of four.

### P4. Minimise $F(A,B,C,D) = \sum m(1,3,7,11,15)$ with don't-cares $d(0,2,5)$.

**Given:** F = sum m(1,3,7,11,15); d = 0,2,5; 4-variable map

**Solution:**

1. Plot the five 1s and mark 0, 2, 5 as X
2. Cells 1,3,7 with X at 5 form the block A=0, D=1: four cells -> term (NOT A)D
3. Cells 3,7,11,15 form the block C=1, D=1: term CD
4. Union of the two blocks covers 1,3,5(X),7,11,15 - every 1 is covered
5. Don't-cares 0 and 2 are ignored; X at 5 was used only because it completed the block

> [!success]- Answer
> **$F = \bar A D + CD = D(\bar A + C)$**

> [!warning] Trap
> Insisting that every X be covered, which would add a pointless term for cells 0 and 2. Don't-cares are optional group members: use only the ones that enlarge a needed group.

### P5. Minimise the five-variable function $F(A,B,C,D,E) = \sum m(0,1,2,3,16,17,18,19)$.

**Given:** F = sum m(0,1,2,3,16,17,18,19); 5-variable map

**Solution:**

1. Draw the 5-variable map as two 4-variable maps: left half A = 0, right half A = 1, with B,C,D,E labelling both
2. Minterms 0-3 (A=0) all have B=0 and C=0, with D and E taking every combination
3. Minterms 16-19 (A=1) sit at the mirrored position in the right half, with the same B=0, C=0 pattern
4. Corresponding cells across the two halves are adjacent, so all eight form one group
5. Group of 8 cancels three variables: B and C are constant while A, D and E all vary
6. B = 0 and C = 0 in every cell of the group, so the term is (NOT B)(NOT C)

> [!success]- Answer
> **$F = \bar B\bar C\bar D$**

> [!warning] Trap
> Treating the two halves as independent maps and returning a term that still contains A. The halves are adjacent, so a group spanning them eliminates the fifth variable.

### P6. Use the zeros to find a minimal POS expression for $F(A,B,C,D) = \sum m(0,1,2,3,4,5,6,7,8,9,10,11)$.

**Given:** F = 1 for rows 0 through 11; POS requested

**Solution:**

1. The 1s number twelve, which is not a power of two, so a single SOP group is impossible
2. The zeros are 12, 13, 14, 15: binary 1100, 1101, 1110, 1111
3. All four zeros have A = 1 and B = 1, so they form one 4-cell group
4. That group gives (NOT F) = AB
5. Complement with De Morgan: F = NOT(AB) = (NOT A) + (NOT B)
6. As a POS expression the same result is written F = (NOT A + NOT B)

> [!success]- Answer
> **$F = \bar A + \bar B$ (equivalently $\overline{AB}$)**

> [!warning] Trap
> Trying to enclose all twelve 1s in one group. Twelve is not a power of two; either split the 1s into two 8-groups or, far faster here, group the four 0s and complement.

### P7. Find the essential prime implicants of $F(A,B,C) = \sum m(0,1,3,7)$ and give a minimum SOP.

**Given:** F = sum m(0,1,3,7)

**Solution:**

1. Possible 2-cell groups: {0,1} -> (NOT A)(NOT B); {1,3} -> (NOT A)C; {3,7} -> BC
2. Cell 0 appears only in {0,1}, so (NOT A)(NOT B) is essential
3. Cell 7 appears only in {3,7}, so BC is essential
4. The two essential groups already cover cells 0,1,3,7 - every 1
5. The prime implicant (NOT A)C is therefore not needed

> [!success]- Answer
> **$F = \bar A\bar B + BC$; the term $\bar A C$ is a non-essential prime implicant**

> [!warning] Trap
> Including every prime implicant found on the map. Only essentials plus enough extra terms to cover the remaining 1s belong in the answer; adding $\bar A C$ here is correct but not minimal.

### P8. Minimise $F(A,B,C,D) = \sum m(0,1,2,3,8,9,10,11)$.

**Given:** F = sum m(0,1,2,3,8,9,10,11)

**Solution:**

1. Plot the 1s: rows 0-3 in the A=0 half and rows 8-11 in the A=1 half
2. Every 1 has B = 0 and C = 0
3. The two 4-cell blocks sit at matching positions and merge across the A boundary
4. One group of 8 cells: k = 3 variables cancel, leaving n - k = 1 literal
5. Only D varies inside the group and A varies across the halves, so both are dropped

> [!success]- Answer
> **$F = \bar B\bar C$**

> [!warning] Trap
> Reporting two terms such as $\bar A\bar B\bar C + A\bar B\bar C$ instead of merging the halves. An 8-cell group is one term; failing to merge doubles the gate count for no benefit.

### P9. Minimise $F(A,B,C,D) = \sum m(0,2,5,7,8,10,13,15)$.

**Given:** F = sum m(0,2,5,7,8,10,13,15); 4-variable map

**Solution:**

1. Group the four cells 0,2,8,10: all have B = 0 and D = 0 -> (NOT B)(NOT D)
2. Group the four cells 5,7,13,15: all have B = 1 and D = 1 -> BD
3. Check coverage: {(0,2,8,10)} union {(5,7,13,15)} is exactly the given list
4. Both groups are essential - each covers cells no other group covers
5. Result: F = (NOT B)(NOT D) + BD, which is XNOR(B,D)

> [!success]- Answer
> **$F = \bar B\bar D + BD = \overline{B \oplus D}$**

> [!warning] Trap
> Trying to pair cells such as 2 and 5, which differ in two bits and are therefore not adjacent even though they look close. Only a one-bit difference permits grouping.

### P10. Minimise $F(A,B,C,D) = \sum m(0,1,2,4,5,6,8,9,10,12,13,14)$.

**Given:** F = 1 at all rows except 3, 7, 11, 15; POS form preferred

**Solution:**

1. Group the zeros instead of the ones: cells 3, 7, 11, 15
2. 3 = 0011, 7 = 0111, 11 = 1011, 15 = 1111 - all have C = 1 and D = 1
3. The four zeros form one group -> (NOT F) = CD
4. Complement by De Morgan: F = NOT(CD) = (NOT C) + (NOT D)
5. Cross-check one 1, row 12 = 1100: (NOT C) + (NOT D) = 1 + 1 = 1 as required
6. Cross-check row 3 = 0011: 0 + 0 = 0 as required

> [!success]- Answer
> **$F = \bar C + \bar D$ (POS with a single sum term)**

> [!warning] Trap
> Grouping the zeros and then writing a product term CD as the answer. Zero-cell groups give the complement of the function; the final step is always to invert and apply De Morgan.

## Traps & Exam Notes

- **Grouping a non-power-of-two number of cells.** Three, six or twelve cells is never a legal group, however neat the shape. Allowed sizes are 1, 2, 4, 8 and 16, so a function with twelve adjacent 1s needs two 8-groups or a POS solution from the four 0s.
- **Treating diagonal cells as adjacent.** Cells touching only at a corner are not adjacent unless the corner wrap-around rule applies (the four corner cells of a 4-variable map). Diagonal cells differ in two bits, so they cannot merge.
- **Forgetting the wrap-around.** The left and right columns are adjacent, the top and bottom rows are adjacent, and the four corners of a 4-variable map form a group of four. Missing this yields a non-minimal answer.
- **Grouping the zeros and reading product terms.** Zero groups describe $\bar F$. Group the 1s for SOP, group the 0s for POS, and never mix the reading rules within one map.
- **Leaving a 1 uncovered or refusing to overlap.** Every 1 must be in at least one group, and groups may share cells. If a 1 is covered only by reusing a cell of another group, that is perfectly legal.
- **Keeping a variable that changes inside the group.** A group lying in both halves of the $A$ split loses $A$ from its term. Reading a term that still contains a changing variable is the most common reading error on a K-map.
- **Covering don't-cares unnecessarily.** An $X$ only helps when it enlarges a group. Treating every $X$ as a required 1 adds terms and is wrong on a minimality question.

## See Also

- [[05_SOP,_POS,_Minterms_and_Maxterms]]
- [[04_Boolean_Algebra_and_De_Morgan]]
- [[08_Encoders_and_Decoders]]
- [[13_Asynchronous_and_Synchronous_Counters]]

---

[[05_SOP,_POS,_Minterms_and_Maxterms|⬅ 05]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Adders_and_Subtractors|07 ➡]]
