---
id: MATH-03-06
title: "Mixtures and Orthogonal Trajectories"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Linear_First_Order_and_Bernoulli]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Mixtures and Orthogonal Trajectories

> [!abstract] Scope
> Set up and solve one-tank mixing problems as linear first-order equations with a time-varying volume, and find the orthogonal trajectories of a given one-parameter family of curves.

## Core Concept

> [!tip] Intuition
> A mixing problem is a conservation statement: the rate of change of the dissolved amount equals what flows in minus what flows out, and the outflow concentration is whatever the tank currently holds. Orthogonal trajectories are the same differential equation with the slope replaced by its negative reciprocal.

**The balance law.** For a well-stirred tank, the conservation statement is:
$$\frac{dA}{dt}=(\mathrm{rate\ in})-(\mathrm{rate\ out})=c_{\mathrm{in}}r_{\mathrm{in}}-\frac{A}{V(t)}r_{\mathrm{out}}$$
Here $A$ is the mass of solute, $c_{\mathrm{in}}$ the inflow concentration and $r$ the volumetric flow rates. This is linear in $A$ and is solved with an integrating factor. 'Well stirred' is the modelling assumption that makes the outflow concentration equal to $A/V$; without it, the problem is not a first-order ODE at all.

**The volume is a function of time whenever the flow rates differ.** The volume itself is:
$$V(t)=V_0+(r_{\mathrm{in}}-r_{\mathrm{out}})t$$
When $r_{\mathrm{in}}=r_{\mathrm{out}}$ the volume is constant and the outflow term is $-\frac{r}{V}A$, which gives the clean solution:
$$A(t)=c_{\mathrm{in}}V+\left(A_0-c_{\mathrm{in}}V\right)e^{-rt/V}$$
Its steady state is $A_\infty=c_{\mathrm{in}}V$, so the tank ends up at the inflow concentration. When the rates differ, $V$ must be substituted into the integrating factor, so $\mu=e^{\int r_{\mathrm{out}}dt/V(t)}$ generally becomes a power of $V(t)$, not an exponential.

**The single most common modelling error.** The rate out is $\frac{A}{V}\cdot r_{\mathrm{out}}$, not $A\cdot r_{\mathrm{out}}$ and not $c_{\mathrm{in}}r_{\mathrm{out}}$. The concentration leaving is the concentration *inside* the tank at that instant, which is the whole reason the equation is differential rather than algebraic. Using the inflow concentration for the outflow makes the amount grow without bound and is the classic wrong answer.

**Steady state and the physical check.** With constant volume, $\frac{dA}{dt}=0$ gives the steady state:
$$A_\infty=c_{\mathrm{in}}V$$
so the final concentration is exactly the inflow concentration. Any solution must approach that value and not overshoot it — a mass of solute greater than $c_{\mathrm{in}}V$ is impossible when the two rates are equal and the tank started below it. Use this as a sanity check on the sign of the exponential.

**Orthogonal trajectories: the recipe.** Given a one-parameter family $F(x,y,C)=0$: (1) differentiate implicitly to get a relation involving $C$; (2) eliminate $C$ between the original family and its derivative so the slope is expressed as $y'=f(x,y)$; (3) the orthogonal family satisfies $y'=-\frac{1}{f(x,y)}$; (4) solve that new ODE. Two curves are orthogonal when the product of their slopes is $-1$, so the negative reciprocal is the entire content of the method.

**Why elimination of $C$ is not optional.** The family carries one parameter; the slope field that is orthogonal to it must be a property of the *whole* family, not of one member. If $C$ remains in the ODE, the 'orthogonal' equation is really a statement about a single curve, and the resulting trajectories will cross only that member at right angles.

