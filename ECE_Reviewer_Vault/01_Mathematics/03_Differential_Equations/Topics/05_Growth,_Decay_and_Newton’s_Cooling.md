---
id: MATH-03-05
title: "Growth, Decay and Newton’s Cooling"
part: "01_Mathematics"
area: "03_Differential_Equations"
topic: 5
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Separation_of_Variables]]", "[[01_Limits,_Continuity_and_L_Hopital]]"]
tags: ["ece", "mathematics", "differential_equations"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 05 — Growth, Decay and Newton’s Cooling

> [!abstract] Scope
> Model exponential growth and decay with dy/dt = ky, and apply Newton's law of cooling dT/dt = -k(T - T_m) to temperature problems with a constant ambient.

## Core Concept

> [!tip] Intuition
> A rate proportional to the amount present produces exponential behaviour: growth doubles in fixed times, decay halves in fixed times. Newton's cooling is the same law applied to the *excess* temperature above the surroundings, so the room temperature is the asymptote, never a value the body crosses.

**The law and its solution.** $\frac{dy}{dt}=ky$ is separable;
$$\int\frac{dy}{y}=\int k\,dt$$
gives $\ln\lvert y\rvert=kt+C$ and $y=y_0e^{k(t-t_0)}$. The constant $k$ has units of inverse time and carries the sign: $k>0$ for growth (populations, compound interest, avalanche current), $k<0$ for decay (radioactivity, capacitor discharge, damped transients). Write down which convention you are using — the alternative form $y=y_0e^{-\lambda t}$ with $\lambda>0$ is equally common, and mixing the two flips every answer.

**Half-life and doubling time.** Setting $y=y_0/2$ gives $\frac12=e^{-\lambda t_{1/2}}$, hence $\lambda=\frac{\ln 2}{t_{1/2}}$ and $t_{1/2}=\frac{\ln 2}{\lambda}$. For growth, $t_{\mathrm{double}}=\frac{\ln 2}{k}$. The logarithm is always $\ln 2=0.6931\ldots$, never 0.5 and never 2 — a half-life is *not* the time for the exponent to fall by 1.

**Why $\ln 2$ and not something else.** The decay law is $y/y_0=e^{-\lambda t}$, a function of the dimensionless product $\lambda t$. The half-life is the value of $t$ for which that function equals $0.5$, and solving $e^{-x}=0.5$ gives $x=\ln 2$. Everything about half-life is that one number.

**Newton's law of cooling is a shifted exponential.** $\frac{dT}{dt}=-k(T-T_m)$ with ambient $T_m$ constant. Put $u=T-T_m$; then $\frac{du}{dt}=-ku$ and $u=u_0e^{-kt}$, so $T(t)=T_m+(T_0-T_m)e^{-kt}$. The physical content of the subtraction is that the cooling rate depends on the *temperature difference*, not on the temperature itself. A body at 100 °C in a 25 °C room cools toward 25 °C and never below it; the ambient is the horizontal asymptote.

**Reading $k$ out of two data points.** From $T(t)-T_m=(T_0-T_m)e^{-kt}$ the ambient cancels in the ratio:
$$e^{-kt}=\frac{T(t)-T_m}{T_0-T_m}$$
Solving that ratio for the rate gives:
$$k=\frac{1}{t}\ln\frac{T_0-T_m}{T(t)-T_m}$$
Temperature differences may be left in °C or °F because only differences enter; converting to kelvin is harmless but changing the *scale* (Celsius to Fahrenheit) between the two readings is not.

**Logarithms beat repeated halving.** For a decay question such as 'what fraction remains after 4.3 half-lives', the answer comes directly from the fractional-power form:
$$\frac{y}{y_0}=e^{-\lambda t}=2^{-t/t_{1/2}}$$
which gives $2^{-4.3}=0.0508$. Doing it by repeated halving and interpolation is slower and error-prone when the number of half-lives is not an integer.

**Where the model fails.** $\frac{dy}{dt}=ky$ assumes unlimited resources; real populations saturate and are modelled by the logistic equation:
$$\frac{dP}{dt}=kP\left(1-\frac{P}{M}\right)$$
whose solution is an S-curve approaching the carrying capacity $M$. Newton's cooling assumes the ambient is constant and the body is thermally uniform; a body in a changing environment needs $T_m(t)$ and the problem becomes a linear first-order equation with an integrating factor.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Growth / decay law | $\frac{dy}{dt}=ky\ \Rightarrow\ y=y_0e^{k(t-t_0)}$ | k > 0 growth, k < 0 decay. State the sign convention; e^{-lambda t} with lambda > 0 is equivalent. |
| Half-life | $t_{1/2}=\frac{\ln 2}{\lambda}=\frac{0.6931}{\lambda}$ | lambda in inverse time units matching t. ln 2, not 0.5. |
| Decay constant from half-life | $\lambda=\frac{\ln 2}{t_{1/2}}$ | Reciprocal of the half-life times ln 2 — a common place to divide instead of multiply. |
| Fraction remaining | $\frac{y}{y_0}=e^{-\lambda t}=2^{-t/t_{1/2}}$ | The second form lets you use half-lives directly, including fractional ones. |
| Doubling time | $t_{\mathrm{double}}=\frac{\ln 2}{k}$ | For growth only, with k > 0. The same ln 2 as the half-life. |
| Newton's cooling | $T(t)=T_m+(T_0-T_m)e^{-kt}$ | T_m is the constant ambient; T_m is the asymptote, not the initial value. Only temperature differences matter. |
| Cooling constant from data | $k=\frac{1}{t}\ln\frac{T_0-T_m}{T(t)-T_m}$ | Requires T(t) strictly between T_0 and T_m; the ratio must be greater than 1 for cooling. |
| Time to reach a temperature | $t=\frac{1}{k}\ln\frac{T_0-T_m}{T-T_m}$ | The argument of the log must be positive; an answer requiring T on the far side of T_m is impossible. |
| Continuous compounding | $A=Pe^{rt}$ | Only for continuous compounding. For n compoundings per year use P(1 + r/n)^{nt}. |
| Radiocarbon dating | $t=\frac{t_{1/2}}{\ln 2}\ln\frac{A_0}{A}$ | t_half = 5730 years for C-14; A_0/A is the activity ratio, greater than 1 for an old sample. |
| Logistic growth | $\frac{dP}{dt}=kP\left(1-\frac{P}{M}\right)$ | Bounded growth with carrying capacity M; not the plain exponential law. |

## Worked Problems

### P1. Carbon-14 has a half-life of $5730$ years. Find the decay constant, then the age of a sample that retains $20\%$ of its original carbon-14.

**Given:** t_1/2 = 5730 yr; A/A_0 = 0.20

**Solution:**

1. $\lambda=\dfrac{\ln 2}{t_{1/2}}=\dfrac{0.6931}{5730}=1.210\times10^{-4}\,\mathrm{yr^{-1}}$
2. Use the fraction-remaining form: $\dfrac{A}{A_0}=e^{-\lambda t}=0.20$
3. $-\lambda t=\ln 0.20=-1.6094$
4. $t=\dfrac{1.6094}{1.210\times10^{-4}}=1.33\times10^{4}\,\mathrm{yr}$
5. Shortcut check: $t=\dfrac{t_{1/2}}{\ln 2}\ln\dfrac{A_0}{A}=5730\times\dfrac{\ln 5}{\ln 2}=5730\times2.3219$

> [!success]- Answer
> **$\lambda=1.21\times10^{-4}$ yr$^{-1}$ and $t\approx1.33\times10^{4}$ years (about 13,300 yr).**

> [!warning] Trap
> Using $\lambda=\frac{1}{t_{1/2}}$ or $\frac{0.5}{t_{1/2}}$. Both give a decay constant that is wrong by a factor of $\ln 2\approx0.693$, which shifts every date by about 44%.

### P2. A body at $100\,^\circ\mathrm{C}$ is placed in a room at $25\,^\circ\mathrm{C}$ and cools to $70\,^\circ\mathrm{C}$ in $10$ minutes. Find the cooling constant and the time needed to reach $40\,^\circ\mathrm{C}$.

**Given:** T_0 = 100 °C; T_m = 25 °C; T(10) = 70 °C

**Solution:**

1. Excess temperatures: $T_0-T_m=75$, $T(10)-T_m=45$
2. $45=75e^{-10k}$, so $e^{-10k}=0.6$
3. $-10k=\ln 0.6=-0.5108$, giving $k=0.05108\,\mathrm{min^{-1}}$
4. For $T=40\,^\circ\mathrm{C}$: $T-T_m=15$, so $15=75e^{-kt}$ and $e^{-kt}=0.2$
5. $t=\dfrac{\ln 5}{k}=\dfrac{1.6094}{0.05108}=31.5\,\mathrm{min}$

> [!success]- Answer
> **$k=0.0511$ min$^{-1}$ and $t=31.5$ minutes.**

> [!warning] Trap
> Substituting $T=100$ instead of $T-T_m=75$ into the exponential. Newton's law governs the *excess* over ambient; using absolute temperatures destroys the asymptote and produces a $k$ that is wrong by the factor $T_m$.

### P3. A bacterial culture starts with $200$ cells and doubles every $3$ hours. Find the population after $12$ hours and the time to reach $10{,}000$ cells.

**Given:** P_0 = 200; doubling time = 3 h

**Solution:**

1. With doubling time $t_d=3$ h: $k=\dfrac{\ln 2}{3}=0.2310\,\mathrm{h^{-1}}$
2. $P(t)=200e^{0.2310t}=200\cdot2^{t/3}$
3. At $t=12$ h: $P=200\cdot2^{4}=200(16)=3200$
4. For $P=10{,}000$: $2^{t/3}=50$
5. $\dfrac{t}{3}=\log_2 50=\dfrac{\ln 50}{\ln 2}=5.6439$, so $t=16.93\,\mathrm{h}$

> [!success]- Answer
> **$P(12)=3200$ cells; $P=10{,}000$ at $t\approx16.9$ hours.**

> [!warning] Trap
> Using $P=200(1+1)^{t/3}$ with $t$ in the wrong place, or treating 'doubles every 3 hours' as a rate of $r=100\%$ per hour. The exponent is $t/3$, not $3t$; a population that doubles every 3 hours is multiplied by only $2^{1/3}=1.26$ in one hour.

### P4. Coffee at $90\,^\circ\mathrm{C}$ is set in a $20\,^\circ\mathrm{C}$ room and measures $70\,^\circ\mathrm{C}$ after $5$ minutes. What is its temperature after $15$ minutes?

**Given:** T_0 = 90 °C; T_m = 20 °C; T(5) = 70 °C

**Solution:**

1. Excess temperatures: $T_0-T_m=70$ and $T(5)-T_m=50$
2. $50=70e^{-5k}$, so $e^{-5k}=\dfrac57=0.71429$
3. For $t=15$ min, $e^{-15k}=\left(e^{-5k}\right)^{3}=\left(\dfrac57\right)^{3}=\dfrac{125}{343}=0.36443$
4. $T(15)-20=70(0.36443)=25.51$
5. $T(15)=45.5\,^\circ\mathrm{C}$

> [!success]- Answer
> **$T(15)\approx45.5\,^\circ\mathrm{C}$.**

> [!warning] Trap
> Assuming the temperature drop is linear — $20\,^\circ\mathrm{C}$ in 5 min therefore $60\,^\circ\mathrm{C}$ in 15 min, giving $30\,^\circ\mathrm{C}$. Cooling slows as the body approaches ambient; the correct answer is $45.5\,^\circ\mathrm{C}$, which is a smaller drop than three times the first.

### P5. A radioactive sample loses $30\%$ of its mass in $8$ days. Find its half-life.

**Given:** m/m_0 = 0.70 at t = 8 days

**Solution:**

1. $0.70=e^{-8\lambda}$
2. $\lambda=-\dfrac{\ln 0.70}{8}=\dfrac{0.35667}{8}=0.044584\,\mathrm{day^{-1}}$
3. $t_{1/2}=\dfrac{\ln 2}{\lambda}=\dfrac{0.69315}{0.044584}=15.55\,\mathrm{days}$
4. Check: $t_{1/2}=\dfrac{8\ln 2}{\ln(1/0.7)}=\dfrac{8(0.69315)}{0.35667}=15.55$

> [!success]- Answer
> **$t_{1/2}\approx15.5$ days.**

> [!warning] Trap
> Treating 'loses 30% in 8 days' as '30% of a half-life has passed', giving $t_{1/2}=8/0.3=26.7$ days. The fraction remaining is $2^{-t/t_{1/2}}$, not a linear proportion; the correct value is 15.5 days.

## Traps & Exam Notes

- **Sign and convention for $k$.** $y=y_0e^{kt}$ with $k<0$ for decay and $y=y_0e^{-\lambda t}$ with $\lambda>0$ are the same model. Choosing one and substituting a value from the other flips the direction of the process.
- **Using $t_{1/2}=1/\lambda$ or $0.5/\lambda$.** The correct relation is $\lambda=\ln 2/t_{1/2}$; the constant is 0.693, not 0.5 or 1.
- **Feeding $T$ instead of $T-T_m$ into Newton's law.** The governing quantity is the excess over ambient. Using absolute temperature in $T(t)=T_m+(T_0-T_m)e^{-kt}$ removes the $T_m$ term from the initial condition and gives a $k$ that grows with the ambient value.
- **Assuming a linear temperature drop.** Newton's cooling is exponential, so the drop in the second 10 minutes is smaller than in the first. Linear extrapolation overshoots the cooling badly.
- **Mixing temperature scales between the two readings.** Differences may be kept in °C, but if one reading is converted to °F and the other is not, the ratio $(T_0-T_m)/(T-T_m)$ is meaningless.
- **Treating 'percent lost' as 'percent of a half-life'.** A 30% loss is 70% remaining, and $0.70=2^{-t/t_{1/2}}$ has to be solved with logarithms; the fraction of a half-life is $\log_2(1/0.7)=0.515$, not 0.30.
- **Applying the continuous formula to periodic compounding.** $A=Pe^{rt}$ assumes continuous compounding; for annual or monthly compounding use $A=P(1+r/n)^{nt}$, which is always smaller for the same nominal $r$.

## See Also

- [[01_Separation_of_Variables]]
- [[02_Linear_First_Order_and_Bernoulli]]
- [[06_Mixtures_and_Orthogonal_Trajectories]]
- [[11_RLC_Circuit_Transients]]
- [[01_Antiderivatives_and_Standard_Forms]]

---

[[04_Homogeneous_Equations_and_Substitutions|⬅ 04]] · [[_MOC_Differential_Equations|MOC]] · [[00_Dashboard|Dashboard]] · [[06_Mixtures_and_Orthogonal_Trajectories|06 ➡]]
