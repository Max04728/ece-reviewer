---
id: MATH-03-02
title: "Linear First Order and Bernoulli"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 2
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Separation_of_Variables]]", "[[04_Integration_by_Parts_and_Tabular]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Linear First Order and Bernoulli

> [!abstract] Scope
> Solve first-order linear equations with an integrating factor, and reduce Bernoulli equations to linear form by the substitution v = y^(1-n).

## Core Concept

> [!tip] Intuition
> Multiplying by the integrating factor is the product rule run backwards. The factor is chosen so that the left-hand side collapses into the derivative of a single product, after which one integration finishes the problem.

**The standard form is not optional.** Every equation in this topic must first be written as $\frac{dy}{dx}+P(x)y=Q(x)$, with the coefficient of $y'$ equal to $1$. From $xy'+y=x^2$ the standard form is $y'+\frac{1}{x}y=x$, so $P=1/x$ and $Q=x$ — not $P=1$, $Q=x^2$. Reading $P$ and $Q$ off the un-normalised equation is the single most common source of a wrong integrating factor.

**Why $\mu=e^{\int P\,dx}$ works.** Multiply through by $\mu(x)$:
$$\mu y'+\mu P y=\mu Q$$
The left side is $\frac{d}{dx}(\mu y)=\mu y'+\mu' y$ exactly when $\mu'=\mu P$. That is a separable equation in $\mu$ alone, and its solution is $\mu=e^{\int P\,dx}$. Nothing is guessed: the factor is forced by demanding the product rule.

**The constant of integration inside $\mu$ is irrelevant; the one after integrating $\mu Q$ is not.** When $C_0$ is left in, the factor is:
$$\mu=e^{\int P dx+C_0}=e^{C_0}e^{\int P dx}$$
The positive constant $e^{C_0}$ multiplies *both* sides of $(\mu y)'=\mu Q$ and cancels, so take $C_0=0$. But the constant produced by $\int \mu Q\,dx$ carries the initial condition and must be kept, then divided by $\mu$ along with everything else.

**The general solution.** The solution of $\mu y=\int\mu Q\,dx+C$ reads:
$$y=\frac{1}{\mu}\left[\int\mu Q\,dx+C\right]$$
The whole right-hand side — integral *and* constant — is divided by $\mu$. Applying $1/\mu$ only to the integral term and leaving $C$ alone is a frequent algebra error that still looks plausible.

**Bernoulli equations are linear after one substitution.** $\frac{dy}{dx}+P(x)y=Q(x)y^{n}$ is not linear for $n\neq 0,1$, but the change of variable $v=y^{1-n}$ turns it into $\frac{dv}{dx}+(1-n)P(x)v=(1-n)Q(x)$, which is linear in $v$. The substitution is a tool, not a trick to memorise blindly: $n=0$ is already linear and $n=1$ is separable, so the formula does not apply to either.

**Bernoulli loses $y\equiv 0$.** Dividing the equation by $y^{n}$ (with $n>0$) assumes $y\neq 0$. For $n>0$ the function $y\equiv 0$ does solve the ODE and is not in the family obtained from $v=y^{1-n}$; it must be stated separately, exactly as with separable equations.

**Interval of validity.** $P$ and $Q$ must be continuous on the interval containing $x_0$, and $\mu$ must not vanish there. For $P=1/x$ that forces either $x>0$ or $x<0$; the solution is quoted on the side of the singularity that contains the initial condition. This is why table answers to $xy'+y=x^2$ are usually written for $x>0$.

## Derivation

**Step 1 — put the equation in standard form.** Divide by the coefficient of $y'$ so that $\frac{dy}{dx}+P(x)y=Q(x)$. Record where $P$ and $Q$ are continuous; that fixes the interval.

**Step 2 — demand the product rule.** We want a factor $\mu(x)$ with $\mu y'+\mu P y=(\mu y)'$. Expanding the right side gives $\mu y'+\mu' y$, so the requirement is $\mu'=\mu P$.

**Step 3 — solve for the factor.** $\frac{d\mu}{\mu}=P\,dx$ gives $\ln\lvert\mu\rvert=\int P\,dx$ and hence $\mu=e^{\int P\,dx}$. Any positive multiple works, so choose the constant to be zero.

**Step 4 — integrate once.** $(\mu y)'=\mu Q$, so $\mu y=\int\mu Q\,dx+C$ and $y=\frac{1}{\mu}\left[\int\mu Q\,dx+C\right]$. The constant is fixed by $y(x_0)=y_0$.

**Step 5 — initial-value form.** Integrating from $x_0$ to $x$ with $\mu(x_0)=1$ gives $y=\frac{1}{\mu(x)}\left[y_0+\int_{x_0}^{x}\mu(s)Q(s)\,ds\right]$, in which no arbitrary constant appears.

**Step 6 — Bernoulli reduction.** For $\frac{dy}{dx}+Py=Qy^{n}$ divide by $y^{n}$: $y^{-n}y'+Py^{1-n}=Q$. With $v=y^{1-n}$ we get $v'=(1-n)y^{-n}y'$, hence $\frac{v'}{1-n}+Pv=Q$, i.e. $v'+(1-n)Pv=(1-n)Q$. Solve this linear equation for $v$, then return $y=v^{1/(1-n)}$ and add the lost solution $y\equiv 0$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Standard linear form | $\frac{dy}{dx}+P(x)y=Q(x)$ | Coefficient of y' must be 1 before P and Q are read off. |
| Integrating factor | $\mu(x)=e^{\int P(x)\,dx}$ | Keep the sign of P. The integration constant inside mu is a scale factor and cancels — take 0. |
| Solution | $\mu y=\int\mu Q\,dx+C \;\Rightarrow\; y=\frac{1}{\mu}\left[\int\mu Q\,dx+C\right]$ | Divide the integral AND the constant by mu. |
| Initial-value form | $y=\frac{1}{\mu(x)}\left[y_0+\int_{x_0}^{x}\mu(s)Q(s)\,ds\right]$ | Normalise so that mu(x0) = 1; then no arbitrary constant appears. |
| Bernoulli form | $\frac{dy}{dx}+P(x)y=Q(x)y^{n}$ | Valid for n not equal to 0 or 1; those cases are already linear or separable. |
| Bernoulli substitution | $v=y^{1-n}\;\Rightarrow\;\frac{dv}{dx}+(1-n)P(x)\,v=(1-n)Q(x)$ | The sign of P is unchanged. Writing (n-1)P flips the solution. |
| Bernoulli back-substitution | $y=v^{\frac{1}{1-n}}$ | Also add the singular solution y = 0, lost when dividing by y^n. |
| Solvable exact pattern | $\frac{dy}{dx}+\frac{1}{x}y=x\;\Rightarrow\;(xy)'=x^{2}$ | Useful check: if P = 1/x then mu = x, and the left side is literally (xy)'. |
| RC step response | $RC\frac{dv}{dt}+v=v_s\;\Rightarrow\;v=v_s\left(1-e^{-t/RC}\right)$ | For a constant source and v(0) = 0. Time constant tau = RC in seconds; R in ohms, C in farads. |
| RL step response | $\frac{L}{R}\frac{di}{dt}+i=\frac{V}{R}\;\Rightarrow\;i=\frac{V}{R}\left(1-e^{-Rt/L}\right)$ | For i(0) = 0. Time constant tau = L/R in seconds. |

