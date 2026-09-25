# I3 — Cloud SQL (PostgreSQL)

> PostgreSQL database infrastructure via Google Cloud SQL.

**Status:** Partially Implemented
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)
**Reference:** [infrastructure-as-code/modules/cloud-sql-postgres/](../../../infrastructure-as-code/modules/cloud-sql-postgres/)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CLOUD SQL POSTGRESQL                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Primary Instance: four-eye-{env}-db                                 │   │
│  │                                                                       │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │   │
│  │  │  PostgreSQL 16  │  │  Private IP     │  │  Automated Backups  │  │   │
│  │  │  (latest)       │  │  (VPC Peering)  │  │  (7 days retention) │  │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │   │
│  │                                                                       │   │
│  │  Flags:                                                               │   │
│  │  - max_connections: 100 (dev) / 500 (prod)                           │   │
│  │  - shared_buffers: 256MB (dev) / 4GB (prod)                          │   │
│  │  - pgvector extension enabled                                         │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Connection Path:                                                            │
│  GKE Pod → Cloud SQL Proxy (sidecar) → Private Service Connect → Cloud SQL  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| Database | **PostgreSQL 16** | MySQL, AlloyDB | TypeORM support, pgvector for embeddings |
| Connection | **Private IP + SQL Proxy** | Public IP, Private Service Connect | Security, automatic IAM auth |
| Tier | **Custom** (prod) | Shared core | Predictable performance |
| HA | **Regional** (prod) | Zonal | Automatic failover |
| Backups | **Automated daily** | Manual, PITR | Balance cost/recovery |

---

## Instance Specifications

| Environment | Tier | vCPUs | Memory | Storage | HA |
|-------------|------|-------|--------|---------|-----|
| Development | db-f1-micro | Shared | 0.6 GB | 10 GB SSD | No |
| Staging | db-g1-small | Shared | 1.7 GB | 20 GB SSD | No |
| Production | db-custom-4-16384 | 4 | 16 GB | 100 GB SSD | Yes |

---

## Databases

| Database | Purpose | Owner |
|----------|---------|-------|
| `four_eye_dev` | Development data | `four_eye_app` |
| `four_eye_staging` | Staging data | `four_eye_app` |
| `four_eye_prod` | Production data | `four_eye_app` |

---

## Connection Configuration

### Cloud SQL Proxy (Sidecar)

```yaml
# Kubernetes sidecar configuration
- name: cloud-sql-proxy
  image: gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.8.0
  args:
    - "--structured-logs"
    - "--auto-iam-authn"
    - "--port=5432"
    - "four-eye-ai-01:us-central1:four-eye-dev-db"
  securityContext:
    runAsNonRoot: true
```

### TypeORM Configuration

```typescript
// apps/api/src/config/database.config.ts
export const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',  // Proxy localhost
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,  // Use migrations
  ssl: process.env.DB_SSL === 'true',
  extra: {
    // Connection pooling via pgBouncer or app-level
    max: 20,
    idleTimeoutMillis: 30000,
  },
};
```

---

## Backup & Recovery

| Type | Frequency | Retention | Recovery Time |
|------|-----------|-----------|---------------|
| Automated backups | Daily | 7 days | ~minutes |
| On-demand backups | Manual | Until deleted | ~minutes |
| Point-in-time recovery | Continuous | 7 days | ~minutes |
| Export to GCS | Weekly | 30 days | ~hours |

---

## Acceptance Criteria

### MVP
- [ ] Cloud SQL PostgreSQL instance created via Terraform
- [ ] Private IP connection via VPC peering
- [ ] Cloud SQL Proxy configured in GKE
- [ ] Workload Identity for IAM-based auth
- [ ] Automated daily backups enabled
- [ ] four_eye database and app user created

### Phase 2
- [ ] Read replica for production
- [ ] Connection pooling (PgBouncer or Alloy)
- [ ] Query insights enabled
- [ ] Slow query logging configured
- [ ] pgvector extension installed for embeddings
