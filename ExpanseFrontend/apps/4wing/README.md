# Counsellor Support

> AI-powered counseling assistant with companion robot

## Team
- Matthew McKeller
- Wren

## Vision
Heal people. Improve mental health. Enable growth. Improve learning.

## Concept
AI app + companion robot that supports mental health through three modes.

| Mode | User | Description |
|------|------|-------------|
| **In-Person** | Counselor | Robot captures session; AI assists via screen |
| **At-Home (Connected)** | Client | Support between real counseling sessions |
| **At-Home (Independent)** | Individual | Standalone AI companion |

## Users
| User | Role |
|------|------|
| Counselor | Real-time guidance, post-session insights |
| Client | Recaps, homework, between-session support |
| Individual | Standalone AI companion support |
| Admin | Analytics, training management |

---

## Documentation

| Document | Description |
|----------|-------------|
| [Features](docs/CoreFeatures.md) | MVP features by mode and priority |
| [Screens](docs/Screens.md) | App screens and user flows |
| [Technology](docs/TechnologyStack.md) | Tech stack and architecture |
| [Privacy](docs/PrivacySecurity.md) | Security, consent, compliance |
| [Robot](docs/RobotModel.md) | Companion device design |
| [Project Plan](docs/ProjectPlan.md) | Tasks, deliverables, timeline |

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

## MVP Features

### In-Person Mode (Counselor)
- Robot captures audio/video silently (never speaks or interrupts)
- Live transcription with speaker labels
- Real-time counselor alerts on screen
- AI response suggestions on screen
- AI-generated session summaries

### At-Home Connected Mode (Client)
- AI companion chat (conversational support)
- Session recaps from counselor
- Homework tracking and reminders
- Daily mood check-ins (shared with counselor)
- Coping tools (breathing, grounding)
- Crisis resources

### At-Home Independent Mode (Individual)
- AI companion chat (primary feature)
- Self-guided mood check-ins
- Reflection journal
- Coping tools (breathing, grounding)
- Crisis resources

---

*Goal: Win the hackathon* 🏆