**Worked patterns worth recognising.** The orthogonal trajectories of the circles $x^{2}+y^{2}=C^{2}$ are the lines $y=kx$ through the origin. Those of the parabolas $y=Cx^{2}$ are the ellipses $x^{2}+2y^{2}=K$. Those of $xy=C$ are the hyperbolas $x^{2}-y^{2}=K$. In every case the answer is obtained by replacing the slope with its negative reciprocal and then separating.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Tank mass balance | $\frac{dA}{dt}=c_{\mathrm{in}}r_{\mathrm{in}}-\frac{A}{V(t)}r_{\mathrm{out}}$ | A in mass units (kg, g, lb), c_in in mass per volume, r in volume per time. A must be the total mass, not the concentration. |
| Volume in the tank | $V(t)=V_0+(r_{\mathrm{in}}-r_{\mathrm{out}})t$ | Only constant when the two flow rates are equal; otherwise the outflow term is time-dependent. |
| Equal-rate solution | $A(t)=c_{\mathrm{in}}V+\left(A_0-c_{\mathrm{in}}V\right)e^{-r_{\mathrm{out}}t/V}$ | Valid only for r_in = r_out. The steady state is A_infinity = c_in V. |
| Steady state | $A_\infty=c_{\mathrm{in}}V$ | With constant V. The tank cannot finish richer than the inflow concentration. |
| Outflow term | $\mathrm{rate\ out}=\frac{A(t)}{V(t)}r_{\mathrm{out}}$ | Uses the current tank concentration, never the inflow concentration. |
| Orthogonality condition | $m_1m_2=-1\ \Rightarrow\ m_\perp=-\frac{1}{m}$ | Perpendicular lines have negative reciprocal slopes; the sign matters. |
| Orthogonal trajectories | $\frac{dy}{dx}=-\frac{1}{f(x,y)}$ | f is the slope of the given family AFTER the parameter C has been eliminated. |
| Elimination step | $y'=f(x,y,C)\ \mathrm{and}\ F(x,y,C)=0\ \Rightarrow\ y'=f(x,y)$ | Solve the original family for C and substitute; a surviving C means the ODE describes one curve, not the family. |
| Standard result: circles | $x^{2}+y^{2}=C^{2}\ \Rightarrow\ \mathrm{orthogonal\ family\ } y=kx$ | Radial lines. Slope of the family is -x/y, so the orthogonal slope is y/x. |
| Standard result: parabolas | $y=Cx^{2}\ \Rightarrow\ x^{2}+2y^{2}=K$ | Family slope is 2y/x, so the orthogonal ODE is 2y dy = -x dx. |

## Worked Problems

### P1. A tank holds $100\,\mathrm{L}$ of brine containing $10\,\mathrm{kg}$ of salt. Brine with $0.2\,\mathrm{kg/L}$ of salt enters at $5\,\mathrm{L/min}$ and the well-stirred mixture leaves at $5\,\mathrm{L/min}$. Find the salt content $A(t)$ and the time at which it reaches $15\,\mathrm{kg}$.

**Given:** V_0 = 100 L; A_0 = 10 kg; c_in = 0.2 kg/L; r_in = r_out = 5 L/min

**Solution:**

1. Rates are equal, so $V=100\,\mathrm{L}$ throughout
2. Balance: $\dfrac{dA}{dt}=(0.2)(5)-\dfrac{A}{100}(5)=1-\dfrac{A}{20}$
3. Standard linear form $A'+\dfrac{1}{20}A=1$ with $\mu=e^{t/20}$
4. $\left(e^{t/20}A\right)'=e^{t/20}$, so $e^{t/20}A=20e^{t/20}+C$ and $A=20+Ce^{-t/20}$
5. Apply $A(0)=10$: $10=20+C$, so $C=-10$
6. Set $A=15$: $15=20-10e^{-t/20}$, so $e^{-t/20}=0.5$
7. $t=20\ln 2=13.86\,\mathrm{min}$

> [!success]- Answer
> **$A(t)=20-10e^{-t/20}$ kg, reaching $15$ kg at $t=20\ln 2\approx13.9$ min; the limiting content is $20$ kg.**

