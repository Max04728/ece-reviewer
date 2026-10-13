---
title: Two Port Networks
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 9
---

# Two Port Networks

## Part A — Parameter Sets

### 1. Two-Port Variables and Conventions

**Port definitions ★**

$$\mathbf{V}_1,\ \mathbf{I}_1\ \text{(input port)},\qquad \mathbf{V}_2,\ \mathbf{I}_2\ \text{(output port)}$$

$\mathbf{V}$ in V, $\mathbf{I}$ in A; currents are conventionally defined **entering** the positive terminal of each port.

**Current direction convention**

| Convention | $I_2$ direction | Typical use |
|---|---|---|
| Network convention | into port 2 | $Z$, $Y$, hybrid, ABCD derivation |
| Load convention | out of port 2 | terminated network with $Z_L$ |
| Relation | $I_2^{net}=-I_2^{load}$ | signs flip between the two |

**Time-domain and s-domain forms**

$$v_1(t)=Z\{i_1,i_2\},\qquad \mathbf{V}_1(s)=\mathbf{Z}(s)\,\mathbf{I}(s)\ \text{(linear, zero initial state)}$$

**Conditions:** linear, time-invariant, no independent internal sources; both ports share a common reference; initial conditions zero for parameter extraction. #network

---

### 2. Z and Y Parameters

