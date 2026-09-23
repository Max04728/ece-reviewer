---
id: MATH-03-08
title: "Undetermined Coefficients"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Higher_Order_Homogeneous_Auxiliary_Equation]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Undetermined Coefficients

> [!abstract] Scope
> Find a particular solution of a constant-coefficient linear nonhomogeneous ODE by substituting a trial whose form mirrors the forcing term.

## Core Concept

> [!tip] Intuition
> The forcing terms that appear on board exams live in small families — polynomials, exponentials, sines and cosines — and differentiation never leaves those families. So guess an answer inside the same family and let algebra find the missing constants.

**The structure of the solution.** For $ay''+by'+cy = g(x)$ with constant $a,b,c$, the general solution is $y = y_h + y_p$. The homogeneous part $y_h = c_1y_1+c_2y_2$ comes from the auxiliary equation $ar^2+br+c = 0$; undetermined coefficients supplies one particular solution $y_p$, and because the equation is linear, adding any homogeneous solution back leaves the left side unchanged. This is why the two halves are computed separately and why the arbitrary constants never appear in $y_p$.

**Why guessing works at all.** Write the equation as $L[y]=g$ with $L = aD^2+bD+c$. The families $\{x^k e^{\alpha x}\cos\beta x,\ x^k e^{\alpha x}\sin\beta x\}$ are *invariant* under $D$: differentiating such a function returns another member of the same finite family. So if $g$ lies in a family spanned by finitely many basis functions, some combination $y_p$ of those same basis functions is mapped by $L$ onto $g$, and substituting the trial turns the differential equation into a small linear system in the undetermined coefficients. Nothing is being divined — it is linear algebra inside an invariant subspace.

**The trial forms.** Forcing $g(x)$ and the matching trial: a degree-$n$ polynomial $\to A_nx^n+\cdots+A_1x+A_0$ (all powers down to the constant, even the ones missing from $g$); an exponential forcing:
$$e^{\alpha x}\to Ae^{\alpha x}$$
a sinusoidal forcing:
$$\sin\beta x\to A\cos\beta x+B\sin\beta x$$
with both terms always. Products of those families use the product of the trials, expanded. A sum of forcing terms is handled term by term (superposition), each with its own trial.

**When the guess collapses: duplication.** If the trial already solves the homogeneous equation, then $L$ annihilates it and the left side is identically zero — no choice of constants can produce $g$. Concretely, for $y''+4y = 8\sin 2x$ the guess $A\cos 2x+B\sin 2x$ gives $L[y_p]=0\neq 8\sin 2x$; the homogeneous roots are $\pm 2i$, so $\sin 2x$ and $\cos 2x$ are already homogeneous solutions. The repair is the modification rule: multiply the whole trial by $x^s$, where $s$ is the multiplicity of the duplicated root ($s=1$ for a simple root, $s=2$ for a double root). Then $y_p = x(A\cos 2x+B\sin 2x) = -2x\cos 2x$ works, with the amplitude growing linearly in time — the algebraic signature of resonance.

**When the method fails.** Undetermined coefficients requires (i) constant coefficients and (ii) a forcing term whose derivatives span a finite-dimensional space. It handles $x^3$, $e^{-2x}$, $\sin 3x$, and products such as $x^2e^{-x}\cos 2x$. It cannot handle $\tan x$, $\sec x$, $\ln x$, $1/x$, $\sqrt{x}$, or $e^{x^2}$, because repeated differentiation generates infinitely many independent functions, so no finite trial can match them. Variable-coefficient equations are also out of scope. Those cases belong to variation of parameters.

**Forcing a term that is already present in $y_h$ with multiplicity 2.** For $y''-2y'+y = 6e^x$ the auxiliary equation $(r-1)^2 = 0$ has a double root $r=1$, so $e^x$ and $xe^x$ are both homogeneous solutions and the trial is $Ax^2e^x$, giving $2Ae^x = 6e^x$, hence $A=3$ and $y_p = 3x^2e^x$. Using $Axe^x$ or $Ae^x$ returns zero on the left, which is the standard way this problem is failed.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| General solution | $y = y_h + y_p$ | Linear ODE: the particular solution carries no arbitrary constants; they belong to y_h. |
| Polynomial trial | $y_p = A_n x^n + \cdots + A_1 x + A_0$ | n is the degree of the forcing polynomial. Every lower power must appear even if the forcing has gaps. |
| Exponential trial | $y_p = A e^{\alpha x}$ | Use A x^s e^{\alpha x} when \alpha is a root of the auxiliary equation, s = its multiplicity. |
| Sinusoidal trial | $y_p = A\cos\beta x + B\sin\beta x$ | Both terms are required even when the forcing contains only a sine or only a cosine. |
| Product trial | $y_p = (A x^n + \cdots + A_0) e^{\alpha x}(B\cos\beta x + C\sin\beta x)$ | Multiply the individual trials; a product forcing produces a product trial. |
| Modification rule | $y_p = x^{s} \times (\mathrm{ordinary\ trial\ above})$ | s is the multiplicity of the duplicated root: s = 1 simple, s = 2 double. s = 0 when there is no duplication. |
| Superposition | $L[y] = g_1 + g_2 \Rightarrow y_p = y_{p1} + y_{p2}$ | Solve each forcing term separately and add; a single combined guess with shared coefficients is wrong. |
| Resonant growth | $\pm i\beta \ \mathrm{roots} \Rightarrow y_p \ \mathrm{contains}\ x\cos\beta x$ | The x factor gives amplitude that grows without bound, matching physical resonance. |