> [!warning] Trap
> Writing the outflow as $0.2\times5=1\,\mathrm{kg/min}$, i.e. using the inflow concentration for the outflow. That makes $dA/dt=0$ and predicts a constant $10\,\mathrm{kg}$ forever. The outflow concentration is $A/V$, which starts at $0.1\,\mathrm{kg/L}$.

### P2. A $200\,\mathrm{L}$ tank is filled with pure water. Brine containing $0.5\,\mathrm{kg/L}$ of salt enters at $4\,\mathrm{L/min}$ and the mixture leaves at $4\,\mathrm{L/min}$. Find the salt content and the concentration after $20$ minutes.

**Given:** V = 200 L; A_0 = 0; c_in = 0.5 kg/L; r = 4 L/min

**Solution:**

1. Volume is constant at $200\,\mathrm{L}$
2. $\dfrac{dA}{dt}=0.5(4)-\dfrac{A}{200}(4)=2-\dfrac{A}{50}$
3. Steady state: $2-\dfrac{A}{50}=0$ gives $A_\infty=100\,\mathrm{kg}=c_{\mathrm{in}}V$
4. $A=100+Ce^{-t/50}$; with $A(0)=0$, $C=-100$
5. $A(t)=100\left(1-e^{-0.02t}\right)$
6. At $t=20$: $A=100\left(1-e^{-0.4}\right)=100(1-0.6703)=32.97\,\mathrm{kg}$
7. Concentration $=\dfrac{A}{V}=\dfrac{32.97}{200}=0.165\,\mathrm{kg/L}$

> [!success]- Answer
> **$A(20)=33.0$ kg and $C(20)=0.165$ kg/L (approaching the inflow value $0.5$ kg/L).**

> [!warning] Trap
> Reporting the concentration as $A(20)$ itself. The question asks for concentration, which is $A/V$; on the way the two happen to share a value only at the steady state.

### P3. A $50\,\mathrm{L}$ tank holds $2\,\mathrm{kg}$ of salt in solution. Brine with $0.1\,\mathrm{kg/L}$ enters at $3\,\mathrm{L/min}$ while the mixture leaves at $2\,\mathrm{L/min}$. Find $A(t)$ and the amount after $50$ minutes.

**Given:** V_0 = 50 L; A_0 = 2 kg; c_in = 0.1 kg/L; r_in = 3 L/min; r_out = 2 L/min

**Solution:**

1. The rates differ: $V(t)=50+(3-2)t=50+t$
2. $\dfrac{dA}{dt}=0.1(3)-\dfrac{A}{50+t}(2)=0.3-\dfrac{2A}{50+t}$
3. Linear form $A'+\dfrac{2}{50+t}A=0.3$ with $\mu=e^{\int 2\,dt/(50+t)}=(50+t)^{2}$
4. $\left((50+t)^{2}A\right)'=0.3(50+t)^{2}$
5. $(50+t)^{2}A=0.1(50+t)^{3}+C$, so $A=0.1(50+t)+\dfrac{C}{(50+t)^{2}}$
6. Apply $A(0)=2$: $2=5+\dfrac{C}{2500}$, so $C=-7500$
7. At $t=50$: $V=100$ and $A=0.1(100)-\dfrac{7500}{10000}=10-0.75$

> [!success]- Answer
> **$A(t)=0.1(50+t)-\dfrac{7500}{(50+t)^{2}}$ kg, so $A(50)=9.25$ kg.**

> [!warning] Trap
> Using the constant-volume formula with $V=50$, which ignores that the tank is filling. Because $r_{\mathrm{in}}>r_{\mathrm{out}}$ the volume grows, the outflow term $-2A/(50+t)$ decays faster than $-A/25$ would, and the constant-volume answer is too low.

### P4. Find the orthogonal trajectories of the family $y=Cx^{2}$.

**Given:** family: y = C x^2; one parameter C

**Solution:**

