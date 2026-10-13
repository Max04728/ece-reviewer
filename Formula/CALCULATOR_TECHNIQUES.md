---
title: Calculator Techniques
part: Meta
tags: [ece, formula-sheet, calculator, techniques]
scope: Applies to every vault in this folder (e.g. Mathematics/, GEAS/)
version: 1.0
---

# Calculator Techniques — Canon F-789SGA

Companion to the formula sheets. Every subject note carries short `> [!example] Calculator` blocks for the
topics that fall to the calculator; this file is the single source for the full method behind them, so the
blocks stay two or three lines and this file carries the detail.

> [!warning] This file lives **outside** each vault root
> When `Mathematics/` is opened as an Obsidian vault, nothing here is linkable from the notes. The inline
> `> [!example]` blocks are self-contained for that reason — this file is for study, not for linking.

Key names, modes and menus are taken from `_meta/CALCULATOR_TECHNIQUES.md` in the main vault (the authoring
contract, cross-checked against the F-789SGA function reference). Where a technique is written for a Casio
fx-991ES/EX — most online "calculator technique" tutorials are — the difference is called out explicitly.

## 1. Key facts you will actually use

| Purpose | Keys |
| --- | --- |
| Modes | `MODE` → Apps menu of **named** apps: COMP · CPLX · STAT · BASE · EQN · TABLE · MATX · VCTR |
| STAT type | enter **STAT** mode, then `Type` to pick the model (§2) |
| FREQ column on/off | Set-up menu → `[4] STAT` → `1` ON / `2` OFF |
| Store / recall | `SHIFT` `STO` then variable · `RCL` then variable (no shift) |
| Variables | `0–9`, `A`, `B`, `C`, `D`, `E`, `F`, `M`, `X`, `Y` (19 total) |
| Equals *inside* an equation | `ALPHA` `=` |
| Chain statements on one line | `ALPHA` `:` — each `=` evaluates the next |
| Solve for `X` | type the equation, `SHIFT` `SOLVE`, give a guess, `=`; **`L−R` = "precision of solution"** |
| Re-evaluate with prompts | `CALC` (prompts for `A`, `B`, `C`, `D`, `X`, `Y`) |
| Summation / product | `Σ(f(x), a, b)` / `Π(f(x), a, b)` — **three** arguments |
| Numerical derivative | `d/dx(f(x), a, Δx)` |
| Numerical integral | `∫(f(x), a, b, n)` — `n` optional |
| Polar ↔ rectangular | `Pol(` / `Rec(` — **`Pol(` stores $r\to$`X`, $\theta\to$`Y`; `Rec(` stores $x\to$`X`, $y\to$`Y`** |
| Simultaneous / polynomial | `MODE` → `EQN`: `1` 2-unknown, `2` 3-unknown, `3` 4-unknown, `4` quadratic, `5` cubic, `6` quartic |
| Statistics | `MODE` → STAT, then the Statistical Menu: `Type`, `Data`, `Edit`, `S-SUM`, `S-VAR`, `S-PTS`, `Distr`, `Reg` |
| Matrix | `MODE` → `MATX`, then `Det`, `Trn`, `Ide`, `Adj`, `Inv` |
| Fraction ↔ decimal · engineering notation | `F-D` · `ENG` |
| Built-in constants | `SHIFT` `CVALUE` + two-digit code ($\varepsilon_0$ = 32, $c_0$ = 28, $g$ = 35, $e$ = 23, $N_A$ = 24, $k$ = 25, $R$ = 27, $\mu_0$ = 33, $Z_0$ = 37) |

**The two habits that save the most time**

1. **Store the givens once.** Put every known into `A`, `B`, `C`, `D`, … then write the formula with letters.
   `CALC` re-runs it for new numbers without retyping; the built-in variable menu is faster than re-entering values.
2. **Never rearrange a formula by hand — hand it to `SOLVE`.** If the unknown is buried ($n$ in an exponent, $i$ in
   a denominator, $x$ inside a transcendental), type the equation exactly as printed and `SHIFT` `SOLVE`.
   **Check `L−R` is ~0** — Canon labels this line "precision of solution"; a large value means SOLVE found the
   wrong root or did not converge.

