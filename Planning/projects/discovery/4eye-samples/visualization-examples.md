# HTML/SVG/CSS Visualization Examples

This document contains concrete code examples for the visualization types defined in the 4eye validation system.

---

## 1. Animated Timeline (History)

```html
<div class="timeline-container">
  <div class="timeline-line"></div>
  
  <div class="timeline-event" style="left: 10%;">
    <div class="event-marker"></div>
    <div class="event-content">
      <strong>1776</strong>
      <p>American Revolution</p>
    </div>
  </div>
  
  <div class="timeline-event" style="left: 35%;">
    <div class="event-marker"></div>
    <div class="event-content">
      <strong>1789</strong>
      <p>French Revolution</p>
    </div>
  </div>
  
  <div class="timeline-event" style="left: 70%;">
    <div class="event-marker"></div>
    <div class="event-content">
      <strong>1865</strong>
      <p>Civil War Ends</p>
    </div>
  </div>
</div>

<style>
.timeline-container {
  position: relative;
  height: 150px;
  padding: 40px 20px;
}

.timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border-radius: 2px;
  animation: drawLine 2s ease-out forwards;
  transform-origin: left;
}

@keyframes drawLine {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.timeline-event {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.timeline-event:nth-child(2) { animation-delay: 0.5s; }
.timeline-event:nth-child(3) { animation-delay: 1s; }
.timeline-event:nth-child(4) { animation-delay: 1.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateY(0);
  }
}

.event-marker {
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 4px solid #3b82f6;
  border-radius: 50%;
  margin: 0 auto 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.event-marker:hover {
  transform: scale(1.3);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}

.event-content {
  text-align: center;
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 120px;
}

.event-content strong {
  display: block;
  font-size: 18px;
  color: #1e40af;
  margin-bottom: 5px;
}

.event-content p {
  margin: 0;
  font-size: 14px;
  color: #64748b;
}
</style>
```

**Use Case**: Showing sequence of historical events with progressive reveal as teacher discusses each period.

---

## 2. Interactive Flow Chart (Problem Solving)

```html
<svg viewBox="0 0 800 600" class="flowchart">
  <!-- Start -->
  <g class="node" data-step="1">
    <rect x="325" y="20" width="150" height="60" rx="30" fill="#10b981" />
    <text x="400" y="55" text-anchor="middle" fill="white">Start</text>
  </g>
  
  <!-- Arrow -->
  <path class="arrow" d="M 400 80 L 400 130" stroke="#64748b" stroke-width="3" 
        marker-end="url(#arrowhead)" />
  
  <!-- Decision -->
  <g class="node" data-step="2">
    <path d="M 400 130 L 500 180 L 400 230 L 300 180 Z" fill="#f59e0b" />
    <text x="400" y="185" text-anchor="middle" fill="white">Is x > 0?</text>
  </g>
  
  <!-- Yes path -->
  <path class="arrow" d="M 500 180 L 600 180 L 600 280" stroke="#64748b" stroke-width="3" 
        marker-end="url(#arrowhead)" />
  <text x="550" y="175" fill="#64748b">Yes</text>
  
  <g class="node" data-step="3">
    <rect x="525" y="280" width="150" height="60" rx="10" fill="#3b82f6" />
    <text x="600" y="315" text-anchor="middle" fill="white">Add x to sum</text>
  </g>
  
  <!-- No path -->
  <path class="arrow" d="M 300 180 L 200 180 L 200 280" stroke="#64748b" stroke-width="3" 
        marker-end="url(#arrowhead)" />
  <text x="250" y="175" fill="#64748b">No</text>
  
  <g class="node" data-step="3">
    <rect x="125" y="280" width="150" height="60" rx="10" fill="#3b82f6" />
    <text x="200" y="315" text-anchor="middle" fill="white">Use absolute value</text>
  </g>
  
  <!-- Arrow definitions -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b" />
    </marker>
  </defs>
</svg>

<style>
.flowchart {
  max-width: 800px;
  margin: 0 auto;
}

.node {
  cursor: pointer;
  opacity: 0;
  animation: nodeAppear 0.5s ease-out forwards;
}

.node[data-step="1"] { animation-delay: 0s; }
.node[data-step="2"] { animation-delay: 0.5s; }
.node[data-step="3"] { animation-delay: 1s; }

@keyframes nodeAppear {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.node:hover rect,
.node:hover path {
  filter: brightness(1.2);
  transform: scale(1.05);
  transition: all 0.3s ease;
}

.node.active rect,
.node.active path {
  filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.8));
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.8)); }
  50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 1)); }
}

.arrow {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawArrow 1s ease-out forwards;
}

@keyframes drawArrow {
  to { stroke-dashoffset: 0; }
}

text {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 500;
  pointer-events: none;
}
</style>

<script>
// Highlight current step in flow
const nodes = document.querySelectorAll('.node');
nodes.forEach((node, index) => {
  node.addEventListener('click', () => {
    nodes.forEach(n => n.classList.remove('active'));
    node.classList.add('active');
  });
});
</script>
```

