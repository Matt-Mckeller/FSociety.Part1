# Shield4 - App Architecture

**Last Updated:** April 10, 2026  
**Status:** Ready to Build  
**Stack:** TypeScript, React, Next.js, MUI

> Future expansion: "Tutorial Island" — Ocean cities & global infrastructure (different physics, different tiles)

---

## 🎯 Goals (What This App Does)

### Primary Goals
1. **Validate Designs** — Will my enclosure work before I buy parts?
2. **Calculate Costs** — How much will this cost? Show me a shopping list
3. **Educate on Threats** — What attacks exist? What do I need protection from?
4. **Sell Products** — E-commerce ready configurator

### Secondary Goals
- Visual 3D-ish block/enclosure previews
- Compare configurations side-by-side
- Generate shopping lists with vendor links

---

## 📱 Pages / Views

```
┌─────────────────────────────────────────────────────────────┐
│                       SHIELD4 PAGES                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🏠 HOME                                                    │
│  └─ Hero + value prop + CTA to templates                   │
│                                                             │
│  📦 TEMPLATES (Primary Entry Point)                         │
│  ├─ /templates              → Gallery of preset configs    │
│  ├─ /templates/[id]         → Template detail + customize  │
│  └─ /templates/compare      → Side-by-side comparison      │
│                                                             │
│  🛡️ THREATS (Education)                                    │
│  ├─ /threats/by-distance    → Satellite, tower, van...     │
│  ├─ /threats/by-type        → EM, thermal, acoustic...     │
│  ├─ /threats/actors         → Civilian, corp, govt...      │
│  └─ /threats/defenses       → How each material protects   │
│                                                             │
│  🧱 CONFIGURE (Advanced/Custom)                             │
│  ├─ /configure/structure    → Set dimensions (LxWxH)       │
│  ├─ /configure/blocks       → Edit block layer stacks      │
│  ├─ /configure/magnets      → Magnet placement/safety      │
│  └─ /configure/door         → Entry point design           │
│                                                             │
│  ✅ VALIDATE                                                │
│  ├─ /validate/structural    → Weight, sag, stability       │
│  ├─ /validate/magnets       → Pull force, foam tear        │
│  ├─ /validate/defense       → Coverage per threat type     │
│  └─ /validate/summary       → Pass/Fail dashboard          │
│                                                             │
│  💰 PURCHASE                                                │
│  ├─ /purchase/breakdown     → Cost per component           │
│  ├─ /purchase/shopping-list → Parts list with links        │
│  └─ /purchase/checkout      → Buy preconfigured kits       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Components

### Layout Components
| Component | Description |
|-----------|-------------|
| `AppShell` | Main layout with nav, sidebar |
| `NavBar` | Top navigation |
| `Sidebar` | Context-sensitive side panel |
| `PageHeader` | Page title + breadcrumbs |

### Threat Visualization Components
| Component | Description |
|-----------|-------------|
| `ThreatDistanceVisualizer` | Visual showing threat ranges (satellite → neighbor) |
| `ThreatTypeCard` | Card showing a threat type + its attack methods |
| `ThreatActorMatrix` | Grid: actors vs capabilities |
| `DefenseMechanismCard` | How a defense works + materials used |
| `FrequencySpectrumChart` | EM spectrum with blocking coverage |

### Configuration Components
| Component | Description |
|-----------|-------------|
| `StructureDimensionInput` | L × W × H sliders/inputs |
| `BlockTypeSelector` | Choose ceiling/wall/floor/door blocks |
| `LayerStackEditor` | Toggle material layers on/off |
| `MagnetConfigurator` | Spacing, depth, quantity controls |
| `DoorDesigner` | Entry type selector + seal visualization |

### Block Visualization Components
| Component | Description |
|-----------|-------------|
| `BlockPreview3D` | Isometric block visualization |
| `BlockCrossSection` | Side-view layer diagram |
| `BlockLayerBreakdown` | List of layers with properties |
| `MagnetPlacementOverlay` | Shows magnet positions on block |

### Structure Visualization Components
| Component | Description |
|-----------|-------------|
| `StructurePreview3D` | Full enclosure isometric view |
| `StructureExplodedView` | Blocks separated to show assembly |
| `WallLayoutGrid` | Top-down grid of block positions |
| `StructureCrossSection` | Full structure slice view |

### Validation Components
| Component | Description |
|-----------|-------------|
| `ValidationDashboard` | Pass/fail summary with categories |
| `StructuralAnalysisCard` | Weight, stability, sag metrics |
| `MagnetSafetyCard` | Pull force vs tear strength |
| `DefenseEffectivenessChart` | Coverage by threat type |
| `ValidationWarning` | Alert for failed checks |

### Purchase Components
| Component | Description |
|-----------|-------------|
| `CostBreakdownTable` | Per-component cost grid |
| `ShoppingListView` | Grouped parts with vendor links |
| `PartCard` | Individual part: image, specs, price, link |
| `BudgetSlider` | Adjust budget, see impact on config |

### Template Components
| Component | Description |
|-----------|-------------|
| `TemplateGallery` | Grid of preset configurations |
| `TemplateCard` | Preview card: name, image, cost, defense level |
| `TemplateComparison` | Side-by-side template comparison |
| `TemplateCustomizer` | Modify a template's settings |

### Shared / Utility Components
| Component | Description |
|-----------|-------------|
| `MetricCard` | Single value card (cost, weight, score) |
| `ComparisonTable` | Side-by-side config comparison |
| `Slider` | Custom slider with unit display |
| `InfoTooltip` | Hover explanations |
| `UnitToggle` | Imperial ↔ Metric switch |

---

## 📁 Folder Structure

```
/privacy/business/app/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx            # Home
│   │   ├── templates/          # Primary entry point
│   │   │   ├── page.tsx        # Template gallery
│   │   │   ├── [id]/           # Template detail
│   │   │   └── compare/        # Side-by-side
│   │   ├── threats/
│   │   │   ├── by-distance/
│   │   │   ├── by-type/
│   │   │   ├── actors/
│   │   │   └── defenses/
│   │   ├── configure/          # Advanced/custom
│   │   │   ├── structure/
│   │   │   ├── blocks/
│   │   │   ├── magnets/
│   │   │   └── door/
│   │   ├── validate/
│   │   │   ├── structural/
│   │   │   ├── magnets/
│   │   │   ├── defense/
│   │   │   └── summary/
│   │   └── purchase/
│   │       ├── breakdown/
│   │       ├── shopping-list/
│   │       └── checkout/
│   │
│   ├── components/
│   │   ├── layout/             # AppShell, NavBar, Sidebar
│   │   ├── templates/          # Template gallery, cards, comparison
│   │   ├── threats/            # Threat visualization components
│   │   ├── configure/          # Configuration components
│   │   ├── blocks/             # Block visualization
│   │   ├── structure/          # Structure visualization
│   │   ├── validate/           # Validation components
│   │   ├── purchase/           # Purchase components
│   │   └── shared/             # Reusable utilities
│   │
│   ├── models/                 # TypeScript interfaces & types
│   │   ├── threats.ts
│   │   ├── materials.ts
│   │   ├── magnets.ts
│   │   ├── blocks.ts
│   │   ├── structure.ts
│   │   ├── validation.ts
│   │   └── purchase.ts
│   │
│   ├── data/                   # Static JSON data
│   │   ├── threats.json
│   │   ├── materials.json
│   │   ├── magnets.json
│   │   ├── vendors.json
│   │   └── templates.json      # Preset configurations (primary UX)
│   │
│   ├── lib/                    # Calculations & utilities
│   │   ├── formulas/
│   │   │   ├── magnetic.ts     # Magnetic force calculations
│   │   │   ├── structural.ts   # Weight, sag, stability
│   │   │   ├── shielding.ts    # EMF attenuation
│   │   │   └── thermal.ts      # Thermal calculations
│   │   ├── validation/
│   │   │   ├── structural.ts
│   │   │   ├── magnet-safety.ts
│   │   │   └── defense.ts
│   │   └── utils/
│   │       ├── units.ts        # Unit conversion
│   │       └── cost.ts         # Cost calculations
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useConfiguration.ts
│   │   ├── useValidation.ts
│   │   └── useComparison.ts
│   │
│   └── stores/                 # State management (Zustand)
│       ├── configStore.ts
│       └── comparisonStore.ts
│
├── public/
│   └── images/
│
├── package.json
├── tsconfig.json
└── next.config.js
```

---

## 📊 Data Models (Core Types)

### Threats
```typescript
interface ThreatType {
  id: string;
  name: string;                    // "Electromagnetic", "Thermal", etc.
  icon: string;
  description: string;
  observationMethods: ObservationMethod[];
  defenses: DefenseType[];
}