## Worked Problems

### P1. Solve $\dfrac{dy}{dx}+2y=4$ with $y(0)=1$.

**Given:** y' + 2y = 4; y(0) = 1

**Solution:**

1. Already standard: $P=2$, $Q=4$
2. $\mu=e^{\int 2\,dx}=e^{2x}$
3. $(e^{2x}y)'=4e^{2x}$
4. $e^{2x}y=2e^{2x}+C$, so $y=2+Ce^{-2x}$
5. Apply $y(0)=1$: $2+C=1$, so $C=-1$

> [!success]- Answer
> **$y=2-e^{-2x}$ for all real $x$.**

> [!warning] Trap
> Integrating $\int 4e^{2x}dx$ as $4e^{2x}$ instead of $2e^{2x}$. Every $\int e^{ax}dx$ contributes a factor $1/a$; omitting it makes $y=2+Ce^{-2x}$ fail the check at $x=0$.

### P2. Solve $xy'+y=x^2$ with $y(1)=2$.

**Given:** x y' + y = x^2; y(1) = 2

**Solution:**

1. Divide by $x$ (take $x>0$): $y'+\dfrac{1}{x}y=x$, so $P=\dfrac1x$, $Q=x$
2. $\mu=e^{\int dx/x}=e^{\ln x}=x$
3. $(xy)'=x\cdot x=x^{2}$
4. $xy=\dfrac{x^3}{3}+C$, so $y=\dfrac{x^2}{3}+\dfrac{C}{x}$
5. Apply $y(1)=2$: $\dfrac13+C=2$, so $C=\dfrac53$

