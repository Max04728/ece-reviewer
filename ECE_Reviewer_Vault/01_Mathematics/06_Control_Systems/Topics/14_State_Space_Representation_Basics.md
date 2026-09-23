---
id: MATH-06-14
title: "State Space Representation Basics"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 14
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_System_Modeling_and_Transfer_Functions]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — State Space Representation Basics

> [!abstract] Scope
> Write a system in $\dot{x}=Ax+Bu$, $y=Cx+Du$ form, recover its transfer function and poles, and test controllability and observability.

## Core Concept

> [!tip] Intuition
> State space trades one high-order differential equation for a set of first-order ones. The matrix $A$ holds all the internal dynamics, $B$ says where the input pushes, $C$ says what you can see, and $D$ is the direct feedthrough.

**The model.** For $n$ state variables the state equation is:
$$\dot{\mathbf{x}}=A\mathbf{x}+B\mathbf{u}$$
The output equation is $y=C\mathbf{x}+D\mathbf{u}$, with $A$ ($n\times n$), $B$ ($n\times p$), $C$ ($q\times n$) and $D$ ($q\times p$). The number of states equals the order of the system, and the state variables themselves are a modelling choice — they need not be physical quantities, only a minimal set that determines the future given the input.

**Transfer function from state space.** Laplace-transform with zero initial conditions: $sX=AX+BU$ gives $X=(sI-A)^{-1}BU$, so $G(s)=C(sI-A)^{-1}B+D$. The inverse is $\dfrac{\mathrm{adj}(sI-A)}{\det(sI-A)}$, so the denominator of every entry of $G(s)$ is $\det(sI-A)$ — the characteristic polynomial. Its roots are the eigenvalues of $A$ and the **open-loop poles** of the system. Numerator roots can cancel poles, which is exactly the signature of a mode that is uncontrollable or unobservable.

**Phase-variable (controllable canonical) form.** Write the transfer function as:
$$G(s)=\dfrac{b_{n-1}s^{n-1}+\dots+b_0}{s^n+a_{n-1}s^{n-1}+\dots+a_0}$$
The companion realisation is $A$ with a superdiagonal of ones and the last row $-a_0,-a_1,\dots,-a_{n-1}$; $B=[0,\dots,0,1]^T$;
$$C=[b_0,b_1,\dots,b_{n-1}]$$
$D=0$ for a strictly proper transfer function. Reading and writing this form is a reliable board item because it is purely mechanical.

**Controllability and observability.** The controllability matrix is:
$$\mathcal{C}=[B\ \ AB\ \ A^2B\ \dots\ A^{n-1}B]$$
The observability matrix is:
$$\mathcal{O}=[C^T\ \ (CA)^T\ \dots\ (CA^{n-1})^T]^T$$
The system is controllable iff $\mathrm{rank}\,\mathcal{C}=n$ and observable iff $\mathrm{rank}\,\mathcal{O}=n$. Rank deficiency is not an arithmetic curiosity: it means some internal mode cannot be driven (controllability) or cannot be seen (observability), so that mode never appears in $G(s)$ and no controller or observer can touch it.

**Why singular values of A alone are not enough.** If an uncontrollable mode happens to be unstable, the plant is open-loop unstable and no state feedback can stabilise it — the pole is 'uncontrollable'. Similarly an unobservable unstable mode makes the plant undetectable, and any observer-based controller will fail. Board problems ask you to pair the eigenvalue test with the rank test for exactly this reason.

