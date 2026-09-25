# W7 — Member Dashboard

> Session history, saved recordings, highlights, preferences, subscription status.

**Status:** Not yet planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

## To Define
- Dashboard layout and navigation
- Session history (past sessions attended, with timestamps)
- Saved recordings and playback
- Saved highlights from recaps
- Quick-access preferences (language, reading level)
- Subscription status display
- Data model: no owned entities — aggregates data from Sessions, Recordings, Recaps, Subscriptions
- Frontend components: MemberDashboard, SessionHistory, SavedRecordings, HighlightsList
- API surface: queries (getMyHistory, getMySavedRecordings, getMyHighlights)
- Dependencies: F5 (recordings), F7 (recaps), W5 (subscriptions)
- Acceptance criteria
