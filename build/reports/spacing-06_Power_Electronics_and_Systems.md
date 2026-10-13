# Spacing fix — 02_Electronics_Engineering/06_Power_Electronics_and_Systems

**Result: 12/12 sites fixed, 0 remaining. Area CLEAN. `validated 408 payload(s)`.**

Patch ledger: `build/rewrite-patches/06_Power_Electronics_and_Systems.json` (11 rewrites; 10 for the
12 residual sites, 1 follow-up prose refinement).
All edits are `concept[]` strings reached only through `apply-rewrites.mjs`; prose and punctuation
only, no mathematics, symbol, number or unit changed (the applier's ordered-formula guard passed on
every rewrite).

## Sites fixed

| # | payload | entry | equation | rewrite |
|---|---------|-------|----------|---------|
| 1 | 02_Thermal_Resistance_and_Heat_Sinking | 2 | `\theta_{JA}=\theta_{JC}+\theta_{CS}+\theta_{SA}` | "…with `$…$`, solve for the sink…" → sentence break + `three series pieces:` lead-in |
| 2 | 02_Thermal_Resistance_and_Heat_Sinking | 2 | `T_j=T_a+P_D(\theta_{JC}+\theta_{CS}+\theta_{SA})` | "…series drops, `$…$`." → "…other exam question. Given the sink, find `$T_j$` … series drops: `$…$`." |
| 3 | 02_Thermal_Resistance_and_Heat_Sinking | 3 | `P_{D(max)}=\dfrac{T_{j(max)}-T_C}{\theta_{JC}}` | em-dash frame → "The line is the reciprocal of `$\theta_{JC}$`, so the maximum power is: `$…$`." |
| 4 | 03_SCR_Phase-Controlled_Rectifiers | 2 | `V_{rms}=V_m\sqrt{\tfrac{1}{2\pi}(\pi-\alpha+\tfrac{\sin 2\alpha}{2})}` | "must use the RMS expressions `$A$` for half-wave…" → "…not the average. For half-wave: `$A$`. For the bridge: `$B$`." |
| 5 | 03_SCR_Phase-Controlled_Rectifiers | 2 | `V_m\sqrt{\tfrac{1}{\pi}(\pi-\alpha+\tfrac{\sin2\alpha}{2})}` | same combined rewrite (both sites in one `find`) |
| 6 | 04_Buck_Converter | 2 | `\Delta I_L=\dfrac{(V_{in}-V_o)D}{Lf_s}=\dfrac{V_o(1-D)}{Lf_s}` | "…for a time `$DT_s$`, giving `$…$` — the two forms…" → "…`$DT_s$`. The ripple current is therefore: `$…$`. The two forms…" |
| 7 | 05_Boost_Converter | 3 | `\Delta V_o=\dfrac{I_oDT_s}{C}=\dfrac{V_oD}{RCf_s}` | "…gives `$\Delta Q$` and therefore `$…$`, i.e. …" → "…gives `$\Delta Q$`, and therefore the voltage ripple is: `$…$`. In fractional form: …" |
| 8 | 07_Inverters_Half-Bridge_and_Full-Bridge | 4 | `V_{LL,rms} = \sqrt{2/3}\,V_{dc} = 0.8165V_{dc}` | "…waveform with `$…$` and a fundamental rms of…" → "…waveform. Its line-to-line rms is: `$…$`. Its fundamental rms is…" |
| 9 | 08_PWM_Techniques | 1 | `D(t) = \tfrac{1}{2}\left[1 + m_a\sin\omega_m t\right]` | "…comparison has `$…$`, so the switching-cycle average…" → "…has a duty that varies: `$…$`. The switching-cycle average therefore…" |
| 10 | 09_Linear_Voltage_Regulators | 3 | `P_D = (V_{in} - V_o)I_o + V_{in}I_Q \approx (V_{in} - V_o)I_o` | "…dissipation is `$…$`, and the efficiency is…" → "…dissipation is: `$…$`. The efficiency is…" |
| 11 | 09_Linear_Voltage_Regulators | 3 | `\theta_{JA} \approx 65\ ^\circ\mathrm{C/W}` | "A bare TO-220 has `$…$`, so 7 W would…" → "For a bare TO-220 the thermal resistance is: `$…$`. So 7 W would…" |
| 12 | 09_Linear_Voltage_Regulators | 4 | `0.01\%\times12\ \mathrm{V}\times3\ \mathrm{V} = 3.6\ \mathrm{mV}` | "…shifts only `$…$` for a 3 V input change on a 12 V output." → "…so for a 3 V input change on a 12 V output a 0.01%/V part shifts only: `$…$`." |

Two `concept[]` entries each held two sites (thermal entry 2; SCR entry 2; linear entry 3) and were
fixed with a single combined `find`/`replace` spanning both, so the windows cannot overlap.

## Follow-up (prose refinement, `residual 0 -> 0`)

The in-memory render check (`hoistInlineFormulas` on every rewritten entry) found one pre-existing
strand: in `05_Boost_Converter` entry 3 an em dash opened the line after a display block —
`$$\frac{\Delta V_o}{V_o}=\frac{D}{RCf_s}$$\n— the ripple *fraction* contains $D$…`. Rewrite 11
turns it into `…$. This ripple *fraction* contains $D$, unlike…`, so no punctuation opens the
continuation line.

After that, every intended equation in all nine rewritten entries lands on its own `$$` line with a
readable, capitalised or self-contained lead-in and no unit or punctuation stranded below it.

## Commands run

```
node build/show-sites.mjs --area "02_Electronics_Engineering/06_Power_Electronics_and_Systems"   # 12 sites in 9 payloads
node build/apply-rewrites.mjs --report build/rewrite-patches/06_Power_Electronics_and_Systems.json
node build/apply-rewrites.mjs --apply  build/rewrite-patches/06_Power_Electronics_and_Systems.json
node build/show-sites.mjs --area "02_Electronics_Engineering/06_Power_Electronics_and_Systems"   # CLEAN, 0 sites
node build/build-notes.mjs --validate                                                           # validated 408 payload(s)
```

Report run 1: 10 OK, 0 drift/ambiguous/errors. Report run 2 (ledger re-run): 10 already-applied
no-ops + 1 OK (0 -> 0), 0 drift/ambiguous/errors.

## Content claims

None. No mathematical or factual error was found in the twelve sites or in the surrounding prose;
the only wording judgement calls were punctuation-level and are listed above. (Checked in passing:
the derating sentence in `02_Thermal_Resistance_and_Heat_Sinking` entry 3, "the line is the
reciprocal of `$\theta_{JC}$`", is consistent with the slope of
`$P_{D(max)}=(T_{j(max)}-T_C)/\theta_{JC}$`, whose magnitude is `$1/\theta_{JC}$` per °C — loose
wording at worst, not an error, and untouched.)

## Blocked

None.
