# Spacing fix report — 04_EST/01_Signals_Spectra_and_Noise

Status: DONE. 14 residual sites fixed, 0 remaining. Area CLEAN, 408 payloads validate.

## Method

Followed `build/WORKER_BRIEF_spacing.md`: `show-sites.mjs --area` for the site list,
rewrites authored decoded in `build/rewrite-patches/01_Signals_Spectra_and_Noise.json`,
dry-run with `--report` first, then `--apply`. Payloads touched only through the applier.

Prose/punctuation only. No symbol, number, unit, or relation was changed; the math in every
rewrite is byte-identical to the original. Each fix ends the lead-in clause (`:` or `.`) so the
equation begins a clause and `hoistInlineFormulas` can lift it; no `$$` was authored.

## Sites fixed (13 rewrites, 14 sites)

| # | payload (concept entry) | lead-in used |
|---|--------------------------|--------------|
| 1 | 02_Power_Spectral_Density [3] | `…autocorrelation function:` |
| 2 | 04_Shot,_Flicker_and_Transit-Time_Noise [5] | `…at room temperature, whose noise density is:` |
| 3 | 05_SNR,_Noise_Factor_and_Noise_Figure [1] | `In decibels the definition is:` |
| 4 | 05_SNR,_Noise_Factor_and_Noise_Figure [3] | `…cancels out of the definition. What remains is:` |
| 5 | 05_SNR,_Noise_Factor_and_Noise_Figure [6] | `…overall noise factor is:` (+ trailing `, where …` stripped by transform) |
| 6 | 06_Equivalent_Noise_Temperature [4] | `…identical in temperature:` |
| 7 | 07_Friis_Cascaded_Noise_Formula [1] | `For stages in cascade the overall noise factor is:` |
| 8 | 08_Sampling_Theorem_and_Aliasing [1] | `…sinc-interpolation formula:` |
| 9 | 09_Sampling_Types_and_Aperture_Effect [4] | `…the jitter-limited SNR is:` (em-dash clause recast as a sentence) |
| 10 | 10_Anti-Aliasing_Filters [3] | `The order follows from:` |
| 11 | 11_DFT_and_FFT [1] | `…returns N complex bins:` |
| 12+13 | 12_FIR_vs_IIR_Filters [1] | `An IIR filter adds feedback:` and `The resulting transfer function is:` (both hoist) |
| 14 | 12_FIR_vs_IIR_Filters [6] | `…transformed by the bilinear transform:` |

Rewrite 12 is a single patch entry covering two adjacent sites in one sentence; the applier
reported `residual 2 -> 0` for it. Every other rewrite reported `residual 1 -> 0`.

## Verification

```
node build/apply-rewrites.mjs --report …   ok: 13  already: 0  drift/ambiguous: 0  errors: 0
node build/apply-rewrites.mjs --apply  …   10 payload(s) written
node build/show-sites.mjs --area "04_EST/01_Signals_Spectra_and_Noise"
    AREA 04_EST/01_Signals_Spectra_and_Noise: 0 site(s) in 12 payload(s)   CLEAN
node build/build-notes.mjs --validate
    validated 408 payload(s)
```

Post-apply, the hoisted render of all 13 edited entries was previewed in memory via
`hoistInlineFormulas` (no files written) to confirm each equation lands on its own line with a
complete clause on either side and no stranded fragment. All read correctly.

## Content findings

None. No mathematical or factual error was found in the rewritten spans, so nothing was reported
for a second opinion and nothing was skipped for that reason.
