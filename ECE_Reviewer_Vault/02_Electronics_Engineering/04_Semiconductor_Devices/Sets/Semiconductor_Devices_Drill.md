---
title: "Semiconductor Devices — Drill"
type: drill
area: 04_Semiconductor_Devices
part: 02_Electronics_Engineering
seed: 1
count: 8
pool: 85
updated: 2026-09-23
---

# Semiconductor Devices — Practice Drill

**8 problems** drawn from a pool of 85 across 15 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 04_Semiconductor_Devices --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A half-wave rectifier and a bridge rectifier both use a capacitor-input filter. Both secondaries have $V_m = 20\ \mathrm{V}$. Find the PIV rating each diode needs.

**Given:** V_m = 20 V; capacitor-input filter; ideal diodes

> [!success]- Answer
> **Half-wave: $PIV = 40\ \mathrm{V}$; bridge: $PIV = 20\ \mathrm{V}$.**

> [!warning] Trap
> Using the no-capacitor PIV (V_m) for a filtered half-wave rectifier. The capacitor roughly doubles the reverse stress, and this is the single most common way a beginner-built supply destroys its diode.

<sub>from ECE-04-05</sub>

### 2. The stage uses $R_D=2.2\ \mathrm{k\Omega}$ and the bias of the previous problem ($g_m=3\ \mathrm{mS}$, $r_d=83\ \mathrm{k\Omega}$). Find the voltage gain both with and without $r_d$, in ratio and in dB.

**Given:** g_m = 3 mS; R_D = 2.2 kohm; r_d = 83 kohm

> [!success]- Answer
> **A_v = -6.6 by the shortcut and -6.43 exactly, i.e. 16.2 dB with 180 degree phase inversion.**

> [!warning] Trap
> Assuming the shortcut is always safe. Here R_D is only 2.6 percent of r_d so the error is small, but with R_D = 47 kohm the exact gain is -g_m(47k || 83k) = -3 mS * 30.0 kohm = -90 instead of -141, a 3.9 dB error that would ruin a gain budget.

<sub>from ECE-04-11</sub>

### 3. A silicon transistor has $I_{CBO}=200\ \mathrm{nA}$ and $\beta=100$. Find $I_{CEO}$, then the collector current when $I_B=50\ \mu\mathrm{A}$, and the percentage error if the leakage is neglected.

**Given:** I_CBO = 200 nA; beta = 100; I_B = 50 uA

> [!success]- Answer
> **I_CEO = 20.2 uA; I_C = 5.0202 mA, so neglecting leakage underestimates I_C by 0.40 percent.**

> [!warning] Trap
> Writing I_CEO = beta*I_CBO = 20.0 uA instead of (1+beta)*I_CBO = 20.2 uA. The missing 1 is small here, but the same mistake at beta = 10 halves the leakage estimate, and leakage is what dominates the cutoff behaviour of the stage.

<sub>from ECE-04-10</sub>

### 4. A silicon diode has $I_S = 1\times10^{-12}\ \mathrm{A}$ and $n = 1$. Find $I_D$ at $V_D = 0.6\ \mathrm{V}$ at room temperature.

**Given:** I_S = 1e-12 A; V_D = 0.6 V; n = 1; V_T = 26 mV

> [!success]- Answer
> **I_D = 10.5 mA.**

> [!warning] Trap
> Evaluating $e^{23}$ by punching it straight into a calculator that overflows, or mis-entering 0.6/0.026. The reliable route is the decade form: $e^{x} = 10^{x/2.303}$, so $23.08/2.303 = 10.02$ decades, giving $1.05\times10^{10}$. Note how brutal the sensitivity is — 0.66 V rather than 0.6 V would give 105 mA, not 10.5 mA.

<sub>from ECE-04-03</sub>

### 5. The junction is now reverse biased at $V_R = 5\ \mathrm{V}$. Find the new depletion width and junction capacitance.

**Given:** V_0 = 0.757 V; V_R = 5 V; W_0 = 3.30e-5 cm; C_j0 = 31.7 pF

