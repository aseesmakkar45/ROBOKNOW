// ============================================================
// PHASE 3 — ELECTRICAL ENGINEERING (Complete Content)
// ============================================================
const phase3Content = {
    id: 'phase3',
    title: 'Electrical Engineering',
    icon: '⚡',
    phaseNumber: 3,
    description: 'Master the fundamentals of electricity, electronic components, power electronics, and battery technology — the lifeblood of every robotic system.',
    sections: [
        // ========== 3.1 ELECTRICITY ==========
        {
            id: 'electricity',
            title: '3.1 Electricity',
            topics: [
                {
                    id: 'voltage',
                    title: 'Voltage',
                    content: `
<h3>Voltage (Electric Potential Difference)</h3>
<p>Voltage, measured in <strong>Volts (V)</strong>, is the difference in electric potential between two points in a circuit. Think of it as the "electrical pressure" that pushes electrons through a conductor — analogous to water pressure in a pipe.</p>

<div class="concept-box">
<h4>💡 Key Concept</h4>
<p>Voltage is always measured <strong>between two points</strong>. When we say "the voltage at a point," we always mean relative to a reference point (usually ground, 0V). One Volt is defined as one Joule of energy per Coulomb of charge: <strong>1V = 1J/C</strong>.</p>
</div>

<h4>What Creates Voltage?</h4>
<ul>
<li><strong>Chemical Reaction</strong> — Batteries convert chemical energy to electrical potential (e.g., a LiPo cell produces ~3.7V)</li>
<li><strong>Electromagnetic Induction</strong> — Generators and alternators rotate coils in magnetic fields (Faraday's Law)</li>
<li><strong>Photovoltaic Effect</strong> — Solar cells convert photon energy to voltage (~0.5V per cell)</li>
<li><strong>Piezoelectric Effect</strong> — Mechanical stress on certain crystals produces voltage (used in force sensors)</li>
<li><strong>Thermoelectric Effect</strong> — Temperature difference across certain materials generates voltage (Seebeck effect)</li>
</ul>

<h4>DC vs AC Voltage</h4>
<div class="two-col">
<div class="info-card">
<h4>DC (Direct Current) Voltage</h4>
<p>Constant polarity, steady magnitude. Used in almost all robotics, microcontrollers, sensors, and motor drivers. Sources: batteries, DC power supplies, solar panels.</p>
</div>
<div class="info-card">
<h4>AC (Alternating Current) Voltage</h4>
<p>Polarity alternates sinusoidally at 50Hz or 60Hz (mains). Efficient for long-distance transmission. Converted to DC using rectifiers and voltage regulators for use in robots.</p>
</div>
</div>

<div class="diagram-container">
<div class="diagram-title">DC vs AC Voltage Waveforms</div>
<svg class="waveform-svg" viewBox="0 0 600 200" width="600" height="200">
    <!-- Axes -->
    <line class="axis" x1="50" y1="100" x2="580" y2="100"/>
    <line class="axis" x1="50" y1="20" x2="50" y2="180"/>
    <!-- DC -->
    <line x1="50" y1="40" x2="280" y2="40" stroke="#10b981" stroke-width="2.5"/>
    <text x="160" y="30" fill="#34d399" font-size="12" text-anchor="middle" font-family="Inter">DC Voltage (+5V)</text>
    <!-- AC -->
    <path d="M320,100 Q345,20 370,100 Q395,180 420,100 Q445,20 470,100 Q495,180 520,100 Q545,20 570,100" stroke="#8b5cf6" stroke-width="2.5" fill="none"/>
    <text x="445" y="30" fill="#a78bfa" font-size="12" text-anchor="middle" font-family="Inter">AC Voltage (sinusoidal)</text>
    <!-- Labels -->
    <text x="45" y="45" fill="#9ca3af" font-size="10" text-anchor="end">+V</text>
    <text x="45" y="105" fill="#9ca3af" font-size="10" text-anchor="end">0V</text>
    <text x="45" y="175" fill="#9ca3af" font-size="10" text-anchor="end">−V</text>
    <text x="315" y="195" fill="#9ca3af" font-size="10" text-anchor="middle">Time →</text>
</svg>
</div>

<h4>Common Voltage Levels in Robotics</h4>
<table class="data-table">
<thead><tr><th>Voltage</th><th>Typical Use</th><th>Example</th></tr></thead>
<tbody>
<tr><td><code>1.8V</code></td><td>Low-power IC core voltage</td><td>ESP32 internal core</td></tr>
<tr><td><code>3.3V</code></td><td>Modern MCU logic, sensors</td><td>STM32, ESP32 GPIO, I²C sensors</td></tr>
<tr><td><code>5V</code></td><td>Arduino logic, USB, servos</td><td>Arduino Uno, standard servos</td></tr>
<tr><td><code>7.4V</code></td><td>2S LiPo battery</td><td>Small robot drivetrains</td></tr>
<tr><td><code>11.1V</code></td><td>3S LiPo battery</td><td>Drones, mid-size robots</td></tr>
<tr><td><code>12V</code></td><td>Lead-acid, industrial motors</td><td>Car robots, high-torque actuators</td></tr>
<tr><td><code>24V – 48V</code></td><td>Industrial robots, BLDC motors</td><td>Robotic arms, AMRs</td></tr>
</tbody>
</table>

<div class="info-card warning">
<h4>⚠️ Voltage Mismatch Warning</h4>
<p>Never connect a 5V signal directly to a 3.3V input — you'll damage the IC. Use <strong>voltage level shifters</strong> or <strong>resistor dividers</strong> to safely interface different logic levels. Conversely, a 3.3V output driving a 5V input may not be recognized as HIGH.</p>
</div>

<h4>Measuring Voltage</h4>
<p>Use a <strong>multimeter</strong> set to DC voltage mode. Connect the probes <strong>in parallel</strong> across the two points you want to measure. A multimeter has very high input impedance (~10MΩ) to avoid disturbing the circuit. For dynamic signals, use an <strong>oscilloscope</strong> which shows voltage vs. time waveforms.</p>
`
                },
                {
                    id: 'current',
                    title: 'Current',
                    content: `
<h3>Current (Electric Current)</h3>
<p>Electric current, measured in <strong>Amperes (A)</strong>, is the rate of flow of electric charge through a conductor. One Ampere equals one Coulomb of charge flowing past a point per second: <strong>1A = 1C/s</strong>.</p>

<div class="formula-block">
<div class="formula-label">Definition of Current</div>
<div class="formula">I = dQ / dt</div>
<div class="formula-description">I = current (Amperes), Q = charge (Coulombs), t = time (seconds)</div>
</div>

<h4>Conventional Current vs. Electron Flow</h4>
<p>Historically, current direction was defined as the flow of positive charge — from the positive terminal (+) through the circuit to the negative terminal (−). In reality, <strong>electrons</strong> flow in the opposite direction (negative to positive). In engineering, we always use <strong>conventional current direction</strong> (+→−).</p>

<h4>Types of Current</h4>
<div class="two-col">
<div class="info-card">
<h4>Direct Current (DC)</h4>
<p>Unidirectional flow. Magnitude may be constant or pulsating. Used by all digital electronics, microcontrollers, and most robotic actuators.</p>
</div>
<div class="info-card">
<h4>Alternating Current (AC)</h4>
<p>Direction reverses periodically (sinusoidal in mains power). The frequency is 50Hz (Europe/Asia) or 60Hz (Americas). RMS value is used for calculations: V_rms = V_peak / √2.</p>
</div>
</div>

<h4>Current in Robotics — Typical Values</h4>
<table class="data-table">
<thead><tr><th>Component</th><th>Typical Current</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Microcontroller (idle)</td><td>5–20 mA</td><td>STM32 in run mode</td></tr>
<tr><td>Single LED</td><td>10–20 mA</td><td>Requires current-limiting resistor</td></tr>
<tr><td>I²C Sensor</td><td>0.1–5 mA</td><td>Very low power draw</td></tr>
<tr><td>Standard Servo</td><td>100–500 mA</td><td>Depends on load, stall ≈1A</td></tr>
<tr><td>Small DC Motor (no load)</td><td>100–300 mA</td><td>Stall current can be 3–10x higher</td></tr>
<tr><td>BLDC Motor (drone)</td><td>5–30 A</td><td>Depends on throttle and propeller</td></tr>
<tr><td>Industrial servo motor</td><td>5–50 A</td><td>Continuous; peak can be 3x</td></tr>
</tbody>
</table>

<div class="info-card danger">
<h4>🔴 Critical: Stall Current</h4>
<p>When a motor is physically prevented from spinning (stalled), its current draw skyrockets to its maximum — often 5–10× its running current. If your power supply or wiring can't handle this, you'll blow fuses, damage wires, or fry motor drivers. <strong>Always design for worst-case stall current.</strong></p>
</div>

<h4>Measuring Current</h4>
<p>Current is measured <strong>in series</strong> — you must break the circuit and insert the ammeter/multimeter in the path of current flow. Unlike voltage measurement, this means physically interrupting a wire. For non-invasive measurement, use a <strong>current clamp</strong> (Hall effect sensor) or a <strong>shunt resistor</strong> with a voltage measurement across it.</p>

<div class="diagram-container">
<div class="diagram-title">Measuring Current vs Voltage</div>
<svg viewBox="0 0 600 200" width="600" height="200">
    <!-- Battery -->
    <rect x="30" y="60" width="40" height="80" rx="4" stroke="#6b7280" stroke-width="1.5" fill="none"/>
    <text x="50" y="55" fill="#9ca3af" font-size="11" text-anchor="middle">Battery</text>
    <line x1="45" y1="75" x2="55" y2="75" stroke="#9ca3af" stroke-width="2"/>
    <line x1="42" y1="85" x2="58" y2="85" stroke="#9ca3af" stroke-width="1"/>
    
    <!-- Wires and load -->
    <line x1="70" y1="80" x2="200" y2="80" stroke="#60a5fa" stroke-width="1.5"/>
    <rect x="200" y="65" width="60" height="30" rx="4" stroke="#f59e0b" stroke-width="1.5" fill="rgba(245,158,11,0.1)"/>
    <text x="230" y="84" fill="#fbbf24" font-size="10" text-anchor="middle">Load</text>
    <line x1="260" y1="80" x2="330" y2="80" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="330" y1="80" x2="330" y2="140" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="330" y1="140" x2="70" y2="140" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="70" y1="140" x2="70" y2="80" stroke="#60a5fa" stroke-width="1.5"/>
    
    <!-- Ammeter (series) -->
    <circle cx="150" cy="80" r="14" stroke="#10b981" stroke-width="1.5" fill="rgba(16,185,129,0.1)"/>
    <text x="150" y="84" fill="#34d399" font-size="12" text-anchor="middle" font-weight="bold">A</text>
    <text x="150" y="60" fill="#34d399" font-size="10" text-anchor="middle">In Series</text>
    
    <!-- Voltmeter (parallel) - separate circuit -->
    <text x="440" y="55" fill="#9ca3af" font-size="11" text-anchor="middle">Battery</text>
    <rect x="420" y="60" width="40" height="80" rx="4" stroke="#6b7280" stroke-width="1.5" fill="none"/>
    <line x1="460" y1="80" x2="560" y2="80" stroke="#60a5fa" stroke-width="1.5"/>
    <rect x="500" y="65" width="60" height="30" rx="4" stroke="#f59e0b" stroke-width="1.5" fill="rgba(245,158,11,0.1)"/>
    <text x="530" y="84" fill="#fbbf24" font-size="10" text-anchor="middle">Load</text>
    <line x1="560" y1="80" x2="560" y2="140" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="560" y1="140" x2="460" y2="140" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="460" y1="140" x2="460" y2="80" stroke="#60a5fa" stroke-width="1.5"/>
    
    <!-- Voltmeter (parallel) -->
    <line x1="500" y1="95" x2="500" y2="120" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="560" y1="95" x2="560" y2="120" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,2"/>
    <circle cx="530" cy="120" r="14" stroke="#8b5cf6" stroke-width="1.5" fill="rgba(139,92,246,0.1)"/>
    <text x="530" y="124" fill="#a78bfa" font-size="12" text-anchor="middle" font-weight="bold">V</text>
    <line x1="500" y1="120" x2="516" y2="120" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="544" y1="120" x2="560" y2="120" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,2"/>
    <text x="530" y="150" fill="#a78bfa" font-size="10" text-anchor="middle">In Parallel</text>
</svg>
</div>
`
                },
                {
                    id: 'resistance',
                    title: 'Resistance',
                    content: `
<h3>Resistance</h3>
<p>Resistance, measured in <strong>Ohms (Ω)</strong>, is the opposition to the flow of electric current. Every material has some resistance. Conductors (copper, silver) have very low resistance; insulators (rubber, glass) have extremely high resistance.</p>

<div class="formula-block">
<div class="formula-label">Resistance of a Conductor</div>
<div class="formula">R = ρ × L / A</div>
<div class="formula-description">ρ = resistivity (Ω·m), L = length (m), A = cross-sectional area (m²)</div>
</div>

<h4>Factors Affecting Resistance</h4>
<ul>
<li><strong>Material</strong> — Copper: 1.68×10⁻⁸ Ω·m, Aluminum: 2.65×10⁻⁸ Ω·m, Silicon: 640 Ω·m</li>
<li><strong>Length</strong> — Longer conductor = more resistance (proportional)</li>
<li><strong>Cross-sectional area</strong> — Thicker wire = less resistance (inversely proportional)</li>
<li><strong>Temperature</strong> — For metals, resistance increases with temperature (positive temperature coefficient). For semiconductors, it decreases.</li>
</ul>

<h4>Resistors</h4>
<p>Resistors are passive components designed to provide a specific resistance. They are used for current limiting, voltage dividing, pull-ups/pull-downs, and biasing.</p>

<h4>Resistor Color Code</h4>
<table class="data-table">
<thead><tr><th>Color</th><th>Digit</th><th>Multiplier</th><th>Tolerance</th></tr></thead>
<tbody>
<tr><td>Black</td><td>0</td><td>×1</td><td>—</td></tr>
<tr><td>Brown</td><td>1</td><td>×10</td><td>±1%</td></tr>
<tr><td>Red</td><td>2</td><td>×100</td><td>±2%</td></tr>
<tr><td>Orange</td><td>3</td><td>×1kΩ</td><td>—</td></tr>
<tr><td>Yellow</td><td>4</td><td>×10kΩ</td><td>—</td></tr>
<tr><td>Green</td><td>5</td><td>×100kΩ</td><td>±0.5%</td></tr>
<tr><td>Blue</td><td>6</td><td>×1MΩ</td><td>±0.25%</td></tr>
<tr><td>Violet</td><td>7</td><td>×10MΩ</td><td>±0.1%</td></tr>
<tr><td>Grey</td><td>8</td><td>—</td><td>±0.05%</td></tr>
<tr><td>White</td><td>9</td><td>—</td><td>—</td></tr>
<tr><td>Gold</td><td>—</td><td>×0.1</td><td>±5%</td></tr>
<tr><td>Silver</td><td>—</td><td>×0.01</td><td>±10%</td></tr>
</tbody>
</table>

<h4>Series and Parallel Resistance</h4>
<div class="two-col">
<div class="formula-block">
<div class="formula-label">Series (resistances add)</div>
<div class="formula">R_total = R₁ + R₂ + R₃ + ...</div>
<div class="formula-description">Current is the same through all; voltage divides.</div>
</div>
<div class="formula-block">
<div class="formula-label">Parallel (reciprocals add)</div>
<div class="formula">1/R_total = 1/R₁ + 1/R₂ + ...</div>
<div class="formula-description">Voltage is the same across all; current divides.</div>
</div>
</div>

<h4>Voltage Divider</h4>
<p>Two resistors in series form a voltage divider — one of the most common circuits in robotics for scaling sensor outputs or creating reference voltages.</p>
<div class="formula-block">
<div class="formula-label">Voltage Divider Formula</div>
<div class="formula">V_out = V_in × R₂ / (R₁ + R₂)</div>
<div class="formula-description">R₁ is connected to V_in, R₂ is connected to ground, V_out is the junction between them.</div>
</div>

<div class="diagram-container">
<div class="diagram-title">Voltage Divider Circuit</div>
<svg viewBox="0 0 400 250" width="400" height="250">
    <!-- Vin line -->
    <line x1="200" y1="20" x2="200" y2="60" stroke="#60a5fa" stroke-width="1.5"/>
    <text x="215" y="25" fill="#60a5fa" font-size="12">V_in</text>
    <!-- R1 -->
    <rect x="185" y="60" width="30" height="60" rx="3" stroke="#f59e0b" stroke-width="1.5" fill="rgba(245,158,11,0.1)"/>
    <text x="230" y="95" fill="#fbbf24" font-size="12">R₁</text>
    <!-- Junction -->
    <line x1="200" y1="120" x2="200" y2="140" stroke="#60a5fa" stroke-width="1.5"/>
    <circle cx="200" cy="130" r="3" fill="#10b981"/>
    <line x1="200" y1="130" x2="280" y2="130" stroke="#10b981" stroke-width="1.5"/>
    <text x="295" y="135" fill="#34d399" font-size="12">V_out</text>
    <!-- R2 -->
    <rect x="185" y="140" width="30" height="60" rx="3" stroke="#f59e0b" stroke-width="1.5" fill="rgba(245,158,11,0.1)"/>
    <text x="230" y="175" fill="#fbbf24" font-size="12">R₂</text>
    <!-- GND -->
    <line x1="200" y1="200" x2="200" y2="225" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="185" y1="225" x2="215" y2="225" stroke="#9ca3af" stroke-width="2"/>
    <line x1="190" y1="230" x2="210" y2="230" stroke="#9ca3af" stroke-width="1.5"/>
    <line x1="195" y1="235" x2="205" y2="235" stroke="#9ca3af" stroke-width="1"/>
    <text x="220" y="240" fill="#9ca3af" font-size="11">GND</text>
</svg>
</div>

<h4>Pull-up and Pull-down Resistors</h4>
<p>In digital circuits, input pins must not be left "floating" (unconnected) — they'll pick up noise and give random readings. A <strong>pull-up resistor</strong> (typically 4.7kΩ–10kΩ) connects the pin to VCC, defaulting it to HIGH. A <strong>pull-down resistor</strong> connects the pin to GND, defaulting it to LOW. I²C requires external pull-ups on SDA and SCL lines (usually 4.7kΩ to 3.3V).</p>
`
                },
                {
                    id: 'capacitance',
                    title: 'Capacitance',
                    content: `
<h3>Capacitance</h3>
<p>Capacitance, measured in <strong>Farads (F)</strong>, is the ability to store electric charge. A capacitor consists of two conductive plates separated by an insulator (dielectric). When voltage is applied, charge accumulates on the plates, storing energy in the electric field.</p>

<div class="formula-block">
<div class="formula-label">Fundamental Capacitor Equations</div>
<div class="formula">Q = C × V &nbsp;&nbsp;|&nbsp;&nbsp; E = ½CV² &nbsp;&nbsp;|&nbsp;&nbsp; C = ε₀εᵣA/d</div>
<div class="formula-description">Q = charge, C = capacitance, V = voltage, E = energy stored, A = plate area, d = plate separation, ε = permittivity</div>
</div>

<h4>How Capacitors Behave</h4>
<ul>
<li><strong>DC Blocking</strong> — Once fully charged, a capacitor blocks DC current (acts as an open circuit)</li>
<li><strong>AC Passing</strong> — Capacitors allow AC signals to pass through (lower impedance at higher frequencies)</li>
<li><strong>Charge/Discharge</strong> — Follows an exponential curve with time constant τ = R × C</li>
<li><strong>Energy Storage</strong> — Stores energy in the electric field: E = ½CV²</li>
</ul>

<div class="formula-block">
<div class="formula-label">Capacitive Reactance (AC impedance)</div>
<div class="formula">Xc = 1 / (2πfC)</div>
<div class="formula-description">Xc = reactance (Ω), f = frequency (Hz), C = capacitance (F). Higher frequency → lower impedance.</div>
</div>

<h4>Types of Capacitors Used in Robotics</h4>
<table class="data-table">
<thead><tr><th>Type</th><th>Capacitance Range</th><th>Voltage</th><th>Common Uses</th></tr></thead>
<tbody>
<tr><td><strong>Ceramic (MLCC)</strong></td><td>1pF – 100µF</td><td>6V–50V</td><td>Decoupling, high-frequency filtering, bypass near ICs</td></tr>
<tr><td><strong>Electrolytic (Al)</strong></td><td>1µF – 10,000µF</td><td>6V–450V</td><td>Bulk energy storage, power supply filtering (polarized!)</td></tr>
<tr><td><strong>Tantalum</strong></td><td>0.1µF – 1,000µF</td><td>4V–50V</td><td>Stable decoupling, low ESR, compact (polarized, sensitive)</td></tr>
<tr><td><strong>Film (Polyester)</strong></td><td>1nF – 10µF</td><td>50V–630V</td><td>Timing circuits, audio, high-voltage applications</td></tr>
<tr><td><strong>Supercapacitor</strong></td><td>0.1F – 3000F</td><td>2.5V–5V</td><td>Energy backup, regenerative braking, burst power</td></tr>
</tbody>
</table>

<div class="info-card highlight">
<h4>🔌 Decoupling Capacitors — The #1 Rule in PCB Design</h4>
<p>Every IC in a robot's electronics must have a <strong>100nF ceramic capacitor</strong> placed as close as possible to its VCC and GND pins. This "decoupling cap" filters high-frequency noise from the power supply. Without it, your MCU will behave erratically — random resets, corrupted ADC readings, communication errors. For high-power ICs, add a <strong>10µF electrolytic</strong> nearby as well.</p>
</div>

<h4>Series and Parallel Capacitance</h4>
<div class="two-col">
<div class="formula-block">
<div class="formula-label">Parallel (capacitances add)</div>
<div class="formula">C_total = C₁ + C₂ + C₃ + ...</div>
<div class="formula-description">Opposite of resistors! Parallel caps add up.</div>
</div>
<div class="formula-block">
<div class="formula-label">Series (reciprocals add)</div>
<div class="formula">1/C_total = 1/C₁ + 1/C₂ + ...</div>
<div class="formula-description">Series capacitors share voltage, reducing total capacitance.</div>
</div>
</div>

<h4>RC Time Constant</h4>
<p>When a capacitor charges through a resistor, the voltage rises exponentially:</p>
<div class="formula-block">
<div class="formula-label">RC Charging Equation</div>
<div class="formula">V(t) = V_final × (1 − e^(−t/τ))</div>
<div class="formula-description">τ = R × C = time constant. After 1τ → 63.2%, 2τ → 86.5%, 3τ → 95%, 5τ → 99.3% charged.</div>
</div>

<p>This RC time constant is fundamental in robotics for debouncing buttons, creating delays, smoothing sensor signals, and designing low-pass filters. For example, a 10kΩ resistor with a 100nF capacitor gives τ = 1ms — perfect for debouncing mechanical switches.</p>
`
                },
                {
                    id: 'inductance',
                    title: 'Inductance',
                    content: `
<h3>Inductance</h3>
<p>Inductance, measured in <strong>Henrys (H)</strong>, is the property of a conductor (typically a coil) to oppose changes in current by inducing a voltage (back-EMF). Inductors store energy in a <strong>magnetic field</strong>, unlike capacitors which store energy in an electric field.</p>

<div class="formula-block">
<div class="formula-label">Inductor Voltage</div>
<div class="formula">V = L × dI/dt</div>
<div class="formula-description">V = voltage across inductor, L = inductance (Henrys), dI/dt = rate of change of current</div>
</div>

<h4>Key Properties of Inductors</h4>
<ul>
<li><strong>Oppose current changes</strong> — An inductor resists sudden changes in current. If current tries to increase suddenly, the inductor generates a voltage to oppose it.</li>
<li><strong>Pass DC, block AC</strong> — Opposite of capacitors. At DC (steady state), an ideal inductor is a short circuit. At high frequencies, its impedance increases.</li>
<li><strong>Energy storage</strong> — E = ½LI². This energy must go somewhere when the circuit opens — this is why inductive loads (motors, relays) create voltage spikes.</li>
<li><strong>Current continuity</strong> — Current through an inductor cannot change instantaneously. This is why flyback diodes are essential across motors and relays.</li>
</ul>

<div class="formula-block">
<div class="formula-label">Inductive Reactance</div>
<div class="formula">X_L = 2πfL</div>
<div class="formula-description">X_L = inductive reactance (Ω). Higher frequency → higher impedance (opposite of capacitors).</div>
</div>

<h4>Why Inductors Matter in Robotics</h4>
<div class="card-grid">
<div class="info-card">
<h4>🔄 Switching Regulators</h4>
<p>Buck and boost converters use inductors as energy storage elements to efficiently convert between voltage levels. The inductor alternately stores and releases energy each switching cycle.</p>
</div>
<div class="info-card">
<h4>🚗 Motor Coils</h4>
<p>Every motor is fundamentally an inductor. The coil's inductance affects current rise time, commutation, and the characteristic voltage spikes when switching.</p>
</div>
<div class="info-card">
<h4>📡 EMI Filtering</h4>
<p>Ferrite beads (small inductors) are placed on power lines and signal lines to filter out high-frequency electromagnetic interference from motors and switching regulators.</p>
</div>
<div class="info-card">
<h4>⚡ Flyback Protection</h4>
<p>When current through an inductive load (relay, solenoid, motor) is suddenly interrupted, the inductor tries to maintain current flow, generating a high-voltage spike that can destroy transistors.</p>
</div>
</div>

<div class="info-card danger">
<h4>🔴 Flyback Voltage Spikes — Critical for Robotics</h4>
<p>When you turn off a motor or relay, the inductor's stored energy (½LI²) has nowhere to go. It creates a voltage spike that can be <strong>hundreds of volts</strong> — easily destroying MOSFETs and driver ICs. <strong>Always place a flyback diode</strong> (e.g., 1N4007) reverse-biased across every inductive load. For faster switching, use a Schottky diode (e.g., 1N5819).</p>
</div>
`
                },
                {
                    id: 'power',
                    title: 'Power',
                    content: `
<h3>Electrical Power</h3>
<p>Power, measured in <strong>Watts (W)</strong>, is the rate of energy transfer or consumption. In electrical circuits, power is the product of voltage and current. Understanding power is critical for sizing batteries, selecting wire gauges, designing heat dissipation, and choosing power supplies for your robot.</p>

<div class="formula-block">
<div class="formula-label">Power Equations</div>
<div class="formula">P = V × I = I²R = V²/R</div>
<div class="formula-description">P = power (Watts), V = voltage, I = current, R = resistance. All three forms are equivalent via Ohm's Law.</div>
</div>

<h4>Power Budget — Essential for Robot Design</h4>
<p>Every robot project must have a <strong>power budget</strong> — a spreadsheet listing every component, its voltage requirement, and its current draw (typical and maximum). This determines your battery capacity, wire gauge, fuse ratings, and regulator specifications.</p>

<table class="data-table">
<thead><tr><th>Component</th><th>Voltage</th><th>Current (Typ)</th><th>Current (Max)</th><th>Power (Max)</th></tr></thead>
<tbody>
<tr><td>STM32F4 MCU</td><td>3.3V</td><td>30mA</td><td>100mA</td><td>0.33W</td></tr>
<tr><td>IMU (MPU6050)</td><td>3.3V</td><td>3.8mA</td><td>5mA</td><td>0.017W</td></tr>
<tr><td>WiFi (ESP32)</td><td>3.3V</td><td>80mA</td><td>500mA</td><td>1.65W</td></tr>
<tr><td>LiDAR (RPLiDAR)</td><td>5V</td><td>300mA</td><td>500mA</td><td>2.5W</td></tr>
<tr><td>4× DC Motors</td><td>12V</td><td>400mA×4</td><td>2A×4</td><td>96W</td></tr>
<tr><td>Raspberry Pi 4</td><td>5V</td><td>600mA</td><td>3A</td><td>15W</td></tr>
<tr><td><strong>TOTAL</strong></td><td>—</td><td>—</td><td>—</td><td><strong>~115W</strong></td></tr>
</tbody>
</table>

<h4>Heat Dissipation</h4>
<p>Wasted power becomes heat. Linear voltage regulators waste power as heat: P_dissipated = (V_in − V_out) × I. For example, a 7805 regulator dropping 12V to 5V at 1A dissipates (12−5)×1 = 7W — that's a lot of heat requiring a large heatsink! This is why <strong>switching regulators</strong> (buck converters) are preferred in robotics — they're 85–95% efficient.</p>

<div class="formula-block">
<div class="formula-label">Linear Regulator Heat Dissipation</div>
<div class="formula">P_heat = (V_in − V_out) × I_load</div>
<div class="formula-description">This is wasted energy. Use switching regulators for voltage drops > 2V or currents > 500mA.</div>
</div>

<h4>Wire Gauge Selection</h4>
<p>Wires have resistance, and carrying current through them causes power loss (I²R) and heating. Use this guide:</p>
<table class="data-table">
<thead><tr><th>AWG</th><th>Diameter (mm)</th><th>Max Current</th><th>Typical Use</th></tr></thead>
<tbody>
<tr><td>30 AWG</td><td>0.25mm</td><td>0.5A</td><td>Signal wires, jumper wires</td></tr>
<tr><td>26 AWG</td><td>0.40mm</td><td>1A</td><td>Sensor connections, LEDs</td></tr>
<tr><td>22 AWG</td><td>0.64mm</td><td>3A</td><td>Small motor wires, general power</td></tr>
<tr><td>18 AWG</td><td>1.02mm</td><td>7A</td><td>Motor power, battery connections</td></tr>
<tr><td>14 AWG</td><td>1.63mm</td><td>15A</td><td>High-current motors, main battery</td></tr>
<tr><td>12 AWG</td><td>2.05mm</td><td>20A</td><td>Drone ESCs, high-power systems</td></tr>
</tbody>
</table>
`
                },
                {
                    id: 'ohms-law',
                    title: "Ohm's Law",
                    content: `
<h3>Ohm's Law</h3>
<p>Ohm's Law is the single most important equation in electrical engineering. It describes the linear relationship between voltage, current, and resistance in a conductor. Named after Georg Simon Ohm (1789–1854), it applies to all resistive circuits and is the foundation for circuit analysis.</p>

<div class="formula-block">
<div class="formula-label">Ohm's Law</div>
<div class="formula" style="font-size: 28px;">V = I × R</div>
<div class="formula-description">V = Voltage (Volts) &nbsp;|&nbsp; I = Current (Amperes) &nbsp;|&nbsp; R = Resistance (Ohms)</div>
</div>

<h4>The Three Forms</h4>
<div class="three-col">
<div class="info-card">
<h4>Find Voltage</h4>
<div class="formula" style="font-size: 18px;">V = I × R</div>
<p>"How much voltage drops across this resistor?"</p>
</div>
<div class="info-card">
<h4>Find Current</h4>
<div class="formula" style="font-size: 18px;">I = V / R</div>
<p>"How much current flows through this circuit?"</p>
</div>
<div class="info-card">
<h4>Find Resistance</h4>
<div class="formula" style="font-size: 18px;">R = V / I</div>
<p>"What resistance is needed to limit current?"</p>
</div>
</div>

<h4>Practical Example: LED Current-Limiting Resistor</h4>
<p>LEDs need a resistor to limit current, otherwise they burn out. Here's how to calculate it:</p>
<div class="info-card highlight">
<h4>📝 Worked Example</h4>
<p><strong>Given:</strong> Power supply = 5V, LED forward voltage (V_f) = 2V, desired LED current = 15mA</p>
<p><strong>Voltage across resistor:</strong> V_R = 5V − 2V = 3V</p>
<p><strong>Required resistance:</strong> R = V_R / I = 3V / 0.015A = <strong>200Ω</strong></p>
<p><strong>Nearest standard value:</strong> 220Ω → I = 3V/220Ω = 13.6mA ✓</p>
<p><strong>Power dissipated by resistor:</strong> P = I²R = (0.0136)² × 220 = 0.041W → Use ¼W resistor ✓</p>
</div>

<h4>Ohm's Law in Robotics: Common Calculations</h4>
<ol>
<li><strong>Motor current draw:</strong> I = V_supply / R_winding (at stall). A 12V motor with 2Ω winding resistance draws 6A when stalled!</li>
<li><strong>Voltage drop across wires:</strong> V_drop = I × R_wire. Long runs of thin wire to motors can drop significant voltage.</li>
<li><strong>Shunt resistor for current sensing:</strong> Place a small known resistor (e.g., 0.1Ω) in series, measure voltage across it. I = V_shunt / R_shunt.</li>
<li><strong>Pull-up resistor sizing:</strong> R = V_cc / I_desired. For 3.3V I²C with 1mA: R = 3.3V/1mA = 3.3kΩ.</li>
</ol>
`
                },
                {
                    id: 'kirchhoffs-laws',
                    title: "Kirchhoff's Laws",
                    content: `
<h3>Kirchhoff's Laws</h3>
<p>Gustav Kirchhoff formulated two laws in 1845 that, together with Ohm's Law, allow us to analyze any electrical circuit, no matter how complex. These laws are based on the conservation of charge and conservation of energy.</p>

<div class="two-col">
<div class="concept-box">
<h4>📌 KCL — Kirchhoff's Current Law</h4>
<p><strong>The sum of all currents entering a node equals the sum of all currents leaving that node.</strong></p>
<div class="formula" style="font-size: 16px;">ΣI_in = ΣI_out</div>
<p style="margin-top:8px;">Based on conservation of charge — charge cannot accumulate at a point. Also stated as: the algebraic sum of all currents at a junction = 0.</p>
</div>
<div class="concept-box">
<h4>📌 KVL — Kirchhoff's Voltage Law</h4>
<p><strong>The sum of all voltage drops around any closed loop in a circuit equals zero.</strong></p>
<div class="formula" style="font-size: 16px;">ΣV = 0 (around any loop)</div>
<p style="margin-top:8px;">Based on conservation of energy — a charge going around a complete loop returns to the same potential. Voltage rises (sources) = voltage drops (loads).</p>
</div>
</div>

<h4>KCL Example — Current at a Junction</h4>
<div class="diagram-container">
<div class="diagram-title">KCL: Currents at a Node</div>
<svg viewBox="0 0 400 220" width="400" height="220">
    <!-- Central node -->
    <circle cx="200" cy="110" r="6" fill="#6C63FF"/>
    <text x="215" y="100" fill="#a5b4fc" font-size="12" font-weight="bold">Node</text>
    
    <!-- I1 in from left -->
    <line x1="60" y1="110" x2="194" y2="110" stroke="#10b981" stroke-width="2"/>
    <polygon points="180,105 194,110 180,115" fill="#10b981"/>
    <text x="120" y="100" fill="#34d399" font-size="13" text-anchor="middle" font-weight="bold">I₁ = 3A</text>
    
    <!-- I2 in from top -->
    <line x1="200" y1="25" x2="200" y2="104" stroke="#10b981" stroke-width="2"/>
    <polygon points="195,90 200,104 205,90" fill="#10b981"/>
    <text x="235" y="55" fill="#34d399" font-size="13" font-weight="bold">I₂ = 2A</text>
    
    <!-- I3 out to right -->
    <line x1="206" y1="110" x2="340" y2="110" stroke="#f87171" stroke-width="2"/>
    <polygon points="326,105 340,110 326,115" fill="#f87171"/>
    <text x="275" y="100" fill="#f87171" font-size="13" text-anchor="middle" font-weight="bold">I₃ = ?</text>
    
    <!-- I4 out to bottom -->
    <line x1="200" y1="116" x2="200" y2="200" stroke="#f87171" stroke-width="2"/>
    <polygon points="195,186 200,200 205,186" fill="#f87171"/>
    <text x="235" y="170" fill="#f87171" font-size="13" font-weight="bold">I₄ = 1A</text>
    
    <!-- Equation -->
    <text x="200" y="215" fill="#e8eaed" font-size="12" text-anchor="middle" font-family="JetBrains Mono">I₁ + I₂ = I₃ + I₄ → 3 + 2 = I₃ + 1 → I₃ = 4A</text>
</svg>
</div>

<h4>KVL Example — Voltage Around a Loop</h4>
<div class="info-card highlight">
<h4>📝 Worked Example</h4>
<p>A circuit has a 12V battery connected to two resistors in series: R₁ = 200Ω and R₂ = 100Ω.</p>
<p><strong>Step 1:</strong> Total resistance: R_total = 200 + 100 = 300Ω</p>
<p><strong>Step 2:</strong> Current (Ohm's Law): I = V/R = 12/300 = 40mA</p>
<p><strong>Step 3:</strong> Voltage drops: V_R1 = I×R₁ = 0.04×200 = 8V, V_R2 = I×R₂ = 0.04×100 = 4V</p>
<p><strong>Step 4:</strong> KVL check: +12V − 8V − 4V = 0 ✓</p>
</div>

<h4>Node Voltage Method (Nodal Analysis)</h4>
<p>For complex circuits with multiple sources and branches, use <strong>nodal analysis</strong>:</p>
<ol class="steps">
<li class="step"><h4>Choose a reference node (ground)</h4><p>Pick the node with the most connections.</p></li>
<li class="step"><h4>Label unknown node voltages</h4><p>Assign variables V₁, V₂, ... to each unknown node.</p></li>
<li class="step"><h4>Write KCL at each unknown node</h4><p>Express currents using Ohm's Law: I = (V_a − V_b)/R</p></li>
<li class="step"><h4>Solve the system of equations</h4><p>Use substitution, matrices, or a calculator.</p></li>
</ol>
`
                }
            ]
        },
        // ========== 3.2 ELECTRONICS ==========
        {
            id: 'electronics',
            title: '3.2 Electronics',
            topics: [
                {
                    id: 'diodes',
                    title: 'Diodes',
                    content: `
<h3>Diodes</h3>
<p>A diode is a two-terminal semiconductor device that allows current to flow in only one direction — from anode (+) to cathode (−). It's made from a <strong>P-N junction</strong>: a junction between P-type (positive carriers/holes) and N-type (negative carriers/electrons) semiconductor material.</p>

<h4>P-N Junction Physics</h4>
<p>When P-type and N-type semiconductors are joined, electrons diffuse from N to P and holes from P to N, creating a <strong>depletion region</strong> — a thin layer devoid of free carriers, with a built-in potential (0.6–0.7V for silicon). Applying forward voltage overcomes this barrier and current flows. Reverse voltage widens the depletion region, blocking current.</p>

<h4>Key Parameters</h4>
<table class="data-table">
<thead><tr><th>Parameter</th><th>Description</th><th>Typical Value (Si)</th></tr></thead>
<tbody>
<tr><td><strong>Forward Voltage (V_f)</strong></td><td>Voltage drop when conducting</td><td>0.6–0.7V (Si), 0.2–0.3V (Schottky)</td></tr>
<tr><td><strong>Reverse Breakdown (V_BR)</strong></td><td>Voltage at which reverse current spikes</td><td>50V–1000V+ (varies)</td></tr>
<tr><td><strong>Max Forward Current (I_f)</strong></td><td>Maximum continuous current</td><td>1A (1N4007), 3A (1N5822)</td></tr>
<tr><td><strong>Reverse Recovery Time</strong></td><td>Time to switch from on to off</td><td>~30ns (fast), ~2µs (standard)</td></tr>
</tbody>
</table>

<h4>Types of Diodes Used in Robotics</h4>
<div class="card-grid">
<div class="info-card">
<h4>Standard Rectifier (1N4007)</h4>
<p>General purpose, 1A/1000V. Used for reverse polarity protection and rectification. Slow switching (~2µs).</p>
</div>
<div class="info-card">
<h4>Schottky Diode (1N5819)</h4>
<p>Low forward voltage (0.2–0.4V), very fast switching (~5ns). Used as flyback diodes for motors and in switching regulators. Cannot withstand high reverse voltages.</p>
</div>
<div class="info-card">
<h4>Zener Diode</h4>
<p>Designed to conduct in reverse at a specific breakdown voltage (e.g., 3.3V, 5.1V). Used for voltage clamping, overvoltage protection, and simple voltage regulation.</p>
</div>
<div class="info-card">
<h4>TVS Diode</h4>
<p>Transient Voltage Suppressor. Extremely fast response to voltage spikes. Used to protect sensitive electronics from ESD and inductive transients.</p>
</div>
</div>

<h4>Critical Diode Applications in Robotics</h4>
<ul>
<li><strong>Flyback/Freewheeling Diode</strong> — Placed reverse-biased across motors, relays, and solenoids to safely absorb inductive voltage spikes when switched off. <em>NEVER drive an inductive load without one.</em></li>
<li><strong>Reverse Polarity Protection</strong> — Place a diode in series with the power input to prevent damage from reversed battery connections (costs 0.3–0.7V drop).</li>
<li><strong>Power OR-ing</strong> — Use diodes to combine multiple power sources (battery + USB) so the higher voltage automatically supplies the circuit.</li>
<li><strong>Voltage Clamping</strong> — Zener diodes clamp voltages to safe levels for MCU inputs.</li>
</ul>
`
                },
                {
                    id: 'leds',
                    title: 'LEDs',
                    content: `
<h3>LEDs (Light Emitting Diodes)</h3>
<p>An LED is a diode that emits light when forward-biased. Unlike incandescent bulbs, LEDs are extremely efficient, converting most electrical energy directly to photons. They're used in robotics for status indication, optical sensing, communication (IR), and illumination.</p>

<h4>How LEDs Work</h4>
<p>When electrons cross the P-N junction, they recombine with holes and release energy as <strong>photons</strong>. The wavelength (color) depends on the semiconductor material's <strong>bandgap energy</strong>.</p>

<table class="data-table">
<thead><tr><th>Color</th><th>Wavelength</th><th>Forward Voltage</th><th>Material</th></tr></thead>
<tbody>
<tr><td>🔴 Red</td><td>620–750nm</td><td>1.8–2.2V</td><td>GaAsP, AlGaAs</td></tr>
<tr><td>🟠 Orange</td><td>590–620nm</td><td>2.0–2.2V</td><td>GaAsP</td></tr>
<tr><td>🟡 Yellow</td><td>570–590nm</td><td>2.0–2.2V</td><td>GaP</td></tr>
<tr><td>🟢 Green</td><td>495–570nm</td><td>2.0–3.5V</td><td>GaP, InGaN</td></tr>
<tr><td>🔵 Blue</td><td>450–495nm</td><td>3.0–3.5V</td><td>InGaN, SiC</td></tr>
<tr><td>⚪ White</td><td>Broad spectrum</td><td>3.0–3.5V</td><td>InGaN + phosphor</td></tr>
<tr><td>IR (infrared)</td><td>850–940nm</td><td>1.2–1.5V</td><td>GaAs</td></tr>
</tbody>
</table>

<h4>Driving LEDs Correctly</h4>
<p>LEDs are <strong>current-driven devices</strong>. You must always limit the current with a resistor or constant-current driver. Typical current is 10–20mA for indicator LEDs.</p>

<div class="formula-block">
<div class="formula-label">LED Resistor Calculation</div>
<div class="formula">R = (V_supply − V_LED) / I_LED</div>
<div class="formula-description">Example: (3.3V − 2V) / 0.015A = 86.7Ω → use 100Ω</div>
</div>

<h4>Addressable LEDs (WS2812B / NeoPixels)</h4>
<p>Each LED contains its own driver IC. You can control hundreds of individually-addressable RGB LEDs from a single GPIO pin using a 800kHz serial protocol. Each LED consumes up to 60mA (full white). A strip of 60 LEDs can draw 3.6A — always use external power supplies!</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino</span><span class="code-copy">Copy</span></div>
<pre><code>// NeoPixel example — 30 LEDs on pin 6
#include &lt;Adafruit_NeoPixel.h&gt;
#define PIN 6
#define NUM_LEDS 30

Adafruit_NeoPixel strip(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
    strip.begin();
    strip.setBrightness(50);  // 0-255, limit to reduce power
    strip.show();             // Initialize all pixels to 'off'
}

void loop() {
    for (int i = 0; i < NUM_LEDS; i++) {
        strip.setPixelColor(i, strip.Color(0, 150, 0));  // Green
        strip.show();
        delay(50);
    }
}</code></pre>
</div>
`
                },
                {
                    id: 'bjts',
                    title: 'BJTs',
                    content: `
<h3>BJTs (Bipolar Junction Transistors)</h3>
<p>A BJT is a three-terminal semiconductor device (Base, Collector, Emitter) used as a <strong>switch</strong> or <strong>amplifier</strong>. In robotics, BJTs are commonly used to switch loads that a microcontroller can't drive directly (motors, relays, high-power LEDs).</p>

<h4>NPN vs PNP</h4>
<div class="two-col">
<div class="info-card">
<h4>NPN Transistor</h4>
<p>Current flows from Collector to Emitter when Base is driven HIGH. The load goes between V+ and the Collector. The Emitter connects to GND. <strong>Most common type in robotics.</strong></p>
<p>Common parts: <code>2N2222</code> (800mA), <code>BC547</code> (100mA), <code>TIP120</code> (5A, Darlington)</p>
</div>
<div class="info-card">
<h4>PNP Transistor</h4>
<p>Current flows from Emitter to Collector when Base is pulled LOW. The load goes between Collector and GND. The Emitter connects to V+. Used in high-side switching.</p>
<p>Common parts: <code>2N2907</code>, <code>BC557</code>, <code>TIP125</code></p>
</div>
</div>

<h4>BJT Operating Regions</h4>
<table class="data-table">
<thead><tr><th>Region</th><th>Base-Emitter</th><th>Collector-Emitter</th><th>Behavior</th></tr></thead>
<tbody>
<tr><td><strong>Cutoff</strong></td><td>V_BE < 0.7V</td><td>High impedance</td><td>OFF — no collector current</td></tr>
<tr><td><strong>Active</strong></td><td>V_BE ≈ 0.7V</td><td>Acts as current source</td><td>Amplifier mode: I_C = β × I_B</td></tr>
<tr><td><strong>Saturation</strong></td><td>V_BE ≈ 0.7V</td><td>V_CE ≈ 0.2V (low)</td><td>SWITCH ON — fully conducting</td></tr>
</tbody>
</table>

<h4>Using a BJT as a Switch (Robotics)</h4>
<p>To use an NPN BJT as a switch for a motor or relay:</p>
<div class="formula-block">
<div class="formula-label">Base Resistor Calculation</div>
<div class="formula">R_base = (V_GPIO − V_BE) / I_B</div>
<div class="formula-description">Where I_B = I_load / (β × overdrive factor). Use 10× overdrive for reliable saturation. β (hFE) ≈ 100–300 typical.</div>
</div>

<div class="info-card highlight">
<h4>📝 Worked Example: Switching a 12V Relay with Arduino</h4>
<p><strong>Relay coil:</strong> 12V, 40mA. <strong>BJT:</strong> 2N2222 (β = 100). <strong>GPIO:</strong> 5V Arduino.</p>
<p><strong>Required I_B:</strong> 40mA / (100 × 10) = 0.04mA... but we want reliable saturation, so use I_B ≈ 4mA (10× overdrive)</p>
<p><strong>R_base:</strong> (5V − 0.7V) / 4mA = 1075Ω → use <strong>1kΩ</strong></p>
<p><strong>Don't forget:</strong> Place a 1N4007 flyback diode across the relay coil!</p>
</div>
`
                },
                {
                    id: 'mosfets',
                    title: 'MOSFETs',
                    content: `
<h3>MOSFETs (Metal-Oxide-Semiconductor Field-Effect Transistors)</h3>
<p>MOSFETs are the workhorse switching devices in modern robotics. Unlike BJTs (current-controlled), MOSFETs are <strong>voltage-controlled</strong> — the gate draws virtually zero current, making them easy to drive from microcontrollers. They can handle very high currents with extremely low on-resistance.</p>

<h4>N-Channel vs P-Channel</h4>
<div class="two-col">
<div class="info-card">
<h4>N-Channel MOSFET (NMOS)</h4>
<p>Turns ON when V_GS > V_th (gate voltage above source). Used for <strong>low-side switching</strong> — load between V+ and Drain, Source to GND. Most common in robotics.</p>
<p>Common: <code>IRLZ44N</code> (47A, logic-level), <code>IRF540N</code> (33A), <code>AO3400</code> (SMD, 5.8A)</p>
</div>
<div class="info-card">
<h4>P-Channel MOSFET (PMOS)</h4>
<p>Turns ON when V_GS < −V_th (gate pulled below source). Used for <strong>high-side switching</strong> — Source to V+, load between Drain and GND.</p>
<p>Common: <code>IRF9540N</code>, <code>AO3401</code> (SMD)</p>
</div>
</div>

<h4>Key MOSFET Parameters</h4>
<table class="data-table">
<thead><tr><th>Parameter</th><th>Symbol</th><th>Significance</th></tr></thead>
<tbody>
<tr><td><strong>Gate Threshold Voltage</strong></td><td>V_GS(th)</td><td>Minimum gate voltage to start turning on (typically 1–4V)</td></tr>
<tr><td><strong>On-Resistance</strong></td><td>R_DS(on)</td><td>Resistance when fully on — determines heat. Lower is better. (mΩ range)</td></tr>
<tr><td><strong>Max Drain Current</strong></td><td>I_D(max)</td><td>Maximum continuous current (10–100A+ available)</td></tr>
<tr><td><strong>Max V_DS</strong></td><td>V_DS(max)</td><td>Maximum voltage across drain-source</td></tr>
<tr><td><strong>Gate Charge</strong></td><td>Q_g</td><td>Total charge needed to switch gate — affects switching speed</td></tr>
</tbody>
</table>

<div class="info-card warning">
<h4>⚠️ Logic-Level vs Standard MOSFETs</h4>
<p>Standard MOSFETs need 10V on the gate to fully turn on — a 3.3V or 5V microcontroller can't drive them directly! Use <strong>logic-level MOSFETs</strong> (V_GS(th) < 2.5V, fully enhanced at 4.5V) like the <code>IRLZ44N</code> or <code>IRL540N</code> for direct MCU control. Alternatively, use a gate driver IC.</p>
</div>

<h4>Power Dissipation in MOSFETs</h4>
<div class="formula-block">
<div class="formula-label">MOSFET Conduction Loss</div>
<div class="formula">P = I² × R_DS(on)</div>
<div class="formula-description">Example: 10A through a MOSFET with R_DS(on) = 22mΩ → P = 100 × 0.022 = 2.2W</div>
</div>

<h4>MOSFET as PWM Motor Controller</h4>
<p>An N-channel MOSFET can control motor speed using PWM from a microcontroller. The PWM signal switches the MOSFET on/off at high frequency (typically 1–25 kHz), and the motor sees the average voltage.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino</span><span class="code-copy">Copy</span></div>
<pre><code>// PWM motor control with MOSFET
// IRLZ44N: Gate → Pin 9 (PWM), Drain → Motor−, Source → GND
// Motor+ → 12V battery, flyback diode across motor terminals

const int MOTOR_PIN = 9;  // PWM-capable pin
const int POT_PIN = A0;   // Potentiometer for speed control

void setup() {
    pinMode(MOTOR_PIN, OUTPUT);
}

void loop() {
    int potValue = analogRead(POT_PIN);          // 0–1023
    int pwmValue = map(potValue, 0, 1023, 0, 255); // 0–255
    analogWrite(MOTOR_PIN, pwmValue);             // PWM output
    delay(10);
}</code></pre>
</div>
`
                },
                {
                    id: 'relays',
                    title: 'Relays',
                    content: `
<h3>Relays</h3>
<p>A relay is an electrically operated mechanical switch. A small control current energizes an electromagnetic coil, which pulls a mechanical armature to switch a high-power circuit. Relays provide <strong>galvanic isolation</strong> between the control circuit and the load circuit — critical when controlling mains AC or high-voltage systems.</p>

<h4>Relay Types</h4>
<div class="card-grid">
<div class="info-card">
<h4>Electromechanical Relay</h4>
<p>Mechanical contacts actuated by an electromagnetic coil. Audible click when switching. Common: SRD-05VDC-SL-C (5V coil, 10A contacts). Lifetime: ~100k–1M operations.</p>
</div>
<div class="info-card">
<h4>Solid State Relay (SSR)</h4>
<p>No moving parts — uses optocoupler + TRIAC/MOSFET internally. Silent, fast, long lifetime (>10M operations). No contact bounce. Higher cost, may need heatsink at high currents.</p>
</div>
<div class="info-card">
<h4>Reed Relay</h4>
<p>Small, fast, low-power relay using magnetic reed switch. Very low contact resistance. Used in precision measurement and signal routing. Low current capacity (0.5–1A).</p>
</div>
</div>

<h4>Relay Contact Configurations</h4>
<table class="data-table">
<thead><tr><th>Type</th><th>Description</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>SPST-NO</strong></td><td>Single Pole, Single Throw, Normally Open</td><td>Simple on/off switch</td></tr>
<tr><td><strong>SPDT</strong></td><td>Single Pole, Double Throw (NO + NC)</td><td>Select between two circuits, or on/off with failsafe</td></tr>
<tr><td><strong>DPDT</strong></td><td>Double Pole, Double Throw</td><td>Motor direction reversal (H-bridge alternative)</td></tr>
</tbody>
</table>

<div class="info-card warning">
<h4>⚠️ Relay Driving Rules</h4>
<p>1. Never drive a relay coil directly from an MCU pin — most relays draw 40–80mA, exceeding GPIO limits. Use a transistor (BJT or MOSFET).</p>
<p>2. Always place a flyback diode across the coil.</p>
<p>3. Consider relay module boards (e.g., 4-channel 5V relay module) that include driver transistors, flyback diodes, and optocouplers pre-built.</p>
</div>
`
                },
                {
                    id: 'opamps',
                    title: 'Op-Amps',
                    content: `
<h3>Operational Amplifiers (Op-Amps)</h3>
<p>An op-amp is a high-gain differential voltage amplifier with two inputs (inverting − and non-inverting +) and one output. With external feedback resistors, op-amps can perform amplification, filtering, comparison, integration, differentiation, and signal conditioning — making them essential for processing sensor signals in robotics.</p>

<h4>Ideal Op-Amp Assumptions</h4>
<ul>
<li><strong>Infinite open-loop gain</strong> (A → ∞, typically 100,000–1,000,000)</li>
<li><strong>Infinite input impedance</strong> (no current flows into inputs)</li>
<li><strong>Zero output impedance</strong> (can drive any load)</li>
<li><strong>Infinite bandwidth</strong></li>
<li><strong>Virtual short:</strong> With negative feedback, V+ ≈ V−</li>
</ul>

<h4>Key Op-Amp Configurations</h4>

<h4>1. Non-Inverting Amplifier</h4>
<div class="formula-block">
<div class="formula-label">Non-Inverting Amplifier Gain</div>
<div class="formula">V_out = V_in × (1 + R_f/R_1)</div>
<div class="formula-description">Signal goes to +input. R_f = feedback resistor, R_1 = ground resistor. Gain ≥ 1.</div>
</div>

<h4>2. Inverting Amplifier</h4>
<div class="formula-block">
<div class="formula-label">Inverting Amplifier Gain</div>
<div class="formula">V_out = −V_in × (R_f/R_1)</div>
<div class="formula-description">Signal goes through R_1 to −input. Output is inverted. +input to ground/reference.</div>
</div>

<h4>3. Voltage Follower (Buffer)</h4>
<p>Gain = 1 (output = input). Used to buffer high-impedance sensors (like pH probes or piezoelectric sensors) so they can drive low-impedance loads without signal degradation. Connect output directly back to −input.</p>

<h4>4. Differential Amplifier</h4>
<div class="formula-block">
<div class="formula-label">Differential Amplifier</div>
<div class="formula">V_out = (R_f/R_1) × (V₂ − V₁)</div>
<div class="formula-description">Amplifies the difference between two signals. Used for current sensing (measuring voltage across shunt resistor) and bridge sensor amplification (load cells, strain gauges).</div>
</div>

<h4>Common Op-Amp ICs</h4>
<table class="data-table">
<thead><tr><th>IC</th><th>Supply</th><th>Features</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><code>LM358</code></td><td>3–32V</td><td>Dual, general purpose, single-supply</td><td>Basic signal conditioning</td></tr>
<tr><td><code>MCP6002</code></td><td>1.8–6V</td><td>Dual, rail-to-rail, low power</td><td>Battery-powered sensor circuits</td></tr>
<tr><td><code>INA219</code></td><td>3–5.5V</td><td>Current/power monitor with I²C</td><td>Robot power monitoring</td></tr>
<tr><td><code>AD620</code></td><td>±2.3–18V</td><td>Instrumentation amp, high CMRR</td><td>Load cells, strain gauges, EMG</td></tr>
</tbody>
</table>

<h4>Robotics Applications of Op-Amps</h4>
<ul>
<li><strong>Amplifying sensor signals</strong> — Strain gauges produce millivolt signals that need 100–1000× amplification before ADC reading</li>
<li><strong>Active low-pass filters</strong> — Remove noise from accelerometer/gyroscope signals</li>
<li><strong>Current sensing</strong> — Differential amplifier across a shunt resistor to measure motor current</li>
<li><strong>Level shifting</strong> — Convert 0–3.3V sensor output to 0–5V for older ADCs</li>
<li><strong>Comparators</strong> — Compare sensor voltage to a threshold (line-following robots)</li>
</ul>
`
                },
                {
                    id: 'comparators',
                    title: 'Comparators',
                    content: `
<h3>Comparators</h3>
<p>A comparator is similar to an op-amp but designed specifically for comparing two voltages and producing a digital (HIGH/LOW) output. Unlike op-amps, comparators have <strong>no feedback</strong> and work in open-loop mode with very fast switching.</p>

<div class="formula-block">
<div class="formula-label">Comparator Operation</div>
<div class="formula">V+ > V− → Output = HIGH &nbsp;&nbsp;|&nbsp;&nbsp; V+ < V− → Output = LOW</div>
<div class="formula-description">The output snaps to one rail or the other. No linear region like an amplifier.</div>
</div>

<h4>Comparator vs Op-Amp</h4>
<table class="data-table">
<thead><tr><th>Feature</th><th>Comparator</th><th>Op-Amp</th></tr></thead>
<tbody>
<tr><td>Output</td><td>Digital (open-collector/push-pull)</td><td>Analog (linear within rails)</td></tr>
<tr><td>Speed</td><td>Very fast (nanoseconds)</td><td>Slower (depends on slew rate)</td></tr>
<tr><td>Feedback</td><td>None (open-loop) or positive only</td><td>Negative feedback for stability</td></tr>
<tr><td>Output saturation</td><td>Designed for rail-to-rail</td><td>May not reach rails</td></tr>
</tbody>
</table>

<h4>Hysteresis (Schmitt Trigger)</h4>
<p>A basic comparator has a problem: if the input is near the threshold, noise causes rapid oscillation (bouncing) between HIGH and LOW. Adding <strong>positive feedback</strong> (a resistor from output to +input) creates <strong>hysteresis</strong> — two different thresholds for rising and falling signals, preventing oscillation.</p>

<h4>Robotics Applications</h4>
<ul>
<li><strong>Line-following robot</strong> — Compare IR sensor voltage against threshold to detect black/white line</li>
<li><strong>Battery voltage monitor</strong> — Compare battery voltage (via divider) to reference; output triggers low-battery warning</li>
<li><strong>Overcurrent protection</strong> — Compare current sense voltage to limit; output disables motor driver</li>
<li><strong>Zero-crossing detection</strong> — Detect when AC signal crosses zero for motor commutation timing</li>
</ul>
`
                },
                {
                    id: 'adc',
                    title: 'ADC',
                    content: `
<h3>ADC (Analog-to-Digital Converter)</h3>
<p>An ADC converts a continuous analog voltage into a discrete digital number that a microcontroller can process. This is how robots "read" the analog world — temperature sensors, potentiometers, force sensors, distance sensors, and many other transducers produce analog voltages that must be digitized.</p>

<h4>Key ADC Parameters</h4>
<table class="data-table">
<thead><tr><th>Parameter</th><th>Description</th><th>Typical Values</th></tr></thead>
<tbody>
<tr><td><strong>Resolution</strong></td><td>Number of bits in output</td><td>8-bit (256 levels), 10-bit (1024), 12-bit (4096), 16-bit (65536)</td></tr>
<tr><td><strong>Reference Voltage (V_ref)</strong></td><td>Voltage that maps to max digital value</td><td>3.3V, 5V, or external reference</td></tr>
<tr><td><strong>LSB (Least Significant Bit)</strong></td><td>Voltage per digital step</td><td>V_ref / 2^n (e.g., 3.3V/4096 = 0.8mV for 12-bit)</td></tr>
<tr><td><strong>Sampling Rate</strong></td><td>Samples per second</td><td>Arduino: ~10kSPS, STM32: 1–5 MSPS, dedicated: 100+ MSPS</td></tr>
<tr><td><strong>SNR / ENOB</strong></td><td>Effective number of bits</td><td>Usually 1–2 bits less than stated resolution due to noise</td></tr>
</tbody>
</table>

<div class="formula-block">
<div class="formula-label">ADC Conversion</div>
<div class="formula">V_input = (ADC_reading / 2^n) × V_ref</div>
<div class="formula-description">Example: 12-bit ADC, V_ref = 3.3V, reading = 2048 → V = (2048/4096) × 3.3 = 1.65V</div>
</div>

<h4>ADC Architectures</h4>
<div class="card-grid">
<div class="info-card">
<h4>SAR (Successive Approximation)</h4>
<p>Most common in MCUs. Binary search algorithm. 10–18 bit, moderate speed (100kSPS–5MSPS). Good balance of speed and resolution. Used in STM32, ESP32, Arduino.</p>
</div>
<div class="info-card">
<h4>Sigma-Delta (ΔΣ)</h4>
<p>Very high resolution (16–24 bit) but slow (10–1000 SPS). Uses oversampling and noise shaping. Used in precision sensor ICs (HX711 for load cells, ADS1115).</p>
</div>
<div class="info-card">
<h4>Flash ADC</h4>
<p>Fastest (100+ MSPS) but lowest resolution (6–8 bit). Uses 2^n comparators in parallel. Used in oscilloscopes, video, radar. Not common in robotics.</p>
</div>
</div>

<h4>Practical ADC Tips for Robotics</h4>
<div class="info-card highlight">
<h4>🎯 Getting Clean ADC Readings</h4>
<p>1. <strong>Decouple the reference:</strong> Add 100nF + 10µF caps between VREF and GND.</p>
<p>2. <strong>Separate analog and digital ground planes</strong> on your PCB, connecting at a single point.</p>
<p>3. <strong>Use averaging:</strong> Read the ADC multiple times and average to reduce noise.</p>
<p>4. <strong>Add an RC low-pass filter</strong> (e.g., 1kΩ + 100nF = ~1.6kHz cutoff) before the ADC pin.</p>
<p>5. <strong>Keep analog traces short</strong> and away from PWM/motor driver traces.</p>
<p>6. <strong>Don't sample during motor switching</strong> — synchronize ADC reads with PWM cycles if possible.</p>
</div>
`
                },
                {
                    id: 'dac',
                    title: 'DAC',
                    content: `
<h3>DAC (Digital-to-Analog Converter)</h3>
<p>A DAC converts digital numbers back to analog voltages. While less common than ADCs in basic robotics, DACs are essential for generating reference voltages, audio output, precision motor control (torque commands), and driving analog actuators.</p>

<h4>DAC Applications in Robotics</h4>
<ul>
<li><strong>Generating analog control signals</strong> — Some motor controllers accept 0–10V analog speed commands</li>
<li><strong>Audio output</strong> — Robot speech/sounds (ESP32 has built-in 8-bit DACs)</li>
<li><strong>Setting reference voltages</strong> — Programmable voltage reference for comparators</li>
<li><strong>Waveform generation</strong> — Creating sine waves for testing or motor commutation</li>
</ul>

<h4>PWM as a "Poor Man's DAC"</h4>
<p>Most MCUs don't have true DACs, but you can approximate one using <strong>PWM + low-pass filter</strong>. A PWM signal at high frequency, filtered by an RC circuit, produces a DC voltage proportional to the duty cycle:</p>

<div class="formula-block">
<div class="formula-label">PWM-to-Analog Conversion</div>
<div class="formula">V_out = V_logic × (Duty Cycle / 100%)</div>
<div class="formula-description">50% duty cycle from 3.3V logic → 1.65V output (after RC filtering). Choose RC cutoff frequency << PWM frequency.</div>
</div>
`
                }
            ]
        },
        // ========== 3.3 POWER ELECTRONICS ==========
        {
            id: 'power-electronics',
            title: '3.3 Power Electronics',
            topics: [
                {
                    id: 'voltage-regulators',
                    title: 'Voltage Regulators',
                    content: `
<h3>Voltage Regulators</h3>
<p>Voltage regulators convert one DC voltage level to another, providing a stable output regardless of input variations and load changes. They are essential in robots where you need multiple voltage rails (e.g., 3.3V for MCU, 5V for servos, 12V for motors) from a single battery.</p>

<h4>Linear Regulators</h4>
<p>Linear regulators work by acting as a variable resistor, dropping the excess voltage as heat. Simple, low-noise, but <strong>inefficient</strong> — they waste power proportional to the voltage drop.</p>

<div class="formula-block">
<div class="formula-label">Linear Regulator Efficiency</div>
<div class="formula">η = V_out / V_in × 100%</div>
<div class="formula-description">Example: 3.3V output from 12V input → η = 3.3/12 = 27.5%. The other 72.5% is heat!</div>
</div>

<table class="data-table">
<thead><tr><th>Regulator</th><th>Output</th><th>Max Current</th><th>Dropout</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><code>LM7805</code></td><td>5V fixed</td><td>1.5A</td><td>~2V</td><td>Classic, requires heatsink at high current</td></tr>
<tr><td><code>LM7833</code></td><td>3.3V fixed</td><td>1A</td><td>~2V</td><td>Standard 3.3V linear</td></tr>
<tr><td><code>AMS1117-3.3</code></td><td>3.3V fixed</td><td>1A</td><td>1.1V (LDO)</td><td>Low-dropout, popular on dev boards</td></tr>
<tr><td><code>MCP1700</code></td><td>3.3V fixed</td><td>250mA</td><td>178mV</td><td>Very low dropout and quiescent current</td></tr>
<tr><td><code>LM317</code></td><td>Adjustable</td><td>1.5A</td><td>~2V</td><td>V_out = 1.25 × (1 + R2/R1)</td></tr>
</tbody>
</table>

<h4>When to Use Linear vs Switching</h4>
<div class="two-col">
<div class="info-card success">
<h4>✅ Use Linear When:</h4>
<p>• Voltage drop < 1–2V (LDO)<br>• Current < 500mA<br>• Need low noise (analog sensors)<br>• Simplicity matters<br>• Board space is tight</p>
</div>
<div class="info-card highlight">
<h4>✅ Use Switching When:</h4>
<p>• Large voltage drop (12V→3.3V)<br>• High current (>500mA)<br>• Efficiency matters (battery life)<br>• Need boost (step-up)<br>• Thermal constraints</p>
</div>
</div>
`
                },
                {
                    id: 'buck-converters',
                    title: 'Buck Converters',
                    content: `
<h3>Buck Converters (Step-Down DC-DC)</h3>
<p>A buck converter efficiently steps down voltage using high-frequency switching (100kHz–3MHz), an inductor, and a diode (or synchronous MOSFET). Efficiencies of <strong>85–95%</strong> are typical, compared to 27% for a linear regulator in the same scenario.</p>

<h4>How a Buck Converter Works</h4>
<div class="diagram-container">
<div class="diagram-title">Buck Converter Operating Principle</div>
<svg viewBox="0 0 600 300" width="600" height="300">
    <!-- Phase 1: Switch ON -->
    <text x="150" y="20" fill="#34d399" font-size="14" text-anchor="middle" font-weight="bold">Phase 1: Switch ON</text>
    <!-- Vin -->
    <text x="30" y="75" fill="#60a5fa" font-size="12" text-anchor="middle">V_in</text>
    <line x1="40" y1="70" x2="70" y2="70" stroke="#60a5fa" stroke-width="1.5"/>
    <!-- Switch (ON) -->
    <rect x="70" y="55" width="50" height="30" rx="3" stroke="#10b981" stroke-width="2" fill="rgba(16,185,129,0.15)"/>
    <text x="95" y="74" fill="#34d399" font-size="11" text-anchor="middle">ON</text>
    <!-- Inductor -->
    <line x1="120" y1="70" x2="145" y2="70" stroke="#60a5fa" stroke-width="1.5"/>
    <path d="M145,70 Q155,50 165,70 Q175,50 185,70 Q195,50 205,70 Q215,50 225,70" stroke="#f59e0b" stroke-width="2" fill="none"/>
    <text x="185" y="55" fill="#fbbf24" font-size="10" text-anchor="middle">L</text>
    <!-- Output cap and load -->
    <line x1="225" y1="70" x2="280" y2="70" stroke="#60a5fa" stroke-width="1.5"/>
    <rect x="265" y="55" width="30" height="30" rx="3" stroke="#8b5cf6" stroke-width="1.5" fill="rgba(139,92,246,0.1)"/>
    <text x="280" y="50" fill="#a78bfa" font-size="10" text-anchor="middle">Load</text>
    <!-- GND return -->
    <line x1="280" y1="85" x2="280" y2="110" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="280" y1="110" x2="40" y2="110" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="40" y1="110" x2="40" y2="70" stroke="#60a5fa" stroke-width="1.5"/>
    <!-- Diode (reverse biased) -->
    <text x="133" y="105" fill="#6b7280" font-size="10" text-anchor="middle">D (OFF)</text>
    <!-- Current path arrow -->
    <path d="M60,60 L60,45 L270,45 L270,60" stroke="#34d399" stroke-width="1" fill="none" stroke-dasharray="3,2"/>
    <polygon points="268,55 270,60 272,55" fill="#34d399"/>
    <text x="160" y="40" fill="#34d399" font-size="10" text-anchor="middle">Current through L charging ↑</text>
    
    <!-- Phase 2: Switch OFF -->
    <text x="450" y="20" fill="#f87171" font-size="14" text-anchor="middle" font-weight="bold">Phase 2: Switch OFF</text>
    <text x="330" y="215" fill="#60a5fa" font-size="12" text-anchor="middle">V_in</text>
    <line x1="340" y1="210" x2="370" y2="210" stroke="#60a5fa" stroke-width="1.5"/>
    <!-- Switch (OFF) -->
    <rect x="370" y="195" width="50" height="30" rx="3" stroke="#ef4444" stroke-width="2" fill="rgba(239,68,68,0.1)"/>
    <text x="395" y="214" fill="#f87171" font-size="11" text-anchor="middle">OFF</text>
    <!-- Inductor -->
    <line x1="420" y1="210" x2="445" y2="210" stroke="#60a5fa" stroke-width="1.5"/>
    <path d="M445,210 Q455,190 465,210 Q475,190 485,210 Q495,190 505,210 Q515,190 525,210" stroke="#f59e0b" stroke-width="2" fill="none"/>
    <text x="485" y="195" fill="#fbbf24" font-size="10" text-anchor="middle">L</text>
    <!-- Output -->
    <line x1="525" y1="210" x2="580" y2="210" stroke="#60a5fa" stroke-width="1.5"/>
    <rect x="565" y="195" width="30" height="30" rx="3" stroke="#8b5cf6" stroke-width="1.5" fill="rgba(139,92,246,0.1)"/>
    <text x="580" y="190" fill="#a78bfa" font-size="10" text-anchor="middle">Load</text>
    <!-- GND -->
    <line x1="580" y1="225" x2="580" y2="250" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="580" y1="250" x2="430" y2="250" stroke="#60a5fa" stroke-width="1.5"/>
    <!-- Diode (conducting) -->
    <line x1="430" y1="250" x2="430" y2="210" stroke="#10b981" stroke-width="2"/>
    <polygon points="425,225 430,210 435,225" fill="#10b981"/>
    <text x="415" y="240" fill="#34d399" font-size="10" text-anchor="end">D (ON)</text>
    <!-- Current path -->
    <path d="M440,200 L440,180 L570,180 L570,200" stroke="#f59e0b" stroke-width="1" fill="none" stroke-dasharray="3,2"/>
    <text x="505" y="175" fill="#fbbf24" font-size="10" text-anchor="middle">L releases energy →</text>

    <!-- Summary -->
    <text x="300" y="290" fill="#e8eaed" font-size="12" text-anchor="middle" font-family="JetBrains Mono">V_out = D × V_in (D = duty cycle = T_on / T_total)</text>
</svg>
</div>

<div class="formula-block">
<div class="formula-label">Buck Converter Output Voltage</div>
<div class="formula">V_out = D × V_in</div>
<div class="formula-description">D = duty cycle (0 to 1). 50% duty cycle from 12V → 6V output. The controller adjusts D to maintain regulated output.</div>
</div>

<h4>Popular Buck Converter Modules for Robotics</h4>
<table class="data-table">
<thead><tr><th>Module/IC</th><th>V_in Range</th><th>V_out</th><th>Current</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><code>LM2596</code></td><td>4.5–40V</td><td>Adjustable</td><td>3A</td><td>Cheap, widely available, ~80% efficient. Common on robot boards.</td></tr>
<tr><td><code>MP1584</code></td><td>4.5–28V</td><td>Adjustable</td><td>3A</td><td>Smaller, better efficiency than LM2596</td></tr>
<tr><td><code>LM3671</code></td><td>2.7–5.5V</td><td>Fixed 3.3V</td><td>600mA</td><td>Tiny SOT-23, great for battery→MCU</td></tr>
<tr><td><code>TPS54331</code></td><td>3.5–28V</td><td>Adjustable</td><td>3A</td><td>High efficiency, good for custom PCBs</td></tr>
</tbody>
</table>
`
                },
                {
                    id: 'boost-converters',
                    title: 'Boost Converters',
                    content: `
<h3>Boost Converters (Step-Up DC-DC)</h3>
<p>A boost converter steps UP voltage — producing a higher output voltage from a lower input. Useful when a single LiPo cell (3.7V) needs to power 5V logic, or when you need 12V from a 5V USB power bank.</p>

<div class="formula-block">
<div class="formula-label">Boost Converter Output Voltage</div>
<div class="formula">V_out = V_in / (1 − D)</div>
<div class="formula-description">D = duty cycle. At D = 0.5: V_out = 2 × V_in. At D = 0.75: V_out = 4 × V_in.</div>
</div>

<h4>Boost Converter Topology</h4>
<p>When the switch is ON, current flows through the inductor, building up magnetic energy. When the switch turns OFF, the inductor's voltage adds to the input voltage (V_in + V_L), charging the output capacitor through the diode to a voltage higher than V_in.</p>

<h4>Buck-Boost and SEPIC Converters</h4>
<p>When V_in may be above OR below V_out (e.g., battery discharging from 4.2V to 3.0V but you need a stable 3.3V), use a <strong>buck-boost</strong> or <strong>SEPIC</strong> topology that can both step up and step down.</p>

<table class="data-table">
<thead><tr><th>Topology</th><th>V_out vs V_in</th><th>Polarity</th><th>Complexity</th></tr></thead>
<tbody>
<tr><td><strong>Buck</strong></td><td>V_out < V_in</td><td>Same</td><td>Low</td></tr>
<tr><td><strong>Boost</strong></td><td>V_out > V_in</td><td>Same</td><td>Low</td></tr>
<tr><td><strong>Inverting Buck-Boost</strong></td><td>Any ratio</td><td>Inverted</td><td>Medium</td></tr>
<tr><td><strong>SEPIC</strong></td><td>Any ratio</td><td>Same</td><td>Medium-High</td></tr>
<tr><td><strong>Ćuk</strong></td><td>Any ratio</td><td>Inverted</td><td>Medium</td></tr>
</tbody>
</table>
`
                },
                {
                    id: 'battery-management',
                    title: 'Battery Management',
                    content: `
<h3>Battery Management Systems (BMS)</h3>
<p>A BMS is a critical electronic system that manages rechargeable battery packs, ensuring safety, longevity, and reliable operation. For multi-cell lithium batteries used in robots and drones, a BMS is <strong>absolutely essential</strong>.</p>

<h4>BMS Functions</h4>
<ul>
<li><strong>Cell Balancing</strong> — Ensures all cells in a series pack have equal voltage. Without balancing, some cells overcharge while others undercharge, reducing capacity and lifespan.</li>
<li><strong>Overcharge Protection</strong> — Disconnects charging when any cell exceeds ~4.2V (LiPo/Li-Ion). Overcharging causes thermal runaway and fire.</li>
<li><strong>Over-discharge Protection</strong> — Disconnects load when any cell drops below ~2.5V. Deep discharge permanently damages lithium cells.</li>
<li><strong>Overcurrent Protection</strong> — Limits discharge current to prevent damage and overheating.</li>
<li><strong>Temperature Monitoring</strong> — Shuts down if temperature exceeds safe limits (typically 60°C).</li>
<li><strong>State of Charge (SoC) Estimation</strong> — Coulomb counting + voltage monitoring to estimate remaining capacity.</li>
</ul>

<h4>Power Distribution Architecture</h4>
<div class="block-diagram">
<div class="block-node" style="border-color: var(--phase6-border);">Battery Pack<br><small>11.1V 3S LiPo</small></div>
<div class="block-arrow">→</div>
<div class="block-node" style="border-color: var(--phase3-border);">BMS<br><small>Protection</small></div>
<div class="block-arrow">→</div>
<div class="block-node" style="border-color: var(--phase4-border);">Power Switch<br><small>E-Stop</small></div>
<div class="block-arrow">→</div>
<div class="block-node" style="border-color: var(--phase5-border);">Distribution<br><small>Fused Rails</small></div>
</div>
<div class="block-diagram" style="margin-top:10px;">
<div class="block-node">Buck → 5V<br><small>Servos, RPi</small></div>
<div class="block-arrow" style="visibility:hidden;">→</div>
<div class="block-node">Buck → 3.3V<br><small>MCU, Sensors</small></div>
<div class="block-arrow" style="visibility:hidden;">→</div>
<div class="block-node">Direct 11.1V<br><small>Motor Drivers</small></div>
</div>
`
                },
                {
                    id: 'power-distribution',
                    title: 'Power Distribution',
                    content: `
<h3>Power Distribution</h3>
<p>Power distribution is the art of safely routing electrical power from your battery to every subsystem in your robot. Poor power distribution causes voltage drops, ground loops, EMI, and mysterious failures.</p>

<h4>Power Distribution Best Practices</h4>
<ol class="steps">
<li class="step"><h4>Use a star topology for ground</h4><p>All ground connections should return to a single point (star ground) near the battery. This prevents ground loops where motor currents create voltage differences between ground points, causing sensor noise.</p></li>
<li class="step"><h4>Separate power and signal grounds</h4><p>Keep high-current motor ground traces separate from sensitive analog/digital ground traces, joining at a single point.</p></li>
<li class="step"><h4>Use appropriately sized wires</h4><p>Main battery wires: 12–14 AWG for high-current robots. Signal wires: 22–26 AWG. Use silicone-insulated wire for flexibility.</p></li>
<li class="step"><h4>Add fuses on every power rail</h4><p>Blade fuses or polyfuses (PTC resettable fuses) protect against short circuits. Size fuses at 1.5× expected max current.</p></li>
<li class="step"><h4>Include an emergency stop (E-Stop)</h4><p>A physically accessible kill switch that disconnects battery power to all motors. Required by most robotics competition rules and essential for safety.</p></li>
<li class="step"><h4>Decouple every IC</h4><p>100nF ceramic capacitor as close as possible to every IC's power pins. 10µF bulk cap per voltage rail.</p></li>
</ol>

<div class="info-card danger">
<h4>🔴 Common Power Distribution Mistakes</h4>
<p>1. <strong>Sharing a voltage regulator between MCU and servos</strong> — Servo current spikes cause brownouts that reset the MCU.</p>
<p>2. <strong>Using breadboard for motor power</strong> — Breadboard contacts can't handle >0.5A and have high contact resistance.</p>
<p>3. <strong>Long thin wires to motors</strong> — Creates voltage drop and acts as an antenna for EMI.</p>
<p>4. <strong>No capacitor across motor terminals</strong> — DC motor brush sparking generates massive EMI. Add 100nF ceramic caps across motor terminals and from each terminal to the motor case.</p>
</div>
`
                }
            ]
        },
        // ========== 3.4 BATTERIES ==========
        {
            id: 'batteries',
            title: '3.4 Batteries',
            topics: [
                {
                    id: 'lipo',
                    title: 'LiPo Batteries',
                    content: `
<h3>LiPo (Lithium Polymer) Batteries</h3>
<p>LiPo batteries are the <strong>most popular choice for robots, drones, and RC vehicles</strong> due to their high energy density, high discharge rates, and lightweight construction. They use a lithium polymer electrolyte in a flexible pouch cell format.</p>

<h4>LiPo Specifications</h4>
<table class="data-table">
<thead><tr><th>Parameter</th><th>Value</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Nominal cell voltage</td><td>3.7V</td><td>Operating range: 3.0V (empty) to 4.2V (full)</td></tr>
<tr><td>Energy density</td><td>150–250 Wh/kg</td><td>Among the highest for rechargeable batteries</td></tr>
<tr><td>Discharge rate (C-rating)</td><td>20C – 100C</td><td>A 1000mAh 25C battery can deliver 25A</td></tr>
<tr><td>Cycle life</td><td>300–500 cycles</td><td>To 80% capacity with proper care</td></tr>
<tr><td>Self-discharge</td><td>~5% per month</td><td>Store at 3.8V per cell (storage charge)</td></tr>
</tbody>
</table>

<h4>Cell Configurations</h4>
<table class="data-table">
<thead><tr><th>Config</th><th>Cells</th><th>Nominal Voltage</th><th>Full Charge</th><th>Typical Use</th></tr></thead>
<tbody>
<tr><td>1S</td><td>1</td><td>3.7V</td><td>4.2V</td><td>Tiny robots, single-cell projects</td></tr>
<tr><td>2S</td><td>2 series</td><td>7.4V</td><td>8.4V</td><td>Small ground robots</td></tr>
<tr><td>3S</td><td>3 series</td><td>11.1V</td><td>12.6V</td><td>Drones, medium robots</td></tr>
<tr><td>4S</td><td>4 series</td><td>14.8V</td><td>16.8V</td><td>Racing drones, large robots</td></tr>
<tr><td>6S</td><td>6 series</td><td>22.2V</td><td>25.2V</td><td>Large drones, high-power systems</td></tr>
</tbody>
</table>

<h4>Understanding C-Rating</h4>
<div class="formula-block">
<div class="formula-label">Maximum Continuous Discharge Current</div>
<div class="formula">I_max = Capacity(Ah) × C-rating</div>
<div class="formula-description">Example: 2200mAh (2.2Ah) × 25C = 55A maximum continuous discharge</div>
</div>

<div class="info-card danger">
<h4>🔥 LiPo Safety — This Can Save Your Life</h4>
<p><strong>LiPo batteries can catch fire or explode if mistreated.</strong></p>
<p>• Never discharge below 3.0V per cell (use a low-voltage alarm buzzer)</p>
<p>• Never charge above 4.2V per cell (use a proper balance charger)</p>
<p>• Never puncture, crush, or short-circuit — thermal runaway results in violent fire</p>
<p>• Charge in a LiPo safety bag on a non-flammable surface, never unattended</p>
<p>• Store at 3.8V/cell (storage charge) if not using for >1 week</p>
<p>• Dispose of puffed/damaged batteries safely — discharge fully, take to recycling center</p>
<p>• Keep a Class D fire extinguisher or bucket of sand nearby when charging</p>
</div>
`
                },
                {
                    id: 'li-ion',
                    title: 'Li-Ion Batteries',
                    content: `
<h3>Li-Ion (Lithium-Ion) Batteries</h3>
<p>Li-Ion batteries use a hard cylindrical or prismatic case (vs. LiPo's soft pouch). The most famous form factor is the <strong>18650 cell</strong> (18mm diameter, 65mm length), used in everything from Tesla cars to robot battery packs.</p>

<h4>Li-Ion vs LiPo Comparison</h4>
<table class="data-table">
<thead><tr><th>Feature</th><th>Li-Ion (18650)</th><th>LiPo (pouch)</th></tr></thead>
<tbody>
<tr><td>Cell voltage</td><td>3.6–3.7V nominal</td><td>3.7V nominal</td></tr>
<tr><td>Energy density</td><td>150–270 Wh/kg</td><td>150–250 Wh/kg</td></tr>
<tr><td>Discharge rate</td><td>1C–10C typical</td><td>20C–100C</td></tr>
<tr><td>Cycle life</td><td>500–1000+ cycles</td><td>300–500 cycles</td></tr>
<tr><td>Safety</td><td>Safer (hard case, built-in PTC)</td><td>More volatile (soft pouch)</td></tr>
<tr><td>Form factor</td><td>Rigid cylinder</td><td>Flexible pouch, any shape</td></tr>
<tr><td>Best for</td><td>Long runtime, moderate current</td><td>High burst current, light weight</td></tr>
</tbody>
</table>

<h4>Popular 18650 Cells</h4>
<table class="data-table">
<thead><tr><th>Cell</th><th>Capacity</th><th>Max Discharge</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>Samsung 30Q</td><td>3000mAh</td><td>15A</td><td>Good balance of capacity and current</td></tr>
<tr><td>Sony VTC6</td><td>3000mAh</td><td>20A</td><td>High-drain applications</td></tr>
<tr><td>LG MJ1</td><td>3500mAh</td><td>10A</td><td>Maximum runtime, moderate current</td></tr>
<tr><td>Samsung 25R</td><td>2500mAh</td><td>20A</td><td>High-drain, reliable</td></tr>
</tbody>
</table>

<p>For long-runtime ground robots and robots that don't need extreme burst current, 18650 Li-Ion packs are often the better choice over LiPo — they're safer, cheaper, longer-lasting, and easily replaceable.</p>
`
                },
                {
                    id: 'nimh',
                    title: 'NiMH Batteries',
                    content: `
<h3>NiMH (Nickel-Metal Hydride) Batteries</h3>
<p>NiMH batteries are older technology but still used in some robotics applications, especially educational kits and competition robots where lithium batteries may be restricted.</p>

<h4>Key Characteristics</h4>
<ul>
<li><strong>Nominal voltage:</strong> 1.2V per cell (vs. 1.5V for alkaline, 3.7V for lithium)</li>
<li><strong>Capacity:</strong> 1000–3000 mAh (AA size)</li>
<li><strong>Discharge rate:</strong> Low (1–5C typical)</li>
<li><strong>Cycle life:</strong> 500–2000 cycles (excellent longevity)</li>
<li><strong>Self-discharge:</strong> High (~20–30% per month), but "low self-discharge" types (Eneloop) retain 70%+ after a year</li>
<li><strong>Safety:</strong> Very safe — no fire risk, no special handling needed</li>
<li><strong>Memory effect:</strong> Minimal in modern NiMH cells</li>
</ul>

<h4>When to Use NiMH</h4>
<p>NiMH is appropriate for beginner robots, educational projects, and situations where lithium batteries are banned or impractical. A pack of 6× AA NiMH cells gives 7.2V nominal — suitable for simple Arduino robots with small DC motors.</p>
`
                },
                {
                    id: 'lead-acid',
                    title: 'Lead Acid Batteries',
                    content: `
<h3>Lead Acid Batteries</h3>
<p>The oldest rechargeable battery technology (invented 1859), still used in some large robots, UPS systems, and vehicles due to extreme low cost and high surge current capability.</p>

<h4>Types</h4>
<div class="card-grid">
<div class="info-card">
<h4>SLA (Sealed Lead Acid)</h4>
<p>Maintenance-free, can be mounted in any orientation. Common in UPS and emergency lighting. 12V/7Ah is a common size for robot platforms.</p>
</div>
<div class="info-card">
<h4>AGM (Absorbed Glass Mat)</h4>
<p>Higher discharge rate than standard SLA, vibration resistant. Used in power wheelchairs and mobility scooters adapted into robot bases.</p>
</div>
</div>

<h4>Lead Acid Specifications</h4>
<ul>
<li><strong>Cell voltage:</strong> 2.0V nominal (6 cells = 12V battery)</li>
<li><strong>Energy density:</strong> 30–50 Wh/kg (very low — 5× heavier than LiPo for same energy)</li>
<li><strong>Discharge rate:</strong> 1C–5C (good surge capability)</li>
<li><strong>Cycle life:</strong> 200–500 cycles (deep cycle types: 500–1500)</li>
<li><strong>Cost:</strong> Very low (cheapest per Wh)</li>
</ul>

<p>Lead acid batteries are falling out of favor in robotics due to their extreme weight. However, they're still relevant for stationary or very large robots where weight isn't critical, and for learning — they're safe and forgiving.</p>
`
                },
                {
                    id: 'charging',
                    title: 'Battery Charging',
                    content: `
<h3>Battery Charging</h3>
<p>Each battery chemistry requires a specific charging algorithm. Using the wrong charger or settings can damage batteries, reduce lifespan, or cause fires (especially lithium).</p>

<h4>Lithium (Li-Ion/LiPo) Charging: CC-CV Method</h4>
<p>Lithium batteries must be charged using the <strong>Constant Current – Constant Voltage (CC-CV)</strong> method:</p>

<ol class="steps">
<li class="step"><h4>Constant Current Phase</h4><p>The charger supplies a constant current (typically 1C, i.e., 1A for a 1000mAh battery). Cell voltage rises from ~3.0V toward 4.2V.</p></li>
<li class="step"><h4>Constant Voltage Phase</h4><p>Once voltage reaches 4.20V ±0.05V, the charger holds voltage constant. Current gradually decreases as the cell fills up.</p></li>
<li class="step"><h4>Termination</h4><p>Charging ends when current drops to ~C/10 (e.g., 100mA for a 1000mAh cell). The cell is now ~95–100% full.</p></li>
</ol>

<h4>Balance Charging</h4>
<p>For multi-cell LiPo packs, a <strong>balance charger</strong> monitors and equalizes individual cell voltages during charging. The balance connector (small white JST-XH connector) provides access to each cell junction. <strong>Always use balance charging</strong> — it prevents dangerous cell voltage imbalances.</p>

<h4>Charger ICs for Robotics</h4>
<table class="data-table">
<thead><tr><th>IC</th><th>Chemistry</th><th>Current</th><th>Features</th></tr></thead>
<tbody>
<tr><td><code>TP4056</code></td><td>Single-cell Li-Ion/LiPo</td><td>Up to 1A</td><td>Cheap, USB charging module. Add DW01A for protection.</td></tr>
<tr><td><code>MCP73831</code></td><td>Single-cell Li-Ion/LiPo</td><td>500mA</td><td>Tiny SOT-23, programmable current</td></tr>
<tr><td><code>BQ24195</code></td><td>Li-Ion/LiPo</td><td>4.5A</td><td>I²C control, power path management, TI</td></tr>
</tbody>
</table>
`
                },
                {
                    id: 'battery-safety',
                    title: 'Battery Safety',
                    content: `
<h3>Battery Safety</h3>
<p>Batteries store enormous amounts of energy. A fully charged 3S 5000mAh LiPo contains about 55.5Wh of energy — enough to cause serious burns, fires, and toxic fume exposure if mishandled.</p>

<h4>Safety Rules — Non-Negotiable</h4>
<div class="card-grid">
<div class="info-card danger">
<h4>🔥 Never Short-Circuit</h4>
<p>A short-circuited LiPo can deliver hundreds of amps, instantly melting wires and igniting the battery. Always insulate exposed connectors and terminals.</p>
</div>
<div class="info-card danger">
<h4>🔥 Never Overcharge</h4>
<p>Charging above 4.25V per cell causes lithium plating on the anode, leading to internal short circuits and thermal runaway. Use proper chargers with 4.20V ±0.05V cutoff.</p>
</div>
<div class="info-card danger">
<h4>🔥 Never Over-Discharge</h4>
<p>Discharging below 3.0V (2.5V absolute minimum) causes copper dissolution from the anode current collector, creating internal shorts on the next charge cycle.</p>
</div>
<div class="info-card danger">
<h4>🔥 Never Puncture or Crush</h4>
<p>Physical damage creates internal short circuits. A punctured LiPo will swell, vent toxic gases, and often burst into flames that are extremely difficult to extinguish.</p>
</div>
</div>

<h4>Safe Battery Practices for Robots</h4>
<ul>
<li>Use a voltage monitor/buzzer on multi-cell packs — set alarm at 3.3V per cell</li>
<li>Implement software low-voltage cutoff in your robot's firmware</li>
<li>Physically protect batteries with rigid enclosures and padding</li>
<li>Use Anderson Powerpole or XT60 connectors for reliable, safe power connections</li>
<li>Include a fuse in the main power line (sized for max expected current × 1.5)</li>
<li>Store batteries in fireproof bags or ammo cans at room temperature</li>
<li>Never charge unattended or overnight</li>
<li>Inspect batteries before each use for puffing, damage, or unusual warmth</li>
</ul>
`
                }
            ]
        }
    ]
};
