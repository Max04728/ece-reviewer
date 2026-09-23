---
id: MATH-05-09
title: "Capacitance from Geometry"
part: "01_Mathematics"
area: "05_Electromagnetics"
topic: 9
tier: 1
depth: full
problem_count: 10
prereqs: ["[[05_Gauss_Law_and_Applications]]", "[[08_Dielectrics_and_Boundary_Conditions]]"]
tags: ["ece", "mathematics", "electromagnetics"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — Capacitance from Geometry

> [!abstract] Scope
> Compute capacitance from electrode geometry — parallel plate, coaxial, spherical and two-wire — plus series and parallel combinations, layered dielectrics, stored energy and the force between plates.

## Core Concept

> [!tip] Intuition
> Capacitance is geometry wearing a permittivity. Put $+Q$ on one conductor and $-Q$ on the other, find $\mathbf{D}$ from Gauss's law using the symmetry of the electrodes, integrate $\mathbf{E}$ to get the voltage, then divide: $C=Q/V$. Every standard formula in this topic is that one recipe applied to a different shape.

**Definition and the universal recipe.** Capacitance is the charge stored per volt, $C=Q/V$, in farads (coulombs per volt). It depends only on the *geometry* of the electrodes and on the permittivity of whatever fills the gap — never on $Q$ or $V$ themselves. The five-step recipe that generates every formula on this page is: (1) place $+Q$ on one conductor and $-Q$ on the other; (2) find $\mathbf{D}$ with Gauss's law, choosing a Gaussian surface that follows the symmetry of the electrodes; (3) get $\mathbf{E}=\mathbf{D}/\varepsilon$; (4) integrate along a field line, $V=\int\mathbf{E}\cdot d\mathbf{l}$, from one conductor to the other; (5) form $C=Q/V$ and confirm that $Q$ cancels. If $Q$ survives in the final expression, a step is wrong. One farad is enormous — a 1 F capacitor would need plates of about $10^{8}\ \mathrm{m^2}$ separated by a millimetre — so real answers arrive in pF, nF or $\mu$F.

**Parallel plate.** The electrodes are equipotentials, so with plates of area $A$ carrying $\pm Q$ the surface charge density is $\sigma=Q/A$ and the field between them is uniform:
$$E=\sigma/\varepsilon=Q/(\varepsilon A)$$
Integrating over the separation $d$ gives $V=Ed=Qd/(\varepsilon A)$, so $C=\varepsilon A/d$. The formula is exact only for infinite plates; when $d$ is not small compared with the plate width the fringing field at the edges adds a few percent, which board problems conventionally ignore. Stacking layers of different dielectrics gives a series combination inside a single component:
$$C=A\big/\sum_i(d_i/\varepsilon_i)$$
Notice that for a fixed geometry, capacitance is directly proportional to $\varepsilon_r$ — filling the gap multiplies $C$ by $\varepsilon_r$.

**Coaxial (cylindrical) geometry.** For a cable with inner radius $a$, outer radius $b$ and length $L$, a cylindrical Gaussian surface of radius $\rho$ encloses the inner charge $Q$, so $D=Q/(2\pi\rho L)$ and $E=Q/(2\pi\varepsilon\rho L)$. The field is not uniform: it is strongest at the inner conductor and falls as $1/\rho$. Integrating from $a$ to $b$ gives:
$$V=\dfrac{Q}{2\pi\varepsilon L}\ln\dfrac{b}{a}$$
hence $C=\dfrac{2\pi\varepsilon L}{\ln(b/a)}$. Per metre of cable the capacitance is:
$$\dfrac{C}{L}=\dfrac{2\pi\varepsilon}{\ln(b/a)}$$
The logarithm is the fingerprint of integrating $1/\rho$, and the ratio $b/a$ means the formula does not care whether radii or diameters are quoted. The field is maximum at the inner conductor, and that value is what sets the voltage rating:
$$E_{\max}=Q/(2\pi\varepsilon aL)=V/(a\ln(b/a))$$
Breakdown occurs first at the inner conductor.

**Spherical geometry.** A spherical capacitor with inner radius $a$ and outer radius $b$ has $D=Q/(4\pi r^2)$ from Gauss's law, so $E=Q/(4\pi\varepsilon r^2)$ and the voltage follows by integration:
$$V=\int_a^b\dfrac{Q}{4\pi\varepsilon r^2}\,dr=\dfrac{Q}{4\pi\varepsilon}\left(\dfrac{1}{a}-\dfrac{1}{b}\right)=\dfrac{Q(b-a)}{4\pi\varepsilon ab}$$
Therefore $C=\dfrac{4\pi\varepsilon ab}{b-a}$. Both structural features matter and they come from different places: the $4\pi$ is the sphere's area $4\pi r^2$ in Gauss's law, while the $(b-a)$ in the denominator comes from integrating $1/r^2$, not from a missing $\varepsilon$. Letting $b\to\infty$ leaves an isolated sphere with $C=4\pi\varepsilon a$ — the capacitance of the planet-sized 'other plate' is negligible. Letting $b-a=d\ll a$ recovers the parallel-plate limit:
$$C\approx4\pi\varepsilon a^2/d=\varepsilon A/d$$
with $A=4\pi a^2$, which is a useful sanity check on both formulas.

**Combinations, energy and forces.** Capacitors in parallel share the same voltage and their areas effectively add:
$$C_{\mathrm{eq}}=\sum_iC_i$$
Capacitors in series carry the same charge and their separations effectively add:
$$\dfrac{1}{C_{\mathrm{eq}}}=\sum_i\dfrac{1}{C_i}$$
with the two-capacitor shortcut $C_{\mathrm{eq}}=\dfrac{C_1C_2}{C_1+C_2}$. Two consequences make quick answers possible: a series equivalent is always *smaller* than the smallest member, and a parallel equivalent is always *larger* than the largest. The stored energy is:
$$W=\frac{1}{2}CV^2=\frac{1}{2}Q^2/C=\frac{1}{2}QV$$
which is identical to the volume integral of the field energy density $u=\frac{1}{2}\varepsilon E^2$. For a parallel-plate capacitor the two expressions are literally the same number:
$$\frac{1}{2}\varepsilon(V/d)^2(Ad)=\frac{1}{2}CV^2$$
which confirms that the two points of view agree. Differentiating the stored energy gives the attraction between plates, and it pulls them together regardless of the charge sign:
$$F=\frac{1}{2}\varepsilon AV^2/d^2=Q^2/(2\varepsilon A)$$

## Derivation

**Step 0 — the general recipe.** Let the conductors carry $+Q$ and $-Q$. Gauss's law gives $\mathbf{D}$ from the symmetry, $\mathbf{E}=\mathbf{D}/\varepsilon$, and the voltage is the line integral of $\mathbf{E}$ between the conductors:

$$V=\int_{-}^{+}\mathbf{E}\cdot d\mathbf{l}=\frac{Q}{\varepsilon}\int\frac{dl}{\mathrm{(area\ factor)}},\qquad C=\frac{Q}{V}=\varepsilon\cdot\frac{\mathrm{(area\ factor)}}{\mathrm{(length\ factor)}}$$

Every result below is this line with a different area and length factor. The charge $Q$ must cancel, and the permittivity must appear exactly once, to the first power.

**Parallel plate.** $\sigma=Q/A$ gives $\mathbf{E}=\dfrac{Q}{\varepsilon A}\mathbf{a}_n$ between the plates. Integrating across the gap:

$$V=\int_0^d E\,dz=\frac{Qd}{\varepsilon A}\qquad\Longrightarrow\qquad C=\frac{Q}{V}=\frac{\varepsilon A}{d}$$

With $n$ dielectric layers in the gap the field is $E_i=Q/(\varepsilon_iA)$ in each layer and $V=\sum_iE_id_i$, so $C=A\big/\sum_i(d_i/\varepsilon_i)$ — layers in a gap add like capacitors in series.

**Coaxial cable.** A cylindrical Gaussian surface of radius $\rho$ and length $L$ encloses the inner conductor's charge $Q$: $D(2\pi\rho L)=Q$, so $D=\dfrac{Q}{2\pi\rho L}$ and $E=\dfrac{Q}{2\pi\varepsilon\rho L}$. Integrating radially:

$$V=\int_a^b\frac{Q}{2\pi\varepsilon\rho L}\,d\rho=\frac{Q}{2\pi\varepsilon L}\ln\frac{b}{a}\qquad\Longrightarrow\qquad C=\frac{2\pi\varepsilon L}{\ln(b/a)}$$

The logarithm appears because $\int d\rho/\rho=\ln\rho$, and this is the only one of the three geometries whose field is non-uniform in the gap.

**Spherical capacitor.** With $D=Q/(4\pi r^2)$ and $E=Q/(4\pi\varepsilon r^2)$:

$$V=\int_a^b\frac{Q}{4\pi\varepsilon r^2}\,dr=\frac{Q}{4\pi\varepsilon}\left[\frac{-1}{r}\right]_a^b=\frac{Q}{4\pi\varepsilon}\cdot\frac{b-a}{ab}$$

$$\Longrightarrow\qquad C=\frac{4\pi\varepsilon ab}{b-a}$$

The $4\pi$ is inherited from the area, and the $(b-a)$ from the difference of $1/r$ terms. Both are needed; neither may be 'simplified away'.

**Two limits of the spherical result.** Isolated sphere: let $b\to\infty$ in $C=\dfrac{4\pi\varepsilon ab}{b-a}$. Dividing numerator and denominator by $b$ gives $C\to4\pi\varepsilon a$, the capacitance of a sphere with the other electrode at infinity. Thin gap: put $b=a+d$ with $d\ll a$. Then $ab\approx a^2$, $b-a=d$, and $C\approx\dfrac{4\pi\varepsilon a^2}{d}=\dfrac{\varepsilon A}{d}$ with $A=4\pi a^2$ — exactly the parallel-plate formula, which is the standard check that the spherical algebra is right.

**Series and parallel from the definitions.** *Parallel*: the same voltage $V$ appears across each capacitor, and the charges add, $Q=\sum_iQ_i=\sum_iC_iV$, so $C_{\mathrm{eq}}=\sum_iC_i$. *Series*: the same charge $Q$ passes through each, and the voltages add, $V=\sum_iV_i=Q\sum_i\dfrac{1}{C_i}$, so $\dfrac{1}{C_{\mathrm{eq}}}=\sum_i\dfrac{1}{C_i}$. The physical reading is that parallel adds plate area and series adds gap thickness.

**Energy, by charging and by the field.** Charge the capacitor from $0$ to $Q$ by moving increments $dq$ through the rising voltage $v=q/C$:

$$W=\int_0^Q\frac{q}{C}\,dq=\frac{Q^2}{2C}=\frac{1}{2}CV^2=\frac{1}{2}QV$$

The same number comes from the field: for a parallel-plate capacitor, $\displaystyle\int\frac{1}{2}\varepsilon E^2\,dv=\frac{1}{2}\varepsilon\left(\frac{V}{d}\right)^2(Ad)=\frac{1}{2}\cdot\frac{\varepsilon A}{d}\cdot V^2=\frac{1}{2}CV^2$. The field picture explains where the energy physically resides and gives the energy density $u=\frac{1}{2}\varepsilon E^2$ used in wave and breakdown problems.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Definition | $C=\frac{Q}{V}$ | Farads = coulombs per volt. Depends only on geometry and permittivity, never on Q or V. |
| Parallel plate | $C=\frac{\varepsilon A}{d}$ | d must be in metres and A in m². Valid when the separation is small compared with the plate dimensions (fringing neglected). |
| Layered dielectric in one gap | $C=\frac{A}{\sum_i d_i/\varepsilon_i}$ | Layers stack in series. For two layers this equals the series combination of eps1 A/d1 and eps2 A/d2. |
| Coaxial cable | $C=\frac{2\pi\varepsilon L}{\ln(b/a)}$ | a = inner radius, b = outer radius. Ratio b/a, so diameters give the same answer. |
| Coaxial, per unit length | $\frac{C}{L}=\frac{2\pi\varepsilon}{\ln(b/a)}$ | pF/m for cables. The field is strongest at rho = a. |
| Spherical capacitor | $C=\frac{4\pi\varepsilon ab}{b-a}$ | RADII, not diameters. a = inner, b = outer; reducing to eps A/d when b - a is small. |
| Isolated sphere | $C=4\pi\varepsilon a$ | The b -> infinity limit. Radius a; using the diameter quadruples the answer. |
| Two-wire line | $C=\frac{\pi\varepsilon L}{\ln(D/a)}$ | Approximate for centre spacing D much greater than wire radius a; note pi, not 2 pi. |
| Capacitors in series | $\frac{1}{C_{\mathrm{eq}}}=\sum_i\frac{1}{C_i}$ | Same charge, voltages add. Equivalent is smaller than the smallest member. |
| Capacitors in parallel | $C_{\mathrm{eq}}=\sum_iC_i$ | Same voltage, charges add. Equivalent is larger than the largest member. |
| Two capacitors in series | $C_{\mathrm{eq}}=\frac{C_1C_2}{C_1+C_2}$ | Shortcut for exactly two. Two equal capacitors give half of one, never the sum. |
| Dielectric scaling | $C=\varepsilon_rC_0$ | C0 is the vacuum capacitance. eps_r enters once; squaring it is a common error. |
| Stored energy | $W=\frac{1}{2}CV^2=\frac{1}{2}\frac{Q^2}{C}=\frac{1}{2}QV$ | Joules. Use the form matching the known pair: fixed V -> first, fixed Q -> second. |
| Energy density | $u=\frac{1}{2}\varepsilon E^2$ | J/m³. Integrate over the field volume to recover W. |
| Attractive force between plates | $F=\frac{1}{2}\frac{\varepsilon AV^2}{d^2}=\frac{Q^2}{2\varepsilon A}$ | Always attractive. F = QE would double it: Q sees only the other plate's field E/2. |

## Interactive Widget

**Capacitance Geometry Calculator**

![[Capacitance_Geometry_Calculator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An air-filled parallel-plate capacitor has plates of area $A=0.02$ m² separated by $d=0.1$ mm. Find its capacitance and the charge stored at $100$ V.

**Given:** A = 0.02 m2; d = 0.1 mm = 1e-4 m; V = 100 V; eps0 = 8.854e-12 F/m

**Solution:**

1. C = eps0 A/d = (8.854e-12)(0.02)/(1e-4)
2. Numerator: (8.854e-12)(0.02) = 1.7708e-13
3. C = 1.7708e-13/1e-4 = 1.7708e-9 F = 1.77 nF
4. Q = CV = (1.7708e-9)(100) = 1.7708e-7 C = 177 nC

> [!success]- Answer
> **$C=1.77$ nF; $Q=177$ nC.**

> [!warning] Trap
> Entering $d=0.1$ instead of $10^{-4}$ m. That makes $C$ $10^{3}$ times too large, and the error is invisible unless the answer is sanity-checked against the pF-to-nF range of real components.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `32` `×0.02÷1E-4=` → $C$ = **1.7708E-9** F = **1.77** nF.
> 2. `×100=` → $Q$ = **1.7708E-7** C = **177** nC.
> 3. The gap is `1E-4` m: keying `0.1` returns **1.77** uF, a factor of $10^{3}$ high.
>
> `CONVT` Distance, mm to m, inserts the `1E-4` without counting zeros.

### P2. The same $A=0.05$ m² plates are separated by $d=0.2$ mm and the gap is filled with polyethylene, $\varepsilon_r=2.25$. Find the capacitance.

**Given:** A = 0.05 m2; d = 0.2 mm; eps_r = 2.25; eps0 = 8.854e-12 F/m

**Solution:**

1. eps = eps_r eps0 = (2.25)(8.854e-12) = 1.9922e-11 F/m
2. eps A = (1.9922e-11)(0.05) = 9.9608e-13
3. C = (9.9608e-13)/(2e-4)
4. C = 4.980e-9 F = 4.98 nF

> [!success]- Answer
> **$C=4.98$ nF.**

> [!warning] Trap
> Using $\varepsilon_0$ alone. The dielectric raises the capacitance by $\varepsilon_r=2.25$; conversely, applying $\varepsilon_r$ twice would give 11.2 nF.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2.25×` `SHIFT` `CVALUE` `32` `×0.05÷0.2E-3=` → $C$ = **4.980E-9** F = **4.98** nF.
> 2. Air-only check: `÷2.25=` → **2.213E-9** F = **2.21** nF, smaller by exactly $\varepsilon_r$.
> 3. Applying $\varepsilon_r$ twice would return `4.98×2.25=` → **11.2** nF.

### P3. A coaxial cable has inner radius $a=1$ mm, outer radius $b=4$ mm, length $L=2$ m, and the gap is filled with $\varepsilon_r=2.5$. Find its capacitance.

**Given:** a = 1 mm; b = 4 mm; L = 2 m; eps_r = 2.5

**Solution:**

1. C = 2 pi eps L/ln(b/a) with eps = 2.5 eps0 = 2.2135e-11 F/m
2. 2 pi eps L = 2 pi (2.2135e-11)(2) = 2.7815e-10
3. ln(b/a) = ln 4 = 1.3863
4. C = 2.7815e-10/1.3863 = 2.0068e-10 F

> [!success]- Answer
> **$C=200.7$ pF (about 100 pF per metre of cable).**

> [!warning] Trap
> Using the parallel-plate formula with the gap $b-a=3$ mm as if the field were uniform. The coaxial field falls as $1/\rho$, so the correct geometry factor is $\ln(b/a)$, not a plain length.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2\pi×2.5×` `SHIFT` `CVALUE` `32` `×2÷\ln(4)=` → $C$ = **2.0065E-10** F = **200.7** pF.
> 2. Per metre: `÷2=` → **100.3** pF/m, the figure cable data sheets quote.
> 3. Only the ratio $b/a$ = **4.00** enters, so any consistent unit gives the same capacitance.
>
> The parallel-plate form with the 3 mm gap gives 59 pF — wrong geometry, the field falls as $1/\rho$.

### P4. A coaxial cable must have $100$ pF/m of capacitance with a polyethylene dielectric, $\varepsilon_r=2.3$, and an inner radius of $a=0.4$ mm. Find the required outer radius.

**Given:** C/L = 100 pF/m = 1e-10 F/m; eps_r = 2.3; a = 0.4 mm

**Solution:**

1. Rearrange C/L = 2 pi eps/ln(b/a): ln(b/a) = 2 pi eps0 eps_r/(C/L)
2. 2 pi eps0 eps_r = 2 pi (8.854e-12)(2.3) = 1.2796e-10
3. ln(b/a) = 1.2796e-10/1e-10 = 1.2796
4. b/a = e^1.2796 = 3.595
5. b = 3.595(0.4 mm) = 1.438 mm

> [!success]- Answer
> **$b=1.44$ mm.**

> [!warning] Trap
> Taking $\ln(b/a)$ to be $b/a$, which gives $b=0.51$ mm — smaller than a sensible outer conductor and *inside* the region where the field formula still has meaning. The logarithm must be undone by $e^x$, not left as a ratio.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.4×` `SHIFT` `ln` `(2\pi×2.3×` `SHIFT` `CVALUE` `32` `÷1E-10)=` → $b$ = **1.438** mm, with `SHIFT` `ln` being $e^x$.
> 2. The exponent is $\ln(b/a)$ = **1.2796**; `÷0.4=` → $b/a$ = **3.595** confirms it.
> 3. Reading 1.2796 as the ratio instead gives $b$ = **0.512** mm, inside the inner conductor.

### P5. A spherical capacitor has inner radius $a=2$ cm and outer radius $b=5$ cm with air between. Find its capacitance.

**Given:** a = 2 cm; b = 5 cm; air (eps_r = 1)

**Solution:**

1. C = 4 pi eps0 ab/(b-a)
2. 4 pi eps0 = 1.11265e-10 F/m
3. ab = (0.02)(0.05) = 1e-3 m^2; b - a = 0.03 m
4. C = (1.11265e-10)(1e-3)/0.03
5. C = 1.11265e-13/0.03 = 3.709e-12 F

> [!success]- Answer
> **$C=3.71$ pF.**

> [!warning] Trap
> Dropping the $4\pi$: the answer becomes 0.295 pF, off by a factor of $4\pi\approx12.6$. The $4\pi$ comes from the sphere's area in Gauss's law; it is not optional and it is not the same $4\pi$ that hides inside $k=1/(4\pi\varepsilon_0)$ unless you are also using $k$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4\pi×` `SHIFT` `CVALUE` `32` `×0.02×0.05÷0.03=` → $C$ = **3.709E-12** F = **3.71** pF.
> 2. The same line without the $4\pi$ gives **0.295** pF, the error being a factor of $4\pi$.
> 3. Sum check: `4\pi×` `SHIFT` `CVALUE` `32` `=` → **1.1127E-10** is the $4\pi\varepsilon_0$ of the formula.
>
> Radii, not diameters: keying 0.04 and 0.10 multiplies $C$ by 4.

### P6. Find the capacitance of an isolated conducting sphere of radius $10$ cm in air, and the charge it holds at $500$ V.

**Given:** a = 10 cm; V = 500 V; air

**Solution:**

1. C = 4 pi eps0 a = (1.11265e-10)(0.1)
2. C = 1.11265e-11 F = 11.13 pF
3. Q = CV = (1.11265e-11)(500)
4. Q = 5.563e-9 C = 5.56 nC

> [!success]- Answer
> **$C=11.1$ pF; $Q=5.56$ nC.**

> [!warning] Trap
> Using the surface area $4\pi a^2$ instead of the radius $a$. Capacitance is proportional to the *first* power of a length, so a dimensionally consistent check ($\varepsilon\times$ length) catches this immediately.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `4\pi×` `SHIFT` `CVALUE` `32` `×0.1=` → $C$ = **1.1126E-11** F = **11.13** pF.
> 2. `×500=` → $Q$ = **5.563E-9** C = **5.56** nC.
> 3. Dimensional check: the answer is $\varepsilon_0$ times a length, while `4\pi×` `SHIFT` `CVALUE` `32` `×0.1²=` → **1.11E-12** is the $4\pi a^2$ slip.

### P7. Capacitors $C_1=2\ \mu$F and $C_2=3\ \mu$F are in series, and the pair is connected in parallel with $C_3=4\ \mu$F. Find the equivalent capacitance, and the voltage across each of $C_1$ and $C_2$ when 12 V is applied across the series pair.

**Given:** C1 = 2 uF, C2 = 3 uF in series; C3 = 4 uF in parallel with the pair; V = 12 V across the series pair

**Solution:**

1. Series pair: C12 = C1C2/(C1+C2) = (2)(3)/(2+3) = 6/5 = 1.2 uF
2. Parallel with C3: Ceq = 1.2 + 4 = 5.2 uF
3. Charge on the series pair: Q = C12 V = (1.2e-6)(12) = 14.4 uC
4. Both series capacitors carry 14.4 uC, so V1 = Q/C1 = 14.4e-6/2e-6 = 7.2 V
5. V2 = Q/C2 = 14.4e-6/3e-6 = 4.8 V; check: 7.2 + 4.8 = 12 V

> [!success]- Answer
> **$C_{\mathrm{eq}}=5.2\ \mu$F; $V_1=7.2$ V and $V_2=4.8$ V — the smaller capacitor takes the larger voltage.**

> [!warning] Trap
> Adding the series capacitances to get 5 $\mu$F and then 9 $\mu$F overall. Series adds reciprocals, so 2 and 3 $\mu$F in series give 1.2 $\mu$F — smaller than either. A series equivalent bigger than its smallest member is impossible.

### P8. Capacitors of $1$, $2$ and $4\ \mu$F are connected in parallel across a $24$ V source. Find the total capacitance, the total charge and the stored energy.

**Given:** C1 = 1 uF, C2 = 2 uF, C3 = 4 uF in parallel; V = 24 V

**Solution:**

1. Ceq = 1 + 2 + 4 = 7 uF
2. Total charge: Q = Ceq V = (7e-6)(24) = 1.68e-4 C = 168 uC
3. Individual charges check: 24 + 48 + 96 = 168 uC
4. Energy: W = (1/2) C V^2 = 0.5(7e-6)(24^2) = 0.5(7e-6)(576)
5. W = 2.016e-3 J

> [!success]- Answer
> **$C_{\mathrm{eq}}=7\ \mu$F; $Q=168\ \mu$C; $W=2.02$ mJ.**

> [!warning] Trap
> Forgetting the $\frac{1}{2}$ in $W=\frac{1}{2}CV^2$, which doubles the energy. Also, $24^2=576$, not 48 — squaring before multiplying by $C$ matters.

### P9. A parallel-plate capacitor has $A=0.01$ m² and $d=1$ mm. The gap contains two layers: $0.5$ mm of $\varepsilon_{r1}=4$ and $0.5$ mm of $\varepsilon_{r2}=2$. Find the capacitance.

**Given:** A = 0.01 m2; d1 = d2 = 0.5 mm; eps_r1 = 4, eps_r2 = 2

**Solution:**

1. C = A/(d1/eps1 + d2/eps2), with eps1 = 4 eps0 = 3.5416e-11 and eps2 = 2 eps0 = 1.7708e-11
2. d1/eps1 = 5e-4/3.5416e-11 = 1.4118e7; d2/eps2 = 5e-4/1.7708e-11 = 2.8236e7
3. Sum = 4.2354e7
4. C = 0.01/4.2354e7 = 2.361e-10 F
5. Check as series capacitors: C1 = 7.083e-10 F, C2 = 3.542e-10 F, series gives 2.361e-10 F

> [!success]- Answer
> **$C=236$ pF.**

> [!warning] Trap
> Averaging the two permittivities and using $C=\varepsilon_{\mathrm{avg}}A/d$. Layers in a gap are in *series*: $1/C=1/C_1+1/C_2$. The equivalent is always smaller than either layer alone.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.01÷(0.5E-3÷(4×` `SHIFT` `CVALUE` `32` `)+0.5E-3÷(2×` `SHIFT` `CVALUE` `32` `))=` → $C$ = **2.361E-10** F = **236** pF.
> 2. Series check: `1÷(1÷7.083E-10+1÷3.542E-10)=` → **2.361E-10** F, identical.
> 3. The layer terms $d/\varepsilon$ are **1.4118E7** and **2.8236E7**; they add, so $C$ is below either layer alone.
>
> Averaging the two permittivities is the trap: layers in a gap are in series, never in parallel.

### P10. A parallel-plate capacitor with $A=0.05$ m² and $d=1$ mm is charged to $V=200$ V in air. Find its capacitance, stored energy and the force pulling the plates together.

**Given:** A = 0.05 m2; d = 1 mm; V = 200 V; air

**Solution:**

1. C = eps0 A/d = (8.854e-12)(0.05)/(1e-3) = 4.427e-10 F
2. W = (1/2)CV^2 = 0.5(4.427e-10)(4e4) = 8.854e-6 J
3. F = (1/2) eps0 A V^2/d^2
4. Numerator: 0.5(8.854e-12)(0.05)(4e4) = 8.854e-9
5. F = 8.854e-9/1e-6 = 8.854e-3 N
6. Check with Q: Q = CV = 8.854e-8 C, F = Q^2/(2 eps0 A) = (7.839e-15)/(8.854e-13) = 8.854e-3 N

> [!success]- Answer
> **$C=0.443$ nF; $W=8.85\ \mu$J; $F=8.85$ mN (attractive).**

> [!warning] Trap
> Using $F=QE_{\mathrm{gap}}$ with the full gap field $E=V/d$, which gives exactly twice the correct force. A plate does not feel its *own* field; it sits in the field of the opposite plate, $E/2=\sigma/(2\varepsilon_0)$. The bracket $\frac{1}{2}$ in $F=Q^2/(2\varepsilon_0A)$ is precisely that factor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `32` `×0.05÷1E-3=` → $C$ = **4.427E-10** F = **0.443** nF.
> 2. `×200²÷2=` → $W$ = **8.854E-6** J = **8.85** uJ.
> 3. `SHIFT` `CVALUE` `32` `×0.05×200²÷(2×1E-3²)=` → $F$ = **8.854E-3** N = **8.85** mN.
>
> The half in $F=\varepsilon_0AV^2/2d^2$ is the $E/2$ a plate actually feels; dropping it gives 17.7 mN.

## Traps & Exam Notes

- **Forgetting the $4\pi$ in the spherical-shell capacitance.** $C=4\pi\varepsilon ab/(b-a)$; the $4\pi$ comes from the sphere's area $4\pi r^2$ in Gauss's law, while $(b-a)$ comes from integrating $1/r^2$ — it is not a substitute for a missing $\varepsilon$. Dropping the $4\pi$ makes the answer $12.6$ times too small.
- **Using diameters in the spherical formula.** $C=4\pi\varepsilon ab/(b-a)$ is written in radii; substituting diameters multiplies the result by 4. The coaxial formula is immune because it uses the ratio $b/a$ — spherical is not.
- **Series and parallel swapped.** Series adds reciprocals (equivalent *smaller* than the smallest member); parallel adds directly (equivalent *larger* than the largest). Two $2\ \mu$F capacitors in series give $1\ \mu$F, never $4\ \mu$F.
- **Gap in millimetres with area in m².** $d=0.1$ mm must enter as $10^{-4}$ m. Leaving it as $0.1$ makes $C$ $10^{3}$ times too large — usually the difference between pF and nF.
- **Multiplying by $\varepsilon_r$ twice.** $\varepsilon=\varepsilon_r\varepsilon_0$ enters once, so $C=\varepsilon_rC_0$. A result that scales as $\varepsilon_r^2$ is wrong even if the units look fine.
- **Forgetting the factor $\frac{1}{2}$ in the stored energy, or applying it twice.** $W=\frac{1}{2}QV=\frac{1}{2}CV^2=\frac{1}{2}Q^2/C$ — one half, in every equivalent form. The field version is $u=\frac{1}{2}\varepsilon E^2$, also exactly one half.
- **Using $F=QE$ for the force between plates.** A plate sits in the field produced by the *other* plate, $E/2$, so the force is $Q^2/(2\varepsilon A)$. Using the full gap field $E=V/d$ doubles the computed force.
- **Ignoring fringing without checking the geometry.** $C=\varepsilon A/d$ assumes infinite plates. It is acceptable when $d$ is small compared with the plate width, but for a narrow strip or a large gap the true capacitance is measurably higher and the formula under-predicts.
- **Reading a series voltage divider as proportional to capacitance.** In series the *smaller* capacitor takes the *larger* voltage ($V_i=Q/C_i$), which is the opposite of the intuitive reading.

## See Also

- [[03_Definite_Integrals_and_FTC]]
- [[05_Gauss_Law_and_Applications]]
- [[06_Electric_Potential_and_Gradient]]
- [[08_Dielectrics_and_Boundary_Conditions]]
- [[10_Electrostatic_Energy_and_Forces]]
- [[15_Inductance_from_Geometry_and_Materials]]

---

[[08_Dielectrics_and_Boundary_Conditions|⬅ 08]] · [[_MOC_Electromagnetics|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Electrostatic_Energy_and_Forces|10 ➡]]