> [!warning] The F-789SGA is **not** a Casio clone — most online caltech guides will mislead you
> Every "calculator technique" handout circulating for the board exams is written for the Casio fx-991ES/EX, and
> **the mode model is different**. Casio uses `MODE` + a fixed number at a fixed position; the F-789SGA uses
> `MODE` → an Apps menu of *named* apps. So "`MODE` `6` = MATRIX" / "`MODE` `7` = VECTOR" / "`MODE` `8` = TABLE"
> (Casio ES numbering) **land you in the wrong app on this calculator**. Take the *method* from Casio guides;
> take the *keystrokes* from this file.
>
> The sharpest trap: Casio's `MODE` `3` → `5` is the $e^{x}$ model, but here `5` is **e EXP** ($Ae^{Bx}$) and
> $AB^{x}$ is **6**. Following a Casio guide gives you the **wrong model family** — and because both fit monotone
> growth, the answer still looks plausible. Also note STAT/EQN/MATX/VCTR force **Line mode**, so Casio tutorials
> that rely on the Natural/Textbook display do not apply.

---

## 2. Regression mode — the workhorse

`MODE` → `STAT`, then `Type` to choose the model. **The order is not Casio's** — learn these eight numbers:

| # | Model | Fitted form |
| --- | --- | --- |
| 1 | `SD` | one-variable statistics |
| 2 | `Lin` ★ | $y=A+Bx$ |
| 3 | `Quad` | $y=A+Bx+Cx^{2}$ |
| 4 | `Log` | $y=A+B\ln x$ |
| 5 | `e EXP` | $y=Ae^{Bx}$ |
| 6 | `ab EXP` ★ | $y=AB^{x}$ |
| 7 | `Pwr` | $y=Ax^{B}$ |
| 8 | `Inv` | $y=A+B/x$ |

| Sub-menu | Gives |
| --- | --- |
| `S-PTS` | enter / edit the paired $(x,y)$ data |
| `S-SUM` | $\sum x$, $\sum x^2$, $\sum y$, $\sum y^2$, $\sum xy$, $\sum x^3$, … |
| `S-VAR` | $\bar x$, $s_x$, $\sigma_x$, $\bar y$, $s_y$, $\sigma_y$, $n$ |
| `Reg` | `A` (intercept), `B` (slope), `C` (quadratic only), `r` — plus `x̂` / `ŷ` prediction |

### 2.1 Substitute into the statistics formulas

The whole point: **`S-SUM` and `S-VAR` hand you the raw sums**, so a formula full of $\sum x$, $\sum x^2$,
$\sum xy$ and $n$ never has to be tabulated by hand. Enter the data once, then evaluate the printed formula
with `RCL` on the statistics variables.

- Sample variance shortcut $s^2=\dfrac{n\sum x^2-(\sum x)^2}{n(n-1)}$ — read $\sum x$, $\sum x^2$, $n$ straight from `S-SUM`.
- Pearson $r$ — `Reg` gives it directly; there is no reason to ever build the $\sum xy$ table by hand.
- Weighted and grouped means, MAD, and the computational SD form all fall the same way.

### 2.2 Use the model that matches, or linearise

For a clean power or exponential law, pick `Pwr` / `ab EXP` / `e EXP` directly and read `A` and `B`. When the
shape is not one of the eight, **linearise and use `Lin`** — the linear model works on the transformed variable:

| Wanted model | Enter as | Recover from `A`, `B` |
| --- | --- | --- |
| $y=ax+b$ | $(x,\ y)$ | $a=B$, $b=A$ |
| $y=ax^{b}$ | $(\ln x,\ \ln y)$ | $a=e^{A}$, $b=B$ |
| $y=ab^{x}$ | $(x,\ \ln y)$ | $a=e^{A}$, $b=e^{B}$ |
| $y=ae^{bx}$ | $(x,\ \ln y)$ | $a=e^{A}$, $b=B$ |
| $y=a+b\ln x$ | $(\ln x,\ y)$ | $b=B$, $a=A$ |
| $y=\dfrac{1}{a+bx}$ | $(x,\ 1/y)$ | $a=A$, $b=B$ |

