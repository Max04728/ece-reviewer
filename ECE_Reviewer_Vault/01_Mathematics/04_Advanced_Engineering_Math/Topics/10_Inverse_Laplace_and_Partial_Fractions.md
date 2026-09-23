---
id: MATH-04-10
title: "Inverse Laplace and Partial Fractions"
part: "01_Mathematics"
area: "04_Advanced_Engineering_Math"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Laplace_Transform_Pairs]]", "[[08_Shifting_Theorems_and_Properties]]"]
tags: ["ece", "mathematics", "advanced_engineering_math"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Inverse Laplace and Partial Fractions

> [!abstract] Scope
> Recover the time function behind a rational transform by matching each pole pattern to one table entry.

## Core Concept

> [!tip] Intuition
> The shape of each pole in the denominator dictates the time-domain factor it produces, so inverting a transform is bookkeeping on poles rather than integration.

**Everything hinges on the pole pattern.** A rational $F(s) = N(s)/D(s)$ with real coefficients has poles that are real and distinct, real and repeated, or complex conjugates. Each pattern has exactly one table entry: a simple real pole $-p$ gives $e^{-pt}$, a pole of order $m$ at $-p$ gives $t^{m-1}e^{-pt}/(m-1)!$, and a conjugate pair $-a \pm jb$ gives a damped sinusoid $e^{-at}\cos bt$ or $e^{-at}\sin bt$. Completing the square is the mechanical way to expose that pair:
$$s^{2} + 2as + (a^{2}+b^{2}) = (s+a)^{2} + b^{2}$$
after which the numerator is rewritten as a multiple of $(s+a)$ plus a constant, because only those two shapes have table entries.

**The residue shortcut is the fastest correct method for simple poles.** If $F(s) = N(s)/D(s)$ has simple zeros of $D$ at $-p_k$, the coefficient of $1/(s+p_k)$ is $A_k = (s+p_k)F(s)$ evaluated at $s = -p_k$, which for a product denominator equals $N(-p_k)/D'(-p_k)$. This is a one-line evaluation that never needs simultaneous equations, and it is exactly the residue of $F$ at that pole. It fails for repeated poles: the coefficient of the highest power $(s+p_k)^{-m}$ still uses the same multiplication trick, but every lower power needs a successive derivative of that product, which is where most board-exam algebra errors are born.

**Improper fractions must be divided before anything else.** Partial fractions are only valid for a strictly proper rational function, so when the numerator degree is greater than or equal to the denominator degree, do the polynomial long division first and invert the polynomial part separately. A surviving constant inverts to a Dirac impulse $\delta(t)$ and a surviving $s$ to $\delta'(t)$, terms that are silently dropped when the decomposition is started too early; the initial-value check $f(0^{+}) = \lim_{s\to\infty}sF(s)$ catches that omission in one line. When $F$ arrives as a product of two known transforms, the convolution theorem converts the inversion into one integral instead of an algebraic decomposition, and it is the only practical route when the factors are not polynomials in a convenient form.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Simple real pole | $\mathcal{L}^{-1}\left\{\frac{1}{s+a}\right\} = e^{-at}$ | Pole at $s=-a$; $a$ carries units of s$^{-1}$, so a time constant quoted in ms must be converted before it is used as $a$. |
| Repeated power at the origin | $\mathcal{L}^{-1}\left\{\frac{1}{s^{n}}\right\} = \frac{t^{\,n-1}}{(n-1)!},\qquad n=1,2,3,\ldots$ | Pole of order $n$ at $s=0$; the factorial divides, so $1/s^{3}$ gives $t^{2}/2$, not $t^{2}$. |
| Sine | $\mathcal{L}^{-1}\left\{\frac{1}{s^{2}+a^{2}}\right\} = \frac{\sin at}{a}$ | Undamped pair at $s=\pm ja$; omitting the $1/a$ is the single most common error in this topic. |
| Cosine | $\mathcal{L}^{-1}\left\{\frac{s}{s^{2}+a^{2}}\right\} = \cos at$ | Same pole pair as the sine row; only the $s$ in the numerator selects cosine, and then there is no $1/a$. |
| Repeated real pole | $\mathcal{L}^{-1}\left\{\frac{1}{(s+a)^{n}}\right\} = \frac{t^{\,n-1}e^{-at}}{(n-1)!}$ | Order-$n$ pole at $s=-a$; $n=2$ is the ramp $t\,e^{-at}$, which is why a double pole always produces a $t$ factor. |
| Damped sine | $\mathcal{L}^{-1}\left\{\frac{b}{(s+a)^{2}+b^{2}}\right\} = e^{-at}\sin bt$ | Conjugate pair $-a\pm jb$ after completing the square; the numerator must equal $b$, not $b^{2}$. |
| Damped cosine | $\mathcal{L}^{-1}\left\{\frac{s+a}{(s+a)^{2}+b^{2}}\right\} = e^{-at}\cos bt$ | Conjugate pair; write a general numerator $As+B$ as $A(s+a)+(B-Aa)$ before matching. |
| Residue at a simple pole | $A_k = \left.(s+p_k)F(s)\right\rvert_{s=-p_k} = \frac{N(-p_k)}{D'(-p_k)}$ | Simple poles only, with $N$ and $D$ sharing no common factor; the derivative form needs $D'(-p_k)\neq 0$. |
| Repeated-pole coefficient | $A_{k,m} = \frac{1}{(m-1)!}\,\frac{d^{\,m-1}}{ds^{\,m-1}}\left[(s+p_k)^{m}F(s)\right]_{s=-p_k}$ | Pole of order $m$; the $m=1$ case collapses to the residue shortcut, so the two methods agree there. |
| Partial-fraction form | $F(s) = P(s) + \sum_k\frac{A_k}{s+p_k} + \sum_k\sum_{m=1}^{r_k}\frac{A_{k,m}}{(s+p_k)^{m}}$ | Valid only for the fractional part after $P(s)$, the division remainder, is extracted: there $\deg N < \deg D$. |
| Convolution theorem | $\mathcal{L}^{-1}\left\{F(s)G(s)\right\} = \int_0^{t} f(\tau)\,g(t-\tau)\,d\tau$ | Fallback when $F$ arrives as a product; the second factor must be evaluated at $t-\tau$, and the result is zero for $t<0$. |
| Shift applied to an inverse | $\mathcal{L}^{-1}\left\{F(s+a)\right\} = e^{-at}\,f(t)$ | Applies to a whole transform, so it may be used before or after the decomposition but never on one term only. |

## Worked Problems

### P1. Find $f(t) = \mathcal{L}^{-1}\{F(s)\}$ for $F(s) = \dfrac{s+3}{(s+1)(s+2)}$.

**Given:** F(s) = (s+3)/((s+1)(s+2)); strictly proper, simple real poles at s = -1 and s = -2

**Solution:**

1. Set $F(s) = \dfrac{A}{s+1} + \dfrac{B}{s+2}$
2. $A = \left.\dfrac{s+3}{s+2}\right\rvert_{s=-1} = \dfrac{2}{1} = 2$
3. $B = \left.\dfrac{s+3}{s+1}\right\rvert_{s=-2} = \dfrac{1}{-1} = -1$
4. So $F(s) = \dfrac{2}{s+1} - \dfrac{1}{s+2}$
5. Invert term by term: $f(t) = 2e^{-t} - e^{-2t}$
6. Check with the initial-value theorem: $\lim_{s\to\infty}sF(s) = 1$ and $f(0^{+}) = 2 - 1 = 1$, so the coefficients are consistent

> [!success]- Answer
> **$f(t) = 2e^{-t} - e^{-2t}$ for $t\geq 0$**

> [!warning] Trap
> Clearing fractions by hand often yields $B = +1$, because the numerator $s+3$ at $s=-2$ is $1$ and the sign of the $s+1$ factor is forgotten. That answer gives $f(0^{+}) = 3$ while $\lim_{s\to\infty}sF(s) = 1$, so the one-line check detects it immediately.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Residues need no simultaneous equations: with `X` as $s$, `(X+3)÷(X+2)` at `X = -1` → **2**, and `(X+3)÷(X+1)` at `X = -2` → **-1**.
> 2. $F(s) = 2/(s+1) - 1/(s+2)$, so $f(t) = 2e^{-t}-e^{-2t}$; check `2-1` → **1** = $\lim_{s\to\infty}sF(s)$.
>
> Each coefficient is the numerator over the *surviving* factor at the pole — the sign of $s+1$ cannot be lost this way.

### P2. Find $f(t)$ for $F(s) = \dfrac{s+4}{s(s+2)^{2}}$.

**Given:** simple pole at s = 0; double pole at s = -2, so m = 2

**Solution:**

1. Form $F(s) = \dfrac{A}{s} + \dfrac{B}{s+2} + \dfrac{C}{(s+2)^{2}}$
2. $A = \left.\dfrac{s+4}{(s+2)^{2}}\right\rvert_{s=0} = \dfrac{4}{4} = 1$
3. $C = \left.\dfrac{s+4}{s}\right\rvert_{s=-2} = \dfrac{2}{-2} = -1$
4. $B = \dfrac{d}{ds}\left[\dfrac{s+4}{s}\right]_{s=-2} = \left.-\dfrac{4}{s^{2}}\right\rvert_{s=-2} = -1$
5. $F(s) = \dfrac{1}{s} - \dfrac{1}{s+2} - \dfrac{1}{(s+2)^{2}}$
6. $f(t) = 1 - e^{-2t} - t\,e^{-2t}$
7. Check: $f(0^{+}) = 1 - 1 - 0 = 0$ and $\lim_{s\to\infty}sF(s) = 0$, so the initial values agree

> [!success]- Answer
> **$f(t) = 1 - (1+t)e^{-2t}$ for $t\geq 0$**

> [!warning] Trap
> Reusing the top-order value for the lower coefficient: taking $B = C = -1$ from one evaluation gives $f(t) = 1 - 2e^{-2t}$, whose value at $t = 0$ is $-1$ instead of the required $0$. The $B$ coefficient needs $\frac{d}{ds}\left[(s+2)^{2}F(s)\right]$, not the product itself.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(X+4)÷(X+2)²` at `X = 0` → **1** (the $A$ over $s$) and `(X+4)÷X` at `X = -2` → **-1** (the $C$ over $(s+2)^2$).
> 2. The lower repeated-pole coefficient is a derivative: `SHIFT` `d/dx` of `(X+4)÷X` at `X = -2` → **-1** (that is $B$).
> 3. So $F(s) = 1/s - 1/(s+2) - 1/(s+2)^2$ and $f(t) = 1-(1+t)e^{-2t}$; `1-1-0×1` → **0** matches $\lim_{s\to\infty}sF(s) = 0$.
>
> Here $B$ and $C$ happen to both be $-1$; only the derivative gives $B$, and the coincidence does not generalise.

### P3. Find $f(t)$ for $F(s) = \dfrac{2s+5}{s^{2}+4s+13}$.

**Given:** denominator has no real roots; complex-conjugate poles

**Solution:**

1. Complete the square: $s^{2}+4s+13 = (s+2)^{2}+9$, so $a = 2$ and $b = 3$
2. Rewrite the numerator around $(s+2)$: $2s+5 = 2(s+2)+1$
3. $F(s) = \dfrac{2(s+2)}{(s+2)^{2}+9} + \dfrac{1}{(s+2)^{2}+9}$
4. First term is a damped cosine: $2e^{-2t}\cos 3t$
5. Second term needs numerator $b = 3$: write it as $\dfrac{1}{3}\cdot\dfrac{3}{(s+2)^{2}+9}$, which gives $\dfrac{1}{3}e^{-2t}\sin 3t$
6. $f(t) = 2e^{-2t}\cos 3t + \dfrac{1}{3}e^{-2t}\sin 3t$
7. Check: $f(0^{+}) = 2$ and $\lim_{s\to\infty}sF(s) = 2$, consistent

> [!success]- Answer
> **$f(t) = e^{-2t}\left(2\cos 3t + \dfrac{1}{3}\sin 3t\right)$ for $t\geq 0$**

> [!warning] Trap
> Supplying $b^{2} = 9$ as the numerator of the sine term, or using $b = 3$ without the $1/b$ correction. Writing $e^{-2t}\sin 3t$ makes the sine contribution three times too large, which moves the first peak of the waveform.

### P4. Find $f(t)$ for $F(s) = \dfrac{s^{2}+4s+6}{s^{2}+4s+5}$.

**Given:** numerator degree equals denominator degree; s^2+4s+5 = (s+2)^2+1

**Solution:**

1. The fraction is improper, so divide first: $F(s) = 1 + \dfrac{(s^{2}+4s+6)-(s^{2}+4s+5)}{s^{2}+4s+5} = 1 + \dfrac{1}{s^{2}+4s+5}$
2. Complete the square: $s^{2}+4s+5 = (s+2)^{2}+1$, so $a = 2$ and $b = 1$
3. The polynomial part $1$ inverts to the impulse $\delta(t)$
4. With $b = 1$ the second term $\dfrac{1}{(s+2)^{2}+1^{2}}$ inverts to $e^{-2t}\sin t$
5. $f(t) = \delta(t) + e^{-2t}\sin t$

> [!success]- Answer
> **$f(t) = \delta(t) + e^{-2t}\sin t$ for $t\geq 0$**

> [!warning] Trap
> Going straight to partial fractions instead of dividing. The decomposition then returns only the continuous part $e^{-2t}\sin t$ and the impulse is lost; any transform whose numerator degree is at least the denominator degree must carry a $\delta(t)$ or a derivative of one.

### P5. Use the convolution theorem to find $f(t)$ for $F(s) = \dfrac{1}{s^{2}(s+1)}$, then verify the result by partial fractions.

**Given:** F(s) = (1/s^2) times (1/(s+1)); no decomposition needed if convolution is used

**Solution:**

1. Write $F(s) = G_1(s)G_2(s)$ with $G_1(s) = \dfrac{1}{s^{2}}$ and $G_2(s) = \dfrac{1}{s+1}$
2. Their inverses are $g_1(t) = t$ and $g_2(t) = e^{-t}$
3. $f(t) = \int_0^{t} g_1(\tau)g_2(t-\tau)\,d\tau = \int_0^{t}\tau\,e^{-(t-\tau)}\,d\tau = e^{-t}\int_0^{t}\tau\,e^{\tau}\,d\tau$
4. Using $\int \tau e^{\tau}d\tau = (\tau-1)e^{\tau}$, the definite integral is $(t-1)e^{t}+1$
5. $f(t) = e^{-t}\left[(t-1)e^{t}+1\right] = t - 1 + e^{-t}$
6. Verify by partial fractions: $\dfrac{1}{s^{2}(s+1)} = -\dfrac{1}{s} + \dfrac{1}{s^{2}} + \dfrac{1}{s+1}$, whose inverse is $-1 + t + e^{-t}$, the same function
7. Check: $f(0^{+}) = 0$ and $\lim_{s\to\infty}sF(s) = 0$; also $f''(0^{+}) = 1$ matches $\lim_{s\to\infty}s^{2}F(s) = 1$

> [!success]- Answer
> **$f(t) = t - 1 + e^{-t}$ for $t\geq 0$**

> [!warning] Trap
> Using the same time variable in both factors, $\int_0^{t}\tau\,e^{-\tau}d\tau$, which gives $1-(t+1)e^{-t}$. At $t = 1$ that is $0.264$ instead of the correct $0.368$; the convolution kernel must always be the shifted factor $g(t-\tau)$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. The convolution at $t = 1$ with the shifted kernel: `∫dx` `∫(X × e^(X-1), 0, 1)` → **0.3678794**.
> 2. The answer $f(t) = t-1+e^{-t}$ gives `1-1+e^(-1)` → **0.3678794** — identical.
> 3. The wrong kernel $\tau e^{-\tau}$ would give `∫(X × e^(-X), 0, 1)` → **0.2642411**, the 0.264 of the trap.
>
> One definite integral decides which convolution the theorem demands.

## Traps & Exam Notes

- **Repeated pole treated as if simple.** For $(s+2)^{2}$ the coefficient of $1/(s+2)$ is $\frac{d}{ds}\left[(s+2)^{2}F(s)\right]$ evaluated at $s=-2$, not the product itself. Using the residue value twice loses the $t\,e^{-at}$ weighting and breaks the initial-value check.
- **Missing the $1/a$ on the sine.** $\mathcal{L}^{-1}\{1/(s^{2}+a^{2})\} = \sin(at)/a$. For $a = 3$ the term is $\frac{1}{3}\sin 3t$; writing $\sin 3t$ triples the amplitude and costs the mark on an otherwise correct decomposition.
- **Skipping polynomial division.** When $\deg N \geq \deg D$ the undecomposed partial fractions are invalid and the impulse term vanishes. A transform with equal degrees must invert to $\delta(t)$ plus a continuous part, so an answer with no impulse is wrong by inspection.
- **Mixing up $b$ and $b^{2}$.** In $(s+a)^{2}+b^{2}$ the numerator that produces a sine is $b$. With $b = 3$ the correct term is $3/((s+2)^{2}+9)$; using $9$ scales the sine by 3 and ruins the peak value.
- **Skipping the two asymptotic checks.** $f(0^{+}) = \lim_{s\to\infty}sF(s)$ and $f(\infty) = \lim_{s\to 0}sF(s)$ cost one line each and catch nearly every coefficient sign error before the answer is finalised.

## See Also

- [[07_Laplace_Transform_Pairs]]
- [[08_Shifting_Theorems_and_Properties]]
- [[09_Unit_Step,_Dirac_and_Periodic_Functions]]

---

[[09_Unit_Step,_Dirac_and_Periodic_Functions|⬅ 09]] · [[_MOC_Advanced_Engineering_Math|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Fourier_Series_Trigonometric_and_Exponential|11 ➡]]
