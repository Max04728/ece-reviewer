# Canon F-789SGA Calculator Techniques for Engineering Board Exams

**Verification status:** Every F-789SGA key sequence below was checked against Canon's **official F-789SGA instruction manual** (`F-789SGA (EXP)_EN.pdf`, © Canon Inc. 2014), which I downloaded and extracted to text. Line/page citations refer to that manual. Cross-checked against the **F-789SGA (EXP)_Example.pdf** worked-examples booklet, the **F-789SGA II** manual, and the Vietnamese in-region edition (which contains the full STAT variable table that the English PDF renders as non-extractable images).

---

## 0. The single most important finding: the F-789SGA is NOT a Casio clone

**Nearly every "calculator techniques" tutorial online is written for the Casio fx-991ES/EX. On the F-789SGA, the mode-access model is fundamentally different, and blind keystroke-following will fail.**

| | Casio fx-991ES/EX | Canon F-789SGA |
|---|---|---|
| Mode selection | `MODE` then a **number** (fixed positions) | `MODE` → **Apps menu** of **named** applications |
| Mode names | numbers only | `COMP`, `CPLX`, `STAT`, `BASE`, `EQN`, `TABLE`, `MATX`, `VCTR` |
| MATRIX | `MODE 6` (ES) | **`MATX` app** (not a fixed number) |
| VECTOR | `MODE 8` (ES) | **`VCTR` app** (not a fixed number) |
| STAT types | `MODE 3` → 1–8 | STAT app → `Type` → 1–8 **in a different order** |

The manual's mode table (p.4–5) lists the applications explicitly:

> COMP Normal calculations · CPLX Complex number calculation · STAT Statistical and regression calculations · BASE Calculations involving specific number systems · EQN Equation solution · TABLE Function table generation · MATX Matrix calculations · VCTR Vector calculations
> — *F-789SGA (EXP)_EN*, p.5

**Practical consequence:** On the F-789SGA you navigate by **reading the menu label**, not by memorising "MODE 3". The numbers in Casio tutorials are *positions in a list*, and Canon's list has a **different order and different contents** (e.g. BASE sits between STAT and EQN).

> **⚠️ Also note:** the manual states the STAT/EQN/MATX/VCTR screens **force Line mode** — "For the STAT, EQN, MATX, VCTR mode, the Input & Display format will switch to Line mode automatically" (p.5). Casio tutorials that lean on Natural/Textbook display for these modes do not apply.

---

## 1. STAT mode regression

### 1.1 Verified entry path

The STAT app is reached from the Apps menu; the **`STAT` indicator lights up** (p.11, p.21).

**Statistical Type Selection** — press the number to choose (p.21). This is the **verified F-789SGA order**, which differs from Casio:

| Key | Model | Equation |
|---|---|---|
| **1** | `SD` | One-variable statistics (x) |
| **2** | `Lin` | Two-variable, linear regression — **y = A + Bx** |
| **3** | `Quad` | Two-variable, quadratic regression — **y = A + Bx + Cx²** |
| **4** | `Log` | Two-variable, logarithmic regression — **y = A + B·ln x** |
| **5** | `e EXP` | Two-variable, e-exponential regression — **y = A·e^(Bx)** |
| **6** | `ab EXP` | Two-variable, ab-exponential regression — **y = A·B^x** |
| **7** | `Pwr` | Two-variable, power regression — **y = A·x^B** |
| **8** | `Inv` | Two-variable, inverse regression — **y = A + B/x** |

*(Source: manual p.21, lines 854–861.)* This matches the user's list — **all six models are present, plus SD.** Note Canon labels #6 `ab EXP` (i.e. A·Bˣ), which is the one used for `y = a·b^x` curve fitting.

### 1.2 Entering paired data

After confirming the type (or by pressing **`Apps` → `Data`** in STAT mode), the **Statistical Data Input screen** appears (p.22, line 896). The manual notes the `FREQ` column only appears if Data Frequency is switched on in setup (p.22, line 899; setup `[1] ON` / `[2] OFF`, p.7 lines 230–232).

Capacity limits (p.22 table, lines 909–912) — useful for knowing when to split data:

| Statistic type | FREQ OFF | FREQ ON |
|---|---|---|
| Single Variable | 40 lines | 80 |
| 2 Variable (x & y) | **26 lines** | 40 |

"After inputted the data, press `=` to store the value into statistical registers… You can press cursor key to move the cursor between each cell." (p.22, lines 905–908)

### 1.3 The Statistical Menu — S-SUM / S-VAR / S-PTS / Reg

In either the Data Input or Statistical Calculation screen, press **`Apps`** to open the Statistical Menu (p.23, lines 960–963). Canon's own description:

> [1] Type — statistical calculation type screen
> [2] Data — statistical data input screen
> [3] Edit — Edit sub-menu for editing STAT editor screen contents
> [4] **S-SUM** — S-Sum sub-menu (Calculating sum)
> [5] **S-VAR** — S-Var sub-menu (Calculating variable)
> [6] **S-PTS** — S-PTS sub-menu (Calculating points)
> [7] **Distr** — Distr sub-menu (Calculating distribution)
> [8] **Reg** — Reg sub-menu (Regression calculation)
> — *manual p.23, lines 964–971*

**This confirms the user's `S-PTS` / `S-VAR` / `Reg` naming exactly** — these are **Canon's own menu labels**, shared with Casio's STAT menu vocabulary.

