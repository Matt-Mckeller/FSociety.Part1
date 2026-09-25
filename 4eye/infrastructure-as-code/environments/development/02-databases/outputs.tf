output "cloudsql_private_ip" {
  description = "Private IP of the Cloud SQL instance"
  value       = module.cloud_sql.private_ip
}

output "cloudsql_instance_name" {
  description = "Cloud SQL instance name"
  value       = module.cloud_sql.instance_name
}

output "cloudsql_connection_name" {
  description = "Cloud SQL connection name (project:region:instance)"
  value       = module.cloud_sql.connection_name
}

output "database_name" {
  description = "Name of the database"
  value       = module.cloud_sql.database_name
}

output "database_user" {
  description = "Database user name"
  value       = module.cloud_sql.database_user
}
