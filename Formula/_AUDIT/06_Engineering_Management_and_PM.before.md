---
title: Engineering Management and PM
part: GEAS
tags: [ece, geas, formula-sheet]
topics: 13
---

## Part A — Management and Quality

### 1. Management Functions and Organizational Structures

**Functions (PODSC):** Planning, Organizing, Directing/Staffing, Controlling — plus leading and coordinating as modern additions.
**Span of control (Graicunas) ★** — $n$ = number of direct subordinates (dimensionless), $R$ = possible relationships.

$$R = n\left(2^{\,n-1} + n - 1\right),\qquad \text{span: narrow } 4\text{–}6,\ \text{wide } 8\text{–}12\ \text{subordinates per manager}$$

**Structure comparison ★**

| Structure | Basis | Strength | Weakness |
|---|---|---|---|
| Line | direct chain of command | clear, fast | overloaded managers |
| Line and staff | line + advisory staff | expert advice | staff/line conflict |
| Functional | specialization | technical depth | split authority |
| Divisional | product/region | accountability | duplicated resources |
| Matrix | function × project | resource sharing | two bosses |
| Flat/team | minimal hierarchy | speed, empowerment | limited promotion path |

**Organizational principles:** unity of command (one boss), scalar principle (unbroken chain), span limits, line vs staff authority.
**Delegation:** authority and responsibility pass together; accountability cannot be delegated away.

**Classical management schools ★**

| School | Proponent | Core idea |
|---|---|---|
| Scientific management | Frederick W. Taylor | time-and-motion study; standardize the "one best way" |
| Administrative theory (14 principles) | Henri Fayol | division of work, authority, unity of command, scalar chain |
| Bureaucratic model | Max Weber | rules, hierarchy, impersonality, merit-based selection |

**Three control types ★**

| Type | Timing | Example |
|---|---|---|
| Feedforward | preventive, screens inputs before the process | raw-material inspection |
| Concurrent | monitors during the process, in real time | in-line SPC, direct supervision |
| Feedback | corrects after the output is produced | final inspection, warranty analysis |

**Conditions:** Graicunas assumes only direct one-to-one and group relationships are counted and grows explosively — 4 subordinates give 44 relationships, 8 give 1,080; feedforward control needs a measurable input standard, and feedback control cannot prevent the loss it detects.

> [!tip] High-yield ★
> The Board asks which principle is violated when a worker answers to two supervisors — **unity of command**.
> Matrix organization deliberately breaks it, which is why it needs strong project managers.

---

### 2. TQM and Six Sigma

