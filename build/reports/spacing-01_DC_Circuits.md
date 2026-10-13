# Spacing report — 02_Electronics_Engineering/01_DC_Circuits

Status: **CLEAN** — 13 residual 40+ char inline-formula sites fixed, 0 remaining.
Payloads validated: `validated 408 payload(s)`.

Patch ledger: `build/rewrite-patches/01_DC_Circuits.json` (15 rewrites, 6 payloads, all `concept[]` only).

## Sites fixed

| # | Payload | entry | Site formula | Lead-in used |
|---|---------|-------|--------------|--------------|
| 1 | `02_KCL,_KVL,_Series_and_Parallel_Reduction` | 1 | `\sum i_{\mathrm{in}} = \sum i_{\mathrm{out}}` | `At any node,` -> `At any node:` |
| 2 | `03_Delta-Wye_Transformations` | 2 | `R_a = \frac{R_{ab}R_{ca}}{R_{ab}+R_{bc}+R_{ca}}` | `resistors, so` -> `resistors. The result is:` (trailing `with` -> `, with`) |
| 3 | `03_Delta-Wye_Transformations` | 2 | `R_{ab} = \frac{R_aR_b+R_bR_c+R_cR_a}{R_c}` | `*opposite* it,` -> `*opposite* it. The result is:` |
| 4 | `03_Delta-Wye_Transformations` | 3 | `R_a + R_b = R_{ab} \parallel (R_{bc}+R_{ca})` | `self-check, since the equivalence guarantees` -> `self-check. The equivalence guarantees:` |
| 5 | `04_Mesh_Analysis_and_Supermesh` | 2 | `R_{kk} i_k - \sum_{j\neq k} R_{kj} i_j = \sum v_k` | `standard form` -> `standard form.` |
| 6 | `05_Nodal_Analysis_and_Supernodes` | 2 | `G_{aa}v_a - \sum_{b\neq a} G_{ab}v_b = I_a` | `standard form` -> `standard form.` |
| 7 | `11_First_Order_RC_and_RL_Transients` | 1 | `x(t) = x(\infty) + \left[x(0^+) - x(\infty)\right]e^{-t/\tau}` | `circuit obeys` -> `circuit obeys this law:` |
| 8 | `11_First_Order_RC_and_RL_Transients` | 4 | `x(t) = x(\infty)\left(1 - e^{-t/\tau}\right)` | `giving` -> `The result is:` |
| 9 | `11_First_Order_RC_and_RL_Transients` | 4 | `x(t) = x(0^+)e^{-t/\tau}` | `$x(\infty) = 0$, giving` -> `$x(\infty) = 0$. The result is:` |
| 10 | `11_First_Order_RC_and_RL_Transients` | 4 | `t = \tau\ln\!\left[\dfrac{\cdot}{\cdot}\right]` (time inversion) | `To invert for time, use` -> `To invert for time:` |
| 11 | `12_Second_Order_RLC_Natural_Response` | 1 | `L\dfrac{di}{dt} + Ri + \dfrac{1}{C}\int i\,dt = 0` | `loop gives` -> `loop gives:` |
| 12 | `12_Second_Order_RLC_Natural_Response` | 1 | `\dfrac{d^2i}{dt^2} + \dfrac{R}{L}\dfrac{di}{dt} + \dfrac{1}{LC}i = 0` | `once yields` -> `once yields:` |
| 13 | `12_Second_Order_RLC_Natural_Response` | 3 | `s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}` | `The roots are` -> `The roots are:` |
| 14 | `12_Second_Order_RLC_Natural_Response` | 5 | `L\,di/dt\big|_{0^+} = -v_C(0^+) - Ri(0^+)` | `$i_L(0^+)$): for a series loop,` -> `$i_L(0^+)$); for a series loop:` |

Rewrites 2/3/8/9/11/12 are paired sites inside a single entry; each pair was applied in
order against the in-memory state, so the second `find` matched the text left by the first.

## Extra prose-only rewrite (not a residual site)

| Payload | entry | Change |
|---------|-------|--------|
| `11_First_Order_RC_and_RL_Transients` | 4 | `with $x(0^+) = 0$, The result is:` -> `with $x(0^+) = 0$. The result is:` |

Rationale: rewrite 8 replaced the clause-opener `giving` with a capitalised `The result is:`,
which stranded a comma-capital join. Joining it with a period is punctuation only — the ordered
formula list of the entry is unchanged, so the applier's mathematics guard passes. The ledger
entry is rewrite 15; its `find` is the *output* of rewrite 8, so it reports `DONE` on a fresh
run of an already-applied patch (the patch is a ledger, re-runnable).

## Verification performed

- `apply-rewrites.mjs --report` first, then `--apply`: 0 drift, 0 ambiguous, 0 errors.
- Re-ran the whole patch: `ok: 0, already applied: 15` — the expected idempotent result.
- `show-sites.mjs --area "02_Electronics_Engineering/01_DC_Circuits"` -> `CLEAN`, 0 sites.
- `build-notes.mjs --validate` -> `validated 408 payload(s)`.
- Every edited entry was re-rendered through `hoistInlineFormulas` to confirm each equation
  lands on its own `$$` line and the surrounding prose still reads as complete sentences.
- Applier's math guard passed on every rewrite: for each touched entry the ordered list of
  `$...$` bodies is byte-identical before and after.

## Mathematics / content notes

No mathematical, symbolic, numeric or unit change was made anywhere. Every edit is punctuation
or connective prose inside `concept[]`. No site was skipped as unfixable.

No mathematical or factual error was found in the touched entries, so nothing was reported
under the "report it, do not fix it" rule.
