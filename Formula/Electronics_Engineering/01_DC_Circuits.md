---
title: DC Circuits
part: Electronics Engineering
tags: [ece, elecs, formula-sheet]
topics: 13
---

# DC Circuits

## Part A — Resistive Network Analysis

### 1. Circuit Variables, Ohm's Law and Signs

**Ohm's law ★**

$$V=IR,\qquad I=\frac{V}{R},\qquad R=\frac{V}{I},\qquad G=\frac{1}{R}$$

$V$ in volts (V), $I$ in amperes (A), $R$ in ohms ($\Omega$), $G$ in siemens (S).

**Power and energy ★**

$$P=VI=I^2R=\frac{V^2}{R},\qquad W=\int_{t_1}^{t_2}p\,dt\ \text{(J)}$$

$P$ in watts (W), $W$ in joules (J), $t$ in seconds (s).

**Passive sign convention**

| Quantity | Positive when | Meaning |
|---|---|---|
| $v=+$ at the terminal where $i$ enters | passive | element absorbs power |
| $v=+$ at the terminal where $i$ leaves | active | element delivers power |
| $P=vi>0$ | — | absorbing (load) |
| $P=vi<0$ | — | delivering (source) |

**Charge and current**

$$i=\frac{dq}{dt},\qquad q=\int i\,dt\ \text{(C)}$$

$q$ in coulombs (C); 1 A = 1 C/s. 1 V = 1 J/C.

**Wire resistance and temperature correction ★**

$$R=\frac{\rho L}{A},\qquad R_2=R_1\big[1+\alpha(T_2-T_1)\big]$$

$\rho$ in $\Omega\cdot$m, $L$ in m, $A$ in m²; $\alpha$ in K⁻¹; copper $\rho=1.72\times10^{-8}$ $\Omega\cdot$m, $\alpha=0.00393$ K⁻¹.

**Conditions:** linear time-invariant resistor; passive sign convention assumed for every $P=VI$; all quantities in SI base units; wire and temperature formulas assume a uniform conductor, with $\alpha$ itself weakly temperature-dependent. #dc

---

### 2. KCL, KVL, Series and Parallel Reduction

**Kirchhoff's laws ★**

$$\sum_{k=1}^{n}i_k=0\ \text{(KCL at a node)},\qquad \sum_{k=1}^{m}v_k=0\ \text{(KVL around a loop)}$$

**Series and parallel reductions ★**

| Element | Series | Parallel |
|---|---|---|
| $R$ | $R_{eq}=\sum R_k$ | $\frac{1}{R_{eq}}=\sum\frac{1}{R_k}$ |
| $G$ | $\frac{1}{G_{eq}}=\sum\frac{1}{G_k}$ | $G_{eq}=\sum G_k$ |
| $L$ | $L_{eq}=\sum L_k$ | $\frac{1}{L_{eq}}=\sum\frac{1}{L_k}$ |
| $C$ | $\frac{1}{C_{eq}}=\sum\frac{1}{C_k}$ | $C_{eq}=\sum C_k$ |

**Two-resistor parallel and divider rules ★**

$$R_{eq}=\frac{R_1R_2}{R_1+R_2},\qquad i_1=i\frac{R_2}{R_1+R_2},\qquad v_1=v\frac{R_1}{R_1+R_2}$$

**Conditions:** all elements in a series string carry the same current; all parallel elements share the same voltage; $n$ identical resistors in parallel give $R/n$. #dc

---

### 3. Delta-Wye Transformations

