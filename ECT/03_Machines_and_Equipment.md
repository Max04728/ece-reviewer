---
title: Machines and Equipment — Deep Treatment
type: topic
updated: 2026-10-18
---

# 03 — Machines and Equipment (deep)

Motors, generators, transformers, supplies, appliances and communications equipment, treated as **operating principles with numbers**. The ECT paper asks description, but a technician who can state the equation and quote the rule of thumb answers every version of the question.

## 1. DC machines

### Construction

| Part | Function |
| --- | --- |
| **Field poles + winding** | Produce the main flux $\Phi$ |
| **Armature** | Carries the winding that current flows in / EMF is induced in |
| **Commutator + brushes** | Mechanical rectifier (generator) / inverter (motor) |
| **Interpoles** | Small poles in the commutating zone — improve commutation under load |
| **Compensating winding** | Cancels armature reaction in large machines |
| Yoke / frame | Magnetic return path and mechanical support |

### Generated EMF

$$E = \frac{P\,\Phi\,Z\,N}{60A}$$

$P$ = poles, $\Phi$ = flux per pole (Wb), $Z$ = armature conductors, $N$ = speed (rpm), $A$ = number of parallel paths.

$$A = 2 \text{ (wave winding)} \qquad A = P \text{ (lap winding)}$$

**P1 — Generated EMF of a DC generator.**
A 4-pole DC generator has **400 armature conductors** and a flux of **0.02 Wb per pole**. It is wave-wound and driven at **1500 rpm**.

**Given:** poles $P = 4$; flux per pole $\Phi = 0.02\ \text{Wb}$; conductors $Z = 400$; speed $N = 1500\ \text{rpm}$; wave winding so $A = 2$ parallel paths
**Find:** the generated EMF $E$, in volts
**Solution:** the machine's induced EMF is the flux cut per unit time:

$$E = \frac{P\,\Phi\,Z\,N}{60A} = \frac{(4)(0.02\ \text{Wb})(400)(1500\ \text{rpm})}{60 \times 2} = \frac{48\,000}{120} = 400\ \text{V}$$

**Answer:** $E = 400\ \text{V}$. Note $A = 2$ for wave and $A = P$ for lap — using $A = 4$ here would halve the answer to 200 V.

Doubling $Z$ doubles the EMF; so does doubling the speed or the flux.

### Torque

$$T = \frac{P\Phi Z I_a}{2\pi A} = 0.159\,\frac{P\Phi Z I_a}{A}\ [\text{N·m}]$$

Torque is proportional to **flux × armature current** — which is why a series motor (flux rises with current) produces so much starting torque, and why a shunt motor's torque is nearly linear in current.

### Back EMF and the motor equation

$$E_b = V - I_a R_a \qquad N \propto \frac{E_b}{\Phi} \propto \frac{V - I_a R_a}{\Phi}$$

At standstill $E_b$ = 0, so $I_a = V/R_a$ — the only limit is armature resistance, which is why **starting current is enormous** and why a starter is not optional on a DC motor.

**Speed control follows directly from the equation:**

| Control | Effect |
| --- | --- |
| **Armature voltage** | Speed rises with $V$; torque capability largely retained — the modern (thyristor/PWM) method |
| **Field flux** (field weakening) | Less flux → higher speed at the same voltage; torque falls; used above base speed |
| **Armature resistance** | Wastes power, drops speed under load — the old rheostatic method |

### Generator characteristics

| Type | Voltage behaviour as load increases |
| --- | --- |
| Separately excited | Nearly flat, small drop from armature reaction and $I_aR_a$ |
| **Shunt** | Drops noticeably — the field is fed from its own terminals, so as voltage falls the field weakens |
| **Series** | **Rises** with load (field is the load current) |
| **Cumulative compound** | Nearly level — the series field compensates the shunt droop |

**Why a shunt generator will not build up:** it depends on **residual magnetism**. Failures to build: no residual magnetism (needs flashing from a battery), reversed field connection, field resistance above critical value, or a shorted field.

### Losses and efficiency

| Loss | Varies with |
| --- | --- |
| Copper ($I^2R$ armature, field, brush contact) | Load, squared |
| Core (hysteresis, eddy) | Flux and speed — essentially constant at fixed speed |
| Mechanical (friction, windage) | Speed |
| Stray load | Approximated at ~1% |

$$\eta = \frac{P_{out}}{P_{out} + P_{loss}} \quad\text{and}\quad P_{out} = P_{in} - P_{loss}$$

**Starters.** A three-point starter inserts resistance in the armature circuit and releases it in steps as the motor accelerates; the no-volt release drops out on supply failure, and the overload release trips on sustained excess current. Modern drives replace all of it with a controlled ramp.

**Braking:** rheostatic (energy into a resistor), plugging (reverse the armature supply — violent, high current), regenerative (return energy to the supply, only above base speed).

## 2. Three-phase induction motor

### The rotating field

Three windings, 120° apart electrically, fed by a three-phase supply, produce a **constant-magnitude flux rotating at synchronous speed**. That rotating field is the whole reason a three-phase motor **self-starts** without any auxiliary winding.

