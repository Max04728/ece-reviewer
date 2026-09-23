---
id: MATH-03-04
title: "Homogeneous Equations and Substitutions"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 4
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Separation_of_Variables]]", "[[02_Algebraic_Substitution]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — Homogeneous Equations and Substitutions

> [!abstract] Scope
> Solve homogeneous first-order ODEs of the form dy/dx = f(y/x) with the substitution y = vx, and handle equations reducible to separable form by u = ax + by + c.

## Core Concept

> [!tip] Intuition
> A homogeneous equation depends on x and y only through their ratio, so the ratio itself is the natural variable. Switching to v = y/x turns a two-variable slope condition into a separable equation in v and x.

**Recognising a homogeneous equation.** The equation $M\,dx+N\,dy=0$ is homogeneous when $M$ and $N$ are homogeneous of the *same* degree $n$:
$$M(tx,ty)=t^{n}M(x,y)$$
and $N(tx,ty)=t^{n}N(x,y)$. Dividing by $x^{n}$ then leaves a right-hand side that depends only on $y/x$, so the equation can be written:
$$\frac{dy}{dx}=f\!\left(\frac{y}{x}\right)$$
Equivalently, every term must have the same total degree in $x$ and $y$ — $x^2+y^2$ and $xy$ both have degree 2, so $\frac{dy}{dx}=\frac{x^2+y^2}{2xy}$ is homogeneous.

**The substitution and the derivative that goes with it.** Put $y=vx$, so $v=y/x$ is the new unknown. Differentiating the product gives $\frac{dy}{dx}=v+x\frac{dv}{dx}$. Substituting into $\frac{dy}{dx}=f(v)$ gives $x\frac{dv}{dx}=f(v)-v$, which is **separable** in $v$ and $x$:
$$\frac{dv}{f(v)-v}=\frac{dx}{x}$$
This is the whole method — homogeneity guarantees that $x$ cancels out of the right-hand side, leaving the two variables separated.

**Why the x must cancel.** If the substitution leaves an $x$ behind in $f(v)-v$, the equation was not homogeneous. That is the self-check: after substituting, every $x$ must disappear from the $v$-side. When it does not, either the equation needs a different substitution or it is linear and belongs in [[02_Linear_First_Order_and_Bernoulli]].

**After integrating, go back to y.** The integral gives a relation in $v$ and $x$; the answer is only finished when $v$ is replaced by $y/x$. Forgetting the back-substitution is the classic way to lose all the marks on an otherwise perfect solution.

**Zeros of $f(v)-v$ give singular solutions.** Values $v=c$ with $f(c)=c$ make $x\frac{dv}{dx}=0$, so $y=cx$ is a solution that the separated form divides away. These straight lines through the origin are usually present in the final implicit answer only for particular values of $C$.

**The other reduction:
$$\frac{dy}{dx}=f(ax+by+c)$$
** When $x$ and $y$ appear only in the single combination $ax+by+c$, put $u=ax+by+c$. Then $\frac{du}{dx}=a+b\,f(u)$, which is separable. Note this is a *different* substitution from $v=y/x$: the equation $\frac{dy}{dx}=x+y+1$ is not homogeneous (the degrees 1, 1 and 0 do not match), and $v=y/x$ would fail on it while $u=x+y+1$ succeeds immediately.

**Domain and sign.** The integral of the $v$-side often produces $\ln\lvert x\rvert$, so the solution is quoted on $x>0$ or $x<0$ separately, and any square roots that appear (as in $\sqrt{1+v^{2}}$) fix the sign of the constant. State the interval; an implicit relation that silently assumes $x>0$ is incomplete.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Homogeneous form | $\frac{dy}{dx}=f\!\left(\frac{y}{x}\right)$ | The slope depends on x and y only through their ratio y/x. |
| Degree test | $M(tx,ty)=t^{n}M(x,y),\quad N(tx,ty)=t^{n}N(x,y)$ | Both M and N must be homogeneous of the SAME degree n. |
| Substitution | $y=vx,\qquad \frac{dy}{dx}=v+x\frac{dv}{dx}$ | The product rule supplies the v term; dropping it is the most common error in this topic. |
| Reduced separable equation | $x\frac{dv}{dx}=f(v)-v$ | Every x must cancel here. A surviving x means the equation was not homogeneous. |
| Separated form | $\int\frac{dv}{f(v)-v}=\int\frac{dx}{x}=\ln\lvert x\rvert+C$ | Then replace v by y/x. Quote the interval on one side of x = 0. |
| Singular straight lines | $f(c)=c\ \Rightarrow\ y=cx$ | Lost when dividing by f(v) - v; list them separately. |
| Shift substitution | $u=ax+by+c\ \Rightarrow\ \frac{du}{dx}=a+b\,f(u)$ | For dy/dx = f(ax + by + c). Not the same as v = y/x. |
| Worked pattern | $\frac{dy}{dx}=\frac{x^{2}+y^{2}}{2xy}\ \Rightarrow\ x^{2}-y^{2}=Cx$ | Standard homogeneous example: the solution family is a set of hyperbolas through the origin. |

## Worked Problems

### P1. Solve $(x^2+y^2)\,dx-2xy\,dy=0$.

**Given:** M = x^2 + y^2; N = -2xy

**Solution:**

1. Both M and N have degree 2, so the equation is homogeneous
2. Write $\dfrac{dy}{dx}=\dfrac{x^{2}+y^{2}}{2xy}$ and set $y=vx$, $\dfrac{dy}{dx}=v+x\dfrac{dv}{dx}$
3. $v+xv'=\dfrac{1+v^{2}}{2v}$, so $xv'=\dfrac{1+v^{2}-2v^{2}}{2v}=\dfrac{1-v^{2}}{2v}$
4. Separate: $\dfrac{2v}{1-v^{2}}\,dv=\dfrac{dx}{x}$
5. $-\ln\lvert 1-v^{2}\rvert=\ln\lvert x\rvert+C$, so $x(1-v^{2})=K$
6. Back-substitute $v=y/x$: $x\left(1-\dfrac{y^{2}}{x^{2}}\right)=K$, i.e. $x^{2}-y^{2}=Kx$
7. Also $v=\pm1$ gives the singular solutions $y=\pm x$ (the case $K=0$)

> [!success]- Answer
> **$x^{2}-y^{2}=Cx$, together with the singular lines $y=\pm x$.**

> [!warning] Trap
> Writing $\frac{dy}{dx}=x\frac{dv}{dx}$ and dropping the $v$. That omits the linear term and produces an equation in $v$ that no longer matches the original; the check is that $x$ must cancel completely from $f(v)-v$.

### P2. Solve $\dfrac{dy}{dx}=\dfrac{x+y}{x-y}$.

**Given:** numerator and denominator both degree 1; homogeneous

**Solution:**

1. Divide numerator and denominator by $x$: $\dfrac{dy}{dx}=\dfrac{1+v}{1-v}$ with $v=y/x$
2. $v+xv'=\dfrac{1+v}{1-v}$, so $xv'=\dfrac{1+v}{1-v}-v=\dfrac{1+v-v+v^{2}}{1-v}=\dfrac{1+v^{2}}{1-v}$
3. Separate: $\dfrac{1-v}{1+v^{2}}\,dv=\dfrac{dx}{x}$
4. $\displaystyle\int\dfrac{dv}{1+v^{2}}-\int\dfrac{v\,dv}{1+v^{2}}=\arctan v-\tfrac12\ln(1+v^{2})=\ln\lvert x\rvert+C$
5. Since $\ln\lvert x\rvert+\tfrac12\ln(1+v^{2})=\tfrac12\ln(x^{2}+y^{2})$, the relation simplifies
6. Back-substitute $v=y/x$

> [!success]- Answer
> **$\arctan\!\left(\dfrac{y}{x}\right)=\tfrac12\ln(x^{2}+y^{2})+C$ (implicit).**

> [!warning] Trap
> Integrating $\frac{1-v}{1+v^{2}}$ as a single log. It splits into $\frac{1}{1+v^{2}}-\frac{v}{1+v^{2}}$, whose integrals are $\arctan v$ and $-\frac12\ln(1+v^{2})$ — an inverse-tangent term that cannot be dropped.

### P3. Solve $\left(y+\sqrt{x^{2}+y^{2}}\right)dx-x\,dy=0$ for $x>0$.

**Given:** M = y + sqrt(x^2+y^2); N = -x

**Solution:**

1. Solve for the slope: $\dfrac{dy}{dx}=\dfrac{y+\sqrt{x^{2}+y^{2}}}{x}$
2. Divide by $x$: with $v=y/x$ this is $\dfrac{dy}{dx}=v+\sqrt{1+v^{2}}$
3. $v+xv'=v+\sqrt{1+v^{2}}$, so $xv'=\sqrt{1+v^{2}}$ — the $v$ cancels, confirming homogeneity
4. $\dfrac{dv}{\sqrt{1+v^{2}}}=\dfrac{dx}{x}$, and $\displaystyle\int\dfrac{dv}{\sqrt{1+v^{2}}}=\ln\!\left(v+\sqrt{1+v^{2}}\right)$
5. $\ln\!\left(v+\sqrt{1+v^{2}}\right)=\ln x+C$, so $v+\sqrt{1+v^{2}}=Cx$
6. Back-substitute $v=y/x$ and multiply by $x>0$

> [!success]- Answer
> **$y+\sqrt{x^{2}+y^{2}}=Cx^{2}$.**

> [!warning] Trap
> Using $\int\frac{dv}{\sqrt{1+v^{2}}}=\arcsin v$. It is $\operatorname{arsinh}v=\ln\left(v+\sqrt{1+v^{2}}\right)$; arcsin belongs with $\sqrt{1-v^{2}}$, and the two are not interchangeable.

### P4. Solve $\dfrac{dy}{dx}=x+y+1$.

**Given:** x and y appear only as x + y + 1

**Solution:**

1. The degrees do not match, so this is NOT homogeneous; use the shift $u=x+y+1$
2. $\dfrac{du}{dx}=1+\dfrac{dy}{dx}=1+u$
3. Separate: $\dfrac{du}{1+u}=dx$
4. $\ln\lvert 1+u\rvert=x+C$, so $1+u=Ce^{x}$
5. Since $u=x+y+1$: $x+y+2=Ce^{x}$, so $y=Ce^{x}-x-2$
6. Check: $y'=Ce^{x}-1$ and $x+y+1=x+Ce^{x}-x-2+1=Ce^{x}-1$

> [!success]- Answer
> **$y=Ce^{x}-x-2$.**

> [!warning] Trap
> Applying $v=y/x$ because the equation 'looks like a differential equation about x and y'. After $v=y/x$ the reduced equation is $xv'=1+v+1/x$, which still contains $x$ — the tell that homogeneity was never there. $\frac{dy}{dx}=x+y+1$ is linear, and the shift $u=x+y+1$ is the fast route.

### P5. Solve $\dfrac{dy}{dx}=(x+y)^{2}$.

**Given:** right-hand side depends only on x + y

**Solution:**

1. Put $u=x+y$, so $\dfrac{du}{dx}=1+\dfrac{dy}{dx}=1+u^{2}$
2. Separate: $\dfrac{du}{1+u^{2}}=dx$
3. $\arctan u=x+C$, so $u=\tan(x+C)$
4. Since $u=x+y$: $x+y=\tan(x+C)$
5. Check: $y'=\sec^{2}(x+C)-1=\tan^{2}(x+C)=(x+y)^{2}$

> [!success]- Answer
> **$y=\tan(x+C)-x$, defined on intervals not containing $x=-C\pm\dfrac{\pi}{2}$.**

> [!warning] Trap
> Expanding $(x+y)^{2}=x^{2}+2xy+y^{2}$ and treating the equation as homogeneous of degree 2. A homogeneous right-hand side must be degree **zero** in the ratio sense — here the term $(x+y)^{2}$ has degree 2 and the left side has degree 0, so the shift substitution is the right tool.

## Traps & Exam Notes

- **Dropping the $v$ in $\frac{dy}{dx}=v+x\frac{dv}{dx}$.** This alone accounts for most wrong answers in the topic; without the $v$ the reduced equation does not match the original at all.
- **Not verifying homogeneity before substituting.** If $f(v)-v$ still contains $x$, the substitution is invalid. Check that $M(tx,ty)=t^{n}M$ and $N(tx,ty)=t^{n}N$ for the *same* $n$ first.
- **Failing to back-substitute $v=y/x$.** An answer in $v$ is an answer to a different problem. Every occurrence of $v$ must become $y/x$ before the solution is finished.
- **Using $v=y/x$ on $\frac{dy}{dx}=f(ax+by+c)$.** Equations that depend on $x$ and $y$ only through $ax+by+c$ need $u=ax+by+c$; $v=y/x$ leaves an $x$ behind and does not separate.
- **Discarding the singular lines $y=cx$ where $f(c)=c$.** Dividing by $f(v)-v$ removes them, and they are genuine solutions (often the $C=0$ member of the family, but sometimes not).
- **Losing a factor of 2 in the log integral.** $\int\frac{2v}{1-v^{2}}dv=-\ln\lvert 1-v^{2}\rvert$, not $-2\ln\lvert 1-v^{2}\rvert$; forgetting the substitution $u=1-v^{2}$ halves or doubles the exponent of the final answer.
- **Quoting an implicit solution with no interval.** The integration produces $\ln\lvert x\rvert$, so the family splits across $x=0$; state the side that contains the data.

## See Also

- [[01_Separation_of_Variables]]
- [[02_Linear_First_Order_and_Bernoulli]]
- [[03_Exact_Equations_and_Integrating_Factors]]
- [[06_Mixtures_and_Orthogonal_Trajectories]]

---

[[03_Exact_Equations_and_Integrating_Factors|⬅ 03]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[05_Growth,_Decay_and_Newton’s_Cooling|05 ➡]]
