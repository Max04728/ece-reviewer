# Worker brief — Core Concept prose spacing

You are fixing **one area** of the ECE reviewer vault. Context and the full rule set live in
`HANDOFF.md` section 3; this file is the operational subset. Read this, not that.

## The job

Concept prose is dense with inline math. `build/formula-layout.mjs` lifts a substantial inline
`$…$` formula onto its own `$$` display line, **but only when the formula already begins a clause**
— the character before it (ignoring spaces) is one of `:` `.` `;` `!` `?`, or the formula starts a
line. A formula buried mid-sentence cannot be hoisted without stranding the surrounding words.

So: **rewrite the prose so each equation begins a clause.** Never loosen the rule, never edit
`formula-layout.mjs`, never write `$$` yourself.

## Accepted shapes

```
BAD : Chain: $A$, or in Leibniz form $B$. Everything else …
GOOD: Chain: $A$. In Leibniz form: $B$. Everything else …

BAD : The second derivative is **not** $X$; it is $Y$. This is …
GOOD: The second derivative is **not** $X$. The correct expression is: $Y$. This is …

BAD : … the photon energy in eV·µm: $E = 1.24/\lambda$ eV, so …
GOOD: … In electronvolts the photon energy is: $E = 1.24/\lambda$, so …
```

## Hard rules

- Edit **only** `concept[]` strings of payloads in your area. Nothing else — not notes, not
  `derive`/`traps`/`problems`/`calc`, not `formula-layout.mjs`.
- **Never change the mathematics, a symbol, or a number.** Prose and punctuation only.
- Keep single `$`. Do not author `$$`.
- The transform strips **one** stranded `.` `,` `;` `:` right after a display block — end the
  equation's source sentence with a period.
- A **unit must never open the line** after a display block ("`$$EQ$$\neV, so …`"). Move it into the
  lead-in or inside the equation.
- **Only one formula per sentence hoists.** For a list, give each member its own lead-in, or write
  `The equations are: $A$; $B$; $C$.` — a `;` starts a clause.
- A bold lead-in ending in `**` (`**The formula.** $…$`) leaves `*` as the preceding character, so
  the formula does **not** hoist. It needs a real lead-in clause.
- Do not replace a period with an em dash, and do not leave a `,` directly before a formula — both
  push the site *back* into residual state.
- If you find a mathematical or factual error, **report it, do not fix it.**

## Commands

```bash
node build/show-sites.mjs --area "<Part/Area>"            # every site, decoded, ready to patch
node build/show-sites.mjs --area "<Part/Area>" --limit 6  # in slices, if the output is long

node build/apply-rewrites.mjs --report build/rewrite-patches/<Area>.json   # dry run, writes nothing
node build/apply-rewrites.mjs --apply  build/rewrite-patches/<Area>.json   # writes

node build/show-sites.mjs --area "<Part/Area>"            # must now print CLEAN
node build/build-notes.mjs --validate                     # must print: validated 408 payload(s)
```

- `--report` first, **always**. It reports drift, ambiguity and lint warnings.
- Re-run the audit after every batch. A rewrite can fix one site and break a neighbouring one.
- Do **not** run `verify.mjs`, `build-notes.mjs` (except `--validate`), `apply-calc-patches.mjs`, or
  the full `audit-concept-formulas.mjs` — other workers are active and those write shared files.

## Patch format

`show-sites.mjs` prints each site as `file`, `entry` (1-based `concept[]` index) and a decoded
`find` window. Copy that window into a patch file. **Write decoded prose — one backslash for LaTeX.**

```json
{
  "area": "02_Electronics_Engineering/04_Semiconductor_Devices",
  "rewrites": [
    {
      "file": "build/payload/02_Electronics_Engineering/04_Semiconductor_Devices/01_Intrinsic,_Extrinsic_and_Carrier_Transport.json",
      "entry": 1,
      "find": "At 300 K silicon has $n_i = 1.5\\times10^{10}\\ \\mathrm{cm^{-3}}$ and germanium",
      "replace": "At 300 K the silicon value is: $n_i = 1.5\\times10^{10}\\ \\mathrm{cm^{-3}}$. Germanium"
    }
  ]
}
```

The patch file is JSON, so its **raw** text doubles backslashes exactly like a payload
(`\\times`). That is the only place doubling applies — the applier un-doubles before matching and
re-doubles when it writes, and it rejects a raw `\f`/`\n` that would silently become a control
character. `find` must occur **exactly once** inside that `entry`; extend it if the applier reports
AMBIG.

## Report contract

Write your notes to `build/reports/spacing-<Area>.md` and keep the chat reply to **at most 8 lines**:

```
AREA <Part/Area>: <n> sites fixed, <n> remaining
APPLIED: build/rewrite-patches/<Area>.json
AUDIT:   node build/show-sites.mjs --area "<Area>" -> CLEAN
VALIDATE: validated 408 payload(s)
CONTENT:  <file> entry <n> — <one-line claim, or "none">
BLOCKED:  <one line, or "none">
```

No diffs, no payload dumps, no restating this brief. The file on disk is the deliverable.