> [!success]- Answer
> **$y=\dfrac{x^2}{3}+\dfrac{5}{3x}$ for $x>0$.**

> [!warning] Trap
> Reading $P=1$ off the un-normalised $xy'+y=x^2$. That gives $\mu=e^{x}$ and a solution that does not satisfy the ODE. Normalise first: divide by the coefficient of $y'$.

### P3. Solve $\dfrac{dy}{dx}+y=e^{-x}$ with $y(0)=2$.

**Given:** y' + y = e^{-x}; y(0) = 2

**Solution:**

1. $P=1$, $Q=e^{-x}$, so $\mu=e^{x}$
2. $(e^{x}y)'=e^{x}e^{-x}=1$
3. $e^{x}y=x+C$, so $y=(x+C)e^{-x}$
4. Apply $y(0)=2$: $C=2$

> [!success]- Answer
> **$y=(x+2)e^{-x}$.**

> [!warning] Trap
> Assuming the answer must contain an exponential with rate $-1$ matching $Q$, and reporting $y=Ce^{-x}$. Because $Q$ is itself a solution of the homogeneous equation, the non-homogeneous part is $xe^{-x}$ — the resonant case, exactly as with repeated roots of an auxiliary equation.

### P4. Solve $\dfrac{dy}{dx}-y=e^{2x}$ with $y(0)=3$.

**Given:** y' - y = e^{2x}; y(0) = 3

**Solution:**

1. $P=-1$, so $\mu=e^{\int(-1)dx}=e^{-x}$
2. $(e^{-x}y)'=e^{-x}e^{2x}=e^{x}$
3. $e^{-x}y=e^{x}+C$, so $y=e^{2x}+Ce^{x}$
4. Apply $y(0)=3$: $1+C=3$, so $C=2$

> [!success]- Answer
> **$y=e^{2x}+2e^{x}$.**

> [!warning] Trap
> Using $\mu=e^{x}$ because the equation 'looks like' $y'+y$. With minus signs, $\mu=e^{-x}$; using the wrong sign makes $(\mu y)'$ pick up $2e^{-x}y$ and the method collapses.

### P5. Solve $xy'-2y=x^4$ with $y(1)=1$.

**Given:** x y' - 2y = x^4; y(1) = 1

**Solution:**

1. Divide by $x$: $y'-\dfrac{2}{x}y=x^{3}$, so $P=-\dfrac2x$
2. $\mu=e^{\int -2\,dx/x}=e^{-2\ln x}=x^{-2}$
3. $(x^{-2}y)'=x^{-2}\cdot x^{3}=x$
4. $x^{-2}y=\dfrac{x^2}{2}+C$, so $y=\dfrac{x^4}{2}+Cx^{2}$
5. Apply $y(1)=1$: $\dfrac12+C=1$, so $C=\dfrac12$

> [!success]- Answer
> **$y=\dfrac{x^4+x^2}{2}$ for $x>0$.**

> [!warning] Trap
> Computing $\mu=e^{\ln x^{2}}=x^{2}$ by dropping the minus sign in $\int-2\,dx/x$. The factor must be $x^{-2}$; with $x^{2}$ the left side becomes $(x^2y)'$ and $Q$ changes completely.

### P6. Solve $(x^2+1)y'+2xy=3x^2$ with $y(0)=2$.

**Given:** (x^2+1)y' + 2xy = 3x^2; y(0) = 2

**Solution:**

1. Divide by $x^2+1$: $y'+\dfrac{2x}{x^2+1}y=\dfrac{3x^2}{x^2+1}$
2. $\mu=e^{\int 2x\,dx/(x^2+1)}=e^{\ln(x^2+1)}=x^{2}+1$
3. $((x^2+1)y)'=3x^{2}$
4. $(x^2+1)y=x^{3}+C$, so $y=\dfrac{x^{3}+C}{x^{2}+1}$
5. Apply $y(0)=2$: $\dfrac{C}{1}=2$, so $C=2$

