---
title: Mathematics Index
part: Mathematics
tags: [ece, math, formula-sheet, moc]
topics: 132
---

# Mathematics — ECE Board Formula Vault

## How to use this vault

1. Start at the subject list below; every subject note holds all of its topics as `###` sections in board order.
2. Each topic is formula-only: symbols with SI units inline, a one-line **Conditions:** statement, and ★ on high-yield formulas.
3. Read the `> [!warning] Exam trap` callouts last — they mark the exact mistakes that cost board points.
4. Cross-links use numbered anchors, e.g. `[[04_Advanced_Engineering_Math#7. Laplace Transform Pairs|Laplace Transform Pairs]]`.
5. Filter with tags: #laplace #ztransform #vector #statistics #stability #numerical.

> [!tip] High-yield ★
> **Most heavily tested areas:** [[01_Differential_Calculus|Differential Calculus]] · [[02_Integral_Calculus|Integral Calculus]] · [[04_Advanced_Engineering_Math|Advanced Engineering Math]] · [[05_Electromagnetics|Electromagnetics]] · [[06_Control_Systems|Control Systems]]
> Drill these five first — they carry the bulk of Mathematics items. Add [[03_Differential_Equations|Differential Equations]] for the RLC/transient cluster and [[07_Signals_and_Systems|Signals and Systems]] for the transform cluster.

## Map of Content

| # | Subject | Topics | Sections |
|---|---|---|---|
| 1 | [[01_Differential_Calculus\|Differential Calculus]] | 8 | Part A Limits & Differentiation · Part B Applications |
| 2 | [[02_Integral_Calculus\|Integral Calculus]] | 16 | Part A Techniques · Part B Applications · Part C Multiple Integrals |
| 3 | [[03_Differential_Equations\|Differential Equations]] | 14 | Part A First Order · Part B Higher Order · Part C Applications & PDEs |
| 4 | [[04_Advanced_Engineering_Math\|Advanced Engineering Math]] | 19 | **Part A** Complex & Series · **Part B** Transforms · **Part C** Special Functions & Linear Algebra · **Part D** Analytic Geometry |
| 5 | [[05_Electromagnetics\|Electromagnetics]] | 22 | **Part A** Electrostatics & Vector Analysis · **Part B** Magnetostatics · **Part C** Maxwell, Waves & Boundaries |
| 6 | [[06_Control_Systems\|Control Systems]] | 14 | Part A Modeling & Time Response · Part B Stability, Frequency & Design |
| 7 | [[07_Signals_and_Systems\|Signals and Systems]] | 13 | Part A Signals & LTI · Part B Transforms & System Analysis · Part C Correlation, PSD & Sampling |
| 8 | [[08_Numerical_Methods_and_Analysis\|Numerical Methods and Analysis]] | 12 | Part A Errors & Root Finding · Part B Interpolation & Integration · Part C IVPs · Part D Differentiation & Linear Systems |
| 9 | [[09_Engineering_Data_Analysis\|Engineering Data Analysis]] | 14 | Part A Descriptive Stats & Probability · Part B Inference, Regression & DOE |

**Total: 132 topics** across 9 subjects.

> [!warning] Exam trap
> The brief's headline count of **112** equals the subtotal of subjects 1–8 in the original list; the listed 14 Engineering Data Analysis topics bring that to 126. A later corpus-coverage pass added 6 topics (double integrals, conic sections, correlation/PSD and sampling, numerical differentiation, iterative linear solvers) for a true total of **132** — the topic counts in the table above are the authoritative figures.

## Split notes

- **[[05_Electromagnetics]]** and **[[04_Advanced_Engineering_Math]]** are the two longest notes, so each is split into **Part A / Part B / Part C** segments **inside the same file** (no separate files, per the vault spec). Topic numbering is continuous across parts.
- Topics run 1–22 (Electromagnetics), 1–19 (Advanced Engineering Math, after the Part D conics addition), 1–16 (Integral Calculus) and 1–13 (Signals and Systems) in the exact order given in the brief.

> [!tip] Sibling vaults
> These notes are one of four separate vaults. **Instrumentation and PLCs** live in the `EST`/`Electronics` vaults and **management, law and materials** in `GEAS`; nothing here links across them, so open the matching vault directly when a paper strays outside mathematics.

## Cross-topic jump table

| If you are solving… | Jump to |
|---|---|
| RLC transient / damping case | [[03_Differential_Equations#11. RLC Circuit Transients\|RLC Circuit Transients]] |
| Laplace pairs and inverse transforms | [[04_Advanced_Engineering_Math#7. Laplace Transform Pairs\|Laplace Transform Pairs]] |
| Z-transform pairs and ROC | [[07_Signals_and_Systems#7. Z Transform Theorems and Pairs\|Z Transform Theorems and Pairs]] |
| Autocorrelation, PSD or matched filter | [[07_Signals_and_Systems#12. Correlation and Spectral Density\|Correlation and Spectral Density]] |
| Sampling rate, aliasing or circular convolution | [[07_Signals_and_Systems#13. Sampling and Circular Convolution\|Sampling and Circular Convolution]] |
| Conic identification or complex loci | [[04_Advanced_Engineering_Math#19. Analytic Geometry and Conic Sections\|Analytic Geometry and Conic Sections]] |
| Double integral or mass of a lamina | [[02_Integral_Calculus#16. Iterated and Double Integrals\|Iterated and Double Integrals]] |
| Forward/central difference derivative | [[08_Numerical_Methods_and_Analysis#11. Numerical Differentiation\|Numerical Differentiation]] |
| Jacobi / Gauss-Seidel convergence | [[08_Numerical_Methods_and_Analysis#12. Iterative Linear Solvers\|Iterative Linear Solvers]] |
| Wallis integral or trigonometric powers | [[02_Integral_Calculus#5. Trigonometric Integrals and Substitution\|Trigonometric Integrals]] |
| Green's theorem in the plane | [[05_Electromagnetics#3. Divergence and Stokes Theorems\|Divergence and Stokes Theorems]] |
| Second-order overshoot, settling time | [[06_Control_Systems#5. Second Order Specifications\|Second Order Specifications]] |
| Steady-state error and system type | [[06_Control_Systems#6. Steady State Error and Error Constants\|Steady State Error and Error Constants]] |
| Eigenvalues for stability | [[04_Advanced_Engineering_Math#18. Eigenvalues and Eigenvectors\|Eigenvalues and Eigenvectors]] |
| Error propagation (calculus → numerical) | [[01_Differential_Calculus#7. Differentials and Error Propagation\|Differentials and Error Propagation]] |
| Numerical integration error bounds | [[08_Numerical_Methods_and_Analysis#7. Simpson's One-Third and Three-Eighth Rules\|Simpson's Rules]] |
| Maxwell's equations (differential vs integral) | [[05_Electromagnetics#18. Maxwell's Equations and Displacement Current\|Maxwell's Equations]] |
| Two-way ANOVA, blocking or fractional factorials | [[09_Engineering_Data_Analysis#14. ANOVA and DOE\|ANOVA and DOE]] |

## Tag index

#ece #math #formula-sheet · #laplace #ztransform #fourier #vector #electrostatics #magnetostatics #maxwell #waves · #control #stability #signals #convolution #correlation #psd #sampling #dft · #numerical #rootfinding #interpolation · #integral #conics #complex · #statistics #probability #hypothesis #regression #anova
