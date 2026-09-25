/**
 * TypeScript Types for Lottie Naming Tool
 */

// Import AI naming types from separate file
export * from "./aiNaming"
import type {
  GradientColorStop,
  RoleFunction,
  VisualLevel,
  SemanticRole,
  ElementType,
  AINamingResponse,
} from "./aiNaming"

// ============================================================================
// Lottie JSON Structure Types
// ============================================================================

export interface LottieData {
  v: string
  fr: number
  ip: number
  op: number
  w: number
  h: number
  nm?: string
  layers: LottieLayer[]
  assets?: any[]
  [key: string]: any
}

export interface LottieLayer {
  nm?: string
  ind?: number
  ty?: number
  shapes?: LottieShape[]
  layers?: LottieLayer[]
  ks?: any
  ef?: LottieEffect[]
  masksProperties?: LottieMask[]
  [key: string]: any
}

export interface LottieShape {
  ty: string
  nm?: string
  it?: LottieShape[]
  c?: any
  g?: LottieGradient
  [key: string]: any
}

export interface LottieGradient {
  p: number
  k: any
  [key: string]: any
}

export interface LottieEffect {
  nm?: string
  ty: number
  ef?: any[]
  [key: string]: any
}

export interface LottieMask {
  nm?: string
  mode: string
  pt: any
  inv?: boolean
  [key: string]: any
}

export const COMPONENT_LEVELS = {
  COMPOSITION: 1,
  LAYER: 2,
  SHAPE_GROUP: 3,
  SHAPE_ELEMENT: 4,
  FILL_STROKE: 5,
  TRANSFORM: 6,
  MASK: 7,
  ASSET: 8,
  EFFECT: 9,
} as const

export type ComponentLevel =
  (typeof COMPONENT_LEVELS)[keyof typeof COMPONENT_LEVELS]

// ============================================================================
// Component Analysis Types
// ============================================================================

export interface ComponentNode {
  id: string
  path: string
  level: ComponentLevel
  type: string
  currentName?: string
  suggestedName?: string
  approved: boolean
  isThemeable: boolean

  // AI metadata
  originalColor?: string | GradientColorStop[] | null
  roleFunction?: RoleFunction
  visualLevel?: VisualLevel
  semanticRole?: SemanticRole
  elementType?: ElementType
  needsName?: boolean // AI recommends adding name in After Effects

  children: ComponentNode[]
  context: ComponentContext
}

export interface ComponentContext {
  containsShapes?: string[]
  hasFills?: boolean
  hasStrokes?: boolean
  hasGradients?: boolean
  parent?: string
  visualDescription?: string
  colorInfo?: {
    hasColor: boolean
    isGradient: boolean
    stopCount?: number
  }
}

export interface ComponentAnalysis {
  path: string
  currentName?: string
  type: string
  level: ComponentLevel
  context: ComponentContext
}

// ============================================================================
// Upload & Context Types
// ============================================================================

export interface UploadContext {
  name: string
  description?: string
  purpose?: string
  sourcePath?: string // Full path to the lottie directory
}

export interface AnimationContext extends UploadContext {
  components: ComponentNode[]
  lottieData: LottieData
  totalFrames: number
  frameRate: number
  duration: number
}

// ============================================================================
// Vision Mode Types
// ============================================================================

export interface CaptureOptions {
  count?: number
  method?: "smart" | "evenly"
}

export interface CapturedFrame {
  index: number
  time: number
  base64: string
  blob: Blob
}

export interface SaveContext {
  animationName: string
  capturedAt?: Date
}

export interface ScreenshotMetadata {
  animationName: string
  capturedAt: string
  frameCount: number
  frames: Array<{
    index: number
    time: number
    filename: string
  }>
}

// ============================================================================
// Claude API Types
// ============================================================================

export interface NamingRequest {
  animationName: string
  description?: string
  purpose?: string
  lottieData: LottieData // Send the whole Lottie JSON
  visionMode: boolean
  frames?: CapturedFrame[]
}

