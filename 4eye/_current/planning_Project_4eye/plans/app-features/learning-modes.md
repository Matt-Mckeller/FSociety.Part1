# F14 — Learning Modes

> Transform content into interactive learning experiences using triadic understanding, visual learning, and multi-modal engagement.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [learning-modes.json](https://4eye.ai/docs/learning-modes)
**Related:** [F4 — Chat](chat-interactivity.md) | [F15 — Quizzes](quizzes-exercises.md) | [F16 — Live Session](live-session-display.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Multiple Input Formats** — MVP: text, image input, speech-to-text. Others are extensions (not all required initially)
2. **Multiple Output Formats** — Text, visual, audio, interactive (varies by mode)
3. **Phased Implementation** — MVP modes first, advanced modes in later phases
4. **Typed Responses** — All AI-generated modes use typed response system. See [C8](../core/typed-ai-responses.md)
5. **Chat Integration** — Modes accessible as actions from F4 chat

---

## Learning Mode Categories (Full List)

### MVP Modes (Phase 4)

| Mode | Input | Output | Description |
|------|-------|--------|-------------|
| **Triadic Associations** | Text/Transcript | Hover + Visual | 3 associative words per term (neural-net encoding) |
| **Concept Triangles** | Text/Transcript | Visual + Interactive | Extended triads with relationships and insights |
| **Simplify** | Text | Text | Reduce complexity, shorter sentences |
| **Knowledge Web** | Text/Concepts | Visual | Connected concept network (uses triads as edges) |
| **Quiz Me** | Text | Interactive | AI generates questions for user recall |
| **Quiz The AI** | User questions | AI answers + Feedback | User creates quiz, AI answers, user validates |

### Phase 5+ Modes

| Mode | Input | Output | Description |
|------|-------|--------|-------------|
| **Associative** | Text/Concepts | Visual + Interactive | Connect new concepts to existing knowledge |
| **Problem Solving** | Scenario/Text | Interactive | Work through problems step-by-step |
| **Storytelling** | Text/Concepts | Text + Audio | Transform content into narrative form |
| **3-Piece Input** | 3 items (text/image) | Analysis | User provides 3 pieces, AI finds connections |
| **Image Input** | Image | Text + Analysis | Analyze image for learning content |
| **Auditory Input** | Audio/Speech | Text + Visual | Convert spoken input to learning content |
| **Auditory Listening** | Text | Audio (TTS) | Listen to content with adaptive pacing |
| **Mind Map** | Text | Visual | Hierarchical concept map |
| **Timeline** | Text | Visual | Temporal organization of events/concepts |
| **Compare & Contrast** | 2+ items | Visual + Text | Side-by-side analysis |
| **Real-World Example** | Concept | Text + Image | Concrete application of abstract concept |
| **Historical Context** | Concept | Text + Timeline | Place concept in historical perspective |

### Input/Output Matrix

| Input Type | Supported Modes |
|------------|-----------------|
| **Text/Transcript** | All modes |
| **Image** | Image Input, Visual modes |
| **Audio** | Auditory Input, Auditory Listening |
| **3-Piece** | 3-Piece Input, Associative |
| **User Selection** | Compare & Contrast, Associative |
| **User Questions** | Quiz The AI |

| Output Type | Modes |
|-------------|-------|
| **Hover/Tooltip** | Triadic Associations (term → 3 words) |
| **Text** | Simplify, Storytelling, Real-World Example |
| **Visual** | Concept Triangles, Knowledge Web, Mind Map, Timeline |
| **Audio** | Auditory Listening, Storytelling (TTS) |
| **Interactive** | Quiz Me, Problem Solving, 3-Piece Input |
| **Mixed** | Most modes support multiple outputs |

---

## Overview

Learning Modes apply learning science principles to transform transcribed content into engaging, memorable learning experiences. The core concept is **triadic association**: connecting any term to 3 associative words that create neural pathways for stronger memory encoding.

---

## Core Concepts

### Triadic Associations (Neural-Net Model)

The brain forms stronger memories through associative connections. For any concept, we generate 3 associative words that activate different neural networks:

```
                    [Term]
                      │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
   [Assoc 1]    [Assoc 2]    [Assoc 3]
   (concrete)  (abstract)   (emotional)
```

**Example:** "Blue" → ["Water", "Learning", "Color"]

**Why three associations?**
- **Neural Diversity** — Each association activates different brain networks
- **Pattern Recognition** — Humans naturally recognize patterns in threes
- **Cognitive Load** — Manageable complexity (not too few, not too many)
- **Cross-Domain** — Concrete, abstract, and emotional connections
- **Recall Pathways** — Multiple routes to retrieve the memory

### Usage Throughout the App

| Context | How Triadic Associations Are Used |
|---------|-----------------------------------|
| **Hover Effects** | Show 3 associations when hovering over key terms |
| **Discussion Topics** | Each topic has associated triads for context |
| **Paragraph Markers** | Key terms in paragraphs link to their triads |
| **Knowledge Web** | Triads form the edges connecting concept nodes |
| **Review Mode** | Flash 3 associations during spaced repetition |
| **Search** | Find content by any word in a triad |

### Extended: Concept Triangles

For deeper learning, triadic associations can be expanded into **concept triangles** with relationships:

```
     [Concept 1]
        /\
       /  \
      /    \
     /______\
[Concept 2]  [Concept 3]

+ Relationships between concepts
+ "Aha moment" insight
```

| Type | Description | Example |
|------|-------------|---------|
| **Concept Triangles** | Three related concepts explaining a larger idea | Cause → Effect → Solution |
| **Perspective Triangles** | Three viewpoints on the same topic | Scientist, Engineer, Ethicist |
| **Evidence Triangles** | Three types of evidence supporting a claim | Data, Case Study, Expert Opinion |
| **Learning Path Triangles** | Prerequisite → Current → Next concept | Foundation, Current Skill, Advanced |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      LEARNING MODE PIPELINE                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  INPUT: Transcript/Summary                                        │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  CONCEPT EXTRACTION (GPT-5.2)                                     │  │
│   │                                                                    │  │
│   │  Extract key concepts, relationships, and hierarchies            │  │
│   │  ├── Concepts: [Concept1, Concept2, Concept3, ...]               │  │
│   │  ├── Relationships: [A relates to B via X]                       │  │
│   │  └── Hierarchy: [Foundation → Building → Advanced]               │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  TRIANGLE GENERATION                                              │  │
│   │                                                                    │  │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐               │  │
│   │  │ Concept     │  │ Perspective │  │ Evidence    │               │  │
│   │  │ Triangles   │  │ Triangles   │  │ Triangles   │               │  │
│   │  └─────────────┘  └─────────────┘  └─────────────┘               │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  VISUAL REPRESENTATION                                            │  │
│   │                                                                    │  │
│   │  • Knowledge Web (connected nodes)                               │  │
│   │  • Progress Tree (learning path)                                 │  │
│   │  • Triangle Cards (interactive)                                  │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Learning Mode Categories

### Visual Learning Modes
- Mind maps and concept maps
- Animated explanations
- Color-coded information
- Spatial arrangements
- Interactive diagrams
- Progress visualizations
- Knowledge webs
- Flowcharts and decision trees

### Kinesthetic Learning Modes
- Drag-and-drop exercises
- Gesture-based interactions
- Build-it-yourself activities
- Interactive manipulatives
- Assembly challenges

### Auditory Learning Modes
- Audio explanations and narration
- Verbal repetition exercises
- Discussion prompts
- Read-aloud options
- Auditory listening with adaptive pacing

### Cognitive Learning Modes
- Associative (connect to prior knowledge)
- Problem solving (step-by-step)
- Storytelling (narrative transformation)
- Compare & Contrast
- Historical Context

### Multi-Modal Input Modes
- 3-Piece Input (user provides 3 items → AI analyzes)
- Image Input (analyze images for learning)
- Auditory Input (voice → learning content)
- Mixed Media (combine multiple inputs)

---

## Detailed Mode Implementations

### Associative Learning
Connect new concepts to what users already know.

```typescript
interface AssociativeMode {
  newConcept: string;
  userKnowledge: string[];  // From user's knowledge web
  connections: AssociativeConnection[];
  strengthScore: number;  // How strong the association
}

interface AssociativeConnection {
  fromConcept: string;
  toConcept: string;
  relationship: string;
  example: string;
}
```

### Problem Solving Mode
Step-by-step guided problem solving.

```typescript
interface ProblemSolvingMode {
  scenario: string;
  steps: ProblemStep[];
  hints: string[];
  solution: string;
  alternativeApproaches: string[];
}

interface ProblemStep {
  instruction: string;
  userInputType: 'text' | 'choice' | 'diagram';
  expectedOutcome: string;
}
```

### Storytelling Mode
Transform dry content into narrative form.

```typescript
interface StorytellingMode {
  narrative: string;
  characters?: string[];  // Personified concepts
  audioVersion?: string;  // TTS URL
  keyMoments: { timestamp: number; concept: string }[];
}
```

### 3-Piece Input Mode
User provides 3 items → AI finds connections and meaning.

```typescript
interface ThreePieceInputMode {
  pieces: [InputPiece, InputPiece, InputPiece];
  analysis: TriangleConnection[];
  synthesis: string;  // Combined meaning
  suggestedExploration: string[];
}

interface InputPiece {
  type: 'text' | 'image' | 'url' | 'concept';
  content: string;
  label?: string;
}
```

### Quiz The AI Mode (MVP)
User creates questions → AI answers → User validates correctness.

**Learning benefit:** Creating good questions requires deep understanding. Validating AI answers reinforces knowledge.

```typescript
interface QuizTheAIMode {
  questions: UserQuestion[];
  context?: string;  // Topic/content being quizzed on
  difficulty: 'easy' | 'medium' | 'hard';
}

interface UserQuestion {
  id: string;
  question: string;
  type: 'open' | 'multiple_choice' | 'true_false';
  expectedAnswer?: string;  // User's expected answer (optional)
  
  // AI response
  aiAnswer: string;
  aiConfidence: number;  // 0-1, how confident AI is
  aiExplanation: string;
  
  // User validation
  userValidation?: 'correct' | 'incorrect' | 'partial';
  userFeedback?: string;
}

interface QuizTheAIResult {
  totalQuestions: number;
  aiCorrect: number;
  aiIncorrect: number;
  aiPartial: number;
  conceptsMastered: string[];  // Concepts user demonstrated understanding of
  suggestedFollowUp: string[];  // Areas to explore further
}
```

### Image Input Mode
Analyze images for learning content.

```typescript
interface ImageInputMode {
  imageUrl: string;
  extractedConcepts: string[];
  textExplanation: string;
  relatedContent: string[];
  suggestedModes: string[];  // What modes work well with this
}
```

### Auditory Modes
Voice-based learning interactions.

```typescript
interface AuditoryInputMode {
  transcription: string;
  processedContent: LearningContent;
  suggestedModes: string[];
}

interface AuditoryListeningMode {
  audioUrl: string;
  playbackSpeed: number;
  pausePoints: number[];  // Timestamps for comprehension checks
  followAlongText: string;
  highlightedWords: { word: string; timestamp: number }[];
}
```

---

## Components

### Input Components (User Creates/Interacts)

| Component | Description | Interaction |
|-----------|-------------|-------------|
| **AssociationBuilder** | User creates 3 associations for a term | Type or select 3 words |
| **TriangleBuilder** | User places 3 concepts to form a concept triangle | Drag concepts to vertices |
| **ConceptMatcher** | Match pairs or groups of related concepts | Drag lines between items |
| **SequenceSorter** | Arrange items in correct order | Drag-and-drop ordering |
| **FillTheGap** | Complete missing information in concept map | Type or select elements |

### Display Components (System Shows)

| Component | Description | Visualization |
|-----------|-------------|---------------|
| **TriadTooltip** | Shows 3 associations on term hover | Tooltip with 3 words |
| **TriadIndicator** | Marks terms that have associations | Subtle underline/dot |
| **TriangleViewer** | Animated concept triangle | Points light up, connections animate |
| **KnowledgeWeb** | Growing network of connected concepts | Nodes and edges, triads as edges |
| **ProgressTree** | Tree showing learning path progress | Branches unlock as mastered |
| **FeedbackPulse** | Immediate visual feedback | Color and animation for success/failure |

---

## Data Model

### LearningModeResult
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| type | enum | TRIADIC, KNOWLEDGE_WEB, PROGRESS_TREE |
| associations | json | TriadicAssociation[] (primary) |
| conceptTriangles | json | ConceptTriangle[] (extended) |
| relationships | json | Concept relationships |
| modelUsed | string | e.g., "gpt-5.2" |
| generatedAt | datetime | |

### TriadicAssociation (stored)
```typescript
interface TriadicAssociation {
  term: string;                       // The primary term
  associations: [string, string, string];  // 3 associative words
  context?: string;                   // Why these associations
  sourceTimestamp?: number;           // Where in recording
  category?: string;                  // Term category
}
```

### ConceptTriangle (extended, optional)
```typescript
interface ConceptTriangle {
  id: string;
  type: 'CONCEPT' | 'PERSPECTIVE' | 'EVIDENCE' | 'LEARNING_PATH';
  concepts: [string, string, string];
  relationships: { from: number; to: number; relationship: string }[];
  insight: string;  // The "aha moment" from this triangle
}
```

---

## AI Integration

| Capability | Description |
|------------|-------------|
| **Association Generation** | AI generates 3 associative words for key terms |
| **Triangle Generation** | AI creates concept triangles for deeper exploration |
| **Adaptive Difficulty** | AI adjusts complexity based on performance |
| **Gap Detection** | AI identifies missing connections in knowledge web |
| **Personalized Mode Selection** | AI recommends modes based on learning style |

---

## Gamification Integration

| Element | Mechanic | Reward |
|---------|----------|--------|
| **Triangle Completion** | Complete the triangle challenges | XP + visual celebration |
| **Connection Chains** | Build chains of connected concepts | Combo multiplier XP |
| **Knowledge Web** | Grow your understanding web over time | Badge milestones |
| **Speed Rounds** | Quick-fire exercises with time bonuses | Time bonus XP |
| **Daily Streaks** | Consecutive days of exercise completion | Streak bonuses |

---

## Response Types (Draft)

> These types define the AI response structures for learning mode generation. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### TriadicAssociationResponseData (MVP)

```typescript
// libs/4eye-types/ai/learning-modes/TriadicAssociationResponse.ts

/**
 * AI-generated triadic associations for neural-net style memory encoding.
 * 
 * The brain forms stronger memories through associative connections.
 * For any concept/word, generate 3 associative words that create
 * neural pathways for recall and understanding.
 * 
 * Example: "Blue" → ["Water", "Learning", "Color"]
 * 
 * These associations are used throughout the app:
 * - Hover effects on key terms (show 3 associations)
 * - Discussion topic organization
 * - Paragraph-level concept mapping
 * - Knowledge web construction
 * - Memory reinforcement during review
 * 
 * Guidelines:
 * - Choose associations that span different domains (concrete, abstract, emotional)
 * - Prefer common words that create strong mental images
 * - Associations should be memorable and personally relatable
 * - One association can be unexpected/creative for stronger encoding
 * - Generate associations for key terms, not every word
 * 
 * @interface TriadicAssociationResponseData
 */
export interface TriadicAssociationResponseData {
  /**
   * Array of triadic associations for key terms.
   * 
   * @example See TriadicAssociation interface
   */
  associations: TriadicAssociation[];

  /**
   * Optional: More complex concept triangles for deeper exploration.
   * These build on the basic associations with relationships and insights.
   * 
   * @example See ConceptTriangle interface
   */
  conceptTriangles?: ConceptTriangle[];
}

/**
 * Core triadic association: 1 term → 3 associative words.
 * The fundamental unit for neural-net style memory encoding.
 */
export interface TriadicAssociation {
  /**
   * The primary term/concept being associated.
   * 
   * @example "Forgiveness"
   * @example "Blue"
   */
  term: string;

  /**
   * Three associative words that create neural pathways.
   * Each word should activate different memory networks.
   * Array must have exactly 3 elements.
   * 
   * @example ["Release", "Peace", "Freedom"]
   * @example ["Water", "Learning", "Color"]
   */
  associations: [string, string, string];

  /**
   * Brief context for why these associations work.
   * Used for learning mode explanations.
   * 
   * @example "Release (action), Peace (outcome), Freedom (state)"
   */
  context?: string;

  /**
   * Where this term appears in the source (seconds).
   * For linking back to content.
   * 
   * @example 245
   */
  sourceTimestamp?: number;

  /**
   * Category of the term for organization.
   * 
   * @example "emotion"
   * @example "concept"
   * @example "process"
   */
  category?: string;
}

/**
 * Extended concept triangle for deeper exploration.
 * Builds on triadic associations with relationships and educational insight.
 * Used in learning modes, not hover effects.
 */
export interface ConceptTriangle {
  /**
   * Unique identifier.
   * 
   * @example "tri_cause_effect_solution"
   */
  id: string;

  /**
   * Triangle type for categorization.
   * 
   * CONCEPT: Three related concepts (e.g., cause, effect, solution)
   * PERSPECTIVE: Three viewpoints on one topic
   * EVIDENCE: Three supporting pieces
   * LEARNING_PATH: Prerequisite → Current → Advanced
   * 
   * @example "CONCEPT"
   */
  type: 'CONCEPT' | 'PERSPECTIVE' | 'EVIDENCE' | 'LEARNING_PATH';

  /**
   * The three concepts forming the triangle.
   * 
   * @example ["Cause", "Effect", "Solution"]
   */
  concepts: [string, string, string];

  /**
   * Relationships between concepts.
   * 
   * @example [{ from: 0, to: 1, relationship: "enables" }, ...]
   */
  relationships: ConceptRelationship[];

  /**
   * The "aha moment" - what this triangle teaches.
   * 
   * @example "Understanding cause leads to effect prediction, which enables solution design."
   */
  insight: string;
}

export interface ConceptRelationship {
  /** Index of source concept (0, 1, or 2). */
  from: number;
  
  /** Index of target concept (0, 1, or 2). */
  to: number;
  
  /** Relationship description. @example "enables" */
  relationship: string;
}
```

### TriangleResponseData (MVP)

```typescript
// libs/4eye-types/ai/learning-modes/TriangleResponse.ts

/**
 * AI-generated triadic understanding triangles.
 * 
 * Extract key concepts from content and organize them into
 * meaningful triangles of three related points with full descriptions
 * and educational insights.
 * 
 * This is the full-featured learning mode triangle, distinct from
 * TriadicAssociations (hover effects, simple 3-word associations).
 * 
 * Guidelines:
 * - Each triangle should represent a complete, coherent idea
 * - Connections between vertices should be clear and educational
 * - Include an "insight" that summarizes what the triangle teaches
 * - Prefer balanced triangles (equal relationship weights)
 * - Generate 2-5 triangles per content piece
 * 
 * Triangle types:
 * - CONCEPT: Three related concepts explaining a larger idea
 * - PERSPECTIVE: Three viewpoints on the same topic
 * - EVIDENCE: Three types of evidence supporting a claim
 * - LEARNING_PATH: Prerequisite → Current → Next concept
 * 
 * @interface TriangleResponseData
 */
export interface TriangleResponseData {
  /**
   * Array of generated triangles.
   * Order by importance/relevance.
   * 
   * @example See TriangleData interface
   */
  triangles: TriangleData[];

  /**
   * Overall summary of what the triangles teach.
   * 
   * @example "These triangles explore the interconnection between awareness, acceptance, and action in personal growth."
   */
  summary: string;

  /**
   * Concepts extracted but not used in triangles.
   * Can be used for follow-up exploration.
   * 
   * @example ["gratitude", "patience", "kindness"]
   */
  additionalConcepts: string[];
}

/**
 * A single triadic understanding triangle with full vertex detail.
 */
export interface TriangleData {
  /**
   * Unique identifier for this triangle.
   * 
   * @example "tri_problem_analysis_solution"
   */
  id: string;

  /**
   * Type of triangle structure.
   * 
   * @example "CONCEPT"
   */
  type: 'CONCEPT' | 'PERSPECTIVE' | 'EVIDENCE' | 'LEARNING_PATH';

  /**
   * The three vertices of the triangle with full details.
   * Array must have exactly 3 elements.
   * 
   * @example See ConceptVertex interface
   */
  vertices: [ConceptVertex, ConceptVertex, ConceptVertex];

  /**
   * Connections between vertices.
   * 
   * @example See TriangleConnection interface
   */
  connections: TriangleConnection[];

  /**
   * The "aha moment" - what this triangle teaches.
   * 
   * @example "Understanding cause leads to predicting effect, which enables designing solutions."
   */
  insight: string;
}

export interface ConceptVertex {
  /** Vertex identifier (0, 1, or 2). */
  id: string;
  
  /** Short label for the concept. @example "Cause" */
  label: string;
  
  /** Brief description. @example "The initial event or condition" */
  description: string;
  
  /** Optional timestamp in source recording. @example 423 */
  sourceTimestamp?: number;
}

export interface TriangleConnection {
  /** Source vertex id. @example "0" */
  from: string;
  
  /** Target vertex id. @example "1" */
  to: string;
  
  /** Relationship description. @example "enables" */
  relationship: string;
}
```

### SimplifyResponseData (MVP)

```typescript
// libs/4eye-types/ai/learning-modes/SimplifyResponse.ts

/**
 * AI-generated simplified content response.
 * 
 * Reduce complexity while preserving core meaning.
 * 
 * Guidelines:
 * - Use common words (8th grade reading level max)
 * - Break complex sentences into shorter ones
 * - Explain jargon in parentheses if kept
 * - Maintain the essential message
 * - Preserve important terminology with explanations
 * 
 * @interface SimplifyResponseData
 */
export interface SimplifyResponseData {
  /**
   * The simplified version of the content.
   * 
   * @example "Resilience is the ability to recover from setbacks. It's like a tree that bends in the wind but doesn't break."
   */
  simplifiedText: string;

  /**
   * Reading level of the output (Flesch-Kincaid or similar).
   * 
   * @example "6th grade"
   */
  readingLevel: string;

  /**
   * Key terms that were explained or simplified.
   * 
   * @example [{ "original": "resilience", "simplified": "the ability to bounce back from hard times" }]
   */
  termChanges: TermChange[];
}

export interface TermChange {
  /** Original complex term. @example "resilience" */
  original: string;
  
  /** Simplified explanation. @example "the ability to bounce back from hard times" */
  simplified: string;
}
```

### KnowledgeWebResponseData (MVP)

```typescript
// libs/4eye-types/ai/learning-modes/KnowledgeWebResponse.ts

/**
 * AI-generated knowledge web response.
 * 
 * Create a connected network of concepts showing relationships.
 * 
 * Guidelines:
 * - Identify 5-15 key concepts
 * - Show meaningful connections between concepts
 * - Use clear relationship labels
 * - Organize by centrality (most connected concepts are central)
 * - Include strength scores for connections
 * 
 * @interface KnowledgeWebResponseData
 */
export interface KnowledgeWebResponseData {
  /**
   * Nodes (concepts) in the knowledge web.
   * 
   * @example See WebNode interface
   */
  nodes: WebNode[];

  /**
   * Edges (connections) between nodes.
   * 
   * @example See WebEdge interface
   */
  edges: WebEdge[];

  /**
   * Central theme or topic of the web.
   * 
   * @example "The Scientific Method in Practice"
   */
  centralTheme: string;
}

export interface WebNode {
  /** Unique node identifier. @example "node_empathy" */
  id: string;
  
  /** Concept label. @example "Empathy" */
  label: string;
  
  /** Brief description. @example "Understanding others' feelings through perspective-taking" */
  description: string;
  
  /** Centrality score (0-1). Higher = more connected. @example 0.85 */
  centrality: number;
  
  /** Category for grouping. @example "relationship" */
  category?: string;
}

export interface WebEdge {
  /** Source node id. @example "node_empathy" */
  source: string;
  
  /** Target node id. @example "node_compassion" */
  target: string;
  
  /** Relationship type. @example "emphasizes" */
  relationship: string;
  
  /** Connection strength (0-1). @example 0.9 */
  strength: number;
}
```

### QuizMeResponseData (MVP)

```typescript
// libs/4eye-types/ai/learning-modes/QuizMeResponse.ts

/**
 * AI-generated quiz questions for active recall.
 * 
 * Create questions to test understanding of content.
 * 
 * Guidelines:
 * - Mix question types for variety
 * - Progress from recall to application questions
 * - Include clear explanations for answers
 * - Keep questions focused on key concepts
 * - Avoid trick questions
 * 
 * @interface QuizMeResponseData
 */
export interface QuizMeResponseData {
  /**
   * Generated quiz questions.
   * Order by difficulty (easiest first).
   * 
   * @example See QuizQuestion interface
   */
  questions: QuizQuestion[];

  /**
   * Topics covered by this quiz.
   * 
   * @example ["empathy", "compassion", "connection"]
   */
  topicsCovered: string[];

  /**
   * Overall difficulty level.
   * 
   * @example "medium"
   */
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizQuestion {
  /** Question identifier. @example "q1" */
  id: string;
  
  /** The question text. @example "What is the key difference between empathy and sympathy?" */
  question: string;
  
  /** Question format. @example "MULTIPLE_CHOICE" */
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'FILL_BLANK';
  
  /** Options for multiple choice. @example ["A. Empathy involves feeling with someone", "B. They mean the same thing", ...] */
  options?: string[];
  
  /** The correct answer. @example "A. Empathy involves feeling with someone" */
  correctAnswer: string;
  
  /** Explanation of why this is correct. @example "Empathy is feeling with someone, while sympathy is feeling for them." */
  explanation: string;
  
  /** Difficulty level. @example "easy" */
  difficulty: 'easy' | 'medium' | 'hard';
  
  /** Related concept. @example "emotional_intelligence" */
  concept?: string;
}
```

### QuizTheAIResponseData (MVP)

```typescript
// libs/4eye-types/ai/learning-modes/QuizTheAIResponse.ts

/**
 * AI response to user-created quiz questions.
 * 
 * User asks questions, AI answers, user validates.
 * This reverses the typical quiz dynamic for deeper learning.
 * 
 * Guidelines:
 * - Answer based only on provided context
 * - Express confidence level honestly
 * - If uncertain, say so clearly
 * - Provide reasoning for answers
 * - Keep answers concise but complete
 * 
 * @interface QuizTheAIResponseData
 */
export interface QuizTheAIResponseData {
  /**
   * The AI's answer to the user's question.
   * 
   * @example "According to the session, true listening requires full presence—putting aside your own thoughts to truly understand the other person."
   */
  answer: string;

  /**
   * How confident the AI is in this answer (0-1).
   * 
   * @example 0.85
   */
  confidence: number;

  /**
   * Explanation of reasoning.
   * 
   * @example "This answer is based on the direct statement in the transcript at the 15-minute mark where the speaker discussed active listening."
   */
  explanation: string;

  /**
   * What concepts this question tests.
   * 
   * @example ["listening", "presence", "empathy"]
   */
  conceptsTested: string[];

  /**
   * Optional: passages or timestamps supporting the answer.
   * 
   * @example ["15:23 - 'True listening means being fully present, not just waiting for your turn to speak...'"]
   */
  supportingEvidence?: string[];
}
```

### Zod Schemas

```typescript
// libs/4eye-types/ai/learning-modes/schemas.ts

import { z } from 'zod';

// Triadic Association schema (core neural-net model)
const TriadicAssociationSchema = z.object({
  term: z.string().max(100),
  associations: z.tuple([z.string(), z.string(), z.string()]),
  context: z.string().max(200).optional(),
  sourceTimestamp: z.number().int().optional(),
  category: z.string().optional(),
});

// Concept Triangle schema (extended learning mode)
const ConceptRelationshipSchema = z.object({
  from: z.number().int().min(0).max(2),
  to: z.number().int().min(0).max(2),
  relationship: z.string().max(50),
});

const ConceptTriangleSchema = z.object({
  id: z.string(),
  type: z.enum(['CONCEPT', 'PERSPECTIVE', 'EVIDENCE', 'LEARNING_PATH']),
  concepts: z.tuple([z.string(), z.string(), z.string()]),
  relationships: z.array(ConceptRelationshipSchema),
  insight: z.string().max(300),
});

export const TriadicAssociationResponseDataSchema = z.object({
  associations: z.array(TriadicAssociationSchema).min(1).max(20),
  conceptTriangles: z.array(ConceptTriangleSchema).optional(),
});

// Triangle schema (full-featured learning mode)
const ConceptVertexSchema = z.object({
  id: z.string(),
  label: z.string().max(50),
  description: z.string().max(200),
  sourceTimestamp: z.number().int().optional(),
});

const TriangleConnectionSchema = z.object({
  from: z.string(),
  to: z.string(),
  relationship: z.string().max(50),
});

const TriangleDataSchema = z.object({
  id: z.string(),
  type: z.enum(['CONCEPT', 'PERSPECTIVE', 'EVIDENCE', 'LEARNING_PATH']),
  vertices: z.tuple([ConceptVertexSchema, ConceptVertexSchema, ConceptVertexSchema]),
  connections: z.array(TriangleConnectionSchema),
  insight: z.string().max(300),
});

export const TriangleResponseDataSchema = z.object({
  triangles: z.array(TriangleDataSchema).min(1).max(10),
  summary: z.string().max(500),
  additionalConcepts: z.array(z.string()),
});

// Simplify schema
const TermChangeSchema = z.object({
  original: z.string(),
  simplified: z.string(),
});

export const SimplifyResponseDataSchema = z.object({
  simplifiedText: z.string(),
  readingLevel: z.string(),
  termChanges: z.array(TermChangeSchema),
});

// Knowledge Web schema
const WebNodeSchema = z.object({
  id: z.string(),
  label: z.string().max(50),
  description: z.string().max(200),
  centrality: z.number().min(0).max(1),
  category: z.string().optional(),
});

const WebEdgeSchema = z.object({
  source: z.string(),
  target: z.string(),
  relationship: z.string().max(50),
  strength: z.number().min(0).max(1),
});

export const KnowledgeWebResponseDataSchema = z.object({
  nodes: z.array(WebNodeSchema).min(3).max(20),
  edges: z.array(WebEdgeSchema).min(2),
  centralTheme: z.string().max(200),
});

// Quiz Me schema
const QuizQuestionSchema = z.object({
  id: z.string(),
  question: z.string().max(500),
  type: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER', 'FILL_BLANK']),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string(),
  explanation: z.string().max(500),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  concept: z.string().optional(),
});

export const QuizMeResponseDataSchema = z.object({
  questions: z.array(QuizQuestionSchema).min(1).max(10),
  topicsCovered: z.array(z.string()),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

// Quiz The AI schema
export const QuizTheAIResponseDataSchema = z.object({
  answer: z.string(),
  confidence: z.number().min(0).max(1),
  explanation: z.string().max(500),
  conceptsTested: z.array(z.string()),
  supportingEvidence: z.array(z.string()).optional(),
});
```

### Example Responses

**Triadic Associations (hover effects, term encoding):**
```json
{
  "associations": [
    {
      "term": "Forgiveness",
      "associations": ["Release", "Peace", "Freedom"],
      "context": "Release (action), Peace (outcome), Freedom (state)",
      "sourceTimestamp": 245,
      "category": "growth"
    },
    {
      "term": "Resilience",
      "associations": ["Bounce", "Strength", "Adapt"],
      "context": "Bounce (recovery), Strength (capacity), Adapt (response)",
      "category": "mindset"
    },
    {
      "term": "Empathy",
      "associations": ["Listen", "Feel", "Connect"],
      "context": "Listen (action), Feel (experience), Connect (outcome)",
      "category": "relationship"
    },
    {
      "term": "Growth",
      "associations": ["Change", "Learn", "Expand"],
      "context": "Change (catalyst), Learn (process), Expand (result)",
      "category": "development"
    }
  ],
  "conceptTriangles": [
    {
      "id": "tri_healing_process",
      "type": "CONCEPT",
      "concepts": ["Awareness", "Acceptance", "Action"],
      "relationships": [
        { "from": 0, "to": 1, "relationship": "leads to" },
        { "from": 1, "to": 2, "relationship": "enables" },
        { "from": 2, "to": 0, "relationship": "deepens" }
      ],
      "insight": "Healing begins with awareness, grows through acceptance, and is completed through intentional action."
    }
  ]
}
```

**Triangle (full learning mode with descriptions):**
```json
{
  "triangles": [
    {
      "id": "tri_communication",
      "type": "CONCEPT",
      "vertices": [
        { "id": "0", "label": "Listen", "description": "Fully attending to understand" },
        { "id": "1", "label": "Understand", "description": "Processing and empathizing with meaning" },
        { "id": "2", "label": "Respond", "description": "Contributing thoughtfully to dialogue" }
      ],
      "connections": [
        { "from": "0", "to": "1", "relationship": "enables" },
        { "from": "1", "to": "2", "relationship": "informs" },
        { "from": "2", "to": "0", "relationship": "invites more" }
      ],
      "insight": "Effective communication is a cycle: listening enables understanding, understanding informs response, and response invites more listening."
    }
  ],
  "summary": "The core teaching centers on the interconnected nature of listening, understanding, and responding in meaningful dialogue.",
  "additionalConcepts": ["patience", "presence", "clarity"]
}
```

**Quiz Me:**
```json
{
  "questions": [
    {
      "id": "q1",
      "question": "What does active listening primarily require?",
      "type": "MULTIPLE_CHOICE",
      "options": ["A. Preparing your response", "B. Full attention and presence", "C. Taking detailed notes", "D. Asking many questions"],
      "correctAnswer": "B. Full attention and presence",
      "explanation": "Active listening requires giving your full attention and being present, rather than planning your response.",
      "difficulty": "easy",
      "concept": "communication"
    }
  ],
  "topicsCovered": ["communication", "relationships", "growth"],
  "difficulty": "easy"
}
```

**Quiz The AI:**
```json
{
  "answer": "According to the session, forgiveness is described as a gift you give yourself, because holding onto resentment hurts the holder more than the offender.",
  "confidence": 0.92,
  "explanation": "This answer is based on the direct explanation at the 15-minute mark of the session where the speaker discussed the psychology of releasing resentment.",
  "conceptsTested": ["forgiveness", "resentment", "emotional_freedom"],
  "supportingEvidence": ["15:23 - 'Forgiveness isn't about condoning what happened—it's about freeing yourself from the weight of carrying it...'"]
}
```

---

## API Surface

### Queries
- `learningModes(sessionId)` — Get learning modes for session
- `userKnowledgeWeb(userId)` — Get user's accumulated knowledge web
- `triangleProgress(userId, sessionId)` — Get triangle completion status

### Mutations
- `generateLearningModes(sessionId, types[])` — Generate learning modes
- `completeTriangle(triangleId, userAnswers)` — Submit triangle completion
- `saveToKnowledgeWeb(conceptIds[])` — Add concepts to personal web

### Subscriptions
- `learningModeGenerated(sessionId)` — Real-time generation updates

---

## Cost Analysis

| Operation | Model | Tokens (est.) | Cost/Session |
|-----------|-------|---------------|--------------|
| Concept extraction | GPT-5.2-mini | ~2,000 | $0.002 |
| Triangle generation | GPT-5.2 | ~3,000 | $0.03 |
| **Total per session** | | | **~$0.032** |

Free tier: 5 sessions/week with basic learning modes
Premium: Unlimited, all mode types
