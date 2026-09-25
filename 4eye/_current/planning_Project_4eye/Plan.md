# Vision

A world where everyone understands how to learn. Where people understand what it means to be human, how their brain works, and how to use AI effectively to master anything. Where learning is simple, accessible, engaging, and builds attention rather than destroying it.

4eye provides **autonomy** — empowering learners to move at their own pace, on their own terms. It gives both **learners** and **teachers** better tools, resources, and insights to make education more effective and personalized.

4eye teaches people *how* to learn — not just *what* to learn.

## Vision Layers

| Layer | Focus |
|-------|-------|
| **Core** | Understand yourself as a learner. Understand your brain. Use AI effectively. |
| **Method** | Multiple ways to learn — visual, auditory, interactive, gamified (future) |
| **Content** | Transform any content (spoken, written, recorded) into personalized learning |
| **Access** | Simple, accessible to all abilities, languages, reading levels |
| **Engagement** | Interesting, engaging, attention-building — not attention-destroying |

---

# Product

**4eye** is an AI-powered learning platform that helps people understand how they learn, then applies that understanding through multiple lenses — not just text. Learning happens through:

- **Multiple input formats** — spoken word, text, video, images, conversations
- **Multiple output formats** — text, audio (TTS), visuals, quizzes, mind maps, timelines
- **Multiple methodologies** — triadic learning, spaced repetition, active recall, visual mapping
- **Multiple modalities** — reading, listening, watching, doing, discussing

The **AI Chat** is often the user's first interaction — a conversational companion that adapts to their accessibility needs, language, reading level, and learning style. But chat is one of many tools. The platform transforms live and recorded content into personalized learning experiences, generates learning aids, and applies learning science principles across every interaction.

## Core Capabilities

| Capability | Description |
|------------|-------------|
| **Transcription** | Real-time and batch audio/video → text |
| **Translation** | 50+ languages, live streaming |
| **Adaptation** | Reading level adjustment (child → academic) |
| **Learning Modes** | Triadic understanding, visual learning, exercises |
| **Quizzes & Exercises** | AI-generated from content for active recall |
| **Summaries & Recaps** | Key points, highlights, structured notes |
| **Visual Generation** | AI images to aid memory and comprehension |
| **Speaker Feedback** | Improvement suggestions for presenters |

## Verticals

4eye is a **multi-vertical platform** built on a universal learning core (~75% shared). The platform transforms any content (audio, video, text) into personalized learning experiences.

**What are Verticals?** Market-specific configurations that customize the same core platform for different contexts:
- **Terminology** — "Room" → "Classroom" → "Meeting Room"  
- **AI Prompts** — Sermon focus → Lecture focus → Action Items focus
- **Features** — Cross-faith comparison → Quiz generation → Decision logging
- **UI/Marketing** — Context-specific copy and positioning

**The Core** (built first) provides universal learning capabilities:
- Transcription, translation, reading level adaptation
- AI Chat with learning modes and accessibility features
- Learning transformations (triadic, visual, exercises)
- Quizzes, summaries, recaps, speaker feedback
- Progress tracking and analytics

**Verticals** (added after core) adapt this foundation for specific markets:

| Vertical | Primary Use Cases | Specific Features |
|----------|-------------------|-------------------|
| **Learning** (General) | Self-study, online courses, podcasts | Personal library, progress tracking |
| **Education** | Classrooms, lectures, tutoring | Courses, assignments, LMS integration |
| **Religion** | Sermons, study groups, services | Cross-faith comparison, scripture refs |
| **Professional** | Conferences, training, meetings | Team rooms, compliance, certifications |

> See [plans/verticals/](plans/verticals/) for vertical-specific documentation.

---

# Goals

- **Accessibility** — Serve users with different abilities, languages, and learning styles
- **Multi-Language Support** — Full internationalization, live translation
- **Adaptive Content** — Reading levels from age 8 to PhD
- **Learning Science** — Apply proven techniques (triadic learning, spaced repetition, active recall)
- **AI-Enhanced** — Personalized recommendations, gap detection, adaptive difficulty

---

# Accessibility Modes

4eye includes cognitive accessibility modes that modify AI responses and UI for different needs:

| Mode | Target Users | Key Adaptations |
|------|--------------|-----------------|
| **Default** | General population | Standard interface |
| **ADHD** | Users with attention challenges | Shorter paragraphs, bullets, key points first |
| **Autism** | Users on autism spectrum | Literal language, predictable structure |
| **Dyslexia** | Users with reading difficulties | Simple vocabulary, TTS integration |
| **Low Vision** | Users with visual impairments | TTS primary, high contrast |
| **Cognitive** | Users needing extra support | Maximum simplification, step-by-step |

All content can be read aloud via Text-to-Speech (TTS).

---

# Platform Features

