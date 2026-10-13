---
title: GEAS Index
part: GEAS
tags: [ece, geas, formula-sheet, moc]
topics: 102
---

# GEAS — ECE Board Formula Vault

## How to use this vault

1. Start at the subject table below; every subject note holds all of its syllabus topics as `###` sections in board order.
2. Each topic is formula-only: symbols with SI units inline, one **Conditions:** line, ★ on high-yield formulas.
3. Law and management topics list article/section numbers, key provisions and thresholds as plain facts.
4. Read the `> [!warning] Exam trap` callouts last — they mark the exact mistakes that cost board points.
5. Filter with tags: #chemistry #physics #materials #environment #economy #management #law #ethics.

## Map of Content

| # | Subject | Topics | Sections |
|---|---|---|---|
| 1 | [[01_General_Chemistry\|General Chemistry]] | 11 | **Part A** Atomic Structure & Bonding · **Part B** Stoichiometry & Solutions · **Part C** Equilibrium, Electrochem & Batteries |
| 2 | [[02_University_Physics\|University Physics]] | 20 | **Part A** Mechanics · **Part B** Fluids and Thermal Physics · **Part C** Waves and Optics · **Part D** Electricity, Magnetism and Nuclear Physics |
| 3 | [[03_Materials_Science\|Materials Science]] | 13 | **Part A** Crystal Structure · **Part B** Properties and Behavior · **Part C** Diffusion, Nanomaterials and Polymers |
| 4 | [[04_Environmental_Sci_and_PH_Laws\|Environmental Sci and PH Laws]] | 13 | **Part A** Ecology and Pollution Science · **Part B** Philippine Environmental Laws · **Part C** Sustainability and Energy Resources |
| 5 | [[05_Engineering_Economy\|Engineering Economy]] | 13 | **Part A** Time Value of Money · **Part B** Project Evaluation · **Part C** Depreciation & Decisions |
| 6 | [[06_Engineering_Management_and_PM\|Engineering Management and PM]] | 13 | **Part A** Management and Quality · **Part B** Project Management · **Part C** Startup and Finance · **Part D** Decision Analysis, Finance and Leadership |
| 7 | [[07_ECE_Laws_and_Professional_Ethics\|ECE Laws and Professional Ethics]] | 11 | **Part A** RA 9292 and Regulation · **Part B** Telecom and Data Laws · **Part C** Safety, Codes and Ethics · **Part D** Intellectual Property |
| 8 | [[08_Computer_Systems_OOP_and_CAD\|Computer Systems, OOP and CAD]] | 8 | **Part A** OOP and Programming Fundamentals · **Part B** Software Engineering and UML · **Part C** GUI and Computer-Aided Design |

**Total: 102 topics** across 8 subjects.

> [!tip] High-yield ★
> **Most heavily tested GEAS areas:** [[01_General_Chemistry|General Chemistry]] · [[02_University_Physics|University Physics]] · [[05_Engineering_Economy|Engineering Economy]] · [[07_ECE_Laws_and_Professional_Ethics|ECE Laws and Professional Ethics]].
> For ECE Laws, **RA 9292 (Electronics Engineering Law of 2004) in particular** — scope of practice, titles PECE/ECE/ECT, the seal, and BEE/PRC powers — is the single densest source of recall items.

## Split notes

- [[01_General_Chemistry]], [[02_University_Physics]], [[03_Materials_Science]], [[04_Environmental_Sci_and_PH_Laws|Environmental Sci]] and [[06_Engineering_Management_and_PM|Management]] are the longest notes, so each is split into **Part A / Part B / Part C** segments **inside the same file** (no extra files, per the vault spec). Topic numbering is continuous across parts.
- Topics run 1–11 (General Chemistry), 1–20 (University Physics), 1–13 (Materials Science), 1–13 (Environmental Sci), 1–13 (Engineering Economy), 1–13 (Management and PM) and 1–11 (ECE Laws). [[08_Computer_Systems_OOP_and_CAD|Computer Systems, OOP and CAD]] is a new subject added by the corpus-coverage pass.
- The original total of 81 was the sum of the first seven subjects. The coverage pass added 21 topics: 4 Electricity/Magnetism/Nuclear, 3 Diffusion/Nanomaterials/Polymers, 2 Sustainability/Energy, 3 Decision Analysis/Financial Ratios/Motivation and Leadership, 1 Intellectual Property, and the 8-topic Computer Systems file — giving **102**. No pre-existing topic was renumbered, renamed or removed.

> [!warning] Exam trap
> Non-computational subjects are still testable. Memorize **RA 9292 penalties and titles**, **PD 1586 ECC triggers**, **RA 8749 / 9275 / 9003 thresholds**, and **PERT/CPM float rules** — these appear as straight recall items, not calculations.
> The coverage pass added a large **definitional** load (OOP/UML/CAD, obligations and contracts, decision analysis, management theory, strategy vocabulary, ecology terms). These are recall items too — a formula-only revision strategy will miss them.

> [!tip] Sibling vaults
> These are separate Obsidian vaults, so nothing here links out. The fuller **electromagnetics** treatment (Maxwell, waves, boundaries) lives in the `Mathematics` vault (`05_Electromagnetics.md`), and **circuits, devices and instrumentation** in `Electronics_Engineering/` and `EST/`. Open those folders directly when a GEAS item strays into them.

