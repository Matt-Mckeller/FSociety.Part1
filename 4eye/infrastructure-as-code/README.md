# 4eye Infrastructure as Code

Terraform configuration for the **4eye.ai** platform on Google Cloud Platform (GKE, Cloud SQL, Cloud Storage).

## Architecture

```
infrastructure-as-code/
├── bootstrap/                    # One-time setup (CI/CD SA, Workload Identity)
├── modules/
│   ├── networking/               # VPC, subnets, NAT, firewall
│   ├── gke-cluster/              # Private GKE cluster + node pool
│   └── cloud-sql-postgres/       # PostgreSQL via Cloud SQL
└── environments/
    ├── development/
    │   ├── 01-infrastructure-foundation/
    │   ├── 02-databases/
    │   └── 03-applications/
    ├── staging/
    │   └── (same structure)
    └── production/
        └── (same structure)
```

### Layer Dependency Order

Layers **must** be applied in order due to state dependencies:

```
01-infrastructure-foundation  →  02-databases  →  03-applications
(VPC, GKE, Artifact Registry)    (Cloud SQL)      (K8s resources, Gateway, DNS, Storage)
```

### Environment Progression

```
development  →  staging  →  production
(auto-deploy)   (auto-deploy)  (manual approval)
```

## Prerequisites

1. **GCP Project**: `four-eye-ai-01` (update in `terraform.tfvars` files)
2. **Terraform**: v1.12.x (`brew install terraform`)
3. **GCS State Bucket**: `four-eye-tf-state-bucket` (create manually before first run)
4. **GCP Auth**: `gcloud auth application-default login`
5. **APIs Enabled**:
   - Compute Engine
   - Kubernetes Engine
   - Cloud SQL Admin
   - Cloud DNS
   - Certificate Manager
   - Artifact Registry
   - Secret Manager
   - Service Networking
   - IAM

## Quick Start

### 1. Bootstrap (one-time)

```bash
cd bootstrap
terraform init
terraform apply
```

This creates the CI/CD service account, Workload Identity Federation for GitHub Actions, and the Cloud DNS managed zone.

### 2. Deploy an Environment

```bash
# Infrastructure Foundation
cd environments/development/01-infrastructure-foundation
terraform init
terraform apply

# Databases (requires foundation state)
cd ../02-databases
terraform init
terraform apply -var="database_password=YOUR_SECURE_PASSWORD"

# Applications (requires foundation + database state)
cd ../03-applications
terraform init
terraform apply
```

### 3. Connect to GKE

```bash
gcloud container clusters get-credentials four-eye-dev-gke \
  --zone us-central1-a \
  --project four-eye-ai-01
```

## CI/CD (GitHub Actions)

| Event           | Action                                       |
|-----------------|----------------------------------------------|
| PR opened       | `terraform plan` + comment on PR + Snyk scan |
| Merge to `main` | Auto-apply dev → staging → prod (with gate)  |

### Required GitHub Secrets

| Secret                      | Description                      |
|-----------------------------|----------------------------------|
| `GCP_PROJECT_NUMBER`        | GCP project number (numeric)     |
| `DEV_DATABASE_PASSWORD`     | PostgreSQL password for dev      |
| `STAGING_DATABASE_PASSWORD` | PostgreSQL password for staging  |
| `PROD_DATABASE_PASSWORD`    | PostgreSQL password for prod     |
| `SNYK_TOKEN`                | Snyk API token for IaC scanning  |

### Required GitHub Environments

Configure in **Settings → Environments**:
- `development` — no restrictions
- `staging` — no restrictions
- `production` — add required reviewers for approval gate

## Security

- **Private GKE clusters** with Cloud NAT for outbound traffic
- **SSH restricted to IAP** (35.235.240.0/20 only)
- **Workload Identity** — pods authenticate via GCP SA binding, no keys
- **Database passwords** via `TF_VAR_database_password` env var (never in code)
- **SSL/TLS** via Google-managed certificates
- **Deletion protection** on production cluster and database
- **Snyk IaC scanning** on every PR

## Network CIDR Allocation

