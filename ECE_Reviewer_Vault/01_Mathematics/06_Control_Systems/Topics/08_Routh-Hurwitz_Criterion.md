---
id: MATH-06-08
title: "Routh-Hurwitz Criterion"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_System_Modeling_and_Transfer_Functions]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Routh-Hurwitz Criterion

> [!abstract] Scope
> Determine how many closed-loop poles lie in the right half plane — and the gain range that keeps them all in the left half plane — using the Routh array without solving the characteristic equation.

## Core Concept

> [!tip] Intuition
> The Routh array is a long-division table. Its first column changes sign once for every root in the right half plane, so counting sign changes counts unstable poles without ever finding a root.

**The necessary condition first.** For a polynomial with real coefficients, every root has a negative real part only if all coefficients are present and of the same sign. A zero coefficient (other than the leading one) or a missing power is an instant 'not stable'. This test is fast but *not sufficient*: $s^3+s^2+2s+8$ has all coefficients positive yet is unstable.

**Building the array.** Write the coefficients in two rows — the even-indexed powers in the first row, the odd-indexed in the second — then generate each following row by cross-multiplication from the two rows above it: if the upper row is $a_1,a_2,a_3,\dots$ and the row below it is $b_1,b_2,b_3,\dots$, then the next row is $c_i=\dfrac{b_1a_{i+1}-a_1b_{i+1}}{b_1}$. Continue until the $s^0$ row. **Then count sign changes down the first column**: each sign change is one closed-loop pole in the right half plane. Poles exactly on the $j\omega$ axis produce no sign change, which is why marginal stability shows up as a zero entry rather than a sign change.

**Low-order shortcuts worth memorising.** For $s^2+a_1s+a_0$: stable iff $a_1>0$ and $a_0>0$. For $s^3+a_2s^2+a_1s+a_0$: stable iff all coefficients are positive **and** $a_2a_1>a_0$. For $s^4+a_3s^3+a_2s^2+a_1s+a_0$: additionally $a_1(a_3a_2-a_1)>a_3^2a_0$. These are the Routh conditions written out, and they are what board questions actually expect you to apply to a symbolic $K$.

**Special case 1 — a zero in the first column.** Replace the zero by a small positive $\varepsilon$, complete the array symbolically, and take $\varepsilon\to0^+$ when reading signs. You may also multiply the characteristic polynomial by $(s+1)$ (a positive factor that adds a left-half-plane root) to remove the zero; the sign-change count is unchanged.

**Special case 2 — an entire row of zeros.** This means the polynomial has roots symmetric about the origin: $\pm j\omega$, or $\pm\sigma$, or a quartet $\pm\sigma\pm j\omega$. Form the **auxiliary polynomial** from the row *above* the zero row, differentiate it to get the replacement row, and continue. The auxiliary polynomial's roots are the symmetric roots, so its degree tells you how many poles are on the $j\omega$ axis or mirrored — the system is not asymptotically stable even if the first column shows no sign change.

**Gain-range problems.** Put $K$ in the characteristic equation and let each first-column entry become a function of $K$. Every entry must be positive (or every entry negative — same polynomial scaled), so each gives an inequality. The intersection of the inequalities is the stable range; the boundary values are the gains at which poles cross the $j\omega$ axis and sustained oscillation begins. The frequency of that oscillation comes from the auxiliary polynomial at the boundary gain.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Routh sign rule | $\mathrm{RHP\ roots} = \mathrm{sign\ changes\ in\ the\ first\ column}$ | Each change of sign is one pole with a positive real part. |
| Necessary condition | $a_i > 0 \ \mathrm{for\ all}\ i$ | Necessary, not sufficient. A missing or zero coefficient means unstable. |
| Second-order condition | $s^2+a_1s+a_0 \ \mathrm{stable} \iff a_1>0,\ a_0>0$ | No cross-term condition at second order. |
| Third-order condition | $s^3+a_2s^2+a_1s+a_0 \ \mathrm{stable} \iff a_2a_1 > a_0$ | In addition to all coefficients being positive. Gives an upper bound on K. |
| Fourth-order condition | $a_3a_2 > a_1 \ \mathrm{and}\ a_1(a_3a_2-a_1) > a_3^2a_0$ | With all coefficients positive. Two inequalities, so a bounded K interval. |
| Characteristic equation of a loop | $1 + K G(s)H(s) = 0$ | Clear the fractions before building the array; K appears in the constant and middle terms. |
| Zero in the first column | $\mathrm{replace}\ 0 \ \mathrm{with}\ \varepsilon \to 0^+$ | Or multiply the CE by (s+1); the sign-change count is unchanged. |
| Auxiliary polynomial | $A(s) = \mathrm{row\ above\ the\ zero\ row},\ \mathrm{use}\ A'(s)$ | Only even powers. Its roots are the symmetric roots of the CE. |
| Row of zeros, differentiated row | $\frac{dA}{ds}\ \mathrm{replaces\ the\ zero\ row}$ | If A(s) = 2s^2+2 then A'(s) = 4s, so the zero row becomes [4, 0]. |
| Frequency at the stability boundary | $A(j\omega) = 0$ | The auxiliary polynomial at the critical gain gives the oscillation frequency. |