> [!warning] Unverified figures
> RA 9292 Sec. 8 / 17 / 24 and Sec. 3(a) were added from the review brief; **RA 8293 intellectual-property terms and the PEC hazardous-location classes are stated without section or article cites** because the exact figures were not verified against the primary text. Confirm against the official statute before relying on them.

## Cross-topic jump table

| If you are solving… | Jump to |
|---|---|
| Gas laws feeding equilibrium or thermodynamics | [[02_University_Physics#11. First Law and Processes\|First Law and Processes]] |
| Coulomb's law, capacitors or series RLC resonance | [[02_University_Physics#17. Electrostatics\|Electrostatics]] |
| Faraday induction, Lenz or $F=ILB\sin\theta$ | [[02_University_Physics#19. Magnetism\|Magnetism]] |
| Half-life, alpha/beta/gamma decay or binding energy | [[02_University_Physics#20. Nuclear Physics\|Nuclear Physics]] |
| Redox balancing → cell potential | [[01_General_Chemistry#9. Redox and Galvanic Cells\|Redox and Galvanic Cells]] |
| Concentration units feeding pH or Nernst | [[01_General_Chemistry#6. Solutions and Concentration Units\|Solutions and Concentration Units]] |
| Photoelectric threshold or work function | [[01_General_Chemistry#1. Atomic Structure and Configurations\|Atomic Structure]] |
| Heat and expansion in materials | [[03_Materials_Science#5. Stress, Strain and Mechanical Properties\|Stress, Strain and Mechanical Properties]] |
| Fermi level vs semiconductor doping | [[03_Materials_Science#8. Fermi Level\|Fermi Level]] |
| Dielectric constant for capacitor design | [[03_Materials_Science#9. Dielectric Properties and Breakdown\|Dielectric Properties and Breakdown]] |
| Curie or Néel temperature | [[03_Materials_Science#10. Magnetic Properties and Hysteresis\|Magnetic Properties]] |
| Fick's laws or diffusion | [[03_Materials_Science#11. Diffusion and Fick's Laws\|Diffusion and Fick's Laws]] |
| Nanomaterial size range or SA:V scaling | [[03_Materials_Science#12. Nanomaterials\|Nanomaterials]] |
| Thermoplastic vs thermoset vs elastomer | [[03_Materials_Science#13. Polymers and Composites\|Polymers]] |
| Carrying capacity or logistic growth | [[04_Environmental_Sci_and_PH_Laws#1. Ecosystems and Energy Flow\|Ecosystems]] |
| Brundtland, Triple Bottom Line or wind power | [[04_Environmental_Sci_and_PH_Laws#12. Sustainability Frameworks\|Sustainability Frameworks]] |
| Annuity → capitalized cost → AW comparison | [[05_Engineering_Economy#6. Capitalized Cost\|Capitalized Cost]] |
| Depreciation method by name | [[05_Engineering_Economy#10. Depreciation: SLM and SYD\|Depreciation: SLM and SYD]] |
| Critical path and float for a schedule | [[06_Engineering_Management_and_PM#5. Network Passes, Float and Critical Path\|Network Passes, Float and Critical Path]] |
| Runway vs burn rate for a startup item | [[06_Engineering_Management_and_PM#10. Funding, Burn Rate and Runway\|Funding, Burn Rate and Runway]] |
| EMV, decision tree or minimax regret | [[06_Engineering_Management_and_PM#11. Decision Analysis under Risk and Uncertainty\|Decision Analysis]] |
| Current ratio or quick (acid-test) ratio | [[06_Engineering_Management_and_PM#12. Financial Ratios\|Financial Ratios]] |
| Herzberg, Maslow or laissez-faire leadership | [[06_Engineering_Management_and_PM#13. Motivation and Leadership\|Motivation and Leadership]] |
| Seal, title and scope questions | [[07_ECE_Laws_and_Professional_Ethics#2. Titles: PECE, ECE, ECT and Seal\|Titles: PECE, ECE, ECT and Seal]] |
| Patent, trademark or copyright term | [[07_ECE_Laws_and_Professional_Ethics#11. Intellectual Property\|Intellectual Property]] |
| Encapsulation, polymorphism or abstract vs interface | [[08_Computer_Systems_OOP_and_CAD#1. OOP Fundamentals: Classes, Objects and the Four Pillars\|OOP Fundamentals]] |
| UML class diagram or association multiplicity | [[08_Computer_Systems_OOP_and_CAD#6. UML Diagrams: Structure, Behaviour and Relationships\|UML Diagrams]] |
| Ortho mode, chamfer or model vs paper space | [[08_Computer_Systems_OOP_and_CAD#8. CAD Drafting Aids, Coordinates and Documentation\|CAD Drafting Aids]] |

## Tag index

#ece #geas #formula-sheet · #chemistry #atomic #equilibrium #electrochem #solutions · #physics #mechanics #fluids #thermo #waves #optics #electrostatics #magnetism #nuclear · #materials #crystal #semiconductor #dielectric #magnetic #diffusion #nanomaterials #polymers · #environment #pollution #water #waste #air #sustainability #energy · #economy #annuity #depreciation #rateofreturn #breakeven #decisionanalysis #ratios · #management #tqm #sixsigma #pert #cpm #leanstartup #startup #leadership #motivation · #law #ethics #ra9292 #dataprivacy #cybercrime #ntc #intellectualproperty · #oop #uml #software #gui #cad
