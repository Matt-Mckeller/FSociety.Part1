variable "prefix" {
  description = "Resource name prefix (e.g. four-eye-dev)"
  type        = string
}

variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "zone" {
  description = "GCP zone for zonal cluster (cheaper than regional)"
  type        = string
}

variable "environment" {
  description = "Environment name (development, staging, production)"
  type        = string
}

variable "cluster_name" {
  description = "GKE cluster name"
  type        = string
}

variable "vpc_self_link" {
  description = "Self link of the VPC network"
  type        = string
}

variable "subnet_self_link" {
  description = "Self link of the subnet"
  type        = string
}

variable "master_ip_range" {
  description = "CIDR for GKE master nodes (must be /28)"
  type        = string
}

variable "pod_range_name" {
  description = "Name of the secondary IP range for pods"
  type        = string
}

variable "service_range_name" {
  description = "Name of the secondary IP range for services"
  type        = string
}

variable "machine_type" {
  description = "Machine type for GKE nodes"
  type        = string
  default     = "e2-medium"
}

variable "node_count" {
  description = "Initial number of nodes per zone"
  type        = number
  default     = 1
}

variable "min_node_count" {
  description = "Minimum nodes for autoscaling"
  type        = number
  default     = 1
}

variable "max_node_count" {
  description = "Maximum nodes for autoscaling"
  type        = number
  default     = 3
}

variable "node_disk_size_gb" {
  description = "Disk size in GB for each node"
  type        = number
  default     = 30
}

variable "deletion_protection" {
  description = "Whether to enable deletion protection on the cluster"
  type        = bool
  default     = false
}

variable "master_authorized_cidr_blocks" {
  description = "CIDR blocks authorized to access the GKE master API"
  type = list(object({
    cidr_block   = string
    display_name = string
  }))
  default = []
}
