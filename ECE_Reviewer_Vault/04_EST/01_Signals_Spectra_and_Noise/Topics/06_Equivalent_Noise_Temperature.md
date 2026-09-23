---
id: EST-01-06
title: "Equivalent Noise Temperature"
part: "04_EST"
area: "01_Signals_Spectra_and_Noise"
topic: 6
tier: 2
depth: full
problem_count: 5
prereqs: ["[[05_SNR,_Noise_Factor_and_Noise_Figure]]"]
tags: ["ece", "est", "signals_spectra_and_noise"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 06 — Equivalent Noise Temperature

> [!abstract] Scope
> Convert between noise figure and equivalent noise temperature, and build the system noise temperature of a source plus a receiving chain.

## Core Concept

> [!tip] Intuition
> Noise temperature is bookkeeping with a physical metaphor: instead of saying 'this amplifier adds 2.9e-21 W/Hz of noise', you say 'this amplifier behaves as if a 290 K resistor were bolted to its input'. It is the same number, expressed in a unit that makes cold-source and low-noise systems easy to reason about.

**Definition and the exact conversion.** The equivalent noise temperature $T_e$ of a two-port is the temperature of a matched source that, connected to a *noiseless* version of the same two-port, would produce the same output noise power as the real device does with a noiseless (0 K) source. Because a source at $T_0 = 290\ \mathrm{K}$ delivers $kT_0B$, the relation is $T_e = T_0(F-1)$ and inversely $F = 1 + T_e/T_0$. The three anchors worth memorising:
$$\mathrm{NF}=1\ \mathrm{dB} \leftrightarrow T_e \approx 75\ \mathrm{K}$$

$$\mathrm{NF}=3\ \mathrm{dB} \leftrightarrow T_e = 290\ \mathrm{K}$$
and $T_e = 0$ exactly when $F = 1$. The formula uses $T_0 = 290\ \mathrm{K}$ (the IEEE reference, $17\ \mathrm{^\circ C}$) and not $300\ \mathrm{K}$; at $300\ \mathrm{K}$ a 1 dB noise figure would map to $77.7\ \mathrm{K}$ instead of $75.1\ \mathrm{K}$.

**Why the formalism exists.** $T_e$ is the natural language of low-noise design (radio astronomy, satellite links, cryogenic front ends) because the numbers are additive in the same way temperatures are, and because receivers there have noise figures so close to 0 dB that the dB differences are meaningless:
$$\mathrm{NF}=0.1\ \mathrm{dB}$$
is $T_e = 6.7\ \mathrm{K}$, $\mathrm{NF}=0.5\ \mathrm{dB}$ is $35\ \mathrm{K}$, and the difference between the two is a real, expensive engineering change. It also lets you combine a cold antenna with a warm receiver in one consistent quantity, which the noise-figure view cannot do without an extra correction.

**System noise temperature.** For a source at temperature $T_a$ feeding a receiver of equivalent noise temperature $T_e$ through a lossless connection, the total noise power available at the receiver input is $P_n = k(T_a+T_e)B$, so the relevant quantity is the **system noise temperature** $T_{sys} = T_a + T_e$. $T_a$ is the *source* or *antenna* noise temperature: for an antenna looking at cold sky it can be $10$–$50\ \mathrm{K}$, looking at the sun it can be thousands of kelvin, and looking at the ground it approaches $290\ \mathrm{K}$. $T_e$ is a property of the receiver alone. Confusing the two is the conceptual error this topic exists to prevent: a receiver with $T_e = 50\ \mathrm{K}$ connected to a $290\ \mathrm{K}$ antenna has a system temperature of $340\ \mathrm{K}$, not $50\ \mathrm{K}$.

**Cascading in temperature form.** The Friis noise formula is algebraically identical in temperature, $T_e = T_{e1} + \dfrac{T_{e2}}{G_1} + \dfrac{T_{e3}}{G_1G_2} + \cdots$, with gains as available power ratios. Temperature form is often easier to reason about: a $500\ \mathrm{K}$ second stage behind $20\ \mathrm{dB}$ of gain contributes only $5\ \mathrm{K}$, which makes the first-stage dominance obvious without any dB conversion. A lossy component is not exempt: a matched line at physical temperature $T_p$ with loss ratio $L$ has $T_e = T_p\left(1-\frac{1}{L}\right)$, so a $3\ \mathrm{dB}$ line ($L=2$) at room temperature contributes $145\ \mathrm{K}$. Note that at $T_p = T_0$ this makes $F = 1 + T_e/T_0 = L$, recovering the familiar 'noise figure equals loss' rule.

**Limits and traps in the metaphor.** $T_e$ is a *fictitious* temperature: a $169\ \mathrm{K}$ equivalent temperature does not mean the amplifier is physically cold, and a device cooled to $77\ \mathrm{K}$ still has a positive $T_e$. The conversion $F = 1+T_e/T_0$ is only valid for a source at $T_0$; with a cold source, the correct computation is $P_n = k(T_a + T_e)B$ rather than $F\,kT_0B$. Cascaded temperatures must use gain *ratios* (a $20\ \mathrm{dB}$ block divides by $100$, not by $20$), and a stage with loss has $G<1$, which *amplifies* the noise temperature of everything after it — the reason a lossy cable defeats a good LNA placed behind it.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| Equivalent noise temperature from noise figure | $T_e = T_0 (F - 1)$ | T0 = 290 K, the IEEE reference. F is the dimensionless noise factor, not the dB figure. |
| Noise factor from noise temperature | $F = 1 + \frac{T_e}{T_0}$ | F >= 1 always, since Te >= 0 for any real device. |
| Noise figure from noise temperature | $\mathrm{NF} = 10\log_{10}\left(1 + \frac{T_e}{290}\right)$ | Use 290 K, not 300 K; the difference is about 0.04 dB near 1 dB NF. |
| System noise temperature | $T_{sys} = T_a + T_e$ | Ta is the source/antenna temperature, Te is the receiver's. Lossless connection assumed. |
| Noise power from system temperature | $P_n = k T_{sys} B = k(T_a + T_e)B$ | Use this instead of F k T0 B whenever the source is not at 290 K. |
| Cascaded noise temperature | $T_e = T_{e1} + \frac{T_{e2}}{G_1} + \frac{T_{e3}}{G_1 G_2} + \cdots$ | Gains are power ratios. A loss (G < 1) magnifies later terms. |
| Lossy line / attenuator noise temperature | $T_e = T_p\left(1 - \frac{1}{L}\right) = T_p\frac{L-1}{L}$ | Tp is the physical temperature of the loss, L = 1/G the loss ratio. At Tp = 290 K this gives F = L. |
| Noise temperature from a measurement | $T_e = \frac{N_o}{G k B} - T_0$ | Valid when the source is a matched 290 K termination. N_o is the measured output noise power. |
| Useful low-noise anchors | $0.5\ \mathrm{dB} \approx 35\ \mathrm{K}, \quad 1\ \mathrm{dB} \approx 75\ \mathrm{K}, \quad 3\ \mathrm{dB} = 290\ \mathrm{K}$ | Quick sanity checks for low-noise front ends; each 10x in F is a 2610 K step. |

## Worked Problems

### P1. An amplifier has a noise figure of $2\ \mathrm{dB}$. Find its noise factor and equivalent noise temperature.

**Given:** NF = 2 dB; T0 = 290 K

**Solution:**

1. F = 10^(2/10) = 1.5849
2. Te = T0(F - 1) = 290(0.5849)
3. Te = 169.6 K

> [!success]- Answer
> **F = 1.585; Te = 170 K.**

> [!warning] Trap
> Using Te = 290 x 2 = 580 K (treating the dB number as the ratio), or using T0 = 300 K and getting 175.5 K. Convert dB to a ratio first.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(2÷10)` → **1.5849** = $F$.
> 2. `290×(Ans-1)` → $T_e$ = **169.6** K ≈ **170** K.
> 3. `10log(1+169.6÷290)` → **2.000** dB, the inverse check back to the stated NF.
>
> $T_0$ = 290 K is the IEEE reference, not 300 K; 300 K would give 175.5 K for the same 2 dB figure.

### P2. A two-stage receiver has $T_{e1} = 100\ \mathrm{K}$ with $G_1 = 20\ \mathrm{dB}$, followed by a stage with $T_{e2} = 500\ \mathrm{K}$. Find the overall equivalent noise temperature and the overall noise figure.

**Given:** Te1 = 100 K; G1 = 20 dB; Te2 = 500 K

**Solution:**

1. G1 as a ratio = 10^(20/10) = 100
2. Te = Te1 + Te2/G1 = 100 + 500/100
3. Te = 105 K
4. F = 1 + Te/T0 = 1 + 105/290 = 1.3621
5. NF = 10 log10(1.3621) = 1.34 dB

> [!success]- Answer
> **Te = 105 K; NF = 1.34 dB.**

> [!warning] Trap
> Dividing by 20 instead of 100 (using dB gain as a ratio) gives Te = 125 K and NF = 1.60 dB. Also: do not add the noise figures 1.34 dB... any direct dB addition here is wrong.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(20÷10)` → **100** = $G_1$ as a ratio (never divide by the 20 dB figure).
> 2. `100+500÷100` → $T_e$ = **105** K.
> 3. `10log(1+105÷290)` → **1.342** dB ≈ **1.34** dB.
>
> Dividing by 20 instead of 100 gives 125 K and 1.60 dB — the trap the note calls out.

### P3. A $3\ \mathrm{dB}$ lossy feedline at $290\ \mathrm{K}$ connects an antenna to an LNA with $T_e = 60\ \mathrm{K}$ and $20\ \mathrm{dB}$ gain. Find the system noise temperature with the LNA after the line and with the LNA before the line.

**Given:** feedline loss = 3 dB (L = 2, G = 0.5); Tp = 290 K; Te,LNA = 60 K; G_LNA = 20 dB

**Solution:**

1. Line noise temperature: Te,line = Tp(1 - 1/L) = 290(1 - 0.5) = 145 K
2. Case A, line first: Te = 145 + 60/0.5 = 145 + 120 = 265 K
3. NF_A = 10 log10(1 + 265/290) = 10 log10(1.9138) = 2.82 dB
4. Case B, LNA first: G_LNA = 100, so Te = 60 + 145/100 = 61.45 K
5. NF_B = 10 log10(1 + 61.45/290) = 10 log10(1.2119) = 0.83 dB

> [!success]- Answer
> **Line first: Tsys contribution Te = 265 K (NF 2.82 dB). LNA first: Te = 61.5 K (NF 0.83 dB).**

> [!warning] Trap
> Adding 145 K + 60 K = 205 K in case A. Because the line has loss (G = 0.5), the LNA's 60 K is divided by 0.5 and becomes 120 K, not 60 K — a loss multiplies the downstream noise temperature.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `290×(1-1÷2)` → $T_{e,\mathrm{line}}$ = **145** K (loss $L$ = 2).
> 2. `145+60÷0.5` → **265** K with the line first; `10log(1+Ans÷290)` → **2.82** dB.
> 3. `60+145÷100` → **61.45** K with the LNA first; `10log(1+Ans÷290)` → **0.83** dB.
>
> With $G$ = 0.5 the line doubles the LNA's downstream contribution to 120 K, so 145 + 60 = 205 K is the trap.

### P4. An amplifier with $30\ \mathrm{dB}$ gain and a $1\ \mathrm{MHz}$ noise bandwidth delivers $-81\ \mathrm{dBm}$ of noise to a matched load when its input is terminated in a matched $290\ \mathrm{K}$ resistor. Find its noise factor, noise figure and equivalent noise temperature.

**Given:** No = -81 dBm; G = 30 dB; B = 1 MHz; source at 290 K

**Solution:**

1. Convert: G = 1000; No = 10^(-8.1) mW = 7.943e-9 mW = 7.943e-12 W
2. Source noise: kT0B = (1.38e-23)(290)(1e6) = 4.002e-15 W
3. F = No/(G kT0B) = 7.943e-12 / (1000 x 4.002e-15) = 1.985
4. NF = 10 log10(1.985) = 2.98 dB
5. Te = 290(1.985 - 1) = 285.6 K

> [!success]- Answer
> **F = 1.98; NF = 2.98 dB; Te = 286 K.**

> [!warning] Trap
> Forgetting the gain: F = No/(kT0B) alone gives 1985, a nonsensical '60 dB noise figure'. The output noise must be referred back through the gain before comparing with the source noise.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `10^(30÷10) : 10^(-81÷10)` → **1000** ($G$) → **7.943E-9** mW = **7.943E-12** W ($N_o$).
> 2. `7.943E-12÷(1000×k×290×1E6)` with $k$ = `SHIFT` `CVALUE` `25` → $F$ = **1.9839** ≈ **1.98**; `10log(Ans)` → **2.975** dB ≈ **2.98** dB.
> 3. `290×(1.9839-1)` → $T_e$ = **285.3** K.
>
> `SHIFT` `CVALUE` 25 is k = 1.380649e-23; the note's rounded 1.38e-23 gives F = 1.9848 and Te = 285.6 K, printed as 286 K.

### P5. An antenna with a noise temperature of $100\ \mathrm{K}$ feeds a receiver with $T_e = 50\ \mathrm{K}$ and a $1\ \mathrm{MHz}$ bandwidth. Find the system noise temperature and the available noise power in dBm. What if the antenna instead looks at the ground at $290\ \mathrm{K}$?

**Given:** Ta = 100 K; Te = 50 K; B = 1 MHz

**Solution:**

1. Tsys = Ta + Te = 100 + 50 = 150 K
2. Pn = kTsysB = (1.38e-23)(150)(1e6) = 2.07e-15 W
3. In dBm: 10 log10(2.07e-15 / 1e-3) = -116.8 dBm
4. Ground case: Tsys = 290 + 50 = 340 K, Pn = (1.38e-23)(340)(1e6) = 4.69e-15 W = -113.3 dBm
5. Difference = 10 log10(340/150) = 3.55 dB

> [!success]- Answer
> **Sky: Tsys = 150 K, Pn = -116.8 dBm. Ground: Tsys = 340 K, Pn = -113.3 dBm, a 3.55 dB penalty.**

> [!warning] Trap
> Using the -174 dBm/Hz constant with Tsys, or using F kT0B with a 100 K antenna. The -174 figure embeds 290 K; for a cold source the only correct route is k(Ta+Te)B.

> [!tip]- Calculator technique (Canon F-789SGA) — COMP
> 1. `100+50` → $T_{\mathrm{sys}}$ = **150** K; `k×150×1E6` → **2.071E-15** W; `10log(Ans÷1E-3)` → **-116.8** dBm.
> 2. `290+50` → **340** K; `k×340×1E6` → **4.694E-15** W = **-113.3** dBm for the ground case.
> 3. `10log(340÷150)` → **3.55** dB penalty.
>
> With a 100 K antenna the -174 dBm/Hz constant is invalid because it embeds 290 K; only $k(T_a+T_e)B$ is correct.

## Traps & Exam Notes

- **Treating $T_e$ as a physical temperature.** It is a fictitious input-referred temperature. An amplifier with $T_e = 170\ \mathrm{K}$ is not cold, and cryogenically cooling a device reduces but never eliminates its $T_e$.
- **Adding $T_a$ and $T_e$ when the source temperature is the real issue.** System noise temperature is $T_a + T_e$; using $T_e$ alone (or $290 + T_e$) ignores the antenna, which in satellite and radio-astronomy work is often the dominant term.
- **Using the wrong reference temperature.** $F = 1 + T_e/T_0$ with $T_0 = 290\ \mathrm{K}$ (IEEE). Substituting 300 K, or substituting the *source* temperature for $T_0$, breaks every conversion.
- **Forgetting the +1 when going from $T_e$ to $F$.** $F = 1 + T_e/T_0$; reporting $F = T_e/T_0$ loses the always-present source noise and makes a 60 K receiver look like 0.21 instead of 1.21.
- **Dividing by gain in dB inside the cascade.** $T_e = T_{e1} + T_{e2}/G_1$ needs $G_1 = 100$ for 20 dB. Using 20 inflates the second-stage contribution five-fold.
- **Ignoring that a loss multiplies downstream noise temperature.** With $G<1$ the term $T_{e2}/G_1$ grows: a 3 dB pad doubles the noise temperature of everything after it, and its own $T_p(1-1/L)$ is added on top.
- **Mixing noise temperature with noise power.** $T_e$ is in kelvin and $P_n$ in watts; the bridge is $P_n = kT_{sys}B$, and only at $T = 290\ \mathrm{K}$ does the $-174\ \mathrm{dBm/Hz}$ shortcut apply.

## See Also

- [[05_SNR,_Noise_Factor_and_Noise_Figure]]
- [[07_Friis_Cascaded_Noise_Formula]]
- [[03_Thermal_and_Johnson_Noise]]
- [[12_Superheterodyne_Receiver]]

---

[[05_SNR,_Noise_Factor_and_Noise_Figure|⬅ 05]] · [[_MOC_Signals_Spectra_and_Noise|MOC]] · [[00_Dashboard|Dashboard]] · [[07_Friis_Cascaded_Noise_Formula|07 ➡]]
