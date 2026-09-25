# ──────────────────────────────────────────────────────────────
# Networking Module
# Creates VPC, subnets (with GKE secondary ranges), proxy subnet
# for Gateway API, Cloud Router, Cloud NAT, and firewall rules.
# ──────────────────────────────────────────────────────────────

# ── VPC ──────────────────────────────────────────────────────
resource "google_compute_network" "primary" {
  name                    = "${var.prefix}-vpc"
  auto_create_subnetworks = false
}

# ── Primary Subnet (GKE nodes + secondary ranges) ───────────
resource "google_compute_subnetwork" "primary" {
  name                     = "${var.prefix}-subnet-primary"
  network                  = google_compute_network.primary.id
  region                   = var.region
  private_ip_google_access = true
  ip_cidr_range            = var.subnet_ip_range

  secondary_ip_range {
    range_name    = "kubernetes-pod-range"
    ip_cidr_range = var.pods_ip_range
  }

  secondary_ip_range {
    range_name    = "kubernetes-services-range"
    ip_cidr_range = var.services_ip_range
  }
}

# ── Regional Proxy Subnet (required for Gateway API) ────────
resource "google_compute_subnetwork" "regional_proxy" {
  name          = "${var.prefix}-${var.region}-proxy-subnet"
  region        = var.region
  ip_cidr_range = var.proxy_subnet_ip_range
  purpose       = "REGIONAL_MANAGED_PROXY"
  network       = google_compute_network.primary.id
  role          = "ACTIVE"
}

# ── Cloud Router ─────────────────────────────────────────────
resource "google_compute_router" "primary" {
  name    = "${var.prefix}-cloud-router"
  network = google_compute_network.primary.name
  region  = var.region
}

# ── Cloud NAT (outbound internet for private nodes) ─────────
resource "google_compute_router_nat" "primary" {
  name   = "${var.prefix}-cloud-nat"
  router = google_compute_router.primary.name
  region = google_compute_router.primary.region

  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = true
    filter = "ERRORS_ONLY"
  }

  min_ports_per_vm = 64
}

# ── Firewall: SSH via IAP only ───────────────────────────────
resource "google_compute_firewall" "allow_ssh_iap" {
  name      = "${var.prefix}-allow-ssh-iap"
  network   = google_compute_network.primary.name
  direction = "INGRESS"
  priority  = 1000

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  # Only allow SSH through Identity-Aware Proxy
  source_ranges = ["35.235.240.0/20"]
  target_tags   = ["ssh-access"]
}

# ── Firewall: HTTP(S) via IAP ────────────────────────────────
resource "google_compute_firewall" "allow_http_iap" {
  name      = "${var.prefix}-allow-http-iap"
  network   = google_compute_network.primary.name
  direction = "INGRESS"
  priority  = 1000

  allow {
    protocol = "tcp"
    ports    = ["80", "443", "8080"]
  }

  source_ranges = ["35.235.240.0/20"]
  target_tags   = ["http-access"]
}

# ── Firewall: Allow GKE health checks ───────────────────────
resource "google_compute_firewall" "allow_health_checks" {
  name      = "${var.prefix}-allow-health-checks"
  network   = google_compute_network.primary.name
  direction = "INGRESS"
  priority  = 1000

  allow {
    protocol = "tcp"
  }

  # Google Cloud health check IP ranges
  source_ranges = [
    "35.191.0.0/16",
    "130.211.0.0/22",
  ]

  target_tags = ["gke-node"]
}
