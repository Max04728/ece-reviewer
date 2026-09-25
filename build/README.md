# build/ — the vault generation pipeline

Everything in `ECE_Reviewer_Vault/` is **generated**. This directory is the source of
truth. Never hand-edit a note's structure; edit the model, the renderer, or a payload.

```
build/
├── vault.mjs              canonical model (tree, titles, tiers, IDs)
├── expand.mjs             renderer (all fixed note/MOC structure)
├── payload/               the CONTENT — one JSON per topic
│   └── <part>/<area>/<NN_Topic_Slug>.json
├── build-stubs.mjs        model → all stubs + MOCs
├── build-part-mocs.mjs    model → the 4 part MOCs ONLY (non-destructive)
├── build-notes.mjs        payload + model → rendered notes
├── build-meta.mjs         vault → PROGRESS/MANIFEST/CROSSLINKS/dashboard
├── build-templates.mjs    renderer → _meta/TEMPLATE_*
├── build-widgets.mjs      widget files → MOC Widgets sections
├── build-drills.mjs       problem records → Sets/ drills (P6)
├── check-links.mjs        every wikilink resolves?
├── check-widgets.mjs      widget syntax + asset paths
├── assemble-crash-review.mjs  parts → a crash-review note (guarded; --course math|ee)
├── check-crash-review.mjs     post-write checks for both crash-review notes
├── verify-crash-review.mjs    independent numeric spot-checks (Mathematics sheet)
├── verify-electronics-review.mjs  independent numeric spot-checks (Electronics sheet)
├── scan-pipe-math.mjs         table-breaking "|" inside inline maths
├── check-lvert-spacing.mjs    \lvert/\rvert missing a delimiter before a letter
├── verify-worker-claims.mjs   recomputes worker-reported content defects
└── verify.mjs             ALL GUARDS — run this
```

> The two crash-review sheets are **hand-authored notes**, not rendered from payloads. They are
> declared in `PART_NOTES` (`vault.mjs`) so the part MOC links them under **Review Sheets**, and
> the renderer checks the file exists before emitting the link. `assemble-crash-review.mjs` is a
> one-shot rebuilder whose part files live in a temporary directory, so it fails safe (writes
> nothing) once that directory is gone; edit the notes directly and re-run
> `node build/check-crash-review.mjs` to verify them.

> `build-stubs.mjs` rewrites all 408 topic notes. When only a part MOC changed — e.g. a
> `PART_NOTES` review-sheet link in `vault.mjs` — run `build-part-mocs.mjs` instead: it writes
> 4 files and touches no note.


## Data flow

```
vault.mjs (paths, titles, tiers, IDs)
      │
      ├── build-stubs.mjs ──────► 408 stub notes + 31 area MOCs + 4 part MOCs
      │                            (frontmatter, headings, generated nav)
      │
payload/*.json ─┐
                ├── build-notes.mjs ──► rendered notes (depth: full)
expand.mjs ─────┘        │
      │                  │
      └── build-templates.mjs ──► _meta/TEMPLATE_*.md (never drift from code)
                         │
                         └── build-meta.mjs ──► _meta/PROGRESS.md, MANIFEST.md,
                                                CROSSLINKS.md, DATAVIEW_QUERIES.md,
                                                00_Dashboard.md
```

## Which script do I run?

| I want to… | Run |
| --- | --- |
| Render payloads I just wrote | `node build/build-notes.mjs --area <Area>` |
| Check a payload before rendering | `node build/build-notes.mjs --validate --area <Area>` |
| **Verify everything** | `node build/verify.mjs` |
| Refresh progress/dashboard | `node build/build-meta.mjs` (or just `verify.mjs`) |
| Add widgets to their MOC | `node build/build-widgets.mjs` |
| Regenerate practice drills | `node build/build-drills.mjs --include-traps` |
| Change a topic's tier | edit `vault.mjs`, then re-run `build-notes.mjs --area` |
| Regenerate all stubs (DESTRUCTIVE) | `node build/build-stubs.mjs` |

> ⚠️ `build-stubs.mjs` rewrites every topic note from the model. Running it **destroys
> all rendered content** (payloads survive, so `build-notes.mjs` restores it). Only run
> it when the model itself changed.

## Tier system

`tier` is plain frontmatter metadata plus a payload, never a rewrite.

| Tier | Renders | Count |
| --- | --- | --- |
| T1 | concept ≥2 paras, derivation, 8–10 problems, ≥2 traps | 46 |
| T2 | concept, formulas, 3–5 problems, ≥1 trap | 325 |
| T3 | formulas, ≥1 trap (no problems section) | 37 |

