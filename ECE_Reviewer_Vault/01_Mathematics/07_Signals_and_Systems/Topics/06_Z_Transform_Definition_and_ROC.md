---
id: MATH-07-06
title: "Z Transform Definition and ROC"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_Discrete-Time_Convolution]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Z Transform Definition and ROC

> [!abstract] Scope
> Compute the $z$-transform of a sequence from its definition and state the region of convergence that makes the transform unique.

## Core Concept

> [!tip] Intuition
> The $z$-transform is the Laplace transform of a sampled signal, with $z=e^{sT}$. The algebraic expression alone is ambiguous — the same fraction describes a decaying right-sided sequence or a growing left-sided one. The region of convergence is what tells them apart.

**Definition.** The $z$-transform of a sequence is:
$$X(z)=\displaystyle\sum_{n=-\infty}^{\infty}x[n]z^{-n}$$
a power series in $z^{-1}$. It converges only for the set of $z$ where that series is absolutely summable, and that set is the **region of convergence** (ROC). Writing $X(z)$ without its ROC is an incomplete answer — two different sequences share the same rational expression.

**The ROC and sidedness.** For a rational transform the ROC is always bounded by circles centred at the origin and never contains a pole. A **right-sided** (causal-like) sequence has an ROC of the form $\lvert z\rvert>r_{max}$, outside the outermost pole. A **left-sided** sequence has $\lvert z\rvert<r_{min}$, inside the innermost pole. A **two-sided** sequence has an annulus $r_1<\lvert z\rvert<r_2$, and if $r_1>r_2$ (which happens when the right-sided part's outermost pole is larger than the left-sided part's innermost pole) the ROC is empty and **the transform does not exist**. A **finite-length** sequence has the whole $z$-plane as its ROC, except possibly $z=0$ (if the sequence has terms with $n>0$) and $z=\infty$ (if it has terms with $n<0$).

**The two versions of the same fraction.** $\dfrac{1}{1-az^{-1}}$ with $\lvert z\rvert>\lvert a\rvert$ is $a^{n}u[n]$; with $\lvert z\rvert<\lvert a\rvert$ it is $-a^{n}u[-n-1]$. The pole is at $z=a$ either way; only the ROC differs. This is why an inverse-transform question that omits the ROC has no unique answer, and why every $z$-transform question is really two questions.

**Poles, zeros and the causality test.** In $z^{-1}$ form a pole at $z=a$ corresponds to the factor $(1-az^{-1})$ in the denominator; a factor $z^{-1}$ in the numerator is a zero at $z=0$. A causal LTI system is BIBO stable iff its ROC includes the unit circle $\lvert z\rvert=1$ — for a causal system that reduces to 'all poles inside the unit circle'. Do not confuse 'the ROC is outside the outermost pole' (a statement about sidedness) with 'causal' (a statement about $h[n]=0$ for $n<0$): a right-sided sequence may start at $n=-2$ and still have an outside-type ROC.

**Useful pairs.** $\delta[n]\leftrightarrow1$ (all $z$).
$$u[n]\leftrightarrow\dfrac{1}{1-z^{-1}}$$
$\lvert z\rvert>1$.
$$a^{n}u[n]\leftrightarrow\dfrac{1}{1-az^{-1}}$$
$\lvert z\rvert>\lvert a\rvert$.
$$na^{n}u[n]\leftrightarrow\dfrac{az^{-1}}{(1-az^{-1})^2}$$
$\lvert z\rvert>\lvert a\rvert$. The last pair is the one most often mis-remembered, because of the extra factor $a$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Definition | $X(z) = \sum_{n=-\infty}^{\infty} x[n] z^{-n}$ | Converges only on the ROC; the sum is absolutely convergent there. |
| Unit impulse | $\delta[n] \leftrightarrow 1$ | ROC is the entire z-plane. |
| Unit step | $u[n] \leftrightarrow \frac{1}{1-z^{-1}},\quad \lvert z \rvert > 1$ | Pole at z = 1; on the stability boundary, so the system is not BIBO stable. |
| Right-sided exponential | $a^{n}u[n] \leftrightarrow \frac{1}{1-az^{-1}},\quad \lvert z \rvert > \lvert a \rvert$ | ROC outside the pole at z = a. |
| Left-sided exponential | $-a^{n}u[-n-1] \leftrightarrow \frac{1}{1-az^{-1}},\quad \lvert z \rvert < \lvert a \rvert$ | Same algebra, opposite ROC. This is the uniqueness trap. |
| Ramped exponential | $n a^{n}u[n] \leftrightarrow \frac{a z^{-1}}{(1-az^{-1})^{2}},\quad \lvert z \rvert > \lvert a \rvert$ | Note the extra a in the numerator. |
| Delayed impulse | $\delta[n-k] \leftrightarrow z^{-k}$ | Finite sequence; ROC excludes z = 0 when k > 0. |
| ROC of a right-sided sequence | $\lvert z \rvert > r_{max}$ | Outside the outermost pole; may not include the unit circle. |
| ROC of a left-sided sequence | $\lvert z \rvert < r_{min}$ | Inside the innermost pole. |
| ROC of a two-sided sequence | $r_1 < \lvert z \rvert < r_2$ | Empty annulus means the transform does not exist. |
| Stability from the ROC | $\mathrm{BIBO\ stable} \iff \mathrm{ROC\ includes}\ \lvert z \rvert = 1$ | For a causal system this is equivalent to all poles inside the unit circle. |

