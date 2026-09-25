# F15 — Quizzes & Exercises

> AI-generated quizzes, exercises, and active recall activities from session content.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [learning-modes.json](https://4eye.ai/docs/learning-modes)
**Related:** [F14 — Learning Modes](learning-modes.md) | [F4 — Chat](chat-interactivity.md) | [C8 — Typed AI Responses](../core/typed-ai-responses.md)

---

## ⚠️ Key Decisions (Do Not Overwrite)

1. **Typed AI Responses** — Quiz generation uses typed response system. See [C8](../core/typed-ai-responses.md)
2. **Learning Science Based** — Active recall via testing effect
3. **Multiple Exercise Types** — Quick checks, matching, sequencing, short answer

---

## Overview

Quizzes & Exercises leverages AI to automatically generate learning assessments from transcribed content. These provide active recall opportunities that significantly improve retention compared to passive review.

**Learning Science:** Active recall (testing yourself) strengthens memory more than re-reading or passive review. Even incorrect attempts improve learning through the "testing effect."

---

## Exercise Types

### Quick Feedback Exercises

| Type | Description | Effort | Time |
|------|-------------|--------|------|
| **Quick Checks** | Simple true/false or multiple choice | Low | 10-30 sec |
| **Connection Builders** | Match related concepts or complete triangles | Low | 30-60 sec |
| **Fill-in Recall** | Complete missing pieces from memory | Low | 15-45 sec |
| **Sort & Categorize** | Organize items into categories | Medium | 1-2 min |
| **Sequence Building** | Put steps or events in correct order | Medium | 1-2 min |

### Assessment Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Multiple Choice** | Select correct answer from options | Quick concept check |
| **Fill in the Blank** | Complete sentence with missing word/phrase | Terminology recall |
| **Matching** | Connect related items | Relationship understanding |
| **Ordering** | Arrange in correct sequence | Process/timeline |
| **Short Answer** | Brief written response | Deep understanding |
| **Explain This** | Elaborate on a concept | Application/synthesis |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      QUIZ GENERATION PIPELINE                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  INPUT: Transcript + Summary + Recap                              │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  CONTENT ANALYSIS (GPT-5.2)                                       │  │
│   │                                                                    │  │
│   │  Extract testable content:                                        │  │
│   │  ├── Key facts and definitions                                   │  │
│   │  ├── Relationships and processes                                 │  │
│   │  ├── Concepts and applications                                   │  │
│   │  └── Sequence/timeline elements                                  │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  QUESTION GENERATION                                              │  │
│   │                                                                    │  │
│   │  For each testable element, generate appropriate question type:  │  │
│   │                                                                    │  │
│   │  Fact → Multiple Choice                                          │  │
│   │  Definition → Fill in Blank                                      │  │
│   │  Relationship → Matching                                         │  │
│   │  Process → Ordering                                              │  │
│   │  Concept → Short Answer                                          │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  DIFFICULTY CALIBRATION                                           │  │
│   │                                                                    │  │
│   │  Adjust based on:                                                 │  │
│   │  ├── User's reading level preference                             │  │
│   │  ├── Past performance (adaptive)                                 │  │
│   │  └── Requested difficulty                                        │  │
│   └────────────────────────────┬─────────────────────────────────────┘  │
│                                │                                         │
│                                ▼                                         │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │  Quiz {questions[], difficulty, estimatedTime, topics[]}          │  │
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Feedback Principles

| Principle | Description | Why |
|-----------|-------------|-----|
| **Immediate Response** | Feedback within 1 second | Strengthens action-outcome connection |
| **Clear Indication** | Obvious right/wrong signal | Eliminates ambiguity |
| **Explanation** | Brief why answer was right/wrong | Transforms errors into learning |
| **Encouragement** | Positive framing that encourages retry | Maintains growth mindset |
| **Progress Tracking** | Visual progress toward mastery | Creates accomplishment sense |

---

## Data Model

### Quiz
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| title | string | |
| questionCount | int | |
| difficulty | enum | EASY, MEDIUM, HARD, ADAPTIVE |
| estimatedMinutes | int | |
| topics | string[] | Covered topics |
| modelUsed | string | e.g., "gpt-5.2" |
| generatedAt | datetime | |

### Question
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| quizId | UUID | FK → Quiz |
| type | enum | MULTIPLE_CHOICE, FILL_BLANK, MATCHING, ORDERING, SHORT_ANSWER |
| sequenceIndex | int | Order in quiz |
| prompt | text | Question text |
| options | json? | For MC: {label, value, isCorrect}[] |
| correctAnswer | text | For validation |
| explanation | text | Why this is correct |
| difficulty | enum | EASY, MEDIUM, HARD |
| sourceTimestamp | decimal? | Where in recording |
| points | int | Default 1 |

### QuizAttempt
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| quizId | UUID | FK → Quiz |
| userId | UUID | FK → User |
| startedAt | datetime | |
| completedAt | datetime? | |
| score | decimal | 0-100 |
| correctCount | int | |
| totalQuestions | int | |
| timeSpentSeconds | int | |

### QuestionResponse
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| attemptId | UUID | FK → QuizAttempt |
| questionId | UUID | FK → Question |
| userAnswer | text | |
| isCorrect | boolean | |
| pointsEarned | int | |
| responseTimeMs | int | |
| answeredAt | datetime | |

---

## Adaptive Difficulty

The system adjusts question difficulty based on performance:

```
Performance > 80% → Increase difficulty
Performance 50-80% → Maintain difficulty  
Performance < 50% → Decrease difficulty
```

**Adaptive factors:**
- Question complexity
- Number of distractors (MC)
- Abstract vs. concrete concepts
- Application vs. recall questions

---

## API Surface

### Queries
- `quiz(quizId)` — Get quiz details
- `quizzes(sessionId)` — List quizzes for session
- `quizAttempts(userId, quizId?)` — Get user's quiz history
- `questionResponse(attemptId, questionId)` — Get specific response

### Mutations
- `generateQuiz(sessionId, options)` — Generate new quiz
- `startQuizAttempt(quizId)` — Begin quiz attempt
- `submitAnswer(attemptId, questionId, answer)` — Submit single answer
- `completeQuizAttempt(attemptId)` — Finish quiz
- `regenerateQuestion(quizId, questionId)` — Get new version

### Subscriptions
- `quizGenerated(sessionId)` — Real-time generation status

---

## Vertical Customization

| Vertical | Question Focus | Special Types |
|----------|----------------|---------------|
| **Learning** | Concept recall, application | General |
| **Education** | Learning objectives, curriculum alignment | Standards-mapped |
| **Religion** | Scripture references, theological concepts | Scripture completion |
| **Professional** | Key decisions, action items | Scenario-based |

---

## Response Types (Draft)

> These types define the AI response structure for quiz generation. See [C8 — Typed AI Responses](../core/typed-ai-responses.md) for the full pattern.

### QuizGenerationResponseData

```typescript
// libs/4eye-types/ai/quizzes/QuizGenerationResponse.ts

/**
 * AI-generated quiz response.
 * 
 * Generate quiz questions from session content for active recall.
 * 
 * Guidelines:
 * - Mix question types for variety (MC, fill-blank, matching, etc.)
 * - Progress from easier recall to harder application
 * - Avoid trick questions or ambiguous wording
 * - Include clear explanations for all answers
 * - Base questions on actual content, not assumptions
 * - For MC questions, make distractors plausible but clearly wrong
 * 
 * Difficulty guidelines:
 * EASY: Direct recall, explicit in content
 * MEDIUM: Requires inference or connection
 * HARD: Application, synthesis, or implicit concepts
 * 
 * @interface QuizGenerationResponseData
 */
export interface QuizGenerationResponseData {
  /**
   * Title for the quiz.
   * 
   * @example "Understanding Forgiveness"
   */
  title: string;

  /**
   * Generated questions.
   * Order by difficulty (easier first).
   * 
   * @example See QuizQuestionData interface
   */
  questions: QuizQuestionData[];

  /**
   * Topics covered by this quiz.
   * 
   * @example ["forgiveness", "healing", "personal growth"]
   */
  topicsCovered: string[];

  /**
   * Overall difficulty level.
   * 
   * @example "MEDIUM"
   */
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ADAPTIVE';

  /**
   * Estimated time to complete in minutes.
   * 
   * @example 5
   */
  estimatedMinutes: number;
}

/**
 * A single quiz question.
 */
export interface QuizQuestionData {
  /**
   * Question type.
   * 
   * @example "MULTIPLE_CHOICE"
   */
  type: 'MULTIPLE_CHOICE' | 'FILL_BLANK' | 'MATCHING' | 'ORDERING' | 'SHORT_ANSWER';

  /**
   * The question prompt.
   * 
   * @example "What is the key difference between forgiveness and reconciliation?"
   */
  prompt: string;

  /**
   * Options for multiple choice questions.
   * Include 4 options with exactly one correct.
   * 
   * @example [{ "label": "A", "value": "Forgiveness is internal, reconciliation requires both parties", "isCorrect": true }, ...]
   */
  options?: QuizOption[];

  /**
   * Items for matching questions.
   * Two arrays of equal length to be matched.
   * 
   * @example { "left": ["Empathy", "Compassion", "Sympathy"], "right": ["feeling with someone", "acting to help", "feeling for someone"] }
   */
  matchingItems?: MatchingItems;

  /**
   * Items for ordering questions.
   * Listed in correct order.
   * 
   * @example ["Awareness", "Acceptance", "Action", "Integration"]
   */
  orderingItems?: string[];

  /**
   * The correct answer.
   * For MC: the value. For fill-blank: the word/phrase. For matching: indices. For ordering: correct sequence.
   * 
   * @example "Forgiveness is internal, reconciliation requires both parties"
   */
  correctAnswer: string;

  /**
   * Explanation of why this is the correct answer.
   * Shown after answering.
   * 
   * @example "Forgiveness is a personal choice you make internally. Reconciliation requires participation from both people to restore the relationship."
   */
  explanation: string;

  /**
   * Difficulty level.
   * 
   * @example "EASY"
   */
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';

  /**
   * Related concept/topic.
   * 
   * @example "forgiveness"
   */
  topic?: string;

  /**
   * Timestamp in source where this concept appears.
   * 
   * @example 325
   */
  sourceTimestamp?: number;

  /**
   * Points for this question.
   * 
   * @example 1
   */
  points: number;
}

export interface QuizOption {
  /** Option label (A, B, C, D). @example "A" */
  label: string;
  
  /** Option text. @example "They will be comforted" */
  value: string;
  
  /** Whether this is the correct answer. @example true */
  isCorrect: boolean;
}

export interface MatchingItems {
  /** Left column items. @example ["Blessed are the meek", "Blessed are the peacemakers"] */
  left: string[];
  
  /** Right column items (in correct matching order). @example ["inherit the earth", "called children of God"] */
  right: string[];
}
```

### Zod Schema

```typescript
// libs/4eye-types/ai/quizzes/QuizGenerationResponse.schema.ts

import { z } from 'zod';

const QuizOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  isCorrect: z.boolean(),
});

const MatchingItemsSchema = z.object({
  left: z.array(z.string()).min(2),
  right: z.array(z.string()).min(2),
});

const QuizQuestionDataSchema = z.object({
  type: z.enum(['MULTIPLE_CHOICE', 'FILL_BLANK', 'MATCHING', 'ORDERING', 'SHORT_ANSWER']),
  prompt: z.string().min(10).max(500),
  options: z.array(QuizOptionSchema).length(4).optional(),
  matchingItems: MatchingItemsSchema.optional(),
  orderingItems: z.array(z.string()).min(3).optional(),
  correctAnswer: z.string(),
  explanation: z.string().min(10).max(500),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  topic: z.string().optional(),
  sourceTimestamp: z.number().int().optional(),
  points: z.number().int().min(1).default(1),
});

export const QuizGenerationResponseDataSchema = z.object({
  title: z.string().min(5).max(100),
  questions: z.array(QuizQuestionDataSchema).min(3).max(20),
  topicsCovered: z.array(z.string()),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD', 'ADAPTIVE']),
  estimatedMinutes: z.number().int().min(1).max(60),
});

export type QuizOption = z.infer<typeof QuizOptionSchema>;
export type MatchingItems = z.infer<typeof MatchingItemsSchema>;
export type QuizQuestionData = z.infer<typeof QuizQuestionDataSchema>;
export type QuizGenerationResponseData = z.infer<typeof QuizGenerationResponseDataSchema>;
```

### Example Response

```json
{
  "title": "Understanding Forgiveness",
  "questions": [
    {
      "type": "MULTIPLE_CHOICE",
      "prompt": "What is the key difference between forgiveness and reconciliation?",
      "options": [
        { "label": "A", "value": "Forgiveness is internal, reconciliation requires both parties", "isCorrect": true },
        { "label": "B", "value": "They mean the same thing", "isCorrect": false },
        { "label": "C", "value": "Reconciliation comes first", "isCorrect": false },
        { "label": "D", "value": "Forgiveness requires the other person to apologize", "isCorrect": false }
      ],
      "correctAnswer": "Forgiveness is internal, reconciliation requires both parties",
      "explanation": "Forgiveness is a personal choice you make internally. Reconciliation requires participation from both people to restore the relationship.",
      "difficulty": "EASY",
      "topic": "forgiveness",
      "sourceTimestamp": 325,
      "points": 1
    },
    {
      "type": "FILL_BLANK",
      "prompt": "Holding onto resentment primarily hurts the ________.",
      "correctAnswer": "holder",
      "explanation": "Resentment affects the person holding it more than the person it's directed toward.",
      "difficulty": "EASY",
      "topic": "resentment",
      "points": 1
    },
    {
      "type": "MATCHING",
      "prompt": "Match each concept to its description:",
      "matchingItems": {
        "left": ["Empathy", "Compassion", "Sympathy"],
        "right": ["feeling with someone", "acting to help", "feeling for someone"]
      },
      "correctAnswer": "0-0,1-1,2-2",
      "explanation": "Each represents a different way of relating to others' experiences.",
      "difficulty": "MEDIUM",
      "topic": "emotional_intelligence",
      "points": 3
    }
  ],
  "topicsCovered": ["forgiveness", "empathy", "emotional_intelligence"],
  "difficulty": "MEDIUM",
  "estimatedMinutes": 5
}
```

---

## Gamification Integration

| Element | Description |
|---------|-------------|
| **XP for Completion** | Points for finishing quizzes |
| **Accuracy Bonus** | Extra XP for high scores |
| **Speed Bonus** | Bonus for fast correct answers |
| **Streak Rewards** | Consecutive correct answers |
| **Perfect Score Badge** | Achievement for 100% |
| **Daily Quiz Challenge** | Timed daily quiz for bonus rewards |

---

## Cost Analysis

| Operation | Model | Tokens (est.) | Cost/Quiz |
|-----------|-------|---------------|-----------|
| Content analysis | GPT-5.2-mini | ~2,000 | $0.002 |
| Question generation (10 Q) | GPT-5.2 | ~4,000 | $0.04 |
| Answer validation | GPT-5.2-mini | ~500 | $0.0005 |
| **Total per quiz** | | | **~$0.045** |

Free tier: 2 quizzes/session, 5/week total
Premium: Unlimited quizzes, adaptive difficulty, detailed analytics

---

## Best Practices

1. **Input Before Display** — Have learners try before showing answers (even if wrong, effort strengthens encoding)
2. **Low-Effort, High-Value** — Quick 10-second exercises done frequently beat long study sessions
3. **Spaced Repetition** — Review missed questions at optimal intervals
4. **Complete the Triangle** — Every quiz should connect to the learning modes triangles
