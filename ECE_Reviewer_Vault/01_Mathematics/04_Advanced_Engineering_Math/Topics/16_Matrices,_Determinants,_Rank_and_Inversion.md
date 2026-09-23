---
id: MATH-04-16
title: "Matrices, Determinants, Rank and Inversion"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 16
tier: 2
depth: full
problem_count: 5
prereqs: []
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 16 — Matrices, Determinants, Rank and Inversion

> [!abstract] Scope
> Evaluate a determinant by cofactor expansion or Sarrus, use the determinant's product and scaling laws, and build a matrix inverse from cofactors, the adjugate and Gauss-Jordan elimination.

## Core Concept

> [!tip] Intuition
> A determinant is the signed volume scale factor of the linear map: it answers whether the map can be undone at all. The inverse then rebuilds the input from the output, and every route to it — adjugate formula or Gauss-Jordan — is just bookkeeping on that one number being non-zero.

**Cofactor expansion is the definition made computable.** For an $n\times n$ matrix $A$, the minor $M_{ij}$ is the determinant left after deleting row $i$ and column $j$, and the cofactor is $C_{ij} = (-1)^{i+j}M_{ij}$. Expanding along any row or any column, $\det A = \sum_{j} a_{ij}C_{ij}$, gives the same number every time — that freedom is what makes hand computation practical, because you expand along the row or column with the most zeros. For a $3\times3$ matrix the expansion collapses to the Sarrus shortcut: copy the first two columns to the right and take the three downward diagonal products minus the three upward ones. Sarrus works *only* for $3\times3$; for $4\times4$ and larger there is no diagonal shortcut and you must use cofactor expansion, row reduction, or expansion along a zero-rich line. The determinant is also the signed volume of the parallelepiped spanned by the rows, so a zero determinant means the rows are coplanar — one row is a linear combination of the others.

**The product and scaling laws do the work that expansion cannot.** The two facts worth memorising are $\det(AB) = \det A\det B$ and $\det(A^{T}) = \det A$. They imply $\det(A^{-1}) = 1/\det A$, because $\det(A)\det(A^{-1}) = \det(I) = 1$, and they explain why $\det(A^{k}) = (\det A)^{k}$. Scaling is where most marks are lost: multiplying *one* row by $k$ multiplies the determinant by $k$, but multiplying the *whole matrix* by $k$ scales all $n$ rows, so $\det(kA) = k^{n}\det A$ — the exponent is the order of the matrix, not a constant. A triangular (or diagonal) matrix has determinant equal to the product of its diagonal entries, since expansion along the first row kills every off-diagonal term in turn. If two rows are equal or one row is a multiple of another, the determinant is zero; swapping two rows flips its sign, and adding a multiple of one row to another leaves it unchanged — which is exactly why row reduction computes determinants so cheaply.

**Minor, cofactor, adjugate, inverse.** The adjugate is the transpose of the cofactor matrix:
$$\mathrm{adj}(A)_{ij} = C_{ji}$$
It exists for every square matrix whether or not $A$ is invertible, and it satisfies the identity:
$$A\,\mathrm{adj}(A) = \mathrm{adj}(A)\,A = (\det A)I$$
This identity is the single most useful check in this topic because it is a direct multiplication you can do by hand. When $\det A \neq 0$ the identity divides to give $A^{-1} = \mathrm{adj}(A)/\det A$. For $2\times2$ this reduces to the swap-and-negate shortcut: interchange the diagonal entries, negate the off-diagonal ones, and divide by $ad-bc$. Gauss-Jordan inversion avoids cofactors entirely — form $[\,A \mid I\,]$ and row-reduce until the left block is $I$; the right block is then $A^{-1}$. Gauss-Jordan is $O(n^{3})$ and is the practical method beyond $3\times3$, while the adjugate formula is $O(n!)$ naive and is kept for theory and for tiny matrices.

