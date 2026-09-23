---
id: ECE-02-08
title: "Parallel Resonance and Anti-Resonance"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 8
tier: 2
depth: full
problem_count: 4
prereqs: ["[[02_Phasors_and_Complex_Impedance]]", "[[03_Series_and_Parallel_AC_Analysis]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — Parallel Resonance and Anti-Resonance

> [!abstract] Scope
> Why a practical coil-and-capacitor tank draws its smallest source current at the frequency where the input susceptance cancels, how to compute that frequency and the dynamic impedance it presents, and how the bandwidth and the circulating tank current follow from $Q$.

## Core Concept

> [!tip] Intuition
> A parallel tank is the dual of the series loop: the capacitor and the coil trade reactive current back and forth internally, so the source only has to make up the coil's loss. The line current therefore dips to a minimum at anti-resonance even though the current circulating inside the tank is $Q$ times larger.

**Work in admittance, not impedance.** A practical tank is a coil with resistance $R$ in series with $L$, and that branch in parallel with $C$. Its impedance has a messy numerator, but its admittance is a clean sum: $$Y(\omega) = \frac{1}{R + j\omega L} + j\omega C = \frac{R}{R^{2}+\omega^{2}L^{2}} + j\left(\omega C - \frac{\omega L}{R^{2}+\omega^{2}L^{2}}\right).$$ Anti-resonance is defined by the imaginary part, the **susceptance**, being zero. There the input admittance is purely real, so the tank looks like a pure resistor — and for a low-loss coil a very large one. That is why the parallel tank is a *maximum-impedance, minimum-source-current* condition, exactly dual to series resonance's minimum impedance and maximum current. The algebra of $\omega_0$ is easiest in admittance; the physical picture is easiest in terms of the tank current.

**Where the anti-resonant frequency comes from.** Setting the susceptance to zero: $$\omega_0 C = \frac{\omega_0 L}{R^{2}+\omega_0^{2}L^{2}} \;\Longrightarrow\; R^{2}+\omega_0^{2}L^{2} = \frac{L}{C} \;\Longrightarrow\; \omega_0 = \sqrt{\frac{1}{LC}-\frac{R^{2}}{L^{2}}}.$$ The familiar $\omega_0 \approx 1/\sqrt{LC}$ is only the $R \to 0$ limit, and it is accurate to roughly $1/(2Q^{2})$ — better than 1 % once $Q \geq 10$. Two consequences matter in an exam. First, coil resistance always *lowers* the anti-resonant frequency relative to $1/\sqrt{LC}$, never raises it. Second, the equation $R^{2}+\omega_0^{2}L^{2} = L/C$ has a solution only when $R^{2} < L/C$, that is $R < \sqrt{L/C} = Z_0$, the characteristic impedance. A coil lossier than $Z_0$ has a susceptance that never crosses zero and simply never anti-resonates, so the formula returning a negative radicand is a physical answer, not an arithmetic error.

**Dynamic impedance, tank current, and bandwidth.** At $\omega_0$ the susceptance vanishes and $Y = R/(R^{2}+\omega_0^{2}L^{2}) = RC/L$, so $$Z_{dyn} = \frac{L}{RC} = Q^{2}R, \qquad Q = \frac{\omega_0 L}{R} = \omega_0 C R_p \approx \frac{R_p}{\omega_0 L},$$ where $R_p = Z_{dyn}$ is the equivalent parallel resistance of the coil. The first two $Q$ forms are exact; $R_p/(\omega_0L)$ is the high-$Q$ version and reads about $1\%$ high at $Q = 10$ because it ignores the $R^{2}/L^{2}$ term. The source current at resonance is $I_s = V/Z_{dyn}$, while $I_C = V\omega_0 C = Q I_s$, and the coil branch current is:
$$|I_L| = V/\sqrt{R^{2}+\omega_0^{2}L^{2}} = V/Z_0 \approx Q I_s$$
The tank therefore circulates $Q$ times the source current, a real design constraint because the capacitor and coil must be rated for that current and for the corresponding reactive power. The impedance falls to $Z_{dyn}/\sqrt{2}$ at the half-power edges, so $BW = \omega_0/Q \approx R/L$ in rad/s (exact only in the high-$Q$ limit, and about $1\%$ wide at $Q = 10$), $\Delta f \approx R/(2\pi L)$ in Hz, and $Q = f_0/\Delta f$. The model fails in three places: a lossless ideal tank ($R = 0$) predicts infinite $Z_{dyn}$; the symmetric edge formula $\omega_{1,2} \approx \omega_0 \mp BW/2$ is a high-$Q$ approximation; and the $R$ in every expression is the coil's *series* resistance, so a stated parallel resistance must first be converted with $R_p = Q^{2}R$.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Input admittance of the practical tank | $Y = \frac{R}{R^{2}+\omega^{2}L^{2}} + j\left(\omega C - \frac{\omega L}{R^{2}+\omega^{2}L^{2}}\right)$ | Coil resistance $R$ in series with $L$; that branch in parallel with $C$. The real part is never zero, so a practical tank always absorbs a little power. |
| Anti-resonance condition | $\omega_0 C = \frac{\omega_0 L}{R^{2}+\omega_0^{2}L^{2}}$ | Susceptance zero, which is the definition. It is not the same as $\omega L = 1/(\omega C)$, which holds only for an ideal lossless coil. |
| Exact anti-resonant frequency (practical tank) | $\omega_0 = \sqrt{\frac{1}{LC} - \frac{R^{2}}{L^{2}}}$ | Exact for the series-$R$-$L$ parallel-$C$ model. Use it whenever $Q < 10$ or whenever the answer is compared with $1/\sqrt{LC}$ to more than two figures. |
| Approximate anti-resonant frequency | $\omega_0 \approx \frac{1}{\sqrt{LC}}, \qquad f_0 = \frac{1}{2\pi\sqrt{LC}}$ | High-$Q$ limit, error about $1/(2Q^{2})$. Keep units straight: $\omega_0$ is rad/s and $f_0 = \omega_0/(2\pi)$ is Hz. |
| Existence of anti-resonance | $R < Z_0 = \sqrt{\frac{L}{C}}$ | If $R \geq \sqrt{L/C}$ the coil is too lossy: the susceptance never reaches zero, the tank is never purely resistive, and there is no anti-resonance and no $Z_{dyn} = Q^{2}R$ enhancement. $\|Z\|$ still passes through a maximum, but it sits only just above $R$ and at a different frequency. $Z_0$ is the characteristic impedance of the tank. |
| Dynamic (anti-resonant) impedance | $Z_{dyn} = \frac{L}{RC} = Q^{2}R$ | The $L/(RC)$ form is exact; $Q^{2}R$ drops the $R^{2}/L^{2}$ term and is already 1% low at Q = 10. It is the input impedance at the anti-resonant frequency (the maximum), equal to the equivalent parallel resistance $R_p$. |
| Quality factor of the practical tank | $Q = \frac{\omega_0 L}{R} = \omega_0 C R_p \approx \frac{R_p}{\omega_0 L}$ | The first two forms are exact with $R_p = Z_{dyn} = L/(RC)$; the third is the high-$Q$ form and is a factor $1/(1-R^{2}/Z_0^{2})$ too high (about +1% at Q = 10). Q is dimensionless. |
| Source current and circulating tank current | $I_s = \frac{V}{Z_{dyn}}, \qquad I_{tank} = Q\,I_s$ | Valid at $\omega_0$. $I_s$ is the minimum line current to within the high-$Q$ approximation (the exact minimum sits a fraction of a percent away and is about 0.5% lower at Q = 10); the branch currents are $Q$ times larger and set the component current ratings. |
| Bandwidth and half-power edges | $BW = \frac{\omega_0}{Q} \approx \frac{R}{L}, \qquad Q = \frac{f_0}{\Delta f}, \qquad \omega_{1,2} \approx \omega_0 \mp \frac{BW}{2}$ | Edges are where the impedance magnitude falls to $Z_{dyn}/\sqrt{2}$. $BW \approx R/L$ rad/s (independent of $C$) is a high-$Q$ result: it is 1% wide at Q = 10 and 23% wide at Q = 2. Use $BW = \omega_0/Q$ with the exact $\omega_0$ when Q is small. |

## Worked Problems

### P1. A practical tank has $L = 100\ \mathrm{mH}$ and $C = 10\ \mu\mathrm{F}$, wound as a coil whose resistance is $R = 10\ \Omega$ in series with $L$. Find the characteristic impedance, the exact anti-resonant frequency, the approximate value $1/\sqrt{LC}$, $Q$ and the dynamic impedance.

**Given:** L = 100 mH; C = 10 uF; R = 10 ohm (coil, in series with L)

**Solution:**

1. Check that anti-resonance exists: $Z_0 = \sqrt{L/C} = \sqrt{0.1/10^{-5}} = \sqrt{10^{4}} = 100\ \Omega$, and $R = 10\ \Omega < 100\ \Omega$, so the susceptance does cross zero.
2. Exact frequency: $\omega_0 = \sqrt{1/(LC) - R^{2}/L^{2}} = \sqrt{10^{6} - 10^{4}} = \sqrt{990000} = 994.99\ \mathrm{rad/s}$, so $f_0 = 994.99/(2\pi) = 158.4\ \mathrm{Hz}$.
3. Approximate frequency: $1/\sqrt{LC} = 1/\sqrt{10^{-6}} = 1000\ \mathrm{rad/s}$ ($159.2\ \mathrm{Hz}$), about 0.5 % high because $Q \approx 10$.
4. $Q = \omega_0 L/R = 994.99 \times 0.1/10 = 9.95$.
5. $Z_{dyn} = L/(RC) = 0.1/(10 \times 10^{-5}) = 1000\ \Omega$. The shortcut $Q^{2}R = 9.95^{2} \times 10 = 990\ \Omega$ is 1 % low because $Q$ is only about 10.

> [!success]- Answer
> **$Z_0 = 100\ \Omega$; $\omega_0 = 994.99\ \mathrm{rad/s}$ ($f_0 = 158.4\ \mathrm{Hz}$) against $1/\sqrt{LC} = 1000\ \mathrm{rad/s}$; $Q = 9.95$; $Z_{dyn} = 1000\ \Omega$**

> [!warning] Trap
> Using $Z_{dyn} = Q^{2}R$ as if it were exact and answering $990\ \Omega$. $Q^{2}R$ subtracts the $R^{2}/L^{2}$ term twice and is 1 % low at $Q = 10$; the gap explodes for a lossier coil. $Z_{dyn} = L/(RC) = 1000\ \Omega$ is the exact value.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `√(0.1÷1E-5) : √(1÷(0.1×1E-5)−10²÷0.1²) : Ans÷2π : 995×0.1÷10 : 0.1÷(10×1E-5)`
> 2. Press `=` down the chain: $Z_0$ = **100** Ω → $\omega_0$ = **995.0** rad/s → $f_0$ = **158.4** Hz → $Q$ = **9.95** → $Z_{dyn}$ = **1000** Ω. The approximation `1÷√(0.1×1E-5)` = **1000** rad/s is the 0.5 % high check.

### P2. The same tank ($L = 100\ \mathrm{mH}$, $C = 10\ \mu\mathrm{F}$, $R = 10\ \Omega$, $Z_{dyn} = 1000\ \Omega$, $\omega_0 = 994.99\ \mathrm{rad/s}$, $Q = 9.95$) is driven by a $120\ \mathrm{V\ rms}$ source at its exact anti-resonant frequency. Find the source current, the capacitor current, the coil-branch current, and the bandwidth in rad/s and in Hz.

**Given:** V_s = 120 V rms at omega_0; L = 100 mH; C = 10 uF; R = 10 ohm; omega_0 = 994.99 rad/s; Z_dyn = 1000 ohm; Q = 9.95

**Solution:**

1. At anti-resonance the tank is purely resistive, so $I_s = V/Z_{dyn} = 120/1000 = 0.120\ \mathrm{A\ rms}$ — the minimum source current this tank can draw.
2. Capacitor branch: $I_C = V\omega_0 C = 120 \times 994.99 \times 10^{-5} = 1.194\ \mathrm{A\ rms}$. Cross-check $QI_s = 9.95 \times 0.120 = 1.194\ \mathrm{A}$.
3. Coil branch: $|I_L| = V/\sqrt{R^{2}+\omega_0^{2}L^{2}} = 120/\sqrt{100 + 9900} = 120/100.0 = 1.200\ \mathrm{A\ rms}$, essentially equal to $I_C$.
4. Bandwidth (high-$Q$ form, safe here since $Q = 9.95$): $BW \approx R/L = 10/0.1 = 100\ \mathrm{rad/s}$, so $\Delta f \approx 100/(2\pi) = 15.9\ \mathrm{Hz}$; check $Q = f_0/\Delta f = 158.4/15.9 \approx 9.95$.

> [!success]- Answer
> **$I_s = 120\ \mathrm{mA\ rms}$, $I_C = 1.194\ \mathrm{A\ rms}$, $|I_L| = 1.200\ \mathrm{A\ rms}$, $BW = 100\ \mathrm{rad/s} = 15.9\ \mathrm{Hz}$**

> [!warning] Trap
> Concluding that the tank is a low-stress circuit because the source current is only $120\ \mathrm{mA}$. The capacitor and coil each carry about $1.19\ \mathrm{A}$ — roughly $Q = 10$ times the source current — so their current and reactive-power ratings, not the supply current, size the components.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `120÷1000 : 120×995×1E-5 : 120÷√(10²+995²×0.1²) : 10÷0.1 : Ans÷2π`
> 2. `=` down the chain: $I_s$ = **0.120** A → $I_C$ = **1.194** A → $|I_L|$ = **1.200** A → $BW$ = **100** rad/s → **15.9** Hz.
>
> The two branch currents differing by under 1 % is the built-in sanity check — they differ only by the $R^2$ term.

### P3. A parallel tank must anti-resonate at $f_0 = 100\ \mathrm{kHz}$ with a bandwidth of $2\ \mathrm{kHz}$, using a capacitor $C = 0.1\ \mu\mathrm{F}$. Find $L$, $Q$, the coil resistance $R$, the characteristic impedance and the dynamic impedance.

**Given:** f_0 = 100 kHz; BW = 2 kHz; C = 0.1 uF

**Solution:**

1. Convert to angular frequency: $\omega_0 = 2\pi f_0 = 2\pi(10^{5}) = 6.2832 \times 10^{5}\ \mathrm{rad/s}$.
2. $L = 1/(\omega_0^{2}C) = 1/\left[(6.2832\times10^{5})^{2}(10^{-7})\right] = 1/(3.9478\times10^{4}) = 2.533\times10^{-5}\ \mathrm{H} = 25.33\ \mu\mathrm{H}$.
3. $Q = f_0/\Delta f = 100\ \mathrm{kHz}/2\ \mathrm{kHz} = 50$, so $R = \omega_0 L/Q = 15.9155/50 = 0.318\ \Omega$.
4. The high-$Q$ assumption is safe: $Z_0 = \sqrt{L/C} = \sqrt{2.533\times10^{-5}/10^{-7}} = 15.92\ \Omega$, and $R = 0.318\ \Omega \ll Z_0$.
5. $Z_{dyn} = L/(RC) = 2.533\times10^{-5}/(0.318 \times 10^{-7}) = 795.8\ \Omega$; check $Q^{2}R = 2500 \times 0.3183 = 795.8\ \Omega$.

> [!success]- Answer
> **$L = 25.33\ \mu\mathrm{H}$, $Q = 50$, $R = 0.318\ \Omega$, $Z_0 = 15.92\ \Omega$, $Z_{dyn} = 795.8\ \Omega$**

> [!warning] Trap
> Feeding $f_0$ in hertz straight into $L = 1/(\omega_0^{2}C)$ and writing $L = 1/(f_0^{2}C) = 1\ \mathrm{mH}$. The missing $2\pi$ is squared, so the answer comes out $(2\pi)^{2} = 39.5$ times too large; it also makes $Z_0$ and every current wrong.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2π×1E5` → **6.2832E5** rad/s. Enter rad/s, never $f_0$.
> 2. `1÷(6.2832E5²×1E-7)` → **25.33** µH, then `×6.2832E5÷50` → **0.318** Ω.
> 3. `√(2.533E-5÷1E-7)` → **15.92** Ω and `2.533E-5÷(0.318×1E-7)` → **795.8** Ω.

### P4. A tank uses $L = 20\ \mathrm{mH}$ and $C = 0.5\ \mu\mathrm{F}$. Decide whether anti-resonance exists when the coil resistance is (a) $R = 5\ \Omega$ and (b) $R = 250\ \Omega$, and give $\omega_0$ and $f_0$ in the case where it does.

**Given:** L = 20 mH; C = 0.5 uF; R_a = 5 ohm; R_b = 250 ohm

**Solution:**

1. $Z_0 = \sqrt{L/C} = \sqrt{0.02/(5\times10^{-7})} = \sqrt{40000} = 200\ \Omega$; anti-resonance requires $R < Z_0$.
2. (a) $R = 5\ \Omega < 200\ \Omega$, so it exists: $\omega_0 = \sqrt{1/(LC) - R^{2}/L^{2}} = \sqrt{10^{8} - 25/(4\times10^{-4})} = \sqrt{10^{8} - 62500} = \sqrt{9.99375\times10^{7}} = 9996.9\ \mathrm{rad/s}$.
3. $f_0 = 9996.9/(2\pi) = 1591\ \mathrm{Hz} = 1.591\ \mathrm{kHz}$, against $1/(2\pi\sqrt{LC}) = 1.592\ \mathrm{kHz}$ from the approximation.
4. (b) $R = 250\ \Omega > 200\ \Omega$. The condition $R^{2}+\omega^{2}L^{2} = L/C = 40000$ can never hold because $R^{2} = 62500$ already exceeds $40000$ at $\omega = 0$, so the susceptance $\omega C - \omega L/(R^{2}+\omega^{2}L^{2})$ stays positive for every $\omega$: the tank is never purely resistive and has no anti-resonance.
5. The impedance magnitude does still pass through a maximum (about $283\ \Omega$ near $6.8\ \mathrm{krad/s}$), but it is only $13\%$ above the DC value $R = 250\ \Omega$ instead of the $Q^{2}R$ enhancement a real tank delivers — the tank is useless as a filter at this loss.

> [!success]- Answer
> **(a) yes: $\omega_0 = 9996.9\ \mathrm{rad/s}$ ($f_0 = 1.591\ \mathrm{kHz}$); (b) no anti-resonance, because $R = 250\ \Omega$ exceeds $Z_0 = 200\ \Omega$**

> [!warning] Trap
> Reporting $\omega_0 \approx 1/\sqrt{LC} = 10^{4}\ \mathrm{rad/s}$ as exact in case (a), and more seriously, forcing the same formula in case (b) and quoting the square root of a negative number. A negative radicand in $1/(LC) - R^{2}/L^{2}$ means anti-resonance does not exist, not that the arithmetic is wrong.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(0.02÷5E-7)` → $Z_0$ = **200** Ω, against $R$ = 5 Ω and 250 Ω.
> 2. (a) `√(1÷(0.02×5E-7)−5²÷0.02²)` → **9996.9** rad/s = **1.591** kHz.
> 3. (b) swap in $R$ = 250 and the same expression returns **Math ERROR** — a negative radicand. That error IS the answer: no anti-resonance.
>
> Cannot isolate the unknown? Type it with `X`, press `SHIFT` `SOLVE`, give a guess, `=`. The `L−R` line shows the residual.

## Traps & Exam Notes

- **Treating anti-resonance as a maximum-current event.** In the parallel tank the source current is a *minimum* at $\omega_0$ while the branch currents $I_C$ and $I_L$ are near their maximum. Measuring the capacitor current instead of the source current reverses the conclusion, which is the whole point of the dual with series resonance.
- **Quoting $Z_{dyn} = Q^{2}R$ as exact.** The exact result is $Z_{dyn} = L/(RC)$; $Q^{2}R = \omega_0^{2}L^{2}/R$ drops the $R^{2}/L^{2}$ term and is already 1 % low at $Q = 10$ ($990\ \Omega$ instead of $1000\ \Omega$ for the worked tank).
- **Using $\omega_0 = 1/\sqrt{LC}$ for a lossy tank.** The true anti-resonant frequency is $\sqrt{1/(LC) - R^{2}/L^{2}}$, always lower than $1/\sqrt{LC}$; when $R \geq \sqrt{L/C}$ the susceptance never crosses zero and anti-resonance does not exist at all — the tank is never purely resistive, and the impedance maximum that remains is only marginally above $R$ rather than the $Q^{2}R$ the design assumed.
- **Mixing Hz and rad/s in the bandwidth.** $BW = R/L$ is in rad/s while $\Delta f = R/(2\pi L)$ is in Hz, and $Q = f_0/\Delta f$ must use matching units. For the worked tank $BW = 100\ \mathrm{rad/s}$ corresponds to $15.9\ \mathrm{Hz}$, so a 100 Hz answer overstates the passband by $2\pi$.

## See Also

- [[07_Series_Resonance]]
- [[09_Balanced_Wye_and_Delta_Systems]]
- [[06_Power_Factor_and_Correction]]
- [[05_AC_Power,_PQS_and_Triangle]]

---

[[07_Series_Resonance|⬅ 07]] · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[09_Balanced_Wye_and_Delta_Systems|09 ➡]]
