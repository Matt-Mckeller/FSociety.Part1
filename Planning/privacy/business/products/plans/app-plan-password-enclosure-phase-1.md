# Prompt 1

// todo, add details that the project needs to support calculating allowable gap sizes and display the gap size that would be allowed for each frequency for em shielding

**Prompt Audience Target**: AI
**Technical Stack**: TypeScript for Types, Models, Zod for Validation. Next Phase Stack: React + JSON For Data + MUI ( no backend, local JSON file references )
**Packages** https://github.com/convert-units/convert-units for unit to unit conversion ( i.e. lb to kg, in to cm )

**Metrics & units** Default to Imperial System, also support Metric System
**Models vs Interfaces** Model = contains logic, computed properties, math, etc, interface = types, definitions, and comments. Models likely have interfaces. AI will likely use interfaces for context in order to understand and continue building

# Context
- This is for the /Users/mm/Projects/Planning/privacy/business/products/password-protection-matt-mvp.md ( and related projects that may come out of this )

# Research
- What types of models/tools/open source projects currently exist for magnets, structure, math, material, and anything else that may be beneficial to use.

# Scope
The overall enclosure Structure can be limited to a square / cube like structure with flat ceiling and a door for now as defined in the password enclosure document

---

# Requirements Overview

## Primary Objective
Create a TypeScript type system to model, validate, and optimize a modular security enclosure - ensuring it works before purchasing parts.

## Core Requirements Summary
**Must Answer**: Will it work? What should I buy? How much will it cost?

**Key Capabilities**:
- ✅ Structural validation (weight, stability, sag)
- ✅ Magnet-foam compatibility verification
- ✅ Cost calculation & breakdown
- ✅ Component sourcing recommendations
- ✅ Material safety analysis

**Out of Scope (Phase 1)**: 3D visualization, installation instructions, advanced AI optimization, real-time pricing APIs

---

# Requirements & Goals

## MVP Requirements (Phase 1)