**Rank is the number of pivots, and rank deficiency is a zero determinant.** The rank of $A$ is the number of non-zero rows in its reduced row-echelon form, equivalently the number of pivot columns, equivalently the largest number of linearly independent rows (or columns). For an $n\times n$ matrix, $\det A = 0$ is *equivalent* to $\mathrm{rank}(A) < n$ — the same statement as 'the rows are dependent', 'the columns are dependent', 'the map is not invertible', and '$A\mathbf{x} = \mathbf{0}$ has a non-trivial solution'. That equivalence is the bridge to Cramer's rule and to eigenvalues: singularity is a determinant condition, not a separate idea. Rank also counts the real degrees of freedom: an $n$-variable system whose coefficient matrix has rank $r$ has $n - r$ free variables, so a rank-deficient square system either has infinitely many solutions or none.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Cofactor expansion along row i | $\det A = \sum_{j=1}^{n} a_{ij}C_{ij},\qquad C_{ij}=(-1)^{i+j}M_{ij}$ | Expand along the row or column with the most zeros; the answer is independent of that choice. $M_{ij}$ is the minor after deleting row i and column j. |
| Sarrus rule for 3x3 | $\det A = (a_{11}a_{22}a_{33}+a_{12}a_{23}a_{31}+a_{13}a_{21}a_{32})-(a_{13}a_{22}a_{31}+a_{11}a_{23}a_{32}+a_{12}a_{21}a_{33})$ | 3x3 ONLY. Extending the diagonal trick to 4x4 gives a wrong number with no warning. |
| 2x2 determinant | $\det\begin{pmatrix} a & b \\ c & d \end{pmatrix}=ad-bc$ | Subtract the anti-diagonal product; the order matters for the sign. |
| Product law | $\det(AB)=\det A\det B$ | Same-size square matrices. Consequence: $\det(A^{-1})=1/\det A$ and $\det(A^{k})=(\det A)^{k}$. |
| Transpose law | $\det(A^{T})=\det A$ | Rows and columns are interchangeable, so every row statement has a column twin. |
| Scaling law | $\det(kA)=k^{n}\det A$ | n is the ORDER of the matrix. For a 2x2, det(3A) = 9 det A, not 3 det A. |
| Triangular determinant | $\det A = a_{11}a_{22}\cdots a_{nn}$ | Applies to upper triangular, lower triangular and diagonal matrices. One zero on the diagonal makes the determinant zero. |
| Adjugate identity | $A\,\mathrm{adj}(A)=(\det A)I$ | True for every square matrix, singular included. This is the fastest hand check that your cofactors are right. |
| Inverse from the adjugate | $A^{-1}=\frac{1}{\det A}\mathrm{adj}(A),\qquad \mathrm{adj}(A)_{ij}=C_{ji}$ | Requires det A not equal to zero. The transpose is inside adj by construction; transposing twice is the classic error. |
| 2x2 inverse shortcut | $\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1}=\frac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$ | Swap the diagonal, negate the off-diagonal, divide by the determinant. Valid only for 2x2. |
| Gauss-Jordan inversion | $[\,A \mid I\,]\xrightarrow{\mathrm{row\ ops}}[\,I \mid A^{-1}\,]$ | If the left block cannot reach I because a row goes to zero, det A = 0 and no inverse exists. |
| Rank and singularity | $\det A=0\iff \mathrm{rank}(A)<n\iff A\mathbf{x}=\mathbf{0}\ \mathrm{has}\ \mathbf{x}\neq\mathbf{0}$ | Rank = number of pivots = number of independent rows. A rank-n square matrix is invertible. |

## Worked Problems

### P1. Evaluate $\det A$ for $A=\begin{pmatrix} 2 & 1 & 3 \\ 1 & 3 & 2 \\ 3 & 0 & 1 \end{pmatrix}$ by the Sarrus rule and confirm it by cofactor expansion along the third column.

**Given:** A is 3x3 with rows (2,1,3), (1,3,2), (3,0,1)

**Solution:**

1. Downward diagonals: (2)(3)(1) + (1)(2)(3) + (3)(1)(0) = 6 + 6 + 0 = 12
2. Upward diagonals: (3)(3)(3) + (2)(2)(0) + (1)(1)(1) = 27 + 0 + 1 = 28
3. det A = 12 - 28 = -16
4. Cofactor check along column 3: C13 = +(1*0 - 3*3) = -9, C23 = -(2*0 - 1*3) = +3, C33 = +(2*3 - 1*1) = +5
5. det A = 3(-9) + 2(3) + 1(5) = -27 + 6 + 5 = -16

> [!success]- Answer
> **$\det A = -16$**