$$N_s = \frac{120f}{P}$$

| Poles | 50 Hz | 60 Hz |
| ---: | ---: | ---: |
| 2 | 3000 | 3600 |
| 4 | 1500 | 1800 |
| 6 | 1000 | 1200 |
| 8 | 750 | 900 |

### Slip and rotor frequency

$$s = \frac{N_s - N_r}{N_s} \qquad f_{rotor} = s\,f_{stator}$$

**P2 — Slip and rotor frequency.**
A **4-pole** induction motor is supplied at **60 Hz** and runs at **1740 rpm** at full load.

**Given:** poles $P = 4$; supply frequency $f = 60\ \text{Hz}$; rotor speed $N_r = 1740\ \text{rpm}$
**Find:** (a) synchronous speed; (b) slip; (c) rotor frequency
**Solution:** synchronous speed follows from pole count and frequency; slip is the fractional shortfall; the rotor sees the slip-scaled frequency:

$$N_s = \frac{120f}{P} = \frac{120(60)}{4} = 1800\ \text{rpm} \qquad s = \frac{N_s - N_r}{N_s} = \frac{1800 - 1740}{1800} = 0.0333$$

$$f_{rotor} = s\,f = 0.0333(60\ \text{Hz}) = 2\ \text{Hz}$$

**Answer:** $N_s = 1800\ \text{rpm}$, **slip 3.33%**, rotor frequency **2 Hz** — the figure that justifies calling the rotor current nearly DC at full load.

At standstill $s$ = 1 (rotor frequency = line frequency, maximum induced EMF, maximum current). At synchronous speed $s$ = 0, no relative motion, **no rotor current, no torque** — so the motor can never quite reach $N_s$.

### Equivalent circuit and torque

The rotor is modelled as a resistance $R_2/s$ — the $/s$ term is the mechanical load.

$$T = \frac{3}{\omega_s}\cdot\frac{V^2 (R_2/s)}{\left(R_1 + R_2/s\right)^2 + \left(X_1 + X_2\right)^2}$$

Two results worth memorising:

1. **Torque ∝ V².** A 10% voltage sag leaves about **81%** of the torque; a 20% sag leaves 64%.
2. **Maximum (breakdown) torque is independent of rotor resistance**, but the **slip at which it occurs** is not:

$$s_{max} = \frac{R_2}{\sqrt{R_1^2 + (X_1+X_2)^2}} \approx \frac{R_2}{X_1+X_2}$$

That is why adding rotor resistance (wound-rotor motor) moves the torque peak to a higher slip and gives high starting torque without high starting current.

### Torque–slip curve, three regions

| Region | Slip | Behaviour |
| --- | --- | --- |
| **Starting (breakdown approach)** | s → 1 | Torque rises as the rotor speeds up |
| **Normal operating** | s = 2–5% | Torque nearly linear in slip; stable, self-regulating |
| **Unstable** | beyond $s_{max}$ | Torque falls with speed — the motor stalls |

### Starting methods

| Method | Starting current | Starting torque | Note |
| --- | --- | --- | --- |
| **DOL** (direct on line) | **5–8 × FLA** | 100% | Simplest; fine up to a few kW |
| **Star-delta** | **1/3** of DOL | **1/3** of DOL | Needs a delta-rated motor with six terminals |
| Autotransformer (tap) | Reduced by tap² | Reduced by tap² | Smooth taps, more cost |
| Soft starter | Ramped, typically 2–4 × FLA | Reduced | Thyristor phase control |
| **VFD** | ≈ 100–150% | Full torque from zero speed | Best control, adds harmonics |

**Star-delta arithmetic:** in star each winding sees $V/\sqrt{3}$, so phase current is $1/\sqrt{3}$ and the **line** current is $1/3$ of the delta value; torque, being ∝ V², is also **1/3**.

### VFD behaviour

- Controls speed by varying **frequency**; to keep flux constant it varies **voltage in proportion** — the **V/f** (constant flux) law.
- Below base speed: constant torque. Above base speed: voltage is capped, so it becomes **constant power** with falling torque (field weakening).
- **PWM** output with a carrier of a few kHz; long motor cables and high dv/dt stress the winding insulation — hence drive-rated motors and output reactors.
- Regenerative braking needs a **brake resistor** or a regenerative front end, otherwise the DC bus over-voltages.

### Protection and nameplate

| Item | Meaning |
| --- | --- |
| **FLA / FLC** | Full-load current — the number an overload relay is set to |
| Service factor | Permissible continuous overload (1.15 = 15%) |
| Insulation class | B 130 °C, F 155 °C, H 180 °C |
| **NEMA design A/B/C/D** | Torque and slip character (B = general purpose, D = high slip/high starting torque) |
| Frame | Mounting dimensions (NEMA or IEC) |
| Connection | Y or Δ, and the voltage for each |

**Overload relay** protects against sustained overcurrent; it is set to FLA and has a **class** (Class 10 trips in 10 s at 6× FLA). It does **not** replace a short-circuit breaker.

