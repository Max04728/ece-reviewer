---
title: CHANGELOG_reordering
type: meta
updated: 2026-09-23
---

# CHANGELOG — topic reordering and restructuring

Records the deliberate deviations from a naive numbered ordering, so a future reader
does not "fix" them back. **The file tree is the source of truth**; this file is the
rationale, not a second copy of the ordering.

## Part renumbering

| Part | Was | Now | Why |
| --- | --- | --- | --- |
| Electromagnetics | 07 | **05** | sits with Mathematics; Fields before Control/Systems |
| Control Systems | 08 | **06** | follows Electromagnetics |
| Signals and Systems | 09 | **07** | follows Control |
| Numerical Methods and Analysis | 05 | **08** | tooling belongs after the calculus it serves |
| Engineering Data Analysis | 06 | **09** | last maths area; feeds EST |

## Within-area moves

### Mathematics

| Area | Move | Reason |
| --- | --- | --- |
| Integral Calculus | Definite Integrals and FTC moved to §03 | FTC is the conceptual pivot; must precede techniques |
| Differential Equations | Linear First Order moved to §02 | highest-yield standard form after separation |
| Advanced Engineering Math | Complex Numbers to §01, Cauchy-Riemann §02 | complex foundations gate everything after |
| Advanced Engineering Math | Bessel (§14), Legendre (§15) after Fourier | they are series solutions; Fourier first |
| Engineering Data Analysis | Sampling Techniques moved down to §09 | needs distributions before sampling |

### Electronics Engineering

| Area | Move | Reason |
| --- | --- | --- |
| Two-Port Networks | T and Pi equivalents to §03 | equivalent networks before parameter sets |
| Circuit Analysis and Design | Load Lines and Q Point to §02 | Q-point before bias stability |
| Circuit Analysis and Design | **BJT h-parameter model moved in from Two-Port Networks** | it is an amplifier model, not a two-port topic |
| Power Electronics | Thermal Resistance moved to §02 | heat sinking gates switch selection |
| Logic Circuits | Logic Families moved to §16 (end) | interfacing is a synthesis topic |
| Two-Port Networks | BJT h-parameter topic removed | consolidated into ECE-05 §05 |
| Power Electronics | Noise topics removed | consolidated in EST-01 §03–07, cross-linked |

### GEAS

| Area | Move | Reason |
| --- | --- | --- |
| General Chemistry | Chemical Bonding to §03 | bonding explains periodic trends and formulas |

### EST

| Area | Move | Reason |
| --- | --- | --- |
| Principles of Communications | Pre-Emphasis/De-Emphasis to §11 | belongs beside the receiver block |
| Transmission Lines | Smith Chart to §06 | needed by stub matching at §07 |
| Antennas | FSPL and Friis to §06 | link budget before propagation modes |

## Topics added

| ID | Topic | Area | Why |
| --- | --- | --- | --- |
| MATH-02-08 | Average Value and MVT for Integrals | Integral Calculus | paired with the Differential MVT note |
| MATH-05-21 | Reflection and Transmission at Boundaries | Electromagnetics | was missing between lossy media and Poynting |
| MATH-06-13 | Lead-Lag Compensator Design | Control Systems | design counterpart to PID |
| MATH-06-14 | State Space Representation Basics | Control Systems | bridges to modern control |
| MATH-07-11 | CT Fourier and Laplace as System Tools | Signals and Systems | frequency-domain bridge to EST |
| EST-02-09 | FM Noise and Threshold Effect | Principles of Communications | high-yield; was only implied |
| EST-02-10 | AM vs FM Noise Comparison | Principles of Communications | standard board comparison |
| EST-03-07 | Inter-Symbol Interference and Nyquist Criterion | Digital Communications | required before eye diagrams |
| EST-03-08 | Eye Diagrams and Equalization | Digital Communications | standard diagnostic tool |
| EST-03-13 | Matched Filter and Optimum Detection | Digital Communications | BER section depends on it |
| EST-04-08 | Switching: Circuit vs Packet | Data Communications | foundational, was missing |
| EST-04-12 | Routing Algorithms | Data Communications | was missing between IPv6 and TCP/UDP |
| EST-06-11 | Radar Range Equation and Microwave Links | Antennas | was missing |

## Rules

1. `CHANGELOG_reordering.md` explains **why**; the file tree records **what**.
2. Do not renumber to "tidy" an area. Renumbering invalidates IDs, cross-links and
   every `Sets/` drill reference.
3. Adding a topic appends at the end of its area unless it is a prerequisite, in which
   case it goes before its dependents and the shift is recorded here.
