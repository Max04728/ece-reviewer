---
title: ECE Reviewer
type: dashboard
updated: 2026-09-25
---

# ECE Reviewer

408 topics across 4 parts — formulas, worked problems and exam traps in every one,
plus 83 interactive widgets.

## How to use this

1. Pick an **area** below, then open its MOC: topic map, drill links and widgets.
2. Work through the topic notes. Each one ends with **Traps & Exam Notes** — the highest-value
   section for the board exam.
3. In each note, set **status** and **confidence** in the Properties panel at the top of the
   note. `confidence` runs 1 (lost) to 5 (solid); `status` is one of
   not-started / reading / shaky / solid.
4. Come back to this page. Everything under **My progress** is a live Dataview query reading
   what you set — there is nothing here to maintain by hand.
5. Before an exam, open an area MOC and use **Sets & Drills**: a shuffled drill plus a
   trap-recall drill built from that area's own problems.

## My progress

```dataview
TABLE WITHOUT ID status AS "Status", length(rows) AS "Topics"
FROM ""
WHERE tier
GROUP BY status
SORT length(rows) DESC
```

## Where I'm weakest

```dataview
TABLE WITHOUT ID area AS "Area", length(rows) AS "Topics", round(average(map(rows, (r) => r.confidence)), 1) AS "Avg confidence"
FROM ""
WHERE tier
GROUP BY area
SORT round(average(map(rows, (r) => r.confidence)), 1) ASC
```

## Review these next

```dataview
TABLE WITHOUT ID link(file.path, title) AS "Topic", area AS "Area", confidence AS "Conf", status AS "Status"
FROM ""
WHERE tier AND confidence > 0 AND confidence <= 2
SORT confidence ASC, area ASC
LIMIT 15
```

> Empty either because you have not rated anything yet, or because nothing is shaky.

## Recently reviewed

```dataview
TABLE WITHOUT ID link(file.path, title) AS "Topic", last_reviewed AS "Reviewed"
FROM ""
WHERE tier AND last_reviewed
SORT last_reviewed DESC
LIMIT 10
```

## Areas

### Mathematics — 126/126 full

| Area | Topics | Progress | |
| --- | --- | --- | --- |
| [[_MOC_Differential_Calculus\|Differential Calculus]] | 8 | `██████████ 100%` | ✅ |
| [[_MOC_Integral_Calculus\|Integral Calculus]] | 15 | `██████████ 100%` | ✅ |
| [[_MOC_Differential_Equations\|Differential Equations]] | 14 | `██████████ 100%` | ✅ |
| [[_MOC_Advanced_Engineering_Math\|Advanced Engineering Math]] | 18 | `██████████ 100%` | ✅ |
| [[_MOC_Electromagnetics\|Electromagnetics]] | 22 | `██████████ 100%` | ✅ |
| [[_MOC_Control_Systems\|Control Systems]] | 14 | `██████████ 100%` | ✅ |
| [[_MOC_Signals_and_Systems\|Signals and Systems]] | 11 | `██████████ 100%` | ✅ |
| [[_MOC_Numerical_Methods_and_Analysis\|Numerical Methods and Analysis]] | 10 | `██████████ 100%` | ✅ |
| [[_MOC_Engineering_Data_Analysis\|Engineering Data Analysis]] | 14 | `██████████ 100%` | ✅ |

MOC: [[_MOC_Mathematics]]

### Electronics Engineering — 114/114 full

| Area | Topics | Progress | |
| --- | --- | --- | --- |
| [[_MOC_DC_Circuits\|DC Circuits]] | 12 | `██████████ 100%` | ✅ |
| [[_MOC_AC_Circuits\|AC Circuits]] | 10 | `██████████ 100%` | ✅ |
| [[_MOC_Two_Port_Networks\|Two Port Networks]] | 9 | `██████████ 100%` | ✅ |
| [[_MOC_Semiconductor_Devices\|Semiconductor Devices]] | 15 | `██████████ 100%` | ✅ |
| [[_MOC_Circuit_Analysis_and_Design\|Circuit Analysis and Design]] | 17 | `██████████ 100%` | ✅ |
| [[_MOC_Power_Electronics_and_Systems\|Power Electronics and Systems]] | 9 | `██████████ 100%` | ✅ |
| [[_MOC_Industrial_Automation_and_Sensors\|Industrial Automation and Sensors]] | 16 | `██████████ 100%` | ✅ |
| [[_MOC_Logic_Circuits_and_Switching\|Logic Circuits and Switching]] | 16 | `██████████ 100%` | ✅ |
| [[_MOC_Microprocessors_and_Embedded\|Microprocessors and Embedded]] | 10 | `██████████ 100%` | ✅ |

MOC: [[_MOC_Electronics_Engineering]]

### GEAS — 81/81 full

| Area | Topics | Progress | |
| --- | --- | --- | --- |
| [[_MOC_General_Chemistry\|General Chemistry]] | 11 | `██████████ 100%` | ✅ |
| [[_MOC_University_Physics\|University Physics]] | 16 | `██████████ 100%` | ✅ |
| [[_MOC_Materials_Science\|Materials Science]] | 10 | `██████████ 100%` | ✅ |
| [[_MOC_Environmental_Sci_and_PH_Laws\|Environmental Sci and PH Laws]] | 11 | `██████████ 100%` | ✅ |
| [[_MOC_Engineering_Economy\|Engineering Economy]] | 13 | `██████████ 100%` | ✅ |
| [[_MOC_Engineering_Management_and_PM\|Engineering Management and PM]] | 10 | `██████████ 100%` | ✅ |
| [[_MOC_ECE_Laws_and_Professional_Ethics\|ECE Laws and Professional Ethics]] | 10 | `██████████ 100%` | ✅ |

MOC: [[_MOC_GEAS]]

### EST — 87/87 full

| Area | Topics | Progress | |
| --- | --- | --- | --- |
| [[_MOC_Signals_Spectra_and_Noise\|Signals Spectra and Noise]] | 12 | `██████████ 100%` | ✅ |
| [[_MOC_Principles_of_Communications\|Principles of Communications]] | 14 | `██████████ 100%` | ✅ |
| [[_MOC_Digital_Communications\|Digital Communications]] | 16 | `██████████ 100%` | ✅ |
| [[_MOC_Data_Communications_and_Networking\|Data Communications and Networking]] | 19 | `██████████ 100%` | ✅ |
| [[_MOC_Transmission_Lines_and_Waveguides\|Transmission Lines and Waveguides]] | 10 | `██████████ 100%` | ✅ |
| [[_MOC_Antenna_Systems_and_Propagation\|Antenna Systems and Propagation]] | 16 | `██████████ 100%` | ✅ |

MOC: [[_MOC_EST]]

## Vault internals

Generated files — for maintaining the vault, not for studying.
Build progress lives in PROGRESS; this page is for studying.

| Note | What it is |
| --- | --- |
| [[_meta/PROGRESS]] | build state, per area |
| [[_meta/MANIFEST]] | canonical index: every ID, filename, tier |
| [[_meta/CROSSLINKS]] | cross-area prerequisite map |
| [[_meta/CONVENTIONS]] | the rules of the vault |
| [[_meta/DATAVIEW_QUERIES]] | copy-paste query cookbook |

██████████████████████████████ 100%

**408 / 408 topics at full depth** · built 2026-09-25
