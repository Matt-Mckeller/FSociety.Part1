# W6 — Host Dashboard

> Room management, session analytics, feedback review, moderation/audit log, organization overview.

**Status:** Not yet planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

## To Define
- Dashboard layout and navigation
- Room management (list, create, edit rooms)
- Session analytics (attendance, language breakdown, engagement)
- Feedback review (AI suggestions from F13)
- Speech transform audit log (from F11)
- Data model: no owned entities — aggregates data from Rooms, Sessions, Feedback, TransformLog
- Frontend components: HostDashboard, RoomManager, AnalyticsCharts, FeedbackReview, AuditLog
- API surface: queries (getDashboardStats, getSessionAnalytics)
- Dependencies: W4 (rooms), F1 (sessions), F13 (feedback), F11 (transform log)
- Acceptance criteria