**Use Case**: Step-by-step algorithm or math problem solving with decision branches.

---

## 3. Concept Map (Mind Map)

```html
<svg viewBox="0 0 1000 700" class="concept-map">
  <!-- Central concept -->
  <g class="central-node">
    <circle cx="500" cy="350" r="80" fill="#8b5cf6" />
    <text x="500" y="350" text-anchor="middle" fill="white" font-size="18" font-weight="bold">
      <tspan x="500" dy="-5">Photosynthesis</tspan>
    </text>
  </g>
  
  <!-- Branch 1: Light -->
  <g class="branch" data-delay="0.3">
    <line x1="500" y1="350" x2="300" y2="200" class="connection" stroke="#cbd5e1" stroke-width="3"/>
    <circle cx="300" cy="200" r="60" fill="#10b981" />
    <text x="300" y="200" text-anchor="middle" fill="white" font-size="14" font-weight="600">
      <tspan x="300" dy="-5">Light</tspan>
      <tspan x="300" dy="20">Energy</tspan>
    </text>
  </g>
  
  <!-- Sub-branch 1a -->
  <g class="sub-branch" data-delay="0.6">
    <line x1="300" y1="200" x2="150" y2="100" class="connection" stroke="#cbd5e1" stroke-width="2"/>
    <circle cx="150" cy="100" r="45" fill="#34d399" />
    <text x="150" y="105" text-anchor="middle" fill="white" font-size="12">Sunlight</text>
  </g>
  
  <!-- Branch 2: Water -->
  <g class="branch" data-delay="0.4">
    <line x1="500" y1="350" x2="700" y2="200" class="connection" stroke="#cbd5e1" stroke-width="3"/>
    <circle cx="700" cy="200" r="60" fill="#3b82f6" />
    <text x="700" y="200" text-anchor="middle" fill="white" font-size="14" font-weight="600">
      <tspan x="700" dy="-5">Water</tspan>
      <tspan x="700" dy="20">(H₂O)</tspan>
    </text>
  </g>
  
  <!-- Branch 3: CO2 -->
  <g class="branch" data-delay="0.5">
    <line x1="500" y1="350" x2="300" y2="500" class="connection" stroke="#cbd5e1" stroke-width="3"/>
    <circle cx="300" cy="500" r="60" fill="#f59e0b" />
    <text x="300" y="500" text-anchor="middle" fill="white" font-size="14" font-weight="600">
      <tspan x="300" dy="-5">Carbon</tspan>
      <tspan x="300" dy="20">Dioxide</tspan>
    </text>
  </g>
  
  <!-- Branch 4: Output -->
  <g class="branch" data-delay="0.6">
    <line x1="500" y1="350" x2="700" y2="500" class="connection" stroke="#cbd5e1" stroke-width="3"/>
    <circle cx="700" cy="500" r="60" fill="#ef4444" />
    <text x="700" y="500" text-anchor="middle" fill="white" font-size="14" font-weight="600">
      <tspan x="700" dy="-5">Glucose +</tspan>
      <tspan x="700" dy="20">Oxygen</tspan>
    </text>
  </g>
</svg>

<style>
.concept-map {
  max-width: 1000px;
  margin: 0 auto;
}

.central-node {
  animation: scaleIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.branch, .sub-branch {
  opacity: 0;
  animation: branchGrow 0.6s ease-out forwards;
}

.branch[data-delay="0.3"] { animation-delay: 0.3s; }
.branch[data-delay="0.4"] { animation-delay: 0.4s; }
.branch[data-delay="0.5"] { animation-delay: 0.5s; }
.branch[data-delay="0.6"] { animation-delay: 0.6s; }
.sub-branch[data-delay="0.6"] { animation-delay: 0.6s; }

@keyframes branchGrow {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.connection {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: drawLine 0.8s ease-out forwards;
}

@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}

.branch:hover circle,
.sub-branch:hover circle {
  filter: brightness(1.2) drop-shadow(0 0 15px currentColor);
  transform: scale(1.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.central-node circle {
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6));
  animation: centralPulse 2s ease-in-out infinite;
}

@keyframes centralPulse {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.6)); }
  50% { filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.9)); }
}

text {
  font-family: system-ui, -apple-system, sans-serif;
  pointer-events: none;
}
</style>
```

