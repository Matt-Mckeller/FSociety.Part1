# X4 — Analytics & Event Tracking

> Custom-built event tracking and analytics system for user interactions, learning progress, and product insights.

**Status:** Planned — *Core Infrastructure*
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | ExpanseFrontend analytics implementation

---

## Overview

4eye uses a **custom analytics system** to track user interactions, learning progress, and engagement. Unlike third-party analytics, this system:
- Owns the data (privacy-first)
- Tracks learning-specific metrics
- Enables real-time dashboards
- Supports event-driven features (achievements, recommendations)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ANALYTICS SYSTEM                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  FRONTEND (Next.js)                                              │   │
│   │                                                                   │   │
│   │  ┌──────────────────────────────────────────────────────────┐   │   │
│   │  │  AnalyticsProvider                                        │   │   │
│   │  │  • Session ID generation                                  │   │   │
│   │  │  • Device context capture                                 │   │   │
│   │  │  • Event batching & queue                                 │   │   │
│   │  └──────────────────────────────────────────────────────────┘   │   │
│   │                           │                                      │   │
│   │  ┌────────────┐  ┌────────────┐  ┌────────────┐                 │   │
│   │  │ useTrack() │  │ <Track />  │  │ usePageView│                 │   │
│   │  │   hook     │  │ component  │  │   hook     │                 │   │
│   │  └────────────┘  └────────────┘  └────────────┘                 │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                │                                         │
│                                │ GraphQL Mutation (batched)              │
│                                ▼                                         │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │  BACKEND (NestJS)                                                │   │
│   │                                                                   │   │
│   │  ┌────────────────────────────────────────────────────────────┐ │   │
│   │  │  ANALYTICS MODULE                                           │ │   │
│   │  │                                                              │ │   │
│   │  │  • AnalyticsResolver    → Receive events                    │ │   │
│   │  │  • AnalyticsService     → Process & store                   │ │   │
│   │  │  • AggregationService   → Compute metrics                   │ │   │
│   │  │  • RealtimePublisher    → Push to dashboards                │ │   │
│   │  └────────────────────────────────────────────────────────────┘ │   │
│   │                                │                                 │   │
│   │                                ▼                                 │   │
│   │  ┌────────────────────────────────────────────────────────────┐ │   │
│   │  │  PostgreSQL                                                 │ │   │
│   │  │  • analytics_events (raw)                                   │ │   │
│   │  │  • analytics_sessions (aggregated)                          │ │   │
│   │  │  • learning_metrics (aggregated)                            │ │   │
│   │  └────────────────────────────────────────────────────────────┘ │   │
│   └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Event Categories

### Navigation Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `page_view` | Page load | path, referrer, title |
| `navigation` | Route change | from, to, method |
| `external_link` | Click external link | url, context |

### Authentication Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `signup_started` | Open signup form | method |
| `signup_completed` | Account created | method, referral |
| `login` | Successful login | method |
| `logout` | User logs out | duration |
| `guest_join` | Guest joins session | roomId |

### Session Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `session_join` | User joins session | roomId, role |
| `session_start` | Host starts session | roomId |
| `session_end` | Host ends session | duration, attendeeCount |
| `transcript_view` | View transcript | sessionId, percentage |

### Chat Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `chat_message_sent` | User sends message | conversationId, length |
| `chat_action_used` | Learning action clicked | action, conceptId |
| `chat_reaction` | User reacts to message | reaction, messageId |
| `tts_used` | Read aloud activated | contentLength |

### Learning Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `learning_mode_used` | User triggers mode | mode, conceptId |
| `quiz_started` | User starts quiz | conceptId |
| `quiz_completed` | User completes quiz | score, conceptId |
| `concept_explored` | New concept viewed | conceptId, sessionId |
| `mastery_achieved` | Concept mastered | conceptId, modesUsed |

### Accessibility Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `accessibility_mode_changed` | Mode toggled | fromMode, toMode |
| `tts_settings_changed` | TTS preferences updated | voice, rate |
| `language_changed` | Language preference changed | from, to |
| `reading_level_changed` | Reading level adjusted | level |

### UI Interaction Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `theme_changed` | Theme toggled | theme |
| `drawer_toggle` | Sidebar toggled | state |
| `modal_opened` | Modal displayed | modalId |
| `error_displayed` | Error shown to user | errorType, context |

### Payment Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `pricing_viewed` | Pricing page viewed | |
| `checkout_started` | Checkout initiated | plan, tier |
| `checkout_completed` | Payment successful | plan, amount |
| `checkout_abandoned` | Checkout not completed | step, plan |
| `subscription_changed` | Plan changed | from, to |

