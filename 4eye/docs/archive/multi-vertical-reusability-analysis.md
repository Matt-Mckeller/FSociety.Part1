# 4eye Multi-Vertical Architecture Analysis

> Analysis of how the 4eye platform supports multiple verticals (Learning, Education, Religion, Professional) through a shared core with vertical-specific configuration.

**Created:** March 12, 2026
**Updated:** March 26, 2026
**Status:** Adopted — 4eye is now a multi-vertical learning platform

---

## Executive Summary

4eye is a **multi-vertical learning platform** with a universal learning core that serves multiple market segments. Education and worldwide learning is the primary target. 

**The Core Platform** (built first) provides domain-agnostic learning capabilities:
- Audio/video capture and transcription
- Real-time translation (50+ languages)
- AI Chat with learning modes and accessibility features
- Learning transformations (triadic, visual, exercises)
- Quizzes, summaries, recaps, speaker feedback
- Progress tracking and analytics

**Expansions & Integrations** 
- Gamification ( Seperate App / Integrations )

**Verticals & White Labeling** Do not worry about this aspect too much for initial implementations, focus on Learning as the primary avenue and build a solid foundation for Education. There are different areas that may also benefit from learning and have specific features. This primarily relates to We may adapt the platform for specific markets through:
1. **Prompt engineering** — AI focus changes per context (sermon themes vs. lecture concepts vs. meeting action items)
2. **Terminology customization** — UI copy adapts (\"Room\" → \"Classroom\" → \"Meeting Room\")
3. **Feature toggles** — Context-specific features enabled/disabled per vertical
4. **Vertical-specific additions** — New features, pipelines, and ui for specific markets (cross-faith comparison, LMS integration, decision logging)

**Market Verticals & Domains:**
- **Learning** (general) — Default configuration for self-directed learners
- **Religion** (V1) — Cross-faith comparison, scripture references, sermon context
- **Education** (V2) — LMS integration, courses, student/teacher roles
- **Professional** (V3) — Conferences, meetups, ted talks, training, compliance, action items

---

## Platform Component Analysis

### Completely Generic Components (100% Reusable)

| Component | Module(s) | Notes |
|-----------|-----------|-------|
| **Audio/Video Capture** | F1 | MediaRecorder API, file upload — zero domain knowledge |
| **Speech-to-Text** | F1 | Google STT / Whisper — language-agnostic |
| **Live Translation** | F2 | Google Translate — works for any content |
| **Reading Levels** | F3 | Child/Standard/Academic — applicable everywhere |
| **Recordings** | F5 | GCS storage, playback — pure infrastructure |
| **Learning Modes** | F14 | Triadic understanding, visual learning — universal |
| **Quizzes/Exercises** | F15 | AI-generated active recall — content-agnostic |
| **Speaker Diarization** | F9 | Detecting "Speaker 1, 2, 3" — content-agnostic |
| **Real-time Infrastructure** | C4 | WebSocket, subscriptions — pure infra |
| **Authentication** | C2 | Users, roles, guests — universal |
| **Payments** | W5 | Stripe, tiers — just rebrand tier names |
| **Notifications** | W9 | Email/push — content-agnostic |
| **Rooms/Sessions Core** | W4 | CRUD, invite links — just rename concepts |

**Reuse percentage: ~55% of total codebase is completely generic**

---

### Prompt-Configurable Components

These components work across verticals with **only AI prompt configuration**:

| Component | Learning (Default) | Education | Religion | Professional |
|-----------|-------------------|-----------|----------|--------------|
| **Summaries (F6)** | Key points, concepts | Learning objectives | Theological focus | Action items, decisions |
| **Recaps (F7)** | Key Concepts, Examples | Assignments, Q&A | Scripture, Story | Decisions, Next Steps |
| **Chat Q&A (F4)** | General context | Educational context | Religious context | Business context |
| **Visual Generation (F12)** | Concept diagrams | Educational diagrams | Religious imagery | Charts, infographics |
| **Positive Speech (F11)** | General positivity | Anti-bullying | Religious hate → healing | Professional tone |
| **Speaker Feedback (F13)** | General delivery | Lecture effectiveness | Sermon delivery | Meeting facilitation |

**Reuse percentage: ~30% needs prompt configuration only**

---

### Vertical-Specific Features

| Feature | Learning | Education | Religion | Professional |
|---------|----------|-----------|----------|--------------|
| Learning Modes (triadic, visual) | ✓ | ✓ | ✓ | ✓ |
| Quizzes & Exercises | ✓ | ✓ | ✓ | △ |
| Cross-Source Comparison | ✓ | ✓ | ✓ (cross-faith) | △ |
| Scripture References | ✗ | ✗ | ✓ | ✗ |
| LMS Integration | ✗ | ✓ | ✗ | ✗ |
| Course/Assignment Tracking | ✗ | ✓ | ✗ | ✗ |
| Action Item Extraction | ✗ | ✗ | ✗ | ✓ |
| Compliance Recording | ✗ | ✗ | ✗ | ✓ |

---

## Vertical Deep Dives

### Learning (Primary/Default)

The default vertical for general learning use cases:
- Self-study from podcasts, videos, lectures
- Personal knowledge management
- Content transformation for better retention

### Education

See [plans/verticals/education.md](../../plans/verticals/education.md)

| Religion Feature | EDU Equivalent | Changes Needed |
|------------------|----------------|----------------|
| Room | Classroom / Course | Terminology only |
| Session | Lecture / Lesson | Terminology only |
| Host | Instructor / Teacher | Terminology only |
| Member | Student | Terminology only |
| Organization | School / Institution | Terminology only |
| Summary | Lecture Summary | Prompt: focus on learning objectives, key concepts |
| Recap | Key Moments | Prompt: types = KEY_CONCEPT, EXAMPLE, DEFINITION, QUESTION, EXERCISE |
| Speaker Feedback | Teaching Feedback | Prompt: categories = Clarity, Pacing, Engagement, Examples, Assessment |
| Positive Speech | Inclusive Language | Prompt: detect bullying, discrimination, inappropriate content |
| Visual Generation | Concept Diagrams | Prompt: educational diagrams, flowcharts, process illustrations |
| Cross-Faith | **Skip** | Not applicable (or repurpose as "Cross-Discipline Perspectives") |

### EDU-Specific Features to Add

| Feature | Description | Effort |
|---------|-------------|--------|
| **Quiz Generation** | Generate quiz questions from lecture content | 2-3 days |
| **Concept Map** | Visual concept relationships | 3-4 days |
| **Study Guide** | Structured study materials | 1-2 days |
| **Flashcard Export** | Export key terms as flashcards | 1 day |
| **Learning Objectives Extraction** | Auto-detect/list learning objectives | 1 day |
| **Attendance Tracking** | Who attended which lectures | Already exists (SessionUser) |
| **LMS Integration** | Canvas, Blackboard, Moodle webhooks | 1-2 weeks |

---

## Corporate/Meetings Vertical Deep Dive

### Use Cases

1. **All-Hands Meetings** — Company-wide updates
2. **Team Standups** — Daily/weekly syncs
3. **Client Meetings** — External stakeholder sessions
4. **Training Sessions** — Internal education
5. **Board Meetings** — Formal governance

### Feature Mapping (Religion → Corporate)

| Religion Feature | Corporate Equivalent | Changes Needed |
|------------------|---------------------|----------------|
| Room | Meeting Room / Channel | Terminology only |
| Session | Meeting | Terminology only |
| Host | Organizer / Facilitator | Terminology only |
| Organization | Company / Team | Terminology only |
| Summary | Meeting Summary + Action Items | Prompt: extract decisions, action items, owners |
| Recap | Key Moments | Types = DECISION, ACTION_ITEM, DISCUSSION_POINT, QUESTION |
| Speaker Feedback | Facilitator Feedback | Categories = Clarity, Time Management, Inclusivity |
| Positive Speech | Professional Language | Prompt: toxic workplace, harassment, discrimination |
| Visual Generation | **Skip or Charts** | Probably skip for meetings |
| Cross-Faith | **Skip** | Not applicable |

### Corporate-Specific Features to Add

| Feature | Description | Effort |
|---------|-------------|--------|
| **Action Item Extraction** | Auto-extract "X will do Y by Z" | 2 days |
| **Decision Log** | Track decisions made in meeting | 2 days |
| **Follow-up Reminders** | Notify assignees of action items | 1-2 days |
| **Slack/Teams Integration** | Post summaries to channels | 2-3 days |
| **Calendar Integration** | Link sessions to calendar events | 2 days |
| **CRM Integration** | Salesforce, HubSpot for client calls | 1 week |
| **Confidentiality Levels** | Mark meetings as confidential | 1 day |

---

## Multi-Vertical Architecture Design

### Option A: Separate Deployments (Current Implicit Approach)

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   4eye.ai       │  │   4edu.ai       │  │   4meet.ai      │
│   (Religion)    │  │   (Education)   │  │   (Corporate)   │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│  Shared Core    │  │  Shared Core    │  │  Shared Core    │
│  + Religion     │  │  + Education    │  │  + Corporate    │
│    Config       │  │    Config       │  │    Config       │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Pros:**
- Simple mental model
- Independent scaling
- Different pricing per vertical
- Vertical-specific marketing/branding

**Cons:**
- Code duplication
- Three deployments to maintain
- User accounts don't cross verticals
- Higher infrastructure cost

---

### Option B: Multi-Tenant Single Platform

```
┌─────────────────────────────────────────────────────────────┐
│                       4hear.ai                               │
│                (Unified Platform)                            │
├─────────────────────────────────────────────────────────────┤
│  Organization.vertical: RELIGION | EDUCATION | CORPORATE    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Shared Core                          │   │
│  │  Auth, Rooms, Sessions, STT, Translation, Storage    │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│         ┌────────────────┼────────────────┐                 │
│         ▼                ▼                ▼                 │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Religion  │  │  Education │  │  Corporate │            │
│  │  Prompts   │  │  Prompts   │  │  Prompts   │            │
│  │  Features  │  │  Features  │  │  Features  │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Pros:**
- Single codebase, single deployment
- Shared user accounts (if desired)
- Lower infrastructure cost
- Faster feature rollout to all verticals
- User can switch contexts easily

**Cons:**
- More complex codebase (vertical conditionals)
- Database needs vertical awareness
- Risk of cross-vertical bugs
- Single point of failure

---

### Option C: Shared Core + Vertical Plugins (Recommended)

```
┌─────────────────────────────────────────────────────────────┐
│                     4hear.ai Core                            │
│              (npm package / shared module)                   │
├─────────────────────────────────────────────────────────────┤
│  @4hear/core                                                 │
│  ├── auth, users, organizations                              │
│  ├── rooms, sessions, recordings                             │
│  ├── stt, translation, reading-levels                        │
│  ├── speakers, diarization                                   │
│  ├── ai-provider abstraction                                 │
│  └── base summary/recap/feedback services (prompt injection) │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  @4hear/religion│  │  @4hear/edu     │  │  @4hear/corp    │
│                 │  │                 │  │                 │
│  Prompts:       │  │  Prompts:       │  │  Prompts:       │
│  - Sermon focus │  │  - Lecture focus│  │  - Meeting focus│
│  - Scripture    │  │  - Concepts     │  │  - Action Items │
│                 │  │                 │  │                 │
│  Features:      │  │  Features:      │  │  Features:      │
│  - Cross-Faith  │  │  - Quiz Gen     │  │  - Decision Log │
│  - Religious    │  │  - Study Guide  │  │  - Slack Int.   │
│    Visuals      │  │  - LMS Int.     │  │  - Calendar     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   4eye.ai       │  │   4edu.ai       │  │   4meet.ai      │
│   Deployment    │  │   Deployment    │  │   Deployment    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Pros:**
- Clean separation of concerns
- Maximum code reuse (~75%)
- Independent deployments with shared core
- Easy to add new verticals
- Can open-source core separately
- Vertical teams can work independently

**Cons:**
- More initial setup (monorepo, packages)
- Need versioning strategy for core
- Slightly more complex local development

---

## Implementation Strategy

### Phase 1: Abstraction Layer (2 weeks)

| Task | Description | Effort |
|------|-------------|--------|
| Create VerticalConfig interface | Define what varies per vertical | 1 day |
| Abstract prompt injection | AI services take prompts from config | 3 days |
| Create PromptRegistry | Load prompts per vertical | 2 days |
| Abstract terminology | "Room" → `config.terminology.room` | 2 days |
| Abstract feature flags | Enable/disable features per vertical | 2 days |
| Create first vertical config | Religion (current) | 1 day |

### Phase 2: EDU Vertical (2-3 weeks)

| Task | Description | Effort |
|------|-------------|--------|
| Create EDU prompt set | Summaries, recaps, feedback | 3 days |
| Create EDU terminology config | Classroom, Lecture, Instructor | 1 day |
| Create EDU-specific recap types | KEY_CONCEPT, EXAMPLE, etc. | 2 days |
| Create EDU feedback categories | Teaching-focused metrics | 2 days |
| Build Quiz Generation feature | New feature | 3 days |
| Build Study Guide feature | New feature | 2 days |
| Update landing page for EDU | Marketing copy | 2 days |
| Test & QA | Full vertical testing | 3 days |

### Phase 3: Corporate Vertical (2-3 weeks)

| Task | Description | Effort |
|------|-------------|--------|
| Create Corporate prompt set | Meeting focus | 3 days |
| Create Corporate terminology | Meeting, Organizer | 1 day |
| Create Corporate recap types | DECISION, ACTION_ITEM | 2 days |
| Build Action Item Extraction | New feature | 3 days |
| Build Decision Log | New feature | 2 days |
| Slack Integration | Webhook + bot | 3 days |
| Calendar Integration | Google/Outlook | 2 days |
| Test & QA | Full vertical testing | 3 days |

---

## Database Schema Changes

### Option 1: Vertical Column on Organization

```sql
ALTER TABLE Organization ADD COLUMN vertical ENUM('religion', 'education', 'corporate') NOT NULL DEFAULT 'religion';

-- All queries filtered by org.vertical
-- Minimal schema change
```

### Option 2: Vertical-Specific Tables

```sql
-- Shared tables: User, Organization, Room, Session, TranscriptSegment, etc.

-- Religion-specific
CREATE TABLE CrossFaithComparison (...);

-- Education-specific  
CREATE TABLE Quiz (...);
CREATE TABLE StudyGuide (...);

-- Corporate-specific
CREATE TABLE ActionItem (...);
CREATE TABLE Decision (...);
```

**Recommendation:** Option 1 for core entities, Option 2 for vertical-exclusive features.

---

## Prompt Registry Design

```typescript
// src/vertical/types.ts
interface VerticalConfig {
  id: 'religion' | 'education' | 'corporate';
  
  terminology: {
    room: string;           // "Room" | "Classroom" | "Meeting Room"
    session: string;        // "Session" | "Lecture" | "Meeting"
    host: string;           // "Host" | "Instructor" | "Organizer"
    member: string;         // "Member" | "Student" | "Participant"
    organization: string;   // "Organization" | "Institution" | "Company"
  };
  
  features: {
    crossFaithComparison: boolean;
    quizGeneration: boolean;
    actionItemExtraction: boolean;
    visualGeneration: boolean;
    speechTransform: boolean;
  };
  
  prompts: {
    summary: string;
    recap: string;
    feedback: string;
    speechTransform: string;
    visualExtraction: string;
  };
  
  recapHighlightTypes: string[];
  feedbackCategories: FeedbackCategory[];
}

// src/vertical/configs/religion.config.ts
export const religionConfig: VerticalConfig = {
  id: 'religion',
  terminology: {
    room: 'Room',
    session: 'Session', 
    host: 'Host',
    member: 'Member',
    organization: 'Organization',
  },
  features: {
    crossFaithComparison: true,
    quizGeneration: false,
    actionItemExtraction: false,
    visualGeneration: true,
    speechTransform: true,
  },
  prompts: {
    summary: `You are summarizing a religious sermon...`,
    recap: `Extract key moments from this sermon...`,
    feedback: `Provide constructive feedback on sermon delivery...`,
    // ...
  },
  recapHighlightTypes: ['SCRIPTURE', 'TEACHING', 'STORY', 'CALL_TO_ACTION', 'QUOTE'],
  feedbackCategories: ['clarity', 'pacing', 'engagement', 'tone', 'scriptureUse'],
};

// src/vertical/configs/education.config.ts
export const educationConfig: VerticalConfig = {
  id: 'education',
  terminology: {
    room: 'Classroom',
    session: 'Lecture',
    host: 'Instructor',
    member: 'Student',
    organization: 'Institution',
  },
  features: {
    crossFaithComparison: false,
    quizGeneration: true,
    actionItemExtraction: false,
    visualGeneration: true,
    speechTransform: true,  // Anti-bullying
  },
  prompts: {
    summary: `You are summarizing an educational lecture. Focus on:
- Learning objectives covered
- Key concepts introduced
- Examples and illustrations used
- Questions raised
- Assignments or follow-up mentioned`,
    recap: `Extract key learning moments from this lecture...`,
    feedback: `Provide constructive feedback on teaching effectiveness...`,
    // ...
  },
  recapHighlightTypes: ['KEY_CONCEPT', 'DEFINITION', 'EXAMPLE', 'QUESTION', 'EXERCISE'],
  feedbackCategories: ['clarity', 'pacing', 'engagement', 'examples', 'assessment'],
};
```

---

## Pros and Cons Summary

### Pros of Multi-Vertical Approach

| Benefit | Impact |
|---------|--------|
| **3-5x larger TAM** | Religion: ~400K churches US → EDU: millions of classrooms → Corp: every company |
| **Revenue diversification** | Not dependent on single market |
| **Faster development** | Core improvements benefit all verticals |
| **Cross-pollination** | Features from one vertical can inspire others |
| **Better AI models** | More training data from diverse content |
| **Reduced CAC** | Single platform, broader marketing |
| **Technical leverage** | One team maintains one codebase |

### Cons of Multi-Vertical Approach

| Risk | Mitigation |
|------|------------|
| **Diluted focus** | Start with 2 verticals max, nail them first |
| **Complexity** | Clean abstraction layer prevents spaghetti |
| **Different sales cycles** | Religion (community) vs Corp (enterprise) vs EDU (institutional) — need different GTM |
| **Support burden** | More use cases = more edge cases |
| **Regulatory differences** | FERPA (EDU), different data handling rules |
| **Brand confusion** | Separate brands per vertical (4eye, 4edu, 4meet) |

---

## Competitive Landscape by Vertical

### Religion (Current)
- **Competitors:** Faithlife, Subsplash, ChurchMax (none focus on live translation)
- **Differentiation:** Our AI-first approach is unique

### Education
- **Competitors:** Otter.ai (transcription), Panopto (lecture capture), Echo360
- **Differentiation:** Real-time translation + reading levels + AI recaps

### Corporate
- **Competitors:** Otter.ai, Fireflies.ai, Grain, Fathom
- **Differentiation:** Translation (global teams), reading level adaptation

---

## Recommendation

**Start with Option C (Shared Core + Vertical Plugins)** but implement it incrementally:

1. **Now:** Keep building 4eye for religion, but architect prompts/configs to be injectable
2. **Pre-launch:** Extract core into clean module boundaries
3. **Post-launch:** Add EDU vertical first (closest to religion: live audio, speaker/audience)
4. **Later:** Corporate vertical (more competitive market, needs action item extraction)

**Estimated timeline:**
- Phase 1 (Abstraction): 2 weeks
- Phase 2 (EDU): 2-3 weeks  
- Phase 3 (Corporate): 2-3 weeks
- **Total for 3 verticals: ~8 weeks from current state**

The current codebase is ~75% reusable as-is. The main work is prompt engineering and vertical-specific feature buildout.

---

## Next Steps

1. [ ] Review this analysis with stakeholders
2. [ ] Decide on target verticals (EDU? Corporate? Both?)
3. [ ] Create VerticalConfig interface
4. [ ] Implement prompt injection in AI services
5. [ ] Create EDU prompt set as proof of concept
6. [ ] Test EDU prompts against sample lecture transcripts
7. [ ] Finalize multi-vertical architecture decision

---

## Appendix: Prompt Comparison Example

### Summary Prompt — Religion
```
You are summarizing a religious sermon. Focus on:
- The central spiritual message
- Key scripture references and their interpretation
- Stories and parables shared
- Calls to action for the congregation
- Theological concepts explained

Write a warm, accessible summary that captures the heart of the message...
```

### Summary Prompt — Education
```
You are summarizing an educational lecture. Focus on:
- Learning objectives addressed
- Key concepts and definitions introduced
- Examples and case studies presented
- Questions raised (by instructor or students)
- Assignments, readings, or follow-up mentioned

Write a clear, structured summary that helps students review...
```

### Summary Prompt — Corporate
```
You are summarizing a business meeting. Focus on:
- Decisions made (who decided what)
- Action items (who will do what by when)
- Key discussion points
- Questions raised and answers given
- Next steps and follow-up meetings

Write a concise summary formatted for quick scanning...
```