> [!success]- Answer
> **$y=\dfrac{x^3+2}{x^2+1}$ for all real $x$.**

> [!warning] Trap
> Not noticing that the left side is already $\frac{d}{dx}\left[(x^2+1)y\right]$. Recognising the exact product-rule form skips the integrating factor entirely and removes an opportunity for algebra errors.

### P7. Solve the Bernoulli equation $\dfrac{dy}{dx}+y=xy^{2}$ with $y(0)=\dfrac12$.

**Given:** y' + y = x y^2; y(0) = 1/2; n = 2

**Solution:**

1. Here $n=2$, so $v=y^{1-2}=y^{-1}$ and $1-n=-1$
2. Divide by $y^{2}$: $y^{-2}y'+y^{-1}=x$
3. Since $v=y^{-1}$, $v'=-y^{-2}y'$, so $-v'+v=x$, i.e. $v'-v=-x$
4. Integrating factor $\mu=e^{-x}$: $(e^{-x}v)'=-xe^{-x}$
5. $e^{-x}v=\int -xe^{-x}dx=(x+1)e^{-x}+C$, so $v=x+1+Ce^{x}$
6. Back-substitute $y=1/v$: $y=\dfrac{1}{x+1+Ce^{x}}$
7. Apply $y(0)=\dfrac12$: $\dfrac{1}{1+C}=\dfrac12$, so $C=1$
8. Check: $v(0)=2$ and the singular solution $y\equiv 0$ does not meet $y(0)=1/2$

> [!success]- Answer
> **$y=\dfrac{1}{x+1+e^{x}}$.**

> [!warning] Trap
> The sign of the $v$ equation. From $-v'+v=x$ the reduced equation is $v'-v=-x$; writing $v'+v=x$ (keeping P's original sign without the $(1-n)$ factor) gives $v=x-1+Ce^{-x}$ and a wrong final answer.

### P8. Solve the Bernoulli equation $\dfrac{dy}{dx}+\dfrac{1}{x}y=y^{3}$ with $y(1)=1$ (take $x>0$).

**Given:** y' + y/x = y^3; y(1) = 1; n = 3

**Solution:**

1. $n=3$, so $v=y^{1-3}=y^{-2}$ and $1-n=-2$
2. Divide by $y^{3}$: $y^{-3}y'+\dfrac{1}{x}y^{-2}=1$
3. With $v=y^{-2}$, $v'=-2y^{-3}y'$, so $-\dfrac12v'+\dfrac1x v=1$, i.e. $v'-\dfrac{2}{x}v=-2$
4. $\mu=e^{\int -2\,dx/x}=x^{-2}$; then $(x^{-2}v)'=-2x^{-2}$
5. $x^{-2}v=2x^{-1}+C$, so $v=2x+Cx^{2}$
6. Back-substitute: $y^{2}=\dfrac{1}{2x+Cx^{2}}$
7. Apply $y(1)=1$: $\dfrac{1}{2+C}=1$, so $C=-1$

> [!success]- Answer
> **$y=\dfrac{1}{\sqrt{2x-x^{2}}}$ on $0<x<2$.**

> [!warning] Trap
> Forgetting the factor $-1/2$ from $v'=-2y^{-3}y'$ in the reduction, or forgetting to back-substitute and quoting $v=2x-x^{2}$ as the answer. The final answer must be in $y$, and the domain is limited by both $x>0$ and $2x-x^{2}>0$.

### P9. A series $RC$ circuit has $R=2\,\mathrm{k}\Omega$, $C=500\,\mu\mathrm{F}$ and is switched onto a $10\,\mathrm{V}$ DC source at $t=0$ with the capacitor uncharged. Find $v_C(t)$ and the time to reach $5\,\mathrm{V}$.

**Given:** R = 2 kΩ; C = 500 µF; V_s = 10 V; v_C(0) = 0

**Solution:**

1. KVL: $RC\dfrac{dv_C}{dt}+v_C=V_s$
2. $\tau=RC=(2000)(500\times10^{-6})=1.0\,\mathrm{s}$
3. Standard form $v_C'+\dfrac{1}{\tau}v_C=\dfrac{V_s}{\tau}$ with $\mu=e^{t/\tau}$
4. $v_C=V_s\left(1-e^{-t/\tau}\right)=10\left(1-e^{-t}\right)\,\mathrm{V}$
5. Set $10(1-e^{-t})=5$: $e^{-t}=0.5$
6. $t=\ln 2=0.693\,\mathrm{s}$