---

## Event Schema

### Base Event Structure

```typescript
interface AnalyticsEvent {
  // Event identification
  eventId: string;          // UUID
  eventName: string;        // e.g., "chat_message_sent"
  eventCategory: EventCategory;
  
  // Context
  sessionId: string;        // Browser session UUID
  userId?: string;          // Authenticated user ID
  timestamp: Date;
  pageUrl: string;
  
  // Device context
  device: DeviceContext;
  
  // Event-specific data
  properties: Record<string, any>;
}

interface DeviceContext {
  userAgent: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  screenWidth: number;
  screenHeight: number;
  viewport: { width: number; height: number };
  locale: string;
  timezone: string;
}

type EventCategory =
  | 'navigation'
  | 'authentication'
  | 'session'
  | 'chat'
  | 'learning'
  | 'accessibility'
  | 'ui'
  | 'payment'
  | 'error';
```

---

## Frontend Implementation

### AnalyticsProvider

```typescript
// providers/AnalyticsProvider.tsx
'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { TRACK_EVENTS } from '@/graphql/analytics';

interface AnalyticsContextValue {
  track: (eventName: string, properties?: Record<string, any>) => void;
  identify: (userId: string) => void;
  sessionId: string;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const sessionId = useRef(crypto.randomUUID());
  const eventQueue = useRef<AnalyticsEvent[]>([]);
  const [trackEvents] = useMutation(TRACK_EVENTS);
  
  // Device context (captured once)
  const deviceContext = useRef<DeviceContext>({
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    deviceType: getDeviceType(),
    screenWidth: typeof screen !== 'undefined' ? screen.width : 0,
    screenHeight: typeof screen !== 'undefined' ? screen.height : 0,
    viewport: {
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    },
    locale: typeof navigator !== 'undefined' ? navigator.language : 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  
  // Batch and send events every 5 seconds or when queue reaches 10
  useEffect(() => {
    const flushEvents = async () => {
      if (eventQueue.current.length === 0) return;
      
      const events = [...eventQueue.current];
      eventQueue.current = [];
      
      try {
        await trackEvents({
          variables: { events },
        });
      } catch (error) {
        // Re-queue failed events
        eventQueue.current = [...events, ...eventQueue.current];
        console.error('Failed to send analytics events:', error);
      }
    };
    
    const interval = setInterval(flushEvents, 5000);
    
    // Flush on page unload
    const handleUnload = () => flushEvents();
    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
      flushEvents();
    };
  }, [trackEvents]);
  
  const track = (eventName: string, properties: Record<string, any> = {}) => {
    const event: AnalyticsEvent = {
      eventId: crypto.randomUUID(),
      eventName,
      eventCategory: categorizeEvent(eventName),
      sessionId: sessionId.current,
      userId: getCurrentUserId(),
      timestamp: new Date(),
      pageUrl: window.location.href,
      device: deviceContext.current,
      properties,
    };
    
    eventQueue.current.push(event);
    
    // Flush if queue is large
    if (eventQueue.current.length >= 10) {
      // Trigger flush
    }
  };
  
  const identify = (userId: string) => {
    // Associate session with user
    track('user_identified', { userId });
  };
  
  return (
    <AnalyticsContext.Provider value={{ track, identify, sessionId: sessionId.current }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}
```

### useTrack Hook

```typescript
// hooks/useTrack.ts
import { useCallback } from 'react';
import { useAnalytics } from '@/providers/AnalyticsProvider';

export function useTrack() {
  const { track } = useAnalytics();
  
  return useCallback((eventName: string, properties?: Record<string, any>) => {
    track(eventName, properties);
  }, [track]);
}

// Specialized tracking hooks
export function usePageView() {
  const track = useTrack();
  
  useEffect(() => {
    track('page_view', {
      path: window.location.pathname,
      referrer: document.referrer,
      title: document.title,
    });
  }, [track]);
}

export function useLearningTrack() {
  const track = useTrack();
  
  return {
    trackModeUsed: (mode: string, conceptId: string) => {
      track('learning_mode_used', { mode, conceptId });
    },
    trackQuizCompleted: (conceptId: string, score: number) => {
      track('quiz_completed', { conceptId, score });
    },
    trackMasteryAchieved: (conceptId: string, modesUsed: string[]) => {
      track('mastery_achieved', { conceptId, modesUsed });
    },
  };
}
```

### Track Component (Declarative)

