---
title: "Transmission Lines and Waveguides — Drill"
type: drill
area: 05_Transmission_Lines_and_Waveguides
part: 04_EST
seed: 1
count: 8
pool: 50
updated: 2026-09-23
---

# Transmission Lines and Waveguides — Practice Drill

**8 problems** drawn from a pool of 50 across 10 topics.
Deterministically shuffled with seed `1` — regenerate with
`node build/build-drills.mjs --area 05_Transmission_Lines_and_Waveguides --seed 1`.

> [!question] How to use this
> Answer first, on paper. Only then expand the answer callout. Any problem whose trap
> you hit goes on the revisit list — the trap is the whole reason the problem exists.

---

### 1. A load on a $50\ \Omega$ line measures a return loss of $20$ dB. Find $|\Gamma|$, the VSWR and the fraction of power reflected.

**Given:** $Z_0 = 50\ \Omega$; $\mathrm{RL} = 20\ \mathrm{dB}$

> [!success]- Answer
> **$|\Gamma| = 0.1$; $\mathrm{VSWR} = 1.22$; $1\%$ of the power is reflected.**

> [!warning] Trap
> Reading $20$ dB as a power ratio of $100$, giving $|\Gamma| = 0.01$ and VSWR $= 1.02$. Return loss is a *voltage* ratio: it uses $20\log_{10}$, so $20$ dB means the voltage ratio is $0.1$, not $0.01$.

<sub>from EST-05-04</sub>

### 2. For WR-90 ($a = 2.286\ \mathrm{cm}$, $b = 1.016\ \mathrm{cm}$) at $12\ \mathrm{GHz}$: find the $\mathrm{TE}_{10}$ guide wavelength, confirm that $\mathrm{TE}_{20}$ cannot propagate, and give $\lambda_c$ for $\mathrm{TE}_{20}$.

**Given:** f = 12 GHz; a = 0.02286 m; b = 0.01016 m; TE10 f_c = 6.5617 GHz

> [!success]- Answer
> **$\lambda_g = 2.986\ \mathrm{cm}$ for $\mathrm{TE}_{10}$; $\lambda_{c,\mathrm{TE}_{20}} = a = 2.286\ \mathrm{cm}$ with $f_c = 13.12\ \mathrm{GHz}$, so $\mathrm{TE}_{20}$ does not propagate at 12 GHz.**

> [!warning] Trap
> Using $\lambda_c = 2a$ for $\mathrm{TE}_{20}$. The factor 2 belongs to $\mathrm{TE}_{10}$ only; for $\mathrm{TE}_{20}$ the cutoff wavelength collapses to $a$, which is why the single-mode band tops out at $c/a$.

<sub>from EST-05-09</sub>

### 3. Make the same line distortionless by increasing its conductance to $G = 4\ \mathrm{mS/m}$ instead. Find $\alpha$ in Np/m and dB/m, and the loss over 100 m. Compare with the inductance repair.

**Given:** R = 10 Ω/m; L = 250 nH/m; C = 100 pF/m; new G = 4 mS/m

> [!success]- Answer
> **$\alpha = 0.2\ \mathrm{Np/m} = 1.74\ \mathrm{dB/m}$, so 173.7 dB over 100 m. Same pulse shape as the inductance repair, but ten times the attenuation.**

> [!warning] Trap
> Reading 'distortionless' as 'lossless' and answering $\alpha = 0$. The distortionless line has $\alpha = \sqrt{RG}$, which is non-zero by construction: 0.2 Np/m here is 1.74 dB/m, an entirely unusable line. Only $R = G = 0$ gives $\alpha = 0$.

<sub>from EST-05-03</sub>

### 4. Repeat the single-stub design for a $25\ \Omega$ resistive load on the same $50\ \Omega$ line, and identify which solution uses the shortest stub.

**Given:** Z_0 = 50 Ω; Z_L = 25 Ω (pure resistance); shunt, short-circuited stub

> [!success]- Answer
> **Solution 1: $d = 0.098\lambda$ with $l = 0.348\lambda$. Solution 2: $d = 0.402\lambda$ with $l = 0.152\lambda$. The shortest stub ($0.152\lambda$) goes with the *longer* distance.**

> [!warning] Trap
> Assuming the shortest distance and the shortest stub belong together. Here the short stub needs the line to run out to $0.402\lambda$ first. Crossing the two solutions — using $d = 0.098\lambda$ with $l = 0.152\lambda$ — leaves a residual susceptance that gives $Z_{\mathrm{total}} = 16.7 + j23.6\ \Omega$ and a VSWR of 3.73 instead of 1.

<sub>from EST-05-07</sub>

### 5. A $50\ \Omega$ line is terminated in $Z_L = 50 + j50\ \Omega$. Locate the point on the Smith chart and read off $\Gamma$, $|\Gamma|$ and the VSWR.

