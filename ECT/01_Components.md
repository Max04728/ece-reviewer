---
title: Components — Identification, Codes, Pinouts
type: topic
updated: 2026-10-18
---

# 01 — Components

The single largest technical block on the ECT paper, and the one most likely to be asked as a picture: *what is this symbol*, *what is this value*, *which pin is the emitter*, *which terminal is the cathode*.

> [!tip] The exam shape
> Nearly every component item is one of five questions: **(a)** name the component from a symbol or photo, **(b)** read its marked value, **(c)** state its function, **(d)** identify a terminal or polarity, **(e)** say what happens when it fails.

## 1. Resistors

### Color code — digits

| Color | Digit | Multiplier | Tolerance |
| --- | :---: | :---: | :---: |
| Black | 0 | ×1 | — |
| Brown | 1 | ×10 | ±1% |
| Red | 2 | ×100 | ±2% |
| Orange | 3 | ×1 k | — |
| Yellow | 4 | ×10 k | — |
| Green | 5 | ×100 k | ±0.5% |
| Blue | 6 | ×1 M | ±0.25% |
| Violet | 7 | ×10 M | ±0.1% |
| Grey | 8 | — | — |
| White | 9 | — | — |
| Gold | — | ×0.1 | ±5% |
| Silver | — | ×0.01 | ±10% |
| None | — | — | ±20% |

Mnemonic: **B**ad **B**oys **R**uin **O**ur **Y**oung **G**irls **B**ut **V**iolet **G**ives **W**illingly.

### Reading a resistor

- **4-band**: digit 1, digit 2, multiplier, tolerance. The **tolerance band is separated** and usually gold or silver — read from the other end.
- **5-band** (precision): digit 1, digit 2, digit 3, multiplier, tolerance.
- **6-band**: adds a **temperature-coefficient** band last (brown = 100 ppm/°C).

| Marking | Reading |
| --- | --- |
| brown, black, red, gold | 1 0 ×100 = **1 kΩ ±5%** |
| yellow, violet, orange, silver | 47 ×1 k = **47 kΩ ±10%** |
| red, red, brown, gold | 22 ×10 = **220 Ω ±5%** |
| green, blue, black, brown, brown | 560 ×1 = **560 Ω ±1%** |
| red, red, black, brown, brown | 220 ×10 = **2.2 kΩ ±1%** |

> [!warning] Trap
> Reading the multiplier band as a digit. In `brown black red gold`, the second black is **zero**, not "no multiplier": 10 × 100 = 1 kΩ, not 1.2 Ω. And in a 5-band resistor the third band is always a digit — `red red black brown` is 220 ×10, not 22 ×10.

### SMD resistor codes

| Code | Meaning |
| --- | --- |
| 103 | 10 × 10³ = **10 kΩ** |
| 472 | 47 × 10² = **4.7 kΩ** |
| 220 | 22 × 10⁰ = **22 Ω** |
| 1000 (4-digit) | 100 × 10⁰ = **100 Ω** |
| 4702 (4-digit) | 470 × 10² = **47 kΩ** |
| R47 | **0.47 Ω** (R is the decimal point) |
| 4R7 | **4.7 Ω** |

Rule: the **last digit is the number of zeros**, not a value. `103` is not 103 Ω.

### The resistor family

| Device | What it is | Where it appears |
| --- | --- | --- |
| Fixed resistor | Set value | Everywhere |
| **Potentiometer** | 3 terminals, wiper moves over the whole track | Volume, tone, level set |
| **Trimmer** | Small preset pot, screwdriver adjusted, set and forget | Calibration, bias |
| **Rheostat** | 2 terminals — wiper and one end only | Current limiting, lamp dimming, motor speed |
| Wirewound | High power, low value | Loads, heaters, emitter resistors |
| **Thermistor** | Resistance changes with temperature | Temperature sensing/compensation |
| **Varistor (MOV)** | High resistance normally, drops sharply at its clamp voltage | Surge protection across the line |
| LDR | Resistance falls as light rises | Light sensing, night switches |
| Shunt resistor | Very low value, used to sense current | Power supplies, battery monitoring |

