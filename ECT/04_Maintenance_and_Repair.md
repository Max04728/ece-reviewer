---
title: Maintenance and Repair — Procedure, Methods, Safety
type: topic
updated: 2026-10-18
---

# 04 — Maintenance and Repair

Syllabus wording: *"Description of the procedures in the maintenance of electrical/electronic equipment"* and *"maintenance and repair"* as a technician function under RA 9292 §5(c).

This block asks **procedure**, not cleverness: what do you do first, what do you measure, what do you record. Answers phrased as a sequence score; answers phrased as intuition usually do not.

## 1. Types of maintenance

| Type | Trigger | Example |
| --- | --- | --- |
| **Preventive** (planned) | Calendar or running hours, before failure | Clean filters, check belt tension, torque terminals, replace worn brushes |
| **Corrective** | After a failure | Replace the failed capacitor and verify the unit |
| **Predictive** (condition-based) | Measured condition trending toward a limit | Vibration analysis, thermography, insulation resistance trending |
| **Deferred** | Known fault, safely postponed | A noisy bearing flagged for next shutdown |

**Preventive maintenance checklist pattern** (the exam expects this shape, not a specific brand):

1. **Visual** — dust, corrosion, discolouration, burnt smell, loose parts, rodent damage, swollen capacitors, cracked insulation.
2. **Clean** — dry air, contact cleaner, IPA; never liquids into a transformer or connector.
3. **Mechanical** — tighten terminals, check fans, belts, bearings, lubrication.
4. **Electrical** — measure supply voltage, insulation resistance, current draw versus nameplate.
5. **Verify and record** — test run, log readings, note the date and the person.

**Thermal and electrical checks are paired:** a loose terminal shows up as heat (thermography) *and* as a voltage drop under load. Either one alone misses faults.

## 2. The troubleshooting procedure

The sequence is the answer.

1. **Verify the complaint.** Confirm the fault yourself; do not repair a rumour. Note when it occurs and under what conditions.
2. **Gather information.** History of the unit, prior repairs, recent power events, what the operator changed.
3. **Analyse.** From the schematic, ask which blocks must work for the symptom to exist.
4. **Isolate.** Narrow to the faulty block, then the faulty component — this is where the methods below apply.
5. **Repair or replace.** Replace with the correct rating; do not substitute a "close enough" part.
6. **Verify.** Restore power, confirm normal operation under **load**, not just at idle.
7. **Document.** What failed, what was done, what to watch.

> [!warning] Trap
> Correct answers skip step 1 and step 6. "Replaced the capacitor" without "verified under load" reads as an incomplete procedure, and examiners mark the sequence.

## 3. Isolation methods

| Method | How it works | When to use |
| --- | --- | --- |
| **Half-split** | Measure at the midpoint of a signal or supply path; the reading tells you which half holds the fault, then split that half | Fastest on long chains — n measurements locate one fault among $2^n$ stages |
| Signal tracing | Follow the signal stage by stage from input toward output with a scope or probe | Dead or distorted channel |
| Signal injection | Feed a known signal into a later stage and work backwards | Audio/RF stages, when tracing forward finds nothing |
| Voltage measurement | Compare expected node voltages against the schematic | Supply rails, bias points |
| Resistance / continuity | With power off, check windings, fuses, switches, traces | Open circuits, blown fuse, broken conductor |
| Current draw | Clamp the load; compare to nameplate | Motor overload, shorted turns, binding mechanics |
| Substitution | Swap in a known-good module | When measurement is inconclusive |
| Comparative | Compare a suspect channel against a working twin channel | Stereo, multi-channel boards |
| Dummy load | Replace the load with a known resistor | Testing a supply without risking the real load |
| Freeze / heat | Cool or warm a suspected part | Intermittent thermal faults |
| Wiggle test | Flex wires and connectors while monitoring | Intermittent connections |

**Current-draw rule of thumb:** a motor drawing well above nameplate FLA is overloaded or has a failing winding; a motor drawing far **below** is not getting voltage or is unloaded.

## 4. Symptom → likely cause

| Symptom | Check in this order |
| --- | --- |
| Dead, no indication | Supply, fuse, breaker, power cord, on/off switch, then the supply rail |
| Dead but fuse good | Primary circuit, standby supply, startup resistor/cap, PWM IC |
| Fuse blows immediately | Short across the line: bridge rectifier, switching FET, MOV, shorted filter cap, motor winding to ground |
| Fuse blows after a while | Overload, thermal, failing filter cap, fan not running |
| Hum, no output (audio) | Power supply filter caps, ground loop, output stage |
| Distorted audio | Coupling cap, bias, output transistor |
| No picture, sound present (TV) | Backlight / inverter, T-con, panel |
| Picture, no sound | Audio stage, speaker, mute circuit |
| Motor hums, will not start | **Start capacitor**, centrifugal switch, seized bearing, low supply voltage |
| Appliance trips breaker | Insulation breakdown to ground — megger it |
| Intermittent | Cold solder joint, connector, cracked trace, thermal fault |
| Overheating | Overload, blocked ventilation, excessive ambient, wrong voltage |

## 5. Soldering and rework