**Given:** $Z_0 = 50\ \Omega$; $Z_L = 50 + j50\ \Omega$; lossless line

> [!success]- Answer
> **$\Gamma = 0.2 + j0.4 = 0.447\angle 63.4^\circ$; $\mathrm{VSWR} = 2.62$.**

> [!warning] Trap
> Plotting $50 + j50$ without normalizing and landing off the chart. Every chart reading is in normalized units, and the normalized value is $1 + j1$, not $50 + j50$.

<sub>from EST-05-06</sub>

### 6. WR-90 waveguide has $a = 2.286\ \mathrm{cm}$ and $b = 1.016\ \mathrm{cm}$. Find the $\mathrm{TE}_{10}$ cutoff frequency, the cutoff of the next two modes, and state the single-mode band.

**Given:** a = 2.286 cm = 0.02286 m; b = 1.016 cm = 0.01016 m; air-filled, c = 3e8 m/s; a > b

> [!success]- Answer
> **$f_{c,\mathrm{TE}_{10}} = 6.56\ \mathrm{GHz}$; $\mathrm{TE}_{20}$ at $13.12\ \mathrm{GHz}$; $\mathrm{TE}_{01}$ at $14.76\ \mathrm{GHz}$; single-mode band $6.56$–$13.12\ \mathrm{GHz}$.**

> [!warning] Trap
> Substituting $a$ in centimetres. $c = 3\times10^{8}$ is in m/s, so $a$ must be in metres; using 2.286 gives a cutoff off by $10^{2}$ (656 GHz).

<sub>from EST-05-08</sub>

### 7. A lossless line has $L = 250\ \mathrm{nH/m}$ and $C = 100\ \mathrm{pF/m}$. Find $Z_0$, the velocity, the velocity factor, and the wavelength and phase constant at 100 MHz.

**Given:** L = 250 nH/m; C = 100 pF/m; f = 100 MHz; lossless

> [!success]- Answer
> **$Z_0 = 50\ \Omega$, $v = 2.0\times10^{8}\ \mathrm{m/s}$, $\mathrm{VF} = 0.667$, $\lambda = 2.0\ \mathrm{m}$, $\beta = 3.14\ \mathrm{rad/m}$.**

> [!warning] Trap
> Using $c$ for $v$: $\lambda$ comes out 3.0 m and $\beta$ 2.09 rad/m, both 50% wrong, and every stub length computed from them is wrong by the same factor. Also, $\mathrm{VF} = v/c = 0.667$ — an answer of 1.5 is $c/v$, and a velocity factor above 1 is impossible.

<sub>from EST-05-02</sub>

### 8. A 100 m run of the coaxial cable of the first problem ($C = 100.4\ \mathrm{pF/m}$, $L = 250.6\ \mathrm{nH/m}$, $R = 0.415\ \Omega/\mathrm{m}$ at 100 MHz, $v = 1.994\times10^{8}\ \mathrm{m/s}$) carries a 100 MHz signal. Find the total shunt capacitance, the total series resistance and the one-way transit time.

**Given:** l = 100 m; C = 100.4 pF/m; L = 250.6 nH/m; R = 0.415 Ω/m at 100 MHz; v = 1.994e8 m/s

> [!success]- Answer
> **$C_{\mathrm{tot}} \approx 10.0\ \mathrm{nF}$, $R_{\mathrm{tot}} \approx 41.5\ \Omega$, delay $\approx 501\ \mathrm{ns}$.**

> [!warning] Trap
> Answering with the per-metre numbers: 0.415 $\Omega$ total is 100$\times$ low and 0.1 nF total is 100$\times$ low. Using $c$ instead of $v$ for the delay gives 334 ns — 33% short — because $\varepsilon_r = 2.26$ slows the wave by $1/\sqrt{2.26} = 0.665$.

<sub>from EST-05-01</sub>

---

## Sources in this drill

| ID | Topic | Problems available |
| --- | --- | --- |
| EST-05-01 | Primary Constants R, L, G, C | 4 |
| EST-05-02 | Secondary Constants Z0 and Gamma | 4 |
| EST-05-03 | Lossless and Distortionless Lines | 4 |
| EST-05-04 | Reflection Coefficient and VSWR | 9 |
| EST-05-05 | Input Impedance and Quarter-Wave Transformer | 4 |
| EST-05-06 | Smith Chart | 9 |
| EST-05-07 | Stub Matching | 4 |
| EST-05-08 | Waveguide TE and TM Modes | 4 |
| EST-05-09 | Cutoff Frequency and Guide Wavelength | 4 |
| EST-05-10 | Phase and Group Velocity | 4 |

Generated by `build/build-drills.mjs` from the problem records in the topic payloads.
Do not hand-edit: change the source payload and regenerate.
