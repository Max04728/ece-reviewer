---
id: MATH-07-07
title: "Z Transform Theorems and Pairs"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[06_Z_Transform_Definition_and_ROC]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Z Transform Theorems and Pairs

> [!abstract] Scope
> Apply the shift, scaling, differentiation, reversal and convolution theorems, and use the initial- and final-value theorems on a causal transform.

## Core Concept

> [!tip] Intuition
> Every $z$-transform theorem is a statement about one operation in the time domain translated into one operation in the $z$ domain. Learn the pairing and most transform problems become algebra instead of summation.

**Linearity and the shift theorem.** $a x_1[n]+b x_2[n]\leftrightarrow aX_1(z)+bX_2(z)$ with the ROC at least the intersection of the two. A delay multiplies by $z^{-k}$: $x[n-k]\leftrightarrow z^{-k}X(z)$, ROC unchanged except that $z=0$ or $z=\infty$ may enter or leave. The direction is easy to invert by mistake — a *delay* (later in time) is $z^{-k}$, an *advance* is $z^{+k}$.

**Scaling, differentiation and reversal.** $a^{n}x[n]\leftrightarrow X(z/a)$: multiplying by an exponential in time scales the $z$-plane by $a$, so poles at $p_i$ move to $ap_i$ and the ROC radius scales by $\lvert a\rvert$. Multiplication by $n$ is differentiation in $z$:
$$n x[n]\leftrightarrow -z\dfrac{dX}{dz}$$
— the minus sign is part of the theorem. Time reversal gives $x[-n]\leftrightarrow X(1/z)$ with the ROC inverted to $1/r_2<\lvert z\rvert<1/r_1$.

**Convolution and accumulation.** $x[n]*h[n]\leftrightarrow X(z)H(z)$ is the theorem that makes $z$-transforms worth the trouble: convolution becomes multiplication, exactly as Laplace does for the CT case. Accumulation is convolution with a step:
$$\sum_{k=-\infty}^{n}x[k]\leftrightarrow \dfrac{X(z)}{1-z^{-1}}$$
with the ROC outside $\lvert z\rvert=1$ added.

**Initial and final value.** For a causal $x[n]$ (zero for $n<0$), $x[0]=\lim_{z\to\infty}X(z)$. And if all poles of $(z-1)X(z)$ lie inside the unit circle — equivalently, all poles of $X(z)$ are inside the unit circle except possibly a simple pole at $z=1$ — the final value is:
$$\lim_{n\to\infty}x[n]=\lim_{z\to1}(z-1)X(z)$$
The final-value theorem is a *stability-gated* statement: applying it to a transform with a pole outside the unit circle returns a finite number that has nothing to do with the (divergent) sequence.

**Reading asymptotes with the theorems.** The initial-value theorem sees the leading coefficient of the power series; the final-value theorem sees the residue at $z=1$, i.e. the DC gain of the system when the input is a step. Together they let you check a partial-fraction answer at both ends without inverting anything: $x[0]$ from the high-frequency limit, $x[\infty]$ from the low-frequency limit. A common board exercise gives $X(z)$ and asks for both, and the arithmetic is a two-line limit.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Linearity | $a x_1[n] + b x_2[n] \leftrightarrow a X_1(z) + b X_2(z)$ | ROC is at least the intersection of the two ROCs. |
| Time shift (delay) | $x[n-k] \leftrightarrow z^{-k} X(z)$ | A delay is z^{-k}; an advance would be z^{+k}. |
| z-domain scaling | $a^{n} x[n] \leftrightarrow X(z/a)$ | Poles scale to a*p_i and the ROC radius scales by \|a\|. |
| Multiplication by n | $n x[n] \leftrightarrow -z\frac{dX(z)}{dz}$ | The minus sign is easy to drop; check with n a^n u[n]. |
| Time reversal | $x[-n] \leftrightarrow X(1/z)$ | ROC inverts: r1 < \|z\| < r2 becomes 1/r2 < \|z\| < 1/r1. |
| Convolution | $x[n] * h[n] \leftrightarrow X(z)H(z)$ | ROC contains the intersection of the two ROCs. |
| Accumulation | $\sum_{k=-\infty}^{n} x[k] \leftrightarrow \frac{X(z)}{1-z^{-1}}$ | Adds a pole at z = 1, so the ROC gains \|z\| > 1. |
| Initial value | $x[0] = \lim_{z\to\infty} X(z)$ | Causal sequences only (x[n] = 0 for n < 0). |
| Final value | $\lim_{n\to\infty} x[n] = \lim_{z\to1} (z-1)X(z)$ | Requires all poles inside the unit circle except a simple pole at z = 1. |
| Exponential pair | $a^{n}u[n] \leftrightarrow \frac{1}{1-az^{-1}},\ \lvert z \rvert > \lvert a \rvert$ | The base pair; nearly every other pair is derived from it. |
| Ramped exponential pair | $n a^{n}u[n] \leftrightarrow \frac{a z^{-1}}{(1-az^{-1})^{2}}$ | Derived from the base pair with -z dX/dz. |
| Sinusoid pairs | $\cos(\Omega n)u[n] \leftrightarrow \frac{1-\cos\Omega\, z^{-1}}{1-2\cos\Omega\,z^{-1}+z^{-2}}$ | Comes from combining e^{j Omega n} and e^{-j Omega n} pairs. |