## Worked Problems

### P1. Determine the stability of the system whose characteristic equation is $s^3+6s^2+11s+6=0$.

**Given:** CE = s^3 + 6s^2 + 11s + 6

**Solution:**

1. All coefficients are present and positive — the necessary test passes
2. Row $s^3$: 1, 11. Row $s^2$: 6, 6
3. Row $s^1$: $\dfrac{6(11)-1(6)}{6} = \dfrac{66-6}{6} = 10$
4. Row $s^0$: 6
5. First column: 1, 6, 10, 6 — no sign change
6. Cross-check by factoring: $(s+1)(s+2)(s+3)$, all roots in the left half plane

> [!success]- Answer
> **Stable; all three first-column entries are positive and the roots are $-1,-2,-3$.**

> [!warning] Trap
> Stopping after the necessary condition. $s^3+s^2+2s+8$ also has all coefficients positive, yet its $s^1$ entry is $(1\cdot2-8)/1=-6$ and it has two right-half-plane roots.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `2` (cubic) with `1`, `6`, `11`, `6` → $x$ = **-1**, **-2**, **-3** — all real and negative, so the system is stable.
> 2. `(6×11−1×6)÷6` → the Routh $s^1$ entry **10**, giving the first column **1, 6, 10, 6** — no sign change, in agreement.

### P2. A unity-feedback loop has $G(s)=\dfrac{K}{s(s+1)(s+4)}$. Find the range of $K$ for closed-loop stability.

**Given:** G = K/(s(s+1)(s+4)); unity feedback

**Solution:**

1. CE: $s(s+1)(s+4)+K = s^3+5s^2+4s+K = 0$
2. Third-order condition with $a_2=5$, $a_1=4$, $a_0=K$: need $a_2a_1>a_0$
3. $5(4) > K \Rightarrow K < 20$
4. Also the necessary condition requires $K>0$
5. So $0<K<20$; at $K=20$ the $s^1$ entry vanishes and the system oscillates

> [!success]- Answer
> **$0 < K < 20$.**

> [!warning] Trap
> Reporting only $K>0$ after checking that all coefficients are positive. The cross-term inequality $a_2a_1>a_0$ is the one that binds, and it is the reason a third-order loop has a finite gain limit.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `5×4` → the third-order condition $a_2a_1>a_0$ gives $K<$ **20**, while the all-positive-coefficient test gives $K>$ **0**, so $0<K<20$.
> 2. `√(20÷5)` → at $K=20$ the auxiliary polynomial $5s^2+20=0$ puts the poles at $\omega=$ **2** rad/s — the sustained-oscillation frequency.

### P3. Find the range of $K$ for stability of $s^4+2s^3+3s^2+Ks+K=0$.

**Given:** CE = s^4 + 2s^3 + 3s^2 + K s + K

**Solution:**

1. Necessary: $K>0$ (also need $3>0$, which holds)
2. Row $s^4$: 1, 3, K. Row $s^3$: 2, K, 0
3. Row $s^2$: $b_1 = \dfrac{2(3)-1(K)}{2} = \dfrac{6-K}{2}$; $b_2 = \dfrac{2K}{2} = K$
4. Row $s^1$: $c_1 = \dfrac{b_1 K - 2b_2}{b_1} = \dfrac{K(2-K)}{6-K}$
5. Row $s^0$: $b_2 = K$
6. Conditions: $K>0$; $6-K>0 \Rightarrow K<6$; $\dfrac{K(2-K)}{6-K}>0 \Rightarrow K<2$
7. The binding constraint is $K<2$: $\ 0<K<2$

> [!success]- Answer
> **$0 < K < 2$.**

