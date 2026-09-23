---
title: CONVENTIONS
type: meta
updated: 2026-09-23
---

# CONVENTIONS

Rules for the ECE_Reviewer vault. **This file is authoritative.** When a note disagrees
with this file, the note is wrong.

---

## 1. Vault layout

```
ECE_Reviewer_Vault/
├── 00_Dashboard.md            # entry point, generated
├── _meta/                     # conventions, manifest, progress, templates
├── Assets/                    # vault.js, snippets.css, images
└── <part>/                    # 01_Mathematics, 02_Electronics_Engineering, 03_GEAS, 04_EST
    ├── _MOC_<Part>.md         # part MOC
    └── <NN_Area>/             # leaf area
        ├── _MOC_<Area>.md     # area MOC
        ├── Topics/            # one note per topic
        ├── Sets/              # problem sets, drills, generated
        └── Widgets/           # interactive HTML
```

Four parts: `01_Mathematics`, `02_Electronics_Engineering`, `03_GEAS`, `04_EST`.
31 leaf areas, 408 topics.

**Topic IDs** are `<PART>-<AreaNN>-<TopicNN>`, e.g. `MATH-01-01` (Differential Calculus
topic 1), `MATH-05-13` (Electromagnetics topic 13), `ECE-08-16`. The part prefix is
mandatory: leaf-area initials collide across parts (Differential Calculus, DC Circuits
and Digital Communications are all "DC"), and the area number is used instead of
initials because initials degenerate. All 408 IDs are unique — verified by
`node build/build-meta.mjs`.

**Filenames are descriptive and are the canonical identity.** They are never
"tidied" later. A topic note is `NN_Descriptive_Title.md`; its wikilink target is the
basename without `.md`. Punctuation follows the source tree verbatim — commas,
apostrophes and parentheses are preserved, and only colons are dropped (illegal on
Windows). Never guess a filename from memory — read it from `MANIFEST.md`.

---

## 2. Frontmatter contract

Every topic note carries exactly these keys. The **generated** keys are rewritten from the
model on every render; the **learner-owned** keys at the end are preserved (see §2.1):

| Key | Type | Meaning |
| --- | --- | --- |
| `id` | string | Stable short ID, e.g. `MATH-01-01`, `ECE-01-01`, `EST-01-08`. Primary key, unique across the vault. |
| `title` | string | Human title, matches the filename topic portion. |
| `part` | string | `01_Mathematics` \| `02_Electronics_Engineering` \| `03_GEAS` \| `04_EST` |
| `area` | string | Leaf area folder name, e.g. `05_Electromagnetics`. |
| `topic` | number | 1-based position within the area. |
| `tier` | 1 \| 2 \| 3 | Depth tier, see §3. |
| `depth` | `stub` \| `full` | Generation state. `stub` = headings only. |
| `prereqs` | list | Wikilinks required before this note. Cross-area edges belong here. |
| `tags` | list | Always `ece`, the part, and the area slug. |
| `problem_count` | number | Problems the renderer actually shows (T1 ≤ 10, T2 ≤ 5, T3 0). |
| `status` | `not-started` \| `reading` \| `shaky` \| `solid` | **Learner-owned.** Where you are with the topic. |
| `confidence` | number | **Learner-owned.** 0–5, where 0 means unrated. |
| `last_reviewed` | date | **Learner-owned.** `YYYY-MM-DD`. Omitted from the note until set. |
| `updated` | date | `YYYY-MM-DD`. Build metadata — it changes on every render. |

MOCs use `type: moc`. Meta notes use `type: meta`. Do not invent new keys without
updating this table and `build-helpers`.

### 2.1 Learner-owned keys are PRESERVED across re-renders

`status`, `confidence` and `last_reviewed` are written by you, not by the build. They are the
only note keys a re-render must never author.

- `build-notes.mjs` and `build-stubs.mjs` both call `extractTracking()` (`expand.mjs`) on the
  note **already on disk** and pass the values back into `renderNote()`, so regenerating an area
  keeps your progress. `extractTracking` is the single implementation — never inline a second one.
- **Never put progress in a note body.** A `- [ ]` checkbox, a rating table, a `#done` tag —
  anything in the body is rebuilt from the payload on the next render and is simply gone. Only
  frontmatter survives. This is why tracking lives there.
- Editing them is a native Obsidian action: the **Properties** panel at the top of the note.
  Dataview reads them for the front page (`00_Dashboard.md`).
- `_meta/check-*.mjs` do not police these values; they are free-form. Keeping `status` to the
  four listed words is what makes the front page group cleanly.

---

## 3. Depth tiers

| Tier | Problems | Derivation | Intended use |
| --- | --- | --- | --- |
| **T1** | 8–10 | yes | gold-standard notes + core/high-yield board topics (46 topics) |
| **T2** | 3–5 | no | the working bulk of the reviewer (325 topics) |
| **T3** | link-only | no | policy, descriptive and survey topics (37 topics) |