## 3. Single-phase motors

A single winding produces a **pulsating**, not rotating, field: two counter-rotating fields of equal size, so **no starting torque**. Starting requires a second winding displaced in space and in phase.

| Type | Phase displacement | Starting torque | Use |
| --- | --- | --- | --- |
| **Split-phase (resistance start)** | Resistance/reactance difference | Low–moderate | Small pumps, fans |
| **Capacitor-start** | Capacitor in the aux winding | **High** | Compressors, larger pumps |
| Capacitor-start capacitor-run (two caps) | Both | High, and good running PF | Aircon compressors |
| **PSC** (permanent split capacitor) | Capacitor stays in circuit | Low | Fans, blowers — quiet, no switch |
| **Shaded pole** | Shading ring delays flux | Very low | Small fans, turntables |

**Capacitor failure signatures:** a motor that **hums and does not turn**, draws locked-rotor current, and gets hot is usually a failed start capacitor (bulged, leaking, or open) or a stuck centrifugal switch. A run capacitor that has lost capacitance shows a weak motor that overheats and has poor power factor.

**Reversal:** swap the two leads of the **start winding**, not the supply — swapping the supply does not reverse a split-phase or PSC motor.

## 4. Special machines

| Machine | Principle | Point |
| --- | --- | --- |
| **Stepper** | Digital pulses → fixed angular steps | Step angle = 360°/steps per revolution; 1.8° = 200 steps/rev; **microstepping** interpolates; open loop, holding torque when stopped |
| **Servo** | Motor + encoder + closed loop | Position guaranteed; torque and accuracy far above a stepper |
| BLDC | Electronic commutation with Hall sensors | High efficiency, used in fans and drones |
| **Universal motor** | Series-wound, runs on AC or DC | Drills, vacuum cleaners — high speed, brushes wear |
| Synchronous motor | Rotor locked to $N_s$ | Constant speed regardless of load (within pull-out) |
| Shaded-pole | Shading ring | Cheap, low torque, tiny fans |

## 5. Transformers

### EMF equation

$$\Phi = \Phi_m\sin\omega t \;\Rightarrow\; E = 4.44\,f N \Phi_m$$

The **4.44** is $2\pi/\sqrt{2}$ — the RMS of a sinusoid through Faraday's law. Flux in webers, $f$ in hertz, $N$ turns, $E$ in volts RMS.

**P3 — Transformer EMF from flux.**
A transformer winding has **500 turns** and is excited at **60 Hz**, where the peak core flux is **4 mWb**.

**Given:** $N = 500$ turns; $f = 60\ \text{Hz}$; peak flux $\Phi_m = 4\ \text{mWb} = 0.004\ \text{Wb}$
**Find:** the RMS induced EMF, in volts
**Solution:** the 4.44 factor is $2\pi/\sqrt{2}$, the RMS conversion for a sinusoid:

$$E = 4.44\,f N \Phi_m = 4.44(60\ \text{Hz})(500)(0.004\ \text{Wb}) = 533\ \text{V}$$

**Answer:** $E \approx 533\ \text{V}$ — about **1.07 V per turn**. Drop the frequency to 50 Hz at the same voltage and the flux must rise 20%, which starts the saturation problem.

Since $E/N$ is fixed by $f$ and $\Phi_m$, a transformer has a **volts-per-turn** rating: exceed the flux (by over-voltage or under-frequency) and the core saturates, current spikes, and the winding overheats.

### Ratio and power

$$\frac{V_p}{V_s} = \frac{N_p}{N_s} = \frac{I_s}{I_p} = a \qquad V_pI_p = V_sI_s \ (\text{ideal})$$

**Trap:** voltage and turns move together, **current moves oppositely**. A 10:1 step-down transformer steps current **up** 10×.

### The real transformer

| Element | Represents |
| --- | --- |
| $R_1, X_1$ | Primary resistance and leakage reactance |
| $R_2, X_2$ (referred: $R_2/a^2$) | Secondary quantities referred to the primary |
| $R_c$ | Core loss (hysteresis + eddy) |
| $X_m$ | Magnetising reactance — the current that establishes flux |

**Losses:**

- **Copper**: $I^2R$ in both windings; varies as **load squared**.
- **Core**: hysteresis $\propto f B^{1.6}$ (reduced by grain-oriented silicon steel) plus eddy $\propto f^2B^2t^2$ (reduced by **laminations**, and further by thin insulated sheet).

**Efficiency:**

$$\eta = \frac{P_{out}}{P_{out} + P_{cu} + P_{core}}$$

**Maximum efficiency occurs when copper loss equals core loss**, i.e. at a load fraction

$$x = \sqrt{\frac{P_{core}}{P_{cu,\text{rated}}}}$$

so a transformer designed to run near full load has maximum efficiency near full load, and one that idles most of the day is designed for a lower $x$.

**All-day efficiency** — the one that matters for a distribution transformer:

$$\eta_{all\text{-}day} = \frac{\text{kWh output in 24 h}}{\text{kWh input in 24 h}}$$

