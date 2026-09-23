---
id: ECE-08-11
title: "Flip-Flop Timing, Setup and Hold"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 11
tier: 2
depth: full
problem_count: 5
prereqs: ["[[10_Latches_and_Flip-Flops]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 11 — Flip-Flop Timing, Setup and Hold

> [!abstract] Scope
> Compute maximum clock frequency from setup, hold and propagation delays, and check hold-time and skew margins.

## Core Concept

> [!tip] Intuition
> Data leaves one flip-flop, travels through combinational logic, and must arrive at the next flip-flop neither too late (setup) nor too early (hold). The clock period is bought and spent by those two constraints.

**The three numbers that define a flip-flop.** Setup time $t_{su}$ is how long the data input must be stable **before** the clock edge; hold time $t_h$ is how long it must stay stable **after** the edge; propagation delay $t_{pd}$ (also called clock-to-Q) is how long the output takes to respond to the edge afterwards. A real device also has a contamination delay $t_{cd}$, the *minimum* time before the output can possibly change, which is what the hold check uses. Datasheets give $t_{pd}$ as the average of the high-to-low and low-to-high delays, and often list minimum (contamination) and maximum values separately.

**The setup constraint sets the maximum frequency.** In a single-clock synchronous system, one clock period must accommodate the launching flip-flop's clock-to-Q delay, the slowest path through the combinational logic, and the receiving flip-flop's setup time: $T_{clk} \ge t_{pd,FF} + t_{pd,comb,max} + t_{su}$. The maximum frequency is therefore:
$$f_{max} = 1/(t_{pd,FF} + t_{pd,comb} + t_{su})$$
The value of $t_{pd,comb}$ is the **maximum** path delay, because the critical path is what fails first. With 8 ns clock-to-Q, 12 ns of logic and 4 ns setup, the period is 24 ns and $f_{max}$ is about 41.7 MHz.

**The hold constraint is a minimum-time check.** Data launched by one edge must not arrive at the next flip-flop so fast that it destroys the value that flip-flop is trying to hold at the *same* edge: $t_{cd,FF} + t_{cd,comb,min} \ge t_h$. This check uses contamination (minimum) delays, not maximum ones, which is why reaching for the worst-case $t_{pd}$ here gives the wrong answer. Hold violations cannot be fixed by slowing the clock — the race is edge-relative — so the fix is to add delay to the offending short path or to increase $t_{cd}$.

**Clock skew eats into the budget.** Skew is the difference in arrival time of the same clock edge at two flip-flops. If the receiving clock arrives late (positive skew relative to the launcher) the data has less time, and the setup equation becomes $T_{clk} \ge t_{pd,FF} + t_{pd,comb} + t_{su} + t_{skew}$; $f_{max}$ drops accordingly. Skew in the other direction helps setup but tightens hold. Clock trees, buffer matching and low-skew routing exist precisely to keep this number small, and the two constraints must always be evaluated together.

**Metastability, duty cycle and pulse width.** If setup or hold is violated, the flip-flop's internal latch can hang between the two logic levels for an unbounded time — metastability — producing a slow, undefined output and possibly an inconsistent result downstream. The standard cure is a synchroniser (two flip-flops in series) plus enough resolution time for the MTBF to be acceptable. Separately, a clock has a duty cycle $t_{high}/T$ and a minimum pulse width; a flip-flop that needs a 6 ns high pulse fails on a 35% duty 20 ns clock whose high time is only 7 ns, even though the period is comfortable.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Maximum clock frequency | $f_{max} = \frac{1}{t_{pd,FF} + t_{pd,comb} + t_{su}}$ | Single-clock system, no skew. Use the maximum combinational path delay. |
| Setup condition | $T_{clk} \ge t_{pd,FF} + t_{pd,comb,max} + t_{su}$ | Must hold for the slowest path. Violation means the data arrives after the edge. |
| Setup condition with skew | $T_{clk} \ge t_{pd,FF} + t_{pd,comb,max} + t_{su} + t_{skew}$ | Positive skew is the receiving clock arriving later than the launching clock. |
| Hold condition | $t_{cd,FF} + t_{cd,comb,min} \ge t_h$ | Uses minimum (contamination) delays. Violation means the data changes too soon after the edge. |
| Propagation delay from rise and fall | $t_{pd} = \frac{t_{PHL} + t_{PLH}}{2}$ | Datasheets quote both edges; the maximum is the one that matters for setup. |
| Maximum combinational delay for a target frequency | $t_{pd,comb} \le T_{clk} - t_{pd,FF} - t_{su} (- t_{skew})$ | The budget left for logic after the flip-flops take their share. |
| Duty cycle | $\mathrm{duty} = \frac{t_{high}}{T}\times 100\%$ | A minimum pulse width may fail even when the period is long enough. |
| Metastability MTBF | $\mathrm{MTBF} \propto \frac{e^{t_r/\tau}}{f_{clk}\,f_{data}}$ | Grows exponentially with the resolution time t_r. Always quoted per synchroniser, not per flip-flop. |
| Clock period from frequency | $T = \frac{1}{f}$ | 50 MHz gives 20 ns. Convert before adding delays in nanoseconds. |

## Interactive Widget

**Flip Flop Timing Waveform**

![[Flip_Flop_Timing_Waveform.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A flip-flop has $t_{pd,FF}=8$ ns, the combinational logic between flip-flops has a maximum delay of 12 ns, and the receiving flip-flop has $t_{su}=4$ ns. Find the maximum clock frequency.

**Given:** t_pd,FF = 8 ns; t_pd,comb = 12 ns; t_su = 4 ns

**Solution:**

1. Minimum period = t_pd,FF + t_pd,comb + t_su
2. = 8 ns + 12 ns + 4 ns = 24 ns
3. f_max = 1 / 24 ns = 1 / (24e-9) Hz
4. = 41.67 MHz

> [!success]- Answer
> **$f_{max} = 41.67$ MHz**

> [!warning] Trap
> Omitting the setup time or the clock-to-Q delay and using only the logic delay, which inflates the answer to 83 MHz. Every term in the loop must be counted.

### P2. For the same circuit, the receiving flip-flop's clock arrives 2 ns later than the launching flip-flop's clock. Recompute $f_{max}$.

**Given:** t_pd,FF = 8 ns; t_pd,comb = 12 ns; t_su = 4 ns; skew = +2 ns

**Solution:**

1. Positive skew reduces the time available for data
2. Minimum period = 8 + 12 + 4 + 2 = 26 ns
3. f_max = 1 / 26 ns = 38.46 MHz

> [!success]- Answer
> **$f_{max} = 38.46$ MHz, down from 41.67 MHz**

> [!warning] Trap
> Subtracting the skew because 'the clock arrives later, so there is more time'. Late at the capture flip-flop means less time for the data to arrive, so skew is added to the period.

### P3. Check the hold condition for a path with $t_{cd,FF}=2$ ns, $t_{cd,comb}=1.5$ ns and $t_h=3$ ns. What if the receiving flip-flop instead has $t_h=4$ ns?

**Given:** t_cd,FF = 2 ns; t_cd,comb = 1.5 ns; t_h = 3 ns, then 4 ns

**Solution:**

1. Minimum data arrival = t_cd,FF + t_cd,comb = 2 + 1.5 = 3.5 ns after the edge
2. Requirement: this must be at least t_h
3. 3.5 ns >= 3 ns, so the hold margin is 0.5 ns and the path is legal
4. With t_h = 4 ns: 3.5 ns < 4 ns, so the path violates hold by 0.5 ns
5. Fix: add at least 0.5 ns of minimum delay (buffer or routing) to the short path

> [!success]- Answer
> **Legal with $t_h=3$ ns (margin $+0.5$ ns); violates by 0.5 ns with $t_h=4$ ns**

> [!warning] Trap
> Using the maximum propagation delay for the hold check. Hold is a race between the shortest data path and the same clock edge, so the contamination (minimum) delays are the correct numbers.

### P4. A 50 MHz clock has a high time of 7 ns. Find the duty cycle and decide whether a flip-flop with a minimum high pulse width of 6 ns is satisfied.

**Given:** f = 50 MHz; t_high = 7 ns; min pulse width = 6 ns

**Solution:**

1. Period T = 1 / 50 MHz = 20 ns
2. Duty cycle = 7 ns / 20 ns = 0.35 = 35%
3. The high pulse lasts 7 ns, which is greater than the 6 ns minimum
4. So the device is within its pulse-width specification despite the 35% duty cycle

> [!success]- Answer
> **Duty cycle 35%; the 7 ns pulse satisfies the 6 ns minimum**

> [!warning] Trap
> Judging a clock by its frequency alone. A 50 MHz clock sounds comfortable, but a skewed duty cycle reduces the high time, and pulse-width limits are absolute time limits, not fractions of the period.

### P5. A design must run at 100 MHz. The flip-flops have $t_{pd,FF}=3$ ns and $t_{su}=2$ ns. What is the largest combinational delay allowed?

**Given:** target f = 100 MHz; t_pd,FF = 3 ns; t_su = 2 ns

**Solution:**

1. Available period T = 1 / 100 MHz = 10 ns
2. Setup budget: t_pd,comb <= T - t_pd,FF - t_su
3. = 10 - 3 - 2 = 5 ns
4. So the critical path must be no longer than 5 ns

> [!success]- Answer
> **$t_{pd,comb} \le 5$ ns**

> [!warning] Trap
> Allowing the full 10 ns period for logic. Clock-to-Q and setup time consume half of the budget here, which is typical at high frequencies.

## Traps & Exam Notes

- **Using maximum delays for the hold check.** Hold is checked with contamination (minimum) delays; setup is checked with maximum delays. Swapping them produces answers that are wrong in the optimistic direction.
- **Trying to cure a hold violation by lowering the clock frequency.** The race is measured from the same clock edge, so the period does not enter the hold equation at all. Only added delay or a different flip-flop fixes it.
- **Adding skew with the wrong sign.** Skew that delays the capture clock reduces the setup margin (add it to the period); skew that advances the capture clock helps setup but hurts hold.
- **Forgetting $t_{su}$ inside $f_{max}$.** The equation has three terms. Quoting $1/(t_{pd,FF}+t_{pd,comb})$ overstates the maximum frequency.
- **Mixing units.** Flip-flop delays are quoted in nanoseconds and frequency in megahertz. Convert to a common unit before dividing: 1/24 ns is 41.67 MHz, not 41.67 GHz.
- **Assuming a legal period guarantees correct capture.** Duty cycle and minimum pulse width are separate specifications; a 20 ns period with a 7 ns high time can still violate a 6 ns or 8 ns pulse-width requirement.
- **Ignoring metastability because setup and hold are 'nearly' met.** Any violation, however brief, can leave the latch balanced between levels. Use a two-flip-flop synchroniser and budget resolution time for asynchronous inputs.

## See Also

- [[10_Latches_and_Flip-Flops]]
- [[13_Asynchronous_and_Synchronous_Counters]]
- [[14_Finite_State_Machines]]
- [[16_Logic_Families_TTL_vs_CMOS_and_Interfacing]]

---

[[10_Latches_and_Flip-Flops|⬅ 10]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[12_Shift_Registers|12 ➡]]
