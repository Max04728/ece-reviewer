---
id: ECE-09-08
title: "GPIO and Timer Peripherals"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 8
tier: 2
depth: full
problem_count: 5
prereqs: ["[[06_Interrupts_and_ISRs]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 08 — GPIO and Timer Peripherals

> [!abstract] Scope
> Configure GPIO ports and timer peripherals, and compute tick periods, delays, capture frequencies and debounce values from the prescaler and reload registers.

## Core Concept

> [!tip] Intuition
> A timer is a counter fed through a gearbox. The prescaler is the gear ratio, the counter is the odometer, and the auto-reload register decides when the odometer rolls over.

**GPIO port structure.** Each port has a data register (the output latch), a direction register, and often a set/reset register. The output driver may be push-pull (actively drives high and low) or open-drain (drives only low and relies on an external or internal pull-up, which is how I2C and wired-OR interrupt lines work). Inputs usually pass through a synchroniser and sometimes a Schmitt trigger. Output drive strength, slew rate and internal pull-up/pull-down are all configurable and all matter for signal integrity.

**The read-modify-write hazard.** Reading a port returns the *pin voltage*, not necessarily the output latch. If an external load drags a configured output low, `PORT |= BIT` reads that low, ORs the bit in, and writes the whole byte back — silently turning the pin into an input and corrupting the other seven pins. The fixes are a set/reset register (write a 1 to set or clear without touching the rest) or a shadow copy of the port kept in RAM. This is the single most-tested GPIO trap.

**Bounce and debouncing.** A mechanical switch does not make one clean edge; it chatters for 1–20 ms. An RC filter slows the edge but does not by itself create a clean transition, so it must be followed by a Schmitt-trigger input or a software confirm-after-stable-time routine. Software debouncing samples the pin at a fixed rate and accepts the new state only after $N$ consecutive identical readings.

**Timer anatomy.** A timer is a prescaler feeding a counter. The prescaler divides the peripheral clock; the counter counts up (or down) and rolls over at the auto-reload value, generating an update event and an optional interrupt. The same counter feeds *input capture* (a timestamp latched on an edge, used to measure periods and pulse widths) and *output compare* (toggle or pulse the output when the counter matches, which is how PWM and one-pulse modes are built). Because the prescaler and reload registers are written as `PSC+1` and `ARR+1` divisions, every calculation carries an off-by-one risk.

**Choosing the prescaler.** Resolution and range trade off: at a fixed counter width, a longer maximum delay needs a bigger prescaler, which coarsens the tick. To get both a long delay and fine resolution you cascade a software post-scaler (count update interrupts in a variable) or use a 32-bit timer. The watchdog timer is the same structure with a fatal output: it resets the CPU unless the firmware refreshes it, which detects a hung program rather than measuring time.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Timer tick period | $T_{tick} = \frac{PSC + 1}{f_{clk}}$ | f_clk is the timer's input clock, which is the bus clock times any peripheral prescaler. The +1 is mandatory. |
| Delay to one update event | $T_{delay} = \frac{(ARR + 1)(PSC + 1)}{f_{clk}}$ | Auto-reload (up-counting) mode. The counter takes ARR+1 ticks to go from 0 back to 0. |
| Maximum delay | $T_{max} = \frac{2^{n}(PSC + 1)}{f_{clk}}$ | n = counter width. A 16-bit timer at 72 MHz with PSC = 0 overflows every 910 us. |
| Output-compare toggle frequency | $f_{toggle} = \frac{f_{clk}}{2(PSC + 1)(ARR + 1)}$ | The factor 2 appears because the output toggles twice per period. Drop it for a one-shot pulse. |
| Captured period | $T_{signal} = N_{ticks} \times T_{tick}$ | N_ticks = difference between two consecutive capture values. Subtract the readings, not the absolute times, to avoid counter wrap. |
| Debounce time constant | $\tau = RC$ | Choose tau of the order of the bounce time (1–20 ms for a panel switch); the logic input must be Schmitt-triggered. |
| Prescaler for a target delay | $PSC + 1 = \frac{T_{target} \, f_{clk}}{2^{n}}$ | Gives the smallest prescaler that still fits the delay in one counter period; round up to the next integer. |

## Worked Problems

### P1. A timer runs from a 72 MHz clock with $PSC = 71$ and $ARR = 999$. Find the tick period and the update-event period.

**Given:** $f_{clk} = 72$ MHz; $PSC = 71$; $ARR = 999$

**Solution:**

1. $T_{tick} = (71 + 1)/(72 \times 10^{6}) = 72/72 \times 10^{6}$
2. $= 1\ \mu s$
3. $T_{delay} = (999 + 1) \times 1\ \mu s$
4. $= 1000\ \mu s$

> [!success]- Answer
> **Tick $1\ \mu s$; update period $1$ ms.**

> [!warning] Trap
> Using PSC = 71 as a divide-by-71. The prescaler register holds the divisor *minus one*, so the real division is 72 and forgetting the +1 gives 1.014 us instead of 1 us.

### P2. A 16-bit timer is clocked at 72 MHz. Find the maximum delay with $PSC = 0$ and the maximum delay with $PSC = 1023$.

**Given:** 16-bit counter; $f_{clk} = 72$ MHz; $PSC = 0$ then $PSC = 1023$

**Solution:**

1. With $PSC = 0$: $T_{max} = 65536 \times 1/72 \times 10^{6}$
2. $= 9.10 \times 10^{-4}$ s
3. With $PSC = 1023$: $T_{max} = 65536 \times 1024/72 \times 10^{6}$
4. $= 0.932$ s

> [!success]- Answer
> **$910\ \mu s$ with $PSC = 0$; $0.932$ s with $PSC = 1023$.**

> [!warning] Trap
> Assuming a 16-bit timer can produce a 1 s delay at 72 MHz. Its longest single period is 0.932 s, so a 1 s delay needs a software post-scaler or a 32-bit timer.

### P3. Input capture latches 0x0384 on one rising edge and 0x0BB8 on the next, with a 1 us tick. Find the input frequency.

**Given:** capture 1 = 0x0384; capture 2 = 0x0BB8; $T_{tick} = 1\ \mu s$

**Solution:**

1. $0x0384 = 900$ and $0x0BB8 = 3000$
2. $N_{ticks} = 3000 - 900 = 2100$
3. $T_{signal} = 2100 \times 1\ \mu s = 2.1$ ms
4. $f = 1/2.1\ \mathrm{ms} = 476$ Hz

> [!success]- Answer
> **$476$ Hz.**

> [!warning] Trap
> Taking the difference the wrong way or using the absolute capture value. Only the difference between two captures is the period; the absolute value is just a timestamp with no meaning of its own.

### P4. A panel switch bounces for about 5 ms and feeds a 10 kOhm resistor into an RC network. What capacitor gives a 5 ms time constant, and what else is required?

**Given:** bounce time = 5 ms; $R = 10$ kOhm; $\tau = 5$ ms

**Solution:**

1. $\tau = RC \Rightarrow C = \tau/R$
2. $C = 5 \times 10^{-3}/10 \times 10^{3}$
3. $= 0.5 \times 10^{-6}$ F
4. The RC only slows the edge; the receiving input must be a Schmitt trigger (or the firmware must confirm the level)

> [!success]- Answer
> **$C = 0.5\ \mu F$, plus a Schmitt-trigger input or software confirmation.**

> [!warning] Trap
> Assuming the RC alone debounces the switch. An RC produces a slow, noisy edge that can cross the logic threshold several times, so without hysteresis the counter still double-counts.

### P5. An 8-bit timer clocked at 4 MHz must produce a 20 ms delay. Find suitable prescaler and count values.

**Given:** 8-bit counter (max count 255); $f_{clk} = 4$ MHz; delay = 20 ms

**Solution:**

1. Counts needed at 4 MHz: $20\ \mathrm{ms} \times 4\ \mathrm{MHz} = 80{,}000$, which exceeds 255
2. Required divider: $PSC + 1 = 78.1\ \mu s \times 4\ \mathrm{MHz} = 312.5$; round up to a whole divider 314
3. $PSC = 314 - 1 = 313$, giving $T_{tick} = 314/4\ \mathrm{MHz} = 78.5\ \mu s$
4. $N = 20\ \mathrm{ms}/78.5\ \mu s = 254.8 \Rightarrow$ load 255, giving $255 \times 78.5\ \mu s = 20.02$ ms

> [!success]- Answer
> **$PSC = 313$ ($T_{tick} = 78.5\ \mu s$) and a count of 255, giving 20.02 ms.**

> [!warning] Trap
> Trying to get 20 ms from an 8-bit counter at 4 MHz in one pass. The counter overflows after 63.75 us, so a prescaler is not optional — 80,000 counts simply do not fit in 8 bits.

## Traps & Exam Notes

- **Read-modify-write on a GPIO port.** Reading the port returns the pin level, not the output latch, so `PORT |= BIT` can corrupt every other pin on the byte. Use the set/reset register or a RAM shadow.
- **Writing the prescaler value instead of the divisor.** The registers hold `PSC+1` and `ARR+1` divisions, so every calculated frequency is off by one count when the +1 is dropped.
- **Asking a 16-bit timer for a delay beyond its range.** At 72 MHz a 16-bit timer tops out at 910 us with no prescaler; long delays need a bigger prescaler (coarser resolution) or a software post-scaler.
- **Debouncing with a capacitor and no hysteresis.** A slow RC edge can cross the logic threshold repeatedly, so the input still double-clocks a counter without a Schmitt trigger or firmware confirmation.
- **Using the first capture reading.** The first input-capture value after enabling the timer is undefined; discard it and use the difference between two later captures.
- **Changing the period register mid-cycle.** Output compare and PWM share the counter, so a write to ARR between the compare match and the update event produces one abnormally long or short pulse.

## See Also

- [[09_PWM_and_ADC_-_DAC_Modules]]
- [[06_Interrupts_and_ISRs]]
- [[10_Serial_Interfaces_UART,_SPI,_I2C]]
- [[12_Signal_Conditioning_and_DAQ]]

---

[[07_DMA_and_Bus_Arbitration|⬅ 07]] · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · [[09_PWM_and_ADC_-_DAC_Modules|09 ➡]]
