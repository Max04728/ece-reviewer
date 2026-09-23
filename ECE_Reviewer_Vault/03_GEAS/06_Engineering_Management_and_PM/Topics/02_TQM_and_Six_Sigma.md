---
id: GEAS-06-02
title: "TQM and Six Sigma"
part: "03_GEAS"
area: "06_Engineering_Management_and_PM"
topic: 2
tier: 3
depth: full
problem_count: 0
prereqs: []
tags: ["ece", "geas", "engineering_management_and_pm"]
status: not-started
confidence: 0
updated: 2026-09-23
---

# 02 — TQM and Six Sigma

> [!abstract] Scope
> What TQM requires of a process, what each quality guru is known for, and how Six Sigma's sigma level, DPMO and Cp/Cpk numbers are defined and compared.

## Core Concept

> [!tip] Intuition
> Quality is designed into the process, not inspected into the product. Six Sigma turns 'how good is this process?' into one number — how many standard deviations fit between the mean and the nearest specification limit.

**TQM principles and the improvement loop.** Total Quality Management means customer focus, continuous improvement, employee involvement, fact-based (not opinion-based) decisions and a process view of the work. The improvement engine is the **PDCA** cycle: Plan a change, Do it on a small scale, Check the results against the prediction, Act to standardize or abandon. Every framework in this area — ISO 9001, DMAIC — is PDCA wearing different clothes. Remember the gurus by their signature: **Deming** (PDCA and the 14 points; drive out fear, stop relying on mass inspection), **Juran** (the quality trilogy — planning, control, improvement; fitness for use), **Crosby** (zero defects, 'quality is free', conformance to requirements), **Ishikawa** (cause-and-effect / fishbone diagram, the 6M categories, quality circles).

**Six Sigma numbers.** Six Sigma is a data-driven methodology for reducing variation; for an existing process it runs **DMAIC** (Define, Measure, Analyze, Improve, Control), and for designing a new process, **DMADV**. The sigma level expresses the specification width in process standard deviations, and it converts to defects per million opportunities:
$$3\sigma \approx 66{,}807$$
DPMO (about 93.3% yield) and $6\sigma \approx 3.4$ DPMO. The famous 3.4 figure assumes a 1.5σ drift of the process mean; an unshifted 6σ process would be 0.002 DPMO. Capability indices answer a different question: $C_p$ compares the specification width to $6\sigma$ and ignores centering, while $C_{pk}$ takes the nearer specification limit, so $C_{pk} = C_p$ only when the mean sits exactly at the midpoint.

## Formulas

| Quantity | Expression | Notes |
| --- | :---: | --- |
| PDCA cycle | $\mathrm{Plan} \rightarrow \mathrm{Do} \rightarrow \mathrm{Check} \rightarrow \mathrm{Act}$ | Shewhart/Deming improvement loop; ISO 9001 clause structure and DMAIC both map onto it. |
| DMAIC phases | $\mathrm{Define} \rightarrow \mathrm{Measure} \rightarrow \mathrm{Analyze} \rightarrow \mathrm{Improve} \rightarrow \mathrm{Control}$ | Six Sigma for improving an existing process; DMADV is used to design a new one. |
| Sigma level | $\sigma_{\mathrm{level}} = \dfrac{\mathrm{USL} - \mathrm{LSL}}{2\sigma_{\mathrm{process}}}$ | Specification width measured in process standard deviations; 3σ ≈ 66,807 DPMO, 6σ ≈ 3.4 DPMO. |
| DPMO | $\mathrm{DPMO} = \dfrac{\mathrm{defects}}{\mathrm{units} \times \mathrm{opportunities}} \times 10^{6}$ | Counts defects, not rejected units; an opportunity is one chance for a defect per unit. |
| Yield from DPMO | $\mathrm{Yield} = 1 - \dfrac{\mathrm{DPMO}}{10^{6}}$ | 3σ → 93.32% yield; 6σ → 99.99966% yield. |
| Cp | $C_p = \dfrac{\mathrm{USL} - \mathrm{LSL}}{6\sigma}$ | Capability against specification width only; it ignores centering, so a badly off-center process can still show a good Cp. |
| Cpk | $C_{pk} = \min\left(\dfrac{\mathrm{USL}-\mu}{3\sigma},\ \dfrac{\mu-\mathrm{LSL}}{3\sigma}\right)$ | Centering-aware; equals Cp only when the mean is exactly midway between the limits. |
| Defect vs defective | $\mathrm{defects} \geq \mathrm{defectives}$ | One defective unit can carry several defects; DPMO counts defects per opportunity. |
| Six Sigma benchmark | $6\sigma \approx 3.4\ \mathrm{DPMO}$ | Assumes the standard 1.5σ long-term shift; the unshifted value is 0.002 DPMO, so quote 3.4. |
| Three sigma benchmark | $3\sigma \approx 66{,}807\ \mathrm{DPMO}$ | ≈ 93.3% yield — the 'looks good but is not Six Sigma' reference value. |
| Deming | $\mathrm{PDCA} + 14\ \mathrm{points}$ | Statistical thinking, drive out fear, stop depending on mass inspection. |
| Juran | $\mathrm{quality\ trilogy}$ | Quality planning, quality control, quality improvement; 'fitness for use'. |
| Crosby | $\mathrm{zero\ defects},\ \mathrm{quality\ is\ free}$ | Conformance to requirements; prevention costs less than appraisal and failure. |
| Ishikawa | $\mathrm{cause\ and\ effect\ (fishbone)\ diagram}$ | Sorts causes into the 6M: man, machine, material, method, measurement, environment. |

## Traps & Exam Notes

- **Quoting 0.002 DPMO for Six Sigma.** The board-exam value is **3.4 DPMO**, because the standard Six Sigma figure includes a 1.5σ long-term process shift.
- **Using Cp to judge an off-center process.** Cp measures width only, so a process with Cp = 2.0 can still produce defects on one side; Cpk is the index that falls when the mean drifts.
- **Treating defects and defectives as the same count.** DPMO counts defects per *opportunity* — one rejected unit with three faults contributes 3 defects, not 1.
- **Swapping DMAIC and DMADV.** DMAIC improves an existing process; DMADV (or DFSS) designs a new one from scratch.
- **Crediting 'zero defects' to Deming.** Zero defects is Crosby's slogan; Deming explicitly opposed slogan-and-target management without process change.

## See Also

- [[01_Management_Functions_and_Organizational_Structures]]
- [[03_ISO_9001_Overview]]

---

[[01_Management_Functions_and_Organizational_Structures|⬅ 01]] · [[_MOC_Engineering_Management_and_PM|MOC]] · [[00_Dashboard|Dashboard]] · [[03_ISO_9001_Overview|03 ➡]]