**Equivalent realisations.** A change of state variables $\bar{\mathbf{x}}=P\mathbf{x}$ gives $\bar{A}=PAP^{-1}$, $\bar{B}=PB$, $\bar{C}=CP^{-1}$, $\bar{D}=D$. Eigenvalues, transfer function, controllability and observability are all invariant; the individual matrix entries are not. Two realisations with the same $G(s)$ are equivalent only if both are minimal (fully controllable and observable).

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| State equations | $\dot{x} = A x + B u,\quad y = C x + D u$ | n states, p inputs, q outputs. D = 0 for strictly proper systems. |
| Transfer function | $G(s) = C(sI - A)^{-1}B + D$ | From the state equations with zero initial conditions. |
| Matrix inverse identity | $(sI-A)^{-1} = \frac{\mathrm{adj}(sI-A)}{\det(sI-A)}$ | The denominator is the characteristic polynomial for every input-output pair. |
| Characteristic polynomial | $\det(sI - A) = s^n + a_{n-1}s^{n-1} + \dots + a_0$ | Its roots are the eigenvalues of A. Use det(sI-A), not det(A-sI). |
| Poles from eigenvalues | $\det(\lambda I - A) = 0$ | True poles of the transfer function are the eigenvalues that are both controllable and observable. |
| Phase-variable form | $A = \mathrm{companion},\ B = [0\ \dots\ 0\ 1]^{T},\ C = [b_0\ \dots\ b_{n-1}]$ | Last row of A is the negated denominator coefficients, lowest power first. |
| Controllability matrix | $\mathcal{C} = [B\ \ AB\ \ A^2B\ \dots\ A^{n-1}B]$ | Controllable iff rank = n; if not, some mode cannot be driven. |
| Observability matrix | $\mathcal{O} = [C,\ CA,\ CA^2,\ \dots,\ CA^{n-1}]^{T}$ | Observable iff rank = n; if not, some mode is invisible at the output. |
| Similarity transform | $\bar{A} = P A P^{-1},\ \bar{B} = P B,\ \bar{C} = C P^{-1}$ | Eigenvalues and the transfer function are invariant. |
| Pole-zero cancellation | $\mathrm{pole} = \mathrm{zero} \Rightarrow \mathrm{uncontrollable\ or\ unobservable\ mode}$ | The cancelled mode still exists inside A; it just does not appear in G(s). |

## Interactive Widget

**State Space Pole Map**

![[State_Space_Pole_Map.html|width: 100%; height: max-content]]

## Worked Problems

### P1. For $A=\begin{bmatrix}0&1\\-2&-3\end{bmatrix}$, $B=\begin{bmatrix}0\\1\end{bmatrix}$, $C=\begin{bmatrix}1&0\end{bmatrix}$, $D=0$, find the transfer function and the poles.

**Given:** A = [[0,1],[-2,-3]]; B = [0;1]; C = [1,0]; D = 0

**Solution:**

1. $sI-A = \begin{bmatrix}s&-1\\2&s+3\end{bmatrix}$
2. $\det(sI-A) = s(s+3)+2 = s^2+3s+2$
3. $(sI-A)^{-1} = \dfrac{1}{s^2+3s+2}\begin{bmatrix}s+3&1\\-2&s\end{bmatrix}$
4. $(sI-A)^{-1}B = \dfrac{1}{s^2+3s+2}\begin{bmatrix}1\\s\end{bmatrix}$
5. $C(sI-A)^{-1}B = \dfrac{1}{s^2+3s+2}$, plus $D = 0$
6. Poles: $s^2+3s+2 = (s+1)(s+2)$, so $s=-1$ and $s=-2$

> [!success]- Answer
> **$G(s)=\dfrac{1}{s^2+3s+2}=\dfrac{1}{(s+1)(s+2)}$; poles at $-1$ and $-2$, which are the eigenvalues of $A$.**

> [!warning] Trap
> Computing $\det(A-sI)$ instead of $\det(sI-A)$. For even order the two agree, but for odd order the sign flips and the characteristic polynomial comes out negated.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `1` with `1`, `3`, `2`, i.e. $\det(sI-A)=s^2+3s+2$ → $x=$ **-1**, **-2**: the eigenvalues of $A$, which are also the poles of $G$.
> 2. `MODE` `7`: `Apps` `Det` on the $s=0$ matrix [[0, -1],[2, 3]] → **2**, and the trace `0+3` → **3**: $s^2-(\mathrm{tr})s+\det$ rebuilds $s^2+3s+2$ with numerator **1**.

### P2. For $A=\begin{bmatrix}0&1&0\\0&0&1\\-6&-11&-6\end{bmatrix}$, $B=\begin{bmatrix}0\\0\\1\end{bmatrix}$, $C=\begin{bmatrix}1&0&0\end{bmatrix}$, $D=0$, find $G(s)$ and the poles.

