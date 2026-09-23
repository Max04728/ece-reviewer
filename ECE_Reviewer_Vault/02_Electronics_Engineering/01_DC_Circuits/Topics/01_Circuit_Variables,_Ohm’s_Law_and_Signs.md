---
id: ECE-01-01
title: "Circuit Variables, Ohm’s Law and Signs"
part: "02_Electronics_Engineering"
area: "01_DC_Circuits"
topic: 1
tier: 2
depth: full
problem_count: 4
prereqs: ["[[06_Electric_Potential_and_Gradient]]"]
tags: ["ece", "electronics_engineering", "dc_circuits"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 01 — Circuit Variables, Ohm’s Law and Signs

> [!abstract] Scope
> What each circuit variable physically is, which reference directions make the sign of p meaningful, and how an ideal source differs from one carrying internal resistance.

## Core Concept

> [!tip] Intuition
> Charge in motion is current, and voltage is the energy each unit of charge gains or loses on its way around the loop; a resistor simply converts that energy to heat at a rate fixed by Ohm's law. Every sign in circuit analysis comes from one bookkeeping choice — whether the current reference arrow points into or out of the element's + terminal.

**The four variables, in order.** Charge $q$ (coulomb) is the primitive quantity; current is its time rate of change, $i = \frac{dq}{dt}$, so one ampere is one coulomb per second and $q(t) = q(t_0) + \int_{t_0}^{t} i\,d\tau$. Voltage is energy per unit charge, $v = \frac{dw}{dq}$, which is why a voltage always exists *between* two points and never *at* a point: $v_{ab} = v_a - v_b$ is the potential of $a$ measured with respect to $b$, so $v_{ba} = -v_{ab}$. Power is the rate of energy transfer, $p = \frac{dw}{dt} = vi$, and energy is its integral, $w = \int p\,dt$. Conventional current is the flow of *positive* charge and therefore points opposite to electron drift inside a metal; the physics is unchanged because every law you use is written for conventional current.

**Ohm's law, conductance, and the passive sign convention.** For a linear resistor $v = iR$, equivalently $i = Gv$ with conductance $G = 1/R$ in siemens. Resistance is geometry plus material, $R = \rho L/A$, so a long thin conductor has more resistance than a short fat one and a hot filament has more than a cold one; Ohm's law is a property of a *device*, not a law of nature, and it fails for diodes, filaments and anything whose $v$-$i$ curve is not a straight line through the origin. The sign of power is decided before any arithmetic: choose a current reference arrow and a voltage polarity, then apply the **passive sign convention** — if the reference current enters the $+$ terminal, then $p = vi$ is the power *absorbed*. A positive result means the element consumes energy (a resistor always does) and a negative result means it actually delivers $|p|$. An element is therefore classified as a source or a load by the sign of its power, not by its symbol: a battery being charged has $p > 0$ and absorbs.

**Ideal versus real sources.** An ideal voltage source holds $v$ fixed whatever current flows through it, has zero internal resistance, and can in principle supply unlimited power; an ideal current source holds $i$ fixed whatever voltage appears across it. Real sources carry internal resistance: a real voltage source is an ideal $V_s$ in series with $R_s$, so its terminal voltage sags as $v_t = V_s - iR_s$ and shorting its terminals produces the finite current $V_s/R_s$; a real current source is an ideal $I_s$ in parallel with a shunt resistance, so its delivered current falls as the load demands more voltage. Three consequences are worth memorising: the terminal voltage of a real voltage source is the full $V_s$ at no load, because a zero current drops nothing; the load only ever sees $v_t$, never $V_s$; and a source can absorb power, which happens whenever the current enters its $+$ terminal.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Current as the charge rate | $i = \frac{dq}{dt}$ | Instantaneous current. If q is in millicoulombs the result is milliamperes, because mC/s is mA — the 10^-3 is already carried by the charge unit, so do not convert a second time. |
| Charge from current | $q(t) = q(t_0) + \int_{t_0}^{t} i\,d\tau$ | Use when current is given as a function of time. The constant of integration is fixed by the initial charge at t_0, not assumed to be zero. |
| Ohm's law | $v = iR, \qquad i = \frac{v}{R}$ | Linear resistors only, and the current must be defined entering the + terminal for the sign to mean absorbed power. Invalid for diodes and any device with a curved v-i characteristic. |
| Conductance | $G = \frac{1}{R}$ | Unit siemens (S). Conductances in parallel add while resistances in series add; mixing the two without inverting first is a common slip. |
| Resistance from geometry | $R = \frac{\rho L}{A}$ | rho in ohm-metres, L in metres, A in square metres. Convert mm^2 to m^2 by multiplying by 10^-6 before substituting; rho rises with temperature for metals. |
| Power, passive sign convention | $p = vi$ | Equal to absorbed power only when the reference current enters the + terminal. p > 0 absorbs energy, p < 0 delivers \|p\| to the rest of the circuit. |
| Power in a resistor | $p = i^2 R = \frac{v^2}{R}$ | Always positive, since a resistor can never deliver power. Never use the v^2/R form with the source voltage in place of the voltage actually across the resistor. |
| Energy | $w = \int_{t_0}^{t} p\,d\tau$ | Joules when p is in watts and time in seconds. For constant power, w = pt; 1 kWh = 3.6 x 10^6 J. |
| Real voltage source terminal voltage | $v_t = V_s - i R_s$ | i is the current leaving the + terminal. At i = 0 the terminal voltage equals V_s; the short-circuit current is V_s/R_s, never infinite. |

## Worked Problems

### P1. The charge entering a device terminal is $q(t) = 5t^2$ mC for $t \ge 0$ s. Find $i(t) = dq/dt$, the current at $t = 3$ s, and the total charge that has accumulated by that instant.

**Given:** q(t) = 5t^2 mC for t >= 0 s; t = 3 s

**Solution:**

1. Differentiate the charge with respect to time: $i(t) = \frac{dq}{dt} = \frac{d}{dt}\left(5t^2\right) = 10t$ mC/s.
2. Convert the unit exactly once: $1$ mC/s $= 1$ mA, so $i(t) = 10t$ mA; the $10^{-3}$ is already inside the millicoulomb and must not be applied again.
3. Substitute the time in seconds: $i(3) = 10(3) = 30$ mA.
4. The accumulated charge is the function itself evaluated there: $q(3) = 5(3)^2 = 45$ mC, which agrees with $\int_0^3 10t\,dt = 5t^2\big|_0^3 = 45$ mC.

> [!success]- Answer
> **$i(t) = 10t$ mA, $i(3\ \mathrm{s}) = 30$ mA, and $q(3\ \mathrm{s}) = 45$ mC.**

> [!warning] Trap
> Dropping the factor 2, which gives $i = 5t$ mA, or plugging a time given in milliseconds into a formula whose $t$ is in seconds: $i(3\ \mathrm{ms}) = 10(0.003) = 0.03$ mA, three orders of magnitude smaller than the correct answer.

### P2. A $12$ V ideal voltage source drives a $6\ \Omega$ resistor, and the actual current leaves the source's $+$ terminal. Taking the reference arrow **into** the source's $+$ terminal (passive sign convention), find the power associated with the source, classify the source, and confirm the result with the resistor.

**Given:** Vs = 12 V; R = 6 Ω; actual current leaves the source's + terminal

**Solution:**

1. Ohm's law fixes the magnitude: $I = V_s/R = 12/6 = 2$ A, and the arrow leaves the source's $+$ terminal.
2. The passive sign convention requires the reference arrow to enter the $+$ terminal, which is opposite to the actual direction, so the reference current is $i = -2$ A.
3. Apply $p = vi = (12)(-2) = -24$ W. Negative absorbed power means the element delivers, so the source supplies $24$ W to the circuit.
4. Cross-check on the resistor: $p_R = I^2R = (2)^2(6) = 24$ W absorbed, exactly balancing the $24$ W delivered, so the sign convention is self-consistent.

> [!success]- Answer
> **$p_{source} = -24$ W absorbed, i.e. the source delivers $24$ W while the resistor absorbs $24$ W.**

> [!warning] Trap
> Computing $p = 12 \times 2 = +24$ W and calling the source a load, because the magnitude 24 was taken with the actual direction instead of the reference direction. The sign lives in the arrow: current leaving the $+$ terminal makes the passive-convention current $-2$ A.

### P3. A real voltage source with $V_s = 24$ V and internal resistance $R_s = 2\ \Omega$ drives a $10\ \Omega$ load. Find the load current, the terminal voltage, the power delivered to the load, and the power dissipated inside the source.

**Given:** Vs = 24 V; Rs = 2 Ω; RL = 10 Ω

**Solution:**

1. The internal resistance is in series with the load: $I = \frac{V_s}{R_s + R_L} = \frac{24}{2 + 10} = 2$ A.
2. Terminal voltage: $v_t = V_s - I R_s = 24 - (2)(2) = 20$ V, and the independent check $v_t = I R_L = (2)(10) = 20$ V confirms it.
3. Power delivered to the load: $P_L = I^2R_L = (2)^2(10) = 40$ W, equivalently $v_tI = (20)(2) = 40$ W.
4. Power lost inside the source: $P_{Rs} = I^2R_s = (2)^2(2) = 8$ W. The source develops $V_sI = (24)(2) = 48$ W $= 40 + 8$ W, so the energy balance closes.

> [!success]- Answer
> **$I = 2$ A, $v_t = 20$ V, $P_L = 40$ W, and $P_{Rs} = 8$ W.**

> [!warning] Trap
> Using the source voltage where the terminal voltage belongs: $V_s^2/R_L = 57.6$ W is wrong because the load only ever sees $20$ V. The mirror-image error is assuming $R_s$ always drops $4$ V — at no load the current is zero and the terminal voltage is the full $24$ V.

### P4. A $12$ V battery supplies a constant $250$ mA to a sensor for $8$ hours. Find the charge transferred, the power delivered, and the energy delivered in both joules and kilowatt-hours.

**Given:** V = 12 V; I = 250 mA constant; t = 8 h

**Solution:**

1. Charge is current times time, with time in seconds: $Q = It = (0.250)(8 \times 3600) = (0.250)(28800) = 7200$ C.
2. Power is voltage times current: $P = VI = (12)(0.250) = 3$ W.
3. Energy in joules: $W = Pt = (3)(28800) = 86400$ J.
4. Energy in kilowatt-hours: $W = 3\ \mathrm{W} \times 8\ \mathrm{h} = 24$ W·h $= 0.024$ kWh, and converting back gives $0.024 \times 3.6\times10^{6} = 86400$ J, matching step 3.

> [!success]- Answer
> **$Q = 7200$ C, $P = 3$ W, $W = 86400$ J $= 0.024$ kWh.**

> [!warning] Trap
> Mixing hour-based and second-based units. $(0.25\ \mathrm{A})(8\ \mathrm{h}) = 2$ A·h is a charge only after multiplying by 3600 to get $7200$ C, and $24$ W·h is $0.024$ kWh, not $24$ kWh — the factor 3600 must appear exactly once in each conversion.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Hours to seconds once: `8×3600` → **28800** s, then chain with `ALPHA` `:` — `0.25×Ans : 12×0.25 : Ans×28800`
> 2. `=` down the chain: $Q$ = **7200** C → $P$ = **3** W → $W$ = **86400** J.
> 3. `3×8` → **24** W·h, and `CONVT` (Energy/Power) kW·h↔J confirms 0.024 kW·h = **86400** J.
>
> Keep the 250 mA as 0.25 A on entry. Converting to kA or back to mA before the chain is what costs the mark here.

## Traps & Exam Notes

- **Reference-direction creep.** Reversing the current arrow or the voltage polarity part-way through a problem flips the sign of $p$ and silently re-labels a source as a load. Fix both references before writing any equation and keep them to the end.
- **Differentiating charge carelessly.** $q(t) = 5t^2$ mC gives $i = 10t$ mA: dropping the factor 2 gives $5t$, and treating mC/s as amperes inserts a spurious $10^{-3}$. Substituting a time stated in milliseconds into a formula whose $t$ is in seconds understates the current by a factor of 1000.
- **Using source voltage where terminal voltage belongs.** With a nonzero internal resistance, $P = V_s^2/R_L$ overstates the load power, sometimes badly; only $v_t = V_s - iR_s$ appears across the load. The same trap appears in reverse when the source's own dissipation is computed from $V_s$ instead of from the voltage across $R_s$.
- **Adding powers written in different conventions.** $\sum p = 0$ holds only when every element's power is expressed as absorbed power; mixing absorbed and delivered terms makes the total come out as $\pm 2$ times the true value. Convert every term to absorbed power first, then sum.

## See Also

- [[02_KCL,_KVL,_Series_and_Parallel_Reduction]]
- [[07_Thevenin_and_Norton_Equivalents]]
- [[08_Maximum_Power_Transfer_and_Source_Transformation]]
- [[10_Inductors,_Capacitors_and_Energy]]

---

⬅ *start* · [[_MOC_DC_Circuits|MOC]] · [[00_Dashboard|Dashboard]] · [[02_KCL,_KVL,_Series_and_Parallel_Reduction|02 ➡]]
