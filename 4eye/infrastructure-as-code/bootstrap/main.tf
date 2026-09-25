# ──────────────────────────────────────────────────────────────
# Bootstrap Layer
# One-time setup: CI/CD service account, IAM roles, DNS zone,
# and permissions needed before environment Terraform can run.
# ──────────────────────────────────────────────────────────────

# ── CI/CD Pipeline Service Account ───────────────────────────
resource "google_service_account" "cicd_pipeline" {
  account_id   = "four-eye-cicd-pipeline"
  display_name = "4eye CI/CD Pipeline Service Account"
  description  = "Used by GitHub Actions to run Terraform and deploy applications"
}

# ── IAM Roles for CI/CD Pipeline ─────────────────────────────
# The pipeline needs broad permissions to manage infrastructure
# across all environments. Each role covers a specific GCP service.

locals {
  cicd_roles = [
    # State bucket + storage
    "roles/storage.admin",
    # VPC, subnets, firewall, NAT, router, static IPs
    "roles/compute.networkAdmin",
    "roles/compute.securityAdmin",
    # Static IP addresses
    "roles/compute.publicIpAdmin",
    # GKE clusters and node pools
    "roles/container.admin",
    # Cloud SQL instances
    "roles/cloudsql.admin",
    # Cloud DNS records and zones
    "roles/dns.admin",
    # SSL certificates
    "roles/certificatemanager.editor",
    # Container image registry
    "roles/artifactregistry.admin",
    # Creating and managing service accounts
    "roles/iam.serviceAccountAdmin",
    "roles/iam.serviceAccountUser",
    # Managing IAM policy bindings
    "roles/resourcemanager.projectIamAdmin",
    # Workload Identity bindings
    "roles/iam.workloadIdentityPoolAdmin",
    # Service networking (VPC peering for Cloud SQL)
    "roles/servicenetworking.networksAdmin",
    # Secret Manager access
    "roles/secretmanager.admin",
    # Logging (CI/CD operations)
    "roles/logging.logWriter",
  ]
}

resource "google_project_iam_member" "cicd_pipeline_roles" {
  for_each = toset(local.cicd_roles)

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.cicd_pipeline.email}"
}

# ── Admin Access (Kubernetes) ────────────────────────────────
resource "google_project_iam_member" "k8s_admin" {
  for_each = toset(var.admin_members)

  project = var.project_id
  role    = "roles/container.admin"
  member  = each.value
}

# ── Cloud DNS Managed Zone ───────────────────────────────────
# Shared by all environments. NS records must be set at the
# domain registrar to point to the nameservers output below.
resource "google_dns_managed_zone" "primary" {
  name        = "four-eye-ai"
  dns_name    = "${var.domain}."
  description = "DNS zone for 4eye.ai managed by Terraform"
  visibility  = "public"
}

# ── Email DNS Records (Google Workspace) ─────────────────────
# MX records for receiving email at @4eye.ai
resource "google_dns_record_set" "email_mx" {
  project      = var.project_id
  managed_zone = google_dns_managed_zone.primary.name
  name         = "${var.domain}."
  type         = "MX"
  ttl          = 3600
  rrdatas = [
    "1 aspmx.l.google.com.",
    "5 alt1.aspmx.l.google.com.",
    "5 alt2.aspmx.l.google.com.",
    "10 alt3.aspmx.l.google.com.",
    "10 alt4.aspmx.l.google.com.",
  ]
}

# SPF record — authorizes Google to send email on behalf of 4eye.ai
resource "google_dns_record_set" "email_spf" {
  project      = var.project_id
  managed_zone = google_dns_managed_zone.primary.name
  name         = "${var.domain}."
  type         = "TXT"
  ttl          = 3600
  rrdatas      = ["\"v=spf1 include:_spf.google.com ~all\""]
}

# DMARC record — policy for unauthenticated email
resource "google_dns_record_set" "email_dmarc" {
  project      = var.project_id
  managed_zone = google_dns_managed_zone.primary.name
  name         = "_dmarc.${var.domain}."
  type         = "TXT"
  ttl          = 3600
  rrdatas      = ["\"v=DMARC1; p=quarantine; rua=mailto:dmarc@${var.domain}; pct=100\""]
}

# DKIM record — uncomment and fill in after Google Workspace provides the key
# resource "google_dns_record_set" "email_dkim" {
#   project      = var.project_id
#   managed_zone = google_dns_managed_zone.primary.name
#   name         = "google._domainkey.${var.domain}."
#   type         = "TXT"
#   ttl          = 3600
#   rrdatas      = ["\"v=DKIM1; k=rsa; p=YOUR_DKIM_KEY_HERE\""]
# }

# ── Workload Identity Federation for GitHub Actions ──────────
# This allows GitHub Actions to authenticate as the CI/CD SA
# without long-lived service account keys.
resource "google_iam_workload_identity_pool" "github" {
  workload_identity_pool_id = "github-actions"
  display_name              = "GitHub Actions"
  description               = "Workload Identity Pool for GitHub Actions CI/CD"
}

resource "google_iam_workload_identity_pool_provider" "github" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "GitHub Provider"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.repository" = "assertion.repository"
  }

  attribute_condition = "assertion.repository_owner == 'four-eye-ai'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_member" "github_actions_impersonation" {
  service_account_id = google_service_account.cicd_pipeline.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/four-eye-ai/4eye"
}