It is lower than the instantaneous efficiency because the transformer carries **core loss all day** whether or not it carries load.

### The two tests that give you every parameter

| Test | Condition | Measures |
| --- | --- | --- |
| **Open-circuit (no-load)** | Rated voltage on one winding, other open | **Core loss** (and magnetising current, turns ratio) |
| **Short-circuit** | Reduced voltage until rated current flows | **Copper loss** (and leakage impedance) |

Neither test requires loading the transformer — which is the point.

### Voltage regulation and polarity

$$\text{regulation} = \frac{V_{no\text{-}load} - V_{full\text{-}load}}{V_{full\text{-}load}}\times100\%$$

**Dot convention:** dots mark terminals of the same instantaneous polarity. Getting the dots backwards turns a parallel connection into a short circuit.

**Parallel operation requires** the same polarity (dots matched), the same voltage ratio, the same phase sequence and group, and similar impedance — otherwise circulating current flows.

### Three-phase connections

| Connection | Character |
| --- | --- |
| **Yy** | Neutral available both sides; third-harmonic problems without a delta tertiary |
| **Dy** | Common distribution connection — delta primary blocks triplen harmonics |
| **Yd** | Transmission step-down |
| **Dd** | No neutral; used for lower voltages |
| **Zigzag** | Handles imbalance and harmonics; used for grounding transformers |

**Triplen harmonics** (3rd, 9th, 15th) add in phase in a star neutral; a **delta** winding traps them as circulating current. That is why a delta primary is standard on distribution transformers.

### Autotransformer

One tapped winding. The **common** portion carries the difference current, so less copper is needed:

$$\text{copper saving} \approx (1 - K)\times S_{rated} \qquad K = \frac{V_{low}}{V_{high}}$$

**P4 — Copper saving in an autotransformer.**
A **10 kVA** autotransformer steps **240 V** down to **200 V**.

**Given:** through-power $S = 10\ \text{kVA}$; $V_{high} = 240\ \text{V}$; $V_{low} = 200\ \text{V}$
**Find:** (a) the ratio $K$; (b) the fraction of copper saved; (c) the kVA that must actually be transformed
**Solution:** only the difference between input and output current flows in the common winding:

$$K = \frac{V_{low}}{V_{high}} = \frac{200}{240} = 0.833 \qquad \text{saving} = 1 - K = 0.167 \approx 16.7\%$$

$$S_{winding} = K\,S = 0.167(10\ \text{kVA}) = 1.67\ \text{kVA}$$

**Answer:** **16.7% less copper**, and the magnetic circuit handles only **1.67 kVA** while delivering 10 kVA — the reason an autotransformer is smaller and cheaper. **Cost:** no isolation; a primary fault can reach the secondary, so it is never used where isolation is the safety requirement.

**Variac** = variable autotransformer; it does **not** isolate. Isolation requires a separate two-winding transformer.

### Instrument transformers

**Current transformer (CT):**

- Secondary is a **standard 5 A** (or 1 A); ratio written as 100/5.
- **Never open-circuit a CT secondary while the primary is energised.** With no secondary current to oppose the flux, the core saturates, the flux collapses each half-cycle at a steep rate, and the secondary develops a **very high voltage** — lethal, and it destroys the winding. Short the secondary before removing any meter.
- **Burden** is the total impedance of the secondary circuit; exceeding it degrades accuracy.
- **Accuracy class** (0.5, 1.0, 3.0) states the ratio error at rated burden.

**Potential transformer (PT):** secondary standard 120 V; ratio like 13.8 kV/120 V; never short a PT secondary.

### Other transformer facts

| Item | Point |
| --- | --- |
| **Tap changer** | Off-circuit (de-energised) or **on-load (OLTC)**; compensates supply voltage |
| **Inrush** | Switching on at a voltage zero drives the core into saturation; several times rated current for a few cycles, **rich in second harmonic** — the signature used to discriminate it from a fault |
| **Buchholz relay** | Gas-accumulation and oil-surge protection on oil-filled transformers |
| **Breather (silica gel)** | Absorbs moisture from air entering the conservator; turns pink when spent |
| **Cooling classes** | ONAN, ONAF, OFAF, OFWF |
| **Oil testing** | Dielectric strength and moisture; the oil is both insulation and coolant |
| **Ferroresonance** | Resonance between a saturable core and a capacitance (cable, capacitor bank) — over-voltages; relevant to PTs |

## 6. Rectifiers and power supplies

### Rectifier comparison

| Circuit | $V_{dc}$ (no filter) | Ripple factor | PIV per diode | Ripple frequency |
| --- | ---: | ---: | ---: | ---: |
| Half-wave | $0.318V_m$ | 1.21 | $V_m$ | $f$ |
| **Full-wave centre-tap** | $0.636V_m$ | 0.482 | $2V_m$ | $2f$ |
| **Bridge** | $0.636V_m$ | 0.482 | $V_m$ | $2f$ |