## Core Features (All Verticals)
- Audio/Video to Text (live and recorded)
- Real-time translation streaming
- Reading level adaptation
- **AI Chat** with learning mode actions, accessibility prompts, and translation
- Text-to-Speech (TTS) for all content
- Summaries and structured recaps
- Visual generation from spoken content
- Speaker/presenter feedback
- Quiz and exercise generation
- Learning mode transformations (triadic, visual, exercises)
- Progress tracking and analytics
- Custom event tracking for learning insights

## Website Features
- Onboarding (individual and organization)
- User profiles with learning preferences
- Payment and subscriptions
- Host dashboard (manage rooms, view analytics, feedback)
- Member dashboard (history, saved content, progress)
- Organization management

---

# Domain

**4eye.ai**

---

# Additional Projects
- Business plan website (Next.js, React, MUI)
- Marketing strategy and materials
- Sales strategy and outreach
- Organizational chart
- Pitch presentation
- Sales AI Agent — outreach to schools, churches, training organizations
- Marketing AI Agent — social media content generation
- Support AI Agent — knowledge base chat

---

# Requirements

## Branding
- Use Expanse Logo Variation 4 (circle version)

## User Types
- **Guest** — Join via link, limited features
- **Member** — Free tier, premium tiers available
- **Host/Instructor** — Create rooms, manage content, view analytics
- **Organization Admin** — Manage hosts, billing, settings

## Room System
- Hosts create rooms with static invite links: `4eye.ai/join/ABCD1234`
- Rooms support live sessions and recorded content
- Guest access without account creation

---

# User Stories

## General
- A student joins a live lecture via invite link and follows along with real-time transcript in their native language
- A professional watches a recorded conference talk and generates a quiz to test their understanding
- A parent sets their child's reading level so content adapts to simpler language

## Learning & Education
- A teacher records a lesson and 4eye generates practice exercises for students
- A student reviews a lecture's recap, seeing key concepts organized as triadic learning triangles
- A tutor uses AI chat to discuss concepts from the recorded session with a student

## Religion (Vertical)
- A congregation member follows a sermon with live translation
- A pastor reviews feedback and speaking suggestions after the service
- A user enables cross-faith mode to see how other traditions discuss similar topics

## Professional
- A team lead shares a training recording with their team via a room invite
- A conference organizer captures all talks and provides searchable transcripts
- An employee generates a summary of a 2-hour meeting in 30 seconds

---

# Testing
- Link to YouTube videos for test transcription and translation
- Focus on development first, formal testing in later phase

---

# Architecture

## Principles
- Modular, vertical-agnostic core
- Vertical-specific features via configuration and plugins
- React Context + Reducers for state management
- Server-side GraphQL integration
- Mobile app via React Native with shared architecture

## AI Module Structure Sample
```
backend/src/modules/ai/
├── core/                 # Generic AI pipelines (no vertical refs)
│   ├── adapters/         # OpenAI, Anthropic, Google, X
│   ├── pipelines/        # Transcribe, translate, summarize, etc.
│   └── interfaces/
├── prompts/
│   ├── base/             # Generic prompt templates
│   └── {vertical}/       # Vertical-specific prompts (injected)
└── learning-modes/       # Triadic, visual, exercise generation
```

---

# Technology

> **See [../technical/TECHNOLOGY_STACK.md](../technical/TECHNOLOGY_STACK.md)** for complete technology stack.

**Key choices:**
- Next.js + React for web, React Native for mobile (shared libraries)
- NestJS + GraphQL for API layer
- PostgreSQL for data persistence
- Multi-AI provider approach (OpenAI, Anthropic, Gemini, X, DeepSeek)
- GCP infrastructure (Docker → Kubernetes + Terraform)

---

# Repository

**Structure:**
```
ExpanseFrontend/
├── apps/
│   ├── 4eye-web/           # Next.js web app
│   ├── 4eye-mobile/        # React Native app (future)
│   └── api/                # NestJS backend
├── libs/
│   ├── 4eye-core/          # Shared hooks, services, API calls
│   ├── 4eye-types/         # TypeScript types/interfaces
│   ├── 4eye-state/         # Providers, Context, reducers
│   └── ui/                 # Shared UI components (some SVG-based)
└── packages/               # Build tools, configs
```

**Planning:** `4eye/4eye-planning/` (separate repo for docs)

> Project will eventually be renamed to **Expanse**

---

# Technical Standards

> **See [../technical/TECHNICAL_STANDARDS.md](../technical/TECHNICAL_STANDARDS.md)** for complete development standards and practices.

**Key Principles:**
- TypeScript strict mode with logic separate from views
- Modular architecture: features are self-contained
- Shared core libraries for web + mobile
- React Context + useReducer for state management
- Typed AI Response System (C8) — Types as prompts
- Privacy by design — no PII in logs
- Composition over inheritance

> Project will eventually be renamed to **Expanse**

---

# Private Goals
➕