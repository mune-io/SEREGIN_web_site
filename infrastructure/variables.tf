# infrastructure/variables.tf
# Входные переменные корневого модуля

variable "project_name" {
  description = "Базовое имя проекта — используется во всех именах ресурсов"
  type        = string
  default     = "sereginwebsite"  # без дефисов! Storage Account их не поддерживает
}

variable "location" {
  description = "Azure-регион для всех ресурсов"
  type        = string
  default     = "West Europe"
}

variable "environment" {
  description = "Окружение: prod | staging | dev"
  type        = string
  default     = "prod"
}

variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
}

variable "tenant_id" {
  description = "Azure Tenant ID"
  type        = string
}

variable "service_principal_object_id" {
  description = "Object ID сервисного принципала GitHub Actions. Нужен только для IAM модуля. Получить: az ad sp show --id <appId> --query id -o tsv"
  type        = string
  sensitive   = true
  default     = null  # null = IAM модуль отключён, включить когда будет GitHub Actions
}