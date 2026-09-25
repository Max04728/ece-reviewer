---
title: "Electronics Crash Review — Last Hour"
type: review
part: "02_Electronics_Engineering"
scope: "Timed 60-minute revision pass over all nine Electronics areas, weighted to ECE board yield"
updated: 2026-09-25
---

# Electronics Crash Review — Last Hour

> [!abstract] How to use this in the final hour
> This sheet is a **triage and recall tool**, not a textbook. Nine areas are split into nine timed
> blocks totalling exactly **60 minutes**. Work them **in order** — the sequence runs from the
> highest-yield, fastest-to-recover material to the slowest.
>
> **Method per block:** read the formula table once at speed, say each trap out loud, then answer the
> rapid-fire questions with the answers covered. If you cannot answer in about 10 seconds, that is
> your revision target — not the whole block. Do **not** stop to re-derive anything; the drill
> problems exist to show you the pattern, and every answer is hidden in a collapsible callout.

## The 60-minute clock

Tick each block off as you finish it. If you run over on a block, **cut the next block short rather
than skipping it entirely** — partial coverage of a high-yield area beats perfect coverage of a
low-yield one.

- [ ] **1 · DC Circuits** — 8 min — node/mesh, Thevenin, max power, transients
- [ ] **2 · AC Circuits** — 7 min — RMS, phasors, complex power, resonance, three-phase
- [ ] **3 · Two-Port Networks** — 4 min — z/y/h/ABCD parameters, reciprocity, gains
- [ ] **4 · Semiconductor Devices** — 9 min — diodes, rectifiers, BJT, FET, thyristors
- [ ] **5 · Circuit Analysis and Design** — 10 min — biasing, small-signal, frequency, feedback, oscillators
- [ ] **6 · Power Electronics and Systems** — 5 min — converters, SCR control, thermal, regulation
- [ ] **7 · Industrial Automation, Op-Amps and Sensors** — 8 min — op-amps, filters, sensors, ADC/DAC, PLC
- [ ] **8 · Logic Circuits and Switching** — 5 min — bases, Boolean, K-maps, flip-flops, counters
- [ ] **9 · Microprocessors and Embedded** — 4 min — architecture, memory, interrupts, buses, peripherals

> [!tip] The five things most likely to appear on your paper
> 1. A **bias point** and then a **small-signal gain** from it — the single most common two-step question.
> 2. A **rectifier** with its $V_{dc}$, ripple, PIV or $\sqrt{2}$ factor.
> 3. A **power** question — complex power, power-factor correction, or a converter's duty cycle.
> 4. A **logic** question — base conversion, K-map minimisation, or a counter's modulus.
> 5. A **network theorem** — Thevenin equivalent or maximum power transfer.

## If you have less than 60 minutes

| Time left | Do this | Why |
| --- | --- | --- |
| **10 min** | Block 5 (Circuit Analysis) + the traps of every block | Heaviest area; traps are where marks are lost |
| **20 min** | Blocks 4, 5, 8 | The three largest question pools |
| **30 min** | Blocks 1, 2, 4, 5, 8 | Adds the DC/AC fundamentals everything else rests on |
| **60 min** | All nine, in order | Full pass |

## Three rules that protect marks

1. **Convert all prefixes to base SI before substituting.** The most common avoidable loss on this
   paper is mH/µF/kΩ mixing: $1/\sqrt{LC}$ needs henries and farads, and $k$ in the MOSFET square law
   is in A/V², not mA/V². An answer wrong by $\sqrt{1000}$ or $10^{3}$ is almost always this.
2. **State the region before you use its equation.** A BJT is in active mode, a diode is on, a
   MOSFET is in saturation — each assumption has a check, and the check is usually the mark.
3. **Carry the sign of inverting stages.** A CE or CS amplifier has negative gain; dropping that sign
   makes a feedback or oscillator question come out wrong even when the magnitudes are right.

> [!trap] The calculator will not save a wrong set-up
> Every shortcut below is a *speed* tool, not a correctness tool. A node equation keyed into a
> simultaneous-equation solver still returns a confident wrong answer if the equation was written
> with the wrong sign convention. Write the equation by hand first, then let the calculator execute it.

---

## Block 1 — DC Circuits (8 min)

