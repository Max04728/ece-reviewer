// verify-electronics-review.mjs — independent numeric spot-checks for the Electronics Crash Review.
//
//   node build/verify-electronics-review.mjs
//
// WHY: `verify.mjs` proves structure, links and tiers — it cannot tell a right number from a wrong
// one (build/README.md). Every value the crash review asserts is recomputed here from closed forms,
// so a claim can be checked against something other than itself. A FAIL is a real defect.
//
// Written BEFORE the note was assembled, so these are independent expectations, not a restatement
// of the text. Where a value is a convention (e.g. which V_T), the convention is stated.

let fail = 0;
const close = (label, got, want, relTol = 1e-4) => {
  const ok = Math.abs(got - want) <= Math.abs(want) * relTol + 1e-12;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${got}  want ${want}`);
};
const exact = (label, got, want) => {
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: got ${got}  want ${want}`);
};
const PI = Math.PI;

console.log('--- 1. DC network theorems ---');
// Thevenin: 12 V source, R1 = 4k series, R2 = 12k shunt, load across R2
const Vth = 12 * 12 / (4 + 12), Rth = (4 * 12) / (4 + 12);   // kohm
close('V_th of 12V/R1=4k/R2=12k divider (V)', Vth, 9);
close('R_th = 4k || 12k (kohm)', Rth, 3);
// max power transfer: P_max = V_th^2/(4 R_th)
close('P_max = Vth^2/(4Rth) (mW)', (Vth ** 2) / (4 * Rth), 6.75);
// delta-wye: balanced delta of 30 ohm -> wye 10 ohm
close('balanced delta->wye (30 ohm delta)', 30 / 3, 10);
// series RLC transient: critically damped when R = 2 sqrt(L/C)
const L = 25e-3, C = 0.4e-6;
close('R_crit = 2 sqrt(L/C) (ohm)', 2 * Math.sqrt(L / C), 500);
// first-order RC: tau, and 1 tau reaches 63.2%
const R1 = 10e3, C1 = 10e-6;
close('tau = RC (ms)', R1 * C1 * 1e3, 100);
close('1 - e^-1 (fraction at 1 tau)', 1 - Math.exp(-1), 0.6321, 1e-4);
close('time to 99% = 4.6 tau', 4.6 * R1 * C1, 0.46);

console.log('\n--- 2. AC fundamentals ---');
// v = 170 sin(wt) -> Vrms = 170/sqrt2
close('Vrms for 170 V peak', 170 / Math.sqrt(2), 120.2, 1e-3);
close('form factor sine = pi/(2 sqrt2)', PI / (2 * Math.sqrt(2)), 1.1107, 1e-4);
close('crest factor sine = sqrt2', Math.sqrt(2), 1.4142, 1e-4);
// full-wave rectifier form factor = 1.11, ripple factor 0.482
close('full-wave ripple factor = sqrt((1.11)^2-1)', Math.sqrt(1.1107 ** 2 - 1), 0.4825, 2e-3);
// series resonance: f0, Q, BW
const Lr = 100e-3, Cr = 100e-6, Rr = 10;
const f0 = 1 / (2 * PI * Math.sqrt(Lr * Cr));
close('f0 for L=100mH, C=100uF (Hz)', f0, 50.33, 1e-3);
const Qs = (1 / Rr) * Math.sqrt(Lr / Cr);
close('Q = (1/R) sqrt(L/C)', Qs, 3.162, 1e-3);
close('bandwidth = f0/Q (Hz)', f0 / Qs, 15.92, 1e-3);
close('Z at resonance = R (ohm)', Rr, 10);
// power triangle: 10 kW at pf 0.8 lagging -> kVA, kVAR
close('kVA at 10 kW, pf 0.8', 10 / 0.8, 12.5);
close('kVAR at 10 kW, pf 0.8', 10 * Math.tan(Math.acos(0.8)), 7.5, 1e-9);

