---
id: ECE-01-10
title: "Inductors, Capacitors and Energy"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[01_Circuit_Variables,_Ohm’s_Law_and_Signs]]", "[[02_KCL,_KVL,_Series_and_Parallel_Reduction]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Inductors, Capacitors and Energy

> [!abstract] Scope
> Apply and invert the voltage-current laws of capacitors and inductors, combine them in series and parallel, and account for the energy they store, hold and return.

## Core Concept

> [!tip] Intuition
> A capacitor is a spring for charge: it stores energy in an electric field and resists any sudden change in voltage, so its voltage must be continuous. An inductor is a flywheel for current: it stores energy in a magnetic field and resists any sudden change in current, so its current must be continuous.

**The v-i laws and the continuity rules that follow from them.** For a capacitor $i = C\,dv/dt$; for an inductor $v = L\,di/dt$. Both are derivatives, so the element being differentiated is the one that cannot jump: a capacitor's voltage is continuous, $v_C(0^+) = v_C(0^-)$, and an inductor's current is continuous, $i_L(0^+) = i_L(0^-)$. The quantities on the left of the derivative *can* jump — $i_C$ can step instantly when $dv/dt$ steps, and $v_L$ can step instantly when $di/dt$ steps — which is exactly why a switched circuit is analysed at $t = 0^+$ by freezing $v_C$ and $i_L$ at their pre-switch values and solving the resulting resistive network. In DC steady state the derivatives vanish: $i_C = 0$, so a capacitor is an open circuit, and $v_L = 0$, so an inductor is a short circuit. Note how easily that pair is remembered backwards after seeing the $t = 0^+$ limits, where an uncharged capacitor behaves like a short and an unmagnetised inductor like an open.

**Energy is stored, never dissipated.** Power is $p = vi = dw/dt$ for both elements, and integrating with the v-i laws gives $w_C = \tfrac{1}{2}Cv^2$ and $w_L = \tfrac{1}{2}Li^2$. Two consequences matter in an exam. First, the stored energy depends only on the present state, $v$ or $i$, and not on how the element got there: $v$ and $i$ are the natural state variables of a dynamic circuit, which is why every transient solution is specified by $v_C(0)$ and $i_L(0)$. Second, $p$ may be negative, meaning the element is returning energy to the rest of the circuit; an ideal capacitor or inductor has no mechanism for dissipation, so all the stored energy is recoverable. Only a real device's equivalent series resistance turns any of it into heat. A useful sanity check follows: the energy in a capacitor quadruples when its voltage doubles, so the cost of going from $50\ \mathrm{V}$ to $100\ \mathrm{V}$ is three times what is already stored, not one times.

**Series and parallel rules are the mirror image of the resistor rules.** Capacitors in parallel add, $C_{eq} = \sum C_k$, and capacitors in series reciprocate; inductors in series add and inductors in parallel reciprocate, exactly like resistors. The reason is that the combination rule tracks the quantity that is *shared*. Parallel elements share the same voltage, so for capacitors the charges add at fixed $v$ and the capacitances add; series elements share the same current, so for inductors the voltages add at fixed $di/dt$ and the inductances add. Resistors are the odd ones out because their defining relation $v = iR$ is algebraic rather than a derivative. Two caveats: the inductor rules assume no magnetic coupling between the coils (mutual inductance changes the answer completely), and both sets of rules describe the equivalent element only when the initial states are consistent — series capacitors all carry the same charge and parallel inductors all have the same flux linkage, so a formula applied to elements with unrelated initial conditions gives the right equivalent but not the right initial condition.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Capacitor current | $i = C\frac{dv}{dt}$ | C in farads, i in amperes. The derivative means i may jump instantly even though v may not. |
| Capacitor voltage from current | $v(t) = \frac{1}{C}\int_{t_0}^{t} i(\tau)\,d\tau + v(t_0)$ | The initial voltage is part of the answer; dropping v(t0) silently assumes the capacitor started uncharged. |
| Capacitor energy | $w_C = \tfrac{1}{2} C v^{2}$ | C in farads and v in volts give joules. Energy depends on v only, not on dv/dt. |
| Inductor voltage | $v = L\frac{di}{dt}$ | L in henries. A zero current with a nonzero slope still produces a nonzero voltage. |
| Inductor current from voltage | $i(t) = \frac{1}{L}\int_{t_0}^{t} v(\tau)\,d\tau + i(t_0)$ | In DC steady state di/dt = 0 so v_L = 0 and the inductor is a short circuit. |
| Inductor energy | $w_L = \tfrac{1}{2} L i^{2}$ | Depends on i only; reversing the reference direction of i does not change the stored energy. |
| Capacitors in combination | $C_{eq} = \sum_k C_k \;\mathrm{(parallel)}, \qquad \frac{1}{C_{eq}} = \sum_k \frac{1}{C_k} \;\mathrm{(series)}$ | Opposite to resistors: parallel adds, series reciprocates. |
| Inductors in combination | $L_{eq} = \sum_k L_k \;\mathrm{(series)}, \qquad \frac{1}{L_{eq}} = \sum_k \frac{1}{L_k} \;\mathrm{(parallel)}$ | Same pattern as resistors. Assumes no mutual inductance between the coils. |
| Instantaneous power | $p = v i = \frac{dw}{dt}$ | p > 0 stores energy, p < 0 returns it. An ideal C or L never dissipates, so its power averages to zero over a full cycle. |

## Worked Problems

### P1. A $2\ \mu\mathrm{F}$ capacitor with $v(0) = 0$ carries a current $i(t) = 4\ \mathrm{mA}$ for $0 \le t \le 3\ \mathrm{ms}$, and $i(t) = 0$ after that. Find $v(t)$ on the interval $0 \le t \le 3\ \mathrm{ms}$, the voltage at $t = 3\ \mathrm{ms}$, and the energy stored at that instant.

**Given:** C = 2 μF; i = 4 mA for 0 ≤ t ≤ 3 ms, then zero; v(0) = 0

**Solution:**

1. Constant current into a capacitor gives a ramp: v(t) = (1/C)∫i dτ + v(0).
2. Compute the slope in base units: i/C = (4 x 10^-3)/(2 x 10^-6) = 2 x 10^3 V/s, so v(t) = 2000t V.
3. At t = 3 ms: v = 2000 x 3 x 10^-3 = 6 V.
4. For t > 3 ms the current is zero, so the voltage holds at 6 V; the charge has nowhere to go.
5. Energy: w = ½ C v^2 = 0.5 x 2 x 10^-6 x 36 = 36 x 10^-6 J.

> [!success]- Answer
> **$v(t) = 2000t\ \mathrm{V}$ for $0 \le t \le 3\ \mathrm{ms}$, $v(3\ \mathrm{ms}) = 6\ \mathrm{V}$, and $w = 36\ \mu\mathrm{J}$.**

> [!warning] Trap
> Dividing the prefixes instead of the base units: $4/2 = 2$ gives $v = 2t$ and a final answer of $6\ \mathrm{mV}$, three orders of magnitude out. The ratio $i/C$ must be evaluated as $4\times10^{-3}/2\times10^{-6} = 2000\ \mathrm{V/s}$; milli over micro always produces a factor of $10^3$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. The ramp slope is the current-to-capacitance ratio in one line: `4E-3÷2E-6` → **2000** V/s, so $v(t) = 2000t$ V.
> 2. Evaluate and store: `2000×3E-3` → $v(3\ \mathrm{ms})$ = **6** V, then `0.5×2E-6×Ans²` → $w$ = **36E-6** J.
> 3. The charge check uses the same number: `2E-6×Ans` = **12** µC = `4E-3×3E-3` = 12 µC, so the ramp and the energy agree.
>
> Enter base units (A, F, s) on the calculator. The mA/µF pair invites the 10^9 mistake that unit-shifting on paper hides.

### P2. A $50\ \mathrm{mH}$ inductor carries a current that rises linearly from $0$ to $2\ \mathrm{A}$ in $4\ \mathrm{ms}$, then falls linearly back to $0$ in $2\ \mathrm{ms}$. Find the inductor voltage during each interval and the peak energy stored.

**Given:** L = 50 mH; i rises 0 → 2 A in 4 ms; i falls 2 A → 0 in the next 2 ms

**Solution:**

1. Rising interval: di/dt = 2/(4 x 10^-3) = 500 A/s, so v = L di/dt = 0.05 x 500 = 25 V, in the same direction as the rising current.
2. Falling interval: di/dt = -2/(2 x 10^-3) = -1000 A/s, so v = 0.05 x (-1000) = -50 V.
3. The voltage reverses sign when the slope reverses even though the current is still positive, because v depends on di/dt and not on i.
4. Peak energy occurs at the peak current i = 2 A: w = ½ L i^2 = 0.5 x 0.05 x 4 = 0.1 J.
5. Check the return of energy on the falling half: p = vi = 2 x (-50) = -100 W at the start of the fall, so the inductor is delivering energy back to the circuit.

> [!success]- Answer
> **$v = +25\ \mathrm{V}$ while rising, $v = -50\ \mathrm{V}$ while falling, and $w_{peak} = 0.1\ \mathrm{J} = 100\ \mathrm{mJ}$.**

> [!warning] Trap
> Treating the inductor like a resistor and expecting $v$ to track $i$. During the falling half the current is still $+2\ \mathrm{A}$ but the voltage is $-50\ \mathrm{V}$; that negative $v$ with positive $i$ is precisely how the inductor returns its stored energy, and it is the sign most often dropped.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Both slopes in one chain with `ALPHA` `:` — `0.05×(2÷4E-3) : 0.05×(−2÷2E-3)`
> 2. $v$ = **+25** V while rising → **−50** V while falling; the sign tracks $di/dt$, not $i$.
> 3. Peak energy: `0.5×0.05×2²` → $w_{peak}$ = **0.1** J = **100** mJ at the 2 A peak.

### P3. Reduce two networks to a single equivalent element. (a) A $6\ \mu\mathrm{F}$ capacitor in parallel with a $3\ \mu\mathrm{F}$ capacitor, that pair then in series with $18\ \mu\mathrm{F}$. (b) A $12\ \mathrm{mH}$ inductor in parallel with $4\ \mathrm{mH}$, that pair then in series with $7\ \mathrm{mH}$.

**Given:** (a) 6 μF in parallel with 3 μF, then in series with 18 μF; (b) 12 mH in parallel with 4 mH, then in series with 7 mH

**Solution:**

1. (a) Parallel capacitors add: 6 + 3 = 9 μF.
2. (a) Series capacitors reciprocate: 1/C = 1/9 + 1/18 = 2/18 + 1/18 = 3/18 = 1/6, so C_eq = 6 μF.
3. (b) Parallel inductors reciprocate: 1/L = 1/12 + 1/4 = 1/12 + 3/12 = 4/12 = 1/3, so the pair is 3 mH.
4. (b) Series inductors add: 3 + 7 = 10 mH.
5. Sanity check on (a): capacitors in series give less than the smaller branch value, and 6 μF is indeed less than both the 9 μF pair and the 18 μF element; capacitors in parallel would have given 27 μF instead.

> [!success]- Answer
> **$C_{eq} = 6\ \mu\mathrm{F}$ for network (a) and $L_{eq} = 10\ \mathrm{mH}$ for network (b).**

> [!warning] Trap
> Applying the resistor rules by reflex to both elements. A $6\ \mu\mathrm{F}$ and a $3\ \mu\mathrm{F}$ capacitor in parallel give $9\ \mu\mathrm{F}$, not $2\ \mu\mathrm{F}$; capacitors are the mirror image of resistors, while inductors follow the resistor pattern. Stating the rule from memory as 'capacitors add in series' swaps the two networks and produces $2\ \mu\mathrm{F}$ and $3\ \mathrm{mH}$ together.

### P4. A $100\ \mu\mathrm{F}$ capacitor is charged to $50\ \mathrm{V}$. Find the stored charge and the stored energy. How much additional energy must be supplied to raise its voltage to $100\ \mathrm{V}$?

**Given:** C = 100 μF; v1 = 50 V, v2 = 100 V

**Solution:**

1. Charge at 50 V: Q = C v = 100 x 10^-6 x 50 = 5 x 10^-3 C.
2. Energy at 50 V: w1 = ½ C v1^2 = 0.5 x 100 x 10^-6 x 2500 = 0.125 J.
3. Energy at 100 V: w2 = ½ C v2^2 = 0.5 x 100 x 10^-6 x 10000 = 0.5 J.
4. Additional energy: Δw = w2 - w1 = 0.5 - 0.125 = 0.375 J.
5. Ratio check: doubling v multiplies the stored energy by four, so the extra energy is exactly 3 w1 = 3 x 0.125 = 0.375 J, as found.

> [!success]- Answer
> **$Q = 5\ \mathrm{mC}$, $w_1 = 125\ \mathrm{mJ}$, and the additional energy required to reach $100\ \mathrm{V}$ is $375\ \mathrm{mJ}$.**

> [!warning] Trap
> Scaling the energy linearly with voltage and answering $125\ \mathrm{mJ}$ again, or $250\ \mathrm{mJ}$ for the total. Energy goes as $v^2$, so the total at $100\ \mathrm{V}$ is four times the total at $50\ \mathrm{V}$ and the *increment* is three times the original.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. One line, statements separated by `ALPHA` `:` — `100E-6×50 : 0.5×100E-6×50² : 0.5×100E-6×100² : Ans−Ans`
> 2. $Q$ = **5E-3** C → $w_1$ = **0.125** J → $w_2$ = **0.5** J → $\Delta w$ = **0.375** J.
>
> Doubling the voltage quadruples the stored energy, so the added energy is exactly `3×0.125` = 0.375 J — a free check.

### P5. At $t = 0$ a switch closes and connects a $10\ \mathrm{V}$ source through a $5\ \mathrm{k}\Omega$ resistor to an initially uncharged $1\ \mu\mathrm{F}$ capacitor. Find $v_C(0^+)$, $i_C(0^+)$, the steady-state values and the final stored energy. Then give the steady-state current, voltage and stored energy if the capacitor is replaced by a $2\ \mathrm{H}$ inductor carrying no current before the switch closes.

**Given:** Vs = 10 V, R = 5 kΩ; C = 1 μF initially uncharged; Alternative branch: L = 2 H with iL(0) = 0; Switch closes at t = 0

**Solution:**

1. Capacitor voltage is continuous, so v_C(0+) = v_C(0-) = 0 V.
2. At t = 0+ the whole source voltage appears across R, so i_C(0+) = (10 - 0)/5000 = 2 mA. The capacitor current may jump; the voltage may not.
3. In DC steady state dv/dt = 0, hence i_C(∞) = 0: the capacitor is an open circuit and v_C(∞) = 10 V.
4. Final stored energy: w = ½ C v^2 = 0.5 x 1 x 10^-6 x 100 = 50 x 10^-6 J.
5. With the 2 H inductor: inductor current is continuous, so i_L(0+) = 0 and all 10 V appears across L at t = 0+.
6. In DC steady state di/dt = 0, hence v_L(∞) = 0: the inductor is a short circuit and i_L(∞) = 10/5000 = 2 mA.
7. Energy at steady state: w = ½ L i^2 = 0.5 x 2 x (2 x 10^-3)^2 = 0.5 x 2 x 4 x 10^-6 = 4 x 10^-6 J.

> [!success]- Answer
> **$v_C(0^+) = 0\ \mathrm{V}$, $i_C(0^+) = 2\ \mathrm{mA}$, $v_C(\infty) = 10\ \mathrm{V}$ with $w_C = 50\ \mu\mathrm{J}$; with the inductor, $i_L(\infty) = 2\ \mathrm{mA}$, $v_L(\infty) = 0$ and $w_L = 4\ \mu\mathrm{J}$.**

> [!warning] Trap
> Swapping the DC steady-state limits by thinking 'capacitor shorts, inductor opens'. At DC the capacitor current is zero and the inductor voltage is zero, so the capacitor is the open and the inductor is the short — the exact reverse of their $t = 0^+$ appearance for an uncharged capacitor and an unmagnetised inductor.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Switching limits in one line — `10÷5000 : 0.5×1E-6×10² : 0.5×2×(10÷5000)²`
> 2. $i_C(0^+)$ = $i_L(\infty)$ = **2E-3** A → $w_C$ = **50E-6** J → $w_L$ = **4E-6** J.
> 3. The engineering units confirm both: `10÷5` = **2** mA for kΩ and V, and the energy is `0.5×1×100` = **50** µJ for µF and V.
>
> At $t=0^+$ the capacitor is a short and the inductor an open; in DC steady state they swap roles. Chain $10\div5000$ first and the rest follows from $\mathrm{Ans}$.

## Traps & Exam Notes

- Combining capacitors with the resistor rules. Parallel capacitors add ($6\ \mu\mathrm{F}$ with $3\ \mu\mathrm{F}$ gives $9\ \mu\mathrm{F}$, not $2\ \mu\mathrm{F}$) and series capacitors reciprocate; inductors are the ones that match resistors. The rule follows the shared quantity: parallel elements share $v$, series elements share $i$.
- Letting $v_C$ or $i_L$ jump at a switching instant. A capacitor's voltage and an inductor's current are continuous for finite currents and voltages, so $v_C(0^+) = v_C(0^-)$ and $i_L(0^+) = i_L(0^-)$; the capacitor *current* and inductor *voltage* are the quantities free to step, and confusing the pairs gives a wrong $t = 0^+$ circuit.
- Getting the DC steady-state limits backwards. After a long time a capacitor draws no current (open circuit) and an inductor drops no voltage (short circuit). The reverse pairing is tempting precisely because at $t = 0^+$ an uncharged capacitor looks like a short and an unmagnetised inductor looks like an open.
- Mixing prefixes inside $\frac{1}{2}Cv^2$ or dropping the initial-condition term from the integral. $100\ \mu\mathrm{F}$ at $50\ \mathrm{V}$ stores $125\ \mathrm{mJ}$, not $125\ \mathrm{J}$; and writing $v(t) = \frac{1}{C}\int i\,dt$ without $+\,v(t_0)$ silently assumes the element started at zero, which is only true when the problem says so.

## See Also

- [[11_First_Order_RC_and_RL_Transients]]
- [[12_Second_Order_RLC_Natural_Response]]
- [[09_Capacitance_from_Geometry]]
- [[15_Inductance_from_Geometry_and_Materials]]

---

[[09_Millman’s_and_Tellegen_Theorems|⬅ 09]] · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[11_First_Order_RC_and_RL_Transients|11 ➡]]