**Use Case**: Showing interconnected concepts in science, branching from central idea.

---

## 4. Animated Bar Chart Race (Data Comparison)

```html
<div class="chart-container">
  <h3>Population Growth Over Time</h3>
  <div class="year-display">Year: <span id="currentYear">1800</span></div>
  
  <div class="bars">
    <div class="bar-row" data-country="China">
      <span class="label">China</span>
      <div class="bar-wrapper">
        <div class="bar" style="--color: #ef4444" data-value="330"></div>
        <span class="value">330M</span>
      </div>
    </div>
    
    <div class="bar-row" data-country="India">
      <span class="label">India</span>
      <div class="bar-wrapper">
        <div class="bar" style="--color: #f59e0b" data-value="200"></div>
        <span class="value">200M</span>
      </div>
    </div>
    
    <div class="bar-row" data-country="Europe">
      <span class="label">Europe</span>
      <div class="bar-wrapper">
        <div class="bar" style="--color: #10b981" data-value="195"></div>
        <span class="value">195M</span>
      </div>
    </div>
    
    <div class="bar-row" data-country="USA">
      <span class="label">USA</span>
      <div class="bar-wrapper">
        <div class="bar" style="--color: #3b82f6" data-value="5"></div>
        <span class="value">5M</span>
      </div>
    </div>
  </div>
  
  <button onclick="animateChart()">▶️ Play Animation</button>
</div>

<style>
.chart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background: #f8fafc;
  border-radius: 12px;
}

h3 {
  text-align: center;
  color: #1e293b;
  margin-bottom: 10px;
}

.year-display {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 30px;
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.bar-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  gap: 15px;
  transition: order 0.5s ease;
}

.label {
  font-weight: 600;
  color: #475569;
  text-align: right;
}

.bar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.bar {
  height: 40px;
  background: var(--color);
  border-radius: 6px;
  width: 0%;
  transition: width 1s ease, background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  animation: growBar 1.5s ease-out forwards;
}

@keyframes growBar {
  from { width: 0%; }
  to { width: calc(var(--value) / 15); } /* Scale factor for display */
}

.value {
  font-weight: 600;
  color: #64748b;
  min-width: 60px;
  opacity: 0;
  animation: fadeIn 0.5s ease-out 1s forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

button {
  margin-top: 20px;
  padding: 12px 30px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

button:hover {
  background: #2563eb;
  transform: scale(1.05);
}
</style>

<script>
function animateChart() {
  // Simulate data changes over time
  const data = {
    1800: { China: 330, India: 200, Europe: 195, USA: 5 },
    1900: { China: 400, India: 285, Europe: 408, USA: 76 },
    2000: { China: 1270, India: 1053, Europe: 727, USA: 282 },
    2020: { China: 1439, India: 1380, Europe: 747, USA: 331 }
  };
  
  const years = Object.keys(data);
  let currentIndex = 0;
  
  const interval = setInterval(() => {
    if (currentIndex >= years.length) {
      clearInterval(interval);
      return;
    }
    
    const year = years[currentIndex];
    document.getElementById('currentYear').textContent = year;
    
    const yearData = data[year];
    const sorted = Object.entries(yearData).sort((a, b) => b[1] - a[1]);
    
    sorted.forEach(([country, value], index) => {
      const row = document.querySelector(`[data-country="${country}"]`);
      const bar = row.querySelector('.bar');
      const valueSpan = row.querySelector('.value');
      
      row.style.order = index;
      bar.style.width = `${(value / 15)}%`;
      bar.style.setProperty('--value', value);
      valueSpan.textContent = `${value}M`;
    });
    
    currentIndex++;
  }, 2000);
}

// Auto-start animation
setTimeout(animateChart, 1000);
</script>
```

