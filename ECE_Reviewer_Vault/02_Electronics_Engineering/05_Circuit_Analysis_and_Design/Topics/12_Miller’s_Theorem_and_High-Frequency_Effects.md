---
id: ECE-05-12
title: "Miller’s Theorem and High-Frequency Effects"
part: "02_Electronics_Engineering"
area: "05_Circuit_Analysis_and_Design"
topic: 12
tier: 2
depth: full
problem_count: 5
prereqs: ["[[07_Hybrid-Pi_Model]]", "[[11_Frequency_Response_and_Bode_Plots]]"]
tags: ["ece", "electronics_engineering", "circuit_analysis_and_design"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 12 — Miller’s Theorem and High-Frequency Effects

> [!abstract] Scope
> Replace a feedback impedance that bridges two nodes of an amplifier by two grounded equivalent impedances, then use the inflated input capacitance to predict the upper cutoff of a CE or CS stage and to justify the cascode.

## Core Concept

> [!tip] Intuition
> A capacitor bridging the input and the output is a spy that reports the output back to the input: the input node must supply not only its own charging current but also the current the amplified output swing demands through that capacitor. If the output swings in the opposite direction by a factor $|A_v|$, the tiny bridging capacitor looks $(1+|A_v|)$ times larger from the input, and that inflated capacitance is what crushes the bandwidth of a common-emitter stage.

**Miller's theorem: one impedance becomes two.** Whenever an impedance $Z$ connects node 1 to node 2 of a network, and the voltage gain between those two nodes is $A_v = V_2/V_1$, the impedance may be replaced by two grounded impedances: $Z_1 = Z/(1 - A_v)$ from node 1 to ground and $Z_2 = Z/(1 - 1/A_v)$ from node 2 to ground. The replacement is legitimate because the current drawn *through* $Z$ from node 1 is $i = (V_1 - V_2)/Z = V_1(1 - A_v)/Z$, which is exactly the current a grounded impedance $Z/(1-A_v)$ would draw from $V_1$. Nothing is approximated and no energy is created: the same current is merely re-routed to ground. The gain $A_v$ must be the gain measured with $Z$ already in place, because $Z$ loads both nodes; that is the single most common way the theorem is misapplied.

**The inverting-amplifier case is the one that matters.** For an inverting stage, $A_v = -|A_v|$, so $1 - A_v = 1 + |A_v|$ and the input-side equivalent becomes $C_{Mi} = C_f(1 + |A_v|)$ for a bridging capacitor. The output side uses $1 - 1/A_v = 1 + 1/|A_v|$, giving $C_{Mo} = C_f(1 + 1/|A_v|) \approx C_f$. The multiplication is therefore violently one-sided: a $2\ \mathrm{pF}$ collector-base capacitance on a stage with $A_v = -100$ appears as $C_{Mi} = 2(101) = 202\ \mathrm{pF}$ at the input, while at the output it appears as only $2.02\ \mathrm{pF}$. That asymmetry is why a CE stage's bandwidth is set by its input node and not by its collector node.

**Why the CE and CS stages lose their high-frequency response.** In a common-emitter stage the bridging element is $C_{bc}$ (the hybrid-pi $C_{\mu}$), and the multiplication factor is the stage's own gain, $1 + g_mR_L'$. With $g_m = 40\ \mathrm{mS}$ and $R_L' = 2\ \mathrm{k}\Omega$ the gain is $-80$ and $C_{\mu} = 3\ \mathrm{pF}$ becomes $243\ \mathrm{pF}$ at the base — larger than any capacitance the designer deliberately placed there. The dominant high-frequency pole is then $f_H = 1/(2\pi R_{th}C_{in})$ with $C_{in} = C_{\pi} + C_{bc}(1+g_mR_L')$ and $R_{th}$ the resistance seen at the input node (source resistance in parallel with the bias network and $r_{\pi}$). Because the multiplier contains the gain, and the gain falls as frequency rises, the Miller capacitance itself shrinks with frequency: the exact transfer function has a right-half-plane zero at $\omega = g_m/C_{bc}$ that stops the roll-off. The single-pole Miller model is still the right exam tool, but it is an approximation valid well below that zero.

