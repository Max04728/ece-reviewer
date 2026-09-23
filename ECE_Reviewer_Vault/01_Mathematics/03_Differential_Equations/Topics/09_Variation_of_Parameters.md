---
id: MATH-03-09
title: "Variation of Parameters"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 9
tier: 2
depth: full
problem_count: 4
prereqs: ["[[08_Undetermined_Coefficients]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Variation of Parameters

> [!abstract] Scope
> Construct a particular solution of a linear ODE by letting the homogeneous constants vary, which handles forcing terms that undetermined coefficients cannot.

## Core Concept

> [!tip] Intuition
> Undetermined coefficients guesses a shape. Variation of parameters instead takes the two homogeneous solutions you already have and replaces the constants $c_1, c_2$ with functions $u_1(x), u_2(x)$, letting the equation itself dictate how they must change.

**The setup.** Write the equation in standard form, $y'' + P(x)y' + Q(x)y = f(x)$, and suppose $y_1, y_2$ are two known linearly independent solutions of the homogeneous equation $y''+Py'+Qy = 0$. Variation of parameters looks for a particular solution of the form $y_p = u_1(x)y_1(x) + u_2(x)y_2(x)$, that is, the homogeneous solution with its constants promoted to functions.

**Why the constraint $u_1'y_1 + u_2'y_2 = 0$ appears.** Two unknown functions cannot be determined by one equation, so one extra condition is imposed freely; this is a normalization, not a restriction, because we only need *one* particular solution. With it, $y_p' = u_1y_1' + u_2y_2'$ keeps the same shape as the homogeneous derivative, and the second derivative is:
$$y_p'' = u_1'y_1' + u_2'y_2' + u_1y_1'' + u_2y_2''$$
Substituting into the ODE, the terms $u_1(y_1''+Py_1'+Qy_1)$ and $u_2(y_2''+Py_2'+Qy_2)$ vanish because $y_1$ and $y_2$ are homogeneous solutions, leaving the single equation $u_1'y_1' + u_2'y_2' = f$. Together with the constraint this is a 2x2 linear system whose determinant is the Wronskian $W = y_1y_2' - y_1'y_2$; Cramer's rule gives $u_1' = -y_2f/W$ and $u_2' = y_1f/W$, and two integrations finish the job.

**Why it works when undetermined coefficients fails.** Nothing about the argument restricted $f$ to a finite family. Any continuous $f$ can be carried through, which is exactly why $\tan x$, $\sec x$, $\ln x$, $1/x$ and $e^{x}/x$ are variation-of-parameters problems. The price is that the two integrals may have no elementary closed form; when the forcing is a polynomial, exponential or sinusoid, undetermined coefficients is faster and should be used instead. Variation of parameters is the general fallback, including for equations with variable coefficients whenever $y_1, y_2$ happen to be known.

**Resonance comes out automatically.** Because the method integrates, the duplicated-root case repairs itself. For $y''-y = e^{x}$ with $y_1 = e^{x}$, $y_2 = e^{-x}$ and $W = -2$, the formula gives $u_1' = 1/2$, so $u_1 = x/2$ and a factor $x$ appears with no modification rule required. The extra homogeneous part produced by a nonzero integration constant is simply absorbed into $y_h$, which is why the constants of integration are set to zero.

**The two conditions that are easy to violate.** First, the leading coefficient must be 1: for $a(x)y'' + \cdots = g(x)$ the correct right-hand side is $f = g/a$, otherwise every $u_i'$ is off by the factor $a(x)$. Second, $y_1$ and $y_2$ must genuinely solve the homogeneous equation and be independent; $W = 0$ anywhere on the interval means the formula divides by zero and the pair was not independent to begin with.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Standard form | $y'' + P(x)y' + Q(x)y = f(x)$ | Divide by the leading coefficient first. Using g(x) without dividing is the most common wrong answer. |
| Wronskian | $W = y_1 y_2' - y_1' y_2$ | Order matters: the reversed order changes the sign of W and of the particular solution. |
| First parameter derivative | $u_1' = -\frac{y_2 f}{W}$ | The minus sign belongs to u_1; swapping it with u_2 reverses the sign of y_p. |
| Second parameter derivative | $u_2' = \frac{y_1 f}{W}$ | No minus sign here. W is the Wronskian, not a constant unless the ODE has constant coefficients. |
| Normalization constraint | $u_1' y_1 + u_2' y_2 = 0$ | Imposed to keep y_p' equal to u_1 y_1' + u_2 y_2'. It is what makes the 2x2 system solvable. |
| Particular solution | $y_p = u_1 y_1 + u_2 y_2$ | u_1 and u_2 are the antiderivatives with integration constants set to zero. |
| General solution | $y = c_1 y_1 + c_2 y_2 + u_1 y_1 + u_2 y_2$ | Merge the homogeneous terms: y = (c_1+u_1)y_1 + (c_2+u_2)y_2 is equally valid. |
| Duplicated-root behaviour | $u_i = \int \frac{(\cdot)f}{W}\,dx \ \mathrm{produces\ the}\ x\ \mathrm{factor}$ | Resonance needs no separate modification rule when using this method. |

## Worked Problems

### P1. Solve $y'' + y = \tan x$ using variation of parameters.

**Given:** $y''+y=\tan x$; $y_1=\cos x$, $y_2=\sin x$

**Solution:**

1. Homogeneous: $r^2+1=0$, so $y_1=\cos x$, $y_2=\sin x$ and $y_h=c_1\cos x+c_2\sin x$
2. $W=y_1y_2'-y_1'y_2=\cos x(\cos x)-(-\sin x)(\sin x)=\cos^2x+\sin^2x=1$
3. $u_1'=-y_2f/W=-\sin x\tan x=-\sin^2x/\cos x=-(\sec x-\cos x)$
4. $u_1=-\ln|\sec x+\tan x|+\sin x$
5. $u_2'=y_1f/W=\cos x\tan x=\sin x$, so $u_2=-\cos x$
6. $y_p=u_1\cos x+u_2\sin x=-\cos x\ln|\sec x+\tan x|+\sin x\cos x-\sin x\cos x$
7. The two $\sin x\cos x$ terms cancel, leaving $y_p=-\cos x\ln|\sec x+\tan x|$

> [!success]- Answer
> **$y = c_1\cos x + c_2\sin x - \cos x\ln|\sec x + \tan x|$**

> [!warning] Trap
> Trying undetermined coefficients first. $\tan x$ differentiates into $\sec^2 x$, then $2\sec^2x\tan x$, and never closes into a finite family, so no trial form exists. Also note the sign: $u_1' = -y_2f/W$ carries the minus.

### P2. Solve $y'' + 4y = \csc 2x$.

**Given:** $y''+4y=\csc 2x$; $y_1=\cos 2x$, $y_2=\sin 2x$

**Solution:**

1. Homogeneous: $r^2+4=0$, so $y_1=\cos 2x$ and $y_2=\sin 2x$
2. $W=\cos 2x(2\cos 2x)-(-2\sin 2x)(\sin 2x)=2(\cos^2 2x+\sin^2 2x)=2$
3. $u_1'=-y_2f/W=-\sin 2x\csc 2x/2=-1/2$, so $u_1=-x/2$
4. $u_2'=y_1f/W=\cos 2x\csc 2x/2=\frac{1}{2}\cot 2x$
5. $u_2=\frac{1}{2}\int\cot 2x\,dx=\frac{1}{4}\ln|\sin 2x|$
6. $y_p=-\frac{x}{2}\cos 2x+\frac{1}{4}\sin 2x\ln|\sin 2x|$
7. Check the resonant factor: a term $x(A\cos 2x+B\sin 2x)$ under $y''+4y$ contributes $2u'$, which is the only way to match the $1/\sin 2x$ forcing

> [!success]- Answer
> **$y = c_1\cos 2x + c_2\sin 2x - \dfrac{x}{2}\cos 2x + \dfrac{1}{4}\sin 2x\ln|\sin 2x|$**

> [!warning] Trap
> Dropping the $1/2$ from $W = 2$. Every $u_i'$ is divided by $W$, so a Wronskian of 2 halves both parameters and halves $y_p$. The $\int\cot 2x\,dx$ also needs the inner factor $1/2$, giving $1/4$, not $1/2$.

### P3. Solve $y'' - 2y' + y = \dfrac{e^{x}}{x}$.

**Given:** $y''-2y'+y=e^{x}/x$; double root $r=1$

**Solution:**

1. Homogeneous: $(r-1)^2=0$, so $y_1=e^{x}$ and $y_2=xe^{x}$
2. $W=y_1y_2'-y_1'y_2=e^{x}(e^{x}+xe^{x})-e^{x}(xe^{x})=e^{2x}$
3. $u_1'=-y_2f/W=-(xe^{x})(e^{x}/x)/e^{2x}=-1$, so $u_1=-x$
4. $u_2'=y_1f/W=e^{x}(e^{x}/x)/e^{2x}=1/x$, so $u_2=\ln|x|$
5. $y_p=-xe^{x}+xe^{x}\ln|x|$
6. Check by substitution: write $y_p=e^{x}g$ with $g=x\ln x-x$, so $g'=\ln x$ and $g''=1/x$
7. Then $y_p''-2y_p'+y_p=e^{x}(g''+2g'+g)-2e^{x}(g'+g)+e^{x}g=e^{x}g''=e^{x}/x$

> [!success]- Answer
> **$y = (c_1 + c_2x)e^{x} + xe^{x}\ln|x| - xe^{x}$**

> [!warning] Trap
> Using $W = e^{2x}$ with the wrong sign convention, or forgetting that $y_2 = xe^{x}$ (not $e^{x}$) for a double root. Also note $e^{x}/x$ is not in any finite trial family, so undetermined coefficients cannot start.

### P4. Use variation of parameters on $y'' - y = e^{x}$ and compare with the undetermined-coefficients trial.

**Given:** $y''-y=e^{x}$; $y_1=e^{x}$, $y_2=e^{-x}$

**Solution:**

1. Homogeneous: $r^2-1=0$, so $y_1=e^{x}$ and $y_2=e^{-x}$
2. $W=e^{x}(-e^{-x})-e^{x}(e^{-x})=-2$
3. $u_1'=-y_2f/W=-(e^{-x})(e^{x})/(-2)=1/2$, so $u_1=x/2$
4. $u_2'=y_1f/W=(e^{x})(e^{x})/(-2)=-e^{2x}/2$, so $u_2=-e^{2x}/4$
5. $y_p=\frac{x}{2}e^{x}-\frac{1}{4}e^{2x}e^{-x}=\frac{x}{2}e^{x}-\frac{1}{4}e^{x}$
6. The term $-\frac{1}{4}e^{x}$ is itself a homogeneous solution, so it is absorbed into $c_1e^{x}$ and may be discarded
7. Effective particular solution: $y_p=\frac{x}{2}e^{x}$, matching the modification-rule trial $Axe^{x}$ with $A=1/2$

> [!success]- Answer
> **$y = c_1e^{x} + c_2e^{-x} + \dfrac{x}{2}e^{x}$**

> [!warning] Trap
> Keeping the parasitic $-\frac{1}{4}e^{x}$ and reporting a different-looking answer. It is a homogeneous term in disguise; leaving it in is not wrong mathematically but it duplicates $y_h$ and signals a missed simplification.

## Traps & Exam Notes

- **Not dividing by the leading coefficient.** The formula assumes $y''+Py'+Qy=f$. For $x^2y''+xy'-y = x^3$ the right-hand side must be $f = x$, not $x^3$; skipping the division scales every $u_i'$ by $1/x^2$.
- **Wrong sign on $u_1'$.** $u_1' = -y_2f/W$. Dropping the minus sign produces a $y_p$ that fails substitution by a sign on the resonant-looking term, which is easy to miss because $y_h$ still looks right.
- **Reversing the Wronskian.** $W = y_1y_2'-y_1'y_2$; using $y_1'y_2 - y_1y_2'$ negates $W$ and therefore negates $y_p$.
- **Keeping the integration constants.** A nonzero constant added to $u_1$ just adds $Ay_1 + By_2$ back into the solution, duplicating $y_h$. Set them to zero.
- **Believing a finite guess exists.** For $\ln x$, $\sec x$, $1/x$ or $e^{x}/x$ there is no trial family at all; reaching for $Ax+B$ or a constant times the forcing produces an equation that no coefficient can satisfy.
- **Forgetting the multiplicity when building $y_2$.** With a double root, $y_1 = e^{rx}$ and $y_2 = xe^{rx}$. Taking $y_2 = e^{rx}$ a second time makes $W = 0$ and the method divides by zero.
- **Assuming $W$ is constant.** It is constant only for constant-coefficient ODEs; with variable coefficients $W$ depends on $x$ and must stay inside the integrals.

## See Also

- [[08_Undetermined_Coefficients]]
- [[07_Higher_Order_Homogeneous_Auxiliary_Equation]]
- [[10_Mass-Spring-Damper_Systems]]
- [[11_RLC_Circuit_Transients]]

---

[[08_Undetermined_Coefficients|⬅ 08]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Mass-Spring-Damper_Systems|10 ➡]]
