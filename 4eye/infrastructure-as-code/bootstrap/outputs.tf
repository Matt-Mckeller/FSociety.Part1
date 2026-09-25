output "cicd_service_account_email" {
  description = "CI/CD pipeline service account email"
  value       = google_service_account.cicd_pipeline.email
}

output "workload_identity_provider" {
  description = "Full resource name of the Workload Identity Provider (for GitHub Actions)"
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "dns_managed_zone_name" {
  description = "Name of the Cloud DNS managed zone"
  value       = google_dns_managed_zone.primary.name
}

output "dns_name_servers" {
  description = "Nameservers to configure at the domain registrar"
  value       = google_dns_managed_zone.primary.name_servers
}
