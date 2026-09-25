# Core Features

## Priority Legend
- **P0** - Must have for MVP / hackathon demo
- **P1** - Important, build if time permits
- **P2** - Future enhancement

## Modes
- **In-Person** - Counselor using robot during live sessions
- **Connected** - Client support between real counseling sessions
- **Independent** - Standalone AI companion, no counselor

---

## Feature Summary

| Feature | Priority | In-Person | Connected | Independent |
|---------|----------|-----------|-----------|-------------|
| Live Transcription | P0 | ✓ | | |
| Session Summaries | P0 | ✓ | | |
| Counselor Alerts | P0 | ✓ | | |
| AI Response Suggestions | P0 | ✓ | | |
| AI Companion Chat | P0 | | ✓ | ✓ |
| Session Recaps | P0 | | ✓ | |
| Homework Tracking | P1 | | ✓ | |
| Guided Check-ins | P0 | | ✓ | ✓ |
| Reflection Journal | P1 | | ✓ | ✓ |
| Coping Tools | P1 | | ✓ | ✓ |
| Crisis Resources | P0 | | ✓ | ✓ |
| Nonverbal Analysis | P2 | ✓ | | |

---

## In-Person Mode Features

*Robot is passive—captures audio/video silently, never speaks or interrupts.*

### Live Transcription (P0)
- Real-time speech-to-text during counseling sessions
- Speaker diarization (distinguish counselor vs client)
- Timestamp markers for key moments
- Editable by counselor post-session

### Session Summaries (P0)
- Auto-generated after session ends
- Filtered views:
  - **Counselor view**: Full context, clinical notes, observations
  - **Client view**: Takeaways, action items, encouragement
- Export options: PDF, email, integration with EHR

### Counselor Alerts (P0)
- Subtle, non-intrusive notifications during session
- Alert types:
  - Escalation risk (distress indicators)
  - Missed therapeutic opportunities
  - Session time reminders
  - Follow-up prompts from previous sessions
- Configurable sensitivity levels

### AI Response Suggestions (P0)
- Real-time suggestions for counselor responses
- Context-aware based on conversation flow
- Therapeutic technique recommendations
- Optional: counselor can accept, modify, or ignore
- Learns from counselor preferences over time

### Nonverbal Analysis (P2)
- Video-based emotion detection
- Body language interpretation
- Engagement level tracking
- Requires explicit consent and additional hardware

---

## At-Home Mode Features

### Connected Mode (Client with Counselor)

### AI Companion Chat (P0)
- Conversational AI for between-session support
- Empathetic, supportive responses
- Remembers context from previous conversations and sessions
- Can guide through coping exercises
- Escalates to crisis resources when needed
- Clear boundaries: not a replacement for therapy
- Summarizes conversations for counselor review (with consent)

### Guided Check-ins (P0)
- Daily or weekly mood prompts
- Progress questions tied to session goals
- Trend visualization over time
- Shared with counselor (with consent)

### Crisis Resources (P0)
- One-tap access to crisis hotlines
- Emergency contact quick-dial
- Grounding exercises for acute distress
- Location-aware resource suggestions

### Client Recaps (P0) - Connected Mode Only
- Personalized summary for client growth
- Key takeaways and homework/action items
- Progress tracking over multiple sessions
- Delivered via app or email

### Homework Tracking (P1) - Connected Mode Only
- Action items assigned by counselor
- Completion tracking with reminders
- Notes and reflections per task
- Progress visible to counselor

---

## Shared At-Home Features (Both Connected & Independent)

### Reflection Journal (P1)
- Voice or text journal entries
- AI-summarized for patterns
- Private by default, shareable with counselor
- Prompt suggestions based on session themes

### Coping Tools (P1)
- Guided breathing exercises
- Grounding techniques (5-4-3-2-1, etc.)
- Meditation/mindfulness audio
- Personalized based on client preferences