**Thermistor direction is a standard trap:**

- **NTC** (negative temperature coefficient) — heat it, resistance **falls**. The common one; used as an inrush limiter and a temperature probe. *Most board thermistors are NTC.*
- **PTC** — heat it, resistance **rises**. Used as a self-resetting protector.

**Varistor failure mode:** after enough surges it fails **short**, which blows the line fuse. A dead appliance with a good fuse usually has a good varistor.

## 2. Capacitors

### Marked value

Three digits: **first two = value in pF, third = number of zeros**, result in pF.

| Marked | pF | Convenient form |
| --- | ---: | --- |
| 101 | 100 pF | 100 pF |
| 103 | 10 000 pF | 10 nF = 0.01 µF |
| **104** | 100 000 pF | **0.1 µF** |
| 223 | 22 000 pF | 22 nF = 0.022 µF |
| 474 | 470 000 pF | **0.47 µF** |
| 105 | 1 000 000 pF | 1 µF |

Tolerance letters: **F** = ±1%, **G** = ±2%, **J** = ±5%, **K** = ±10%, **M** = ±20%.

Also marked: **voltage rating** (never exceed — a 16 V cap on a 25 V rail fails short) and, on electrolytics, polarity.

### Types and behaviour

| Type | Polarity | Notes / failure mode |
| --- | --- | --- |
| Ceramic | Non-polar | Small, low ESR, good at high frequency. Cracks and fails short |
| Film (polyester/polypropylene) | Non-polar | Stable, used in filters and timing |
| **Electrolytic (aluminium)** | **Polarized** | Large values, has ESR, **dries out with age** → bulge, leak, capacitance loss. The classic "no power / hum / unstable" fault |
| Tantalum | **Polarized** | Compact, low ESR, **fails short** violently if reverse-biased |
| Variable / trimmer | Non-polar | Tuning, compensation |
| **Varicap / varactor** | — | A *diode* whose capacitance varies with reverse bias — not a capacitor factory part |

**Reading polarity:** the **negative** side is marked — a stripe with minus signs, or the shorter lead on a radial part. Reversing an electrolytic is a guaranteed failure.

**Series and parallel are the opposite of resistors:**

$$C_{\text{series}} = \frac{C_1 C_2}{C_1 + C_2} \qquad C_{\text{parallel}} = C_1 + C_2$$

> [!warning] Trap
> Applying the resistor rule. Capacitors **add in parallel** and combine by product-over-sum **in series**. Voltage rating in series adds (if balanced); in parallel it does not — the lowest-rated cap sets the limit.

## 3. Inductors and transformers

- Unit: **henry (H)**, millihenry (mH), microhenry (µH).
- Colour bands read like a resistor but the result is in **µH**.
- Core types: air (RF), ferrite (high frequency, supplies), laminated iron (mains transformers).
- Opposition to change of current: $V = L\,di/dt$. An inductor **opposes a sudden current change** and can generate a large back-EMF when a coil is switched off — the reason for a **freewheeling diode across a relay coil**.
- Continuity test: a good winding reads a few ohms to a few hundred ohms; **open = infinite**, and a shorted turn reads far too low.

**Transformer parts:** primary, secondary, core. Symbols show two coils with or without a core line. A **centre-tapped** secondary shows a third terminal at the middle.

## 4. Diodes

**Identification: the band marks the CATHODE (the bar of the symbol).** Current flows band-*less* to band: anode → cathode.

