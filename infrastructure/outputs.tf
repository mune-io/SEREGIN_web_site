# infrastructure/outputs.tf
# Финальные outputs после terraform apply

output "storage_account_name" {
  description = "Имя Storage Account (нужно для деплоя через az cli)"
  value       = module.storage.storage_account_name
}

output "storage_web_endpoint" {
  description = "Прямой URL статического сайта в Storage (без CDN)"
  value       = module.storage.primary_web_endpoint
}

# Отключён вместе с модулем cdn
# output "cdn_endpoint_hostname" {
#   description = "Финальный URL сайта через CDN (используйте этот)"
#   value       = "https://${module.cdn.cdn_endpoint_hostname}"
# }

# ════════════════════════════════════════════════════════════════════════════
# КАК ЗАДЕПЛОИТЬ REACT-СБОРКУ
# ════════════════════════════════════════════════════════════════════════════
#
# 1. Соберите проект:
#      npm run build          # или: yarn build / pnpm build
#
# 2. Задеплойте в Storage (замените <STORAGE_ACCOUNT_NAME> на output выше):
#
#      az storage blob upload-batch \
#        --account-name <STORAGE_ACCOUNT_NAME> \
#        --source ./build \
#        --destination '$web' \
#        --overwrite
#
#    Если используете Vite — папка dist, для CRA — build.
#
# 3. Сбросьте кэш CDN после деплоя:
#
#      az cdn endpoint purge \
#        --resource-group rg-<PROJECT_NAME>-<ENV> \
#        --profile-name cdn-<PROJECT_NAME>-<ENV> \
#        --name cdnep-<PROJECT_NAME>-<ENV> \
#        --content-paths "/*"
#
#    Purge занимает ~2 минуты; после этого CDN отдаёт новую версию сайта.
#
# ════════════════════════════════════════════════════════════════════════════
