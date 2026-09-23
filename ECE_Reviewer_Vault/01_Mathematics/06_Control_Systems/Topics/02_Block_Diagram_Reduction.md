---
id: MATH-06-02
title: "Block Diagram Reduction"
part: "01_Mathematics"
area: "06_Control_Systems"
topic: 2
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_System_Modeling_and_Transfer_Functions]]"]
tags: ["ece", "mathematics", "control_systems"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — Block Diagram Reduction

> [!abstract] Scope
> Reduce a multi-loop block diagram to a single input-output transfer function by applying the series, parallel, feedback and block-move rules.

## Core Concept

> [!tip] Intuition
> A block diagram is algebra drawn as a picture. Every rule is just a substitution — combine blocks that act in sequence, add blocks that share an input, and wrap a feedback loop with G/(1+GH). Move summing points and takeoff points only when you pay for the move with a compensating block.

**The three combination rules.** Blocks in **cascade** multiply: $G=G_1G_2$. Blocks in **parallel** (same input, outputs summed) add: $G=G_1+G_2$. A **feedback loop** with forward path $G$ and feedback path $H$ reduces to $T=\dfrac{G}{1+GH}$ for negative feedback and $T=\dfrac{G}{1-GH}$ for positive feedback. Almost every exam diagram is a nested repetition of these three.

**Where the feedback formula comes from, and why it fails when misapplied.** Write the summing junction: $E=R-HY$ and $Y=GE$. Substituting gives $Y=G(R-HY)$, so $Y(1+GH)=GR$. The '1' in $1+GH$ is the direct path; it is *not* $H$, and it is not unity gain unless $H$ is dimensionless. If the feedback signal is subtracted the sign is plus; if it is added (positive feedback) the sign flips and the loop can become unstable when $GH\to1$.

**Moving a summing point.** A summing point *ahead* of a block (after a block labelled $G$) can be moved *behind* it if you insert $1/G$ in each moved branch; moving a summing point from before a block to after it requires $G$ in each branch. The invariant is that the signal reaching the next node must be unchanged — that is the whole test for whether a move is legal.

**Moving a takeoff point.** A takeoff point before a block $G$ that is moved to after the block must be followed by a $1/G$ block on the takeoff branch; moved from after to before, it needs a $G$ block. Textbooks call this 'moving a branch point' — the compensating block always goes on the *takeoff* branch, never in the main path.

**Reduction strategy.** Work from the inside out. Collapse the innermost loop first, replace it with its equivalent block, then repeat. Always identify the loop you are closing *before* touching the diagram: a mistake in which blocks are inside the loop is far more expensive than an arithmetic slip. For genuinely tangled graphs with multiple forward paths, Mason's gain formula is usually faster and less error-prone than ten block moves.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Cascade (series) | $G(s) = G_1(s) G_2(s)$ | Same signal passes through both; no loading between blocks. |
| Parallel | $G(s) = G_1(s) + G_2(s)$ | Same input to both, outputs summed at a junction. |
| Negative feedback | $T(s) = \frac{G(s)}{1 + G(s)H(s)}$ | The '1' is the direct path, not H. Valid for any H, non-unity included. |
| Positive feedback | $T(s) = \frac{G(s)}{1 - G(s)H(s)}$ | Feedback added at the summing junction; unstable when GH approaches 1. |
| Unity feedback | $T(s) = \frac{G(s)}{1 + G(s)}$ | Special case H = 1; the CE is 1 + G(s) = 0. |
| Closed-loop error signal | $E(s) = \frac{R(s)}{1 + G(s)H(s)}$ | Error measured at the summing junction, for negative feedback. |
| Summing point moved behind a block | $(1/G)\ \mathrm{inserted\ in\ every\ moved\ branch}$ | Moving from behind to ahead instead multiplies by G. The node signal must not change. |
| Takeoff point moved ahead of a block | $(1/G)\ \mathrm{inserted\ on\ the\ takeoff\ branch}$ | The compensating block goes on the takeoff branch, never in the main path. |
| Two non-interacting loops in cascade | $T(s) = \frac{G_1}{1+G_1H_1}\cdot\frac{G_2}{1+G_2H_2}$ | Valid only when the loops share no summing junction; otherwise reduce inside-out. |
| From closed loop back to open loop | $G(s) = \frac{T(s)}{1 - T(s)},\quad H = 1$ | Inverting the feedback formula; useful when T is given and G is asked. |

## Worked Problems

### P1. A loop has forward path $G(s)=\dfrac{2}{s+3}$ and feedback path $H(s)=5$ (negative feedback). Find the closed-loop transfer function and its pole.

**Given:** G = 2/(s+3); H = 5; negative feedback

**Solution:**

1. $T = \dfrac{G}{1+GH}$
2. $GH = \dfrac{2}{s+3}\cdot 5 = \dfrac{10}{s+3}$
3. $1+GH = \dfrac{s+3+10}{s+3} = \dfrac{s+13}{s+3}$
4. $T = \dfrac{2}{s+3}\cdot\dfrac{s+3}{s+13} = \dfrac{2}{s+13}$
5. Closed-loop pole at $s=-13$

> [!success]- Answer
> **$T(s)=\dfrac{2}{s+13}$, closed-loop pole at $s=-13$.**

> [!warning] Trap
> Writing $T=\dfrac{2}{s+3+5}$ by treating the 1 as an H. The denominator is $1+GH$ — the '1' has no units and is not 5.

### P2. A nested system has an inner loop with $G_2=\dfrac{10}{s+1}$ and $H_1=1$, followed by $G_1=\dfrac{1}{s}$ and an outer unity feedback. Find $T(s)$ and the characteristic equation.

**Given:** G1 = 1/s; G2 = 10/(s+1); inner H = 1; outer H = 1

**Solution:**

1. Inner loop: $\dfrac{G_2}{1+G_2} = \dfrac{10/(s+1)}{1+10/(s+1)} = \dfrac{10}{s+11}$
2. Forward path of the outer loop: $\dfrac{1}{s}\cdot\dfrac{10}{s+11} = \dfrac{10}{s(s+11)}$
3. Outer unity feedback: $T = \dfrac{10/(s(s+11))}{1 + 10/(s(s+11))}$
4. $T = \dfrac{10}{s(s+11)+10} = \dfrac{10}{s^2+11s+10}$
5. Characteristic equation: $(s+1)(s+10)=0$, so closed-loop poles are at $-1$ and $-10$

> [!success]- Answer
> **$T(s)=\dfrac{10}{s^2+11s+10}$, CE $s^2+11s+10=0$ (poles $-1$, $-10$).**

> [!warning] Trap
> Reducing the two cascaded blocks with the outer H before collapsing the inner loop. Reduce inside-out; the inner feedback changes the block that the outer loop sees.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. Inside-out: the inner loop gives $10/(s+11)$, so the outer CE is $(s)(s+11)+10=s^2+11s+10$; `MODE` `5` page 2 `1` with `1`, `11`, `10` → $x$ = **-1**, **-10**.
> 2. `-1-10 : (-1)(-10)` → **-11** and **10**, the CE coefficients $s^2+11s+10$ rebuilt from the poles, with the numerator staying the forward gain **10**.

### P3. For the loop $G(s)=\dfrac{4}{s+2}$ with feedback $H(s)=\dfrac{1}{s+1}$ (negative feedback), find the closed-loop transfer function in factored form.

**Given:** G = 4/(s+2); H = 1/(s+1)

**Solution:**

1. $GH = \dfrac{4}{(s+2)(s+1)}$
2. $1+GH = \dfrac{(s+2)(s+1)+4}{(s+2)(s+1)} = \dfrac{s^2+3s+2+4}{(s+2)(s+1)} = \dfrac{s^2+3s+6}{(s+2)(s+1)}$
3. $T = \dfrac{4}{s+2}\cdot\dfrac{(s+2)(s+1)}{s^2+3s+6}$
4. $T = \dfrac{4(s+1)}{s^2+3s+6}$

> [!success]- Answer
> **$T(s)=\dfrac{4(s+1)}{s^2+3s+6}$.**

> [!warning] Trap
> Cancelling the $(s+2)$ but forgetting the $(s+1)$ from H. When H is not constant, H contributes a numerator factor to T.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. Clear the fractions in one line: `(2+1) : 2×1+4` → the denominator sum **3** → the constant term **6**, so the CE is $s^2+3s+6$ and $T(s)=\dfrac{4(s+1)}{s^2+3s+6}$.
> 2. `MODE` `5` page 2 `1` with `1`, `3`, `6` → $x=-1.5\pm j1.94$: the roots are complex, so the quadratic does not factor over the reals and this IS the factored form.

### P4. A unity-feedback loop is measured to have $T(s)=\dfrac{100}{s^2+10s+100}$. Find the open-loop $G(s)$ and state whether the closed loop is stable.

**Given:** T(s) = 100/(s^2+10s+100); unity feedback

**Solution:**

1. With $H=1$: $T = \dfrac{G}{1+G} \Rightarrow G = \dfrac{T}{1-T}$
2. $1-T = \dfrac{s^2+10s+100-100}{s^2+10s+100} = \dfrac{s^2+10s}{s^2+10s+100} = \dfrac{s(s+10)}{s^2+10s+100}$
3. $G = \dfrac{100}{s^2+10s+100}\cdot\dfrac{s^2+10s+100}{s(s+10)} = \dfrac{100}{s(s+10)}$
4. Closed-loop poles: $s = \dfrac{-10\pm\sqrt{100-400}}{2} = -5\pm j8.66$, both with negative real part

> [!success]- Answer
> **$G(s)=\dfrac{100}{s(s+10)}$; the closed loop is stable (poles $-5\pm j8.66$).**

> [!warning] Trap
> Reading the closed-loop denominator as the open-loop characteristic polynomial. $T$'s denominator is $1+GH$, not $GH$; recovering $G$ needs $T/(1-T)$.

> [!tip]- Calculator technique (Canon F-789SGA) — EQN
> 1. The CE is the denominator of $T$: `MODE` `5` page 2 `1` with `1`, `10`, `100` → $x=-5\pm j8.66$ — both real parts negative, so the closed loop is stable.
> 2. Recovery check at $s=1$: `100÷(1×11)` → **9.0909** and `(100÷111)÷(1−100÷111)` → **9.0909**, so $G=T/(1-T)=100/(s(s+10))$ is consistent.

### P5. A loop has $G(s)=\dfrac{2}{s+1}$ with **positive** feedback $H=0.5$. Find $T(s)$ and explain the result.

**Given:** G = 2/(s+1); H = 0.5; positive feedback

**Solution:**

1. Positive feedback: $T = \dfrac{G}{1-GH}$
2. $GH = \dfrac{2(0.5)}{s+1} = \dfrac{1}{s+1}$
3. $1-GH = \dfrac{s+1-1}{s+1} = \dfrac{s}{s+1}$
4. $T = \dfrac{2}{s+1}\cdot\dfrac{s+1}{s} = \dfrac{2}{s}$
5. The pole has moved to the origin: the closed loop is now a pure integrator (marginally stable)

> [!success]- Answer
> **$T(s)=\dfrac{2}{s}$ — positive feedback cancelled the pole at $-1$ and produced a pole at the origin.**

> [!warning] Trap
> Using $1+GH$ out of habit. Positive feedback subtracts: $1-GH$, and when $GH=1$ the loop is on the stability boundary.

## Traps & Exam Notes

- **Using $1+GH$ when the feedback is not drawn as subtraction.** A plus sign at the summing junction means $1-GH$. The two differ by a pole location, not just a sign.
- **Treating the '1' in $1+GH$ as $H$.** For $G=\frac{2}{s+3}$, $H=5$, the denominator is $s+13$, not $s+8$. The 1 is the direct path.
- **Adding cascaded blocks instead of multiplying.** Series multiplies, parallel adds.
- **Moving a takeoff point without its compensating block.** Moving a takeoff from before $G$ to after $G$ requires $1/G$ on the takeoff branch; dropping it changes the signal being fed back.
- **Reducing outside-in.** The outer loop sees the *reduced* inner block. Collapsing the outer loop first with the raw inner blocks gives a different (wrong) transfer function.
- **Forgetting that H can contribute numerator dynamics.** A non-constant $H$ produces zeros in $T$ that a constant-$H$ habit will miss.
- **Cancelling a pole-zero pair that is not common to the whole expression.** Cancel only after $T$ is a single fraction; cancelling across a summing junction is invalid.

## See Also

- [[01_System_Modeling_and_Transfer_Functions]]
- [[03_Mason’s_Gain_Formula]]
- [[06_Steady_State_Error_and_Error_Constants]]

---

[[01_System_Modeling_and_Transfer_Functions|⬅ 01]] · [[_MOC_Control_Systems|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Mason’s_Gain_Formula|03 ➡]]
