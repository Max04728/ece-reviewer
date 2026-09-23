---
title: PAYLOAD_SCHEMA
type: meta
updated: 2026-09-23
---

# PAYLOAD SCHEMA

How a topic note's content is authored. Structure lives in `build/expand.mjs`;
content lives in a payload JSON file. See `CONVENTIONS.md` §4.

## Location

```
build/payload/<part>/<area>/<NN_Topic_Slug>.json
```

The filename must equal the topic note's basename, minus `.md`. Get the exact slug
from `_meta/MANIFEST.md` — never guess it.

The filename on disk is `<NN>_<slug>.md`; this file is `<NN>_<slug>.json`.
Both derive from the same slug, so they always correspond.

## Shape

```json
{
  "scope":     "one line: what this note answers",
  "intuition": "optional: the physical/geometric picture in one or two sentences",
  "concept":   ["paragraph 1", "paragraph 2"],
  "derive":    ["step 1", "step 2"],
  "formulas":  [{ "q": "Quantity name", "e": "C = \\varepsilon A / d", "n": "when it applies / unit trap" }],
  "problems":  [{
    "prompt": "question text",
    "give":   ["A = 0.5 m²", "d = 1 mm"],
    "steps":  ["C = εA/d", "= (8.854e-12)(0.5)/(1e-3)", "= 4.43 nF"],
    "ans":    "4.43 nF",
    "trap":   "optional: the specific mistake this problem punishes"
  }],
  "traps":  ["specific failure mode, not general advice"],
  "refs":   ["[[Related_Note]]"],
  "prereqs":["[[06_Electric_Potential_and_Gradient]]"]
}
```

## Field rules

| Field | Required | Notes |
| --- | --- | --- |
| `scope` | yes | One line. Rendered in the `[!abstract]` callout. |
| `intuition` | no | Rendered in a `[!tip]` callout above the concept. |
| `concept` | T1, T2 | Array of paragraphs, joined with blank lines. T1 needs ≥ 2. |
| `derive` | T1 | Rendered as a **Derivation** section. T2/T3 never show it. |
| `formulas` | yes | `e` must **not** contain `$` — the renderer adds delimiters. |
| `problems` | T1, T2 | T1 renders up to 10, T2 up to 5, T3 renders none. |
| `traps` | yes | Bulleted. T1 ≥ 2. Specific, exam-shaped. |
| `refs` | no | Rendered as **See Also** wikilinks. |
| `prereqs` | no | Frontmatter only. Feeds `_meta/CROSSLINKS.md`. |

## Hard rules

1. **No `$` inside `formulas[].e`.** The renderer wraps it in `$...$`. Writing
   `"$C = \\varepsilon A/d$"` produces broken math.
2. **Every formula gets an `n`.** A blank note cell means an incomplete row and the
   validator warns.
3. **Problems are records, not prose.** Keep `steps` as discrete lines — they become
   the numbered solution, and the same records later feed `Sets/` drills.
4. **Traps are specific.** "Using `d` in mm while `A` is in m² gives an answer off by
   10³" — not "watch your units".
5. **Never restate the title in `scope`.** The renderer already prints it.

## Build commands

```bash
node build/build-notes.mjs --validate              # check all payloads, write nothing
node build/build-notes.mjs --validate --area 01_Differential_Calculus
node build/build-notes.mjs --area 01_Differential_Calculus   # render one area
node build/build-notes.mjs                         # render everything with a payload
node build/build-meta.mjs                          # regenerate PROGRESS/MANIFEST/dashboard
```

A topic with no payload stays a stub (`depth: stub`). Rendering never invents content:
missing fields degrade to `*Pending.*` rather than silently dropping a section.