## Worked Problems

### P1. Find the $z$-transform of $x[n]=\left(\dfrac12\right)^{n-2}u[n-2]$.

**Given:** x[n] = (1/2)^(n-2) u[n-2]

**Solution:**

1. Let $y[n]=\left(\dfrac12\right)^{n}u[n]$, whose transform is $Y(z)=\dfrac{1}{1-0.5z^{-1}}$, ROC $\lvert z\rvert>0.5$
2. Then $x[n]=y[n-2]$, a delay of 2
3. Shift theorem: $X(z)=z^{-2}Y(z)$
4. $X(z) = \dfrac{z^{-2}}{1-0.5z^{-1}}$, ROC $\lvert z\rvert>0.5$
5. Check: $x[2]=(1/2)^{0}=1$, and $x[2]$ is the coefficient of $z^{-2}$ in the expansion, which is 1 ✓

> [!success]- Answer
> **$X(z)=\dfrac{z^{-2}}{1-0.5z^{-1}}$, ROC $\lvert z\rvert>0.5$.**

> [!warning] Trap
> Using $z^{+2}$ for the delay. A delay multiplies by $z^{-k}$; the exponent must have the same sign as the shift direction in the time index.

### P2. Use the differentiation theorem to find the $z$-transform of $x[n]=n\left(\dfrac13\right)^{n}u[n]$.

**Given:** x[n] = n (1/3)^n u[n]

**Solution:**

1. Start from $g[n]=\left(\dfrac13\right)^{n}u[n]$, $G(z)=\dfrac{1}{1-\frac13z^{-1}}=\dfrac{z}{z-\frac13}$
2. Theorem: $n g[n]\leftrightarrow -z\dfrac{dG}{dz}$
3. $\dfrac{dG}{dz} = \dfrac{(z-\frac13)-z}{(z-\frac13)^2} = \dfrac{-\frac13}{(z-\frac13)^2}$
4. $-z\dfrac{dG}{dz} = \dfrac{\frac13 z}{(z-\frac13)^2} = \dfrac{\frac13 z^{-1}}{(1-\frac13z^{-1})^2}$
5. Matches the standard pair $a^{n}nu[n]\leftrightarrow \dfrac{az^{-1}}{(1-az^{-1})^2}$ with $a=\dfrac13$ ✓

> [!success]- Answer
> **$X(z)=\dfrac{\frac13 z^{-1}}{(1-\frac13z^{-1})^{2}}$, ROC $\lvert z\rvert>\dfrac13$.**

> [!warning] Trap
> Writing $+z\,dX/dz$ and getting a negative-going transform, or omitting the factor $a$ in the numerator. The pair is $az^{-1}/(1-az^{-1})^2$; leaving out $a$ is the standard slip.

### P3. Find the $z$-transform of $x[n]=\left(\dfrac12\right)^{n}u[n]*\left(\dfrac12\right)^{n}u[n]$ and hence the time-domain sequence.

**Given:** convolution of two identical decaying exponentials

**Solution:**

1. Each factor: $\dfrac{1}{1-0.5z^{-1}}$ with ROC $\lvert z\rvert>0.5$
2. Convolution theorem: $X(z) = \dfrac{1}{(1-0.5z^{-1})^2}$, ROC $\lvert z\rvert>0.5$
3. This is the standard pair for $(n+1)a^{n}u[n]$ with $a=0.5$
4. $x[n] = (n+1)(0.5)^{n}u[n]$
5. Check $n=0$: $x[0]=1$ (the convolution of two 1-valued sequences at $n=0$); $n=1$: $x[1]=2(0.5)=1$, while the direct sum gives $0.5+0.5=1$ ✓

> [!success]- Answer
> **$X(z)=\dfrac{1}{(1-0.5z^{-1})^{2}}$ and $x[n]=(n+1)(0.5)^{n}u[n]$.**

> [!warning] Trap
> Answering $x[n]=(0.5)^{n}u[n]$ by squaring the time-domain sequence. Convolution in time is multiplication of transforms, and the inverse of a squared transform is the ramped sequence, not the square.

