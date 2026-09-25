# 4eye Master Plan

> **Source of truth:** [Plan.md](Plan.md) — vision, product definition, features, requirements, technology.
> This document organizes Plan.md into independently plannable modules, defines architecture, and sequences both planning and implementation.

---

## Key Decisions (All Plans Must Know)

| Decision | Details | Impacts |
|----------|---------|--------|
| **Chat is Primary** | AI Chat (F4) is user's first interaction, central to MVP | All features connect to chat |
| **Modularity First** | Everything modular: components, context, providers, NestJS modules, Terraform | Enables incremental build, future extension |
| **Typed AI System** | TypeScript + JSDoc = prompt source, runtime type reading, Zod validation. See [C8](plans/core/typed-ai-responses.md) | F2, F4, F6, F7, F10, F11, F12, F13, F14, F15, F16 (all AI-generated outputs) |
| **PostgreSQL + Migrations** | SQL database, accept migrations over NoSQL flexibility — we trust our data | C1, all entities |
| **Shared State** | State lives in packages (`@4eye/core`, `@expanse/auth`) for web + mobile sharing | All frontend features |
| **Good OO Practices** | Composition, inheritance, interfaces as appropriate per situation | All modules |
| **Secrets Ready** | Config service abstraction, ready for Secret Manager | C2, C3, I6 |
| **Intent Tracking** | AI context includes: learner identity, environment, goals | F4, F6, F7, F14, F15 (all learning/chat features) |
| **Privacy in Design** | No PII in logs/analytics, prompt templates server-only | X1, X4, all features |

### Cross-Cutting Requirements

Every plan must address these (where relevant):
- **Events:** What analytics events should be tracked? (See [X4](plans/cross-cutting/analytics-events.md))
- **Security:** What data is accessed? Who can access it? (See [I6](plans/infrastructure/security.md))
- **Accessibility:** How does it work with accessibility modes? (See [X2](plans/cross-cutting/accessibility.md))
- **Types:** What TypeScript types are needed? Where do they live?
- **Mobile:** Will this work on mobile? Shared code considerations?

---

## Architecture Overview

### System Diagram

```
┌─────────────────────────────────────────────────────┐
│                   4eye.ai (Next.js)                 │
│  ┌───────────┐ ┌───────────┐ ┌───────────────────┐  │
│  │ Landing / │ │ App Pages │ │ Dashboards        │  │
│  │ Marketing │ │ (Live,    │ │ (Host / Member)   │  │
│  │ Onboard   │ │  History) │ │                   │  │
│  └───────────┘ └───────────┘ └───────────────────┘  │
│          React + MUI + State Management             │
└────────────────────┬────────────────────────────────┘
                     │ GraphQL (queries, mutations, subscriptions)
┌────────────────────▼────────────────────────────────┐
│              Nest.js Backend (API) Sample          │
│  ┌──────┐ ┌──────┐ ┌───────┐ ┌────────┐ ┌────────┐ │
│  │ Auth │ │Rooms │ │Session│ │   AI   │ │Payment │ │
│  │Module│ │Module│ │Module │ │Services│ │ Module │ │
│  └──────┘ └──────┘ └───────┘ └────────┘ └────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌───────────────────┐   │
│  │Recording │ │Transcript│ │  Notifications    │   │
│  │  Module  │ │  Module  │ │     Module        │   │
│  └──────────┘ └──────────┘ └───────────────────┘   │
└────┬──────────────┬──────────────┬──────────────────┘
     │              │              │
┌────▼────┐  ┌──────▼──────┐  ┌───▼──────────────────┐
│PostgreSQL│  │Google Cloud │  │  External Services   │
│   (DB)  │  │  Storage    │  │  Google STT (live)   │
│         │  │ (Recordings)│  │  Whisper (batch)     │
│         │  │             │  │  AI Providers        │
│         │  │             │  │  (OpenAI/Gemini/X/   │
│         │  │             │  │   Anthropic/DeepSeek)│
│         │  │             │  │  Stripe, SendGrid    │
└─────────┘  └─────────────┘  └──────────────────────┘
```

### API Approach