**Use Case**: Showing comparative data over time, rankings, population growth, economic data.

---

## 5. Interactive Slider Control (Physics/Math)

```html
<div class="slider-demo">
  <h3>Force and Acceleration Demo</h3>
  <p>Adjust the force to see how it affects acceleration (F = ma)</p>
  
  <div class="controls">
    <div class="control-group">
      <label>Force (N): <span id="forceValue">10</span></label>
      <input type="range" id="force" min="0" max="50" value="10" step="1">
    </div>
    
    <div class="control-group">
      <label>Mass (kg): <span id="massValue">2</span></label>
      <input type="range" id="mass" min="1" max="10" value="2" step="0.5">
    </div>
  </div>
  
  <div class="visualization">
    <div class="object" id="movingObject">
      <div class="force-arrow" id="forceArrow"></div>
      📦
    </div>
    <div class="result">
      <strong>Acceleration: <span id="acceleration">5.0</span> m/s²</strong>
    </div>
  </div>
  
  <div class="equation">
    <code>a = F / m = <span id="calcForce">10</span> / <span id="calcMass">2</span> = <span id="calcAccel">5.0</span> m/s²</code>
  </div>
</div>

<style>
.slider-demo {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

h3 {
  margin-top: 0;
  text-align: center;
}

p {
  text-align: center;
  opacity: 0.9;
}

.controls {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
}

.control-group {
  margin-bottom: 20px;
}

.control-group:last-child {
  margin-bottom: 0;
}

label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-weight: 600;
}

input[type="range"] {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: transform 0.2s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.visualization {
  background: rgba(255, 255, 255, 0.95);
  height: 200px;
  border-radius: 12px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
}

.object {
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  font-size: 48px;
  transition: left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

.force-arrow {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  background: #ef4444;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.force-arrow::after {
  content: '▶';
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  color: #ef4444;
  font-size: 20px;
}

.result {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 18px;
}

.equation {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  backdrop-filter: blur(10px);
}

code {
  font-size: 18px;
  font-family: 'Monaco', 'Courier New', monospace;
  color: #fbbf24;
}
</style>

<script>
const forceInput = document.getElementById('force');
const massInput = document.getElementById('mass');
const forceValue = document.getElementById('forceValue');
const massValue = document.getElementById('massValue');
const acceleration = document.getElementById('acceleration');
const movingObject = document.getElementById('movingObject');
const forceArrow = document.getElementById('forceArrow');
const calcForce = document.getElementById('calcForce');
const calcMass = document.getElementById('calcMass');
const calcAccel = document.getElementById('calcAccel');

function updateCalculation() {
  const f = parseFloat(forceInput.value);
  const m = parseFloat(massInput.value);
  const a = (f / m).toFixed(1);
  
  forceValue.textContent = f;
  massValue.textContent = m;
  acceleration.textContent = a;
  calcForce.textContent = f;
  calcMass.textContent = m;
  calcAccel.textContent = a;
  
  // Visual feedback
  const maxDistance = 600;
  const distance = Math.min((a / 25) * maxDistance, maxDistance - 100);
  movingObject.style.left = `${50 + distance}px`;
  
  forceArrow.style.width = `${f * 3}px`;
}

forceInput.addEventListener('input', updateCalculation);
massInput.addEventListener('input', updateCalculation);

updateCalculation();
</script>
```

