---
title: Engineering Economy
part: GEAS
tags: [ece, geas, formula-sheet]
topics: 13
---

## Part A — Time Value of Money

### 1. Simple and Compound Interest

![](https://www.youtube.com/watch?v=vQmZqjlPuNw)

*Video: Simple, Compound and Continuous Compound Interest — Easy Engineering, 24:55*

**Simple interest ★** — $I$ = interest in ₱, $P$ = principal, $i$ = rate per period (decimal), $n$ = periods.

$$I = Pni,\qquad F = P(1+ni),\qquad P = \frac{F}{1+ni}$$

**Compound interest ★** — $F$ = future worth, $P$ = present worth, $i$ in decimal per period.

$$F = P(1+i)^n,\qquad P = F(1+i)^{-n},\qquad i = \left(\frac{F}{P}\right)^{1/n}-1,\qquad n = \frac{\ln(F/P)}{\ln(1+i)}$$

**Factor notation**

$$\left(\frac{F}{P},i,n\right) = (1+i)^n,\qquad \left(\frac{P}{F},i,n\right) = (1+i)^{-n} = \frac{1}{(1+i)^n}$$

**Rate of interest and discount:** $i = \frac{I}{Pn}$; simple discount $F = \frac{P}{1-dn}$ with $d$ = discount rate (decimal).
**Conditions:** simple interest is linear and applies to a single principal over one period; compound interest assumes interest is reinvested each period at a constant $i$.

> [!tip] High-yield ★
> The 72 rule: money doubles in about $\frac{72}{100i}$ years. At 8% it doubles in roughly 9 years — a fast check on any "how long" item.

---

### 2. Nominal vs Effective Rates

![](https://www.youtube.com/watch?v=V10VT_8xozU)

*Video: Nominal and Effective Rate of Interest — Easy Engineering, 16:18*

**Effective annual rate ★** — $r$ = nominal rate (decimal/year), $m$ = compounding periods per year, $i$ = effective rate per period.

$$i_{\text{eff}} = \left(1+\frac{r}{m}\right)^m - 1,\qquad i_{\text{period}} = \frac{r}{m},\qquad r = m\left[(1+i_{\text{eff}})^{1/m}-1\right]$$

**Continuous compounding**

$$i_{\text{eff}} = e^r - 1,\qquad F = Pe^{rn},\qquad P = Fe^{-rn}$$

**Common compounding table**

| Compounding | $m$ | Effective rate at $r = 12\%$ |
|---|---|---|
| Annual | 1 | 12.000% |
| Semiannual | 2 | 12.360% |
| Quarterly | 4 | 12.551% |
| Monthly | 12 | 12.683% |
| Daily | 365 | 12.748% |
| Continuous | $\infty$ | 12.750% |

**Conditions:** compounding frequency must match the payment period before using annuity factors; for $m>1$, $i_{\text{eff}}>r$ always.

> [!warning] Exam trap
> A 12% nominal rate compounded monthly is **not** 12% effective. Convert with $i = r/m = 1\%$ per month, and use $n$ in **months** — never mix a monthly rate with an annual $n$.

---

### 3. Ordinary Annuity and Annuity Due

![](https://www.youtube.com/watch?v=rViT_ODg5Yk)

*Video: Ordinary Annuity vs Annuity Due — Edspira, 4:47*

**Ordinary annuity ★** — $A$ = equal end-of-period payment in ₱, $i$ per period, $n$ = number of payments.

$$P = A\left[\frac{(1+i)^n-1}{i(1+i)^n}\right] = A(P/A,i,n),\qquad F = A\left[\frac{(1+i)^n-1}{i}\right] = A(F/A,i,n)$$

$$A = P\left[\frac{i(1+i)^n}{(1+i)^n-1}\right] = P(A/P,i,n),\qquad A = F\left[\frac{i}{(1+i)^n-1}\right] = F(A/F,i,n)$$

**Annuity due ★** — payments at the **beginning** of each period.

$$P_{\text{due}} = P_{\text{ord}}(1+i),\qquad F_{\text{due}} = F_{\text{ord}}(1+i),\qquad A_{\text{due}} = \frac{A_{\text{ord}}}{1+i}$$

**Deferred and unknown $n$**

$$n = \frac{\ln\!\left[\frac{A}{A-Pi}\right]}{\ln(1+i)},\qquad P_{\text{deferred}} = A(P/A,i,n)(P/F,i,k)$$

**Conditions:** equal payments, constant $i$, first ordinary payment exactly one period from now; annuity-due factors are always the ordinary factor times $(1+i)$.

> [!tip] High-yield ★
> "First payment now" or "payment at the beginning" = annuity due. One phrase costs the whole item if you forget the $(1+i)$ multiplier.

---

### 4. Deferred Annuities and Perpetuities

![](https://www.youtube.com/watch?v=ZBr1AZtvMCw)

*Video: Calculating Deferred Annuities — Study Force, 7:47*

**Perpetuity ★** — $A$ in ₱ per period, $i$ per period, infinite $n$.

$$P = \frac{A}{i},\qquad A = Pi,\qquad P_{\text{perpetuity due}} = \frac{A}{i}(1+i)$$

**Deferred perpetuity and growing perpetuity**

$$P = \frac{A}{i}(P/F,i,k),\qquad P = \frac{A_1}{i-g}\ (i>g),\qquad P = \frac{A}{i^2}\ \text{(perpetual arithmetic gradient)}$$

**Deferred annuity** — $k$ = number of periods before the first payment.

$$P = A\left[\frac{(1+i)^n-1}{i(1+i)^n}\right](1+i)^{-k} = A(P/A,i,n)(P/F,i,k)$$

**Conditions:** perpetuity requires the principal to remain untouched so only interest is withdrawn; the growing perpetuity demands $i>g$ or the sum diverges.

> [!warning] Exam trap
> A perpetuity is **not** $A\times n$. Plugging any finite $n$ into the annuity factor for an endless payment stream underestimates $P$ — use $A/i$.

---

### 5. Arithmetic and Geometric Gradients

![](https://www.youtube.com/watch?v=3YeDeCawZog)

*Video: Engineering Economic Analysis: Gradient Series — Learning OnDemand, 14:43*

**Arithmetic gradient ★** — $G$ = uniform increase per period in ₱; first gradient payment at period 2.

$$P = G\left[\frac{1}{i}-\frac{n}{i}\left(\frac{1}{(1+i)^n}\right)\right]\frac{1}{i}\cdot i = \frac{G}{i}\left[\frac{(1+i)^n-1}{i(1+i)^n}-\frac{n}{(1+i)^n}\right] = G(P/G,i,n)$$

$$A = G\left[\frac1i - \frac{n}{(1+i)^n-1}\right] = G(A/G,i,n),\qquad F = G(F/G,i,n)$$

**Geometric gradient ★** — $g$ = constant growth rate (decimal), series $A_1, A_1(1+g), A_1(1+g)^2,\ldots$

$$P = A_1\left[\frac{1-\left(\frac{1+g}{1+i}\right)^n}{i-g}\right]\ (i\neq g),\qquad P = \frac{nA_1}{1+i}\ (i = g)$$

**Conditions:** arithmetic gradient assumes the increase is constant in absolute ₱ and starts one period after the base payment; geometric gradient assumes a constant percentage change and requires $i\neq g$ for the closed form.

> [!tip] High-yield ★
> For the arithmetic gradient, $P_{\text{total}} = A(P/A,i,n) \pm G(P/G,i,n)$ — the base annuity and the gradient are computed separately, never combined into one factor.

---

### 6. Capitalized Cost

![](https://www.youtube.com/watch?v=Lu1i8dWKhEM)

*Video: Capitalized Cost — LDP CE, 14:15*

**Capitalized cost ★** — $CC$ in ₱, $FC$ = first cost, $A$ = recurring annual cost, $i$ = interest rate per period.

$$CC = FC + \frac{A}{i},\qquad CC = FC + \frac{A_{\text{periodic}}}{(1+i)^k-1},\qquad CC = FC - \frac{SV}{i}\ \text{(with salvage)}$$

**Perpetual periodic maintenance**

$$A_{\text{equivalent annual}} = A_{\text{periodic}}\left[\frac{i}{(1+i)^k-1}\right] = A_{\text{periodic}}(A/F,i,k),\qquad k = \text{renewal interval (periods)}$$

**Alternative comparison**

$$\Delta CC = CC_2 - CC_1 = (FC_2-FC_1) + \frac{A_2-A_1}{i}$$

**Conditions:** capitalized cost assumes the asset or service is needed **forever**; salvage value is subtracted as a perpetuity, and all alternatives must give identical service.

> [!warning] Exam trap
> Replacement every $k$ years is not an annual cost of $\frac{FC}{k}$. Convert with $A = FC(A/F,i,k)$ before dividing by $i$ — otherwise the interest earned between replacements is ignored.

---

## Part B — Project Evaluation

### 7. PW, FW and AW Methods

![](https://www.youtube.com/watch?v=WYbC1-TsGis)

*Video: Present Worth and Annual Worth Explained — Engineering Economics Guy, 24:26*

**Present worth ★** — all cash flows discounted to $t = 0$; $CF_t$ in ₱ at period $t$.

$$PW = \sum_{t=0}^{n}\frac{CF_t}{(1+i)^t},\qquad PW = -FC + A(P/A,i,n) + F(P/F,i,n)$$

**Future worth and annual worth ★**

$$FW = PW(F/P,i,n) = \sum_{t=0}^{n}CF_t(1+i)^{n-t},\qquad AW = PW(A/P,i,n) = FW(A/F,i,n)$$

**Decision rules**

| Criterion | Accept | Compare |
|---|---|---|
| PW | $PW \ge 0$ | higher PW wins |
| FW | $FW \ge 0$ | higher FW wins |
| AW | $AW \ge 0$ | higher AW wins |
| Equal lives | any of the three | consistent ranking |
| Unequal lives | use AW or study period | never compare raw PW |

**Sensitivity analysis ★** — re-evaluating a measure of worth as one or more parameters vary, and finding the break-even value where the decision flips.

$$\text{Sensitivity} = \frac{\%\ \Delta \text{measure of worth}}{\%\ \Delta \text{parameter}},\qquad \text{decision flips where } PW(\text{parameter}) = 0$$

**Conditions:** all methods use the same MARR (minimum attractive rate of return); PW and FW require a common study period, while AW allows direct comparison of unequal lives; sensitivity analysis varies one parameter at a time unless a joint scenario is stated.

> [!tip] High-yield ★
> For unequal service lives the default answer is **annual worth**. If the problem forces PW, set a study period equal to the LCM of the lives and include replacement costs.

---

### 8. Rate of Return and Payback

![](https://www.youtube.com/watch?v=iGImOv2rqHM)

*Video: How to Calculate the Payback Period — Edspira, 3:12*

**Rate of return ★** — IRR is the $i$ that makes $PW = 0$; ERR uses an external reinvestment rate.

$$0 = -FC + \sum_{t=1}^{n}\frac{CF_t}{(1+IRR)^t},\qquad \text{Accept if } IRR \ge MARR$$

$$ERR:\quad -FC(F/P,i_{\text{ext}},n) + \sum CF_t(F/P,i_{\text{ext}},n-t) = 0 \Rightarrow \text{compare with MARR}$$

**Incremental analysis** — for $B$ over $A$: accept $B$ only if $\Delta IRR_{B-A} \ge MARR$.

$$0 = \Delta PW = PW_B - PW_A \quad \text{solved for } \Delta i$$

**Payback period ★** — $P$ = initial investment in ₱, $A$ = uniform annual net cash flow.

$$\text{Simple payback} = \frac{P}{A}\ \text{(periods)},\qquad \text{Payback}_{k} = k + \frac{\lvert\text{cumulative CF at }k\rvert}{CF_{k+1}}$$

$$\text{Discounted payback: solve } \sum_{t=1}^{np}\frac{CF_t}{(1+i)^t} = P$$

**Conditions:** IRR assumes reinvestment at IRR itself and can give multiple roots when signs alternate more than once; simple payback ignores the time value of money and all cash flow beyond the cutoff.

> [!warning] Exam trap
> On alternatives, never compare IRR values directly — pick the higher-cost option only if the **incremental** rate of return exceeds MARR. A lower-cost option with a higher IRR can still be the wrong choice.

---

### 9. Benefit-Cost Ratio

**Conventional BCR ★** — $B$ = benefits, $C$ = costs, $O\&M$ = operating and maintenance, all in ₱ present worth.

$$BCR = \frac{PW_{\text{benefits}}}{PW_{\text{total costs}}} = \frac{PW_B}{PW_{\text{initial}} + PW_{O\&M}}$$

**Modified BCR and net benefit**

$$BCR_{\text{modified}} = \frac{PW_B - PW_{O\&M}}{PW_{\text{initial}}},\qquad \text{Net benefit} = PW_B - PW_{\text{total costs}}$$

**Decision rules:** $BCR > 1$ accept, $BCR = 1$ break-even, $BCR < 1$ reject; for mutually exclusive public projects use **incremental** BCR = $\frac{\Delta B}{\Delta C} \ge 1$.
**Conditions:** all benefits and costs must be expressed in present worth at the same social discount rate, and intangible benefits are monetized or stated separately.

> [!tip] High-yield ★
> Conventional and modified BCR give different numbers but the **same accept/reject decision** for an independent project. For ranking, use incremental BCR — ranking by raw BCR is invalid.

---

## Part C — Depreciation and Decisions

### 10. Depreciation: SLM and SYD

![](https://www.youtube.com/watch?v=UeDW3Fd6BKk)

*Video: Sum of the Years' Digits Depreciation — Edspira, 10:00*

**Straight-line method ★** — $FC$ = first cost, $SV$ = salvage value, $n$ = useful life (years), all in ₱.

$$d = \frac{FC - SV}{n},\qquad BV_k = FC - k\,d,\qquad d_k = \frac{FC-SV}{n}\ \text{(every year)}$$

**Sum-of-years'-digits ★** — $SOY = \frac{n(n+1)}{2}$, $k$ = year index.

$$\text{SOY} = \frac{n(n+1)}{2},\qquad d_k = (FC-SV)\frac{n-k+1}{SOY},\qquad BV_k = FC - (FC-SV)\frac{\sum_{j=1}^{k}(n-j+1)}{SOY}$$

**Comparison at 5-year life, $FC-SV = 900$**

| Year | SLM $d_k$ | SYD $d_k$ | SYD fraction |
|---|---|---|---|
| 1 | 180 | 300 | $\frac{5}{15}$ |
| 2 | 180 | 240 | $\frac{4}{15}$ |
| 3 | 180 | 180 | $\frac{3}{15}$ |
| 4 | 180 | 120 | $\frac{2}{15}$ |
| 5 | 180 | 60 | $\frac{1}{15}$ |

**Depreciation as a non-cash expense ★** — it lowers taxable and net income but involves no cash outflow, so it is added back when computing operating cash flow.

$$OCF = \text{net income} + \text{depreciation},\qquad \text{Taxable income} = \text{revenue} - \text{costs} - \text{depreciation}$$

**Conditions:** SLM assumes uniform consumption of value; SYD is an accelerated method, front-loading depreciation while never depreciating below salvage value; the add-back affects the cash-flow computation only and does not restore book value.

> [!tip] High-yield ★
> SYD book value at the end of life always equals $SV$, and the year-$(n)$ depreciation equals $\frac{FC-SV}{SOY}$ — the smallest charge, not zero.

---

### 11. Depreciation: DB and DDB

![](https://www.youtube.com/watch?v=M-VzJ51zZoM)

*Video: Double Declining Balance Depreciation — Accounting Stuff, 6:00*

**Declining balance ★** — $d$ = fixed rate (decimal), applied to the **book value** of the previous year.

$$d_k = d\,BV_{k-1},\qquad BV_k = FC(1-d)^k,\qquad d = 1-\left(\frac{SV}{FC}\right)^{1/n}\ \text{(to reach }SV\text{ in }n\text{ years)}$$

**Double declining balance ★** — rate is twice the straight-line rate; salvage value is **not** subtracted up front.

$$d = \frac{2}{n},\qquad d_k = \frac{2}{n}BV_{k-1},\qquad BV_k = FC\left(1-\frac{2}{n}\right)^k$$

**Switching and limits**

$$BV_{\text{final}} \ge SV\ \text{always},\qquad \text{switch to SLM when } d_{\text{SLM on remaining}} > d_{\text{DB}}$$

**Sample: $FC = 10{,}000$, $n = 5$, DDB**

| Year | $d_k$ (DDB) | $BV_k$ |
|---|---|---|
| 1 | 4,000 | 6,000 |
| 2 | 2,400 | 3,600 |
| 3 | 1,440 | 2,160 |
| 4 | 864 | 1,296 |
| 5 | 518.40 | 777.60 |

**Conditions:** declining balance never reaches $SV = 0$ in finite time, so the implied rate form $d = 1-(SV/FC)^{1/n}$ must be used when a specific salvage is required; DDB ignores $SV$ until the book value would fall below it.

> [!warning] Exam trap
> DDB applies its rate to **book value**, not to the depreciable base $(FC-SV)$ — that mistake is the most common depreciation error on the boards.

---

### 12. Break-Even and Cost Analysis

![](https://www.youtube.com/watch?v=XZ0riJeipw4)

*Video: Break-Even Analysis and Chart — Educationleaves, 4:39*

**Break-even point ★** — $FC$ = fixed cost in ₱/period, $v$ = variable cost per unit, $p$ = price per unit, $Q$ = units.

$$Q_{BE} = \frac{FC}{p-v},\qquad TR = pQ,\qquad TC = FC + vQ,\qquad \text{Profit} = (p-v)Q - FC$$

$$Q_{BE,\ \text{sales}} = Q_{BE}\times p = \frac{FC}{1-\frac{v}{p}},\qquad \text{Contribution margin} = p-v$$

**Cost comparison and make-or-buy**

$$Q_{\text{indifference}} = \frac{FC_A - FC_B}{v_B - v_A}\ \text{(equal total cost)},\qquad \%\text{margin of safety} = \frac{Q_{\text{actual}}-Q_{BE}}{Q_{\text{actual}}}\times100$$

**Operating leverage and profit targets**

$$DOL = \frac{Q(p-v)}{Q(p-v)-FC}\ \text{(dimensionless)},\qquad Q_{\text{target}} = \frac{FC + \text{target profit}}{p-v}$$

**Risk aversion vs risk neutrality ★** — a risk-averse decision maker needs a premium to accept a gamble whose expected monetary value equals the certain outcome.
A risk-neutral decision maker instead just maximises EMV.

$$EMV = \sum_i p_iX_i,\qquad \text{Risk premium} = EMV - CE$$

$p_i$ = probability of outcome $i$, $X_i$ = payoff in ₱, $CE$ = certainty equivalent in ₱ (dimensionless $p_i$).

**Conditions:** linear revenue and cost, constant $v$ and $p$ over the range studied, single product or a fixed sales mix, and no step changes in $FC$; EMV assumes known probabilities and a risk-neutral decision maker, whereas a risk-averse one compares the certainty equivalent.

> [!tip] High-yield ★
> Above break-even, profit grows at the contribution margin $(p-v)$ per unit. If $p < v$, break-even does not exist — the product loses money at every volume.

---

### 13. Replacement Analysis

**Economic life and EUAC ★** — $P$ = first cost, $S_k$ = salvage at year $k$, $A_k$ = annual O&M, all in ₱.

$$EUAC_k = P(A/P,i,k) - S_k(A/F,i,k) + A_k,\qquad EUAC_k = (P-S_k)(A/P,i,k) + S_ki + A_k$$

$$AEC_k = P(A/P,i,k) - S_k(A/F,i,k)\ \text{(capital recovery only)}$$

**Marginal cost rule ★**

$$MC_k = \frac{S_{k-1} - S_k + A_k}{1}\ \text{(cost of keeping one more year)},\qquad \text{Replace when } MC_k > EUAC_{\text{challenger}}$$

**Defender vs challenger**

$$EUAC_{\text{defender}} = S_0 i + A_{\text{def}} - (S_0 - S_1)(A/F,i,1),\qquad \text{Choose min } EUAC$$

**Conditions:** identical service from both assets, constant MARR, and salvage values estimated at each future year; taxes and inflation are ignored unless stated.

> [!warning] Exam trap
> A low "book value" or fully depreciated asset does not mean keeping it is free. The defender's real cost is its **opportunity cost** (current market value × $i$) plus operating cost.

→ Back to [[00_Index]]