> [!success]- Answer
> **$W = 0.910\ \mu\mathrm{m}$, $C_j = 11.5\ \mathrm{pF}$.**

> [!warning] Trap
> Scaling C_j by the same factor as W in the wrong direction. Reverse bias widens W, so the capacitance must go DOWN — an answer larger than C_j0 means the ratio was inverted.

<sub>from ECE-04-02</sub>

### 6. For a similar stage, $V_{CC}=10\ \mathrm{V}$, $R_C=500\ \Omega$, $\beta=100$ and $I_B=100\ \mu\mathrm{A}$. Find $V_{CE}$, then the minimum $I_B$ that would saturate the transistor.

**Given:** V_CC = 10 V; R_C = 500 ohm; beta = 100; I_B = 100 uA; V_CE(sat) = 0.2 V

> [!success]- Answer
> **V_CE = 5.0 V (forward-active); I_B(min) = 196 uA is required to reach saturation.**

> [!warning] Trap
> Reporting V_CE = V_CC = 10 V by forgetting the drop across R_C, or applying I_C = beta*I_B a second time after I_C(sat) is known. Also note 196 uA is the bare edge of saturation; a practical design drives 0.5 to 2 mA so that beta spread over temperature cannot pull the switch back into the active region.

<sub>from ECE-04-09</sub>

### 7. The same JFET ($I_{DSS}=12\ \mathrm{mA}$, $V_P=4\ \mathrm{V}$) must be biased at $I_D=8\ \mathrm{mA}$. Find the required $V_{GS}$ and the resulting $V_{DS(sat)}$.

**Given:** I_DSS = 12 mA; V_P = 4 V; Target I_D = 8 mA

> [!success]- Answer
> **V_GS = -0.734 V and V_DS(sat) = 3.27 V.**

> [!warning] Trap
> Using the linear ratio: |V_GS| = 4(1 - 8/12) = 1.33 V. That looks plausible and is nearly twice the correct answer; the square root is required because the Shockley equation is quadratic in V_GS.

<sub>from ECE-04-11</sub>

### 8. Find the conductivity and resistivity of pure (intrinsic) silicon at 300 K and compare it with the doped sample above.

**Given:** ni = 1.5e10 cm^-3; mu_n = 1350 cm^2/V.s; mu_p = 480 cm^2/V.s

> [!success]- Answer
> **sigma_i = 4.40e-6 S/cm, rho_i = 2.27e5 ohm.cm; doping at 1e16 raised the conductivity by a factor of 4.9e5.**

> [!warning] Trap
> Using only the electron mobility. Intrinsic silicon has equal electron and hole populations, so the hole term contributes $480/1830 = 26\%$ of the total; dropping it makes $\sigma_i$ 26% too small and $\rho_i$ 35% too large.

<sub>from ECE-04-01</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| ECE-04-01 | Intrinsic, Extrinsic and Carrier Transport | 5 |
| ECE-04-02 | PN Junction and Depletion Region | 10 |
| ECE-04-03 | Diode Characteristics and Shockley | 5 |
| ECE-04-04 | Diode Models and Load Line | 5 |
| ECE-04-05 | Rectifiers: Half-Wave, Center-Tapped, Bridge | 10 |
| ECE-04-06 | Filters, Ripple Factor and PIV | 5 |
| ECE-04-07 | Clippers, Clampers and Multipliers | 5 |
| ECE-04-08 | Zener Diodes and Shunt Regulators | 5 |
| ECE-04-09 | BJT Structure and Operating Regions | 5 |
| ECE-04-10 | BJT Current Gains and Relationships | 5 |
| ECE-04-11 | JFET Characteristics and Pinch-Off | 5 |
| ECE-04-12 | MOSFET Types and Regions | 5 |
| ECE-04-13 | Thyristors: UJT, SCR, DIAC, TRIAC | 5 |
| ECE-04-14 | Optoelectronics and Solar Cells | 5 |
| ECE-04-15 | Special Diodes: Varactor, Schottky, Tunnel | 5 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
