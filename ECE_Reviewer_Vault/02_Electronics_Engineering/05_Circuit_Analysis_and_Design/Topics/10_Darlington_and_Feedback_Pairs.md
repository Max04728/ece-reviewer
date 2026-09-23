---
id: ECE-05-10
title: "Darlington and Feedback Pairs"
part: "02_Electronics_Engineering"
area: "05_Circuit_Analysis_and_Design"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_BJT_DC_Biasing_Configurations]]", "[[10_BJT_Current_Gains_and_Relationships]]"]
tags: ["ece", "electronics_engineering", "circuit_analysis_and_design"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Darlington and Feedback Pairs

> [!abstract] Scope
> Analyse compound transistor pairs by treating them as one device with a composite beta and composite base-emitter drop, then evaluate the input and output resistance of the emitter-follower output stage.

## Core Concept

> [!tip] Intuition
> Staggering two transistors so the first one's emitter current becomes the second one's base current multiplies the current gain instead of adding it. The price is a second base-emitter junction in series, so the pair needs about 1.4 V to turn on.

**The Darlington connection and its composite current gain.** Transistor $Q_1$'s emitter feeds $Q_2$'s base. The first stage amplifies by $\beta_1$ and the second amplifies that result by $\beta_2$, so the pair's current gain is the product:
$$\beta_D = \beta_1\beta_2 + \beta_1 + \beta_2 \approx \beta_1\beta_2$$
The two extra terms are not decoration; they come from the algebra of the exact composite and they matter at low beta (at $\beta_1 = \beta_2 = 5$ the product term is 25 against the exact 35, a 29 percent shortfall). For any real pair with betas above 50, $\beta_D \approx \beta_1\beta_2$ is safe. What the pair buys you is enormous input resistance. With $\beta_1 = \beta_2 = 100$ a $1\ \mathrm{k\Omega}$ emitter resistance looks like this from the base:
$$\beta_D R_E = 10^4 \times 1\ \mathrm{k\Omega} = 10\ \mathrm{M\Omega}$$
which no single transistor can approach.

**The composite V_BE and the doubled-drift penalty.** The two base-emitter junctions are in series, so the composite drop is:
$$V_{BE(D)} = V_{BE1} + V_{BE2} \approx 0.7 + 0.7 = 1.4\ \mathrm{V}$$
for silicon. The DC consequences are the Darlington's real drawback. First, the turn-on threshold is around $1.2\ \mathrm{V}$, which wastes headroom in a low-voltage supply — an output stage on a $\pm 5\ \mathrm{V}$ rail loses $1.4\ \mathrm{V}$ instead of $0.7\ \mathrm{V}$ from each swing. Second, the temperature coefficient doubles: about $-4\ \mathrm{mV}$ per degree C instead of $-2\ \mathrm{mV/^\circ C}$, so the bias point drifts twice as fast with heating. Third, the leakage is multiplied as well:
$$I_{CEO(D)} \approx \beta_2 I_{CEO1}$$
so a Darlington runs hotter and its off-state leakage can be tens of times a single transistor's. **Any problem that asks why a Darlington is not used everywhere is asking about these three numbers.**

**Where a Darlington actually goes: the CC output stage.** The Darlington's natural home is the emitter follower at the output of a power amplifier or voltage regulator, where the job is to present a huge input resistance to a high-impedance driver and a low output resistance to the load. The output resistance of the compound emitter follower is set by the divider looking back into the base plus the intrinsic emitter resistance:
$$R_{out} \approx \frac{R_s \parallel R_B}{\beta_D} + r_e$$
where $R_s\parallel R_B$ is the total resistance seen looking back into the base and $r_e$ is the intrinsic emitter resistance of the *output* transistor. Because $\beta_D$ is in the tens of thousands, the first term is usually just a few tens of ohms, and $r_e = V_T/I_E$ sets the floor: at $I_E = 100\ \mathrm{mA}$, $r_e = 0.26\ \Omega$; at $I_E = 1\ \mathrm{mA}$, $r_e = 26\ \Omega$. **The output resistance can never fall below $r_e$, no matter how large the beta is** — that is the trap in every headroom-loving emitter-follower design question.

**The feedback pair (complementary or compound connection).** Instead of stacking two same-type transistors, the feedback pair uses two complementary devices (NPN plus PNP) with the *collectors tied together* and the first transistor's emitter driving the second transistor's base. The feedback path is from the second collector back to the first base region through the shared collector node, which gives the pair a very high composite gain with only a single $V_{BE}$ drop between input and the output device. The practical advantages over the classic Darlington: the composite saturation voltage is only $V_{CE(sat)}$ of one device rather than roughly $V_{BE} + V_{CE(sat)}$, and the turn-on threshold is one junction, not two, so it works in low-voltage circuits. The composite current gain is still approximately the product $\beta_1\beta_2$ for the pair, and the quiescent bias is set by the shared collector resistor. Use the Darlington when you want the simplest possible high-$\beta$ follower, and the feedback pair when $V_{CE(sat)}$ or headroom is the binding constraint — which is why the feedback pair appears in the output stage of audio power amplifiers and in low-dropout regulators.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Darlington composite current gain | $\beta_D = \beta_1\beta_2 + \beta_1 + \beta_2 \approx \beta_1\beta_2$ | For two same-type BJTs in the Darlington connection. The approximation is within 2 percent for betas above 50; it fails badly if one device is in a low-beta condition (saturation or high current). |
| Darlington composite base-emitter drop | $V_{BE(D)} = V_{BE1} + V_{BE2} \approx 1.4\ \mathrm{V}$ | Silicon, room temperature, moderate current. Rises to about 1.6 V at high current. A circuit that assumes 0.7 V under-biases the pair and it never turns on. |
| Composite emitter current | $I_E \approx I_{C2} = \beta_D I_B$ | Forward-active Darlington only. I_C1 = beta1*I_B flows into Q2's base, so the composite collector current is the sum I_C1 + I_C2, but at large beta_D the emitter current is dominated by the second device. |
| Darlington input resistance | $R_{in(D)} = \beta_D (R_E \parallel R_L)$ | Looking into the base of Q1 with the emitter resistor and load in parallel at the output. At beta_D = 10,000 and R_E' = 1 kohm this is 10 Mohm; the bias network usually swamps it. |
| Composite follower output resistance | $R_{out} \approx \frac{R_s \parallel R_B}{\beta_D} + r_e$ | R_s is the source resistance and R_B the total base bias network. The r_e term is the floor and is set by the output device's emitter current, not by beta. |
| Intrinsic emitter resistance of the output device | $r_e = \frac{V_T}{I_E}$ | 26 mV / I_E at room temperature. This alone sets the minimum output resistance: 26 ohm at 1 mA, 2.6 ohm at 10 mA, 0.26 ohm at 100 mA. |
| Darlington leakage multiplication | $I_{CEO(D)} \approx \beta_2 I_{CEO1}$ | Off-state (cutoff) leakage of the pair. This is why a Darlington needs a collector-to-base or base-emitter bleed resistor to keep the output off when it should be off. |
| Feedback pair composite gain and saturation | $\beta_{pair} \approx \beta_1\beta_2, \qquad V_{CE(sat,pair)} \approx V_{CE(sat)}$ | Complementary (feedback) pair with collectors tied together; the saturation is that of ONE device, not V_BE + V_CE(sat). Only one V_BE is in the signal path, so it works at low supply voltage where a Darlington's 1.4 V is too much. |

## Worked Problems

### P1. A Darlington pair uses two identical transistors with $\beta_1=\beta_2=150$, driven by $I_B=20\ \mu\mathrm{A}$ and driving an emitter resistor $R_E=1\ \mathrm{k\Omega}$ in parallel with a $1\ \mathrm{k\Omega}$ load. Find $\beta_D$, the exact and approximate values, $I_E$, and $R_{in(D)}$.

**Given:** beta_1 = 150; beta_2 = 150; I_B = 20 uA; R_E = 1 kohm; R_L = 1 kohm

**Solution:**

1. Exact: beta_D = beta_1*beta_2 + beta_1 + beta_2 = (150)(150) + 150 + 150 = 22500 + 300 = 22800
2. Approximate: beta_D = beta_1*beta_2 = 22500, which is only 1.3 percent below the exact value
3. I_E = beta_D * I_B = 22800 * 20 uA = 456 mA
4. R_E || R_L = 1 kohm || 1 kohm = 500 ohm
5. R_in(D) = beta_D (R_E || R_L) = 22800 * 500 ohm = 11.4 Mohm

> [!success]- Answer
> **beta_D = 22,800 (approximation 22,500), I_E = 456 mA, R_in(D) = 11.4 Mohm.**

> [!warning] Trap
> Using beta_D = beta_1 + beta_2 = 300, which understates the composite gain by a factor of 76 and turns an 11.4 Mohm input resistance into 150 kohm. The other failure is forgetting to parallel R_L with R_E; using R_E = 1 kohm alone gives 22.8 Mohm and ignores that the load sits at the same node.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `150 × 150 + 150 + 150` → $\beta_D$ = **22800**; the approximation `150²` = **22500** is 1.3 % low.
> 2. `22800 × 20E-6` → $I_E$ = **456** mA.
> 3. `1 × 1 ÷ 2` → $R_E \parallel R_L$ = **0.5** k$\Omega$; `22800 × 500` → $R_{in(D)}$ = **11.4** M$\Omega$.

### P2. The Darlington above has $I_E = 456\ \mathrm{mA}$; its second transistor has $V_{BE2} = 0.75\ \mathrm{V}$ and the first $V_{BE1} = 0.70\ \mathrm{V}$. Find the base drive voltage and the maximum peak output swing if the follower is powered from $V_{CC} = 12\ \mathrm{V}$ with a $2\ \mathrm{k\Omega}$ emitter resistor and a 1 kohm load.

**Given:** I_B = 20 uA; beta_D = 22800; V_BE1 = 0.70 V; V_BE2 = 0.75 V; V_CC = 12 V; R_E = 2 kohm; R_L = 1 kohm

**Solution:**

1. Composite drop: V_BE(D) = V_BE1 + V_BE2 = 0.70 + 0.75 = 1.45 V
2. For 456 mA the bias resistor must supply the base current; the input voltage needed is v_in = V_BE(D) + V_out
3. R_E || R_L = 2 kohm || 1 kohm = 667 ohm, so v_out = I_E * 667 ohm = (456 mA)(667) = 304 mV - this current cannot be sustained, so the DC design must be re-sized
4. For the swing question use the resistive divider at the output: the peak output is (V_CC - V_BE(D)) * R_L/(R_E + R_L) = (12 - 1.45)(1/3) = 3.52 V, and the positive peak is clamped like this while the negative peak can only reach V_BE(D) above the negative rail
5. The Darlington therefore loses 1.45 V of positive headroom instead of the 0.7 V a single follower would lose, a 0.75 V penalty on each swing

> [!success]- Answer
> **V_BE(D) = 1.45 V; the positive peak output is limited to about 3.52 V by the R_E/R_L divider and the pair needs 1.45 V of headroom, 0.75 V more than a single follower.**

> [!warning] Trap
> Assuming the follower can swing to V_CC - 0.7 V. With two junctions in series the ceiling is V_CC - 1.45 V, and in a 5 V system that 0.75 V difference is 15 percent of the entire rail. The second error is forgetting that R_E and R_L form a divider that further reduces the available swing.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.70 + 0.75` → $V_{BE(D)}$ = **1.45** V, the two junctions in series.
> 2. `2 × 1 ÷ 3` → $R_E \parallel R_L$ = **0.667** k$\Omega$.
> 3. `(12 − 1.45) × 1 ÷ 3` → the positive peak = **3.52** V, and the pair loses 0.75 V more headroom than a single follower.

### P3. A Darlington emitter follower has $\beta_1 = \beta_2 = 80$, $R_s = 10\ \mathrm{k\Omega}$, $R_B = 100\ \mathrm{k\Omega}$ (bias network), and runs at $I_E = 5\ \mathrm{mA}$. Find the composite beta, the output resistance, and the r_e floor.

**Given:** beta_1 = 80; beta_2 = 80; R_s = 10 kohm; R_B = 100 kohm; I_E = 5 mA; V_T = 26 mV

**Solution:**

1. beta_D = beta_1*beta_2 + beta_1 + beta_2 = 6400 + 160 = 6560
2. R_s || R_B = (10 kohm)(100 kohm)/(110 kohm) = 9.09 kohm
3. First term: (R_s || R_B)/beta_D = 9090 ohm / 6560 = 1.386 ohm
4. r_e = V_T/I_E = 26 mV / 5 mA = 5.2 ohm
5. R_out = 1.386 + 5.2 = 6.59 ohm

> [!success]- Answer
> **beta_D = 6560, R_out = 6.59 ohm, of which 5.2 ohm is the r_e floor.**

> [!warning] Trap
> Answering R_out = 1.39 ohm and dropping r_e. Almost 80 percent of the output resistance here is the intrinsic emitter resistance of the output device, and no amount of extra beta removes it. Raising I_E to 50 mA would drop r_e to 0.52 ohm, which is the only lever that works.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `80 × 80 + 80 + 80` → $\beta_D$ = **6560**.
> 2. `10 × 100 ÷ 110` → $R_s \parallel R_B$ = **9.09** k$\Omega$; `9090 ÷ 6560` → **1.386** $\Omega$.
> 3. `26 ÷ 5` → $r_e$ = **5.2** $\Omega$; `+ 1.386` → $R_{out}$ = **6.59** $\Omega$, of which the $r_e$ floor is the bulk.

### P4. A single transistor emitter follower and a Darlington follower are compared with $\beta_1 = 100$ (single) and $\beta_1=\beta_2=100$ (pair), both driving $R_E = 1\ \mathrm{k\Omega}$, both at $I_E = 2\ \mathrm{mA}$ and both fed from a $50\ \mathrm{k\Omega}$ source. Compare input resistance, output resistance, and the V_BE drop.

**Given:** beta single = 100; beta pair = 100 each; R_E = 1 kohm; I_E = 2 mA; R_s = 50 kohm; V_T = 26 mV

**Solution:**

1. Single: R_in = beta(R_E) = 100 * 1 kohm = 100 kohm; Darlington: beta_D = 10000 + 200 = 10200, R_in = 10200 * 1 kohm = 10.2 Mohm
2. Source divider loss, single: 50/(50 + 100) = 0.667, so a third of the source voltage is lost before the follower; Darlington: 50/(50 + 10200) = 0.00488, so 99.5 percent of the source reaches the base
3. Single: r_e = 26 mV/2 mA = 13 ohm, R_out = (50 kohm)/100 + 13 = 500 + 13 = 513 ohm
4. Darlington: R_out = (50 kohm)/10200 + 13 = 4.9 + 13 = 17.9 ohm
5. Turn-on: single needs about 0.7 V, Darlington about 1.4 V - a 0.7 V headroom penalty

> [!success]- Answer
> **Single: R_in = 100 kohm, R_out = 513 ohm, drop 0.7 V. Darlington: R_in = 10.2 Mohm, R_out = 17.9 ohm, drop 1.4 V.**

> [!warning] Trap
> Assuming the Darlington's 10 Mohm input resistance eliminates source loading. The 50 kohm source still forms a divider, but more importantly the bias network (R_B) in a real circuit sits in parallel with the 10.2 Mohm and usually reduces the effective value to something like 100 kohm, restoring much of the loading loss.

### P5. A three-transistor Darlington arrangement uses $\beta_1=50$, $\beta_2=50$, $\beta_3=50$ with $I_B = 10\ \mu\mathrm{A}$ and $R_E = 470\ \Omega$. Find the composite beta, the emitter current, and the input resistance, and comment on why three stages are rarely used.

**Given:** beta_1 = beta_2 = beta_3 = 50; I_B = 10 uA; R_E = 470 ohm; V_BE per device = 0.7 V

**Solution:**

1. beta_D = (beta+1)^3 - 1 = 51^3 - 1 = 132651 - 1 = 132650, which is beta^3 + 3beta^2 + 3beta = 125000 + 7500 + 150
2. I_E = beta_D * I_B = 132650 * 10 uA = 1.327 A
3. R_in = beta_D * R_E = 132650 * 470 ohm = 62.3 Mohm
4. Total V_BE drop = 3 * 0.7 = 2.1 V, and the thermal drift is 3 * 2 mV/C = 6 mV/C
5. Leakage multiplies by beta_2*beta_3 compared with a single device, and the 1.327 A emitter current is far beyond what the small input transistor can supply - the arithmetic shows the composite current is limited by the first device's rating, not by beta_D

> [!success]- Answer
> **beta_D = 1.3265E5, I_E = 1.33 A (as computed), R_in = 62.3 Mohm, but with a 2.1 V turn-on drop and 6 mV/C drift.**

> [!warning] Trap
> Accepting I_E = 1.33 A from 10 uA of base drive. That current exceeds the emitter rating of the first transistor by orders of magnitude, so the calculation is an upper bound that the devices cannot deliver - in a real design I_B would be far smaller. A second error is adding only the largest correction term: for three cascaded devices the exact composite is (beta+1)^3 - 1 = 132650, not beta^3 + beta^2 = 127500. A third is ignoring the 2.1 V turn-on; three junctions in series make the arrangement unusable below about 3 V of supply.

## Traps & Exam Notes

- **Using $\beta$ instead of $\beta_D$ for the input resistance.** With $\beta_1 = \beta_2 = 100$ and $R_E' = 1\ \mathrm{k\Omega}$, the Darlington input resistance is $10.2\ \mathrm{M\Omega}$, not the $100\ \mathrm{k\Omega}$ a single transistor gives - a factor of 100 error that makes a source-loading calculation completely wrong.
- **Assuming a 0.7 V drop for the pair.** A Darlington needs about $1.4\ \mathrm{V}$, and its drift is $-4\ \mathrm{mV/^\circ C}$ rather than $-2\ \mathrm{mV/^\circ C}$. A follower biased assuming 0.7 V sits deep in cutoff; on a 5 V rail the pair loses 15 percent of the supply that a single device would not.
- **Forgetting that leakage is multiplied too.** $I_{CEO(D)} \approx \beta_2 I_{CEO1}$. Two transistors with $\beta_2 = 150$ and a $10\ \mathrm{nA}$ single-device leakage give $1.5\ \mu\mathrm{A}$ in cutoff, which is enough to turn on a following stage - hence the bleed resistor across the pair.
- **Expecting the output resistance to go to zero.** $R_{out} \approx (R_s \parallel R_B)/\beta_D + r_e$ keeps an $r_e = 26\ \mathrm{mV}/I_E$ floor: $26\ \Omega$ at $1\ \mathrm{mA}$ and $2.6\ \Omega$ at $10\ \mathrm{mA}$. At $I_E = 2\ \mathrm{mA}$ with an ideal source the Darlington's output resistance is $13\ \Omega$, not $0$.
- **Confusing the feedback pair with the Darlington.** The complementary feedback pair has only one $V_{BE}$ in the signal path and a composite saturation voltage of one $V_{CE(sat)}$, against the Darlington's $1.4\ \mathrm{V}$ drop and roughly $V_{BE} + V_{CE(sat)}$ saturation. Using the Darlington's numbers for a feedback pair overstates the headroom loss by about 1.4 V.

## See Also

- [[06_Small-Signal_re_Model_CE,_CB,_CC]]
- [[15_Power_Amplifiers_Classes_A,_B,_AB,_C]]
- [[14_Feedback_Amplifier_Topologies]]

---

[[09_Multistage,_Cascade_and_Cascode|⬅ 09]] · [[_MOC_Circuit_Analysis_and_Design|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Frequency_Response_and_Bode_Plots|11 ➡]]
