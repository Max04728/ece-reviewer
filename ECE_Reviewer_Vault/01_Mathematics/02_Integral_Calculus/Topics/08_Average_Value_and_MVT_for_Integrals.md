---
id: MATH-02-08
title: "Average Value and MVT for Integrals"
part: "01_Mathematics"
area: "02_Integral_Calculus"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[03_Definite_Integrals_and_FTC]]"]
tags: ["ece", "mathematics", "integral_calculus"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Average Value and MVT for Integrals

> [!abstract] Scope
> Find the average value of a function and the point guaranteed by the Mean Value Theorem for Integrals.

## Core Concept

> [!tip] Intuition
> The average value of a function is the height of the rectangle with the same base that has the same area as the region under the curve. The Mean Value Theorem for Integrals guarantees the function actually attains that height somewhere.

**Average value.** For $f$ continuous on $[a,b]$, the average value is $f_{\mathrm{avg}} = \frac{1}{b-a}\int_a^b f(x)\,dx$. Geometrically it is the height of a rectangle of width $b-a$ whose area equals the area under the curve. The division by $b-a$ is essential: the integral alone gives total area, not average height.

**Mean Value Theorem for Integrals.** If $f$ is continuous on $[a,b]$, there exists at least one $c$ in $(a,b)$ with $f(c) = f_{\mathrm{avg}}$, that is $f(c) = \frac{1}{b-a}\int_a^b f(x)\,dx$. This is the continuous analogue of 'in any finite list of numbers, some value is at least the average' — except continuity guarantees the function actually takes the average as a value, which is not automatic for arbitrary functions.

**Relationship to the MVT for derivatives.** The two theorems are the same statement seen from different sides. Define $F(x) = \int_a^x f(t)\,dt$. Applying the derivative MVT to $F$ on $[a,b]$ gives $F'(c) = \frac{F(b)-F(a)}{b-a}$ for some $c$. Since $F'(c) = f(c)$ by the FTC and $F(b)-F(a) = \int_a^b f$, this becomes $f(c) = \frac{1}{b-a}\int_a^b f$ — exactly the integral MVT. So continuity of $f$ is what makes the derivative MVT applicable to $F$.

**Finding the guaranteed point.** Compute $f_{\mathrm{avg}}$, then solve $f(c) = f_{\mathrm{avg}}$ for $c$ and keep only solutions inside $(a,b)$. There may be more than one valid $c$; the theorem guarantees at least one. Problems often ask for *a* value, so reporting one correct interior solution is sufficient, though listing all of them is safer.

**Applications.** The average value is the natural interpretation of many engineering quantities: average power over a cycle, average current, average temperature, average velocity ($\frac{1}{b-a}\int v\,dt$ gives average velocity, distinct from average speed which uses $|v|$). Recognising which average a problem wants is usually the real difficulty.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Average value | $f_{\mathrm{avg}} = \frac{1}{b-a}\int_a^b f(x)\,dx$ | Continuous f on [a,b]. The 1/(b-a) is mandatory. |
| MVT for integrals | $\exists\, c\in(a,b): \quad f(c) = \frac{1}{b-a}\int_a^b f(x)\,dx$ | Guarantees the function attains its average value. |
| Equivalent area statement | $\int_a^b f(x)\,dx = f(c)(b-a)$ | The rectangle of height f(c) matches the area exactly. |
| Average of a constant | $f_{\mathrm{avg}} = k \mathrm{\ if\ } f(x)=k$ | Sanity check: the average of a constant is itself. |
| Average velocity | $v_{\mathrm{avg}} = \frac{1}{b-a}\int_a^b v(t)\,dt$ | Signed. Average SPEED uses \|v(t)\| and is generally larger. |
| Root mean square | $f_{\mathrm{rms}} = \sqrt{\frac{1}{b-a}\int_a^b f^2\,dx}$ | Different average, used for power. Not the same as \|f_avg\|. |
| Average of a periodic function | $\bar{f} = \frac{1}{T}\int_0^{T} f(t)\,dt$ | Over one full period T. |

## Worked Problems

### P1. Find the average value of $f(x) = x^2$ on $[0,3]$.

**Given:** simple polynomial

**Solution:**

1. f_avg = (1/3)∫_0^3 x^2 dx
2. ∫_0^3 x^2 dx = [x^3/3]_0^3 = 9
3. f_avg = 9/3 = 3

> [!success]- Answer
> **$3$**

> [!warning] Trap
> Reporting 9, the integral, without dividing by the interval length.

### P2. Find the value of $c$ guaranteed by the MVT for Integrals for $f(x) = x^2$ on $[0,3]$.

**Given:** average value already found to be 3

**Solution:**

1. Set f(c) = f_avg: c^2 = 3
2. c = ±sqrt(3)
3. Keep only c in (0,3)

> [!success]- Answer
> **$c = \sqrt{3} \approx 1.732$**

> [!warning] Trap
> Reporting both roots. The theorem's c must lie strictly inside the interval, so -sqrt(3) is discarded.

### P3. Find the average value of $f(x) = \sin x$ on $[0,\pi]$.

**Given:** trigonometric function

**Solution:**

1. f_avg = (1/pi)∫_0^pi sin x dx
2. ∫_0^pi sin x dx = [-cos x]_0^pi = -(-1) - (-1) = 2
3. f_avg = 2/pi

> [!success]- Answer
> **$\dfrac{2}{\pi} \approx 0.637$**

> [!warning] Trap
> Forgetting the 1/pi factor and reporting 2, or making a sign slip in [-cos x]_0^pi: the result is -(-1) - (-1) = 1 + 1 = 2.

### P4. Find the average value of $f(x) = \dfrac{1}{x}$ on $[1, e]$.

**Given:** logarithmic

**Solution:**

1. f_avg = (1/(e-1))∫_1^e (1/x) dx
2. ∫_1^e (1/x) dx = [ln|x|]_1^e = 1 - 0 = 1
3. f_avg = 1/(e-1)

> [!success]- Answer
> **$\dfrac{1}{e-1} \approx 0.582$**

> [!warning] Trap
> Using ln e = 1 correctly but then writing the interval length as e rather than e - 1.

### P5. A sinusoidal voltage $v(t) = 170\sin(120\pi t)$ V is applied to a resistor. Find its average value over one period and its RMS value.

**Given:** AC waveform; period T = 2pi/(120pi) = 1/60 s

**Solution:**

1. Period: T = 2pi/omega = 2pi/(120pi) = 1/60 s
2. Average: v_avg = (1/T)∫_0^T 170 sin(omega t) dt = 0 over a full cycle
3. RMS: v_rms = sqrt((1/T)∫_0^T 170^2 sin^2(omega t) dt)
4. Use the mean of sin^2 over a period = 1/2, so v_rms = 170/sqrt(2)

> [!success]- Answer
> **$v_{\mathrm{avg}} = 0$ V, $v_{\mathrm{rms}} = \dfrac{170}{\sqrt{2}} \approx 120.2$ V**

> [!warning] Trap
> Confusing average with RMS. The average of a full sine cycle is zero, which is why power calculations require the RMS value instead.

## Traps & Exam Notes

- **Omitting the $\frac{1}{b-a}$ factor.** The integral gives the area, not the average height. This is the single most common error.
- **Reporting $c$ outside the interval.** The guaranteed point must lie strictly in $(a,b)$; discard any other roots.
- **Confusing average value with RMS.** They are different averages. Average value of a full sine cycle is 0; its RMS is $A/\sqrt{2}$. Power uses RMS.
- **Average velocity versus average speed.** Average velocity integrates the signed $v(t)$; average speed integrates $|v(t)|$. They differ whenever the velocity changes sign.
- **Using the wrong interval length.** For $[1,e]$ the length is $e-1$, not $e$ — a small slip with a large effect on the answer.
- **Assuming one $c$ exists.** The theorem guarantees at least one. There may be several; a question asking for 'the' value often expects the one in a stated sub-interval.

## See Also

- [[03_Definite_Integrals_and_FTC]]
- [[09_Plane_Areas_Cartesian]]
- [[08_Rolle’s_and_Mean_Value_Theorems]]

---

[[07_Improper_Integrals|⬅ 07]] · [[_MOC_Integral_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Plane_Areas_Cartesian|09 ➡]]
