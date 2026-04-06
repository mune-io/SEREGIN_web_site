# modules/cdn/outputs.tf

output "cdn_endpoint_hostname" {
  description = "Hostname CDN endpoint — финальный URL сайта (без https://)"
  value       = azurerm_cdn_endpoint.main.fqdn
}

output "cdn_profile_name" {
  description = "Имя CDN profile (нужно для команды az cdn endpoint purge)"
  value       = azurerm_cdn_profile.main.name
}

output "cdn_endpoint_name" {
  description = "Имя CDN endpoint (нужно для команды az cdn endpoint purge)"
  value       = azurerm_cdn_endpoint.main.name
}
