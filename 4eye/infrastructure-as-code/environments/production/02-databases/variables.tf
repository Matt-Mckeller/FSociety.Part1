variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "database_password" {
  description = "PostgreSQL user password (use Secret Manager)"
  type        = string
  sensitive   = true
}

variable "database_tier" {
  description = "Cloud SQL machine tier"
  type        = string
  default     = "db-custom-2-7680"
}

variable "database_version" {
  description = "PostgreSQL version"
  type        = string
  default     = "POSTGRES_16"
}

variable "tf_state_bucket" {
  description = "GCS bucket for Terraform state"
  type        = string
  default     = "four-eye-tf-state-bucket"
}

variable "tf_state_prefix_infrastructure" {
  description = "State prefix for the infrastructure foundation layer"
  type        = string
}
