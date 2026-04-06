# modules/storage/outputs.tf

output "resource_group_name" {
  description = "Имя Resource Group (передаётся в модуль cdn)"
  value       = azurerm_resource_group.main.name
}

output "storage_account_name" {
  description = "Имя Storage Account (нужно для az storage blob upload-batch)"
  value       = azurerm_storage_account.main.name
}

output "storage_account_id" {
  description = "Resource ID Storage Account (нужно для IAM role assignment)"
  value       = azurerm_storage_account.main.id
}

output "primary_web_endpoint" {
  description = "URL статического сайта в Storage — используется как CDN origin"
  # Убираем trailing slash и схему https:// — CDN принимает только hostname
  # Пример: myaccount.z6.web.core.windows.net
  value = trim(
    replace(azurerm_storage_account.main.primary_web_endpoint, "https://", ""),
    "/"
  )
}
