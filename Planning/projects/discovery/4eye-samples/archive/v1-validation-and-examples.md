# Goal
- Validate possibilities of 4eye, explore edge cases and see when it might not work and when it might work


# Strategy
- Get example dialogs from varying classes, 1-5 minute segments, varying grade levels, and subjects. 
- Utilize prompts in copilot to summarize these
- Utilize prompts in copilot to turn these into visuals
- Utilize prompts in copilot to turn these into multimodal learning variations
- Determining when is appropriate / Assessing if its content worthy of visualization or other modals for learning

# Prompt
Give me some example dialog text extracted from lesson content from varying classes, focus on 1-5 minute segments, varying grade levels, and subjects

# Process
- 1) Get Example Dialogs / Input Content options
- 2) Get Text Responses from AI (with visualization suggestions)
- 3) Utilize AI to generate images / visuals based on text responses from ai

# Types
```typescript
// ============================================================================
// ENUMS & CONSTANTS
// ============================================================================

enum GradeLevel {
  ELEMENTARY_K2 = 'elementary_k2',
  ELEMENTARY_35 = 'elementary_35',
  MIDDLE_SCHOOL = 'middle_school',
  HIGH_SCHOOL = 'high_school',
  COLLEGE = 'college',
  GRADUATE = 'graduate',
  PROFESSIONAL = 'professional'
}

enum Subject {
  MATHEMATICS = 'mathematics',
  SCIENCE = 'science',
  HISTORY = 'history',
  LITERATURE = 'literature',
  LANGUAGE_ARTS = 'language_arts',
  FOREIGN_LANGUAGE = 'foreign_language',
  COMPUTER_SCIENCE = 'computer_science',
  ART = 'art',
  MUSIC = 'music',
  PHYSICAL_EDUCATION = 'physical_education',
  SOCIAL_STUDIES = 'social_studies',
  ECONOMICS = 'economics',
  PHILOSOPHY = 'philosophy',
  PSYCHOLOGY = 'psychology',
  ENGINEERING = 'engineering',
  OTHER = 'other'
}

enum LearningModality {
  VERBAL = 'verbal',                      // Traditional text explanations
  VISUAL = 'visual',                      // Diagrams, charts, images
  NONVERBAL = 'nonverbal',               // Body language, gestures, demonstrations
  STORYTELLING = 'storytelling',          // Narrative-based explanations
  PROBLEM_SOLVING = 'problem_solving',    // Step-by-step problem approach
  ASSOCIATIONS = 'associations',          // Connecting to known concepts
  METAPHORS = 'metaphors',               // Analogies and comparisons
  KINESTHETIC = 'kinesthetic',           // Hands-on, movement-based
  AUDITORY = 'auditory',                 // Sound, rhythm, music
  LOGICAL = 'logical',                   // Structured, sequential reasoning
  SOCIAL = 'social',                     // Group discussion, peer learning
  EXPERIENTIAL = 'experiential'          // Real-world examples, case studies
}

enum InstructionalStrategy {
  CHUNKED = 'chunked',                   // Small bite-sized pieces
  STEP_BY_STEP = 'step_by_step',         // Sequential, incremental learning
  SCAFFOLDED = 'scaffolded',             // Build from simple to complex
  REPETITIVE = 'repetitive',             // Spaced repetition, review
  MULTI_SENSORY = 'multi_sensory',       // Engage multiple senses
  LAYERED = 'layered',                   // Progressive disclosure
  SUMMARIZED = 'summarized',             // Key points first
  DETAILED = 'detailed',                 // Comprehensive deep dive
  COMPARATIVE = 'comparative',           // Side-by-side comparisons
  EXPLORATORY = 'exploratory',           // Discovery-based learning
  GUIDED = 'guided',                     // Structured with support
  INDEPENDENT = 'independent'            // Self-directed learning
}

enum AccessibilityProfile {
  // Neurodiversity
  AUTISM_FRIENDLY = 'autism_friendly',           // Clear structure, predictable, literal
  ADHD_OPTIMIZED = 'adhd_optimized',            // Short bursts, high engagement, minimal distraction
  DYSLEXIA_FRIENDLY = 'dyslexia_friendly',      // Font choice, spacing, color overlays
  
  // Cognitive Needs
  POOR_WORKING_MEMORY = 'poor_working_memory',   // Reduce cognitive load, external memory aids
  SLOW_PROCESSING = 'slow_processing',           // Extra time, no time pressure, clear pacing
  EXECUTIVE_FUNCTION = 'executive_function',     // Explicit organization, checklists, structure
  
  // Sensory Needs
  VISUALLY_IMPAIRED = 'visually_impaired',       // Screen reader compatible, high contrast
  HEARING_IMPAIRED = 'hearing_impaired',         // Captions, transcripts, visual alternatives
  SENSORY_SENSITIVE = 'sensory_sensitive',       // Reduced animations, calm colors, minimal stimulation
  
  // Communication Preferences
  VERBAL_FOCUSED = 'verbal_focused',             // Text-heavy, written explanations
  NONVERBAL_FOCUSED = 'nonverbal_focused',       // Image-heavy, minimal text, icons
  SIMPLIFIED_LANGUAGE = 'simplified_language',   // Plain language, short sentences
  TECHNICAL_LANGUAGE = 'technical_language',     // Precise terminology, detailed
  
  // General Accessibility
  WCAG_AAA = 'wcag_aaa',                        // Highest web accessibility standard
  REDUCED_MOTION = 'reduced_motion',            // Minimal or no animations
  HIGH_CONTRAST = 'high_contrast',              // Enhanced visual distinction
  KEYBOARD_ONLY = 'keyboard_only'               // Full keyboard navigation
}

enum CognitiveLoadLevel {
  MINIMAL = 'minimal',                   // Single focus, no distractions
  LOW = 'low',                          // Simple, straightforward
  MODERATE = 'moderate',                // Balanced complexity
  HIGH = 'high',                        // Complex, multi-faceted
  EXPERT = 'expert'                     // Dense, assumes background knowledge
}

enum ContentDensity {
  SPARSE = 'sparse',                    // Lots of white space, minimal text
  LIGHT = 'light',                      // Easy to scan
  MODERATE = 'moderate',                // Balanced
  DENSE = 'dense',                      // Information-rich
  ULTRA_DENSE = 'ultra_dense'           // Maximum information per screen
}

enum VisualizationType {
  // Basic types
  ASCII_ART = 'ascii_art',
  SVG_DIAGRAM = 'svg_diagram',
  ANIMATED_SVG = 'animated_svg',
  HTML_INTERACTIVE = 'html_interactive',
  HTML_STATIC = 'html_static',              // Non-interactive HTML diagrams
  MERMAID_DIAGRAM = 'mermaid_diagram',      // Mermaid.js diagrams (flowcharts, sequences, etc.)
  
  // Process & Flow
  FLOW_CHART = 'flow_chart',
  DECISION_TREE = 'decision_tree',
  STEP_SEQUENCE = 'step_sequence',
  CYCLIC_DIAGRAM = 'cyclic_diagram',
  MERMAID_FLOWCHART = 'mermaid_flowchart',  // Mermaid-specific flowchart
  MERMAID_SEQUENCE = 'mermaid_sequence',    // Mermaid sequence diagram
  
  // Time-based
  TIMELINE = 'timeline',
  TIMELINE_COMPARATIVE = 'timeline_comparative',
  
  // Relationship & Structure
  MIND_MAP = 'mind_map',
  CONCEPT_MAP = 'concept_map',
  NETWORK_GRAPH = 'network_graph',
  TREE_STRUCTURE = 'tree_structure',
  MERMAID_MINDMAP = 'mermaid_mindmap',      // Mermaid mindmap
  MERMAID_GITGRAPH = 'mermaid_gitgraph',    // Mermaid git graph (for version control concepts)
  MERMAID_ERD = 'mermaid_erd',              // Mermaid entity relationship diagram
  MERMAID_CLASS = 'mermaid_class',          // Mermaid class diagram
  
  // Data Visualization
  CHART_BAR = 'chart_bar',
  CHART_LINE = 'chart_line',
  CHART_PIE = 'chart_pie',
  CHART_AREA = 'chart_area',
  PROGRESS_BAR = 'progress_bar',
  METER = 'meter',
  MERMAID_PIE = 'mermaid_pie',              // Mermaid pie chart
  MERMAID_GANTT = 'mermaid_gantt',          // Mermaid Gantt chart (project timelines)
  
  // Comparison & Organization
  TABLE = 'table',
  COMPARISON_MATRIX = 'comparison_matrix',
  BEFORE_AFTER_SLIDER = 'before_after_slider',
  
  // Spatial & Visual
  INFOGRAPHIC = 'infographic',
  SPATIAL_DIAGRAM = 'spatial_diagram',
  LAYERED_REVEAL = 'layered_reveal',
  INTERACTIVE_DIAGRAM = 'interactive_diagram',
  MERMAID_STATE = 'mermaid_state',          // Mermaid state diagram (FSM)
  MERMAID_JOURNEY = 'mermaid_journey',      // Mermaid user journey map
  
  // Effects & Enhancements
  PARTICLE_SYSTEM = 'particle_system',
  TRANSFORMATION = 'transformation',
  TEXT_ANIMATION = 'text_animation',
  
  // Interactive Controls
  SLIDER_CONTROL = 'slider_control',
  ACCORDION = 'accordion',
  TABS = 'tabs',
  CAROUSEL = 'carousel',
  TOGGLE = 'toggle',
  
  // External Media
  IMAGE = 'image',
  VIDEO = 'video',
  THREE_D_MODEL = '3d_model',
  AUDIO = 'audio',
  
  // Text Enhancements
  ANNOTATED_TEXT = 'annotated_text',        // Text with inline explanations
  HIGHLIGHTED_TEXT = 'highlighted_text',    // Color-coded emphasis
  MARGIN_NOTES = 'margin_notes',           // Side notes and callouts
  TOOLTIP_DEFINITIONS = 'tooltip_definitions', // Hover for definitions
  
  // Novel/Creative Types
  COMIC_STRIP = 'comic_strip',             // Sequential art format
  EMOJI_DIAGRAM = 'emoji_diagram',         // Visual using emojis
  ASCII_ANIMATION = 'ascii_animation',     // Animated ASCII art
  CODE_PLAYGROUND = 'code_playground',     // Interactive code editor
  QUIZ_EMBEDDED = 'quiz_embedded',         // Inline quiz/questions
  FLASHCARD = 'flashcard',                 // Flip cards
  MEMORY_GAME = 'memory_game',             // Match pairs
  
  // AI/Custom
  AI_GENERATED = 'ai_generated',           // Novel AI-created visualization
  CUSTOM = 'custom',                       // Fully custom implementation
  HYBRID = 'hybrid'                        // Combination of multiple types
}

enum AnimationStyle {
  FADE = 'fade',
  SLIDE = 'slide',
  SCALE = 'scale',
  ROTATE = 'rotate',
  DRAW = 'draw',                        // SVG path drawing
  MORPH = 'morph',                      // Shape morphing
  BOUNCE = 'bounce',
  PULSE = 'pulse',
  WAVE = 'wave',
  PARTICLE = 'particle',
  SPRING = 'spring',
  NONE = 'none'
}

enum InteractionType {
  HOVER = 'hover',
  CLICK = 'click',
  DRAG = 'drag',
  SCROLL = 'scroll',
  TOUCH = 'touch',
  KEYBOARD = 'keyboard',
  AUTO_PLAY = 'auto_play',
  NONE = 'none'
}

enum ContentComplexity {
  VERY_SIMPLE = 'very_simple',           // ELI5 level
  SIMPLE = 'simple',
  MODERATE = 'moderate',
  COMPLEX = 'complex',
  VERY_COMPLEX = 'very_complex',
  EXPERT = 'expert'
}

enum ActionType {
  SEE_VARIANTS = 'see_variants',
  EXPLORE_MORE = 'explore_more',
  CONDENSE = 'condense',
  EXPAND = 'expand',
  CHANGE_MODALITY = 'change_modality',
  CHANGE_MEDIUM = 'change_medium',
  CHANGE_STRATEGY = 'change_strategy',   // Switch instructional approach
  SIMPLIFY = 'simplify',
  ELI5 = 'eli5',
  ADD_EXAMPLES = 'add_examples',
  SHOW_RESEARCH = 'show_research',
  QUIZ_ME = 'quiz_me',
  CREATE_FLASHCARDS = 'create_flashcards',
  VISUALIZE = 'visualize',
  RELATE_TO_ME = 'relate_to_me',         // Personal associations
  SHOW_APPLICATIONS = 'show_applications', // Real-world uses
  BREAK_INTO_CHUNKS = 'break_into_chunks', // Chunk content
  SHOW_STEP_BY_STEP = 'show_step_by_step', // Sequential breakdown
  ADJUST_ACCESSIBILITY = 'adjust_accessibility' // Change accessibility profile
}

// ============================================================================
// INPUT TYPES
// ============================================================================

interface DialogMetadata {
  // Time & Context
  timestamp?: Date;
  duration?: number;                     // Duration in seconds
  sessionId?: string;
  lessonId?: string;
  
  // Educational Context
  gradeLevel?: GradeLevel;
  subject?: Subject;
  topic?: string;
  lessonObjective?: string;
  
  // Classroom Context
  classSize?: number;
  teacherName?: string;
  schoolName?: string;
  isLive?: boolean;                      // Live vs recorded
  
  // Student Context
  studentId?: string;
  studentGradeLevel?: GradeLevel;
  studentLearningPreferences?: LearningModality[];
  studentAccessibilityNeeds?: AccessibilityRequirement[];
  studentAccessibilityProfiles?: AccessibilityProfile[]; // Specific profiles
  preferredInstructionalStrategies?: InstructionalStrategy[]; // How they learn best
  preferredCognitiveLoad?: CognitiveLoadLevel; // Comfort with complexity
  preferredContentDensity?: ContentDensity;    // Amount of info per screen
  
  // Content Flags
  hasVisualAids?: boolean;               // Teacher showed slides/demos
  hasQuestions?: boolean;                // Students asked questions
  hasDemonstration?: boolean;
  isReview?: boolean;
  isNewMaterial?: boolean;
  
  // Quality Metadata
  audioQuality?: 'poor' | 'fair' | 'good' | 'excellent';
  transcriptionConfidence?: number;      // 0-1 confidence score
}

interface AccessibilityRequirement {
  type: 'visual' | 'auditory' | 'cognitive' | 'motor' | 'reading';
  description?: string;
  accommodations?: string[];
}

interface ProcessingOptions {
  // What to generate
  includeSummary?: boolean;
  includeVariants?: boolean;
  includeLearningModalities?: LearningModality[];
  includeInstructionalStrategies?: InstructionalStrategy[];
  includeVisualizations?: boolean;
  includeVocabularyEnhancement?: boolean;
  includeRelatedResearch?: boolean;
  
  // How to process
  targetComplexity?: ContentComplexity;
  targetCognitiveLoad?: CognitiveLoadLevel;
  targetContentDensity?: ContentDensity;
  instructionalStrategy?: InstructionalStrategy;
  accessibilityProfiles?: AccessibilityProfile[]; // Apply specific accommodations
  maxVariants?: number;
  maxVisualizationSuggestions?: number;
  prioritizeRealtime?: boolean;          // Optimize for speed vs quality
  
  // Constraints
  maxResponseLength?: number;
  allowExternalLinks?: boolean;
  requireCitations?: boolean;
  chunkSize?: number;                    // Words per chunk if using chunked strategy
}

interface ExampleDialogInput {
  // Core Content
  content: string;                       // The actual dialog/transcript
  
  // Optional Rich Context
  metadata?: DialogMetadata;
  processingOptions?: ProcessingOptions;
  
  // For batch processing
  previousContext?: string[];            // Previous lesson segments
  nextContext?: string[];                // Upcoming segments (if known)
}

// ============================================================================
// OUTPUT TYPES
// ============================================================================

interface ContentSummary {
  // Core summaries at different lengths
  oneSentence: string;
  shortSummary: string;                  // 2-3 sentences
  detailedSummary: string;               // 1-2 paragraphs
  
  // Extracted elements
  keyPoints: string[];
  mainConcepts: string[];
  vocabulary: VocabularyItem[];
  questions: QuestionItem[];             // Questions asked in dialog
  
  // Meta analysis
  complexity: ContentComplexity;
  estimatedComprehension: number;        // 0-1 estimated understanding level
  suggestedFollowUp: string[];
}

interface VocabularyItem {
  term: string;
  definition: string;
  simplifiedDefinition?: string;
  exampleUsage?: string;
  relatedTerms?: string[];
  ageAppropriateLevel?: GradeLevel;
}

interface QuestionItem {
  question: string;
  askedBy: 'teacher' | 'student';
  answer?: string;
  timestamp?: number;
}

interface ContentVariant {
  id: string;
  modality: LearningModality;
  strategy?: InstructionalStrategy;      // How content is structured
  complexity: ContentComplexity;
  cognitiveLoad?: CognitiveLoadLevel;
  contentDensity?: ContentDensity;
  content: string;
  title: string;
  estimatedReadingTime?: number;         // In seconds
  
  // Metadata about the variant
  targetAudience?: GradeLevel[];
  accessibilityProfiles?: AccessibilityProfile[]; // Which profiles this suits
  strengths?: string[];                  // What this variant is good for
  bestFor?: string;                      // "Visual learners who need concrete examples"
  isChunked?: boolean;                   // Is content broken into small pieces
  chunkCount?: number;                   // How many chunks if applicable
}

interface VisualizationSuggestion {
  id: string;
  type: VisualizationType;
  title: string;
  description: string;                   // Why this visualization would help
  priority: 'low' | 'medium' | 'high' | 'critical';
  
  // What would be visualized
  conceptToVisualize: string;
  suggestedContent?: string;             // Prompt/description for generation
  
  // Animation & Interaction
  suggestedAnimations?: AnimationStyle[];
  suggestedInteractions?: InteractionType[];
  autoPlay?: boolean;
  loopAnimation?: boolean;
  
  // Technical specs
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
  estimatedGenerationTime?: number;      // Seconds
  requiresInteractivity?: boolean;
  
  // Learning effectiveness
  bestForModalities?: LearningModality[]; // Which learning styles benefit most
  cognitiveLoad?: 'low' | 'medium' | 'high'; // Mental effort required
  
  // Example structure (for HTML/SVG)
  exampleStructure?: string;             // Pseudo-code or description
  templateId?: string;                   // Reference to reusable template
}

interface GeneratedVisualization {
  id: string;
  suggestionId?: string;                 // Links back to suggestion
  type: VisualizationType;
  title: string;
  
  // Content (one of these will be populated)
  htmlContent?: string;                  // Full HTML with embedded SVG/CSS
  svgContent?: string;                   // Standalone SVG
  asciiArt?: string;
  imageUrl?: string;
  videoUrl?: string;
  
  // Animation details
  animations?: {
    style: AnimationStyle;
    duration: number;                    // Milliseconds
    delay?: number;
    easing?: string;                     // CSS easing function
    trigger?: InteractionType;
  }[];
  
  // Interaction details
  interactions?: {
    type: InteractionType;
    target?: string;                     // CSS selector or element ID
    action: string;                      // What happens
    feedback?: string;                   // Visual feedback description
  }[];
  
  // Metadata
  isInteractive: boolean;
  isAnimated: boolean;
  accessibilityDescription: string;
  reducedMotionAlternative?: string;     // Alternative for prefers-reduced-motion
  
  // For HTML/SVG
  styles?: string;                       // CSS
  scripts?: string;                      // JavaScript for interactivity
  
  // Performance
  estimatedRenderTime?: number;          // Milliseconds
  usesCanvas?: boolean;
  requiresWebGL?: boolean;
  
  // Responsiveness
  isResponsive?: boolean;
  mobileOptimized?: boolean;
}

interface LearningModalityContent {
  modality: LearningModality;
  variants: ContentVariant[];
  visualizationSuggestions?: VisualizationSuggestion[];
  relatedActions?: AvailableAction[];
}

interface AvailableAction {
  id: string;
  type: ActionType;
  label: string;                         // Button text
  description: string;                   // What happens when clicked
  icon?: string;                         // Emoji or icon name
  
  // Parameters if action needs them
  parameters?: Record<string, any>;
  
  // When this action is most useful
  contextualRelevance?: number;          // 0-1 score
  suggestedTiming?: 'immediate' | 'after_reading' | 'if_confused' | 'always';
}

interface FormattedContent {
  rawContent: string;
  formattedHtml: string;                 // Clean, styled HTML
  
  // Enhanced formatting features
  hasHighlights?: boolean;
  hasAnnotations?: boolean;
  hasInteractiveElements?: boolean;
  
  // Structure
  sections?: ContentSection[];
}

interface ContentSection {
  id: string;
  type: 'paragraph' | 'list' | 'heading' | 'quote' | 'code' | 'callout';
  content: string;
  importance?: 'low' | 'medium' | 'high';
  relatedConcepts?: string[];
}

interface RelatedResearch {
  title: string;
  summary: string;
  url?: string;
  source?: string;
  credibilityScore?: number;             // 0-1
  readingLevel?: GradeLevel;
  relevanceScore?: number;               // 0-1 how relevant to topic
}

interface ExampleAIResponse {
  // Request metadata
  requestId: string;
  timestamp: Date;
  processingTime: number;                // Milliseconds
  
  // Core outputs
  summary: ContentSummary;
  formattedContent: FormattedContent;
  
  // Variations
  variants: ContentVariant[];
  learningModalities: LearningModalityContent[];
  
  // Visualizations
  visualizationSuggestions: VisualizationSuggestion[];
  generatedVisualizations?: GeneratedVisualization[]; // May be empty initially
  
  // Interactivity
  availableActions: AvailableAction[];
  
  // Additional enhancements
  vocabularyEnhancements?: VocabularyItem[];
  relatedResearch?: RelatedResearch[];
  
  // Quality metrics
  confidence: number;                    // 0-1 confidence in response quality
  appropriatenessScore?: number;         // 0-1 age/context appropriateness
  warnings?: string[];                   // Any concerns or limitations
  
  // For real-time processing
  isPartialResponse?: boolean;           // True if streaming/incomplete
  expectedCompletionTime?: number;       // Seconds until fully processed
}

// ============================================================================
// REAL-TIME / STREAMING TYPES
// ============================================================================

interface StreamingResponse {
  responseId: string;
  chunk: Partial<ExampleAIResponse>;
  chunkNumber: number;
  isComplete: boolean;
  nextChunkETA?: number;
}

// ============================================================================
// BATCH PROCESSING TYPES
// ============================================================================

interface BatchProcessingRequest {
  inputs: ExampleDialogInput[];
  batchOptions: {
    parallel?: boolean;
    priorityOrder?: number[];            // Indices of inputs by priority
    maxConcurrent?: number;
  };
}

interface BatchProcessingResponse {
  batchId: string;
  results: (ExampleAIResponse | ProcessingError)[];
  totalProcessingTime: number;
  successCount: number;
  errorCount: number;
}

interface ProcessingError {
  inputIndex: number;
  error: string;
  errorType: 'transcription' | 'processing' | 'generation' | 'timeout' | 'unknown';
  retryable: boolean;
}

// ============================================================================
// COURSE HISTORY / LOGS
// ============================================================================

interface CourseHistoryEntry {
  sessionId: string;
  timestamp: Date;
  input: ExampleDialogInput;
  response: ExampleAIResponse;
  studentInteractions?: StudentInteraction[];
}

interface StudentInteraction {
  timestamp: Date;
  actionType: ActionType;
  parameters?: Record<string, any>;
  resultSatisfaction?: number;           // 0-1 if we can measure
}

// ============================================================================
// CLASSROOM / SHARED TYPES
// ============================================================================

interface ClassroomSession {
  sessionId: string;
  classroomId: string;
  startTime: Date;
  endTime?: Date;
  
  // Shared content
  sharedResponses: ExampleAIResponse[];
  
  // Student participation (anonymized)
  activeStudentCount: number;
  commandUsage: Record<ActionType, number>;
  
  // Real-time limits
  maxCommandsPerStudent?: number;
  allowedCommands?: ActionType[];
}

// ============================================================================
// VALIDATION / EXPERIMENT TRACKING
// ============================================================================

interface ExperimentResult {
  experimentId: string;
  timestamp: Date;
  
  input: ExampleDialogInput;
  response: ExampleAIResponse;
  
  // What we're testing
  hypothesis?: string;
  edgeCaseType?: string;
  
  // Results
  success: boolean;
  qualityRating?: number;                // 0-5 manual rating
  notes?: string;
  
  // What worked / didn't work
  effectiveFeatures?: string[];
  ineffectiveFeatures?: string[];
  improvementIdeas?: string[];
}

```


