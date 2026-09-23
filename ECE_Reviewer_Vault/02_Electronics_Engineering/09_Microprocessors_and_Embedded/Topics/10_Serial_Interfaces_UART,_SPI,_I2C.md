---
id: ECE-09-10
title: "Serial Interfaces: UART, SPI, I2C"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[06_Interrupts_and_ISRs]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Serial Interfaces: UART, SPI, I2C

> [!abstract] Scope
> Frame a UART character, set its baud divisor correctly, and compare UART, SPI and I2C throughput, wiring and error behaviour.

## Core Concept

> [!tip] Intuition
> Serial links trade wires for time. UART agrees on a rate and hopes; SPI trusts a dedicated select line; I2C shares two open-drain wires and negotiates with an address and an acknowledge bit.

**Serial versus parallel.** Parallel buses move a word per clock but need one wire per bit, and at high speed their skew and crosstalk cost more than the width buys. High-speed links are therefore serial: fewer pins, easier impedance control, and the clock can be embedded or recovered from the data.

**UART — asynchronous, frame-based.** The line idles high. A start bit (low) synchronises the receiver, then 5–9 data bits LSB-first, an optional parity bit, and 1, 1.5 or 2 stop bits (high). Because there is no clock wire, the receiver samples 16 times per bit and votes around the bit centre, which is why the baud rate must match closely — the error accumulates across the frame. RS-232 uses large bipolar swings and is point-to-point over short cable; RS-485 uses a differential pair, which rejects common-mode noise and supports multidrop over long cable.

**SPI — synchronous, four wires, full duplex.** A master drives SCK and MOSI, the slave returns MISO, and one slave-select line per slave frames the transfer. There is no addressing and no acknowledgement: the slave-select *is* the address, and the master has no way to know whether the slave heard. CPOL sets the idle clock level and CPHA sets which edge samples; the four combinations are the SPI modes, and both ends must agree. Throughput is simply the SCK frequency divided by eight per byte, which makes SPI the fastest of the three.

**I2C — synchronous, two wires, addressed.** SDA and SCL are open-drain with pull-up resistors, so any device can pull a line low without shorting another device's driver. A transfer starts with a START condition, then a 7- or 10-bit address plus a read/write bit, then an ACK/NACK bit driven by the receiver after every byte, and ends with a STOP. Clock stretching lets a slow slave hold SCL low to pause the master, and because the bus is open-drain, two masters transmitting simultaneously can detect the collision and arbitration resolves it without corrupting data. The pull-up value is bounded above by the rise-time specification and below by the drivers' sink-current rating.

**Choosing between them.** SPI for the highest throughput and short board-level links (Flash, SD cards, ADCs). I2C for many low-speed devices on two pins (sensors, EEPROMs, RTCs). UART for a link to another computer or module with no shared clock (GPS, Bluetooth modules, RS-485 fieldbus). And in every case, the *bit* rate is not the *byte* rate: framing, addresses, acknowledges and gaps all consume time that does not carry payload.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| UART frame length | $n_{bits} = 1 + n_{data} + n_{parity} + n_{stop}$ | 8N1 means 1 start + 8 data + 0 parity + 1 stop = 10 bit-times per character. |
| UART character rate | $\mathrm{char/s} = \frac{f_{baud}}{n_{bits}}$ | 9600 baud with 8N1 carries 960 characters/s, not 1200. |
| UART frame time | $T_{frame} = \frac{n_{bits}}{f_{baud}}$ | Time on the wire for one character. Add any inter-frame gap your protocol needs. |
| UART baud divisor | $\mathrm{DIV} = \frac{f_{clk}}{16 \, f_{baud}}$ | The 16 is the receiver's oversampling factor. Dropping it makes the divisor 16x too large. |
| Baud error | $\epsilon = \frac{f_{actual} - f_{desired}}{f_{desired}}$ | Keep within about 2 % so a 10-bit frame stays inside half a bit at the stop bit. |
| SPI payload throughput | $\mathrm{bytes/s} = \frac{f_{SCK}}{8}$ | One byte per 8 clock cycles, full duplex. Add slave-select setup and inter-byte gaps in practice. |
| I2C rise time | $t_r \approx 0.8473 \, R_p \, C_b$ | Standard-mode I2C allows 1000 ns and fast mode 300 ns; C_b is the total bus capacitance including wiring and pins. |
| I2C maximum pull-up | $R_{p,max} = \frac{t_{r,max}}{0.8473 \, C_b}$ | The upper bound; the lower bound comes from the drivers' maximum sink current at V_OL. |
| I2C byte time with acknowledge | $T_{byte} = \frac{9}{f_{SCL}}$ | Eight data bits plus the ACK bit, ignoring START/STOP and clock stretching. |

## Interactive Widget

**I2C SPI Frame Viewer**

![[I2C_SPI_Frame_Viewer.html|width: 100%; height: max-content]]

## Worked Problems

### P1. A UART runs at 9600 baud with 8 data bits, no parity and 1 stop bit. Find the frame time and the character rate.

**Given:** 9600 baud; 8N1

**Solution:**

1. $n_{bits} = 1 + 8 + 0 + 1 = 10$
2. $T_{frame} = 10/9600 = 1.0417 \times 10^{-3}$ s
3. $= 1.0417$ ms
4. Character rate $= 1/1.0417\ \mathrm{ms} = 960$ char/s

