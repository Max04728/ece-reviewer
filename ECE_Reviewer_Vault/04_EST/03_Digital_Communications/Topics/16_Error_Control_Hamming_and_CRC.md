---
id: EST-03-16
title: "Error Control: Hamming and CRC"
part: "04_EST"
area: "03_Digital_Communications"
topic: 16
tier: 1
depth: full
problem_count: 10
prereqs: ["[[14_Information_Theory_and_Entropy]]"]
tags: ["ece", "est", "digital_communications"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 16 — Error Control: Hamming and CRC

> [!abstract] Scope
> Add and check redundancy: build Hamming codes from the parity-bit inequality, compute syndromes to locate an error, and generate CRC check bits by polynomial division over GF(2).

## Core Concept

> [!tip] Intuition
> Error control spends bits to buy distance. Hamming codes place just enough parity bits to name the position of a single error; CRC treats the whole frame as one enormous polynomial and appends the remainder, so a burst of errors leaves a detectable fingerprint.

**The two jobs.** *Error detection* asks only whether something went wrong, and asks for a retransmission. *Error correction* locates and repairs the damage without a retransmission, which is essential on one-way links and on links with long propagation delays. Both work by adding structured redundancy so that the transmitted codewords are far apart in Hamming distance — the number of bit positions in which two codewords differ.

**Hamming distance sets the power of a code.** With minimum distance $d_{min}$, a code can *detect* up to $d_{min}-1$ errors and *correct* up to $t = \lfloor (d_{min}-1)/2 \rfloor$ errors. A code with $d_{min} = 3$ therefore corrects one error and detects two; $d_{min} = 4$ detects three and corrects one but can additionally distinguish single from double errors (SECDED); $d_{min} = 5$ corrects two. Every extra unit of distance costs redundancy, and that trade is the whole design problem.

**Hamming codes are perfect single-error-correcting codes.** The receiver computes an $r$-bit *syndrome* — the pattern of parity-check failures. There are $2^r$ possible syndromes and they must distinguish $m+r$ possibilities: no error, a data bit in error ($m$ positions), or a parity bit in error ($r$ positions). Hence $2^r \geq m + r + 1$, the *Hamming inequality*. Choosing the smallest $r$ that satisfies it and assigning each parity bit to cover a distinct set of positions (the powers of two) makes the syndrome equal the binary index of the errored bit. That is the elegance of the scheme: the syndrome is literally the address of the fault.

**The (7,4) code, concretely.** Four data bits need $2^r \geq 4 + r + 1$; $r = 2$ fails (4 < 7) and $r = 3$ works ($8 \geq 8$). With positions numbered 1 to 7, the parity bits go in positions 1, 2 and 4 and the data bits fill 3, 5, 6 and 7. Parity bit $p_1$ covers positions 1, 3, 5, 7; $p_2$ covers 2, 3, 6, 7; $p_4$ covers 4, 5, 6, 7. Each data position is covered by a unique combination of parity bits that spells its own index in binary — position 3 = 1+2, position 5 = 1+4, position 6 = 2+4, position 7 = 1+2+4.

**CRC is polynomial division over GF(2).** A cyclic redundancy check treats the message bits as coefficients of a polynomial $M(x)$ and divides $x^r M(x)$ by a fixed *generator polynomial* $G(x)$ of degree $r$, using XOR arithmetic with no carries. The $r$-bit remainder becomes the frame check sequence appended to the message. The transmitted polynomial is then exactly divisible by $G(x)$, so the receiver simply divides and checks for a zero remainder. Every CRC is a systematic cyclic code, and the choice of $G(x)$ determines which error patterns are caught.

**What a CRC actually guarantees.** A CRC with generator degree $r$ detects all single-bit errors, all odd numbers of errors if $G(x)$ has $(x+1)$ as a factor, all burst errors of length $r$ or less, and all but a fraction $2^{-r}$ of longer bursts. CRC-16 (the CCITT polynomial $x^{16}+x^{12}+x^5+1$, used by HDLC and PPP) detects all bursts up to 16 bits; CRC-32 catches all bursts up to 32 bits. It is a *detection* code, not a correction code — a CRC failure means retransmit, never repair.

## Derivation

**Why $2^r \geq m + r + 1$.** The receiver's syndrome is an $r$-bit word, so it has $2^r$ distinct values. The decoder must map each of the following to a distinct syndrome: the error-free case (1 value), each of the $m$ data positions in error, and each of the $r$ parity positions in error. No two of these may collide, or the decoder would misdiagnose. Counting gives $1 + m + r \leq 2^r$, which is the Hamming inequality. Solving for the smallest integer $r$ gives the parity-bit count, and the total codeword length is $n = m + r$.

**Encoding the (7,4) code.** Number positions 1 to 7 left to right. Parity bits sit at the powers of two: position 1 ($p_1$), 2 ($p_2$), 4 ($p_4$). Data bits sit at 3 ($d_1$), 5 ($d_2$), 6 ($d_3$), 7 ($d_4$). Using *even* parity, each parity bit is set so that the XOR of the positions it covers is 0: $p_1 = d_1 \oplus d_2 \oplus d_4$, $p_2 = d_1 \oplus d_3 \oplus d_4$, $p_4 = d_2 \oplus d_3 \oplus d_4$. Worked example with data 1011 ($d_1=1, d_2=0, d_3=1, d_4=1$): $p_1 = 1\oplus0\oplus1 = 0$, $p_2 = 1\oplus1\oplus1 = 1$, $p_4 = 0\oplus1\oplus1 = 0$, giving the codeword $p_1p_2d_1p_4d_2d_3d_4 = 0110011$.

**Decoding by syndrome.** The receiver recomputes the same three even-parity checks on the received word: $c_1$ over positions 1,3,5,7; $c_2$ over 2,3,6,7; $c_4$ over 4,5,6,7. Form the syndrome $s = c_4c_2c_1$ read as a binary number. If $s = 0$ the word is error-free (or the error pattern is a codeword). If $s \neq 0$, the *value of $s$ is the index of the errored bit*, because each position's coverage pattern was chosen to spell its own index. Simply flip that bit. Example: received 0111011 gives $c_1=0$, $c_2=0$, $c_4=1$, so $s = 100_2 = 4$; flip position 4 to recover 0110011.

**CRC generation by long division.** Given message $M(x)$ and generator $G(x)$ of degree $r$: (1) append $r$ zeros to the message, which multiplies it by $x^r$; (2) divide the result by $G(x)$ using XOR instead of subtraction, working one leading bit at a time; (3) the $r$-bit remainder is the FCS; (4) append it in place of the zeros. Worked example: $M = 1101$ so $M(x) = x^3+x^2+1$, $G = 1011$ so $G(x) = x^3+x+1$ with $r = 3$. The dividend is $1101000$. Long division gives quotient terms $x^3, x^2, x, 1$ and remainder 1, i.e. `001`. Transmitted codeword: $1101001$, which divides by 1011 with remainder zero.

**Why the remainder check works.** The transmitted polynomial is $T(x) = x^rM(x) + R(x)$ where $R(x)$ is the remainder of $x^rM(x)$ divided by $G(x)$. Over GF(2), subtraction and addition are both XOR, so $x^rM(x) = Q(x)G(x) + R(x)$ implies $T(x) = Q(x)G(x)$, an exact multiple of $G(x)$. The receiver's division therefore yields zero iff no error occurred. If an error polynomial $E(x)$ is added by the channel, the receiver sees remainder $E(x) \bmod G(x)$; that remainder is zero only when $G(x)$ divides $E(x)$, which is precisely the set of undetectable error patterns.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Hamming inequality | $2^r \geq m + r + 1$ | m data bits, r parity bits. Solve for the smallest integer r; n = m + r is the codeword length. |
| Codeword length | $n = m + r$ | Total transmitted bits per block. The code is written as (n, m). |
| Code rate | $R_c = \frac{m}{n} = \frac{m}{m+r}$ | Information bits per transmitted bit. For (7,4) this is 4/7 = 0.571. |
| Redundancy | $\rho = \frac{r}{n}$ | Fraction of transmitted bits spent on parity. For (7,4) this is 3/7 = 0.429. |
| Error correction capability | $t = \left\lfloor \frac{d_{min} - 1}{2} \right\rfloor$ | d_min = 3 corrects 1; d_min = 5 corrects 2. Detection capability is d_min - 1. |
| Hamming (7,4) parity equations | $p_1 = d_1 \oplus d_2 \oplus d_4, \quad p_2 = d_1 \oplus d_3 \oplus d_4, \quad p_4 = d_2 \oplus d_3 \oplus d_4$ | Even parity, data at positions 3, 5, 6, 7. Positions are numbered from 1 at the left. |
| Syndrome decoding | $s = c_4c_2c_1 \ \mathrm{is\ the\ index\ of\ the\ errored\ bit}$ | s = 0 means no detected error. Only valid for a single-error pattern. |
| CRC encoding | $T(x) = x^r M(x) + \left[x^r M(x) \bmod G(x)\right]$ | Over GF(2), where + is XOR. G(x) has degree r, so the remainder has at most r bits. |
| CRC error detection | $\mathrm{error\ detected} \iff T_{received}(x) \bmod G(x) \neq 0$ | Undetectable errors are exactly the multiples of G(x) added by the channel. |
| Burst error detection | $\mathrm{all\ bursts} \leq r\ \mathrm{bits\ detected}; \quad P_{undetected} = 2^{-r}\ \mathrm{for\ longer\ bursts}$ | Requires a generator with a nonzero constant term. CRC-16 catches all bursts up to 16 bits. |
| CRC-16 CCITT polynomial | $G(x) = x^{16} + x^{12} + x^5 + 1$ | Used by HDLC, PPP and X.25. Includes the (x+1) factor, so it catches all odd-bit errors. |
| CRC-32 polynomial | $G(x) = x^{32}+x^{26}+x^{23}+x^{22}+x^{16}+x^{12}+x^{11}+x^{10}+x^8+x^7+x^5+x^4+x^2+x+1$ | Used by Ethernet. Catches all bursts up to 32 bits; detection probability for longer bursts is 1 - 2^-32. |

## Worked Problems

### P1. How many parity bits does a Hamming code need for $8$ data bits, and what is the resulting codeword length?

**Given:** m = 8 data bits

**Solution:**

1. Test r = 3: 2^3 = 8, required m + r + 1 = 8 + 3 + 1 = 12. 8 >= 12 is false
2. Test r = 4: 2^4 = 16, required 8 + 4 + 1 = 13. 16 >= 13 is true
3. Codeword length n = m + r = 8 + 4 = 12

> [!success]- Answer
> **$r = 4$ parity bits, $n = 12$ (a (12,8) code)**

> [!warning] Trap
> Testing $2^r \geq m$ only and answering $r = 3$. The inequality must also cover the $r$ parity positions themselves and the error-free state; dropping the $+r+1$ undercounts by one parity bit.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Test `2^3` → **8** against `8+3+1` → **12**: fails.
> 2. Test `2^4` → **16** against `8+4+1` → **13**: holds, so $r$ = **4**.
> 3. `8+4` → $n$ = **12**, the (12, 8) code.
>
> Testing $2^r \geq m$ alone stops at $r$ = 3; the parity positions and the error-free state add the $+r+1$.

### P2. Find the number of parity bits for a 4-bit data word and state the standard name of the code.

**Given:** m = 4 data bits

**Solution:**

1. Test r = 2: 2^2 = 4, required 4 + 2 + 1 = 7. False
2. Test r = 3: 2^3 = 8, required 4 + 3 + 1 = 8. True (exactly equal)
3. n = 4 + 3 = 7

> [!success]- Answer
> **$r = 3$, the Hamming (7,4) code**

> [!warning] Trap
> Rejecting $r = 3$ because the inequality is an equality. Perfect codes — of which (7,4) is the smallest — use *every* syndrome, so equality is the intended optimum, not a failure.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. Test `2^2` → **4** against `4+2+1` → **7**: fails.
> 2. Test `2^3` → **8** against `4+3+1` → **8**: equality holds, so $r$ = **3** and `4+3` → $n$ = **7**, the Hamming (7,4) code.
>
> Equality is the intended optimum for a perfect code, not a failure — (7,4) uses every one of its 8 syndromes.

### P3. Find the code rate and the redundancy of the Hamming (7,4) code.

**Given:** n = 7; m = 4; r = 3

**Solution:**

1. Code rate = m/n = 4/7 = 0.5714
2. Redundancy = r/n = 3/7 = 0.4286
3. Check: 0.5714 + 0.4286 = 1.000

> [!success]- Answer
> **Rate $= 0.571$, redundancy $= 0.429$**

> [!warning] Trap
> Reporting the rate as $m/r = 4/3 = 1.33$, which exceeds one. The rate is information bits divided by *total* transmitted bits, always less than 1 for a code with redundancy.

### P4. Encode the data word $1011$ with the Hamming (7,4) code using even parity.

**Given:** data = 1011; positions 1..7 with parity at 1, 2, 4; even parity

**Solution:**

1. Assign data: d1 = 1 at position 3, d2 = 0 at position 5, d3 = 1 at position 6, d4 = 1 at position 7
2. p1 (covers 1,3,5,7) = d1 xor d2 xor d4 = 1 xor 0 xor 1 = 0
3. p2 (covers 2,3,6,7) = d1 xor d3 xor d4 = 1 xor 1 xor 1 = 1
4. p4 (covers 4,5,6,7) = d2 xor d3 xor d4 = 0 xor 1 xor 1 = 0
5. Codeword = p1 p2 d1 p4 d2 d3 d4 = 0 1 1 0 0 1 1

> [!success]- Answer
> **$0110011$**

> [!warning] Trap
> Writing the codeword in data-then-parity order as $1011\,010$ instead of interleaving at the power-of-two positions. The position-numbering convention is what makes the syndrome equal the error index; changing the layout breaks decoding.

### P5. The word $0111011$ is received. Use syndrome decoding to find and correct the error.

**Given:** received = 0111011; Hamming (7,4); even parity

**Solution:**

1. c1 over positions 1,3,5,7 = 0 xor 1 xor 0 xor 1 = 0
2. c2 over positions 2,3,6,7 = 1 xor 1 xor 1 xor 1 = 0
3. c4 over positions 4,5,6,7 = 1 xor 0 xor 1 xor 1 = 1
4. Syndrome s = c4 c2 c1 = 100 binary = 4
5. Flip position 4: 0111011 -> 0110011
6. Check the corrected word: parity over 1,3,5,7 = 0; over 2,3,6,7 = 0; over 4,5,6,7 = 0, so the syndrome is now zero

> [!success]- Answer
> **Error at position 4; corrected codeword $0110011$**

> [!warning] Trap
> Reading the syndrome bits in the wrong order ($c_1c_2c_4$ instead of $c_4c_2c_1$) and reporting position 1. The syndrome is a binary number whose most significant bit is the highest-order check; reversing it points at the wrong bit.

### P6. Generate the CRC check bits for the message $1101$ using the generator polynomial $G(x) = x^3 + x + 1$ (binary `1011`).

**Given:** message = 1101; G = 1011 (degree 3)

**Solution:**

1. Append r = 3 zeros: dividend = 1101000
2. 1101 xor 1011 = 0110; bring down the next 0 -> 1100
3. 1100 xor 1011 = 0111; bring down the next 0 -> 1110
4. 1110 xor 1011 = 0101; bring down the next 0 -> 1010
5. 1010 xor 1011 = 0001; no bits left, remainder = 001
6. Transmitted codeword = message followed by remainder = 1101 001

> [!success]- Answer
> **FCS $= 001$, transmitted codeword $= 1101001$**

> [!warning] Trap
> Appending the remainder in place of the shifted zeros but reporting the dividend *plus* the remainder as seven-plus-three bits. The zeros were placeholders: the final frame is exactly $m + r$ bits long.

### P7. Verify that the codeword $1101001$ produces a zero remainder when divided by $1011$.

**Given:** received = 1101001; G = 1011

**Solution:**

1. 1101 xor 1011 = 0110; bring down the next 0 -> 1100
2. 1100 xor 1011 = 0111; bring down the next 0 -> 1110
3. 1110 xor 1011 = 0101; bring down the last 1 -> 1011
4. 1011 xor 1011 = 0000
5. Remainder is 000, so the frame is accepted

> [!success]- Answer
> **Remainder $= 000$ — no error detected**

> [!warning] Trap
> Dividing only the message portion $1101$ and finding a nonzero remainder. The receiver must divide the *entire* received frame including the FCS; dividing the message alone always leaves a nonzero remainder and would reject every good frame.

### P8. A CRC uses a generator polynomial of degree $4$. State which burst errors are always detected and the probability of missing a longer burst.

**Given:** degree r = 4; generator has a nonzero constant term

**Solution:**

1. A burst of length up to r = 4 is always detected
2. For bursts longer than 4 bits, the undetectable fraction is 2^-r = 2^-4
3. So the detection probability is 1 - 0.0625 = 0.9375
4. A degree-4 generator cannot detect all longer bursts, only 93.75% of them

> [!success]- Answer
> **All bursts $\leq 4$ bits detected; longer bursts missed with probability $1/16 = 6.25\%$**

> [!warning] Trap
> Claiming the CRC detects *all* burst errors. Guarantees are bounded by the generator degree: degree $r$ guarantees bursts up to $r$ bits, and beyond that detection becomes probabilistic at $1 - 2^{-r}$.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `2^(-4)` → **0.0625**, the fraction of longer bursts a degree-4 generator misses.
> 2. `1−0.0625` → **0.9375**, so **93.75** % of longer bursts are caught, while all bursts of **4** bits or fewer are always detected.
>
> The guarantee is bounded by the degree: degree $r$ covers bursts up to $r$ bits, and only probabilistically beyond that.

### P9. A code has minimum Hamming distance $d_{min} = 5$. How many errors can it correct and how many can it detect?

**Given:** d_min = 5

**Solution:**

1. Correction: t = floor((d_min - 1)/2) = floor(4/2) = 2
2. Detection: d_min - 1 = 4
3. Interpretation: any 2-bit error is correctable, any 4-bit error is detectable, but a 5-bit error can turn one codeword into another and is invisible

> [!success]- Answer
> **Corrects 2 errors, detects 4**

> [!warning] Trap
> Answering that it corrects 5 or detects 5. The capabilities are not equal to $d_{min}$: correction is $\lfloor(d_{min}-1)/2\rfloor$ because the decision spheres must not overlap, and detection stops one short of $d_{min}$.

### P10. An 8-bit data word is sent using the Hamming code of the first problem, with a single extra overall-parity bit appended. Find the total length, the code rate, and what capability the extra bit adds.

**Given:** m = 8 data bits; r = 4 Hamming parity bits; 1 overall parity bit

**Solution:**

1. Hamming length n = 8 + 4 = 12 with d_min = 3
2. Adding an overall parity bit raises d_min to 4 and the length to 13
3. Code rate = 8/13 = 0.615
4. With d_min = 4 the code is SECDED: it corrects 1 error and simultaneously detects 2, distinguishing a single-bit error from a double-bit error

> [!success]- Answer
> **$n = 13$, rate $= 0.615$, capability SECDED (correct 1, detect 2)**

> [!warning] Trap
> Expecting the extra parity bit to allow correction of two errors. One extra bit can only raise $d_{min}$ from 3 to 4, and $d_{min} = 4$ still gives $t = 1$; correcting two errors needs $d_{min} = 5$ and much more redundancy.

## Traps & Exam Notes

- **Using $2^r \geq m$ instead of $2^r \geq m + r + 1$.** The parity positions themselves can fail and must have their own syndromes, and the error-free case needs one. Dropping the $+r+1$ undercounts parity bits — for $m = 8$ it gives 3 instead of 4.
- **Rejecting the case where the inequality is an equality.** Perfect codes such as (7,4) consume every syndrome exactly. Equality is the optimum, not an invalid edge case.
- **Reversing the syndrome bit order.** The syndrome must be read with the highest-order check as the most significant bit. Reading $c_1c_2c_4$ instead of $c_4c_2c_1$ points at the wrong position and silently corrupts the data.
- **Dividing only the message in a CRC check.** The receiver must divide the whole received frame including the appended FCS. Dividing the bare message leaves a nonzero remainder even on a perfect frame.
- **Believing a CRC corrects errors.** It is a detection code. A nonzero remainder means discard and retransmit — the receiver has no information about *where* the error is, because a CRC is not designed to have the syndrome-as-address property of a Hamming code.
- **Assuming a CRC catches every burst.** A degree-$r$ generator guarantees only bursts of $r$ bits or fewer; longer bursts slip through with probability $2^{-r}$. Only an unbounded generator would catch everything.
- **Confusing detection capability with correction capability.** Detection is $d_{min}-1$, correction is $\lfloor(d_{min}-1)/2\rfloor$. So $d_{min}=3$ corrects 1 but detects 2, and $d_{min}=4$ can detect 3 *or* simultaneously correct 1 and detect 2 (SECDED) — it cannot do both maxima at once. Swapping the two figures changes every follow-up answer.

## See Also

- [[14_Information_Theory_and_Entropy]]
- [[15_Shannon-Hartley_Capacity]]
- [[04_ARQ_Stop-and-Wait,_GBN,_Selective_Repeat]]
- [[05_HDLC_and_PPP]]

---

[[15_Shannon-Hartley_Capacity|⬅ 15]] · [[_MOC_Digital_Communications|MOC]] · [[00_Dashboard|Dashboard]] · *end* ➡
