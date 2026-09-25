# I6 — Security

> Security infrastructure: Secret Manager, Workload Identity, WAF, and Cloud Armor.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SECURITY LAYERS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Edge (Internet → GCP)                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Cloud Armor (WAF)                                                   │   │
│  │  ├── DDoS Protection (automatic)                                    │   │
│  │  ├── OWASP Top 10 Rules                                             │   │
│  │  ├── Rate Limiting (per IP)                                         │   │
│  │  └── Geo-blocking (optional)                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  Network Layer                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Private GKE Cluster                                                 │   │
│  │  ├── Nodes not exposed to internet                                  │   │
│  │  ├── VPC firewall rules                                             │   │
│  │  ├── Network Policies (pod-to-pod)                                  │   │
│  │  └── Private Google Access (GCP APIs)                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  Application Layer                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Workload Identity                                                   │   │
│  │  ├── K8s SA → GCP SA mapping                                        │   │
│  │  ├── No service account keys                                        │   │
│  │  └── Least-privilege IAM roles                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│  Secrets Layer                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Secret Manager                                                      │   │
│  │  ├── API keys (OpenAI, Anthropic, etc.)                             │   │
│  │  ├── Database credentials                                           │   │
│  │  ├── Stripe keys                                                    │   │
│  │  └── CSI Driver → K8s Secrets                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Design Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| Secret Storage | **GCP Secret Manager** | Vault, K8s Secrets | Managed, audit log, rotation |
| Secret Injection | **CSI Driver** | External Secrets, env vars | Native K8s, no sidecar |
| WAF | **Cloud Armor** | Cloudflare, AWS WAF | GCP native, integrated |
| Identity | **Workload Identity** | SA keys, IAM Conditions | No key management |
| Network | **Private GKE** | Public with firewall | Defense in depth |

---

## Secret Manager

### Secrets Inventory

| Secret Name | Purpose | Rotation | Access |
|-------------|---------|----------|--------|
| `db-password` | Cloud SQL password | 90 days | API pods |
| `jwt-secret` | JWT signing (@nestjs/passport) | 30 days | API pods |
| `openai-api-key` | OpenAI API | On compromise | API pods |
| `anthropic-api-key` | Anthropic API | On compromise | API pods |
| `deepseek-api-key` | DeepSeek API | On compromise | API pods |
| `google-stt-key` | Google STT API | On compromise | API pods |
| `stripe-secret-key` | Stripe payments | On compromise | API pods |
| `stripe-webhook-secret` | Stripe webhooks | On compromise | API pods |
| `sendgrid-api-key` | Email sending | On compromise | API pods |

### Terraform Configuration

```terraform
# secrets.tf
resource "google_secret_manager_secret" "db_password" {
  secret_id = "db-password"
  
  replication {
    auto {}
  }
  
  labels = {
    environment = var.environment
  }
}

resource "google_secret_manager_secret_iam_member" "api_access" {
  secret_id = google_secret_manager_secret.db_password.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.api.email}"
}
```

### CSI Driver Consumption

```yaml
# k8s/secrets-store.yaml
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: gcp-secrets
spec:
  provider: gcp
  parameters:
    secrets: |
      - resourceName: "projects/four-eye-ai-01/secrets/db-password/versions/latest"
        path: "db-password"
      - resourceName: "projects/four-eye-ai-01/secrets/openai-api-key/versions/latest"
        path: "openai-api-key"
```

---

## Cloud Armor (WAF)

### Security Policy

```terraform
resource "google_compute_security_policy" "four_eye" {
  name = "four-eye-waf"
  
  # OWASP ModSecurity Core Rule Set
  rule {
    action   = "deny(403)"
    priority = 1000
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('xss-v33-stable')"
      }
    }
    description = "XSS protection"
  }
  
  rule {
    action   = "deny(403)"
    priority = 1001
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('sqli-v33-stable')"
      }
    }
    description = "SQL injection protection"
  }
  
  # Rate limiting
  rule {
    action   = "rate_based_ban"
    priority = 2000
    match {
      config {
        src_ip_ranges = ["*"]
      }
    }
    rate_limit_options {
      conform_action = "allow"
      exceed_action  = "deny(429)"
      rate_limit_threshold {
        count        = 100
        interval_sec = 60
      }
      ban_duration_sec = 600
    }
    description = "Rate limit: 100 req/min per IP"
  }
  
  # Default allow
  rule {
    action   = "allow"
    priority = 2147483647
    match {
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default rule"
  }
}
```

---

## Workload Identity

### Service Account Mapping

| K8s Service Account | GCP Service Account | Roles |
|---------------------|---------------------|-------|
| `api` | `four-eye-api@...` | Secret Accessor, Cloud SQL Client, Storage Object Viewer |
| `web` | `four-eye-web@...` | Secret Accessor (minimal) |
| `workers` | `four-eye-workers@...` | Secret Accessor, Storage Object Creator |

### Configuration

```terraform
# workload-identity.tf
resource "google_service_account" "api" {
  account_id   = "four-eye-api"
  display_name = "4eye API Service Account"
}

resource "google_service_account_iam_binding" "api_workload_identity" {
  service_account_id = google_service_account.api.name
  role               = "roles/iam.workloadIdentityUser"
  
  members = [
    "serviceAccount:${var.project_id}.svc.id.goog[four-eye/api]"
  ]
}

resource "google_project_iam_member" "api_sql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.api.email}"
}
```

---

## Network Security

### VPC Firewall Rules

| Rule | Source | Destination | Ports | Action |
|------|--------|-------------|-------|--------|
| Allow GKE health | GCP health check IPs | GKE nodes | 80, 443 | Allow |
| Allow internal | VPC CIDR | VPC CIDR | All | Allow |
| Deny all ingress | 0.0.0.0/0 | GKE nodes | All | Deny |
| Allow IAP SSH | 35.235.240.0/20 | GKE nodes | 22 | Allow |

### Kubernetes Network Policies

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-policy
  namespace: four-eye
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress
      ports:
        - port: 3000
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: four-eye-db
      ports:
        - port: 5432
    - to:
        - ipBlock:
            cidr: 0.0.0.0/0  # External APIs
      ports:
        - port: 443
```

---

## Compliance Checklist

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| Encryption at rest | Cloud SQL, GCS default | ✅ |
| Encryption in transit | TLS everywhere | ✅ |
| Secrets not in code | Secret Manager | ✅ |
| Audit logging | Cloud Audit Logs | ✅ |
| WAF protection | Cloud Armor | ⏳ |
| Network isolation | Private GKE | ✅ |
| Least privilege | Workload Identity | ✅ |
| DDoS protection | Cloud Armor | ⏳ |

---

## Acceptance Criteria

### MVP
- [ ] Secret Manager storing all sensitive values
- [ ] CSI Driver injecting secrets to pods
- [ ] Workload Identity configured for API and Workers
- [ ] Private GKE cluster (nodes not public)
- [ ] Basic firewall rules in place

### Phase 2 (Hardening)
- [ ] Cloud Armor WAF with OWASP rules
- [ ] Rate limiting per IP
- [ ] Network policies for pod isolation
- [ ] VPC Service Controls (optional)
- [ ] Binary Authorization for images
- [ ] Security Command Center integration