**Defeating the Miller effect, and when the theorem fails.** The cascode puts a common-base (or common-gate) stage between the CE device and the load. The CB stage's input resistance is about $1/g_m \approx 25\ \Omega$ at $1\ \mathrm{mA}$, so the CE device now drives almost a short and its voltage gain collapses to $|A_{v1}| \approx g_m(1/g_m) = 1$. The Miller factor drops from $1 + g_mR_L'$ (81 in the example above) to about 2, and the input capacitance falls from $258\ \mathrm{pF}$ to $21\ \mathrm{pF}$ — more than a decade of bandwidth, with the overall gain preserved by the CB stage. A CB or CG stage used by itself has no Miller effect at all, because its input is the emitter (source) and the bridging capacitance is not connected from input to output. Watch the assumptions: Miller's theorem needs a well-defined, unilateral gain between the two nodes, so with a second coupling path (a feedback resistor, or $r_o$ bridging the stage) the exact answer requires nodal or two-port $y$-parameter analysis; and if $A_v$ is positive and greater than 1 the input equivalent becomes negative, which is a sign that the model, not the circuit, is broken.

**Reading the pole off a single dominant capacitance.** Once the Miller equivalent is in place, the stage is a simple RC low-pass:
$$f_H = 1/(2\pi R_{th}C_{in})$$
As a fast exam shortcut, $R$ in $\mathrm{k}\Omega$ and $C$ in $\mathrm{pF}$ give $f_H$ in $\mathrm{MHz}$ as $159.155/(RC)$. The reason is the unit conversion:
$$1/(2\pi\times10^{3}\times10^{-12}) = 1.59155\times10^{8}\ \mathrm{Hz}$$
The same pole reappears as a gain-bandwidth constant: raising $|A_v|$ multiplies $C_{Mi}$ and lowers $f_H$ by the same factor, so $|A_v|f_H$ is fixed by the transistor and the input-node resistance.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Miller impedance | $Z_{M} = \frac{Z}{1 - A_v}$ | Z bridges node 1 and node 2, and A_v = V_2/V_1 is the gain measured WITH Z in place. For a non-inverting gain greater than 1 the denominator goes negative and the equivalent impedance turns negative - a warning that the neutralised model does not apply. |
| Miller input-side equivalent impedance | $Z_1 = \frac{Z}{1 - A_v}$ | Impedance from node 1 to ground. With an inverting gain A_v = -100 the divisor is 1 - (-100) = 101, so the input sees an impedance 101 times smaller than Z. |
| Miller output-side equivalent impedance | $Z_2 = \frac{Z}{1 - 1/A_v}$ | Impedance from node 2 to ground. For large inverting gain 1/A_v is negligible, so Z_2 is approximately Z; the bridging element is not magnified at the output. |
| Miller input capacitance | $C_{Mi} = C_f\left(1 + \lvert A_v \rvert\right)$ | C_f is the capacitance bridging input and output: C_bc or C_mu for a BJT, C_gd for a FET, C_f for an op-amp. C_bc = 2 pF with A_v = -100 gives 202 pF. The result is in the same unit as C_f; no scaling is needed. |
| Miller output capacitance | $C_{Mo} = C_f\left(1 + \frac{1}{\lvert A_v \rvert}\right) \approx C_f$ | Same bridging capacitor seen from the output node. With C_f = 2 pF and \|A_v\| = 100 it is 2.02 pF, not 202 pF. Using the input-side value at the output is the classic two-sided error. |
| Miller pole (upper cutoff) | $\tau_H = R_{th}C_{Mi}, \qquad f_H = \frac{1}{2\pi R_{th}C_{Mi}}$ | R_th is the total resistance at the input node (R_s parallel R_B parallel r_pi), never R_s alone. R_th in k-ohm with C in pF gives f_H in MHz as 159.155/(R_th C). |
| CE stage input capacitance and cutoff | $C_{in} = C_{\pi} + C_{bc}\left(1 + g_mR_L'\right), \qquad f_H = \frac{1}{2\pi R_{th}\left[C_{\pi} + C_{bc}\left(1 + g_mR_L'\right)\right]}$ | C_pi sits directly at the input and is NOT multiplied; only the bridging C_bc is. R_L' is the total AC load at the collector, so the multiplier equals the stage's own voltage gain magnitude g_m R_L'. |
| Cascode input capacitance | $C_{in,cascode} \approx C_{\pi} + 2C_{bc}$ | The CB stage presents about 1/g_m at the CE collector, so the first device's gain is only about 1 and the Miller factor falls from 1 + g_m R_L' to 2. With C_bc = 3 pF the input capacitance falls from 258 pF (gain 80) to 21 pF. |

