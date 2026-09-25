output "instance_name" {
  description = "Name of the Cloud SQL instance"
  value       = google_sql_database_instance.primary.name
}

output "private_ip" {
  description = "Private IP address of the Cloud SQL instance"
  value       = google_sql_database_instance.primary.private_ip_address
}

output "database_name" {
  description = "Name of the database"
  value       = google_sql_database.main.name
}

output "database_user" {
  description = "Database user name"
  value       = google_sql_user.app.name
}

output "connection_name" {
  description = "Cloud SQL connection name (project:region:instance)"
  value       = google_sql_database_instance.primary.connection_name
}