| Type | Symbol cue | Function | Typical drop |
| --- | --- | --- | --- |
| Rectifier | Plain triangle-bar | AC → DC | 0.7 V Si, 0.3 V Ge |
| **Zener** | Bar with bent ends (Z shape) | Regulates — operates in **reverse breakdown** at $V_Z$ | $V_Z$ (e.g. 5.1 V, 12 V) |
| **LED** | Arrows pointing away | Emits light | 1.8–3.4 V |
| Schottky | Bar with S-shaped ends | Fast, low drop | 0.3 V |
| **Varactor** | Capacitor symbol in the diode | Voltage-variable capacitance (tuning) | — |
| Photodiode | Arrows pointing **in** | Light → current | — |
| Bridge rectifier | Four diodes in a diamond/block | Full-wave rectification in one package | 2 × 0.7 V per path |

**Bridge block markings:** the two **AC** terminals are marked `~` or `AC` on opposite corners; the remaining two are **+** and **−**.

**Testing with a DMM on diode mode (power off):**

| Measurement | Good silicon diode |
| --- | --- |
| Forward (red to anode, black to cathode) | 0.5–0.7 V |
| Reverse | `OL` / open |
| Both directions conduct | **Shorted** |
| Neither conducts | **Open** |

> [!warning] Trap
> A meter in diode mode can show a **false reading on a diode still in circuit** — a parallel path conducts around it. Lift one leg before condemning a diode, and expect in-circuit readings to be low.

## 5. Transistors

### BJT pinouts — E, B, C

| Package | Common parts | Pin order (looking at the **front**, leads down) |
| --- | --- | --- |
| TO-92 | 2N3904, 2N3906 | **E B C** |
| TO-92 | BC547, BC548 | **C B E** |
| TO-220 | 2N3055, TIP series | **B C E** (tab is collector) |
| TO-3 | 2N3055 (metal) | Case = **collector**, two pins = E and B |
| SOT-23 | SMD | Pin 1 = base, pin 3 = collector, pin 2 = emitter (most types) |

**NPN vs PNP:** the arrow on the emitter.

- **NPN** — arrow points **out** (Not Pointing iN). Emitter at the more negative potential. Turns on with base **above** emitter by ~0.7 V.
- **PNP** — arrow points **in**. Emitter at the more positive potential. Turns on with base **below** emitter by ~0.7 V.

Gain: $I_C = \beta I_B$, and $I_E = I_C + I_B$. β (hFE) typically 100–300 for small-signal parts.

**Testing:** a BJT is two diodes back-to-back through the base. From base to emitter and base to collector it conducts one way only, matching the type. Any other pattern = defective.

### FETs

| Type | Terminals | Turn-on | Note |
| --- | --- | --- | --- |
| JFET | **D**rain, **G**ate, **S**ource | Gate-source reverse bias | Depletion — conducts at $V_{GS}=0$ |
| MOSFET (enhancement) | **D**rain, **G**ate, **S**ource | $V_{GS}$ above threshold | Gate is **insulated** — destroyed by static |

A MOSFET's gate must never be left floating, and it is the component most easily killed by handling. Always check it after a supply failure.

## 6. Integrated circuits

| Package | Identification |
| --- | --- |
| **DIP** | Pin 1 at the **notch or dot**; count **counter-clockwise** from pin 1 viewed from the top |
| SOIC / SOP | Dot or bevelled edge marks pin 1 |
| QFP / TQFP | Corner dot; pins on four sides |
| BGA | No visible pins; ball grid underneath, identified by a corner marking |

Common parts worth recognising: **78xx / 79xx** (fixed positive / negative regulators), **LM317** (adjustable), **NE555** (timer), **LM741 / LM358** (op-amp), **7805 in a supply = 5 V rail**.

## 7. Protection and switching devices

| Device | Function | Reset behaviour |
| --- | --- | --- |
| **Fuse** | Melts to open the circuit at its rated current | One-shot — must be replaced |
| **Circuit breaker** | Thermal-magnetic trip | **Resettable** |
| Thermal fuse / cutout | One-shot over-temperature protection | One-shot |
| **Relay** | Coil-operated electromagnetic switch | — |
| **Contactor** | Heavy-duty relay with arc suppression | — |
| Reed switch | Sealed contacts close in a magnetic field | — |
| Thermostat | Bimetallic strip opens/closes on temperature | Auto or manual reset |
| Limit switch | Mechanically actuated by a moving part | — |