**Verified numerically:** data $(1,3),(2,12),(3,27)$ entered as $(\ln x,\ln y)$ under `Lin` returns $B=2$ and
$e^{A}=3$, recovering $y=3x^{2}$ exactly. Data $(1,2),(2,4),(3,8)$ entered as $(x,\ln y)$ returns $e^{B}=2$,
$e^{A}=1$, recovering $y=2^{x}$.

### 2.3 The regression trick for simultaneous equations

The classic trick enters the coefficients as data pairs and lets `Reg` solve the system — it is Cramer's rule
with the arithmetic done for you. It is genuinely useful for a **2-unknown** system, but for **3 unknowns use
`EQN` mode**, which solves 2/3/4 unknowns exactly and is both faster and safer.

**Verified numerically:** the system $2x+3y=13$, $4x-y=5$ gives $x=2$, $y=3$ with both residuals exactly 0;
the $3\times3$ system $x+y+z=6$, $2x-y+z=3$, $x+2y-z=2$ gives $x=1,y=2,z=3$ via `EQN`.

> [!tip] High-yield ★
> **Never hand-tabulate $\sum x$, $\sum xy$, $\sum x^2$ again.** `MODE` → STAT → enter data → Statistical Menu →
> `S-SUM` / `S-VAR` / `Reg`. Every statistics formula on the sheet becomes a one-line evaluation.

---

## 3. Summation and product

Syntax is **`Σ(f(x), a, b)`** and **`Π(f(x), a, b)`** — the expression first, then start and end. There is
**no separate variable argument**; the running variable is always `X`. This removes the need to memorize
closed-form series sums.

> [!warning] What `Σ` cannot do
> `Σ` sums an **expression in `X`**, not an indexed array. There are no user-defined functions and no cash-flow or
> signal arrays, so `Σ(CF_X/(1+A)^X, …)`, `Σ(P_iX_i)`, `Σ(n_i(ȳ_i-ȳ)^2)` and `Σ(x(X)h(n-X), …)` are **not
> keystrokes** — they are mathematics, not calculator input. Either write the terms out
> (`300/(1+A) + 400/(1+A)^2 + …`) or state that the values must be typed in. `Σ` also cannot alternate weights on
> odd/even indices, which rules it out for Simpson's rule's `4,2,4,2…` pattern.

- **Annuity factors are geometric sums.** $\sum_{k=1}^{n}(1+i)^{-k}$ *is* $\dfrac{1-(1+i)^{-n}}{i}$ — verified to
  12 significant figures. So $P/A$, $F/A$, $A/P$, $A/F$, $P/G$ and the geometric-gradient factor can all be
  produced by a single `Σ` instead of memorized.
- **Arithmetic gradient:** $P=G\sum_{k=1}^{n}\dfrac{k-1}{(1+i)^{k}}$ — verified: $G=500$, $i=8\%$, $n=10$ gives
  $12\,988.4157$, identical to the closed form.
- **Power sums** for SYD and regression: $\sum k=\frac{n(n+1)}2$, $\sum k^2=\frac{n(n+1)(2n+1)}6$ — verified
  $\sum_{k=1}^{10}k^2=385$.
- **Convergence checks:** $\sum 1/k^2\to\pi^2/6$; a `Σ` with a large upper limit confirms a series test.
- **Riemann sums** approximate a definite integral before you commit to finding the antiderivative.

**Verified numerically:** $\sum_{k=1}^{100}k=5050$; $\sum_{k=0}^{20}3\cdot2^{k}=6\,291\,453$; the midpoint
Riemann sum of $x^2$ on $[0,3]$ equals $9$ at $N=10^{5}$.

---

## 4. `SOLVE`, `EQN` and `TABLE`

- **`SHIFT` `SOLVE`** — for any implicit equation. Type it exactly as printed, supply a guess near the expected
  answer, then read `L−R`. Uses: IRR, the implied interest rate in an annuity, unknown $n$, break-even volumes,
  transcendental roots, and any "find $x$ such that …" item. **COMP mode only**, and it solves for `X`, so the
  unknown must be isolated on the left. Canon's own cautions: it is Newton's method, so it can fail on
  $y=e^{x}$, $y=1/x$, $y=\sin x$ and $y=\sqrt{x}$ — relevant because an IRR equation is exponential in $i$.
  `Σ`, `∫`, `d/dx`, `Pol`, `Rec` and multi-statements **cannot** appear inside a `SOLVE` equation.
