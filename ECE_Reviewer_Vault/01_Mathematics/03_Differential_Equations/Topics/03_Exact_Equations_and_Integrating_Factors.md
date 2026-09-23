---
id: MATH-03-03
title: "Exact Equations and Integrating Factors"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 3
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Differentiation_Rules]]", "[[02_Algebraic_Substitution]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 03 — Exact Equations and Integrating Factors

> [!abstract] Scope
> Test M(x,y)dx + N(x,y)dy = 0 for exactness, recover the potential F(x,y) whose level curves are the solutions, and find an integrating factor when the equation is not exact.

## Core Concept

> [!tip] Intuition
> An exact equation is the total differential of a hidden function F(x,y) set to zero. Solving it means reconstructing that function; the solution is not a formula for y but the level curve F(x,y) = C.

**What exactness means.** The equation $M(x,y)\,dx+N(x,y)\,dy=0$ is *exact* when there exists a function $F(x,y)$ with $\frac{\partial F}{\partial x}=M$ and $\frac{\partial F}{\partial y}=N$. Then $dF=M\,dx+N\,dy=0$, so the solutions are the level curves $F(x,y)=C$. Solving the ODE is therefore the same as reconstructing a potential function, which is why this topic reappears in electrostatics under the name 'conservative field'.

**The test.** On a rectangle where $M$, $N$ and their first partials are continuous, such an $F$ exists exactly when:
$$\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}$$
This is the equality of the mixed second partials of $F$, run backwards:
$$\frac{\partial^2F}{\partial y\,\partial x}=\frac{\partial^2F}{\partial x\,\partial y}$$
The condition is necessary and, on a simply connected region, sufficient.

**The reconstruction.** Integrate $M$ with respect to $x$ holding $y$ fixed: $F=\int M\,dx+g(y)$. The 'constant' of that integration is an arbitrary function of $y$, because any function of $y$ alone has zero $x$-derivative. Then impose $\frac{\partial F}{\partial y}=N$ to find $g'(y)$, which must come out free of $x$ — if an $x$ survives, the equation was not exact.

**When the test fails: integrating factors.** If $(M_y-N_x)/N$ is a function of $x$ alone, the integrating factor is:
$$\mu(x)=\exp\left(\int\frac{M_y-N_x}{N}\,dx\right)$$
This factor makes $\mu M\,dx+\mu N\,dy=0$ exact. If instead $(N_x-M_y)/M$ is a function of $y$ alone, the integrating factor is:
$$\mu(y)=\exp\left(\int\frac{N_x-M_y}{M}\,dy\right)$$
That one also makes $\mu M\,dx+\mu N\,dy=0$ exact. Note the two numerators are opposites and the two denominators are swapped: the pattern to remember is 'the derivative mismatch over the coefficient you are *not* differentiating with respect to'.

**How to tell which factor to try.** Compute both ratios. If only the first is free of $y$, use $\mu(x)$; if only the second is free of $x$, use $\mu(y)$. If neither simplifies, this course does not cover the general $\mu(x,y)$ case and the problem is designed to be exact as given.

**Answers are implicit.** The final answer is $F(x,y)=C$, or an equivalent algebraic rearrangement. Do not attempt to solve for $y$: the level curve is the solution, and the arbitrary constant may be rescaled (renaming $2C$ as $C$ is free) but not dropped.

**Why ECE cares.** Exactness is the differential-equation face of a conservative field: $\oint M\,dx+N\,dy=0$ on every closed path exactly when $M_y=N_x$. In circuit and field problems, an exact differential is one where the path of integration does not matter, and a non-exact one is one where it does — which is the origin of the integrating-factor idea in thermodynamics and in state functions.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Exact differential equation | $M(x,y)\,dx+N(x,y)\,dy=0$ | Both M and N generally depend on both variables; the equation is not necessarily separable or linear. |
| Exactness test | $\frac{\partial M}{\partial y}=\frac{\partial N}{\partial x}$ | Not dM/dx = dN/dy. Requires continuity on a simply connected region. |
| Potential function | $F(x,y)=\int M(x,y)\,dx+g(y)$ | The integration constant is a function of y alone; partial integration in x treats y as a parameter. |
| Determining g(y) | $\frac{\partial F}{\partial y}=N \;\Rightarrow\; g'(y)=N-\frac{\partial}{\partial y}\int M\,dx$ | g'(y) must contain no x. If x survives, the equation is not exact. |
| General solution | $F(x,y)=C$ | Implicit. The constant is arbitrary; a positive scalar multiple of F may be absorbed into C. |
| Integrating factor in x | $\mu(x)=\exp\!\left(\int\frac{M_y-N_x}{N}\,dx\right)$ | Usable only when (M_y - N_x)/N is independent of y. |
| Integrating factor in y | $\mu(y)=\exp\!\left(\int\frac{N_x-M_y}{M}\,dy\right)$ | Usable only when (N_x - M_y)/M is independent of x. Numerator and denominator are both swapped relative to the mu(x) case. |
| Exact after multiplication | $(\mu M)_y=(\mu N)_x$ | Re-run the test on the new M and N; never on the originals. |
| Conservative-field form | $M_y=N_x \;\Leftrightarrow\; \oint M\,dx+N\,dy=0$ | Path independence. The closed-loop integral vanishes for every closed path in the region. |

