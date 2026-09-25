# ──────────────────────────────────────────────────────────────
# Development Application Layer
# Sets up the Kubernetes namespace, service accounts, Gateway
# with TLS, DNS records, and Cloud Storage for the 4eye app.
# ──────────────────────────────────────────────────────────────

locals {
  prefix     = "four-eye-${var.environment}"
  app_domain = var.environment == "production" ? var.domain : "${var.environment}.${var.domain}"
}

# ── Namespace ────────────────────────────────────────────────
resource "kubernetes_namespace" "app" {
  metadata {
    name = local.prefix
    labels = {
      environment = var.environment
      managed_by  = "terraform"
    }
  }
}

# ── Service Accounts (Workload Identity) ─────────────────────

# Backend (NestJS) service account
resource "kubernetes_service_account" "backend" {
  metadata {
    name      = "${local.prefix}-backend"
    namespace = kubernetes_namespace.app.metadata[0].name
    annotations = {
      "iam.gke.io/gcp-service-account" = google_service_account.backend.email
    }
  }
}

resource "google_service_account" "backend" {
  account_id   = "${local.prefix}-backend"
  display_name = "4eye Backend (${var.environment})"
}

# Workload Identity binding: K8s SA ↔ GCP SA
resource "google_service_account_iam_member" "backend_workload_identity" {
  service_account_id = google_service_account.backend.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[${kubernetes_namespace.app.metadata[0].name}/${kubernetes_service_account.backend.metadata[0].name}]"
}

# Backend needs: Cloud SQL, Cloud Storage, Secret Manager
resource "google_project_iam_member" "backend_cloudsql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.backend.email}"
}

resource "google_project_iam_member" "backend_storage_admin" {
  project = var.project_id
  role    = "roles/storage.objectAdmin"
  member  = "serviceAccount:${google_service_account.backend.email}"
}

resource "google_project_iam_member" "backend_secret_accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${google_service_account.backend.email}"
}

# Frontend (Next.js) service account — minimal permissions
resource "kubernetes_service_account" "frontend" {
  metadata {
    name      = "${local.prefix}-frontend"
    namespace = kubernetes_namespace.app.metadata[0].name
  }
}

# ── Static IP for Gateway ────────────────────────────────────
resource "google_compute_address" "gateway_ip" {
  name         = "${local.prefix}-gateway-ip"
  region       = var.region
  network_tier = "STANDARD"
}

# ── Google-Managed SSL Certificate ───────────────────────────
resource "google_certificate_manager_dns_authorization" "app" {
  location    = var.region
  name        = "${local.prefix}-dns-auth"
  description = "DNS authorization for ${local.app_domain}"
  domain      = local.app_domain
}

resource "google_certificate_manager_certificate" "app" {
  location    = var.region
  name        = "${local.prefix}-ssl-cert"
  description = "Google-managed SSL certificate for ${local.app_domain}"
  scope       = "DEFAULT"

  labels = {
    environment = var.environment
  }

  managed {
    domains            = [local.app_domain]
    dns_authorizations = [google_certificate_manager_dns_authorization.app.id]
  }
}

# ── Cloud DNS Records ────────────────────────────────────────
# A record pointing domain to gateway IP
resource "google_dns_record_set" "app_a_record" {
  project      = var.project_id
  managed_zone = var.dns_managed_zone
  name         = "${local.app_domain}."
  type         = "A"
  ttl          = 300
  rrdatas      = [google_compute_address.gateway_ip.address]
}

# CNAME for certificate DNS challenge
resource "google_dns_record_set" "cert_validation" {
  project      = var.project_id
  managed_zone = var.dns_managed_zone
  name         = google_certificate_manager_dns_authorization.app.dns_resource_record[0].name
  type         = google_certificate_manager_dns_authorization.app.dns_resource_record[0].type
  ttl          = 300
  rrdatas      = [google_certificate_manager_dns_authorization.app.dns_resource_record[0].data]
}

# ── Gateway API ──────────────────────────────────────────────
resource "kubernetes_manifest" "gateway" {
  manifest = {
    apiVersion = "gateway.networking.k8s.io/v1"
    kind       = "Gateway"
    metadata = {
      name      = "${local.prefix}-gateway"
      namespace = kubernetes_namespace.app.metadata[0].name
    }
    spec = {
      gatewayClassName = "gke-l7-regional-external-managed"
      listeners = [
        {
          name     = "http"
          protocol = "HTTP"
          port     = 80
        },
        {
          name     = "https"
          protocol = "HTTPS"
          port     = 443
          tls = {
            mode = "Terminate"
            options = {
              "networking.gke.io/cert-manager-certs" = google_certificate_manager_certificate.app.name
            }
          }
        },
      ]
      addresses = [{
        type  = "NamedAddress"
        value = google_compute_address.gateway_ip.name
      }]
    }
  }
}

# HTTP → HTTPS redirect
resource "kubernetes_manifest" "http_to_https_redirect" {
  manifest = {
    apiVersion = "gateway.networking.k8s.io/v1"
    kind       = "HTTPRoute"
    metadata = {
      name      = "${local.prefix}-http-redirect"
      namespace = kubernetes_namespace.app.metadata[0].name
    }
    spec = {
      parentRefs = [{
        name        = "${local.prefix}-gateway"
        sectionName = "http"
      }]
      rules = [{
        filters = [{
          type = "RequestRedirect"
          requestRedirect = {
            scheme = "https"
          }
        }]
      }]
    }
  }
}

# ── Cloud Storage Bucket (file uploads) ──────────────────────
resource "google_storage_bucket" "uploads" {
  name                        = "${local.prefix}-uploads"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = var.environment != "production"

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 90
    }
    action {
      type          = "SetStorageClass"
      storage_class = "NEARLINE"
    }
  }

  cors {
    origin          = [var.environment == "production" ? "https://${var.domain}" : "https://${local.app_domain}"]
    method          = ["GET", "HEAD", "PUT", "POST"]
    response_header = ["Content-Type"]
    max_age_seconds = 3600
  }
}
