---
id: GEAS-06-07
title: "Lean Startup and MVP"
part: "03_GEAS"
area: "06_Engineering_Management_and_PM"
topic: 7
tier: 3
depth: full
problem_count: 0
prereqs: []
tags: ["ece", "geas", "engineering_management_and_pm"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — Lean Startup and MVP

> [!abstract] Scope
> What the build-measure-learn loop produces, when a startup should pivot or persevere, which MVP types exist, and which metrics are actionable rather than vanity.

## Core Concept

> [!tip] Intuition
> A startup is not a small version of a big company; it is a temporary organization searching for a business model. Its output is not features or revenue but validated learning — evidence that a specific assumption about customers is true.

**Build-Measure-Learn and validated learning.** Ries's loop turns a guess into evidence: **Build** the smallest thing that can test the riskiest assumption, **Measure** how real customers behave with it, **Learn** whether the hypothesis survives, then decide. The loop is run as fast as possible and is meant to be traversed backwards in planning — decide what you must learn and how you will measure it *before* you build, or the measurement proves nothing. **Validated learning** means confirmation by customer behaviour, not by opinion; **innovation accounting** makes it auditable: establish a baseline, tune the engine toward the goal, then choose pivot or persevere. A **pivot** is a structured course correction that keeps the vision and changes the strategy (segment, channel, value capture, engine of growth); **persevere** is continuing only while the metrics show the engine working.

**Minimum viable product and honest metrics.** An **MVP** is the smallest product that lets you start learning, built to test the riskiest assumption — it is not a scaled-down finished product, and anything not being tested is waste. Typical forms run from no product to a partial one: smoke test or landing page, **Wizard of Oz** (humans behind the curtain), **concierge** (manual service), piecemeal MVP (existing tools stitched together), and single-feature MVP. What you measure decides what you learn, so pick **actionable, per-cohort** metrics — retention, conversion, revenue per customer — that can go down and can therefore trigger a decision. **Vanity metrics** such as total registrations, page views and press mentions only rise, flatter the team and cannot tell you to pivot; aggregate numbers across cohorts also hide the decay that matters.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Build-Measure-Learn | $\mathrm{Build} \rightarrow \mathrm{Measure} \rightarrow \mathrm{Learn}$ | Ries's core loop; plan it in reverse (learn, measure, build) and run it as fast as possible. |
| Validated learning | $\mathrm{customer\ behaviour\ data} > \mathrm{opinion}$ | Only evidence from real users counts; a survey or a pitch-deck argument is not validation. |
| MVP definition | $\mathrm{smallest\ thing\ that\ tests\ the\ riskiest\ assumption}$ | Not a scaled-down product; features unrelated to the tested assumption are waste. |
| Innovation accounting | $\mathrm{baseline} \rightarrow \mathrm{tune\ the\ engine} \rightarrow \mathrm{pivot\ or\ persevere}$ | Three-step accountability before revenue is meaningful; without a baseline no pivot decision can be justified. |
| Pivot | $\mathrm{change\ strategy},\ \mathrm{keep\ the\ vision}$ | A structured correction of strategy; a feature tweak inside the same strategy is optimization, not a pivot. |
| Persevere | $\mathrm{metrics\ improving} \Rightarrow \mathrm{continue}$ | Continue only while cohort metrics show the growth engine is working; continuing on hope is not persevering. |
| Vanity metric | $\mathrm{total\ registrations},\ \mathrm{page\ views},\ \mathrm{press\ hits}$ | Monotonically rising totals that cannot fall, so they cannot trigger a pivot decision. |
| Actionable metric | $\mathrm{cohort\ retention},\ \mathrm{conversion\ rate},\ \mathrm{revenue\ per\ customer}$ | Comparable across cohorts and able to decrease, so a change can be attributed and acted on. |
| Split test | $A/B\ \mathrm{cohorts,\ one\ variable}$ | Two cohorts differing in one change; more than one variable makes the result uninterpretable. |
| MVP types | $\mathrm{smoke\ test},\ \mathrm{Wizard\ of\ Oz},\ \mathrm{concierge},\ \mathrm{piecemeal},\ \mathrm{single\ feature}$ | Choose the cheapest type that still tests the riskiest assumption; all avoid building the full product. |
| Engines of growth | $\mathrm{sticky},\ \mathrm{viral},\ \mathrm{paid}$ | Focus on one at a time; each has its own driving metric — retention, viral coefficient, or LTV/CAC. |
| Paid-engine viability | $\dfrac{\mathrm{LTV}}{\mathrm{CAC}} > 1$ | A ratio at or below 1 means each acquired customer destroys value even though acquisition 'works'. |
| CAC payback | $\dfrac{\mathrm{CAC}}{\mathrm{ARPU} \times \mathrm{gross\ margin}}$ | Months to recover acquisition cost; it must be finite and shorter than the customer's expected life. |

## Traps & Exam Notes

- **Building a 'small version' of the full product as the MVP.** The MVP tests the riskiest assumption; every feature that is not part of that test is cost without learning.
- **Reporting total registrations or page views as progress.** These are vanity metrics — they rise with spending and cannot fall, so they can never tell you to pivot.
- **Calling every product change a pivot.** A pivot changes strategy while keeping the vision; changing a button label inside the same strategy is optimization.
- **Building before deciding what to measure.** In Build-Measure-Learn the hypothesis and the metric must be fixed before the build, otherwise the data cannot confirm or refute anything.
- **Judging the paid engine by CAC alone.** What matters is LTV against CAC: CAC = P500 with LTV = P400 destroys value even though every acquisition 'converts'.

## See Also

- [[08_Business_Model_Canvas_and_SWOT]]
- [[09_Market_Sizing_TAM,_SAM,_SOM]]
- [[10_Funding,_Burn_Rate_and_Runway]]

---

[[06_Project_Crashing_and_Time-Cost_Tradeoff|⬅ 06]] · [[_MOC_Engineering_Management_and_PM|MOC]] · [[00_Dashboard|Dashboard]] · [[08_Business_Model_Canvas_and_SWOT|08 ➡]]