![](https://www.youtube.com/watch?v=rzmW9fMBcVo)

*Video: Z-Parameters (Impedance Parameters) — Neso Academy, 14:25*

**Impedance (Z) parameters ★**

$$\begin{bmatrix}\mathbf{V}_1\\\mathbf{V}_2\end{bmatrix}=\begin{bmatrix}z_{11}&z_{12}\\z_{21}&z_{22}\end{bmatrix}\begin{bmatrix}\mathbf{I}_1\\\mathbf{I}_2\end{bmatrix}$$

$$\mathbf{V}_1=z_{11}\mathbf{I}_1+z_{12}\mathbf{I}_2,\qquad \mathbf{V}_2=z_{21}\mathbf{I}_1+z_{22}\mathbf{I}_2$$

$z_{ij}$ in $\Omega$ (open-circuit parameters).

**Z parameter measurement ★**

$$z_{11}=\left.\frac{\mathbf{V}_1}{\mathbf{I}_1}\right|_{\mathbf{I}_2=0},\qquad z_{12}=\left.\frac{\mathbf{V}_1}{\mathbf{I}_2}\right|_{\mathbf{I}_1=0}$$

$$z_{21}=\left.\frac{\mathbf{V}_2}{\mathbf{I}_1}\right|_{\mathbf{I}_2=0},\qquad z_{22}=\left.\frac{\mathbf{V}_2}{\mathbf{I}_2}\right|_{\mathbf{I}_1=0}$$

**Admittance (Y) parameters ★**

$$\begin{bmatrix}\mathbf{I}_1\\\mathbf{I}_2\end{bmatrix}=\begin{bmatrix}y_{11}&y_{12}\\y_{21}&y_{22}\end{bmatrix}\begin{bmatrix}\mathbf{V}_1\\\mathbf{V}_2\end{bmatrix}$$

$y_{ij}$ in S (short-circuit parameters); $\mathbf{Y}=\mathbf{Z}^{-1}$.

**Y parameter measurement**

$$y_{11}=\left.\frac{\mathbf{I}_1}{\mathbf{V}_1}\right|_{\mathbf{V}_2=0},\qquad y_{21}=\left.\frac{\mathbf{I}_2}{\mathbf{V}_1}\right|_{\mathbf{V}_2=0},\qquad y_{22}=\left.\frac{\mathbf{I}_2}{\mathbf{V}_2}\right|_{\mathbf{V}_1=0}$$

**Conditions:** Z parameters require the port not driven to be open-circuited; Y parameters require it short-circuited. #network

> [!warning] Exam trap
> Z and Y are **open-circuit** and **short-circuit** parameters respectively. Applying the wrong terminating condition to measure a parameter is the classic two-port error.

---

### 3. T and Pi Equivalent Networks

![](https://www.youtube.com/watch?v=Uq5kzipEl20)

*Video: Pi Equivalent of a Reciprocal Two-Port Network — Eleventh Hour, 11:00*

**T (Y) equivalent from Z parameters ★**

$$Z_a=z_{11}-z_{12},\qquad Z_b=z_{22}-z_{12},\qquad Z_c=z_{12}=z_{21}$$

$Z_a,Z_b,Z_c$ in $\Omega$; $Z_a$ and $Z_b$ are the series arms, $Z_c$ the shunt arm.

**Pi ($\Pi$) equivalent from Y parameters ★**

$$Y_a=y_{11}+y_{12},\qquad Y_b=y_{22}+y_{12},\qquad Y_c=-y_{12}=-y_{21}$$

$Y_a,Y_b,Y_c$ in S; $Y_c$ is the series arm, $Y_a$ and $Y_b$ the shunt arms.

**T and Pi correspondence**

| T element | Pi element | Relation |
|---|---|---|
| $Z_a=a$ | $Y_b=b$ | series ↔ shunt |
| $Z_b=b$ | $Y_a=a$ | dual positions |
| $Z_c=c$ | $Y_c=c$ | bridging element |

**Delta-Wye duality**

$$Z_{T}=Z_{\Delta}\ \text{reduced by the same relations}$$

See [[01_DC_Circuits#3. Delta-Wye Transformations|Delta-Wye Transformations]].

**Conditions:** T equivalent exists when $z_{12}=z_{21}$ and the network is passive and reciprocal; Pi equivalent needs $\mathbf{Y}$ to exist ($\Delta_Z\neq0$). #network

---

### 4. Hybrid and Inverse Hybrid Parameters

![](https://www.youtube.com/watch?v=bRXQfZMzVJY)

*Video: h-Parameters (Hybrid Parameters) — Neso Academy, 10:45*

**Hybrid (h) parameters ★**

$$\begin{bmatrix}\mathbf{V}_1\\\mathbf{I}_2\end{bmatrix}=\begin{bmatrix}h_{11}&h_{12}\\h_{21}&h_{22}\end{bmatrix}\begin{bmatrix}\mathbf{I}_1\\\mathbf{V}_2\end{bmatrix}$$

$$\mathbf{V}_1=h_{11}\mathbf{I}_1+h_{12}\mathbf{V}_2,\qquad \mathbf{I}_2=h_{21}\mathbf{I}_1+h_{22}\mathbf{V}_2$$

**h parameter definitions ★**

| Parameter | Definition | Unit | Meaning |
|---|---|---|---|
| $h_{11}$ | $\left.\frac{\mathbf{V}_1}{\mathbf{I}_1}\right\rvert_{\mathbf{V}_2=0}$ | $\Omega$ | short-circuit input impedance |
| $h_{12}$ | $\left.\frac{\mathbf{V}_1}{\mathbf{V}_2}\right\rvert_{\mathbf{I}_1=0}$ | dimensionless | reverse voltage ratio |
| $h_{21}$ | $\left.\frac{\mathbf{I}_2}{\mathbf{I}_1}\right\rvert_{\mathbf{V}_2=0}$ | dimensionless | forward current gain $\beta$ |
| $h_{22}$ | $\left.\frac{\mathbf{I}_2}{\mathbf{V}_2}\right\rvert_{\mathbf{I}_1=0}$ | S | open-circuit output admittance |

**Inverse hybrid (g) parameters**

$$\begin{bmatrix}\mathbf{I}_1\\\mathbf{V}_2\end{bmatrix}=\begin{bmatrix}g_{11}&g_{12}\\g_{21}&g_{22}\end{bmatrix}\begin{bmatrix}\mathbf{V}_1\\\mathbf{I}_2\end{bmatrix},\qquad \mathbf{g}=\mathbf{h}^{-1}$$

**BJT connection ★**

CE configuration maps the generic h parameters directly onto the transistor:

$$h_{11}=h_{ie},\qquad h_{12}=h_{re},\qquad h_{21}=h_{fe},\qquad h_{22}=h_{oe}$$

$$h_{ie}=r_\pi\ (\Omega),\qquad h_{re}\ \text{dimensionless},\qquad h_{fe}=\beta\ \text{dimensionless},\qquad h_{oe}=\frac{1}{r_o}\ \text{(S)}$$

**Symbols**

- $r_\pi$ — small-signal input resistance of the CE BJT (base–emitter), in $\Omega$
- $r_o$ — small-signal output resistance of the CE BJT (collector–emitter), in $\Omega$

See [[05_Circuit_Analysis_and_Design#5. BJT Small-Signal h-Parameter Model|BJT Small-Signal h-Parameter Model]].

**Conditions:** h parameters are mixed units — never add $h_{11}$ to $h_{22}$ or $h_{21}$ to $h_{12}$; measured with the appropriate port short- or open-circuited. #network

---

### 5. Transmission ABCD Parameters

![](https://www.youtube.com/watch?v=PWDNPFN6zTc)

*Video: ABCD-Parameters (Transmission Parameters) — Neso Academy, 12:25*

**ABCD equations ★**

$$\begin{bmatrix}\mathbf{V}_1\\\mathbf{I}_1\end{bmatrix}=\begin{bmatrix}A&B\\C&D\end{bmatrix}\begin{bmatrix}\mathbf{V}_2\\-I_2\end{bmatrix}$$

$$\mathbf{V}_1=A\mathbf{V}_2-B\mathbf{I}_2,\qquad \mathbf{I}_1=C\mathbf{V}_2-D\mathbf{I}_2$$

**ABCD definitions ★**

| Parameter | Definition | Unit |
|---|---|---|
| $A$ | $\left.\frac{\mathbf{V}_1}{\mathbf{V}_2}\right\rvert_{\mathbf{I}_2=0}$ | dimensionless |
| $B$ | $\left.\frac{\mathbf{V}_1}{-\mathbf{I}_2}\right\rvert_{\mathbf{V}_2=0}$ | $\Omega$ |
| $C$ | $\left.\frac{\mathbf{I}_1}{\mathbf{V}_2}\right\rvert_{\mathbf{I}_2=0}$ | S |
| $D$ | $\left.\frac{\mathbf{I}_1}{-\mathbf{I}_2}\right\rvert_{\mathbf{V}_2=0}$ | dimensionless |

**Cascade chain ★**

$$\begin{bmatrix}A&B\\C&D\end{bmatrix}=\prod_{k=1}^{n}\begin{bmatrix}A_k&B_k\\C_k&D_k\end{bmatrix}$$

**Element ABCD blocks**

| Element | $A$ | $B$ | $C$ | $D$ |
|---|---|---|---|---|
| Series $Z$ | 1 | $Z$ | 0 | 1 |
| Shunt $Y$ | 1 | 0 | $Y$ | 1 |
| Line/T network | $1+Z_1Y$ | $Z_1+Z_2+Z_1Z_2Y$ | $Y$ | $1+Z_2Y$ |
| Ideal transformer $n$ | $n$ | 0 | 0 | $1/n$ |

**Symbols**

- $Z$ — series impedance of the series-element block, in $\Omega$
- $Y$ — shunt admittance of the shunt-element block, in S
- $Z_1$ — input-side series arm impedance of the T (line) network, in $\Omega$
- $Z_2$ — output-side series arm impedance of the T (line) network, in $\Omega$
- $n$ — ideal transformer turns ratio, dimensionless

**Conditions:** $A$, $B$, $C$, $D$ mix dimensionless, $\Omega$ and S units; $AD-BC=1$ for a reciprocal network. #network

> [!tip] High-yield ★
> For any cascade, multiply the ABCD matrices **left to right in signal order**. Reverse the order and the answer is wrong — this is the single most common ABCD mistake.

---

### 6. Parameter Conversions and Determinants

**Conversion table ★**

| From → To | $\mathbf{Z}$ | $\mathbf{Y}$ | $\mathbf{h}$ | $\mathbf{ABCD}$ |
|---|---|---|---|---|
| $\mathbf{Z}$ | — | $\frac{1}{\Delta_Z}\begin{bmatrix}z_{22}&-z_{12}\\-z_{21}&z_{11}\end{bmatrix}$ | — | — |
| $\mathbf{Y}$ | $\frac{1}{\Delta_Y}\begin{bmatrix}y_{22}&-y_{12}\\-y_{21}&y_{11}\end{bmatrix}$ | — | — | — |
| $z\to h$ | — | — | $h_{11}=\frac{\Delta_Z}{z_{22}}$ | — |
| $z\to ABCD$ | — | — | — | $A=\frac{z_{11}}{z_{21}}$ |

**Key $\mathbf{Z}\to\mathbf{h}$ and $\mathbf{Z}\to\mathbf{ABCD}$ results ★**

$$h_{11}=\frac{\Delta_Z}{z_{22}},\qquad h_{12}=\frac{z_{12}}{z_{22}},\qquad h_{21}=-\frac{z_{21}}{z_{22}},\qquad h_{22}=\frac{1}{z_{22}}$$

$$A=\frac{z_{11}}{z_{21}},\qquad B=\frac{\Delta_Z}{z_{21}},\qquad C=\frac{1}{z_{21}},\qquad D=\frac{z_{22}}{z_{21}}$$

**Determinants and inverse ★**

$$\Delta_Z=z_{11}z_{22}-z_{12}z_{21},\qquad \Delta_Y=y_{11}y_{22}-y_{12}y_{21},\qquad \Delta_Z=\frac{1}{\Delta_Y}$$

$$\Delta_h=h_{11}h_{22}-h_{12}h_{21},\qquad AD-BC=1$$

**Conditions:** conversions assume the source matrix is nonsingular; $\Delta_Z=1/\Delta_Y$, and for a reciprocal network $\Delta_Z\leftrightarrow$ symmetric terms make $z_{12}=z_{21}$. #network

## Part B — Conditions, Interconnections and Termination

### 7. Reciprocity and Symmetry Conditions

**Reciprocity ★**

$$z_{12}=z_{21},\qquad y_{12}=y_{21},\qquad h_{12}=-h_{21},\qquad AD-BC=1$$

**Symmetry ★**

$$z_{11}=z_{22},\qquad y_{11}=y_{22},\qquad A=D,\qquad \Delta_h=1$$

**Condition summary table**

| Property | Condition | Physical meaning |
|---|---|---|
| Reciprocal | $z_{12}=z_{21}$ | same response either direction |
| Symmetric | $z_{11}=z_{22}$ | ports interchangeable |
| Reciprocal + symmetric | $z_{12}=z_{21}$, $z_{11}=z_{22}$ | T/Pi reduce to 2 independent values |
| Lossless | purely reactive $\mathbf{Z}$ | $\mathbf{Z}$ entries purely imaginary |

**Lossless condition**

$$\text{Re}\{z_{ij}\}=0\ \text{for all }i,j,\qquad \sum_k P_k=0$$

**Reciprocity test in the lab**

$$\left.\frac{\mathbf{V}_2}{\mathbf{I}_1}\right|_{\mathbf{I}_2=0}=\left.\frac{\mathbf{V}_1}{\mathbf{I}_2}\right|_{\mathbf{I}_1=0}\ \Longleftrightarrow\ z_{21}=z_{12}$$

**Conditions:** reciprocity holds for any network of $R$, $L$, $C$ and transformers; symmetry additionally needs geometric port symmetry. #network

---

### 8. Interconnections: Series, Parallel, Cascade

**Series interconnection ★**

$$\mathbf{Z}=\mathbf{Z}_a+\mathbf{Z}_b\ \text{(series ports, same current)}$$

Valid only if the interconnection does not violate port current conditions — use a **Brune test** when in doubt.

**Parallel interconnection ★**

$$\mathbf{Y}=\mathbf{Y}_a+\mathbf{Y}_b\ \text{(parallel ports, same voltage)}$$

Requires equal port voltages at both networks; add $\mathbf{Y}$ matrices, not $\mathbf{Z}$.

**Cascade interconnection ★**

$$\mathbf{ABCD}=\mathbf{ABCD}_a\cdot\mathbf{ABCD}_b\ \text{(cascade in signal order)}$$

$$\mathbf{ABCD}=\begin{bmatrix}A_a&B_a\\C_a&D_a\end{bmatrix}\begin{bmatrix}A_b&B_b\\C_b&D_b\end{bmatrix}$$

**Interconnection validity**

| Interconnection | Add | Condition |
|---|---|---|
| Series | $\mathbf{Z}$ | port currents equal; no violation |
| Parallel | $\mathbf{Y}$ | port voltages equal; no violation |
| Cascade | $\mathbf{ABCD}$ | unconditional for linear two-ports |
| Series-parallel | $\mathbf{h}$ | input series, output parallel |

**Conditions:** series and parallel matrix addition is valid only when the port constraint is not violated by the through-connection; cascade is always valid. #network

> [!warning] Exam trap
> Do **not** add Z matrices for a parallel connection or Y matrices for a series connection. Series → Z, parallel → Y, cascade → ABCD.

---

### 9. Terminated Networks and Gains

![](https://www.youtube.com/watch?v=nRbQPHKlM0I)

*Video: Terminated Two-Port Networks — AKGEC Digital School, 27:52*

**Input and output impedance ★**

$$Z_{in}=z_{11}-\frac{z_{12}z_{21}}{z_{22}+Z_L},\qquad Z_{out}=z_{22}-\frac{z_{12}z_{21}}{z_{11}+Z_S}$$

$Z_{in},Z_{out}$ in $\Omega$; $Z_S$ source impedance, $Z_L$ load impedance, both in $\Omega$.

**With ABCD parameters**

$$Z_{in}=\frac{AZ_L+B}{CZ_L+D},\qquad Z_{out}=\frac{DZ_S+B}{CZ_S+A}$$

**Voltage and current gain ★**

$$A_v=\frac{\mathbf{V}_2}{\mathbf{V}_1}=\frac{Z_L}{AZ_L+B},\qquad A_i=\frac{\mathbf{I}_2}{\mathbf{I}_1}=\frac{1}{CZ_L+D}$$

$$A_v=-z_{21}\frac{Z_L}{\Delta_Z+z_{11}Z_L}$$

**Power gain and insertion loss**

$$G_p=\frac{P_L}{P_{in}}=\lvert A_v\rvert^2\frac{Z_{in}}{Z_L},\qquad G_T=\frac{P_L}{P_{avail}}$$

**Symbols**

- $G_p$ — operating power gain (load power over power entering the two-port), dimensionless
- $G_T$ — transducer power gain (load power over power available from the source), dimensionless
- $P_L$ — power delivered to the load, in W
- $P_{in}$ — power entering the input port of the two-port, in W
- $P_{avail}$ — power available from the source (under conjugate match), in W

$$IL=10\log_{10}\frac{P_{L,\text{ref}}}{P_{L,\text{loaded}}}\ \text{(dB)}$$

**Symbols**

- $IL$ — insertion loss, in dB
- $P_{L,\text{ref}}$ — load power in the reference case (two-port removed), in W
- $P_{L,\text{loaded}}$ — load power with the two-port inserted, in W

**Image and matched conditions**

$$Z_{in}=Z_S^*\ \text{and}\ Z_{out}=Z_L^*\ \Rightarrow\ \text{maximum power transfer}$$

**Conditions:** linear two-port driven by $Z_S$ and loaded by $Z_L$; gains are ratios and may be expressed in dB via $20\log_{10}\lvert A_v\rvert$. #network

→ Back to [[00_Index]]
