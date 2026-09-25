# Technology Stack

## Overview

| Layer | Choice |
|-------|--------|
| Language | TypeScript |
| Frontend | Next.js + React + MUI |
| Backend | Nest.js + GraphQL |
| Speech-to-Text | OpenAI Whisper v3 |
| LLM | GPT-5 / Claude 4 Opus |
| Video Analysis | MediaPipe (P2) |
| Database | PostgreSQL + Redis |
| Hosting | Vercel / AWS |

---

## Components

### Language: TypeScript
Full-stack TypeScript for type safety, shared types between frontend and backend.

### Frontend: Next.js + React + MUI
- Next.js for SSR, routing, API routes
- React for component architecture
- MUI (Material UI) for design system
- Apollo Client for GraphQL

### Backend: Nest.js + GraphQL
- Nest.js framework for scalable Node.js backend
- GraphQL API (Apollo Server)
- WebSocket subscriptions for real-time transcription
- JWT + OAuth2 authentication

### Speech-to-Text: Whisper v3
Real-time transcription with speaker diarization. Alternatives: Deepgram, AssemblyAI.

### LLM: GPT-5 / Claude 4 Opus
Session summarization, alert generation, insight extraction. Fallback: Llama 3, Mistral for on-prem.

### Video Analysis: MediaPipe (P2)
Face mesh for emotion detection, pose estimation for body language. Runs client-side for privacy.

### Database
- PostgreSQL: Users, sessions, transcripts, summaries
- Redis: Real-time caching, session state, pub/sub
- Prisma ORM for type-safe database access

### Hosting
- Vercel: Next.js frontend, edge functions
- AWS: Nest.js backend (ECS), database (RDS), storage (S3)

---

## Architecture

```
┌─────────────┐                        ┌─────────────┐
│   Robot     │───────────────────────▶│   Backend   │
│ (mic + cam) │                        │  (Nest.js)  │
└─────────────┘                        └──────┬──────┘
                                              │ GraphQL
              ┌─────────────┐                 │
              │   App UI    │─────────────────┤
              │  (Next.js)  │                 │
              └─────────────┘                 │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │  Whisper    │           │   GPT-5     │           │  Database   │
             │   (STT)     │           │ (Summaries) │           │ (PostgreSQL)│
             └─────────────┘           └─────────────┘           └─────────────┘
```

---

## Development

| Tool | Version |
|------|---------|
| Node.js | 20+ |
| TypeScript | 5.x |
| pnpm | Package manager |
| Docker | Local services |
| CI/CD | GitHub Actions |
