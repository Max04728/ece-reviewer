# Spacing report — 03_GEAS/03_Materials_Science

## Result

- `node build/show-sites.mjs --area "03_GEAS/03_Materials_Science"` -> **1 site remaining** (was 13)
- `node build/build-notes.mjs --validate` -> `validated 408 payload(s)`
- Patch ledger: `build/rewrite-patches/03_Materials_Science.json` (11 rewrites, 10 sites fully cleared)

## Sites fixed (10)

| # | Payload | entry | What changed |
| --- | --- | --- | --- |
| 1 | `02_Atomic_Packing_Factor_and_Density.json` | 1 | Bold lead-in `**APF is a ratio…**` left `*` before the formula, so it could not hoist. Added a real lead-in clause: `The volume fraction the atoms occupy is: $…APF…$` |
| 2 | `03_Miller_Indices.json` | 4 | `…angle between two planes, $cosθ…$` -> lead-in clause ending `:` |
| 3 | `05_Stress,_Strain_and_Mechanical_Properties.json` | 4 | Two sites in one sentence (`EL`, `RA`). Split into `The percent elongation is: $…$` and `The percent reduction in area is: $…$` |
| 4 | `05_Stress,_Strain_and_Mechanical_Properties.json` | 5 | `…in the elastic range, $u_r…$ — the triangle…` -> `…in the elastic range: $u_r…$. It is the triangle…` (em dash after a formula replaced with a sentence break, per the brief's "do not replace a period with an em dash" rule) |
| 5 | `07_Energy_Bands_and_Classification.json` | 3 | `For silicon at 300 K, $n_i…$ — one carrier…` -> `For silicon at 300 K the intrinsic concentration is: $n_i…$. That is one carrier…` |
| 6 | `08_Fermi_Level.json` | 2 | `…density of states gives $E_F…$.` -> `…gives the free-electron result. The Fermi energy is: $E_F…$.` |
| 7 | `08_Fermi_Level.json` | 3 | `The exact expression is $E_F…$; the second term…` -> `The exact expression comes from charge neutrality. $E_F…$. The second term…` (follow-up; see below) |
| 8 | `09_Dielectric_Properties_and_Breakdown.json` | 2 | Two sites. `…permittivity is $ε…$ with $ε_0…$.` -> `…permittivity is: $ε…$. The free-space value is: $ε_0…$.` |
| 9 | `09_Dielectric_Properties_and_Breakdown.json` | 3 | `The loss tangent $tanδ…$ is the ratio…` -> `The loss tangent is the ratio…: $tanδ…$.` |
| 10 | `10_Magnetic_Properties_and_Hysteresis.json` | 5 | `…happens near $B_s…$ corresponding to $M_s…$.` -> `…near $B_s…$, a saturation magnetisation of: $M_s…$.` Also `atomic data: iron has` -> `atomic data. Iron has` (colon directly before a formula would have created a new residual site) |

Every rewrite kept its entry's ordered list of `$…$` formulas byte-identical; the applier's
mathematics guard passed on all 11 (`errors: 0`, `drift/ambiguous: 0`).

## Two things worth recording

1. **A rewrite can strand a clause even when the applier is happy.** The brief's prosaic-math
   guard does not check layout, so after the first apply I ran an in-memory render check
   (`hoistInlineFormulas`, no files written). Entry 3 of `08_Fermi_Level.json` came back as
   `…$$E_F…$$\nthe second term is the reason…` — a lowercase clause opening the line after a
   display block. The applier had also dropped the `;` and left the paragraph ungrammatical.
   Fixed with a second rewrite (`The exact expression comes from charge neutrality. …`), which
   legitimately reported `residual 0 -> 0`.
2. **The applier refuses a prose-only `find`** (`find contains no $ — is this really a formula
   rewrite?`). A layout-neutral prose tweak must therefore be bundled into a neighbouring rewrite
   window that does contain a formula, which is how the `atomic data:` -> `atomic data.` change
   was delivered above.

## Remaining site (1) — reported, not "fixed"

`10_Magnetic_Properties_and_Hysteresis.json` entry 5:

```
…a density of $8.49\times10^{28}$ atoms per $\mathrm{m^3}$, so $M_s = 2.22\mu_B \times 8.49\times10^{28} = 1.75\times10^{6}\ \mathrm{A/m}$ and $\mu_0M_s = 2.2\ \mathrm{T}$.
```

The blocked formula is 73 characters and sits after `so`, so it is a residual site. Hoisting it
requires a clause break before it, but **any** break strands the trailing `and $\mu_0M_s = 2.2\ \mathrm{T}$`
as the opening of the next line — confirmed by render-checking four different lead-in wordings,
all of which produce `$$M_s = 2.22\mu_B \times …$$\nand $\mu_0M_s = 2.2\ \mathrm{T}$.` The only way
to avoid that is to split the two results of the single check (`M_s` and `μ0M_s`) into separate
sentences, which would change the mathematics (the applier's guard exists to forbid exactly that).
Left inline deliberately and reported rather than mangled. **No mathematics, symbol, number or
unit was altered anywhere in this area.**

## Pre-existing issue observed (not introduced here, not touched)

In `03_Miller_Indices.json` entry 4 the equation `$d_{111} = a/\sqrt{3}$` was already mid-sentence
in the source prose (`Higher indices mean closer planes, $d_{111} = a/\sqrt{3}$ is larger than …`),
so the renderer hoists the equation and leaves `is larger than $d_{210} = a/\sqrt{5}$.` opening the
following line. This is caused by the same clause-start rule the brief mandates: the equation starts
a clause (`,` is not a clause end in the source, so it does not hoist today — but the note's own
`$d_{111} = a/\sqrt{3}$ is larger than` reads the same either way). Fixing it properly needs a lead-in
of the form `The $d_{111}$ spacing is larger than …`, which would clear a *different* residual site
(the long `$d_{hkl} = a/\sqrt{h^2+k^2+l^2}$` context) and is out of scope for this pass; flagging it
so the owner can decide. My rewrite to this entry (site 2 above) did not create it.

## Verification commands run

```
node build/show-sites.mjs --area "03_GEAS/03_Materials_Science"   # 13 -> 1
node build/apply-rewrites.mjs --report build/rewrite-patches/03_Materials_Science.json
node build/apply-rewrites.mjs --apply  build/rewrite-patches/03_Materials_Science.json
node build/build-notes.mjs --validate                             # validated 408 payload(s)
```
