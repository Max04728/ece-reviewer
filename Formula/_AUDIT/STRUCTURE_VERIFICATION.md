# Structure Verification — ECE Formula Sheet Vaults

- **Folder:** `C:\Users\Admin\Desktop\ECE_Reviewer\Formula`
- **Convention source:** `FORMULA_SHEET_STYLE_GUIDE.md` (read in full before checking)
- **Generated:** 2026-10-13 18:58:41 UTC
- **Checker:** `_AUDIT/check-formula-structure.mjs` (read-only; writes only this report)
- **Scope:** 33 subject files in Mathematics, Electronics_Engineering, EST, GEAS. Excluded as instructed: `00_Index.md` (4 files, reported separately in section 3 below), `.obsidian/`, `FORMULA_SHEET_STYLE_GUIDE.md`, `_AUDIT/`. The unrelated `PB/` PDF folder is also untouched.

## Method notes

- Every note is read as UTF-8 with the BOM stripped if present, split on `\r?\n`; the script runs entirely in-process (no subprocesses).
- **Math spans** are located by a single left-to-right scan per line: `$$` toggles display math, a lone `$` toggles inline math, and `\` escapes the following character. This is what makes `\lvert`/`\rvert` clean while a bare `|` is a violation.
- **Check 4** only looks at lines whose first non-space character is `|`, and only at `|` characters that fall *inside* a math span. Legitimate cell separators (outside math) and escaped pipes `\|` (wikilink aliases, LaTeX `\|`) are excluded by construction. Conditional-probability notation such as `$P(A|B)$` inside a table row *would* be reported — it breaks the table exactly like `$|z|>1$` does.
- **Check 3**: trailing whitespace is stripped from the last non-blank line before comparing to the expected back-link; a file may end with or without a final newline, and blank lines after the back-link are skipped.
- **Check 6** excludes all YAML frontmatter lines (`---` … `---`).
- **Check 9** flags `\usepackage` / `\newcommand` as literal text anywhere, and HTML tags restricted to a known-tag-name list, requiring the tag to be preceded by a non-word character and to contain no `$`, `\`, `|`, `{` or `}` in its attributes — so LaTeX inequalities like `$a<b$` are not misread as tags. HTML entities (`&nbsp;` etc.), `\def`, `\renewcommand`, `\DeclareMathOperator` and `\newenvironment` were separately probed and found nowhere.
- No subject file contains a code fence, so no content was skipped as fenced code.
- **Snapshot integrity:** every note is SHA-256 hashed on read and re-read after all checks finish. **No file changed during the audit** — all 37 notes are a single consistent revision. Other files (`_AUDIT/pb-text/`, `_AUDIT/check-note-delta.mjs`, `_AUDIT/VARIABLE_DEFINITION_COVERAGE.md`) were being written by a concurrent process during this run; they are outside the audited scope.

### Independent cross-checks of the clean results

Because four checks returning zero on a corpus this size is a claim worth distrusting, the two most "surprising" clean results were re-verified with a **second, independent algorithm** (regex-delimited math spans on table lines, rather than the delimiter-toggling scanner):

| Cross-check | Method | Result |
|---|---|---|
| Check 4 (pipes) | Extracted every `$…$` / `$$…$$` span on all lines starting with `|`, then counted bare vs escaped `|` in each span | **2 228 table rows, 1 741 math spans inside them, 0 spans with a bare `|`.** 144 lines in the folder do contain `\|` (all of them escaped wikilink-alias pipes). Two further raw scans for `$|`, `|$` and `|` adjacent to a math delimiter on table rows also returned nothing. |
| Check 5 (Conditions) | Re-segmented each file by `### ` heading and counted `**Conditions:**` hits per segment, independent of the main scanner | **452 topics, 452 with exactly one line, 0 with zero, 0 with more than one.** |
| Check 2 (topic counts) | Summed every `topics:` value and compared to the total `###` heading count | **452 = 452** (132 + 119 + 99 + 102, indices included). |

## 1. "Must be zero" summary

Counts cover the 33 subject files only, except where marked. "Violations" is in the natural unit of each check (files / topics / lines).

| # | Check | Violations | Files affected | Status |
|---|---|---:|---:|---|
| 1 | Frontmatter keys | 0 | 0 | **CLEAN** |
| 2 | `topics:` == `###` count | 0 | 0 | **CLEAN** |
| 3 | Back-link last line | 0 | 0 | **CLEAN** |
| 4 | Unescaped `|` in math in table rows | 0 | 0 | **CLEAN** |
| 5 | Exactly one `**Conditions:**` per topic | 0 | 0 | **CLEAN** |
| 6 | Lines > 180 chars (informational) | 427 | 33 | informational (33 files) |
| 7 | Callouts outside 4–6 | 20 | 20 | **VIOLATIONS** |
| 8 | `### <n>. <Name>` numbering | 2 | 1 | **VIOLATIONS** |
| 9 | Forbidden `\usepackage`/`\newcommand`/HTML | 0 | 0 | **CLEAN** |

**Completely clean (0 violations across all 33 subject files):** #1 (Frontmatter keys), #2 (`topics:` == `###` count), #3 (Back-link last line), #4 (Unescaped `|` in math in table rows), #5 (Exactly one `**Conditions:**` per topic), #9 (Forbidden `\usepackage`/`\newcommand`/HTML).

**Found violations:** #7 (Callouts outside 4–6), #8 (`### <n>. <Name>` numbering).

**Check 6 is informational by design** — the guide permits `**Conditions:**` lines and the occasional callout to exceed 180 characters, so a non-zero count is not automatically a defect. It is many long `**Conditions:**` lines rather than 400-char walls: the longest is 439 chars.

---

## 2. Per-check detail

Each subsection below corresponds to the numbered check in the brief. "CLEAN" means zero violations across all 33 subject files; otherwise every violation is listed with file, line number and offending text (truncated to 200 characters where longer).

### Check 1 — Frontmatter

**CLEAN — 0 violations.** No file deviates.

Required keys, in order, no extras: `title`, `part`, `tags`, `topics`. On `00_Index.md`, `moc` goes *inside* `tags:` (guide §2). See section 4, caveat 1, on the guide's "five keys" wording.

### Check 2 — Topic count (`topics:` vs `###` headings)

**CLEAN — 0 violations.** No file deviates.

Format required by the brief: `file: frontmatter=N actual=M`.

### Check 3 — Back-link as last line

**CLEAN — 0 violations.** No file deviates.

Expected last non-blank line, after stripping trailing whitespace: `→ Back to [[00_Index]]`

### Check 4 — Unescaped pipes inside math inside table rows

**CLEAN — 0 violations.** No file deviates.

The guide calls this "the single most common rendering bug". Fix: `\lvert z\rvert>1`, never `$|z|>1$`.

### Check 5 — Exactly one `**Conditions:**` line per topic

**CLEAN — 0 violations.** No file deviates.

Guide §4: exactly one per topic; two are permitted *only* when one line cannot stay under ~180 characters. Topics with two are listed so that exception can be judged case by case.

### Check 6 — Lines longer than 180 characters

**427 over-length lines across 33 files.**

Per the brief, counts only; the lines themselves are listed only for files with more than 20 long lines.

| File | Long lines (> 180 chars) |
|---|---:|
| `Mathematics/01_Differential_Calculus.md` | 2 |
| `Mathematics/02_Integral_Calculus.md` | 8 |
| `Mathematics/03_Differential_Equations.md` | 6 |
| `Mathematics/04_Advanced_Engineering_Math.md` | 22 |
| `Mathematics/05_Electromagnetics.md` | 19 |
| `Mathematics/06_Control_Systems.md` | 1 |
| `Mathematics/07_Signals_and_Systems.md` | 11 |
| `Mathematics/08_Numerical_Methods_and_Analysis.md` | 4 |
| `Mathematics/09_Engineering_Data_Analysis.md` | 22 |
| `Electronics_Engineering/01_DC_Circuits.md` | 5 |
| `Electronics_Engineering/02_AC_Circuits.md` | 5 |
| `Electronics_Engineering/03_Two_Port_Networks.md` | 3 |
| `Electronics_Engineering/04_Semiconductor_Devices.md` | 9 |
| `Electronics_Engineering/05_Circuit_Analysis_and_Design.md` | 12 |
| `Electronics_Engineering/06_Power_Electronics_and_Systems.md` | 8 |
| `Electronics_Engineering/07_Industrial_Automation_and_Sensors.md` | 20 |
| `Electronics_Engineering/08_Logic_Circuits_and_Switching.md` | 21 |
| `Electronics_Engineering/09_Microprocessors_and_Embedded.md` | 11 |
| `EST/01_Signals_Spectra_and_Noise.md` | 4 |
| `EST/02_Principles_of_Communications.md` | 4 |
| `EST/03_Digital_Communications.md` | 11 |
| `EST/04_Data_Communications_and_Networking.md` | 26 |
| `EST/05_Transmission_Lines_and_Waveguides.md` | 24 |
| `EST/06_Antenna_Systems_and_Propagation.md` | 46 |
| `EST/07_Industrial_Automation_and_Instrumentation.md` | 23 |
| `GEAS/01_General_Chemistry.md` | 7 |
| `GEAS/02_University_Physics.md` | 14 |
| `GEAS/03_Materials_Science.md` | 13 |
| `GEAS/04_Environmental_Sci_and_PH_Laws.md` | 11 |
| `GEAS/05_Engineering_Economy.md` | 18 |
| `GEAS/06_Engineering_Management_and_PM.md` | 6 |
| `GEAS/07_ECE_Laws_and_Professional_Ethics.md` | 14 |
| `GEAS/08_Computer_Systems_OOP_and_CAD.md` | 17 |

