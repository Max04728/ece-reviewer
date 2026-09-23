---
id: ECE-07-16
title: "Ladder Logic, Timers and Counters"
part: "02_Electronics_Engineering"
area: "07_Industrial_Automation_and_Sensors"
topic: 16
tier: 2
depth: full
problem_count: 4
prereqs: ["[[15_PLC_Architecture_and_Scan_Cycle]]"]
tags: ["ece", "electronics_engineering", "industrial_automation_and_sensors"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 16 — Ladder Logic, Timers and Counters

> [!abstract] Scope
> Read and write relay ladder logic — contacts, coils, seal-in circuits, interlocks, timers and counters — and know exactly when each timer and counter changes state.

## Core Concept

> [!tip] Intuition
> Ladder logic is a relay panel drawn as a circuit: power flows left to right through contacts when they are closed, and anything it reaches energizes. The PLC keeps the drawing but replaces the wires with memory bits, which is why the same rung can be read as a Boolean equation.

**Rungs, contacts and coils.** A rung is a Boolean expression evaluated left to right between the left power rail and the right rail. An XIC (examine if closed) contact passes power when its bit is 1, an XIO (examine if open) contact passes power when its bit is 0, and an OTE (output energize) coil writes its bit equal to the rung condition at the end of the scan. Because the OTE writes the bit once per scan, a coil addressed twice in the same program is a classic bug: the last rung wins, and the earlier logic appears to do nothing. A seal-in (latching) circuit keeps a momentary start button effective after it is released by putting a contact of the output in parallel with the start contact, with a normally-closed stop contact in series — $Q = (\mathrm{Start} + Q)\cdot\overline{\mathrm{Stop}}$ — and an interlock is the same construction with the enabling condition of another device placed in series, so the hardware state, not the HMI, decides whether an output may run.

**Timers.** A TON (timer on-delay) starts accumulating time when its rung condition goes true, and sets its done bit when the accumulated value reaches the preset; when the rung goes false, the accumulated value resets to zero. A TOF (timer off-delay) sets its done bit immediately when the rung goes true and holds it for the preset time after the rung goes false, which makes it the standard way to keep a cooling fan or a brake running after the command is removed. An RTO (retentive timer on) behaves like a TON except that it *retains* its accumulated value when the rung goes false, and only a RES instruction clears it — the right choice for accumulating run hours. All three expose status bits that the program must use correctly: the enable bit follows the rung, the timing bit is true while the timer is counting, and the done bit is the one that drives the output. Preset values are entered in time-base units — a preset of 100 on a 10 ms base is 1.0 s — so the base must be checked before believing a number.

**Counters and cascading.** A CTU (count up) increments its accumulated value on each *rising edge* of its rung condition and sets its done bit when the accumulated value reaches the preset; a CTD (count down) decrements on each rising edge and sets done when the accumulated value reaches zero, and the two are often paired on the same counter so that a position or a part count can move in both directions. Because the input is edge-triggered, a maintained signal produces exactly one count no matter how long it is held — and a pulse shorter than the scan time produces none at all. A RES instruction clears the accumulated value. Large times and counts are built by cascading: two timers in series whose done bits feed each other give the sum of their presets, and a counter clocked by a timer's done bit multiplies the two values, which is how long wash cycles and large production counts are made. Cascading is the standard workaround for preset limits, and it multiplies the accumulated timing error along with the total, since each timer is only accurate to about one scan.

**Retentive versus non-retentive data.** Whether a value survives a power cycle depends on where it lives. Timer and counter accumulated values, setpoints and machine positions must be placed in retentive memory (backed by a battery or a supercapacitor, or written to non-volatile storage by the program) if the machine must resume where it stopped; ordinary output and internal bits are cleared at power-up so that the machine restarts in a known state. This is why a machine that uses RTO for run hours and retentive counters for batch quantities can resume after a power failure, while a machine built entirely from TON and CTU timers silently loses its progress. The programming languages are standardized by IEC 61131-3 (ladder diagram, function block diagram, structured text, instruction list and sequential function chart) and the timer and counter instructions above exist in every vendor's dialect, generally with the same XIC/XIO/OTE naming and the same TON/TOF/RTO/CTU/CTD behaviour.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| TON on-delay timer | $\mathrm{TON}:\ Q = 1\ \mathrm{when}\ IN = 1\ \mathrm{and}\ ET \geq PT$ | Accumulated value resets to zero whenever IN goes false, so a TON cannot accumulate over interruptions - use RTO for that. |
| TOF off-delay timer | $\mathrm{TOF}:\ Q = 0\ \mathrm{after}\ ET \geq PT\ \mathrm{following}\ IN \rightarrow 0$ | Q is true immediately when IN goes true, and stays true for the preset time after IN goes false; used for run-on fans and brakes. |
| RTO retentive timer | $\mathrm{RTO}:\ ET\ \mathrm{accumulates;}\ ET \rightarrow 0\ \mathrm{only\ on\ RES}$ | Retains its accumulated value through power loss only if the retentive data area is battery-backed; used for run-hour totals. |
| CTU count-up counter | $\mathrm{CTU}:\ ACC \rightarrow ACC + 1\ \mathrm{on\ rising\ edge;}\ DN = 1\ \mathrm{when}\ ACC \geq PRE$ | Edge triggered, so a maintained input counts once. A pulse shorter than the scan time is missed entirely. |
| CTD count-down counter | $\mathrm{CTD}:\ ACC \rightarrow ACC - 1\ \mathrm{on\ rising\ edge;}\ DN = 1\ \mathrm{when}\ ACC \leq 0$ | Often paired with a CTU on the same counter to give a reversible position or inventory count. |
| Timer preset conversion | $t = PT \times T_{base}$ | A preset of 100 on a 10 ms base is 1.0 s, but 100 on a 1 s base is 100 s; check the base before reading the number. |
| Cascaded timer total | $T_{total} = PT_1 + PT_2 + \cdots + PT_n$ | Series-connected timers extend the range beyond one preset limit; the accumulated error also adds, about one scan per timer. |
| Seal-in (latch) equation | $Q = (\mathrm{Start} + Q)\cdot\overline{\mathrm{Stop}}$ | The output contact in parallel with the start contact holds the rung in; the stop contact must be in series or the latch cannot be broken. |

## Interactive Widget

**Ladder Logic Simulator**

![[Ladder_Logic_Simulator.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A TON timer has a $10\ \mathrm{ms}$ time base and a preset of 250, and its rung condition is true for $2.0\ \mathrm{s}$. Find the preset time, the accumulated value when the rung goes false, and what changes if the rung stays true.

**Given:** time base = 10 ms; PT = 250; rung true for 2.0 s; scan = 12 ms

**Solution:**

1. Preset time = PT x base = 250 x 10 ms = 2.5 s
2. The rung is true for only 2.0 s, so ET reaches 2.0 s and the done bit never sets
3. When the rung goes false the TON resets ET to zero
4. If the rung stays true, DN sets when ET reaches 2.5 s, i.e. within one scan (about 12 ms) of the preset

> [!success]- Answer
> **Preset $2.5\ \mathrm{s}$; after $2.0\ \mathrm{s}$ the timer has not finished and resets to zero when the rung drops. With a longer rung it times out at $2.5\ \mathrm{s} \pm 1$ scan.**

> [!warning] Trap
> Reading the preset as 250 seconds, or as 250 ms. The preset is in time-base units, so 250 on a 10 ms base is 2.5 s; and a TON discards its accumulated time the moment its rung goes false.

### P2. A seal-in circuit implements $Q = (\mathrm{Start} + Q)\cdot\overline{\mathrm{Stop}}$. Trace the value of $Q$ through four scans in which Start is 1 for the first scan only and Stop is 1 in the fourth scan.

**Given:** scan 1: Start = 1, Stop = 0; scan 2: Start = 0, Stop = 0; scan 3: Start = 0, Stop = 0; scan 4: Start = 0, Stop = 1

**Solution:**

1. Scan 1: Q = (1 + 0) x 1 = 1, so the output seals in
2. Scan 2: Q = (0 + 1) x 1 = 1, held by its own contact
3. Scan 3: Q = (0 + 1) x 1 = 1, still held
4. Scan 4: Q = (0 + 1) x 0 = 0, and the latch releases

> [!success]- Answer
> **$Q$ goes 1, 1, 1, 0 — the momentary start is captured and the output remains on until the stop contact opens.**

> [!warning] Trap
> Putting the stop contact in parallel with the start contact instead of in series. The equation becomes $Q = \mathrm{Start} + Q + \overline{\mathrm{Stop}}$, which is permanently true once started, so the output can never be turned off.

### P3. A wash cycle needs 60 minutes, but the timer's preset limit is 32767 counts. Find the preset for a $100\ \mathrm{ms}$ base, decide whether cascading is needed, and compute the accumulated timing error with a $12\ \mathrm{ms}$ scan.

**Given:** required time = 60 min = 3600 s; preset limit = 32767; time base = 100 ms; scan = 12 ms

**Solution:**

1. Counts needed = 3600 s/0.1 s = 36000, which exceeds the 32767 limit
2. Cascade two timers: PT1 = 18000 and PT2 = 18000 counts, each 1800 s = 30 min
3. Total = 1800 + 1800 = 3600 s = 60 min
4. Each timer is accurate to about one scan, so the cascaded error is up to 2 x 12 = 24 ms

> [!success]- Answer
> **Two cascaded timers with $PT = 18000$ on a $100\ \mathrm{ms}$ base give $60\ \mathrm{min}$, with up to $24\ \mathrm{ms}$ of accumulated error.**

> [!warning] Trap
> Entering 36000 into a 16-bit preset, which overflows or is rejected. Cascading adds the preset times *and* the errors, so each timer contributes about one scan of inaccuracy.

### P4. A CTU counts finished parts with $PRE = 500$ and the line runs at $120\ \mathrm{parts/min}$. Find the time between counts, the time to complete one batch, and the number of batches needed for a 12000-part order.

**Given:** PRE = 500 counts; rate = 120 parts/min; order = 12000 parts; scan = 12 ms

**Solution:**

1. Part rate = 120/60 = 2 parts/s, so the pulse period is 0.5 s
2. 0.5 s is far longer than the 12 ms scan, so the counter sees every part reliably
3. Time per batch = 500/2 = 250 s = 4 min 10 s
4. Batches for 12000 parts = 12000/500 = 24
5. A RES instruction clears ACC after each batch; the counter's DN bit increments a batch counter

> [!success]- Answer
> **One count every $0.5\ \mathrm{s}$, one batch every $250\ \mathrm{s}$, and $24$ batches for the order.**

> [!warning] Trap
> Assuming a counter can be reset by removing the rung condition. A CTU retains its accumulated value until a RES instruction executes; only the RES (or a power cycle of non-retentive memory) clears it.

## Traps & Exam Notes

- **Addressing the same coil from two rungs.** An OTE writes its bit once per scan, so the last rung evaluated wins and the earlier logic is silently overridden. Use separate bits and combine them, or a set/reset (OTL/OTU) pair.
- **Placing the stop contact in parallel with the start contact.** The seal-in branch then keeps the output energized through the stop button and the circuit cannot be turned off; the stop must be in series with the whole latch ($Q = (\mathrm{Start}+Q)\overline{\mathrm{Stop}}$).
- **Expecting a TON to keep timing through interruptions.** A TON resets its accumulated value the moment its rung goes false; only an RTO retains it, and only if the retentive area is backed up.
- **Reading the preset without the time base.** Preset values are in time-base units: 100 means 1.0 s on a 10 ms base but 100 s on a 1 s base, a 100-fold error that looks like a working timer.
- **Feeding a counter a level instead of an edge.** CTU and CTD count rising edges, so a maintained signal counts once and a pulse shorter than the scan time counts zero times; fast events need a high-speed counter.

## See Also

- [[15_PLC_Architecture_and_Scan_Cycle]]
- [[13_ADC_Architectures_and_Quantization]]

---

[[15_PLC_Architecture_and_Scan_Cycle|⬅ 15]] · [[_MOC_Industrial_Automation_and_Sensors|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
