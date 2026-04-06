# modules/iam/main.tf
# Назначает роль Storage Blob Data Contributor сервисному принципалу GitHub Actions.
# Это позволяет CI/CD загружать файлы в $web контейнер Storage Account
# без использования storage access keys (более безопасно).

# ── Role Assignment ───────────────────────────────────────────────────────────
# Storage Blob Data Contributor — минимально необходимая роль для:
#   - az storage blob upload-batch (запись в $web)
#   - az storage blob delete-batch (очистка перед деплоем)
#
# Scope: конкретный Storage Account (принцип наименьших привилегий).
resource "azurerm_role_assignment" "github_actions_blob_contributor" {
  count = var.service_principal_object_id != null ? 1 : 0  # пропустить если null

  scope                = var.storage_account_id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = var.service_principal_object_id

  # Примечание: изменение principal_id или scope вызывает пересоздание ресурса.
  # Это нормально — Terraform удалит старое назначение и создаст новое.
}

# ── КАК СОЗДАТЬ СЕРВИСНЫЙ ПРИНЦИПАЛ ДЛЯ GITHUB ACTIONS ───────────────────────
#
# 1. Создайте App Registration (или используйте Workload Identity Federation):
#
#    az ad app create --display-name "github-actions-seregin-website"
#    az ad sp create --id <APP_ID>
#
# 2. Получите Object ID:
#    az ad sp show --id <APP_ID> --query id -o tsv
#
# 3. Создайте клиентский секрет (для классической аутентификации):
#    az ad app credential reset --id <APP_ID>
#
# 4. Добавьте в GitHub Secrets:
#    AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID, AZURE_SUBSCRIPTION_ID
#
# 5. В terraform.tfvars укажите Object ID из шага 2.