## Interactive Widget

**Z Plane ROC Map**

![[Z_Plane_ROC_Map.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find the $z$-transform and ROC of $x[n]=\left(\dfrac13\right)^{n}u[n]$, and identify the poles and zeros.

**Given:** x[n] = (1/3)^n u[n]

**Solution:**

1. $X(z) = \sum_{n=0}^{\infty}\left(\dfrac13\right)^{n}z^{-n} = \sum_{n=0}^{\infty}\left(\dfrac{1}{3z}\right)^{n}$
2. Geometric series with ratio $\dfrac{1}{3z}$, converging when $\left\lvert\dfrac{1}{3z}\right\rvert<1$, i.e. $\lvert z\rvert>\dfrac13$
3. $X(z) = \dfrac{1}{1-\frac13 z^{-1}} = \dfrac{z}{z-\frac13}$
4. Pole at $z=\dfrac13$ (inside the unit circle, so the sequence is absolutely summable and the ROC includes $\lvert z\rvert=1$)
5. Zero at $z=0$
6. Initial value check: $x[0]=1$ and $\lim_{z\to\infty}X(z)=1$ ✓

> [!success]- Answer
> **$X(z)=\dfrac{1}{1-\frac13z^{-1}}=\dfrac{z}{z-1/3}$ with ROC $\lvert z\rvert>\dfrac13$; pole at $1/3$, zero at $0$.**

> [!warning] Trap
> Reporting the pole as $z=1/3$ but the zero as $z=1/3$ too (from the $z^{-1}$ form). In $z^{-1}$ notation the numerator is a constant, so the zero sits at $z=0$ after multiplying through by $z$.

### P2. The transform $X(z)=\dfrac{1}{1-\frac13z^{-1}}$ is given with ROC $\lvert z\rvert<\dfrac13$. Find $x[n]$ and explain why the answer differs from the previous problem.

**Given:** X(z) = 1/(1 - (1/3)z^{-1}); ROC |z| < 1/3

**Solution:**

1. The ROC is inside the pole, so the sequence is left-sided
2. Expand in powers of $z$ instead of $z^{-1}$: $\dfrac{1}{1-\frac13z^{-1}} = \dfrac{z}{z-\frac13} = \dfrac{-3z}{1-3z}$
3. $= -3z\sum_{m=0}^{\infty}(3z)^{m} = -\sum_{m=1}^{\infty}\left(\dfrac13\right)^{-m}z^{m}$
4. With $n=-m$: $x[n]=-\left(\dfrac13\right)^{n}$ for $n\le-1$, zero for $n\ge0$
5. $x[n] = -\left(\dfrac13\right)^{n}u[-n-1]$
6. The pole is at the same place; only the ROC (hence the direction) changed, so the sequence changed completely

> [!success]- Answer
> **$x[n]=-\left(\dfrac13\right)^{n}u[-n-1]$, a left-sided sequence growing as $n\to-\infty$.**

> [!warning] Trap
> Answering $\left(\frac13\right)^n u[n]$ from memory of the algebra alone. The identical rational expression corresponds to two different sequences; without the ROC the question is unanswerable.

### P3. Find the $z$-transform, ROC, poles and zeros of $x[n]=\left(\dfrac13\right)^{n}u[n]-\left(\dfrac12\right)^{n}u[-n-1]$.

**Given:** x[n] = (1/3)^n u[n] - (1/2)^n u[-n-1]

**Solution:**

1. First term is right-sided with pole at $z=1/3$: transform $\dfrac{1}{1-\frac13z^{-1}}$, ROC $\lvert z\rvert>\dfrac13$
2. Second term has the form $-a^{n}u[-n-1]$ with $a=1/2$: transform $\dfrac{1}{1-\frac12z^{-1}}$, ROC $\lvert z\rvert<\dfrac12$
3. $X(z) = \dfrac{1}{1-\frac13z^{-1}}+\dfrac{1}{1-\frac12z^{-1}}$
4. ROC is the intersection: $\dfrac13<\lvert z\rvert<\dfrac12$
5. Poles at $z=\dfrac13$ and $z=\dfrac12$; neither lies in the annulus ✓
6. The ROC excludes the unit circle, so this sequence is not absolutely summable

> [!success]- Answer
> **$X(z)=\dfrac{1}{1-\frac13z^{-1}}+\dfrac{1}{1-\frac12z^{-1}}$ with ROC $\dfrac13<\lvert z\rvert<\dfrac12$; poles at $1/3$ and $1/2$.**

> [!warning] Trap
> Taking the union of the two ROCs instead of the intersection. A two-sided sequence's transform converges only where *both* pieces converge, so the annulus must lie strictly inside the smaller radius and outside the larger one.

### P4. Find $X(z)$ and its ROC for $x[n]=\delta[n]+2\delta[n-1]+3\delta[n-2]$.

**Given:** x[n] = delta[n] + 2 delta[n-1] + 3 delta[n-2]

**Solution:**

1. Apply the definition term by term: $\delta[n]\to1$, $\delta[n-1]\to z^{-1}$, $\delta[n-2]\to z^{-2}$
2. $X(z) = 1 + 2z^{-1} + 3z^{-2}$
3. The sequence is finite in length, so the sum converges for every $z$ except where $z^{-n}$ is undefined
4. The terms $z^{-1}$ and $z^{-2}$ diverge at $z=0$, so the ROC is the entire $z$-plane with $z=0$ excluded: $\lvert z\rvert>0$
5. Check: $x[0]=1$ and $\lim_{z\to\infty}X(z)=1$ ✓

> [!success]- Answer
> **$X(z)=1+2z^{-1}+3z^{-2}$, ROC $\lvert z\rvert>0$ (entire plane except the origin).**

> [!warning] Trap
> Reporting the ROC as 'all $z$'. A finite sequence with positive-time terms has a $z^{-k}$ factor, which blows up at $z=0$; only a sequence with terms at negative indices also excludes $z=\infty$.

### P5. For $X(z)=\dfrac{z}{z-0.8}$, give $x[n]$ when the ROC is $\lvert z\rvert>0.8$ and when it is $\lvert z\rvert<0.8$.

**Given:** X(z) = z/(z-0.8)

**Solution:**

1. Rewrite in $z^{-1}$ form: $\dfrac{z}{z-0.8} = \dfrac{1}{1-0.8z^{-1}}$
2. ROC $\lvert z\rvert>0.8$ (outside the pole) → right-sided: $x[n]=(0.8)^{n}u[n]$
3. ROC $\lvert z\rvert<0.8$ (inside the pole) → left-sided: $x[n]=-(0.8)^{n}u[-n-1]$
4. The first sequence is absolutely summable (pole inside the unit circle); the second is not, because its ROC excludes the unit circle

> [!success]- Answer
> **For $\lvert z\rvert>0.8$: $x[n]=(0.8)^nu[n]$. For $\lvert z\rvert<0.8$: $x[n]=-(0.8)^nu[-n-1]$.**

> [!warning] Trap
> Reporting only the causal answer. The ROC is the deciding information: the same algebraic $X(z)$ gives an exponentially decaying sequence, a growing one, or an unstable one depending on which side of the pole the ROC lies.

## Traps & Exam Notes

- **Omitting the ROC.** The ROC is part of the transform, not decoration; without it the inverse is ambiguous.
- **Confusing the two versions of $\dfrac{1}{1-az^{-1}}$.** $\lvert z\rvert>\lvert a\rvert$ gives $a^nu[n]$; $\lvert z\rvert<\lvert a\rvert$ gives $-a^nu[-n-1]$.
- **Taking the union of ROCs for a two-sided sequence.** It is the intersection; if the annulus is empty the transform does not exist.
- **Placing a pole inside the ROC.** By definition the ROC never contains a pole; if your annulus swallows a pole, the answer is wrong.
- **Reading the zero off the $z^{-1}$ form.** $\dfrac{1}{1-az^{-1}}=\dfrac{z}{z-a}$ has a zero at $z=0$, not a zero at $a$.
- **Saying 'all $z$' for a finite sequence.** Finite sequences exclude $z=0$ if there are positive-index terms and exclude $z=\infty$ if there are negative-index terms.
- **Equating right-sided with causal.** A right-sided sequence can begin at a negative index; causality requires $x[n]=0$ for $n<0$.
- **Judging stability from the pole radius alone without the ROC.** Causal systems are stable iff all poles are inside the unit circle; for a non-causal system the correct test is whether the ROC contains the unit circle.

## See Also

- [[07_Z_Transform_Theorems_and_Pairs]]
- [[08_Inverse_Z_Transform]]
- [[09_Difference_Equations_and_Stability]]

---

[[05_Discrete-Time_Convolution|⬅ 05]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Z_Transform_Theorems_and_Pairs|07 ➡]]