**Relay terminology:** the **coil** is the control input; contacts are **COM** (common, the moving armature), **NO** (normally open — closes when energised) and **NC** (normally closed — opens when energised).

**Never confuse the coil rating with the contact rating.** A 12 V coil relay may switch 10 A at 250 V AC — the coil voltage has nothing to do with the load it can carry.

**Fuse markings:** current rating, voltage rating, and speed — **F** (fast-blow) or **T** (time-lag / slow-blow). A motor circuit needs a time-lag fuse because of inrush current. Replacing a slow-blow with a fast-blow causes nuisance blowing; replacing a fuse with a **higher-rated one** destroys the protection and is a fire hazard.

## 8. Sensors

| Sensor | Senses | Output |
| --- | --- | --- |
| Thermocouple | Temperature | Small mV (µV/°C), needs cold-junction compensation |
| RTD (Pt100) | Temperature | Resistance rises with temperature, ~0.385 Ω/°C |
| Thermistor | Temperature | Large resistance change (NTC falls with heat) |
| LDR | Light | Resistance falls with light |
| Photodiode / phototransistor | Light | Current / switched current |
| Hall effect | Magnetic field | Voltage, used in clamp meters and brushless motors |
| Piezoelectric | Vibration, pressure, sound | Charge/voltage |
| Strain gauge | Mechanical strain | Resistance change, in a Wheatstone bridge |
| Ultrasonic | Distance | Time of flight |
| IR receiver | Remote control codes | Demodulated pulses |

## 9. Standard symbols — the picture questions

| Symbol | Component |
| --- | --- |
| Zigzag or rectangle | Resistor |
| Two parallel lines | Capacitor; one curved plate = **polarized** |
| Coil of bumps | Inductor; two coils = transformer |
| Triangle + bar | Diode; bar with bent ends = **Zener**; arrows out = **LED** |
| Circle with 3 leads, arrow on emitter | Transistor (arrow out = NPN, in = PNP) |
| Triangle | Amplifier / op-amp |
| Two overlapping circles | Transformer winding |
| Circle with `~` | AC source |
| Long/short parallel lines | Battery (long = positive) |
| Chassis/earth lines | Ground |
| Break with an arrow | Variable (pot, variable cap) |
| Circle with an X | Lamp |

> [!warning] Trap
> The **polarized capacitor symbol** has one curved plate — students read it as a variable capacitor. Variable is a straight plate with a diagonal arrow through it.

---

## Recall test

Answer before opening the answers.

1. brown, black, orange, gold — what value and tolerance?
2. What is an SMD resistor marked `472`?
3. NTC thermistor: does its resistance rise or fall when heated?
4. Capacitor marked `104` — value in µF?
5. Which marked band on a diode is the cathode?
6. A diode reads 0.6 V forward and 0.6 V reverse on diode mode. Verdict?
7. TO-92 transistor marked 2N3904: pin 1, 2, 3 left to right, flat side facing you?
8. NPN: does the emitter arrow point in or out?
9. Relay terminals: which one is the moving armature?
10. What is the one difference between a circuit breaker and a fuse that matters in service work?

> [!success]- Answers
> 1. 1 0 ×1 k = **10 kΩ ±5%**. 2. 47 × 10² = **4.7 kΩ**. 3. **Falls** — NTC, negative coefficient. 4. 100 000 pF = **0.1 µF**. 5. The **banded** end. 6. **Shorted** — it must block one way. 7. **E B C**. 8. **Out** (Not Pointing iN). 9. **COM** — the common terminal. 10. The breaker is **resettable**, the fuse is **one-shot and must be replaced** — and never with a higher rating.