interface ThreatActor {
  id: string;
  name: string;                    // "Civilian", "Corporate", "Government"
  tier: 1 | 2 | 3;
  capabilities: ObservationMethod[];
  equipment: string[];
}

interface ThreatDistance {
  id: string;
  name: string;                    // "Satellite", "Radio Tower", "Van", "Neighbor"
  rangeMeters: { min: number; max: number };
  applicableMethods: ObservationMethod[];
  accuracy: number;                // 0-100%
}
```

### Materials
```typescript
interface Material {
  id: string;
  name: string;                    // "Foamular XPS", "Faraday Fabric"
  category: "structural" | "shielding" | "thermal" | "acoustic";
  properties: {
    density: number;               // kg/m³
    thickness: number;             // mm
    costPerSqFt: number;
    fireRating: string;
    shieldingDb?: number;          // dB at 1GHz
    thermalResistance?: number;    // R-value
    acousticNRC?: number;          // Noise Reduction Coefficient
  };
  vendors: VendorLink[];
}

interface LayerStack {
  id: string;
  name: string;                    // "Standard Security", "Maximum Defense"
  layers: Material[];              // Ordered from outside to inside
  totalThickness: number;          // mm (calculated)
  totalCostPerSqFt: number;        // $ (calculated)
  totalWeight: number;             // kg/m² (calculated)
}
```

### Magnets
```typescript
interface Magnet {
  id: string;
  name: string;                    // "N52 Neodymium Block 3/16×3/16×1/2"
  shape: "block" | "cylinder" | "disc" | "ring";
  grade: string;                   // "N52", "N42"
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
    diameter?: number;
  };
  pullForce: number;               // lbs
  weight: number;                  // grams
  price: number;                   // $ per unit
  vendor: VendorLink;
}

