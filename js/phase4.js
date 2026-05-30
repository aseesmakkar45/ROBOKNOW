// ============================================================
// PHASE 4 — EMBEDDED SYSTEMS (Complete Content)
// ============================================================
const phase4Content = {
    id: 'phase4',
    title: 'Embedded Systems',
    icon: '🔧',
    phaseNumber: 4,
    description: 'Go deep into microcontrollers, real-time operating systems, communication protocols, and the full software/hardware stack that brings robots to life.',
    sections: [
        // ========== 4.0 PCM TO EMBEDDED BRIDGE (BEGINNER-FRIENDLY) ==========
        {
            id: 'pcm-bridge-4',
            title: '4.0 PCM to Embedded Bridge',
            topics: [
                {
                    id: 'pcm-embedded-concepts',
                    title: 'How a Computer Thinks (Logic & Math)',
                    content: `
<h3>How a Microcontroller Thinks</h3>
<p>If you've studied **Logic Gates (AND, OR, NOT, NAND)** in CBSE Class 12 Physics (Semiconductors chapter), you already understand the absolute core of computer architecture. Let's trace how we go from school-level physics to programming microcontrollers.</p>

<div class="info-card success">
<h4>🧠 Relately School Logic to Microcontrollers</h4>
<ul>
    <li><strong>Silicon & Doping (Class 12 Semiconductors)</strong>: You learned how adding impurities to silicon creates P-type and N-type materials, which form P-N junctions and transistors. A microcontroller is simply **millions of microscopic silicon transistors** acting as high-speed switches!</li>
    <li><strong>Boolean Algebra & Logic Gates</strong>: Every decision your robot makes inside the code is physically computed using logic gate circuits. For example, if your code says:
        <br><code>if (sensorBlocked && batteryHealthy) { driveForward(); }</code>
        <br>It is passing two voltages (representing 1s and 0s) through an actual **AND Gate** inside the CPU!</li>
    <li><strong>Registers are just memory slots</strong>: In school, you studied D-flip-flops or basic latch circuits that can store a 1 or a 0. In an embedded chip, we group 8, 16, or 32 of these storage slots together and call it a **Register**. Writing to a register is just using electronic switches to set configuration!</li>
</ul>
</div>
`
                },
                {
                    id: 'pcm-embedded-jargon',
                    title: 'Embedded Jargon Buster',
                    content: `
<h3>Embedded Jargon Buster</h3>
<p>Firmware programming has its own vocabulary. Here are easy-to-understand explanations and analogies:</p>

<table class="data-table">
<thead><tr><th>Embedded Term</th><th>What it Sounds Like</th><th>High School / Real Life Analogy</th></tr></thead>
<tbody>
<tr><td><strong>Bare-Metal</strong></td><td>Metal chassis</td><td>Programming a microcontroller directly in C/C++ without any operating system (like Windows or Linux) running underneath. You are talking directly to the raw silicon.</td></tr>
<tr><td><strong>Register</strong></td><td>Cash register</td><td>A tiny, ultra-fast 8-bit or 32-bit "mailbox" inside the CPU hardware. Writing a number (like <code>0x01</code>) to a specific register address physically flips electronic switches that activate timers, pins, or communication channels.</td></tr>
<tr><td><strong>Polling</strong></td><td>Voting</td><td>Constantly checking the status of a pin in a tight loop: <em>"Is the button pressed? Is it pressed? How about now?"</em> This wastes 100% of your CPU's processing power.</td></tr>
<tr><td><strong>Interrupt (ISR)</strong></td><td>Rudely interrupting</td><td><strong>The Doorbell Analogy</strong>: Instead of polling (sitting by the door and asking if someone is there), you study peacefully (main loop). When a visitor arrives, the doorbell rings (interrupt). You pause your work, open the door (Interrupt Service Routine), and then return to exactly where you left off.</td></tr>
<tr><td><strong>DMA (Direct Memory Access)</strong></td><td>Admin permissions</td><td><strong>The Delivery Agent Analogy</strong>: If a massive shipment of boxes (sensor data) arrives, the CPU doesn't carry them one by one. The CPU tells the DMA controller: <em>"Move these 1000 boxes directly from the UART port to the RAM buffer."</em> The CPU goes to sleep or does math, and the DMA handles the heavy lifting in hardware.</td></tr>
<tr><td><strong>Baud Rate</strong></td><td>Speed of sounds</td><td>The speed at which data is transmitted over serial lines, measured in bits per second (bps). E.g., <code>9600 baud</code> means 9,600 electrical pulses (bits) are sent per second. Both sender and receiver must agree on this speed to decode the pulses.</td></tr>
<tr><td><strong>Watchdog Timer (WDT)</strong></td><td>Guard dog</td><td><strong>The Dead Man's Switch Analogy</strong>: A hardware safety timer. If the main loop hangs or enters an infinite loop, it fails to reset (or "kick") the watchdog. The watchdog timer runs out and physically cuts the power line for a microsecond to hard-reset the microcontroller.</td></tr>
<tr><td><strong>RTOS (Real-Time OS)</strong></td><td>Fast operating system</td><td>A lightweight operating system for microcontrollers that slices CPU time into precise slices. Unlike Windows (where a mouse lag is fine), an RTOS guarantees that time-critical tasks (like balancing a drone) are executed within exact microsecond deadlines.</td></tr>
</tbody>
</table>
`
                }
            ]
        },
        // ========== 4.1 EMBEDDED FUNDAMENTALS ==========
        {
            id: 'embedded-fundamentals',
            title: '4.1 Embedded Systems Fundamentals',
            topics: [
                {
                    id: 'embedded-design',
                    title: 'Embedded System Design',
                    content: `
<h3>What is an Embedded System?</h3>
<p>An embedded system is a dedicated computer system designed to perform a specific function (or a small set of functions) within a larger mechanical or electrical system. Unlike a general-purpose PC, it runs fixed software, has limited resources, and often operates in real-time. <strong>Every robot is built on embedded systems</strong> — from the motor controller to the IMU fusion algorithm to the high-level planner.</p>

<h4>Characteristics of Embedded Systems</h4>
<div class="card-grid">
<div class="info-card">
<h4>Real-Time Constraints</h4>
<p>Must respond to events within a guaranteed time window. Hard real-time: missing a deadline = system failure (e.g., motor commutation). Soft real-time: occasional deadline misses are tolerable (e.g., display update).</p>
</div>
<div class="info-card">
<h4>Resource Constrained</h4>
<p>Limited RAM (kilobytes to megabytes), ROM/Flash (kilobytes to megabytes), CPU speed (MHz not GHz), no virtual memory, no OS swap space.</p>
</div>
<div class="info-card">
<h4>Power Constrained</h4>
<p>Often battery-powered; sleep modes, peripheral clock gating, and voltage scaling are essential. A robot sensor node may need to run for months on two AA batteries.</p>
</div>
<div class="info-card">
<h4>Hardware-Software Co-design</h4>
<p>The software must directly control hardware peripherals — GPIO, timers, ADC, SPI, I²C. There's often no abstraction layer between your code and the silicon.</p>
</div>
</div>

<h4>Embedded System Design Flow</h4>
<div class="flowchart">
<div class="flow-node start">Define Requirements</div>
<div class="flow-arrow"></div>
<div class="flow-node process">Choose Hardware Platform</div>
<div class="flow-arrow"></div>
<div class="flow-node process">Design Schematic & PCB</div>
<div class="flow-arrow"></div>
<div class="flow-node process">Write Firmware</div>
<div class="flow-arrow"></div>
<div class="flow-node process">Hardware Bring-Up & Debug</div>
<div class="flow-arrow"></div>
<div class="flow-node decision">All Tests Pass?</div>
<div class="flow-arrow"></div>
<div class="flow-node end">Deploy & Maintain</div>
</div>

<h4>Memory Map Overview</h4>
<p>An embedded MCU's address space is divided into distinct regions. Understanding this is fundamental for writing efficient firmware:</p>
<table class="data-table">
<thead><tr><th>Region</th><th>Contents</th><th>Characteristics</th></tr></thead>
<tbody>
<tr><td><strong>Flash (ROM)</strong></td><td>Program code (.text), constants, interrupt vectors</td><td>Non-volatile, slow to erase, fast to read. Code executes here.</td></tr>
<tr><td><strong>SRAM</strong></td><td>Stack, heap, global variables (.data, .bss)</td><td>Volatile, fast read/write. Precious resource in MCUs.</td></tr>
<tr><td><strong>Peripheral Registers</strong></td><td>GPIO registers, UART/SPI/I²C config, Timer values</td><td>Memory-mapped I/O. Writing to addresses controls hardware.</td></tr>
<tr><td><strong>Boot ROM</strong></td><td>Bootloader (often read-only)</td><td>Executes on reset; loads your firmware</td></tr>
</tbody>
</table>
`
                },
                {
                    id: 'memory-organization',
                    title: 'Memory Organization',
                    content: `
<h3>Memory Organization in Embedded Systems</h3>
<p>Memory is the most constrained resource in most embedded systems. Unlike desktop software where you rarely think about memory layout, embedded firmware engineers must precisely understand and control every byte.</p>

<h4>Firmware Memory Sections</h4>
<table class="data-table">
<thead><tr><th>Section</th><th>Storage</th><th>At Startup</th><th>Contents</th></tr></thead>
<tbody>
<tr><td><code>.text</code></td><td>Flash</td><td>Stays in Flash</td><td>Compiled machine code instructions</td></tr>
<tr><td><code>.rodata</code></td><td>Flash</td><td>Stays in Flash</td><td>Read-only constants (const char strings, lookup tables)</td></tr>
<tr><td><code>.data</code></td><td>Flash (copy) + RAM</td><td>Copied to RAM by startup code</td><td>Initialized global/static variables</td></tr>
<tr><td><code>.bss</code></td><td>RAM only</td><td>Zero-filled by startup code</td><td>Uninitialized global/static variables</td></tr>
<tr><td>Stack</td><td>RAM</td><td>Empty (grows downward)</td><td>Local variables, function call return addresses</td></tr>
<tr><td>Heap</td><td>RAM</td><td>Empty</td><td>Dynamic allocations (malloc/free — use sparingly in MCUs)</td></tr>
</tbody>
</table>

<h4>Stack vs Heap in Embedded Systems</h4>
<div class="two-col">
<div class="info-card highlight">
<h4>Stack</h4>
<p>LIFO (Last In First Out). Automatically managed by CPU. Each function call pushes a "stack frame" (return address + local variables). Stack overflow = hard fault (no OS protection!). Fixed size, allocated at link time. Rule: <strong>prefer stack allocation over heap in MCUs.</strong></p>
</div>
<div class="info-card warning">
<h4>Heap</h4>
<p>Dynamic allocation via <code>malloc()</code>/<code>new</code>. Dangerous in embedded: fragmentation over time, non-deterministic allocation time (breaks real-time guarantees), risk of running out silently. Use static allocation wherever possible.</p>
</div>
</div>

<div class="info-card danger">
<h4>🔴 Stack Overflow — Silent Killer</h4>
<p>If your program uses more stack than allocated, it silently overwrites adjacent memory (heap, .bss variables). This causes random crashes, corrupted variables, and extremely hard-to-debug behavior. Enable stack overflow detection in your RTOS or add a canary pattern. On ARM Cortex-M, enable MPU stack protection.</p>
</div>

<h4>Optimizing Memory Usage</h4>
<ul>
<li><strong>Use <code>const</code> for all read-only data</strong> — keeps it in Flash, not RAM</li>
<li><strong><code>PROGMEM</code> (Arduino AVR)</strong> — Explicitly store large arrays/strings in Flash</li>
<li><strong>Pack structs</strong> — Use <code>__attribute__((packed))</code> or carefully order members to avoid padding</li>
<li><strong>Use appropriate integer sizes</strong> — <code>uint8_t</code> instead of <code>int</code> where possible</li>
<li><strong>Pool allocators</strong> — Pre-allocate a fixed block pool instead of using malloc</li>
</ul>
`
                },
                {
                    id: 'interrupts',
                    title: 'Interrupts',
                    content: `
<h3>Interrupts</h3>
<p>An interrupt is a hardware mechanism that temporarily suspends the normal program flow to execute a special function called an <strong>Interrupt Service Routine (ISR)</strong>, then resumes execution. Interrupts are the heartbeat of real-time embedded systems — they allow the MCU to respond immediately to hardware events without continuously polling.</p>

<h4>Interrupt Sources in Robotics</h4>
<ul>
<li><strong>GPIO (External Interrupt)</strong> — Rising/falling edge on a pin: encoder pulses, button presses, limit switch triggers</li>
<li><strong>Timer</strong> — Periodic interrupt at precise intervals: PID control loop, PWM update, RTOS tick</li>
<li><strong>UART/SPI/I²C</strong> — Data received, transmission complete</li>
<li><strong>ADC</strong> — Conversion complete (avoids polling the ADC)</li>
<li><strong>DMA</strong> — Transfer complete (data moved without CPU)</li>
</ul>

<h4>Interrupt Priority (ARM Cortex-M)</h4>
<p>ARM Cortex-M has a Nested Vectored Interrupt Controller (NVIC) with configurable priority levels. Higher priority interrupts can preempt lower priority ones. In robotics:</p>
<ul>
<li><strong>Highest priority:</strong> Hard fault, motor commutation, emergency stop</li>
<li><strong>High priority:</strong> Encoder counting, PID timer</li>
<li><strong>Medium priority:</strong> UART/SPI communication</li>
<li><strong>Low priority:</strong> User interface, non-critical sensors</li>
</ul>

<h4>Writing Safe ISRs</h4>
<div class="info-card warning">
<h4>⚠️ ISR Golden Rules</h4>
<p>1. <strong>Keep ISRs as short as possible</strong> — do the minimum work, set a flag, return. Long ISRs block other interrupts.</p>
<p>2. <strong>No blocking calls in ISRs</strong> — Never call <code>delay()</code>, <code>Serial.println()</code>, or <code>HAL_Delay()</code>.</p>
<p>3. <strong>Use <code>volatile</code> for shared variables</strong> — Variables modified in ISRs must be declared <code>volatile</code> to prevent compiler optimization errors.</p>
<p>4. <strong>Protect shared data with critical sections</strong> — Disable interrupts when reading multi-byte variables shared with ISRs.</p>
</div>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino / AVR</span><button class="code-copy">Copy</button></div>
<pre><code>// Encoder ISR example — counts pulses from quadrature encoder
volatile long encoderCount = 0;  // volatile: shared with ISR
volatile int lastB = 0;

void setup() {
    pinMode(2, INPUT_PULLUP);  // Encoder A — interrupt pin
    pinMode(3, INPUT_PULLUP);  // Encoder B
    attachInterrupt(digitalPinToInterrupt(2), encoderISR, RISING);
    Serial.begin(115200);
}

void encoderISR() {
    // Read channel B to determine direction
    int b = digitalRead(3);
    if (b == HIGH) {
        encoderCount++;   // Forward
    } else {
        encoderCount--;   // Reverse
    }
}

void loop() {
    // Safe multi-byte read: disable interrupts briefly
    noInterrupts();
    long count = encoderCount;
    interrupts();
    
    Serial.print("Encoder: ");
    Serial.println(count);
    delay(100);
}</code></pre>
</div>
`
                },
                {
                    id: 'dma',
                    title: 'DMA',
                    content: `
<h3>DMA (Direct Memory Access)</h3>
<p>DMA is a hardware subsystem that transfers data between memory and peripherals <strong>without CPU involvement</strong>. This frees the CPU to do useful work while large data transfers happen in the background — critical for high-bandwidth operations in robotics.</p>

<h4>DMA vs CPU-Driven Transfer</h4>
<div class="two-col">
<div class="info-card">
<h4>Without DMA (Polling)</h4>
<p>CPU reads each byte → copies to buffer → waits for next byte. For 1MB transfer: CPU is 100% busy the whole time. Completely blocks all other tasks.</p>
</div>
<div class="info-card success">
<h4>With DMA</h4>
<p>CPU configures DMA (source, destination, size) → DMA handles transfer in hardware → CPU gets interrupted only when done. CPU is free for other work during the entire transfer.</p>
</div>
</div>

<h4>DMA Applications in Robotics</h4>
<ul>
<li><strong>High-speed ADC sampling</strong> — Sample multiple channels continuously into a buffer (e.g., 8-channel IMU at 8kHz)</li>
<li><strong>UART/SPI data transfer</strong> — Send/receive entire data packets without byte-by-byte CPU intervention</li>
<li><strong>LCD framebuffer update</strong> — Send display pixels via SPI DMA, CPU works on next frame meanwhile</li>
<li><strong>Camera data capture</strong> — High-speed DCMI (Digital Camera Interface) + DMA captures image frames</li>
<li><strong>NeoPixel LED control</strong> — Many efficient LED libraries use DMA + timer for precise timing</li>
</ul>

<div class="code-block">
<div class="code-header"><span class="code-lang">STM32 HAL (C)</span><button class="code-copy">Copy</button></div>
<pre><code>// ADC with DMA on STM32
// Continuously samples 3 channels into adcBuffer[]
uint16_t adcBuffer[3];  // One value per channel

void StartADC_DMA(void) {
    // Start ADC with DMA — non-blocking!
    HAL_ADC_Start_DMA(&hadc1, (uint32_t*)adcBuffer, 3);
}

// Called automatically by DMA when conversion complete
void HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef* hadc) {
    if (hadc->Instance == ADC1) {
        // adcBuffer now has fresh data from all 3 channels
        float voltage0 = adcBuffer[0] * 3.3f / 4096.0f;
        float voltage1 = adcBuffer[1] * 3.3f / 4096.0f;
        float voltage2 = adcBuffer[2] * 3.3f / 4096.0f;
        processAnalogData(voltage0, voltage1, voltage2);
    }
}</code></pre>
</div>
`
                },
                {
                    id: 'timers',
                    title: 'Timers',
                    content: `
<h3>Timers</h3>
<p>Hardware timers are counters inside the MCU that increment at a known clock rate. They're the foundation of PWM generation, precise timing, input capture (measuring pulse widths), and RTOS scheduling. <strong>Understanding timers is non-negotiable for robotics firmware.</strong></p>

<h4>Timer Modes</h4>
<table class="data-table">
<thead><tr><th>Mode</th><th>Function</th><th>Robotics Use</th></tr></thead>
<tbody>
<tr><td><strong>Output Compare (PWM)</strong></td><td>Toggle/set/clear pin when counter matches value</td><td>Motor control, servo signals, buzzer tones</td></tr>
<tr><td><strong>Input Capture</strong></td><td>Record timer value when pin edge detected</td><td>Measure encoder pulse period, RC receiver signal width, ultrasonic echo</td></tr>
<tr><td><strong>Periodic Interrupt</strong></td><td>Trigger ISR every N microseconds</td><td>PID control loop (e.g., every 5ms = 200Hz), RTOS tick, sensor polling</td></tr>
<tr><td><strong>Encoder Mode</strong></td><td>Automatic quadrature decoding in hardware</td><td>Motor encoder counting without CPU-heavy ISRs</td></tr>
<tr><td><strong>One-Pulse Mode</strong></td><td>Single precisely-timed pulse output</td><td>Ultrasonic sensor trigger pulse, servo calibration</td></tr>
</tbody>
</table>

<h4>PWM Generation</h4>
<div class="formula-block">
<div class="formula-label">PWM Parameters</div>
<div class="formula">f_PWM = f_clock / (Prescaler × Period)</div>
<div class="formula-description">Duty Cycle (%) = (Compare Value / Period) × 100%</div>
</div>

<div class="code-block">
<div class="code-header"><span class="code-lang">STM32 HAL — 50Hz Servo PWM</span><button class="code-copy">Copy</button></div>
<pre><code>// Timer 2, Channel 1, 50Hz PWM for standard servo
// Clock: 84MHz, Prescaler: 84-1, Period: 20000-1
// → f = 84MHz / (84 × 20000) = 50Hz
// Pulse width: 1000µs (−90°) to 2000µs (+90°) → Compare: 1000–2000

void setServoAngle(int angle) {  // angle: -90 to +90 degrees
    // Map angle to pulse width (1000–2000µs)
    uint32_t pulseWidth = 1500 + (angle * 500 / 90);  // 1000–2000µs
    __HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_1, pulseWidth);
}

void setup() {
    HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);
    setServoAngle(0);  // Center position
}</code></pre>
</div>

<h4>Hardware Quadrature Encoder (STM32)</h4>
<div class="code-block">
<div class="code-header"><span class="code-lang">STM32 HAL — Encoder Mode</span><button class="code-copy">Copy</button></div>
<pre><code>// Timer 3 configured in Encoder mode (TIM_ENCODERMODE_TI12)
// Automatically counts up/down based on A/B channel logic
// No ISR needed — hardware does all the work!

void startEncoder() {
    HAL_TIM_Encoder_Start(&htim3, TIM_CHANNEL_ALL);
    __HAL_TIM_SET_COUNTER(&htim3, 0);  // Reset counter
}

int32_t getEncoderCount() {
    // Handle 16-bit overflow (for motors that spin many rotations)
    return (int16_t)__HAL_TIM_GET_COUNTER(&htim3);
}

float getMotorRPM(int32_t countDelta, float dtSeconds, int ppr) {
    // ppr = pulses per revolution (4× with quadrature = 4×PPR)
    return (countDelta / (float)(4 * ppr)) * (60.0f / dtSeconds);
}</code></pre>
</div>
`
                },
                {
                    id: 'watchdogs',
                    title: 'Watchdog Timers',
                    content: `
<h3>Watchdog Timers</h3>
<p>A watchdog timer (WDT) is a hardware timer that resets the MCU if the firmware fails to "kick" (reset) it within a set time interval. It's the last line of defense against firmware hangs, infinite loops, and deadlocks — <strong>essential in any autonomous robot that must keep running without human intervention.</strong></p>

<h4>How Watchdog Works</h4>
<div class="flowchart">
<div class="flow-node start">Watchdog Timer Starts (e.g., 1s timeout)</div>
<div class="flow-arrow"></div>
<div class="flow-node process">Normal firmware runs</div>
<div class="flow-arrow"></div>
<div class="flow-node decision">Firmware kicks watchdog before timeout?</div>
<div class="flow-arrow"></div>
<div class="flow-node end">YES → Timer resets, system continues</div>
</div>
<p style="margin-top:8px; text-align:center; color:var(--text-secondary)">NO → Watchdog expires → MCU hard reset</p>

<h4>Types of Watchdog</h4>
<div class="two-col">
<div class="info-card">
<h4>Independent Watchdog (IWDG)</h4>
<p>Runs on its own internal RC oscillator — independent of main system clock. Cannot be disabled once enabled. Most reliable against clock failures. Use for critical safety systems.</p>
</div>
<div class="info-card">
<h4>Window Watchdog (WWDG)</h4>
<p>Must be kicked within a specific time window — not too early, not too late. Detects both hangs AND runaway tight loops. More complex to configure but more thorough.</p>
</div>
</div>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;avr/wdt.h&gt;

void setup() {
    // Enable 2-second watchdog
    wdt_enable(WDTO_2S);
    Serial.begin(115200);
}

void loop() {
    // Critical: kick the watchdog every iteration
    wdt_reset();  // Must happen at least every 2 seconds
    
    // Do robot work...
    readSensors();
    computeControl();
    driveMotors();
    // If any of these hang, the watchdog resets the MCU!
}</code></pre>
</div>

<div class="info-card warning">
<h4>⚠️ Don't Just Kick in main() — Monitor Real Progress</h4>
<p>A common mistake is kicking the watchdog at the top of the main loop. If one subsystem hangs but the loop still runs, the watchdog won't help. A better approach: use a state variable to track critical subsystem heartbeats and only kick the watchdog if ALL subsystems are healthy.</p>
</div>
`
                }
            ]
        },
        // ========== 4.2 MICROCONTROLLERS ==========
        {
            id: 'microcontrollers',
            title: '4.2 Microcontrollers',
            topics: [
                {
                    id: 'avr',
                    title: 'AVR (Arduino/ATmega)',
                    content: `
<h3>AVR Microcontrollers</h3>
<p>AVR (Advanced Virtual RISC) is an 8-bit microcontroller architecture developed by Atmel (now Microchip). The <strong>ATmega328P</strong> inside the Arduino Uno is the most widely used AVR in hobbyist robotics. Despite being 8-bit and running at 16MHz, it remains extremely popular for learning and simple projects.</p>

<h4>ATmega328P Key Specifications</h4>
<table class="data-table">
<thead><tr><th>Feature</th><th>Specification</th></tr></thead>
<tbody>
<tr><td>Architecture</td><td>8-bit AVR RISC</td></tr>
<tr><td>Clock Speed</td><td>16 MHz (Arduino Uno)</td></tr>
<tr><td>Flash (Program Memory)</td><td>32 KB</td></tr>
<tr><td>SRAM</td><td>2 KB</td></tr>
<tr><td>EEPROM</td><td>1 KB (non-volatile storage)</td></tr>
<tr><td>I/O Pins</td><td>23 GPIO</td></tr>
<tr><td>ADC</td><td>8-channel, 10-bit</td></tr>
<tr><td>Timers</td><td>2× 8-bit, 1× 16-bit</td></tr>
<tr><td>UART/SPI/I²C</td><td>1 of each</td></tr>
<tr><td>Operating Voltage</td><td>1.8–5.5V</td></tr>
</tbody>
</table>

<h4>AVR Memory Architecture</h4>
<p>AVR is a <strong>Harvard architecture</strong> — separate buses for program (Flash) and data (SRAM) memory. This means it can fetch an instruction and read/write data simultaneously. Important consequence: you cannot store data in Flash and read it like normal RAM — you need <code>PROGMEM</code> and <code>pgm_read_byte()</code>.</p>

<h4>Bare-Metal AVR Register Programming</h4>
<div class="code-block">
<div class="code-header"><span class="code-lang">C — Bare Metal AVR (no Arduino)</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;avr/io.h&gt;
#include &lt;avr/interrupt.h&gt;
#include &lt;util/delay.h&gt;

// Blink LED on PB5 (Arduino pin 13) using direct register access
int main(void) {
    DDRB |= (1 << PB5);    // Set PB5 as output (Data Direction Register)
    
    // Configure Timer1 for 1Hz interrupt
    TCCR1B |= (1 << WGM12) | (1 << CS12) | (1 << CS10); // CTC, prescaler 1024
    OCR1A = 15624;          // 16MHz / 1024 / (15624+1) = 1Hz
    TIMSK1 |= (1 << OCIE1A); // Enable compare match interrupt
    sei();                  // Enable global interrupts
    
    while(1) { /* Main loop - work done in ISR */ }
}

ISR(TIMER1_COMPA_vect) {
    PORTB ^= (1 << PB5);   // Toggle LED (XOR with 1)
}</code></pre>
</div>
`
                },
                {
                    id: 'arm-cortex-m',
                    title: 'ARM Cortex-M',
                    content: `
<h3>ARM Cortex-M Architecture</h3>
<p>ARM Cortex-M is the dominant 32-bit processor core in embedded robotics. It powers STM32, nRF52, SAMD21 (Arduino Zero), and hundreds of other MCUs. All Cortex-M variants share the same instruction set (Thumb-2), peripherals differ between manufacturers.</p>

<h4>Cortex-M Family Comparison</h4>
<table class="data-table">
<thead><tr><th>Core</th><th>Pipeline</th><th>FPU</th><th>Max Speed</th><th>Target</th></tr></thead>
<tbody>
<tr><td><strong>Cortex-M0/M0+</strong></td><td>2-stage</td><td>No</td><td>~48 MHz</td><td>Ultra low-power IoT, simple sensors</td></tr>
<tr><td><strong>Cortex-M3</strong></td><td>3-stage</td><td>No</td><td>~120 MHz</td><td>General purpose, STM32F1/F2</td></tr>
<tr><td><strong>Cortex-M4</strong></td><td>3-stage</td><td>Optional</td><td>~168 MHz</td><td>Motor control, DSP, STM32F3/F4</td></tr>
<tr><td><strong>Cortex-M7</strong></td><td>6-stage (OOO)</td><td>Double</td><td>~480 MHz</td><td>High-performance robotics, STM32H7</td></tr>
<tr><td><strong>Cortex-M33</strong></td><td>3-stage</td><td>Optional</td><td>~64 MHz</td><td>Security + IoT, nRF9160</td></tr>
</tbody>
</table>

<h4>Key ARM Cortex-M Features for Robotics</h4>
<ul>
<li><strong>NVIC (Nested Vectored Interrupt Controller)</strong> — Hardware interrupt prioritization with 240+ interrupt sources and configurable priority levels. Enables preemptive multitasking in RTOS.</li>
<li><strong>SysTick Timer</strong> — 24-bit countdown timer, used by FreeRTOS and other RTOSes for the scheduler tick (typically 1ms).</li>
<li><strong>FPU (Floating Point Unit, M4/M7)</strong> — Hardware single-precision (M4) or double-precision (M7) floating point. Critical for PID, sensor fusion (quaternions), and motion planning. Without FPU, floating-point is emulated in software — 10–100× slower.</li>
<li><strong>MPU (Memory Protection Unit)</strong> — Protects stack overflow, separates RTOS task memory regions.</li>
<li><strong>DWT (Debug and Trace)</strong> — Cycle-accurate profiling and data watchpoints.</li>
</ul>

<h4>ARM Cortex-M Exception Model</h4>
<p>The ARM exception model defines how the CPU responds to interrupts and faults. For robotics firmware, the most important:</p>
<ul>
<li><strong>HardFault</strong> — Triggered by invalid memory access, division by zero, undefined instruction. Your code crashed.</li>
<li><strong>MemManage</strong> — MPU violation. Usually stack overflow or null pointer dereference.</li>
<li><strong>UsageFault</strong> — Undefined instruction, unaligned access, illegal floating-point operation.</li>
</ul>

<div class="code-block">
<div class="code-header"><span class="code-lang">C — HardFault Handler (debug)</span><button class="code-copy">Copy</button></div>
<pre><code>// Place this in your firmware to get fault info
void HardFault_Handler(void) {
    // Read Program Counter from stack frame
    __asm volatile(
        "TST LR, #4 \n"
        "ITE EQ \n"
        "MRSEQ R0, MSP \n"
        "MRSNE R0, PSP \n"
        "B prvGetRegistersFromStack \n"
    );
}

void prvGetRegistersFromStack(uint32_t *pulFaultStackAddress) {
    volatile uint32_t r0  = pulFaultStackAddress[0];
    volatile uint32_t r1  = pulFaultStackAddress[1];
    volatile uint32_t r2  = pulFaultStackAddress[2];
    volatile uint32_t r3  = pulFaultStackAddress[3];
    volatile uint32_t r12 = pulFaultStackAddress[4];
    volatile uint32_t lr  = pulFaultStackAddress[5];
    volatile uint32_t pc  = pulFaultStackAddress[6]; // Faulting address!
    volatile uint32_t psr = pulFaultStackAddress[7];
    
    // Set breakpoint here in debugger to inspect pc
    while(1);
}</code></pre>
</div>
`
                },
                {
                    id: 'stm32',
                    title: 'STM32',
                    content: `
<h3>STM32 Family</h3>
<p>STMicroelectronics' STM32 is the most popular 32-bit MCU family in professional robotics. With hundreds of variants from 48-pin to 208-pin packages, clock speeds from 32MHz to 480MHz, and rich peripheral sets, there's an STM32 for every robotics application.</p>

<h4>STM32 Family Overview</h4>
<table class="data-table">
<thead><tr><th>Series</th><th>Core</th><th>Max Clock</th><th>Typical Use in Robotics</th></tr></thead>
<tbody>
<tr><td><strong>STM32F0</strong></td><td>M0</td><td>48 MHz</td><td>Simple sensor nodes, LED drivers</td></tr>
<tr><td><strong>STM32F1</strong></td><td>M3</td><td>72 MHz</td><td>BluePill: cheapest 32-bit MCU for beginners</td></tr>
<tr><td><strong>STM32F3</strong></td><td>M4 + FPU</td><td>72 MHz</td><td>Motor control, sensor fusion (has op-amps on chip!)</td></tr>
<tr><td><strong>STM32F4</strong></td><td>M4 + FPU</td><td>168–180 MHz</td><td>Mid-range robotics controller, Pixhawk flight controller</td></tr>
<tr><td><strong>STM32G4</strong></td><td>M4 + FPU + DSP</td><td>170 MHz</td><td>Advanced motor control (FOC), includes HRTIM</td></tr>
<tr><td><strong>STM32H7</strong></td><td>M7 + FPU</td><td>480 MHz</td><td>High-performance: vision, navigation, complex robotics</td></tr>
</tbody>
</table>

<h4>STM32 Ecosystem Tools</h4>
<ul>
<li><strong>STM32CubeIDE</strong> — Eclipse-based IDE with code generation, debugging, and HAL library</li>
<li><strong>STM32CubeMX</strong> — Graphical pin/clock/peripheral configurator → generates initialization code</li>
<li><strong>HAL (Hardware Abstraction Layer)</strong> — High-level portable API (easier but adds overhead)</li>
<li><strong>LL (Low-Level) drivers</strong> — Thin register wrappers, maximum performance</li>
<li><strong>STM32CubeMonitor</strong> — Real-time variable plotting/monitoring via SWD</li>
<li><strong>ST-Link</strong> — Built-in debugger/programmer on Nucleo/Discovery boards</li>
</ul>

<h4>STM32 Motor Control Ecosystem</h4>
<p>STM32 has the most comprehensive motor control ecosystem available:</p>
<ul>
<li><strong>MCSDK (Motor Control SDK)</strong> — Free library implementing FOC (Field-Oriented Control) for BLDC/PMSM motors</li>
<li><strong>Advanced-control timers (TIM1/TIM8)</strong> — 6-channel complementary PWM with dead-time insertion for 3-phase bridge control</li>
<li><strong>CORDIC peripheral (G4/H7)</strong> — Hardware trigonometric calculation for FOC (sin, cos, magnitude in 8 cycles)</li>
<li><strong>HRTIM (High-Resolution Timer)</strong> — 184ps resolution for advanced power electronics control</li>
</ul>
`
                },
                {
                    id: 'rp2040',
                    title: 'RP2040 (Raspberry Pi Pico)',
                    content: `
<h3>RP2040 — Raspberry Pi Pico</h3>
<p>The RP2040 is a custom 32-bit dual-core ARM Cortex-M0+ chip designed by Raspberry Pi Ltd. At ~$1 per chip, it offers remarkable features for robotics at rock-bottom cost, including a unique <strong>PIO (Programmable I/O)</strong> subsystem that can implement custom hardware protocols in software.</p>

<h4>RP2040 Specifications</h4>
<table class="data-table">
<thead><tr><th>Feature</th><th>Specification</th></tr></thead>
<tbody>
<tr><td>CPU</td><td>Dual-core Cortex-M0+ @ 133 MHz</td></tr>
<tr><td>RAM</td><td>264 KB SRAM (on-chip)</td></tr>
<tr><td>Flash</td><td>External: 2MB (Pico), up to 16MB</td></tr>
<tr><td>GPIO</td><td>30 multipurpose I/O pins</td></tr>
<tr><td>ADC</td><td>4-channel 12-bit (500 kSPS)</td></tr>
<tr><td>PWM</td><td>16 PWM channels (8 slices × 2 channels)</td></tr>
<tr><td>USB</td><td>USB 1.1 host/device (native)</td></tr>
<tr><td>PIO</td><td>2× PIO blocks, 8 state machines total</td></tr>
</tbody>
</table>

<h4>The PIO — Programmable I/O (Unique Feature)</h4>
<p>PIO state machines are tiny processors that can run 9-instruction programs at up to 133 MHz, independently of the main CPU. They can implement almost any serial protocol in software: WS2812B LEDs, DPI displays, stepper motor step generation, custom sensor protocols.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">MicroPython — Raspberry Pi Pico</span><button class="code-copy">Copy</button></div>
<pre><code>from machine import Pin, PWM
import time

# Servo control on Pico
servo = PWM(Pin(15))
servo.freq(50)  # 50Hz

def set_angle(angle):
    # Map -90 to +90 degrees to duty cycle
    # 1ms = 0° min, 2ms = 180° → duty in 65535 units
    duty = int((angle + 90) / 180 * (9830 - 4915) + 4915)
    servo.duty_u16(duty)

# Move servo back and forth
while True:
    for angle in range(-90, 90, 5):
        set_angle(angle)
        time.sleep(0.02)
    for angle in range(90, -90, -5):
        set_angle(angle)
        time.sleep(0.02)</code></pre>
</div>

<h4>Dual-Core Usage in Robotics</h4>
<p>The RP2040's two cores can run completely independently. A common robotics pattern:</p>
<ul>
<li><strong>Core 0:</strong> Communication (USB, UART), sensor reading, high-level control logic</li>
<li><strong>Core 1:</strong> Time-critical motor control, PID loop, encoder reading</li>
</ul>
`
                }
            ]
        },
        // ========== 4.3 ARDUINO ==========
        {
            id: 'arduino-ecosystem',
            title: '4.3 Arduino Ecosystem',
            topics: [
                {
                    id: 'arduino-boards',
                    title: 'Arduino Boards',
                    content: `
<h3>Arduino Ecosystem</h3>
<p>Arduino provides an open-source hardware and software ecosystem that dramatically lowers the barrier to embedded systems development. The Arduino IDE, core libraries, and consistent pin labeling let you get a robot moving in hours rather than days. Despite its simplicity, professional roboticists use Arduino (or its derivatives) regularly.</p>

<h4>Board Comparison</h4>
<table class="data-table">
<thead><tr><th>Board</th><th>MCU</th><th>Flash/RAM</th><th>I/O</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>Uno R3</strong></td><td>ATmega328P @ 16MHz</td><td>32KB/2KB</td><td>14D, 6A</td><td>Learning, simple robots, motor control</td></tr>
<tr><td><strong>Nano</strong></td><td>ATmega328P @ 16MHz</td><td>32KB/2KB</td><td>14D, 8A</td><td>Compact robots, breadboard projects</td></tr>
<tr><td><strong>Mega 2560</strong></td><td>ATmega2560 @ 16MHz</td><td>256KB/8KB</td><td>54D, 16A</td><td>Complex robots with many sensors/servos</td></tr>
<tr><td><strong>Micro/Leonardo</strong></td><td>ATmega32U4 @ 16MHz</td><td>32KB/2.5KB</td><td>20D, 12A</td><td>USB HID (keyboard/mouse robot), compact</td></tr>
<tr><td><strong>Due</strong></td><td>SAM3X8E @ 84MHz</td><td>512KB/96KB</td><td>54D, 12A</td><td>32-bit power with Arduino simplicity</td></tr>
</tbody>
</table>

<h4>Arduino Pin Functions (Uno)</h4>
<div class="pinout-diagram">
<span class="pin power">VIN (7-12V)</span>
<span class="pin power">5V</span>
<span class="pin power">3.3V</span>
<span class="pin gnd">GND</span>
<span class="pin analog">A0–A5 (ADC)</span>
<span class="pin digital">D0-D1 (UART)</span>
<span class="pin digital">D2-D3 (INT)</span>
<span class="pin digital">D3,5,6,9,10,11 (PWM~)</span>
<span class="pin comm">D10-D13 (SPI)</span>
<span class="pin comm">A4/A5 (I²C SDA/SCL)</span>
</div>
`
                },
                {
                    id: 'arduino-timers',
                    title: 'Arduino Timers & PWM',
                    content: `
<h3>Arduino Timers and PWM</h3>
<p>The ATmega328P (Arduino Uno/Nano) has 3 hardware timers. Understanding these is critical because <code>analogWrite()</code>, <code>delay()</code>, <code>millis()</code>, and servo libraries all depend on them — and they can conflict!</p>

<h4>Timer 0, 1, 2 on ATmega328P</h4>
<table class="data-table">
<thead><tr><th>Timer</th><th>Bits</th><th>PWM Pins</th><th>Default Use</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>Timer0</strong></td><td>8-bit</td><td>D5, D6</td><td><code>millis()</code>, <code>delay()</code>, <code>micros()</code></td><td>Don't reconfigure! PWM freq: ~976 Hz</td></tr>
<tr><td><strong>Timer1</strong></td><td>16-bit</td><td>D9, D10</td><td>Servo library</td><td>Best for precise timing. PWM freq: ~490 Hz</td></tr>
<tr><td><strong>Timer2</strong></td><td>8-bit</td><td>D3, D11</td><td>Tone library</td><td>PWM freq: ~490 Hz (D3: ~976 Hz)</td></tr>
</tbody>
</table>

<h4>Changing PWM Frequency</h4>
<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — Change PWM Frequency</span><button class="code-copy">Copy</button></div>
<pre><code>// By default analogWrite uses ~490Hz (or 976Hz for pins 5, 6)
// For motor control, higher frequency (e.g., 31.4kHz) reduces audible whine

// Change Timer2 prescaler for pins 3, 11
// Prescaler 1 → 31.372 kHz PWM
TCCR2B = TCCR2B & B11111000 | B00000001;  // Pin 3, 11: 31.4kHz

// Prescaler options for Timer2:
// B00000001 = 1   → 31.4 kHz
// B00000010 = 8   → 3.92 kHz
// B00000011 = 32  → 980 Hz (default)
// B00000100 = 64  → 490 Hz
// B00000101 = 128 → 245 Hz
// B00000110 = 256 → 122 Hz
// B00000111 = 1024 → 30.6 Hz

// NOTE: Changing Timer0 prescaler affects millis()/delay()!</code></pre>
</div>

<h4>Servo Library Internals</h4>
<p>The Arduino Servo library uses Timer1 (or Timer5 on Mega) with input capture to generate 50Hz PWM with microsecond precision. It multiplexes up to 12 servos per timer by cleverly switching which pin is being driven at each moment. Important: <code>Servo.attach()</code> disables PWM on pins 9 and 10 (Uno) because they share Timer1.</p>
`
                },
                {
                    id: 'arduino-adc',
                    title: 'Arduino ADC & Interrupts',
                    content: `
<h3>Arduino ADC and Interrupts</h3>
<h4>Arduino ADC</h4>
<p>The ATmega328P's ADC is 10-bit, 0-5V range (or 0-3.3V if AREF is set to 3.3V). The ADC clock is derived from the main clock with a prescaler — optimal accuracy requires 50–200 kHz ADC clock.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — Fast Analog Read</span><button class="code-copy">Copy</button></div>
<pre><code>// Default analogRead takes ~100µs (prescaler 128 = 125kHz ADC clock)
// Speed it up for faster sampling (at some accuracy cost)

// Set prescaler to 16 → ADC clock = 1MHz → ~16µs per read
void setup() {
    // Clear prescaler bits (ADPS2:0) and set to 16
    ADCSRA &= ~(bit(ADPS2) | bit(ADPS1) | bit(ADPS0));
    ADCSRA |= bit(ADPS2);  // Prescaler = 16 → ~1MHz ADC clock
    
    // Set reference voltage to internal 1.1V for better resolution
    // on sensors that output < 1.1V
    analogReference(INTERNAL);  // 0-1.1V range → 1.07mV per step
}

// Averaging for noise reduction
int averagedRead(int pin, int samples) {
    long sum = 0;
    for (int i = 0; i < samples; i++) {
        sum += analogRead(pin);
    }
    return sum / samples;
}</code></pre>
</div>

<h4>Arduino External Interrupts</h4>
<p>Arduino Uno/Nano only have 2 external interrupt pins (D2, D3). Mega has 6 (D2, D3, D18-D21). For more interrupt sources, use <strong>Pin Change Interrupts (PCINT)</strong> which can trigger on any pin but fire for the whole port:</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — External Interrupt</span><button class="code-copy">Copy</button></div>
<pre><code>// Ultrasonic sensor echo timing using interrupts
volatile unsigned long echoStart = 0;
volatile unsigned long echoEnd = 0;
volatile bool echoComplete = false;

void echoISR() {
    if (digitalRead(ECHO_PIN) == HIGH) {
        echoStart = micros();
    } else {
        echoEnd = micros();
        echoComplete = true;
    }
}

void setup() {
    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    attachInterrupt(digitalPinToInterrupt(ECHO_PIN), echoISR, CHANGE);
}

float getDistanceCm() {
    // Send 10µs trigger pulse
    digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);
    
    echoComplete = false;
    unsigned long timeout = millis() + 30;
    while (!echoComplete && millis() < timeout);
    
    if (!echoComplete) return -1;  // Timeout
    unsigned long duration = echoEnd - echoStart;
    return duration * 0.0343f / 2.0f;  // Speed of sound: 343m/s
}</code></pre>
</div>
`
                }
            ]
        },
        // ========== 4.4 ESP32 ==========
        {
            id: 'esp32-ecosystem',
            title: '4.4 ESP32 Ecosystem',
            topics: [
                {
                    id: 'esp32-overview',
                    title: 'ESP32 Overview',
                    content: `
<h3>ESP32 — The King of IoT Robotics</h3>
<p>The ESP32 (Espressif Systems) is arguably the most capable and popular chip for hobbyist and intermediate robotics. It packs dual-core 240MHz CPU, WiFi, Bluetooth, 520KB RAM, and rich peripherals — all for under $5. The newer <strong>ESP32-S3</strong> adds vector instructions and AI acceleration for edge ML.</p>

<h4>ESP32 Family Comparison</h4>
<table class="data-table">
<thead><tr><th>Chip</th><th>CPU</th><th>RAM</th><th>WiFi</th><th>BT</th><th>Key Feature</th></tr></thead>
<tbody>
<tr><td><strong>ESP8266</strong></td><td>Xtensa LX106 @ 80MHz</td><td>80KB</td><td>2.4GHz</td><td>—</td><td>Original WiFi chip, very limited RAM</td></tr>
<tr><td><strong>ESP32</strong></td><td>Dual Xtensa LX6 @ 240MHz</td><td>520KB</td><td>2.4GHz</td><td>BT + BLE</td><td>Most popular, mature ecosystem</td></tr>
<tr><td><strong>ESP32-S2</strong></td><td>Single Xtensa LX7 @ 240MHz</td><td>320KB</td><td>2.4GHz</td><td>BLE only</td><td>USB OTG, lower power</td></tr>
<tr><td><strong>ESP32-S3</strong></td><td>Dual Xtensa LX7 @ 240MHz</td><td>512KB</td><td>2.4GHz</td><td>BT + BLE 5</td><td>AI vector instructions, USB OTG</td></tr>
<tr><td><strong>ESP32-C3</strong></td><td>RISC-V @ 160MHz</td><td>400KB</td><td>2.4GHz</td><td>BLE 5</td><td>RISC-V, low cost, Matter protocol</td></tr>
</tbody>
</table>

<h4>ESP32 Key Peripherals for Robotics</h4>
<ul>
<li><strong>34 GPIO pins</strong> (many multiplexed) with input-only, output, and ADC capability</li>
<li><strong>16 PWM channels</strong> (LEDC hardware), 25MHz max frequency, 16-bit resolution</li>
<li><strong>18-channel 12-bit SAR ADC</strong> — Note: ADC2 cannot be used while WiFi is active!</li>
<li><strong>2× SPI, 2× I²C, 3× UART</strong> — Most can be remapped to any GPIO</li>
<li><strong>1× CAN (TWAI)</strong> — For interfacing industrial motor controllers</li>
<li><strong>MCPWM (Motor Control PWM)</strong> — Dedicated motor control timer with fault detection</li>
<li><strong>Pulse Counter (PCNT)</strong> — Hardware quadrature decoder, like STM32's encoder mode</li>
<li><strong>I²S</strong> — Audio interface, also used for high-speed data (WS2812B LEDs!)</li>
</ul>

<div class="code-block">
<div class="code-header"><span class="code-lang">ESP32 Arduino — LEDC PWM Motor Control</span><button class="code-copy">Copy</button></div>
<pre><code>#define MOTOR_PWM_PIN    18
#define MOTOR_DIR_PIN    19
#define PWM_CHANNEL      0
#define PWM_FREQUENCY    20000   // 20kHz — inaudible to humans
#define PWM_RESOLUTION   8       // 8-bit → 0-255

void setup() {
    // ESP32 LEDC (LED Control) for PWM — works on ANY GPIO!
    ledcSetup(PWM_CHANNEL, PWM_FREQUENCY, PWM_RESOLUTION);
    ledcAttachPin(MOTOR_PWM_PIN, PWM_CHANNEL);
    pinMode(MOTOR_DIR_PIN, OUTPUT);
}

void setMotor(int speed) {  // speed: -255 to +255
    if (speed >= 0) {
        digitalWrite(MOTOR_DIR_PIN, HIGH);
        ledcWrite(PWM_CHANNEL, speed);
    } else {
        digitalWrite(MOTOR_DIR_PIN, LOW);
        ledcWrite(PWM_CHANNEL, -speed);
    }
}</code></pre>
</div>
`
                },
                {
                    id: 'esp32-wifi',
                    title: 'ESP32 WiFi & Bluetooth',
                    content: `
<h3>ESP32 WiFi and Bluetooth</h3>
<h4>WiFi Capabilities</h4>
<p>The ESP32 implements 802.11 b/g/n WiFi with WPA2 support. It can operate as a <strong>Station</strong> (connects to router), <strong>Access Point</strong> (creates its own network), or <strong>both simultaneously</strong>.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">ESP32 — WiFi Web Server for Robot Control</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;WiFi.h&gt;
#include &lt;WebServer.h&gt;

const char* ssid = "RobotNetwork";
const char* password = "robot1234";

WebServer server(80);

void handleControl() {
    if (server.hasArg("speed") && server.hasArg("dir")) {
        int speed = server.arg("speed").toInt();
        String dir = server.arg("dir");
        setMotor(dir == "forward" ? speed : -speed);
        server.send(200, "text/plain", "OK");
    }
}

void setup() {
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) delay(500);
    
    server.on("/control", HTTP_POST, handleControl);
    server.begin();
    Serial.println("Robot IP: " + WiFi.localIP().toString());
}

void loop() {
    server.handleClient();
}</code></pre>
</div>

<h4>Bluetooth Classic vs BLE</h4>
<div class="two-col">
<div class="info-card">
<h4>Bluetooth Classic (SPP)</h4>
<p>Serial Port Profile — behaves like a serial cable. Range: ~10m. Higher throughput (~2 Mbps). Works with HC-05/06 modules and Android Bluetooth Serial apps. Good for gamepad control and telemetry.</p>
</div>
<div class="info-card">
<h4>BLE (Bluetooth Low Energy)</h4>
<p>Much lower power, but limited throughput (~1 Mbps). Connects to iOS, modern Android, web browsers (Web Bluetooth API). Uses GATT protocol with Services and Characteristics. Ideal for battery-powered sensor robots.</p>
</div>
</div>
`
                },
                {
                    id: 'freertos-esp32',
                    title: 'FreeRTOS on ESP32',
                    content: `
<h3>FreeRTOS on ESP32</h3>
<p>The ESP32's Arduino framework and ESP-IDF both run <strong>FreeRTOS</strong> underneath. Unlike Arduino's single-threaded loop, FreeRTOS allows you to run multiple concurrent tasks, making complex robots far more manageable.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">ESP32 Arduino — FreeRTOS Tasks</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;Arduino.h&gt;

// Task handles
TaskHandle_t motorTaskHandle = NULL;
TaskHandle_t sensorTaskHandle = NULL;

// Shared data with mutex protection
SemaphoreHandle_t dataMutex;
volatile float targetSpeed = 0;
volatile float currentDistance = 0;

void motorControlTask(void *pvParameters) {
    // High priority motor control loop on Core 1
    TickType_t lastWake = xTaskGetTickCount();
    
    while (true) {
        // Run at exactly 200Hz (5ms period)
        vTaskDelayUntil(&lastWake, pdMS_TO_TICKS(5));
        
        if (xSemaphoreTake(dataMutex, pdMS_TO_TICKS(1)) == pdTRUE) {
            float speed = targetSpeed;
            float dist = currentDistance;
            xSemaphoreGive(dataMutex);
        }
        // PID control, motor updates...
    }
}

void sensorTask(void *pvParameters) {
    // Lower priority sensor reading on Core 0
    while (true) {
        float dist = readUltrasonic();
        
        if (xSemaphoreTake(dataMutex, portMAX_DELAY) == pdTRUE) {
            currentDistance = dist;
            xSemaphoreGive(dataMutex);
        }
        vTaskDelay(pdMS_TO_TICKS(50));  // 20Hz sensor update
    }
}

void setup() {
    dataMutex = xSemaphoreCreateMutex();
    
    // Pin motor task to Core 1 (leaves Core 0 for WiFi/BT)
    xTaskCreatePinnedToCore(motorControlTask, "MotorCtrl", 4096,
                            NULL, 2, &motorTaskHandle, 1);
    xTaskCreatePinnedToCore(sensorTask, "Sensors", 4096,
                            NULL, 1, &sensorTaskHandle, 0);
}

void loop() {
    // loop() runs as a low-priority FreeRTOS task
    // Can be empty if all work is in tasks
    vTaskDelay(portMAX_DELAY);
}</code></pre>
</div>
`
                }
            ]
        },
        // ========== 4.5 RASPBERRY PI ==========
        {
            id: 'raspberry-pi',
            title: '4.5 Raspberry Pi',
            topics: [
                {
                    id: 'rpi-gpio',
                    title: 'GPIO & Hardware Interface',
                    content: `
<h3>Raspberry Pi in Robotics</h3>
<p>The Raspberry Pi is a single-board computer running full Linux — it bridges the gap between microcontrollers and PCs. In robotics, it's used as a high-level "brain" for tasks that require significant compute: computer vision, ROS (Robot Operating System), machine learning, web interfaces, and complex planning algorithms, while a separate MCU (like STM32 or Arduino) handles real-time low-level control.</p>

<h4>Typical Robotics Architecture</h4>
<div class="block-diagram">
<div class="block-node" style="border-color: var(--phase4-border);">Raspberry Pi<br><small>High-level: Vision, ROS, Planning</small></div>
<div class="block-arrow">↔ UART/SPI/USB ↔</div>
<div class="block-node" style="border-color: var(--phase3-border);">STM32 / Arduino<br><small>Real-time: PID, PWM, Sensors</small></div>
</div>

<h4>Raspberry Pi GPIO (Pi 4/5)</h4>
<p>The 40-pin GPIO header provides:</p>
<div class="pinout-diagram">
<span class="pin power">5V (pins 2, 4)</span>
<span class="pin power">3.3V (pins 1, 17)</span>
<span class="pin gnd">GND (pins 6,9,14,20,25,30,34,39)</span>
<span class="pin digital">GPIO 0-27 (3.3V logic!)</span>
<span class="pin comm">GPIO 2,3 (I²C SDA, SCL)</span>
<span class="pin comm">GPIO 8-11 (SPI0)</span>
<span class="pin comm">GPIO 14,15 (UART TX, RX)</span>
</div>

<div class="info-card danger">
<h4>🔴 Raspberry Pi GPIO Is 3.3V Only!</h4>
<p>Unlike Arduino (5V tolerant), RPi GPIO pins are <strong>3.3V maximum</strong>. Applying 5V will permanently damage the SoC. Use level shifters when interfacing with 5V devices. The GPIO pins are also not very tolerant of large currents — max 16mA per pin, 50mA total.</p>
</div>

<div class="code-block">
<div class="code-header"><span class="code-lang">Python — RPi.GPIO Motor Control</span><button class="code-copy">Copy</button></div>
<pre><code>import RPi.GPIO as GPIO
import time

# Setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)  # Motor PWM
GPIO.setup(23, GPIO.OUT)  # Direction A
GPIO.setup(24, GPIO.OUT)  # Direction B

# Create PWM object: pin 18, 1kHz frequency
pwm = GPIO.PWM(18, 1000)
pwm.start(0)  # Start with 0% duty cycle

def drive_forward(speed_pct):
    GPIO.output(23, GPIO.HIGH)
    GPIO.output(24, GPIO.LOW)
    pwm.ChangeDutyCycle(speed_pct)  # 0-100

def stop():
    pwm.ChangeDutyCycle(0)

try:
    drive_forward(75)
    time.sleep(2)
    stop()
finally:
    pwm.stop()
    GPIO.cleanup()</code></pre>
</div>

<h4>Raspberry Pi Edge AI</h4>
<p>The RPi 5 with its VideoCore VII GPU and optional <strong>AI HAT+</strong> (26 TOPS NPU) can run real-time inference for:</p>
<ul>
<li>Object detection (YOLOv8 Nano at 30+ FPS)</li>
<li>Person tracking for following robots</li>
<li>Gesture recognition for human-robot interaction</li>
<li>Lane detection for autonomous vehicles</li>
<li>Voice command recognition (Whisper Tiny)</li>
</ul>
`
                }
            ]
        },
        // ========== 4.6 RTOS ==========
        {
            id: 'rtos',
            title: '4.6 RTOS',
            topics: [
                {
                    id: 'rtos-fundamentals',
                    title: 'RTOS Fundamentals',
                    content: `
<h3>Real-Time Operating Systems (RTOS)</h3>
<p>An RTOS is a lightweight operating system designed for embedded systems with real-time requirements. Unlike Linux or Windows, an RTOS provides <strong>deterministic scheduling</strong> — you can guarantee that a critical task runs within a specific time window. <strong>FreeRTOS</strong> is the dominant RTOS in robotics, running on everything from Arduino to ESP32 to STM32.</p>

<h4>RTOS Core Concepts</h4>

<h4>Tasks</h4>
<p>A task is an independent thread of execution with its own stack. Tasks have states:</p>
<div class="block-diagram">
<div class="block-node">Ready</div>
<div class="block-arrow">→ Scheduled →</div>
<div class="block-node">Running</div>
<div class="block-arrow">→ Blocks/Yields →</div>
<div class="block-node">Blocked</div>
<div class="block-arrow">→ Event occurs →</div>
<div class="block-node">Ready</div>
</div>

<h4>Scheduling Algorithms</h4>
<table class="data-table">
<thead><tr><th>Scheduler Type</th><th>How It Works</th><th>Use Case</th></tr></thead>
<tbody>
<tr><td><strong>Preemptive Priority</strong></td><td>Highest-priority ready task always runs. Lower-priority tasks preempted immediately.</td><td>Real-time systems — motor control, safety tasks. Default FreeRTOS mode.</td></tr>
<tr><td><strong>Round-Robin</strong></td><td>Equal-priority tasks share CPU in time slices. Prevents starvation.</td><td>Tasks with equal priority and no strict timing needs.</td></tr>
<tr><td><strong>Cooperative</strong></td><td>Tasks yield control voluntarily. No preemption.</td><td>Simple systems where tasks are well-behaved. Lower overhead.</td></tr>
</tbody>
</table>

<h4>Semaphores and Mutexes</h4>
<div class="two-col">
<div class="info-card">
<h4>Binary Semaphore</h4>
<p>0 or 1 count. Used for signaling between tasks/ISRs. An ISR "gives" a semaphore when data is ready; a task "takes" it and processes. Non-recursive, no ownership.</p>
</div>
<div class="info-card">
<h4>Mutex (Mutual Exclusion)</h4>
<p>Like a binary semaphore but with ownership and priority inheritance. Used to protect shared resources (global variables, hardware). The task that takes it must be the one to give it back.</p>
</div>
</div>

<h4>Queues</h4>
<p>Queues are the recommended way to pass data between tasks in FreeRTOS. They're thread-safe FIFO buffers that block the receiver if empty and the sender if full.</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">FreeRTOS — Queue Between Tasks</span><button class="code-copy">Copy</button></div>
<pre><code>// Robot sensor→control data pipeline using FreeRTOS Queue
typedef struct {
    float distance;
    float angle;
    uint32_t timestamp;
} SensorData_t;

QueueHandle_t sensorQueue;

void sensorTask(void *pvParams) {
    SensorData_t data;
    while (true) {
        data.distance = readLidar();
        data.angle    = readIMU();
        data.timestamp = xTaskGetTickCount();
        
        // Send to queue — don't block (skip if queue full)
        xQueueSend(sensorQueue, &data, 0);
        vTaskDelay(pdMS_TO_TICKS(10));  // 100Hz
    }
}

void controlTask(void *pvParams) {
    SensorData_t data;
    while (true) {
        // Block waiting for sensor data (timeout 100ms)
        if (xQueueReceive(sensorQueue, &data, pdMS_TO_TICKS(100)) == pdTRUE) {
            computeAndApplyControl(data.distance, data.angle);
        } else {
            // Sensor timeout — emergency stop!
            emergencyStop();
        }
    }
}

void setup() {
    sensorQueue = xQueueCreate(5, sizeof(SensorData_t));
    xTaskCreate(sensorTask,  "Sensor",  2048, NULL, 2, NULL);
    xTaskCreate(controlTask, "Control", 4096, NULL, 3, NULL);
}</code></pre>
</div>
`
                }
            ]
        },
        // ========== 4.7 COMMUNICATION PROTOCOLS ==========
        {
            id: 'communication-protocols',
            title: '4.7 Communication Protocols',
            topics: [
                {
                    id: 'uart',
                    title: 'UART',
                    content: `
<h3>UART (Universal Asynchronous Receiver-Transmitter)</h3>
<p>UART is the simplest serial communication protocol — just two wires (TX and RX) with no clock signal. It's "asynchronous" because both sides must agree on the same baud rate ahead of time rather than using a shared clock. Used for: debug output, GPS modules, Bluetooth modules (HC-05), motor controllers.</p>

<h4>UART Frame Format</h4>
<div class="diagram-container">
<div class="diagram-title">UART Data Frame</div>
<svg class="waveform-svg" viewBox="0 0 700 120" width="700" height="120">
    <!-- Idle line (HIGH) -->
    <line x1="0" y1="30" x2="80" y2="30" stroke="#10b981" stroke-width="2"/>
    <text x="40" y="22" fill="#34d399" font-size="11" text-anchor="middle">IDLE (HIGH)</text>
    <!-- Start bit (LOW) -->
    <rect x="80" y="30" width="60" height="60" fill="rgba(239,68,68,0.15)" stroke="none"/>
    <line x1="80" y1="30" x2="80" y2="90" stroke="#f87171" stroke-width="1.5"/>
    <line x1="80" y1="90" x2="140" y2="90" stroke="#f87171" stroke-width="2"/>
    <text x="110" y="112" fill="#f87171" font-size="10" text-anchor="middle">START</text>
    <!-- 8 Data bits -->
    <line x1="140" y1="90" x2="140" y2="30" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="140" y1="30" x2="200" y2="30" stroke="#60a5fa" stroke-width="2"/>
    <text x="170" y="112" fill="#60a5fa" font-size="10" text-anchor="middle">b0</text>
    
    <line x1="200" y1="30" x2="200" y2="90" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="200" y1="90" x2="260" y2="90" stroke="#60a5fa" stroke-width="2"/>
    <text x="230" y="112" fill="#60a5fa" font-size="10" text-anchor="middle">b1</text>
    
    <line x1="260" y1="90" x2="260" y2="30" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="260" y1="30" x2="320" y2="30" stroke="#60a5fa" stroke-width="2"/>
    <text x="290" y="112" fill="#60a5fa" font-size="10" text-anchor="middle">b2</text>
    
    <line x1="320" y1="30" x2="320" y2="90" stroke="#60a5fa" stroke-width="1.5"/>
    <line x1="320" y1="90" x2="380" y2="90" stroke="#60a5fa" stroke-width="2"/>
    <text x="350" y="112" fill="#60a5fa" font-size="10" text-anchor="middle">b3 ... b7</text>
    <!-- Stop bit -->
    <line x1="460" y1="90" x2="460" y2="30" stroke="#10b981" stroke-width="1.5"/>
    <line x1="460" y1="30" x2="560" y2="30" stroke="#10b981" stroke-width="2"/>
    <text x="510" y="112" fill="#34d399" font-size="10" text-anchor="middle">STOP</text>
    <!-- Idle again -->
    <line x1="560" y1="30" x2="700" y2="30" stroke="#10b981" stroke-width="2"/>
    <text x="630" y="22" fill="#34d399" font-size="11" text-anchor="middle">IDLE</text>
    <!-- Labels -->
    <text x="380" y="112" fill="#60a5fa" font-size="10" text-anchor="middle">...</text>
    <line x1="380" y1="30" x2="460" y2="30" stroke="#60a5fa" stroke-width="2"/>
</svg>
</div>

<h4>Common UART Baud Rates</h4>
<p>Standard baud rates: 9600, 19200, 38400, 57600, <strong>115200</strong> (most common), 230400, 460800, 921600, 1000000. Both sides must match exactly (tolerance: ±2%).</p>

<h4>UART in Robotics</h4>
<ul>
<li><strong>Debug output:</strong> <code>Serial.println()</code> — essential for debugging without a hardware debugger</li>
<li><strong>GPS modules:</strong> Output NMEA sentences at 9600 baud by default</li>
<li><strong>LIDAR (UART type):</strong> TFmini, A1M8 RPLiDAR use UART</li>
<li><strong>Robotic arm controllers:</strong> Dynamixel servos use modified UART (half-duplex)</li>
<li><strong>Computer↔MCU:</strong> Raspberry Pi ↔ Arduino communication</li>
</ul>
`
                },
                {
                    id: 'i2c',
                    title: 'I²C',
                    content: `
<h3>I²C (Inter-Integrated Circuit)</h3>
<p>I²C is a two-wire synchronous serial protocol (SDA = data, SCL = clock) that supports <strong>multiple devices on the same bus</strong> using 7-bit or 10-bit addresses. It's the dominant protocol for connecting sensors to microcontrollers in robotics — IMUs, barometers, OLED displays, and hundreds of other devices use I²C.</p>

<h4>I²C Characteristics</h4>
<table class="data-table">
<thead><tr><th>Feature</th><th>Standard Mode</th><th>Fast Mode</th><th>Fast+ Mode</th></tr></thead>
<tbody>
<tr><td>Max speed</td><td>100 kHz</td><td>400 kHz</td><td>1 MHz</td></tr>
<tr><td>Wires</td><td colspan="3">SDA (data) + SCL (clock) — both open-drain with pull-ups</td></tr>
<tr><td>Max devices</td><td colspan="3">112 (7-bit) or 1008 (10-bit) per bus</td></tr>
<tr><td>Max bus length</td><td colspan="3">~1m (depends on capacitance and pull-up strength)</td></tr>
</tbody>
</table>

<h4>I²C Transaction Structure</h4>
<p>Every I²C transaction: <code>START → [7-bit address + R/W bit] → ACK → [data bytes] → STOP</code></p>

<h4>I²C Pull-up Resistors</h4>
<div class="info-card highlight">
<h4>Pull-up Resistor Selection</h4>
<p>I²C requires pull-up resistors on both SDA and SCL (both lines are open-drain — they can only pull low; the resistor pulls them high). Value depends on bus capacitance and desired speed:</p>
<ul style="margin-top:6px">
<li>100 kHz (standard): 10kΩ pull-ups</li>
<li>400 kHz (fast mode): 4.7kΩ pull-ups</li>
<li>1 MHz (fast+): 1–2kΩ pull-ups (need strong drive capability)</li>
</ul>
<p style="margin-top:6px">Many sensor breakout boards include pull-ups. If you have multiple boards on the same bus, their pull-ups may be too strong (multiple resistors in parallel → too low effective resistance). Remove pull-ups from all but one board.</p>
</div>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — I²C Scanner & MPU6050</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;Wire.h&gt;
#include &lt;MPU6050.h&gt;

MPU6050 imu;

void scanI2C() {
    for (byte addr = 8; addr < 127; addr++) {
        Wire.beginTransmission(addr);
        if (Wire.endTransmission() == 0) {
            Serial.print("Found device at 0x");
            Serial.println(addr, HEX);
        }
    }
}

void setup() {
    Serial.begin(115200);
    Wire.begin();  // SDA=A4, SCL=A5 on Uno
    Wire.setClock(400000);  // 400kHz fast mode
    
    scanI2C();    // Find all I²C devices
    
    imu.initialize();
    if (!imu.testConnection()) {
        Serial.println("MPU6050 connection failed!");
    }
}

void loop() {
    int16_t ax, ay, az, gx, gy, gz;
    imu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
    
    // Convert to physical units
    float accel_x = ax / 16384.0;  // ±2g range → 16384 LSB/g
    float gyro_x  = gx / 131.0;   // ±250°/s range → 131 LSB/(°/s)
    
    Serial.printf("AX:%.2f AY:%.2f AZ:%.2f GX:%.2f\n",
                  ax/16384.0, ay/16384.0, az/16384.0, gyro_x);
    delay(10);
}</code></pre>
</div>
`
                },
                {
                    id: 'spi',
                    title: 'SPI',
                    content: `
<h3>SPI (Serial Peripheral Interface)</h3>
<p>SPI is a four-wire synchronous protocol: <strong>MOSI</strong> (Master Out Slave In), <strong>MISO</strong> (Master In Slave Out), <strong>SCLK</strong> (clock), and <strong>CS/SS</strong> (Chip Select, one per device). It's faster than I²C (up to 80 MHz+) but requires more wires. Used for high-speed sensors, SD cards, displays, and radio modules.</p>

<h4>SPI vs I²C</h4>
<table class="data-table">
<thead><tr><th>Feature</th><th>SPI</th><th>I²C</th></tr></thead>
<tbody>
<tr><td>Speed</td><td>Up to 80 MHz (full duplex)</td><td>Up to 1 MHz</td></tr>
<tr><td>Wires</td><td>4 (+ 1 CS per device)</td><td>2 (any number of devices)</td></tr>
<tr><td>Multi-device</td><td>One CS pin per device</td><td>Shared bus, addressing</td></tr>
<tr><td>Duplex</td><td>Full duplex simultaneous TX+RX</td><td>Half duplex</td></tr>
<tr><td>Complexity</td><td>Simple protocol, no ACK</td><td>More complex, built-in ACK</td></tr>
<tr><td>Best for</td><td>SD cards, displays, IMUs needing speed</td><td>Sensors, EEPROMs, most ICs</td></tr>
</tbody>
</table>

<h4>SPI Modes (Clock Polarity and Phase)</h4>
<p>SPI has 4 modes depending on clock idle state (CPOL) and data sampling edge (CPHA). Check your device's datasheet — most sensors specify which mode they use.</p>
<table class="data-table">
<thead><tr><th>Mode</th><th>CPOL</th><th>CPHA</th><th>Clock idle</th><th>Sample on</th></tr></thead>
<tbody>
<tr><td><strong>Mode 0</strong></td><td>0</td><td>0</td><td>LOW</td><td>Rising edge</td></tr>
<tr><td><strong>Mode 1</strong></td><td>0</td><td>1</td><td>LOW</td><td>Falling edge</td></tr>
<tr><td><strong>Mode 2</strong></td><td>1</td><td>0</td><td>HIGH</td><td>Falling edge</td></tr>
<tr><td><strong>Mode 3</strong></td><td>1</td><td>1</td><td>HIGH</td><td>Rising edge</td></tr>
</tbody>
</table>

<div class="code-block">
<div class="code-header"><span class="code-lang">Arduino — SPI IMU (ICM-20948)</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;SPI.h&gt;
#define CS_PIN 10

void spiWrite(uint8_t reg, uint8_t value) {
    SPI.beginTransaction(SPISettings(7000000, MSBFIRST, SPI_MODE0));
    digitalWrite(CS_PIN, LOW);
    SPI.transfer(reg & 0x7F);  // Write: MSB=0
    SPI.transfer(value);
    digitalWrite(CS_PIN, HIGH);
    SPI.endTransaction();
}

uint8_t spiRead(uint8_t reg) {
    uint8_t value;
    SPI.beginTransaction(SPISettings(7000000, MSBFIRST, SPI_MODE0));
    digitalWrite(CS_PIN, LOW);
    SPI.transfer(reg | 0x80);  // Read: MSB=1
    value = SPI.transfer(0x00);
    digitalWrite(CS_PIN, HIGH);
    SPI.endTransaction();
    return value;
}</code></pre>
</div>
`
                },
                {
                    id: 'can-bus',
                    title: 'CAN Bus',
                    content: `
<h3>CAN Bus (Controller Area Network)</h3>
<p>CAN is a robust, multi-master serial protocol originally developed for automotive applications. It uses differential signaling (CAN_H and CAN_L) for excellent noise immunity. CAN is the standard in <strong>industrial and professional robotics</strong>, used by Dynamixel PRO servos, robotic arm joints, drone ESCs (DroneCAN/UAVCAN), and industrial motor drives.</p>

<h4>CAN Bus Advantages</h4>
<ul>
<li><strong>Noise immunity</strong> — Differential signaling withstands automotive/industrial electrical noise</li>
<li><strong>Multi-master</strong> — Any node can transmit without a master coordinator</li>
<li><strong>Arbitration</strong> — Lower message ID wins bus access automatically (hardware arbitration)</li>
<li><strong>Error detection</strong> — Built-in CRC, acknowledgment, error counters, bus-off recovery</li>
<li><strong>Speeds</strong> — 125 kbps to 1 Mbps (Classic CAN), up to 5 Mbps (CAN FD)</li>
<li><strong>Distance</strong> — 40m at 1 Mbps, 500m at 125 kbps</li>
</ul>

<h4>CAN in Robotics</h4>
<div class="card-grid">
<div class="info-card">
<h4>Robotic Arms</h4>
<p>Joint motors, encoders, and force sensors connected on a single CAN bus. Deterministic message timing ensures coordinated motion.</p>
</div>
<div class="info-card">
<h4>DroneCAN (UAVCAN)</h4>
<p>Drone ESC, GPS, airspeed, battery monitor — all on one CAN bus. Plug-and-play device discovery, firmware updates over CAN.</p>
</div>
<div class="info-card">
<h4>AMRs (Autonomous Mobile Robots)</h4>
<p>Wheel motors, LiDAR, safety PLCs connected via CAN. Deterministic latency for safety-critical stop commands.</p>
</div>
</div>
`
                },
                {
                    id: 'mqtt',
                    title: 'MQTT & Wireless',
                    content: `
<h3>MQTT and Wireless Protocols</h3>
<p>For connected robots and IoT sensor networks, high-level wireless protocols abstract away the physical layer.</p>

<h4>MQTT (Message Queuing Telemetry Transport)</h4>
<p>MQTT is a lightweight publish-subscribe messaging protocol designed for constrained devices. An ESP32 robot can publish sensor data and subscribe to control commands via a central <strong>broker</strong> (typically Mosquitto).</p>

<div class="code-block">
<div class="code-header"><span class="code-lang">ESP32 — MQTT Robot Control</span><button class="code-copy">Copy</button></div>
<pre><code>#include &lt;WiFi.h&gt;
#include &lt;PubSubClient.h&gt;

const char* broker = "192.168.1.100";
WiFiClient wifiClient;
PubSubClient mqtt(wifiClient);

void onMessage(char* topic, byte* payload, unsigned int len) {
    String msg = String((char*)payload).substring(0, len);
    
    if (String(topic) == "robot/cmd") {
        // Parse JSON: {"speed": 50, "turn": 0}
        // Drive motors accordingly
        Serial.println("Command: " + msg);
    }
}

void setup() {
    WiFi.begin("ssid", "pass");
    while (WiFi.status() != WL_CONNECTED) delay(500);
    
    mqtt.setServer(broker, 1883);
    mqtt.setCallback(onMessage);
    mqtt.connect("robot001");
    mqtt.subscribe("robot/cmd");
}

void loop() {
    mqtt.loop();
    // Publish sensor data every 100ms
    mqtt.publish("robot/sensors", getSensorJSON().c_str());
    delay(100);
}</code></pre>
</div>

<h4>Wireless Protocol Comparison</h4>
<table class="data-table">
<thead><tr><th>Protocol</th><th>Range</th><th>Data Rate</th><th>Power</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><strong>WiFi 802.11n</strong></td><td>50–100m</td><td>150 Mbps</td><td>High</td><td>Video streaming, web control, ROS</td></tr>
<tr><td><strong>Bluetooth Classic</strong></td><td>10m</td><td>3 Mbps</td><td>Medium</td><td>Gamepad control, audio</td></tr>
<tr><td><strong>BLE 5.0</strong></td><td>100m (LR)</td><td>2 Mbps</td><td>Low</td><td>Sensor beacons, iOS apps</td></tr>
<tr><td><strong>Zigbee</strong></td><td>100m</td><td>250 kbps</td><td>Very Low</td><td>Sensor mesh networks</td></tr>
<tr><td><strong>LoRa</strong></td><td>2–15 km</td><td>0.3–50 kbps</td><td>Very Low</td><td>Long-range outdoor robots</td></tr>
</tbody>
</table>
`
                }
            ]
        }
    ]
};
