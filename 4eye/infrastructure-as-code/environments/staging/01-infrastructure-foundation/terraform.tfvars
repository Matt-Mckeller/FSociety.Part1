project_id   = "four-eye-ai-01"
cluster_name = "four-eye-staging-gke"
region       = "us-central1"
zone         = "us-central1-a"
environment  = "staging"

# Non-overlapping CIDRs with dev and prod
subnet_ip_range       = "10.47.0.0/20"
pods_ip_range         = "10.71.0.0/21"
services_ip_range     = "10.72.0.0/21"
master_ip_range       = "10.73.0.0/28"
proxy_subnet_ip_range = "10.74.0.0/24"

machine_type   = "e2-medium"
min_node_count = 1
max_node_count = 3

master_authorized_cidr_blocks = [
  {
    cidr_block   = "0.0.0.0/0"
    display_name = "All (restrict before launch)"
  }
]