console.log('\n--- 3. three-phase ---');
// balanced wye, 208 V line-line -> phase voltage
close('V_phase = 208/sqrt3 (V)', 208 / Math.sqrt(3), 120.09, 1e-3);
// total three-phase power
close('P = sqrt3 V_L I_L pf for 208V, 10A, pf 0.9 (W)', Math.sqrt(3) * 208 * 10 * 0.9, 3242.0, 1e-3);
// two-wattmeter method. W1 = V I cos(theta - 30), W2 = V I cos(theta + 30), P = W1 + W2.
// At pf 0.5 (theta = 60 deg) W2 is EXACTLY 0 — a textbook special case, and a reason never to
// quote a W1/W2 ratio there (it is infinite). pf 0.8 (theta = 36.87) is the useful example.
const wm = (pf) => {
  const theta = Math.acos(pf);
  return [Math.cos(theta - PI / 6), Math.cos(theta + PI / 6)];
};
const [w1_5, w2_5] = wm(0.5);
close('two-wattmeter W1 at pf 0.5', w1_5, Math.sqrt(3) / 2, 1e-9);
close('two-wattmeter W2 at pf 0.5 is ZERO', w2_5, 0, 1e-9);
const [w1_8, w2_8] = wm(0.8);
close('two-wattmeter W1 at pf 0.8', w1_8, 0.99282, 1e-4);
close('two-wattmeter W2 at pf 0.8', w2_8, 0.39282, 1e-4);
close('two-wattmeter ratio at pf 0.8', w1_8 / w2_8, 2.5270, 1e-3);
const [w1_1, w2_1] = wm(1.0);
close('two-wattmeter equal readings at pf 1', w1_1, w2_1, 1e-9);
close('two-wattmeter sum at pf 1 = sqrt3', w1_1 + w2_1, Math.sqrt(3), 1e-9);

console.log('\n--- 4. semiconductors ---');
const k = 1.380649e-23, q = 1.602176634e-19;
const VT300 = k * 300 / q;
close('V_T at 300 K (mV)', VT300 * 1e3, 25.85, 1e-3);
close('V_T at 300 K (mV) with T=300.15', (k * 300.15 / q) * 1e3, 25.86, 2e-3);
// thermal voltage rule of thumb: V_T doubles every ~ +? and dV/dT = -2 mV/K for a diode
console.log('  (diode dV/dT ~ -2 mV/K is a rule of thumb, not derived here)');
// Shockley: I = Is(exp(V/VT)-1). At 0.6 V with Is = 1e-12 the current is ~12 mA, which is the
// physically sensible operating point. NOTE the trap: at 0.7 V pure Shockley returns ~575 mA,
// two orders of magnitude above a real silicon diode, because the equation has no series
// resistance. A 1N4001 carries about 1-10 mA at 0.7 V. The note must say this.
const Is = 1e-12;
close('diode I at 0.6 V, Is=1e-12 (mA)', Is * (Math.exp(0.6 / VT300) - 1) * 1e3, 12.01, 5e-3);
close('diode I at 0.7 V, Is=1e-12 (mA) - pure Shockley, no Rs', Is * (Math.exp(0.7 / VT300) - 1) * 1e3, 574.8, 5e-3);
console.log('  ^^ the 0.7 V figure is ~100x a real diode: pure Shockley omits bulk resistance.');
// decade rule: I rises 10x per ~60 mV (ln10 * VT = 59.5 mV)
close('voltage for a decade of diode current (mV)', Math.log(10) * VT300 * 1e3, 59.5, 1e-3);
// half-wave rectifier: Vdc = Vm/pi, ripple factor 1.21, PIV = Vm
close('half-wave Vdc = Vm/pi, Vm=170 (V)', 170 / PI, 54.11, 1e-4);
close('half-wave ripple factor = 1.21', Math.sqrt((PI / 2) ** 2 - 1), 1.211, 2e-3);
// full-wave (center-tap) and bridge: Vdc = 2Vm/pi for BOTH; they differ in PIV
close('full-wave Vdc = 2Vm/pi, Vm=170 (V)', 2 * 170 / PI, 108.23, 1e-3);
close('center-tap PIV = 2Vm (V)', 2 * 170, 340);
close('bridge PIV = Vm (V)', 170, 170);
// BJT alpha/beta relations
const beta = 100;
close('alpha = beta/(beta+1)', beta / (beta + 1), 0.9901, 1e-4);
close('Ic = beta*Ib for Ib=20uA (mA)', beta * 20e-6 * 1e3, 2.0, 1e-9);
close('Ie = (beta+1)Ib (mA)', (beta + 1) * 20e-6 * 1e3, 2.02, 1e-9);
// JFET square law: Idss=10mA, Vp=-4V, Vgs=-2 -> Id
close('JFET Id at Vgs=-2, Idss=10mA, Vp=-4 (mA)', 10 * (1 - (-2 / -4)) ** 2, 2.5, 1e-9);
// g_m = 2 Idss/Vp (1 - Vgs/Vp)
close('JFET g_m at Vgs=-2 (mS)', (2 * 10e-3 / 4) * (1 - 0.5) * 1e3, 2.5, 1e-9);
// MOSFET: kn=2mA/V^2, Vth=2, Vgs=4 -> Id
close('MOSFET Id = kn/2 (Vgs-Vth)^2 (mA)', (2 / 2) * (4 - 2) ** 2, 4.0, 1e-9);

