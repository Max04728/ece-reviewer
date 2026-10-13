# Spacing report — 02_Electronics_Engineering/07_Industrial_Automation_and_Sensors

**Result: 16 sites fixed, 0 remaining. Area CLEAN. `validated 408 payload(s)`.**

## What was done

`show-sites.mjs --area` reported 16 residual sites (inline `$…$` ≥ 40 chars carrying an operator,
sitting mid-sentence so the renderer cannot hoist it). Because `concept[]` prose is authored per
entry, the 16 sites resolved into **13 patch edits across 11 payloads** — three entries held two
sites each and needed a single combined edit so the two `find` windows could not overlap:

| entry with 2 sites | sites |
| --- | --- |
| `05_Comparators_and_Schmitt_Triggers.json` entry 3 | `V_UT`, `V_LT` |
| `09_Temperature_Sensors.json` entry 1 | `\alpha`, `\alpha R_0` |
| `10_Strain_Gauges_and_Wheatstone_Bridge.json` entry 2 | bridge output, quarter-bridge output |

Every fix is prose/punctuation only. The recipe used was to give each equation a real lead-in
clause ending in `:` (or to start a fresh sentence), never to touch the maths. Typical edits:

- `Superposition gives the exact result $V_o = …$` → `… the exact result: $V_o = …$`
- `so the two thresholds are $V_{UT} = …$ and $V_{LT} = …$` →
  `The two thresholds are: $V_{UT} = …$; $V_{LT} = …$` (the `;` gives the second member its own clause)
- `, so $f_0 = …$ and $Q = …$` → `. The two design equations are: $f_0 = …$; $Q = …$`
- `— $Q = (\mathrm{Start}+Q)\overline{\mathrm{Stop}}$ — and an interlock` →
  `. The seal-in logic is: $Q = …$. An interlock`

Two sites turned out not to need a hoist, only a clause break so the audit stops flagging them,
and both were kept **inline** because hoisting a 41–49 char relation behind a generic lead-in read
worse than leaving it in the sentence:

- `09_Temperature_Sensors.json` entry 1 — `$\alpha = 0.00385\ \mathrm{\Omega/\Omega/^\circ C}$`
  stays inline after `the temperature coefficient:`, with the companion
  `$\alpha R_0 = 0.385\ \mathrm{\Omega/^\circ C}$` after `and the sensitivity that follows:`.
- `10_Strain_Gauges_and_Wheatstone_Bridge.json` entry 1 — `$350 \times 2 \times 0.001 = 0.7\ \mathrm{\Omega}$`
  stays inline; the trailing `, which is why` became `; that is why`. A display block here would
  have left the bare unit `/°C`-style continuation or a two-word line on its own.

## Verification performed

- `apply-rewrites.mjs --report` (dry run) → **13 OK, 0 drift, 0 ambiguous, 0 errors**; every edit
  reported `residual 1→0` or `2→0`. Only then `--apply`.
- `show-sites.mjs --area "…/07_Industrial_Automation_and_Sensors"` → `0 site(s) in 16 payload(s)` / **CLEAN**.
- `build-notes.mjs --validate` → **`validated 408 payload(s)`**.
- Independent integrity check (scratch script, since removed): all 20 mathematical blocks touched
  by these entries are **byte-identical** to before the patch, and no edited entry contains `$$`.
  No symbol, number or unit was changed.

## Content notes

No mathematical or factual error was found; nothing needed skipping.
The only substantive content claim is a **formatting observation, not a correction**:
in `10_Strain_Gauges_and_Wheatstone_Bridge.json` entry 2 the general bridge output and the
quarter-bridge approximation were previously in one sentence, so only the first could ever hoist.
They are now two clauses, which is purely presentational — both formulas are unchanged.

## Deliverables

- Patch: `build/rewrite-patches/07_Industrial_Automation_and_Sensors.json` (13 rewrites)
- Payloads written: 11, all under `02_Electronics_Engineering/07_Industrial_Automation_and_Sensors`