### Files with more than 20 over-length lines (7)

**`Mathematics/04_Advanced_Engineering_Math.md` — 22 lines over 180 chars**

| Line | Length | Content (truncated to 200 chars) |
|---:|---:|---|
| 20 | 240 | `$$\theta=\begin{cases}\tan^{-1}\frac{y}{x}, & x>0\\[2pt] \tan^{-1}\frac{y}{x}+180^{\circ}, & x<0\end{cases}\qquad \text{Quadrant I}\ +\theta,\ \text{II}\ 180^{\circ}-\lvert\theta\rvert,\ \text{III}\ \ …[+40 chars]` |
| 46 | 296 | `**Conditions:** $x,y\in\mathbb{R}$, $j^{2}=-1$, $r=\lvert z\rvert\ge0$; the argument must be quadrant-corrected with $\theta=\operatorname{atan2}(y,x)$ — add $180^{\circ}$ when $x<0$; $z\neq0$ is requ …[+96 chars]` |
| 49 | 223 | `> $\sqrt[n]{z}$ yields exactly $n$ distinct roots equally spaced by $2\pi/n$ on a circle of radius $r^{1/n}$. Exam items usually ask for the product/sum of all roots — by symmetry it is $(-1)^{n+1}$ t …[+23 chars]` |
| 128 | 310 | `**Conditions:** comparison and integral tests need eventually positive terms, and the integral test also needs $a_n$ eventually decreasing; the ratio and root tests are inconclusive at $L=1$; absolute …[+110 chars]` |
| 248 | 299 | `**Conditions:** error bounds assume the stated derivatives are continuous on $[a,b]$ with $\xi$ unknown in $(a,b)$; the alternating-series bound applies only when terms decrease monotonically to zero; …[+99 chars]` |
| 251 | 185 | `> Board items give $\lvert x\rvert<0.1$ and ask for the number of terms. Compare the next term against the tolerance — the alternating series error is bounded by the first omitted term.` |
| 369 | 370 | `**Conditions:** $f$ piecewise continuous and of exponential order with $\operatorname{Re}s>\sigma_0$; the $s$-shift takes real $a$; the $t$-shift requires $f(t-a)u(t-a)$, never $f(t-a)$ alone; differe …[+170 chars]` |
| 372 | 187 | `> The final value theorem requires all poles of $sF(s)$ in the open left half-plane (except a simple pole at $s=0$). Applying it to an unstable or oscillatory $F(s)$ gives a false answer.` |
| 427 | 260 | `**Conditions:** $u(t-a)=0$ for $t<a$ and $1$ for $t>a$, undefined at $t=a$; $\delta$ is a distribution defined only under an integral, with $\int\delta(t-a)\,dt=1$; the periodic transform needs $f(t+T …[+60 chars]` |
| 498 | 185 | `> **Verified:** the formula $A_i=N(p_i)/D'(p_i)$ is the standard residue at a simple pole, and `EQN` returns polynomial roots exactly — so the poles and the coefficients are both exact.` |
| 573 | 308 | `**Conditions:** $f$ piecewise smooth on $(0,L)$; the cosine series is the even extension and the sine series the odd extension, both periodic with period $2L$; at a jump each series converges to the m …[+108 chars]` |
| 610 | 222 | `$$\operatorname{rect}\!\left(\frac{t}{\tau}\right)\leftrightarrow \tau\operatorname{sinc}\!\left(\frac{\omega\tau}{2}\right),\qquad \operatorname{sinc}(x)=\frac{\sin x}{x}\ \text{(unnormalized, }\omeg …[+22 chars]` |
| 612 | 354 | `**Convention cross-check** — this file uses the **unnormalized** $\operatorname{sinc}(x)=\sin x/x$ with $\omega$ in rad/s, so the transform is $\tau\operatorname{sinc}(\omega\tau/2)$. [[07_Signals_and …[+154 chars]` |
| 709 | 218 | `$$\begin{vmatrix}a_1&b_1&c_1\\ a_2&b_2&c_2\\ a_3&b_3&c_3\end{vmatrix}=a_1\begin{vmatrix}b_2&c_2\\ b_3&c_3\end{vmatrix}-b_1\begin{vmatrix}a_2&c_2\\ a_3&c_3\end{vmatrix}+c_1\begin{vmatrix}a_2&b_2\\ a_3& …[+18 chars]` |
| 766 | 309 | `> **Eigenvalues:** `Det(` is a MATX-mode function and `SOLVE` is COMP-only, so you **cannot** put a matrix determinant inside `SOLVE`. Expand $\det(A-\lambda I)$ into a scalar polynomial first, then e …[+109 chars]` |
| 780 | 214 | `$$x=\frac{\begin{vmatrix}c_1&b_1\\ c_2&b_2\end{vmatrix}}{\begin{vmatrix}a_1&b_1\\ a_2&b_2\end{vmatrix}},\qquad y=\frac{\begin{vmatrix}a_1&c_1\\ a_2&c_2\end{vmatrix}}{\begin{vmatrix}a_1&b_1\\ a_2&b_2\e …[+14 chars]` |
| 794 | 315 | `**Conditions:** $A$ square with $\det A\neq0$ for Cramer's rule to apply at all; when $\det A=0$ the system is inconsistent or has infinitely many solutions, decided by comparing $\operatorname{rank}A …[+115 chars]` |
| 801 | 186 | `> Polynomial items take the same menu: `4`/`5`/`6` for quadratic/cubic/quartic, which replaces the quadratic formula and synthetic division. Complex roots surface with the `i` indicator.` |
| 848 | 204 | `- $c_i$ — coefficient of $\lambda^{i}$ in the characteristic polynomial $\det(\lambda I-A)$, in the units of the entries of $A$ to the power $n-i$ (dimensionless when the entries of $A$ are dimensionl …[+4 chars]` |
| 860 | 331 | `**Stability link** — CT system is stable iff $\operatorname{Re}\lambda_i<0$; DT system is stable iff $\lvert\lambda_i\rvert<1$. See [[06_Control_Systems#14. State Space Representation Basics\|State Spa …[+131 chars]` |
| 862 | 317 | `**Conditions:** $\det(A-\lambda I)=0$ gives $n$ eigenvalues counting multiplicity over $\mathbb{C}$; the eigenvector basis exists only when $A$ is diagonalisable ($n$ independent eigenvectors) — defec …[+117 chars]` |
| 896 | 285 | `**Conditions:** the general equation is quadratic in $x,y$; the discriminant test $B^2-4AC$ is the same classification used for second-order PDEs; an ellipse needs $2a>\lvert z_1-z_2\rvert$, a hyperbo …[+85 chars]` |

**`Mathematics/09_Engineering_Data_Analysis.md` — 22 lines over 180 chars**

| Line | Length | Content (truncated to 200 chars) |
|---:|---:|---|
| 27 | 282 | `**Conditions:** $\bar x$ uses sample size $n$ and $\mu$ population size $N$; grouped formulas assume equal class widths, with $L,F,f_m,w$ the class lower bound, cumulative frequency before the class,  …[+82 chars]` |
| 49 | 263 | `**Conditions:** sample $s^{2}$ divides by $n-1$ (Bessel) and population $\sigma^{2}$ by $N$ — never mix them; CV is undefined at $\bar x=0$; the $1.5\,IQR$ fences suit roughly symmetric data (use quan …[+63 chars]` |
| 55 | 211 | `> `MODE` → STAT → `Type` `1` SD → enter the data → Statistical Menu → `S-VAR` gives $\bar x$, $s_x$ (the $n-1$ **sample** SD), $\sigma_x$ (the $N$ **population** SD), $n$, and `S-SUM` gives $\sum x$,  …[+11 chars]` |
| 56 | 211 | `> So $s^2$ is `s_x²`, $\sigma^2$ is `σ_x²`, and $CV$ is `s_x/x̄ ×100`. **Bessel vs population is chosen by which variable you read** — the calculator keeps both, which is exactly the trap this topic w …[+11 chars]` |
| 83 | 292 | `**Conditions:** $n,r\ge0$ with $r\le n$; order matters for permutations and not for combinations; circular arrangements fix one object to remove rotational duplicates and necklaces additionally identi …[+92 chars]` |
| 213 | 344 | `**Conditions:** Poisson requires rare independent events at a constant rate with mean $=$ variance $=\lambda$ and $\lambda=rt$; the binomial-to-Poisson approximation needs $n\ge20$, $p\le0.05$ (or $n\ …[+144 chars]` |
| 288 | 338 | `**Conditions:** $z=(x-\mu)/\sigma$ needs a normal (or approximately normal) population; apply the $\pm0.5$ continuity correction before standardising a discrete variable; quoted areas are two-sided fo …[+138 chars]` |
| 294 | 217 | `> Enter the data in STAT, then open **`Distr`** (`Apps`): it computes `P(t)`, `Q(t)` and `R(t)`, where $P(t)$ = probability **below** $x$, $Q(t)$ = **between the mean and** $x$, and $R(t)$ = probabili …[+17 chars]` |
| 295 | 398 | `> **It standardises with the population $\sigma$, not the sample $s$** — confirmed against the manual's own worked example (data $20,43,26,46,20,43$, $x=26$ → $t=-0.6236095645$, $P=0.26644$, which is  …[+198 chars]` |
| 350 | 319 | `**Conditions:** $\sigma_{\bar x}=\sigma/\sqrt n$ assumes random sampling with replacement or an infinite population — apply the FPC $\sqrt{(N-n)/(N-1)}$ otherwise; $\bar x$ is exactly normal only for  …[+119 chars]` |
| 414 | 182 | `For a normal sample $\hat\mu=\bar x$ and $\hat\sigma^{2}=\frac1n\sum(x_i-\bar x)^2$ — note the MLE of $\sigma^{2}$ divides by $n$, unlike the unbiased $s^{2}$ which divides by $n-1$.` |
| 416 | 311 | `**Conditions:** use $z_{\alpha/2}$ when $\sigma$ is known or $n\gtrsim30$, and $t_{\alpha/2,\nu}$ with $\nu=n-1$ when $\sigma$ is estimated from a small sample; the $t$ interval assumes a normal popul …[+111 chars]` |
| 465 | 303 | `**Conditions:** $H_0$ is assumed true throughout; halve $\alpha$ for a two-tailed critical value; the $z$ test needs known $\sigma$ or $n\gtrsim30$, the $t$ test an approximately normal population, an …[+103 chars]` |
| 529 | 304 | `**Conditions:** least squares and $r$ require a linear relationship and independent observations, plus normal constant-variance residuals for inference; $r$ measures linear association only and is out …[+104 chars]` |
| 533 | 219 | `> `S-SUM` supplies $\sum x$, $\sum x^2$, $\sum y$, $\sum y^2$, $\sum xy$ and `S-VAR` supplies $\bar x$, $s_x$, $s_y$, $n$, so $S_{xy}$, $S_{xx}$, $s_e$ and $t=b/s_b$ are all one-line evaluations of th …[+19 chars]` |
| 539 | 217 | `> The STAT menu's **`Distr`** submenu gives $P(t)$, $Q(t)$, $R(t)$ (below $x$; mean-to-$x$; above $x$) from the data, standardising with the **population $\sigma$** — so read `σ_x`, not `s_x`, if you  …[+17 chars]` |
| 541 | 225 | `> **Verified:** the manual's own example, data $20,43,26,46,20,43$ at $x=26$, returns $P=0.26644$ — reproduced only by the population $\sigma$. In this file's running trap, that is the honest Bessel-v …[+25 chars]` |
| 630 | 208 | `**Taguchi and orthogonal arrays** — nominal-is-best maximises $S/N=10\log_{10}\!\big(\bar y^{2}/s^{2}\big)$; $L_8(2^{7})$ handles up to seven two-level factors and $L_9(3^{4})$ up to four three-level  …[+8 chars]` |
| 632 | 403 | `**Conditions:** ANOVA assumes independent normal errors with equal variance and independent observations; reject $H_0$ iff $F>F_{\alpha,k-1,N-k}$ (one-sided upper tail — $F$ is not bounded below by 1) …[+203 chars]` |
| 635 | 213 | `> A significant $F$ says "some means differ" — follow with Tukey HSD $= q_{\alpha,k,N-k}\sqrt{\dfrac{MSE}{n}}$ to locate the pair. Do not expect $F>1$: under $H_0$, $F$ is centred near 1 and is routin …[+13 chars]` |
| 639 | 190 | `- $q_\alpha$ — studentized-range critical value for Tukey's HSD, $q_{\alpha,k,N-k}$, at significance level $\alpha$ with $k$ treatment means and $N-k$ error degrees of freedom, dimensionless` |
| 644 | 221 | `> For $SSA$ there is no array to feed a `Σ`, so read each $\bar y_i$ from `S-VAR` by **re-entering one group at a time**, then accumulate $n_i(\bar y_i-\bar y)^2$ into a letter variable — four treatme …[+21 chars]` |

**`Electronics_Engineering/08_Logic_Circuits_and_Switching.md` — 21 lines over 180 chars**

| Line | Length | Content (truncated to 200 chars) |
|---:|---:|---|
| 49 | 199 | `**Conditions:** radix point separates integer and fractional parts; conversion errors arise only from truncating a repeating fraction; base conversion preserves the value, not the digit count. #logic` |
| 90 | 195 | `**Conditions:** two's complement is the standard for ALU arithmetic; overflow is detected by the XOR of the carry into and out of the sign bit; the negation of the minimum value overflows. #logic` |
| 131 | 193 | `**Conditions:** Gray code changes only one bit between adjacent values, so it prevents race errors in encoders; parity detects an odd number of bit errors only and cannot correct. #logic #codes` |
| 210 | 195 | `**Conditions:** for $n$ variables there are $2^n$ minterms and $2^n$ maxterms; $F=\Sigma m$ equals $\Pi M$ of the complementary index set; a minterm index reads the binary row as a number. #logic` |
| 261 | 191 | `**Conditions:** group only in powers of two, groups may overlap, and use the fewest groups with the largest possible size; don't-cares may be treated as $1$ or $0$ as convenient. #kmap #logic` |
| 264 | 192 | `> Largest groups first, fewest groups total. A 4-cell group kills 2 variables and a full 8-cell wrap kills 3 — reading a K-map starts by hunting for the biggest legal group, not the first one.` |
| 345 | 221 | `**Conditions:** a plain encoder assumes exactly one active input; valid-line and priority logic are required when multiple inputs may be active; decoders are commonly used with OR gates to synthesize  …[+21 chars]` |
| 384 | 207 | `**Conditions:** exactly one select code is active; unused data inputs must be tied to a defined level; a $2^n{:}1$ MUX implements any $n$-variable function with the truth-table bits on the data lines. …[+7 chars]` |
| 387 | 187 | `> On a MUX, the **select inputs carry the minterm index** while the data inputs hold the function value. Swapping which lines are select versus data is the usual MUX implementation error.` |
| 451 | 221 | `**Conditions:** level-sensitive latches are transparent while enabled; edge-triggered flip-flops sample only at the clock edge; the $S=R=1$ state is invalid for a NOR SR latch because both outputs go  …[+21 chars]` |
| 512 | 194 | `**Conditions:** positive slack is required for reliable capture; skew is positive when the destination clock arrives later; hold violations cannot be fixed by slowing the clock. #logic #flipflop` |
| 552 | 229 | `**Conditions:** all stages share one clock; a ring counter must be initialized to a single 1 (self-correcting versions use feedback logic); a Johnson counter needs $2n$ states and decodes with 2-input …[+29 chars]` |
| 618 | 208 | `A single 1 circulates; output of the last stage feeds the first directly. Propagation delay is **independent of $N$**, so it runs faster than a binary counter of the same length, but it needs more fli …[+8 chars]` |
| 624 | 192 | `Last stage is fed back **inverted**. Self-initializes from the all-zeros state and produces a **Gray-code** sequence (adjacent states differ by one bit), so it can be sampled without glitches.` |
| 654 | 312 | `**Conditions:** ripple counters accumulate propagation delay, so decoded outputs can glitch — synchronous (or ring/Johnson) counters are preferred whenever decoded states drive logic. Unused states in …[+112 chars]` |
| 657 | 213 | `> Ring vs Johnson is the most commonly swapped pair: a straight ring counter has **$N$** states (one-hot), a Johnson counter has **$2N$**. So a 4-flip-flop ring gives MOD-4 while a 4-flip-flop Johnson …[+13 chars]` |
| 660 | 212 | `> To find the flip-flop count, use $n\ge\lceil\log_2M\rceil$: MOD-10 needs 4 (not 3), and MOD-6 needs 3. A synchronous counter's speed limit is set by the **count-enable logic** path, not by the numbe …[+12 chars]` |
| 697 | 228 | `**Conditions:** Mealy outputs can change asynchronously with the input, so they need care in glitch-free designs; Moore outputs are registered and inherently cleaner; unused states must be given expli …[+28 chars]` |
| 736 | 211 | `**Conditions:** every ASM block occupies exactly one clock period; a state box with attached decision boxes forms a single block; the ASM chart maps directly to the FSM's next-state and output logic.  …[+11 chars]` |
| 809 | 185 | `**Conditions:** CMOS inputs must never float (they oscillate and draw current); TTL inputs float HIGH; $PDP$ (J) is the standard figure of merit for comparing families. #logic #families` |
| 850 | 289 | `**Conditions:** hazards are delay-dependent, so adding $BC$ closes the static-1 hazard in two-level SOP while a static-0 hazard needs the dual product-of-sums closure; a critical race is cured by a ra …[+89 chars]` |

**`EST/04_Data_Communications_and_Networking.md` — 26 lines over 180 chars**

| Line | Length | Content (truncated to 200 chars) |
|---:|---:|---|
| 119 | 185 | `**Conditions:** sliding window with window size $W\ge1+2a$ saturates the link (utilization 1); byte-count framing is fragile because a corrupted count destroys synchronization. #framing` |
| 159 | 197 | `**Conditions:** error-free first pass for utilization formulas; GBN wastes bandwidth on retransmission bursts, so SR wins on noisy high-$a$ links but needs buffering and larger sequence space. #arq` |
| 205 | 184 | `**Conditions:** HDLC is bit-oriented and synchronous with balanced (ABM) or unbalanced (ARM) modes; PPP is byte-oriented and carries a protocol field to multiplex network layers. #hdlc` |
| 271 | 317 | `**Conditions:** CSMA/CD applies to half-duplex shared media only; switched full-duplex links have no collisions, and Gigabit Ethernet can drop carrier extension/carrier sense padding; STP places every …[+117 chars]` |
| 313 | 185 | `**Conditions:** CSMA/CA avoids rather than detects collisions (a wireless station cannot hear collisions while transmitting); RTS/CTS optionally mitigates the hidden-node problem. #wlan` |
| 327 | 205 | `$$T_{circuit}=T_{setup}+\frac{M}{R}\ \text{(s)},\qquad T_{packet}=\sum_{i=1}^{h}\Bigl(\frac{L_i}{R_i}+T_{prop,i}\Bigr)\ \text{(s)},\qquad \text{message: } T=\frac{M}{R}\cdot h\ \text{(store-and-forwar …[+5 chars]` |
| 339 | 193 | `**Conditions:** packet switching multiplexes statistically, so queueing delay grows with utilization; datagram service gives no ordering guarantee while virtual-circuit service does. #switching` |
| 382 | 205 | `**Conditions:** the first octet determines the class in classful addressing; classful routing is obsolete, but class boundaries still matter for default masks and for reading legacy exam items. #subne …[+5 chars]` |
| 417 | 182 | `**Conditions:** VLSM subnets a subnet, so allocate from the largest block down to avoid fragmentation; CIDR requires contiguous, power-of-two-aligned blocks to summarize. #subnetting` |
| 428 | 188 | `$$IPv6=\underbrace{8\ \text{fields}\times16\ \text{bits}}_{\text{fixed }40\ \text{B}},\qquad \text{address}=8\ \text{groups}\times16\ \text{bits}=128\ \text{bits},\qquad N_{addr}=2^{128}$$` |
| 452 | 196 | `$$/64\ \text{standard LAN prefix},\qquad 2^{64}\ \text{hosts per subnet},\qquad SLAAC:\ \text{prefix}_{64}+EUI\text{-}64\ \text{interface ID},\qquad \text{tunnel/dual-stack/NAT64 for transition}$$` |
| 496 | 186 | `**Conditions:** Bellman-Ford converges to the correct shortest paths but reacts slowly to bad news; link-state floods LSAs so every router builds an identical topology database. #routing` |
| 539 | 219 | `**Conditions:** TCP is connection-oriented with sequencing, ACKs, retransmission and flow control; UDP is connectionless with an 8 B header and no reliability, used for DNS queries, DHCP, TFTP, RTP an …[+19 chars]` |
| 589 | 185 | `**Conditions:** T1 uses alternate mark inversion with B8ZS and a 193rd framing bit; E1 uses HDB3 with timeslot 0 for framing/sync and timeslot 16 for signaling (30 voice channels). #mux` |
| 634 | 182 | `**Conditions:** DWDM needs temperature-stabilized lasers and EDFA amplification; channel spacing on the ITU grid is defined in frequency (100 GHz $\approx$ 0.8 nm at 1550 nm). #fiber` |
| 646 | 190 | `$$C_{FDMA}=\frac{BW_{total}}{BW_{ch}}\ \text{channels},\qquad C_{TDMA}=\frac{\text{frames}}{\text{slot}}\ \text{per frame},\qquad C_{CDMA}\approx\frac{BW}{R}\cdot\frac{1}{E_b/N_0}\cdot G_p$$` |
| 664 | 197 | `$G_p$ dimensionless (processing gain, chips per bit), $T_b$ in s (bit), $T_c$ in s (chip), $N_{max}$ dimensionless (simultaneous users), $d(t)$ dimensionless (data), $c(t)$ dimensionless (PN code).` |
| 677 | 197 | `**Conditions:** CDMA capacity is interference-limited, not hard-limited, so every added user raises the noise floor; strict power control is what keeps the near-far effect in check. #cdma #cellular` |
| 715 | 191 | `**Conditions:** OFDM subcarriers stay orthogonal only with accurate frequency sync; a cyclic prefix longer than the channel delay spread removes ISI at the cost of spectral efficiency. #ofdma` |
| 729 | 277 | `$N$ dimensionless (cluster size), $i,j$ nonnegative integers, $D$ in m (reuse distance), $R$ in m (cell radius), $Q$ dimensionless (co-channel reuse ratio), $C$ dimensionless (total channels), $M$ dim …[+77 chars]` |
| 750 | 198 | `**Conditions:** hexagonal cell model with omnidirectional base antennas and the six nearest co-channel interferers; $SIR$ rises as $N^{n/2}$, so larger clusters trade capacity for quality. #cellular` |
| 783 | 183 | `$$4G:\ \approx20\text{–}30\ \text{ms},\qquad 5G\ \text{URLLC}:\ 1\ \text{ms},\qquad 5G\ \text{eMBB}\ \text{peak}\ 20\ \text{Gbit/s},\qquad \text{connection density }10^6/\text{km}^2$$` |
| 791 | 204 | `**Conditions:** 2G/3G are circuit-switched at the voice level with packet overlays, while 4G/5G are all-IP; 5G splits into eMBB, URLLC and mMTC service classes sharing the same NR air interface. #cell …[+4 chars]` |
| 794 | 181 | `> Frequency reuse factor is $1/N$ (channels per cell), not $N$. Cluster size $N$ larger means a larger reuse distance and lower co-channel interference, but fewer channels per cell.` |
| 824 | 249 | `**Conditions:** counted for point-to-point duplex links with no shared-medium or repeater limits; a full mesh buys the highest availability at $O(N^2)$ link cost, while bus, star and tree are cheapest …[+49 chars]` |
| 888 | 325 | `**Conditions:** symmetric and asymmetric primitives are complementary (asymmetric exchanges the key, symmetric encrypts the payload); RSA and Diffie-Hellman rest on the hardness of factoring and of th …[+125 chars]` |

**`EST/05_Transmission_Lines_and_Waveguides.md` — 24 lines over 180 chars**

| Line | Length | Content (truncated to 200 chars) |
|---:|---:|---|
| 30 | 204 | `$a$ in m (inner conductor radius), $b$ in m (outer conductor radius), $\mu$ in H/m, $\epsilon$ in F/m, $\sigma$ in S/m (conductor), $\sigma_d$ in S/m (dielectric), $f$ in Hz, $R_s$ in $\Omega$ per squ …[+4 chars]` |
| 34 | 209 | `$$L_{2wire}=\frac{\mu}{\pi}\ln\frac{D}{a}\ \text{(H/m)},\qquad C_{2wire}=\frac{\pi\epsilon}{\ln(D/a)}\ \text{(F/m)},\qquad \epsilon_{eff}=\frac{\epsilon_r+1}{2}+\frac{\epsilon_r-1}{2}\frac{1}{\sqrt{1+ …[+9 chars]` |
| 36 | 188 | `$D$ in m (wire separation), $a$ in m (wire radius), $\epsilon_r$ dimensionless (relative permittivity), $h$ in m (substrate height), $w$ in m (trace width), $\epsilon_{eff}$ dimensionless.` |
| 47 | 310 | `**Conditions:** TEM propagation with a uniform cross-section and $R\ll\omega L$, $G\ll\omega C$ at the frequency of interest; $R_s\propto\sqrt{f}$ gives the $\sqrt{f}$ loss growth of copper lines; the …[+110 chars]` |
| 65 | 184 | `$$Z_0=\sqrt{\frac{L}{C}}\ \text{(}\Omega\text{)},\qquad \alpha=0,\qquad \beta=\omega\sqrt{LC}\ \text{(rad/m)},\qquad v_p=\frac{1}{\sqrt{LC}}=\frac{c}{\sqrt{\epsilon_r}}\ \text{(m/s)}$$` |
| 71 | 193 | `$$\alpha_c=\frac{R}{2Z_0}\ \text{(Np/m)},\qquad \alpha_d=\frac{GZ_0}{2}\ \text{(Np/m)},\qquad \alpha_{dB}=8.686\,\alpha_{Np}\ \text{(dB/m)},\qquad VF=\frac{v_p}{c}=\frac{1}{\sqrt{\epsilon_r}}$$` |
| 75 | 199 | `**Conditions:** $\gamma$ and $Z_0$ are complex for a general line; the lossless forms apply when $\omega L\gg R$ and $\omega C\gg G$, and $\alpha$ adds in Np/m while dB/m adds directly. #transmission` |
| 95 | 183 | `$R/L$ and $G/C$ in s$^{-1}$, $\alpha$ in Np/m, $\beta$ in rad/m; when $R/L=G/C$ the attenuation is flat and $\beta$ is linear in $\omega$, so all frequencies travel at the same $v_p$.` |
| 103 | 199 | `**Conditions:** the distortionless line needs no loading network when $RC=GL$ holds; real cables often satisfy it approximately by adding series inductance (Pupin loading) to raise $L$. #transmission` |
| 121 | 184 | `$$VSWR=\frac{V_{max}}{V_{min}}=\frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert},\qquad \lvert\Gamma\rvert=\frac{VSWR-1}{VSWR+1},\qquad RL=-20\log_{10}\lvert\Gamma\rvert\ \text{(dB)}$$` |
| 137 | 202 | `> $VSWR=\frac{1+\lvert\Gamma\rvert}{1-\lvert\Gamma\rvert}$ and $\lvert\Gamma\rvert=\frac{VSWR-1}{VSWR+1}$ are inverses — memorize one and derive the other; a VSWR of 2.0 means 11% of the power reflect …[+2 chars]` |
| 161 | 289 | `$$Z_{0,\lambda/4}=\sqrt{Z_{in}Z_L}\ \text{(}\Omega\text{)},\qquad BW\propto\frac{1}{Q},\qquad \Gamma_{max}\ \text{rises as }f\ \text{leaves }f_0,\qquad \frac{\Delta f}{f_0}\approx\frac{2}{\pi}\arccos\ …[+89 chars]` |
| 170 | 214 | `**Conditions:** lossless line, single-frequency matching; the quarter-wave transformer is narrowband because its impedance is exact only at $f_0=\frac{v_p}{4\ell}$ where $\ell$ is its physical length. …[+14 chars]` |
| 203 | 205 | `> Moving toward the generator rotates **clockwise** on the Smith chart, and one complete revolution is $\lambda/2$, not $\lambda$. Reading the wrong direction turns an inductive load into a capacitive …[+5 chars]` |
| 221 | 203 | `$$\text{Short-circuited stub}:\ \ell_{stub}=\frac{\lambda}{2\pi}\arctan\Bigl(\frac{1}{b_{stub}}\Bigr)\ \text{(m)},\qquad \text{Open stub}:\ \ell_{stub}=\frac{\lambda}{2\pi}\arctan(b_{stub})\ \text{(m) …[+3 chars]` |
| 227 | 187 | `$$\text{Series stub}:\ \mathrm{Re}\{z(d)\}=1,\ \mathrm{Im}\{z(d)\}+X_{stub}=0,\qquad Z_{0,\lambda/4}=\sqrt{Z_{in}Z_L},\qquad \text{lumped L-network}: Q=\sqrt{\frac{R_{high}}{R_{low}}-1}$$` |
| 231 | 228 | `**Conditions:** lossless line and a single-frequency match; two solutions exist (the two intersection points of the $g=1$ circle), and series stubs suit balanced/coaxial lines while shunt stubs suit m …[+28 chars]` |
| 245 | 191 | `$$f_{c,mn}=\frac{c}{2}\sqrt{\Bigl(\frac{m}{a}\Bigr)^2+\Bigl(\frac{n}{b}\Bigr)^2}\ \text{(Hz)},\qquad f_{c,10}=\frac{c}{2a},\qquad \lambda_{c,mn}=\frac{2}{\sqrt{(m/a)^2+(n/b)^2}}\ \text{(m)}$$` |
| 257 | 193 | `$$Z_{TE}=\frac{\eta}{\sqrt{1-(f_c/f)^2}}\ \text{(}\Omega\text{)},\qquad Z_{TM}=\eta\sqrt{1-(f_c/f)^2}\ \text{(}\Omega\text{)},\qquad \eta=\sqrt{\frac{\mu}{\epsilon}}=377\ \Omega\ \text{(air)}$$` |
| 261 | 210 | `**Conditions:** perfectly conducting walls with a lossless dielectric filling; propagation requires $f>f_{c}$ for the mode, and $TE_{10}$ is dominant when $a>b$ so only $a$ sets the single-mode band.  …[+10 chars]` |
| 273 | 209 | `$$\lambda_g=\frac{\lambda_0}{\sqrt{1-(f_c/f)^2}}=\frac{\lambda_0}{\sqrt{1-(\lambda_0/\lambda_c)^2}}\ \text{(m)},\qquad \beta_g=\frac{2\pi}{\lambda_g}\ \text{(rad/m)},\qquad \lambda_g>\lambda_0\ \text{ …[+9 chars]` |
| 295 | 277 | `**Conditions:** air-filled guide ($\mu=\mu_0$, $\epsilon=\epsilon_0$) with $a\approx2b$ typically (real standard guides run $a/b\approx2.2$–$2.5$, e.g. WR-90 is $2.25$); below $f_{c,10}$ the mode is e …[+77 chars]` |
| 327 | 191 | `**Conditions:** single propagating mode in a lossless guide; $v_p$ is a phase (not energy) velocity so it may exceed $c$, while $v_g$ always stays below $c$ and carries the energy. #waveguide` |
| 330 | 192 | `> $v_p>c$ in a waveguide is not a relativity violation — it is the phase velocity, not the energy velocity. Group velocity $v_g<c$ carries the signal, and $v_pv_g=c^2/\epsilon_r$ always holds.` |

**`EST/06_Antenna_Systems_and_Propagation.md` — 46 lines over 180 chars**

| Line | Length | Content (truncated to 200 chars) |
|---:|---:|---|
| 24 | 189 | `$\Omega_A$ in sr (beam solid angle), $F$ dimensionless (normalized field pattern), $\theta_E,\theta_H$ in degrees (E- and H-plane half-power beamwidths), $D$ dimensionless, $D_{dB}$ in dBi.` |
| 30 | 226 | `$e_{cd}$ dimensionless (radiation efficiency), $G$ dimensionless gain, $A_e$ in m² (effective aperture), $\lambda$ in m; dBi is referenced to an isotropic radiator, dBd to a half-wave dipole ($0\ \tex …[+26 chars]` |
| 46 | 191 | `**Conditions:** far-field ($d>2D_a^2/\lambda$, with $D_a$ the antenna's largest dimension in m) and matched polarization; gain includes losses through $e_{cd}$, directivity does not. #antenna` |
| 70 | 187 | `$$A_e=\frac{\lambda^2D}{4\pi}\ \text{(m}^2\text{)},\qquad A_{phys}=\pi\Bigl(\frac{D_a}{2}\Bigr)^2\ \text{(m}^2\text{)},\qquad \eta_{ap}=\frac{A_e}{A_{phys}},\qquad A_e=\eta_{ap}A_{phys}$$` |
| 74 | 205 | `**Conditions:** $R_r$ refers to the current maximum; short antennas have small $R_r$ so $e_{cd}$ collapses, while an aperture antenna's efficiency is dominated by illumination taper and spillover. #an …[+5 chars]` |
| 86 | 184 | `$$R_r=80\pi^2\Bigl(\frac{\ell}{\lambda}\Bigr)^2\ \text{(}\Omega\text{)},\qquad D=1.5\ (1.76\ \text{dBi}),\qquad A_e=\frac{3\lambda^2}{8\pi}\ \text{(m}^2\text{)},\qquad \ell\ll\lambda$$` |
| 96 | 213 | `$\beta$ in rad/m, $z$ in m (position along the dipole), $r$ in m (distance), $I_0$ in A (current maximum), $E_\theta$ in V/m; the $\cos(\frac{\pi}{2}\cos\theta)/\sin\theta$ factor is the half-wave ele …[+13 chars]` |
| 100 | 202 | `$$\ell=\frac{\lambda}{2}\ \text{(resonant dipole)},\qquad \ell_{practical}\approx0.47\text{–}0.48\lambda\ \text{(end effect)},\qquad BW_{dipole}\approx10\%\ \text{of }f_0,\qquad Q\approx\frac{f_0}{BW} …[+2 chars]` |
| 104 | 200 | `**Conditions:** thin cylindrical dipole in free space, sinusoidal current distribution, far field; the practical 0.47–0.48$\lambda$ length corrects for the finite-diameter end effect. #antenna #dipole` |
| 118 | 213 | `$\ell$ in m (monopole height), $\lambda$ in m, $R_r$ in $\Omega$, $D$ dimensionless; a quarter-wave monopole over a perfect ground has twice the directivity of a half-wave dipole and half its radiatio …[+13 chars]` |
| 126 | 217 | `$n$ dimensionless (number of conductors), $R_r$ in $\Omega$, $\lambda$ in m, $D$ dimensionless; the reflector sits behind the driven element ($\approx0.15\lambda$) and directors in front ($\approx0.2\ …[+17 chars]` |
| 142 | 303 | `**Conditions:** image theory needs a perfectly conducting infinite ground plane; a real ground degrades monopole gain and raises the elevation angle of maximum radiation; an axial-mode helix needs $C\ …[+103 chars]` |
| 154 | 222 | `$$G=\eta_{ap}\Bigl(\frac{\pi D_a}{\lambda}\Bigr)^2\ \text{(dimensionless)},\qquad G_{dBi}=10\log_{10}\Bigl[\eta_{ap}\Bigl(\frac{\pi D_a}{\lambda}\Bigr)^2\Bigr],\qquad A_e=\eta_{ap}\frac{\pi D_a^2}{4}\ …[+22 chars]` |
| 156 | 181 | `$D_a$ in m (dish diameter), $\lambda$ in m, $\eta_{ap}$ dimensionless (0.55–0.70), $G$ dimensionless, $A_e$ in m²; gain grows as the square of the electrical diameter $D_a/\lambda$.` |
| 160 | 220 | `$$\theta_{3dB}\approx\frac{70\lambda}{D_a}\ \text{(degrees)},\qquad \theta_{3dB}\approx\frac{58\lambda}{D_a}\ \text{(degrees, some texts)},\qquad f=\frac{D_a^2}{16c_{depth}}\ \text{(m)},\qquad F/D\app …[+20 chars]` |
| 166 | 192 | `$$\eta_{ap}=\eta_{spill}\cdot\eta_{taper}\cdot\eta_{block}\cdot\eta_{phase},\qquad \text{edge taper}\approx-10\ \text{dB optimum},\qquad P_r=\frac{P_tG_tG_r\lambda^2}{(4\pi d)^2}\ \text{(W)}$$` |
| 176 | 285 | `**Conditions:** far field ($d\gg2D_a^2/\lambda$) and a feed at the focus; Cassegrain and Gregorian dual-reflector feeds reduce spillover and move the feed out of the aperture; the $56\lambda/d_E$ horn …[+85 chars]` |
| 232 | 238 | `$$A\approx1\ \text{(perfect ground)},\qquad A\propto\frac{1}{d}\ \text{(plane earth, large }d\text{)},\qquad p=\frac{\pi d}{\lambda}\cdot\frac{\sqrt{(\epsilon_r-1)^2+(\sigma/\omega\epsilon_0)^2}}{\eps …[+38 chars]` |
| 238 | 196 | `$$Z_s=\sqrt{\frac{j\omega\mu}{\sigma+j\omega\epsilon}}\ \text{(}\Omega\text{)},\qquad \delta=\frac{1}{\sqrt{\pi f\mu\sigma}}\ \text{(m)},\qquad \text{vertical polarization preferred over ground}$$` |
| 250 | 207 | `**Conditions:** ground wave (surface wave) dominates below about 2 MHz and needs vertical polarization; it follows the earth's curvature and is used for AM broadcast and maritime communications. #prop …[+7 chars]` |
| 270 | 188 | `$r_n$ in m ($n$-th Fresnel radius), $\lambda$ in m, $d_1,d_2$ in m (distances to the obstruction), $n$ dimensionless; clearance of 60% of the first Fresnel zone keeps loss near free space.` |
| 278 | 206 | `**Conditions:** space wave covers line-of-sight and ground-reflected rays, dominant above about 30 MHz; ducting and anomalous propagation can extend the range well beyond the geometric horizon. #propa …[+6 chars]` |
| 292 | 201 | `$N$ in electrons per cubic metre, $e$ in C, $m_e$ in kg, $\epsilon_0$ in F/m, $f_p$ in Hz (plasma frequency), $\theta_i$ in rad (angle of incidence); the $\approx9\sqrt{N}$ form is the working version …[+1 chars]` |
| 305 | 206 | `$h'$ in m (virtual height), $c$ in m/s, $t$ in s (round-trip), $f_{MUF}$ and $f_c$ in Hz, $\theta_0$ in rad (angle of incidence at the layer); the secant law is the bridge from vertical to oblique sou …[+6 chars]` |
| 309 | 188 | `$$L_{abs}\propto\frac{1}{f^2}\ \text{(nondeviative absorption, D layer)},\qquad \text{day high absorption, night low},\qquad LUF<f_{MUF}\Rightarrow\text{best frequency}\approx0.85f_{MUF}$$` |
| 365 | 187 | `$$P_r=\frac{P_tG^2\lambda^2\sigma}{(4\pi)^3R^4}\ \text{(W)},\qquad R_{max}=\Bigl[\frac{P_tG^2\lambda^2\sigma}{(4\pi)^3P_{min}}\Bigr]^{1/4}\ \text{(m)},\qquad \sigma\ \text{(m}^2\text{)}$$` |
| 371 | 195 | `$$\Delta R=\frac{c\tau}{2}\ \text{(m)},\qquad R_{unamb}=\frac{c}{2\,PRF}\ \text{(m)},\qquad f_d=\frac{2v_r}{\lambda}=\frac{2v_rf_c}{c}\ \text{(Hz)},\qquad v_r=\frac{f_d\lambda}{2}\ \text{(m/s)}$$` |
| 373 | 185 | `$\tau$ in s (pulse width), $c$ in m/s, $PRF$ in Hz, $v_r$ in m/s (radial velocity, positive approaching), $f_d$ in Hz; a shorter pulse improves range resolution but costs average power.` |
| 383 | 202 | `**Conditions:** monostatic radar, far-field target in the main beam with $\sigma$ on the radar line of sight; the $R_{max}$ form assumes a fixed minimum detectable signal and no propagation loss. #rad …[+2 chars]` |
| 418 | 184 | `$f_{line}$ in Hz (horizontal line rate), $N_{lines}$ dimensionless, $f_{frame}$ in Hz, $v$ dimensionless (vertical blanking fraction); NTSC line rate is 15 734 Hz and PAL is 15 625 Hz.` |
| 434 | 218 | `Segments dimensionless (13 per channel), subcarrier spacing 429 kHz/segment relationship as defined by the standard, $T_s$ in s (OFDM symbol), $R_b$ in bit/s; ISDB-T is the Philippine DTV standard (IS …[+18 chars]` |
| 436 | 184 | `**Conditions:** ISDB-T is a hierarchical OFDM system, so one 6 MHz channel carries fixed, mobile and one-segment services simultaneously with different modulation per layer. #satellite` |
| 450 | 193 | `$$v=\sqrt{\frac{\mu}{a}}\ \text{(m/s)},\qquad GEO: h\approx35\,786\ \text{km},\ T=23\ \text{h }56\ \text{min},\ v\approx3.07\ \text{km/s},\qquad \text{LEO}: h\approx500\text{–}2000\ \text{km}$$` |
| 505 | 194 | `$G_{xp}$ in dB (transponder gain), $L_{xp}$ in dB (transponder loss), $BW_{xp}$ in Hz; a bent-pipe transponder translates frequency and amplifies, a regenerative one demodulates and remodulates.` |
| 514 | 214 | `**Conditions:** circular Keplerian orbit with $T^2\propto a^3$; GEO suffers roughly 240 ms of round-trip delay, which matters for voice and TCP, while LEO constellations need handover between satellit …[+14 chars]` |
| 528 | 197 | `$n_1$ dimensionless (core index), $n_2$ dimensionless (cladding index), $\Delta$ dimensionless (relative index difference), $NA$ dimensionless, $\theta_a$ in rad or degrees (acceptance half-angle).` |
| 538 | 190 | `$$M\approx\frac{V^2}{2}\ \text{(step-index multimode)},\qquad M\approx\frac{V^2}{4}\ \text{(parabolic graded-index)},\qquad \sin\theta_i>\frac{n_2}{n_1}\ \text{(total internal reflection)}$$` |
| 542 | 200 | `**Conditions:** step-index fiber with $n_1>n_2$ and total internal reflection at the boundary; single-mode operation needs $V<2.405$, which is achieved with a small core and a short wavelength. #fiber` |
| 554 | 207 | `$$\alpha_{dB/km}=\frac{10}{L_{km}}\log_{10}\Bigl(\frac{P_{in}}{P_{out}}\Bigr)\ \text{(dB/km)},\qquad P_{out}=P_{in}10^{-\alpha L/10}\ \text{(W)},\qquad L_{max}=\frac{P_{tx}-P_{sens}-M}{\alpha}\ \text{ …[+7 chars]` |
| 564 | 266 | `$\sigma$ in s (RMS pulse broadening), $D(\lambda)$ in ps/(nm·km) (chromatic dispersion coefficient), $\Delta\lambda$ in nm (source spectral width), $L$ in km, $c$ in m/s, $NA$ dimensionless; intermoda …[+66 chars]` |
| 581 | 338 | `**Conditions:** attenuation is measured in dB/km at a stated wavelength; zero-dispersion wavelength is about 1310 nm in standard SMF, so 1550 nm needs dispersion-compensating fiber or modules; Rayleig …[+138 chars]` |
| 593 | 239 | `$$P_{out}=I_{drive}\cdot\eta_{slope}\ \text{(W)},\qquad \eta_{ext}=\frac{P_{out}}{I\cdot E_{ph}}\ \text{(dimensionless)},\qquad \lambda_{peak}=\frac{hc}{E_g}\ \text{(m)},\qquad \text{LED: }BW\approx20 …[+39 chars]` |
| 619 | 277 | `$P_{out}$ in W, $I_{drive}$ in A, $\eta_{slope}$ in W/A, $\eta_{ext}$ dimensionless, $E_{ph}$ in J, $E_g$ in J (bandgap), $\lambda_{peak}$ in m, $R$ in A/W (responsivity), $I_p$ in A, $M$ dimensionles …[+77 chars]` |
| 665 | 240 | `**Conditions:** the λ of peak responsivity must match the source wavelength; LEDs suit multimode short links, lasers suit single-mode long haul, and APD helps only when the receiver is noise-limited,  …[+40 chars]` |
| 668 | 197 | `> In a fiber power budget, all terms are dB except the transmitter output and receiver sensitivity, which are dBm. Subtracting dB from dBm gives dBm; subtracting dBm from dBm gives dB (the margin).` |
| 712 | 267 | `**Conditions:** identical equally spaced elements with no mutual coupling, observed in the far field; the array factor multiplies the single-element pattern, and the PLF assumes a purely linearly pola …[+67 chars]` |

**`EST/07_Industrial_Automation_and_Instrumentation.md` — 23 lines over 180 chars**

| Line | Length | Content (truncated to 200 chars) |
|---:|---:|---|
| 61 | 227 | `**Conditions:** current is immune to cable resistance and to induced voltage, so every series device carries the same value; valid over long runs while the supply exceeds the burden plus transmitter c …[+27 chars]` |
| 75 | 213 | `$E$ in V (mV in practice), $S$ = Seebeck coefficient in µV/°C, $T_h$ = hot junction in °C, $T_c$ = cold junction (reference) in °C; the voltage tracks the difference, so cold-junction compensation add …[+13 chars]` |
| 93 | 234 | `$R_0$ in Ω at 0 °C (PT100 = 100 Ω, PT1000 = 1000 Ω), $\alpha=0.385\ \Omega/(\Omega\cdot^\circ C)$ for platinum, $A,B$ = Callendar–Van Dusen coefficients, $\beta$ = thermistor constant in K (3500–5000  …[+34 chars]` |
| 112 | 205 | `> A PT100 with 10 Ω of lead resistance on a 2-wire hookup reports about +26 °C of error (10/0.385); a thermocouple reads the junction difference, so an uncompensated cold junction shifts the whole rea …[+5 chars]` |
| 114 | 212 | `**Conditions:** thermocouples need cold-junction compensation and linearisation; RTDs need a low excitation current to limit self-heating; thermistors are the most sensitive but the least linear. #ins …[+12 chars]` |
| 132 | 189 | `$C$ in F (pF range), $A$ in m², $d$ in m, $\varepsilon_r$ of the hygroscopic polymer rises as water is absorbed; $RH$ dimensionless in %, dew point $T_d$ in °C (approximation near 50 % RH).` |
| 136 | 187 | `$$GF=\frac{\Delta R/R}{\varepsilon},\qquad \varepsilon=\frac{\Delta L}{L},\qquad V_o=V_{ex}\,\frac{GF\,\varepsilon}{4},\qquad V_o=V_{ex}\Big(\frac{R_3}{R_1+R_3}-\frac{R_4}{R_2+R_4}\Big)$$` |
| 165 | 221 | `**Conditions:** the sensor output stage must match the PLC card's sinking/sourcing wiring; capacitive units need setpoint trimming for the target's dielectric constant, and inductive units only see me …[+21 chars]` |
| 195 | 325 | `$T_{scan}$ in ms (1–50 ms typical), $T_{in}$ = input scan (read and latch every input), $T_{prog}$ = program scan (execute the ladder), $T_{out}$ = output scan (write every output), $T_{house}$ = hous …[+125 chars]` |
| 229 | 191 | `> Inputs are latched at the start of the scan and outputs are written at the end, so two changes inside one scan are invisible; worst-case response of a one-rung path is about two scan times.` |
| 231 | 198 | `**Conditions:** scan time is set by program length, instruction mix and I/O count; the watchdog reloads every successful scan and trips to the safe state if the program stalls. #plc #instrumentation` |
| 281 | 228 | `**Conditions:** contacts examine the process image, not the physical terminal, so a coil written by an earlier rung is already visible to a later rung in the same scan; use one coil per output bit, si …[+28 chars]` |
| 297 | 198 | `$u$ = controller output in % or mA, $e$ = error in engineering units, $K_p$ dimensionless gain, $T_i$ = integral (reset) time in s, $T_d$ = derivative (rate) time in s, $SP,PV$ in engineering units.` |
| 323 | 227 | `$K_u$ = ultimate gain, $P_u$ = ultimate period in s with I and D off (sustained oscillation). Open-loop reaction curve: $K_p=1.2T/(KL)$, $T_i=2L$, $T_d=0.5L$ with process gain $K$, dead time $L$ in s  …[+27 chars]` |
| 329 | 217 | `**Conditions:** PI is the industrial default, derivative is used only on slow noise-free loops and is filtered as $\frac{K_d s}{\tau_Ds+1}$; anti-windup clamps the integral while the output saturates. …[+17 chars]` |
| 363 | 241 | `$N$ = number of slaves (dimensionless), $T_{resp}$ = slave response time in s, $L_{frame}$ in bits, $B$ = link bit rate in bit/s, $U$ = utilisation (dimensionless); keep $U$ well under 50 % so cyclic  …[+41 chars]` |
| 380 | 206 | `Modbus addresses: coils (0x, read/write bits), discrete inputs (1x, read-only bits), input registers (3x, read-only 16-bit), holding registers (4x, read/write 16-bit); a 32-bit value occupies two regi …[+6 chars]` |
| 392 | 208 | `> Determinism (bounded, repeatable latency and low jitter) is what control traffic needs; best-effort TCP or MQTT is fine outward to the enterprise, but cyclic fieldbus or EtherNet/IP belongs inside t …[+8 chars]` |
| 394 | 237 | `**Conditions:** master/slave (Modbus, DNP3) polls and client/server (Modbus TCP, EtherNet/IP) is the same model on TCP, while MQTT is publish/subscribe through a broker; every remote setpoint must be  …[+37 chars]` |
| 423 | 229 | `CFM in ft³/min, $Q_s$ = sensible load in Btu/h, $\Delta T$ = room-to-supply temperature difference in °F, $Q_t$ = total load in Btu/h, $\Delta h$ = enthalpy difference in Btu/lb; 1.08 = 60 min/h × 0.0 …[+29 chars]` |
| 431 | 228 | `$N$ in rpm, $Q$ in m³/s (or CFM), $H$ in m (or ft) of head, $P$ in W (or hp), $\rho$ in kg/m³, $\eta$ dimensionless; halving speed halves flow but leaves only 12.5 % of the power, which is why VFDs sa …[+28 chars]` |
| 437 | 252 | `$\Delta I/I_0$ dimensionless, $L$ = optical path length in m, $A_{det}$ = area per detector in m², $n$ = number of detectors (dimensionless); photoelectric detectors alarm around 1.5–3.5 %/m obscurati …[+52 chars]` |
| 466 | 238 | `**Conditions:** the CFM relations assume standard air at 0.075 lb/ft³ and $c_p=0.24$ Btu/(lb·°F) at sea level; detector thresholds, spacing and sprinkler coverage follow NFPA 72/13 and the Philippine  …[+38 chars]` |

Composition of the 427 over-length lines (mutually exclusive buckets, first match wins):

| Bucket | Lines |
|---|---:|
| `**Conditions:**` lines — explicitly allowed to run long by guide §5 | 214 |
| Callout lines (`>`) — "the odd callout allowed to run long" | 89 |
| Variable-definition lines with inline units | 46 |
| Display-math blocks (`$$…$$`) | 47 |
| Table rows | 0 |
| Other prose / label lines | 31 |

### Check 7 — Callouts outside 4–6 per file

**20 violations across 20 files.**

Counts `> [!tip]` and `> [!warning]` only, as instructed.

| File | `[!tip]` | `[!warning]` | Total | Detail |
|---|---:|---:|---:|---|
| `Mathematics/01_Differential_Calculus.md` | 4 | 4 | 8 | tip=4 warning=4 total=8 (guide asks 4–6) |
| `Mathematics/02_Integral_Calculus.md` | 9 | 7 | 16 | tip=9 warning=7 total=16 (guide asks 4–6) |
| `Mathematics/03_Differential_Equations.md` | 7 | 7 | 14 | tip=7 warning=7 total=14 (guide asks 4–6) |
| `Mathematics/04_Advanced_Engineering_Math.md` | 11 | 8 | 19 | tip=11 warning=8 total=19 (guide asks 4–6) |
| `Mathematics/05_Electromagnetics.md` | 4 | 3 | 7 | tip=4 warning=3 total=7 (guide asks 4–6) |
| `Mathematics/07_Signals_and_Systems.md` | 4 | 4 | 8 | tip=4 warning=4 total=8 (guide asks 4–6) |
| `Mathematics/08_Numerical_Methods_and_Analysis.md` | 5 | 4 | 9 | tip=5 warning=4 total=9 (guide asks 4–6) |
| `Mathematics/09_Engineering_Data_Analysis.md` | 5 | 2 | 7 | tip=5 warning=2 total=7 (guide asks 4–6) |
| `Electronics_Engineering/01_DC_Circuits.md` | 1 | 2 | 3 | tip=1 warning=2 total=3 (guide asks 4–6) |
| `Electronics_Engineering/03_Two_Port_Networks.md` | 1 | 2 | 3 | tip=1 warning=2 total=3 (guide asks 4–6) |
| `Electronics_Engineering/06_Power_Electronics_and_Systems.md` | 1 | 2 | 3 | tip=1 warning=2 total=3 (guide asks 4–6) |
| `Electronics_Engineering/08_Logic_Circuits_and_Switching.md` | 3 | 4 | 7 | tip=3 warning=4 total=7 (guide asks 4–6) |
| `Electronics_Engineering/09_Microprocessors_and_Embedded.md` | 2 | 1 | 3 | tip=2 warning=1 total=3 (guide asks 4–6) |
| `GEAS/01_General_Chemistry.md` | 5 | 6 | 11 | tip=5 warning=6 total=11 (guide asks 4–6) |
| `GEAS/02_University_Physics.md` | 8 | 8 | 16 | tip=8 warning=8 total=16 (guide asks 4–6) |
| `GEAS/03_Materials_Science.md` | 5 | 5 | 10 | tip=5 warning=5 total=10 (guide asks 4–6) |
| `GEAS/04_Environmental_Sci_and_PH_Laws.md` | 6 | 5 | 11 | tip=6 warning=5 total=11 (guide asks 4–6) |
| `GEAS/05_Engineering_Economy.md` | 7 | 6 | 13 | tip=7 warning=6 total=13 (guide asks 4–6) |
| `GEAS/06_Engineering_Management_and_PM.md` | 7 | 6 | 13 | tip=7 warning=6 total=13 (guide asks 4–6) |
| `GEAS/07_ECE_Laws_and_Professional_Ethics.md` | 5 | 6 | 11 | tip=5 warning=6 total=11 (guide asks 4–6) |

**Callout types other than tip/warning** (informational; not counted toward the 4–6 budget):

- `Mathematics/01_Differential_Calculus.md` L61: non tip/warning callouts (not counted): [!example]@L61, [!example]@L273
- `Mathematics/02_Integral_Calculus.md` L88: non tip/warning callouts (not counted): [!example]@L88, [!example]@L631
- `Mathematics/04_Advanced_Engineering_Math.md` L51: non tip/warning callouts (not counted): [!example]@L51, [!example]@L494, [!example]@L762, [!example]@L799
- `Mathematics/07_Signals_and_Systems.md` L227: non tip/warning callouts (not counted): [!example]@L227
- `Mathematics/08_Numerical_Methods_and_Analysis.md` L117: non tip/warning callouts (not counted): [!example]@L117, [!example]@L236
- `Mathematics/09_Engineering_Data_Analysis.md` L54: non tip/warning callouts (not counted): [!example]@L54, [!example]@L152, [!example]@L178, [!example]@L293, [!example]@L531, [!example]@L538, [!example]@L641
- `GEAS/05_Engineering_Economy.md` L31: non tip/warning callouts (not counted): [!example]@L31, [!example]@L72, [!example]@L110, [!example]@L117, [!example]@L146, [!example]@L174, [!example]@L206, [!example]@L249, [!example]@L293, [!example]@L300, [!example]@L323, [!example]@L365, [!example]@L370, [!example]@L445, [!example]@L475

### Check 8 — Topic heading format and continuous numbering

**2 violations across 1 file.**

Every `###` heading must match `### <n>. <Name>` with numbering 1, 2, 3 … with no gaps or repeats. Every heading in the folder *does* match the `### <n>. <Name>` shape — there are no malformed headings; the only defect is ordering.

| File | Line | Kind | Detail |
|---|---:|---|---|
| `Mathematics/08_Numerical_Methods_and_Analysis.md` | 323 | numbering | ### 11. Numerical Differentiation  (expected ### 10., got 11) |
| `Mathematics/08_Numerical_Methods_and_Analysis.md` | 393 | numbering | ### 10. Runge-Kutta 4th Order  (expected ### 13., got 10) |

**`Mathematics/08_Numerical_Methods_and_Analysis.md` — actual heading sequence in the file:** `### 1. Error Analysis, Roundoff and Truncation` → `### 2. Bisection and Regula Falsi` → `### 3. Newton-Raphson and Secant` → `### 4. Newton's Divided Difference Interpolation` → `### 5. Lagrange Interpolation` → `### 6. Trapezoidal Rule` → `### 7. Simpson's One-Third and Three-Eighth Rules` → `### 8. Euler's Method` → `### 9. Modified Euler and Heun's Method` → `### 11. Numerical Differentiation` → `### 12. Iterative Linear Solvers` → `### 10. Runge-Kutta 4th Order`

Both rows above are symptoms of **one** ordering defect, not two independent typos: after 1…9 the file jumps to 11 and 12, and only then presents 10 (Runge-Kutta 4th Order) as the last topic. Guide §3 requires `### <n>. <Name>` to match the syllabus "same number, order and spelling — never renumber or reorder", so this file needs either the Runge-Kutta block moved before Numerical Differentiation, or the last three topics renumbered. Note this does **not** affect the frontmatter count: `topics:` = 12 and there are 12 headings, and 1–12 is a complete set with no gap or repeat — only the presentation order is wrong.

### Check 9 — Forbidden `\usepackage`, `\newcommand`, HTML tags

**CLEAN — 0 violations.** No file deviates.

Guide §6: "No `\usepackage`, no `\newcommand`, no custom macros, no HTML."

---

## 3. Index files (`00_Index.md`) — supplementary

Index files are excluded from checks 2–9 by the brief (the guide gives them their own §7 layout and no back-link). Their frontmatter *is* checked under check 1. Observations below are for information only and are **not** counted in the summary table.

| Index file | Keys | `topics:` | Sum of that vault's subject `topics:` | Match | Lines > 180 | `[!tip]` | `[!warning]` |
|---|---|---:|---:|---|---:|---:|---:|
| `Mathematics/00_Index.md` | title, part, tags, topics | 132 | 132 | yes | 9 | 2 | 1 |
| `Electronics_Engineering/00_Index.md` | title, part, tags, topics | 120 | 120 | yes | 11 | 2 | 1 |
| `EST/00_Index.md` | title, part, tags, topics | 99 | 99 | yes | 11 | 2 | 1 |
| `GEAS/00_Index.md` | title, part, tags, topics | 102 | 102 | yes | 16 | 2 | 2 |

Also checked: each index `tags:` contains `moc` (guide §2). **All 4 index files pass.**

All four index `topics:` values exactly equal the sum of their vault's subject files (132 + 119 + 99 + 102 = 452, matching the 452 `###` headings found across the whole folder).

---

## 4. Ambiguities and reliability caveats

1. **"Five keys" vs four.** The brief and guide §2 prose say "exactly these five keys", but both the guide's own YAML template (lines 34–39) and every file in the folder use **four** keys: `title`, `part`, `tags`, `topics`. No fifth key is named anywhere. The checker therefore validates against the four named keys; `moc` is *not* a fifth frontmatter key but a fourth tag inside `tags:` on index files, per guide §2 ("adds `moc` to tags"). Result: this check is clean, and the "five" wording is a defect in the guide, not in the notes.
2. **Callout budget 4–6 vs 3–6.** Guide §6 says "**4–6 per file**"; the §9 checklist says "**3–6 callouts**". The brief specifies 4–6, so the checker uses 4–6. Any file with exactly 3 callouts would pass §9 and fail §6 — this report flags it under check 7.
3. **Check 5 "more than one".** Guide §9 says "one `Conditions:` line per topic", while §4 permits a second line when a single line cannot stay under ~180 characters. The checker reports every topic that is not exactly 1 and lists the count so the §4 exception can be judged case by case; it does not auto-fail the 2-line cases.
4. **Markdown-specific parse limits.** Math spans are located by `$` toggling. A note that used a literal unescaped `$` outside math (e.g. a dollar amount written as `$5`) would shift the parse on that line. Scanning the corpus found no such case in table rows, so check 4 is reliable here; the same caveat applies to every math-aware check.
5. **Check 4 and conditional probability.** `$P(A|B)$` inside a table row is reported as a violation because the bare pipe breaks the cell in Obsidian exactly like `$|z|>1$`. If a reader considers such notation acceptable, those rows would need `\mid` or `\lvert`.
6. **Concurrent modification of the corpus.** This audit ran while another process was actively writing into the folder (it created `_AUDIT/pb-text/*.txt`, `_AUDIT/check-note-delta.mjs`, `_AUDIT/VARIABLE_DEFINITION_COVERAGE.md`, and rewrote `EST/01_Signals_Spectra_and_Noise.md` immediately before this report was generated). The before/after hash check reported in the Method notes above tells you whether any audited note changed *during* the scan; if it was clean, the counts describe a single consistent revision. Re-run `check-formula-structure.mjs` after concurrent editors stop to re-confirm.
7. **Not checked here (out of scope per the brief).** Wikilink resolution, `## Part A/B/C` heading correctness, blank-line-before-`###` spacing, `\dfrac` vs `\frac` usage, semicolon chains, ★ placement, units, and index §7 layout are *not* part of these nine checks.