The bridge is standard because it needs only a single secondary and each diode sees half the PIV of the centre-tap circuit; the cost is **two diode drops in the current path** (~1.4 V), which matters at low output voltage.

### Capacitor filter

The capacitor charges to the peak and discharges through the load between peaks:

$$V_{r(pp)} \approx \frac{I_L}{f_r C} \qquad f_r = 2f \text{ (full wave)}$$

**P5 — Ripple across a filter capacitor.**
A full-wave rectifier on a **60 Hz** supply feeds a **1 A** DC load through a **1000 µF** filter capacitor.

**Given:** load current $I_L = 1\ \text{A}$; capacitance $C = 1000\ \mu\text{F} = 1\times10^{-3}\ \text{F}$; full-wave rectification so ripple frequency $f_r = 2(60) = 120\ \text{Hz}$
**Find:** the peak-to-peak ripple voltage
**Solution:** the capacitor discharges through the load between charging peaks:

$$V_{r(pp)} = \frac{I_L}{f_r C} = \frac{1\ \text{A}}{(120\ \text{Hz})(1\times10^{-3}\ \text{F})} = 8.33\ \text{V}_{pp}$$

**Answer:** **8.3 V peak-to-peak** on top of the DC. Doubling C halves it; raising $f_r$ (an SMPS switches at tens of kHz) collapses it — which is why SMPS filters are tiny and line-frequency supplies need a regulator behind the capacitor.

### Linear regulator

The pass element burns the difference:

$$P_{diss} = (V_{in} - V_o)\,I_L \qquad \eta = \frac{V_o}{V_{in}}$$

**P6 — Dissipation and junction temperature of a linear regulator.**
A **7805** regulates **12 V** down to **5 V** while delivering **1 A**. It sits on a heatsink whose thermal resistance is **5 °C/W**, with a junction-to-case resistance of **3 °C/W** and a case-to-sink resistance of **1 °C/W**, in **40 °C** ambient air. The maximum junction temperature is **125 °C**.

**Given:** $V_{in} = 12\ \text{V}$; $V_o = 5\ \text{V}$; $I_L = 1\ \text{A}$; $R_{\theta jc} = 3\ ^\circ\text{C/W}$; $R_{\theta cs} = 1\ ^\circ\text{C/W}$; $R_{\theta sa} = 5\ ^\circ\text{C/W}$; $T_a = 40\ ^\circ\text{C}$
**Find:** (a) power dissipated; (b) efficiency; (c) junction temperature
**Solution:** the pass element drops the difference in series with the load, so dissipation is the voltage difference times the current; efficiencies follow from the voltage ratio; temperatures stack thermal resistances against that power:

$$P = (12 - 5)\ \text{V} \times 1\ \text{A} = 7\ \text{W} \qquad \eta = \frac{5}{12} = 42\%$$

$$T_j = T_a + P(R_{\theta jc} + R_{\theta cs} + R_{\theta sa}) = 40 + 7(3+1+5) = 40 + 63 = 103\ ^\circ\text{C}$$

**Answer:** **7 W**, **42% efficient**, junction at **103 °C** — 22 °C below the limit, so it runs but with little margin. Switch the input to 24 V and the dissipation triples to 19 W, the junction passes 200 °C, and the regulator shuts down. That is exactly what "the regulator keeps cutting out" means in the field.

**Dropout:** a 78xx needs about **2 V** of headroom; an **LDO** (low dropout) regulator needs 0.2–0.5 V. A 5 V rail from 6 V is an LDO job, not a 7805 job.

### SMPS topologies

| Topology | Voltage relation | Isolated | Note |
| --- | --- | --- | --- |
| **Buck** | $V_o = D\,V_{in}$ | No | Step-down only |
| **Boost** | $V_o = \dfrac{V_{in}}{1-D}$ | No | Step-up; D never reaches 1 |
| **Buck-boost** | $V_o = V_{in}\dfrac{D}{1-D}$ | No | Inverting |
| **Flyback** | $V_o \propto N_s/N_p \cdot \dfrac{D}{1-D}$ | **Yes** | The standard off-line supply below ~150 W — energy stored in the transformer during the on-time |
| Forward | Transformer transfers during on-time | Yes | Needs a reset winding or active clamp |
| Push-pull / half-bridge / full-bridge | Higher power | Yes | Server and industrial supplies |

**Block chain:** mains → EMI filter → bridge → bulk capacitor → high-frequency switch → transformer → secondary rectifier → LC filter → feedback (optocoupler + TL431 or a dedicated controller) → PWM duty control.

**Why flyback dominates:** one switch, one transformer that provides **isolation**, and regulation by duty cycle. The transformer also stores energy, so no output inductor is needed.

**Practical SMPS facts:**

| Item | Point |
| --- | --- |
| **Inrush** | Cold bulk capacitor looks like a short — an **NTC** or relay limits it |
| **PFC** | Above ~75 W, a power-factor-correction front end is required by most standards; without it the bridge draws current in narrow spikes |
| **Holdup time** | The bulk cap must ride through a mains dip — typically 10–20 ms at full load |
| **Cross-regulation** | A multi-output flyback regulates one rail well; the others follow loosely |
| **Ripple current** | The output capacitor heats by $I^2R_{ESR}$; a cheap cap fails first |
| **Capacitor life** | Roughly **doubles for every 10 °C reduction** in operating temperature — the single best predictor of supply life |

