# C6 — Data Model Overview

> Cross-module entity relationships — how all module-owned data models interconnect. This is the only file that shows the full picture.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Multi-Vertical Architecture

The data model supports multiple verticals (Learning, Education, Religion, Professional) through:

1. **`verticalType`** field on Session and Organization
2. **`metadata`** JSON field for vertical-specific extensions
3. **Configurable enums** that vary by vertical context

See [plans/verticals/](../verticals/) for vertical-specific data extensions.

---

## Conventions

| Convention | Value |
|------------|-------|
| **Primary keys** | `id` (UUID v4) |
| **Timestamps** | `createdAt`, `updatedAt` (auto-managed) |
| **Soft deletes** | `deletedAt` (nullable) on User, Organization, Recording |
| **Naming** | camelCase for fields, PascalCase for entities |
| **Foreign keys** | `{entity}Id` (e.g., `userId`, `roomId`) |
| **Enums** | SCREAMING_SNAKE_CASE values |

---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CORE ENTITIES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐       ┌──────────────────┐       ┌──────────────┐             │
│  │   User   │──────<│ OrganizationUser │>──────│ Organization │             │
│  └──────────┘       └──────────────────┘       └──────────────┘             │
│       │                                               │                      │
│       │ 1:N                                          │ M:N                  │
│       ▼                                               ▼                      │
│  ┌──────────────┐                           ┌────────────────┐              │
│  │ ConsentLog   │                           │ OrganizationRoom│             │
│  └──────────────┘                           └────────────────┘              │
│       │                                              │                      │
│       │ (User also has)                              ▼                      │
│       ▼                                        ┌──────────┐                 │
│  ┌──────────────┐                              │   Room   │                 │
│  │ Subscription │                              │          │                 │
│  │   (User)     │                              └──────────┘                 │
│  └──────────────┘                                    │                      │
└──────────────────────────────────────────────────────┼──────────────────────┘
                                                       │
┌──────────────────────────────────────────────────────┼──────────────────────┐
│                           SESSION ENTITIES           │                       │
├──────────────────────────────────────────────────────┼──────────────────────┤
│                                                      ▼                      │
│                                               ┌──────────┐                  │
│      ┌──────────┐                             │ Session  │                  │
│      │ Speaker  │─────────────────────────────│          │                  │
│      └──────────┘                             └──────────┘                  │
│                                                │    │    │                  │
│                          ┌─────────────────────┘    │    └──────────┐       │
│                          ▼                          ▼               ▼       │
│                   ┌────────────┐           ┌───────────┐    ┌───────────┐   │
│                   │ Recording  │           │Transcript │    │SessionUser│   │
│                   └────────────┘           └───────────┘    └───────────┘   │
│                                                   │                         │
│                                                   ▼                         │
│                                          ┌────────────────┐                 │
│                                          │TranscriptSegment│                │
│                                          └────────────────┘                 │
│                                           │   │   │   │                     │
│                     ┌─────────────────────┘   │   │   └──────────────┐      │
│                     ▼                         ▼   ▼                  ▼      │
│              ┌────────────┐          ┌─────────┐ ┌──────────┐ ┌───────────┐ │
│              │Translation │          │ Summary │ │  Recap   │ │SpeechTrans│ │
│              └────────────┘          └─────────┘ └──────────┘ │  formLog  │ │
│                                                               └───────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           CONTENT ENTITIES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐                │
│  │GeneratedVisual│    │  ChatMessage  │    │  Notification │                │
│  └───────────────┘    └───────────────┘    └───────────────┘                │
│         │                    │                    │                         │
│         └────────────────────┴────────────────────┘                         │
│                              │                                              │
│                              ▼                                              │
│                        ┌──────────┐                                         │
│                        │ Session  │                                         │
│                        └──────────┘                                         │
│                                                                              │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐                │
│  │FeedbackReport │    │  Comparison   │    │RecapHighlight │                │
│  │               │    │    Result     │    │               │                │
│  └───────────────┘    └───────────────┘    └───────────────┘                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           BILLING ENTITIES                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                   │
│  │ Subscription │    │ UsageRecord  │    │ PaymentEvent │                   │
│  └──────────────┘    └──────────────┘    └──────────────┘                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Entity Definitions