### P4. For $X(z)=\dfrac{1}{(1-z^{-1})(1-0.5z^{-1})}$ with ROC $\lvert z\rvert>1$, find $x[0]$ and $\lim_{n\to\infty}x[n]$ without inverting the transform.

**Given:** X(z) = 1/((1-z^-1)(1-0.5z^-1)); ROC |z| > 1

**Solution:**

1. Rewrite in positive powers: $X(z) = \dfrac{z^2}{(z-1)(z-0.5)}$
2. Initial value: $x[0] = \lim_{z\to\infty}\dfrac{z^2}{(z-1)(z-0.5)} = 1$
3. Final value: $\lim_{z\to1}(z-1)X(z) = \lim_{z\to1}\dfrac{(z-1)z^2}{(z-1)(z-0.5)} = \dfrac{1}{0.5} = 2$
4. Eligibility check: the only pole outside the unit circle would be $z=1$, and it is simple; the other pole $z=0.5$ is inside, so the theorem applies
5. Confirm by inverting: $x[n] = (2-(0.5)^{n})u[n]$, giving $x[0]=1$ and $x[\infty]=2$ ✓

> [!success]- Answer
> **$x[0]=1$ and $\lim_{n\to\infty}x[n]=2$.**

> [!warning] Trap
> Evaluating $X(1)$ instead of $\lim_{z\to1}(z-1)X(z)$ and reporting an infinite or undefined value. The $(z-1)$ factor cancels the pole; the limit is the residue at $z=1$.

### P5. Given $g[n]=\left(\dfrac12\right)^{n}u[n]$ with $G(z)=\dfrac{1}{1-0.5z^{-1}}$, use the scaling theorem to find the transform of $y[n]=\left(\dfrac12\right)^{n}g[n]$.

**Given:** g[n] = (1/2)^n u[n]; y[n] = (1/2)^n g[n]

**Solution:**

1. Scaling theorem: $a^{n}g[n]\leftrightarrow G(z/a)$ with $a=\dfrac12$
2. $G(z/a) = \dfrac{1}{1-0.5\left(\dfrac{z}{0.5}\right)^{-1}}$
3. $\left(\dfrac{z}{0.5}\right)^{-1} = \dfrac{0.5}{z}$
4. $G(z/0.5) = \dfrac{1}{1-0.5(0.5/z)} = \dfrac{1}{1-0.25z^{-1}}$
5. Sanity check: $y[n]=(0.25)^{n}u[n]$, whose transform is indeed $\dfrac{1}{1-0.25z^{-1}}$ ✓

> [!success]- Answer
> **$Y(z)=\dfrac{1}{1-0.25z^{-1}}$, ROC $\lvert z\rvert>0.25$.**

> [!warning] Trap
> Substituting $z\to az$ instead of $z\to z/a$. The theorem is $a^{n}x[n]\leftrightarrow X(z/a)$; the reciprocal argument maps a pole at $p$ to $ap$, which is the direction that matches multiplying the time sequence by $a^n$.

## Traps & Exam Notes

- **Sign error in the shift.** $x[n-k]\leftrightarrow z^{-k}X(z)$; using $z^{+k}$ inverts the delay into an advance.
- **Dropping the minus sign in $-z\,dX/dz$.** Check any answer against the known pair $na^nu[n]\leftrightarrow az^{-1}/(1-az^{-1})^2$.
- **Scaling the argument the wrong way.** $a^n x[n]\leftrightarrow X(z/a)$, not $X(az)$.
- **Applying the final-value theorem to an unstable transform.** If $X(z)$ has a pole outside the unit circle (other than a simple pole at $z=1$), the sequence diverges and the limit returned by the formula is meaningless.
- **Evaluating $X(1)$ for the final value.** The theorem needs $(z-1)X(z)$; the factor is what removes the step's pole.
- **Assuming the initial-value theorem always applies.** It requires causality ($x[n]=0$ for $n<0$); for a two-sided sequence the high-frequency limit tells you nothing about $x[0]$.
- **Using convolution where pointwise multiplication is meant.** $x[n]h[n]\leftrightarrow$ a contour integral, not $X(z)H(z)$; only *convolution* maps to multiplication.
- **Ignoring the ROC bookkeeping when the theorem changes it.** Scaling, reversal and accumulation all change the ROC; forgetting that can turn a stable transform into an unstable one on paper.

## See Also

- [[06_Z_Transform_Definition_and_ROC]]
- [[08_Inverse_Z_Transform]]
- [[09_Difference_Equations_and_Stability]]

---

[[06_Z_Transform_Definition_and_ROC|⬅ 06]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Inverse_Z_Transform|08 ➡]]