**Fault signatures:**

| Symptom | First suspects |
| --- | --- |
| Dead, fuse good | Startup resistor/capacitor, PWM controller, optocoupler |
| Fuse blown | Bridge rectifier, switching FET, MOV, bulk cap short |
| Hiccup / chirping | Overload or short on the output, or a failing current-sense circuit |
| Output high | Feedback loop open (optocoupler, TL431, divider) |
| Output low under load | Dried output capacitors, high ESR |
| Works cold, fails hot | Thermal fault, or a capacitor at end of life |

## 7. UPS and batteries

| Type | Operating mode | Transfer | Use |
| --- | --- | --- | --- |
| **Offline / standby** | Load on mains; inverter starts on failure | few ms (5–10) | Home PC |
| **Line-interactive** | Adds AVR buck/boost, inverter on failure | few ms | Small office |
| **Online (double conversion)** | Load **always** on the inverter; AC → DC → AC | none | Servers, medical |

Online is preferred where a transfer gap is unacceptable. Evaluate a UPS on **VA and W rating, crest factor, THD, transfer time, and battery autonomy** — not on watts alone.

**Battery arithmetic:**

- Capacity is quoted in **Ah at a stated rate**, usually **C/20**, and the delivered capacity **falls at higher current** (Peukert effect).
- **Depth of discharge (DoD)** matters: a VRLA cycled to 80% DoD dies far sooner than one cycled to 30%.
- **Autonomy** ≈ capacity × usable DoD ÷ load current. **P7 — Battery autonomy behind a UPS.**
A UPS carries a **100 Ah** battery bank rated at C/20, discharged to **50% depth**, feeding a **20 A** load.

**Given:** capacity $C = 100\ \text{Ah}$; usable depth of discharge = 50%; load current $I = 20\ \text{A}$
**Find:** the runtime, in hours
**Solution:** only the usable charge is available:

$$Q_{usable} = 0.50(100\ \text{Ah}) = 50\ \text{Ah} \qquad t = \frac{50\ \text{Ah}}{20\ \text{A}} = 2.5\ \text{h}$$

**Answer:** **2.5 h** at the C/20 rating — less in practice, because a 20 A draw from a 100 Ah block is roughly C/5, and Peukert's effect cuts delivered capacity at higher rates. A real design applies a derating factor and a temperature correction.
- **Float** charge ≈ 13.5–13.8 V per 12 V block; **boost/equalise** ≈ 14.1–14.4 V; over-charging a VRLA causes **thermal runaway**, under-charging causes **sulphation**.

## 8. Appliances

### Refrigeration and air conditioning

The cycle transfers heat **against** the gradient by doing work:

**Compressor** (low-pressure vapour → high-pressure vapour) → **condenser** (rejects heat, becomes liquid) → **expansion device** (pressure drops, temperature falls) → **evaporator** (boils, absorbs room heat) → back to compressor.

| Term | Meaning |
| --- | --- |
| **Superheat** | Temperature of vapour above its saturation temperature — typically 5–10 K; too little = risk of liquid slugging, too much = undercharge or a starving evaporator |
| **Subcooling** | Liquid temperature below saturation at the condenser outlet — confirms a full liquid seal |
| Fouled condenser | High head pressure, poor cooling — the most common "needs gas" call that is not a gas problem |
| Frost pattern | Uneven frost = short charge or a restriction; no frost = no cooling |
| Compressor types | Reciprocating (piston), rotary, **scroll** (quiet, efficient), inverter-driven DC variable speed |
| Heat pump | A **reversing valve** swaps evaporator and condenser functions |
| Defrost | Timer or demand defrost clears the frost that blocks the evaporator |

**Diagnostic logic that gets marks:** measure **pressures** and **current** together. Low suction and low head with a warm evaporator = undercharge or restriction. High head and high current = condenser airflow or overcharge. High suction and low head = a failed compressor.

### Microwave oven

| Part | Function |
| --- | --- |
| **Magnetron** | Converts HV into ~**2.45 GHz** RF; a thermionic cathode emits, the anode vanes form resonant cavities, permanent magnets bend the electrons |
| **HV transformer** | Steps mains up to ~2 kV |
| **HV capacitor + HV diode** | A **voltage doubler** — together they produce roughly **4 kV** for the magnetron |
| **Interlocks (usually 3)** | Cut power when the door opens |
| **Monitor interlock** | A deliberately redundant switch that **blows the fuse** if the other interlocks fail on — a safety, not a control |
| Turntable / stirrer | Spreads the field evenly |

**Why 2.45 GHz:** it is an ISM band, and it excites rotational modes of **water** molecules, so heating is efficient in food and needs only a small magnetron.

**Why running empty damages it:** with no load the RF energy has nowhere to go and is reflected, overheating the magnetron. Never operate a microwave with nothing inside.