- **Code-first GraphQL** via Nest.js (`@nestjs/graphql`)
- Each backend module owns its own resolvers, types, and data model
- **Queries** for reads, **Mutations** for writes, **Subscriptions** for real-time (live transcript, chat)
- Modules expose GraphQL surface only — no REST, no cross-module direct imports
- Shared types (e.g. `User` reference) resolved via GraphQL field resolvers

### Frontend Module Map

Each React module = a folder with components, hooks, and local state. Shared UI primitives live in a common `components/` folder.

| Module | Route(s) | Key Components |
|--------|----------|---------------|
| Landing | `/` | Hero, Features, Pricing, CTA |
| Onboarding | `/signup`, `/login`, `/join/:code` | SignUpForm, LoginForm, GuestJoin, ToSAcceptance |
| Profiles | `/profile`, `/settings` | ProfileView, ProfileEdit, PreferencesForm |
| Rooms | `/rooms`, `/rooms/:id`, `/join/:code` | RoomCreate, RoomSettings, InviteLink, RoomJoin |
| Live Session | `/rooms/:id/live` | LiveTranscript, AudioCapture, TranslationOverlay, VisualPanel, ChatPanel |
| History | `/history`, `/history/:sessionId` | SessionList, SessionDetail, RecapView, SummaryView |
| Dashboards | `/dashboard` | HostDashboard, MemberDashboard, AnalyticsCharts, FeedbackView |
| Payment | `/pricing`, `/billing` | PricingTable, CheckoutForm, BillingHistory |
| Legal | `/privacy`, `/terms` | PrivacyPolicy, TermsOfService |

### State Management Plan

| Layer | Tool | Purpose |
|-------|------|---------|
| **Server state** | React Context + hooks | GraphQL data fetching, caching via custom hooks |
| **Real-time state** | React Context + useReducer | Live transcript stream, active session, WebSocket connection state |
| **Auth state** | AuthProvider (React Context) | Current user, roles — JWT in httpOnly cookie |
| **UI state** | React Context | Language preference, reading level, sidebar state, modals |
| **Form state** | MUI + React useState | All forms using MUI form components (TextField, Select, etc.) |
| **Persisted preferences** | localStorage | Language, reading level, theme — hydrated into Context on load |

---

## All Sub-Plans

### Core Infrastructure
| # | Plan File | Scope |
|---|-----------|-------|
| C1 | [plans/core/database-setup.md](plans/core/database-setup.md) | PostgreSQL setup, TypeORM, migrations, Docker config |
| C2 | [plans/core/authentication.md](plans/core/authentication.md) | NextAuth, user types/roles, guest vs member vs host, session management |
| C3 | [plans/core/graphql-api.md](plans/core/graphql-api.md) | Nest.js GraphQL scaffold, module structure, error handling, rate limiting |
| C4 | [plans/core/realtime-infrastructure.md](plans/core/realtime-infrastructure.md) | WebSocket gateway, GraphQL subscriptions, connection management |
| C5 | [plans/core/ai-provider-layer.md](plans/core/ai-provider-layer.md) | Multi-provider abstraction (OpenAI, Gemini, X, Anthropic, DeepSeek), provider switching, fallback |
| C6 | [plans/core/data-model-overview.md](plans/core/data-model-overview.md) | Cross-module entity relationships, shared references, migration strategy |
| C7 | [plans/core/content-management.md](plans/core/content-management.md) | CMS: JSON providers → Custom Admin UI, i18n content, feature flags |
| C8 | [plans/core/typed-ai-responses.md](plans/core/typed-ai-responses.md) | **Typed AI Response System** — TypeScript+JSDoc as prompt source, runtime type reading, Zod validation |

