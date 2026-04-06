# infrastructure/main.tf
# Корневой модуль — оркестрирует все дочерние модули

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.3.0"
}

provider "azurerm" {
  features {}
  # Аутентификация через переменные окружения (рекомендуется для CI/CD):
  #   ARM_SUBSCRIPTION_ID, ARM_TENANT_ID, ARM_CLIENT_ID, ARM_CLIENT_SECRET
  # Или через Azure CLI: az login
}

# ── Модуль: Storage Account + Static Website ────────────────────────────────
module "storage" {
  source = "./modules/storage"

  project_name = var.project_name
  location     = var.location
  environment  = var.environment
}

# ── Модуль: Azure CDN (profile + endpoint) ──────────────────────────────────
# Отключён — раскомментировать когда понадобится CDN
# module "cdn" {
#   source = "./modules/cdn"
#
#   project_name         = var.project_name
#   location             = var.location
#   environment          = var.environment
#   resource_group_name  = module.storage.resource_group_name
#   storage_web_endpoint = module.storage.primary_web_endpoint
# }

# ── Модуль: IAM (роль Storage Blob Data Contributor для GitHub Actions) ──────
module "iam" {
  source = "./modules/iam"

  storage_account_id          = module.storage.storage_account_id
  service_principal_object_id = var.service_principal_object_id
}