**Given:** A = companion with last row [-6,-11,-6]; B = [0;0;1]; C = [1,0,0]

**Solution:**

1. In phase-variable form the characteristic polynomial is read from the last row: $s^3+6s^2+11s+6$
2. Since $C=[1,0,0]$ and $B=[0,0,1]^T$, the numerator is 1 (the $D=0$ strictly proper case)
3. $G(s) = \dfrac{1}{s^3+6s^2+11s+6}$
4. Factor: $(s+1)(s+2)(s+3)$, so the poles are $-1,-2,-3$, all in the left half plane
5. The system is stable

> [!success]- Answer
> **$G(s)=\dfrac{1}{s^3+6s^2+11s+6}$, poles at $-1,-2,-3$ — stable.**

> [!warning] Trap
> Reading the last row as $[+6,+11,+6]$ with positive signs. The companion last row is the *negated* denominator coefficients, so the polynomial is $s^3+6s^2+11s+6$ and the numerator stays 1.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. The last row $[-6,-11,-6]$ is the negated denominator, so `MODE` `5` page 2 `2` (cubic) with `1`, `6`, `11`, `6` → $x=$ **-1**, **-2**, **-3**, all negative, so the system is stable.
> 2. `MODE` `7`: `Apps` `Det` on the companion $A$ → **-6** $=(-1)(-2)(-3)$, the product of the eigenvalues, so the constant term of $\det(sI-A)$ is $+$**6** and the numerator stays **1**.

### P3. For $A=\begin{bmatrix}1&0\\0&2\end{bmatrix}$ and $B=\begin{bmatrix}1\\0\end{bmatrix}$, test controllability. Which mode is unreachable?

**Given:** A = diag(1,2); B = [1;0]

**Solution:**

1. $AB = \begin{bmatrix}1&0\\0&2\end{bmatrix}\begin{bmatrix}1\\0\end{bmatrix} = \begin{bmatrix}1\\0\end{bmatrix}$
2. $\mathcal{C} = [B\ \ AB] = \begin{bmatrix}1&1\\0&0\end{bmatrix}$
3. $\det\mathcal{C} = 0$, so the rank is $1 < n = 2$
4. The system is not controllable
5. The un-driven mode is the eigenvalue $\lambda = 2$, because $B$ has no component along the second state

> [!success]- Answer
> **Not controllable (rank 1 of 2); the mode $\lambda=2$ cannot be driven.**

> [!warning] Trap
> Concluding controllability because $B\neq0$. A nonzero input vector is not enough — it must have a component in every mode, which is what the rank test checks.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `AB` duplicates $B$, so the controllability matrix is $[B\ \ AB]$, the matrix [[1, 1],[0, 0]] — key it in `MODE` `7` as `MatA`.
> 2. `Apps` `Det` `MatA` → **0**, so the rank is **1** < $n=$ **2**: the system is not controllable and $\lambda=$ **2** cannot be driven.

### P4. For the same $A=\begin{bmatrix}1&0\\0&2\end{bmatrix}$ but with $C=\begin{bmatrix}1&0\end{bmatrix}$, test observability. Which mode is invisible?

**Given:** A = diag(1,2); C = [1,0]

**Solution:**

1. $CA = \begin{bmatrix}1&0\end{bmatrix}\begin{bmatrix}1&0\\0&2\end{bmatrix} = \begin{bmatrix}1&0\end{bmatrix}$
2. $\mathcal{O} = \begin{bmatrix}C\\CA\end{bmatrix} = \begin{bmatrix}1&0\\1&0\end{bmatrix}$
3. $\det\mathcal{O} = 0$, so the rank is $1 < n = 2$
4. The system is not observable
5. The invisible mode is $\lambda = 2$: the second state never reaches the output

> [!success]- Answer
> **Not observable (rank 1 of 2); the mode $\lambda=2$ is invisible at the output.**