export interface ThemeableLayoutConfig {
  [name: string]:
    | {
        /** Unique identifier and suggested name (nm in JSON) */
        name: string
        /** Lottie property path to the color or gradient (e.g., layers[2].shapes[0].it[1].c.k) */
        path: string
        /** The original color value (hex string or gradient stops array) */
        originalColor?: string | GradientColorStop[]
        /** Variant of the element (e.g., "Outer", "Inner") */
        variant?: string
        /** Element type (e.g., "fill", "stroke", "gradient") */
        elementType?:
          | "fill"
          | "stroke"
          | "gradient"
          | "group"
          | "layer"
          | "effect"
          | "transform"
          | "unknown"
        /** Current name in the Lottie file (if any) */
        currentName?: string
        /** Role function - core purpose of element in animation */
        roleFunction?: RoleFunction
        /** Visual level - importance hierarchy */
        visualLevel?: VisualLevel
        /** Semantic role - semantic categorization */
        semanticRole?: SemanticRole
        /** Whether this element needs a name in After Effects */
        needsName?: boolean
        /** Whether this element is themeable */
        isThemeable?: boolean
      }
    | {
        /** Animation description metadata */
        _metadata: {
          /** Short description of the animation */
          short: string
          /** Detailed description of the animation */
          detailed: string
          /** Visual characteristics of the animation */
          visualCharacteristics: string[]
        }
      }
}

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationIssue {
  path: string
  level: ComponentLevel
  currentName?: string
  issueType: "unnamed" | "generic" | "convention" | "themeable"
  severity: "error" | "warning" | "info"
  message: string
  suggestion?: string
}

export interface ValidationSummary {
  themeableNamed: number
  themeableTotal: number
  layersNamed: number
  layersTotal: number
  genericNamesFound: number
  overallStatus: "PASS" | "WARNING" | "FAIL"
  completionRate: number
}

export interface ValidationReport {
  animationId: string
  validatedAt: string
  summary: ValidationSummary
  issues: ValidationIssue[]
}

// ============================================================================
// Export Types
// ============================================================================

export interface ExportOptions {
  includeJSON: boolean // Full renamed Lottie JSON
  includeScreenshots: boolean
  includeThemeableLayoutConfig?: boolean // ThemeableLayoutConfig format
  minifyJSON?: boolean // Whether to minify the JSON output
  // Theme generation options
  generateThemes?: boolean // Generate TypeScript theme files
  generateComponent?: boolean // Generate React component using factory
  themeVariant?: string // Variant name for themes (default: "default")
}

export interface ExportPackage {
  json?: Blob
  mappings?: Blob
  screenshots?: Blob[]
  themeTemplate?: Blob
}

// ============================================================================
// Tool State Types
// ============================================================================

export interface NamingToolState {
  // Upload state
  uploadContext?: UploadContext
  lottieData?: LottieData
  animationContext?: AnimationContext

  // Source tracking for proper export location
  lottieSource?: {
    type: "uploaded" | "existing"
    directoryPath?: string // For existing: /Users/mm/Projects/.../lotties/AnimationName/
  }

  // Component state
  componentTree?: ComponentNode[]
  selectedComponent?: string

  // Vision state
  visionMode: boolean
  capturedFrames?: CapturedFrame[]
  screenshotPath?: string

  // AI state
  isGenerating: boolean
  aiNamingResponse?: AINamingResponse
  metadataResponse?: import("expanse.dynamicAssets").ExpanseLottieMetadata
  streamingText?: string
  useMultiPhase: boolean // Feature flag to toggle between simple and multi-phase mode
  aiProvider: "claude" | "gemini" // AI provider selection

  // Progress tracking
  analysisProgress?: number
  currentPhase?: string
  progressMessage?: string

  // Testing mode
  testingMode: boolean // Use cached AI responses instead of real API calls

  // Validation state
  validationReport?: ValidationReport

  // UI state
  expandedPaths: Set<string>
  isExporting: boolean
  error?: string
}

// ============================================================================
// Lottie Player Types
// ============================================================================

export interface LottiePlayerRef {
  play: () => void
  pause: () => void
  stop: () => void
  setSpeed: (speed: number) => void
  goToAndStop: (frame: number, isFrame?: boolean) => void
  goToAndPlay: (frame: number, isFrame?: boolean) => void
  setDirection: (direction: 1 | -1) => void
  playSegments: (
    segments: [number, number] | [number, number][],
    forceFlag?: boolean,
  ) => void
  destroy: () => void
  getDuration: (inFrames?: boolean) => number
  addEventListener: (name: string, callback: () => void) => void
  removeEventListener: (name: string, callback: () => void) => void
}
