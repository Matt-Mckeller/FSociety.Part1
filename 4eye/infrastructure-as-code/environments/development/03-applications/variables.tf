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

variable "domain" {
  description = "Primary domain for the application"
  type        = string
}

variable "dns_managed_zone" {
  description = "Cloud DNS managed zone name"
  type        = string
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

variable "tf_state_prefix_databases" {
  description = "State prefix for the databases layer"
  type        = string
}