**Safety:** the HV capacitor and the doubler **retain a lethal charge after unplugging**. Discharge through a resistor before touching the HV section, and never defeat the interlocks.

**Fault signatures:** no heating but everything else runs → magnetron, HV diode, or HV capacitor; blowing the fuse on every start → **monitor interlock or a shorted HV component**; arcing inside → burnt waveguide cover or metal contamination.

### CRT era (still examinable as "operating principle")

| Stage | Function |
| --- | --- |
| Electron gun | Heated cathode, grid, accelerating anodes |
| Deflection yoke | Magnetic deflection, both axes |
| **Flyback transformer** | Generates the **EHT** (20–30 kV) plus focus, screen, and other secondary rails |
| Voltage multiplier | Flyback secondary plus rectifiers produce the tube anode voltage |
| Convergence | Keeps the three beams coincident on a delta-gun tube |

The tube and the EHT anode hold charge after switch-off; discharge before handling. The flyback typically fails with a shorted winding or a broken solder joint, giving no raster.

### Modern televisions

| Symptom | Suspect |
| --- | --- |
| No picture, sound OK | Backlight strips, backlight driver, T-con |
| Picture with vertical/horizontal bands | Panel or T-con |
| No standby light | Power supply / standby circuit |
| Blown LED strip | One open LED kills the series string |

### Other appliances

| Appliance | Principle |
| --- | --- |
| Washing machine | Timer or PCB sequences inlet valve, motor, drain pump; inverter types use a BLDC motor |
| Rice cooker | Bimetallic thermostat shifts from cook (~100 °C) to warm; thermal fuse is the safety |
| **Induction cooker** | IGBT drives a resonant coil; the pot itself is the heating element — no pot, no load, no heat |
| Electric fan | Shaded-pole or PSC motor; speed by tapped winding or triac |
| Water heater | Heating element + thermostat + independent **thermal cutout** |
| Air purifier / dehumidifier | Fan, filter, and for the dehumidifier the same refrigeration cycle |

## 9. Communications and computer equipment

### Superheterodyne receiver

The incoming signal is **mixed down to a fixed intermediate frequency**, so gain, selectivity and stability are designed once instead of at every frequency.

**RF amp → mixer (with local oscillator) → IF amplifier + filters → detector/demodulator → audio**

$$f_{LO} = f_{RF} \pm f_{IF} \qquad f_{image} = f_{RF} + 2f_{IF} \ (\text{high-side injection})$$

**P8 — Local oscillator and image frequency.**
An AM broadcast receiver with a **455 kHz** intermediate frequency is tuned to a station at **1000 kHz**, using high-side injection.

**Given:** received frequency $f_{RF} = 1000\ \text{kHz}$; IF $= 455\ \text{kHz}$; high-side injection
**Find:** (a) the local oscillator frequency; (b) the image frequency
**Solution:** the mixer produces the difference, so the oscillator sits one IF above the signal; the image is the other frequency that yields the same difference — one IF on the far side of the oscillator:

$$f_{LO} = f_{RF} + f_{IF} = 1000 + 455 = 1455\ \text{kHz} \qquad f_{image} = f_{LO} + f_{IF} = 1000 + 2(455) = 1910\ \text{kHz}$$

**Answer:** $f_{LO} = 1455\ \text{kHz}$; the image is at **1910 kHz** — only the RF amplifier's tuned circuits reject it, which is why a cheap receiver hears a strong station at the image frequency.

| Parameter | Value / point |
| --- | --- |
| AM broadcast IF | **455 kHz** |
| FM broadcast IF | **10.7 MHz** |
| AGC | Holds output constant as signal strength varies |
| Image rejection | Set by the RF amplifier and its tuned circuits |
| Double conversion | Two IFs to push the image far away — used in high-performance receivers |

**Transmitter chain:** oscillator → modulator → driver → **power amplifier** → matching network → antenna. Class of operation of the PA trades linearity against efficiency (Class A linear/inefficient, Class C efficient/nonlinear — suited to FM and CW).

### Antenna and transmission line

| Concept | Expression |
| --- | --- |
| Characteristic impedance | Coax is 50 Ω (test/communications) or 75 Ω (video/CATV) |
| Reflection coefficient | $\Gamma = (Z_L - Z_0)/(Z_L + Z_0)$ |
| VSWR | $(1+\lvert\Gamma\rvert)/(1-\lvert\Gamma\rvert)$ |
| Return loss | $-20\log_{10}\lvert\Gamma\rvert$ |
| Power delivered | $P_{del} = P_{inc}(1 - \lvert\Gamma\rvert^2)$ |

A VSWR of 2:1 reflects 11% of the power; 3:1 reflects 25%. Coaxial **loss rises with frequency**, so a long run at VHF loses more than the same run at HF — which is why cable loss, not just VSWR, decides whether a link works.

### Fibre link budget

