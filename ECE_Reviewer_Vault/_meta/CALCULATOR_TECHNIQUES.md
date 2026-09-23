---
title: CALCULATOR_TECHNIQUES
type: meta
updated: 2026-09-23
---

# CALCULATOR TECHNIQUES — Canon F-789SGA

Reference and **authoring contract** for the `calc` field on worked problems. Notes carry an
optional second solution path for problems that fall to the calculator; this file is the single
source for how those are written, so a batch of them reads the same way.

> All key sequences below were checked against the F-789SGA function reference. An earlier draft
> had two wrong: **STO is `SHIFT` `STO`** (not `SHIFT` `RCL` — `RCL` is *recall*, and takes no
> shift), and **SOLVE is `SHIFT` `SOLVE`** (not `SHIFT` `CALC`).

## 1. Verified key facts

| Purpose | Keys |
| --- | --- |
| Modes | `MODE` `1` COMP · `2` CPLX · `3` STAT · `4` BASE · `5` EQN · `6` TABLE · `7` MATX · `8` VCTR |
| Store a value | `SHIFT` `STO` then the variable |
| Recall a value | `RCL` then the variable (no shift) |
| Variables | `0–9`, `A`, `B`, `C`, `D`, `E`, `F`, `M`, `X`, `Y` (19 total) |
| Last answer | `Ans` |
| Equals sign *inside* an equation | `ALPHA` `=` |
| **Chain statements on one line** | `ALPHA` `:` — each `=` evaluates the next |
| Solve for `X` | type the equation, `SHIFT` `SOLVE`, give a guess, `=`; `L−R` shows the residual |
| Re-evaluate with prompts | `CALC` (prompts for `A`, `B`, `C`, `D`, `X`, `Y`) |
| Fraction ↔ decimal | `F-D` |
| Engineering notation | `ENG` |
| Numerical integral / derivative | `∫dx` / `SHIFT` `d/dx` |
| Summation / product | `Apps` → `Σ` / `Π` |
| Polar ↔ rectangular | `SHIFT` `Pol(` / `SHIFT` `Rec(` — results land in `X` and `Y` |
| Simultaneous / polynomial roots | `MODE` `5`: `1` 2-unknown, `2` 3-unknown, `3` 4-unknown; page 2: `1` quadratic, `2` cubic, `3` quartic |
| Complex helpers | `MODE` `2`, then `Apps`: `▶r∠θ`, `▶a+bi`, `Arg`, `Conj`, `Real`, `Imag` |
| Imaginary unit | `i` — a **labelled key** in `MODE` `2`. Confirmed by the calculator's owner; the function reference never names it, which is why early blocks hedged. Blocks may now use `i` directly. |
| Matrix inverse / determinant | `MODE` `7`, then `Apps`: `Inv`, `Det`, `Trn`, `Adj` |
| Statistics | `MODE` `3`, then `Apps`: `S-SUM`, `S-VAR`, `S-PTS`, `Distr` (normal `P(`, `Q(`, `R(`), `Reg` |
| Base-n and bitwise | `MODE` `4`; switch base with the `DEC` / `HEX` / `BIN` / `OCT` keys; `Apps` → `1` and, `2` or, **`3` xor**, `4` xnor, `5` Not, `6` Neg. Confirmed against the function reference — so parity XORs and CRC long division are fair game. |

## 2. Authoring rules for a `calc` block

```json
"calc": { "mode": "COMP", "steps": ["…", "…"], "note": "…" }
```

1. **Short.** Two or three numbered steps. The whole point is speed. Prefer ONE line chained
   with `ALPHA` `:` over a long list of separate evaluations.
2. **Show the expression, then the chain of answers** with `→`. The reader should be able to key
   it in without reading prose.
3. `mode` names the starting mode (`COMP`, `CPLX`, `EQN`, …). Omit `note` unless it prevents a
   real mistake — at most one short line.
4. **Verify the arithmetic against the note's own manual solution.** The calculator path must
   reach the same numbers; a technique that disagrees with the worked answer is worse than none.
5. **Only where it genuinely helps.** The field is per problem, so a problem with no shortcut
   simply has no `calc` — never pad one in.
6. Use the built-in **constants and conversions** below instead of typing values, and say which
   code you used (e.g. "`SHIFT` `CVALUE` 32 for $\varepsilon_0$").

## 3. Built-in scientific constants (`SHIFT` `CVALUE`, two-digit code)

**Marked ★ are the ones that matter for ECE board problems.**