> [!warning] Trap
> Sign-reversing Sarrus. Taking the downward diagonals as the negative set gives $+16$, and the error is invisible in the magnitude. Anchor the pattern on the main diagonal $a_{11}a_{22}a_{33}$ being positive.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`, define `MatA` = [[2,1,3],[1,3,2],[3,0,1]], then `Apps` `Det` `MatA` → **-16**.
> 2. Cofactor cross-check on one chain: `3×(-9) + 2×3 + 1×5` → **-16**, the same value along column 3.
>
> `Det` carries no diagonal-sign convention to invert, so the $+16$ Sarrus slip cannot happen.

### P2. For $A=\begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}$ find $\det A$ and $\det(3A)$.

**Given:** A is 2x2: rows (4,2) and (1,3); scalar k = 3

**Solution:**

1. det A = (4)(3) - (1)(2) = 12 - 2 = 10
2. A is 2x2 so n = 2 and det(kA) = k^2 det A
3. det(3A) = 3^2 (10) = 9(10) = 90
4. Direct check: 3A = ((12,6),(3,9)), det = (12)(9) - (3)(6) = 108 - 18 = 90

> [!success]- Answer
> **$\det A = 10$ and $\det(3A) = 90$**

> [!warning] Trap
> Writing $\det(3A) = 3\det A = 30$. Every one of the $n$ rows is scaled, so the factor is $k^{n}$; for a 2x2 that is 9, for a 3x3 it would be 27.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`, define `MatA` = [[4,2],[1,3]], `Apps` `Det` `MatA` → **10**.
> 2. `3` `×` `MatA` `STO` `MatB`, then `Apps` `Det` `MatB` → **90** = $3^2\det A$, while `3×10` → **30** is the forbidden value.
>
> The scaling law needs $k^n$; the matrix routine scales all four entries whether you intend it or not.

### P3. Find $A^{-1}$ for $A=\begin{pmatrix} 2 & 1 & 3 \\ 1 & 3 & 2 \\ 3 & 0 & 1 \end{pmatrix}$ using the adjugate, and verify with the adjugate identity.

**Given:** A as above; det A = -16 from the previous problem

**Solution:**

1. Cofactors of row 1: C11 = +(3*1 - 2*0) = 3, C12 = -(1*1 - 2*3) = 5, C13 = +(1*0 - 3*3) = -9
2. Cofactors of row 2: C21 = -(1*1 - 3*0) = -1, C22 = +(2*1 - 3*3) = -7, C23 = -(2*0 - 1*3) = 3
3. Cofactors of row 3: C31 = +(1*2 - 3*3) = -7, C32 = -(2*2 - 3*1) = -1, C33 = +(2*3 - 1*1) = 5
4. Adjugate = transpose of the cofactor matrix: adj(A) = ((3,-1,-7),(5,-7,-1),(-9,3,5))
5. Check A adj(A) = -16 I; every diagonal entry is -16 and every off-diagonal entry is 0
6. A^-1 = adj(A)/det A = (1/16)((-3,1,7),(-5,7,1),(9,-3,-5))

> [!success]- Answer
> **$A^{-1}=\frac{1}{16}\begin{pmatrix} -3 & 1 & 7 \\ -5 & 7 & 1 \\ 9 & -3 & -5 \end{pmatrix}$**

> [!warning] Trap
> Forgetting to transpose the cofactor matrix. Using the cofactor matrix itself as the adjugate gives $A^{-1}=\frac{1}{16}\begin{pmatrix}-3&-5&9\\1&7&-3\\7&1&-5\end{pmatrix}$, which is not an inverse at all and is caught immediately by checking $A A^{-1}=I$.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `MODE` `7`, define `MatA` as in P1, `Apps` `Inv` `MatA` → row 1 reads **-0.1875, 0.0625, 0.4375**.
> 2. `F-D` on **0.0625** → **1/16**, and `Apps` `Det` `MatA` → **-16**: the inverse is the adjugate over $-16$.
> 3. Identity check: `MatA × Inv(MatA)` → the 3×3 identity, so the transpose was not missed.
>
> Row 1 of $\mathrm{adj}(A)$ is column 1 of the cofactor matrix; the identity product is the only proof needed.

