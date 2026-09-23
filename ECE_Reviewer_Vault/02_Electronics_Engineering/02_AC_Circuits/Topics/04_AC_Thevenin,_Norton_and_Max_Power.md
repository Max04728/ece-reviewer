---
id: ECE-02-04
title: "AC Thevenin, Norton and Max Power"
part: "02_Electronics_Engineering"
area: "02_AC_Circuits"
topic: 4
tier: 2
depth: full
problem_count: 4
prereqs: ["[[02_Phasors_and_Complex_Impedance]]", "[[03_Series_and_Parallel_AC_Analysis]]"]
tags: ["ece", "electronics_engineering", "ac_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 04 — AC Thevenin, Norton and Max Power

> [!abstract] Scope
> How do you collapse a linear AC network into one complex source and impedance, and which load impedance then absorbs the largest possible average power?

## Core Concept

> [!tip] Intuition
> An AC network seen from a port behaves like a single phasor voltage source behind a single complex impedance, exactly as in DC except that the impedance and the voltage are complex numbers. The load then faces a fixed source, and the largest average power is delivered when the load cancels the source reactance and matches the source resistance - a geometric mirror of $\mathbf{Z}_{Th}$ across the real axis.

**The port reduction.** Thevenin's theorem survives the move to AC unchanged in form and much richer in content. Any linear network with a pair of terminals $a$-$b$ - resistors, inductors, capacitors, independent sources, dependent sources, all at one frequency - can be replaced at those terminals by $\mathbf{V}_{Th}$ in series with $\mathbf{Z}_{Th}$. $\mathbf{V}_{Th}$ is the open-circuit phasor measured at $a$-$b$ with the load removed, and $\mathbf{Z}_{Th}$ is the impedance seen looking into the port with every **independent** source killed (voltage sources shorted, current sources opened). The Norton form is the same object written as a current source: $\mathbf{I}_N$ in parallel with $\mathbf{Z}_N$, where the source value is:
$$\mathbf{I}_N = \mathbf{V}_{Th}/\mathbf{Z}_{Th}$$
and the impedance is simply:
$$\mathbf{Z}_N = \mathbf{Z}_{Th}$$
Because everything is complex, the equivalent must be reported as a magnitude *and* an angle, or as $R + jX$. A Thevenin voltage quoted as "$50$ V" with no angle, or an impedance quoted as "$10\ \Omega$" with no sign on the reactance, is an incomplete answer that cannot be used for anything downstream.

**Why dependent sources break the shortcut.** Killing the independent sources and reading the driving-point impedance is valid only when no dependent source is present, because a dependent source is not an excitation that can be set to zero - it is a constraint that still responds to whatever test signal you apply. With dependent sources the safe route is always the ratio:
$$\mathbf{Z}_{Th} = \mathbf{V}_{oc}/\mathbf{I}_{sc}$$
— compute the open-circuit port voltage, then short the port and compute the current through the short, then divide. Equivalently, apply a test phasor $\mathbf{I}_{test}$ into the port, measure $\mathbf{V}_{test}$, and take the ratio:
$$\mathbf{Z}_{Th} = \mathbf{V}_{test}/\mathbf{I}_{test}$$
with only the independent sources killed so the dependent sources stay alive. The two routes must agree by construction, which makes the test-source computation a free arithmetic check on the $\mathbf{V}_{oc}/\mathbf{I}_{sc}$ result. If the network contains no independent source at all, $\mathbf{Z}_{Th}$ is simply the driving-point impedance and $\mathbf{V}_{Th} = 0$.

**Choosing the load.** With the Thevenin impedance fixed as:
$$\mathbf{Z}_{Th} = R_{Th} + jX_{Th}$$
and both $R_L$ and $X_L$ of the load freely adjustable, write the average power in the load as:
$$P = \frac{|\mathbf{V}_{Th}|^{2}R_L}{|\mathbf{Z}_{Th}+\mathbf{Z}_L|^{2}} = \frac{|\mathbf{V}_{Th}|^{2}R_L}{(R_{Th}+R_L)^{2}+(X_{Th}+X_L)^{2}}$$
and maximise it in two independent moves. The reactance appears only as a squared penalty, so $X_L = -X_{Th}$ zeroes it: the load must *cancel* the source reactance, not copy it. The surviving $R_L/(R_{Th}+R_L)^{2}$ is then maximised by $R_L = R_{Th}$, the ordinary DC calculation. The optimum is therefore the complex conjugate:
$$\mathbf{Z}_L = \mathbf{Z}_{Th}^{*}$$
giving the peak-amplitude maximum:
$$P_{max} = |\mathbf{V}_{Th}|^{2}/(8R_{Th})$$
when $\mathbf{V}_{Th}$ is a **peak-amplitude** phasor. If the source is quoted in RMS the same physical power becomes:
$$P_{max} = |\mathbf{V}_{Th,rms}|^{2}/(4R_{Th})$$
— the factor changes from 8 to 4 not because AC differs from DC but because an RMS phasor is smaller than a peak phasor by $\sqrt{2}$. If $X_L$ is not adjustable the conjugate match is unavailable and the best real load is:
$$R_L = \sqrt{R_{Th}^{2}+(X_{Th}+X_L)^{2}}$$
which reduces to $R_L = |\mathbf{Z}_{Th}|$ for a purely resistive load. Efficiency at the match is only 50%, since half the generated power is burned inside $\mathbf{Z}_{Th}$ - which is why maximum-power transfer is a communications criterion, not a power-engineering one.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Thevenin voltage | $\mathbf{V}_{Th} = \mathbf{V}_{ab(oc)}$ | The open-circuit port phasor with the load removed; keep the reference polarity you will use for the load. |
| Thevenin impedance from the port ratio | $\mathbf{Z}_{Th} = \frac{\mathbf{V}_{oc}}{\mathbf{I}_{sc}}$ | Always valid, and the only safe route when dependent sources are present. $\mathbf{I}_{sc}$ must be measured through the short in the same reference direction as $\mathbf{V}_{oc}$. |
| Test-source form | $\mathbf{Z}_{Th} = \frac{\mathbf{V}_{test}}{\mathbf{I}_{test}}$ | Kill only the independent sources; the dependent sources must remain active or the answer is wrong. |
| Norton-to-Thevenin conversion | $\mathbf{I}_N = \frac{\mathbf{V}_{Th}}{\mathbf{Z}_{Th}}, \qquad \mathbf{Z}_N = \mathbf{Z}_{Th}$ | Complex division: both magnitude and angle change. $\mathbf{Z}_N$ of a parallel network is the parallel combination, not the sum. |
| Conjugate match | $\mathbf{Z}_L = \mathbf{Z}_{Th}^{*} = R_{Th} - jX_{Th}$ | $X_L$ must cancel $X_{Th}$. Setting $\mathbf{Z}_L = \mathbf{Z}_{Th}$ doubles the reactance instead of removing it. |
| Maximum average power (peak phasor) | $P_{max} = \frac{\lvert \mathbf{V}_{Th} \rvert^{2}}{8R_{Th}}$ | Uses a peak-amplitude phasor. The 8 is the DC 4 with $\|\mathbf{V}_{peak}\|^{2} = 2\|\mathbf{V}_{rms}\|^{2}$ folded in. |
| Maximum average power (RMS phasor) | $P_{max} = \frac{\lvert \mathbf{V}_{Th,rms} \rvert^{2}}{4R_{Th}}$ | Same physical power as the factor-8 form. Mixing the two costs a clean factor of 2. |
| Optimum real load when $X_L$ is fixed | $R_L = \sqrt{R_{Th}^{2}+(X_{Th}+X_L)^{2}}$ | For a purely resistive load this is $R_L = \|\mathbf{Z}_{Th}\|$, which exceeds $R_{Th}$ whenever the source is reactive. |
| Load current and power | $\mathbf{I}_L = \frac{\mathbf{V}_{Th}}{\mathbf{Z}_{Th}+\mathbf{Z}_L}, \qquad P = \lvert \mathbf{I}_{L,rms} \rvert^{2}R_L$ | Only $R_L$ dissipates average power; $\|\mathbf{I}\|^{2}$ must use the RMS magnitude for this form. |

## Worked Problems

### P1. A network drives terminals $a$-$b$. A current source $\mathbf{I}_s = 2\angle 0^\circ$ A rms feeds node $a$; a resistor $R = 25\ \Omega$ and a capacitor of reactance $-j25\ \Omega$ sit in parallel across $a$-$b$; and a voltage-controlled current source $0.04\mathbf{V}_{ab}$ leaves node $a$. Find $\mathbf{Z}_{Th}$ of the network at those terminals.

**Given:** I_s = 2 angle 0 deg A rms (into node a); R = 25 ohm (parallel across a-b); Z_C = -j25 ohm (parallel across a-b); VCCS = 0.04 V_ab leaving node a

**Solution:**

1. Open-circuit port. KCL at node $a$ with the load removed: $\mathbf{I}_s = \frac{\mathbf{V}_{oc}}{25} + \frac{\mathbf{V}_{oc}}{-j25} + 0.04\mathbf{V}_{oc}$.
2. Evaluate the admittances: $\frac{1}{25} = 0.04$ S and $\frac{1}{-j25} = +j0.04$ S, so $2 = \mathbf{V}_{oc}(0.08 + j0.04)$.
3. Solve: $\mathbf{V}_{oc} = \frac{2}{0.08+j0.04} = \frac{2}{0.04(2+j)} = \frac{50}{2+j} = \frac{50(2-j)}{5} = 20 - j10$ V rms, i.e. $22.36\angle-26.57^\circ$ V rms.
4. Short-circuit port. $\mathbf{V}_{ab} = 0$ makes the VCCS output zero and puts zero volts across $R$ and $C$, so the entire source current flows through the short: $\mathbf{I}_{sc} = 2\angle 0^\circ$ A rms.
5. Divide: $\mathbf{Z}_{Th} = \frac{\mathbf{V}_{oc}}{\mathbf{I}_{sc}} = \frac{20-j10}{2} = 10 - j5\ \Omega$, i.e. $11.18\angle-26.57^\circ\ \Omega$.
6. Independent check by test source (independent source opened, VCCS left alive): $\mathbf{Z}_{Th} = \frac{1}{0.08+j0.04} = \frac{25}{2+j} = \frac{25(2-j)}{5} = 10-j5\ \Omega$. The two routes agree, which confirms the result.

> [!success]- Answer
> **$\mathbf{Z}_{Th} = 10 - j5\ \Omega$ (with $\mathbf{V}_{oc} = 20-j10$ V rms and $\mathbf{I}_{sc} = 2\angle 0^\circ$ A rms)**

> [!warning] Trap
> Opening the *dependent* source along with the independent one and calling the result $\mathbf{Z}_{Th}$. That gives $25\parallel(-j25) = 12.5 - j12.5\ \Omega$ - the resistance is 25% high, the reactance is 2.5 times too large, and the angle comes out $-45^\circ$ instead of $-26.57^\circ$. A VCCS does not switch off when you deactivate the independent source.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2×0.08÷(0.08²+0.04²) : −2×0.04÷(0.08²+0.04²)` → $\mathbf{V}_{oc} = 20 - j10$ V rms ($22.36\angle-26.57^\circ$ V rms).
> 2. `20÷2 : −10÷2` → $\mathbf{Z}_{Th} = 10 - j5$ Ω; `SHIFT` `Pol(` `10` `,` `−5` `)` → **11.18** Ω at **−26.57**°.
> 3. `0.08÷(0.08²+0.04²) : −0.04÷(0.08²+0.04²)` → **10** and **−5** again, so the test-source route $1/\mathbf{Y}$ agrees.
>
> The dependent source stays alive: its $0.04\mathbf{V}_{oc}$ merges into the 0.08 S conductance, it is not deleted with the independent source.

### P2. A source has peak-amplitude Thevenin phasor $\mathbf{V}_{Th} = 40\angle 0^\circ$ V and $\mathbf{Z}_{Th} = 30 + j40\ \Omega$. (a) Find $\mathbf{Z}_L$ for maximum average power transfer. (b) Find $P_{max}$. (c) Find the best purely resistive load and the power it receives.

**Given:** V_Th = 40 angle 0 deg V (peak-amplitude phasor); Z_Th = 30 + j40 ohm; Part (c): X_L = 0 (resistive load only)

**Solution:**

1. (a) Conjugate match: $\mathbf{Z}_L = \mathbf{Z}_{Th}^{*} = 30 - j40\ \Omega$.
2. (b) With $\mathbf{Z}_L = 30-j40$ the reactances cancel and the total series impedance is $60 + j0\ \Omega$.
3. Peak current $|\mathbf{I}| = 40/60 = 0.6667$ A, so $P = \frac{1}{2}|\mathbf{I}|^{2}R_L = \frac{1}{2}(0.6667)^{2}(30) = 6.667$ W.
4. Cross-check with the closed form for a peak phasor: $P_{max} = \frac{|\mathbf{V}_{Th}|^{2}}{8R_{Th}} = \frac{40^{2}}{8(30)} = \frac{1600}{240} = 6.667$ W.
5. (c) With $X_L = 0$, differentiate $P = \frac{1}{2}\frac{1600\,R_L}{(30+R_L)^{2}+40^{2}}$; the maximum is at $R_L = |\mathbf{Z}_{Th}| = \sqrt{30^{2}+40^{2}} = 50\ \Omega$.
6. $|\mathbf{Z}_{total}| = |80+j40| = 89.443\ \Omega$, $|\mathbf{I}| = 40/89.443 = 0.4472$ A, and $P = \frac{1}{2}(0.4472)^{2}(50) = 5.000$ W.

> [!success]- Answer
> **(a) $\mathbf{Z}_L = 30 - j40\ \Omega$; (b) $P_{max} = 6.667$ W; (c) $R_L = 50\ \Omega$ giving $P = 5.000$ W**

> [!warning] Trap
> Matching the impedance instead of its conjugate. Choosing $\mathbf{Z}_L = \mathbf{Z}_{Th} = 30 + j40\ \Omega$ leaves $\mathbf{Z}_{total} = 60 + j80\ \Omega$, so $|\mathbf{I}| = 0.4$ A and $P = 2.4$ W instead of 6.667 W. Reactance must be cancelled, never duplicated.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `√(30²+40²) : 40²÷(8×30)` → $\lvert \mathbf{Z}_{Th} \rvert = R_L$ = **50** Ω → $P_{max}$ = **6.667** W.
> 2. `SHIFT` `Pol(` `80` `,` `40` `)` → $\lvert \mathbf{Z}_{total} \rvert$ = **89.443** Ω; `0.5×(40÷X)²×50` → $P$ = **5.000** W for the purely resistive load.
>
> The factor 8 belongs to a peak phasor; an RMS $\mathbf{V}_{Th}$ needs $\lvert \mathbf{V}_{Th} \rvert^2/(4R_{Th})$ instead.

### P3. A source $\mathbf{V}_s = 100\angle 0^\circ$ V rms feeds $\mathbf{Z}_1 = 6 + j8\ \Omega$ in series with $\mathbf{Z}_2 = 8 - j6\ \Omega$. Terminals $a$-$b$ are across $\mathbf{Z}_2$. Find $\mathbf{V}_{Th}$, $\mathbf{Z}_{Th}$, the load for maximum average power, and $P_{max}$.

**Given:** V_s = 100 angle 0 deg V rms; Z_1 = 6 + j8 ohm (series); Z_2 = 8 - j6 ohm (shunt, across a-b)

**Solution:**

1. $\mathbf{Z}_1+\mathbf{Z}_2 = (6+j8)+(8-j6) = 14 + j2\ \Omega$.
2. Open-circuit port voltage by voltage division: $\mathbf{V}_{Th} = 100\cdot\frac{8-j6}{14+j2}$.
3. Evaluate the ratio: $\frac{8-j6}{14+j2} = \frac{(8-j6)(14-j2)}{14^{2}+2^{2}} = \frac{100-j100}{200} = 0.5 - j0.5$.
4. $\mathbf{V}_{Th} = 100(0.5-j0.5) = 50 - j50$ V rms, i.e. $70.71\angle-45^\circ$ V rms.
5. $\mathbf{Z}_{Th} = \mathbf{Z}_1\parallel\mathbf{Z}_2 = \frac{(6+j8)(8-j6)}{14+j2} = \frac{96+j28}{14+j2} = \frac{(96+j28)(14-j2)}{200} = \frac{1400+j200}{200} = 7 + j1\ \Omega$.
6. Conjugate match: $\mathbf{Z}_L = 7 - j1\ \Omega$, so $\mathbf{Z}_{total} = 14 + j0\ \Omega$ and $|\mathbf{I}_{rms}| = 70.71/14 = 5.051$ A rms.
7. $P_{max} = |\mathbf{I}_{rms}|^{2}R_L = (5.051)^{2}(7) = 178.6$ W. Closed form for an RMS phasor: $\frac{|\mathbf{V}_{Th}|^{2}}{4R_{Th}} = \frac{5000}{4(7)} = 178.6$ W.

> [!success]- Answer
> **$\mathbf{V}_{Th} = 50-j50$ V rms ($70.71\angle-45^\circ$ V rms), $\mathbf{Z}_{Th} = 7+j1\ \Omega$, $\mathbf{Z}_L = 7-j1\ \Omega$, $P_{max} = 178.6$ W**

> [!warning] Trap
> Using the peak-phasor factor 8 with the RMS Thevenin voltage just computed: $5000/(8\cdot7) = 89.3$ W, exactly half of the correct 178.6 W. The $50-j50$ V came from a 100 V rms source, so every phasor in this problem is RMS and the factor is 4.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `(8×14−6×2)÷(14²+2²) : (−6×14−8×2)÷(14²+2²) : 100×0.5 : 100×−0.5` → divider ratio $0.5 - j0.5$ → $\mathbf{V}_{Th} = 50 - j50$ V rms.
> 2. `6×8+8×6 : 6×−6+8×8 : (96×14+28×2)÷(14²+2²) : (28×14−96×2)÷(14²+2²)` → $\mathbf{Z}_1\mathbf{Z}_2 = 96 + j28$ → divided by $14+j2$ gives **7** and **1**, so $\mathbf{Z}_{Th} = 7 + j1$ Ω.
> 3. `70.71÷14 : Ans²×7 : 5000÷(4×7)` → $\lvert \mathbf{I}_{rms} \rvert$ = **5.051** A → $P_{max}$ = **178.6** W → **178.6** W by the closed form.
>
> Every phasor here descends from a 100 V rms source, so $R_{Th}$ takes the factor 4, not 8.

### P4. A current source $\mathbf{I}_s = 6\angle 0^\circ$ A rms feeds $R = 10\ \Omega$ in parallel with an inductor of reactance $+j10\ \Omega$. Terminals $a$-$b$ are across the parallel pair. Find the Norton equivalent, convert it to the Thevenin form, and find the load and maximum average power.

**Given:** I_s = 6 angle 0 deg A rms; R = 10 ohm (parallel); X_L = +j10 ohm (parallel)

**Solution:**

1. Short the port: the short bypasses $R$ and the inductor sees 0 V, so it carries the entire source current. $\mathbf{I}_N = \mathbf{I}_{sc} = 6\angle 0^\circ$ A rms.
2. $\mathbf{Z}_N = R\parallel jX_L = \frac{(10)(j10)}{10+j10} = \frac{j100}{10+j10} = \frac{j100(10-j10)}{200} = \frac{1000+j1000}{200} = 5 + j5\ \Omega$.
3. Thevenin conversion: $\mathbf{Z}_{Th} = \mathbf{Z}_N = 5+j5\ \Omega$ and $\mathbf{V}_{Th} = \mathbf{I}_N\mathbf{Z}_N = 6(5+j5) = 30 + j30$ V rms, i.e. $42.43\angle 45^\circ$ V rms.
4. Conjugate match: $\mathbf{Z}_L = 5 - j5\ \Omega$, giving $\mathbf{Z}_{total} = 10 + j0\ \Omega$.
5. $|\mathbf{I}_{rms}| = 42.43/10 = 4.243$ A rms and $P_{max} = |\mathbf{I}_{rms}|^{2}R_L = (4.243)^{2}(5) = 90.0$ W.
6. Closed form for RMS: $\frac{|\mathbf{V}_{Th}|^{2}}{4R_{Th}} = \frac{1800}{4(5)} = 90.0$ W.

> [!success]- Answer
> **$\mathbf{I}_N = 6\angle 0^\circ$ A rms, $\mathbf{Z}_N = \mathbf{Z}_{Th} = 5+j5\ \Omega$, $\mathbf{V}_{Th} = 30+j30$ V rms, $\mathbf{Z}_L = 5-j5\ \Omega$, $P_{max} = 90.0$ W**

> [!warning] Trap
> Treating $\mathbf{Z}_N$ as the series impedance $R + jX_L = 10+j10\ \Omega$ instead of the parallel combination $5+j5\ \Omega$. That single error also corrupts $\mathbf{V}_{Th} = \mathbf{I}_N\mathbf{Z}_N$ into $60+j60$ V and doubles $P_{max}$ to $7200/(4\cdot10) = 180$ W.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100×10÷(10²+10²)` → **5**, so $\mathbf{Z}_N = 5 + j5$ Ω (both parts come out equal here); `SHIFT` `Pol(` `5` `,` `5` `)` → $7.071\angle45^\circ$ Ω.
> 2. `6×√(5²+5²)` → $\lvert \mathbf{V}_{Th} \rvert$ = **42.43** V rms at **45**°, i.e. $\mathbf{V}_{Th} = 30 + j30$ V rms.
> 3. `42.43÷10 : Ans²×5 : 1800÷(4×5)` → $\lvert \mathbf{I}_{rms} \rvert$ = **4.243** A → $P_{max}$ = **90.0** W → **90.0** W.
>
> $\mathbf{Z}_N$ is the parallel $R \parallel jX_L = 5 + j5$ Ω, never the series sum $10 + j10$ Ω.

## Traps & Exam Notes

- **Deactivating a dependent source.** With a VCCS $0.04\mathbf{V}_{ab}$ in the network, opening it along with the independent source gives $25\parallel(-j25) = 12.5-j12.5\ \Omega$ instead of the true $\mathbf{Z}_{Th} = 10-j5\ \Omega$: 25% too resistive, 2.5 times too reactive, and $\angle-45^\circ$ instead of $\angle-26.57^\circ$.
- **Matching the impedance rather than its conjugate.** Setting $\mathbf{Z}_L = \mathbf{Z}_{Th} = 30+j40\ \Omega$ leaves $\mathbf{Z}_{total} = 60+j80\ \Omega$, so $|\mathbf{I}_{peak}| = 0.4$ A and $P = 2.4$ W, against 6.667 W for the conjugate match $30-j40\ \Omega$. The load's reactance has to cancel the source's, not reinforce it.
- **Applying the factor-8 form to an RMS phasor.** $P_{max} = |\mathbf{V}_{Th}|^{2}/(8R_{Th})$ assumes a peak-amplitude phasor. Feed it a 40 V rms Thevenin voltage and the answer comes out 6.667 W where the truth is $1600/(4\cdot30) = 13.33$ W - a clean factor-of-two loss that no magnitude check will expose.
- **Assuming $R_L = R_{Th}$ when $X_L$ is fixed.** With $X_L = 0$ and $\mathbf{Z}_{Th} = 30+j40\ \Omega$ the best resistive load is $R_L = |\mathbf{Z}_{Th}| = 50\ \Omega$, giving 5.000 W; picking $R_L = R_{Th} = 30\ \Omega$ gives only $\frac{1}{2}\cdot\frac{1600\cdot30}{|60+j40|^{2}} = 4.615$ W.

## See Also

- [[02_Phasors_and_Complex_Impedance]]
- [[03_Series_and_Parallel_AC_Analysis]]
- [[05_AC_Power,_PQS_and_Triangle]]
- [[07_Thevenin_and_Norton_Equivalents]]

---

[[03_Series_and_Parallel_AC_Analysis|⬅ 03]] · [[_MOC_AC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[05_AC_Power,_PQS_and_Triangle|05 ➡]]
