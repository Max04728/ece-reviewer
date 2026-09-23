// widget-map.mjs — the two facts that tie widgets to the rest of the vault.
//
//   1. WHICH TOPIC each widget illustrates. `audit-widgets.mjs` only records which widgets
//      belong to an AREA; this file narrows that to the single topic note where the widget
//      belongs. Without it there is no way to render a widget "where it is discussed".
//   2. How an embed must be sized. Both `build-widgets.mjs` (MOC section) and `expand.mjs`
//      (topic notes) emit embeds, so the size lives here rather than in either of them —
//      one source of truth, or the two renderers drift apart.
//
// Keyed `<area folder> -> { <topic slug> : <widget basename, no .html> }`.
// The slug must match vault.mjs exactly, commas and all — copy it from _meta/MANIFEST.md.
//
// Rollout is deliberately incremental: an area with no entry here simply renders no widget
// sections, which is exactly how the pilot adds four notes without touching the other 404.

/**
 * Size passed to the "Embed HTML" plugin as the embed's `|...|` parameter.
 *
 * The plugin's own default height is 400px, which clips every widget (the shared runtime
 * renders a 900x460 canvas, `spec.height` 400-700 across the 83 widgets, plus a title,
 * controls, a readout and sometimes a value table).
 *
 * `max-content` sizes the frame to the widget's own content, so the frame boundary cannot land
 * mid-row: the whole widget is reached by scrolling the NOTE, and the frame reports no inner
 * scrollbar. A fixed `vh` height was tried first and always clipped the last row, because the
 * content height varies per widget and per window. That clipping grew progressively worse in
 * testing (1/2 -> 1/4 -> 1/8 of the last row visible) because snippets.css contained rules
 * making content height depend on FRAME height (a flex canvas, `min-height: 100%`,
 * `@media (max-height: ...)`), which fights fit-to-content sizing. Those rules are gone and
 * snippets.css now documents the prohibition. Keep the widget page natural-height.
 *
 * Embed HTML still measures a little SHORT of the true height, so snippets.css carries a
 * matching `padding-bottom` slack; the clipped band lands on empty space, not on content.
 */
export const WIDGET_EMBED_SIZE = 'width: 100%; height: max-content';