**Use Case**: Interactive physics/math demonstrations where students can manipulate variables and see immediate effects.

---

## 6. Layered Reveal (Anatomy/Earth Layers)

```html
<div class="layers-container">
  <h3>Earth's Layers</h3>
  <p>Click on layers to reveal what's beneath</p>
  
  <div class="earth">
    <div class="layer" data-layer="4" style="--color: #10b981">
      <span class="layer-label">Crust<br><small>0-100 km</small></span>
    </div>
    <div class="layer" data-layer="3" style="--color: #f59e0b">
      <span class="layer-label">Mantle<br><small>100-2900 km</small></span>
    </div>
    <div class="layer" data-layer="2" style="--color: #ef4444">
      <span class="layer-label">Outer Core<br><small>2900-5150 km</small></span>
    </div>
    <div class="layer" data-layer="1" style="--color: #dc2626">
      <span class="layer-label">Inner Core<br><small>5150-6371 km</small></span>
    </div>
  </div>
  
  <button onclick="resetLayers()">🔄 Reset</button>
</div>

<style>
.layers-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
}

h3 {
  color: #1e293b;
  margin-bottom: 10px;
}

.earth {
  width: 400px;
  height: 400px;
  margin: 30px auto;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}

.layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: var(--color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
}

.layer[data-layer="4"] { z-index: 4; }
.layer[data-layer="3"] { z-index: 3; transform: scale(0.75); }
.layer[data-layer="2"] { z-index: 2; transform: scale(0.5); }
.layer[data-layer="1"] { z-index: 1; transform: scale(0.25); }

.layer:hover {
  filter: brightness(1.1);
}

.layer.hidden {
  transform: scale(1.3) !important;
  opacity: 0;
  pointer-events: none;
}

.layer-label {
  color: white;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

@keyframes fadeIn {
  to { opacity: 1; }
}

.layer-label small {
  display: block;
  font-size: 12px;
  margin-top: 5px;
  opacity: 0.9;
}

button {
  margin-top: 20px;
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #2563eb;
  transform: scale(1.05);
}
</style>

<script>
const layers = document.querySelectorAll('.layer');

layers.forEach(layer => {
  layer.addEventListener('click', () => {
    layer.classList.add('hidden');
  });
});

function resetLayers() {
  layers.forEach(layer => {
    layer.classList.remove('hidden');
  });
}
</script>
```

**Use Case**: Peeling back layers to show internal structure - earth, human body, onion-style concepts.

---

## Summary

These examples demonstrate:
- **Progressive reveal** animations (timeline, flowchart)
- **Interactive controls** (sliders, buttons)
- **Data visualization** (bar charts, comparisons)
- **Spatial relationships** (concept maps, layers)
- **Real-time feedback** (calculations, visual updates)
- **Hover effects** and click interactions
- **Responsive design** principles
- **Accessibility** considerations (reduced motion, alt text)

All can be generated dynamically by AI based on lesson content, with customizable colors, speeds, and interaction patterns!
