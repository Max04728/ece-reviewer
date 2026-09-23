---
id: EST-05-07
title: "Stub Matching"
part: "04_EST"
area: "05_Transmission_Lines_and_Waveguides"
topic: 7
tier: 2
depth: full
problem_count: 4
prereqs: ["[[04_Reflection_Coefficient_and_VSWR]]", "[[05_Input_Impedance_and_Quarter-Wave_Transformer]]", "[[06_Smith_Chart]]"]
tags: ["ece", "est", "transmission_lines_and_waveguides"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Stub Matching

> [!abstract] Scope
> Match a complex load to a line with a single stub: find the distance to the matching plane and the stub length, for shunt and series stubs, and know why the match is narrowband.

## Core Concept

> [!tip] Intuition
> A stub is a tuned length of line that contributes nothing but reactance, so it can only fix one thing: the susceptance. That is why the load must first be moved to a plane where the line already presents the right *conductance* — then the stub cancels whatever susceptance is left.

**The matching idea.** A shunt stub is a short length of line connected across the main line. Its input admittance is purely imaginary, so in parallel with the line it adds susceptance and changes nothing else. Matching therefore needs two steps, in this order: move along the line to a distance $d$ where the line's input admittance has conductance $G = Y_0$ (normalized $g = 1$), and then choose the stub length so that its susceptance cancels the line's remaining susceptance. The distance is found from:
$$Z_{\mathrm{in}}(d) = Z_0(Z_L + jZ_0\tan\beta d)/(Z_0 + jZ_L\tan\beta d)$$
or, equivalently, by rotating $\Gamma_L$ around the constant-$|\Gamma|$ circle until it crosses the $g = 1$ circle. The whole procedure is a Smith-chart construction: constant-VSWR circle, $g = 1$ intersections, read $d$, read $b$, convert $b$ to a stub length.

**Closed-form algebra for a resistive load.** For $z_L = r$ (real), write $t = \tan\beta d$. Then $y_{\mathrm{in}} = (1 + jrt)/(r + jt)$ gives $g = r(1+t^{2})/(r^{2}+t^{2})$ and $b = t(r^{2}-1)/(r^{2}+t^{2})$. Setting $g = 1$ collapses to $t^{2} = r$, so the two crossings are at $\tan\beta d = \pm\sqrt{r}$ — a clean result worth memorising. At the crossing the line susceptance is $b = \pm(r-1)/\sqrt{r}$, so a short-circuited stub must satisfy $\cot\beta l = (r-1)/\sqrt{r}$ on the first branch. Two solutions always exist, and they sit at $d$ and $\lambda/2 - d$; which one is 'better' depends on whether you are optimising the position or the stub length, not on a fixed rule.

**The stub formulas.** A short-circuited stub of length $l$ has $Z_{\mathrm{stub}} = jZ_0\tan\beta l$, hence $Y_{\mathrm{stub}} = -jY_0\cot\beta l$; an open-circuited stub has $Y_{\mathrm{stub}} = +jY_0\tan\beta l$. The two curves are the same function shifted by $\lambda/4$: a shorted stub $\lambda/4$ longer than another behaves exactly like the open stub of the shorter length. That is why a susceptance of $+jY_0$ is produced by a $0.125\lambda$ open stub *or* a $0.375\lambda$ shorted stub. In practice the shorted stub is preferred at high power (an open stub radiates and its fringing capacitance is unsteady) but it provides a DC path to ground, so it cannot be used across a bias line; the open stub is used in microstrip where a via is expensive, at the cost of radiation and a length that depends on the fringing field.

**Why a stub cannot fix a real load in place.** At the load plane of a purely resistive load the admittance is real, $b = 0$. A shunt stub adds only susceptance and the conductance stays at $g = Z_0/Z_L$, which equals 1 only if the load is already matched. So a shunt shorted stub placed directly across a 100 $\Omega$ load on a 50 $\Omega$ line makes things worse (it adds a reactance to a real admittance) — the line length $d$ is not optional, it is the mechanism that converts the load's real admittance into $g = 1$. A series stub plays the dual role: it adds reactance, so it must be placed where the line impedance has $r = 1$ (the $r = 1$ circle) and then cancels the leftover reactance.

**Narrowband, and how it fails.** Both $d$ and $l$ are *physical* lengths, so when the frequency rises both electrical lengths grow in proportion: a design with $d = l = 0.152\lambda_0$ presents $\beta d = \beta l = 65.7^{\circ}$ at $1.2f_0$. The required susceptance, $\cot 54.7^{\circ} = 0.707$, becomes $\cot 65.7^{\circ} = 0.452$ — the stub supplies only 61% of what the line needs, the residual susceptance is $+j0.0059\ \mathrm{S}$ and the VSWR climbs from 1.00 to 1.46. Wider bandwidth needs two or more stubs, or a tapered/multisection transformer. Finally, every stub formula here assumes a lossless line and an ideal short or open; a real short has inductance, a real open has fringing capacitance, and at millimetre wavelengths both shift the effective length by enough to matter.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Shunt-stub matching condition | $\mathrm{Re}\,[Y_{\mathrm{in}}(d)] = Y_0, \qquad B_{\mathrm{stub}} = -\mathrm{Im}\,[Y_{\mathrm{in}}(d)]$ | The stub cancels susceptance only; the conductance must already be $Y_0$ at the chosen plane. |
| Line admittance at the chosen plane | $Y_{\mathrm{in}}(d) = \frac{1}{Z_{\mathrm{in}}(d)}, \qquad Z_{\mathrm{in}}(d) = Z_0\,\frac{Z_L + jZ_0\tan\beta d}{Z_0 + jZ_L\tan\beta d}$ | Use it to find $d$; $\beta d = 2\pi d/\lambda$. |
| Constant-VSWR (Smith chart) circle | $\Gamma_{\mathrm{in}} = \Gamma_L\,e^{-2j\beta d}, \qquad \lvert \Gamma_{\mathrm{in}} \rvert = \lvert \Gamma_L \rvert$ | Lossless line: magnitude unchanged, phase rotated by twice the electrical length. On the Smith chart the load rides a constant-$\|\Gamma\|$ circle and the $g = 1$ locus passes through $z = 0$ and $z = 1$. |
| Normalized admittance of a resistive load | $g = \frac{r(1+t^{2})}{r^{2}+t^{2}}, \qquad b = \frac{t\,(r^{2}-1)}{r^{2}+t^{2}}, \qquad t = \tan\beta d$ | Valid for a real load $z_L = r$; the basis of the closed-form results below. |
| Resistive-load crossing condition | $g = 1 \Rightarrow \tan\beta d = \pm\sqrt{r}$ | Two crossings per half wavelength. For $r = 2$, $\tan\beta d = \pm 1.414$ gives $d = 0.152\lambda$ and $0.348\lambda$. |
| Shorted-stub length for a resistive load | $\cot\beta l = \frac{r - 1}{\sqrt{r}}$ | Pairs with the $+\sqrt{r}$ crossing; the $\lambda/2 - d$ solution takes the other sign. $r = 1$ needs no stub. |
| Shorted-stub admittance | $Y_{\mathrm{stub}} = -jY_0\cot\beta l, \qquad Z_{\mathrm{stub}} = jZ_0\tan\beta l$ | Inductive for $l < \lambda/4$; infinite impedance (open) at $l = \lambda/4$. |
| Open-stub admittance | $Y_{\mathrm{stub}} = +jY_0\tan\beta l$ | Shorter than the shorted stub for the same susceptance by exactly $\lambda/4$; radiates. |
| Quarter-wave stub equivalence | $Y_{\mathrm{stub,short}}\!\left(l + \tfrac{\lambda}{4}\right) = -\frac{1}{Y_{\mathrm{stub,short}}(l)}$ | A shorted stub $\lambda/4$ longer behaves like the open stub of length $l$ — the source of the 0.125/0.375$\lambda$ pair. |
| Series-stub matching condition | $\mathrm{Re}\,[Z_{\mathrm{in}}(d)] = Z_0, \qquad X_{\mathrm{stub}} = -\mathrm{Im}\,[Z_{\mathrm{in}}(d)]$ | Use the $r = 1$ circle instead of $g = 1$; the stub is inserted in series, not across the line. |
| Frequency sensitivity | $\beta d \to (f/f_0)\,\beta_0 d, \qquad \beta l \to (f/f_0)\,\beta_0 l$ | Both physical lengths detune together; a $\pm20\%$ frequency change moved VSWR from 1.00 to 1.46 in the worked example. |
| Stub length periodicity | $Y_{\mathrm{stub}}(l + \lambda/2) = Y_{\mathrm{stub}}(l)$ | Every stub answer repeats every $\lambda/2$; report the shortest positive length an examiner would accept. |

## Worked Problems

### P1. Match a $100\ \Omega$ resistive load to a $50\ \Omega$ line with a single short-circuited shunt stub. Find both valid (distance, stub length) pairs.

**Given:** Z_0 = 50 Ω; Z_L = 100 Ω (pure resistance); shunt, short-circuited stub

**Solution:**

1. Normalize: $z_L = 2$, so $r = 2$; $\Gamma_L = (2-1)/(2+1) = +1/3$ and $\mathrm{VSWR} = 2$
2. Set $g = 1$: $\dfrac{r(1+t^{2})}{r^{2}+t^{2}} = 1 \Rightarrow t^{2} = r = 2 \Rightarrow t = \tan\beta d = \pm1.4142$
3. First crossing: $\beta d = 54.74^{\circ} \Rightarrow d = 54.74/360 = 0.152\lambda$. There $b = t(r^{2}-1)/(r^{2}+t^{2}) = 1.4142(3)/6 = +0.7071$, so $y_{\mathrm{line}} = 1 + j0.7071$
4. The stub must supply $-j0.7071$: $-\cot\beta l = -0.7071 \Rightarrow \cot\beta l = 0.7071 \Rightarrow \tan\beta l = 1.4142 \Rightarrow \beta l = 54.74^{\circ} \Rightarrow l = 0.152\lambda$
5. Second crossing: $t = -1.4142 \Rightarrow \beta d = 180^{\circ} - 54.74^{\circ} = 125.26^{\circ} \Rightarrow d = 0.348\lambda$; then $b = -0.7071$, so $\cot\beta l = -0.7071 \Rightarrow \beta l = 125.26^{\circ} \Rightarrow l = 0.348\lambda$
6. Check solution 1 with numbers: $Z_{\mathrm{in}} = 50(2+j1.4142)/(1+j2.8284) = 33.33 - j23.57\ \Omega$, so $Y_{\mathrm{line}} = 0.02 + j0.01414\ \mathrm{S}$; the stub is $Z = j50\tan 54.74^{\circ} = j70.71\ \Omega$, i.e. $Y_{\mathrm{stub}} = -j0.01414\ \mathrm{S}$; the sum is $0.02\ \mathrm{S}$, so $Z_{\mathrm{in,total}} = 50\ \Omega$ and $\mathrm{VSWR} = 1$

> [!success]- Answer
> **Solution 1: $d = 0.152\lambda$ with a shorted stub $l = 0.152\lambda$. Solution 2: $d = 0.348\lambda$ with $l = 0.348\lambda$. Both give $Y_{\mathrm{total}} = 0.02\ \mathrm{S}$ and $\mathrm{VSWR} = 1$.**

> [!warning] Trap
> Solving $\mathrm{Re}\,[Z_{\mathrm{in}}] = Z_0$ instead of the conductance condition. That happens at $\tan\beta d = 0.7071$, i.e. $d = \lambda/8 = 0.125\lambda$, where $Z_{\mathrm{in}} = 40 - j30\ \Omega$ and the conductance is only $0.8Y_0$. A stub placed there can cancel the susceptance but leaves $Z = 62.5\ \Omega$ — a VSWR floor of 1.25 that no stub length can beat.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Degree mode, one line — `√2 : tan⁻¹(Ans)÷360 : 1÷√2 : tan⁻¹(1÷Ans)÷360`
> 2. `=` down the chain: $t = \tan\beta d$ = **1.4142** → $d$ = **0.152**$\lambda$ → $b$ = **0.7071** → stub $l$ = **0.152**$\lambda$ (from $-\cot\beta l = -0.7071$).
> 3. Second crossing: `180−tan⁻¹(√2)` → **125.26°**, so `Ans÷360` = **0.348**$\lambda$ for both $d$ and $l$.
>
> For a real load $g = 1$ collapses to $t^{2} = r$, so the crossings are at $\tan\beta d = \pm\sqrt{r}$.

### P2. At the chosen matching plane a $50\ \Omega$ line presents the normalized admittance $y_{\mathrm{line}} = 1 - j1$. Find the length of a short-circuited shunt stub that matches the line, and the alternative length using an open-circuited stub.

**Given:** Z_0 = 50 Ω; y_line = 1 − j1 (normalized); shunt stub, first shorted then open

**Solution:**

1. The real part is already $g = 1$, so the only task is to cancel $b = -1$: the stub must supply $B_{\mathrm{stub}} = +j/50 = +j0.02\ \mathrm{S}$, i.e. $y_{\mathrm{stub}} = +j1$
2. Shorted stub: $y_{\mathrm{stub}} = -\cot\beta l = +1 \Rightarrow \cot\beta l = -1 \Rightarrow \beta l = 135^{\circ}$
3. $l = 135/360\,\lambda = 0.375\lambda$
4. Check: $Z_{\mathrm{stub}} = j50\tan 135^{\circ} = -j50\ \Omega$, whose admittance is $1/(-j50) = +j0.02\ \mathrm{S}$ ✓; $Y_{\mathrm{total}} = (0.02 - j0.02) + j0.02 = 0.02\ \mathrm{S}$, so $Z_{\mathrm{in}} = 50\ \Omega$
5. Open stub: $y_{\mathrm{stub}} = +\tan\beta l = +1 \Rightarrow \beta l = 45^{\circ} \Rightarrow l = 0.125\lambda$
6. The two lengths differ by $0.375 - 0.125 = 0.25\lambda = \lambda/4$, exactly as the short/open equivalence requires ✓

> [!success]- Answer
> **Shorted stub: $l = 0.375\lambda$. Open stub: $l = 0.125\lambda$. Either one produces $Y_{\mathrm{total}} = 0.02\ \mathrm{S}$.**

> [!warning] Trap
> Swapping the two stub formulas. With a shorted stub, using the open-stub formula gives $l = 0.125\lambda$, which actually supplies $y_{\mathrm{stub}} = -1$; the total admittance becomes $1 - j2$, $Z_{\mathrm{in}} = 10 + j20\ \Omega$ and the VSWR is 5.83 — a 'match' seven times worse than the unmatched load.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Degree: `tan⁻¹(−1)` returns **−45°**; the stub wants the second-quadrant angle, so `180+Ans` → **135°** and `Ans÷360` = **0.375**$\lambda$ (shorted stub).
> 2. Open stub with the same susceptance: `tan⁻¹(1)÷360` → **0.125**$\lambda$, exactly $\lambda/4$ shorter.
>
> A shorted stub obeys $-\cot\beta l$; using the open-stub $\tan$ form here gives the wrong 0.125$\lambda$.

### P3. Repeat the single-stub design for a $25\ \Omega$ resistive load on the same $50\ \Omega$ line, and identify which solution uses the shortest stub.

**Given:** Z_0 = 50 Ω; Z_L = 25 Ω (pure resistance); shunt, short-circuited stub

**Solution:**

1. Normalize: $z_L = 0.5$, so $r = 0.5$ and $\Gamma_L = (0.5-1)/(0.5+1) = -1/3$ (VSWR is still 2)
2. $t^{2} = r = 0.5 \Rightarrow t = \tan\beta d = \pm0.7071$
3. First crossing: $\beta d = 35.26^{\circ} \Rightarrow d = 0.0980\lambda$; there $b = 0.7071(0.25-1)/(0.25+0.5) = -0.7071$, so $y_{\mathrm{line}} = 1 - j0.7071$
4. Stub must supply $+j0.7071$: $-\cot\beta l = +0.7071 \Rightarrow \cot\beta l = -0.7071 \Rightarrow \beta l = 125.26^{\circ} \Rightarrow l = 0.348\lambda$
5. Second crossing: $t = -0.7071 \Rightarrow \beta d = 144.74^{\circ} \Rightarrow d = 0.402\lambda$; then $b = +0.7071 \Rightarrow \cot\beta l = +0.7071 \Rightarrow \beta l = 54.74^{\circ} \Rightarrow l = 0.152\lambda$

> [!success]- Answer
> **Solution 1: $d = 0.098\lambda$ with $l = 0.348\lambda$. Solution 2: $d = 0.402\lambda$ with $l = 0.152\lambda$. The shortest stub ($0.152\lambda$) goes with the *longer* distance.**

> [!warning] Trap
> Assuming the shortest distance and the shortest stub belong together. Here the short stub needs the line to run out to $0.402\lambda$ first. Crossing the two solutions — using $d = 0.098\lambda$ with $l = 0.152\lambda$ — leaves a residual susceptance that gives $Z_{\mathrm{total}} = 16.7 + j23.6\ \Omega$ and a VSWR of 3.73 instead of 1.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Degree mode, one line — `√0.5 : tan⁻¹(Ans)÷360 : 180−tan⁻¹(√2) : Ans÷360`
> 2. `=` down the chain: $t$ = **0.7071** → first $d$ = **0.0980**$\lambda$ → $\beta l$ = **125.26°** → $l$ = **0.348**$\lambda$.
> 3. Other crossing: `180−tan⁻¹(√0.5)` → **144.74°** → $d$ = **0.402**$\lambda$, paired with the *short* stub `tan⁻¹(√0.5)÷360` = **0.152**$\lambda$.
>
> The shortest stub goes with the longer distance — never mix the two solutions.

### P4. The $100\ \Omega$ design of the first problem ($d = l = 0.152\lambda_0$) is used at $1.2f_0$. Find the new VSWR and explain where the degradation comes from.

**Given:** Z_0 = 50 Ω; Z_L = 100 Ω; design d = l = 0.152λ_0 at f_0; operate at f = 1.2 f_0

**Solution:**

1. Both lengths are physical, so both electrical lengths scale by 1.2: $\beta d = \beta l = 1.2(54.74^{\circ}) = 65.68^{\circ}$
2. Line: $t = \tan 65.68^{\circ} = 2.213$, so $Z_{\mathrm{in}} = 50\dfrac{2 + j2.213}{1 + j4.426} = 28.64 - j16.12\ \Omega$
3. $Y_{\mathrm{line}} = 1/(28.64 - j16.12) = 0.02651 + j0.01492\ \mathrm{S}$ — the line now needs $-j0.01492\ \mathrm{S}$ from the stub
4. Stub: $\cot 65.68^{\circ} = 0.4519$, so $Y_{\mathrm{stub}} = -j(1/50)(0.4519) = -j0.00904\ \mathrm{S}$ — only 61% of what is required
5. $Y_{\mathrm{total}} = 0.02651 + j0.00589\ \mathrm{S} \Rightarrow Z_{\mathrm{total}} = 35.95 - j7.98\ \Omega$
6. $\Gamma = \dfrac{(35.95 - j7.98) - 50}{(35.95 - j7.98) + 50} = \dfrac{-14.05 - j7.98}{85.95 - j7.98}$, so $|\Gamma| = \dfrac{16.16}{86.32} = 0.187$ and $\mathrm{VSWR} = \dfrac{1.187}{0.813} = 1.46$

> [!success]- Answer
> **$\mathrm{VSWR} = 1.46$ at $1.2f_0$, up from 1.00 at $f_0$, because the stub supplies only 61% of the required susceptance.**

> [!warning] Trap
> Freezing the stub's susceptance at its design value. $\cot\beta l$ is frequency dependent: 0.707 at $f_0$ but 0.452 at $1.2f_0$, a 36% shortfall in cancellation. The paired slip is detuning only one of the two lengths — $d$ and $l$ are physical, so *both* electrical lengths scale with frequency, and the whole design is valid only over a narrow band.

> [!tip]- Calculator technique (Canon F-789SGA) — CPLX
> 1. Degree: `1.2×54.7356` → **65.68°**; `tan(Ans)` → **2.213**.
> 2. `MODE` `2`: `50×(2+i2.213)÷(1+i4.426) : 1÷Ans` → **28.64 − i16.12** Ω → **0.02651 + i0.01492** S.
> 3. Stub and total: `0.02651+i(0.01492−(1÷50)÷tan(65.6827)) : 1÷Ans : (Ans−50)÷(Ans+50) : Abs(Ans) : (1+Ans)÷(1−Ans)` → **0.02651 + i0.005881** S → **35.94 − i7.98** Ω → **−0.154 − i0.107** → **0.1871** → VSWR = **1.46**.
>
> `i` is the `MODE` `2` imaginary unit (the note writes $j$). $\cot 65.68° = 0.4519$: the design's 0.7071 has decayed 36 %.

## Traps & Exam Notes

- **Using $\mathrm{Re}\,[Z_{\mathrm{in}}] = Z_0$ as the matching condition.** A shunt stub adds susceptance, so the condition is on *admittance*: $\mathrm{Re}[Y_{\mathrm{in}}] = Y_0$. For $z_L = 2$ the impedance condition is met at $\lambda/8$, where the conductance is only $0.8Y_0$ and the best possible result is a VSWR of 1.25.
- **Swapping the shorted and open stub formulas.** $Y_{\mathrm{shorted}} = -jY_0\cot\beta l$ but $Y_{\mathrm{open}} = +jY_0\tan\beta l$. Using the open form on a shorted stub to cancel $b = -1$ produces $l = 0.125\lambda$ instead of $0.375\lambda$ and leaves a VSWR of 5.83 on a line that was supposed to be matched.
- **Getting the sign of the required susceptance wrong.** The stub supplies the *negative* of the line's susceptance: with $y_{\mathrm{line}} = 1 + j0.7071$ the stub must give $-j0.7071$, i.e. $\cot\beta l = +0.7071$ and $l = 0.152\lambda$. A sign slip sends the answer to $0.348\lambda$ — a length that looks just as plausible but leaves the load unmatched.
- **Assuming the shortest distance pairs with the shortest stub.** For $z_L = 0.5$ the short stub (0.152$\lambda$) belongs with the long distance (0.402$\lambda$). Mixing the two solutions gives a VSWR of 3.73 instead of 1; always evaluate the pair you quote.
- **Placing a shunt stub at the load plane of a real load.** A resistive load has $b = 0$ there, so the stub only adds susceptance to a real admittance and makes the match worse. The line length $d$ is what converts the load to $g = 1$; without it no stub length can match.
- **Reporting a stub longer than needed.** All stub answers repeat every $\lambda/2$; $l = 0.152\lambda$ and $l = 0.652\lambda$ are electrically identical, and a $\lambda/4$ difference turns a shorted stub into the equivalent of an open one.
- **Treating the design as broadband.** At $1.2f_0$ the demonstrated match degrades from VSWR 1.00 to 1.46 because $\cot\beta l$ falls from 0.707 to 0.452. Real shorts have inductance, real opens have fringing capacitance, and both shift the effective stub length further.

## See Also

- [[04_Reflection_Coefficient_and_VSWR]]
- [[05_Input_Impedance_and_Quarter-Wave_Transformer]]
- [[06_Smith_Chart]]

---

[[06_Smith_Chart|⬅ 06]] · [[_MOC_Transmission_Lines_and_Waveguides|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Waveguide_TE_and_TM_Modes|08 ➡]]