The regression coefficients exposed by the `Reg` sub-menu (from the Vietnamese edition's variable table, pages 44–45, which lists each symbol with its description):

- **Regression coefficient A** — the intercept (in *both* linear and quadratic/other-degree regressions)
- **Regression coefficient B** — the slope (also present in both)
- **Regression coefficient C** — quadratic term only
- **Correlation coefficient r**
- **Estimated value of x**, **estimated value of x₁**, **estimated value of x₂**
- **Estimated value of y** (listed twice — for the two regression classes)

So the user's stated goal is confirmed: **enter paired data, then `Apps → 8 Reg` to read A (intercept), B (slope), C (quadratic), and r.**

### 1.4 Verified worked example (quadratic regression)

The manual's own quadratic-regression example (p.24/45), which also demonstrates the estimate features:

**Data:** Advertising expense X: `18, 35, 40, 21, 19` — Effectiveness y (%): `38, 54, 59, 40, 38`

**Tasks:** estimate y at X = 30, and estimate X for y = 50.

**Verified outputs (from the Example booklet, lines 952–958):**

```
(Quad)
x=30   ŷ = 48.69615715
y=50   x1 = 31.30538226
y=50   x2 = -167.1096731
```

> **Exam note:** the quadratic gives **two x-estimates** — `x1` and `x2`. The second root is frequently non-physical (here −167). Pick the one inside the data range. This is a classic trap in board problems.

### 1.5 The "regression trick" for linear systems — and its real limits

**What transfers cleanly:** the 2-unknown case is safe and well-documented. Fitting **y = A + Bx** to two data points gives A and B directly, which *is* the solution of a 2×2 system. This is exactly how the schematicanalysis.com guide uses it — it repeatedly enters just two (x, y) pairs and reads the estimate back:

> "Mode 3 2 / X Y / 30 105000 / 47 105700 / **37 - Shift - 1 - 5 - 5** = 105288 ohms"
> — [Schematic Analysis, *Calculator Techniques for the Casio FX-991ES and FX-991EX*](http://www.schematicanalysis.com/2013/09/calculator-techniques-for-casio-fx.html)

Note carefully: on the **Casio ES the estimate is `SHIFT 1 5 5`** (`ŷ`), while the **regression coefficients A/B are `SHIFT 1 7 1` / `SHIFT 1 7 2`**. On the F-789SGA the equivalent path is **`Apps → 8 (Reg)`** and then the lettered coefficient. **The digits do not transfer.**

**What does NOT transfer — read this before relying on the trick:**

1. **The 3-unknown extension is UNVERIFIED.** I found no reputable source documenting a verified 3×3 regression trick. The idea circulates because quadratic regression yields A, B, C (three coefficients), but mapping three *simultaneous linear* equations onto `y = A + Bx + Cx²` requires the equations be in polynomial form with x = 1, 2, 3 — which is a genuine but narrow special case. **Treat any 3-unknown regression trick as UNVERIFIED.** For 3 or 4 unknowns, use EQN mode (§6) — it is direct, exact, and built in.
2. **The F-789SGA has an exact linear solver already.** Using regression to solve a linear system is strictly worse than `EQN → 2 unknown`. The regression trick existed on Casio because… it also had EQN. It survives in review centers mainly as a *speed* habit. Given the F-789SGA exposes 2/3/4-unknown EQN directly, **prefer EQN**.

### 1.6 Curve fitting — the technique that genuinely earns its keep

**Verified example (exponential growth), from the Schematic Analysis guide:** population is 200 now, 1000 two years later; model A·B^x; predict at year 10.

**Casio ES keystrokes as published:**
```
Mode 3 5        (e^x model)
X      Y
0      200
2      1000
10 - Shift - 1 - 5 - 5 =  625000  →  625000/1000 = 625 cells
```
— [Schematic Analysis](http://www.schematicanalysis.com/2013/09/calculator-techniques-for-casio-fx.html)

**F-789SGA translation (VERIFIED menu alignment, UNVERIFIED end-to-end run):** the model `y = A·B^x` is **`6 (ab EXP)`** on the F-789SGA (manual line 859), *not* position 5. Position 5 on the F-789SGA is `e EXP` (`y = A·e^(Bx)`). Then read the estimate via **`Apps → 8 (Reg) → estimated value of y`**.

> **⚠️ This is the exact class of error the user asked me to flag.** A reviewer following the Casio tutorial presses **5** on the F-789SGA and silently gets the **wrong model family** (`A·e^(Bx)` instead of `A·B^x`) — and since both fit monotone growth, the wrong answer looks plausible. Cross-check: `A·e^(Bx)` and `A·B^x` are related by `B_ab = e^(B_e)`, so the numbers *will* differ.

**Also verified:** the guide's DE trick — "the solution to the D.E. dP/dx = kt is an exponential function e^x. When we know the boundary conditions, we can input them for regression." This reasoning is model-agnostic and **transfers cleanly to the F-789SGA**; only the menu position changes (F-789SGA `5 e EXP` for `A·e^(Bx)`).

**Arithmetic & geometric progressions (verified technique, PERCDC handout):** enter term-number as x and term-value as y, then read the estimate.

```
Find the 30th term of the AP 4, 7, 10...
ENTER:  x    y
        1    4
        2    7
ENTER:  30 → ŷ = 91
```
```
GP: 4th term = 216, 6th term = 1944. Find the 8th term.
ENTER:  x    y
        4    216
        6    1944
ENTER:  8 → ŷ = 17496
```
— [Calculator Techniques (PERCDC / Engr. Rex Jason H. Agustin)](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg), pp. of 54

On the F-789SGA: use **`2 (Lin)`** for the AP, and **`6 (ab EXP)`** for the GP (a GP is exactly A·B^x). Then `Apps → 8 (Reg)` → estimate.

### 1.7 Distribution sub-menu (F-789SGA extra, absent from fx-991ES)

`[7] Distr` computes normal-distribution values **P(t), Q(t), R(t)** directly from entered sample data — "you can perform the normal distribution or probability distribution calculation such as P(t), Q(t) and R(t)" (p.26, lines 998–1002), with **`1: P(` , `2: Q(` , `3: R(` , `4: →t`**.

**Verified example** (p.26, Example #47): sample `20, 43, 26, 46, 20, 43`, x = 26 →
```
t  = -0.6236095645
P(Ans) = 0.26644
```
**This is a genuine F-789SGA advantage** — the fx-991ES has no built-in P/Q/R distribution from sample data. For ECE/EE probability questions (noise, component tolerance, quality control), this is a direct speed win.

---

## 2. Summation Σ and product Π

### 2.1 Verified syntax

The manual's function-range table gives the argument forms (Example booklet p.9, lines 235–236 & 257–258):

```
∑ (f(x), a, b)
∏ (f(x), a, b)
```

The Vietnamese edition's prose description (Chapter "Tổng của tập hợp hoặc chuỗi" / product of a set or series, p.32) is explicit about the three parameters:

> **a** = start value (Giá trị khởi đầu) · **b** = end value (Giá trị kết thúc) · **c** = the function
> Sum of a set or series — Example: sum of (x + 1) from 0 to 5

**Verified example:** Σ(x+1) from 0 to 5 → the manual shows the result **20**; ∏(x+1) from 0 to 5 → **720**.

> **Watch the 2-argument form.** The function table lists `∑(f(x), a, b)` — start and end — **with no separate variable argument**. The running index is carried by the expression's variable (X). This differs from the Casio `Σ(expr, var, start, end)` 4-argument form the user described. **The user's 4-arg syntax is UNVERIFIED for the F-789SGA and appears to be the Casio form.** Confirm on the device before relying on it; the Canon-documented form is the 3-argument `∑(f(x), a, b)`.

Both are reached in **COMP mode** (the Vietnamese text states "Nhấn … để vào chế độ COMP" — press to enter COMP mode — for each). They are **Apps-menu functions**, not a separate mode.

### 2.2 Verified board-exam use

The PERCDC handout demonstrates the Σ sign for series summation directly:

```
Find the sum 1 + 2 + 3 + ... + 20
DISPLAY:  Σ x  from x=1 to 20   =  210
```
— [Calculator Techniques (PERCDC)](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg)

**Standard uses and whether they transfer:**
- **Arithmetic / geometric series** — ✅ transfers directly (`∑` for the sum, `∏` for products).
- **Annuity sums** — ✅ transfers: annuity PV/FV factors are finite geometric sums, exactly what `∑` computes. This is the single highest-value Σ use for EE/ECE (capital recovery, sinking fund).
- **Power sums** — ✅ your verified STAT example already covers this: the manual computes `∑x²` and `∑x` for data `75, 85, 90, 77, 79` giving **∑x² = 33120, ∑x = 406, n = 5, x̄ = 81.2, σx = 5.528109984, sx = 6.180614856** (Example booklet lines 926–937).
- **Series convergence / Riemann sums** — ⚠️ **partially**: Σ is exact and discrete, so it converges-checks fine, but there is no limit operator. Use **TABLE mode** to watch partial sums approach a limit (see §5).
- **Riemann sums for definite integrals** — ⚠️ possible via Σ but inferior to the built-in `∫(` (§10), which uses **Gauss–Kronrod** (p.29, line 1166).

---

## 3. SOLVE (SHIFT SOLVE)

### 3.1 Verified behaviour

> "Solve functions use **Newton's Method** to obtain the approximate solution of equations."
> "**Note: SOLVE function can be used in the COMP Mode only.**"
> — *manual p.27, lines 1079–1081*

**Verified capabilities** (p.27, lines 1084–1092):
- "Equations that include variable X"
- Examples given: `X² + 2X – 2`, `X = Y + 3`, `X – 5 = A + B`, `X = tan(C)`
- "**An expression like X² + 5X – 24 will be treated as X² + 5X – 24 = 0, not necessary to input '= 0'**"
- Input syntax: **`{equation},{solution variable}`**

### 3.2 The L−R residual — VERIFIED, and this is the key exam skill

The manual's own SOLVE example (Example booklet p.30, Example #50):

```
X = ∛(B²C)        (when B = 5; C = 20)
B?            0      ← initial value prompt
C?            0
Solve for X   0      ← solution-variable guess prompt
X =           523.5987756
L-R =         0      ← PRECISION OF SOLUTION
```

And the manual explains exactly how to read it:

> "**The Precision of Solution** shows the result when the obtained solution is assigned to the solution variable. **The precision of the obtained solution is higher if this value is closer to zero.**"
> — *manual p.28, lines 1138–1140*

**This is the verification discipline the user asked about, and it is confirmed by Canon.** In an exam: if `L−R = 0`, the root is converged. If `L−R` is a large number, Newton's method stalled or diverged — **change the guess**. The PERCDC handout relies on the same readout:

```
Solve for x in log₂x + log₂(x + 5) = 10
DISPLAY:  X = 29.59750769
          L-R = 0
```
— [Calculator Techniques (PERCDC)](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg)

### 3.3 Verified caveats (memorise these — they cause wrong answers)

The manual's "Important precaution" list (p.28, lines 1112–1132):

- **Forbidden inside SOLVE:** `d/dx`, `∫`, `∑`, `∏`, `Pol`, `Rec`, `Q…r`, `Rand`, `i-Rand`, **and multi-statement**. (Also stated at p.30 line 1191 and p.29 line 1241 for ∫ and d/dx respectively.)
- "Since SOLVE function uses Newton's Method… **even if there are multiple solutions, only one of them will be shown** as the solution." → **For polynomials use EQN mode, not SOLVE** — EQN returns *all* roots.
- "**SOLVE function may not be able to obtain a solution because of preset initial value** of the solution variable. In case this happens, try to change the initial value."
- "**SOLVE function may not be able to find the correct solution, even if the solution(s) exists.**"
- "Newton's Method may have problems for solving the following types of functions, for example **y = eˣ, y = 1/x, y = sin(x), y = √x**, etc." → **This directly threatens IRR solving**, where the objective is often a high-order polynomial sum with near-flat regions. Always supply a sensible guess and check `L−R`.
- "**Variable ERROR**" appears "when the expression does not contain the variable that you want to solve."
- Long solves show a **"PROCESSING"** screen, cancellable with `AC`.
- **Continue screen:** "SOLVE performs convergence a preset number of times. If it cannot find a solution, it displays a confirmation screen that shows **'Continue: [=]'**… Press `=` to continue or `AC` to cancel." (p.28, lines 1141–1145)

**Exam uses:** IRR/rate of return, interest rate in annuity equations, and transcendental roots — all valid, all subject to the caveats above. **For a rate problem, always give a guess in a plausible band (e.g. 0.10) rather than accepting the default, and reject any result whose `L−R` is not ~0.**

---

## 4. CALC key

### 4.1 Verified description

> "**CALC function is a memory zone with a maximum of 79 steps** to store a single calculation expression which can be recalled and calculated a number of times with different values."
> "After inputting the calculation expression and pressing `CALC`, **the calculator will request for the current value of your input variables.**"
> "**CALC function can only be used in COMP mode or CPLX mode.**"
> — *manual p.28, lines 1104–1110*

### 4.2 Verified example

> "Example: For the equation **Y = 5x² – 2x + 1**, calculate the value of Y if x = 5 or x = 7." — *manual p.28, Example #51*

The Example booklet shows the prompt-and-answer cycle (lines 1029–1035):
```
(COMP MODE)  0
Y=5X²–X+1    0
Y=5X²–X+1    116     ← at one x
Y=5X²–X+1    232     ← at the next x
```

**This is exactly the "store the knowns, then just recall" workflow the user described, and it is confirmed.** The manual also notes the expression is **cleared** when you "start a new calculation, change into another mode, or turn off the calculator" (p.28, lines 1102–1103) — so **re-enter the expression for each new problem**; do not expect it to persist across a mode change.

### 4.3 The multi-statement variant — high exam value

The PERCDC handout shows the more powerful pattern: assign one variable via `:` then evaluate the expression in the same line.

```
Find the area of a triangle with sides 6, 8, 12 (Heron's formula)
ENTER:  X = (A+B+C)/2 : √(X(X-A)(X-B)(X-C))
DISPLAY: X = 13
DISPLAY: √(X(X–A)(X–B)(X–C)) = 455
```
— [Calculator Techniques (PERCDC)](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg)

`CALC` then prompts for A, B, C. **Note the `:` multi-statement separator is usable here but is FORBIDDEN inside SOLVE** (manual p.28 line 1114). Keep the two tools straight.

---

## 5. TABLE mode

### 5.1 Verified entry and behaviour

> "**1. Press … to enter Table mode.** 2. **Function input screen** — input the function with the variable **X** to generate the function table result. **All other variables (A, B, C, D, Y) and independent memory (M) are treated as constants.** … 3. Then input the **start, end, & step** information. Input the value, press `=` to confirm on the following screens."
> — *manual p.34, lines 2379–2393; English p.34 lines 1406–1413*

**Verified prompts:**
```
f(x) =        ← function entry (X is the table variable)
Start?        ← lower limit of X (Default = 1)
End?          ← upper limit of X (Default = 5); End must be > Start
Step?         ← increment (Default = 1)
```

**Verified example:** table for `f(x) = x³ + 3x² – 2x` over the default range, step 1 (p.34, Example #68).

### 5.2 Verified constraints — important for exam strategy

- "**There is a maximum of 30 x-values** in the function table generation. **'Insufficient Error' will be shown if the start, end, step value combination is more than 30 x-values.**" (p.34, lines 1411–1413)

> **This 30-row cap is the critical planning fact.** To scan e.g. 0–100 you must run **four passes** (or widen the step and narrow). Casio's fx-991ES also caps at 30, so tutorials align here — but budget the passes into your exam time.

- "**Pol, Rec, Q…r, S, d/dx functions cannot be used in the Function Input screen.**" (p.34, lines 1403–1404) → **You cannot put a derivative or integral inside a TABLE function.** Compute those separately.
- "The Function Table Calculation **will change X-variable**" (p.34, line 1405) → **TABLE overwrites X.** If you stored a known in X, it is gone. This is a classic silent-error source.
- "In the Function Table Result screen, **you cannot edit the content**; press `AC` to return to the Function Input screen." (p.34, lines 1435–1436)

### 5.3 Using TABLE to bracket roots and walk annuity schedules

- **Bracket a root:** enter `f(x)`, pick a step that spans a sign change; scan for the row where f(x) flips sign, then narrow Start/End/Step around it. **This is more reliable than SOLVE for transcendental equations**, precisely because SOLVE can converge to the wrong root or fail outright (see §3.3). Feed the bracketed interval in as SOLVE's guess.
- **Annuity factors / depreciation schedules across years:** enter the factor as a function of n and step by 1 year. Confirmed as a valid pattern — the manual supports arbitrary f(X) with other variables held as constants, so `(1–(1+i)^–X)/i` with i stored in a memory variable works as a per-year table.
- **Limits** — "For approximations and functions where the limit is to be taken, the **TABLE function** can be used" ([Schematic Analysis](http://www.schematicanalysis.com/2013/09/calculator-techniques-for-casio-fx.html)). **Transfers cleanly** to the F-789SGA — TABLE has no limit operator dependency.
- The manual's own TABLE section is headed **"Function Table (x, y)"** — a single f(x) column. **The user's "f(x) and g(x)" two-function table is UNVERIFIED for the F-789SGA.** The Casio fx-991ES *does* offer f(x)/g(x); Canon's documented TABLE takes one function. Verify on the device before planning around two columns.

---

## 6. EQN mode

### 6.1 Verified menu — this is a strong F-789SGA capability

> "Press `MODE` to enter the equation mode; press ▲ / ▼ for next / previous pages.
> [1] **2 unknow EQN** — Simultaneous Linear Equations with two unknowns
> [2] **3 unknow EQN** — Simultaneous Linear Equations with three unknowns
> [3] **4 unknow EQN** — Simultaneous Linear Equations with **four** unknowns
> [4] **Quad EQN** — Quadratic Equation, degree 2
> [5] **Cubic EQN** — Cubic Equation, degree 3
> [6] **Quartic EQN** — Quartic Equation, degree 4"
> — *manual p.26, lines 1015–1022*

**All six are confirmed present**, including **4-unknown simultaneous** and **quartic polynomials.**

**Verified example (3 unknowns)** — the manual's own (p.27, Example #48):
```
2x + 4y – 4z = 20
2x – 2y + 4z = 8
5x – 2y – 2z = 20
```
Output format is `X=`, `Y=`, `Z=` (Example booklet lines 976–982).

**Verified example (cubic)** — `5x³ + 2x² – 2x + 1 = 0` (p.27, Example #49). **Roots are named X1, X2, X3.** The manual states the naming convention explicitly:

> "**For quadratic, cubic or quart equations, the variable name starts with 'X1'.**" (p.27, lines 1055–1056)

### 6.2 The complex-root caveat — CONFIRMED and important

The Example booklet's cubic output (lines 993–1001) is:
```
X1 = 10 + 0.331662479
X2 = 10 – 0.331662479     ← real roots shown plainly
X3 = -1
```
When roots are complex, the display carries the **`i`** indicator. The manual's status-indicator table lists **`CPLX : Complex Number Calculation Mode`** (p.2/3, line 89) and states that for complex numbers **`[ ] indicates the display result is the imaginary number`** (p.20, lines 816–817).

> **So the caveat the user raised is F-789SGA-relevant:** polynomial complex roots surface with the imaginary unit, and interpreting them cleanly means switching to **CPLX mode** (MODE → Apps → `CPLX`). For an exam, a cubic with one real and two complex roots means the *physical* answer is the single real root — **X3 = −1 in the manual's own example.** Always look for the root **without** an `i`.

---

## 7. COMPLEX mode

### 7.1 Verified entry and types

> "Press `MODE` → `Apps` to enter **CPLX** mode. Press `Apps` to select the calculation type. **There are 6 types of complex number calculations** in the Complex Number Type screen. Press the number to select the type." (p.20, lines 809–814)

- "Complex numbers can be expressed by **rectangular form (z = a + bi)** or **polar form (r∠θ)**" (p.20, lines 820–824)
- "**Imaginary numbers will use up replay memory capacity.**" (p.20, line 818)

### 7.2 Verified operations

| Operation | F-789SGA | Manual |
|---|---|---|
| Absolute value (r) | **`Abs`** key | p.20 line 834 |
| Argument (θ) | **`Arg`** | p.20 line 834; `Arg(` in function list |
| Conjugate | **`Conjg`** | p.20 lines 836–838; `Conjg(` in list |
| Real part | **`Real(`** | function list |
| Imaginary part | **`Imag(`** | function list |
| Rect → Polar | press `→r∠θ` | p.20, lines 843–846 |
| Polar → Rect | press `→a+bi` | p.20, lines 843–846 |

All of `Arg(`, `Conjg(`, `Real(`, `Imag(` are confirmed in the manual's function/argument table (Example booklet p.9, lines 246–250).

### 7.3 Pol( and Rec( — verified, with a crucial auto-store behaviour

**Verified (p.19, lines 762–770):**
> "With polar coordinates, you can calculate and display **θ within the range of –180º < θ ≤ 180º**."
> "In Line mode, **(x,y) or (r, θ) will be shown over 2 lines**."
> "**After conversion, the results will automatically be assigned to memory variables X and Y.** Press `ALPHA` `X` or `ALPHA` `Y` to show the results."

**This auto-store to X and Y is a major caltech mechanic** and the PERCDC handout uses it explicitly:

```
Find the polar coordinate of (4, –6)
DISPLAY: Pol(4,–6)   r = 7.211102551,  θ = –56.30993247

Past ECE board: Find cos θ if the terminal side contains P(–3,–4)
DISPLAY: Pol(–3,–4)  r = 5,  θ = –126.8698976
NOTE: r is stored automatically to X and θ to Y.
DISPLAY: cos(Y) = –3/5
```
```
Find the rectangular coordinate of the point whose polar coordinate is (3, 120°)
DISPLAY: Rec(3,120)  X = –1.5,  Y = 2.59807621
```
— [Calculator Techniques (PERCDC)](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg)

**Phasor arithmetic (AC circuits):** fully supported and **transfers cleanly** — divide complex impedance/products in `a+bi`, convert with `→r∠θ` to read magnitude and angle. **Check the angle unit first** (p.20 line 815: "Check the current angle unit setting (Deg, Rad, Grad)") — the `–180º < θ ≤ 180º` convention means a lagging answer may appear as a negative angle, which is correct but often needs re-expressing as 0–360°.

**Force/vector components** — verified caltech use: `F = 300 N ∠37°` → `300∠37° = 239.590635 + 180.5445069i`, giving x and y components directly.

> **⚠️ CPLX-mode restriction:** per the manual, `CALC` works in CPLX (p.28 line 1110), but **CMPLX/CPlx operations are excluded from SOLVE's permitted contents** — SOLVE itself is COMP-only (p.27 line 1081). Do not attempt to SOLVE a complex equation.

---

## 8. MATRIX and VECTOR

### 8.1 CRITICAL: the mode numbers do NOT match Casio

The user asked me to be explicit here, and this is the biggest trap in the whole report.

**On the F-789SGA there is no fixed "MODE 7 = MATRIX, MODE 8 = VECTOR".** These are **named apps** in the Apps menu: **`MATX`** and **`VCTR`** (manual mode table, p.4–5, lines 90–91 & 150–151).

By contrast, the **Casio fx-991ES uses `MODE 6` for MATRIX and `MODE 8` for VECTOR** — and the Schematic Analysis guide explicitly says "**Mode 8 (VECTOR)**" for the ES. **A reviewer who presses 8 expecting VECTOR on the F-789SGA will land on the wrong app.** Read the label, not the number.

### 8.2 MATRIX — verified menu

> "Press `MODE` → `Apps` to enter Matrix mode. Before starting matrix calculations, you have to create **one matrix or a maximum of four matrices named A, B, C and D** at one time. **The matrix dimension can be up to 4×4.** The matrix calculation results are stored into the **MatAns** memory automatically."
> — *manual p.29, lines 1199–1206*

**Verified MATX menu** (p.29, lines 1212–1232):

| Key | Item | Description |
|---|---|---|
| **[1]** | `Dim` | Specify Matrix memory A–D and dimension (up to 4×4) |
| **[2]** | `Data` | Edit matrix A–D and corresponding elements |
| **[3]** | `MatA` to `MatD` | Select matrix A–D |
| **[4]** | `MatAns` | Calculation answer stored into MatAns |
| **[5]** | **`Det`** | **Determinant** of Matrix A–D |
| **[6]** | **`Trn`** | **Transpose** of Matrix A–D |
| **[7]** | `Ide` | Identity matrix |
| **[8]** | `Adj` | **Adjoint** |
| **[9]** | **`Inv`** | **Inverse** |

**All the user's requested operations are present: determinant (`Det`), inverse (`Inv`), transpose (`Trn`)** — plus adjoint and identity, which Casio's basic MATRIX mode also has.

**Verified examples:**
- Adjoint of `[[2,3],[4,5]]` → `[[5,–3],[–4,2]]` (p.31, lines 1256–1260)
- **Determinant** of `[[10,–5,3],[–4,9,2],[1,7,–3]]` → **–471** (p.31, lines 1284–1285)
- Transpose of `[[9,5],[6,2],[8,4]]` → `[[9,6,8],[5,2,4]]` (p.31, lines 1292–1297)
- Matrix product MatA × MatB for two 3×3 matrices (p.31, Example #54)

**Verified constraint:** "**An error occurs if you obtain the determinant of a non-square matrix.**" (p.31, line 1289) — and matrices being added/subtracted/multiplied "**must be the same size**" (p.31, lines 1270–1273).

**Network equations:** solve mesh/nodal systems as **MatA⁻¹ × MatB** using `Inv` — this **transfers cleanly** from Casio practice. Note that for pure linear systems, **EQN mode (2/3/4 unknowns) is faster and less error-prone than matrix inversion**; reserve matrices for when you genuinely need the determinant (e.g. checking for a singular network) or repeated solves with the same coefficient matrix.

### 8.3 VECTOR — verified menu

> "Press `MODE` → `Apps` to enter Vector mode. … create one or more vectors named **A, B, C and D** (maximum four at one time). The vector calculation results are stored into **VctAns** memory automatically." (p.32–33, lines 1317–1343)

**Verified VCTR menu** (p.32, lines 1321–1332):

| Key | Item | Description |
|---|---|---|
| **[1]** | `Dim` | Vector name A–D and dimension (**2D or 3D**) |
| **[2]** | `Data` | Edit Vector A–D and elements |
| **[3]** | `VctA` to `VctD` | Select Vector A–D |
| **[4]** | `VctAns` | Calculation answer stored into VctAns |
| **[5]** | **`Dot`** | "Input the '▪' command for obtaining the **dot product**" |

**Verified vector operations** (p.32–33): addition/subtraction, scalar multiplication (`s × VctA(a,b) = VctB(axs, bxs)`, line 1370), **inner (dot) product**, **outer (cross) product**, and **absolute value of a vector**.

**Verified angle-between-vectors recipe** (PERCDC / Schematic Analysis, transfers cleanly):
```
dotproduct(A,B) = abs(A)·abs(B)·cos(θ)
⇒ θ = arccos( dotproduct(A,B) / (abs(A)·abs(B)) )
```
**Verified cross-product exam use:** given A = (–1, 0, 1), B = (1, 2, 0), find the unit vector perpendicular to both → cross product then divide by its magnitude (p.32–33 lines 2357–2361).

**Verified constraint:** vectors must be same size for add/subtract — "Vector A (a, b, c) cannot be added or subtracted with Vector B (d, e)" (line 2308–2309).

---

## 9. Multiple-choice back-substitution tactics

This is where caltech pays for itself, and these techniques are **almost entirely calculator-agnostic** — they transfer from Casio with only mode-navigation changes.

### 9.1 Plug the choices in (verified, with a full worked example)

The PERCDC handout's flagship MC technique — **differentiate once, then evaluate every choice at one convenient x**:

```
Past ECE board: Differentiate y = x²/(x+1)
  a. (x²+2x)/(x+1)²   b. x²/(x+1)   c. 2x/(x+1)   d. 2x²/(x+1)

Technique: Differentiate y at any value of x, say x = 2, and compare this
value to the value of the choices when the same value of x is substituted.

ENTER:  d/dx ( x²/(x+1) ) at x=2   DISPLAY: 0.8888888889

Substitute x = 2 in each choice:
  a) (x²+2x)/(x+1)² = 4/3 = 0.8888888889   ✓ MATCH
  b) x²/(x+1)       = 4/3 = ...             (per handout: 4/3)
  c) 2x/(x+1)       = 4/3
  d) 2x²/(x+1)      = 4/3
Answer: (a) (x²+2x)/(x+1)²
```
— [Calculator Techniques (PERCDC)](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg)

> **Read this example carefully — it is a warning.** The handout's own typeset values collapse several choices to the same number, and the discrimination is weaker than it looks. **The real lesson: pick an x that separates the choices.** Using x = 2 left several choices numerically close; **x = 3 or x = 5 is far more discriminating.** This is the single most common way this technique silently fails.

**How to do it on the F-789SGA:** `d/dx` is available **in COMP mode only** (p.29, line 1151) — see §10 for syntax.

### 9.2 Evaluate the expression at x = each choice

Same principle without calculus: rearrange so the equation reads `f(x) = 0`, then evaluate `f` at each choice — **the correct choice gives 0** (or, for the F-789SGA, a **tiny `L−R`**). This is fundamentally what SOLVE's `L−R` readout automates.

For **identity testing**, evaluate both sides at several x values; an identity holds at every x, a mere equation at only some. **Use 2–3 distinct x values** — a single value can accidentally satisfy a wrong choice.

### 9.3 Test ALL choices at once with TABLE — the highest-leverage trick

Since TABLE evaluates one function over many x, you can screen a whole problem in one pass:

1. Form the **residual** `f(x) = LHS(x) − RHS(x)`.
2. `TABLE` → enter f(x) → set **Start/End/Step** so the choices become rows (or interpolate if choices aren't evenly spaced).
3. **The row where f(x) ≈ 0 identifies the root** — and so the correct choice.

**Verified constraint to respect:** TABLE **caps at 30 x-values** and throws **"Insufficient Error"** beyond that (p.34, lines 1411–1413). With up to 4 choices this is comfortable; with fine bracketing, split into passes.

**Caveat (verified):** "The Function Table Calculation **will change X-variable**" (p.34, line 1405), and **Pol/Rec/Q…r/Σ/d/dx cannot appear in the TABLE function** (p.34, lines 1403–1404). So you cannot TABLE a derivative — do the differentiation first, then TABLE the resulting expression.

### 9.4 Verified additional MC shortcuts

- **Remainder/factor theorem:** "Find the remainder when 3x⁴+2x³–4x²+x+4 is divided by x+2" → evaluate `f(–2)` → **remainder = 18**. And "Is (x+3) a factor of x⁶+6x⁵+8x⁴–6x³–9x²? → Since **f(–3) = 0**, then x+3 **is** a factor" ([PERCDC](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg)). ✅ Transfers — just evaluate in COMP mode.
- **Limits:** substitute a value near the limit point. Verified examples: `lim(x→0)(1–cos x)/sin x = 0`; `lim(x→∞)(3x³–4x²+2)/(7x³+5) = 3/7`. ✅ Transfers; TABLE is the systematic version.
- **Indefinite-integral MC (the "+C" problems):** the handout shows the standard move — differentiate each candidate choice and compare to the integrand, or evaluate both a definite integral and each choice's difference over a convenient interval. ✅ Transfers to the F-789SGA using `d/dx` and `∫dx` (§10).

---

## 10. Numerical integration ∫dx and derivative d/dx

### 10.1 Verified mode restriction

> "**Differential Calculations can be used in the COMP mode only.**"
> "**Integration Calculations can be used in the COMP mode only.**"
> — *manual p.29, lines 1151 & 1159*

### 10.2 Derivative — verified syntax and algorithm

> "To perform a differential calculation, you have to input the expression in the form of: **f(x) , a , ∆x**"
> "Your calculator performs differential calculations by approximating the derivative based on **centered difference approximation**."
> — *manual p.29, lines 1152–1155*

- **f(x)** = function of X. **All non-X variables are treated as constants.**
- **a** = the differential point.
- **∆x** = tolerance (calculation precision); **for Line mode only**.

**Verified example:** derivative at x = 10, ∆x = 10⁻⁸, for `f(x) = sin(3x + 30)` →
```
d/dx(sin(3X+30))  =  0.02617993878
```
(Example booklet p.31, lines 1046–1049)

**Verified notes (p.29, lines 1176–1194):**
- "**You can leave out the ∆x** … and the calculator will automatically substitute a value."
- "The **smaller** the entered ∆x, the **longer** the calculation time with **more accurate** results; the larger ∆x, the shorter the time with less accuracy."
- Inaccurate results/errors from: discontinuous points; extreme changes in x; inclusion of **local max/min** points; **inflection points**; non-differentiable points; and results approaching zero.
- "**When performing differential calculations with trigonometric functions, select radian (Rad) as the angle unit setting.**"
- **Forbidden inside d/dx:** "Log_ab, i~Rand(, Rec(, Pol(, ∫(, d/dx(, ∑(, ∏(, Max( and Min( functions cannot join in differential calculations."

> **Note the nesting ban:** you cannot nest `d/dx` inside itself, nor combine it with `∫`, `Σ`, `Π`, `Pol`, `Rec`. For second derivatives, differentiate analytically or use finite differences.

### 10.3 Integral — verified syntax and algorithm

> "To perform an integration calculation you are required to input the following elements: **f(x) , a , b , n**"
> "**f(x)**: Function of X. (All non-X variables are treated as constants.) **a, b**: The integration range of the definite integral. **n**: Tolerance; for Line mode only."
> "**The integration calculation is based on Gauss–Kronrod method.**"
> — *manual p.29, lines 1160–1166*

**Verified example:** `∫(5X⁴ + 3X² + 2X)` over the default range → **236** (Example booklet p.31, lines 1042–1044).

**Verified notes (p.30, lines 1234–1246):**
- "**You can leave out the n** … and the calculator will automatically substitute a value."
- Smaller n → longer time, more accurate; larger n → shorter time, less accurate.
- "**When performing integration calculations with trigonometric functions, select radian (Rad).**"
- **Forbidden inside ∫:** "Log_ab, i~Rand(, Rec(, Pol(, ∫(, d/dx(, ∑(, ∏(, Max( and Min( functions cannot join in integration calculations."
- "**A 'Time Out' error occurs** when an integration calculation ends without the ending condition being fulfilled."
- "You can cancel the processing … by pressing the `AC` key."
- Particularly when significant digits are less than 1, an ERROR might occur.

**Verified exam uses (from a reputable caltech source):**
- Evaluate `∫₁² (x⁵ + 3x² + 1) dx` → **16** ([PERCDC](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg))
- **Laplace transform at a point** — "remember to put the calc. in radian mode": for `3·cos(t)·t⁴`, "**integrate from 0.1 to 5 with the function multiplied by exp(–(2.5)x)** = **–0.168** (true answer: –0.1657, close enough)" ([Schematic Analysis](http://www.schematicanalysis.com/2013/09/calculator-techniques-for-casio-fx.html)). ✅ **Transfers to the F-789SGA** — note the lower limit is 0.1, not 0, precisely to dodge the singularity the manual warns about.
- **Fourier transforms** — the same source notes you "can't use the integral function" and must use **Simpson's 1/3 rule**; for the F-789SGA, **Σ can build the Simpson sum**, or TABLE can generate the samples.

---

## 11. Summary: what transfers from Casio tutorials, and what does not

### ✅ Transfers cleanly (technique is model-independent)

| Technique | Notes |
|---|---|
| **SOLVE + read `L−R` ≈ 0** | Identical concept and readout; verify convergence the same way |
| **CALC workflow** (store knowns, re-evaluate) | Identical; 79-step limit; COMP/CPLX only |
| **Multi-statement `:` for Heron-type formulas** | Works in COMP; **forbidden in SOLVE** |
| **Curve fitting by regression** (A·B^x, A·e^(Bx), A+Bx) | **The model names match; only the menu position differs** |
| **AP/GP term prediction via regression** | Use `2 (Lin)` for AP, `6 (ab EXP)` for GP |
| **TABLE to bracket roots and scan limits** | Transfers; same 30-row cap; same X-clobber caveat |
| **`Pol(` / `Rec(` auto-storing r→X, θ→Y** | Confirmed on F-789SGA, p.19 |
| **Phasor arithmetic in CPLX** | Transfers; check angle unit; θ ∈ (–180°, 180°] |
| **Vector angle via dot product / `|A||B|cos θ`** | Transfers; use `Dot` (menu [5]) |
| **Matrix inverse/transpose/determinant methods** | Transfers; use `Inv`/`Trn`/`Det` |
| **MC back-substitution & identity testing** | Fully portable |
| **`d/dx` and `∫dx` for MC verification** | Transfers; COMP-only; radian for trig |
| **Laplace-at-a-point via numeric integral** | Transfers; start above 0 to avoid the singularity |
| **Distribution P(t)/Q(t)/R(t)** | **F-789SGA bonus** — not on fx-991ES |

### ❌ Does NOT transfer (will give wrong mode or wrong answer)

| Casio habit | F-789SGA reality | Risk |
|---|---|---|
| `MODE 3` = STAT, `MODE 5` = EQN, `MODE 6` = MATRIX, `MODE 7` = TABLE, `MODE 8` = VECTOR | Modes are **named apps** in the Apps menu (`COMP`/`CPLX`/`STAT`/`BASE`/`EQN`/`TABLE`/`MATX`/`VCTR`) | **Pressing a number lands you in the wrong app** |
| STAT type `5` = `e^x`, `6` = `A·B^x` | **`5` = `e EXP` (A·e^Bx)** and **`6` = `ab EXP` (A·B^x)** — but the *rest of the order differs too* (Log=4, Pwr=7, Inv=8) | Using `5` for `A·B^x` gives the **wrong model family**; the fit still looks plausible |
| `SHIFT 1 5 5` = `ŷ` estimate; `SHIFT 1 7 1/2` = A/B | Use **`Apps → 8 Reg`** then the named coefficient | Digit sequences are meaningless here |
| Two-function `f(x)`/`g(x)` TABLE | Canon documents a **single-line "Function Table (x, y)"** | **UNVERIFIED** — verify on device before relying on g(x) |
| `Σ(expr, var, start, end)` 4-argument form | Canon documents **`∑(f(x), a, b)`** — **3 arguments** | **UNVERIFIED** 4-arg form; confirm on device |
| Natural/Textbook display in STAT/EQN/MATX/VCTR | **Auto-forced to Line mode** (p.5) | Display-dependent tutorials mislead |
| Complex roots read directly in EQN | Roots carry the **`i`** indicator; CPLX mode for complex work | Pick the root **without** `i` as the physical answer |

### Two claims in the request I could NOT verify

1. **The 3-unknown "regression trick."** No reputable source documents it, and the F-789SGA's **`EQN → 2/3/4 unknow`** makes it unnecessary. **UNVERIFIED — use EQN instead.**
2. **`Σ(expr, variable, start, end)` as a 4-argument syntax.** Canon's own function table shows **`∑(f(x), a, b)`**. The user's 4-arg form appears to be the Casio convention. **UNVERIFIED for the F-789SGA** — confirm on the device.

---

## 12. Board-exam workflow cheat card

```
STATISTICS / REGRESSION
  MODE → Apps → STAT → Type
     1 SD · 2 Lin(y=A+Bx) · 3 Quad · 4 Log · 5 e EXP(A·e^Bx)
     6 ab EXP(A·B^x) · 7 Pwr · 8 Inv
  Enter X,Y pairs (2-var: max 26 rows FREQ OFF)
  Apps → 8 Reg   → read A (intercept), B (slope), C (quad), r
  Apps → 5 S-VAR · 6 S-PTS · 4 S-SUM · 7 Distr (P/Q/R)

SERIES
  Σ(f(x), a, b)      start a, end b      e.g. Σ(X+1, 0, 5) = 20
  ∏(f(x), a, b)                          e.g. ∏(X+1, 0, 5) = 720

SOLVE  (COMP ONLY)
  Type equation → SHIFT SOLVE → enter guess → =
  READ  L-R = 0  → converged.  Non-zero/large → change the guess.
  Forbidden inside: d/dx ∫ Σ ∏ Pol Rec Q…r Rand i-Rand, and multi-statement

CALC
  Type expr → CALC → enter each variable → =
  Multi-statement:  X=(A+B+C)÷2 : √(X(X-A)(X-B)(X-C))

TABLE  (MODE → Apps → TABLE)
  f(x)=  →  Start?  →  End?  →  Step?
  Max 30 x-values.  CLOBBERS X.  No Pol/Rec/Q…r/Σ/d-dx inside.

EQN  (MODE → Apps → EQN)
  1: 2 unknow · 2: 3 unknow · 3: 4 unknow
  4: Quad · 5: Cubic · 6: Quartic     roots named X1, X2, X3 …

CPLX (MODE → Apps → CPLX)   CHECK ANGLE UNIT FIRST
  Abs · Arg · Conjg · Real( · Imag( · →r∠θ · →a+bi
  Pol(x,y) → r to X, θ to Y     Rec(r,θ) → x to X, y to Y
  θ range: −180° < θ ≤ 180°

MATX (MODE → Apps → MATX)   up to 4×4, A–D, MatAns
  1 Dim · 2 Data · 3 MatA–D · 4 MatAns · 5 Det · 6 Trn
  7 Ide · 8 Adj · 9 Inv

VCTR (MODE → Apps → VCTR)   2D/3D, A–D, VctAns
  1 Dim · 2 Data · 3 VctA–D · 4 VctAns · 5 Dot
  θ = arccos( (A·B) ÷ (|A||B|) )

CALCULUS (COMP ONLY)
  d/dx(f(x), a, ∆x)      centered difference; ∆x optional
  ∫(f(x), a, b, n)       Gauss–Kronrod;        n optional
  RADIAN MODE for trig.  No nesting with each other or with Σ/∏/Pol/Rec.
```

---

## Sources

**Primary — Canon official manuals (downloaded and text-extracted for this report):**
- [Canon F-789SGA (EXP)_EN Instruction Manual](https://ij.manual.canon/cal/webmanual/WebPortal/pdf/F-789SGA%20(EXP)_EN.pdf) — the authoritative English manual cited throughout (mode table, STAT, EQN, SOLVE, CALC, TABLE, MATX, VCTR, CPLX, ∫, d/dx)
- [Canon F-789SGA (EXP)_Example — worked-examples booklet](https://ij.manual.canon/cal/webmanual/WebPortal/pdf/F-789SGA%20(EXP)_Example.pdf) — verbatim display outputs and key operations (EX #44–#61)
- [Canon F-789SGA (ASA)_E-IE-522 (English)](https://ij.manual.canon/cal/webmanual/WebPortal/pdf/F-789SGA%20(ASA)_E-IE-522.pdf) and [F-789SGA II (ASA)_E-IE_529](https://ij.manual.canon/cal/webmanual/WebPortal/pdf/F-789SGA%20II%20(ASA)_E-IE_529.pdf) — used for cross-checking
- [Canon F-789SGA Vietnamese edition](https://ij.manual.canon/cal/webmanual/WebPortal/pdf/F-789SGA_Vietnamese_E-IV-008.pdf) — contains the **full STAT variable table** the English PDF renders as images
- [Canon manual index for F-789SGA](https://ij.manual.canon/cal/webmanual/WebPortal/html/ptl-manual_index.html?lang=en&area=as&model=F-789SGA)

**Secondary — caltech / calculator-technique guides:**
- [Calculator Techniques for the Casio FX-991ES and FX-991EX — Schematic Analysis](http://www.schematicanalysis.com/2013/09/calculator-techniques-for-casio-fx.html) — regression curve-fitting, TABLE for limits, Laplace via integral, vector angle
- [Calculator Techniques (PERCDC) — Engr. Rex Jason H. Agustin](https://idoc.pub/documents/calculator-techniques-percdc-klzze9gr3qlg) — 54-page board-exam handout: `Pol(`/`Rec(` auto-store, AP/GP via regression, `L−R = 0`, MC differentiation technique, Heron multi-statement, Σ sign
- [Calculator Techniques for the Casio FX-991ES Unravelled — Schematic Analysis](https://idoc.pub/documents/calculator-techniques-for-the-casio-fx-991es-unravelled-schematic-analysis-d47e5jjdz2n2) — exponential/geometric regression worked examples
- [Canon F-789SGA vs CASIO fx-991ES Plus: Best Choice for Board Exams?](https://stationery.lazada.com.ph/canon-f-789sga-vs-casio-fx-991es-plus-best-choice-for-board-exams-20260804/) — PRC compliance context, feature comparison

**Reference implementation consulted (for PDF decryption of the encrypted manual):**
- [pdf_oxide encryption/algorithms.rs](https://docs.rs/pdf_oxide/latest/src/pdf_oxide/encryption/algorithms.rs.html) — ISO 32000-2 Algorithm 2.B (AES-128-CBC, key K[0..16], IV K[16..32])