> [!warning] Trap
> Testing $[B\ AB]$ for observability. Controllability uses $[B\ AB\ \dots]$; observability uses the stacked $[C;\ CA;\ \dots]$ — different dimensions and different matrices.

> [!tip]- Calculator technique (Canon F-789SGA) — MATX
> 1. `CA` duplicates $C$, so the observability matrix is [[1, 0],[1, 0]] — key it in `MODE` `7` as `MatA`.
> 2. `Apps` `Det` `MatA` → **0**, so the rank is **1** < **2**: the system is not observable and $\lambda=$ **2** never reaches the output.

### P5. Write the phase-variable state-space realisation of $G(s)=\dfrac{2s+1}{s^2+5s+6}$.

**Given:** G(s) = (2s+1)/(s^2+5s+6)

**Solution:**

1. Denominator coefficients (after the leading 1): $a_1 = 5$, $a_0 = 6$
2. Last row of $A$ is $[-a_0,\ -a_1] = [-6,\ -5]$
3. $A = \begin{bmatrix}0&1\\-6&-5\end{bmatrix}$, $B = \begin{bmatrix}0\\1\end{bmatrix}$
4. Numerator coefficients lowest power first: $b_0 = 1$, $b_1 = 2$, so $C = \begin{bmatrix}1&2\end{bmatrix}$
5. $D = 0$ because the transfer function is strictly proper ($\deg$ num $<\deg$ den)
6. Check: $\det(sI-A) = s^2+5s+6$, and $C(sI-A)^{-1}B = \dfrac{2s+1}{s^2+5s+6}$ ✓

> [!success]- Answer
> **$A=\begin{bmatrix}0&1\\-6&-5\end{bmatrix}$, $B=\begin{bmatrix}0\\1\end{bmatrix}$, $C=\begin{bmatrix}1&2\end{bmatrix}$, $D=0$.**

> [!warning] Trap
> Writing $C=[2,\ 1]$ in the same order as the numerator is normally read. The phase-variable $C$ lists coefficients from the *lowest* power upward: $b_0=1$ first, then $b_1=2$.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. `MODE` `5` page 2 `1` with `1`, `5`, `6` → $x=$ **-2**, **-3**, the denominator roots, so the last row of $A$ is $[-a_0,\ -a_1]=$ **[-6, -5]**.
> 2. `2×3 : 2+3` → **6** and **5**, the roots rebuilding $s^2+5s+6$; $C$ lists the numerator from the lowest power up, $b_0=$ **1**, $b_1=$ **2**, so $C=[1,\ 2]$ with $D=$ **0**.

## Traps & Exam Notes

- **Using $\det(A-sI)$ instead of $\det(sI-A)$.** Even order hides the error; odd order flips every sign in the characteristic polynomial.
- **Dropping $D$.** A non-zero $D$ makes $G(s)$ proper rather than strictly proper, and the step response jumps at $t=0^+$.
- **Assuming every eigenvalue of $A$ is a pole of $G(s)$.** A pole-zero cancellation means that mode is uncontrollable or unobservable — it exists inside $A$ but not in the input-output map.
- **Testing the wrong matrix.** Controllability: rank of $[B\ AB\ \dots]$ (an $n\times np$ matrix). Observability: rank of $[C;\ CA;\ \dots]$ (an $nq\times n$ matrix).
- **Concluding controllability from $B\neq0$.** Rank, not non-zeroness, is the test.
- **Mixing up the order of the numerator coefficients in phase-variable form.** $C=[b_0,b_1,\dots,b_{n-1}]$, lowest power first — the reverse of how the polynomial is written.
- **Believing a similarity transform changes the system.** $PAP^{-1}$, $PB$, $CP^{-1}$ preserve eigenvalues, transfer function and the rank tests. Only the state coordinates change.
- **Designing state feedback when an unstable mode is uncontrollable.** No gain can move an uncontrollable pole; check the rank test before designing.

## See Also

- [[01_System_Modeling_and_Transfer_Functions]]
- [[08_Routh-Hurwitz_Criterion]]
- [[11_CT_Fourier_and_Laplace_as_System_Tools]]

---

[[13_Lead-Lag_Compensator_Design|⬅ 13]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