- **`MODE` → `EQN`** — `1`/`2`/`3` for simultaneous equations in 2/3/4 unknowns, `4`/`5`/`6` for
  quadratic/cubic/quartic roots. This replaces Cramer's rule, Gauss–Jordan and the quadratic formula outright.
  Complex roots surface with the `i` indicator.
- **`MODE` → TABLE** — builds a single-column `f(x)` table across a step. Use it to bracket a root before
  `SOLVE`, to read an annuity factor year by year, and to build a depreciation schedule. Two cautions: it
  **caps at 30 x-values**, and its function may not contain `d/dx`, `∫`, `Σ`, `Pol` or `Rec`.

**Verified numerically:** $x^{3}-2x-5=0$ → $x=2.0945514815$ (residual $<10^{-15}$); the IRR of
$(-1000,300,400,500)$ → $8.8963\%$ with $PW\approx0$; the rate satisfying $P=50\,000$, $A=8000$, $n=10$ →
$9.6059\%$.

> [!warning] Exam trap
> `SOLVE` returns **one** root — the one nearest your guess. If a problem can have several (multiple IRRs when
> cash-flow signs alternate, a cubic with three real roots), re-run it with a different guess and check `L−R`
> each time. Reporting the first root you see is the classic `SOLVE` mistake.

---

## 5. Complex mode — phasors and vectors

`MODE` → `CPLX`. Enter impedances directly as $a+bi$ and let the calculator do the algebra; the menu gives
`Abs`, `Arg`, `Conjg`, `Real`, `Imag`, `▶r∠θ` and `▶a+bi`.

- Series/parallel impedance, voltage dividers, and transfer functions $H(j\omega)$ — evaluate at the printed
  $\omega$ rather than simplifying by hand.
- `Pol(` and `Rec(` **store their two results into `X` and `Y` automatically** — `Pol(r, θ)` leaves $r$ in `X`
  and $\theta$ in `Y`, and `Rec(x, y)` leaves $x$ in `X` and $y$ in `Y`. This is the mechanic that makes
  rectangular↔polar conversions a one-keystroke step; $\theta$ is returned in $(-180^\circ, 180^\circ]$.
- A complex result carries **magnitude and phase in one pass** — no separate $\sqrt{R^2+X^2}$ step.

**Verified numerically:** $(3+4j)(1-2j)=11-2j$; $|3+4j|=5$; $\arg(3+4j)=53.1301^\circ$;
$(4+j3)/(5-j6)=0.032787+j0.639344$. Manual check: `Pol(1, √3)` returns $r=2$, $\theta=60^\circ$ with `X`=2 and
`Y`=60.

---

## 6. Multiple choice: test the choices

Four options and no partial credit changes the optimal strategy — **you often do not need to solve, only to
decide which option is consistent.**

1. **Back-substitute into the original equation.** For "solve for $x$", evaluate the left and right sides at each
   choice with `CALC`. The correct option gives $L-R=0$; wrong ones rarely come close.
2. **Test the roots of a polynomial.** With the candidates in `X`, evaluate the polynomial — a root returns 0.
   Use $\sum$ of roots $=-b/a$ and product $=c/a$ as a fast pre-filter.
3. **Check an identity or a condition.** "Which of these is a solution of the differential equation / satisfies
   the boundary condition?" Evaluate both sides at one convenient point; one trial eliminates most options.
4. **Evaluate the expression at a convenient value.** For a limit, use a tiny $x$ ($10^{-7}$): $\sin(3x)/x\to3$
   is confirmed in one keystroke. For a definite integral, compare each option against `∫(`.
   **Pick a test point that actually separates the choices** — $x=1$ or $x=2$ often leaves several options
   numerically identical; $x=3$ or $x=5$ discriminates far better. A test point where two choices agree has
   told you nothing.
