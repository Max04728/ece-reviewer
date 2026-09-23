---
id: MATH-05-06
title: "Electric Potential and Gradient"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[02_Gradient,_Divergence,_Curl_and_Laplacian]]", "[[05_Gauss_Law_and_Applications]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Electric Potential and Gradient

> [!abstract] Scope
> Work with electric scalar potential — compute it from charge distributions, take potential differences, and recover the field with the negative gradient.

## Core Concept

> [!tip] Intuition
> Potential replaces three field components with one number. Because the electrostatic field is conservative, the work needed to move a charge depends only on the endpoints, so the whole field can be reconstructed from a single scalar function of position.

**Potential is work per unit charge and it is path-independent.** $V=W/q$ in volts (joules per coulomb). A potential difference is the line integral of the field:
$$V_{AB}=V_A-V_B=\int_A^B\mathbf{E}\cdot d\mathbf{l}$$
The integral is path-independent precisely because $\nabla\times\mathbf{E}=0$ in electrostatics, which is what allows a single-valued potential to exist. The reference point is arbitrary — only differences are physical — and the conventional choice is $V\to0$ at infinity, which requires all the charge to be at finite distance.

**Computing V directly is usually easier than computing E.** Potential is a scalar, so superposition is ordinary algebraic addition with the sign of each charge carried through: $V=\sum_i kQ_i/r_i$ for point charges, and $\int dq/(4\pi\varepsilon_0 r)$ for a distribution. No components, no angles. The price is that $V$ must be found first and differentiated to get $\mathbf{E}$. For a point charge $V=kQ/r$; for a conducting sphere of radius $a$ the potential is $kQ/r$ outside and the constant $kQ/a$ throughout the interior, since the field inside a conductor is zero.

**The field is the negative gradient of potential.** $\mathbf{E}=-\nabla V$: the field points toward decreasing potential, its magnitude is the maximum rate of decrease per metre, and $\mathbf{E}$ is everywhere perpendicular to the equipotential surfaces. That perpendicularity has a practical consequence — a conductor's surface is an equipotential, so the field just outside it is normal to the surface. The minus sign is not bookkeeping: it is the statement that positive charges fall downhill in potential, exactly as masses fall in a gravitational potential.

**Where the infinity reference breaks.** For an infinite line charge the potential diverges logarithmically:
$$V=-\dfrac{\lambda}{2\pi\varepsilon_0}\ln\rho+C$$
and for an infinite sheet it diverges linearly, so 'zero at infinity' is unavailable. Pick a finite reference (often $\rho=1$ m or the outer conductor of a cable) and work with differences; the difference is reference-independent. Note also that $\mathbf{E}=-\nabla V$ needs no reference at all, since the constant cancels under differentiation.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Potential definition | $V=\frac{W}{q},\qquad V_{AB}=V_A-V_B=-\int_A^B\mathbf{E}\cdot d\mathbf{l}$ | Volts = joules per coulomb. Only differences are physical. |
| Point charge potential | $V=\frac{kQ}{r}=\frac{Q}{4\pi\varepsilon_0 r}$ | Reference at infinity. Falls as 1/r, not 1/r^2 — this is why work is needed to bring a charge in from infinity. |
| Field from potential | $\mathbf{E}=-\nabla V$ | Static fields only. Magnitude is the maximum rate of decrease of V per metre. |
| Scalar superposition | $V=\sum_i\frac{kQ_i}{r_i}$ | Algebraic sum: carry each charge's sign. No component resolution needed. |
| Infinite line charge | $V=-\frac{\lambda}{2\pi\varepsilon_0}\ln\rho+C$ | No zero-at-infinity reference exists. Use a finite reference and difference the logarithms, $V_{AB}=\frac{\lambda}{2\pi\varepsilon}\ln(\rho_B/\rho_A)$. |
| Dipole potential | $V=\frac{kp\cos\theta}{r^2}$ | At distances large compared with the separation; zero on the equatorial plane. |
| Potential energy of a charge | $W=qV,\qquad U=\frac{q_1q_2}{4\pi\varepsilon_0 r}$ | W is the work an external agent does against the field, so positive for like charges approaching. |
| Potential inside a conductor | $V=\frac{kQ}{a}=\mathrm{constant},\qquad E=0\ \ (r<a)$ | E is zero, but V is not — the conductor sits at the surface potential. |
| Potential inside a charged insulator | $V=\frac{kQ}{2a^3}(3a^2-r^2),\qquad r\le a$ | Maximum at the centre. Parabolic, not constant — a frequent wrong answer. |
| Poisson and Laplace | $\nabla^2V=-\frac{\rho_v}{\varepsilon};\qquad \nabla^2V=0\ \mathrm{\ in\ charge-free\ regions}$ | The differential form that turns potential problems into boundary-value problems. |

## Worked Problems

### P1. Find the potential at $r=0.3$ m from a point charge $Q=6$ nC, taking $V=0$ at infinity.

**Given:** Q = 6 nC; r = 0.3 m

**Solution:**

1. V = kQ/r = (8.988e9)(6e-9)/0.3
2. Numerator: (8.988e9)(6e-9) = 53.93
3. V = 53.93/0.3 = 179.8 V

> [!success]- Answer
> **$V=180$ V.**

> [!warning] Trap
> Using $1/r^2$ as in the field formula. Potential falls as $1/r$; the field falls as $1/r^2$. Confusing the two is the single most common error in this topic.

### P2. Charges $q_1=+2\ \mu\mathrm{C}$ at the origin and $q_2=-2\ \mu\mathrm{C}$ at $(0.4,0)$ m. Find the potential at $(0,0.3)$ m.

**Given:** q1 = +2 uC at origin; q2 = -2 uC at (0.4, 0) m; field point (0, 0.3) m

**Solution:**

1. r1 = 0.3 m; r2 = sqrt(0.2^2 + 0.3^2) = sqrt(0.13) = 0.3606 m
2. V1 = k q1/r1 = (8.988e9)(2e-6)/0.3 = 17976/0.3 = 59920 V
3. V2 = k q2/r2 = (8.988e9)(-2e-6)/0.3606 = -17976/0.3606 = -49856 V
4. V = V1 + V2 = 59920 - 49856 = 10064 V

> [!success]- Answer
> **$V=10.06$ kV.**

> [!warning] Trap
> Subtracting the two contributions because the charges have opposite signs *and* forgetting the denominators differ. Here the negative charge contributes a negative term automatically once its sign is carried; the remaining difference comes from $r_2>r_1$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `Pol(0.2,0.3)=` → X = **0.36056**, which is $r_2=\sqrt{0.2^2+0.3^2}$; Y = 56.31° is not needed.
> 2. `8.988E9×2E-6÷0.3+8.988E9×(-)2E-6÷X=` → $V$ = **10063.5** V, about **10.06** kV.
> 3. The two contributions are **59920** V and **-49856** V; the negative charge keeps its own sign.
>
> `Pol(` is the fastest distance finder; $r_2>r_1$ is what leaves 10 kV rather than zero.

### P3. The potential in a region is $V=3x^2y$ volts. Find $\mathbf{E}$ at $(1,2,3)$ m and its magnitude.

**Given:** V = 3x^2 y V; point (1,2,3) m

**Solution:**

1. dV/dx = 6xy, dV/dy = 3x^2, dV/dz = 0
2. At (1,2,3): grad V = 6(1)(2)a_x + 3(1)^2 a_y = 12a_x + 3a_y V/m
3. E = -grad V = -12a_x - 3a_y V/m
4. |E| = sqrt(144 + 9) = sqrt(153) = 12.37 V/m

> [!success]- Answer
> **$\mathbf{E}=-12\mathbf{a}_x-3\mathbf{a}_y$ V/m, $|\mathbf{E}|=12.4$ V/m.**

> [!warning] Trap
> Dropping the negative sign, or forgetting that $V$ has no $z$ dependence so $E_z=0$ by inspection rather than by an unperformed derivative. Both are cheap marks lost.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `6×1×2` `ALPHA` `:` `3×1²` `ALPHA` `:` `0` `=` → $\nabla V$ = **12** → **3** → **0** V/m.
> 2. `√(12²+3²)=` → $\lvert\mathbf{E}\rvert$ = **12.37** V/m.
> 3. $\mathbf{E}=-\nabla V$ = **-12** $\mathbf{a}_x$ **-3** $\mathbf{a}_y$ V/m, with $E_z$ = **0** by inspection.

### P4. How much work must an external agent do to move $q=5\ \mu\mathrm{C}$ from $r=1$ m to $r=0.5$ m in the field of $Q=10\ \mu\mathrm{C}$ fixed at the origin?

**Given:** Q = 10 uC fixed at origin; q = 5 uC moved 1 m -> 0.5 m

**Solution:**

1. Potential of Q at radius r: V(r) = kQ/r, with kQ = (8.988e9)(10e-6) = 89880 V.m
2. V(0.5) = 89880/0.5 = 179760 V; V(1) = 89880 V
3. Delta V = 179760 - 89880 = 89880 V
4. W_ext = q Delta V = (5e-6)(89880)
5. = 0.4494 J

> [!success]- Answer
> **$W_{\mathrm{ext}}=+0.449$ J (the field does $-0.449$ J; like charges repel, so the agent must push).**

> [!warning] Trap
> Reporting $-0.449$ J. The work done *by the field* is negative here; the question asks for the external agent, whose work is positive. State which one is wanted and keep the sign consistent with the potential difference chosen.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `8.988E9×10E-6×(1÷0.5−1÷1)×5E-6=` → $W_{\mathrm{ext}}$ = **0.4494** J.
> 2. The bracket is the potential difference: `8.988E9×10E-6×(1÷0.5−1÷1)=` → **89880** V.
> 3. Sign check: the field does the negative of this, `(-)Ans=` → **-0.4494** J; the agent's work is positive.

### P5. A long line charge has $\lambda=15$ nC/m. Find the potential difference between $\rho=1$ cm and $\rho=5$ cm.

**Given:** lambda = 15 nC/m; rho_A = 1 cm; rho_B = 5 cm

**Solution:**

1. For a line charge, V_A - V_B = (lambda/2 pi eps0) ln(rho_B/rho_A)
2. lambda/(2 pi eps0) = (15e-9)/(5.5635e-11) = 269.6 V
3. ln(5/1) = ln 5 = 1.6094
4. V_A - V_B = (269.6)(1.6094) = 434.0 V

> [!success]- Answer
> **$V(1\ \mathrm{cm})-V(5\ \mathrm{cm})=434$ V, i.e. the closer point is 434 V higher.**

> [!warning] Trap
> Taking $r=0$ as a reference for a line charge. The logarithm diverges, so no absolute potential exists — only differences. Also, the log argument is the *ratio* of distances, so any consistent unit gives the same answer.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `15E-9÷(2\pi×` `SHIFT` `CVALUE` `32` `)=` → $\lambda/2\pi\varepsilon_0$ = **269.6** V, with code `32` = $\varepsilon_0$.
> 2. `×\ln(5)=` → $V_A-V_B$ = **434.0** V; the closer point at 1 cm is the higher one.
> 3. The log takes a ratio, so `\ln(5÷1)=` → **1.6094** is unit-independent.

## Traps & Exam Notes

- **Using $1/r^2$ for potential.** $V=kQ/r$ while $E=kQ/r^2$. A potential that decays too fast is the classic slip, and it carries into every energy calculation.
- **Zero reference at infinity for infinite distributions.** An infinite line or sheet gives a divergent potential; only differences are meaningful, and they are reference-independent. Inside a coaxial cable the natural reference is the outer conductor.
- **Assuming $V=0$ inside a conductor.** The *field* is zero inside a conductor, so the potential is constant there — not zero. An isolated charged sphere sits at $V=kQ/a$ throughout its interior.
- **Dropping the minus sign in $\mathbf{E}=-\nabla V$.** The field points toward lower potential. Without the sign, forces and therefore accelerations reverse direction.
- **Treating potential like a vector.** Superposition of $V$ is plain algebraic addition with signs; there are no angles or components. Adding magnitudes instead of signed values gives an overestimate whenever charges of both signs are present.
- **Confusing potential with potential energy.** $V$ is per unit charge (volts); $U=qV$ is in joules and depends on the test charge placed there.

## See Also

- [[02_Gradient,_Divergence,_Curl_and_Laplacian]]
- [[04_Coulomb’s_Law_and_E_Field]]
- [[05_Gauss_Law_and_Applications]]
- [[07_Dipoles_and_Polarization]]
- [[10_Electrostatic_Energy_and_Forces]]

---

[[05_Gauss_Law_and_Applications|⬅ 05]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Dipoles_and_Polarization|07 ➡]]
