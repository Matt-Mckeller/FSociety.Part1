# I2 — Kubernetes (GKE)

> GKE cluster configuration, node pools, namespaces, and Helm chart deployments.

**Status:** Partially Implemented
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)
**Reference:** [infrastructure-as-code/modules/gke-cluster/](../../../infrastructure-as-code/modules/gke-cluster/)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GKE CLUSTER: four-eye-{env}-gke                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Namespaces:                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐   │
│  │   four-eye   │ │ four-eye-db  │ │   ingress    │ │   monitoring     │   │
│  │  (app pods)  │ │ (sql-proxy)  │ │  (gateway)   │ │ (prometheus/etc) │   │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────────┘   │
│                                                                              │
│  Node Pools:                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  default-pool (e2-standard-4)                                        │   │
│  │  - Autoscaling: 1-10 nodes (production)                              │   │
│  │  - Preemptible: development/staging                                  │   │
│  │  - Spot VMs: cost optimization                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Workloads:                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │  API (Nest) │ │  Web (Next) │ │  Workers    │ │  Cloud SQL Proxy    │   │
│  │  Deployment │ │  Deployment │ │  Deployment │ │  Sidecar/Deployment │   │
│  │  2-5 pods   │ │  2-5 pods   │ │  1-3 pods   │ │                     │   │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| Cluster Type | **Private** | Public | Security — nodes not exposed to internet |
| Release Channel | **Regular** | Rapid, Stable | Balance of features and stability |
| Node Machine | **e2-standard-4** | n2, c2 | Cost-effective for mixed workloads |
| Autoscaling | **Cluster Autoscaler** | Manual | Handle traffic spikes automatically |
| Ingress | **Gateway API** | Nginx, Istio | GCP-native, managed, simple |
| Workload Identity | **Enabled** | Service Account keys | No key management, GCP best practice |

---

## Helm Charts

```
charts/
├── four-eye/                  # Umbrella chart
│   ├── Chart.yaml
│   ├── values.yaml            # Production defaults
│   ├── values-local.yaml      # Kind/local development
│   └── charts/
│       ├── api/               # NestJS API
│       │   ├── templates/
│       │   │   ├── deployment.yaml
│       │   │   ├── service.yaml
│       │   │   ├── hpa.yaml
│       │   │   └── configmap.yaml
│       │   └── values.yaml
│       ├── web/               # Next.js frontend
│       │   └── ...
│       └── postgresql/        # Bitnami (local only)
│           └── ...
```

---

## Resource Specifications

### Development

| Workload | Replicas | CPU Request | Memory Request | CPU Limit | Memory Limit |
|----------|----------|-------------|----------------|-----------|--------------|
| API | 1-2 | 100m | 256Mi | 500m | 512Mi |
| Web | 1-2 | 100m | 256Mi | 500m | 512Mi |
| Workers | 1 | 100m | 256Mi | 500m | 512Mi |

### Production

| Workload | Replicas | CPU Request | Memory Request | CPU Limit | Memory Limit |
|----------|----------|-------------|----------------|-----------|--------------|
| API | 2-5 | 250m | 512Mi | 1000m | 1Gi |
| Web | 2-5 | 250m | 512Mi | 1000m | 1Gi |
| Workers | 1-3 | 500m | 1Gi | 2000m | 2Gi |

---

## Namespaces

| Namespace | Purpose | Resources |
|-----------|---------|-----------|
| `four-eye` | Main application | API, Web, Workers |
| `four-eye-db` | Database connections | Cloud SQL Proxy |
| `ingress` | Gateway resources | HTTPRoute, Gateway |
| `monitoring` | Observability | Prometheus, Grafana (optional) |
| `cert-manager` | Certificate management | cert-manager (if not using Certificate Manager) |

---

## Acceptance Criteria

### MVP
- [ ] Private GKE cluster created via Terraform
- [ ] Node pool with autoscaling configured
- [ ] Workload Identity enabled and configured
- [ ] four-eye namespace with API and Web deployments
- [ ] Gateway API ingress routing traffic
- [ ] Cloud SQL Proxy connecting to PostgreSQL
- [ ] HPA configured for API and Web

### Phase 2
- [ ] PodDisruptionBudgets for high availability
- [ ] Network policies for namespace isolation
- [ ] Resource quotas per namespace
- [ ] Pod security standards enforced
