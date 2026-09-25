# ── Namespace ────────────────────────────────────────────────
output "namespace" {
  value = kubernetes_namespace.app.metadata[0].name
}

# ── Service Accounts ─────────────────────────────────────────
output "backend_service_account" {
  value = kubernetes_service_account.backend.metadata[0].name
}

output "frontend_service_account" {
  value = kubernetes_service_account.frontend.metadata[0].name
}

output "backend_gcp_service_account_email" {
  value = google_service_account.backend.email
}

# ── Networking ───────────────────────────────────────────────
output "gateway_ip" {
  value = google_compute_address.gateway_ip.address
}

output "app_domain" {
  value = local.app_domain
}

# ── Storage ──────────────────────────────────────────────────
output "uploads_bucket" {
  value = google_storage_bucket.uploads.name
}
