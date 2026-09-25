# Technology Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, MUI |
| Backend | Nest.js, GraphQL (Apollo, non-federated) |
| Database | PostgreSQL (Cloud SQL), TypeORM |
| Auth | @nestjs/passport |
| AI/ML | Whisper (STT), OpenAI, Anthropic, Gemini, X (Grok), DeepSeek |
| Storage | Google Cloud Storage |
| Email | Twilio SendGrid |
| Logging | Winston + Custom Observability |
| Feature Flags | Custom implementation with WebSockets |
| Real-time | NestJS GraphQL Pub/Sub |
| CMS | Custom (JSON → Database → Admin UI) |
| i18n | react-i18next + custom CMS backend |
| Cloud Platform | Google Cloud Platform (GCP) |
| Orchestration | Kubernetes (GKE) — Phase 2 |
| Infrastructure | Docker (Phase 0-1) → Terraform (Phase 2) |
| CI/CD | GitHub Actions |
| Containers | Docker, Docker Compose |
| Mobile | React Native (shared components) |
| Security | Snyk (scanning) |
| Testing | Jest, Playwright — *planned, not MVP* |
| Monorepo | npm workspaces |

**Key choices:**
- Next.js + React for web, React Native for mobile (shared libraries)
- NestJS + GraphQL for API layer
- PostgreSQL for data persistence
- Multi-AI provider approach (OpenAI, Anthropic, Gemini, X, DeepSeek)
- GCP infrastructure (Docker → Kubernetes + Terraform)