### Core Entities

#### User
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| email | string | Unique, indexed |
| passwordHash | string | Nullable (OAuth users) |
| name | string | Display name |
| avatarUrl | string? | Optional |
| role | enum | MEMBER, ADMIN (system-wide) |
| preferredLanguage | string | ISO 639-1 (default: 'en') |
| readingLevel | enum | CHILD, STANDARD, ACADEMIC |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |
| deletedAt | datetime? | Soft delete |

#### ConsentLog
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| type | enum | TOS, PRIVACY_POLICY, RECORDING_CONSENT |
| version | string | Document version (e.g., "2026-03-01") |
| acceptedAt | datetime | When accepted |
| ipAddress | string | User's IP at time of consent |
| userAgent | string | Browser/device info |
| locale | string? | User's locale at time |
| metadata | json? | Additional context |

#### PasswordResetToken
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| token | string | Unique, secure random (indexed) |
| expiresAt | datetime | 1 hour from creation |
| usedAt | datetime? | Null until used |
| createdAt | datetime | Auto |

#### Organization
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| name | string | |
| slug | string | Unique, URL-friendly |
| description | string? | |
| logoUrl | string? | |
| verticalType | enum | LEARNING, EDUCATION, RELIGION, PROFESSIONAL |
| transcriptRetentionDays | int | 30, 90, 365, or null (forever) |
| metadata | json? | Vertical-specific extensions (see verticals/) |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |
| deletedAt | datetime? | Soft delete |

#### OrganizationUser (join table)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| organizationId | UUID | FK → Organization |
| userId | UUID | FK → User |
| role | enum | MEMBER, HOST, ADMIN |
| joinedAt | datetime | Auto |

#### Room
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| name | string | |
| description | string? | |
| inviteCode | string | Unique, 8-char alphanumeric |
| isRecordingEnabled | boolean | Default consent setting |
| isChatEnabled | boolean | |
| isActive | boolean | Soft disable |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |

#### OrganizationRoom (join table — M:N)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| organizationId | UUID | FK → Organization |
| roomId | UUID | FK → Room |
| isPrimaryOwner | boolean | Which org "owns" for billing |
| createdAt | datetime | Auto |

#### Location
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| organizationId | UUID | FK → Organization |
| name | string | |
| address | string? | |
| city | string? | |
| country | string? | ISO 3166-1 |
| latitude | decimal? | |
| longitude | decimal? | |
| timezone | string | IANA timezone |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |

---

### Session Entities

#### Session
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| roomId | UUID | FK → Room |
| hostId | UUID | FK → User (who started) |
| title | string? | Optional title |
| sourceLanguage | string | ISO 639-1 |
| status | enum | SCHEDULED, LIVE, ENDED, PROCESSING, COMPLETED |
| type | enum | LIVE, UPLOADED |
| verticalType | enum | LEARNING, EDUCATION, RELIGION, PROFESSIONAL (inherited from Org or explicit) |
| sourceUrl | string? | YouTube URL if imported |
| metadata | json? | Vertical-specific extensions (see verticals/) |
| startedAt | datetime? | When live started |
| endedAt | datetime? | When live ended |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |

#### SessionUser (attendance tracking)
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| userId | UUID? | FK → User (null for guests) |
| guestToken | string? | Anonymous guest ID |
| joinedAt | datetime | |
| leftAt | datetime? | |
| consentedToRecording | boolean | |

#### Speaker
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| organizationId | UUID? | FK → Organization (optional) |
| userId | UUID? | FK → User (if linked) |
| name | string | Display name |
| bio | string? | |
| avatarUrl | string? | |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |

#### Recording
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| storageUrl | string | GCS URL |
| mimeType | string | audio/mp3, video/mp4, etc. |
| durationSeconds | int | |
| fileSizeBytes | bigint | |
| status | enum | UPLOADING, PROCESSING, READY, FAILED |
| createdAt | datetime | Auto |
| deletedAt | datetime? | Soft delete |

---

### Transcript Entities

#### Transcript
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| language | string | Source language |
| status | enum | PENDING, PROCESSING, COMPLETED, FAILED |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |

#### TranscriptSegment
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| transcriptId | UUID | FK → Transcript |
| speakerId | UUID? | FK → Speaker (assigned after labeling) |
| diarizationLabel | string? | Auto-detected: "Speaker 1", "Speaker 2", etc. |
| startTime | decimal | Seconds from start |
| endTime | decimal | Seconds from start |
| text | text | Original text |
| confidence | decimal? | STT confidence 0-1 |
| sequenceIndex | int | Order in transcript |
| createdAt | datetime | Auto |

#### Translation
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| segmentId | UUID | FK → TranscriptSegment |
| language | string | Target language ISO 639-1 |
| readingLevel | enum | CHILD, STANDARD, ACADEMIC |
| text | text | Translated text |
| createdAt | datetime | Auto |

---

### AI Content Entities

#### Summary
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| language | string | |
| readingLevel | enum | |
| content | text | |
| generatedAt | datetime | |

#### Recap
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session (unique) |
| language | string | Source language |
| highlightCount | int | Denormalized count |
| modelUsed | string | e.g., "gpt-5.2" |
| generatedAt | datetime | |

#### RecapHighlight
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| recapId | UUID | FK → Recap |
| segmentId | UUID | FK → TranscriptSegment |
| sequenceIndex | int | Order in recap (0-based) |
| type | enum | KEY_POINT, EXAMPLE, DEFINITION, STORY, QUOTE, TRANSITION, ACTION_ITEM (vertical-configurable) |
| title | string | Short title (3-10 words) |
| description | string? | 1-2 sentence explanation |
| quote | string? | Direct quote from transcript |
| topics | string[] | AI-generated tags |
| startTime | decimal | Seconds (from segment) |
| endTime | decimal | Seconds (from segment) |

> **Vertical-specific types:** Religion adds SCRIPTURE, TEACHING; Education adds LEARNING_OBJECTIVE, PRACTICE_PROBLEM; Professional adds DECISION, FOLLOW_UP. See [verticals/](../verticals/).

#### UserSavedHighlight
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| highlightId | UUID | FK → RecapHighlight |
| savedAt | datetime | |
| note | string? | User's personal note |

*Unique constraint: `(userId, highlightId)`*

#### GeneratedVisual
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| segmentId | UUID? | FK → TranscriptSegment |
| imageUrl | string | GCS public URL |
| thumbnailUrl | string? | Smaller version |
| prompt | text | Full prompt used |
| concept | string | Extracted concept |
| triggerType | enum | AUTO, MANUAL, TOPIC_CHANGE |
| generationTimeMs | int | Generation duration |
| modelUsed | string | e.g., "dall-e-3" |
| status | enum | GENERATING, READY, FAILED |
| generatedAt | datetime | |

#### SpeechTransformLog
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| segmentId | UUID | FK → TranscriptSegment |
| sessionId | UUID | FK → Session (denormalized) |
| originalText | text | |
| transformedText | text | |
| reason | string | Why transformed |
| category | enum | INTOLERANCE, DEHUMANIZATION, VIOLENCE, EXCLUSION, HARSH_JUDGMENT |
| severity | enum | LOW, MEDIUM, HIGH |
| detectionScore | decimal | AI confidence 0-1 |
| modelUsed | string | e.g., "claude-4.5-opus" |
| reviewedBy | UUID? | FK → User (if manually reviewed) |
| reviewStatus | enum? | PENDING, APPROVED, REVERTED |
| createdAt | datetime | Auto |

#### FeedbackReport
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| speakerId | UUID | FK → Speaker |
| categories | json | `{clarity: 8.2, pacing: 7.5, ...}` |
| suggestions | json | FeedbackSuggestion[] (structured) |
| overallScore | decimal | 0-10, weighted average |
| modelUsed | string | e.g., "claude-4.5-opus" |
| generatedAt | datetime | |
| deletedAt | datetime? | Soft delete |

*FeedbackSuggestion: `{category, suggestion, evidenceQuote?, evidenceTimestamp?, priority}`*

#### ComparisonResult
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| userId | UUID | FK → User (who requested) |
| topic | string | Extracted topic |
| sourceContext | string | Current context (e.g., faith, discipline, speaker) |
| perspectives | json | Perspective[] (structured, vertical-specific) |
| comparisonType | enum | TOPIC, SOURCE, DISCIPLINE, PERSPECTIVE |
| modelUsed | string | e.g., "gpt-5.2" |
| generatedAt | datetime | |