| Code | Symbol | Quantity | | Code | Symbol | Quantity |
| --- | --- | --- | --- | --- | --- | --- |
| 01 ★ | $m_p$ | proton mass | | 41 | $R_K$ | von Klitzing constant |
| 02 ★ | $m_n$ | neutron mass | | 42 | $m_\tau$ | tau mass |
| 03 ★ | $m_e$ | electron mass | | 43 | $\mu_\tau$ | tau magnetic moment |
| 04 | $m_\mu$ | muon mass | | 44 | $\lambda_{c\tau}$ | tau Compton wavelength |
| 05 ★ | $a_0$ | Bohr radius | | 45 | $\gamma_e$ | electron gyromagnetic ratio |
| 06 ★ | $h$ | Planck constant | | 46 | $\gamma_n$ | neutron gyromagnetic ratio |
| 07 | $\mu_N$ | nuclear magneton | | 47 | $\gamma_\mu$ | muon gyromagnetic ratio |
| 08 | $\mu_B$ | Bohr magneton | | 48–50 | $\chi_{cp},\chi_{cn},\chi_{c\tau}$ | Compton $\lambda$ / $2\pi$ |
| 09 ★ | $\hbar$ | reduced Planck constant | | 51 | $c_3$ | Wien displacement constant |
| 10 | $\alpha$ | fine-structure constant | | 52–58 | $F^\ast, N_A^\ast, k^\ast, V_m^\ast, R^\ast, K_{J\text{-}90}, R_{K\text{-}90}$ | conventional values |
| 11 | $r_e$ | classical electron radius | | 59 | $m_\alpha$ | alpha particle mass |
| 12 | $\lambda_c$ | Compton wavelength | | 60 | $m_d$ | deuteron mass |
| 13 | $\gamma_p$ | proton gyromagnetic ratio | | 61 | $m_t$ | triton mass |
| 14–15 | $\lambda_{cp},\lambda_{cn}$ | proton / neutron Compton $\lambda$ | | 62 | $m_h$ | helion mass |
| 16 | $R_\infty$ | Rydberg constant | | 63–66 | $\mu_d,\mu_t,\mu_h,\mu_\alpha$ | magnetic moments |
| 17 ★ | $u$ | atomic mass unit | | 67–69 | $\gamma_d,\gamma_h,\gamma_t$ | gyromagnetic ratios |
| 18–21 | $\mu_p,\mu_e,\mu_n,\mu_\mu$ | magnetic moments | | 70–73 | $\lambda_{cd},\lambda_{ct},\lambda_{ch},\lambda_{c\alpha}$ | Compton wavelengths |
| 22 ★ | $F$ | Faraday constant | | 74–77 | $\chi_{cd},\chi_{ct},\chi_{ch},\chi_{c\alpha}$ | Compton $\lambda$ / $2\pi$ |
| 23 ★ | $e$ | elementary charge | | 78 | $d_{220}$ | silicon lattice spacing |
| 24 ★ | $N_A$ | Avogadro constant | | 79 ★ | atm | standard atmosphere |
| 25 ★ | $k$ | Boltzmann constant | | | | |
| 26 ★ | $V_m$ | molar volume of ideal gas | | | | |
| 27 ★ | $R$ | molar gas constant | | | | |
| 28 ★ | $c_0$ | speed of light in vacuum | | | | |
| 29–30 | $c_1,c_2$ | radiation constants | | | | |
| 31 ★ | $\sigma$ | Stefan-Boltzmann constant | | | | |
| 32 ★ | $\varepsilon_0$ | vacuum permittivity | | | | |
| 33 ★ | $\mu_0$ | vacuum permeability | | | | |
| 34 ★ | $\Phi_0$ | magnetic flux quantum | | | | |
| 35 ★ | $g$ | standard gravity | | | | |
| 36 ★ | $G$ | gravitational constant | | | | |
| 37 ★ | $Z_0$ | characteristic impedance of vacuum ($\approx 376.73\ \Omega$) | | | | |
| 38 ★ | $t$ | $0\ ^\circ\mathrm{C}$ in kelvin (273.15 K) | | | | |
| 39 | $G_0$ | conductance quantum | | | | |
| 40 | $K_J$ | Josephson constant | | | | |

Codes 41–78 are particle and solid-state physics; the ECE board does not use them.

## 4. Built-in metric conversions (`CONVT`, 8 categories)

| Category | Units, and the pairs worth knowing |
| --- | --- |
| Distance | fm, pm, nm, µm, mm, cm, m, km, in, ft, yd, mile, **n mile**, mil, pc, ly, AU — in↔cm, ft↔m, yd↔m, mile↔km, nmi↔m |
| Area | m², cm², mm², km², in², ft², yd², mile², **acre**, **ha** — acre↔m², ha↔m², in²↔cm², ft²↔m², mile²↔km² |
| Capacity | m³, cm³, L, mL, in³, ft³, yd³, gal(US), gal(UK), pt(US), pt(UK), fl oz(US), fl oz(UK), bbl — gal↔L, ft³↔m³, bbl↔m³ |
| Weight | mg, g, kg, t, oz, lb, ton(US), ton(UK), cwt, u — oz↔g, lb↔kg, ton↔kg, **u↔kg** |
| Temperature | °C↔°F, °C↔K, °F↔K, °R↔K |
| Energy / Power | J, kJ, cal, kcal, Btu, erg, kW·h, hp, W, ft·lbf — cal↔J, Btu↔J, erg↔J, kW·h↔J, **hp↔W** |
| Pressure | Pa, kPa, MPa, bar, atm, mmHg, Torr, psi, inHg, kgf/cm² — atm↔Pa, bar↔Pa, mmHg↔Pa, psi↔kPa, inHg↔kPa |
| Speed | m/s, km/h, mph, knot, ft/s — km/h↔m/s, mph↔km/h, **knot↔km/h**, ft/s↔m/s |

## 5. How a rollout is applied

`build/apply-calc-patches.mjs` takes a patch file of `{ file, problem, calc }` entries and does
the payload surgery with guards: exact JSON-encoded value replacement in **function** form (a
replacement string would treat `$'`/`$$` as substitution patterns — that corrupted a payload
earlier in this build), parse-before-write, and re-parse afterwards. `build/patch-calc-technique.mjs`
is the hand-written original of the same shape and still holds the Parallel Resonance blocks.
