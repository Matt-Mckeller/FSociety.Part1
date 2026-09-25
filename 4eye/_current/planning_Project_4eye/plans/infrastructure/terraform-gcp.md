# I1 — Terraform & GCP Foundation

> Infrastructure as Code (IaC) for 4eye.ai using Terraform on Google Cloud Platform.

**Status:** Partially Implemented
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)
**Reference:** [infrastructure-as-code/](../../../infrastructure-as-code/)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          GCP PROJECT: four-eye-ai-01                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                           VPC NETWORK                                │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │   │
│  │  │  Public Subnet  │  │ Private Subnet  │  │  Database Subnet    │  │   │
│  │  │  (NAT Gateway)  │  │   (GKE Nodes)   │  │  (Cloud SQL)        │  │   │
│  │  │  10.0.0.0/24    │  │   10.0.1.0/24   │  │   10.0.2.0/24       │  │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        GKE CLUSTER (Private)                         │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │                    Node Pool (e2-standard-4)                   │   │   │
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          │   │   │
│  │  │  │   API   │  │   Web   │  │ Workers │  │ Ingress │          │   │   │
│  │  │  │  Pods   │  │  Pods   │  │  Pods   │  │ Gateway │          │   │   │
│  │  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘          │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────────────────┐   │
│  │  Cloud SQL     │  │ Cloud Storage  │  │   Cloud DNS                │   │
│  │  (PostgreSQL)  │  │  (Recordings)  │  │   (4eye.ai)                │   │
│  └────────────────┘  └────────────────┘  └────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Terraform Structure

```
infrastructure-as-code/
├── bootstrap/                    # One-time setup (CI/CD SA, Workload Identity, DNS Zone)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── modules/                      # Reusable Terraform modules
│   ├── networking/               # VPC, subnets, NAT, firewall rules
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── gke-cluster/              # Private GKE cluster + node pool
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── cloud-sql-postgres/       # PostgreSQL via Cloud SQL
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
│
└── environments/                 # Per-environment configurations
    ├── development/
    │   ├── 01-infrastructure-foundation/
    │   │   ├── main.tf           # VPC, GKE, Artifact Registry
    │   │   ├── variables.tf
    │   │   ├── terraform.tfvars
    │   │   └── backend.tf        # GCS state backend
    │   ├── 02-databases/
    │   │   └── ...               # Cloud SQL instance
    │   └── 03-applications/
    │       └── ...               # K8s resources, Gateway, DNS records
    ├── staging/
    │   └── (same structure)
    └── production/
        └── (same structure)
```

---

## Design Decisions

### Key Choices

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| IaC Tool | **Terraform** | Pulumi, CloudFormation | Industry standard, GCP provider mature, team familiarity |
| Cloud Platform | **GCP** | AWS, Azure | Cloud SQL pricing, GKE ease, existing Google STT/Translate usage |
| State Backend | **GCS Bucket** | Terraform Cloud, S3 | Same cloud, no extra vendor, versioning built-in |
| Environment Strategy | **Separate State per Layer** | Single state, workspace per env | Isolation, faster plans, reduce blast radius |
| Module Approach | **Internal Modules** | Terraform Registry | Custom requirements, faster iteration |
| Secrets | **GCP Secret Manager** | Vault, env vars | Native GCP, K8s integration via CSI driver |

### Layer Dependency Order

Layers must be applied in order due to remote state dependencies:

```
01-infrastructure-foundation  →  02-databases  →  03-applications
         │                             │                │
         ▼                             ▼                ▼
  VPC, GKE, Registry           Cloud SQL        K8s resources,
  DNS Zone, Artifact Reg       Connections      Gateway, Storage
```

---

## Environments

| Environment | Purpose | Auto-Deploy | GKE Nodes | Cloud SQL Tier |
|-------------|---------|-------------|-----------|----------------|
| **development** | Feature dev, testing | ✅ on push | 1-3 (preemptible) | db-f1-micro |
| **staging** | Pre-production validation | ✅ on merge to main | 2-4 | db-g1-small |
| **production** | Live traffic | ❌ manual approval | 3-10 (autoscale) | db-custom-4-16384 |

### Promotion Flow

```
development  →  staging  →  production
    │              │             │
    ▼              ▼             ▼
 Auto-deploy   Auto-deploy   Manual approval
 on PR merge   on main push  via GitHub Actions
```

---

## GCP Services Used