---

## Advanced Techniques

### CSS Variables + JavaScript
- Change colors, sizes, positions dynamically
- Theme switching for different learning styles
- Responsive to screen size and accessibility needs

### SVG Path Animations
- `stroke-dasharray` for drawing effects
- `stroke-dashoffset` for progress indicators
- Path morphing between shapes
- Animated dashed lines

### CSS Keyframes
- Infinite loops for continuous processes
- Sequenced animations with delays
- Easing functions for natural motion
- Pause/play controls

### Intersection Observer
- Trigger animations when scrolling into view
- Lazy load heavy animations
- Progressive content reveal
- Parallax scrolling effects

### Canvas (when SVG not enough)
- Particle systems with thousands of elements
- Complex physics simulations
- Real-time data visualization
- Performance-critical animations

---

## Accessibility Considerations

All visualizations should include:
- **Alt text** or `aria-label` descriptions
- **Keyboard navigation** (tab, arrow keys)
- **Reduced motion** alternatives (respect `prefers-reduced-motion`)
- **High contrast** modes
- **Screen reader** compatible descriptions
- **Pause/play controls** for animations
- **Text alternatives** always available

---

## Implementation Strategy

### Phase 1: Static SVG Templates
Create reusable templates for common types

### Phase 2: CSS Animation Layer
Add simple animations (fade, scale, rotate)

### Phase 3: Interactive JavaScript
Add user controls and dynamic behavior

### Phase 4: AI-Generated Content
Use AI to determine WHICH visualization fits WHICH content, then populate templates

### Phase 5: Custom Generations
For unique concepts, generate fully custom HTML/SVG/CSS

---

### References
- Include references that could be beneficial to look at 