## Worked Problems

### P1. Solve $(2xy-3)\,dx+(x^2+4y)\,dy=0$ with $y(0)=1$.

**Given:** M = 2xy - 3; N = x^2 + 4y; y(0) = 1

**Solution:**

1. Test: $M_y=2x$ and $N_x=2x$, so the equation is exact
2. $F=\int(2xy-3)\,dx=x^2y-3x+g(y)$
3. $F_y=x^2+g'(y)$ must equal $N=x^2+4y$, so $g'(y)=4y$ and $g(y)=2y^2$
4. General solution: $x^2y-3x+2y^2=C$
5. Apply $y(0)=1$: $0-0+2=C$, so $C=2$

> [!success]- Answer
> **$x^2y-3x+2y^2=2$.**

> [!warning] Trap
> Treating the constant of the x-integration as a number. It is $g(y)$, a function of $y$; setting it to a constant immediately makes $F_y=N$ impossible to satisfy unless $N$ happens to be independent of $y$.

### P2. Solve $(3x^2+6xy^2)\,dx+(6x^2y+4y^3)\,dy=0$.

**Given:** M = 3x^2 + 6xy^2; N = 6x^2 y + 4y^3

**Solution:**

1. Test: $M_y=12xy$ and $N_x=12xy$, so the equation is exact
2. $F=\int(3x^2+6xy^2)\,dx=x^3+3x^2y^2+g(y)$
3. $F_y=6x^2y+g'(y)=6x^2y+4y^3$, so $g'(y)=4y^3$ and $g(y)=y^4$
4. The x-terms cancel, confirming exactness

> [!success]- Answer
> **$x^3+3x^2y^2+y^4=C$.**

> [!warning] Trap
> Differentiating $3x^2y^2$ with respect to $y$ as $3x^2\cdot 2y = 6x^2y$ is correct, but the same term differentiated with respect to $x$ is $6xy^2$ — mixing the two up produces a spurious $6xy$ term and a non-exact result.

### P3. Solve $(y\cos x+2xe^{y})\,dx+(\sin x+x^{2}e^{y}-1)\,dy=0$.

**Given:** M = y cos x + 2x e^y; N = sin x + x^2 e^y - 1

**Solution:**

1. Test: $M_y=\cos x+2xe^{y}$ and $N_x=\cos x+2xe^{y}$, so the equation is exact
2. $F=\int(y\cos x+2xe^{y})\,dx=y\sin x+x^{2}e^{y}+g(y)$
3. $F_y=\sin x+x^{2}e^{y}+g'(y)$ must equal $N=\sin x+x^{2}e^{y}-1$
4. So $g'(y)=-1$ and $g(y)=-y$

> [!success]- Answer
> **$y\sin x+x^{2}e^{y}-y=C$.**

> [!warning] Trap
> Missing the lone $-1$ in $N$. It contributes $g'(y)=-1$, not zero; dropping it removes the linear $-y$ term from the solution and the answer no longer satisfies $F_y=N$.

### P4. Solve $(3xy+y^2)\,dx+(x^2+xy)\,dy=0$ by finding an integrating factor.

**Given:** M = 3xy + y^2; N = x^2 + xy

**Solution:**

