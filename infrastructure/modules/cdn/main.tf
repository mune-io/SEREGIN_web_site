# modules/cdn/main.tf
# Azure CDN profile + endpoint поверх Storage Static Website

locals {
  prefix = "${var.project_name}-${var.environment}"
}

# ── CDN Profile ───────────────────────────────────────────────────────────────
# Standard_Microsoft — бесплатный tier для CDN (нет ежемесячной платы за profile).
# Платите только за исходящий трафик (~$0.081/GB в Европе).
resource "azurerm_cdn_profile" "main" {
  name                = "cdn-${local.prefix}"
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = "Standard_Microsoft"

  tags = {
    project     = var.project_name
    environment = var.environment
    managed_by  = "terraform"
  }
}

# ── CDN Endpoint ──────────────────────────────────────────────────────────────
# Публичная точка входа: https://cdnep-<project>-<env>.azureedge.net
# Origin — Storage Account static website endpoint.
resource "azurerm_cdn_endpoint" "main" {
  name                = "cdnep-${local.prefix}"
  resource_group_name = var.resource_group_name
  location            = var.location
  profile_name        = azurerm_cdn_profile.main.name

  # Origin: Storage static website hostname (без https://)
  origin {
    name      = "storage-origin"
    host_name = var.storage_web_endpoint
  }

  origin_host_header = var.storage_web_endpoint

  # Принимаем только HTTPS-запросы от клиентов
  is_http_allowed  = false
  is_https_allowed = true

  # ── Сжатие ────────────────────────────────────────────────────────────────
  # gzip + brotli снижают трафик на 60-80% для текстовых ресурсов.
  is_compression_enabled = true
  content_types_to_compress = [
    "text/html",
    "text/css",
    "text/javascript",
    "application/javascript",
    "application/json",
    "application/xml",
    "image/svg+xml",
    "font/woff",
    "font/woff2",
  ]

  # ── Правила кэширования ───────────────────────────────────────────────────
  # Правило 1: index.html — не кэшировать (всегда свежий)
  # Правило 2: статические ассеты (js/css/img/fonts) — кэш 1 год
  delivery_rule {
    name  = "NoCacheIndexHtml"
    order = 1

    request_uri_condition {
      operator     = "EndsWith"
      match_values = ["/", "/index.html"]
    }

    cache_expiration_action {
      behavior = "BypassCache"
    }
  }

  delivery_rule {
    name  = "LongCacheStaticAssets"
    order = 2

    request_uri_condition {
      operator     = "EndsWith"
      match_values = [".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".ico", ".woff", ".woff2"]
    }

    cache_expiration_action {
      behavior = "Override"
      duration = "365.00:00:00" # 1 год (формат: d.hh:mm:ss)
    }
  }

  tags = {
    project     = var.project_name
    environment = var.environment
    managed_by  = "terraform"
  }
}
