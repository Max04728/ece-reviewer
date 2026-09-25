// vault.mjs — canonical vault model + shared helpers for the ECE_Reviewer vault.
// Single source of truth for: topic paths, titles, areas, tier assignment.
// Every other script imports from here, so nothing is ever re-typed from memory.

export const AREA_NAMES = {
  '01_Mathematics': 'Mathematics',
  '02_Electronics_Engineering': 'Electronics Engineering',
  '03_GEAS': 'GEAS',
  '04_EST': 'EST',
};

/**
 * Short part prefixes. Topic IDs are `<PART>-<AreaNN>-<TopicNN>`.
 * The part prefix is required: leaf-area initials collide across parts
 * (Differential Calculus, DC Circuits and Digital Communications all give "DC"),
 * which produced 32 duplicate IDs before this was added.
 * The area number is used rather than initials because initials degenerate
 * (Electromagnetics -> "E", Logic_Circuits_and_Switching -> "LCAS").
 * Example: MATH-01-01, MATH-05-13, ECE-08-16.
 */
export const PART_PREFIX = {
  '01_Mathematics': 'MATH',
  '02_Electronics_Engineering': 'ECE',
  '03_GEAS': 'GEAS',
  '04_EST': 'EST',
};

// Areas that only appear in the user's tree as a section, with their own display name.
export const leaf = (part, dir, titles) => ({ part, dir, titles });

