---
id: GEAS-05-11
title: "Depreciation: DB and DDB"
part: "03_GEAS"
area: "05_Engineering_Economy"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[10_Depreciation_SLM_and_SYD]]", "[[01_Simple_and_Compound_Interest]]"]
tags: ["ece", "geas", "engineering_economy"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Depreciation: DB and DDB

> [!abstract] Scope
> Depreciate an asset by a fixed percentage of its declining book value, including the double-declining rate, the salvage floor and the switch to straight line.

## Core Concept

> [!tip] Intuition
> Declining balance charges a fixed percentage of whatever book value is left, so the deductions are large at first and shrink every year. Applied strictly, the book value approaches zero but never reaches the salvage value, which is why the method needs a floor and a switch.

**Mechanics of declining balance.** Each year's charge is a fixed rate $R$ applied to the book value at the start of that year: $d_m = R\,BV_{m-1}$, so $BV_m = BV_{m-1}(1-R) = FC(1-R)^m$. The distinguishing feature is that the rate is applied to book value, not to the depreciable basis, which means estimated salvage value is **not** subtracted before the calculation. Consequently the book value falls geometrically and never reaches zero; it approaches zero only asymptotically.

**Why the double-declining rate is 2/n.** Straight-line depreciation writes off a fraction $1/n$ of the basis per year, so $1/n$ is the natural reference rate. Declining balance doubles it, $R = 2/n$, which is why the method is called double-declining balance (DDB). Some tax regimes use 150% declining balance, $R = 1.5/n$. Nothing in the formula refers to salvage value: the rate is set purely by the service life, and the salvage value enters only as the floor below which book value must not be depreciated.

**The salvage floor and the switch to straight line.** Because DDB ignores salvage, it can push book value below the estimated salvage value, which is not permitted. Two standard repairs exist. The simpler one caps the charge so that $BV_m = \max(FC(1-R)^m,\,SV)$ and depreciation stops once the floor is reached. The better one switches to straight line: in each year compare the DDB charge $R\,BV_{m-1}$ with the straight-line charge on the remaining book value over the remaining life, $(BV_{m-1}-SV)/(n-m+1)$, and switch permanently in the first year the straight-line amount is larger. The switch maximises the deductions while landing exactly on salvage at the end of the life, so it is the standard textbook treatment.

**Finding a rate that lands on salvage.** If a problem states that the book value at the end of the life equals the salvage value under a pure declining-balance schedule, the rate is pinned by $SV = FC(1-R)^n$, that is $R = 1 - (SV/FC)^{1/n}$. This rate is not normally $2/n$, and the two are frequently confused: a 2/n rate on a 6-year asset leaves a book value well below salvage. In Philippine tax practice declining balance is an accepted method under the regulations implementing the National Internal Revenue Code, provided the rate is reasonable and applied consistently; as with every method, the total charge over the life can never exceed $FC - SV$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Declining-balance charge | $d_m = R\,BV_{m-1}$ | R is the fixed rate per period; the charge is a percentage of start-of-year book value, not of the basis. |
| Declining-balance book value | $BV_m = FC(1-R)^m$ | Geometric decline. Salvage is not subtracted before applying R, so book value never reaches zero. |
| Double-declining-balance rate | $R = \frac{2}{n}$ | Twice the straight-line rate 1/n. Depends only on the service life; salvage does not appear. |
| 150-percent declining-balance rate | $R = \frac{1.5}{n}$ | Used by some tax regimes; the same recurrence with a smaller multiplier. |
| Book value with a salvage floor | $BV_m = \max\left(FC(1-R)^m,\ SV\right)$ | Depreciation stops at salvage; no further charge is allowed once the floor is hit. |
| Rate that lands exactly on salvage | $R = 1 - \left(\frac{SV}{FC}\right)^{1/n}$ | Use only when the problem says the schedule ends at SV; it is generally not 2/n. |
| Switch-to-SLM test | $d_m = \max\left(R\,BV_{m-1},\ \frac{BV_{m-1}-SV}{n-m+1}\right)$ | Compare every year with the SLM charge on the remaining book value over the remaining life; switch once and stay switched. |
| Straight-line reference rate | $R_{SL} = \frac{1}{n}$ | The benchmark the accelerated rate is a multiple of; also the charge used after a switch. |

## Interactive Widget

**Depreciation Schedule Comparator**

![[Depreciation_Schedule_Comparator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. An asset costs ₱1,000,000, has a 5-year life and a ₱50,000 salvage value. Find the DDB depreciation and book value for each of the 5 years.

**Given:** $FC = 1000000$; $n = 5$; $SV = 50000$; DDB

**Solution:**

1. $R = 2/n = 2/5 = 0.40$.
2. Year 1: $d = 0.40(1000000) = 400000$; $BV_1 = 600000$.
3. Year 2: $d = 0.40(600000) = 240000$; $BV_2 = 360000$.
4. Year 3: $d = 0.40(360000) = 144000$; $BV_3 = 216000$.
5. Year 4: $d = 0.40(216000) = 86400$; $BV_4 = 129600$. Year 5: $d = 0.40(129600) = 51840$; $BV_5 = 77760$.
6. Check: $BV_5 = 1000000(0.60)^5 = 77760$, which is still above the ₱50,000 salvage.

> [!success]- Answer
> **$BV_5 = 77760$; the schedule does not reach salvage under pure DDB.**

> [!warning] Trap
> Expecting book value to land on the ₱50,000 salvage after 5 years. DDB applies the rate to the declining book value, so it leaves ₱77,760; the salvage value is only a floor, not a target.

> [!tip]- Calculator technique (Canon F-789SGA) — TABLE
> 1. `MODE` `6` TABLE: `f(X)=1000000×0.6^(X−1)×0.4` for the charge and `g(X)=1000000×0.6^X` for book value; Start **1**, End **5**, Step **1**.
> 2. Scroll: charges **400000** → **240000** → **144000** → **86400** → **51840**; book values **600000** → **360000** → **216000** → **129600** → **77760**.
> 3. The closing book value **77760** is still above the ₱50,000 salvage — pure DDB approaches the floor without reaching it.

### P2. Rework the same asset using DDB with a switch to straight line, and find the depreciation in the switch year.

**Given:** $FC = 1000000$; $n = 5$; $SV = 50000$; $R = 0.40$

**Solution:**

1. DDB through year 4 is unchanged: charges of 400000, 240000, 144000, 86400; $BV_4 = 129600$.
2. Start of year 5, remaining life 1 year: SLM charge $= (129600-50000)/1 = 79600$ against DDB $0.40(129600) = 51840$.
3. SLM is larger, so switch: $d_5 = 79600$ and $BV_5 = 129600 - 79600 = 50000$.
4. Total charge $= 400000+240000+144000+86400+79600 = 950000 = FC - SV$.

> [!success]- Answer
> **Switch in year 5: $d_5 = 79600$, $BV_5 = 50000$ exactly.**

> [!warning] Trap
> Switching in year 4. The comparison must use the SLM charge on the remaining book value over the remaining life: in year 4 that is (216000-50000)/2 = ₱83,000, still below the ₱86,400 DDB charge, so switching then would under-depreciate.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1000000×0.6^4` → $BV_4$ = **129600**, so the year-5 DDB charge is `0.4×Ans` → **51840**.
> 2. The SLM charge on the remaining value, `(129600−50000)÷1` → **79600**, is larger: $d_5$ = **79600** and `129600−79600` → $BV_5$ = **50000** exactly.

### P3. An asset costs ₱2,000,000, has a 6-year life and must have a book value of exactly ₱250,000 at the end of year 6 under declining balance. Find the required rate, and compare it with the DDB rate.

**Given:** $FC = 2000000$; $SV = 250000$; $n = 6$; pure declining balance ending at SV

**Solution:**

1. Set $SV = FC(1-R)^n$: $250000 = 2000000(1-R)^6$, so $(1-R)^6 = 0.125$.
2. $1-R = (0.125)^{1/6} = 0.707107$.
3. $R = 1 - 0.707107 = 0.292893$.
4. Compare with DDB: $2/n = 0.3333$, which would leave $2000000(0.6667)^6 = 175583$, below the ₱250,000 floor.

> [!success]- Answer
> **$R = 29.29\%$, not the DDB rate of 33.33%.**

> [!warning] Trap
> Assuming the double-declining rate automatically lands on salvage. 2/n = 33.33% overshoots and drives book value to ₱175,583, below salvage; only 29.29% ends at ₱250,000.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1−(250000÷2000000)^(1÷6)` → $R$ = **0.292893** = **29.29** %, the rate that lands exactly on salvage.
> 2. The DDB rate instead: `2000000×(1−2÷6)^6` → **175582.99**, below the ₱250,000 floor — which is why 33.33 % overshoots here.

### P4. An asset costs ₱500,000 with an 8-year life and a ₱40,000 salvage value. Compare the first-year depreciation under SLM, SYD and DDB.

**Given:** $FC = 500000$; $n = 8$; $SV = 40000$

**Solution:**

1. SLM: $d_1 = (500000-40000)/8 = 57500$.
2. SYD: $S = 36$, so $d_1 = 460000(8/36) = 102222$.
3. DDB: $R = 2/8 = 0.25$, and the rate applies to the full book value: $d_1 = 0.25(500000) = 125000$.
4. Ordering: DDB 125000 > SYD 102222 > SLM 57500.

> [!success]- Answer
> **First-year depreciation: ₱125,000 (DDB), ₱102,222 (SYD), ₱57,500 (SLM).**

> [!warning] Trap
> Computing first-year DDB as (FC-SV)(2/n) = 460000(0.25) = ₱115,000. DDB applies the rate to book value, which in year 1 is the full first cost — no salvage subtraction.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Chain the three on one line with `ALPHA` `:` — `(500000−40000)÷8 : 460000×8÷36 : 0.25×500000` → **57500** → **102222.22** → **125000**.
> 2. So DDB **125000** > SYD **102222** > SLM **57500**; the DDB rate bites on the full book value, with no salvage subtracted.

### P5. An asset costs ₱800,000 with a 4-year life and a ₱100,000 salvage value. Find the book value after 3 years under DDB, respecting the salvage floor, and state the year-4 charge.

**Given:** $FC = 800000$; $n = 4$; $SV = 100000$; DDB with floor

**Solution:**

1. $R = 2/4 = 0.50$.
2. Year 1: $d = 400000$, $BV_1 = 400000$. Year 2: $d = 200000$, $BV_2 = 200000$.
3. Year 3: $d = 0.50(200000) = 100000$, $BV_3 = 100000$, exactly the salvage value.
4. $BV_3 = 800000(0.50)^3 = 100000$, so the floor is reached at the end of year 3.
5. Year-4 charge = 0: a further $0.50(100000) = 50000$ would drive book value to ₱50,000, below salvage.

> [!success]- Answer
> **$BV_3 = 100000$; the year-4 depreciation charge is zero.**

> [!warning] Trap
> Charging ₱50,000 in year 4 and reporting a book value of ₱50,000. Depreciation stops once book value equals salvage; the salvage value is a floor and an asset cannot be written below it.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `800000×0.5^3` → $BV_3$ = **100000**, exactly the salvage value; the charges run `0.5×800000` → **400000**, `0.5×400000` → **200000**, `0.5×200000` → **100000**.
> 2. Year 4 would charge `0.5×100000` → **50000** and take book value to **50000**, below salvage, so the year-4 charge is **0**.

## Traps & Exam Notes

- **Subtracting salvage before applying the rate.** Declining balance applies R to book value; subtracting SV first understates every year's charge, most severely in year 1.
- **Assuming DDB ends at salvage.** Pure DDB leaves a residual book value above (or occasionally below) salvage; the floor or the switch is what forces the ending value.
- **Switching to straight line too early.** The test compares the SLM charge on the remaining book value over the remaining life against the DDB charge, every year. Switching before the SLM amount is larger reduces total deductions.
- **Confusing the rate base.** The 2/n rate is a percentage of book value; the SLM rate 1/n is a percentage of the depreciable basis. The same numerical rate means different pesos.
- **Using 2/n when the problem pins the ending book value.** If the schedule must end at SV, the rate is 1 - (SV/FC)^(1/n), which is generally smaller than 2/n.
- **Charging depreciation below salvage to 'finish' the asset.** Once book value equals salvage, the charge is zero for the remaining years, and the total charged over the life is exactly FC - SV.

## See Also

- [[10_Depreciation_SLM_and_SYD]]
- [[13_Replacement_Analysis]]
- [[06_Capitalized_Cost]]

---

[[10_Depreciation_SLM_and_SYD|⬅ 10]] · [[_MOC_Engineering_Economy|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Break-Even_and_Cost_Analysis|12 ➡]]
