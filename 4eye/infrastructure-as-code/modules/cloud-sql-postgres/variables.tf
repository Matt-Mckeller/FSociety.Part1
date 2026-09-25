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

variable "vpc_id" {
  description = "VPC network ID for private peering"
  type        = string
}

variable "vpc_self_link" {
  description = "VPC network self link for Cloud SQL ip_configuration"
  type        = string
}

variable "database_version" {
  description = "PostgreSQL version"
  type        = string
  default     = "POSTGRES_16"
}

variable "tier" {
  description = "Cloud SQL machine tier"
  type        = string
  default     = "db-f1-micro"
}

variable "availability_type" {
  description = "ZONAL or REGIONAL (HA)"
  type        = string
  default     = "ZONAL"
}

variable "disk_size_gb" {
  description = "Initial disk size in GB"
  type        = number
  default     = 10
}

variable "disk_autoresize_limit" {
  description = "Maximum disk size in GB for autoresize"
  type        = number
  default     = 50
}

variable "database_name" {
  description = "Name of the database to create"
  type        = string
  default     = "four_eye"
}

variable "database_user" {
  description = "Database user name"
  type        = string
  default     = "four_eye_app"
}

variable "database_password" {
  description = "Database user password (use Secret Manager in production)"
  type        = string
  sensitive   = true
}

variable "deletion_protection" {
  description = "Whether to enable deletion protection"
  type        = bool
  default     = false
}
