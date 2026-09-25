<!-- # 4eye Development Standards

> **Source:** [docs/technical/TECHNICAL_STANDARDS.md](docs/technical/TECHNICAL_STANDARDS.md) — Single source of truth for development standards.
> This file contains important development standards to follow when working in this project.

## Project Context

**4eye** is an AI-powered learning platform.

**Current Phase**: Planning & Initial Setup (Phase 0-1)

**Key Documents**:
- [Plan.md](docs/planning/Plan.md) — Vision, product definition, features, technology stack
- [MasterPlan.md](docs/planning/MasterPlan.md) — Architecture, module organization, implementation phases
- [decisions.md](docs/planning/plans/decisions.md) — Product & technical decisions

**When working on planning documents, architecture decisions, or initial project setup, always consult these files first and maintain consistency. Update them when appropriate.**

---

## Quick Reference

### Technology Stack
- **Frontend**: Next.js, React, MUI
- **Backend**: NestJS, GraphQL, PostgreSQL, TypeORM
- **AI**: Whisper, OpenAI, Anthropic, Gemini, X, DeepSeek
- **Infrastructure**: Docker (Phase 0-1) → Terraform + GKE (Phase 2)

### Repository Structure
- `apps/4eye-web/` — Next.js web app
- `apps/4eye-mobile/` — React Native/Expo mobile app
- `apps/api/` — NestJS backend
- `packages/@4eye/core/` — Domain logic (rooms, sessions, organizations)
- `packages/@4eye/types/` — TypeScript types/interfaces
- `packages/@4eye/graphql-schema/` — GraphQL schema generation
- `packages/@expanse/auth/` — Authentication (AuthProvider, hooks)
- `packages/@expanse/ui/` — Shared UI components
- `packages/@expanse/utils/` — Utility functions

### Development Standards
**See [docs/technical/TECHNICAL_STANDARDS.md](docs/technical/TECHNICAL_STANDARDS.md) for complete standards:**
- TypeScript strict mode
- Logic separate from views
- Modular, feature-based architecture
- Typed AI Response System (C8)
- Privacy by design
- Composition over inheritance -->
