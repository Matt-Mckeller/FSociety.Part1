variable "prefix" {
  description = "Resource name prefix (e.g. four-eye-dev)"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "subnet_ip_range" {
  description = "Primary subnet CIDR for GKE nodes"
  type        = string
}

variable "pods_ip_range" {
  description = "Secondary CIDR for Kubernetes pods"
  type        = string
}

variable "services_ip_range" {
  description = "Secondary CIDR for Kubernetes services"
  type        = string
}

variable "proxy_subnet_ip_range" {
  description = "CIDR for the regional managed proxy subnet (Gateway API)"
  type        = string
  default     = "10.142.0.0/24"
}
