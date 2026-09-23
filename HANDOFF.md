# HANDOFF — read this second, after `build/README.md`

You are picking up a **generated** Obsidian vault: an ECE board-exam reviewer, 408 topic notes.
This file exists because the previous agent's conversation is gone. Everything below is either
(a) a rule that will cost you real work if you break it, or (b) state that lived only in that
conversation. Nothing here is a guess.

---

## 0. The one rule that matters most

```
ECE_Reviewer_Vault/   ← GENERATED OUTPUT. Never hand-edit a note's structure.
build/                ← SOURCE OF TRUTH. Edit payloads, the renderer, or the model.
```

`build/README.md` says the same thing in its first four lines; it is the only line that matters.
Every note under `ECE_Reviewer_Vault/**/Topics/` is rendered from
`build/payload/<part>/<area>/<slug>.json` by `build/build-notes.mjs` via `build/expand.mjs`.
**If you edit a note, the next render silently discards your work.** If you author content, author
it in the payload.

Two exceptions, both deliberate: a note's *learner-owned frontmatter* (`status`, `confidence`,
`last_reviewed`) is preserved across renders by `extractTracking()`, and the `.md` files under
`_meta/` that are hand-written (`BUILD_STATE.md`, `CONVENTIONS.md`, `CALCULATOR_TECHNIQUES.md`,
`CONTENT_DEFECTS.md`…) are not generated.

---

## 1. Read order

1. `build/README.md` — the pipeline, which script to run, the hard rules, the payload-defect classes.
2. **this file** — state that is not on disk anywhere else.
3. `ECE_Reviewer_Vault/_meta/BUILD_STATE.md` — resume point: current state, blind spots, open items.
4. `ECE_Reviewer_Vault/_meta/CONVENTIONS.md` and `PAYLOAD_SCHEMA.md` — authoring contracts.
5. Whatever workstream you pick up, below.

⚠️ **`PLAN_tokens.md` at the root is STALE.** It says "Status: COMPLETE … Outstanding: P5 widgets
(5 of ~70 built)". There are **83 widgets, all built and verified**. Its locked-decisions table is
still useful; its status block is wrong. Read it last, or not at all.

---

## 2. Verify before you believe anything, including this file

```bash
node build/verify.mjs          # must end: ALL CHECKS PASSED
node build/build-notes.mjs --validate   # must print: validated 408 payload(s)
```

`verify.mjs` runs every guard **in-process** (it imports `check-*.mjs` rather than spawning them —
under the sandbox Node cannot open pipes, so `child_process` with piped stdio fails with `EPERM`).
It covers structure, links, widgets, payload validity, meta freshness and calc-block contract
compliance. It does **not** check whether the mathematics in a note is correct. Nothing does.

Current state, verified at the time of writing:

| Quantity | Value |
| --- | --- |
| Topic notes / payloads | 408 / 408 |
| Files / wikilinks / widgets | 605 / 4929 (0 broken) / 83 |
| Calculator blocks | 931, across 213 payloads, 16 of 31 areas |
| Core Concept spacing sites remaining | **129**, across 9 areas |
| Core Concept render artefacts | 0 `$$$`, 0 unbalanced `$`, 0 orphan fragments, 0 stranded units |

---

## 3. Workstream A — Core Concept prose spacing (129 sites, 9 areas left)

### Background

Concept prose is dense with inline math. `build/formula-layout.mjs` (`hoistInlineFormulas`,
`CONCEPT_PROMOTE_ALL = true`, `CONCEPT_PROMOTE_MIN = 20`) lifts a substantial inline `$…$` formula
onto its own `$$` display line — **but only when the formula already begins a clause**, i.e. the
character before it (ignoring spaces) is one of `:` `.` `;` `!` `?`, or it starts a line. Otherwise
hoisting strands the surrounding words; an attempt to hoist everywhere produced 439 one-word
fragments ("it is", "valid when") and an ungrammatical join.

The owner asked for the **587 equations of 40+ characters** still buried mid-sentence to be fixed by
**rewriting the payload prose so each equation begins a clause** — *not* by loosening the rule.
Progress: **587 → 129**. Do not touch `CONCEPT_PROMOTE_*`.

### The 9 areas left

| Area | Sites |
| --- | ---: |
| `02_Electronics_Engineering/04_Semiconductor_Devices` | 17 |
| `01_Mathematics/02_Integral_Calculus` | 16 |
| `02_Electronics_Engineering/07_Industrial_Automation_and_Sensors` | 16 |
| `03_GEAS/01_General_Chemistry` | 15 |
| `04_EST/01_Signals_Spectra_and_Noise` | 14 |
| `02_Electronics_Engineering/01_DC_Circuits` | 13 |
| `03_GEAS/03_Materials_Science` | 13 |
| `04_EST/03_Digital_Communications` | 13 |
| `02_Electronics_Engineering/06_Power_Electronics_and_Systems` | 12 |