export const TREE = [
  { part: '01_Mathematics', dir: '01_Differential_Calculus', titles: [
    'Limits, Continuity and L Hopital',
    'Differentiation Rules',
    'Implicit, Parametric and Logarithmic Differentiation',
    'Related Rates',
    'Extrema, Concavity and Inflection',
    'Optimization Problems',
    'Differentials and Error Propagation',
    'Rolle\u2019s and Mean Value Theorems',
  ]},
  { part: '01_Mathematics', dir: '02_Integral_Calculus', titles: [
    'Antiderivatives and Standard Forms',
    'Algebraic Substitution',
    'Definite Integrals and FTC',
    'Integration by Parts and Tabular',
    'Trigonometric Integrals and Substitution',
    'Partial Fractions',
    'Improper Integrals',
    'Average Value and MVT for Integrals',
    'Plane Areas Cartesian',
    'Plane Areas Polar',
    'Volumes by Slicing, Disk and Washer',
    'Volumes by Cylindrical Shells',
    'Arc Length and Surface Area',
    'Centroids and Pappus-Guldinus',
    'Work and Hydrostatic Force',
  ]},
  { part: '01_Mathematics', dir: '03_Differential_Equations', titles: [
    'Separation of Variables',
    'Linear First Order and Bernoulli',
    'Exact Equations and Integrating Factors',
    'Homogeneous Equations and Substitutions',
    'Growth, Decay and Newton\u2019s Cooling',
    'Mixtures and Orthogonal Trajectories',
    'Higher Order Homogeneous Auxiliary Equation',
    'Undetermined Coefficients',
    'Variation of Parameters',
    'Mass-Spring-Damper Systems',
    'RLC Circuit Transients',
    'PDE Wave Equation 1D',
    'PDE Heat Equation 1D',
    'PDE Laplace Equation 2D',
  ]},
  { part: '01_Mathematics', dir: '04_Advanced_Engineering_Math', titles: [
    'Complex Numbers, Euler and De Moivre',
    'Cauchy-Riemann and Analytic Functions',
    'Sequences and Convergence Tests',
    'Power Series Radius of Convergence',
    'Taylor and Maclaurin Series',
    'Truncation Error and Approximation',
    'Laplace Transform Pairs',
    'Shifting Theorems and Properties',
    'Unit Step, Dirac and Periodic Functions',
    'Inverse Laplace and Partial Fractions',
    'Fourier Series Trigonometric and Exponential',
    'Half-Range Expansions and Symmetry',
    'Fourier Transform Properties',
    'Bessel Functions',
    'Legendre Polynomials',
    'Matrices, Determinants, Rank and Inversion',
    'Cramer\u2019s Rule and Linear Systems',
    'Eigenvalues and Eigenvectors',
  ]},
  { part: '01_Mathematics', dir: '05_Electromagnetics', titles: [
    'Coordinate Systems and Vector Algebra',
    'Gradient, Divergence, Curl and Laplacian',
    'Divergence and Stokes Theorems',
    'Coulomb\u2019s Law and E Field',
    'Gauss Law and Applications',
    'Electric Potential and Gradient',
    'Dipoles and Polarization',
    'Dielectrics and Boundary Conditions',
    'Capacitance from Geometry',
    'Electrostatic Energy and Forces',
    'Current Density and Continuity',
    'Biot-Savart Law',
    'Ampere\u2019s Circuital Law',
    'Magnetic Boundary Conditions and Vector Potential',
    'Inductance from Geometry and Materials',
    'Magnetic Forces, Torque and Lorentz',
    'Faraday\u2019s Law and Motional EMF',
    'Maxwell\u2019s Equations and Displacement Current',
    'EM Wave Equations and Uniform Plane Waves',
    'Waves in Lossy Media and Skin Depth',
    'Reflection and Transmission at Boundaries',
    'Intrinsic Impedance and Poynting Vector',
  ]},
  { part: '01_Mathematics', dir: '06_Control_Systems', titles: [
    'System Modeling and Transfer Functions',
    'Block Diagram Reduction',
    'Mason\u2019s Gain Formula',
    'Test Signals and First Order Response',
    'Second Order Specifications',
    'Steady State Error and Error Constants',
    'System Types and Error Analysis',
    'Routh-Hurwitz Criterion',
    'Root Locus Techniques',
    'Bode Plots and Margins',
    'Nyquist Stability Criterion',
    'PID Controllers and Tuning',
    'Lead-Lag Compensator Design',
    'State Space Representation Basics',
  ]},
  { part: '01_Mathematics', dir: '07_Signals_and_Systems', titles: [
    'Signal Classification and Operations',
    'Energy, Power, Even and Odd',
    'System Properties and LTI',
    'Continuous-Time Convolution',
    'Discrete-Time Convolution',
    'Z Transform Definition and ROC',
    'Z Transform Theorems and Pairs',
    'Inverse Z Transform',
    'Difference Equations and Stability',
    'System Response and Step Response',
    'CT Fourier and Laplace as System Tools',
  ]},
  { part: '01_Mathematics', dir: '08_Numerical_Methods_and_Analysis', titles: [
    'Error Analysis, Roundoff and Truncation',
    'Bisection and Regula Falsi',
    'Newton-Raphson and Secant',
    'Newton\u2019s Divided Difference Interpolation',
    'Lagrange Interpolation',
    'Trapezoidal Rule',
    'Simpson\u2019s One-Third and Three-Eighth Rules',
    'Euler\u2019s Method',
    'Modified Euler and Heun\u2019s Method',
    'Runge-Kutta 4th Order',
  ]},
  { part: '01_Mathematics', dir: '09_Engineering_Data_Analysis', titles: [
    'Central Tendency',
    'Dispersion, Variance, SD, IQR and CV',
    'Permutations and Combinations',
    'Probability Rules and Bayes',
    'Binomial and Geometric Distributions',
    'Poisson and Hypergeometric Distributions',
    'Uniform and Exponential Distributions',
    'Normal Distribution and Z Scores',
    'Sampling Techniques and Sampling Distributions',
    'Central Limit Theorem',
    'Confidence Intervals',
    'Hypothesis Testing, Z, t and p Errors',
    'Linear Regression and Pearson r',
    'ANOVA and DOE',
  ]},
  { part: '02_Electronics_Engineering', dir: '01_DC_Circuits', titles: [
    'Circuit Variables, Ohm\u2019s Law and Signs',
    'KCL, KVL, Series and Parallel Reduction',
    'Delta-Wye Transformations',
    'Mesh Analysis and Supermesh',
    'Nodal Analysis and Supernodes',
    'Superposition Theorem',
    'Thevenin and Norton Equivalents',
    'Maximum Power Transfer and Source Transformation',
    'Millman\u2019s and Tellegen Theorems',
    'Inductors, Capacitors and Energy',
    'First Order RC and RL Transients',
    'Second Order RLC Natural Response',
  ]},
  { part: '02_Electronics_Engineering', dir: '02_AC_Circuits', titles: [
    'Sinusoid, RMS, Average, Form and Crest',
    'Phasors and Complex Impedance',
    'Series and Parallel AC Analysis',
    'AC Thevenin, Norton and Max Power',
    'AC Power, PQS and Triangle',
    'Power Factor and Correction',
    'Series Resonance',
    'Parallel Resonance and Anti-Resonance',
    'Balanced Wye and Delta Systems',
    'Three-Phase Power and Two-Wattmeter',
  ]},
  { part: '02_Electronics_Engineering', dir: '03_Two_Port_Networks', titles: [
    'Two-Port Variables and Conventions',
    'Z and Y Parameters',
    'T and Pi Equivalent Networks',
    'Hybrid and Inverse Hybrid Parameters',
    'Transmission ABCD Parameters',
    'Parameter Conversions and Determinants',
    'Reciprocity and Symmetry Conditions',
    'Interconnections: Series, Parallel, Cascade',
    'Terminated Networks and Gains',
  ]},
  { part: '02_Electronics_Engineering', dir: '04_Semiconductor_Devices', titles: [
    'Intrinsic, Extrinsic and Carrier Transport',
    'PN Junction and Depletion Region',
    'Diode Characteristics and Shockley',
    'Diode Models and Load Line',
    'Rectifiers: Half-Wave, Center-Tapped, Bridge',
    'Filters, Ripple Factor and PIV',
    'Clippers, Clampers and Multipliers',
    'Zener Diodes and Shunt Regulators',
    'BJT Structure and Operating Regions',
    'BJT Current Gains and Relationships',
    'JFET Characteristics and Pinch-Off',
    'MOSFET Types and Regions',
    'Thyristors: UJT, SCR, DIAC, TRIAC',
    'Optoelectronics and Solar Cells',
    'Special Diodes: Varactor, Schottky, Tunnel',
  ]},
  { part: '02_Electronics_Engineering', dir: '05_Circuit_Analysis_and_Design', titles: [
    'BJT DC Biasing Configurations',
    'Load Lines and Q Point',
    'Bias Stability and Stability Factors',
    'FET Biasing Configurations',
    'BJT Small-Signal h-Parameter Model',
    'Small-Signal re Model: CE, CB, CC',
    'Hybrid-Pi Model',
    'FET Amplifiers: CS, CD, CG',
    'Multistage, Cascade and Cascode',
    'Darlington and Feedback Pairs',
    'Frequency Response and Bode Plots',
    'Miller\u2019s Theorem and High-Frequency Effects',
    'Gain-Bandwidth Product and fT',
    'Feedback Amplifier Topologies',
    'Power Amplifiers: Classes A, B, AB, C',
    'Oscillators: RC Phase Shift and Wien Bridge',
    'Oscillators: Hartley, Colpitts, Crystal',
  ]},
  { part: '02_Electronics_Engineering', dir: '06_Power_Electronics_and_Systems', titles: [
    'Power Switches: MOSFET, IGBT, GTO, TRIAC',
    'Thermal Resistance and Heat Sinking',
    'SCR Phase-Controlled Rectifiers',
    'Buck Converter',
    'Boost Converter',
    'Buck-Boost Converter',
    'Inverters: Half-Bridge and Full-Bridge',
    'PWM Techniques',
    'Linear Voltage Regulators',
  ]},
  { part: '02_Electronics_Engineering', dir: '07_Industrial_Automation_and_Sensors', titles: [
    'Op-Amp Fundamentals and Real Parameters',
    'Linear Op-Amp Circuits',
    'Instrumentation and Difference Amplifiers',
    'Integrators and Differentiators',
    'Comparators and Schmitt Triggers',
    'Precision Rectifiers',
    'Active Filter Responses',
    'Sallen-Key Filter Design',
    'Temperature Sensors',
    'Strain Gauges and Wheatstone Bridge',
    'Position Sensors: LVDT, Hall, Encoders',
    'Signal Conditioning and DAQ',
    'ADC Architectures and Quantization',
    'DAC Architectures',
    'PLC Architecture and Scan Cycle',
    'Ladder Logic, Timers and Counters',
  ]},
  { part: '02_Electronics_Engineering', dir: '08_Logic_Circuits_and_Switching', titles: [
    'Number Systems and Base Conversion',
    'Signed Arithmetic and Two\u2019s Complement',
    'Codes: BCD, Gray, ASCII, Parity',
    'Boolean Algebra and De Morgan',
    'SOP, POS, Minterms and Maxterms',
    'Karnaugh Maps',
    'Adders and Subtractors',
    'Encoders and Decoders',
    'Multiplexers and Demultiplexers',
    'Latches and Flip-Flops',
    'Flip-Flop Timing, Setup and Hold',
    'Shift Registers',
    'Asynchronous and Synchronous Counters',
    'Finite State Machines',
    'ASM Charts',
    'Logic Families: TTL vs CMOS and Interfacing',
  ]},
  { part: '02_Electronics_Engineering', dir: '09_Microprocessors_and_Embedded', titles: [
    'CPU Architecture: CISC and RISC',
    'Registers, Buses and Memory Organization',
    'Memory Technologies and Address Decoding',
    'Instruction and Machine Cycles',
    'Addressing Modes and Instruction Sets',
    'Interrupts and ISRs',
    'DMA and Bus Arbitration',
    'GPIO and Timer Peripherals',
    'PWM and ADC/DAC Modules',
    'Serial Interfaces: UART, SPI, I2C',
  ]},
  { part: '03_GEAS', dir: '01_General_Chemistry', titles: [
    'Atomic Structure and Configurations',
    'Periodic Trends',
    'Chemical Bonding',
    'Mole Concept and Stoichiometry',
    'Limiting Reagents and Yield',
    'Solutions and Concentration Units',
    'Chemical Equilibrium and Le Chatelier',
    'pH, pOH and Buffers',
    'Redox and Galvanic Cells',
    'Nernst Equation and Faraday\u2019s Laws',
    'Battery Chemistries',
  ]},
  { part: '03_GEAS', dir: '02_University_Physics', titles: [
    'Kinematics 1D and 2D',
    'Newton\u2019s Laws, Friction and Circular Motion',
    'Work, Energy and Conservation',
    'Momentum and Collisions',
    'Rotational Kinematics and Torque',
    'Angular Momentum and Rigid Bodies',
    'Fluid Statics: Pascal and Archimedes',
    'Fluid Dynamics: Continuity and Bernoulli',
    'Thermal Expansion and Calorimetry',
    'Heat Transfer',
    'First Law and Processes',
    'Second Law, Entropy and Carnot',
    'SHM and Waves',
    'Sound and Doppler',
    'Reflection and Refraction',
    'Lenses and Mirrors',
  ]},
  { part: '03_GEAS', dir: '03_Materials_Science', titles: [
    'Crystal Structures and Unit Cells',
    'Atomic Packing Factor and Density',
    'Miller Indices',
    'Crystal Imperfections',
    'Stress, Strain and Mechanical Properties',
    'Hardness Testing',
    'Energy Bands and Classification',
    'Fermi Level',
    'Dielectric Properties and Breakdown',
    'Magnetic Properties and Hysteresis',
  ]},
  { part: '03_GEAS', dir: '04_Environmental_Sci_and_PH_Laws', titles: [
    'Ecosystems and Energy Flow',
    'Biogeochemical Cycles',
    'Air Pollution and Criteria Pollutants',
    'Greenhouse Effect, Ozone and Acid Rain',
    'Water Quality: BOD, COD, DO, TDS',
    'Solid, Hazardous and E-Waste',
    'PD 1586, EIS and ECC',
    'RA 8749 Clean Air Act',
    'RA 9275 Clean Water Act',
    'RA 9003 Solid Waste Management',
    'RA 6969 Toxic Substances',
  ]},
  { part: '03_GEAS', dir: '05_Engineering_Economy', titles: [
    'Simple and Compound Interest',
    'Nominal vs Effective Rates',
    'Ordinary Annuity and Annuity Due',
    'Deferred Annuities and Perpetuities',
    'Arithmetic and Geometric Gradients',
    'Capitalized Cost',
    'PW, FW and AW Methods',
    'Rate of Return and Payback',
    'Benefit-Cost Ratio',
    'Depreciation: SLM and SYD',
    'Depreciation: DB and DDB',
    'Break-Even and Cost Analysis',
    'Replacement Analysis',
  ]},
  { part: '03_GEAS', dir: '06_Engineering_Management_and_PM', titles: [
    'Management Functions and Organizational Structures',
    'TQM and Six Sigma',
    'ISO 9001 Overview',
    'PERT/CPM Fundamentals',
    'Network Passes, Float and Critical Path',
    'Project Crashing and Time-Cost Tradeoff',
    'Lean Startup and MVP',
    'Business Model Canvas and SWOT',
    'Market Sizing: TAM, SAM, SOM',
    'Funding, Burn Rate and Runway',
  ]},
  { part: '03_GEAS', dir: '07_ECE_Laws_and_Professional_Ethics', titles: [
    'RA 9292 Scope of Practice',
    'Titles: PECE, ECE, ECT and Seal',
    'PRC and BEE Powers and Penal Provisions',
    'RA 7925 Telecom Policy and Carriers',
    'NTC Mandates and Regulations',
    'RA 10173 Data Privacy Act',
    'RA 10175 Cybercrime Prevention Act',
    'DOLE DO 13 OSHS Safety',
    'Philippine Electronics Code Books',
    'IECEP Code of Ethics',
  ]},
  { part: '04_EST', dir: '01_Signals_Spectra_and_Noise', titles: [
    'Time vs Frequency and Line Spectra',
    'Power Spectral Density',
    'Thermal and Johnson Noise',
    'Shot, Flicker and Transit-Time Noise',
    'SNR, Noise Factor and Noise Figure',
    'Equivalent Noise Temperature',
    'Friis Cascaded Noise Formula',
    'Sampling Theorem and Aliasing',
    'Sampling Types and Aperture Effect',
    'Anti-Aliasing Filters',
    'DFT and FFT',
    'FIR vs IIR Filters',
  ]},
  { part: '04_EST', dir: '02_Principles_of_Communications', titles: [
    'AM Fundamentals and Modulation Index',
    'AM Spectrum, Bandwidth and Power',
    'DSB-SC and SSB-SC',
    'VSB and AM Variants Comparison',
    'FM and PM Fundamentals',
    'FM Sidebands and Bessel Functions',
    'Carson\u2019s Rule and FM Bandwidth',
    'NBFM vs WBFM',
    'FM Noise and Threshold Effect',
    'AM vs FM Noise Comparison',
    'Pre-Emphasis and De-Emphasis',
    'Superheterodyne Receiver',
    'Image Frequency and IRR',
    'AGC and Receiver Characteristics',
  ]},
  { part: '04_EST', dir: '03_Digital_Communications', titles: [
    'Pulse Modulation: PAM, PWM, PPM',
    'PCM: Sampling, Quantizing, Encoding',
    'Quantization Noise and SQNR',
    'Companding: Mu-Law and A-Law',
    'Delta Modulation and ADM',
    'Line Coding Schemes',
    'Inter-Symbol Interference and Nyquist Criterion',
    'Eye Diagrams and Equalization',
    'ASK, OOK and FSK',
    'BPSK and QPSK',
    'M-ary PSK and 16-QAM',
    'Constellation and BER Comparison',
    'Matched Filter and Optimum Detection',
    'Information Theory and Entropy',
    'Shannon-Hartley Capacity',
    'Error Control: Hamming and CRC',
  ]},
  { part: '04_EST', dir: '04_Data_Communications_and_Networking', titles: [
    'OSI Seven-Layer Model',
    'TCP/IP Protocol Suite',
    'Framing and Flow Control',
    'ARQ: Stop-and-Wait, GBN, Selective Repeat',
    'HDLC and PPP',
    'MAC Protocols and Ethernet',
    'Wireless LAN and CSMA/CA',
    'Switching: Circuit vs Packet',
    'IPv4 Addressing and Classes',
    'Subnetting, CIDR and VLSM',
    'IPv6 Structure',
    'Routing Algorithms: Distance Vector and Link State',
    'TCP vs UDP and Port Numbers',
    'Multiplexing: FDM, TDM, T1 and E1',
    'WDM and DWDM',
    'Multiple Access: FDMA, TDMA, CDMA',
    'OFDMA and Spread Spectrum',
    'Cellular Fundamentals, Reuse and Handoff',
    'Cellular Generations 2G to 5G',
  ]},
  { part: '04_EST', dir: '05_Transmission_Lines_and_Waveguides', titles: [
    'Primary Constants R, L, G, C',
    'Secondary Constants Z0 and Gamma',
    'Lossless and Distortionless Lines',
    'Reflection Coefficient and VSWR',
    'Input Impedance and Quarter-Wave Transformer',
    'Smith Chart',
    'Stub Matching',
    'Waveguide TE and TM Modes',
    'Cutoff Frequency and Guide Wavelength',
    'Phase and Group Velocity',
  ]},
  { part: '04_EST', dir: '06_Antenna_Systems_and_Propagation', titles: [
    'Antenna Parameters: Directivity, Gain, EIRP',
    'Radiation Resistance, Efficiency and Capture Area',
    'Hertzian and Half-Wave Dipoles',
    'Marconi, Folded Dipole, Yagi-Uda',
    'Parabolic Reflector Antennas',
    'FSPL and Friis Transmission Equation',
    'Ground Wave Propagation',
    'Space Wave and Radio Horizon',
    'Sky Wave and Ionospheric Layers',
    'Critical Frequency, MUF and Skip Distance',
    'Radar Range Equation and Microwave Links',
    'Television Systems and ISDB-T',
    'Satellite Orbits, Transponders and G/T',
    'Optical Fiber NA, V Number and Modes',
    'Fiber Attenuation and Dispersion',
    'Optical Sources, Detectors and Power Budget',
  ]},
];

