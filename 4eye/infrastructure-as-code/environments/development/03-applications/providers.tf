# ── Remote State: Infrastructure Foundation ──────────────────
data "terraform_remote_state" "infrastructure" {
  backend = "gcs"
  config = {
    bucket = var.tf_state_bucket
    prefix = var.tf_state_prefix_infrastructure
  }
}

# ── Remote State: Databases ──────────────────────────────────
# Available for K8s resources that need DB connection details
# (e.g. ConfigMaps, Secrets, or deployment environment variables).
data "terraform_remote_state" "databases" {
  backend = "gcs"
  config = {
    bucket = var.tf_state_bucket
    prefix = var.tf_state_prefix_databases
  }
}

# ── Google Provider ──────────────────────────────────────────
provider "google" {
  project = var.project_id
  region  = var.region
}

# ── Kubernetes Provider (authenticated via GKE) ──────────────
data "google_client_config" "default" {}

provider "kubernetes" {
  host                   = "https://${data.terraform_remote_state.infrastructure.outputs.gke_cluster_endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(data.terraform_remote_state.infrastructure.outputs.gke_cluster_ca_certificate)
}