**Always re-derive this list**, it goes stale the moment anyone edits a payload:

```bash
node build/audit-concept-formulas.mjs                 # full run: rewrites the two shared reports
node build/audit-concept-formulas.mjs --area "<Part/Area>"   # one area: prints count, exits 1 if not clean
```

`--area` writes **no shared file**, so several areas can be worked concurrently. The full run
rewrites `build/CONCEPT_FORMULA_AUDIT.md` and `build/concept-spacing-worklist.md`; two concurrent
full runs can hand each other a torn file.

`build/concept-spacing-worklist.md` lists every remaining site with ~150 characters of context
either side. It is a snapshot; the `--area` command is authoritative.

### The rewrite recipe

For each site, restructure the sentence so the equation is introduced by a colon ending a lead-in
clause (or begins after a sentence-ending period), and make the text that follows a complete
sentence. Three accepted shapes:

```
BAD : Chain: $A$, or in Leibniz form $B$. Everything else …
GOOD: Chain: $A$, or in Leibniz form: $B$. Everything else …

BAD : The second derivative is **not** $X$; it is $Y$. This is …
GOOD: The second derivative is **not** $X$. The correct expression is: $Y$. This is …

BAD : … the photon energy in eV·µm: $E = 1.24/\lambda$ eV, so …
GOOD: … In electronvolts the photon energy is: $E = 1.24/\lambda$, so …
```

Hard-won details:

- **Do not write `$$` yourself; keep single `$` and let the renderer convert.** Hand-authored display
  math is *tolerated* — the transform's guards skip existing `$$…$$` blocks, and 28 of the vault's
  display blocks were authored rather than hoisted — but the whole rollout is built on the single-`$`
  convention, and `$$$` artefacts are counted by the audit.
- The transform strips **one** stranded `.` `,` `;` `:` immediately after a display block, so end the
  equation's source sentence with a period.
- **A unit must never be left opening the line after a display block** ("$$EQ$$`\neV, so …`"). Move
  it into the lead-in or inside the equation. The audit counts these.
- **Only one formula per sentence hoists.** In `… $A$, or $B$`, `$B$` stays inline. For a list, give
  each member its own lead-in, or use `The equations are: $A$; $B$; $C$.` — a `;` starts a clause.
- A bold lead-in ending in `**` (`**The formula.** $…$`) means the preceding character is `*`, not
  `.`, so the formula does **not** hoist; it needs a real lead-in clause.
- **Re-audit after every batch.** A rewrite that replaces a period with an em dash, or leaves a comma
  directly before a formula, pushes that site *back* into residual state. Workers hit this repeatedly.

### The worker brief (reuse verbatim if you fan out)

Each worker gets one area and must obey:

- Edit **only** the `concept` array strings of payloads under `build/payload/<that area>/`. Nothing
  else — not notes, not other payload fields, not `build/calc-patches`, not `formula-layout.mjs`.
- Do not convert `$…$` to `$$…$$`; do not change any mathematics, symbol or number.
- Do **not** run `verify.mjs`, `build-notes.mjs` (except `--validate`), or `apply-calc-patches.mjs`,
  and do **not** run the full (non-`--area`) audit — other workers are active.
- LaTeX backslashes are **doubled** in the raw JSON (`\\frac`), so search strings must contain the
  doubled form. Preserve em dashes (—) and `**bold**` lead-ins. Surgical `edit` only, never rewrite
  a whole file.
- Verify: `--area` must print `CLEAN`, and `build-notes.mjs --validate` must pass.
- Report content/mathematics errors; do **not** fix them.

### Parallel-work protocol

**Four concurrent subagents maximum** — more get stopped by the runtime mid-flight and deliver
nothing (verified: launching 6 left 2 never started and the rest killed). Do not run
`build-notes.mjs` or `verify.mjs` from more than one place at once; they write all 408 notes.

### The approved visual reference

`02_Electronics_Engineering/02_AC_Circuits/08_Parallel_Resonance_and_Anti-Resonance` is the note the
owner signed off as "looks good now". Match its character: short relations stay inline, only
equations that begin a clause get their own line.

---

## 4. Workstream B — calculator techniques (16 of 31 areas)

Canon F-789SGA `calc` blocks on worked problems. **931 blocks across 213 payloads in 16 areas.**
Remaining areas are listed in `_meta/BUILD_STATE.md` open item 2.

- Contract and the **verified** key table: `ECE_Reviewer_Vault/_meta/CALCULATOR_TECHNIQUES.md`.
  Do not invent a key or menu path. If a route is not in that table, use plain `COMP` arithmetic.
