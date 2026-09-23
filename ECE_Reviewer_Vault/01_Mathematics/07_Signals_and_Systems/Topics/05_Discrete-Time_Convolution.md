---
id: MATH-07-05
title: "Discrete-Time Convolution"
part: "01_Mathematics"
area: "07_Signals_and_Systems"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_System_Properties_and_LTI]]"]
tags: ["ece", "mathematics", "signals_and_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Discrete-Time Convolution

> [!abstract] Scope
> Evaluate the convolution sum of two discrete-time sequences by the table method and the standard sum pairs, and read off the output length and index range.

## Core Concept

> [!tip] Intuition
> Discrete convolution is polynomial multiplication in disguise: the sequence values are coefficients, and convolving them multiplies the two polynomials. The table method is just careful bookkeeping of that multiplication.

**The sum.** The convolution sum is:
$$y[n]=\displaystyle\sum_{k=-\infty}^{\infty}x[k]h[n-k]$$
Compared with the CT integral, the flip-and-slide picture is identical but the 'overlap area' becomes a finite sum of products. For finite-length sequences this is a double loop over the two index ranges and can always be done in a table.

**Output length and index range.** If $x$ has length $L_1$ (support $[n_{1a},n_{1b}]$) and $h$ has length $L_2$ (support $[n_{2a},n_{2b}]$), then $y$ has length $L_1+L_2-1$ and support $[n_{1a}+n_{2a},\ n_{1b}+n_{2b}]$. Both facts are free checks: an answer with the wrong length or the wrong starting index is wrong before you check any value. The starting index is the one students lose: two sequences that both begin at $n=0$ produce an output beginning at $n=0$, but a sequence starting at $n=-2$ shifts the whole result.

**Convolution as polynomial multiplication.** The $z$-transform pair is:
$$y[n]=x[n]*h[n]\leftrightarrow Y(z)=X(z)H(z)$$
This reduces DT convolution to multiplying two polynomials in $z^{-1}$. For finite sequences this gives the values directly: write $x[n]$ as coefficients of $X(z)$, $h[n]$ as coefficients of $H(z)$, multiply, and read the coefficient of $z^{-n}$ as $y[n]$. This is faster and less error-prone than the sum for short sequences.

**Standard pairs.** $x[n]*\delta[n-k]=x[n-k]$ (pure shift). $u[n]*u[n]=(n+1)u[n]$ — the DT analogue of $tu(t)$ carries the extra $+1$ because the sum $\sum_{k=0}^{n}1$ has $n+1$ terms.
$$a^{n}u[n]*u[n]=\dfrac{1-a^{n+1}}{1-a}u[n]$$
for $a\neq1$, which is the step response of a one-pole system and settles at $\dfrac{1}{1-a}$. Convolution with $\delta[n]$ is the identity.

**Why the DT version differs from CT.** The '$+1$' in $(n+1)u[n]$ and the '$n+1$' exponent in the geometric sum both come from counting terms rather than measuring length on a continuum. Every DT result that looks like its CT counterpart has this off-by-one adjustment, and every convolution exam question contains at least one place where it matters. Stability is also read from the sum:
$$\sum\lvert h[n]\rvert<\infty$$

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Convolution sum | $y[n] = \sum_{k=-\infty}^{\infty} x[k] h[n-k]$ | Flip and slide in the index n; sum the products over the overlap. |
| Output length | $L_y = L_1 + L_2 - 1$ | Not L1 + L2. Holds for finite-length sequences. |
| Output index range | $\mathrm{support} = [n_{1a}+n_{2a},\ n_{1b}+n_{2b}]$ | Starting indices add; an offset start propagates. |
| Impulse shift | $x[n] * \delta[n-k] = x[n-k]$ | Pure shift by k, no scaling. |
| Step with step | $u[n] * u[n] = (n+1)u[n]$ | The DT analogue of t u(t); note the +1 from counting terms. |
| Geometric with step | $a^{n}u[n] * u[n] = \frac{1-a^{n+1}}{1-a}u[n]$ | Settles at 1/(1-a); requires \|a\| < 1 for a bounded limit. |
| Convolution theorem | $x[n] * h[n] \leftrightarrow X(z)H(z)$ | Turns convolution into polynomial multiplication. |
| FIR output | $y[n] = \sum_{k=0}^{M} b_k x[n-k]$ | Finite impulse response of length M+1; no feedback terms. |
| Commutativity | $x * h = h * x$ | Use it to put the shorter sequence in the inner loop. |
| BIBO stability from h | $\sum_{n} \lvert h[n] \rvert < \infty$ | Absolute summability; read it off the convolved sequence when h is given. |

## Worked Problems

### P1. Convolve $x[n]=\{1,2,3\}$ (starting at $n=0$) with $h[n]=\{1,1\}$ (starting at $n=0$).

**Given:** x = {1,2,3} at n = 0,1,2; h = {1,1} at n = 0,1

**Solution:**

1. Length check: $L_y = 3+2-1 = 4$, support $[0+0,\ 2+1] = [0,3]$
2. $y[0] = x[0]h[0] = 1(1) = 1$
3. $y[1] = x[0]h[1]+x[1]h[0] = 1(1)+2(1) = 3$
4. $y[2] = x[1]h[1]+x[2]h[0] = 2(1)+3(1) = 5$
5. $y[3] = x[2]h[1] = 3(1) = 3$
6. Polynomial check: $(1+2z^{-1}+3z^{-2})(1+z^{-1}) = 1+3z^{-1}+5z^{-2}+3z^{-3}$ ✓

> [!success]- Answer
> **$y[n]=\{1,3,5,3\}$ for $n=0,1,2,3$ (length 4).**

> [!warning] Trap
> Reporting a length of $3+2=5$ by adding the lengths. Two length-3 and length-2 sequences give $3+2-1=4$ output samples.

### P2. Convolve $x[n]=\left(\dfrac12\right)^{n}u[n]$ with $h[n]=u[n]$.

**Given:** x[n] = (1/2)^n u[n]; h[n] = u[n]

**Solution:**

1. Standard pair with $a=1/2$: $y[n]=\dfrac{1-a^{n+1}}{1-a}u[n]$
2. $y[n] = \dfrac{1-(1/2)^{n+1}}{1/2}u[n] = 2\left(1-\left(\tfrac12\right)^{n+1}\right)u[n]$
3. Check $n=0$: $2(1-0.5) = 1$; direct sum gives $x[0] = 1$ ✓
4. Check $n=1$: $2(1-0.25) = 1.5$; direct sum gives $x[0]+x[1] = 1+0.5 = 1.5$ ✓
5. Final value: as $n\to\infty$, $y\to2 = 1/(1-0.5)$ ✓

> [!success]- Answer
> **$y[n]=2\left(1-(1/2)^{n+1}\right)u[n]$, rising from 1 at $n=0$ toward the final value 2.**

> [!warning] Trap
> Writing $1-(1/2)^{n}$ instead of $1-(1/2)^{n+1}$. The running sum has $n+1$ terms, so the exponent is $n+1$; using $n$ makes $y[0]=0$ instead of 1.

### P3. A system has $h[n]=\{1,-1\}$ at $n=0,1$. Find the output for $x[n]=\{1,2,3\}$ and identify the operation.

**Given:** h = {1,-1}; x = {1,2,3}

**Solution:**

1. Length: $L_y = 3+2-1 = 4$, support $[0,3]$
2. $y[0] = 1(1) = 1$
3. $y[1] = x[1]h[0]+x[0]h[1] = 2(1)+1(-1) = 1$
4. $y[2] = x[2]h[0]+x[1]h[1] = 3(1)+2(-1) = 1$
5. $y[3] = x[2]h[1] = 3(-1) = -3$
6. So $y[n]=x[n]-x[n-1]$: a first-difference (high-pass) filter

> [!success]- Answer
> **$y[n]=\{1,1,1,-3\}$, i.e. $y[n]=x[n]-x[n-1]$.**

> [!warning] Trap
> Dropping the sign of $h[1]$. The sequence is $\{1,-1\}$, not $\{1,1\}$; a sign slip here produces a moving average instead of a differencer.

### P4. $x[n]$ is nonzero for $-2\le n\le1$ and $h[n]$ for $1\le n\le3$. Give the support and length of $y[n]=x[n]*h[n]$.

**Given:** x support [-2,1]; h support [1,3]

**Solution:**

1. Support start: $-2+1 = -1$
2. Support end: $1+3 = 4$
3. Length from the range: $4-(-1)+1 = 6$
4. Check with the length rule: $L_x = 4$, $L_h = 3$, so $L_y = 4+3-1 = 6$ ✓

> [!success]- Answer
> **$y$ is nonzero on $[-1,4]$, length 6.**

> [!warning] Trap
> Starting the output at $n=0$ and reporting support $[0,5]$. The output start index is the sum of the input start indices, $-2+1=-1$.

### P5. Find $u[n]*u[n]$ and evaluate the result at $n=5$.

**Given:** x = u[n]; h = u[n]

**Solution:**

1. $y[n]=\sum_{k=-\infty}^{\infty}u[k]u[n-k]$; both factors are 1 for $k\in[0,n]$ when $n\ge0$
2. The number of terms in that range is $n+1$
3. $y[n] = (n+1)u[n]$
4. At $n=5$: $y[5] = 6$
5. Contrast with CT: $u(t)*u(t)=t\,u(t)$, which is 5 at $t=5$ — the DT result is one larger

> [!success]- Answer
> **$u[n]*u[n]=(n+1)u[n]$; at $n=5$, $y[5]=6$.**

> [!warning] Trap
> Copying the CT result and answering $n\,u[n]$, which gives 5. The DT sum over $0\le k\le n$ has $n+1$ terms, not $n$.

## Traps & Exam Notes

- **Output length $L_1+L_2$ instead of $L_1+L_2-1$.** The off-by-one is the single most common DT convolution error.
- **Wrong starting index.** Support indices add, so an input that starts at $n=-2$ shifts the output; do not assume the output starts at 0.
- **Reporting $n$ instead of $n+1$ for $u[n]*u[n]$.** The DT step convolution is $(n+1)u[n]$; the CT analogue has no $+1$.
- **Using $a^{n+1}$ versus $a^n$ inconsistently in the geometric sum.** The running sum to $n$ contains $n+1$ terms, so the exponent is $n+1$.
- **Flipping the wrong sequence or not flipping at all.** The summand is $x[k]h[n-k]$; $x[k]h[k]$ is pointwise multiplication.
- **Confusing convolution with pointwise multiplication.** They are different operations; the convolution theorem links convolution in time to multiplication in $z$.
- **Losing a sign in $h$.** A sequence $\{1,-1\}$ is a differencer, $\{1,1\}$ a moving average — completely different filters.
- **Treating a finite-length (FIR) result as if it needed a stability check for the whole system.** FIR filters are always BIBO stable because $\sum\lvert h\rvert$ is a finite sum; only IIR responses can diverge.

## See Also

- [[04_Continuous-Time_Convolution]]
- [[06_Z_Transform_Definition_and_ROC]]
- [[09_Difference_Equations_and_Stability]]

---

[[04_Continuous-Time_Convolution|⬅ 04]] · [[_MOC_Signals_and_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Z_Transform_Definition_and_ROC|06 ➡]]
