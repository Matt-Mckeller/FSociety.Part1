output "cluster_name" {
  description = "Name of the GKE cluster"
  value       = google_container_cluster.primary.name
}

output "cluster_endpoint" {
  description = "Endpoint (IP) of the GKE cluster API server"
  value       = google_container_cluster.primary.endpoint
}

output "cluster_ca_certificate" {
  description = "Base64-encoded CA certificate for the cluster"
  value       = google_container_cluster.primary.master_auth[0].cluster_ca_certificate
}

output "cluster_location" {
  description = "Location (zone or region) of the GKE cluster"
  value       = google_container_cluster.primary.location
}

output "node_service_account_email" {
  description = "Email of the GKE node service account"
  value       = google_service_account.gke_nodes.email
}
