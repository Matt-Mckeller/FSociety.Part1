# V2 — Education Vertical

> **Market-specific configuration** for educational contexts: classrooms, lectures, tutoring, courses.
> 
> **What is a Vertical?** A vertical is a market segment that uses the same core 4eye platform (~75% shared) with customized prompts, terminology, and features. The universal learning core (transcription, translation, AI chat, learning modes, quizzes) is built first. Verticals add context-specific overlays: lecture-focused prompts, educational terminology, and teaching-specific features like LMS integration and assignment tracking.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

---

## Overview

The Education vertical configures 4eye for learning environments:
- K-12 classrooms
- University lectures
- Online courses
- Tutoring sessions
- Professional development
- Training workshops

---

## Vertical Configuration

### Terminology Mapping

| Generic Term | Education Term |
|--------------|----------------|
| Session | Class / Lecture |
| Recording | Lecture Recording |
| Speaker | Instructor / Professor / Teacher |
| Host | Educator / Facilitator |
| Organization | School / University / Institution |
| Room | Classroom / Course |
| Content | Lesson / Material |

### Prompt Customization

```typescript
export const educationVerticalConfig: VerticalConfig = {
  verticalId: 'education',
  name: 'Education',
  
  prompts: {
    summary: {
      systemPrompt: `You are summarizing an educational lecture or lesson.
        Focus on: learning objectives, key concepts, examples, practice problems,
        and connections to prior knowledge.`,
      highlightCategories: ['Concept', 'Example', 'Definition', 'Practice'],
    },
    
    recap: {
      systemPrompt: `Create a study-focused recap of this lesson.
        Structure: Learning Objectives, Key Concepts, Examples, Questions Raised, Next Steps`,
      highlightTypes: ['concept', 'definition', 'example', 'question', 'assignment'],
    },
    
    visualGeneration: {
      systemPrompt: `Generate educational diagrams and concept visualizations.
        Style: Clean, academic, suitable for study materials.
        Types: Flowcharts, concept maps, timelines, diagrams.`,
      styleGuide: 'educational-academic',
    },
    
    speakerFeedback: {
      categories: [
        'Clarity of explanation',
        'Pacing',
        'Use of examples',
        'Engagement techniques',
        'Question handling',
        'Learning objective coverage',
      ],
    },
    
    positiveSpeechTransform: {
      context: 'educational',
      focus: 'Transform discouraging language into growth-mindset encouragement',
    },
  },
  
  features: {
    quizGeneration: true,
    learningModes: true,
    progressTracking: true,
    lmsIntegration: true,
    assignmentTracking: true,
  },
};
```

---

## Education-Specific Features

### Quiz & Exercise Generation (F15)

Automatically generate learning assessments from content:
- Multiple choice questions
- Fill-in-the-blank
- Sequencing exercises
- Concept matching
- Short answer prompts

### Learning Modes (F14)

Full integration with triadic understanding, visual learning, and active recall exercises.
See [learning-modes.json](https://4eye.ai/docs/learning-modes) for details.

### LMS Integration

Connect with learning management systems:
- Canvas
- Blackboard
- Google Classroom
- Moodle
- EdLink (unified API)

### Progress Tracking

- Learning objectives completion
- Quiz performance analytics
- Knowledge gap identification
- Spaced repetition scheduling

---

## User Stories (Education Vertical)

- A professor records a lecture and students receive auto-generated study guides
- A student reviews a lecture with triadic learning triangles highlighting key concepts
- A teacher generates a quiz from today's lesson for homework
- A tutor conducts a session and the AI identifies knowledge gaps
- A university creates organization-wide rooms for all courses
- A student takes a practice quiz generated from last week's lecture

---

## Pricing Tier Features

| Feature | Free | Student | Educator | Institution |
|---------|------|---------|----------|-------------|
| Live transcription | ✓ | ✓ | ✓ | ✓ |
| Quiz generation | 2/week | 10/week | Unlimited | Unlimited |
| Learning modes | Basic | Full | Full | Full |
| LMS integration | ✗ | ✗ | ✓ | ✓ |
| Analytics | Basic | Personal | Class-wide | Institution-wide |
| Storage | 5 sessions | 50 | Unlimited | Unlimited |

---

## Data Model Extensions

```typescript
interface Session {
  // Base fields...
  
  // Education vertical extensions
  verticalType: 'education';
  metadata: {
    courseId?: string;
    subject?: string;
    learningObjectives?: string[];
    assignmentIds?: string[];
    difficulty?: 'introductory' | 'intermediate' | 'advanced';
  };
}

interface Organization {
  // Base fields...
  
  // Education vertical extensions
  metadata: {
    institutionType?: 'k12' | 'higher_ed' | 'vocational' | 'corporate_training';
    lmsProvider?: string;
    lmsIntegrationConfig?: LMSConfig;
  };
}
```

---

## Compliance

- **FERPA** — Student data privacy (US)
- **COPPA** — Children under 13 (parental consent)
- **GDPR** — EU student data protection
- **Accessibility** — WCAG 2.1 AA for all content
