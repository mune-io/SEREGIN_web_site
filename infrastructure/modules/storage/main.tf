# modules/storage/main.tf
# Создаёт Resource Group, Storage Account и включает Static Website hosting

locals {
  # Единый префикс для всех имён ресурсов в этом модуле
  prefix = "${var.project_name}-${var.environment}"

  # Storage Account имя: только строчные буквы + цифры, максимум 24 символа
  # Убираем дефисы, обрезаем до 24 символов
  storage_account_name = substr(
    replace("st${var.project_name}${var.environment}", "-", ""),
    0, 24
  )

  tags = {
    project     = var.project_name
    environment = var.environment
    managed_by  = "terraform"
  }
}

# ── Resource Group ────────────────────────────────────────────────────────────
# Логический контейнер для всех ресурсов сайта
resource "azurerm_resource_group" "main" {
  name     = "rg-${local.prefix}"
  location = var.location
  tags     = local.tags
}

# ── Storage Account ───────────────────────────────────────────────────────────
# Хранит статические файлы сайта ($web контейнер).
# Standard_LRS — самый дешёвый tier (локально-избыточное хранение).
resource "azurerm_storage_account" "main" {
  name                     = local.storage_account_name
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  # Разрешаем только HTTPS-запросы к хранилищу
  https_traffic_only_enabled = true

  # Минимальная версия TLS для безопасности
  min_tls_version = "TLS1_2"

  # Отключаем публичный Blob-доступ — сайт будет доступен только через CDN
  # (CDN обращается к storage напрямую по web endpoint, без анонимного blob-доступа)
  allow_nested_items_to_be_public = false

  # ── Static Website ──────────────────────────────────────────────────────────
  # Включает специальный $web контейнер и маршрутизацию для SPA.
  # Azure автоматически создаёт primary_web_endpoint вида:
  #   https://<account>.z6.web.core.windows.net/
  static_website {
    index_document     = "index.html" # корневой документ
    error_404_document = "404.html"   # страница ошибки (React Router fallback)
  }

  tags = local.tags
}