To promote a note: move its key in `vault.mjs` between the `T1`/`T3` arrays, enrich the
payload, re-render that one area. Nothing else in the vault changes.

## Hard rules

1. **Wikilink target = filename without `.md`.** Never an ID. See `CONVENTIONS.md` §8.
2. **Never edit payload JSON with PowerShell** — `Set-Content -Encoding UTF8` writes a
   byte-order mark that `JSON.parse` rejects. Use the edit tool or Node.
3. **`verify.mjs` must never spawn child processes.** Under the DSH sandbox Node cannot
   open pipes, so `child_process` with piped stdio fails with `EPERM`. The checks are
   importable for exactly this reason. If you add a check, export a function from it.
4. **A non-zero `broken` count in `check-links.mjs` is a build failure.** Filenames carry
   commas and typographic apostrophes; a link that is one character off dangles silently
   in Obsidian.
5. **State lives on disk**, not in a conversation. `_meta/BUILD_STATE.md` is the resume
   point; `_meta/PROGRESS.md` is generated and always current.
6. **A slug must be a single path segment.** `slugify` maps `:` to a space and `/` to
   ` - `. A title containing a slash previously produced `09_PWM_and_ADC/DAC_Modules`,
   which silently created a *subdirectory* inside `Topics/` and stranded the payload in
   a nested folder. Four topics were affected (`PERT/CPM`, `TCP/IP`, `CSMA/CA`,
   `G/T`). If you change `slugify`, check for orphans afterwards:
   ```bash
   # any directory inside a Topics/ folder is an orphan
   Get-ChildItem ECE_Reviewer_Vault -Recurse -Directory |
     Where-Object { $_.Parent.Name -eq 'Topics' }
   ```

## Two classes of payload JSON defect

| Defect | Symptom | Detection | Repair |
| --- | --- | --- | --- |
| Undoubled LaTeX backslash (`\frac`, `\left`) | file will not parse | `diagnose.mjs` | **automatic** — `build-notes.mjs` repairs and rewrites the file |
| Raw `"` inside a string (`he said "this"`) | file will not parse | `diagnose.mjs` | manual — no safe automatic rule |

The second class is genuinely ambiguous to a machine: a quote inside a JSON string could
be intended as content or as a delimiter, and guessing wrong corrupts the payload. It is
caught by the build, not silently accepted.

**Silent corruption is worse than a parse failure.** A single-backslash `\frac` parses
"successfully" as a form-feed followed by `rac`, and `\right` as a carriage return
followed by `ight`. To audit for that class, look for control characters in payload
strings — that is the definitive test, since legitimate LaTeX never produces them.

## Adding content (the normal loop)

1. Read `_meta/PAYLOAD_SCHEMA.md`.
2. Check the topic's tier in `_meta/MANIFEST.md` (or `vault.mjs`).
3. Write the payload at `build/payload/<part>/<area>/<slug>.json` — the filename must
   match the note's basename exactly; copy it from `MANIFEST.md`.
4. `node build/build-notes.mjs --validate --area <Area>` → fix errors
5. `node build/build-notes.mjs --area <Area>` → render
6. `node build/verify.mjs` → must end with `ALL CHECKS PASSED`

A topic with no payload stays a stub. Rendering never invents content: missing fields
degrade to `*Pending.*` rather than silently dropping a section.

## P6 — derived practice sets

`build-drills.mjs` is the payoff for storing problems as structured records rather than
prose. One authored `problems[]` entry feeds both the topic note and the drill, with no
re-typing:

```
payload problems[] ──► note "## Worked Problems"   (build-notes.mjs)
                   └─► Sets/<Area>_Drill.md        (build-drills.mjs)
                   └─► Sets/<Area>_Traps.md        (--include-traps)
```

- Drills pool every T1/T2 problem in an area and deterministic-shuffle with a fixed
  `--seed`, so re-running does not churn the files and a drill is reproducible.
- Answers render inside collapsible `[!success]-` callouts, so the file is usable as a
  self-test without a separate answer key.
- `--include-traps` builds a second recall drill: read the failure mode, state the rule
  it violates, then expand.
- Drill links are written into each MOC's `## Sets & Drills` section automatically.

## Token-economy notes

The whole build exists to avoid re-typing structure 408 times:

- Fixed text (frontmatter, headings, callout wrappers, tables, nav footer) lives in
  `expand.mjs` — typed once, applied 408 times.
- Problem records are structured data, so one record can later feed a note, a `Sets/`
  drill, and a flashcard without re-authoring.
- Meta files are generated from the tree, so there is no hand-maintained index to drift.
- `build-templates.mjs` generates the templates *from the live renderer*, so a template
  can never document behaviour the renderer no longer has.
