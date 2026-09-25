terraform {
  required_version = "~> 1.12.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.45.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.38.0"
    }
  }

  backend "gcs" {
    bucket = "four-eye-tf-state-bucket"
    prefix = "terraform/state/development/applications"
  }
}
