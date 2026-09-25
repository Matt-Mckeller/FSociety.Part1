

## Project Context

**4eye** is an AI-powered learning platform.

**Current Phase**: Planning & Initial Setup (Phase 0-1)

**Key Documents**:
- [Plan.md](/docs/planning/Plan.md) — Vision, product definition, features, technology stack
- [MasterPlan.md](/docs/planning/MasterPlan.md) — Architecture, module organization, implementation phases
- [decisions.md](/docs/planning/plans/decisions.md) — Product & technical decisions

**When working on planning documents, architecture decisions, or initial project setup, always consult these files first and maintain consistency. Update them when appropriate.**

---

### Multi-Vertical Strategy
Build features **vertical-agnostic** unless explicitly vertical-specific. Build many of the features generic so that it would be able to support multiple application types. Education is the primary target for this application.

---

## Quick Reference

### Technical Standards
> **Source:** [docs/technical/TECHNICAL_STANDARDS.md](../docs/technical/TECHNICAL_STANDARDS.md) — Single source of truth for development standards.
> This file contains important development standards to follow when working in this project.

### Technology Stack
**See [TECHNOLOGY_STACK.md](../docs/technical/TECHNOLOGY_STACK.md) for complete technology stack.**

> When technology choices need to change, discuss with user first before updating TECHNOLOGY_STACK.md

### Repository Structure
**See [REPOSITORY_STRUCTURE.md](../docs/technical/REPOSITORY_STRUCTURE.md) for complete repository structure.**

> When repository structure needs to change, discuss with user first before updating documentation

### Package Architecture
**Current Phase**: Architecture Foundation (Phase 1) - Documentation complete, structure creation pending.

**Dual-scope packages system:**
- **@expanse packages** — Reusable infrastructure (auth, theme, ui, layout, user, analytics, application, utils)
- **@4eye packages** — 4eye-specific (types, core, features, ai-sdk, graphql-schema)

**Complete guides:**
- [PACKAGE_ARCHITECTURE.md](../docs/technical/PACKAGE_ARCHITECTURE.md) — Package organization principles
- [MONOREPO_STRUCTURE.md](../docs/technical/MONOREPO_STRUCTURE.md) — Complete directory tree
- [MIGRATION_GUIDE.md](../docs/planning/MIGRATION_GUIDE.md) — Migration strategy

**See [AUTHENTICATION.md](../docs/technical/AUTHENTICATION.md) for complete implementation.**
**See [authentication-consolidation-plan.md](../docs/planning/plans/core/authentication-consolidation-plan.md) for consolidation strategy.**
**See [authentication-comparison-2026-03-26.md](../docs/technical/analysis/authentication-comparison-2026-03-26.md) for security analysis and recommendations.**

### Theme System

**See [MUI_THEME_SYSTEM.md](../docs/technical/MUI_THEME_SYSTEM.md) for complete theme system.**
