---
id: EST-03-14
title: "Information Theory and Entropy"
part: "04_EST"
area: "03_Digital_Communications"
topic: 14
tier: 2
depth: full
problem_count: 4
prereqs: ["[[02_Power_Spectral_Density]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 14 — Information Theory and Entropy

> [!abstract] Scope
> Quantify information: self-information of a message, entropy of a source, maximum entropy, and the source coding efficiency that entropy sets as a floor.

## Core Concept

> [!tip] Intuition
> Information is surprise. A message you expected carries almost nothing; a message that was very unlikely carries a lot. Entropy is the average surprise per symbol, and no code can, on average, use fewer bits than that.

**Self-information.** The information content of a single event of probability $p$ is $I = \log_2(1/p)$ bits. The logarithm is forced by three requirements: information must be non-negative, an event with $p = 1$ must carry zero information, and the information from two independent events must add while their probabilities multiply. Only a logarithm turns multiplication into addition. A fair coin's outcome carries exactly 1 bit; an event with probability $1/256$ carries 8 bits, which is why a uniformly random byte carries 8 bits.

**Entropy.** The *average* information per source symbol is the entropy $H = \sum_i p_i \log_2(1/p_i) = -\sum_i p_i \log_2 p_i$ bits per symbol. It is maximized when all $N$ symbols are equally likely, giving $H_{max} = \log_2 N$, and it is zero when one symbol has probability 1 (the source is deterministic and carries no information). Entropy measures the source's *irreducible* content: it is the average number of yes/no questions needed to identify a symbol, and Shannon's source coding theorem says no lossless code can beat it on average.

**Working with the numbers.** Two conventions dominate calculations. For probabilities that are powers of two the arithmetic is exact: a source with probabilities $1/2, 1/4, 1/8, 1/8$ has $H = 0.5(1) + 0.25(2) + 0.125(3) + 0.125(3) = 1.75$ bits. For general probabilities you need base conversion, $\log_2 p = \ln p/\ln 2 = 3.3219\log_{10} p$, and it is worth remembering $\log_2 3 = 1.585$, $\log_2 10 = 3.322$ and $\log_2 e = 1.443$. Binary entropy for a two-symbol source peaks at 1 bit when $p = 0.5$ and falls symmetrically to 0 at both extremes.

**Information rate and coding efficiency.** If the source emits $r_s$ symbols per second, the information rate is $R = H \cdot r_s$ bits per second. When a code assigns an average of $L$ bits per symbol, the coding efficiency is $\eta = H/L$, bounded above by 1, and the *redundancy* is $1 - \eta$. Huffman and Shannon–Fano codes are both constructed from the symbol probabilities — Huffman is optimal for a given symbol set and always achieves $H \leq L < H+1$ — while fixed-length coding of $N$ symbols uses $\lceil\log_2 N\rceil$ bits and wastes $\lceil\log_2 N\rceil - H$ bits per symbol. That waste is the compression opportunity.

**Why entropy matters to a communications engineer.** It sets the floor for source coding (how few bits the data can be squeezed into) just as Shannon's channel capacity sets the ceiling for channel coding (how many bits the channel can carry reliably). Compression plus error control is the whole architecture of a modern link: remove the redundancy the source does not need, then add back the redundancy the channel does need. Entropy also appears in mutual information $I(X;Y) = H(X) - H(X|Y)$, which is maximized — and equals capacity — when the input distribution is chosen correctly.

**The exam traps.** Entropy is a statistical average, not a property of a particular message, so quoting one outcome's self-information as the entropy is wrong. Mixing bit and nat units, or forgetting that entropy is maximized by *equal* probabilities (so a source with skewed statistics has $H < \log_2 N$, not greater), are the two recurring slips. Finally, coding efficiency compares the code length to entropy — not to $\log_2 N$, which is the fixed-length baseline.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Self-information | $I(x_i) = \log_2\!\left(\frac{1}{p_i}\right) = -\log_2 p_i$ | Bits when the base is 2. p = 1 gives 0 bits; p = 2^-n gives n bits. |
| Entropy of a source | $H = -\sum_{i=1}^{N} p_i \log_2 p_i$ | Average information per symbol, in bits per symbol. Always non-negative. |
| Maximum entropy | $H_{max} = \log_2 N$ | Achieved only when all N symbols are equally likely. Skewed sources give less. |
| Binary entropy | $H_b(p) = -p\log_2 p - (1-p)\log_2(1-p)$ | Peaks at 1 bit for p = 0.5 and is zero at p = 0 or 1. |
| Information rate | $R = H \cdot r_s$ | r_s is the symbol rate. Units are bits per second only if H is in bits per symbol. |
| Coding efficiency | $\eta = \frac{H}{L}$ | L is the average code length in bits per symbol. Bounded by 1, with equality only for dyadic probabilities. |
| Redundancy | $\rho = 1 - \frac{H}{L}$ | The fraction of transmitted bits that carry no new information. |
| Fixed-length code baseline | $L_{fixed} = \lceil \log_2 N \rceil$ | The comparison point for compression gains, not the entropy. |
| Huffman bound | $H \leq L_{Huffman} < H + 1$ | Huffman is optimal among prefix codes for a given symbol set; it can never beat entropy. |
| Mutual information | $I(X;Y) = H(X) - H(X\lvert Y)$ | The information the output carries about the input. Maximized at channel capacity. |

## Worked Problems

### P1. A source emits four equally likely messages. Find the entropy per message and the information carried by receiving one specific message.

**Given:** N = 4 equally likely messages

**Solution:**

1. p_i = 1/4 for each message
2. I = log2(1/(1/4)) = log2(4) = 2 bits
3. H = sum p_i log2(1/p_i) = 4 x 0.25 x 2 = 2 bits/symbol
4. Since the distribution is uniform, H = H_max = log2 4 = 2

> [!success]- Answer
> **$H = 2$ bits per message**

> [!warning] Trap
> Answering $H = \log_2 4 = 2$ by quoting the maximum-entropy formula without checking uniformity. Here it happens to be correct, but for a skewed source $\log_2 N$ overstates the entropy.

### P2. A source emits symbol A with probability $0.9$ and symbol B with probability $0.1$. Find the entropy.

**Given:** p(A) = 0.9; p(B) = 0.1

**Solution:**

1. For A: log2(1/0.9) = log2(1.1111) = 0.1520 bits
2. For B: log2(1/0.1) = log2(10) = 3.3219 bits
3. H = 0.9 x 0.1520 + 0.1 x 3.3219
4. = 0.1368 + 0.3322 = 0.469 bits/symbol

> [!success]- Answer
> **$H = 0.469$ bits per symbol**

> [!warning] Trap
> Answering 1 bit because there are two symbols. $\log_2 2 = 1$ bit is the maximum, reached only at $p = 0.5$; a 90/10 source is far more predictable.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `log(1÷0.9)÷log(2)` → **0.152003** bits for A; `log(1÷0.1)÷log(2)` → **3.321928** bits for B.
> 2. `0.9×0.152003+0.1×3.321928` → $H$ = **0.468996** ≈ **0.469** bits/symbol.
>
> The base-2 log lives on a base-10 keypad as `log x ÷ log 2`; `log10` alone understates $H$ by 3.32×.

### P3. A source emits four symbols with probabilities $1/2$, $1/4$, $1/8$ and $1/8$, and the symbol rate is $1000$ symbols per second. Find the entropy and the information rate.

**Given:** p = 1/2, 1/4, 1/8, 1/8; rs = 1000 symbols/s

**Solution:**

1. Self-informations: log2 2 = 1, log2 4 = 2, log2 8 = 3, log2 8 = 3 bits
2. H = (1/2)(1) + (1/4)(2) + (1/8)(3) + (1/8)(3)
3. = 0.5 + 0.5 + 0.375 + 0.375 = 1.75 bits/symbol
4. R = H x rs = 1.75 x 1000 = 1750 bps

> [!success]- Answer
> **$H = 1.75$ bits/symbol, $R = 1750\ \mathrm{bps}$**

> [!warning] Trap
> Trying to use $\log_2 4 = 2$ bits per symbol as the code length and then reporting an information rate of 2000 bps. Fixed-length coding wastes 0.25 bits/symbol here; the information rate is set by entropy, not by the code length.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `0.5×1+0.25×2+0.125×3+0.125×3` → $H$ = **1.75** bits/symbol (the self-informations 1, 2, 3, 3 come from `log(2)÷log(2)`, `log(4)÷log(2)`, `log(8)÷log(2)`).
> 2. `Ans×1000` → $R$ = **1750** bps.
>
> The information rate uses $H$, not the 2-bit fixed-length code, which would give 2000 bps.

### P4. For the 90/10 source of $H = 0.469$ bits/symbol, a fixed-length code uses 1 bit per symbol and a Huffman code also uses 1 bit. Find the coding efficiency of each and explain the result.

**Given:** H = 0.469 bits/symbol; L = 1 bit/symbol

**Solution:**

1. Efficiency = H/L = 0.469/1 = 0.469 = 46.9%
2. Redundancy = 1 - 0.469 = 0.531 = 53.1%
3. Binary Huffman cannot beat 1 bit per symbol when there are only two symbols, so both codes are identical
4. The only way to approach H is to code blocks of symbols together, where the per-symbol average can fall toward 0.469

> [!success]- Answer
> **$\eta = 46.9\%$, redundancy $53.1\%$; blocking is required to do better**

> [!warning] Trap
> Expecting Huffman to reach the entropy. For a binary source Huffman assigns exactly 1 bit per symbol, so the efficiency is stuck at $H$; entropy is a limit approached by block coding, not a length any single-symbol code can achieve.

## Traps & Exam Notes

- **Quoting $H = \log_2 N$ for a non-uniform source.** That is the *maximum* entropy, valid only when the symbols are equally likely. A skewed source always has less, so using $\log_2 N$ overstates the information content.
- **Confusing self-information with entropy.** $I(x_i) = \log_2(1/p_i)$ is the information in one particular outcome; $H$ is the probability-weighted average. A rare symbol can carry 10 bits while the source entropy is under 1.
- **Mixing units.** Entropy in nats uses $\ln$, in bits uses $\log_2$, and in Hartleys uses $\log_{10}$. A problem that says bits requires base 2 — using $\log_{10}$ understates the answer by a factor of 3.32.
- **Comparing coding efficiency against $\log_2 N$ instead of against $H$.** Efficiency is $H/L$. The fixed-length baseline $\lceil\log_2 N\rceil$ is a separate comparison that measures the compression gain, not the code's optimality.
- **Believing Huffman coding can achieve the entropy exactly.** Huffman is optimal among prefix codes but its bound is $H \leq L < H+1$; equality requires all probabilities to be negative powers of two. For the 90/10 source, Huffman gives 1 bit against an entropy of 0.469.
- **Forgetting that entropy is per symbol, not per second.** Multiplying by the symbol rate is a separate step. A source with $H = 2$ bits/symbol at 500 baud carries 1000 bps, and quoting 2 bps is off by the symbol rate.

## See Also

- [[15_Shannon-Hartley_Capacity]]
- [[16_Error_Control_Hamming_and_CRC]]
- [[02_Power_Spectral_Density]]

---

[[13_Matched_Filter_and_Optimum_Detection|⬅ 13]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · [[15_Shannon-Hartley_Capacity|15 ➡]]