### App Features
| # | Plan File | Scope |
|---|-----------|-------|
| F1 | [plans/app-features/audio-to-text.md](plans/app-features/audio-to-text.md) | Whisper STT integration, audio capture, streaming transcription |
| F2 | [plans/app-features/live-translation.md](plans/app-features/live-translation.md) | Real-time language translation of transcribed text |
| F3 | [plans/app-features/internationalization.md](plans/app-features/internationalization.md) | UI i18n, multi-language support, reading level adaptation |
| F4 | [plans/app-features/chat-interactivity.md](plans/app-features/chat-interactivity.md) | **MVP AI Chat** — Learning mode actions, accessibility modes (ADHD/Autism/Dyslexia), TTS, translation, progress tracking |
| F5 | [plans/app-features/recordings.md](plans/app-features/recordings.md) | Start/stop/save recordings, GCS storage, playback |
| F6 | [plans/app-features/summaries.md](plans/app-features/summaries.md) | AI-generated session summaries |
| F7 | [plans/app-features/recaps.md](plans/app-features/recaps.md) | Post-session recaps, highlights, key moments |
| F8 | [plans/app-features/locations.md](plans/app-features/locations.md) | Physical location management for organizations/rooms |
| F9 | [plans/app-features/speakers.md](plans/app-features/speakers.md) | Speaker identification and attribution in transcripts |
| F10 | [plans/app-features/cross-source-comparison.md](plans/app-features/cross-source-comparison.md) | Cross-source comparison (compare perspectives across recordings) |
| F11 | [plans/app-features/positive-speech-transform.md](plans/app-features/positive-speech-transform.md) | Detect and transform negative/hateful speech into positive versions |
| F12 | [plans/app-features/visual-generation.md](plans/app-features/visual-generation.md) | AI-generated images from spoken content for comprehension |
| F13 | [plans/app-features/speaker-feedback.md](plans/app-features/speaker-feedback.md) | AI feedback and improvement suggestions for hosts/speakers |
| F14 | [plans/app-features/learning-modes.md](plans/app-features/learning-modes.md) | Triadic understanding, visual learning, knowledge webs |
| F15 | [plans/app-features/quizzes-exercises.md](plans/app-features/quizzes-exercises.md) | AI-generated quizzes, exercises, active recall |
| F16 | [plans/app-features/live-session-display.md](plans/app-features/live-session-display.md) | **Live Session Display** — Real-time transcription, multi-translation toggles, reading levels, AI-triggered summaries, timeline |

### Verticals

**What are Verticals?** Market-specific configurations built on the universal learning core (~75% shared codebase). The core platform (Phases 1-4) provides domain-agnostic learning capabilities: transcription, translation, AI chat, learning modes, quizzes, summaries. Verticals customize this foundation for specific markets through:
- **Prompt engineering** — AI focus changes per context (sermon themes vs. lecture concepts vs. meeting action items)
- **Terminology** — UI copy adapts ("Room" → "Classroom" → "Meeting Room")  
- **Features** — Context-specific additions (cross-faith comparison, LMS integration, decision logging)
- **Marketing** — Vertical-specific positioning and landing pages

Verticals are implemented *after* the core platform. V1/V2/V3 represent market deployment priority, not build order.

| # | Plan File | Scope |
|---|-----------|-------|
| V1 | [plans/verticals/religion.md](plans/verticals/religion.md) | Cross-faith comparison, scripture refs, sermon-specific prompts |
| V2 | [plans/verticals/education.md](plans/verticals/education.md) | Courses, LMS integration, teacher/student roles |
| V3 | [plans/verticals/professional.md](plans/verticals/professional.md) | Training, conferences, compliance, certifications |

### Website
| # | Plan File | Scope |
|---|-----------|-------|
| W1 | [plans/website/landing-page.md](plans/website/landing-page.md) | Marketing homepage, features, pricing, CTA |
| W2 | [plans/website/onboarding.md](plans/website/onboarding.md) | Sign up, login, guest join, ToS/PP acceptance |
| W3 | [plans/website/user-profiles.md](plans/website/user-profiles.md) | Profile view/edit, preferences (language, reading level) |
| W4 | [plans/website/rooms.md](plans/website/rooms.md) | Room CRUD, invite links, join flow, room settings |
| W5 | [plans/website/payment-subscriptions.md](plans/website/payment-subscriptions.md) | Stripe integration, free/premium tiers, billing |
| W6 | [plans/website/host-dashboard.md](plans/website/host-dashboard.md) | Room management, analytics, feedback review, moderation log |
| W7 | [plans/website/member-dashboard.md](plans/website/member-dashboard.md) | History, saved recordings, highlights, preferences |
| W8 | [plans/website/privacy-and-terms.md](plans/website/privacy-and-terms.md) | Privacy Policy page, Terms of Service page |
| W9 | [plans/website/notifications.md](plans/website/notifications.md) | Email/push notifications for reminders, recaps, subscription changes |

