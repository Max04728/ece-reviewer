---
id: GEAS-05-08
title: "Rate of Return and Payback"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Simple_and_Compound_Interest]]", "[[07_PW,_FW_and_AW_Methods]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Rate of Return and Payback

> [!abstract] Scope
> Find the interest rate at which a project's cash flows break even, and measure how many periods the investment takes to come back.

## Core Concept

> [!tip] Intuition
> The rate of return is the interest rate the project itself pays on the money still tied up in it. It has no formula you can invert by hand, so it is found by guessing two rates that straddle the answer and interpolating between them.

**Rate of return defined as a zero.** The rate of return (ROR), internal rate of return (IRR) or investor's method is the rate $i^*$ that makes the present worth zero: $PW(i^*) = 0$, equivalently $FW(i^*) = 0$ or $AW(i^*) = 0$. It is the effective interest rate earned on the unrecovered balance of the investment, so a project is acceptable when $i^* \ge$ MARR and rejected when $i^* <$ MARR. Note carefully that a positive rate of return is not the same as an acceptable project: at a MARR of 15%, a project returning 10% destroys value even though it 'made money'.

**Trial-and-error interpolation.** Because $(1+i)^n$ cannot be solved for $i$ in closed form, bracket the answer. Find $i_1$ with $PW_1 > 0$ and $i_2$ with $PW_2 < 0$ and interpolate:
$$i^* \approx i_1 + (i_2-i_1)\frac{PW_1}{PW_1-PW_2}$$
The weight is the fraction of the interval consumed at the lower rate, so $PW_1$ and $PW_2$ must be used with their magnitudes and the denominator is the total drop. The PW-versus-$i$ curve is convex, so the straight line between the two points lies slightly above the curve and the interpolated answer is a slight overestimate; keeping the bracket to one or two percentage points makes the error negligible, which is why examiners specify the two trial rates.

**Simple payback and discounted payback.** Simple payback is the time for undiscounted cumulative net cash flow to recover the first cost: for a uniform flow, $n = FC/A$. Discounted payback is the time for the cumulative *discounted* cash flow to turn positive, $\sum_{t=1}^{n} CF_t(1+i)^{-t} \ge FC$; for a uniform flow it has the closed form $n = -\ln(1 - FC\,i/A)/\ln(1+i)$, which exists only when $A > FC\,i$. Discounting makes payback longer, always. Both are screening measures: they ignore every cash flow after the payback date and, in the simple form, the time value of money as well, so a short-lived project can beat a far more profitable long-lived one. Examiners use payback as a filter, not as a decision rule, and expect you to say so.

**Multiple roots and the external rate of return.** A cash flow with more than one sign change can have several rates that make $PW = 0$ (Descartes' rule), and in that case 'the' rate of return is not well defined. The standard repairs are to compute PW at the MARR and decide on that, or to compute the external rate of return (ERR): compound all net inflows forward to the end of the study period at the MARR, compound all net outflows forward at the MARR as well, and solve $FW_{in} = FW_{out}(1+ERR)^n$. ERR assumes reinvestment at the MARR rather than at the IRR, so it is always the more conservative and more defensible figure when a problem names a reinvestment rate.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Rate of return (definition) | $PW(i^*) = 0 \iff FW(i^*) = 0 \iff AW(i^*) = 0$ | Accept only if i* >= MARR. The three equations share the same root, so use whichever is easiest to evaluate. |
| Interpolation of the rate of return | $i^* \approx i_1 + (i_2-i_1)\frac{PW_1}{PW_1-PW_2}$ | Requires PW_1 > 0 at i_1 and PW_2 < 0 at i_2. Slightly overestimates because PW is convex in i. |
| Simple payback, uniform cash flow | $n = \frac{FC}{A}$ | Undiscounted and uniform. Ignores interest and everything after payback; use as a screen only. |
| Simple payback, uneven cash flow | $smallest\ n\ with\ \sum_{t=1}^{n} CF_t \ge FC$ | Interpolate inside the year that closes the gap: n = k + (remaining)/(CF_{k+1}). |
| Discounted payback, uniform cash flow | $n = \frac{-\ln(1 - FC\,i/A)}{\ln(1+i)}$ | Exists only when A > FC i; otherwise the discounted stream never repays the first cost. |
| Discounted payback, general | $smallest\ n\ with\ \sum_{t=1}^{n} CF_t(1+i)^{-t} \ge FC$ | Always longer than simple payback for i > 0 and a positive first cost. |
| External rate of return | $(1+ERR)^n = \frac{FW_{in}}{FW_{out}}$ | Both FW terms are accumulated at the MARR, so ERR assumes reinvestment at the MARR, not at the IRR. |
| Acceptance test | $accept\ if\ i^* \ge MARR$ | In Philippine problems the MARR is the 'rate money is worth' or the required/passive rate. |
| Present worth at the MARR as a cross-check | $PW(MARR) \ge 0 \iff i^* \ge MARR$ | For simple (conventional) cash flows the two tests always agree; use PW when the sign pattern is unusual. |

## Worked Problems

### P1. An investment of ₱1,000,000 returns ₱250,000 per year for 6 years with no salvage. Find the rate of return by trial interpolation.

**Given:** $FC = 1000000$; $A = 250000$ for 6 years; trial rates 12% and 14%

**Solution:**

1. Set $PW = 0$: $-1000000 + 250000(P/A,i,6) = 0$, so $(P/A,i,6) = 4.0000$.
2. At 12%: $(P/A,12\%,6) = 4.111407$, $PW_1 = -1000000 + 1027852 = +27852$.
3. At 14%: $(P/A,14\%,6) = 3.888672$, $PW_2 = -1000000 + 972168 = -27832$.
4. $i^* \approx 0.12 + (0.02)\frac{27852}{27852+27832} = 0.12 + 0.02(0.50018) = 0.130004$.
5. The exact root is 12.978% (at 13%, $(P/A,13\%,6) = 3.997550$ and $PW = -613$), so the interpolation is high by only about 0.02 percentage points — the convexity error of a straight line across a 2-point bracket.

> [!success]- Answer
> **$i^* \approx 13.0\%$.**

> [!warning] Trap
> Inverting the interpolation weight, i_1 + (i_2-i_1)PW_2/(PW_1-PW_2), which lands near 11% instead of 13%. The weight always belongs to the lower rate and its own positive present worth.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `SOLVE` on `−1000000+250000((1+X)^6−1)÷(X(1+X)^6)=0` with a guess of 0.12 → $X$ = **0.129780** = **12.978** %.
> 2. Residual check — key the same expression with `X` now holding the root → **0**, against the $(P/A)$ sought of **4.000000** (at 13 % it is **3.997550**).
>
> SOLVE returns the exact root the note quotes (12.978 %); its 12–14 % interpolation lands on 13.0004 %, which the note rounds to 13.0 %.

### P2. A machine costs ₱500,000, earns ₱120,000 per year for 5 years and can be sold for ₱80,000 at the end of year 5. Find the rate of return.

**Given:** $FC = 500000$; $A = 120000$ for 5 years; $SV = 80000$; $i = 0.10$

**Solution:**

1. $PW(i) = -500000 + 120000(P/A,i,5) + 80000(P/F,i,5)$.
2. At 10%: $(P/A,10\%,5) = 3.790787$ and $(P/F,10\%,5) = 0.620921$, so $PW = -500000 + 454894 + 49674 = +4568$.
3. At 12%: $(P/A,12\%,5) = 3.604776$ and $(P/F,12\%,5) = 0.567427$, so $PW = -500000 + 432573 + 45394 = -22033$.
4. $i^* \approx 0.10 + (0.02)\frac{4568}{4568+22033} = 0.10 + 0.02(0.17173) = 0.103435$.

> [!success]- Answer
> **$i^* \approx 10.34\%$.**

> [!warning] Trap
> Omitting the ₱80,000 salvage. Without it the 10% present worth turns negative and the bracket moves to 6-8%, giving a rate near 6.4% — almost four points too low.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `SOLVE` on `−500000+120000((1+X)^5−1)÷(X(1+X)^5)+80000(1+X)^-5=0`, guess 0.10 → $X$ = **0.103315** = **10.33** %.
> 2. The 10–12 % interpolation gives **10.3435** %, the note's 10.34 % — high, exactly as its convexity argument predicts.
>
> Enter the salvage as `+80000(1+X)^-5`; dropping it moves the root to about 6.4 %, the note's trap.

### P3. A ₱750,000 investment yields ₱150,000 per year. Find the simple payback and the discounted payback at 12%.

**Given:** $FC = 750000$; $A = 150000$ per year; $i = 0.12$

**Solution:**

1. Simple payback: $n = FC/A = 750000/150000 = 5.0$ years.
2. Discounted payback: $n = -\ln(1 - FC\,i/A)/\ln(1+i)$ with $FC\,i/A = 750000(0.12)/150000 = 0.6$.
3. $n = -\ln(0.4)/\ln(1.12) = 0.916291/0.113329$.
4. $n = 8.085$ years.

> [!success]- Answer
> **Simple payback 5.00 years; discounted payback 8.09 years.**

> [!warning] Trap
> Reporting 5 years as the discounted payback. Discounting always lengthens payback: here the last ₱150,000 of each early year is worth less than face, so three extra years of receipts are needed.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `750000×0.12÷150000` → $FC\,i/A$ = **0.6**, so the logarithm is taken of **0.4**.
> 2. `−ln(0.4)÷ln(1.12)` → discounted payback = **8.085250** years, against simple `750000÷150000` → **5.00** years.

### P4. ₱2,000,000 is invested and returns ₱600,000 per year for 5 years. Reinvestment is at the 10% MARR. Find the external rate of return and compare it with the internal rate of return.

**Given:** $FC = 2000000$; $A = 600000$ for 5 years; MARR = 10%

**Solution:**

1. Accumulate the inflows to year 5 at the MARR: $FW_{in} = 600000(F/A,10\%,5) = 600000(6.105100) = 3663060$.
2. The only outflow is the time-0 investment, so $FW_{out} = 2000000$.
3. $(1+ERR)^5 = 3663060/2000000 = 1.831530$.
4. $ERR = 1.831530^{0.2} - 1 = 0.1286$.
5. For comparison, the IRR solves $(P/A,i,5) = 3.3333$, which gives $i \approx 15.24\%$.

> [!success]- Answer
> **$ERR \approx 12.86\%$; the IRR is about 15.24%.**

> [!warning] Trap
> Reporting the IRR when the problem names a reinvestment rate. The ERR compounds the inflows at the MARR, so it is always the lower and more conservative figure.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `600000((1.1)^5−1)÷0.1` → $FW_{in}$ = **3663060.00**; `Ans÷2000000` → **1.831530**.
> 2. `Ans^(1÷5)−1` → $ERR$ = **0.128659** = **12.866** %, the note's 12.86 %.
> 3. IRR for comparison: `SHIFT` `SOLVE` on `−2000000+600000((1+X)^5−1)÷(X(1+X)^5)=0`, guess 0.15 → $X$ = **0.152382** = **15.24** %.

### P5. A line costs ₱1,200,000 and returns ₱250,000, ₱350,000, ₱450,000 and ₱450,000 at the ends of years 1 to 4. Find the simple payback.

**Given:** $FC = 1200000$; $CF = 250000, 350000, 450000, 450000$

**Solution:**

1. Cumulative receipts: year 1 = 250000; year 2 = 600000; year 3 = 1050000; year 4 = 1500000.
2. The first cost is passed during year 4.
3. Shortfall at the start of year 4: $1200000 - 1050000 = 150000$.
4. Fraction of year 4 required: $150000/450000 = 0.333$.
5. $n = 3 + 0.333 = 3.33$ years.

> [!success]- Answer
> **Payback = 3.33 years.**

> [!warning] Trap
> Rounding up to 4 years because that is the year in which the cumulative total first exceeds the first cost. The standard answer interpolates inside the closing year.

## Traps & Exam Notes

- **Treating a positive rate of return as an accept decision.** The test is i* >= MARR; a project earning 10% against a 15% MARR must be rejected.
- **Flipping the interpolation weight.** The weight PW_1/(PW_1 - PW_2) belongs to the lower rate and to the present worth that is still positive.
- **Interpolating across a wide bracket.** PW is convex in i, so a 5-point bracket produces a visibly overstated rate. Use the trial rates the examiner supplies, one or two points apart.
- **Stopping the payback year count at the year that crosses.** Interpolate within that year: n = k + (unrecovered balance)/(next cash flow).
- **Using simple payback as the decision rule.** It ignores all cash flow after the payback date and, in the simple form, interest as well; a project with a fast payback and a poor tail can rank above a much better one.
- **Ignoring a second sign change.** More than one sign change in the cash-flow sequence can produce multiple rates of return; use PW at the MARR or the ERR instead.
- **Using the IRR as the reinvestment assumption when a rate is stated.** When the problem gives a reinvestment or financing rate, the ERR is the answer.

## See Also

- [[07_PW,_FW_and_AW_Methods]]
- [[09_Benefit-Cost_Ratio]]
- [[12_Break-Even_and_Cost_Analysis]]

---

[[07_PW,_FW_and_AW_Methods|⬅ 07]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Benefit-Cost_Ratio|09 ➡]]