![](https://www.youtube.com/watch?v=GmEARqTY8TY)

*Video: What Is Six Sigma? ...and DMAIC — Online PM Courses, 6:56*

**Six Sigma metrics ★** — $\mu$ = process mean, $\sigma$ = process standard deviation, USL/LSL = spec limits (same units).

$$C_p = \frac{USL-LSL}{6\sigma},\qquad C_{pk} = \min\!\left[\frac{USL-\mu}{3\sigma},\ \frac{\mu-LSL}{3\sigma}\right],\qquad C_{pk} \le C_p$$

$$DPMO = \frac{\text{defects}}{\text{units}\times\text{opportunities}}\times10^6,\qquad \text{Yield} = e^{-DPU},\qquad DPU = \frac{\text{defects}}{\text{unit}}$$

**Rolled throughput yield and sigma levels**

$$Y_{RT} = Y_1Y_2\cdots Y_n,\qquad \sigma_{\text{level}} = 0.8406 + \sqrt{29.37 - 2.221\ln(DPMO)}$$

| Sigma level | DPMO | Yield |
|---|---|---|
| 1 | 691,462 | 30.9% |
| 2 | 308,538 | 69.1% |
| 3 | 66,807 | 93.32% |
| 4 | 6,210 | 99.379% |
| 5 | 233 | 99.9767% |
| 6 | 3.4 | 99.99966% |

**TQM core:** customer focus + continuous improvement + fact-based decisions + employee involvement.
**Key names:** Deming's 14 points and the PDCA cycle, Juran's quality trilogy (planning, control, improvement), Crosby's zero defects.
**Six Sigma:** DMAIC (Define, Measure, Analyze, Improve, Control) and DMADV/DFSS for new designs.
**Conditions:** $C_p$ ignores centering and only measures spread; the 6σ = 3.4 DPMO figure assumes the standard 1.5σ long-term process shift.

> [!warning] Exam trap
> $C_p = 1.0$ means the specs are exactly $6\sigma$ wide and is **not** "capable".
> A robust process wants $C_{pk} \ge 1.33$; the centering penalty makes $C_{pk} < C_p$ whenever $\mu$ is off-center.

---

### 3. ISO 9001 Overview

![](https://www.youtube.com/watch?v=O5T4H8K_rwQ)

*Video: What Is ISO 9001? — ISO, 5:20*

**ISO 9001:2015 — Quality Management System (QMS).**
Certification comes from accredited certification bodies, not from ISO itself.
The certificate is valid **3 years** with surveillance audits (commonly annual).
**Seven quality management principles ★:** customer focus · leadership · engagement of people · process approach.
Also: improvement · evidence-based decision making · relationship management.

**Clause structure (2015 edition)**

| Clause | Content |
|---|---|
| 4 | Context of the organization |
| 5 | Leadership |
| 6 | Planning |
| 7 | Support |
| 8 | Operation |
| 9 | Performance evaluation |
| 10 | Improvement |

**Sister standards:** ISO 9000 (vocabulary) · ISO 9004 (sustained success) · ISO 19011 (auditing) · ISO 14001 (environment).
Also: ISO 45001 (OHS) · ISO/IEC 17025 (testing labs) · ISO/IEC 27001 (information security) · TL 9000 (telecom QMS) · ISO 31000 (risk).
**Core concepts:** PDCA cycle, process approach, risk-based thinking, documented information instead of "records and manuals", no mandatory quality manual since 2015.
**Conditions:** ISO 9001 certifies the **management system**, not the product; it does not guarantee product quality or replace statutory/regulatory requirements.

> [!tip] High-yield ★
> Memorize the numbers: ISO 9001 = QMS, ISO 14001 = environment, ISO 45001 = OHS.
> ISO/IEC 17025 = lab competence, ISO/IEC 27001 = information security. Matching them is a routine item.

---

## Part B — Project Management

### 4. PERT/CPM Fundamentals

![](https://www.youtube.com/watch?v=zpT0tBGW4-E)

*Video: Network Charts: The Difference Between PERT and CPM — Online PM Courses, 8:07*

**PERT three-point estimate ★** — $o$ = optimistic, $m$ = most likely, $p$ = pessimistic (all in days/weeks).

$$t_e = \frac{o+4m+p}{6},\qquad \sigma_e = \frac{p-o}{6},\qquad \sigma_e^2 = \left(\frac{p-o}{6}\right)^2$$

**Project mean and standard deviation** — combine activities on the **critical path** only.

$$T_E = \sum t_e,\qquad \sigma_{\text{proj}} = \sqrt{\sum\sigma_e^2},\qquad z = \frac{X-T_E}{\sigma_{\text{proj}}}$$

**Differences**

| Feature | PERT | CPM |
|---|---|---|
| Time estimate | probabilistic ($o,m,p$) | deterministic (one value) |
| Focus | event-oriented, uncertainty | activity-oriented, cost |
| Cost crashing | not the focus | core technique |
| Typical use | R&D, new projects | repetitive, construction |

**Conditions:** PERT assumes independent, beta-distributed durations; $\sigma_{\text{proj}}$ sums critical-path variances only.
$z$ from the standard normal table gives the probability of finishing by time $X$.

> [!warning] Exam trap
> Never add the standard deviations directly. For the project you add **variances**, then take the square root — $1\sigma$ of 3 + 4 + 9 is $\sqrt{16} = 4$ days.

---

### 5. Network Passes, Float and Critical Path

![](https://www.youtube.com/watch?v=-TDh-5n90vk)

*Video: Project Scheduling — PERT/CPM: Finding the Critical Path — Joshua Emmanuel, 6:57*

**Forward pass (earliest times) ★** — $t_a$ = activity duration; $n$ = node/activity.

$$ES_n = \max\left(EF_{\text{predecessors}}\right),\qquad EF_n = ES_n + t_a$$

**Backward pass (latest times) ★**

$$LF_n = \min\left(LS_{\text{successors}}\right),\qquad LS_n = LF_n - t_a$$

**Float ★** — $ES,EF,LS,LF$ in days; float $= 0$ defines the critical path.

$$TF = LS - ES = LF - EF,\qquad FF = \min(ES_{\text{succ}}) - EF,\qquad IF = \max(0,\ \min ES_{\text{succ}} - \max LF_{\text{pred}} - t_a)$$

$$TF = FF + \text{(float of the chain that follows)}$$

**Rules:** project duration = $EF$ = $LF$ of the last activity; the critical path is the longest path and has zero total float.
A negative $TF$ means the schedule must be compressed.

**Gantt chart ★**

| Feature | Gantt chart | CPM/PERT network |
|---|---|---|
| Form | bar chart plotting activities against calendar time | node/arrow precedence diagram |
| Shows | duration and sequence | dependencies and float |
| Dependencies | **not** shown | explicit precedence |
| Best for | progress reporting, resource loading | critical-path analysis |

**Conditions:** activity-on-node convention, no resource constraints, and single start/finish nodes; a critical path is not unique — ties give multiple critical paths; a Gantt bar shows duration and sequence but not dependencies, so a shifted bar does not by itself reveal which successors slip.

> [!tip] High-yield ★
> Total float = slip **without delaying the project**; free float = slip **without delaying any successor**.
> Board items usually ask for total float — compute both passes first.

---

### 6. Project Crashing and Time-Cost Tradeoff

![](https://www.youtube.com/watch?v=mW4iF-458j0)

*Video: Project Management: Crashing a Project — The Business Doctor, 11:20*

**Cost slope ★** — $C_c$ = crash cost, $C_n$ = normal cost, $t_n$ = normal time, $t_c$ = crash time (costs in ₱, times in days).

$$\text{Slope} = \frac{C_c-C_n}{t_n-t_c}\ \text{(₱ per day)},\qquad \Delta C = \text{Slope}\times\Delta t,\qquad \text{Crash if slope} \le \text{savings per day}$$

**Cost relations**

$$TC = C_n + \text{Slope}\times(t_n - t_{\text{actual}}),\qquad \text{Total project cost} = \text{Direct} + \text{Indirect} + \text{Penalty}$$

**Crashing procedure ★:** (1) find the critical path; (2) pick the critical activity with the **smallest** cost slope.
(3) crash until another path becomes critical; (4) stop when the crash slope exceeds the daily benefit (savings or penalty avoided).
**Conditions:** normal to crash time is a linear cost–time relationship, crash time is the technical floor, and indirect costs fall while direct costs rise with compression.

> [!warning] Exam trap
> Only activities **on the critical path** may be crashed to shorten the project. A cheap non-critical activity with spare float buys nothing.

---

## Part C — Startup and Finance

### 7. Lean Startup and MVP

**Build–Measure–Learn loop ★:** idea → build MVP → measure data → learn → pivot or persevere.
**MVP ★** = the smallest product that delivers validated learning with the least effort.
Types: concierge, landing page/smoke test, Wizard-of-Oz, piecemeal, single-feature, video demo.
**Validated learning:** each iteration must test a falsifiable hypothesis about the problem, solution or market.
**Innovation accounting:** establish a baseline, tune the engine (retention/engagement), then decide to pivot or persevere.

**Metrics that matter**

$$CAC = \frac{\text{total sales and marketing cost}}{\text{new customers acquired}},\qquad \text{Payback} = \frac{CAC}{ARPU}\ \text{(months)}$$

$$\text{Conversion rate} = \frac{\text{converted}}{\text{visitors}}\times100,\qquad \text{Retention}_{t} = \frac{\text{active in period }t}{\text{cohort size}}\times100$$

**Pivot types:** zoom-in, zoom-out, customer segment, customer need, platform, business architecture, value capture, engine of growth, channel, technology.
**Conditions:** MVP is a learning instrument, not a shrunken v1 for launch marketing.
Metrics must be actionable, accessible and auditable — raw pageviews and total signups are vanity metrics.

> [!tip] High-yield ★
> Cohort retention curves that flatten are the strongest signal of product-market fit. A cohort that decays to zero means no fit, no matter how good the signup numbers look.

---

### 8. Business Model Canvas and SWOT

**Business Model Canvas — nine blocks:** customer segments · value propositions · channels · customer relationships · revenue streams.
Also: key resources · key activities · key partnerships · cost structure.
**SWOT ★:** Strengths and Weaknesses are **internal**; Opportunities and Threats are **external**. TOWS/matching pairs: SO (maxi-maxi), ST, WO, WT.
**Revenue models:** subscription/SaaS, transaction fee, licensing, freemium, advertising, usage-based, marketplace commission.

**Quantitative add-ons**

$$ARPU = \frac{\text{revenue}}{\text{users}},\qquad \text{Gross margin} = \frac{\text{revenue} - COGS}{\text{revenue}}\times100,\qquad \text{Revenue} = \text{users}\times ARPU$$

**Value proposition × segment fit:** each segment needs a distinct, testable value proposition — one canvas per segment, never one blended canvas.

**Lean Canvas replacement block ★**

| Block | Question it answers |
|---|---|
| Existing Alternatives | what do customers use today if the product did not exist? |

**Value Proposition Canvas blocks ★**

| Block | Content |
|---|---|
| Pain Relievers | how the product removes or reduces the customer's pains |
| Gain Creators | how the product produces the gains the customer wants |

**Conditions:** the canvas is a hypothesis map, not a plan; SWOT is descriptive and must be paired with a TOWS action before it drives strategy; the real Existing Alternative is often a workaround, a competitor's product or simply doing nothing.

> [!warning] Exam trap
> A "Strength" that helps relative to no competitor is not a strength.
> Keep SWOT items relative and evidence-based — "good team" is weak, "proprietary RF front-end" is exam-worthy.

---

### 9. Market Sizing: TAM, SAM, SOM

**Definitions ★** — TAM = total addressable market, SAM = serviceable available market, SOM = serviceable obtainable market.

$$TAM = N_{\text{total}}\times ARPU,\qquad SAM = TAM\times\text{serviceable fraction},\qquad SOM = SAM\times\text{target share}$$

$$\text{Bottom-up: } TAM = \text{customers}\times\text{units/year}\times\text{price/unit},\qquad SOM = SAM\times\text{realistic market share}$$

**Derived measures**

$$\text{Market share} = \frac{\text{company revenue}}{\text{SAM}}\times100,\qquad \text{Run-rate} = MRR\times12$$

$$\text{Penetration} = \frac{\text{users}}{\text{eligible population}}\times100$$

**Order of magnitude:** $TAM \ge SAM \ge SOM$ always.
Top-down sizing narrows an industry report; bottom-up builds from unit economics and is the defensible board answer.
**Conditions:** TAM assumes 100% share of the entire market, SAM restricts to your geography/segment/channel, and SOM must reflect actual go-to-market capacity, not wishful share.

> [!tip] High-yield ★
> A story that claims 10% of a huge TAM is a red flag. SOM is computed from sales capacity and channel reach, and it is the only number that should anchor a forecast.

---

### 10. Funding, Burn Rate and Runway

**Burn and runway ★** — cash in ₱, burn in ₱/month, runway in months.

$$\text{Net burn} = \text{cash out} - \text{cash in},\qquad \text{Gross burn} = \text{cash out},\qquad \text{Runway} = \frac{\text{cash balance}}{\text{net burn}}$$

$$\text{Burn multiple} = \frac{\text{net burn}}{\text{net new ARR}},\qquad \text{Rule of 40} = \text{growth rate} + \text{profit margin} \ge 40\%$$

**Unit economics and dilution**

$$LTV = ARPU\times\text{gross margin}\times\frac{1}{\text{churn rate}},\qquad \frac{LTV}{CAC} \ge 3$$

$$\text{Pre-money} = \frac{\text{investment}}{\text{dilution}} - \text{investment}$$

$$\text{Dilution} = \frac{\text{new shares}}{\text{shares after round}}\times100,\qquad \text{Post-money} = \text{pre-money} + \text{investment}$$

**Funding stages:** pre-seed → seed → Series A/B/C → growth/mezzanine → IPO or M&A.
**Sources:** bootstrapping, grants, angel, VC, venture debt, crowdfunding, government programs (DOST-PCIEERD, DTI, TBI).
**Conditions:** runway uses net burn and assumes no change in hiring or revenue.
Benchmarks: $LTV/CAC \ge 3$ and CAC payback under about 12 months; dilution is computed on a fully diluted post-money basis.

> [!warning] Exam trap
> Runway is always computed with **net** burn, not gross burn. Reinvested revenue extends runway.
> A company with positive net cash flow has infinite runway — never a negative number.

---

## Part D — Decision Analysis, Finance and Leadership

### 11. Decision Analysis under Risk and Uncertainty

![](https://www.youtube.com/watch?v=cbCsCQ4l4Zs)

*Video: Decision Tree Analysis with Expected Monetary Value — Vincent Stevenson, 6:47*

**Expected monetary value (EMV) ★** — $p_i$ = probability of outcome $i$ (dimensionless, $\sum p_i = 1$), $X_i$ = payoff of outcome $i$ (₱).

$$EMV = \sum_i p_i X_i,\qquad EV_{with\ PI} = \sum_i p_i\left(\max_j X_{ij}\right),\qquad EVPI = EV_{with\ PI} - EMV$$

**Decision tree nodes ★**

| Node | Symbol | Meaning |
|---|---|---|
| Decision node | square | a choice among alternatives made by the manager |
| Chance node | circle | a probability branch whose outcome is not controlled |

**Criteria under strict uncertainty ★** — $X_{ij}$ = payoff of alternative $i$ under state of nature $j$; $n$ = number of states; $\alpha$ = coefficient of optimism.

$$maximin = \max_i\left(\min_j X_{ij}\right),\qquad maximax = \max_i\left(\max_j X_{ij}\right)$$

$$Laplace = \max_i \frac{1}{n}\sum_j X_{ij},\qquad Hurwicz = \max_i\left[\alpha \max_j X_{ij} + (1-\alpha)\min_j X_{ij}\right],\qquad 0 \le \alpha \le 1$$

$$Regret_{ij} = \left(\max_i X_{ij}\right) - X_{ij},\qquad \text{minimax regret (Savage)} = \min_i\left(\max_j Regret_{ij}\right)$$

**Conditions:** EMV applies under risk, where probabilities are known and the decision-maker is risk-neutral; under strict uncertainty maximin is pessimistic, maximax optimistic, Laplace assumes equal probabilities, Hurwicz spans them with $\alpha$, and minimax regret minimizes the maximum opportunity loss.

> [!tip] High-yield ★
> Maxi**min** = best of the worst, maxi**max** = best of the best. EVPI is what you would pay at most for perfect information, so a consultant fee above EVPI is never worth it.

---

### 12. Financial Ratios

![](https://www.youtube.com/watch?v=MTq7HuvoGck)

*Video: Financial Ratio Analysis — The Finance Storyteller, 10:09*

**Liquidity ratios ★** — all items in ₱; both ratios are dimensionless.

$$Current\ ratio = \frac{\text{current assets}}{\text{current liabilities}}$$

$$Quick\ ratio = \frac{\text{cash}+\text{marketable securities}+\text{receivables}}{\text{current liabilities}}$$

**Why the quick (acid-test) ratio is stricter ★**

| Ratio | Numerator | Reason |
|---|---|---|
| Current | all current assets | treats inventory as if it converts to cash within the period |
| Quick (acid-test) | cash + marketable securities + receivables | excludes inventory, which cannot always be converted to cash quickly and may be obsolete |

**Leverage and profitability ratios ★** — net income, total debt, total assets and total equity in ₱.

$$Debt\text{-}to\text{-}equity = \frac{\text{total debt}}{\text{total equity}},\qquad ROA = \frac{\text{net income}}{\text{total assets}}$$

$$ROE = \frac{\text{net income}}{\text{total equity}}$$

$$ROE = ROA \times \frac{\text{total assets}}{\text{total equity}}\ \text{(equity multiplier)}$$

**Conditions:** all ratios are dimensionless and must use one consistent accounting period; a higher quick ratio means stricter liquidity than the current ratio, and ROE exceeds ROA whenever debt is positive because equity is the smaller base.

> [!warning] Exam trap
> A healthy current ratio can hide a liquidity problem when inventory is slow-moving — that is
> exactly what the quick ratio is designed to expose. Never mix a balance-sheet base with an
> income-statement flow from a different period.

---

### 13. Motivation and Leadership

**Herzberg two-factor theory ★**

| Factor group | Examples | Effect |
|---|---|---|
| Hygiene factors | company policy, supervision, salary, working conditions | prevent dissatisfaction only; do not motivate |
| Motivators | achievement, recognition, the work itself, responsibility, advancement | drive satisfaction and motivation |

**Maslow hierarchy (low → high):** physiological · safety · social · esteem · self-actualization.

**McGregor Theory X and Theory Y ★**

| Theory | Assumption about workers | Style implied |
|---|---|---|
| X | dislike work, avoid responsibility | close supervision, coercion, control |
| Y | work is natural, seek responsibility | participation, delegated authority, self-control |

**Leadership styles ★**

| Style | Decision authority | Effect |
|---|---|---|
| Autocratic | leader decides alone | fast, but low commitment |
| Democratic | leader consults the group before deciding | higher commitment, slower |
| Laissez-faire (free-rein) | group decides; leader supplies resources | high autonomy, risk of no direction |

**Conditions:** hygiene factors only remove dissatisfaction — their absence demotivates, but their presence does not motivate; Maslow's levels are not strictly sequential in practice, and a contingency view holds that no single leadership style fits every situation.

> [!tip] High-yield ★
> Salary is a **hygiene factor**, not a motivator — raising pay removes dissatisfaction without creating lasting motivation. Laissez-faire means full delegation, not neglect.

→ Back to [[00_Index]]