| Environment | Subnet       | Pods         | Services     | Master       | Proxy        |
|-------------|--------------|--------------|--------------|--------------|--------------|
| Development | 10.37.0.0/20 | 10.61.0.0/21 | 10.62.0.0/21 | 10.63.0.0/28 | 10.64.0.0/24 |
| Staging     | 10.47.0.0/20 | 10.71.0.0/21 | 10.72.0.0/21 | 10.73.0.0/28 | 10.74.0.0/24 |
| Production  | 10.17.0.0/20 | 10.31.0.0/21 | 10.32.0.0/21 | 10.33.0.0/28 | 10.34.0.0/24 |

## Domains

- **Production**: `4eye.ai`
- **Staging**: `staging.4eye.ai`
- **Development**: `development.4eye.ai`

DNS is managed via Cloud DNS zone `four-eye-ai`. The domain registrar must have NS records pointing to Cloud DNS.

## Updating the GCP Project ID

The project ID `four-eye-ai-01` appears in all `terraform.tfvars` files. To change it:

```bash
find . -name "terraform.tfvars" -exec sed -i '' 's/four-eye-ai-01/NEW_PROJECT_ID/g' {} +
```

Also update the `GCP_SERVICE_ACCOUNT` env var in `.github/workflows/*.yml`.