> [!warning] Trap
> Keeping the $K<6$ condition and discarding $K<2$ because $6-K$ 'looks like' the denominator. Every first-column entry must be positive; the strictest inequality wins.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1.5×(2−1.5)÷(6−1.5)` → the $s^1$ entry $c_1=K(2-K)/(6-K)=$ **0.1667** at $K=1.5$, with $b_1=(6-1.5)/2=$ **2.25** positive, so the loop is stable there.
> 2. `2.5×(2−2.5)÷(6−2.5)` → $c_1=$ **-0.3571**: negative at $K=2.5$, so the boundary is the root $K=2$ of $K(2-K)=0$ and the range is $0<K<2$.

### P4. Determine the stability of $s^4+s^3+2s^2+2s+1=0$.

**Given:** CE = s^4 + s^3 + 2s^2 + 2s + 1

**Solution:**

1. Row $s^4$: 1, 2, 1. Row $s^3$: 1, 2, 0
2. Row $s^2$: $b_1 = \dfrac{1(2)-1(2)}{1} = 0$ — a zero in the first column but the row is not all zero, so use $\varepsilon$
3. Row $s^2$ becomes: $\varepsilon$, 1
4. Row $s^1$: $c_1 = \dfrac{\varepsilon(2)-1(1)}{\varepsilon} = \dfrac{2\varepsilon-1}{\varepsilon}$, which is negative for $0<\varepsilon<0.5$
5. Row $s^0$: 1
6. First column: $1,\ 1,\ \varepsilon,\ \dfrac{2\varepsilon-1}{\varepsilon},\ 1$ — two sign changes
7. Therefore two roots lie in the right half plane: the system is unstable

> [!success]- Answer
> **Unstable, with 2 right-half-plane roots (2 sign changes).**

> [!warning] Trap
> Treating the zero as the end of the array and declaring 'no sign change, so stable'. A zero in the first column is a signal to substitute $\varepsilon$, not to stop — and it usually produces a sign change.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `3` (quartic) with `1`, `1`, `2`, `2`, `1` → $x=$ **0.1217±j1.307** and **-0.6217±j0.441**.
> 2. Two roots carry a positive real part, so the system is unstable with **2** right-half-plane poles — the same count as the two sign changes the $\varepsilon$ array produces.

### P5. Determine the stability of $s^3+2s^2+s+2=0$ and, if the system is marginally stable, give the oscillation frequency.

**Given:** CE = s^3 + 2s^2 + s + 2

**Solution:**

1. Row $s^3$: 1, 1. Row $s^2$: 2, 2
2. Row $s^1$: $\dfrac{2(1)-1(2)}{2} = 0$; with the next entry also 0, the whole row is zero
3. Auxiliary polynomial from the $s^2$ row: $A(s) = 2s^2+2$
4. Differentiate: $A'(s) = 4s$, so the $s^1$ row becomes 4, 0
5. Row $s^0$: $\dfrac{4(2)-2(0)}{4} = 2$
6. First column: 1, 2, 4, 2 — no sign change, so no right-half-plane roots
7. But $A(s)=2s^2+2=0$ gives $s=\pm j$, so two poles sit on the imaginary axis
8. Factorisation: $s^3+2s^2+s+2 = (s+2)(s^2+1)$ confirms roots $-2$ and $\pm j1$

> [!success]- Answer
> **Marginally stable — no right-half-plane poles, but a pole pair at $s=\pm j1$, so sustained oscillation at $\omega = 1\ \mathrm{rad/s}$.**

> [!warning] Trap
> Declaring 'stable' because the first column has no sign change. An all-zero row means roots on the $j\omega$ axis; BIBO stability fails for a sinusoid at exactly that frequency.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `2` (cubic) with `1`, `2`, `1`, `2` → $x$ = **-2**, **±j1**: no root has a positive real part, so there are no right-half-plane poles.
> 2. The imaginary pair sits at $\omega=$ **1** rad/s, so the system is marginally stable and oscillates at 1 rad/s — reading the roots replaces the all-zero row and $A(s)=2s^2+2$.

## Traps & Exam Notes

- **Treating the necessary condition as sufficient.** All-positive coefficients do not imply stability; $s^3+s^2+2s+8$ passes the coefficient test and fails the array.
- **Ignoring a zero coefficient (a missing power).** A missing $s^1$ or $s^2$ term means a right-half-plane or $j\omega$-axis root pair; the array then breaks down.
- **Stopping at a zero in the first column.** Substitute $\varepsilon\to0^+$, or multiply the CE by $(s+1)$, and finish the array.
- **Confusing a zero entry with an all-zero row.** A zero in the first column uses the $\varepsilon$ trick; an entire row of zeros needs the auxiliary polynomial and its derivative.
- **Assuming no sign change means stable.** The $j\omega$ axis case has no sign change yet is only marginally stable — and marginally stable systems are unstable for a resonant input.
- **Multiplying the CE by a negative factor to clear a zero.** Multiplying by $(s+1)$ is safe; a negative multiplier reverses the whole first column and inverts the conclusion.
- **Applying the third-order shortcut to a fourth-order polynomial.** $a_2a_1>a_0$ is a third-order result only; fourth order needs the extra $a_1(a_3a_2-a_1)>a_3^2a_0$ condition.
- **Forgetting that the array is built from the characteristic equation, not from $G(s)H(s)$.** Clear all fractions first ($1+KG H=0$ multiplied through by the denominator).

## See Also

- [[09_Root_Locus_Techniques]]
- [[07_System_Types_and_Error_Analysis]]
- [[11_Nyquist_Stability_Criterion]]

---

[[07_System_Types_and_Error_Analysis|⬅ 07]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Root_Locus_Techniques|09 ➡]]