1. Differentiate: $y'=2Cx$
2. Eliminate $C$ using $C=\dfrac{y}{x^{2}}$: $y'=2\cdot\dfrac{y}{x^{2}}\cdot x=\dfrac{2y}{x}$
3. Orthogonal slope: $\dfrac{dy}{dx}=-\dfrac{1}{2y/x}=-\dfrac{x}{2y}$
4. Separate: $2y\,dy=-x\,dx$
5. Integrate: $y^{2}=-\dfrac{x^{2}}{2}+K$
6. Multiply by 2 and rename the constant

> [!success]- Answer
> **$x^{2}+2y^{2}=C$ — a family of ellipses, orthogonal to the parabolas at every intersection.**

> [!warning] Trap
> Forgetting to eliminate $C$ before taking the negative reciprocal. Using $y'=2Cx$ directly gives $-1/(2Cx)$, whose solution depends on $C$; it cuts only the single parabola $y=Cx^{2}$ at right angles instead of the whole family.

### P5. Find the orthogonal trajectories of the family of circles $x^{2}+y^{2}=C^{2}$ centred at the origin.

**Given:** family: x^2 + y^2 = C^2

**Solution:**

1. Differentiate implicitly: $2x+2yy'=0$ — the parameter $C$ already cancels
2. So $y'=-\dfrac{x}{y}$
3. Orthogonal slope: $\dfrac{dy}{dx}=\dfrac{y}{x}$
4. Separate: $\dfrac{dy}{y}=\dfrac{dx}{x}$
5. $\ln\lvert y\rvert=\ln\lvert x\rvert+c$, so $y=kx$

> [!success]- Answer
> **$y=kx$ — the straight lines through the origin, i.e. the radii of the circles.**

> [!warning] Trap
> Taking the orthogonal slope as $-y/x$ (reciprocal without the sign change) and obtaining hyperbolas $xy=K$. The condition is $m_\perp=-1/m$, not $1/m$; dropping the minus gives the wrong family entirely.

## Traps & Exam Notes

- **Using the inflow concentration for the outflow.** The rate out is $\frac{A}{V}r_{\mathrm{out}}$. Setting it to $c_{\mathrm{in}}r_{\mathrm{out}}$ makes $dA/dt=0$ and predicts no change at all.
- **Assuming the volume is constant.** Unless $r_{\mathrm{in}}=r_{\mathrm{out}}$, $V=V_0+(r_{\mathrm{in}}-r_{\mathrm{out}})t$ must be carried into the integrating factor; the constant-volume exponential solution is then wrong, sometimes by several kilograms.
- **Confusing amount with concentration.** The ODE governs the total mass $A$; the answer to a 'concentration' question is $A/V$, and $V$ may itself be changing.
- **Mixing units of mass and volume.** $dA/dt$ has units of mass per time; $c_{\mathrm{in}}r_{\mathrm{in}}$ must give the same units. A concentration in g/L with a rate in L/min yields g/min, so $A$ is in grams — do not then quote it in kilograms without converting.
- **Sign error in the orthogonal slope.** The orthogonal family satisfies $y'=-1/f$, so a missing minus sign returns a family parallel-like to the original rather than perpendicular to it. Check with a known pair: circles centred at the origin must produce radial lines.
- **Failing to eliminate the parameter $C$.** The slope of the orthogonal family must be a function of $x$ and $y$ only; an ODE still containing $C$ describes the orthogonal curve to one member of the family, not the trajectory family.
- **Ignoring the physical asymptote in a mixing answer.** With equal rates the amount must tend to $c_{\mathrm{in}}V$ from below if it started below. An exponential that overshoots that value signals a sign error in the outflow or integrating factor.

## See Also

- [[01_Separation_of_Variables]]
- [[02_Linear_First_Order_and_Bernoulli]]
- [[04_Homogeneous_Equations_and_Substitutions]]
- [[05_Growth,_Decay_and_Newton’s_Cooling]]
- [[09_Plane_Areas_Cartesian]]

---

[[05_Growth,_Decay_and_Newton’s_Cooling|⬅ 05]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Higher_Order_Homogeneous_Auxiliary_Equation|07 ➡]]
