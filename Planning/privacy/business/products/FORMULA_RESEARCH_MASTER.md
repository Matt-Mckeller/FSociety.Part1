# Password Enclosure Project: Formula Research Master Document

**Status:** ✅ COMPLETE - All 8 categories researched with formulas, properties, and plain English descriptions  
**Purpose:** Complete inventory of all required properties for TypeScript type system design  
**User Guidance:** "spend time on it, get it right, think about it, make sure we are using the right formulas this is really important"

---

## 1. MAGNETIC FORCE FORMULAS

**When to use:** Calculating how strongly magnets attract/repel at various distances. Essential for determining if blocks will stay together under load.

**Plain English:** "How hard do the magnets pull on each other?" Answers questions like: Will 8 corner magnets hold a 12"×12" block to the ceiling? How much force before blocks separate?

**Practical example:** If someone tries to pull a block off the ceiling, will the magnetic force exceed the pulling force?

**DECISION TREE: Which magnetic force formula do I use?**

```
START → What magnet shape do I have?

├─ Block/Rectangular magnets touching or very close (< 1mm gap)?
│  └─ Use 1.2: Between Two Magnetized Surfaces
│     Formula: F = B²A/(2μ₀)
│     Need: Surface field B, contact area A
│
├─ Block/Bar magnets with larger gaps (> 1mm, distance >> size)?
│  └─ Use 1.3: Between Two Bar Magnets
│     Formula: F ≃ [B₀²A²(L²+R²)]/(πμ₀L²) × [1/x² + 1/(x+2L)² - 2/(x+L)²]
│     Need: Pole area A, length L, radius R, separation x
│
├─ Cylindrical/Disc magnets aligned on same axis?
│  └─ Use 1.4: Between Two Coaxial Cylindrical Magnets
│     Formula: F(x) ≃ (πKdR⁴)/2 × [1/x² + 1/(x+2L)² - 2/(x+L)²]
│     Need: Radius R, length L, energy product Kd, separation x
│
├─ Sphere/Ball magnets?
│  ├─ Close together (touching or < 1 diameter apart)?
│  │  └─ Use measured pull force from manufacturer
│  │     Note: Complex field geometry, difficult to calculate accurately
│  │
│  └─ Far apart (> 3 diameters)?
│     └─ Use 1.5: Treat as point dipole
│        Formula: F ∝ 1/r⁴
│        Need: Magnetic moment m = (4π/3)r³M, distance r
│
├─ Ring/Toroid magnets?
│  ├─ Axially magnetized (poles on flat faces)?
│  │  └─ Use 1.4: Similar to cylinder, adjust area for ring
│  │     Effective area = π(Ro² - Ri²)
│  │
│  └─ Diametrically magnetized (poles on opposite sides)?
│     └─ Use multipole expansion or FEA (complex)
│        Or use manufacturer pull force spec
│
├─ Horseshoe/U-shaped magnets?
│  └─ Use measured gap field strength directly
│     Formula: F = B_gap²A/(2μ₀)
│     Need: Gap field B_gap (measure with gaussmeter), pole area A
│     Note: Calculation from geometry unreliable due to field concentration
│
├─ Arc/Segment magnets (motor/generator pieces)?
│  └─ Use FEA software or manufacturer data
│     Hand calculation impractical for most geometries
│     Need: Arc angle, magnetization direction, segment count
│
├─ Halbach Array (engineered field pattern)?
│  └─ Sum contributions from all segments
│     Requires: Array geometry, rotation angles, segment properties
│     Or use manufacturer field map data
│
├─ Flexible sheet magnets?
│  └─ Use manufacturer pull force rating ONLY
│     Formulas not applicable (multi-pole, weak field, complex geometry)
│     Typical: 1-5 PSI pull force
│
├─ Small magnets at large distances (distance >> magnet size)?
│  └─ Use 1.5: Magnetic Dipole-Dipole Interaction
│     Formula: F ∝ 1/r⁴ (for aligned dipoles)
│     Need: Magnetic moment m, distance r
│     Valid for ANY shape at large distance
│
└─ Don't know magnet properties, only have manufacturer spec?
   └─ Use manufacturer pull force rating directly
      Adjust for: gap distance (force drops rapidly with gap)
                  misalignment (reduces force)
                  intervening materials (reduces force)
```

