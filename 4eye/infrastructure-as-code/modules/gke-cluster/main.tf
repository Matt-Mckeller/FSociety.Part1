# ──────────────────────────────────────────────────────────────
# GKE Cluster Module
# Creates a private GKE cluster, a separately managed node pool,
# and a dedicated Terraform/node service account.
# ──────────────────────────────────────────────────────────────

# ── Service Account for GKE Nodes ────────────────────────────
resource "google_service_account" "gke_nodes" {
  account_id   = "${var.prefix}-gke-nodes"
  display_name = "GKE Node Service Account for ${var.prefix}"
}

# Minimal roles for GKE nodes
resource "google_project_iam_member" "gke_nodes_log_writer" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}

resource "google_project_iam_member" "gke_nodes_metric_writer" {
  project = var.project_id
  role    = "roles/monitoring.metricWriter"
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}

resource "google_project_iam_member" "gke_nodes_monitoring_viewer" {
  project = var.project_id
  role    = "roles/monitoring.viewer"
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}

resource "google_project_iam_member" "gke_nodes_artifact_reader" {
  project = var.project_id
  role    = "roles/artifactregistry.reader"
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}

# ── GKE Private Cluster ─────────────────────────────────────
resource "google_container_cluster" "primary" {
  name     = var.cluster_name
  location = var.zone
  project  = var.project_id

  deletion_protection = var.deletion_protection

  # Remove default node pool — we manage our own
  remove_default_node_pool = true
  initial_node_count       = 1

  network    = var.vpc_self_link
  subnetwork = var.subnet_self_link

  private_cluster_config {
    enable_private_endpoint = false
    enable_private_nodes    = true
    master_ipv4_cidr_block  = var.master_ip_range
  }

  # Gateway API (modern alternative to Ingress)
  gateway_api_config {
    channel = "CHANNEL_STANDARD"
  }

  lifecycle {
    ignore_changes = [node_config]
  }

  vertical_pod_autoscaling {
    enabled = true
  }

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  # Default node pool config (gets deleted immediately)
  node_config {
    disk_size_gb = 30
    tags         = ["gke-node", "${var.project_id}-gke"]
    preemptible  = false

    reservation_affinity {
      consume_reservation_type = "NO_RESERVATION"
    }
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = var.pod_range_name
    services_secondary_range_name = var.service_range_name
  }

  master_authorized_networks_config {
    dynamic "cidr_blocks" {
      for_each = var.master_authorized_cidr_blocks
      content {
        cidr_block   = cidr_blocks.value.cidr_block
        display_name = cidr_blocks.value.display_name
      }
    }
  }
}

# ── Separately Managed Node Pool ────────────────────────────
resource "google_container_node_pool" "primary" {
  name     = "${var.cluster_name}-pool"
  location = var.zone
  cluster  = google_container_cluster.primary.name

  node_count = var.node_count

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  autoscaling {
    min_node_count  = var.min_node_count
    max_node_count  = var.max_node_count
    location_policy = "ANY"
  }

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    service_account = google_service_account.gke_nodes.email

    labels = {
      project_id  = var.project_id
      environment = var.environment
    }

    machine_type = var.machine_type
    image_type   = "COS_CONTAINERD"
    disk_type    = "pd-standard"
    disk_size_gb = var.node_disk_size_gb

    shielded_instance_config {
      enable_integrity_monitoring = true
      enable_secure_boot          = true
    }

    workload_metadata_config {
      mode = "GKE_METADATA"
    }

    kubelet_config {
      cpu_manager_policy   = "none"
      cpu_cfs_quota        = true
      cpu_cfs_quota_period = "100ms"
      pod_pids_limit       = 4096
    }

    tags = [
      "gke-node",
      "${var.project_id}-gke",
    ]

    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}
