# W9 — Notifications

> Email and push notifications for session reminders, new recaps, subscription changes.

**Status:** Not yet planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

## To Define
- Notification types (session reminder, recap ready, subscription change, system)
- Delivery channels (email, in-app, push)
- Email provider (SendGrid, SES, or similar)
- User notification preferences (opt-in/out per type)
- Data model: Notification (userId, type, channel, content, sentAt, readAt)
- Backend module: notification service, email sender
- Frontend components: NotificationBell, NotificationList, NotificationPreferences
- API surface: mutations (markRead, updateNotificationPrefs), queries (getNotifications), subscriptions (onNewNotification)
- Dependencies: C1 (database), C2 (auth), C4 (real-time for in-app)
- Acceptance criteria