### P4. Find the rank of $N=\begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 6 & 8 \\ 1 & 0 & 1 & 2 \end{pmatrix}$ and state how many free variables its homogeneous system has.

**Given:** N is 3x4; rows (1,2,3,4), (2,4,6,8), (1,0,1,2)

**Solution:**

1. The second row is exactly 2 times the first row, so it is dependent and will reduce to a zero row
2. R2 - 2R1 = (0,0,0,0); R3 - R1 = (0,-2,-2,-2)
3. Divide the new third row by -2: (0,1,1,1), which is a pivot row
4. Pivots: column 1 from row 1 and column 2 from the reduced row 3, so rank = 2
5. There are 4 variables and rank 2, so the homogeneous system has 4 - 2 = 2 free variables

> [!success]- Answer
> **$\mathrm{rank}(N)=2$; the homogeneous system has 2 free variables**

> [!warning] Trap
> Counting non-zero rows of the original matrix and answering 3, because 3 is also the number of rows and looks plausible. Rank counts pivots after reduction, not rows before it, and it can never exceed the smaller dimension.

### P5. Find every value of $k$ that makes $M=\begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 1 \\ k & 1 & 3 \end{pmatrix}$ singular.

**Given:** M depends on the parameter k; singular means det M = 0

**Solution:**

1. Cofactor expansion along row 1: det M = 1(4*3 - 1*1) - 2(2*3 - 1*k) + 3(2*1 - 4k)
2. = (12 - 1) - (12 - 2k) + (6 - 12k)
3. = 11 - 12 + 2k + 6 - 12k = 5 - 10k
4. Set 5 - 10k = 0, so k = 1/2
5. Check at k = 0.5 by substitution: det M = 1(12 - 1) - 2(6 - 0.5) + 3(2 - 2) = 11 - 11 + 0 = 0, so the rows are linearly dependent and det M = 0

> [!success]- Answer
> **$M$ is singular for $k=\frac{1}{2}$ (and only there)**

> [!warning] Trap
> Setting only a diagonal product to zero and answering $k=0$. At $k=0$ the determinant is $5$, and the matrix is perfectly invertible. Singularity is the *whole* determinant vanishing, never a single entry.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Key the row-1 cofactor expression in `X`: `1×(4×3-1×1) - 2×(2×3-1×X) + 3×(2×1-4×X)`.
> 2. `SHIFT` `SOLVE` with guess 0 → `X` = **0.5**, and the `L-R` residual reads **0**.
> 3. The trap value: at `X = 0` the same expression is **5**, not 0 — one zero entry never makes a matrix singular.
>
> The expression is $5-10k$, so the singular set is the single value $k = 1/2$.

## Traps & Exam Notes

- **Using $\det(kA) = k\det A$.** Scaling an $n\times n$ matrix scales $n$ rows, so the factor is $k^{n}$: $\det(3A)=9\det A$ for a 2x2 and $27\det A$ for a 3x3. Multiplying only one row by $k$ is the case where the factor really is $k$.
- **Transposing the adjugate wrongly, or not at all.** $\mathrm{adj}(A)_{ij}=C_{ji}$. Using the cofactor matrix directly produces a plausible-looking matrix that fails $A A^{-1}=I$.
- **Extending Sarrus past 3x3.** The diagonal shortcut is a 3x3 coincidence. Applying it to a 4x4 gives a number with no relationship to the determinant.
- **Cofactor sign slips.** The checkerboard is $+,-,+$ along the first row. Forgetting the $(-1)^{i+j}$ on just one term flips the determinant's sign ($-16$ becomes $+16$ for the matrix above).
- **Reading rank off the unreduced matrix.** Rank is the pivot count in row-echelon form. A visibly dependent row must be eliminated first, and rank never exceeds $\min(\mathrm{rows},\mathrm{columns})$.
- **Assuming a matrix with no zero entries is invertible.** Invertibility is decided by $\det A\neq0$ alone. $\begin{pmatrix}1&2\\2&4\end{pmatrix}$ has no zero entry and determinant zero — it is singular.

## See Also

- [[17_Cramer’s_Rule_and_Linear_Systems]]
- [[18_Eigenvalues_and_Eigenvectors]]

---

[[15_Legendre_Polynomials|⬅ 15]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[17_Cramer’s_Rule_and_Linear_Systems|17 ➡]]
