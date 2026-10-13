# Spacing report — 01_Mathematics/02_Integral_Calculus

Status: **CLEAN** — 0 residual sites remaining (16 audited, 16 fixed, 0 skipped).

## Commands run (in order)

```
node build/show-sites.mjs --area "01_Mathematics/02_Integral_Calculus"     # 16 sites, 15 payloads
node build/apply-rewrites.mjs --report build/rewrite-patches/02_Integral_Calculus.json
node build/apply-rewrites.mjs --apply  build/rewrite-patches/02_Integral_Calculus.json
node build/apply-rewrites.mjs --report build/rewrite-patches/02_Integral_Calculus.json   # 15 DONE, 2 OK
node build/apply-rewrites.mjs --apply  build/rewrite-patches/02_Integral_Calculus.json
node build/show-sites.mjs --area "01_Mathematics/02_Integral_Calculus"     # CLEAN
node build/build-notes.mjs --validate                                     # validated 408 payload(s)
```

Ledger `build/rewrite-patches/02_Integral_Calculus.json` holds 17 rewrites: the 15 that cleared the
16 residual sites, plus 2 follow-up prose fixes (items 16–17) found by render-checking the hoisted
result. Both follow-ups report `residual 0 -> 0` by design — they repair a duplicated subject and a
lowercase sentence opener left after the hoist, they do not clear new sites.

## Shape of every fix

Each site was a substantial inline `$…$` buried mid-sentence. In every case the rewrite adds or
converts a lead-in clause ending in `:` (or restores the verb "is" before an existing clause break),
so `formula-layout.mjs` can hoist the equation onto its own `$$` line. No formula body, symbol,
number or unit was altered; no `$$` was authored; the transform's own strand-stripping removes the
`.`/`,`/`;` left behind by the display block.

## Site-by-site

| # | file (payload, `01_Mathematics/02_Integral_Calculus/`) | entry | lead-in added |
|---|------|-------|----------------|
| 1 | `01_Antiderivatives_and_Standard_Forms.json` | 4 | `**Linearity lets you split.** In symbols:` (bold lead-in ends in `*`, which cannot hoist) |
| 2 | `05_Trigonometric_Integrals_and_Substitution.json` | 5 | `…identities, for example:` + new sentence `This converts the product…` |
| 3 | `07_Improper_Integrals.json` | 2 | `**The definition, and why the limit matters.** In symbols:` |
| 4 | `08_Average_Value_and_MVT_for_Integrals.json` | 1 | `the average value is:` |
| 5 | `09_Plane_Areas_Cartesian.json` | 3 | `integrate $…$` → `the area is: $…$` |
| 6 | `10_Plane_Areas_Polar.json` | 1 | `…to $\theta=\beta$ is:` (item 16 fixed the duplicated subject) |
| 7 | `10_Plane_Areas_Polar.json` | 2 | `The formula is:`; item 17 replaced the stranded `, where…` with `The outer curve…` |
| 8 | `12_Volumes_by_Cylindrical_Shells.json` | 2 | `**The shell formula.** In symbols:` |
| 9 | `13_Arc_Length_and_Surface_Area.json` | 1 | `By Pythagoras its length is:` |
| 10 | `13_Arc_Length_and_Surface_Area.json` | 1 | `Summing over the curve gives the arc length:` |
| 11 | `13_Arc_Length_and_Surface_Area.json` | 2 | `…given as $x = g(y)$, the arc length is:` |
| 12 | `13_Arc_Length_and_Surface_Area.json` | 2 | `the arc length is:`; stranded em dash before `note the $r^2$ term` became a sentence break |
| 13 | `13_Arc_Length_and_Surface_Area.json` | 2 | `For parametric curves the arc length is:` |
| 14 | `13_Arc_Length_and_Surface_Area.json` | 4 | `So about the $x$-axis:` (the old `;` strand became a sentence break) |
| 15 | `14_Centroids_and_Pappus-Guldinus.json` | 2 | `With vertical strips the area element is:` |
| 16 | `14_Centroids_and_Pappus-Guldinus.json` | 2 | `The strip's own centroid is at the height:` (same rewrite as 15) |

## Verification

- `show-sites.mjs --area "01_Mathematics/02_Integral_Calculus"` → `0 site(s) in 15 payload(s)`, `CLEAN`.
- `build-notes.mjs --validate` → `validated 408 payload(s)`.
- Independent render check: `hoistInlineFormulas()` applied to all 12 rewritten `concept[]` entries;
  every equation lands on its own `$$` line, every stranded `.`/`,`/`;` is absorbed, no unit opens a
  line, and every entry's `$` count is even (no unpaired delimiter).

## Content findings

None. Every formula in the touched entries is mathematically correct as written
(linearity, product-to-sums, improper-integral definition, average value, `dy`-integration of plane
area, polar area and polar annulus, shell volume, arc length in `x`, `y`, polar and parametric form,
surface of revolution, and the strip centroid `y = (y_top + y_bot)/2`). No error was found, so none
was "fixed".

## Scope / untouched

Only `concept[]` strings of the 10 named payloads under `01_Mathematics/02_Integral_Calculus` were
changed, and only through the patch ledger plus `apply-rewrites.mjs`. No note, no
`derive`/`traps`/`problems`/`calc` field, no `formula-layout.mjs`, no other area.
