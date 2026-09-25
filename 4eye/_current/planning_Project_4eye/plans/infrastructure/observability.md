# I4 — Observability

> Logging, monitoring, alerting, and tracing infrastructure.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OBSERVABILITY STACK                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        CLOUD LOGGING                                 │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐  │   │
│  │  │  GKE Logs   │  │  App Logs   │  │  Audit Logs                 │  │   │
│  │  │  (stdout)   │  │  (Winston)  │  │  (Cloud Audit)              │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────────┘  │   │
│  │                          │                                           │   │
│  │                          ▼                                           │   │
│  │                   Log Router (Sinks)                                 │   │
│  │                   ├─→ BigQuery (long-term)                          │   │
│  │                   └─→ Alerting Policies (errors)                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       CLOUD MONITORING                               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐  │   │
│  │  │  GKE Metrics│  │ Custom Mtx  │  │  Uptime Checks              │  │   │
│  │  │  (auto)     │  │  (business) │  │  (endpoints)                │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────────┘  │   │
│  │                          │                                           │   │
│  │                          ▼                                           │   │
│  │              ┌─────────────────────┐                                │   │
│  │              │   Alerting Policies │                                │   │
│  │              │   → PagerDuty       │                                │   │
│  │              │   → Slack           │                                │   │
│  │              │   → Email           │                                │   │
│  │              └─────────────────────┘                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       CLOUD TRACE                                    │   │
│  │  OpenTelemetry → Cloud Trace Exporter → Distributed Tracing         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| Logging | **Cloud Logging** | ELK, Loki | Native GCP, no extra infra |
| Monitoring | **Cloud Monitoring** | Prometheus+Grafana | Native GCP, managed |
| Tracing | **Cloud Trace** | Jaeger, Zipkin | Native GCP, OpenTelemetry support |
| Alerting | **Cloud Monitoring Alerts** | PagerDuty native | Single pane of glass |
| Dashboards | **Cloud Monitoring** | Grafana | Lower operational overhead |

---

## Logging Strategy

### Log Levels

| Level | When to Use | Example |
|-------|-------------|---------|
| ERROR | Unexpected failures | Database connection failed |
| WARN | Degraded but functional | API rate limit approaching |
| INFO | Business events | Session created, payment processed |
| DEBUG | Development details | GraphQL query details |

### Structured Logging (NestJS)

```typescript
// Winston configuration for Cloud Logging
import { LoggingWinston } from '@google-cloud/logging-winston';

const cloudLogging = new LoggingWinston({
  projectId: process.env.GCP_PROJECT_ID,
  labels: {
    service: 'four-eye-api',
    environment: process.env.NODE_ENV,
  },
});

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [cloudLogging],
});

// Usage
logger.info('Session created', {
  sessionId: 'abc-123',
  userId: 'user-456',
  organizationId: 'org-789',
});
```

---

## Metrics

### System Metrics (Automatic)

| Metric | Source | Alert Threshold |
|--------|--------|-----------------|
| CPU utilization | GKE | > 80% for 5 min |
| Memory utilization | GKE | > 85% for 5 min |
| Pod restart count | GKE | > 3 in 10 min |
| HTTP error rate | Cloud LB | > 1% 5xx |
| Request latency | Cloud LB | p99 > 2s |

### Custom Business Metrics

| Metric | Description | Labels |
|--------|-------------|--------|
| `sessions_created_total` | Sessions started | vertical, organization |
| `transcription_minutes_total` | STT minutes used | provider, language |
| `ai_requests_total` | AI API calls | provider, task_type |
| `subscription_events_total` | Stripe events | event_type |

---

## Alerting Policies

### Critical (PagerDuty)

| Alert | Condition | Action |
|-------|-----------|--------|
| Service Down | Uptime check fails 2 consecutive | Page on-call |
| Error Rate Spike | 5xx rate > 5% for 5 min | Page on-call |
| Database Connection Failed | Cloud SQL unavailable | Page on-call |

### Warning (Slack)

| Alert | Condition | Action |
|-------|-----------|--------|
| High Latency | p99 > 3s for 10 min | Notify #alerts |
| Disk Usage High | > 80% | Notify #alerts |
| AI Provider Errors | Error rate > 10% | Notify #alerts |

---

## Acceptance Criteria

### MVP
- [ ] Cloud Logging receiving GKE and application logs
- [ ] Structured JSON logging from NestJS
- [ ] Basic uptime checks for API and Web
- [ ] Error rate alerting configured
- [ ] Slack notifications for warnings

### Phase 2
- [ ] Custom business metrics exported
- [ ] Cloud Trace integration with OpenTelemetry
- [ ] Log-based metrics for business events
- [ ] BigQuery sink for long-term log analysis
- [ ] Dashboards for key business metrics