- Blocks are authored as patch files in `build/calc-patches/<Area>.json` (16 files) and applied with
  `node build/apply-calc-patches.mjs build/calc-patches --apply`. The applier refuses an entry whose
  `expect` prompt fragment does not match, refuses ambiguous anchors, parses before writing and
  re-parses after, and lint-warns on a bad mode, >3 steps, `\text{}`, a literal `|`, a short `expect`
  or an over-long note.
- **`--report` is a dry run.** Always run it first; it prints drift and the lint warnings.
- A patch file is **not frozen** when you first see it. Re-run `--report` and re-apply before
  declaring an area done — an earlier round shipped 12 stale entries that way.
- Patch files and payloads must be kept **in lockstep**: if you correct a number that a calc block
  quotes, edit both, or the next `--apply` restores the old figure.

---

## 5. Open content decisions (do not fix these unilaterally)

Recorded with evidence in `build/CONTENT_DEFECTS.md`:

1. **Ziegler-Nichols PI gain** — `01_Mathematics/06_Control_Systems/12_PID_Controllers_and_Tuning`
   concept 4 gives `K_c = (1.2/K)(T/L)` for PID but `0.9 T/L` for PI. The `1/K` is missing; standard
   is `0.9 T/(K L)`.
2. **State-space heading** — `14_State_Space_Representation_Basics` concept 5 is headed "Why singular
   values of A alone are not enough" over a paragraph about eigenvalues and rank.
3. **Steady-state error / load disturbance** — `06_Steady_State_Error_and_Error_Constants` concept 6
   and `traps[8]` state opposite conditions for the same thing.
4. **IQR outlier trap** — `01_Mathematics/09_Engineering_Data_Analysis/02_Dispersion,_Variance,_SD,_IQR_and_CV`
   P4: the trap names one quartile convention, quotes numbers from another, and its punchline (the
   fence "landing exactly on 95") fails under the convention it names — that method gives a fence of
   84.5. The problem's own solution is correct.
5. **FM improvement factor** — `09_FM_Noise_and_Threshold_Effect` P2 attaches `I = 1.5 beta^2` to the
   input CNR; several texts give `3 beta^2 (beta + 1)` for the IF-referenced CNR. Needs a textbook.

---

## 6. How the owner works (learned, not documented elsewhere)

- **Ask before fixing content.** Present the defect, the evidence and the options; the owner decides.
  Batch them into one question rather than asking one at a time.
- **A worker's report is a lead, not evidence.** Of the last round's content warnings, **10 were
  wrong** — including a claim the audit regex undercounted (measured: 0 of 11,426), a "10³ error"
  where the note was right, a Fresnel label swap that did not exist, and a worker that cited the
  wrong file for a real typo. Verify every claim independently before editing.
- **Validate your checkers against a known answer.** A checker that reports phantoms is worse than
  useless: this build has already removed false-positive rules from `diagnose-formulas.mjs`, and the
  spacing audit's first version used `\Z` as an end anchor — but in JavaScript `\Z` is a literal "Z",
  so any note with an impedance `Z` had its section truncated and produced 32 phantom "unbalanced `$`"
  paragraphs. The stranded-unit check likewise flagged "$$EQ$$ **in** which…" because `in` (inches)
  was in its token list.
- **Stop when told to stop**, and do not start new subagents without instruction.
- Keep the record on disk. This repo's whole convention is "state lives on disk, not in a
  conversation" (`build/README.md` hard rule 5).

---

## 7. Footguns that have already cost time here

| Trap | What happens | Do instead |
| --- | --- | --- |
| `String.replaceAll(pat, replacementString)` | `$'`, `$&`, `$$` are substitution patterns — one corrupted a payload by splicing a file's tail into itself | Always pass a **function** replacement |
| PowerShell `Set-Content -Encoding UTF8` on payload JSON | Writes a BOM; `JSON.parse` rejects it | Use the edit tool or Node's `fs.writeFileSync` |
| A single backslash before `frac` | Parses "successfully" as form-feed + `rac` — silent corruption | Doubled backslashes in raw payload JSON; look for control characters to audit |
| Editing a note instead of its payload | The next render discards it | Edit `build/payload/...` |
| Running `build-stubs.mjs` casually | Rewrites every topic note from the model, destroying rendered content | Only when the model changed |
| Node `child_process` with piped stdio | `EPERM` under the sandbox | Import checks in-process, as `verify.mjs` does |
| `web_search` in this environment | Returns `DeepSeek returned an unprocessable response body` | Use `web_fetch` on a specific URL, or ask the owner for a source |

---

## 8. Definition of done for any change

```bash
node build/build-notes.mjs --validate   # validated 408 payload(s)
node build/build-notes.mjs              # rendered: 408 | no payload (left as stub): 0
node build/verify.mjs                   # ALL CHECKS PASSED
```

Then update `_meta/BUILD_STATE.md` (and `build/CONTENT_DEFECTS.md` if you found or fixed a defect).
Build progress is generated into `_meta/PROGRESS.md`; do not hand-maintain it.