1. Test: $M_y=3x+2y$ and $N_x=2x+y$ — not equal, so the equation is not exact
2. Form the ratio $\dfrac{M_y-N_x}{N}=\dfrac{x+y}{x(x+y)}=\dfrac{1}{x}$, a function of $x$ alone
3. Therefore $\mu(x)=e^{\int dx/x}=x$
4. Multiply through: $(3x^2y+xy^2)\,dx+(x^3+x^2y)\,dy=0$
5. Re-test: $(3x^2y+xy^2)_y=3x^2+2xy$ and $(x^3+x^2y)_x=3x^2+2xy$ — now exact
6. $F=\int(3x^2y+xy^2)\,dx=x^3y+\dfrac{x^2y^2}{2}+g(y)$
7. $F_y=x^3+x^2y+g'(y)=x^3+x^2y$, so $g'(y)=0$ and $g$ is a constant

> [!success]- Answer
> **$2x^3y+x^2y^2=C$ (multiplying the potential $x^3y+x^2y^2/2$ by 2).**

> [!warning] Trap
> Using $(N_x-M_y)/N$ instead of $(M_y-N_x)/N$. Here that would give $-(1/x)$ and $\mu=1/x$, which fails the re-test. Also, the re-test must be run on $\mu M$ and $\mu N$, not on the original $M$ and $N$.

### P5. Solve $y\,dx+(y^2-x)\,dy=0$ by finding an integrating factor.

**Given:** M = y; N = y^2 - x

**Solution:**

1. Test: $M_y=1$ and $N_x=-1$ — not equal
2. Try $\mu(x)$: $\dfrac{M_y-N_x}{N}=\dfrac{2}{y^2-x}$ still contains $x$ and $y$, so no $\mu(x)$ of this form
3. Try $\mu(y)$: $\dfrac{N_x-M_y}{M}=\dfrac{-1-1}{y}=-\dfrac{2}{y}$, a function of $y$ alone
4. So $\mu(y)=e^{\int -2\,dy/y}=y^{-2}$
5. Multiply: $y^{-1}\,dx+(1-xy^{-2})\,dy=0$
6. Re-test: $M_y=-y^{-2}$ and $N_x=-y^{-2}$ — exact
7. $F=\int y^{-1}\,dx=\dfrac{x}{y}+g(y)$ and $F_y=-\dfrac{x}{y^2}+g'(y)=1-\dfrac{x}{y^2}$, so $g'(y)=1$ and $g(y)=y$

> [!success]- Answer
> **$\dfrac{x}{y}+y=C$, equivalently $x+y^2=Cy$.**

> [!warning] Trap
> Giving up when the $\mu(x)$ ratio fails to simplify. The equation is solvable, but only with $\mu(y)$; both ratios must be computed before concluding anything.

## Traps & Exam Notes

- **Swapping the partials in the test.** The condition is $M_y=N_x$. Computing $M_x$ and $N_y$ and declaring the equation exact gives a wrong answer that passes a careless re-read.
- **Treating the x-integration constant as a number.** $F=\int M\,dx+g(y)$; the unknown is a function of $y$. Any surviving $x$ in $g'(y)$ is proof the equation was not exact (or that $\mu$ was wrong).
- **Reversing the integrating-factor numerators.** $\mu(x)=\exp\int\frac{M_y-N_x}{N}dx$ and $\mu(y)=\exp\int\frac{N_x-M_y}{M}dy$. Swapping the numerators gives $1/\mu$, which is not an integrating factor.
- **Not checking that the ratio is single-variable.** $(M_y-N_x)/N$ must be free of $y$ before it can be integrated as a function of $x$; if it still contains $y$, no such $\mu(x)$ exists and the $\mu(y)$ route must be tried.
- **Re-testing the original $M$ and $N$ after multiplying.** The test must be applied to $\mu M$ and $\mu N$.
- **Reporting $F(x,y)$ instead of $F(x,y)=C$.** The level curve is the solution. $F$ alone is a potential, not a family of curves, and dropping $C$ discards the arbitrary constant that the initial condition fixes.

## See Also

- [[02_Linear_First_Order_and_Bernoulli]]
- [[04_Homogeneous_Equations_and_Substitutions]]
- [[06_Mixtures_and_Orthogonal_Trajectories]]
- [[06_Partial_Fractions]]

---

[[02_Linear_First_Order_and_Bernoulli|⬅ 02]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[04_Homogeneous_Equations_and_Substitutions|04 ➡]]
