# Screens

## Counselor App (In-Person Mode)

| Screen | Purpose |
|--------|---------|
| Login | Auth (email/SSO) |
| Dashboard | Schedule, alerts, stats |
| Live Session | Transcript, AI suggestions, notes |
| Session Review | Summary, export, client recap preview |
| Settings | Preferences, integrations |

### Screen Details

**Dashboard**
- Today's schedule, recent alerts, quick stats, start session button

**Live Session**
- Left: real-time transcript with speaker labels
- Right: alert feed + AI response suggestions
- Bottom: quick notes, timer, end session
- AI suggestions appear inline, counselor can tap to expand

**Session Review**
- AI summary (editable), key moments, alerts log, export options

---

## Client App (At-Home Connected Mode)

For clients who have a real counselor - between-session support.

| Screen | Purpose |
|--------|---------|
| Login | Auth (email/magic link) |
| Home | Check-in prompt, mood trends, quick actions |
| Chat | AI companion conversation |
| My Recaps | Session summaries from counselor |
| Recap Detail | Takeaways, action items, progress |
| Homework | Action items from counselor |
| Check-in | Mood/progress prompts (shared with counselor) |
| Journal | Voice/text entries |
| Coping Tools | Breathing, grounding, meditation |
| Crisis | Hotlines, emergency contacts |

---

## Individual App (At-Home Independent Mode)

For users without a counselor - standalone AI companion.

| Screen | Purpose |
|--------|---------|
| Login | Auth (email/magic link) |
| Home | Check-in prompt, mood trends, quick actions |
| Chat | AI companion conversation (primary feature) |
| Check-in | Self-guided mood/progress prompts |
| Journal | Voice/text entries |
| Coping Tools | Breathing, grounding, meditation |
| Crisis | Hotlines, emergency contacts |

Note: No Recaps or Homework screens (no counselor integration).

---

## Admin Portal (P2)

| Screen | Purpose |
|--------|---------|
| Dashboard | Org stats, alert log, counselor overview |
| Counselor Detail | Performance, session history, compliance |

---

## User Flows

```
Counselor (In-Person): Dashboard → Start Session → Consent → Live Session → End → Review → Send Recap

Client (Connected): Login → Home → Check-in or Recaps → Detail → Chat → (Reflect)

Individual (Independent): Login → Home → Chat → Check-in → Journal → Coping Tools

Admin: Dashboard → Alert Log → Detail → (Flag)
```