// ---------------------------------------------------------------------------
// Tier assignment. Default is 2. Only exceptions are listed.
// T1 = full depth (concept + derivation + 8-10 problems + traps)
// T2 = medium     (concept + formulas + 3-5 problems)
// T3 = lean       (formulas + 2 problems + links)
// Promoting a note later = move its key to T1 and re-run expand.mjs.
// ---------------------------------------------------------------------------

export const T1 = [
  // gold standard (explicitly marked by the user)
  '05_Electromagnetics/09_Capacitance from Geometry',
  '05_Electromagnetics/15_Inductance from Geometry and Materials',
  // foundational / highest board weight
  '01_Differential_Calculus/01_Limits, Continuity and L Hopital',
  '01_Differential_Calculus/02_Differentiation Rules',
  '01_Differential_Calculus/05_Extrema, Concavity and Inflection',
  '02_Integral_Calculus/03_Definite Integrals and FTC',
  '02_Integral_Calculus/04_Integration by Parts and Tabular',
  '02_Integral_Calculus/11_Volumes by Slicing, Disk and Washer',
  '03_Differential_Equations/01_Separation of Variables',
  '03_Differential_Equations/02_Linear First Order and Bernoulli',
  '04_Advanced_Engineering_Math/07_Laplace Transform Pairs',
  '04_Advanced_Engineering_Math/11_Fourier Series Trigonometric and Exponential',
  '01_DC_Circuits/02_KCL, KVL, Series and Parallel Reduction',
  '01_DC_Circuits/04_Mesh Analysis and Supermesh',
  '01_DC_Circuits/05_Nodal Analysis and Supernodes',
  '01_DC_Circuits/07_Thevenin and Norton Equivalents',
  '01_DC_Circuits/12_Second Order RLC Natural Response',
  '02_AC_Circuits/02_Phasors and Complex Impedance',
  '02_AC_Circuits/05_AC Power, PQS and Triangle',
  '02_AC_Circuits/10_Three-Phase Power and Two-Wattmeter',
  '04_Semiconductor_Devices/02_PN Junction and Depletion Region',
  '04_Semiconductor_Devices/05_Rectifiers: Half-Wave, Center-Tapped, Bridge',
  '05_Circuit_Analysis_and_Design/01_BJT DC Biasing Configurations',
  '05_Circuit_Analysis_and_Design/06_Small-Signal re Model: CE, CB, CC',
  '08_Logic_Circuits_and_Switching/06_Karnaugh Maps',
  '08_Logic_Circuits_and_Switching/14_Finite State Machines',
  '01_Signals_Spectra_and_Noise/05_SNR, Noise Factor and Noise Figure',
  '01_Signals_Spectra_and_Noise/08_Sampling Theorem and Aliasing',
  '02_Principles_of_Communications/01_AM Fundamentals and Modulation Index',
  '02_Principles_of_Communications/05_FM and PM Fundamentals',
  '03_Digital_Communications/02_PCM: Sampling, Quantizing, Encoding',
  '03_Digital_Communications/16_Error Control: Hamming and CRC',
  '04_Data_Communications_and_Networking/01_OSI Seven-Layer Model',
  '04_Data_Communications_and_Networking/09_IPv4 Addressing and Classes',
  '04_Data_Communications_and_Networking/10_Subnetting, CIDR and VLSM',
  '05_Transmission_Lines_and_Waveguides/04_Reflection Coefficient and VSWR',
  '05_Transmission_Lines_and_Waveguides/06_Smith Chart',
  '06_Antenna_Systems_and_Propagation/06_FSPL and Friis Transmission Equation',
  '01_General_Chemistry/04_Mole Concept and Stoichiometry',
  '02_University_Physics/02_Newton\u2019s Laws, Friction and Circular Motion',
  '02_University_Physics/08_Fluid Dynamics: Continuity and Bernoulli',
  '03_Materials_Science/01_Crystal Structures and Unit Cells',
  '05_Engineering_Economy/03_Ordinary Annuity and Annuity Due',
  '07_ECE_Laws_and_Professional_Ethics/01_RA 9292 Scope of Practice',
  '08_Numerical_Methods_and_Analysis/03_Newton-Raphson and Secant',
  '09_Engineering_Data_Analysis/08_Normal Distribution and Z Scores',
];

