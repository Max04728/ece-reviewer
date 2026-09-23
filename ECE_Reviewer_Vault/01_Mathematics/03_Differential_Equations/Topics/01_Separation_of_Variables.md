---
id: MATH-03-01
title: "Separation of Variables"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 1
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Antiderivatives_and_Standard_Forms]]", "[[02_Differentiation_Rules]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Separation of Variables

> [!abstract] Scope
> Solve first-order ODEs of the form dy/dx = f(x)g(y) by separating the variables, including initial-value problems, implicit solutions, lost singular solutions and the interval of validity.

## Core Concept

> [!tip] Intuition
> Separation works because y is a function of x: the chain rule converts the integral of y'/g(y) into the integral of 1/g(y) taken with respect to y. One two-variable problem becomes two independent one-variable integrals.

**The form, and how to recognise it.** A first-order ODE is *separable* when the right-hand side factors into a function of $x$ alone times a function of $y$ alone:
$$\frac{dy}{dx}=f(x)g(y)$$
The test is exactly that factorisation — a product of a pure-$x$ piece and a pure-$y$ piece. A sum such as $\frac{dy}{dx}=x+y$ is **not** separable, and no algebraic rearrangement makes it so; it needs an integrating factor (see [[02_Linear_First_Order_and_Bernoulli]]).

**Why the split is legal (it is not treating $dx$ as a fraction).** Let $H(y)=\int \frac{dy}{g(y)}$ and differentiate $H(y(x))$ in $x$. The chain rule gives:
$$\frac{d}{dx}H(y)=H'(y)\,y'=\frac{1}{g(y)}\cdot g(y)f(x)=f(x)$$
Integrating both sides with respect to $x$ yields $H(y)=\int f(x)\,dx+C$. So $\frac{dy}{g(y)}=f(x)\,dx$ is a chain-rule identity, valid on any interval where $g(y)\neq 0$. This is the sense in which the differentials are separated.

**The constant goes on one side only.** Write $\int\frac{dy}{g(y)}=\int f(x)\,dx+C$. A constant on each side is not wrong, but the two must collapse into one: $C_1-C_2$ is a single arbitrary constant. Carrying two independent constants through the algebra produces a 'general solution' with more freedom than the ODE has, and no initial condition can fix both.

**Initial conditions fix the constant and the branch.** If $\int\frac{dy}{g(y)}$ gives $\ln|y|$, exponentiating gives $|y|=e^{C}e^{H(x)}$, and the $\pm$ is absorbed into a *new* constant $K=\pm e^{C}$ that may be positive **or** negative. Solve for $K$ from the data instead of assuming $K>0$. The definite-integral form:
$$\int_{y_0}^{y}\frac{dt}{g(t)}=\int_{x_0}^{x}f(s)\,ds$$
This removes the constant entirely and is the safest route on an exam.

**Implicit answers are legitimate.** When $\int \frac{dy}{g(y)}$ cannot be inverted in elementary functions — the classic case is $\int(1+y^2)\,dy=y+\frac{y^3}{3}$ — the correct board answer is the implicit relation $F(x,y)=C$. Manufacturing an explicit $y$ by inventing an inverse is a worse answer than the implicit one.

**Two silent failures.** (1) Dividing by $g(y)$ assumes $g(y)\neq 0$. Every constant $c$ with $g(c)=0$ yields the **singular solution** $y\equiv c$, which is not contained in the general solution and must be listed separately. (2) The solution is valid only on the largest interval containing $x_0$ on which the formula is defined and differentiable — it stops at the first vertical asymptote or branch point, not where the algebra happens to end.

**Exam shape.** Practically every separable item on the ECE board is one of three things: a rate law $\frac{dy}{dt}=ky$ (growth, decay, RC/RL — see [[05_Growth,_Decay_and_Newton’s_Cooling]] and [[11_RLC_Circuit_Transients]]), a rational/algebraic splitting such as $\frac{dy}{dx}=\frac{x+1}{y}$, or a geometry question phrased as a slope condition. The routine never changes: factor, record singular solutions, separate, integrate, apply the condition, state the interval.

## Derivation

**Step 1 — factor and record the excluded values.** Put the ODE in the form $\frac{dy}{dx}=f(x)g(y)$ and solve $g(c)=0$. Each such $c$ gives the constant solution $y\equiv c$; list these now, because dividing by $g(y)$ in the next step deletes them from the general solution.

**Step 2 — define the antiderivative of the reciprocal.** On an interval where $g(y)\neq 0$, set $H(y)=\int\frac{dy}{g(y)}$. Since $g$ has no zero there, $H$ is a genuine antiderivative and $H'(y)=\frac{1}{g(y)}$.

**Step 3 — differentiate $H(y(x))$ with the chain rule.** $\frac{d}{dx}H(y(x))=H'(y(x))\,y'(x)=\frac{1}{g(y)}\cdot f(x)g(y)=f(x)$. The $g(y)$ cancels — this is the whole mechanism of the method.

**Step 4 — integrate both sides in $x$.** $H(y(x))=\int f(x)\,dx+C$, that is, $\int\frac{dy}{g(y)}=\int f(x)\,dx+C$. One arbitrary constant only.

**Step 5 — impose the initial condition.** $y(x_0)=y_0$ gives $C=H(y_0)-\int^{x_0}f(x)\,dx$. Equivalently, integrate from the data point: $\int_{y_0}^{y}\frac{dt}{g(t)}=\int_{x_0}^{x}f(s)\,ds$, in which no constant appears and no sign ambiguity is introduced.

**Step 6 — solve for $y$ if possible, then state the interval.** Choose the $\pm$ branch from the sign of $y_0$, add back any singular solutions, and give the largest open interval containing $x_0$ on which the solution exists — it ends at the first singularity of the formula.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Separable form | $\frac{dy}{dx}=f(x)\,g(y)$ | The test: RHS must factor into a pure-x factor times a pure-y factor. A sum such as x+y fails the test. |
| Separation | $\frac{dy}{g(y)}=f(x)\,dx$ | Valid only where g(y) is nonzero; the zeros of g give constant singular solutions. |
| General solution | $\int \frac{dy}{g(y)}=\int f(x)\,dx+C$ | One arbitrary constant only, on one side. |
| Definite-integral form | $\int_{y_0}^{y}\frac{dt}{g(t)}=\int_{x_0}^{x}f(s)\,ds$ | Best form for an initial-value problem: C cancels identically and no branch guess is needed. |
| Linear rate law | $\frac{dy}{dt}=ky\ \Rightarrow\ y=y_0e^{k(t-t_0)}$ | k > 0 growth, k < 0 decay. t must be the elapsed time from the reference instant. |
| Quotient form | $\frac{dy}{dx}=\frac{f(x)}{h(y)}\ \Rightarrow\ \int h(y)\,dy=\int f(x)\,dx$ | Same method written as cross-multiplication; watch for zeros of h(y). |
| Singular solution | $g(c)=0\ \Rightarrow\ y\equiv c$ | A solution lost by division. Must be reported separately; it may or may not satisfy the initial condition. |
| Exponentiating a log | $\ln\lvert y\rvert=H(x)+C\ \Rightarrow\ y=Ke^{H(x)}$ | K = ±e^C is any nonzero real; K = 0 is the singular solution y = 0. Fix the sign from the data. |
| Geometry / slope condition | $\frac{dy}{dx}=\frac{y}{x+1}\ \Rightarrow\ \frac{dy}{y}=\frac{dx}{x+1}$ | Slope-given problems are separable whenever the slope factors; the point given is the initial condition. |
| Worked pattern | $\frac{dy}{dx}=\frac{1}{xy}\ \Rightarrow\ \tfrac12y^2=\ln\lvert x\rvert+C$ | Do not forget the 1/2 from ∫y dy, and the domain is limited by the log, not by the square root. |

## Worked Problems

### P1. Solve $\dfrac{dy}{dx}=3x^2y$ with $y(0)=2$.

**Given:** dy/dx = 3x^2 y; y(0) = 2

**Solution:**

1. $g(y)=y$ has the zero $y=0$, so $y\equiv 0$ is a singular solution (not the one we need here).
2. Separate: $\dfrac{dy}{y}=3x^2\,dx$
3. Integrate: $\ln\lvert y\rvert=x^3+C$
4. Exponentiate: $y=Ke^{x^3}$ with $K=\pm e^{C}$
5. Apply $y(0)=2$: $K e^{0}=K=2$

> [!success]- Answer
> **$y=2e^{x^3}$, valid for all real $x$.**

> [!warning] Trap
> Reporting $y=Ce^{x^3}$ and then substituting the initial condition into the *original* equation instead of into the solved form; also forgetting that $K$ may be negative, so the sign must come from $y(0)$, not from an assumption that $K=e^{C}>0$.

### P2. Solve $\dfrac{dy}{dx}=\dfrac{x+1}{y}$ with $y(0)=3$.

**Given:** dy/dx = (x+1)/y; y(0) = 3

**Solution:**

1. Separate: $y\,dy=(x+1)\,dx$
2. Integrate: $\dfrac{y^2}{2}=\dfrac{x^2}{2}+x+C$, i.e. $y^2=x^2+2x+C'$
3. Apply $y(0)=3$: $9=0+0+C'$, so $C'=9$
4. Therefore $y^2=x^2+2x+9$; since $y(0)=3>0$ take the positive root
5. Check: $x^2+2x+9=(x+1)^2+8>0$ for all $x$, so the solution exists everywhere

> [!success]- Answer
> **$y=\sqrt{x^2+2x+9}$ for all real $x$.**

> [!warning] Trap
> Writing $y=\pm\sqrt{x^2+2x+9}$. The initial condition selects one branch; a bare $\pm$ is an incomplete answer and often marked wrong even when both roots satisfy the relation.

### P3. Solve $\dfrac{dy}{dx}=2xy^2$ with $y(0)=1$, and state the interval of validity.

**Given:** dy/dx = 2xy^2; y(0) = 1

**Solution:**

1. $g(y)=y^2$ vanishes at $y=0$, so $y\equiv 0$ is a singular solution and must be listed.
2. Separate: $\dfrac{dy}{y^2}=2x\,dx$
3. Integrate: $-\dfrac{1}{y}=x^2+C$
4. Apply $y(0)=1$: $-1=C$
5. So $-\dfrac1y=x^2-1$, giving $\dfrac1y=1-x^2$ and $y=\dfrac{1}{1-x^2}$
6. The formula blows up at $x=\pm1$, so the solution lives on $-1<x<1$

> [!success]- Answer
> **$y=\dfrac{1}{1-x^2}$ on $-1<x<1$; plus the singular solution $y\equiv 0$.**

> [!warning] Trap
> Stopping at $y=1/(1-x^2)$ with no interval, or claiming the solution holds for all $x$. The solution is undefined at $x=\pm1$ because the reciprocal of $1-x^2$ is not differentiable there — the answer is only the branch through $x_0=0$.

### P4. Solve $\dfrac{dy}{dx}=e^{x+y}$ with $y(0)=0$.

**Given:** dy/dx = e^{x+y}; y(0) = 0

**Solution:**

1. Factor the exponential: $e^{x+y}=e^{x}e^{y}$
2. Separate: $e^{-y}\,dy=e^{x}\,dx$
3. Integrate: $-e^{-y}=e^{x}+C$
4. Apply $y(0)=0$: $-1=1+C$, so $C=-2$
5. Then $e^{-y}=2-e^{x}$, i.e. $y=-\ln(2-e^{x})$
6. The log requires $2-e^{x}>0$, so $x<\ln 2$

> [!success]- Answer
> **$y=-\ln(2-e^{x})$ on $x<\ln 2$.**

> [!warning] Trap
> Treating $e^{x+y}$ as not separable because it 'looks like a sum'. The exponent add law makes it a product: $e^{x+y}=e^{x}e^{y}$. Missing that factorisation abandons a one-line problem.

### P5. Solve $\dfrac{dy}{dx}=\dfrac{3x^2+2x}{2y}$ with $y(1)=2$.

**Given:** dy/dx = (3x^2+2x)/(2y); y(1) = 2

**Solution:**

1. Separate: $2y\,dy=(3x^2+2x)\,dx$
2. Integrate: $y^2=x^3+x^2+C$
3. Apply $y(1)=2$: $4=1+1+C$, so $C=2$
4. Hence $y^2=x^3+x^2+2$
5. Take the positive root because $y(1)=2>0$

> [!success]- Answer
> **$y=\sqrt{x^3+x^2+2}$, defined where $x^3+x^2+2\geq 0$ and the branch stays positive.**

> [!warning] Trap
> Dropping the 2 on the left: integrating $\frac{dy}{dx}=\frac{3x^2+2x}{2y}$ as $y\,dy=(3x^2+2x)\,dx$ misses the factor 2 and halves the answer.

### P6. Solve $\dfrac{dy}{dx}=xy^3$ with $y(0)=1$.

**Given:** dy/dx = x y^3; y(0) = 1

**Solution:**

1. Separate: $\dfrac{dy}{y^3}=x\,dx$
2. Integrate: $-\dfrac{1}{2y^2}=\dfrac{x^2}{2}+C$
3. Apply $y(0)=1$: $-\dfrac12=C$
4. Then $\dfrac{1}{2y^2}=\dfrac12-\dfrac{x^2}{2}$, so $\dfrac{1}{y^2}=1-x^2$
5. Therefore $y=\dfrac{1}{\sqrt{1-x^2}}$ on $-1<x<1$
6. Also $y\equiv 0$ is a singular solution, lost when dividing by $y^3$

> [!success]- Answer
> **$y=\dfrac{1}{\sqrt{1-x^2}}$ on $-1<x<1$; plus the singular solution $y\equiv 0$.**

> [!warning] Trap
> Forgetting the 1/2 that appears when integrating $y^{-3}$. Writing $-1/y^2 = x^2+C$ gives $y=1/\sqrt{1/2-x^2}$, which fails the check $y(0)=1$.

### P7. Solve $\dfrac{dy}{dx}=\dfrac{2x}{1+y^2}$ with $y(0)=1$. Leave the answer implicit if necessary.

**Given:** dy/dx = 2x/(1+y^2); y(0) = 1

**Solution:**

1. Separate: $(1+y^2)\,dy=2x\,dx$
2. Integrate: $y+\dfrac{y^3}{3}=x^2+C$
3. Apply $y(0)=1$: $1+\dfrac13=\dfrac43=C$
4. Multiply by 3 to clear fractions

> [!success]- Answer
> **$3y+y^3=3x^2+4$ (implicit).**

> [!warning] Trap
> Trying to invert $y+y^3/3$ into an explicit $y$. This cubic has no practical closed-form inverse; the implicit relation is the complete answer and the extra algebra only introduces errors.

### P8. A curve has slope $\dfrac{dy}{dx}=\dfrac{y}{x+1}$ at every point and passes through $(0,2)$. Find its equation.

**Given:** slope = y/(x+1); point (0, 2)

**Solution:**

1. The slope factors, so the ODE is separable: $\dfrac{dy}{y}=\dfrac{dx}{x+1}$
2. Integrate: $\ln\lvert y\rvert=\ln\lvert x+1\rvert+C$
3. Combine logs: $\ln\left\lvert\dfrac{y}{x+1}\right\rvert=C$, so $y=K(x+1)$
4. Apply $(0,2)$: $2=K(1)$, so $K=2$

> [!success]- Answer
> **$y=2(x+1)$, a straight line through $(0,2)$.**

> [!warning] Trap
> Losing the arbitrary constant when the two logs are combined. $\ln\lvert y\rvert-\ln\lvert x+1\rvert=C$ still carries a constant; setting it to zero produces the single line $y=x+1$, which does not pass through $(0,2)$.

### P9. Solve $\dfrac{dy}{dx}=\dfrac{1+y^2}{1+x^2}$ with $y(0)=1$.

**Given:** dy/dx = (1+y^2)/(1+x^2); y(0) = 1

**Solution:**

1. Separate: $\dfrac{dy}{1+y^2}=\dfrac{dx}{1+x^2}$
2. Integrate: $\arctan y=\arctan x+C$
3. Apply $y(0)=1$: $\arctan 1=\dfrac{\pi}{4}=0+C$, so $C=\dfrac{\pi}{4}$
4. Thus $\arctan y=\arctan x+\dfrac{\pi}{4}$
5. Take tangents and use the addition formula: $y=\tan\!\left(\arctan x+\dfrac{\pi}{4}\right)=\dfrac{x+1}{1-x}$

> [!success]- Answer
> **$y=\dfrac{1+x}{1-x}$ on $x<1$.**

> [!warning] Trap
> Reporting $\arctan y=\arctan x+C$ as the final answer and then 'simplifying' to $y=x+C$. Arctangent is not linear — the constant is added to the *angle*, so it must be carried through the tangent addition formula.

### P10. Solve $xy\,dy=dx$ with $y(1)=2$ (equivalently $\dfrac{dy}{dx}=\dfrac{1}{xy}$).

**Given:** dy/dx = 1/(xy); y(1) = 2

**Solution:**

1. Separate: $y\,dy=\dfrac{dx}{x}$
2. Integrate: $\dfrac{y^2}{2}=\ln\lvert x\rvert+C$
3. Apply $y(1)=2$: $\dfrac42=0+C$, so $C=2$
4. Hence $y^2=2\ln\lvert x\rvert+4$; the data point has $y>0$ so take the positive root
5. For $x>0$ the radicand is positive when $\ln x>-2$, i.e. $x>e^{-2}$

> [!success]- Answer
> **$y=\sqrt{2\ln x+4}$ on $x>e^{-2}$.**

> [!warning] Trap
> Choosing the domain from the square root alone. $\sqrt{2\ln x+4}$ is defined for $x\geq e^{-2}$, but the ODE contains $1/x$ and the integral $\int dx/x$ needs $x>0$, so the valid interval is $x>e^{-2}$ (open at the left end).

## Traps & Exam Notes

- **Dividing by $g(y)$ deletes the singular solutions.** $\frac{dy}{dx}=2xy^2$ also has the solution $y\equiv 0$; $\frac{dy}{dx}=xy^3$ also has $y\equiv 0$. The general solution never contains them, so they must be stated separately.
- **Two arbitrary constants.** Adding $C_1$ to the $y$-integral and $C_2$ to the $x$-integral and then carrying both leaves a solution family with one parameter too many; only the difference $C_1-C_2$ is physical.
- **Assuming $K=e^{C}>0$ after exponentiating $\ln\lvert y\rvert$.** The correct constant is $K=\pm e^{C}$, which may be negative; the sign is fixed by the initial condition, not by the algebra.
- **Separating a non-separable equation.** $\frac{dy}{dx}=x+y$ does not factor, so writing $\frac{dy}{y}=x\,dx$ is meaningless. Test for a product first; sums need an integrating factor.
- **Reporting the branch without its interval of validity.** $y=1/(1-x^2)$ is a solution only on an interval not containing $x=\pm1$; the board answer expects the largest interval containing $x_0$.
- **Forgetting the constant from a division in the integral.** $\int y^{-3}dy=-\frac{1}{2y^2}$: dropping the $\frac12$ is the single most common arithmetic loss in this topic and it survives every later step.

## See Also

- [[02_Linear_First_Order_and_Bernoulli]]
- [[04_Homogeneous_Equations_and_Substitutions]]
- [[05_Growth,_Decay_and_Newton’s_Cooling]]
- [[01_Antiderivatives_and_Standard_Forms]]
- [[02_Algebraic_Substitution]]

---

⬅ *start* · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[02_Linear_First_Order_and_Bernoulli|02 ➡]]
