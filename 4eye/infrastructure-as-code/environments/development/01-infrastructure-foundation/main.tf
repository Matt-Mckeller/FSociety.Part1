# ──────────────────────────────────────────────────────────────
# Development Infrastructure Foundation
# Composes networking + GKE modules for the dev environment.
# ──────────────────────────────────────────────────────────────

locals {
  prefix = "four-eye-${var.environment}"
}

# ── Networking ───────────────────────────────────────────────
module "networking" {
  source = "../../../modules/networking"

  prefix                = local.prefix
  region                = var.region
  subnet_ip_range       = var.subnet_ip_range
  pods_ip_range         = var.pods_ip_range
  services_ip_range     = var.services_ip_range
  proxy_subnet_ip_range = var.proxy_subnet_ip_range
}

# ── GKE Cluster ──────────────────────────────────────────────
module "gke" {
  source = "../../../modules/gke-cluster"

  prefix       = local.prefix
  project_id   = var.project_id
  region       = var.region
  zone         = var.zone
  environment  = var.environment
  cluster_name = var.cluster_name

  vpc_self_link      = module.networking.vpc_self_link
  subnet_self_link   = module.networking.subnet_self_link
  master_ip_range    = var.master_ip_range
  pod_range_name     = module.networking.pod_range_name
  service_range_name = module.networking.service_range_name

  machine_type   = var.machine_type
  min_node_count = var.min_node_count
  max_node_count = var.max_node_count

  # Dev: open for development, tighten before production
  master_authorized_cidr_blocks = var.master_authorized_cidr_blocks

  deletion_protection = false
}

# ── Artifact Registry (for container images) ─────────────────
resource "google_artifact_registry_repository" "containers" {
  location      = var.region
  repository_id = "${local.prefix}-containers"
  format        = "DOCKER"
  description   = "Container images for 4eye ${var.environment}"
}
