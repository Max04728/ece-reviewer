---
id: ECE-04-02
title: "PN Junction and Depletion Region"
part: "02_Electronics_Engineering"
area: "04_Semiconductor_Devices"
topic: 2
tier: 1
depth: full
problem_count: 10
prereqs: ["[[01_Intrinsic,_Extrinsic_and_Carrier_Transport]]"]
tags: ["ece", "electronics_engineering", "semiconductor_devices"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — PN Junction and Depletion Region

> [!abstract] Scope
> How a pn junction forms its space-charge region, and how to compute the built-in barrier, the depletion width and its split, the peak field and the junction capacitance under any bias.

## Core Concept

> [!tip] Intuition
> Put p-type and n-type silicon together and the carriers immediately try to flatten their concentration difference. The carriers that cross leave behind immobile ionised dopant atoms, and that exposed charge creates an electric field that pushes back. Equilibrium is the standoff between the two, and everything in this topic is a consequence of that standoff.

**What happens the instant p meets n.** Holes on the p side see a hole concentration of order $10^{17}\ \mathrm{cm^{-3}}$ against roughly $10^{3}\ \mathrm{cm^{-3}}$ on the n side, so they diffuse across; electrons do the same in the opposite direction. Every carrier that leaves exposes an immobile ionised dopant atom: negative acceptor ions left on the p side, positive donor ions on the n side. This space-charge layer is the **depletion region**. It is depleted of mobile carriers, so it acts as an insulator sandwiched between two conducting regions. Diffusion cannot run away because the exposed charge builds a field (pointing from the n side toward the p side) that drives a drift current back in the opposite direction.

**At equilibrium drift exactly cancels diffusion.** No wires are attached and no net current flows, so for electrons $J_n = q\mu_n n E + qD_n\frac{dn}{dx} = 0$. Using Einstein's relation $D_n/\mu_n = V_T$ this integrates across the junction to the contact, or **built-in**, potential $$V_0 = V_T\ln\!\left(\frac{N_A N_D}{n_i^{2}}\right).$$ The barrier exists with the device sitting on the bench. You cannot read it with a voltmeter, because the probe contacts develop their own opposing contact potentials that cancel it almost exactly. Practical silicon junctions land between about 0.6 V and 0.9 V; the 0.7 V figure is a typical value, not a constant.

**The depletion width, and how it splits.** Charge neutrality of the exposed charge requires $N_A x_p = N_D x_n$, so the lighter-doped side is the wider side — often by orders of magnitude. Solving Poisson's equation inside the depletion approximation gives a triangular field profile that peaks at the metallurgical junction, $$E_{max} = \frac{qN_D x_n}{\varepsilon} = \frac{qN_A x_p}{\varepsilon},\qquad V_0 = \tfrac{1}{2}E_{max}W,$$ and therefore $$W = \sqrt{\frac{2\varepsilon}{q}\left(\frac{1}{N_A}+\frac{1}{N_D}\right)V_0}.$$ For a one-sided $p^+n$ junction the acceptor term is negligible and $W\approx\sqrt{2\varepsilon V_0/(qN_D)}$ — the lightly doped side alone sets the width.

**Bias moves the boundary.** Forward bias lowers the barrier to $V_0 - V$ and shrinks the depletion region, which is why a forward-biased junction conducts heavily. Reverse bias raises it to $V_0 + V_R$ and widens it. Since the exposed charge $Q = qN_D x_n A$ is fixed by the doping, the depletion region is a voltage-variable parallel-plate capacitor, $$C_j = \frac{\varepsilon A}{W} = \frac{C_{j0}}{\sqrt{1 - V/V_0}},$$ where $V$ is positive for forward bias. This is the varactor effect and the origin of the diode's reverse-bias capacitance. Under strong forward bias the depletion approximation fails: the injected carrier density exceeds the doping, the junction no longer looks like an insulator, and the forward capacitance is set by **diffusion** capacitance $C_D = \tau_T I_D/(nV_T)$ instead.

**Where the exam numbers come from.** For silicon $\varepsilon_{Si} = 11.8\,\varepsilon_0 = 1.045\times10^{-12}\ \mathrm{F/cm}$, $n_i = 1.5\times10^{10}\ \mathrm{cm^{-3}}$ at 300 K, and $V_T = kT/q = 25.9\ \mathrm{mV}$ at 300 K (use $26\ \mathrm{mV}$ for exam work). Note that $n_i$ grows steeply with temperature — roughly doubling every 10 °C — so $V_0$ has a negative temperature coefficient of about 1.7 to 2 mV/°C, and a hot junction both widens $W$ and loses barrier height. Because $V_0$ depends on the *product* $N_A N_D$, and $W$ on the *sum of reciprocals*, the two quantities respond to doping in completely different ways.

## Derivation

**Built-in potential from the zero-current condition.** At equilibrium there is no net electron current across the junction: $$J_n = q\mu_n n E + qD_n\frac{dn}{dx} = 0.$$ Solve for the field: $$E = -\frac{D_n}{\mu_n}\cdot\frac{1}{n}\frac{dn}{dx} = -V_T\frac{1}{n}\frac{dn}{dx},$$ using the Einstein relation $D_n/\mu_n = kT/q = V_T$. The barrier potential is the integral of the field across the depletion region: $$V_0 = -\int_{-x_p}^{x_n} E\,dx = V_T\int_{n_p}^{n_n}\frac{dn}{n} = V_T\ln\!\left(\frac{n_{n0}}{n_{p0}}\right).$$ In the neutral n region $n_{n0} \approx N_D$; in the neutral p region the law of mass action gives $n_{p0} = n_i^{2}/N_A$. Substituting, $$V_0 = V_T\ln\!\left(\frac{N_A N_D}{n_i^{2}}\right).$$

**Depletion width from Poisson's equation.** In the depletion approximation the mobile charge is ignored and the space charge is a step: $\rho = -qN_A$ for $-x_p < x < 0$ and $\rho = +qN_D$ for $0 < x < x_n$. Integrating $dE/dx = \rho/\varepsilon$ with $E(-x_p) = E(x_n) = 0$ gives a field that is linear on each side and peaks at the metallurgical junction: $$E_{max} = \frac{qN_A x_p}{\varepsilon} = \frac{qN_D x_n}{\varepsilon}.$$ Equating the two expressions is exactly charge neutrality, $N_A x_p = N_D x_n$. The potential across the region is the area under the triangular field, $V_0 = \tfrac12 E_{max}W$ with $W = x_p + x_n$. Substituting $x_p = E_{max}\varepsilon/(qN_A)$, $x_n = E_{max}\varepsilon/(qN_D)$ and $E_{max} = 2V_0/W$: $$W = \frac{2V_0}{E_{max}} \Rightarrow W = \sqrt{\frac{2\varepsilon V_0}{q}\left(\frac{1}{N_A}+\frac{1}{N_D}\right)}.$$ Replacing $V_0$ by $V_0 - V$ extends the result to any applied bias.

**Junction capacitance from the exposed charge.** The charge exposed on the p side of the transition is $Q = qN_A x_p A = qN_D x_n A$, entirely determined by how far the depletion edges have moved. The incremental capacitance is $C_j = dQ/dV$. Because a small change $dV$ moves the edges by $dW$ and $dQ = qN_D A\,dx_n$, and because the field is triangular, $dV = E_{max}\,dW$, the ratio collapses to $$C_j = \frac{\varepsilon A}{W},$$ the parallel-plate formula with the depletion region as the dielectric. Substituting $W(V) = W_0\sqrt{1 - V/V_0}$ gives the bias-dependent form $C_j = C_{j0}/\sqrt{1 - V/V_0}$, with $C_{j0} = \varepsilon A/W_0$ measured at zero bias.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Thermal voltage | $V_T = \frac{kT}{q}$ | 25.9 mV at 300 K; use 26 mV in exam work. Rises about 0.086 mV per kelvin. |
| Mass-action law | $n_0 p_0 = n_i^{2}$ | Thermal equilibrium only. Broader in the exam sense: it fails under injection (forward bias, illumination). |
| Built-in potential | $V_0 = V_T\ln\!\left(\frac{N_A N_D}{n_i^{2}}\right)$ | Equilibrium, non-degenerate doping. Depends on the product N_A N_D, not on either alone. |
| Depletion width | $W = \sqrt{\frac{2\varepsilon}{q}\left(\frac{1}{N_A}+\frac{1}{N_D}\right)(V_0 - V)}$ | Abrupt junction; V is positive for forward bias. Use cm-based units throughout. |
| One-sided junction width | $W \approx \sqrt{\frac{2\varepsilon V_0}{qN_D}}$ | p+n junction with N_A >> N_D. Only the lightly doped side matters. |
| Charge neutrality | $N_A x_p = N_D x_n$ | Fixes the split of W. The lighter-doped side is the wider side. |
| Edge widths | $x_n = \frac{W N_A}{N_A + N_D},\quad x_p = \frac{W N_D}{N_A + N_D}$ | Same result as the neutrality relation; use either consistently. |
| Peak junction field | $E_{max} = \frac{2(V_0 - V)}{W} = \frac{qN_D x_n}{\varepsilon}$ | Peak occurs at the metallurgical junction. Compare against breakdown field (~3e5 V/cm for Si). |
| Zero-bias junction capacitance | $C_{j0} = \frac{\varepsilon A}{W_0}$ | Parallel-plate model of the depletion region; A in the same length unit as W. |
| Bias-dependent junction capacitance | $C_j = \frac{C_{j0}}{\sqrt{1 - V/V_0}}$ | Reverse bias and small forward bias only. Forward bias raises it; the model breaks down as V approaches V_0. |
| Diffusion capacitance | $C_D = \frac{\tau_T I_D}{nV_T}$ | Forward-bias capacitance, dominates over C_j once injection exceeds the doping. |
| Intrinsic concentration vs temperature | $n_i(T) \approx n_i(300)\left(\frac{T}{300}\right)^{3/2} e^{-\frac{E_g}{2k}\left(\frac{1}{T}-\frac{1}{300}\right)}$ | Roughly doubles every 10 K near room temperature; drives the negative tempco of V_0. |

## Interactive Widget

**PN Junction Depletion Explorer**

![[PN_Junction_Depletion_Explorer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. Find the built-in potential of a silicon junction with $N_A = 10^{17}\ \mathrm{cm^{-3}}$ and $N_D = 10^{16}\ \mathrm{cm^{-3}}$ at 300 K.

**Given:** N_A = 1e17 cm^-3; N_D = 1e16 cm^-3; n_i = 1.5e10 cm^-3; V_T = 26 mV

**Solution:**

1. Product: N_A N_D = (1e17)(1e16) = 1e33 cm^-6
2. ni^2 = (1.5e10)^2 = 2.25e20 cm^-6
3. Ratio = 1e33 / 2.25e20 = 4.444e12; ln(4.444e12) = ln 4.444 + 12 ln 10 = 1.492 + 27.631 = 29.12
4. V_0 = (0.026)(29.12) = 0.757 V

> [!success]- Answer
> **$V_0 = 0.757\ \mathrm{V}$ (about 0.76 V).**

> [!warning] Trap
> Using 0.7 V as a universal constant. V_0 is set by the doping product and ranges roughly 0.6-0.9 V in practical silicon; here it is 0.76 V.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1E17×1E16÷2.25E20` → **4.444e12**, the dimensionless $N_AN_D/n_i^2$.
> 2. `0.026×ln(Ans)` → **0.7572** V.
>
> It is `ln`, never `log` — the Shockley form is a natural logarithm.

### P2. Compute the zero-bias depletion width of that same junction.

**Given:** N_A = 1e17 cm^-3; N_D = 1e16 cm^-3; V_0 = 0.757 V; epsilon_Si = 1.045e-12 F/cm

**Solution:**

1. 1/N_A + 1/N_D = 1e-17 + 1e-16 = 1.10e-16 cm^3
2. 2*epsilon*V_0/q = 2(1.045e-12)(0.757)/(1.602e-19) = 9.88e6 (V.cm^-2... units carried in cm)
3. Product: (9.88e6)(1.10e-16) = 1.087e-9 cm^2
4. W_0 = sqrt(1.087e-9) = 3.30e-5 cm = 0.330 um

> [!success]- Answer
> **$W_0 = 3.30\times10^{-5}\ \mathrm{cm} = 0.330\ \mu\mathrm{m}$.**

> [!warning] Trap
> Using epsilon_0 = 8.854e-14 F/cm instead of epsilon_Si = 11.8 epsilon_0. That understates W by sqrt(11.8) = 3.4x and overstates the capacitance by the same factor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷1E17+1÷1E16` → **1.10e-16** cm³ as the reciprocal sum.
> 2. `√(2×1.045E-12×0.757÷` `SHIFT` `CVALUE` `23` `×Ans)` → **3.30e-5** cm = **0.330** µm.
>
> $\varepsilon$ is $\varepsilon_{Si} = 1.045\times10^{-12}$ F/cm = $11.8\varepsilon_0$, not $\varepsilon_0$.

### P3. Split the depletion width of the previous junction between the p and n sides.

**Given:** W_0 = 3.30e-5 cm; N_A = 1e17 cm^-3; N_D = 1e16 cm^-3

**Solution:**

1. Charge neutrality: N_A x_p = N_D x_n
2. x_n = W N_A/(N_A + N_D) = (3.30e-5)(1e17)/(1.10e17)
3. x_n = 3.00e-5 cm = 0.300 um
4. x_p = W - x_n = 2.996e-6 cm = 0.0300 um

> [!success]- Answer
> **$x_n = 0.300\ \mu\mathrm{m}$, $x_p = 0.0300\ \mu\mathrm{m}$.**

> [!warning] Trap
> Splitting W evenly (W/2 each side). The 10:1 doping ratio makes a 10:1 width ratio; the lightly doped side takes almost the whole region.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `3.3E-5×1E17÷1.1E17` → **3.00e-5** cm = $x_n$.
> 2. `3.3E-5−Ans` → **3.00e-6** cm = $x_p$; the ratio is **10**, matching $N_A/N_D$.
>
> A 10:1 doping ratio is a 10:1 width ratio — never $W/2$ per side.

### P4. Find the peak electric field in the depletion region of that junction.

**Given:** V_0 = 0.757 V; W_0 = 3.30e-5 cm

**Solution:**

1. The field profile is triangular, so its area equals the barrier: V_0 = (1/2) E_max W
2. E_max = 2V_0/W = 2(0.757)/(3.30e-5)
3. E_max = 4.59e4 V/cm

> [!success]- Answer
> **$E_{max} = 4.59\times10^{4}\ \mathrm{V/cm}$ (46 kV/cm).**

> [!warning] Trap
> Using E_max = V_0/W and forgetting the factor 1/2 that comes from the triangular (not rectangular) field distribution.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×0.757÷3.3E-5` → **4.59e4** V/cm ($V_0 = \frac{1}{2}E_{max}W$, so the 2 is the triangular-profile factor).
> 2. Charge-route check: `1.602E-19×1E16×3.0E-5÷1.045E-12` → **4.60e4** V/cm, which agrees.
>
> $E_{max} = V_0/W$ alone gives 2.30e4 V/cm — exactly half.

### P5. Find the zero-bias junction capacitance of that junction if the cross-sectional area is $A = 10^{-3}\ \mathrm{cm^{2}}$.

**Given:** epsilon_Si = 1.045e-12 F/cm; A = 1e-3 cm^2; W_0 = 3.30e-5 cm

**Solution:**

1. Treat the depletion region as a parallel-plate capacitor with the depletion width as the plate spacing
2. C_j0 = epsilon A / W_0 = (1.045e-12)(1e-3)/(3.30e-5)
3. C_j0 = 1.045e-15 / 3.30e-5 = 3.17e-11 F

> [!success]- Answer
> **$C_{j0} = 31.7\ \mathrm{pF}$.**

> [!warning] Trap
> Reporting the answer in farads without converting: 3.17e-11 F 'looks small' and gets written as 3.17e-11 pF, a 10^12 error.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1.045E-12×1E-3÷3.3E-5` → **3.17e-11** F.
> 2. Press `ENG` (or `×1E12`) before reporting: **31.7** pF, never 3.17e-11 pF.
>
> The depletion region is the dielectric, so $C_j$ falls as $1/W$.

### P6. The junction is now reverse biased at $V_R = 5\ \mathrm{V}$. Find the new depletion width and junction capacitance.

**Given:** V_0 = 0.757 V; V_R = 5 V; W_0 = 3.30e-5 cm; C_j0 = 31.7 pF

**Solution:**

1. W = W_0 sqrt((V_0 + V_R)/V_0) = 3.30e-5 * sqrt(5.757/0.757)
2. sqrt(7.605) = 2.758, so W = 3.30e-5 * 2.758 = 9.10e-5 cm = 0.910 um
3. C_j = C_j0/sqrt(1 + V_R/V_0) = 31.7/2.758
4. C_j = 11.5 pF

> [!success]- Answer
> **$W = 0.910\ \mu\mathrm{m}$, $C_j = 11.5\ \mathrm{pF}$.**

> [!warning] Trap
> Scaling C_j by the same factor as W in the wrong direction. Reverse bias widens W, so the capacitance must go DOWN — an answer larger than C_j0 means the ratio was inverted.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√((0.757+5)÷0.757)` → **2.7577** = $W/W_0$; store with `SHIFT` `STO` `A`.
> 2. `3.3E-5×A` → **9.10e-5** cm = **0.910** µm; `31.7÷A` → **11.5** pF.
>
> Reverse bias widens W, so C must fall — an answer above $C_{j0}$ means the ratio was inverted.

### P7. The junction is forward biased at $V = 0.5\ \mathrm{V}$. Find $W$ and $C_j$.

**Given:** V_0 = 0.757 V; V = 0.5 V; W_0 = 3.30e-5 cm; C_j0 = 31.7 pF

**Solution:**

1. Barrier is now V_0 - V = 0.757 - 0.500 = 0.257 V
2. W = 3.30e-5 * sqrt(0.257/0.757) = 3.30e-5 * 0.5827 = 1.92e-5 cm = 0.192 um
3. C_j = 31.7/0.5827 = 54.4 pF

> [!success]- Answer
> **$W = 0.192\ \mu\mathrm{m}$, $C_j = 54.4\ \mathrm{pF}$.**

> [!warning] Trap
> Trusting this capacitance at 0.5 V forward. Once injection raises the carrier density above the doping, C_j is no longer the dominant capacitance — diffusion capacitance C_D = tau_T I_D/(nV_T) takes over.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√((0.757−0.5)÷0.757)` → **0.5827** = $W/W_0$; store with `SHIFT` `STO` `A`.
> 2. `3.3E-5×A` → **1.92e-5** cm = **0.192** µm; `31.7÷A` → **54.4** pF.
>
> Forward bias shrinks W and raises $C_j$; past about 0.5 V, diffusion capacitance takes over.

### P8. Find the thermal voltage at 100 °C and state how the built-in potential moves relative to its 300 K value.

**Given:** T = 373 K; k/q = 86.2 uV/K

**Solution:**

1. V_T = kT/q = (8.617e-5)(373) = 3.214e-2 V = 32.1 mV
2. Compare with 25.9 mV at 300 K: a rise of 6.2 mV
3. ni grows by roughly a factor of 2 per 10 K, so ln(N_A N_D/ni^2) falls faster than V_T rises
4. Net effect: V_0 falls about 1.7 to 2 mV per degree C

> [!success]- Answer
> **$V_T(100\ ^\circ\mathrm{C}) = 32.1\ \mathrm{mV}$; $V_0$ falls about $2\ \mathrm{mV/^\circ C}$.**

> [!warning] Trap
> Raising V_T and stopping there, concluding that V_0 rises with temperature. The ni^2 term in the logarithm dominates and V_0 always falls.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `SHIFT` `CVALUE` `25` `÷` `SHIFT` `CVALUE` `23` `×373` → **3.214e-2** V = **32.1** mV.
> 2. `Ans−0.02585` → **+6.2** mV against 300 K, yet $V_0$ still falls because $n_i^2$ grows faster.
>
> `8.617E-5×373` is the same number; codes 25 and 23 avoid typing $k$ and $q$.

### P9. A second junction uses $N_A = 10^{18}\ \mathrm{cm^{-3}}$ and $N_D = 10^{15}\ \mathrm{cm^{-3}}$ — the same doping product as the first junction. Compare $V_0$ and $W_0$.

**Given:** N_A = 1e18 cm^-3; N_D = 1e15 cm^-3; N_A N_D = 1e33 cm^-6 (unchanged); V_T = 26 mV

**Solution:**

1. V_0 = V_T ln(N_A N_D/ni^2) depends only on the product, which is unchanged: V_0 = 0.757 V
2. 1/N_A + 1/N_D = 1e-18 + 1e-15 = 1.001e-15 cm^3
3. W_0 = sqrt((9.88e6)(1.001e-15)) = sqrt(9.89e-9) = 9.94e-5 cm

> [!success]- Answer
> **$V_0$ is still $0.757\ \mathrm{V}$, but $W_0 = 0.994\ \mu\mathrm{m}$ — three times wider.**

> [!warning] Trap
> Assuming heavier doping always means a bigger barrier. V_0 sees only the product; the wide, lightly doped side is what stretches W.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `1÷1E18+1÷1E15` → **1.001e-15** cm³, where the $1/N_A$ term is negligible.
> 2. `√(2×1.045E-12×0.757÷` `SHIFT` `CVALUE` `23` `×Ans)` → **9.94e-5** cm = **0.994** µm.
>
> $V_0$ depends only on the product $N_AN_D$; $W$ depends on the sum of reciprocals.

### P10. What reverse bias reduces the junction capacitance of the first junction to exactly half of $C_{j0}$?

**Given:** C_j0 = 31.7 pF; V_0 = 0.757 V

**Solution:**

1. Set C_j0/sqrt(1 + V_R/V_0) = C_j0/2
2. sqrt(1 + V_R/V_0) = 2, so 1 + V_R/V_0 = 4
3. V_R = 3V_0 = 3(0.757)
4. V_R = 2.27 V

> [!success]- Answer
> **$V_R = 2.27\ \mathrm{V}$.**

> [!warning] Trap
> Solving 1 + V_R/V_0 = 2 (i.e. V_R = V_0) by dropping the square root. The capacitance varies as the inverse square root, so halving it takes four times the (1 + V_R/V_0) factor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Type `31.7÷√(1+X÷0.757)`, then `SHIFT` `SOLVE` with a guess of 2 and `=` → **X = 2.271** V.
> 2. `L−R` shows **0**; the algebra check is $1+V_R/V_0 = 4$, so $V_R = 3V_0$.
>
> Halving $C_j$ squares the factor: dropping the square root gives 0.757 V.

## Traps & Exam Notes

- **Treating 0.7 V as a constant.** $V_0 = V_T\ln(N_A N_D/n_i^{2})$ is doping-dependent (0.6-0.9 V for practical silicon) and falls about 1.7-2 mV/°C. Any problem that specifies doping expects the computed value.
- **Thinking heavier doping always raises the barrier.** $V_0$ depends only on the product $N_A N_D$. Going from $10^{17}/10^{16}$ to $10^{18}/10^{15}$ leaves $V_0$ unchanged at 0.757 V while tripling the depletion width.
- **Splitting the depletion width evenly.** $N_A x_p = N_D x_n$ means the ratio of widths is the inverse ratio of dopings. In a $p^+n$ junction the p-side extends essentially zero and the whole of $W$ sits in the lightly doped n side.
- **Using $\varepsilon_0$ for the depletion region.** The dielectric is silicon: $\varepsilon_{Si} = 11.8\varepsilon_0 = 1.045\times10^{-12}\ \mathrm{F/cm}$. Omitting the 11.8 makes $W$ 3.4x too small and $C_j$ 3.4x too large.
- **Mixing metres and centimetres.** $\varepsilon_{Si} = 1.045\times10^{-12}\ \mathrm{F/cm}$ pairs with doping in $\mathrm{cm^{-3}}$ and gives $W$ in cm. Pairing F/m with $\mathrm{cm^{-3}}$ is a $10^{6}$ error in the product $\varepsilon N$.
- **Using $E_{max} = V_0/W$.** The field is triangular, so $V_0 = \tfrac12 E_{max}W$. The factor of 2 is the whole point of the derivation and is the single most common arithmetic slip here.
- **Applying $C_j = \varepsilon A/W$ under strong forward bias.** The depletion approximation fails once injected carriers outnumber the dopant ions; the forward capacitance is then diffusion capacitance, not junction capacitance.
- **Trying to measure $V_0$ with a voltmeter.** The probe contacts generate their own contact potentials in opposition, so the meter reads approximately zero. $V_0$ must be computed or extracted from a capacitance-voltage plot.

## See Also

- [[01_Intrinsic,_Extrinsic_and_Carrier_Transport]]
- [[03_Diode_Characteristics_and_Shockley]]
- [[15_Special_Diodes_Varactor,_Schottky,_Tunnel]]

---

[[01_Intrinsic,_Extrinsic_and_Carrier_Transport|⬅ 01]] · [[_MOC_Semiconductor_Devices|MOC]] · [[00_Dashboard|Dashboard]] · [[03_Diode_Characteristics_and_Shockley|03 ➡]]