## Worked Problems

### P1. A common-emitter stage has $C_{bc} = 2\ \mathrm{pF}$ and a midband inverting gain $A_v = -100$. The resistance seen at the input node is $R_{th} = 1\ \mathrm{k}\Omega$ and the transistor's own $C_{\pi} = 10\ \mathrm{pF}$. Find the Miller input capacitance, the total input capacitance and the high-frequency cutoff.

**Given:** $C_{bc} = 2\ \mathrm{pF}$; $A_v = -100$; $R_{th} = 1\ \mathrm{k}\Omega$; $C_{\pi} = 10\ \mathrm{pF}$

**Solution:**

1. The bridging capacitance is multiplied by $1 + |A_v| = 1 + 100 = 101$, so $C_{Mi} = C_{bc}(1 + |A_v|) = 2(101) = 202\ \mathrm{pF}$.
2. The transistor's own input capacitance sits in parallel: $C_{in} = C_{\pi} + C_{Mi} = 10 + 202 = 212\ \mathrm{pF}$.
3. Time constant: $\tau_H = R_{th}C_{in} = (1\times10^{3})(212\times10^{-12}) = 2.12\times10^{-7}\ \mathrm{s}$.
4. Cutoff: $f_H = \dfrac{1}{2\pi\tau_H} = \dfrac{1}{2\pi(2.12\times10^{-7})} = \dfrac{1}{1.332\times10^{-6}} = 750.8\ \mathrm{kHz}$.
5. Shortcut check: $f_H = 159.155/(R_{th\,(\mathrm{k}\Omega)}\times C_{in\,(\mathrm{pF})}) = 159.155/212 = 0.7507\ \mathrm{MHz}$, agreeing with the time-constant route.
6. Contrast: ignoring the Miller effect, $C_{in}$ would be only $C_{\pi} + C_{bc} = 12\ \mathrm{pF}$ and $f_H = 159.155/12 = 13.26\ \mathrm{MHz}$, so the Miller effect costs a factor of $212/12 = 17.7$ in bandwidth.

> [!success]- Answer
> **$C_{Mi} = 202\ \mathrm{pF}$, $C_{in} = 212\ \mathrm{pF}$ and $f_H = 751\ \mathrm{kHz}$ (versus $13.3\ \mathrm{MHz}$ if the Miller effect were ignored)**

> [!warning] Trap
> Sign error in Miller's theorem. Using $A_v = +100$ makes the divisor $1 - 100 = -99$ and gives $C_{Mi} = 2/(-99) = -20.2\ \mathrm{pF}$, a negative capacitance. The divisor for an inverting stage is $1 - (-|A_v|) = 1 + |A_v| = 101$, always one more than the gain magnitude.

### P2. A CE amplifier with $g_m = 40\ \mathrm{mS}$ drives an AC collector load $R_L' = 2\ \mathrm{k}\Omega$. It has $C_{\pi} = 15\ \mathrm{pF}$ and $C_{\mu} = 3\ \mathrm{pF}$, and the Thevenin resistance at its base is $R_{th} = 1\ \mathrm{k}\Omega$. Find the midband gain, the total input capacitance, the upper cutoff and the gain-bandwidth product.

**Given:** $g_m = 40\ \mathrm{mS}$; $R_L' = 2\ \mathrm{k}\Omega$; $C_{\pi} = 15\ \mathrm{pF}$; $C_{\mu} = 3\ \mathrm{pF}$; $R_{th} = 1\ \mathrm{k}\Omega$