### Validation Requirements
- Verify enclosure physics will work before purchasing (pass/fail with warnings) `[MVP]` `[P0]` `[PC:5]`
- Validate structural support is strong enough (2x safety factor minimum) `[MVP]` `[P0]` `[PC:5]`
- Ensure parts will work as expected (magnet spacing ≥ 0.25" from edge) `[MVP]` `[P0]` `[PC:3]`
- Confirm magnet won't pull through foam (pull force < foam tear strength) `[MVP]` `[P0]` `[PC:3]`
- Verify blocks won't separate under normal use (connection strength > shear forces) `[MVP]` `[P0]` `[PC:3]`

### Calculation Requirements
- Calculate cost breakdown (per block, total) `[MVP]` `[P0]` `[PC:2]`
- Determine block count by structure size `[MVP]` `[P0]` `[PC:2]`
- Calculate weight (per block, ceiling load, total) `[MVP]` `[P0]` `[PC:3]`
- Compute magnet spacing requirements `[MVP]` `[P0]` `[PC:3]`
- Determine structural stability thresholds `[MVP]` `[P0]` `[PC:5]`

### Sourcing Requirements
- Compare magnet options (shape, size, pull force, cost) `[MVP]` `[P0]` `[PC:3]`
- Identify best vendors (price, availability) `[MVP]` `[P0]` `[PC:2]` `[API/Lookup]`
- Generate complete shopping list `[MVP]` `[P0]` `[PC:2]`
- Recommend cost-effective magnet selection `[MVP]` `[P0]` `[PC:3]`
- Determine required adhesive type `[MVP]` `[P0]` `[PC:1]` `[Data Lookup]`

### Data Requirements
- Material property database (density, strength, fire rating) `[MVP]` `[P0]` `[Preset/Static]` `[PC:2]`
- Predefined material layer stacks `[MVP]` `[P0]` `[Preset/Static]` `[PC:1]`
- Predefined block types `[MVP]` `[P0]` `[Preset/Static]` `[PC:1]`
- Defense type definitions `[MVP]` `[P0]` `[Preset/Static]` `[PC:1]`
- Magnet specifications `[MVP]` `[P0]` `[Preset/Static]` `[PC:1]`

## Configuration Requirements

### User Input Configuration
- Structure dimensions (length × width × height, 3-10 ft per side) `[MVP]` `[P0]` `[User Input]` `[PC:1]`
- Material layer stack selection (enable/disable layers, no reordering) `[V1]` `[P1]` `[User Input]` `[PC:2]`
- Budget constraints (total $ or per-component limits) `[V1]` `[P1]` `[User Input]` `[PC:1]`
- Priority weighting (cost, weight, defense, safety - must sum to 100%) `[V1]` `[P1]` `[User Input]` `[PC:2]`

### Experimentation Capabilities
- Toggle materials on/off in layer stacks (preset order maintained) `[V1]` `[P1]` `[User Input]` `[PC:2]`
- Compare different structure sizes (side-by-side results) `[V1]` `[P1]` `[PC:3]`
- Experiment with different material types/weights (what-if scenarios) `[V1]` `[P1]` `[PC:3]`
- Compare container material types (foam, wood, plastic, metal) `[V2]` `[P2]` `[PC:3]`
- Test magnet configurations (spacing, quantity per edge, depth) `[V1]` `[P1]` `[PC:3]`

## Analysis Requirements

### Safety Analysis
- Fire hazard assessment (per material, per configuration) `[MVP]` `[P0]` `[Data Lookup]` `[PC:3]`
- Material compatibility validation `[V1]` `[P1]` `[Data Lookup]` `[PC:2]`
- Structural stability scoring (0-100 score + pass/fail) `[MVP]` `[P0]` `[Formula]` `[PC:5]`
- Defense effectiveness by threat type (% blocked per layer) `[MVP]` `[P0]` `[Formula]` `[PC:3]`

### Optimization Analysis
- Best configuration recommendations (ranked by priority weights) `[V1]` `[P1]` `[AI-Assisted]` `[PC:9]`
- Cost optimization suggestions (alternatives with impact) `[V1]` `[P1]` `[AI-Assisted]` `[PC:5]`
- Weight optimization options (lighter materials with trade-offs) `[V1]` `[P1]` `[AI-Assisted]` `[PC:5]`
- Defense trade-off analysis (cost/weight impact of layers) `[V1]` `[P1]` `[AI-Assisted]` `[PC:5]`

## Educational & Understanding Requirements

### Threat Visualization
- Visualize threats by distance (satellite, radio tower, van, neighbor) `[MVP]` `[P0]` `[Preset/Static]` `[PC:3]`
- Visualize threats by type (EM, thermal, acoustic, visual) `[MVP]` `[P0]` `[Preset/Static]` `[PC:2]`
- Show observation methods by threat type (WiFi CSI, thermal camera, etc.) `[MVP]` `[P0]` `[Preset/Static]` `[PC:2]`
- Display defense mechanisms for each threat type `[MVP]` `[P0]` `[Preset/Static]` `[PC:2]`
- Show cost implications of defending against threat types `[MVP]` `[P0]` `[Calculated]` `[PC:3]`
- Indicate which threats current configuration protects against `[MVP]` `[P0]` `[Calculated]` `[PC:3]`

## Future Requirements

### 3D Visualization
- Visualize structure 3D model `[V2]` `[P2]` `[PC:9]`
- Visualize block assembly `[V2]` `[P2]` `[PC:5]`
- Visualize material layer stacks `[V2]` `[P2]` `[PC:3]`
- Show magnet placement `[V2]` `[P2]` `[PC:3]`

### Advanced Features
- Installation instructions views `[V1]` `[P2]` `[PC:5]`
- AI-assisted configuration optimization `[V2]` `[P2]` `[AI-Assisted]` `[PC:9]`
- Real-time vendor price tracking `[V2]` `[P2]` `[API/Lookup]` `[PC:5]`
- Custom material library management `[V2]` `[P2]` `[User Input]` `[PC:5]`
- Support for non-foam structural materials (steel, wood) `[V2]` `[P2]` `[Preset/Static]` `[PC:3]`
- Electrical flow/power system integration `[V3+]` `[P2]` `[PC:18]`
- Alternative block shapes `[V2]` `[P2]` `[PC:9]`
- International units support `[V1]` `[P2]` `[PC:2]`

### Application Expansion
- E-commerce integration `[V3+]` `[P2]` `[API/Lookup]` `[PC:18]`
- Product variant management `[V2]` `[P2]` `[PC:9]`
- Multi-purpose structure support `[V2]` `[P2]` `[PC:9]`

### Educational & Explanation Features
- Explain how defenses work (EM shielding, thermal protection, acoustic dampening) `[V1]` `[P2]` `[Preset/Static]` `[PC:3]`
- Explain why configurations are recommended `[V1]` `[P2]` `[Calculated]` `[PC:5]`
- Visualize threat models & attack vectors `[V1]` `[P2]` `[Preset/Static]` `[PC:5]`
- Compare threat types & defense effectiveness `[V1]` `[P2]` `[Calculated]` `[PC:3]`
- Interactive defense mechanism demonstrations `[V2]` `[P2]` `[PC:9]`
- Material property explanations (why this foam, why this thickness) `[V1]` `[P2]` `[Preset/Static]` `[PC:3]`
- Physics explanations (force calculations, structural mechanics) `[V1]` `[P2]` `[Preset/Static]` `[PC:5]`
- Safety principle education (fire ratings, stability factors) `[V1]` `[P2]` `[Preset/Static]` `[PC:3]`
- Best practices & decision-making frameworks `[V1]` `[P2]` `[Preset/Static]` `[PC:3]`
- How magnets work & shape differences (attraction patterns) `[V1]` `[P2]` `[Preset/Static]` `[PC:3]`

# View & UI Requirements

**Purpose:** Defines the visual components and user flows for interacting with the type system. Organized by user journey to ensure logical navigation and data flow.

## Flow 1: Understand Threats

**Purpose:** Educational foundation - help users understand password security threats before configuring defenses.

### Threat Visualization by Distance `[MVP]` `[P0]` `[PC:5]`
**Data:** Threat types, observation methods, distance ranges, accuracy levels
**Display:**
- Visual representation of threat ranges (satellite → radio tower → van → neighbor building → neighbor apartment)
- Accuracy degradation by distance for each observation method
- Which password reconstruction methods work at each distance
**Actions:** Filter by distance range, select threat to see details

### Threat Visualization by Type `[MVP]` `[P0]` `[PC:5]`
**Data:** Threat types (EM, thermal, acoustic, visual), observation methods, defenses
**Display:**
- Threat type breakdown with observation methods
- Defense mechanisms for each type
- Visual indicators (icons/colors) for each threat category
**Actions:** Filter by threat type, compare multiple types

### Threat Actor Capability View `[V1]` `[P1]` `[PC:5]`
**Data:** Actor types (civilian, ai humanoid robot, ai drone, controlled robot, controlled drone, ai controlled satellite, ai controlled cell tower, organized crime, corporate espionage, military, government, corporation), available attack methods, equipment access
**Display:**
- Matrix of actor type vs available observation methods
- Equipment requirements (router/laptop, van equipment, radio tower, satellite)
- Threat sophistication levels
- Visual representations: humanoid robot, drone, router/laptop icons
**Actions:** Filter by actor type, see what attacks each actor can perform

### Threat Medium & Actor Matrix `[V1]` `[P1]` `[PC:5]`
**Data:** Actor types, attack mediums (devices/platforms), observation methods
**Display:**
- Cross-reference showing which actors can use which mediums
- Device/platform breakdowns (civilian drone vs military drone capabilities)
- Access level indicators (publicly available, restricted, classified)
**Actions:** Compare actor capabilities, filter by medium type

### Defense Mechanism Explorer `[MVP]` `[P0]` `[PC:3]`
**Data:** Defense types, materials, effectiveness ratings, cost implications
**Display:**
- How each defense type works (EM shielding, thermal insulation, acoustic dampening, visual obstruction)
- Material-to-defense mappings
- Cost vs effectiveness trade-offs
**Actions:** Select defense to see materials, compare defenses

### Frequency Spectrum View `[V2]` `[P2]` `[PC:5]`
**Data:** EM frequency ranges, observation methods, material blocking effectiveness
**Display:**
- Frequency spectrum visualization (radio → microwave → infrared → visible → UV)
- Observation methods mapped to frequency ranges (WiFi CSI, thermal camera, etc.)
- Material blocking effectiveness by frequency (faraday fabric: 99% at 2.4GHz, etc.)
- Current configuration's coverage across spectrum
- Gap identification (which frequencies are under-protected)
**Actions:** Filter by frequency range, see which materials block which frequencies, identify coverage gaps

### Material Frequency Blocking Matrix `[V2]` `[P2]` `[PC:3]`
**Data:** Materials, frequency ranges, blocking percentages
**Display:**
- Matrix/heatmap of material vs frequency range
- Blocking effectiveness percentages
- Multi-layer cumulative effects
- Cost per frequency range protected
**Actions:** Compare materials, see layer stacking effects, optimize for specific frequency ranges

## Flow 2: Configure Enclosure

**Purpose:** Create and modify enclosure configurations, experiment with different designs.

### Structure Configuration View `[MVP]` `[P0]` `[PC:3]`
**Data:** Structure dimensions, door placement, block count
**Display:**
- Dimension input fields (length × width × height, 3-10 ft)
- Door configuration options
- Real-time block count calculation
- Cost & weight estimates
**Actions:** Input dimensions, place door, see calculated requirements

### Block Type Selector `[MVP]` `[P0]` `[PC:2]`
**Data:** Predefined block types, block properties
**Display:**
- Available block types (ceiling, wall, floor, corner, door frame)
- Block dimensions and specifications
- Block type purposes and placement rules
**Actions:** Browse block types, select for editing/viewing

### Block Configuration Editor `[MVP]` `[P0]` `[PC:5]`
**Data:** Material layer stack, magnet layout, container material, block dimensions
**Display:**
- Material layer toggle controls (enable/disable layers, preset order)
- Magnet placement configurator (spacing, depth, quantity per edge)
- Container material selector (foam type, thickness)
- Live preview of current configuration
**Actions:** Toggle materials, adjust magnet placement, change container material, save configuration

### Block Detail View `[MVP]` `[P0]` `[PC:5]`
**Data:** Selected block configuration, layer stack, magnet placement, cost, weight, defense ratings
**Display:**
- 3D-ish visualization of block (isometric view)
- Cross-section view showing material layers
- Multiple angle views (top, side, front)
- Layer stack breakdown with material names & thicknesses
- Magnet placement indicators
- Defense effectiveness per threat type
- Cost breakdown (materials + magnets + adhesives)
- Weight calculation
**Actions:** Rotate view, toggle cross-section, inspect layers, compare configurations

### Material Layer Stack Configurator `[V1]` `[P1]` `[PC:3]`
**Data:** Available materials, layer order (preset), layer properties
**Display:**
- List of materials in preset order
- Toggle switches for each layer
- Visual representation of active layers
- Impact indicators (defense, cost, weight) as layers change
**Actions:** Enable/disable layers, see impact on metrics

### Magnet Configuration Tool `[V1]` `[P1]` `[PC:5]`
**Data:** Magnet options (shape, size, pull force), spacing requirements, placement constraints
**Display:**
- Magnet shape selector (square, rectangular, cylindrical)
- Size & grade options
- Spacing configuration (edge distance, magnet-to-magnet distance)
- Depth adjustment
- Pull force visualization
- Safety validation indicators
**Actions:** Select magnet type, adjust spacing, set depth, validate safety

### Wall Configuration View `[MVP]` `[P0]` `[PC:3]`
**Data:** Wall dimensions, block arrangement, door placement
**Display:**
- Wall layout grid showing block positions
- Block type indicators (regular wall, door frame, corner)
- Dimensions and total coverage
- Cost & weight per wall
- Connection points between blocks
**Actions:** Arrange blocks, place door, adjust wall dimensions

### Structure Assembly View `[V1]` `[P1]` `[PC:5]`
**Data:** Complete structure configuration, all blocks positioned
**Display:**
- 3D-ish visualization of assembled enclosure
- Exploded view option (see how blocks connect)
- Wall-by-wall breakdown (north, south, east, west, ceiling, floor)
- Door placement visualization
- Overall dimensions and interior space
- Total cost, weight, defense rating
- Structural integrity indicators
**Actions:** Rotate structure, toggle exploded view, inspect individual walls, validate complete assembly

### Structure Cross-Section View `[V1]` `[P1]` `[PC:5]`
**Data:** Material layers across full structure, defense coverage
**Display:**
- Cross-section slice through entire structure (horizontal or vertical)
- Material layer continuity visualization
- Defense layer effectiveness across walls
- Gap/weakness indicators
- Thickness measurements
**Actions:** Change cross-section plane, inspect layer transitions, identify weak points

### Configuration Management View `[V1]` `[P1]` `[PC:5]`
**Data:** Saved configurations, configuration metadata
**Display:**
- Grid/list of saved configurations with thumbnails
- Configuration metadata (name, date created, cost, weight, defense score)
- Quick comparison metrics
- Tags/labels for organization
- Template configurations (Budget Build, Maximum Security, Balanced)
**Actions:** Save current configuration, load saved configuration, duplicate, rename, delete, tag

### Configuration History View `[V2]` `[P2]` `[PC:3]`
**Data:** Change history, previous configuration states
**Display:**
- Timeline of configuration changes
- What changed (materials added/removed, dimensions adjusted)
- Metric deltas (cost +$50, weight -5 lbs, defense -10%)
- Undo/redo capability
**Actions:** View change history, revert to previous state, compare versions

### Experimentation Workspace `[V1]` `[P1]` `[PC:9]`
**Data:** Multiple configuration variants, comparison metrics
**Display:**
- Split-screen view with 2-4 configuration variants side-by-side
- Synchronized navigation (rotate one, all rotate)
- Metric comparison table (cost, weight, defense, safety)
- Difference highlighting (what's different between variants)
- Parameter adjustment panel (change one variable, see impact across all)
**Actions:** Add variant, remove variant, adjust parameters, lock/unlock variants, select winner

### Parameter Slider View `[V1]` `[P1]` `[PC:5]`
**Data:** Adjustable configuration parameters, real-time calculated results
**Display:**
- Slider controls for key parameters (structure size, material thickness, magnet count)
- Real-time metric updates (cost, weight, defense) as sliders move
- Visual preview updates
- Impact indicators (green = improving, red = degrading)
- Constraint warnings (exceeds budget, too heavy)
**Actions:** Adjust sliders, see immediate impact, reset to defaults, apply changes

## Flow 3: Validate & Analyze

**Purpose:** Verify configuration will work, identify issues, get optimization recommendations.

### Validation Dashboard `[MVP]` `[P0]` `[PC:5]`
**Data:** All validation results, pass/fail status, warnings
**Display:**
- Overall pass/fail indicator
- Validation category breakdown:
  - ✅ Structural Support (weight, stability, sag)
  - ✅ Magnet Safety (pull force, foam tear, spacing)
  - ✅ Connection Strength (shear resistance)
  - ✅ Fire Safety (material ratings)
  - ✅ Defense Coverage (threat protection)
- Warning cards for any issues
- Confidence scores (based on safety factors)
**Actions:** Drill into validation details, see recommendations, fix issues

### Structural Analysis View `[MVP]` `[P0]` `[PC:5]`
**Data:** Weight calculations, stability scores, sag analysis, force comparisons
**Display:**
- Weight breakdown (per block type, ceiling load, total)
- Stability score (0-100) with pass/fail threshold
- Sag/deflection predictions for ceiling
- Force comparison chart (structure vs typical forces: bump, cat, baby)
- Safety factor indicators (2x minimum)
**Actions:** See calculation details, adjust configuration to improve scores

### Magnet Safety Analysis `[MVP]` `[P0]` `[PC:5]`
**Data:** Magnet pull force, foam tear strength, connection strength, spacing validation
**Display:**
- Pull force vs tear strength comparison
- Magnet spacing validation (edge distance ≥ 0.25")
- Connection strength per block edge
- Safety factor indicators
- Failure mode warnings if thresholds exceeded
**Actions:** See detailed calculations, adjust magnet configuration

### Defense Effectiveness Report `[MVP]` `[P0]` `[PC:5]`
**Data:** Defense ratings per threat type, material effectiveness, coverage gaps
**Display:**
- Defense score by threat type (EM, thermal, acoustic, visual)
- Protection percentage per layer
- Cumulative defense rating
- Gap analysis (which threats are under-protected)
- Material contribution breakdown
**Actions:** Compare configurations, see cost of improving specific defenses

### Cost Breakdown View `[MVP]` `[P0]` `[PC:3]`
**Data:** Material costs, magnet costs, adhesive costs, total cost
**Display:**
- Per-block cost breakdown
- Total structure cost
- Cost by component category (foam, materials, magnets, adhesives)
- Cost vs budget indicator (if budget set)
**Actions:** Drill into cost details, compare configurations

### Optimization Recommendations `[V1]` `[P1]` `[AI-Assisted]` `[PC:9]`
**Data:** Alternative configurations, trade-off analysis, priority-weighted rankings
**Display:**
- Ranked configuration alternatives
- Trade-off cards (e.g., "Remove mylar layer: -15% cost, -20% EM defense")
- Priority-optimized suggestions (based on user's weight, cost, defense, safety preferences)
- "Best value" indicators
- Side-by-side comparisons
**Actions:** Apply recommendation, compare trade-offs, adjust priorities

### Configuration Comparison Tool `[V1]` `[P1]` `[PC:5]`
**Data:** Multiple saved configurations, all metrics
**Display:**
- Side-by-side configuration comparison
- Metric differences (cost, weight, defense, safety)
- Visual diff of material stacks
- Validation result comparison
**Actions:** Select configurations to compare, choose best option

### Priority Weighting Interface `[V2]` `[P2]` `[PC:3]`
**Data:** User priority preferences (cost, weight, defense, safety)
**Display:**
- Slider controls for each priority dimension
- Percentage allocation (must sum to 100%)
- Visual representation of priority balance
- Impact preview on recommendations
**Actions:** Adjust priority weights, see how recommendations change, save priority profile

## Flow 4: Source Parts

**Purpose:** Determine what to buy, from where, and at what cost.

### Shopping List Generator `[MVP]` `[P0]` `[PC:3]`
**Data:** Required components, quantities, specifications
**Display:**
- Complete parts list grouped by category:
  - Foam blocks (quantity, dimensions, type)
  - Material layers (quantity, dimensions per material)
  - Magnets (quantity per type, specifications)
  - Adhesives (type, estimated amount)
- Quantity totals
- Specification details for each component
**Actions:** Export list, add notes, mark items purchased

### Vendor Comparison View `[V1]` `[P1]` `[API/Lookup]` `[PC:5]`
**Data:** Vendor pricing, availability, shipping costs
**Display:**
- Vendor comparison table (price, availability, shipping, total)
- Best value indicators
- Stock status
- Vendor ratings/reviews (if available)
- Price history charts (if tracking enabled)
**Actions:** Filter vendors, sort by price/availability, select vendor

### Magnet Selector & Comparison `[MVP]` `[P0]` `[PC:5]`
**Data:** Magnet options (shape, size, grade, pull force, cost), compatibility
**Display:**
- Magnet specification grid
- Pull force comparison chart
- Cost per unit & pull force per dollar
- Compatibility indicators (will it work with current configuration?)
- Ranked recommendations
**Actions:** Compare magnets, filter by shape/size, select for configuration

### Purchase Recommendations `[MVP]` `[P0]` `[PC:3]`
**Data:** Cost-optimized selections, vendor recommendations, estimated total
**Display:**
- Recommended magnet selection with rationale
- Best vendor for each component category
- Bundle opportunities (buy together discounts)
- Estimated total cost with breakdown
**Actions:** Accept recommendations, modify selections, proceed to purchase

### Component Detail View `[V1]` `[P1]` `[PC:2]`
**Data:** Individual component specifications, vendor options, pricing
**Display:**
- Full component specifications
- Available vendors with pricing
- Compatibility notes
- Installation notes
**Actions:** Select vendor, add to cart, see alternatives

---

## Cross-Cutting UI Components

**Purpose:** Reusable components used across multiple flows.

### Material Property Card `[MVP]` `[P0]` `[PC:2]`
**Data:** Material name, thickness, density, fire rating, cost/sqft, defense properties
**Display:** Compact card with key properties, expandable for details
**Actions:** Expand/collapse, compare materials

### Block Preview Component `[MVP]` `[P0]` `[PC:3]`
**Data:** Block configuration summary
**Display:** Small 3D-ish preview, key metrics (cost, weight, defense)
**Actions:** Click to open detailed view

### Validation Badge Component `[MVP]` `[P0]` `[PC:1]`
**Data:** Pass/fail/warning status
**Display:** Color-coded badge with icon
**Actions:** Click to see validation details

### Cost Indicator Component `[MVP]` `[P0]` `[PC:1]`
**Data:** Cost value, budget status
**Display:** Cost amount with budget comparison indicator
**Actions:** Hover for breakdown

### Defense Rating Component `[MVP]` `[P0]` `[PC:2]`
**Data:** Defense score by threat type
**Display:** Visual meter/progress bar per threat type
**Actions:** Click for detailed breakdown

---

## Future UI Considerations

### AI Assistant Panel `[V3+]` `[P2]` `[PC:18]`
**Purpose:** Conversational AI helper for complex decisions and optimization.
**Note:** AI is primarily used on backend for data parsing, web scraping, research, and optimization algorithms. A dedicated UI assistant is low priority.
**Potential Features:**
- Conversational configuration guidance
- Natural language queries ("What's the cheapest way to block thermal attacks?")
- Proactive suggestions based on user behavior
- Explanation generation for complex calculations

### Assembly & Installation Views `[V2]` `[P2]` `[PC:9]`
**Purpose:** Step-by-step guidance for physical construction.
**Deferred:** Not included in current view planning, will be addressed in later phase.
**Potential Features:**
- Assembly order visualization
- Step-by-step instructions
- Tools & materials needed checklist
- Time estimates per step

# Business Logic & Calculations

## 1. Structural Engineering
- Weight calculations `[Formula]` `[P0]`
  - Input: block dimensions, material stack, magnet specs
  - Output: per block (lbs), total (lbs), ceiling load (lbs/sqft)
- Stability analysis `[Formula]` `[P0]`
  - Input: structure dimensions, weight distribution, center of gravity
  - Output: tipping force required (lbs), collapse threshold (lbs), pass/fail
- Sag/deflection calculations `[Formula]` `[P1]`
  - Input: ceiling span, material rigidity, weight load
  - Output: deflection amount (inches), support needed (yes/no)
- Block count requirements `[Formula]` `[P0]`
  - Input: structure dimensions, block size, door placement
  - Output: count by type (ceiling, wall, floor blocks)
- Force comparisons `[Data Lookup]` `[P1]`
  - Output: typical forces (bump: 20-50 lbs, cat: 5-10 lbs, baby: 10-30 lbs)

## 2. Magnet & Connection Physics
- Magnet pull force `[Formula]` `[P0]`
  - Input: magnet specs, material thickness, distance
  - Output: pull force (lbs) at surface and through material
- Foam tear resistance `[Formula]` `[User Input]` `[P0]`
  - Input: foam tensile strength, glue strength, magnet pull force
  - Output: tear point threshold (lbs), safety factor, pass/fail
- Magnet spacing optimization `[Formula]` `[P0]`
  - Input: block dimensions, magnet size, required pull force
  - Output: min edge distance (inches), optimal spacing (inches)
- Magnet comparison `[Formula]` `[P1]`
  - Input: magnet options (shape, size, grade, cost)
  - Output: pull force per $, ranked recommendations
- Block connection strength `[Formula]` `[P0]`
  - Input: magnet configuration, material stack
  - Output: connection strength (lbs), failure mode warnings

## 3. Material Properties & Safety
- Fire ratings (ignition temp, flame spread, material class) `[Data Lookup]` `[P0]`
- Material compatibility (adhesion, chemical interaction) `[Data Lookup]` `[P1]`
- Defense effectiveness (EM, thermal, acoustic, visual by material/thickness) `[Formula]` `[Data Lookup]` `[P0]`
- Environmental tolerances (temperature, humidity ranges) `[Data Lookup]` `[P1]`
- Durability metrics (lifespan, degradation factors) `[Data Lookup]` `[P2]`
- Material-level safety analysis `[Formula]` `[P0]`

## 4. Configuration Optimization
- Multi-objective optimization (weight, cost, defense, safety) `[AI-Assisted]` `[P1]`
- Constraint satisfaction (max weight, min defense, budget) `[AI-Assisted]` `[P1]`
- Material stack variations (layer order, thickness combinations) `[User Input]` `[P0]`
- Defense type trade-offs (which defenses for which threats) `[AI-Assisted]` `[P1]`
- Size optimization (interior space vs structural requirements) `[Formula]` `[P1]`
- Best configuration recommendations `[AI-Assisted]` `[P2]`

## 5. Economic & Sourcing
- Cost breakdown (materials, magnets, adhesives, per block/total) `[Formula]` `[P0]`
- Cost optimization (best value for requirements) `[AI-Assisted]` `[P1]`
- Vendor comparison (price, shipping, availability) `[AI/API]` `[Data Lookup]` `[P1]`
- Quantity discounts & bulk calculations `[Formula]` `[P1]`
- Price tracking (current, historical trends) `[AI/API][Logs/DB]` `[P2]`
- Best purchase recommendations (cost-effective magnet selection) `[AI-Assisted]` `[P1]`

**Tag Legend:**

| Tag | Category | Description |
|-----|----------|-------------|
| `[User Input]` | Data Source | User provides this value |
| `[Preset/Static]` | Data Source | Bundled with application, no external calls |
| `[API/Lookup]` | Data Source | Fetched from external sources/vendors |
| `[Calculated]` | Data Source | Computed by system using formulas/logic |
| `[Formula]` | Implementation | Mathematical calculation with known formula |
| `[Data Lookup]` | Implementation | Requires reference data or database query |
| `[AI-Assisted]` | Implementation | Complex optimization using AI/algorithms |
| `[PC:1]` | Complexity | 1 point - Trivial, minimal logic |
| `[PC:2]` | Complexity | 3 points - Simple, straightforward |
| `[PC:3]` | Complexity | 8 points - Moderate, multiple steps |
| `[PC:5]` | Complexity | 21 points - Complex, advanced logic |
| `[PC:9]` | Complexity | 45 points - Very complex, multiple systems |
| `[PC:18]` | Complexity | 95 points - Highly complex, major undertaking |
| `[PC:88]` | Complexity | Epic - Must be broken down into smaller tasks |
| `[MVP]` | Version | Minimum viable product for personal use |
| `[V1]` | Version | First sellable/shareable version |
| `[V2]` | Version | Enhanced version with additional features |
| `[V3+]` | Version | Future versions |
| `[P0]` | Priority | Must have for MVP |
| `[P1]` | Priority | Should have, high value |
| `[P2]` | Priority | Nice to have, future enhancement |

Make a plan for the type system for this, discuss options with me, ask any questions needed

I'd like to start with just the types, enums, interfaces, and model types before jumping into details of specific properties

# Content
- PasswordReconstructionMethods ( i.e. from different observation mediums )

# Data Requirements

**Purpose:** Defines some of the data the system needs to handle/track, but not all of it. Starts declaring domain models and relationships between data.

## User Configuration
- Structure dimensions `[User Input]`
- Material layer stack selections (toggle on/off) `[User Input]`
- Budget constraints `[User Input]` (optional)
- Priority preferences (cost, weight, defense, safety) `[User Input]` (optional)
- Block arrangement preferences `[User Input]`

## Materials & Components
**Purpose:** Physical materials and hardware specifications.
- Material definitions `[Preset/Static]`
- Material properties (density, tensile strength, fire rating, cost/sqft) `[Preset/Static]`
- Material layer stack templates `[Preset/Static]`
- Block type definitions `[Preset/Static]`
- Magnet specifications `[Preset/Static]` `[API/Lookup]`

## Security Model
**Purpose:** Threat modeling and defense classification.
- Threat types `[Preset/Static]`
- Threat levels `[Preset/Static]`
- Observation mediums (with frequency ranges) `[Preset/Static]`
- Observation methods `[Preset/Static]`
- Password reconstruction methods `[Preset/Static]`
- Defense type definitions `[Preset/Static]`
- Defense effectiveness mappings `[Preset/Static]`

## Vendor & Pricing
**Purpose:** External market data for sourcing.
- Current vendor pricing `[API/Lookup]`
- Product availability/inventory status `[API/Lookup]`
- Vendor comparison data `[API/Lookup]`

## Calculated Results
**Purpose:** Computed outputs from system logic.
- Total cost (materials, magnets, adhesives) `[Calculated]`
- Block count required `[Calculated]`
- Total weight (by block type, total structure) `[Calculated]`
- Structural stability scores `[Calculated]`
- Defense effectiveness ratings `[Calculated]`
- Safety ratings `[Calculated]`
- Optimization recommendations `[Calculated]` `[AI-Assisted]`

# Key Questions & Requirements Mapping

**Purpose:** Cheat sheet connecting original questions to technical requirements. Maps real-world questions (e.g., "Which magnet should I buy?") to specific Business Logic calculations and Requirements categories. Use this to verify the system answers all critical questions.

## Magnet Selection Questions → `[Sourcing Requirements]` + `[Magnet Physics]`
- Which magnet shape provides best connection strength? (square, rectangular, cylindrical) `[P1]`
- How do different shapes compare in pull force & direction? `[P1]`
- Which magnet polarity configuration is optimal? `[P2]`
- Which specific magnets should I use for this design? `[P0]`
- What's the most cost-effective magnet option? `[P0]`

## Connection Strength Questions → `[Validation Requirements]` + `[Magnet Physics]`
- What's the safe magnet spacing from foam edge? `[P0]`
- Will foam tear before glue fails? (foam tensile strength vs adhesive strength) `[P0]`
- Can magnet pull through the foam thickness? `[P0]`
- What's the tear point threshold for foam + magnet combination? `[P0]`

## Material Selection Questions → `[Sourcing Requirements]` + `[Material Properties]`
- Which adhesive/glue should I use? `[P0]`
- What are the adhesive strength requirements? `[P0]`

## Configuration Validation Questions → `[Analysis Requirements]` + `[Safety]`
- Will current arrangement support all defense types? `[P0]`
- What are the defense weaknesses in this configuration? `[P1]`
- Is structural support needed for ceiling/walls? `[P0]`
- Will ceiling sag with current design? `[P0]`

# Considerations / Things likely to change
- Structure of the blocks is likely to change in the future.
- Structure of the enclosure is likely to change in the future.
- I may add additional methods of support
- I may add electrical flow/electricity to the system
- I will want to use AI to assist with calculations and configurations
- I may change the shape of the blocks
- I may change the material the blocks are made of
- I may change the purpose the structure entirely
- Likely to add internationalization & multiple metrics

# Possibile Goals But Not The Primary Target
- I may want to be able to interchange the material used for the container such as the foam itself, maybe this is steel or wood, or something else. 

# Open Questions
- What do I need to actually visualize versus what do I need to rely on AI for? I Think I'd like a combination approach in order to verify accuracy and have someone else approve etc


# Process
- [] Plan Types/Interfaces/Models/Domains
    Phases: Work together to determine options for, and relationships between:
    - Domain Models
    - types, enums, interfaces, and model types
    - Fields for the classes
    - Math for models
    - Key calculations & derived properties
    - Validation Rules
    - Relationships / Relationship Hierarchy
- [] Plan Configurations, Variations, and Data ( before or after below ? )
- [] Plan Business Logic ( before or after above ? )

# Responses


