---
id: MATH-07-08
title: "Inverse Z Transform"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Z_Transform_Theorems_and_Pairs]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Inverse Z Transform

> [!abstract] Scope
> Recover a discrete-time sequence from its $z$-transform by partial fractions, power-series division or residues, choosing the side of each term from the ROC.

## Core Concept

> [!tip] Intuition
> Inversion is a table lookup plus bookkeeping. Split the fraction into one term per pole, look each term up in the pair table, and let the ROC decide whether each term is a right-sided $u[n]$ or a left-sided $u[-n-1]$.

**The method that always works: partial fractions.** For a rational $X(z)$ with distinct poles, expand $\dfrac{X(z)}{z}$ (not $X(z)$) in partial fractions, then multiply back by $z$. This guarantees each term has the form $\dfrac{A z}{z-p}=\dfrac{A}{1-pz^{-1}}$, which is directly in the pair table. Expanding $X(z)$ itself often produces terms like $\dfrac{A}{z-p}$, which are off by one power of $z$ and lead to the answer being shifted by one sample.

**Choosing the side of each term from the ROC.** A term $\dfrac{A}{1-pz^{-1}}$ with $\lvert z\rvert>\lvert p\rvert$ in the ROC contributes $A p^{n}u[n]$ (right-sided). The same term with $\lvert z\rvert<\lvert p\rvert$ contributes $-A p^{n}u[-n-1]$ (left-sided). For an annulus $r_1<\lvert z\rvert<r_2$, poles *inside* $r_1$ give right-sided terms and poles *outside* $r_2$ give left-sided terms — an annulus ROC therefore always yields a two-sided sequence.

**Repeated poles.** A repeated factor $(1-az^{-1})^{k}$ needs all the lower-order terms: for $k=2$, both $\dfrac{A}{1-az^{-1}}$ and $\dfrac{B}{(1-az^{-1})^{2}}$, and the second inverts to $(n+1)a^{n}u[n]$ (or its left-sided partner). Treating a double pole as two simple poles gives the wrong sequence even when the coefficients look right.

**Power-series (long division) inversion.** When the ROC is $\lvert z\rvert>r$ (causal), divide the numerator by the denominator in powers of $z^{-1}$; the coefficient of $z^{-n}$ in the quotient is $x[n]$. For an anti-causal ROC, divide in powers of $z$ instead — the division direction must match the ROC, or the series will not converge in the stated region. Long division is exact for the first few samples and is the fastest route when a problem asks only for $x[0],x[1],x[2]$.

**Residues.** The residue formula is:
$$x[n]=\sum\mathrm{Res}\left[X(z)z^{n-1}\right]$$
over the poles enclosed by a contour inside the ROC. The $z^{n-1}$ (not $z^{n}$) is the part students forget; with it, $X(z)=\dfrac{z}{z-0.5}$ inside a contour enclosing $z=0.5$ gives the sequence:
$$x[n]=\mathrm{Res}\left[\dfrac{z^{n}}{z-0.5}\right]_{z=0.5}=0.5^{n}$$
The residue method is the only practical one for complicated poles, and it makes the ROC bookkeeping automatic: the contour sits in the ROC, so it encloses exactly the poles that produce right-sided terms.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Right-sided exponential | $\frac{A}{1-pz^{-1}},\ \lvert z \rvert > \lvert p \rvert \ \leftrightarrow\ A p^{n}u[n]$ | The default causal term when the ROC is outside the pole. |
| Left-sided exponential | $\frac{A}{1-pz^{-1}},\ \lvert z \rvert < \lvert p \rvert \ \leftrightarrow\ -A p^{n}u[-n-1]$ | Same algebra, opposite time direction, and a minus sign. |
| Repeated pole pair | $\frac{1}{(1-az^{-1})^{2}} \leftrightarrow (n+1)a^{n}u[n]$ | Right-sided case. The extra factor is n+1, not n. |
| Partial-fraction recipe | $\mathrm{expand}\ \frac{X(z)}{z},\ \mathrm{then\ multiply\ by}\ z$ | Guarantees every term is of the table form A/(1-pz^-1). |
| Long division (causal) | $X(z) = \sum_{n\ge0} x[n] z^{-n}\ \mathrm{for}\ \lvert z \rvert > r$ | Divide in powers of z^-1; read coefficients directly. |
| Long division (anti-causal) | $X(z) = \sum_{n<0} x[n] z^{-n}\ \mathrm{for}\ \lvert z \rvert < r$ | Divide in powers of z; the coefficients come out as negative-index samples. |
| Residue formula | $x[n] = \sum \mathrm{Res}\left[X(z) z^{n-1}\right]$ | Sum over the poles inside a contour lying in the ROC. Note z^{n-1}. |
| Simple-pole residue | $\mathrm{Res} = \lim_{z\to p}(z-p)X(z)z^{n-1}$ | For a first-order pole at z = p. |
| Two-sided annulus | $r_1 < \lvert z \rvert < r_2$ | Poles inside r1 give u[n] terms; poles outside r2 give u[-n-1] terms. |
| Synthesis check | $x[0] = \lim_{z\to\infty} X(z),\ \lim_{n\to\infty}x[n] = \lim_{z\to1}(z-1)X(z)$ | Causal case only. Use it to catch a shifted answer. |