**Topics:** [[01_Circuit_Variables,_Ohm’s_Law_and_Signs|Circuit Variables & Ohm]] · [[02_KCL,_KVL,_Series_and_Parallel_Reduction|KCL & KVL + Reduction]] · [[03_Delta-Wye_Transformations|Delta–Wye]] · [[04_Mesh_Analysis_and_Supermesh|Mesh & Supermesh]] · [[05_Nodal_Analysis_and_Supernodes|Nodal & Supernodes]] · [[06_Superposition_Theorem|Superposition]] · [[07_Thevenin_and_Norton_Equivalents|Thevenin & Norton]] · [[08_Maximum_Power_Transfer_and_Source_Transformation|Max Power Transfer]] · [[09_Millman’s_and_Tellegen_Theorems|Millman & Tellegen]] · [[10_Inductors,_Capacitors_and_Energy|L, C & Energy]] · [[11_First_Order_RC_and_RL_Transients|1st-Order RC/RL]] · [[12_Second_Order_RLC_Natural_Response|2nd-Order RLC]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Ohm, conductance | $v=iR$, $G=1/R$, $R=\rho L/A$ | Linear devices only; convert $\mathrm{mm^2}$ to $\mathrm{m^2}$ by $10^{-6}$ before substituting $\rho$. |
| Power, passive convention | $p=vi$; $p=i^2R=v^2/R$ | $p=vi$ is *absorbed* only when the reference current enters the $+$ terminal; $p<0$ means the element delivers. |
| Two-resistor parallel | $R_{eq}=R_1R_2/(R_1+R_2)$ | Two branches only. Three or more need $1/R_{eq}=\sum 1/R_k$. $R_{eq}$ is always below the smallest branch. |
| Voltage / current divider | $v_k=v_sR_k/R_{eq}$; $i_1=i_sR_2/(R_1+R_2)$ | Current divider puts the **other** resistor on top. Both fail if a load hangs on the tap. |
| Delta → wye | $R_a=\dfrac{R_{ab}R_{ca}}{R_{ab}+R_{bc}+R_{ca}}$ | Numerator = the two delta resistors **meeting at node a**; denominator is the same sum for all three legs. |
| Wye → delta | $R_{ab}=\dfrac{R_aR_b+R_bR_c+R_cR_a}{R_c}$ | Denominator is the wye leg **opposite** the pair ($ab$ divides by $c$). Balanced shortcut only: $R_Y=R_\Delta/3$, $R_\Delta=3R_Y$. |
| Mesh (standard form) | $\left(\sum R_{\mathrm{own}}\right)i_k-\sum_{j\neq k}R_{kj}i_j=\sum v_k$ | Shared resistors enter with a minus sign. $i_{\mathrm{branch}}=i_k-i_j$, never a sum. |
| Supermesh constraint | $i_2-i_1=I_s$ | Discard the source branch from the KVL loop; add the constraint. Boundary current source → $i_k=\pm I_s$, no supermesh. |
| Nodal (standard form) | $G_{aa}v_a-\sum_{b\neq a}G_{ab}v_b=I_a$ | $G_{aa}$ = **every** conductance touching the node; mutual terms negative. Floating $V_s$ → supernode KCL + $v_a-v_b=V_s$. |
| Millman | $V_A=\dfrac{\sum_kV_kG_k+\sum_jI_j}{\sum_kG_k}$ | Bare resistor goes in the denominator only. A reversed source enters as $-V_kG_k$; $G_k$ stays positive. |
| Thevenin / Norton | $V_{Th}=v_{oc}$, $R_{Th}=v_{oc}/i_{sc}$, $I_N=I_{sc}$, $R_N=R_{Th}$ | Kill independent sources only. With a dependent source you **must** use $v_{oc}/i_{sc}$ or a test source. |
| Maximum power transfer | $R_L=R_{Th}$, $P_{max}=\dfrac{V_{Th}^2}{4R_{Th}}$, $\eta=50\%$ | The factor 4 is structural (the load sees only $V_{Th}/2$). $V_{Th}^2/R_{Th}$ is the classic 4× error. |
| Superposition (linear only) | $y=\sum_k y_k$ | Voltage source killed → **short**; current source killed → **open**; dependent sources stay live. Power does **not** superpose. |
| Capacitor / inductor laws | $i=C\,dv/dt$, $v=L\,di/dt$; $w_C=\tfrac12Cv^2$, $w_L=\tfrac12Li^2$ | $v_C$ and $i_L$ are the continuous state variables. DC steady state: $C$ open, $L$ short. |
| First-order response | $x(t)=x(\infty)+\left[x(0^+)-x(\infty)\right]e^{-t/\tau}$ | $\tau=R_{Th}C$ or $\tau=L/R_{Th}$, with $R_{Th}$ seen **after** the switch moves. $1\tau=63.2\%$, $2\tau=86.5\%$, $3\tau=95.0\%$, $5\tau=99.3\%$. |
| Second-order RLC | $\omega_0=\dfrac{1}{\sqrt{LC}}$; $\alpha=\dfrac{R}{2L}$ (series), $\alpha=\dfrac{1}{2RC}$ (parallel) | $\alpha>\omega_0$ overdamped, $\alpha=\omega_0$ critical $(A+Bt)e^{-\alpha t}$, $\alpha<\omega_0$ underdamped with $\omega_d=\sqrt{\omega_0^2-\alpha^2}$. $Q=\omega_0/2\alpha$; $Q=\tfrac12$ is critical. |
| Critical resistance | $R_{crit}=2\sqrt{L/C}$ (series), $R_{crit}=\tfrac12\sqrt{L/C}$ (parallel) | Parallel value is 4× smaller. In parallel, **larger** $R$ damps **less**. |

### Traps that cost marks

- **Source voltage where terminal voltage belongs.** After a series $R_s$, the load sees only $v_t=V_s-iR_s$; $P=V_s^2/R_L$ overstates it. Mirror error: at no load $v_t=V_s$ because no current drops anything.
- **Calling two resistors parallel because they share one node.** Parallel needs *both* nodes in common. Two arms leaving the same node but landing on different nodes separated by a third resistor (an unbalanced bridge) are neither series nor parallel — that is exactly when you convert delta↔wye.
- **Extending product-over-sum to three resistors** ($R_1R_2R_3/\sum R$ is wrong) and **reversing the current divider** ($i_1=i_sR_1/(R_1+R_2)$ gives the smaller resistor the smaller share).
- **Delta–wye numerator slip.** $R_a$ pairs the two delta arms that *touch node a*; wye→delta divides $R_{ab}$ by the leg opposite it. Apply $R_Y=R_\Delta/3$ to an unbalanced set and the two-terminal check ($R_a+R_b$ vs $R_{ab}\parallel(R_{bc}+R_{ca})$) exposes it at once.
- **Supermesh built for a boundary current source.** If the source is unshared it simply fixes that mesh current; only a *shared* current source needs a supermesh, and its branch must be left out of the KVL loop.
- **Sign of the shared/mutual term.** Both mesh and nodal matrices are symmetric with a positive diagonal; an unexpected asymmetry means a sign error (unless a dependent source is present).
- **Killing a dependent source.** Dependent sources are never deactivated — not in superposition sub-circuits, not in the dead network for $R_{Th}$. Deleting one inflates the answer (a VCCS example goes $6\ \mathrm{V}\to 8\ \mathrm{V}$).
- **Superposing power.** $P\neq\sum P_k$ because $p=i^2R$ is quadratic; the cross term $2Ri_ji_k$ is routinely as large as the self terms. Add the *currents*, then square.
- **Wrong $R_{Th}$ for $\tau$.** Redraw the post-switch circuit and kill sources first. A resistor that was in series with the source before $t=0$ is usually not in the discharge loop; using it can triple $\tau$ and the predicted voltage.
- **Inverting the RL time constant** ($\tau=L/R$, not $R/L$) and **swapping the DC steady-state limits** (at DC the capacitor is the *open* and the inductor the *short* — the reverse of their $t=0^+$ appearance).
- **Critical damping written as two equal exponentials.** A repeated root demands $(A+Bt)e^{-\alpha t}$; $A_1e^{-\alpha t}+A_2e^{-\alpha t}$ collapses to one constant and cannot meet two initial conditions.

### Rapid-fire recall

- [ ] **Q1.** A $12\ \mathrm{V}$ source with $R_s=2\ \Omega$ drives $R_L=10\ \Omega$. Find $I$, $v_t$, $P_L$.
- [ ] **Q2.** A $6\ \mathrm{A}$ total current splits between $3\ \Omega$ and $6\ \Omega$ in parallel. Find each branch current.
- [ ] **Q3.** Convert a delta of $30/60/90\ \Omega$ to its wye and state the two-terminal resistance between the first two nodes with the third open.
- [ ] **Q4.** A shared-branch current source in a two-mesh network has $i_2-i_1=2\ \mathrm{A}$. State the supermesh KVL rule and the constraint.
- [ ] **Q5.** A $20\ \mathrm{V}$ source feeds $5\ \Omega$ through $12\ \Omega$ to ground, with a $6\ \mathrm{V}$ source in series with $6\ \Omega$ also at the node. Find $V_{Th}$ and $R_{Th}$.
- [ ] **Q6.** $V_{Th}=16\ \mathrm{V}$, $R_{Th}=2\ \Omega$. Find the load for maximum power and $P_{max}$.
- [ ] **Q7.** A voltage source is killed in one superposition sub-circuit. Short or open? What about a current source, and a dependent source?
- [ ] **Q8.** $v_C(0^+)=6\ \mathrm{V}$ decays through $3\ \mathrm{k}\Omega$ with $C=20\ \mu\mathrm{F}$. Find $v_C(90\ \mathrm{ms})$.
- [ ] **Q9.** A series RLC has $R=5\ \Omega$, $L=1\ \mathrm{H}$, $C=0.25\ \mathrm{F}$. Classify it and give the roots.
- [ ] **Q10.** At DC steady state, what does a capacitor look like and what does an inductor look like?
- [ ] **Q11.** A $100\ \mu\mathrm{F}$ capacitor is charged from $50\ \mathrm{V}$ to $100\ \mathrm{V}$. How much *additional* energy is required?
- [ ] **Q12.** A $2\ \mathrm{H}$ inductor in parallel with $4\ \mathrm{mH}$ sits in series with $7\ \mathrm{mH}$. Find $L_{eq}$.
> [!success]- Answers
> **Q1.** $I=V_s/(R_s+R_L)=12/(2+10)=1\ \mathrm{A}$; $v_t=V_s-IR_s=12-2=10\ \mathrm{V}=IR_L$ ✓; $P_L=I^2R_L=10\ \mathrm{W}$, and $R_s$ burns $2\ \mathrm{W}$, so $12\ \mathrm{W}$ delivered $=12\ \mathrm{V}\times1\ \mathrm{A}$ closes the balance. Never use $V_s$ where $v_t$ belongs.
> **Q2.** $i_{3\Omega}=6(6)/(3+6)=4\ \mathrm{A}$, $i_{6\Omega}=2\ \mathrm{A}$; shared voltage $4(3)=2(6)=12\ \mathrm{V}$ ✓. The **other** resistor goes in the numerator.
> **Q3.** $\Sigma=180\ \Omega$, so $R_a=30(90)/180=15$, $R_b=30(60)/180=10$, $R_c=60(90)/180=30\ \Omega$. With $c$ open: delta $30\parallel(60+90)=25\ \Omega$ and wye $15+10=25\ \Omega$ ✓.
> **Q4.** One KVL around the **outer boundary**, excluding the source branch: $\sum v=0$ through the mesh resistors only; plus the algebraic constraint $i_2-i_1=I_s$ (sign follows the arrow). A negative mesh current is a direction, not an error.
> **Q5.** KCL: $2(v_B-12)+(v_B-6)+v_B=0\Rightarrow 4v_B=30\Rightarrow V_{Th}=7.5\ \mathrm{V}$. Kill both: $R_{Th}=3\parallel6\parallel6=1.5\ \Omega$. Check $i_{sc}=12/3+6/6=5\ \mathrm{A}=7.5/1.5$ ✓.
> **Q6.** $R_L=R_{Th}=2\ \Omega$; $i_L=16/(2+2)=4\ \mathrm{A}$; $P_{max}=i_L^2R_L=16(2)=32\ \mathrm{W}=V_{Th}^2/(4R_{Th})=256/8$ ✓ (not $128\ \mathrm{W}$).
> **Q7.** Voltage source → **short**; current source → **open**; dependent source → **stay live** in every sub-circuit with its controlling variable re-evaluated there.
> **Q8.** $\tau=(3\times10^3)(20\times10^{-6})=60\ \mathrm{ms}$, $t/\tau=1.5$, $v_C=6e^{-1.5}=6(0.22313)=1.34\ \mathrm{V}$.
> **Q9.** $\alpha=R/2L=2.5$, $\omega_0=1/\sqrt{LC}=2$, so $\alpha>\omega_0$: **overdamped**, roots $s=-2.5\pm\sqrt{6.25-4}=-1$ and $-4$.
> **Q10.** Capacitor → **open** ($i_C=0$); inductor → **short** ($v_L=0$). Remember this is the *reverse* of their $t=0^+$ appearance for an uncharged capacitor (short) and unmagnetised inductor (open).
> **Q11.** $w_1=\tfrac12(100\ \mu\mathrm{F})(50^2)=0.125\ \mathrm{J}$, $w_2=0.5\ \mathrm{J}$, so $\Delta w=0.375\ \mathrm{J}=3w_1$ — energy goes as $v^2$, so doubling $v$ quadruples $w$.
> **Q12.** Parallel inductors reciprocate: $1/L_p=1/2+1/0.004=250.5\ \mathrm{S^{-1}}$, so $L_p=3.992\ \mathrm{mH}$ (the $2\ \mathrm{H}$ is so large it barely shunts the $4\ \mathrm{mH}$). Then series inductors add: $L_{eq}=3.992+7=10.99\ \mathrm{mH}\approx11\ \mathrm{mH}$. Inductors follow the **resistor** pattern (add in series, reciprocate in parallel); capacitors are the mirror image and add in parallel.

### Drill — 5 minutes

**1.** A three-mesh chain: a $20\ \mathrm{V}$ source with $3\ \Omega$ in mesh 1, a $4\ \Omega$ shared by meshes 1 and 2, an $8\ \Omega$ shared by meshes 2 and 3, and an $8\ \Omega$ closing mesh 3. Find all three clockwise mesh currents and check the result with a power balance.
> [!success]- Solution
> Mesh 1: $20=3i_1+4(i_1-i_2)\Rightarrow 7i_1-4i_2=20$. Mesh 2: $4(i_2-i_1)+8(i_2-i_3)=0\Rightarrow -i_1+3i_2-2i_3=0$. Mesh 3: $8(i_3-i_2)+8i_3=0\Rightarrow i_3=i_2/2$. Substitute: $-i_1+3i_2-i_2=0\Rightarrow i_1=2i_2$, then $14i_2-4i_2=20\Rightarrow i_1=4\ \mathrm{A}$, $i_2=2\ \mathrm{A}$, $i_3=1\ \mathrm{A}$. Audit: $P_{del}=20(4)=80\ \mathrm{W}$; absorbed $=3(4)^2+4(2)^2+8(1)^2+8(1)^2=48+16+8+8=80\ \mathrm{W}$ ✓. **Trap:** the shared branches carry $i_1-i_2=2\ \mathrm{A}$ and $i_2-i_3=1\ \mathrm{A}$ — differences, never sums; and every shared resistor enters the matrix with a **minus** sign (the matrix is symmetric with a positive diagonal).

**2.** Node B is fed by three branches: $12\ \mathrm{V}$ in series with $3\ \Omega$, $6\ \mathrm{V}$ in series with $6\ \Omega$ (both driving current into B), and a bare $6\ \Omega$ to ground. Find the Thevenin equivalent at B, then the current through a $3\ \Omega$ load placed from B to ground.
> [!success]- Solution
> $V_{Th}=v_{oc}$ from Millman/KCL: $\dfrac{12/3+6/6}{1/3+1/6+1/6}=\dfrac{5}{0.8333}=7.5\ \mathrm{V}$; equivalently $2(v_B-12)+(v_B-6)+v_B=0\Rightarrow v_B=7.5\ \mathrm{V}$. Kill both sources: $R_{Th}=3\parallel6\parallel6=2\parallel6=1.5\ \Omega$. Check $i_{sc}=12/3+6/6=5\ \mathrm{A}$ and $V_{Th}/R_{Th}=7.5/1.5=5\ \mathrm{A}$ ✓. Load: $i_L=7.5/(1.5+3)=1.667\ \mathrm{A}$, $v_L=5\ \mathrm{V}$. **Trap:** $R_{Th}$ is the **parallel** combination once the sources are shorted, not $3+6+6=15\ \Omega$; and a resistor in parallel with an ideal voltage source drops out of $R_{Th}$ entirely. Do not re-solve the whole network for the load — that is the entire point of the equivalent.

**3.** At $t=0^-$ a $6\ \mathrm{k}\Omega$ and a $3\ \mathrm{k}\Omega$ resistor sit in series across $18\ \mathrm{V}$, with $C=20\ \mu\mathrm{F}$ in parallel with the $3\ \mathrm{k}\Omega$. At $t=0$ the source and the $6\ \mathrm{k}\Omega$ are switched out, leaving only the $3\ \mathrm{k}\Omega$ across $C$. Find $v_C(t)$ for $t>0$ and its value at $90\ \mathrm{ms}$.
> [!success]- Solution
> Pre-switch DC steady state has the capacitor as an open, so the divider gives $v_C(0^-)=18\cdot\dfrac{3}{6+3}=6\ \mathrm{V}$, and continuity gives $v_C(0^+)=6\ \mathrm{V}$. Post-switch, no source remains so $v_C(\infty)=0$ and $R_{Th}=3\ \mathrm{k}\Omega$ (the $6\ \mathrm{k}\Omega$ has left the loop). $\tau=(3\times10^3)(20\times10^{-6})=60\ \mathrm{ms}$, so $v_C(t)=6e^{-t/0.06}\ \mathrm{V}$ and $v_C(90\ \mathrm{ms})=6e^{-1.5}=6(0.22313)=1.339\ \mathrm{V}$. **Trap:** taking $R_{Th}=R_1+R_2=9\ \mathrm{k}\Omega$ because both resistors appear in the original drawing. That inflates $\tau$ to $180\ \mathrm{ms}$ and predicts $3.65\ \mathrm{V}$ instead of $1.34\ \mathrm{V}$. Redraw the post-switch circuit before computing $\tau$.

**Calculator shortcuts (Canon F-789SGA).** Mesh/nodal systems: `MODE` `5` `1` for two unknowns (coefficients only, e.g. `3` `−1` `8` `−1` `5` `2`), `MODE` `5` `2` for three. Chained arithmetic without re-typing: separate statements with `ALPHA` `:`, then `=` walks the chain — e.g. `12×12÷(4+12) : 4×12÷(4+12)` gives $V_{Th}=9\ \mathrm{V}$ then $R_{Th}=3\ \Omega$. $RLC$ roots: `MODE` `5` page 2 for quadratic/cubic roots of $s^2+2\alpha s+\omega_0^2=0$. Rectangular↔polar for phasor-domain work in Block 2: `SHIFT` `Pol(` / `SHIFT` `Rec(`, results landing in `X` and `Y`. One unknown buried in a formula: type it with `X`, `SHIFT` `SOLVE`, guess, `=`; the `L−R` line shows the residual.

---

## Block 2 — AC Circuits (7 min)

**Topics:** [[01_Sinusoid,_RMS,_Average,_Form_and_Crest|RMS, Average, Form & Crest]] · [[02_Phasors_and_Complex_Impedance|Phasors & Complex Impedance]] · [[03_Series_and_Parallel_AC_Analysis|Series & Parallel AC]] · [[04_AC_Thevenin,_Norton_and_Max_Power|AC Thevenin & Max Power]] · [[05_AC_Power,_PQS_and_Triangle|Complex Power & Triangle]] · [[06_Power_Factor_and_Correction|Power-Factor Correction]] · [[07_Series_Resonance|Series Resonance]] · [[08_Parallel_Resonance_and_Anti-Resonance|Parallel / Anti-Resonance]] · [[09_Balanced_Wye_and_Delta_Systems|Balanced Wye & Delta]] · [[10_Three-Phase_Power_and_Two-Wattmeter|Three-Phase & Two-Wattmeter]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Sine RMS / average | $V_{rms}=V_m/\sqrt2=0.7071V_m$; $V_{avg}=\dfrac{2V_m}{\pi}=0.6366V_m$ | The $0.6366$ figure is the **full-wave rectified** mean. A plain sine over a full period averages **zero**; half-wave rectified: $V_{avg}=V_m/\pi$, $V_{rms}=V_m/2$. |
| Form / crest factor | $F_F=V_{rms}/V_{avg}$, $F_C=V_m/V_{rms}$ | Sine $1.111$ / $1.414$; half-wave $1.571$ / $2$; symmetric triangle $1.155$ / $1.732$; bipolar square: $F_F$ undefined (zero average), $F_C=1$. Shape-only. |
| DC plus ripple | $X_{rms}=\sqrt{X_{dc}^2+X_{ac,rms}^2}$, $X_{avg}=X_{dc}$ | Quadrature, never direct addition: $3\ \mathrm{A}$ dc plus $2.828\ \mathrm{A}$ ac gives $4.123\ \mathrm{A}$, not $5.83\ \mathrm{A}$. |
| Phasor (cosine reference) | $V_m\cos(\omega t+\varphi)\leftrightarrow V_m\angle\varphi$; sine → angle $\varphi-90^\circ$ | Mixing a sine-referenced and a cosine-referenced phasor is a silent $90^\circ$ error. |
| Impedance | $Z_R=R$, $Z_L=j\omega L$, $Z_C=\dfrac{1}{j\omega C}=-\dfrac{j}{\omega C}$ | $Z_C$ is **negative** imaginary. $\lvert Z\rvert=\sqrt{R^2+X^2}$, $\theta=\arctan(X/R)$ with the quadrant from the signs. |
| Admittance / parallel | $Y=G+jB$, $B=\omega C-\dfrac{1}{\omega L}$; $\dfrac1{Z_{eq}}=\sum\dfrac1{Z_k}$ | Add in rectangular, multiply in polar. For two branches $Z_1Z_2/(Z_1+Z_2)$. |
| Resonance (rad/s, Hz) | $\omega_0=\dfrac{1}{\sqrt{LC}}$, $f_0=\dfrac{1}{2\pi\sqrt{LC}}$ | Ideal series/parallel tank only. Practical parallel tank (coil $R$ in series with $L$): $\omega_0=\sqrt{\dfrac{1}{LC}-\dfrac{R^2}{L^2}}$, lower than $1/\sqrt{LC}$, and it exists only while $R<\sqrt{L/C}=Z_0$. |
| Series resonance | $Z(\omega_0)=R$ **minimum**, $I$ maximum, $V_L=V_C=Q_0V_s$ | Series: larger $R$ damps harder ($\alpha=R/2L$). Capacitor must be rated for $\sqrt2\,Q_0V_{s,rms}$ **peak**, not the source. |
| Parallel resonance | Susceptance zero, $Z_{dyn}=\dfrac{L}{RC}=Q^2R$ max, $I_s$ **minimum**, $I_{tank}\approx QI_s$ | Dual of series. $Q^2R$ is the high-$Q$ form (1% low at $Q=10$); $L/(RC)$ is exact. Larger $R$ damps **less** ($\alpha=1/2RC$). |
| Q and bandwidth | $Q=\dfrac{\omega_0L}{R}=\dfrac{1}{\omega_0CR}=\dfrac1R\sqrt{\dfrac LC}$; $BW=f_0/Q$ | Use $\omega_0$ in rad/s. $f_0=\sqrt{f_1f_2}$ is **geometric** — the arithmetic mean sits above $f_0$. |
| Complex power | $S=VI^*=P+jQ$, $P=VI\cos\theta$, $Q=VI\sin\theta$, $S^2=P^2+Q^2$, $\mathrm{pf}=\cos\theta$ | RMS values only; the **conjugate** is mandatory. $Q>0$ inductive/lagging, $Q<0$ capacitive/leading. |
| Combining loads | $P_{tot}=\sum P_k$, $Q_{tot}=\sum Q_k$, $S_{tot}=\sqrt{P_{tot}^2+Q_{tot}^2}$ | Never add the $S$ values or average the power factors: $0.8$ lag with $0.9$ lead is $0.947$ lag, not $0.85$. |
| PF correction | $Q_C=P(\tan\theta_1-\tan\theta_2)=V_{rms}^2/X_C$, $C=\dfrac{Q_C}{\omega V_{rms}^2}$ | $\tan$, not $\sin$. Negative $Q_C$ means the pf already beats the target — no capacitor. $V_{rms}$ only. |
| AC maximum power | $Z_L=Z_{Th}^{*}=R_{Th}-jX_{Th}$; $P_{max}=\dfrac{\lvert V_{Th}\rvert^2}{8R_{Th}}$ (peak), $\dfrac{\lvert V_{Th,rms}\rvert^2}{4R_{Th}}$ (rms) | Cancel the reactance, never duplicate it. The factor 8 assumes a peak-amplitude phasor and 4 an RMS phasor. If $X_L$ is fixed: $R_L=\sqrt{R_{Th}^2+(X_{Th}+X_L)^2}$, i.e. $\lvert Z_{Th}\rvert$ for a resistive load. |
| Wye relations | $V_L=\sqrt3\,V_{ph}$ (line leads by $30^\circ$), $I_L=I_{ph}$ | On a $400\ \mathrm{V}$ line, wye $V_{ph}=230.9\ \mathrm{V}$. The $\sqrt3$ belongs to the **voltage** here. |
| Delta relations | $V_L=V_{ph}$, $I_L=\sqrt3\,I_{ph}$ (line lags by $30^\circ$) | The $\sqrt3$ belongs to the **current**. Balanced load: $Z_Y=Z_\Delta/3$. |
| Three-phase power | $P=\sqrt3\,V_LI_L\cos\theta$, $Q=\sqrt3\,V_LI_L\sin\theta$, $S=\sqrt3\,V_LI_L$ | Line values throughout. The $\sqrt3$ is already the connection factor — never apply it twice. |
| Two-wattmeter | $W_1=V_LI_L\cos(30^\circ-\theta)$, $W_2=V_LI_L\cos(30^\circ+\theta)$; $P=W_1+W_2$, $Q=\sqrt3(W_1-W_2)$, $\tan\theta=\sqrt3\dfrac{W_1-W_2}{W_1+W_2}$ | $W_2=0$ at $\mathrm{pf}=0.5$ lagging and reads **negative** below it. $Q$ and the $\tan\theta$ form need a balanced load. |

### Traps that cost marks

- **Peak-to-peak fed into an RMS formula.** $V_{rms}=V_m/\sqrt2$ uses the **amplitude**; substituting $V_{pp}=2V_m$ doubles it and quadruples every power downstream.
- **Quoting $2V_m/\pi$ as the average of an unrectified sine.** Over a full period it is exactly zero; $2V_m/\pi$ is the mean of $\lvert v \rvert$, and half of that is the half-wave figure.
- **Applying $V_m/\sqrt2$ to a non-sine.** Triangle $V_m/\sqrt3$, half-wave rectified $V_m/2$, bipolar square $V_m$. Form factor is undefined whenever the average is zero — use the crest factor there.
- **Adding RMS values instead of combining in quadrature**, and **adding series voltage magnitudes** ($60+80\neq100\ \mathrm{V}$; they add as $\sqrt{60^2+80^2}$ only because those two are exactly $90^\circ$ apart).
- **Sine/cosine reference mixed**, **$Z_C$ sign dropped** (writing $+jX_C$ turns a leading current into a lagging one), and **peak phasors used in $S=VI^*$** (doubling the apparent power).
- **Voltage divider computed without the load or the source impedance.** The output node's *actual* impedance is usually the load in parallel with a divider resistor; omitting it gives a plausible magnitude with the wrong phase.
- **Conjugate match replaced by $Z_L=Z_{Th}$.** That leaves $Z_{total}=R_{Th}+jX_{Th}+R_{Th}+jX_{Th}$, so the reactance doubles instead of cancelling. Worked case: $V_{Th}=40\angle0^\circ$ V peak, $Z_{Th}=30+j40\ \Omega$ → conjugate match gives $6.667\ \mathrm{W}$, while $Z_L=Z_{Th}$ gives $0.4^2(30)/2=2.4\ \mathrm{W}$.
- **Factor 8 used with an RMS phasor.** $P_{max}=\lvert V_{Th}\rvert^2/(8R_{Th})$ assumes a peak amplitude; an RMS Thevenin voltage takes the factor 4. Mixing them is a clean factor-of-two error no magnitude check will catch.
- **$R_L=R_{Th}$ claimed when $X_L$ is fixed.** With $Z_{Th}=30+j40\ \Omega$ and a purely resistive load the optimum is $R_L=\lvert Z_{Th} \rvert=50\ \Omega$ ($5.000\ \mathrm{W}$), not $R_L=30\ \Omega$ ($4.615\ \mathrm{W}$).
- **$V^2/R$ with the terminal voltage when $R$ is only one element** of a series load, and **line current computed from real power** ($I=S/V$, not $P/V$).
- **Adding apparent powers or averaging power factors** across loads, and **dropping the sign of $Q$** — a negative $Q$ is a leading (capacitive) load, not a magnitude.
- **$\sin\theta$ used in the correction formula** where $\tan\theta$ belongs. For $10\ \mathrm{kW}$ from $0.75$ to $0.95$: $\tan$ form gives $5.532\ \mathrm{kvar}$ ($277.4\ \mu\mathrm{F}$); the $\sin$ form gives $3.492\ \mathrm{kvar}$ ($175\ \mu\mathrm{F}$), leaving the plant at $0.883$ lagging.
- **Peak voltage put into $C=Q_C/(\omega V^2)$.** $230\sqrt2=325.3\ \mathrm{V}$ doubles $V^2$ and halves the bank.
- **Series and parallel resonance intuition swapped.** Series: $\lvert Z \rvert$ **minimum**, current maximum, pf unity. Parallel: $\lvert Z \rvert$ **maximum**, source current minimum — while the tank branch currents are $Q$ times larger.
- **$f_0$ used where $\omega_0$ belongs in $Q$.** $Q=\omega_0L/R$; using $f_0L/R$ understates $Q$ by $2\pi$ (for $R=10$, $L=50\ \mathrm{mH}$, $C=5\ \mu\mathrm{F}$: $10.0$ vs $1.59$, and $BW$ becomes $200\ \mathrm{Hz}$ instead of $31.83\ \mathrm{Hz}$).
- **Arithmetic mean taken for $f_0$.** $f_0=\sqrt{f_1f_2}$; for $f_1=1105.68$, $f_2=1145.47\ \mathrm{Hz}$ the arithmetic mean is $1125.57\ \mathrm{Hz}$ against the true $1125.40\ \mathrm{Hz}$.
- **$\sqrt3$ attached to the wrong quantity.** Wye: $V_L=\sqrt3V_{ph}$ but $I_L=I_{ph}$. Delta: $V_L=V_{ph}$ but $I_L=\sqrt3I_{ph}$. Applying it to both multiplies the power by 3. On a $400\ \mathrm{V}$ line the wye phase voltage is $230.9\ \mathrm{V}$ — using $400\ \mathrm{V}$ triples $P=3I^2R$.
- **Dropping the $30^\circ$ shift.** $V_{ab}$ leads $V_{an}$ by $30^\circ$; in positive sequence $I_a$ lags $I_{ab}$ by $30^\circ$. Parallel a delta and a wye load without carrying it and the node KCL no longer closes.
- **Neutral current assumed zero in every balanced-looking case.** It is exactly zero for balanced fundamentals, but losing one phase makes it a full phase current, and triplen harmonics add in the neutral.
- **Negative $W_2$ added as a magnitude.** Below $\mathrm{pf}=0.5$ lagging the second wattmeter reverses; $P=W_1+W_2$ algebraically ($4000+(-1000)=3000\ \mathrm{W}$, never $5000\ \mathrm{W}$). Also $Q=\sqrt3(W_1-W_2)$, not $(W_2-W_1)$.

### Rapid-fire recall

- [ ] **Q1.** $v(t)=311\sin(377t)\ \mathrm{V}$ and $i(t)=14.14\sin(377t-45^\circ)\ \mathrm{A}$. Find $S$, $P$, $Q$.
- [ ] **Q2.** A full-wave rectified sine has $V_m=100\ \mathrm{V}$. Find $V_{avg}$, $V_{rms}$, $F_F$, $F_C$.
- [ ] **Q3.** $v(t)=120\sqrt2\sin(377t+30^\circ)\ \mathrm{V}$, cosine reference, RMS phasor required. Write $\mathbf{V}$.
- [ ] **Q4.** $R=6\ \Omega$ in series with $X_L=8\ \Omega$, driven by $100\angle0^\circ\ \mathrm{V}$ rms. Find $\mathbf{I}$ and the power.
- [ ] **Q5.** A load draws $800\ \mathrm{W}$ and $600\ \mathrm{var}$ inductive. Find $S$, pf and the angle.
- [ ] **Q6.** A $230\ \mathrm{V}$, $60\ \mathrm{Hz}$ load draws $12\ \mathrm{A}$ rms at pf $0.75$ lagging. Find $S$, $P$, $Q$, $\lvert Z \rvert$.
- [ ] **Q7.** $10\ \mathrm{kW}$ at pf $0.75$ lagging, corrected to $0.95$ lagging at $230\ \mathrm{V}$, $60\ \mathrm{Hz}$. Find $Q_C$ and $C$.
- [ ] **Q8.** A $6\ \Omega$ and a $-j8\ \Omega$ branch in parallel. What is $Z_{eq}$, and why is the angle not simply the branch average?
- [ ] **Q9.** $W_1=5000\ \mathrm{W}$, $W_2=2000\ \mathrm{W}$ on a balanced load. Find $P$, $Q$, $\mathrm{pf}$.
- [ ] **Q10.** A balanced wye load of $10+j8\ \Omega$ per phase on a $400\ \mathrm{V}$ line. Find $I_L$ and $P$.
- [ ] **Q11.** At what power factor does one wattmeter of a two-wattmeter pair read zero, and what happens below it?
- [ ] **Q12.** A practical tank has $L=100\ \mathrm{mH}$, $C=10\ \mu\mathrm{F}$, coil $R=10\ \Omega$. Find $\omega_0$ exactly, $Q$ and $Z_{dyn}$.

> [!success]- Answers
> **Q1.** $V_{rms}=219.9\ \mathrm{V}$, $I_{rms}=10.0\ \mathrm{A}$, $\theta=45^\circ$ lagging; $S=2199\ \mathrm{VA}$, $P=Q=2199(0.7071)=1555\ \mathrm{W}$ and $+1555\ \mathrm{var}$.
> **Q2.** $V_{avg}=2(100)/\pi=63.66\ \mathrm{V}$, $V_{rms}=100/\sqrt2=70.71\ \mathrm{V}$ (rectification does not change heating), $F_F=1.111$, $F_C=1.414$ — identical to the pure sine.
> **Q3.** Peak $=120\sqrt2$, so rms magnitude $=120$; sine$\to$cosine subtracts $90^\circ$: $\mathbf{V}=120\angle(-60^\circ)\ \mathrm{V\ rms}$.
> **Q4.** $Z=6+j8=10\angle53.13^\circ\ \Omega$, so $\mathbf{I}=10\angle(-53.13^\circ)\ \mathrm{A}$ rms $=6-j8\ \mathrm{A}$. $P=I^2R=100(6)=600\ \mathrm{W}$; note $\lvert V_R \rvert+\lvert V_L \rvert=60+80=140\neq100\ \mathrm{V}$.
> **Q5.** $S=\sqrt{800^2+600^2}=1000\ \mathrm{VA}$; $\mathrm{pf}=800/1000=0.8$ lagging; $\theta=\arctan(0.75)=36.87^\circ$. Never add $P$ and $Q$ to get $1400\ \mathrm{VA}$.
> **Q6.** $S=230(12)=2760\ \mathrm{VA}$; $P=2070\ \mathrm{W}$; $\theta=41.41^\circ$, $\sin\theta=0.6614$, $Q=1825\ \mathrm{var}$; $\lvert Z \rvert=230/12=19.17\ \Omega$, i.e. $Z=19.17\angle41.41^\circ=14.38+j12.68\ \Omega$.
> **Q7.** $\tan\theta_1=0.88192$, $\tan\theta_2=0.32868$, $Q_C=10000(0.55324)=5532\ \mathrm{var}$; $C=5532/(376.99\times52900)=277.4\ \mu\mathrm{F}$; line current falls from $57.97\ \mathrm{A}$ to $45.77\ \mathrm{A}$ at unchanged $P$.
> **Q8.** $Z_{eq}=\dfrac{(6)(-j8)}{6-j8}=\dfrac{-j48(6+j8)}{100}=\dfrac{384-j288}{100}=3.84-j2.88\ \Omega=4.80\angle(-36.87^\circ)\ \Omega$. The angle is set by the complex *division*, not by any average of $-53.13^\circ$ and $0^\circ$.
> **Q9.** $P=7000\ \mathrm{W}$; $Q=\sqrt3(3000)=5196\ \mathrm{var}$; $\theta=\arctan(0.7423)=36.59^\circ$, $\mathrm{pf}=0.803$ lagging (the larger reading is $W_1$ for a lagging load).
> **Q10.** $V_{ph}=400/\sqrt3=230.94\ \mathrm{V}$, $\lvert Z \rvert=\sqrt{164}=12.806\ \Omega$, $I_L=I_{ph}=18.03\ \mathrm{A}$; $\mathrm{pf}=10/12.806=0.7809$, $P=3(18.03)^2(10)=9756\ \mathrm{W}$ (check $\sqrt3(400)(18.03)(0.7809)$).
> **Q11.** $W_2=V_LI_L\cos(30^\circ+\theta)=0$ at $\theta=60^\circ$, i.e. $\mathrm{pf}=0.5$ lagging. Below that $\cos(30^\circ+\theta)<0$, the meter reverses, and the reading stays negative in the algebraic sum.
> **Q12.** $Z_0=\sqrt{L/C}=\sqrt{0.1/10^{-5}}=100\ \Omega>R$ so anti-resonance exists; $\omega_0=\sqrt{10^6-10^4}=994.99\ \mathrm{rad/s}$ ($1000\ \mathrm{rad/s}$ from $1/\sqrt{LC}$, 0.5% high); $Q=\omega_0L/R=9.95$; $Z_{dyn}=L/(RC)=0.1/(10\times10^{-5})=1000\ \Omega$ (the $Q^2R$ shortcut gives $990\ \Omega$, 1% low).

### Drill — 5 minutes

**1.** A series branch has $R=30\ \Omega$, $L=40\ \mathrm{mH}$, $C=25\ \mu\mathrm{F}$ and is fed by $120\ \mathrm{V}$ rms at $60\ \mathrm{Hz}$. Find $Z$, the current phasor and the real power, and explain why $\lvert V_C \rvert$ exceeds the source.
> [!success]- Solution
> $\omega=2\pi(60)=376.99\ \mathrm{rad/s}$; $X_L=\omega L=15.08\ \Omega$, $X_C=1/(\omega C)=1/(376.99\times25\times10^{-6})=106.10\ \Omega$. $Z=30+j(15.08-106.10)=30-j91.02\ \Omega$, $\lvert Z \rvert=\sqrt{30^2+91.02^2}=95.84\ \Omega$, $\theta=-71.77^\circ$. $\mathbf{I}=120\angle0^\circ/95.84\angle(-71.77^\circ)=1.252\angle(+71.77^\circ)\ \mathrm{A}$ rms (leading), so $P=I^2R=(1.252)^2(30)=47.0\ \mathrm{W}=V_sI\cos\theta$. $\lvert V_C \rvert=I X_C=1.252(106.10)=132.8\ \mathrm{V}>120\ \mathrm{V}$: KVL holds on the *phasors*, and because $\mathbf{V}_C$ and $\mathbf{V}_L$ are nearly $180^\circ$ apart they largely cancel. **Trap:** adding $37.56+18.88+132.8=189\ \mathrm{V}$ and declaring KVL violated — the rectangular sum is $119.9-j0.00\ \mathrm{V}$, recovering the $120\ \mathrm{V}$ source.

**2.** A source $V_s=100\angle0^\circ\ \mathrm{V}$ rms feeds $Z_1=6+j8\ \Omega$ in series with $Z_2=8-j6\ \Omega$, with terminals $a$–$b$ across $Z_2$. Find $V_{Th}$, $Z_{Th}$, the load for maximum average power and $P_{max}$.
> [!success]- Solution
> $Z_1+Z_2=14+j2\ \Omega$. Open-circuit division: $\dfrac{8-j6}{14+j2}=\dfrac{(8-j6)(14-j2)}{200}=\dfrac{100-j100}{200}=0.5-j0.5$, so $V_{Th}=50-j50\ \mathrm{V}$ rms $=70.71\angle(-45^\circ)$. $Z_{Th}=Z_1\parallel Z_2=\dfrac{(6+j8)(8-j6)}{14+j2}=\dfrac{96+j28}{14+j2}=7+j1\ \Omega$. Conjugate match $Z_L=7-j1\ \Omega$ makes $Z_{total}=14+j0$, so $\lvert I_{rms} \rvert=70.71/14=5.051\ \mathrm{A}$ and $P_{max}=I^2R_L=(5.051)^2(7)=178.6\ \mathrm{W}$, matching $\lvert V_{Th} \rvert^2/(4R_{Th})=5000/28$. **Trap:** the peak-phasor factor 8 gives $5000/56=89.3\ \mathrm{W}$, exactly half — every phasor here descends from an **rms** source, so the factor is 4. Also do not use $Z_L=Z_{Th}$, which duplicates the reactance.

**3.** Two loads share a $230\ \mathrm{V}$, $60\ \mathrm{Hz}$ bus. Load 1 is $15\ \mathrm{kW}$ at $0.80$ lagging; load 2 is $10\ \mathrm{kVA}$ at $0.60$ leading. Find the totals, the overall power factor, and the capacitance needed to reach $0.95$ lagging.
> [!success]- Solution
> Load 1: $\theta_1=36.87^\circ$, $Q_1=15\tan36.87^\circ=+11.25\ \mathrm{kvar}$ (inductive). Load 2: $P_2=10(0.60)=6.00\ \mathrm{kW}$, $\theta_2=53.13^\circ$, and because it is **leading** $Q_2=-10\sin53.13^\circ=-8.00\ \mathrm{kvar}$. Totals: $P=21.0\ \mathrm{kW}$, $Q=+3.25\ \mathrm{kvar}$, $S=\sqrt{21^2+3.25^2}=21.25\ \mathrm{kVA}$, $\mathrm{pf}=21/21.25=0.9882$ lagging. The $0.95$ target permits $21\tan18.195^\circ=6.902\ \mathrm{kvar}$, which is **more** than the $3.25\ \mathrm{kvar}$ present, so $Q_C=21(\tan\theta_{bus}-\tan\theta_2)=3.25-6.902=-3.652\ \mathrm{kvar}$: **negative, so no capacitor is required** — adding one would drive the bus leading. **Trap:** summing the reactive powers as magnitudes ($11.25+8.00=19.25\ \mathrm{kvar}$) gives $S=28.49\ \mathrm{kVA}$, $\mathrm{pf}=0.737$, and would order a $12.35\ \mathrm{kvar}$ ($619\ \mu\mathrm{F}$) bank the plant does not need. Never average power factors either — $0.85$ is not the answer.

**Calculator shortcuts (Canon F-789SGA).** Rectangular↔polar is the workhorse: `SHIFT` `Pol(` `R` `,` `X` `)` puts $\lvert Z \rvert$ in `X` and the angle in `Y`; `SHIFT` `Rec(` `|Z|` `,` `90` `)` converts back. Complex division in one line of real arithmetic: multiply numerator and denominator by the conjugate `SHIFT` `Conj` and key `(ac+bd)÷(c²+d²)` and `(bc−ad)÷(c²+d²)` — complex division with `5(9+j4)/(9²+4²)` style entries. `MODE` `2` CPLX with `▶a+bi` / `▶r∠θ`, `Arg`, `Conj`, `Real`, `Imag` and the labelled `i` key for phasor KVL checks. Power-factor and resonance chains: `SHIFT` `SOLVE` for a buried unknown (e.g. $\omega_0$ from the practical-tank susceptance), and `MODE` `5` page 2 for the quadratic roots of $s^2+2\alpha s+\omega_0^2=0$. `Ans` chains $Q_C$ straight into $C=Q_C/(2\pi f V^2)$; set the angle unit to **Deg** for these, and switch to **Rad** before evaluating $\sin(\omega t)$.

---

## Block 3 — Two-Port Networks (4 min)

**Topics:** [[01_Two-Port_Variables_and_Conventions|Two-Port Variables and Conventions]] · [[02_Z_and_Y_Parameters|Z and Y Parameters]] · [[03_T_and_Pi_Equivalent_Networks|T and Pi Equivalent Networks]] · [[04_Hybrid_and_Inverse_Hybrid_Parameters|Hybrid and Inverse Hybrid Parameters]] · [[05_Transmission_ABCD_Parameters|Transmission ABCD Parameters]] · [[06_Parameter_Conversions_and_Determinants|Parameter Conversions and Determinants]] · [[07_Reciprocity_and_Symmetry_Conditions|Reciprocity and Symmetry Conditions]] · [[08_Interconnections_Series,_Parallel,_Cascade|Interconnections: Series, Parallel, Cascade]] · [[09_Terminated_Networks_and_Gains|Terminated Networks and Gains]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Port condition | $I_a = -I_b$ and $I_c = -I_d$ | Current entering one terminal must equal current leaving its partner. A shared ground that carries another stage's current breaks it and no 2x2 model exists. |
| z set (open-circuit) | $V_1 = z_{11}I_1 + z_{12}I_2$, $V_2 = z_{21}I_1 + z_{22}I_2$ | All four in $\Omega$. Every entry is measured with one port OPEN ($I = 0$): $z_{11}$ is the driving-point impedance, $z_{21}$ the transfer impedance. |
| y set (short-circuit) | $I_1 = y_{11}V_1 + y_{12}V_2$, $I_2 = y_{21}V_1 + y_{22}V_2$ | All four in S. Every entry is measured with one port SHORTED ($V = 0$). $y_{11}$ is NOT $1/z_{11}$. |
| h set (hybrid) | $V_1 = h_{11}I_1 + h_{12}V_2$, $I_2 = h_{21}I_1 + h_{22}V_2$ | Mixed units: $h_{11}$ in $\Omega$, $h_{22}$ in S, $h_{12}$ and $h_{21}$ bare. BJT notation $h_{ie}, h_{re}, h_{fe}, h_{oe}$; with $I_2$ taken into port 2 a positive-gain device has $h_{21} = -h_{fe}$. |
| g set (inverse hybrid) | $I_1 = g_{11}V_1 + g_{12}I_2$, $V_2 = g_{21}V_1 + g_{22}I_2$ | $g_{11}$ in S, $g_{22}$ in $\Omega$; $[g] = [h]^{-1}$, so $\Delta_h\Delta_g = 1$. |
| ABCD (transmission) | $V_1 = AV_2 - BI_2$, $I_1 = CV_2 - DI_2$ | $I_2$ LEAVES port 2, hence the minus signs. $A$ and $D$ bare, $B$ in $\Omega$, $C$ in S. |
| T network, forward | $z_{11} = Z_a + Z_b$, $z_{12} = z_{21} = Z_b$, $z_{22} = Z_b + Z_c$ | $Z_a$ and $Z_c$ are the series arms, $Z_b$ the SHUNT leg. Extraction: $Z_a = z_{11}-z_{12}$, $Z_b = z_{12}$, $Z_c = z_{22}-z_{12}$. |
| Pi network, forward | $y_{11} = Y_a + Y_b$, $y_{12} = y_{21} = -Y_b$, $y_{22} = Y_b + Y_c$ | $Y_b$ is the SERIES arm and enters NEGATIVELY. Extraction uses SUMS: $Y_a = y_{11}+y_{12}$, $Y_b = -y_{12}$, $Y_c = y_{22}+y_{12}$. |
| z to y conversion | $y_{11} = z_{22}/\Delta_z$, $y_{12} = -z_{12}/\Delta_z$, $y_{21} = -z_{21}/\Delta_z$, $y_{22} = z_{11}/\Delta_z$ | $\Delta_z = z_{11}z_{22}-z_{12}z_{21}$. Diagonals SWAP, off-diagonals keep magnitude and flip sign. Free check: $\Delta_y = 1/\Delta_z$. |
| z to h conversion | $h_{11} = \Delta_z/z_{22}$, $h_{12} = z_{12}/z_{22}$, $h_{21} = -z_{21}/z_{22}$, $h_{22} = 1/z_{22}$ | The minus lands on $h_{21}$. $\Delta_h = \Delta_z/z_{22} = z_{11}/z_{22}$ (dimensionless). |
| z (or y) to ABCD | $A = z_{11}/z_{21}$, $B = \Delta_z/z_{21}$, $C = 1/z_{21}$, $D = z_{22}/z_{21}$ | Needs $z_{21} \neq 0$; a unilateral network has no ABCD set. Reverse: $z_{12} = (AD-BC)/C$. |
| Reciprocity | $z_{12} = z_{21}$, $y_{12} = y_{21}$, $h_{12} = -h_{21}$, $g_{12} = -g_{21}$, $AD - BC = 1$ | True only for R, L, C, M and ideal transformers. Any controlled source normally destroys it. |
| Symmetry | $z_{11} = z_{22}$, $y_{11} = y_{22}$, $A = D$, $\Delta_h = 1$ | Needs reciprocity as well. $\Delta_h = 1$ is the port-equality (symmetry) test, NOT a reciprocity test. |
| Interconnections | series $[z]_a+[z]_b$; parallel $[y]_a+[y]_b$; cascade $[ABCD]_a[ABCD]_b$; series-in/parallel-out $[h]_a+[h]_b$; parallel-in/series-out $[g]_a+[g]_b$ | A cascade puts the SOURCE-side block on the LEFT. $[z]$ and $[y]$ never multiply. Series/parallel addition needs Brune validity (no shared internal lead). |
| Terminated two-port | $Z_{in} = (AZ_L+B)/(CZ_L+D)$, $Z_{out} = (DZ_S+B)/(CZ_S+A)$ | $Z_L$ open gives $Z_{in} = A/C$; $Z_L$ short gives $B/D$. z-form cross-check: $Z_{in} = z_{11} - z_{12}z_{21}/(z_{22}+Z_L)$. |
| Gains | $A_v = Z_L/(AZ_L+B)$, $A_i = -1/(CZ_L+D)$, $G_p = \lvert A_v\rvert^{2}R_{in}/R_L = \lvert A_vA_i\rvert$ | Both gains depend on the LOAD only (not the source). The minus in $A_i$ is the $I_2$ direction, a real 180 deg offset. $h$ form: $\lvert A_i\rvert = h_{21}/(1+h_{22}R_L)$. |
| Image impedance | $Z_0 = \sqrt{B/C}$ | Symmetric section only ($A = D$). Image matching, not conjugate maximum-power matching. Units: $\Omega$ over S under the root. |

### Traps that cost marks

- **Swapping the defining experiments.** $z$ is the OPEN-circuit set ($I=0$ enforced), $y$ is the SHORT-circuit set ($V=0$ enforced). Swapping them turns every answer into a different circuit.
- **Writing $y_{11} = 1/z_{11}$.** They are different experiments. For $z_{11} = 30$, $z_{22} = 35$, $\Delta_z = 950\ \Omega^2$, the correct $y_{11} = z_{22}/\Delta_z = 36.84\ \mathrm{mS}$, not $1/30 = 33.33\ \mathrm{mS}$.
- **Forgetting the diagonal swap.** In $[y] = [z]^{-1}$, $y_{11}$ takes $z_{22}$ and $y_{22}$ takes $z_{11}$. Getting the pattern right but dropping the minus on the off-diagonals is equally fatal, because it hides non-reciprocity.
- **Sign of the pi transfer term.** A passive pi always has $y_{12} = y_{21} = -Y_b < 0$. A positive off-diagonal is a sign error and it destroys the $\Delta_y = 1/\Delta_z$ check.
- **Mixing up the two h-set tests.** $h_{12} = -h_{21}$ is RECIPROCITY (with the minus); $\Delta_h = 1$ is SYMMETRY. The same split holds elsewhere: $AD - BC = 1$ is reciprocity, $A = D$ is symmetry, and it equals $z_{12}/z_{21}$, so an active network can give 2, 0 or $-1$.
- **Cascading in drawing order.** The block nearest the source multiplies on the LEFT. Series $Z$ then shunt $Y$ gives $[[1+ZY, Z],[Y, 1]]$; the reverse order gives $[[1, Z],[Y, 1+ZY]]$. Both satisfy $AD-BC=1$, so only the entry values expose the reversal.
- **Treating $Z_{in}$ as a property of the box.** It moves with the load: $A/C$ and $B/D$ are only the open- and short-circuit values.
- **Dividing by a determinant of zero.** An ideal transformer has $[z] = [[0,0],[0,0]]$, so no finite $[y]$ exists; use $[ABCD] = [[n,0],[0,1/n]]$. Likewise a pure series element has $h_{22} = 0$ and no $z$ set.

### Rapid-fire recall

- [ ] **Q1.** Which set is defined by short-circuit measurements, in what unit, and what is $y_{11}$ by definition?
- [ ] **Q2.** $z_{11} = 30\ \Omega$, $z_{22} = 35\ \Omega$, $\Delta_z = 950\ \Omega^2$. Find $y_{11}$ and say why $1/z_{11}$ is wrong.
- [ ] **Q3.** State the reciprocity condition in the $h$ set and in the $g$ set.
- [ ] **Q4.** State the symmetry condition in the $h$ set, and give two equivalent forms.
- [ ] **Q5.** Write the $[z]$ and $[ABCD]$ matrices of an ideal transformer with $n = N_1/N_2 = 4$.
- [ ] **Q6.** Which parameter matrix adds for a series-input/parallel-output connection, and which for parallel-input/series-output?
- [ ] **Q7.** Give $Z_{in}$, $A_v$ and $A_i$ for a two-port with $A = 2$, $B = 100\ \Omega$, $C = 0.02\ \mathrm{S}$, $D = 1.5$ terminated in $Z_L = 200\ \Omega$.
- [ ] **Q8.** Why does $A_i$ carry a minus sign, and when is $Z_0 = \sqrt{B/C}$ valid?

> [!success]- Answers
> **Q1.** The $y$ (admittance) set, all four entries in siemens; $y_{11} = I_1/V_1$ at $V_2 = 0$ (output shorted).
> **Q2.** $y_{11} = z_{22}/\Delta_z = 35/950 = 36.84\ \mathrm{mS}$. $1/z_{11} = 33.33\ \mathrm{mS}$ is wrong because $z_{11}$ opens port 2 while $y_{11}$ shorts it. `MODE` `7`, MatA = `30 10 10 35`, `Det` → `950`, `Inv` → `0.03684, -0.01053, -0.01053, 0.03158` S.
> **Q3.** $h_{12} = -h_{21}$ and $g_{12} = -g_{21}$ (both carry the minus; equivalently $z_{12} = z_{21}$ and $AD - BC = 1$).
> **Q4.** $\Delta_h = h_{11}h_{22}-h_{12}h_{21} = 1$, equivalently $z_{11} = z_{22}$, or $A = D$. Symmetry also requires reciprocity.
> **Q5.** $[z] = [[0,0],[0,0]]$ with $\Delta_z = 0$ (no finite $[y]$ exists); $[ABCD] = [[4, 0],[0, 0.25]]$ with $AD-BC = 1$.
> **Q6.** $[h]$ adds for series input / parallel output; $[g]$ adds for parallel input / series output.
> **Q7.** $Z_{in} = (2(200)+100)/(0.02(200)+1.5) = 500/5.5 = 90.91\ \Omega$; $A_v = 200/500 = 0.4$; $A_i = -1/5.5 = -0.182$.
> **Q8.** Because $I_2$ is defined LEAVING port 2, so the current entering the load is $-I_2$; $Z_0 = \sqrt{B/C}$ needs a symmetric section ($A = D$) and only makes that section look like $Z_0$.

### Drill — 4 minutes

**1.** A T network has $Z_a = 20\ \Omega$ (input series), $Z_b = 10\ \Omega$ (shunt leg), $Z_c = 30\ \Omega$ (output series). Find (a) all four $z$ parameters, (b) the ABCD matrix and $AD - BC$, (c) $Z_{in}$ for $Z_L = 200\ \Omega$.
> [!success]- Solution
> (a) $z_{11} = Z_a+Z_b = 30\ \Omega$, $z_{12} = z_{21} = Z_b = 10\ \Omega$, $z_{22} = Z_b+Z_c = 40\ \Omega$; $\Delta_z = 30(40)-10(10) = 1100\ \Omega^2$. Reciprocal and not symmetric ($30 \neq 40$).
> (b) $A = z_{11}/z_{21} = 3$, $B = \Delta_z/z_{21} = 110\ \Omega$, $C = 1/z_{21} = 0.1\ \mathrm{S}$, $D = z_{22}/z_{21} = 4$; $AD - BC = 12 - 11 = 1$ (reciprocal, as a passive T must be).
> (c) $Z_{in} = (3(200)+110)/(0.1(200)+4) = 710/24 = 29.58\ \Omega$; cross-check $z_{11} - z_{12}z_{21}/(z_{22}+Z_L) = 30 - 100/240 = 29.58\ \Omega$.
> Calculator: `MODE` `7`, MatA = `30 10 10 40`, `Det` → **1100** $\Omega^2$; one `ALPHA` `:` chain `(3×200+110)÷(0.1×200+4)` → **29.58** $\Omega$.

**2.** A two-port measures $z_{11} = 40\ \Omega$, $z_{12} = z_{21} = 10\ \Omega$, $z_{22} = 25\ \Omega$. (a) Is it reciprocal? Symmetric? (b) Find $[h]$ and $\Delta_h$. (c) Find $[g]$ and confirm $\Delta_h\Delta_g = 1$. (d) Give the T equivalent.
> [!success]- Solution
> (a) $z_{12} = z_{21} = 10\ \Omega$, so RECIPROCAL; $z_{11} = 40 \neq z_{22} = 25\ \Omega$, so NOT symmetric.
> (b) $\Delta_z = 40(25)-100 = 900\ \Omega^2$; $h_{11} = \Delta_z/z_{22} = 36\ \Omega$, $h_{12} = z_{12}/z_{22} = 0.4$, $h_{21} = -z_{21}/z_{22} = -0.4$, $h_{22} = 1/z_{22} = 0.04\ \mathrm{S}$; $\Delta_h = 36(0.04)-(0.4)(-0.4) = 1.44+0.16 = 1.60$, which equals $z_{11}/z_{22} = 1.6 \neq 1$, confirming asymmetry. Reciprocity holds: $h_{12} = 0.4 = -h_{21}$.
> (c) $[g] = (1/\Delta_h)[[h_{22}, -h_{12}],[-h_{21}, h_{11}]] = [[0.025\ \mathrm{S}, -0.25],[+0.25, 22.5\ \Omega]]$; $\Delta_g = 0.025(22.5)-(-0.25)(0.25) = 0.5625+0.0625 = 0.625 = 1/1.60$. Note $g_{12} = -0.25 = -g_{21}$: the reciprocity condition in the $g$ set carries a MINUS, exactly like $h_{12} = -h_{21}$.
> (d) $Z_a = z_{11}-z_{12} = 30\ \Omega$, $Z_b = z_{12} = 10\ \Omega$ (shunt), $Z_c = z_{22}-z_{12} = 15\ \Omega$; all positive, so the equivalent is realisable.
> Calculator: `MODE` `7`, MatA = `36 0.4 -0.4 0.04` (the $h$ matrix as it stands), `Det` → **1.6**, `Inv` → $[g]$ = `0.025, -0.25, 0.25, 22.5`.

**3.** A reciprocal two-port has $A = 2$, $B = 100\ \Omega$, $C = 0.02\ \mathrm{S}$, $D = 1.5$. Find $AD - BC$, $Z_{in}$ for $Z_L = 200\ \Omega$, $Z_{out}$ for $Z_S = 50\ \Omega$, $A_v$, $A_i$ and $G_p$. State the open- and short-circuit input impedances, and whether $Z_0 = \sqrt{B/C}$ applies.
> [!success]- Solution
> $AD - BC = 3 - 2 = 1$, so the network is reciprocal; $A = 2 \neq D = 1.5$, so it is not symmetric.
> $Z_{in} = (2(200)+100)/(0.02(200)+1.5) = 500/5.5 = 90.91\ \Omega$; $Z_{out} = (1.5(50)+100)/(0.02(50)+2) = 175/3 = 58.33\ \Omega$.
> $A_v = Z_L/(AZ_L+B) = 200/500 = 0.4$; $A_i = -1/(CZ_L+D) = -1/5.5 = -0.182$; $G_p = \lvert A_vA_i\rvert = 0.4(0.1818) = 0.0727$, i.e. 7.27 percent (about $-11.4\ \mathrm{dB}$, a passive loss). Check: $\lvert A_v\rvert^{2}R_{in}/R_L = 0.16(90.91)/200 = 0.0727$.
> Two-port-alone limits: open circuit $Z_L \to \infty$ gives $A/C = 100\ \Omega$; short circuit gives $B/D = 66.67\ \Omega$. $Z_0 = \sqrt{B/C} = \sqrt{5000} = 70.71\ \Omega$ does NOT apply here: image impedance is defined only for a symmetric section with $A = D$.
> Calculator: `MODE` `1` chain with `ALPHA` `:` — `(2×200+100)÷(0.02×200+1.5) : (1.5×50+100)÷(0.02×50+2)` → **90.91** $\Omega$ → **58.33** $\Omega$.

---

## Block 4 — Semiconductor Devices (9 min)

**Topics:** [[01_Intrinsic,_Extrinsic_and_Carrier_Transport|Intrinsic, Extrinsic and Carrier Transport]] · [[02_PN_Junction_and_Depletion_Region|PN Junction and Depletion Region]] · [[03_Diode_Characteristics_and_Shockley|Diode Characteristics and Shockley]] · [[04_Diode_Models_and_Load_Line|Diode Models and Load Line]] · [[05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge|Rectifiers: Half-Wave, Center-Tapped, Bridge]] · [[06_Filters,_Ripple_Factor_and_PIV|Filters, Ripple Factor and PIV]] · [[07_Clippers,_Clampers_and_Multipliers|Clippers, Clampers and Multipliers]] · [[08_Zener_Diodes_and_Shunt_Regulators|Zener Diodes and Shunt Regulators]] · [[09_BJT_Structure_and_Operating_Regions|BJT Structure and Operating Regions]] · [[10_BJT_Current_Gains_and_Relationships|BJT Current Gains and Relationships]] · [[11_JFET_Characteristics_and_Pinch-Off|JFET Characteristics and Pinch-Off]] · [[12_MOSFET_Types_and_Regions|MOSFET Types and Regions]] · [[13_Thyristors_UJT,_SCR,_DIAC,_TRIAC|Thyristors: UJT, SCR, DIAC, TRIAC]] · [[14_Optoelectronics_and_Solar_Cells|Optoelectronics and Solar Cells]] · [[15_Special_Diodes_Varactor,_Schottky,_Tunnel|Special Diodes: Varactor, Schottky, Tunnel]]

### Must-know formulas

**Carriers, junctions, diodes**

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Mass-action law | $n_0p_0 = n_i^{2}$ | Equilibrium only; fails under injection (forward bias, light). Si $n_i = 1.5\times10^{10}$, Ge $2.4\times10^{13}\ \mathrm{cm^{-3}}$ at 300 K. |
| Doped material | $n_0 \approx N_D$, $p_0 = n_i^{2}/N_D$ (swap for p-type) | Room temperature with $N_D \gg n_i$; compensated material uses the net $\lvert N_D-N_A\rvert$. |
| Conductivity | $\sigma = q(n\mu_n+p\mu_p)$, $\rho = 1/\sigma$ | $\mathrm{cm^{-3}}$ with $\mathrm{cm^2/(V\cdot s)}$ returns S/cm. Si: $\mu_n = 1350$, $\mu_p = 480$. |
| Einstein relation | $D_n/\mu_n = D_p/\mu_p = V_T = kT/q$ | $V_T = 25.85\ \mathrm{mV}$ at 300 K, use 26 mV. Gives $D_n = 35.1$, $D_p = 12.5\ \mathrm{cm^2/s}$. |
| Hall voltage | $V_H = IB/(qnt)$ | $t$ is the thickness along $B$. Put $n$ in $\mathrm{m^{-3}}$ and $t$ in m, or the answer is $10^{6}$ out. |
| Built-in potential | $V_0 = V_T\ln(N_AN_D/n_i^{2})$ | Set by the PRODUCT $N_AN_D$; 0.6 to 0.9 V for Si; falls about $2\ \mathrm{mV/^\circ C}$. |
| Depletion width | $W = \sqrt{(2\varepsilon/q)(1/N_A+1/N_D)(V_0-V)}$ | Set by the SUM of reciprocals. $\varepsilon_{Si} = 11.8\varepsilon_0 = 1.045\times10^{-12}\ \mathrm{F/cm}$; $V > 0$ for forward bias. |
| Width split | $N_Ax_p = N_Dx_n$, $x_n = WN_A/(N_A+N_D)$ | The lighter-doped side is the wider side; a 10:1 doping ratio is a 10:1 width ratio. |
| Peak junction field | $E_{max} = 2(V_0-V)/W$ | Triangular profile, so the factor 2 is mandatory; $E_{max} = V_0/W$ is exactly half. |
| Junction capacitance | $C_j = \varepsilon A/W = C_{j0}/\sqrt{1-V/V_0}$ | Reverse bias widens $W$ and lowers $C_j$; halving $C_j$ needs $V_R = 3V_0$. Strong forward bias switches to diffusion capacitance $C_D = \tau_TI_D/(nV_T)$. |
| Shockley equation | $I_D = I_S(e^{V_D/(nV_T)}-1)$ | $n = 1$ diffusion, $n = 2$ recombination; $I_S$ doubles per $10\ \mathrm{^\circ C}$. Forward, $V_D = nV_T\ln(I_D/I_S)$. |
| Decade rule | $\Delta V_D = 2.3\,nV_T \approx 60\ \mathrm{mV}$ per decade | $n = 1$ gives 60 mV/decade, $n = 2$ gives 120 mV. Fastest sanity check on any diode answer. |
| dc vs ac resistance | $R_{dc} = V_D/I_D$ versus $r_d = nV_T/I_D$ | They differ by $V_D/(nV_T) \approx 20$ to 40. $r_d$ is valid for swings of a few mV only. |
| Load line | $I_D = (V_{DD}-V_D)/R_L$; intercepts $(V_{DD}, 0)$ and $(0, V_{DD}/R_L)$ | Anything outside the box is impossible. Piecewise-linear: $I_D = (V_{DD}-V_{knee})/(R_L+r_B)$, with $r_B$ INSIDE the denominator. |

**Rectifiers, filters, Zener regulators**

| Quantity | Half-wave | Center-tap | Bridge |
| --- | --- | --- | --- |
| $V_{dc}$ (ideal, R load) | $V_m/\pi = 0.318V_m$ | $2V_m/\pi = 0.636V_m$ | $2V_m/\pi = 0.636V_m$ |
| $V_{rms}$ | $V_m/2$ | $V_m/\sqrt{2}$ | $V_m/\sqrt{2}$ |
| Form factor $F = V_{rms}/V_{dc}$ | $\pi/2 = 1.571$ | $\pi/(2\sqrt{2}) = 1.111$ | $\pi/(2\sqrt{2}) = 1.111$ |
| Ripple factor $r = \sqrt{F^{2}-1}$ | 1.21 | 0.482 | 0.482 |
| Maximum efficiency $\eta = 1/F^{2}$ | $4/\pi^{2} = 40.6\%$ | $8/\pi^{2} = 81.2\%$ | $8/\pi^{2} = 81.2\%$ |
| Ripple frequency $f_r$ | $f$ | $2f$ | $2f$ |
| Diodes in the conduction path | 1 | 1 | 2 |
| Effective peak with Si diodes | $V_m - 0.7$ | $V_m - 0.7$ | $V_m - 1.4$ |
| PIV, no capacitor | $V_m$ | $2V_m$ | $V_m$ |
| PIV, capacitor-input filter | $2V_m$ | $2V_m$ | $V_m$ |
| Average diode current | $I_{dc}$ | $I_{dc}/2$ | $I_{dc}/2$ |

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Capacitor-filter ripple | $V_{r(pp)} = I_{dc}/(f_rC) = V_{dc}/(f_rR_LC)$ | $f_r = f$ half-wave, $2f$ full-wave. Doubling $C$, $R_L$ or $f_r$ halves the ripple. |
| Filtered dc output | $V_{dc} = V_m - V_{r(pp)}/2$ | The sawtooth average, not $V_m$. Use this $V_{dc}$ inside $I_{dc} = V_{dc}/R_L$. |
| Ripple factor | $V_{r(rms)} = V_{r(pp)}/(2\sqrt{3})$, $r = 1/(2\sqrt{3}f_rR_LC)$ | $1/(2\sqrt{3}) = 1/3.464$, never $1/2$ or $1/\sqrt{2}$. Independent of $V_m$ and of the diode drops. |
| Zener series resistor | $R_s = (V_{in}-V_Z)/(I_Z+I_L)$ | Omitting $I_L$ starves the Zener at full load. $I_T = (V_{in}-V_Z)/R_s = I_Z+I_L$. |
| Zener design corners | $R_{s,max} = (V_{in,min}-V_Z)/(I_{ZK}+I_{L,max})$, $R_{s,min} = (V_{in,max}-V_Z)/(I_{ZM}+I_{L,min})$, $I_{ZM} = P_Z/V_Z$ | Pair $I_{L,max}$ with $V_{in,min}$ and $I_{L,min}$ with $V_{in,max}$. Dissipation peaks at high line, no load. |
| Zener small-signal | $\Delta V_{out}/\Delta V_{in} = r_Z/(R_s+r_Z)$, $R_{out} = R_s\lVert r_Z$ | A 10 $\Omega$ Zener behind 120 $\Omega$ rejects 92.3 percent of line ripple. $V_Z$ tempco is negative below 5 V, positive above 6 V, zero near 5.6 V. |

**BJT, FET, thyristor, optoelectronics**

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Current gains | $\alpha = I_C/I_E$, $\beta = I_C/I_B$, $\beta = \alpha/(1-\alpha)$, $\alpha = \beta/(1+\beta)$ | $\beta$ lives in $1-\alpha$: 0.99 gives 99, 0.995 gives 199. Typical 20 to 500. |
| KCL at the device | $I_E = I_C+I_B$ | Exact in every region and for NPN and PNP; any current set that fails it is wrong. |
| Leakage | $I_{CEO} = (1+\beta)I_{CBO}$ | Leakage entering as base current is amplified. Doubles every $10\ \mathrm{^\circ C}$. |
| BJT regions | cutoff: both junctions reverse; active: BE forward, BC reverse, $V_{BE}\approx0.7\ \mathrm{V}$; saturation: both forward, $V_{CE(sat)}\approx0.2\ \mathrm{V}$ | Test $V_{BC} = V_B - V_C$, never $V_{CE}$ alone; rewrite every sign for a PNP. |
| BJT switch | $I_{C(sat)} = (V_{CC}-V_{CE(sat)})/R_C$, $I_{B(min)} = I_{C(sat)}/\beta$, $\beta_{forced} = I_C/I_B$ | $I_C = \beta I_B$ holds in ACTIVE only; in saturation $I_C$ is set by the resistors. |
| JFET square law | $I_D = I_{DSS}(1-\lvert V_{GS}\rvert/V_P)^{2}$ | Constant-current region only, i.e. $V_{DS} \ge V_{GS}+V_P$. Inverse: $\lvert V_{GS}\rvert = V_P(1-\sqrt{I_D/I_{DSS}})$ (root BEFORE subtracting). |
| JFET transconductance | $g_{m0} = 2I_{DSS}/\lvert V_P\rvert$, $g_m = g_{m0}(1-\lvert V_{GS}\rvert/V_P) = 2\sqrt{I_{DSS}I_D}/\lvert V_P\rvert$, $\mu = g_mr_d$, $A_v = -g_m(R_D\lVert r_d)$ | $g_m$ falls linearly with $V_{GS}$ but only as $\sqrt{I_D}$. $I_D = I_{DSS}/4$ halves $g_m$. |
| MOSFET parameter | $k = \frac{1}{2}\mu_nC_{ox}W/L$, $C_{ox} = \varepsilon_{ox}/t_{ox}$ | State the convention: with $K = \mu_nC_{ox}W/L$, $I_D = (K/2)(V_{GS}-V_T)^{2}$. The half is a 2x error. |
| MOSFET regions | cutoff $V_{GS}<V_T$; triode $V_{GS}>V_T$, $V_{DS}<V_{GS}-V_T$; saturation $V_{DS}\ge V_{GS}-V_T$ | Compare $V_{DS}$ with the OVERDRIVE $V_{GS}-V_T$, not with $V_T$. |
| MOSFET currents and $g_m$ | triode $I_D = k[2(V_{GS}-V_T)V_{DS}-V_{DS}^{2}]$; saturation $I_D = k(V_{GS}-V_T)^{2}$; $V_{DS(sat)} = V_{GS}-V_T$; $g_m = 2k(V_{GS}-V_T) = 2\sqrt{kI_D}$ | The two expressions must agree exactly at $V_{DS(sat)}$; that is a free check. Gate current is oxide leakage only. |
| SCR trigger and latch | $\alpha_1+\alpha_2 \ge 1$; latch above $I_L$, hold above $I_H$ ($I_L \approx 2$ to $5I_H$) | The gate only STARTS conduction; turn-off needs $I_A < I_H$. False triggers: $V_{BO}$, excessive $dV/dt$, heat, light. |
| SCR currents | $I_{avg} = (I_p/2\pi)(1+\cos\alpha)$, $I_{rms} = I_p\sqrt{(\pi-\alpha)/(4\pi)+\sin2\alpha/(8\pi)}$ | $\alpha$ in RADIANS; at $\alpha = 0$ these give $I_p/\pi$ and $I_p/2$. Heating and rms ratings use $I_{rms}$; the constant-drop loss $V_{T(on)}I_{avg}$ uses the average. |
| UJT trigger | $\eta = R_{B1}/(R_{B1}+R_{B2})$, $V_P = \eta V_{BB}+V_D$, $T = RC\ln(1/(1-\eta))$ | $\eta$ is measured to base one. At $\eta = 2/3$, $\ln 3 = 1.099$, so $f \approx 0.91/(RC)$. |
| TRIAC phase control | $V_{rms} = V_m\sqrt{(1/\pi)[(\pi-\alpha)/2+\sin2\alpha/4]}$ | Symmetric firing on both half cycles; $\alpha = 90^\circ$ gives exactly half power. $V_m$ is the PEAK line voltage. |
| Photon energy | $E = 1240/\lambda(\mathrm{nm})\ \mathrm{eV}$, $\lambda_c = 1240/E_g(\mathrm{eV})$ | 1240 is in $\mathrm{eV\cdot nm}$: enter 650, never $650\times10^{-9}$. Si cut-off 1107 nm, GaAs 873 nm. |
| LED and photodiode | $R_S = (V_S-V_F)/I_F$, $P_R = (V_S-V_F)I_F$; $R_\lambda = \eta\lambda(\mu\mathrm{m})/1.24\ \mathrm{A/W}$, $I_{ph} = R_\lambda P_{opt}$ | $V_F$ is 1.8 V red to 3.4 V blue/white. A photodiode leaves linear mode when $I_{ph}R_L$ approaches the reverse bias. |
| Solar cell | $FF = V_{mp}I_{mp}/(V_{OC}I_{SC})$, $\eta = P_{max}/(GA)$, $\Delta V_{OC} = nV_T\ln(G_2/G_1)$ | One sun $= 1000\ \mathrm{W/m^{2}} = 100\ \mathrm{mW/cm^{2}}$. $I_{SC}$ is linear in irradiance, $V_{OC}$ logarithmic; $FF$ never exceeds 1. |
| Special diodes | $C_j = C_{j0}/(1+V_R/V_0)^{m}$; Schottky $V_F \approx 0.3\ \mathrm{V}$ with no minority storage; $R_n = (V_V-V_P)/(I_V-I_P) < 0$, $\mathrm{PVR} = I_P/I_V$ | Varactor: $m = 1/2$ abrupt, $1/3$ graded, $>1/2$ hyperabrupt, and it must stay reverse biased. Schottky: leaky, 20 to 100 V. Tunnel: oscillates when $R_s < \lvert R_n\rvert < R_p$. |

### Traps that cost marks

- **Treating 0.7 V as a constant.** The drop is logarithmic: about 0.55 V at 1 mA and 0.75 V at 100 mA, 60 mV per decade at $n=1$ (120 mV at $n=2$), and $-2\ \mathrm{mV/^\circ C}$ at fixed current.
- **Interchanging $R_{dc}$ and $r_d$.** $R_{dc} = V_D/I_D$ is a bias quantity and $r_d = nV_T/I_D$ a small-signal one; they differ by 20 to 40 times. A 10 mV signal at 2 mA sees 13 $\Omega$, not 278 $\Omega$.
- **Getting the leakage temperature rule backwards or oversized.** At fixed $V_D$, heating doubles the current per $10\ \mathrm{^\circ C}$; at fixed current the drop FALLS 2 mV per $^\circ C$. From 25 to 100 $^\circ C$ is 7.5 doublings, so leakage rises about 180 times, not 1000 (1000x needs a 100 $^\circ C$ rise).
- **Half-wave rms.** $V_{rms} = V_m/2$, not $V_m/\sqrt{2}$; the wrong choice reports $r = 0.84$ instead of 1.21. Full-wave rms is the ordinary $V_m/\sqrt{2}$.
- **Center-tap and bridge ratings.** In a center-tap circuit $V_m$ is measured from the tap to ONE end (half the total secondary) and $PIV = 2V_m$; in a bridge two diodes drop 1.4 V in the conduction path but each reverse diode blocks only $V_m$. A capacitor-input filter doubles the half-wave and center-tap PIV to $2V_m$ and leaves the bridge at $V_m$.
- **Ripple bookkeeping.** Full-wave ripple is at $2f$; $V_{r(rms)} = V_{r(pp)}/(2\sqrt{3})$, never $V_{r(pp)}/2$ or $V_{r(pp)}/\sqrt{2}$; and the filtered output is $V_m - V_{r(pp)}/2$. Round the capacitor UP, never down.
- **Zener corner pairing and rating point.** $I_{L,max}$ goes with $V_{in,min}$ and $I_{L,min}$ with $V_{in,max}$; $I_{ZM} = P_Z/V_Z$; the Zener is hottest at high line with the load disconnected, and below $I_{ZK}$ it stops regulating and the output collapses to the unregulated divider $V_{in}R_L/(R_s+R_L)$.
- **Using $I_C = \beta I_B$ off the active region.** In saturation $I_C$ is clamped at $(V_{CC}-V_{CE(sat)})/R_C$ and $\beta_{forced} = I_C/I_B$; $V_{BE} = 0.7\ \mathrm{V}$ occurs in both active and saturation, so only $V_{BC} = V_B - V_C$ separates them. Design base drive from $\beta_{min}$, not typical.
- **Forgetting the square root (or the sign) in the FET laws.** $\lvert V_{GS}\rvert = V_P(1-\sqrt{I_D/I_{DSS}})$ needs the root before the subtraction, and entering $+V_P$ into $I_{DSS}(1-V_{GS}/V_P)^{2}$ with a negative $V_{GS}$ yields $I_D > I_{DSS}$, which is impossible. $g_m$ scales as $\sqrt{I_D}$, and $A_v = -g_mR_D$ is valid only for $r_d \gg R_D$.
- **MOSFET threshold arithmetic.** Square the OVERDRIVE $V_{GS}-V_T$, and compare $V_{DS}$ with that same overdrive to name the region; the triode and saturation expressions must agree at the boundary.
- **Thyristor and optoelectronic slips.** The gate cannot turn an SCR off; heating uses $I_{rms}$ while the constant-drop loss uses $I_{avg}$; $\alpha$ must be in radians. For light, 1240 pairs only with nanometres, and using the rms line voltage as the peak in a TRIAC formula reports a quarter of the correct power.

### Rapid-fire recall

- [ ] **Q1.** Silicon at 300 K is doped $N_A = 10^{17}\ \mathrm{cm^{-3}}$. Give $p_0$, $n_0$ and the type.
- [ ] **Q2.** Give $V_T$ at 300 K and at 100 $^\circ C$ to three figures.
- [ ] **Q3.** $V_0$ depends on which combination of dopings, and $W$ on which?
- [ ] **Q4.** A reverse bias doubles $W$. What happens to $C_j$, and what $V_R$ halves $C_j$ if $V_0 = 0.757\ \mathrm{V}$?
- [ ] **Q5.** $I_S = 10^{-12}\ \mathrm{A}$, $n = 1$. Find $V_D$ at 1 mA, and compare with the 0.7 V habit.
- [ ] **Q6.** $V_m = 30\ \mathrm{V}$ into a capacitor-input half-wave rectifier: PIV? The same $V_m$ into a bridge: PIV?
- [ ] **Q7.** A 1 W, 6.2 V Zener with $I_{ZK} = 5\ \mathrm{mA}$ runs from $V_{in,min} = 12\ \mathrm{V}$ with $I_{L,max} = 20\ \mathrm{mA}$. Find $I_{ZM}$ and $R_{s,max}$.
- [ ] **Q8.** Convert both ways: $\beta = 250$ to $\alpha$, and $\alpha = 0.99$ to $\beta$.
- [ ] **Q9.** NPN with $V_E = 0$, $V_B = 0.7\ \mathrm{V}$, $V_C = 0.3\ \mathrm{V}$: name the region and give the test that decides it.
- [ ] **Q10.** JFET with $I_{DSS} = 12\ \mathrm{mA}$, $V_P = 4\ \mathrm{V}$ at $V_{GS} = -2\ \mathrm{V}$: find $I_D$, $g_{m0}$ and $g_m$.
- [ ] **Q11.** MOSFET with $k = 0.5\ \mathrm{mA/V^{2}}$, $V_T = 2\ \mathrm{V}$, $V_{GS} = 5\ \mathrm{V}$: give the overdrive, $I_D$, $g_m$ and $V_{DS(sat)}$.
- [ ] **Q12.** (a) Photon energy at 620 nm? (b) Can gate current turn an SCR off?

> [!success]- Answers
> **Q1.** $p_0 \approx N_A = 1\times10^{17}\ \mathrm{cm^{-3}}$; $n_0 = n_i^{2}/N_A = 2.25\times10^{20}/10^{17} = 2.25\times10^{3}\ \mathrm{cm^{-3}}$; p-type.
> **Q2.** $V_T = kT/q = 25.85\ \mathrm{mV}$ at 300 K and 32.1 mV at 373 K. `SHIFT` `CVALUE` `25` `÷` `SHIFT` `CVALUE` `23` `×373` → **3.214e-2** V.
> **Q3.** $V_0 = V_T\ln(N_AN_D/n_i^{2})$ sees the PRODUCT $N_AN_D$ only; $W$ sees the SUM of reciprocals $1/N_A+1/N_D$, so changing the doping pair at constant product moves $W$ and leaves $V_0$ alone.
> **Q4.** $C_j = \varepsilon A/W$ falls to half; $1+V_R/V_0 = 4$ so $V_R = 3V_0 = 3(0.757) = 2.27\ \mathrm{V}$.
> **Q5.** $V_D = 0.026\ln(10^{-3}/10^{-12}) = 0.026(20.72) = 0.539\ \mathrm{V}$; the 0.7 V habit is 30 percent high, and the whole 1 mA to 100 mA span is only about 120 mV.
> **Q6.** Half-wave with a capacitor: $PIV = 2V_m = 60\ \mathrm{V}$. Bridge: $PIV = V_m = 30\ \mathrm{V}$ even with the capacitor.
> **Q7.** $I_{ZM} = P_Z/V_Z = 1/6.2 = 161\ \mathrm{mA}$; $R_{s,max} = (12-6.2)/(0.005+0.020) = 5.8/0.025 = 232\ \Omega$.
> **Q8.** $\alpha = 250/251 = 0.99602$; $\beta = 0.99/(1-0.99) = 99$.
> **Q9.** Saturation: $V_{BC} = V_B - V_C = +0.4\ \mathrm{V}$ is forward, so both junctions conduct ($V_{CE} = 0.3\ \mathrm{V}$ is consistent with $V_{CE(sat)}$).
> **Q10.** $I_D = I_{DSS}(1-2/4)^{2} = 12(0.25) = 3\ \mathrm{mA} = I_{DSS}/4$; $g_{m0} = 2(12)/4 = 6\ \mathrm{mS}$; $g_m = g_{m0}(1-\lvert V_{GS}\rvert/V_P) = 6(0.5) = 3\ \mathrm{mS}$.
> **Q11.** Overdrive $= 5-2 = 3\ \mathrm{V}$; $I_D = 0.5(3)^{2} = 4.5\ \mathrm{mA}$; $g_m = 2(0.5)(3) = 3\ \mathrm{mS}$; $V_{DS(sat)} = 3\ \mathrm{V}$.
> **Q12.** (a) $1240/620 = 2.00\ \mathrm{eV}$. (b) No — once $\alpha_1+\alpha_2 \ge 1$ the device latches; it turns off only when the anode current falls below the holding current $I_H$.

### Drill — 9 minutes

**1.** A bridge rectifier is fed from a $12\ \mathrm{V}$ rms, 60 Hz secondary through silicon diodes and a $100\ \mu\mathrm{F}$ capacitor-input filter into $R_L = 500\ \Omega$. Find the peak voltage available to the load, the dc output, the peak-to-peak ripple, the ripple factor, the dc load current and the diode PIV rating.
> [!success]- Solution
> Peak of the secondary: $V_m = 12\sqrt{2} = 16.97\ \mathrm{V}$. Two diodes conduct, so the peak that reaches the capacitor is $V_m - 2V_D = 16.97-1.4 = 15.57\ \mathrm{V}$.
> Ripple frequency $f_r = 2f = 120\ \mathrm{Hz}$. Solve $V_{dc} = V_m' - V_{dc}/(2f_rR_LC)$ with $2f_rR_LC = 2(120)(500)(100\times10^{-6}) = 12$: $V_{dc} = 15.57/(1+1/12) = 15.57/1.0833 = 14.37\ \mathrm{V}$.
> $V_{r(pp)} = I_{dc}/(f_rC) = V_{dc}/(f_rR_LC) = 14.37/(120(500)(10^{-4})) = 14.37/6 = 2.40\ \mathrm{V}$; check $V_m' - V_r/2 = 15.57-1.20 = 14.37\ \mathrm{V}$.
> $I_{dc} = 14.37/500 = 28.7\ \mathrm{mA}$. Ripple factor $r = V_{r(pp)}/(2\sqrt{3}V_{dc}) = 2.395/49.79 = 0.0481 = 4.81\%$, which is also $1/(2\sqrt{3}f_rR_LC)$: note it contains no $V_m$ and no diode drop, so the 1.4 V does not change it.
> $PIV = V_m = 16.97\ \mathrm{V}$, so a 50 V part (1N4001) is the minimum sensible choice. Trap: dropping only 0.7 V (the bridge path has TWO diodes), using $f = 60\ \mathrm{Hz}$, or quoting $V_{dc} = V_m = 16.97\ \mathrm{V}$.
> Calculator: `MODE` `1` with `ALPHA` `:` — `12√2−1.4` → **15.57** V, `÷(1+1÷(2×120×500×100E-6))` → **14.37** V, `÷(120×500×100E-6)` → **2.395** V pp.

**2.** A Zener shunt regulator uses $V_Z = 9.1\ \mathrm{V}$, $I_{ZK} = 3\ \mathrm{mA}$, $r_Z = 8\ \Omega$ and a 1 W Zener. The input is $15\ \mathrm{V} \pm 10\%$ and the load current swings from 0 to 30 mA. Find the allowable range of $R_s$, pick a standard value, verify both worst-case corners, and give the line and load regulation.
> [!success]- Solution
> $V_{in}$ spans 13.5 to 16.5 V; $I_{ZM} = P_Z/V_Z = 1/9.1 = 109.9\ \mathrm{mA}$.
> $R_{s,max} = (V_{in,min}-V_Z)/(I_{ZK}+I_{L,max}) = (13.5-9.1)/(0.003+0.030) = 4.4/0.033 = 133.3\ \Omega$.
> $R_{s,min} = (V_{in,max}-V_Z)/(I_{ZM}+I_{L,min}) = (16.5-9.1)/0.1099 = 7.4/0.1099 = 67.3\ \Omega$. Any value in 67.3 to 133.3 $\Omega$ works; choose 120 $\Omega$.
> Low corner (low line, full load): $I_T = 4.4/120 = 36.67\ \mathrm{mA}$, so $I_Z = 36.67-30 = 6.67\ \mathrm{mA} > I_{ZK} = 3\ \mathrm{mA}$ — still regulating. High corner (high line, no load): $I_T = 7.4/120 = 61.67\ \mathrm{mA}$ through the Zener, $P_Z = 9.1(0.06167) = 0.561\ \mathrm{W}$, inside the 1 W rating but worth derating for ambient.
> Line regulation: $\Delta V_{out}/\Delta V_{in} = r_Z/(R_s+r_Z) = 8/128 = 6.25\%$, so the 3 V line swing moves the output by 0.188 V. Load regulation: $R_{out} = R_s \lVert r_Z = 120(8)/128 = 7.5\ \Omega$, so the 30 mA swing moves the output by $7.5(0.030) = 0.225\ \mathrm{V}$ (2.5 percent of 9.1 V).
> Trap: swapping the load extremes in the two corner formulas; using $I_{ZM} = P_Z/V_Z$ in the wrong corner; or quoting the average output as exactly 9.1 V.
> Calculator: `MODE` `1` chain — `(13.5−9.1)÷(3E-3+30E-3)` → **133.3** $\Omega$, `(16.5−9.1)÷(1÷9.1)` → **67.3** $\Omega$, `(13.5−9.1)÷120−30E-3` → **6.67** mA of Zener current at the low corner.

**3.** An n-channel JFET with $I_{DSS} = 8\ \mathrm{mA}$ and $V_P = 4\ \mathrm{V}$ is self-biased by $R_S = 470\ \Omega$ with $R_D = 2.2\ \mathrm{k\Omega}$, $r_d = 60\ \mathrm{k\Omega}$ and $V_{DD} = 20\ \mathrm{V}$. Find $I_D$, $V_{GS}$, $g_m$, the common-source voltage gain, and check that the device is really in the constant-current region.
> [!success]- Solution
> Self-bias forces $V_{GS} = -I_DR_S$, so $I_D = I_{DSS}(1-\lvert V_{GS}\rvert/V_P)^{2}$ becomes, with $I_D$ in mA, $I_D = 8(1-0.1175I_D)^{2}$, i.e. $0.11045I_D^{2}-2.88I_D+8 = 0$.
> Roots: $I_D = 3.161\ \mathrm{mA}$ and $22.91\ \mathrm{mA}$. The large root implies $V_{GS} = -22.91(0.47) = -10.8\ \mathrm{V}$, beyond pinch-off, so it is rejected: $I_D = 3.16\ \mathrm{mA}$ and $V_{GS} = -(3.161\times10^{-3})(470) = -1.486\ \mathrm{V}$.
> $g_{m0} = 2I_{DSS}/\lvert V_P\rvert = 2(8)/4 = 4\ \mathrm{mS}$; $g_m = g_{m0}(1-\lvert V_{GS}\rvert/V_P) = 4(1-1.486/4) = 2.514\ \mathrm{mS}$; cross-check $g_m = 2\sqrt{I_{DSS}I_D}/\lvert V_P\rvert = 2\sqrt{8(3.161)}/4 = 2.514\ \mathrm{mS}$.
> $R_D \lVert r_d = 2.2(60)/62.2 = 2.122\ \mathrm{k\Omega}$, so $A_v = -g_m(R_D \lVert r_d) = -(2.514\times10^{-3})(2122) = -5.34$ (the shortcut $-g_mR_D = -5.53$ is 3.6 percent optimistic).
> Region check: $V_{DS} = V_{DD}-I_D(R_D+R_S) = 20-(3.161\times10^{-3})(2670) = 20-8.44 = 11.56\ \mathrm{V}$, and the boundary is $V_{GS}-V_{GS(off)} = -1.486+4 = 2.51\ \mathrm{V}$, so $V_{DS} > 2.51\ \mathrm{V}$ and the square law is valid.
> Trap: taking the larger quadratic root; interpolating linearly on the transfer curve (at $V_{GS} = -2\ \mathrm{V}$ the square law gives exactly 3 mA, not the 6 mA a straight line predicts); or using $r_d = V_{DS}/I_D$ in the gain.
> Calculator: `MODE` `5`, page 2 `1` (quadratic), key `0.11045`, `−2.88`, `8` → roots **3.161** and **22.91** mA; or type `8(1−0.47X÷4)²=X` and press `SHIFT` `SOLVE` with a guess of 3.

---

## Block 5 — Circuit Analysis and Design (10 min)

**Topics:** [[01_BJT_DC_Biasing_Configurations|BJT Biasing]] · [[02_Load_Lines_and_Q_Point|Load Lines & Q Point]] · [[03_Bias_Stability_and_Stability_Factors|Bias Stability]] · [[04_FET_Biasing_Configurations|FET Biasing]] · [[05_BJT_Small-Signal_h-Parameter_Model|h-Parameters]] · [[06_Small-Signal_re_Model_CE,_CB,_CC|re Model CE/CB/CC]] · [[07_Hybrid-Pi_Model|Hybrid-Pi]] · [[08_FET_Amplifiers_CS,_CD,_CG|FET Amplifiers]] · [[09_Multistage,_Cascade_and_Cascode|Multistage & Cascode]] · [[10_Darlington_and_Feedback_Pairs|Darlington]] · [[11_Frequency_Response_and_Bode_Plots|Bode Plots]] · [[12_Miller’s_Theorem_and_High-Frequency_Effects|Miller’s Theorem]] · [[13_Gain-Bandwidth_Product_and_fT|GBP and f_T]] · [[14_Feedback_Amplifier_Topologies|Feedback Topologies]] · [[15_Power_Amplifiers_Classes_A,_B,_AB,_C|Power Amplifiers]] · [[16_Oscillators_RC_Phase_Shift_and_Wien_Bridge|RC & Wien Oscillators]] · [[17_Oscillators_Hartley,_Colpitts,_Crystal|Hartley, Colpitts, Crystal]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Base current, fixed bias | $I_B=\dfrac{V_{CC}-V_{BE}}{R_B}$ | $V_{BE}=0.7\ \mathrm{V}$ Si, $0.3\ \mathrm{V}$ Ge. Dropping $V_{BE}$ is 5.8 % high at 12 V but 21 % high at 3.3 V. |
| Collector-emitter loop | $V_{CE}=V_{CC}-I_CR_C-I_ER_E$ | The emitter term carries $I_E$, not $I_C$. With $R_E=0$ it collapses to $V_{CC}-I_CR_C$. |
| Thevenin base divider | $V_{TH}=\dfrac{R_2V_{CC}}{R_1+R_2},\ R_{TH}=R_1\lVert R_2$ | Take it with the base disconnected. $R_{TH}$ is smaller than either resistor. |
| Divider base current (exact) | $I_B=\dfrac{V_{TH}-V_{BE}}{R_{TH}+(\beta+1)R_E}$ | The $(\beta+1)R_E$ term is the whole feedback loop. Only $(\beta+1)R_E$, never $\beta R_E$. |
| Divider approximation | $V_B\approx V_{TH},\ I_E\approx\dfrac{V_{TH}-V_{BE}}{R_E}$ | Valid only if $\beta R_E\ge 10R_2$. When it fails, $I_C$ reads roughly 10 % high. |
| Emitter-stabilised bias | $I_B=\dfrac{V_{CC}-V_{BE}}{R_B+(\beta+1)R_E},\ I_C=\beta I_B$ | $R_E$ reflected into the base is multiplied by $\beta+1$. |
| Collector-feedback bias | $I_B=\dfrac{V_{CC}-V_{BE}}{R_B+(\beta+1)(R_C+R_E)}$ | $R_C$ carries $I_C+I_B=(\beta+1)I_B$; using $\beta R_C$ is the classic slip. |
| Two-supply emitter bias | $I_E=\dfrac{V_{EE}-V_{BE}}{R_E+R_B/(\beta+1)}$ | At $R_B/(\beta+1)=0.2R_E$ the shortcut $I_E=(V_{EE}-V_{BE})/R_E$ is 20 % high. |
| Saturation clamp | $I_{C(sat)}=\dfrac{V_{CC}-V_{CE(sat)}}{R_C+R_E}$ | Triggered whenever the linear solve gives $V_{CE}<V_{CE(sat)}$ (often a negative number). Active check: $V_{CE}>V_{CE(sat)}$ and $V_{BC}<0$. |
| DC load line | $V_{CE}=V_{CC}-I_C(R_C+R_E)$, ends at $V_{CC}$ and $V_{CC}/(R_C+R_E)$ | $R_E$ stays in the DC line even with a bypass capacitor: the bypass is an AC short only. |
| AC load line | slope $-1/r_{ac}$ through the Q point, $r_{ac}=R_C\lVert R_L$ (or $+R_E$ unbypassed) | Intercepts $i_{c,max}=I_{CQ}+V_{CEQ}/r_{ac}$, $v_{ce,max}=V_{CEQ}+I_{CQ}r_{ac}$. |
| Max symmetrical swing | $V_{opp}=\min\left(I_{CQ}r_{ac},\ V_{CEQ}\right)$ | Peak volts. The current side usually binds once a load is coupled in. |
| Stability factor | $S_{I_{CO}}=\dfrac{(1+\beta)(R_{TH}+R_E)}{R_{TH}+(1+\beta)R_E}\approx 1+\dfrac{R_{TH}}{R_E}$ | Fixed bias is the $R_E=0$ worst case: $S=1+\beta$. Bypassing $R_E$ does not change $S$. |
| Bias sensitivities | $S_{V_{BE}}=-\dfrac{\beta}{R_{TH}+(1+\beta)R_E},\ S_\beta=\dfrac{I_C(R_{TH}+R_E)}{\beta[R_{TH}+(1+\beta)R_E]}$ | $S_{V_{BE}}<0$: $V_{BE}$ falls $\approx2\ \mathrm{mV/^{\circ}C}$, so $I_C$ rises. $I_{CO}$ doubles every $10\ ^{\circ}\mathrm{C}$ — never $I_C$. |
| Thermal voltage relations | $g_m=\dfrac{I_C}{V_T}=38.5I_C,\ r_\pi=\dfrac{\beta}{g_m}=\dfrac{\beta V_T}{I_C},\ r_e=\dfrac{V_T}{I_E}\approx\dfrac{26\ \mathrm{mV}}{I_E}$ | $V_T=26\ \mathrm{mV}$ is the board value (25.85 exactly). $g_m$ is independent of $\beta$; $r_\pi$ is $\beta$ times $r_e$. |
| JFET square law and $g_m$ | $I_D=I_{DSS}\left(1-\dfrac{V_{GS}}{V_P}\right)^2,\ g_{m0}=\dfrac{2I_{DSS}}{\lvert V_P\rvert},\ g_m=g_{m0}\left(1-\dfrac{V_{GS}}{V_P}\right)=g_{m0}\sqrt{\dfrac{I_D}{I_{DSS}}}$ | $V_P$ is negative for n-channel; $\lvert V_P\rvert$ in the $g_{m0}$ denominator, signed $V_P$ in the bracket. Wrong sign triples $g_m$. |
| MOSFET $g_m$ | $g_m=2\sqrt{I_Dk}=\dfrac{2I_D}{V_{GS}-V_{th}}$ | $k=\tfrac12k'(W/L)$. $I_D$ and $k$ must both be in amperes, not mA. |
| CE gain (bypassed $R_E$) | $A_v=-g_m(R_C\lVert R_L\lVert r_o)\approx-\dfrac{R_C\lVert R_L}{r_e}$ | Inverting, 180°. **Always check whether $C_E$ is fitted.** |
| CE with unbypassed $R_E$ | $A_v=-\dfrac{R_C\lVert R_L}{r_e+R_E},\ Z_i=R_B\lVert[\beta r_e+(\beta+1)R_E]$ | Degeneration: gain collapses, $Z_i$ explodes. Add $R_E$ to the gain denominator *and* the $Z_i$ bracket, never to just one. |
| CB stage | $Z_i=r_e\lVert R_E\approx r_e,\ A_v=+\dfrac{R_C\lVert R_L}{r_e},\ A_i=-\alpha$ | Non-inverting, $\lvert A_i\rvert<1$ always. No Miller multiplication: widest bandwidth, upper half of a cascode. |
| CC emitter follower | $A_v=\dfrac{R_L'}{r_e+R_L'}<1,\ Z_i=R_B\lVert[\beta r_e+(\beta+1)R_L'],\ Z_o=R_E\lVert\left[r_e+\dfrac{R_s\lVert R_B}{\beta+1}\right]$ | $R_L'=R_E\lVert R_L$. Buffer: gain below 1 but system gain rises because the source no longer loses the signal. |
| Hard h-parameter results | $A_i=\dfrac{h_{fe}}{1+h_{oe}R_L},\ Z_i=\dfrac{h_{ie}+\Delta hR_L}{1+h_{oe}R_L},\ A_v=\dfrac{-h_{fe}R_L}{h_{ie}+\Delta hR_L},\ \Delta h=h_{ie}h_{oe}-h_{fe}h_{re}$ | $\Delta h$ is a **difference**. Adding the products instead gives $-645$ where the answer is $-952$. |
| h-parameter shortcuts | $h_{re}\approx0,\ h_{oe}\approx0:\ A_i\approx h_{fe},\ Z_i\approx h_{ie},\ A_v\approx-\dfrac{h_{fe}R_L}{h_{ie}}$ | Also $h_{ie}=\beta r_e=\beta V_T/I_{CQ}$ — a datasheet 1 k$\Omega$ holds only at its stated bias. |
| FET amplifier trio | CS: $-g_m(R_D\lVert R_L\lVert r_d)$; CD: $+\dfrac{g_mR_S'}{1+g_mR_S'}$; CG: $+g_m(R_D\lVert R_L\lVert r_d)$ | CS inverts, CD and CG do not. $R_{in}(\mathrm{CS})=R_{in}(\mathrm{CD})=R_G$ (bias resistor, not $g_m$); $R_{in}(\mathrm{CG})=\dfrac{1}{g_m}\lVert R_S$; $R_{out}(\mathrm{CD})=R_S\lVert\dfrac{1}{g_m}$. |
| Multistage gain | $A_{v,tot}=A_{v1}A_{v2}\cdots$, dB adds, $R_{L(eff)1}=R_{C1}\lVert R_{in2}$ | Never multiply unloaded stage gains. Two CE stages cancel the inversion: overall sign is $(-1)^n$. |
| Cascode | $A_{v1}\approx-g_m\left(\dfrac{1}{g_m}\right)\approx-1,\ A_{v(cascode)}\approx-g_mR_C$ | Buys bandwidth, not gain. $C_{in}\approx C_\pi+2C_{bc}$ against $C_\pi+C_{bc}(1+g_mR_C)$ for plain CE. |
| Darlington pair | $\beta_D=\beta_1\beta_2+\beta_1+\beta_2,\ V_{BE(D)}\approx1.4\ \mathrm{V},\ R_{in(D)}=\beta_D(R_E\lVert R_L),\ R_{out}\approx\dfrac{R_s\lVert R_B}{\beta_D}+r_e$ | Three devices: $\beta_D=(\beta+1)^3-1$. $R_{out}$ can never fall below $r_e=V_T/I_E$. Leakage multiplies: $I_{CEO(D)}\approx\beta_2I_{CEO1}$. |
| Miller's theorem | $Z_1=\dfrac{Z}{1-A_v},\ Z_2=\dfrac{Z}{1-1/A_v};\ C_{Mi}=C_f(1+\lvert A_v\rvert),\ C_{Mo}\approx C_f$ | For inverting $A_v$: divisor is $1+\lvert A_v\rvert$. Using $A_v=+100$ returns $-20.2\ \mathrm{pF}$ — a sign error, never physics. |
| Miller pole | $f_H=\dfrac{1}{2\pi R_{th}C_{in}},\ C_{in}=C_\pi+C_{bc}(1+g_mR_L'),\ R_{th}=R_s\lVert R_B\lVert r_\pi$ | Fast form: $R$ in k$\Omega$, $C$ in pF gives $f_H$ in MHz as $159.155/(RC)$. |
| Bode facts | $A_v(\mathrm{dB})=20\log_{10}\lvert A_v\rvert$; pole $-20\ \mathrm{dB/dec}$ $=-6\ \mathrm{dB/oct}$; corner is the $-3\ \mathrm{dB}$, $0.707A_{mid}$, $-45^{\circ}$ point | $n$ identical poles move $f_H$ by $\sqrt{2^{1/n}-1}$: 0.6436 for 2, 0.51 for 3, 0.435 for 4. |
| GBP and $f_T$ | $\lvert A_{v(mid)}\rvert\,BW=\mathrm{const};\ f_T=\dfrac{g_m}{2\pi(C_\pi+C_\mu)}=\dfrac{I_C}{2\pi V_T(C_\pi+C_\mu)},\ f_\beta=\dfrac{f_T}{\beta},\ \tau_F=\dfrac{1}{2\pi f_T}$ | $f_\beta$ is far **below** $f_T$ (530 MHz and $\beta=100$ gives 5.3 MHz). $C_\mu$ enters $f_T$ unmultiplied: the output is AC-short-circuited. |
| Feedback amplifier | $A_f=\dfrac{A}{1+A\beta},\ D=1+A\beta,\ \dfrac{dA_f}{A_f}=\dfrac{1}{D}\dfrac{dA}{A},\ f_{Hf}=Df_H,\ f_{Lf}=\dfrac{f_L}{D}$ | $A_f$ is always $1/D$ below the ideal $1/\beta$: $A=1000$, $\beta=0.01$ gives 90.9, not 100. |
| Feedback port resistances | series mixing $R_{if}=R_iD$; shunt mixing $R_{if}=R_i/D$; voltage sampling $R_{of}=R_o/D$; current sampling $R_{of}=R_oD$ | **Input mixing sets $R_{in}$; output sampling sets $R_{out}$.** Series-shunt = voltage amp ($R_{in}\uparrow$, $R_{out}\downarrow$); shunt-series = current amp. |
| Barkhausen | $\lvert A\beta\rvert=1$ and $\angle A\beta=0^{\circ}$ (equivalent to $A\beta=-1$ in the negative-feedback convention) | Phase picks the frequency, magnitude picks the minimum gain. Start with $\lvert A\beta\rvert$ a few percent above 1 and limit the amplitude. |
| Power amplifier classes | A: 25 % resistive, 50 % transformer-coupled; B: $\eta=\dfrac{\pi}{4}\dfrac{V_p}{V_{CC}}\le78.5\%$ | $P_{o(max)}=\dfrac{V_{CC}^2}{2R_L}$ dual supply, $\dfrac{V_{CC}^2}{8R_L}$ single supply (OTL, output capacitor). $P_i=\dfrac{2}{\pi}I_pV_{CC}$. |
| Class B dissipation | $P_D=\dfrac{2V_{CC}^2}{\pi^2R_L}$ at $V_p=\dfrac{2V_{CC}}{\pi}\approx0.636V_{CC}$ | Worst case is at **part** power, at exactly 50 % efficiency, not at full output. Class A is worst at **zero** signal. |
| Class AB bias | $V_{BB}=V_{BE}\left(1+\dfrac{R_1}{R_2}\right)$ (multiplier), $I_Q=\dfrac{V_{BB}-2V_{BE}}{2R_E}$ | Set $V_{BB}$ slightly above $2V_{BE}$; exactly $2V_{BE}$ means $I_Q=0$ and the crossover notch returns. |
| Wien bridge | $f_0=\dfrac{1}{2\pi RC},\ \beta=\dfrac{1}{3},\ A=1+\dfrac{R_f}{R_1}=3\Rightarrow\dfrac{R_f}{R_1}=2$ | Non-inverting amp, $\beta=1/3$ at the zero-phase frequency. Amplitude control goes in the **ground** arm. |
| RC phase-shift (3 sections) | $f_0=\dfrac{1}{2\pi RC\sqrt{6}},\ \beta=\dfrac{1}{29},\ \lvert A\rvert\ge29$ (inverting, $R_f/R_{in}\ge29$) | Two sections can only reach $180^{\circ}$ at $\omega=0$, where $\beta=0$. Using $1/(2\pi RC)$ is 2.45x too high. |
| Hartley | $f_0=\dfrac{1}{2\pi\sqrt{(L_1+L_2)C}},\ \beta=\dfrac{L_1}{L_2},\ \lvert A_v\rvert\ge\dfrac{L_2}{L_1}$ | The tapped windings are in **series** and add. Parallel is 2.5x off. |
| Colpitts | $f_0=\dfrac{1}{2\pi\sqrt{LC_1C_2/(C_1+C_2)}},\ \beta=\dfrac{C_1}{C_2},\ \lvert A_v\rvert\ge\dfrac{C_2}{C_1}$ | The divider capacitors are in **series**. 470 pF with 2.2 nF gives 387.3 pF, not 2.67 nF. |
| Crystal | $f_s=\dfrac{1}{2\pi\sqrt{LC}},\ f_p=f_s\sqrt{1+\dfrac{C}{C_m}},\ Q=\dfrac{\omega_sL}{R}$ | $L,C$ are the motional elements. Inductive only between $f_s$ and $f_p$ (0.1 % band). Dropping the square root doubles that band. |

### Calculator shortcuts (Casio F-789SGA, verified keys only)

- **Quadratic in $I_D$** (self-bias or divider JFET): expand to $aI_D^2+bI_D+c=0$, then `MODE` `5` page 2 `1` (quadratic), coefficients into `a` `b` `c` `=` — both roots in seconds. Keep the root inside $V_P\le V_{GS}\le0$.
- **Chained bias evaluation:** `ALPHA` `:` joins statements on one line, e.g. `(12−0.7)÷(240E3+101E3)` `ALPHA` `:` `×100` `ALPHA` `:` `12−Ans×2.2E3` gives $I_B$, $I_C$, $V_{CE}$ without re-keying.
- **Load-line or bias-equation solve:** type the equation with `ALPHA` `=` for the inner equals, `SHIFT` `SOLVE`, supply a guess, `=`; `L−R` shows the residual. Ideal for $8-0.5X=10-0.6667X$ (Q point) or $120=2.478X\div0.026$ (bias design).
- **Parallel combinations and complex gain:** `x⁻¹` on each branch then sum then invert; in `MODE` `2` (CPLX) enter $A_v$ as a complex number and read magnitude and phase with `Apps` `▶r∠θ` and `Arg` — this is the fast route to a cascode/Miller $C_{bc}(1+\lvert A_v\rvert)$ when the gain is complex.
- **Decibels:** `20 log(123.1)` → 41.8 dB; `10^(91÷20)` → 3.548e4 for a voltage ratio. Never `10 log` for a voltage ratio.
- **$V_T$ exactly:** `SHIFT` `CVALUE` `25` `×` 300 `÷` `SHIFT` `CVALUE` `23` gives $kT/q=25.85\ \mathrm{mV}$ (37 is $Z_0=376.73\ \Omega$ if a transmission-line question appears; `SHIFT` `CVALUE` `38` is the 273.15 K offset).

### Traps that cost marks

- **Sign of $V_P$ in every JFET formula.** $V_P=-4\ \mathrm{V}$ with $V_{GS}=-2.15\ \mathrm{V}$ gives the bracket $1-0.537=0.463$ and $g_m=2.32\ \mathrm{mS}$. Keying $+\lvert V_P\rvert$ gives $5(1.537)=7.7\ \mathrm{mS}$ and wrecks every gain, $R_{out}$ and bandwidth downstream.
- **$r_\pi$ is not $r_e$.** At $I_C=1\ \mathrm{mA}$, $\beta=100$: $r_e=25.7\ \Omega$ but $r_\pi=\beta r_e=2.6\ \mathrm{k}\Omega$. Reporting $26\ \Omega$ as $r_\pi$ is a factor-$\beta$ error, and $g_m$ never depends on $\beta$.
- **Negative computed $V_{CE}$ means saturation.** A $\beta=150$ fixed-bias stage predicts $I_C=7.06\ \mathrm{mA}$ and $V_{CE}=-3.54\ \mathrm{V}$; clamp to $V_{CE(sat)}=0.2\ \mathrm{V}$ and recompute $I_C=(V_{CC}-V_{CE(sat)})/(R_C+R_E)=5.36\ \mathrm{mA}$.
- **$R_C$ alone is not the AC load.** With $R_C=4.7\ \mathrm{k}\Omega$ and $R_L=10\ \mathrm{k}\Omega$ the AC load is 3.197 k$\Omega$, so $A_v=-246$, not $-362$ (47 % high). Same trap at 2.2 k / 4.7 k: 1.499 k$\Omega$ and $A_v=-150$, not $-220$.
- **Forgetting $C_E$ has been removed.** Unbypassed $R_E=470\ \Omega$ against $r_e=13\ \Omega$ drops the gain from $-246$ to $-6.62$ while $Z_i$ rises from 1.93 k$\Omega$ to 54.8 k$\Omega$. Both numbers change together.
- **Inversion bookkeeping.** CE inverts, CB and CC do not. Two CE stages give a **positive** overall gain; $n$ inverting stages give $(-1)^n$. Half the marks on a cascade question are the sign.
- **Interstage loading.** $R_{in2}=2.2\ \mathrm{k}\Omega$ across $R_{C1}=4.7\ \mathrm{k}\Omega$ costs 9.9 dB (188 down to 59.9). Multiplying unloaded gains overstates a two-stage amplifier by 6 to 10 dB.
- **Miller at the wrong node or with the wrong sign.** $C_{Mi}=C_{bc}(1+\lvert A_v\rvert)=202\ \mathrm{pF}$ at the input; the output sees only $2.02\ \mathrm{pF}$. A cascode does not delete $C_{bc}$ — it drops the multiplier from 81 to 2 (258 pF to 21 pF, a 12.3x bandwidth gain).
- **$C_\mu$ inside $f_T$.** $f_T=g_m/[2\pi(C_\pi+C_\mu)]$ with the output shorted, so $C_\mu$ enters unmultiplied: 530.5 MHz, not 30 MHz. And $f_\beta=f_T/\beta$ (5.3 MHz), never $\beta f_T$.
- **Topology names reversed.** The order is (input mixing)(output sampling): series-shunt is the voltage amplifier, shunt-series the current amplifier. Mixing sets $R_{in}$ (series $\times D$, shunt $\div D$); sampling sets $R_{out}$ (voltage $\div D$, current $\times D$).
- **Class B efficiency is signal-level dependent.** $\eta=(\pi/4)(V_p/V_{CC})$: 78.5 % only at $V_p=V_{CC}$, 39.3 % at half swing. And the heatsink is sized for $V_p=0.636V_{CC}$, where dissipation peaks (10.13 W against 6.83 W at full output for $\pm20\ \mathrm{V}$, $8\ \Omega$).
- **Single-supply OTL is a factor of 4 down.** The output capacitor blocks half the rail, so $P_{o(max)}=V_{CC}^2/(8R_L)$; using $V_{CC}^2/(2R_L)$ also yields a nonsense efficiency above 100 %.
- **Amplitude control in the wrong arm of the Wien bridge.** The lamp goes in the ground arm: $A=1+R_f/R_{lamp}$, so heating lowers the gain. In the feedback arm heating *raises* the gain and the amplitude latches to the rail.
- **$1/\beta$ is not the answer.** Negative feedback gives $A/(1+A\beta)$: $A=1000$, $\beta=0.01$ gives 90.9, exactly $1/D=9.1\%$ below the ideal 100. Distortion already on the input is not reduced by feedback.
- **Crystal band.** The crystal is inductive only between $f_s$ and $f_p$ — 1.13 kHz wide on a 1.1254 MHz crystal. Biasing outside that window fails the loop phase condition.

### Rapid-fire recall

- [ ] **Q1.** Fixed bias, $V_{CC}=12\ \mathrm{V}$, $R_B=240\ \mathrm{k}\Omega$, $R_C=2.2\ \mathrm{k}\Omega$, $\beta=100$. Find $I_B$, $I_C$, $V_{CE}$.
- [ ] **Q2.** The same stage is rebuilt with $\beta=150$. $I_C$ and $V_{CE}$?
- [ ] **Q3.** Voltage divider: $V_{CC}=20\ \mathrm{V}$, $R_1=82\ \mathrm{k}\Omega$, $R_2=22\ \mathrm{k}\Omega$, $R_C=4.7\ \mathrm{k}\Omega$, $R_E=1.5\ \mathrm{k}\Omega$, $\beta=120$. Exact $I_C$ and $V_{CE}$?
- [ ] **Q4.** For Q3, what does the approximation $I_E=(V_{TH}-V_{BE})/R_E$ give, and is it justified?
- [ ] **Q5.** $S_{I_{CO}}$ for fixed bias with $\beta=100$; and for a divider with $R_{TH}=5.79\ \mathrm{k}\Omega$, $R_E=1\ \mathrm{k}\Omega$, $\beta=150$?
- [ ] **Q6.** A JFET has $I_{DSS}=8\ \mathrm{mA}$, $V_P=-4\ \mathrm{V}$, $R_S=1\ \mathrm{k}\Omega$. Find $I_D$, $V_{GS}$ and $g_m$.
- [ ] **Q7.** $A_v$, $Z_i$, $Z_o$ for a CE stage with $r_e=13\ \Omega$, $\beta=150$, $R_C=4.7\ \mathrm{k}\Omega$, $R_L=10\ \mathrm{k}\Omega$, $R_B=220\ \mathrm{k}\Omega$.
- [ ] **Q8.** Same stage, $R_E=470\ \Omega$ left unbypassed. $A_v$ and $Z_i$?
- [ ] **Q9.** CB stage with the same $r_e$ and load: $Z_i$, $A_v$, $A_i$ and the phase.
- [ ] **Q10.** $A_v=-100$, $C_{bc}=2\ \mathrm{pF}$, $C_\pi=10\ \mathrm{pF}$, $R_{th}=1\ \mathrm{k}\Omega$. Find $C_{in}$ and $f_H$.
- [ ] **Q11.** $g_m=40\ \mathrm{mS}$, $C_\pi=10\ \mathrm{pF}$, $C_\mu=2\ \mathrm{pF}$, $\beta=100$. Find $f_T$, $f_\beta$ and $\tau_F$.
- [ ] **Q12.** $A=1000$, $\beta=0.01$, $R_i=10\ \mathrm{k}\Omega$, $R_o=50\ \mathrm{k}\Omega$, series-shunt. Find $A_f$ and both port resistances.
- [ ] **Q13.** Class B, $\pm20\ \mathrm{V}$, $R_L=8\ \Omega$: $P_{o(max)}$, $P_i$, $\eta$, and the dissipation per device at full output and at the worst-case swing.
- [ ] **Q14.** Wien bridge with $R=1.6\ \mathrm{k}\Omega$, $C=0.1\ \mu\mathrm{F}$, $R_1=10\ \mathrm{k}\Omega$: $f_0$ and $R_f$ for marginal oscillation.

> [!success]- Answers
> **Q1.** $I_B=11.3/240\ \mathrm{k}\Omega=47.1\ \mu\mathrm{A}$; $I_C=4.71\ \mathrm{mA}$; $V_{CE}=12-10.36=1.64\ \mathrm{V}$ (active).
> **Q2.** $I_B$ does not move; the linear $I_C=7.06\ \mathrm{mA}$ needs $V_{CE}=-3.54\ \mathrm{V}$, so the device saturates: $I_C=(12-0.2)/2.2\ \mathrm{k}\Omega=5.36\ \mathrm{mA}$ at $V_{CE}=0.2\ \mathrm{V}$.
> **Q3.** $V_{TH}=4.231\ \mathrm{V}$, $R_{TH}=17.35\ \mathrm{k}\Omega$; $I_B=3.531/(17.35+121\times1.5)=17.76\ \mu\mathrm{A}$; $I_C=2.131\ \mathrm{mA}$, $I_E=2.149\ \mathrm{mA}$, $V_{CE}=20-10.01-3.22=6.76\ \mathrm{V}$.
> **Q4.** 2.354 mA, 10.5 % high; $V_{CE}$ would read 5.41 V. Not justified: $\beta R_E=180\ \mathrm{k}\Omega<10R_2=220\ \mathrm{k}\Omega$.
> **Q5.** Fixed: $S=1+\beta=101$. Divider: $151(6.79)/156.79=6.54$ (rule of thumb $1+R_{TH}/R_E=6.79$, 3.8 % high).
> **Q6.** $I_D=8(1-I_D/4)^2$ gives roots 8 and 2 mA; the 8 mA root needs $V_{GS}=-8\ \mathrm{V}$, past pinch-off. Keep $I_D=2\ \mathrm{mA}$, $V_{GS}=-2\ \mathrm{V}$; $g_{m0}=2(8)/4=4\ \mathrm{mS}$ and $g_m=4(1-0.5)=2.0\ \mathrm{mS}$.
> **Q7.** $R_L'=3.197\ \mathrm{k}\Omega$; $A_v=-3197/13=-246$; $Z_i=220\lVert1.95\ \mathrm{k}\Omega=1.93\ \mathrm{k}\Omega$; $Z_o\approx R_C=4.7\ \mathrm{k}\Omega$ (with $r_o=50\ \mathrm{k}\Omega$: $R_{ac}=3.005\ \mathrm{k}\Omega$, $A_v=-231$, 6.4 % lower).
> **Q8.** $A_v=-3197/(13+470)=-6.62$ (a factor of 37 down); $Z_i=220\lVert(1.95+151\times0.470)=220\lVert72.92=54.8\ \mathrm{k}\Omega$ (a factor of 28 up).
> **Q9.** $Z_i=13\lVert2\ \mathrm{k}\Omega=12.9\ \Omega$; $A_v=+246$; $A_i=-\alpha=-150/151=-0.993$; non-inverting ($0^{\circ}$). Electrically the same stage components as Q7, so cross-checking the pair takes seconds.
> **Q10.** $C_{in}=10+2(101)=212\ \mathrm{pF}$; $f_H=159.155/(1\times212)=0.751\ \mathrm{MHz}$.
> **Q11.** $f_T=0.04/[2\pi(12\ \mathrm{pF})]=530.5\ \mathrm{MHz}$; $f_\beta=5.31\ \mathrm{MHz}$; $\tau_F=1/(2\pi f_T)=0.300\ \mathrm{ns}$.
> **Q12.** $D=11$, $A_f=90.9$ (9.09 % below 100); $R_{if}=10\times11=110\ \mathrm{k}\Omega$; $R_{of}=50/11=4.55\ \mathrm{k}\Omega$.
> **Q13.** $I_p=2.5\ \mathrm{A}$, $P_{o(max)}=25\ \mathrm{W}$, $P_i=31.83\ \mathrm{W}$, $\eta=78.5\%$, $P_D=6.83\ \mathrm{W}$ total (3.42 W each). Worst case: $V_p=12.73\ \mathrm{V}$, $P_o=10.13\ \mathrm{W}$, $P_i=20.26\ \mathrm{W}$, $\eta=50\%$, $P_D=10.13\ \mathrm{W}$ total (5.07 W each).
> **Q14.** $f_0=1/(2\pi RC)=994.7\ \mathrm{Hz}$; $\beta=1/3$ so $A=3$ and $R_f=2R_1=20\ \mathrm{k}\Omega$ exactly at the oscillation threshold — in practice set it a few percent high and add the lamp.

### Drill — 5 minutes

**1.** A voltage-divider bias stage uses $V_{CC}=18\ \mathrm{V}$, $R_1=39\ \mathrm{k}\Omega$, $R_2=8.2\ \mathrm{k}\Omega$, $R_C=3.3\ \mathrm{k}\Omega$, $R_E=1\ \mathrm{k}\Omega$, $\beta=150$, $V_{BE}=0.7\ \mathrm{V}$. Find $I_B$, $I_C$, $V_E$, $V_B$, $V_C$ and $V_{CE}$, and prove the device is active.
> [!success]- Solution
> $V_{TH}=8.2(18)/47.2=3.127\ \mathrm{V}$; $R_{TH}=39(8.2)/47.2=6.775\ \mathrm{k}\Omega$.
> $I_B=(3.127-0.7)/(6.775+151)=2.427/157.78=15.38\ \mu\mathrm{A}$; $I_C=150(15.38\ \mu\mathrm{A})=2.308\ \mathrm{mA}$; $I_E=2.323\ \mathrm{mA}$.
> $V_E=2.323\ \mathrm{V}$, $V_B=3.023\ \mathrm{V}$ (check $V_{TH}-I_BR_{TH}=3.127-0.104=3.023$), $V_C=18-7.615=10.385\ \mathrm{V}$.
> $V_{CE}=10.385-2.323=8.06\ \mathrm{V}>0.2\ \mathrm{V}$ and $V_{BC}=3.023-10.385=-7.36\ \mathrm{V}<0$, so the device is forward-active. **Trap:** reporting $V_{CE}=18-7.615=10.39\ \mathrm{V}$ by forgetting the $I_ER_E$ drop — 29 % high here.

**2.** For the stage of problem 1, $R_{TH}=6.775\ \mathrm{k}\Omega$, $R_E=1\ \mathrm{k}\Omega$, $\beta=150$. Find the exact $S_{I_{CO}}$, the rule-of-thumb value, and the collector-current change for $\Delta I_{CO}=0.5\ \mu\mathrm{A}$.
> [!success]- Solution
> $S=(1+\beta)(R_{TH}+R_E)/[R_{TH}+(1+\beta)R_E]=151(7.775)/(6.775+151)=1174.0/157.78=7.44$.
> Rule of thumb $1+R_{TH}/R_E=1+6.775=7.775$, which is 4.5 % high.
> $\Delta I_C=7.44\times0.5\ \mu\mathrm{A}=3.72\ \mu\mathrm{A}$ — 0.16 % of the 2.308 mA quiescent current. **Trap:** using $S=1+\beta=151$ overstates this drift by a factor of 20 and hides the reason $R_E$ is there.

**3.** A CE stage has $I_E=2\ \mathrm{mA}$, $\beta=150$, $R_C=4.7\ \mathrm{k}\Omega$, an unbypassed $R_E=470\ \Omega$, and is fed from $v_s=10\ \mathrm{mV}$ peak through $R_s=600\ \Omega$ (take $R_B$ large). Find $r_e$, $A_v$, $Z_i$ and the output peak.
> [!success]- Solution
> $r_e=26\ \mathrm{mV}/2\ \mathrm{mA}=13\ \Omega$; $\beta r_e=1.95\ \mathrm{k}\Omega$.
> $A_v=-R_C/(r_e+R_E)=-4700/483=-9.73$ (compare $-R_C/r_e=-362$ if the bypass were fitted).
> $Z_i=\beta r_e+(\beta+1)R_E=1950+70.97\ \mathrm{k}\Omega=72.9\ \mathrm{k}\Omega$.
> $v_b=10\ \mathrm{mV}\times72.9/(72.9+0.6)=9.92\ \mathrm{mV}$; $v_o=9.73\times9.92\ \mathrm{mV}=96.5\ \mathrm{mV}$ peak.
> **Trap:** the $(\beta+1)$ multiplier. Using $\beta R_E=70.5\ \mathrm{k}\Omega$ instead of 70.97, or forgetting $R_E$ in the gain denominator, is the difference between 9.73 and 362.

**4.** A class B complementary output stage runs from $\pm24\ \mathrm{V}$ into $R_L=8\ \Omega$. Find $P_{o(max)}$, $I_p$, $P_i$ at full output, the efficiency, the per-device dissipation at full output, and the worst-case per-device dissipation with its $V_p$.
> [!success]- Solution
> $I_p=V_{CC}/R_L=24/8=3.0\ \mathrm{A}$; $P_{o(max)}=V_{CC}^2/(2R_L)=576/16=36\ \mathrm{W}$.
> $P_i=(2/\pi)I_pV_{CC}=(2/\pi)(3)(24)=45.84\ \mathrm{W}$; $\eta=36/45.84=78.5\%$ (that is $\pi/4$).
> $P_D=45.84-36=9.84\ \mathrm{W}$ total, $4.92\ \mathrm{W}$ per device at full output.
> Worst case: $V_p=2V_{CC}/\pi=15.28\ \mathrm{V}$ ($0.636V_{CC}$), $I_p=1.910\ \mathrm{A}$, $P_o=V_p^2/(2R_L)=14.59\ \mathrm{W}$, $P_i=(2/\pi)(1.910)(24)=29.18\ \mathrm{W}$, so $P_D=14.59\ \mathrm{W}$ total and **$7.29\ \mathrm{W}$ per device** at 50 % efficiency — 1.48x the full-output figure.
> **Trap:** sizing the heatsink from the full-output 4.92 W per device. Also note $\eta=(\pi/4)(V_p/V_{CC})$ is 39.3 % at half swing, so 78.5 % applies only at $V_p=V_{CC}$.

---

## Block 6 — Power Electronics and Systems (5 min)

**Topics:** [[01_Power_Switches_MOSFET,_IGBT,_GTO,_TRIAC|Power Switches]] · [[02_Thermal_Resistance_and_Heat_Sinking|Thermal Resistance]] · [[03_SCR_Phase-Controlled_Rectifiers|SCR Phase Control]] · [[04_Buck_Converter|Buck]] · [[05_Boost_Converter|Boost]] · [[06_Buck-Boost_Converter|Buck-Boost]] · [[07_Inverters_Half-Bridge_and_Full-Bridge|Inverters]] · [[08_PWM_Techniques|PWM]] · [[09_Linear_Voltage_Regulators|Linear Regulators]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Buck, CCM | $V_o=DV_s$, $\Delta I_L=\dfrac{V_o(1-D)}{Lf_s}$ | Step-down only. Ripple is load-independent; $D=V_o/V_s$. |
| Boost, CCM | $V_o=\dfrac{V_s}{1-D}$, $I_L=I_{in}=\dfrac{I_o}{1-D}$ | Step-up. The inductor carries the *input* current, not $I_o$. |
| Buck-boost, CCM | $V_o=\dfrac{-DV_s}{1-D}$, $D=\dfrac{\lvert V_o\rvert}{\lvert V_o\rvert+V_s}$ | Inverting: drop the minus sign and the answer is wrong. |
| CCM/DCM boundary | $I_{o,B}=\dfrac{\Delta I_L}{2}=\dfrac{V_o(1-D)}{2Lf_s}$, $L_{min}=\dfrac{(1-D)R}{2f_s}$ | Below $I_{o,B}$ the ratio breaks and $V_o$ rises above $DV_s$ (buck) or above $V_s/(1-D)$ (boost). |
| Duty from a target | $D_{\mathrm{buck}}=\dfrac{V_o}{V_s}$, $D_{\mathrm{boost}}=1-\dfrac{V_s}{V_o}$ | $D=1-V_s/V_o$, never $V_s/V_o$. A computed $D>1$ means the topology is impossible. |
| Capacitor ripple | Buck $\Delta V_o=\dfrac{\Delta I_L}{8f_sC}$; boost $\Delta V_o=\dfrac{I_oD}{Cf_s}$ | Only the boost carries $D$ here. Add $I_{L,pk}\times ESR$ in both. |
| Device stress | Buck: $V_{sw}=V_s$. Boost/buck-boost: $V_{sw}=V_o$ or $V_s+\lvert V_o\rvert$ | The boost switch stands off the *output*, so a 12 V-to-24 V design needs a 60 V part. |
| SCR phase control | $V_{avg}=\dfrac{V_m}{2\pi}(1+\cos\alpha)$ (one SCR), $\dfrac{V_m}{\pi}(1+\cos\alpha)$ (bridge) | Factor 2 apart. Heating uses $V_{rms}$, never $V_{avg}$. |
| SCR with free-wheeling diode | $V_{rms}=V_m\sqrt{\dfrac{1}{2\pi}\left(\pi-\alpha+\dfrac{\sin 2\alpha}{2}\right)}$ | $\alpha$ in radians inside $\sin 2\alpha$; $90^\circ$ gives exactly half power. |
| Thermal chain | $T_j=T_a+P_D(\theta_{jc}+\theta_{cs}+\theta_{sa})$, $\theta_{sa}=\dfrac{T_{j,max}-T_a}{P_D}-\theta_{jc}-\theta_{cs}$ | Three series resistors. A negative $\theta_{sa}$ proves the design is impossible. |
| Switching + gate loss | $P_{sw}=\tfrac12V_{ds}I_D(t_r+t_f)f_{sw}$, $P_g=Q_gV_{GS}f_{sw}$ | Both scale with $f_{sw}$; the MOSFET conducts as $I_D^2R_{DS(on)}$, the IGBT as $V_{CE(sat)}I_C$. |
| Linear regulator | $P_D=(V_{in}-V_o)I_o$, $\eta\approx\dfrac{V_o}{V_{in}}$ | Ratio-limited, independent of load. 12 V to 5 V is 41.7% and 7 W of heat per ampere. |
| Inverter output | $V_{o1,rms}=\dfrac{2\sqrt2}{\pi}V_{dc}=0.900V_{dc}$, $THD=\sqrt{\pi^2/8-1}=48.3\%$ | Half bridge is exactly half (0.450$V_{dc}$); three-phase six-step is 0.7797$V_{dc}$ line-to-line, 31.1%. |
| PWM output | $V_{o1,peak}=m_aV_{dc}$ ($m_a\le1$); ceiling $\dfrac{4V_{dc}}{\pi}=1.273V_{dc}$ | $m_aV_{dc}$ is a **peak**; divide by $\sqrt2$ for rms. Overmodulation buys at most 27%. |
| SCR mean/RMS currents | $I_{o,rms}=\dfrac{V_{o,rms}}{R_L}$, $P=I_{o,rms}^2R_L$ | $V_{avg}I_{avg}$ underestimates heat badly (factor 7 at $\alpha=60^\circ$). |

**Calculator (COMP, `MODE` `1`) — chain with `ALPHA` `:`:** for CCM/DCM boundary, $D=0.4$, $V_o=9.6$, $L=100$ µH, $f=100$ kHz: type `0.4:9.6(1-0.4)/(100e-6*100e3):Ans/2` → $\Delta I_L=0.576$, $I_{o,B}=0.288$. Duty from a target with `SHIFT` `SOLVE`: enter $12=48X$ and solve for $X$ → $D=0.25$. For SCR average/RMS at $\alpha=60^\circ$: `MODE` `1`, `(169.706/(2pi))(1+cos(60))` then `169.706*sqrt((pi-pi/3+sin(2pi/3)/2)/(2pi))` — keep the calculator in **degrees** and key $\sin 2\alpha$ as $\sin(120)$, or convert with `SHIFT` `DRG`. Thermal inversion in one line: `(125-40)/4.5-1.2-2:Ans-(0.5+0.8)` gives the required $\theta_{sa}$. Use `SHIFT` `STO` to park $V_m=\sqrt2(120)=169.706$ in `A`, then `RCL` `A` on every later line. `∫dx` computes the average or rms of a chopped waveform directly when you have only the graph, and `log`/`ln` handle dB: `20log((2.152^2*50)/(40.5*0.810))` confirms the 8.5 dB gap between true and apparent power.

### Traps that cost marks

- **Using $V_s$ instead of $V_s-V_o$ for the on-time voltage across $L$.** At $D=0.4$, $V_o=9.6$ V, $L=100$ µH, $f=100$ kHz the ripple is $0.576$ A; the wrong form gives $0.96$ A and doubles the predicted output ripple.
- **Claiming $V_o=DV_s$ at every load.** It holds only in CCM. Below $I_{o,B}=\Delta I_L/2$ the diode stops conducting early and $V_o$ climbs above $DV_s$ — an open-loop bench test shows it immediately.
- **Rating the boost switch at $V_s$.** The off switch and the reverse diode both stand off the full $V_o$; 12 V to 24 V destroys a 20 V device on the first cycle.
- **Using the load current as the boost inductor current.** $I_L=I_o/(1-D)$: a 1.2 A load at $D=0.5$ draws 2.4 A through the inductor and switch.
- **Computing load power from the average.** A half-wave SCR on 120 V rms, 50 $\Omega$, $\alpha=60^\circ$ gives $V_{avg}=40.5$ V but $V_{rms}=107.6$ V, so the resistor burns $232$ W, not $V_{avg}I_{avg}=32.8$ W.
- **Halving or doubling the SCR formulas.** One SCR uses the $2\pi$ denominator, a bridge the $\pi$ denominator. At $\alpha=60^\circ$: 40.5 V versus 81.0 V.
- **Ignoring the extinction angle with an RL load.** With large $L$ and no free-wheeling diode the current persists to $\beta=\pi+\alpha$; at $\alpha=120^\circ$ the average is $V_m\cos\alpha/\pi=-27.0$ V (inversion), not $+13.5$ V — the sign flips.
- **Omitting $\theta_{cs}$.** A mica washer plus compound is about $0.5\ ^\circ\mathrm{C/W}$; leaving it out makes a 25 W design look $12.5\ ^\circ\mathrm{C}$ cooler than it is.
- **Quoting the 25 $^\circ$C $R_{DS(on)}$ or the 25 $^\circ$C $P_D$ rating.** Hot $R_{DS(on)}$ is roughly double; a 50 W device at $T_C=25\ ^\circ\mathrm{C}$ with $\theta_{jc}=2.5\ ^\circ\mathrm{C/W}$ is only 20 W at $T_C=100\ ^\circ\mathrm{C}$.
- **Believing a linear regulator can be efficient.** 12 V to 5 V is capped at 41.7%; 1 A always means at least 7 W inside the pass device.
- **Mixing the two PWM $m_a$ conventions.** Whole-bus, $\pm V_{dc}$ swing gives $V_{o1,peak}=m_aV_{dc}$; a single leg swinging 0 to $V_{dc}$ gives $m_aV_{dc}/2$. Never mix them inside one problem.

### Rapid-fire recall

- [ ] **Q1.** Buck: $V_s=24$ V, $D=0.4$ — find $V_o$ and $\Delta I_L$ at $L=100$ µH, $f=100$ kHz.
- [ ] **Q2.** At what load current does that converter leave CCM?
- [ ] **Q3.** Boost: $V_o=24$ V from $V_s=12$ V, $I_o=1.2$ A — find $D$, $I_L$ and $\Delta I_L$ at $L=100$ µH, $f=50$ kHz.
- [ ] **Q4.** Buck-boost: $V_o$ for $V_s=12$ V, $D=0.5$ — magnitude and polarity?
- [ ] **Q5.** What does the boost switch block when $V_o=48$ V?
- [ ] **Q6.** Ideal $V_o$ of a buck at $D=0.4$ and the real $V_o$ with $V_F=0.7$ V, $V_{sw}=0.05$ V.
- [ ] **Q7.** Three-terminal regulator: 12 V in, 5 V out, 1 A — dissipation and efficiency?
- [ ] **Q8.** Linear regulator efficiency at $V_{in}=7$ V, $V_o=5$ V, 1 A.
- [ ] **Q9.** $T_j$ for $P_D=3$ W, $T_a=40\ ^\circ\mathrm{C}$, $\theta_{ja}=1.5+0.5+8$.
- [ ] **Q10.** Full-wave bridge SCR at $\alpha=60^\circ$, $V_m=169.7$ V — $V_{avg}$ and load power into 50 $\Omega$.

> [!success]- Answers
> **Q1.** $V_o=0.4(24)=9.6$ V; $\Delta I_L=\dfrac{9.6(0.6)}{(100\times10^{-6})(100\times10^{3})}=\dfrac{5.76}{10}=0.576$ A p-p.
> **Q2.** $I_{o,B}=\Delta I_L/2=0.288$ A, i.e. $L_{min}=\dfrac{(1-0.4)R}{2f_s}=30$ µH at $R=10\ \Omega$; below 0.288 A the output rises above 9.6 V.
> **Q3.** $D=1-12/24=0.5$; $I_L=I_o/(1-D)=1.2/0.5=2.4$ A; $\Delta I_L=\dfrac{V_sD}{Lf_s}=\dfrac{12(0.5)}{(100\times10^{-6})(50\times10^{3})}=1.2$ A p-p, so $I_{L,pk}=3.0$ A.
> **Q4.** $V_o=-\dfrac{DV_s}{1-D}=-\dfrac{12(0.5)}{0.5}=-12$ V — inverting, magnitude equals the input at $D=0.5$.
> **Q5.** The full output: $V_{sw,off}=V_o=48$ V (the diode blocks 48 V too), so specify at least a 100 V device.
> **Q6.** Ideal 9.6 V; real $V_o=D(V_s-V_{sw})-(1-D)V_F=0.4(24-0.05)-0.6(0.7)=9.58-0.42=9.16$ V, 4.6% low — the diode costs $(1-D)V_F=0.42$ V.
> **Q7.** $P_D=(12-5)(1)=7.00$ W; $I_{in}=1.005$ A so $\eta=5.00/12.06=41.5\%$ (the ratio $V_o/V_s=41.7\%$).
> **Q8.** $\eta=5/(7\times1.005)=5/7.035=71.1\%$, with only $(7-5)(1)=2.00$ W of heat.
> **Q9.** $\theta_{ja}=10.0\ ^\circ\mathrm{C/W}$, so $T_j=40+3(10)=70\ ^\circ\mathrm{C}$ — 80 $^\circ$C of margin to 150 $^\circ$C.
> **Q10.** $V_{avg}=\dfrac{169.7}{\pi}(1+\cos60^\circ)=81.0$ V; $V_{rms}=152.2$ V, so $P=152.2^2/50=463$ W (each SCR drops 0.232 W through 0.05 $\Omega$).

### Drill — 4 minutes

**1.** A buck converter steps 48 V down to 12 V at 2 A with $f_s=50$ kHz. Find $D$, the minimum inductance for CCM, the inductance for $\Delta I_L=0.4$ A p-p, and the capacitor for 50 mV of output ripple.
> [!success]- Solution
> $D=V_o/V_s=12/48=0.25$. Load resistance $R=V_o/I_o=6\ \Omega$, so $L_{min}=\dfrac{(1-0.25)(6)}{2(50\times10^{3})}=\dfrac{4.5}{10^{5}}=45$ µH. Ripple-limited: $L=\dfrac{V_o(1-D)}{\Delta I_Lf_s}=\dfrac{12(0.75)}{(0.4)(50\times10^{3})}=450$ µH. Capacitor: $C=\dfrac{\Delta I_L}{8f_s\Delta V_o}=\dfrac{0.4}{8(50\times10^{3})(0.05)}=20$ µF. Take 450 µH — the ripple spec binds, not the CCM boundary. **Trap:** sizing at 45 µH gives $\Delta I_L=12(0.75)/(45\times10^{-6}\times50\times10^{3})=4$ A, ten times the specification.

**2.** A half-wave SCR rectifier runs from 120 V rms at 60 Hz into 50 $\Omega$ with $\alpha=60^\circ$. Find $V_m$, $V_{avg}$, $V_{rms}$ and the load power.
> [!success]- Solution
> $V_m=\sqrt2(120)=169.7$ V. $V_{avg}=\dfrac{169.7}{2\pi}(1+\cos60^\circ)=27.01(1.5)=40.5$ V. Bracket: $\pi-\alpha+\dfrac{\sin2\alpha}{2}=3.1416-1.0472+0.4330=2.5274$; divide by $2\pi$ → $0.40225$, root $0.6342$, so $V_{rms}=169.7(0.6342)=107.6$ V. Power $=V_{rms}^2/R=107.6^2/50=232$ W. **Trap:** $V_{avg}I_{avg}=40.5(0.810)=32.8$ W is seven times too low — a resistor heats on the rms waveform.

**3.** A MOSFET dissipates 4.5 W through $\theta_{jc}=1.2\ ^\circ\mathrm{C/W}$ and a mica washer of $\theta_{cs}=0.5\ ^\circ\mathrm{C/W}$. With $T_a=40\ ^\circ\mathrm{C}$ and $T_{j,max}=125\ ^\circ\mathrm{C}$, find the required heat sink and the junction temperature if the sink is $8\ ^\circ\mathrm{C/W}$.
> [!success]- Solution
> Allowed rise $=125-40=85\ ^\circ\mathrm{C}$, so total $\theta_{ja}\le85/4.5=18.9\ ^\circ\mathrm{C/W}$ and $\theta_{sa}\le18.9-1.2-0.5=17.2\ ^\circ\mathrm{C/W}$ — any modest sink works. With an $8\ ^\circ\mathrm{C/W}$ sink, $\theta_{ja}=1.2+0.5+8.0=9.7$ and $T_j=40+4.5(9.7)=40+43.7=83.7\ ^\circ\mathrm{C}$, inside the limit with 41 $^\circ$C of margin. **Trap:** using $\theta_{jc}=1.2$ alone predicts $45.4\ ^\circ\mathrm{C}$ and hides a failing interface; and if the loss were computed at 25 $^\circ$C $R_{DS(on)}$, the hot loss would be about double and the margin would vanish.

---

## Block 7 — Industrial Automation, Op-Amps and Sensors (8 min)

**Topics:** [[01_Op-Amp_Fundamentals_and_Real_Parameters|Op-Amp Parameters]] · [[02_Linear_Op-Amp_Circuits|Linear Circuits]] · [[03_Instrumentation_and_Difference_Amplifiers|In-Amps]] · [[04_Integrators_and_Differentiators|Integrators]] · [[05_Comparators_and_Schmitt_Triggers|Comparators]] · [[06_Precision_Rectifiers|Precision Rectifiers]] · [[07_Active_Filter_Responses|Filter Responses]] · [[08_Sallen-Key_Filter_Design|Sallen-Key]] · [[09_Temperature_Sensors|Temperature]] · [[10_Strain_Gauges_and_Wheatstone_Bridge|Strain Gauges]] · [[11_Position_Sensors_LVDT,_Hall,_Encoders|Position]] · [[12_Signal_Conditioning_and_DAQ|Signal Conditioning]] · [[13_ADC_Architectures_and_Quantization|ADC]] · [[14_DAC_Architectures|DAC]] · [[15_PLC_Architecture_and_Scan_Cycle|PLC Scan]] · [[16_Ladder_Logic,_Timers_and_Counters|Ladder Logic]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Golden rules | $V_+=V_-$, $I_+=I_-=0$ | Only with negative feedback and huge $A_{ol}$; false in a comparator or during clipping. |
| Inverting / non-inverting | $V_o=-\dfrac{R_f}{R_1}V_i$, $V_o=\left(1+\dfrac{R_f}{R_1}\right)V_i$ | Inverting $R_{in}=R_1$ exactly; a source resistance adds to $R_1$ as $-R_f/(R_1+R_s)$. |
| Noise gain, bandwidth | $NG=1+\dfrac{R_f}{R_1}$, $f_{-3\mathrm{dB}}=\dfrac{GBW}{NG}$ | Always the noise gain: an inverting gain of 100 rolls off at $GBW/101$, not $GBW/100$. |
| Slew-rate limit | $2\pi fV_p\le SR$, $f_{max}=\dfrac{SR}{2\pi V_p}$ | $SR$ in V/s: 0.5 V/µs is $5\times10^5$ V/s. Large-signal, unlike GBW. |
| DC errors | $V_{o,err}=V_{OS}\left(1+\dfrac{R_f}{R_1}\right)+I_{OS}R_f$ | Offset is multiplied by the noise gain. CMRR/PSRR are voltage ratios: divide by $10^{\mathrm{dB}/20}$. |
| Difference amp | $V_o=\dfrac{R_2}{R_1}(V_2-V_1)$ if $\dfrac{R_2}{R_4}=\dfrac{R_1}{R_3}$; $\mathrm{CMRR}\approx\dfrac{1+R_2/R_1}{4\delta}$ | Resistor tolerance, not the op-amp, sets CMRR: gain 100 with 1% parts is about 68 dB. |
| Instrumentation amp | $G=1+\dfrac{2R}{R_{gain}}$ (unity output stage) | The factor 2 is the classic error. Open $R_{gain}$ gives gain 1, not infinity; $R_{gain}=2R/(G-1)$. |
| Integrator / differentiator | $f_b=\dfrac{1}{2\pi R_fC}$ (practical integrator), $f_b=\dfrac{1}{2\pi R_1C}$, $A_{HF}=-\dfrac{R_f}{R_1}$ | The integrator corner uses $R_f$, the differentiator corner uses $R_1$ — swap them and you are two decades out. |
| Schmitt thresholds | Inverting: $\pm\dfrac{V_{sat}R_1}{R_1+R_2}$; non-inverting: $\pm\dfrac{V_{sat}R_1}{R_2}$ (needs $R_1<R_2$) | Different ratios. Band is centred on $V_{ref}R_2/(R_1+R_2)$, not on $V_{ref}$. Use $V_{sat}$, not $V_{CC}$. |
| Precision rectifier | $V_o=\lvert V_i\rvert$; average $=\dfrac{2V_p}{\pi}=0.6366V_p$, rms $=0.7071V_p$ | The 1:2 summing ratio is mandatory. Average and rms are 11% apart — that is the 1.11 form factor. |
| Second-order filter | $H(s)=\dfrac{K\omega_0^2}{s^2+(\omega_0/Q)s+\omega_0^2}$, $Q=\dfrac{1}{3-K}$ (equal components), $K=3-\dfrac{1}{Q}=1.586$ | Equal components with $K=1$ gives $Q=0.5$, $-6$ dB at $f_0$, $-3$ dB at $0.6436f_0$. $K\ge3$ oscillates. |
| Sallen-Key design | $f_0=\dfrac{1}{2\pi\sqrt{R_1R_2C_1C_2}}$, unity gain $Q=\dfrac{1}{2}\sqrt{\dfrac{C_1}{C_2}}$ so $\dfrac{C_1}{C_2}=4Q^2$ | Butterworth needs $C_1=2C_2$ at unity gain. Check $GBW\ge100f_0Q$. |
| RTD / thermocouple | $R=R_0(1+\alpha T)$; Pt100 $=0.385\ \Omega/^\circ\mathrm{C}$; $V=S(T_h-T_c)$ | CVD term: linear form is $1.1\ ^\circ\mathrm{C}$ high at 150 $^\circ$C. Uncompensated type K reads low by $T_c$ itself. |
| Thermistor / IC sensor | $R=R_{25}\exp\left[\beta\left(\dfrac{1}{T}-\dfrac{1}{T_{25}}\right)\right]$, $\alpha=-\dfrac{\beta}{T^2}\approx-3.9\%/^\circ\mathrm{C}$; LM35 $=10$ mV/$^\circ$C | $T$ in kelvin. Steinhart-Hart for accuracy; the beta equation is not a linear fit. |
| Wheatstone bridge | $V_o=\dfrac{V_{ex}}{4}GF\varepsilon$ (quarter), $\dfrac{V_{ex}}{2}GF\varepsilon$ (half), $V_{ex}GF\varepsilon$ (full) | The factor of 4 is the exam trap: 1000 µε on 10 V gives only 5 mV. Use the in-amp on the $V_{ex}/2$ pedestal. |
| ADC / DAC resolution | $1\ \mathrm{LSB}=\dfrac{FS}{2^n}$, $e_{rms}=\dfrac{LSB}{\sqrt{12}}$, $SNR=6.02n+1.76$ dB | $2^n$, not $2^n-1$. Full-scale code is $2^n-1$, one LSB below $FS$. 12-bit/10 V → 2.44 mV, 74.0 dB. |
| Aliasing / S&H | $f_{alias}=\lvert f-kf_s\rvert$, $\Delta V=\dfrac{I_{leak}\Delta t}{C}$, $\Delta V=2\pi fV_pt_j$ | Anti-alias filtering is analog and *before* the converter. 8 kHz sampled at 10 kHz folds to 2 kHz. |
| PLC scan | $T_{scan}=T_{in}+T_{exec}+T_{out}+T_{os}$; response $\approx2T_{scan}$; pulse $>T_{scan}$ | Anything shorter than a scan is missed. Timers: TON resets when the rung drops, RTO retains, RES clears it. |

**Calculator (COMP `MODE` `1`, chain with `ALPHA` `:`):** one-line filter gain — `1/sqrt(1+(10000/1001)^2)` → 0.0996, then `20log(Ans)` for $-20.0$ dB. Use `MODE` `2` CPLX for a transfer function: enter $1/(1+i\omega RC)$ and read `Abs` for the magnitude and `Arg` for the phase, which settles any $-3$ dB or phase question in seconds. `SHIFT` `CVALUE` 23 = $e$ and 25 = $k$ are the two worth knowing for sensor physics; `SHIFT` `STO` parks a reference voltage or $V_m$ in a variable and `RCL` recalls it. For ADC ladder work use `x!` and `nCr`: `2^12` and `4096`, then `5/Ans` gives the LSB — and `nCr(12,2)` counts the comparator pairs in a flash converter. `SHIFT` `SOLVE` handles implicit design equations such as $0.7071=1/(3-K)$ or $\dfrac{1}{1+R_f/1000}=0.5$.

### Traps that cost marks

- **Using the signal gain instead of the noise gain for bandwidth.** An inverting $\times100$ stage has $NG=101$, so a 1 MHz op-amp rolls off at 9.9 kHz — the inverting configuration buys no bandwidth.
- **Leaving $SR$ in V/µs.** 0.5 V/µs is $5\times10^5$ V/s; using 0.5 makes the full-power bandwidth $10^6$ times too small.
- **Treating CMRR in dB as a power ratio.** $10^{90/20}=3.16\times10^4$, not $10^9$; CMRR and PSRR are voltage ratios.
- **Reporting a saturated output from the linear formula.** 11 × 0.6 V = 6.6 V is impossible on $\pm6$ V rails with 1.5 V dropout; the answer clips at about 4.5 V.
- **Blaming the op-amp for poor CMRR in a difference amplifier.** A 120 dB op-amp inside four 1% resistors gives the network's roughly 68 dB; only matching fixes it.
- **Writing the in-amp gain as $1+R/R_{gain}$.** Dropping the factor of 2 halves the design gain; and $R_{gain}=2R/(G-1)$, not $2R/G$.
- **Swapping the integrator and differentiator corner resistors.** Integrator uses $R_f$, differentiator uses $R_1$; mixing them moves the corner by two decades.
- **Mixing the two Schmitt formulas.** Inverting uses $R_1/(R_1+R_2)$; non-inverting uses $R_1/R_2$ and latches if $R_1>R_2$. Compute thresholds from $V_{sat}$, not $V_{CC}$.
- **Confusing average with rms in a rectifier.** A full-wave rectified sine has average $0.6366V_p$ and rms $0.7071V_p$; an average-responding meter multiplies by 1.11 and is right only for a sine.
- **Designing an equal-component Sallen-Key at unity gain and calling it Butterworth.** $Q=0.5$, so the 1.59 kHz filter cuts off at 1.02 kHz. $Q$ sensitivity is $\varepsilon QK$: 1% of gain costs 1.4% of $Q$ at $Q=5$.
- **Forgetting the bridge factor of 4.** A quarter bridge gives $V_{ex}GF\varepsilon/4$; 1000 µε on 10 V is 5 mV, which is why a gain of 1000 is normal.
- **Forgetting cold-junction compensation.** A type K at 200 $^\circ$C with a 25 $^\circ$C reference generates $41(175)=7.175$ mV and an uncompensated meter reads exactly 25 $^\circ$C low.
- **Using Celsius in the thermistor beta equation.** It needs kelvin; 50 °C is 323.15 K and the answer changes by orders of magnitude otherwise.
- **Dividing an ADC LSB by $2^n-1$.** The step is $FS/2^n$; there are $2^n$ steps and the top code is $2^n-1$.
- **Sizing a PWM-fed ADC or DAC filter for ripple alone.** Ripple falls as $1/RC$ but settling grows as $5RC$ — 135 ms for a 2.7 k$\Omega$/10 µF filter, i.e. about 7 updates per second.
- **Expecting a PLC to count a pulse shorter than its scan, or read a live input mid-scan.** Every rung sees the input image captured at the start; response is about two scans plus filter and output delays.

### Rapid-fire recall

- [ ] **Q1.** Non-inverting amp, $R_1=10$ k$\Omega$, $R_f=47$ k$\Omega$, $V_i=0.2$ V — find the gain, output and $\beta$.
- [ ] **Q2.** $GBW=1$ MHz, inverting $R_1=1$ k$\Omega$, $R_f=100$ k$\Omega$ — find $f_{-3\mathrm{dB}}$.
- [ ] **Q3.** Gain with $V_{OS}=2$ mV and noise gain 101?
- [ ] **Q4.** Difference amp with $R_1=R_3=10$ k$\Omega$, $R_2=100$ k$\Omega$ — what is the differential gain and what must $R_4$ be?
- [ ] **Q5.** In-amp: $R=25$ k$\Omega$, $R_{gain}=1$ k$\Omega$ — find $G$ and $V_o$ for 5 mV.
- [ ] **Q6.** Integrator $R=10$ k$\Omega$, $C=0.1$ µF — unity-gain frequency and the $R_f$ for 40 dB DC gain?
- [ ] **Q7.** Inverting Schmitt, $R_1=10$ k$\Omega$, $R_2=100$ k$\Omega$, $V_{sat}=\pm13$ V — thresholds?
- [ ] **Q8.** Pt100 at 150 $^\circ$C: $R_0(1+\alpha T)$?
- [ ] **Q9.** Type K ($41$ µV/$^\circ$C), $T_h=200\ ^\circ$C, $T_c=25\ ^\circ$C — output voltage and uncompensated reading?
- [ ] **Q10.** Wheatstone quarter bridge, $GF=2$, $V_{ex}=10$ V, 1000 µε — output?
- [ ] **Q11.** 12-bit, 10 V ADC — LSB, max error and ideal SNR?
- [ ] **Q12.** Sample an 8 kHz interferer at 10 kHz — where does it land?

> [!success]- Answers
> **Q1.** $A_v=1+47/10=5.7$, $V_o=1.14$ V, $\beta=10/57=0.1754$.
> **Q2.** $NG=101$, so $f_{-3\mathrm{dB}}=10^6/101=9.9$ kHz (gain at 20 kHz falls to 44.4).
> **Q3.** $2\ \mathrm{mV}\times101=202$ mV of output offset — larger than one LSB of a 12-bit, 10 V converter.
> **Q4.** $A_d=R_2/R_1=10$; matching needs $\dfrac{R_2}{R_4}=\dfrac{R_1}{R_3}=1$, so $R_4=100$ k$\Omega$ exactly. A 99 k$\Omega$ part drops a $0.5$ V pedestal into the output as a 3.8% error (about 61 dB CMRR).
> **Q5.** $G=1+2(25)/1=51$, so $V_o=51(5\ \mathrm{mV})=255$ mV.
> **Q6.** $RC=1$ ms, $f_b=1/(2\pi\times10^{-3})=159.2$ Hz; 40 dB is a ratio of 100, so $R_f=100(10\ \mathrm{k}\Omega)=1.0$ M$\Omega$, which moves the break to $1/(2\pi R_fC)=1.59$ Hz.
> **Q7.** $V_{UT}=13\times10/110=+1.18$ V, $V_{LT}=-1.18$ V, width 2.36 V — from $V_{sat}$, so a $\pm15$ V assumption is 15% high.
> **Q8.** $R=100(1+0.00385\times150)=157.75\ \Omega$; the Callendar-Van Dusen value is $157.325\ \Omega$, so the linear form is $1.1\ ^\circ\mathrm{C}$ high.
> **Q9.** $V=41(200-25)=7175$ µV $=7.175$ mV; an uncompensated meter assuming 0 $^\circ$C reads $7175/41=175\ ^\circ$C, exactly 25 $^\circ$C low.
> **Q10.** $V_o=\dfrac{10}{4}(2)(0.001)=5.00$ mV, and exactly $10(0.7)/(4\times350+2\times0.7)=4.995$ mV.
> **Q11.** $1\ \mathrm{LSB}=10/4096=2.44$ mV, max error $\pm1.22$ mV, $SNR=6.02(12)+1.76=74.0$ dB.
> **Q12.** $f_{alias}=10-8=2$ kHz, inside the baseband and indistinguishable from real signal — only an analog filter ahead of the converter can stop it.

### Drill — 4 minutes

**1.** An inverting amplifier has $R_1=1$ k$\Omega$, $R_f=100$ k$\Omega$ on an op-amp with $GBW=1$ MHz and $SR=0.5$ V/µs. Find the bandwidth, the largest undistorted 20 kHz output amplitude, and the offset error from $V_{OS}=2$ mV.
> [!success]- Solution
> Signal gain $-100$ but noise gain $NG=1+100/1=101$, so $f_{-3\mathrm{dB}}=10^6/101=9.9$ kHz. Slew limit: $V_p\le SR/(2\pi f)=5\times10^5/(2\pi\times2\times10^4)=3.98$ V peak — the stage cannot deliver 10 V at 20 kHz, it triangles. Offset: $2\ \mathrm{mV}\times101=202$ mV of output error. **Trap:** using $GBW/100=10$ kHz for the bandwidth and ignoring the slew limit entirely; the small-signal answer and the large-signal answer are different limits.

**2.** An equal-component Sallen-Key low-pass has $R_1=R_2=10$ k$\Omega$, $C_1=C_2=10$ nF and $K=1.586$ (Butterworth). Find $f_0$, $Q$, and the response at $f_0$; then state what happens if a drifted resistor raises $K$ to 3.1.
> [!success]- Solution
> $f_0=\dfrac{1}{2\pi RC}=\dfrac{1}{2\pi(10^4)(10^{-8})}=1591.5$ Hz. $Q=\dfrac{1}{3-K}=\dfrac{1}{1.414}=0.707$, so the magnitude at $f_0$ is exactly $QK=0.707\times1.586=1.121$ — the $-3$ dB point of Butterworth (relative to the 1.586 passband gain, $0.707\times1.586$). At $K=3.1$, $Q=1/(3-3.1)=-10$: net positive feedback, and the output latches to a rail. **Trap:** the tidy $R_1=R_2$, $C_1=C_2$, $K=1$ build is *not* Butterworth — it is $Q=0.5$, $-6$ dB at $f_0$, and its $-3$ dB point is $0.6436f_0=1024$ Hz.

**3.** A PLC has a 12 ms scan, a 10 ms input filter and a 10 ms relay output. A 15 kHz encoder pulse train is wired to a standard DC input. Find the worst-case response time, the fastest pulse the input can see, and the encoder's pulse period at 1800 rpm with 500 PPR.
> [!success]- Solution
> Response $=2T_{scan}+T_{filter}+T_{out}=24+10+10=44$ ms. The input image is refreshed once per scan, so $f_{sample}=1/0.012=83.3$ Hz and any pulse shorter than 12 ms can be missed. At 1800 rpm the shaft turns 30 rev/s, giving $30\times500=15$ kHz, a 66.7 µs period — some 180 times shorter than the scan, so ordinary ladder logic sees essentially nothing. A high-speed counter module is required, and with ×4 quadrature the edge rate becomes 60 kHz. **Trap:** quoting 12 ms as the response time, and assuming that wiring a fast sensor to a fast input is enough — the scan, not the sensor, sets the limit.

---

## Block 8 — Logic Circuits and Switching (5 min)

**Topics:** [[01_Number_Systems_and_Base_Conversion|Number Systems]] · [[02_Signed_Arithmetic_and_Two’s_Complement|Two's Complement]] · [[03_Codes_BCD,_Gray,_ASCII,_Parity|Codes: BCD/Gray/ASCII/Parity]] · [[04_Boolean_Algebra_and_De_Morgan|Boolean Algebra & De Morgan]] · [[05_SOP,_POS,_Minterms_and_Maxterms|SOP/POS & Minterms]] · [[06_Karnaugh_Maps|Karnaugh Maps]] · [[07_Adders_and_Subtractors|Adders & Subtractors]] · [[08_Encoders_and_Decoders|Encoders & Decoders]] · [[09_Multiplexers_and_Demultiplexers|Multiplexers & Demultiplexers]] · [[10_Latches_and_Flip-Flops|Latches & Flip-Flops]] · [[11_Flip-Flop_Timing,_Setup_and_Hold|Setup & Hold]] · [[12_Shift_Registers|Shift Registers]] · [[13_Asynchronous_and_Synchronous_Counters|Counters]] · [[14_Finite_State_Machines|Finite State Machines]] · [[15_ASM_Charts|ASM Charts]] · [[16_Logic_Families_TTL_vs_CMOS_and_Interfacing|TTL vs CMOS]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| Positional value | $N=\sum_{i=0}^{n-1} d_i b^i$ | Any base; $i=0$ at the LSB. Weight, not digit presence, sets value. |
| Binary/octal/hex shortcut | 1 oct digit $=3$ bits, 1 hex digit $=4$ bits | Group outward **from the radix point**, zero-pad the outside. Grouping from the left misaligns every weight. |
| Decimal fraction to base $b$ | $f_{k+1}=\mathrm{frac}(b f_k)$, digit $=\lfloor b f_k\rfloor$ | Digits come out **most significant first** — read top-down (integers read bottom-up). Reversing gives the wrong answer. |
| Codes and range | $2^n$ patterns, unsigned range $0$ to $2^n-1$ | $n$ address lines give $2^n$ locations; only $2^n-1$ is the max value. |
| Fractional resolution | $\Delta = 2^{-k}$ | $k$ fractional bits. $2^{-8}=0.00390625$, $2^{-10}=0.0009765625$. |
| Two's complement value | $-N \equiv 2^n-N$; decode as $-b_{n-1}2^{n-1}+\sum_{i=0}^{n-2} b_i 2^i$ | MSB carries negative weight — fastest hand decode, never fails at the extremes. |
| Signed range | $-(2^{n-1})$ to $+(2^{n-1}-1)$ | 8-bit $-128$ to $+127$; 12-bit $-2048$ to $+2047$. Asymmetric because zero takes one code. |
| Negation | $-N=\overline{N}+1$ | Invert **then** add 1. Stopping after invert gives 1's complement, off by one ($-46$ for $-45$). |
| Overflow | $OV=C_{n-1}\oplus C_n$ | Carry **into** the MSB XOR carry **out**. Carry-out alone is unsigned overflow only. |
| Subtraction with an adder | $A-B=A+\overline{B}+1$ | Inject 1 at the LSB carry-in. Without it you get 1's complement subtraction. |
| Gray code | $g_i=b_i\oplus b_{i+1}$ (top bit copied) | Unweighted. Reverse: $b_i=b_{i+1}\oplus g_i$, computed MSB downward. |
| Even parity bit | $P=b_{n-1}\oplus\cdots\oplus b_0$ | Odd parity is $\overline{P}$. Detects any **odd** error count, corrects none ($d_{min}=2$). |
| Distance capability | detect $d_{min}-1$, correct $\lfloor (d_{min}-1)/2\rfloor$ | $d_{min}=3$ corrects 1, detects 2. Single parity corrects 0. |
| De Morgan | $\overline{A+B}=\bar A\bar B$, $\overline{AB}=\bar A+\bar B$ | Break the bar **and** flip the operator. Writing $\overline{A+B}=\bar A+\bar B$ is the classic wrong answer. |
| Duality vs complement | dual: swap AND/OR and 0/1, variables uncomplemented | Dual is not De Morgan. Complementing variables in a dual is a wrong answer. |
| Full adder | $S=A\oplus B\oplus C_{in}$, $C_{out}=AB+C_{in}(A\oplus B)$ | $G_i=A_iB_i$, $P_i=A_i\oplus B_i$; $C_{i+1}=G_i+P_iC_i$. $P_i$ is XOR, never OR. |
| Ripple carry delay | $t_{carry}\approx n\,t_{carry,FA}$ | 4 stages × 12 ns = 48 ns. Add one XOR delay for the final sum bit. |
| Mux as logic | $Y=\sum_i m_i D_i$; a $2^{n-1}$:1 mux does any $n$-variable function | Data pins may be $0$, $1$, $C$ or $\bar C$ — not always constants. 4:1 mux covers 3 variables. |
| Decoder | $Y_i=E\cdot m_i$ | OR the minterm outputs for SOP. With active-low outputs (74LS138) use a **NAND**. |
| K-map group | $2^k$ cells cancel $k$ variables, leaving $n-k$ literals | Groups wrap at all four edges; the four corners of a 4-var map are one legal group of 4. |
| Setup / max frequency | $T_{clk}\ge t_{pd,FF}+t_{pd,comb,max}+t_{su}$ | Add skew for a late capture clock. $8+12+4=24$ ns → 41.67 MHz. |
| Hold | $t_{cd,FF}+t_{cd,comb,min}\ge t_h$ | Uses **contamination** (minimum) delays. Frequency cannot fix a hold violation. |
| Flip-flop next state | D: $Q^+=D$; JK: $Q^+=J\bar Q+\bar KQ$; T: $Q^+=T\oplus Q$ | JK $J=K=1$ **toggles** — it is not the forbidden state (that is SR only). |
| JK excitation | $0\to0:J=0,K=X$; $0\to1:J=1,K=X$; $1\to0:J=X,K=1$; $1\to1:J=X,K=0$ | The $X$ entries are the don't-cares that make JK cheaper than D. |
| Counter modulus | ripple $2^n$; ring $N$; Johnson $2N$; truncated $N$ | Mod-10 from 4 FFs: $2^4-10=6$ unused codes. Cascaded moduli **multiply**. |
| FF count for a modulus | $n=\lceil \log_2 M\rceil$ | Mod-10 needs 4 FFs; mod-100 needs 7 in binary but 8 in BCD (4 per decade). |
| Noise margins | $NM_H=V_{OH}-V_{IH}$, $NM_L=V_{IL}-V_{OL}$ | 5 V TTL: $2.4-2.0$ and $0.8-0.4$, both 0.4 V. Guaranteed limits, never typicals. |
| Fan-out | $\min(I_{OH}/I_{IH},\,I_{OL}/I_{IL})$ | Sourcing side usually binds: $\min(10,20)=10$. |
| CMOS dynamic power | $P=CV^2f$ | 50 pF, 5 V, 1 MHz → 1.25 mW. Speed-power product $t_{pd}P$ → 12.5 pJ. |
| Open-collector pull-up | $R_{min}=(V_{CC}-V_{OL})/I_{OL}$, $R_{max}=(V_{CC}-V_{IH})/(NI_{IH}+I_{leak})$ | 575 Ω to 37.5 kΩ in the standard example; 4.7 kΩ is safe. |

### Traps that cost marks

- **Remainders read top-down** turn $156_{10}=10011100_2$ into $10011001_2=153$. Fractions go the opposite way — read those top-down.
- **BCD codes each digit in its own nibble:** $74=0111\,0100_{BCD}$, never $1001010_2$. Nibbles never carry into each other; a nibble sum above 9 is invalid BCD and needs a $+6$ correction.
- **Gray is unweighted** — you cannot assign place values. $101101_2\to111011_{Gray}$, and only the cumulative XOR reverses it.
- **Carry-out is not overflow.** $7+7$ in 4 bits gives $S=1110$ with $C_4=0$ and $C_3=1$, so $OV=1$: $+14$ does not fit in $\pm7$.
- **$-2^{n-1}$ is its own negation.** Invert-and-add-1 on $10000000$ returns $10000000$; $+128$ needs 9 bits.
- **A `1` inside the K-map's wrap-around:** $\sum m(0,2,8,10)=\bar B\bar D$ — the four corners are one group of 4, not four isolated cells.
- **Don't-cares are optional members.** They may enlarge a group but never have to be covered; covering every $X$ adds a pointless term.
- **Grouping zeros gives $\bar F$, not $F$.** Group 1s for SOP, 0s for POS, then complement by De Morgan. $\sum m(0..11)$ over 4 vars has zeros only at $3,7,11,15$, so $\bar F=CD$ and $F=\bar C+\bar D$.
- **Minterm and maxterm rules are inverted.** Row 2 ($010$) is $m_2=\bar AB\bar C$ but $M_2=A+\bar B+C$.
- **Groups of 3, 6 or 12 cells are illegal** even when they look rectangular; only $1,2,4,8,16$.
- **A latch is level-sensitive, a flip-flop is edge-triggered.** While $EN=1$ a gated D latch follows every $D$ glitch; the *last* value before $EN$ falls is what is stored.
- **Hold is checked with minimum delays; setup with maximum delays.** Swapping them is wrong in the optimistic direction.
- **A re-triggered mod-$N$ ripple counter really reaches the terminal code.** Decode $1010$ for mod 10 (clearing on $1001$ gives mod 9), and expect a brief $1010$ on the outputs.
- **Johnson modulus is $2N$, not $N$.** 4 flip-flops give 8 states; the ring gives 4 and must be initialised (all-zero is a lock-up).
- **5 V TTL into 3.3 V CMOS leaves 0.09 V of margin** ($2.4$ vs $0.7\times3.3=2.31$ V) — use an HCT input or a level shifter, and check 5 V tolerance separately from logic levels.

### Calculator shortcuts (verified keys only)

- Base conversion: `MODE` `4`, then the `DEC` / `HEX` / `BIN` / `OCT` keys to read the same value in every base at once — use it when a question asks for two or three representations at once.
- Masks, two's complement and CRC long division all live in the base-n bitwise menu: `Apps` `1` and, `2` or, `3` xor, `4` xnor, `5` Not, `6` Neg. `Not` gives 1's complement in the current word length; add 1 by hand for 2's complement.
- Parity and Gray code are single XOR chains: in `MODE` `4`, chain the bits with `Apps` `3` xor for the even-parity bit; for Gray, XOR each bit with its neighbour.
- Counting address ranges and state counts: `nCr` / `nPr` / `x!` in `MODE` `1`, and powers of two via `2` `^` `n` with `SHIFT` `STO` to keep the exponent handy for the next part of the question.
- Memory and frequency arithmetic on one line with `ALPHA` `:` — e.g. capacity, then $2^n$, then the address count, each `=` evaluating the next. `log` for $\lceil\log_2 N\rceil$ and `x!` for group/path counts.

### Rapid-fire recall

- [ ] **Q1.** Convert $1101_2$ to decimal, and $0.6875_{10}$ to binary.
- [ ] **Q2.** Give $-45$ as an 8-bit 2's complement word in binary and hex.
- [ ] **Q3.** An 8-bit signed adder computes $100+50$. What is the bit pattern, and is overflow flagged?
- [ ] **Q4.** Convert $101101_2$ to Gray code. Is Gray a weighted code?
- [ ] **Q5.** Encode 74 in BCD 8421 and in excess-3. How many 4-bit BCD patterns are invalid?
- [ ] **Q6.** Simplify $A+\bar AB$ and $(A+B)(A+\bar B)$.
- [ ] **Q7.** Minimise $F(A,B,C)=\sum m(0,1,4,5)$. What group size did you use?
- [ ] **Q8.** A full adder gets $A=B=C_{in}=1$. Give $S$ and $C_{out}$, and give $G_i$ and $P_i$ when $A_i=B_i=1$.
- [ ] **Q9.** How many 2-to-4 decoders with enables build a 4-to-16 decoder, and how many variables can a 4:1 multiplexer implement?
- [ ] **Q10.** What does a JK flip-flop do with $J=K=1$? What does a T flip-flop in state $Q=1$ do with $T=0$?
- [ ] **Q11.** Give the modulus of a 4-flip-flop Johnson counter and of a 4-flip-flop ring counter.
- [ ] **Q12.** Find $f_{max}$ for $t_{pd,FF}=8$ ns, $t_{pd,comb}=12$ ns, $t_{su}=4$ ns; and $NM_H$, $NM_L$ for standard TTL.

> [!success]- Answers
> **Q1.** $1101_2=13_{10}$. $0.6875\times2\to1$, $\times2\to0$, $\times2\to1$, $\times2\to1$, read top-down: $0.1011_2$ (check $0.5+0.125+0.0625$).
> **Q2.** $45=00101101$, invert to $11010010$, add 1 → $11010011=\mathrm{D3}_{16}$. Check $-128+64+16+2+1=-45$.
> **Q3.** $01100100+00110010=10010110$, which decodes as $-106$. $C_{in}=1$, $C_{out}=0$, so $OV=C_{in}\oplus C_{out}=1$; $+150$ exceeds $+127$.
> **Q4.** $101101\to111011$ (top bit copied, then XOR neighbours). Gray is **unweighted** — its bits have no place values.
> **Q5.** $74=0111\,0100_{\mathrm{BCD}}=1010\,0111_{\mathrm{excess-3}}$ — add $0011$ per digit. Invalid BCD codes: $2^4-10=6$ ($1010$–$1111$).
> **Q6.** $A+\bar AB=(A+\bar A)(A+B)=A+B$. $(A+B)(A+\bar B)=A+A\bar B+AB=A(1+\bar B+B)=A$.
> **Q7.** $F=\bar B$: one 4-cell group spanning both $A$ values with $B=0$, so $k=2$ variables cancel and $3-2=1$ literal survives.
> **Q8.** $S=A\oplus B\oplus C_{in}=1$, $C_{out}=AB+C_{in}(A\oplus B)=1$ (arithmetic $1+1+1=3=11_2$). For $A_i=B_i=1$: $G_i=1$ and $P_i=0$ — XOR, not OR.
> **Q9.** $1+4=5$ decoders (one decodes the high bits into enables, four decode the low bits). A 4:1 mux implements any **3**-variable function: 2 selects plus one data variable that may be $0$, $1$, $C$ or $\bar C$.
> **Q10.** $J=K=1$ **toggles** ($Q^+=J\bar Q+\bar KQ$); it is not the forbidden state. A T flip-flop with $T=0$ **holds** $Q=1$ — it only divides by two when $T$ is tied high.
> **Q11.** Johnson (twisted-ring) $=2N=8$ states; ring counter $=N=4$ states and must be preset, since all-zero recirculates forever.
> **Q12.** $T=8+12+4=24$ ns → $f_{max}=41.67$ MHz. Standard TTL: $NM_H=2.4-2.0=0.4$ V, $NM_L=0.8-0.4=0.4$ V.

### Drill — 4 minutes

**1.** Convert $1101.1011_2$ to decimal, to hexadecimal and to octal.
> [!success]- Solution
> Integer part: $1101_2=13$. Fraction: $1011_2=\tfrac12+\tfrac18+\tfrac1{16}=0.6875$. Value $=13.6875$.
> Hex: group from the radix point — $1101\,.\,1011=\mathrm{D\,.\,B}$; $11/16=0.6875$, so $\mathrm{D.B}_{16}=13.6875$.
> Octal: pad to threes — $001\,101\,.\,101\,100=15.54_8$; check $8+5+\tfrac58+\tfrac4{64}=13.6875$.
> Trap: grouping from the left without padding, which shifts every weight by one bit.

**2.** A 4-bit adder computes $-100$ plus $-50$ in 2's complement. Give the 4-bit sum pattern, $C_{in}$ and $C_{out}$ at the MSB, and the overflow flag. (Use the low 8 bits.)
> [!success]- Solution
> $-100\to10011100$, $-50\to11001110$ (both $=256-N$).
> Ripple: bits 0–6 produce $0110101$ with carry $1$ into bit 7; bit 7 adds $1+1+1=1$ and sends $C_{out}=1$.
> Sum pattern $=01101010_2=+106$, which is wrong. $C_{in}=0$, $C_{out}=1$, so $OV=0\oplus1=1$.
> Sanity check: $-150$ lies outside $-128\ldots+127$, so overflow is mandatory; carry-out alone would have misled you (it is 1 here, but so is the carry-in on a legal case like $-37+-52$).

**3.** Minimise $F(A,B,C,D)=\sum m(1,3,7,11,15)$ with don't-cares $d(0,2,5)$.
> [!success]- Solution
> Ones: $0001,0011,0111,1011,1111$; don't-cares: $0000,0010,0101$.
> $X$ at 0 and 2 completes the block $A=0,B=0$ (cells $0,1,2,3$), which reads $\bar A\bar B$.
> $d$ at 5 is **not needed**: cells $3,7,11,15$ all have $C=D=1$, giving $CD$.
> Cover: $1,3$ from $\bar A\bar B$; $3,7,11,15$ from $CD$; every 1 is covered and $X$ at 5 is ignored.
> $F=\bar A\bar B+CD$ — 4 literals. Trap: forcing all don't-cares into groups gives $D(\bar A+C)$ (5 literals) or $\bar AD+CD$, both non-minimal.

---

## Block 9 — Microprocessors and Embedded (4 min)

**Topics:** [[01_CPU_Architecture_CISC_and_RISC|CISC vs RISC]] · [[02_Registers,_Buses_and_Memory_Organization|Registers, Buses, Memory]] · [[03_Memory_Technologies_and_Address_Decoding|Memory Technologies & Address Decoding]] · [[04_Instruction_and_Machine_Cycles|Instruction & Machine Cycles]] · [[05_Addressing_Modes_and_Instruction_Sets|Addressing Modes]] · [[06_Interrupts_and_ISRs|Interrupts & ISRs]] · [[07_DMA_and_Bus_Arbitration|DMA & Bus Arbitration]] · [[08_GPIO_and_Timer_Peripherals|GPIO & Timers]] · [[09_PWM_and_ADC_-_DAC_Modules|PWM, ADC & DAC]] · [[10_Serial_Interfaces_UART,_SPI,_I2C|UART, SPI, I2C]]

### Must-know formulas

| Quantity | Formula | When it applies / trap |
| --- | --- | --- |
| CPU execution time | $T_{CPU}=IC\times CPI\times T_{clk}=\dfrac{IC\times CPI}{f_{clk}}$ | Three factors multiply. CISC attacks $IC$; RISC attacks $CPI$ and $f$. |
| Average CPI | $CPI_{avg}=\sum_i f_i\,CPI_i$ | Weighted by **executed** frequency, never an arithmetic mean of the classes. |
| MIPS | $\mathrm{MIPS}=\dfrac{f_{clk}}{CPI\times 10^{6}}$ | Throughput, not work. Only comparable on the same ISA and instruction mix. |
| Speedup with a CPI penalty | $S=\dfrac{CPI_{old}}{CPI_{new}}\times\dfrac{f_{new}}{f_{old}}$ | $1.4\times$ clock with CPI $1.1\to1.3$ yields only $1.18\times$. |
| Addressable locations | $N=2^{n}$ | $n$ address lines. On a byte-addressable machine this is **bytes**, regardless of data-bus width. |
| Device address range | $[\,B,\ B+2^{n}-1\,]$ | 4 KiB at 0x8000 ends at 0x8FFF, never 0x9000. 8 KiB = 0x2000 addresses, 16 KiB = 0x4000, 64 KiB = 0x10000. |
| Bus bandwidth | $BW=w\times f_{bus}$ | 16-bit at 8 MHz $=128$ Mbit/s $=16$ MB/s. Divide by the lost mark: bit vs byte. |
| Wait states | $t_{cyc}=(T_{base}+WS)\,T_{clk}$, $WS=\lceil (t_{access}-T_{base}T_{clk})/T_{clk}\rceil$ | 150 ns access, 50 ns clock, 2-clock base → 1 extra clock, cycle $=150$ ns. Whole clocks only. |
| Partial-decoding aliases | images $=2^{k}$ | $k$ ignored high-order lines. A 16 KiB chip selected by $\overline{A_{15}}$ alone with $A_{14}$ ignored answers twice: 0x0000–0x3FFF and 0x4000–0x7FFF. |
| DRAM refresh | $t_{ref}=t_{period}/\mathrm{rows}$ | 8192 rows in 64 ms → 7.81 µs per row; refresh steals bus cycles. |
| Instruction time | $T_{inst}=N_T\,T_{clk}$ | $N_T$ = total **T-states**, not machine cycles. 8085 opcode fetch is 4 T-states, memory read/write 3. |
| CPI with branch penalty | $CPI=1+f_{branch}\times \mathrm{penalty}$ | 20 % taken branches at 3 clocks → $CPI=1.6$. |
| Pipeline completion | $T=(k+N-1)T_{clk}$; $S=\dfrac{Nk}{k+N-1}$ | Fill and drain cost $k-1$ clocks: 1000 instructions in 5 stages = 1004 clocks, $S=4.98$. |
| Effective address | indexed: $\mathrm{base}+\mathrm{index}+\mathrm{disp}$; relative: $PC_{next}+\mathrm{offset}$ | $PC_{next}$ is the **following** instruction (0x2050 + 3 = 0x2053). Signed $n$-bit disp: $-2^{n-1}$ to $2^{n-1}-1$. |
| Interrupt latency / overhead | $t_{lat}=t_{finish}+t_{save}+t_{vector}+t_{entry}$; overhead $=t_{ISR}/T_{event}$ | Latency ends at the **first ISR instruction**; it is not the service time. |
| DMA transfer | bytes $=\mathrm{count}\times w/8$; $T_{new}=\dfrac{T_{old}}{1-\mathrm{fraction\ stolen}}$ | Count is in transfers. 25 % of cycles stolen stretches 100 ms to 133.3 ms, not 125 ms. |
| DMA break-even | $N_{min}=\dfrac{t_{setup}}{t_{PIO}-t_{DMA}}$ | $50/(1.0-0.05)=52.6$, so blocks of 53 bytes or more favour DMA. |
| Timer tick and delay | $T_{tick}=\dfrac{PSC+1}{f_{clk}}$, $T_{delay}=\dfrac{(ARR+1)(PSC+1)}{f_{clk}}$ | Both registers hold divisor **minus one**. Tick $=1$ µs at 72 MHz with $PSC=71$. |
| Timer range | $T_{max}=\dfrac{2^{n}(PSC+1)}{f_{clk}}$ | 16-bit at 72 MHz, $PSC=0$: 910 µs; $PSC=1023$: 0.932 s — a 1 s delay needs a post-scaler. |
| PWM | $f_{PWM}=\dfrac{f_{clk}}{(PSC+1)(ARR+1)}$, $D=\dfrac{CCR}{ARR+1}$, bits $=\log_2(ARR+1)$ | 72 MHz, $PSC=71$, $ARR=999$ → 1 kHz, $CCR=250$ → 25 %, $\log_2 1000=9.97$ bits. |
| ADC/DAC step | $LSB=\dfrac{V_{ref}}{2^{n}}$, $\mathrm{SNR}=6.02n+1.76$ dB | 12-bit on 3.3 V → 805.7 µV; 1.000 V → code 1241. Divide by $2^n$, never $2^n-1$. |
| SAR sample rate | $f_{s,max}=\dfrac{1}{t_{acq}+t_{conv}}$ | 14 clocks at 12 MHz (1.167 µs) + 1 µs acquisition → 461 kS/s, not 857 kS/s. |
| Oversampling gain | $\Delta\mathrm{ENOB}=\tfrac12\log_2(OSR)$ | $OSR=16$ → $+2$ bits, only with white dithering noise. |
| PWM filter ripple | $V_{ripple}=\dfrac{V_{ref}D(1-D)}{f_{PWM}RC}$ | 5 V, $D=0.5$, 20 kHz, 10 kΩ, 1 µF → 6.25 mV p-p. |
| UART frame and divisor | $n_{bits}=1+n_{data}+n_{par}+n_{stop}$, $\mathrm{DIV}=\dfrac{f_{clk}}{16\,f_{baud}}$ | 8N1 = 10 bit-times so 9600 baud carries 960 char/s. 7.3728 MHz → divisor 48 exactly. |
| SPI / I2C timing | $\mathrm{bytes/s}=\dfrac{f_{SCK}}{8}$; $T_{byte}=\dfrac{9}{f_{SCL}}$; $t_r=0.8473R_pC_b$ | 10 MHz SCK → 1.25 MB/s. 200 pF with 4.7 kΩ → 796 ns: passes 100 kHz, fails 400 kHz (needs ≤1.77 kΩ). |

### Traps that cost marks

- **Baud is not byte rate.** 8N1 costs 10 bit-times per byte: 9600 baud gives 960 char/s, and 115200 baud needs 86.8 ms for 1000 bytes, not 69.4 ms.
- **Dropping the 16 in the UART divisor.** $f_{clk}/(16f_{baud})$; 7.3728 MHz ÷ 9600 = 768 is wrong and produces 600 baud.
- **Ignoring acquisition time** inflates the ADC sample rate; **ignoring the PWM period vs $RC$** hides ripple that swamps a 1.22 mV LSB.
- **$ARR$ and $PSC$ hold divisor minus one.** Dropping either $+1$ is a whole-count error in each divisor.
- **PWM frequency and duty resolution trade off** at a fixed timer clock — a 16-bit timer cannot give 1 Hz with 16-bit duty.
- **Reading the DMA count as bytes.** Count × $w/8$: 512 on a 32-bit bus is 2 KiB. DMA is not free — cycle stealing costs exactly the bus bandwidth it gains.
- **SRAM vs DRAM:** DRAM is 1T1C, needs refresh and has destructive reads; SRAM is a 6T latch, no refresh, used as cache.
- **Partial decoding aliases.** A write to an alias window silently overwrites the real data — the classic "random corruption" bug.
- **Reading a GPIO port returns the pin, not the latch.** `PORT |= BIT` with an externally dragged pin corrupts the whole byte; use the set/reset register.
- **DMA counts addresses in words but CISC instructions vary in length** — and a relative branch is measured from the *next* instruction, so using the branch's own address misses by the instruction length.
- **CPU time has three factors.** RISC executes more instructions and still wins; CPI is a weighted mean, and $CPI<1$ is normal for superscalar.
- **Not clearing the peripheral interrupt flag** re-enters the ISR forever on a level-triggered source; nested ISRs serialise on one core, so their times add.

### Calculator shortcuts (verified keys only)

- $2^n$, address counts and capacity arithmetic: `MODE` `1` with `log` for $\lceil\log_2 N\rceil$ — log(524288)/log(2) = 19.
- Chain a whole timing question on one line with `ALPHA` `:` — e.g. $IC\times CPI\div f$, then the MIPS figure, each `=` evaluating the next.
- Baud and timer divisors: compute $f_{clk}/(16f_{baud})$ or $(PSC+1)(ARR+1)$ directly, then check the rounded integer by re-multiplying; `SHIFT` `STO` the divisor and `RCL` it for the "actual baud" part.
- Decimal/hex addresses without hand conversion: `MODE` `4`, then the `DEC` / `HEX` keys; the bitwise `Apps` menu (`1` and, `2` or, `3` xor, `4` xnor, `5` Not, `6` Neg) handles address masks and decoding bit patterns.
- Powers of two for memory maps: `2` `^` `n`, with `Ans` reused for the next part; `x!` if a question counts state or path combinations.

### Rapid-fire recall

- [ ] **Q1.** $IC=5\times10^{9}$, $CPI=1.5$, 2 GHz — find $T_{CPU}$ and the MIPS rating.
- [ ] **Q2.** Instruction mix 30 % load/store at $CPI=2$, 50 % ALU at 1, 20 % branch at 3 — find $CPI_{avg}$.
- [ ] **Q3.** How many locations does a 20-bit address bus give, and how many bytes on a byte-addressable machine?
- [ ] **Q4.** A 4 KiB RAM sits at base 0x8000. Give its range and the lines the chip decodes.
- [ ] **Q5.** A 16 KiB chip uses $A_0$–$A_{13}$ but its select ignores $A_{14}$. How many images, and where?
- [ ] **Q6.** How many T-states is an 8085 opcode fetch, and how long is a 10 T-state instruction at 3 MHz?
- [ ] **Q7.** $N$ instructions in a $k$-stage pipeline with no stalls — how many clocks, and what is the ideal speedup?
- [ ] **Q8.** A 3-byte instruction starts at 0x2050; where does the PC point, and where does an offset of 0xEC branch?
- [ ] **Q9.** Frame bits and character rate for 9600 baud 8N1; the baud divisor from 7.3728 MHz.
- [ ] **Q10.** I2C byte time at 100 kHz including ACK; SPI byte throughput at $f_{SCK}=10$ MHz.

> [!success]- Answers
> **Q1.** $T=5\times10^{9}\times1.5/(2\times10^{9})=3.75$ s; MIPS $=2\times10^{9}/(1.5\times10^{6})=1333$.
> **Q2.** $CPI_{avg}=0.30(2)+0.50(1)+0.20(3)=1.7$ — a weighted mean, not $(2+1+3)/3$.
> **Q3.** $2^{20}=1{,}048{,}576$ locations $=1$ MiB; the data-bus width does not change the count.
> **Q4.** $4\ \mathrm{KiB}=2^{12}$, so $A_0$–$A_{11}$; range 0x8000–0x8FFF (base + 0x0FFF).
> **Q5.** $k=1$ ignored line → $2^{1}=2$ images: 0x0000–0x3FFF and 0x4000–0x7FFF (the select forces $A_{15}=0$).
> **Q6.** Opcode fetch is 4 T-states; 10 T at 3 MHz $=10\times333.3\ \mathrm{ns}=3.33\ \mu\mathrm{s}$. Machine cycles ≠ clock cycles.
> **Q7.** $k+N-1$ clocks; ideal speedup $Nk/(k+N-1)$, approaching $k$ as $N$ grows and collapsing to 1 at $N=1$.
> **Q8.** $PC=0x2053$; $0xEC=-20$, so the target is $0x2053-20=0x203\mathrm{F}$.
> **Q9.** $1+8+0+1=10$ bit-times → 960 char/s; $\mathrm{DIV}=7.3728\times10^{6}/(16\times9600)=48$ exactly.
> **Q10.** I2C: 9 bits per byte ÷ 100 kHz $=90\ \mu\mathrm{s}$ (8 data + ACK). SPI: $10\ \mathrm{MHz}/8=1.25$ MB/s.

### Drill — 4 minutes

**1.** A 2 GHz processor executes $12\times10^{6}$ instructions with the mix 30 % load/store at $CPI=3$, 50 % ALU at $CPI=1$ and 20 % branch at $CPI=4$. Find $CPI_{avg}$ and $T_{CPU}$, and state the speedup if the clock alone were raised to 2.5 GHz with $CPI$ unchanged.
> [!success]- Solution
> $CPI_{avg}=0.30(3)+0.50(1)+0.20(4)=0.9+0.5+0.8=2.2$.
> $T_{CPU}=IC\times CPI/f=12\times10^{6}\times2.2/(2\times10^{9})=26.4\times10^{6}/2\times10^{9}=0.0132$ s $=13.2$ ms.
> Pure clock scaling: $S=f_{new}/f_{old}=2.5/2.0=1.25\times$, giving 10.56 ms.
> Trap: averaging the CPIs to $(3+1+4)/3=2.67$ and reporting 16.0 ms instead of 13.2 ms.

**2.** A byte-addressable system has a 16-bit-wide bus clocked at 8 MHz. A 32 KiB SRAM is mapped at base 0x4000. Give the address lines it decodes, its full range, the peak bandwidth, and the real bandwidth if every transfer costs one wait state.
> [!success]- Solution
> $32\ \mathrm{KiB}=32768=2^{15}$, so the chip decodes $A_0$–$A_{14}$ (15 lines); the top line $A_{15}$ goes to the chip-select decoder.
> Range $=[\,0\mathrm{x}4000,\ 0\mathrm{x}4000+0\mathrm{x}7\mathrm{FFF}\,]=$ 0x4000 to 0xBFFF (0x8000 addresses = 32 KiB).
> Peak $BW=16\times8\times10^{6}=128$ Mbit/s $=16$ MB/s.
> With 1 wait state each transfer takes $1+1=2$ clocks: $8\times10^{6}/2=4\times10^{6}$ transfers/s $\times2$ B $=8$ MB/s — exactly half the peak.
> Trap: writing the end address as 0xC000 (that is base + size), and quoting 128 MB/s by dropping the factor of 8.

**3.** A UART is set to 8E1 at 19200 baud and is clocked at 14.7456 MHz with 16× oversampling. Give the frame length, the frame time, the character rate, the divisor, the actual baud rate, and the time to send 1000 characters.
> [!success]- Solution
> Frame $=1$ start $+8$ data $+1$ parity $+1$ stop $=11$ bit-times.
> $T_{frame}=11/19200=572.9\ \mu\mathrm{s}$; character rate $=19200/11=1745.45$ char/s (not 2400).
> $\mathrm{DIV}=14.7456\times10^{6}/(16\times19200)=14{,}745{,}600/307{,}200=48$, an exact integer.
> Actual baud $=14.7456\times10^{6}/(16\times48)=19200$ exactly — zero error.
> $1000$ characters: $1000\times11/19200=0.5729$ s $\approx573$ ms.
> Trap: computing $19200/8=2400$ char/s by ignoring parity and framing, and forgetting the 16× oversampling in the divisor.