> [!success]- Answer
> **$1.042$ ms per character; 960 characters/s.**

> [!warning] Trap
> Dividing 9600 by 8 to get 1200 bytes/s. The start and stop bits are transmitted at the same baud rate and consume real time, so 8N1 costs 10 bit-times per byte.

### P2. A UART peripheral uses 16x oversampling and is clocked at 7.3728 MHz. Find the divisor for 9600 baud and the resulting actual baud rate.

**Given:** $f_{clk} = 7.3728$ MHz; 16x oversampling; target = 9600 baud

**Solution:**

1. $\mathrm{DIV} = 7.3728 \times 10^{6}/(16 \times 9600)$
2. $= 7.3728 \times 10^{6}/153{,}600$
3. $= 48.0$ — an exact integer, so there is no error
4. $f_{actual} = 7.3728 \times 10^{6}/(16 \times 48) = 9600$ baud exactly

> [!success]- Answer
> **Divisor 48; actual baud 9600 (zero error).**

> [!warning] Trap
> Forgetting the 16x oversampling and using 7.3728e6/9600 = 768. That divisor produces 600 baud — the link fails completely and the symptom looks like a wiring fault.

### P3. An SPI bus runs at $f_{SCK} = 10$ MHz with 8-bit frames. Find the payload throughput and the time to transfer 1 MB.

**Given:** $f_{SCK} = 10$ MHz; 8-bit frames; 1 MB = 10^6 bytes

**Solution:**

1. One byte per 8 clock cycles $\Rightarrow 1.25 \times 10^{6}$ bytes/s
2. $t = 10^{6}/1.25 \times 10^{6}$
3. $= 0.8$ s

> [!success]- Answer
> **$1.25$ MB/s; $0.8$ s for 1 MB.**

> [!warning] Trap
> Using 10 MB/s by treating one bit per clock. An 8-bit shift register needs eight clocks per byte, and SPI's full-duplex nature does not double the byte rate.

### P4. An I2C bus has $C_b = 200$ pF and $R_p = 4.7\ \mathrm{k\Omega}$. Find the rise time and state whether the bus meets the standard-mode (100 kHz, 1000 ns) and fast-mode (400 kHz, 300 ns) limits. What pull-up does fast mode need?

**Given:** $C_b = 200$ pF; $R_p = 4.7$ kOhm; limits: 1000 ns (100 kHz), 300 ns (400 kHz)

**Solution:**

1. $t_r = 0.8473 \times 4700 \times 200 \times 10^{-12}$
2. $= 7.965 \times 10^{-7}$ s $= 796.5$ ns
3. 796.5 ns < 1000 ns, so standard mode passes
4. 796.5 ns > 300 ns, so fast mode fails
5. $R_{p,max} = 300 \times 10^{-9}/(0.8473 \times 200 \times 10^{-12}) = 1770\ \Omega$, so use 1.5 kOhm

> [!success]- Answer
> **$t_r = 796$ ns: standard mode passes, fast mode fails. Use $R_p \leq 1.77\ \mathrm{k\Omega}$ for 400 kHz.**

> [!warning] Trap
> Lowering the pull-up to speed the edge without checking the sink current. A smaller resistor raises the low-level current a device must sink, and exceeding $I_{OL}$ makes the low level float above $V_{IL}$.

### P5. How long does it take to send 1000 bytes over a UART at 115200 baud, 8N1?

**Given:** 115200 baud; 8N1; 1000 bytes

**Solution:**

1. $n_{bits} = 1 + 8 + 1 = 10$ per byte
2. Total bits $= 1000 \times 10 = 10{,}000$
3. $t = 10{,}000/115{,}200$
4. $= 0.0868$ s

> [!success]- Answer
> **$86.8$ ms.**

> [!warning] Trap
> Using 1000 x 8 / 115200 = 69.4 ms. Ignoring the framing bits makes the transfer look 30 % faster than it is, which matters when sizing a timeout.

## Traps & Exam Notes

- **Treating baud as byte rate.** 8N1 costs 10 bit-times per byte, so 9600 baud carries 960 bytes/s; add parity or two stop bits and it drops further.
- **Dropping the 16 from the UART divisor.** $\mathrm{DIV} = f_{clk}/(16 f_{baud})$ because the receiver oversamples 16x; omitting it makes the divisor 16x too large and the baud 16x too low.
- **Driving an I2C line push-pull.** SDA and SCL are open-drain; a push-pull high fighting another device's low shorts the bus. The pull-up is bounded above by the rise-time spec and below by the sink-current rating.
- **Assuming SPI will report a failure.** SPI has no acknowledge and no address: a wrong or missing slave-select writes real data to the wrong device and the master never knows.
- **Mismatching SPI mode.** A CPOL/CPHA mismatch samples every bit one clock edge early or late, and the received value looks like a plausible shifted word rather than obvious garbage.
- **Ignoring accumulated UART baud error.** A 5 % error over a 10-bit frame is half a bit by the stop bit, so the start bit locks but the last data bit samples at the edge and reads wrong only for certain byte values.

## See Also

- [[06_Interrupts_and_ISRs]]
- [[07_DMA_and_Bus_Arbitration]]
- [[08_GPIO_and_Timer_Peripherals]]
- [[04_Instruction_and_Machine_Cycles]]
- [[16_Error_Control_Hamming_and_CRC]]

---

[[09_PWM_and_ADC_-_DAC_Modules|⬅ 09]] · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