5. **Watch the units and the order of magnitude first.** Options that differ by $10^{3}$ are usually a unit or a
   $\mathrm{k}/\mathrm{M}$ slip — eliminate before computing anything.
6. **Do not fully solve when you can bracket.** If two options are close and two are far, a rough `TABLE` scan or
   a one-significant-figure estimate settles it. Remember the 30-row cap when tabling all choices at once.

**Verified numerically:** the quadratic $2x^{2}-7x+3$ returns exactly 0 at $x=3$ and $x=0.5$, with
sum $=3.5$ and product $=1.5$ matching $-b/a$ and $c/a$; a central-difference derivative agrees with
$\cos 1$ to 9 decimals.

> [!tip] High-yield ★
> On a four-choice computational item, **substituting the choices is usually faster than deriving the answer** —
> and it cannot go wrong algebraically. Reserve full solving for items that ask you to *show* or *find all*.

---

## 7. Numerical calculus and linear algebra

- **Integral `∫(f(x), a, b, n)`** — definite integrals with no elementary antiderivative, and a check on any hand
  integration (`n` is an optional tolerance). **COMP mode only**, and it requires **radian** measure for trig
  (verified: $\int_0^{\pi}\sin x\,dx=2$; $\int_0^1\frac{dx}{1+x^2}=\pi/4$).
- **Derivative `d/dx(f(x), a, Δx)`** — a centered-difference derivative at a point, useful for related-rates and
  error-propagation items (`Δx` optional). **COMP mode only**, radian for trig.
- Neither nests with the other, nor with `Σ`, `Π`, `Pol` or `Rec`.
- **`MODE` → `MATX`** — `Det`, `Trn`, `Ide`, `Adj`, `Inv`: determinants, inverses and transposes without cofactor
  expansion. Use `Det` to test for a unique solution before applying Cramer's rule.
- **`MODE` → `VCTR`** — dot and cross products, norms and angles for vector items.

**Verified numerically:** central difference of $\sin x$ at $x=1$ matches $\cos 1$ to 9 decimals;
$\det\begin{bmatrix}4&7\\2&6\end{bmatrix}=10$ and $AA^{-1}=I$ to machine precision.

---

## 8. How the blocks are written

Inline blocks use the `example` callout so they stay visually distinct from the `tip`/`warning` exam callouts
(and do not consume the 4–6 callout budget the structure audit tracks). Each block gives:

1. the **mode** to start in,
2. the **key sequence** for the fastest path, and
3. the **answer**, so the reader can confirm they keyed it correctly.

```markdown
> [!example] Calculator — <what it replaces>
> `MODE` → STAT → `Type` `2` Lin: enter $(x_i,y_i)$ in `Data` → Statistical Menu → `Reg` → `B` = slope, `A` = intercept, `r` = correlation.
> Replaces the whole $\sum x$, $\sum xy$, $\sum x^2$ table. Check: $s^2$ from `S-VAR` must match the printed form.
```

**Two rules that a key sequence must satisfy to be worth writing down.**

1. **It must be keyable.** `Σ`, `∫` and `d/dx` take *numbers and the running variable `X`* — there are no user-defined
   functions and no cash-flow or signal arrays. So `Σ(x[k]h[n-k])` is not a keystroke, and a `Σ` over an indexed
   array (`CF_X`, `P_i`, `n_i`) is not either. Express the terms, or say plainly that they must be typed in.
2. **Its "Verified" line must verify the instruction next to it.** A true fact about a *different* quantity is not a
   verification of the adjacent claim.

Guarding this: `_AUDIT/verify-calc-techniques.mjs` (73 checks) and `_AUDIT/verify-economy-blocks.mjs` (33 checks,
including regression guards that keep two previously-shipped defective gradient routes unequal to the correct value)
recompute the quoted numbers, while `_AUDIT/check-calc-blocks.mjs` checks delimiter and brace balance and
`_AUDIT/run-all-checks.mjs` runs the whole set. Run `node run-all-checks.mjs` from `_AUDIT/` after any edit here.

---

*Keep this file and the inline blocks in sync: if a key sequence changes, update both in the same change.*