export const T3 = [
  // policy / descriptive / survey topics: high recall value, low problem value
  '07_ECE_Laws_and_Professional_Ethics/02_Titles: PECE, ECE, ECT and Seal',
  '07_ECE_Laws_and_Professional_Ethics/03_PRC and BEE Powers and Penal Provisions',
  '07_ECE_Laws_and_Professional_Ethics/04_RA 7925 Telecom Policy and Carriers',
  '07_ECE_Laws_and_Professional_Ethics/05_NTC Mandates and Regulations',
  '07_ECE_Laws_and_Professional_Ethics/06_RA 10173 Data Privacy Act',
  '07_ECE_Laws_and_Professional_Ethics/07_RA 10175 Cybercrime Prevention Act',
  '07_ECE_Laws_and_Professional_Ethics/08_DOLE DO 13 OSHS Safety',
  '07_ECE_Laws_and_Professional_Ethics/09_Philippine Electronics Code Books',
  '07_ECE_Laws_and_Professional_Ethics/10_IECEP Code of Ethics',
  '04_Environmental_Sci_and_PH_Laws/07_PD 1586, EIS and ECC',
  '04_Environmental_Sci_and_PH_Laws/08_RA 8749 Clean Air Act',
  '04_Environmental_Sci_and_PH_Laws/09_RA 9275 Clean Water Act',
  '04_Environmental_Sci_and_PH_Laws/10_RA 9003 Solid Waste Management',
  '04_Environmental_Sci_and_PH_Laws/11_RA 6969 Toxic Substances',
  '04_Environmental_Sci_and_PH_Laws/01_Ecosystems and Energy Flow',
  '04_Environmental_Sci_and_PH_Laws/02_Biogeochemical Cycles',
  '06_Engineering_Management_and_PM/01_Management Functions and Organizational Structures',
  '06_Engineering_Management_and_PM/02_TQM and Six Sigma',
  '06_Engineering_Management_and_PM/03_ISO 9001 Overview',
  '06_Engineering_Management_and_PM/07_Lean Startup and MVP',
  '06_Engineering_Management_and_PM/08_Business Model Canvas and SWOT',
  '06_Engineering_Management_and_PM/09_Market Sizing: TAM, SAM, SOM',
  '06_Engineering_Management_and_PM/10_Funding, Burn Rate and Runway',
  '03_Materials_Science/06_Hardness Testing',
  '03_Materials_Science/04_Crystal Imperfections',
  '01_General_Chemistry/11_Battery Chemistries',
  '01_General_Chemistry/02_Periodic Trends',
  '02_Principles_of_Communications/04_VSB and AM Variants Comparison',
  '02_Principles_of_Communications/08_NBFM vs WBFM',
  '02_Principles_of_Communications/14_AGC and Receiver Characteristics',
  '04_Data_Communications_and_Networking/11_IPv6 Structure',
  '04_Data_Communications_and_Networking/05_HDLC and PPP',
  '04_Data_Communications_and_Networking/19_Cellular Generations 2G to 5G',
  '04_Data_Communications_and_Networking/15_WDM and DWDM',
  '06_Antenna_Systems_and_Propagation/12_Television Systems and ISDB-T',
  '09_Engineering_Data_Analysis/14_ANOVA and DOE',
  '09_Engineering_Data_Analysis/09_Sampling Techniques and Sampling Distributions',
];

