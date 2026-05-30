// ============================================================
// PHASE 5 — SENSORS (Complete Content)
// ============================================================
const phase5Content = {
    id: 'phase5',
    title: 'Sensors',
    icon: '📡',
    phaseNumber: 5,
    description: 'Master every sensor category used in robotics — from IMUs and encoders to LiDAR, cameras, and force-torque sensors. Learn how they work, how to interface them, and how to process their data.',
    sections: [
        // ========== 5.1 MOTION SENSORS ==========
        {
            id: 'motion-sensors',
            title: '5.1 Motion Sensors',
            topics: [
                {
                    id: 'accelerometers',
                    title: 'Accelerometers',
                    content: `
<h3>Accelerometers</h3>
<p>An accelerometer measures <strong>proper acceleration</strong> — the acceleration relative to free fall. Crucially, a stationary accelerometer sitting on a table measures <strong>1g upward</strong> (the normal force from the table), not zero. This is because it measures the reaction force to gravity, not gravitational acceleration itself.</p>

<h4>How MEMS Accelerometers Work</h4>
<p>Modern accelerometers are MEMS (Micro-Electro-Mechanical Systems) devices. A tiny proof mass is suspended by microscopic spring-like silicon flexures. When the device accelerates, the proof mass deflects relative to the substrate. This deflection is measured as a change in capacitance between comb-finger electrodes. The electronics convert this capacitance change into a voltage proportional to acceleration.</p>

<div class="diagram-container">
<div class="diagram-title">MEMS Accelerometer — Capacitive Sensing</div>
<svg viewBox="0 0 500 200" width="500" height="200">
    <!-- Fixed electrode left -->
    <rect x="50" y="60" width="12" height="80" rx="2" fill="#6C63FF" opacity="0.7"/>
    <rect x="50" y="75" width="40" height="8" rx="1" fill="#6C63FF" opacity="0.5"/>
    <rect x="50" y="95" width="40" height="8" rx="1" fill="#6C63FF" opacity="0.5"/>
    <rect x="50" y="115" width="40" height="8" rx="1" fill="#6C63FF" opacity="0.5"/>
    <text x="40" y="55" fill="#a5b4fc" font-size="10" text-anchor="middle">Fixed</text>

    <!-- Proof mass (center) -->
    <rect x="200" y="40" width="100" height="120" rx="4" stroke="#00D9FF" stroke-width="2" fill="rgba(0,217,255,0.1)"/>
    <text x="250" y="105" fill="#00D9FF" font-size="12" text-anchor="middle" font-weight="bold">Proof Mass</text>
    <!-- Spring flexures -->
    <path d="M200,100 Q180,90 160,100 Q140,110 120,100" stroke="#fbbf24" stroke-width="2" fill="none"/>
    <path d="M300,100 Q320,90 340,100 Q360,110 380,100" stroke="#fbbf24" stroke-width="2" fill="none"/>
    <text x="135" y="125" fill="#fbbf24" font-size="10" text-anchor="middle">Spring</text>
    <text x="365" y="125" fill="#fbbf24" font-size="10" text-anchor="middle">Spring</text>
    <!-- Comb fingers from proof mass left -->
    <rect x="160" y="75" width="40" height="8" rx="1" fill="rgba(0,217,255,0.4)"/>
    <rect x="160" y="95" width="40" height="8" rx="1" fill="rgba(0,217,255,0.4)"/>
    <rect x="160" y="115" width="40" height="8" rx="1" fill="rgba(0,217,255,0.4)"/>
    <!-- Fixed electrode right -->
    <rect x="438" y="60" width="12" height="80" rx="2" fill="#6C63FF" opacity="0.7"/>
    <rect x="410" y="75" width="40" height="8" rx="1" fill="#6C63FF" opacity="0.5"/>
    <rect x="410" y="95" width="40" height="8" rx="1" fill="#6C63FF" opacity="0.5"/>
    <rect x="410" y="115" width="40" height="8" rx="1" fill="#6C63FF" opacity="0.5"/>
    <!-- Comb fingers from proof mass right -->
    <rect x="300" y="75" width="40" height="8" rx="1" fill="rgba(0,217,255,0.4)"/>
    <rect x="300" y="95" width="40" height="8" rx="1" fill="rgba(0,217,255,0.4)"/>
    <rect x="300" y="115" width="40" height="8" rx="1" fill="rgba(0,217,255,0.4)"/>
    <!-- Capacitance labels -->
    <text x="130" y="155" fill="#34d399" font-size="10" text-anchor="middle">C₁ changes</text>
    <text x="370" y="155" fill="#34d399" font-size="10" text-anchor="middle">C₂ changes</text>
    <!-- Acceleration arrow -->
    <path d="M250,170 L350,170" stroke="#f87171" stroke-width="2" marker-end="url(#arrowR)"/>
    <defs><marker id="arrowR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f87171"/></marker></defs>
    <text x="290" y="190" fill="#f87171" font-size="11" text-anchor="middle">Acceleration →</text>
</svg>
</div>

<h4>Accelerometer Key Parameters</h4>
<table class="data-table">
<thead><tr><th>Parameter</th><th>Typical Values</th><th>Significance</th></tr></thead>
<tbody>
<tr><td><strong>Full-Scale Range</strong></td><td>±2g, ±4g, ±8g, ±16g</td><td>Larger range = less resolution. Use ±2g for orientation, ±16g for crash detection</td></tr>
<tr><td><strong>Sensitivity</strong></td><td>16384 LSB/g (±2g, 16-bit)</td><td>Digital counts per g. Sensitivity = 32768 / full_scale</td></tr>
<tr><td><strong>Noise Density</strong></td><td>100–400 µg/√Hz</td><td>Lower = less noise at a given bandwidth</td></tr>
<tr><td><strong>Bandwidth</strong></td><td>5 Hz – 1 kHz</td><td>Max useful signal frequency. Set via DLPF (Digital Low-Pass Filter)</td></tr>
<tr><td><strong>Zero-g Offset</strong></td><td>±50 mg typical</td><td>Output when no acceleration applied. Requires calibration.</td></tr>
</tbody>
</table>

<h4>Reading Tilt/Orientation from Accelerometer</h4>
<div class="formula-block">
<div class="formula-label">Roll and Pitch from Accelerometer</div>
<div class="formula">Roll = atan2(Ay, Az) × (180/π)</div>
<div class="formula">Pitch = atan2(−Ax, √(Ay² + Az²)) × (180/π)</div>
<div class="formula-description">Valid only when the device is stationary or nearly so. Acceleration due to motion contaminates these readings — use sensor fusion (Kalman/Mahony) with a gyroscope for dynamic conditions.</div>
</div>

<h4>Accelerometer Limitations</h4>
<div class="card-grid">
<div class="info-card warning">
<h4>⚠️ Linear Acceleration Contamination</h4>
<p>When the robot accelerates (moves, turns, vibrates), the accelerometer cannot distinguish gravity from linear acceleration. You cannot determine orientation purely from an accelerometer on a moving robot without a gyroscope.</p>
</div>
<div class="info-card warning">
<h4>⚠️ High Frequency Vibration Noise</h4>
<p>Motors, gears, and propellers cause mechanical vibrations that saturate the accelerometer. Use a low-pass filter (hardware or software) to remove vibration noise before processing.</p>
</div>
</div>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — MPU6050 Accelerometer Reading</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;Wire.h&gt;
const int MPU_ADDR = 0x68;

void initMPU6050() {
    Wire.beginTransmission(MPU_ADDR);
    Wire.write(0x6B);  // PWR_MGMT_1 register
    Wire.write(0x00);  // Wake up (clear sleep bit)
    Wire.endTransmission();
    
    Wire.beginTransmission(MPU_ADDR);
    Wire.write(0x1C);  // ACCEL_CONFIG register
    Wire.write(0x00);  // ±2g full scale
    Wire.endTransmission();
}

struct Vec3 { float x, y, z; };

Vec3 readAccel() {
    Wire.beginTransmission(MPU_ADDR);
    Wire.write(0x3B);  // Start of accel registers
    Wire.endTransmission(false);
    Wire.requestFrom(MPU_ADDR, 6, true);
    
    int16_t raw_x = (Wire.read() << 8) | Wire.read();
    int16_t raw_y = (Wire.read() << 8) | Wire.read();
    int16_t raw_z = (Wire.read() << 8) | Wire.read();
    
    // ±2g range: 16384 LSB/g
    return { raw_x / 16384.0f, raw_y / 16384.0f, raw_z / 16384.0f };
}

float getRoll(Vec3 a) {
    return atan2(a.y, a.z) * 180.0 / PI;
}

float getPitch(Vec3 a) {
    return atan2(-a.x, sqrt(a.y*a.y + a.z*a.z)) * 180.0 / PI;
}</code></pre>
</div>
`
                },
                {
                    id: 'gyroscopes',
                    title: 'Gyroscopes',
                    content: `
<h3>Gyroscopes</h3>
<p>A gyroscope measures <strong>angular velocity</strong> — the rate of rotation about each axis, expressed in degrees per second (°/s) or radians per second (rad/s). MEMS gyroscopes use the <strong>Coriolis effect</strong>: a vibrating proof mass experiences a force perpendicular to its vibration direction when rotated, and this force is measured capacitively.</p>

<h4>Gyroscope Integration for Angle</h4>
<div class="formula-block">
<div class="formula-label">Angle from Gyroscope Integration</div>
<div class="formula">θ(t) = θ₀ + ∫ω(t) dt ≈ θ + ω × Δt</div>
<div class="formula-description">Integrate angular velocity over time to get angle. Simple but suffers from <strong>drift</strong> — tiny errors accumulate into large angle errors over time.</div>
</div>

<h4>Gyroscope Drift — The Fundamental Problem</h4>
<p>All MEMS gyroscopes have a constant bias offset — they output a small non-zero value even when perfectly stationary. Integrating this bias produces angle error that grows linearly with time (<strong>gyroscope drift</strong>). A low-quality gyro might drift several degrees per minute; a high-quality MEMS gyro drifts a few degrees per hour.</p>

<div class="info-card highlight">
<h4>🎯 Solving Gyro Drift</h4>
<p><strong>Calibration:</strong> Measure average output when stationary, subtract this bias before integrating.</p>
<p><strong>Complementary filter:</strong> Blend gyro integration (good short-term) with accelerometer angle (good long-term): <code>angle = 0.98 × (angle + gyro × dt) + 0.02 × accel_angle</code></p>
<p><strong>Kalman filter:</strong> Optimal state estimation that fuses gyro and accelerometer with noise models.</p>
</div>

<h4>Gyroscope Full-Scale Range</h4>
<table class="data-table">
<thead><tr><th>Range</th><th>Sensitivity (16-bit)</th><th>Best For</th></tr></thead>
<tbody>
<tr><td>±250 °/s</td><td>131.07 LSB/°/s</td><td>Slow-moving robots, precision orientation</td></tr>
<tr><td>±500 °/s</td><td>65.54 LSB/°/s</td><td>Walking robots, moderate motion</td></tr>
<tr><td>±1000 °/s</td><td>32.77 LSB/°/s</td><td>Fast-turning ground robots</td></tr>
<tr><td>±2000 °/s</td><td>16.38 LSB/°/s</td><td>Drones, fast maneuvering vehicles</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-header"><span class="code-lang">C — Complementary Filter (IMU Fusion)</span><button class="code-copy">Copy</button></div>
<pre><code>float roll = 0.0f, pitch = 0.0f;
float alpha = 0.98f;  // Complementary filter coefficient

void updateAngle(float ax, float ay, float az,
                  float gx, float gy, float dt) {
    // Gyroscope integration
    roll  += gx * dt;
    pitch += gy * dt;
    
    // Accelerometer angles (prone to vibration noise)
    float accel_roll  = atan2(ay, az) * RAD_TO_DEG;
    float accel_pitch = atan2(-ax, sqrt(ay*ay + az*az)) * RAD_TO_DEG;
    
    // Complementary filter: trust gyro short-term, accel long-term
    roll  = alpha * roll  + (1.0f - alpha) * accel_roll;
    pitch = alpha * pitch + (1.0f - alpha) * accel_pitch;
}</code></pre>
</div>
`
                },
                {
                    id: 'magnetometers',
                    title: 'Magnetometers',
                    content: `
<h3>Magnetometers (Digital Compass)</h3>
<p>A magnetometer measures the strength and direction of magnetic fields, typically Earth's magnetic field. Combined with an accelerometer, it provides absolute heading (yaw/azimuth) — the missing axis that an accelerometer+gyroscope system cannot determine without drift.</p>

<h4>Common Magnetometer ICs</h4>
<table class="data-table">
<thead><tr><th>IC</th><th>Interface</th><th>Resolution</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>HMC5883L</strong></td><td>I²C</td><td>12-bit</td><td>Classic 3-axis compass, widely used, discontinued but clones available</td></tr>
<tr><td><strong>QMC5883L</strong></td><td>I²C</td><td>16-bit</td><td>Common HMC5883L clone, same footprint, different register map</td></tr>
<tr><td><strong>AK8963</strong></td><td>I²C</td><td>16-bit</td><td>Built into MPU9250, 0.15 µT resolution</td></tr>
<tr><td><strong>LIS3MDL</strong></td><td>I²C/SPI</td><td>16-bit</td><td>ST Microelectronics, excellent noise performance</td></tr>
</tbody>
</table>

<h4>Hard Iron and Soft Iron Calibration</h4>
<div class="info-card warning">
<h4>⚠️ Calibration is Mandatory</h4>
<p><strong>Hard iron distortion:</strong> Permanent magnets (motors, speakers) on the robot create a constant offset in every reading. Corrected by subtracting the offset (center of the ellipse when sweeping 360°).</p>
<p><strong>Soft iron distortion:</strong> Ferromagnetic materials near the sensor distort the field shape. Corrected by a scaling matrix. Calibration procedure: slowly rotate the robot 360° on a flat surface, record min/max for each axis.</p>
</div>

<div class="formula-block">
<div class="formula-label">Magnetic Heading (Yaw)</div>
<div class="formula">heading = atan2(My_compensated, Mx_compensated) × (180/π)</div>
<div class="formula-description">Tilt compensation required: project magnetic field onto horizontal plane using roll and pitch from accelerometer before computing heading.</div>
</div>
`
                },
                {
                    id: 'imus',
                    title: 'IMUs — MPU6050, MPU9250, ICM20948',
                    content: `
<h3>IMUs (Inertial Measurement Units)</h3>
<p>An IMU combines accelerometer and gyroscope (and sometimes magnetometer) in a single package with a shared I²C/SPI interface. IMUs are the most important sensors in robotics — used for attitude estimation, vibration analysis, step counting, fall detection, and navigation.</p>

<h4>IMU Comparison for Robotics</h4>
<table class="data-table">
<thead><tr><th>IMU</th><th>DOF</th><th>Interface</th><th>DMP</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>MPU6050</strong></td><td>6 (accel+gyro)</td><td>I²C</td><td>Yes</td><td>Most popular hobbyist IMU. Built-in Digital Motion Processor for quaternion output. $1–3.</td></tr>
<tr><td><strong>MPU9250</strong></td><td>9 (+ AK8963 mag)</td><td>I²C/SPI</td><td>Yes</td><td>MPU6050 + magnetometer. Discontinued but widely available.</td></tr>
<tr><td><strong>ICM-20948</strong></td><td>9</td><td>I²C/SPI</td><td>Yes</td><td>Modern successor to MPU9250. Better noise, wider gyro range. Recommended for new designs.</td></tr>
<tr><td><strong>BMI088</strong></td><td>6</td><td>I²C/SPI</td><td>No</td><td>Vibration-robust design, ideal for drones and high-vibration robots. Bosch.</td></tr>
<tr><td><strong>LSM6DSO</strong></td><td>6</td><td>I²C/SPI</td><td>Yes</td><td>ST Micro, machine learning core for gesture recognition on-chip.</td></tr>
<tr><td><strong>BNO055</strong></td><td>9</td><td>I²C/UART</td><td>Yes</td><td>Outputs fused quaternion/Euler directly — no sensor fusion code needed. Bosch.</td></tr>
</tbody>
</table>

<h4>DMP (Digital Motion Processor) — MPU6050</h4>
<p>The MPU6050's onboard DMP runs a 200Hz sensor fusion algorithm entirely in hardware, outputting quaternions directly. This offloads significant computation from the MCU.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — MPU6050 with DMP (Jeff Rowberg library)</span><button class="code-copy">Copy</button></div>
<pre><code>#include "I2Cdev.h"
#include "MPU6050_6Axis_MotionApps20.h"

MPU6050 mpu;
uint8_t fifoBuffer[64];
Quaternion q;
VectorFloat gravity;
float ypr[3];  // yaw, pitch, roll

void setup() {
    Wire.begin();
    Wire.setClock(400000);
    mpu.initialize();
    mpu.dmpInitialize();
    
    // Calibration offsets (measure for your specific chip)
    mpu.setXAccelOffset(-1869);
    mpu.setYAccelOffset(-1600);
    mpu.setZAccelOffset(1392);
    mpu.setXGyroOffset(79);
    mpu.setYGyroOffset(-21);
    mpu.setZGyroOffset(29);
    
    mpu.setDMPEnabled(true);
}

void loop() {
    if (mpu.dmpGetCurrentFIFOPacket(fifoBuffer)) {
        mpu.dmpGetQuaternion(&q, fifoBuffer);
        mpu.dmpGetGravity(&gravity, &q);
        mpu.dmpGetYawPitchRoll(ypr, &q, &gravity);
        
        // ypr in radians → convert to degrees
        Serial.printf("Yaw: %.1f  Pitch: %.1f  Roll: %.1f\n",
                      ypr[0]*RAD_TO_DEG, ypr[1]*RAD_TO_DEG, ypr[2]*RAD_TO_DEG);
    }
}</code></pre>
</div>

<h4>Sensor Fusion — Kalman Filter for IMU</h4>
<p>The Kalman filter is the optimal linear estimator for sensor fusion under Gaussian noise. It maintains a <strong>state estimate</strong> and <strong>error covariance</strong>, predicting forward with the gyroscope and correcting with the accelerometer/magnetometer.</p>
<div class="formula-block">
<div class="formula-label">Kalman Filter (Simplified 1D)</div>
<div class="formula">Predict: x̂ = A·x + B·u &nbsp;&nbsp; P = A·P·Aᵀ + Q</div>
<div class="formula">Update: K = P·Hᵀ·(H·P·Hᵀ + R)⁻¹ &nbsp;&nbsp; x̂ = x̂ + K·(z − H·x̂)</div>
<div class="formula-description">Q = process noise, R = measurement noise, K = Kalman gain, P = error covariance</div>
</div>
`
                }
            ]
        },
        // ========== 5.2 POSITION SENSORS ==========
        {
            id: 'position-sensors',
            title: '5.2 Position Sensors',
            topics: [
                {
                    id: 'encoders',
                    title: 'Encoders',
                    content: `
<h3>Encoders</h3>
<p>Encoders convert mechanical position or velocity into electrical signals. They are the primary feedback sensor for motor control — without encoders, you cannot implement closed-loop position or velocity control. There are two main types: <strong>incremental</strong> and <strong>absolute</strong>.</p>

<h4>Incremental Quadrature Encoders</h4>
<p>Produce two square wave signals (A and B) 90° out of phase. By reading both channels simultaneously:</p>
<ul>
<li><strong>Direction:</strong> If A leads B → forward. If B leads A → reverse.</li>
<li><strong>Position:</strong> Count pulses to track absolute position (relative to start).</li>
<li><strong>Speed:</strong> Measure time between pulses or count pulses per unit time.</li>
<li><strong>Resolution:</strong> 4× PPR using quadrature decoding (count all 4 edges of A and B per cycle).</li>
</ul>

<div class="diagram-container">
<div class="diagram-title">Quadrature Encoder Signals</div>
<svg class="waveform-svg" viewBox="0 0 600 160" width="600" height="160">
    <!-- Channel A -->
    <text x="30" y="35" fill="#34d399" font-size="12" text-anchor="middle">CH A</text>
    <polyline points="50,50 50,20 110,20 110,50 170,50 170,20 230,20 230,50 290,50 290,20 350,20 350,50 410,50 410,20 470,20 470,50" stroke="#10b981" stroke-width="2" fill="none"/>
    <!-- Channel B (90° lagging) -->
    <text x="30" y="105" fill="#60a5fa" font-size="12" text-anchor="middle">CH B</text>
    <polyline points="50,120 80,120 80,90 140,90 140,120 200,120 200,90 260,90 260,120 320,120 320,90 380,90 380,120 440,120 440,90 500,90 500,120" stroke="#3b82f6" stroke-width="2" fill="none"/>
    <!-- Count values -->
    <text x="80" y="150" fill="#9ca3af" font-size="10" text-anchor="middle">0</text>
    <text x="140" y="150" fill="#9ca3af" font-size="10" text-anchor="middle">1</text>
    <text x="200" y="150" fill="#9ca3af" font-size="10" text-anchor="middle">2</text>
    <text x="260" y="150" fill="#9ca3af" font-size="10" text-anchor="middle">3</text>
    <text x="320" y="150" fill="#9ca3af" font-size="10" text-anchor="middle">4</text>
    <!-- Direction label -->
    <text x="280" y="15" fill="#fbbf24" font-size="11" text-anchor="middle">→ Forward direction (A leads B)</text>
</svg>
</div>

<h4>Encoder Types</h4>
<table class="data-table">
<thead><tr><th>Type</th><th>PPR</th><th>Pros</th><th>Cons</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Optical</strong></td><td>16–10000</td><td>High resolution, no friction</td><td>Sensitive to dust/contamination</td><td>Precision servo feedback</td></tr>
<tr><td><strong>Magnetic (Hall)</strong></td><td>6–1024</td><td>Robust to dirt/oil, cheap</td><td>Lower resolution, susceptible to magnets</td><td>Outdoor robots, wheel encoders</td></tr>
<tr><td><strong>Absolute</strong></td><td>12–23 bit</td><td>Position known on power-up</td><td>Expensive, complex interface</td><td>Robotic arm joints</td></tr>
</tbody>
</table>

<h4>Velocity from Encoders</h4>
<div class="two-col">
<div class="formula-block">
<div class="formula-label">Pulse Counting (low speed)</div>
<div class="formula">ω = ΔN / (PPR × Δt) × 2π</div>
<div class="formula-description">Count pulses in fixed time interval. Poor at low speeds.</div>
</div>
<div class="formula-block">
<div class="formula-label">Period Measurement (high speed)</div>
<div class="formula">ω = 2π / (PPR × T_pulse)</div>
<div class="formula-description">Measure time between pulses. Poor at high speeds.</div>
</div>
</div>
`
                },
                {
                    id: 'hall-sensors',
                    title: 'Hall Effect Sensors',
                    content: `
<h3>Hall Effect Sensors</h3>
<p>The Hall effect: when current flows through a conductor in a magnetic field, a transverse voltage (Hall voltage) appears perpendicular to both. Hall effect sensors use this to detect magnetic field presence, direction, or strength.</p>

<h4>Types of Hall Sensors</h4>
<div class="card-grid">
<div class="info-card">
<h4>Digital (Switch) Hall Sensor</h4>
<p>Outputs HIGH or LOW depending on whether a magnet is present. Used to detect motor shaft position (BLDC commutation), count wheel rotations, detect gear teeth. Common: A3144, SS49E, US1881.</p>
</div>
<div class="info-card">
<h4>Analog Hall Sensor</h4>
<p>Outputs voltage proportional to field strength. Used for contactless potentiometers, current sensing (ACS712), and linear position detection. Center voltage = 2.5V (at zero field).</p>
</div>
<div class="info-card">
<h4>Current Sensor (ACS712/ACS723)</h4>
<p>Measures current non-invasively. Current conductor passes through chip; Hall sensor reads field. ACS712-30A: 66mV/A, range ±30A. Useful for motor current feedback and power monitoring.</p>
</div>
</div>

<h4>BLDC Motor Hall Sensors</h4>
<p>BLDC motors typically have 3 Hall sensors placed 120° apart inside the motor. They detect rotor magnet position and provide the commutation signal needed to determine which winding pair to energize. Without Hall sensors, the controller must use back-EMF sensorless detection.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — ACS712 Current Sensor</span><button class="code-copy">Copy</button></div>
<pre><code>// ACS712 30A version: 66mV/A, center = Vcc/2 = 2.5V
const int CURRENT_PIN = A0;
const float SENSITIVITY = 0.066;   // V/A for 30A version
const float VCC = 5.0;
const float ZERO_POINT = VCC / 2;  // 2.5V at 0A

float readCurrentAmps() {
    int raw = analogRead(CURRENT_PIN);
    float voltage = (raw / 1023.0) * VCC;
    float current = (voltage - ZERO_POINT) / SENSITIVITY;
    return current;
}

// Average multiple readings to reduce noise
float readCurrentAvg(int samples = 100) {
    long sum = 0;
    for (int i = 0; i < samples; i++) {
        sum += analogRead(CURRENT_PIN);
        delayMicroseconds(100);
    }
    float voltage = (sum / (float)samples / 1023.0) * VCC;
    return (voltage - ZERO_POINT) / SENSITIVITY;
}</code></pre>
</div>
`
                },
                {
                    id: 'potentiometers',
                    title: 'Potentiometers & Resolvers',
                    content: `
<h3>Potentiometers as Position Sensors</h3>
<p>A rotary potentiometer is a variable resistor that outputs a voltage proportional to angular position. Simple, cheap, and reliable for measuring joint angles in robotic arms — as long as the rotation is less than 360°. Multi-turn potentiometers (e.g., 10-turn Bourns 3590) provide excellent resolution over multiple rotations.</p>

<div class="formula-block">
<div class="formula-label">Potentiometer Position Reading</div>
<div class="formula">θ = (V_out / V_ref) × θ_max</div>
<div class="formula-description">For a 270° pot: if V_out = 2.5V with V_ref = 5V → θ = 135°</div>
</div>

<h4>Resolvers</h4>
<p>Resolvers are rotary transformers that provide absolute angular position with high accuracy and extreme robustness. Used in industrial robot joints, servo drives, and aerospace where environment is too harsh for optical encoders. They output sine and cosine signals that require a Resolver-to-Digital Converter (RDC) chip to decode. Resolution: 12–16 bits. Operating range: -55°C to +150°C, immune to shock and vibration.</p>
`
                }
            ]
        },
        // ========== 5.3 DISTANCE SENSORS ==========
        {
            id: 'distance-sensors',
            title: '5.3 Distance Sensors',
            topics: [
                {
                    id: 'ultrasonic',
                    title: 'Ultrasonic Sensors',
                    content: `
<h3>Ultrasonic Sensors (HC-SR04)</h3>
<p>Ultrasonic sensors measure distance by emitting a 40kHz sound pulse and measuring the time for the echo to return. The HC-SR04 is the most commonly used distance sensor in hobbyist robotics due to its low cost (~$1) and reasonable performance.</p>

<h4>HC-SR04 Specifications</h4>
<table class="data-table">
<thead><tr><th>Parameter</th><th>Value</th></tr></thead>
<tbody>
<tr><td>Operating voltage</td><td>5V DC</td></tr>
<tr><td>Range</td><td>2cm – 400cm</td></tr>
<tr><td>Accuracy</td><td>±3mm</td></tr>
<tr><td>Beam angle</td><td>~15° cone</td></tr>
<tr><td>Update rate</td><td>Max ~40Hz (allow 25ms between measurements)</td></tr>
<tr><td>Interface</td><td>Trigger pin (10µs pulse in), Echo pin (pulse width out)</td></tr>
</tbody>
</table>

<div class="formula-block">
<div class="formula-label">Distance from Echo Time</div>
<div class="formula">d = (t_echo × v_sound) / 2</div>
<div class="formula-description">v_sound = 343 m/s at 20°C = 0.0343 cm/µs. Divide by 2 because sound travels to target AND back. At 20°C: d(cm) = t(µs) / 58.2</div>
</div>

<h4>Temperature Compensation</h4>
<div class="formula-block">
<div class="formula-label">Speed of Sound vs Temperature</div>
<div class="formula">v = 331.3 + 0.606 × T (m/s)</div>
<div class="formula-description">T = temperature in °C. At 0°C: 331.3 m/s. At 25°C: 346.5 m/s. For precision applications, use a temperature sensor to compensate.</div>
</div>

<h4>Limitations and Workarounds</h4>
<div class="card-grid">
<div class="info-card warning">
<h4>⚠️ Blind spot (< 2cm)</h4>
<p>The sensor cannot detect objects closer than 2cm. Use ToF sensors (VL53L0X) for close-range detection.</p>
</div>
<div class="info-card warning">
<h4>⚠️ Wide beam angle</h4>
<p>15° cone means you cannot determine exact direction of obstacle. For narrow beams, use LiDAR or IR sensors.</p>
</div>
<div class="info-card warning">
<h4>⚠️ Soft/angled surfaces</h4>
<p>Foam, fabric, or angled surfaces absorb or scatter ultrasonic waves, causing missed or erratic readings.</p>
</div>
<div class="info-card warning">
<h4>⚠️ Multiple sensors crosstalk</h4>
<p>Multiple HC-SR04s on the same robot can receive each other's echoes. Fire them sequentially, not simultaneously.</p>
</div>
</div>
`
                },
                {
                    id: 'tof-sensors',
                    title: 'ToF Sensors (VL53L0X/VL53L1X)',
                    content: `
<h3>Time-of-Flight (ToF) Sensors</h3>
<p>ToF sensors measure distance by measuring the time it takes for a <strong>laser pulse</strong> (typically 940nm infrared) to travel to a target and back. Unlike ultrasonic, they have a very narrow beam (~25°), no minimum range, and are unaffected by target softness. The <strong>VL53L0X</strong> and <strong>VL53L1X</strong> (STMicroelectronics) are the go-to sensors for robot proximity detection.</p>

<h4>VL53L1X vs VL53L0X</h4>
<table class="data-table">
<thead><tr><th>Parameter</th><th>VL53L0X</th><th>VL53L1X</th></tr></thead>
<tbody>
<tr><td>Max range</td><td>~1.2m (low ambient)</td><td>~4m (low ambient)</td></tr>
<tr><td>Min range</td><td>~3cm</td><td>~4cm</td></tr>
<tr><td>FOV</td><td>25°</td><td>27° (programmable ROI)</td></tr>
<tr><td>Update rate</td><td>Up to 50 Hz</td><td>Up to 50 Hz</td></tr>
<tr><td>Interface</td><td>I²C (0x29)</td><td>I²C (0x29)</td></tr>
<tr><td>XSHUT pin</td><td>Yes — for address remapping</td><td>Yes</td></tr>
</tbody>
</table>

<div class="info-card highlight">
<h4>💡 Multiple VL53L1X on Same I²C Bus</h4>
<p>All VL53L1X start with the same I²C address (0x29). To use multiple sensors: connect each XSHUT pin to a separate GPIO. Pull all XSHUT low at startup (all sensors disabled). Enable them one at a time and reassign each a unique I²C address via software before enabling the next.</p>
</div>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — VL53L1X Basic Usage</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;Wire.h&gt;
#include &lt;VL53L1X.h&gt;

VL53L1X sensor;

void setup() {
    Wire.begin();
    Wire.setClock(400000);
    sensor.setTimeout(500);
    
    if (!sensor.init()) {
        Serial.println("Sensor init failed!");
        while (1);
    }
    
    // Long range mode: up to 4m but slower (33ms per reading)
    sensor.setDistanceMode(VL53L1X::Long);
    sensor.setMeasurementTimingBudget(50000);  // 50ms timing budget
    sensor.startContinuous(50);  // Take reading every 50ms
}

void loop() {
    uint16_t distance = sensor.read();
    
    if (sensor.timeoutOccurred()) {
        Serial.println("TIMEOUT!");
    } else {
        Serial.print("Distance: ");
        Serial.print(distance);
        Serial.println(" mm");
    }
}</code></pre>
</div>
`
                },
                {
                    id: 'lidar',
                    title: 'LiDAR',
                    content: `
<h3>LiDAR (Light Detection and Ranging)</h3>
<p>LiDAR creates a 2D or 3D map of the environment by rapidly scanning a laser across a wide angle and measuring return times. It is the <strong>primary sensing modality for autonomous navigation</strong> — used in self-driving cars, delivery robots, warehouse AMRs, and research platforms.</p>

<h4>2D LiDAR for Robotics</h4>
<table class="data-table">
<thead><tr><th>Sensor</th><th>Range</th><th>FOV</th><th>Hz</th><th>Cost</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>RPLIDAR A1</strong></td><td>12m</td><td>360°</td><td>5.5Hz</td><td>~$99</td><td>Best entry-level 2D LiDAR. USB. ROS-ready.</td></tr>
<tr><td><strong>RPLIDAR A3</strong></td><td>25m</td><td>360°</td><td>15Hz</td><td>~$299</td><td>Better range, faster scan rate</td></tr>
<tr><td><strong>YDLIDAR X4</strong></td><td>10m</td><td>360°</td><td>6-12Hz</td><td>~$99</td><td>Alternative to RPLIDAR</td></tr>
<tr><td><strong>Hokuyo URG-04LX</strong></td><td>4m</td><td>240°</td><td>10Hz</td><td>~$1500</td><td>Industrial-grade accuracy</td></tr>
<tr><td><strong>SICK TiM571</strong></td><td>25m</td><td>270°</td><td>15Hz</td><td>~$800</td><td>Professional AMR sensor</td></tr>
</tbody>
</table>

<h4>3D LiDAR</h4>
<ul>
<li><strong>Velodyne VLP-16 (Puck)</strong> — 16 layers, 360°×30°, 100m range, 300k points/sec. ~$4000. Industry standard for autonomous vehicles and outdoor robots.</li>
<li><strong>Ouster OS1</strong> — 16/32/64/128 channels, modular, excellent for robotics. ROS-native.</li>
<li><strong>Livox Mid-360</strong> — Non-repetitive scanning, better coverage, ~$700. Used in legged robots.</li>
</ul>

<h4>SLAM with 2D LiDAR</h4>
<p>Simultaneous Localization and Mapping (SLAM) algorithms process LiDAR scans to build a map while tracking robot position within it. Key algorithms:</p>
<ul>
<li><strong>GMapping (particle filter)</strong> — Classic 2D SLAM, very reliable</li>
<li><strong>Cartographer (Google)</strong> — Real-time 2D and 3D SLAM, handles loop closure well</li>
<li><strong>Hector SLAM</strong> — No odometry required, scan-matching only</li>
</ul>
`
                }
            ]
        },
        // ========== 5.4 NAVIGATION SENSORS ==========
        {
            id: 'navigation-sensors',
            title: '5.4 Navigation Sensors',
            topics: [
                {
                    id: 'gps',
                    title: 'GPS & RTK-GPS',
                    content: `
<h3>GPS and RTK-GPS</h3>
<p>GPS (Global Positioning System) provides absolute geographic position by triangulating signals from at least 4 satellites. Standard GPS gives 3–5m accuracy — sufficient for large-scale navigation but insufficient for precision agricultural robots or survey drones. <strong>RTK-GPS</strong> (Real-Time Kinematic) achieves 1–2cm accuracy by comparing signals to a fixed base station.</p>

<h4>GPS for Robotics</h4>
<table class="data-table">
<thead><tr><th>Module</th><th>Accuracy</th><th>Update Rate</th><th>Interface</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>u-blox NEO-M8N</strong></td><td>2.5m CEP</td><td>Up to 10Hz</td><td>UART, I²C</td><td>Drone GPS, outdoor navigation</td></tr>
<tr><td><strong>u-blox ZED-F9P</strong></td><td>1.5cm (RTK)</td><td>Up to 25Hz</td><td>UART, USB, I²C</td><td>Precision agriculture, survey robots</td></tr>
<tr><td><strong>SparkFun RTK Facet</strong></td><td>1cm (RTK)</td><td>20Hz</td><td>UART</td><td>Complete RTK solution with display</td></tr>
</tbody>
</table>

<h4>NMEA Sentences</h4>
<p>GPS modules output NMEA 0183 sentences over UART at 9600 baud by default:</p>
<div class="code-block">
<div class="code-header"><span class="code-lang">NMEA Output Examples</span><button class="code-copy">Copy</button></div>
<pre><code>// GPGGA — Position fix
$GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47

// Fields: time, lat, N/S, lon, E/W, fix quality, num satellites,
//         HDOP, altitude, M, geoid height, M, DGPS age, checksum

// GPRMC — Recommended minimum (position + velocity)
$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A

// Parse latitude: 4807.038N → 48° 07.038' = 48 + 7.038/60 = 48.1173°</code></pre>
</div>

<h4>RTK GPS Operation</h4>
<p>RTK requires two receivers: a <strong>Base Station</strong> (fixed, known position) and a <strong>Rover</strong> (on the robot). The base station transmits correction data (RTCM format) to the rover via radio link (915MHz SiK radio, LoRa, or internet NTRIP). The rover uses these corrections to resolve carrier phase ambiguity, achieving centimeter-level accuracy.</p>
`
                },
                {
                    id: 'uwb',
                    title: 'UWB Positioning',
                    content: `
<h3>UWB (Ultra-Wideband) Indoor Positioning</h3>
<p>UWB is a short-range radio technology operating across a very wide frequency band (3.1–10.6 GHz). It measures Time-of-Flight with nanosecond precision, achieving <strong>10–30cm indoor positioning accuracy</strong> — far better than WiFi or Bluetooth. UWB is increasingly used for indoor robot localization.</p>

<h4>UWB vs Other Indoor Positioning</h4>
<table class="data-table">
<thead><tr><th>Technology</th><th>Accuracy</th><th>Range</th><th>Update Rate</th><th>Cost</th></tr></thead>
<tbody>
<tr><td><strong>UWB (DW1000)</strong></td><td>10–30cm</td><td>~100m</td><td>Up to 100Hz</td><td>Medium</td></tr>
<tr><td><strong>WiFi RTT</strong></td><td>1–3m</td><td>50m+</td><td>~10Hz</td><td>Low</td></tr>
<tr><td><strong>BLE RSSI</strong></td><td>1–5m</td><td>10–50m</td><td>1–10Hz</td><td>Very Low</td></tr>
<tr><td><strong>Optical (cameras)</strong></td><td>1–5mm</td><td>~10m</td><td>100Hz+</td><td>High</td></tr>
</tbody>
</table>

<p>Popular UWB module: <strong>Decawave DWM1001</strong> (Qorvo). Requires ≥3 anchors for 2D positioning, ≥4 for 3D. Uses TWR (Two-Way Ranging) or TDOA algorithms. Used in warehouse robots, drone swarms, and indoor delivery robots.</p>
`
                }
            ]
        },
        // ========== 5.5 VISION SENSORS ==========
        {
            id: 'vision-sensors',
            title: '5.5 Vision Sensors',
            topics: [
                {
                    id: 'cameras',
                    title: 'RGB, Stereo & Depth Cameras',
                    content: `
<h3>Camera Types for Robotics</h3>

<h4>RGB (Monocular) Cameras</h4>
<p>Standard cameras capture 2D images. Used for object detection, color tracking, lane following, QR code reading, and visual servoing. Cannot measure depth directly — require algorithms (monocular depth estimation, SfM) or known object size for distance estimation.</p>

<table class="data-table">
<thead><tr><th>Camera</th><th>Resolution</th><th>FPS</th><th>Interface</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Raspberry Pi Cam v3</strong></td><td>12MP</td><td>30–120</td><td>MIPI CSI-2</td><td>RPi robots, general vision</td></tr>
<tr><td><strong>OpenMV Cam H7</strong></td><td>2MP</td><td>25–120</td><td>USB/UART/SPI</td><td>Edge ML, standalone vision MCU</td></tr>
<tr><td><strong>OV2640</strong></td><td>2MP</td><td>30</td><td>DVP/I²C</td><td>ESP32-CAM, cheap embedded vision</td></tr>
<tr><td><strong>USB Webcam (UVC)</strong></td><td>1–8MP</td><td>30–60</td><td>USB 3.0</td><td>RPi/Jetson-based robots</td></tr>
</tbody>
</table>

<h4>Stereo Cameras</h4>
<p>Two cameras separated by a known baseline. The disparity (horizontal pixel offset) between corresponding points in the two images encodes depth: <strong>d = f×B/Z</strong> where f=focal length, B=baseline, Z=depth. Provides dense depth maps. No external light source needed.</p>

<ul>
<li><strong>Intel RealSense D435/D455</strong> — Active infrared stereo + RGB. 30Hz at 720p depth. USB 3. ROS-ready. ~$200–300.</li>
<li><strong>ZED 2i (Stereolabs)</strong> — Passive stereo, 20m range, AI object detection onboard, IMU. ~$450.</li>
</ul>

<h4>Structured Light Depth Cameras</h4>
<p>Project a known infrared pattern onto the scene and observe its distortion with an IR camera to compute depth. Works excellently indoors; fails in direct sunlight (IR noise). <strong>Microsoft Azure Kinect DK</strong>: ToF + RGB + IMU + 7-mic array. Used in manipulation and human-robot interaction.</p>

<h4>Depth Camera Comparison</h4>
<table class="data-table">
<thead><tr><th>Technology</th><th>Indoor</th><th>Outdoor</th><th>Range</th><th>Accuracy</th></tr></thead>
<tbody>
<tr><td>Stereo (passive)</td><td>✅ Excellent</td><td>✅ Excellent</td><td>0.3m–20m</td><td>1–5mm at 1m</td></tr>
<tr><td>Stereo (active IR)</td><td>✅ Excellent</td><td>⚠️ Limited</td><td>0.1m–10m</td><td>1–2mm at 1m</td></tr>
<tr><td>Structured Light</td><td>✅ Excellent</td><td>❌ Fails</td><td>0.2m–5m</td><td>&lt;1mm at 1m</td></tr>
<tr><td>ToF (dToF)</td><td>✅ Good</td><td>✅ Good</td><td>0.1m–5m</td><td>5–20mm</td></tr>
</tbody>
</table>
`
                }
            ]
        },
        // ========== 5.6 FORCE SENSORS ==========
        {
            id: 'force-sensors',
            title: '5.6 Force Sensors',
            topics: [
                {
                    id: 'load-cells',
                    title: 'Load Cells & Strain Gauges',
                    content: `
<h3>Load Cells and Strain Gauges</h3>
<p>Load cells measure force or weight using <strong>strain gauges</strong> — resistors that change resistance when mechanically deformed. When force is applied to the load cell's elastic element (usually aluminum or steel), strain gauges bonded to it sense the deformation and output a differential voltage proportional to force.</p>

<h4>Wheatstone Bridge</h4>
<p>Strain gauges are always arranged in a Wheatstone bridge for temperature compensation and to double (half-bridge) or quadruple (full-bridge) the sensitivity. A full-bridge has 4 strain gauges — 2 in tension, 2 in compression.</p>

<div class="formula-block">
<div class="formula-label">Wheatstone Bridge Output</div>
<div class="formula">V_out = V_ex × (ΔR / 4R)</div>
<div class="formula-description">V_ex = excitation voltage (5V typical). ΔR = resistance change due to strain. Output is typically 1–5mV/V — needs amplification!</div>
</div>

<h4>HX711 — Load Cell ADC</h4>
<p>The HX711 is a dedicated 24-bit ADC with built-in programmable amplifier (gain 32/64/128) specifically for Wheatstone bridge load cells. At gain 128, it can resolve signals down to ~30nV.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — HX711 Load Cell</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;HX711.h&gt;
HX711 scale;

const int DOUT_PIN = 3;
const int CLK_PIN  = 2;

void setup() {
    Serial.begin(115200);
    scale.begin(DOUT_PIN, CLK_PIN);
    
    Serial.println("Tare (remove all weight)...");
    delay(2000);
    scale.tare();  // Reset to zero with current weight
    
    Serial.println("Place known weight for calibration...");
    delay(5000);
    
    // With 100g calibration weight:
    float reading = scale.get_units(10);  // Average 10 readings
    float calibration_factor = reading / 100.0;  // g per unit
    scale.set_scale(calibration_factor);
}

void loop() {
    float weight = scale.get_units(5);  // Average 5 readings (grams)
    Serial.printf("Weight: %.1f g\n", weight);
    delay(200);
}</code></pre>
</div>

<h4>Force/Torque Sensors (6-DOF)</h4>
<p>For robotic manipulation and assembly, a 6-DOF force/torque sensor at the wrist measures forces and torques along all 3 axes simultaneously. Used for:</p>
<ul>
<li><strong>Compliant control</strong> — Detect contact and respond without breaking parts</li>
<li><strong>Assembly verification</strong> — Confirm correct insertion, detect errors</li>
<li><strong>Teleoperation force feedback</strong> — Feel what the robot feels</li>
<li><strong>Payload estimation</strong> — Know the weight and position of grasped objects</li>
</ul>
<p>Popular options: ATI Mini45, Rokubi (Bota Systems, ROS-native), OnRobot HEX-E. These are precision instruments ($1,000–$10,000+) requiring careful installation and calibration.</p>
`
                },
                {
                    id: 'fsr',
                    title: 'Force Sensitive Resistors',
                    content: `
<h3>Force Sensitive Resistors (FSRs)</h3>
<p>An FSR is a thin, flexible sensor that decreases in resistance as force is applied to its surface. They are cheap, thin, and flexible — ideal for gripper finger tactile sensing, foot contact detection, and keyboard-style pressure measurement. However, they are <strong>not precise</strong> — expect ±10–25% accuracy.</p>

<h4>FSR Characteristics</h4>
<ul>
<li><strong>No force:</strong> Resistance > 1MΩ (essentially open circuit)</li>
<li><strong>Light touch:</strong> ~30kΩ</li>
<li><strong>Medium press:</strong> ~6kΩ</li>
<li><strong>Hard press:</strong> ~1kΩ</li>
</ul>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — FSR with Voltage Divider</span><button class="code-copy">Copy</button></div>
<pre><code>// FSR in voltage divider with 10kΩ pull-down resistor
// V_out = 5V × 10k / (FSR + 10k)
// When FSR = ∞ (no press): V_out = 0V
// When FSR = 10k (medium): V_out = 2.5V
// When FSR = 1k (hard):    V_out = 4.55V

const int FSR_PIN = A0;
const int R_PULLDOWN = 10000;  // 10kΩ

void loop() {
    int raw = analogRead(FSR_PIN);
    float voltage = raw * 5.0 / 1023.0;
    
    if (voltage < 0.1) {
        Serial.println("No force detected");
    } else {
        float fsr_resistance = (5.0 - voltage) / voltage * R_PULLDOWN;
        // Rough force estimate (highly nonlinear!)
        float conductance = 1.0 / fsr_resistance;
        float force_N = conductance * 1000.0;  // Approximate
        Serial.printf("Force: ~%.1f N (V=%.2f)\n", force_N, voltage);
    }
    delay(100);
}</code></pre>
</div>
`
                }
            ]
        }
    ]
};