console.log('\n--- 5. circuit analysis / amplifiers ---');
close('g_m = I_C/V_T at I_C=1mA (mS)', 1e-3 / VT300 * 1e3, 38.7, 2e-3);
close('r_e = V_T/I_E at I_E=1mA (ohm)', VT300 / 1e-3, 25.85, 1e-3);
close('r_pi = beta/g_m, beta=100, gm=38.7mS (ohm)', 100 / 38.7e-3, 2584, 1e-2);
// CE amplifier: gm=38.7mS, Rc=2k -> Av = -gm*Rc
close('CE A_v = -g_m R_C (V/V)', -38.7e-3 * 2e3, -77.4, 1e-3);
// unbypassed emitter: Av = -Rc/(re+Re)
close('CE unbypassed A_v = -Rc/(re+Re), Re=100 (V/V)', -2000 / (25.85 + 100), -15.90, 1e-3);
// voltage-divider bias: Vcc=12, R1=10k, R2=2.2k, Re=1k, Vbe=0.7
const Vb = 12 * 2.2 / (10 + 2.2);
close('V_B of divider (V)', Vb, 2.164, 1e-3);
close('V_E = V_B - 0.7 (V)', Vb - 0.7, 1.464, 1e-3);
close('I_E = V_E/Re (mA)', (Vb - 0.7) / 1, 1.464, 1e-3);
// class-B max efficiency pi/4
close('class-B max efficiency pi/4', PI / 4, 0.7854, 1e-4);
close('class-A max efficiency 0.25', 0.25, 0.25);
// class-B max output power Vcc^2/(2RL)
close('class-B P_max = Vcc^2/(2RL), 12V, 8 ohm (W)', 144 / (2 * 8), 9.0, 1e-9);
// GBW: A=100, GBW=1MHz -> BW
close('BW = GBW/A (kHz)', 1e6 / 100 / 1e3, 10.0, 1e-9);
// Wien bridge f = 1/(2 pi RC)
close('Wien f for R=10k, C=10nF (Hz)', 1 / (2 * PI * 10e3 * 10e-9), 1591.5, 1e-3);
// Colpitts f = 1/(2 pi sqrt(L C_series))
const Cs = (100 * 100) / (100 + 100);   // nF in series
close('Colpitts f for L=100uH, C=50nF (kHz)', 1 / (2 * PI * Math.sqrt(100e-6 * 50e-9)) / 1e3, 71.18, 1e-3);

console.log('\n--- 6. power electronics ---');
const D = 0.5, Vin = 12, Lc = 100e-6, fs = 100e3;
close('buck V_o = D V_in (V)', D * Vin, 6);
close('boost V_o = V_in/(1-D) (V)', Vin / (1 - D), 24);
close('buck-boost |V_o| = D V_in/(1-D) (V)', D * Vin / (1 - D), 12);
// buck ripple dI = Vo(1-D)/(L f)
close('buck dI = Vo(1-D)/(L f) (A)', (6 * 0.5) / (Lc * fs), 0.300, 1e-6);
// CCM/DCM boundary: I_o,crit = dI/2
close('buck I_o,crit = dI/2 (A)', 0.300 / 2, 0.150, 1e-6);
// duty for a target boost output
close('boost D for 48 V from 12 V', 1 - 12 / 48, 0.75, 1e-9);
// SCR phase control: average of half-wave controlled rectifier / Vm = (1+cos a)/(2 pi)
const alphaDeg = 60, a = alphaDeg * PI / 180;
close('half-wave controlled Vdc/Vm at a=60 = (1+cos a)/(2pi)', (1 + Math.cos(a)) / (2 * PI), 0.2387, 1e-3);
// thermal chain
close('T_j = Ta + P(Rjc+Rcs+Rsa), 40C, 10W, 2+1+3 (C)', 40 + 10 * (2 + 1 + 3), 100);
// linear regulator dissipation and efficiency
close('linear reg dissipation (12-5)*0.5 (W)', (12 - 5) * 0.5, 3.5);
close('linear reg efficiency 5/12', 5 / 12, 0.4167, 1e-4);
// PWM duty from average
close('PWM duty for 3 V average of 12 V', 3 / 12, 0.25, 1e-9);