interface MagnetConfiguration {
  magnetId: string;
  spacing: number;                 // inches from edge
  countPerEdge: number;
  depth: number;                   // inches into foam
  orientation: "horizontal" | "vertical";
}
```

### Blocks
```typescript
interface Block {
  id: string;
  type: "ceiling" | "wall" | "floor" | "corner" | "door-frame";
  dimensions: {
    length: number;                // inches
    width: number;
    height: number;
  };
  layerStack: LayerStack;
  magnetConfig: MagnetConfiguration;
  weight: number;                  // lbs (calculated)
  cost: number;                    // $ (calculated)
  defenseRatings: DefenseRating[];
}

interface DefenseRating {
  threatType: string;
  effectiveness: number;           // 0-100%
  attenuation?: number;            // dB
}
```

### Structure
```typescript
interface Structure {
  id: string;
  name: string;
  dimensions: {
    length: number;                // ft
    width: number;
    height: number;
  };
  blocks: PlacedBlock[];
  door: DoorConfiguration;
  totalCost: number;               // calculated
  totalWeight: number;             // calculated
  overallDefense: DefenseRating[];
}

interface PlacedBlock {
  blockId: string;
  position: { wall: "north" | "south" | "east" | "west" | "ceiling" | "floor"; x: number; y: number };
  rotation: 0 | 90 | 180 | 270;
}

interface DoorConfiguration {
  type: "magnetic-panel" | "double-curtain" | "vestibule";
  position: { wall: string; x: number };
  width: number;
  height: number;
  sealMethod: string;
}
```

### Validation
```typescript
interface ValidationResult {
  category: "structural" | "magnet" | "defense" | "fire";
  status: "pass" | "warn" | "fail";
  score: number;                   // 0-100
  safetyFactor: number;            // 2x minimum
  details: string;
  recommendations?: string[];
}

interface ValidationSummary {
  overall: "pass" | "fail";
  results: ValidationResult[];
  criticalIssues: string[];
  warnings: string[];
}
```

### Purchase
```typescript
interface ShoppingListItem {
  partId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  vendor: VendorLink;
  category: "material" | "magnet" | "adhesive" | "tool";
}

interface VendorLink {
  name: string;                    // "Amazon", "K&J Magnetics"
  url: string;
  priceLastUpdated: string;
}
```

### Templates (Primary UX)
```typescript
interface Template {
  id: string;
  name: string;                    // "Budget Build", "Max Security", "Balanced"
  description: string;
  tier: "budget" | "standard" | "premium" | "enterprise";
  thumbnail: string;
  structure: Structure;            // Pre-configured structure
  highlights: string[];            // "Best value", "Military-grade", etc.
  estimatedCost: { min: number; max: number };
  defenseLevel: 1 | 2 | 3 | 4 | 5;
  recommended?: boolean;
}
```

---

## 🚀 Build Order (Suggested Phases)

### Phase 1: Foundation
- [ ] Project setup (Next.js + MUI + TypeScript)
- [ ] Data models (types/interfaces)
- [ ] Static JSON data (materials, magnets, threats)
- [ ] Basic layout (AppShell, Nav)

### Phase 2: Threat Education
- [ ] Threat by distance page
- [ ] Threat by type page
- [ ] Defense mechanisms page

### Phase 3: Configuration Core
- [ ] Structure dimension input
- [ ] Block type selector
- [ ] Layer stack editor
- [ ] Block preview visualization

### Phase 4: Validation
- [ ] Structural validation (weight, stability)
- [ ] Magnet safety validation
- [ ] Defense effectiveness
- [ ] Validation dashboard

### Phase 5: Purchase Flow
- [ ] Cost breakdown
- [ ] Shopping list generation
- [ ] Vendor links

### Phase 6: Polish
- [ ] Comparison workspace
- [ ] 3D-ish visualizations
- [ ] Presets/templates
- [ ] E-commerce integration

---

## ✅ Decisions Made

| Question | Decision |
|----------|----------|
| App name | **Shield4** |
| Visualization | **2D + 3D** (flexible, depends on context) |
| Flow | Threats → Configure → Validate → Purchase |
| UX approach | **Templates first** — Users pick presets, can customize if needed |
| Future expansion | "Tutorial Island" — Ocean cities, global infrastructure |

---

**Ready to build. Let's go.**