`tier` is **per-note metadata, not a commitment**. Promoting a note is a one-word
change: edit `tier:` in `build/vault.mjs`, re-run `build-notes.mjs`, done. Nothing
else in the vault changes. Ask for promotions freely — the tier list lives in code
precisely so this stays cheap.

---

## 4. Payload system (how notes are actually written)

Notes are **not** hand-authored one by one. Structure lives in templates; content
lives in payload files:

- Payloads: `build/payload/<part>/<area>/<NN_Topic>.json`
- Renderer: `build/expand.mjs` (all fixed structure)
- Model/tiers: `build/vault.mjs` (canonical tree, tier assignment)
- Build: `node build/build-notes.mjs [--area <name>] [--force]`

A payload carries only the *variable* content: scope, concept, derivation, formulas,
problems, traps. Headings, callouts, tables, frontmatter and navigation are supplied
by the renderer. This is why 408 notes stay consistent and why re-rendering is free.

**Never edit a generated note to change structure.** Edit the template or the payload
and re-render. Note bodies *may* be hand-edited for a one-off fix, but the payload is
then the stale copy — record that in the note's frontmatter or fix the payload too.

---

## 5. Problem records

Problems are structured data, not prose:

```json
{
  "prompt": "Find the capacitance of a parallel-plate capacitor.",
  "give":   ["A = 0.5 m²", "d = 1 mm", "air"],
  "steps":  ["C = εA/d", "= (8.854e-12)(0.5)/(1e-3)", "= 4.43 nF"],
  "ans":    "4.43 nF",
  "trap":   "mm → m before substituting."
}
```

Because they are records, one problem can feed: the note, a `Sets/` drill, a
flashcard, and a randomized practice set. Author once, use several times.

---

## 6. Formula convention

- Inline math: `$...$`; display math: `$$...$$`.
- LaTeX must survive Obsidian's MathJax: no `\text{}` inside `$...$` where avoidable,
  prefer `\mathrm{}`; escape underscores.

### ⚠ Backslashes must be DOUBLED in payload JSON

This is the single most common way a payload file becomes unparseable. Inside a JSON
string, every LaTeX command needs **two** backslashes:

| In the payload JSON | Parses to | Renders as |
| --- | --- | --- |
| `"e": "\\\\frac{V}{R}"` → written as `\\frac` | `\frac` | correct fraction |
| `"e": "\frac{V}{R}"` → written as `\frac` | **error** | file will not parse |

`\l`, `\q`, `\p`, `\c` and `\ ` are **invalid** JSON escapes and abort the whole file
with `Bad escaped character`. Worse, `\f` and `\r` *are* valid JSON escapes — so
`\frac` silently becomes a form-feed followed by `rac`, and `\right` becomes a
carriage return followed by `ight`. Those corrupt the output **without any error**.

Use `node build/diagnose.mjs` to find these; it lists every invalid escape and scans
all payloads at once.

### No literal `|` inside a formula expression

The renderer escapes `|` to `\|` inside a table cell, which then mis-renders. For
absolute values and evaluation bars use `\lvert` and `\rvert`:

- Write `\lvert x \rvert`, not `\left| x \right|`
- Write `\left. \frac{V_1}{I_1} \right\rvert_{I_1=0}`, not `...\right|_{I_1=0}`

- Every formula row gets a **Notes** cell — when it applies, its assumptions, its
  common unit trap. A formula with no note is usually an incomplete row.
- Constants: use `\varepsilon_0 = 8.854\times10^{-12}\ \mathrm{F/m}`,
  `\mu_0 = 4\pi\times10^{-7}\ \mathrm{H/m}`, `c = 3\times10^{8}\ \mathrm{m/s}`.
  State when a value is rounded for exam use.

---

## 7. Exam-trap convention

Every T1/T2 note ends with **Traps & Exam Notes**. A trap is a *specific failure mode*,
not advice:

- Good: "Using `d` in mm while `A` is in m² gives an answer off by $10^3$."
- Bad: "Be careful with units."

Traps are the highest-value content in the vault. They should be written the way a
board exam punishes you, not the way a textbook explains.

---

## 8. Wikilink convention (read this before writing any link)

**A wikilink target is the note's FILENAME without `.md` — never its ID.**

| | Correct | Wrong |
| --- | --- | --- |
| Same area | `[[02_Algebraic_Substitution]]` | `[[MATH-02-02]]` |
| Cross-area | `[[02_Differentiation_Rules]]` | `[[MATH-01-02_Differentiation_Rules]]` |
| MOC | `[[_MOC_Differential_Calculus]]` | `[[Differential_Calculus]]` |

The ID exists for Dataview queries and the `MANIFEST.md` index; it is **not** part of
any filename. Every broken link found in this vault so far has been this mistake.