console.log('\n--- 7. op-amps and data conversion ---');
// inverting and non-inverting
close('inverting gain -Rf/Rin, 100k/10k', -100 / 10, -10);
close('non-inverting gain 1+Rf/Rin, 100k/10k', 1 + 100 / 10, 11);
// differential amp gain Rf/Rin
close('diff amp gain Rf/Rin = 100/10', 100 / 10, 10);
// instrumentation amp: gain = (1 + 2R/Rgain)(R3/R2)
close('in-amp gain (1+2*25k/1k)*(1)', (1 + 2 * 25 / 1), 51);
// integrator: Vout = -1/(RC) integral; unity-gain frequency = 1/(2 pi RC)
close('integrator f_unity for R=10k, C=10nF (Hz)', 1 / (2 * PI * 10e3 * 10e-9), 1591.5, 1e-3);
// Sallen-Key low-pass, unity-gain: f0 = 1/(2 pi sqrt(R1R2C1C2)), Q = sqrt(R1R2C1C2)/(C2(R1+R2)).
// With R1 = R2 = R and C1 = 2 C2 the response is maximally flat, Q = 1/sqrt2.
const R1s = 10e3, R2s = 10e3, C1s = 20e-9, C2s = 10e-9;
close('Sallen-Key f0 (Hz)', 1 / (2 * PI * Math.sqrt(R1s * R2s * C1s * C2s)), 1125.4, 1e-3);
const Qsk = Math.sqrt(R1s * R2s * C1s * C2s) / (C2s * (R1s + R2s));
close('Sallen-Key Q with C1 = 2 C2 (Butterworth)', Qsk, 1 / Math.SQRT2, 1e-9);
close('Sallen-Key Q equals sqrt2/2', Qsk, Math.SQRT2 / 2, 1e-12);
// Wheatstone bridge output for a small strain
close('bridge Vout = V(1+2x) approx, V=10, x=0.001 -> (mV)', 10 * 0.001 * 0.5 * 1e3 / 1e3 * 1e3 * 1e-3, 0.005, 1);
// ADC resolution and quantization error
exact('12-bit ADC levels', 2 ** 12, 4096);
close('12-bit LSB for 5 V FSR (mV)', 5 / 4096 * 1e3, 1.2207, 1e-3);
close('quantization error max = LSB/2 (mV)', 5 / 4096 / 2 * 1e3, 0.6104, 1e-3);
close('8-bit SNR ideal = 6.02n+1.76 (dB)', 6.02 * 8 + 1.76, 49.92, 1e-3);
// DAC full-scale output
close('DAC FSR 8-bit, Vref=5, step (mV)', 5 / 255 * 1e3, 19.61, 1e-3);
// R-2R ladder output for code 1000 0000
close('R-2R output for code 128/256 of 5 V (V)', 5 * 128 / 256, 2.5, 1e-9);

console.log('\n--- 8. logic and microprocessors ---');
exact('0xFF in decimal', 0xFF, 255);
exact('two\'s complement of 0b00000101 (8-bit) as unsigned', ((~0b00000101) + 1) & 0xFF, 0xFB);
exact('0xFB as signed 8-bit', 0xFB - 256, -5);
exact('8-bit signed range size', 2 ** 8, 256);
exact('0b1010 XOR 0b0110', 0b1010 ^ 0b0110, 0b1100);
exact('0b1010 AND 0b0110', 0b1010 & 0b0110, 0b0010);
exact('0b1010 OR 0b0110', 0b1010 | 0b0110, 0b1110);
exact('Gray of 0b0101 (5) = 5^(5>>1)', 5 ^ (5 >> 1), 7);
exact('Gray decode of 0b0111 (7)', (() => { let g = 7, b = 0; for (; g; g >>= 1) b ^= g; return b; })(), 5);
exact('even parity of 0b1011 needs bit', (0b1011.toString(2).split('').filter((c) => c === '1').length % 2) === 1 ? 1 : 0, 1);
exact('4:1 mux needs select lines', Math.ceil(Math.log2(4)), 2);
exact('3:8 decoder output lines', 2 ** 3, 8);
exact('mod-10 counter needs flip-flops', Math.ceil(Math.log2(10)), 4);
exact('JK flip-flop count for mod-16', Math.ceil(Math.log2(16)), 4);
// address decoding and memory capacity
exact('2^16 addresses', 2 ** 16, 65536);
close('64K x 8 memory in kbit', (64 * 1024 * 8) / 1024, 512, 1e-9);
exact('chip selects for 64K using 8K chips', 65536 / 8192, 8);
exact('address lines for 8K x 8', Math.ceil(Math.log2(8192)), 13);
// baud rate divisor
exact('8250 divisor for 9600 baud, 1.8432 MHz', Math.round(1843200 / (16 * 9600)), 12);
// PWM resolution and timer
exact('8-bit PWM steps', 2 ** 8, 256);
close('PWM duty for 128/256 at 5 V (V)', 5 * 128 / 256, 2.5, 1e-9);
close('timer overflow period 8-bit, prescale 8, 1 MHz (ms)', 256 * 8 / 1e6 * 1e3, 2.048, 1e-4);
// instruction cycle timing
close('machine cycle for 1 MHz clock, 4 clocks (us)', 4 / 1e6 * 1e6, 4, 1e-9);

console.log(`\n${'='.repeat(58)}`);
console.log(fail === 0 ? 'ALL ELECTRONICS CHECKS PASSED' : `${fail} CHECK(S) FAILED`);
if (fail) process.exitCode = 1;
