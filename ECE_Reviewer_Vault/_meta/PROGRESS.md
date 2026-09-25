---
title: PROGRESS
type: meta
updated: 2026-09-25
---

# PROGRESS

**Generated file — do not edit by hand.** Rebuild with `node build/build-meta.mjs`.

## Overall

```
topics        ██████████████████ 100%
T1 full depth ██████████████████ 100%
T2 medium     ██████████████████ 100%
T3 lean       ██████████████████ 100%
```

| Metric | Value |
| --- | --- |
| Topics total | 408 |
| Topics at `depth: full` | 408 |
| Topics still stub | 0 |
| T1 complete | 46 / 46 |
| T2 complete | 325 / 325 |
| T3 complete | 37 / 37 |
| Area MOCs | 35 |
| Widgets | 83 |

## Per area

| Part | Area | Topics | T1 done | T2 done | T3 done | Progress | |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mathematics | Differential Calculus | 8 | 3/3 | 5/5 | 0/0 | 100% | ✅ |
| Mathematics | Integral Calculus | 15 | 3/3 | 12/12 | 0/0 | 100% | ✅ |
| Mathematics | Differential Equations | 14 | 2/2 | 12/12 | 0/0 | 100% | ✅ |
| Mathematics | Advanced Engineering Math | 18 | 2/2 | 16/16 | 0/0 | 100% | ✅ |
| Mathematics | Electromagnetics | 22 | 2/2 | 20/20 | 0/0 | 100% | ✅ |
| Mathematics | Control Systems | 14 | 0/0 | 14/14 | 0/0 | 100% | ✅ |
| Mathematics | Signals and Systems | 11 | 0/0 | 11/11 | 0/0 | 100% | ✅ |
| Mathematics | Numerical Methods and Analysis | 10 | 1/1 | 9/9 | 0/0 | 100% | ✅ |
| Mathematics | Engineering Data Analysis | 14 | 1/1 | 11/11 | 2/2 | 100% | ✅ |
| Electronics Engineering | DC Circuits | 12 | 5/5 | 7/7 | 0/0 | 100% | ✅ |
| Electronics Engineering | AC Circuits | 10 | 3/3 | 7/7 | 0/0 | 100% | ✅ |
| Electronics Engineering | Two Port Networks | 9 | 0/0 | 9/9 | 0/0 | 100% | ✅ |
| Electronics Engineering | Semiconductor Devices | 15 | 2/2 | 13/13 | 0/0 | 100% | ✅ |
| Electronics Engineering | Circuit Analysis and Design | 17 | 2/2 | 15/15 | 0/0 | 100% | ✅ |
| Electronics Engineering | Power Electronics and Systems | 9 | 0/0 | 9/9 | 0/0 | 100% | ✅ |
| Electronics Engineering | Industrial Automation and Sensors | 16 | 0/0 | 16/16 | 0/0 | 100% | ✅ |
| Electronics Engineering | Logic Circuits and Switching | 16 | 2/2 | 14/14 | 0/0 | 100% | ✅ |
| Electronics Engineering | Microprocessors and Embedded | 10 | 0/0 | 10/10 | 0/0 | 100% | ✅ |
| GEAS | General Chemistry | 11 | 1/1 | 8/8 | 2/2 | 100% | ✅ |
| GEAS | University Physics | 16 | 2/2 | 14/14 | 0/0 | 100% | ✅ |
| GEAS | Materials Science | 10 | 1/1 | 7/7 | 2/2 | 100% | ✅ |
| GEAS | Environmental Sci and PH Laws | 11 | 0/0 | 4/4 | 7/7 | 100% | ✅ |
| GEAS | Engineering Economy | 13 | 1/1 | 12/12 | 0/0 | 100% | ✅ |
| GEAS | Engineering Management and PM | 10 | 0/0 | 3/3 | 7/7 | 100% | ✅ |
| GEAS | ECE Laws and Professional Ethics | 10 | 1/1 | 0/0 | 9/9 | 100% | ✅ |
| EST | Signals Spectra and Noise | 12 | 2/2 | 10/10 | 0/0 | 100% | ✅ |
| EST | Principles of Communications | 14 | 2/2 | 9/9 | 3/3 | 100% | ✅ |
| EST | Digital Communications | 16 | 2/2 | 14/14 | 0/0 | 100% | ✅ |
| EST | Data Communications and Networking | 19 | 3/3 | 12/12 | 4/4 | 100% | ✅ |
| EST | Transmission Lines and Waveguides | 10 | 2/2 | 8/8 | 0/0 | 100% | ✅ |
| EST | Antenna Systems and Propagation | 16 | 1/1 | 14/14 | 1/1 | 100% | ✅ |

## Resume protocol

State lives on disk, not in chat. A new session resumes by reading:

1. this file (what is done)
2. `_meta/CONVENTIONS.md` (the rules)
3. `_meta/MANIFEST.md` (canonical paths and IDs)

Then continue at the first area with `pct < 100`, writing payloads into
`build/payload/<part>/<area>/` and running
`node build/build-notes.mjs --area <area>`.
