# AI Interface Analysis & Improvement Recommendations

**Document Purpose**: Comprehensive review of `ExampleDialogInput` and `ExampleAIResponse` interfaces with suggested improvements and variations.

**Date**: October 25, 2025

---

## Table of Contents
1. [Input Interface Analysis](#input-interface-analysis)
2. [Output Interface Analysis](#output-interface-analysis)
3. [Improvement Recommendations](#improvement-recommendations)
4. [Interface Variations](#interface-variations)
5. [Prompt Engineering Guide](#prompt-engineering-guide)

---

## Input Interface Analysis

### Current Structure: `ExampleDialogInput`

```typescript
interface ExampleDialogInput {
  content: string;                       // The actual dialog/transcript
  metadata?: DialogMetadata;
  processingOptions?: ProcessingOptions;
  previousContext?: string[];
  nextContext?: string[];
}
```

### Strengths ✅

1. **Clean Core Structure**: Single required field (`content`) makes it easy to use
2. **Rich Metadata**: `DialogMetadata` captures extensive educational context
3. **Flexible Processing**: `ProcessingOptions` allows customization per request
4. **Context Awareness**: Supports previous/next segments for continuity
5. **Student-Centric**: Includes student preferences, accessibility needs, learning styles

### Gaps & Issues ⚠️

#### 1. **Missing Real-Time Performance Hints**
- No indication of urgency level (is this live classroom vs homework help?)
- No budget constraints (max tokens, max processing time)
- No fallback strategy if full processing too slow

**Impact**: System can't optimize speed vs quality trade-offs

#### 2. **Incomplete Transcript Metadata**
- Missing speaker identification (which sentences are teacher vs students)
- No confidence scores per sentence/word
- No indication of transcription artifacts (crosstalk, unclear audio)

**Impact**: Can't prioritize high-confidence content or handle poor transcription gracefully

#### 3. **Limited Classroom Context**
- Missing current lesson plan stage (introduction, practice, assessment)
- No indication of student confusion signals (facial expressions, engagement metrics if available)
- Missing connection to curriculum standards or learning objectives

**Impact**: Can't align responses with pedagogical timing or curriculum goals

#### 4. **Vague Student Preferences**
- `studentLearningPreferences` is array but no priority/weight
- No historical data (what worked before for this student?)
- No current state (tired, engaged, frustrated?)

**Impact**: Can't make data-driven personalization decisions

#### 5. **No Content Filtering Flags**
- Missing age-appropriateness checks needed
- No sensitive topic warnings (religion, politics, violence)
- No toxicity detection requests

**Impact**: Can't proactively moderate content for safety

#### 6. **Ambiguous Batch Context**
- `previousContext` and `nextContext` are just strings
- No explicit linking mechanism (IDs, timestamps)
- Unclear how to handle gaps or overlaps

**Impact**: Difficult to maintain coherent multi-segment narrative

---

### Detailed Field-by-Field Review

#### `content: string`
- ✅ **Good**: Simple, required, flexible
- ⚠️ **Issue**: No structure - could include speaker tags, timestamps inline
- 💡 **Suggestion**: Consider `content: string | StructuredTranscript`

#### `metadata?: DialogMetadata`
**Sub-analysis of DialogMetadata:**

| Field | Status | Issues | Suggestions |
|-------|--------|--------|-------------|
| `timestamp` | ✅ Good | - | - |
| `duration` | ✅ Good | - | Add `effectiveDuration` (excluding silence) |
| `sessionId` | ✅ Good | - | - |
| `lessonId` | ✅ Good | - | Add `curriculumStandardIds` |
| `gradeLevel` | ⚠️ Partial | Single grade - what about mixed classes? | Make array or add `gradeRange` |
| `subject` | ⚠️ Partial | Single subject - interdisciplinary? | Allow array |
| `topic` | ⚠️ Weak | Free text - hard to categorize | Add `topicId` or taxonomy |
| `lessonObjective` | ✅ Good | - | - |
| `classSize` | ⚠️ Weak | Number only - no context | Add `activeStudentCount`, `engagementLevel` |
| `teacherName` | ⚠️ Privacy | PII concern | Consider `teacherId` hash instead |
| `schoolName` | ⚠️ Privacy | PII concern | Consider `schoolId` hash |
| `isLive` | ✅ Good | - | Add `urgencyLevel: 'low' \| 'normal' \| 'high' \| 'critical'` |
| `studentId` | ⚠️ Privacy | PII - should be hashed | OK if properly anonymized |
| `audioQuality` | ✅ Good | - | Add `transcriptionMethod: 'live' \| 'batch' \| 'manual'` |
| `transcriptionConfidence` | ✅ Good | - | Add per-sentence confidence via StructuredTranscript |

**Major Missing Fields in DialogMetadata:**
- `lessonStage: 'warmup' | 'introduction' | 'guided_practice' | 'independent_practice' | 'assessment' | 'closure'`
- `priorKnowledgeLevel: 'none' | 'beginner' | 'intermediate' | 'advanced'`
- `studentEngagement: 'low' | 'medium' | 'high'` (if measurable)
- `confusionSignals?: string[]` - what students seem stuck on
- `vocabularyLevel: 'simple' | 'academic' | 'technical'` - language complexity used
- `teachingStyle: 'lecture' | 'socratic' | 'demonstration' | 'discovery'`

#### `processingOptions?: ProcessingOptions`
**Sub-analysis of ProcessingOptions:**

| Field | Status | Issues | Suggestions |
|-------|--------|--------|-------------|
| `includeSummary` | ✅ Good | - | - |
| `includeVariants` | ✅ Good | - | Add `variantCount: number` |
| `includeLearningModalities` | ✅ Good | Array allows selection | Add `priorityOrder: number[]` |
| `includeVisualizations` | ⚠️ Weak | Boolean only | Change to `visualizationCount?: number` |
| `targetComplexity` | ✅ Good | - | - |
| `targetCognitiveLoad` | ✅ Good | - | - |
| `maxVariants` | ✅ Good | - | - |
| `prioritizeRealtime` | ✅ Good | - | Rename to `optimizeFor: 'speed' \| 'quality' \| 'balanced'` |
| `maxResponseLength` | ⚠️ Partial | In what units? Words? Chars? | Add `maxResponseTokens: number` |
| `requireCitations` | ✅ Good | - | Add `citationStyle: 'apa' \| 'mla' \| 'simple'` |

**Major Missing Fields in ProcessingOptions:**
- `maxProcessingTime?: number` - timeout in milliseconds
- `fallbackStrategy?: 'simplified' | 'cached' | 'error'` - what to do if processing fails
- `cacheResults?: boolean` - allow caching for similar queries
- `streamResponse?: boolean` - send partial results as available
- `generateVisualizationsImmediately?: boolean` - or just suggestions
- `includeExplanations?: boolean` - explain why certain variants chosen
- `personalizedToStudent?: boolean` - use student history
- `teacherOverrides?: Record<string, any>` - teacher can force certain behaviors
- `budgetConstraints?: { maxTokens: number, maxAPIcalls: number }`

#### `previousContext?: string[]` and `nextContext?: string[]`
- ⚠️ **Issue**: Too simple - no metadata about context segments
- 💡 **Better**: 
```typescript
interface ContextSegment {
  content: string;
  timestamp: Date;
  segmentId: string;
  summary?: string; // If already processed
  keyTopics?: string[];
}
previousContext?: ContextSegment[];
nextContext?: ContextSegment[];
```

---

### Recommended Input Structure Improvements

#### Option 1: Enhanced Fields (Backward Compatible)
```typescript
interface ExampleDialogInput {
  // Core (unchanged)
  content: string | StructuredTranscript;
  
  // Enhanced metadata
  metadata?: EnhancedDialogMetadata;
  processingOptions?: EnhancedProcessingOptions;
  
  // Better context
  previousContext?: ContextSegment[];
  nextContext?: ContextSegment[];
  
  // NEW: Performance & Quality
  performanceHints?: {
    urgencyLevel: 'low' | 'normal' | 'high' | 'critical';
    maxProcessingTimeMs?: number;
    optimizeFor: 'speed' | 'quality' | 'balanced';
    fallbackStrategy?: 'simplified' | 'cached' | 'error';
  };
  
  // NEW: Safety & Filtering
  contentFiltering?: {
    requireAgeAppropriate: boolean;
    filterSensitiveTopics?: ('religion' | 'politics' | 'violence' | 'adult')[];
    requireFactChecking?: boolean;
    allowExternalContent?: boolean;
  };
  
  // NEW: Personalization
  studentProfile?: {
    studentId: string;
    historicalPreferences?: HistoricalData;
    currentState?: 'engaged' | 'tired' | 'frustrated' | 'confused';
    learningVelocity?: number; // Words per minute comfortable pace
  };
  
  // NEW: Teacher Context
  teacherIntent?: {
    goal: 'clarify' | 'extend' | 'assess' | 'engage' | 'remediate';
    allowedActions?: ActionType[];
    prohibitedContent?: string[];
  };
}
```

#### Option 2: Restructured (Breaking Changes)
```typescript
interface ExampleDialogInputV2 {
  // Core content
  transcript: {
    raw: string;
    structured?: StructuredTranscript;
    quality: TranscriptQuality;
  };
  
  // Context (combined)
  context: {
    educational: EducationalContext;
    classroom: ClassroomContext;
    student: StudentContext;
    teacher: TeacherContext;
    technical: TechnicalContext;
  };
  
  // What to generate
  outputs: {
    required: ('summary' | 'variants' | 'visualizations')[];
    optional: ('research' | 'vocabulary' | 'quiz')[];
    constraints: OutputConstraints;
  };
  
  // How to generate
  processing: {
    performance: PerformanceHints;
    personalization: PersonalizationConfig;
    safety: SafetyConfig;
  };
}
```

---

## Output Interface Analysis

### Current Structure: `ExampleAIResponse`

```typescript
interface ExampleAIResponse {
  requestId: string;
  timestamp: Date;
  processingTime: number;
  
  summary: ContentSummary;
  formattedContent: FormattedContent;
  variants: ContentVariant[];
  learningModalities: LearningModalityContent[];
  visualizationSuggestions: VisualizationSuggestion[];
  generatedVisualizations?: GeneratedVisualization[];
  availableActions: AvailableAction[];
  vocabularyEnhancements?: VocabularyItem[];
  relatedResearch?: RelatedResearch[];
  
  confidence: number;
  appropriatenessScore?: number;
  warnings?: string[];
  
  isPartialResponse?: boolean;
  expectedCompletionTime?: number;
}
```

### Strengths ✅

1. **Comprehensive**: Covers all major output types
2. **Structured Variants**: Clear organization by modality and complexity
3. **Rich Metadata**: Confidence scores, warnings, quality metrics
4. **Streaming Support**: `isPartialResponse` flag for real-time
5. **Actionable**: `availableActions` provides clear next steps

### Gaps & Issues ⚠️

#### 1. **Redundancy Between `variants` and `learningModalities`**
- `variants: ContentVariant[]` has modality field
- `learningModalities: LearningModalityContent[]` groups by modality
- These overlap conceptually

**Impact**: Confusing which to use, potential inconsistency

#### 2. **No Explicit Grouping/Organization**
- Flat arrays of variants, visualizations, actions
- No indication of "primary" vs "alternative" content
- No recommended reading order

**Impact**: UI doesn't know what to show first

#### 3. **Missing Explanation/Rationale**
- Why were these variants chosen?
- Why this complexity level?
- Why these visualizations?

**Impact**: Teacher/student can't understand AI decisions

#### 4. **Incomplete Streaming Support**
- `isPartialResponse` is boolean, but which parts are ready?
- No indication of streaming order
- No chunk identification

**Impact**: Can't incrementally render parts of response

#### 5. **No Performance Breakdown**
- `processingTime` is single number
- Don't know which operations were slow
- Can't optimize bottlenecks

**Impact**: Difficult to debug or optimize

#### 6. **Missing Caching Hints**
- No indication if response can be reused
- No cache key or TTL
- No versioning

**Impact**: Can't implement efficient caching

#### 7. **Limited Error Context**
- `warnings` are just strings
- No structured error codes
- No retry guidance

**Impact**: Hard to handle errors programmatically

---

### Detailed Field-by-Field Review

#### Core Metadata Fields
| Field | Status | Issues | Suggestions |
|-------|--------|--------|-------------|
| `requestId` | ✅ Good | - | Add `correlationId` for multi-request chains |
| `timestamp` | ✅ Good | - | - |
| `processingTime` | ⚠️ Partial | Single number, no breakdown | Add `performanceMetrics: PerformanceBreakdown` |

#### Content Fields
| Field | Status | Issues | Suggestions |
|-------|--------|--------|-------------|
| `summary` | ✅ Good | - | Add `summaryAudio?: string` for audio learners |
| `formattedContent` | ✅ Good | - | Add `contentAccessibilityScore: number` |
| `variants` | ⚠️ Redundant | Overlaps with learningModalities | Consolidate or clarify relationship |
| `learningModalities` | ⚠️ Redundant | Overlaps with variants | Consider removing and using variants only |

#### Visualization Fields
| Field | Status | Issues | Suggestions |
|-------|--------|--------|-------------|
| `visualizationSuggestions` | ✅ Good | - | Add `suggestionRationale: string` |
| `generatedVisualizations` | ⚠️ Unclear | Optional - when populated? | Add status field: 'pending' \| 'generating' \| 'ready' \| 'failed' |

#### Enhancement Fields
| Field | Status | Issues | Suggestions |
|-------|--------|--------|-------------|
| `vocabularyEnhancements` | ✅ Good | - | Add pronunciation guides |
| `relatedResearch` | ✅ Good | - | Add `researchType: 'academic' \| 'educational' \| 'popular'` |
| `availableActions` | ✅ Good | - | Add action grouping/categories |

#### Quality Fields
| Field | Status | Issues | Suggestions |
|-------|--------|--------|-------------|
| `confidence` | ⚠️ Vague | Confidence in what? | Split into `contentConfidence`, `visualizationConfidence` |
| `appropriatenessScore` | ✅ Good | - | Add `appropriatenessReasons: string[]` |
| `warnings` | ⚠️ Unstructured | Just strings | Make structured: `{ code: string, severity: 'low'\|'medium'\|'high', message: string }` |

#### Streaming Fields
| Field | Status | Issues | Suggestions |
|-------|--------|--------|-------------|
| `isPartialResponse` | ⚠️ Insufficient | Boolean only | Add `completionStatus: CompletionStatus` |
| `expectedCompletionTime` | ✅ Good | - | Add `completedSections: string[]` |

---

### Recommended Output Structure Improvements

#### Option 1: Enhanced Fields (Backward Compatible)
```typescript
interface ExampleAIResponse {
  // Metadata (enhanced)
  requestId: string;
  correlationId?: string; // For multi-turn conversations
  timestamp: Date;
  processingTime: number;
  performanceMetrics?: PerformanceBreakdown;
  
  // Core Content (organized)
  content: {
    primary: ContentVariant; // Main recommended version
    alternatives: ContentVariant[]; // Other options
    summaries: ContentSummary; // Multiple levels
  };
  
  // Visualizations (status-aware)
  visualizations: {
    suggestions: VisualizationSuggestion[];
    generated: VisualizationWithStatus[];
    recommended: string[]; // IDs of top 3
  };
  
  // Interactions
  actions: {
    immediate: AvailableAction[]; // Show these first
    exploratory: AvailableAction[]; // Additional options
    prohibited?: ActionType[]; // Teacher-restricted
  };
  
  // Enhancements (optional)
  enhancements?: {
    vocabulary?: VocabularyItem[];
    research?: RelatedResearch[];
    assessments?: QuizQuestion[];
  };
  
  // Quality & Metadata
  quality: {
    overallConfidence: number;
    contentConfidence: number;
    visualizationConfidence: number;
    appropriateness: {
      score: number;
      reasons: string[];
      concerns?: string[];
    };
    warnings: StructuredWarning[];
  };
  
  // Streaming Support
  streaming?: {
    isPartial: boolean;
    completedSections: ('content' | 'visualizations' | 'actions' | 'enhancements')[];
    expectedCompletionTime?: number;
    nextChunkETA?: number;
  };
  
  // Caching & Optimization
  caching?: {
    cacheKey: string;
    ttlSeconds: number;
    reusableForSimilarQueries: boolean;
  };
  
  // Explanations (NEW - helps trust)
  rationale?: {
    whyThisComplexity: string;
    whyTheseModalities: string;
    whyTheseVisualizations: string;
    adaptationsMade?: string[]; // Based on student profile
  };
}
```

#### Option 2: Restructured (Breaking Changes)
```typescript
interface ExampleAIResponseV2 {
  // Request tracking
  tracking: {
    requestId: string;
    correlationId?: string;
    timestamp: Date;
    processingMetrics: PerformanceBreakdown;
  };
  
  // Main content (single source of truth)
  content: ResponseContent;
  
  // Metadata
  metadata: ResponseMetadata;
}

interface ResponseContent {
  // Text content
  text: {
    primary: ContentVariant;
    alternatives: ContentVariant[];
    organizationHints: {
      readingOrder: string[]; // IDs in recommended order
      primaryVariantId: string;
    };
  };
  
  // Visual content
  visual: {
    recommendations: VisualizationRecommendation[];
    generated: GeneratedVisualization[];
    priority: string[]; // IDs ordered by importance
  };
  
  // Interactive elements
  interactions: {
    immediate: AvailableAction[];
    contextual: AvailableAction[];
  };
  
  // Supplementary
  supplements?: {
    vocabulary?: VocabularyEnhancement[];
    research?: ResearchReference[];
    assessments?: AssessmentItem[];
  };
}

interface ResponseMetadata {
  quality: QualityMetrics;
  streaming: StreamingStatus;
  caching: CachingMetadata;
  explanations: AIRationale;
}
```

---

## Improvement Recommendations

### Priority 1: Critical Issues (Implement First)

#### 1. **Consolidate Variants Structure**
**Problem**: `variants` and `learningModalities` are redundant

**Solution**: Use single structure
```typescript
interface OrganizedContent {
  primaryVariant: ContentVariant;
  alternativesByModality: Map<LearningModality, ContentVariant[]>;
  alternativesByComplexity: Map<ContentComplexity, ContentVariant[]>;
  recommendationReason: string;
}
```

#### 2. **Add Performance Hints to Input**
**Problem**: No way to specify urgency or constraints

**Solution**:
```typescript
interface PerformanceHints {
  urgencyLevel: 'low' | 'normal' | 'high' | 'critical';
  maxProcessingTimeMs?: number;
  optimizeFor: 'speed' | 'quality' | 'balanced';
  fallbackStrategy?: 'simplified' | 'cached' | 'error';
}
```

#### 3. **Structured Warnings**
**Problem**: Warnings are just strings, hard to handle programmatically

**Solution**:
```typescript
interface StructuredWarning {
  code: string; // e.g., 'LOW_CONFIDENCE', 'INCOMPLETE_TRANSCRIPT'
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  suggestedAction?: string;
  affectedFields?: string[]; // Which parts of response affected
}
```

#### 4. **Better Streaming Support**
**Problem**: Can't tell which parts of response are ready

**Solution**:
```typescript
interface StreamingStatus {
  isPartial: boolean;
  completedSections: {
    summary: boolean;
    primaryVariant: boolean;
    alternatives: boolean;
    visualizationSuggestions: boolean;
    generatedVisualizations: boolean;
    actions: boolean;
    enhancements: boolean;
  };
  estimatedCompletionTime?: number;
  canRenderNow: string[]; // Section names safe to show
}
```

---

### Priority 2: Important Enhancements (Implement Soon)

#### 5. **Add Structured Transcript Support**
```typescript
interface StructuredTranscript {
  segments: TranscriptSegment[];
  speakers: Speaker[];
  overallConfidence: number;
}

interface TranscriptSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
  confidence: number;
  alternatives?: string[]; // Other possible transcriptions
}

interface Speaker {
  id: string;
  role: 'teacher' | 'student' | 'unknown';
  name?: string;
}
```

#### 6. **Add AI Rationale**
```typescript
interface AIRationale {
  contentDecisions: {
    whyThisComplexity: string;
    whyTheseModalities: string[];
    adaptationsMade: Adaptation[];
  };
  visualizationDecisions: {
    whyTheseTypes: string;
    priorityReasoning: string;
  };
  personalizations: {
    studentFactorsConsidered: string[];
    contextFactorsConsidered: string[];
  };
}

interface Adaptation {
  factor: string; // "Student has ADHD"
  adaptation: string; // "Reduced cognitive load"
  impact: string; // "Shorter paragraphs, more bullet points"
}
```

#### 7. **Performance Breakdown**
```typescript
interface PerformanceBreakdown {
  totalMs: number;
  transcriptionMs?: number;
  aiProcessingMs: number;
  visualizationGenerationMs?: number;
  stages: {
    [stageName: string]: number; // ms per stage
  };
  bottleneck?: string; // Which stage was slowest
}
```

#### 8. **Caching Metadata**
```typescript
interface CachingMetadata {
  cacheKey: string;
  ttlSeconds: number;
  reusableFor: {
    similarTranscripts: boolean;
    sameStudent: boolean;
    sameClass: boolean;
  };
  varyBy?: string[]; // Which fields affect cache validity
}
```

---

### Priority 3: Nice-to-Have (Future Improvements)

#### 9. **Multi-Turn Conversation Support**
```typescript
interface ConversationContext {
  conversationId: string;
  turnNumber: number;
  previousRequests: string[]; // Request IDs
  threadSummary?: string;
  studentUnderstanding: number; // 0-1 estimated comprehension
}
```

#### 10. **A/B Testing Support**
```typescript
interface ExperimentMetadata {
  experimentId?: string;
  variantId?: string;
  treatmentArm?: string;
  collectFeedback?: boolean;
}
```

#### 11. **Teacher Dashboard Aggregates**
```typescript
interface ClassroomInsights {
  sessionId: string;
  aggregateMetrics: {
    avgConfusionLevel: number;
    mostRequestedActions: ActionType[];
    popularVisualizations: VisualizationType[];
    engagementScore: number;
  };
  studentGroups: {
    needsHelp: string[]; // Student IDs
    excelling: string[];
    disengaged: string[];
  };
}
```

---

## Interface Variations

### Variation 1: Real-Time Minimal (Optimized for Speed)
```typescript
interface RealtimeInput {
  content: string;
  studentId: string;
  urgency: 'high' | 'critical';
  maxTimeMs: number;
}

interface RealtimeResponse {
  requestId: string;
  quickSummary: string; // One sentence
  primaryVariant: string; // Single text variant
  topActions: AvailableAction[]; // Max 3
  confidence: number;
}
```

### Variation 2: Batch Processing (Optimized for Throughput)
```typescript
interface BatchInput {
  segments: Array<{
    id: string;
    content: string;
    metadata: Partial<DialogMetadata>;
  }>;
  sharedOptions: ProcessingOptions;
}

interface BatchResponse {
  batchId: string;
  results: Map<string, ExampleAIResponse>; // Keyed by segment ID
  summary: {
    totalProcessed: number;
    avgConfidence: number;
    commonThemes: string[];
  };
}
```

### Variation 3: Teacher Dashboard (Classroom View)
```typescript
interface ClassroomRequest {
  sessionId: string;
  includeStudentInsights: boolean;
  timeRange?: { start: Date, end: Date };
}

interface ClassroomResponse {
  sessionSummary: string;
  keyTopicsCovered: string[];
  studentEngagement: {
    overall: number;
    byStudent: Map<string, number>;
  };
  interventionNeeded: string[]; // Student IDs
  recommendations: TeacherRecommendation[];
}
```

### Variation 4: Student View (Simplified)
```typescript
interface StudentInput {
  whatIHeard: string;
  whatIThink: string;
  help: 'confused' | 'want_more' | 'different_way';
}

interface StudentResponse {
  message: string; // Friendly explanation
  visual?: string; // Single best visualization (HTML)
  tryThis: AvailableAction[]; // Simple actions
  didThisHelp?: boolean; // Feedback prompt
}
```

### Variation 5: Accessibility-First (Maximum Accommodations)
```typescript
interface AccessibilityInput {
  content: string;
  accessibilityProfiles: AccessibilityProfile[];
  mandatoryFeatures: {
    screenReaderCompatible: boolean;
    keyboardOnly: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
  };
}

interface AccessibilityResponse {
  content: ContentVariant; // Guaranteed accessible
  accessibilityReport: {
    wcagLevel: 'A' | 'AA' | 'AAA';
    screenReaderText: string;
    keyboardShortcuts: string[];
    alternativeFormats: string[]; // Audio, braille, etc.
  };
}
```

---

## Prompt Engineering Guide

### Section Overview
This section provides LLM prompt templates for generating responses that match the `ExampleAIResponse` structure.

### Base System Prompt
```
You are an educational AI assistant for the 4eye platform. Your role is to:
1. Analyze classroom transcripts in real-time
2. Generate multi-modal learning content
3. Adapt explanations to individual student needs
4. Suggest effective visualizations
5. Maintain pedagogical best practices

You must return structured responses matching the ExampleAIResponse TypeScript interface.
```

### Prompt Template: Generate Primary Variant
```
Given this classroom transcript:
"""
{transcript_content}
"""

Context:
- Grade Level: {grade_level}
- Subject: {subject}
- Student Learning Preferences: {modalities}
- Accessibility Needs: {accessibility_profiles}

Task: Generate the PRIMARY content variant that best explains this concept.

Requirements:
1. Match the target complexity: {target_complexity}
2. Use these instructional strategies: {strategies}
3. Accommodate these accessibility profiles: {profiles}
4. Explain in 2-3 paragraphs
5. Include 3-5 bullet points summarizing key ideas

Return JSON:
{
  "id": "variant_primary",
  "modality": "{best_modality}",
  "strategy": "{best_strategy}",
  "complexity": "{target_complexity}",
  "content": "...",
  "title": "...",
  "bestFor": "...",
  "accessibilityProfiles": [...]
}
```

### Prompt Template: Generate Alternative Variants
```
You already created a primary variant with modality: {primary_modality}

Now create {n} alternative variants using different learning modalities.

Each variant should:
1. Explain the SAME concept
2. Use a DIFFERENT modality (not {primary_modality})
3. Target a different learning style
4. Be roughly the same complexity

Available modalities: {available_modalities}

Return JSON array of ContentVariant objects.
```

### Prompt Template: Suggest Visualizations
```
Given this explanation:
"""
{content}
"""

Suggest {n} visualizations that would help students understand this concept.

For each visualization, specify:
1. type: (from VisualizationType enum)
2. title: Brief name
3. description: Why this would help (1 sentence)
4. priority: 'high' if critical for understanding, 'medium' if helpful, 'low' if optional
5. conceptToVisualize: What specific part to show
6. bestForModalities: Which learning styles benefit most

Prefer:
- Interactive visualizations for kinesthetic learners
- Timeline/flow for sequential concepts
- Concept maps for relationships
- Charts for data/comparisons

Return JSON array of VisualizationSuggestion objects.
```

### Prompt Template: Determine Complexity
```
Analyze this transcript:
"""
{transcript}
"""

Determine:
1. Current complexity level (what grade level is this taught at?)
2. Concept difficulty (inherently simple vs complex topic?)
3. Vocabulary level (everyday words vs technical terms?)

Then decide target complexity for:
- Student grade level: {student_grade}
- Student prior knowledge: {prior_knowledge}

Return:
{
  "currentComplexity": "...",
  "recommendedComplexity": "...",
  "reasoning": "..."
}
```

### Prompt Template: Accessibility Adaptations
```
You have content:
"""
{content}
"""

Student has these accessibility profiles: {profiles}

For each profile, specify adaptations:

autism_friendly:
- Use literal language (no idioms)
- Clear structure with headings
- Predictable format
- Explicit instructions

adhd_optimized:
- Short paragraphs (2-3 sentences max)
- Bullet points instead of blocks
- Bold key terms
- Frequent summary reminders

dyslexia_friendly:
- Sans-serif font
- 1.5 line spacing
- Avoid walls of text
- Use color coding sparingly

poor_working_memory:
- Repeat key information
- Provide reference sheet
- Break into tiny chunks
- External memory aids (checklists)

Return adapted content variant for each profile.
```

### Prompt Template: Generate Available Actions
```
Given the current content and student context:
- Content summary: {summary}
- Student grade: {grade}
- Student engagement: {engagement}
- Confusion signals: {confusion_signals}

Suggest 3-5 available actions the student could take next.

Action types:
- SEE_VARIANTS: If multiple explanations would help
- SIMPLIFY: If content too complex
- VISUALIZE: If concept is spatial/visual
- ADD_EXAMPLES: If needs concrete examples
- QUIZ_ME: If ready to test understanding
- RELATE_TO_ME: If needs personal connection

For each action:
{
  "type": "...",
  "label": "Button text (< 4 words)",
  "description": "What happens (1 sentence)",
  "contextualRelevance": 0.0-1.0,
  "suggestedTiming": "immediate" | "after_reading" | "if_confused"
}

Prioritize actions most likely to help this specific student.
```

---

## Next Steps

### Implementation Checklist

**Phase 1: Interface Updates**
- [ ] Decide between Option 1 (enhanced) vs Option 2 (restructured)
- [ ] Update TypeScript definitions
- [ ] Create migration guide if breaking changes
- [ ] Update documentation

**Phase 2: Test Data Creation**
- [ ] Create realistic classroom transcripts (see next document)
- [ ] Generate mock responses
- [ ] Validate against type system
- [ ] Test edge cases

**Phase 3: Prompt Engineering**
- [ ] Implement prompt templates
- [ ] Test with real LLM (GPT-4, Claude, etc.)
- [ ] Validate output structure
- [ ] Measure quality and consistency

**Phase 4: Performance Testing**
- [ ] Benchmark processing times
- [ ] Test streaming implementation
- [ ] Measure cache effectiveness
- [ ] Optimize bottlenecks

**Phase 5: User Testing**
- [ ] Teacher feedback on dashboard
- [ ] Student feedback on variants
- [ ] Accessibility testing with real users
- [ ] Iterate based on feedback

---

## Summary of Key Improvements

### Input Interface
1. ✅ Add performance hints (urgency, timeouts, fallbacks)
2. ✅ Add structured transcript support (speaker IDs, confidence scores)
3. ✅ Add content filtering flags (safety, age-appropriateness)
4. ✅ Better student profile (history, current state, preferences)
5. ✅ Enhanced context linking (structured segments, not just strings)

### Output Interface
1. ✅ Consolidate variants (remove redundancy between variants and learningModalities)
2. ✅ Add AI rationale (explain decisions)
3. ✅ Structured warnings (codes, severity, affected fields)
4. ✅ Better streaming support (section-level completion status)
5. ✅ Performance breakdown (identify bottlenecks)
6. ✅ Caching metadata (enable efficient reuse)
7. ✅ Organized content (primary vs alternatives, recommended order)

### New Capabilities
1. ✅ Multiple interface variations (real-time, batch, classroom, student, accessibility)
2. ✅ Prompt engineering templates (consistent LLM outputs)
3. ✅ Better accessibility support (structured profiles and adaptations)
4. ✅ Teacher insights (classroom-level aggregates)
5. ✅ Conversation threading (multi-turn support)

---

**Status**: Ready for test data generation and validation
**Next Document**: `test-data-samples.md` (realistic inputs and mock outputs)
