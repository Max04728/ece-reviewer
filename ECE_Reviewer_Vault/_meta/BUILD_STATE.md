---
title: BUILD_STATE
type: meta
updated: 2026-09-23
---

# BUILD_STATE — resume point

Machine-facing companion to `PROGRESS.md`. Read this first in a new session.

## Current state — read this first

**The vault is complete and verified.** 408 / 408 topics at their tier's depth, 35 MOCs,
83 widgets, drills generated from the problem records. `node build/verify.mjs` ends with
`ALL CHECKS PASSED`.

| Check | Latest |
| --- | --- |
| Topic IDs / note files / payloads | 408 / 408 / 408, 0 errors |
| Wikilinks | 4929 checked, 0 broken, 0 ambiguous |
| Widgets (static) | 83 checked, 0 problems |
| Widgets (runtime) | 80 executed, 1376 control combinations, 0 defects |
| Widget map (new, §6c) | 91 entries, 91 topics, 83 / 83 widgets mapped |
| Calculator blocks (`calc`) | 931 across 213 payloads, 16 / 31 areas |
| Core Concept formula audit (new) | 0 `$$$`, 0 unbalanced `$`, 0 orphan fragments |

> **Everything below this section is the HISTORICAL build log.** It contains stale status
> tables and superseded plans from earlier rounds — do not read them as current. This section
> and `_meta/PROGRESS.md` (generated) are the resume point.

### Added in the latest round — calculator techniques, content corrections, concept spacing

1. **Canon F-789SGA `calc` blocks on worked problems.** Authoring contract and the verified key
   table live in `_meta/CALCULATOR_TECHNIQUES.md`. Blocks are authored as patch files under
   `build/calc-patches/<Area>.json` and applied with
   `node build/apply-calc-patches.mjs build/calc-patches --apply`; the applier refuses an entry
   whose `expect` prompt fragment does not match, refuses ambiguous anchors, parses before writing
   and re-parses after, and lint-warns on a bad mode, >3 steps, `\text{}`, a literal `|`, a short
   `expect` or an over-long note. **Coverage: 931 blocks over 213 payloads in 16 of the 31 areas.**
   Worked problems are added area by area; the remaining areas are listed in the final report of
   the round that added this section.
2. **Content-correction pass driven by the workers who read the notes.** No automated check covers
   mathematical correctness, so the `calc` authors were the only source of real defects. 14 were
   verified by hand and fixed, with knock-on references repaired in the same pass. The record, with
   what each note said and what is correct, is `build/CONTENT_DEFECTS.md`. One worker claim was
   checked and **rejected** as a false alarm.
3. **Core Concept formula spacing, applied vault-wide.** `build/formula-layout.mjs`
   (`hoistInlineFormulas`, `CONCEPT_PROMOTE_ALL = true`) lifts a substantial inline formula onto its
   own `$$` display line when — and only when — it already begins a clause. Measured by
   `node build/audit-concept-formulas.mjs` (report: `build/CONCEPT_FORMULA_AUDIT.md`): 11,421 inline
   formulas across 2,015 concept entries; 274 hoisted, 302 `$$` blocks in the rendered Core Concept
   sections, 0 `$$$`, 0 unbalanced `$`, 0 orphan fragments, 408 / 408 notes treated. See the open
   item below for what this does *not* fix.

### Added in the previous round

1. **Widgets appear in the topic notes**, not only in the area MOCs. `build/widget-map.mjs` maps
   `<area>/<topic slug>` → widget basename (91 placements across 83 widgets); `expand.mjs`
   renders `## Interactive Widget` for mapped topics; `build/check-widget-map.mjs` guards the map
   and runs inside `verify.mjs` as §6c. Rules: `CONVENTIONS.md` §10.1–10.3.
2. **Study tracking.** Topic frontmatter carries `status`, `confidence`, `last_reviewed`.
   `extractTracking()` (`expand.mjs`) reads them off the note already on disk before every
   render, so regenerating an area — including the destructive `build-stubs.mjs` — PRESERVES
   them. Contract: `CONVENTIONS.md` §2.1. Never put progress in a note body; it is regenerated.
3. **`00_Dashboard.md` is now a reviewer front page**, not a build report: how-to-use plus four
   live Dataview tables over the tracking fields. Build progress moved to `_meta/PROGRESS.md`.
4. **Embeds need the Embed HTML community plugin** (mnaoumov). The embed size is
   `WIDGET_EMBED_SIZE` in `widget-map.mjs`, shared by both renderers.

### Blind spots this build has exposed

All of these were silent — no check reported any of them — and they matter more than the features:

1. **`.html` is not a linkable format in Obsidian.** `[[Name]]` never resolved to `Name.html`, so
   every MOC widget bullet rendered as a dead link. `check-links.mjs` counted `.html` basenames as
   valid targets, so it reported 0 broken and hid the problem. Fixed by emitting explicit
   `![[Name.html|...]]` embeds and normalising extensions through one `stripExt` helper.
2. **No widget was ever tested in a real browser.** `check-widget-runtime.mjs` runs widgets in
   Node, which proves the arithmetic but not rendering. Every layout defect in this round was
   found by the user looking at the screen, never by a check.
3. **Mathematical correctness of the 408 notes is still unverified** by any automated check — see
   `build/CONTENT_DEFECTS.md`. A worker reading a note closely remains the only mechanism that has
   ever caught a wrong number.
4. **A worker's defect report is not evidence.** Two worker claims in the last round were wrong
   (one arithmetic slip of the worker's own, one mislabelled percentage base). Every item in
   `build/CONTENT_DEFECTS.md` was recomputed independently before anything was changed.
5. **A checker can manufacture the very defect it reports.** The first version of
   `audit-concept-formulas.mjs` used `\Z` as an end anchor; in JavaScript `\Z` is a literal "Z",
   so any note with an impedance `Z` in a formula had its section truncated and produced 32 phantom
   "unbalanced `$`" paragraphs. A second, independent count (PowerShell) showed none. Same lesson as
   the false-positive rules removed from `diagnose-formulas.mjs`.

### Open items — carry these forward

1. **A prose-spacing pass on Core Concept math is IN PROGRESS and PAUSED.** The hoisting rule
   deliberately leaves substantial inline formulas mid-sentence; of those, **587 were 40+ characters**
   — real equations buried in prose. The owner asked for all 587 to be fixed by **rewriting the
   payload prose** so each equation begins a clause (and the layout rule then hoists it), not by
   loosening the rule. Progress: **587 → 129 sites, 22 of 31 areas clean.** Nine areas were never
   assigned and are the remaining work:
   `02_Electronics_Engineering/04_Semiconductor_Devices` (17),
   `01_Mathematics/02_Integral_Calculus` (16),
   `02_Electronics_Engineering/07_Industrial_Automation_and_Sensors` (16),
   `03_GEAS/01_General_Chemistry` (15),
   `04_EST/01_Signals_Spectra_and_Noise` (14),
   `02_Electronics_Engineering/01_DC_Circuits` (13),
   `03_GEAS/03_Materials_Science` (13),
   `04_EST/03_Digital_Communications` (13),
   `02_Electronics_Engineering/06_Power_Electronics_and_Systems` (12).
   The authoritative worklist is `build/concept-spacing-worklist.md`; per-area progress is
   `node build/audit-concept-formulas.mjs --area "<Part/Area>"`, which exits 1 until that area is
   clean and writes no shared file (so several areas can be worked at once).
   **Do not loosen `CONCEPT_PROMOTE_*` to force the breaks**: that is what produced 439 one-word
   fragments and an ungrammatical join on the first attempt.
2. **Five worker claims were checked and rejected during that pass** — a lookbehind regex
   "undercount" (measured: 0 of 11,426), a Miller-theorem factor of 10^3 (the note is right), a
   Fresnel ⊥/∥ label swap (labels correct), an `Q = I^2X` sign "error" (the sign is the physics), and
   a de-emphasis factor disagreeing "by 7 dB" (comparing a linear factor with dB). Three more from
   the Signals area were false. A worker's report is a lead, not evidence — see
   `build/CONTENT_DEFECTS.md`.
2. **The calculator rollout is incomplete: 15 of 31 areas have no blocks yet.** Remaining:
   `01_Differential_Calculus`, `02_Integral_Calculus`, `03_Differential_Equations`,
   `07_Signals_and_Systems`, `08_Numerical_Methods_and_Analysis`,
   `06_Power_Electronics_and_Systems`, `07_Industrial_Automation_and_Sensors`,
   `08_Logic_Circuits_and_Switching`, `09_Microprocessors_and_Embedded`, `01_General_Chemistry`,
   `03_Materials_Science`, `04_Environmental_Sci_and_PH_Laws`, `06_Engineering_Management_and_PM`,
   `07_ECE_Laws_and_Professional_Ethics`, `04_Data_Communications_and_Networking`. Three of the GEAS
   ones are likely to yield no blocks at all.
3. **FM improvement factor** — `04_EST/02_Principles_of_Communications/09_FM_Noise_and_Threshold_Effect`
   P2 attaches `I = 1.5 beta^2` to the **input** CNR; several standard texts give `3 beta^2 (beta + 1)`
   for the IF-bandwidth-referenced CNR. Needs a textbook to settle. Its P3 bandwidth convention *was*
   settled this round: bandwidth ratios take `10log`, and the bandwidth-for-SNR exchange is
   favourable, not unfavourable.
4. **`MODE` 5 page-2 complex-root printing and the `VCTR` vector-store sequence** are still
   unasserted — neither has been checked against real hardware, so no block relies on them.
5. **`MODE` 6 `TABLE` Start/End/Step entry order** comes from the contract's mode list, not from a
   device screen. Two blocks use it (JFET square law, SYD and DDB schedules). Worth a spot-check.

### Verification tooling

`verify.mjs` runs every guard in-process (the sandbox forbids piped child stdio):
`check-links.mjs`, `check-widgets.mjs`, `check-widget-runtime.mjs`, `check-widget-map.mjs`, plus
payload validation and meta freshness. Notes, MOCs and embeds are all generated — never hand-edit
a note's structure; edit the payload, the renderer, or `widget-map.mjs`, then re-render.

Not part of `verify.mjs`, because its output is a measurement rather than a pass/fail:

| script | what it measures |
| --- | --- |
| `node build/audit-concept-formulas.mjs` | inline vs hoisted formulas in Core Concept prose → `build/CONCEPT_FORMULA_AUDIT.md` |
| `node build/diagnose-formulas.mjs` | formula-table breakage (pipes, newlines) with `--selftest` |
| `node build/apply-calc-patches.mjs <file> --report` | calc-patch drift, contract lint, dry run |

---

## Where the build is

| Phase | State |
| --- | --- |
| P0 scaffolding | ✅ done |
| P1 stub pass (408 topics + 35 MOCs) | ✅ done |
| P2 generated meta (dashboard, manifest, progress, crosslinks, queries) | ✅ done |
| P3 pilot — `01_Differential_Calculus`, 8/8 | ✅ |
| P4 — `02_Integral_Calculus`, 15/15 | ✅ |
| P4 — `03_Differential_Equations`, 14/14 | ✅ |
| P4 — `04_Advanced_Engineering_Math` (18) | 🚧 delegated |
| P4 — `05_Electromagnetics` (22) | 🚧 delegated |
| P4 — `06_Control_Systems` + `07_Signals_and_Systems` (25) | 🚧 delegated |
| P4 — `08_Numerical_Methods` + `09_Engineering_Data_Analysis` (24) | 🚧 delegated |
| P4 — `02_Electronics_Engineering` 01_DC + 02_AC (22) | 🚧 delegated |
| P4 — `02_Electronics_Engineering` 03_Two_Port + 04_Semiconductor (24) | 🚧 delegated |
| P4 — `03_GEAS` 01_Chemistry + 02_Physics + 03_Materials (37) | 🚧 delegated |
| P4 — `04_EST` 01_Signals_Noise + 02_Comms (26) | 🚧 delegated |
| P5 widgets | 🚧 2 of ~70 |
| P6 sets/drills | ✅ **done** — `build-drills.mjs` generates a per-area practice drill + trap-recall drill from the problem records, linked into each MOC's Sets section |

**STATUS: COMPLETE — 408 / 408 topics at `depth: full` (100%).**

```
topics        ██████████████████ 100%
T1 full depth ██████████████████ 100%
T2 medium     ██████████████████ 100%
T3 lean       ██████████████████ 100%
```

`verify.mjs` reports `ALL CHECKS PASSED`:

| Check | Result |
| --- | --- |
| Topic IDs unique | 408 / 408 |
| Note files present | 408 / 408 |
| Payloads valid | 408, zero errors |
| Wikilinks | 4749 checked, **0 broken, 0 ambiguous** |
| Widgets | 5 checked, 0 problems |
| Drills | 63 generated, 2039 problems pooled |
| Meta files | current |

## What the vault contains

| Artifact | Count |
| --- | --- |
| Topic notes (T1 46 / T2 325 / T3 37) | 408 |
| MOCs (31 area + 4 part) | 35 |
| `_meta/` notes | 15 |
| Practice drills + trap recalls | 63 |
| Widgets | 5 |
| Payload source files | 408 |

## Build phases

| Phase | Status |
| --- | --- |
| P0 scaffolding, shared runtime, templates, payload schema, expander | ✅ |
| P1 stub pass — 408 topics + 35 MOCs with generated navigation | ✅ |
| P2 generated dashboard, MANIFEST, PROGRESS, CROSSLINKS, Dataview queries | ✅ |
| P3 pilot area at full depth | ✅ |
| P4 all 408 topics at their tier's depth | ✅ |
| P5 widgets on the shared runtime | 🚧 5 of ~70 |
| P6 derived Sets/drills from problem records | ✅ |

**STATUS: COMPLETE.** 408 / 408 topic notes at their tier's depth, and **82 / 82
tree-specified widgets** present.

```
topics        ################## 100%
T1 full depth ################## 100%
T2 medium     ################## 100%
T3 lean       ################## 100%
```

`verify.mjs` reports **ALL CHECKS PASSED**:

| Check | Result |
| --- | --- |
| Topic IDs unique | 408 / 408 |
| Note files present | 408 / 408 |
| Payloads valid | 408, zero errors |
| Wikilinks | 4838 checked, **0 broken, 0 ambiguous** |
| Widgets (static) | 83 checked, **0 defects** |
| Widgets (runtime) | 80 executed, **1376 control combinations, 0 defects** |
| Drills | 62, 2033 problems pooled |

### Artifact inventory

| Artifact | Count |
| --- | --- |
| Topic notes (T1 46 / T2 325 / T3 37) | 408 |
| MOCs (31 area + 4 part) | 35 |
| `_meta/` notes | 15 |
| Interactive widgets | 83 (82 from the tree + 1 extra) |
| Drills + trap recalls | 62 |
| Payload sources | 408 |

## P5 widgets: 82 / 82 from the canonical tree

`build/audit-widgets.mjs` compares the tree's widget filenames against disk and now
reports `still missing: 0`. One widget (`Class_B_Crossover_Distortion`) was written into
the wrong area folder; it was moved to `05_Circuit_Analysis_and_Design/Widgets/` to match
the specification.

## Verification tooling (all in `build/`)

| Script | Purpose |
| --- | --- |
| `verify.mjs` | runs every guard in-process (the sandbox forbids piped child stdio) |
| `check-links.mjs` | every wikilink resolves |
| `check-widgets.mjs` | widget parses, asset paths resolve, no duplicate bindings, **in-flight detection** |
| `check-widget-runtime.mjs` | drives every widget's `compute`/`draw`/`readout` across a control grid |
| `audit-widgets.mjs` | tree coverage report (advisory, never fails a build) |
| `ktest.mjs` | validates the K-map minimiser against 13 truth-table cases |
| `build-notes.mjs` / `build-meta.mjs` / `build-stubs.mjs` / `build-widgets.mjs` / `build-drills.mjs` / `build-templates.mjs` | generators |

### The most important lesson, recorded

Every defect that mattered in this build was found by **comparing values against an
independent calculation**, never by a structural check. Structural checks parse, link and
count; they cannot tell a right answer from a wrong one. Eleven numeric content defects
and six widget defects were caught that way — including swapped Rockwell dial constants, a
vacancy fraction off by 45 orders of magnitude, a non-minimal K-map, and a `const`
reassigned in a branch that made an entire widget render blank.

The mirror image is equally true and cost hours here: **a checker that reports false
positives is as damaging as one that misses defects.** This build produced seven phantom
failures from my own tooling — a `const`/`function` stub collision, a `const document`
TDZ, restoring `document` before the draw calls ran, select options passed as objects, an
unanchored import-stripping regex, a stderr pipe blocked by the sandbox, and a widget read
while its author was still streaming it to disk. Each sent me hunting a bug that did not
exist. `check-widgets.mjs` now detects the last case explicitly and reports **IN FLIGHT**
rather than a defect.

**What remains outside automation:** mathematical correctness of the 408 notes. Sampling
across eight areas found the content sound, and workers recomputed their own answers — but
no automated guard proves the physics. A human pass over the high-yield notes is the one
check that cannot be scripted.


### Two-layer widget verification (both wired into `verify.mjs`)

| Check | What it proves | Latest |
| --- | --- | --- |
| `check-widgets.mjs` | parses, asset paths resolve, runtime imported where used, no duplicate bindings | 78 checked, 1 problem (the file above) |
| `check-widget-runtime.mjs` | the widget actually RUNS: `compute`/`draw`/`readout` across every control combination | 74 executed, **1291 combinations** |

### Harness defects fixed this round (all were false positives)

A checker that reports phantoms is as damaging as one that misses real defects, and this
round produced three of them:

1. **`const` helper collision.** Both checkers declared a fixed stub including `simpson`.
   Widgets that legitimately define their own `simpson` (SCR_Firing_Angle_Waveform) then
   reported *"Identifier 'simpson' has already been declared"*. The stub is now built
   **per widget from the names that widget actually imports**.
2. **`const document` TDZ.** The runtime shim declared `const document = document`, which
   throws in the same statement; and then restored `document` to `undefined` in a `finally`
   block *before* the draw calls ran. Both produced mass phantom
   `getElementById` failures across 15 widgets.
3. **Select options passed as objects.** The harness handed widgets the whole
   `{value,label}` option instead of its `.value`, so name lookups failed and invented
   crashes.

The lesson recorded in `build/README.md` stands: a checker must be validated against a case
where the answer is known, or it will quietly cost more time than it saves.

### Defects the runtime harness has caught in widget code

Five real ones, each of which produced a **blank or wrong canvas with no error message**:
a `const` reassigned in a branch (BJT bias), a variable read from the wrong scope (`o` in
`compute`, FM sidebands), a missing object join (CPM label), an inverted VLSM search, and a
standing-wave minimum placed at the wrong distance.





Built so far, by area:

| Area | Widgets |
| --- | --- |
| `01_Differential_Calculus` | Limit Explorer, Curve Sketching |
| `02_Integral_Calculus` | Disk/Washer, Shell Method, Polar Area Sweep, Hydrostatic Force |
| `03_Differential_Equations` | Damped Oscillator Regimes |
| `04_Advanced_Engineering_Math` | Fourier Series Harmonic Builder |
| `05_Electromagnetics` | Gauss Law flux, Capacitance geometry, Inductance gap/core, Skin depth, Reflection coefficient |
| `06_Control_Systems` | Second Order ζ/ωn Explorer |
| `07_Signals_and_Systems` | Convolution Flip-and-Slide |
| `08_Logic_Circuits_and_Switching` | **K-map Solver** (live minimiser, validated) |
| `06_Power_Electronics_and_Systems` | **Buck/Boost/Buck-Boost duty-cycle explorer** |
| Electronics `01_DC_Circuits` | Delta-Wye converter, RC/RL transient |
| Electronics `02_AC_Circuits` | Power triangle |
| Electronics `03_Two_Port` | Two-port matrix calculator |
| Electronics `04_Semiconductor` | PN junction depletion, Rectifier ripple |

### Two widgets needed arithmetic verification, and got it

**K-map solver — was wrong, now fixed.** The first minimiser enumerated rectangles as
`(start, span)` pairs with the span capped at the axis width, which cannot express a
group spanning an *entire* axis. It missed the wrap-around group `B'D'` and returned
`A'B'C' + A'C'D + A'B'CD'` (3 terms) where `B'D' + C'D` (2 terms) is minimal. Rewritten
to enumerate wrap-around starts with spans of 1/2/4, then validated by
`build/ktest.mjs` against **13 truth-table cases**: every expression is evaluated for
all 16 inputs and must reproduce the minterm set exactly. All 13 pass.

**Converter explorer — verified correct.** Hand check at D = 0.5, V_in = 12 V,
L = 100 µH, f = 100 kHz: buck gives V_o = 6 V and ΔI = (V_in−V_o)·D/(L·f) = 0.300 A,
matching the widget's computed 0.3000 A; CCM/DCM boundary I_o = 0.150 A, so I_o = 1 A is
correctly classified continuous. Boost gives 24 V and 0.600 A; buck-boost gives 12 V.

### check-widgets rule relaxed correctly

The checker demanded a `vault.js` import from every widget, but a pure-DOM widget (the
K-map's clickable table) has nothing to import — a dead import would be worse than the
missing reference. The rule now requires `vault.js` only when the widget uses the
runtime (a `<canvas>` or a range slider), and `build/negtest.mjs` confirms a canvas
widget without the import is still rejected.

### Lesson worth carrying forward

Both widget defects were in *logic*, not syntax. `check-widgets.mjs` parses every widget
and would have passed the broken K-map solver without complaint — it was a valid ES
module that computed the wrong answer. Any widget that computes a non-obvious result
needs a numeric test against a hand calculation, exactly as the two above received.



## Verification tooling (all in `build/`)

`verify.mjs` runs every guard in-process (the sandbox forbids spawning child processes
with piped stdio). `check-links.mjs`, `check-widgets.mjs`, `build-notes.mjs`
(`validateAllPayloads`) and `build-meta.mjs` (`buildMeta`) are importable with `isMain`
guards, so they work both standalone and as libraries.

**Not automatable:** mathematical accuracy of the content. Automated checks guarantee
structure, links, tiers and escaping — never correctness. Independent recomputation by
workers caught 11 genuine numeric defects during the build, several traceable to errors
in my own task briefs, which is the strongest argument for keeping that check.

## T1 gate: 46 / 46 ✅

Every T1 topic independently audited and verified to have all of:
`depth: full` · `problem_count` >= 8 · `## Derivation` · `## Core Concept` ·
`## Formulas` · `## Traps & Exam Notes`.

`PROGRESS.md` shows `T1 full depth ██████████████████ 100%`.

The last two T1 notes were written by hand in round 7 because they had **no payload at
all** — only a stub shell with headings:

| ID | Topic | Why it mattered |
| --- | --- | --- |
| `MATH-05-15` | Inductance from Geometry and Materials | one of the two **gold-standard** notes you flagged |
| `MATH-04-11` | Fourier Series Trigonometric and Exponential | core transform topic gating Laplace/Fourier tooling |

Both were built to the full T1 bar: 5–6 concept paragraphs, 6–7 derivation entries,
15 formula rows with applicability notes, 10 worked problems with verified arithmetic,
and 9 specific traps each. `MATH-05-15` derives solenoid, toroid, coaxial and two-wire
inductance, the energy method and the air-gap force. `MATH-04-11` derives the coefficient
formulas from orthogonality, works the square wave in both trigonometric and exponential
form, and covers Parseval, symmetry and Gibbs overshoot.

## Remaining 19 topics (T2/T3 only — no T1 outstanding)

`02_Electronics_Engineering/07_Industrial_Automation_and_Sensors` ·
`01_Mathematics/04_Advanced_Engineering_Math` ·
`01_Mathematics/05_Electromagnetics` ·
`04_EST/04_Data_Communications_and_Networking` — final wave in flight.

## Remaining 30 topics (5 areas)

| Area | Full |
| --- | --- |
| `01_Mathematics/04_Advanced_Engineering_Math` | 9 / 18 |
| `01_Mathematics/05_Electromagnetics` | 11 / 22 |
| `02_Electronics_Engineering/07_Industrial_Automation_and_Sensors` | 12 / 16 |
| `03_GEAS/06_Engineering_Management_and_PM` | 9 / 10 |
| `04_EST/04_Data_Communications_and_Networking` | 10 / 19 |

## Fully complete areas (25 of 31)

`01_Differential_Calculus` · `02_Integral_Calculus` · `03_Differential_Equations` ·
`06_Control_Systems` · `07_Signals_and_Systems` · `08_Numerical_Methods` ·
`09_Engineering_Data_Analysis` · Electronics `01_DC_Circuits` · `02_AC_Circuits` ·
`03_Two_Port_Networks` · `04_Semiconductor_Devices` · `05_Circuit_Analysis_and_Design` ·
`06_Power_Electronics` · `08_Logic_Circuits` · `09_Microprocessors` ·
GEAS `01_General_Chemistry` · `02_University_Physics` · `03_Materials_Science` ·
`04_Environmental` · `05_Engineering_Economy` · `07_ECE_Laws` ·
EST `01_Signals_Spectra_and_Noise` · `02_Principles_of_Comms` · `03_Digital_Comms` ·
`05_Transmission_Lines` · `06_Antennas`

## Defects found in round 6

6. **Undoubled LaTeX backslashes** broke 5+ payloads across 4 subagents. The loader now
   **repairs these automatically** (`repairEscapes` in `build-notes.mjs`), rewrites the
   file, and logs `> repaired N invalid escape(s)`.
7. **Raw `"` inside JSON strings** broke 2 payloads. Not safely auto-repairable; fixed by
   hand and documented in `build/README.md`.
8. **`slugify` produced multi-segment slugs.** A title containing `/` created a
   subdirectory inside `Topics/` and a nested payload folder. Affected `PERT/CPM`,
   `TCP/IP`, `CSMA/CA`, `G/T`. Fixed at the root (`/` → ` - `), payloads migrated,
   4 orphan directories removed. `ECE-09-09` is now `09_PWM_and_ADC_-_DAC_Modules`.
9. **T3 notes printed an empty `## Core Concept` with `*Pending.*`.** The renderer now
   omits the section entirely when a payload carries no concept prose, so lean notes read
   as deliberately lean rather than unfinished.
10. **Two tier mismatches on my side, not the agents':** `ECE-09-01` was briefed as T3 but
    is T2 in the model, and `MATH-08-03`/`MATH-09-08` were T1 but built short. All three
    corrected (derive blocks added, problem counts raised to the tier target).

## Subagent arithmetic QA — the delegation paid off

Workers recomputed their own answers and found **11 genuine numeric defects** that no
automated check could catch: swapped Rockwell dial constants (N = 130 for HRB, 100 for
HRC — affects every reading), a vacancy fraction off by 45 orders of magnitude, Miller
index linear density counted with unshared corner atoms, an Å²→m² conversion off by 10,
stored-energy density off by 5×, and the half-wave dipole field formula carrying a
spurious π. This is the strongest evidence so far that independent verification of
delegated content works.

## Done so far

| Area | Topics | Full |
| --- | --- | --- |
| `01_Differential_Calculus` | 8 | ✅ 8 |
| `02_Integral_Calculus` | 15 | ✅ 15 |
| `03_Differential_Equations` | 14 | ✅ 14 |
| `04_Advanced_Engineering_Math` | 18 | 🚧 9 |
| `05_Electromagnetics` | 22 | 🚧 11 |
| `06_Control_Systems` | 14 | 🚧 2 |
| `08_Numerical_Methods` | 10 | 🚧 5 |
| `09_Engineering_Data_Analysis` | 14 | 🚧 part |
| Electronics 01–04 (46) | 46 | 🚧 part |
| GEAS 01–03 (37) | 37 | 🚧 part |
| EST 01–02 (26) | 26 | 🚧 part |

## Waves in flight (8)

`04_Advanced_Math` 10–18 · `05_Electromagnetics` 12–22 · `06_Control` + `07_Signals` ·
`08_Numerical` + `09_Data_Analysis` · Electronics 01_DC + 02_AC ·
Electronics 03_Two_Port + 04_Semiconductor · Electronics 07_Industrial + 08_Logic +
09_Microprocessors · GEAS 01_Chemistry + 02_Physics + 03_Materials ·
GEAS 04_Environmental + 05_Economy + 06_Management + 07_Laws ·
EST 01_Signals_Noise + 02_Comms · EST 03_Digital + 04_Data_Comms.

## Barely started — no wave yet assigned

`04_EST/05_Transmission_Lines_and_Waveguides` (10),
`04_EST/06_Antenna_Systems_and_Propagation` (16),
`02_Electronics_Engineering/05_Circuit_Analysis_and_Design` (17),
`02_Electronics_Engineering/06_Power_Electronics` (9),
`01_Mathematics/01_Differential_Calculus` → done,
Electronics `01_DC_Circuits` + `02_AC_Circuits` (22) — in flight.

## Quality sampling done

- `03_Differential_Equations` 01: handled the singular solution $y\equiv0$ lost by
  separation; traps name concrete failure modes. ✅
- `05_Electromagnetics/09_Capacitance_from_Geometry` (gold standard): 295 lines, all six
  sections, 10 problems, formula notes flag radii-vs-diameters and the small-separation
  validity condition. ✅
- `04_Advanced_Engineering_Math`: worker re-verified every numeric answer in Node
  ($\sin 0.3$, $\ln 1.1$, $\sqrt{1.02}$, $e^{-6}$, square-wave $\tanh(s/2)$). ✅

**Not yet sampled:** Electronics, GEAS, EST areas. Automated checks guarantee structure,
links and tiers — **not mathematical accuracy**. Sample these before relying on them.

## Delegation contract (for parallel content waves)

Content authoring can be fanned out to subagents because the tooling now self-checks.
A worker prompt must state:

1. read `_meta/PAYLOAD_SCHEMA.md`, `_meta/CONVENTIONS.md` (§8 wikilinks), and one good
   example payload;
2. the exact payload filenames — **list the Topics directory**, do not type them;
3. tier requirements (T1: concept ≥2 + `derive` + 8–10 problems + ≥2 traps;
   T2: concept ≥1 + 3–5 problems + ≥1 trap);
4. the wikilink rule and that targets must be verified against the real directory;
5. run `build-notes --validate`, `build-notes`, `check-links` — **0 broken required**;
6. never use PowerShell `Set-Content` (writes a BOM); never run `build-stubs.mjs`;
   never edit `vault.mjs`/`expand.mjs`/`build-*.mjs`.

The main session then re-runs `check-links.mjs` and `build-meta.mjs` to confirm.

## Defects found and fixed during P4

4. **Wikilinks written as IDs.** `[[MATH-01-02_Differentiation_Rules]]` instead of
   `[[02_Differentiation_Rules]]`. The ID is not part of any filename. Caught by
   `check-links.mjs`, then by a new authoring-time check in `build-notes.mjs`.
   Documented as `CONVENTIONS.md` §8.
5. **UTF-8 BOM in a payload.** PowerShell's `Set-Content -Encoding UTF8` writes a BOM,
   and `JSON.parse` rejects it. The loader now strips a leading BOM defensively.
   **Do not edit payload JSON with PowerShell** — use the edit tool or Node.

## Pilot outcome — what was proved

`01_Differential_Calculus` is the reference area. It contains all three tiers in use and
exercises every renderer path:

| ID | Topic | Tier | Problems |
| --- | --- | --- | --- |
| MATH-01-01 | Limits, Continuity and L'Hôpital | T1 | 10 |
| MATH-01-02 | Differentiation Rules | T1 | 10 |
| MATH-01-03 | Implicit, Parametric and Logarithmic Differentiation | T2 | 5 |
| MATH-01-04 | Related Rates | T2 | 6 |
| MATH-01-05 | Extrema, Concavity and Inflection | T1 | 8 |
| MATH-01-06 | Optimization Problems | T2 | 6 |
| MATH-01-07 | Differentials and Error Propagation | T2 | 8 |
| MATH-01-08 | Rolle's and Mean Value Theorems | T2 | 7 |

Two defects were found by the tooling during the pilot and fixed in the renderer, which
is exactly why the pilot runs before scaling:

1. Formula-table expressions were emitted without `$` delimiters, so all equation
   tables rendered as literal text. `expand.mjs` now wraps them.
2. Topic IDs collided across parts (`DC-01` was three different topics). IDs are now
   `PART-AreaNN-TopicNN`.
3. The frontmatter list parser split `[[wikilinks]]` on commas inside filenames,
   corrupting `CROSSLINKS.md`. `build-meta.mjs` now splits on top-level commas only.

## Pipeline (in `build/`)

| Script | Purpose |
| --- | --- |
| `vault.mjs` | **canonical model** — tree, titles, tier assignment, ID scheme |
| `expand.mjs` | **renderer** — all fixed note/MOC structure lives here |
| `build-stubs.mjs` | regenerate all stubs + MOCs from the model |
| `build-notes.mjs` | render payloads → notes (`--area`, `--validate`, `--force`) |
| `build-meta.mjs` | regenerate PROGRESS / MANIFEST / CROSSLINKS / dashboard |
| `build-templates.mjs` | regenerate `_meta/TEMPLATE_*` from the live renderer |
| `build-widgets.mjs` | link every widget from its area MOC's Widgets section |
| `check-links.mjs` | verify every wikilink resolves |
| `check-widgets.mjs` | widget module syntax + asset paths |
| **`verify.mjs`** | **run every guard at once — use this after each wave** |
| `payload/<part>/<area>/<slug>.json` | the content itself |

## Two sandbox constraints that shaped this build

1. **Node cannot spawn child processes with piped stdio** (`EPERM` on pipe creation).
   So `verify.mjs` must **import** the check modules and call them in-process; it must
   never `execFileSync`. `check-links.mjs`, `check-widgets.mjs`, `build-notes.mjs`
   (exports `validateAllPayloads`) and `build-meta.mjs` (exports `buildMeta`) are all
   importable, with an `isMain` guard preserving standalone CLI use.
2. **PowerShell writes a UTF-8 BOM** with `Set-Content -Encoding UTF8`, which
   `JSON.parse` rejects. Never edit payload JSON with PowerShell — use the edit tool
   or Node. The payload loader strips a leading BOM defensively anyway.

## Standard content wave

```bash
# 1. write payloads into build/payload/<part>/<area>/
node build/build-notes.mjs --validate --area <AreaName>   # check first
node build/build-notes.mjs --area <AreaName>              # render
node build/verify.mjs                                     # all guards
node build/build-widgets.mjs                              # if widgets were added
```

## Invariants to keep true

1. `check-links.mjs` reports **0 broken**. Re-run after every wave.
2. All 408 topic IDs unique (`build-meta.mjs` prints collisions if any appear).
3. Tier counts stay **46 / 325 / 37** unless a promotion is explicitly requested.
4. Notes are regenerated from payloads, never hand-restructured.
5. Area MOC tables are generated — never hand-edited.

## Escalating a note the user finds thin

1. Move its key in `build/vault.mjs` (`T1` or `T3` array) — or ask to promote it.
2. Enrich `build/payload/.../<slug>.json` to the new tier's requirements.
3. `node build/build-notes.mjs --area <AreaName>` — that one file re-renders.
4. `node build/build-meta.mjs`.

Tier targets: **T1** concept ≥2 paras + `derive[]` + 8–10 problems + ≥2 traps ·
**T2** concept + 3–5 problems + ≥1 trap · **T3** formulas + ≥1 trap, no problems section.

## Next area

`01_Differential_Calculus` (8 topics) is the pilot. Remaining wave order is by part:
finish Mathematics 01–09, then Electronics 01–09, GEAS 01–07, EST 01–06.
Pick the first area in `PROGRESS.md` with `pct < 100`.