![](https://www.youtube.com/watch?v=XtciQU4KMSg)

*Video: Delta-Wye and Wye-Delta Transformations — Question Solutions, 12:40*

**Delta to Wye ★**, with $\Delta$ resistors $R_{ab},R_{bc},R_{ca}$ and Wye legs $R_a,R_b,R_c$

$$R_a=\frac{R_{ab}R_{ca}}{R_{ab}+R_{bc}+R_{ca}},\qquad R_b=\frac{R_{ab}R_{bc}}{\sum R_\Delta},\qquad R_c=\frac{R_{bc}R_{ca}}{\sum R_\Delta}$$

$\sum R_\Delta=R_{ab}+R_{bc}+R_{ca}$; each result in $\Omega$.

**Wye to Delta ★**

$$R_{ab}=\frac{R_aR_b+R_bR_c+R_cR_a}{R_c},\qquad R_{bc}=\frac{\sum R_aR_b}{R_a},\qquad R_{ca}=\frac{\sum R_aR_b}{R_b}$$

**Balanced case**

$$R_\Delta=3R_Y,\qquad R_Y=\frac{R_\Delta}{3}$$

| Conversion | Rule of thumb |
|---|---|
| $\Delta\to Y$ | leg = (product of the two adjacent $\Delta$ arms) ÷ (sum of all three) |
| $Y\to\Delta$ | arm = (sum of pairwise leg products) ÷ (opposite leg) |
| Balanced | $\Delta$ is 3× the $Y$ value |

**Conditions:** purely resistive and linear; useful only when no series-parallel reduction exists; both networks must be equivalent at the three terminals. #network

---

### 4. Mesh Analysis and Supermesh

![](https://www.youtube.com/watch?v=2pStuMpHVZw)

*Video: Supermesh Analysis — Neso Academy, 7:01*

**Mesh matrix equation ★**

$$\begin{bmatrix}R_{11}&R_{12}&R_{13}\\R_{21}&R_{22}&R_{23}\\R_{31}&R_{32}&R_{33}\end{bmatrix}\begin{bmatrix}i_1\\i_2\\i_3\end{bmatrix}=\begin{bmatrix}v_1\\v_2\\v_3\end{bmatrix}$$

$R_{kk}$ = sum of resistances in mesh $k$ ($\Omega$); $R_{jk}$ = shared resistance, $-$ if currents oppose; $v_k$ = algebraic sum of sources driving mesh $k$ (V).

**Two-mesh solution via Cramer**

$$\Delta=R_{11}R_{22}-R_{12}R_{21},\qquad i_1=\frac{v_1R_{22}-v_2R_{12}}{\Delta},\qquad i_2=\frac{R_{11}v_2-R_{21}v_1}{\Delta}$$

**Supermesh constraint**

$$i_1-i_2=I_s\ \text{(current source shared by meshes 1 and 2)}$$

Write one KVL around the supermesh perimeter, then apply the constraint. #network

**Mesh equation count ★**

$$m=B-N+1\ \text{meshes}$$

$B$ = branches, $N$ = nodes, $m$ = independent KVL loops.

**Conditions:** planar networks only; mesh count $m=B-N+1$ equals the independent-KVL-loop count; current sources are not converted unless a supermesh is formed; all mesh currents defined clockwise for consistent signs.

---

### 5. Nodal Analysis and Supernodes

![](https://www.youtube.com/watch?v=khtZubT9K8E)

*Video: Supernode Analysis Explained for Circuits — Engineer4Free, 6:33*

**Nodal matrix equation ★**

$$\begin{bmatrix}G_{11}&G_{12}&G_{13}\\G_{21}&G_{22}&G_{23}\\G_{31}&G_{32}&G_{33}\end{bmatrix}\begin{bmatrix}v_1\\v_2\\v_3\end{bmatrix}=\begin{bmatrix}i_1\\i_2\\i_3\end{bmatrix}$$

$G_{kk}$ = sum of conductances at node $k$ (S); $G_{jk}$ = negative of the shared conductance; $i_k$ = net current injected into node $k$ (A).

**Two-node closed form ★**

$$v_x=\frac{\sum \frac{V_k}{R_k}+\sum I_s}{\sum \frac{1}{R_k}}\ \text{(node voltage with a common reference)}$$

**Supernode constraint**

$$v_1-v_2=V_s\ \text{(voltage source between nodes 1 and 2)}$$

Combine the two nodes, apply KCL to the supernode, then use the constraint equation. #network

**Essential node equation count ★**

$$n=N-1\ \text{equations, one per non-reference node}$$

Each independent voltage source returned to the reference node removes one unknown, so it reduces the count by one.

**Conditions:** reference node chosen as the negative terminal of the largest source; the essential count is $N-1$ for $N$ nodes, reduced by one for each independent voltage source returned to the reference node; ideal voltage sources are not converted unless a supernode is formed.

---

### 6. Superposition Theorem

![](https://www.youtube.com/watch?v=uoZ0E6zxoi0)

*Video: How to Use Superposition to Solve Circuits — Question Solutions, 12:30*

**Total response ★**

$$i_x=\sum_{k=1}^{n}i_x^{(k)},\qquad v_x=\sum_{k=1}^{n}v_x^{(k)}$$

$i_x^{(k)}$ in A, $v_x^{(k)}$ in V — the contribution of independent source $k$ acting alone.

**Source-killing rules**

| Source type | Deactivated as |
|---|---|
| Ideal voltage source | short circuit ($V=0$) |
| Ideal current source | open circuit ($I=0$) |
| Dependent source | never killed; keep it in every sub-circuit |

**Power warning**

$$P\neq\sum_k P^{(k)}\ \text{in general, because }P\propto i^2,\ v^2$$

**Conditions:** linear circuits only; compute power from the summed total $i$ or $v$; dependent sources stay active in every sub-circuit. #network

---

### 7. Thevenin and Norton Equivalents

![](https://www.youtube.com/watch?v=-kkvqr1wSwA)

*Video: Norton's Theorem and Thevenin's Theorem — The Organic Chemistry Tutor, 11:06*

**Thevenin and Norton ★**

$$V_{Th}=v_{oc}\ \text{(open-circuit voltage)},\qquad R_{Th}=\frac{v_{oc}}{i_{sc}}\ \text{(in }\Omega\text{)}$$

$$I_N=i_{sc},\qquad V_{Th}=I_NR_N,\qquad R_N=R_{Th}$$

**Finding $R_{Th}$**

| Method | Procedure |
|---|---|
| Sources present | $R_{Th}=v_{oc}/i_{sc}$ |
| Independent sources only | kill sources, then reduce to $R_{eq}$ |
| Dependent sources only | apply a test source: $R_{Th}=v_t/i_t$ |

**Maximum values and load form**

$$v_L=V_{Th}\frac{R_L}{R_{Th}+R_L},\qquad i_L=\frac{V_{Th}}{R_{Th}+R_L}$$

**Conditions:** linear two-terminal network; $R_{Th}$ is the resistance seen looking into the terminals with all independent sources killed. #network

---

### 8. Maximum Power Transfer and Source Transformation

![](https://www.youtube.com/watch?v=U85eA3-suiQ)

*Video: Maximum Power Transfer Theorem — Neso Academy, 8:30*

**Maximum power transfer ★**

$$P_{max}=\frac{V_{Th}^2}{4R_{Th}}\ \text{at }R_L=R_{Th}$$

**General load-transfer curve**

$$P_L=\frac{V_{Th}^2R_L}{(R_{Th}+R_L)^2}$$

$P_L$ in W; $P_{max}$ occurs at $R_L=R_{Th}$, giving $\eta=50\%$.

**Efficiency**

$$\eta=\frac{P_L}{P_{total}}=\frac{R_L}{R_{Th}+R_L}$$

**Source transformation ★**

$$V_s=I_sR_p\ \Longleftrightarrow\ I_s=\frac{V_s}{R_s},\qquad R_s=R_p$$

**Conditions:** transformation preserves terminal $v$–$i$; $R_L=R_{Th}$ maximizes power, not efficiency, so $\eta=50\%$ at the peak. #dc

> [!warning] Exam trap
> For a *dependent* source, you may not simply kill it to find $R_{Th}$ — use a test source ($R_{Th}=v_t/i_t$). Also, $R_{Th}<0$ means an active network, not a negative resistor.

---

### 9. Millman's and Tellegen Theorems

**Millman's theorem ★** — parallel branches each with a series source and resistance

$$V_{ab}=\frac{\sum_{k=1}^{n}\frac{V_k}{R_k}}{\sum_{k=1}^{n}\frac{1}{R_k}}=\frac{\sum G_kV_k}{\sum G_k}$$

$V_k$ in V, $R_k$ in $\Omega$; short a branch to represent a branch with no source.

**Millman with current sources**

$$V_{ab}=\frac{\sum G_kV_k+\sum I_k}{\sum G_k}$$

**Tellegen's theorem ★**

$$\sum_{k=1}^{b}v_ki_k=0\ \text{for every network at every instant}$$

**Tellegen power form**

$$\sum_{k=1}^{b}P_k=0=\sum_{\text{absorbed}}P-\sum_{\text{delivered}}P$$

**Conditions:** Millman requires parallel branches each reducible to a source in series with resistance; Tellegen holds for any lumped network satisfying KCL and KVL, linear or nonlinear. #network

## Part B — Energy Storage and Transients

### 10. Inductors, Capacitors and Energy

**Element laws ★**

$$v_C=\frac{1}{C}\int_0^t i_C\,dt+v_C(0),\qquad i_C=C\frac{dv_C}{dt}$$

$$v_L=L\frac{di_L}{dt},\qquad i_L=\frac{1}{L}\int_0^t v_L\,dt+i_L(0)$$

$C$ in farads (F), $L$ in henries (H), $v$ in V, $i$ in A, $t$ in s.

**Stored energy ★**

$$W_C=\frac{1}{2}Cv_C^2=\frac{1}{2}\frac{q^2}{C},\qquad W_L=\frac{1}{2}Li_L^2=\frac{1}{2}\frac{\lambda^2}{L}$$

$W$ in J, $q$ in C, $\lambda$ = flux linkage in Wb-turns.

**Impedance-like behavior and continuity**

| Element | DC steady state | Cannot change abruptly |
|---|---|---|
| Capacitor | open circuit | $v_C$ (voltage) |
| Inductor | short circuit | $i_L$ (current) |

**Energy conservation in a two-element exchange**

$$W=\frac{1}{2}Cv^2+\frac{1}{2}Li^2=\text{constant}\ \text{(ideal }LC\text{)}$$

**Conditions:** ideal linear elements with no leakage; energy is lossless, so a capacitor and inductor may exchange stored energy indefinitely. #dc

---

### 11. First Order RC and RL Transients

![](https://www.youtube.com/watch?v=VTRKByvwVWw)

*Video: Transient Analysis: Series RL and RC Circuits — EETutorials, 8:36*

**General first-order response ★**

$$x(t)=x(\infty)+\big[x(0^+)-x(\infty)\big]e^{-t/\tau}$$

$x$ may be $v_C$ (V) or $i_L$ (A); $x(\infty)$ is the steady-state value.

**Time constants ★**

$$\tau_{RC}=RC\ \text{(s)},\qquad \tau_{RL}=\frac{L}{R}\ \text{(s)}$$

$R$ in $\Omega$, $C$ in F, $L$ in H; $\tau$ always uses the resistance seen by the reactive element.

**Landmark values**

| Time | Percent of final change |
|---|---|
| $t=\tau$ | 63.2% |
| $t=2\tau$ | 86.5% |
| $t=3\tau$ | 95.0% |
| $t=4\tau$ | 98.2% |
| $t=5\tau$ | 99.3% (steady) |

**Switching derivatives**

$$\left.\frac{dv_C}{dt}\right|_{0^+}=\frac{i_C(0^+)}{C},\qquad \left.\frac{di_L}{dt}\right|_{0^+}=\frac{v_L(0^+)}{L}$$

**Conditions:** single storage element (or a single effective $R$–$C$/$R$–$L$ pair); $v_C$ and $i_L$ are continuous, so $x(0^+)=x(0^-)$. #dc

---

### 12. Second Order RLC Natural Response

![](https://www.youtube.com/watch?v=2s7cF3BQShQ)

*Video: Natural Response of a Series RLC Circuit — ECE201msu, 8:35*

**Characteristic equation ★**

$$s^2+2\alpha s+\omega_0^2=0,\qquad s_{1,2}=-\alpha\pm\sqrt{\alpha^2-\omega_0^2}$$

$\alpha$ in Np/s, $\omega_0$ in rad/s; roots $s_{1,2}$ in s⁻¹.

| Topology | $\alpha$ | $\omega_0$ |
|---|---|---|
| Series RLC | $\frac{R}{2L}$ | $\frac{1}{\sqrt{LC}}$ |
| Parallel RLC | $\frac{1}{2RC}$ | $\frac{1}{\sqrt{LC}}$ |

**Damping cases ★**

$$\begin{aligned}
\alpha>\omega_0:\quad & x=A_1e^{s_1t}+A_2e^{s_2t}\ \text{(overdamped)}\\
\alpha=\omega_0:\quad & x=(A_1+A_2t)e^{-\alpha t}\ \text{(critically damped)}\\
\alpha<\omega_0:\quad & x=e^{-\alpha t}\big(A_1\cos\omega_dt+A_2\sin\omega_dt\big)\ \text{(underdamped)}
\end{aligned}$$

**Damped frequency, damping ratio, Q ★**

$$\omega_d=\sqrt{\omega_0^2-\alpha^2}\ \text{(rad/s)},\qquad \zeta=\frac{\alpha}{\omega_0},\qquad Q=\frac{\omega_0}{2\alpha}=\frac{1}{2\zeta}$$

**Conditions:** series or parallel RLC with $R>0$; $x$ denotes $v_C$ or $i_L$; initial values from $v_C(0^+)$ and $i_L(0^+)$ fix $A_1$ and $A_2$. #dc

> [!tip] High-yield ★
> Compare α with ω₀ **first** — that single comparison names the damping case, the formula shape, and whether the response oscillates. Underdamped is by far the most tested.

---

> [!warning] Exam trap
> Series vs parallel RLC swap the $\alpha$ formula: series uses $R/2L$, parallel uses $1/2RC$. Writing one when the other is intended is the most common second-order error.

## Part C — Magnetics

### 13. Mutual Inductance and Coupled Coils

![](https://www.youtube.com/watch?v=cd23wZyhduQ)

*Video: Mutual Inductance and the Dot Convention — Engineering and Donuts, 5:49*

**Mutual inductance and coupling coefficient ★**

$$M=k\sqrt{L_1L_2},\qquad k=\frac{M}{\sqrt{L_1L_2}},\qquad 0\le k\le1$$

$M$ in henries (H), $L_1,L_2$ in H, $k$ dimensionless.

**Dot convention**

| Terminal pair | Induced voltage | Effect |
|---|---|---|
| Current enters both dots | $+M\frac{di_2}{dt}$ adds to $v_1$ | aiding |
| Current enters one dot only | $-M\frac{di_2}{dt}$ subtracts | opposing |
| Dots reversed | sign of $M$ flips | polarity |

**Series connection ★**

$$L_{aid}=L_1+L_2+2M,\qquad L_{opp}=L_1+L_2-2M$$

**Stored energy ★**

$$W=\frac{1}{2}L_1i_1^2+\frac{1}{2}L_2i_2^2\pm Mi_1i_2\ \text{(J)}$$

The $\pm$ sign follows the same dot rule as the series combination.

**Conditions:** linear magnetic circuit with no saturation; $k=1$ is perfect coupling and $k=0$ is no coupling; $M$ in H, currents in A, energy in J; the $+$ sign applies when both currents enter the dotted terminals.

→ Back to [[00_Index]]
