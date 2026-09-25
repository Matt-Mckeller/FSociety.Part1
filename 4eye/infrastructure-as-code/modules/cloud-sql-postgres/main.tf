# ──────────────────────────────────────────────────────────────
# Cloud SQL PostgreSQL Module
# Creates a private PostgreSQL instance with VPC peering,
# a database, and a user.
# ──────────────────────────────────────────────────────────────

# ── Random suffix for instance name uniqueness ───────────────
resource "random_id" "db_name_suffix" {
  byte_length = 4
}

# ── Private Service Connection (VPC Peering for Cloud SQL) ───
resource "google_compute_global_address" "private_ip" {
  name          = "${var.prefix}-cloudsql-private-ip"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = var.vpc_id
}

resource "google_service_networking_connection" "private_vpc" {
  network                 = var.vpc_id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip.name]
  deletion_policy         = "ABANDON"
}

# ── Cloud SQL PostgreSQL Instance ────────────────────────────
resource "google_sql_database_instance" "primary" {
  depends_on = [google_service_networking_connection.private_vpc]

  name                = "${var.prefix}-postgres-${random_id.db_name_suffix.hex}"
  database_version    = var.database_version
  project             = var.project_id
  region              = var.region
  deletion_protection = var.deletion_protection

  settings {
    tier                  = var.tier
    edition               = "ENTERPRISE"
    availability_type     = var.availability_type
    disk_autoresize       = true
    disk_autoresize_limit = var.disk_autoresize_limit
    disk_size             = var.disk_size_gb
    disk_type             = "PD_SSD"

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
      start_time                     = "03:00" # 3 AM UTC
      transaction_log_retention_days = 7

      backup_retention_settings {
        retained_backups = 14
        retention_unit   = "COUNT"
      }
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = var.vpc_self_link

      ssl_mode = "ENCRYPTED_ONLY"
    }

    database_flags {
      name  = "log_checkpoints"
      value = "on"
    }

    database_flags {
      name  = "log_connections"
      value = "on"
    }

    database_flags {
      name  = "log_disconnections"
      value = "on"
    }

    insights_config {
      query_insights_enabled  = true
      query_plans_per_minute  = 5
      query_string_length     = 1024
      record_application_tags = true
      record_client_address   = true
    }
  }
}

# ── Database ─────────────────────────────────────────────────
resource "google_sql_database" "main" {
  name     = var.database_name
  instance = google_sql_database_instance.primary.name
}

# ── Database User ────────────────────────────────────────────
resource "google_sql_user" "app" {
  name     = var.database_user
  instance = google_sql_database_instance.primary.name
  password = var.database_password
}