```typescript
// components/Track.tsx
import { useEffect } from 'react';
import { useTrack } from '@/hooks/useTrack';

interface TrackProps {
  event: string;
  properties?: Record<string, any>;
  on?: 'mount' | 'unmount' | 'both';
}

export function Track({ event, properties, on = 'mount' }: TrackProps) {
  const track = useTrack();
  
  useEffect(() => {
    if (on === 'mount' || on === 'both') {
      track(event, properties);
    }
    
    return () => {
      if (on === 'unmount' || on === 'both') {
        track(`${event}_end`, properties);
      }
    };
  }, []);
  
  return null;
}

// Usage:
// <Track event="pricing_viewed" />
// <Track event="session_active" on="both" properties={{ sessionId }} />
```

---

## Backend Implementation

### Analytics Module

```typescript
// modules/analytics/analytics.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEvent, AnalyticsSession])],
  providers: [
    AnalyticsResolver,
    AnalyticsService,
    AggregationService,
    RealtimePublisher,
  ],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
```

### Analytics Resolver

```typescript
// modules/analytics/analytics.resolver.ts
@Resolver()
export class AnalyticsResolver {
  constructor(
    private analyticsService: AnalyticsService,
    private aggregationService: AggregationService,
  ) {}

  @Mutation(() => Boolean)
  async trackEvents(
    @Args('events', { type: () => [AnalyticsEventInput] }) events: AnalyticsEventInput[],
  ): Promise<boolean> {
    await this.analyticsService.saveEvents(events);
    return true;
  }

  @Query(() => SessionAnalytics)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('ADMIN', 'HOST')
  async sessionAnalytics(
    @Args('sessionId') sessionId: string,
  ): Promise<SessionAnalytics> {
    return this.aggregationService.getSessionAnalytics(sessionId);
  }

  @Query(() => UserLearningMetrics)
  @UseGuards(GqlAuthGuard)
  async myLearningMetrics(
    @CurrentUser() user: User,
  ): Promise<UserLearningMetrics> {
    return this.aggregationService.getUserLearningMetrics(user.id);
  }
}
```

### Analytics Service

```typescript
// modules/analytics/analytics.service.ts
@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent)
    private eventRepo: Repository<AnalyticsEvent>,
    private realtimePublisher: RealtimePublisher,
  ) {}

  async saveEvents(events: AnalyticsEventInput[]): Promise<void> {
    // Validate and sanitize events
    const validEvents = events.filter(this.isValidEvent);
    
    // Batch insert
    await this.eventRepo.insert(validEvents);
    
    // Publish to real-time subscribers (dashboards)
    for (const event of validEvents) {
      if (this.isRealtimeEvent(event)) {
        this.realtimePublisher.publish(event);
      }
    }
  }
  
  private isValidEvent(event: AnalyticsEventInput): boolean {
    return (
      event.eventName &&
      event.sessionId &&
      event.timestamp
    );
  }
  
  private isRealtimeEvent(event: AnalyticsEvent): boolean {
    // Events that should update dashboards in real-time
    return [
      'session_join',
      'session_start',
      'chat_message_sent',
      'learning_mode_used',
    ].includes(event.eventName);
  }
}
```

---

## Data Model

### AnalyticsEvent Entity

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| eventName | string | e.g., "chat_message_sent" |
| eventCategory | enum | navigation, chat, learning, etc. |
| sessionId | string | Browser session UUID |
| userId | UUID? | FK → User (null for anonymous) |
| timestamp | datetime | Event time |
| pageUrl | string | Full URL |
| properties | jsonb | Event-specific data |
| deviceType | enum | mobile, tablet, desktop |
| deviceInfo | jsonb | User agent, screen size, etc. |
| createdAt | datetime | Insert time |

### AnalyticsSession Entity (Aggregated)

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | string | Browser session UUID |
| userId | UUID? | FK → User |
| startedAt | datetime | First event time |
| endedAt | datetime? | Last event time |
| pageViews | int | Count |
| eventCount | int | Total events |
| pagesVisited | string[] | Unique paths |
| deviceType | enum | |
| referrer | string? | Original referrer |
| duration | int | Seconds |

### LearningMetrics Entity (Aggregated)

| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| conceptId | string | Concept identifier |
| modesUsed | string[] | Learning modes used |
| modeUsageCount | jsonb | { "TRIANGLE": 3, "QUIZ": 2 } |
| quizScores | float[] | Quiz scores |
| averageScore | float | Computed |
| masteryLevel | float | 0-100 |
| firstInteraction | datetime | |
| lastInteraction | datetime | |
| totalTimeSpent | int | Seconds |

---

## GraphQL API

### Mutations

