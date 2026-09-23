---
id: MATH-01-08
title: "Rolle’s and Mean Value Theorems"
part: "01_Mathematics"
area: "01_Differential_Calculus"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Limits,_Continuity_and_L_Hopital]]", "[[02_Differentiation_Rules]]"]
tags: ["ece", "mathematics", "differential_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Rolle’s and Mean Value Theorems

> [!abstract] Scope
> State and apply Rolle's theorem and the Mean Value Theorem, including finding the guaranteed point and constructing the standard existence arguments.

## Core Concept

> [!tip] Intuition
> Both theorems say the same thing: on a smooth arc, somewhere the tangent must match the *average* slope. Rolle is the special case where the average slope is zero — start and end at the same height, and you must have been momentarily level.

**Rolle's theorem.** If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a) = f(b)$, then there exists at least one $c$ in $(a,b)$ with $f'(c) = 0$. All three hypotheses matter: continuity on the closed interval, differentiability on the open interval, and equal endpoint values. The conclusion is existence — it guarantees such a $c$ without telling you where, though in practice you find it by solving $f'(x)=0$.

**Mean Value Theorem.** If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there is at least one $c$ in $(a,b)$ with $f'(c) = \frac{f(b)-f(a)}{b-a}$. Geometrically, some tangent line is parallel to the chord joining the endpoints. Rolle is the case $f(b) = f(a)$, where the chord is horizontal.

**How to use them in a question.** To *find* the point: compute the average slope, set $f'(x)$ equal to it, solve for $x$, and discard any root outside $(a,b)$. To *prove existence without finding it*: verify the hypotheses and cite the theorem — a question asking 'show there is a $c$ such that...' usually wants this second kind of answer, and solving explicitly is not required.

**Consequences worth knowing.** If $f'(x) = 0$ for all $x$ on an interval, then $f$ is constant there. If $f' = g'$ everywhere then $f$ and $g$ differ by a constant. The MVT is also the tool behind the error bound for linear approximation and behind the $0/0$ form of L'Hopital's rule, so it is structurally central rather than a curiosity.

**Hypothesis failure is the exam trap.** $f(x) = |x|$ on $[-1,1]$ is continuous but not differentiable at $0$, so no $c$ with $f'(c)=0$ exists. $f(x) = 1/x$ on $[-1,1]$ fails continuity. Every 'is the theorem applicable?' question is testing whether you check the hypotheses before the conclusion.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Rolle's theorem | $f(a)=f(b) \Rightarrow \exists\, c\in(a,b): f'(c)=0$ | Requires continuity on [a,b] and differentiability on (a,b). |
| Mean Value Theorem | $f'(c) = \frac{f(b)-f(a)}{b-a}$ | The tangent at c is parallel to the chord over [a,b]. |
| Average slope | $m_{\mathrm{avg}} = \frac{f(b)-f(a)}{b-a}$ | Compute this first; it is the right-hand side to solve against. |
| MVT as an estimate | $f(b) = f(a) + f'(c)(b-a)$ | Exact for some c; the basis of the linear approximation error bound. |
| Constant-function corollary | $f'(x)=0 \ \forall x \in I \Rightarrow f \mathrm{\ constant\ on\ } I$ | Requires an interval, not a disconnected set. |
| Equal-derivative corollary | $f' = g' \Rightarrow f = g + C$ | The justification for '+C' in every antiderivative. |
| Generalised MVT (Cauchy) | $\frac{f'(c)}{g'(c)} = \frac{f(b)-f(a)}{g(b)-g(a)}$ | Underlies the proof of L'Hopital's rule. |

## Worked Problems

### P1. Verify Rolle's theorem for $f(x) = x^2 - 4x + 3$ on $[1,3]$ and find $c$.

**Given:** interval [1,3]

**Solution:**

1. f is a polynomial, so continuous on [1,3] and differentiable on (1,3)
2. f(1) = 1 - 4 + 3 = 0 and f(3) = 9 - 12 + 3 = 0, so f(a) = f(b)
3. f'(x) = 2x - 4 = 0 gives x = 2
4. 2 lies in (1,3)

> [!success]- Answer
> **$c = 2$**

> [!warning] Trap
> Solving f(x) = 0 instead of f'(x) = 0. Rolle gives a point with zero *slope*, not zero value.

### P2. Find the value of $c$ guaranteed by the Mean Value Theorem for $f(x) = x^3 - x$ on $[0, 2]$.

**Given:** interval [0,2]

**Solution:**

1. Average slope: (f(2) - f(0))/(2 - 0) = (6 - 0)/2 = 3
2. f'(x) = 3x^2 - 1
3. Set 3x^2 - 1 = 3, so x^2 = 4/3
4. x = ±2/sqrt(3); keep only the positive root inside (0,2)

> [!success]- Answer
> **$c = \dfrac{2}{\sqrt{3}} \approx 1.155$**

> [!warning] Trap
> Keeping the negative root, which lies outside the interval, or setting f'(x) equal to zero instead of the average slope.

### P3. Show that $f(x) = |x|$ on $[-1,1]$ does not satisfy the conclusion of Rolle's theorem, and explain which hypothesis fails.

**Given:** absolute value function

**Solution:**

1. f is continuous on [-1,1]: yes, |x| is continuous everywhere
2. f(-1) = 1 = f(1), so the endpoint condition holds
3. f is not differentiable at x = 0, which is inside (-1,1)
4. The differentiability hypothesis fails, so no c with f'(c) = 0 need exist
5. Check: f'(x) = -1 for x<0 and +1 for x>0, never 0

> [!success]- Answer
> **Differentiability fails at $x=0$; the conclusion genuinely does not hold.**

> [!warning] Trap
> Claiming the theorem fails because f has a 'corner' without naming the failed hypothesis, or asserting the conclusion holds anyway.

### P4. Suppose $f(1) = 2$ and $f'(x) \le 5$ for all $x$. What is the largest possible value of $f(4)$?

**Given:** f(1) = 2; f' bounded by 5

**Solution:**

1. By the MVT there is c in (1,4) with f'(c) = (f(4) - f(1))/3
2. So f(4) - f(1) = 3 f'(c) <= 3(5) = 15
3. f(4) <= 2 + 15 = 17

> [!success]- Answer
> **$f(4) \le 17$**

> [!warning] Trap
> Multiplying the bound by 4 instead of by the interval length 3.

### P5. Prove that $f(x) = x^3 + 4x - 1$ has exactly one real root.

**Given:** cubic; existence and uniqueness

**Solution:**

1. Existence: f(0) = -1 < 0 and f(1) = 4 > 0, so by the Intermediate Value Theorem a root exists in (0,1)
2. Uniqueness: suppose two roots a < b existed
3. Rolle's theorem would then give c in (a,b) with f'(c) = 0
4. But f'(x) = 3x^2 + 4 > 0 for all x, so no such c exists
5. Contradiction: at most one root

> [!success]- Answer
> **Exactly one real root, in $(0,1)$.**

> [!warning] Trap
> Proving existence with IVT and stopping. Uniqueness requires the Rolle contradiction argument.

## Traps & Exam Notes

- **Checking hypotheses before citing the theorem.** $1/x$ on $[-1,1]$ is not continuous, and $|x|$ is not differentiable at 0. State which hypothesis holds and which fails.
- **Solving $f(x)=0$ instead of $f'(x) = $ average slope.** The theorem is about slopes.
- **Keeping roots outside the open interval.** The guaranteed $c$ must lie strictly between $a$ and $b$; discard others.
- **Confusing existence with location.** Rolle and MVT guarantee that a $c$ exists. A question saying 'show there exists' does not require you to find it, and sometimes it cannot be found in closed form.
- **Interval length errors.** The MVT slope divides by $b-a$; applications bounding function values multiply the derivative bound by $b-a$.
- **Rolle requires equal endpoint values.** Without $f(a)=f(b)$ you must use the MVT, not Rolle.

## See Also

- [[01_Limits,_Continuity_and_L_Hopital]]
- [[05_Extrema,_Concavity_and_Inflection]]
- [[07_Differentials_and_Error_Propagation]]

---

[[07_Differentials_and_Error_Propagation|⬅ 07]] · [[_MOC_Differential_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