**Solution:**

1. Midband gain: $A_v = -g_mR_L' = -(40\times10^{-3})(2\times10^{3}) = -80$.
2. Miller multiplication of the bridging capacitor: $C_{Mi} = C_{\mu}(1 + |A_v|) = 3(1 + 80) = 243\ \mathrm{pF}$.
3. Total input capacitance: $C_{in} = C_{\pi} + C_{Mi} = 15 + 243 = 258\ \mathrm{pF}$.
4. Upper cutoff: $f_H = 159.155/(1\times258) = 0.6169\ \mathrm{MHz} = 616.9\ \mathrm{kHz}$.
5. Time-constant check: $\tau_H = (10^{3})(258\times10^{-12}) = 2.58\times10^{-7}\ \mathrm{s}$ and $1/(2\pi\tau_H) = 616.9\ \mathrm{kHz}$.
6. Gain-bandwidth product: $|A_v|f_H = 80 \times 616.9\ \mathrm{kHz} = 49.4\ \mathrm{MHz}$ - the quantity that stays fixed if the stage is later traded for gain.

> [!success]- Answer
> **$A_v = -80$, $C_{in} = 258\ \mathrm{pF}$, $f_H = 617\ \mathrm{kHz}$ and $|A_v|f_H = 49.4\ \mathrm{MHz}$**

> [!warning] Trap
> Forgetting the multiplication and using $C_{\pi} + C_{\mu} = 18\ \mathrm{pF}$, which gives $f_H = 159.155/18 = 8.84\ \mathrm{MHz}$ - an answer 14 times too optimistic. The whole point of the Miller analysis is that the 3 pF bridging capacitor, not the 15 pF base capacitance, dominates the input node.

### P3. The same device ($g_m = 40\ \mathrm{mS}$, $C_{\pi} = 15\ \mathrm{pF}$, $C_{\mu} = 3\ \mathrm{pF}$, $R_{th} = 1\ \mathrm{k}\Omega$) is placed in a cascode whose CB stage presents $1/g_m = 25\ \Omega$ at the CE collector. Find the CE device's own gain, the new input capacitance and the new upper cutoff, and state the improvement over the single-stage 617 kHz.

**Given:** $g_m = 40\ \mathrm{mS}$; $C_{\pi} = 15\ \mathrm{pF}$; $C_{\mu} = 3\ \mathrm{pF}$; $R_{th} = 1\ \mathrm{k}\Omega$; $R_{in,CB} = 1/g_m = 25\ \Omega$

**Solution:**

1. The CE device now drives only the CB input resistance: $|A_{v1}| = g_mR_{in,CB} = (40\times10^{-3})(25) = 1.0$.
2. New Miller factor: $1 + |A_{v1}| = 2$, so $C_{Mi} = C_{\mu}(2) = 6\ \mathrm{pF}$.
3. New input capacitance: $C_{in} = C_{\pi} + 6 = 15 + 6 = 21\ \mathrm{pF}$.
4. New cutoff: $f_H = 159.155/(1\times21) = 7.579\ \mathrm{MHz}$.
5. Improvement: the capacitance ratio is $258/21 = 12.3$, and $617\ \mathrm{kHz}\times12.3 = 7.59\ \mathrm{MHz}$, matching the direct calculation.
6. The overall cascode gain is unchanged in magnitude, because the CB stage passes the same current to the collector load: the CE stage's lost gain is made up by the CB stage's current gain of approximately 1 into $R_L'$.

> [!success]- Answer
> **$|A_{v1}| \approx 1$, $C_{in} \approx 21\ \mathrm{pF}$, $f_H \approx 7.58\ \mathrm{MHz}$ - a 12.3x bandwidth improvement**

> [!warning] Trap
> Concluding that the cascode removes $C_{\mu}$ from the circuit. The capacitor is still connected from base to collector; what disappears is the multiplication, which falls from $1 + g_mR_L' = 81$ to about 2. Students who write $C_{in} = C_{\pi} = 15\ \mathrm{pF}$ then predict 10.6 MHz instead of 7.58 MHz.

