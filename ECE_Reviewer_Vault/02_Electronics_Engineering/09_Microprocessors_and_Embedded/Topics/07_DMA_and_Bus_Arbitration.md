---
id: ECE-09-07
title: "DMA and Bus Arbitration"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 7
tier: 2
depth: full
problem_count: 5
prereqs: ["[[06_Interrupts_and_ISRs]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 07 — DMA and Bus Arbitration

> [!abstract] Scope
> Cost a DMA block transfer against programmed I/O and work out the arbitration latency and CPU bandwidth a DMA channel steals.

## Core Concept

> [!tip] Intuition
> DMA makes the memory controller a second bus master. The CPU is not doing the copying any more, but the bus is still one road — every cycle the DMA controller uses is a cycle the CPU cannot.

**Why DMA exists.** Programmed I/O moves one word per load-store pair, so a 1 MiB transfer costs roughly a million instruction executions and the CPU is busy the whole time. A DMA controller instead takes the source address, destination address, transfer count and control word, then moves the block itself while the CPU executes its program. When the count expires the controller raises one interrupt. The CPU's involvement drops from per-word to per-block.

**The bus request/grant handshake.** The DMA controller asserts *bus request*; the CPU finishes the bus cycle in progress, floats its address/data/control drivers, and asserts *bus grant*. The controller is now the bus master and drives the address, data and read/write strobes. It must release the bus when the transfer (or its stolen cycle) completes. If it does not, the CPU stalls and DRAM refresh may be missed, which loses memory contents.

**Transfer modes.** In *burst* or block mode the controller holds the bus for the entire block: maximum throughput, but the CPU is frozen for the duration and interrupt latency suffers. In *cycle stealing* it takes one bus cycle at a time, interleaved with CPU cycles, so the CPU loses a calculable fraction of its bandwidth but stays responsive. In *transparent* mode the controller uses only cycles the CPU is not using (for example, when the CPU is doing internal ALU work), which costs no bandwidth at all but depends on the CPU's cycle pattern.

**Arbitration between masters.** *Daisy chaining* passes the grant line from device to device: the first device in the chain that wants the bus takes the grant and does not pass it on, so priority is purely positional and the grant propagates through one gate delay per device. *Polling* has one controller cycle through a device-ID code. *Independent request* gives every device its own request/grant pair, which costs the most pins but allows any priority scheme, and a *rotating* priority prevents any one device from starving the others.

**Consequences the exam tests.** The DMA count register counts *transfers*, not bytes, so its width must be matched to the bus width: 512 transfers on a 32-bit bus is 2 KiB. A DMA write into a cached region leaves stale lines unless the cache is invalidated or the buffer is marked non-cacheable. And programming the controller while a channel is enabled corrupts the transfer — disable the channel, program it, then enable.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Bus bandwidth | $BW = w \times f_{bus}$ | w in bytes per transfer, f_bus in transfers per second. Divide by (1 + wait states) if the bus is slowed. |
| DMA transfer time | $t = \frac{n}{BW}$ | n = bytes to move in an uninterrupted burst. Add the setup time charged by the controller. |
| CPU throughput lost to cycle stealing | $\mathrm{loss} = \frac{n_{stolen}}{n_{total}}$ | One stolen cycle in four costs the CPU 25 % of its bus bandwidth, so a compute-bound task slows proportionally. |
| Stretched CPU time | $T_{new} = \frac{T_{old}}{1 - \mathrm{fraction\ stolen}}$ | A 100 ms task with 25 % of cycles stolen takes 100/0.75 = 133 ms. |
| Break-even block size | $N_{min} = \frac{t_{setup}}{t_{PIO} - t_{DMA}}$ | t_PIO and t_DMA are per-byte. Below this size the DMA setup cost exceeds the saving, so programmed I/O wins. |
| Daisy-chain grant latency | $t_{grant} = n_{ahead} \times t_{gate}$ | Devices ahead of this one in the chain, each adding one gate delay to the grant propagation. |
| DMA bytes from the count register | $\mathrm{bytes} = \mathrm{count} \times \frac{w}{8}$ | Count is in transfers. A count of 512 on a 32-bit bus moves 2 KiB, not 512 bytes. |

## Worked Problems

### P1. A 1 MB block is moved by DMA over a 32-bit bus running at 25 MHz, one transfer per cycle. Find the bus bandwidth and the burst transfer time.

**Given:** block = 1 MB (10^6 bytes); bus = 32 bits; $f_{bus} = 25$ MHz; one transfer per cycle

**Solution:**

1. Transfer granule $= 32/8 = 4$ bytes
2. $BW = 4 \times 25 \times 10^{6} = 100 \times 10^{6}$ bytes/s
3. $t = 10^{6}/100 \times 10^{6}$
4. $= 0.01$ s

> [!success]- Answer
> **$100$ MB/s; $10$ ms for the burst.**

> [!warning] Trap
> Using 1 byte per transfer because the DMA 'moves bytes'. Each bus cycle moves the full data-bus width, so the count is in words.

### P2. The same DMA channel steals one bus cycle in every four. By how much does a 100 ms CPU-bound task stretch?

**Given:** cycle stealing 1 in 4; $T_{old} = 100$ ms

**Solution:**

1. Fraction stolen $= 1/4 = 0.25$
2. $T_{new} = T_{old}/(1 - 0.25)$
3. $= 100/0.75$
4. $= 133.3$ ms

> [!success]- Answer
> **$133$ ms — a 33 % stretch.**

> [!warning] Trap
> Adding 25 % to the original time to get 125 ms. Losing 25 % of the cycles means the remaining 75 % must do all the work, so the stretch is $1/0.75 = 1.333$, not $1.25$.

### P3. A DMA controller charges 50 us of setup per block and then transfers at 0.05 us/byte. Programmed I/O costs 1 us/byte. Find the block size at which DMA breaks even.

**Given:** $t_{setup} = 50\ \mu s$; $t_{DMA} = 0.05\ \mu s$/byte; $t_{PIO} = 1\ \mu s$/byte

**Solution:**

1. Set the two times equal: $50 + 0.05N = 1.0N$
2. $50 = 0.95N$
3. $N = 52.6$ bytes
4. Round up: blocks of 53 bytes or more are faster by DMA

> [!success]- Answer
> **$N_{min} \approx 53$ bytes.**

> [!warning] Trap
> Dividing the setup time by the DMA per-byte time, which gives 1000 bytes and ignores the programmed-I/O baseline the transfer is being compared against.

### P4. A device sits fourth in a daisy chain where each stage adds 15 ns of grant propagation. What is its grant latency, and what happens if an upstream device holds the bus?

**Given:** 4th device; $t_{gate} = 15$ ns per stage

**Solution:**

1. Three devices are ahead of it in the chain
2. $t_{grant} = 3 \times 15\ \mathrm{ns} = 45$ ns
3. If an upstream device does not pass the grant on, this device never becomes bus master
4. Daisy-chain priority is positional: the closest device always wins

> [!success]- Answer
> **$45$ ns of propagation; an upstream master can lock this device out entirely.**

> [!warning] Trap
> Using $4 \times 15 = 60$ ns. Latency is caused by the devices *ahead* in the chain, so the first device has none.

### P5. An 8-bit bus runs at 4 MHz. A DMA channel steals one cycle in eight. Give the total bus bandwidth, the bandwidth the DMA gains and the bandwidth left to the CPU.

**Given:** 8-bit bus; $f_{bus} = 4$ MHz; 1 cycle in 8 stolen

**Solution:**

1. Total $BW = 1 \times 4 \times 10^{6} = 4$ MB/s
2. DMA share $= 4/8 = 0.5$ MB/s
3. CPU share $= 4 - 0.5 = 3.5$ MB/s
4. CPU keeps $7/8 = 87.5\%$ of the bus

> [!success]- Answer
> **Total 4 MB/s; DMA 0.5 MB/s; CPU 3.5 MB/s.**

> [!warning] Trap
> Reporting the DMA bandwidth as the CPU's remaining bandwidth. The two shares sum to the total, and cycle stealing always costs the CPU exactly what the DMA gains.

## Traps & Exam Notes

- **Reading the DMA count as bytes.** The count register is in transfers, so a count of 512 on a 32-bit bus moves 2 KiB and on an 8-bit bus moves 512 bytes.
- **Believing DMA is free.** Cycle stealing still consumes bus cycles, so bus-bandwidth-bound code slows by exactly the fraction stolen; only the instruction-execution cost disappears.
- **Leaving a cache coherent by assumption.** A DMA write into a cached buffer leaves stale lines in the cache; the buffer must be invalidated or marked non-cacheable.
- **Ignoring daisy-chain position.** Priority in a daisy chain is the physical order of the devices, and an upstream master that never releases the grant starves every device below it.
- **Holding the bus across DRAM refresh.** A long burst that blocks refresh loses memory contents — a real failure mode, not just a performance issue.
- **Programming an enabled channel.** Writing the address or count registers while the channel is running corrupts the transfer; disable, program, then enable.

## See Also

- [[02_Registers,_Buses_and_Memory_Organization]]
- [[06_Interrupts_and_ISRs]]
- [[03_Memory_Technologies_and_Address_Decoding]]
- [[10_Serial_Interfaces_UART,_SPI,_I2C]]

---

[[06_Interrupts_and_ISRs|⬅ 06]] · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · [[08_GPIO_and_Timer_Peripherals|08 ➡]]