/** area folder -> { topic slug -> widget basename (no extension) } */
export const WIDGET_TOPICS = {
  '01_Differential_Calculus': {
    '01_Limits,_Continuity_and_L_Hopital': 'Limit_Explorer_Table_of_Values',
    '05_Extrema,_Concavity_and_Inflection': 'Curve_Sketching_Slider',
  },
  '02_Integral_Calculus': {
    '10_Plane_Areas_Polar': 'Polar_Area_Sweep',
    '11_Volumes_by_Slicing,_Disk_and_Washer': 'Disk_Washer_Method_Slider',
    '12_Volumes_by_Cylindrical_Shells': 'Shell_Method_3D',
    '15_Work_and_Hydrostatic_Force': 'Hydrostatic_Force_Depth',
  },
  '03_Differential_Equations': {
    '10_Mass-Spring-Damper_Systems': 'Damped_Oscillator_Regimes',
    '11_RLC_Circuit_Transients': 'RLC_Transient_Step_Response',
  },
  '04_Advanced_Engineering_Math': {
    '01_Complex_Numbers,_Euler_and_De_Moivre': 'Complex_Roots_Visualizer',
    '05_Taylor_and_Maclaurin_Series': 'Taylor_Series_Convergence',
    '07_Laplace_Transform_Pairs': 'Laplace_Pole_Zero_Map',
    '11_Fourier_Series_Trigonometric_and_Exponential': 'Fourier_Series_Harmonic_Builder',
    // Cross-area on purpose: Gauss-Jordan solves linear systems, and this area's own topics
    // (error analysis, root finding, interpolation, integration, ODEs) contain no such topic.
    // The widget file stays where it is; only the note it embeds into is elsewhere.
    '17_Cramer’s_Rule_and_Linear_Systems': 'Gauss_Jordan_Step_Animator',
  },
  '05_Electromagnetics': {
    '05_Gauss_Law_and_Applications': 'Gauss_Law_Flux_Surface',
    '09_Capacitance_from_Geometry': 'Capacitance_Geometry_Calculator',
    '15_Inductance_from_Geometry_and_Materials': 'Inductance_Gap_Core_Calculator',
    '20_Waves_in_Lossy_Media_and_Skin_Depth': 'Skin_Depth_vs_Frequency',
    '21_Reflection_and_Transmission_at_Boundaries': 'Reflection_Coefficient_Explorer',
  },
  '06_Control_Systems': {
    '05_Second_Order_Specifications': 'Second_Order_Zeta_Wn_Explorer',
    '09_Root_Locus_Techniques': 'Root_Locus_Animator',
    '10_Bode_Plots_and_Margins': 'Bode_Margin_Explorer',
    '14_State_Space_Representation_Basics': 'State_Space_Pole_Map',
  },
  '07_Signals_and_Systems': {
    '04_Continuous-Time_Convolution': 'Convolution_Flip_and_Slide',
    '06_Z_Transform_Definition_and_ROC': 'Z_Plane_ROC_Map',
  },
  '08_Numerical_Methods_and_Analysis': {
    // Its description says "four methods" - bisection and regula falsi (02) plus Newton and
    // secant (03) - so it belongs in both.
    '02_Bisection_and_Regula_Falsi': 'Root_Finding_Convergence_Race',
    '03_Newton-Raphson_and_Secant': 'Root_Finding_Convergence_Race',
    // Plots trapezoidal (h^2) and Simpson (h^4) error side by side.
    '06_Trapezoidal_Rule': 'Numerical_Integration_n_Slider',
    '07_Simpson’s_One-Third_and_Three-Eighth_Rules': 'Numerical_Integration_n_Slider',
  },
  '09_Engineering_Data_Analysis': {
    '08_Normal_Distribution_and_Z_Scores': 'Normal_Curve_Z_Table',
    '10_Central_Limit_Theorem': 'CLT_Sampling_Simulator',
  },
  '01_DC_Circuits': {
    '03_Delta-Wye_Transformations': 'Delta_Wye_Converter',
    '07_Thevenin_and_Norton_Equivalents': 'Thevenin_Equivalent_Builder',
    '11_First_Order_RC_and_RL_Transients': 'RC_RL_Transient_Slider',
  },
  '02_AC_Circuits': {
    '05_AC_Power,_PQS_and_Triangle': 'Power_Triangle_Interactive',
    '07_Series_Resonance': 'Resonance_Curve_Sweep',
    '09_Balanced_Wye_and_Delta_Systems': 'Three_Phase_Phasor_Viewer',
  },
  '03_Two_Port_Networks': {
    // "Enter any four numbers in any one parameter set. The other three sets are converted."
    '06_Parameter_Conversions_and_Determinants': 'Two_Port_Matrix_Calculator',
  },
  '04_Semiconductor_Devices': {
    '02_PN_Junction_and_Depletion_Region': 'PN_Junction_Depletion_Explorer',
    // Picks a topology (05) and reports ripple factor, PIV and conduction angle (06).
    '05_Rectifiers_Half-Wave,_Center-Tapped,_Bridge': 'Rectifier_Ripple_Waveform',
    '06_Filters,_Ripple_Factor_and_PIV': 'Rectifier_Ripple_Waveform',
    '12_MOSFET_Types_and_Regions': 'MOSFET_Output_Characteristic',
  },
  '05_Circuit_Analysis_and_Design': {
    '01_BJT_DC_Biasing_Configurations': 'BJT_Bias_Calculator',
    '02_Load_Lines_and_Q_Point': 'Load_Line_and_Q_Point',
    '15_Power_Amplifiers_Classes_A,_B,_AB,_C': 'Class_B_Crossover_Distortion',
  },
  '06_Power_Electronics_and_Systems': {
    '03_SCR_Phase-Controlled_Rectifiers': 'SCR_Firing_Angle_Waveform',
    // "One switch, one inductor, three voltage ratios" - buck, boost and buck-boost all at once.
    '04_Buck_Converter': 'Buck_Boost_Duty_Cycle_Slider',
    '05_Boost_Converter': 'Buck_Boost_Duty_Cycle_Slider',
    '06_Buck-Boost_Converter': 'Buck_Boost_Duty_Cycle_Slider',
    '08_PWM_Techniques': 'PWM_Duty_Cycle_Viewer',
  },
  '07_Industrial_Automation_and_Sensors': {
    '02_Linear_Op-Amp_Circuits': 'Op_Amp_Config_Playground',
    '05_Comparators_and_Schmitt_Triggers': 'Schmitt_Hysteresis_Loop',
    '08_Sallen-Key_Filter_Design': 'Sallen_Key_Filter_Tuner',
    '16_Ladder_Logic,_Timers_and_Counters': 'Ladder_Logic_Simulator',
  },
  '08_Logic_Circuits_and_Switching': {
    '06_Karnaugh_Maps': 'KMap_Solver_Interactive',
    '11_Flip-Flop_Timing,_Setup_and_Hold': 'Flip_Flop_Timing_Waveform',
    '13_Asynchronous_and_Synchronous_Counters': 'Counter_Modulo_Explorer',
  },
  '09_Microprocessors_and_Embedded': {
    '04_Instruction_and_Machine_Cycles': 'Fetch_Decode_Execute_Animator',
    '10_Serial_Interfaces_UART,_SPI,_I2C': 'I2C_SPI_Frame_Viewer',
  },
  '01_General_Chemistry': {
    '08_pH,_pOH_and_Buffers': 'Titration_Curve_Builder',
  },
  '02_University_Physics': {
    '01_Kinematics_1D_and_2D': 'Projectile_Motion_Lab',
    '08_Fluid_Dynamics_Continuity_and_Bernoulli': 'Bernoulli_Pipe_Flow',
    '16_Lenses_and_Mirrors': 'Lens_Ray_Diagram_Tool',
  },
  '03_Materials_Science': {
    '01_Crystal_Structures_and_Unit_Cells': 'Unit_Cell_3D_Viewer',
    '10_Magnetic_Properties_and_Hysteresis': 'B_H_Hysteresis_Loop',
  },
  '05_Engineering_Economy': {
    '07_PW,_FW_and_AW_Methods': 'Cash_Flow_Diagram_Builder',
    // "Book value versus year for all four methods at once" - SLM/SYD (10) and DB/DDB (11).
    '10_Depreciation_SLM_and_SYD': 'Depreciation_Schedule_Comparator',
    '11_Depreciation_DB_and_DDB': 'Depreciation_Schedule_Comparator',
  },
  '06_Engineering_Management_and_PM': {
    // "Earliest and latest start and finish, total float..." - the network passes.
    '05_Network_Passes,_Float_and_Critical_Path': 'CPM_Network_Solver',
  },
  '01_Signals_Spectra_and_Noise': {
    '07_Friis_Cascaded_Noise_Formula': 'Noise_Cascade_Calculator',
    '08_Sampling_Theorem_and_Aliasing': 'Aliasing_Demonstrator',
  },
  '02_Principles_of_Communications': {
    '01_AM_Fundamentals_and_Modulation_Index': 'AM_Modulation_Index_Visualizer',
    '06_FM_Sidebands_and_Bessel_Functions': 'FM_Sideband_Spectrum',
    '09_FM_Noise_and_Threshold_Effect': 'FM_Threshold_Effect',
    '12_Superheterodyne_Receiver': 'Superhet_Block_Diagram_Tuner',
  },
  '03_Digital_Communications': {
    // The staircase is quantizing (02) and the shrinking error waveform is SQNR (03).
    '02_PCM_Sampling,_Quantizing,_Encoding': 'PCM_Quantization_Staircase',
    '03_Quantization_Noise_and_SQNR': 'PCM_Quantization_Staircase',
    '06_Line_Coding_Schemes': 'Line_Coding_Waveform_Viewer',
    '08_Eye_Diagrams_and_Equalization': 'Eye_Diagram_ISI_Viewer',
    // "Compare 16-QAM and 16-PSK ... watch d_min decide the answer" - schemes (11), BER (12).
    '11_M-ary_PSK_and_16-QAM': 'Constellation_Diagram_Explorer',
    '12_Constellation_and_BER_Comparison': 'Constellation_Diagram_Explorer',
  },
  '04_Data_Communications_and_Networking': {
    '01_OSI_Seven-Layer_Model': 'OSI_Encapsulation_Animator',
    '10_Subnetting,_CIDR_and_VLSM': 'Subnet_Calculator_Interactive',
    '18_Cellular_Fundamentals,_Reuse_and_Handoff': 'Cellular_Frequency_Reuse_Map',
  },
  '05_Transmission_Lines_and_Waveguides': {
    '04_Reflection_Coefficient_and_VSWR': 'VSWR_and_Gamma_Explorer',
    '06_Smith_Chart': 'Smith_Chart_Interactive',
    '09_Cutoff_Frequency_and_Guide_Wavelength': 'Waveguide_Cutoff_Calculator',
  },
  '06_Antenna_Systems_and_Propagation': {
    '01_Antenna_Parameters_Directivity,_Gain,_EIRP': 'Antenna_Radiation_Pattern_Polar',
    // Two-ray ground-reflection model and its crossover distance -> ground wave.
    '07_Ground_Wave_Propagation': 'Signal_Strength_vs_Location',
    '08_Space_Wave_and_Radio_Horizon': 'Radio_Horizon_Calculator',
    '11_Radar_Range_Equation_and_Microwave_Links': 'Radar_Range_Slider',
    '14_Optical_Fiber_NA,_V_Number_and_Modes': 'Fiber_NA_and_Modes',
  },
};

/**
 * The widget that belongs in a given topic note, or null when the topic has none.
 * @param {string} areaName  area folder, e.g. '02_Integral_Calculus'
 * @param {string} slug      topic slug, e.g. '12_Volumes_by_Cylindrical_Shells'
 */
export function widgetFor(areaName, slug) {
  return WIDGET_TOPICS[areaName]?.[slug] ?? null;
}

/** Every widget basename mentioned in the map, for coverage checks. */
export function mappedWidgets() {
  return Object.values(WIDGET_TOPICS).flatMap((topics) => Object.values(topics));
}