### P4. An inverting amplifier has $C_f = 2\ \mathrm{pF}$ from input to output with $A_v = -50$, an input-node resistance of $2.2\ \mathrm{k}\Omega$ and an output-node resistance of $5\ \mathrm{k}\Omega$. Find both Miller equivalent capacitances and both pole frequencies, and identify the dominant pole.

**Given:** $C_f = 2\ \mathrm{pF}$; $A_v = -50$; $R_{in} = 2.2\ \mathrm{k}\Omega$; $R_{out} = 5\ \mathrm{k}\Omega$

**Solution:**

1. Input side: $C_{Mi} = C_f(1 + |A_v|) = 2(51) = 102\ \mathrm{pF}$.
2. Input pole: $f_{in} = 159.155/(2.2\times102) = 159.155/224.4 = 0.7093\ \mathrm{MHz} = 709\ \mathrm{kHz}$.
3. Output side: $C_{Mo} = C_f\left(1 + 1/|A_v|\right) = 2(1 + 0.02) = 2.04\ \mathrm{pF}$.
4. Output pole: $f_{out} = 159.155/(5\times2.04) = 159.155/10.2 = 15.60\ \mathrm{MHz}$.
5. The input pole is $15.60/0.709 = 22$ times lower in frequency, so it is the dominant pole and the overall upper cutoff is essentially $f_H \approx 709\ \mathrm{kHz}$.
6. Cross-check with the time constant: $\tau = (2.2\times10^{3})(102\times10^{-12}) = 2.244\times10^{-7}\ \mathrm{s}$, and $1/(2\pi\tau) = 709.3\ \mathrm{kHz}$.

> [!success]- Answer
> **$C_{Mi} = 102\ \mathrm{pF}$ giving $f_{in} = 709\ \mathrm{kHz}$, and $C_{Mo} = 2.04\ \mathrm{pF}$ giving $f_{out} = 15.6\ \mathrm{MHz}$; the input pole dominates by 22x**

> [!warning] Trap
> Assuming the bridging capacitor is multiplied at both ends and using $C_{Mo} = 102\ \mathrm{pF}$. The output sees only $C_f(1 + 1/|A_v|) = 2.04\ \mathrm{pF}$, 2% above $C_f$ itself. The wrong value puts the output pole at $159.155/(5\times102) = 312\ \mathrm{kHz}$ and would falsely make the output the dominant pole.

### P5. A stage whose input node presents $R_{th} = 4.7\ \mathrm{k}\Omega$ must reach $f_H = 100\ \mathrm{kHz}$ while delivering a midband gain of $-150$. Find the largest total input capacitance the pole allows and the largest bridging capacitance $C_f$ that can be tolerated, ignoring $C_{\pi}$.

**Given:** $R_{th} = 4.7\ \mathrm{k}\Omega$; $f_H = 100\ \mathrm{kHz}$; $A_v = -150$

**Solution:**

1. Required time constant: $\tau_H = \dfrac{1}{2\pi f_H} = \dfrac{1}{2\pi\times10^{5}} = 1.5915\times10^{-6}\ \mathrm{s}$.
2. Allowed input capacitance: $C_{in} = \dfrac{\tau_H}{R_{th}} = \dfrac{1.5915\times10^{-6}}{4.7\times10^{3}} = 3.386\times10^{-10}\ \mathrm{F} = 338.6\ \mathrm{pF}$.
3. The Miller factor for this gain is $1 + |A_v| = 151$.
4. Therefore $C_f = \dfrac{C_{in}}{1 + |A_v|} = \dfrac{338.6}{151} = 2.243\ \mathrm{pF}$.
5. Check: $C_{Mi} = 2.243\times151 = 338.7\ \mathrm{pF}$ and $f_H = 159.155/(4.7\times338.7) = 0.1000\ \mathrm{MHz}$, as required.
6. If the device also has $C_{\pi} = 20\ \mathrm{pF}$ at that node, the budget for the Miller capacitance drops to $338.6 - 20 = 318.6\ \mathrm{pF}$ and $C_f \le 318.6/151 = 2.11\ \mathrm{pF}$.

