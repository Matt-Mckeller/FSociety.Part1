# ── Namespace ───────────────────────────────────────────────────
output "namespace" {
  description = "Kubernetes namespace for the application"
  value       = kubernetes_namespace.app.metadata[0].name
}

# ── Service Accounts ───────────────────────────────────────────
output "backend_service_account" {
  description = "K8s service account for the backend"
  value       = kubernetes_service_account.backend.metadata[0].name
}

output "frontend_service_account" {
  description = "K8s service account for the frontend"
  value       = kubernetes_service_account.frontend.metadata[0].name
}

output "backend_gcp_service_account_email" {
  description = "GCP service account email for the backend"
  value       = google_service_account.backend.email
}

# ── Networking ───────────────────────────────────────────────────
output "gateway_ip" {
  description = "Static IP address of the Gateway"
  value       = google_compute_address.gateway_ip.address
}

output "app_domain" {
  description = "Domain name for the application"
  value       = local.app_domain
}

# ── Storage ─────────────────────────────────────────────────────
output "uploads_bucket" {
  description = "Cloud Storage bucket for file uploads"
  value       = google_storage_bucket.uploads.name
}
