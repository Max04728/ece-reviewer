# Spacing report — 03_GEAS/01_General_Chemistry

## Result

- `node build/show-sites.mjs --area "03_GEAS/01_General_Chemistry"` → **CLEAN, 0 sites** (was 14).
- `node build/build-notes.mjs --validate` → **validated 408 payload(s)**.
- `node build/apply-rewrites.mjs --report/--apply build/rewrite-patches/01_General_Chemistry.json`
  → 0 drift, 0 ambiguous, 0 errors. 8 payloads written, one rewrite at a time.

Sites fixed: **14**. Remaining: **0**. No site was skipped and no mathematics, symbol, number or
unit was changed — every edit is a lead-in clause (prose) plus punctuation.

## Sequence

1. First pass: 13 rewrites applied. 02_Electronics_Engineering/04_Semiconductor_Devices was the
   one-note trial that settled the recipe; this area is the first full-area application.
2. The pass fixed one site and pushed a neighbour back into residual state, exactly as the brief
   warns: **04_Mole_Concept_and_Stoichiometry concept[2]**'s
   `$\mathrm{g} \div (\mathrm{g/mol}) = \mathrm{mol}$` had been hidden behind the site that was
   removed ahead of it in the same paragraph. Fixed in a second pass.
3. A third, prose-only pass polished four lead-ins that hoisted correctly but read poorly
   ("It is:", "Equivalently is:", a stranded `, before comparing`). Residual counts were already 0;
   these edits changed style only.
4. Final full re-audit after the last write: CLEAN, and the whole vault revalidates.

## What each site needed

| payload | entry | shape of the fix |
| --- | --- | --- |
| 01_Atomic_Structure_and_Configurations | 2 | split the `because` clause; `— the bridge is: $…$.` |
| 01_Atomic_Structure_and_Configurations | 5 | `Convert … with $…$ before` → `… is: $…$. Compare` |
| 04_Mole_Concept_and_Stoichiometry | 2 | neighbour site in pass 2; `— the check is …` → `The unit check is: $…$` |
| 04_Mole_Concept_and_Stoichiometry | 4 | `with $n=…$` → `and the multiplier is: $n=…$` |
| 05_Limiting_Reagents_and_Yield | 1 | `in $…$, $5.00$ mol` → `the ammonia synthesis is: $…$, $5.00$ mol` |
| 06_Solutions_and_Concentration_Units | 2 | `a mass ratio, $…$;` → `a mass ratio. It is: $…$.` |
| 06_Solutions_and_Concentration_Units | 4 | `The single expression $…$ handles it` → `… that handles it is: $…$` |
| 07_Chemical_Equilibrium_and_Le_Chatelier | 2 | `and $R=…$ when` → `The gas constant here is: $R=…$ when` |
| 08_pH,_pOH_and_Buffers | 2 | `Write $K_a=…$, assume` → `Write the equilibrium expression as: $K_a=…$. Assume` |
| 08_pH,_pOH_and_Buffers | 4 | `Henderson-Hasselbalch, $…$, is the whole topic.` → `… is the whole topic: $…$.` |
| 09_Redox_and_Galvanic_Cells | 2 | two sites in one entry; both equations given their own lead-in |
| 09_Redox_and_Galvanic_Cells | 4 | `For $…$ the electron count is 5` → `The electron count comes from: $…$. Here the count is 5` |
| 10_Nernst_Equation_and_Faraday's_Laws | 2 | two sites; `For the cell reaction: $…$, the quotient is: $…$` |
| 10_Nernst_Equation_and_Faraday's_Laws | 5 | `Current efficiency is $…$, and` → `Current efficiency is: $…$, and` |

## Content notes (reported, not fixed)

- **None.** No mathematical or factual error was found in the touched prose. The Henderson-Hasselbalch
  form at `08_pH,_pOH_and_Buffers` concept[4] is the concentration-ratio form, which is exact for the
  stated `$K_a = [\mathrm{H^+}][\mathrm{A^-}]/[\mathrm{HA}]$` definition; no correction needed.

## Constraints observed

- Payloads edited only through `build/rewrite-patches/01_General_Chemistry.json` +
  `apply-rewrites.mjs`; no direct text-editor writes to any `.json` payload.
- Single `$` throughout; no `$$` authored. `concept[]` strings only — `derive`, `traps`, `problems`,
  `calc` and `formula-layout.mjs` untouched; notes never rendered.
- Only `show-sites.mjs --area` and `build-notes.mjs --validate` were run. No `verify.mjs`, no
  `apply-calc-patches.mjs`, no full audit, no other area touched.