## Worked Problems

### P1. Solve $y'' - 3y' + 2y = 4x^2$.

**Given:** $y''-3y'+2y=4x^2$; constant coefficients; forcing is a degree-2 polynomial

**Solution:**

1. Homogeneous: $r^2-3r+2=(r-1)(r-2)=0$, so $r=1,\,2$ and $y_h=c_1e^{x}+c_2e^{2x}$
2. Forcing $4x^2$ does not duplicate a homogeneous solution, so the trial is $y_p=Ax^2+Bx+C$
3. Differentiate: $y_p'=2Ax+B$, $y_p''=2A$
4. Substitute: $2A-3(2Ax+B)+2(Ax^2+Bx+C)=4x^2$
5. Match $x^2$: $2A=4\Rightarrow A=2$
6. Match $x$: $-6A+2B=0\Rightarrow -12+2B=0\Rightarrow B=6$
7. Match constants: $2A-3B+2C=0\Rightarrow 4-18+2C=0\Rightarrow C=7$
8. Check: $y_p=2x^2+6x+7$ gives $4-3(4x+6)+2(2x^2+6x+7)=4x^2$

> [!success]- Answer
> **$y = c_1e^{x} + c_2e^{2x} + 2x^2 + 6x + 7$**

> [!warning] Trap
> Guessing $Ax^2 + Bx$ and dropping the constant term. The constant $C$ is needed here because the forcing has no constant term but the operator mixes powers downward — omitting it leaves an unmatched constant equation.

### P2. Solve $y'' + 4y = 8\sin 2x$ for the particular solution.

**Given:** $y''+4y=8\sin 2x$; homogeneous roots $r=\pm 2i$

**Solution:**

1. Homogeneous: $r^2+4=0\Rightarrow r=\pm 2i$, so $y_h=c_1\cos 2x+c_2\sin 2x$
2. The forcing $\sin 2x$ duplicates a homogeneous solution, so a plain trial $A\cos 2x+B\sin 2x$ gives $L[y_p]=0$ and can never match $8\sin 2x$
3. Modification rule with $s=1$: $y_p=x(A\cos 2x+B\sin 2x)$
4. Write $u=A\cos 2x+B\sin 2x$ so $y_p=xu$; then $u''=-4u$
5. $(xu)''+4(xu)=xu''+2u'+4xu=-4xu+2u'+4xu=2u'$
6. $u'=-2A\sin 2x+2B\cos 2x$, so $2u'=-4A\sin 2x+4B\cos 2x$
7. Match $8\sin 2x$: $-4A=8\Rightarrow A=-2$ and $4B=0\Rightarrow B=0$
8. Check: $y_p=-2x\cos 2x$ gives $y_p''+4y_p=(8\sin 2x+8x\cos 2x)-8x\cos 2x=8\sin 2x$

> [!success]- Answer
> **$y_p = -2x\cos 2x$, so $y = c_1\cos 2x + c_2\sin 2x - 2x\cos 2x$**

> [!warning] Trap
> Using the unmodified trial $A\cos 2x + B\sin 2x$. Substitution gives $0 = 8\sin 2x$, which students often 'solve' by writing $A = 8$ — that answer satisfies nothing. The $x$ factor from the modification rule is the whole point of the problem.

### P3. Solve $y'' - 2y' + y = 6e^{x}$.

**Given:** $y''-2y'+y=6e^{x}$; double root at $r=1$

**Solution:**

1. $r^2-2r+1=(r-1)^2=0$, so $r=1$ with multiplicity 2 and $y_h=(c_1+c_2x)e^{x}$
2. $e^{x}$ duplicates a root of multiplicity 2, so $s=2$ and the trial is $y_p=Ax^2e^{x}$
3. Differentiate: $y_p'=A(2x+x^2)e^{x}$, $y_p''=A(2+4x+x^2)e^{x}$
4. Substitute: $Ae^{x}\left[(2+4x+x^2)-2(2x+x^2)+x^2\right]=2Ae^{x}$
5. $2A=6\Rightarrow A=3$
6. Check: $y_p=3x^2e^{x}$ gives $6e^{x}$ on the left

> [!success]- Answer
> **$y_p = 3x^2e^{x}$, so $y = (c_1 + c_2x)e^{x} + 3x^2e^{x}$**