## Worked Problems

### P1. Find $x[n]$ for $X(z)=\dfrac{1}{(1-0.5z^{-1})(1-0.25z^{-1})}$ with ROC $\lvert z\rvert>0.5$.

**Given:** X(z) = 1/((1-0.5z^-1)(1-0.25z^-1)); ROC |z| > 0.5

**Solution:**

1. ROC is outside both poles, so the sequence is causal
2. Expand $\dfrac{X(z)}{z} = \dfrac{z}{(z-0.5)(z-0.25)} = \dfrac{A}{z-0.5}+\dfrac{B}{z-0.25}$
3. $A = \dfrac{0.5}{0.5-0.25} = 2$ and $B = \dfrac{0.25}{0.25-0.5} = -1$
4. $X(z) = \dfrac{2z}{z-0.5}-\dfrac{z}{z-0.25} = \dfrac{2}{1-0.5z^{-1}}-\dfrac{1}{1-0.25z^{-1}}$
5. Both terms are right-sided: $x[n]=\left[2(0.5)^{n}-(0.25)^{n}\right]u[n]$
6. Checks: $x[0]=2-1=1$ ✓ (initial value $\lim_{z\to\infty}X(z)=1$); $x[1]=1-0.25=0.75$; recursion gives $x[1]=0.75x[0]=0.75$ ✓
7. $x[2] = 2(0.25)-0.0625 = 0.4375$; recursion gives $0.75(0.75)-0.125(1)=0.4375$ ✓

> [!success]- Answer
> **$x[n]=\left[2(0.5)^{n}-(0.25)^{n}\right]u[n]$.**

> [!warning] Trap
> Expanding $X(z)$ directly instead of $X(z)/z$. The direct expansion gives terms $\dfrac{A}{z-p}$, which invert to $Ap^{n-1}u[n-1]$ — an answer shifted by one sample.

### P2. The same $X(z)=\dfrac{1}{(1-0.5z^{-1})(1-0.25z^{-1})}$ now has ROC $0.25<\lvert z\rvert<0.5$. Find $x[n]$.

**Given:** same X(z); ROC 0.25 < |z| < 0.5

**Solution:**

1. Keep the same partial fractions: $X(z)=\dfrac{2}{1-0.5z^{-1}}-\dfrac{1}{1-0.25z^{-1}}$
2. The ROC lies *inside* the pole at 0.5, so that term is left-sided: $\dfrac{2}{1-0.5z^{-1}}\to -2(0.5)^{n}u[-n-1]$
3. The ROC lies *outside* the pole at 0.25, so that term is right-sided: $-\dfrac{1}{1-0.25z^{-1}}\to -(0.25)^{n}u[n]$
4. $x[n] = -2(0.5)^{n}u[-n-1]-(0.25)^{n}u[n]$
5. Check $x[0]$: the left-sided term is zero at $n=0$, the right-sided term gives $-1$, so $x[0]=-1$
6. Residue cross-check: $x[0]=\mathrm{Res}\left[\dfrac{z}{(z-0.5)(z-0.25)}\right]_{z=0.25} = \dfrac{0.25}{0.25-0.5} = -1$ ✓

> [!success]- Answer
> **$x[n]=-2(0.5)^{n}u[-n-1]-(0.25)^{n}u[n]$ — a two-sided sequence.**

> [!warning] Trap
> Reporting the causal answer twice. An annulus ROC always produces a two-sided sequence: each term's direction is decided by whether its pole lies inside the inner radius or outside the outer radius.

### P3. Find $x[n]$ for $X(z)=\dfrac{1}{(1-0.5z^{-1})^{2}}$ with ROC $\lvert z\rvert>0.5$.

**Given:** X(z) = 1/(1-0.5z^-1)^2; ROC |z| > 0.5

**Solution:**

1. The pole at $z=0.5$ is repeated (order 2), so this is not two simple poles
2. Standard pair: $\dfrac{1}{(1-az^{-1})^{2}}\leftrightarrow(n+1)a^{n}u[n]$
3. With $a=0.5$: $x[n]=(n+1)(0.5)^{n}u[n]$
4. Check $x[0]=1$ and $\lim_{z\to\infty}X(z)=1$ ✓
5. $x[1]=2(0.5)=1$; long division of $1/(1-z^{-1}+0.25z^{-2})$ gives $1+z^{-1}+0.75z^{-2}+\dots$, so $x[2]=0.75$, matching $3(0.25)=0.75$ ✓

