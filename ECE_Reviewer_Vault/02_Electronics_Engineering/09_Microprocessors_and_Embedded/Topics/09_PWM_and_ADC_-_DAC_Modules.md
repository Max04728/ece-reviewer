---
id: ECE-09-09
title: "PWM and ADC/DAC Modules"
part: "02_Electronics_Engineering"
area: "09_Microprocessors_and_Embedded"
topic: 9
tier: 2
depth: full
problem_count: 5
prereqs: ["[[08_GPIO_and_Timer_Peripherals]]"]
tags: ["ece", "electronics_engineering", "microprocessors_and_embedded"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 09 — PWM and ADC/DAC Modules

> [!abstract] Scope
> Generate PWM from a timer, size its frequency and duty resolution, and compute ADC/DAC step size, conversion time and ripple.

## Core Concept

> [!tip] Intuition
> PWM is a digital square wave whose average is analog. The timer sets the period; the compare register sets how much of that period is spent high, and an RC filter turns the ratio into a voltage.

**PWM from a timer.** The counter ramps from 0 to the auto-reload value and wraps. The output is held high while the counter is below the compare value and low otherwise, so the period is $ARR + 1$ ticks and the duty cycle is $CCR/(ARR+1)$. Changing CCR changes the duty without touching the period, which is why PWM dims an LED or drives a motor smoothly.

**Frequency against resolution.** Both the PWM frequency and the number of duty steps come from the same auto-reload value at a fixed timer clock. Making the period shorter raises the frequency but reduces the number of distinct duty steps; making it longer gives finer control at a lower frequency. A 16-bit timer at 1 MHz cannot give both a 1 Hz output and 16-bit duty resolution — that requires a 24-bit period or a two-stage (timer plus software post-scaler) scheme.

**Filtered PWM as a cheap DAC.** An RC low-pass on the PWM pin gives a DC level of $D \, V_{ref}$. The approximation is only good when the RC time constant is far longer than the PWM period; otherwise triangular ripple appears on the output. The ripple is largest at 50 % duty and falls with frequency, so a slow PWM demands a big capacitor — which then slows the settling time after a duty change.

**ADC architectures and the SAR sequence.** A successive-approximation ADC compares the input against a trial sum of binary-weighted references, one bit per conversion from MSB to LSB, so an $n$-bit conversion needs about $n$ comparison clocks plus acquisition and hold overhead. Flash ADCs compare against $2^{n}-1$ references simultaneously and are fastest but enormous; dual-slope integrates and is slow but very accurate and noise-tolerant; delta-sigma oversamples and shapes noise to buy resolution with time. All of them quantise the same way: one LSB is $V_{ref}/2^{n}$ and the quantisation error is at most half an LSB.

**DACs and their limits.** An R-2R ladder produces the weighted sum of the input bits with only two resistor values, which is why it dominates IC DACs; a binary-weighted resistor DAC needs impractically wide resistor ratios at high resolution. Resolution sets the step size, but *settling time* sets the update rate: the digital code can change much faster than the analog output can follow, so a fast SPI write does not mean a fast analog update. PWM plus an RC filter is a third option — nearly free, but slow and rippled.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| PWM duty cycle | $D = \frac{CCR}{ARR + 1}$ | CCR = compare value, ARR = auto-reload value. D is a fraction; multiply by 100 for percent. |
| PWM frequency | $f_{PWM} = \frac{f_{clk}}{(PSC + 1)(ARR + 1)}$ | f_clk is the timer input clock. Omitting either +1 shifts the answer by roughly one count. |
| Duty resolution | $n_{duty} = \log_2(ARR + 1)$ | Number of bits of duty control. ARR = 999 gives about 9.97 bits, so use it as a 10-bit (0-1000) duty. |
| Filtered PWM average | $V_{avg} = D \, V_{ref}$ | Valid only when RC is much greater than the PWM period; otherwise the true average is right but the instantaneous output ripples. |
| PWM filter ripple | $V_{ripple} = \frac{V_{ref} \, D(1 - D)}{f_{PWM} R C}$ | Peak-to-peak, worst at D = 0.5. Increase R or C, or raise f_PWM, to shrink it. |
| Quantisation step (LSB) | $LSB = \frac{V_{ref}}{2^{n}}$ | n = converter bits. A 12-bit converter on a 3.3 V reference steps by 805.7 uV. |
| Quantisation SNR | $\mathrm{SNR}_{dB} = 6.02n + 1.76$ | Ideal full-scale sine input, uniform quantisation. Each extra bit buys about 6 dB. |
| SAR conversion time | $t_{conv} = \frac{n + 2}{f_{ADC}}$ | n comparison clocks plus sample and hold overhead; confirm against the datasheet's stated number of ADC clocks. |
| Maximum sample rate | $f_{s,max} = \frac{1}{t_{acq} + t_{conv}}$ | t_acq is the sample-and-hold acquisition time through the source impedance, and it is not optional. |
| Oversampling resolution gain | $\Delta \mathrm{ENOB} = \tfrac{1}{2}\log_2(OSR)$ | Each 4x oversampling buys 1 bit, but only if the added noise is white and dithers the input. |

## Worked Problems

### P1. A timer clocked at 72 MHz uses $PSC = 71$ and $ARR = 999$, with $CCR = 250$. Find the PWM frequency, the duty cycle, the duty resolution and the filtered output for a 3.3 V reference.

**Given:** $f_{clk} = 72$ MHz; $PSC = 71$; $ARR = 999$; $CCR = 250$; $V_{ref} = 3.3$ V

**Solution:**

1. Timer clock $= 72\ \mathrm{MHz}/(71+1) = 1$ MHz
2. $f_{PWM} = 10^{6}/(999+1) = 1$ kHz
3. $D = 250/1000 = 0.25$ (25 %)
4. Duty resolution $= \log_2(1000) = 9.97 \approx 10$ bits
5. $V_{avg} = 0.25 \times 3.3 = 0.825$ V

> [!success]- Answer
> **$1$ kHz, $D = 25\%$, about 10 bits of duty resolution, $V_{avg} = 0.825$ V.**

> [!warning] Trap
> Using $f_{PWM} = f_{clk}/ARR = 72$ kHz by dropping both the prescaler and the +1. Both registers hold the divisor minus one and both must be incremented.

### P2. A 12-bit ADC has a 3.3 V reference. Find the LSB size and the output code for a 1.000 V input.

**Given:** 12 bits; $V_{ref} = 3.3$ V; $V_{in} = 1.000$ V

**Solution:**

1. $LSB = 3.3/2^{12} = 3.3/4096$
2. $= 8.0566 \times 10^{-4}$ V $= 805.7\ \mu V$
3. Code $= 1.000/8.0566 \times 10^{-4} = 1241.2$
4. Nearest integer code $= 1241$, giving $1241 \times 805.66\ \mu V = 0.99983$ V

> [!success]- Answer
> **$LSB = 805.7\ \mu V$; code 1241 (0x4D9).**

> [!warning] Trap
> Dividing by $2^{12} - 1 = 4095$ instead of 4096. The step size is $V_{ref}/2^{n}$; using 4095 shifts every code by about 0.02 % and, more importantly, is the wrong formula to quote.

### P3. A 12-bit SAR ADC is clocked at 12 MHz and needs 14 ADC clocks per conversion plus 1.0 us of acquisition. Find the conversion time and the maximum sample rate.

**Given:** 12 bits; $f_{ADC} = 12$ MHz; 14 clocks per conversion; $t_{acq} = 1.0\ \mu s$

**Solution:**

1. $t_{conv} = 14/(12 \times 10^{6}) = 1.1667\ \mu s$
2. Total per sample $= 1.1667 + 1.0 = 2.1667\ \mu s$
3. $f_{s,max} = 1/2.1667\ \mu s$
4. $= 4.615 \times 10^{5} = 461.5$ kS/s

> [!success]- Answer
> **$t_{conv} = 1.167\ \mu s$; $f_{s,max} \approx 461$ kS/s.**

> [!warning] Trap
> Quoting $1/t_{conv} = 857$ kS/s by ignoring the acquisition time. The sample-and-hold must recharge between conversions, so acquisition is part of the sample period.

### P4. A 12-bit ADC is oversampled by a factor of 16 with proper dithering. What effective resolution results?

**Given:** base resolution = 12 bits; $OSR = 16$

**Solution:**

1. $\Delta \mathrm{ENOB} = \tfrac{1}{2}\log_2(16)$
2. $= \tfrac{1}{2}(4) = 2$ bits
3. Effective resolution $= 12 + 2 = 14$ bits
4. This holds only if the added noise is white and spans at least one LSB

> [!success]- Answer
> **14 bits effective ($+2$ bits).**

> [!warning] Trap
> Multiplying the resolution by the oversampling ratio, or applying the rule to a static DC input. Oversampling a noiseless constant recovers no extra bits, because there is nothing to average away.

### P5. A PWM DAC runs at 20 kHz from a 5 V reference with $D = 0.5$, followed by $R = 10\ \mathrm{k\Omega}$ and $C = 1\ \mu F$. Find the average output and the peak-to-peak ripple.

**Given:** $V_{ref} = 5$ V; $D = 0.5$; $f_{PWM} = 20$ kHz; $R = 10$ kOhm; $C = 1\ \mu F$

**Solution:**

1. $V_{avg} = 0.5 \times 5 = 2.5$ V
2. Check the filter: $RC = 10^{4} \times 10^{-6} = 10$ ms, versus $T_{PWM} = 50\ \mu s$ — a ratio of 200, so the average is valid
3. $V_{ripple} = \dfrac{5(0.5)(0.5)}{20 \times 10^{3} \times 10^{4} \times 10^{-6}}$
4. $= \dfrac{1.25}{200} = 6.25 \times 10^{-3}$ V

> [!success]- Answer
> **$V_{avg} = 2.5$ V with $6.25$ mV peak-to-peak ripple.**

> [!warning] Trap
> Assuming $V_{avg} = D V_{ref}$ needs no justification. With a 1 kHz PWM and the same RC the ratio drops to 10 and the ripple becomes 125 mV, which swamps a 12-bit ADC's 1.2 mV LSB on a 5 V reference.

## Traps & Exam Notes

- **PWM frequency and duty resolution trade off.** At a fixed timer clock both come from $ARR + 1$, so a 16-bit timer cannot give a 1 Hz PWM with 16-bit duty resolution. Choose which one the application needs.
- **Dividing by the prescaler and reload values themselves.** Both registers hold the divisor minus one, so $f_{PWM} = f_{clk}/[(PSC+1)(ARR+1)]$; dropping a +1 is a whole-count error in each divisor.
- **Believing the filtered PWM average is always $D V_{ref}$.** That is the true average, but the *output* only equals it when $RC$ is much greater than the PWM period; otherwise ripple rides on the DC level.
- **Using $V_{ref}/2^{n} - 1$ as the step size.** The LSB is $V_{ref}/2^{n}$; the full-scale code $2^{n}-1$ corresponds to $V_{ref}(1 - 2^{-n})$, which is one LSB below the reference.
- **Ignoring acquisition time in the sample rate.** A fast SAR core still needs the sample-and-hold capacitor to charge through the source impedance, and the first conversion after a channel change is invalid.
- **Judging a DAC by its resolution alone.** Settling time, not bit count, limits the update rate: the digital code can change much faster than the analog output can follow.
- **Applying the oversampling rule without dither.** $\tfrac{1}{2}\log_2(OSR)$ bits only appear if the added noise is white; oversampling a quiet DC input adds no resolution.

## See Also

- [[08_GPIO_and_Timer_Peripherals]]
- [[14_DAC_Architectures]]
- [[12_Signal_Conditioning_and_DAQ]]
- [[03_Memory_Technologies_and_Address_Decoding]]
- [[03_Quantization_Noise_and_SQNR]]

---

[[08_GPIO_and_Timer_Peripherals|⬅ 08]] · [[_MOC_Microprocessors_and_Embedded|MOC]] · [[00_Dashboard|Dashboard]] · [[10_Serial_Interfaces_UART,_SPI,_I2C|10 ➡]]