// ---------------------------------------------------------------------------
// Derived model
// ---------------------------------------------------------------------------

export const pad = (n) => String(n).padStart(2, '0');

/**
 * Derive the filename slug exactly as the canonical tree spells it:
 *   "Limits, Continuity and L Hopital"      -> Limits,_Continuity_and_L_Hopital
 *   "Newton\u2019s Divided Difference..."    -> Newton\u2019s_Divided_Difference...
 *   "Codes: BCD, Gray, ASCII, Parity"       -> Codes_BCD,_Gray,_ASCII,_Parity
 *   "Simpson\u2019s One-Third and ..."        -> Simpson\u2019s_One-Third_and_...
 *
 * Colons are dropped and slashes are replaced by " - " so the result is always a
 * SINGLE path segment. `09_PWM_and_ADC/DAC_Modules` was previously produced for the
 * title "PWM and ADC/DAC Modules", which created a spurious subdirectory inside
 * `Topics/` and a nested payload folder - neither of which matched the canonical tree.
 */
export function slugify(title) {
  return title
    .replace(/:\s*/g, ' ')
    .replace(/\s*\/\s*/g, ' - ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s/g, '_');
}

/** Normalize any spelled-out exception key to the canonical `dir/NN_Slug` form. */
export function normKey(s) {
  const slash = s.indexOf('/');
  const dir = s.slice(0, slash);
  const rest = s.slice(slash + 1);
  const m = rest.match(/^(\d+)[_.]\s*(.*)$/);
  if (!m) return `${dir}/${rest}`;
  return `${dir}/${pad(m[1])}_${slugify(m[2])}`;
}

const t1set = new Set(T1.map(normKey));
const t3set = new Set(T3.map(normKey));

/**
 * Display-title overrides: exact punctuation from the canonical tree.
 * Keyed by `<area>/<NN>` so the anchor never moves. Applied after slugging, so
 * filenames stay unchanged while headings and tables read correctly.
 */
export const TITLES = {
  '01_Differential_Calculus/01': 'Limits, Continuity and L\u2019H\u00f4pital',
  '01_Differential_Calculus/08': 'Rolle\u2019s and Mean Value Theorems',
  '02_Integral_Calculus/07': 'Improper Integrals',
  '03_Differential_Equations/05': 'Growth, Decay and Newton\u2019s Cooling',
  '04_Advanced_Engineering_Math/06': 'Truncation Error and Approximation',
  '04_Advanced_Engineering_Math/17': 'Cramer\u2019s Rule and Linear Systems',
  '05_Electromagnetics/04': 'Coulomb\u2019s Law and E Field',
  '05_Electromagnetics/13': 'Ampere\u2019s Circuital Law',
  '05_Electromagnetics/17': 'Faraday\u2019s Law and Motional EMF',
  '06_Control_Systems/03': 'Mason\u2019s Gain Formula',
  '08_Numerical_Methods_and_Analysis/04': 'Newton\u2019s Divided Difference Interpolation',
  '08_Numerical_Methods_and_Analysis/07': 'Simpson\u2019s One-Third and Three-Eighth Rules',
  '08_Numerical_Methods_and_Analysis/08': 'Euler\u2019s Method',
  '08_Numerical_Methods_and_Analysis/09': 'Modified Euler and Heun\u2019s Method',
  '01_DC_Circuits/01': 'Circuit Variables, Ohm\u2019s Law and Signs',
  '01_DC_Circuits/09': 'Millman\u2019s and Tellegen Theorems',
  '05_Circuit_Analysis_and_Design/02': 'Load Lines and Q Point',
  '05_Circuit_Analysis_and_Design/12': 'Miller\u2019s Theorem and High-Frequency Effects',
  '08_Logic_Circuits_and_Switching/02': 'Signed Arithmetic and Two\u2019s Complement',
  '03_Materials_Science/07': 'Energy Bands and Classification',
  '02_University_Physics/02': 'Newton\u2019s Laws, Friction and Circular Motion',
  '02_Principles_of_Communications/07': 'Carson\u2019s Rule and FM Bandwidth',
  '04_Data_Communications_and_Networking/08': 'Switching: Circuit vs Packet',
  '06_Antenna_Systems_and_Propagation/01': 'Antenna Parameters: Directivity, Gain, EIRP',
  '06_Antenna_Systems_and_Propagation/13': 'Satellite Orbits, Transponders and G/T',
};

export const AREAS = TREE.map(({ part, dir, titles }) => {
  const areaKey = `${part}/${dir}`;
  const areaSlug = dir.replace(/^\d+_/, '');
  const areaNum = dir.match(/^(\d+)_/)?.[1] ?? '00';
  const topics = titles.map((title, i) => {
    const no = i + 1;
    const slug = `${pad(no)}_${slugify(title)}`;
    const key = `${dir}/${slug}`;
    const tier = t1set.has(key) ? 1 : t3set.has(key) ? 3 : 2;
    const display = TITLES[`${dir}/${pad(no)}`] ?? title;
    return {
      part,
      area: dir,
      areaKey,
      areaSlug,
      no,
      title: display,
      slug,
      file: `${slug}.md`,
      key,
      tier,
      id: `${PART_PREFIX[part]}-${areaNum}-${pad(no)}`,
      moc: `_MOC_${areaSlug}`,
    };
  });
  return { part, area: dir, areaKey, areaSlug, areaNum, topics, moc: `_MOC_${areaSlug}` };
});

export const ALL_TOPICS = AREAS.flatMap((a) => a.topics);

export const VAULT = 'ECE_Reviewer_Vault';

/**
 * Hand-authored, non-generated notes that live beside a part MOC rather than being rendered
 * from a payload. They are HAND-WRITTEN FILES — no generator creates or overwrites them — but
 * they are declared here so the MOC that links them cannot drift from the file on disk.
 *
 * Shape: part -> { file (basename, no extension), title, desc }.
 *
 * This matters because a part MOC is generated by `renderPartMOC` (expand.mjs): a link typed
 * directly into `_MOC_<Part>.md` is discarded the next time that MOC is rendered. The MOC
 * therefore links only entries declared here, and `renderPartMOC` checks the file exists
 * before emitting the link, so a deleted note leaves no dangling wikilink.
 */
export const PART_NOTES = {
  '01_Mathematics': {
    file: '_Math_Crash_Review',
    title: 'Math Crash Review — Last Hour',
    desc: 'Timed 60-minute pass over all nine Mathematics areas',
  },
  '02_Electronics_Engineering': {
    file: '_Electronics_Crash_Review',
    title: 'Electronics Crash Review — Last Hour',
    desc: 'Timed 60-minute pass over all nine Electronics areas',
  },
};

export function partNotePath(part, note) {
  return `${VAULT}/${part}/${note.file}.md`;
}

export function topicDir(t) {
  return `${VAULT}/${t.part}/${t.area}/Topics`;
}

export function topicPath(t) {
  return `${topicDir(t)}/${t.file}`;
}

export function mocPath(area) {
  return `${VAULT}/${area.part}/${area.area}/${area.moc}.md`;
}

export function tierCounts() {
  const c = { 1: 0, 2: 0, 3: 0 };
  for (const t of ALL_TOPICS) c[t.tier]++;
  return c;
}

if (process.argv[1] && process.argv[1].endsWith('vault.mjs')) {
  const c = tierCounts();
  console.log(`areas: ${AREAS.length}`);
  console.log(`topics: ${ALL_TOPICS.length}`);
  console.log(`T1: ${c[1]}  T2: ${c[2]}  T3: ${c[3]}`);
}