**P9 — Fibre link budget.**
A fibre link uses a transmitter launched at **−3 dBm** and a receiver with **−28 dBm** sensitivity. The route has **2 connectors at 0.5 dB each** and **4 splices at 0.1 dB each**, over cable with **0.35 dB/km** attenuation.

**Given:** $P_{tx} = -3\ \text{dBm}$; sensitivity $P_{rx,min} = -28\ \text{dBm}$; connector loss 0.5 dB × 2; splice loss 0.1 dB × 4; fibre attenuation 0.35 dB/km
**Find:** the maximum reach, with and without a 3 dB design margin
**Solution:** the budget is the difference in dBm; passive losses are subtracted, and the remainder divided by loss per kilometre:

$$\text{budget} = (-3) - (-28) = 25\ \text{dB}$$
$$\text{passive} = 2(0.5) + 4(0.1) = 1.4\ \text{dB} \qquad \text{available} = 25 - 1.4 = 23.6\ \text{dB}$$
$$L_{max} = \frac{23.6\ \text{dB}}{0.35\ \text{dB/km}} = 67\ \text{km}$$

**Answer:** **≈ 67 km** with no margin; with a 3 dB margin the budget is 20.6 dB and the reach falls to **≈ 59 km**.

### Telephony

| Parameter | Value |
| --- | --- |
| Loop battery | **48 V DC** (central office) |
| Off-hook loop current | **20–30 mA** |
| Ringing voltage | ~**90 V AC at 20 Hz** |
| DTMF | Two tones per digit, one from each group |
| PABX | Extends loops internally; trunk circuits to the carrier |
| ADSL/VDSL | Data on the same pair above the voice band, split by filters |

### Computers

| Block | Point |
| --- | --- |
| ATX PSU rails | **+3.3 V, +5 V, +12 V** (and −12 V); +12 V now carries the CPU and GPU |
| **PS-ON** | Pulled low by the motherboard to start the supply; the supply is otherwise in standby (5 VSB present) |
| **POST** | Power-on self-test; beep codes or a POST card identify a failed subsystem |
| Memory / storage | DDR DIMMs, SATA, NVMe/M.2 |
| PSU sizing | Sum the rail loads, add headroom; cheap supplies inflate the wattage and under-rate the +12 V |

---

## Recall test

1. EMF of a 4-pole, 400-conductor, 1500 rpm wave-wound generator with $\Phi$ = 0.02 Wb?
2. Why does a DC series motor run away when unloaded?
3. Synchronous speed of a 6-pole motor at 60 Hz, and its slip at 1170 rpm?
4. Rotor frequency at that slip?
5. Torque at 80% of rated voltage, as a fraction of rated torque?
6. Star-delta starting: starting current and torque as fractions of DOL?
7. EMF of a 60 Hz transformer with 500 turns and 4 mWb peak flux?
8. At what load does a transformer reach maximum efficiency?
9. Which test gives core loss, and which gives copper loss?
10. A CT secondary open-circuits while energised — what happens, and why?
11. Autotransformer 240 → 200 V: fraction of copper saved?
12. Ripple voltage of 1 A through 1000 µF on a 60 Hz full-wave supply?
13. Power dissipated by a 7805 delivering 1 A from 12 V, and its efficiency?
14. Buck converter duty for 5 V out from 24 V in?
15. Which SMPS topology gives isolation with a single switch?
16. Why does an empty microwave damage the magnetron?
17. AM receiver at 1000 kHz with a 455 kHz IF: local oscillator and image frequency?
18. VSWR 2:1 — what fraction of power is reflected?
19. Telephone loop battery voltage and off-hook current?
20. A 4-pole induction motor is rewound for 50 Hz and run on 60 Hz at the same voltage — what happens to the flux?

> [!success]- Answers
> 1. $E = (4\times0.02\times400\times1500)/(60\times2)$ = **400 V**. 2. Load falls → current falls → flux falls → $N \propto E_b/\Phi$ rises without limit. 3. **1200 rpm**; slip = (1200−1170)/1200 = **2.5%**. 4. $s\,f$ = 0.025 × 60 = **1.5 Hz**. 5. $0.8^2$ = **64%**. 6. Both **1/3** of DOL. 7. $4.44\times60\times500\times0.004$ = **533 V**. 8. When **copper loss = core loss**, at $x = \sqrt{P_{core}/P_{cu}}$. 9. **Open-circuit** test → core loss; **short-circuit** test → copper loss. 10. The core saturates and the secondary develops a **very high voltage** — lethal, winding destroyed; short the secondary first. 11. $1 - 200/240$ = **16.7%**. 12. $1/(120\times1000\,\mu\text{F})$ = **8.3 V pp**. 13. **7 W**; $\eta$ = 5/12 = **42%**. 14. $D = 5/24$ = **0.21**. 15. **Flyback.** 16. The RF is reflected back into the magnetron, which overheats. 17. $f_{LO}$ = **1455 kHz**; image = **1910 kHz**. 18. **11%**. 19. **48 V**, **20–30 mA**. 20. Flux falls to $\Phi \times 50/60$ = **83%** — the motor speeds up 20%, flux drops, torque capability falls.
