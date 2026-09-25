# ── Networking Outputs ──────────────────────────────────────────
output "vpc_name" {
  description = "Name of the VPC network"
  value       = module.networking.vpc_name
}

output "vpc_id" {
  description = "ID of the VPC network"
  value       = module.networking.vpc_id
}

output "vpc_self_link" {
  description = "Self link of the VPC network"
  value       = module.networking.vpc_self_link
}

output "subnet_name" {
  description = "Name of the primary subnet"
  value       = module.networking.subnet_name
}

output "subnet_id" {
  description = "ID of the primary subnet"
  value       = module.networking.subnet_id
}

# ── GKE Outputs ─────────────────────────────────────────────────
output "gke_cluster_name" {
  description = "Name of the GKE cluster"
  value       = module.gke.cluster_name
}

output "gke_cluster_endpoint" {
  description = "Endpoint (IP) of the GKE cluster API server"
  value       = module.gke.cluster_endpoint
}

output "gke_cluster_ca_certificate" {
  description = "Base64-encoded CA certificate for the cluster"
  value       = module.gke.cluster_ca_certificate
}

output "gke_cluster_location" {
  description = "Location (zone or region) of the GKE cluster"
  value       = module.gke.cluster_location
}

# ── General ─────────────────────────────────────────────────────
output "region" {
  description = "GCP region"
  value       = var.region
}

output "zone" {
  description = "GCP zone"
  value       = var.zone
}

output "project_id" {
  description = "GCP project ID"
  value       = var.project_id
}

output "artifact_registry_url" {
  description = "URL for pushing container images"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.containers.repository_id}"
}