**EXAMPLES:**
- **Your B338 Neodymium magnets (3/16"×3/16"×1/2")** → Rectangular blocks, touching contact → Use Formula 1.2
- **Two disc magnets 1 inch apart** → Cylindrical, aligned axis, moderate gap → Use Formula 1.4
- **Magnet on steel sheet 5 feet away** → Large distance >> size → Use Formula 1.5 (dipole)

---

### 1.1 Between Magnetic Poles (Point Charges)
**Formula:**
```
F = (μ * qm1 * qm2) / (4π * r²)
```

**Required Properties:**
- `qm1`, `qm2`: Magnetic charge on poles (ampere-meter)
- `μ`: Permeability of intervening medium (tesla·meter/ampere, henry/meter, newton/ampere²)
- `r`: Separation distance (meter)
- `F`: Force (newton)

---

### 1.2 Between Two Magnetized Surfaces
**Formula:**
```
F = (μ₀ * H² * A) / 2 = (B² * A) / (2μ₀)
```

**Required Properties:**
- `A`: Surface area (m²)
- `H`: Magnetizing field strength (A/m)
- `B`: Flux density (tesla)
- `μ₀`: Permeability of free space = 4π×10⁻⁷ T·m/A

**Applicability:** Valid only when:
- Fringing effect negligible
- Air gap volume << magnetized material volume

---

### 1.3 Between Two Bar Magnets (End-to-End, x ≫ R)
**Formula:**
```
F ≃ [B₀² * A² * (L² + R²)] / (π * μ₀ * L²) * 
    [1/x² + 1/(x+2L)² - 2/(x+L)²]

Where: B₀ = (μ₀/2) * M
```

**Required Properties:**
- `B₀`: Flux density near pole (tesla)
- `A`: Pole area (m²)
- `L`: Magnet length (m)
- `R`: Magnet radius (m)
- `x`: Separation distance (m)
- `M`: Magnetization (A/m)

**Limitations:** Assumes point-like magnetic charge distributions; good approximation at relatively great distances only.

---

### 1.4 Between Two Coaxial Cylindrical Magnets
**General Formula (for offset positions):**
```
F(x,r) ≃ (π * Kd * R⁴) / 2 * 
         Σ(i,j=0 to 1) [(-1)^(i+j) / (x + i*L1 + j*L2)² * 
         (1 - 3r² / (2(x + i*L1 + j*L2)²))]
```

**Aligned Dipoles (Analytical with Elliptic Integrals):**
```
F(x) ≃ (π * Kd * R⁴) / 2 * [1/x² + 1/(x+2L)² - 2/(x+L)²]

Or equivalently:
F(x) ≃ (π * μ₀ * M² * R⁴) / 4 * [1/x² + 1/(x+2L)² - 2/(x+L)²]
```

**Long Magnet Approximation (L ≫ R):**
```
B₀ = (μ₀/2) * M
```

**Required Properties:**
- `R`: Cylinder radius (m) — assumes equal radii for both magnets
- `L`, `L1`, `L2`: Cylinder length(s) (m)
- `Kd`: Maximum energy product (J/m³)
- `M`: Magnetization (A/m)
- `x`: Normal distance between parallel faces (m)
- `r`: Lateral distance between magnetic dipole axes (m)
- `V`: Volume = π*R²*L (m³)
- `m`: Effective magnetic dipole moment = M*V (A·m²)

**Point Dipole Approximation (L ≪ x):**
```
F(x) = (3 * μ₀ * M² * R⁴ * L²) / (2π * x⁴)
      = (3 * μ₀ * m1 * m2) / (2π * x⁴)
```

**Important Note:** Results erroneous for small x (force becomes very large near zero distance).

---

### 1.5 Magnetic Dipole–Dipole Interaction
**Magnetic Field of Dipole:**
```
B(m,r) = (μ₀/4π) * (1/r³) * [3(m·r̂)r̂ - m] + (2μ₀/3) * m * δ³(r)
```

**Simplified for coordinate system centered on m1 (x-axis aligned):**
```
Bx(r) = (μ₀/4π) * m1 * (3cos²θ - 1) / r³
By(r) = (μ₀/4π) * m1 * (3cosθ sinθ) / r³
```

**Force Between Two Dipoles (Vector Notation):**
```
F(r,m1,m2) = (3μ₀/4π) * (1/r⁵) * 
             [(m1·r)m2 + (m2·r)m1 + (m1·m2)r - 
              5(m1·r)(m2·r)r / r²]
```

**Special Case: Both Dipoles Aligned on z-axis:**
```
F(z,m1,m2) = -(3μ₀ * m1 * m2) / (2π * z⁴)    (z-direction)
```

**Global Coordinate System (Polar Components):**
```
Fr(r,α,β) = -(3μ₀/4π) * (m2*m1/r⁴) * 
            [2cos(φ-α)cos(φ-β) - sin(φ-α)sin(φ-β)]

Fφ(r,α,β) = -(3μ₀/4π) * (m2*m1/r⁴) * sin(2φ-α-β)
```

**Required Properties:**
- `m`, `m1`, `m2`: Magnetic dipole moment(s) (A·m²)
- `r`: Position vector from dipole 1 to dipole 2 (m)
- `r`: Distance = ‖r‖ (m)
- `r̂`: Unit vector = r/r (dimensionless)
- `θ`, `φ`, `α`, `β`: Angles in various coordinate systems (radians)
- `μ₀`: Permeability of free space = 4π×10⁻⁷ T·m/A
- `δ³`: Three-dimensional Dirac delta function

**Key Insight:** Dipole field strength falls off as 1/r³. Dipole-dipole force falls off as 1/r⁴ (for point dipoles at large distances).

---

### 1.6 Magnet Shape Considerations
Different magnet geometries require different property sets and force calculation approaches:

| Geometry | Key Properties Needed | Force Calculation Approach | Common Uses |
|----------|----------------------|---------------------------|-------------|
| **Rectangular/Block** | `surfaceField` (Gauss/Tesla), dimensions (length, width, height), pole area | Use Formula 1.2 (magnetized surfaces) or 1.3 (bar magnets at distance) | Your B338 corner magnets, fridge magnets, structural connections |
| **Cylindrical/Disc** | `magneticMoment` (A·m²), radius, length | Use Formula 1.4 (coaxial cylindrical) or 1.5 (dipole at distance) | Sensors, motors, speakers, medical implants |
| **Spherical/Ball** | `magneticMoment` (A·m²), radius, `demagnetizingFactor` Nd=1/3 | Use Formula 1.5 (dipole-dipole), Nd affects internal field | Toys (Buckyballs), compasses, bearings, scientific instruments |
| **Ring/Toroid** | Inner radius Ri, outer radius Ro, thickness, pole orientation (axial/diametral) | Depends on magnetization: axial → cylinder formula, diametral → complex multipole | Speakers, holding fixtures, magnetic couplings, bearings |
| **Horseshoe/U-shape** | Pole separation, leg length, cross-section, `effectiveGapField` | Special: poles close together, high field in gap, use gap field measurement | Educational demonstrations, lifting applications, sensors |
| **Arc/Segment** | Arc angle, inner/outer radius, thickness, magnetization direction | Multipole expansion or FEA (complex geometry) | Motors, generators, arc segments for rotors |
| **Dipole (point)** | `magneticMoment` vector (A·m²), position, orientation angles | Use Formula 1.5 (dipole-dipole) — valid only at large distances | Theoretical model for far-field calculations |
| **Halbach Array** | Array period, number of segments, rotation angle per segment | Superposition of individual segment fields (complex) | MRI machines, maglev trains, motors, undulators |
| **Flexible Sheet** | Thickness, pole spacing (typically 5mm alternating N-S), backing material | Weak field, use manufacturer rating | Fridge magnets, signage, door seals, craft projects |

**IMPORTANT SHAPE-SPECIFIC NOTES:**

**Horseshoe Magnets:**
- **Why they exist:** Straight bar magnets self-demagnetize via their own field. Horseshoe shape brings poles close together, reducing self-demagnetization.
- **Key property:** `effectiveGapField` — magnetic field strength in the gap between poles (much stronger than field from single pole)
- **Calculation:** Use measured gap field directly rather than calculating from geometry (complex field lines)
- **Demagnetizing factor:** Lower than straight bar due to closed magnetic circuit

**Spherical Magnets:**
- **Demagnetizing factor:** Nd = 1/3 (uniform in all directions due to symmetry)
- **Internal field:** Hd = -Nd·M = -M/3
- **Force calculation:** Treat as point dipole at distances > 3× radius
- **Common issue:** Difficult to magnetize uniformly; often have weak or offset poles
- **Material:** Usually neodymium (N42, N52) for toy applications

**Ring Magnets:**
- **Axially magnetized** (poles on flat faces): Use similar to disc magnet, but with reduced effective area
- **Diametrically magnetized** (poles on opposite sides of ring): Creates quadrupole field, complex calculation
- **Radially magnetized** (poles on inner/outer surfaces): Used in motors, very specialized
- **Key property:** `magnetizationDirection`: "axial" | "diametral" | "radial"

**Toroidal Magnets:**
- Similar to ring but thicker; field largely contained within toroid
- Very low external field when properly magnetized
- Used for magnetic shielding applications

**Arc/Segment Magnets:**
- Common in motors (8-12 segments form rotor/stator)
- **Properties needed:** `arcAngle` (degrees), `magnetizationAngle` (radial, tangential, or custom)
- Force calculation requires summing contributions from all segments

**Halbach Arrays:**
- Engineered magnetic field pattern: strong on one side, weak on other
- Each segment rotated relative to neighbors
- **Properties:** `arrayPeriod` (wavelength), `segmentsPerPeriod`, `rotationAngle`
- Used where high field uniformity or one-sided field needed

**Flexible Magnets:**
- Ferrite powder mixed with rubber/vinyl binder
- Alternating poles embossed on surface (typically 5mm spacing)
- Very weak compared to solid magnets
- **Max pull force:** ~1-5 PSI (vs 50+ PSI for neodymium)
- Cannot use standard force formulas — use manufacturer specifications

**Universal Properties (All Shapes):**
- `grade`: N42, N52, etc. for neodymium; Alnico 5, Alnico 8 for alnico; Y30, Y35 for ferrite
- `materialType`: "neodymium" | "samarium-cobalt" | "alnico" | "ferrite" | "flexible"
- `permeability`: μ, μᵣ (relative permeability)
- `magnetization`: M (A/m)
- `pullForce`: Rated pull force (lbs or N) — always specify test conditions
- `remanence`: Br (tesla) — residual flux density (material property)
- `coercivity`: Hc (kA/m) — resistance to demagnetization
- `maxOperatingTemp`: °C (Alnico: 540°C, Ferrite/SmCo: 300°C, Neodymium: 80-200°C depending on grade)
- `curieTemperature`: °C (temperature where magnet loses all magnetism)
- `densit`: kg/m³ (affects weight calculations)

---

## 2. EMF SHIELDING FORMULAS

**When to use:** Determining how well a material blocks electromagnetic radiation (WiFi, cell signals, RF). Use for selecting shielding materials or validating manufacturer claims.

**Plain English:** "How much does this material reduce EMF exposure?" Answers: Will aluminum foil block my WiFi? Is 80 dB reduction enough for sensitive equipment?

**Practical example:** Product says "blocks 90 dB at 1 GHz" - these formulas verify if that's physically possible given the material thickness and type.

**IMPORTANT: Two approaches supported:**
1. **Calculated from material properties** - Use when you know conductivity/thickness but not performance
2. **Direct manufacturer specs** - Use when product sheet says "shields 80-94.5 dB" (most common for your database)

**DECISION TREE: Which EMF shielding formula do I use?**

```
START → What do I know about my shielding material?

├─ I have manufacturer spec ("shields 80-94.5 dB at 1 GHz")
│  └─ Use APPROACH 2: Direct Spec Entry
│     Store: effectiveShielding = {attenuation: 90, frequencyRange: {min, max}}
│     No calculation needed - use manufacturer data directly
│
├─ I know material type (copper, aluminum) and thickness
│  └─ Use APPROACH 1: Calculate from properties
│     Step 1: Calculate skin depth (Formula 2.1) → tells you "how deep does EMF penetrate?"
│     Step 2: Calculate attenuation (Formula 2.2) → tells you "how many dB reduction?"
│
├─ I have gaps/holes in my shield (seams, vents, under doors)
│  └─ Use Formula 2.3: Gap/Aperture Leakage
│     Critical: Gaps dramatically reduce effectiveness!
│     Even 1% open area can drop 80 dB shield to 20 dB
│
└─ I want to know what wavelength can fit through my gap
   └─ Use Formula 2.4: Wavelength-Frequency Relationship
      Rule: Gap must be << wavelength for good shielding
      Example: 1cm gap blocks WiFi (2.5cm wavelength) poorly
```

**PLAIN ENGLISH EXPLANATIONS:**

**What is "Skin Depth" (δ)?**
Skin depth is how far electromagnetic radiation penetrates into a metal before it's reduced to 37% of its original strength. Think of it like how deep sunlight penetrates into water - the deeper you go, the darker it gets. Skin depth tells you "how thick does my metal need to be to block this frequency?"

- **At 1 kHz (low frequency):** Copper skin depth = 2.1mm → Need 2mm+ copper
- **At 1 GHz (cell phone):** Copper skin depth = 0.002mm → Very thin copper works!
- **Higher frequency = shallower penetration = easier to shield**

**What is "Attenuation Coefficient" (η)?**
Attenuation coefficient tells you "how many decibels (dB) of reduction" you get from your shield. It's like a dimmer switch for EMF.

- **20 dB** = 90% reduction (1/10 gets through)
- **40 dB** = 99% reduction (1/100 gets through)
- **60 dB** = 99.9% reduction (1/1000 gets through)
- **80 dB** = 99.99% reduction (1/10,000 gets through)

**When is "80-94.5 dB" shielding spec useful?**
This is REAL-WORLD performance including the material's actual thickness, conductivity, and test conditions. It's MORE USEFUL than calculating from scratch because:
- It's already tested at specific frequencies (e.g., "at 1 GHz")
- It accounts for real-world factors
- You can directly compare products: "Material A: 80 dB" vs "Material B: 90 dB" → Material B is 10× better

---

### 2.1 Skin Depth
**Formula:**
```
δ = √(2ρ / (ω * μ))

Where: ω = 2πf
```

**Required Properties:**
- `ρ`: Resistivity (Ω·m)
- `σ`: Conductivity = 1/ρ (S/m)
- `f`: Frequency (Hz)
- `ω`: Angular frequency = 2πf (rad/s)
- `μ`: Permeability = μᵣ * μ₀ (H/m)
- `μᵣ`: Relative permeability (dimensionless)
- `μ₀`: Permeability of free space = 4π×10⁻⁷ H/m
- `δ`: Skin depth (m)

**Material Examples:**
- Copper at 1 kHz: δ ≈ 2.1 mm
- Aluminum at 1 kHz: δ ≈ 2.7 mm
- Mu-metal (high permeability): much smaller δ

---

### 2.2 Attenuation Coefficient
**Formula:**
```
η = 20 * log₁₀(e^(t/δ))
  ≈ 8.686 * (t/δ)    (in dB)

For multiple layers:
η_total = η₁ + η₂ + ... + ηₙ
```

**Required Properties:**
- `t`: Shield thickness (m)
- `δ`: Skin depth (m)
- `η`: Attenuation (dB)
- `layers`: Number of shield layers

**Key Insight:** Attenuation increases linearly with thickness (in dB). Multiple thin layers can be more effective than single thick layer due to multiple reflections.

---

### 2.3 Wavelength-Frequency Relationship
**Formula:**
```
λ = c / f

Where:
- λ: Wavelength (m)
- c: Speed of light = 3×10⁸ m/s
- f: Frequency (Hz)
```

**Plain English:** "How big is this wave?" Wavelength tells you the physical size of one complete wave cycle. This is CRITICAL for understanding gaps.

**Required Properties:**
- `frequency`: Hz
- `wavelength`: m (calculated)
- `speedOfLight`: 3×10⁸ m/s (constant)

**Common Frequencies & Wavelengths:**

| Frequency | Wavelength | Common Source |
|-----------|------------|---------------|
| 60 Hz | 5,000 km | Power lines (not RF - different physics!) |
| 1 MHz | 300 m | AM radio |
| 100 MHz | 3 m | FM radio |
| 1 GHz | 30 cm (12 inches) | Cell phones, WiFi 2.4 GHz |
| 2.4 GHz | 12.5 cm (5 inches) | WiFi, Bluetooth, microwave ovens |
| 5 GHz | 6 cm (2.4 inches) | WiFi 5 GHz band |
| 10 GHz | 3 cm (1.2 inches) | Radar, satellite |

**Why This Matters for Your Project:**
- WiFi (2.4 GHz) has 12.5cm wavelength
- A 1cm gap between blocks = 1/12 of wavelength → **SIGNIFICANT LEAKAGE**
- A 1mm gap = 1/125 of wavelength → Much better, but still some leakage
- Goal: Gaps << λ/20 (less than 5% of wavelength) for good shielding

---

### 2.4 Gap/Aperture Shielding Effectiveness
**Critical Rule:**
```
For effective shielding: gap_size << λ/20

Where:
- gap_size: Maximum dimension of opening (m)
- λ: Wavelength at highest frequency of concern (m)
```

**Plain English:** "How big a gap can I tolerate?" Any opening in your shield acts like a window that lets EMF leak through. The rule: **gaps must be much smaller than 1/20th of the wavelength** you're trying to block.

**Shielding Degradation by Gap Size:**

| Gap Size vs Wavelength | Effective Shielding | Practical Result |
|------------------------|--------------------|-----------------|
| gap << λ/20 | ~90% of material spec | Good shielding maintained |
| gap ≈ λ/20 | ~70% of material spec | Noticeable degradation |
| gap ≈ λ/10 | ~50% of material spec | Significant leakage |
| gap ≈ λ/4 | ~20% of material spec | Poor shielding |
| gap ≈ λ/2 | ~10% of material spec | Minimal shielding |
| gap ≥ λ | <5% of material spec | Shield nearly useless |

**Empirical Data from Research:**
- **1% open area** (tiny gaps): Reduces 40 dB shield → 30 dB (10 dB loss)
- **5% open area** (larger gaps): Reduces 40 dB shield → 13 dB (27 dB loss!)
- **Complete seal required** for high-performance shielding (>60 dB)

**Formula for Gap Leakage Impact:**
```
Effective_Attenuation_dB = Material_Attenuation_dB - Gap_Penalty_dB

Gap_Penalty_dB ≈ 20 × log₁₀(gap_size / (λ/20))

When gap_size > λ/20:
  Gap_Penalty can be 10-40+ dB!
```

**Required Properties:**
- `maxGapSize`: Maximum gap dimension (m)
- `wavelength`: λ (m) at highest frequency
- `gapPenalty`: Attenuation loss due to gaps (dB)
- `sealQuality`: "hermetic" | "good" | "fair" | "poor"
- `gapLocations`: Array of gap descriptions ("door seam", "vent", etc.)

**Practical Examples for Your 12"×12" Blocks:**

**Scenario 1: Blocking WiFi 2.4 GHz (λ = 12.5cm)**
- Perfect seal (0mm gap): 80 dB material → 80 dB effective ✅
- 1mm gap: 80 dB material → ~70 dB effective (acceptable) ✅
- 5mm gap: 80 dB material → ~50 dB effective (significant leakage) ⚠️
- 1cm gap: 80 dB material → ~30 dB effective (poor shielding) ❌
- 5cm gap (half wavelength): 80 dB material → ~10 dB effective (nearly useless) ❌

**Scenario 2: Blocking Cell Phone 1 GHz (λ = 30cm)**
- 1mm gap: Better than WiFi case (λ is larger)
- 5mm gap: Still acceptable (~60 dB effective)
- 1cm gap: Marginal (~45 dB effective)

**Scenario 3: Your Magnet-Connected Blocks**
If blocks connect with magnetic force but have even tiny gaps:
- **0.5mm gap** at 2.4 GHz: Loses ~5-10 dB (80 dB → 70-75 dB)
- **1mm gap** at 2.4 GHz: Loses ~10-15 dB (80 dB → 65-70 dB)
- **2mm gap** at 2.4 GHz: Loses ~20-25 dB (80 dB → 55-60 dB)

**Solution Strategies:**
1. **Conductive gaskets** at block edges (compressed foam with silver coating)
2. **Overlapping flanges** (like microwave oven door design)
3. **Finger stock** (spring contacts that maintain connection)
4. **Conductive adhesive** if permanent seal acceptable

---

### 2.5 Material Properties for EMF Shielding

| Material | Conductivity σ (S/m) | Rel. Permeability μᵣ | Resistivity ρ (Ω·m) |
|----------|---------------------|----------------------|---------------------|
| **Copper** | 5.96 × 10⁷ | ~1 | 1.68 × 10⁻⁸ |
| **Aluminum** | 3.77 × 10⁷ | ~1 | 2.65 × 10⁻⁸ |
| **Mu-metal** | 1.8 × 10⁶ | 50,000-100,000 | 5.5 × 10⁻⁷ |
| **Permalloy** | ~2 × 10⁶ | 8,000-100,000 | ~5 × 10⁻⁷ |
| **Iron** | 1.0 × 10⁷ | 200-5,000 | 1.0 × 10⁻⁷ |

---

## 3. STRUCTURAL MECHANICS FORMULAS

**When to use:** Calculating if foam blocks will sag, bend, or deform under weight. Critical for ceiling installations.

**Plain English:** "Will the block sag in the middle?" Answers: Can a 12"×12" foam panel span ceiling joists without bowing? How much weight before failure?

**Practical example:** You hang a 2" thick polyurethane block from ceiling magnets. Will it sag 1mm, 10mm, or catastrophically fail? These formulas tell you.

**DECISION TREE: Which structural formula do I use?**

```
START → How is my block/panel supported?

├─ Supported on one edge only (like diving board or shelf)
│  ├─ Single weight at unsupported end?
│  │  └─ Use 3.1: Cantilever with Point Load
│  │     Formula: δ = FL³/(3EI)
│  │     Example: Block held by magnets on one edge, weight hanging from far corner
│  │
│  └─ Weight spread across whole panel (own weight, snow, etc.)?
│     └─ Use 3.3: Cantilever with Distributed Load
│        Formula: δ = qL⁴/(8EI)
│        Example: 12×12 foam panel held on one edge, sagging from own weight
│
├─ Supported on two opposite edges (like bridge or floor joist)
│  ├─ Single weight in middle?
│  │  └─ Use 3.2: Simply Supported with Center Load
│  │     Formula: δ = FL³/(48EI)
│  │     Example: Panel held by magnets on left and right edges, person standing in center
│  │
│  └─ Weight spread across whole panel?
│     └─ Use 3.3: Simply Supported with Distributed Load
│        Formula: δ = 5qL⁴/(384EI)
│        Example: Ceiling panel held by magnets at 2 opposite edges
│
└─ Supported on all four edges (like ceiling tile or tabletop)
   └─ Use Modified Plate Theory (beyond basic beam formulas)
      Note: Four-edge support is MUCH stronger than 2-edge
      Deflection typically 1/5 to 1/10 of simply-supported beam
```

**PRACTICAL GUIDE: "Will my block sag?"**

**Step 1:** Identify your support condition (cantilever or simply-supported)
**Step 2:** Identify your load type (point load or distributed)
**Step 3:** Find formula from table above
**Step 4:** Calculate deflection δ
**Step 5:** Compare to acceptable limit
  - Aesthetic limit: δ < L/360 (barely noticeable)
  - Functional limit: δ < L/180 (noticeable but OK)
  - Safety limit: δ < L/60 (very visible, approaching failure)

**Example for Your 12"×12"×2" Block:**
- L = 12 inches = 0.305 m
- L/360 = 0.85mm (invisible to eye)
- L/180 = 1.7mm (barely visible)
- L/60 = 5mm (very visible sag)

If calculation shows δ = 8mm → FAIL, need thicker material or more support points

---

### 3.1 Cantilever Beam Deflection
**Formula:**
```
δ = (F * L³) / (3 * E * I)
```

**Required Properties:**
- `F`: Point load at free end (N)
- `L`: Beam length (m)
- `E`: Elastic modulus (Pa or N/m²)
- `I`: Area moment of inertia (m⁴)
- `δ`: Deflection at free end (m)

**Moment of Inertia (Common Cross-Sections):**
- Rectangle (b × h): I = (b * h³) / 12
- Circle (diameter d): I = (π * d⁴) / 64
- Hollow circle (OD Do, ID Di): I = (π/64) * (Do⁴ - Di⁴)

---

### 3.2 Simply Supported Beam (Center Load)
**Formula:**
```
δ_max = (F * L³) / (48 * E * I)
```

**Required Properties:** Same as cantilever

---

### 3.3 Uniformly Distributed Load
**Cantilever:**
```
δ_max = (q * L⁴) / (8 * E * I)
```

**Simply Supported:**
```
δ_max = (5 * q * L⁴) / (384 * E * I)
```

**Required Properties:**
- `q`: Distributed load per unit length (N/m)
- Other properties same as above

---

### 3.4 Bending Moment
**Cantilever (point load):**
```
M_max = F * L    (at fixed end)
```

**Simply Supported (center load):**
```
M_max = (F * L) / 4    (at center)
```

**Required Properties:**
- `M`: Bending moment (N·m)
- `σ`: Bending stress = M*c/I (Pa) where c is distance from neutral axis

---

## 4. FOAM PROPERTIES & MECHANICS

**When to use:** Understanding how foam behaves under compression, impact, or stretching. Essential for material selection.

**Plain English:** "What kind of foam do I need?" Answers: Will this foam crush when magnets pull? Does it absorb impacts? Will it tear when I pull blocks apart?

**Practical example:** Choosing between soft open-cell foam (better acoustic absorption, but weak structure) vs rigid closed-cell foam (strong, but less sound dampening).

---

### 4.1 Foam Structure Types
**Open-Cell Foam:**
- Air flows through interconnected pores
- Soft, breathable, compressible
- Lower R-value (thermal)
- Better acoustic absorption

**Closed-Cell Foam:**
- Trapped gas bubbles, no air flow
- Rigid, water-resistant
- Higher R-value (thermal)
- Better structural strength

---

### 4.2 Mechanical Behavior (Stress-Strain Curve)
**Three Regions:**
1. **Linear Elastic Regime:** Cell walls bend elastically
2. **Plateau Stress:** Cell walls buckle/yield (energy absorption zone)
3. **Densification:** Cell walls crush together, stiffness increases rapidly

---

### 4.3 Elastic Modulus Formulas
**Open-Cell Foam:**
```
E*/Es = Cf * (ρ*/ρs)²
```

**Closed-Cell Foam:**
```
E*/Es = Cf * (ρ*/ρs)³
```

**Required Properties:**
- `E*`: Foam elastic modulus (Pa)
- `Es`: Solid material modulus (Pa)
- `ρ*`: Foam density (kg/m³)
- `ρs`: Solid material density (kg/m³)
- `Cf`: Geometric constant (depends on cell structure)

---

### 4.4 Energy Absorption
**Formula:**
```
W_max/Es = 0.05 * (ρ*/ρs)² * [0.975 - 1.4(ρ*/ρs)]
```

**Required Properties:**
- `W_max`: Maximum energy absorbed per unit volume (J/m³)
- Important for impact resistance

---

### 4.5 Comprehensive Foam Property List
**Mechanical:**
- `density` (ρ): kg/m³
- `elasticModulus` (E): Pa or N/m²
- `compressionStrength`: Pa (stress at yield/plateau)
- `tensileStrength`: Pa
- `shearStrength`: Pa
- `tearResistance`: N/m
- `cellType`: "open" | "closed"
- `cellSize`: Average cell diameter (μm or mm)

**Thermal:**
- `thermalConductivity` (k): W/(m·K)
- `rValue`: K·m²/W (thermal resistance)
- `agingFactor`: Multiplier for R-value degradation over time

**Durability:**
- `compressionSet`: % permanent deformation after cyclic loading
- `resilience`: % rebound after compression

**Common Foam Materials:**
- Polyurethane flexible: ρ ~20-80 kg/m³, open-cell
- Polyurethane rigid: ρ ~30-250 kg/m³, closed-cell, initial R-6.8/inch
- Polystyrene (EPS): ρ ~15-50 kg/m³, closed-cell, R-4/inch
- Polystyrene (XPS): ρ ~25-50 kg/m³, closed-cell, R-5/inch

---

## 5. ACOUSTIC SHIELDING (STC) FORMULAS

**When to use:** Determining how well materials block sound. Essential for soundproofing rooms or blocking noise.

**Plain English:** "How quiet will it be inside?" Answers: Will this block my neighbor's music? Can I have a private conversation? How many dB reduction do I need?

**Practical example:** STC 45 means "loud speech heard but not audible (meaning unclear)" - good for bedrooms. STC 60+ needed for recording studios.

**IMPORTANT: Like EMF shielding, use manufacturer STC ratings when available** (e.g., "Mass loaded vinyl: STC 27").

---

### 5.1 Sound Transmission Class (STC) Rating System
**Definition:** Single-number rating from transmission loss measurements at 16 standard frequencies (125-4000 Hz) following ASTM E413 standard.

**Subjective Correlation:**
| STC | Subjective Experience |
|-----|----------------------|
| 25 | Normal speech clearly understood |
| 30 | Loud speech clearly understood |
| 35 | Loud speech audible but not intelligible |
| 40 | Loud speech heard as murmur |
| 45 | Loud speech heard but not audible (meaning unclear) |
| 50 | Loud sounds faintly heard |
| 60+ | Good soundproofing; most sounds not heard |

---

### 5.2 Mass Law (Non-Linear)
**Key Relationship:** Doubling mass increases STC by only 5-6 points (logarithmic, not linear).

**Example:**
- Adding one layer drywall to light-gauge steel stud: +5 STC points

**Surface Density:**
```
Surface Density (kg/m²) = Material Density (kg/m³) × Thickness (m)
```

---

### 5.3 Sound Absorption
**Effect:** Fiberglass/mineral wool insulation in cavity increases STC by 5-8 points.

**Mechanism:** Absorptive materials convert sound energy to heat via friction in porous structure.

**Absorption Coefficient (α):** Ranges 0-1, where:
- 0 = Perfect reflection (no absorption)
- 1 = Perfect absorption (no reflection)

Frequency-dependent: different materials absorb different frequencies better.

---

### 5.4 Sound Transmission Loss
**Frequency-dependent:** Transmission loss typically increases with frequency for most materials.

**Sound Leakage Critical:**
- 5% open area: Reduces TL from 40 dB to 13 dB
- 0.1% open area: Reduces TL from 40 dB to 30 dB
- **Air sealing is critical for effective soundproofing**

---

### 5.5 Typical Assembly STC Values
| Assembly Description | STC Rating |
|---------------------|-----------|
| Single drywall on wood studs, no insulation | 33 |
| Same with fiberglass insulation | 39 |
| Double drywall with insulation | 45 |
| Staggered studs, double drywall, insulation | 55+ |

---

### 5.6 Comprehensive Acoustic Property List
**Primary:**
- `stcRating`: Integer (typically 25-70+)
- `surfaceDensity`: kg/m² (mass per unit area)
- `thickness`: m
- `materialType`: String (identifies material)

**Frequency Response:**
- `transmissionLossByFrequency`: Array of {frequency: Hz, loss: dB}
- `absorptionCoefficient`: Number (0-1) or array by frequency
- `absorptionCoefficientByFrequency`: Array of {frequency: Hz, alpha: 0-1}

**Assembly Properties:**
- `compositeSTC`: For multi-layer assemblies
- `dampingFactor`: For viscoelastic damping compounds
- `airTightness`: Boolean or percentage (critical for performance)

**Structural Decoupling:**
- `resilientChannels`: Boolean
- `staggeredStuds`: Boolean
- `decouplingMethod`: String describing method

---

## 6. THERMAL INSULATION (R-VALUE) FORMULAS

**When to use:** Calculating heat loss/gain through materials. Essential for maintaining temperature control.

**Plain English:** "How well does this keep heat in (or out)?" Answers: Will my server rack overheat? Can I keep cold air inside? How much energy to maintain temperature?

**Practical example:** R-5 foam keeps room 20°F warmer than outside. R-10 keeps it 40°F warmer with same heating. Higher R-value = better insulation = lower energy bills.

**IMPORTANT: R-values are additive** - Stack multiple layers to increase total insulation.

---

### 6.1 R-Value Definition
**Formula:**
```
R_val = ΔT / φ_q = L / k

Where:
- R_val: Thermal resistance (K·m²/W in SI, or °F·ft²·h/BTU in I-P)
- ΔT: Temperature difference (K or °F)
- φ_q: Heat flux per unit area (W/m² or BTU/(h·ft²))
- L: Thickness (m or ft)
- k: Thermal conductivity (W/(m·K) or BTU·in/(h·ft²·°F))
```

**Unit Conversion:**
```
1 (°F·ft²·h/BTU) = 5.68 (K·m²/W)
```

---

### 6.2 U-Value (Thermal Transmittance)
**Formula:**
```
U_val = 1 / R_val = k / L

Units: W/(m²·K) or BTU/(h·°F·ft²)
```

**Meaning:** Measures how well element conducts heat. Lower U-value = better insulation.

---

### 6.3 Heat Flux Formula
**Formula:**
```
φ = (ΔT × A) / R_val

Where:
- φ: Heat flow rate (W or BTU/h)
- A: Surface area (m² or ft²)
- ΔT: Temperature difference
- R_val: Total thermal resistance
```

---

### 6.4 R-Value Additivity (Multiple Layers)
**Formula:**
```
R_total = R₁ + R₂ + ... + Rₙ

For each layer: R_i = L_i / k_i
```

**Conditions:** Holds for:
- Dense solids in direct contact
- Steady-state heat transfer
- Homogeneous materials

**Caveats:**
- Low-density insulation: R/inch decreases with thickness due to convection
- Air gaps: Add resistance, but complex calculation involving radiation and convection

---

### 6.5 Material R-Values (Per Inch Thickness)

| Material | R-value (I-P) | R-value (SI) | Typical Use |
|----------|--------------|-------------|-------------|
| **Vacuum Insulated Panel** | R-14 to R-66 | R-2.5 to R-11.6 | Premium insulation |
| **Silica Aerogel** | R-10 | R-1.76 | Space applications |
| **Polyurethane Rigid (pentane-expanded)** | Initial R-6.8 | R-1.20 | Foam boards |
| **Polyurethane Rigid (aged)** | R-5.5 | R-0.97 | After 5-10 years |
| **XPS (Extruded Polystyrene)** | R-5 to R-5.4 | R-0.88 to R-0.95 | Foam board |
| **EPS (Expanded Polystyrene)** | R-4 | R-0.70 | Foam board |
| **Fiberglass Batts** | R-3.1 to R-4.3 | R-0.55 to R-0.76 | Wall/ceiling |
| **Mineral Wool** | R-3 to R-3.85 | R-0.53 to R-0.68 | Fire-resistant |
| **Wood** | R-1.41 | R-0.25 | Structural |
| **Concrete** | R-0.08 | R-0.014 | Structural |

---

### 6.6 Surface Air Films (Add to Total R-value)

| Surface Location | R-value (I-P) | R-value (SI) |
|-----------------|--------------|-------------|
| Horizontal ceiling (heat flow up) | R-0.61 | R-0.11 |
| Horizontal (heat flow down) | R-0.92 | R-0.16 |
| Vertical wall | R-0.68 | R-0.12 |
| Outdoor surface | R-0.17 to R-0.25 | R-0.03 to R-0.04 |

---

### 6.7 Temperature Dependence
**General Trend:** R-value typically increases with decreasing temperature.

**Exception:** Polyisocyanurate (polyiso) foam:
- R-value increases with both thickness AND temperature
- Performance degrades in cold weather (concern for freezers)

---

### 6.8 Aging Factor (Gas Diffusion)
**Closed-Cell Foams:** Blowing agents slowly diffuse out over time.

**Example (Polyurethane Rigid):**
- Initial R-value: R-6.8 per inch
- Aged R-value (5-10 years): R-5.5 per inch
- Degradation: ~19% loss

**Required Property:** `agingFactor` multiplier or time-dependent curve

---

### 6.9 Comprehensive Thermal Property List
**Primary:**
- `rValue`: K·m²/W (SI preferred) or °F·ft²·h/BTU (I-P)
- `uValue`: W/(m²·K) or BTU/(h·°F·ft²)
- `thermalConductivity` (k): W/(m·K) or BTU·in/(h·ft²·°F)
- `thickness` (L): m or ft

**Material Properties:**
- `density` (ρ): kg/m³ or lb/ft³
- `specificHeat` (c): J/(kg·K) or BTU/(lb·°F)
- `thermalResistivity` (r): K·m/W (reciprocal of k)
- `emissivity` (ε): 0-1 (for radiant barriers; 0=perfect reflector, 1=black body)

**Temperature Effects:**
- `temperatureDependence`: Coefficient or lookup table
- `performanceTemperatureRange`: [minTemp, maxTemp] in K or °F

**Aging:**
- `agingFactor`: Multiplier (0-1, typically ~0.8-0.95 for closed-cell foams)
- `agingPeriod`: Time for agingFactor to apply (e.g., 5-10 years)

**Geometry:**
- `surfaceArea` (A): m² or ft²
- `volume`: m³ or ft³

**Application Context:**
- `installationMethod`: String (affects effective R-value)
- `compressionFactor`: Multiplier for compressed insulation (reduces R-value)

---

## 7. CONNECTION STRENGTH FORMULAS

**When to use:** Determining if connections will fail under load. Critical for safety - will blocks separate, tear, or slide?

**Plain English:** "Will the connection hold?" Answers: Will blocks slide apart sideways? Will adhesive fail before magnet? Will foam tear at magnet mounting point?

**Practical example:** Magnets pull with 2.78 lbs force straight-on, but what about sliding/shearing forces when someone pushes sideways on a block?

---

### 7.1 Shear Stress (Force Parallel to Surface)
**Formula:**
```
τ = F / A
```

**Required Properties:**
- `τ`: Shear stress (Pa or N/m²)
- `F`: Force applied parallel to surface (N)
- `A`: Cross-sectional area (m²)

**Plain English:** How much sideways/sliding force per unit area before failure.

---

### 7.2 Shear Strength Relationships
**Empirical relationships for estimating shear strength from tensile strength:**

```
Steels: Ultimate Shear ≈ 0.75 × Ultimate Tensile
        Yield Shear ≈ 0.58 × Yield Tensile

Aluminum: Ultimate Shear ≈ 0.65 × Ultimate Tensile
          Yield Shear ≈ 0.55 × Yield Tensile

General estimate: Shear Strength ≈ 0.6 × Tensile Strength
```

**Required Properties:**
- `ultimateTensileStrength` (UTS): Pa
- `yieldTensileStrength` (TYS): Pa
- Material type for selecting coefficient

**Plain English:** If you know how strong a material is when pulled apart, you can estimate how strong it is when sheared (slid).

---

### 7.3 Pure Shear Relationship
**Formula:**
```
τ = γ × G

Where: G = E / (2(1 + ν))
```

**Required Properties:**
- `γ`: Shear strain (dimensionless, radians)
- `G`: Shear modulus (Pa)
- `E`: Young's modulus / Elastic modulus (Pa)
- `ν`: Poisson's ratio (dimensionless, typically 0.3-0.4)

**Plain English:** How material deforms when pushed sideways. Links elastic modulus (stretching) to shear modulus (sliding).

---

### 7.4 Adhesive Bond Failure Modes
**Two primary failure types:**

1. **Cohesive Failure** (within adhesive bulk)
   - Adhesive itself splits/tears
   - Generally indicates good bonding
   - Surfaces covered with adhesive residue after failure

2. **Adhesive Failure** (at interface)
   - Bond breaks between adhesive and surface
   - Generally indicates poor surface prep or contamination
   - Clean separation, minimal residue

**Required Properties:**
- `adhesiveType`: String (epoxy, polyurethane, cyanoacrylate, etc.)
- `surfacePreparation`: String (cleaned, sanded, primed, etc.)
- `bondArea`: m²
- `cureTime`: hours or days
- `environmentalExposure`: {temperature, humidity, chemicals}

**Plain English:** Does the glue break, or does it peel off the surface? Glue breaking = good bond. Peeling off = bad surface prep.

---

### 7.5 Adhesive Design Principles
**Best practices for strong bonds:**

- **Maximize bond area** - Larger area = stronger bond
- **Prefer Mode II loading** (shear) over Mode I (tension/pull)
- **Good surface preparation** - Clean, roughened surfaces bond better
- **Appropriate adhesive selection** - Match adhesive chemistry to materials
- **Avoid stress concentrations** - No sharp corners or sudden thickness changes

**Required Properties for Design:**
- `bondAreaToLoadRatio`: m²/N (higher is better)
- `loadingMode`: "tension" | "shear" | "mixed"
- `surfaceTreatment`: String describing preparation
- `adhesiveElasticity`: Rigid or flexible to match application

---

## 8. ADDITIONAL CROSS-CUTTING FORMULAS
**Status:** MAY NEED SUPPLEMENTS

**Potential Topics:**
- Combined thermal + acoustic performance
- Thermal bridging effects at connections
- Vibration damping formulas
- Multi-layer composite effective properties

---

## MASTER PROPERTY CHECKLIST FOR TYPE SYSTEM

### Magnet Properties
**Base Properties (All Magnets):**
- [ ] `surfaceField`: Gauss or Tesla
- [ ] `magneticMoment`: A·m² (calculated from M and volume)
- [ ] `dimensions`: Object {length, width, height, radius, innerRadius, outerRadius, arcAngle} in m
- [ ] `grade`: "N42" | "N52" | "Alnico-5" | "Y30" | etc.
- [ ] `materialType`: "neodymium" | "samarium-cobalt" | "alnico" | "ferrite" | "flexible"
- [ ] `permeability`: μ (H/m)
- [ ] `relativePermeability`: μᵣ (dimensionless)
- [ ] `pullForce`: lbs or N (manufacturer spec)
- [ ] `pullForceTestConditions`: {gapDistance, surfaceType, temperature}
- [ ] `magnetization`: M (A/m)
- [ ] `poleArea`: m²
- [ ] `remanence`: Br (T) — residual flux density
- [ ] `coercivity`: Hc (kA/m) — resistance to demagnetization
- [ ] `maxOperatingTemp`: °C
- [ ] `curieTemperature`: °C
- [ ] `density`: kg/m³

**Shape-Specific Properties:**
- [ ] `shapeType`: "rectangular" | "cylindrical" | "spherical" | "ring" | "disc" | "horseshoe" | "arc" | "toroid" | "halbach" | "flexible"
- [ ] `demagnetizingFactor`: Nd (dimensionless, 0-1) — shape-dependent
- [ ] `magnetizationDirection`: "axial" | "diametral" | "radial" | "tangential" | "custom"
- [ ] `poleConfiguration`: "N-S" | "multi-pole" | "alternating-strip"

**Ring/Toroid Specific:**
- [ ] `innerRadius`: Ri (m)
- [ ] `outerRadius`: Ro (m)
- [ ] `effectiveArea`: π(Ro² - Ri²) for axial magnetization

**Horseshoe Specific:**
- [ ] `poleSeparation`: Gap width between U-arms (m)
- [ ] `legLength`: Length of each arm (m)
- [ ] `effectiveGapField`: B_gap (T) — measured field in gap

**Arc/Segment Specific:**
- [ ] `arcAngle`: degrees (e.g., 45° for 8-segment motor)
- [ ] `segmentNumber`: Integer (position in array)
- [ ] `magnetizationAngle`: degrees relative to radial

**Halbach Array Specific:**
- [ ] `arrayPeriod`: λ (m) — spatial wavelength of field pattern
- [ ] `segmentsPerPeriod`: Integer (typically 4-8)
- [ ] `rotationAnglePerSegment`: degrees (typically 90°/segment for 4-segment)

**Flexible Magnet Specific:**
- [ ] `poleSpacing`: m (typically 5mm alternating N-S)
- [ ] `backingMaterial`: "rubber" | "vinyl" | "ferrite-rubber"
- [ ] `maxPullForcePSI`: PSI (typically 1-5)

### Material Properties (Physical)
- [ ] `density`: ρ (kg/m³)
- [ ] `elasticModulus`: E (Pa)
- [ ] `compressionStrength`: Pa
- [ ] `tensileStrength`: Pa
- [ ] `shearStrength`: Pa
- [ ] `tearResistance`: N/m
- [ ] `thickness`: m

### Foam-Specific
- [ ] `cellType`: "open" | "closed"
- [ ] `cellSize`: μm or mm
- [ ] `compressionSet`: % permanent deformation
- [ ] `resilience`: % rebound

### EMF Shielding
**APPROACH 1: Calculated from material properties**
- [ ] `conductivity`: σ (S/m)
- [ ] `resistivity`: ρ (Ω·m)
- [ ] `skinDepth`: δ (m) — frequency-dependent
- [ ] `attenuationCoefficient`: η (dB) — calculated

**APPROACH 2: Direct manufacturer specs (PREFERRED for product database)**
- [ ] `effectiveShielding`: {attenuation: dB, frequencyRange: {min, max}, testStandard}
- [ ] `shieldingRating`: "80-94.5 dB" as string for display
- [ ] `testedFrequency`: Hz or "1 GHz to 10 GHz" range
- [ ] `frequencyRange`: [minHz, maxHz] — both approaches use this

**GAP/APERTURE ANALYSIS (CRITICAL for block-based designs)**
- [ ] `wavelength`: λ (m) — calculated from frequency
- [ ] `maxGapSize`: Maximum gap/opening dimension (m)
- [ ] `gapToWavelengthRatio`: gap_size/λ (dimensionless)
- [ ] `gapPenalty`: Attenuation loss due to gaps (dB)
- [ ] `effectiveAttenuationWithGaps`: Material attenuation - gap penalty (dB)
- [ ] `sealQuality`: "hermetic" | "gasket-sealed" | "tight-fit" | "loose-fit"
- [ ] `gapMitigationStrategy`: "conductive gasket" | "overlapping flange" | "finger stock" | "none"
- [ ] `minFrequencyForGoodSeal`: Hz (below this frequency, gaps matter less)

### Acoustic Properties
- [ ] `stcRating`: integer 25-70+
- [ ] `surfaceDensity`: kg/m²
- [ ] `transmissionLossByFrequency`: Array<{frequency: Hz, loss: dB}>
- [ ] `absorptionCoefficient`: 0-1 (average) or by frequency
- [ ] `dampingFactor`: dimensionless
- [ ] `airTightness`: boolean or %

### Thermal Properties
- [ ] `rValue`: K·m²/W
- [ ] `uValue`: W/(m²·K)
- [ ] `thermalConductivity`: k (W/(m·K))
- [ ] `specificHeat`: c (J/(kg·K))
- [ ] `thermalResistivity`: r (K·m/W)
- [ ] `emissivity`: ε (0-1)
- [ ] `agingFactor`: 0-1
- [ ] `temperatureDependence`: coefficient or curve

### Geometry Properties
- [ ] `area`: m²
- [ ] `length`: m
- [ ] `radius`: m
- [ ] `momentOfInertia`: I (m⁴)
- [ ] `volume`: m³

### Connection & Joint Properties
- [ ] `shearStress`: τ (Pa)
- [ ] `shearStrength`: Pa (from material properties or 0.6 × tensile)
- [ ] `shearModulus`: G (Pa)
- [ ] `poissonRatio`: ν (dimensionless, 0-0.5)
- [ ] `bondArea`: m² (for adhesive connections)
- [ ] `adhesiveType`: String (epoxy, polyurethane, etc.)
- [ ] `failureMode`: "cohesive" | "adhesive" | "substrate"
- [ ] `surfacePreparation`: String
- [ ] `loadingMode`: "tension" | "shear" | "peel" | "mixed"

### Loading/Performance Properties
- [ ] `frequency`: f (Hz) — for EMF, acoustic
- [ ] `angularFrequency`: ω (rad/s)
- [ ] `load`: F (N) or q (N/m)
- [ ] `span`: L (m)
- [ ] `temperature`: T (K or °F)
- [ ] `pressure`: Pa
- [ ] `heatFlux`: W/m²
- [ ] `deflection`: δ (m)
- [ ] `bendingMoment`: M (N·m)
- [ ] `stress`: σ (Pa)
- [ ] `strain`: ε (dimensionless)
- [ ] `shearStrain`: γ (radians)

---

## NEXT STEPS

1. ✅ **Formula research COMPLETE** - All 8 categories researched with formulas and properties

2. **Cross-reference properties with formulas:**
   - Create mapping: Which formulas need which properties
   - Identify any missing properties

3. **Design type hierarchy:**
   - Base types (Material, Block, Magnet, Layer, Connection, Assembly)
   - Material subtypes (ContainerMaterial, LayerMaterial with variants)
   - Property interfaces (IMagneticProperties, IStructuralProperties, IThermalProperties, IAcousticProperties)

4. **Define TypeScript types:**
   - Enums (MaterialType, MagnetShape, CellType, etc.)
   - Interfaces for property groupings
   - Type unions and intersections
   - Computed property methods

5. **Plan Zod validation:**
   - Range constraints (density > 0, emissivity 0-1, etc.)
   - Unit validation
   - Required vs optional properties
   - Cross-property validation rules

---

## REFERENCES

### Web Sources Retrieved:
1. Wikipedia: Skin Effect (EMF Shielding)
2. Wikipedia: Electromagnetic Shielding (including gap/aperture effects)
3. Wikipedia: Wavelength (frequency-wavelength relationships)
4. Wikipedia: Beam Deflection
5. Wikipedia: Foam & Polyurethane (Mechanical Properties)
6. Wikipedia: Soundproofing & Sound Transmission Class (STC)
7. Wikipedia: R-value (Insulation) & Thermal Insulation
8. Wikipedia: Magnetism & Force Between Magnets
9. Wikipedia: Shear Stress & Shear Strength
10. Wikipedia: Adhesive & Adhesive Bonding
11. K&J Magnetics Calculator Documentation
12. LessEMF.com: EMF Shielding FAQs (gap leakage empirical data)

### Key Technical References:
- **Gap Rule:** gap_size << λ/20 for effective shielding
- **Wavelength Formula:** λ = c/f where c = 3×10⁸ m/s
- **Empirical Gap Data:** 1% open area → 10 dB loss, 5% open area → 27 dB loss
- **WiFi 2.4 GHz:** λ = 12.5cm, max gap ~6mm for good shielding
- **WiFi 5 GHz:** λ = 6cm, max gap ~3mm for good shielding

### Magnet Shape References:
- **Horseshoe invention:** Daniel Bernoulli, 1743 (prevents self-demagnetization)
- **Spherical demagnetizing factor:** Nd = 1/3 (uniform due to symmetry)
- **Flexible magnet pole spacing:** Typically 5mm alternating N-S pattern
- **Common magnet materials:**
  - Neodymium (NdFeB): Strongest, N35-N52 grades, max temp 80-200°C
  - Samarium-Cobalt (SmCo): High temp (300°C), expensive, corrosion resistant
  - Alnico: Very high temp (540°C), brittle, easy to demagnetize
  - Ferrite (Ceramic): Cheap, brittle, weak, high temp (300°C)
  - Flexible: Weakest, ferrite powder in rubber/vinyl binder

### Formula Standards Referenced:
- ASTM E413: STC Rating Standard
- IEEE Electromagnetic Compatibility Standards
- Engineering Beam Theory (Euler-Bernoulli)
- Classical Magnetostatics (Ampère, Gilbert models)

---

**Document Version:** 2.0  
**Last Updated:** November 16, 2025  
**Status:** ✅ COMPLETE - Ready for type system design phase
