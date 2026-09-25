project_id   = "four-eye-ai-01"
cluster_name = "four-eye-dev-gke"
region       = "us-central1"
zone         = "us-central1-a"
environment  = "development"

subnet_ip_range       = "10.37.0.0/20"
pods_ip_range         = "10.61.0.0/21"
services_ip_range     = "10.62.0.0/21"
master_ip_range       = "10.63.0.0/28"
proxy_subnet_ip_range = "10.64.0.0/24"

machine_type   = "e2-medium"
min_node_count = 1
max_node_count = 3

# TODO: Restrict to known IPs before production use
master_authorized_cidr_blocks = [
  {
    cidr_block   = "0.0.0.0/0"
    display_name = "All (restrict before launch)"
  }
]