> [!success]- Answer
> **$C_{in} \le 338.6\ \mathrm{pF}$, hence $C_f \le 2.24\ \mathrm{pF}$ (2.11 pF once $C_{\pi} = 20\ \mathrm{pF}$ is subtracted)**

> [!warning] Trap
> Dividing by $|A_v|$ instead of $1 + |A_v|$. The Miller multiplier for an inverting stage is always one greater than the gain magnitude, so $C_f = 338.6/150 = 2.257\ \mathrm{pF}$ is wrong; the error is small at $|A_v| = 150$ but becomes 1% at $|A_v| = 100$ and blows up completely at $|A_v| = 1$. Far worse is using $1 - A_v$ with a positive $A_v$, which yields a negative $C_f$.

## Traps & Exam Notes

- **Sign error in $1 - A_v$.** For an inverting stage with $|A_v| = 100$ the divisor is $1 - (-100) = 101$; substituting $A_v = +100$ gives $1 - 100 = -99$ and a negative capacitance of $-20.2\ \mathrm{pF}$ for $C_f = 2\ \mathrm{pF}$. A negative equivalent capacitance is never physical - it always means the sign of $A_v$ was dropped.
- **Multiplying the output side as well.** $C_{Mi} = C_f(1+|A_v|) = 202\ \mathrm{pF}$ but $C_{Mo} = C_f(1 + 1/|A_v|) = 2.02\ \mathrm{pF}$ when $|A_v| = 100$. Using 202 pF at an output node with $R_{out} = 5\ \mathrm{k}\Omega$ predicts a $157.6\ \mathrm{kHz}$ output pole instead of the correct $15.76\ \mathrm{MHz}$.
- **Using the source resistance alone for $R_{th}$.** The input node sees $R_s \parallel R_B \parallel r_{\pi}$. With $R_s = 1\ \mathrm{k}\Omega$, $R_B = 100\ \mathrm{k}\Omega$ and $r_{\pi} = 1\ \mathrm{k}\Omega$, $R_{th} = 497.5\ \Omega \approx 500\ \Omega$, so a $212\ \mathrm{pF}$ input capacitance gives $f_H = 1.50\ \mathrm{MHz}$, not the $751\ \mathrm{kHz}$ obtained from $R_s$ alone - a factor-of-two error in the answer.
- **Forgetting that $C_{\pi}$ shares the input node.** The Miller capacitance is in parallel with $C_{\pi}$, not instead of it. With $C_{bc} = 2\ \mathrm{pF}$, $|A_v| = 100$ and $C_{\pi} = 10\ \mathrm{pF}$ the node carries $212\ \mathrm{pF}$, so neglecting $C_{\pi}$ overstates $f_H$ by $212/202 = 5\%$.
- **Believing the cascode deletes $C_{bc}$.** The capacitor stays; only its multiplier collapses from $1 + g_mR_L'$ to about 2, taking $C_{in}$ from $258\ \mathrm{pF}$ down to $21\ \mathrm{pF}$. Writing $C_{in} = C_{\pi} = 15\ \mathrm{pF}$ predicts $10.6\ \mathrm{MHz}$ instead of the correct $7.58\ \mathrm{MHz}$.
- **Treating the single Miller pole as the whole story.** The exact CE transfer function also carries a zero near $\omega = g_m/C_{bc}$, which flattens the 20 dB/decade roll-off at high frequency. Reading $|A_v|f_H$ from the $-3\ \mathrm{dB}$ point therefore underestimates the true unity-gain frequency $f_T$; the two agree only to within tens of percent.

## See Also

- [[11_Frequency_Response_and_Bode_Plots]]
- [[13_Gain-Bandwidth_Product_and_fT]]
- [[07_Hybrid-Pi_Model]]
- [[09_Multistage,_Cascade_and_Cascode]]
- [[10_Bode_Plots_and_Margins]]

---

[[11_Frequency_Response_and_Bode_Plots|⬅ 11]] · [[_MOC_Circuit_Analysis_and_Design|MOC]] · [[00_Dashboard|Dashboard]] · [[13_Gain-Bandwidth_Product_and_fT|13 ➡]]
