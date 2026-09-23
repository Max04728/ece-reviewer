---
id: MATH-01-07
title: "Differentials and Error Propagation"
part: "01_Mathematics"
area: "01_Differential_Calculus"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Differentiation_Rules]]"]
tags: ["ece", "mathematics", "differential_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Differentials and Error Propagation

> [!abstract] Scope
> Use differentials to estimate small changes and propagate measurement uncertainty through a calculated result.

## Core Concept

> [!tip] Intuition
> For a small change in input, a curve is indistinguishable from its tangent line. The differential is the change predicted by that tangent — which is why it is accurate to first order and cheap to compute.

**Differential versus derivative.** The derivative $\frac{dy}{dx}$ is a rate; the differential $dy = f'(x)\,dx$ is an actual change in $y$ corresponding to a chosen change $dx$ in $x$. The true change is $\Delta y = f(x+dx) - f(x)$, and the approximation $\Delta y \approx dy$ is the linearisation. The gap between them is second-order in $dx$, so the estimate is excellent for small $dx$ and poor for large $dx$.

**Linear approximation form.** The same idea written out:
$$f(x + \Delta x) \approx f(x) + f'(x)\Delta x$$
This form is directly usable — pick a convenient base point $x$ where $f$ and $f'$ are easy, and correct by the tangent contribution. This is how $\sqrt{4.02}$ or $\sin(0.01)$ are estimated by hand.

**Error propagation.** When a quantity $Q$ is computed from measurements with uncertainties, the differential converts input uncertainty into output uncertainty:
$$\Delta Q \approx \left|\frac{dQ}{dx}\right|\Delta x$$
Taking absolute values is essential — uncertainties add, they do not cancel, because the sign of a measurement error is unknown. For a function of several variables, the individual contributions are combined:
$$\Delta Q \approx \left|\frac{\partial Q}{\partial x}\right|\Delta x + \left|\frac{\partial Q}{\partial y}\right|\Delta y + \cdots$$

**Relative and percentage error.** Relative error is $\frac{\Delta Q}{Q}$ and percentage error is $100\frac{\Delta Q}{Q}$. For power laws the rule is immediate. With $Q = kx^n$ the relative errors are related by:
$$\frac{\Delta Q}{Q} = n\frac{\Delta x}{x}$$
The relative error is scaled by the exponent, which is why squaring a measurement doubles its relative error and taking a square root halves it.

**Engineering reading of the rule.** Each independent measurement should have comparable contribution to the total error; there is no point refining a dimension whose error contributes 1% while another contributes 20%. Error propagation is therefore a design tool, not just arithmetic.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Differential | $dy = f'(x)\,dx$ | dx is a chosen increment; dy is the tangent's prediction of the change. |
| Linear approximation | $f(x+\Delta x) \approx f(x) + f'(x)\Delta x$ | Accurate for small \Delta x only. State the base point used. |
| True change vs estimate | $\Delta y = f(x+\Delta x) - f(x) \approx dy$ | The error in the estimate is second-order in \Delta x. |
| Single-variable error | $\Delta Q \approx \left\lvert \frac{dQ}{dx}\right \rvert\Delta x$ | Absolute value: an unknown-sign error must not be allowed to cancel. |
| Multi-variable error | $\Delta Q \approx \sum_i \left\lvert \frac{\partial Q}{\partial x_i}\right \rvert\Delta x_i$ | Worst-case bound; contributions add in magnitude. |
| Relative error | $\frac{\Delta Q}{Q} \approx n\frac{\Delta x}{x} \mathrm{\ for\ } Q = kx^n$ | The exponent multiplies the relative error. |
| Percentage error | $\%\mathrm{error} = 100\,\frac{\Delta Q}{Q}$ | Report as a percentage, not a decimal, unless asked otherwise. |
| Area and volume factors | $A = \pi r^2 \Rightarrow \frac{\Delta A}{A} = 2\frac{\Delta r}{r}, \quad V = \tfrac{4}{3}\pi r^3 \Rightarrow \frac{\Delta V}{V} = 3\frac{\Delta r}{r}$ | Useful sanity check on any power-law propagation. |

## Worked Problems

### P1. Use differentials to estimate $\sqrt{4.02}$.

**Given:** base point x = 4; dx = 0.02

**Solution:**

1. Let f(x) = sqrt(x), f'(x) = 1/(2 sqrt(x))
2. Choose x = 4 because sqrt(4) = 2 exactly
3. f'(4) = 1/(2*2) = 1/4
4. dy = (1/4)(0.02) = 0.005
5. Estimate: 2 + 0.005 = 2.005

> [!success]- Answer
> **$\approx 2.005$ (true value $2.00499\ldots$)**

> [!warning] Trap
> Choosing a base point that is not convenient, or forgetting to add dy to f(x) and reporting only dy.

### P2. The radius of a sphere is measured as $10 \pm 0.1$ cm. Estimate the maximum error in the computed volume.

**Given:** r = 10 cm; delta r = 0.1 cm

**Solution:**

1. V = (4/3) pi r^3, dV/dr = 4 pi r^2
2. delta V ~= 4 pi r^2 delta r = 4 pi (100)(0.1)
3. delta V ~= 40 pi ~= 125.66
4. V = (4/3)pi(1000) ~= 4188.8, so relative error = 125.66/4188.8 = 0.03

> [!success]- Answer
> **$\Delta V \approx 125.7$ cm³, a relative error of $3\%$.**

> [!warning] Trap
> Using the surface area formula 4 pi r^2 as 'the error' rather than multiplying by delta r. Also using dV/dr with the wrong power.

### P3. The side of a cube is measured as 20 cm with a possible error of 0.05 cm. Find the approximate percentage error in the volume.

**Given:** s = 20; delta s = 0.05

**Solution:**

1. V = s^3, so the relative error rule gives delta V/V = 3 (delta s/s)
2. delta s/s = 0.05/20 = 0.0025
3. delta V/V = 3(0.0025) = 0.0075
4. Percentage error = 0.75%

> [!success]- Answer
> **$0.75\%$**

> [!warning] Trap
> Reporting 0.75 as the answer when a percentage was asked, or using the exponent 1 instead of 3.

### P4. Estimate $\sin(0.01)$ using differentials with base point 0.

**Given:** base x = 0; dx = 0.01 rad

**Solution:**

1. f(x) = sin x, f'(x) = cos x
2. f(0) = 0, f'(0) = 1
3. dy = 1 * 0.01 = 0.01
4. Estimate: 0 + 0.01 = 0.01

> [!success]- Answer
> **$\approx 0.01$ (true value $0.0099998\ldots$), and note the angle is in radians.**

> [!warning] Trap
> Using degrees. The differential rule for sin x requires radians; in degrees the derivative carries a factor pi/180.

### P5. A right circular cylinder has r = 5 cm and h = 12 cm, each with a possible error of 0.02 cm. Estimate the maximum error in the volume.

**Given:** r = 5; h = 12; delta r = delta h = 0.02

**Solution:**

1. V = pi r^2 h
2. Partial derivatives: dV/dr = 2 pi r h, dV/dh = pi r^2
3. Contribution from r: 2 pi (5)(12)(0.02) = 2.4 pi
4. Contribution from h: pi (25)(0.02) = 0.5 pi
5. Total: 2.4 pi + 0.5 pi = 2.9 pi ~= 9.11

> [!success]- Answer
> **$\Delta V \approx 9.11$ cm³ (the radius error dominates).**

> [!warning] Trap
> Multiplying the two errors together, or subtracting one contribution from the other. Uncertainties add in magnitude.

## Traps & Exam Notes

- **Reporting $dy$ instead of $f(x)+dy$.** The differential is the *correction*; the estimate is the base value plus the correction.
- **Errors never cancel.** Even when the differential carries a minus sign, uncertainties add in magnitude. Absolute values are mandatory.
- **Relative error scales with the exponent.** $Q \propto x^n$ multiplies relative error by $n$: doubled for squares, halved for square roots, tripled for cubes.
- **Radians in trigonometric differentials.** $\frac{d}{dx}\sin x = \cos x$ holds in radians; in degrees there is a factor $\pi/180$.
- **Large $\Delta x$ breaks linearisation.** If the increment is not small relative to the base point, the tangent prediction is not trustworthy — say so rather than quoting it as exact.
- **Reporting a percentage as a decimal.** Read whether the question wants $0.75\%$ or $0.0075$.

## See Also

- [[02_Differentiation_Rules]]
- [[06_Optimization_Problems]]
- [[01_Limits,_Continuity_and_L_Hopital]]

---

[[06_Optimization_Problems|⬅ 06]] · [[_MOC_Differential_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Rolle’s_and_Mean_Value_Theorems|08 ➡]]
