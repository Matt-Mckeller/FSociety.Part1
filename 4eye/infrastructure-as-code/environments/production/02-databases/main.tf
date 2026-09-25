# ──────────────────────────────────────────────────────────────
# Production Database Layer
# Reads VPC info from infrastructure state, provisions PostgreSQL.
# ──────────────────────────────────────────────────────────────

locals {
  prefix = "four-eye-${var.environment}"
}

# ── Remote State: Infrastructure Foundation ──────────────────────
data "terraform_remote_state" "infrastructure" {
  backend = "gcs"
  config = {
    bucket = var.tf_state_bucket
    prefix = var.tf_state_prefix_infrastructure
  }
}

# ── Cloud SQL PostgreSQL ─────────────────────────────────────────
module "cloud_sql" {
  source = "../../../modules/cloud-sql-postgres"

  prefix        = local.prefix
  project_id    = var.project_id
  region        = var.region
  vpc_id        = data.terraform_remote_state.infrastructure.outputs.vpc_id
  vpc_self_link = data.terraform_remote_state.infrastructure.outputs.vpc_self_link

  database_version      = var.database_version
  tier                  = var.database_tier
  availability_type     = "REGIONAL" # HA for production
  database_password     = var.database_password
  deletion_protection   = true # Protect production data
  disk_autoresize_limit = 100  # Higher limit for production
}
