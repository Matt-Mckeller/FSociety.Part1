output "vpc_name" {
  description = "Name of the VPC network"
  value       = google_compute_network.primary.name
}

output "vpc_id" {
  description = "ID of the VPC network"
  value       = google_compute_network.primary.id
}

output "vpc_self_link" {
  description = "Self link of the VPC network"
  value       = google_compute_network.primary.self_link
}

output "subnet_name" {
  description = "Name of the primary subnet"
  value       = google_compute_subnetwork.primary.name
}

output "subnet_id" {
  description = "ID of the primary subnet"
  value       = google_compute_subnetwork.primary.id
}

output "subnet_self_link" {
  description = "Self link of the primary subnet"
  value       = google_compute_subnetwork.primary.self_link
}

output "pod_range_name" {
  description = "Name of the secondary IP range for pods"
  value       = google_compute_subnetwork.primary.secondary_ip_range[0].range_name
}

output "service_range_name" {
  description = "Name of the secondary IP range for services"
  value       = google_compute_subnetwork.primary.secondary_ip_range[1].range_name
}