> **Religion vertical:** Uses `FaithPerspective` with `{faith, tradition?, summary, keyTexts[], commonGround, uniqueAspects}`. See [verticals/religion.md](../verticals/religion.md).

---

### Communication Entities

#### ChatMessage
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| sessionId | UUID | FK → Session |
| userId | UUID? | FK → User |
| guestName | string? | For anonymous |
| content | text | |
| type | enum | TEXT, REACTION, QUESTION |
| isDeleted | boolean | Moderation |
| createdAt | datetime | Auto |

#### Notification
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID | FK → User |
| type | enum | SESSION_STARTING, RECAP_READY, etc. |
| title | string | |
| body | string | |
| data | json? | Additional payload |
| isRead | boolean | |
| createdAt | datetime | Auto |

---

### Billing Entities

#### Subscription
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| userId | UUID? | FK → User (individual) |
| organizationId | UUID? | FK → Organization (org) |
| tier | enum | STARTER, GROWTH, SCALE, ENTERPRISE (org) / FREE, BASIC, PLUS, PRO (user) |
| status | enum | ACTIVE, PAST_DUE, CANCELED, TRIALING |
| stripeCustomerId | string | |
| stripeSubscriptionId | string | |
| currentPeriodStart | datetime | |
| currentPeriodEnd | datetime | |
| includedHours | int | Per billing period |
| createdAt | datetime | Auto |
| updatedAt | datetime | Auto |

#### UsageRecord
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| subscriptionId | UUID | FK → Subscription |
| sessionId | UUID | FK → Session |
| minutesUsed | decimal | |
| recordedAt | datetime | |

#### PaymentEvent
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | PK |
| subscriptionId | UUID | FK → Subscription |
| stripeEventId | string | Idempotency |
| type | enum | PAYMENT_SUCCESS, PAYMENT_FAILED, SUBSCRIPTION_UPDATED, etc. |
| amount | decimal | |
| currency | string | |
| metadata | json? | |
| createdAt | datetime | Auto |

---

## Indexes

### Performance Critical
- `User.email` — unique, login
- `ConsentLog(userId, type)` — check latest consent per type
- `Room.inviteCode` — unique, join flow
- `Organization.slug` — unique, URL routing
- `TranscriptSegment(transcriptId, sequenceIndex)` — ordering
- `Translation(segmentId, language, readingLevel)` — lookup
- `Session(roomId, status)` — active session queries
- `SessionUser(sessionId, userId)` — attendance lookup
- `Notification(userId, isRead, createdAt)` — notification feed

---

## Migration Strategy

1. Create core tables first: User, ConsentLog, PasswordResetToken, Organization, OrganizationUser
2. Create room tables: Room, OrganizationRoom, Location
3. Create session tables: Session, SessionUser, Speaker, Recording
4. Create transcript tables: Transcript, TranscriptSegment, Translation
5. Create AI content tables: Summary, Recap, etc.
6. Create billing tables: Subscription, UsageRecord, PaymentEvent
7. Create communication tables: ChatMessage, Notification

---

## Module Ownership

| Entity | Owning Module |
|--------|--------------|
| User, OrganizationUser, ConsentLog, PasswordResetToken | C2 Authentication |
| Organization, OrganizationRoom | W4 Rooms |
| Room | W4 Rooms |
| Location | F8 Locations |
| Session, SessionUser | F1 Audio-to-Text |
| Speaker | F9 Speakers |
| Recording | F5 Recordings |
| Transcript, TranscriptSegment | F1 Audio-to-Text |
| Translation | F2 Live Translation |
| Summary | F6 Summaries |
| Recap, RecapHighlight | F7 Recaps |
| GeneratedVisual | F12 Visual Generation |
| SpeechTransformLog | F11 Positive Speech |
| FeedbackReport | F13 Speaker Feedback |
| ComparisonResult | F10 Cross-Source Comparison |
| ChatMessage | F4 Chat |
| Notification | W9 Notifications |
| Subscription, UsageRecord, PaymentEvent | W5 Payment |