Filenames contain commas and apostrophes, so a link must reproduce them exactly:

- `[[01_Limits,_Continuity_and_L_Hopital]]` — comma inside the link
- `[[08_Rolle’s_and_Mean_Value_Theorems]]` — typographic apostrophe (U+2019), not `'`

`node build/check-links.mjs` verifies all of this. **Run it after every content wave
and treat any non-zero broken count as a build failure.** It is the only defence
against punctuation-level mistakes in a vault of this size.

---

## 9. Cross-area prerequisites

Edges across areas are carried in `prereqs` and surfaced in `_meta/CROSSLINKS.md`
(generated). Known edges, authored once:- EST-01 §08–10 (Sampling, Aliasing, Anti-Aliasing) → Math-07 §06–09 (Z Transform block)
- Math-07 §06–09 → Math-04 §07–13 (Laplace/Fourier tooling)
- Math-05 §01–03 (vector calculus) → Math-05 §04+ (all of electromagnetics)
- ECE-05 §01–03 (biasing) → ECE-05 §05+ (small-signal models)
- EST-05 §04–06 (reflection, VSWR, Smith) → EST-06 §01–06 (antenna parameters, Friis)
- Math-08 (numerical methods) ← Math-01 §05–06, Math-02 §03–07
- ECE-03 §05 (h-parameters) moved into ECE-05 §05 — no duplicate note exists.
- EST-06 §06 Friis transmission ↔ EST-01 §07 Friis **noise** — different formulas, same name; disambiguate in both notes.

Noise physics lives **only** in EST-01 §03–07. Power electronics cross-links to it;
it does not duplicate it.

---

## 10. Widgets

Widgets are standalone `.html` files that import the shared runtime:

```html
<link rel="stylesheet" href="../../Assets/snippets.css">
<div id="app"></div>
<script type="module">
  import { widget, fmt, Plot } from '../../Assets/vault.js';
  widget({ title: '…', controls: [...], compute: v => ({...}), draw: (ctx,v,out,plot) => {...} });
</script>
```

Rules:

- Never re-implement sliders, canvas setup, DPR handling or number formatting. Use
  `vault.js`. A widget that duplicates the runtime is a bug.
- Always show the numeric readout next to the graphic — the point is exam intuition,
  not a pretty picture.
- Where a widget demonstrates a formula, display the **formula and the current
  substituted values** on the page.

---

### 10.1 Where a widget appears

A widget is embedded in **two** places, and both are generated:

| Place | Generated by | Source of truth |
| --- | --- | --- |
| The area MOC's `## Widgets` section | `build-widgets.mjs` | the files in that area's `Widgets/` folder |
| The TOPIC NOTE that discusses it, as `## Interactive Widget` | `expand.mjs` | `build/widget-map.mjs` |

`widget-map.mjs` maps `<area>/<topic slug>` → widget basename, and `build/check-widget-map.mjs`
(wired into `verify.mjs` as §6c) validates every entry. That check exists because a wrong entry
is a **silent no-op**: the lookup is by topic slug, so a typo never matches, the note renders no
section, and nothing anywhere reports an error. One widget may legitimately map to several
topics when its own description covers them.

The embed size is `WIDGET_EMBED_SIZE` in `widget-map.mjs`, shared by both renderers so the MOC
and the notes cannot drift apart.

### 10.2 ⚠ Never make widget CSS depend on the FRAME height

Widgets embed with `height: max-content`, so the frame fits the content and the bottom edge
cannot land mid-row. Any rule that makes content height depend on frame height breaks that:
`height: 100%`, `min-height: 100%`, a flex canvas that grows to fill, or a
`@media (max-height: ...)` query. The failure mode is a feedback loop — the frame shrinks, the
content shrinks with it, and the bottom is clipped a little more on each pass (observed as a
progressive 1/2 → 1/4 → 1/8 cut). `snippets.css` carries a `padding-bottom` slack because the
plugin measures slightly short of the true height: **raise that value first** if a widget ever
loses its last row.

### 10.3 Viewing widgets

Widgets need the **Embed HTML** community plugin (mnaoumov). HTML Reader cannot run scripts at
all, so it shows a blank page — a widget body is `<div id="app"></div>` plus a module script.
Opening the `.html` directly in a browser also fails unless the vault is served over HTTP,
because ES modules cannot load from a `file://` origin. Neither limit is a vault defect.

## 11. Editing rules

1. **Never re-read the whole vault to check something.** Use `grep`, `MANIFEST.md`,
   or a Dataview query.
2. **Never rewrite a whole file for a small change.** Use a targeted edit.
3. **Never retype a path or title from memory.** Read it from the model or the tree.
4. Progress state lives in `_meta/PROGRESS.md` and is generated — do not hand-maintain it.
5. One source of truth per fact. If two files state the same thing, one must be
   generated from the other.
