variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "domain" {
  description = "Primary domain for the application"
  type        = string
}

variable "admin_members" {
  description = "List of IAM members (user:, group:, serviceAccount:) with admin access"
  type        = list(string)
  default     = []
}
