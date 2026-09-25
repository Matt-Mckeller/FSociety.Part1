/**
 * Shared Types for Lottie Studio
 * These types are shared between frontend and backend
 */

// =============================================================================
// Processing Status & Phases
// =============================================================================

export type ProcessingStatus =
  | 'UPLOADED'
  | 'ANALYZING_METADATA'
  | 'METADATA_COMPLETE'
  | 'NAMING_ELEMENTS'
  | 'ELEMENTS_COMPLETE'
  | 'GENERATING_THEMES'
  | 'THEMES_COMPLETE'
  | 'EXPORTED'
  | 'ERROR';

export type ProcessingPhase =
  | 'INITIALIZATION'
  | 'METADATA_ANALYSIS'
  | 'ELEMENT_NAMING'
  | 'THEME_GENERATION'
  | 'EXPORT'
  | 'COMPLETE'
  | 'ERROR';

export type ThemeMode = 'light' | 'dark';

// =============================================================================
// Lottie Animation Types
// =============================================================================

export interface LottieAnimation {
  id: string;
  name: string;
  filePath?: string;
  json: LottieData | Record<string, any>;
  status: ProcessingStatus;
  metadata?: LottieMetadata;
  elements?: LottieElement[];
  themes?: LottieTheme[];
  hints?: LottieHints;
  createdAt: Date;
  updatedAt: Date;
}

export interface LottieData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm?: string;
  layers: any[];
  assets?: any[];
  [key: string]: any;
}

export interface LottieHints {
  name?: string;
  description?: string;
  purpose?: string;
  tags?: string[];
}

// =============================================================================
// Metadata Types
// =============================================================================

export interface LottieMetadata {
  animationName: string;
  alternativeNames?: string[];
  description: string;
  tags: string[];
  recommendations: MetadataRecommendations;
}

export interface MetadataRecommendations {
  recommendedColorPalettes: string[];
  elementGroups: {
    logicalGrouped: Record<string, ElementGroup>;
    sharedColor: Record<string, ColorGroup>;
    themingPriority: Record<string, PriorityGroup>;
    visualHierarchy: Record<string, HierarchyGroup>;
  };
  optionalAiContext: Record<string, string>;
  optionalAiStylePrompts: Record<string, string>;
  optionalAiVariantPrompts?: Record<string, string>;
}

export interface ElementGroup {
  elements: string[];
  description: string;
}

export interface ColorGroup {
  elements: string[];
  description: string;
  colorRelationship: 'identical' | 'complementary' | 'gradient' | 'shades' | string;
}

export interface PriorityGroup {
  elements: string[];
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface HierarchyGroup {
  elements: string[];
  description: string;
  hierarchy: 'primary' | 'secondary' | 'accent' | 'background' | string;
}

// =============================================================================
// Element Types
// =============================================================================

export interface LottieElement {
  name: string;
  path: string;
  description: string;
  alternativeNames?: string[];
  originalColor: string | GradientColorStop[] | null;
  elementType?: ElementType;
  roleFunction?: RoleFunction;
  visualLevel?: VisualLevel;
  semanticRole?: SemanticRole;
  isThemeable: boolean;
  tags?: string[];
}

export type ElementType = 
  | 'fill' 
  | 'stroke' 
  | 'gradient' 
  | 'layer' 
  | 'group' 
  | 'transform' 
  | 'effect' 
  | 'mask';

export type RoleFunction =
  | 'primary_subject'
  | 'supporting_object'
  | 'background'
  | 'particle'
  | 'ui_indicator'
  | 'lighting'
  | 'text'
  | 'decoration';

export type VisualLevel = 'primary' | 'secondary' | 'tertiary' | 'hidden';

export type SemanticRole =
  | 'illustrative_object'
  | 'decorative_element'
  | 'motion_cue'
  | 'structural_group'
  | 'textual_element'
  | 'interactive_component'
  | 'effect';

export interface GradientColorStop {
  offset: number;
  color: string;
}

// =============================================================================
// Theme Types
// =============================================================================

export interface LottieTheme {
  themeId: string;
  name: string;
  description: string;
  baseColor: string;
  mode: ThemeMode;
  colors: Record<string, string>;
  skippedElements: string[];
  reasoning?: string;
}

export interface ColorPalette {
  id: string;
  baseColor: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'teal';
  mode: ThemeMode;
  name: string;
  colors: {
    primaryMain: string;
    primaryDark: string;
    primaryLight: string;
    primaryHighSat: string;
    primaryExtra1?: string;
    primaryExtra2?: string;
    secondaryMain: string;
    secondaryLight: string;
    secondaryDark: string;
    backgroundDefault: string;
    backgroundPaper: string;
    textPrimary: string;
    textSecondary: string;
    black: string;
    white: string;
    gray: string;
    gradientStart: string;
    gradientEnd: string;
  };
}

// =============================================================================
// Progress Types
// =============================================================================

export interface ProcessingProgress {
  animationId: string;
  phase: ProcessingPhase;
  progress: number;
  message: string;
  details?: Record<string, any>;
}

export interface BatchProgressUpdate {
  batchId: string;
  currentAnimation: string;
  currentStep: string;
  animationsCompleted: number;
  totalAnimations: number;
  progress: number;
  message: string;
}

// =============================================================================
// Export Types
// =============================================================================

export interface ExportResult {
  success: boolean;
  files: ExportedFile[];
  errors?: string[];
}

export interface ExportedFile {
  filename: string;
  path: string;
  content?: string;
  type: ExportFileType;
}

export type ExportFileType =
  | 'SCHEMA'
  | 'COMPONENT'
  | 'THEME_CONFIGS'
  | 'THEMES_REGISTRY'
  | 'LOTTIE_JSON';

export interface ExportOptions {
  includeSchema: boolean;
  includeComponent: boolean;
  includeThemeConfigs: boolean;
  includeThemesRegistry: boolean;
  includeLottieJson: boolean;
  targetDirectory?: string;
}

// =============================================================================
// Batch Processing Types
// =============================================================================

export interface BatchProcessOptions {
  generateMetadata?: boolean;
  generateNames?: boolean;
  generateThemes?: boolean;
  themeColors?: string[];
  saveToFilesystem?: boolean;
  skipExisting?: boolean;
}

export interface BatchProcessResult {
  total: number;
  successful: number;
  failed: number;
  skipped: number;
  results: BatchAnimationResult[];
  totalDurationMs: number;
}

export interface BatchAnimationResult {
  name: string;
  status: 'success' | 'error' | 'skipped';
  message?: string;
  filesCreated?: string[];
  durationMs?: number;
}

export interface AvailableAnimation {
  name: string;
  hasSchema: boolean;
  hasJson: boolean;
  needsMigration: boolean;
}