> [!success]- Answer
> **$x[n]=(n+1)(0.5)^{n}u[n]$.**

> [!warning] Trap
> Writing $n(0.5)^{n}u[n]$. The pair with the $n$ factor has an extra $az^{-1}$ in the numerator; for $1/(1-az^{-1})^2$ the multiplier is $n+1$.

### P4. Use long division to find $x[0]$, $x[1]$ and $x[2]$ for $X(z)=\dfrac{1}{1-0.5z^{-1}}$ with ROC $\lvert z\rvert>0.5$.

**Given:** X(z) = 1/(1-0.5z^-1); causal ROC

**Solution:**

1. The ROC is outside the pole, so the sequence is causal and $X(z)=\sum_{n\ge0}x[n]z^{-n}$
2. Divide: $1\div(1-0.5z^{-1}) = 1+0.5z^{-1}+0.25z^{-2}+\dots$
3. Read the coefficients: $x[0]=1$, $x[1]=0.5$, $x[2]=0.25$
4. These match $x[n]=(0.5)^{n}u[n]$
5. Partial fractions would have given the same closed form; long division is used here only because the question asks for three samples

> [!success]- Answer
> **$x[0]=1$, $x[1]=0.5$, $x[2]=0.25$; in general $x[n]=(0.5)^{n}u[n]$.**

> [!warning] Trap
> Dividing in the wrong direction for the stated ROC. Long division in $z^{-1}$ produces the causal series, which is only valid where $\lvert z\rvert>0.5$; for an anti-causal ROC the division must be in powers of $z$.

### P5. Use residues to find $x[n]$ for $X(z)=\dfrac{z}{z-0.5}$ with ROC $\lvert z\rvert>0.5$.

**Given:** X(z) = z/(z-0.5); ROC |z| > 0.5

**Solution:**

1. Residue formula: $x[n]=\sum\mathrm{Res}\left[X(z)z^{n-1}\right]$ over poles inside a contour in the ROC
2. $X(z)z^{n-1} = \dfrac{z\cdot z^{n-1}}{z-0.5} = \dfrac{z^{n}}{z-0.5}$
3. The only enclosed pole is $z=0.5$ (the contour lies just outside it)
4. $x[n] = \lim_{z\to0.5}(z-0.5)\dfrac{z^{n}}{z-0.5} = (0.5)^{n}$ for $n\ge0$
5. For $n<0$ the integrand $z^{n}/(z-0.5)$ has no pole at the origin, so the integral vanishes and $x[n]=(0.5)^{n}u[n]$

> [!success]- Answer
> **$x[n]=(0.5)^{n}u[n]$.**

> [!warning] Trap
> Using $X(z)z^{n}$ instead of $X(z)z^{n-1}$. The exponent is $n-1$ because the inverse transform integral carries a $z^{-1}$; using $n$ introduces a spurious factor of $z$ and shifts or scales the answer.

## Traps & Exam Notes

- **Ignoring the ROC and defaulting to causal.** Every pole term's time direction is decided by the ROC; an annulus gives a two-sided answer.
- **Expanding $X(z)$ instead of $X(z)/z$.** This introduces an off-by-one-sample shift. The safe recipe is: expand $X(z)/z$, then multiply through by $z$.
- **Treating a repeated pole as two simple poles.** A double pole needs the $(n+1)$ (or $n$) multiplier; simple-pole coefficients give the wrong sequence.
- **Missing the minus sign on left-sided terms.** $\lvert z\rvert<\lvert p\rvert$ gives $-Ap^{n}u[-n-1]$, not $+Ap^{n}u[-n-1]$.
- **Dividing in the wrong direction.** Long division in $z^{-1}$ gives the causal series; an anti-causal ROC needs division in $z$.
- **Using $z^{n}$ in the residue formula.** The correct integrand is $X(z)z^{n-1}$.
- **Forgetting the $n=0$ sample check.** $x[0]=\lim_{z\to\infty}X(z)$ for a causal transform is a one-line verification that catches most partial-fraction errors.
- **Dropping a pole at the origin.** A factor $z$ or $z^{-1}$ in the numerator changes the power-series coefficients without changing the visible poles; keep it in the fraction until the expansion is done.

## See Also

- [[06_Z_Transform_Definition_and_ROC]]
- [[07_Z_Transform_Theorems_and_Pairs]]
- [[09_Difference_Equations_and_Stability]]

---

[[07_Z_Transform_Theorems_and_Pairs|⬅ 07]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Difference_Equations_and_Stability|09 ➡]]