| Item | Standard |
| --- | --- |
| Iron type | Temperature-controlled, **30–60 W** typical for PCB work |
| Tip temperature | **300–370 °C** for leaded solder; higher for lead-free |
| Solder | 60/40 or 63/37 SnPb melts at **183 °C**; SAC305 lead-free at about **217–220 °C** |
| Flux | Rosin / no-clean; flux cleans oxides and helps wetting |
| Tip care | Tin the tip before and after each joint; wipe, never file |
| **Good joint** | Bright, shiny, **concave fillet**, smooth edges, solder flows onto both pad and lead |
| **Cold joint** | Dull, grainy, ball-shaped, cracks — mechanically weak and intermittently conducting |
| Bridge | Solder joins two adjacent pads — remove with wick, do not just drag the iron |
| Overheated pad | Lifted trace, burnt board — heat sink the lead, keep contact short |
| Desoldering | Spring-loaded pump for through-hole, **wick** for flat pads |
| Hot-air rework | **300–400 °C** with airflow; used for SMD; preheat the board to reduce thermal shock |

> [!warning] Trap
> Describing a joint as "good" because it is shiny alone. The exam wants the **fillet**: concave, both surfaces wetted, no voids. And a cold joint is graded by appearance *and* by the fact that it fails intermittently under thermal cycling.

## 6. ESD — electrostatic discharge

- A MOSFET's **gate oxide** is a few tens of nanometres thick and ruptures at tens of volts — far below what a person can feel (the human body carries **100 V to 15 kV** in normal handling).
- Damage may be **latent**: the part works, then fails weeks later.
- Controls: **wrist strap with a 1 MΩ resistor** to ground, grounded work mat, grounded iron, humidity kept at **40–60%**, no synthetic clothing, transport in antistatic bags.
- Handle boards **by the edges**. Never touch pins or the gold fingers.

## 7. Wiring practice

| Item | Point |
| --- | --- |
| Conductor size | AWG; #14 ≈ 15 A, #12 ≈ 20 A, #10 ≈ 30 A (60 °C copper) |
| Termination | Crimped lugs on stranded wire; never solder a termination that is meant to be crimped; no bare conductor outside the terminal |
| Grounding | Green conductor to the grounding electrode; the ground is a **safety** path, never a current-carrying return |
| Polarity | White neutral, black/red/blue phase |
| Support | Cable ties and clamps so joints carry no tension |
| Identification | Ferrule or label both ends before pulling a cable |

**Ground fault:** current reaching earth through an unintended path. A **GFCI** trips at roughly **5 mA** of imbalance — it protects people, while a breaker protects wiring.

## 8. Electrical safety

Body current thresholds (AC, 60 Hz):

| Current | Effect |
| --- | --- |
| ~1 mA | Threshold of perception |
| 10–16 mA | **Let-go threshold** — cannot release the conductor |
| 20–30 mA | Respiratory arrest |
| 50–100 mA | **Ventricular fibrillation** — lethal |

Rules that follow from that table:

- **Discharge capacitors** through a resistor before touching a supply board. The HV section of a microwave or the flyback of a CRT holds a charge long after unplugging.
- **One-hand rule**: keep one hand in your pocket while probing live circuits so current cannot cross the chest.
- **Lockout/tagout** the supply, verify dead with a meter **on the same point you will touch**, and never trust a switch.
- PPE: safety glasses, insulating gloves, insulated tools, no jewellery or watch.
- Work on equipment you can isolate. If you cannot isolate it, do not put your hands in it.

## 9. Documentation and records

| Record | Contents |
| --- | --- |
| Service report | Unit, serial, complaint, measurements, parts replaced, technician, date |
| Preventive maintenance log | Date, items checked, readings, next due |
| **Calibration record** | Instrument, certificate, due date — typically **12 months** |
| Spare parts / inventory | Ratings, quantities, reorder point |
| History | Every repair on one sheet — the pattern exposes repeat failures |

An instrument with lapsed calibration invalidates every measurement you took with it. That is the point of the record.

---

## Recall test

1. Name the four types of maintenance.
2. State the first and last steps of the troubleshooting procedure.
3. Half-split across 16 stages — how many measurements to find one fault?
4. Motor hums and will not start: name the two first suspects.
5. What distinguishes a good solder joint from a cold one?
6. Melting point of 60/40 solder, and of SAC305 lead-free?
7. What resistance is in a proper wrist strap, and why not zero?
8. At roughly what current does a person lose the ability to let go?
9. A GFCI trips at what imbalance current?
10. How often is a test instrument typically calibrated?

> [!success]- Answers
> 1. Preventive, corrective, predictive, deferred. 2. First: **verify the complaint**; last: **document**. (Verification under load comes just before.) 3. **Four** — $2^4 = 16$. 4. **Start capacitor** and the **centrifugal switch** (also check bearing and supply). 5. Good = bright, smooth, **concave fillet** wetting both surfaces; cold = dull, grainy, balled, intermittent. 6. **183 °C** and **217–220 °C**. 7. **1 MΩ** — high enough to limit current if you touch a live conductor, low enough to bleed static. 8. **10–16 mA**. 9. About **5 mA** of imbalance. 10. Typically every **12 months**.