| Service | Purpose | Terraform Resource |
|---------|---------|-------------------|
| **Compute Engine** | Underlying GKE nodes | `google_container_node_pool` |
| **GKE** | Kubernetes cluster | `google_container_cluster` |
| **Cloud SQL** | PostgreSQL database | `google_sql_database_instance` |
| **Cloud Storage** | Recordings, static assets | `google_storage_bucket` |
| **Cloud DNS** | Domain management | `google_dns_managed_zone` |
| **Secret Manager** | Secrets (API keys, DB passwords) | `google_secret_manager_secret` |
| **Artifact Registry** | Docker images | `google_artifact_registry_repository` |
| **Cloud NAT** | Outbound traffic from private nodes | `google_compute_router_nat` |
| **Cloud Armor** | WAF, DDoS protection | `google_compute_security_policy` |
| **Cloud Load Balancing** | HTTPS ingress | Via Gateway API on GKE |
| **Cloud Logging** | Centralized logs | Automatic with GKE |
| **Cloud Monitoring** | Metrics, alerts | `google_monitoring_alert_policy` |
| **Certificate Manager** | SSL certificates | `google_certificate_manager_certificate` |
| **Workload Identity** | K8s ↔ GCP IAM | `google_service_account_iam_binding` |

---

## Networking Architecture

### VPC Design

```terraform
# Simplified example
resource "google_compute_network" "main" {
  name                    = "four-eye-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "gke" {
  name          = "gke-subnet"
  ip_cidr_range = "10.0.1.0/24"
  region        = "us-central1"
  network       = google_compute_network.main.id
  
  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.1.0.0/16"
  }
  
  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.2.0.0/20"
  }
}
```

### IP Allocation

| Range | CIDR | Purpose |
|-------|------|---------|
| VPC Primary | 10.0.0.0/16 | Node IPs |
| GKE Pods | 10.1.0.0/16 | Pod IPs |
| GKE Services | 10.2.0.0/20 | ClusterIP services |
| Cloud SQL | 10.3.0.0/24 | Private service networking |

---

## State Management

### Remote State Configuration

```terraform
# backend.tf (per environment/layer)
terraform {
  backend "gcs" {
    bucket = "four-eye-tf-state-bucket"
    prefix = "environments/development/01-infrastructure-foundation"
  }
}
```

### State References

```terraform
# Reading from another layer's state
data "terraform_remote_state" "foundation" {
  backend = "gcs"
  config = {
    bucket = "four-eye-tf-state-bucket"
    prefix = "environments/development/01-infrastructure-foundation"
  }
}

# Using outputs from foundation
resource "google_sql_database_instance" "main" {
  name   = "four-eye-db"
  region = data.terraform_remote_state.foundation.outputs.region
  
  settings {
    tier = "db-f1-micro"
    ip_configuration {
      private_network = data.terraform_remote_state.foundation.outputs.vpc_id
    }
  }
}
```

---

## Prerequisites & Setup

### 1. GCP Project Setup

```bash
# Create project (or use existing)
gcloud projects create four-eye-ai-01 --name="4eye AI"

# Set as active
gcloud config set project four-eye-ai-01

# Enable billing
gcloud billing accounts list
gcloud billing projects link four-eye-ai-01 --billing-account=<ACCOUNT_ID>
```

### 2. Enable APIs

```bash
gcloud services enable \
  compute.googleapis.com \
  container.googleapis.com \
  sqladmin.googleapis.com \
  dns.googleapis.com \
  certificatemanager.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  servicenetworking.googleapis.com \
  iam.googleapis.com \
  cloudresourcemanager.googleapis.com
```

### 3. Create State Bucket

```bash
gsutil mb -p four-eye-ai-01 -l us-central1 gs://four-eye-tf-state-bucket
gsutil versioning set on gs://four-eye-tf-state-bucket
```

### 4. Bootstrap (One-time)

```bash
cd infrastructure-as-code/bootstrap
terraform init
terraform apply
```

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| **I2 (GKE)** | → feeds into | GKE cluster created here |
| **I3 (Cloud SQL)** | → feeds into | VPC for private SQL connection |
| **I5 (CI/CD)** | → uses | Workload Identity for GitHub Actions |

---

## Acceptance Criteria

### Phase 0 (MVP Infrastructure)
- [ ] VPC with public/private subnets created via Terraform
- [ ] GKE private cluster running with node pool
- [ ] Cloud SQL PostgreSQL instance with private IP
- [ ] Artifact Registry for Docker images
- [ ] Cloud Storage bucket for recordings
- [ ] Cloud DNS zone configured for 4eye.ai
- [ ] SSL certificates via Certificate Manager
- [ ] GitHub Actions can deploy via Workload Identity
- [ ] Development environment fully deployable with `terraform apply`

### Phase 1 (Multi-Environment)
- [ ] Staging environment mirrors development
- [ ] Production environment with higher specs
- [ ] Environment promotion workflow documented
- [ ] State locking enabled

### Phase 2 (Hardening)
- [ ] Cloud Armor WAF rules applied
- [ ] VPC Service Controls (optional)
- [ ] Audit logging enabled
- [ ] Cost monitoring alerts
