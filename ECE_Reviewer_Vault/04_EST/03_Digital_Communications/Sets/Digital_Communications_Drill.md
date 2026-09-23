---
title: "Digital Communications — Drill"
type: drill
area: 03_Digital_Communications
part: 04_EST
seed: 1
count: 8
pool: 78
updated: 2026-09-23
---

# Digital Communications — Practice Drill

**8 problems** drawn from a pool of 78 across 16 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 03_Digital_Communications --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A source emits four symbols with probabilities $1/2$, $1/4$, $1/8$ and $1/8$, and the symbol rate is $1000$ symbols per second. Find the entropy and the information rate.

**Given:** p = 1/2, 1/4, 1/8, 1/8; rs = 1000 symbols/s

> [!success]- Answer
> **$H = 1.75$ bits/symbol, $R = 1750\ \mathrm{bps}$**

> [!warning] Trap
> Trying to use $\log_2 4 = 2$ bits per symbol as the code length and then reporting an information rate of 2000 bps. Fixed-length coding wastes 0.25 bits/symbol here; the information rate is set by entropy, not by the code length.

<sub>from EST-03-14</sub>

### 2. A CRC uses a generator polynomial of degree $4$. State which burst errors are always detected and the probability of missing a longer burst.

**Given:** degree r = 4; generator has a nonzero constant term

> [!success]- Answer
> **All bursts $\leq 4$ bits detected; longer bursts missed with probability $1/16 = 6.25\%$**

> [!warning] Trap
> Claiming the CRC detects *all* burst errors. Guarantees are bounded by the generator degree: degree $r$ guarantees bursts up to $r$ bits, and beyond that detection becomes probabilistic at $1 - 2^{-r}$.

<sub>from EST-03-16</sub>

### 3. Verify that the codeword $1101001$ produces a zero remainder when divided by $1011$.

**Given:** received = 1101001; G = 1011

> [!success]- Answer
> **Remainder $= 000$ — no error detected**

> [!warning] Trap
> Dividing only the message portion $1101$ and finding a nonzero remainder. The receiver must divide the *entire* received frame including the FCS; dividing the message alone always leaves a nonzero remainder and would reject every good frame.

<sub>from EST-03-16</sub>

### 4. Sketch the geometry: find $d_{min}/\sqrt{E_b}$ for QPSK and for 8-PSK, and hence the $E_b/N_0$ penalty of 8-PSK.

**Given:** M = 4 and M = 8; equal Eb; compare at a common BER

> [!success]- Answer
> **8-PSK costs about $3.6\ \mathrm{dB}$ more $E_b/N_0$ than QPSK**

> [!warning] Trap
> Using $\sin(\pi/8)$ in radians and forgetting it is $22.5^\circ$, or using $\pi/M$ with $M = 8$ but writing $\pi/4$. The angle between *adjacent* points is $2\pi/M$, and the half-angle $\pi/M$ is what appears in the distance formula.

<sub>from EST-03-12</sub>

### 5. Encode the data word $1011$ with the Hamming (7,4) code using even parity.

**Given:** data = 1011; positions 1..7 with parity at 1, 2, 4; even parity

> [!success]- Answer
> **$0110011$**

> [!warning] Trap
> Writing the codeword in data-then-parity order as $1011\,010$ instead of interleaving at the power-of-two positions. The position-numbering convention is what makes the syndrome equal the error index; changing the layout breaks decoding.

<sub>from EST-03-16</sub>

### 6. A very quiet sample $x = 0.001$ is mu-law compressed. Find $y$ and explain the result.

**Given:** x = 0.001; mu = 255

> [!success]- Answer
> **$y = 0.041$**

> [!warning] Trap
> Approximating $\ln(1+\mu x) \approx \ln(\mu x)$ here. For small $x$ the linear term dominates and the approximation breaks down: it would give $\ln(0.255)/5.545 = -0.247$, a negative output for a positive input.

<sub>from EST-03-04</sub>

### 7. An 8-bit PCM system is fed a sinusoid that peaks at only one tenth of the quantizer's full-scale voltage. Find the SQNR.

**Given:** n = 8; m = 0.1

> [!success]- Answer
> **$29.9\ \mathrm{dB}$**

> [!warning] Trap
> Using $10\log_{10}(0.1) = -10\ \mathrm{dB}$. Signal *voltage* scales by $m$ while power scales by $m^2$, hence the 20-log form.

<sub>from EST-03-03</sub>

### 8. A telephone channel has a $3\ \mathrm{kHz}$ bandwidth and a $30\ \mathrm{dB}$ signal-to-noise ratio. Find the Shannon capacity.

**Given:** B = 3 kHz; SNR = 30 dB

> [!success]- Answer
> **$C \approx 29.9\ \mathrm{kbps}$**

> [!warning] Trap
> Substituting 30 into the logarithm, giving $C = 3000\log_2 31 = 14.9\ \mathrm{kbps}$ — exactly half the correct answer. The SNR must be the linear power ratio 1000.

<sub>from EST-03-15</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| EST-03-01 | Pulse Modulation: PAM, PWM, PPM | 4 |
| EST-03-02 | PCM: Sampling, Quantizing, Encoding | 10 |
| EST-03-03 | Quantization Noise and SQNR | 4 |
| EST-03-04 | Companding: Mu-Law and A-Law | 4 |
| EST-03-05 | Delta Modulation and ADM | 4 |
| EST-03-06 | Line Coding Schemes | 4 |
| EST-03-07 | Inter-Symbol Interference and Nyquist Criterion | 4 |
| EST-03-08 | Eye Diagrams and Equalization | 4 |
| EST-03-09 | ASK, OOK and FSK | 4 |
| EST-03-10 | BPSK and QPSK | 5 |
| EST-03-11 | M-ary PSK and 16-QAM | 4 |
| EST-03-12 | Constellation and BER Comparison | 4 |
| EST-03-13 | Matched Filter and Optimum Detection | 4 |
| EST-03-14 | Information Theory and Entropy | 4 |
| EST-03-15 | Shannon-Hartley Capacity | 5 |
| EST-03-16 | Error Control: Hamming and CRC | 10 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
