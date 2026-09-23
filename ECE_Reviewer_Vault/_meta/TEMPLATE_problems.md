---
title: TEMPLATE_problems
type: meta
updated: 2026-09-23
---

# TEMPLATE — Worked problems

Problems are **records**, not prose. One record feeds the note, a `Sets/` drill, a
flashcard and a randomized practice set — that is the whole reason they are structured.

## Record shape

```json
{
  "prompt": "Find the capacitance of a parallel-plate capacitor.",
  "give":   ["A = 0.5 m²", "d = 1 mm", "air"],
  "steps":  ["C = εA/d", "= (8.854e-12)(0.5)/(1e-3)", "= 4.43 nF"],
  "ans":    "4.43 nF",
  "trap":   "mm → m before substituting."
}
```

## Rendered form

```markdown
---
id: TEMPLATE-P1
title: "Problem example"
part: "01_Mathematics"
area: "01_Differential_Calculus"
topic: 2
tier: 2
depth: full
problem_count: 2
prereqs: []
tags: ["ece", "mathematics", "differential_calculus"]
updated: 2026-09-23
---

# 02 — Problem example

> [!abstract] Scope
> {{scope}}

## Core Concept

{{concept}}

## Formulas

| Quantity | Expression | Notes |
| --- | --- | --- |
| {{quantity}} | ${{expression}}$ | {{note}} |

## Worked Problems

### P1. {{prompt}}

**Given:** {{given}}

**Solution:**

1. {{step 1}}
2. {{step 2}}

> [!success]- Answer
> **{{answer}}**

> [!warning] Trap
> {{trap}}

### P2. {{prompt 2}}

**Given:** {{given 2}}

**Solution:**

1. {{step 1}}

> [!success]- Answer
> **{{answer 2}}**

## Traps & Exam Notes

- {{trap}}

---

[[01_Limits,_Continuity_and_L_Hopital|⬅ 01]] · [[_MOC_Differential_Calculus|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Implicit,_Parametric_and_Logarithmic_Differentiation|03 ➡]]
```

## Rules

- `steps` must be discrete lines; each becomes a numbered item.
- The answer renders inside a collapsible `[!success]-` callout, so it is hidden by
  default in Obsidian — do not repeat the answer in the steps' prose.
- `trap` is optional but strongly preferred: it renders as a `[!warning]` callout
  immediately under the answer, which is where it is actually read.
- Tier caps: T1 shows up to 10, T2 up to 5, T3 shows none. Extra records are kept in
  the payload and become available to `Sets/` drills.