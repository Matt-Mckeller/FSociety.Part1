project_id  = "four-eye-ai-01"
region      = "us-central1"
environment = "development"

database_version = "POSTGRES_16"
database_tier    = "db-f1-micro"

# Points to the DEVELOPMENT infrastructure state (not production!)
tf_state_prefix_infrastructure = "terraform/state/development/infrastructure"

# Set via environment variable or -var flag:
#   export TF_VAR_database_password="your-secure-password"
#   terraform plan -var="database_password=your-secure-password"
