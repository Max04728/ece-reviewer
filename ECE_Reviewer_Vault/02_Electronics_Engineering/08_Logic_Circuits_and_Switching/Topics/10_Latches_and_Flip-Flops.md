---
id: ECE-08-10
title: "Latches and Flip-Flops"
part: "02_Electronics_Engineering"
area: "08_Logic_Circuits_and_Switching"
topic: 10
tier: 2
depth: full
problem_count: 5
prereqs: ["[[04_Boolean_Algebra_and_De_Morgan]]"]
tags: ["ece", "electronics_engineering", "logic_circuits_and_switching"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 10 — Latches and Flip-Flops

> [!abstract] Scope
> Build bistable storage from cross-coupled gates, and distinguish level-sensitive latches from edge-triggered D, JK and T flip-flops.

## Core Concept

> [!tip] Intuition
> Two cross-coupled NOR or NAND gates have two stable states, so the circuit remembers which input was pulsed last. Adding a clock turns that memory into a device that either follows its input (latch) or samples it in an instant (flip-flop).

**The SR latch is the primitive.** Cross-couple two NOR gates: the output of each feeds back into the other. Setting $S=1$ forces $Q=1$; setting $R=1$ forces $Q=0$; with $S=R=0$ the feedback holds whatever state was last written. The characteristic equation is $Q^+ = S + \bar R Q$ with the constraint $SR = 0$. A NAND-based latch works with inverted inputs and the opposite constraint: $Q^+ = \bar S + R Q$ with $\bar S\,\bar R \neq 1$, meaning at least one input must be high. Confusing the two conventions is the single most common SR-latch error.

**The forbidden state.** On a NOR latch, $S=R=1$ drives both outputs to 0, which violates the $Q$ and $\bar Q$ complement relationship. Worse, if both inputs return to 0 at the same instant the cross-coupled pair races and settles unpredictably — whichever gate is faster wins. On a NAND latch the forbidden input is $S=R=0$ (both asserted low), which drives both outputs to 1. The problem is not the simultaneous assertion itself but the unpredictable resolution when it is released.

**Gated (level-sensitive) latches.** Adding an enable input makes the latch transparent while enabled:
$$Q^+ = D\cdot EN + Q\cdot \overline{EN}$$
for a gated D latch. While $EN = 1$ the output follows $D$ with only a gate delay; while $EN = 0$ it holds. That transparency is a hazard in synchronous design, because any glitch on $D$ during the enable window propagates straight to the output and can be clocked by downstream logic.

**Edge-triggered flip-flops.** A flip-flop samples its input only at the active clock edge — rising or falling — and is otherwise frozen. A D flip-flop obeys $Q^+ = D$ at the edge. The JK flip-flop removes the SR forbidden state by defining it as *toggle*:
$$Q^+ = J\bar Q + \bar K Q$$
so $J=K=1$ flips the stored bit, $J=K=0$ holds, $J=1$ sets and $K=1$ resets. The T flip-flop is the toggle-only special case, $Q^+ = T\oplus Q$, and is simply a JK with both inputs tied together.

**Characteristic tables as a design tool.** Each flip-flop type has a characteristic table giving the next state for every input combination. Run backwards it becomes the **excitation table**, which says what inputs are needed to force a desired transition; that is the tool used to design counters and state machines. For a D flip-flop the excitation is trivial: $D = Q^+$. For JK, a $0\to0$ transition requires $J=0$ (with $K$ a don't-care), $0\to1$ requires $J=1$, $1\to0$ requires $K=1$, and $1\to1$ requires $K=0$.

**Latch versus flip-flop in one line.** A latch is level-sensitive and transparent for half a clock period, so its output can change several times per cycle. A flip-flop is edge-triggered and changes at most once per clock edge. Systems built from latches must be two-phase (non-overlapping clocks) or carefully hazard-analysed; systems built from flip-flops need only meet setup and hold at each edge.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| NOR-based SR latch | $Q^+ = S + \bar R Q$ | Valid for SR = 0. S=1 sets, R=1 resets. Inputs are active-high. |
| NAND-based SR latch | $Q^+ = \bar S + R Q$ | Inputs are active-low; the forbidden case is S = R = 0 (both asserted). |
| Gated D latch | $Q^+ = D\,EN + Q\,\overline{EN}$ | Level-sensitive: transparent while EN = 1. Glitches on D pass through during the enable window. |
| D flip-flop | $Q^+ = D$ | Evaluated only at the active clock edge. The simplest characteristic equation and the easiest to design with. |
| JK flip-flop | $Q^+ = J\bar Q + \bar K Q$ | J=K=1 toggles, J=K=0 holds. Removes the SR forbidden state by defining it as toggle. |
| T flip-flop | $Q^+ = T \oplus Q$ | Toggle when T = 1, hold when T = 0. Equivalent to a JK with J = K = T. |
| JK as SR | $J = S,\quad K = R$ | The SR function is a JK that never applies J = K = 1. The JK is strictly more general. |
| D excitation | $D = Q^+$ | Whatever next state is wanted, drive it on D. Trivial excitation makes D the usual choice for FSMs. |
| JK excitation table | $0\to0: J=0,K=X;\ 0\to1: J=1,K=X;\ 1\to0: J=X,K=1;\ 1\to1: J=X,K=0$ | X means don't-care, which is what gives JK designs extra minimisation freedom. |

## Worked Problems

### P1. A NOR-based SR latch is holding $Q=0$. The inputs go to $S=1$, $R=0$, then back to $S=R=0$. Give the state after each step.

**Given:** initial state Q = 0; NOR latch; S=1 then R=0; then S=R=0

**Solution:**

1. With S=1 the lower NOR gate is forced to 0, so Q-bar = 0
2. With R=0 and Q-bar = 0, the upper NOR gate has both inputs 0, so Q = 1
3. Applying S=R=0 leaves the cross-coupled pair in its present state: Q stays 1
4. The latch has stored a 1

> [!success]- Answer
> **After the set pulse $Q = 1$; with $S=R=0$ the state holds at $Q = 1$**

> [!warning] Trap
> Assuming the latch returns to 0 when the set pulse is removed. The $S=R=0$ condition is the *hold* state for a NOR latch, not a reset state.

### P2. On the same NOR latch, $S$ and $R$ are both taken to 1 and then both returned to 0 simultaneously. Describe $Q$ and $\bar Q$ during the pulse and the next state.

**Given:** S = 1; R = 1; then S = R = 0 at the same instant

**Solution:**

1. With S=1, the gate producing Q-bar is forced to 0
2. With R=1, the gate producing Q is forced to 0
3. So Q = 0 and Q-bar = 0, which violates the complement relationship
4. When both inputs are released together, both gates see their inputs change at once
5. The cross-coupled loop races, and the winner depends on gate delays and mismatch
6. The next state is therefore unpredictable and may even be metastable for a short time

> [!success]- Answer
> **Both outputs are 0 during the pulse; the released state is indeterminate (race)**

> [!warning] Trap
> Calling the $S=R=1$ condition a 'both set and reset' state with a defined result. The forbidden state is not a valid storage state, and the danger is the race at release, not the pulse itself.

### P3. A JK flip-flop has $Q=0$. Find $Q^+$ for (a) $J=1$, $K=1$; (b) $J=0$, $K=1$; (c) $J=K=0$.

**Given:** Q = 0; JK flip-flop; three input cases

**Solution:**

1. (a) J=K=1: Q+ = J(NOT Q) + (NOT K)Q = 1(1) + 0(0) = 1, so the flip-flop toggles from 0 to 1
2. (b) J=0, K=1: Q+ = 0(1) + 0(0) = 0, so it resets and stays at 0
3. (c) J=K=0: Q+ = 0(1) + 1(0) = 0, so it holds the previous 0
4. Check against the characteristic table: 1/1 toggle, 0/1 reset, 0/0 hold

> [!success]- Answer
> **(a) $Q^+ = 1$ (toggle), (b) $Q^+ = 0$ (reset), (c) $Q^+ = 0$ (hold)**

> [!warning] Trap
> Treating $J=K=1$ as the forbidden state. In a JK flip-flop it is explicitly defined as toggle; the forbidden state belongs to the SR latch only.

### P4. A T flip-flop with $Q=1$ receives $T=1$ for two clock pulses and then $T=0$ for one pulse. Give $Q$ after each pulse.

**Given:** Q initial = 1; T sequence = 1, 1, 0

**Solution:**

1. Pulse 1, T=1: Q+ = T XOR Q = 1 XOR 1 = 0
2. Pulse 2, T=1: Q+ = 1 XOR 0 = 1
3. Pulse 3, T=0: Q+ = 0 XOR 1 = 1 (hold)
4. So the sequence is 1 -> 0 -> 1 -> 1

> [!success]- Answer
> **$Q$: $1 \to 0 \to 1 \to 1$ (toggles twice, then holds)**

> [!warning] Trap
> Toggling on every clock regardless of T. $T=0$ holds the state; a T flip-flop is not a free-running divide-by-two unless T is tied high.

### P5. A gated D latch has $EN$ high from $t=0$ to $t=20$ ns. $D=1$ from 0 to 15 ns and 0 afterwards. Give $Q$ at $t=10$ ns, $t=17$ ns and $t=25$ ns, and compare with an edge-triggered D flip-flop clocked at $t=20$ ns.

**Given:** EN = 1 from 0 to 20 ns; D = 1 until 15 ns, then 0; edge at t = 20 ns

**Solution:**

1. At t=10 ns the latch is transparent and D=1, so Q=1
2. At t=17 ns the latch is still transparent and D has fallen to 0, so Q=0
3. EN falls at 20 ns, after which the latch holds: Q stays 0 at t=25 ns even if D changes
4. An edge-triggered D flip-flop clocked at t=20 ns samples D=0 at that instant and also stores 0
5. If the same flip-flop had been clocked at t=10 ns it would have stored 1, which the latch could not have done after 15 ns

> [!success]- Answer
> **Latch: $Q = 1, 0, 0$; the flip-flop clocked at 20 ns stores 0**

> [!warning] Trap
> Treating the latch as if it sampled at the falling edge of EN. A latch is transparent for the whole enable window, so the *last* value of D before EN falls is what gets stored.

## Traps & Exam Notes

- **Mixing the SR conventions.** A NOR latch is set by $S=1$ and has forbidden input $S=R=1$; a NAND latch is set by $S=0$ and has forbidden input $S=R=0$. Reading the wrong one inverts every answer.
- **Assuming the forbidden state is benign.** Both outputs equal during the pulse and the state is unpredictable at release, because the cross-coupled loop races. Never design a circuit that releases both inputs simultaneously.
- **Calling $J=K=1$ forbidden.** The JK flip-flop defines that combination as toggle. The forbidden state exists only in the SR latch.
- **Treating a latch as edge-triggered.** A gated latch is transparent while enabled, so input glitches propagate. Only flip-flops sample at an edge.
- **Forgetting that a T flip-flop needs T=1.** With T tied low the flip-flop holds; a divide-by-two needs T tied high or fed from the output logic.
- **Building a JK from an SR latch without removing the forbidden case.** Tying $J=S$, $K=R$ leaves the race intact; the feedback of $Q$ and $\bar Q$ into the input gates is what makes $J=K=1$ a toggle.
- **Ignoring the complementary outputs.** In a real latch $Q$ and $\bar Q$ are both brought out, and after a forbidden pulse they can both be 0 (NOR) or both 1 (NAND) until the loop settles.

## See Also

- [[11_Flip-Flop_Timing,_Setup_and_Hold]]
- [[13_Asynchronous_and_Synchronous_Counters]]
- [[14_Finite_State_Machines]]
- [[12_Shift_Registers]]

---

[[09_Multiplexers_and_Demultiplexers|⬅ 09]] · [[_MOC_Logic_Circuits_and_Switching|MOC]] · [[00_Dashboard|Dashboard]] · [[11_Flip-Flop_Timing,_Setup_and_Hold|11 ➡]]
