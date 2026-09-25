terraform {
  required_version = "~> 1.12.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.45.0"
    }
  }

  backend "gcs" {
    bucket = "four-eye-tf-state-bucket"
    prefix = "terraform/state/staging/infrastructure"
  }
}