> [!success]- Answer
> **$v_C(t)=10\left(1-e^{-t}\right)$ V, reaching $5$ V at $t=RC\ln 2=0.693$ s.**

> [!warning] Trap
> Using $\tau=R/C$ instead of $RC$, or leaving $C$ in $\mu$F and $R$ in k$\Omega$ without converting. $2000\times500\times10^{-6}=1.0$ s; the same product without the prefixes gives $1\times10^{6}$, off by $10^{6}$.

### P10. A series $RL$ circuit has $R=10\,\Omega$, $L=0.5\,\mathrm{H}$ and is switched onto a $20\,\mathrm{V}$ DC source at $t=0$ with $i(0)=0$. Find $i(t)$ and the time constant.

**Given:** R = 10 Ω; L = 0.5 H; V = 20 V; i(0) = 0

**Solution:**

1. KVL: $L\dfrac{di}{dt}+Ri=V$
2. Divide by $L$: $\dfrac{di}{dt}+20i=40$
3. $\mu=e^{20t}$; then $(e^{20t}i)'=40e^{20t}$
4. $e^{20t}i=2e^{20t}+C$, so $i=2+Ce^{-20t}$
5. Apply $i(0)=0$: $C=-2$, giving $i=2\left(1-e^{-20t}\right)\,\mathrm{A}$
6. $\tau=\dfrac{L}{R}=\dfrac{0.5}{10}=0.05\,\mathrm{s}$

> [!success]- Answer
> **$i(t)=2\left(1-e^{-20t}\right)$ A with $\tau=L/R=0.05$ s.**

> [!warning] Trap
> Writing the final current as $V/L$ or $V/(R+L)$ instead of $V/R$. The steady state of an RL step is set by resistance alone: $i_\infty=20/10=2$ A, and the inductor only controls how fast it is reached.

## Traps & Exam Notes

- **Reading $P$ and $Q$ before normalising.** In $xy'+y=x^2$ the coefficient of $y'$ is $x$, so $P=1/x$, not 1. Any $P$ read off an un-normalised equation gives a wrong $\mu$ and a solution that fails substitution.
- **Dropping the sign of $P$ in $\mu$.** $y'-y=e^{2x}$ needs $\mu=e^{-x}$. $\mu=e^{\int P dx}$ is not $e^{\int\lvert P\rvert dx}$.
- **Leaving the arbitrary constant undivided by $\mu$.** In $y=\frac{1}{\mu}\left[\int\mu Q\,dx+C\right]$ the constant is inside the bracket. Applying $1/\mu$ only to the integral term produces an answer that satisfies the ODE only when $C=0$.
- **Bernoulli with the wrong sign on $P$.** The reduced equation is $v'+(1-n)Pv=(1-n)Q$. For $y'+y=xy^{2}$ that is $v'-v=-x$, not $v'+v=x$.
- **Forgetting to undo the Bernoulli substitution.** $v=y^{1-n}$ is an intermediate variable; an answer stated in $v$ is not a solution of the original equation.
- **Dividing by $y^{n}$ and silently discarding $y\equiv 0$.** For every $n>0$ the zero function solves the Bernoulli equation and is not in the family obtained from $v$. Board questions that ask for 'all solutions' expect it.
- **Using the Bernoulli substitution when $n=0$ or $n=1$.** With $n=1$ the formula divides by $1-n=0$; with $n=0$ the equation is already linear. Handle those directly.
- **Ignoring the interval of validity.** With $P=1/x$ the solution is only valid on one side of $x=0$; a solution through $x_0=1$ is quoted for $x>0$, not for all $x\neq0$.

## See Also

- [[01_Separation_of_Variables]]
- [[03_Exact_Equations_and_Integrating_Factors]]
- [[11_RLC_Circuit_Transients]]
- [[02_Algebraic_Substitution]]
- [[04_Integration_by_Parts_and_Tabular]]

---

[[01_Separation_of_Variables|⬅ 01]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Exact_Equations_and_Integrating_Factors|03 ➡]]