> [!warning] Trap
> Using $Axe^{x}$ because the root is 'duplicated'. With a double root the homogeneous solution already contains both $e^{x}$ and $xe^{x}$, so only $x^2e^{x}$ survives the operator; $Axe^{x}$ and $Ae^{x}$ both give zero on the left.

### P4. Solve $y'' + y = x + e^{x}$.

**Given:** $y''+y=x+e^{x}$; sum of a polynomial and an exponential

**Solution:**

1. Homogeneous: $r^2+1=0\Rightarrow r=\pm i$, so $y_h=c_1\cos x+c_2\sin x$
2. Split by superposition: solve $y''+y=x$ and $y''+y=e^{x}$ separately
3. Polynomial forcing: the trial $y_{p1}=Ax+B$ gives $Ax+B=x$, so $A=1$ and $B=0$
4. Exponential forcing: the trial $y_{p2}=Ce^{x}$ gives $Ce^{x}+Ce^{x}=e^{x}$, so $2C=1$ and $C=1/2$
5. Add the two: $y_p=x+\frac{1}{2}e^{x}$
6. Check: $\left(x+\frac{1}{2}e^{x}\right)''+\left(x+\frac{1}{2}e^{x}\right)=\frac{1}{2}e^{x}+x+\frac{1}{2}e^{x}=x+e^{x}$

> [!success]- Answer
> **$y = c_1\cos x + c_2\sin x + x + \dfrac{1}{2}e^{x}$**

> [!warning] Trap
> Combining both forcings into one guess such as $Ax + Be^{x}$ but then substituting only once and mis-grouping terms. Superposition means solving each forcing independently and adding the results.

### P5. Solve the initial value problem $y'' - 4y = 8$, $y(0) = 0$, $y'(0) = 2$.

**Given:** $y''-4y=8$; $y(0)=0$; $y'(0)=2$

**Solution:**

1. Homogeneous: $r^2-4=0\Rightarrow r=\pm 2$, so $y_h=c_1e^{2x}+c_2e^{-2x}$
2. The forcing is the constant $8$ and $0$ is not a root, so the trial is $y_p=A$
3. Substitute: $0-4A=8\Rightarrow A=-2$
4. General solution: $y=c_1e^{2x}+c_2e^{-2x}-2$
5. $y(0)=0$: $c_1+c_2-2=0\Rightarrow c_1+c_2=2$
6. $y'=2c_1e^{2x}-2c_2e^{-2x}$ and $y'(0)=2$: $2c_1-2c_2=2\Rightarrow c_1-c_2=1$
7. Solve the pair: $c_1=\frac{3}{2}$, $c_2=\frac{1}{2}$
8. Check: $y(0)=1.5+0.5-2=0$ and $y'(0)=3-1=2$

> [!success]- Answer
> **$y = \dfrac{3}{2}e^{2x} + \dfrac{1}{2}e^{-2x} - 2$**

> [!warning] Trap
> Applying the initial conditions before adding $y_p$, or differentiating $y_p = -2$ and treating it as producing a nonzero $y'(0)$ term. The constant particular solution contributes nothing to $y$ or $y'$ at $x=0$ beyond the $-2$ offset.

## Traps & Exam Notes

- **The resonant trial collapses to zero.** For $y''+4y=8\sin 2x$, the guess $A\cos 2x+B\sin 2x$ yields $L[y_p]=0$, so the equation reads $0=8\sin 2x$. You must multiply by $x^s$, with $s$ the multiplicity of the duplicated root.
- **Wrong power of $x$ for a double root.** $y''-2y'+y=6e^{x}$ needs $Ax^2e^{x}$: $s=2$. Using $Axe^{x}$ also gives zero, and the error is invisible unless the left side is actually expanded.
- **Dropping lower-order powers.** A forcing $4x^2$ needs $Ax^2+Bx+C$, not $Ax^2$. Missing powers produce an unsolvable coefficient system or a silently wrong $y_p$.
- **Carrying only the sine (or only the cosine).** A forcing $\sin\beta x$ requires $A\cos\beta x+B\sin\beta x$; the derivative of the cosine term supplies part of the sine term, so a one-term guess cannot match.
- **Applying the method to $\tan x$, $\sec x$, $\ln x$ or $1/x$.** Differentiation generates infinitely many independent functions, so no finite trial exists. Use variation of parameters instead.
- **Putting arbitrary constants inside $y_p$.** Constants belong to $y_h$. Duplicating them makes the coefficient system singular whenever $0$ is a root of the auxiliary equation — the method appears to 'fail' when the trial form is simply wrong.
- **Ignoring the superposition step.** For $g = g_1+g_2$ the trials add; trying to match both forcings with a single shared trial after substituting only for one of them gives the wrong coefficients.

## See Also

- [[07_Higher_Order_Homogeneous_Auxiliary_Equation]]
- [[09_Variation_of_Parameters]]
- [[10_Mass-Spring-Damper_Systems]]
- [[11_RLC_Circuit_Transients]]

---

[[07_Higher_Order_Homogeneous_Auxiliary_Equation|⬅ 07]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Variation_of_Parameters|09 ➡]]
