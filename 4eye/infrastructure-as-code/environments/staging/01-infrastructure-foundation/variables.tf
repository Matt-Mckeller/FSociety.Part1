variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "zone" {
  description = "GCP zone for zonal cluster"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "cluster_name" {
  description = "GKE cluster name"
  type        = string
}

variable "machine_type" {
  description = "Machine type for GKE nodes"
  type        = string
  default     = "e2-medium"
}

variable "subnet_ip_range" {
  description = "Primary subnet CIDR"
  type        = string
}

variable "pods_ip_range" {
  description = "Secondary CIDR for pods"
  type        = string
}

variable "services_ip_range" {
  description = "Secondary CIDR for services"
  type        = string
}

variable "master_ip_range" {
  description = "CIDR for GKE master (must be /28)"
  type        = string
}

variable "proxy_subnet_ip_range" {
  description = "CIDR for Gateway API proxy subnet"
  type        = string
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

variable "master_authorized_cidr_blocks" {
  description = "CIDRs authorized to access GKE master API"
  type = list(object({
    cidr_block   = string
    display_name = string
  }))
  default = []
}