### Shared UI Packages
| # | Plan File | Scope |
|---|-----------|-------|
| UI1 | [plans/packages/character-package.md](plans/packages/character-package.md) | **`@expanse/character`** — consolidate all character UI (personas, pushing-progress, mascot, vision, map-view profile primitives) into one package; add unified 2D/3D `ProfileAvatar` toggle; move all related Storybook + tests. Platform firewall: `/core`+`/state`+`/3d` RN-safe, `/2d`+`/profile` web/MUI |

### Separate Projects
| # | Plan File | Scope |
|---|-----------|-------|
| P1 | [plans/projects/business-plan-site.md](plans/projects/business-plan-site.md) | Business plan website (Next.js/React/MUI), includes marketing + sales strategy |
| P2 | [plans/projects/org-chart.md](plans/projects/org-chart.md) | Organizational chart for the business |
| P3 | [plans/projects/pitch-presentation.md](plans/projects/pitch-presentation.md) | Investor pitch deck |
| P4 | [plans/projects/sales-ai-agent.md](plans/projects/sales-ai-agent.md) | AI agent for school/organization/institution outreach, aligned with sales strategy |
| P5 | [plans/projects/marketing-ai-agent.md](plans/projects/marketing-ai-agent.md) | AI agent for social media marketing material generation |
| P6 | [plans/projects/support-ai-agent.md](plans/projects/support-ai-agent.md) | Support AI agent + knowledge base chat for the website |

### Cross-Cutting Concerns
| # | Plan File | Scope |
|---|-----------|-------|
| X1 | [plans/cross-cutting/compliance-legal.md](plans/cross-cutting/compliance-legal.md) | GDPR, CCPA, COPPA, PCI DSS, recording consent, data retention |
| X2 | [plans/cross-cutting/accessibility.md](plans/cross-cutting/accessibility.md) | WCAG 2.1 AA, accessibility modes (ADHD, Autism, Dyslexia), TTS, adaptive content |
| X3 | [plans/cross-cutting/mobile-responsiveness.md](plans/cross-cutting/mobile-responsiveness.md) | Mobile-first design, responsive layouts, touch interactions |
| X4 | [plans/cross-cutting/analytics-events.md](plans/cross-cutting/analytics-events.md) | Custom event tracking, learning metrics, real-time dashboards |

### Infrastructure (Terraform)
| # | Plan File | Scope |
|---|-----------|-------|
| I1 | [plans/infrastructure/terraform-gcp.md](plans/infrastructure/terraform-gcp.md) | GCP project setup, VPC, networking, IAM, DNS |
| I2 | [plans/infrastructure/kubernetes-gke.md](plans/infrastructure/kubernetes-gke.md) | GKE cluster, node pools, namespaces, Helm charts |
| I3 | [plans/infrastructure/cloud-sql.md](plans/infrastructure/cloud-sql.md) | PostgreSQL Cloud SQL, backups, replicas, connection pooling |
| I4 | [plans/infrastructure/observability.md](plans/infrastructure/observability.md) | Logging, monitoring, alerting, tracing (Cloud Logging, Cloud Monitoring) |
| I5 | [plans/infrastructure/ci-cd.md](plans/infrastructure/ci-cd.md) | GitHub Actions, Terraform automation, deployment pipelines |
| I6 | [plans/infrastructure/security.md](plans/infrastructure/security.md) | Secret Manager, Workload Identity, WAF, Cloud Armor |

### Initial Setup (Docker-First)
| # | Plan File | Scope |
|---|-----------|-------|
| D1 | [plans/setup/docker-compose.md](plans/setup/docker-compose.md) | Local dev environment: PostgreSQL, API, Web, all in Docker Compose |
| D2 | [plans/setup/repository-migration.md](plans/setup/repository-migration.md) | Move 4eye into ExpanseFrontend monorepo |
| D3 | [plans/setup/monorepo-structure.md](plans/setup/monorepo-structure.md) | npm workspaces, shared libs, build scripts |

### Testing (Future)
| # | Plan File | Scope |
|---|-----------|-------|
| T1 | [plans/testing/unit-testing.md](plans/testing/unit-testing.md) | Jest setup for API and frontend — *not MVP* |
| T2 | [plans/testing/e2e-testing.md](plans/testing/e2e-testing.md) | Playwright E2E tests — *not MVP* |

---

## Planning Order

