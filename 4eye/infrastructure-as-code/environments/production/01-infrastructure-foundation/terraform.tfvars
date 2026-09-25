project_id   = "four-eye-ai-01"
cluster_name = "four-eye-prod-gke"
region       = "us-central1"
zone         = "us-central1-a"
environment  = "production"

# Non-overlapping CIDRs with dev and staging
subnet_ip_range       = "10.17.0.0/20"
pods_ip_range         = "10.31.0.0/21"
services_ip_range     = "10.32.0.0/21"
master_ip_range       = "10.33.0.0/28"
proxy_subnet_ip_range = "10.34.0.0/24"

machine_type   = "e2-medium"
min_node_count = 1
max_node_count = 5

# TODO: Replace with actual CI/CD runner + developer VPN CIDRs
master_authorized_cidr_blocks = [
  {
    cidr_block   = "0.0.0.0/0"
    display_name = "All (MUST restrict before launch)"
  }
]