# Setup Kubernetes
[Install Gcloud Kubernetes Auth Plugin](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#install_plugin)
Follow instructions for kubernetes on [developer.hashicorp.com/terraform/tutorials/kubernetes/gke](https://developer.hashicorp.com/terraform/tutorials/kubernetes/gke)

When configuring kubectl you will need to adjust the command to be a zonal cluster rather than regional.
`gcloud container clusters get-credentials $(terraform output -raw gke_cluster_name) --zone $(terraform output -raw zone)`
or
`gcloud container clusters get-credentials expanse-terraform-3-gke-production --zone us-central1-a --project expanse-terraform-3`

For dashboard, use the gcloud view or the following
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml`
Run `kubectl proxy`
[Local Dashboard Access Url](http://127.0.0.1:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)


# Commands
`terraform init -backend-config="bucket=expanse-tf-state-bucket" -backend-config="prefix=terraform/state/production"`
`terraform init -backend-config=backend-production.config`

## Application Authentication vs Local Authentication ( CLI )
`gcloud auth application-default login` authorizes your local machine with user credentials and generates an "application default credentials" (ADC) file. This file is used by Google Cloud SDKs and tools (including Terraform) to authenticate API requests as your user account.

When you run gsutil or gcloud commands in your terminal, they use your active gcloud user credentials (from gcloud auth login). However, Terraform and most Google Cloud SDKs use "Application Default Credentials" (ADC), which are set up by running gcloud auth application-default login.

## Running Apply With Variables
`terraform apply -var-file variables-production.tfvars`


Todos
- google_container_engine_versions figure out how to properly specify the version so it doesnt keep destroying and recreating my production cluster notes saying ~ version = "1.33.2-gke.1111000" -> "1.32.4-gke.1698000" or vise versa
- Https w/ cert value in secrets
- SSL Certificate & How to store SSL certificates properly. They probably need to be encrypted, but using a secret manager for these would probably be too costly? I don't want to use a HSM and Secret manager every single time an http request comes in ( cert manager for kubernetes, an offered service? ) [Automating SSL/TLS Certificate Management with Let's Encrypt and HashiCorp Vault](https://www.youtube.com/watch?v=9koo87m-6Z8), may need to implement some kind of "reloader" in kubernetes pods to get updated certificates?
May check this udemy out https://www.udemy.com/course/gcp-gke-terraform-on-google-kubernetes-engine-devops-sre-iac/?srsltid=AfmBOoojuLs9hJGKkqQOFlGkZW0nPQ-fV8a-lw0m1heW6M6KQ1OOc4DR&couponCode=MT300725C  or may just use google for dns / certs etc
- Secret Manager
- Update hashicorp/helm version
- Setup ci cd with terraform, find a good example setup,
- Database Encryption? https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/container_cluster#nested_database_encryption ( perhaps secret manager handles this and is a better solution )
- Autoscaling
- Update cluster deletion protection to true when terraform config is stable
- Enable multiple nodes or use autoscaling
- Add upgrade_settings when I have multiple nodes
- Firewall? / WAF -> NGINX Offers this
- DOS / DDOS Protection -> NGINX may offer this? Cloudflare too, cloudflare maybe better for DDOS
- Network Policy / Internal networking? Or some way to set up networking to scale, perhaps calico is still good?
- Cloud Armor? CSRF protection but i think this should probably be at app level
- Backups
- Cluster db encryption?
- IAM Policies
- Service Account
- Kubernetes secret encryption ( db encryption probably )
- Kubernetes secret logging ? Or storing data somewhere else in the event kubernetes cluster needs to restart or be destroyed and rebuilt, without losing logs
- Restrict ssh access ips
- Can probably list zones/regions as config or data and specify enabled or disabled to easily update to which are enabled for future expansion easier ( option: https://www.udemy.com/course/gcp-gke-terraform-on-google-kubernetes-engine-devops-sre-iac/learn/lecture/45247451#overview )
- Version on node pool that seems to reference gke version but i disabled it because it was causing the apply to want to downgrade the gke version module.gke.google_container_node_pool.primary_cluster_nodes will be updated in-place
  ~ resource "google_container_node_pool" "primary_cluster_nodes" {
      ~ version                     = "1.33.2-gke.1111000" -> "1.32.4-gke.1767000"
- Setup for global regional specification for gke etc, probably defined at the module level I assume? Tbd best strategy
- Maybe switch over to using prepackaged terraform modules? Idk, depends
- # node_locations = data.google_compute_zones.available.names do i need this and what is it, also # data "google_compute_zones" "available" {
#   region = var.region
#   status = "UP"
# }
# output "compute_zones" {
#   description = "List of available compute zones"
#   value       = data.google_compute_zones.available.names
# }
- Re-enable Bastion VM for ssh/gke setup https://www.udemy.com/course/gcp-gke-terraform-on-google-kubernetes-engine-devops-sre-iac/learn/lecture/45399977
- Enable VPC flow logs, Cloud SQL audit logs, and Cloud Audit Logs to monitor and audit access and activity to db for compliance and auditing
- DB Encryption at rest and in transit
- Re-enable private endpoint and bastion vm
- Probably disable cloud fuse csi driver / bucket until its needed... due to resources to manage plugin
- DNS Queries is enabled, supposedly very small logs, may help with compliance
- Restrict TF Deployments to only be able to be deployed from bastion and/or pipeline
- Enable logs on bastion server
- Okta Enabled
- Github Enterprise for SSO, and advanced security whatever that is, and apparently socs compliance reports
- Verified Github accounts & require verified accounts ( or whatever this actually means, the checkmark next to a user etc )
- Bastion server logs -> What to do about these, they may contain sensitive data so they shouldn't be accessible in regular logs right? But they are an important aspect to monitor. What to do with them? Do they need to be in SIEM? Should they be and can they be?
- GKE Restrictions? Should I allow running shell commands on pods? By who, how does that information get logged, what if theres sensitive information in those logs?
- Verify the cloud sql private connection & vpc peering is set up properly
- Require proper browser settings with intune as well, https only, specific dns (actually local dns maybe needed for devs?)

Questions
- Do I need the cloud router if I have application level logging? Yes, there are requests that may not reach the aplication? And that are filtered by firewall or cloud armor etc

# Commands
## Get the operation ID from terraform debug logs or list operations
gcloud container operations list --zone=us-central1-a

## Describe the specific operation for detailed error info
gcloud container operations describe OPERATION_ID \
  --zone=us-central1-a \
  --format="yaml"


# Check container/cluster logs for errors
  gcloud logging read "resource.type=gke_cluster OR resource.type=gce_instance" \
  --limit=50 \
  --format="table(timestamp,severity,textPayload)" \
  --freshness=1h

# More specific - look for node creation errors
gcloud logging read 'resource.type="gke_cluster" AND severity>=ERROR' \
  --limit=20 \
  --freshness=1h

  # Look for actual node creation errors
gcloud logging read 'resource.type="gke_cluster" AND resource.labels.cluster_name="expanse-terraform-2-gke"' \
  --limit=20 \
  --freshness=30m \
  --format="table(timestamp,severity,textPayload)"

# Check resource quotas
  gcloud compute regions describe us-central1

# Check Resource Usage and Pod Status
kubectl describe pods

# See all running pods in all namespaces
kubectl get pods --all-namespaces