```graphql
type Mutation {
  trackEvents(events: [AnalyticsEventInput!]!): Boolean!
}

input AnalyticsEventInput {
  eventId: String!
  eventName: String!
  eventCategory: EventCategory!
  sessionId: String!
  userId: String
  timestamp: DateTime!
  pageUrl: String!
  properties: JSON
  device: DeviceContextInput!
}

input DeviceContextInput {
  userAgent: String!
  deviceType: DeviceType!
  screenWidth: Int!
  screenHeight: Int!
  viewportWidth: Int!
  viewportHeight: Int!
  locale: String!
  timezone: String!
}

enum EventCategory {
  NAVIGATION
  AUTHENTICATION
  SESSION
  CHAT
  LEARNING
  ACCESSIBILITY
  UI
  PAYMENT
  ERROR
}
```

### Queries

```graphql
type Query {
  # Dashboard: Session analytics (hosts/admins)
  sessionAnalytics(sessionId: ID!): SessionAnalytics!
  
  # User's own learning metrics
  myLearningMetrics: UserLearningMetrics!
  
  # Admin: Overall platform metrics
  platformMetrics(dateRange: DateRangeInput!): PlatformMetrics!
}

type SessionAnalytics {
  sessionId: ID!
  attendeeCount: Int!
  peakAttendees: Int!
  messagesCount: Int!
  learningModesUsed: [LearningModeUsage!]!
  accessibilityModesUsed: [AccessibilityModeUsage!]!
  averageEngagement: Float!
  topConcepts: [ConceptEngagement!]!
}

type UserLearningMetrics {
  conceptsExplored: Int!
  conceptsMastered: Int!
  favoriteMode: String!
  totalLearningTime: Int! # minutes
  streakDays: Int!
  recentConcepts: [ConceptProgress!]!
  achievements: [Achievement!]!
}

type PlatformMetrics {
  totalUsers: Int!
  activeUsers: Int! # Last 7 days
  totalSessions: Int!
  totalLearningModeUsage: Int!
  topAccessibilityModes: [ModeCount!]!
  topLanguages: [LanguageCount!]!
}
```

---

## Real-time Dashboards

### Host Dashboard Metrics

Real-time metrics for session hosts:
- Current attendee count
- Messages per minute
- Learning modes being used
- Engagement score (based on interactions)

### Admin Dashboard Metrics

Platform-wide metrics:
- Active users (live count)
- Events per second
- Error rates
- Feature usage trends

### Implementation

```typescript
// Real-time subscription
@Subscription(() => SessionMetrics)
@UseGuards(GqlAuthGuard)
sessionMetricsUpdated(
  @Args('sessionId') sessionId: string,
) {
  return this.pubSub.asyncIterator(`session_metrics_${sessionId}`);
}
```

---

## Privacy & Compliance

### Data Minimization

- No PII in properties unless necessary
- IP addresses hashed, not stored raw
- Session IDs are random UUIDs (not trackable)

### User Controls

- Analytics opt-out in settings
- Data export (GDPR)
- Data deletion request

### Retention

| Data Type | Retention |
|-----------|-----------|
| Raw events | 90 days |
| Aggregated sessions | 2 years |
| Learning metrics | User account lifetime |

---

## Project Structure

```
frontend/
└── src/
    ├── providers/
    │   └── AnalyticsProvider.tsx
    ├── hooks/
    │   ├── useTrack.ts
    │   ├── usePageView.ts
    │   └── useLearningTrack.ts
    ├── components/
    │   └── Track.tsx
    └── graphql/
        └── analytics.ts

backend/
└── src/
    └── modules/
        └── analytics/
            ├── analytics.module.ts
            ├── analytics.resolver.ts
            ├── analytics.service.ts
            ├── aggregation.service.ts
            ├── realtime-publisher.service.ts
            ├── entities/
            │   ├── analytics-event.entity.ts
            │   ├── analytics-session.entity.ts
            │   └── learning-metrics.entity.ts
            └── dto/
                └── analytics-event.input.ts
```

---

## Dependencies

- **C1** (Database) — Event storage
- **C4** (Real-time) — Dashboard subscriptions
- **F4** (Chat) — Chat event tracking
- **F14** (Learning Modes) — Learning event tracking
- **X2** (Accessibility) — Accessibility mode tracking

---

## Acceptance Criteria

### MVP
- [ ] AnalyticsProvider captures events with batching
- [ ] Page views tracked automatically
- [ ] Chat and learning events tracked
- [ ] Events stored in database
- [ ] Basic query for user's learning metrics

### Phase 2
- [ ] Real-time host dashboard
- [ ] Admin platform metrics dashboard
- [ ] Learning streaks and achievements
- [ ] Event-driven recommendations
- [ ] Data export (GDPR compliance)