Flesh out plans in this sequence (each plan is independently written but informed by prior ones):

1. **D2 → D3 → UI1** Repository Migration, Monorepo Structure, **Shared UI Packages** — establish where code lives (incl. `@expanse/character` consolidation)
2. **C6** Data Model Overview — establishes entities and relationships all modules reference
3. **C7** Content Management — CMS strategy (JSON → custom)
4. **C1 → C2 → C3 → C4 → C5 → C8** Core infrastructure — defines the foundation + typed AI system
5. **X4** Analytics & Events — event tracking infrastructure (needed early)
6. **D1** Docker Compose — local dev environment
7. **W2 → W4 → W1** Onboarding, Rooms, Landing — the skeleton users interact with first
8. **F1 → F2 → F3** Audio-to-Text, Live Translation, i18n — the core product loop
9. **X2 → F4 → F14 → F15** Accessibility, **MVP Chat**, Learning Modes, Quizzes — *core user experience*
10. **F5 → C4** Recordings, Real-time — depends on core infra
11. **F6 → F7 → F9 → F13** Summaries, Recaps, Speakers, Feedback — post-session AI features
12. **F11 → F12 → F10** Positive Speech, Visuals, Cross-Source — advanced AI features
13. **W3 → W5 → W6 → W7** Profiles, Payment, Dashboards — user management
12. **F8 → W9** Locations, Notifications — supplementary features
13. **W8 → X1 → X3** Legal pages, Compliance, Mobile — polish
14. **I1 → I2 → I3 → I4 → I5 → I6** Infrastructure (Terraform) — Phase 2 cloud deployment
15. **T1 → T2** Testing — Jest, Playwright — *future phase*
16. **P1 → P2 → P3** Business plan, Org chart, Pitch — business deliverables
17. **P4 → P5 → P6** AI Agents — independent projects
18. **V1 → V2 → V3** Vertical-specific configurations — after core features stabilized (can be concurrent with later phases)

> **Note:** Plans are designed modularly. Vertical plans (V1-V3) document market-specific configurations but don't create separate codebases. They define prompt templates, terminology mappings, and feature flags applied to the shared core.

## Implementation Phases

After plans are finalized, implement in this order:

| Phase | Modules | Milestone |
|-------|---------|-----------|
| **0 — Setup** | D1, D2, D3, UI1 | Monorepo ready, Docker Compose running locally, shared UI packages (`@expanse/character`) consolidated |
| **1 — Foundation** | C1, C2, C3, C4, C5, C7, C8, X4 | Backend running, DB connected, auth working, typed AI system ready, analytics tracking |
| **2 — Web Shell** | W1, W2, W3, W4, W8 | Users can sign up, create/join rooms, see landing page |
| **3 — Core Loop** | F1, F2, F3, F5, F16 | Host starts session → audio transcribed → translated → displayed live with toggles → recorded |
| **4 — Chat & Learning** | F4, F14, F15, X2 | **MVP Chat** with learning modes, accessibility modes, TTS, quizzes |
| **5 — AI Layer** | F6, F7, F9, F11, F12, F13 | Post-session: summaries, recaps, visuals, feedback, positive transforms |
| **6 — Business** | W5, W6, W7, W9 | Payment tiers, dashboards, notifications — monetization ready |
| **7 — Advanced** | F8, F10, X1, X3 | Locations, cross-source, compliance, mobile polish |
| **8 — Cloud Infra** | I1, I2, I3, I5 | Terraform, GKE, Cloud SQL — migrate from Docker to GCP |
| **9 — Hardening** | I4, I6 | Observability, security hardening |
| **10 — Testing** | T1, T2 | Jest unit tests, Playwright E2E — *future* |
| **11 — Projects** | P1, P2, P3, P4, P5, P6 | Business plan site, pitch, AI agents — external deliverables |

---

## Conventions

- Each plan file owns its **data model** (entities, fields, relationships it needs)
- **C6 (Data Model Overview)** is the only file that shows cross-module entity relationships
- Backend modules are **Nest.js modules** — self-contained with their own resolvers, services, entities
- Frontend modules are **React folders** — components, hooks, local types
- API surface defined per module as: Queries, Mutations, Subscriptions (names only, not schemas)
- All plans reference [Plan.md](Plan.md) as the source of truth for product requirements
