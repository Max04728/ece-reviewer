---
id: MATH-03-07
title: "Higher Order Homogeneous Auxiliary Equation"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Algebraic_Substitution]]", "[[05_Trigonometric_Integrals_and_Substitution]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Higher Order Homogeneous Auxiliary Equation

> [!abstract] Scope
> Solve linear homogeneous constant-coefficient ODEs by the auxiliary (characteristic) equation, handling distinct real, repeated real and complex conjugate roots, plus the Euler-Cauchy variable-coefficient case.

## Core Concept

> [!tip] Intuition
> Guessing y = e^{mx} turns differentiation into multiplication by m, so the differential equation becomes an ordinary polynomial equation. Every solution of the ODE is a combination of exponentials built from the roots of that polynomial.

**The ansatz and the auxiliary equation.** For $a y''+b y'+c y=0$ with constant $a,b,c$, try $y=e^{mx}$. Then $y'=me^{mx}$ and $y''=m^{2}e^{mx}$, and the ODE becomes $\left(am^{2}+bm+c\right)e^{mx}=0$. Since $e^{mx}$ is never zero, the bracket must vanish: $am^{2}+bm+c=0$ is the **auxiliary** (or characteristic) equation. The exponential ansatz is not a guess in the dark — it is the one function family that is closed under differentiation, and only such a family can satisfy a constant-coefficient equation term by term.

**Case 1 — distinct real roots.** If $m_1\neq m_2$, then $y=C_1e^{m_1x}+C_2e^{m_2x}$ is the general solution. Two roots give two independent solutions, and the linear combination is general because the ODE is linear and homogeneous.

**Case 2 — a repeated real root.** If $m_1=m_2=m$, then $e^{mx}$ alone supplies only one independent solution, and the general solution is: $y=(C_1+C_2x)e^{mx}$. The extra factor $x$ is exactly the same phenomenon as resonance: when the forcing or the second root duplicates a solution you already have, the second independent solution is that solution multiplied by $x$. Without the $x$, the two 'constants' are not independent and the general solution cannot satisfy arbitrary initial conditions.

**Case 3 — complex conjugate roots.** If $m=\alpha\pm j\beta$ with $\beta\neq0$, Euler's formula converts the complex exponentials into real oscillatory functions:
$$y=e^{\alpha x}\left(C_1\cos\beta x+C_2\sin\beta x\right)$$
Here $\alpha=-b/(2a)$ controls the exponential envelope (decay if $\alpha<0$) and $\beta=\sqrt{4ac-b^{2}}/(2a)$ controls the oscillation frequency. Both a cosine and a sine are needed; with only one of them the two free constants cannot be matched to two initial conditions.

**Order equals the number of constants.** An $n$-th order linear homogeneous ODE has an $n$-th degree auxiliary equation with $n$ roots, and the general solution carries $n$ arbitrary constants. A third-order equation whose answer contains only two constants is incomplete even if every term in it satisfies the ODE. Roots are counted with multiplicity, and repeated roots contribute the extra factors of $x$ one at a time: a triple root $m$ gives $\left(C_1+C_2x+C_3x^{2}\right)e^{mx}$.

**Why roots can be read straight off the coefficients.** For $a y''+b y'+c y=0$ the root sum is $-b/a$ and the root product is $c/a$. These two checks catch sign errors instantly: if the proposed roots do not sum to $-b/a$, the factorisation is wrong. For the repeated case the discriminant $b^{2}-4ac$ vanishes; for the complex case it is negative and the frequency is:
$$\beta=\sqrt{\lvert b^{2}-4ac\rvert}/(2a)$$

**Euler-Cauchy equations: the same idea with a power.** $a x^{2}y''+bxy'+cy=0$ is not constant-coefficient, so $y=e^{mx}$ fails. Try $y=x^{m}$ instead: $y'=mx^{m-1}$ and $y''=m(m-1)x^{m-2}$, and substitution gives $\left[am(m-1)+bm+c\right]x^{m}=0$, i.e. $am^{2}+(b-a)m+c=0$. The indicial (auxiliary) equation is *not* $am^{2}+bm+c=0$ — the $b-a$ is the whole trap. A repeated root $m$ gives $y=\left(C_1+C_2\ln x\right)x^{m}$, with $\ln x$ playing the role that $x$ played in the constant-coefficient case. Solutions are quoted for $x>0$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Constant-coefficient ODE | $a y''+b y'+c y=0$ | a, b, c constants with a not zero; homogeneous (right-hand side zero). |
| Auxiliary equation | $am^{2}+bm+c=0$ | Obtained by substituting y = e^{mx}: y'' -> m^2, y' -> m, y -> 1. |
| Distinct real roots | $y=C_1e^{m_1x}+C_2e^{m_2x}$ | Requires b^2 - 4ac > 0. Two independent solutions, two constants. |
| Repeated real root | $m=\frac{-b}{2a}\ \Rightarrow\ y=(C_1+C_2x)e^{mx}$ | Requires b^2 - 4ac = 0. Dropping the x collapses the two solutions into one. |
| Complex conjugate roots | $m=\alpha\pm j\beta\ \Rightarrow\ y=e^{\alpha x}\left(C_1\cos\beta x+C_2\sin\beta x\right)$ | alpha = -b/(2a), beta = sqrt(4ac - b^2)/(2a). Both sin and cos are required. |
| Purely imaginary roots | $m=\pm j\beta\ \Rightarrow\ y=C_1\cos\beta x+C_2\sin\beta x$ | Special case alpha = 0: undamped oscillation, no exponential envelope. |
| Third-order example | $y'''+py''+qy'+ry=0\ \Rightarrow\ m^{3}+pm^{2}+qm+r=0$ | Three roots, three constants. Factor by inspecting small integer roots first. |
| Root checks | $m_1+m_2=-\frac{b}{a},\qquad m_1m_2=\frac{c}{a}$ | Use these to verify the factorisation before writing the solution. |
| Euler-Cauchy equation | $ax^{2}y''+bxy'+cy=0\ \Rightarrow\ am(m-1)+bm+c=0$ | Try y = x^m. The auxiliary equation is am^2 + (b-a)m + c = 0, not am^2 + bm + c. |
| Euler-Cauchy repeated root | $y=\left(C_1+C_2\ln x\right)x^{m}$ | For x > 0. The logarithm replaces the factor x of the constant-coefficient case. |

## Worked Problems

### P1. Solve $y''-5y'+6y=0$ with $y(0)=1$, $y'(0)=0$.

**Given:** y'' - 5y' + 6y = 0; y(0) = 1; y'(0) = 0

**Solution:**

1. Auxiliary equation: $m^{2}-5m+6=0$
2. Factor: $(m-2)(m-3)=0$, so $m_1=2$, $m_2=3$ (distinct real)
3. General solution: $y=C_1e^{2x}+C_2e^{3x}$
4. $y(0)=1$: $C_1+C_2=1$
5. $y'=2C_1e^{2x}+3C_2e^{3x}$, so $y'(0)=2C_1+3C_2=0$
6. Solving: $C_1=3$, $C_2=-2$
7. Check: $y''-5y'+6y$ terms cancel, and $y(0)=3-2=1$, $y'(0)=6-6=0$

> [!success]- Answer
> **$y=3e^{2x}-2e^{3x}$.**

> [!warning] Trap
> Reading the auxiliary equation as $m^{2}-5m+6=1$ or as $m^{2}+5m+6=0$ by dropping the sign of $5y'$. The coefficients transfer with their signs: $y''\to m^{2}$, $-5y'\to-5m$, $+6y\to+6$.

### P2. Solve $y''+6y'+9y=0$ with $y(0)=2$, $y'(0)=1$.

**Given:** y'' + 6y' + 9y = 0; y(0) = 2; y'(0) = 1

**Solution:**

1. Auxiliary equation: $m^{2}+6m+9=0$
2. Factor: $(m+3)^{2}=0$, so $m=-3$ is a double root
3. Repeated-root form: $y=(C_1+C_2x)e^{-3x}$
4. $y(0)=2$ gives $C_1=2$
5. $y'=C_2e^{-3x}-3(C_1+C_2x)e^{-3x}$, so $y'(0)=C_2-3C_1=1$
6. With $C_1=2$: $C_2=7$
7. Check: as $x\to\infty$, $y\to0$ because the exponential dominates the linear factor

> [!success]- Answer
> **$y=(2+7x)e^{-3x}$.**

> [!warning] Trap
> Writing $y=C_1e^{-3x}+C_2e^{-3x}$ or $y=C_1e^{-3x}+C_2e^{3x}$. A repeated root needs the factor $x$; without it the two exponentials are the same function and $y(0)=2$, $y'(0)=1$ cannot both be satisfied (they would force $C_1=2$ and $-3C_1=1$).

### P3. Solve $y''+4y'+13y=0$ with $y(0)=1$, $y'(0)=2$.

**Given:** y'' + 4y' + 13y = 0; y(0) = 1; y'(0) = 2

**Solution:**

1. Auxiliary equation: $m^{2}+4m+13=0$
2. Discriminant $=16-52=-36<0$, so the roots are complex
3. $m=\dfrac{-4\pm\sqrt{-36}}{2}=-2\pm3j$, so $\alpha=-2$, $\beta=3$
4. General solution: $y=e^{-2x}\left(C_1\cos 3x+C_2\sin 3x\right)$
5. $y(0)=1$ gives $C_1=1$
6. $y'=e^{-2x}\left(-3C_1\sin3x+3C_2\cos3x\right)-2e^{-2x}\left(C_1\cos3x+C_2\sin3x\right)$
7. $y'(0)=3C_2-2C_1=3C_2-2=2$, so $C_2=\dfrac43$

> [!success]- Answer
> **$y=e^{-2x}\left(\cos 3x+\dfrac43\sin 3x\right)$, a decaying oscillation.**

> [!warning] Trap
> Computing $\beta$ as $\sqrt{36}=6$ and using $\sin 6x$, or splitting $\sqrt{-36}$ into $2\cdot\sqrt{-9}$ and losing the factor of 2 in the denominator. The roots are $\frac{-4\pm6j}{2}=-2\pm3j$, so $\beta=3$.

### P4. Solve $y'''-6y''+11y'-6y=0$.

**Given:** third-order homogeneous ODE; constant coefficients

**Solution:**

1. Auxiliary equation: $m^{3}-6m^{2}+11m-6=0$
2. Test $m=1$: $1-6+11-6=0$, so $(m-1)$ is a factor
3. Divide: $m^{3}-6m^{2}+11m-6=(m-1)(m^{2}-5m+6)$
4. Factor the quadratic: $(m-2)(m-3)$
5. Roots $m=1,2,3$ — three distinct real roots, so three constants
6. Check with the root sum: $1+2+3=6$, matching $-(-6)/1$

> [!success]- Answer
> **$y=C_1e^{x}+C_2e^{2x}+C_3e^{3x}$.**

> [!warning] Trap
> Writing only two constants because the pattern for a second-order equation is automatic. A third-order ODE needs three linearly independent solutions; the root sum $6=-b/a$ confirms three roots were found, and the general solution is incomplete without $C_3$.

### P5. Solve the Euler-Cauchy equation $x^{2}y''-3xy'+4y=0$ for $x>0$.

**Given:** x^2 y'' - 3x y' + 4y = 0; x > 0

**Solution:**

1. Substitute $y=x^{m}$: $y'=mx^{m-1}$, $y''=m(m-1)x^{m-2}$
2. $x^{2}\cdot m(m-1)x^{m-2}-3x\cdot mx^{m-1}+4x^{m}=\left[m(m-1)-3m+4\right]x^{m}=0$
3. Indicial equation: $m^{2}-m-3m+4=m^{2}-4m+4=0$
4. Factor: $(m-2)^{2}=0$, a repeated root $m=2$
5. Repeated root for Euler-Cauchy: $y=\left(C_1+C_2\ln x\right)x^{m}$
6. Check by substitution: $y=x^{2}\ln x$ satisfies the ODE

> [!success]- Answer
> **$y=\left(C_1+C_2\ln x\right)x^{2}$ for $x>0$.**

> [!warning] Trap
> Using $am^{2}+bm+c=0$ instead of $am(m-1)+bm+c=0$. Here that would give $m^{2}-3m+4=0$ with complex roots $-\tfrac12\pm j\tfrac{\sqrt{15}}{2}$ and a completely different (oscillatory) answer. The correct indicial equation is $m^{2}-4m+4=0$.

## Traps & Exam Notes

- **A repeated root written without the factor $x$.** $(m-m_1)^{2}$ gives $y=(C_1+C_2x)e^{m_1x}$, not $C_1e^{m_1x}+C_2e^{m_1x}$. The second form is one solution wearing two names and cannot meet two independent initial conditions.
- **Complex roots with $\beta$ taken from the wrong denominator.** $\beta=\sqrt{4ac-b^{2}}/(2a)$, so $m^{2}+4m+13=0$ gives $\beta=\sqrt{52-16}/2=3$, not $\sqrt{36}=6$.
- **Omitting either $\cos\beta x$ or $\sin\beta x$.** The complex-conjugate case produces two independent real solutions; a solution with only the sine has one constant and cannot satisfy two initial conditions.
- **Sign errors transferring coefficients into the auxiliary equation.** For $y''-4y=0$ the roots are $m=\pm2$ (from $m^{2}=4$), not $m=\pm4$. The equation is always $am^{2}+bm+c=0$ with the original signs.
- **Too few constants for the order.** An $n$-th order equation needs $n$ constants. Third- and fourth-order items appear regularly on the board and two-constant answers lose marks even when each term is a valid solution.
- **Ignoring multiplicity when counting roots.** A cubic with roots $2,2,5$ produces $\left(C_1+C_2x\right)e^{2x}+C_3e^{5x}$ — three constants — not $C_1e^{2x}+C_2e^{5x}$.
- **Applying $y=e^{mx}$ to an Euler-Cauchy equation.** Variable coefficients need $y=x^{m}$; the exponential ansatz does not reduce $x^{2}y''-3xy'+4y=0$ to a polynomial.
- **Using the wrong indicial equation for Euler-Cauchy.** $ax^{2}y''+bxy'+cy=0$ gives $am(m-1)+bm+c=0$, i.e. $am^{2}+(b-a)m+c=0$. Forgetting the $-a$ changes the case (real, repeated or complex) and therefore the whole form of the answer.

## See Also

- [[08_Undetermined_Coefficients]]
- [[09_Variation_of_Parameters]]
- [[10_Mass-Spring-Damper_Systems]]
- [[11_RLC_Circuit_Transients]]
- [[02_Linear_First_Order_and_Bernoulli]]

---

[[06_Mixtures_and_Orthogonal_Trajectories|⬅ 06]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Undetermined_Coefficients|08 ➡]]
